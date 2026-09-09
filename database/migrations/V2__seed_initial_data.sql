-- Flyway Migration V2: Seed Initial Data for KaamChahiye Local Worker Marketplace

-- Seed Users (Passwords hashed for BCrypt "password123": $2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym50CR621v3Yq0t3jZ2u56)
IF NOT EXISTS (SELECT * FROM users WHERE phone_number = '9876543210')
BEGIN
    INSERT INTO users (full_name, phone_number, password, role, aadhaar_number, is_verified, city, avatar_url)
    VALUES (N'Suresh Patil', '9876543210', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym50CR621v3Yq0t3jZ2u56', 'WORKER', 'XXXX-XXXX-8921', 1, N'Mumbai', 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80');

    INSERT INTO users (full_name, phone_number, password, role, aadhaar_number, is_verified, city, avatar_url)
    VALUES (N'Ramesh Kumar', '9876543211', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym50CR621v3Yq0t3jZ2u56', 'WORKER', 'XXXX-XXXX-4512', 1, N'Mumbai', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80');

    INSERT INTO users (full_name, phone_number, password, role, aadhaar_number, is_verified, city, avatar_url)
    VALUES (N'Anil Sharma (Verma Builders)', '9876543212', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym50CR621v3Yq0t3jZ2u56', 'EMPLOYER', 'XXXX-XXXX-9901', 1, N'Mumbai', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80');

    INSERT INTO users (full_name, phone_number, password, role, aadhaar_number, is_verified, city, avatar_url)
    VALUES (N'Vikram Singh', '9876543213', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym50CR621v3Yq0t3jZ2u56', 'CONTRACTOR', 'XXXX-XXXX-3344', 1, N'Mumbai', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80');

    INSERT INTO users (full_name, phone_number, password, role, aadhaar_number, is_verified, city, avatar_url)
    VALUES (N'Prakash Deshmukh', '9876543214', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym50CR621v3Yq0t3jZ2u56', 'SUPERVISOR', 'XXXX-XXXX-7788', 1, N'Mumbai', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80');
END;

-- Seed Worker Profiles
IF NOT EXISTS (SELECT * FROM worker_profiles WHERE user_id = 1)
BEGIN
    INSERT INTO worker_profiles (user_id, trade_skill, category, daily_wage_rate, experience_years, rating, bio, availability_status, location, completed_jobs_count)
    VALUES (1, N'Master Carpenter (राजमिस्त्री/कारपेंटर)', N'Carpentry', 950.00, 12, 4.90, N'12+ years experience in modular kitchen fitting, furniture restoration, and structural woodwork.', 'AVAILABLE', N'Andheri West, Mumbai', 142);
END;

IF NOT EXISTS (SELECT * FROM worker_profiles WHERE user_id = 2)
BEGIN
    INSERT INTO worker_profiles (user_id, trade_skill, category, daily_wage_rate, experience_years, rating, bio, availability_status, location, completed_jobs_count)
    VALUES (2, N'Electrician & Plumber', N'Electrical & Plumbing', 850.00, 8, 4.75, N'Expert in residential wiring, MCB installation, pipe leaks, and bathroom fittings.', 'AVAILABLE', N'Bandra East, Mumbai', 98);
END;

-- Seed Jobs
IF NOT EXISTS (SELECT * FROM jobs WHERE title = N'Kitchen Modular Fitting & Woodwork')
BEGIN
    INSERT INTO jobs (title, category, trade_skill_required, location, daily_rate, description, status, employer_id, worker_count_needed)
    VALUES (N'Kitchen Modular Fitting & Woodwork', N'Carpentry', N'Carpenter', N'Lokhandwala Complex, Andheri West', 950.00, N'Require 2 experienced carpenters for modular kitchen assembly and cabinet alignment.', 'OPEN', 3, 2);

    INSERT INTO jobs (title, category, trade_skill_required, location, daily_rate, description, status, employer_id, worker_count_needed)
    VALUES (N'Commercial Site Wiring & DB Box Setup', N'Electrical', N'Electrician', N'Bandra Kurla Complex (BKC)', 900.00, N'Full floor electrical conduit wiring and distribution box installation.', 'OPEN', 3, 3);
END;

-- Seed Bookings
IF NOT EXISTS (SELECT * FROM bookings WHERE id = 1)
BEGIN
    INSERT INTO bookings (job_id, worker_id, employer_id, status, start_date, end_date, agreed_daily_rate, total_amount, payment_status)
    VALUES (1, 1, 3, 'CONFIRMED', '2026-09-01', '2026-09-07', 950.00, 6650.00, 'PARTIAL');
END;

-- Seed Attendance
IF NOT EXISTS (SELECT * FROM attendance WHERE id = 1)
BEGIN
    INSERT INTO attendance (booking_id, worker_id, site_location, attendance_date, status, check_in_time, check_out_time, verification_method)
    VALUES (1, 1, N'Andheri Site A', '2026-09-01', 'PRESENT', '08:30 AM', '05:30 PM', 'BIOMETRIC');

    INSERT INTO attendance (booking_id, worker_id, site_location, attendance_date, status, check_in_time, check_out_time, verification_method)
    VALUES (1, 1, N'Andheri Site A', '2026-09-02', 'PRESENT', '08:45 AM', '05:30 PM', 'MANUAL_SUPERVISOR');
END;

-- Seed Khata Transactions
IF NOT EXISTS (SELECT * FROM khata_transactions WHERE id = 1)
BEGIN
    INSERT INTO khata_transactions (worker_id, employer_id, booking_id, transaction_date, amount, transaction_type, notes, status)
    VALUES (1, 3, 1, '2026-09-03', 2000.00, 'CASH_ADVANCE', N'Material advance for timber purchase', 'APPROVED');

    INSERT INTO khata_transactions (worker_id, employer_id, booking_id, transaction_date, amount, transaction_type, notes, status)
    VALUES (1, 3, 1, '2026-09-07', 4650.00, 'WAGE_PAYMENT', N'Weekly clearance wage payout', 'APPROVED');
END;

-- Seed Disputes
IF NOT EXISTS (SELECT * FROM disputes WHERE id = 1)
BEGIN
    INSERT INTO disputes (booking_id, raised_by_id, worker_id, employer_id, amount_in_dispute, reason, status, resolution_notes)
    VALUES (1, 1, 1, 3, 500.00, N'Overtime wage for extra 3 hours on 4th Sept not included in weekly passbook.', 'OPEN', N'Under review by site contractor Vikram Singh.');
END;
