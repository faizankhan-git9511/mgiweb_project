package com.kaamchahiye.app.dto.response;

import java.util.List;

public class CityDto {
    private String id;
    private String name;
    private String state;
    private String activeWorkersCount;
    private String activeJobsCount;
    private List<String> hubs;
    private String description;

    public CityDto() {
    }

    public CityDto(String id, String name, String state, String activeWorkersCount, String activeJobsCount, List<String> hubs, String description) {
        this.id = id;
        this.name = name;
        this.state = state;
        this.activeWorkersCount = activeWorkersCount;
        this.activeJobsCount = activeJobsCount;
        this.hubs = hubs;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getActiveWorkersCount() {
        return activeWorkersCount;
    }

    public void setActiveWorkersCount(String activeWorkersCount) {
        this.activeWorkersCount = activeWorkersCount;
    }

    public String getActiveJobsCount() {
        return activeJobsCount;
    }

    public void setActiveJobsCount(String activeJobsCount) {
        this.activeJobsCount = activeJobsCount;
    }

    public List<String> getHubs() {
        return hubs;
    }

    public void setHubs(List<String> hubs) {
        this.hubs = hubs;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
