import { GalleryVerticalEnd } from "lucide-react";
import { create } from "zustand";

//college Switcher //

interface collegeelements {
  name: string;
  logo: React.ElementType;
  plan: string;
}
interface collage {
  college: collegeelements;
  setcollege: (name: collegeelements) => void;
}

export const collegestore = create<collage>((set) => ({
  college: {
    name: "none",
    logo: GalleryVerticalEnd,
    plan: "manglore",
  },
  setcollege: (name) => set({ college: name }),
}));
