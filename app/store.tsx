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
  branchId: string | null;
  setBranches: (data: branchesresponce[]) => void;
  setBranchId: (id: string | null) => void;
}

export const UseBranches = create<Branches>((set) => ({
  names: [],
  branchId: null,
  setBranches: (data) => set({ names: data }),
  setBranchId: (id) => set({ branchId: id }),
}));

// department thing//

type deparmentSchema = {
  name: string;
  _id: string;
};

export const DepartmentStore = create<{
  departments: deparmentSchema[];
  setDepartments: (data: deparmentSchema[]) => void;
}>((set) => ({
  departments: [],
  setDepartments: (data) => set({ departments: data }),
}));

// to set current branch

interface BranchState {
  currentBranchId: string | null;
  setCurrentBranchId: (id: string) => void;
  clearBranchId: () => void;
}

export const useBranchStore = create<BranchState>((set) => ({
  currentBranchId: null,
  setCurrentBranchId: (id) => set({ currentBranchId: id }),
  clearBranchId: () => set({ currentBranchId: null }),
}));
