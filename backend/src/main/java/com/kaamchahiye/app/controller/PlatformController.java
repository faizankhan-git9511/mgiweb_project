package com.kaamchahiye.app.controller;

import com.kaamchahiye.app.dto.response.CityDto;
import com.kaamchahiye.app.dto.response.PlatformInfoDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/platform")
public class PlatformController {

    @GetMapping("/info")
    public ResponseEntity<PlatformInfoDto> getPlatformInfo() {
        List<String> cities = Arrays.asList(
                "Mumbai", "Delhi NCR", "Bengaluru", "Pune", "Hyderabad",
                "Ahmedabad", "Kolkata", "Chennai", "Lucknow", "Jaipur"
        );

        PlatformInfoDto info = new PlatformInfoDto(
                "KaamChahiye.com",
                "India's #1 Grassroots Skilled Workforce & Daily Wage Passbook Portal",
                "Faizan Khan",
                "Founder & Chief Executive Officer",
                "Every skilled karigar in India deserves transparent daily payouts, Aadhaar-backed identity verification, and direct connection with employers without middleman exploitation.",
                2026,
                "Mumbai, Maharashtra, India",
                "5,000+",
                "₹1.2+ Crore",
                cities.size(),
                cities
        );

        return ResponseEntity.ok(info);
    }

    @GetMapping("/cities")
    public ResponseEntity<List<CityDto>> getOperationalCities() {
        List<CityDto> cities = Arrays.asList(
                new CityDto("mumbai", "Mumbai", "Maharashtra", "1,240+", "320+", Arrays.asList("Andheri West", "BKC", "Navi Mumbai", "Thane"), "Financial capital hub with active construction & daily wage sites."),
                new CityDto("delhi_ncr", "Delhi NCR", "Delhi / Haryana / UP", "980+", "275+", Arrays.asList("Gurugram", "Noida", "Dwarka Expressway"), "North India hub for high-rise steel rebar & MEP wiring."),
                new CityDto("bengaluru", "Bengaluru", "Karnataka", "850+", "210+", Arrays.asList("Whitefield", "Electronic City", "Hebbal"), "Commercial site projects requiring HVAC, electrical & finish masonry."),
                new CityDto("pune", "Pune", "Maharashtra", "620+", "160+", Arrays.asList("Hinjawadi", "Kharadi", "Wakad"), "Expanding industrial welding, POP plastering & woodwork."),
                new CityDto("hyderabad", "Hyderabad", "Telangana", "590+", "145+", Arrays.asList("HITEC City", "Gachibowli", "Kondapur"), "Major IT hub & infrastructure development sites."),
                new CityDto("ahmedabad", "Ahmedabad", "Gujarat", "480+", "115+", Arrays.asList("GIFT City", "SG Highway", "Sanand"), "Industrial zone with machine fitters & turners."),
                new CityDto("kolkata", "Kolkata", "West Bengal", "520+", "130+", Arrays.asList("Salt Lake Sector V", "New Town", "Rajarhat"), "Masonry, interior painting & bar bending hub."),
                new CityDto("chennai", "Chennai", "Tamil Nadu", "450+", "105+", Arrays.asList("OMR Corridor", "Sriperumbudur", "Guindy"), "Automotive & manufacturing belt needing certified welders."),
                new CityDto("lucknow", "Lucknow", "Uttar Pradesh", "390+", "90+", Arrays.asList("Gomti Nagar Extension", "Hazratganj"), "Residential township & infrastructure zone."),
                new CityDto("jaipur", "Jaipur", "Rajasthan", "340+", "85+", Arrays.asList("Vaishali Nagar", "Sitapura"), "Stone masonry, marble polishing & heritage restoration.")
        );

        return ResponseEntity.ok(cities);
    }
}
