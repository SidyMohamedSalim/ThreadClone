import ThemeToggle from "@/src/theme/ThemeToggle";
import { getServerSession } from "next-auth";
import React from "react";
import UserProfile from "./auth/UserProfile";
import AuthLoginButton from "./AuthLoginButton";

const Header = async () => {
  const session = await getServerSession();

  return (
    <header className="border-b border-b-accent fixed top-0 bg-background z-20 w-full">
      <div className="container  flex items-center py-2  max-w-lg m-auto gap1">
        <h1 className="text-2xl font-bold mr-auto">Thread</h1>
        <ThemeToggle />
        {session?.user ? <UserProfile /> : <AuthLoginButton />}
      </div>
    </header>
  );
};

export default Header;
