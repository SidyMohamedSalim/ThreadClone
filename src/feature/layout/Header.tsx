import ThemeToggle from "@/src/theme/ThemeToggle";
import { getServerSession } from "next-auth";
import React from "react";
import AuthLoginButton from "./AuthLoginButton";

const Header = async () => {
  const session = await getServerSession();

  return (
    <header className="border-b border-b-accent">
      <div className="container  flex items-center py-2  max-w-lg m-auto gap1">
        <h1 className="text-2xl font-bold mr-auto">Thread</h1>
        <AuthLoginButton />
        {session?.user ? <div>{session.user.name}</div> : <ThemeToggle />}
      </div>
    </header>
  );
};

export default Header;
