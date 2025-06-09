"use server";

import getTokenFromCookies from "@/utils/getTokenFromCookies";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const login = async (payload: { email: string; password: string }) => {
  const res = await fetch(`${url}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: payload?.email,
      password: payload?.password,
    }),
  });
  const response = await res.json();
  if (response.success && response.data.accessToken) {
    const { data } = response;
    const cookieStore = await cookies();
    cookieStore.set("token", data.accessToken);
    return response;
  } else {
    return response;
  }
};

export const logoutuser = async () => {
  const token = getTokenFromCookies();

  if (!token) return null;
  const cookieStore = await cookies();
  cookieStore.delete("token");
  const isTokenDeleted = await getTokenFromCookies();
  return isTokenDeleted ? true : false;
};
