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
    if (query) {
      supabaseQuery = supabaseQuery.or(
        `name.ilike.%${query}%,skills.cs.{${query}}`
      );
    }

    if (expertise) {
      supabaseQuery = supabaseQuery.eq('expertise', expertise);
    }

    if (skills.length > 0) {
      supabaseQuery = supabaseQuery.contains('skills', skills);
    }

    // Add pagination
    supabaseQuery = supabaseQuery
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    const { data, error, count } = await supabaseQuery;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch users' },
        { status: 500 }
      );
    }    // Transform data to match the expected format
    const transformedData = data?.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      linkedin: user.linkedin,
      expertise: user.expertise,
      skills: user.skills || [],
      interests: user.interest_details ? extractInterestsFromDetails(user.interest_details) : [],
      interest_details: user.interest_details,
      bio: user.bio
    })) || [];

    return NextResponse.json({
      users: transformedData,
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
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
