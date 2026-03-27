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
                className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border/20"
            >
                {/* Penye */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                    onClick={() => handleCatClick('penye')}
                    className="relative bg-[#243344] overflow-hidden cursor-pointer aspect-[3/2] group
            before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-[#1c2b3a]/90 before:to-transparent before:z-[1] hover:before:opacity-50 before:transition-opacity before:duration-400"
                >
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2a3f52] to-[#1a2d3e] group-hover:scale-105 transition-transform duration-700 ease-out">
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 lg:p-8 z-[2]">
                        <span className="font-cormorant text-xl md:text-2xl lg:text-3xl font-light text-cream block mb-1">Penye</span>
                        <span className="font-mono text-[0.55rem] md:text-[0.6rem] lg:text-[0.65rem] tracking-[0.15em] text-accent whitespace-nowrap uppercase">10 Renk · M-L-XL</span>
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
                    className="relative bg-[#243344] overflow-hidden cursor-pointer aspect-[3/2] group
            before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-[#1c2b3a]/90 before:to-transparent before:z-[1] hover:before:opacity-50 before:transition-opacity before:duration-400"
                >
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#3a3040] to-[#2a2035] group-hover:scale-105 transition-transform duration-700 ease-out">
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 lg:p-8 z-[2]">
                        <span className="font-cormorant text-xl md:text-2xl lg:text-3xl font-light text-cream block mb-1 leading-tight">Büyük Beden</span>
                        <span className="font-mono text-[0.55rem] md:text-[0.6rem] lg:text-[0.65rem] tracking-[0.1em] sm:tracking-[0.15em] text-accent whitespace-nowrap uppercase">10 Renk · 2XL-4XL</span>
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
                    className="relative bg-[#243344] overflow-hidden cursor-pointer aspect-[3/2] group
            before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-[#1c2b3a]/90 before:to-transparent before:z-[1] hover:before:opacity-50 before:transition-opacity before:duration-400"
                >
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#3d3530] to-[#2d2520] group-hover:scale-105 transition-transform duration-700 ease-out">
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 lg:p-8 z-[2]">
                        <span className="font-cormorant text-lg md:text-xl lg:text-2xl font-light text-cream block mb-1 leading-tight whitespace-nowrap">Hırka & Yelek</span>
                        <span className="font-mono text-[0.55rem] md:text-[0.6rem] lg:text-[0.65rem] tracking-[0.15em] text-accent whitespace-nowrap uppercase">8 Renk · 1-2-3-4</span>
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
                    className="relative bg-[#243344] overflow-hidden cursor-pointer aspect-[3/2] group
            before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-[#1c2b3a]/90 before:to-transparent before:z-[1] hover:before:opacity-50 before:transition-opacity before:duration-400"
                >
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2e3d35] to-[#1e2d25] group-hover:scale-105 transition-transform duration-700 ease-out">
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 lg:p-8 z-[2]">
                        <span className="font-cormorant text-xl md:text-2xl lg:text-3xl font-light text-cream block mb-1">Badi</span>
                        <span className="font-mono text-[0.55rem] md:text-[0.6rem] lg:text-[0.65rem] tracking-[0.1em] sm:tracking-[0.15em] text-accent whitespace-nowrap uppercase">6 Renk · S-M-L-XL</span>
                    </div>
                    <div className="absolute top-6 right-6 w-9 h-9 border border-[#D4C5A9]/30 flex items-center justify-center z-[2] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-accent">
                        →
                    </div>
                </motion.div>
            </motion.div>
            
            {/* Gün Çiçeği Koleksiyonu - Special Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                onClick={() => handleCatClick('gun-cicegi')}
                className="mt-12 relative bg-[#1c2b3a] border border-accent/20 p-8 md:p-12 cursor-pointer group overflow-hidden"
            >
                {/* Background Decoration */}
                <div className="absolute -right-20 -bottom-20 w-64 h-64 opacity-5 rotate-12 transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-0">
                   <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent stroke-current" strokeWidth="2">
                        <circle cx="100" cy="100" r="30" />
                        {[...Array(12)].map((_, i) => (
                            <path key={i} d="M100 70 Q105 40 100 10 Q95 40 100 70" transform={`rotate(${i * 30} 100 100)`} />
                        ))}
                   </svg>
                </div>

                <div className="relative z-[2] max-w-[800px]">
                    <div className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-accent mb-4 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-accent"></span>
                        Özel Seri
                    </div>
                    <h3 className="font-cormorant text-3xl md:text-5xl font-light text-cream mb-6">
                        Gün Çiçeği Koleksiyonu
                    </h3>
                    <p className="text-[0.9rem] md:text-lg text-cream/70 font-light leading-relaxed mb-8">
                        Esiler Triko’nun günlük şıklığı ve Anadolu’nun sıcak dokusunu birleştirdiği koleksiyon. 
                        Her parça, makinede özenle işlenen çiçek ve yaprak motifleri ile parlak taş vurgularını taşır; 
                        el işçiliği hissini korurken seri üretime uygun, güvenilir kalite sunar.
                    </p>
                    <div className="inline-flex items-center gap-3 text-accent text-[0.8rem] tracking-widest uppercase border-b border-accent/30 pb-2 group-hover:gap-5 transition-all">
                        Koleksiyonu İncele <span>→</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
