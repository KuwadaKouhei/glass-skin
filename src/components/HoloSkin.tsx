import * as React from "react";
import { cssVars, cx, toLen, useSkinStyles } from "../internal/styles";
import type { SkinBaseProps } from "./types";

export interface HoloSkinProps extends SkinBaseProps {
  /** 虹色が流れる周期。数値は秒（既定: 9秒） */
  speed?: number | string;
}

/** トレーディングカードのようなホログラム（虹色に流れる）質感 */
export const HoloSkin = React.forwardRef<HTMLElement, HoloSkinProps>(
  function HoloSkin(
    { as, speed, radius, className, style, children, ...rest },
    ref
  ) {
    useSkinStyles();
    const Comp = (as ?? "div") as React.ElementType;
    return (
      <Comp
        ref={ref}
        className={cx("gsk", "gsk-holo", className)}
        style={{
          ...cssVars({
            "--gsk-radius": toLen(radius),
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
