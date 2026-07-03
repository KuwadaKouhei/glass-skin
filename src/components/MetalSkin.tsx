import * as React from "react";
import { cssVars, cx, toLen, useSkinStyles } from "../internal/styles";
import type { SkinBaseProps } from "./types";

export interface MetalSkinProps extends SkinBaseProps {
  /** ヘアライン（ブラシ目）の方向。数値は deg（既定: 90deg = 横方向） */
  angle?: number | string;
}

/** ヘアライン加工されたブラシメタル（アルミ調）の質感 */
export const MetalSkin = React.forwardRef<HTMLElement, MetalSkinProps>(
  function MetalSkin(
    { as, angle, radius, className, style, children, ...rest },
    ref
  ) {
    useSkinStyles();
    const Comp = (as ?? "div") as React.ElementType;
    return (
      <Comp
        ref={ref}
        className={cx("gsk", "gsk-metal", className)}
        style={{
          ...cssVars({
            "--gsk-radius": toLen(radius),
            "--gsk-angle": typeof angle === "number" ? `${angle}deg` : angle,
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
