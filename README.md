# glass-skin

**デモ(Storybook): https://kuwadakouhei.github.io/glass-skin/**

React 用の「スキン付き背景サーフェス」コンポーネント集。
ガラス・すりガラス・反射・オーロラ・金属・カーボン・紙・ホログラムの 8 種類のスキンを、依存ゼロ（React のみ）で提供します。

## 特徴

- **8 種類のスキン** — glassmorphism 系 3 種 + テクスチャ系 5 種
- **依存ゼロ** — CSS-in-JS ライブラリ不要。スタイルは初回マウント時に `<style>` タグを 1 度だけ注入
- **SSR セーフ** — `useInsertionEffect` ベースで Next.js 等でも安全
- **ESM / CJS / TypeScript 型定義** 同梱
- `prefers-reduced-motion` に対応（アニメーションを自動停止）

## インストール

```bash
npm install glass-skin
```

## 使い方

```tsx
import { GlassSkin, FrostSkin, ReflectSkin, AuroraSkin } from "glass-skin";

function Example() {
  return (
    <AuroraSkin style={{ padding: 32 }}>
      <GlassSkin style={{ padding: 24 }} blur={12} radius={20}>
        <h2>ガラスカード</h2>
        <p>背景が透けて見えます</p>
      </GlassSkin>
    </AuroraSkin>
  );
}
```

`variant` を切り替えられる汎用コンポーネントもあります。

```tsx
import { Skin } from "glass-skin";

<Skin variant="holo" style={{ padding: 24 }}>ホログラム</Skin>
```

## コンポーネント一覧

| コンポーネント | 見た目 | 主な props |
| --- | --- | --- |
| `GlassSkin` | 透明なガラス板 | `tint` `blur` `saturation` |
| `FrostSkin` | 半透明のすりガラス | `tint` `blur` `grain` |
| `ReflectSkin` | 光の帯が走る反射ガラス | `sheenColor` `speed` `trigger`(`"loop"`/`"hover"`) |
| `AuroraSkin` | ゆらめくオーロラ | `colors`(最大3色) `background` `speed` |
| `MetalSkin` | ブラシメタル | `angle`(ヘアライン方向) |
| `CarbonSkin` | カーボンファイバー | `scale`(織り目サイズ) |
| `PaperSkin` | 紙・和紙の質感 | `tint` `grain` |
| `HoloSkin` | 虹色ホログラム | `speed` |

全コンポーネント共通の props:

| prop | 説明 |
| --- | --- |
| `as` | レンダリングする要素（既定: `div`） |
| `radius` | 角丸。数値は px（既定: `16px`） |
| その他 | `className` / `style` / イベントハンドラ等の HTML 属性をそのまま透過 |

> **メモ:** ガラス系スキン（Glass / Frost / Reflect）は `backdrop-filter` を使うため、
> 背後にカラフルなコンテンツがあるほど効果が分かりやすくなります。

## カタログ（Storybook）

各スキンを controls で調整しながら確認でき、**「CSSをコピー」ボタン**で
そのスキンを React なしでも使える素の CSS をクリップボードにコピーできます。

```bash
npm install
npm run storybook   # http://localhost:6006
```

シンプルな Vite デモも残しています。

```bash
npm run dev   # http://localhost:5199
```

## CSS だけ使いたい場合（getSkinCSS）

コンポーネントを使わず、生成済みの CSS 文字列だけ取り出せます。

```ts
import { getSkinCSS, SKIN_CLASS_NAMES } from "glass-skin";

getSkinCSS("frost");        // frost スキンの自己完結 CSS（コメント付き）
SKIN_CLASS_NAMES["frost"];  // "gsk gsk-frost" — 要素に付ける class 名
```

## ビルドと npm への公開

```bash
npm run build       # dist/ に ESM + CJS + 型定義を出力
npm login
npm publish --access public
```

公開前のチェックリスト:

1. `package.json` の `name` が npm 上で空いているか確認（`npm view <name>`）。取られていた場合はスコープ付き（例: `@yourname/glass-skin`）に変更
2. `version` を更新（[semver](https://semver.org/lang/ja/) に従う）
3. `npm pack --dry-run` で同梱ファイル（`dist` のみ）を確認

## ライセンス

MIT
