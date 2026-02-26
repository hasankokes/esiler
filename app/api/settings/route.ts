import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: settingsRow, error } = await supabase.from('settings').select('data').eq('id', 'site_settings').single();

    if (error || !settingsRow) {
        return NextResponse.json({
            geminiApiKey: "",
            hasGeminiKey: false,
        });
    }

    const settings = settingsRow.data || {};

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

    const { data: settingsRow } = await supabase.from('settings').select('data').eq('id', 'site_settings').single();
    const settings = settingsRow?.data || {};

    if (body.geminiApiKey !== undefined) {
        // Only update if not masked value
        if (!body.geminiApiKey.startsWith("••••••")) {
            settings.geminiApiKey = body.geminiApiKey;
        }
    }

    const { error } = await supabase.from('settings').upsert({ id: 'site_settings', data: settings });

    if (error) {
        return NextResponse.json({ error: "Ayarlar kaydedilemedi" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
