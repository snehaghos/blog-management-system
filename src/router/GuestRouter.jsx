import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GuestLayout from "../layouts/GuestLayout/GuestLayout";
import { Home } from "../modules/Home";
import { Login, Register } from "../modules/Auth";

const GuestRouter = () => {
  return (
    <Routes>
      <Route element={<GuestLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default GuestRouter;
