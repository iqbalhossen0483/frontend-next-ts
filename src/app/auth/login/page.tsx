"use client";

import SocialMediaLogin from "@/components/login/SocialMediaLogin";
import useAuth from "@/providers/stores/auth/userAuth";
import { http } from "@/services/axios";
import { User } from "@/types/user";
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";

type Data = {
  firstName?: string;
  lastName?: string;
  name: string;
  email: string;
  password: string;
};
type Response = {
  success: boolean;
  token: string;
  user: User;
};
type Message = {
  type: "error" | "success";
  message: string;
} | null;
const defaultData = {
  firstName: "",
  lastName: "",
  name: "",
  email: "",
  password: "",
};
const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [data, setData] = useState<Data>(defaultData);
  const [alert, setAlert] = useState<Message>(null);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const store = useAuth();
  const router = useRouter();
  const query = useSearchParams();

  useEffect(() => {
    const isLogin = query.get("login");
    if (isLogin) setLogin(true);
  }, [query]);

  function handleInput(key: string, value: string) {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  }

  async function onsubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setAlert(null);
      setLoading(true);
      //login process;
      if (login) {
        const { data: res } = await http.post<Response>("/auth/login", data);
        store?.setUser(res.user);
        localStorage.setItem("token", res.token);
        router.push(store?.redirect || "/");
      }
      //registration process;
      else {
        const name = data.firstName + " " + data.lastName;
        data.name = name;
        delete data.firstName;
        delete data.lastName;
        const { data: res } = await http.post<Response>("/auth/register", data);

        setAlert({ type: "success", message: "Registration successful" });

        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            id: res.user._id,
            token: res.token,
            email: data.email,
          })
        );
        router.push(`/auth/emailvarify`);
      }
    } catch (error: any) {
      const msg = error.response.data.message || error.response.data;
      setAlert({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card sx={{ maxWidth: "500px", mx: "auto", mt: 7, px: 2, pt: 5, pb: 2 }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant='h5' fontWeight='bold'>
          {login ? "Sign In" : "Create account"}
        </Typography>
        <Typography sx={{ color: "text.secondary", mt: 1 }}>
          {login
            ? "Hi! Welcome back, you’ve been missed"
            : "Fill your information below or register with your social account."}
        </Typography>
      </Box>
      <Stack
        direction='column'
        spacing={2}
        sx={{ mt: login ? 10 : 5 }}
        component='form'
        onSubmit={(e) => onsubmit(e)}
      >
        {!login ? (
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            <TextField
              required
              label='First Name'
              onChange={(e) => handleInput("firstName", e.target.value)}
              fullWidth
            />
            <TextField
              required
              label='Last Name'
              onChange={(e) => handleInput("lastName", e.target.value)}
              fullWidth
            />
          </Box>
        ) : null}

        <TextField
          required
          label='Email'
          type='email'
          onChange={(e) => handleInput("email", e.target.value)}
          fullWidth
        />

        <Box sx={{ position: "relative", width: "100%" }}>
          <TextField
            fullWidth
            required
            label='Password'
            type={showPassword ? "text" : "password"}
            onChange={(e) => handleInput("password", e.target.value)}
            variant='outlined'
          />
          <IconButton
            type='button'
            onClick={() => setShowPassword((prev) => !prev)}
            sx={{
              position: "absolute",
              top: "50%",
              right: 8,
              transform: "translateY(-50%)",
              color: "text.secondary",
            }}
          >
            {showPassword ? <MdRemoveRedEye /> : <IoEyeOff />}
          </IconButton>
        </Box>

        {!login ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              required
              id='term'
              sx={{
                "&.Mui-checked": {
                  color: "primary.main",
                },
                "&.MuiCheckbox-root": {
                  borderColor: "primary.main",
                },
                "&.Mui-focusVisible": {
                  borderColor: "none",
                },
              }}
            />
            <label htmlFor='term'>
              <Typography variant='body2' sx={{ cursor: "pointer" }}>
                I Agree with{" "}
                <Link component={NextLink} href='/' color='primary'>
                  Terms & Conditions
                </Link>
              </Typography>
            </label>
          </Box>
        ) : (
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <Link
              component={NextLink}
              href='/auth/forgetpassword'
              sx={{
                color: "primary.main",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Forgot Password?
            </Link>
          </Box>
        )}

        {alert && <Alert severity={alert.type}>{alert.message}</Alert>}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant='contained'
            disabled={loading}
            type='submit'
            sx={{ width: "50%" }}
          >
            {loading ? "Loading.." : login ? "Sign In" : "Create account"}
          </Button>
        </Box>
      </Stack>

      <SocialMediaLogin
        setError={setAlert}
        loading={loading}
        setLoading={setLoading}
      />

      <Typography sx={{ color: "text.secondary", textAlign: "center" }}>
        {login ? "Don’t have an account" : "Already have an account?"}{" "}
        <Link
          component='span'
          onClick={() => setLogin((prev) => !prev)}
          sx={{
            cursor: "pointer",
            color: "primary.main",
            textDecoration: "underline",
          }}
        >
          Sign {!login ? "In" : "Up"}
        </Link>
      </Typography>
    </Card>
  );
};

export default Login;
