"use client";

import React, { useTransition } from "react";
import { buttonVariants } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

const AuthLoginButton = () => {
  // const [isPending, startTransition] = useTransition();
  return (
    <Link className={clsx(buttonVariants())} href={"/auth/login"}>
      <LogIn className={clsx("mr-2 h-4 w-4")} />
      Login
    </Link>
  );
};

export default AuthLoginButton;
