import { db } from "@/db"
import { NextResponse } from "next/server";
export const POST = db(async(req , res)=>{

    const data = await req.json()
    console.log("otp hit"  , data , res)
    return NextResponse.json({
        success: true,
        received: data
      });
    

    
})
