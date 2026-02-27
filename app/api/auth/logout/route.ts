import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const response = NextResponse.json({ success: true });
    response.cookies.set({
        name: "admin_session",
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" && (req.headers.get("x-forwarded-proto") === "https" || req.url.startsWith("https://")),
        sameSite: "lax",
        path: "/",
        maxAge: 0,
    });
    return response;
}
