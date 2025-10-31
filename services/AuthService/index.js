import { AUTH_TOKEN } from "@/constants";
import { verifyToken } from "@/services/JWTServices";
import { NextResponse } from "next/server";

export const requiredAuth = async (req) => {

    try {
        const cookie = await req.cookies;
        const token = cookie.get(AUTH_TOKEN)?.value ?? req.headers.authorization?.startsWith(BEARER_WITH_SPACE)
        if (!token || !await verifyToken(token)) {
            return NextResponse.json(
                { message: "Unauthorized access" },
                { status: 401 }
            );
        }

    } catch (err) {
        return NextResponse.json(
            { message: "Unauthorized access" },
            { status: 401 }
        );
    }

}