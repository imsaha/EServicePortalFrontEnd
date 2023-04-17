import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { Stack, Paper, Text } from "@mantine/core";

export default function AuthLayout() {
  const authToken = useAuthStore((s) => s.auth);

  const isTokenValid =
    !!authToken &&
    !!authToken?.expiry &&
    new Date(authToken?.expiry)?.getTime() >= new Date().getTime();

  if (isTokenValid) {
    return <Navigate to={"/home"} />;
  }

  return (
    <Paper
      sx={{
        height: "100dvh",
        width: "100%",
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Outlet />
    </Paper>
  );
}
