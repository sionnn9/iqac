import { GalleryVerticalEnd } from "lucide-react";
import { create } from "zustand";

//college Switcher //

interface collegeSchema {
  name: string;
  logo: React.ElementType;
  plan: string;
}
interface collage {
  college: collegeSchema;
  setcollege: (name: collegeSchema) => void;
}

export const collegestore = create<collage>((set) => ({
  college: {
    name: "St Aloysius College Manglore",
    logo: GalleryVerticalEnd,
    plan: "Manglore",
  },
  setcollege: (name) => set({ college: name }),
}));
