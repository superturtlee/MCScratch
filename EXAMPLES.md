# Usage Examples / 使用示例

## English

### Example 1: Build a Simple Wall

This example shows how to build a wall using the agent:

```
1. Teleport to the player
2. Repeat 10 times:
   - Place item in inventory slot 1 at forward
   - Move forward
```

### Example 2: Create a Platform

Fill an area with blocks to create a platform:

```
1. Fill from relative position 0 0 0 to relative position 10 0 10 with stone using tile data 0
```

### Example 3: Check for Block

Test if there's a block in front of the agent:

```
If (Detect forward) then:
   - Say "Block detected!"
else:
   - Say "No block"
```

### Example 4: Collect All Items

Move forward and collect items:

```
Repeat 5 times:
   - Move forward
   - Collect all
```

### Example 5: Set Time to Day and Clear Weather

```
1. Set time to day
2. Change weather to clear
```

---

## 中文

### 示例 1：建造简单的墙

此示例展示如何使用代理建造墙：

```
1. 传送到玩家位置
2. 重复 10 次：
   - 在前方放置物品栏槽位 1 的物品
   - 向前移动
```

### 示例 2：创建平台

用方块填充区域以创建平台：

```
1. 填充从相对位置 0 0 0 到相对位置 10 0 10 使用 stone 方块数据 0
```

### 示例 3：检查方块

测试代理前方是否有方块：

```
如果 (检测前方) 那么：
   - 说 "检测到方块！"
否则：
   - 说 "没有方块"
```

### 示例 4：收集所有物品

向前移动并收集物品：

```
重复 5 次：
   - 向前移动
   - 收集 all
```

### 示例 5：设置时间为白天并清除天气

```
1. 设置时间为 day
2. 更改天气为 clear
```

---

## Advanced Examples / 高级示例

### Build a House / 建造房屋

```javascript
// Teleport to player / 传送到玩家
Teleport to the player

// Build floor / 建造地板
Fill from relative position 0 -1 0 to relative position 5 -1 5 with planks using tile data 0

// Build walls / 建造墙壁
Fill from relative position 0 0 0 to relative position 5 3 0 with cobblestone using tile data 0
Fill from relative position 0 0 5 to relative position 5 3 5 with cobblestone using tile data 0
Fill from relative position 0 0 0 to relative position 0 3 5 with cobblestone using tile data 0
Fill from relative position 5 0 0 to relative position 5 3 5 with cobblestone using tile data 0

// Build roof / 建造屋顶
Fill from relative position 0 4 0 to relative position 5 4 5 with planks using tile data 0
```

### Farming Automation / 自动化农业

```javascript
// Till the ground / 耕地
Repeat 10 times:
   Move forward
   Till down
   Move forward

// Plant seeds / 播种
Repeat 10 times:
   Move forward
   Place item in inventory slot 1 at down
   Move forward
```

### Mining Tunnel / 挖掘隧道

```javascript
// Create a tunnel / 创建隧道
Repeat 20 times:
   Destroy forward
   Destroy up
   Move forward
   If (Detect down = false) then:
      Place item in inventory slot 1 at down
```

### Redstone Circuit Detector / 红石电路检测器

```javascript
// Check for redstone signal / 检查红石信号
Forever:
   If (Detect Redstone at down) then:
      Say "Redstone ON"
      // Do something / 执行某些操作
   else:
      Say "Redstone OFF"
   Wait 1 seconds
```

---

## Tips / 提示

### English
1. Always ensure the agent is spawned before running commands
2. Use relative positions for movements relative to the agent
3. Use absolute positions for fixed world coordinates
4. Check inventory slots have items before placing
5. Test your programs with small values first, then scale up

### 中文
1. 在运行命令前始终确保代理已生成
2. 使用相对位置进行相对于代理的移动
3. 使用绝对位置表示固定的世界坐标
4. 放置前检查物品栏槽位是否有物品
5. 先用小数值测试你的程序，然后再扩大规模
