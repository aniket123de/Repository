# Supabase Integration Setup Guide

This guide will help you set up Supabase for the FYT (Find Your Tribe) feature, including the user quiz form and dynamic search functionality.

**Note: The app now works in offline mode with sample data if Supabase is not configured.**

## Prerequisites

- Supabase account (free tier is sufficient) - **OPTIONAL**
- Vercel account for deployment - **OPTIONAL**
- Basic understanding of environment variables

## Quick Start (No Setup Required)

The FYT feature will work immediately with sample data even without Supabase. To test:

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Navigate to the FYT section 
3. Try the quiz form and search functionality with sample data

## Part 1: Supabase Setup (Optional - for Production)

### 1. Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - Name: `repository-fyt` (or any name you prefer)
   - Database Password: Generate a strong password (save this!)
   - Region: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be ready (usually 2-3 minutes)

### 2. Set Up the Database Schema

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **"New Query"**
4. Copy and paste the contents of `supabase-migration.sql` from your project root
5. Click **"Run"** to execute the migration
6. Verify the table was created by going to **Table Editor** > **user_profiles**

### 3. Configure Row Level Security (RLS)

The migration script already enables RLS, but you can verify:

1. Go to **Authentication** > **Policies**
2. You should see policies for the `user_profiles` table:
   - Public profiles are viewable by everyone
   - Users can insert their own profile
   - Users can update their own profile

### 4. Get Your Supabase Credentials

1. Go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Project API Key** > **anon public** (this is safe to use in frontend)

## Part 2: Environment Variables Setup

### 1. Local Development

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your Supabase credentials:

```env
# Supabase Configuration (Optional)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

**Note: If you don't add Supabase environment variables, the app will run in offline mode with sample data.**

3. Make sure `.env.local` is in your `.gitignore` file

### 2. Test Local Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the FYT section (`/fyt` or wherever it's mounted)
3. Try filling out the quiz form
4. Check your Supabase dashboard > Table Editor > user_profiles to see if data is being saved
5. Try searching for users in the search box

## Part 3: Vercel Deployment Setup

### 1. Add Environment Variables to Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** > **Environment Variables**
4. Add the following environment variables:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Production, Preview, Development |
| `NEXTAUTH_SECRET` | Your NextAuth secret | Production, Preview, Development |
| `NEXTAUTH_URL` | Your production domain | Production |

### 2. Deploy and Test

1. Push your changes to GitHub
2. Vercel will automatically deploy
3. Test the deployed version:
   - Fill out the quiz form
   - Check if data appears in Supabase
   - Test the search functionality

## Part 4: Optional Enhancements

### 1. Enable Supabase Realtime (Optional)

If you want real-time updates when new users join:

1. Go to Supabase > Database > Replication
2. Enable replication for the `user_profiles` table
3. Add realtime subscription code to your React components

### 2. Add Image Upload (Optional)

For user profile pictures:

1. Go to Supabase > Storage
2. Create a bucket named `avatars`
3. Set up storage policies
4. Implement file upload in your quiz form

### 3. Add Geolocation (Optional)

For distance calculations:

1. Use browser geolocation API
2. Store lat/lng in user profiles
3. Implement distance calculation in search API

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables" error:**
   - Check that your `.env.local` file has the correct variable names
   - Restart your development server after adding env vars

2. **Database connection errors:**
   - Verify your Supabase project URL and API key
   - Check if your Supabase project is paused (free tier pauses after inactivity)

3. **API route not working:**
   - Check the Network tab in browser DevTools
   - Look at Vercel function logs for errors
   - Verify the API route file is in the correct location

4. **RLS policies blocking requests:**
   - Check your RLS policies in Supabase dashboard
   - Temporarily disable RLS for testing (re-enable for production!)

5. **Search not returning results:**
   - Check if you have sample data in your database
   - Verify the search API is working by testing direct API calls

### Getting Help:

- Supabase Discord: https://discord.supabase.com
- Supabase Docs: https://supabase.com/docs
- GitHub Issues: Create an issue in your repository

## Testing Checklist

- [ ] Quiz form submits successfully
- [ ] Data appears in Supabase dashboard
- [ ] Search functionality works with sample data
- [ ] Environment variables are set correctly
- [ ] Production deployment works
- [ ] Error handling works (try with invalid data)
- [ ] Loading states display correctly

## Database Schema Reference

The `user_profiles` table includes:
- Basic info: name, email, linkedin
- Quiz data: expertise, interests, interest_details
- Profile data: github_username, avatar_url, bio, skills
- Metadata: location, distance, created_at, updated_at
