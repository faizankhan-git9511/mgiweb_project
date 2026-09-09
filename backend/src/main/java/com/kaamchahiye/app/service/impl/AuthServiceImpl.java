package com.kaamchahiye.app.service.impl;

import com.kaamchahiye.app.dto.request.LoginRequest;
import com.kaamchahiye.app.dto.request.RegisterRequest;
import com.kaamchahiye.app.dto.response.AuthResponse;
import com.kaamchahiye.app.dto.response.UserDto;
import com.kaamchahiye.app.entity.Role;
import com.kaamchahiye.app.entity.User;
import com.kaamchahiye.app.entity.WorkerProfile;
import com.kaamchahiye.app.exception.BadRequestException;
import com.kaamchahiye.app.exception.ResourceNotFoundException;
import com.kaamchahiye.app.mapper.AppMapper;
import com.kaamchahiye.app.repository.UserRepository;
import com.kaamchahiye.app.repository.WorkerProfileRepository;
import com.kaamchahiye.app.security.JwtUtil;
import com.kaamchahiye.app.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final WorkerProfileRepository workerProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AppMapper appMapper;

    public AuthServiceImpl(UserRepository userRepository,
                           WorkerProfileRepository workerProfileRepository,
                           PasswordEncoder passwordEncoder,
                           JwtUtil jwtUtil,
                           AppMapper appMapper) {
        this.userRepository = userRepository;
        this.workerProfileRepository = workerProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.appMapper = appMapper;
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByPhoneNumber(request.getPhoneNumber())
                .orElseThrow(() -> new BadRequestException("Invalid phone number or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid phone number or password");
        }

        String token = jwtUtil.generateToken(user.getPhoneNumber(), user.getRole().name(), user.getId());

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .user(appMapper.toUserDto(user))
                .build();
    }

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new BadRequestException("Phone number is already registered");
        }

        Role userRole = request.getRole() != null ? request.getRole() : Role.WORKER;

        User user = User.builder()
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(userRole)
                .aadhaarNumber(request.getAadhaarNumber())
                .isVerified(true)
                .city(request.getCity() != null ? request.getCity() : "Mumbai")
                .avatarUrl(request.getAvatarUrl() != null ? request.getAvatarUrl() : "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80")
                .build();

        User savedUser = userRepository.save(user);

        if (userRole == Role.WORKER) {
            WorkerProfile profile = WorkerProfile.builder()
                    .user(savedUser)
                    .tradeSkill(request.getTradeSkill() != null ? request.getTradeSkill() : "General Worker")
                    .category(request.getCategory() != null ? request.getCategory() : "General")
                    .dailyWageRate(request.getDailyWageRate() != null ? request.getDailyWageRate() : new BigDecimal("750.00"))
                    .experienceYears(request.getExperienceYears() != null ? request.getExperienceYears() : 1)
                    .rating(new BigDecimal("5.00"))
                    .bio(request.getBio() != null ? request.getBio() : "Experienced and punctual worker ready for daily assignments.")
                    .availabilityStatus("AVAILABLE")
                    .location(savedUser.getCity())
                    .completedJobsCount(0)
                    .build();
            workerProfileRepository.save(profile);
        }

        String token = jwtUtil.generateToken(savedUser.getPhoneNumber(), savedUser.getRole().name(), savedUser.getId());

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .user(appMapper.toUserDto(savedUser))
                .build();
    }

    @Override
    public UserDto getCurrentUser(String phoneNumber) {
        User user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return appMapper.toUserDto(user);
    }
}
