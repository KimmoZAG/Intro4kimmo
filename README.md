# Intro4kimmo

张睿诚（Kimmo Zhang）的 GitHub Pages 网页版自我介绍 / 求职作品集页面。

## 技术栈

- React 19
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui 基础组件
- lucide-react 图标
- Node.js 22（推荐）

## 当前页面定位

当前版本先完成风格、框架和交互骨架：

- 高级简历 / 求职作品集风格
- 单页个人名片式结构
- 强首屏、项目展示、能力亮点、经历时间线、联系入口
- 明暗主题切换
- 动态背景、玻璃拟态卡片、微交互
- GitHub Pages 自动部署工作流

页面已填入教育经历、代表项目、科研成果、个人荣誉和专业能力。出于公开网页隐私考虑，当前仅展示邮箱与 GitHub，暂不展示手机号。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物会输出到 `dist/`。

## GitHub Pages 部署

仓库已包含 `.github/workflows/deploy.yml`。

建议在 GitHub 仓库中开启：

1. `Settings` → `Pages`
2. `Build and deployment` 选择 `GitHub Actions`
3. 推送到 `main` 分支后自动部署

当前 `vite.config.ts` 使用 `base: './'`，适配 GitHub Pages 项目页部署。
