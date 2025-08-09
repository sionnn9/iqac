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
  isLoggedin: true,
  role: "none",
  setLoggedIn: () => set({ isLoggedin: get().isLoggedin }),
  setRole: (role) => set({ role: role }),
}));

// Branches //
type branchesresponce = {
  _id: string;
  name: string;
};
interface Branches {
  names: branchesresponce[];
  setBranches: (data: branchesresponce[]) => void;
}

export const UseBranches = create<Branches>((set) => ({
  names: [
    {
      _id: "",
      name: "Fetching Data",
    },
  ],
  setBranches: (data) => set({ names: data }),
}));

// department thing//

type deparmentSchema = {
  name: string;
  id: string;
};

export const DepartmentStore = create<{
  departments: deparmentSchema[];
  setDepartments: (data: deparmentSchema[]) => void;
}>((set) => ({
  departments: [],
  setDepartments: (data) => set({ departments: data }),
}));
