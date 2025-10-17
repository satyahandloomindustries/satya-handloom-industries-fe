import { AUTH_MODE, AUTH_TOKEN } from "@/constants";
import { db } from "@/db";
import { generateToken } from "@/services/JWTServices";
import { verifyOtp } from "@/services/Otp_services";
import { createUser, getUser } from "@/services/UserServices";
import { NextResponse } from "next/server";

export const POST = db(async (req) => {

    try {
        const { otp, email , phone  , username  , mode} = await req.json();
        let user;
        if(mode === AUTH_MODE.login){
            user = await getUser(email);
            
            if(!user) return NextResponse.json({ message: "User does not exist" }, { status: 404 })
        }
        console.log('here 1')

        await verifyOtp({ email, enteredOtp: otp })
        if(mode === AUTH_MODE.signup)
            user = await createUser({email , phone , username });

        console.log('here')
        const token = await generateToken({ id: user._id, email: user.email });
        console.log(token)
        const response =  NextResponse.json({ message: "Otp verified successfully"  , user}, { status: 200 });
        response.cookies.set(AUTH_TOKEN, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60, // 7 days
            path: "/",
          });
        return response
    }
    catch (err) {
        console.log(err.message);
        
        return NextResponse.json({ message: err.message }, { status: 400 })

    }

})