'use server'
import { cookies } from "next/headers";

const getTokenFromCookies = async()=>{
    const token = (await cookies()).get("token")?.value as string;
    return token
  }

  export default getTokenFromCookies; 