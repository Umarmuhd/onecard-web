"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useIssueCardMutation } from "@/data/card";
import { toast } from "sonner";
import { getErrorMessage } from "@/data/client/http-client";
import { LoaderIcon } from "lucide-react";

const formSchema = z.object({
  last_6: z.string().min(6).max(6),
  cvc: z.string().min(3).max(3),
  email: z.string().min(2).max(50),
  otp: z.string().min(5).max(6),
  pin: z.string().min(4).max(4),
  confirm_pin: z.string().min(4).max(4),
});

export function IssueCardForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { mutate: issue, isPending } = useIssueCardMutation();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    issue(
      {
        cvc: values.cvc,
        email: values.email,
        last6Digit: values.last_6,
        otp: values.otp,
        pin: values.pin,
      },
      {
        onSuccess: () => {
          toast.success("Card issued successfully");
        },
        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
      }
    );
  }
  return (
    <Form {...form}>
      <form
        id="issue-card"
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 py-4"
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="last_6"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last 6 Card Digit</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="cvc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVC</FormLabel>
                  <FormControl>
                    <Input placeholder="CVC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
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
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OTP</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN</FormLabel>
                <FormControl>
                  <Input placeholder="" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm PIN</FormLabel>
                <FormControl>
                  <Input placeholder="" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
      <DialogFooter>
        <Button type="submit" form="issue-card" disabled={isPending}>
          {isPending && (
            <LoaderIcon
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Submit
        </Button>
      </DialogFooter>
    </Form>
  );
}
