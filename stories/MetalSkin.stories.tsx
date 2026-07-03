import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MetalSkin } from "../src";
import { SampleContent, StoryShell } from "./helpers/StoryShell";

const meta = {
  title: "Skins/MetalSkin",
  component: MetalSkin,
  argTypes: {
    angle: { control: { type: "range", min: 0, max: 180, step: 5 }, description: "ヘアラインの方向(deg)" },
    radius: { control: { type: "range", min: 0, max: 48, step: 1 }, description: "角丸(px)" },
  },
  args: { angle: 90, radius: 16 },
  render: (args) => (
    <StoryShell variant="metal">
      <MetalSkin {...args} style={{ padding: 24, minHeight: 140, color: "#26282e" }}>
        <SampleContent title="MetalSkin" note="ヘアライン加工されたブラシメタル" />
      </MetalSkin>
    </StoryShell>
  ),
} satisfies Meta<typeof MetalSkin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
