"use client";

import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { PRODUCT_COLORS } from "@/lib/colors";
import { sizedImage } from "@/lib/image";
import { useState } from "react";

export default function ProductCard({ product, onClick }: { product: Product, onClick: () => void }) {
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);

    const getHex = (colorName: string) => PRODUCT_COLORS.find(c => c.name === colorName)?.hex || colorName;
    const color0 = getHex(product.colors[0] || '#F5F0E8');
    const color1 = getHex(product.colors[1] || '#1C2B3A');

    const displayImage = hoveredColor
        ? product.images?.find(img => typeof img !== 'string' && img.color === hoveredColor) || product.images?.[0]
        : product.images?.[0];

    const displayImageUrl = sizedImage(typeof displayImage === 'string' ? displayImage : displayImage?.url, 620, 930);

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            className="cursor-pointer group"
            onClick={onClick}
        >
            <div className="bg-dark aspect-[2/3] relative overflow-hidden mb-3 md:mb-5">
                <div
                    className="w-full h-full flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${color1}22, ${color0})` }}
                >
                    {displayImageUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            src={displayImageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover transition-opacity duration-300"
                        />
                    ) : (
                        <div className="text-center p-8">
                            <div
                                className="font-cormorant text-xl opacity-70 tracking-[0.05em]"
                                style={{ color: color1 }}
                            >
                                {product.catLabel}
                            </div>
                            <div className="font-mono text-[0.6rem] text-[#aaa] mt-2 tracking-[0.15em] uppercase">
                                Fotoğraf Yakında
                            </div>
                        </div>
                    )}
                </div>
                <div className="absolute inset-0 bg-[#1c2b3a]/70 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <button className="px-7 py-3 border border-cream text-cream text-[0.7rem] tracking-[0.15em] uppercase font-sans hover:bg-cream hover:text-dark transition-colors duration-300">
                        Detay Gör
                    </button>
                </div>
            </div>
            <div className="font-mono text-[0.55rem] md:text-[0.6rem] tracking-[0.18em] uppercase text-terra mb-1.5">
                {product.catLabel}
            </div>
            <div className="font-cormorant text-[1.05rem] md:text-[1.25rem] leading-snug text-dark mb-3 line-clamp-2" title={product.name}>
                {product.name}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
                {product.colors.slice(0, 5).map((c, i) => (
                    <div
                        key={i}
                        className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-[1.5px] border-black/10 hover:scale-125 transition-transform cursor-pointer"
                        style={{ background: getHex(c) }}
                        title={c}
                        onMouseEnter={() => setHoveredColor(c)}
                        onMouseLeave={() => setHoveredColor(null)}
                    />
                ))}
                {product.colors.length > 5 && (
                    <span className="text-[0.65rem] text-light-text font-mono ml-1">
                        +{product.colors.length - 5}
                    </span>
                )}
            </div>
        </motion.div>
    );
}
