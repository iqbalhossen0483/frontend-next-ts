"use client";
import ThemeProvider from "@/providers/mui/ThemeProvider";
import useAuth from "@/providers/stores/auth/userAuth";
import TanstakProvider from "@/providers/tanstak/TanstakProvider";
import { Box, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const route = [
  "/auth",
  "/auth/login",
  "/auth/forgetpassword",
  "/auth/emailvarify",
  "/",
];

function MainComponent({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathName = usePathname();
  const router = useRouter();
  const store = useAuth();

  useEffect(() => {
    if (store?.user && pathName.includes("/auth")) {
      router.push("/");
    } else if (
      !store?.userLoading &&
      !store?.user &&
      !route.includes(pathName)
    ) {
      router.push("/auth/login?login=true");
      store?.setRedirect(pathName);
    }
    setLoading(false);
  }, [pathName, router, store?.user, store?.userLoading]);

  if (
    loading ||
    store?.userLoading ||
    (!store?.user && !route.includes(pathName))
  ) {
    return (
      <Box>
        <Typography>Loading...</Typography>
      </Box>
    );
  } else
    return (
      <ThemeProvider>
        <TanstakProvider>
          {children}
          <ToastContainer />
        </TanstakProvider>
      </ThemeProvider>
    );
}

export default MainComponent;
