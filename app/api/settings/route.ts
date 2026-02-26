import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { readSettings } = await import("@/lib/settings-store");
    const settings = readSettings();
    // Mask the API key for security
    return NextResponse.json({
        geminiApiKey: settings.geminiApiKey ? "••••••" + settings.geminiApiKey.slice(-6) : "",
        hasGeminiKey: !!settings.geminiApiKey,
    });
}

export async function PUT(req: NextRequest) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { readSettings, writeSettings } = await import("@/lib/settings-store");
    const settings = readSettings();

    if (body.geminiApiKey !== undefined) {
        // Only update if not masked value
        if (!body.geminiApiKey.startsWith("••••••")) {
            settings.geminiApiKey = body.geminiApiKey;
        }
    }

    writeSettings(settings);
    return NextResponse.json({ success: true });
}
