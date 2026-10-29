"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, EyeOff, Package, ArrowUp, ArrowDown, Save } from "lucide-react";
import { PRODUCT_COLORS } from "@/lib/colors";
import { sizedImage } from "@/lib/image";
import { ProductImage } from "@/types/product";

type AdminProduct = {
    id: number;
    name: string;
    cat: string;
    catLabel: string;
    fabric: string;
    gram: string;
    size: string;
    colors: string[];
    minOrder?: string;
    images?: ProductImage[];
    status?: string;
    description?: string;
    sort_order?: number;
    is_gun_cicegi?: boolean;
};

export default function AdminProducts() {
    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOrderChanged, setIsOrderChanged] = useState(false);
    const [isSavingOrder, setIsSavingOrder] = useState(false);

    const fetchProducts = async () => {
        const res = await fetch("/api/products");
        if (res.ok) {
            const data = await res.json();
            setProducts(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (id: number) => {
        if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;

        const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
        if (res.ok) {
            setProducts((prev) => prev.filter((p) => p.id !== id));
        }
    };

    const toggleStatus = async (product: AdminProduct) => {
        const newStatus = product.status === "draft" ? "active" : "draft";
        const res = await fetch("/api/products", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...product, status: newStatus }),
        });
        if (res.ok) {
            setProducts((prev) =>
                prev.map((p) => (p.id === product.id ? { ...p, status: newStatus } : p))
            );
        }
    };

    const handleMoveUp = (index: number) => {
        if (index === 0) return;
        const newProducts = [...products];
        const temp = newProducts[index];
        newProducts[index] = newProducts[index - 1];
        newProducts[index - 1] = temp;
        setProducts(newProducts);
        setIsOrderChanged(true);
    };

    const handleMoveDown = (index: number) => {
        if (index === products.length - 1) return;
        const newProducts = [...products];
        const temp = newProducts[index];
        newProducts[index] = newProducts[index + 1];
        newProducts[index + 1] = temp;
        setProducts(newProducts);
        setIsOrderChanged(true);
    };

    const saveOrder = async () => {
        setIsSavingOrder(true);
        const productsWithOrder = products.map((p, index) => ({
            id: p.id,
            sort_order: index,
        }));

        const res = await fetch("/api/products", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ products: productsWithOrder }),
        });

        if (res.ok) {
            setIsOrderChanged(false);
            alert("Sıralama başarıyla kaydedildi.");
        } else {
            alert("Sıralama kaydedilirken bir hata oluştu.");
        }
        setIsSavingOrder(false);
    };

    const catLabels: Record<string, string> = {
        penye: "Penye",
        buyuk: "Büyük Beden",
        hirka: "Hırka & Yelek",
        badi: "Badi",
    };

    const getHex = (colorName: string) => PRODUCT_COLORS.find(c => c.name === colorName)?.hex || colorName;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <span className="font-mono text-[0.75rem] text-[#D4C5A9]/40">Yükleniyor...</span>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="font-cormorant text-3xl text-[#D4C5A9] font-light">Ürünler</h2>
                    <p className="font-mono text-[0.7rem] text-[#D4C5A9]/40 tracking-[0.1em] mt-1">
                        {products.length} ürün kayıtlı
                    </p>
                </div>
                <div className="flex gap-3">
                    {isOrderChanged && (
                        <button
                            onClick={saveOrder}
                            disabled={isSavingOrder}
                            className="flex items-center gap-2 bg-[#D4C5A9]/10 text-[#D4C5A9] border border-[#D4C5A9]/20 px-5 py-2.5 text-[0.75rem] tracking-[0.1em] uppercase hover:bg-[#D4C5A9]/20 transition-colors disabled:opacity-50"
                        >
                            {isSavingOrder ? <span className="animate-spin inline-block">◌</span> : <Save size={16} />}
                            Sıralamayı Kaydet
                        </button>
                    )}
                    <Link
                        href="/admin/urunler/ekle"
                        className="flex items-center gap-2 bg-[#B5622C] text-white px-5 py-2.5 text-[0.75rem] tracking-[0.1em] uppercase hover:bg-[#9a5325] transition-colors"
                    >
                        <Plus size={16} />
                        Yeni Ürün
                    </Link>
                </div>
            </div>

            {products.length === 0 ? (
                <div className="bg-white/[0.03] border border-[#D4C5A9]/10 p-12 text-center">
                    <Package size={40} className="text-[#D4C5A9]/20 mx-auto mb-4" />
                    <p className="font-mono text-[0.8rem] text-[#D4C5A9]/40">
                        Henüz ürün eklenmemiş
                    </p>
                    <Link
                        href="/admin/urunler/ekle"
                        className="inline-block mt-4 text-[#B5622C] font-mono text-[0.75rem] tracking-[0.1em] uppercase hover:text-[#D4C5A9] transition-colors"
                    >
                        + İlk ürünü ekle
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-[#D4C5A9]/10">
                                <th className="text-left font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[#D4C5A9]/40 pb-3 pr-4">
                                    Sıra
                                </th>
                                <th className="text-left font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[#D4C5A9]/40 pb-3 pr-4">
                                    Ürün
                                </th>
                                <th className="text-left font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[#D4C5A9]/40 pb-3 pr-4">
                                    Kategori
                                </th>
                                <th className="text-left font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[#D4C5A9]/40 pb-3 pr-4">
                                    Renkler
                                </th>
                                <th className="text-left font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[#D4C5A9]/40 pb-3 pr-4">
                                    Durum
                                </th>
                                <th className="text-right font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[#D4C5A9]/40 pb-3">
                                    İşlemler
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p, index) => (
                                <tr
                                    key={p.id}
                                    className="border-b border-[#D4C5A9]/5 hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="py-4 pr-4">
                                        <div className="flex flex-col gap-1 items-center justify-center w-8">
                                            <button
                                                onClick={() => handleMoveUp(index)}
                                                disabled={index === 0}
                                                className="p-1 text-[#D4C5A9]/40 hover:text-[#D4C5A9] disabled:opacity-10 transition-colors"
                                                title="Yukarı Taşı"
                                            >
                                                <ArrowUp size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleMoveDown(index)}
                                                disabled={index === products.length - 1}
                                                className="p-1 text-[#D4C5A9]/40 hover:text-[#D4C5A9] disabled:opacity-10 transition-colors"
                                                title="Aşağı Taşı"
                                            >
                                                <ArrowDown size={14} />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-4 pr-4">
                                        <div className="flex items-center gap-3">
                                            {p.images && p.images.length > 0 ? (
                                                <div className="w-10 h-10 bg-white/5 border border-[#D4C5A9]/10 overflow-hidden flex-shrink-0">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={sizedImage(typeof p.images[0] === 'string' ? p.images[0] : p.images[0].url, 120, 180)}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 bg-white/5 border border-[#D4C5A9]/10 flex items-center justify-center flex-shrink-0">
                                                    <Package size={14} className="text-[#D4C5A9]/20" />
                                                </div>
                                            )}
                                            <div>
                                                <span className="text-[0.85rem] text-[#D4C5A9] flex items-center gap-2">
                                                    {p.name}
                                                    {p.is_gun_cicegi && (
                                                        <span className="text-[#B5622C]" title="Gün Çiçeği Koleksiyonu">
                                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" />
                                                                <path d="M12 2c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1s1-.45 1-1V3c0-.55-.45-1-1-1zm0 16c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1zm10-7h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1zM6 12c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1-.45 1-1zm13.07-5.07c-.39-.39-1.02-.39-1.41 0l-1.42 1.42c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.42-1.42c.39-.38.39-1.02 0-1.41zM7.76 16.24c-.39-.39-1.02-.39-1.41 0l-1.42 1.42c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.42-1.42c.39-.39.39-1.02 0-1.41zm11.31 1.42-1.42-1.42c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l1.42 1.42c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41zM7.76 7.76c-.39-.39-1.02-.39-1.41 0L4.93 9.18c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.42-1.42c.39-.39.39-1.02 0-1.41z" />
                                                            </svg>
                                                        </span>
                                                    )}
                                                </span>
                                                <br />
                                                <span className="font-mono text-[0.6rem] text-[#D4C5A9]/30">
                                                    {p.fabric} {p.gram ? `· ${p.gram}` : ""} · {p.size}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 pr-4">
                                        <span className="font-mono text-[0.7rem] text-[#B5622C] tracking-[0.1em] uppercase">
                                            {catLabels[p.cat] || p.cat}
                                        </span>
                                    </td>
                                    <td className="py-4 pr-4">
                                        <div className="flex gap-1">
                                            {p.colors?.slice(0, 5).map((c, i) => (
                                                <div
                                                    key={i}
                                                    className="w-4 h-4 rounded-full border border-[#D4C5A9]/20"
                                                    style={{ background: getHex(c) }}
                                                    title={c}
                                                />
                                            ))}
                                            {p.colors && p.colors.length > 5 && (
                                                <span className="font-mono text-[0.6rem] text-[#D4C5A9]/30 ml-1">
                                                    +{p.colors.length - 5}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 pr-4">
                                        <button
                                            onClick={() => toggleStatus(p)}
                                            className={`flex items-center gap-1.5 font-mono text-[0.65rem] tracking-[0.1em] uppercase px-2 py-1 rounded ${p.status === "draft"
                                                ? "text-yellow-400/70 bg-yellow-400/5"
                                                : "text-green-400/70 bg-green-400/5"
                                                }`}
                                        >
                                            {p.status === "draft" ? (
                                                <>
                                                    <EyeOff size={12} /> Taslak
                                                </>
                                            ) : (
                                                <>
                                                    <Eye size={12} /> Aktif
                                                </>
                                            )}
                                        </button>
                                    </td>
                                    <td className="py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/urunler/duzenle/${p.id}`}
                                                className="p-2 text-[#D4C5A9]/40 hover:text-[#D4C5A9] hover:bg-white/5 transition-colors rounded"
                                            >
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => deleteProduct(p.id)}
                                                className="p-2 text-red-400/40 hover:text-red-400 hover:bg-red-400/10 transition-colors rounded"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

