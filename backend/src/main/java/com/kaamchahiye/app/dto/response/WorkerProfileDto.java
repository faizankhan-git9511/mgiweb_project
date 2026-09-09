package com.kaamchahiye.app.dto.response;

import java.math.BigDecimal;

public class WorkerProfileDto {
    private Long id;
    private UserDto user;
    private String tradeSkill;
    private String category;
    private BigDecimal dailyWageRate;
    private Integer experienceYears;
    private BigDecimal rating;
    private String bio;
    private String availabilityStatus;
    private String location;
    private Integer completedJobsCount;

    public WorkerProfileDto() {}

    public WorkerProfileDto(Long id, UserDto user, String tradeSkill, String category, BigDecimal dailyWageRate, Integer experienceYears, BigDecimal rating, String bio, String availabilityStatus, String location, Integer completedJobsCount) {
        this.id = id;
        this.user = user;
        this.tradeSkill = tradeSkill;
        this.category = category;
        this.dailyWageRate = dailyWageRate;
        this.experienceYears = experienceYears;
        this.rating = rating;
        this.bio = bio;
        this.availabilityStatus = availabilityStatus;
        this.location = location;
        this.completedJobsCount = completedJobsCount;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public UserDto getUser() { return user; }
    public void setUser(UserDto user) { this.user = user; }

    public String getTradeSkill() { return tradeSkill; }
    public void setTradeSkill(String tradeSkill) { this.tradeSkill = tradeSkill; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public BigDecimal getDailyWageRate() { return dailyWageRate; }
    public void setDailyWageRate(BigDecimal dailyWageRate) { this.dailyWageRate = dailyWageRate; }

    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }

    public BigDecimal getRating() { return rating; }
    public void setRating(BigDecimal rating) { this.rating = rating; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getAvailabilityStatus() { return availabilityStatus; }
    public void setAvailabilityStatus(String availabilityStatus) { this.availabilityStatus = availabilityStatus; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Integer getCompletedJobsCount() { return completedJobsCount; }
    public void setCompletedJobsCount(Integer completedJobsCount) { this.completedJobsCount = completedJobsCount; }

    public static WorkerProfileDtoBuilder builder() {
        return new WorkerProfileDtoBuilder();
    }

    public static class WorkerProfileDtoBuilder {
        private Long id;
        private UserDto user;
        private String tradeSkill;
        private String category;
        private BigDecimal dailyWageRate;
        private Integer experienceYears;
        private BigDecimal rating;
        private String bio;
        private String availabilityStatus;
        private String location;
        private Integer completedJobsCount;

        public WorkerProfileDtoBuilder id(Long id) { this.id = id; return this; }
        public WorkerProfileDtoBuilder user(UserDto user) { this.user = user; return this; }
        public WorkerProfileDtoBuilder tradeSkill(String tradeSkill) { this.tradeSkill = tradeSkill; return this; }
        public WorkerProfileDtoBuilder category(String category) { this.category = category; return this; }
        public WorkerProfileDtoBuilder dailyWageRate(BigDecimal dailyWageRate) { this.dailyWageRate = dailyWageRate; return this; }
        public WorkerProfileDtoBuilder experienceYears(Integer experienceYears) { this.experienceYears = experienceYears; return this; }
        public WorkerProfileDtoBuilder rating(BigDecimal rating) { this.rating = rating; return this; }
        public WorkerProfileDtoBuilder bio(String bio) { this.bio = bio; return this; }
        public WorkerProfileDtoBuilder availabilityStatus(String availabilityStatus) { this.availabilityStatus = availabilityStatus; return this; }
        public WorkerProfileDtoBuilder location(String location) { this.location = location; return this; }
        public WorkerProfileDtoBuilder completedJobsCount(Integer completedJobsCount) { this.completedJobsCount = completedJobsCount; return this; }

        public WorkerProfileDto build() {
            return new WorkerProfileDto(id, user, tradeSkill, category, dailyWageRate, experienceYears, rating, bio, availabilityStatus, location, completedJobsCount);
        }
    }
}
