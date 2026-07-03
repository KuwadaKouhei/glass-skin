import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AuroraSkin } from "../src";
import { SampleContent, StoryShell } from "./helpers/StoryShell";

type AuroraArgs = {
  c1: string;
  c2: string;
  c3: string;
  background: string;
  speed: number;
  radius: number;
};

const meta: Meta<AuroraArgs> = {
  title: "Skins/AuroraSkin",
  argTypes: {
    c1: { control: "color", description: "オーロラ色 1" },
    c2: { control: "color", description: "オーロラ色 2" },
    c3: { control: "color", description: "オーロラ色 3" },
    background: { control: "color", description: "ベース背景色" },
    speed: { control: { type: "range", min: 4, max: 40, step: 1 }, description: "一周の秒数" },
    radius: { control: { type: "range", min: 0, max: 48, step: 1 }, description: "角丸(px)" },
  },
  args: {
    c1: "#7c3aed",
    c2: "#06b6d4",
    c3: "#ec4899",
    background: "#0b1020",
    speed: 16,
    radius: 16,
  },
  render: ({ c1, c2, c3, ...args }) => (
    <StoryShell variant="aurora">
      <AuroraSkin colors={[c1, c2, c3]} {...args} style={{ padding: 24, minHeight: 140 }}>
        <SampleContent title="AuroraSkin" note="ゆっくり回転しながらゆらめくオーロラ" />
      </AuroraSkin>
    </StoryShell>
  ),
};

export default meta;
type Story = StoryObj<AuroraArgs>;

export const Default: Story = {};
export const Emerald: Story = {
  args: { c1: "#22d3ee", c2: "#818cf8", c3: "#34d399" },
};
