"use client";

import {
  facebookProvider,
  googleProvider,
} from "@/providers/stores/auth/firebase";
import useAuth from "@/providers/stores/auth/userAuth";
import { http } from "@/services/axios";
import { User } from "@/types/user";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { getAuth, User as googleUser, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

type Response = {
  success: boolean;
  token: string;
  user: User;
};
type Message = {
  type: "error" | "success";
  message: string;
} | null;

type props = {
  setError: Dispatch<SetStateAction<Message>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const SocialMediaLogin = ({ setError, loading, setLoading }: props) => {
  const store = useAuth();
  const router = useRouter();

  async function googleLogin() {
    try {
      setLoading(true);
      const auth = getAuth();
      const result = await signInWithPopup(auth, googleProvider);
      formatData(result.user);
    } catch (error) {
      handleError(error);
    }
  }

  async function facebookLogin() {
    try {
      setLoading(true);
      const auth = getAuth();
      const result = await signInWithPopup(auth, facebookProvider);
      formatData(result.user);
    } catch (error) {
      handleError(error);
    }
  }

  async function formatData(user: googleUser) {
    try {
      const data = {
        email: user.email || user.uid + "@gmail.com",
        password: user.uid || "",
        profile: user.photoURL || "",
        name: user.displayName || "",
      };

      const { data: res } = await http.post<Response>(
        "/auth/register?social=true",
        data
      );
      console.log(res);
      store?.setUser(res.user);
      localStorage.setItem("token", res.token);
      router.push(store?.redirect || "/");
    } catch (error) {
      console.log(error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  }

  function handleError(error: any) {
    setError({
      type: "error",
      message: error.response.data.message || "Something went wrong. Please try again later.",
    });
  }

  return (
    <Box>
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography sx={{ color: "text.secondary", display: "inline" }}>
          - - - - - - - - - - Or - - - - - - - - - - -
        </Typography>
        <br />
        <Typography sx={{ color: "text.secondary" }}>
          Create account with
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 3, justifyContent: "center", my: 3 }}>
        <Tooltip title='Google' placement='top' arrow>
          <IconButton
            disabled={loading}
            onClick={googleLogin}
            sx={{
              width: 50,
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
              backgroundColor: "#F4B400",
              color: "white",
              "&:hover": {
                backgroundColor: "#d19b04",
              },
            }}
          >
            <FaGoogle size={24} />
          </IconButton>
        </Tooltip>
        <Tooltip title='Facebook' placement='top' arrow>
          <IconButton
            disabled={loading}
            onClick={facebookLogin}
            sx={{
              width: 50,
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
              backgroundColor: "#4285F4",
              color: "white",
              "&:hover": {
                backgroundColor: "#357ae8",
              },
            }}
          >
            <FaFacebook size={24} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default SocialMediaLogin;
