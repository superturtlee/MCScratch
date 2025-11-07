# Installation Guide / 安装指南

This guide provides step-by-step instructions for installing the MCScratch extension.

本指南提供了安装 MCScratch 扩展的分步说明。

---

## Prerequisites / 前置条件

### Required Software / 必需软件

1. **Minecraft Education Edition** or **Minecraft (Bedrock Edition)** with Code Connection support
   - 我的世界教育版或支持代码连接的基岩版

2. **Code Connection App**
   - Download from: https://aka.ms/meeccapp
   - 下载地址：https://aka.ms/meeccapp

3. **Scratch 3.0** (one of the following):
   - Scratch Desktop (offline editor)
   - Custom Scratch 3.0 build (for advanced users)
   - Modified Scratch 3.0 with extension support

---

## Method 1: Using Scratch Desktop (Recommended) / 方法1：使用 Scratch 桌面版（推荐）

### Step 1: Install Scratch Desktop
1. Download from: https://scratch.mit.edu/download
2. Install and launch the application

第1步：安装 Scratch 桌面版
1. 从 https://scratch.mit.edu/download 下载
2. 安装并启动应用程序

### Step 2: Get scratch-vm
This method requires modifying scratch-vm. You'll need:
```bash
git clone https://github.com/scratchfoundation/scratch-vm.git
cd scratch-vm
npm install
```

第2步：获取 scratch-vm
此方法需要修改 scratch-vm。您需要：
```bash
git clone https://github.com/scratchfoundation/scratch-vm.git
cd scratch-vm
npm install
```

### Step 3: Install the Extension
1. Clone MCScratch repository:
```bash
git clone https://github.com/superturtlee/MCScratch.git
```

2. Copy the extension to scratch-vm:
```bash
cp -r MCScratch/src/extensions/scratch3_mcscratch scratch-vm/src/extensions/
```

第3步：安装扩展
1. 克隆 MCScratch 仓库：
```bash
git clone https://github.com/superturtlee/MCScratch.git
```

2. 将扩展复制到 scratch-vm：
```bash
cp -r MCScratch/src/extensions/scratch3_mcscratch scratch-vm/src/extensions/
```

### Step 4: Register the Extension
Edit `scratch-vm/src/extension-support/extension-manager.js`:

```javascript
const builtinExtensions = {
    // ... existing extensions
    mcscratch: () => require('../extensions/scratch3_mcscratch')
};
```

第4步：注册扩展
编辑 `scratch-vm/src/extension-support/extension-manager.js`：

```javascript
const builtinExtensions = {
    // ... 现有扩展
    mcscratch: () => require('../extensions/scratch3_mcscratch')
};
```

### Step 5: Add Translation Support (Optional)
Copy translation files to scratch-gui:
```bash
cp MCScratch/src/extensions/scratch3_mcscratch/translations/* \
   scratch-gui/src/lib/libraries/extensions/
```

第5步：添加翻译支持（可选）
将翻译文件复制到 scratch-gui：
```bash
cp MCScratch/src/extensions/scratch3_mcscratch/translations/* \
   scratch-gui/src/lib/libraries/extensions/
```

### Step 6: Build and Run
```bash
cd scratch-vm
npm run build
npm link

cd ../scratch-gui
npm link scratch-vm
npm start
```

第6步：构建和运行
```bash
cd scratch-vm
npm run build
npm link

cd ../scratch-gui
npm link scratch-vm
npm start
```

---

## Method 2: Using TurboWarp (Easier for Testing) / 方法2：使用 TurboWarp（更易于测试）

TurboWarp is a Scratch mod that makes it easier to load custom extensions.

TurboWarp 是一个 Scratch 修改版，可以更轻松地加载自定义扩展。

### Step 1: Setup TurboWarp
1. Visit: https://turbowarp.org/
2. Or download TurboWarp Desktop: https://desktop.turbowarp.org/

第1步：设置 TurboWarp
1. 访问：https://turbowarp.org/
2. 或下载 TurboWarp 桌面版：https://desktop.turbowarp.org/

### Step 2: Load Extension as URL
1. In TurboWarp, click Extensions → Custom Extension
2. Host your `index.js` file on a web server or use a local file URL
3. Enter the URL to load the extension

第2步：将扩展作为 URL 加载
1. 在 TurboWarp 中，点击扩展 → 自定义扩展
2. 在 Web 服务器上托管您的 `index.js` 文件或使用本地文件 URL
3. 输入 URL 以加载扩展

---

## Setting up Minecraft / 设置 Minecraft

### Step 1: Enable Code Connection
1. Start Minecraft (Education Edition or Bedrock)
2. Create or load a world
3. Press `/` or `T` to open chat
4. Type: `/connect` or enable Code Connection in settings

第1步：启用代码连接
1. 启动 Minecraft（教育版或基岩版）
2. 创建或加载世界
3. 按 `/` 或 `T` 打开聊天
4. 输入：`/connect` 或在设置中启用代码连接

### Step 2: Start Code Connection App
1. Launch the Code Connection application
2. Click "Play" or connect to your Minecraft session
3. Note the connection URL (usually ws://localhost:8080)

第2步：启动代码连接应用
1. 启动代码连接应用程序
2. 点击"播放"或连接到您的 Minecraft 会话
3. 记下连接 URL（通常为 ws://localhost:8080）

### Step 3: Spawn the Agent
In Minecraft chat, type:
```
/agent create
/tp @s @c[type=Agent]
```

第3步：生成代理
在 Minecraft 聊天中输入：
```
/agent create
/tp @s @c[type=Agent]
```

---

## Verifying Installation / 验证安装

### In Scratch / 在 Scratch 中
1. Click "Add Extension" (bottom left)
2. Look for "Minecraft Code Connection" or "我的世界代码连接"
3. Click to load the extension
4. Verify blocks appear in the block palette

### Connection Status / 连接状态
The extension shows connection status:
- 🔴 Red: Failed to load CC client
- 🟡 Yellow: Not connected to Minecraft
- 🟢 Green: Connected and ready

扩展显示连接状态：
- 🔴 红色：无法加载 CC 客户端
- 🟡 黄色：未连接到 Minecraft
- 🟢 绿色：已连接并准备就绪

### Test Blocks / 测试积木
Try these simple blocks:
1. "Teleport to the player"
2. "Move forward"
3. "Turn left"

If these work, your installation is successful!

尝试这些简单的积木：
1. "传送到玩家位置"
2. "向前移动"
3. "左转"

如果这些工作正常，您的安装就成功了！

---

## Troubleshooting / 故障排除

### Extension Not Loading / 扩展未加载
- Check console for errors (F12 in browser)
- Verify file paths are correct
- Ensure scratch-vm is properly built
- 检查控制台错误（浏览器中按 F12）
- 验证文件路径是否正确
- 确保 scratch-vm 正确构建

### Connection Issues / 连接问题
- Verify Minecraft is running with Code Connection enabled
- Check Code Connection app is running
- Ensure firewall allows port 8080
- Try restarting both Minecraft and Code Connection
- 验证 Minecraft 已启用代码连接运行
- 检查代码连接应用是否正在运行
- 确保防火墙允许端口 8080
- 尝试重新启动 Minecraft 和代码连接

### Blocks Not Working / 积木不工作
- Ensure agent is spawned in Minecraft
- Check connection status indicator
- Verify using valid block/item names
- 确保在 Minecraft 中已生成代理
- 检查连接状态指示器
- 验证使用有效的方块/物品名称

---

## Next Steps / 后续步骤

After installation:
1. Read the [README.md](README.md) for feature overview
2. Check [EXAMPLES.md](EXAMPLES.md) for usage examples
3. Explore the blocks and build your first program!

安装后：
1. 阅读 [README.md](README.md) 了解功能概述
2. 查看 [EXAMPLES.md](EXAMPLES.md) 获取使用示例
3. 探索积木并构建您的第一个程序！

---

## Getting Help / 获取帮助

If you need help:
- Check existing GitHub issues
- Create a new issue with details
- Include Minecraft version, Scratch version, and error messages

如果需要帮助：
- 检查现有的 GitHub 问题
- 创建包含详细信息的新问题
- 包含 Minecraft 版本、Scratch 版本和错误消息
