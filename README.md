# Dance Camp — からだが自然に還るとき

長野県松本市・四賀で開催するダンスリトリート「Dance Camp」の公式サイト。
A bilingual (JP / EN) marketing site for a dance retreat in the forests of Matsumoto, Japan.

/ Move. / Heart, dance. Return to nature.

## 技術スタック / Stack

- **Next.js 14** (App Router, JavaScript) — 完全静的サイト（static export）
- **Tailwind CSS 3**
- **Framer Motion**（リビール / clip-path ヒーロー / ホバー演出）
- **Lenis**（スムーズスクロール）
- フォント: Cormorant Garamond（見出し）/ Hanken Grotesk（本文）/ Space Mono（ラベル）/ Noto Serif・Sans JP

## ページ / Pages

| パス | 内容 |
|------|------|
| `/` | Home（ヒーロー → コンセプト → ギャラリー → FAQ） |
| `/gallery` | 3コレクション一覧 → 各 `/gallery/[slug]` |
| `/instructor` | 講師（現在「準備中」） |
| `/venue` | 会場・滞在（四賀環境学習の森） |
| `/contact` | お問い合わせフォーム |

ヘッダーの **Reservation** は外部予約サイトへのリンク（`lib/content.js` の `RESERVATION_URL` を実URLに差し替え）。

## 開発 / Development

> このマシンでは Node を nvm 経由で使用します。新しいターミナルなら自動で読み込まれます。

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルド（out/ に静的書き出し）
```

## コンテンツ編集 / Editing content

- 文言（日英）はすべて `lib/content.js` に集約。
- ギャラリーのコレクション定義は `lib/galleries.js`。
- 写真は `public/images/`、ヒーロー動画は `public/videos/hero.mp4`。

## デプロイ（Cloudflare Pages）/ Deploy

完全静的サイトのため、Cloudflare Pages に静的書き出しで配信できます。

| 設定 | 値 |
|------|-----|
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | `20`（`.node-version` で指定済み） |

> 注意: Cloudflare Pages は1ファイル **25MiB** 上限。ヒーロー動画は 480p / 約18MB に圧縮済みで制限内です。より高画質にする場合は Cloudflare R2 / Stream など外部配信を検討してください。

## ライセンス / License

Private project. All photographs © Dance Camp / Creative Art Village - Aida.
