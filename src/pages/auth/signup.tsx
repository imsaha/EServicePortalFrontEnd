import {
  Alert,
  Anchor,
  Button,
  Divider,
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
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../services/auth/index";
import { LoginCommand, SignupCommand } from "../../services/auth/types";
import { useAuthStore } from "../../stores/authStore";

export default function Signup() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const [command, setCommand] = useState({
    username: "",
    name: "",
    mobile: "",
    confirmPassword: "",
    email: "",
    password: "",
    role: "",
  } as SignupCommand);
  const [error, setError] = useState<string>("");
  const [failures, setFailures] = useState<Partial<SignupCommand>>();
  const navigate = useNavigate();

  const { mutateAsync: loginAsync, isLoading } = useMutation(
    async (command: SignupCommand) => await authService.signup(command),
    {
      onSuccess: (data) => {
        if (data.succeeded) {
          setAuth(data.data);
          navigate("../login");
        } else {
          setError(data.message ?? "Failed to signup.");
          setFailures(data.errors);
        }
      },
      onError: (error) => setError("Failed unexpectedly"),
    }
  );

  const handleLogin = async () => {
    setError("");
    //TODO: Validate entries
    await loginAsync(command);
  };

  return (
    <Paper radius="md" p="xl" withBorder miw={450} maw={650}>
      <Text size="lg" weight={500}>
        Welcome,
      </Text>
      <Text size="sm">Create a new account using email & password</Text>

      <Stack spacing={5} mt={10} pos="relative">
        <LoadingOverlay visible={isLoading} overlayBlur={2} />

        <TextInput
          value={command.name}
          error={failures?.name}
          onChange={(e) =>
            setCommand((ps) => ({ ...ps, name: e.target.value }))
          }
          required
          label="Name"
          placeholder="Your name"
          radius="md"
        />

        <TextInput
          value={command.mobile}
          error={failures?.mobile}
          onChange={(e) =>
            setCommand((ps) => ({ ...ps, mobile: e.target.value }))
          }
          required
          label="Mobile number"
          placeholder="+971 86564543"
          radius="md"
        />

        <TextInput
          value={command.email}
          error={failures?.email}
          onChange={(e) =>
            setCommand((ps) => ({ ...ps, email: e.target.value }))
          }
          required
          label="Email address"
          placeholder="you@example.com"
          radius="md"
        />

        <Divider my="xl" />

        <TextInput
          value={command.username}
          error={failures?.username}
          onChange={(e) =>
            setCommand((ps) => ({ ...ps, username: e.target.value }))
          }
          required
          label="Username"
          placeholder="username"
          radius="md"
        />

        <Group position="apart">
          <TextInput
            value={command.password}
            error={failures?.password}
            onChange={(e) =>
              setCommand((ps) => ({ ...ps, password: e.target.value }))
            }
            required
            label="Password"
            placeholder="password"
            radius="md"
            type="password"
            sx={{ flexGrow: 1 }}
          />

          <TextInput
            value={command.confirmPassword}
            error={failures?.confirmPassword}
            onChange={(e) =>
              setCommand((ps) => ({ ...ps, confirmPassword: e.target.value }))
            }
            required
            label="Confirm password"
            placeholder="password"
            radius="md"
            type="password"
            sx={{ flexGrow: 1 }}
          />
        </Group>

        {error && (
          <Alert mt={5} variant="filled" color="red">
            <Text>{error}</Text>
          </Alert>
        )}

        <Group position="apart" mt="xl">
          <Anchor
            component={NavLink}
            to="../login"
            type="button"
            color="dimmed"
            size="xs"
          >
            Already have an account? Login
          </Anchor>
          <Button radius="xl" onClick={handleLogin}>
            Signup
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
