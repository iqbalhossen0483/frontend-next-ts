"use client";

import useAuth from "@/providers/stores/auth/userAuth";
import { http } from "@/services/axios";
import { User } from "@/types/user";
import {
  Alert,
  Box,
  Button,
  Card,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Message = {
  type: "error" | "success";
  message: string;
} | null;
type Response = {
  success: boolean;
  token: string;
  user: User;
};

const VarifyEmail = () => {
  const [alert, setAlert] = useState<Message>(null);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const store = useAuth();
  const router = useRouter();

  async function onsubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setAlert(null);

      const userInfo = localStorage.getItem("userInfo");
      if (!userInfo) {
        throw { message: "Somthing went wrong, Try agin" };
      }
      const user = JSON.parse(userInfo);

      setLoading(true);
      const { data: res } = await http.post<Response>("/auth/verify-otp", {
        email: user.email,
        otp: otp,
      });
      setAlert({ type: "success", message: "Email varified" });

      if (!store?.redirect.startsWith("/auth")) {
        store?.setUser(res.user);
      }
      localStorage.setItem("token", res.token);
      router.push(store?.redirect || "/");
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
          Varify your Email
        </Typography>
        <Typography sx={{ color: "text.secondary", mt: 1 }}>
          We sent a OTP to your email address
        </Typography>
      </Box>
      <Stack
        direction='column'
        spacing={2}
        component='form'
        onSubmit={(e) => onsubmit(e)}
      >
        <TextField
          required
          label='OTP'
          variant='outlined'
          type='number'
          onChange={(e) => setOtp(e.target.value)}
        />

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

export default VarifyEmail;
