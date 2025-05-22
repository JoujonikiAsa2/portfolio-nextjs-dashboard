"use server";
import { cookies } from "next/headers";

const removeToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};

export default removeToken;
