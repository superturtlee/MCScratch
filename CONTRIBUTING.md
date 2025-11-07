# Contributing to MCScratch

Thank you for your interest in contributing to MCScratch! This document provides guidelines for contributing to the project.

## 贡献指南

感谢您对 MCScratch 项目的贡献兴趣！本文档提供了为项目做出贡献的指南。

---

## How to Contribute / 如何贡献

### Reporting Bugs / 报告错误

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Minecraft and Scratch versions
- Any error messages

如果您发现错误，请创建一个包含以下内容的问题：
- 清晰的问题描述
- 重现步骤
- 预期与实际行为
- Minecraft 和 Scratch 版本
- 任何错误消息

### Suggesting Enhancements / 建议增强功能

For new features or improvements:
- Describe the enhancement clearly
- Explain why it would be useful
- Provide examples if possible

对于新功能或改进：
- 清楚地描述增强功能
- 解释为什么它会有用
- 如果可能，提供示例

### Pull Requests / 拉取请求

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style / 代码风格

- Use ES6+ JavaScript features
- Follow existing code formatting
- Add comments for complex logic
- Include JSDoc comments for functions
- Keep functions small and focused

### Adding Translations / 添加翻译

To add a new language:

1. Create a new JSON file in `src/extensions/scratch3_mcscratch/translations/`
2. Use the language code as filename (e.g., `es.json` for Spanish)
3. Copy the structure from `en.json`
4. Translate all strings
5. Test with Scratch 3.0

### Testing / 测试

Before submitting:
- Validate JSON files
- Check JavaScript syntax with Node.js
- Test with actual Minecraft Code Connection
- Verify translations appear correctly
- Test all block types (command, reporter, boolean)

### Documentation / 文档

- Update README.md if adding features
- Add examples to EXAMPLES.md for new commands
- Update CHANGELOG.md with your changes
- Maintain bilingual documentation (English and Chinese)

## Code of Conduct / 行为准则

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the project goals
- Help others learn and grow

保持尊重和包容
提供建设性的反馈
专注于项目目标
帮助他人学习和成长

## Questions? / 有问题？

Feel free to:
- Open an issue for discussion
- Ask in pull request comments
- Suggest improvements to this guide

随时：
- 开启问题进行讨论
- 在拉取请求评论中询问
- 建议改进本指南

---

Thank you for contributing! / 感谢您的贡献！
