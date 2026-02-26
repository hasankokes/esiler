"use client";

import { motion } from "framer-motion";

export default function Categories({ onCategoryClick }: { onCategoryClick: (cat: string) => void }) {
    const scrollProducts = () => {
        document.getElementById("urunler")?.scrollIntoView({ behavior: "smooth" });
    };

    const handleCatClick = (cat: string) => {
        onCategoryClick(cat);
        scrollProducts();
    };

    return (
        <section id="kategoriler" className="bg-dark text-cream py-24 px-6 md:px-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6"
            >
                <div>
                    <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-accent flex items-center gap-4 mb-6
            before:content-[''] before:w-10 before:h-[1px] before:bg-accent before:inline-block">
                        Koleksiyonlarımız
                    </div>
                    <h2 className="font-cormorant text-4xl md:text-[4rem] font-light text-cream leading-[1.15]">
                        Her Bedene,<br />Her Tarza Uygun
                    </h2>
                </div>
                <button
                    onClick={() => handleCatClick('all')}
                    className="text-[0.75rem] tracking-[0.12em] uppercase text-accent no-underline border-b border-accent pb-[2px] hover:opacity-60 transition-opacity"
                >
                    Tüm Ürünleri Gör →
                </button>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                    hidden: {}
                }}
                className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-border/20"
            >
                {/* Penye */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                    onClick={() => handleCatClick('penye')}
                    className="relative bg-[#243344] overflow-hidden cursor-pointer aspect-[3/4] group
            before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-[#1c2b3a]/90 before:to-transparent before:z-[1] hover:before:opacity-50 before:transition-opacity before:duration-400"
                >
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2a3f52] to-[#1a2d3e] group-hover:scale-105 transition-transform duration-700 ease-out">
                        <svg width="60" height="80" viewBox="0 0 60 80" fill="none" className="opacity-40">
                            <path d="M10 20 L5 10 L20 5 L30 15 L40 5 L55 10 L50 20 L45 20 L45 75 L15 75 L15 20Z" stroke="#D4C5A9" strokeWidth="1.5" fill="none" />
                            <path d="M5 10 Q3 25 8 40" stroke="#D4C5A9" strokeWidth="1" fill="none" />
                            <path d="M55 10 Q57 25 52 40" stroke="#D4C5A9" strokeWidth="1" fill="none" />
                        </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-[2]">
                        <span className="font-cormorant text-2xl md:text-3xl font-light text-cream block mb-2">Penye</span>
                        <span className="font-mono text-[0.65rem] tracking-[0.15em] text-accent">10 Renk Seçeneği</span>
                    </div>
                    <div className="absolute top-6 right-6 w-9 h-9 border border-[#D4C5A9]/30 flex items-center justify-center z-[2] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-accent">
                        →
                    </div>
                </motion.div>

                {/* Büyük Beden */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                    onClick={() => handleCatClick('buyuk')}
                    className="relative bg-[#243344] overflow-hidden cursor-pointer aspect-[3/4] group
            before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-[#1c2b3a]/90 before:to-transparent before:z-[1] hover:before:opacity-50 before:transition-opacity before:duration-400"
                >
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#3a3040] to-[#2a2035] group-hover:scale-105 transition-transform duration-700 ease-out">
                        <svg width="70" height="80" viewBox="0 0 70 80" fill="none" className="opacity-40">
                            <path d="M10 20 L3 10 L20 5 L35 18 L50 5 L67 10 L60 20 L55 20 L55 75 L15 75 L15 20Z" stroke="#D4C5A9" strokeWidth="1.5" fill="none" />
                            <circle cx="35" cy="47" r="12" stroke="#D4C5A9" strokeWidth="1" fill="none" />
                        </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-[2]">
                        <span className="font-cormorant text-2xl md:text-3xl font-light text-cream block mb-2 leading-tight">Penye<br />Büyük Beden</span>
                        <span className="font-mono text-[0.65rem] tracking-[0.15em] text-accent">2XL — 6XL · 10 Renk</span>
                    </div>
                    <div className="absolute top-6 right-6 w-9 h-9 border border-[#D4C5A9]/30 flex items-center justify-center z-[2] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-accent">
                        →
                    </div>
                </motion.div>

                {/* Hırka */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                    onClick={() => handleCatClick('hirka')}
                    className="relative bg-[#243344] overflow-hidden cursor-pointer aspect-[3/4] group
            before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-[#1c2b3a]/90 before:to-transparent before:z-[1] hover:before:opacity-50 before:transition-opacity before:duration-400"
                >
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#3d3530] to-[#2d2520] group-hover:scale-105 transition-transform duration-700 ease-out">
                        <svg width="65" height="80" viewBox="0 0 65 80" fill="none" className="opacity-40">
                            <path d="M5 10 L15 5 L32 20 L50 5 L60 10 L55 25 L45 20 L45 75 L20 75 L20 20 L10 25Z" stroke="#D4C5A9" strokeWidth="1.5" fill="none" />
                            <path d="M32 20 L32 75" stroke="#D4C5A9" strokeWidth="1" strokeDasharray="3,3" />
                            <path d="M28 35 L36 35 M28 42 L36 42 M28 49 L36 49" stroke="#D4C5A9" strokeWidth="1" />
                        </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-[2]">
                        <span className="font-cormorant text-2xl md:text-3xl font-light text-cream block mb-2 leading-tight">Hırka &<br />Yelek</span>
                        <span className="font-mono text-[0.65rem] tracking-[0.15em] text-accent">7 Renk · Sezonluk</span>
                    </div>
                    <div className="absolute top-6 right-6 w-9 h-9 border border-[#D4C5A9]/30 flex items-center justify-center z-[2] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-accent">
                        →
                    </div>
                </motion.div>

                {/* Badi */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                    onClick={() => handleCatClick('badi')}
                    className="relative bg-[#243344] overflow-hidden cursor-pointer aspect-[3/4] group
            before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-[#1c2b3a]/90 before:to-transparent before:z-[1] hover:before:opacity-50 before:transition-opacity before:duration-400"
                >
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2e3d35] to-[#1e2d25] group-hover:scale-105 transition-transform duration-700 ease-out">
                        <svg width="55" height="80" viewBox="0 0 55 80" fill="none" className="opacity-40">
                            <path d="M15 10 Q5 10 5 20 L5 75 L50 75 L50 20 Q50 10 40 10 L37 10 Q35 18 27 18 Q19 18 18 10Z" stroke="#D4C5A9" strokeWidth="1.5" fill="none" />
                            <path d="M18 10 Q20 5 27 5 Q34 5 37 10" stroke="#D4C5A9" strokeWidth="1" fill="none" />
                        </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-[2]">
                        <span className="font-cormorant text-2xl md:text-3xl font-light text-cream block mb-2">Badi</span>
                        <span className="font-mono text-[0.65rem] tracking-[0.15em] text-accent">6 Renk Seçeneği</span>
                    </div>
                    <div className="absolute top-6 right-6 w-9 h-9 border border-[#D4C5A9]/30 flex items-center justify-center z-[2] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-accent">
                        →
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
