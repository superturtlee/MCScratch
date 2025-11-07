# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2024-11-07

### Added
- Migrated entire ScratchX extension to Scratch 3.0 format
- Complete Chinese language support (完整中文支持)
- English language translations
- All Minecraft agent commands (move, turn, place, destroy, till, attack, collect, drop)
- World manipulation commands (fill, clone, setBlock, testForBlock, testForBlocks)
- Entity management (teleport, summon, kill)
- Inventory management (getItemDetail, getItemSpace, getItemCount, transferTo)
- Redstone detection
- Weather and time control
- Comprehensive documentation in both English and Chinese
- Usage examples (EXAMPLES.md)
- MIT License

### Changed
- Converted from ScratchX format to Scratch 3.0 extension format
- Updated block definitions to use Scratch 3.0 API
- Migrated to ES6 class-based structure
- Improved internationalization support using format-message

### Technical Details
- Uses Scratch 3.0 Extension API
- Supports ArgumentType and BlockType from scratch-vm
- Includes 40+ command blocks
- 4 menu categories: blocks, decorations, tools, miscellaneous
- Connection status monitoring
- Async command support with Promises

### Compatibility
- Requires Scratch 3.0 (scratch-vm 0.2.0 or higher)
- Minecraft Education Edition or Minecraft with Code Connection
- Code Connection application
- Loads cc-client.js from https://mojang.github.io/cc-client.js

## [Pre-release] - Before 2024-11-07

### Original ScratchX Version
- Basic ScratchX extension for Minecraft Code Connection
- English-only support
- Legacy ScratchX block format
