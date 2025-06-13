-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    linkedin VARCHAR(500),
    expertise VARCHAR(50) NOT NULL CHECK (expertise IN ('webdev', 'appdev', 'blockchain', 'aiml')),
    interests JSONB,
    interest_details JSONB,
    bio TEXT,
    skills TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Remove unwanted columns if they exist (for existing installations)
ALTER TABLE user_profiles DROP COLUMN IF EXISTS username;
ALTER TABLE user_profiles DROP COLUMN IF EXISTS location;
ALTER TABLE user_profiles DROP COLUMN IF EXISTS avatar_url;
ALTER TABLE user_profiles DROP COLUMN IF EXISTS distance;

-- Drop unwanted indexes if they exist
DROP INDEX IF EXISTS idx_user_profiles_username;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_expertise ON user_profiles(expertise);
CREATE INDEX IF NOT EXISTS idx_user_profiles_skills ON user_profiles USING GIN(skills);
CREATE INDEX IF NOT EXISTS idx_user_profiles_name ON user_profiles(name);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON user_profiles(created_at);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists, then create it
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then create them
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON user_profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON user_profiles
    FOR SELECT USING (true);

-- Create policy to allow users to insert their own profile
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT WITH CHECK (true);

-- Create policy to allow users to update their own profile
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (true);

-- Clear existing sample data and insert fresh data (optional)
DELETE FROM user_profiles WHERE email IN ('alex@example.com', 'samantha@example.com', 'raj@example.com', 'maria@example.com');

INSERT INTO user_profiles (name, email, linkedin, expertise, skills, interest_details, bio) VALUES
('Alex Johnson', 'alex@example.com', 'https://linkedin.com/in/alexjohnson', 'webdev', 
 ARRAY['React', 'TypeScript', 'Node.js'], 
 '[{"question": "Which frontend technologies are you most interested in?", "selectedOptions": ["React/Next.js", "TypeScript"]}]',
 'Full-stack developer passionate about modern web technologies'),

('Samantha Liu', 'samantha@example.com', 'https://linkedin.com/in/samanthaliu', 'aiml',
 ARRAY['Python', 'Django', 'Machine Learning'],
 '[{"question": "Which AI/ML domains interest you most?", "selectedOptions": ["Machine Learning", "Deep Learning"]}]',
 'AI/ML engineer with expertise in deep learning and data science'),

('Raj Patel', 'raj@example.com', 'https://linkedin.com/in/rajpatel', 'appdev',
 ARRAY['JavaScript', 'Vue.js', 'Firebase'],
 '[{"question": "Which mobile development approaches interest you?", "selectedOptions": ["React Native", "Flutter"]}]',
 'Mobile app developer focused on cross-platform solutions'),

('Maria Gonzalez', 'maria@example.com', 'https://linkedin.com/in/mariagonzalez', 'blockchain',
 ARRAY['Java', 'Spring Boot', 'PostgreSQL'],
 '[{"question": "Which blockchain platforms interest you most?", "selectedOptions": ["Ethereum", "Solana"]}]',
 'Blockchain developer specializing in smart contracts and DeFi');
