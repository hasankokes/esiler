import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
        }

        const ext = file.name.substring(file.name.lastIndexOf('.')) || ".jpg";
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;

        const { data, error } = await supabase.storage.from("images").upload(filename, file, {
            contentType: file.type || "image/jpeg",
            upsert: false
        });

        if (error) {
            console.error("Supabase Storage Error:", error);
            throw error;
        }

        const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(filename);

        return NextResponse.json({
            url: publicUrl,
            filename,
        });

    } catch (err) {
        console.error("Upload error:", err);
        return NextResponse.json({ error: "Dosya yüklenemedi" }, { status: 500 });
    }
}
