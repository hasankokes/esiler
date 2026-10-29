"use client";

import { motion } from "framer-motion";
import { Product } from "@/types/product";
import CategoryArt from "@/components/CategoryArt";

const SIZE_ORDER = ["Standart", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

// Kategorideki ürünlerden renk sayısı ve beden aralığını çıkarır
function buildTile(category: { value: string; label: string }, products: Product[]) {
    const items = products.filter(p => p.cat === category.value);
    const sizes = items
        .flatMap(p => (p.size || "").split("–"))
        .map(s => s.trim())
        .filter(s => SIZE_ORDER.includes(s) && s !== "Standart")
        .sort((a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b));
    return {
        value: category.value,
        label: category.label,
        modelCount: items.length,
        colorCount: new Set(items.flatMap(p => p.colors)).size,
        sizeRange: sizes.length ? (sizes[0] === sizes[sizes.length - 1] ? sizes[0] : `${sizes[0]}–${sizes[sizes.length - 1]}`) : "",
    };
}

export default function Categories({ categories, products, onCategoryClick }: {
    categories: { value: string; label: string }[];
    products: Product[];
    onCategoryClick: (cat: string) => void;
}) {
    const tiles = categories
        .map(c => buildTile(c, products))
        .filter(t => t.modelCount > 0);

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
                    visible: { transition: { staggerChildren: 0.08 } },
                    hidden: {}
                }}
                className="grid grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border/20"
            >
                {tiles.map((tile, i) => (
                    <motion.div
                        key={tile.value}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                        }}
                        onClick={() => handleCatClick(tile.value)}
                        className={`relative bg-[#243344] overflow-hidden cursor-pointer h-[220px] md:h-[300px] group ${i === 0 ? 'col-span-2' : ''}`}
                    >
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(212,197,169,0.15) 0px, rgba(212,197,169,0.15) 1px, transparent 1px, transparent 10px)" }} />
                        <div className="absolute inset-x-0 top-0 bottom-16 md:bottom-20 flex items-center justify-center">
                            <CategoryArt
                                value={tile.value}
                                className="h-[78%] md:h-[85%] w-auto overflow-visible group-hover:-translate-y-1 group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 z-[2] text-center">
                            <span className="font-cormorant text-xl md:text-2xl lg:text-3xl font-light text-cream block mb-1 leading-tight">{tile.label}</span>
                            <span className="font-mono text-[0.55rem] md:text-[0.6rem] lg:text-[0.65rem] tracking-[0.12em] md:tracking-[0.15em] text-accent uppercase">
                                {tile.modelCount} Model · {tile.colorCount} Renk
                                {tile.sizeRange && <span className="hidden sm:inline"> · {tile.sizeRange}</span>}
                            </span>
                        </div>
                        <div className="absolute top-4 right-4 md:top-6 md:right-6 w-9 h-9 border border-[#D4C5A9]/30 hidden md:flex items-center justify-center z-[2] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-accent">
                            →
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Özel seriler */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CollectionCard
                    title="Gün Çiçeği Koleksiyonu"
                    onClick={() => handleCatClick('gun-cicegi')}
                    decoration={
                        <>
                            <circle cx="100" cy="100" r="30" />
                            {[...Array(12)].map((_, i) => (
                                <path key={i} d="M100 70 Q105 40 100 10 Q95 40 100 70" transform={`rotate(${i * 30} 100 100)`} />
                            ))}
                        </>
                    }
                >
                    Esiler Triko’nun günlük şıklığı ve Anadolu’nun sıcak dokusunu birleştirdiği koleksiyon.
                    Her parça, makinede özenle işlenen çiçek ve yaprak motifleri ile parlak taş vurgularını taşır;
                    el işçiliği hissini korurken seri üretime uygun, güvenilir kalite sunar.
                </CollectionCard>
                <CollectionCard
                    title="Kış Koleksiyonu"
                    delay={0.3}
                    onClick={() => handleCatClick('kis')}
                    decoration={
                        <>
                            {[...Array(6)].map((_, i) => (
                                <g key={i} transform={`rotate(${i * 60} 100 100)`}>
                                    <path d="M100 100 L100 12" />
                                    <path d="M100 40 L84 26 M100 40 L116 26" />
                                    <path d="M100 66 L88 56 M100 66 L112 56" />
                                </g>
                            ))}
                            <circle cx="100" cy="100" r="10" />
                        </>
                    }
                >
                    Soğuk günlerin sıcak dokusu. Yumuşak ve tok yonca kumaş, yakada ve kolda taşlı çiçek
                    işlemeleri ve klasik burgu örgü görünümüyle; kış boyunca hem sıcak tutan hem şık duran,
                    butiklerin sezon boyu güvenle satabileceği modeller.
                </CollectionCard>
            </div>
        </section>
    );
}

function CollectionCard({ title, delay = 0.2, onClick, decoration, children }: {
    title: string;
    delay?: number;
    onClick: () => void;
    decoration: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay }}
            viewport={{ once: true, margin: "-100px" }}
            onClick={onClick}
            className="relative bg-[#1c2b3a] border border-accent/20 p-8 md:p-12 cursor-pointer group overflow-hidden"
        >
            {/* Background Decoration */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 opacity-5 rotate-12 transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-0">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent stroke-current" strokeWidth="2">
                    {decoration}
                </svg>
            </div>

            <div className="relative z-[2] max-w-[800px] h-full flex flex-col">
                <div className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-accent mb-4 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-accent"></span>
                    Özel Seri
                </div>
                <h3 className="font-cormorant text-3xl md:text-5xl font-light text-cream mb-6">
                    {title}
                </h3>
                <p className="text-[0.9rem] md:text-lg text-cream/70 font-light leading-relaxed mb-8">
                    {children}
                </p>
                <div className="mt-auto self-start inline-flex items-center gap-3 text-accent text-[0.8rem] tracking-widest uppercase border-b border-accent/30 pb-2 group-hover:gap-5 transition-all">
                    Koleksiyonu İncele <span>→</span>
                </div>
            </div>
        </motion.div>
    );
}
