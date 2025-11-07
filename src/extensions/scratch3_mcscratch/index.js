/**
 * Minecraft Code Connection Extension for Scratch 3.0
 * Migrated from ScratchX extension
 */

const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');

// Load the Code Connection client library
let client = null;
let loadFailed = false;
let connectionUpdateInterval = null;

const statusEnum = Object.freeze({
    NOT_STARTED: { status: 0, msg: "Code Connection not started" },
    NOT_CONNECTED: { status: 1, msg: "Code Connection is not connected to the minecraft" },
    CONNECTED: { status: 2, msg: "Connected" }
});
let connectionStatus = null;

// Block and item lists
const blocks = ['air','cobblestone','stonebrick','mossy_cobblestone','planks','brick_block','stone','dirt','podzol','grass','mycelium','clay','hardened_clay','stained_hardened_clay','sandstone','sand','gravel','log', 'log2', 'nether_brick','soul_sand','bedrock','stone_stairs','oak_stairs','spruce_stairs','birch_stairs','jungle_stairs','acacia_stairs', 'dark_oak_stairs', 'brick_stairs','sandstone_stairs','red_sandstone_stairs','stone_brick_stairs','nether_brick_stairs', 'quartz_stairs', 'purpur_stairs', 'stone_slab',  'wooden_slab','stone_slab2','quartz_block', 'prismarine', 'purpur_block','coal_ore','iron_ore','gold_ore','diamond_ore','lapis_ore','redstone_ore','emerald_ore','quartz_ore', 'obsidian', 'ice', 'packed_ice','snow', 'end_bricks', 'end_stone','allow', 'deny', 'border_block',"netherbrick","netherrack","red_sandstone"].sort();

const decorations = ['beacon','cobblestone_wall', 'waterlily', 'sealantern', 'gold_block','iron_block','diamond_block','lapis_block', 'coal_block','emerald_block','redstone_block', 'snow_layer', 'glass','glowstone','vine','ladder','sponge', 'glass_pane','wooden_door','spruce_door','birch_door','jungle_door','acacia_door','dark_oak_door','iron_door','trapdoor','iron_trapdoor','fence','nether_brick_fence','fence_gate', 'spruce_fence_gate','birch_fence_gate','jungle_fence_gate','acacia_fence_gate', 'dark_oak_fence_gate', 'iron_bars','bed','bookshelf','sign','painting','frame','crafting_table','stonecutter','chest','trapped_chest','furnace','brewing_stand', 'cauldron','noteblock','end_portal_frame', 'anvil','yellow_flower', 'red_flower','double_plant','brown_mushroom','red_mushroom','brown_mushroom_block','red_mushroom_block','cactus','melon_block','pumpkin','lit_pumpkin', 'web', 'hay_block', 'tallgrass','deadbush','sapling','leaves', 'leaves2','cake','skull','flower_pot','monster_egg','mob_spawner','enchanting_table', 'slime', 'ender_chest','board','wool','carpet', 'grass_path', "black_glazed_terracotta","blue_glazed_terracotta","brown_glazed_terracotta","cyan_glazed_terracotta","gray_glazed_terracotta","green_glazed_terracotta","light_blue_glazed_terracotta","magenta_glazed_terracotta","lime_glazed_terracotta","silver_glazed_terracotta","white_glazed_terracotta","yellow_glazed_terracotta","orange_glazed_terracotta","pink_glazed_terracotta","purple_glazed_terracotta","red_glazed_terracotta","concrete","concretepowder","end_crystal","dragon_egg","end_rod","shulker_box"].sort();

const tools = ['rail', 'golden_rail','detector_rail','activator_rail','torch','bucket','tnt', 'lead', 'nametag', 'redstone', 'bow','fishing_rod', 'flint_and_steel','shears', 'clock', 'compass', 'minecart', 'chest_minecart','hopper_minecart','tnt_minecart', 'boat','saddle','horsearmorleather', 'horsearmoriron', 'horsearmorgold', 'horsearmordiamond','spawn_egg','fireball','wooden_sword', 'wooden_hoe','wooden_shovel',  'wooden_pickaxe','wooden_axe',
'stone_sword','stone_hoe','stone_shovel','stone_pickaxe','stone_axe',
'iron_sword', 'iron_hoe','iron_shovel','iron_pickaxe','iron_axe',
'diamond_sword','diamond_hoe','diamond_shovel','diamond_pickaxe','diamond_axe',
'golden_sword','golden_hoe','golden_shovel','golden_pickaxe','golden_axe','leather_helmet','leather_chestplate', 'leather_leggings','leather_boots', 'chainmail_helmet','chainmail_chestplate', 'chainmail_leggings','chainmail_boots','iron_helmet','iron_chestplate', 'iron_leggings','iron_boots', 'diamond_helmet','diamond_chestplate', 'diamond_leggings','diamond_boots', 'golden_helmet','golden_chestplate', 'golden_leggings','golden_boots',  'lever','redstone_lamp',  'redstone_torch','wooden_pressure_plate','stone_pressure_plate','light_weighted_pressure_plate', 'heavy_weighted_pressure_plate','wooden_button',  'stone_button', 'daylight_detector', 'tripwire_hook', 'repeater', 'comparator','dispenser','dropper', 'piston','sticky_piston','observer', 'hopper', 'snowball','ender_pearl','ender_eye', 'camera' , 'portfolio',"elytra","repeating_command_block","chain_command_block","command_block","command_block_minecart","structure_block","totem"].sort();

const miscellaneous = [ 'brick', 'coal','diamond', 'iron_ingot', 'gold_ingot','emerald','stick', 'bowl', 'string', 'feather', 'flint', 'leather',  'rabbit_hide', 'clay_ball', 'sugar', 'quartz', 'paper', 'book', 'arrow','bone', 'emptymap','reeds','wheat', 'wheat_seeds', 'pumpkin_seeds', 'melon_seeds', 'beetroot_seeds', 'egg','apple', 'golden_apple', 'appleenchanted','fish', 'salmon','clownfish', 'pufferfish','cooked_fish', 'cooked_salmon','rotten_flesh','mushroom_stew','bread','porkchop','cooked_porkchop','chicken','cooked_chicken', 'muttonraw',   'muttoncooked', 'beef', 'cooked_beef','melon','carrot', 'potato',  'baked_potato','poisonous_potato','beetroot','cookie','pumpkin_pie','rabbit','cooked_rabbit','rabbit_stew', 'netherstar','magma_cream','blaze_rod','gold_nugget','golden_carrot','speckled_melon','rabbit_foot','ghast_tear','slime_ball', 'blaze_powder', 'nether_wart','gunpowder','glowstone_dust','spider_eye','fermented_spider_eye', 'carrotonastick','experience_bottle','enchanted_book','prismarine_crystals', 'prismarine_shard', 'dye', 'glass_bottle','splash_potion', 'potion',"beetroot_soup" ,"chorus_flower","chorus_fruit","chorus_fruit_popped","chorus_plant","dragon_breath","iron_nugget","lingering_potion","shulker_shell"].sort();

/**
 * Helper function to create block position string
 */
function createBlockPos(x, y, z, isRelative) {
    const prefix = isRelative === 'relative' ? "~" : "";
    return encodeURIComponent(`${prefix}${x} ${prefix}${y} ${prefix}${z}`);
}

/**
 * Helper function to create command with parameters
 */
function createCommand(commandName, input) {
    let params = Object.keys(input);
    let command = `${commandName}`;
    let keyValuePairs = [];

    params.forEach((key) => {
        let value = input[key];
        if (value != null) {
            keyValuePairs.push(`${key}=${value}`);
        }
    });

    if (keyValuePairs.length > 0) {
        command = `${command}?${keyValuePairs.join('&')}`;
    }
    return command;
}

/**
 * Helper function to handle optional strings
 */
function optional(input) {
    return (input && input.trim()) === '' ? null : input;
}

/**
 * Icon for the extension (base64 encoded)
 */
const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DEUIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==';

/**
 * Scratch 3.0 Extension Class
 */
class Scratch3MCScratchExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this._initializeClient();
    }

    /**
     * Initialize Code Connection client
     */
    _initializeClient() {
        // Load the cc_client script dynamically
        if (typeof window !== 'undefined' && window.jQuery) {
            window.jQuery.getScript("https://mojang.github.io/cc-client.js")
                .done(() => {
                    console.log("CC Client loaded");
                    if (typeof window.cc_client !== 'undefined') {
                        client = new window.cc_client(8080);
                        connectionStatus = statusEnum.NOT_STARTED;
                        
                        // Set connection status update interval
                        connectionUpdateInterval = setInterval(() => {
                            if (client && client.connectionStatusUpdate) {
                                client.connectionStatusUpdate((result) => {
                                    if (result) {
                                        connectionStatus = statusEnum.CONNECTED;
                                    } else {
                                        connectionStatus = statusEnum.NOT_CONNECTED;
                                    }
                                });
                            }
                        }, 2000);
                    }
                })
                .fail(() => {
                    console.log("Not able to load CC client");
                    loadFailed = true;
                });
        }
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'mcscratch',
            name: formatMessage({
                id: 'mcscratch.extensionName',
                default: 'Minecraft Code Connection',
                description: 'Name of the extension'
            }),
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'move',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.move',
                        default: 'Move [DIRECTION]',
                        description: 'Move the agent'
                    }),
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'sixDirections',
                            defaultValue: 'forward'
                        }
                    }
                },
                {
                    opcode: 'turn',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.turn',
                        default: 'Turn [DIRECTION]',
                        description: 'Turn the agent'
                    }),
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'rotateDirections',
                            defaultValue: 'left'
                        }
                    }
                },
                {
                    opcode: 'tpToPlayer',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.tpToPlayer',
                        default: 'Teleport to the player',
                        description: 'Teleport agent to player'
                    })
                },
                {
                    opcode: 'place',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.place',
                        default: 'Use or place item in inventory slot [SLOT] at [DIRECTION]',
                        description: 'Place item from inventory'
                    }),
                    arguments: {
                        SLOT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'sixDirections',
                            defaultValue: 'forward'
                        }
                    }
                },
                {
                    opcode: 'destroy',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.destroy',
                        default: 'Destroy [DIRECTION]',
                        description: 'Destroy block'
                    }),
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'sixDirections',
                            defaultValue: 'forward'
                        }
                    }
                },
                {
                    opcode: 'till',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.till',
                        default: 'Till [DIRECTION]',
                        description: 'Till the ground'
                    }),
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'sixDirections',
                            defaultValue: 'forward'
                        }
                    }
                },
                {
                    opcode: 'attack',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.attack',
                        default: 'Attack [DIRECTION]',
                        description: 'Attack in direction'
                    }),
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'sixDirections',
                            defaultValue: 'forward'
                        }
                    }
                },
                {
                    opcode: 'collect',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.collect',
                        default: 'Collect [ITEM]',
                        description: 'Collect items'
                    }),
                    arguments: {
                        ITEM: {
                            type: ArgumentType.STRING,
                            defaultValue: 'all'
                        }
                    }
                },
                {
                    opcode: 'drop',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.drop',
                        default: 'Drop [QUANTITY] item(s) in inventory slot [SLOT] to [DIRECTION]',
                        description: 'Drop items from inventory'
                    }),
                    arguments: {
                        QUANTITY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        SLOT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'fourDirections',
                            defaultValue: 'forward'
                        }
                    }
                },
                {
                    opcode: 'dropAll',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.dropAll',
                        default: 'Drop all items in inventory to [DIRECTION]',
                        description: 'Drop all items'
                    }),
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'fourDirections',
                            defaultValue: 'forward'
                        }
                    }
                },
                {
                    opcode: 'detect',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'mcscratch.detect',
                        default: 'Detect [DIRECTION]',
                        description: 'Detect block'
                    }),
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'sixDirections',
                            defaultValue: 'forward'
                        }
                    }
                },
                {
                    opcode: 'inspect',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mcscratch.inspect',
                        default: 'Inspect at [DIRECTION]',
                        description: 'Inspect block'
                    }),
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'sixDirections',
                            defaultValue: 'forward'
                        }
                    }
                },
                {
                    opcode: 'inspectdata',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mcscratch.inspectdata',
                        default: 'Inspect data at [DIRECTION]',
                        description: 'Inspect block data'
                    }),
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'sixDirections',
                            defaultValue: 'forward'
                        }
                    }
                },
                {
                    opcode: 'getBlockName',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mcscratch.getBlockName',
                        default: 'Block name [BLOCK]',
                        description: 'Get block name'
                    }),
                    arguments: {
                        BLOCK: {
                            type: ArgumentType.STRING,
                            menu: 'blocks',
                            defaultValue: blocks[0]
                        }
                    }
                },
                {
                    opcode: 'getDecorationName',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mcscratch.getDecorationName',
                        default: 'Decoration name [DECORATION]',
                        description: 'Get decoration name'
                    }),
                    arguments: {
                        DECORATION: {
                            type: ArgumentType.STRING,
                            menu: 'decorations',
                            defaultValue: decorations[0]
                        }
                    }
                },
                {
                    opcode: 'getToolName',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mcscratch.getToolName',
                        default: 'Tool name [TOOL]',
                        description: 'Get tool name'
                    }),
                    arguments: {
                        TOOL: {
                            type: ArgumentType.STRING,
                            menu: 'tools',
                            defaultValue: tools[0]
                        }
                    }
                },
                {
                    opcode: 'getMiscellaneousName',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mcscratch.getMiscellaneousName',
                        default: 'Miscellaneous name [MISC]',
                        description: 'Get miscellaneous item name'
                    }),
                    arguments: {
                        MISC: {
                            type: ArgumentType.STRING,
                            menu: 'miscellaneous',
                            defaultValue: miscellaneous[0]
                        }
                    }
                },
                {
                    opcode: 'getItemDetail',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mcscratch.getItemDetail',
                        default: 'Get item detail in the inventory slot [SLOT]',
                        description: 'Get item details'
                    }),
                    arguments: {
                        SLOT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'getItemSpace',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mcscratch.getItemSpace',
                        default: 'Get item space in the inventory slot [SLOT]',
                        description: 'Get item space'
                    }),
                    arguments: {
                        SLOT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'getItemCount',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mcscratch.getItemCount',
                        default: 'Get number of item in the inventory slot [SLOT]',
                        description: 'Get item count'
                    }),
                    arguments: {
                        SLOT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'transferTo',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.transferTo',
                        default: 'Transfer item from inventory slot [SOURCE] to [DEST] quantity [QUANTITY]',
                        description: 'Transfer items between slots'
                    }),
                    arguments: {
                        SOURCE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        DEST: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        QUANTITY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'detectRedstone',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'mcscratch.detectRedstone',
                        default: 'Detect Redstone at [DIRECTION]',
                        description: 'Detect redstone signal'
                    }),
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'sixDirections',
                            defaultValue: 'forward'
                        }
                    }
                },
                {
                    opcode: 'clone',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.clone',
                        default: 'Clone blocks from [FROM_TYPE] position [FROM_X] [FROM_Y] [FROM_Z] to [TO_TYPE] position [TO_X] [TO_Y] [TO_Z] to [DEST_TYPE] position [DEST_X] [DEST_Y] [DEST_Z]',
                        description: 'Clone blocks'
                    }),
                    arguments: {
                        FROM_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'positionType',
                            defaultValue: 'relative'
                        },
                        FROM_X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        FROM_Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        FROM_Z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        TO_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'positionType',
                            defaultValue: 'relative'
                        },
                        TO_X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        TO_Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        TO_Z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        DEST_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'positionType',
                            defaultValue: 'relative'
                        },
                        DEST_X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        DEST_Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        DEST_Z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'executeAsOther',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.executeAsOther',
                        default: 'Execute command [COMMAND] on behalf of [ORIGIN] at [POS_TYPE] position [X] [Y] [Z]',
                        description: 'Execute command as another entity'
                    }),
                    arguments: {
                        COMMAND: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                        ORIGIN: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                        POS_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'positionType',
                            defaultValue: 'relative'
                        },
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        Z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'fill',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.fill',
                        default: 'Fill from [FROM_TYPE] position [FROM_X] [FROM_Y] [FROM_Z] to [TO_TYPE] position [TO_X] [TO_Y] [TO_Z] with [TILE] using tile data [DATA]',
                        description: 'Fill area with blocks'
                    }),
                    arguments: {
                        FROM_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'positionType',
                            defaultValue: 'relative'
                        },
                        FROM_X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        FROM_Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        FROM_Z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        TO_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'positionType',
                            defaultValue: 'relative'
                        },
                        TO_X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        TO_Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        TO_Z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        TILE: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                        DATA: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'give',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.give',
                        default: 'Give [AMOUNT] item(s) [ITEM] to target [PLAYER]',
                        description: 'Give items to player'
                    }),
                    arguments: {
                        AMOUNT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        ITEM: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                        PLAYER: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        }
                    }
                },
                {
                    opcode: 'kill',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.kill',
                        default: 'Kill target [TARGET]',
                        description: 'Kill entity'
                    }),
                    arguments: {
                        TARGET: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        }
                    }
                },
                {
                    opcode: 'setBlock',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.setBlock',
                        default: 'Set block at [POS_TYPE] position [X] [Y] [Z] to block type [TILE] using tile data [DATA]',
                        description: 'Set block at position'
                    }),
                    arguments: {
                        POS_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'positionType',
                            defaultValue: 'relative'
                        },
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        Z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        TILE: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                        DATA: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'summon',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.summon',
                        default: 'Summon entity type [ENTITY] at [POS_TYPE] position [X] [Y] [Z]',
                        description: 'Summon entity'
                    }),
                    arguments: {
                        ENTITY: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                        POS_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'positionType',
                            defaultValue: 'relative'
                        },
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        Z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'testForBlock',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'mcscratch.testForBlock',
                        default: 'Tests whether a block type [TILE] is in a [POS_TYPE] position [X] [Y] [Z]',
                        description: 'Test for block at position'
                    }),
                    arguments: {
                        TILE: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                        POS_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'positionType',
                            defaultValue: 'relative'
                        },
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        Z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'testForBlocks',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'mcscratch.testForBlocks',
                        default: 'Tests whether the pattern between [BEGIN_TYPE] position [BEGIN_X] [BEGIN_Y] [BEGIN_Z] to [END_TYPE] position [END_X] [END_Y] [END_Z] is matched at [DEST_TYPE] position [DEST_X] [DEST_Y] [DEST_Z]',
                        description: 'Test for blocks pattern'
                    }),
                    arguments: {
                        BEGIN_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'positionType',
                            defaultValue: 'relative'
                        },
                        BEGIN_X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        BEGIN_Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        BEGIN_Z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        END_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'positionType',
                            defaultValue: 'relative'
                        },
                        END_X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        END_Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        END_Z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        DEST_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'positionType',
                            defaultValue: 'relative'
                        },
                        DEST_X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        DEST_Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        DEST_Z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'tpToTarget',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.tpToTarget',
                        default: 'Teleport target [VICTIM] to target [DEST]',
                        description: 'Teleport entity to another entity'
                    }),
                    arguments: {
                        VICTIM: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                        DEST: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        }
                    }
                },
                {
                    opcode: 'tpToPos',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.tpToPos',
                        default: 'Teleport target [VICTIM] to [POS_TYPE] position [X] [Y] [Z]',
                        description: 'Teleport entity to position'
                    }),
                    arguments: {
                        VICTIM: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                        POS_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'positionType',
                            defaultValue: 'relative'
                        },
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        Z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'timeSetByName',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.timeSetByName',
                        default: 'Set time to [TIME]',
                        description: 'Set time by name'
                    }),
                    arguments: {
                        TIME: {
                            type: ArgumentType.STRING,
                            menu: 'timeType',
                            defaultValue: 'day'
                        }
                    }
                },
                {
                    opcode: 'timeSetByNumber',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.timeSetByNumber',
                        default: 'Set time to [TIME]',
                        description: 'Set time by number'
                    }),
                    arguments: {
                        TIME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'weather',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mcscratch.weather',
                        default: 'Change weather to [TYPE]',
                        description: 'Change weather'
                    }),
                    arguments: {
                        TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'weatherType',
                            defaultValue: 'clear'
                        }
                    }
                }
            ],
            menus: {
                sixDirections: {
                    acceptReporters: true,
                    items: ['forward', 'back', 'left', 'right', 'up', 'down']
                },
                fourDirections: {
                    acceptReporters: true,
                    items: ['forward', 'back', 'left', 'right']
                },
                rotateDirections: {
                    acceptReporters: true,
                    items: ['left', 'right']
                },
                weatherType: {
                    acceptReporters: true,
                    items: ['clear', 'rain', 'thunder']
                },
                positionType: {
                    acceptReporters: true,
                    items: ['relative', 'absolute']
                },
                timeType: {
                    acceptReporters: true,
                    items: ['day', 'night']
                },
                blocks: {
                    acceptReporters: true,
                    items: blocks
                },
                decorations: {
                    acceptReporters: true,
                    items: decorations
                },
                tools: {
                    acceptReporters: true,
                    items: tools
                },
                miscellaneous: {
                    acceptReporters: true,
                    items: miscellaneous
                }
            }
        };
    }

    // Command implementations
    move(args) {
        if (!client) return;
        const command = `move?direction=${args.DIRECTION}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    turn(args) {
        if (!client) return;
        const command = `turn?direction=${args.DIRECTION}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    place(args) {
        if (!client) return;
        const command = `place?slotNum=${args.SLOT}&direction=${args.DIRECTION}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result));
        });
    }

    attack(args) {
        if (!client) return;
        const command = `attack?direction=${args.DIRECTION}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    destroy(args) {
        if (!client) return;
        const command = `destroy?direction=${args.DIRECTION}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    till(args) {
        if (!client) return;
        const command = `till?direction=${args.DIRECTION}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    collect(args) {
        if (!client) return;
        const command = `collect?item=${args.ITEM}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    drop(args) {
        if (!client) return;
        const command = `drop?slotNum=${args.SLOT}&quantity=${args.QUANTITY}&direction=${args.DIRECTION}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    dropAll(args) {
        if (!client) return;
        const command = `dropall?direction=${args.DIRECTION}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    detect(args) {
        if (!client) return false;
        const command = `detect?direction=${args.DIRECTION}`;
        return client.sync_command(command, "result");
    }

    inspect(args) {
        if (!client) return '';
        const command = `inspect?direction=${args.DIRECTION}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "blockName");
        });
    }

    inspectdata(args) {
        if (!client) return '';
        const command = `inspectdata?direction=${args.DIRECTION}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "data");
        });
    }

    detectRedstone(args) {
        if (!client) return false;
        const command = `detectredstone?direction=${args.DIRECTION}`;
        return client.sync_command(command, "result");
    }

    getItemDetail(args) {
        if (!client) return '';
        const command = `getitemdetail?slotNum=${args.SLOT}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "itemName");
        });
    }

    getItemSpace(args) {
        if (!client) return 0;
        const command = `getitemspace?slotNum=${args.SLOT}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "spaceCount");
        });
    }

    getItemCount(args) {
        if (!client) return 0;
        const command = `getitemcount?slotNum=${args.SLOT}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "stackCount");
        });
    }

    transferTo(args) {
        if (!client) return;
        const command = `transfer?srcSlotNum=${args.SOURCE}&dstSlotNum=${args.DEST}&quantity=${args.QUANTITY}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    tpToPlayer() {
        if (!client) return;
        const command = `tptoplayer`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    tpToTarget(args) {
        if (!client) return;
        const command = `tptargettotarget?victim=${encodeURIComponent(args.VICTIM)}&destination=${encodeURIComponent(args.DEST)}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    tpToPos(args) {
        if (!client) return;
        const command = `tptargettopos?victim=${encodeURIComponent(args.VICTIM)}&destination=${createBlockPos(args.X, args.Y, args.Z, args.POS_TYPE)}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    weather(args) {
        if (!client) return;
        const command = `weather?type=${args.TYPE}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    executeAsOther(args) {
        if (!client) return;
        const command = `executeasother?origin=${encodeURIComponent(args.ORIGIN)}&position=${createBlockPos(args.X, args.Y, args.Z, args.POS_TYPE)}&command=${args.COMMAND}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    kill(args) {
        if (!client) return;
        const command = createCommand('kill', { 'target': optional(args.TARGET) });
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    fill(args) {
        if (!client) return;
        const command = createCommand('fill', {
            'from': createBlockPos(args.FROM_X, args.FROM_Y, args.FROM_Z, args.FROM_TYPE),
            'to': createBlockPos(args.TO_X, args.TO_Y, args.TO_Z, args.TO_TYPE),
            'tileName': args.TILE,
            'tileData': optional(args.DATA)
        });
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    give(args) {
        if (!client) return;
        const command = `give?player=${encodeURIComponent(args.PLAYER)}&itemName=${args.ITEM}&amount=${args.AMOUNT}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    timeSetByNumber(args) {
        if (!client) return;
        const command = `timesetbynumber?time=${args.TIME}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    timeSetByName(args) {
        if (!client) return;
        const command = `timesetbyname?time=${args.TIME}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    setBlock(args) {
        if (!client) return;
        const command = createCommand('setblock', {
            'position': createBlockPos(args.X, args.Y, args.Z, args.POS_TYPE),
            'tileName': args.TILE,
            'tileData': optional(args.DATA)
        });
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    testForBlock(args) {
        if (!client) return false;
        const command = `testforblock?position=${createBlockPos(args.X, args.Y, args.Z, args.POS_TYPE)}&tileName=${args.TILE}`;
        return client.sync_command(command, "matches");
    }

    testForBlocks(args) {
        if (!client) return false;
        const command = `testforblocks?begin=${createBlockPos(args.BEGIN_X, args.BEGIN_Y, args.BEGIN_Z, args.BEGIN_TYPE)}&end=${createBlockPos(args.END_X, args.END_Y, args.END_Z, args.END_TYPE)}&destination=${createBlockPos(args.DEST_X, args.DEST_Y, args.DEST_Z, args.DEST_TYPE)}`;
        return client.sync_command(command, "matches");
    }

    summon(args) {
        if (!client) return;
        const command = `summon?entityType=${args.ENTITY}&spawnPos=${createBlockPos(args.X, args.Y, args.Z, args.POS_TYPE)}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    clone(args) {
        if (!client) return;
        const command = `clone?begin=${createBlockPos(args.FROM_X, args.FROM_Y, args.FROM_Z, args.FROM_TYPE)}&end=${createBlockPos(args.TO_X, args.TO_Y, args.TO_Z, args.TO_TYPE)}&destination=${createBlockPos(args.DEST_X, args.DEST_Y, args.DEST_Z, args.DEST_TYPE)}`;
        return new Promise((resolve) => {
            client.async_command(command, (result) => resolve(result), "success");
        });
    }

    getBlockName(args) {
        return args.BLOCK;
    }

    getDecorationName(args) {
        return args.DECORATION;
    }

    getToolName(args) {
        return args.TOOL;
    }

    getMiscellaneousName(args) {
        return args.MISC;
    }
}

module.exports = Scratch3MCScratchExtension;
