"use client"
import { useAppSelector } from "@/lib/hook";
import SectionTitle from "./SectionTitle";

type cornerStyle = {
    style: Record<string, unknown>,
    side:string,
  }
  
  const CustomBanner = ({title, subTitle}:{title:string, subTitle:string}) => {
    const theme = useAppSelector((state) => state.theme.theme);
    const dots = Array.from({ length: 10 });
    const corners:cornerStyle[] = [
      {
        style: {
          width: 200,
          height: 200,
          position: "absolute",
          opacity: 0.2,
          bottom: 0,
          left: 0,
        },
        side: "br"
      },
      {
        style: {
          width: 200,
          height: 200,
          position: "absolute",
          opacity: 0.2,
          top: 0,
          right: 0,
        },
        side: "bl"
      },
    ];
    const predefinedPositions = [
      "10%",
      "20%",
      "30%",
      "40%",
      "50%",
      "60%",
      "70%",
      "80%",
      "90%",
    ];
    return (
      <div
        className={`relative  w-full  h-[500px] flex flex-col items-center justify-center px-2 py-28 md:py-6 lg:py-0 md:px-4 lg:px-0 ${
          theme === "dark" ? "bg-[#0F0715] text-white" : "bg-white"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center lg:mx-[10vw] 2xl:mx-[16vw] h-full">
            
        <div><SectionTitle title={title} subTitle={subTitle} /></div>
          {corners.map((item, index) => (
            <div
              key={index}
              style={item?.style}
              className={`rounded-${item?.side}-full bg-[#8750F7] blur-3xl`}
            >
            </div>
          ))}
          {dots.map((dot, index) => {
            const randomTop =
              predefinedPositions[
                Math.floor(Math.random() * predefinedPositions.length)
              ];
            const randomLeft =
              predefinedPositions[
                Math.floor(Math.random() * predefinedPositions.length)
              ];
            return (
              <div
                key={index}
                style={{
                  width: 10 + Math.floor(Math.random() * 10),
                  aspectRatio: 1,
                  position: "absolute",
                  opacity: 0.2,
                  top: randomTop,
                  left: randomLeft,
                }}
                className="rounded-full bg-[#8750F7]  animate-pulse"
              ></div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default CustomBanner;