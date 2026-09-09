-- Flyway Migration V4: Fix Worker 6 Name & Seed CEO Admin Account for Faizan Khan

-- Update User 6 to Arjun Vishwakarma (Certified Arc & MIG Welder)
UPDATE users 
SET full_name = N'Arjun Vishwakarma', 
    role = 'WORKER', 
    avatar_url = 'https://images.unsplash.com/photo-1504257426160-350689b9a67a?auto=format&fit=crop&w=300&q=80' 
WHERE phone_number = '9511621894' OR (id = 6 AND full_name LIKE N'%Faizan%');

-- Seed CEO & Owner Account for Faizan Khan
IF NOT EXISTS (SELECT * FROM users WHERE phone_number = '9999999999')
BEGIN
    INSERT INTO users (full_name, phone_number, password, role, aadhaar_number, is_verified, city, avatar_url)
    VALUES (N'Faizan Khan (CEO & Founder)', '9999999999', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym50CR621v3Yq0t3jZ2u56', 'ADMIN', 'XXXX-XXXX-0001', 1, N'Mumbai', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80');
END;
