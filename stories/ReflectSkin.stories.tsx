import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ReflectSkin } from "../src";
import { SampleContent, StoryShell } from "./helpers/StoryShell";

const meta = {
  title: "Skins/ReflectSkin",
  component: ReflectSkin,
  argTypes: {
    tint: { control: "color", description: "ガラスの色味" },
    sheenColor: { control: "color", description: "反射光の色" },
    speed: { control: { type: "range", min: 1, max: 12, step: 0.5 }, description: "一往復の秒数" },
    trigger: { control: "radio", options: ["loop", "hover"], description: "常時 or ホバー時" },
    radius: { control: { type: "range", min: 0, max: 48, step: 1 }, description: "角丸(px)" },
  },
  args: { speed: 4, trigger: "loop" as const, radius: 16 },
  render: (args) => (
    <StoryShell variant="reflect">
      <ReflectSkin {...args} style={{ padding: 24, minHeight: 140 }}>
        <SampleContent title="ReflectSkin" note="ガラスの表面を光の帯が走る" />
      </ReflectSkin>
    </StoryShell>
  ),
} satisfies Meta<typeof ReflectSkin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loop: Story = {};
export const OnHover: Story = {
  args: { trigger: "hover" },
};
