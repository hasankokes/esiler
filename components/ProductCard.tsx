"use client";

import { motion } from "framer-motion";
import { Product } from "@/types/product";

export default function ProductCard({ product, onClick }: { product: Product, onClick: () => void }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            className="cursor-pointer group"
            onClick={onClick}
        >
            <div className="bg-dark aspect-[3/4] relative overflow-hidden mb-5">
                <div
                    className="w-full h-full flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${product.colors[1] || '#1C2B3A'}22, ${product.colors[0] || '#F5F0E8'})` }}
                >
                    {product.images?.[0] ? (
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-center p-8">
                            <div
                                className="font-cormorant text-xl opacity-70 tracking-[0.05em]"
                                style={{ color: product.colors[1] || '#1C2B3A' }}
                            >
                                {product.catLabel}
                            </div>
                            <div className="font-mono text-[0.6rem] text-[#aaa] mt-2 tracking-[0.15em] uppercase">
                                Fotoğraf Yakında
                            </div>
                        </div>
                    )}
                </div>
                <div className="absolute inset-0 bg-[#1c2b3a]/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <button className="px-7 py-3 border border-cream text-cream text-[0.7rem] tracking-[0.15em] uppercase font-sans hover:bg-cream hover:text-dark transition-colors duration-300">
                        Detay Gör
                    </button>
                </div>
            </div>
            <div className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-terra mb-1.5">
                {product.catLabel}
            </div>
            <div className="font-cormorant text-[1.3rem] text-dark mb-3">
                {product.name}
            </div>
            <div className="flex items-center gap-1.5">
                {product.colors.slice(0, 6).map((c, i) => (
                    <div
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border-[1.5px] border-black/10 hover:scale-125 transition-transform cursor-pointer"
                        style={{ background: c }}
                        title={c}
                    />
                ))}
                {product.colors.length > 6 && (
                    <span className="text-[0.65rem] text-light-text font-mono ml-2">
                        +{product.colors.length - 6}
                    </span>
                )}
            </div>
        </motion.div>
    );
}
