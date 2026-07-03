import * as React from "react";
import { cssVars, cx, toLen, useSkinStyles } from "../internal/styles";
import type { SkinBaseProps } from "./types";

export interface CarbonSkinProps extends SkinBaseProps {
  /** 織り目1マスの大きさ。数値は px（既定: 14px） */
  scale?: number | string;
}

/** カーボンファイバーの織り目パターン */
export const CarbonSkin = React.forwardRef<HTMLElement, CarbonSkinProps>(
  function CarbonSkin(
    { as, scale, radius, className, style, children, ...rest },
    ref
  ) {
    useSkinStyles();
    const Comp = (as ?? "div") as React.ElementType;
    return (
      <Comp
        ref={ref}
        className={cx("gsk", "gsk-carbon", className)}
        style={{
          ...cssVars({
            "--gsk-radius": toLen(radius),
            "--gsk-cell": toLen(scale),
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
