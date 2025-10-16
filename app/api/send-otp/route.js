import { db } from "@/db"
import { NextResponse } from "next/server";
import { generateOtp } from "@/services/Otp_services";
import { createAndUpdateTemporaryUser, verifyUser } from "@/services/UserServices";
import { AUTH_MODE } from "@/constants";
export const POST = db(async(req , res)=>{

    const {email , mode , ...data} = await req.json()

    const userExists = await verifyUser({email})

    if(mode == AUTH_MODE.login && !userExists){
      return NextResponse.json(
        { message: "User does not exist, redirect to signup" },
        { status: 404 }
      );
    }

    if (mode == AUTH_MODE.signup && userExists){
      
      return NextResponse.json(
        { message: "User already exists, redirect to login" },
        { status: 409 }
      )
    }
    ("otp hit"  , email , res)
    const otp = await generateOtp(email);
    (otp , "otp");

    await createAndUpdateTemporaryUser({email , otp})
    
    return NextResponse.json({
        success: true,
        received: data
      });
    

    
})
