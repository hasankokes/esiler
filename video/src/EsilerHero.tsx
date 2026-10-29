import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { loadFont as loadCormorant } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadMono } from "@remotion/google-fonts/DMMono";

const { fontFamily: cormorant } = loadCormorant("normal", {
  weights: ["300", "400"],
  subsets: ["latin", "latin-ext"],
});
const { fontFamily: mono } = loadMono("normal", {
  weights: ["400"],
  subsets: ["latin", "latin-ext"],
});

// Sitenin renkleri (app/globals.css)
const CREAM = "#F5F0E8";
const DARK = "#1C2B3A";
const ACCENT = "#D4C5A9";
const TERRA = "#B5622C";

export const HERO_FPS = 30;
export const HERO_DURATION = 14 * HERO_FPS;

const ease = Easing.bezier(0.65, 0, 0.35, 1);
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

// 0 → 1 ilerleme; çizgi çizdirme ve belirme için ortak yardımcı
const progress = (frame: number, start: number, duration: number, easing = ease) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

// pathLength=1 olan bir yolu baştan sona çizer. Henüz başlamamış yol hiç görünmez
// (yuvarlak uçlu sıfır uzunluklu çizgi nokta bırakmasın diye).
const DrawPath: React.FC<
  React.SVGProps<SVGPathElement> & { p: number }
> = ({ p, ...rest }) => (
  <path
    {...rest}
    pathLength={1}
    strokeDasharray={1}
    strokeDashoffset={1 - p}
    opacity={p > 0 ? (rest.opacity ?? 1) : 0}
    fill={rest.fill ?? "none"}
  />
);

// ---------- Örgü (triko ilmekleri) ----------
const COLS = 9;
const ROWS = 9;
const SW = 72; // ilmek genişliği
const SH = 50; // sıra yüksekliği
const SWATCH_CX = 540;
const SWATCH_CY = 650;
// Motif koordinatları 64px ilmek ve 610 merkezine göre çizildi; örgüyle birlikte ölçeklenir
const MOTIF_TRANSFORM = `translate(${SWATCH_CX} ${SWATCH_CY}) scale(${SW / 64}) translate(-540 -610)`;
const X0 = SWATCH_CX - (COLS * SW) / 2;
const Y_BOTTOM = SWATCH_CY + (ROWS * SH) / 2;
const KNIT_START = 75;

const stitches = Array.from({ length: ROWS * COLS }, (_, i) => {
  const r = Math.floor(i / COLS);
  const k = i % COLS;
  // Örgü gibi gidip gelerek: çift sıralar soldan sağa, tek sıralar sağdan sola
  const c = r % 2 === 0 ? k : COLS - 1 - k;
  return {
    i,
    cx: X0 + SW / 2 + c * SW,
    cy: Y_BOTTOM - SH / 2 - r * SH,
    color: r === 1 || r === ROWS - 2 ? TERRA : ACCENT,
  };
});

const Stitch: React.FC<{ cx: number; cy: number; color: string; p: number }> = ({ cx, cy, color, p }) => (
  <>
    <DrawPath
      p={p}
      d={`M ${cx - 27} ${cy - 24} Q ${cx - 15} ${cy + 2} ${cx - 2} ${cy + 24}`}
      stroke={color}
      strokeWidth={14}
      strokeLinecap="round"
    />
    <DrawPath
      p={p}
      d={`M ${cx + 27} ${cy - 24} Q ${cx + 15} ${cy + 2} ${cx + 2} ${cy + 24}`}
      stroke={color}
      strokeWidth={14}
      strokeLinecap="round"
    />
  </>
);

// ---------- İşleme motifi (Gün Çiçeği) ----------
const MOTIF_START = 205;

const flowers = [
  { x: 540, y: 448, delay: 0 },
  { x: 440, y: 575, delay: 8 },
  { x: 640, y: 535, delay: 16 },
];

const petalPath = (x: number, y: number, angle: number) => {
  const rad = (angle * Math.PI) / 180;
  const px = x + Math.cos(rad) * 22;
  const py = y + Math.sin(rad) * 22;
  // Yaprağı merkezden dışarı bakan bir badem şekli olarak çiz
  const tx = x + Math.cos(rad) * 44;
  const ty = y + Math.sin(rad) * 44;
  const nx = -Math.sin(rad) * 14;
  const ny = Math.cos(rad) * 14;
  return `M ${x} ${y} Q ${px + nx} ${py + ny} ${tx} ${ty} Q ${px - nx} ${py - ny} ${x} ${y} Z`;
};

const stones = [
  { x: 540, y: 448, at: 0 },
  { x: 440, y: 575, at: 5 },
  { x: 640, y: 535, at: 10 },
  { x: 536, y: 660, at: 15 },
  { x: 548, y: 560, at: 19 },
  { x: 492, y: 612, at: 23 },
  { x: 594, y: 572, at: 27 },
];

const Stone: React.FC<{ x: number; y: number; frame: number; start: number }> = ({ x, y, frame, start }) => {
  const pop = interpolate(frame, [start, start + 5, start + 9], [0, 1.35, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const spark = interpolate(frame, [start + 2, start + 8, start + 16], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <g>
      <g
        style={{
          opacity: spark,
          transformOrigin: `${x}px ${y}px`,
          scale: String(0.6 + spark * 0.8),
          rotate: `${spark * 45}deg`,
        }}
      >
        <path
          d={`M ${x} ${y - 30} L ${x + 3} ${y - 3} L ${x + 30} ${y} L ${x + 3} ${y + 3} L ${x} ${y + 30} L ${x - 3} ${y + 3} L ${x - 30} ${y} L ${x - 3} ${y - 3} Z`}
          fill={CREAM}
        />
      </g>
      <circle
        cx={x}
        cy={y}
        r={8}
        fill={CREAM}
        style={{
          transformOrigin: `${x}px ${y}px`,
          scale: String(pop),
          filter: "drop-shadow(0 0 8px rgba(245,240,232,0.9))",
        }}
      />
    </g>
  );
};

export const EsilerHero: React.FC = () => {
  const frame = useCurrentFrame();

  // Sahne 1: iplik soldan gelir
  const threadDraw = progress(frame, 12, 60);
  const threadFade = interpolate(frame, [KNIT_START + 40, 230], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sahne 4: örgü + motif kaybolur, yerine logo gelir
  const swatchOut = progress(frame, 330, 28);
  const logoIn = progress(frame, 348, 30, easeOut);
  const underline = progress(frame, 362, 26);
  const subIn = progress(frame, 375, 18, easeOut);
  // Döngünün sonunda her şey kararır; video başa sardığında boş sahneden devam eder
  const loopOut = interpolate(frame, [HERO_DURATION - 22, HERO_DURATION - 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Motif işlenirken örgü biraz geri çekilir
  const knitDim = interpolate(frame, [MOTIF_START - 5, MOTIF_START + 30], [0.95, 0.55], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: DARK }}>
      {/* Sitedeki kumaş deseni */}
      <AbsoluteFill
        style={{
          opacity: 0.2,
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(212,197,169,0.15) 0px, rgba(212,197,169,0.15) 1px, transparent 1px, transparent 14px)",
        }}
      />

      <svg width={1080} height={1350} viewBox="0 0 1080 1350" style={{ position: "absolute", inset: 0, opacity: loopOut }}>
        {/* İplik */}
        <DrawPath
          p={threadDraw}
          opacity={threadFade}
          d={`M -40 1120 C 120 1180, 90 960, 250 1000 S 180 ${Y_BOTTOM + 20}, ${X0 + 6} ${Y_BOTTOM - 22}`}
          stroke={ACCENT}
          strokeWidth={5}
          strokeLinecap="round"
        />

        <g
          style={{
            opacity: 1 - swatchOut,
            transformOrigin: `${SWATCH_CX}px ${SWATCH_CY}px`,
            scale: String(1 - swatchOut * 0.06),
          }}
        >
          {/* Örgü */}
          <g opacity={knitDim}>
            {stitches.map((s) => (
              <Stitch key={s.i} cx={s.cx} cy={s.cy} color={s.color} p={progress(frame, KNIT_START + s.i * 1.25, 10)} />
            ))}
          </g>

          <g transform={MOTIF_TRANSFORM}>
          {/* İşleme: sap ve dallar */}
          <DrawPath
            p={progress(frame, MOTIF_START, 40)}
            d="M 540 790 C 528 720, 560 670, 540 600 C 524 540, 548 500, 540 448"
            stroke={TERRA}
            strokeWidth={7}
            strokeLinecap="round"
          />
          <DrawPath
            p={progress(frame, MOTIF_START + 22, 28)}
            d="M 538 655 C 500 640, 468 615, 440 575"
            stroke={TERRA}
            strokeWidth={6}
            strokeLinecap="round"
          />
          <DrawPath
            p={progress(frame, MOTIF_START + 28, 28)}
            d="M 543 618 C 582 600, 615 575, 640 535"
            stroke={TERRA}
            strokeWidth={6}
            strokeLinecap="round"
          />

          {/* Yapraklar */}
          {[
            { d: "M 534 720 Q 490 712 470 680 Q 512 682 534 720 Z", at: 40 },
            { d: "M 546 690 Q 592 684 610 650 Q 568 654 546 690 Z", at: 46 },
          ].map((leaf) => {
            const p = progress(frame, MOTIF_START + leaf.at, 22);
            return (
              <DrawPath
                key={leaf.d}
                p={p}
                d={leaf.d}
                stroke={CREAM}
                strokeWidth={3.5}
                strokeLinejoin="round"
                fill={TERRA}
                fillOpacity={progress(frame, MOTIF_START + leaf.at + 14, 12)}
              />
            );
          })}

          {/* Çiçekler */}
          {flowers.map((f) =>
            [0, 72, 144, 216, 288].map((a, k) => {
              const start = MOTIF_START + 50 + f.delay + k * 3;
              return (
                <DrawPath
                  key={`${f.x}-${a}`}
                  p={progress(frame, start, 16)}
                  d={petalPath(f.x, f.y, a - 90)}
                  stroke={CREAM}
                  strokeWidth={3.5}
                  strokeLinejoin="round"
                  fill={TERRA}
                  fillOpacity={progress(frame, start + 12, 10)}
                />
              );
            }),
          )}

          {/* Taşlar */}
          {stones.map((s) => (
            <Stone key={`${s.x}-${s.y}`} x={s.x} y={s.y} frame={frame} start={MOTIF_START + 88 + s.at} />
          ))}
          </g>
        </g>

        {/* Logo altındaki iplik */}
        <DrawPath
          p={underline}
          d="M 330 758 C 420 746, 480 770, 540 758 S 660 746, 750 758"
          stroke={ACCENT}
          strokeWidth={3}
          strokeLinecap="round"
        />
      </svg>

      {/* Logo */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          opacity: loopOut,
        }}
      >
        <div
          style={{
            marginTop: -10,
            fontFamily: cormorant,
            fontWeight: 300,
            fontSize: 96,
            color: CREAM,
            opacity: logoIn,
            letterSpacing: `${interpolate(logoIn, [0, 1], [0.45, 0.16])}em`,
            translate: `0px ${interpolate(logoIn, [0, 1], [24, 0])}px`,
            whiteSpace: "nowrap",
          }}
        >
          EŞİLER <span style={{ color: TERRA }}>TRİKO</span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 810,
            fontFamily: mono,
            fontSize: 30,
            letterSpacing: "0.3em",
            color: ACCENT,
            opacity: subIn,
            translate: `0px ${interpolate(subIn, [0, 1], [12, 0])}px`,
          }}
        >
          EST. 1964 · İSTANBUL
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
