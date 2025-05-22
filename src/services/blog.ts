/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import getTokenFromCookies from "@/utils/getTokenFromCookies";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getBlogs = async () => {
  try {
    const result = await fetch(`${backend_url}/blog`, {
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

export const getBlogById = async (id: string) => {
  try {
    const result = await fetch(`${backend_url}/blog/${id}`, {
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

export const updateBlog = async (id: string, payload: any) => {
  try {
    const token = await getTokenFromCookies();
    const result = await fetch(`${backend_url}/blog/${id}`, {
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

export const addBlog = async (payload: any) => {
  try {
    const token = await getTokenFromCookies();
    const result = await fetch(`${backend_url}/blog`, {
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

export const deleteBlog = async (id: string) => {
  try {
    const token = await getTokenFromCookies();
    const result = await fetch(`${backend_url}/blog/${id}`, {
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
