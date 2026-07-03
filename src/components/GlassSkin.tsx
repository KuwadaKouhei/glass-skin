import * as React from "react";
import { cssVars, cx, toLen, useSkinStyles } from "../internal/styles";
import type { SkinBaseProps } from "./types";

export interface GlassSkinProps extends SkinBaseProps {
  /** ガラスの色味（CSSカラー。例: "rgba(120,180,255,0.15)"） */
  tint?: string;
  /** 背景のぼかし量。数値は px（既定: 10px） */
  blur?: number | string;
  /** 背景の彩度強調（例: "180%"。既定: "160%"） */
  saturation?: string;
}

/** 透明なガラス板。背後のコンテンツがうっすら透けて見える */
export const GlassSkin = React.forwardRef<HTMLElement, GlassSkinProps>(
  function GlassSkin(
    { as, tint, blur, saturation, radius, className, style, children, ...rest },
    ref
  ) {
    useSkinStyles();
    const Comp = (as ?? "div") as React.ElementType;
    return (
      <Comp
        ref={ref}
        className={cx("gsk", "gsk-glass", className)}
        style={{
          ...cssVars({
            "--gsk-radius": toLen(radius),
            "--gsk-tint": tint,
            "--gsk-blur": toLen(blur),
            "--gsk-sat": saturation,
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
