"use client";
import { LucideLightbulb, Menu, Moon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { setTheme } from "@/lib/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { TiSocialLinkedin } from "react-icons/ti";
import { FiGithub } from "react-icons/fi";
import Link from "next/link";
import { setMenu } from "@/lib/menu/menuSlice";
import { roboto } from "@/app/font";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const clicked = useAppSelector((state) => state.menu.isClicked);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(301);

  useEffect(() => {
    setScreenWidth(window.outerWidth)
    const handleScroll = () => {
      const scroll = window.scrollY;
      setIsScrolled(scroll >= 64);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
      <div
        className={`w-full z-50 px-4 lg:px-0  flex justify-center ${
          isScrolled && theme === "light"
            ? "navabr-fixed-animation fixed w-full bg-gradient-to-r from-[#B7B1F2] to-[#FFFFFF] shadow-lg"
            : "absolute"
        } ${
          theme == "dark" ? "text-white" : "text-black"
        } ${
          isScrolled && theme === "dark"
            ? "navabr-fixed-animation fixed w-full bg-[#0F0716] shadow-lg flex justify-center"
            : "absolute"
        }`}
      >
        <div className="px-4 lg:px-0 h-[5rem] w-full sm:w-[40rem] md:w-[48rem] lg:w-[64rem] xl:w-[80rem] mx-auto flex justify-between items-center">
          <div
            className={` hover:cursor-pointer text-xl font-bold uppercase inline-block text-transparent bg-clip-text ${
              theme === "dark"
                ? "bg-gradient-to-r from-[#8750F7] to-[#DCCCFD]"
                : "bg-gradient-to-r from-[#8750F7] to-[#0F0715]"
            }`}
          >
            <Link href="/">Joujoniki</Link>
          </div>
          <div>
            <ul className={`navbar-links ${roboto.className} font-normal ${ theme === "dark" ? "text-[#dddddd]" : "text-black"}`}>
              <Link href="/"><li className="hover:cursor-pointer">Home</li></Link>
              <Link href="/about"><li className="hover:cursor-pointer">About</li></Link>
              <Link href="/project"><li className="hover:cursor-pointer">Projects</li></Link>
              <Link href="/blog"><li className="hover:cursor-pointer">Blog</li></Link>
              <Link href='/contact'><li className="hover:cursor-pointer">Contact</li></Link>
            </ul>
          </div>
          <div className="flex md:gap-8">
            <div className="sm:hidden navbar-contact-icons">
              <Link
                href={"https://www.linkedin.com/in/joujonikiasaroy/"}
                target="_blank"
              >
                <Button
                  className={`bg-white text-black hover:text-black ${
                    theme === "dark" ? "" : "border border-gray-200"
                  }`}
                >
                  <TiSocialLinkedin />
                </Button>
              </Link>
              <Link href={"https://github.com/JoujonikiAsa2"} target="_blank">
                <Button
                  className={`bg-white text-black  hover:text-black ${
                    theme === "dark" ? "" : "border border-gray-200"
                  }`}
                >
                  <FiGithub />
                </Button>
              </Link>
            </div>

            <div className="sm:ml-2 md:ml-6 flex gap-2">
              <div className="navbar-menu">
                <Button onClick={() => dispatch(setMenu(!clicked))}>
                  <Menu />
                </Button>
              </div>
              <div className={`${screenWidth <= 300 ? "hidden" : "block"}`}>
                {theme === "dark" ? (
                  <Button
                    onClick={() => {
                      dispatch(setTheme("light"));
                    }}
                  >
                    <Moon />
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      dispatch(setTheme("dark"));
                    }}
                    className="bg-white text-orange-400 border hover:text-white"
                  >
                    <LucideLightbulb />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Navbar;
