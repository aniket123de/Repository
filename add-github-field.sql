-- SQL command to add GitHub profile field to user_profiles table
-- Run this in your Supabase SQL editor

-- Add GitHub column to user_profiles table
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS github VARCHAR(500);

-- Create an index for better performance on GitHub field
CREATE INDEX IF NOT EXISTS idx_user_profiles_github ON user_profiles(github);

-- Verify the column was added successfully
SELECT column_name, data_type, character_maximum_length 
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
AND column_name = 'github';
