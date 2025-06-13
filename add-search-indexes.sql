-- SQL commands to add the new search indexes for skills and interests
-- Run these commands in your Supabase SQL editor or psql console

-- Add GIN index for interest_details JSONB field (for better search performance)
CREATE INDEX IF NOT EXISTS idx_user_profiles_interest_details ON user_profiles USING GIN(interest_details);

-- Add full-text search index for bio field using tsvector
CREATE INDEX IF NOT EXISTS idx_user_profiles_bio ON user_profiles USING GIN(to_tsvector('english', bio));

-- Verify the indexes were created successfully
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'user_profiles'
ORDER BY indexname;
