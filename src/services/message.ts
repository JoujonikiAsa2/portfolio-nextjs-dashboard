"use server";

import getTokenFromCookies from "@/utils/getTokenFromCookies";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getMessages = async () => {
  try {
    const token = await getTokenFromCookies();
    const result = await fetch(`${backend_url}/message`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const res = await result.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getMessageById = async (id: string) => {
  try {
    const token = await getTokenFromCookies();
    const result = await fetch(`${backend_url}/message/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const res = await result.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};
