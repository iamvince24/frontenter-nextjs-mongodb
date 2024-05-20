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
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

const LogiInSchema = z.object({
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

  const form = useForm<z.infer<typeof LogiInSchema>>({
    resolver: zodResolver(LogiInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LogiInSchema>) {
    setIsLoading(true);

    signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/profile",
    })
      .then((callback) => {
        setIsLoading(false);
        if (callback?.error) {
          const errorMessage =
            callback.error === "Invalid credentials"
              ? "帳號或密碼錯誤"
              : "登入失敗";
          console.error(errorMessage);
        } else {
          console.log("登入成功");
          window.location.href = "/profile";
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <CardHeader className="text-center">
        <CardTitle>登入</CardTitle>
        {/* <CardDescription>新增會員</CardDescription> */}
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
                  {/* <FormDescription>This is your Email.</FormDescription> */}
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
                  <FormDescription>
                    密碼必須至少包含 8 個字符，最多 50
                    個字符，並包含至少一個大寫字母，一個小寫字母，一個數字和一個特殊字符。
                  </FormDescription>
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
