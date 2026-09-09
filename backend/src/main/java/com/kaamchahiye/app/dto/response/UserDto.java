package com.kaamchahiye.app.dto.response;

import com.kaamchahiye.app.entity.Role;

public class UserDto {
    private Long id;
    private String fullName;
    private String phoneNumber;
    private Role role;
    private String aadhaarNumber;
    private Boolean isVerified;
    private String city;
    private String avatarUrl;

    public UserDto() {}

    public UserDto(Long id, String fullName, String phoneNumber, Role role, String aadhaarNumber, Boolean isVerified, String city, String avatarUrl) {
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.aadhaarNumber = aadhaarNumber;
        this.isVerified = isVerified;
        this.city = city;
        this.avatarUrl = avatarUrl;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getAadhaarNumber() { return aadhaarNumber; }
    public void setAadhaarNumber(String aadhaarNumber) { this.aadhaarNumber = aadhaarNumber; }

    public Boolean getIsVerified() { return isVerified; }
    public void setIsVerified(Boolean isVerified) { this.isVerified = isVerified; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public static UserDtoBuilder builder() {
        return new UserDtoBuilder();
    }

    public static class UserDtoBuilder {
        private Long id;
        private String fullName;
        private String phoneNumber;
        private Role role;
        private String aadhaarNumber;
        private Boolean isVerified;
        private String city;
        private String avatarUrl;

        public UserDtoBuilder id(Long id) { this.id = id; return this; }
        public UserDtoBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public UserDtoBuilder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
        public UserDtoBuilder role(Role role) { this.role = role; return this; }
        public UserDtoBuilder aadhaarNumber(String aadhaarNumber) { this.aadhaarNumber = aadhaarNumber; return this; }
        public UserDtoBuilder isVerified(Boolean isVerified) { this.isVerified = isVerified; return this; }
        public UserDtoBuilder city(String city) { this.city = city; return this; }
        public UserDtoBuilder avatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; return this; }

        public UserDto build() {
            return new UserDto(id, fullName, phoneNumber, role, aadhaarNumber, isVerified, city, avatarUrl);
        }
    }
}
