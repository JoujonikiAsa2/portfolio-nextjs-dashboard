"use client";
import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import { useAppSelector } from "@/lib/hook";
const Loader = () => {
  const [loading, setLoding] = useState(true);
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoding(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [loading]);

  return (
    <div
      className={`flex flex-col gap-6 items-center justify-center h-screen relative transition-transform duration-1000 
        ${!loading && "-translate-y-full overflow-hidden"}
        ${theme === "dark" ? "dark-background" : "light-background"}
      `}
    >
      {/* loader circle */}
      <div className={`${loading && "loader"}`}></div>
      
      {/* loader reveal effect */}
      <div
        className={`${
          !loading &&
          "light-background w-[120%] h-[100%] rounded-t-full absolute -bottom-72 overflow-x-hidden"
        }`}
      ></div>
      
      {/* loader text effect */}
      <div
        className={`${theme === "dark" ? "text-white" : "text-black"} ${
          !loading ? "text-transparent" : "loader-text text-3xl font-bold "
        }`}
      >
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
    </div>
  );
};

export default Loader;
