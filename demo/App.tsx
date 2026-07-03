import React from "react";
import {
  AuroraSkin,
  CarbonSkin,
  FrostSkin,
  GlassSkin,
  HoloSkin,
  MetalSkin,
  PaperSkin,
  ReflectSkin,
} from "../src";

/** backdrop-filter の効果が分かるよう、カラフルな背景を敷く */
const pageBackground: React.CSSProperties = {
  minHeight: "100vh",
  padding: "48px 32px",
  background:
    "radial-gradient(60% 50% at 15% 20%, #ff6b6b 0%, transparent 60%)," +
    "radial-gradient(50% 60% at 85% 15%, #4ecdc4 0%, transparent 60%)," +
    "radial-gradient(70% 60% at 70% 85%, #a78bfa 0%, transparent 60%)," +
    "radial-gradient(50% 50% at 25% 80%, #fbbf24 0%, transparent 55%)," +
    "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: 24,
  maxWidth: 1100,
  margin: "0 auto",
};

const cardInner: React.CSSProperties = { padding: 24, minHeight: 150 };

function Label({ title, note }: { title: string; note: string }) {
  return (
    <>
      <h2 style={{ fontSize: 18, marginBottom: 8 }}>{title}</h2>
      <p style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.7 }}>{note}</p>
    </>
  );
}

export function App() {
  return (
    <div style={pageBackground} data-testid="demo-page">
      <header style={{ maxWidth: 1100, margin: "0 auto 32px" }}>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>glass-skin</h1>
        <p style={{ opacity: 0.85 }}>
          React 用スキン付き背景サーフェスコンポーネント集
        </p>
      </header>

      <main style={grid}>
        <GlassSkin style={cardInner} data-testid="skin-glass">
          <Label title="GlassSkin" note="透明ガラス。背景が透けて見え、上端にグロスが乗る" />
        </GlassSkin>

        <FrostSkin style={cardInner} data-testid="skin-frost">
          <Label title="FrostSkin" note="すりガラス。強いぼかし + 微細なグレイン" />
        </FrostSkin>

        <ReflectSkin style={cardInner} data-testid="skin-reflect">
          <Label title="ReflectSkin" note="光の帯が定期的に走る反射ガラス" />
        </ReflectSkin>

        <ReflectSkin trigger="hover" style={cardInner} data-testid="skin-reflect-hover">
          <Label title="ReflectSkin (hover)" note="ホバーした時だけ光が走る" />
        </ReflectSkin>

        <AuroraSkin style={cardInner} data-testid="skin-aurora">
          <Label title="AuroraSkin" note="ゆらめくオーロラグラデーション" />
        </AuroraSkin>

        <MetalSkin style={{ ...cardInner, color: "#26282e" }} data-testid="skin-metal">
          <Label title="MetalSkin" note="ヘアライン入りのブラシメタル" />
        </MetalSkin>

        <CarbonSkin style={cardInner} data-testid="skin-carbon">
          <Label title="CarbonSkin" note="カーボンファイバーの織り目" />
        </CarbonSkin>

        <PaperSkin style={{ ...cardInner, color: "#3b3630" }} data-testid="skin-paper">
          <Label title="PaperSkin" note="ざらついた紙・和紙の質感" />
        </PaperSkin>

        <HoloSkin style={{ ...cardInner, color: "#3b3255" }} data-testid="skin-holo">
          <Label title="HoloSkin" note="虹色が流れるホログラム" />
        </HoloSkin>

        <AuroraSkin
          style={{ padding: 24, gridColumn: "1 / -1" }}
          colors={["#22d3ee", "#818cf8", "#34d399"]}
          data-testid="skin-nested"
        >
          <GlassSkin style={{ padding: 24 }}>
            <Label
              title="組み合わせ"
              note="AuroraSkin の上に GlassSkin を重ねる。スキン同士は自由にネストできる"
            />
          </GlassSkin>
        </AuroraSkin>
      </main>
    </div>
  );
}
