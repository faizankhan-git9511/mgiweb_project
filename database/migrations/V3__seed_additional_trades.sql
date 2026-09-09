-- Flyway Migration V3: Seed Additional Higher & Local Trade Data

-- Seed Higher Trade Users
IF NOT EXISTS (SELECT * FROM users WHERE phone_number = '9876543215')
BEGIN
    INSERT INTO users (full_name, phone_number, password, role, aadhaar_number, is_verified, city, avatar_url)
    VALUES (N'Rajesh Vishwakarma', '9876543215', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym50CR621v3Yq0t3jZ2u56', 'WORKER', 'XXXX-XXXX-5521', 1, N'Mumbai', 'https://images.unsplash.com/photo-1504257426160-350689b9a67a?auto=format&fit=crop&w=300&q=80');

    INSERT INTO users (full_name, phone_number, password, role, aadhaar_number, is_verified, city, avatar_url)
    VALUES (N'Manoj Yadav', '9876543216', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym50CR621v3Yq0t3jZ2u56', 'WORKER', 'XXXX-XXXX-6632', 1, N'Mumbai', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');

    INSERT INTO users (full_name, phone_number, password, role, aadhaar_number, is_verified, city, avatar_url)
    VALUES (N'Imran Khan', '9876543217', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym50CR621v3Yq0t3jZ2u56', 'WORKER', 'XXXX-XXXX-7743', 1, N'Mumbai', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80');

    INSERT INTO users (full_name, phone_number, password, role, aadhaar_number, is_verified, city, avatar_url)
    VALUES (N'Dharmendra Kumar', '9876543218', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym50CR621v3Yq0t3jZ2u56', 'WORKER', 'XXXX-XXXX-8854', 1, N'Mumbai', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80');
END;

-- Seed Additional Worker Profiles
IF NOT EXISTS (SELECT * FROM worker_profiles WHERE user_id = 6)
BEGIN
    INSERT INTO worker_profiles (user_id, trade_skill, category, daily_wage_rate, experience_years, rating, bio, availability_status, location, completed_jobs_count)
    VALUES (6, N'Certified Arc & MIG Welder (वेल्डर व फैब्रिकेटर)', N'Welding & Fabrication', 1100.00, 10, 4.85, N'Specialist in MS structural steel fabrication, industrial shed welding, safety grills, and gate fabrication.', 'AVAILABLE', N'Kurla West, Mumbai', 115);
END;

IF NOT EXISTS (SELECT * FROM worker_profiles WHERE user_id = 7)
BEGIN
    INSERT INTO worker_profiles (user_id, trade_skill, category, daily_wage_rate, experience_years, rating, bio, availability_status, location, completed_jobs_count)
    VALUES (7, N'Master Tile & Granite Fitter (टाइल व मार्बल कारीगर)', N'Tile & Marble', 950.00, 9, 4.80, N'Expert in vitrified floor tiling, Italian marble laying, granite kitchen counter cutting, and epoxy grouting.', 'AVAILABLE', N'Malad West, Mumbai', 87);
END;

IF NOT EXISTS (SELECT * FROM worker_profiles WHERE user_id = 8)
BEGIN
    INSERT INTO worker_profiles (user_id, trade_skill, category, daily_wage_rate, experience_years, rating, bio, availability_status, location, completed_jobs_count)
    VALUES (8, N'AC & Refrigeration Senior Technician (एसी टेक्नीशियन)', N'AC & HVAC', 1200.00, 7, 4.92, N'Specialized in commercial VRF/VRV air conditioning, split AC installation, gas charging, and duct maintenance.', 'AVAILABLE', N'Powai, Mumbai', 76);
END;

IF NOT EXISTS (SELECT * FROM worker_profiles WHERE user_id = 9)
BEGIN
    INSERT INTO worker_profiles (user_id, trade_skill, category, daily_wage_rate, experience_years, rating, bio, availability_status, location, completed_jobs_count)
    VALUES (9, N'Head Bar Bender & Steel Fixer (सरिया मिस्त्री)', N'Bar Bending', 900.00, 11, 4.70, N'RCC pillar steel tying, slab rebar mesh binding, and heavy beam bar bending as per structural drawings.', 'AVAILABLE', N'Thane West, Mumbai', 130);
END;

-- Seed Additional Jobs
IF NOT EXISTS (SELECT * FROM jobs WHERE title = N'Heavy Structural Steel Gate & Window Grill Welding')
BEGIN
    INSERT INTO jobs (title, category, trade_skill_required, location, daily_rate, description, status, employer_id, worker_count_needed)
    VALUES (N'Heavy Structural Steel Gate & Window Grill Welding', N'Welding & Fabrication', N'Welder', N'MIDC, Andheri East', 1100.00, N'Need 2 certified Arc welders for heavy MS steel gate and window security grill fabrication.', 'OPEN', 3, 2);

    INSERT INTO jobs (title, category, trade_skill_required, location, daily_rate, description, status, employer_id, worker_count_needed)
    VALUES (N'Commercial Showroom VRF AC Unit Ducting & Assembly', N'AC & HVAC', N'AC Technician', N'Lower Parel, Mumbai', 1200.00, N'Requires HVAC certified technicians for ducting layover and indoor cassette AC mounting.', 'OPEN', 3, 2);
END;
