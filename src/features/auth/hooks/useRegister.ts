import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

export const signUpSchema = z.object({
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

type SignUpData = z.infer<typeof signUpSchema>;

const registerUser = async (values: SignUpData) => {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "註冊失敗");
  }

  return data;
};

export const useRegister = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: async (_, variables) => {
      const callback = await signIn("credentials", {
        email: variables.email,
        password: variables.password,
        redirect: false,
        callbackUrl: "/profile",
      });

      if (callback?.error) {
        setError(
          callback.error === "Invalid credentials"
            ? "帳號或密碼錯誤"
            : "登入失敗"
        );
      } else {
        router.push("/profile");
      }
    },
    onError: (error: Error) => {
      setError(error.message || "註冊過程發生錯誤");
    },
  });

  return {
    register: mutate,
    isPending,
    error,
  };
};
