"use client";
import { IoIosArrowDown } from "react-icons/io";
import { LuPencilRuler } from "react-icons/lu";
import { RxDividerHorizontal } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { NavButton } from "@/components/ui/NavButton";

const ChangeBackground = () => {
  return (
    <style jsx>{`
      @keyframes changeBackground {
        0%,
        33.33%,
        66.66% {
          opacity: 1;
        }

        0% {
          background-image: url("https://firebasestorage.googleapis.com/v0/b/front-enter.appspot.com/o/images%2Frotate-img-1.jpg?alt=media&token=059f5677-409b-4fc1-a772-baf1dece5063");
        }

        16.25% {
          opacity: 0;
        }

        33.33% {
          background-image: url("https://firebasestorage.googleapis.com/v0/b/front-enter.appspot.com/o/images%2Frotate-img-2.jpg?alt=media&token=f28dbea4-af0c-4743-a75a-426198fe409e");
        }

        50% {
          opacity: 0;
        }

        66.66% {
          background-image: url("https://firebasestorage.googleapis.com/v0/b/front-enter.appspot.com/o/images%2Frotate-img-3.jpg?alt=media&token=8f7f8f02-5066-452a-863c-a4e715d2657a");
        }

        83.33% {
          opacity: 0;
        }

        100% {
          background-image: url("https://firebasestorage.googleapis.com/v0/b/front-enter.appspot.com/o/images%2Fc1f43b40330333.577b708139a18.jpg?alt=media&token=787912b2-453f-41c5-b7a2-8c8c74d47033");
        }
      }
    `}</style>
  );
};

export default function ArticlePage() {
  return (
    <main className="w-full flex min-h-screen flex-col items-center">
      <section
        className="w-full h-[380px] bg-cover bg-no-repeat bg-center bg-local flex flex-col justify-center items-center"
        style={{ animation: "changeBackground 20s infinite" }}
      >
        <ChangeBackground />
        <div className="text-2xl text-white tracking-widest font-bold">
          蒐羅前端學校
        </div>
      </section>
      <section className="w-full h-[70px] shadow-[0_0_25px_rgba(128,128,128,0.8)] flex justify-center mb-40">
        <div className="w-1/2 h-full flex justify-between items-center">
          <NavButton>全部</NavButton>
          <NavButton>小班制</NavButton>
          <NavButton>放養制</NavButton>
          <NavButton>一對一</NavButton>
        </div>
      </section>
      Article
    </main>
  );
}
