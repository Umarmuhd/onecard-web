import { LoginForm } from "@/components/auth/login-form";
import { Routes } from "@/config/routes";
import Link from "next/link";
import React from "react";

function LoginPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <LoginForm />
      <div className="flex justify-center mt-5 pb-5">
        <p className="text-center text-sm">
          {"Don't have an account?"}{" "}
          <Link href={Routes.auth.signup} className="text-brand font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
