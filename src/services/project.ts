/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import getTokenFromCookies from "@/utils/getTokenFromCookies";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

console.log(backend_url);

export const getProjects = async () => {
  try {
    const result = await fetch(`${backend_url}/project`, {
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

export const getProjectById = async (id: string) => {
  try {
    const result = await fetch(`${backend_url}/project/${id}`, {
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

export const updateProject = async (id: string, payload: any) => {
  try {
    const token = await getTokenFromCookies();
    console.log(payload)
    const result = await fetch(`${backend_url}/project/${id}`, {
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

export const addProject = async (payload: any) => {
  try {
    const token = await getTokenFromCookies();
    const result = await fetch(`${backend_url}/project`, {
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

export const deleteProject = async (id: string) => {
  try {
    const token = await getTokenFromCookies();
    const result = await fetch(`${backend_url}/project/${id}`, {
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
