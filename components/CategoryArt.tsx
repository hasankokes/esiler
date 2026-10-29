"use client";

import { motion, type Variants } from "framer-motion";

// Kategori kutuları için çizgi grafikler. Ana sayfadaki animasyonla aynı dil:
// krem iplik çizgisi kıyafetin hatlarını çizer, terracotta detaylar (işleme, düğme,
// örgü, mezura) kategoriyi anlatır.

const ACCENT = "#D4C5A9";
const TERRA = "#B5622C";
const CREAM = "#F5F0E8";

type Line = { d: string; color?: string; width?: number; fill?: string };

const EASE_DRAW = [0.65, 0, 0.35, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const draw = (delay: number, duration = 1.4): Variants => ({
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: { delay, duration, ease: EASE_DRAW },
            opacity: { delay, duration: 0.01 },
        },
    },
});

const pop = (delay: number): Variants => ({
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { delay, duration: 0.4, ease: EASE_OUT } },
});

type Dot = { x: number; y: number; r?: number; color?: string };

// Kadın kesimi uzun kollu üst: belde içe giren, etekte hafif açılan, yuvarlak etekli.
// bw: koltuk altının merkezden uzaklığı, waistIn: belin ne kadar daraldığı,
// hemOut: eteğin ne kadar açıldığı, nx: yakanın omuzla birleştiği nokta
const womanTop = ({ bw, waistIn = 6, hemOut = 2, nx = 80 }: { bw: number; waistIn?: number; hemOut?: number; nx?: number }) => {
    const a = 100 - bw;
    const A = 100 + bw;
    const w = a + waistIn;
    const W = A - waistIn;
    const h = a - hemOut;
    const H = A + hemOut;
    return [
        `M ${nx} 40 L ${a - 3} 47 C ${a - 13} 68 ${a - 19} 108 ${a - 23} 148 L ${a - 11} 151`,
        `C ${a - 8} 124 ${a - 4} 100 ${a} 84 C ${a + 3} 98 ${w} 108 ${w} 120 C ${w} 136 ${h} 148 ${h} 162`,
        `Q 100 172 ${H} 162 C ${H} 148 ${W} 136 ${W} 120 C ${W} 108 ${A - 3} 98 ${A} 84`,
        `C ${A + 4} 100 ${A + 8} 124 ${A + 11} 151 L ${A + 23} 148 C ${A + 19} 108 ${A + 13} 68 ${A + 3} 47 L ${200 - nx} 40`,
    ].join(" ");
};

const cuffs = (bw: number): Line[] => {
    const a = 100 - bw;
    const A = 100 + bw;
    return [
        { d: `M ${a - 22} 142 L ${a - 10} 145`, width: 1.1 },
        { d: `M ${A + 10} 145 L ${A + 22} 142`, width: 1.1 },
    ];
};

// İşleme çiçeği: beş yapraklı, terracotta
const flower = (x: number, y: number, size: number): Line[] =>
    [0, 72, 144, 216, 288].map((a) => {
        const rad = ((a - 90) * Math.PI) / 180;
        const tx = x + Math.cos(rad) * size;
        const ty = y + Math.sin(rad) * size;
        const nx = -Math.sin(rad) * size * 0.34;
        const ny = Math.cos(rad) * size * 0.34;
        const mx = x + Math.cos(rad) * size * 0.5;
        const my = y + Math.sin(rad) * size * 0.5;
        return { d: `M ${x} ${y} Q ${mx + nx} ${my + ny} ${tx} ${ty} Q ${mx - nx} ${my - ny} ${x} ${y} Z`, color: TERRA, width: 1.1 };
    });

// Yuvarlak yakanın hemen altına dizilen taşlı çiçek girlandı
const NECK = { x0: 80, y0: 40, cx: 100, cy: 64, x1: 120, y1: 40 };
const onNeck = (t: number, offset: number) => {
    const x = (1 - t) ** 2 * NECK.x0 + 2 * (1 - t) * t * NECK.cx + t ** 2 * NECK.x1;
    const y = (1 - t) ** 2 * NECK.y0 + 2 * (1 - t) * t * NECK.cy + t ** 2 * NECK.y1;
    return { x, y: y + offset };
};
const garlandPoints = [0.08, 0.27, 0.5, 0.73, 0.92].map((t, i) => ({ ...onNeck(t, 8), size: i === 2 ? 6 : i % 2 ? 4.5 : 4 }));
const garlandLeaves = [0.17, 0.38, 0.62, 0.83].map((t) => {
    const p = onNeck(t, 9);
    return { d: `M ${p.x - 3} ${p.y} Q ${p.x} ${p.y + 4} ${p.x + 3} ${p.y} Q ${p.x} ${p.y - 3} ${p.x - 3} ${p.y} Z`, color: TERRA, width: 1 };
});

const ART: Record<string, { lines: Line[]; details: Line[]; dots?: Dot[] }> = {
    penye: {
        lines: [
            { d: womanTop({ bw: 34 }) },
            { d: "M 80 40 Q 100 64 120 40" },
            { d: "M 84 40 Q 100 57 116 40", width: 1.1 },
            ...cuffs(34),
        ],
        details: [
            // Yaka boyunca işleme dalı
            { d: "M 79 47 Q 100 76 121 47", color: TERRA, width: 1 },
            ...garlandLeaves,
            ...garlandPoints.flatMap((p) => flower(p.x, p.y, p.size)),
        ],
        dots: garlandPoints.map((p) => ({ x: p.x, y: p.y, r: p.size > 5 ? 1.6 : 1.2, color: CREAM })),
    },
    buyuk: {
        lines: [
            { d: womanTop({ bw: 42, waistIn: 4, hemOut: 3 }) },
            { d: "M 80 40 Q 100 64 120 40" },
            { d: "M 84 40 Q 100 57 116 40", width: 1.1 },
            ...cuffs(42),
        ],
        details: [
            // Belde mezura
            { d: "M 62 116 Q 100 128 138 116", color: TERRA, width: 1.3 },
            { d: "M 62 123 Q 100 135 138 123", color: TERRA, width: 1.3 },
            ...Array.from({ length: 9 }, (_, i) => {
                const x = 67 + i * 8.25;
                const t = (x - 62) / 76;
                const y = 116 + 4 * t * (1 - t) * 6;
                return { d: `M ${x} ${y + 1} L ${x} ${y + (i % 2 === 0 ? 5.5 : 3.5)}`, color: TERRA, width: 0.9 };
            }),
        ],
    },
    hirka: {
        lines: [
            // Uzun kollu, derin V yaka, önü düğmeli kadın hırkası
            { d: womanTop({ bw: 35, waistIn: 6, hemOut: 3, nx: 84 }) },
            { d: "M 84 40 L 100 106 L 116 40" },
            { d: "M 89 40 L 100 92 L 111 40", width: 1.1 },
            { d: "M 100 106 L 100 167" },
            ...cuffs(35),
        ],
        details: [
            // Belde ince kuşak
            { d: "M 71 122 Q 100 128 129 122", color: TERRA, width: 1.2 },
            { d: "M 100 125 Q 92 134 88 146", color: TERRA, width: 1.1 },
            { d: "M 100 125 Q 106 136 108 148", color: TERRA, width: 1.1 },
        ],
        dots: [
            { x: 103.5, y: 112, r: 1.8, color: TERRA },
            { x: 103.5, y: 140, r: 1.8, color: TERRA },
            { x: 103.5, y: 154, r: 1.8, color: TERRA },
            { x: 100, y: 125, r: 2.2, color: TERRA },
        ],
    },
    badi: {
        lines: [
            // Vücuda oturan, balıkçı yaka uzun kollu badi
            { d: womanTop({ bw: 29, waistIn: 4, hemOut: 0, nx: 88 }) },
            { d: "M 88 40 L 88 24 Q 100 21 112 24 L 112 40" },
            { d: "M 88 30 Q 100 27 112 30", width: 1.1 },
            ...cuffs(29),
        ],
        details: [
            // Yakada ribana
            ...[92, 96, 100, 104, 108].map((x) => ({ d: `M ${x} 31 L ${x} 38`, color: TERRA, width: 0.9 })),
        ],
    },
    triko: {
        lines: [
            // Kadın kazağı: yuvarlak yaka, belde hafif daralan, yuvarlak etekli
            { d: womanTop({ bw: 37, waistIn: 4, hemOut: 2 }) },
            { d: "M 82 40 Q 100 56 118 40" },
            { d: "M 85 40 Q 100 51 115 40", width: 1.1 },
            ...cuffs(37),
        ],
        details: [
            // Yaka altında örgü şeridi
            ...[0, 1].flatMap((row) =>
                Array.from({ length: 7 }, (_, c) => {
                    const x = 73 + c * 9;
                    const y = 68 + row * 9;
                    return { d: `M ${x - 3.5} ${y - 3.5} L ${x} ${y + 3.5} L ${x + 3.5} ${y - 3.5}`, color: TERRA, width: 1.3 };
                }),
            ),
            // Ribanalı kollar ve etek
            ...Array.from({ length: 8 }, (_, i) => ({ d: `M ${70 + i * 8.5} ${160 + Math.sin((i / 7) * Math.PI) * 4} L ${70 + i * 8.5} ${165 + Math.sin((i / 7) * Math.PI) * 4}`, color: ACCENT, width: 0.9 })),
        ],
    },
};

// Bilinmeyen kategoriler için örgü dokusu
const FALLBACK = {
    lines: [] as Line[],
    details: [0, 1, 2, 3].flatMap((row) =>
        Array.from({ length: 6 }, (_, c) => {
            const x = 70 + c * 12;
            const y = 76 + row * 14;
            return { d: `M ${x - 5} ${y - 5} L ${x} ${y + 5} L ${x + 5} ${y - 5}`, color: row % 3 === 1 ? TERRA : ACCENT, width: 1.6 };
        }),
    ),
    dots: [],
};

export default function CategoryArt({ value, className }: { value: string; className?: string }) {
    const art = ART[value] ?? FALLBACK;
    const detailStart = art.lines.length ? 1.1 : 0.2;

    return (
        <motion.svg
            viewBox="18 18 164 160"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className={className}
            aria-hidden="true"
        >
            {art.lines.map((l, i) => (
                <motion.path
                    key={`l${i}`}
                    d={l.d}
                    fill="none"
                    stroke={l.color ?? ACCENT}
                    strokeWidth={l.width ?? 1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={draw(i === 0 ? 0 : 0.8 + i * 0.05, i === 0 ? 1.6 : 0.6)}
                />
            ))}
            {art.details.map((l, i) => (
                <motion.path
                    key={`d${i}`}
                    d={l.d}
                    fill="none"
                    stroke={l.color ?? TERRA}
                    strokeWidth={l.width ?? 1.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={draw(detailStart + i * 0.03, 0.5)}
                />
            ))}
            {art.dots?.map((d, i) => (
                <motion.circle
                    key={`c${i}`}
                    cx={d.x}
                    cy={d.y}
                    r={d.r ?? 2}
                    fill={d.color ?? TERRA}
                    style={{ transformOrigin: `${d.x}px ${d.y}px` }}
                    variants={pop(detailStart + 0.5 + i * 0.1)}
                />
            ))}
        </motion.svg>
    );
}
