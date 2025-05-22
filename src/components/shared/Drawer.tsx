"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setMenu } from "@/lib/menu/menuSlice";
import { LogIn, X } from "lucide-react";
import Link from "next/link";
import { TiSocialLinkedin } from "react-icons/ti";
import { FiGithub } from "react-icons/fi";

const Drawer = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const clicked = useAppSelector((state) => state.menu.isClicked);
  return (
    <>
      {clicked === true && (
        <div className="h-[100vh] fixed w-full z-50 right-0 flex drawer-animation">
          <div className="flex-1 bg-black opacity-90"></div>
          <div
            className={` w-[80vw] h-screen sm:w-96 p-4 ${
              theme === "dark" ? "bg-[#0F0715]" : "bg-[#FFFFFF]"
            }`}
          >
            <div className="w-full flex justify-between">
              <div
                className={`text-xl font-bold uppercase inline-block text-transparent bg-clip-text ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-[#8750F7] to-[#DCCCFD]"
                    : "bg-gradient-to-r from-[#8750F7] to-[#0F0715]"
                }`}
              >
                <h2 className="uppercase">Joujoniki</h2>
              </div>
              <div>
                <Button
                  className="bg-transparent hover:bg-transparent hover:border-2 hover:border-gray-400"
                  onClick={() => dispatch(setMenu(!clicked))}
                >
                  <X color="#7F7F7F" />
                </Button>
              </div>
            </div>
            <div className="pt-4 flex flex-col text-[#7F7F7F] uppercase text-sm">
              <Link href="/">
                <div className="h-12 border-t-1 border-[#7F7F7F] flex items-center">
                  Home
                </div>
              </Link>
              <Link href="/about">
                <div className="h-12 border-t-1 border-[#7F7F7F] flex items-center hover:cursor-pointer">
                  About
                </div>
              </Link>
              <Link href="/projects">
                <div className="h-12 border-t-1 border-[#7F7F7F] flex items-center hover:cursor-pointer">
                  Projects
                </div>
              </Link>
              <Link href="/blog">
                <div className="h-12 border-t-1 border-[#7F7F7F] flex items-center hover:cursor-pointer">
                  Blog
                </div>
              </Link>
              <Link href="/contact">
                <div className="h-12 border-t-1 border-[#7F7F7F] flex items-center hover:cursor-pointer">
                  Contact
                </div>
              </Link>
            </div>
            <div className="pt-20">
              <p className="pb-4 text-[#7F7F7F]">FIND ME HERE</p>
              <div className="flex gap-6">
                <div className="flex gap-4">
                  <div>
                    <Link
                      href={"https://www.linkedin.com/in/joujonikiasaroy/"}
                      target="_blank"
                    >
                      <Button
                        className={`bg-white text-black hover:text-white ${
                          theme === "dark" ? "" : "border border-gray-200"
                        }`}
                      >
                        <TiSocialLinkedin />
                      </Button>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href={"https://github.com/JoujonikiAsa2"}
                      target="_blank"
                    >
                      <Button
                        className={`bg-white text-black hover:text-white ${
                          theme === "dark" ? "" : "border border-gray-200"
                        }`}
                      >
                        <FiGithub />
                      </Button>
                    </Link>
                  </div>

                  <div className="">
                    <Button>
                      Login <LogIn />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Drawer;
