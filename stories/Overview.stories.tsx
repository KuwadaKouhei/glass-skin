import type { Meta, StoryObj } from "@storybook/react";
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
import { SampleContent } from "./helpers/StoryShell";

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: 24,
  maxWidth: 1100,
};

const card: React.CSSProperties = { padding: 24, minHeight: 130 };

const meta: Meta = {
  title: "Overview",
};

export default meta;

/** 全スキンの一覧。個別の調整とCSSコピーは Skins/ 配下の各ストーリーで */
export const AllSkins: StoryObj = {
  render: () => (
    <div style={grid}>
      <GlassSkin style={card}>
        <SampleContent title="GlassSkin" note="透明ガラス" />
      </GlassSkin>
      <FrostSkin style={card}>
        <SampleContent title="FrostSkin" note="すりガラス" />
      </FrostSkin>
      <ReflectSkin style={card}>
        <SampleContent title="ReflectSkin" note="反射ガラス" />
      </ReflectSkin>
      <AuroraSkin style={card}>
        <SampleContent title="AuroraSkin" note="オーロラ" />
      </AuroraSkin>
      <MetalSkin style={{ ...card, color: "#26282e" }}>
        <SampleContent title="MetalSkin" note="ブラシメタル" />
      </MetalSkin>
      <CarbonSkin style={card}>
        <SampleContent title="CarbonSkin" note="カーボン" />
      </CarbonSkin>
      <PaperSkin style={{ ...card, color: "#3b3630" }}>
        <SampleContent title="PaperSkin" note="紙の質感" />
      </PaperSkin>
      <HoloSkin style={{ ...card, color: "#3b3255" }}>
        <SampleContent title="HoloSkin" note="ホログラム" />
      </HoloSkin>
      <AuroraSkin
        style={{ padding: 24, gridColumn: "1 / -1" }}
        colors={["#22d3ee", "#818cf8", "#34d399"]}
      >
        <GlassSkin style={{ padding: 24 }}>
          <SampleContent title="組み合わせ" note="AuroraSkin の上に GlassSkin をネスト" />
        </GlassSkin>
      </AuroraSkin>
    </div>
  ),
};
