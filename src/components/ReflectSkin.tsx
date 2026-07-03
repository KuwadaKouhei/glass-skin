import * as React from "react";
import { cssVars, cx, toLen, useSkinStyles } from "../internal/styles";
import type { SkinBaseProps } from "./types";

export interface ReflectSkinProps extends SkinBaseProps {
  /** ガラスの色味（CSSカラー） */
  tint?: string;
  /** 背景のぼかし量。数値は px（既定: 10px） */
  blur?: number | string;
  /** 反射光の色（既定: rgba(255,255,255,0.35)） */
  sheenColor?: string;
  /** 反射が一往復する時間。数値は秒（既定: 4秒） */
  speed?: number | string;
  /** "loop": 常時アニメーション / "hover": ホバー時のみ（既定: "loop"） */
  trigger?: "loop" | "hover";
}

/** ガラスの表面を光の帯が走る、一部が反射するスキン */
export const ReflectSkin = React.forwardRef<HTMLElement, ReflectSkinProps>(
  function ReflectSkin(
    {
      as,
      tint,
      blur,
      sheenColor,
      speed,
      trigger = "loop",
      radius,
      className,
      style,
      children,
      ...rest
    },
    ref
  ) {
    useSkinStyles();
    const Comp = (as ?? "div") as React.ElementType;
    return (
      <Comp
        ref={ref}
        className={cx(
          "gsk",
          "gsk-glass",
          "gsk-reflect",
          trigger === "hover" ? "gsk-reflect-hover" : "gsk-reflect-loop",
          className
        )}
        style={{
          ...cssVars({
            "--gsk-radius": toLen(radius),
            "--gsk-tint": tint,
            "--gsk-blur": toLen(blur),
            "--gsk-sheen": sheenColor,
            "--gsk-speed": typeof speed === "number" ? `${speed}s` : speed,
          }),
          ...style,
        }}
        {...rest}
      >
        {children}
      </Comp>
    );
  }
);
