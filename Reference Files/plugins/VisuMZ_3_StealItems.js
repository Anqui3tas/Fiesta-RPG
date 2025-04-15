//=============================================================================
// VisuStella MZ - Steal Items
// VisuMZ_3_StealItems.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_StealItems = true;

var VisuMZ = VisuMZ || {};
VisuMZ.StealItems = VisuMZ.StealItems || {};
VisuMZ.StealItems.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.09] [StealItems]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Steal_Items_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Thieves with the ability to steal items from enemies aren't an uncommon
 * class in RPG's. This plugin lets you set up enemies with items that can be
 * stolen from with different types of effects that can occur upon stealing.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create a pool of stealable items for each enemy.
 * * Make skills or items that have stealing properties attached to them.
 * * Some skills/items can be dedicated towards stealing specific types of loot
 *   (Gold, Items, Weapons, and/or Armor).
 * * Have different success rates for skills and items.
 * * Actors can gain trait effects that increase or decrease success rates.
 * * Enemies can gain resistance towards stealing.
 * * JavaScript uses can enable special effects to occur upon successfully
 *   stealing, failing, or emptying out an enemy's loot.
 * * Automatically translate drop items from the database into stealable loot.
 * * If weapons or armors are stolen, they can debuff the enemy and lower their
 *   parameters by their base bonuses.
 * * Use a Snatch effect to directly target a specific item to be stolen from
 *   the enemy.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
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
 * Gold and Item Drop Removals
 * 
 * This is an optional effect that can be enabled from the Plugin Parameters.
 * 
 * If you have enabled Automatic Gold Drop and Item Drop inclusions from the
 * plugin parameters as well as enabled their respective "Loot Removal" plugin
 * parameters, then once the gold/items have been stolen a target enemy, that
 * enemy will not drop the specific gold value or specific item drop during the
 * victory aftermath phase.
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
 * ---
 * 
 * === Steal Action-Related Notetags ===
 * 
 * The following are notetags that are used to place on skills/items that you
 * want to have stealing properties for.
 * 
 * ---
 *
 * <Steal>
 * <Steal type>
 * <Steal type, type, type>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 *
 * ---
 *
 * <Steal type: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties with increased/decreased
 *   multiplicative success rates.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate multiplicatively by.
 * 
 * ---
 *
 * <Steal type: +x%>
 * <Steal type: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties with increased/decreased
 *   additive success rates.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate additively by.
 *
 * ---
 * 
 * <Snatch>
 * <Targeting Steal>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the steal action from targeting a random item from the stealable
 *   types pool to a specific item that the player can select.
 * - If the snatch attempt fails, it will not attempt to steal other items.
 * - Both the <Snatch> and <Targeting Steal> notetags do the same thing.
 * - This does not work with abilities that target multiple enemies, random
 *   enemies, or actors.
 * - Use this in addition to the <Steal>, <Steal type>, or
 *   <Steal type, type, type> notetags as this does not have any steal
 *   properties on its own.
 * 
 * ---
 * 
 * === JavaScript Notetags: Steal Action-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * apply special effects for steal-related skills/items.
 * 
 * ---
 *
 * <JS Steal Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to all steal target types.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Gold Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Gold Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable gold type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Item Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Item Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable item type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Weapon Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Weapon Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable weapon type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Armor Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Armor Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable armor type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS On Steal Success>
 *  code
 *  code
 *  code
 * </JS On Steal Success>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code upon successfully stealing.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 * - The 'item' variable represents the item that was stolen if there is one.
 *   This will return a null value if gold was stolen instead.
 * - The 'gold' variable represents the gold quantity that was stolen if any.
 *   This will return a 0 value if there was no gold stolen.
 *
 * ---
 *
 * <JS On Steal Failure>
 *  code
 *  code
 *  code
 * </JS On Steal Failure>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code upon failing a stealth attempt.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was the theft target.
 *
 * ---
 *
 * <JS On Steal Empty>
 *  code
 *  code
 *  code
 * </JS On Steal Empty>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code if there was nothing to steal.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was the theft target.
 *
 * ---
 * 
 * === Steal Loot Setup-Related Notetags ===
 * 
 * The following notetags are made for enemies and used to set up the loot that
 * can be stolen.
 * 
 * ---
 *
 * <Steal Gold value: x%>
 * 
 * <Steal Item id: x%>
 * <Steal Item name: x%>
 * 
 * <Steal Weapon id: x%>
 * <Steal Weapon name: x%>
 * 
 * <Steal Armor id: x%>
 * <Steal Armor name: x%>
 *
 * - Used for: Enemy Notetags
 * - Sets up droppable loot for the enemy.
 * - When setting up gold loot, replace 'value' with the amount of gold that
 *   will be stolen from this loot entry.
 * - When setting up items, weapons, or armors, replace 'id' with the ID of the
 *   item, weapon, or armor for the loot entry.
 * - When setting up items, weapons, or armors, replace 'name' with the name of
 *   the item, weapon, or armor for the loot entry.
 * - Replace 'x' with a number value representing the base percent chance of
 *   successfully stealing this loot entry.
 * - Insert multiple notetags for multiple loot entries to be stolen.
 *
 * ---
 *
 * <Steal>
 *  Gold value: x%
 * 
 *  Item id: x%
 *  Item name: x%
 * 
 *  Weapon id: x%
 *  Weapon name: x%
 * 
 *  Armor id: x%
 *  Armor name: x%
 * </Steal>
 *
 * - Used for: Enemy Notetags
 * - Sets up a batch setup of droppable loot for the enemy.
 * - When setting up gold loot, replace 'value' with the amount of gold that
 *   will be stolen from this loot entry.
 * - When setting up items, weapons, or armors, replace 'id' with the ID of the
 *   item, weapon, or armor for the loot entry.
 * - When setting up items, weapons, or armors, replace 'name' with the name of
 *   the item, weapon, or armor for the loot entry.
 * - Replace 'x' with a number value representing the base percent chance of
 *   successfully stealing this loot entry.
 * - Insert/remove multiple copies of the loot entries inside the <Steal>
 *   notetags to add more or reduce entries.
 *
 * ---
 * 
 * === Steal Rate Traits-Related Notetags ===
 * 
 * The following notetags are made for trait objects that can alter the
 * success rates of steal skills/items.
 * 
 * ---
 *
 * <Steal Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Alters the steal rate for the stealing actor multiplicatively.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate multiplicatively by.
 * 
 * ---
 *
 * <Steal Rate: +x%>
 * <Steal Rate: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Alters the steal rate for the stealing actor multiplicatively.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate additively by.
 *
 * ---
 *
 * <Steal Resist: +x%>
 * <Steal Resist: -x%>
 *
 * - Used for: Enemy Notetags
 * - Alters the steal resistance for enemies. Higher numbers mean higher steal
 *   resistance.
 * - Replace 'x' with a number representing the percent value to alter the
 *   steal resistance by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Automatic Settings
 * ============================================================================
 *
 * Automatic settings pertaining to the steal mechanics of the game.
 *
 * ---
 *
 * Settings
 * 
 *   Add Gold Drop?:
 *   - Automatically include enemy gold drop into stealable items?
 * 
 *     Success Rate:
 *     - If automatically include gold drop, what is the steal rate?
 *     - Use a number between 0 and 1.
 * 
 *     Loot Removal:
 *     - If using automatic gold, remove the rewards from the enemy gold
 *       when defeated?
 * 
 *   Add Item Drops?:
 *   - Automatically include enemy item drop into stealable items?
 * 
 *     Success Modifier:
 *     - If automatically include item drops, how much do you want to alter
 *       their drop modifiers by?
 * 
 *     Loot Removal:
 *     - If using automatic drops, remove the rewards from the enemy items
 *       when defeated?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * Settings pertaining to the steal-related messages that appear in the Battle
 * Log Window.
 *
 * ---
 *
 * Settings
 * 
 *   Show Messages:
 *   - Show messages regarding stolen items in the Battle Log window?
 * 
 *   Steal Item:
 *   - Message displayed when stealing an item.
 *   - %1 - Item's Name, %2 - Item's Icon
 * 
 *   Steal Gold:
 *   - Message displayed when stealing gold.
 *   - %1 - Gold Name, %2 - Gold Amount
 * 
 *   Steal Fail:
 *   - Message displayed when a steal attempt fails.
 * 
 *   Steal Empty:
 *   - Message displayed when there is nothing to steal.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Special game mechanics related to stealing.
 *
 * ---
 *
 * General
 * 
 *   Equip Debuff:
 *   - When weapons/armors are stolen, decrease the enemy's parameters based
 *     on the weapon/armor parameters?
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Bonus Steal %:
 *   - Code used to determine an additive bonus steal rate.
 * 
 *   JS: Steal Resist %:
 *   - Code used to determine an additive steal resistance.
 * 
 *   JS: On Steal Success:
 *   - What kind of code do you want to run when stealing succeeds?
 * 
 *   JS: On Steal Failure:
 *   - What kind of code do you want to run when stealing fails?
 * 
 *   JS: On Steal Empty:
 *   - What kind of code do you want to run when there is nothing to steal?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Popup Settings
 * ============================================================================
 *
 * Popup settings related to stealing.
 *
 * ---
 *
 * Success
 * 
 * Failure
 * 
 * Empty
 * 
 *   Text:
 *   - Text displayed upon stealing an item.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Snatch Settings
 * ============================================================================
 *
 * These are the settings for the effect when used with the <Snatch> notetag.
 * When snatching an item, the player can target a specific item in the enemy's
 * loot to be stolen from. The success rates and lists of items will be visible
 * at the expense of only being able to steal just that item.
 *
 * ---
 *
 * Gold
 * 
 *   Icon:
 *   - Icon used to represent gold.
 *   - Ignore if VisuMZ_0_CoreEngine is present.
 * 
 *   Name Format:
 *   - Name format on how gold is displayed.
 *   - %1 - Icon, %2 - Quantity, %3 - Current Name
 * 
 *   Help Text:
 *   - Text that's displayed in the help window when gold is selected in the
 *     Snatch window.
 *
 * ---
 *
 * Success Rate
 * 
 *   Display Success Rate:
 *   - Display success rates in the Snatch window?
 * 
 *   Already Stolen:
 *   - Text displayed when an item has already been stolen.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Sound Settings
 * ============================================================================
 *
 * Determine the sound effects played related to stealing.
 *
 * ---
 *
 * Successful Gold Steal
 * 
 * Successful Item Steal
 * 
 * Successful Weapon Steal
 * 
 * Successful Armor Steal
 * 
 * Failure
 * 
 * Empty
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
 * Version 1.09: September 19, 2024
 * * Compatibility Update!
 * ** Added better compatibility with Frontview Battle UI.
 * 
 * Version 1.08: April 18, 2024
 * * Bug Fixes!
 * ** Added fail safe for action crash during Active TPB/ATB. Fix by Olivia.
 * 
 * Version 1.07: June 9, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.06: January 13, 2022
 * * Compatibility Update!
 * ** Better compatibility update with Extra Enemy Drops. Update made by Irina.
 * 
 * Version 1.05: July 23, 2021
 * * Bug Fixes!
 * ** Fixed <JS Steal Armor Rate> notetag. It did not work properly.
 * * Documentation Update!
 * ** Added notes for the various <JS Steal Rate> notetags:
 * *** The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 * *** This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * 
 * Version 1.04: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.03: June 4, 2021
 * * Bug Fixes!
 * ** <JS Steal Rate> should now work properly. Fix by Arisu.
 * * Documentation Update!
 * ** Added clarity to <JS Steal Rate> to mention it affects all types.
 * ** Help file updated for new features.
 * * New Features!
 * ** New JS notetags added by Arisu.
 * *** <JS Steal Gold Rate>
 * *** <JS Steal Item Rate>
 * *** <JS Steal Weapon Rate>
 * *** <JS Steal Armor Rate>
 * **** Similar to the <JS Steal Rate> notetag but works only for specific
 *      categories of items.
 * 
 * Version 1.02: April 2, 2021
 * * Feature Update!
 * ** Success rate calculation should no longer be skewed by JavaScript's float
 *    value math quirks. Update made by Yanfly.
 * 
 * Version 1.01: December 11, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00: December 9, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StealItems
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Auto:struct
 * @text Automatic Settings
 * @type struct<Auto>
 * @desc Automatic settings pertaining to the steal mechanics of the game.
 * @default {"AutoGold:eval":"true","GoldRate:num":"0.50","GoldRemoval:eval":"true","AutoItem:eval":"true","ItemRate:num":"1.50","ItemRemoval:eval":"true"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings pertaining to the steal-related messages that appear in the Battle Log Window.
 * @default {"ShowMessages:eval":"true","StealItem:str":"Stole %2%1!","StealGold:str":"Stole %2 \\C[16]%1\\C[0]!","StealFail:str":"Steal attempt unsuccessful!","StealEmpty:str":"Nothing to steal!"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Special game mechanics related to stealing.
 * @default {"General":"","EquipDebuff:eval":"true","JavaScript":"","JsBonusSteal:func":"\"// Declare Variables\\nconst user = this;\\nlet bonusRate = 0;\\n\\n// Calculate Bonus Rate\\nbonusRate = (user.luk / (512 + user.luk)) / 3;\\n\\n// Return Bonus Rate\\nreturn bonusRate;\"","JsStealResist:func":"\"// Declare Variables\\nconst user = this;\\nlet resistRate = 0;\\n\\n// Calculate Resist Rate\\nresistRate = (user.luk / (512 + user.luk)) / 8;\\n\\n// Return Resist Rate\\nreturn resistRate;\"","JsOnStealSuccess:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\"","JsOnStealFail:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\"","JsOnStealEmpty:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\""}
 *
 * @param Popup:struct
 * @text Popup Settings
 * @type struct<Popup>
 * @desc Popup settings related to stealing.
 * @default {"Success":"","SuccessPopupText:str":"STOLEN","SuccessItemName:eval":"true","SuccessTextColor:str":"0","SuccessFlashColor:eval":"[255, 255, 255, 0]","SuccessFlashDuration:num":"60","Failure":"","FailurePopupText:str":"FAILED","FailureTextColor:str":"8","FailureFlashColor:eval":"[255, 255, 255, 0]","FailureFlashDuration:num":"60","Empty":"","EmptyPopupText:str":"EMPTY","EmptyTextColor:str":"8","EmptyFlashColor:eval":"[255, 255, 255, 0]","EmptyFlashDuration:num":"60"}
 *
 * @param Snatch:struct
 * @text Snatch Settings
 * @type struct<Snatch>
 * @desc Settings related to the snatch mechanic.
 * @default {"Gold":"","GoldIcon:num":"314","GoldNameFmt:str":"%1%2\\C[16]%3\\C[0]","GoldHelp:json":"\"Steal gold from this target!\"","Success":"","DisplaySuccess:eval":"true","AlreadyStolen:str":"Stolen"}
 *
 * @param Sound:struct
 * @text Sound Settings
 * @type struct<Sound>
 * @desc Determine the sound effects played related to stealing.
 * @default {"Successful":"","SuccessGold":"","gold_name:str":"Shop2","gold_volume:num":"90","gold_pitch:num":"120","gold_pan:num":"0","SuccessItem":"","item_name:str":"Item1","item_volume:num":"90","item_pitch:num":"120","item_pan:num":"0","SuccessWeapon":"","weapon_name:str":"Equip1","weapon_volume:num":"90","weapon_pitch:num":"120","weapon_pan:num":"0","SuccessArmor":"","armor_name:str":"Equip2","armor_volume:num":"90","armor_pitch:num":"120","armor_pan:num":"0","Failure":"","fail_name:str":"Buzzer2","fail_volume:num":"90","fail_pitch:num":"120","fail_pan:num":"0","Empty":"","empty_name:str":"Evasion1","empty_volume:num":"90","empty_pitch:num":"120","empty_pan:num":"0"}
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
 * Auto Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Auto:
 *
 * @param AutoGold:eval
 * @text Add Gold Drop?
 * @parent Auto
 * @type boolean
 * @on Include
 * @off Don't Include
 * @desc Automatically include enemy gold drop into stealable items?
 * @default true
 *
 * @param GoldRate:num
 * @text Success Rate
 * @parent AutoGold:eval
 * @desc If automatically include gold drop, what is the steal rate?
 * Use a number between 0 and 1.
 * @default 0.50
 *
 * @param GoldRemoval:eval
 * @text Loot Removal
 * @parent AutoGold:eval
 * @type boolean
 * @on Remove
 * @off Keep
 * @desc If using automatic gold, remove the rewards from the
 * enemy gold when defeated?
 * @default true
 *
 * @param AutoItem:eval
 * @text Add Item Drops?
 * @parent Auto
 * @type boolean
 * @on Include
 * @off Don't Include
 * @desc Automatically include enemy item drop into stealable items?
 * @default true
 *
 * @param ItemRate:num
 * @text Success Modifier
 * @parent AutoItem:eval
 * @desc If automatically include item drops, how much do you want
 * to alter their drop modifiers by?
 * @default 1.50
 *
 * @param ItemRemoval:eval
 * @text Loot Removal
 * @parent AutoItem:eval
 * @type boolean
 * @on Remove
 * @off Keep
 * @desc If using automatic drops, remove the rewards from the
 * enemy items when defeated?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param ShowMessages:eval
 * @text Show Messages
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show messages regarding stolen items in the Battle Log window?
 * @default true
 * 
 * @param StealItem:str
 * @text Steal Item
 * @desc Message displayed when stealing an item.
 * %1 - Item's Name, %2 - Item's Icon
 * @default Stole %2%1!
 * 
 * @param StealGold:str
 * @text Steal Gold
 * @desc Message displayed when stealing gold.
 * %1 - Gold Name, %2 - Gold Amount
 * @default Stole %2 \C[16]%1\C[0]!
 * 
 * @param StealFail:str
 * @text Steal Fail
 * @desc Message displayed when a steal attempt fails.
 * @default Steal attempt unsuccessful!
 * 
 * @param StealEmpty:str
 * @text Steal Empty
 * @desc Message displayed when there is nothing to steal.
 * @default Nothing to steal!
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 *
 * @param EquipDebuff:eval
 * @text Equip Debuff
 * @parent General
 * @type boolean
 * @on Debuff
 * @off No Effects
 * @desc When weapons/armors are stolen, decrease the enemy's
 * parameters based on the weapon/armor parameters?
 * @default true
 *
 * @param JavaScript
 *
 * @param JsBonusSteal:func
 * @text JS: Bonus Steal %
 * @parent JavaScript
 * @type note
 * @desc Code used to determine an additive bonus steal rate.
 * @default "// Declare Variables\nconst user = this;\nlet bonusRate = 0;\n\n// Calculate Bonus Rate\nbonusRate = (user.luk / (512 + user.luk)) / 3;\n\n// Return Bonus Rate\nreturn bonusRate;"
 *
 * @param JsStealResist:func
 * @text JS: Steal Resist %
 * @parent JavaScript
 * @type note
 * @desc Code used to determine an additive steal resistance.
 * @default "// Declare Variables\nconst user = this;\nlet resistRate = 0;\n\n// Calculate Resist Rate\nresistRate = (user.luk / (512 + user.luk)) / 8;\n\n// Return Resist Rate\nreturn resistRate;"
 *
 * @param JsOnStealSuccess:func
 * @text JS: On Steal Success
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when stealing succeeds?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 * @param JsOnStealFail:func
 * @text JS: On Steal Failure
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when stealing fails?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 * @param JsOnStealEmpty:func
 * @text JS: On Steal Empty
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when there is nothing to steal?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Popup:
 *
 * @param Success
 *
 * @param SuccessPopupText:str
 * @text Text
 * @parent Success
 * @desc Text displayed upon successfully stealing an item.
 * @default STOLEN
 *
 * @param SuccessItemName:eval
 * @text Show Item Name
 * @parent SuccessPopupText:str
 * @type boolean
 * @on Show
 * @off Don't
 * @desc Show the name of the item that is stolen, too?
 * @default true
 *
 * @param SuccessTextColor:str
 * @text Text Color
 * @parent Success
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param SuccessFlashColor:eval
 * @text Flash Color
 * @parent Success
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param SuccessFlashDuration:num
 * @text Flash Duration
 * @parent Success
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Failure
 *
 * @param FailurePopupText:str
 * @text Text
 * @parent Failure
 * @desc Text displayed upon failing a steal attempt.
 * @default FAILED
 *
 * @param FailureTextColor:str
 * @text Text Color
 * @parent Failure
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 * @param FailureFlashColor:eval
 * @text Flash Color
 * @parent Failure
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param FailureFlashDuration:num
 * @text Flash Duration
 * @parent Failure
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Empty
 *
 * @param EmptyPopupText:str
 * @text Text
 * @parent Empty
 * @desc Text displayed upon there is nothing to steal.
 * @default EMPTY
 *
 * @param EmptyTextColor:str
 * @text Text Color
 * @parent Empty
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 * @param EmptyFlashColor:eval
 * @text Flash Color
 * @parent Empty
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param EmptyFlashDuration:num
 * @text Flash Duration
 * @parent Empty
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Snatch Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Snatch:
 *
 * @param Gold
 *
 * @param GoldIcon:num
 * @text Icon
 * @parent Gold
 * @desc Icon used to represent gold.
 * Ignore if VisuMZ_0_CoreEngine is present.
 * @default 314
 *
 * @param GoldNameFmt:str
 * @text Name Format
 * @parent Gold
 * @desc Name format on how gold is displayed.
 * %1 - Icon, %2 - Quantity, %3 - Current Name
 * @default %1%2\C[16]%3\C[0]
 *
 * @param GoldHelp:json
 * @text Help Text
 * @type note
 * @parent Gold
 * @desc Text that's displayed in the help window when gold is selected in the Snatch window.
 * @default "Steal gold from this target!"
 *
 * @param Success
 * @text Success Rate
 *
 * @param DisplaySuccess:eval
 * @text Display Success Rate
 * @parent Success
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display success rates in the Snatch window?
 * @default true
 *
 * @param AlreadyStolen:str
 * @text Already Stolen
 * @parent Success
 * @desc Text displayed when an item has already been stolen.
 * @default Stolen
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param Successful
 * 
 * @param SuccessGold
 * @text Gold Steal
 * @parent Successful
 *
 * @param gold_name:str
 * @text Filename
 * @parent SuccessGold
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Shop2
 *
 * @param gold_volume:num
 * @text Volume
 * @parent SuccessGold
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param gold_pitch:num
 * @text Pitch
 * @parent SuccessGold
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param gold_pan:num
 * @text Pan
 * @parent SuccessGold
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessItem
 * @text Item Steal
 * @parent Successful
 *
 * @param item_name:str
 * @text Filename
 * @parent SuccessItem
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Item1
 *
 * @param item_volume:num
 * @text Volume
 * @parent SuccessItem
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param item_pitch:num
 * @text Pitch
 * @parent SuccessItem
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param item_pan:num
 * @text Pan
 * @parent SuccessItem
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessWeapon
 * @text Weapon Steal
 * @parent Successful
 *
 * @param weapon_name:str
 * @text Filename
 * @parent SuccessWeapon
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip1
 *
 * @param weapon_volume:num
 * @text Volume
 * @parent SuccessWeapon
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param weapon_pitch:num
 * @text Pitch
 * @parent SuccessWeapon
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param weapon_pan:num
 * @text Pan
 * @parent SuccessWeapon
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessArmor
 * @text Armor Steal
 * @parent Successful
 *
 * @param armor_name:str
 * @text Filename
 * @parent SuccessArmor
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip2
 *
 * @param armor_volume:num
 * @text Volume
 * @parent SuccessArmor
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param armor_pitch:num
 * @text Pitch
 * @parent SuccessArmor
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param armor_pan:num
 * @text Pan
 * @parent SuccessArmor
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Failure
 *
 * @param fail_name:str
 * @text Filename
 * @parent Failure
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Buzzer2
 *
 * @param fail_volume:num
 * @text Volume
 * @parent Failure
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param fail_pitch:num
 * @text Pitch
 * @parent Failure
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param fail_pan:num
 * @text Pan
 * @parent Failure
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Empty
 *
 * @param empty_name:str
 * @text Filename
 * @parent Empty
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Evasion1
 *
 * @param empty_volume:num
 * @text Volume
 * @parent Empty
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param empty_pitch:num
 * @text Pitch
 * @parent Empty
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param empty_pan:num
 * @text Pan
 * @parent Empty
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
//=============================================================================

const _0x3f44c9=_0x3cca;(function(_0x28f1b7,_0x5f48ef){const _0x3e9fd8=_0x3cca,_0x2a0cef=_0x28f1b7();while(!![]){try{const _0x3deb64=-parseInt(_0x3e9fd8(0x1b4))/0x1+parseInt(_0x3e9fd8(0x10a))/0x2*(-parseInt(_0x3e9fd8(0x1f5))/0x3)+parseInt(_0x3e9fd8(0x138))/0x4*(-parseInt(_0x3e9fd8(0x124))/0x5)+parseInt(_0x3e9fd8(0x109))/0x6*(parseInt(_0x3e9fd8(0x1b9))/0x7)+-parseInt(_0x3e9fd8(0x165))/0x8*(-parseInt(_0x3e9fd8(0x1af))/0x9)+parseInt(_0x3e9fd8(0x113))/0xa+-parseInt(_0x3e9fd8(0x14a))/0xb*(-parseInt(_0x3e9fd8(0x208))/0xc);if(_0x3deb64===_0x5f48ef)break;else _0x2a0cef['push'](_0x2a0cef['shift']());}catch(_0x7cef65){_0x2a0cef['push'](_0x2a0cef['shift']());}}}(_0x4cf2,0xee3a3));var label='StealItems',tier=tier||0x0,dependencies=[_0x3f44c9(0x20a)],pluginData=$plugins[_0x3f44c9(0x150)](function(_0x443bfe){const _0x33e42b=_0x3f44c9;return _0x443bfe['status']&&_0x443bfe[_0x33e42b(0x1dd)][_0x33e42b(0x1ac)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x3f44c9(0x14d)]||{},VisuMZ['ConvertParams']=function(_0xe6330f,_0x180a08){const _0x3320f7=_0x3f44c9;for(const _0x2540f6 in _0x180a08){if(_0x2540f6[_0x3320f7(0x1e1)](/(.*):(.*)/i)){const _0x21fc48=String(RegExp['$1']),_0x266b99=String(RegExp['$2'])['toUpperCase']()[_0x3320f7(0x16c)]();let _0x1f4c86,_0x1f3fbd,_0x16bd3c;switch(_0x266b99){case'NUM':_0x1f4c86=_0x180a08[_0x2540f6]!==''?Number(_0x180a08[_0x2540f6]):0x0;break;case'ARRAYNUM':_0x1f3fbd=_0x180a08[_0x2540f6]!==''?JSON[_0x3320f7(0x121)](_0x180a08[_0x2540f6]):[],_0x1f4c86=_0x1f3fbd[_0x3320f7(0x1d8)](_0x325558=>Number(_0x325558));break;case _0x3320f7(0x17b):_0x1f4c86=_0x180a08[_0x2540f6]!==''?eval(_0x180a08[_0x2540f6]):null;break;case _0x3320f7(0x1ae):_0x1f3fbd=_0x180a08[_0x2540f6]!==''?JSON[_0x3320f7(0x121)](_0x180a08[_0x2540f6]):[],_0x1f4c86=_0x1f3fbd[_0x3320f7(0x1d8)](_0x1b62a2=>eval(_0x1b62a2));break;case _0x3320f7(0x1d5):_0x1f4c86=_0x180a08[_0x2540f6]!==''?JSON[_0x3320f7(0x121)](_0x180a08[_0x2540f6]):'';break;case'ARRAYJSON':_0x1f3fbd=_0x180a08[_0x2540f6]!==''?JSON[_0x3320f7(0x121)](_0x180a08[_0x2540f6]):[],_0x1f4c86=_0x1f3fbd[_0x3320f7(0x1d8)](_0x52e9ae=>JSON[_0x3320f7(0x121)](_0x52e9ae));break;case'FUNC':_0x1f4c86=_0x180a08[_0x2540f6]!==''?new Function(JSON['parse'](_0x180a08[_0x2540f6])):new Function('return\x200');break;case'ARRAYFUNC':_0x1f3fbd=_0x180a08[_0x2540f6]!==''?JSON[_0x3320f7(0x121)](_0x180a08[_0x2540f6]):[],_0x1f4c86=_0x1f3fbd[_0x3320f7(0x1d8)](_0x22df6e=>new Function(JSON[_0x3320f7(0x121)](_0x22df6e)));break;case'STR':_0x1f4c86=_0x180a08[_0x2540f6]!==''?String(_0x180a08[_0x2540f6]):'';break;case _0x3320f7(0x13c):_0x1f3fbd=_0x180a08[_0x2540f6]!==''?JSON[_0x3320f7(0x121)](_0x180a08[_0x2540f6]):[],_0x1f4c86=_0x1f3fbd[_0x3320f7(0x1d8)](_0x2e2c9a=>String(_0x2e2c9a));break;case'STRUCT':_0x16bd3c=_0x180a08[_0x2540f6]!==''?JSON[_0x3320f7(0x121)](_0x180a08[_0x2540f6]):{},_0x1f4c86=VisuMZ[_0x3320f7(0x1c1)]({},_0x16bd3c);break;case _0x3320f7(0x133):_0x1f3fbd=_0x180a08[_0x2540f6]!==''?JSON[_0x3320f7(0x121)](_0x180a08[_0x2540f6]):[],_0x1f4c86=_0x1f3fbd[_0x3320f7(0x1d8)](_0x102632=>VisuMZ[_0x3320f7(0x1c1)]({},JSON[_0x3320f7(0x121)](_0x102632)));break;default:continue;}_0xe6330f[_0x21fc48]=_0x1f4c86;}}return _0xe6330f;},(_0x4686f8=>{const _0x31dddb=_0x3f44c9,_0x3b69e3=_0x4686f8[_0x31dddb(0x103)];for(const _0x4ab9d8 of dependencies){if(!Imported[_0x4ab9d8]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x31dddb(0x1e7)](_0x3b69e3,_0x4ab9d8)),SceneManager[_0x31dddb(0x1cd)]();break;}}const _0x2c9d0b=_0x4686f8[_0x31dddb(0x1dd)];if(_0x2c9d0b[_0x31dddb(0x1e1)](/\[Version[ ](.*?)\]/i)){const _0x4033ff=Number(RegExp['$1']);_0x4033ff!==VisuMZ[label]['version']&&(alert(_0x31dddb(0x1f7)[_0x31dddb(0x1e7)](_0x3b69e3,_0x4033ff)),SceneManager[_0x31dddb(0x1cd)]());}if(_0x2c9d0b[_0x31dddb(0x1e1)](/\[Tier[ ](\d+)\]/i)){const _0x150085=Number(RegExp['$1']);_0x150085<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x31dddb(0x1e7)](_0x3b69e3,_0x150085,tier)),SceneManager[_0x31dddb(0x1cd)]()):tier=Math[_0x31dddb(0x20b)](_0x150085,tier);}VisuMZ[_0x31dddb(0x1c1)](VisuMZ[label][_0x31dddb(0x14d)],_0x4686f8[_0x31dddb(0x128)]);})(pluginData),VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x1bd)]=Scene_Boot[_0x3f44c9(0x192)][_0x3f44c9(0x16b)],Scene_Boot[_0x3f44c9(0x192)][_0x3f44c9(0x16b)]=function(){const _0x3086e4=_0x3f44c9;VisuMZ[_0x3086e4(0x18e)]['Scene_Boot_onDatabaseLoaded'][_0x3086e4(0x18c)](this),this[_0x3086e4(0x191)]();},Scene_Boot['prototype']['process_VisuMZ_StealItems']=function(){const _0x3a34b7=_0x3f44c9;if(VisuMZ[_0x3a34b7(0x1be)])return;this['process_VisuMZ_StealItems_JS']();},VisuMZ[_0x3f44c9(0x18e)]['RegExp']={'StealAction1':/<STEAL>/i,'StealAction2':/<STEAL[ ](.*)>/gi,'Snatch':/<(?:SNATCH|TARGETING STEAL)>/i,'JsStealRate':/<JS STEAL RATE>\s*([\s\S]*)\s*<\/JS STEAL RATE>/i,'JsStealRateGold':/<JS STEAL GOLD RATE>\s*([\s\S]*)\s*<\/JS STEAL GOLD RATE>/i,'JsStealRateItem':/<JS STEAL ITEM RATE>\s*([\s\S]*)\s*<\/JS STEAL ITEM RATE>/i,'JsStealRateWeapon':/<JS STEAL WEAPON RATE>\s*([\s\S]*)\s*<\/JS STEAL WEAPON RATE>/i,'JsStealRateArmor':/<JS STEAL ARMOR RATE>\s*([\s\S]*)\s*<\/JS STEAL ARMOR RATE>/i,'JsOnStealSuccess':/<JS ON STEAL SUCCESS>\s*([\s\S]*)\s*<\/JS ON STEAL SUCCESS>/i,'JsOnStealFail':/<JS ON STEAL FAILURE>\s*([\s\S]*)\s*<\/JS ON STEAL FAILURE>/i,'JsOnStealNothing':/<JS ON STEAL EMPTY>\s*([\s\S]*)\s*<\/JS ON STEAL EMPTY>/i,'StealableItemSingle':/<STEAL[ ](.*):[ ](.*)([%％])>/gi,'StealableItemBatch':/<STEAL>\s*([\s\S]*)\s*<\/STEAL>/i,'StealRate':/<STEAL RATE:[ ](\d+)([%％])>/i,'StealPlus':/<STEAL RATE:[ ]([\+\-]\d+)([%％])>/i,'StealResist':/<STEAL RESIST:[ ]([\+\-]\d+)([%％])>/i},Scene_Boot[_0x3f44c9(0x192)][_0x3f44c9(0x15c)]=function(){const _0x20804b=_0x3f44c9,_0x31fc58=$dataSkills[_0x20804b(0x136)]($dataItems);for(const _0x313303 of _0x31fc58){if(!_0x313303)continue;VisuMZ[_0x20804b(0x18e)][_0x20804b(0x178)](_0x313303);}},VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x11c)]=VisuMZ[_0x3f44c9(0x11c)],VisuMZ[_0x3f44c9(0x11c)]=function(_0x1e3f0b){const _0x1d8e7c=_0x3f44c9;VisuMZ[_0x1d8e7c(0x18e)]['ParseSkillNotetags'][_0x1d8e7c(0x18c)](this,_0x1e3f0b),VisuMZ['StealItems']['Parse_Notetags_JS'](_0x1e3f0b);},VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x163)]=VisuMZ[_0x3f44c9(0x163)],VisuMZ[_0x3f44c9(0x163)]=function(_0x17c9b2){const _0x547ad7=_0x3f44c9;VisuMZ[_0x547ad7(0x18e)][_0x547ad7(0x163)]['call'](this,_0x17c9b2),VisuMZ[_0x547ad7(0x18e)]['Parse_Notetags_JS'](_0x17c9b2);},VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x178)]=function(_0xcf8d6f){const _0x16a37e=_0x3f44c9,_0xb1232e=VisuMZ[_0x16a37e(0x18e)][_0x16a37e(0x1b2)];let _0x48c6e5='JsStealRate',_0x174c9e=_0xb1232e[_0x16a37e(0x101)];VisuMZ[_0x16a37e(0x18e)][_0x16a37e(0x148)](_0xcf8d6f,_0x48c6e5,_0x174c9e),_0x48c6e5=_0x16a37e(0x14c),_0x174c9e=_0xb1232e[_0x16a37e(0x14c)],VisuMZ['StealItems']['createStealRateJS'](_0xcf8d6f,_0x48c6e5,_0x174c9e),_0x48c6e5='JsStealRateItem',_0x174c9e=_0xb1232e[_0x16a37e(0x135)],VisuMZ[_0x16a37e(0x18e)][_0x16a37e(0x148)](_0xcf8d6f,_0x48c6e5,_0x174c9e),_0x48c6e5=_0x16a37e(0x122),_0x174c9e=_0xb1232e[_0x16a37e(0x122)],VisuMZ[_0x16a37e(0x18e)][_0x16a37e(0x148)](_0xcf8d6f,_0x48c6e5,_0x174c9e),_0x48c6e5=_0x16a37e(0x1bb),_0x174c9e=_0xb1232e[_0x16a37e(0x1bb)],VisuMZ['StealItems'][_0x16a37e(0x148)](_0xcf8d6f,_0x48c6e5,_0x174c9e),_0x48c6e5=_0x16a37e(0x10e),_0x174c9e=_0xb1232e['JsOnStealSuccess'],VisuMZ['StealItems'][_0x16a37e(0x158)](_0xcf8d6f,_0x48c6e5,_0x174c9e),_0x48c6e5=_0x16a37e(0x1e0),_0x174c9e=_0xb1232e[_0x16a37e(0x1e0)],VisuMZ[_0x16a37e(0x18e)][_0x16a37e(0x158)](_0xcf8d6f,_0x48c6e5,_0x174c9e),_0x48c6e5=_0x16a37e(0x185),_0x174c9e=_0xb1232e[_0x16a37e(0x185)],VisuMZ['StealItems'][_0x16a37e(0x158)](_0xcf8d6f,_0x48c6e5,_0x174c9e);},VisuMZ[_0x3f44c9(0x18e)]['JS']={},VisuMZ['StealItems'][_0x3f44c9(0x148)]=function(_0x1b79d8,_0xc2c2f0,_0x28738d){const _0x2227f3=_0x3f44c9,_0x22c4eb=_0x1b79d8['note'];if(_0x22c4eb['match'](_0x28738d)){const _0x3b2faf=String(RegExp['$1']),_0x544a4b=_0x2227f3(0x17f)[_0x2227f3(0x1e7)](_0x3b2faf),_0x48c5cd=VisuMZ[_0x2227f3(0x18e)]['createKeyJS'](_0x1b79d8,_0xc2c2f0);VisuMZ[_0x2227f3(0x18e)]['JS'][_0x48c5cd]=new Function(_0x544a4b);}},VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x158)]=function(_0x566143,_0x3ffc9c,_0x41dc9d){const _0x37e26a=_0x3f44c9,_0x5c8097=_0x566143['note'];if(_0x5c8097[_0x37e26a(0x1e1)](_0x41dc9d)){const _0x26f53d=String(RegExp['$1']),_0x4e6abd=_0x37e26a(0x1e3)[_0x37e26a(0x1e7)](_0x26f53d),_0x13d57c=VisuMZ['StealItems']['createKeyJS'](_0x566143,_0x3ffc9c);VisuMZ[_0x37e26a(0x18e)]['JS'][_0x13d57c]=new Function(_0x4e6abd);}},VisuMZ['StealItems'][_0x3f44c9(0x111)]=function(_0x23cd34,_0x451b75){const _0x294ac2=_0x3f44c9;if(VisuMZ[_0x294ac2(0x111)])return VisuMZ[_0x294ac2(0x111)](_0x23cd34,_0x451b75);let _0x16c801='';if($dataActors[_0x294ac2(0x1ac)](_0x23cd34))_0x16c801=_0x294ac2(0x1cb)[_0x294ac2(0x1e7)](_0x23cd34['id'],_0x451b75);if($dataClasses[_0x294ac2(0x1ac)](_0x23cd34))_0x16c801='Class-%1-%2'['format'](_0x23cd34['id'],_0x451b75);if($dataSkills[_0x294ac2(0x1ac)](_0x23cd34))_0x16c801=_0x294ac2(0x209)[_0x294ac2(0x1e7)](_0x23cd34['id'],_0x451b75);if($dataItems[_0x294ac2(0x1ac)](_0x23cd34))_0x16c801='Item-%1-%2'['format'](_0x23cd34['id'],_0x451b75);if($dataWeapons[_0x294ac2(0x1ac)](_0x23cd34))_0x16c801=_0x294ac2(0x146)[_0x294ac2(0x1e7)](_0x23cd34['id'],_0x451b75);if($dataArmors[_0x294ac2(0x1ac)](_0x23cd34))_0x16c801='Armor-%1-%2'[_0x294ac2(0x1e7)](_0x23cd34['id'],_0x451b75);if($dataEnemies[_0x294ac2(0x1ac)](_0x23cd34))_0x16c801=_0x294ac2(0x15b)['format'](_0x23cd34['id'],_0x451b75);if($dataStates[_0x294ac2(0x1ac)](_0x23cd34))_0x16c801=_0x294ac2(0x1e9)[_0x294ac2(0x1e7)](_0x23cd34['id'],_0x451b75);return _0x16c801;},DataManager[_0x3f44c9(0x10b)]=function(_0x4e635e){const _0x2ad85a=_0x3f44c9;_0x4e635e=_0x4e635e[_0x2ad85a(0x180)]()[_0x2ad85a(0x16c)](),this[_0x2ad85a(0x1b8)]=this['_itemIDs']||{};if(this[_0x2ad85a(0x1b8)][_0x4e635e])return this[_0x2ad85a(0x1b8)][_0x4e635e];for(const _0x43f76c of $dataItems){if(!_0x43f76c)continue;this[_0x2ad85a(0x1b8)][_0x43f76c[_0x2ad85a(0x103)]['toUpperCase']()[_0x2ad85a(0x16c)]()]=_0x43f76c['id'];}return this[_0x2ad85a(0x1b8)][_0x4e635e]||0x0;},DataManager['getWeaponIdWithName']=function(_0x4ff1ec){const _0x716de9=_0x3f44c9;_0x4ff1ec=_0x4ff1ec['toUpperCase']()[_0x716de9(0x16c)](),this[_0x716de9(0x18f)]=this[_0x716de9(0x18f)]||{};if(this[_0x716de9(0x18f)][_0x4ff1ec])return this['_weaponIDs'][_0x4ff1ec];for(const _0x505ace of $dataWeapons){if(!_0x505ace)continue;this[_0x716de9(0x18f)][_0x505ace[_0x716de9(0x103)][_0x716de9(0x180)]()[_0x716de9(0x16c)]()]=_0x505ace['id'];}return this[_0x716de9(0x18f)][_0x4ff1ec]||0x0;},DataManager[_0x3f44c9(0x17c)]=function(_0x1c6415){const _0xc19e74=_0x3f44c9;_0x1c6415=_0x1c6415[_0xc19e74(0x180)]()['trim'](),this[_0xc19e74(0x1ef)]=this[_0xc19e74(0x1ef)]||{};if(this[_0xc19e74(0x1ef)][_0x1c6415])return this[_0xc19e74(0x1ef)][_0x1c6415];for(const _0x2e3315 of $dataArmors){if(!_0x2e3315)continue;this[_0xc19e74(0x1ef)][_0x2e3315[_0xc19e74(0x103)][_0xc19e74(0x180)]()[_0xc19e74(0x16c)]()]=_0x2e3315['id'];}return this['_armorIDs'][_0x1c6415]||0x0;},ImageManager['snatchGoldIcon']=Imported['VisuMZ_0_CoreEngine']?VisuMZ[_0x3f44c9(0x187)][_0x3f44c9(0x14d)]['Gold'][_0x3f44c9(0x1d7)]:VisuMZ['StealItems']['Settings'][_0x3f44c9(0x1e2)][_0x3f44c9(0x1d7)],TextManager[_0x3f44c9(0x1c7)]=VisuMZ[_0x3f44c9(0x18e)]['Settings'][_0x3f44c9(0x1e2)][_0x3f44c9(0x1da)],TextManager[_0x3f44c9(0x12d)]=VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x14d)][_0x3f44c9(0x1e2)][_0x3f44c9(0x1b5)],TextManager[_0x3f44c9(0x1c0)]=VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x14d)][_0x3f44c9(0x1e2)][_0x3f44c9(0x168)],VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x177)]=Game_Action[_0x3f44c9(0x192)]['applyItemUserEffect'],Game_Action['prototype'][_0x3f44c9(0x195)]=function(_0x61c817){const _0xfe84b6=_0x3f44c9;VisuMZ[_0xfe84b6(0x18e)][_0xfe84b6(0x177)][_0xfe84b6(0x18c)](this,_0x61c817),this['startStealItemsUserEffect'](_0x61c817);},Game_Action[_0x3f44c9(0x192)][_0x3f44c9(0x144)]=function(_0x55dd70){const _0x2242cb=_0x3f44c9;if(!this[_0x2242cb(0x125)]())return;if(!_0x55dd70[_0x2242cb(0x1f9)]())return;if(this[_0x2242cb(0x1d6)]()[_0x2242cb(0x1f9)]())return;const _0x3a798d=VisuMZ['StealItems'][_0x2242cb(0x13a)](this,_0x55dd70);if(_0x3a798d[_0x2242cb(0x1f8)][_0x2242cb(0x105)]<=0x0)return;const _0x9f210c=_0x55dd70[_0x2242cb(0x13e)]();if(_0x9f210c[_0x2242cb(0x105)]<=0x0)return;let _0x2551ce=[];this['isSnatchEffect']()?_0x2551ce=this[_0x2242cb(0x1e6)](_0x55dd70):_0x2551ce=_0x9f210c[_0x2242cb(0x150)](_0x31ef29=>{const _0x11e88e=_0x2242cb;return _0x3a798d[_0x11e88e(0x1f8)]['includes'](_0x31ef29[_0x11e88e(0x1ee)]);});_0x2551ce=_0x2551ce[_0x2242cb(0x150)](_0x5a9086=>{const _0x3f2cac=_0x2242cb;return!_0x5a9086[_0x3f2cac(0x134)];});if(_0x2551ce[_0x2242cb(0x105)]<=0x0)return this[_0x2242cb(0x14f)](_0x55dd70);this[_0x2242cb(0x149)](_0x55dd70,_0x3a798d,_0x2551ce);},VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x13a)]=function(_0x269f0b,_0x24d419){const _0x56c3fc=_0x3f44c9,_0x1c1a29=VisuMZ[_0x56c3fc(0x18e)][_0x56c3fc(0x1b2)],_0xabebb8=_0x269f0b[_0x56c3fc(0x125)]()['note'];let _0x117abb=[],_0x5bb6a4={'all':_0x269f0b[_0x56c3fc(0x1d6)]()[_0x56c3fc(0x1bf)](),'gold':0x1,'item':0x1,'weapon':0x1,'armor':0x1},_0x42a0a5={'all':_0x269f0b['subject']()[_0x56c3fc(0x1d9)]()-_0x24d419[_0x56c3fc(0x1eb)](),'gold':0x0,'item':0x0,'weapon':0x0,'armor':0x0};_0xabebb8['match'](_0x1c1a29[_0x56c3fc(0x11b)])&&(_0x117abb=[_0x56c3fc(0x175),_0x56c3fc(0x182),_0x56c3fc(0x17e),'ARMOR']);const _0x1c4ddc=_0xabebb8[_0x56c3fc(0x1e1)](_0x1c1a29[_0x56c3fc(0x1d0)]);if(_0x1c4ddc)for(const _0x26343b of _0x1c4ddc){if(!_0x26343b)continue;if(_0x26343b[_0x56c3fc(0x1e1)](/ALL/i)){_0x117abb=['GOLD',_0x56c3fc(0x182),_0x56c3fc(0x17e),'ARMOR'];if(_0x26343b[_0x56c3fc(0x1e1)](/([\+\-]\d+)([%％])/i))_0x42a0a5[_0x56c3fc(0x13f)]+=Number(RegExp['$1'])*0.01;else _0x26343b['match'](/(\d+)([%％])/i)&&(_0x5bb6a4[_0x56c3fc(0x13f)]*=Number(RegExp['$1'])*0.01);}if(_0x26343b[_0x56c3fc(0x1e1)](/GOLD/i)){_0x117abb['push'](_0x56c3fc(0x175));if(_0x26343b['match'](/([\+\-]\d+)([%％])/i))_0x42a0a5[_0x56c3fc(0x200)]+=Number(RegExp['$1'])*0.01;else _0x26343b[_0x56c3fc(0x1e1)](/(\d+)([%％])/i)&&(_0x5bb6a4['gold']*=Number(RegExp['$1'])*0.01);}if(_0x26343b[_0x56c3fc(0x1e1)](/ITEM/i)){_0x117abb['push'](_0x56c3fc(0x182));if(_0x26343b[_0x56c3fc(0x1e1)](/([\+\-]\d+)([%％])/i))_0x42a0a5['item']+=Number(RegExp['$1'])*0.01;else _0x26343b[_0x56c3fc(0x1e1)](/(\d+)([%％])/i)&&(_0x5bb6a4['item']*=Number(RegExp['$1'])*0.01);}if(_0x26343b[_0x56c3fc(0x1e1)](/WEAPON/i)){_0x117abb['push'](_0x56c3fc(0x17e));if(_0x26343b[_0x56c3fc(0x1e1)](/([\+\-]\d+)([%％])/i))_0x42a0a5[_0x56c3fc(0x173)]+=Number(RegExp['$1'])*0.01;else _0x26343b['match'](/(\d+)([%％])/i)&&(_0x5bb6a4[_0x56c3fc(0x173)]*=Number(RegExp['$1'])*0.01);}if(_0x26343b[_0x56c3fc(0x1e1)](/ARMOR/i)){_0x117abb[_0x56c3fc(0x193)](_0x56c3fc(0x1f2));if(_0x26343b[_0x56c3fc(0x1e1)](/([\+\-]\d+)([%％])/i))_0x42a0a5['armor']+=Number(RegExp['$1'])*0.01;else _0x26343b[_0x56c3fc(0x1e1)](/(\d+)([%％])/i)&&(_0x5bb6a4[_0x56c3fc(0x1a4)]*=Number(RegExp['$1'])*0.01);}}let _0x233997=VisuMZ['StealItems'][_0x56c3fc(0x111)](_0x269f0b[_0x56c3fc(0x125)](),_0x56c3fc(0x101));return VisuMZ[_0x56c3fc(0x18e)]['JS'][_0x233997]&&(_0x5bb6a4['all']=VisuMZ[_0x56c3fc(0x18e)]['JS'][_0x233997][_0x56c3fc(0x18c)](_0x269f0b,_0x269f0b[_0x56c3fc(0x1d6)](),_0x24d419,_0x5bb6a4[_0x56c3fc(0x13f)])),_0x233997=VisuMZ[_0x56c3fc(0x18e)][_0x56c3fc(0x111)](_0x269f0b[_0x56c3fc(0x125)](),_0x56c3fc(0x14c)),VisuMZ[_0x56c3fc(0x18e)]['JS'][_0x233997]&&(_0x5bb6a4['gold']=VisuMZ[_0x56c3fc(0x18e)]['JS'][_0x233997][_0x56c3fc(0x18c)](_0x269f0b,_0x269f0b['subject'](),_0x24d419,_0x5bb6a4[_0x56c3fc(0x200)])),_0x233997=VisuMZ[_0x56c3fc(0x18e)][_0x56c3fc(0x111)](_0x269f0b[_0x56c3fc(0x125)](),_0x56c3fc(0x135)),VisuMZ[_0x56c3fc(0x18e)]['JS'][_0x233997]&&(_0x5bb6a4[_0x56c3fc(0x125)]=VisuMZ['StealItems']['JS'][_0x233997]['call'](_0x269f0b,_0x269f0b['subject'](),_0x24d419,_0x5bb6a4['item'])),_0x233997=VisuMZ['StealItems'][_0x56c3fc(0x111)](_0x269f0b[_0x56c3fc(0x125)](),_0x56c3fc(0x122)),VisuMZ[_0x56c3fc(0x18e)]['JS'][_0x233997]&&(_0x5bb6a4[_0x56c3fc(0x173)]=VisuMZ[_0x56c3fc(0x18e)]['JS'][_0x233997][_0x56c3fc(0x18c)](_0x269f0b,_0x269f0b[_0x56c3fc(0x1d6)](),_0x24d419,_0x5bb6a4[_0x56c3fc(0x173)])),_0x233997=VisuMZ[_0x56c3fc(0x18e)][_0x56c3fc(0x111)](_0x269f0b[_0x56c3fc(0x125)](),_0x56c3fc(0x1bb)),VisuMZ['StealItems']['JS'][_0x233997]&&(_0x5bb6a4[_0x56c3fc(0x1a4)]=VisuMZ[_0x56c3fc(0x18e)]['JS'][_0x233997][_0x56c3fc(0x18c)](_0x269f0b,_0x269f0b[_0x56c3fc(0x1d6)](),_0x24d419,_0x5bb6a4['armor'])),{'types':_0x117abb,'rate':_0x5bb6a4,'plus':_0x42a0a5};},VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x19b)]=function(_0x50a1bd){const _0xaf84ff=_0x3f44c9;var _0x62d129,_0x5dbd1d,_0x3531d8;for(_0x3531d8=_0x50a1bd[_0xaf84ff(0x105)]-0x1;_0x3531d8>0x0;_0x3531d8--){_0x62d129=Math['floor'](Math[_0xaf84ff(0x1db)]()*(_0x3531d8+0x1)),_0x5dbd1d=_0x50a1bd[_0x3531d8],_0x50a1bd[_0x3531d8]=_0x50a1bd[_0x62d129],_0x50a1bd[_0x62d129]=_0x5dbd1d;}return _0x50a1bd;},Game_Action['prototype']['processStealItemsAttempt']=function(_0x38b44f,_0x3cb46b,_0x1c11a5){const _0x42b895=_0x3f44c9;VisuMZ[_0x42b895(0x18e)][_0x42b895(0x19b)](_0x1c11a5),this[_0x42b895(0x1b0)](_0x38b44f);for(const _0x1778ea of _0x1c11a5){if(!_0x1778ea)continue;let _0x1e4c91=_0x3cb46b[_0x42b895(0x155)][_0x42b895(0x13f)]*_0x1778ea['rate'],_0x37b176=_0x3cb46b[_0x42b895(0x170)]['all'];_0x1e4c91*=_0x3cb46b[_0x42b895(0x155)][_0x1778ea['type'][_0x42b895(0x118)]()],_0x37b176+=_0x3cb46b['plus'][_0x1778ea['type']['toLowerCase']()];const _0x227e8f=_0x1e4c91+_0x37b176;if(Math['random']()<_0x227e8f)return this[_0x42b895(0x153)](_0x38b44f,_0x1778ea);}this[_0x42b895(0x114)](_0x38b44f);},Game_Action[_0x3f44c9(0x192)][_0x3f44c9(0x202)]=function(){const _0x5aea69=_0x3f44c9;if(!this[_0x5aea69(0x125)]())return![];if(!this[_0x5aea69(0x198)]())return![];if(!this[_0x5aea69(0x1c2)]())return![];if(!this[_0x5aea69(0x12a)]())return![];const _0x3955e8=VisuMZ[_0x5aea69(0x18e)]['RegExp'],_0x25adb3=this[_0x5aea69(0x125)]()[_0x5aea69(0x11f)];return _0x25adb3[_0x5aea69(0x1e1)](_0x3955e8[_0x5aea69(0x1e2)])&&(_0x25adb3[_0x5aea69(0x1e1)](_0x3955e8['StealAction1'])||_0x25adb3['match'](_0x3955e8[_0x5aea69(0x1d0)]));},Game_Action['prototype'][_0x3f44c9(0x1d3)]=function(_0xebace5,_0x3dca1b){const _0x44c45f=_0x3f44c9;this[_0x44c45f(0x212)]=_0xebace5[_0x44c45f(0x1dc)]();const _0xbd0a17=_0xebace5[_0x44c45f(0x13e)]();this['_snatchItemIndex']=_0xbd0a17[_0x44c45f(0x132)](_0x3dca1b);},Game_Action[_0x3f44c9(0x192)][_0x3f44c9(0x1e6)]=function(_0x241a83){const _0x4bab0e=_0x3f44c9;if(_0x241a83[_0x4bab0e(0x1dc)]()!==this['_snatchEnemyIndex'])return[];this[_0x4bab0e(0x1fb)]=this[_0x4bab0e(0x1fb)]||0x0;const _0x12d590=_0x241a83[_0x4bab0e(0x13e)]();return[_0x12d590[this['_snatchItemIndex']]];},Game_Action['prototype']['processStealItemsSuccess']=function(_0x31e838,_0xf51ea8){const _0x1522d4=_0x3f44c9;_0xf51ea8[_0x1522d4(0x134)]=!![],this[_0x1522d4(0x142)](_0x31e838,_0xf51ea8),this[_0x1522d4(0x1b3)](_0xf51ea8),this['processStealItemsSuccessPopup'](_0x31e838,_0xf51ea8),this['processStealItemsSuccessEquipDebuff'](_0x31e838,_0xf51ea8),this[_0x1522d4(0x126)](_0x31e838,_0xf51ea8);},Game_Action['prototype'][_0x3f44c9(0x142)]=function(_0x3dc7cd,_0xec4282){const _0x268ff6=_0x3f44c9,_0x1142da=VisuMZ[_0x268ff6(0x18e)][_0x268ff6(0x14d)][_0x268ff6(0x12b)];let _0x4acfdd=_0x1142da['StealItem'],_0x130e6c='';if(_0xec4282[_0x268ff6(0x1ee)]===_0x268ff6(0x175)){$gameParty['gainGold'](_0xec4282['id']);if(Imported['VisuMZ_3_VisualGoldDisplay']){const _0x319ba9=Window_Base['VISUAL_GOLD_DISPLAY_PAD_ZERO_DEFAULT'],_0x1844a3=VisuMZ['VisualGoldDisplay'][_0x268ff6(0x166)](_0xec4282['id'],_0x319ba9,![]);_0x130e6c=_0x4acfdd[_0x268ff6(0x1e7)](_0x1844a3,'');}else _0x4acfdd=_0x1142da['StealGold'],_0x130e6c=_0x4acfdd[_0x268ff6(0x1e7)](TextManager[_0x268ff6(0x1ed)],_0xec4282['id']);if(Imported[_0x268ff6(0x1c4)]){const _0x46f00c=VisuMZ[_0x268ff6(0x18e)][_0x268ff6(0x14d)]['Auto'];_0x46f00c[_0x268ff6(0x161)]&&_0x46f00c[_0x268ff6(0x154)]&&(_0x3dc7cd[_0x268ff6(0x104)]=_0x3dc7cd[_0x268ff6(0x104)]||{},_0x3dc7cd['_visualDrops'][_0x268ff6(0x200)]=0x0);}}else{if(_0xec4282[_0x268ff6(0x1ee)]===_0x268ff6(0x182)){const _0x43fa04=$dataItems[_0xec4282['id']];if(!_0x43fa04)return;$gameParty['gainItem'](_0x43fa04,0x1);const _0x36cdec=_0x268ff6(0x1f4)['format'](_0x43fa04[_0x268ff6(0x1a3)]);_0x130e6c=_0x4acfdd[_0x268ff6(0x1e7)](_0x43fa04[_0x268ff6(0x103)],_0x36cdec);}else{if(_0xec4282[_0x268ff6(0x1ee)]===_0x268ff6(0x17e)){const _0x1dcc86=$dataWeapons[_0xec4282['id']];if(!_0x1dcc86)return;$gameParty['gainItem'](_0x1dcc86,0x1);const _0x5f5418=_0x268ff6(0x1f4)[_0x268ff6(0x1e7)](_0x1dcc86[_0x268ff6(0x1a3)]);_0x130e6c=_0x4acfdd[_0x268ff6(0x1e7)](_0x1dcc86[_0x268ff6(0x103)],_0x5f5418);}else{if(_0xec4282[_0x268ff6(0x1ee)]==='ARMOR'){const _0x1d894e=$dataArmors[_0xec4282['id']];if(!_0x1d894e)return;$gameParty[_0x268ff6(0x18a)](_0x1d894e,0x1);const _0x2910f5=_0x268ff6(0x1f4)[_0x268ff6(0x1e7)](_0x1d894e['iconIndex']);_0x130e6c=_0x4acfdd[_0x268ff6(0x1e7)](_0x1d894e['name'],_0x2910f5);}}}}if(_0x1142da['ShowMessages']){const _0x231f05=SceneManager[_0x268ff6(0x1ea)][_0x268ff6(0x1b1)];if(_0x231f05&&_0x130e6c!=='')_0x231f05[_0x268ff6(0x207)](_0x130e6c);}},Game_Action[_0x3f44c9(0x192)]['processStealItemsSuccessSFX']=function(_0x390998){const _0x5f3228=_0x3f44c9,_0x3d388e=VisuMZ[_0x5f3228(0x18e)][_0x5f3228(0x14d)][_0x5f3228(0x10d)];if(!_0x3d388e)return;const _0x4eee52=_0x390998[_0x5f3228(0x1ee)][_0x5f3228(0x118)]()[_0x5f3228(0x16c)](),_0x39c58b={'name':_0x3d388e[_0x5f3228(0x19f)[_0x5f3228(0x1e7)](_0x4eee52)]||'','volume':_0x3d388e[_0x5f3228(0x20c)[_0x5f3228(0x1e7)](_0x4eee52)]||0x0,'pitch':_0x3d388e[_0x5f3228(0x1fe)[_0x5f3228(0x1e7)](_0x4eee52)]||0x0,'pan':_0x3d388e['%1_pan'[_0x5f3228(0x1e7)](_0x4eee52)]||0x0};if(_0x39c58b[_0x5f3228(0x103)]!=='')AudioManager[_0x5f3228(0x1e8)](_0x39c58b);},Game_Action[_0x3f44c9(0x192)][_0x3f44c9(0x13b)]=function(_0x59dda2,_0x3712f0){const _0xd46494=_0x3f44c9;if(!_0x3712f0)return;if(!_0x59dda2)return;const _0x5465e9=VisuMZ[_0xd46494(0x18e)]['Settings'][_0xd46494(0x10f)];if(!_0x5465e9)return;if(_0x5465e9[_0xd46494(0x131)]==='')return;const _0x3efaa9=_0x5465e9[_0xd46494(0x131)],_0x441264={'textColor':_0x5465e9[_0xd46494(0x176)]||0x0,'flashColor':_0x5465e9[_0xd46494(0x139)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x5465e9[_0xd46494(0x1c9)]||0x3c};_0x59dda2[_0xd46494(0x130)](_0x3efaa9,_0x441264);if(_0x5465e9[_0xd46494(0x1d2)]&&_0x3712f0[_0xd46494(0x1ee)]!=='GOLD'){let _0x3b7486=null;if(_0x3712f0[_0xd46494(0x1ee)]==='ITEM')_0x3b7486=$dataItems[_0x3712f0['id']];else{if(_0x3712f0['type']===_0xd46494(0x17e))_0x3b7486=$dataWeapons[_0x3712f0['id']];else _0x3712f0['type']===_0xd46494(0x1f2)&&(_0x3b7486=$dataArmors[_0x3712f0['id']]);}_0x3b7486&&_0x59dda2[_0xd46494(0x181)](_0x3b7486[_0xd46494(0x1a3)],_0x3b7486[_0xd46494(0x103)],_0x441264);}},Game_Action[_0x3f44c9(0x192)][_0x3f44c9(0x1cf)]=function(_0x528962,_0xb6418a){const _0x169a9a=_0x3f44c9;if(!_0x528962)return;const _0x5cef3e=VisuMZ[_0x169a9a(0x18e)][_0x169a9a(0x14d)][_0x169a9a(0x190)];if(!_0x5cef3e)return;if(!_0x5cef3e[_0x169a9a(0x156)])return;if(![_0x169a9a(0x17e),'ARMOR'][_0x169a9a(0x1ac)](_0xb6418a[_0x169a9a(0x1ee)]))return;let _0x2f9806=null;if(_0xb6418a[_0x169a9a(0x1ee)]===_0x169a9a(0x17e))_0x2f9806=$dataWeapons[_0xb6418a['id']];else _0xb6418a[_0x169a9a(0x1ee)]===_0x169a9a(0x1f2)&&(_0x2f9806=$dataArmors[_0xb6418a['id']]);if(!_0x2f9806)return;for(let _0x35cd0b=0x0;_0x35cd0b<0x8;_0x35cd0b++){const _0x2b3b55=_0x2f9806[_0x169a9a(0x20d)][_0x35cd0b];_0x528962[_0x169a9a(0x19e)](_0x35cd0b,-_0x2b3b55);}},Game_Action[_0x3f44c9(0x192)][_0x3f44c9(0x126)]=function(_0x5c2a96,_0x1d8480){const _0x395e1c=_0x3f44c9;if(!_0x5c2a96)return;let _0x22a58a=null,_0x1df8c8=0x0;if(_0x1d8480['type']==='GOLD')_0x1df8c8=_0x1d8480['id'];else{if(_0x1d8480[_0x395e1c(0x1ee)]===_0x395e1c(0x182))_0x22a58a=$dataItems[_0x1d8480['id']];else{if(_0x1d8480[_0x395e1c(0x1ee)]==='WEAPON')_0x22a58a=$dataWeapons[_0x1d8480['id']];else _0x1d8480[_0x395e1c(0x1ee)]===_0x395e1c(0x1f2)&&(_0x22a58a=$dataArmors[_0x1d8480['id']]);}}const _0x59c63d=VisuMZ[_0x395e1c(0x18e)][_0x395e1c(0x14d)]['Mechanics'];_0x59c63d&&_0x59c63d['JsOnStealSuccess']&&_0x59c63d[_0x395e1c(0x10e)][_0x395e1c(0x18c)](this,this['subject'](),_0x5c2a96,_0x22a58a,_0x1df8c8);const _0x148197=VisuMZ['StealItems']['createKeyJS'](this[_0x395e1c(0x125)](),_0x395e1c(0x10e));VisuMZ[_0x395e1c(0x18e)]['JS'][_0x148197]&&VisuMZ[_0x395e1c(0x18e)]['JS'][_0x148197][_0x395e1c(0x18c)](this,this['subject'](),_0x5c2a96,_0x22a58a,_0x1df8c8);},Game_Action['prototype'][_0x3f44c9(0x114)]=function(_0xdbb48e){const _0x3694b7=_0x3f44c9;this[_0x3694b7(0x1a8)](_0xdbb48e),this[_0x3694b7(0x102)](),this[_0x3694b7(0x197)](_0xdbb48e),this[_0x3694b7(0x20e)](_0xdbb48e);},Game_Action['prototype'][_0x3f44c9(0x1a8)]=function(_0x476c16){const _0x2f68bc=_0x3f44c9,_0x152661=VisuMZ[_0x2f68bc(0x18e)][_0x2f68bc(0x14d)][_0x2f68bc(0x12b)];if(_0x152661[_0x2f68bc(0x123)]){const _0x1ffde3=_0x152661[_0x2f68bc(0x1c3)],_0x826aa7=SceneManager['_scene'][_0x2f68bc(0x1b1)];if(_0x826aa7&&_0x1ffde3!=='')_0x826aa7[_0x2f68bc(0x207)](_0x1ffde3);}},Game_Action[_0x3f44c9(0x192)][_0x3f44c9(0x102)]=function(){const _0x13f42=_0x3f44c9,_0x2f8d4f=VisuMZ[_0x13f42(0x18e)][_0x13f42(0x14d)][_0x13f42(0x10d)];if(!_0x2f8d4f)return;const _0x408b6b=_0x13f42(0x160),_0x3bbfe2={'name':_0x2f8d4f[_0x13f42(0x19f)[_0x13f42(0x1e7)](_0x408b6b)]||'','volume':_0x2f8d4f['%1_volume'['format'](_0x408b6b)]||0x0,'pitch':_0x2f8d4f[_0x13f42(0x1fe)[_0x13f42(0x1e7)](_0x408b6b)]||0x0,'pan':_0x2f8d4f['%1_pan'[_0x13f42(0x1e7)](_0x408b6b)]||0x0};if(_0x3bbfe2[_0x13f42(0x103)]!=='')AudioManager[_0x13f42(0x1e8)](_0x3bbfe2);},Game_Action['prototype'][_0x3f44c9(0x197)]=function(_0x5b223e){const _0x50d264=_0x3f44c9;if(!_0x5b223e)return;const _0x339964=VisuMZ['StealItems'][_0x50d264(0x14d)][_0x50d264(0x10f)];if(!_0x339964)return;if(_0x339964[_0x50d264(0x1c6)]==='')return;const _0x3cab86=_0x339964[_0x50d264(0x1c6)],_0x26ae79={'textColor':_0x339964['FailureTextColor']||0x0,'flashColor':_0x339964[_0x50d264(0x172)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x339964[_0x50d264(0x183)]||0x3c};_0x5b223e['setupTextPopup'](_0x3cab86,_0x26ae79);},Game_Action[_0x3f44c9(0x192)][_0x3f44c9(0x20e)]=function(_0x1c18cf){const _0x339525=_0x3f44c9;if(!_0x1c18cf)return;const _0x12a94b=VisuMZ[_0x339525(0x18e)]['Settings'][_0x339525(0x190)];_0x12a94b&&_0x12a94b['JsOnStealFail']&&_0x12a94b[_0x339525(0x1e0)][_0x339525(0x18c)](this,this[_0x339525(0x1d6)](),_0x1c18cf);const _0x114bf1=VisuMZ[_0x339525(0x18e)][_0x339525(0x111)](this[_0x339525(0x125)](),'JsOnStealFail');VisuMZ[_0x339525(0x18e)]['JS'][_0x114bf1]&&VisuMZ[_0x339525(0x18e)]['JS'][_0x114bf1][_0x339525(0x18c)](this,this[_0x339525(0x1d6)](),_0x1c18cf);},Game_Action[_0x3f44c9(0x192)][_0x3f44c9(0x14f)]=function(_0x21e19a){const _0x245b97=_0x3f44c9;this['processStealItemsNothingLogWindow'](_0x21e19a),this[_0x245b97(0x14b)](),this[_0x245b97(0x1d4)](_0x21e19a),this[_0x245b97(0x1ce)](_0x21e19a);},Game_Action['prototype']['processStealItemsNothingLogWindow']=function(_0xae0d5a){const _0x218c87=_0x3f44c9,_0x210876=VisuMZ[_0x218c87(0x18e)]['Settings'][_0x218c87(0x12b)];if(_0x210876['ShowMessages']){const _0x280a54=_0x210876[_0x218c87(0x18b)],_0x2402f7=SceneManager[_0x218c87(0x1ea)][_0x218c87(0x1b1)];if(_0x2402f7&&_0x280a54!=='')_0x2402f7['addStealText'](_0x280a54);}},Game_Action[_0x3f44c9(0x192)][_0x3f44c9(0x14b)]=function(){const _0x53874d=_0x3f44c9,_0x258692=VisuMZ['StealItems'][_0x53874d(0x14d)][_0x53874d(0x10d)];if(!_0x258692)return;const _0x35a5e6=_0x53874d(0x14e),_0x4b2fa6={'name':_0x258692[_0x53874d(0x19f)[_0x53874d(0x1e7)](_0x35a5e6)]||'','volume':_0x258692['%1_volume'[_0x53874d(0x1e7)](_0x35a5e6)]||0x0,'pitch':_0x258692[_0x53874d(0x1fe)[_0x53874d(0x1e7)](_0x35a5e6)]||0x0,'pan':_0x258692[_0x53874d(0x188)[_0x53874d(0x1e7)](_0x35a5e6)]||0x0};if(_0x4b2fa6[_0x53874d(0x103)]!=='')AudioManager[_0x53874d(0x1e8)](_0x4b2fa6);},Game_Action[_0x3f44c9(0x192)][_0x3f44c9(0x1d4)]=function(_0x59dddb){const _0x3beccf=_0x3f44c9;if(!_0x59dddb)return;const _0x343fd4=VisuMZ[_0x3beccf(0x18e)]['Settings'][_0x3beccf(0x10f)];if(!_0x343fd4)return;if(_0x343fd4['FailurePopupText']==='')return;const _0x59e55c=_0x343fd4[_0x3beccf(0x1e4)],_0x35c9dc={'textColor':_0x343fd4['EmptyTextColor']||0x0,'flashColor':_0x343fd4[_0x3beccf(0x1a5)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x343fd4[_0x3beccf(0x186)]||0x3c};_0x59dddb['setupTextPopup'](_0x59e55c,_0x35c9dc);},Game_Action[_0x3f44c9(0x192)][_0x3f44c9(0x1ce)]=function(_0x46cd11){const _0x60c406=_0x3f44c9;if(!_0x46cd11)return;const _0xe62205=VisuMZ['StealItems'][_0x60c406(0x14d)][_0x60c406(0x190)];_0xe62205&&_0xe62205[_0x60c406(0x117)]&&_0xe62205[_0x60c406(0x117)]['call'](this,this['subject'](),_0x46cd11);const _0x51bbbe=VisuMZ[_0x60c406(0x18e)]['createKeyJS'](this[_0x60c406(0x125)](),_0x60c406(0x185));VisuMZ[_0x60c406(0x18e)]['JS'][_0x51bbbe]&&VisuMZ[_0x60c406(0x18e)]['JS'][_0x51bbbe][_0x60c406(0x18c)](this,this[_0x60c406(0x1d6)](),_0x46cd11);},VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x211)]=Game_BattlerBase[_0x3f44c9(0x192)][_0x3f44c9(0x1a0)],Game_BattlerBase[_0x3f44c9(0x192)]['refresh']=function(){const _0x53d4f9=_0x3f44c9;this['_cache']={},VisuMZ[_0x53d4f9(0x18e)][_0x53d4f9(0x211)]['call'](this);},Game_BattlerBase[_0x3f44c9(0x192)][_0x3f44c9(0x19a)]=function(_0xf51be4){const _0x11587d=_0x3f44c9;return this[_0x11587d(0x16a)]=this['_cache']||{},this[_0x11587d(0x16a)][_0xf51be4]!==undefined;},Game_BattlerBase[_0x3f44c9(0x192)][_0x3f44c9(0x1bf)]=function(){const _0x3cd40a=_0x3f44c9;let _0x3e71ff=_0x3cd40a(0x1bf);if(this[_0x3cd40a(0x19a)](_0x3e71ff))return this[_0x3cd40a(0x16a)][_0x3e71ff];return this[_0x3cd40a(0x16a)][_0x3e71ff]=this[_0x3cd40a(0x20f)](),this[_0x3cd40a(0x16a)][_0x3e71ff];},Game_BattlerBase[_0x3f44c9(0x192)][_0x3f44c9(0x20f)]=function(){const _0x58d114=_0x3f44c9,_0x37aafe=VisuMZ[_0x58d114(0x18e)][_0x58d114(0x1b2)];let _0x9e3a58=0x1;for(const _0x53aafa of this['traitObjects']()){if(!_0x53aafa)continue;const _0x35889a=_0x53aafa['note'];_0x35889a[_0x58d114(0x1e1)](_0x37aafe['StealRate'])&&(_0x9e3a58*=Number(RegExp['$1'])*0.01);}return Math['max'](0x0,_0x9e3a58);},Game_BattlerBase[_0x3f44c9(0x192)]['stealPlus']=function(){const _0x2a2b62=_0x3f44c9;let _0x2c6bdc=_0x2a2b62(0x1d9);if(this[_0x2a2b62(0x19a)](_0x2c6bdc))return this[_0x2a2b62(0x16a)][_0x2c6bdc];return this[_0x2a2b62(0x16a)][_0x2c6bdc]=this[_0x2a2b62(0x1d1)](),this['_cache'][_0x2c6bdc];},Game_BattlerBase[_0x3f44c9(0x192)][_0x3f44c9(0x1d1)]=function(){const _0x1c5479=_0x3f44c9,_0x3ac9d8=VisuMZ[_0x1c5479(0x18e)][_0x1c5479(0x1b2)];let _0x4ab0ab=0x0;const _0x18735c=VisuMZ[_0x1c5479(0x18e)][_0x1c5479(0x14d)][_0x1c5479(0x190)];_0x18735c&&_0x18735c[_0x1c5479(0x164)]&&(_0x4ab0ab+=_0x18735c['JsBonusSteal'][_0x1c5479(0x18c)](this));for(const _0x26310f of this['traitObjects']()){if(!_0x26310f)continue;const _0x32374a=_0x26310f['note'];_0x32374a['match'](_0x3ac9d8[_0x1c5479(0x10c)])&&(_0x4ab0ab+=Number(RegExp['$1'])*0.01);}return _0x4ab0ab;},Game_BattlerBase['prototype'][_0x3f44c9(0x1eb)]=function(){const _0x35c70e=_0x3f44c9;let _0x4c8c25=_0x35c70e(0x1eb);if(this['checkCacheKey'](_0x4c8c25))return this[_0x35c70e(0x16a)][_0x4c8c25];return this[_0x35c70e(0x16a)][_0x4c8c25]=this[_0x35c70e(0x1ca)](),this[_0x35c70e(0x16a)][_0x4c8c25];},Game_BattlerBase['prototype']['createStealResist']=function(){const _0x1893de=_0x3f44c9,_0x4fdf3a=VisuMZ[_0x1893de(0x18e)][_0x1893de(0x1b2)];let _0x262417=0x0;const _0x4e596d=VisuMZ['StealItems']['Settings'][_0x1893de(0x190)];_0x4e596d&&_0x4e596d[_0x1893de(0x151)]&&(_0x262417+=_0x4e596d[_0x1893de(0x151)][_0x1893de(0x18c)](this));for(const _0x109fd8 of this[_0x1893de(0x179)]()){if(!_0x109fd8)continue;const _0x28c841=_0x109fd8[_0x1893de(0x11f)];_0x28c841['match'](_0x4fdf3a[_0x1893de(0x1ab)])&&(_0x262417+=Number(RegExp['$1'])*0.01);}return _0x262417;},VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x167)]=Game_Enemy[_0x3f44c9(0x192)][_0x3f44c9(0x127)],Game_Enemy['prototype'][_0x3f44c9(0x127)]=function(_0x37b292,_0x1b034c,_0x1c77db){const _0x3a0a5c=_0x3f44c9;VisuMZ['StealItems'][_0x3a0a5c(0x167)][_0x3a0a5c(0x18c)](this,_0x37b292,_0x1b034c,_0x1c77db),!Imported[_0x3a0a5c(0x1df)]&&this['setupStealableItems']();},VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x1a1)]=Game_Enemy[_0x3f44c9(0x192)][_0x3f44c9(0x1b7)],Game_Enemy[_0x3f44c9(0x192)][_0x3f44c9(0x1b7)]=function(){const _0x43d28b=_0x3f44c9;VisuMZ[_0x43d28b(0x18e)][_0x43d28b(0x1a1)][_0x43d28b(0x18c)](this),this[_0x43d28b(0x1fa)]();},Game_Enemy[_0x3f44c9(0x192)][_0x3f44c9(0x13e)]=function(){const _0x333657=_0x3f44c9;if(this[_0x333657(0x11a)]===undefined)this[_0x333657(0x1fa)]();return this[_0x333657(0x11a)];},Game_Enemy[_0x3f44c9(0x192)]['setupStealableItems']=function(){const _0x4c7b49=_0x3f44c9,_0x16316b=this[_0x4c7b49(0x110)]();if(!_0x16316b)return;this[_0x4c7b49(0x11a)]=VisuMZ[_0x4c7b49(0x18e)][_0x4c7b49(0x1f1)](this,_0x16316b);},VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x1fc)]={},VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x1f1)]=function(_0x5d6165,_0x5127c7){const _0x5db9ea=_0x3f44c9;if(!_0x5127c7)return[];if(VisuMZ[_0x5db9ea(0x18e)][_0x5db9ea(0x1fc)][_0x5127c7['id']])return JsonEx[_0x5db9ea(0x210)](VisuMZ[_0x5db9ea(0x18e)][_0x5db9ea(0x1fc)][_0x5127c7['id']]);VisuMZ[_0x5db9ea(0x18e)]['StealData'][_0x5127c7['id']]=[];const _0x39029b=VisuMZ[_0x5db9ea(0x18e)]['Settings']['Auto'],_0x1b6b04=VisuMZ[_0x5db9ea(0x18e)][_0x5db9ea(0x1b2)],_0x7506c1=_0x5127c7[_0x5db9ea(0x11f)];if(_0x39029b['AutoGold']&&_0x5127c7[_0x5db9ea(0x200)]>0x0){const _0x2b18bf={'type':_0x5db9ea(0x175),'id':_0x5127c7[_0x5db9ea(0x200)],'rate':_0x39029b[_0x5db9ea(0x1c5)],'stolen':![],'drop':!![]};VisuMZ[_0x5db9ea(0x18e)]['StealData'][_0x5127c7['id']][_0x5db9ea(0x193)](_0x2b18bf);}if(_0x39029b[_0x5db9ea(0x137)]){const _0x36725b=_0x5127c7[_0x5db9ea(0x129)];for(const _0x447a21 of _0x36725b){if(_0x447a21){const _0x1ac097={'type':_0x5db9ea(0x12f),'id':_0x447a21[_0x5db9ea(0x107)],'rate':0x1/Math[_0x5db9ea(0x20b)](0x1,_0x447a21[_0x5db9ea(0x1f0)])*_0x39029b['ItemRate'],'stolen':![],'drop':!![],'dropIndex':_0x36725b['indexOf'](_0x447a21)};_0x1ac097[_0x5db9ea(0x1ee)]=[_0x5db9ea(0x12f),'ITEM',_0x5db9ea(0x17e),'ARMOR'][_0x447a21[_0x5db9ea(0x174)]];if(_0x1ac097[_0x5db9ea(0x1ee)]===_0x5db9ea(0x12f))continue;VisuMZ[_0x5db9ea(0x18e)]['StealData'][_0x5127c7['id']][_0x5db9ea(0x193)](_0x1ac097);}}}const _0xdc39f5=_0x7506c1[_0x5db9ea(0x1e1)](_0x1b6b04[_0x5db9ea(0x17a)]);if(_0xdc39f5)for(const _0x2e78c1 of _0xdc39f5){if(!_0x2e78c1)continue;_0x2e78c1[_0x5db9ea(0x1e1)](_0x1b6b04[_0x5db9ea(0x17a)]);const _0x578f2e=String(RegExp['$1'])['trim'](),_0x1f42bc=Number(RegExp['$2'])*0.01,_0x849c2=VisuMZ[_0x5db9ea(0x18e)][_0x5db9ea(0x206)](_0x578f2e,_0x1f42bc);if(!!_0x849c2)VisuMZ[_0x5db9ea(0x18e)][_0x5db9ea(0x1fc)][_0x5127c7['id']][_0x5db9ea(0x193)](_0x849c2);}if(_0x7506c1['match'](_0x1b6b04[_0x5db9ea(0x1ff)])){const _0x4ff297=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x3f4733 of _0x4ff297){if(_0x3f4733['match'](/(.*):[ ](.*)([%％])/i)){const _0x2018f2=String(RegExp['$1'])['trim'](),_0x509171=Number(RegExp['$2'])*0.01,_0x7a52d9=VisuMZ[_0x5db9ea(0x18e)][_0x5db9ea(0x206)](_0x2018f2,_0x509171);if(!!_0x7a52d9)VisuMZ[_0x5db9ea(0x18e)][_0x5db9ea(0x1fc)][_0x5127c7['id']][_0x5db9ea(0x193)](_0x7a52d9);}}}return JsonEx[_0x5db9ea(0x210)](VisuMZ[_0x5db9ea(0x18e)][_0x5db9ea(0x1fc)][_0x5127c7['id']]);},VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x206)]=function(_0x53b34d,_0x4c6cbd){const _0x3a0139=_0x3f44c9,_0x56f2a3={'type':_0x3a0139(0x12f),'id':0x0,'rate':_0x4c6cbd,'stolen':![],'drop':![]};_0x53b34d['match'](/GOLD[ ](\d+)/i)&&(_0x56f2a3[_0x3a0139(0x1ee)]=_0x3a0139(0x175),_0x56f2a3['id']=Number(RegExp['$1']));if(_0x53b34d[_0x3a0139(0x1e1)](/ITEM[ ](\d+)/i))_0x56f2a3['type']=_0x3a0139(0x182),_0x56f2a3['id']=Number(RegExp['$1']);else _0x53b34d[_0x3a0139(0x1e1)](/ITEM[ ](.*)/i)&&(_0x56f2a3[_0x3a0139(0x1ee)]=_0x3a0139(0x182),_0x56f2a3['id']=DataManager['getItemIdWithName'](RegExp['$1']));if(_0x53b34d['match'](/WEAPON[ ](\d+)/i))_0x56f2a3['type']=_0x3a0139(0x17e),_0x56f2a3['id']=Number(RegExp['$1']);else _0x53b34d['match'](/WEAPON[ ](.*)/i)&&(_0x56f2a3[_0x3a0139(0x1ee)]=_0x3a0139(0x17e),_0x56f2a3['id']=DataManager[_0x3a0139(0x16d)](RegExp['$1']));if(_0x53b34d['match'](/ARMOR[ ](\d+)/i))_0x56f2a3['type']=_0x3a0139(0x1f2),_0x56f2a3['id']=Number(RegExp['$1']);else _0x53b34d[_0x3a0139(0x1e1)](/ARMOR[ ](.*)/i)&&(_0x56f2a3[_0x3a0139(0x1ee)]=_0x3a0139(0x1f2),_0x56f2a3['id']=DataManager[_0x3a0139(0x17c)](RegExp['$1']));return _0x56f2a3;},VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x204)]=Game_Enemy[_0x3f44c9(0x192)][_0x3f44c9(0x200)],Game_Enemy['prototype']['gold']=function(){const _0x42a2c2=_0x3f44c9,_0x144ab7=VisuMZ['StealItems'][_0x42a2c2(0x14d)][_0x42a2c2(0x1fd)];if(_0x144ab7[_0x42a2c2(0x161)]&&_0x144ab7[_0x42a2c2(0x154)]){const _0x509594=this['getStealableItems']();for(const _0x51ae48 of _0x509594){if(!_0x51ae48)continue;if(_0x51ae48['drop']&&_0x51ae48[_0x42a2c2(0x1ee)]===_0x42a2c2(0x175)){if(_0x51ae48[_0x42a2c2(0x134)])return 0x0;}}}return VisuMZ['StealItems'][_0x42a2c2(0x204)]['call'](this);},VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x169)]=Game_Enemy[_0x3f44c9(0x192)]['makeDropItems'],Game_Enemy[_0x3f44c9(0x192)][_0x3f44c9(0x159)]=function(){const _0x58eb2a=_0x3f44c9,_0x588d34=JsonEx['makeDeepCopy'](this[_0x58eb2a(0x110)]()[_0x58eb2a(0x129)]),_0x4051ca=VisuMZ[_0x58eb2a(0x18e)][_0x58eb2a(0x14d)]['Auto'];if(_0x4051ca[_0x58eb2a(0x137)]&&_0x4051ca['ItemRemoval']){const _0x4e3635=this[_0x58eb2a(0x13e)]();for(const _0x2a17ae of _0x4e3635){if(!_0x2a17ae)continue;if(_0x2a17ae[_0x58eb2a(0x145)]&&_0x2a17ae[_0x58eb2a(0x1ee)]!==_0x58eb2a(0x175)){if(!_0x2a17ae[_0x58eb2a(0x134)])continue;const _0x61f017=_0x2a17ae[_0x58eb2a(0x194)],_0x151a07=this['enemy']()['dropItems'][_0x61f017];_0x151a07[_0x58eb2a(0x174)]=0x0;}}}let _0xf229cd=VisuMZ[_0x58eb2a(0x18e)][_0x58eb2a(0x169)][_0x58eb2a(0x18c)](this);return this['enemy']()['dropItems']=_0x588d34,_0xf229cd;},VisuMZ[_0x3f44c9(0x18e)]['Scene_Battle_createEnemyWindow']=Scene_Battle[_0x3f44c9(0x192)][_0x3f44c9(0x17d)],Scene_Battle[_0x3f44c9(0x192)][_0x3f44c9(0x17d)]=function(){const _0xdc0b79=_0x3f44c9;VisuMZ[_0xdc0b79(0x18e)][_0xdc0b79(0x140)][_0xdc0b79(0x18c)](this),this[_0xdc0b79(0x143)]();},Scene_Battle[_0x3f44c9(0x192)][_0x3f44c9(0x143)]=function(){const _0x28dcde=_0x3f44c9,_0x4707d0=this[_0x28dcde(0x1de)]();this['_stealSnatchWindow']=new Window_StealSnatch(_0x4707d0),this['_stealSnatchWindow'][_0x28dcde(0x12e)](this[_0x28dcde(0x152)]),this[_0x28dcde(0x19c)][_0x28dcde(0x1cc)]('ok',this[_0x28dcde(0x1a2)][_0x28dcde(0x1f3)](this)),this['_stealSnatchWindow']['setHandler'](_0x28dcde(0x18d),this[_0x28dcde(0x1a7)][_0x28dcde(0x1f3)](this)),this[_0x28dcde(0x141)](this['_stealSnatchWindow']);},VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x15e)]=Scene_Battle[_0x3f44c9(0x192)][_0x3f44c9(0x12c)],Scene_Battle[_0x3f44c9(0x192)]['isAnyInputWindowActive']=function(){const _0x361d17=_0x3f44c9;if(this[_0x361d17(0x19c)]&&this[_0x361d17(0x19c)][_0x361d17(0x1aa)])return!![];return VisuMZ[_0x361d17(0x18e)][_0x361d17(0x15e)]['call'](this);},VisuMZ['StealItems']['Scene_Battle_hideSubInputWindows']=Scene_Battle[_0x3f44c9(0x192)][_0x3f44c9(0x16e)],Scene_Battle[_0x3f44c9(0x192)]['hideSubInputWindows']=function(){const _0xc10bc4=_0x3f44c9;VisuMZ['StealItems'][_0xc10bc4(0x13d)][_0xc10bc4(0x18c)](this),this[_0xc10bc4(0x19c)]&&(this[_0xc10bc4(0x19c)][_0xc10bc4(0x1b6)](),this['_stealSnatchWindow'][_0xc10bc4(0x16f)]());},VisuMZ[_0x3f44c9(0x18e)][_0x3f44c9(0x1a6)]=Scene_Battle[_0x3f44c9(0x192)][_0x3f44c9(0x115)],Scene_Battle[_0x3f44c9(0x192)][_0x3f44c9(0x115)]=function(){const _0x37172b=_0x3f44c9,_0x5782e5=BattleManager[_0x37172b(0x1bc)]();this[_0x37172b(0x19c)]&&_0x5782e5['isSnatchEffect']()?this['startStealSnatchSelection']():VisuMZ[_0x37172b(0x18e)][_0x37172b(0x1a6)][_0x37172b(0x18c)](this);},Scene_Battle[_0x3f44c9(0x192)][_0x3f44c9(0x1ec)]=function(){const _0x10dba3=_0x3f44c9,_0x199145=$gameTroop['members']()[this[_0x10dba3(0x1f6)]['enemyIndex']()],_0xf0a2e0=BattleManager[_0x10dba3(0x1bc)]();this[_0x10dba3(0x19c)][_0x10dba3(0x184)](_0x199145,_0xf0a2e0),this[_0x10dba3(0x19c)][_0x10dba3(0x1a0)](),this[_0x10dba3(0x19c)]['show'](),this[_0x10dba3(0x19c)][_0x10dba3(0x205)]();},Scene_Battle[_0x3f44c9(0x192)][_0x3f44c9(0x1a2)]=function(){const _0x5e9cd5=_0x3f44c9,_0x5b317c=BattleManager[_0x5e9cd5(0x1bc)](),_0x567d82=$gameTroop[_0x5e9cd5(0x1ba)]()[this[_0x5e9cd5(0x1f6)][_0x5e9cd5(0x1c8)]()],_0x2f7ea1=this['_stealSnatchWindow'][_0x5e9cd5(0x125)]();_0x5b317c[_0x5e9cd5(0x1d3)](_0x567d82,_0x2f7ea1),VisuMZ[_0x5e9cd5(0x18e)]['Scene_Battle_onEnemyOk'][_0x5e9cd5(0x18c)](this);},Scene_Battle['prototype'][_0x3f44c9(0x1a7)]=function(){const _0x278e4b=_0x3f44c9;this[_0x278e4b(0x19c)]['hide'](),this[_0x278e4b(0x19c)][_0x278e4b(0x1b6)](),this[_0x278e4b(0x1f6)]['show'](),this[_0x278e4b(0x1f6)][_0x278e4b(0x205)](),Imported[_0x278e4b(0x20a)]&&this[_0x278e4b(0x1f6)]['autoSelect']();},Window_BattleLog[_0x3f44c9(0x192)][_0x3f44c9(0x207)]=function(_0x4ed2d1){this['_lines']['push'](_0x4ed2d1),this['refresh']();};function Window_StealSnatch(){this['initialize'](...arguments);}function _0x3cca(_0x4b8d7d,_0x24dd16){const _0x4cf233=_0x4cf2();return _0x3cca=function(_0x3ccaec,_0x2e4504){_0x3ccaec=_0x3ccaec-0x101;let _0x4f9ef0=_0x4cf233[_0x3ccaec];return _0x4f9ef0;},_0x3cca(_0x4b8d7d,_0x24dd16);}Window_StealSnatch['prototype']=Object[_0x3f44c9(0x11e)](Window_ItemList[_0x3f44c9(0x192)]),Window_StealSnatch[_0x3f44c9(0x192)][_0x3f44c9(0x116)]=Window_StealSnatch,Window_StealSnatch[_0x3f44c9(0x192)][_0x3f44c9(0x203)]=function(_0x27d3ba){const _0x4231d6=_0x3f44c9;Window_ItemList['prototype'][_0x4231d6(0x203)][_0x4231d6(0x18c)](this,_0x27d3ba),this[_0x4231d6(0x16f)](),this[_0x4231d6(0x15d)]=null,this[_0x4231d6(0x15f)]=null;},Window_StealSnatch[_0x3f44c9(0x192)]['setDetails']=function(_0x38ebbe,_0x252410){const _0x4f64e1=_0x3f44c9;this[_0x4f64e1(0x15d)]=_0x38ebbe,this[_0x4f64e1(0x15f)]=_0x252410,this['refresh'](),this['show'](),this[_0x4f64e1(0x201)](0x0);},Window_StealSnatch['prototype']['makeItemList']=function(){const _0x20f86c=_0x3f44c9;this['_data']=[];if(!this[_0x20f86c(0x15d)])return;const _0x53cd9d=VisuMZ['StealItems']['DetermineStealData'](this[_0x20f86c(0x15f)],this[_0x20f86c(0x15d)]);if(_0x53cd9d['types'][_0x20f86c(0x105)]<=0x0)return;this[_0x20f86c(0x147)]=this[_0x20f86c(0x15d)][_0x20f86c(0x13e)]()[_0x20f86c(0x150)](_0x5af497=>{const _0x5ee135=_0x20f86c;return _0x53cd9d[_0x5ee135(0x1f8)]['includes'](_0x5af497[_0x5ee135(0x1ee)]);}),Imported['VisuMZ_3_FrontviewBattleUI']&&this[_0x20f86c(0x199)]();},Window_StealSnatch[_0x3f44c9(0x192)][_0x3f44c9(0x15a)]=function(_0x5cd13f){const _0x2cd951=_0x3f44c9;return _0x5cd13f&&!_0x5cd13f[_0x2cd951(0x134)];},Window_StealSnatch[_0x3f44c9(0x192)][_0x3f44c9(0x1ad)]=function(){const _0x1756a7=_0x3f44c9;if(this[_0x1756a7(0x112)])return this[_0x1756a7(0x112)];return this[_0x1756a7(0x112)]=this[_0x1756a7(0x189)]('88.88%'),this[_0x1756a7(0x112)]=Math['max'](this[_0x1756a7(0x112)],this[_0x1756a7(0x162)](TextManager['snatchAlreadyStolen'])[_0x1756a7(0x196)]),this[_0x1756a7(0x112)];},Window_StealSnatch[_0x3f44c9(0x192)][_0x3f44c9(0x157)]=function(_0x4d7862,_0x3ba3b7,_0x369120,_0x3eab1b){const _0x1f7ca4=_0x3f44c9;if(!_0x4d7862)return;switch(_0x4d7862[_0x1f7ca4(0x1ee)][_0x1f7ca4(0x180)]()['trim']()){case'GOLD':const _0x11796f=TextManager[_0x1f7ca4(0x1c7)]['format'](_0x1f7ca4(0x1f4)[_0x1f7ca4(0x1e7)](ImageManager[_0x1f7ca4(0x171)]),_0x4d7862['id'],TextManager[_0x1f7ca4(0x1ed)]);this['drawTextEx'](_0x11796f,_0x3ba3b7,_0x369120);break;case _0x1f7ca4(0x182):Window_Base[_0x1f7ca4(0x192)][_0x1f7ca4(0x157)]['call'](this,$dataItems[_0x4d7862['id']],_0x3ba3b7,_0x369120,_0x3eab1b);break;case _0x1f7ca4(0x17e):Window_Base[_0x1f7ca4(0x192)][_0x1f7ca4(0x157)][_0x1f7ca4(0x18c)](this,$dataWeapons[_0x4d7862['id']],_0x3ba3b7,_0x369120,_0x3eab1b);break;case _0x1f7ca4(0x1f2):Window_Base['prototype']['drawItemName']['call'](this,$dataArmors[_0x4d7862['id']],_0x3ba3b7,_0x369120,_0x3eab1b);break;}},Window_StealSnatch[_0x3f44c9(0x192)][_0x3f44c9(0x108)]=function(_0xeeade7,_0x10c271,_0x357835,_0x36ffb3){const _0x12e189=_0x3f44c9;if(_0xeeade7['stolen']){const _0x22e0fb=TextManager['snatchAlreadyStolen'];_0x10c271+=_0x36ffb3-this[_0x12e189(0x162)](_0x22e0fb)['width'],this[_0x12e189(0x19d)](_0x22e0fb,_0x10c271,_0x357835);}else{if(VisuMZ[_0x12e189(0x18e)][_0x12e189(0x14d)][_0x12e189(0x1e2)][_0x12e189(0x120)]){const _0x6c21c2=VisuMZ[_0x12e189(0x18e)][_0x12e189(0x13a)](this[_0x12e189(0x15f)],this[_0x12e189(0x15d)]);let _0x296f42=_0x6c21c2[_0x12e189(0x155)][_0x12e189(0x13f)]*_0xeeade7['rate'],_0x32d015=_0x6c21c2[_0x12e189(0x170)][_0x12e189(0x13f)];_0x296f42*=_0x6c21c2['rate'][_0xeeade7['type'][_0x12e189(0x118)]()],_0x32d015+=_0x6c21c2['plus'][_0xeeade7[_0x12e189(0x1ee)][_0x12e189(0x118)]()];let _0x527efe=(_0x296f42+_0x32d015)[_0x12e189(0x11d)](0x0,0x1)*0x64;_0x527efe>0x0&&_0x527efe<0x64&&(_0x527efe=_0x527efe[_0x12e189(0x1e5)](0x2)),_0x527efe=String(_0x527efe)+'%',_0x10c271+=_0x36ffb3-this[_0x12e189(0x162)](_0x527efe)['width'],this['drawTextEx'](_0x527efe,_0x10c271,_0x357835);}}},Window_StealSnatch[_0x3f44c9(0x192)][_0x3f44c9(0x106)]=function(_0x4ecaa4){const _0x4f9b55=_0x3f44c9;if(this[_0x4f9b55(0x152)])switch(_0x4ecaa4[_0x4f9b55(0x1ee)][_0x4f9b55(0x180)]()['trim']()){case _0x4f9b55(0x175):this[_0x4f9b55(0x152)][_0x4f9b55(0x1a9)](TextManager[_0x4f9b55(0x12d)]);break;case _0x4f9b55(0x182):this[_0x4f9b55(0x152)][_0x4f9b55(0x119)]($dataItems[_0x4ecaa4['id']]);break;case _0x4f9b55(0x17e):this[_0x4f9b55(0x152)][_0x4f9b55(0x119)]($dataWeapons[_0x4ecaa4['id']]);break;case _0x4f9b55(0x1f2):this[_0x4f9b55(0x152)][_0x4f9b55(0x119)]($dataArmors[_0x4ecaa4['id']]);break;}};function _0x4cf2(){const _0x1cd30e=['_enemy','Scene_Battle_isAnyInputWindowActive','_action','fail','AutoGold','textSizeEx','ParseItemNotetags','JsBonusSteal','296CTstZB','CreateVisualGoldText','Game_Enemy_setup','AlreadyStolen','Game_Enemy_makeDropItems','_cache','onDatabaseLoaded','trim','getWeaponIdWithName','hideSubInputWindows','hide','plus','snatchGoldIcon','FailureFlashColor','weapon','kind','GOLD','SuccessTextColor','Game_Action_applyItemUserEffect','Parse_Notetags_JS','traitObjects','StealableItemSingle','EVAL','getArmorIdWithName','createEnemyWindow','WEAPON','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Rate\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','toUpperCase','setupIconTextPopup','ITEM','FailureFlashDuration','setDetails','JsOnStealNothing','EmptyFlashDuration','CoreEngine','%1_pan','textWidth','gainItem','StealEmpty','call','cancel','StealItems','_weaponIDs','Mechanics','process_VisuMZ_StealItems','prototype','push','dropIndex','applyItemUserEffect','width','processStealItemsFailurePopup','isForOne','adjustForFrontviewUi','checkCacheKey','ShuffleArray','_stealSnatchWindow','drawTextEx','addParam','%1_name','refresh','Game_Enemy_setupEnemyLevels','onStealSnatchOk','iconIndex','armor','EmptyFlashColor','Scene_Battle_onEnemyOk','onStealSnatchCancel','processStealItemsFailureLogWindow','setText','active','StealResist','includes','numberWidth','ARRAYEVAL','255015jxYZOl','makeSuccess','_logWindow','RegExp','processStealItemsSuccessSFX','1455093kpGFUA','GoldHelp','deactivate','setupEnemyLevels','_itemIDs','10551324ltYalO','members','JsStealRateArmor','inputtingAction','Scene_Boot_onDatabaseLoaded','ParseAllNotetags','stealRate','snatchAlreadyStolen','ConvertParams','isForOpponent','StealFail','VisuMZ_4_ExtraEnemyDrops','GoldRate','FailurePopupText','snatchGoldNameFmt','enemyIndex','SuccessFlashDuration','createStealResist','Actor-%1-%2','setHandler','exit','processStealItemsNothingJS','processStealItemsSuccessEquipDebuff','StealAction2','createStealPlus','SuccessItemName','registerSnatchTarget','processStealItemsNothingPopup','JSON','subject','GoldIcon','map','stealPlus','GoldNameFmt','random','index','description','itemWindowRect','VisuMZ_3_EnemyLevels','JsOnStealFail','match','Snatch','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20gold\x20=\x20arguments[3];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','EmptyPopupText','toFixed','getSnatchTarget','format','playSe','State-%1-%2','_scene','stealResist','startStealSnatchSelection','currencyUnit','type','_armorIDs','denominator','StealableItems','ARMOR','bind','\x5cI[%1]','2855553saOwMQ','_enemyWindow','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','types','isEnemy','setupStealableItems','_snatchItemIndex','StealData','Auto','%1_pitch','StealableItemBatch','gold','forceSelect','isSnatchEffect','initialize','Game_Enemy_gold','activate','ParseStealObject','addStealText','12azMQSb','Skill-%1-%2','VisuMZ_1_BattleCore','max','%1_volume','params','processStealItemsFailureJS','createStealRate','makeDeepCopy','Game_BattlerBase_refresh','_snatchEnemyIndex','JsStealRate','processStealItemsFailureSFX','name','_visualDrops','length','setHelpWindowItem','dataId','drawItemNumber','6uHXNCK','4rvzWqY','getItemIdWithName','StealPlus','Sound','JsOnStealSuccess','Popup','enemy','createKeyJS','_numberWidth','6839140ZXFwzJ','processStealItemsFailure','onEnemyOk','constructor','JsOnStealEmpty','toLowerCase','setItem','_stealableItems','StealAction1','ParseSkillNotetags','clamp','create','note','DisplaySuccess','parse','JsStealRateWeapon','ShowMessages','90BUojqI','item','processStealItemsSuccessJS','setup','parameters','dropItems','needsSelection','BattleLog','isAnyInputWindowActive','snatchGoldHelpText','setHelpWindow','none','setupTextPopup','SuccessPopupText','indexOf','ARRAYSTRUCT','stolen','JsStealRateItem','concat','AutoItem','115224YQzPKC','SuccessFlashColor','DetermineStealData','processStealItemsSuccessPopup','ARRAYSTR','Scene_Battle_hideSubInputWindows','getStealableItems','all','Scene_Battle_createEnemyWindow','addWindow','processStealItemsSuccessLogWindow','createStealSnatchWindow','startStealItemsUserEffect','drop','Weapon-%1-%2','_data','createStealRateJS','processStealItemsAttempt','17747851XGxOsF','processStealItemsNothingSFX','JsStealRateGold','Settings','empty','processStealItemsNothing','filter','JsStealResist','_helpWindow','processStealItemsSuccess','GoldRemoval','rate','EquipDebuff','drawItemName','createOnStealJS','makeDropItems','isEnabled','Enemy-%1-%2','process_VisuMZ_StealItems_JS'];_0x4cf2=function(){return _0x1cd30e;};return _0x4cf2();}