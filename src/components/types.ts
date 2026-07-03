import * as React from "react";

/** 全スキン共通の props */
export interface SkinBaseProps extends React.HTMLAttributes<HTMLElement> {
  /** レンダリングする要素（既定: div） */
  as?: React.ElementType;
  /** 角丸。数値は px 扱い（既定: 16px） */
  radius?: number | string;
}
