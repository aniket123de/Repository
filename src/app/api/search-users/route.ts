import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const skills = searchParams.get('skills')?.split(',') || [];
    const expertise = searchParams.get('expertise') || '';
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let supabaseQuery = supabase
      .from('user_profiles')
      .select('*');    // Apply filters
    let isSearchQuery = false;
    if (query) {
      isSearchQuery = true;
      // For search queries, we'll get more data and filter client-side for interests
      // Search in name, skills array, and bio using database
      supabaseQuery = supabaseQuery.or([
        `name.ilike.%${query}%`,
        `skills.cs.{${query}}`,
        `bio.ilike.%${query}%`
      ].join(','));
    }

    if (expertise) {
      supabaseQuery = supabaseQuery.eq('expertise', expertise);
    }

    if (skills.length > 0) {
      supabaseQuery = supabaseQuery.contains('skills', skills);
    }    // Add pagination - for search queries, get more results for client-side filtering
    const searchLimit = isSearchQuery ? Math.max(limit * 3, 50) : limit;
    supabaseQuery = supabaseQuery
      .range(offset, offset + searchLimit - 1)
      .order('created_at', { ascending: false });    const { data, error, count } = await supabaseQuery;

    if (error) {
      console.error('Supabase error:', error);
      // Return a more detailed error for debugging
      return NextResponse.json(
        { 
          error: 'Failed to fetch users', 
          details: error.message,
          hint: error.hint || 'Check if all required columns exist in the database'
        },
        { status: 500 }
      );
    }

    // If we have a search query but no results, get additional users to search interests
    let allData = data || [];
    if (isSearchQuery && (!allData || allData.length < 10)) {
      // Get additional users to search through their interests
      const { data: additionalData } = await supabase
        .from('user_profiles')
        .select('*')
        .limit(50)
        .order('created_at', { ascending: false });
      
      if (additionalData) {
        // Combine and deduplicate by id
        const existingIds = new Set(allData.map((user: any) => user.id));
        const newUsers = additionalData.filter((user: any) => !existingIds.has(user.id));
        allData = [...allData, ...newUsers];
      }
    }    // Transform data to match the expected format
    let transformedData = allData?.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      linkedin: user.linkedin,
      github: user.github || null, // Handle missing github column gracefully
      expertise: user.expertise,
      skills: user.skills || [],
      interests: user.interest_details ? extractInterestsFromDetails(user.interest_details) : [],
      interest_details: user.interest_details,
      bio: user.bio
    })) || [];

    // Client-side filtering for interest details if query is provided
    if (isSearchQuery && transformedData.length > 0) {
      const queryLower = query.toLowerCase();
      transformedData = transformedData.filter((user: any) => {
        // Check if matches name, skills, or bio
        const nameMatch = user.name?.toLowerCase().includes(queryLower);
        const skillsMatch = user.skills?.some((skill: string) => skill.toLowerCase().includes(queryLower));
        const bioMatch = user.bio?.toLowerCase().includes(queryLower);
        
        // Check interests (selectedOptions in interest_details)
        const interestsMatch = user.interest_details?.some((detail: any) => 
          detail.selectedOptions?.some((option: string) => 
            option.toLowerCase().includes(queryLower)
          )
        );
        
        return nameMatch || skillsMatch || bioMatch || interestsMatch;
      });
      
      // Apply pagination to filtered results
      transformedData = transformedData.slice(offset, offset + limit);
    }    return NextResponse.json({
      users: transformedData,
      pagination: {
        total: isSearchQuery ? transformedData.length : (count || 0),
        limit,
        offset,
        hasMore: isSearchQuery ? false : (count || 0) > offset + limit
      }
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        hint: 'Check server logs for more details'
      },
      { status: 500 }
    );
  }
}

// Helper function to extract interests from quiz details
function extractInterestsFromDetails(interestDetails: any[]): string[] {
  if (!interestDetails || !Array.isArray(interestDetails)) {
    return [];
  }
  
  return interestDetails.flatMap(detail => 
    detail.selectedOptions || []
  ).slice(0, 6); // Limit to 6 interests for display
}
