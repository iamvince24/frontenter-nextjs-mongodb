import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { profileFormSchema } from "@/features/profile/hooks/useUpdateProfile";

export async function POST(req: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = profileFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const { username, bio } = result.data;

    // const existingUser = await prisma.user.findFirst({
    //   where: {
    //     username,
    //     NOT: {
    //       id: currentUser.id,
    //     },
    //   },
    // });

    // if (existingUser) {
    //   return NextResponse.json(
    //     { error: "Username already taken" },
    //     { status: 400 }
    //   );
    // }

    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        username,
        bio,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
