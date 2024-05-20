import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { runMiddleware } from "@/lib/utils";

// 設置存儲位置和文件命名規則
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// 配置 Multer 中間件
const upload = multer({ storage: storage });
const uploadMiddleware = upload.single("image");

// 禁用 Next.js 的內建 body 解析，讓 Multer 處理
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`Request method: ${req.method}`);
  if (req.method !== "POST") {
    console.error("Method Not Allowed");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    await runMiddleware(req, res, uploadMiddleware);
    console.log("File upload middleware passed");
    const currentUser = await getCurrentUser();
    const authorId = currentUser?.id;

    if (!authorId) {
      console.error("Unauthorized: No current user");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const file = (req as any).file;
    const { path } = file;
    const {
      title,
      className,
      introduction,
      classLocation,
      classType,
      fee,
      teachingMethod,
      technology,
      totalDays,
      weeklyHours,
      content,
    } = req.body;

    console.log("Request body:", req.body);

    const article = await prisma.article.create({
      data: {
        authorId,
        title,
        className,
        introduction,
        classLocation,
        classType,
        fee: parseFloat(fee),
        teachingMethod,
        technology,
        totalDays: parseInt(totalDays),
        weeklyHours: parseInt(weeklyHours),
        content,
        imageUrl: path,
      },
    });

    console.log("Article created:", article);
    return res.status(200).json({ article });
  } catch (error) {
    console.error("Failed to upload image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

export default handler;
