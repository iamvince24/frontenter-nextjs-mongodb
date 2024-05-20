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

const signUpSchema = z.object({
  username: z
    .string({ required_error: "Username 為必填欄位" })
    .regex(
      /^[a-zA-Z0-9_]*$/,
      "只能包含英文、數字及底線，不可包含空白及特殊符號"
    ),
  email: z
    .string({ required_error: "Email 為必填欄位" })
    .email("請輸入正確的 Email"),
  password: z
    .string({ required_error: "Password 為必填欄位" })
    .min(8, "密碼長度不可小於 8 個字元"),
});

export default function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("註冊失敗");
      }

      const data = await response.json();
      // console.log("註冊成功", data);
      // router.push("/profile");
      window.location.href = "/profile";
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <CardHeader className="text-center">
        <CardTitle>註冊</CardTitle>
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
              name="username"
              render={({ field }) => (
                <FormItem className="w-full max-w-sm">
                  <FormLabel>使用者名稱</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
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
                註冊
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </div>
  );
}
