import * as React from "react";
import { cssVars, cx, toLen, useSkinStyles } from "../internal/styles";
import type { SkinBaseProps } from "./types";

export interface PaperSkinProps extends SkinBaseProps {
  /** 紙の色（既定: #f6f1e7 の生成り色） */
  tint?: string;
  /** 紙のざらつきの強さ 0〜1（既定: 0.5） */
  grain?: number;
}

/** ざらついた紙・和紙のようなテクスチャ */
export const PaperSkin = React.forwardRef<HTMLElement, PaperSkinProps>(
  function PaperSkin(
    { as, tint, grain, radius, className, style, children, ...rest },
    ref
  ) {
    useSkinStyles();
    const Comp = (as ?? "div") as React.ElementType;
    return (
      <Comp
        ref={ref}
        className={cx("gsk", "gsk-paper", className)}
        style={{
          ...cssVars({
            "--gsk-radius": toLen(radius),
            "--gsk-tint": tint,
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
