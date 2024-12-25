"use client";

import useAuth from "@/providers/stores/auth/userAuth";
import { http } from "@/services/axios";
import {
  Alert,
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
const defaultData = {
  email: "",
  password: "",
};

type Message = {
  type: "error" | "success";
  message: string;
} | null;

const ForgetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [varified, setVarified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(defaultData);
  const [alert, setAlert] = useState<Message>(null);
  const store = useAuth();
  const router = useRouter();
  const param = useSearchParams();

  function handleInput(key: string, value: string) {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  }

  useEffect(() => {
    const varify = param.get("varified");
    if (varify) {
      setVarified(true);
      setData({ email: param.get("email") || "", password: "" });
    }
  }, [param]);

  async function onsubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      if (!data.email) throw { message: "Email is required" };
      setLoading(true);
      setAlert(null);
      //reset password field;
      if (varified) {
        await http.post("/auth/reset-password", {
          email: data.email,
          password: data.password,
        });
        router.push("/auth/login?login=true");
        store?.setRedirect("/");
        setAlert({ type: "success", message: "Password reset successfully" });
      }
      //send otp password
      else {
        await http.post("/auth/sent-otp", {
          email: data.email,
        });

        router.push(`/auth/emailvarify`);
        localStorage.setItem("userInfo", JSON.stringify({ email: data.email }));
        store?.setRedirect(
          `/auth/forgetpassword?email=${data.email}&varified=true`
        );
      }
    } catch (error: any) {
      setAlert({ type: "error", message: error.response.data.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card sx={{ maxWidth: "500px", mx: "auto", mt: 7, px: 2, pt: 5, pb: 2 }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant='h5' fontWeight='bold'>
          Reset your password
        </Typography>
        <Typography sx={{ color: "text.secondary", mt: 1 }}>
          {varified
            ? "Enter your new password"
            : "Please enter the email of your sharekorbo account below"}
        </Typography>
      </Box>
      <Stack
        direction='column'
        spacing={2}
        component='form'
        onSubmit={(e) => onsubmit(e)}
      >
        <TextField
          required={!varified}
          disabled={varified}
          label={varified ? "" : "Email"}
          type='email'
          defaultValue={data.email || ""}
          onChange={(e) => handleInput("email", e.target.value)}
        />

        {varified && (
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
        )}
        {alert && <Alert severity={alert.type}>{alert.message}</Alert>}

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant='contained'
            disabled={loading}
            type='submit'
            sx={{ width: "50%" }}
          >
            {loading ? "Loading..." : "Send request"}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};

export default ForgetPassword;
