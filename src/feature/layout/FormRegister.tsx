"use client";

import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { clsx } from "clsx";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";
import { Loader } from "@/components/ui/loader";

const formScheme = z.object({
  name: z.string().optional(),
  email: z
    .string()
    .email({ message: "Il doit etre un email valide" })
    .min(2, { message: "Au moins deux caracteurs" }),
  password: z.string().min(4, { message: "Mot de passe trop court min 4" }),
});

type formSchemeType = z.infer<typeof formScheme>;

const FormRegister = ({ type }: { type: "login" | "register" }) => {
  const router = useRouter();

  const [loadLogin, setLoadLogin] = useState(false);
  const form = useForm<formSchemeType>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (values: formSchemeType) => {
      return fetch("/api/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });
    },
    onSuccess: () => {
      router.push("/auth/login");
      toast({
        title: "User Added",
        className: "text-green-500",
      });
    },
    onError: () => {
      toast({
        title: "error try again please",
        className: "text-red-500",
      });
    },
  });

  function onSubmit(values: formSchemeType) {
    if (type === "login") {
      setLoadLogin(true);
      signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        // @ts-ignore
      }).then(({ error }) => {
        setLoadLogin(false);
        if (error) {
          toast({
            title: "donnees invalid",
            className: "text-red-500",
          });
        } else {
          toast({ title: "connexion reussi", className: "text-green-500" });
          setTimeout(() => {
            router.refresh();
            router.push("/");
          }, 2000);
        }
      });
    } else {
      mutate(values);
    }
  }

  return (
    <div className="container m-auto border border-accent py-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {type === "register" && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="salim" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type={"email"} placeholder="a@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type={"password"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p>
            {type === "register" ? (
              <>
                Already have account ?{" "}
                <Link
                  href="/auth/login"
                  className={clsx(
                    buttonVariants({ variant: "link" }),
                    "italic"
                  )}
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                Are you new ?{" "}
                <Link
                  href="/auth/register"
                  className={clsx(
                    buttonVariants({ variant: "link" }),
                    "italic"
                  )}
                >
                  Register
                </Link>
              </>
            )}
          </p>
          <Button
            className="flex justify-center"
            disabled={isLoading || loadLogin}
            type="submit"
          >
            {isLoading || loadLogin ? (
              <Loader className=" h-4 w-4" size={20} />
            ) : type === "login" ? (
              "login"
            ) : (
              "register"
            )}
          </Button>
        </form>
      </Form>
      {/* social Login */}
      <div>
        <div className="my-6">
          <Separator></Separator>
        </div>
        <Button
          onClick={() => signIn("github")}
          variant="ghost"
          className={clsx(
            "w-full  flex justify-between bg-indigo-400 dark:bg-indigo-800 py-3"
          )}
        >
          <Github />
          <span>Continue With Github</span>
        </Button>
      </div>
    </div>
  );
};

export default FormRegister;
