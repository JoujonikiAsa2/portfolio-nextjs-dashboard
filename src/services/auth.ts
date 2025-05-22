"use server";

import { cookies } from "next/headers";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const login = async (payload: { email: string; password: string }) => {
  try {
    const result = await fetch(`${backend_url}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const res = await result.json();
    const cookieStore = await cookies();
    cookieStore.set("accessToken", res.data.accessToken, {
      httpOnly: true,
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const logoutuser = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    return { message: "Logged out" };
  } catch (error) {
    console.error(error);
  }
};
