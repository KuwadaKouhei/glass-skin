import * as React from "react";
import type { SkinVariant } from "../internal/styles";
import { AuroraSkin, AuroraSkinProps } from "./AuroraSkin";
import { CarbonSkin, CarbonSkinProps } from "./CarbonSkin";
import { FrostSkin, FrostSkinProps } from "./FrostSkin";
import { GlassSkin, GlassSkinProps } from "./GlassSkin";
import { HoloSkin, HoloSkinProps } from "./HoloSkin";
import { MetalSkin, MetalSkinProps } from "./MetalSkin";
import { PaperSkin, PaperSkinProps } from "./PaperSkin";
import { ReflectSkin, ReflectSkinProps } from "./ReflectSkin";

export type { SkinVariant };

export type SkinProps =
  | ({ variant?: "glass" } & GlassSkinProps)
  | ({ variant: "frost" } & FrostSkinProps)
  | ({ variant: "reflect" } & ReflectSkinProps)
  | ({ variant: "aurora" } & AuroraSkinProps)
  | ({ variant: "metal" } & MetalSkinProps)
  | ({ variant: "carbon" } & CarbonSkinProps)
  | ({ variant: "paper" } & PaperSkinProps)
  | ({ variant: "holo" } & HoloSkinProps);

const registry = {
  glass: GlassSkin,
  frost: FrostSkin,
  reflect: ReflectSkin,
  aurora: AuroraSkin,
  metal: MetalSkin,
  carbon: CarbonSkin,
  paper: PaperSkin,
  holo: HoloSkin,
} as const;

/** variant 指定で任意のスキンを切り替えられる汎用コンポーネント */
export function Skin(props: SkinProps): React.ReactElement {
  const { variant = "glass", ...rest } = props;
  const Comp = registry[variant] as React.ElementType;
  return <Comp {...rest} />;
}
