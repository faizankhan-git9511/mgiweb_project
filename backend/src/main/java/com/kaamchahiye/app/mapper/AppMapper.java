package com.kaamchahiye.app.mapper;

import com.kaamchahiye.app.dto.response.*;
import com.kaamchahiye.app.entity.*;
import org.springframework.stereotype.Component;

@Component
public class AppMapper {

    public UserDto toUserDto(User user) {
        if (user == null) return null;
        return UserDto.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .aadhaarNumber(user.getAadhaarNumber())
                .isVerified(user.getIsVerified())
                .city(user.getCity())
                .avatarUrl(user.getAvatarUrl())
                .build();
    }

    public WorkerProfileDto toWorkerProfileDto(WorkerProfile profile) {
        if (profile == null) return null;
        return WorkerProfileDto.builder()
                .id(profile.getId())
                .user(toUserDto(profile.getUser()))
                .tradeSkill(profile.getTradeSkill())
                .category(profile.getCategory())
                .dailyWageRate(profile.getDailyWageRate())
                .experienceYears(profile.getExperienceYears())
                .rating(profile.getRating())
                .bio(profile.getBio())
                .availabilityStatus(profile.getAvailabilityStatus())
                .location(profile.getLocation())
                .completedJobsCount(profile.getCompletedJobsCount())
                .build();
    }

    public JobDto toJobDto(Job job) {
        if (job == null) return null;
        return JobDto.builder()
                .id(job.getId())
                .title(job.getTitle())
                .category(job.getCategory())
                .tradeSkillRequired(job.getTradeSkillRequired())
                .location(job.getLocation())
                .dailyRate(job.getDailyRate())
                .description(job.getDescription())
                .status(job.getStatus())
                .employer(toUserDto(job.getEmployer()))
                .workerCountNeeded(job.getWorkerCountNeeded())
                .createdAt(job.getCreatedAt())
                .build();
    }

    public BookingDto toBookingDto(Booking booking) {
        if (booking == null) return null;
        return BookingDto.builder()
                .id(booking.getId())
                .job(toJobDto(booking.getJob()))
                .worker(toUserDto(booking.getWorker()))
                .employer(toUserDto(booking.getEmployer()))
                .status(booking.getStatus())
                .startDate(booking.getStartDate())
                .endDate(booking.getEndDate())
                .agreedDailyRate(booking.getAgreedDailyRate())
                .totalAmount(booking.getTotalAmount())
                .paymentStatus(booking.getPaymentStatus())
                .createdAt(booking.getCreatedAt())
                .build();
    }

    public AttendanceDto toAttendanceDto(Attendance attendance) {
        if (attendance == null) return null;
        return AttendanceDto.builder()
                .id(attendance.getId())
                .bookingId(attendance.getBooking() != null ? attendance.getBooking().getId() : null)
                .worker(toUserDto(attendance.getWorker()))
                .siteLocation(attendance.getSiteLocation())
                .attendanceDate(attendance.getAttendanceDate())
                .status(attendance.getStatus())
                .checkInTime(attendance.getCheckInTime())
                .checkOutTime(attendance.getCheckOutTime())
                .verificationMethod(attendance.getVerificationMethod())
                .build();
    }

    public KhataTransactionDto toKhataTransactionDto(KhataTransaction khata) {
        if (khata == null) return null;
        return KhataTransactionDto.builder()
                .id(khata.getId())
                .worker(toUserDto(khata.getWorker()))
                .employer(toUserDto(khata.getEmployer()))
                .bookingId(khata.getBooking() != null ? khata.getBooking().getId() : null)
                .transactionDate(khata.getTransactionDate())
                .amount(khata.getAmount())
                .transactionType(khata.getTransactionType())
                .notes(khata.getNotes())
                .status(khata.getStatus())
                .voucherUrl(khata.getVoucherUrl())
                .build();
    }

    public DisputeDto toDisputeDto(Dispute dispute) {
        if (dispute == null) return null;
        return DisputeDto.builder()
                .id(dispute.getId())
                .bookingId(dispute.getBooking() != null ? dispute.getBooking().getId() : null)
                .raisedBy(toUserDto(dispute.getRaisedBy()))
                .worker(toUserDto(dispute.getWorker()))
                .employer(toUserDto(dispute.getEmployer()))
                .amountInDispute(dispute.getAmountInDispute())
                .reason(dispute.getReason())
                .status(dispute.getStatus())
                .resolutionNotes(dispute.getResolutionNotes())
                .createdAt(dispute.getCreatedAt())
                .build();
    }

    public ChatMessageDto toChatMessageDto(ChatMessage message) {
        if (message == null) return null;
        return ChatMessageDto.builder()
                .id(message.getId())
                .sender(toUserDto(message.getSender()))
                .receiver(toUserDto(message.getReceiver()))
                .bookingId(message.getBooking() != null ? message.getBooking().getId() : null)
                .content(message.getContent())
                .sentAt(message.getSentAt())
                .readStatus(message.getReadStatus())
                .build();
    }
}
