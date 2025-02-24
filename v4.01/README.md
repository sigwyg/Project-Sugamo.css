# Sugamo.css by Astro

- [10分で Astro サイトを GitHub Pages に構築するスターターキットを作ったよ](https://qiita.com/debiru/items/a5ac8219b696045f88f5)

このスターターキットを用いて Astro サイトを構築しました。

## npm scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Live-Reload-Server で Astro サイトを起動します |
| `npm run build` | Sass と Astro ページのビルドを実行します |
| `npm run watch` | Sass の Watch-Compile を起動します |
| `npm run stylelint` | CSS ファイルを対象に Stylelint を実行します |
| `npm run preview` | `dist` ディレクトリを基に Static-Server で Astro サイトを起動します |
| `npm run astro` | `astro` コマンドを実行します |

## サイト開発の進め方

### 初期設定

```
# 作業ディレクトリへ移動する
cd /path/to

# リポジトリを clone する
git clone git@github.com:sigwyg/Project-Sugamo.css.git

# リポジトリディレクトリへ移動する
cd Project-Sugamo.css

# Astro ルートディレクトリへ移動する
cd v4.01

# npm install を実行する
npm install
```

### サイトをプレビュー表示する

```
# Web サーバーを起動する
npm run dev
```

- [http://localhost:4321/](http://localhost:4321/) へアクセスする

### CSS を編集する

```
# Sass の Watch-Compile を起動する
npm run watch

# scss ファイルを編集する
emacs public/assets/user/1/user.scss
```

- `scss` ファイルを保存したら [http://localhost:4321/](http://localhost:4321/) を表示しているブラウザを手動でリロードする

### `dist/*` を生成する

```
# ビルドを実行する
npm run build

# ビルド後のファイルをプレビューする
npm run preview
```
