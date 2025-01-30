"use client";

import { useState, useCallback } from "react";

import { z } from "zod";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { CldUploadWidget, CldUploadWidgetProps } from "next-cloudinary";
import { Button, ButtonProps } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ArticleFormSchema = z.object({
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

type ArticleFormInputs = z.infer<typeof ArticleFormSchema>;

export default function ArticleForm({
  authorId,
}: {
  authorId: string | undefined;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ArticleFormInputs>({
    resolver: zodResolver(ArticleFormSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageWidth, setImageWidth] = useState<number>(0);
  const [imageHeight, setImageHeight] = useState<number>(0);

  const onSubmit = async (data: ArticleFormInputs) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create article");
      }

      const article = await response.json();
      // router.push(`/articles/${article.id}`);
      setImageUrl("");
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!authorId) {
    return <p>Please sign in to create an article.</p>;
  }

  const handleUpload: CldUploadWidgetProps["onSuccess"] = (result: any) => {
    if (result.event === "success") {
      setImageUrl(result.info.secure_url);
      setValue("imageUrl", result.info.secure_url);
      setImageWidth(result.info.width);
      setImageHeight(result.info.height);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
      <div>
        <label htmlFor="imageUrl">Upload Image:</label>
        <input
          id="imageUrl"
          type="url"
          {...register("imageUrl")}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          hidden
        />
        <CldUploadWidget
          uploadPreset="qlq9mpxc"
          onSuccess={handleUpload}
          // onFailure={(error) => console.error("Upload failed", error)}
          options={{ sources: ["local"], maxFiles: 1 }}
        >
          {({ open }) => (
            <Button type="button" onClick={() => open?.()}>
              Upload Image
            </Button>
          )}
        </CldUploadWidget>
        {imageUrl && (
          <div>
            <Image
              src={imageUrl}
              alt="Uploaded Image"
              width={imageWidth}
              height={imageHeight}
            />
          </div>
        )}
      </div>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          標題
        </label>
        <Input
          id="title"
          type="text"
          {...register("title")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}
      </div>
      <div>
        <label
          htmlFor="className"
          className="block text-sm font-medium text-gray-700"
        >
          課程名稱
        </label>
        <Input
          id="className"
          type="text"
          {...register("className")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.className && (
          <p className="text-red-600">{errors.className.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="introduction"
          className="block text-sm font-medium text-gray-700"
        >
          簡介
        </label>
        <Input
          id="introduction"
          type="text"
          {...register("introduction")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.introduction && (
          <p className="text-red-600">{errors.introduction.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="classLocation"
          className="block text-sm font-medium text-gray-700"
        >
          上課地點
        </label>
        <Select onValueChange={(value) => setValue("classLocation", value)}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="選擇城市或以線上方式" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="online">線上</SelectItem>
            <SelectItem value="taipei">台北</SelectItem>
            <SelectItem value="new-taipei">新北</SelectItem>
            <SelectItem value="taoyuan">桃園</SelectItem>
            <SelectItem value="taichung">台中</SelectItem>
            <SelectItem value="tainan">台南</SelectItem>
            <SelectItem value="kaohsiung">高雄</SelectItem>
            <SelectItem value="keelung">基隆</SelectItem>
            <SelectItem value="hsinchu">新竹</SelectItem>
            <SelectItem value="chiayi">嘉義</SelectItem>
            <SelectItem value="miaoli">苗栗</SelectItem>
            <SelectItem value="changhua">彰化</SelectItem>
            <SelectItem value="nantou">南投</SelectItem>
            <SelectItem value="yunlin">雲林</SelectItem>
            <SelectItem value="pingtung">屏東</SelectItem>
            <SelectItem value="yilan">宜蘭</SelectItem>
            <SelectItem value="hualien">花蓮</SelectItem>
            <SelectItem value="taitung">台東</SelectItem>
            <SelectItem value="penghu">澎湖</SelectItem>
            <SelectItem value="kinmen">金門</SelectItem>
            <SelectItem value="lienchiang">連江</SelectItem>
          </SelectContent>
        </Select>
        {errors.classLocation && (
          <p className="text-red-600">{errors.classLocation.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="classType"
          className="block text-sm font-medium text-gray-700"
        >
          教學模式
        </label>
        <Select onValueChange={(value) => setValue("classType", value)}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="選擇教學模式" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="one-on-one">一對一</SelectItem>
            <SelectItem value="large-class">大班制</SelectItem>
            <SelectItem value="small-class">小班制</SelectItem>
            <SelectItem value="online-course">線上課程</SelectItem>
          </SelectContent>
        </Select>
        {errors.classType && (
          <p className="text-red-600">{errors.classType.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="fee"
          className="block text-sm font-medium text-gray-700"
        >
          費用
        </label>
        <Input
          id="fee"
          type="number"
          {...register("fee", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.fee && <p className="text-red-600">{errors.fee.message}</p>}
      </div>
      <div>
        <label
          htmlFor="teachingMethod"
          className="block text-sm font-medium text-gray-700"
        >
          教學方式
        </label>
        <Select onValueChange={(value) => setValue("teachingMethod", value)}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="選擇教學方式" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hands-on">手把手教制</SelectItem>
            <SelectItem value="self-guided">放養制</SelectItem>
          </SelectContent>
        </Select>
        {errors.teachingMethod && (
          <p className="text-red-600">{errors.teachingMethod.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="technology"
          className="block text-sm font-medium text-gray-700"
        >
          技術
        </label>
        <Input
          placeholder="React, JavaScript, TypeScript ......"
          id="technology"
          type="text"
          {...register("technology")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.technology && (
          <p className="text-red-600">{errors.technology.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="totalDays"
          className="block text-sm font-medium text-gray-700"
        >
          總天數
        </label>
        <Input
          id="totalDays"
          type="number"
          {...register("totalDays", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.totalDays && (
          <p className="text-red-600">{errors.totalDays.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="weeklyHours"
          className="block text-sm font-medium text-gray-700"
        >
          每週幾小時
        </label>
        <Input
          id="weeklyHours"
          type="number"
          {...register("weeklyHours", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.weeklyHours && (
          <p className="text-red-600">{errors.weeklyHours.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          內容
        </label>
        <Textarea
          id="content"
          {...register("content")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.content && (
          <p className="text-red-600">{errors.content.message}</p>
        )}
      </div>
      <button
        type="submit"
        // className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm"
        className={`mt-4 py-2 px-4 rounded-md shadow-sm ${
          isSubmitting ? "bg-black text-white" : "bg-indigo-600 text-white"
        }`}
        disabled={isSubmitting}
      >
        Submit
      </button>
    </form>
  );
}
