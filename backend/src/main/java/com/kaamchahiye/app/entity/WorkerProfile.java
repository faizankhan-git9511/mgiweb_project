package com.kaamchahiye.app.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "worker_profiles")
public class WorkerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "trade_skill", nullable = false)
    private String tradeSkill;

    private String category;

    @Column(name = "daily_wage_rate", nullable = false)
    private BigDecimal dailyWageRate;

    @Column(name = "experience_years")
    private Integer experienceYears;

    private BigDecimal rating;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String bio;

    @Column(name = "availability_status")
    private String availabilityStatus; // AVAILABLE, ON_JOB, UNAVAILABLE

    private String location;

    @Column(name = "completed_jobs_count")
    private Integer completedJobsCount;

    public WorkerProfile() {}

    public WorkerProfile(Long id, User user, String tradeSkill, String category, BigDecimal dailyWageRate, Integer experienceYears, BigDecimal rating, String bio, String availabilityStatus, String location, Integer completedJobsCount) {
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

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

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

    public static WorkerProfileBuilder builder() {
        return new WorkerProfileBuilder();
    }

    public static class WorkerProfileBuilder {
        private Long id;
        private User user;
        private String tradeSkill;
        private String category;
        private BigDecimal dailyWageRate;
        private Integer experienceYears;
        private BigDecimal rating;
        private String bio;
        private String availabilityStatus;
        private String location;
        private Integer completedJobsCount;

        public WorkerProfileBuilder id(Long id) { this.id = id; return this; }
        public WorkerProfileBuilder user(User user) { this.user = user; return this; }
        public WorkerProfileBuilder tradeSkill(String tradeSkill) { this.tradeSkill = tradeSkill; return this; }
        public WorkerProfileBuilder category(String category) { this.category = category; return this; }
        public WorkerProfileBuilder dailyWageRate(BigDecimal dailyWageRate) { this.dailyWageRate = dailyWageRate; return this; }
        public WorkerProfileBuilder experienceYears(Integer experienceYears) { this.experienceYears = experienceYears; return this; }
        public WorkerProfileBuilder rating(BigDecimal rating) { this.rating = rating; return this; }
        public WorkerProfileBuilder bio(String bio) { this.bio = bio; return this; }
        public WorkerProfileBuilder availabilityStatus(String availabilityStatus) { this.availabilityStatus = availabilityStatus; return this; }
        public WorkerProfileBuilder location(String location) { this.location = location; return this; }
        public WorkerProfileBuilder completedJobsCount(Integer completedJobsCount) { this.completedJobsCount = completedJobsCount; return this; }

        public WorkerProfile build() {
            return new WorkerProfile(id, user, tradeSkill, category, dailyWageRate, experienceYears, rating, bio, availabilityStatus, location, completedJobsCount);
        }
    }
}
