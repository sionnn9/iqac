"use client";

import { LoginForm } from "@/components/login-form";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
0;
