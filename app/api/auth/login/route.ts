import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

    const validUsername = process.env.ADMIN_USERNAME || "admin";
    const validPassword = process.env.ADMIN_PASSWORD || "esiler1964";

    if (username === validUsername && password === validPassword) {
        cookies().set("admin_session", "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: "Geçersiz kullanıcı adı veya şifre" }, { status: 401 });
}
