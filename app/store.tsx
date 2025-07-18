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
