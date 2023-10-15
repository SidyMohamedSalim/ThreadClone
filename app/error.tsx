"use client"; // Error components must be Client Components

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
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
        <Button onClick={() => reset()} className="bg-green-600">
          Try Again
        </Button>
      </AlertDescription>
    </Alert>
  );
}
