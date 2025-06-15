-- Simple SQL command to add GitHub column to existing database
-- Run this in your Supabase SQL editor first to fix the 500 errors

-- Add GitHub column safely (only if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'user_profiles' AND column_name = 'github') THEN
        ALTER TABLE user_profiles ADD COLUMN github VARCHAR(500);
        CREATE INDEX idx_user_profiles_github ON user_profiles(github);
    END IF;
END $$;

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
AND column_name IN ('name', 'email', 'linkedin', 'github', 'expertise')
ORDER BY column_name;
