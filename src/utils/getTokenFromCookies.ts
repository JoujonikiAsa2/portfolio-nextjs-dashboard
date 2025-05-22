'use server'
import { cookies } from "next/headers";

const getTokenFromCookies = async()=>{
    const token = (await cookies()).get("accessToken")?.value as string;
    return token
  }

  export default getTokenFromCookies; 