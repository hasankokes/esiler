"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types/product";
import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function ProductModal({ product, onClose }: { product: Product | null, onClose: () => void }) {
    const [selectedColor, setSelectedColor] = useState(0);

    if (!product) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-[#1c2b3a]/80 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal Window */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.4 }}
                    className="bg-cream w-full max-w-[900px] max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 relative z-10"
                >
                    {/* Modal Image */}
                    <div
                        className="min-h-[250px] md:min-h-[400px] flex items-center justify-center sticky top-0 md:static"
                        style={{ background: `linear-gradient(135deg, ${product.colors[1] || '#1C2B3A'}, ${product.colors[0] || '#2A3A4A'})` }}
                    >
                        <button
                            className="absolute top-4 right-4 bg-[#f5f0e8]/10 border-none w-10 h-10 flex items-center justify-center text-cream hover:bg-[#f5f0e8]/20 transition-colors z-20"
                            onClick={onClose}
                        >
                            <X size={20} />
                        </button>
                        {product.images?.[0] ? (
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover relative z-10"
                            />
                        ) : (
                            <svg width="70" height="90" viewBox="0 0 70 90" fill="none" className="opacity-30 relative z-10">
                                <rect x="10" y="10" width="50" height="70" rx="4" stroke="#D4C5A9" strokeWidth="1.5" />
                            </svg>
                        )}
                    </div>

                    {/* Modal Content */}
                    <div className="p-8 md:p-12">
                        <div className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-terra mb-3">
                            {product.catLabel}
                        </div>
                        <h2 className="font-cormorant text-3xl md:text-4xl font-light text-dark mb-6">
                            {product.name}
                        </h2>

                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between pb-2 border-b border-border text-[0.85rem] text-light-text">
                                <span>Kumaş</span><strong className="text-dark font-medium">{product.fabric}</strong>
                            </div>
                            <div className="flex justify-between pb-2 border-b border-border text-[0.85rem] text-light-text">
                                <span>Gramaj</span><strong className="text-dark font-medium">{product.gram}</strong>
                            </div>
                            <div className="flex justify-between pb-2 border-b border-border text-[0.85rem] text-light-text">
                                <span>Beden Aralığı</span><strong className="text-dark font-medium">{product.size}</strong>
                            </div>
                            <div className="flex justify-between pb-2 border-b border-border text-[0.85rem] text-light-text">
                                <span>Minimum Sipariş</span><strong className="text-dark font-medium">{product.minOrder || "1 Düzine (12 Adet)"}</strong>
                            </div>
                        </div>

                        <div className="my-6">
                            <span className="block font-mono text-[0.7rem] tracking-[0.12em] uppercase text-light-text mb-3">
                                Renk Seçenekleri
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {product.colors.map((c, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedColor(i)}
                                        className={`w-7 h-7 rounded-full cursor-pointer border-2 transition-all duration-200 ${selectedColor === i ? 'border-dark scale-110' : 'border-transparent hover:scale-110'
                                            }`}
                                        style={{ background: c }}
                                    />
                                ))}
                            </div>
                        </div>

                        <Link
                            href="#iletisim"
                            onClick={onClose}
                            className="block w-full text-center px-10 py-4 border-[1.5px] border-dark text-dark text-[0.75rem] tracking-[0.15em] uppercase font-medium relative mt-8 overflow-hidden group hover:text-cream transition-colors duration-400"
                        >
                            <span className="relative z-10 transition-colors duration-400 group-hover:text-cream">
                                Toplu Sipariş İçin İletişime Geçin
                            </span>
                            <div className="absolute inset-0 bg-dark -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-400 z-0" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
