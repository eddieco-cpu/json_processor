# 隨筆

一些重要的隨筆

&nbsp;

## 如何觀看 .md 呈現

VSCode 內建支援 Markdown 預覽，不需要安裝額外的擴充套件：

打開 .md 檔案

按下 Ctrl + Shift + V 即可開啟 Markdown 預覽

&nbsp;

## 套件隨筆

一些好用、搭配的套件介紹

&nbsp;

### lucide

---

#### 目的

Lucide 是一個 開源的圖示（Icons）庫，主要用於 React、Vue、Svelte、Solid.js 以及普通的 HTML/JS 項目。它的設計基於 Feather Icons，並提供了更多圖示，還維護得更活躍。

#### 如何安裝 in react/next

```
npm install lucide-react
```

#### 基本使用

```jsx
import { Search, User } from "lucide-react";

export default function App() {
	return (
		<div>
			<Search size={24} /> {/* 搜索圖示 */}
			<User color="blue" /> {/* 使用者圖示 */}
		</div>
	);
}
```

&nbsp;

## 如何開始 next + tailwind + chadcn with sample

- 從 light/dark mode 開始
