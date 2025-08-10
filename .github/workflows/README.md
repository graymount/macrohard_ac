# GitHub Actions 配置说明

## 设置 GitHub Actions 自动部署

如果你想使用 GitHub Actions 自动部署到 Cloudflare Pages，需要在 GitHub 仓库中设置以下 Secrets：

### 必需的 Secrets

1. **CLOUDFLARE_API_TOKEN**
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
   - 点击 "Create Token"
   - 使用 "Custom token" 模板
   - 权限设置：
     - Account: Cloudflare Pages:Edit
     - Zone: Zone:Read (如果使用自定义域名)
   - 复制生成的 token

2. **CLOUDFLARE_ACCOUNT_ID**
   - 在 Cloudflare Dashboard 右侧边栏找到 "Account ID"
   - 复制该 ID

### 在 GitHub 中添加 Secrets

1. 进入你的 GitHub 仓库
2. 点击 "Settings" → "Secrets and variables" → "Actions"
3. 点击 "New repository secret"
4. 添加上述两个 secrets

### 工作流说明

- **触发条件**: 推送到 `main` 或 `master` 分支时自动运行
- **构建环境**: Ubuntu 最新版本，Node.js 18
- **构建步骤**: 
  1. 检出代码
  2. 设置 Node.js 环境
  3. 安装依赖
  4. 构建应用
  5. 部署到 Cloudflare Pages

### 注意事项

- 如果你已经通过 Cloudflare Dashboard 连接了 Git 仓库，可能不需要使用 GitHub Actions
- GitHub Actions 部署适合需要更复杂构建流程或环境变量管理的场景
- 推荐优先使用 Cloudflare Dashboard 的原生 Git 集成，更简单且功能完整

### 禁用自动部署

如果不需要 GitHub Actions 自动部署，可以：
1. 删除 `.github/workflows/deploy-cloudflare.yml` 文件
2. 或者在文件中添加条件跳过：`if: false`