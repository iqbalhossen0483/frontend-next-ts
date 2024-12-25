"use client";
import useAuth from "@/providers/stores/auth/userAuth";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  const store = useAuth();

  return (
    <Box>
      <Typography>This is a sample app</Typography>
      <Typography>{store?.user?.name}</Typography>
      <Typography>{store?.user?.email}</Typography>
      {store?.user ? (
        <Button variant='outlined' onClick={store?.logout}>
          Logout
        </Button>
      ) : (
        <Link href='/auth/login?login=true'>
          <Button variant='outlined'>Login</Button>
        </Link>
      )}
    </Box>
  );
}
