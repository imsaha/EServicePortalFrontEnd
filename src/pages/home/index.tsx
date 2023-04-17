import { Group, Paper, Text } from "@mantine/core";
import jwtDecode from "jwt-decode";
import { useMemo } from "react";
import { TokenData } from "../../services/auth/types";
import { useAuthStore } from "../../stores/authStore";

export default function Home() {
  const authToken = useAuthStore((s) => s.auth);
  const tokenDecoded = useMemo(() => {
    try {
      return jwtDecode<TokenData>(authToken?.accessToken ?? "");
    } catch {
      return undefined;
    }
  }, [authToken?.accessToken]);

  return (
    <Paper withBorder p={10}>
      {tokenDecoded && (
        <>
          <Group>
            <Text>Username:</Text>
            <Text>{tokenDecoded.nameid}</Text>
          </Group>
          <Group>
            <Text>Email:</Text>
            <Text>{tokenDecoded.email}</Text>
          </Group>
          <Group>
            <Text>Mobile:</Text>
            <Text>{tokenDecoded.mobile}</Text>
          </Group>
          <Group>
            <Text>Display name:</Text>
            <Text>{tokenDecoded.given_name}</Text>
          </Group>
          <Group>
            <Text>Role:</Text>
            <Text>{tokenDecoded.role}</Text>
          </Group>
        </>
      )}
    </Paper>
  );
}
