"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, FolderOpen } from "lucide-react";

type Category = {
    id: number;
    value: string;
    label: string;
    description?: string;
};

export default function AdminCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showAdd, setShowAdd] = useState(false);
    const [form, setForm] = useState({ label: "", value: "", description: "" });

    const fetchCategories = async () => {
        const res = await fetch("/api/categories");
        if (res.ok) setCategories(await res.json());
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const resetForm = () => {
        setForm({ label: "", value: "", description: "" });
        setEditingId(null);
        setShowAdd(false);
    };

    const handleSave = async () => {
        if (!form.label.trim()) return;

        const method = editingId ? "PUT" : "POST";
        const body = editingId ? { ...form, id: editingId } : form;

        const res = await fetch("/api/categories", {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (res.ok) {
            resetForm();
            fetchCategories();
        }
    };

    const handleEdit = (cat: Category) => {
        setForm({ label: cat.label, value: cat.value, description: cat.description || "" });
        setEditingId(cat.id);
        setShowAdd(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return;
        const res = await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
        if (res.ok) setCategories((prev) => prev.filter((c) => c.id !== id));
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
                    <h2 className="font-cormorant text-3xl text-[#D4C5A9] font-light">Kategoriler</h2>
                    <p className="font-mono text-[0.7rem] text-[#D4C5A9]/40 tracking-[0.1em] mt-1">
                        {categories.length} kategori kayıtlı
                    </p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowAdd(true); }}
                    className="flex items-center gap-2 bg-[#B5622C] text-white px-5 py-2.5 text-[0.75rem] tracking-[0.1em] uppercase hover:bg-[#9a5325] transition-colors"
                >
                    <Plus size={16} />
                    Yeni Kategori
                </button>
            </div>

            {/* Add/Edit form */}
            {showAdd && (
                <div className="bg-white/[0.03] border border-[#D4C5A9]/10 p-6 mb-8">
                    <h3 className="font-mono text-[0.75rem] tracking-[0.15em] uppercase text-[#D4C5A9]/60 mb-4">
                        {editingId ? "Kategori Düzenle" : "Yeni Kategori"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block font-mono text-[0.6rem] tracking-[0.1em] uppercase text-[#D4C5A9]/40 mb-1.5">
                                Kategori Adı *
                            </label>
                            <input
                                type="text"
                                value={form.label}
                                onChange={(e) => {
                                    const label = e.target.value;
                                    const value = label
                                        .toLowerCase()
                                        .replace(/ı/g, "i")
                                        .replace(/ö/g, "o")
                                        .replace(/ü/g, "u")
                                        .replace(/ş/g, "s")
                                        .replace(/ç/g, "c")
                                        .replace(/ğ/g, "g")
                                        .replace(/[^a-z0-9]/g, "");
                                    setForm((prev) => ({ ...prev, label, value: editingId ? prev.value : value }));
                                }}
                                className="w-full bg-white/5 border border-[#D4C5A9]/20 px-3 py-2.5 text-[0.85rem] text-[#D4C5A9] focus:outline-none focus:border-[#B5622C] transition-colors"
                                placeholder="Kategori adı"
                            />
                        </div>
                        <div>
                            <label className="block font-mono text-[0.6rem] tracking-[0.1em] uppercase text-[#D4C5A9]/40 mb-1.5">
                                Anahtar (slug)
                            </label>
                            <input
                                type="text"
                                value={form.value}
                                onChange={(e) => setForm((prev) => ({ ...prev, value: e.target.value }))}
                                className="w-full bg-white/5 border border-[#D4C5A9]/20 px-3 py-2.5 text-[0.85rem] text-[#D4C5A9] font-mono focus:outline-none focus:border-[#B5622C] transition-colors"
                                placeholder="kategori-slug"
                                readOnly={!!editingId}
                            />
                        </div>
                        <div>
                            <label className="block font-mono text-[0.6rem] tracking-[0.1em] uppercase text-[#D4C5A9]/40 mb-1.5">
                                Açıklama
                            </label>
                            <input
                                type="text"
                                value={form.description}
                                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                                className="w-full bg-white/5 border border-[#D4C5A9]/20 px-3 py-2.5 text-[0.85rem] text-[#D4C5A9] focus:outline-none focus:border-[#B5622C] transition-colors"
                                placeholder="Kısa açıklama"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="bg-[#B5622C] text-white px-6 py-2 text-[0.7rem] tracking-[0.1em] uppercase hover:bg-[#9a5325] transition-colors"
                        >
                            {editingId ? "Güncelle" : "Ekle"}
                        </button>
                        <button
                            onClick={resetForm}
                            className="border border-[#D4C5A9]/20 text-[#D4C5A9]/60 px-6 py-2 text-[0.7rem] tracking-[0.1em] uppercase hover:border-[#D4C5A9]/40 transition-colors"
                        >
                            İptal
                        </button>
                    </div>
                </div>
            )}

            {/* Category list */}
            {categories.length === 0 ? (
                <div className="bg-white/[0.03] border border-[#D4C5A9]/10 p-12 text-center">
                    <FolderOpen size={40} className="text-[#D4C5A9]/20 mx-auto mb-4" />
                    <p className="font-mono text-[0.8rem] text-[#D4C5A9]/40">Henüz kategori eklenmemiş</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-[#D4C5A9]/10">
                                <th className="text-left font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[#D4C5A9]/40 pb-3 pr-4">
                                    Kategori
                                </th>
                                <th className="text-left font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[#D4C5A9]/40 pb-3 pr-4">
                                    Anahtar
                                </th>
                                <th className="text-left font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[#D4C5A9]/40 pb-3 pr-4">
                                    Açıklama
                                </th>
                                <th className="text-right font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[#D4C5A9]/40 pb-3">
                                    İşlemler
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat) => (
                                <tr
                                    key={cat.id}
                                    className="border-b border-[#D4C5A9]/5 hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="py-4 pr-4 text-[0.85rem] text-[#D4C5A9]">{cat.label}</td>
                                    <td className="py-4 pr-4">
                                        <span className="font-mono text-[0.7rem] text-[#B5622C] tracking-[0.1em]">
                                            {cat.value}
                                        </span>
                                    </td>
                                    <td className="py-4 pr-4 text-[0.8rem] text-[#D4C5A9]/50">{cat.description || "—"}</td>
                                    <td className="py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(cat)}
                                                className="p-2 text-[#D4C5A9]/40 hover:text-[#D4C5A9] hover:bg-white/5 transition-colors rounded"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(cat.id)}
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
