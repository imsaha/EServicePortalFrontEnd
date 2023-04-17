import {
  AppShell,
  Button,
  Code,
  Group,
  Header,
  Stack,
  Text,
} from "@mantine/core";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useMemo } from "react";
import jwtDecode from "jwt-decode";
import { TokenData } from "../../services/auth/types";

export default function MainLayout() {
  const authToken = useAuthStore((s) => s.auth);

  const clearAuth = useAuthStore((s) => s.clearAuth);

  const isTokenValid =
    !!authToken &&
    !!authToken?.expiry &&
    new Date(authToken?.expiry)?.getTime() >= new Date().getTime();

  const tokenDecoded = useMemo(() => {
    try {
      return jwtDecode<TokenData>(authToken?.accessToken ?? "");
    } catch {
      return undefined;
    }
  }, [authToken?.accessToken]);

  if (!isTokenValid) {
    return <Navigate to={`/auth/login?ret=${window.location.pathname}`} />;
  }

  return (
    <AppShell
      header={
        <Header height={60} p={10}>
          <Group position="apart">
            <Text size="lg" weight={500}>
              E-Service Portal
            </Text>

            <Group>
              {tokenDecoded?.given_name && (
                <Text>{tokenDecoded?.given_name}</Text>
              )}
              <Button onClick={clearAuth}>Logout</Button>
            </Group>
          </Group>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
}
