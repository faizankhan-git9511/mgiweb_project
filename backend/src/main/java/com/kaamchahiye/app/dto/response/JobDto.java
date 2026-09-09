package com.kaamchahiye.app.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class JobDto {
    private Long id;
    private String title;
    private String category;
    private String tradeSkillRequired;
    private String location;
    private BigDecimal dailyRate;
    private String description;
    private String status;
    private UserDto employer;
    private Integer workerCountNeeded;
    private LocalDateTime createdAt;

    public JobDto() {}

    public JobDto(Long id, String title, String category, String tradeSkillRequired, String location, BigDecimal dailyRate, String description, String status, UserDto employer, Integer workerCountNeeded, LocalDateTime createdAt) {
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

    public UserDto getEmployer() { return employer; }
    public void setEmployer(UserDto employer) { this.employer = employer; }

    public Integer getWorkerCountNeeded() { return workerCountNeeded; }
    public void setWorkerCountNeeded(Integer workerCountNeeded) { this.workerCountNeeded = workerCountNeeded; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static JobDtoBuilder builder() {
        return new JobDtoBuilder();
    }

    public static class JobDtoBuilder {
        private Long id;
        private String title;
        private String category;
        private String tradeSkillRequired;
        private String location;
        private BigDecimal dailyRate;
        private String description;
        private String status;
        private UserDto employer;
        private Integer workerCountNeeded;
        private LocalDateTime createdAt;

        public JobDtoBuilder id(Long id) { this.id = id; return this; }
        public JobDtoBuilder title(String title) { this.title = title; return this; }
        public JobDtoBuilder category(String category) { this.category = category; return this; }
        public JobDtoBuilder tradeSkillRequired(String tradeSkillRequired) { this.tradeSkillRequired = tradeSkillRequired; return this; }
        public JobDtoBuilder location(String location) { this.location = location; return this; }
        public JobDtoBuilder dailyRate(BigDecimal dailyRate) { this.dailyRate = dailyRate; return this; }
        public JobDtoBuilder description(String description) { this.description = description; return this; }
        public JobDtoBuilder status(String status) { this.status = status; return this; }
        public JobDtoBuilder employer(UserDto employer) { this.employer = employer; return this; }
        public JobDtoBuilder workerCountNeeded(Integer workerCountNeeded) { this.workerCountNeeded = workerCountNeeded; return this; }
        public JobDtoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public JobDto build() {
            return new JobDto(id, title, category, tradeSkillRequired, location, dailyRate, description, status, employer, workerCountNeeded, createdAt);
        }
    }
}
