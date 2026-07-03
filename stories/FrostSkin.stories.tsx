import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FrostSkin } from "../src";
import { SampleContent, StoryShell } from "./helpers/StoryShell";

const meta = {
  title: "Skins/FrostSkin",
  component: FrostSkin,
  argTypes: {
    tint: { control: "color", description: "すりガラスの色味" },
    blur: { control: { type: "range", min: 0, max: 48, step: 1 }, description: "ぼかし量(px)" },
    grain: { control: { type: "range", min: 0, max: 1, step: 0.05 }, description: "ざらつき 0〜1" },
    radius: { control: { type: "range", min: 0, max: 48, step: 1 }, description: "角丸(px)" },
  },
  args: { blur: 24, grain: 0.25, radius: 16 },
  render: (args) => (
    <StoryShell variant="frost">
      <FrostSkin {...args} style={{ padding: 24, minHeight: 140 }}>
        <SampleContent title="FrostSkin" note="すりガラス。強いぼかし + 微細なグレイン" />
      </FrostSkin>
    </StoryShell>
  ),
} satisfies Meta<typeof FrostSkin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
