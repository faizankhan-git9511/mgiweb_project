package com.kaamchahiye.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class RootController {

    @GetMapping({"/", "/api"})
    public ResponseEntity<Map<String, Object>> getRootStatus() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "KaamChahiye REST API");
        response.put("version", "1.0.0");
        response.put("message", "KaamChahiye Backend is active and running successfully on Render.");
        response.put("infoEndpoint", "/api/platform/info");
        response.put("citiesEndpoint", "/api/platform/cities");
        return ResponseEntity.ok(response);
    }
}
