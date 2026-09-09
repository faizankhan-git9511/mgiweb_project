package com.kaamchahiye.app.service;

import com.kaamchahiye.app.dto.request.LoginRequest;
import com.kaamchahiye.app.dto.request.RegisterRequest;
import com.kaamchahiye.app.dto.response.AuthResponse;
import com.kaamchahiye.app.dto.response.UserDto;

public interface AuthService {
    AuthResponse login(LoginRequest request);
    AuthResponse register(RegisterRequest request);
    UserDto getCurrentUser(String phoneNumber);
}
