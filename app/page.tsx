"use client";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";
import { userstore } from "./store";

export default function Home() {
  //storing user data to the zustand file
  const userfunctions = userstore();
  const { isLoaded, isSignedIn, user } = useUser();
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;
    const data = {
      name: user.fullName || "",
      email: user.emailAddresses?.[0]?.emailAddress || "",
      id: user.id,
    };
    userfunctions.setuser(data);
  }, [isLoaded, isSignedIn, user?.id]);

  return (
    <div>
      <div className="w-full h-15 bg-gray-900 flex justify-end items-center ">
        <SignedOut>
          <SignInButton>
            <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignInButton>
        </SignedOut>
        <div className="mr-5">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
      <div>
        <Link href="/adminDashboard">Admin Dashboard </Link>
        <Link href="/userDashboard">User Dashboard</Link>
      </div>
    </div>
  );
}
0;
