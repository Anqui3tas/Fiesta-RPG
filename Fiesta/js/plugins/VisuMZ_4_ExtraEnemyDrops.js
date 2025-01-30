//=============================================================================
// VisuStella MZ - Extra Enemy Drops
// VisuMZ_4_ExtraEnemyDrops.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_ExtraEnemyDrops = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ExtraEnemyDrops = VisuMZ.ExtraEnemyDrops || {};
VisuMZ.ExtraEnemyDrops.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.05] [ExtraEnemyDrops]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Extra_Enemy_Drops_VisuStella_MZ
 * @base VisuMZ_4_ExtraEnemyDrops
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * By default, RPG Maker MZ limits enemies to only drop up to 3 items max and
 * at very limited drop rates. This plugin allows you to add more than 3 items
 * at drop and at custom rates that aren't limited to a demoninator value.
 * 
 * This plugin also gives the functionality to force specific drops or give any
 * additional bonus drops to make some battles give different rewards despite
 * having the same types of enemies encountered before.
 * 
 * And if you have the VisuStella Battle Core, drops can be visible on the
 * battlefield and spring out of the enemies as they collapse!
 *
 * Features include all (but not limited to) the following:
 * 
 * * More than 3 drops per enemy can be given.
 * * Drop probability is a percentile value and not a demoniator setting.
 * * Make Conditional Drops that only appear depending on the events that took
 *   place during the battle.
 * * JavaScript notetags that let you make conditional drops based on code.
 * * New plugin commands to allow for forced drops and/or bonus drops.
 * * Forced drops will override any existing drops made from the enemy troop.
 * * Bonus drops will be additional drops in addition to those dropped from the
 *   enemy troop.
 * * If you have the Battle Core, drops become visible on the battlefield.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Forced Enemy Drops
 * 
 * - If forced enemy drops are used (through a Plugin Command), then all other
 * drop-related functions will be ignored in favor of the forced enemy drops.
 * This is because all forced drops are made to favor a specific set of drops
 * ordered by the game developer.
 * 
 * - This will prevent visual drops from appearing, too. Any visual drops that
 * have already been made present will also disappear.
 *
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * Visual Drops (Battle Core)
 *
 * - Drops become visible on the battlefield. Once an enemy is defeated, visual
 * drops will appear out of their former position. These drops are shown as
 * icons, representing the EXP, Gold, and Drop Items an enemy will yield if the
 * battle is won.
 * 
 * - This feature can be disabled.
 * 
 * - If this feature is enabled, there is a slight change to the drop system.
 * Previously, drops are determined at the end of battle. Now, to visibly
 * appear upon the defeat of an enemy, they are then determined at the moment
 * of their death.
 * 
 * - What this means is, if an EXP or Gold boost is applied after they've been
 * defeated, it will not be retroactive and apply to the drops that become
 * visible on the battlefield. As a result, the player has to be tactical in
 * when they defeat the enemies after applying the EXP and Gold buffs.
 * 
 * - Depending on the Plugin Parameter settings, if an enemy revives, their
 * drops can be reset. If the reset is allowed, the player can acquire a whole
 * different set of drops upon the enemy's subsequent defeats. This feature can
 * be turned off.
 * 
 * - A reviving enemy will cause its visual drops to disappear.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * === General Drop-Related Notetags ===
 * 
 * The following notetags are related to giving enemies additional drops with
 * more control over probability rates.
 * 
 * ---
 *
 * <Item Drop id: x%>
 * <Item Drop id To id: x%>
 * <Item Drop name: x%>
 * 
 * <Weapon Drop id: x%>
 * <Weapon Drop id To id: x%>
 * <Weapon Drop name: x%>
 * 
 * <Armor Drop id: x%>
 * <Armor Drop id To id: x%>
 * <Armor Drop name: x%>
 *
 * - Used for: Enemy Notetags
 * - Gives the enemy 'x' percent chance to drop the designated item, weapon,
 *   or armor.
 * - Replace 'id' with the ID of the item, weapon, or armor you wish to assign
 *   to the enemy as a potential drop.
 *   - For 'id To id' variants, insert the starting ID and ending ID for the
 *     items, weapons, and/or armors you wish to add as a batch. This will
 *     ignore any entries without a name or with ----- in its name.
 * - With the 'name' notetag variant, replace 'name' with the name of the item,
 *   weapon, or armor you wish to assign to the enemy as a potential drop.
 * - Replace 'x' with a number representing the percentile probability chance
 *   of successfully acquiring that item as a drop.
 * - Insert multiple copies of these notetags if you wish to include more drops
 *   for the enemies.
 * 
 * Examples:
 * 
 * <Item Drop 5: 20%>
 * <Item Drop 5 To 10: 20%>
 * <Item Drop Potion: 30%>
 * 
 * <Weapon Drop 27: 45%>
 * <Weapon Drop 27 To 37: 45%>
 * <Weapon Drop Blade of Reckoning: 55%>
 * 
 * <Armor Drop 19: 72%>
 * <Armor Drop 19 To 23: 72%>
 * <Armor Drop Flame Shield: 90%>
 *
 * ---
 *
 * <Drops>
 *  Item id: x%
 *  Item id To id: x%
 *  Item name: x%
 *  Weapon id: x%
 *  Weapon id To id: x%
 *  Weapon name: x%
 *  Armor id: x%
 *  Armor id To id: x%
 *  Armor name: x%
 * </Drops>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Creates a batch list of item, weapon, armor drops.
 * - This isn't any different than creating individual copies of the above
 *   notetags as far as results go, but some may prefer this approach to make
 *   the drop table look "cleaner".
 * - Replace 'id' with the ID of the item, weapon, or armor you wish to assign
 *   to the enemy as a potential drop.
 *   - For 'id To id' variants, insert the starting ID and ending ID for the
 *     items, weapons, and/or armors you wish to add as a batch. This will
 *     ignore any entries without a name or with ----- in its name.
 * - With the 'name' notetag variant, replace 'name' with the name of the item,
 *   weapon, or armor you wish to assign to the enemy as a potential drop.
 * - Replace 'x' with a number representing the percentile probability chance
 *   of successfully acquiring that item as a drop.
 * 
 * Example:
 *
 * <Drops>
 *  Item 5: 20%
 *  Item Potion: 30%
 *  Weapon 27: 45%
 *  Weapon Blade of Reckoning: 55%
 *  Armor 72: 72%
 *  Armor Flame Shield: 90%
 * </Drops>
 *
 * ---
 * 
 * === Conditional Drop-Related Notetags ===
 * 
 * Conditional drops are drops that only appear once specific conditions have
 * been met. For each condition met, their chances of dropping can be raised
 * higher or lower.
 * 
 * ---
 * 
 * <Conditional Item id Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Item id Drop>
 * 
 * <Conditional Item id To id Drops>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Item id To id Drops>
 * 
 * <Conditional Item name Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Item name Drop>
 * 
 * <Conditional Weapon id Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Weapon id Drop>
 * 
 * <Conditional Weapon id To id Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Weapon id To id Drop>
 * 
 * <Conditional Weapon name Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Weapon name Drop>
 * 
 * <Conditional Armor id Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Armor id Drop>
 * 
 * <Conditional Armor id To id Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Armor id To id Drop>
 * 
 * <Conditional Armor name Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Armor name Drop>
 *
 * - Used for: Enemy Notetags
 * - Create conditional item, weapon, and/or armor drops for this enemy.
 * - Insert multiples of these notetags if you want more than one conditional
 *   drop for this enemy.
 * - Use the associated item, weapon, or armor type notetag for the type of
 *   conditional drop you want for the enemy.
 * - Replace 'id' with the ID number of the item, weapon, or armor to drop.
 *   - For 'id To id' variants, insert the starting ID and ending ID for the
 *     items, weapons, and/or armors you wish to add as a batch. This will
 *     ignore any entries without a name or with ----- in its name.
 * - Replace 'name' with the name of the item, weapon, or armor to drop.
 * - Replace 'condition' with any of the conditions listed in below section.
 * - Replace 'x' with the increase or decrease in percentage drop chance.
 * 
 * ---
 * 
 * -=-=- Condition List -=-=-
 *
 * Replace 'condition' in the notetags in the above section with any of the
 * following to make conditions. These conditions are also used in the Plugin
 * Parameters for the default conditions, too.
 * 
 * ---
 *
 * x >= y
 * x > y
 * x === y
 * x !== y
 * x < y
 * x <= y
 * 
 * - Replace 'x' and 'y' with any of the following:
 *
 * - 'Switch x' (replace 'x' with a number) for switch x's current state.
 * - 'TRUE', 'FALSE', 'ON', 'OFF' for the opposite x/y value.
 * - Using any of these boolean modifiers must be paired with '===' or '!=='
 *
 * - 'Variable x' (replace 'x' with a number) for variable x's current value.
 * - A numeric value representing a hard number.
 * - '50%' or any other percentile number to represent a rate.
 * - '0.5' or any other float number to represent a rate.
 * 
 * - 'Item id Count' for the number of specific items the party owns.
 *   - Replace 'id' with the ID of the item.
 * - 'Item name Count' for the number of specific items the party owns.
 *   - Replace 'name' with the ID of the item.
 * 
 * - 'Weapon id Count' for the number of specific weapons the party owns.
 *   - Replace 'id' with the ID of the weapon.
 * - 'Weapon name Count' for the number of specific weapons the party owns.
 *   - Replace 'name' with the ID of the weapon.
 * 
 * - 'Armor id Count' for the number of specific armors the party owns.
 *   - Replace 'id' with the ID of the armor.
 * - 'Armor name Count' for the number of specific armors the party owns.
 *   - Replace 'name' with the ID of the armor.
 * 
 * - 'Alive Members' for the number of alive party members when drops are
 *   being determined.
 * 
 * - 'Battle Members' for the number of participating party members in battle.
 * 
 * - 'Battle Turns' for the number of turns passed in battle when drops are
 *   being determined.
 * 
 * - 'Dead Members' for the number of dead party members when drops are
 *   being determined.
 * 
 * - 'Death Turn' for the turn the enemy died. If an enemy was revived during
 *   battle, then take the most recent turn the enemy has died.
 * 
 * - 'Enemy Level' for the current level of the enemy if using the 'level'
 *   property for the Game_Enemy object.
 * 
 * - 'Party Gold' for the party's current gold value when drops are
 *   being determined.
 * 
 * - 'Party Members' for the number of total party members in battle.
 * 
 * - 'Times type id Struck' for the number of times the enemy was struck
 *   with 'type' 'id' during battle.
 * - Replace 'type' with 'Element' for the number of times the enemy was struck
 *   with specific elemental damage.
 * - Replace 'type' with 'Item' for the number of times the enemy was struck
 *   with a specific item.
 * - Replace 'type' with 'Skill' for the number of times the enemy was struck
 *   with a specific skill.
 * - Replace 'type' with 'SType' for the number of times the enemy was struck
 *   by any skill of a specifici skill type.
 * - Replace 'type' with 'State' for the number of times the enemy was struck
 *   with a specific state.
 * - Replace 'id' with the type's ID.
 * 
 * - 'Times type name Struck' for the number of times the enemy was struck
 *   with 'type' 'name' during battle.
 * - Replace 'type' with 'Element' for the number of times the enemy was struck
 *   with specific elemental damage.
 * - Replace 'type' with 'Item' for the number of times the enemy was struck
 *   with a specific item.
 * - Replace 'type' with 'Skill' for the number of times the enemy was struck
 *   with a specific skill.
 * - Replace 'type' with 'SType' for the number of times the enemy was struck
 *   by any skill of a specifici skill type.
 * - Replace 'type' with 'State' for the number of times the enemy was struck
 *   with a specific state.
 * - Replace 'name' with the type's name in the database.
 * 
 * ---
 * 
 * Always
 * 
 * - This condition is always met. Use this to set a base drop chance.
 * 
 * ---
 * 
 * Random x%
 * 
 * - Offers a random 'x' chance to increase/decrease drop chance.
 * 
 * ---
 * 
 * Last Strike type id
 * Last Strike type name
 * 
 * - Checks the condition to see if the last struck action against the enemy
 *   was done by a specific action.
 * - Replace 'type' with 'Element' for the last struck element.
 * - Replace 'type' with 'Item' for the last struck item if it was an item.
 *   This will override the 'Skill' and 'SType' types.
 * - Replace 'type' with 'Skill' for the last struck skill if it was a skill.
 *   This will override the 'Item' type.
 * - Replace 'type' with 'SType' for the last struck skill type if it was
 *   a skill. This will override the 'Item' type.
 * - Replace 'type' with 'State' for the last struck state.
 * 
 * ---
 * 
 * Examples:
 * 
 * The following are some examples on how these conditional drops are used:
 * 
 * ---
 * 
 * <Conditional Item Potion Drop>
 *  Always: +20%
 *  Death Turn <= 3: +50%
 * </Conditional Item Potion Drop>
 * 
 * - Conditional drop is the Potion item.
 * - It has a base chance of 20%.
 * - If the enemy was defeated during or before turn 3, increase the drop
 *   chance by another 50%.
 * 
 * ---
 * 
 * <Conditional Weapon Mithril Sword Drop>
 *  Always: +100%
 *  Times SType Magic Struck: -10%
 *  Times SType Spell Struck: -10%
 * </Conditional Weapon Mithril Sword Drop>
 * 
 * - Conditional drop is the Mithril Sword weapon.
 * - It starts off with a 100% chance of a drop.
 * - Each time the enemy is struck with 'Magic' or 'Spell' type attacks,
 *   the drop chance decreases by 10%.
 * 
 * ---
 * 
 * <Conditional Armor Elemental Cloak Drop>
 *  Times Element Fire Struck: +10%
 *  Times Element Ice Struck: +10%
 *  Times Element Thunder Struck: +10%
 *  Times Element Physical Struck: -20%
 *  Times Skill Element Force Struck: +50%
 * </Conditional Armor Elemental Cloak Drop>
 * 
 * - Conditional drop is the Elemental Cloak armor.
 * - Each time the enemy is struck by 'Fire', 'Ice', or 'Thunder' damage,
 *   increase the drop chance by 10%.
 * - Each time the enemy is struck by 'Physical' damage, decrease the drop
 *   chance by 10%.
 * - Each time the enemy is struck by the specific skill 'Element Force',
 *   increase the drop chance by +50%.
 * 
 * ---
 *
 * === JavaScript Notetags: Drops ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional enemy drop manipulation.
 *
 * ---
 *
 * <JS Drops>
 *  code
 *  code
 *  drops.push($dataItems[1]);
 *  drops.push($dataWeapons[2]);
 *  drops.push($dataArmors[3]);
 * </JS Drops>
 *
 * - Used for: Enemy Notetags
 * - Replace 'code' with JavaScript code to make conditional checks in order
 *   to determine which items, weapons, and/or armors would be added to the
 *   drop pool.
 * - The 'drops' variable is an array which contains all of the currently
 *   existing drops from the enemy this notetag is on. It will be returned as
 *   an array upon running the notetag's JavaScript code.
 * - Add to or remove from the 'drops' variable to change up its contents.
 *
 * ---
 * 
 * === Visual Drop-Related Notetags ===
 * 
 * For those who want to customize how some items, weapons, or armors appear as
 * visual drops, use the following notetags.
 * 
 * ---
 *
 * <Visual Drop Icon: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Forces the drop item, weapon, or armor to appear as a different icon.
 * - Replace 'x' with the ID of the icon you wish to show.
 *
 * ---
 *
 * <Visual Drop Rarity: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Sets the item, weapon, or armor drop to be a specific rarity.
 * - Replace 'x' with a rarity value between 0 and 10. The settings applied to
 *   the visual drop will be based on their Plugin Parameter settings.
 * - This is mutually exclusive from the <Visual Drop Tint Color: r, g, b, k>
 *   and <Visual Drop Tint Duration: x> notetags.
 *
 * ---
 *
 * <Visual Drop Tint Color: r, g, b, k>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Sets the tint of visual drop item when it's visible on the battlefield.
 * - Replace 'r' with a red value between -255 and 255.
 * - Replace 'g' with a green value between -255 and 255.
 * - Replace 'b' with a blue value between -255 and 255.
 * - Replace 'k' with a gray value between 0 and 255.
 * - This does not work with the <Visual Drop Rarity: x> notetag.
 *
 * ---
 *
 * <Visual Drop Tint Duration: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Sets the duration of the tint effect.
 * - Replace 'x' with the number of frames to tint the visual drop. The lower
 *   the number, the faster the tint pulses. The higher the number, the slower
 *   the tint pulses.
 *
 * ---
 *
 * <Visual Drop Spawn SFX: filename>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - When the item, weapon, or armor's visual drop spawns on the battlefield,
 *   play a sound effect.
 * - Replace 'filename' with the name of a sound effect from the game project's
 *   /audio/se/ folder. Do not include the file extension.
 * - Example: <Visual Drop Spawn SFX: Float1>
 *
 * ---
 *
 * <Visual Drop Bounce Height: x%>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Alters how bouncy this visual drop is as it spawns on the battlefield.
 * - Replace 'x' with a percentage value on how much higher the visual drop
 *   should bounce than normal (whatever is set in the Plugin Parameters).
 *
 * ---
 *
 * <Visual Drop Bounce SFX: filename>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - When the item, weapon, or armor's visual drop bounces on the battlefield,
 *   play a sound effect.
 * - Replace 'filename' with the name of a sound effect from the game project's
 *   /audio/se/ folder. Do not include the file extension.
 * - Example: <Visual Drop Bounce SFX: Float1>
 *
 * ---
 *
 * <Visual Drop Flag: Rainbow>
 * <Visual Drop Flag: Additive>
 * <Visual Drop Flag: Multiply>
 * <Visual Drop Flag: Screen>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adds visual effects to visual drop when it's on the battlefield.
 * - The 'Rainbow' effect causes the icon's hue to constantly change.
 * - The 'Additive', 'Multiply', and 'Screen', effects are blend modes.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Bonus Reward Plugin Commands ===
 * 
 * ---
 *
 * Bonus Rewards: Clear
 * - Clears all bonus drops.
 *
 * ---
 *
 * Bonus Rewards: Set EXP
 * - Determines additional EXP the player will get in battle by this value.
 *
 *   EXP:
 *   - Determines additional EXP the player will get in battle by this value.
 *
 * ---
 *
 * Bonus Rewards: Set Gold
 * - Determines additional Gold the player will get in battle by this value.
 *
 *   Gold:
 *   - Determines additional Gold the player will get in battle by this value.
 *
 * ---
 *
 * Bonus Rewards: Add Item
 * - Adds the bonus drop the player earns from this battle to have the
 *   following item given at a specific quantity.
 *
 *   Item ID:
 *   - Which item do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the bonus drop to give the player.
 *
 * ---
 *
 * Bonus Rewards: Add Weapon
 * - Adds the bonus drop the player earns from this battle to have the
 *   following weapon given at a specific quantity.
 *
 *   Weapon ID:
 *   - Which weapon do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the bonus drop to give the player.
 *
 * ---
 *
 * Bonus Rewards: Add Armor
 * - Adds the bonus drop the player earns from this battle to have the
 *   following armor given at a specific quantity.
 *
 *   Armor ID:
 *   - Which armor do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the bonus drop to give the player.
 *
 * ---
 * 
 * === Forced Reward Plugin Commands ===
 * 
 * ---
 *
 * Forced Rewards: Clear
 * - Clears all forced drops.
 *
 * ---
 *
 * Forced Rewards: Set EXP
 * - Change the amount of EXP the player will get in battle to this value.
 *
 *   EXP:
 *   - Change the amount of EXP the player will get in battle to this value.
 *
 * ---
 *
 * Forced Rewards: Set Gold
 * - Change the amount of Gold the player will get in battle to this value.
 *
 *   Gold:
 *   - Change the amount of Gold the player will get in battle to this value.
 *
 * ---
 *
 * Forced Rewards: Add Item
 * - Adds the forced drop the player earns from this battle to have the
 *   following item given at a specific quantity.
 *
 *   Item ID:
 *   - Which item do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the forced drop to give the player.
 *
 * ---
 *
 * Forced Rewards: Add Weapon
 * - Adds the forced drop the player earns from this battle to have the
 *   following weapon given at a specific quantity.
 *
 *   Weapon ID:
 *   - Which weapon do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the forced drop to give the player.
 *
 * ---
 *
 * Forced Rewards: Add Armor
 * - Adds the forced drop the player earns from this battle to have the
 *   following armor given at a specific quantity.
 *
 *   Armor ID:
 *   - Which armor do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the forced drop to give the player.
 *
 * ---
 * 
 * === Visual Drop Plugin Commands ===
 * 
 * ---
 *
 * Visual Drops: Visibility
 * - Sets the visibility of visual drops during battle.
 *
 *   Visible:
 *   - Show visual drops during battle?
 *   - This will be reset at the start of next battle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These settings govern the way Visual Drops are handled. These are global
 * rules that apply to all Visual Drops made through this plugin, from the
 * calculations made to determine their radius distance to the number of
 * bounces the drops make to whether or not the drops have shadows.
 *
 * ---
 *
 * General
 * 
 *   Enable?
 *   - Enable Visual Drops?
 *   - You know you want to.
 * 
 *   Reviving Resets Drops:
 *   - Do reviving enemies reset drops?
 *   - For more information, read the Extra Features section.
 *
 * ---
 *
 * Position
 * 
 *   Base Radius:
 *   - Base radius amount for drops.
 * 
 *   +Radius Per Drop:
 *   - Increase radius by this much per extra drop.
 * 
 *   Spin Degrees:
 *   - How many degrees do you want the icon to spin in its largest bounce?
 *   - Use 0 for no spin.
 * 
 *   Delay Between Drops:
 *   - How many milliseconds to delay the appearance of each visual drop?
 *   - Use 0 for no delay.
 * 
 *   Field of View Y:
 *   - What's the distortion rate for the field of view for the item
 *     positioning distribution.
 *
 * ---
 *
 * Bounce
 * 
 *   Bounce Duration:
 *   - Duration of the highest bounce.
 * 
 *   Bounce Total:
 *   - How many times do you want visual drops to bounce?
 *   - Use 0 for no bounces.
 * 
 *   Bounce Height:
 *   - The maximum height for the visual drops to fly out at.
 *   - This will decrease with each bounce.
 * 
 *   Bounce Reduction:
 *   - The rate at which each bounce reduces the duration and height by.
 *
 * ---
 *
 * Bounce SFX
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * Icons
 * 
 *   Offset Y Rate:
 *   - At which rate do you want to offset the visual drop icons off the
 *     ground by?
 * 
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 * ---
 *
 * Shadow
 * 
 *   Show Shadow:
 *   - Show the shadow sprite?
 * 
 *   Shadow Filename:
 *   - Filename used for the visual drop shadow.
 * 
 *   Shadow Offset X:
 *   - Offset the shadow sprite X by this amount.
 *   - Negative numbers go left. Positive numbers go right.
 * 
 *   Shadow Offset Y:
 *   - Offset the shadow sprite Y by this amount.
 *   - Negative numbers go up. Positive numbers go down.
 * 
 *   Shadow Opacity:
 *   - Opacity level of the shadow.
 *   - 0 for transparent. 255 for opaque.
 *
 * ---
 *
 * Opacity
 * 
 *   Fade After Bounce:
 *   - Fade out the visual drops after they finish bouncing?
 * 
 *   Fade After Delay:
 *   - How many milliseconds to delay the fading by if the above option is
 *     selected?
 * 
 *   Opacity Fade Speed:
 *   - What speed should the opacity level fade out by?
 *   - Higher numbers are faster.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: EXP Settings
 * ============================================================================
 *
 * EXP can be depicted as a visual drop from the enemy. Depending on how much
 * EXP the enemy would give, a different setting can be used, determining the
 * icon used and which rarity effect to apply.
 *
 * ---
 *
 * General
 * 
 *   Show EXP Drop:
 *   - Show visual drops for EXP?
 *
 * ---
 *
 * Settings 1 through 10
 * 
 *   EXP Value:
 *   - How much EXP minimum to use this setting?
 * 
 *   Icon:
 *   - Which icon to use for this setting?
 * 
 *   Rarity:
 *   - Which rarity to use for this setting?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold can be depicted as a visual drop from the enemy. Depending on how much
 * Gold the enemy would give, a different setting can be used, determining the
 * icon used and which rarity effect to apply.
 *
 * ---
 *
 * General
 * 
 *   Show Gold Drop:
 *   - Show visual drops for Gold?
 *
 * ---
 *
 * Settings 1 through 10
 * 
 *   Gold Value:
 *   - How much Gold minimum to use this setting?
 * 
 *   Icon:
 *   - Which icon to use for this setting?
 * 
 *   Rarity:
 *   - Which rarity to use for this setting?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Drops Settings
 * ============================================================================
 *
 * These are the usual enemy drops that you're used to. These will factor in
 * extra drops, conditional drops, and drops added through JavaScript as well.
 * You can choose to have the enemy drops reveal their real icons or keep it
 * a surprise for when the player finally access the Victory Aftermath screen.
 *
 * ---
 *
 * General
 * 
 *   Show Enemy Drops:
 *   - Show visual drops for enemy drops?
 * 
 *   Use Unique Icons:
 *   - Show the icons of the drops?
 *   - If not, use the ones below.
 *
 * ---
 *
 * Common Icons
 * 
 *   Common Item Icon:
 *   Common Weapon Icon:
 *   Common Armor Icon:
 *   - What icon do you want to use for common items, weapons, and armors?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Rarity Settings
 * ============================================================================
 *
 * Visual Drop rarities are found in 11 tiers, No Rarity and Rarities 1 through
 * 10. How you use these rarities is up to you, the game dev. However, items of
 * a matching rarity level will display the same tints, durations, and flags.
 * Although more flags can be added later through notetags, matching rarities
 * will exhibit a common ground of flags.
 *
 * ---
 *
 * General
 * 
 *   Show Rarities:
 *   - Show visual effects for different rarities?
 *
 * ---
 *
 * No Rarity and Rarities 1 through 10
 * 
 *   Tint:
 *   - Tone settings for this rarity.
 *   - Format: [Red, Green, Blue, Gray]
 * 
 *   Duration:
 *   - What duration do you want for this rarity?
 * 
 *   Flags:
 *   - What flags do you want to apply to this rarity?
 *   - Flags:
 *     - Rainbow
 *     - Additive
 *     - Multiply
 *     - Screen
 *     - Bounce Height x%
 *     - Bounce SFX: filename 
 *     - Spawn SFX: filename
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.05: February 12, 2021
 * * Bug Fixes!
 * ** Opacity Fade Speed Plugin Parameter now allows you to alter the value
 *    up to 255 now. Fix made by Irina.
 * ** EXP Setting 10 and Gold Setting 10 will no longer be hard limited.
 *    Fix made by Irina.
 * 
 * Version 1.04: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Many of the notetags now have a batch variant to add items, weapons, or
 *    armors into the drop pool en masse. Updated by Yanfly.
 * 
 * Version 1.03: November 22, 2020
 * * Compatibility Update!
 * ** Non-conditional drops should be more compatible with other plugins.
 *    Update made by Yanfly.
 * 
 * Version 1.02: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.01: October 18, 2020
 * * Feature Update!
 * ** Bounce SFX pitch plugin parameter is now uncapped.
 *
 * Version 1.00: October 9, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusRewardsClear
 * @text Bonus Rewards: Clear
 * @desc Clears all bonus drops.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusExpSet
 * @text Bonus Rewards: Set EXP
 * @desc Determines additional EXP the player will get in battle by this value.
 *
 * @arg value:eval
 * @text EXP
 * @desc Determines additional EXP the player will get in battle by this value.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusGoldSet
 * @text Bonus Rewards: Set Gold
 * @desc Determines additional Gold the player will get in battle by this value.
 *
 * @arg value:eval
 * @text Gold
 * @desc Determines additional Gold the player will get in battle by this value.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusAddItem
 * @text Bonus Rewards: Add Item
 * @desc Adds the bonus drop the player earns from this battle to have
 * the following item given at a specific quantity.
 *
 * @arg id:num
 * @text Item ID
 * @type item
 * @desc Which item do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the bonus drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusAddWeapon
 * @text Bonus Rewards: Add Weapon
 * @desc Adds the bonus drop the player earns from this battle to have
 * the following weapon given at a specific quantity.
 *
 * @arg id:num
 * @text Weapon ID
 * @type weapon
 * @desc Which weapon do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the bonus drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusAddArmor
 * @text Bonus Rewards: Add Armor
 * @desc Adds the bonus drop the player earns from this battle to have
 * the following armor given at a specific quantity.
 *
 * @arg id:num
 * @text Armor ID
 * @type armor
 * @desc Which armor do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the bonus drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedRewardsClear
 * @text Forced Rewards: Clear
 * @desc Clears all forced drops.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedExpSet
 * @text Forced Rewards: Set EXP
 * @desc Change the amount of EXP the player will get in battle to this value.
 *
 * @arg value:eval
 * @text EXP
 * @desc Change the amount of EXP the player will get in battle to this value.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedGoldSet
 * @text Forced Rewards: Set Gold
 * @desc Change the amount of Gold the player will get in battle to this value.
 *
 * @arg value:eval
 * @text Gold
 * @desc Change the amount of Gold the player will get in battle to this value.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedAddItem
 * @text Forced Rewards: Add Item
 * @desc Adds the forced drop the player earns from this battle to have
 * the following item given at a specific quantity.
 *
 * @arg id:num
 * @text Item ID
 * @type item
 * @desc Which item do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the forced drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedAddWeapon
 * @text Forced Rewards: Add Weapon
 * @desc Adds the forced drop the player earns from this battle to have
 * the following weapon given at a specific quantity.
 *
 * @arg id:num
 * @text Weapon ID
 * @type weapon
 * @desc Which weapon do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the forced drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedAddArmor
 * @text Forced Rewards: Add Armor
 * @desc Adds the forced drop the player earns from this battle to have
 * the following armor given at a specific quantity.
 *
 * @arg id:num
 * @text Armor ID
 * @type armor
 * @desc Which armor do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the forced drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VisualDropVisible
 * @text Visual Drops: Visibility
 * @desc Sets the visibility of visual drops during battle.
 *
 * @arg Visible:eval
 * @text Visible
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual drops during battle?
 * This will be reset at the start of next battle.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Template
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param VisualDrops
 * @text Visual Drops
 *
 * @param General:struct
 * @text General Settings
 * @parent VisualDrops
 * @type struct<General>
 * @desc General settings regarding Visual Drops.
 * @default {"General":"","Enable:eval":"true","resetOnRevive:eval":"true","Position":"","radius:num":"20","radiusPerIcon:num":"5","angle:num":"1800","msDelay:num":"250","yRateFoV:num":"0.44","Bounce":"","duration:num":"60","bounces:num":"10","height:num":"100","bounceReduction:num":"0.75","SFX":"","sfxFilename:str":"Coin","sfxVolume:num":"90","sfxPitch:num":"100","sfxPan:num":"0","Icons":"","iconOffsetRate:num":"-1.75","iconJumpEasing:str":"Linear","Shadow":"","showShadow:eval":"true","shadowFilename:str":"Shadow1","shadowOffsetX:num":"0","shadowOffsetY:num":"8","shadowOpacity:num":"255","Opacity":"","fadeAfterBounce:eval":"false","fadeAfterDelay:num":"2000","opacityFadeOut:num":"8"}
 *
 * @param Exp:struct
 * @text EXP Settings
 * @parent VisualDrops
 * @type struct<Exp>
 * @desc Settings regarding EXP for Visual Drops.
 * @default {"General":"","show:eval":"true","Setting1":"","Value1:num":"1","Icon1:num":"73","Rarity1:num":"0","Setting2":"","Value2:num":"50","Icon2:num":"73","Rarity2:num":"1","Setting3":"","Value3:num":"100","Icon3:num":"89","Rarity3:num":"2","Setting4":"","Value4:num":"500","Icon4:num":"89","Rarity4:num":"3","Setting5":"","Value5:num":"1000","Icon5:num":"88","Rarity5:num":"4","Setting6":"","Value6:num":"2500","Icon6:num":"88","Rarity6:num":"5","Setting7":"","Value7:num":"5000","Icon7:num":"87","Rarity7:num":"6","Setting8":"","Value8:num":"10000","Icon8:num":"87","Rarity8:num":"7","Setting9":"","Value9:num":"25000","Icon9:num":"84","Rarity9:num":"8","Setting10":"","Value10:num":"50000","Icon10:num":"84","Rarity10:num":"9"}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @parent VisualDrops
 * @type struct<Gold>
 * @desc Settings regarding Gold for Visual Drops.
 * @default {"General":"","show:eval":"true","Setting1":"","Value1:num":"1","Icon1:num":"314","Rarity1:num":"0","Setting2":"","Value2:num":"50","Icon2:num":"314","Rarity2:num":"1","Setting3":"","Value3:num":"100","Icon3:num":"196","Rarity3:num":"2","Setting4":"","Value4:num":"500","Icon4:num":"196","Rarity4:num":"3","Setting5":"","Value5:num":"1000","Icon5:num":"313","Rarity5:num":"4","Setting6":"","Value6:num":"5000","Icon6:num":"313","Rarity6:num":"5","Setting7":"","Value7:num":"10000","Icon7:num":"303","Rarity7:num":"6","Setting8":"","Value8:num":"50000","Icon8:num":"303","Rarity8:num":"7","Setting9":"","Value9:num":"100000","Icon9:num":"300","Rarity9:num":"8","Setting10":"","Value10:num":"500000","Icon10:num":"300","Rarity10:num":"9"}
 *
 * @param Drop:struct
 * @text Enemy Drops Settings
 * @parent VisualDrops
 * @type struct<Drop>
 * @desc Settings regarding enemy drops for Visual Drops.
 * @default {"General":"","show:eval":"true","uniqueIcons:eval":"true","CommonIcons":"","commonItemIcon:num":"208","commonWeaponIcon:num":"210","commonArmorsIcon:num":"210"}
 *
 * @param Rarity:struct
 * @text Rarity Settings
 * @parent VisualDrops
 * @type struct<Rarity>
 * @desc Settings regarding enemy drops for Visual Drops.
 * @default {"General":"","show:eval":"true","Setting0":"","Tint0:eval":"[0, 0, 0, 0]","Duration0:num":"180","Flags0:arraystr":"[]","Setting1":"","Tint1:eval":"[0, 30, 60, 20]","Duration1:num":"180","Flags1:arraystr":"[]","Setting2":"","Tint2:eval":"[30, 60, 0, 40]","Duration2:num":"160","Flags2:arraystr":"[]","Setting3":"","Tint3:eval":"[60, 0, 30, 60]","Duration3:num":"140","Flags3:arraystr":"[]","Setting4":"","Tint4:eval":"[0, 60, 60, 80]","Duration4:num":"120","Flags4:arraystr":"[]","Setting5":"","Tint5:eval":"[60, 60, 0, 100]","Duration5:num":"100","Flags5:arraystr":"[]","Setting6":"","Tint6:eval":"[60, 0, 60, 120]","Duration6:num":"80","Flags6:arraystr":"[]","Setting7":"","Tint7:eval":"[0, 0, 60, 140]","Duration7:num":"70","Flags7:arraystr":"[]","Setting8":"","Tint8:eval":"[0, 60, 0, 160]","Duration8:num":"60","Flags8:arraystr":"[]","Setting9":"","Tint9:eval":"[60, 0, 0, 180]","Duration9:num":"50","Flags9:arraystr":"[]","Setting10":"","Tint10:eval":"[0, 0, 0, 0]","Duration10:num":"40","Flags10:arraystr":"[\"Rainbow\"]","SpecialEffects":"","RainbowHueSpeed:num":"4"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Visual Drops?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Visual Drops?
 * You know you want to.
 * @default true
 *
 * @param resetOnRevive:eval
 * @text Reviving Resets Drops 
 * @parent General
 * @type boolean
 * @on Resets
 * @off Already Set
 * @desc Do reviving enemies reset drops?
 * @default true
 * 
 * @param Position
 *
 * @param radius:num
 * @text Base Radius
 * @parent Position
 * @type number
 * @min 1
 * @desc Base radius amount for drops.
 * @default 20
 *
 * @param radiusPerIcon:num
 * @text +Radius Per Drop
 * @parent Position
 * @type number
 * @min 0
 * @desc Increase radius by this much per extra drop.
 * @default 5
 *
 * @param angle:num
 * @text Spin Degrees
 * @parent Position
 * @type number
 * @min 0
 * @desc How many degrees do you want the icon to spin in its
 * largest bounce? Use 0 for no spin.
 * @default 1800
 *
 * @param msDelay:num
 * @text Delay Between Drops
 * @parent Position
 * @type number
 * @min 0
 * @desc How many milliseconds to delay the appearance of each
 * visual drop? Use 0 for no delay.
 * @default 250
 *
 * @param yRateFoV:num
 * @text Field of View Y
 * @parent Position
 * @desc What's the distortion rate for the field of view
 * for the item positioning distribution.
 * @default 0.44
 * 
 * @param Bounce
 *
 * @param duration:num
 * @text Bounce Duration
 * @parent Bounce
 * @type number
 * @min 1
 * @desc Duration of the highest bounce.
 * @default 60
 *
 * @param bounces:num
 * @text Bounce Total
 * @parent Bounce
 * @type number
 * @min 0
 * @desc How many times do you want visual drops to bounce?
 * Use 0 for no bounces.
 * @default 10
 *
 * @param height:num
 * @text Bounce Height
 * @parent Bounce
 * @type number
 * @min 0
 * @desc The maximum height for the visual drops to fly out at.
 * This will decrease with each bounce.
 * @default 100
 *
 * @param bounceReduction:num
 * @text Bounce Reduction
 * @parent Bounce
 * @desc The rate at which each bounce reduces the duration
 * and height by.
 * @default 0.75
 * 
 * @param SFX
 * @text Bounce SFX
 *
 * @param sfxFilename:str
 * @text Filename
 * @parent SFX
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Coin
 *
 * @param sfxVolume:num
 * @text Volume
 * @parent SFX
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param sfxPitch:num
 * @text Pitch
 * @parent SFX
 * @type number
 * @max 100
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param sfxPan:num
 * @text Pan
 * @parent SFX
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Icons
 *
 * @param iconOffsetRate:num
 * @text Offset Y Rate
 * @parent Icons
 * @desc At which rate do you want to offset the visual drop
 * icons off the ground by?
 * @default -1.75
 *
 * @param iconJumpEasing:str
 * @text Movement Easing
 * @parent Icons
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @param Shadow
 *
 * @param showShadow:eval
 * @text Show Shadow
 * @parent Shadow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the shadow sprite?
 * @default true
 *
 * @param shadowFilename:str
 * @text Shadow Filename
 * @parent Shadow
 * @type file
 * @dir img/system/
 * @desc Filename used for the visual drop shadow.
 * @default Shadow1
 *
 * @param shadowOffsetX:num
 * @text Shadow Offset X
 * @parent Shadow
 * @desc Offset the shadow sprite X by this amount.
 * Negative numbers go left. Positive numbers go right.
 * @default 0
 *
 * @param shadowOffsetY:num
 * @text Shadow Offset Y
 * @parent Shadow
 * @desc Offset the shadow sprite Y by this amount.
 * Negative numbers go up. Positive numbers go down.
 * @default 8
 *
 * @param shadowOpacity:num
 * @text Shadow Opacity
 * @parent Shadow
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity level of the shadow.
 * 0 for transparent. 255 for opaque.
 * @default 255
 * 
 * @param Opacity
 *
 * @param fadeAfterBounce:eval
 * @text Fade After Bounce
 * @parent Opacity
 * @type boolean
 * @on Fade
 * @off Keep
 * @desc Fade out the visual drops after they finish bouncing?
 * @default false
 *
 * @param fadeAfterDelay:num
 * @text Fade After Delay
 * @parent Opacity
 * @type number
 * @min 0
 * @desc How many milliseconds to delay the fading by if the
 * above option is selected?
 * @default 2000
 *
 * @param opacityFadeOut:num
 * @text Opacity Fade Speed
 * @parent Opacity
 * @type number
 * @max 255
 * @desc What speed should the opacity level fade out by?
 * Higher numbers are faster.
 * @default 8
 *
 */
/* ----------------------------------------------------------------------------
 * EXP Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exp:
 * 
 * @param General
 *
 * @param show:eval
 * @text Show EXP Drop
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual drops for EXP?
 * @default true
 * 
 * @param Setting1
 * @text Setting 1
 *
 * @param Value1:num
 * @text EXP Value
 * @parent Setting1
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 1
 *
 * @param Icon1:num
 * @text Icon
 * @parent Setting1
 * @desc Which icon to use for this setting?
 * @default 73
 *
 * @param Rarity1:num
 * @text Rarity
 * @parent Setting1
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 0
 * 
 * @param Setting2
 * @text Setting 2
 *
 * @param Value2:num
 * @text EXP Value
 * @parent Setting2
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 50
 *
 * @param Icon2:num
 * @text Icon
 * @parent Setting2
 * @desc Which icon to use for this setting?
 * @default 73
 *
 * @param Rarity2:num
 * @text Rarity
 * @parent Setting2
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 1
 * 
 * @param Setting3
 * @text Setting 3
 *
 * @param Value3:num
 * @text EXP Value
 * @parent Setting3
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 100
 *
 * @param Icon3:num
 * @text Icon
 * @parent Setting3
 * @desc Which icon to use for this setting?
 * @default 89
 *
 * @param Rarity3:num
 * @text Rarity
 * @parent Setting3
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 2
 * 
 * @param Setting4
 * @text Setting 4
 *
 * @param Value4:num
 * @text EXP Value
 * @parent Setting4
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 500
 *
 * @param Icon4:num
 * @text Icon
 * @parent Setting4
 * @desc Which icon to use for this setting?
 * @default 89
 *
 * @param Rarity4:num
 * @text Rarity
 * @parent Setting4
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 3
 * 
 * @param Setting5
 * @text Setting 5
 *
 * @param Value5:num
 * @text EXP Value
 * @parent Setting5
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 1000
 *
 * @param Icon5:num
 * @text Icon
 * @parent Setting5
 * @desc Which icon to use for this setting?
 * @default 88
 *
 * @param Rarity5:num
 * @text Rarity
 * @parent Setting5
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 4
 * 
 * @param Setting6
 * @text Setting 6
 *
 * @param Value6:num
 * @text EXP Value
 * @parent Setting6
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 2500
 *
 * @param Icon6:num
 * @text Icon
 * @parent Setting6
 * @desc Which icon to use for this setting?
 * @default 88
 *
 * @param Rarity6:num
 * @text Rarity
 * @parent Setting6
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 5
 * 
 * @param Setting7
 * @text Setting 7
 *
 * @param Value7:num
 * @text EXP Value
 * @parent Setting7
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 5000
 *
 * @param Icon7:num
 * @text Icon
 * @parent Setting7
 * @desc Which icon to use for this setting?
 * @default 87
 *
 * @param Rarity7:num
 * @text Rarity
 * @parent Setting7
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 6
 * 
 * @param Setting8
 * @text Setting 8
 *
 * @param Value8:num
 * @text EXP Value
 * @parent Setting8
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 10000
 *
 * @param Icon8:num
 * @text Icon
 * @parent Setting8
 * @desc Which icon to use for this setting?
 * @default 87
 *
 * @param Rarity8:num
 * @text Rarity
 * @parent Setting8
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 7
 * 
 * @param Setting9
 * @text Setting 9
 *
 * @param Value9:num
 * @text EXP Value
 * @parent Setting9
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 25000
 *
 * @param Icon9:num
 * @text Icon
 * @parent Setting9
 * @desc Which icon to use for this setting?
 * @default 84
 *
 * @param Rarity9:num
 * @text Rarity
 * @parent Setting9
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 8
 * 
 * @param Setting10
 * @text Setting 10
 *
 * @param Value10:num
 * @text EXP Value
 * @parent Setting10
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 50000
 *
 * @param Icon10:num
 * @text Icon
 * @parent Setting10
 * @desc Which icon to use for this setting?
 * @default 84
 *
 * @param Rarity10:num
 * @text Rarity
 * @parent Setting10
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 9
 *
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param General
 *
 * @param show:eval
 * @text Show Gold Drop
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual drops for Gold?
 * @default true
 * 
 * @param Setting1
 * @text Setting 1
 *
 * @param Value1:num
 * @text Gold Value
 * @parent Setting1
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 1
 *
 * @param Icon1:num
 * @text Icon
 * @parent Setting1
 * @desc Which icon to use for this setting?
 * @default 314
 *
 * @param Rarity1:num
 * @text Rarity
 * @parent Setting1
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 0
 * 
 * @param Setting2
 * @text Setting 2
 *
 * @param Value2:num
 * @text Gold Value
 * @parent Setting2
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 50
 *
 * @param Icon2:num
 * @text Icon
 * @parent Setting2
 * @desc Which icon to use for this setting?
 * @default 314
 *
 * @param Rarity2:num
 * @text Rarity
 * @parent Setting2
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 1
 * 
 * @param Setting3
 * @text Setting 3
 *
 * @param Value3:num
 * @text Gold Value
 * @parent Setting3
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 100
 *
 * @param Icon3:num
 * @text Icon
 * @parent Setting3
 * @desc Which icon to use for this setting?
 * @default 196
 *
 * @param Rarity3:num
 * @text Rarity
 * @parent Setting3
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 2
 * 
 * @param Setting4
 * @text Setting 4
 *
 * @param Value4:num
 * @text Gold Value
 * @parent Setting4
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 500
 *
 * @param Icon4:num
 * @text Icon
 * @parent Setting4
 * @desc Which icon to use for this setting?
 * @default 196
 *
 * @param Rarity4:num
 * @text Rarity
 * @parent Setting4
 * @type number
 * @desc Which rarity to use for this setting?
 * @default 3
 * 
 * @param Setting5
 * @text Setting 5
 *
 * @param Value5:num
 * @text Gold Value
 * @parent Setting5
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 1000
 *
 * @param Icon5:num
 * @text Icon
 * @parent Setting5
 * @desc Which icon to use for this setting?
 * @default 313
 *
 * @param Rarity5:num
 * @text Rarity
 * @parent Setting5
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 4
 * 
 * @param Setting6
 * @text Setting 6
 *
 * @param Value6:num
 * @text Gold Value
 * @parent Setting6
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 5000
 *
 * @param Icon6:num
 * @text Icon
 * @parent Setting6
 * @desc Which icon to use for this setting?
 * @default 313
 *
 * @param Rarity6:num
 * @text Rarity
 * @parent Setting6
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 5
 * 
 * @param Setting7
 * @text Setting 7
 *
 * @param Value7:num
 * @text Gold Value
 * @parent Setting7
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 10000
 *
 * @param Icon7:num
 * @text Icon
 * @parent Setting7
 * @desc Which icon to use for this setting?
 * @default 303
 *
 * @param Rarity7:num
 * @text Rarity
 * @parent Setting7
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 6
 * 
 * @param Setting8
 * @text Setting 8
 *
 * @param Value8:num
 * @text Gold Value
 * @parent Setting8
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 50000
 *
 * @param Icon8:num
 * @text Icon
 * @parent Setting8
 * @desc Which icon to use for this setting?
 * @default 303
 *
 * @param Rarity8:num
 * @text Rarity
 * @parent Setting8
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 7
 * 
 * @param Setting9
 * @text Setting 9
 *
 * @param Value9:num
 * @text Gold Value
 * @parent Setting9
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 100000
 *
 * @param Icon9:num
 * @text Icon
 * @parent Setting9
 * @desc Which icon to use for this setting?
 * @default 300
 *
 * @param Rarity9:num
 * @text Rarity
 * @parent Setting9
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 8
 * 
 * @param Setting10
 * @text Setting 10
 *
 * @param Value10:num
 * @text Gold Value
 * @parent Setting10
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 500000
 *
 * @param Icon10:num
 * @text Icon
 * @parent Setting10
 * @desc Which icon to use for this setting?
 * @default 300
 *
 * @param Rarity10:num
 * @text Rarity
 * @parent Setting10
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 9
 *
 */
/* ----------------------------------------------------------------------------
 * Drop Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Drop:
 *
 * @param General
 *
 * @param show:eval
 * @text Show Enemy Drops
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual drops for enemy drops?
 * @default true
 *
 * @param uniqueIcons:eval
 * @text Use Unique Icons
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the icons of the drops?
 * If not, use the ones below.
 * @default true
 *
 * @param CommonIcons
 * @text Common Icons
 *
 * @param commonItemIcon:num
 * @text Common Item Icon
 * @parent CommonIcons
 * @desc What icon do you want to use for common items?
 * @default 208
 *
 * @param commonWeaponIcon:num
 * @text Common Weapon Icon
 * @parent CommonIcons
 * @desc What icon do you want to use for common weapons?
 * @default 210
 *
 * @param commonArmorsIcon:num
 * @text Common Armor Icon
 * @parent CommonIcons
 * @desc What icon do you want to use for common armors?
 * @default 210
 *
 */
/* ----------------------------------------------------------------------------
 * Rarity Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Rarity:
 *
 * @param General
 *
 * @param show:eval
 * @text Show Rarities
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual effects for different rarities?
 * @default true
 * 
 * @param Setting0
 * @text No Rarity
 *
 * @param Tint0:eval
 * @text Tint
 * @parent Setting0
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @param Duration0:num
 * @text Duration
 * @parent Setting0
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 180
 *
 * @param Flags0:arraystr
 * @text Flags
 * @parent Setting0
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting1
 * @text Rarity 1
 *
 * @param Tint1:eval
 * @text Tint
 * @parent Setting1
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 30, 60, 20]
 *
 * @param Duration1:num
 * @text Duration
 * @parent Setting1
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 180
 *
 * @param Flags1:arraystr
 * @text Flags
 * @parent Setting1
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting2
 * @text Rarity 2
 *
 * @param Tint2:eval
 * @text Tint
 * @parent Setting2
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [30, 60, 0, 40]
 *
 * @param Duration2:num
 * @text Duration
 * @parent Setting2
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 160
 *
 * @param Flags2:arraystr
 * @text Flags
 * @parent Setting2
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting3
 * @text Rarity 3
 *
 * @param Tint3:eval
 * @text Tint
 * @parent Setting3
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [60, 0, 30, 60]
 *
 * @param Duration3:num
 * @text Duration
 * @parent Setting3
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 140
 *
 * @param Flags3:arraystr
 * @text Flags
 * @parent Setting3
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting4
 * @text Rarity 4
 *
 * @param Tint4:eval
 * @text Tint
 * @parent Setting4
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 60, 60, 80]
 *
 * @param Duration4:num
 * @text Duration
 * @parent Setting4
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 120
 *
 * @param Flags4:arraystr
 * @text Flags
 * @parent Setting4
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting5
 * @text Rarity 5
 *
 * @param Tint5:eval
 * @text Tint
 * @parent Setting5
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [60, 60, 0, 100]
 *
 * @param Duration5:num
 * @text Duration
 * @parent Setting5
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 100
 *
 * @param Flags5:arraystr
 * @text Flags
 * @parent Setting5
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting6
 * @text Rarity 6
 *
 * @param Tint6:eval
 * @text Tint
 * @parent Setting6
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [60, 0, 60, 120]
 *
 * @param Duration6:num
 * @text Duration
 * @parent Setting6
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 80
 *
 * @param Flags6:arraystr
 * @text Flags
 * @parent Setting6
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting7
 * @text Rarity 7
 *
 * @param Tint7:eval
 * @text Tint
 * @parent Setting7
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 60, 140]
 *
 * @param Duration7:num
 * @text Duration
 * @parent Setting7
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 70
 *
 * @param Flags7:arraystr
 * @text Flags
 * @parent Setting7
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting8
 * @text Rarity 8
 *
 * @param Tint8:eval
 * @text Tint
 * @parent Setting8
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 60, 0, 160]
 *
 * @param Duration8:num
 * @text Duration
 * @parent Setting8
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 60
 *
 * @param Flags8:arraystr
 * @text Flags
 * @parent Setting8
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting9
 * @text Rarity 9
 *
 * @param Tint9:eval
 * @text Tint
 * @parent Setting9
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [60, 0, 0, 180]
 *
 * @param Duration9:num
 * @text Duration
 * @parent Setting9
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 50
 *
 * @param Flags9:arraystr
 * @text Flags
 * @parent Setting9
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting10
 * @text Rarity 10
 *
 * @param Tint10:eval
 * @text Tint
 * @parent Setting10
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @param Duration10:num
 * @text Duration
 * @parent Setting10
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 40
 *
 * @param Flags10:arraystr
 * @text Flags
 * @parent Setting10
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default ["Rainbow"]
 * 
 * @param SpecialEffects
 * @text Special Effects
 *
 * @param RainbowHueSpeed:num
 * @text Rainbow Hue Speed
 * @parent SpecialEffects
 * @type number
 * @min 1
 * @desc How fast do you want the Rainbow effect to change hue?
 * @default 4
 *
 */
//=============================================================================

const _0x400a=['addForcedWeaponDrop','VisuMZ_1_BattleCore','iconIndex','_skillIDs','clearForcedRewards','_bonusRewards','length','setTargetDestination','sfxFilename','convertConditionToCode','floor','_visualDrops','slice','iconWidth','iconHeight','STATES','shadowFilename','createLowerLayer','VisuMZ_0_CoreEngine','timesStruck%1','addTimesStruck','deadMembers','getItemDropIcons','_scene','Tint%1','BonusExpSet','ELEMENT','lastStruck%1','charAt','show','_itemIDs','true','targetOpacity','Tint0','_data','Game_BattlerBase_eraseState','iconJumpEasing','format','getDeathTurn','ARRAYSTR','Game_BattlerBase_addNewState','addExtraEnemyDropsJS','call','getStypeIdWithName','addBonusArmorDrop','fadeAfterBounce','exit','_iconSprite','Scene_Boot_onDatabaseLoaded','BOUNCE\x20SFX:\x20%1','IconSet','Visible','_baseX','STRUCT','jumpHeight','_elementIDs','replace','Linear','VisualDrops','random','createSprites','updateRotation','isAlive','isArmor','updateDuration','addExtraEnemyDropsConditional','Game_Enemy_setup','updatePosition','lastStruckState','quantity','level','yRateFoV','9VmNNKC','bounceSFX','shadowOpacity','duration','VisuMZ_1_ElementStatusCore','Flags%1','update','round','dropItems','baseY','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','removeVisualDrops','Item','Game_Troop_clear','lastStruckSkill','onBattleStart','timesStruckSkill','remove','Drop','addNewState','Flags0','SKILL','updateFlags','setBonusGold','constructor','setBonusExp','EVAL','SKILLS','ExtraEnemyDrops','timesStruck%1s','addBonusItemDrop','sfxVolume','_conditionalDropsTrackedData','getConditionalDropsTrackedData','_armorIDs','getDatabase','onDatabaseLoaded','ITEMS','kind','Game_Enemy_exp','isSceneBattle','createShadowSprite','enemy','State','addExtraEnemyDropsBatch','toUpperCase','updateTint','WEAPONS','getItemIdWithName','iconOffsetRate','BonusRewardsClear','goldRate','ITEM','isWeapon','sort','members','timesStruckSType','expTotal','12893EZIMom','Rarity','getArmorIdWithName','split','_spriteset','resetVisualDrops','addBonusWeaponDrop','damage','loadSystem','setup','applyTimesStruck','restoreVisualDrops','_shadowSprite','Game_Troop_makeDropItems','1742095YGBCVx','ARRAYSTRUCT','WEAPON','ConvertParams','aliveMembers','lastStruckItem','prototype','setForcedGold','isSkill','setColorTone','updateJumpHeight','addChild','BonusAddWeapon','getWeaponIdWithName','attackElements','createDrops','sfxPitch','calculateJumpHeight','setForcedExp','addForcedArmorDrop','Game_Enemy_gold','applyEasing','checkValidDrop','getSkillIdWithName','filter','Game_Action_applyItemUserEffect','bind','name','registerCommand','height','min','isItem','applyItemUserEffect','rotationConstant','return\x200','hue','createConditionalDropsTrackedData','_stypeIDs','ARRAYJSON','_baseY','JSON','timesStruckItems','bounceReduction','match','sortDrops','denominator','value','create','2FjOWzQ','Enable','1rwkPiV','lastStruckElement','rarityTint','STR','hasForcedDrops','NUM','160771vXqnWu','item','playSe','_forcedRewards','ARRAYNUM','targetY','RainbowHueSpeed','startSpecialSFX','lastStruckType','rarityFrames','_battlerContainer','Gold','map','timesStruckState','deathStateId','shadowOffsetX','bitmap','uniqueIcons','goldTotal','_weaponIDs','process_VisuMZ_ExtraEnemyDrops_Notetags','getDatabaseKind','createIconSprite','_visualDropsVisible','concat','getExpGoldDropIcon','targetX','BonusGoldSet','createJS','toLowerCase','stypeId','elements','getElementIdWithName','push','timesStruckElement','none','STATE','addForcedItemDrop','flags','eraseState','makeDeepCopy','status','_rotationConstant','_stateIDs','updateOpacity','Element','Duration%1','log','gold','startFadeOut','commonItemIcon','Skill','anchor','makeDropItems','drops','91959GFGNAO','angle','Value%1','deathTurn','992515WgCZDx','opacity','sin','dataId','skillTypes','ADDITIVE','addExtraEnemyDrops','commonArmorsIcon','53OsBPOt','ApplyEasing','cos','isStateAffected','ForcedRewardsClear','SType','description','radiusPerIcon','getDatabaseItem','meetsExtraEnemyDropsCondition','timesStruckStates','elementId','initialize','pow','ParseAllNotetags','includes','Icon%1','max','SPAWN\x20SFX:\x20%1','findTargetDropSprite','initMembers','clear','subject','lastStruckSType','blendMode','clamp','timesStruckItem','ForcedAddItem','note','commonWeaponIcon','radius','Rarity%1','General','process_VisuMZ_ExtraEnemyDrops_JS_Notetags','setTintInformation','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','sfxPan','1052294AIwYCM','MULTIPLY','find','ARMOR','BattleManager_initMembers','BOUNCE\x20HEIGHT\x20%1%','createChildren','getDatabaseItemID','getStateIdWithName','STYPE','8810eAUlao','isDead','updateFlagData','FUNC','trim','resetOnRevive','registerDeathTurn','Game_Enemy_makeDropItems','parse','RAINBOW','opacityRate','dropItemRate','baseX','addExtraEnemyDropsSingles','ARRAYFUNC','ARMORS','ForcedExpSet','calculatePosition','randomInt','rarityDuration','bounces','Game_Battler_onBattleStart','_visualDropSprites','setFrame','ParseEnemyNotetags','103ufpguK','Game_Troop_goldTotal','exp','numItems','false','ARRAYEVAL','clearBonusRewards','Settings','Exp'];const _0x3ebe=function(_0xa67d73,_0x3d6465){_0xa67d73=_0xa67d73-0x87;let _0x400a85=_0x400a[_0xa67d73];return _0x400a85;};const _0x176333=_0x3ebe;(function(_0x226011,_0x28f4d9){const _0x24f368=_0x3ebe;while(!![]){try{const _0x5575d6=-parseInt(_0x24f368(0x126))*-parseInt(_0x24f368(0xf6))+parseInt(_0x24f368(0xad))*-parseInt(_0x24f368(0x1d8))+-parseInt(_0x24f368(0x1ca))*-parseInt(_0x24f368(0x13f))+-parseInt(_0x24f368(0xb3))*parseInt(_0x24f368(0xab))+parseInt(_0x24f368(0x11c))+-parseInt(_0x24f368(0xea))*parseInt(_0x24f368(0x190))+parseInt(_0x24f368(0xee));if(_0x5575d6===_0x28f4d9)break;else _0x226011['push'](_0x226011['shift']());}catch(_0x48c6d2){_0x226011['push'](_0x226011['shift']());}}}(_0x400a,0xe78e2));var label=_0x176333(0x1ac),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x8f344d){const _0x1c5a4f=_0x176333;return _0x8f344d[_0x1c5a4f(0xdc)]&&_0x8f344d['description'][_0x1c5a4f(0x105)]('['+label+']');})[0x0];VisuMZ[label][_0x176333(0x146)]=VisuMZ[label][_0x176333(0x146)]||{},VisuMZ[_0x176333(0x1db)]=function(_0x1395ff,_0x31b9c0){const _0x403e74=_0x176333;for(const _0x449e56 in _0x31b9c0){if(_0x449e56[_0x403e74(0xa6)](/(.*):(.*)/i)){const _0x3db997=String(RegExp['$1']),_0x1d0e22=String(RegExp['$2'])['toUpperCase']()[_0x403e74(0x12a)]();let _0x2d37fb,_0x579928,_0x2fd225;switch(_0x1d0e22){case _0x403e74(0xb2):_0x2d37fb=_0x31b9c0[_0x449e56]!==''?Number(_0x31b9c0[_0x449e56]):0x0;break;case _0x403e74(0xb7):_0x579928=_0x31b9c0[_0x449e56]!==''?JSON[_0x403e74(0x12e)](_0x31b9c0[_0x449e56]):[],_0x2d37fb=_0x579928[_0x403e74(0xbf)](_0x1bf73c=>Number(_0x1bf73c));break;case _0x403e74(0x1aa):_0x2d37fb=_0x31b9c0[_0x449e56]!==''?eval(_0x31b9c0[_0x449e56]):null;break;case _0x403e74(0x144):_0x579928=_0x31b9c0[_0x449e56]!==''?JSON[_0x403e74(0x12e)](_0x31b9c0[_0x449e56]):[],_0x2d37fb=_0x579928[_0x403e74(0xbf)](_0x4bbae5=>eval(_0x4bbae5));break;case _0x403e74(0xa3):_0x2d37fb=_0x31b9c0[_0x449e56]!==''?JSON[_0x403e74(0x12e)](_0x31b9c0[_0x449e56]):'';break;case _0x403e74(0xa1):_0x579928=_0x31b9c0[_0x449e56]!==''?JSON['parse'](_0x31b9c0[_0x449e56]):[],_0x2d37fb=_0x579928[_0x403e74(0xbf)](_0x4e832f=>JSON['parse'](_0x4e832f));break;case _0x403e74(0x129):_0x2d37fb=_0x31b9c0[_0x449e56]!==''?new Function(JSON['parse'](_0x31b9c0[_0x449e56])):new Function(_0x403e74(0x9d));break;case _0x403e74(0x134):_0x579928=_0x31b9c0[_0x449e56]!==''?JSON['parse'](_0x31b9c0[_0x449e56]):[],_0x2d37fb=_0x579928[_0x403e74(0xbf)](_0x4c2619=>new Function(JSON['parse'](_0x4c2619)));break;case _0x403e74(0xb0):_0x2d37fb=_0x31b9c0[_0x449e56]!==''?String(_0x31b9c0[_0x449e56]):'';break;case _0x403e74(0x16f):_0x579928=_0x31b9c0[_0x449e56]!==''?JSON[_0x403e74(0x12e)](_0x31b9c0[_0x449e56]):[],_0x2d37fb=_0x579928[_0x403e74(0xbf)](_0xfbc2a2=>String(_0xfbc2a2));break;case _0x403e74(0x17d):_0x2fd225=_0x31b9c0[_0x449e56]!==''?JSON[_0x403e74(0x12e)](_0x31b9c0[_0x449e56]):{},_0x2d37fb=VisuMZ['ConvertParams']({},_0x2fd225);break;case _0x403e74(0x1d9):_0x579928=_0x31b9c0[_0x449e56]!==''?JSON['parse'](_0x31b9c0[_0x449e56]):[],_0x2d37fb=_0x579928[_0x403e74(0xbf)](_0x4c7a13=>VisuMZ[_0x403e74(0x1db)]({},JSON[_0x403e74(0x12e)](_0x4c7a13)));break;default:continue;}_0x1395ff[_0x3db997]=_0x2d37fb;}}return _0x1395ff;},(_0x508cf3=>{const _0x162c4d=_0x176333,_0x374706=_0x508cf3[_0x162c4d(0x96)];for(const _0x102016 of dependencies){if(!Imported[_0x102016]){alert(_0x162c4d(0x119)['format'](_0x374706,_0x102016)),SceneManager['exit']();break;}}const _0x1c2e93=_0x508cf3[_0x162c4d(0xfc)];if(_0x1c2e93[_0x162c4d(0xa6)](/\[Version[ ](.*?)\]/i)){const _0x3d61cb=Number(RegExp['$1']);_0x3d61cb!==VisuMZ[label]['version']&&(alert(_0x162c4d(0x19a)[_0x162c4d(0x16d)](_0x374706,_0x3d61cb)),SceneManager[_0x162c4d(0x176)]());}if(_0x1c2e93[_0x162c4d(0xa6)](/\[Tier[ ](\d+)\]/i)){const _0x4b322f=Number(RegExp['$1']);_0x4b322f<tier?(alert(_0x162c4d(0x11a)[_0x162c4d(0x16d)](_0x374706,_0x4b322f,tier)),SceneManager[_0x162c4d(0x176)]()):tier=Math[_0x162c4d(0x107)](_0x4b322f,tier);}VisuMZ[_0x162c4d(0x1db)](VisuMZ[label][_0x162c4d(0x146)],_0x508cf3['parameters']);})(pluginData),PluginManager[_0x176333(0x97)](pluginData[_0x176333(0x96)],_0x176333(0x1c2),_0x54a949=>{const _0x309fea=_0x176333;VisuMZ[_0x309fea(0x1db)](_0x54a949,_0x54a949),$gameTroop[_0x309fea(0x145)]();}),PluginManager[_0x176333(0x97)](pluginData['name'],_0x176333(0x161),_0x223af3=>{const _0x1829c4=_0x176333;VisuMZ[_0x1829c4(0x1db)](_0x223af3,_0x223af3);const _0x948e98=_0x223af3[_0x1829c4(0xa9)];$gameTroop['setBonusExp'](_0x948e98);}),PluginManager[_0x176333(0x97)](pluginData[_0x176333(0x96)],_0x176333(0xce),_0x39ae9a=>{const _0xccd16a=_0x176333;VisuMZ[_0xccd16a(0x1db)](_0x39ae9a,_0x39ae9a);const _0x5e6451=_0x39ae9a['value'];$gameTroop[_0xccd16a(0x1a7)](_0x5e6451);}),PluginManager[_0x176333(0x97)](pluginData[_0x176333(0x96)],'BonusAddItem',_0x59f09d=>{const _0x57910f=_0x176333;VisuMZ['ConvertParams'](_0x59f09d,_0x59f09d);const _0x559c65=_0x59f09d['id'],_0x252fab=_0x59f09d[_0x57910f(0x18d)];$gameTroop[_0x57910f(0x1ae)](_0x559c65,_0x252fab);}),PluginManager['registerCommand'](pluginData['name'],_0x176333(0x87),_0x3781f6=>{const _0x46447d=_0x176333;VisuMZ['ConvertParams'](_0x3781f6,_0x3781f6);const _0x22b842=_0x3781f6['id'],_0x384930=_0x3781f6[_0x46447d(0x18d)];$gameTroop[_0x46447d(0x1d0)](_0x22b842,_0x384930);}),PluginManager['registerCommand'](pluginData[_0x176333(0x96)],'BonusAddArmor',_0x1fa0ff=>{const _0x58a4e6=_0x176333;VisuMZ[_0x58a4e6(0x1db)](_0x1fa0ff,_0x1fa0ff);const _0x8a5cea=_0x1fa0ff['id'],_0x370f22=_0x1fa0ff[_0x58a4e6(0x18d)];$gameTroop[_0x58a4e6(0x174)](_0x8a5cea,_0x370f22);}),PluginManager[_0x176333(0x97)](pluginData[_0x176333(0x96)],_0x176333(0xfa),_0x5862a2=>{const _0x564c2e=_0x176333;VisuMZ[_0x564c2e(0x1db)](_0x5862a2,_0x5862a2),$gameTroop[_0x564c2e(0x14c)]();}),PluginManager[_0x176333(0x97)](pluginData[_0x176333(0x96)],_0x176333(0x136),_0x1924f2=>{const _0x1b431e=_0x176333;VisuMZ['ConvertParams'](_0x1924f2,_0x1924f2);const _0x1a85d5=_0x1924f2[_0x1b431e(0xa9)];$gameTroop[_0x1b431e(0x8d)](_0x1a85d5);}),PluginManager[_0x176333(0x97)](pluginData['name'],'ForcedGoldSet',_0x18448e=>{const _0x5d7cb7=_0x176333;VisuMZ['ConvertParams'](_0x18448e,_0x18448e);const _0x507fe9=_0x18448e[_0x5d7cb7(0xa9)];$gameTroop[_0x5d7cb7(0x1df)](_0x507fe9);}),PluginManager['registerCommand'](pluginData[_0x176333(0x96)],_0x176333(0x111),_0x24d6d6=>{const _0x362398=_0x176333;VisuMZ['ConvertParams'](_0x24d6d6,_0x24d6d6);const _0x4ea98a=_0x24d6d6['id'],_0x3fec45=_0x24d6d6[_0x362398(0x18d)];$gameTroop[_0x362398(0xd8)](_0x4ea98a,_0x3fec45);}),PluginManager['registerCommand'](pluginData[_0x176333(0x96)],'ForcedAddWeapon',_0x3a9530=>{const _0x13a67b=_0x176333;VisuMZ['ConvertParams'](_0x3a9530,_0x3a9530);const _0x5dc514=_0x3a9530['id'],_0x1ed8be=_0x3a9530[_0x13a67b(0x18d)];$gameTroop[_0x13a67b(0x148)](_0x5dc514,_0x1ed8be);}),PluginManager[_0x176333(0x97)](pluginData[_0x176333(0x96)],'ForcedAddArmor',_0x1156bc=>{const _0x23c5c3=_0x176333;VisuMZ['ConvertParams'](_0x1156bc,_0x1156bc);const _0x5a1660=_0x1156bc['id'],_0x536239=_0x1156bc[_0x23c5c3(0x18d)];$gameTroop['addForcedArmorDrop'](_0x5a1660,_0x536239);}),PluginManager[_0x176333(0x97)](pluginData['name'],'VisualDropVisible',_0x3d262f=>{const _0x2fa41c=_0x176333;VisuMZ[_0x2fa41c(0x1db)](_0x3d262f,_0x3d262f);const _0x415496=_0x3d262f[_0x2fa41c(0x17b)];BattleManager[_0x2fa41c(0xca)]=_0x415496;}),VisuMZ[_0x176333(0x1ac)][_0x176333(0x178)]=Scene_Boot[_0x176333(0x1de)][_0x176333(0x1b4)],Scene_Boot[_0x176333(0x1de)][_0x176333(0x1b4)]=function(){const _0x441db1=_0x176333;VisuMZ['ExtraEnemyDrops'][_0x441db1(0x178)][_0x441db1(0x172)](this),this['process_VisuMZ_ExtraEnemyDrops_Notetags']();},Scene_Boot[_0x176333(0x1de)][_0x176333(0xc7)]=function(){const _0x13023c=_0x176333;if(VisuMZ[_0x13023c(0x104)])return;this['process_VisuMZ_ExtraEnemyDrops_Drops_Notetags'](),this[_0x13023c(0x117)]();},Scene_Boot['prototype']['process_VisuMZ_ExtraEnemyDrops_Drops_Notetags']=function(){const _0x2c4e35=_0x176333;for(const _0x25c4d7 of $dataEnemies){if(!_0x25c4d7)continue;VisuMZ[_0x2c4e35(0x1ac)]['createDrops'](_0x25c4d7);}},Scene_Boot[_0x176333(0x1de)][_0x176333(0x117)]=function(){const _0x344a78=_0x176333;for(const _0x56ecc9 of $dataEnemies){if(!_0x56ecc9)continue;if(_0x56ecc9[_0x344a78(0x112)][_0x344a78(0xa6)](/<JS DROPS>\s*([\s\S]*)\s*<\/JS DROPS>/i)){const _0x430835=String(RegExp['$1']);VisuMZ[_0x344a78(0x1ac)][_0x344a78(0xcf)](_0x56ecc9,_0x430835);}}},VisuMZ['ExtraEnemyDrops'][_0x176333(0x13e)]=VisuMZ[_0x176333(0x13e)],VisuMZ[_0x176333(0x13e)]=function(_0x30cb5d){const _0x37e4cd=_0x176333;VisuMZ['ExtraEnemyDrops'][_0x37e4cd(0x13e)][_0x37e4cd(0x172)](this,_0x30cb5d),VisuMZ[_0x37e4cd(0x1ac)][_0x37e4cd(0x8a)](_0x30cb5d);if(_0x30cb5d[_0x37e4cd(0x112)][_0x37e4cd(0xa6)](/<JS DROPS>\s*([\s\S]*)\s*<\/JS DROPS>/i)){const _0x5d8342=String(RegExp['$1']);VisuMZ['ExtraEnemyDrops'][_0x37e4cd(0xcf)](_0x30cb5d,_0x5d8342);}},VisuMZ[_0x176333(0x1ac)][_0x176333(0x8a)]=function(_0x4ec71f){const _0x1ed114=_0x176333,_0x20d99b=_0x4ec71f[_0x1ed114(0x112)],_0x13bd78=_0x20d99b[_0x1ed114(0xa6)](/<(.*?) (?:DROP|DROPS)[ ](.*):[ ](\d+)([%％])>/gi);if(_0x13bd78)for(const _0x1c7bda of _0x13bd78){if(_0x4ec71f['id']===0x1)console[_0x1ed114(0xe2)](_0x1c7bda);const _0x51f5ea={'kind':0x0,'dataId':0x0,'denominator':0x1};if(_0x1c7bda[_0x1ed114(0xa6)](/<(.*?) (?:DROP|DROPS)[ ](\d+)[ ](?:THROUGH|to)[ ](\d+):[ ](\d+)([%％])>/i)){const _0x459361=VisuMZ['ExtraEnemyDrops'][_0x1ed114(0xc8)](RegExp['$1']),_0x1ee56c=Number(RegExp['$2']),_0x50db4d=Number(RegExp['$3']),_0x12e71d=0x1/(Number(RegExp['$4'])*0.01);console[_0x1ed114(0xe2)](_0x459361,_0x1ee56c,_0x50db4d,_0x12e71d);if(_0x459361>0x0)for(let _0x16d205=_0x1ee56c;_0x16d205<=_0x50db4d;_0x16d205++){const _0x12fb03={'kind':_0x459361,'dataId':_0x16d205,'denominator':_0x12e71d};VisuMZ[_0x1ed114(0x1ac)]['checkValidDrop'](_0x12fb03)&&_0x4ec71f['dropItems'][_0x1ed114(0xd4)](_0x12fb03);}continue;}else{if(_0x1c7bda['match'](/<(.*?) (?:DROP|DROPS)[ ](\d+):[ ](\d+)([%％])>/i))_0x51f5ea['kind']=VisuMZ[_0x1ed114(0x1ac)][_0x1ed114(0xc8)](RegExp['$1']),_0x51f5ea[_0x1ed114(0xf1)]=Number(RegExp['$2']),_0x51f5ea['denominator']=0x1/(Number(RegExp['$3'])*0.01);else{if(_0x1c7bda[_0x1ed114(0xa6)](/<(.*?) (?:DROP|DROPS)[ ](.*):[ ](\d+)([%％])>/i))_0x51f5ea[_0x1ed114(0x1b6)]=VisuMZ[_0x1ed114(0x1ac)][_0x1ed114(0xc8)](RegExp['$1']),_0x51f5ea['dataId']=VisuMZ[_0x1ed114(0x1ac)][_0x1ed114(0x123)](RegExp['$1'],RegExp['$2']),_0x51f5ea[_0x1ed114(0xa8)]=0x1/(Number(RegExp['$3'])*0.01);else continue;}}if(_0x51f5ea[_0x1ed114(0x1b6)]<0x0||_0x51f5ea[_0x1ed114(0xf1)]<0x0)continue;_0x4ec71f[_0x1ed114(0x198)][_0x1ed114(0xd4)](_0x51f5ea);}if(_0x20d99b[_0x1ed114(0xa6)](/<(?:DROP|DROPS)>\s*([\s\S]*)\s*<\/(?:DROP|DROPS)>/i)){const _0x34b1cd=String(RegExp['$1']),_0x4db3f2=_0x34b1cd['match'](/(.*?)[ ](.*):[ ](\d+)([%％])/gi);if(_0x4db3f2)for(const _0x4e3c49 of _0x4db3f2){const _0x11d326={'kind':0x0,'dataId':0x0,'denominator':0x1};if(_0x4e3c49[_0x1ed114(0xa6)](/(.*?)[ ](\d+)[ ](?:THROUGH|to)[ ](\d+):[ ](\d+)([%％])/i)){const _0x4a9aa7=VisuMZ[_0x1ed114(0x1ac)]['getDatabaseKind'](RegExp['$1']),_0x51e788=Number(RegExp['$2']),_0x511dbf=Number(RegExp['$3']),_0x13d223=0x1/(Number(RegExp['$4'])*0.01);console[_0x1ed114(0xe2)](_0x4a9aa7,_0x51e788,_0x511dbf,_0x13d223);if(_0x4a9aa7>0x0)for(let _0x4b49e3=_0x51e788;_0x4b49e3<=_0x511dbf;_0x4b49e3++){const _0x3c2d83={'kind':_0x4a9aa7,'dataId':_0x4b49e3,'denominator':_0x13d223};VisuMZ[_0x1ed114(0x1ac)][_0x1ed114(0x91)](_0x3c2d83)&&_0x4ec71f[_0x1ed114(0x198)]['push'](_0x3c2d83);}continue;}else{if(_0x4e3c49[_0x1ed114(0xa6)](/(.*?)[ ](\d+):[ ](\d+)([%％])/i))_0x11d326[_0x1ed114(0x1b6)]=VisuMZ['ExtraEnemyDrops'][_0x1ed114(0xc8)](RegExp['$1']),_0x11d326['dataId']=Number(RegExp['$2']),_0x11d326[_0x1ed114(0xa8)]=0x1/(Number(RegExp['$3'])*0.01);else{if(_0x4e3c49['match'](/(.*?)[ ](.*):[ ](\d+)([%％])/i))_0x11d326[_0x1ed114(0x1b6)]=VisuMZ[_0x1ed114(0x1ac)][_0x1ed114(0xc8)](RegExp['$1']),_0x11d326['dataId']=VisuMZ[_0x1ed114(0x1ac)][_0x1ed114(0x123)](RegExp['$1'],RegExp['$2']),_0x11d326[_0x1ed114(0xa8)]=0x1/(Number(RegExp['$3'])*0.01);else continue;}}if(_0x11d326[_0x1ed114(0x1b6)]<0x0||_0x11d326['dataId']<0x0)continue;_0x4ec71f[_0x1ed114(0x198)][_0x1ed114(0xd4)](_0x11d326);}}},VisuMZ[_0x176333(0x1ac)]['checkValidDrop']=function(_0x60096f){const _0x39d0b9=_0x176333;if(!_0x60096f)return![];const _0x4029af=_0x60096f['kind'],_0x20c8b9=_0x60096f[_0x39d0b9(0xf1)];let _0x46564d=null;if(_0x4029af===0x1)_0x46564d=$dataItems[_0x20c8b9];else{if(_0x4029af===0x2)_0x46564d=$dataWeapons[_0x20c8b9];else _0x4029af===0x3?_0x46564d=$dataArmors[_0x20c8b9]:_0x46564d=null;}if(!_0x46564d)return![];if(_0x46564d[_0x39d0b9(0x96)]['trim']()==='')return![];if(_0x46564d[_0x39d0b9(0x96)][_0x39d0b9(0xa6)](/-----/i))return![];return!![];},VisuMZ[_0x176333(0x1ac)]['JS']={},VisuMZ[_0x176333(0x1ac)][_0x176333(0xcf)]=function(_0x3b3c36,_0x6eb4c7){const _0x573e4=_0x176333,_0x909b90='\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20enemy\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20drops\x20=\x20arguments[0];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Array\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20drops;\x0a\x20\x20\x20\x20'[_0x573e4(0x16d)](_0x6eb4c7),_0x2b828e=_0x3b3c36['id'];VisuMZ[_0x573e4(0x1ac)]['JS'][_0x2b828e]=new Function(_0x909b90);},DataManager[_0x176333(0x1c0)]=function(_0x29bbb5){const _0x26bdad=_0x176333;_0x29bbb5=_0x29bbb5[_0x26bdad(0x1bd)]()['trim'](),this[_0x26bdad(0x166)]=this[_0x26bdad(0x166)]||{};if(this['_itemIDs'][_0x29bbb5])return this[_0x26bdad(0x166)][_0x29bbb5];for(const _0x39f854 of $dataItems){if(!_0x39f854)continue;this[_0x26bdad(0x166)][_0x39f854[_0x26bdad(0x96)][_0x26bdad(0x1bd)]()[_0x26bdad(0x12a)]()]=_0x39f854['id'];}return this['_itemIDs'][_0x29bbb5]||0x0;},DataManager[_0x176333(0x88)]=function(_0x3a8622){const _0x581339=_0x176333;_0x3a8622=_0x3a8622[_0x581339(0x1bd)]()[_0x581339(0x12a)](),this[_0x581339(0xc6)]=this[_0x581339(0xc6)]||{};if(this[_0x581339(0xc6)][_0x3a8622])return this[_0x581339(0xc6)][_0x3a8622];for(const _0x4a180a of $dataWeapons){if(!_0x4a180a)continue;this[_0x581339(0xc6)][_0x4a180a[_0x581339(0x96)]['toUpperCase']()[_0x581339(0x12a)]()]=_0x4a180a['id'];}return this['_weaponIDs'][_0x3a8622]||0x0;},DataManager[_0x176333(0x1cc)]=function(_0x2e5591){const _0x196500=_0x176333;_0x2e5591=_0x2e5591[_0x196500(0x1bd)]()[_0x196500(0x12a)](),this['_armorIDs']=this['_armorIDs']||{};if(this[_0x196500(0x1b2)][_0x2e5591])return this[_0x196500(0x1b2)][_0x2e5591];for(const _0x4990dc of $dataArmors){if(!_0x4990dc)continue;this['_armorIDs'][_0x4990dc[_0x196500(0x96)]['toUpperCase']()[_0x196500(0x12a)]()]=_0x4990dc['id'];}return this['_armorIDs'][_0x2e5591]||0x0;},DataManager[_0x176333(0x92)]=function(_0x35696d){const _0x12e7c1=_0x176333;_0x35696d=_0x35696d[_0x12e7c1(0x1bd)]()[_0x12e7c1(0x12a)](),this[_0x12e7c1(0x14b)]=this[_0x12e7c1(0x14b)]||{};if(this[_0x12e7c1(0x14b)][_0x35696d])return this[_0x12e7c1(0x14b)][_0x35696d];for(const _0x40abff of $dataSkills){if(!_0x40abff)continue;this[_0x12e7c1(0x14b)][_0x40abff[_0x12e7c1(0x96)]['toUpperCase']()[_0x12e7c1(0x12a)]()]=_0x40abff['id'];}return this[_0x12e7c1(0x14b)][_0x35696d]||0x0;},DataManager['getStypeIdWithName']=function(_0x2585df){const _0x5afb6f=_0x176333;_0x2585df=_0x2585df['toUpperCase']()[_0x5afb6f(0x12a)](),this[_0x5afb6f(0xa0)]=this[_0x5afb6f(0xa0)]||{};if(this['_stypeIDs'][_0x2585df])return this[_0x5afb6f(0xa0)][_0x2585df];for(let _0x1e6404=0x1;_0x1e6404<0x64;_0x1e6404++){if(!$dataSystem[_0x5afb6f(0xf2)][_0x1e6404])continue;let _0x529586=$dataSystem[_0x5afb6f(0xf2)][_0x1e6404][_0x5afb6f(0x1bd)]()[_0x5afb6f(0x12a)]();_0x529586=_0x529586['replace'](/\x1I\[(\d+)\]/gi,''),_0x529586=_0x529586[_0x5afb6f(0x180)](/\\I\[(\d+)\]/gi,''),this['_stypeIDs'][_0x529586]=_0x1e6404;}return this[_0x5afb6f(0xa0)][_0x2585df]||0x0;},DataManager[_0x176333(0x124)]=function(_0x2c09b7){const _0x5bde68=_0x176333;_0x2c09b7=_0x2c09b7[_0x5bde68(0x1bd)]()[_0x5bde68(0x12a)](),this[_0x5bde68(0xde)]=this['_stateIDs']||{};if(this[_0x5bde68(0xde)][_0x2c09b7])return this['_stateIDs'][_0x2c09b7];for(const _0x34d6f5 of $dataStates){if(!_0x34d6f5)continue;this[_0x5bde68(0xde)][_0x34d6f5[_0x5bde68(0x96)][_0x5bde68(0x1bd)]()[_0x5bde68(0x12a)]()]=_0x34d6f5['id'];}return this['_stateIDs'][_0x2c09b7]||0x0;},DataManager[_0x176333(0xd3)]=function(_0x3c9f49){const _0x1ecdf2=_0x176333;_0x3c9f49=_0x3c9f49[_0x1ecdf2(0x1bd)]()[_0x1ecdf2(0x12a)](),this[_0x1ecdf2(0x17f)]=this['_elementIDs']||{};if(this[_0x1ecdf2(0x17f)][_0x3c9f49])return this[_0x1ecdf2(0x17f)][_0x3c9f49];let _0x423e3d=0x1;for(const _0xc96c86 of $dataSystem['elements']){if(!_0xc96c86)continue;let _0x1aa77b=_0xc96c86[_0x1ecdf2(0x1bd)]();_0x1aa77b=_0x1aa77b[_0x1ecdf2(0x180)](/\x1I\[(\d+)\]/gi,''),_0x1aa77b=_0x1aa77b[_0x1ecdf2(0x180)](/\\I\[(\d+)\]/gi,''),this[_0x1ecdf2(0x17f)][_0x1aa77b]=_0x423e3d,_0x423e3d++;}return this['_elementIDs'][_0x3c9f49]||0x0;},SceneManager['isSceneBattle']=function(){const _0x38f585=_0x176333;return this['_scene']&&this[_0x38f585(0x15f)][_0x38f585(0x1a8)]===Scene_Battle;},VisuMZ[_0x176333(0x1ac)][_0x176333(0x94)]=Game_Action[_0x176333(0x1de)][_0x176333(0x9b)],Game_Action['prototype'][_0x176333(0x9b)]=function(_0x46c6ed){const _0x555f0f=_0x176333;_0x46c6ed[_0x555f0f(0x1d4)](this),VisuMZ[_0x555f0f(0x1ac)]['Game_Action_applyItemUserEffect'][_0x555f0f(0x172)](this,_0x46c6ed);},VisuMZ[_0x176333(0x1ac)][_0x176333(0x13b)]=Game_Battler['prototype'][_0x176333(0x19f)],Game_Battler[_0x176333(0x1de)]['onBattleStart']=function(_0x3da42e){const _0x3fbeb2=_0x176333;VisuMZ[_0x3fbeb2(0x1ac)][_0x3fbeb2(0x13b)]['call'](this,_0x3da42e),this[_0x3fbeb2(0x9f)]();},Game_Battler[_0x176333(0x1de)][_0x176333(0x9f)]=function(){const _0xf36848=_0x176333;this[_0xf36848(0x1b0)]={'deathTurn':0x0,'timesStruckSkills':{},'timesStruckSTypes':{},'timesStruckItems':{},'timesStruckStates':{},'timesStruckElements':{},'lastStruckType':_0xf36848(0xd6),'lastStruckSkill':0x0,'lastStruckSType':0x0,'lastStruckItem':0x0,'lastStruckState':0x0,'lastStruckElement':0x0};},Game_Battler[_0x176333(0x1de)][_0x176333(0x1b1)]=function(){const _0xc2e25c=_0x176333;return this[_0xc2e25c(0x1b0)]===undefined&&this[_0xc2e25c(0x9f)](),this[_0xc2e25c(0x1b0)];},Game_Battler['prototype']['getDeathTurn']=function(){return this['getConditionalDropsTrackedData']()['deathTurn']||0x0;},Game_Battler['prototype']['addTimesStruck']=function(_0x38574f,_0xa6ad3,_0x2c3d45){const _0xe1e01e=_0x176333,_0x2deb91=this[_0xe1e01e(0x1b1)]();_0x2c3d45=_0x2c3d45||0x1;const _0x265cad=_0xe1e01e(0x1ad)[_0xe1e01e(0x16d)](_0x38574f);if(!_0x2deb91[_0x265cad])return;_0x2deb91[_0x265cad][_0xa6ad3]=_0x2deb91[_0x265cad][_0xa6ad3]||0x0,_0x2deb91[_0x265cad][_0xa6ad3]+=_0x2c3d45;const _0x4c01bb=_0xe1e01e(0x163)[_0xe1e01e(0x16d)](_0x38574f);_0x2deb91[_0x4c01bb]=_0xa6ad3,[_0xe1e01e(0x19c),_0xe1e01e(0xe6)][_0xe1e01e(0x105)](_0x38574f)&&(_0x2deb91[_0xe1e01e(0xbb)]=_0x38574f);},Game_Battler[_0x176333(0x1de)][_0x176333(0x1a0)]=function(_0x2e6dcb){const _0x3dcbb4=this['getConditionalDropsTrackedData']()['timesStruckSkills'];return _0x3dcbb4[_0x2e6dcb]||0x0;},Game_Battler[_0x176333(0x1de)][_0x176333(0x1c8)]=function(_0x4b712c){const _0x4fe3bd=_0x176333,_0x377ee0=this[_0x4fe3bd(0x1b1)]()['timesStruckSTypes'];return _0x377ee0[_0x4b712c]||0x0;},Game_Battler[_0x176333(0x1de)][_0x176333(0x110)]=function(_0x280eba){const _0x1c5e46=_0x176333,_0x1d68c0=this['getConditionalDropsTrackedData']()[_0x1c5e46(0xa4)];return _0x1d68c0[_0x280eba]||0x0;},Game_Battler[_0x176333(0x1de)][_0x176333(0xc0)]=function(_0x2681fe){const _0xa466ce=_0x176333,_0x2b18f5=this[_0xa466ce(0x1b1)]()[_0xa466ce(0x100)];return _0x2b18f5[_0x2681fe]||0x0;},Game_Battler[_0x176333(0x1de)][_0x176333(0xd5)]=function(_0x2226ce){const _0x33ab11=this['getConditionalDropsTrackedData']()['timesStruckElements'];return _0x33ab11[_0x2226ce]||0x0;},Game_Battler[_0x176333(0x1de)][_0x176333(0x1d4)]=function(_0x1bb802){const _0x2fa359=_0x176333,_0x19e598=_0x1bb802[_0x2fa359(0xb4)]();if(!_0x19e598)return;if(_0x1bb802['isItem']())this['addTimesStruck']('Item',_0x19e598['id']);else{if(_0x1bb802[_0x2fa359(0x1e0)]())this[_0x2fa359(0x15c)](_0x2fa359(0xe6),_0x19e598['id']),this[_0x2fa359(0x15c)](_0x2fa359(0xfb),_0x19e598[_0x2fa359(0xd1)]);else return;}let _0x39c895=[];if(Imported[_0x2fa359(0x194)])_0x39c895=_0x1bb802[_0x2fa359(0xd2)]();else _0x1bb802[_0x2fa359(0xb4)]()[_0x2fa359(0x1d1)][_0x2fa359(0x101)]<0x0?_0x39c895=_0x1bb802[_0x2fa359(0x10c)]()[_0x2fa359(0x89)]():_0x39c895=[_0x1bb802[_0x2fa359(0xb4)]()[_0x2fa359(0x1d1)]['elementId']];while(_0x39c895[_0x2fa359(0x14e)]>0x0){const _0x24dee3=_0x39c895['shift']();if(_0x24dee3>0x0)this[_0x2fa359(0x15c)](_0x2fa359(0xe0),_0x24dee3);}},Game_Battler['prototype'][_0x176333(0x12c)]=function(){const _0x353db9=_0x176333,_0x1252fe=this[_0x353db9(0x1b1)]();_0x1252fe[_0x353db9(0xed)]=this['turnCount']();},VisuMZ['ExtraEnemyDrops']['Game_BattlerBase_addNewState']=Game_BattlerBase[_0x176333(0x1de)][_0x176333(0x1a3)],Game_BattlerBase['prototype'][_0x176333(0x1a3)]=function(_0x41f2aa){const _0x13bc35=_0x176333,_0x5e3407=this[_0x13bc35(0xf9)](_0x41f2aa);VisuMZ['ExtraEnemyDrops']['Game_BattlerBase_addNewState']['call'](this,_0x41f2aa),this['isStateAffected'](_0x41f2aa)&&(this['addTimesStruck'](_0x13bc35(0x1bb),_0x41f2aa),!_0x5e3407&&_0x41f2aa===this[_0x13bc35(0xc1)]()&&this['registerDeathTurn']());},VisuMZ['ExtraEnemyDrops']['Game_Enemy_makeDropItems']=Game_Enemy[_0x176333(0x1de)][_0x176333(0xe8)],Game_Enemy['prototype'][_0x176333(0xe8)]=function(){const _0x325ce3=_0x176333;let _0xd8016e=VisuMZ['ExtraEnemyDrops'][_0x325ce3(0x12d)][_0x325ce3(0x172)](this);return _0xd8016e=this[_0x325ce3(0xf4)](_0xd8016e),VisuMZ[_0x325ce3(0x1ac)][_0x325ce3(0xa7)](_0xd8016e);},Game_Enemy[_0x176333(0x1de)]['addExtraEnemyDrops']=function(_0x4a002b){const _0x55b8fa=_0x176333;return _0x4a002b=this['addExtraEnemyDropsSingles'](_0x4a002b),_0x4a002b=this[_0x55b8fa(0x1bc)](_0x4a002b),_0x4a002b=this[_0x55b8fa(0x189)](_0x4a002b),_0x4a002b=this[_0x55b8fa(0x171)](_0x4a002b),_0x4a002b;},Game_Enemy[_0x176333(0x1de)][_0x176333(0x133)]=function(_0x52945d){const _0x306569=_0x176333;return _0x52945d;const _0x19258b=this[_0x306569(0x1ba)]()[_0x306569(0x112)],_0x12e364=this[_0x306569(0x131)](),_0x1e07e4=_0x19258b[_0x306569(0xa6)](/<(.*?) DROP[ ](.*):[ ](\d+)([%％])>/gi);if(_0x1e07e4)for(const _0x157f5a of _0x1e07e4){let _0x5b9cca=$dataItems,_0x9e5502=null,_0x390167=0x0;if(_0x157f5a[_0x306569(0xa6)](/<(.*?) DROP[ ](\d+):[ ](\d+)([%％])>/i))_0x5b9cca=VisuMZ[_0x306569(0x1ac)][_0x306569(0x1b3)](RegExp['$1']),_0x9e5502=_0x5b9cca[Number(RegExp['$2'])],_0x390167=Number(RegExp['$3'])*0.01;else _0x157f5a[_0x306569(0xa6)](/<(.*?) DROP[ ](.*):[ ](\d+)([%％])>/i)&&(_0x9e5502=VisuMZ[_0x306569(0x1ac)][_0x306569(0xfe)](RegExp['$1'],RegExp['$2']),_0x390167=Number(RegExp['$3'])*0.01);_0x9e5502&&Math[_0x306569(0x183)]()<_0x390167*_0x12e364&&_0x52945d[_0x306569(0xd4)](_0x9e5502);}return _0x52945d;},Game_Enemy[_0x176333(0x1de)]['addExtraEnemyDropsBatch']=function(_0x189cde){const _0x35ef2d=_0x176333;return _0x189cde;const _0x207720=this[_0x35ef2d(0x1ba)]()[_0x35ef2d(0x112)],_0xc7869b=this[_0x35ef2d(0x131)]();if(_0x207720[_0x35ef2d(0xa6)](/<(?:DROP|DROPS)>\s*([\s\S]*)\s*<\/(?:DROP|DROPS)>/i)){const _0x368a3f=String(RegExp['$1']),_0x10b649=_0x368a3f[_0x35ef2d(0xa6)](/(.*?)[ ](.*):[ ](\d+)([%％])/gi);if(_0x10b649){let _0x27f604=$dataItems;for(const _0x4fd872 of _0x10b649){let _0x56c439=null,_0x2f1a1b=0x0;if(_0x4fd872[_0x35ef2d(0xa6)](/(.*?)[ ](\d+):[ ](\d+)([%％])/i))_0x27f604=VisuMZ[_0x35ef2d(0x1ac)][_0x35ef2d(0x1b3)](RegExp['$1']),_0x56c439=_0x27f604[Number(RegExp['$2'])],_0x2f1a1b=Number(RegExp['$3'])*0.01;else _0x4fd872[_0x35ef2d(0xa6)](/(.*?)[ ](.*):[ ](\d+)([%％])/i)&&(_0x56c439=VisuMZ[_0x35ef2d(0x1ac)][_0x35ef2d(0xfe)](RegExp['$1'],RegExp['$2']),_0x2f1a1b=Number(RegExp['$3'])*0.01);_0x56c439&&Math[_0x35ef2d(0x183)]()<_0x2f1a1b*_0xc7869b&&_0x189cde['push'](_0x56c439);}}}return _0x189cde;},VisuMZ['ExtraEnemyDrops']['getDatabase']=function(_0x6f1746){const _0x2173fe=_0x176333;_0x6f1746=_0x6f1746[_0x2173fe(0x1bd)]()[_0x2173fe(0x12a)]();if(['I',_0x2173fe(0x1c4),'ITEMS'][_0x2173fe(0x105)](_0x6f1746))return $dataItems;if(['W',_0x2173fe(0x1da),_0x2173fe(0x1bf)]['includes'](_0x6f1746))return $dataWeapons;if(['A',_0x2173fe(0x11f),_0x2173fe(0x135)]['includes'](_0x6f1746))return $dataArmors;if(['S',_0x2173fe(0x1a5),_0x2173fe(0x1ab)]['includes'](_0x6f1746))return $dataSkills;if(['T',_0x2173fe(0xd7),_0x2173fe(0x157)][_0x2173fe(0x105)](_0x6f1746))return $dataStates;return $dataItems;},VisuMZ[_0x176333(0x1ac)]['getDatabaseKind']=function(_0x514c2e){const _0x4047be=_0x176333;_0x514c2e=_0x514c2e[_0x4047be(0x1bd)]()[_0x4047be(0x12a)]();if(['I',_0x4047be(0x1c4),_0x4047be(0x1b5)][_0x4047be(0x105)](_0x514c2e))return 0x1;if(['W','WEAPON',_0x4047be(0x1bf)][_0x4047be(0x105)](_0x514c2e))return 0x2;if(['A',_0x4047be(0x11f),'ARMORS'][_0x4047be(0x105)](_0x514c2e))return 0x3;return 0x0;},VisuMZ['ExtraEnemyDrops']['getDatabaseItem']=function(_0x1b5bfe,_0x33c821){const _0x14f979=_0x176333;_0x1b5bfe=_0x1b5bfe[_0x14f979(0x1bd)]()[_0x14f979(0x12a)]();if(['I',_0x14f979(0x1c4),'ITEMS']['includes'](_0x1b5bfe))return $dataItems[DataManager[_0x14f979(0x1c0)](_0x33c821)];if(['W',_0x14f979(0x1da),'WEAPONS'][_0x14f979(0x105)](_0x1b5bfe))return $dataWeapons[DataManager[_0x14f979(0x88)](_0x33c821)];if(['A','ARMOR',_0x14f979(0x135)][_0x14f979(0x105)](_0x1b5bfe))return $dataArmors[DataManager[_0x14f979(0x1cc)](_0x33c821)];if(['S',_0x14f979(0x1a5),'SKILLS'][_0x14f979(0x105)](_0x1b5bfe))return $dataSkills[DataManager[_0x14f979(0x92)](_0x33c821)];if(['T',_0x14f979(0xd7),_0x14f979(0x157)][_0x14f979(0x105)](_0x1b5bfe))return $dataStates[DataManager[_0x14f979(0x124)](_0x33c821)];return null;},VisuMZ[_0x176333(0x1ac)]['getDatabaseItemID']=function(_0x200823,_0x4dc92b){const _0x258f4a=_0x176333;_0x200823=_0x200823[_0x258f4a(0x1bd)]()[_0x258f4a(0x12a)]();if(['I',_0x258f4a(0x1c4),_0x258f4a(0x1b5)][_0x258f4a(0x105)](_0x200823))return $dataItems[DataManager[_0x258f4a(0x1c0)](_0x4dc92b)]['id'];if(['W','WEAPON',_0x258f4a(0x1bf)]['includes'](_0x200823))return $dataWeapons[DataManager[_0x258f4a(0x88)](_0x4dc92b)]['id'];if(['A','ARMOR',_0x258f4a(0x135)][_0x258f4a(0x105)](_0x200823))return $dataArmors[DataManager['getArmorIdWithName'](_0x4dc92b)]['id'];return 0x0;},VisuMZ[_0x176333(0x1ac)][_0x176333(0xa7)]=function(_0x408167){const _0x136828=_0x176333;_0x408167[_0x136828(0x1c6)]((_0x1935ea,_0x149f11)=>_0x1935ea['id']-_0x149f11['id']);const _0x36452e=_0x408167[_0x136828(0x93)](_0x5e42b6=>DataManager[_0x136828(0x9a)](_0x5e42b6)),_0x3d2641=_0x408167['filter'](_0x54f308=>DataManager[_0x136828(0x1c5)](_0x54f308)),_0x489304=_0x408167[_0x136828(0x93)](_0x5dfdec=>DataManager[_0x136828(0x187)](_0x5dfdec));let _0x557d3b=_0x36452e[_0x136828(0xcb)](_0x3d2641)['concat'](_0x489304);return _0x557d3b;},Game_Enemy['prototype'][_0x176333(0x171)]=function(_0x3ba72f){const _0x333be2=_0x176333,_0x141d7b=this[_0x333be2(0x1ba)]()['id'];if(!VisuMZ[_0x333be2(0x1ac)]['JS'][_0x141d7b])return _0x3ba72f;return VisuMZ[_0x333be2(0x1ac)]['JS'][_0x141d7b]['call'](this,_0x3ba72f);},Game_Enemy[_0x176333(0x1de)][_0x176333(0x189)]=function(_0x190acc){const _0x20670c=_0x176333,_0x2ce467=this[_0x20670c(0x1ba)]()[_0x20670c(0x112)]['split'](/[\r\n]+/);let _0x237976=null,_0x542c5d=0x0;for(const _0x57a6ca of _0x2ce467){if(!_0x57a6ca)continue;if(!_0x237976&&_0x57a6ca[_0x20670c(0xa6)](/<CONDITIONAL (ITEM|WEAPON|ARMOR) (\d+)[ ](?:THROUGH|to)[ ](\d+) (?:DROP|DROPS)>/i)){const _0x1f18ee=VisuMZ[_0x20670c(0x1ac)][_0x20670c(0x1b3)](RegExp['$1']),_0x24053f=Number(RegExp['$2']),_0xab1fbf=Number(RegExp['$3']);_0x237976=[];for(let _0xae3deb=_0x24053f;_0xae3deb<=_0xab1fbf;_0xae3deb++){const _0x357165=_0x1f18ee[_0xae3deb]||null;_0x357165&&_0x357165[_0x20670c(0x96)]['trim']()!==''&&!_0x357165[_0x20670c(0x96)]['match'](/-----/i)&&_0x237976[_0x20670c(0xd4)](_0x357165);}_0x542c5d=0x0;}else{if(!_0x237976&&_0x57a6ca[_0x20670c(0xa6)](/<CONDITIONAL (ITEM|WEAPON|ARMOR) (\d+) (?:DROP|DROPS)>/i)){const _0x5ea16c=VisuMZ[_0x20670c(0x1ac)]['getDatabase'](RegExp['$1']);_0x237976=[_0x5ea16c[Number(RegExp['$2'])]||null],_0x542c5d=0x0;}else{if(!_0x237976&&_0x57a6ca[_0x20670c(0xa6)](/<CONDITIONAL (ITEM|WEAPON|ARMOR) (.*) (?:DROP|DROPS)>/i))_0x237976=[VisuMZ[_0x20670c(0x1ac)]['getDatabaseItem'](RegExp['$1'],RegExp['$2'])],_0x542c5d=0x0;else{if(_0x237976&&_0x57a6ca[_0x20670c(0xa6)](/<\/CONDITIONAL (.*) (?:DROP|DROPS)>/i)){for(const _0x1d82c6 of _0x237976){if(Math[_0x20670c(0x183)]()<_0x542c5d)_0x190acc['push'](_0x1d82c6);}_0x237976=null,_0x542c5d=0x0;}else{if(_0x237976&&_0x57a6ca[_0x20670c(0xa6)](/(.*):[ ]([\+\-]\d+)([%％])/i)){const _0x1edcf2=String(RegExp['$1']),_0x4f9f2d=Number(RegExp['$2'])*0.01;this[_0x20670c(0xff)](_0x1edcf2)&&(_0x542c5d+=_0x4f9f2d);}}}}}}return _0x190acc;},Game_Enemy[_0x176333(0x1de)][_0x176333(0xff)]=function(_0x130d5a){const _0xb4631c=_0x176333;if(_0x130d5a[_0xb4631c(0xa6)](/\bALWAYS\b/i))return!![];else{if(_0x130d5a['match'](/\bRANDOM[ ](\d+)([%％])\b/i)){const _0x413ec7=Number(RegExp['$1'])*0.01;return Math['random']()<_0x413ec7;}else{if(_0x130d5a[_0xb4631c(0xa6)](/\bLAST (?:STRIKE|STRUCK)[ ](ELEMENT|ITEM|SKILL|STYPE|STATE)[ ](\d+)\b/i)){let _0x1a1d8a=String(RegExp['$1'])[_0xb4631c(0xd0)]();const _0x13ba33=Number(RegExp['$2']);_0x1a1d8a=_0x1a1d8a[_0xb4631c(0x164)](0x0)[_0xb4631c(0x1bd)]()+_0x1a1d8a[_0xb4631c(0x154)](0x1);if(_0x1a1d8a[_0xb4631c(0xa6)](/STYPE/i))_0x1a1d8a=_0xb4631c(0xfb);const _0x264b78=this['getConditionalDropsTrackedData']();if(_0x1a1d8a==='Item'&&_0x264b78['lastStruckType']!==_0xb4631c(0x19c))return![];if(_0x1a1d8a===_0xb4631c(0xe6)&&_0x264b78[_0xb4631c(0xbb)]!==_0xb4631c(0xe6))return![];if(_0x1a1d8a===_0xb4631c(0xfb)&&_0x264b78[_0xb4631c(0xbb)]!==_0xb4631c(0xe6))return![];const _0x369ab1=_0xb4631c(0x163)['format'](_0x1a1d8a);return _0x264b78[_0x369ab1]===_0x13ba33;}else{if(_0x130d5a['match'](/\bLAST (?:STRIKE|STRUCK)[ ](ELEMENT|ITEM|SKILL|STYPE|STATE)[ ](.*)\b/i)){let _0x21b159=String(RegExp['$1'])[_0xb4631c(0xd0)]();const _0x2dc1b9=String(RegExp['$2']),_0x7eadd2=this['getConditionalDropsTrackedData']();let _0x2d8623=0x0;switch(_0x21b159[_0xb4631c(0x1bd)]()[_0xb4631c(0x12a)]()){case _0xb4631c(0x162):_0x2d8623=DataManager[_0xb4631c(0xd3)](_0x2dc1b9);return _0x7eadd2[_0xb4631c(0xae)]===_0x2d8623;case _0xb4631c(0x1c4):if(_0x7eadd2['lastStruckType']!==_0xb4631c(0x19c))return![];_0x2d8623=DataManager[_0xb4631c(0x1c0)](_0x2dc1b9);return _0x7eadd2[_0xb4631c(0x1dd)]===_0x2d8623;case _0xb4631c(0x1a5):if(_0x7eadd2[_0xb4631c(0xbb)]!=='Skill')return![];_0x2d8623=DataManager[_0xb4631c(0x92)](_0x2dc1b9);return _0x7eadd2[_0xb4631c(0x19e)]===_0x2d8623;case _0xb4631c(0x125):if(_0x7eadd2[_0xb4631c(0xbb)]!==_0xb4631c(0xe6))return![];_0x2d8623=DataManager[_0xb4631c(0x173)](_0x2dc1b9);return _0x7eadd2[_0xb4631c(0x10d)]===_0x2d8623;case _0xb4631c(0xd7):_0x2d8623=DataManager['getStateIdWithName'](_0x2dc1b9);return _0x7eadd2[_0xb4631c(0x18c)]===_0x2d8623;default:return![];}}else{let _0x36cac6=VisuMZ[_0xb4631c(0x1ac)][_0xb4631c(0x151)](this,_0x130d5a);try{return eval(_0x36cac6);}catch(_0x4dfa6e){return![];}}}}}},VisuMZ[_0x176333(0x1ac)][_0x176333(0x151)]=function(_0x416fe9,_0x414547){const _0x3c8bda=_0x176333;while(_0x414547[_0x3c8bda(0xa6)](/\b\\V\[(\d+)\]\b/gi)){_0x414547=_0x414547[_0x3c8bda(0x180)](/\b\\V\[(\d+)\]\b/gi,(_0x52a017,_0x433896)=>$gameVariables[_0x3c8bda(0xa9)](parseInt(_0x433896)));}while(_0x414547['match'](/\bVARIABLE (\d+)\b/gi)){_0x414547=_0x414547[_0x3c8bda(0x180)](/\bVARIABLE (\d+)\b/gi,(_0x1653fc,_0x5babea)=>$gameVariables['value'](parseInt(_0x5babea)));}return _0x414547=_0x414547[_0x3c8bda(0x180)](/\\S\[(\d+)\] ON/gi,(_0x2e70ca,_0x3fffb7)=>String($gameSwitches[_0x3c8bda(0xa9)](parseInt(_0x3fffb7))===!![])),_0x414547=_0x414547[_0x3c8bda(0x180)](/\\S\[(\d+)\] OFF/gi,(_0x3f11ef,_0x217fdf)=>String($gameSwitches[_0x3c8bda(0xa9)](parseInt(_0x217fdf))===![])),_0x414547=_0x414547[_0x3c8bda(0x180)](/\\S\[(\d+)\]/gi,(_0x2d1807,_0x1f1dad)=>String($gameSwitches[_0x3c8bda(0xa9)](parseInt(_0x1f1dad)))),_0x414547=_0x414547['replace'](/SWITCH (\d+) ON/gi,(_0x16d71e,_0x3850fa)=>String($gameSwitches['value'](parseInt(_0x3850fa))===!![])),_0x414547=_0x414547['replace'](/SWITCH (\d+) OFF/gi,(_0x29b77d,_0x436ffb)=>String($gameSwitches[_0x3c8bda(0xa9)](parseInt(_0x436ffb))===![])),_0x414547=_0x414547['replace'](/SWITCH (\d+)/gi,(_0x8f7ab6,_0x5c89aa)=>String($gameSwitches[_0x3c8bda(0xa9)](parseInt(_0x5c89aa)))),_0x414547=_0x414547[_0x3c8bda(0x180)](/\bON\b/gi,_0x3c8bda(0x167)),_0x414547=_0x414547[_0x3c8bda(0x180)](/\bOFF\b/gi,_0x3c8bda(0x143)),_0x414547=_0x414547[_0x3c8bda(0x180)](/\bTRUE\b/gi,_0x3c8bda(0x167)),_0x414547=_0x414547[_0x3c8bda(0x180)](/\bFALSE\b/gi,_0x3c8bda(0x143)),_0x414547=_0x414547[_0x3c8bda(0x180)](/\b(ITEM|WEAPON|ARMOR)[ ](\d+)[ ]COUNT\b/gi,(_0x257f83,_0xc48b70,_0x3acb3d)=>{const _0x4db65b=_0x3c8bda,_0x2529a9=VisuMZ[_0x4db65b(0x1ac)]['getDatabase'](_0xc48b70),_0x217dea=_0x2529a9[Number(_0x3acb3d)]||null;return _0x217dea?$gameParty[_0x4db65b(0x142)](_0x217dea):0x0;}),_0x414547=_0x414547[_0x3c8bda(0x180)](/\b(ITEM|WEAPON|ARMOR)[ ](.*)[ ]COUNT\b/gi,(_0x1fac4e,_0x3e69cf,_0x3e9c6a)=>{const _0x337739=_0x3c8bda,_0x52686a=VisuMZ['ExtraEnemyDrops'][_0x337739(0xfe)](_0x3e69cf,_0x3e9c6a);return _0x52686a?$gameParty[_0x337739(0x142)](_0x52686a):0x0;}),_0x414547=_0x414547[_0x3c8bda(0x180)](/\bTIMES[ ](ELEMENT|ITEM|SKILL|STYPE|STATE)[ ](\d+)[ ](?:STRIKE|STRUCK)\b/gi,(_0x46e32e,_0x3e9e08,_0x2e0297)=>{const _0x864ff3=_0x3c8bda;let _0x5596fd=_0x3e9e08;const _0x46d0cc=_0x2e0297;_0x5596fd=_0x5596fd[_0x864ff3(0x164)](0x0)[_0x864ff3(0x1bd)]()+_0x5596fd['slice'](0x1);if(_0x5596fd['match'](/STYPE/i))_0x5596fd=_0x864ff3(0xfb);const _0x59e5f4=_0x864ff3(0x15b)['format'](_0x5596fd);if(_0x416fe9[_0x59e5f4])return _0x416fe9[_0x59e5f4](_0x46d0cc);return 0x0;}),_0x414547=_0x414547['replace'](/\bTIMES[ ](ELEMENT|ITEM|SKILL|STYPE|STATE)[ ](.*)[ ](?:STRIKE|STRUCK)\b/gi,(_0x5934d5,_0x2fec23,_0x3964c0)=>{const _0x400f61=_0x3c8bda;let _0x1ce4a6=_0x2fec23;const _0x44b9cb=_0x3964c0;let _0x1343bd=0x0;switch(_0x1ce4a6[_0x400f61(0x1bd)]()['trim']()){case _0x400f61(0x162):_0x1343bd=DataManager['getElementIdWithName'](_0x44b9cb);break;case'ITEM':_0x1343bd=DataManager['getItemIdWithName'](_0x44b9cb);break;case _0x400f61(0x1a5):_0x1343bd=DataManager[_0x400f61(0x92)](_0x44b9cb);break;case _0x400f61(0x125):_0x1343bd=DataManager[_0x400f61(0x173)](_0x44b9cb);break;case _0x400f61(0xd7):_0x1343bd=DataManager[_0x400f61(0x124)](_0x44b9cb);break;default:return 0x0;}_0x1ce4a6=_0x1ce4a6[_0x400f61(0x164)](0x0)[_0x400f61(0x1bd)]()+_0x1ce4a6[_0x400f61(0x154)](0x1);if(_0x1ce4a6[_0x400f61(0xa6)](/STYPE/i))_0x1ce4a6=_0x400f61(0xfb);const _0x2a5f8e=_0x400f61(0x15b)[_0x400f61(0x16d)](_0x1ce4a6);if(_0x416fe9[_0x2a5f8e])return _0x416fe9[_0x2a5f8e](_0x1343bd);return 0x0;}),_0x414547=_0x414547[_0x3c8bda(0x180)](/\bALIVE MEMBERS\b/gi,$gameParty[_0x3c8bda(0x1dc)]()['length']),_0x414547=_0x414547['replace'](/\bBATTLE MEMBERS\b/gi,$gameParty['battleMembers']()['length']),_0x414547=_0x414547[_0x3c8bda(0x180)](/\bBATTLE TURNS\b/gi,$gameTroop['turnCount']()),_0x414547=_0x414547[_0x3c8bda(0x180)](/\bDEAD MEMBERS\b/gi,$gameParty[_0x3c8bda(0x15d)]()[_0x3c8bda(0x14e)]),_0x414547=_0x414547[_0x3c8bda(0x180)](/\bDEATH TURN\b/gi,_0x416fe9[_0x3c8bda(0x16e)]()||0x1),_0x414547=_0x414547[_0x3c8bda(0x180)](/\bENEMY LEVEL\b/gi,_0x416fe9[_0x3c8bda(0x18e)]||0x1),_0x414547=_0x414547[_0x3c8bda(0x180)](/\bPARTY GOLD\b/gi,$gameParty[_0x3c8bda(0xe3)]()),_0x414547=_0x414547[_0x3c8bda(0x180)](/\bPARTY MEMBERS\b/gi,$gameParty[_0x3c8bda(0x1c7)]()[_0x3c8bda(0x14e)]),_0x414547;},VisuMZ['ExtraEnemyDrops'][_0x176333(0x19d)]=Game_Troop[_0x176333(0x1de)][_0x176333(0x10b)],Game_Troop[_0x176333(0x1de)][_0x176333(0x10b)]=function(){const _0x5dca4f=_0x176333;VisuMZ['ExtraEnemyDrops'][_0x5dca4f(0x19d)][_0x5dca4f(0x172)](this),this[_0x5dca4f(0x14c)](),this['clearBonusRewards']();},Game_Troop[_0x176333(0x1de)][_0x176333(0x14c)]=function(){this['_forcedRewards']={'exp':undefined,'gold':undefined,'drops':undefined};},Game_Troop[_0x176333(0x1de)][_0x176333(0x145)]=function(){this['_bonusRewards']={'exp':0x0,'gold':0x0,'drops':[]};},VisuMZ['ExtraEnemyDrops']['Game_Troop_expTotal']=Game_Troop[_0x176333(0x1de)]['expTotal'],Game_Troop['prototype'][_0x176333(0x1c9)]=function(){const _0x2c2199=_0x176333;if(this['_forcedRewards']===undefined)this['clearForcedRewards']();if(this['_bonusRewards']===undefined)this[_0x2c2199(0x145)]();let _0x48ce84=this[_0x2c2199(0xb6)][_0x2c2199(0x141)]===undefined?VisuMZ[_0x2c2199(0x1ac)]['Game_Troop_expTotal']['call'](this):this['_forcedRewards'][_0x2c2199(0x141)];return Math[_0x2c2199(0x197)](Math[_0x2c2199(0x107)](_0x48ce84+(this[_0x2c2199(0x14d)][_0x2c2199(0x141)]||0x0),0x0));},VisuMZ[_0x176333(0x1ac)]['Game_Troop_goldTotal']=Game_Troop['prototype'][_0x176333(0xc5)],Game_Troop['prototype'][_0x176333(0xc5)]=function(){const _0x429f2d=_0x176333;if(this['_forcedRewards']===undefined)this[_0x429f2d(0x14c)]();if(this[_0x429f2d(0x14d)]===undefined)this[_0x429f2d(0x145)]();let _0x462363=this[_0x429f2d(0xb6)][_0x429f2d(0xe3)]===undefined?VisuMZ[_0x429f2d(0x1ac)][_0x429f2d(0x140)][_0x429f2d(0x172)](this):this[_0x429f2d(0xb6)][_0x429f2d(0xe3)]*this[_0x429f2d(0x1c3)]();return Math[_0x429f2d(0x197)](Math[_0x429f2d(0x107)](_0x462363+(this[_0x429f2d(0x14d)][_0x429f2d(0xe3)]||0x0)*this[_0x429f2d(0x1c3)](),0x0));},VisuMZ[_0x176333(0x1ac)][_0x176333(0x1d7)]=Game_Troop[_0x176333(0x1de)][_0x176333(0xe8)],Game_Troop[_0x176333(0x1de)][_0x176333(0xe8)]=function(){const _0x197754=_0x176333;if(this[_0x197754(0xb6)]===undefined)this[_0x197754(0x14c)]();if(this[_0x197754(0x14d)]===undefined)this[_0x197754(0x145)]();let _0x354c41=this[_0x197754(0xb6)][_0x197754(0xe9)]===undefined?VisuMZ[_0x197754(0x1ac)][_0x197754(0x1d7)]['call'](this):this[_0x197754(0xb6)][_0x197754(0xe9)];return _0x354c41[_0x197754(0xcb)](this[_0x197754(0x14d)][_0x197754(0xe9)]);},Game_Troop[_0x176333(0x1de)][_0x176333(0x8d)]=function(_0x4e24d2){const _0x1e4856=_0x176333;if(this['_forcedRewards']===undefined)this[_0x1e4856(0x14c)]();if(this[_0x1e4856(0x14d)]===undefined)this[_0x1e4856(0x145)]();this[_0x1e4856(0xb6)][_0x1e4856(0x141)]=Math[_0x1e4856(0x107)](0x0,Math[_0x1e4856(0x197)](_0x4e24d2));},Game_Troop[_0x176333(0x1de)][_0x176333(0x1a9)]=function(_0x5b8d58){const _0x1cd655=_0x176333;if(this[_0x1cd655(0xb6)]===undefined)this[_0x1cd655(0x14c)]();if(this[_0x1cd655(0x14d)]===undefined)this[_0x1cd655(0x145)]();this['_bonusRewards'][_0x1cd655(0x141)]=Math[_0x1cd655(0x107)](0x0,Math[_0x1cd655(0x197)](_0x5b8d58));},Game_Troop['prototype'][_0x176333(0x1df)]=function(_0x3f9560){const _0x25d4a4=_0x176333;if(this[_0x25d4a4(0xb6)]===undefined)this[_0x25d4a4(0x14c)]();if(this[_0x25d4a4(0x14d)]===undefined)this[_0x25d4a4(0x145)]();this[_0x25d4a4(0xb6)][_0x25d4a4(0xe3)]=Math[_0x25d4a4(0x107)](0x0,Math[_0x25d4a4(0x197)](_0x3f9560));},Game_Troop[_0x176333(0x1de)][_0x176333(0x1a7)]=function(_0x268233){const _0x15cb64=_0x176333;if(this[_0x15cb64(0xb6)]===undefined)this[_0x15cb64(0x14c)]();if(this[_0x15cb64(0x14d)]===undefined)this['clearBonusRewards']();this[_0x15cb64(0x14d)][_0x15cb64(0xe3)]=Math[_0x15cb64(0x107)](0x0,Math[_0x15cb64(0x197)](_0x268233));},Game_Troop[_0x176333(0x1de)][_0x176333(0xd8)]=function(_0x1eee25,_0x1f415f){const _0x2b0f88=_0x176333;if(this[_0x2b0f88(0xb6)]===undefined)this[_0x2b0f88(0x14c)]();if(this[_0x2b0f88(0x14d)]===undefined)this['clearBonusRewards']();_0x1f415f=_0x1f415f||0x1,this[_0x2b0f88(0xb6)]['drops']=this[_0x2b0f88(0xb6)][_0x2b0f88(0xe9)]||[];while(_0x1f415f--){const _0x456155=$dataItems[_0x1eee25];if(_0x456155)this[_0x2b0f88(0xb6)][_0x2b0f88(0xe9)][_0x2b0f88(0xd4)](_0x456155);}},Game_Troop['prototype'][_0x176333(0x148)]=function(_0x45f162,_0x2eb94a){const _0x57681e=_0x176333;if(this[_0x57681e(0xb6)]===undefined)this[_0x57681e(0x14c)]();if(this['_bonusRewards']===undefined)this[_0x57681e(0x145)]();_0x2eb94a=_0x2eb94a||0x1,this['_forcedRewards']['drops']=this[_0x57681e(0xb6)][_0x57681e(0xe9)]||[];while(_0x2eb94a--){const _0x5d6269=$dataWeapons[_0x45f162];if(_0x5d6269)this['_forcedRewards'][_0x57681e(0xe9)][_0x57681e(0xd4)](_0x5d6269);}},Game_Troop['prototype'][_0x176333(0x8e)]=function(_0x119325,_0x243495){const _0x4db27b=_0x176333;if(this['_forcedRewards']===undefined)this[_0x4db27b(0x14c)]();if(this[_0x4db27b(0x14d)]===undefined)this[_0x4db27b(0x145)]();_0x243495=_0x243495||0x1,this[_0x4db27b(0xb6)][_0x4db27b(0xe9)]=this['_forcedRewards'][_0x4db27b(0xe9)]||[];while(_0x243495--){const _0x2a0be2=$dataArmors[_0x119325];if(_0x2a0be2)this[_0x4db27b(0xb6)][_0x4db27b(0xe9)][_0x4db27b(0xd4)](_0x2a0be2);}},Game_Troop[_0x176333(0x1de)][_0x176333(0x1ae)]=function(_0x269124,_0x11180e){const _0x4ac3cb=_0x176333;if(this[_0x4ac3cb(0xb6)]===undefined)this[_0x4ac3cb(0x14c)]();if(this['_bonusRewards']===undefined)this['clearBonusRewards']();_0x11180e=_0x11180e||0x1;while(_0x11180e--){const _0x2a1c54=$dataItems[_0x269124];if(_0x2a1c54)this[_0x4ac3cb(0x14d)][_0x4ac3cb(0xe9)]['push'](_0x2a1c54);}},Game_Troop[_0x176333(0x1de)]['addBonusWeaponDrop']=function(_0x379104,_0x2ff178){const _0x116ba3=_0x176333;if(this['_forcedRewards']===undefined)this[_0x116ba3(0x14c)]();if(this['_bonusRewards']===undefined)this[_0x116ba3(0x145)]();_0x2ff178=_0x2ff178||0x1;while(_0x2ff178--){const _0xff8bad=$dataWeapons[_0x379104];if(_0xff8bad)this[_0x116ba3(0x14d)][_0x116ba3(0xe9)][_0x116ba3(0xd4)](_0xff8bad);}},Game_Troop[_0x176333(0x1de)]['addBonusArmorDrop']=function(_0x1f7af3,_0xbc262b){const _0x44250b=_0x176333;if(this[_0x44250b(0xb6)]===undefined)this['clearForcedRewards']();if(this[_0x44250b(0x14d)]===undefined)this[_0x44250b(0x145)]();_0xbc262b=_0xbc262b||0x1;while(_0xbc262b--){const _0x2df3ba=$dataArmors[_0x1f7af3];if(_0x2df3ba)this[_0x44250b(0x14d)]['drops'][_0x44250b(0xd4)](_0x2df3ba);}},Game_Troop[_0x176333(0x1de)][_0x176333(0xb1)]=function(){const _0xcdcea1=_0x176333;if(this[_0xcdcea1(0xb6)]===undefined)this[_0xcdcea1(0x14c)]();return this[_0xcdcea1(0xb6)]['drops']!==undefined;};if(Imported[_0x176333(0x149)]&&VisuMZ[_0x176333(0x1ac)][_0x176333(0x146)][_0x176333(0x116)][_0x176333(0xac)]){VisuMZ[_0x176333(0x182)]=VisuMZ[_0x176333(0x182)]||{},VisuMZ[_0x176333(0x182)][_0x176333(0x120)]=BattleManager[_0x176333(0x10a)],BattleManager['initMembers']=function(){const _0x16117a=_0x176333;$gameTemp['_visualDropSprites']=[],BattleManager[_0x16117a(0xca)]=!![],VisuMZ[_0x16117a(0x182)][_0x16117a(0x120)]['call'](this);},VisuMZ[_0x176333(0x182)][_0x176333(0x170)]=Game_BattlerBase[_0x176333(0x1de)][_0x176333(0x1a3)],Game_BattlerBase[_0x176333(0x1de)][_0x176333(0x1a3)]=function(_0x5edaf5){const _0x1debf2=_0x176333,_0x2c2ce3=this[_0x1debf2(0x186)]();VisuMZ['VisualDrops'][_0x1debf2(0x170)][_0x1debf2(0x172)](this,_0x5edaf5);if(!Imported[_0x1debf2(0x149)])return;if(!this['isEnemy']())return;if(!SceneManager[_0x1debf2(0x1b8)]())return;const _0x2ec1d8=SceneManager[_0x1debf2(0x15f)][_0x1debf2(0x1ce)];if(!_0x2ec1d8)return;_0x2c2ce3&&this[_0x1debf2(0x127)]()&&_0x2ec1d8['createVisualDrops'](this);},VisuMZ[_0x176333(0x182)][_0x176333(0x16b)]=Game_BattlerBase['prototype']['eraseState'],Game_BattlerBase['prototype'][_0x176333(0xda)]=function(_0x2de7c8){const _0x12dfc8=_0x176333,_0x589c82=this[_0x12dfc8(0x127)]();VisuMZ[_0x12dfc8(0x182)][_0x12dfc8(0x16b)][_0x12dfc8(0x172)](this,_0x2de7c8);if(!Imported['VisuMZ_1_BattleCore'])return;if(!this['isEnemy']())return;if(!SceneManager[_0x12dfc8(0x1b8)]())return;const _0x469594=SceneManager[_0x12dfc8(0x15f)]['_spriteset'];if(!_0x469594)return;if(_0x589c82&&this['isAlive']()){_0x469594[_0x12dfc8(0x19b)](this);if(VisuMZ[_0x12dfc8(0x1ac)]['Settings'][_0x12dfc8(0x116)][_0x12dfc8(0x12b)])this[_0x12dfc8(0x1cf)]();}},VisuMZ[_0x176333(0x182)]['Game_Enemy_setup']=Game_Enemy[_0x176333(0x1de)][_0x176333(0x1d3)],Game_Enemy[_0x176333(0x1de)][_0x176333(0x1d3)]=function(_0x396a37,_0x4587eb,_0x1e75d6){const _0x4edf9f=_0x176333;VisuMZ['VisualDrops'][_0x4edf9f(0x18a)][_0x4edf9f(0x172)](this,_0x396a37,_0x4587eb,_0x1e75d6);},Game_Enemy[_0x176333(0x1de)][_0x176333(0x1cf)]=function(){const _0x1ce669=_0x176333;this[_0x1ce669(0x153)]={};},VisuMZ['VisualDrops'][_0x176333(0x1b7)]=Game_Enemy[_0x176333(0x1de)][_0x176333(0x141)],Game_Enemy['prototype'][_0x176333(0x141)]=function(){const _0x7935b0=_0x176333;this[_0x7935b0(0x153)]=this[_0x7935b0(0x153)]||{};if(this[_0x7935b0(0x153)][_0x7935b0(0x141)]!==undefined)return this[_0x7935b0(0x153)]['exp'];return this[_0x7935b0(0x153)][_0x7935b0(0x141)]=VisuMZ[_0x7935b0(0x182)][_0x7935b0(0x1b7)][_0x7935b0(0x172)](this),this[_0x7935b0(0x153)][_0x7935b0(0x141)];},VisuMZ[_0x176333(0x182)][_0x176333(0x8f)]=Game_Enemy[_0x176333(0x1de)][_0x176333(0xe3)],Game_Enemy[_0x176333(0x1de)]['gold']=function(){const _0x9477af=_0x176333;this[_0x9477af(0x153)]=this['_visualDrops']||{};if(this[_0x9477af(0x153)]['gold']!==undefined)return this[_0x9477af(0x153)]['gold'];return this[_0x9477af(0x153)][_0x9477af(0xe3)]=VisuMZ['VisualDrops']['Game_Enemy_gold'][_0x9477af(0x172)](this),this[_0x9477af(0x153)]['gold'];},VisuMZ[_0x176333(0x182)][_0x176333(0x12d)]=Game_Enemy[_0x176333(0x1de)][_0x176333(0xe8)],Game_Enemy[_0x176333(0x1de)][_0x176333(0xe8)]=function(){const _0x4d11bc=_0x176333;this[_0x4d11bc(0x153)]=this['_visualDrops']||{};if(this[_0x4d11bc(0x153)][_0x4d11bc(0xe9)]!==undefined)return this[_0x4d11bc(0x153)]['drops'];return this['_visualDrops'][_0x4d11bc(0xe9)]=VisuMZ[_0x4d11bc(0x182)][_0x4d11bc(0x12d)][_0x4d11bc(0x172)](this),this['_visualDrops'][_0x4d11bc(0xe9)];},Spriteset_Battle[_0x176333(0x1de)]['removeVisualDrops']=function(_0x150677){const _0x38c8db=_0x176333;if(!_0x150677)return;$gameTemp[_0x38c8db(0x13c)]=$gameTemp[_0x38c8db(0x13c)]||[];const _0x2c7810=[];for(const _0x52fcf8 of $gameTemp[_0x38c8db(0x13c)]){if(!_0x52fcf8)continue;if(_0x52fcf8[_0x38c8db(0x1ba)]!==_0x150677)continue;const _0x56dc37=this[_0x38c8db(0x109)](_0x52fcf8);if(!_0x56dc37)continue;_0x56dc37[_0x38c8db(0xe4)](),_0x2c7810[_0x38c8db(0xd4)](_0x52fcf8);}for(const _0x1c20c3 of _0x2c7810){$gameTemp[_0x38c8db(0x13c)][_0x38c8db(0x1a1)](_0x1c20c3);}},Spriteset_Battle['prototype']['findTargetDropSprite']=function(_0x21b803){const _0x32d78d=_0x176333;return this[_0x32d78d(0xbd)]['children'][_0x32d78d(0x11e)](_0x45fdcc=>_0x45fdcc['_data']===_0x21b803);},Spriteset_Battle[_0x176333(0x1de)]['createVisualDrops']=function(_0x23ebd0){const _0x54471f=_0x176333,_0x32dc8d=VisuMZ[_0x54471f(0x1ac)][_0x54471f(0x146)];if(!_0x23ebd0)return;let _0x49dec1=[];_0x32dc8d[_0x54471f(0x147)][_0x54471f(0x165)]&&_0x49dec1[_0x54471f(0xd4)](VisuMZ['VisualDrops'][_0x54471f(0xcc)](_0x23ebd0,_0x54471f(0x147)));_0x32dc8d[_0x54471f(0xbe)][_0x54471f(0x165)]&&_0x49dec1['push'](VisuMZ[_0x54471f(0x182)][_0x54471f(0xcc)](_0x23ebd0,'Gold'));_0x32dc8d['Drop']['show']&&(_0x49dec1=_0x49dec1[_0x54471f(0xcb)](VisuMZ[_0x54471f(0x182)]['getItemDropIcons'](_0x23ebd0)));const _0x4ac5ad=VisuMZ[_0x54471f(0x182)]['createSprites'](_0x23ebd0,_0x49dec1);$gameTemp[_0x54471f(0x13c)]=$gameTemp[_0x54471f(0x13c)]||[];let _0x11fbc6=0x0;for(const _0x20682b of _0x4ac5ad){if(!_0x20682b)continue;$gameTemp[_0x54471f(0x13c)][_0x54471f(0xd4)](_0x20682b['_data']),setTimeout(this['addVisualDrops']['bind'](this,_0x20682b),_0x11fbc6),_0x11fbc6+=_0x32dc8d[_0x54471f(0x116)]['msDelay'];}},Spriteset_Battle['prototype']['addVisualDrops']=function(_0x5a4eb1){const _0x54cc78=_0x176333;if(!SceneManager[_0x54cc78(0x1b8)]())return;this[_0x54cc78(0xbd)][_0x54cc78(0x1e3)](_0x5a4eb1),_0x5a4eb1['startSpecialSFX']();},VisuMZ[_0x176333(0x182)]['getExpGoldDropIcon']=function(_0x37096a,_0x1b6c09){const _0x209280=_0x176333;if(!_0x37096a)return 0x0;const _0x122e8c=VisuMZ[_0x209280(0x1ac)]['Settings'][_0x1b6c09],_0x298a85=VisuMZ[_0x209280(0x1ac)]['Settings'][_0x209280(0x1cb)],_0x4ed40f=_0x1b6c09===_0x209280(0x147)?_0x37096a['exp']():_0x37096a['gold']();let _0x570aeb=0x0,_0x4ef90e=0x0,_0x20dd04=_0x298a85[_0x209280(0x169)],_0x1452f1=_0x298a85['Duration0'],_0x3c4330=JsonEx[_0x209280(0xdb)](_0x298a85[_0x209280(0x1a4)]);for(let _0x7a0d7c=0x1;_0x7a0d7c<=0xa;_0x7a0d7c++){const _0x3cb28f=_0x209280(0xec)[_0x209280(0x16d)](_0x7a0d7c),_0xffbe45=_0x209280(0x106)[_0x209280(0x16d)](_0x7a0d7c),_0x35588a=_0x209280(0x115)[_0x209280(0x16d)](_0x7a0d7c);if(_0x122e8c[_0x3cb28f]<_0x570aeb)continue;if(_0x4ed40f<_0x122e8c[_0x3cb28f])continue;_0x570aeb=_0x122e8c[_0x3cb28f],_0x4ef90e=_0x122e8c[_0xffbe45];const _0x5ef9e3=_0x122e8c[_0x35588a]['clamp'](0x0,0xa);_0x20dd04=_0x298a85['Tint%1'[_0x209280(0x16d)](_0x5ef9e3)]||[0x0,0x0,0x0,0x0],_0x1452f1=_0x298a85['Duration%1'['format'](_0x5ef9e3)]||0x1,_0x3c4330=_0x298a85[_0x209280(0x195)[_0x209280(0x16d)](_0x5ef9e3)]||[];}return[_0x4ef90e,_0x20dd04,_0x1452f1,_0x3c4330];},VisuMZ['VisualDrops'][_0x176333(0x15e)]=function(_0x731adf){const _0x4ae57e=_0x176333,_0x3431a0=[],_0x5f0009=_0x731adf['makeDropItems'](),_0x1032d4=VisuMZ['ExtraEnemyDrops'][_0x4ae57e(0x146)][_0x4ae57e(0x1a2)],_0x1cc514=VisuMZ[_0x4ae57e(0x1ac)][_0x4ae57e(0x146)]['Rarity'];for(const _0x24af97 of _0x5f0009){if(!_0x24af97)continue;const _0x4ae123=[];if(_0x24af97[_0x4ae57e(0x112)][_0x4ae57e(0xa6)](/<VISUAL DROP ICON:[ ](\d+)>/i))_0x4ae123[_0x4ae57e(0xd4)](Number(RegExp['$1'])||0x0);else{if(_0x1032d4[_0x4ae57e(0xc4)])_0x4ae123[_0x4ae57e(0xd4)](_0x24af97[_0x4ae57e(0x14a)]);else{if(DataManager[_0x4ae57e(0x9a)](_0x24af97))_0x4ae123['push'](_0x1032d4[_0x4ae57e(0xe5)]);else{if(DataManager[_0x4ae57e(0x1c5)](_0x24af97))_0x4ae123[_0x4ae57e(0xd4)](_0x1032d4[_0x4ae57e(0x113)]);else DataManager['isArmor'](_0x24af97)&&_0x4ae123[_0x4ae57e(0xd4)](_0x1032d4[_0x4ae57e(0xf5)]);}}}if(_0x24af97[_0x4ae57e(0x112)][_0x4ae57e(0xa6)](/<VISUAL DROP RARITY:[ ](\d+)>/i)){const _0x36b38c=Number(RegExp['$1'])['clamp'](0x0,0xa);_0x4ae123['push'](_0x1cc514[_0x4ae57e(0x160)[_0x4ae57e(0x16d)](_0x36b38c)]||[0x0,0x0,0x0,0x0]),_0x4ae123[_0x4ae57e(0xd4)](_0x1cc514[_0x4ae57e(0xe1)[_0x4ae57e(0x16d)](_0x36b38c)]||0xb4),_0x4ae123[_0x4ae57e(0xd4)](_0x1cc514['Flags%1'['format'](_0x36b38c)]||[]);}else{if(_0x24af97[_0x4ae57e(0x112)][_0x4ae57e(0xa6)](/<VISUAL DROP TINT COLOR:[ ](.*)>/i)){let _0x2ad1fd=String(RegExp['$1'])[_0x4ae57e(0x1cd)](',')[_0x4ae57e(0xbf)](_0x366546=>Number(_0x366546)[_0x4ae57e(0x10f)](-0xff,0xff));while(_0x2ad1fd[_0x4ae57e(0x14e)]<0x4)_0x2ad1fd[_0x4ae57e(0xd4)](0x0);_0x4ae123[_0x4ae57e(0xd4)](_0x2ad1fd);}else _0x4ae123['push'](_0x1cc514[_0x4ae57e(0x169)]);_0x24af97[_0x4ae57e(0x112)][_0x4ae57e(0xa6)](/<VISUAL DROP TINT DURATION:[ ](\d+)>/i)?_0x4ae123[_0x4ae57e(0xd4)](Number(RegExp['$1'])||0xb4):_0x4ae123['push'](_0x1cc514['TintDuration0']),_0x4ae123['push'](JsonEx[_0x4ae57e(0xdb)](_0x1cc514[_0x4ae57e(0x1a4)]));}const _0x5e4a5a=_0x24af97[_0x4ae57e(0x112)]['match'](/<VISUAL DROP FLAG:[ ](.*)>/gi);if(_0x5e4a5a)for(const _0x4971d0 of _0x5e4a5a){_0x4971d0[_0x4ae57e(0xa6)](/<VISUAL DROP FLAG:[ ](.*)>/i);const _0x5bc826=String(RegExp['$1']);_0x4ae123[_0x4ae123[_0x4ae57e(0x14e)]-0x1][_0x4ae57e(0xd4)](_0x5bc826);}if(_0x24af97[_0x4ae57e(0x112)][_0x4ae57e(0xa6)](/<VISUAL DROP SFX:[ ](.*)>/i)){const _0x45a01d=_0x4ae57e(0x108)[_0x4ae57e(0x16d)](String(RegExp['$1']));_0x4ae123[_0x4ae123[_0x4ae57e(0x14e)]-0x1]['push'](_0x45a01d);}if(_0x24af97[_0x4ae57e(0x112)]['match'](/<VISUAL DROP SPAWN SFX:[ ](.*)>/i)){const _0x44b644=_0x4ae57e(0x108)[_0x4ae57e(0x16d)](String(RegExp['$1']));_0x4ae123[_0x4ae123[_0x4ae57e(0x14e)]-0x1]['push'](_0x44b644);}if(_0x24af97['note']['match'](/<VISUAL DROP BOUNCE HEIGHT:[ ](\d+)([%％])>/i)){const _0x123b8f=_0x4ae57e(0x121)['format'](Number(RegExp['$1']));_0x4ae123[_0x4ae123[_0x4ae57e(0x14e)]-0x1]['push'](_0x123b8f);}if(_0x24af97['note']['match'](/<VISUAL DROP BOUNCE SFX:[ ](.*)>/i)){const _0x2a2f74=_0x4ae57e(0x179)['format'](String(RegExp['$1']));_0x4ae123[_0x4ae123[_0x4ae57e(0x14e)]-0x1][_0x4ae57e(0xd4)](_0x2a2f74);}_0x3431a0[_0x4ae57e(0xd4)](_0x4ae123);}return _0x3431a0;},VisuMZ['VisualDrops'][_0x176333(0x184)]=function(_0x36c6d5,_0x1784ed){const _0x4e0c5d=_0x176333;_0x1784ed=_0x1784ed['filter'](_0x2d55a2=>_0x2d55a2[0x0]!==0x0);if(_0x1784ed[_0x4e0c5d(0x14e)]<=0x0)return[];const _0x5202e9=VisuMZ[_0x4e0c5d(0x1ac)][_0x4e0c5d(0x146)][_0x4e0c5d(0x116)],_0x313e94=0x168/_0x1784ed[_0x4e0c5d(0x14e)],_0x57e6e5=_0x36c6d5['battler'](),_0x2f0c9c=[];let _0x5dd9c7=Math[_0x4e0c5d(0x138)](0x168);for(const _0x2dda90 of _0x1784ed){if(_0x2dda90[0x0]<=0x0)continue;const _0xe4aa1c=new Sprite_VisualDrop(_0x36c6d5,_0x2dda90);_0x2f0c9c[_0x4e0c5d(0xd4)](_0xe4aa1c);if(_0x57e6e5&&_0x1784ed[_0x4e0c5d(0x14e)]>0x1){const _0x5c5a28=_0x5202e9[_0x4e0c5d(0x114)]+_0x5202e9[_0x4e0c5d(0xfd)]*_0x1784ed['length'],_0x20c472=_0x5c5a28*Math[_0x4e0c5d(0xf8)](_0x5dd9c7*Math['PI']/0xb4),_0x5d120a=_0x5c5a28*(Math[_0x4e0c5d(0xf0)](_0x5dd9c7*Math['PI']/0xb4)*_0x5202e9[_0x4e0c5d(0x18f)]);_0xe4aa1c[_0x4e0c5d(0x14f)](_0x20c472+_0x57e6e5[_0x4e0c5d(0x17c)],_0x5d120a+_0x57e6e5['_baseY']),_0x5dd9c7+=_0x313e94;}}return _0x2f0c9c;},VisuMZ['VisualDrops']['Spriteset_Battle_createLowerLayer']=Spriteset_Battle[_0x176333(0x1de)][_0x176333(0x159)],Spriteset_Battle[_0x176333(0x1de)]['createLowerLayer']=function(){const _0xb75051=_0x176333;VisuMZ[_0xb75051(0x182)]['Spriteset_Battle_createLowerLayer'][_0xb75051(0x172)](this),this['restoreVisualDrops']();},Spriteset_Battle[_0x176333(0x1de)][_0x176333(0x1d5)]=function(){const _0x7ae376=_0x176333;$gameTemp[_0x7ae376(0x13c)]=$gameTemp[_0x7ae376(0x13c)]||[];for(const _0x28a6f3 of $gameTemp[_0x7ae376(0x13c)]){if(!_0x28a6f3)continue;const _0x186a21=new Sprite_VisualDrop(_0x28a6f3[_0x7ae376(0x1ba)],_0x28a6f3[_0x7ae376(0x14a)],_0x28a6f3);this[_0x7ae376(0xbd)][_0x7ae376(0x1e3)](_0x186a21);}};function Sprite_VisualDrop(){const _0x525761=_0x176333;this[_0x525761(0x102)](...arguments);}Sprite_VisualDrop[_0x176333(0x1de)]=Object[_0x176333(0xaa)](Sprite[_0x176333(0x1de)]),Sprite_VisualDrop[_0x176333(0x1de)][_0x176333(0x1a8)]=Sprite_VisualDrop,Sprite_VisualDrop[_0x176333(0x1de)][_0x176333(0x102)]=function(_0x1645f1,_0x3085dd,_0x39a834){const _0x283216=_0x176333;_0x39a834?(this['_data']=_0x39a834,this[_0x283216(0x17c)]=this[_0x283216(0x16a)][_0x283216(0x132)],this[_0x283216(0xa2)]=this[_0x283216(0x16a)][_0x283216(0x199)]):this[_0x283216(0x16a)]=this['createInitialPosition'](_0x1645f1,_0x3085dd),Sprite['prototype'][_0x283216(0x102)][_0x283216(0x172)](this),this['createChildren']();},Sprite_VisualDrop[_0x176333(0x1de)]['createInitialPosition']=function(_0x3d1cff,_0x32786c){const _0x58d62a=_0x176333,_0x39de87=VisuMZ[_0x58d62a(0x1ac)][_0x58d62a(0x146)][_0x58d62a(0x116)],_0x4332c3=_0x3d1cff['battler']();_0x32786c=JsonEx[_0x58d62a(0xdb)](_0x32786c);const _0xe9eae7={'enemy':_0x3d1cff,'iconIndex':_0x32786c[0x0],'duration':_0x39de87[_0x58d62a(0x193)],'angle':_0x39de87[_0x58d62a(0xeb)],'jumpHeight':0x0,'bounces':_0x39de87[_0x58d62a(0x13a)],'bounceSFX':_0x39de87[_0x58d62a(0x150)],'targetX':_0x4332c3[_0x58d62a(0x17c)],'targetY':_0x4332c3[_0x58d62a(0xa2)],'targetOpacity':0xff,'opacityModifier':0x1,'rarityFrames':0x0,'rarityTint':_0x32786c[0x1]||[0x0,0x0,0x0,0x0],'rarityDuration':_0x32786c[0x2]||0xb4,'flags':_0x32786c[0x3]||[]};this[_0x58d62a(0x17c)]=_0x4332c3[_0x58d62a(0x17c)],this[_0x58d62a(0xa2)]=_0x4332c3['_baseY'],_0xe9eae7[_0x58d62a(0x132)]=this[_0x58d62a(0x17c)],_0xe9eae7[_0x58d62a(0x199)]=this[_0x58d62a(0xa2)],_0xe9eae7[_0x58d62a(0xd9)]=_0xe9eae7['flags'][_0x58d62a(0xbf)](_0x4a2f3c=>String(_0x4a2f3c));for(const _0x1c6b90 of _0xe9eae7[_0x58d62a(0xd9)]){if(!_0x1c6b90)continue;if(_0x1c6b90[_0x58d62a(0xa6)](/BOUNCE SFX: (.*)/i)){const _0x4a0d78=String(RegExp['$1']);_0xe9eae7[_0x58d62a(0x191)]=_0x4a0d78;}}return _0xe9eae7;},Sprite_VisualDrop[_0x176333(0x1de)][_0x176333(0x122)]=function(){const _0x1b08c6=_0x176333;this[_0x1b08c6(0x1b9)](),this[_0x1b08c6(0xc9)](),this[_0x1b08c6(0xdf)](!![]);},Sprite_VisualDrop[_0x176333(0x1de)][_0x176333(0x1b9)]=function(){const _0x9cbb38=_0x176333,_0x2ede30=VisuMZ['ExtraEnemyDrops'][_0x9cbb38(0x146)][_0x9cbb38(0x116)];if(!_0x2ede30['showShadow'])return;this[_0x9cbb38(0x1d6)]=new Sprite(),this[_0x9cbb38(0x1d6)][_0x9cbb38(0xc3)]=ImageManager[_0x9cbb38(0x1d2)](_0x2ede30[_0x9cbb38(0x158)]),this['_shadowSprite'][_0x9cbb38(0xe7)]['x']=0.5,this[_0x9cbb38(0x1d6)][_0x9cbb38(0xe7)]['y']=0x1,this[_0x9cbb38(0x1d6)]['x']=_0x2ede30[_0x9cbb38(0xc2)],this[_0x9cbb38(0x1d6)]['y']=_0x2ede30['shadowOffsetY'],this[_0x9cbb38(0x1d6)][_0x9cbb38(0xef)]=_0x2ede30[_0x9cbb38(0x192)],this['addChild'](this[_0x9cbb38(0x1d6)]);},Sprite_VisualDrop[_0x176333(0x1de)][_0x176333(0xc9)]=function(){const _0x482824=_0x176333,_0x2b0853=VisuMZ['ExtraEnemyDrops']['Settings'][_0x482824(0x116)];this['_iconSprite']=new Sprite(),this[_0x482824(0x177)][_0x482824(0xc3)]=ImageManager['loadSystem'](_0x482824(0x17a)),this[_0x482824(0x177)][_0x482824(0xe7)]['x']=0.5,this[_0x482824(0x177)][_0x482824(0xe7)]['y']=0.5,this[_0x482824(0x177)][_0x482824(0x199)]=Math[_0x482824(0x197)](ImageManager[_0x482824(0x156)]/_0x2b0853[_0x482824(0x1c1)]),this[_0x482824(0x177)]['y']=this[_0x482824(0x177)][_0x482824(0x199)];const _0xf64303=this[_0x482824(0x16a)][_0x482824(0x14a)],_0x51cf00=ImageManager[_0x482824(0x155)],_0x503251=ImageManager[_0x482824(0x156)],_0x256583=_0xf64303%0x10*_0x51cf00,_0x900d1e=Math[_0x482824(0x152)](_0xf64303/0x10)*_0x503251;this[_0x482824(0x177)][_0x482824(0x13d)](_0x256583,_0x900d1e,_0x51cf00,_0x503251),this[_0x482824(0x1e3)](this[_0x482824(0x177)]);},Sprite_VisualDrop['prototype']['setTargetDestination']=function(_0x389b2e,_0x1bcd40){const _0x28b3fe=_0x176333;this[_0x28b3fe(0x16a)][_0x28b3fe(0xcd)]=Math[_0x28b3fe(0x197)](_0x389b2e),this['_data'][_0x28b3fe(0xb8)]=Math[_0x28b3fe(0x197)](_0x1bcd40);},Sprite_VisualDrop[_0x176333(0x1de)]['setRarity']=function(_0x435bd3){const _0xbe13e4=_0x176333,_0x49a48b=VisuMZ[_0xbe13e4(0x1ac)]['Settings']['Rarity'],_0x10d87d=(_0x49a48b['Tint%1'[_0xbe13e4(0x16d)](_0x435bd3)]||[0x0,0x0,0x0,0x0])[_0xbe13e4(0xbf)](_0x3d8b83=>Number(_0x3d8b83)['clamp'](-0xff,0xff)),_0x3f9100=_0x49a48b[_0xbe13e4(0xe1)[_0xbe13e4(0x16d)](_0x435bd3)]||0x0;this[_0xbe13e4(0x118)](_0x10d87d,_0x3f9100);},Sprite_VisualDrop[_0x176333(0x1de)][_0x176333(0x118)]=function(_0x395b24,_0x114504){const _0x3688a1=_0x176333;this[_0x3688a1(0x16a)][_0x3688a1(0xaf)]=JsonEx[_0x3688a1(0xdb)](_0x395b24),this[_0x3688a1(0x16a)][_0x3688a1(0x139)]=_0x114504;},Sprite_VisualDrop[_0x176333(0x1de)]['setFlags']=function(_0x30fee6){const _0x1195a6=_0x176333;this[_0x1195a6(0x16a)][_0x1195a6(0xd9)]=JsonEx[_0x1195a6(0xdb)](_0x30fee6)[_0x1195a6(0xbf)](_0xed1541=>String(_0xed1541));},Sprite_VisualDrop[_0x176333(0x1de)][_0x176333(0xe4)]=function(){const _0x55f8ec=_0x176333;this[_0x55f8ec(0x16a)][_0x55f8ec(0x168)]=0x0;},Sprite_VisualDrop[_0x176333(0x1de)][_0x176333(0xba)]=function(){const _0x2a7ea1=_0x176333;for(const _0x2de051 of this[_0x2a7ea1(0x16a)][_0x2a7ea1(0xd9)]){if(!_0x2de051)continue;if(_0x2de051[_0x2a7ea1(0xa6)](/\bSPAWN SFX:[ ](.*)\b/i)){const _0x16cb66={'name':String(RegExp['$1']),'volume':0x5a,'pitch':0x64,'pan':0x0};AudioManager[_0x2a7ea1(0xb5)](_0x16cb66);}}},Sprite_VisualDrop[_0x176333(0x1de)][_0x176333(0x196)]=function(){const _0x22684f=_0x176333;Sprite[_0x22684f(0x1de)][_0x22684f(0x196)][_0x22684f(0x172)](this),this[_0x22684f(0xdf)]();if(this['opacity']<=0x0)return;this['updateFlags'](),this[_0x22684f(0x185)](),this[_0x22684f(0x1e2)](),this[_0x22684f(0x137)](),this[_0x22684f(0x18b)](),this['updateTint'](),this[_0x22684f(0x188)]();},Sprite_VisualDrop[_0x176333(0x1de)][_0x176333(0x1a6)]=function(){const _0x295d84=_0x176333;for(const _0x2a586c of this[_0x295d84(0x16a)]['flags']){if(!_0x2a586c)continue;this[_0x295d84(0x128)](_0x2a586c);}},Sprite_VisualDrop[_0x176333(0x1de)][_0x176333(0x128)]=function(_0x476f2d){const _0x3eb5d3=_0x176333,_0x5839b6=VisuMZ[_0x3eb5d3(0x1ac)][_0x3eb5d3(0x146)][_0x3eb5d3(0x1cb)];switch(_0x476f2d[_0x3eb5d3(0x1bd)]()[_0x3eb5d3(0x12a)]()){case _0x3eb5d3(0x12f):this[_0x3eb5d3(0x16a)][_0x3eb5d3(0x9e)]=this[_0x3eb5d3(0x16a)][_0x3eb5d3(0x9e)]||0x0,this[_0x3eb5d3(0x16a)]['hue']+=_0x5839b6[_0x3eb5d3(0xb9)],this[_0x3eb5d3(0x177)]['setHue'](this[_0x3eb5d3(0x16a)][_0x3eb5d3(0x9e)]);break;case _0x3eb5d3(0xf3):this['_iconSprite'][_0x3eb5d3(0x10e)]=0x1;break;case _0x3eb5d3(0x11d):this[_0x3eb5d3(0x177)]['blendMode']=0x2;break;case'SCREEN':this[_0x3eb5d3(0x177)][_0x3eb5d3(0x10e)]=0x3;break;};},Sprite_VisualDrop[_0x176333(0x1de)][_0x176333(0xdf)]=function(_0x462565){const _0x4edd1e=_0x176333,_0xc6cec8=VisuMZ[_0x4edd1e(0x1ac)][_0x4edd1e(0x146)][_0x4edd1e(0x116)],_0x3c396b=this[_0x4edd1e(0x16a)][_0x4edd1e(0x168)]['clamp'](0x0,0xff)*this[_0x4edd1e(0x130)]();if(this[_0x4edd1e(0xef)]>_0x3c396b)this[_0x4edd1e(0xef)]=Math[_0x4edd1e(0x107)](this[_0x4edd1e(0xef)]-_0xc6cec8['opacityFadeOut'],_0x3c396b);else this[_0x4edd1e(0xef)]<_0x3c396b&&(this[_0x4edd1e(0xef)]=Math[_0x4edd1e(0x99)](this[_0x4edd1e(0xef)]+_0xc6cec8['opacityFadeOut'],_0x3c396b));if(_0x462565)this[_0x4edd1e(0xef)]=_0x3c396b;},Sprite_VisualDrop[_0x176333(0x1de)][_0x176333(0x130)]=function(){const _0x4c1df7=_0x176333;if(!BattleManager[_0x4c1df7(0xca)])return 0x0;if($gameTroop[_0x4c1df7(0xb1)]())return 0x0;return this[_0x4c1df7(0x16a)]['opacityModifier'];},Sprite_VisualDrop['prototype'][_0x176333(0x185)]=function(){const _0x5028d0=_0x176333;this[_0x5028d0(0x16a)]['duration']>0x0?this[_0x5028d0(0x177)][_0x5028d0(0xeb)]-=this[_0x5028d0(0x9c)]():this[_0x5028d0(0x177)][_0x5028d0(0xeb)]=0x0;},Sprite_VisualDrop['prototype']['rotationConstant']=function(){const _0x7ab68e=_0x176333;if(this[_0x7ab68e(0xdd)]!==undefined)return this[_0x7ab68e(0xdd)];const _0x59f43d=VisuMZ[_0x7ab68e(0x1ac)]['Settings'][_0x7ab68e(0x116)];return this[_0x7ab68e(0xdd)]=_0x59f43d[_0x7ab68e(0xeb)]/_0x59f43d[_0x7ab68e(0x193)],this['_rotationConstant'];},Sprite_VisualDrop[_0x176333(0x1de)][_0x176333(0x1e2)]=function(){const _0x49b255=_0x176333;this[_0x49b255(0x16a)][_0x49b255(0x193)]>0x0?this['_data'][_0x49b255(0x17e)]=this[_0x49b255(0x8c)]():this[_0x49b255(0x16a)]['jumpHeight']=0x0,this[_0x49b255(0x177)]['y']=this[_0x49b255(0x177)][_0x49b255(0x199)]-this['_data']['jumpHeight'];},Sprite_VisualDrop['prototype'][_0x176333(0x8c)]=function(){const _0x232cc7=_0x176333,_0x4f11a8=VisuMZ['ExtraEnemyDrops'][_0x232cc7(0x146)][_0x232cc7(0x116)],_0x4dca62=_0x4f11a8[_0x232cc7(0x13a)],_0x1b56de=this[_0x232cc7(0x16a)]['bounces'],_0x9ede09=Math[_0x232cc7(0x103)](_0x4f11a8[_0x232cc7(0xa5)],_0x4dca62-_0x1b56de),_0x21823c=Math[_0x232cc7(0x197)](_0x4f11a8[_0x232cc7(0x98)]*_0x9ede09),_0x25e5e0=Math['round'](_0x4f11a8['duration']*_0x9ede09),_0x2ef23c=this[_0x232cc7(0x16a)]['duration'],_0x49996f=_0x2ef23c,_0x3daa80=_0x25e5e0-_0x49996f,_0x11b50f=_0x25e5e0/0x2,_0xab8f47=_0x21823c,_0x482e85=-_0xab8f47/Math['pow'](_0x11b50f,0x2),_0x13d276=_0x482e85*Math[_0x232cc7(0x103)](_0x3daa80-_0x11b50f,0x2)+_0xab8f47;let _0x46b78b=0x1;for(const _0x8eddbb of this[_0x232cc7(0x16a)][_0x232cc7(0xd9)]){if(!_0x8eddbb)continue;_0x8eddbb[_0x232cc7(0xa6)](/BOUNCE HEIGHT (\d+)([%％])/i)&&(_0x46b78b*=Number(RegExp['$1'])/0x64);}return _0x13d276*_0x46b78b;},Sprite_VisualDrop[_0x176333(0x1de)][_0x176333(0x137)]=function(){const _0x1569da=_0x176333;if(this['_data'][_0x1569da(0x193)]>0x0){const _0x242774=VisuMZ['ExtraEnemyDrops'][_0x1569da(0x146)][_0x1569da(0x116)],_0x4ce8f3=this[_0x1569da(0x16a)][_0x1569da(0x193)],_0xecdd07=_0x242774[_0x1569da(0x193)],_0x101b57=_0x242774[_0x1569da(0x16c)];Imported[_0x1569da(0x15a)]?(this['_baseX']=this[_0x1569da(0x90)](this[_0x1569da(0x17c)],this[_0x1569da(0x16a)][_0x1569da(0xcd)],_0x4ce8f3,_0xecdd07,_0x101b57),this['_baseY']=this[_0x1569da(0x90)](this[_0x1569da(0xa2)],this[_0x1569da(0x16a)][_0x1569da(0xb8)],_0x4ce8f3,_0xecdd07,_0x101b57)):(this['_baseX']=(this[_0x1569da(0x17c)]*(_0x4ce8f3-0x1)+this['_data'][_0x1569da(0xcd)])/_0x4ce8f3,this['_baseY']=(this[_0x1569da(0xa2)]*(_0x4ce8f3-0x1)+this[_0x1569da(0x16a)][_0x1569da(0xb8)])/_0x4ce8f3);}else this[_0x1569da(0x17c)]=this[_0x1569da(0x16a)][_0x1569da(0xcd)],this[_0x1569da(0xa2)]=this[_0x1569da(0x16a)]['targetY'];this[_0x1569da(0x16a)][_0x1569da(0x132)]=this['_baseX'],this['_data'][_0x1569da(0x199)]=this[_0x1569da(0xa2)];},Sprite_VisualDrop['prototype']['applyEasing']=function(_0x3b377e,_0x4e3cec,_0x3d51cf,_0x27088c,_0x2104ba){const _0xe73226=_0x176333,_0x52402f=VisuMZ[_0xe73226(0xf7)]((_0x27088c-_0x3d51cf)/_0x27088c,_0x2104ba||_0xe73226(0x181)),_0x51f27d=VisuMZ[_0xe73226(0xf7)]((_0x27088c-_0x3d51cf+0x1)/_0x27088c,_0x2104ba||'Linear'),_0x4b093e=(_0x3b377e-_0x4e3cec*_0x52402f)/(0x1-_0x52402f);return _0x4b093e+(_0x4e3cec-_0x4b093e)*_0x51f27d;},Sprite_VisualDrop[_0x176333(0x1de)][_0x176333(0x18b)]=function(){const _0x211e84=_0x176333;this['x']=this[_0x211e84(0x17c)],this['y']=this[_0x211e84(0xa2)];},Sprite_VisualDrop[_0x176333(0x1de)][_0x176333(0x1be)]=function(){const _0x816e84=_0x176333;if(!VisuMZ[_0x816e84(0x1ac)]['Settings'][_0x816e84(0x1cb)][_0x816e84(0x165)])return;const _0x5b505b=this[_0x816e84(0x16a)];_0x5b505b[_0x816e84(0xbc)]++;const _0x29b60b=_0x5b505b[_0x816e84(0xbc)]%_0x5b505b[_0x816e84(0x139)],_0x147c1f=_0x5b505b[_0x816e84(0x139)]-_0x29b60b,_0x1759de=_0x5b505b[_0x816e84(0x139)]/0x2,_0x5daa31=0x1,_0x4bab57=-_0x5daa31/Math[_0x816e84(0x103)](_0x1759de,0x2),_0x2ca989=_0x4bab57*Math[_0x816e84(0x103)](_0x147c1f-_0x1759de,0x2)+_0x5daa31,_0x124349=_0x5b505b['rarityTint'][_0x816e84(0xbf)](_0x425a3c=>_0x425a3c*_0x2ca989);this['_iconSprite'][_0x816e84(0x1e1)](_0x124349);},Sprite_VisualDrop[_0x176333(0x1de)][_0x176333(0x188)]=function(){const _0x13a887=_0x176333;this['_data'][_0x13a887(0x193)]--;if(this[_0x13a887(0x16a)][_0x13a887(0x193)]===0x0&&this[_0x13a887(0x16a)]['bounces']>=0x0){this[_0x13a887(0x16a)]['bounces']-=0x1;const _0x2121fc=VisuMZ['ExtraEnemyDrops'][_0x13a887(0x146)][_0x13a887(0x116)],_0x22f7fb=_0x2121fc[_0x13a887(0x13a)],_0x3432fb=this[_0x13a887(0x16a)]['bounces'],_0x30c70b=Math[_0x13a887(0x103)](_0x2121fc[_0x13a887(0xa5)],_0x22f7fb-_0x3432fb);if(this[_0x13a887(0x16a)][_0x13a887(0x13a)]>=0x0)this[_0x13a887(0x16a)][_0x13a887(0x193)]=Math[_0x13a887(0x197)](_0x2121fc['duration']*_0x30c70b);else _0x2121fc[_0x13a887(0x175)]&&setTimeout(this[_0x13a887(0xe4)][_0x13a887(0x95)](this),_0x2121fc['fadeAfterDelay']);if(_0x2121fc['sfxFilename']){const _0x53e591={'name':this[_0x13a887(0x16a)]['bounceSFX'],'volume':Math[_0x13a887(0x197)](_0x2121fc[_0x13a887(0x1af)]*_0x30c70b),'pitch':_0x2121fc[_0x13a887(0x8b)],'pan':_0x2121fc[_0x13a887(0x11b)]};AudioManager[_0x13a887(0xb5)](_0x53e591);}}};};