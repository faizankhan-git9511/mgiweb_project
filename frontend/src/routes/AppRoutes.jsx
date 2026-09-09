import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import HomeMarketplace from '../pages/Home/HomeMarketplace';
import AboutUs from '../pages/About/AboutUs';
import CustomerService from '../pages/Support/CustomerService';
import AdminCeoDashboard from '../pages/Admin/AdminCeoDashboard';
import FindWorkers from '../pages/Workers/FindWorkers';
import WorkerDetail from '../pages/Workers/WorkerDetail';
import PostJob from '../pages/Jobs/PostJob';
import BookingConfirmation from '../pages/Bookings/BookingConfirmation';
import ClientDashboard from '../pages/Bookings/ClientDashboard';
import WorkerDashboard from '../pages/Bookings/WorkerDashboard';
import DailyWageKhata from '../pages/Khata/DailyWageKhata';
import MusterRoll from '../pages/Attendance/MusterRoll';
import DisputeRedressal from '../pages/Disputes/DisputeRedressal';
import InAppChat from '../pages/Chat/InAppChat';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomeMarketplace />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/support" element={<CustomerService />} />
      <Route path="/customer-service" element={<CustomerService />} />
      <Route path="/workers" element={<FindWorkers />} />
      <Route path="/workers/:id" element={<WorkerDetail />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/admin" element={<AdminCeoDashboard />} />
        <Route path="/admin" element={<AdminCeoDashboard />} />
        <Route path="/jobs/post" element={<PostJob />} />
        <Route path="/bookings/confirm" element={<BookingConfirmation />} />
        <Route path="/dashboard/client" element={<ClientDashboard />} />
        <Route path="/dashboard/worker" element={<WorkerDashboard />} />
        <Route path="/khata" element={<DailyWageKhata />} />
        <Route path="/cash-approval" element={<DailyWageKhata />} />
        <Route path="/attendance/muster-roll" element={<MusterRoll />} />
        <Route path="/disputes" element={<DisputeRedressal />} />
        <Route path="/chat" element={<InAppChat />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
