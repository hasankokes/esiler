"use client";

import { useEffect, useState } from "react";
import { Key, Save, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminSettings() {
    const [geminiKey, setGeminiKey] = useState("");
    const [hasKey, setHasKey] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => {
                if (data.geminiApiKey) setGeminiKey(data.geminiApiKey);
                setHasKey(data.hasGeminiKey);
            });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);

        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ geminiApiKey: geminiKey }),
            });

            if (res.ok) {
                setMessage({ type: "success", text: "Ayarlar kaydedildi" });
                setHasKey(!!geminiKey);
            } else {
                setMessage({ type: "error", text: "Kaydetme başarısız" });
            }
        } catch {
            setMessage({ type: "error", text: "Bir hata oluştu" });
        }

        setSaving(false);
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div className="max-w-[700px]">
            <div className="mb-8">
                <h2 className="font-cormorant text-3xl text-[#D4C5A9] font-light">Ayarlar</h2>
                <p className="font-mono text-[0.7rem] text-[#D4C5A9]/40 tracking-[0.1em] mt-1">
                    API anahtarları ve yapılandırma
                </p>
            </div>

            {/* Status message */}
            {message && (
                <div
                    className={`flex items-center gap-2 p-4 mb-6 border text-[0.8rem] ${message.type === "success"
                            ? "bg-green-400/5 border-green-400/20 text-green-400"
                            : "bg-red-400/5 border-red-400/20 text-red-400"
                        }`}
                >
                    {message.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                    {message.text}
                </div>
            )}

            {/* Gemini API Key */}
            <div className="bg-white/[0.03] border border-[#D4C5A9]/10 p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <Key size={18} className="text-[#B5622C]" />
                    <h3 className="font-mono text-[0.75rem] tracking-[0.12em] uppercase text-[#D4C5A9]/70">
                        Google Gemini API
                    </h3>
                    {hasKey && (
                        <span className="ml-auto font-mono text-[0.6rem] tracking-[0.1em] text-green-400/70 bg-green-400/10 px-2 py-0.5 rounded">
                            Aktif
                        </span>
                    )}
                </div>
                <p className="text-[0.78rem] text-[#D4C5A9]/40 mb-4 leading-relaxed">
                    AI ile ürün görseli oluşturmak için Google Gemini API anahtarı gereklidir.
                    Anahtarınızı{" "}
                    <a
                        href="https://aistudio.google.com/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#B5622C] hover:text-[#D4C5A9] underline transition-colors"
                    >
                        Google AI Studio
                    </a>
                    {" "}üzerinden alabilirsiniz.
                </p>
                <div className="flex gap-2">
                    <input
                        type="password"
                        value={geminiKey}
                        onChange={(e) => setGeminiKey(e.target.value)}
                        className="flex-1 bg-white/5 border border-[#D4C5A9]/20 px-4 py-3 text-[0.85rem] text-[#D4C5A9] font-mono placeholder-[#D4C5A9]/20 focus:outline-none focus:border-[#B5622C] transition-colors"
                        placeholder="AIzaSy..."
                    />
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-[#B5622C] text-white px-6 py-3 text-[0.75rem] tracking-[0.1em] uppercase hover:bg-[#9a5325] transition-colors disabled:opacity-50"
                    >
                        <Save size={14} />
                        {saving ? "..." : "Kaydet"}
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="bg-white/[0.02] border border-[#D4C5A9]/5 p-5">
                <p className="font-mono text-[0.65rem] text-[#D4C5A9]/30 leading-relaxed">
                    API anahtarları sunucuda güvenli şekilde saklanır ve asla istemci tarafında gösterilmez.
                    Anahtarınızı değiştirmek için yeni bir anahtar girin ve kaydedin.
                </p>
            </div>
        </div>
    );
}
