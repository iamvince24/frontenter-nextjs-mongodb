import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email 為必填欄位" })
    .email("請輸入正確的 Email"),
  password: z
    .string({ required_error: "Password 為必填欄位" })
    .min(8, "密碼長度不可小於 8 個字元"),
});

type LoginData = z.infer<typeof loginSchema>;

const loginUser = async (values: LoginData) => {
  const callback = await signIn("credentials", {
    email: values.email,
    password: values.password,
    redirect: false,
    callbackUrl: "/profile",
  });

  if (callback?.error) {
    throw new Error(
      callback.error === "Invalid credentials" ? "帳號或密碼錯誤" : "登入失敗"
    );
  }

  return callback;
};

export const useLogin = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      router.push("/profile");
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  return {
    login: mutate,
    isPending,
    error,
  };
};
