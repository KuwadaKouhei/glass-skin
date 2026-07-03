import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { PaperSkin } from "../src";
import { SampleContent, StoryShell } from "./helpers/StoryShell";

const meta = {
  title: "Skins/PaperSkin",
  component: PaperSkin,
  argTypes: {
    tint: { control: "color", description: "紙の色" },
    grain: { control: { type: "range", min: 0, max: 1, step: 0.05 }, description: "ざらつき 0〜1" },
    radius: { control: { type: "range", min: 0, max: 48, step: 1 }, description: "角丸(px)" },
  },
  args: { grain: 0.5, radius: 16 },
  render: (args) => (
    <StoryShell variant="paper">
      <PaperSkin {...args} style={{ padding: 24, minHeight: 140, color: "#3b3630" }}>
        <SampleContent title="PaperSkin" note="ざらついた紙・和紙のようなテクスチャ" />
      </PaperSkin>
    </StoryShell>
  ),
} satisfies Meta<typeof PaperSkin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
