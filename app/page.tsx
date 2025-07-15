import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <ClerkProvider>
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
        <Link href="/adminDashboard">Admin Dashboard{"  "}</Link>
        <Link href="/userDashboard">User Dashboard</Link>
      </div>
    </ClerkProvider>
  );
}
