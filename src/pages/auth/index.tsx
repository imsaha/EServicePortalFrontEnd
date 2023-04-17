import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";

export default function Auth() {
  return (
    <Routes>
      <Route index element={<Navigate to="login" />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
}
