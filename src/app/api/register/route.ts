import { z } from "zod";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prismadb";

// 定義表單驗證模式
const validate = z.object({
  email: z
    .string({
      required_error: "缺少 email 欄位",
    })
    .email("請輸入正確的 Email 格式"),
  username: z
    .string({
      required_error: "缺少 username 欄位",
    })
    .max(50, "使用者名稱不能超過 50 個字"),
  password: z
    .string({
      required_error: "缺少 password 欄位",
    })
    .min(8, "密碼至少要 8 個字")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,50}$/,
      "密碼必須包含英文和數字，且長度為 8 到 50 個字"
    ),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, username, password } = body;

    const result = validate.safeParse(body);
    if (!result.success) {
      throw new z.ZodError(result.error.errors);
    }

    // 加密密碼
    const hashedPassword = await bcrypt.hash(password, 12);

    // 檢查用戶是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse("此 email 已經註冊", { status: 400 });
    }

    // 創建用戶
    const user = await prisma.user.create({
      data: {
        email,
        username,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.errors.map((e) => e.message).join(", ");
      return new NextResponse(message, { status: 400 });
    }
    console.error("Internal Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
