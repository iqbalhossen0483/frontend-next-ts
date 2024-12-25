import { User } from "@/types/user";
import { Dispatch, SetStateAction } from "react";

export interface store {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  userLoading: boolean;
  redirect: string;
  setRedirect: Dispatch<SetStateAction<string>>;
  logout: () => void;
}
