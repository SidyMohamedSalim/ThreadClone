"use client"; // Error components must be Client Components

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import clsx from "clsx";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Alert className="m-4">
      <AlertTriangle />
      <AlertTitle>Not Logged</AlertTitle>
      <AlertDescription>
        <Link
          href="/"
          className={clsx(buttonVariants({ className: "bg-green-600" }))}
        >
          Home
        </Link>
      </AlertDescription>
    </Alert>
  );
}
