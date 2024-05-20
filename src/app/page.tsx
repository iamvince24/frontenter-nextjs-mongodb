import { IoIosArrowDown } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { LuPencilRuler } from "react-icons/lu";
import { RxDividerHorizontal } from "react-icons/rx";

export default function HomePage() {
  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-between">
      <section className="w-full h-[300px] bg-[url('/keyVisual.jpg')] bg-cover bg-no-repeat bg-center flex flex-col justify-between items-center py-8 md:h-[600px]">
        <></>
        <div className="w-full h-full text-white tracking-[5px] flex flex-col justify-center items-center md:tracking-[10px]">
          <h1 className="text-3xl font-bold tracking-[1px] p-2 mr-1 -mb-1 transition-transform duration-500 ease-in-out cursor-pointer hover:-rotate-6 md:p-4 md:mr-2 md:-mb-2">
            FRONT-ENTER
          </h1>
          <p className="text-lg">前端轉職資訊</p>
        </div>
        <IoIosArrowDown className="w-8 h-8 animate-bounce text-white" />
      </section>

      <section
        className="w-full h-[325px] bg-cover bg-no-repeat bg-center-bottom bg-local bg-gradient-to-t from-[rgba(0,0,0,0.4)] via-[rgba(0,0,0,0.4)] text-white flex flex-col gap-8 justify-center items-center md:h-[650px]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/testSectionImg.jpg')",
        }}
      >
        <p className="text-lg text-center leading-7 tracking-wider md:text-xl sm:leading-8">
          想知道自己適合什麼學習環境嗎？
          <br />
          可以點擊按鈕測測看哦！
        </p>
        <Button variant="secondary">測試 GO</Button>
      </section>

      <section className="w-full h-[650px] bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('/articleImg.jpg')] bg-no-repeat bg-cover bg-bottom bg-fixed text-white text-2xl flex flex-col justify-center items-center gap-[30px]">
        <p>教室精選</p>
        <Button variant="secondary" className="w-40">
          AppWorks School
        </Button>
        <Button variant="secondary" className="w-40">
          彭彭的課程教學
        </Button>
        <Button variant="secondary" className="w-40">
          五倍紅寶石
        </Button>
      </section>

      <section className="w-full h-fit bg-[url('/informationImg.jpg')] bg-no-repeat bg-cover bg-bottom bg-fixed flex flex-col justify-center items-center md:h-[650px] md:flex-row">
        <div className="w-[210px] h-[280px] bg-[url('/efWhitePaper.png')] bg-no-repeat bg-cover m-[5px] p-[30px_0px_30px] flex flex-col justify-between items-center md:w-[330px] md:h-[440px] md:m-[30px] md:p-[60px_0px_80px]">
          <div className="flex flex-col items-center">
            <LuPencilRuler className="w-6 h-6 text-primary " />
            <p className="text-lg sm:text-2xl">探索</p>
            <RxDividerHorizontal className="w-12 h-12" />
            <p className="w-3/4">
              我們提供公正的資訊， 幫您順利轉職， 並追蹤最新的業界動態。
            </p>
          </div>
          <Button className="w-20">找學校</Button>
        </div>
        <div className="w-[210px] h-[280px] bg-[url('/efWhitePaper.png')] bg-no-repeat bg-cover m-[5px] p-[30px_0px_30px] flex flex-col justify-between items-center md:w-[330px] md:h-[440px] md:m-[30px] md:p-[60px_0px_80px]">
          <div className="flex flex-col items-center">
            <LuPencilRuler className="w-6 h-6 text-primary " />
            <p className="text-lg sm:text-2xl">技能樹</p>
            <RxDividerHorizontal className="w-12 h-12" />
            <p className="w-3/4">
              前端包含哪些技術？ 你又學會了哪些？ 趕緊點進來試試看。
            </p>
          </div>
          <Button className="w-20">技能樹</Button>
        </div>
      </section>

      <section className="w-full h-[365px] bg-[linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url('/aboutSectionImg.jpg')] bg-cover bg-no-repeat bg-bottom flex flex-col justify-end items-center sm:h-[730px]">
        <p className="text-lg sm:text-2xl">關於</p>
        <RxDividerHorizontal className="w-12 h-12" />
        <p className="w-1/2 text-center mb-12">
          近年來，社會對於軟體工程師的需求急速增加，全台各地的補習也如雨後春筍般開業，
          然而人的時間有限，要如何找到適合自己的學習環境？
          <br />
          <br />
          「Front-Enter」特別針對前端工程的學習資源，進行蒐集、分類，
          期待讓有志成為前端工程師的人，找到最適合自己的學習環境。
        </p>
      </section>
    </main>
  );
}
