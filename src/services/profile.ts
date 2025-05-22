"use server";

import { TProfile } from "@/types/profile";
import getTokenFromCookies from "@/utils/getTokenFromCookies";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getProfile = async () => {
  try {
    const result = await fetch(`${backend_url}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await result.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const updateProfile = async (id: string, payload: Partial<TProfile>) => {
  try {
    const token = await getTokenFromCookies();
    const result = await fetch(`${backend_url}/profile/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `${token}`,
      },
      body: payload,
    });
    const res = await result.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const addProfile = async (payload: Partial<TProfile>) => {
  try {
    const token = await getTokenFromCookies();
    const result = await fetch(`${backend_url}/profile`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
      },
      body: payload,
    });
    const res = await result.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProfile = async (id: string) => {
  try {
    const token = await getTokenFromCookies();
    const result = await fetch(`${backend_url}/profile/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
      },
    });
    const res = await result.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};
