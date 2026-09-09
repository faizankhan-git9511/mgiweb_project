package com.kaamchahiye.app.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category;

    @Column(name = "trade_skill_required", nullable = false)
    private String tradeSkillRequired;

    @Column(nullable = false)
    private String location;

    @Column(name = "daily_rate", nullable = false)
    private BigDecimal dailyRate;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String description;

    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id", nullable = false)
    private User employer;

    @Column(name = "worker_count_needed")
    private Integer workerCountNeeded;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    public Job() {}

    public Job(Long id, String title, String category, String tradeSkillRequired, String location, BigDecimal dailyRate, String description, String status, User employer, Integer workerCountNeeded, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.tradeSkillRequired = tradeSkillRequired;
        this.location = location;
        this.dailyRate = dailyRate;
        this.description = description;
        this.status = status;
        this.employer = employer;
        this.workerCountNeeded = workerCountNeeded;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getTradeSkillRequired() { return tradeSkillRequired; }
    public void setTradeSkillRequired(String tradeSkillRequired) { this.tradeSkillRequired = tradeSkillRequired; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public BigDecimal getDailyRate() { return dailyRate; }
    public void setDailyRate(BigDecimal dailyRate) { this.dailyRate = dailyRate; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public User getEmployer() { return employer; }
    public void setEmployer(User employer) { this.employer = employer; }

    public Integer getWorkerCountNeeded() { return workerCountNeeded; }
    public void setWorkerCountNeeded(Integer workerCountNeeded) { this.workerCountNeeded = workerCountNeeded; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static JobBuilder builder() {
        return new JobBuilder();
    }

    public static class JobBuilder {
        private Long id;
        private String title;
        private String category;
        private String tradeSkillRequired;
        private String location;
        private BigDecimal dailyRate;
        private String description;
        private String status;
        private User employer;
        private Integer workerCountNeeded;
        private LocalDateTime createdAt;

        public JobBuilder id(Long id) { this.id = id; return this; }
        public JobBuilder title(String title) { this.title = title; return this; }
        public JobBuilder category(String category) { this.category = category; return this; }
        public JobBuilder tradeSkillRequired(String tradeSkillRequired) { this.tradeSkillRequired = tradeSkillRequired; return this; }
        public JobBuilder location(String location) { this.location = location; return this; }
        public JobBuilder dailyRate(BigDecimal dailyRate) { this.dailyRate = dailyRate; return this; }
        public JobBuilder description(String description) { this.description = description; return this; }
        public JobBuilder status(String status) { this.status = status; return this; }
        public JobBuilder employer(User employer) { this.employer = employer; return this; }
        public JobBuilder workerCountNeeded(Integer workerCountNeeded) { this.workerCountNeeded = workerCountNeeded; return this; }
        public JobBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Job build() {
            return new Job(id, title, category, tradeSkillRequired, location, dailyRate, description, status, employer, workerCountNeeded, createdAt);
        }
    }
}
