import {
  Alert,
  Anchor,
  Button,
  Group,
  Loader,
  LoadingOverlay,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import authService from "../../services/auth/index";
import { LoginCommand } from "../../services/auth/types";
import { useAuthStore } from "../../stores/authStore";

export default function Login() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const userRef = useRef<HTMLInputElement | null>();
  const passwordRef = useRef<HTMLInputElement | null>();
  const [error, setError] = useState<string>("");

  const { mutateAsync: loginAsync, isLoading } = useMutation(
    async (command: LoginCommand) => await authService.login(command),
    {
      onSuccess: (data) => {
        if (data.succeeded) {
          setAuth(data.data);
        } else {
          setError(data.message ?? "Failed to signup.");
          console.log(data);
        }
      },
      onError: (error) => setError("Failed unexpectedly"),
    }
  );

  const handleLogin = async () => {
    setError("");
    //TODO: Validate entries
    const command = {
      username: userRef.current?.value ?? "",
      password: passwordRef.current?.value ?? "",
    };
    await loginAsync(command);
  };

  return (
    <Paper radius="md" p="xl" withBorder miw={450}>
      <Text size="lg" weight={500}>
        Welcome back,
      </Text>
      <Text size="sm">Login using your email & password</Text>

      <Stack spacing={5} mt={10} pos="relative">
        <LoadingOverlay visible={isLoading} overlayBlur={2} />

        <TextInput
          ref={(x) => (userRef.current = x)}
          required
          label="Username"
          placeholder="username"
          radius="md"
        />

        <TextInput
          ref={(x) => (passwordRef.current = x)}
          required
          label="Password"
          placeholder="password"
          radius="md"
          type="password"
        />

        {error && (
          <Alert mt={5} variant="filled" color="red">
            <Text>{error}</Text>
          </Alert>
        )}

        <Group position="apart" mt="xl">
          <Anchor
            component={NavLink}
            to="../signup"
            type="button"
            color="dimmed"
            size="xs"
          >
            Don't have an account? Register
          </Anchor>
          <Button radius="xl" onClick={handleLogin}>
            Login
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
