"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function CountUp({ target, duration = 1.5 }: { target: number; duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = target;
            const stepTime = Math.abs(Math.floor((duration * 1000) / end));

            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === end) clearInterval(timer);
            }, stepTime);

            return () => clearInterval(timer);
        }
    }, [isInView, target, duration]);

    return <span ref={ref}>{count}{target >= 100 ? '+' : ''}</span>;
}

export default function StatsBar() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="border-y border-border py-8 px-6 md:px-24 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
            <div className="text-center">
                <span className="font-cormorant text-4xl md:text-[2.5rem] font-light text-dark block">
                    <CountUp target={60} />
                </span>
                <span className="text-[0.7rem] tracking-[0.15em] uppercase text-light-text font-mono">
                    Yıllık Deneyim
                </span>
            </div>
            <div className="text-center">
                <span className="font-cormorant text-4xl md:text-[2.5rem] font-light text-dark block">
                    <CountUp target={4} duration={0.5} />
                </span>
                <span className="text-[0.7rem] tracking-[0.15em] uppercase text-light-text font-mono">
                    Ana Kategori
                </span>
            </div>
            <div className="text-center">
                <span className="font-cormorant text-4xl md:text-[2.5rem] font-light text-dark block">
                    <CountUp target={30} />
                </span>
                <span className="text-[0.7rem] tracking-[0.15em] uppercase text-light-text font-mono">
                    Renk Seçeneği
                </span>
            </div>
            <div className="text-center">
                <span className="font-cormorant text-4xl md:text-[2.5rem] font-light text-dark block">
                    <CountUp target={500} />
                </span>
                <span className="text-[0.7rem] tracking-[0.15em] uppercase text-light-text font-mono">
                    Güvenilen Müşteri
                </span>
            </div>
        </motion.div>
    );
}
