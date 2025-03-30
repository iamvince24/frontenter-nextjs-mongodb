# Front Enter - 前端學習資源平台

Front Enter 是一個專為想成為前端工程師的學習者打造的平台，提供各種前端學習資源的整合與分類。我們收集、分析並分享關於前端課程、學習環境和最新技術趨勢的資訊，幫助您找到最適合自己的學習管道。

![Image.png](https://frontenter-nextjs-mongodb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdlnngrunf%2Fimage%2Fupload%2Fv1743320816%2Fo6zbo2rz9uuhzndrsikh.png&w=3840&q=75)

## 功能特色

- **文章分享**: 使用者可以新增、編輯和發佈文章，分享自己的學習心得和經驗
- **資源收藏**: 使用者可收藏有用的文章，建立個人學習資源庫
- **使用者互動**: 瀏覽其他使用者分享的文章，讓前端學習之路不再孤單

## 技術架構

- **前端框架**: [Next.js](https://nextjs.org/) (App Router)
- **資料庫**: [MongoDB](https://www.mongodb.com/) 搭配 [Prisma ORM](https://www.prisma.io/)
- **身分驗證**: [NextAuth.js](https://next-auth.js.org/) 搭配 Credentials Provider
- **UI 元件**: [shadcn/ui](https://ui.shadcn.com/) 元件庫
- **表單處理**: [React Hook Form](https://react-hook-form.com/) 搭配 [Zod](https://zod.dev/) 驗證
- **資料取得**: [TanStack React Query](https://tanstack.com/query/latest)
- **富文本編輯器**: [Tiptap](https://tiptap.dev/)
- **CSS 框架**: [Tailwind CSS](https://tailwindcss.com/)
- **圖片上傳**: [Next Cloudinary](https://next-cloudinary.spacejelly.dev/)

## 開始使用

### 環境需求

- Node.js 18.0 或更高版本
- MongoDB 資料庫
- Cloudinary 帳號 (用於圖片上傳)

### 環境變數設定

在專案根目錄建立 `.env` 檔案，並新增以下變數：

```other
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/your-database?retryWrites=true&w=majority"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 安裝步驟

1. 複製此專案到本機

```Bash
git clone https://github.com/yourusername/front-enter.git
cd front-enter
```

1. 安裝相依套件

```Bash
npm install
```

1. 初始化 Prisma

```Bash
npx prisma generate
```

1. 執行開發伺服器

```Bash
npm run dev
```

1. 開啟 [http://localhost:3000](http://localhost:3000/) 瀏覽您的應用程式

### 部署

本專案可以部署到 Vercel 平台：

```Bash
npm run build
```

或直接連結到 Vercel 平台進行自動部署。

## 專案結構

```other
├── prisma/              # Prisma 資料庫模型和設定
├── public/              # 靜態資源
├── src/
│   ├── actions/         # 伺服器端操作
│   ├── app/             # Next.js 應用路由
│   │   ├── api/         # API 路由
│   │   └── ...          # 頁面路由
│   ├── components/      # 可重複使用的UI元件
│   ├── features/        # 功能模組
│   │   ├── article/     # 文章相關功能
│   │   ├── auth/        # 身分驗證相關功能
│   │   └── profile/     # 使用者設定相關功能
│   ├── hooks/           # 自訂 React Hooks
│   ├── lib/             # 工具函式和程式庫
│   └── types/           # TypeScript 型別定義
├── .eslintrc.json       # ESLint 設定
├── next.config.js       # Next.js 設定
├── package.json         # 相依套件和腳本
└── tailwind.config.ts   # Tailwind CSS 設定
```

## 程式碼風格

本專案遵循 TypeScript 嚴格型別檢查，並使用 ESLint 和 Prettier 進行程式碼格式化。提交前會透過 husky 觸發程式碼檢查。

```Bash
# 執行程式碼檢查
npm run lint

# 格式化程式碼
npm run format
```

## 特色功能展示

### 文章管理

- 新增文章：`/profile/article/create`
- 編輯文章：`/profile/article/edit/[articleId]`
- 查看個人文章：`/profile/article/self`
- 收藏文章：`/profile/article/collection`

### 使用者管理

- 註冊：`/signup`
- 登入：`/login`
- 個人資料：`/profile`

## 參考資源

- [Next.js 文件](https://nextjs.org/docs)
- [Prisma 文件](https://www.prisma.io/docs)
- [TanStack Query 文件](https://tanstack.com/query/latest/docs/react/overview)
- [Tailwind CSS 文件](https://tailwindcss.com/docs)

## 貢獻方式

歡迎提交 Issue 或 Pull Request 來改進此專案。在提交 PR 前，請確保您的程式碼通過了所有的測試。

## 授權條款

此專案採用 MIT 授權 - 查看 [LICENSE](https://claude.ai/chat/LICENSE) 檔案了解更多詳情。

