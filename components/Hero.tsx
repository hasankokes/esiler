"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Hareketi azaltmayı seçen ziyaretçilerde animasyon durur, kapak karesi görünür
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            videoRef.current?.pause();
        }
    }, []);

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
                    Penye, triko, hırka ve yelek koleksiyonlarımızda altmış yılın
                    birikimini taşıyan modellerle butiklerinize kalite ve çeşitlilik
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

            <div className="relative bg-dark aspect-[4/5] md:aspect-auto md:min-h-full overflow-hidden">
                {/* Remotion ile üretilen marka animasyonu (video/ klasörü) */}
                <video
                    ref={videoRef}
                    src="/esiler-hero.mp4"
                    poster="/esiler-hero-poster.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-label="Eşiler Triko: iplikten örgüye, örgüden işlemeye"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
        </section>
    );
}
