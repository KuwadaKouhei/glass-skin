import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { HoloSkin } from "../src";
import { SampleContent, StoryShell } from "./helpers/StoryShell";

const meta = {
  title: "Skins/HoloSkin",
  component: HoloSkin,
  argTypes: {
    speed: { control: { type: "range", min: 2, max: 20, step: 1 }, description: "虹色が流れる周期(秒)" },
    radius: { control: { type: "range", min: 0, max: 48, step: 1 }, description: "角丸(px)" },
  },
  args: { speed: 9, radius: 16 },
  render: (args) => (
    <StoryShell variant="holo">
      <HoloSkin {...args} style={{ padding: 24, minHeight: 140, color: "#3b3255" }}>
        <SampleContent title="HoloSkin" note="トレカのようなホログラム質感" />
      </HoloSkin>
    </StoryShell>
  ),
} satisfies Meta<typeof HoloSkin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
