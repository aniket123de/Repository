-- Cleanup script to remove unwanted columns from existing user_profiles table
-- Run this in your Supabase SQL Editor if you're getting column errors

-- First, drop the constraints and indexes related to removed columns
DROP INDEX IF EXISTS idx_user_profiles_username CASCADE;

-- Remove the unwanted columns (these will succeed even if columns don't exist)
ALTER TABLE user_profiles DROP COLUMN IF EXISTS username CASCADE;
ALTER TABLE user_profiles DROP COLUMN IF EXISTS location CASCADE;
ALTER TABLE user_profiles DROP COLUMN IF EXISTS avatar_url CASCADE;
ALTER TABLE user_profiles DROP COLUMN IF EXISTS distance CASCADE;

-- Verify the table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
ORDER BY ordinal_position;
