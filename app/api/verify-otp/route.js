import { db } from "@/db";
import { verifyOtp } from "@/services/Otp_services";
import { createUser } from "@/services/UserServices";
import { NextResponse } from "next/server";

export const POST = db(async (req) => {

    try {

        const { otp, email , phone  , username } = await req.json();
        (otp , email);
        
        await verifyOtp({ email, enteredOtp: otp })
        ("verify")
        await createUser({email , phone , username })
        return NextResponse.json({ message: "Otp verified successfully" }, { status: 200 })

    }
    catch (err) {
        return NextResponse.json({ message: err.message }, { status: 400 })

    }

})