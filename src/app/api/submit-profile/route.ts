import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received request body:', JSON.stringify(body, null, 2));
      const { personalInfo, interests, interestDetails } = body;
    
    console.log('Extracted data:', {
      personalInfo,
      interests,
      interestDetails
    });
    
      // Validate required fields
    if (!personalInfo?.name || !personalInfo?.email || !personalInfo?.expertise) {
      console.error('Missing required fields:', { personalInfo });
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and expertise are required' },
        { status: 400 }
      );
    }// Insert or update user profile
    // Build the data object conditionally to handle missing github column
    const profileData: any = {
      name: personalInfo.name,
      email: personalInfo.email,
      linkedin: personalInfo.linkedin || null,
      expertise: personalInfo.expertise,
      interests: interests || {},
      interest_details: interestDetails || [],
      bio: personalInfo.bio || null,
      skills: personalInfo.skills || [],
      updated_at: new Date().toISOString()
    };    // Only add github if it's provided (to handle DBs without github column)
    if (personalInfo.github) {
      profileData.github = personalInfo.github;
    }

    console.log('Final profile data for upsert:', JSON.stringify(profileData, null, 2));

    const { data, error } = await supabase
      .from('user_profiles')
      .upsert(profileData, {
        onConflict: 'email'
      })
      .select()
      .single();    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      console.error('Profile data that failed:', profileData);
      return NextResponse.json(
        { 
          error: 'Failed to save profile',
          details: error.message,
          code: error.code
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      profile: data,
      message: 'Profile saved successfully!' 
    });
  } catch (error) {
    console.error('API error details:', {
      error: error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
