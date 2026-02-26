import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { prompt, referenceImage } = await req.json();

        // Read API key from settings
        const { readSettings } = await import("@/lib/settings-store");
        const settings = readSettings();

        if (!settings.geminiApiKey) {
            return NextResponse.json(
                { error: "Gemini API anahtarı ayarlanmamış. Ayarlar sayfasından ekleyin." },
                { status: 400 }
            );
        }

        const parts: {
            text?: string;
            inlineData?: {
                mimeType: string;
                data: string;
            };
        }[] = [
                {
                    text: `Generate a professional fashion product photo for a wholesale knitwear brand. The product is described as: ${prompt}. Dress a professional model with this item. Style: clean background, professional studio lighting, premium fashion photography. The model's face and body should look highly realistic. No text, no watermarks.`,
                },
            ];

        if (referenceImage) {
            parts.push({
                inlineData: {
                    mimeType: referenceImage.mimeType,
                    data: referenceImage.data, // base64 string
                },
            });
            parts[0].text += " Use the provided image of the clothing item as a precise reference for what the model should be wearing. The generated image MUST feature this exact clothing item.";
        }

        // Call Gemini API for image generation
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${settings.geminiApiKey}`;

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts }],
                generationConfig: {
                    responseModalities: ["TEXT", "IMAGE"],
                },
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Gemini API error:", errorData);
            return NextResponse.json(
                { error: "AI görsel oluşturulamadı. API anahtarınızı kontrol edin." },
                { status: 500 }
            );
        }

        const data = await response.json();

        // Extract image from response
        const candidates = data.candidates;
        if (!candidates || candidates.length === 0) {
            return NextResponse.json(
                { error: "AI görsel üretemedi. Farklı bir açıklama deneyin." },
                { status: 500 }
            );
        }

        const responseParts = candidates[0].content?.parts || [];
        const imagePart = responseParts.find(
            (p: { inlineData?: { mimeType: string; data: string } }) => p.inlineData
        );

        if (!imagePart || !imagePart.inlineData) {
            return NextResponse.json(
                { error: "API görsel döndürmedi. Farklı bir açıklama deneyin." },
                { status: 500 }
            );
        }

        // Save the generated image
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const ext = imagePart.inlineData.mimeType?.includes("png") ? ".png" : ".jpg";
        const filename = `ai-${Date.now()}${ext}`;
        const filepath = path.join(uploadDir, filename);

        const imageBuffer = Buffer.from(imagePart.inlineData.data, "base64");
        fs.writeFileSync(filepath, imageBuffer);

        return NextResponse.json({
            url: `/uploads/${filename}`,
            filename,
        });
    } catch (err) {
        console.error("AI generation error:", err);
        return NextResponse.json(
            { error: "AI görsel oluşturma sırasında hata oluştu" },
            { status: 500 }
        );
    }
}
