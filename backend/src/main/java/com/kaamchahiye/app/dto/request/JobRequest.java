package com.kaamchahiye.app.dto.request;

import java.math.BigDecimal;

public class JobRequest {
    private String title;
    private String category;
    private String tradeSkillRequired;
    private String location;
    private BigDecimal dailyRate;
    private String description;
    private Integer workerCountNeeded;
    private String status;

    public JobRequest() {}

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

    public Integer getWorkerCountNeeded() { return workerCountNeeded; }
    public void setWorkerCountNeeded(Integer workerCountNeeded) { this.workerCountNeeded = workerCountNeeded; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
