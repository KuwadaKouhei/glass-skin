import type { Preview } from "@storybook/react";
import React from "react";

/** backdrop-filter 系スキンの効果が分かるよう、カラフルな背景を全ストーリーに敷く */
const colorfulBackground: React.CSSProperties = {
  minHeight: "100vh",
  padding: 48,
  color: "#fff",
  fontFamily: '"Segoe UI", "Hiragino Sans", "Yu Gothic UI", sans-serif',
  background:
    "radial-gradient(60% 50% at 15% 20%, #ff6b6b 0%, transparent 60%)," +
    "radial-gradient(50% 60% at 85% 15%, #4ecdc4 0%, transparent 60%)," +
    "radial-gradient(70% 60% at 70% 85%, #a78bfa 0%, transparent 60%)," +
    "radial-gradient(50% 50% at 25% 80%, #fbbf24 0%, transparent 55%)," +
    "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
};

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
  },
  decorators: [
    (Story) => (
      <div style={colorfulBackground}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
