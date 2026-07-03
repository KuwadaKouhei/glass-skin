import React from "react";
import { getSkinCSS, type SkinVariant } from "../../src";

type CopyState = "idle" | "copied" | "error";

/** 選択済み textarea + execCommand によるコピー（iframe 内でも動く） */
function fallbackCopy(text: string): boolean {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.top = "0";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } finally {
    ta.remove();
  }
  return ok;
}

async function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (err) {
      // Storybook の iframe 内では "Document is not focused" 等で拒否されるため、
      // 失敗を握りつぶさず記録した上で execCommand フォールバックへ進む
      console.warn("navigator.clipboard が拒否されたためフォールバックします:", err);
    }
  }
  if (!fallbackCopy(text)) {
    throw new Error("クリップボードへのコピーに失敗しました");
  }
}

const buttonStyle: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.4)",
  background: "rgba(255,255,255,0.15)",
  color: "#fff",
  fontSize: 13,
  cursor: "pointer",
  backdropFilter: "blur(8px)",
};

const labels: Record<CopyState, string> = {
  idle: "CSSをコピー",
  copied: "コピーしました!",
  error: "コピー失敗",
};

/**
 * ストーリー用ラッパー。スキンの下に「CSSをコピー」ボタンを置き、
 * getSkinCSS(variant) + このストーリーで指定中の値（inline style）をコピーする。
 */
export function StoryShell({
  variant,
  children,
}: {
  variant: SkinVariant;
  children: React.ReactNode;
}) {
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [state, setState] = React.useState<CopyState>("idle");
  const timerRef = React.useRef<number>();

  const handleCopy = async () => {
    // iframe 内でフォーカスが manager 側にあると clipboard API が拒否されるため先に取る
    window.focus();
    let css = getSkinCSS(variant);
    // レンダリング中の要素から controls で指定した値（CSSカスタムプロパティ）を拾う
    const inline = boxRef.current
      ?.querySelector<HTMLElement>(".gsk")
      ?.getAttribute("style");
    if (inline) {
      css += `\n/* このストーリーで指定している値 */\n.gsk{${inline}}\n`;
    }
    try {
      await copyText(css);
      setState("copied");
    } catch (err) {
      console.error("CSSのコピーに失敗:", err);
      setState("error");
    }
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setState("idle"), 1600);
  };

  React.useEffect(() => () => window.clearTimeout(timerRef.current), []);

  return (
    <div ref={boxRef} style={{ maxWidth: 560 }}>
      {children}
      <div style={{ marginTop: 16, display: "flex", gap: 8, alignItems: "center" }}>
        <button
          type="button"
          style={buttonStyle}
          onClick={handleCopy}
          data-testid="copy-css"
        >
          {labels[state]}
        </button>
        <span style={{ fontSize: 12, opacity: 0.7 }}>
          React なしでも使える素の CSS（class 名の使い方コメント付き）
        </span>
      </div>
    </div>
  );
}

/** ストーリー内サンプル用の共通コンテンツ */
export function SampleContent({ title, note }: { title: string; note: string }) {
  return (
    <>
      <h2 style={{ fontSize: 18, margin: "0 0 8px" }}>{title}</h2>
      <p style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.7, margin: 0 }}>{note}</p>
    </>
  );
}
