-- Flyway Migration V1: Initial Schema for MSSQL (Microsoft SQL Server)

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        full_name NVARCHAR(100) NOT NULL,
        phone_number NVARCHAR(20) NOT NULL UNIQUE,
        password NVARCHAR(255) NOT NULL,
        role NVARCHAR(30) NOT NULL,
        aadhaar_number NVARCHAR(20),
        is_verified BIT DEFAULT 0,
        city NVARCHAR(100),
        avatar_url NVARCHAR(500),
        created_at DATETIME2 DEFAULT GETDATE()
    );
END;

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'worker_profiles')
BEGIN
    CREATE TABLE worker_profiles (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        user_id BIGINT NOT NULL UNIQUE FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE,
        trade_skill NVARCHAR(100) NOT NULL,
        category NVARCHAR(100),
        daily_wage_rate DECIMAL(18,2) NOT NULL,
        experience_years INT DEFAULT 0,
        rating DECIMAL(3,2) DEFAULT 5.00,
        bio NVARCHAR(MAX),
        availability_status NVARCHAR(30) DEFAULT 'AVAILABLE',
        location NVARCHAR(100),
        completed_jobs_count INT DEFAULT 0
    );
END;

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'jobs')
BEGIN
    CREATE TABLE jobs (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        title NVARCHAR(200) NOT NULL,
        category NVARCHAR(100) NOT NULL,
        trade_skill_required NVARCHAR(100) NOT NULL,
        location NVARCHAR(150) NOT NULL,
        daily_rate DECIMAL(18,2) NOT NULL,
        description NVARCHAR(MAX),
        status NVARCHAR(30) DEFAULT 'OPEN',
        employer_id BIGINT NOT NULL FOREIGN KEY REFERENCES users(id),
        worker_count_needed INT DEFAULT 1,
        created_at DATETIME2 DEFAULT GETDATE()
    );
END;

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'bookings')
BEGIN
    CREATE TABLE bookings (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        job_id BIGINT FOREIGN KEY REFERENCES jobs(id),
        worker_id BIGINT NOT NULL FOREIGN KEY REFERENCES users(id),
        employer_id BIGINT NOT NULL FOREIGN KEY REFERENCES users(id),
        status NVARCHAR(30) DEFAULT 'PENDING',
        start_date DATE,
        end_date DATE,
        agreed_daily_rate DECIMAL(18,2) NOT NULL,
        total_amount DECIMAL(18,2),
        payment_status NVARCHAR(30) DEFAULT 'UNPAID',
        created_at DATETIME2 DEFAULT GETDATE()
    );
END;

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'attendance')
BEGIN
    CREATE TABLE attendance (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        booking_id BIGINT FOREIGN KEY REFERENCES bookings(id),
        worker_id BIGINT NOT NULL FOREIGN KEY REFERENCES users(id),
        site_location NVARCHAR(200),
        attendance_date DATE NOT NULL,
        status NVARCHAR(30) NOT NULL,
        check_in_time NVARCHAR(20),
        check_out_time NVARCHAR(20),
        verification_method NVARCHAR(50) DEFAULT 'MANUAL_SUPERVISOR'
    );
END;

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'khata_transactions')
BEGIN
    CREATE TABLE khata_transactions (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        worker_id BIGINT NOT NULL FOREIGN KEY REFERENCES users(id),
        employer_id BIGINT NOT NULL FOREIGN KEY REFERENCES users(id),
        booking_id BIGINT FOREIGN KEY REFERENCES bookings(id),
        transaction_date DATE NOT NULL,
        amount DECIMAL(18,2) NOT NULL,
        transaction_type NVARCHAR(50) NOT NULL,
        notes NVARCHAR(500),
        status NVARCHAR(30) DEFAULT 'APPROVED',
        voucher_url NVARCHAR(500)
    );
END;

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'disputes')
BEGIN
    CREATE TABLE disputes (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        booking_id BIGINT FOREIGN KEY REFERENCES bookings(id),
        raised_by_id BIGINT NOT NULL FOREIGN KEY REFERENCES users(id),
        worker_id BIGINT NOT NULL FOREIGN KEY REFERENCES users(id),
        employer_id BIGINT NOT NULL FOREIGN KEY REFERENCES users(id),
        amount_in_dispute DECIMAL(18,2) NOT NULL,
        reason NVARCHAR(MAX) NOT NULL,
        status NVARCHAR(30) DEFAULT 'OPEN',
        resolution_notes NVARCHAR(MAX),
        created_at DATETIME2 DEFAULT GETDATE()
    );
END;

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'chat_messages')
BEGIN
    CREATE TABLE chat_messages (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        sender_id BIGINT NOT NULL FOREIGN KEY REFERENCES users(id),
        receiver_id BIGINT NOT NULL FOREIGN KEY REFERENCES users(id),
        booking_id BIGINT FOREIGN KEY REFERENCES bookings(id),
        content NVARCHAR(MAX) NOT NULL,
        sent_at DATETIME2 DEFAULT GETDATE(),
        read_status BIT DEFAULT 0
    );
END;
