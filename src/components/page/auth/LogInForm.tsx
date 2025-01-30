"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

const LogInSchema = z.object({
  email: z
    .string({ required_error: "Email 為必填欄位" })
    .email("請輸入正確的 Email"),
  password: z
    .string({ required_error: "Password 為必填欄位" })
    .min(8, "密碼長度不可小於 8 個字元"),
});

export default function LogInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof LogInSchema>>({
    resolver: zodResolver(LogInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LogInSchema>) {
    setIsLoading(true);

    try {
      const callback = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/profile",
      });

      if (callback?.error) {
        const errorMessage =
          callback.error === "Invalid credentials"
            ? "帳號或密碼錯誤"
            : "登入失敗";
        console.error(errorMessage);
        // 可以在 UI 上顯示錯誤訊息
      } else {
        console.log("登入成功");
        router.push("/profile");
      }
    } catch (error) {
      console.error("登入失敗", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <CardHeader className="text-center">
        <CardTitle>登入</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4 flex flex-col items-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full max-w-sm">
                  <FormLabel>信箱</FormLabel>
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
                <FormItem className="w-full max-w-sm">
                  <FormLabel>密碼</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>密碼長度不可小於 8 個字元</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center w-full">
              <Button type="submit" className="w-32" disabled={isLoading}>
                登入
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </div>
  );
}
