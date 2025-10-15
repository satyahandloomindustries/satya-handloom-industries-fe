import { db } from "@/db"
import { NextResponse } from "next/server";
import { generateOtp } from "@/services/Otp_services";
export const POST = db(async(req , res)=>{

    const {email , ...data} = await req.json()
    console.log("otp hit"  , email , res)
    const otp = await generateOtp(email);
    console.log(otp , "otp");
    
    return NextResponse.json({
        success: true,
        received: data
      });
    

    
})
