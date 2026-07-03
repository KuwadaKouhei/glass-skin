import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CarbonSkin } from "../src";
import { SampleContent, StoryShell } from "./helpers/StoryShell";

const meta = {
  title: "Skins/CarbonSkin",
  component: CarbonSkin,
  argTypes: {
    scale: { control: { type: "range", min: 6, max: 40, step: 1 }, description: "織り目サイズ(px)" },
    radius: { control: { type: "range", min: 0, max: 48, step: 1 }, description: "角丸(px)" },
  },
  args: { scale: 14, radius: 16 },
  render: (args) => (
    <StoryShell variant="carbon">
      <CarbonSkin {...args} style={{ padding: 24, minHeight: 140 }}>
        <SampleContent title="CarbonSkin" note="カーボンファイバーの織り目" />
      </CarbonSkin>
    </StoryShell>
  ),
} satisfies Meta<typeof CarbonSkin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
