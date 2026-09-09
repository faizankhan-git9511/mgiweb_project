package com.kaamchahiye.app.repository;

import com.kaamchahiye.app.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByEmployerId(Long employerId);
    List<Job> findByStatus(String status);
    
    @Query("SELECT j FROM Job j WHERE " +
           "(:category IS NULL OR LOWER(j.category) LIKE LOWER(CONCAT('%', :category, '%'))) AND " +
           "(:skill IS NULL OR LOWER(j.tradeSkillRequired) LIKE LOWER(CONCAT('%', :skill, '%'))) AND " +
           "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')))")
    List<Job> searchJobs(@Param("category") String category,
                         @Param("skill") String skill,
                         @Param("location") String location);
}
