import * as React from "react";

export type SkinVariant =
  | "glass"
  | "frost"
  | "reflect"
  | "aurora"
  | "metal"
  | "carbon"
  | "paper"
  | "holo";

/**
 * SVG feTurbulence によるノイズテクスチャ（外部アセット不要）。
 * frost / paper / holo のグレイン表現に使う。
 */
const NOISE_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
  "<filter id='n'>" +
  "<feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/>" +
  "<feColorMatrix type='saturate' values='0'/>" +
  "</filter>" +
  "<rect width='100%' height='100%' filter='url(#n)'/>" +
  "</svg>";

export const NOISE_URL = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

const BASE_CSS = `
.gsk{position:relative;border-radius:var(--gsk-radius,16px);isolation:isolate;overflow:hidden;}
.gsk::before,.gsk::after{border-radius:inherit;}
`;

const MOTION_CSS = `
@media (prefers-reduced-motion: reduce){
  .gsk-reflect-loop::after,.gsk-aurora::before,.gsk-holo{animation:none;}
}
`;

/** スキンごとの自己完結した CSS ブロック */
const PART_CSS: Record<SkinVariant, string> = {
  glass: `
/* ---- glass: 透明なガラス ---- */
.gsk-glass{
  background:var(--gsk-tint,rgba(255,255,255,0.12));
  -webkit-backdrop-filter:blur(var(--gsk-blur,10px)) saturate(var(--gsk-sat,160%));
  backdrop-filter:blur(var(--gsk-blur,10px)) saturate(var(--gsk-sat,160%));
  border:1px solid rgba(255,255,255,0.25);
  box-shadow:0 8px 32px rgba(0,0,0,0.25),inset 0 1px 0 rgba(255,255,255,0.35);
}
.gsk-glass::before{
  content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
  background:linear-gradient(180deg,rgba(255,255,255,0.20),rgba(255,255,255,0.05) 40%,rgba(255,255,255,0) 60%);
}
`,
  frost: `
/* ---- frost: すりガラス ---- */
.gsk-frost{
  background:var(--gsk-tint,rgba(255,255,255,0.35));
  -webkit-backdrop-filter:blur(var(--gsk-blur,24px)) saturate(130%);
  backdrop-filter:blur(var(--gsk-blur,24px)) saturate(130%);
  border:1px solid rgba(255,255,255,0.45);
  box-shadow:0 8px 32px rgba(0,0,0,0.15);
}
.gsk-frost::before{
  content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
  background-image:${NOISE_URL};background-size:160px 160px;
  opacity:var(--gsk-grain,0.25);mix-blend-mode:overlay;
}
`,
  reflect: `
/* ---- reflect: 光が走る反射（glass と組み合わせて使う） ---- */
.gsk-reflect::after{
  content:"";position:absolute;inset:0;z-index:2;pointer-events:none;
  background:linear-gradient(105deg,rgba(255,255,255,0) 35%,var(--gsk-sheen,rgba(255,255,255,0.35)) 50%,rgba(255,255,255,0) 65%);
  background-size:300% 100%;background-position:200% 0;background-repeat:no-repeat;
}
.gsk-reflect-loop::after{animation:gsk-sheen var(--gsk-speed,4s) ease-in-out infinite;}
.gsk-reflect-hover::after{transition:background-position 0.9s ease;}
.gsk-reflect-hover:hover::after{background-position:-100% 0;}
@keyframes gsk-sheen{0%{background-position:200% 0}55%,100%{background-position:-100% 0}}
`,
  aurora: `
/* ---- aurora: ゆらめくオーロラグラデーション ---- */
.gsk-aurora{background:var(--gsk-bg,#0b1020);}
.gsk-aurora::before{
  content:"";position:absolute;inset:-40%;z-index:-1;pointer-events:none;
  background:
    radial-gradient(45% 55% at 22% 28%,var(--gsk-c1,#7c3aed) 0%,transparent 62%),
    radial-gradient(50% 50% at 78% 22%,var(--gsk-c2,#06b6d4) 0%,transparent 62%),
    radial-gradient(55% 65% at 60% 82%,var(--gsk-c3,#ec4899) 0%,transparent 62%);
  filter:blur(42px);
  animation:gsk-aurora var(--gsk-speed,16s) linear infinite;
}
@keyframes gsk-aurora{
  0%{transform:rotate(0deg) scale(1)}
  50%{transform:rotate(180deg) scale(1.2)}
  100%{transform:rotate(360deg) scale(1)}
}
`,
  metal: `
/* ---- metal: ブラシ仕上げの金属 ---- */
.gsk-metal{
  background:
    repeating-linear-gradient(var(--gsk-angle,90deg),rgba(255,255,255,0.07) 0 1px,rgba(0,0,0,0.05) 1px 2px,rgba(255,255,255,0.02) 2px 3px),
    linear-gradient(180deg,#eceef1 0%,#b9bcc4 28%,#dcdee3 47%,#989ba3 66%,#cdd0d6 84%,#e6e8ec 100%);
  border:1px solid rgba(60,64,72,0.55);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.75),inset 0 -1px 0 rgba(0,0,0,0.25),0 6px 18px rgba(0,0,0,0.28);
}
.gsk-metal::before{
  content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
  background:radial-gradient(120% 60% at 30% 0%,rgba(255,255,255,0.5),rgba(255,255,255,0) 60%);
  mix-blend-mode:soft-light;
}
`,
  carbon: `
/* ---- carbon: カーボンファイバー ---- */
.gsk-carbon{
  background:
    radial-gradient(rgba(0,0,0,0.9) 15%,transparent 16%) 0 0 / var(--gsk-cell,14px) var(--gsk-cell,14px),
    radial-gradient(rgba(0,0,0,0.9) 15%,transparent 16%) calc(var(--gsk-cell,14px) / 2) calc(var(--gsk-cell,14px) / 2) / var(--gsk-cell,14px) var(--gsk-cell,14px),
    radial-gradient(rgba(255,255,255,0.12) 15%,transparent 20%) 0 1px / var(--gsk-cell,14px) var(--gsk-cell,14px),
    radial-gradient(rgba(255,255,255,0.12) 15%,transparent 20%) calc(var(--gsk-cell,14px) / 2) calc(var(--gsk-cell,14px) / 2 + 1px) / var(--gsk-cell,14px) var(--gsk-cell,14px);
  background-color:#26262b;
  border:1px solid rgba(0,0,0,0.6);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.08),0 6px 18px rgba(0,0,0,0.35);
}
.gsk-carbon::before{
  content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
  background:linear-gradient(115deg,rgba(255,255,255,0.14),rgba(255,255,255,0) 45%);
}
`,
  paper: `
/* ---- paper: 紙の質感 ---- */
.gsk-paper{
  background-color:var(--gsk-tint,#f6f1e7);
  border:1px solid rgba(0,0,0,0.08);
  box-shadow:0 2px 10px rgba(0,0,0,0.10);
}
.gsk-paper::before{
  content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
  background-image:${NOISE_URL};background-size:160px 160px;
  opacity:var(--gsk-grain,0.5);mix-blend-mode:multiply;
}
`,
  holo: `
/* ---- holo: ホログラム ---- */
.gsk-holo{
  background:linear-gradient(115deg,#ffd6e8,#c7d2fe,#a7f3d0,#fef3c7,#fbcfe8,#c7d2fe);
  background-size:300% 300%;
  animation:gsk-holo var(--gsk-speed,9s) ease infinite;
  border:1px solid rgba(255,255,255,0.6);
  box-shadow:0 8px 32px rgba(140,120,255,0.25),inset 0 1px 0 rgba(255,255,255,0.7);
}
.gsk-holo::before{
  content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
  background:conic-gradient(from 210deg at 50% 50%,rgba(255,255,255,0) 0deg,rgba(255,255,255,0.55) 80deg,rgba(255,255,255,0) 160deg,rgba(255,255,255,0.35) 260deg,rgba(255,255,255,0) 360deg);
  mix-blend-mode:soft-light;
}
.gsk-holo::after{
  content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
  background-image:${NOISE_URL};background-size:160px 160px;
  opacity:0.15;mix-blend-mode:overlay;
}
@keyframes gsk-holo{
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}
`,
};

/** 全スキンを含むスタイルシート（コンポーネントが注入するもの） */
export const SKIN_CSS =
  BASE_CSS + Object.values(PART_CSS).join("") + MOTION_CSS;

/** variant ごとに要素へ付ける class 名 */
export const SKIN_CLASS_NAMES: Record<SkinVariant, string> = {
  glass: "gsk gsk-glass",
  frost: "gsk gsk-frost",
  reflect: "gsk gsk-glass gsk-reflect gsk-reflect-loop",
  aurora: "gsk gsk-aurora",
  metal: "gsk gsk-metal",
  carbon: "gsk gsk-carbon",
  paper: "gsk gsk-paper",
  holo: "gsk gsk-holo",
};

/**
 * 指定スキンを React なしでも使える自己完結 CSS を返す（コピー&ペースト用）。
 * 返り値をスタイルシートに貼り、SKIN_CLASS_NAMES の class を要素に付ければ動く。
 */
export function getSkinCSS(variant: SkinVariant): string {
  const parts =
    variant === "reflect"
      ? PART_CSS.glass + PART_CSS.reflect
      : PART_CSS[variant];
  const hoverHint =
    variant === "reflect"
      ? "   ホバー時のみ光らせる場合は gsk-reflect-loop を gsk-reflect-hover に変える\n"
      : "";
  const header =
    `/* glass-skin: ${variant} スキン\n` +
    `   マークアップ例: <div class="${SKIN_CLASS_NAMES[variant]}">...</div>\n` +
    hoverHint +
    ` */\n`;
  return header + BASE_CSS + parts + MOTION_CSS;
}

const STYLE_ID = "glass-skin-css";

const useIsoInsertionEffect =
  typeof document !== "undefined"
    ? React.useInsertionEffect ?? React.useLayoutEffect
    : React.useEffect;

/** スタイルシートを document.head に1度だけ注入する（SSRセーフ） */
export function useSkinStyles(): void {
  useIsoInsertionEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = SKIN_CSS;
    document.head.appendChild(el);
  }, []);
}

export function cx(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(" ");
}

/** 数値は px 扱い、文字列はそのまま CSS 長さとして使う */
export function toLen(v: number | string | undefined): string | undefined {
  if (v == null) return undefined;
  return typeof v === "number" ? `${v}px` : v;
}

/** undefined を除いた CSS カスタムプロパティの style オブジェクトを作る */
export function cssVars(
  vars: Record<string, string | undefined>
): React.CSSProperties {
  const out: Record<string, string> = {};
  for (const key in vars) {
    const value = vars[key];
    if (value != null) out[key] = value;
  }
  return out as React.CSSProperties;
}
