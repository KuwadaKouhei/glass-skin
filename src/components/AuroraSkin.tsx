import * as React from "react";
import { cssVars, cx, toLen, useSkinStyles } from "../internal/styles";
import type { SkinBaseProps } from "./types";

export interface AuroraSkinProps extends SkinBaseProps {
  /** オーロラの色（最大3色。既定: 紫・シアン・ピンク） */
  colors?: string[];
  /** ベースの背景色（既定: #0b1020） */
  background?: string;
  /** 一周する時間。数値は秒（既定: 16秒） */
  speed?: number | string;
}

/** ゆっくり回転しながらゆらめくオーロラ調のグラデーション背景 */
export const AuroraSkin = React.forwardRef<HTMLElement, AuroraSkinProps>(
  function AuroraSkin(
    { as, colors, background, speed, radius, className, style, children, ...rest },
    ref
  ) {
    useSkinStyles();
    const Comp = (as ?? "div") as React.ElementType;
    return (
      <Comp
        ref={ref}
        className={cx("gsk", "gsk-aurora", className)}
        style={{
          ...cssVars({
            "--gsk-radius": toLen(radius),
            "--gsk-bg": background,
            "--gsk-c1": colors?.[0],
            "--gsk-c2": colors?.[1],
            "--gsk-c3": colors?.[2],
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
