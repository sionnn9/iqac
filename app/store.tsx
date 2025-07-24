import { create } from "zustand";
interface user {
  name: string;
  email: string;
  id: string;
}
interface Userstore {
  userdetails: user;
  userjwt: string;
  setuser: (user: user) => void;
  setjwt: (jwt: string) => void;
}
export const userstore = create<Userstore>((set) => ({
  userdetails: { name: "", email: "", id: "" },
  userjwt: "",
  setuser: (user) => set({ userdetails: user }),
  setjwt: (jwt) => set({ userjwt: jwt }),
}));

type LoggedinState = {
  isLoggedin: boolean;
  role: string;
  setLoggedIn: () => void;
  setRole: (role: string) => void;
};

export const useLoggedin = create<LoggedinState>((set, get) => ({
  isLoggedin: false,
  role: "none",
  setLoggedIn: () => set({ isLoggedin: !get().isLoggedin }),
  setRole: (role) => set({ role: role }),
}));
