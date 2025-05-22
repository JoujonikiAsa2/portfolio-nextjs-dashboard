/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import getTokenFromCookies from "@/utils/getTokenFromCookies";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

console.log(backend_url);

export const getAllSkills = async () => {
  try {
    const result = await fetch(`${backend_url}/skill`, {
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

export const getSkillById = async (id: string) => {
  try {
    const result = await fetch(`${backend_url}/skill/${id}`, {
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

export const updateSkill = async (id: string, payload: any) => {
  try {
    console.log(payload);
    const token = await getTokenFromCookies();
    const result = await fetch(`${backend_url}/skill/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `${token}`,
      },
      body: payload,
    });
    const res = await result.json();
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const addSkill = async (payload: any) => {
  try {
    console.log(payload);
    const token = await getTokenFromCookies();
    const result = await fetch(`${backend_url}/skill`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
      },
      body: payload,
    });
    const res = await result.json();
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const deleteSkill = async (id: string) => {
  try {
    console.log(id);
    const token = await getTokenFromCookies();
    const result = await fetch(`${backend_url}/skill/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
      },
    });
    const res = await result.json();
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};
