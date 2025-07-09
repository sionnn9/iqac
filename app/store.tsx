import { GalleryVerticalEnd } from "lucide-react";
import { create } from "zustand";

//college Switcher //

interface collegeSchema {
  name: string;
  logo: React.ElementType;
  plan: string;
}
interface college {
  college: collegeSchema;
  setcollege: (name: collegeSchema) => void;
}

export const collegestore = create<college>((set) => ({
  college: {
    name: "Courses",
    logo: GalleryVerticalEnd,
    plan: "Select a course",
  },
  setcollege: (name) => set({ college: name }),
}));
