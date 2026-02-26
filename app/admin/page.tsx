"use client";

import { useEffect, useState } from "react";
import { Package, TrendingUp, Palette, Layers } from "lucide-react";
import Link from "next/link";

type AdminProduct = {
    id: number;
    name: string;
    cat: string;
    colors: string[];
    status?: string;
};

type Stats = {
    totalProducts: number;
    categories: number;
    totalColors: number;
    activeProducts: number;
};

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((products: AdminProduct[]) => {
                const categories = new Set(products.map((p) => p.cat));
                const totalColors = products.reduce(
                    (sum, p) => sum + (p.colors?.length || 0),
                    0
                );

                setStats({
                    totalProducts: products.length,
                    categories: categories.size,
                    totalColors,
                    activeProducts: products.filter((p) => p.status !== "draft").length,
                });
            })
            .catch(() => {
                setStats({ totalProducts: 0, categories: 0, totalColors: 0, activeProducts: 0 });
            });
    }, []);

    const statCards = [
        { label: "Toplam Ürün", value: stats?.totalProducts ?? 0, icon: Package, color: "#B5622C" },
        { label: "Kategori", value: stats?.categories ?? 0, icon: Layers, color: "#5B7FA6" },
        { label: "Renk Seçeneği", value: stats?.totalColors ?? 0, icon: Palette, color: "#6B8C6B" },
        { label: "Aktif Ürün", value: stats?.activeProducts ?? 0, icon: TrendingUp, color: "#D4C5A9" },
    ];

    return (
        <div>
            <div className="mb-8">
                <h2 className="font-cormorant text-3xl text-[#D4C5A9] font-light">Dashboard</h2>
                <p className="font-mono text-[0.7rem] text-[#D4C5A9]/40 tracking-[0.1em] mt-1">
                    Genel bakış ve istatistikler
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card) => (
                    <div
                        key={card.label}
                        className="bg-white/[0.03] border border-[#D4C5A9]/10 p-6 hover:border-[#D4C5A9]/20 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <card.icon size={20} style={{ color: card.color }} className="opacity-60" />
                            <span
                                className="font-cormorant text-3xl font-light"
                                style={{ color: card.color }}
                            >
                                {card.value}
                            </span>
                        </div>
                        <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[#D4C5A9]/40">
                            {card.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Quick actions */}
            <div className="mt-12">
                <h3 className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-[#D4C5A9]/40 mb-4">
                    Hızlı İşlemler
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                        href="/admin/urunler/ekle"
                        className="bg-[#B5622C]/10 border border-[#B5622C]/30 p-5 hover:bg-[#B5622C]/20 transition-colors group"
                    >
                        <span className="font-mono text-[0.75rem] text-[#B5622C] tracking-[0.1em] uppercase group-hover:text-[#D4C5A9] transition-colors">
                            + Yeni Ürün Ekle
                        </span>
                    </Link>
                    <Link
                        href="/admin/urunler"
                        className="bg-white/[0.03] border border-[#D4C5A9]/10 p-5 hover:border-[#D4C5A9]/20 transition-colors group"
                    >
                        <span className="font-mono text-[0.75rem] text-[#D4C5A9]/60 tracking-[0.1em] uppercase group-hover:text-[#D4C5A9] transition-colors">
                            Ürünleri Yönet →
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
