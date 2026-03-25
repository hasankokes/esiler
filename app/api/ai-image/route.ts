import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { prompt, referenceImage } = await req.json();

        // Read API key from settings
        const { supabase } = await import("@/lib/supabase");
        const { data: settingsRow } = await supabase.from('settings').select('data').eq('id', 'site_settings').single();
        const settings = settingsRow?.data || {};

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

        // Use the Imagen 3 endpoint for image generation
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${settings.geminiApiKey}`;

        const payload = {
            instances: [{ prompt: parts[0].text }],
            parameters: { sampleCount: 1 }
        };

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Gemini API error:", errorData);

            require('fs').writeFileSync('/tmp/gemini-err.txt', errorData);

            let errorMessage = "AI görsel oluşturulamadı. API anahtarınızı kontrol edin.";

            if (errorData.includes("paid plans")) {
                errorMessage = "Görsel oluşturma (Imagen) özelliği yalnızca ücretli Gemini API planlarında kullanılabilir. Lütfen Google API konsolundan hesabınızı yükseltin.";
            } else if (errorData.includes("API key not valid")) {
                errorMessage = "API anahtarı geçersiz. Lütfen ayarlar sayfasından kontrol edin.";
            } else if (errorData.includes("not found")) {
                errorMessage = "Görsel oluşturma modeli bulunamadı. Lütfen ücretli bir API planı kullanın.";
            }

            return NextResponse.json(
                { error: errorMessage },
                { status: 500 }
            );
        }

        const data = await response.json();

        // Extract image from response
        const predictions = data.predictions;
        if (!predictions || predictions.length === 0) {
            return NextResponse.json(
                { error: "AI görsel üretemedi. Farklı bir açıklama deneyin." },
                { status: 500 }
            );
        }

        const imagePart = predictions[0];

        if (!imagePart || !imagePart.bytesBase64Encoded) {
            return NextResponse.json(
                { error: "API görsel döndürmedi. Farklı bir açıklama deneyin." },
                { status: 500 }
            );
        }

        const ext = imagePart.mimeType?.includes("png") ? ".png" : ".jpg";
        const filename = `ai-${Date.now()}${ext}`;

        const imageBuffer = Buffer.from(imagePart.bytesBase64Encoded, "base64");

        const { error: uploadError } = await supabase.storage.from("images").upload(filename, imageBuffer, {
            contentType: imagePart.mimeType || "image/jpeg",
            upsert: false
        });

        if (uploadError) {
            throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(filename);

        return NextResponse.json({
            url: publicUrl,
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
