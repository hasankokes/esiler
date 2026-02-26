import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const session = req.cookies.get("admin_session");

    if (session?.value === "authenticated") {
        return NextResponse.json({ authenticated: true }, {
            headers: {
                'Cache-Control': 'no-store, max-age=0'
            }
        });
    }

    return NextResponse.json({ authenticated: false }, {
        status: 401,
        headers: {
            'Cache-Control': 'no-store, max-age=0'
        }
    });
}
