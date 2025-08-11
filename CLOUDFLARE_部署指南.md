# Cloudflare Pages 部署完整指南 ✨

## 📋 项目已准备就绪
您的项目已经完全配置好并准备部署到 Cloudflare Pages！

## 🚀 快速部署步骤

### 方法一：通过 Cloudflare Dashboard 部署（推荐）

#### 第 1 步：登录 Cloudflare
1. 访问 https://dash.cloudflare.com/
2. 使用您的账户登录（如果没有账户，请先注册）

#### 第 2 步：创建 Pages 项目
1. 点击左侧菜单的 **"Pages"**
2. 点击 **"Create a project"** 按钮
3. 选择 **"Connect to Git"**

#### 第 3 步：连接您的 GitHub 仓库
1. 选择 **GitHub** 作为 Git 提供商
2. 点击 **"Connect GitHub"**
3. 授权 Cloudflare 访问您的 GitHub 账户
4. 选择仓库：**macrohard_ac** 或您的仓库名称

#### 第 4 步：配置构建设置（重要！）
请严格按照以下设置填写：

| 设置项 | 值 |
|--------|-----|
| **项目名称** | macrohard-academic（或您喜欢的名称） |
| **生产分支** | main |
| **框架预设** | Next.js (Static HTML Export) |
| **构建命令** | `npm run build` |
| **构建输出目录** | `out` |

#### 第 5 步：点击部署
1. 检查所有设置是否正确
2. 点击 **"Save and Deploy"**
3. 等待部署完成（通常需要 2-5 分钟）

#### 第 6 步：访问您的网站
部署成功后，您将获得一个链接，格式如下：
- `https://macrohard-academic.pages.dev`
- 或您设置的自定义项目名称

---

### 方法二：使用 Wrangler CLI 本地部署

如果您更喜欢命令行操作，可以使用以下方法：

#### 安装 Wrangler
```bash
npm install -g wrangler
```

#### 登录 Cloudflare
```bash
wrangler login
```

#### 部署项目
```bash
# 构建项目
npm run build

# 部署到 Cloudflare Pages
wrangler pages deploy out --project-name=macrohard-academic
```

---

## ✅ 部署后验证清单

部署完成后，请检查以下功能是否正常：

- [ ] 主页加载正常
- [ ] 工具卡片网格布局正确
- [ ] 所有工具页面可以访问
- [ ] 主题切换功能正常（亮色/暗色）
- [ ] 响应式设计在手机上正常
- [ ] 导航菜单工作正常

---

## 🔧 常见问题解决

### 问题 1：构建失败
**解决方案：**
- 确保选择了 **Next.js (Static HTML Export)** 预设
- 构建命令必须是 `npm run build`
- 输出目录必须是 `out`

### 问题 2：页面 404 错误
**解决方案：**
- 检查构建输出目录是否设置为 `out`
- 确保 `next.config.js` 中有 `output: 'export'`

### 问题 3：样式或布局错乱
**解决方案：**
- 清除浏览器缓存
- 在 Cloudflare Dashboard 中清除缓存：
  1. 进入您的 Pages 项目
  2. 点击 "Settings"
  3. 找到 "Purge cache" 并执行

---

## 🌐 自定义域名设置（可选）

如果您有自己的域名，可以按以下步骤设置：

1. 在 Cloudflare Pages 项目中，点击 **"Custom domains"**
2. 点击 **"Set up a custom domain"**
3. 输入您的域名（例如：www.yourdomain.com）
4. 按照提示设置 DNS 记录

---

## 📊 部署信息

### 当前项目配置
- **框架**: Next.js 14.2.5
- **部署类型**: 静态站点生成 (SSG)
- **构建输出**: `out` 目录
- **支持功能**:
  - ✅ 静态页面
  - ✅ 客户端路由
  - ✅ 自动 HTTPS
  - ✅ 全球 CDN
  - ✅ DDoS 保护

### 项目结构
```
macrohard_ac/
├── src/           # 源代码
├── out/           # 构建输出（部署此目录）
├── public/        # 静态资源
├── package.json   # 项目配置
└── next.config.js # Next.js 配置
```

---

## 💡 重要提示

1. **首次部署**：可能需要 5-10 分钟
2. **后续更新**：推送到 GitHub 后自动部署
3. **预览部署**：每个 PR 都会生成预览链接
4. **免费限额**：
   - 500 次构建/月
   - 无限带宽
   - 无限请求

---

## 🆘 需要帮助？

如果遇到任何问题，可以：
1. 查看 Cloudflare Pages 文档：https://developers.cloudflare.com/pages
2. 检查部署日志中的错误信息
3. 确保 GitHub 仓库是最新的

---

## 🎉 部署成功后

恭喜！您的学术工具网站已经部署到 Cloudflare 的全球网络上。

享受以下优势：
- ⚡ 极快的加载速度
- 🌍 全球 CDN 分发
- 🔒 自动 HTTPS 加密
- 📈 99.99% 正常运行时间
- 🛡️ DDoS 保护

祝您使用愉快！