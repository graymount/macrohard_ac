# 🔧 Cloudflare Pages 部署问题修复指南

## 问题诊断

您遇到的问题是 Cloudflare Pages 无法正确加载 CSS 和 JavaScript 文件，导致页面样式丢失。

### 错误分析：
- **404 错误**：`/_next/static/` 目录下的文件无法访问
- **React Hydration 错误**：由于 JS 文件加载失败导致的连锁反应

## 解决方案

### 方法 1：在 Cloudflare Dashboard 中更新构建设置

1. **登录 Cloudflare Dashboard**
   - 访问：https://dash.cloudflare.com/
   - 进入您的 Pages 项目

2. **更新构建配置**
   
   进入 **Settings** → **Builds & deployments** → **Build configurations**
   
   更新为以下设置：
   
   | 设置 | 值 |
   |------|-----|
   | **框架预设** | None (不要选择 Next.js) |
   | **构建命令** | `npm run build:cf` |
   | **构建输出目录** | `out` |
   | **Node 版本** | 18 或更高 |

3. **环境变量**（如果需要）
   - 添加 `NODE_VERSION` = `18`

4. **重新部署**
   - 点击 **Save** 
   - 触发新的部署：**Deployments** → **Retry deployment**

### 方法 2：使用 Direct Upload（直接上传）

如果自动构建仍有问题，可以使用直接上传方式：

```bash
# 1. 本地构建
npm run build:cf

# 2. 安装 Wrangler（如果还没安装）
npm install -g wrangler

# 3. 登录 Cloudflare
wrangler login

# 4. 直接上传构建结果
wrangler pages deploy out --project-name=macrohard-academic --compatibility-date=2024-01-15
```

### 方法 3：创建 functions 目录（高级）

如果上述方法都不行，创建一个 functions 目录来处理路由：

1. 创建 `/functions/_middleware.js`：

```javascript
export async function onRequest(context) {
  const url = new URL(context.request.url);
  
  // 处理 _next 静态资源
  if (url.pathname.startsWith('/_next/')) {
    return context.env.ASSETS.fetch(context.request);
  }
  
  // 处理其他请求
  return context.next();
}
```

## 验证部署

部署成功后，请检查：

1. **打开浏览器开发者工具**
   - Network 标签页
   - 刷新页面
   - 确认所有 CSS/JS 文件返回 200 状态码

2. **检查关键文件**
   - `/_next/static/css/*.css` - 样式文件
   - `/_next/static/chunks/*.js` - JavaScript 文件
   - `/favicon.ico` - 网站图标

3. **清除缓存**
   - 浏览器：Cmd+Shift+R (Mac) 或 Ctrl+Shift+R (Windows)
   - Cloudflare：Dashboard → Caching → Purge Everything

## 常见问题

### Q: 为什么不选择 "Next.js" 预设？
A: Next.js 预设是为 SSR 应用设计的。我们的应用是静态导出（SSG），需要使用自定义构建命令。

### Q: 构建成功但样式仍然丢失？
A: 检查以下几点：
1. 确保使用 `npm run build:cf` 命令
2. 输出目录必须是 `out`
3. 清除 Cloudflare 和浏览器缓存

### Q: 如何确认文件结构正确？
A: 在 Cloudflare Dashboard 中查看部署详情，确保有以下目录：
- `/_next/static/css/`
- `/_next/static/chunks/`
- `/_next/static/media/`

## 紧急回滚

如果新部署出现问题：

1. 进入 **Deployments** 页面
2. 找到之前正常工作的部署
3. 点击 **⋮** → **Rollback to this deployment**

## 需要帮助？

如果问题仍未解决，请提供：
1. Cloudflare 部署日志
2. 浏览器控制台错误截图
3. Network 标签页截图（显示 404 错误）

---

最后更新：2024-01-15