import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./auth";
import Home from "./home";
import AuthLayout from "../layouts/AuthLayout/index";
import MainLayout from "../layouts/MainLayout";

export default function Pages() {
  return (
    <Routes>
      <Route index element={<Navigate to="auth" />} />

      <Route element={<AuthLayout />}>
        <Route path="auth/*" element={<Auth />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="home/*" element={<Home />} />
      </Route>
    </Routes>
  );
}
