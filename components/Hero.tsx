"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
    return (
        <section
            id="hero"
            className="min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden"
        >
            <div className="flex flex-col justify-center px-6 md:pl-24 md:pr-12 pt-32 pb-16 md:py-16 md:pt-32 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="font-mono text-[0.7rem] tracking-[0.2em] text-terra uppercase mb-6"
                >
                    ✦ İstanbul · Türkiye · Est. <span className="italic">1964</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.7 }}
                    className="font-cormorant text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.1] text-dark mb-8"
                >
                    <span className="italic">1964</span>&apos;ten Beri<br />
                    <em className="italic text-terra whitespace-nowrap">Türk Dokusunun</em><br />
                    Güvenilir Sesi
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="text-[0.95rem] text-light-text leading-[1.8] max-w-[400px] mb-12"
                >
                    Penye, hırka, yelek ve badi kategorilerinde altmış yılın birikimini
                    taşıyan koleksiyonlarımızla butiklerinize kalite ve çeşitlilik
                    sunuyoruz.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                >
                    <Link
                        href="#kategoriler"
                        className="inline-block px-10 py-4 border-[1.5px] border-dark text-dark text-[0.75rem] tracking-[0.15em] uppercase font-medium relative overflow-hidden group hover:text-cream transition-colors duration-400"
                    >
                        <span className="relative z-10 transition-colors duration-400 group-hover:text-cream">
                            Koleksiyonu Keşfet
                        </span>
                        <div className="absolute inset-0 bg-dark -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-400 z-0" />
                    </Link>
                </motion.div>
            </div>

            <div className="relative bg-dark min-h-[350px] md:min-h-full overflow-hidden flex items-center justify-center">
                {/* Fabric pattern overlay */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(212,197,169,0.15) 0px, rgba(212,197,169,0.15) 1px, transparent 1px, transparent 10px)" }}></div>

                <div className="font-cormorant italic text-[8rem] md:text-[16rem] font-light text-[#D4C5A9]/[0.05] absolute -bottom-8 md:-bottom-12 -right-4 md:-right-8 leading-none select-none pointer-events-none z-0">
                    1964
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 1.3 }}
                    className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-4"
                >
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="opacity-30">
                        <rect x="20" y="10" width="40" height="60" rx="4" stroke="#D4C5A9" strokeWidth="1.5" />
                        <path d="M20 30 Q40 20 60 30" stroke="#D4C5A9" strokeWidth="1.5" fill="none" />
                        <circle cx="40" cy="55" r="8" stroke="#D4C5A9" strokeWidth="1.5" />
                    </svg>
                    <span className="font-cormorant text-[#D4C5A9]/50 text-[0.85rem] tracking-[0.1em]">
                        Koleksiyon 2024–25
                    </span>
                    <div className="flex gap-1.5 justify-center flex-wrap mt-2">
                        {['#F5F0E8', '#1C2B3A', '#7A8B9A', '#B5622C', '#8B6A52', '#4A5D4A', '#8B3A3A'].map((c, i) => (
                            <div
                                key={i}
                                className="w-[18px] h-[18px] rounded-full border-[2px] border-white/20 cursor-pointer hover:scale-125 transition-transform"
                                style={{ background: c }}
                            ></div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
