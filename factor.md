## 核心定位
**终端极客风 + 极致阅读体验 + 自动化验收**。
彻底弃用 macOS 毛玻璃风格，将全站划分为"终端英雄区"、"项目展示区"、"极客技能区"、"时间线/关于"、"极致博客"以及"100% 锁定动漫区"。利用 MagicUI/SpellUI 的 10+ 组件进行深度重构。

---

## 一、前置环境准备（Agent 顺序执行）

```bash
# 1. 安装核心依赖
npx shadcn-svelte@latest add command dialog card button input accordion separator
pnpm add -D svelte-typewriter svelte-bash @tailwindcss/typography clsx tailwind-merge

# 2. 安装代码规范与测试依赖
pnpm add -D eslint @antfu/eslint-config playwright
npx playwright install chromium
```

---

## 二、全站区域深度设计规范

### 1. 全局布局 (`+layout.svelte`)
- **背景层**：`GridPattern` (静态网格) + `Meteors` (随机流星)。
- **导航**：移除 Dock，改为极简顶部 Breadcrumb 导航 (Home/Blog/Projects/Skills/About/Contact + 当前路径高亮)。
- **交互层**：
  - `Ctrl+K` 唤起 `Command` 面板（全站搜索：导航 + 项目 + 技能）。
  - 全局注入 Smooth Cursor（鼠标尾迹粒子，保留原生光标）。

### 2. 首页英雄区 (Terminal Hero)
- **组件**：`svelte-bash`。
- **视觉**：包裹在 `MagicCard` 中，使用 `BorderBeam` 实现流光边框。
- **功能**：
  - 预设打字机欢迎语："System initialized... Loading portfolio..."
  - **命令集成**：
    - `help`: 输出可用指令列表 (help/dark/light/projects)。
    - `dark`/`light`: 切换全局暗亮模式。
    - `projects`: 模拟文件列表输出，终端内直接可点链接 + 复制确认 toast。
- **彩蛋**：Konami 代码 (↑↑↓↓←→←→BA) 触发后，Signature 动画全屏居中渲染用户姓名，3 秒淡出。

### 3. 项目展示区 (Projects)
- **容器**：`Bento Grid` 布局。
- **单项卡片**：
  - 使用 `MagicCard` 作为底座。
  - **重点项目** (featured)：`Shine Border` 流光边框。
  - **普通项目**：`Neon Gradient Card` 发光背景。
  - 项目标题使用 `Animated Shiny Text`，onHover 触发 shiny 划过效果。
  - 包含 `Spotify Card` 用于展示相关的音频/播客项目（如有）。

### 4. 技能与技术栈 (Skills)
- **组件**：`Icon Cloud` (球形图标云) 展示核心技术栈。
- **列表**：使用 `Animated List` 展示技能详情，**复用 DATA.skills 动态渲染**。
- **特效**：悬浮技能项时触发 `Animated Beam` 指向 Projects 区相关项目（如果项目有匹配技术栈）。

### 5. 极致博客 (Blog)
- **列表页**：使用 `BlurFade` 序贯入场动画。
- **详情页**：
  - **排版**：强制应用 `prose prose-invert` (暗黑模式) + 自定义 JetBrains Mono 字体。
  - **目录**：右侧固定 File Tree 风格目录，支持锚点跳转与当前位置高亮；**移动端 (≤768px) 收起为可展开抽屉**。
  - **互动**：底部使用 `Marquee` 滚动展示"相关阅读"或"标签"。
  - **代码块**：右上角复制按钮，hover 时 opacity 变化。

### 6. 动漫展示区 (Anime - 约束最高)
- **规则**：**禁止修改任何内部代码、样式、逻辑。**
- **增强**：外层包裹 `.anime-isolated` 作用域隔离，内部所有选择器限制在此作用域内，防止全局样式污染。
- **适配**：通过 `clsx` 确保全局样式不会通过选择器污染动漫区。

### 7. 关于我与时间线 (About & Timeline)
- **时间线**：使用 `Arc Timeline` 渲染职业生涯，**DATA.work 数据直接灌入**，自动计算布局。
- **联系方式**：使用 `Interactive Hover Button`。
- **社交链接**：保留现有 Badge 样式。
- **页脚**：`Retro Grid` (透视网格) + `Animated Gradient Text`。

---

## 三、自动化配置与约束

### 1. GitHub Actions (`.github/workflows/main.yml`)
- 必须包含：`pnpm install` -> `pnpm test` -> `pnpm lint` -> `pnpm build` -> `peaceiris/actions-gh-pages` 部署。
- ESLint 必须配置为 `antfu` 风格。
- **CI 必须跑 Playwright 测试**。

### 2. Tailwind 配置
- 颜色体系：`term-bg (#07070a)`, `term-main (#111116)`, `term-green (#22c55e)`。
- 字体：`mono: ['JetBrains Mono', 'Fira Code']`。

---

## 四、Playwright 测试策略

### 测试时机
- **开发期**：每个 phase 完成后跑关键场景。
- **交付前**：全部完成后跑全套测试。
- **CI**：Test → ESLint → GitHub Actions 部署。

### 测试场景
1. Terminal help 命令执行，验证输出包含 "help"/"dark"/"projects" 关键字
2. Ctrl+K 面板呼出 + 搜索功能
3. 项目卡跳转
4. 博客目录锚点跳转
5. 动漫区滚动
6. 移动端 (375px iPhone / 768px iPad) 适配

### 性能指标
- Web Vitals：LCP < 2.5s, FCP, CLS
- 控制台：无 error 级别报错

### 报告输出
- HTML 报告
- 失败时截图 → `tests/screenshots/`
- CI 上传 Artifacts

---

## 五、验收标准

1. **终端感**：全站统一硬核暗黑风，Ctrl+K 面板正常。
2. **彩蛋**：Konami 代码触发 Signature 动画。
3. **博客**：具备美观排版与交互式目录 (右侧固定/移动端抽屉)。
4. **自动化**：pnpm lint 通过，GitHub Action 逻辑正确 (Test → ESLint → Deploy)。
5. **稳定性**：Playwright 测试确保动漫区样式未受全局样式污染，Web Vitals 达标。

---

**指令执行完毕后，请输出完整的重构日志并确保 `pnpm lint` 无报错。**