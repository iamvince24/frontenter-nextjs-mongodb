import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      const user = await prisma.user.findUnique({
        where: { id: id as string },
      });

      if (user) {
        res.status(200).json({ success: true, data: user });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to retrieve user" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
