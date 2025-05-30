import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Auth/Login";
import HomeDoctor from "@/pages/Doctor/HomeDoctor";
import ProtectedRoute from "./ProtectedRoute";
import AddDoctor from "@/pages/Doctor/AddDoctor";
import PublicRoute from "./PublicRoute";
import Appointments from "@/pages/Appointments/Appointments";

const AppRoute = () => {
  return (
    <Routes>
      {/* صفحة تسجيل الدخول (محمية ب PublicRoute) */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/admin-login" element={<Login />} />
      </Route>
      {/* الطرق المحمية */}
      <Route element={<ProtectedRoute />}>
        <Route path="/doctor" element={<HomeDoctor />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/appointments" element={<Appointments />} />
      </Route>

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default AppRoute;
