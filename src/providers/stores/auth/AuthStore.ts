import { http } from "@/services/axios";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { store } from "./auth_store_type";

type Response = {
  success: boolean;
  token: string;
  user: User;
};

function AuthStore(): store {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [redirect, setRedirect] = useState("/");

  useEffect(() => {
    (async () => {
      try {
        const { data: res } = await http.get<Response>("/auth/me");
        setUser(res.user);
        localStorage.setItem("token", res.token);
      } catch {
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    })();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return {
    user,
    setUser,
    userLoading,
    redirect,
    setRedirect,
    logout,
  };
}

export default AuthStore;
