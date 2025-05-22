"use client"
import { roboto } from "@/app/font";
import { useAppSelector } from "@/lib/hook";
import React from "react";

const SectionTitle = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) => {
    const theme = useAppSelector((state) => state.theme.theme);
  return (
    <div  className={`w-full ${theme === "dark" ? "text-white border-b shadow-b-white" : "text-black border-b border-b-[#0F0715]"}`}>
      <div
        className={`text-lg sm:text-xl md:text-3xl font-bold capitalize inline-block text-transparent bg-clip-text  flex items-center justify-center ${
          theme === "dark"
            ? "bg-gradient-to-r from-[#8750F7] to-[#DCCCFD]"
            : "bg-gradient-to-r from-[#8750F7] to-[#0F0715]"
        }`}
      >
        <h3 className="">{title}</h3>
      </div>
      <p className={`${roboto.className} font-normal max-w-[800px] pt-6  ${ theme === "dark" ? "text-[#dddddd]" : "text-black"}`}>{subTitle}</p>
    </div>
  );
};

export default SectionTitle;
