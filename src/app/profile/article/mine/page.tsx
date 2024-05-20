import * as React from "react";
import Link from "next/link";
import { NavButton } from "@/components/ui/NavButton";
import ArticleCard from "@/components/article/ArticleCard";

export default function ArticleCollection() {
  const articleData = {
    title: "課程名稱",
    description:
      "  赫綵的講師具備業界實務經驗，網頁發展日新月異，掌握最新趨勢與資訊最重要，讓你技術不落人後。",
    location: "台北",
    keyVisualInfo: { src: "/keyVisual.jpg", alt: "efPenIcon" },
  };

  return (
    <div>
      自己的文章
      <ArticleCard articleData={articleData} />
    </div>
  );
}
