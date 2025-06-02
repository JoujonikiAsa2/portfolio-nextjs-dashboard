'use server'
import { cookies } from "next/headers";

const getTokenFromCookies = async()=>{
    const token = (await cookies()).get("token")?.value as string;
    console.log(token)
    return token
  }

  export default getTokenFromCookies; 