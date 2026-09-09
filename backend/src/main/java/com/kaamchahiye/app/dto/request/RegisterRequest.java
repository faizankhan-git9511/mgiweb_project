package com.kaamchahiye.app.dto.request;

import com.kaamchahiye.app.entity.Role;
import java.math.BigDecimal;

public class RegisterRequest {
    private String fullName;
    private String phoneNumber;
    private String password;
    private Role role;
    private String aadhaarNumber;
    private String city;
    private String avatarUrl;

    private String tradeSkill;
    private String category;
    private BigDecimal dailyWageRate;
    private Integer experienceYears;
    private String bio;

    public RegisterRequest() {}

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getAadhaarNumber() { return aadhaarNumber; }
    public void setAadhaarNumber(String aadhaarNumber) { this.aadhaarNumber = aadhaarNumber; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getTradeSkill() { return tradeSkill; }
    public void setTradeSkill(String tradeSkill) { this.tradeSkill = tradeSkill; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public BigDecimal getDailyWageRate() { return dailyWageRate; }
    public void setDailyWageRate(BigDecimal dailyWageRate) { this.dailyWageRate = dailyWageRate; }

    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
}
