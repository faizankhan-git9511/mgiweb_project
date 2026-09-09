package com.kaamchahiye.app.repository;

import com.kaamchahiye.app.entity.WorkerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface WorkerProfileRepository extends JpaRepository<WorkerProfile, Long> {
    Optional<WorkerProfile> findByUserId(Long userId);
    List<WorkerProfile> findByCategory(String category);
    List<WorkerProfile> findByAvailabilityStatus(String availabilityStatus);

    @Query("SELECT w FROM WorkerProfile w WHERE " +
           "(:category IS NULL OR LOWER(w.category) LIKE LOWER(CONCAT('%', :category, '%'))) AND " +
           "(:skill IS NULL OR LOWER(w.tradeSkill) LIKE LOWER(CONCAT('%', :skill, '%'))) AND " +
           "(:location IS NULL OR LOWER(w.location) LIKE LOWER(CONCAT('%', :location, '%')))")
    List<WorkerProfile> searchWorkers(@Param("category") String category,
                                      @Param("skill") String skill,
                                      @Param("location") String location);
}
