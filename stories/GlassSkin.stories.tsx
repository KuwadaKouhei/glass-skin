import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { GlassSkin } from "../src";
import { SampleContent, StoryShell } from "./helpers/StoryShell";

const meta = {
  title: "Skins/GlassSkin",
  component: GlassSkin,
  argTypes: {
    tint: { control: "color", description: "ガラスの色味" },
    blur: { control: { type: "range", min: 0, max: 40, step: 1 }, description: "ぼかし量(px)" },
    saturation: { control: "text", description: "彩度強調（例: 180%）" },
    radius: { control: { type: "range", min: 0, max: 48, step: 1 }, description: "角丸(px)" },
  },
  args: { blur: 10, radius: 16 },
  render: (args) => (
    <StoryShell variant="glass">
      <GlassSkin {...args} style={{ padding: 24, minHeight: 140 }}>
        <SampleContent title="GlassSkin" note="透明ガラス。背景が透けて見え、上端にグロスが乗る" />
      </GlassSkin>
    </StoryShell>
  ),
} satisfies Meta<typeof GlassSkin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const BlueTint: Story = {
  args: { tint: "rgba(96,165,250,0.18)", blur: 14 },
};
