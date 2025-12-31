import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminLogin from './pages/auth/AdminLogin';
import EmployeeLogin from './pages/auth/EmployeeLogin';
import LabLogin from './pages/auth/LabLogin';

import UserDashboard from './pages/dashboard/UserDashboard';
import AdminDashboard from './pages/dashboard/Dashboard';
import EmployeeDashboard from './pages/dashboard/EmployeeDashboard';
import LabDashboard from './pages/dashboard/LabDashboard';
import './styles/main.css';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoutes from './routes/AdminRoutes';

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/employee-login" element={<EmployeeLogin />} />
      <Route path="/lab-login" element={<LabLogin />} />

      {/* User */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="USER">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminRoutes />
          </ProtectedRoute>
        }
      />

      {/* Employee */}
      <Route
        path="/employee/dashboard"
        element={
          <ProtectedRoute role="EMPLOYEE">
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      {/* Lab */}
      <Route
        path="/lab/dashboard"
        element={
          <ProtectedRoute role="LAB">
            <LabDashboard />
          </ProtectedRoute>
        }
      />

      {/* Default */}
      <Route path="*" element={<AdminLogin />} />
    </Routes>
  );
}

export default App;
