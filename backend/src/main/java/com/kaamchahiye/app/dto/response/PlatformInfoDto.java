package com.kaamchahiye.app.dto.response;

import java.util.List;

public class PlatformInfoDto {
    private String appName;
    private String tagline;
    private String founder;
    private String founderRole;
    private String founderQuote;
    private Integer establishedYear;
    private String headquarters;
    private String totalVerifiedWorkers;
    private String totalWagePayoutsProcessed;
    private Integer supportedCitiesCount;
    private List<String> operationalCities;

    public PlatformInfoDto() {
    }

    public PlatformInfoDto(String appName, String tagline, String founder, String founderRole, String founderQuote, Integer establishedYear, String headquarters, String totalVerifiedWorkers, String totalWagePayoutsProcessed, Integer supportedCitiesCount, List<String> operationalCities) {
        this.appName = appName;
        this.tagline = tagline;
        this.founder = founder;
        this.founderRole = founderRole;
        this.founderQuote = founderQuote;
        this.establishedYear = establishedYear;
        this.headquarters = headquarters;
        this.totalVerifiedWorkers = totalVerifiedWorkers;
        this.totalWagePayoutsProcessed = totalWagePayoutsProcessed;
        this.supportedCitiesCount = supportedCitiesCount;
        this.operationalCities = operationalCities;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getTagline() {
        return tagline;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public String getFounder() {
        return founder;
    }

    public void setFounder(String founder) {
        this.founder = founder;
    }

    public String getFounderRole() {
        return founderRole;
    }

    public void setFounderRole(String founderRole) {
        this.founderRole = founderRole;
    }

    public String getFounderQuote() {
        return founderQuote;
    }

    public void setFounderQuote(String founderQuote) {
        this.founderQuote = founderQuote;
    }

    public Integer getEstablishedYear() {
        return establishedYear;
    }

    public void setEstablishedYear(Integer establishedYear) {
        this.establishedYear = establishedYear;
    }

    public String getHeadquarters() {
        return headquarters;
    }

    public void setHeadquarters(String headquarters) {
        this.headquarters = headquarters;
    }

    public String getTotalVerifiedWorkers() {
        return totalVerifiedWorkers;
    }

    public void setTotalVerifiedWorkers(String totalVerifiedWorkers) {
        this.totalVerifiedWorkers = totalVerifiedWorkers;
    }

    public String getTotalWagePayoutsProcessed() {
        return totalWagePayoutsProcessed;
    }

    public void setTotalWagePayoutsProcessed(String totalWagePayoutsProcessed) {
        this.totalWagePayoutsProcessed = totalWagePayoutsProcessed;
    }

    public Integer getSupportedCitiesCount() {
        return supportedCitiesCount;
    }

    public void setSupportedCitiesCount(Integer supportedCitiesCount) {
        this.supportedCitiesCount = supportedCitiesCount;
    }

    public List<String> getOperationalCities() {
        return operationalCities;
    }

    public void setOperationalCities(List<String> operationalCities) {
        this.operationalCities = operationalCities;
    }
}
