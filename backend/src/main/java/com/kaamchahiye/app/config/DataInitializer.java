package com.kaamchahiye.app.config;

import com.kaamchahiye.app.entity.Job;
import com.kaamchahiye.app.entity.Role;
import com.kaamchahiye.app.entity.User;
import com.kaamchahiye.app.entity.WorkerProfile;
import com.kaamchahiye.app.repository.JobRepository;
import com.kaamchahiye.app.repository.UserRepository;
import com.kaamchahiye.app.repository.WorkerProfileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final WorkerProfileRepository workerProfileRepository;
    private final JobRepository jobRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           WorkerProfileRepository workerProfileRepository,
                           JobRepository jobRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.workerProfileRepository = workerProfileRepository;
        this.jobRepository = jobRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        try {
            if (userRepository.count() == 0) {
                logger.info("Database is empty. Initializing default seed data for KaamChahiye platform...");

                // 1. Seed CEO / Admin account
                User ceo = User.builder()
                        .fullName("Faizan Khan")
                        .phoneNumber("9999999999")
                        .password(passwordEncoder.encode("admin123"))
                        .role(Role.ADMIN)
                        .aadhaarNumber("999988887777")
                        .isVerified(true)
                        .city("Mumbai")
                        .avatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80")
                        .build();
                userRepository.save(ceo);

                // 2. Seed Worker 1: Carpenter
                User workerUser1 = User.builder()
                        .fullName("Ramesh Sharma")
                        .phoneNumber("9876543210")
                        .password(passwordEncoder.encode("password123"))
                        .role(Role.WORKER)
                        .aadhaarNumber("123456789012")
                        .isVerified(true)
                        .city("Mumbai")
                        .avatarUrl("https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80")
                        .build();
                userRepository.save(workerUser1);

                WorkerProfile profile1 = WorkerProfile.builder()
                        .user(workerUser1)
                        .tradeSkill("Master Carpenter (राजमिस्त्री/कारपेंटर)")
                        .category("Civil & Structural")
                        .dailyWageRate(new BigDecimal("950.00"))
                        .experienceYears(10)
                        .rating(new BigDecimal("4.9"))
                        .bio("Expert in modular woodwork, kitchen cabinets, plywood shuttering, and door frame installations. Over 10 years experience across Mumbai.")
                        .availabilityStatus("AVAILABLE")
                        .location("Mumbai")
                        .completedJobsCount(48)
                        .build();
                workerProfileRepository.save(profile1);

                // 3. Seed Worker 2: Electrician
                User workerUser2 = User.builder()
                        .fullName("Suresh Kumar")
                        .phoneNumber("9876543211")
                        .password(passwordEncoder.encode("password123"))
                        .role(Role.WORKER)
                        .aadhaarNumber("234567890123")
                        .isVerified(true)
                        .city("Delhi NCR")
                        .avatarUrl("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80")
                        .build();
                userRepository.save(workerUser2);

                WorkerProfile profile2 = WorkerProfile.builder()
                        .user(workerUser2)
                        .tradeSkill("Certified Electrician & DB Wiring")
                        .category("Finishing & Utilities")
                        .dailyWageRate(new BigDecimal("900.00"))
                        .experienceYears(8)
                        .rating(new BigDecimal("4.8"))
                        .bio("Certified electrician with expertise in heavy conduit piping, DB box installations, short circuit diagnostics, and inverter setups.")
                        .availabilityStatus("AVAILABLE")
                        .location("Delhi NCR")
                        .completedJobsCount(35)
                        .build();
                workerProfileRepository.save(profile2);

                // 4. Seed Worker 3: Plumber
                User workerUser3 = User.builder()
                        .fullName("Mohd. Arif")
                        .phoneNumber("9876543212")
                        .password(passwordEncoder.encode("password123"))
                        .role(Role.WORKER)
                        .aadhaarNumber("345678901234")
                        .isVerified(true)
                        .city("Bengaluru")
                        .avatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80")
                        .build();
                userRepository.save(workerUser3);

                WorkerProfile profile3 = WorkerProfile.builder()
                        .user(workerUser3)
                        .tradeSkill("High-Rise Plumber & Pipe Fitter")
                        .category("Finishing & Utilities")
                        .dailyWageRate(new BigDecimal("850.00"))
                        .experienceYears(7)
                        .rating(new BigDecimal("4.9"))
                        .bio("Specialist in CPVC pipeline installation, water pump fitting, drain clearing, and bathroom sanitary fixtures.")
                        .availabilityStatus("AVAILABLE")
                        .location("Bengaluru")
                        .completedJobsCount(52)
                        .build();
                workerProfileRepository.save(profile3);

                // 5. Seed an Employer & Sample Job
                User employer = User.builder()
                        .fullName("BuildTech Construction")
                        .phoneNumber("9876543299")
                        .password(passwordEncoder.encode("employer123"))
                        .role(Role.EMPLOYER)
                        .city("Mumbai")
                        .isVerified(true)
                        .build();
                userRepository.save(employer);

                Job job1 = Job.builder()
                        .employer(employer)
                        .title("Residential 3BHK Modular Kitchen Carpentry")
                        .category("Civil & Structural")
                        .tradeSkillRequired("Master Carpenter")
                        .location("Andheri West, Mumbai")
                        .dailyRate(new BigDecimal("1000.00"))
                        .workerCountNeeded(2)
                        .description("Need 2 experienced carpenters for 7 days to install modular kitchen carcass, laminates, and soft-close hinges.")
                        .status("OPEN")
                        .build();
                jobRepository.save(job1);

                logger.info("KaamChahiye platform data successfully initialized!");
            }
        } catch (Exception e) {
            logger.warn("DataInitializer skipped or encountered an error: {}", e.getMessage());
        }
    }
}
