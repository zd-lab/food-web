禾间 HEJIAN · Vue 3 餐馆首页

技术栈：Vue 3 + Vite + JavaScript，使用单文件组件和 <script setup>。
保留原页面文案、图片、视觉样式、响应式布局、菜单筛选、移动导航与预约草稿功能。

开发与构建
推荐 Node.js 24 LTS、pnpm 11.25.0（packageManager 已固定版本）。
在 hejian 目录执行：
  pnpm install --frozen-lockfile
  pnpm dev
  pnpm build
  pnpm preview

开发默认地址：http://127.0.0.1:5173
生产预览默认地址：http://127.0.0.1:4173
端口被占用时，以终端显示的地址为准。
生产构建输出到 dist，将整个 dist 上传到静态 HTTP 服务即可。
资源路径使用相对路径，支持部署到子目录；请通过 HTTP 访问，不要直接双击 HTML。

此电脑尚未配置 Node/pnpm 的 PATH，可在 PowerShell 中运行：
  cd E:\dz-codex\codex-shop\hejian
  $env:PATH = 'C:\Users\董正\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;' + $env:PATH
  $taskPnpm = 'C:\Users\董正\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd'
  & $taskPnpm dev
也可将最后一行的 dev 改为 build 或 preview。
上述内置运行时路径属于当前电脑；其他电脑请安装 Node.js 与 pnpm。

源码结构
  index.html                 页面标题、描述及入口
  src/main.js                Vue 应用入口
  src/App.vue                首页内容及组件组合
  src/components/            导航、菜单、预约弹窗
  src/menu.js                菜品及分类数据
  src/webmcp.js              可选 WebMCP 接口注册与清理
  src/style.css              原有视觉样式和响应式布局
  src/assets/                本地图片
  vite.config.js             Vite 配置
  pnpm-lock.yaml             依赖锁文件
  pnpm-workspace.yaml        仅允许 esbuild 运行依赖构建脚本

请修改 src 中的源码；dist 是可重新生成的构建产物，构建时会覆盖。
不引入路由、全局状态库或 UI 组件库。

预约与 WebMCP
预约只在页面内整理信息，不上传、不持久化个人信息，也不代表餐馆已确认预约。
品牌、菜单、价格和营业时间均为设计示例，正式上线前请替换为真实信息。
支持 WebMCP 的浏览器可调用：
  filter_seasonal_menu：category 为 all、main 或 light，返回分类及菜名；非法分类报错。
  open_reservation_draft：打开草稿表单，返回 { opened: true, status: 'draft_only' }。
不支持 WebMCP 的浏览器仍可正常使用全部页面功能。
组件卸载或 pagehide 时清理工具注册；弹窗关闭或卸载时恢复背景滚动。

验证记录（2026-10-09）
已通过依赖安装及 Vite 生产构建。
已用 Edge 无头浏览器验证 1440px 桌面和 390px 手机布局，关键区块与原版几何尺寸差异小于 1px，无横向溢出。
图片加载、菜单三种分类、移动导航及锚点、三个预约入口、必填/空白称呼/过去日期校验、草稿生成、关闭按钮/Esc/遮罩关闭均通过。
WebMCP 使用模拟 document.modelContext 验证名称、返回值、非法分类和生命周期清理；未验证浏览器原生 WebMCP 实现。
布局对比统一禁用远程字体，使用本地回退字体；Google Fonts 可用时仍优先加载 Noto Serif SC。
原版备份与前后对比截图：D:\科研软件\Codex\2026-10-09-hejian-vue3\work

图片来源（Unsplash License）
Arielle Allouche — https://unsplash.com/photos/steak-and-vegetable-on-plate-with-wine-wKxC9_MzpeQ
Janko Ferlič — https://unsplash.com/photos/flat-lay-photography-of-pasta-platter-nVPfPXc3eis
Taylor Kiser — https://unsplash.com/photos/vegetable-salad-on-white-ceramic-bowl-EvoIiaIVRzU
