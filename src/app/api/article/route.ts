import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import prisma from "@/lib/prismadb";
import { authOptions } from "../auth/[...nextauth]/route";
import { getCurrentUser } from "@/actions/getCurrentUser";

const articleSchema = z.object({
  title: z.string().min(1, "標題是必填項"),
  className: z.string().min(1, "課程名稱是必填項"),
  introduction: z.string().min(1, "簡介是必填項"),
  classLocation: z.string().min(1, "上課地點是必填項"),
  classType: z.string().min(1, "教學模式是必填項"),
  fee: z.number().min(0, "費用不能為負數"),
  teachingMethod: z.string().min(1, "教學方式是必填項"),
  technology: z.string().min(1, "技術是必填項"),
  totalDays: z.number().min(1, "總天數必須大於0"),
  weeklyHours: z.number().min(1, "每週小時數必須大於0"),
  content: z.string().min(1, "內容是必填項"),
  imageUrl: z.string().url(),
});

export async function POST(req: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = articleSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const {
      title,
      content,
      className,
      introduction,
      classLocation,
      classType,
      fee,
      teachingMethod,
      technology,
      totalDays,
      weeklyHours,
      imageUrl,
    } = result.data;

    const article = await prisma.article.create({
      data: {
        title,
        content,
        authorId: currentUser?.id,
        className,
        introduction,
        classLocation,
        classType,
        fee,
        teachingMethod,
        technology,
        totalDays,
        weeklyHours,
        imageUrl,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
