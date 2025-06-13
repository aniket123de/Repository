-- Optional: Remove sample/dummy data from your Supabase database
-- Run this in your Supabase SQL Editor if you want to clean up the test data

-- Remove the dummy developers we created during testing
DELETE FROM user_profiles WHERE email IN (
    'alex@example.com', 
    'samantha@example.com', 
    'raj@example.com', 
    'maria@example.com'
);

-- Verify the cleanup
SELECT count(*) as remaining_profiles FROM user_profiles;
SELECT * FROM user_profiles ORDER BY created_at DESC LIMIT 5;
