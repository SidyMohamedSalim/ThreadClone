"use client";
import React, { useTransition } from "react";
import { signOut } from "next-auth/react";
import { Loader } from "@/components/ui/loader";
import { toast } from "@/components/ui/use-toast";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

const DropdownMenuItemLogout = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      asChild
      onClick={() => {
        startTransition(() =>
          signOut().then(() => {
            toast({
              title: "logout succes",
              className: "text-green-500",
            });
          })
        );
      }}
    >
      {isPending ? (
        <Loader size={20} />
      ) : (
        <span>
          <LogOut size={20} className="mr-2 w-4 h-4" />
          Logout
        </span>
      )}
    </DropdownMenuItem>
  );
};

export default DropdownMenuItemLogout;
