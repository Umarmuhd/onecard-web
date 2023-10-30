"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Routes } from "@/config/routes";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { getErrorMessage } from "@/data/client/http-client";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export function LoginForm() {
  const [isPending, startTransition] = React.useTransition();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const router = useRouter();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    startTransition(async () => {
      try {
        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        toast.success("Login successful!");
        if (result?.ok) {
          router.push(Routes.dashboard.home);
        }
      } catch (error) {
        console.error(error);
        toast.error(getErrorMessage(error));
      }
    });
  }
  return (
    <Form {...form}>
      <Card>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Login in</CardTitle>
          <CardDescription>Welcome Back</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
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
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && (
                <LoaderIcon
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="flex flex-col items-center gap-1 justify-center w-full">
            <p>
              <Link
                href={Routes.auth.forgot_password}
                className="text-sm text-brand font-semibold"
              >
                Forgot password?
              </Link>
            </p>
            {/* <p className="text-sm text-center">
            {"Didn't receive confirmation email?"}{" "}
            <Link
              href={Routes.auth.resend_email}
              className="text-brand font-semibold"
            >
              Resend
            </Link>
          </p> */}
          </div>
        </CardFooter>
      </Card>
    </Form>
  );
}
