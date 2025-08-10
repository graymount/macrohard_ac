# Cloudflare Pages 部署指南

本项目已经配置为与 Cloudflare Pages 兼容。以下是详细的部署步骤。

## 方法一：通过 Cloudflare Dashboard 部署（推荐）

### 前提条件
- 一个 Cloudflare 账户
- 项目代码已推送到 GitHub/GitLab 仓库

### 步骤

1. **登录 Cloudflare Dashboard**
   - 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 登录你的账户

2. **创建新的 Pages 项目**
   - 点击左侧导航栏的 "Pages"
   - 点击 "Create a project"
   - 选择 "Connect to Git"

3. **连接 Git 仓库**
   - 选择你的 Git 提供商（GitHub/GitLab）
   - 授权 Cloudflare 访问你的仓库
   - 选择包含项目代码的仓库

4. **配置构建设置**
   - **项目名称**: 输入你想要的项目名称
   - **生产分支**: 选择 `main` 或 `master`
   - **框架预设**: 选择 "Next.js (Static HTML Export)"
   - **构建命令**: `npm run build`
   - **构建输出目录**: `out`

5. **环境变量（如果需要）**
   - 如果你的应用使用环境变量，在 "Environment variables" 部分添加它们
   - 例如：`GA_TRACKING_ID` 用于 Google Analytics

6. **部署**
   - 点击 "Save and Deploy"
   - Cloudflare 将自动构建和部署你的应用

## 方法二：使用 Wrangler CLI 部署

### 安装 Wrangler
```bash
npm install -g wrangler
```

### 登录 Cloudflare
```bash
wrangler login
```

### 构建项目
```bash
npm run build
```

### 创建 Pages 项目
```bash
wrangler pages project create macrohard-academic
```

### 部署
```bash
wrangler pages deploy out --project-name=macrohard-academic
```

## 当前项目配置说明

你的项目已经包含以下 Cloudflare Pages 优化配置：

### next.config.js 配置
```javascript
const nextConfig = {
  output: 'export',           // 静态导出
  images: {
    unoptimized: true,        // 禁用图片优化（静态导出需要）
  },
  distDir: 'out',            // 输出目录
  trailingSlash: true,       // 添加尾部斜杠
  skipTrailingSlashRedirect: true,
  generateBuildId: async () => {
    return Date.now().toString()  // 缓存失效
  },
}
```

这些配置确保：
- 应用被导出为静态文件
- 图片不使用 Next.js 优化（Cloudflare 不支持）
- 输出到 `out` 目录
- 处理尾部斜杠问题

## 自动部署设置

每次你推送代码到连接的 Git 分支时，Cloudflare Pages 会自动：
1. 检测代码变更
2. 运行构建命令 (`npm run build`)
3. 部署到生产环境
4. 提供预览链接用于测试

## 自定义域名

1. 在 Cloudflare Dashboard 中，进入你的 Pages 项目
2. 点击 "Custom domains" 标签
3. 点击 "Set up a custom domain"
4. 输入你的域名
5. 按照指示配置 DNS 记录

## 环境变量

如果你需要在生产环境中设置环境变量：
1. 在 Pages 项目的 "Settings" → "Environment variables"
2. 添加变量（分别为 Production 和 Preview 环境）

## 常见问题

### 1. 构建失败
- 检查 Node.js 版本兼容性
- 确保所有依赖都已正确安装
- 查看构建日志中的错误信息

### 2. 路由问题
- 确保 `trailingSlash: true` 设置正确
- 检查动态路由是否正确导出

### 3. 图片显示问题
- 确保 `images.unoptimized: true` 已设置
- 使用相对路径引用图片

## 性能优化

Cloudflare Pages 自动提供：
- 全球 CDN 分发
- 自动 HTTP/2 和 HTTP/3
- Brotli 压缩
- 免费 SSL 证书
- DDoS 保护

## 监控和分析

1. 在 Cloudflare Dashboard 中查看：
   - 部署历史
   - 性能指标
   - 错误日志
   - 访问统计

2. 使用 Cloudflare Analytics 获取详细的访问数据

## 部署后验证

部署完成后，请验证：
- [ ] 所有页面正常加载
- [ ] 主题切换功能正常
- [ ] 所有工具功能正常
- [ ] 响应式设计在各设备上正常
- [ ] SEO 元数据正确显示

## 支持的功能

✅ 静态站点生成 (SSG)
✅ 客户端路由
✅ 环境变量
✅ 自定义域名
✅ 自动 HTTPS
✅ 预览部署
❌ 服务器端渲染 (SSR)
❌ API 路由（需要 Cloudflare Workers）
❌ 中间件（需要 Cloudflare Workers）

如果你需要 SSR 或 API 路由功能，请考虑使用 Cloudflare Workers 或修改应用架构。