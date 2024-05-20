import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

interface ArticleData {
  title: string;
  description: string;
  location: string;
  keyVisualInfo: {
    src: string;
    alt: string;
  };
}

export default function ArticleCard({
  articleData,
}: {
  articleData: ArticleData;
}) {
  return (
    <div className="w-[330px] h-[430px] m-2.5 p-3 text-[var(--text-size-h3)] border border-[var(--primary-color)] rounded-md flex flex-col items-center justify-between">
      <div className="flex flex-row items-center my-[30px] mt-0 mb-[20px]">
        <FaLocationDot color="lightgreen" className="w-6 h-6 mx-5" />
        <div>{articleData.location}</div>
      </div>
      <div className="flex flex-col justify-between items-center text-center flex-grow cursor-pointer hover:opacity-70">
        <div className="w-[200px] h-[150px] overflow-hidden">
          <Image
            className="w-full h-full rounded-md transition-transform duration-1000 ease-in-out hover:scale-110"
            width={1000}
            height={1000}
            src={articleData.keyVisualInfo.src}
            alt={articleData.keyVisualInfo.alt}
          />
        </div>
        <p className="inline m-0 whitespace-nowrap tracking-[1.5px]">
          {articleData.title}
        </p>
        <div className="h-[70px] px-[15px] py-0 leading-[24px] tracking-[1px]">
          {articleData.description}
        </div>
        <div className="w-full flex justify-center items-center my-[5px] mb-[50px] px-[20px] py-0">
          <div className="mr-[5px] transition-transform duration-[600ms] ease-linear hover:-translate-x-[15px]">
            read more
          </div>
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
}
