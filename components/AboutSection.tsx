"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutSection() {
    return (
        <section id="hakkimizda" className="bg-[#EDE8DF] py-24 px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-terra flex items-center gap-4 mb-6
          before:content-[''] before:w-10 before:h-[1px] before:bg-terra before:inline-block">
                    Biz Kimiz
                </div>
                <div className="font-cormorant italic text-[6rem] md:text-[8rem] lg:text-[10rem] font-light text-[#1c2b3a]/5 leading-none -mb-8 -ml-2 select-none relative z-0">
                    1964
                </div>
                <h2 className="font-cormorant text-4xl md:text-5xl font-light text-dark leading-[1.15] relative z-10 mb-8">
                    Altmış Yıllık<br />Bir Aile Mirası
                </h2>
                <p className="text-[1rem] leading-[1.9] text-text mb-12">
                    İstanbul&apos;un tekstil kalbinde, <span className="italic">1964</span> yılında kurulan Eşiler Triko; penye ve
                    triko üretiminde altmış yılı aşkın deneyimiyle Türkiye&apos;nin en köklü toptan
                    giyim firmalarından biri olarak hizmet vermektedir.
                    <br /><br />
                    Butiklerden zincir mağazalara, küçük atölyelerden büyük perakendecilere
                    kadar yüzlerce müşterimize kalite, güvenilirlik ve çeşitlilik sunuyoruz.
                    Geleneksel üretim anlayışını modern zamanların ihtiyaçlarıyla harmanlayan
                    yaklaşımımız, bizi tercih sebebi kılıyor.
                </p>

                <Link
                    href="#iletisim"
                    className="inline-block px-10 py-4 border-[1.5px] border-dark text-dark text-[0.75rem] tracking-[0.15em] uppercase font-medium relative overflow-hidden group hover:text-cream transition-colors duration-400"
                >
                    <span className="relative z-10 transition-colors duration-400 group-hover:text-cream">
                        Bizimle Çalışın
                    </span>
                    <div className="absolute inset-0 bg-dark -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-400 z-0" />
                </Link>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    visible: { transition: { staggerChildren: 0.15 } },
                    hidden: {}
                }}
                className="grid grid-cols-2 gap-4 md:gap-8"
            >
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                    className="p-4 md:p-8 border-t-2 border-dark"
                >
                    <span className="text-xl md:text-2xl block mb-2 md:mb-4">◈</span>
                    <h3 className="font-cormorant text-[1.1rem] md:text-[1.3rem] text-dark mb-1 md:mb-2">Kalite</h3>
                    <p className="text-[0.75rem] md:text-[0.85rem] text-light-text leading-[1.5] md:leading-[1.7]">
                        Seçilmiş kumaşlar, titiz işçilik. Her ürün aynı standartta.
                    </p>
                </motion.div>

                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                    className="p-4 md:p-8 border-t-2 border-dark"
                >
                    <span className="text-xl md:text-2xl block mb-2 md:mb-4">◉</span>
                    <h3 className="font-cormorant text-[1.1rem] md:text-[1.3rem] text-dark mb-1 md:mb-2">Güvenilirlik</h3>
                    <p className="text-[0.75rem] md:text-[0.85rem] text-light-text leading-[1.5] md:leading-[1.7]">
                        60 yıldır aynı dürüstlük. Söz verdiğimizi teslim ederiz.
                    </p>
                </motion.div>

                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                    className="p-4 md:p-8 border-t-2 border-dark"
                >
                    <span className="text-xl md:text-2xl block mb-2 md:mb-4">◎</span>
                    <h3 className="font-cormorant text-[1.1rem] md:text-[1.3rem] text-dark mb-1 md:mb-2">Çeşitlilik</h3>
                    <p className="text-[0.75rem] md:text-[0.85rem] text-light-text leading-[1.5] md:leading-[1.7]">
                        Her bedene, her tarza uygun geniş renk yelpazesi.
                    </p>
                </motion.div>

                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                    className="p-4 md:p-8 border-t-2 border-dark"
                >
                    <span className="text-xl md:text-2xl block mb-2 md:mb-4">○</span>
                    <h3 className="font-cormorant text-[1.1rem] md:text-[1.3rem] text-dark mb-1 md:mb-2">Köklülük</h3>
                    <p className="text-[0.75rem] md:text-[0.85rem] text-light-text leading-[1.5] md:leading-[1.7]">
                        Aile şirketi geleneğiyle süregelen birikimin gücü.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}
