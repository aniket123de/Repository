import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { personalInfo, interests, interestDetails } = body;
      // Validate required fields
    if (!personalInfo.name || !personalInfo.email || !personalInfo.expertise) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and expertise are required' },
        { status: 400 }
      );
    }    // Insert or update user profile
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        name: personalInfo.name,
        email: personalInfo.email,
        linkedin: personalInfo.linkedin || null,
        expertise: personalInfo.expertise,
        interests: interests || {},
        interest_details: interestDetails || [],
        bio: personalInfo.bio || null,
        skills: personalInfo.skills || [],
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'email'
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save profile' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      profile: data,
      message: 'Profile saved successfully!' 
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
