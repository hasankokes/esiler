import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

    const validUsername = process.env.ADMIN_USERNAME || "admin";
    const validPassword = process.env.ADMIN_PASSWORD || "esiler1964";

    if (username === validUsername && password === validPassword) {
        const response = NextResponse.json({ success: true });
        response.cookies.set({
            name: "admin_session",
            value: "authenticated",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" && (req.headers.get("x-forwarded-proto") === "https" || req.url.startsWith("https://")),
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        return response;
    }

    return NextResponse.json({ success: false, error: "Geçersiz kullanıcı adı veya şifre" }, { status: 401 });
}
