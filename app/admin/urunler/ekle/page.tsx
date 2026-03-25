"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Upload, Sparkles, Loader2, Image as ImageIcon } from "lucide-react";
import { PRODUCT_COLORS } from "@/lib/colors";
import { ProductImage } from "@/types/product";

type CategoryOption = { value: string; label: string };

export default function AddProduct() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const aiFileInputRef = useRef<HTMLInputElement>(null);
    const [saving, setSaving] = useState(false);
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [form, setForm] = useState({
        name: "",
        cat: "",
        catLabel: "",
        fabric: "",
        gram: "",
        size: "",
        minOrder: "",
        colors: [] as string[],
        images: [] as ProductImage[],
        status: "active",
        description: "",
    });
    const [newColor, setNewColor] = useState("");
    const [uploading, setUploading] = useState(false);
    const [aiGenerating, setAiGenerating] = useState(false);
    const [aiPrompt, setAiPrompt] = useState("");
    const [aiError, setAiError] = useState("");
    const [aiRefImage, setAiRefImage] = useState<{ data: string; mimeType: string } | null>(null);

    useEffect(() => {
        fetch("/api/categories")
            .then((res) => res.json())
            .then((cats: CategoryOption[]) => {
                setCategories(cats);
                if (cats.length > 0) {
                    setForm((prev) => ({ ...prev, cat: cats[0].value, catLabel: cats[0].label }));
                }
            });
    }, []);

    const addColor = () => {
        if (newColor && !form.colors.includes(newColor)) {
            setForm((prev) => ({ ...prev, colors: [...prev.colors, newColor] }));
        }
    };

    const removeColor = (color: string) => {
        setForm((prev) => ({ ...prev, colors: prev.colors.filter((c) => c !== color) }));
    };

    const updateCategory = (cat: string) => {
        const label = categories.find((c) => c.value === cat)?.label || cat;
        setForm((prev) => ({ ...prev, cat, catLabel: label }));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await res.json();
            if (res.ok && data.url) {
                setForm((prev) => ({ ...prev, images: [...prev.images, { url: data.url }] }));
            }
        } catch {
            alert("Dosya yüklenemedi");
        }
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleAiImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setAiRefImage({
                data: base64String.split(",")[1],
                mimeType: file.type,
            });
        };
        reader.readAsDataURL(file);
        if (aiFileInputRef.current) aiFileInputRef.current.value = "";
    };

    const handleAiGenerate = async () => {
        const prompt = aiPrompt || form.name;
        if (!prompt) return;

        setAiGenerating(true);
        setAiError("");

        try {
            const res = await fetch("/api/ai-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt, referenceImage: aiRefImage }),
            });
            const data = await res.json();
            if (res.ok && data.url) {
                setForm((prev) => ({ ...prev, images: [...prev.images, { url: data.url }] }));
                setAiPrompt("");
            } else {
                setAiError(data.error || "AI görsel oluşturulamadı");
            }
        } catch {
            setAiError("Bağlantı hatası");
        }
        setAiGenerating(false);
    };

    const removeImage = (indexToRemove: number) => {
        setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== indexToRemove) }));
    };

    const updateImageColor = (index: number, color: string) => {
        setForm(prev => {
            const newImages = [...prev.images];
            const img = newImages[index];
            if (typeof img === 'string') {
                newImages[index] = { url: img, color: color || undefined };
            } else {
                newImages[index] = { ...img, color: color || undefined };
            }
            return { ...prev, images: newImages };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) router.push("/admin/urunler");
        setSaving(false);
    };

    return (
        <div className="max-w-[700px]">
            <div className="mb-8">
                <h2 className="font-cormorant text-3xl text-[#D4C5A9] font-light">Yeni Ürün Ekle</h2>
                <p className="font-mono text-[0.7rem] text-[#D4C5A9]/40 tracking-[0.1em] mt-1">
                    Ürün bilgilerini girin
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#D4C5A9]/60 mb-2">
                        Ürün Adı *
                    </label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-white/5 border border-[#D4C5A9]/20 px-4 py-3 text-[0.9rem] text-[#D4C5A9] placeholder-[#D4C5A9]/20 focus:outline-none focus:border-[#B5622C] transition-colors"
                        placeholder="Sıfır Yaka Penye Tişört"
                        required
                    />
                </div>
                
                {/* Description */}
                <div>
                    <label className="block font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#D4C5A9]/60 mb-2">
                        Ürün Açıklaması
                    </label>
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                        className="w-full bg-white/5 border border-[#D4C5A9]/20 px-4 py-3 text-[0.9rem] text-[#D4C5A9] placeholder-[#D4C5A9]/20 focus:outline-none focus:border-[#B5622C] transition-colors min-h-[120px] resize-y"
                        placeholder="Ürün hakkında detaylı bilgi girin..."
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#D4C5A9]/60 mb-2">
                        Kategori *
                    </label>
                    <select
                        value={form.cat}
                        onChange={(e) => updateCategory(e.target.value)}
                        className="w-full bg-[#0f1923] border border-[#D4C5A9]/20 px-4 py-3 text-[0.9rem] text-[#D4C5A9] focus:outline-none focus:border-[#B5622C] transition-colors"
                    >
                        {categories.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                    </select>
                </div>

                {/* Fabric + Gram */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#D4C5A9]/60 mb-2">
                            Kumaş
                        </label>
                        <input
                            type="text"
                            value={form.fabric}
                            onChange={(e) => setForm((prev) => ({ ...prev, fabric: e.target.value }))}
                            className="w-full bg-white/5 border border-[#D4C5A9]/20 px-4 py-3 text-[0.9rem] text-[#D4C5A9] placeholder-[#D4C5A9]/20 focus:outline-none focus:border-[#B5622C] transition-colors"
                            placeholder="%100 Penye Pamuk"
                        />
                    </div>
                    <div>
                        <label className="block font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#D4C5A9]/60 mb-2">
                            Gramaj
                        </label>
                        <input
                            type="text"
                            value={form.gram}
                            onChange={(e) => setForm((prev) => ({ ...prev, gram: e.target.value }))}
                            className="w-full bg-white/5 border border-[#D4C5A9]/20 px-4 py-3 text-[0.9rem] text-[#D4C5A9] placeholder-[#D4C5A9]/20 focus:outline-none focus:border-[#B5622C] transition-colors"
                            placeholder="160 gr/m²"
                        />
                    </div>
                </div>

                {/* Size + Min Order */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#D4C5A9]/60 mb-2">
                            Beden Aralığı
                        </label>
                        <input
                            type="text"
                            value={form.size}
                            onChange={(e) => setForm((prev) => ({ ...prev, size: e.target.value }))}
                            className="w-full bg-white/5 border border-[#D4C5A9]/20 px-4 py-3 text-[0.9rem] text-[#D4C5A9] placeholder-[#D4C5A9]/20 focus:outline-none focus:border-[#B5622C] transition-colors"
                            placeholder="S–2XL"
                        />
                    </div>
                    <div>
                        <label className="block font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#D4C5A9]/60 mb-2">
                            Minimum Sipariş
                        </label>
                        <input
                            type="text"
                            value={form.minOrder}
                            onChange={(e) => setForm((prev) => ({ ...prev, minOrder: e.target.value }))}
                            className="w-full bg-white/5 border border-[#D4C5A9]/20 px-4 py-3 text-[0.9rem] text-[#D4C5A9] placeholder-[#D4C5A9]/20 focus:outline-none focus:border-[#B5622C] transition-colors"
                            placeholder="1 Düzine (12 Adet)"
                        />
                    </div>
                </div>

                {/* ═══════════════ IMAGES SECTION ═══════════════ */}
                <div className="border border-[#D4C5A9]/10 bg-white/[0.02] p-5">
                    <label className="block font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#D4C5A9]/60 mb-4">
                        Ürün Görselleri
                    </label>

                    {/* Image preview grid */}
                    {form.images.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                            {form.images.map((img, index) => {
                                const url = typeof img === 'string' ? img : img.url;
                                const color = typeof img === 'string' ? undefined : img.color;
                                return (
                                    <div key={index} className="relative group bg-white/5 border border-[#D4C5A9]/10 p-2 flex flex-col gap-2">
                                        <div className="relative aspect-square overflow-hidden border border-[#D4C5A9]/10">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={url} alt="" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                        {form.colors.length > 0 && (
                                            <select
                                                value={color || ""}
                                                onChange={(e) => updateImageColor(index, e.target.value)}
                                                className="w-full bg-[#0f1923] border border-[#D4C5A9]/20 px-2 py-1.5 text-[0.7rem] text-[#D4C5A9] focus:outline-none focus:border-[#B5622C] transition-colors"
                                            >
                                                <option value="">Genel Görsel</option>
                                                {form.colors.map(c => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Upload button */}
                    <div className="flex gap-2 mb-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="flex items-center gap-2 bg-white/5 border border-[#D4C5A9]/20 px-4 py-2.5 text-[0.75rem] text-[#D4C5A9]/70 hover:border-[#B5622C] hover:text-[#D4C5A9] transition-colors disabled:opacity-50"
                        >
                            {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                            {uploading ? "Yükleniyor..." : "Fotoğraf Yükle"}
                        </button>
                    </div>

                    {/* AI generation */}
                    <div className="border-t border-[#D4C5A9]/10 pt-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles size={14} className="text-[#B5622C]" />
                            <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[#D4C5A9]/50">
                                AI ile Görsel Oluştur
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={aiPrompt}
                                onChange={(e) => setAiPrompt(e.target.value)}
                                className="flex-1 bg-white/5 border border-[#D4C5A9]/20 px-3 py-2.5 text-[0.8rem] text-[#D4C5A9] placeholder-[#D4C5A9]/20 focus:outline-none focus:border-[#B5622C] transition-colors"
                                placeholder={form.name || "Ürün açıklaması yazın..."}
                            />
                            <button
                                type="button"
                                onClick={handleAiGenerate}
                                disabled={aiGenerating}
                                className="flex items-center gap-2 bg-[#B5622C]/20 text-[#B5622C] px-4 py-2.5 text-[0.75rem] hover:bg-[#B5622C]/30 transition-colors disabled:opacity-50 whitespace-nowrap"
                            >
                                {aiGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                                {aiGenerating ? "Oluşturuluyor..." : "Oluştur"}
                            </button>
                        </div>

                        <div className="mt-3">
                            <input
                                ref={aiFileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleAiImageSelect}
                                className="hidden"
                            />
                            {aiRefImage ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 border border-[#D4C5A9]/20 overflow-hidden bg-white/5">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={`data:${aiRefImage.mimeType};base64,${aiRefImage.data}`} alt="Reference" className="w-full h-full object-cover" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setAiRefImage(null)}
                                        className="text-[0.65rem] text-red-400/50 hover:text-red-400 font-mono tracking-[0.1em] uppercase transition-colors"
                                    >
                                        Görseli Kaldır
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => aiFileInputRef.current?.click()}
                                    className="text-[0.65rem] text-[#D4C5A9]/40 hover:text-[#D4C5A9]/70 font-mono tracking-[0.1em] uppercase flex items-center gap-1.5 transition-colors"
                                >
                                    <ImageIcon size={12} />
                                    Kıyafet Fotoğrafı Ekle (Model Giydirme)
                                </button>
                            )}
                        </div>

                        {aiError && (
                            <p className="text-red-400/70 text-[0.7rem] mt-2">{aiError}</p>
                        )}
                    </div>

                    {form.images.length === 0 && (
                        <div className="text-center py-4 mt-2">
                            <ImageIcon size={28} className="text-[#D4C5A9]/15 mx-auto mb-2" />
                            <p className="font-mono text-[0.65rem] text-[#D4C5A9]/25">Henüz görsel eklenmedi</p>
                        </div>
                    )}
                </div>

                {/* Colors */}
                <div>
                    <label className="block font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#D4C5A9]/60 mb-2">
                        Renk Seçenekleri
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {form.colors.map((c) => {
                            const colorObj = PRODUCT_COLORS.find(pc => pc.name === c);
                            const hex = colorObj ? colorObj.hex : c;
                            return (
                                <div key={c} className="flex items-center gap-1.5 bg-white/5 border border-[#D4C5A9]/10 px-2 py-1 rounded">
                                    <div className="w-5 h-5 rounded-full border border-[#D4C5A9]/20" style={{ background: hex }} />
                                    <span className="font-mono text-[0.6rem] text-[#D4C5A9]/60">{c}</span>
                                    <button type="button" onClick={() => removeColor(c)} className="text-red-400/50 hover:text-red-400">
                                        <X size={12} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                            className="flex-1 bg-white/5 border border-[#D4C5A9]/20 px-4 py-2 text-[0.8rem] text-[#D4C5A9] font-mono focus:outline-none focus:border-[#B5622C] transition-colors"
                        >
                            <option value="">Renk Seçin</option>
                            {PRODUCT_COLORS.map(c => (
                                <option key={c.name} value={c.name}>{c.name}</option>
                            ))}
                        </select>
                        <button type="button" onClick={addColor} className="px-4 py-2 bg-[#B5622C]/20 text-[#B5622C] text-[0.75rem] hover:bg-[#B5622C]/30 transition-colors flex items-center gap-1">
                            <Plus size={14} /> Ekle
                        </button>
                    </div>
                </div>

                {/* Status */}
                <div>
                    <label className="block font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#D4C5A9]/60 mb-2">
                        Durum
                    </label>
                    <div className="flex gap-3">
                        <button type="button" onClick={() => setForm((prev) => ({ ...prev, status: "active" }))}
                            className={`px-4 py-2 text-[0.75rem] font-mono tracking-[0.1em] uppercase border transition-colors ${form.status === "active" ? "border-green-400/50 text-green-400 bg-green-400/10" : "border-[#D4C5A9]/10 text-[#D4C5A9]/30"}`}>
                            Aktif
                        </button>
                        <button type="button" onClick={() => setForm((prev) => ({ ...prev, status: "draft" }))}
                            className={`px-4 py-2 text-[0.75rem] font-mono tracking-[0.1em] uppercase border transition-colors ${form.status === "draft" ? "border-yellow-400/50 text-yellow-400 bg-yellow-400/10" : "border-[#D4C5A9]/10 text-[#D4C5A9]/30"}`}>
                            Taslak
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-4">
                    <button type="submit" disabled={saving}
                        className="bg-[#B5622C] text-white px-8 py-3 text-[0.75rem] tracking-[0.15em] uppercase hover:bg-[#9a5325] transition-colors disabled:opacity-50">
                        {saving ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                    <button type="button" onClick={() => router.back()}
                        className="border border-[#D4C5A9]/20 text-[#D4C5A9]/60 px-8 py-3 text-[0.75rem] tracking-[0.15em] uppercase hover:border-[#D4C5A9]/40 hover:text-[#D4C5A9] transition-colors">
                        İptal
                    </button>
                </div>
            </form>
        </div>
    );
}
