"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, EyeOff, Package } from "lucide-react";

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
    images?: string[];
    status?: string;
};

export default function AdminProducts() {
    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [loading, setLoading] = useState(true);

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

    const catLabels: Record<string, string> = {
        penye: "Penye",
        buyuk: "Büyük Beden",
        hirka: "Hırka & Yelek",
        badi: "Badi",
    };

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
                <Link
                    href="/admin/urunler/ekle"
                    className="flex items-center gap-2 bg-[#B5622C] text-white px-5 py-2.5 text-[0.75rem] tracking-[0.1em] uppercase hover:bg-[#9a5325] transition-colors"
                >
                    <Plus size={16} />
                    Yeni Ürün
                </Link>
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
                            {products.map((p) => (
                                <tr
                                    key={p.id}
                                    className="border-b border-[#D4C5A9]/5 hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="py-4 pr-4">
                                        <div className="flex items-center gap-3">
                                            {p.images && p.images.length > 0 ? (
                                                <div className="w-10 h-10 bg-white/5 border border-[#D4C5A9]/10 overflow-hidden flex-shrink-0">
                                                    <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 bg-white/5 border border-[#D4C5A9]/10 flex items-center justify-center flex-shrink-0">
                                                    <Package size={14} className="text-[#D4C5A9]/20" />
                                                </div>
                                            )}
                                            <div>
                                                <span className="text-[0.85rem] text-[#D4C5A9]">{p.name}</span>
                                                <br />
                                                <span className="font-mono text-[0.6rem] text-[#D4C5A9]/30">
                                                    {p.fabric} · {p.size}
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
                                                    style={{ background: c }}
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
