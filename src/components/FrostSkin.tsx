import * as React from "react";
import { cssVars, cx, toLen, useSkinStyles } from "../internal/styles";
import type { SkinBaseProps } from "./types";

export interface FrostSkinProps extends SkinBaseProps {
  /** すりガラスの色味（CSSカラー） */
  tint?: string;
  /** 背景のぼかし量。数値は px（既定: 24px） */
  blur?: number | string;
  /** ざらつき（グレイン）の強さ 0〜1（既定: 0.25） */
  grain?: number;
}

/** 半透明のすりガラス。強いぼかしと微細なノイズで磨りガラス質感を出す */
export const FrostSkin = React.forwardRef<HTMLElement, FrostSkinProps>(
  function FrostSkin(
    { as, tint, blur, grain, radius, className, style, children, ...rest },
    ref
  ) {
    useSkinStyles();
    const Comp = (as ?? "div") as React.ElementType;
    return (
      <Comp
        ref={ref}
        className={cx("gsk", "gsk-frost", className)}
        style={{
          ...cssVars({
            "--gsk-radius": toLen(radius),
            "--gsk-tint": tint,
            "--gsk-blur": toLen(blur),
            "--gsk-grain": grain != null ? String(grain) : undefined,
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
