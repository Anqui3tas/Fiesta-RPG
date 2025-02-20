//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.58;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.58] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for single column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 * 
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 * 
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 * 
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 * 
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 * 
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
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
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 * 
 * <Conserve: x%>
 * 
 * - Used for: Item
 * - Gives the item a percent chance when used to not consume the item.
 * - Replace 'x' with a number representing the percent chance to successfully
 *   conserve the item.
 * - If an item cannot be consumed, conserve chance will be 100% regardless.
 * 
 * ---
 * 
 * <ID Sort Priority: x>
 * 
 * - Used for: Item, Weapon, and Armor Notetags
 * - Used for Scene_Item, Scene_Equip, Scene_Battle, and Scene_Shop's sell
 *   option (only when selling).
 * - Changes sorting priority by ID for item, weapon, or armor to 'x'. 
 *   - Default priority level is '50'.
 * - Items, weapons, and armors with higher priority values will be sorted
 *   higher up on the list while lower values will be lower on the list.
 * 
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 * 
 * <Party Artifact>
 * <Troop Artifact>
 * 
 * <Stackable Party Artifact>
 * <Stackable Troop Artifact>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped at all. However, by simply being in the
 *   party's inventory, its parameter bonuses and traits will be applied
 *   globally throughout the whole party or troop (depending on the notetag).
 * - Add both notetags to affect both groups.
 * - The normal versions of the notetag is only applied once regardless of the
 *   number of copies are found in the party's inventory.
 * - The stackable versions of the notetag will have the bonuses and traits
 *   stacked multiple times relative to the number of copies found in the
 *   party's inventory.
 * - This item will NOT be added during the setup phase for Battle Tests.
 *   - If you want to add the item, do it manually.
 * 
 * ---
 * 
 * <Equip For Class Only: x>
 * <Equip For Classes Only: x, x, x>
 * <Equip For Class Only: name>
 * <Equip For Classes Only: name, name, name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - This piece of equipment can only be worn by members with 'x' as the main
 *   class. If there are multiple classes listed, at least one of them need to
 *   be the actor's main class.
 * - Replace 'x' with a number representing the ID of the class required.
 * - For the 'name' variant, replace 'name' with the name of the required class
 *   the actor needs to have in order to equip this object.
 * 
 * ---
 * 
 * <Equip Requirements>
 *  requirement
 *  requirement
 *  requirement
 * </Equip Requirements>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Defines a requirement(s) for the actor to meet in order for the equip item
 *   to be equippable.
 * - Failure to meet these requirements will cause the equipment to unequip
 *   automatically.
 *   - Keep in mind that in some cases, this will not happen immediately.
 *     Things like switches will require the actor to meet its cache clear
 *     in order to trigger the automatic unequip.
 *   - Some ways to trigger a cache clear would be to change the actor's HP/MP,
 *     or adding and then removing a state for the actor (preferrably an unused
 *     state that has no real effect).
 * - Replace 'requirement' with one of the settings bellow:
 * - Add multiple 'requirement' lines for more requirements.
 * 
 *   Requirements:
 *
 *   param > x
 *   param >= x
 *   param === x
 *   param <= x
 *   param < x
 *   - Replace 'param' with 'level', 'maxhp', 'maxmp', 'atk', 'def', 'mat',
 *     'mdf', 'agi', or 'luk'.
 *   - This will make the piece of equipment require the actor's base parameter
 *     to be greater than (>), greater than or equal to (>=), equal to (===),
 *     less than or equal to (<=), or less than (<).
 *   - This is NOT the value for the total parameter, only the base parameter.
 *   - The base parameter is calculated by the user's class parameter value and
 *     any bonuses received through permanent stat increases.
 *
 *   learned skill: x
 *   learned skill: name
 *   - This will make the piece of equipment require the actor to have learned
 *     skill 'x'. 
 *   - If 'name' is used, priority will be given to the skill with the highest
 *     ID in the database.
 *   - The actor needs to have LEARNED the skill. This means that if you have
 *     added a skill to the actor's kit through a trait, it will not count.
 *
 *   switch: x
 *   - This will require switch X to be on.
 *   - If it isn't, the piece of equipment cannot be worn.
 *   - Insert multiple of these to add more switches that are are required to
 *     be on.
 * 
 *   ***NOTE 1***
 *   There is no "class: x" for these equip requirements. Instead, use the
 *   <Equip For Class Only: x> notetags.
 * 
 *   ***NOTE 2***
 *   For those wondering where "unique only" is, that does not exist in this
 *   plugin. Instead, use the <Equip Copy Limit: x> notetag listed above.
 * 
 *   Example A:
 * 
 *     <Equip Requirements>
 *     level >= 20
 *     </Equip Requirements>
 * 
 *     - Requires the user to be at least level 20 in order to equip.
 * 
 *   Example B:
 * 
 *     <Equip Requirements>
 *     atk >= 50
 *     def <= 50
 *     </Equip Requirements>
 *     - Requires the user have at least 50 base ATK to equip.
 *     - Requires the user to be under 50 base DEF to equip.
 * 
 * ---
 * 
 * <Added EType: x>
 * <Added ETypes: x, x, x>
 * 
 * - Used for: Armor Notetags
 * - This is for armors only and does NOT work with weapons!
 * - Allows a piece of armor to belong to multiple ETypes. This means a glove
 *   can be equipped as "Armgear" or as an "Accessory" if you so choose.
 * - Replace 'x' with a number representing the ID of the EType you wish to add
 *   to the list of ETypes.
 *   - Insert multiple 'x' entries to add more than one EType ID.
 * 
 * ---
 * 
 * <Cursed>
 * 
 * - Used for: Weapon, Armor Notetags
 * - If this weapon or armor is equipped, it cannot manually be removed by the
 *   player until it is purified.
 * - To remove it, it must be done by event commands, script calls, or through
 *   the Purify-related Plugin Commands provided by this plugin.
 * - Once purified, the weapon or armor will become unequipped unless it has a
 *   purify transformation.
 *   - If the newly transformed weapon/armor is equippable, it will remain in
 *     the actor's equipment slots.
 * - If you are using VisuMZ_2_WeaponSwapSystem, weapons cannot become cursed
 *   in order to allow free weapon swapping. Weaponry will not be cursed
 *   if VisuMZ_2_WeaponSwapSystem is installed.
 * 
 * ---
 * 
 * <Purify Transform: id>
 * <Purify Transform: name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - If this notetag is present on a <Cursed> weapon or armor, then upon the
 *   actor receiving purification, the weapon or armor will transform into a
 *   different item.
 * - Replace 'id' with a number representing the transformed weapon/armor's ID.
 * - Replace 'name' with text representing the transformed weapon/armor's name.
 * - Weapons can only transform into weapons.
 * - Armors can only transform into armors.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 * 
 * '''WARNING!''' If you are trying to calculate a value based off a full
 * parameter value, such as "ATK = user.atk * 0.10", it's going to break and
 * will cause an infinite loop. Use base parameter values instead.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following for skills and items:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'key' with one of the following for weapons and armors:
 *   - 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', or 'LUK'
 *   - For those with VisuMZ_0_CoreEngine:
 *     - 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'
 *     - 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'
 *   - Only relevant if the Draw Style for equipment is "classic" or "double".
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - For clarity regarding "Damage Multiplier" and "HP Recovery"/"HP Damage":
 *   - "Damage Multiplier" refers to the amount determined by damage formulas.
 *   - "HP Recovery"/"HP Damage" refers to the "Recover HP" database effect.
 *   - Likewise, the same will apply to "MP Recovery"/"MP Damage" if the damage
 *     formula type is to deal MP recovery/damage instead.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 *   - When used with weapon or armor database objects, this information is
 *     only relevant if the Draw Style for equipment is "classic" or "double".
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 * 
 * <Status Style: Compare>
 * <Status Style: Classic>
 * <Status Style: Double>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes up the way the shop status window displays data for this database
 *   object in particular.
 *     - Compare - Compares selected equip to equipped gear
 *       - Lists all main party actors
 *       - Displays the parameter differences when equipped
 *       - Calculates custom JS values
 *     - Classic - Shows basic parameters of selected equip
 *       - Involves no actors, only shows the item's stats
 *       - Shows weapon or armor specific parameters
 *       - Does not show custom JS values as those are calculated per actor
 *       - Does not show custom parameters as those are calculated per actor
 *       - Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *         add custom data to classic equip data
 *     - Double - Shows basic parameters in double columns
 *       - Involves no actors, only shows the item's stats
 *       - Shows weapon or armor specific parameters
 *       - Does not show custom JS values as those are calculated per actor
 *       - Does not show custom parameters as those are calculated per actor
 *       - Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *         add custom data to classic equip data
 * 
 * ---
 * 
 * <Custom Status Parameters: name, name, name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Requires VisuMZ_0_CoreEngine!
 *   - This will not work otherwise!
 * - Customize which parameters are displayed for this equipment object's shop
 *   status window.
 *   - This ONLY applies to the shop status window and not other windows.
 * - Replace 'name' with any of the following to display custom parameters:
 *   - 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and 'LUK'
 *   - 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'
 *   - 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'
 *   - Does not work with custom parameters as those are calculated per actor.
 * - Parameters will be displayed in the order inserted into the notetag.
 *
 * ---
 * 
 * <Shop Picture Name: filename>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 * 
 * ---
 * 
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 * 
 * ---
 * 
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 * 
 * ---
 * 
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 * 
 * ---
 * 
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 * 
 * ---
 * 
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 * 
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 * 
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 * 
 * ---
 * 
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 * 
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 * 
 * <Buy Turn On Switch: x>
 * <Buy Turn On Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is bought in the shop scene, turn on the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn on.
 *   - Insert multiple 'x' values to turn on multiple switches upon buying.
 * 
 * ---
 * 
 * <Buy Turn Off Switch: x>
 * <Buy Turn Off Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is bought in the shop scene, turn off the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn off.
 *   - Insert multiple 'x' values to turn off multiple switches upon buying.
 * 
 * ---
 * 
 * <Sell Turn On Switch: x>
 * <Sell Turn On Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is sold in the shop scene, turn on the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn on.
 *   - Insert multiple 'x' values to turn on multiple switches upon selling.
 * 
 * ---
 * 
 * <Sell Turn Off Switch: x>
 * <Sell Turn Off Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is sold in the shop scene, turn off the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn off.
 *   - Insert multiple 'x' values to turn off multiple switches upon selling.
 * 
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Purify Plugin Commands ===
 * 
 * ---
 * 
 * Purify: Target Actor(s)
 * - Purifies target actor(s) of any cursed weapons or armors.
 * - Cannot be used in battle.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 * ---
 * 
 * Purify: Whole Party
 * - Purifies whole party of any cursed weapons or armors.
 * - Cannot be used in battle.
 * 
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 * 
 *     Sort By:
 *     - Sort this category (in Scene_Item and Scene_Shop only) this way.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *   Cursed Equip Popup:
 *   - Text popup appears when an actor equips a cursed weapon/armor.
 *   - Text codes allowed.
 *   - Requires VisuMZ_0_CoreEngine!
 *   - Empty to not use.
 *   -  %1 - Actor, %2 - Equip, %3 - Icon.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 * 
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Data Style:
 *   - How do you wish to display equipment data?
 *     - Compare - Compares selected equip to equipped gear
 *       - Lists all main party actors
 *       - Displays the parameter differences when equipped
 *       - Calculates custom JS values
 *     - Classic - Shows basic parameters of selected equip
 *       - Involves no actors, only shows the item's stats
 *       - Shows weapon or armor specific parameters
 *       - Does not show custom JS values as those are calculated per actor
 *       - Does not show custom parameters as those are calculated per actor
 *       - Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *         add custom data to classic equip data
 *     - Double - Shows basic parameters in double columns
 *       - Involves no actors, only shows the item's stats
 *       - Shows weapon or armor specific parameters
 *       - Does not show custom JS values as those are calculated per actor
 *       - Does not show custom parameters as those are calculated per actor
 *       - Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *         add custom data to classic equip data
 * 
 *     Compare Style:
 * 
 *       Already Equipped:
 *       - Marker used to show an actor cannot equip an item.
 * 
 *       Can't Equip:
 *       - Marker used to show an actor cannot equip an item.
 * 
 *       No Changes:
 *       - Marker used to show no changes have occurred.
 * 
 *       JS: Draw Equip Data:
 *       - Code used to draw the equipment data for the Shop Status Window.
 * 
 *     Classic Style:
 * 
 *       Added Weapon Params:
 *       Added Armor Params:
 *       - Display these parameters when a weapon/armor is selected.
 *       - Requires VisuMZ_0_CoreEngine!
 * 
 *       JS: Draw Equip Data:
 *       - Code used to draw the equipment data for the Shop Status Window.
 * 
 *     Double Style:
 * 
 *       Added Weapon Params:
 *       Added Armor Params:
 *       - Display these parameters when a weapon/armor is selected.
 *       - Requires VisuMZ_0_CoreEngine!
 * 
 *       JS: Draw Equip Data:
 *       - Code used to draw the equipment data for the Shop Status Window.
 * 
 *   Delay MS:
 *   - How many milliseconds (MS) to delay the preview update?
 *   - This is to prevent lag spikes for equips only.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * Version 1.58: February 20, 2025
 * * Bug Fixes!
 * ** Optimize no longer allows player to bypass the following notetags:
 *    <Equip Copy Limit: x>, <Equip Weapon Type Limit: x>, and
 *    <Equip Armor Type Limit: x>. Fix made by Arisu.
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * 
 * Version 1.57: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarity for <Status Info> notetag:
 * *** For clarity regarding "Damage Multiplier" and "HP Recovery"/"HP Damage":
 * **** "Damage Multiplier" refers to the amount determined by damage formulas.
 * **** "HP Recovery"/"HP Damage" refers to the "Recover HP" database effect.
 * **** Likewise, the same will apply to "MP Recovery"/"MP Damage" if the
 *      damage formula type is to deal MP recovery/damage instead.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Status Style: type>
 * **** Changes up the way the shop status window displays data for this
 *      database object in particular.
 * *** <Custom Status Parameters: name, name, name>
 * **** Customize which parameters are displayed for this equipment object's
 *      shop status window.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.56: December 19, 2024
 * * Bug Fixes!
 * ** Fixed a bug where newly added equipment would cause crashes upon
 *    interaction. Fix made by Irina.
 * 
 * Version 1.55: November 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where you can no longer attempt to equip an actor with zero
 *    equip slots and causing a crash. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated <Status Info>
 * *** Used for: Skill, Item, Weapon, Armor Notetags
 * **** Replace 'key' with one of the following for weapons and armors:
 * ***** 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', or 'LUK'
 * ***** For those with VisuMZ_0_CoreEngine:
 * ****** 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'
 * ****** 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'
 * **** Only relevant if the Draw Style for equipment is "classic" or "double".
 * ** Updated <Custom Status Info> notetag:
 * *** Used for: Skill, Item, Weapon, Armor Notetags
 * **** When used with weapon or armor database objects, this information is
 *      only relevant if the Draw Style for equipment is "classic" or "double".
 * * New Feature!
 * ** New Plugin Parameters: 
 * *** Parameters > Shop Status Window > Data Style:
 * **** How do you wish to display equipment data?
 * ***** Compare - Compares selected equip to equipped gear
 * ****** Lists all main party actors
 * ****** Displays the parameter differences when equipped
 * ****** Calculates custom JS values
 * ***** Classic - Shows basic parameters of selected equip
 * ***** Double - Shows basic parameters in double columns
 * ****** Involves no actors, only shows the item's stats
 * ****** Shows weapon or armor specific parameters
 * ****** Does not show custom JS values as those are calculated per actor
 * ****** Does not show custom parameters as those are calculated per actor
 * ****** Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *        add custom data to classic equip data
 * **** Data Style > Classic Style:
 * **** Data Style > Double Style:
 * ***** Added Weapon Params
 * ***** Added Armor Params
 * ****** Display these parameters when a weapon/armor is selected.
 * ****** Requires VisuMZ_0_CoreEngine!
 * 
 * Version 1.54: October 17, 2024
 * * Feature Update!
 * ** If "Modern Controls" is selected while "Remove Equip" and "Optimize" are
 *    gone from the Equip Menu, right click will exit the menu. Feature added
 *    by Arisu.
 * 
 * Version 1.53: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added warning to <JS Parameters>:
 * *** If you are trying to calculate a value based off a full parameter value,
 *     such as "ATK = user.atk * 0.10", it's going to break and will cause an
 *     infinite loop. Use base parameter values instead.
 * * New Features!
 * ** New notetags added by Irina:
 * *** <ID Sort Priority: x>
 * **** Used for Scene_Item, Scene_Equip, Scene_Battle, and Scene_Shop's sell
 *      option (only when selling).
 * **** Changes sorting priority by ID for item, weapon, or armor to 'x'. 
 * **** Default priority level is '50'.
 * **** Items, weapons, and armors with higher priority values will be sorted
 *      higher up on the list while lower values will be lower on the list.
 * 
 * Version 1.52: May 16, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Item Categories > Category List > Category > Sorted By:
 * **** You can now sort specific item categories by ID or Name.
 * **** Only usable within Scene_Item and Scene_Shop.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.51: December 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where if an item is unequipped, it may cause a crash. Fix
 *    made by Arisu.
 * ** Fixed a bug where <Proxy: id> did not properly give the proxy item. Fix
 *    made by Arisu.
 * 
 * Version 1.50: November 16, 2023
 * * Bug Fixes!
 * ** <JS Buy Price> and <JS Sell Price> was not working properly. Fix made
 *    by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Cursed>
 * **** If this weapon or armor is equipped, it cannot manually be removed by
 *      the player until it is purified.
 * **** To remove it, it must be done by event commands, script calls, or
 *     through the Purify-related Plugin Commands provided by this plugin.
 * **** Once purified, the weapon or armor will become unequipped unless it has
 *     a purify transformation.
 * **** If the newly transformed weapon/armor is equippable, it will remain in
 *     the actor's equipment slots.
 * **** If you are using VisuMZ_2_WeaponSwapSystem, weapons cannot become
 *      cursed in order to allow free weapon swapping. Weaponry will not be
 *      cursed if VisuMZ_2_WeaponSwapSystem is installed.
 * *** <Purify Transform: id>
 * *** <Purify Transform: name>
 * **** If this notetag is present on a <Cursed> weapon or armor, then upon the
 *      actor receiving purification, the weapon or armor will transform into a
 *      different item.
 * ** New Plugin Commands added by Arisu:
 * *** Purify: Target Actor(s)
 * **** Purifies target actor(s) of any cursed weapons or armors.
 * *** Purify: Whole Party
 * **** Purifies whole party of any cursed weapons or armors.
 * ** Added "Cursed Equip Popup" to Equip Scene Plugin Parameters.
 * *** Text popup appears when an actor equips a cursed weapon/armor.
 * ** Added "Ally or Enemy" or "Enemy or Ally" scopes to Shop Status Window
 *    Plugin Parameters.
 * *** If unused, will default to "1 Ally" or "1 Enemy" like usual.
 *     Added by Irina.
 * 
 * Version 1.49: October 12, 2023
 * * Bug Fixes!
 * ** Fixed a problem where for weapon types, all weapon types are listed in
 *    the equip menu even when the actor cannot equip them (though they would
 *    be disabled). Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Olivia and sponsored by AndyL:
 * *** <Added EType: x>
 * *** <Added ETypes: x, x, x>
 * **** This is for armors only and does NOT work with weapons!
 * **** Allows a piece of armor to belong to multiple ETypes. This means a
 *      glove can be equipped as "Armgear" or as an "Accessory" if you so
 *      choose.
 * 
 * Version 1.48: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a problem where the help window position of the non-updated layout
 *    would appear in the wrong position. Fix made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized when weapons and armors exceed 2000
 *    in database quantity.
 * 
 * Version 1.47: July 13, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the shop status window to display incorrect
 *    removed buffs and debuffs. Fix made by Olivia.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Changes made to dynamic shop listings in order to update upon listing
 *    changes rather than having to enter and exit the shop again. Update made
 *    by Arisu.
 * * New Features!
 * ** New notetag effects added by Arisu and sponsored by AndyL:
 * *** <Conserve: x%>
 * **** Gives the item a percent chance when used to not consume the item.
 * *** <Buy Turn On Switches: x, x, x>
 * *** <Buy Turn Off Switches: x, x, x>
 * *** <Sell Turn On Switches: x, x, x>
 * *** <Sell Turn Off Switches: x, x, x>
 * **** When buying/selling an item, weapon, or armor with these notetags,
 *      turn on/off switch(es) 'x'.
 * *** New Plugin Parameters added by Arisu:
 * **** Params > Settings > Shop Status Window > Equipment Data > Delay MS:
 * ***** How many milliseconds (MS) to delay the preview update?
 * ***** This is to prevent lag spikes for equips only.
 * 
 * Version 1.46: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a problem where the help and input modes are not adequately
 *    adjusted when not used with the updated layout or without the Options
 *    Core custom UI placement. Fix made by Arisu.
 * 
 * Version 1.45: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause equip slots to not be recognized properly if
 *    the equip slot name ends in a space.
 * 
 * Version 1.44: April 13, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag effects added by Arisu and sponsored by Anon:
 * *** <Equip For Class Only: x>
 * *** <Equip For Classes Only: x, x, x>
 * *** <Equip For Class Only: name>
 * *** <Equip For Classes Only: name, name, name>
 * **** The piece of equipment can only be worn by the listed classes.
 * *** <Equip Requirements> notetag added.
 * **** Define multiple requirements that the actor needs to meet in order for
 *      this equip item to be equippable.
 * **** See help file for more information on the types of requirements that
 *      can be added.
 * 
 * Version 1.43: March 16, 2023
 * * Bug Fixes!
 * ** Artifact armors should now update and refresh the party members' cache
 *    upon acquisition. Fix made by Olivia.
 * 
 * Version 1.42: February 16, 2023
 * * Bug Fixes!
 * ** Proxy items should no longer cause infinite loops if they're made to
 *    reference other proxy items in a circular fashion. Instead, they just
 *    give the exact first found proxy instead of cycling through others.
 *    Fix made by Arisu.
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by Anon:
 * *** Equip Scene > Equip Command > Help Description
 * *** Equip Scene > Optimize Command > Help Description
 * *** Equip Scene > Clear Command > Help Description
 * **** Help description used when these commands are selected.
 * 
 * Version 1.40: October 20, 2022
 * * Feature Update!
 * ** For the shop status window, when comparing equipment of a type where
 *    there are multiple equipment slots (such as accessories), the plugin will
 *    now check for an empty equipment slot first and then make calculations
 *    there. Otherwise, it will use the first available equipment slot of that
 *    type regardless of the equipped item. Update made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.39: September 29, 2022:
 * * Feature Update!
 * ** Changed the default code for the equip scene's status window display to
 *    prevent the face graphic and basic actor stats from going above the
 *    window boundaries if there are too many parameters displayed in the
 *    status window at a time.
 * ** If you already have this plugin installed the changes will not be
 *    reflected unless you do the following:
 * **** BACKUP your game project.
 * **** REMOVE this plugin from the Plugin Manager list.
 * **** REINSTALL this plugin into the Plugin Manager list.
 * **** SAVE the game project.
 * 
 * Version 1.38: March 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New mechanics and notetags added by Olivia and sponsored by Anon:
 * *** <Party Artifact>
 * *** <Troop Artifact>
 * *** <Stackable Party Artifact>
 * *** <Stackable Troop Artifact>
 * **** Armors only! This armor cannot be equipped at all. However, by simply
 *      being in the party's inventory, its parameter bonuses and traits will
 *      be applied globally throughout the whole party or troop (depending on
 *      the notetag). Add both notetags to affect both groups.
 * **** The normal versions of the notetag is only applied once regardless of
 *      the number of copies are found in the party's inventory.
 * **** The stackable versions of the notetag will have the bonuses and traits
 *      stacked multiple times relative to the number of copies found in the
 *      party's inventory.
 * **** This item will NOT be added during the setup phase for Battle Tests.
 * ***** If you want to add the item, do it manually.
 * 
 * Version 1.37: December 23, 2021
 * * Compatibility Update
 * ** Created foundation for proxy items to be used in any applicable system
 *    and extension plugins. Update made by Arisu.
 * 
 * Version 1.36: December 2, 2021
 * * Feature Update!
 * ** For those using custom parameters from the Core Engine and do not have
 *    the parameters all-capitalized, the plugin will automatically do it for
 *    you to prevent errors. Update made by Olivia.
 * 
 * Version 1.35: November 18, 2021
 * * Compatibility Update!
 * ** If this plugin's updated scene is disabled, the Help Window locations for
 *    the Item, Equip, and Shop Scenes should now be at their designated
 *    locations as calculated by the VisuMZ Core Engine instead of the RMMZ
 *    default location. Update made by Irina.
 * 
 * Version 1.34: October 28, 2021
 * * Feature Update
 * ** Added fail safe checks for projects that are using old data for starting
 *    equipment that no longer exist, thus preventing the game from opening.
 *    Update made by Arisu.
 * 
 * Version 1.33: August 6, 2021
 * * Documentation Update!
 * ** Removed "Weapon" and "Armor" from "Used For" for <Status Info>. This was
 *    an unintended piece of documentation.
 * 
 * Version 1.32: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause armor duplication when changing to classes
 *    with unaligned equipment slot types. Fix made by Arisu.
 * 
 * Version 1.31: July 9, 2021
 * * Feature Update!
 * ** Added a failsafe for price manipulation JavaScript to never have prices
 *    drop below 0 if possible. Update made by Arisu.
 * 
 * Version 1.30: July 2, 2021
 * * Documentation Update!
 * ** Added an extra note to the help file for the following:
 *    Plugin Parameters > Item Menu Settings > List Window > Columns
 * *** If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *    
 * 
 * Version 1.29: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Feature Update!
 * ** Phantom data when changing equipment types in the database should no
 *    longer affect actors with cached equip ID's. Update made by Arisu.
 * 
 * Version 1.28: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.27: May 21, 2021
 * * Bug Fixes!
 * ** Using the mouse right click in the Equip Scene while inside of the item
 *    to slot window will no longer exit the Equip Scene. Fix made by Yanfly.
 * 
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 * 
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * 
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Purify
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PurifyActors
 * @text Purify: Target Actor(s)
 * @desc Purifies target actor(s) of any cursed weapons or armors.
 * Cannot be used in battle.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PurifyParty
 * @text Purify: Whole Party
 * @desc Purifies whole party of any cursed weapons or armors.
 * Cannot be used in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Shop
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nif (this.innerHeight > 444) {\\n    this.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\\n} else {\\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 2);\\n}\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    const standardWidth = ImageManager.standardIconWidth || 32;\\n    paramNameWidth += standardWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","CursedTextPopup:json":"\"%1 is cursed by %3%2!\"","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","equipCmdDesc:json":"\"Pick and choose equipment to change.\"","CommandAddOptimize:eval":"true","optimizeCmdDesc:json":"\"Equip the strongest available equipment.\"","CmdIconOptimize:num":"137","CommandAddClear:eval":"true","clearCmdDesc:json":"\"Remove all available equipment.\"","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","EquipDataStyle:str":"compare","EquipDataCompare":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","EquipDataClassic":"","ClassicWeaponParameters:arraystr":"[\"HIT\"]","ClassicArmorParameters:arraystr":"[\"EVA\"]","DrawEquipClassicData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Item Weapon Type or Armor Type\\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\\n\\n// Draw Parameter Values\\nconst params = this.actorParams();\\nfor (const paramId of params) {\\n    if (this.isCustomParameter(paramId)) continue;\\n    this.drawActorParamClassic(paramId, x, y, width);\\n    y += lineHeight;\\n}\\n\\n// Draw Custom Entries\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","EquipDataDouble":"","DoubleWeaponParameters:arraystr":"[\"HIT\",\"CNT\"]","DoubleArmorParameters:arraystr":"[\"EVA\",\"GRD\"]","DrawEquipDoubleData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Item Weapon Type or Armor Type\\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\\n\\n// Draw Parameter Values\\nconst params = this.actorParams();\\nfor (const paramId of params) {\\n    if (this.isCustomParameter(paramId)) continue;\\n    this.drawActorParamClassic(paramId, x, y, hw);\\n    if (x === hw) {\\n        y += lineHeight;\\n        x = 0;\\n    } else {\\n        x = hw;\\n    }\\n}\\n// Realign\\nif (x === hw) {\\n    this.drawItemDarkRect(hw, y, hw, lineHeight);\\n    y += lineHeight;\\n    x = 0;\\n}\\n\\n// Draw Custom Entries\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","EquipDelayMS:num":"240","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","ScopeAllyOrEnemy:str":"Ally/Enemy","ScopeEnemyOrAlly:str":"Enemy/Ally","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes","EquipType":"","WeaponType:str":"Weapon Type","ArmorType:str":"Armor Type","NoEquipTypeResult:str":"-"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 * @param SortBy:str
 * @text Sorted By
 * @type select
 * @option ID
 * @option Name
 * @desc Sort this category (in Scene_Item and Scene_Shop only) this way.
 * @default ID
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nif (this.innerHeight > 444) {\n    this.drawActorClass(this._actor, x, dataY + lineHeight * 2);\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\n} else {\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 2);\n}"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    const standardWidth = ImageManager.standardIconWidth || 32;\n    paramNameWidth += standardWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param CursedTextPopup:json
 * @text Cursed Equip Popup
 * @parent General
 * @type note
 * @desc %1 - Actor, %2 - Equip, %3 - Icon. Text codes allowed.
 * Requires VisuMZ_0_CoreEngine! Empty to not use.
 * @default "%1 is cursed by %3%2!"
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param equipCmdDesc:json
 * @text Help Description
 * @parent CmdIconEquip:num
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Pick and choose equipment to change."
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param optimizeCmdDesc:json
 * @text Help Description
 * @parent CommandAddOptimize:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Equip the strongest available equipment."
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param clearCmdDesc:json
 * @text Help Description
 * @parent CommandAddClear:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Remove all available equipment."
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 * 
 * @param EquipDataStyle:str
 * @text Data Style
 * @parent EquipData
 * @type select
 * @option Compare - Compares selected equip to equipped gear
 * @value compare
 * @option Classic - Shows basic parameters of selected equip
 * @value classic
 * @option Double - Shows basic parameters in double columns
 * @value double
 * @desc How do you wish to display equipment data?
 * @default compare
 *
 * @param EquipDataCompare
 * @text Compare Style
 * @parent EquipDataStyle:str
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipDataCompare
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipDataCompare
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipDataCompare
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipDataCompare
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param EquipDataClassic
 * @text Classic Style
 * @parent EquipDataStyle:str
 *
 * @param ClassicWeaponParameters:arraystr
 * @text Added Weapon Params
 * @parent EquipDataClassic
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when a weapon is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["HIT"]
 *
 * @param ClassicArmorParameters:arraystr
 * @text Added Armor Params
 * @parent EquipDataClassic
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when an armor is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["EVA"]
 *
 * @param DrawEquipClassicData:func
 * @text JS: Draw Equip Data
 * @parent EquipDataClassic
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Item Weapon Type or Armor Type\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\n\n// Draw Parameter Values\nconst params = this.actorParams();\nfor (const paramId of params) {\n    if (this.isCustomParameter(paramId)) continue;\n    this.drawActorParamClassic(paramId, x, y, width);\n    y += lineHeight;\n}\n\n// Draw Custom Entries\ny = this.drawItemCustomEntries(x, y, width);\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param EquipDataDouble
 * @text Double Style
 * @parent EquipDataStyle:str
 *
 * @param DoubleWeaponParameters:arraystr
 * @text Added Weapon Params
 * @parent EquipDataDouble
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when a weapon is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["HIT","CNT"]
 *
 * @param DoubleArmorParameters:arraystr
 * @text Added Armor Params
 * @parent EquipDataDouble
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when an armor is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["EVA","GRD"]
 *
 * @param DrawEquipDoubleData:func
 * @text JS: Draw Equip Data
 * @parent EquipDataDouble
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Item Weapon Type or Armor Type\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\n\n// Draw Parameter Values\nconst params = this.actorParams();\nfor (const paramId of params) {\n    if (this.isCustomParameter(paramId)) continue;\n    this.drawActorParamClassic(paramId, x, y, hw);\n    if (x === hw) {\n        y += lineHeight;\n        x = 0;\n    } else {\n        x = hw;\n    }\n}\n// Realign\nif (x === hw) {\n    this.drawItemDarkRect(hw, y, hw, lineHeight);\n    y += lineHeight;\n    x = 0;\n}\n\n// Draw Custom Entries\ny = this.drawItemCustomEntries(x, y, width);\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param EquipDelayMS:num
 * @text Delay MS
 * @parent EquipData
 * @type number
 * @min 1
 * @max 999
 * @desc How many milliseconds (MS) to delay the preview update?
 * This is to prevent lag spikes for equips only.
 * @default 240
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 * @text Data Settings
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param ScopeAllyOrEnemy:str
 * @text Ally or Enemy
 * @parent BattleCore
 * @desc Vocabulary used for <Target: Ally or Enemy> notetag.
 * @default Ally/Enemy
 *
 * @param ScopeEnemyOrAlly:str
 * @text Enemy or Ally
 * @parent BattleCore
 * @desc Vocabulary used for <Target: Enemy or Ally> notetag.
 * @default Enemy/Ally
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 * @param EquipType
 * @parent Vocabulary
 * @text Equip Type
 *
 * @param WeaponType:str
 * @text Weapon Type
 * @parent EquipType
 * @desc Vocabulary used for this data entry.
 * @default Weapon Type
 *
 * @param ArmorType:str
 * @text Armor Type
 * @parent EquipType
 * @desc Vocabulary used for this data entry.
 * @default Armor Type
 *
 * @param NoEquipTypeResult:str
 * @text No Equip Type
 * @parent EquipType
 * @desc Marker used to show an unlisted equip type.
 * @default -
 *
 */
//=============================================================================

const _0x4a1256=_0xb471;(function(_0x213af2,_0x11f906){const _0x23aa32=_0xb471,_0x1fa9ec=_0x213af2();while(!![]){try{const _0x22d272=parseInt(_0x23aa32(0x35f))/0x1*(-parseInt(_0x23aa32(0x215))/0x2)+-parseInt(_0x23aa32(0x25f))/0x3+-parseInt(_0x23aa32(0x2b7))/0x4+-parseInt(_0x23aa32(0x521))/0x5+parseInt(_0x23aa32(0x5b9))/0x6*(-parseInt(_0x23aa32(0x42a))/0x7)+parseInt(_0x23aa32(0x48e))/0x8+parseInt(_0x23aa32(0x35a))/0x9*(parseInt(_0x23aa32(0x2f7))/0xa);if(_0x22d272===_0x11f906)break;else _0x1fa9ec['push'](_0x1fa9ec['shift']());}catch(_0x4b54f2){_0x1fa9ec['push'](_0x1fa9ec['shift']());}}}(_0x2e71,0xcfa29));var label=_0x4a1256(0x242),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x5a9be1){const _0x49e940=_0x4a1256;return _0x5a9be1[_0x49e940(0x4ed)]&&_0x5a9be1[_0x49e940(0x3cb)][_0x49e940(0x220)]('['+label+']');})[0x0];VisuMZ[label][_0x4a1256(0x4e9)]=VisuMZ[label][_0x4a1256(0x4e9)]||{},VisuMZ[_0x4a1256(0x29a)]=function(_0x29a692,_0x4fbbe8){const _0x5652fb=_0x4a1256;for(const _0x8a92a0 in _0x4fbbe8){if(_0x8a92a0['match'](/(.*):(.*)/i)){const _0x8b4408=String(RegExp['$1']),_0x23851b=String(RegExp['$2'])[_0x5652fb(0x45b)]()[_0x5652fb(0x482)]();let _0x365053,_0x11f5ea,_0x4a274c;switch(_0x23851b){case _0x5652fb(0x49b):_0x365053=_0x4fbbe8[_0x8a92a0]!==''?Number(_0x4fbbe8[_0x8a92a0]):0x0;break;case _0x5652fb(0x435):_0x11f5ea=_0x4fbbe8[_0x8a92a0]!==''?JSON[_0x5652fb(0x5f3)](_0x4fbbe8[_0x8a92a0]):[],_0x365053=_0x11f5ea[_0x5652fb(0x229)](_0x1f9215=>Number(_0x1f9215));break;case _0x5652fb(0x4b4):_0x365053=_0x4fbbe8[_0x8a92a0]!==''?eval(_0x4fbbe8[_0x8a92a0]):null;break;case'ARRAYEVAL':_0x11f5ea=_0x4fbbe8[_0x8a92a0]!==''?JSON['parse'](_0x4fbbe8[_0x8a92a0]):[],_0x365053=_0x11f5ea[_0x5652fb(0x229)](_0x2d9a51=>eval(_0x2d9a51));break;case _0x5652fb(0x45d):_0x365053=_0x4fbbe8[_0x8a92a0]!==''?JSON[_0x5652fb(0x5f3)](_0x4fbbe8[_0x8a92a0]):'';break;case'ARRAYJSON':_0x11f5ea=_0x4fbbe8[_0x8a92a0]!==''?JSON[_0x5652fb(0x5f3)](_0x4fbbe8[_0x8a92a0]):[],_0x365053=_0x11f5ea['map'](_0x4f047b=>JSON[_0x5652fb(0x5f3)](_0x4f047b));break;case _0x5652fb(0x338):_0x365053=_0x4fbbe8[_0x8a92a0]!==''?new Function(JSON[_0x5652fb(0x5f3)](_0x4fbbe8[_0x8a92a0])):new Function(_0x5652fb(0x5bd));break;case _0x5652fb(0x1d6):_0x11f5ea=_0x4fbbe8[_0x8a92a0]!==''?JSON[_0x5652fb(0x5f3)](_0x4fbbe8[_0x8a92a0]):[],_0x365053=_0x11f5ea[_0x5652fb(0x229)](_0xa79fd4=>new Function(JSON[_0x5652fb(0x5f3)](_0xa79fd4)));break;case _0x5652fb(0x404):_0x365053=_0x4fbbe8[_0x8a92a0]!==''?String(_0x4fbbe8[_0x8a92a0]):'';break;case _0x5652fb(0x2f4):_0x11f5ea=_0x4fbbe8[_0x8a92a0]!==''?JSON[_0x5652fb(0x5f3)](_0x4fbbe8[_0x8a92a0]):[],_0x365053=_0x11f5ea[_0x5652fb(0x229)](_0x13875f=>String(_0x13875f));break;case'STRUCT':_0x4a274c=_0x4fbbe8[_0x8a92a0]!==''?JSON[_0x5652fb(0x5f3)](_0x4fbbe8[_0x8a92a0]):{},_0x29a692[_0x8b4408]={},VisuMZ[_0x5652fb(0x29a)](_0x29a692[_0x8b4408],_0x4a274c);continue;case _0x5652fb(0x2b8):_0x11f5ea=_0x4fbbe8[_0x8a92a0]!==''?JSON['parse'](_0x4fbbe8[_0x8a92a0]):[],_0x365053=_0x11f5ea[_0x5652fb(0x229)](_0x34e1b3=>VisuMZ['ConvertParams']({},JSON[_0x5652fb(0x5f3)](_0x34e1b3)));break;default:continue;}_0x29a692[_0x8b4408]=_0x365053;}}return _0x29a692;},(_0x1db55c=>{const _0x1eb062=_0x4a1256,_0x56cbc5=_0x1db55c['name'];for(const _0x5903be of dependencies){if(!Imported[_0x5903be]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x1eb062(0x434)](_0x56cbc5,_0x5903be)),SceneManager[_0x1eb062(0x4df)]();break;}}const _0x7bfeb0=_0x1db55c[_0x1eb062(0x3cb)];if(_0x7bfeb0[_0x1eb062(0x4cd)](/\[Version[ ](.*?)\]/i)){const _0x2d9627=Number(RegExp['$1']);_0x2d9627!==VisuMZ[label][_0x1eb062(0x401)]&&(alert(_0x1eb062(0x2a3)[_0x1eb062(0x434)](_0x56cbc5,_0x2d9627)),SceneManager[_0x1eb062(0x4df)]());}if(_0x7bfeb0[_0x1eb062(0x4cd)](/\[Tier[ ](\d+)\]/i)){const _0x43cd5f=Number(RegExp['$1']);_0x43cd5f<tier?(alert(_0x1eb062(0x30d)[_0x1eb062(0x434)](_0x56cbc5,_0x43cd5f,tier)),SceneManager[_0x1eb062(0x4df)]()):tier=Math[_0x1eb062(0x221)](_0x43cd5f,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x1db55c[_0x1eb062(0x343)]);})(pluginData),PluginManager[_0x4a1256(0x24a)](pluginData[_0x4a1256(0x2ba)],_0x4a1256(0x5bb),_0x42488c=>{const _0x5c3830=_0x4a1256;VisuMZ[_0x5c3830(0x29a)](_0x42488c,_0x42488c);const _0x36ad34=_0x42488c[_0x5c3830(0x58d)][_0x5c3830(0x229)](_0x145f68=>$gameActors[_0x5c3830(0x238)](_0x145f68)),_0x1897ed=_0x42488c['Slots'][_0x5c3830(0x229)](_0x337f43=>$dataSystem[_0x5c3830(0x391)][_0x5c3830(0x441)](_0x337f43[_0x5c3830(0x482)]()));for(const _0x2158c1 of _0x36ad34){if(!_0x2158c1)continue;_0x2158c1[_0x5c3830(0x5db)](_0x1897ed);}}),PluginManager['registerCommand'](pluginData[_0x4a1256(0x2ba)],_0x4a1256(0x4f7),_0x92e879=>{const _0x5c8769=_0x4a1256;VisuMZ[_0x5c8769(0x29a)](_0x92e879,_0x92e879);const _0x925dc8=_0x92e879[_0x5c8769(0x58d)][_0x5c8769(0x229)](_0x5a339b=>$gameActors[_0x5c8769(0x238)](_0x5a339b));for(const _0x23d82a of _0x925dc8){if(!_0x23d82a)continue;_0x23d82a[_0x5c8769(0x23c)]();}}),PluginManager[_0x4a1256(0x24a)](pluginData['name'],_0x4a1256(0x44f),_0x432dd7=>{const _0x4be4f9=_0x4a1256;if($gameParty[_0x4be4f9(0x287)]())return;VisuMZ[_0x4be4f9(0x29a)](_0x432dd7,_0x432dd7);const _0xb46e18=_0x432dd7['Actors'][_0x4be4f9(0x229)](_0x21d7f4=>$gameActors['actor'](_0x21d7f4));for(const _0x6ebb52 of _0xb46e18){if(!_0x6ebb52)continue;_0x6ebb52['purifyCursedEquips']();}}),PluginManager[_0x4a1256(0x24a)](pluginData[_0x4a1256(0x2ba)],_0x4a1256(0x4d3),_0xa1101b=>{const _0x448e0d=_0x4a1256;if($gameParty[_0x448e0d(0x287)]())return;$gameParty[_0x448e0d(0x2d5)]();}),PluginManager[_0x4a1256(0x24a)](pluginData[_0x4a1256(0x2ba)],'BatchShop',_0x2f731=>{const _0x2e6828=_0x4a1256;VisuMZ['ConvertParams'](_0x2f731,_0x2f731);const _0x369075=[],_0x1aea0a=_0x2f731[_0x2e6828(0x290)]['map'](_0x47c494=>_0x47c494['toUpperCase']()[_0x2e6828(0x482)]()),_0x38970c=_0x2f731[_0x2e6828(0x301)][_0x2e6828(0x229)](_0x383550=>_0x383550['toUpperCase']()[_0x2e6828(0x482)]()),_0x2e941f=_0x2f731[_0x2e6828(0x1f1)]>=_0x2f731[_0x2e6828(0x412)]?_0x2f731[_0x2e6828(0x412)]:_0x2f731['Step1End'],_0xa163b=_0x2f731[_0x2e6828(0x1f1)]>=_0x2f731[_0x2e6828(0x412)]?_0x2f731['Step1End']:_0x2f731[_0x2e6828(0x412)],_0x2b8ef4=Array(_0xa163b-_0x2e941f+0x1)['fill']()[_0x2e6828(0x229)]((_0x162b9e,_0x2c99cc)=>_0x2e941f+_0x2c99cc);for(const _0x445f75 of _0x2b8ef4){const _0x24ff99=$dataItems[_0x445f75];if(!_0x24ff99)continue;if(!VisuMZ[_0x2e6828(0x242)][_0x2e6828(0x57f)](_0x24ff99,_0x1aea0a,_0x38970c))continue;_0x369075['push']([0x0,_0x445f75,0x0,_0x24ff99[_0x2e6828(0x1ee)]]);}const _0x312f32=_0x2f731[_0x2e6828(0x209)]>=_0x2f731[_0x2e6828(0x2a8)]?_0x2f731[_0x2e6828(0x2a8)]:_0x2f731[_0x2e6828(0x209)],_0xf352fa=_0x2f731[_0x2e6828(0x209)]>=_0x2f731[_0x2e6828(0x2a8)]?_0x2f731['Step2End']:_0x2f731['Step2Start'],_0x3ec358=Array(_0xf352fa-_0x312f32+0x1)[_0x2e6828(0x2c7)]()['map']((_0x6b47e4,_0x570ae3)=>_0x312f32+_0x570ae3);for(const _0x4b205e of _0x3ec358){const _0x4315c1=$dataWeapons[_0x4b205e];if(!_0x4315c1)continue;if(!VisuMZ[_0x2e6828(0x242)][_0x2e6828(0x57f)](_0x4315c1,_0x1aea0a,_0x38970c))continue;_0x369075[_0x2e6828(0x35d)]([0x1,_0x4b205e,0x0,_0x4315c1[_0x2e6828(0x1ee)]]);}const _0x4f1c6e=_0x2f731['Step3End']>=_0x2f731['Step3Start']?_0x2f731[_0x2e6828(0x2e6)]:_0x2f731['Step3End'],_0x2ca297=_0x2f731[_0x2e6828(0x575)]>=_0x2f731['Step3Start']?_0x2f731[_0x2e6828(0x575)]:_0x2f731['Step3Start'],_0x2b87b6=Array(_0x2ca297-_0x4f1c6e+0x1)[_0x2e6828(0x2c7)]()[_0x2e6828(0x229)]((_0x386ca1,_0xdee660)=>_0x4f1c6e+_0xdee660);for(const _0x618762 of _0x2b87b6){const _0x3522ed=$dataArmors[_0x618762];if(!_0x3522ed)continue;if(!VisuMZ[_0x2e6828(0x242)][_0x2e6828(0x57f)](_0x3522ed,_0x1aea0a,_0x38970c))continue;_0x369075['push']([0x2,_0x618762,0x0,_0x3522ed[_0x2e6828(0x1ee)]]);}SceneManager['push'](Scene_Shop),SceneManager['prepareNextScene'](_0x369075,_0x2f731[_0x2e6828(0x46f)]);}),VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x57f)]=function(_0x500aa0,_0x5c9f2c,_0x333e57){const _0x5c90fd=_0x4a1256;if(_0x500aa0['name'][_0x5c90fd(0x482)]()==='')return![];if(_0x500aa0['name']['match'](/-----/i))return![];const _0x242d83=_0x500aa0[_0x5c90fd(0x26b)];if(_0x5c9f2c[_0x5c90fd(0x45a)]>0x0)for(const _0x605438 of _0x5c9f2c){if(!_0x605438)continue;if(_0x242d83[_0x5c90fd(0x220)](_0x605438))return![];}if(_0x333e57[_0x5c90fd(0x45a)]>0x0){for(const _0x3bf5d1 of _0x333e57){if(!_0x3bf5d1)continue;if(_0x242d83[_0x5c90fd(0x220)](_0x3bf5d1))return!![];}return![];}return!![];},VisuMZ[_0x4a1256(0x242)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x4a1256(0x3ab)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x2243a6=_0x4a1256;this[_0x2243a6(0x2c0)](),VisuMZ['ItemsEquipsCore'][_0x2243a6(0x3bd)]['call'](this),this[_0x2243a6(0x56c)](),VisuMZ[_0x2243a6(0x242)]['SetupProxyItemGroups'](),VisuMZ[_0x2243a6(0x242)][_0x2243a6(0x4b7)]();},Scene_Boot['prototype'][_0x4a1256(0x2c0)]=function(){const _0x571a1d=_0x4a1256;VisuMZ[_0x571a1d(0x242)][_0x571a1d(0x3d7)]={},VisuMZ['ItemsEquipsCore'][_0x571a1d(0x3d7)][_0x571a1d(0x1c1)]=[],VisuMZ['ItemsEquipsCore'][_0x571a1d(0x3d7)][_0x571a1d(0x23b)]=[];const _0x1f813b=['MaxHP','MaxMP','ATK',_0x571a1d(0x4a5),_0x571a1d(0x52d),'MDF',_0x571a1d(0x3cf),_0x571a1d(0x3ec)];for(const _0x50d83e of _0x1f813b){const _0xaff00d=_0x571a1d(0x41e)[_0x571a1d(0x434)](_0x50d83e);VisuMZ[_0x571a1d(0x242)][_0x571a1d(0x3d7)][_0x571a1d(0x1c1)][_0x571a1d(0x35d)](new RegExp(_0xaff00d,'i'));const _0x5b4969='\x5cb%1\x5cb'[_0x571a1d(0x434)](_0x50d83e);VisuMZ[_0x571a1d(0x242)][_0x571a1d(0x3d7)][_0x571a1d(0x23b)][_0x571a1d(0x35d)](new RegExp(_0x5b4969,'g'));}},Scene_Boot[_0x4a1256(0x5b7)][_0x4a1256(0x56c)]=function(){const _0x2706ce=_0x4a1256;if(VisuMZ[_0x2706ce(0x27a)])return;this[_0x2706ce(0x4cc)]();const _0xbe8bf2=[$dataItems,$dataWeapons,$dataArmors];for(const _0x19a1d9 of _0xbe8bf2){for(const _0x456810 of _0x19a1d9){if(!_0x456810)continue;VisuMZ['ItemsEquipsCore'][_0x2706ce(0x5a0)](_0x456810,_0x19a1d9),VisuMZ[_0x2706ce(0x242)][_0x2706ce(0x46b)](_0x456810,_0x19a1d9),VisuMZ[_0x2706ce(0x242)][_0x2706ce(0x1cb)](_0x456810,_0x19a1d9),VisuMZ[_0x2706ce(0x242)]['Parse_Notetags_ParamJS'](_0x456810,_0x19a1d9),VisuMZ[_0x2706ce(0x242)]['Parse_Notetags_EnableJS'](_0x456810,_0x19a1d9);}}},Scene_Boot[_0x4a1256(0x5b7)][_0x4a1256(0x4cc)]=function(){const _0x2092c2=_0x4a1256;for(const _0x1ff225 of $dataClasses){if(!_0x1ff225)continue;VisuMZ[_0x2092c2(0x242)][_0x2092c2(0x1fd)](_0x1ff225);}},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x3ed)]=VisuMZ[_0x4a1256(0x3ed)],VisuMZ[_0x4a1256(0x3ed)]=function(_0x494cea){const _0x4ab674=_0x4a1256;VisuMZ[_0x4ab674(0x242)]['ParseClassNotetags']['call'](this,_0x494cea),VisuMZ[_0x4ab674(0x242)][_0x4ab674(0x1fd)](_0x494cea);},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x296)]=VisuMZ[_0x4a1256(0x296)],VisuMZ[_0x4a1256(0x296)]=function(_0x3896a5){const _0x4cc338=_0x4a1256;VisuMZ[_0x4cc338(0x242)][_0x4cc338(0x296)][_0x4cc338(0x4f2)](this,_0x3896a5),VisuMZ[_0x4cc338(0x242)][_0x4cc338(0x304)](_0x3896a5,$dataItems);},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x556)]=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x4a1256(0x556)]=function(_0x112f8c){const _0x1a7b7d=_0x4a1256;VisuMZ[_0x1a7b7d(0x242)][_0x1a7b7d(0x556)]['call'](this,_0x112f8c),VisuMZ[_0x1a7b7d(0x242)][_0x1a7b7d(0x304)](_0x112f8c,$dataWeapons);},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x569)]=VisuMZ[_0x4a1256(0x569)],VisuMZ[_0x4a1256(0x569)]=function(_0x148e09){const _0x2b70df=_0x4a1256;VisuMZ[_0x2b70df(0x242)]['ParseArmorNotetags'][_0x2b70df(0x4f2)](this,_0x148e09),VisuMZ[_0x2b70df(0x242)][_0x2b70df(0x304)](_0x148e09,$dataArmors);},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x1fd)]=function(_0x55a797){const _0x28eec0=_0x4a1256;_0x55a797[_0x28eec0(0x3bb)]=[];const _0x346af1=$dataSystem[_0x28eec0(0x391)]['map'](_0x5d8ae0=>_0x5d8ae0?_0x5d8ae0[_0x28eec0(0x482)]():'');if(!BattleManager[_0x28eec0(0x4b2)]()&&_0x55a797['note'][_0x28eec0(0x4cd)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x2e8b2c=String(RegExp['$1'])[_0x28eec0(0x1ff)](/[\r\n]+/);for(const _0x3d7f9a of _0x2e8b2c){const _0x4a0b38=_0x346af1[_0x28eec0(0x441)](_0x3d7f9a[_0x28eec0(0x482)]());if(_0x4a0b38>0x0)_0x55a797[_0x28eec0(0x3bb)][_0x28eec0(0x35d)](_0x4a0b38);}}else for(const _0x356760 of _0x346af1){const _0x30a2af=_0x346af1['indexOf'](_0x356760[_0x28eec0(0x482)]());if(_0x30a2af>0x0)_0x55a797[_0x28eec0(0x3bb)][_0x28eec0(0x35d)](_0x30a2af);}},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x304)]=function(_0x350b7e,_0x4c57b9){const _0x1a8f7e=_0x4a1256;VisuMZ['ItemsEquipsCore'][_0x1a8f7e(0x5a0)](_0x350b7e,_0x4c57b9),VisuMZ['ItemsEquipsCore'][_0x1a8f7e(0x46b)](_0x350b7e,_0x4c57b9),VisuMZ[_0x1a8f7e(0x242)][_0x1a8f7e(0x1cb)](_0x350b7e,_0x4c57b9),VisuMZ[_0x1a8f7e(0x242)][_0x1a8f7e(0x422)](_0x350b7e,_0x4c57b9),VisuMZ['ItemsEquipsCore'][_0x1a8f7e(0x3d4)](_0x350b7e,_0x4c57b9);},VisuMZ[_0x4a1256(0x242)]['Parse_Notetags_Category']=function(_0x28a074,_0x383d59){const _0x2dd3fb=_0x4a1256;_0x28a074['categories']=[];const _0x2299c9=_0x28a074[_0x2dd3fb(0x4ff)]||'',_0x542189=_0x2299c9[_0x2dd3fb(0x4cd)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x542189)for(const _0x46099a of _0x542189){_0x46099a[_0x2dd3fb(0x4cd)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x1d1084=String(RegExp['$1'])['toUpperCase']()[_0x2dd3fb(0x482)]()[_0x2dd3fb(0x1ff)](',');for(const _0x72ff09 of _0x1d1084){_0x28a074[_0x2dd3fb(0x26b)][_0x2dd3fb(0x35d)](_0x72ff09['trim']());}}if(_0x2299c9[_0x2dd3fb(0x4cd)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x3ee512=RegExp['$1'][_0x2dd3fb(0x1ff)](/[\r\n]+/);for(const _0x38dc13 of _0x3ee512){_0x28a074['categories']['push'](_0x38dc13['toUpperCase']()[_0x2dd3fb(0x482)]());}}},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x4e6)]=function(_0x3b8616,_0xcf5708){const _0x604abe=_0x4a1256;if(!_0x3b8616)return;_0x3b8616[_0x604abe(0x1e8)]=0x32;const _0x374d42=_0x3b8616[_0x604abe(0x4ff)]||'';_0x374d42[_0x604abe(0x4cd)](/<(?:|ID )SORT(?:|ING)[ ]PRIORITY:[ ](\d+)>/i)&&(_0x3b8616[_0x604abe(0x1e8)]=Number(RegExp['$1']));},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x46b)]=function(_0x3842f9,_0x36da92){const _0x2bc217=_0x4a1256;_0x3842f9[_0x2bc217(0x4ff)][_0x2bc217(0x4cd)](/<PRICE:[ ](\d+)>/i)&&(_0x3842f9[_0x2bc217(0x1ee)]=Number(RegExp['$1']));},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x1cb)]=function(_0x3884fa,_0x4992b8){const _0x152270=_0x4a1256;if(_0x4992b8===$dataItems)return;for(let _0x192588=0x0;_0x192588<0x8;_0x192588++){const _0x109382=VisuMZ['ItemsEquipsCore'][_0x152270(0x3d7)][_0x152270(0x1c1)][_0x192588];_0x3884fa[_0x152270(0x4ff)][_0x152270(0x4cd)](_0x109382)&&(_0x3884fa['params'][_0x192588]=parseInt(RegExp['$1']));}},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x2d3)]={},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x422)]=function(_0x53abc9,_0x16739d){const _0x2019ac=_0x4a1256;if(_0x16739d===$dataItems)return;if(_0x53abc9[_0x2019ac(0x4ff)][_0x2019ac(0x4cd)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x4f6304=String(RegExp['$1']),_0x3b76b3=(_0x16739d===$dataWeapons?_0x2019ac(0x56a):'A%1')[_0x2019ac(0x434)](_0x53abc9['id']),_0x2e7ae0='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'[_0x2019ac(0x434)](_0x4f6304);for(let _0x455e14=0x0;_0x455e14<0x8;_0x455e14++){if(_0x4f6304[_0x2019ac(0x4cd)](VisuMZ['ItemsEquipsCore'][_0x2019ac(0x3d7)][_0x2019ac(0x23b)][_0x455e14])){const _0x22949a=_0x2019ac(0x300)[_0x2019ac(0x434)](_0x3b76b3,_0x455e14);VisuMZ[_0x2019ac(0x242)][_0x2019ac(0x2d3)][_0x22949a]=new Function(_0x2019ac(0x3a5),_0x2019ac(0x264),_0x2e7ae0);}}}},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x59f)]={},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x3d4)]=function(_0x2d79c6,_0x3fc305){const _0x2d8fe2=_0x4a1256;if(_0x3fc305!==$dataItems)return;if(_0x2d79c6[_0x2d8fe2(0x4ff)][_0x2d8fe2(0x4cd)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x5f346b=String(RegExp['$1']),_0x5bcd7f=_0x2d8fe2(0x420)[_0x2d8fe2(0x434)](_0x5f346b);VisuMZ[_0x2d8fe2(0x242)][_0x2d8fe2(0x59f)][_0x2d79c6['id']]=new Function(_0x2d8fe2(0x3a5),_0x5bcd7f);}},DataManager[_0x4a1256(0x2cf)]=function(_0x5bc83b){const _0xdeebef=_0x4a1256;return this[_0xdeebef(0x515)](_0x5bc83b)&&_0x5bc83b[_0xdeebef(0x505)]===0x2;},DataManager['maxItemAmount']=function(_0xbae97){const _0x459c9a=_0x4a1256;if(!_0xbae97)return 0x63;else return _0xbae97[_0x459c9a(0x4ff)][_0x459c9a(0x4cd)](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this['defaultItemMax'](_0xbae97);},DataManager[_0x4a1256(0x3c4)]=function(_0x42f286){const _0x5ab284=_0x4a1256;if(this[_0x5ab284(0x515)](_0x42f286))return VisuMZ[_0x5ab284(0x242)][_0x5ab284(0x4e9)][_0x5ab284(0x408)][_0x5ab284(0x337)];else{if(this['isWeapon'](_0x42f286))return VisuMZ[_0x5ab284(0x242)][_0x5ab284(0x4e9)][_0x5ab284(0x408)][_0x5ab284(0x5f1)];else{if(this[_0x5ab284(0x560)](_0x42f286))return VisuMZ[_0x5ab284(0x242)][_0x5ab284(0x4e9)][_0x5ab284(0x408)][_0x5ab284(0x443)];}}},DataManager[_0x4a1256(0x36f)]=function(_0x1df86b){const _0x2287e1=_0x4a1256;_0x1df86b=_0x1df86b[_0x2287e1(0x45b)]()['trim'](),this[_0x2287e1(0x2c9)]=this['_classIDs']||{};if(this[_0x2287e1(0x2c9)][_0x1df86b])return this[_0x2287e1(0x2c9)][_0x1df86b];for(const _0xb6f927 of $dataClasses){if(!_0xb6f927)continue;let _0x144760=_0xb6f927[_0x2287e1(0x2ba)];_0x144760=_0x144760[_0x2287e1(0x282)](/\x1I\[(\d+)\]/gi,''),_0x144760=_0x144760[_0x2287e1(0x282)](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0x144760[_0x2287e1(0x45b)]()[_0x2287e1(0x482)]()]=_0xb6f927['id'];}return this[_0x2287e1(0x2c9)][_0x1df86b]||0x0;},DataManager[_0x4a1256(0x210)]=function(_0x43a833){const _0x14ba60=_0x4a1256;_0x43a833=_0x43a833[_0x14ba60(0x45b)]()[_0x14ba60(0x482)](),this[_0x14ba60(0x5b6)]=this['_skillIDs']||{};if(this[_0x14ba60(0x5b6)][_0x43a833])return this['_skillIDs'][_0x43a833];for(const _0x498ff8 of $dataSkills){if(!_0x498ff8)continue;this['_skillIDs'][_0x498ff8[_0x14ba60(0x2ba)]['toUpperCase']()[_0x14ba60(0x482)]()]=_0x498ff8['id'];}return this[_0x14ba60(0x5b6)][_0x43a833]||0x0;},DataManager[_0x4a1256(0x445)]=function(_0x39017f){const _0x520569=_0x4a1256;_0x39017f=_0x39017f[_0x520569(0x45b)]()[_0x520569(0x482)](),this['_itemIDs']=this[_0x520569(0x3e7)]||{};if(this[_0x520569(0x3e7)][_0x39017f])return this['_itemIDs'][_0x39017f];for(const _0x59a630 of $dataItems){if(!_0x59a630)continue;this[_0x520569(0x3e7)][_0x59a630[_0x520569(0x2ba)]['toUpperCase']()[_0x520569(0x482)]()]=_0x59a630['id'];}return this[_0x520569(0x3e7)][_0x39017f]||0x0;},DataManager['getWeaponIdWithName']=function(_0x496484){const _0x23e079=_0x4a1256;_0x496484=_0x496484[_0x23e079(0x45b)]()[_0x23e079(0x482)](),this[_0x23e079(0x39b)]=this[_0x23e079(0x39b)]||{};if(this[_0x23e079(0x39b)][_0x496484])return this['_weaponIDs'][_0x496484];for(const _0x43772d of $dataWeapons){if(!_0x43772d)continue;this[_0x23e079(0x39b)][_0x43772d[_0x23e079(0x2ba)]['toUpperCase']()[_0x23e079(0x482)]()]=_0x43772d['id'];}return this[_0x23e079(0x39b)][_0x496484]||0x0;},DataManager[_0x4a1256(0x539)]=function(_0x4dcdd5){const _0x487042=_0x4a1256;_0x4dcdd5=_0x4dcdd5['toUpperCase']()[_0x487042(0x482)](),this[_0x487042(0x50b)]=this[_0x487042(0x50b)]||{};if(this[_0x487042(0x50b)][_0x4dcdd5])return this[_0x487042(0x50b)][_0x4dcdd5];for(const _0x4a541f of $dataArmors){if(!_0x4a541f)continue;this[_0x487042(0x50b)][_0x4a541f[_0x487042(0x2ba)][_0x487042(0x45b)]()[_0x487042(0x482)]()]=_0x4a541f['id'];}return this[_0x487042(0x50b)][_0x4dcdd5]||0x0;},DataManager['getEtypeIdWithName']=function(_0x187a21){const _0x379972=_0x4a1256;_0x187a21=_0x187a21[_0x379972(0x45b)]()[_0x379972(0x482)](),this['_etypeIDs']=this[_0x379972(0x342)]||{};if(this[_0x379972(0x342)][_0x187a21])return this[_0x379972(0x342)][_0x187a21];for(const _0x355d45 of $dataSystem[_0x379972(0x391)]){this['_etypeIDs'][_0x355d45[_0x379972(0x45b)]()[_0x379972(0x482)]()]=$dataSystem[_0x379972(0x391)][_0x379972(0x441)](_0x355d45);}return this[_0x379972(0x342)][_0x187a21]||0x0;},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x1b6)]=function(){const _0x2d0557=_0x4a1256;VisuMZ[_0x2d0557(0x242)][_0x2d0557(0x4ea)]($dataItems),VisuMZ[_0x2d0557(0x242)][_0x2d0557(0x4ea)]($dataWeapons),VisuMZ[_0x2d0557(0x242)][_0x2d0557(0x4ea)]($dataArmors);},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x4ea)]=function(_0x3a3ed5){const _0x3f9d5b=_0x4a1256;for(const _0x34274a of _0x3a3ed5){if(!_0x34274a)continue;if(!DataManager[_0x3f9d5b(0x5ea)](_0x34274a))continue;const _0x11128b=DataManager[_0x3f9d5b(0x533)](_0x34274a),_0x4496ae=['name',_0x3f9d5b(0x1f3),'description'];for(const _0x44777c of _0x4496ae){_0x34274a[_0x44777c]=_0x11128b[_0x44777c];}}},DataManager[_0x4a1256(0x5ea)]=function(_0x4ec5b8){const _0x14ccb3=_0x4a1256;if(!_0x4ec5b8)return![];if(!_0x4ec5b8[_0x14ccb3(0x4ff)])return![];return _0x4ec5b8&&_0x4ec5b8[_0x14ccb3(0x4ff)][_0x14ccb3(0x4cd)](/<PROXY:[ ](.*)>/i);},DataManager[_0x4a1256(0x533)]=function(_0x3918d9){const _0x2fa213=_0x4a1256;return this[_0x2fa213(0x5ea)](_0x3918d9)?this[_0x2fa213(0x254)](_0x3918d9)||_0x3918d9:_0x3918d9;},DataManager['switchProxyItem']=function(_0x4c24eb){const _0x5a2688=_0x4a1256;_0x4c24eb['note'][_0x5a2688(0x4cd)](/<PROXY:[ ](.*)>/i);const _0x499115=RegExp['$1']['trim'](),_0x4c514c=/^\d+$/[_0x5a2688(0x24b)](_0x499115);if(this[_0x5a2688(0x515)](_0x4c24eb)){const _0x537ea3=_0x4c514c?Number(_0x499115):DataManager[_0x5a2688(0x445)](_0x499115);return $dataItems[_0x537ea3]||_0x4c24eb;}else{if(this[_0x5a2688(0x231)](_0x4c24eb)){const _0x251dfc=_0x4c514c?Number(_0x499115):DataManager[_0x5a2688(0x5fc)](_0x499115);return $dataWeapons[_0x251dfc]||_0x4c24eb;}else{if(this[_0x5a2688(0x560)](_0x4c24eb)){const _0x226b72=_0x4c514c?Number(_0x499115):DataManager[_0x5a2688(0x539)](_0x499115);return $dataArmors[_0x226b72]||_0x4c24eb;}}}return _0x4c24eb;},VisuMZ['ItemsEquipsCore']['Window_ItemList_item']=Window_ItemList[_0x4a1256(0x5b7)][_0x4a1256(0x3a5)],Window_ItemList[_0x4a1256(0x5b7)][_0x4a1256(0x3a5)]=function(){const _0x116277=_0x4a1256;if($gameTemp['_bypassProxy'])return VisuMZ['ItemsEquipsCore'][_0x116277(0x432)][_0x116277(0x4f2)](this);return DataManager[_0x116277(0x533)](VisuMZ[_0x116277(0x242)][_0x116277(0x432)][_0x116277(0x4f2)](this));},Window_ItemList['prototype']['proxyItem']=function(){const _0x235c3f=_0x4a1256;return VisuMZ['ItemsEquipsCore'][_0x235c3f(0x432)][_0x235c3f(0x4f2)](this);},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x522)]=Window_ShopBuy[_0x4a1256(0x5b7)]['item'],Window_ShopBuy[_0x4a1256(0x5b7)][_0x4a1256(0x3a5)]=function(){const _0x7790a1=_0x4a1256;if($gameTemp[_0x7790a1(0x4c0)])return VisuMZ[_0x7790a1(0x242)]['Window_ShopBuy_item'][_0x7790a1(0x4f2)](this);return DataManager['getProxyItem'](VisuMZ[_0x7790a1(0x242)][_0x7790a1(0x522)][_0x7790a1(0x4f2)](this));},Window_ShopBuy[_0x4a1256(0x5b7)]['proxyItem']=function(){const _0x22052c=_0x4a1256;return VisuMZ[_0x22052c(0x242)][_0x22052c(0x522)][_0x22052c(0x4f2)](this);},VisuMZ[_0x4a1256(0x242)]['Game_Item_setObject']=Game_Item[_0x4a1256(0x5b7)][_0x4a1256(0x2a5)],Game_Item['prototype'][_0x4a1256(0x2a5)]=function(_0xde2bae){const _0x3030a9=_0x4a1256;if(DataManager['isProxyItem'](_0xde2bae))return;VisuMZ[_0x3030a9(0x242)][_0x3030a9(0x47d)][_0x3030a9(0x4f2)](this,_0xde2bae);},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x4b7)]=function(){const _0x57f94d=_0x4a1256;this[_0x57f94d(0x532)]={'partyArtifactIDs':[],'troopArtifactIDs':[]};for(const _0x23bce2 of $dataArmors){if(!_0x23bce2)continue;if(!DataManager[_0x57f94d(0x469)](_0x23bce2))continue;DataManager['isPartyArtifact'](_0x23bce2)&&this[_0x57f94d(0x532)][_0x57f94d(0x293)][_0x57f94d(0x35d)](_0x23bce2['id']),DataManager[_0x57f94d(0x350)](_0x23bce2)&&this[_0x57f94d(0x532)][_0x57f94d(0x4cf)][_0x57f94d(0x35d)](_0x23bce2['id']);}},DataManager[_0x4a1256(0x469)]=function(_0x2a10a7){const _0x34aeae=_0x4a1256;if(!this['isArmor'](_0x2a10a7))return![];const _0x57068c=_0x2a10a7[_0x34aeae(0x4ff)];if(!_0x57068c)return![];if(_0x57068c[_0x34aeae(0x4cd)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x57068c[_0x34aeae(0x4cd)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x57068c['match'](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x57068c[_0x34aeae(0x4cd)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager['isStackableArtifact']=function(_0x44664c){const _0x1cdd31=_0x4a1256;if(!this['isArtifact'](_0x44664c))return![];const _0x128e24=_0x44664c[_0x1cdd31(0x4ff)];if(!_0x128e24)return![];if(_0x128e24[_0x1cdd31(0x4cd)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x128e24[_0x1cdd31(0x4cd)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager['isPartyArtifact']=function(_0x4ffecd){const _0xe1ecea=_0x4a1256;if(!this[_0xe1ecea(0x469)](_0x4ffecd))return![];const _0xf4659e=_0x4ffecd['note'];if(!_0xf4659e)return![];if(_0xf4659e['match'](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0xf4659e[_0xe1ecea(0x4cd)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager['isTroopArtifact']=function(_0x3e7c52){const _0x5c6c05=_0x4a1256;if(!this['isArtifact'](_0x3e7c52))return![];const _0x5424e5=_0x3e7c52[_0x5c6c05(0x4ff)];if(!_0x5424e5)return![];if(_0x5424e5[_0x5c6c05(0x4cd)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x5424e5[_0x5c6c05(0x4cd)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},VisuMZ[_0x4a1256(0x242)]['Game_BattlerBase_canEquip_artifact']=Game_BattlerBase[_0x4a1256(0x5b7)][_0x4a1256(0x3f7)],Game_BattlerBase['prototype'][_0x4a1256(0x3f7)]=function(_0x5efd43){const _0x5cb9a9=_0x4a1256;if(DataManager[_0x5cb9a9(0x469)](_0x5efd43))return![];if(!DataManager[_0x5cb9a9(0x4d5)](this,_0x5efd43))return![];if(!DataManager[_0x5cb9a9(0x292)](this,_0x5efd43))return![];return VisuMZ[_0x5cb9a9(0x242)][_0x5cb9a9(0x2da)][_0x5cb9a9(0x4f2)](this,_0x5efd43);},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x578)]=Game_BattlerBase[_0x4a1256(0x5b7)]['param'],Game_BattlerBase[_0x4a1256(0x5b7)][_0x4a1256(0x509)]=function(_0x12856c){const _0x8249bb=_0x4a1256;this[_0x8249bb(0x205)]=!![];const _0x2afca2=VisuMZ[_0x8249bb(0x242)][_0x8249bb(0x578)]['call'](this,_0x12856c);return this[_0x8249bb(0x205)]=undefined,_0x2afca2;},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x4da)]=Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x535)],Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x535)]=function(){const _0x3bcf8d=_0x4a1256;this[_0x3bcf8d(0x206)]=!![];const _0x1b1352=VisuMZ['ItemsEquipsCore'][_0x3bcf8d(0x4da)][_0x3bcf8d(0x4f2)](this);return this[_0x3bcf8d(0x206)]=undefined,_0x1b1352;},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x22a)]=Game_Actor['prototype']['equips'],Game_Actor['prototype'][_0x4a1256(0x5e2)]=function(){const _0x843391=_0x4a1256,_0x3c55b0=VisuMZ['ItemsEquipsCore'][_0x843391(0x22a)][_0x843391(0x4f2)](this);if(this[_0x843391(0x206)]||this[_0x843391(0x205)]){const _0x4369bb=_0x3c55b0[_0x843391(0x3c9)]($gameParty[_0x843391(0x4d4)]());return _0x4369bb;}else return _0x3c55b0;},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x4fe)]=Game_BattlerBase['prototype'][_0x4a1256(0x596)],Game_BattlerBase[_0x4a1256(0x5b7)][_0x4a1256(0x596)]=function(_0x4a7c28){const _0x59b8e8=_0x4a1256;let _0xbab847=VisuMZ[_0x59b8e8(0x242)]['Game_BattlerBase_paramPlus_artifact']['call'](this,_0x4a7c28);if(this['constructor']===Game_Enemy)for(const _0x3cbfb3 of $gameParty[_0x59b8e8(0x1de)]()){if(_0x3cbfb3)_0xbab847+=_0x3cbfb3[_0x59b8e8(0x326)][_0x4a7c28];}return _0xbab847;},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x492)]=Game_Enemy[_0x4a1256(0x5b7)][_0x4a1256(0x535)],Game_Enemy[_0x4a1256(0x5b7)]['traitObjects']=function(){const _0x1a5fc8=_0x4a1256;let _0x39f020=VisuMZ[_0x1a5fc8(0x242)][_0x1a5fc8(0x492)][_0x1a5fc8(0x4f2)](this);return _0x39f020['concat']($gameParty[_0x1a5fc8(0x1de)]());},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x4f1)]=Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x322)],Game_Party['prototype'][_0x4a1256(0x322)]=function(_0x65a323,_0x466462,_0x8a9f46){const _0x13ca4d=_0x4a1256;VisuMZ[_0x13ca4d(0x242)]['Game_Party_gainItem_artifact'][_0x13ca4d(0x4f2)](this,_0x65a323,_0x466462,_0x8a9f46);if(DataManager['isArtifact'](_0x65a323)){let _0x80c0b9=$gameParty[_0x13ca4d(0x21c)]();if($gameParty[_0x13ca4d(0x287)]())_0x80c0b9=_0x80c0b9[_0x13ca4d(0x3c9)]($gameTroop['members']());for(const _0x4829b8 of _0x80c0b9){if(!_0x4829b8)continue;_0x4829b8[_0x13ca4d(0x54b)]={};}}},Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x4d4)]=function(){const _0x4e95b1=_0x4a1256;let _0x232cb4=[];const _0x2508f9=VisuMZ[_0x4e95b1(0x242)][_0x4e95b1(0x532)][_0x4e95b1(0x293)];if(_0x2508f9)for(const _0x531d02 of _0x2508f9){const _0x1347d4=$dataArmors[_0x531d02];if(!_0x1347d4)continue;if(!this['hasItem'](_0x1347d4))continue;let _0x366562=0x1;if(DataManager[_0x4e95b1(0x2c6)](_0x1347d4))_0x366562=this[_0x4e95b1(0x317)](_0x1347d4);while(_0x366562--)_0x232cb4[_0x4e95b1(0x35d)](_0x1347d4);}return _0x232cb4;},Game_Party[_0x4a1256(0x5b7)]['troopArtifacts']=function(){const _0x457722=_0x4a1256;let _0x35a4fd=[];const _0xb0341b=VisuMZ[_0x457722(0x242)][_0x457722(0x532)]['troopArtifactIDs'];if(_0xb0341b)for(const _0x529bf3 of _0xb0341b){const _0x55c7a5=$dataArmors[_0x529bf3];if(!_0x55c7a5)continue;if(!this[_0x457722(0x430)](_0x55c7a5))continue;let _0x1241b8=0x1;if(DataManager[_0x457722(0x2c6)](_0x55c7a5))_0x1241b8=this['numItems'](_0x55c7a5);while(_0x1241b8--)_0x35a4fd[_0x457722(0x35d)](_0x55c7a5);}return _0x35a4fd;},Game_Party[_0x4a1256(0x5b7)]['artifacts']=function(){const _0x5a76a2=_0x4a1256;return this[_0x5a76a2(0x4d4)]()[_0x5a76a2(0x3c9)](this[_0x5a76a2(0x1de)]());},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x1c5)]=Game_Party['prototype'][_0x4a1256(0x493)],Game_Party['prototype'][_0x4a1256(0x493)]=function(){const _0x3f9792=_0x4a1256;VisuMZ['ItemsEquipsCore'][_0x3f9792(0x1c5)][_0x3f9792(0x4f2)](this),this[_0x3f9792(0x3a1)]();},Game_Party['prototype'][_0x4a1256(0x3a1)]=function(){const _0x59bfb3=_0x4a1256,_0x8e4047=$gameParty[_0x59bfb3(0x519)]()[_0x59bfb3(0x413)](_0x2ca5c8=>DataManager[_0x59bfb3(0x469)](_0x2ca5c8));for(const _0x4a3704 of _0x8e4047){const _0x3287f7=this[_0x59bfb3(0x317)](_0x4a3704);if(_0x3287f7)this[_0x59bfb3(0x541)](_0x4a3704,_0x3287f7);}},DataManager[_0x4a1256(0x4d5)]=function(_0x494e9f,_0x5a6f41){const _0x68da74=_0x4a1256;if(this['isItem'](_0x5a6f41))return![];if(!_0x494e9f)return![];if($gameTemp[_0x68da74(0x37e)])return!![];if(BattleManager[_0x68da74(0x4b2)]())return!![];const _0x5c6495=this[_0x68da74(0x3d9)](_0x5a6f41);if(_0x5c6495['length']<=0x0)return!![];return _0x5c6495[_0x68da74(0x220)](_0x494e9f[_0x68da74(0x2af)]()['id']);},DataManager[_0x4a1256(0x3d9)]=function(_0x1fd1b8){const _0x150883=_0x4a1256;if(!_0x1fd1b8)return[];this[_0x150883(0x1d1)]=this['_getClassRequirements']||{};const _0x3f40eb='%1-%2'[_0x150883(0x434)](this[_0x150883(0x231)](_0x1fd1b8)?'WEAPON':_0x150883(0x2e7),_0x1fd1b8['id']);if(this[_0x150883(0x1d1)][_0x3f40eb]!==undefined)return this[_0x150883(0x1d1)][_0x3f40eb];let _0x4d49d6=[];const _0x55fd7c=_0x1fd1b8[_0x150883(0x4ff)]||'';if(_0x55fd7c[_0x150883(0x4cd)](/<EQUIP FOR CLASS(?:|ES) ONLY:[ ](.*)>/i)){const _0xb05da3=String(RegExp['$1'])[_0x150883(0x1ff)](',')[_0x150883(0x229)](_0x4d609c=>_0x4d609c['trim']());for(const _0x6988e4 of _0xb05da3){const _0x1f3318=/^\d+$/[_0x150883(0x24b)](_0x6988e4);_0x1f3318?_0x4d49d6[_0x150883(0x35d)](Number(_0x6988e4)):_0x4d49d6['push'](DataManager['getClassIdWithName'](_0x6988e4));}}return this[_0x150883(0x1d1)][_0x3f40eb]=_0x4d49d6,this['_getClassRequirements'][_0x3f40eb];},DataManager['meetsEquipRequirements']=function(_0x43576a,_0x974a53){const _0x5cdb97=_0x4a1256;if(this['isItem'](_0x974a53))return![];if(!_0x43576a)return![];if($gameTemp[_0x5cdb97(0x37e)])return!![];if(BattleManager[_0x5cdb97(0x4b2)]())return!![];const _0xc11db2=this[_0x5cdb97(0x5f4)](_0x974a53);for(const _0x4fdb17 of _0xc11db2){if(!this['meetsEquipRequirement'](_0x43576a,_0x4fdb17))return![];}return!![];},DataManager[_0x4a1256(0x5f4)]=function(_0x97a0ad){const _0x12f3e=_0x4a1256;if(!_0x97a0ad)return[];this[_0x12f3e(0x452)]=this[_0x12f3e(0x452)]||{};const _0x24b405=_0x12f3e(0x300)[_0x12f3e(0x434)](this['isWeapon'](_0x97a0ad)?'WEAPON':_0x12f3e(0x2e7),_0x97a0ad['id']);if(this[_0x12f3e(0x452)][_0x24b405]!==undefined)return this['_getEquipRequirements'][_0x24b405];let _0x316f5e=[];const _0x3c71a6=_0x97a0ad[_0x12f3e(0x4ff)]||'';return _0x3c71a6[_0x12f3e(0x4cd)](/<EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>\s*([\s\S]*)\s*<\/EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>/i)&&(_0x316f5e=String(RegExp['$1'])['split'](/[\r\n]+/)),this[_0x12f3e(0x452)][_0x24b405]=_0x316f5e,this[_0x12f3e(0x452)][_0x24b405];},DataManager['meetsEquipRequirement']=function(_0x42bf80,_0x5cf570){const _0x1f7b43=_0x4a1256;if(_0x5cf570[_0x1f7b43(0x4cd)](/(?:LEVEL|LV|LVL)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0x394c40=String(RegExp['$1'])['trim'](),_0xf376ad=Number(RegExp['$2']);switch(_0x394c40){case'>':return _0x42bf80['level']>_0xf376ad;case'>=':return _0x42bf80[_0x1f7b43(0x30e)]>=_0xf376ad;case _0x1f7b43(0x307):return _0x42bf80[_0x1f7b43(0x30e)]===_0xf376ad;case'<=':return _0x42bf80[_0x1f7b43(0x30e)]<=_0xf376ad;case'<':return _0x42bf80[_0x1f7b43(0x30e)]<_0xf376ad;}return![];}if(_0x5cf570[_0x1f7b43(0x4cd)](/(MAXHP|MAXMP|MHP|MMP)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0x5de6c5=String(RegExp['$1'])[_0x1f7b43(0x3b4)]()['trim'](),_0x397cb2=String(RegExp['$2'])['trim'](),_0x2f2a46=Number(RegExp['$3']);let _0x29e17e=0x0;if([_0x1f7b43(0x379),_0x1f7b43(0x51b)][_0x1f7b43(0x220)](_0x5de6c5))_0x29e17e=0x1;const _0x59cd0a=_0x42bf80[_0x1f7b43(0x403)][_0x29e17e]||0x0;switch(_0x397cb2){case'>':return _0x42bf80['paramBase'](_0x29e17e)+_0x59cd0a>_0x2f2a46;case'>=':return _0x42bf80[_0x1f7b43(0x5ce)](_0x29e17e)+_0x59cd0a>=_0x2f2a46;case _0x1f7b43(0x307):return _0x42bf80['paramBase'](_0x29e17e)+_0x59cd0a===_0x2f2a46;case'<=':return _0x42bf80[_0x1f7b43(0x5ce)](_0x29e17e)+_0x59cd0a<=_0x2f2a46;case'<':return _0x42bf80[_0x1f7b43(0x5ce)](_0x29e17e)+_0x59cd0a<_0x2f2a46;}return![];}if(_0x5cf570[_0x1f7b43(0x4cd)](/(ATK|DEF|MAT|MDF|AGI|LUK)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0x508865=String(RegExp['$1'])[_0x1f7b43(0x3b4)]()[_0x1f7b43(0x482)](),_0x369141=String(RegExp['$2'])['trim'](),_0x4cc324=Number(RegExp['$3']),_0x5f2cb3=['atk',_0x1f7b43(0x3a6),'mat',_0x1f7b43(0x2e3),_0x1f7b43(0x222),'luk'];let _0xbb8190=_0x5f2cb3[_0x1f7b43(0x441)](_0x508865)+0x2;if(_0xbb8190<0x2)return![];const _0x16563e=_0x42bf80[_0x1f7b43(0x403)][_0xbb8190]||0x0;switch(_0x369141){case'>':return _0x42bf80[_0x1f7b43(0x5ce)](_0xbb8190)+_0x16563e>_0x4cc324;case'>=':return _0x42bf80[_0x1f7b43(0x5ce)](_0xbb8190)+_0x16563e>=_0x4cc324;case _0x1f7b43(0x307):return _0x42bf80[_0x1f7b43(0x5ce)](_0xbb8190)+_0x16563e===_0x4cc324;case'<=':return _0x42bf80[_0x1f7b43(0x5ce)](_0xbb8190)+_0x16563e<=_0x4cc324;case'<':return _0x42bf80[_0x1f7b43(0x5ce)](_0xbb8190)+_0x16563e<_0x4cc324;}return![];}if(_0x5cf570[_0x1f7b43(0x4cd)](/LEARNED SKILL:[ ](\d+)/i)){const _0x1aabb5=Number(RegExp['$1']);return _0x42bf80[_0x1f7b43(0x402)](_0x1aabb5);}else{if(_0x5cf570['match'](/LEARNED SKILL:[ ](.*)/i)){const _0x472498=String(RegExp['$1']),_0x41a38d=this['getSkillIdWithName'](_0x472498);return _0x42bf80[_0x1f7b43(0x402)](_0x41a38d);}}if(_0x5cf570[_0x1f7b43(0x4cd)](/SWITCH:[ ](\d+)/i)){const _0x12c9be=Number(RegExp['$1']);return $gameSwitches[_0x1f7b43(0x248)](_0x12c9be);}return!![];},DataManager['getEtypeIDs']=function(_0x43f7c2){const _0x5603f8=_0x4a1256;return this['isArmor'](_0x43f7c2)?this[_0x5603f8(0x2b9)](_0x43f7c2):[_0x43f7c2['etypeId']||0x0];},DataManager[_0x4a1256(0x2b9)]=function(_0x34ab75){const _0x581117=_0x4a1256;this['_cache_etypeIDs']=this[_0x581117(0x5a1)]||{};if(this[_0x581117(0x5a1)][_0x34ab75['id']]!==undefined)return this[_0x581117(0x5a1)][_0x34ab75['id']];this[_0x581117(0x5a1)][_0x34ab75['id']]=[_0x34ab75[_0x581117(0x366)]||0x0];const _0x4e1b36=_0x34ab75[_0x581117(0x4ff)]||'';if(_0x4e1b36[_0x581117(0x4cd)](/<ADDED ETYPE(?:|S):[ ](.*)>/i)){const _0x50f796=String(RegExp['$1'])[_0x581117(0x1ff)](',')[_0x581117(0x229)](_0x170770=>_0x170770[_0x581117(0x482)]());for(const _0x40f5b6 of _0x50f796){const _0x6b899d=/^\d+$/[_0x581117(0x24b)](_0x40f5b6);let _0x1f4d7a=0x0;_0x6b899d?_0x1f4d7a=Number(_0x40f5b6):_0x1f4d7a=this[_0x581117(0x4d1)](_0x40f5b6),_0x1f4d7a>0x1&&this['_cache_etypeIDs'][_0x34ab75['id']]['push'](_0x1f4d7a);}}return this['_cache_etypeIDs'][_0x34ab75['id']];},Game_BattlerBase[_0x4a1256(0x5b7)][_0x4a1256(0x20d)]=function(_0x45fdda){const _0x109afc=_0x4a1256;return this[_0x109afc(0x48d)](_0x45fdda[_0x109afc(0x1c3)])&&!this[_0x109afc(0x506)](_0x45fdda['etypeId'])&&DataManager[_0x109afc(0x5b3)](_0x45fdda)[_0x109afc(0x5c1)](_0x14d059=>!this[_0x109afc(0x506)](_0x14d059));},DataManager[_0x4a1256(0x23e)]=function(_0xb1ffdf){const _0x193e22=_0x4a1256;if(!this[_0x193e22(0x231)](_0xb1ffdf)&&!this[_0x193e22(0x560)](_0xb1ffdf))return![];if(Imported[_0x193e22(0x313)]&&this[_0x193e22(0x231)](_0xb1ffdf))return![];if(!_0xb1ffdf[_0x193e22(0x4ff)])return![];return _0xb1ffdf['note'][_0x193e22(0x4cd)](/<CURSED>/i);},DataManager[_0x4a1256(0x557)]=function(_0x21d813){const _0x56cf05=_0x4a1256;if(!_0x21d813)return _0x21d813;if(!this[_0x56cf05(0x231)](_0x21d813)&&!this[_0x56cf05(0x560)](_0x21d813))return _0x21d813;if(_0x21d813[_0x56cf05(0x4ff)][_0x56cf05(0x4cd)](/<PURIFY TRANSFORM:[ ](.*)>/i)){const _0x140c3a=String(RegExp['$1'])[_0x56cf05(0x482)](),_0x37e374=/^\d+$/[_0x56cf05(0x24b)](_0x140c3a);if(_0x37e374){if(this[_0x56cf05(0x231)](_0x21d813))return $dataWeapons[Number(_0x140c3a)];if(this['isArmor'](_0x21d813))return $dataArmors[Number(_0x140c3a)];}else{if(this[_0x56cf05(0x231)](_0x21d813))return $dataWeapons[this[_0x56cf05(0x5fc)](_0x140c3a)];if(this[_0x56cf05(0x560)](_0x21d813))return $dataArmors[this[_0x56cf05(0x539)](_0x140c3a)];}}return _0x21d813;},Game_Party[_0x4a1256(0x5b7)]['purifyCursedEquips']=function(){const _0x2423d6=_0x4a1256,_0x186c6c=this[_0x2423d6(0x21c)]();for(const _0x34f9bb of _0x186c6c){if(!_0x34f9bb)continue;_0x34f9bb[_0x2423d6(0x2d5)]();}},Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x2d5)]=function(){const _0xd01dd5=_0x4a1256,_0x10d14c=this[_0xd01dd5(0x3bb)]()[_0xd01dd5(0x45a)];for(let _0x5bb3c5=0x0;_0x5bb3c5<_0x10d14c;_0x5bb3c5++){const _0x15ba50=this[_0xd01dd5(0x5e6)][_0x5bb3c5];if(!_0x15ba50)continue;const _0x433832=_0x15ba50[_0xd01dd5(0x4b1)]();if(!DataManager[_0xd01dd5(0x23e)](_0x433832))continue;let _0x1bdafc=DataManager['getPurifyTransformation'](_0x433832);this[_0xd01dd5(0x40e)](_0x433832,_0x1bdafc)?(!this['_equips'][_0x5bb3c5]&&(this['_equips'][_0x5bb3c5]=new Game_Item()),this[_0xd01dd5(0x5e6)][_0x5bb3c5]['setObject'](_0x1bdafc),this[_0xd01dd5(0x39d)]()):this['changeEquip'](_0x5bb3c5,null);}},Game_Actor['prototype'][_0x4a1256(0x40e)]=function(_0x35cb4b,_0x5dd53a){const _0x8bcafe=_0x4a1256;if(_0x35cb4b===_0x5dd53a)return![];const _0x380b11=DataManager['getEtypeIDs'](_0x5dd53a);if(!_0x380b11[_0x8bcafe(0x220)](_0x35cb4b[_0x8bcafe(0x366)]))return![];if(DataManager[_0x8bcafe(0x231)](_0x5dd53a))return this[_0x8bcafe(0x49f)](_0x5dd53a[_0x8bcafe(0x547)]);else{if(DataManager[_0x8bcafe(0x560)](_0x5dd53a))return this[_0x8bcafe(0x48d)](_0x5dd53a[_0x8bcafe(0x1c3)]);}return![];},TextManager['ITEMS_EQUIPS_CORE']={'helpDesc':{'equip':VisuMZ['ItemsEquipsCore'][_0x4a1256(0x4e9)][_0x4a1256(0x34e)]['equipCmdDesc']??_0x4a1256(0x4b3),'optimize':VisuMZ['ItemsEquipsCore'][_0x4a1256(0x4e9)][_0x4a1256(0x34e)][_0x4a1256(0x5b5)]??_0x4a1256(0x3cc),'clear':VisuMZ[_0x4a1256(0x242)]['Settings']['EquipScene'][_0x4a1256(0x386)]??'Remove\x20all\x20available\x20equipment.'}},ColorManager[_0x4a1256(0x2c3)]=function(_0x4c8d53){const _0x208b8b=_0x4a1256;if(!_0x4c8d53)return this[_0x208b8b(0x4fc)]();else{if(_0x4c8d53[_0x208b8b(0x4ff)][_0x208b8b(0x4cd)](/<COLOR:[ ](\d+)>/i))return this[_0x208b8b(0x409)](Number(RegExp['$1'])[_0x208b8b(0x284)](0x0,0x1f));else return _0x4c8d53[_0x208b8b(0x4ff)][_0x208b8b(0x4cd)](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this['normalColor']();}},ColorManager[_0x4a1256(0x2ce)]=function(_0x29cf9a){const _0x5a7c0a=_0x4a1256;return _0x29cf9a=String(_0x29cf9a),_0x29cf9a[_0x5a7c0a(0x4cd)](/#(.*)/i)?_0x5a7c0a(0x283)[_0x5a7c0a(0x434)](String(RegExp['$1'])):this[_0x5a7c0a(0x409)](Number(_0x29cf9a));},SceneManager[_0x4a1256(0x3ac)]=function(){const _0x525ffa=_0x4a1256;return this[_0x525ffa(0x555)]&&this['_scene']['constructor']===Scene_Shop;},Game_Temp[_0x4a1256(0x5b7)][_0x4a1256(0x299)]=function(){const _0x48c830=_0x4a1256;if(this['_bypassNewLabel'])return![];return VisuMZ['ItemsEquipsCore']['Settings'][_0x48c830(0x3c5)][_0x48c830(0x280)];},VisuMZ['ShopMenuStatusStandard']=VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x4e9)][_0x4a1256(0x53d)][_0x4a1256(0x1dd)],VisuMZ[_0x4a1256(0x242)]['Game_BattlerBase_param']=Game_BattlerBase[_0x4a1256(0x5b7)]['param'],Game_BattlerBase[_0x4a1256(0x5b7)]['param']=function(_0x19444f){const _0x2bde79=_0x4a1256;return this[_0x2bde79(0x394)]?this[_0x2bde79(0x540)]?VisuMZ['ShopMenuStatusStandard']:0x1:VisuMZ[_0x2bde79(0x242)][_0x2bde79(0x47b)][_0x2bde79(0x4f2)](this,_0x19444f);},VisuMZ[_0x4a1256(0x242)]['Game_BattlerBase_meetsItemConditions']=Game_BattlerBase[_0x4a1256(0x5b7)][_0x4a1256(0x30f)],Game_BattlerBase[_0x4a1256(0x5b7)]['meetsItemConditions']=function(_0x5c72cf){const _0x158ac0=_0x4a1256;if(!_0x5c72cf)return![];if(!VisuMZ[_0x158ac0(0x242)][_0x158ac0(0x41a)][_0x158ac0(0x4f2)](this,_0x5c72cf))return![];if(!this['meetsItemConditionsNotetags'](_0x5c72cf))return![];if(!this[_0x158ac0(0x477)](_0x5c72cf))return![];return!![];},Game_BattlerBase[_0x4a1256(0x5b7)][_0x4a1256(0x1f8)]=function(_0x3c7c7d){const _0x498165=_0x4a1256;if(!this[_0x498165(0x237)](_0x3c7c7d))return![];return!![];},Game_BattlerBase[_0x4a1256(0x5b7)][_0x4a1256(0x237)]=function(_0x142dc2){const _0x262b12=_0x4a1256,_0xbc9613=_0x142dc2[_0x262b12(0x4ff)];if(_0xbc9613[_0x262b12(0x4cd)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x44d273=JSON[_0x262b12(0x5f3)]('['+RegExp['$1'][_0x262b12(0x4cd)](/\d+/g)+']');for(const _0x5d8e75 of _0x44d273){if(!$gameSwitches[_0x262b12(0x248)](_0x5d8e75))return![];}return!![];}if(_0xbc9613[_0x262b12(0x4cd)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x46732b=JSON[_0x262b12(0x5f3)]('['+RegExp['$1'][_0x262b12(0x4cd)](/\d+/g)+']');for(const _0x197dc5 of _0x46732b){if(!$gameSwitches['value'](_0x197dc5))return![];}return!![];}if(_0xbc9613[_0x262b12(0x4cd)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5520a0=JSON[_0x262b12(0x5f3)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x55f813 of _0x5520a0){if($gameSwitches['value'](_0x55f813))return!![];}return![];}if(_0xbc9613[_0x262b12(0x4cd)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3bf10c=JSON['parse']('['+RegExp['$1'][_0x262b12(0x4cd)](/\d+/g)+']');for(const _0x59f479 of _0x3bf10c){if(!$gameSwitches[_0x262b12(0x248)](_0x59f479))return!![];}return![];}if(_0xbc9613[_0x262b12(0x4cd)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x48877c=JSON[_0x262b12(0x5f3)]('['+RegExp['$1'][_0x262b12(0x4cd)](/\d+/g)+']');for(const _0x564c36 of _0x48877c){if(!$gameSwitches[_0x262b12(0x248)](_0x564c36))return!![];}return![];}if(_0xbc9613[_0x262b12(0x4cd)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4df3b6=JSON[_0x262b12(0x5f3)]('['+RegExp['$1'][_0x262b12(0x4cd)](/\d+/g)+']');for(const _0x55037e of _0x4df3b6){if($gameSwitches['value'](_0x55037e))return![];}return!![];}return!![];},Game_BattlerBase[_0x4a1256(0x5b7)][_0x4a1256(0x477)]=function(_0xc4aab6){const _0x29bd28=_0x4a1256,_0x3f1da1=_0xc4aab6[_0x29bd28(0x4ff)],_0x3a5cc5=VisuMZ['ItemsEquipsCore']['itemEnableJS'];return _0x3a5cc5[_0xc4aab6['id']]?_0x3a5cc5[_0xc4aab6['id']][_0x29bd28(0x4f2)](this,_0xc4aab6):!![];},Game_Actor['prototype'][_0x4a1256(0x55a)]=function(){const _0x5ad1bd=_0x4a1256,_0x329743=this[_0x5ad1bd(0x3bb)]()[_0x5ad1bd(0x45a)];for(let _0x3b19db=0x0;_0x3b19db<_0x329743;_0x3b19db++){if(this[_0x5ad1bd(0x28d)](_0x3b19db))this[_0x5ad1bd(0x1b2)](_0x3b19db,null);}},Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x28d)]=function(_0x20fa9e){const _0x459c43=_0x4a1256;return this[_0x459c43(0x4d9)]()[_0x459c43(0x220)](this[_0x459c43(0x3bb)]()[_0x20fa9e])?![]:this[_0x459c43(0x484)](_0x20fa9e);},Game_Actor['prototype'][_0x4a1256(0x4d9)]=function(){const _0x6f7d1c=_0x4a1256;return VisuMZ['ItemsEquipsCore'][_0x6f7d1c(0x4e9)][_0x6f7d1c(0x34e)]['NonRemoveETypes'];},Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x1d0)]=function(){const _0x4bb80e=_0x4a1256,_0x497ef0=this['equipSlots']()[_0x4bb80e(0x45a)];for(let _0x2b5f8f=0x0;_0x2b5f8f<_0x497ef0;_0x2b5f8f++){if(this[_0x4bb80e(0x214)](_0x2b5f8f))this[_0x4bb80e(0x1b2)](_0x2b5f8f,null);}for(let _0x1b9df9=0x0;_0x1b9df9<_0x497ef0;_0x1b9df9++){if(this['isOptimizeEquipOk'](_0x1b9df9))this['changeEquip'](_0x1b9df9,this[_0x4bb80e(0x267)](_0x1b9df9));}},Game_Actor['prototype'][_0x4a1256(0x214)]=function(_0x27ee31){const _0x4e339c=_0x4a1256;return this[_0x4e339c(0x2b4)]()[_0x4e339c(0x220)](this[_0x4e339c(0x3bb)]()[_0x27ee31])?![]:this[_0x4e339c(0x484)](_0x27ee31);},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x1c6)]=Game_Actor['prototype']['isEquipChangeOk'],Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x484)]=function(_0x3d8cf8){const _0x783583=_0x4a1256;!this[_0x783583(0x5e6)][_0x3d8cf8]&&(this['_equips'][_0x3d8cf8]=new Game_Item());const _0x351ea7=this['_equips'][_0x3d8cf8];if(_0x351ea7){const _0x294289=_0x351ea7[_0x783583(0x4b1)]();if(DataManager[_0x783583(0x23e)](_0x294289))return![];}return VisuMZ[_0x783583(0x242)][_0x783583(0x1c6)][_0x783583(0x4f2)](this,_0x3d8cf8);},Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x2b4)]=function(){const _0x16d69f=_0x4a1256;return VisuMZ['ItemsEquipsCore'][_0x16d69f(0x4e9)][_0x16d69f(0x34e)][_0x16d69f(0x260)];},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x212)]=Game_Actor['prototype'][_0x4a1256(0x507)],Game_Actor[_0x4a1256(0x5b7)]['tradeItemWithParty']=function(_0x5ea093,_0x3ea628){const _0x45270b=_0x4a1256;if(this[_0x45270b(0x58c)])return![];$gameTemp['_bypassNewLabel']=!![];const _0x45aff8=VisuMZ[_0x45270b(0x242)][_0x45270b(0x212)][_0x45270b(0x4f2)](this,_0x5ea093,_0x3ea628);return $gameTemp[_0x45270b(0x2e9)]=![],_0x45aff8;},Game_Actor['prototype'][_0x4a1256(0x3c6)]=function(_0x467052,_0x4693ae){const _0x33958e=_0x4a1256,_0x445dbf=this[_0x33958e(0x38c)](_0x467052);if(_0x445dbf<0x0)return;const _0x512fa7=_0x467052===0x1?$dataWeapons[_0x4693ae]:$dataArmors[_0x4693ae];this[_0x33958e(0x1b2)](_0x445dbf,_0x512fa7);},Game_Actor[_0x4a1256(0x5b7)]['getNextAvailableEtypeId']=function(_0x4daa8d){const _0x11559a=_0x4a1256;let _0x27659a=0x0;const _0x5f1f05=this[_0x11559a(0x3bb)](),_0x545c36=this[_0x11559a(0x5e2)]();for(let _0x8b7c75=0x0;_0x8b7c75<_0x5f1f05[_0x11559a(0x45a)];_0x8b7c75++){if(_0x5f1f05[_0x8b7c75]===_0x4daa8d){_0x27659a=_0x8b7c75;if(!_0x545c36[_0x8b7c75])return _0x27659a;}}return _0x27659a;},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x5f0)]=Game_Actor['prototype']['paramPlus'],Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x596)]=function(_0x1e7f4a){const _0x44390b=_0x4a1256;let _0x1e7032=VisuMZ[_0x44390b(0x242)][_0x44390b(0x5f0)][_0x44390b(0x4f2)](this,_0x1e7f4a);for(const _0x15b3b0 of this[_0x44390b(0x5e2)]()){if(_0x15b3b0)_0x1e7032+=this[_0x44390b(0x5d9)](_0x15b3b0,_0x1e7f4a);}return _0x1e7032;},Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x5d9)]=function(_0x2b15c5,_0x380d47){const _0x37e310=_0x4a1256;if(this[_0x37e310(0x3da)])return 0x0;const _0x408aaf=(DataManager[_0x37e310(0x231)](_0x2b15c5)?_0x37e310(0x56a):_0x37e310(0x256))[_0x37e310(0x434)](_0x2b15c5['id']),_0x3ec62a=_0x37e310(0x300)['format'](_0x408aaf,_0x380d47);if(VisuMZ[_0x37e310(0x242)][_0x37e310(0x2d3)][_0x3ec62a]){this[_0x37e310(0x3da)]=!![];const _0x42e3c6=VisuMZ[_0x37e310(0x242)][_0x37e310(0x2d3)][_0x3ec62a]['call'](this,_0x2b15c5,_0x380d47);return this[_0x37e310(0x3da)]=![],_0x42e3c6;}else return 0x0;},Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x327)]=function(_0x4a92e1){const _0x1ca5de=_0x4a1256;this[_0x1ca5de(0x394)]=!![],this[_0x1ca5de(0x540)]=_0x4a92e1;},Game_Actor[_0x4a1256(0x5b7)]['initEquips']=function(_0x15d9fc){const _0x20b9a9=_0x4a1256;_0x15d9fc=this['convertInitEquipsToItems'](_0x15d9fc);const _0x2cd1df=this[_0x20b9a9(0x3bb)]();this[_0x20b9a9(0x5e6)]=[];for(let _0x3a83ef=0x0;_0x3a83ef<_0x2cd1df[_0x20b9a9(0x45a)];_0x3a83ef++){this[_0x20b9a9(0x5e6)][_0x3a83ef]=new Game_Item();}for(let _0x46a3af=0x0;_0x46a3af<_0x2cd1df[_0x20b9a9(0x45a)];_0x46a3af++){const _0x5ac1d3=_0x2cd1df[_0x46a3af],_0x467c3a=this[_0x20b9a9(0x258)](_0x15d9fc,_0x5ac1d3);if(this[_0x20b9a9(0x3f7)](_0x467c3a))this[_0x20b9a9(0x5e6)][_0x46a3af][_0x20b9a9(0x2a5)](_0x467c3a);}this[_0x20b9a9(0x390)](!![]),this[_0x20b9a9(0x39d)]();},Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x5d2)]=function(_0x7a469a){const _0x38ac10=_0x4a1256,_0x367f20=[];for(let _0x4d7d25=0x0;_0x4d7d25<_0x7a469a[_0x38ac10(0x45a)];_0x4d7d25++){const _0x3dbcb2=_0x7a469a[_0x4d7d25];if(_0x3dbcb2<=0x0)continue;const _0x463cc9=$dataSystem[_0x38ac10(0x391)][_0x4d7d25+0x1];if(_0x463cc9===$dataSystem['equipTypes'][0x1]||_0x4d7d25===0x1&&this[_0x38ac10(0x1d4)]())_0x367f20[_0x38ac10(0x35d)]($dataWeapons[_0x3dbcb2]);else{if(BattleManager[_0x38ac10(0x4b2)]()){const _0x258c00=$dataArmors[_0x3dbcb2];_0x258c00&&_0x258c00['etypeId']===_0x4d7d25+0x1&&_0x367f20[_0x38ac10(0x35d)](_0x258c00);}else{const _0x2b8565=$dataArmors[_0x3dbcb2];_0x2b8565&&_0x2b8565['etypeId']===_0x4d7d25+0x1&&_0x367f20[_0x38ac10(0x35d)](_0x2b8565);}}}return _0x367f20;},Game_Actor['prototype']['getMatchingInitEquip']=function(_0x4b468c,_0xf68a2a){const _0x597430=_0x4a1256;for(const _0x39196b of _0x4b468c){if(!_0x39196b)continue;if(_0x39196b['etypeId']===_0xf68a2a)return _0x4b468c[_0x597430(0x3e3)](_0x4b468c['indexOf'](_0x39196b),0x1),_0x39196b;}return null;},Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x3bb)]=function(){const _0xee4d11=_0x4a1256,_0x3a603b=VisuMZ['ItemsEquipsCore'][_0xee4d11(0x431)](this[_0xee4d11(0x4e4)]||this[_0xee4d11(0x2af)]()['equipSlots']);if(_0x3a603b[_0xee4d11(0x45a)]>=0x2&&this['isDualWield']())_0x3a603b[0x1]=0x1;return _0x3a603b;},Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x5db)]=function(_0x4f44db){const _0x103601=_0x4a1256;_0x4f44db[_0x103601(0x544)](0x0),_0x4f44db[_0x103601(0x544)](-0x1),this['_forcedSlots']=_0x4f44db,this[_0x103601(0x39d)](),this[_0x103601(0x576)]();},Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x23c)]=function(){const _0x5bf589=_0x4a1256;this[_0x5bf589(0x4e4)]=undefined,this[_0x5bf589(0x39d)](),this[_0x5bf589(0x576)]();},Game_Actor['prototype']['updateChangedSlots']=function(){const _0x501ada=_0x4a1256;let _0x10746c=this[_0x501ada(0x3bb)]()[_0x501ada(0x45a)];while(this[_0x501ada(0x5e6)]['length']>_0x10746c){const _0x15b9f8=this['_equips'][this[_0x501ada(0x5e6)][_0x501ada(0x45a)]-0x1];_0x15b9f8&&_0x15b9f8['object']()&&$gameParty[_0x501ada(0x322)](_0x15b9f8['object'](),0x1),this[_0x501ada(0x5e6)]['pop']();}while(_0x10746c>this[_0x501ada(0x5e6)]['length']){this[_0x501ada(0x5e6)][_0x501ada(0x35d)](new Game_Item());}},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x50a)]=Game_Actor[_0x4a1256(0x5b7)]['changeClass'],Game_Actor[_0x4a1256(0x5b7)]['changeClass']=function(_0x5c17b6,_0x1eb116){const _0xcb28dd=_0x4a1256;VisuMZ[_0xcb28dd(0x242)][_0xcb28dd(0x50a)][_0xcb28dd(0x4f2)](this,_0x5c17b6,_0x1eb116),this[_0xcb28dd(0x576)]();},Game_Actor[_0x4a1256(0x5b7)]['prepareNewEquipSlotsOnLoad']=function(){const _0x462a10=_0x4a1256,_0x429e9f=this[_0x462a10(0x3bb)]();for(let _0x520858=0x0;_0x520858<_0x429e9f[_0x462a10(0x45a)];_0x520858++){if(!this[_0x462a10(0x5e6)][_0x520858])this[_0x462a10(0x5e6)][_0x520858]=new Game_Item();}this[_0x462a10(0x390)](![]),this['refresh']();},VisuMZ[_0x4a1256(0x242)]['Game_Actor_changeEquip']=Game_Actor['prototype'][_0x4a1256(0x1b2)],Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x1b2)]=function(_0x4887ae,_0x37c016){const _0x4bb43e=_0x4a1256;if(!this['_tempActor']){const _0x47d7b5=JsonEx[_0x4bb43e(0x251)](this);_0x47d7b5['_tempActor']=!![],this['changeEquipBase'](_0x4887ae,_0x37c016),this[_0x4bb43e(0x572)](_0x47d7b5);}else this[_0x4bb43e(0x3f9)](_0x4887ae,_0x37c016);},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x3ad)]=Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x32b)],Game_Actor['prototype'][_0x4a1256(0x32b)]=function(_0x1eb77d,_0x592d95){const _0x2ff388=_0x4a1256;!this['_equips'][_0x1eb77d]&&(this[_0x2ff388(0x5e6)][_0x1eb77d]=new Game_Item());if(!this['_tempActor']){const _0x177d92=JsonEx['makeDeepCopy'](this);_0x177d92[_0x2ff388(0x58c)]=!![],VisuMZ['ItemsEquipsCore'][_0x2ff388(0x3ad)]['call'](this,_0x1eb77d,_0x592d95),this['equipAdjustHpMp'](_0x177d92);}else VisuMZ[_0x2ff388(0x242)][_0x2ff388(0x3ad)]['call'](this,_0x1eb77d,_0x592d95);},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x33e)]=Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x362)],Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x362)]=function(_0x4416ac){const _0x158ed5=_0x4a1256;if(!this[_0x158ed5(0x58c)]){const _0x5caac2=JsonEx[_0x158ed5(0x251)](this);_0x5caac2['_tempActor']=!![],VisuMZ[_0x158ed5(0x242)]['Game_Actor_discardEquip'][_0x158ed5(0x4f2)](this,_0x4416ac),this['equipAdjustHpMp'](_0x5caac2);}else VisuMZ[_0x158ed5(0x242)]['Game_Actor_discardEquip'][_0x158ed5(0x4f2)](this,_0x4416ac);},Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x390)]=function(_0x1c3e8d){const _0x218136=_0x4a1256;if(this['_bypassReleaseUnequippableItemsItemsEquipsCore'])return;let _0xba22c6=0x0;for(;;){_0xba22c6++;if(_0xba22c6>0x3)break;const _0x4e8e30=this[_0x218136(0x3bb)](),_0x4d98dc=this['equips'](),_0x48fa6e=_0x4d98dc[_0x218136(0x45a)];let _0x4d20f3=![];for(let _0x1c3e54=0x0;_0x1c3e54<_0x48fa6e;_0x1c3e54++){const _0x350e01=_0x4d98dc[_0x1c3e54];if(!_0x350e01)continue;const _0x5ea13b=DataManager[_0x218136(0x5b3)](_0x350e01);if(!this[_0x218136(0x3f7)](_0x350e01)||!_0x5ea13b['includes'](_0x4e8e30[_0x1c3e54])){!_0x1c3e8d&&this[_0x218136(0x507)](null,_0x350e01);if(!this[_0x218136(0x58c)]){const _0x359037=JsonEx[_0x218136(0x251)](this);_0x359037['_tempActor']=!![],this[_0x218136(0x5e6)][_0x1c3e54][_0x218136(0x2a5)](null),this['_bypassReleaseUnequippableItemsItemsEquipsCore']=!![],this[_0x218136(0x572)](_0x359037),this['_bypassReleaseUnequippableItemsItemsEquipsCore']=undefined;}else{if(this[_0x218136(0x5e6)][_0x1c3e54])this['_equips'][_0x1c3e54][_0x218136(0x2a5)](null);else continue;}_0x4d20f3=!![];}}if(!_0x4d20f3)break;}},Game_Actor['prototype'][_0x4a1256(0x572)]=function(_0x25a9fd){const _0x4dd509=_0x4a1256;if(this['_tempActor'])return;if(!VisuMZ[_0x4dd509(0x242)][_0x4dd509(0x4e9)][_0x4dd509(0x34e)]['EquipAdjustHpMp'])return;const _0x23583a=Math[_0x4dd509(0x55d)](_0x25a9fd['hpRate']()*this[_0x4dd509(0x4cb)]),_0x3c3108=Math[_0x4dd509(0x55d)](_0x25a9fd['mpRate']()*this[_0x4dd509(0x51b)]);if(this['hp']>0x0)this[_0x4dd509(0x3b7)](_0x23583a);if(this['mp']>0x0)this[_0x4dd509(0x498)](_0x3c3108);},Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x3f9)]=function(_0x112ec6,_0x3f0f99){const _0x5e81f7=_0x4a1256;if(!this[_0x5e81f7(0x507)](_0x3f0f99,this[_0x5e81f7(0x5e2)]()[_0x112ec6]))return;if(_0x3f0f99){const _0x455dd0=DataManager[_0x5e81f7(0x5b3)](_0x3f0f99);if(!_0x455dd0[_0x5e81f7(0x220)](this[_0x5e81f7(0x3bb)]()[_0x112ec6]))return;}!this[_0x5e81f7(0x5e6)][_0x112ec6]&&(this[_0x5e81f7(0x5e6)][_0x112ec6]=new Game_Item());this['_equips'][_0x112ec6][_0x5e81f7(0x2a5)](_0x3f0f99);if(VisuMZ[_0x5e81f7(0x242)]['CheckCursedItemMsg'](_0x3f0f99)){const _0x441f27=VisuMZ[_0x5e81f7(0x242)]['Settings'][_0x5e81f7(0x34e)][_0x5e81f7(0x483)]||'',_0x17ef82=this[_0x5e81f7(0x2ba)](),_0x2f5e5e=_0x5e81f7(0x2d1)[_0x5e81f7(0x434)](_0x3f0f99[_0x5e81f7(0x1f3)]),_0x74cf61=_0x3f0f99[_0x5e81f7(0x2ba)]||'';let _0x31d28c=_0x441f27[_0x5e81f7(0x434)](_0x17ef82,_0x2f5e5e,_0x74cf61);if(VisuMZ[_0x5e81f7(0x5fa)][_0x5e81f7(0x401)]>=1.79&&_0x31d28c[_0x5e81f7(0x45a)]>0x0)$textPopup(_0x31d28c);}this['refresh']();},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x39a)]=function(_0x51d0eb){const _0x30431b=_0x4a1256;if(!_0x51d0eb)return![];if(!Imported[_0x30431b(0x295)])return![];if(VisuMZ['CoreEngine'][_0x30431b(0x401)]<1.79)return![];return DataManager['isCursedItem'](_0x51d0eb);},Game_Actor[_0x4a1256(0x5b7)]['bestEquipItem']=function(_0x2d0eb6){const _0x5318a7=_0x4a1256,_0x46f7b0=this[_0x5318a7(0x3bb)]()[_0x2d0eb6],_0x3cfa28=$gameParty[_0x5318a7(0x36b)]()[_0x5318a7(0x413)](_0x3ab394=>DataManager['getEtypeIDs'](_0x3ab394)['includes'](_0x46f7b0)&&this[_0x5318a7(0x3f7)](_0x3ab394)&&!DataManager[_0x5318a7(0x23e)](_0x3ab394));let _0x58d684=null,_0x510a67=-0x3e8;for(let _0x4832ae=0x0;_0x4832ae<_0x3cfa28[_0x5318a7(0x45a)];_0x4832ae++){const _0x5b7bd5=_0x3cfa28[_0x4832ae];if(!this[_0x5318a7(0x25a)](_0x5b7bd5))continue;const _0xace316=this[_0x5318a7(0x565)](_0x5b7bd5);_0xace316>_0x510a67&&(_0x510a67=_0xace316,_0x58d684=_0x5b7bd5);}return _0x58d684;},Game_Actor['prototype'][_0x4a1256(0x25a)]=function(_0x2df7f0){const _0x304f7a=_0x4a1256;if(!_0x2df7f0)return![];const _0x183742=_0x2df7f0?_0x2df7f0[_0x304f7a(0x4ff)]:'';if(_0x183742[_0x304f7a(0x4cd)](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){const _0x599ded=Number(RegExp['$1'])||0x1,_0x9ebcb8=this[_0x304f7a(0x5e2)]()[_0x304f7a(0x413)](_0x34c259=>_0x34c259===_0x2df7f0);if(_0x9ebcb8['length']>=_0x599ded)return![];}if(DataManager['isWeapon'](_0x2df7f0)){if(_0x183742[_0x304f7a(0x4cd)](/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i)){const _0x2a6929=Number(RegExp['$1'])||0x1,_0x3fb7a6=this[_0x304f7a(0x462)]()[_0x304f7a(0x544)](null)[_0x304f7a(0x413)](_0xfb9188=>_0xfb9188[_0x304f7a(0x547)]===_0x2df7f0['wtypeId']);if(_0x3fb7a6[_0x304f7a(0x45a)]>=_0x2a6929)return![];}{const _0x1e6ded=this[_0x304f7a(0x462)]()[_0x304f7a(0x544)](null)['filter'](_0x474234=>_0x474234['wtypeId']===_0x2df7f0[_0x304f7a(0x547)]);if(_0x1e6ded[_0x304f7a(0x45a)]>0x0){let _0x14a68e=0x270f;for(const _0x4a2215 of _0x1e6ded){_0x4a2215[_0x304f7a(0x4ff)][_0x304f7a(0x4cd)](/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i)&&(_0x14a68e=Math['min'](_0x14a68e,Number(RegExp['$1'])));}if(_0x1e6ded[_0x304f7a(0x45a)]>=_0x14a68e)return![];}}}if(DataManager[_0x304f7a(0x560)](_0x2df7f0)){if(_0x183742['match'](/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i)){const _0x181713=Number(RegExp['$1'])||0x1,_0x545d87=this[_0x304f7a(0x519)]()['remove'](null)['filter'](_0x190a26=>_0x190a26[_0x304f7a(0x1c3)]===_0x2df7f0[_0x304f7a(0x1c3)]);if(_0x545d87[_0x304f7a(0x45a)]>=_0x181713)return![];}{const _0x2120a0=this['armors']()[_0x304f7a(0x544)](null)[_0x304f7a(0x413)](_0x255b98=>_0x255b98[_0x304f7a(0x1c3)]===_0x2df7f0['atypeId']);if(_0x2120a0[_0x304f7a(0x45a)]>0x0){let _0x2be34a=0x270f;for(const _0x1c67f8 of _0x2120a0){_0x1c67f8[_0x304f7a(0x4ff)][_0x304f7a(0x4cd)](/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i)&&(_0x2be34a=Math[_0x304f7a(0x29e)](_0x2be34a,Number(RegExp['$1'])));}if(_0x2120a0[_0x304f7a(0x45a)]>=_0x2be34a)return![];}}}return!![];},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x3ca)]=Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x305)],Game_Party[_0x4a1256(0x5b7)]['initialize']=function(){const _0x2ee051=_0x4a1256;VisuMZ[_0x2ee051(0x242)][_0x2ee051(0x3ca)][_0x2ee051(0x4f2)](this),this[_0x2ee051(0x5c6)](),this[_0x2ee051(0x23f)]();},Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x5c6)]=function(){this['_newItemsList']=[];},Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x3a9)]=function(_0xe7f9df){const _0x3eb9de=_0x4a1256;if(!$gameTemp[_0x3eb9de(0x299)]())return![];if(this[_0x3eb9de(0x487)]===undefined)this['initNewItemsList']();let _0x45e579='';if(DataManager[_0x3eb9de(0x515)](_0xe7f9df))_0x45e579='item-%1'['format'](_0xe7f9df['id']);else{if(DataManager[_0x3eb9de(0x231)](_0xe7f9df))_0x45e579=_0x3eb9de(0x2ec)['format'](_0xe7f9df['id']);else{if(DataManager[_0x3eb9de(0x560)](_0xe7f9df))_0x45e579=_0x3eb9de(0x56b)[_0x3eb9de(0x434)](_0xe7f9df['id']);else return;}}return this[_0x3eb9de(0x487)][_0x3eb9de(0x220)](_0x45e579);},Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x518)]=function(_0x33a814){const _0x28c418=_0x4a1256;if(!$gameTemp[_0x28c418(0x299)]())return;if(this['_newItemsList']===undefined)this['initNewItemsList']();let _0x347b0a='';if(DataManager['isItem'](_0x33a814))_0x347b0a=_0x28c418(0x47e)[_0x28c418(0x434)](_0x33a814['id']);else{if(DataManager['isWeapon'](_0x33a814))_0x347b0a=_0x28c418(0x2ec)[_0x28c418(0x434)](_0x33a814['id']);else{if(DataManager[_0x28c418(0x560)](_0x33a814))_0x347b0a='armor-%1'[_0x28c418(0x434)](_0x33a814['id']);else return;}}if(!this[_0x28c418(0x487)][_0x28c418(0x220)](_0x347b0a))this[_0x28c418(0x487)][_0x28c418(0x35d)](_0x347b0a);},Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x5a9)]=function(_0x720a15){const _0x13cede=_0x4a1256;if(!$gameTemp[_0x13cede(0x299)]())return;if(this[_0x13cede(0x487)]===undefined)this['initNewItemsList']();let _0x42c6b9='';if(DataManager['isItem'](_0x720a15))_0x42c6b9=_0x13cede(0x47e)[_0x13cede(0x434)](_0x720a15['id']);else{if(DataManager[_0x13cede(0x231)](_0x720a15))_0x42c6b9=_0x13cede(0x2ec)['format'](_0x720a15['id']);else{if(DataManager[_0x13cede(0x560)](_0x720a15))_0x42c6b9=_0x13cede(0x56b)['format'](_0x720a15['id']);else return;}}this[_0x13cede(0x487)][_0x13cede(0x220)](_0x42c6b9)&&this[_0x13cede(0x487)][_0x13cede(0x3e3)](this[_0x13cede(0x487)]['indexOf'](_0x42c6b9),0x1);},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x587)]=Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x317)],Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x317)]=function(_0x2e601f){const _0x22605f=_0x4a1256;if(DataManager[_0x22605f(0x5ea)](_0x2e601f))_0x2e601f=DataManager[_0x22605f(0x533)](_0x2e601f);return VisuMZ['ItemsEquipsCore'][_0x22605f(0x587)][_0x22605f(0x4f2)](this,_0x2e601f);},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x311)]=Game_Party['prototype'][_0x4a1256(0x322)],Game_Party['prototype'][_0x4a1256(0x322)]=function(_0x3d6db7,_0x95a90b,_0x1f72ae){const _0x388b58=_0x4a1256;if(DataManager[_0x388b58(0x5ea)](_0x3d6db7))_0x3d6db7=null;const _0x54dd48=this[_0x388b58(0x317)](_0x3d6db7);VisuMZ[_0x388b58(0x242)][_0x388b58(0x311)][_0x388b58(0x4f2)](this,_0x3d6db7,_0x95a90b,_0x1f72ae);if(this['numItems'](_0x3d6db7)>_0x54dd48)this[_0x388b58(0x518)](_0x3d6db7);},Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x37a)]=function(_0x50309e){const _0x2846a9=_0x4a1256;if(DataManager[_0x2846a9(0x5ea)](_0x50309e))_0x50309e=DataManager[_0x2846a9(0x533)](_0x50309e);return DataManager[_0x2846a9(0x455)](_0x50309e);},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x3f4)]=Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x5ee)],Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x5ee)]=function(_0x45d2af){const _0x142188=_0x4a1256;if(_0x45d2af){const _0x1030c0=_0x45d2af['note']||'';if(_0x1030c0[_0x142188(0x4cd)](/<(?:CONSERVE|PRESERVE):[ ](\d+)([%％])>/i)){const _0x2b254c=Number(RegExp['$1'])*0.01;if(Math[_0x142188(0x4ac)]()<_0x2b254c)return;}}VisuMZ[_0x142188(0x242)][_0x142188(0x3f4)][_0x142188(0x4f2)](this,_0x45d2af);},Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x23f)]=function(){this['_shopTrackingData']={'buy':{'gold':0x0,'items':{}},'sell':{'gold':0x0,'items':{}}};},Game_Party[_0x4a1256(0x5b7)]['getShopTrackingData']=function(){const _0x251857=_0x4a1256;return this[_0x251857(0x419)]===undefined&&this[_0x251857(0x23f)](),this[_0x251857(0x419)];},Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x480)]=function(_0x530418,_0x261165){const _0x55ec0d=_0x4a1256;if(!_0x261165)return 0x0;this[_0x55ec0d(0x419)]===undefined&&this[_0x55ec0d(0x23f)]();const _0x49ff1f=this[_0x55ec0d(0x396)]();if(!_0x49ff1f[_0x530418])return 0x0;if(_0x261165===_0x55ec0d(0x1ef))return _0x49ff1f[_0x530418][_0x55ec0d(0x1ef)]=_0x49ff1f[_0x530418][_0x55ec0d(0x1ef)]||0x0,_0x49ff1f[_0x530418][_0x55ec0d(0x1ef)];else{if(DataManager[_0x55ec0d(0x515)](_0x261165))key='item-%1'['format'](_0x261165['id']);else{if(DataManager[_0x55ec0d(0x231)](_0x261165))key=_0x55ec0d(0x2ec)[_0x55ec0d(0x434)](_0x261165['id']);else{if(DataManager[_0x55ec0d(0x560)](_0x261165))key=_0x55ec0d(0x56b)['format'](_0x261165['id']);else return 0x0;}}}return _0x49ff1f[_0x530418][_0x55ec0d(0x1fb)][key]=_0x49ff1f[_0x530418][_0x55ec0d(0x1fb)][key]||0x0,_0x49ff1f[_0x530418]['items'][key];},Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x3ae)]=function(_0x27134f){const _0x1f6b2a=_0x4a1256;return this[_0x1f6b2a(0x480)](_0x1f6b2a(0x41d),_0x27134f);},Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x461)]=function(_0x40807e){const _0x5c8720=_0x4a1256;return this[_0x5c8720(0x480)](_0x5c8720(0x3a2),_0x40807e);},Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x2ac)]=function(){const _0x4c8736=_0x4a1256;return this[_0x4c8736(0x480)](_0x4c8736(0x41d),'gold');},Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x2d8)]=function(){const _0x592a32=_0x4a1256;return this[_0x592a32(0x480)](_0x592a32(0x3a2),_0x592a32(0x1ef));},Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x41f)]=function(_0x428097,_0x241a71,_0x2c0bb6){const _0x562fbd=_0x4a1256;if(!_0x241a71)return;if(_0x2c0bb6<=0x0)return;this[_0x562fbd(0x419)]===undefined&&this[_0x562fbd(0x23f)]();const _0x3816e5=this[_0x562fbd(0x396)]();if(!_0x3816e5[_0x428097])return;if(_0x241a71===_0x562fbd(0x1ef)){_0x3816e5[_0x428097][_0x562fbd(0x1ef)]=_0x3816e5[_0x428097][_0x562fbd(0x1ef)]||0x0,_0x3816e5[_0x428097]['gold']+=_0x2c0bb6;return;}else{if(DataManager[_0x562fbd(0x515)](_0x241a71))key=_0x562fbd(0x47e)[_0x562fbd(0x434)](_0x241a71['id']);else{if(DataManager[_0x562fbd(0x231)](_0x241a71))key=_0x562fbd(0x2ec)['format'](_0x241a71['id']);else{if(DataManager[_0x562fbd(0x560)](_0x241a71))key=_0x562fbd(0x56b)[_0x562fbd(0x434)](_0x241a71['id']);else return;}}}_0x3816e5[_0x428097][_0x562fbd(0x1fb)][key]=_0x3816e5[_0x428097]['items'][key]||0x0,_0x3816e5[_0x428097][_0x562fbd(0x1fb)][key]+=_0x2c0bb6;},Game_Party[_0x4a1256(0x5b7)]['addShopTrackingItemBuy']=function(_0x2cc4e2,_0x4907da){const _0x370e47=_0x4a1256;this[_0x370e47(0x41f)](_0x370e47(0x41d),_0x2cc4e2,_0x4907da);},Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x5dc)]=function(_0x15bc1b,_0x1e5694){const _0x507169=_0x4a1256;this[_0x507169(0x41f)](_0x507169(0x3a2),_0x15bc1b,_0x1e5694);},Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x42b)]=function(_0x267dd9){const _0x59204f=_0x4a1256;this[_0x59204f(0x41f)](_0x59204f(0x41d),_0x59204f(0x1ef),_0x267dd9);},Game_Party[_0x4a1256(0x5b7)][_0x4a1256(0x599)]=function(_0x1dd71f){const _0x2d1007=_0x4a1256;this['addShopTrackingItem'](_0x2d1007(0x3a2),_0x2d1007(0x1ef),_0x1dd71f);},VisuMZ[_0x4a1256(0x242)]['Scene_ItemBase_activateItemWindow']=Scene_ItemBase['prototype']['activateItemWindow'],Scene_ItemBase['prototype'][_0x4a1256(0x3c1)]=function(){const _0x523d80=_0x4a1256;VisuMZ[_0x523d80(0x242)][_0x523d80(0x5fb)]['call'](this),this[_0x523d80(0x1c0)]['callUpdateHelp']();},Scene_Item[_0x4a1256(0x5b7)][_0x4a1256(0x457)]=function(){const _0x45ae05=_0x4a1256;if(ConfigManager[_0x45ae05(0x1c4)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager['uiHelpPosition'];else return this[_0x45ae05(0x224)]()?this[_0x45ae05(0x2b1)]()[_0x45ae05(0x4cd)](/LOWER/i):Scene_ItemBase[_0x45ae05(0x5b7)]['isBottomHelpMode'][_0x45ae05(0x4f2)](this);},Scene_Item['prototype']['isRightInputMode']=function(){const _0x282d32=_0x4a1256;if(ConfigManager[_0x282d32(0x1c4)]&&ConfigManager[_0x282d32(0x1fa)]!==undefined)return ConfigManager[_0x282d32(0x1fa)];else return this[_0x282d32(0x224)]()?this[_0x282d32(0x2b1)]()[_0x282d32(0x4cd)](/RIGHT/i):Scene_ItemBase[_0x282d32(0x5b7)][_0x282d32(0x4d7)][_0x282d32(0x4f2)](this);},Scene_Item[_0x4a1256(0x5b7)][_0x4a1256(0x2b1)]=function(){const _0x2cae4a=_0x4a1256;return VisuMZ[_0x2cae4a(0x242)][_0x2cae4a(0x4e9)][_0x2cae4a(0x408)][_0x2cae4a(0x554)];},Scene_Item[_0x4a1256(0x5b7)][_0x4a1256(0x414)]=function(){const _0x18d275=_0x4a1256;return this[_0x18d275(0x460)]&&this['_categoryWindow'][_0x18d275(0x414)]();},Scene_Item['prototype'][_0x4a1256(0x224)]=function(){const _0x1cbcb6=_0x4a1256;return VisuMZ[_0x1cbcb6(0x242)][_0x1cbcb6(0x4e9)]['ItemScene'][_0x1cbcb6(0x3a7)];},VisuMZ['ItemsEquipsCore']['Scene_Item_create']=Scene_Item[_0x4a1256(0x5b7)]['create'],Scene_Item[_0x4a1256(0x5b7)]['create']=function(){const _0x191a80=_0x4a1256;VisuMZ[_0x191a80(0x242)][_0x191a80(0x334)][_0x191a80(0x4f2)](this),this[_0x191a80(0x414)]()&&this[_0x191a80(0x268)]();},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x444)]=Scene_Item[_0x4a1256(0x5b7)]['helpWindowRect'],Scene_Item['prototype'][_0x4a1256(0x5cc)]=function(){const _0x53ef90=_0x4a1256;return this[_0x53ef90(0x224)]()?this['helpWindowRectItemsEquipsCore']():VisuMZ['ItemsEquipsCore'][_0x53ef90(0x444)][_0x53ef90(0x4f2)](this);},Scene_Item['prototype'][_0x4a1256(0x333)]=function(){const _0x2e00d9=_0x4a1256,_0x1469f0=0x0,_0x573b20=this[_0x2e00d9(0x2ed)](),_0x2ce255=Graphics['boxWidth'],_0x2578e5=this[_0x2e00d9(0x427)]();return new Rectangle(_0x1469f0,_0x573b20,_0x2ce255,_0x2578e5);},VisuMZ[_0x4a1256(0x242)]['Scene_Item_createCategoryWindow']=Scene_Item[_0x4a1256(0x5b7)][_0x4a1256(0x20e)],Scene_Item[_0x4a1256(0x5b7)][_0x4a1256(0x20e)]=function(){const _0x942264=_0x4a1256;VisuMZ['ItemsEquipsCore'][_0x942264(0x298)][_0x942264(0x4f2)](this),this[_0x942264(0x414)]()&&this[_0x942264(0x481)]();},Scene_Item[_0x4a1256(0x5b7)][_0x4a1256(0x481)]=function(){const _0xbe6f4b=_0x4a1256;delete this['_categoryWindow'][_0xbe6f4b(0x56e)]['ok'],delete this[_0xbe6f4b(0x460)][_0xbe6f4b(0x56e)][_0xbe6f4b(0x249)];},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x512)]=Scene_Item[_0x4a1256(0x5b7)][_0x4a1256(0x510)],Scene_Item['prototype'][_0x4a1256(0x510)]=function(){const _0x35e5d5=_0x4a1256;return this[_0x35e5d5(0x224)]()?this[_0x35e5d5(0x380)]():VisuMZ[_0x35e5d5(0x242)][_0x35e5d5(0x512)][_0x35e5d5(0x4f2)](this);},Scene_Item[_0x4a1256(0x5b7)][_0x4a1256(0x380)]=function(){const _0x5a05cc=0x0,_0x2f134b=this['mainAreaTop'](),_0x4887de=Graphics['boxWidth'],_0x5872d2=this['calcWindowHeight'](0x1,!![]);return new Rectangle(_0x5a05cc,_0x2f134b,_0x4887de,_0x5872d2);},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x4e8)]=Scene_Item['prototype'][_0x4a1256(0x245)],Scene_Item[_0x4a1256(0x5b7)][_0x4a1256(0x245)]=function(){const _0xd12e86=_0x4a1256;VisuMZ[_0xd12e86(0x242)][_0xd12e86(0x4e8)][_0xd12e86(0x4f2)](this),this[_0xd12e86(0x414)]()&&this['postCreateItemWindowModernControls'](),this['allowCreateStatusWindow']()&&this[_0xd12e86(0x4b8)]();},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x5ba)]=Scene_Item[_0x4a1256(0x5b7)][_0x4a1256(0x4bf)],Scene_Item[_0x4a1256(0x5b7)][_0x4a1256(0x4bf)]=function(){const _0x20dd4e=_0x4a1256;if(this[_0x20dd4e(0x224)]())return this[_0x20dd4e(0x28c)]();else{const _0x1ee549=VisuMZ[_0x20dd4e(0x242)][_0x20dd4e(0x5ba)]['call'](this);return this[_0x20dd4e(0x3f0)]()&&this[_0x20dd4e(0x5a5)]()&&(_0x1ee549['width']-=this[_0x20dd4e(0x583)]()),_0x1ee549;}},Scene_Item[_0x4a1256(0x5b7)][_0x4a1256(0x28c)]=function(){const _0x386327=_0x4a1256,_0x6a0574=this[_0x386327(0x4d7)]()?this['statusWidth']():0x0,_0x306f46=this[_0x386327(0x460)]['y']+this[_0x386327(0x460)]['height'],_0xd56dac=Graphics[_0x386327(0x59e)]-this[_0x386327(0x583)](),_0x330b3b=this[_0x386327(0x2a1)]()-_0x306f46;return new Rectangle(_0x6a0574,_0x306f46,_0xd56dac,_0x330b3b);},Scene_Item[_0x4a1256(0x5b7)][_0x4a1256(0x33c)]=function(){const _0x2ad7d5=_0x4a1256;this['_itemWindow']['setHandler']('cancel',this[_0x2ad7d5(0x4ad)][_0x2ad7d5(0x3f1)](this));},Scene_Item[_0x4a1256(0x5b7)]['allowCreateStatusWindow']=function(){const _0x550ec1=_0x4a1256;return this[_0x550ec1(0x224)]()?!![]:VisuMZ['ItemsEquipsCore'][_0x550ec1(0x4e9)]['ItemScene'][_0x550ec1(0x520)];},Scene_Item[_0x4a1256(0x5b7)][_0x4a1256(0x5a5)]=function(){const _0x7c8922=_0x4a1256;return VisuMZ[_0x7c8922(0x242)][_0x7c8922(0x4e9)][_0x7c8922(0x408)][_0x7c8922(0x41c)];},Scene_Item['prototype'][_0x4a1256(0x4b8)]=function(){const _0x183e1f=_0x4a1256,_0x5c90d1=this['statusWindowRect']();this[_0x183e1f(0x474)]=new Window_ShopStatus(_0x5c90d1),this['addWindow'](this[_0x183e1f(0x474)]),this[_0x183e1f(0x1c0)][_0x183e1f(0x514)](this[_0x183e1f(0x474)]);const _0x9de349=VisuMZ[_0x183e1f(0x242)][_0x183e1f(0x4e9)]['ItemScene']['ItemMenuStatusBgType'];this[_0x183e1f(0x474)][_0x183e1f(0x2b6)](_0x9de349||0x0);},Scene_Item[_0x4a1256(0x5b7)]['statusWindowRect']=function(){const _0x48fa5f=_0x4a1256;return this[_0x48fa5f(0x224)]()?this[_0x48fa5f(0x2f3)]():VisuMZ[_0x48fa5f(0x242)]['Settings'][_0x48fa5f(0x408)]['ItemMenuStatusRect'][_0x48fa5f(0x4f2)](this);},Scene_Item['prototype'][_0x4a1256(0x2f3)]=function(){const _0x2af87f=_0x4a1256,_0x37103f=this[_0x2af87f(0x583)](),_0x30360b=this[_0x2af87f(0x1c0)][_0x2af87f(0x1d9)],_0x5bac68=this[_0x2af87f(0x4d7)]()?0x0:Graphics[_0x2af87f(0x59e)]-this['statusWidth'](),_0x1b75f1=this['_itemWindow']['y'];return new Rectangle(_0x5bac68,_0x1b75f1,_0x37103f,_0x30360b);},Scene_Item['prototype'][_0x4a1256(0x583)]=function(){const _0x3f7803=_0x4a1256;return Scene_Shop[_0x3f7803(0x5b7)][_0x3f7803(0x583)]();},Scene_Item['prototype'][_0x4a1256(0x3b9)]=function(){const _0x8abc76=_0x4a1256;if(!this[_0x8abc76(0x2b1)]())return![];if(!this[_0x8abc76(0x414)]())return![];if(!this[_0x8abc76(0x1c0)])return![];if(!this[_0x8abc76(0x1c0)][_0x8abc76(0x375)])return![];return this[_0x8abc76(0x2b1)]()&&this[_0x8abc76(0x414)]();},Scene_Item['prototype']['buttonAssistKey1']=function(){const _0x5c9cce=_0x4a1256;if(this[_0x5c9cce(0x3b9)]())return this[_0x5c9cce(0x1c0)][_0x5c9cce(0x1ea)]()===0x1?TextManager['getInputMultiButtonStrings'](_0x5c9cce(0x2b0),'right'):TextManager['getInputMultiButtonStrings'](_0x5c9cce(0x2ae),_0x5c9cce(0x5e5));return Scene_ItemBase['prototype'][_0x5c9cce(0x47f)][_0x5c9cce(0x4f2)](this);},Scene_Item[_0x4a1256(0x5b7)]['buttonAssistText1']=function(){const _0x2e488e=_0x4a1256;if(this[_0x2e488e(0x3b9)]())return VisuMZ[_0x2e488e(0x242)]['Settings'][_0x2e488e(0x408)][_0x2e488e(0x1b3)];return Scene_ItemBase[_0x2e488e(0x5b7)][_0x2e488e(0x203)][_0x2e488e(0x4f2)](this);},Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x344)]=function(){const _0x8d0e2f=_0x4a1256;Scene_ItemBase[_0x8d0e2f(0x5b7)][_0x8d0e2f(0x344)][_0x8d0e2f(0x4f2)](this),this[_0x8d0e2f(0x5a8)]();},Scene_Equip[_0x4a1256(0x5b7)]['isBottomHelpMode']=function(){const _0x1abca7=_0x4a1256;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x1abca7(0x5d4)]!==undefined)return ConfigManager[_0x1abca7(0x5d4)];else{if(this[_0x1abca7(0x224)]())return this['updatedLayoutStyle']()['match'](/LOWER/i);else Scene_MenuBase[_0x1abca7(0x5b7)]['isRightInputMode']['call'](this);}},Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x4d7)]=function(){const _0x2e384d=_0x4a1256;if(ConfigManager[_0x2e384d(0x1c4)]&&ConfigManager[_0x2e384d(0x1fa)]!==undefined)return ConfigManager['uiInputPosition'];else{if(this[_0x2e384d(0x224)]())return this['updatedLayoutStyle']()[_0x2e384d(0x4cd)](/RIGHT/i);else Scene_MenuBase[_0x2e384d(0x5b7)][_0x2e384d(0x4d7)][_0x2e384d(0x4f2)](this);}},Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x2b1)]=function(){const _0x5b7bb0=_0x4a1256;return VisuMZ['ItemsEquipsCore'][_0x5b7bb0(0x4e9)][_0x5b7bb0(0x34e)][_0x5b7bb0(0x554)];},Scene_Equip['prototype'][_0x4a1256(0x414)]=function(){const _0x195dbc=_0x4a1256;return this[_0x195dbc(0x236)]&&this[_0x195dbc(0x236)][_0x195dbc(0x414)]();},Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x224)]=function(){const _0x50df87=_0x4a1256;return VisuMZ[_0x50df87(0x242)][_0x50df87(0x4e9)]['EquipScene'][_0x50df87(0x3a7)];},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x3e5)]=Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x590)],Scene_Equip['prototype']['create']=function(){const _0x224216=_0x4a1256;VisuMZ[_0x224216(0x242)][_0x224216(0x3e5)]['call'](this),this[_0x224216(0x414)]()&&this[_0x224216(0x20b)]();},VisuMZ[_0x4a1256(0x242)]['Scene_Equip_helpWindowRect']=Scene_Equip['prototype'][_0x4a1256(0x5cc)],Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x5cc)]=function(){const _0xfc0fc3=_0x4a1256;return this[_0xfc0fc3(0x224)]()?this[_0xfc0fc3(0x333)]():VisuMZ[_0xfc0fc3(0x242)][_0xfc0fc3(0x279)][_0xfc0fc3(0x4f2)](this);},Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x333)]=function(){const _0x46a9d9=_0x4a1256,_0x566dfa=0x0,_0x1a96f2=this[_0x46a9d9(0x2ed)](),_0x5b9491=Graphics[_0x46a9d9(0x59e)],_0x5bc716=this[_0x46a9d9(0x427)]();return new Rectangle(_0x566dfa,_0x1a96f2,_0x5b9491,_0x5bc716);},VisuMZ[_0x4a1256(0x242)]['Scene_Equip_statusWindowRect']=Scene_Equip['prototype']['statusWindowRect'],Scene_Equip['prototype'][_0x4a1256(0x57a)]=function(){const _0x493d6f=_0x4a1256;return this[_0x493d6f(0x224)]()?this['statusWindowRectItemsEquipsCore']():VisuMZ['ItemsEquipsCore'][_0x493d6f(0x4a7)][_0x493d6f(0x4f2)](this);},Scene_Equip['prototype'][_0x4a1256(0x2f3)]=function(){const _0x53caa6=_0x4a1256,_0x188696=this[_0x53caa6(0x4d7)]()?0x0:Graphics[_0x53caa6(0x59e)]-this[_0x53caa6(0x583)](),_0x466d14=this['mainAreaTop'](),_0x1c9036=this[_0x53caa6(0x583)](),_0x2bdbeb=this[_0x53caa6(0x467)]();return new Rectangle(_0x188696,_0x466d14,_0x1c9036,_0x2bdbeb);},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x5c2)]=Scene_Equip['prototype'][_0x4a1256(0x43d)],Scene_Equip['prototype']['createCommandWindow']=function(){const _0xccd104=_0x4a1256;VisuMZ[_0xccd104(0x242)]['Scene_Equip_createCommandWindow'][_0xccd104(0x4f2)](this);if(this[_0xccd104(0x5d5)])this[_0xccd104(0x236)][_0xccd104(0x5c3)](this[_0xccd104(0x5d5)]);},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x545)]=Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x352)],Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x352)]=function(){const _0x29f29f=_0x4a1256;return this[_0x29f29f(0x224)]()?this[_0x29f29f(0x5c7)]():VisuMZ[_0x29f29f(0x242)]['Scene_Equip_commandWindowRect']['call'](this);},Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x501)]=function(){const _0x50190c=_0x4a1256,_0x234604=VisuMZ[_0x50190c(0x242)][_0x50190c(0x4e9)]['EquipScene'];return _0x234604[_0x50190c(0x2fa)]||_0x234604[_0x50190c(0x502)];},Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x5c7)]=function(){const _0x3eec0f=_0x4a1256,_0x139d10=this[_0x3eec0f(0x501)](),_0x10c53d=this[_0x3eec0f(0x4d7)]()?this[_0x3eec0f(0x583)]():0x0,_0x25b87d=this[_0x3eec0f(0x21e)](),_0x6ba118=Graphics[_0x3eec0f(0x59e)]-this[_0x3eec0f(0x583)](),_0xf1ff1b=_0x139d10?this[_0x3eec0f(0x1e9)](0x1,!![]):0x0;return new Rectangle(_0x10c53d,_0x25b87d,_0x6ba118,_0xf1ff1b);},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x51e)]=Scene_Equip['prototype'][_0x4a1256(0x428)],Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x428)]=function(){const _0x5098e2=_0x4a1256;VisuMZ[_0x5098e2(0x242)][_0x5098e2(0x51e)][_0x5098e2(0x4f2)](this),this[_0x5098e2(0x414)]()&&this[_0x5098e2(0x228)]();},VisuMZ[_0x4a1256(0x242)]['Scene_Equip_slotWindowRect']=Scene_Equip[_0x4a1256(0x5b7)]['slotWindowRect'],Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x49c)]=function(){const _0x4c5de5=_0x4a1256;return this[_0x4c5de5(0x224)]()?this[_0x4c5de5(0x3bc)]():VisuMZ['ItemsEquipsCore'][_0x4c5de5(0x21a)][_0x4c5de5(0x4f2)](this);},Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x3bc)]=function(){const _0x2bd200=_0x4a1256,_0x1b9923=this[_0x2bd200(0x352)](),_0x577e3b=this[_0x2bd200(0x4d7)]()?this['statusWidth']():0x0,_0x4096a3=_0x1b9923['y']+_0x1b9923['height'],_0x7a582d=Graphics['boxWidth']-this['statusWidth'](),_0xd849b8=this[_0x2bd200(0x467)]()-_0x1b9923[_0x2bd200(0x1d9)];return new Rectangle(_0x577e3b,_0x4096a3,_0x7a582d,_0xd849b8);},VisuMZ[_0x4a1256(0x242)]['Scene_Equip_itemWindowRect']=Scene_Equip[_0x4a1256(0x5b7)]['itemWindowRect'],Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x4bf)]=function(){const _0xf4b259=_0x4a1256;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['slotWindowRect']():VisuMZ[_0xf4b259(0x242)]['Scene_Equip_itemWindowRect'][_0xf4b259(0x4f2)](this);},Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x583)]=function(){const _0xe7b3e2=_0x4a1256;return this[_0xe7b3e2(0x224)]()?this[_0xe7b3e2(0x5f6)]():VisuMZ[_0xe7b3e2(0x242)][_0xe7b3e2(0x4e9)]['EquipScene'][_0xe7b3e2(0x383)];},Scene_Equip[_0x4a1256(0x5b7)]['geUpdatedLayoutStatusWidth']=function(){const _0x7d71dc=_0x4a1256;return Math[_0x7d71dc(0x21d)](Graphics[_0x7d71dc(0x59e)]/0x2);},Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x228)]=function(){const _0x35752d=_0x4a1256;this[_0x35752d(0x211)][_0x35752d(0x2ab)](_0x35752d(0x249),this[_0x35752d(0x4ad)][_0x35752d(0x3f1)](this)),this[_0x35752d(0x211)]['setHandler']('pagedown',this[_0x35752d(0x5e7)]['bind'](this)),this['_slotWindow']['setHandler'](_0x35752d(0x2ae),this[_0x35752d(0x37c)][_0x35752d(0x3f1)](this));},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x479)]=Scene_Equip['prototype'][_0x4a1256(0x20b)],Scene_Equip['prototype'][_0x4a1256(0x20b)]=function(){const _0x33dcf=_0x4a1256;this[_0x33dcf(0x414)]()&&(this[_0x33dcf(0x236)][_0x33dcf(0x5c4)](),this[_0x33dcf(0x236)][_0x33dcf(0x4f5)]()),VisuMZ['ItemsEquipsCore'][_0x33dcf(0x479)][_0x33dcf(0x4f2)](this);},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x471)]=Scene_Equip[_0x4a1256(0x5b7)]['onSlotOk'],Scene_Equip[_0x4a1256(0x5b7)]['onSlotOk']=function(){const _0x193b66=_0x4a1256;this[_0x193b66(0x211)][_0x193b66(0x1f9)]()>=0x0?(VisuMZ[_0x193b66(0x242)][_0x193b66(0x471)][_0x193b66(0x4f2)](this),this[_0x193b66(0x5c9)]()):(this['_slotWindow'][_0x193b66(0x584)](0x0),this[_0x193b66(0x211)][_0x193b66(0x308)]());},Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x5c9)]=function(){const _0x2c5642=_0x4a1256;this[_0x2c5642(0x1c0)][_0x2c5642(0x39d)]();const _0x33c256=this[_0x2c5642(0x211)][_0x2c5642(0x3a5)](),_0x4d5508=this[_0x2c5642(0x1c0)][_0x2c5642(0x4c1)]['indexOf'](_0x33c256),_0x547e58=Math['floor'](this['_itemWindow'][_0x2c5642(0x364)]()/0x2)-0x1;this[_0x2c5642(0x1c0)][_0x2c5642(0x584)](_0x4d5508>=0x0?_0x4d5508:0x0),this[_0x2c5642(0x1c0)][_0x2c5642(0x2e4)]>0x1&&(this[_0x2c5642(0x1c0)]['_scrollDuration']=0x1,this[_0x2c5642(0x1c0)][_0x2c5642(0x2f8)]()),this['_itemWindow'][_0x2c5642(0x563)](this[_0x2c5642(0x1c0)]['index']()-_0x547e58);},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x34c)]=Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x1f6)],Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x1f6)]=function(){const _0x506aa5=_0x4a1256;VisuMZ[_0x506aa5(0x242)][_0x506aa5(0x34c)]['call'](this),this[_0x506aa5(0x414)]()&&(this['_commandWindow'][_0x506aa5(0x584)](0x0),this[_0x506aa5(0x211)][_0x506aa5(0x4f5)]());},VisuMZ[_0x4a1256(0x242)]['Scene_Equip_onActorChange']=Scene_Equip['prototype']['onActorChange'],Scene_Equip[_0x4a1256(0x5b7)]['onActorChange']=function(){const _0x39826f=_0x4a1256;VisuMZ[_0x39826f(0x242)][_0x39826f(0x1dc)]['call'](this),this[_0x39826f(0x414)]()&&(this[_0x39826f(0x236)][_0x39826f(0x4f5)](),this[_0x39826f(0x236)]['deselect'](),this[_0x39826f(0x211)][_0x39826f(0x584)](0x0),this[_0x39826f(0x211)][_0x39826f(0x308)]());},Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x21f)]=function(){const _0x4db2a4=_0x4a1256;if(!this['_slotWindow'])return![];if(!this[_0x4db2a4(0x211)][_0x4db2a4(0x375)])return![];return this['_slotWindow'][_0x4db2a4(0x4c6)]();},Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x219)]=function(){const _0x4f480d=_0x4a1256;if(this[_0x4f480d(0x21f)]())return TextManager[_0x4f480d(0x55f)](_0x4f480d(0x44a));return Scene_MenuBase[_0x4f480d(0x5b7)][_0x4f480d(0x219)][_0x4f480d(0x4f2)](this);},Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x29b)]=function(){const _0x38ddf2=_0x4a1256;if(this[_0x38ddf2(0x21f)]())return VisuMZ[_0x38ddf2(0x242)][_0x38ddf2(0x4e9)][_0x38ddf2(0x34e)][_0x38ddf2(0x277)];return Scene_MenuBase[_0x38ddf2(0x5b7)]['buttonAssistText3']['call'](this);},Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x278)]=function(){const _0x4217a2=_0x4a1256;if(this[_0x4217a2(0x21f)]())return this[_0x4217a2(0x4e5)]['width']/0x5/-0x3;return Scene_MenuBase['prototype']['buttonAssistOffset3'][_0x4217a2(0x4f2)](this);},Scene_Equip[_0x4a1256(0x5b7)][_0x4a1256(0x4ad)]=function(){const _0x338831=_0x4a1256;SceneManager[_0x338831(0x418)]();},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x230)]=Scene_Load[_0x4a1256(0x5b7)][_0x4a1256(0x39c)],Scene_Load[_0x4a1256(0x5b7)][_0x4a1256(0x39c)]=function(){const _0x4876aa=_0x4a1256;VisuMZ['ItemsEquipsCore'][_0x4876aa(0x230)][_0x4876aa(0x4f2)](this),this[_0x4876aa(0x54e)]();},Scene_Load['prototype'][_0x4a1256(0x54e)]=function(){const _0xe05cb0=_0x4a1256;if($gameSystem['versionId']()!==$dataSystem[_0xe05cb0(0x5eb)])for(const _0x32214e of $gameActors[_0xe05cb0(0x4c1)]){if(_0x32214e)_0x32214e[_0xe05cb0(0x289)]();}},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x457)]=function(){const _0x1feb46=_0x4a1256;if(ConfigManager[_0x1feb46(0x1c4)]&&ConfigManager[_0x1feb46(0x5d4)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x1feb46(0x224)]())return this[_0x1feb46(0x2b1)]()['match'](/LOWER/i);else Scene_MenuBase[_0x1feb46(0x5b7)][_0x1feb46(0x4d7)]['call'](this);}},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x4d7)]=function(){const _0x2492ff=_0x4a1256;if(ConfigManager[_0x2492ff(0x1c4)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x2492ff(0x1fa)];else{if(this[_0x2492ff(0x224)]())return this[_0x2492ff(0x2b1)]()[_0x2492ff(0x4cd)](/RIGHT/i);else Scene_MenuBase[_0x2492ff(0x5b7)]['isRightInputMode'][_0x2492ff(0x4f2)](this);}},Scene_Shop['prototype'][_0x4a1256(0x2b1)]=function(){const _0x50d64f=_0x4a1256;return VisuMZ[_0x50d64f(0x242)]['Settings'][_0x50d64f(0x4ce)][_0x50d64f(0x554)];},Scene_Shop['prototype']['isUseModernControls']=function(){const _0x3cd4d5=_0x4a1256;return this[_0x3cd4d5(0x460)]&&this[_0x3cd4d5(0x460)][_0x3cd4d5(0x414)]();},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x224)]=function(){const _0x3a106d=_0x4a1256;return VisuMZ[_0x3a106d(0x242)][_0x3a106d(0x4e9)][_0x3a106d(0x4ce)][_0x3a106d(0x3a7)];},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x5ca)]=Scene_Shop['prototype'][_0x4a1256(0x336)],Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x336)]=function(_0x55e116,_0x5c3d2a){const _0x414511=_0x4a1256;_0x55e116=VisuMZ[_0x414511(0x242)][_0x414511(0x431)](_0x55e116),VisuMZ[_0x414511(0x242)][_0x414511(0x5ca)]['call'](this,_0x55e116,_0x5c3d2a),this[_0x414511(0x2d4)]();},Scene_Shop[_0x4a1256(0x5b7)]['adjustHiddenShownGoods']=function(){const _0x564d25=_0x4a1256;this[_0x564d25(0x3ee)]=0x0;const _0x20c2bf=[];for(const _0x4c56ca of this['_goods']){this[_0x564d25(0x36a)](_0x4c56ca)?this['_goodsCount']++:_0x20c2bf[_0x564d25(0x35d)](_0x4c56ca);}for(const _0x4eaf28 of _0x20c2bf){this[_0x564d25(0x314)]['remove'](_0x4eaf28);}},Scene_Shop['prototype'][_0x4a1256(0x36a)]=function(_0xfd88ac){if(_0xfd88ac[0x0]>0x2||_0xfd88ac[0x0]<0x0)return![];const _0xbf9440=[$dataItems,$dataWeapons,$dataArmors][_0xfd88ac[0x0]][_0xfd88ac[0x1]];if(!_0xbf9440)return![];return!![];},VisuMZ[_0x4a1256(0x242)]['Scene_Shop_create']=Scene_Shop['prototype'][_0x4a1256(0x590)],Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x590)]=function(){const _0x1d7818=_0x4a1256;VisuMZ[_0x1d7818(0x242)][_0x1d7818(0x5fe)][_0x1d7818(0x4f2)](this),this[_0x1d7818(0x224)]()&&this[_0x1d7818(0x2e8)](),this[_0x1d7818(0x49e)]();},Scene_Shop['prototype'][_0x4a1256(0x2e8)]=function(){const _0x816119=_0x4a1256;this[_0x816119(0x46c)][_0x816119(0x377)](),this[_0x816119(0x3d8)][_0x816119(0x4ba)](),this['_buyWindow'][_0x816119(0x5c4)](),this['_statusWindow']['show']();},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x2e1)]=Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x5cc)],Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x5cc)]=function(){const _0x32081d=_0x4a1256;return this[_0x32081d(0x224)]()?this[_0x32081d(0x333)]():VisuMZ[_0x32081d(0x242)][_0x32081d(0x2e1)]['call'](this);},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x333)]=function(){const _0x3295eb=_0x4a1256,_0x5d46a7=0x0,_0x279b7a=this[_0x3295eb(0x2ed)](),_0x204f5b=Graphics['boxWidth'],_0x2af70c=this['helpAreaHeight']();return new Rectangle(_0x5d46a7,_0x279b7a,_0x204f5b,_0x2af70c);},VisuMZ[_0x4a1256(0x242)]['Scene_Shop_goldWindowRect']=Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x51f)],Scene_Shop['prototype']['goldWindowRect']=function(){const _0x2f7986=_0x4a1256;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x2f7986(0x1ed)]():VisuMZ[_0x2f7986(0x242)]['Scene_Shop_goldWindowRect'][_0x2f7986(0x4f2)](this);},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x1ed)]=function(){const _0x27337c=_0x4a1256,_0x21fd90=this[_0x27337c(0x561)](),_0x1c46bc=this[_0x27337c(0x1e9)](0x1,!![]),_0x3ad569=this['isRightInputMode']()?0x0:Graphics[_0x27337c(0x59e)]-_0x21fd90,_0x4e60cb=this[_0x27337c(0x21e)]();return new Rectangle(_0x3ad569,_0x4e60cb,_0x21fd90,_0x1c46bc);},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x2ad)]=Scene_Shop[_0x4a1256(0x5b7)]['commandWindowRect'],Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x352)]=function(){const _0x4b41bd=_0x4a1256;return this[_0x4b41bd(0x224)]()?this[_0x4b41bd(0x5c7)]():VisuMZ[_0x4b41bd(0x242)][_0x4b41bd(0x2ad)][_0x4b41bd(0x4f2)](this);},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x5c7)]=function(){const _0x23382d=_0x4a1256,_0x23ea18=this[_0x23382d(0x4d7)]()?this[_0x23382d(0x561)]():0x0,_0x39694d=this[_0x23382d(0x21e)](),_0xdd8b7a=Graphics['boxWidth']-this[_0x23382d(0x561)](),_0x2ae5d9=this[_0x23382d(0x1e9)](0x1,!![]);return new Rectangle(_0x23ea18,_0x39694d,_0xdd8b7a,_0x2ae5d9);},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x530)]=Scene_Shop['prototype'][_0x4a1256(0x5a2)],Scene_Shop['prototype'][_0x4a1256(0x5a2)]=function(){const _0x3ba215=_0x4a1256;return this[_0x3ba215(0x224)]()?this['numberWindowRectItemsEquipsCore']():VisuMZ[_0x3ba215(0x242)][_0x3ba215(0x530)][_0x3ba215(0x4f2)](this);},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x1b4)]=function(){const _0x104edc=_0x4a1256,_0x3bf37c=this[_0x104edc(0x236)]['y']+this[_0x104edc(0x236)][_0x104edc(0x1d9)],_0x1e7bd5=Graphics[_0x104edc(0x59e)]-this[_0x104edc(0x583)](),_0x52c6a4=this[_0x104edc(0x4d7)]()?Graphics['boxWidth']-_0x1e7bd5:0x0,_0x2e89c8=this[_0x104edc(0x467)]()-this['_commandWindow'][_0x104edc(0x1d9)];return new Rectangle(_0x52c6a4,_0x3bf37c,_0x1e7bd5,_0x2e89c8);},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x35e)]=Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x57a)],Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x57a)]=function(){const _0x2233c8=_0x4a1256;return this[_0x2233c8(0x224)]()?this[_0x2233c8(0x2f3)]():VisuMZ['ItemsEquipsCore'][_0x2233c8(0x35e)][_0x2233c8(0x4f2)](this);},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x2f3)]=function(){const _0x599126=_0x4a1256,_0x23fa15=this[_0x599126(0x583)](),_0x42d949=this[_0x599126(0x467)]()-this[_0x599126(0x236)]['height'],_0xe1a24=this[_0x599126(0x4d7)]()?0x0:Graphics['boxWidth']-_0x23fa15,_0x472e2f=this[_0x599126(0x236)]['y']+this['_commandWindow'][_0x599126(0x1d9)];return new Rectangle(_0xe1a24,_0x472e2f,_0x23fa15,_0x42d949);},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x2d2)]=Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x1e2)],Scene_Shop[_0x4a1256(0x5b7)]['buyWindowRect']=function(){const _0x5e6eb3=_0x4a1256;return this[_0x5e6eb3(0x224)]()?this['buyWindowRectItemsEquipsCore']():VisuMZ[_0x5e6eb3(0x242)][_0x5e6eb3(0x2d2)][_0x5e6eb3(0x4f2)](this);},Scene_Shop[_0x4a1256(0x5b7)]['buyWindowRectItemsEquipsCore']=function(){const _0x1f5a17=_0x4a1256,_0xc25a03=this[_0x1f5a17(0x236)]['y']+this[_0x1f5a17(0x236)][_0x1f5a17(0x1d9)],_0x3c1ba2=Graphics[_0x1f5a17(0x59e)]-this['statusWidth'](),_0x11a37e=this['mainAreaHeight']()-this['_commandWindow']['height'],_0x3ab601=this['isRightInputMode']()?Graphics[_0x1f5a17(0x59e)]-_0x3c1ba2:0x0;return new Rectangle(_0x3ab601,_0xc25a03,_0x3c1ba2,_0x11a37e);},VisuMZ['ItemsEquipsCore']['Scene_Shop_createCategoryWindow']=Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x20e)],Scene_Shop['prototype'][_0x4a1256(0x20e)]=function(){const _0x172fa8=_0x4a1256;VisuMZ[_0x172fa8(0x242)]['Scene_Shop_createCategoryWindow'][_0x172fa8(0x4f2)](this),this[_0x172fa8(0x414)]()&&this[_0x172fa8(0x481)]();},VisuMZ[_0x4a1256(0x242)]['Scene_Shop_categoryWindowRect']=Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x510)],Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x510)]=function(){const _0x4ccbf2=_0x4a1256;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['categoryWindowRectItemsEquipsCore']():VisuMZ[_0x4ccbf2(0x242)]['Scene_Shop_categoryWindowRect'][_0x4ccbf2(0x4f2)](this);},Scene_Shop['prototype']['categoryWindowRectItemsEquipsCore']=function(){const _0x3ecefb=_0x4a1256,_0x4c60aa=this[_0x3ecefb(0x236)]['y'],_0x2a6e36=this[_0x3ecefb(0x236)][_0x3ecefb(0x597)],_0x2d852a=this[_0x3ecefb(0x1e9)](0x1,!![]),_0x145cad=this[_0x3ecefb(0x4d7)]()?Graphics[_0x3ecefb(0x59e)]-_0x2a6e36:0x0;return new Rectangle(_0x145cad,_0x4c60aa,_0x2a6e36,_0x2d852a);},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x481)]=function(){const _0x4a06d8=_0x4a1256;delete this['_categoryWindow']['_handlers']['ok'],delete this[_0x4a06d8(0x460)]['_handlers'][_0x4a06d8(0x249)];},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x1f0)]=Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x31d)],Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x31d)]=function(){const _0x5a2bef=_0x4a1256;VisuMZ[_0x5a2bef(0x242)][_0x5a2bef(0x1f0)][_0x5a2bef(0x4f2)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x5a2bef(0x459)]();},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x27e)]=Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x410)],Scene_Shop[_0x4a1256(0x5b7)]['sellWindowRect']=function(){const _0x5ce296=_0x4a1256;return this[_0x5ce296(0x224)]()?this['sellWindowRectItemsEquipsCore']():VisuMZ[_0x5ce296(0x242)][_0x5ce296(0x27e)][_0x5ce296(0x4f2)](this);},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x357)]=function(){const _0x57b63d=_0x4a1256,_0x5a0854=this['_categoryWindow']['y']+this[_0x57b63d(0x460)][_0x57b63d(0x1d9)],_0xae049d=Graphics['boxWidth']-this[_0x57b63d(0x583)](),_0x488873=this['mainAreaHeight']()-this[_0x57b63d(0x460)][_0x57b63d(0x1d9)],_0x5d8c29=this[_0x57b63d(0x4d7)]()?Graphics[_0x57b63d(0x59e)]-_0xae049d:0x0;return new Rectangle(_0x5d8c29,_0x5a0854,_0xae049d,_0x488873);},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x459)]=function(){const _0x58e28d=_0x4a1256;this['_sellWindow'][_0x58e28d(0x514)](this[_0x58e28d(0x474)]);},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x583)]=function(){const _0x2a12f6=_0x4a1256;return VisuMZ[_0x2a12f6(0x242)]['Settings'][_0x2a12f6(0x53d)][_0x2a12f6(0x49d)];},VisuMZ[_0x4a1256(0x242)]['Scene_Shop_activateSellWindow']=Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x4aa)],Scene_Shop[_0x4a1256(0x5b7)]['activateSellWindow']=function(){const _0xa5e7b3=_0x4a1256;VisuMZ[_0xa5e7b3(0x242)][_0xa5e7b3(0x232)][_0xa5e7b3(0x4f2)](this),this[_0xa5e7b3(0x224)]()&&this[_0xa5e7b3(0x474)][_0xa5e7b3(0x4ba)](),this[_0xa5e7b3(0x4ca)][_0xa5e7b3(0x1ec)]();},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x59d)]=Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x57e)],Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x57e)]=function(){const _0x162250=_0x4a1256;VisuMZ[_0x162250(0x242)][_0x162250(0x59d)]['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x162250(0x31c)]();},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x31c)]=function(){const _0x27c4b8=_0x4a1256;this['_buyWindowLastIndex']=this[_0x27c4b8(0x43f)]||0x0,this[_0x27c4b8(0x3d8)][_0x27c4b8(0x584)](this[_0x27c4b8(0x43f)]);},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x5e9)]=Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x5af)],Scene_Shop['prototype']['commandSell']=function(){const _0x48a42b=_0x4a1256;VisuMZ[_0x48a42b(0x242)][_0x48a42b(0x5e9)][_0x48a42b(0x4f2)](this),this[_0x48a42b(0x224)]()&&this[_0x48a42b(0x588)](),this['isUseModernControls']()&&(this[_0x48a42b(0x460)][_0x48a42b(0x584)](0x0),this[_0x48a42b(0x268)]());},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x588)]=function(){const _0x10e7ac=_0x4a1256;this['_buyWindow'][_0x10e7ac(0x377)](),this[_0x10e7ac(0x236)][_0x10e7ac(0x377)]();},VisuMZ[_0x4a1256(0x242)]['Scene_Shop_onBuyCancel']=Scene_Shop[_0x4a1256(0x5b7)]['onBuyCancel'],Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x356)]=function(){const _0x343671=_0x4a1256;VisuMZ[_0x343671(0x242)][_0x343671(0x5f7)][_0x343671(0x4f2)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x343671(0x4e0)]();},Scene_Shop['prototype'][_0x4a1256(0x4e0)]=function(){const _0x1dc9f9=_0x4a1256;this[_0x1dc9f9(0x43f)]=this['_buyWindow']['index'](),this[_0x1dc9f9(0x3d8)]['show'](),this[_0x1dc9f9(0x3d8)][_0x1dc9f9(0x5c4)](),this[_0x1dc9f9(0x3d8)][_0x1dc9f9(0x458)](0x0,0x0),this['_statusWindow'][_0x1dc9f9(0x4ba)](),this['_dummyWindow']['hide']();},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x24c)]=Scene_Shop[_0x4a1256(0x5b7)]['onCategoryCancel'],Scene_Shop[_0x4a1256(0x5b7)]['onCategoryCancel']=function(){const _0x2faca6=_0x4a1256;VisuMZ['ItemsEquipsCore'][_0x2faca6(0x24c)][_0x2faca6(0x4f2)](this),this[_0x2faca6(0x224)]()&&this[_0x2faca6(0x440)]();},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x440)]=function(){const _0x4643d7=_0x4a1256;this[_0x4643d7(0x3d8)][_0x4643d7(0x4ba)](),this['_commandWindow'][_0x4643d7(0x4ba)]();},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x1eb)]=Scene_Shop[_0x4a1256(0x5b7)]['onBuyOk'],Scene_Shop[_0x4a1256(0x5b7)]['onBuyOk']=function(){const _0x4f38d4=_0x4a1256;$gameTemp[_0x4f38d4(0x4c0)]=!![],VisuMZ[_0x4f38d4(0x242)]['Scene_Shop_onBuyOk']['call'](this),$gameTemp['_bypassProxy']=![],this[_0x4f38d4(0x202)]=this[_0x4f38d4(0x3d8)][_0x4f38d4(0x3a5)]();},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x369)]=Scene_Shop[_0x4a1256(0x5b7)]['buyingPrice'],Scene_Shop['prototype']['buyingPrice']=function(){const _0xce0664=_0x4a1256;$gameTemp[_0xce0664(0x4c0)]=!![],this[_0xce0664(0x202)]=this[_0xce0664(0x3d8)][_0xce0664(0x3a5)]();const _0x4cf9a1=VisuMZ['ItemsEquipsCore'][_0xce0664(0x369)]['call'](this);return $gameTemp[_0xce0664(0x4c0)]=![],this[_0xce0664(0x202)]=this[_0xce0664(0x3d8)][_0xce0664(0x3a5)](),_0x4cf9a1;},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x371)]=Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x546)],Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x546)]=function(){const _0x91bf7=_0x4a1256;VisuMZ[_0x91bf7(0x242)]['Scene_Shop_onSellOk'][_0x91bf7(0x4f2)](this),this[_0x91bf7(0x224)]()&&this[_0x91bf7(0x405)]();},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x405)]=function(){const _0x4c464e=_0x4a1256;this[_0x4c464e(0x460)]['show']();},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x465)]=Scene_Shop[_0x4a1256(0x5b7)]['onSellCancel'],Scene_Shop[_0x4a1256(0x5b7)]['onSellCancel']=function(){const _0x4c03c1=_0x4a1256;VisuMZ[_0x4c03c1(0x242)][_0x4c03c1(0x465)][_0x4c03c1(0x4f2)](this),this['isUseModernControls']()&&this[_0x4c03c1(0x227)](),this[_0x4c03c1(0x224)]()&&this[_0x4c03c1(0x46c)][_0x4c03c1(0x377)]();},Scene_Shop['prototype'][_0x4a1256(0x411)]=function(_0x4164b5){const _0x24ead2=_0x4a1256,_0x3fde7a=this[_0x24ead2(0x202)];this[_0x24ead2(0x202)]=_0x4164b5;const _0xb33cce=this[_0x24ead2(0x511)]();return this[_0x24ead2(0x202)]=_0x3fde7a,_0xb33cce;},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x1c7)]=Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x511)],Scene_Shop['prototype'][_0x4a1256(0x511)]=function(){const _0x14a284=_0x4a1256;let _0x111a5b=this[_0x14a284(0x4fa)]();const _0x1e4a2c=this['_item'];return _0x111a5b=VisuMZ[_0x14a284(0x242)][_0x14a284(0x4e9)]['ShopScene'][_0x14a284(0x3e4)]['call'](this,_0x1e4a2c,_0x111a5b),_0x111a5b;},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x4fa)]=function(){const _0x3f5a90=_0x4a1256;let _0x3452a4=this['_item']['price'];if(!this['_item'])return 0x0;else{if(this['_item'][_0x3f5a90(0x4ff)][_0x3f5a90(0x4cd)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x13ac31=String(RegExp['$1']);window[_0x3f5a90(0x3a5)]=this[_0x3f5a90(0x202)],window[_0x3f5a90(0x1ee)]=_0x3452a4*this[_0x3f5a90(0x5bf)]();try{eval(_0x13ac31);}catch(_0x245dd4){if($gameTemp[_0x3f5a90(0x2be)]())console[_0x3f5a90(0x423)](_0x245dd4);}let _0x4f79fa=window[_0x3f5a90(0x1ee)];window[_0x3f5a90(0x3a5)]=undefined,window[_0x3f5a90(0x1ee)]=undefined;if(isNaN(_0x4f79fa))_0x4f79fa=0x0;return Math[_0x3f5a90(0x21d)](_0x4f79fa);}else return this[_0x3f5a90(0x202)][_0x3f5a90(0x4ff)][_0x3f5a90(0x4cd)](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):Math['floor'](this[_0x3f5a90(0x1fe)]());}},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x1fe)]=function(){const _0x5dd2b0=_0x4a1256;return this[_0x5dd2b0(0x202)][_0x5dd2b0(0x1ee)]*this[_0x5dd2b0(0x5bf)]();},Scene_Shop['prototype'][_0x4a1256(0x5bf)]=function(){const _0x486320=_0x4a1256;return VisuMZ['ItemsEquipsCore'][_0x486320(0x4e9)]['ShopScene']['SellPriceRate'];},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x3b9)]=function(){const _0x68f0e1=_0x4a1256;if(!this['updatedLayoutStyle']())return![];if(!this['isUseModernControls']())return![];if(!this['_sellWindow'])return![];if(!this[_0x68f0e1(0x4ca)][_0x68f0e1(0x375)])return![];return this[_0x68f0e1(0x2b1)]()&&this[_0x68f0e1(0x414)]();},Scene_Shop[_0x4a1256(0x5b7)]['buttonAssistKey1']=function(){const _0x45ce3b=_0x4a1256;if(this[_0x45ce3b(0x3b9)]())return this[_0x45ce3b(0x4ca)][_0x45ce3b(0x1ea)]()===0x1?TextManager[_0x45ce3b(0x3a8)](_0x45ce3b(0x2b0),_0x45ce3b(0x3f3)):TextManager[_0x45ce3b(0x3a8)](_0x45ce3b(0x2ae),_0x45ce3b(0x5e5));else{if(this[_0x45ce3b(0x4a6)]&&this[_0x45ce3b(0x4a6)][_0x45ce3b(0x375)])return TextManager[_0x45ce3b(0x3a8)](_0x45ce3b(0x2b0),_0x45ce3b(0x3f3));}return Scene_MenuBase[_0x45ce3b(0x5b7)][_0x45ce3b(0x47f)][_0x45ce3b(0x4f2)](this);},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x26f)]=function(){const _0x568365=_0x4a1256;if(this[_0x568365(0x4a6)]&&this[_0x568365(0x4a6)][_0x568365(0x375)])return TextManager[_0x568365(0x3a8)]('up',_0x568365(0x2f5));return Scene_MenuBase[_0x568365(0x5b7)][_0x568365(0x26f)][_0x568365(0x4f2)](this);},Scene_Shop['prototype'][_0x4a1256(0x203)]=function(){const _0x345ee7=_0x4a1256;if(this[_0x345ee7(0x3b9)]())return VisuMZ['ItemsEquipsCore'][_0x345ee7(0x4e9)][_0x345ee7(0x408)][_0x345ee7(0x1b3)];else{if(this[_0x345ee7(0x4a6)]&&this[_0x345ee7(0x4a6)][_0x345ee7(0x375)])return VisuMZ['ItemsEquipsCore']['Settings'][_0x345ee7(0x4ce)][_0x345ee7(0x4eb)];}return Scene_MenuBase['prototype'][_0x345ee7(0x203)][_0x345ee7(0x4f2)](this);},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x5fd)]=function(){const _0x4802d7=_0x4a1256;if(this['_numberWindow']&&this['_numberWindow'][_0x4802d7(0x375)])return VisuMZ[_0x4802d7(0x242)][_0x4802d7(0x4e9)][_0x4802d7(0x4ce)][_0x4802d7(0x3f6)];return Scene_MenuBase[_0x4802d7(0x5b7)][_0x4802d7(0x5fd)]['call'](this);},Scene_Shop[_0x4a1256(0x5b7)]['resetShopSwitches']=function(){const _0x2efdc9=_0x4a1256;if(!SceneManager['isSceneShop']())return;const _0x297f79=VisuMZ[_0x2efdc9(0x242)][_0x2efdc9(0x4e9)]['ShopScene'];_0x297f79[_0x2efdc9(0x1cd)]&&$gameSwitches[_0x2efdc9(0x5b0)](_0x297f79[_0x2efdc9(0x1cd)],![]),_0x297f79[_0x2efdc9(0x385)]&&$gameSwitches[_0x2efdc9(0x5b0)](_0x297f79[_0x2efdc9(0x385)],![]);},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x3fc)]=Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x359)],Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x359)]=function(_0xe2413){const _0x5a45f1=_0x4a1256;VisuMZ[_0x5a45f1(0x242)][_0x5a45f1(0x3fc)][_0x5a45f1(0x4f2)](this,_0xe2413),this[_0x5a45f1(0x30b)](this[_0x5a45f1(0x202)],_0xe2413);if(_0xe2413<=0x0)return;const _0x94d5ed=VisuMZ[_0x5a45f1(0x242)][_0x5a45f1(0x4e9)][_0x5a45f1(0x4ce)];_0x94d5ed[_0x5a45f1(0x1cd)]&&$gameSwitches[_0x5a45f1(0x5b0)](_0x94d5ed[_0x5a45f1(0x1cd)],!![]),this[_0x5a45f1(0x3d8)][_0x5a45f1(0x39d)](),this['_sellWindow']['refresh']();},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x30b)]=function(_0x11a6d8,_0x130fc6){const _0xca2c66=_0x4a1256;this[_0xca2c66(0x3e1)](_0x11a6d8,_0x130fc6),$gameParty[_0xca2c66(0x325)](_0x11a6d8,_0x130fc6),$gameParty[_0xca2c66(0x42b)](_0x130fc6*this['buyingPrice']());},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x3e1)]=function(_0x176750,_0xc6da73){const _0x11f32f=_0x4a1256;if(!_0x176750)return;if(!_0xc6da73)return;const _0x40639e=VisuMZ['ItemsEquipsCore'][_0x11f32f(0x570)],_0x5abef7=_0x176750['note']||'';if(_0x5abef7[_0x11f32f(0x4cd)](_0x40639e[_0x11f32f(0x44b)])){const _0x4ced2d=String(RegExp['$1'])[_0x11f32f(0x1ff)](',')[_0x11f32f(0x229)](_0x279039=>Number(_0x279039));for(const _0x127625 of _0x4ced2d){$gameSwitches[_0x11f32f(0x5b0)](_0x127625,!![]);}}if(_0x5abef7[_0x11f32f(0x4cd)](_0x40639e['BuyTurnSwitchOff'])){const _0x298ec4=String(RegExp['$1'])['split'](',')[_0x11f32f(0x229)](_0x4a825f=>Number(_0x4a825f));for(const _0x5a811e of _0x298ec4){$gameSwitches['setValue'](_0x5a811e,![]);}}},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x332)]=Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x28a)],Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x28a)]=function(_0x5d08a6){const _0x127459=_0x4a1256;VisuMZ[_0x127459(0x242)][_0x127459(0x332)]['call'](this,_0x5d08a6),this[_0x127459(0x4a1)](this[_0x127459(0x202)],_0x5d08a6);if(_0x5d08a6<=0x0)return;const _0x4a07b3=VisuMZ[_0x127459(0x242)][_0x127459(0x4e9)][_0x127459(0x4ce)];_0x4a07b3[_0x127459(0x1cd)]&&$gameSwitches['setValue'](_0x4a07b3['SwitchSell'],!![]),this[_0x127459(0x3d8)][_0x127459(0x39d)](),this[_0x127459(0x4ca)][_0x127459(0x39d)]();},Scene_Shop[_0x4a1256(0x5b7)][_0x4a1256(0x4a1)]=function(_0x3aa993,_0x1275b5){const _0x4ba7e2=_0x4a1256;this[_0x4ba7e2(0x568)](_0x3aa993,_0x1275b5),$gameParty[_0x4ba7e2(0x5dc)](_0x3aa993,_0x1275b5),$gameParty['addShopTrackingGoldSell'](_0x1275b5*this[_0x4ba7e2(0x511)]());},Scene_Shop['prototype']['processShopCondListingOnSellItem']=function(_0x51dd7f,_0x5c6393){const _0x2a4b90=_0x4a1256;if(!_0x51dd7f)return;if(!_0x5c6393)return;const _0x5aed98=VisuMZ[_0x2a4b90(0x242)][_0x2a4b90(0x570)],_0xec02cd=_0x51dd7f[_0x2a4b90(0x4ff)]||'';if(_0xec02cd['match'](_0x5aed98[_0x2a4b90(0x40b)])){const _0x4d9c1f=String(RegExp['$1'])[_0x2a4b90(0x1ff)](',')[_0x2a4b90(0x229)](_0x3e4ebe=>Number(_0x3e4ebe));for(const _0x44ce42 of _0x4d9c1f){$gameSwitches[_0x2a4b90(0x5b0)](_0x44ce42,!![]);}}if(_0xec02cd['match'](_0x5aed98[_0x2a4b90(0x354)])){const _0x26b969=String(RegExp['$1'])[_0x2a4b90(0x1ff)](',')[_0x2a4b90(0x229)](_0x476cbf=>Number(_0x476cbf));for(const _0x1683a6 of _0x26b969){$gameSwitches[_0x2a4b90(0x5b0)](_0x1683a6,![]);}}};function Sprite_NewLabel(){const _0x5aac0a=_0x4a1256;this[_0x5aac0a(0x305)](...arguments);}function _0xb471(_0x1d6873,_0x2d64c0){const _0x2e71e1=_0x2e71();return _0xb471=function(_0xb47198,_0x1e5aa1){_0xb47198=_0xb47198-0x1b1;let _0x5bce70=_0x2e71e1[_0xb47198];return _0x5bce70;},_0xb471(_0x1d6873,_0x2d64c0);}Sprite_NewLabel['prototype']=Object['create'](Sprite[_0x4a1256(0x5b7)]),Sprite_NewLabel[_0x4a1256(0x5b7)]['constructor']=Sprite_NewLabel,Sprite_NewLabel['prototype']['initialize']=function(){const _0x3d6992=_0x4a1256;Sprite['prototype']['initialize'][_0x3d6992(0x4f2)](this),this['createBitmap']();},Sprite_NewLabel['prototype'][_0x4a1256(0x244)]=function(){const _0x38ad2a=_0x4a1256,_0x221c17=0x20,_0x4cae95=0x20;this[_0x38ad2a(0x1e3)]=new Bitmap(_0x221c17,_0x4cae95),this['drawNewLabelIcon'](),this[_0x38ad2a(0x38b)]();},Sprite_NewLabel[_0x4a1256(0x5b7)]['drawNewLabelIcon']=function(){const _0x396af7=_0x4a1256,_0x17f378=VisuMZ[_0x396af7(0x242)][_0x396af7(0x4e9)][_0x396af7(0x3c5)][_0x396af7(0x40a)];if(_0x17f378<=0x0)return;const _0x2af9e1=ImageManager['loadSystem']('IconSet'),_0x20f4d1=ImageManager[_0x396af7(0x4d0)],_0x59cea0=ImageManager[_0x396af7(0x1d8)],_0x36a466=_0x17f378%0x10*_0x20f4d1,_0x393d0a=Math['floor'](_0x17f378/0x10)*_0x59cea0;this[_0x396af7(0x1e3)]['blt'](_0x2af9e1,_0x36a466,_0x393d0a,_0x20f4d1,_0x59cea0,0x0,0x0);},Sprite_NewLabel[_0x4a1256(0x5b7)]['drawNewLabelText']=function(){const _0x569ca6=_0x4a1256,_0x22d24a=VisuMZ['ItemsEquipsCore'][_0x569ca6(0x4e9)][_0x569ca6(0x3c5)],_0x1c77c1=_0x22d24a['Text'];if(_0x1c77c1==='')return;const _0x47ce76=0x20,_0x550817=0x20;this[_0x569ca6(0x1e3)][_0x569ca6(0x4db)]=_0x22d24a[_0x569ca6(0x2f6)]||$gameSystem[_0x569ca6(0x40d)](),this[_0x569ca6(0x1e3)][_0x569ca6(0x409)]=this['getTextColor'](),this[_0x569ca6(0x1e3)][_0x569ca6(0x503)]=_0x22d24a[_0x569ca6(0x5d6)],this['bitmap'][_0x569ca6(0x549)](_0x1c77c1,0x0,_0x550817/0x2,_0x47ce76,_0x550817/0x2,_0x569ca6(0x36d));},Sprite_NewLabel[_0x4a1256(0x5b7)][_0x4a1256(0x58a)]=function(){const _0x3192a1=_0x4a1256,_0x15adfc=VisuMZ[_0x3192a1(0x242)][_0x3192a1(0x4e9)][_0x3192a1(0x3c5)][_0x3192a1(0x1f5)];return _0x15adfc[_0x3192a1(0x4cd)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager['textColor'](_0x15adfc);},Window_Base[_0x4a1256(0x5b7)][_0x4a1256(0x1e1)]=function(_0x5b9280,_0x34ab0f,_0x2f06ed,_0x203425){const _0x3f4560=_0x4a1256;if(_0x5b9280){const _0x38a59c=ImageManager['standardIconWidth']||0x20,_0x2da921=_0x38a59c-ImageManager[_0x3f4560(0x4d0)],_0x4a9324=_0x38a59c+0x4,_0x400a08=_0x2f06ed+(this[_0x3f4560(0x388)]()-ImageManager[_0x3f4560(0x1d8)])/0x2,_0x1b0ddf=Math['max'](0x0,_0x203425-_0x4a9324);this[_0x3f4560(0x527)](ColorManager[_0x3f4560(0x2c3)](_0x5b9280)),this['drawIcon'](_0x5b9280[_0x3f4560(0x1f3)],_0x34ab0f+Math[_0x3f4560(0x3b5)](_0x2da921/0x2),_0x400a08),this['drawText'](_0x5b9280['name'],_0x34ab0f+_0x4a9324,_0x2f06ed,_0x1b0ddf),this[_0x3f4560(0x28b)]();}},Window_Base[_0x4a1256(0x5b7)][_0x4a1256(0x223)]=function(_0x4392b9,_0x1d73fc,_0x4f6786,_0x3dd479){const _0x11a372=_0x4a1256;if(this[_0x11a372(0x2cd)](_0x4392b9)){this[_0x11a372(0x253)]();const _0x12901a=VisuMZ[_0x11a372(0x242)][_0x11a372(0x4e9)][_0x11a372(0x408)],_0x4ff4b6=_0x12901a[_0x11a372(0x262)],_0x519bfc=_0x4ff4b6[_0x11a372(0x434)]($gameParty[_0x11a372(0x317)](_0x4392b9));this[_0x11a372(0x3fe)][_0x11a372(0x503)]=_0x12901a[_0x11a372(0x3be)],this[_0x11a372(0x549)](_0x519bfc,_0x1d73fc,_0x4f6786,_0x3dd479,_0x11a372(0x3f3)),this[_0x11a372(0x253)]();}},Window_Base['prototype'][_0x4a1256(0x2cd)]=function(_0x54d508){const _0x16a254=_0x4a1256;if(DataManager[_0x16a254(0x2cf)](_0x54d508))return $dataSystem[_0x16a254(0x424)];return!![];},Window_Base['prototype'][_0x4a1256(0x592)]=function(_0x14b6e3,_0x53efb9,_0x740f71,_0x12abef,_0x1af033){const _0x2cea48=_0x4a1256;_0x1af033=Math[_0x2cea48(0x221)](_0x1af033||0x1,0x1);while(_0x1af033--){_0x12abef=_0x12abef||this[_0x2cea48(0x388)](),this['contentsBack'][_0x2cea48(0x2bd)]=0xa0;const _0x4f5e1e=ColorManager[_0x2cea48(0x53c)]();this[_0x2cea48(0x52e)][_0x2cea48(0x2a7)](_0x14b6e3+0x1,_0x53efb9+0x1,_0x740f71-0x2,_0x12abef-0x2,_0x4f5e1e),this[_0x2cea48(0x52e)][_0x2cea48(0x2bd)]=0xff;}},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x1d3)]=Window_Selectable[_0x4a1256(0x5b7)][_0x4a1256(0x305)],Window_Selectable[_0x4a1256(0x5b7)][_0x4a1256(0x305)]=function(_0x3421d0){this['initNewLabelSprites'](),VisuMZ['ItemsEquipsCore']['Window_Selectable_initialize']['call'](this,_0x3421d0);},Window_Selectable[_0x4a1256(0x5b7)][_0x4a1256(0x5c8)]=function(){const _0x7f539=_0x4a1256;this[_0x7f539(0x26c)]={},this['_newLabelOpacity']=0xff,this[_0x7f539(0x59a)]=VisuMZ[_0x7f539(0x242)][_0x7f539(0x4e9)]['New'][_0x7f539(0x389)],this[_0x7f539(0x495)]=VisuMZ['ItemsEquipsCore'][_0x7f539(0x4e9)]['New'][_0x7f539(0x3f5)];},Window_Selectable[_0x4a1256(0x5b7)][_0x4a1256(0x2de)]=function(){return![];},VisuMZ['ItemsEquipsCore']['Window_Selectable_setHelpWindowItem']=Window_Selectable[_0x4a1256(0x5b7)][_0x4a1256(0x310)],Window_Selectable['prototype'][_0x4a1256(0x310)]=function(_0x24b150){const _0x440ad9=_0x4a1256;VisuMZ['ItemsEquipsCore'][_0x440ad9(0x3b3)]['call'](this,_0x24b150);if(this[_0x440ad9(0x2de)]())this['clearNewLabelFromItem'](_0x24b150);},Window_Selectable[_0x4a1256(0x5b7)][_0x4a1256(0x341)]=function(_0x4e6fe3){const _0x45891a=_0x4a1256;if(!_0x4e6fe3)return;$gameParty[_0x45891a(0x5a9)](_0x4e6fe3);let _0x38277e='';if(DataManager[_0x45891a(0x515)](_0x4e6fe3))_0x38277e=_0x45891a(0x47e)['format'](_0x4e6fe3['id']);else{if(DataManager['isWeapon'](_0x4e6fe3))_0x38277e=_0x45891a(0x2ec)[_0x45891a(0x434)](_0x4e6fe3['id']);else{if(DataManager[_0x45891a(0x560)](_0x4e6fe3))_0x38277e=_0x45891a(0x56b)[_0x45891a(0x434)](_0x4e6fe3['id']);else return;}}const _0x2b2479=this[_0x45891a(0x26c)][_0x38277e];if(_0x2b2479)_0x2b2479[_0x45891a(0x377)]();},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x36c)]=Window_Selectable[_0x4a1256(0x5b7)]['refresh'],Window_Selectable['prototype'][_0x4a1256(0x39d)]=function(){const _0x543309=_0x4a1256;this[_0x543309(0x48c)](),VisuMZ[_0x543309(0x242)][_0x543309(0x36c)][_0x543309(0x4f2)](this);},Window_Selectable[_0x4a1256(0x5b7)]['hideNewLabelSprites']=function(){const _0x4e33a0=_0x4a1256;for(const _0x2395db of Object[_0x4e33a0(0x38f)](this[_0x4e33a0(0x26c)])){_0x2395db[_0x4e33a0(0x377)]();}},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x4be)]=Window_Selectable[_0x4a1256(0x5b7)]['update'],Window_Selectable['prototype'][_0x4a1256(0x494)]=function(){const _0x49d72=_0x4a1256;this['updateNewLabelOpacity'](),VisuMZ[_0x49d72(0x242)][_0x49d72(0x4be)][_0x49d72(0x4f2)](this);},Window_Selectable[_0x4a1256(0x5b7)][_0x4a1256(0x32e)]=function(){const _0x515ccf=_0x4a1256;if(!this['isShowNew']())return;const _0x749bce=this[_0x515ccf(0x495)];this[_0x515ccf(0x1e6)]+=this[_0x515ccf(0x59a)];(this[_0x515ccf(0x1e6)]>=_0x749bce||this[_0x515ccf(0x1e6)]<=0x0)&&(this[_0x515ccf(0x59a)]*=-0x1);this[_0x515ccf(0x1e6)]=this[_0x515ccf(0x1e6)]['clamp'](0x0,_0x749bce);for(const _0x5ca9b of Object[_0x515ccf(0x38f)](this[_0x515ccf(0x26c)])){_0x5ca9b['opacity']=this[_0x515ccf(0x1e6)];}},Window_Selectable['prototype'][_0x4a1256(0x393)]=function(_0x248cdd){const _0x25a9ae=_0x4a1256,_0x7f6d02=this[_0x25a9ae(0x26c)];if(_0x7f6d02[_0x248cdd])return _0x7f6d02[_0x248cdd];else{const _0x6746a0=new Sprite_NewLabel();return _0x7f6d02[_0x248cdd]=_0x6746a0,this[_0x25a9ae(0x577)](_0x6746a0),_0x6746a0;}},Window_Selectable[_0x4a1256(0x5b7)][_0x4a1256(0x22c)]=function(_0x29510e,_0x200ed4,_0x5bca00){const _0x30a481=_0x4a1256;let _0x2fa074='';if(DataManager[_0x30a481(0x515)](_0x29510e))_0x2fa074=_0x30a481(0x47e)[_0x30a481(0x434)](_0x29510e['id']);else{if(DataManager[_0x30a481(0x231)](_0x29510e))_0x2fa074=_0x30a481(0x2ec)[_0x30a481(0x434)](_0x29510e['id']);else{if(DataManager[_0x30a481(0x560)](_0x29510e))_0x2fa074='armor-%1'[_0x30a481(0x434)](_0x29510e['id']);else return;}}const _0x5cdaa7=this[_0x30a481(0x393)](_0x2fa074);_0x5cdaa7[_0x30a481(0x33f)](_0x200ed4,_0x5bca00),_0x5cdaa7[_0x30a481(0x4ba)](),_0x5cdaa7['opacity']=this[_0x30a481(0x1e6)];},Window_ItemCategory[_0x4a1256(0x339)]=VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x4e9)]['Categories']['List'],Window_ItemCategory['categoryItemTypes']=[_0x4a1256(0x213),'HiddenItemB',_0x4a1256(0x582),_0x4a1256(0x513),'AlwaysUsable',_0x4a1256(0x4bc),'FieldUsable',_0x4a1256(0x1ce)],VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x4af)]=Window_ItemCategory[_0x4a1256(0x5b7)][_0x4a1256(0x305)],Window_ItemCategory['prototype'][_0x4a1256(0x305)]=function(_0x18a760){const _0x1a98d3=_0x4a1256;VisuMZ['ItemsEquipsCore'][_0x1a98d3(0x4af)][_0x1a98d3(0x4f2)](this,_0x18a760),this['createCategoryNameWindow'](_0x18a760);},Window_ItemCategory[_0x4a1256(0x5b7)][_0x4a1256(0x44c)]=function(_0x2c33c9){const _0x4c612a=_0x4a1256,_0x5f11b1=new Rectangle(0x0,0x0,_0x2c33c9[_0x4c612a(0x597)],_0x2c33c9[_0x4c612a(0x1d9)]);this['_categoryNameWindow']=new Window_Base(_0x5f11b1),this['_categoryNameWindow'][_0x4c612a(0x28e)]=0x0,this[_0x4c612a(0x348)](this[_0x4c612a(0x26a)]),this['updateCategoryNameWindow']();},Window_ItemCategory['prototype'][_0x4a1256(0x414)]=function(){const _0x537ba3=_0x4a1256;return Imported[_0x537ba3(0x295)]&&Window_HorzCommand[_0x537ba3(0x5b7)]['isUseModernControls'][_0x537ba3(0x4f2)](this);},Window_ItemCategory[_0x4a1256(0x5b7)][_0x4a1256(0x55b)]=function(){},Window_ItemCategory['prototype'][_0x4a1256(0x360)]=function(){const _0x14ec25=_0x4a1256;if(!this[_0x14ec25(0x414)]())Window_HorzCommand[_0x14ec25(0x5b7)][_0x14ec25(0x360)][_0x14ec25(0x4f2)](this);},Window_ItemCategory[_0x4a1256(0x5b7)]['maxCols']=function(){const _0xf58a1a=_0x4a1256;return this['_list']?this[_0xf58a1a(0x37a)]():0x4;},Window_ItemCategory[_0x4a1256(0x5b7)][_0x4a1256(0x494)]=function(){const _0x5f5c7a=_0x4a1256;Window_HorzCommand[_0x5f5c7a(0x5b7)]['update'][_0x5f5c7a(0x4f2)](this),this[_0x5f5c7a(0x1c0)]&&this[_0x5f5c7a(0x1c0)][_0x5f5c7a(0x252)](this[_0x5f5c7a(0x1f2)]());},Window_ItemCategory[_0x4a1256(0x5b7)][_0x4a1256(0x489)]=function(){const _0x3dbad0=_0x4a1256;if(this[_0x3dbad0(0x551)]()){const _0x10dcfc=this[_0x3dbad0(0x1f9)]();if(this['_itemWindow']&&this['_itemWindow'][_0x3dbad0(0x1ea)]()<=0x1)Input['isRepeated']('right')&&this[_0x3dbad0(0x548)](Input[_0x3dbad0(0x3c3)](_0x3dbad0(0x3f3))),Input[_0x3dbad0(0x3d6)](_0x3dbad0(0x2b0))&&this['cursorLeft'](Input[_0x3dbad0(0x3c3)](_0x3dbad0(0x2b0)));else this[_0x3dbad0(0x1c0)]&&this[_0x3dbad0(0x1c0)][_0x3dbad0(0x1ea)]()>0x1&&(Input[_0x3dbad0(0x3d6)]('pagedown')&&!Input['isPressed'](_0x3dbad0(0x44a))&&this[_0x3dbad0(0x548)](Input[_0x3dbad0(0x3c3)](_0x3dbad0(0x5e5))),Input[_0x3dbad0(0x3d6)](_0x3dbad0(0x2ae))&&!Input[_0x3dbad0(0x27d)]('shift')&&this[_0x3dbad0(0x52f)](Input[_0x3dbad0(0x3c3)](_0x3dbad0(0x2ae))));this[_0x3dbad0(0x1f9)]()!==_0x10dcfc&&this[_0x3dbad0(0x28f)]();}},Window_ItemCategory[_0x4a1256(0x5b7)][_0x4a1256(0x4e2)]=function(){const _0x2498d6=_0x4a1256;if(this[_0x2498d6(0x414)]())return;Window_HorzCommand[_0x2498d6(0x5b7)]['processHandling'][_0x2498d6(0x4f2)](this);},Window_ItemCategory[_0x4a1256(0x5b7)]['isHoverEnabled']=function(){const _0x36ff29=_0x4a1256;return this[_0x36ff29(0x414)]()?![]:Window_HorzCommand['prototype'][_0x36ff29(0x2a6)][_0x36ff29(0x4f2)](this);},Window_ItemCategory[_0x4a1256(0x5b7)][_0x4a1256(0x2c4)]=function(){const _0x308bd9=_0x4a1256;if(this['isOpenAndActive']()){TouchInput['isTriggered']()&&this[_0x308bd9(0x524)](!![]);if(TouchInput[_0x308bd9(0x2fb)]())this[_0x308bd9(0x378)]();else TouchInput['isCancelled']()&&this[_0x308bd9(0x3b1)]();}},Window_ItemCategory[_0x4a1256(0x5b7)][_0x4a1256(0x524)]=function(_0x464b51){const _0x5e43f6=_0x4a1256;this[_0x5e43f6(0x414)]()?this[_0x5e43f6(0x4b0)](!![]):Window_HorzCommand[_0x5e43f6(0x5b7)][_0x5e43f6(0x524)]['call'](this,_0x464b51);},Window_ItemCategory[_0x4a1256(0x5b7)][_0x4a1256(0x4b0)]=function(_0x237300){const _0x483b76=_0x4a1256;this[_0x483b76(0x25d)]=![];if(this['isCursorMovable']()){const _0x2a7be3=this[_0x483b76(0x1f9)](),_0x190e82=this[_0x483b76(0x574)]();_0x190e82>=0x0&&_0x190e82!==this['index']()&&this[_0x483b76(0x36e)](_0x190e82),_0x237300&&this['index']()!==_0x2a7be3&&this[_0x483b76(0x28f)]();}},Window_ItemCategory[_0x4a1256(0x5b7)]['makeCommandList']=function(){const _0x47c3c6=_0x4a1256;this[_0x47c3c6(0x523)](),this[_0x47c3c6(0x36e)](this[_0x47c3c6(0x1f9)]());},Window_ItemCategory[_0x4a1256(0x5b7)][_0x4a1256(0x523)]=function(){const _0x358b8d=_0x4a1256;for(const _0x1b112b of Window_ItemCategory[_0x358b8d(0x339)]){this[_0x358b8d(0x50c)](_0x1b112b);}},Window_ItemCategory[_0x4a1256(0x5b7)][_0x4a1256(0x50c)]=function(_0x1a3647){const _0x5cf51b=_0x4a1256,_0x84bfb7=_0x1a3647['Type'],_0x1d8343=_0x1a3647['Icon'],_0x5ae1a3=_0x1a3647[_0x5cf51b(0x4ec)]||0x0;if(_0x5ae1a3>0x0&&!$gameSwitches[_0x5cf51b(0x248)](_0x5ae1a3))return;let _0x528b90='',_0x38dae2=_0x5cf51b(0x406),_0x52cfda=_0x84bfb7;if(_0x84bfb7[_0x5cf51b(0x4cd)](/Category:(.*)/i))_0x528b90=String(RegExp['$1'])['trim']();else{if(Window_ItemCategory[_0x5cf51b(0x57d)][_0x5cf51b(0x220)](_0x84bfb7))_0x528b90=VisuMZ['ItemsEquipsCore']['Settings'][_0x5cf51b(0x5a6)][_0x84bfb7];else{if([_0x5cf51b(0x4dd),_0x5cf51b(0x22b)][_0x5cf51b(0x220)](_0x84bfb7))_0x528b90=TextManager[_0x5cf51b(0x3a5)];else{if(_0x84bfb7===_0x5cf51b(0x353))_0x528b90=TextManager[_0x5cf51b(0x3dc)];else{if(_0x84bfb7==='AllWeapons')_0x528b90=TextManager[_0x5cf51b(0x4fb)];else{if(_0x84bfb7===_0x5cf51b(0x4ee))_0x528b90=TextManager[_0x5cf51b(0x285)];else{if(_0x84bfb7['match'](/WTYPE:(\d+)/i))_0x528b90=$dataSystem[_0x5cf51b(0x48a)][Number(RegExp['$1'])]||'';else{if(_0x84bfb7[_0x5cf51b(0x4cd)](/ATYPE:(\d+)/i))_0x528b90=$dataSystem['armorTypes'][Number(RegExp['$1'])]||'';else _0x84bfb7[_0x5cf51b(0x4cd)](/ETYPE:(\d+)/i)&&(_0x528b90=$dataSystem[_0x5cf51b(0x391)][Number(RegExp['$1'])]||'');}}}}}}}if(TextManager[_0x5cf51b(0x26e)]&&TextManager[_0x5cf51b(0x526)]()){const _0x6c9b3d=_0x528b90[_0x5cf51b(0x3b4)]()[_0x5cf51b(0x482)]();if($dataLocalization[_0x6c9b3d]&&_0x6c9b3d['length']>0x0){const _0xdf64a7=ConfigManager[_0x5cf51b(0x34b)]||_0x5cf51b(0x5cb);_0x528b90=$dataLocalization[_0x6c9b3d][_0xdf64a7]||_0x5cf51b(0x397);}}_0x1d8343>0x0&&this[_0x5cf51b(0x464)]()!==_0x5cf51b(0x543)&&(_0x528b90=_0x5cf51b(0x50f)[_0x5cf51b(0x434)](_0x1d8343,_0x528b90)),this[_0x5cf51b(0x335)](_0x528b90,_0x38dae2,!![],_0x52cfda);},Window_ItemCategory[_0x4a1256(0x5b7)][_0x4a1256(0x5aa)]=function(){const _0x5d6d25=_0x4a1256;return VisuMZ[_0x5d6d25(0x242)]['Settings']['Categories'][_0x5d6d25(0x5de)];},Window_ItemCategory[_0x4a1256(0x5b7)]['drawItem']=function(_0x556186){const _0x35867a=_0x4a1256,_0x3f5d7c=this[_0x35867a(0x329)](_0x556186);if(_0x3f5d7c==='iconText')this[_0x35867a(0x43a)](_0x556186);else _0x3f5d7c===_0x35867a(0x2b2)?this[_0x35867a(0x5d7)](_0x556186):Window_HorzCommand[_0x35867a(0x5b7)][_0x35867a(0x463)][_0x35867a(0x4f2)](this,_0x556186);},Window_ItemCategory[_0x4a1256(0x5b7)]['categoryStyle']=function(){const _0x206287=_0x4a1256;return VisuMZ[_0x206287(0x242)]['Settings']['Categories'][_0x206287(0x384)];},Window_ItemCategory['prototype'][_0x4a1256(0x329)]=function(_0x54f22f){const _0xbc667d=_0x4a1256;if(_0x54f22f<0x0)return _0xbc667d(0x543);const _0x41240a=this[_0xbc667d(0x464)]();if(_0x41240a!=='auto')return _0x41240a;else{const _0x5d4fdf=this[_0xbc667d(0x1fc)](_0x54f22f);if(_0x5d4fdf[_0xbc667d(0x4cd)](/\\I\[(\d+)\]/i)){const _0x22c6f8=this[_0xbc667d(0x4dc)](_0x54f22f),_0x3c5107=this[_0xbc667d(0x564)](_0x5d4fdf)[_0xbc667d(0x597)];return _0x3c5107<=_0x22c6f8[_0xbc667d(0x597)]?_0xbc667d(0x2cb):'icon';}else return'text';}},Window_ItemCategory[_0x4a1256(0x5b7)]['drawItemStyleIconText']=function(_0xa4aff7){const _0xa300c4=_0x4a1256,_0x47fb70=this[_0xa300c4(0x4dc)](_0xa4aff7),_0x450492=this[_0xa300c4(0x1fc)](_0xa4aff7),_0x14e845=this[_0xa300c4(0x564)](_0x450492)['width'];this[_0xa300c4(0x586)](this[_0xa300c4(0x450)](_0xa4aff7));const _0x1811b4=this['itemTextAlign']();if(_0x1811b4===_0xa300c4(0x3f3))this[_0xa300c4(0x218)](_0x450492,_0x47fb70['x']+_0x47fb70[_0xa300c4(0x597)]-_0x14e845,_0x47fb70['y'],_0x14e845);else{if(_0x1811b4===_0xa300c4(0x36d)){const _0x5d1832=_0x47fb70['x']+Math['floor']((_0x47fb70['width']-_0x14e845)/0x2);this[_0xa300c4(0x218)](_0x450492,_0x5d1832,_0x47fb70['y'],_0x14e845);}else this['drawTextEx'](_0x450492,_0x47fb70['x'],_0x47fb70['y'],_0x14e845);}},Window_ItemCategory[_0x4a1256(0x5b7)]['drawItemStyleIcon']=function(_0x5bd433){const _0x4a067c=_0x4a1256,_0x47286c=this[_0x4a067c(0x1fc)](_0x5bd433);if(_0x47286c[_0x4a067c(0x4cd)](/\\I\[(\d+)\]/i)){const _0x3415fb=Number(RegExp['$1'])||0x0,_0x451c9b=this[_0x4a067c(0x4dc)](_0x5bd433),_0x52b3ea=_0x451c9b['x']+Math['floor']((_0x451c9b[_0x4a067c(0x597)]-ImageManager[_0x4a067c(0x4d0)])/0x2),_0x640a07=_0x451c9b['y']+(_0x451c9b['height']-ImageManager['iconHeight'])/0x2;this[_0x4a067c(0x3d0)](_0x3415fb,_0x52b3ea,_0x640a07);}},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x4f6)]=Window_ItemCategory[_0x4a1256(0x5b7)][_0x4a1256(0x37f)],Window_ItemCategory[_0x4a1256(0x5b7)][_0x4a1256(0x37f)]=function(_0x2b48da){const _0x481233=_0x4a1256;VisuMZ['ItemsEquipsCore'][_0x481233(0x4f6)]['call'](this,_0x2b48da),_0x2b48da[_0x481233(0x460)]=this;},Window_ItemCategory['prototype']['callUpdateHelp']=function(){const _0x424e00=_0x4a1256;Window_HorzCommand[_0x424e00(0x5b7)]['callUpdateHelp'][_0x424e00(0x4f2)](this);if(this[_0x424e00(0x26a)])this[_0x424e00(0x51a)]();},Window_ItemCategory[_0x4a1256(0x5b7)][_0x4a1256(0x51a)]=function(){const _0x32f4fa=_0x4a1256,_0x5070cb=this[_0x32f4fa(0x26a)];_0x5070cb[_0x32f4fa(0x3fe)][_0x32f4fa(0x55c)]();const _0x1d792c=this[_0x32f4fa(0x329)](this[_0x32f4fa(0x1f9)]());if(_0x1d792c==='icon'){const _0x588493=this[_0x32f4fa(0x4dc)](this[_0x32f4fa(0x1f9)]());let _0x3cff68=this[_0x32f4fa(0x1fc)](this[_0x32f4fa(0x1f9)]());_0x3cff68=_0x3cff68[_0x32f4fa(0x282)](/\\I\[(\d+)\]/gi,''),_0x5070cb[_0x32f4fa(0x253)](),this[_0x32f4fa(0x48f)](_0x3cff68,_0x588493),this['categoryNameWindowDrawText'](_0x3cff68,_0x588493),this[_0x32f4fa(0x319)](_0x3cff68,_0x588493);}},Window_ItemCategory[_0x4a1256(0x5b7)][_0x4a1256(0x48f)]=function(_0x41dbeb,_0x47b54a){},Window_ItemCategory[_0x4a1256(0x5b7)]['categoryNameWindowDrawText']=function(_0x30456a,_0x28782a){const _0x5101c0=_0x4a1256,_0x262b08=this[_0x5101c0(0x26a)];_0x262b08[_0x5101c0(0x549)](_0x30456a,0x0,_0x28782a['y'],_0x262b08['innerWidth'],_0x5101c0(0x36d));},Window_ItemCategory['prototype']['categoryNameWindowCenter']=function(_0x5cf0d1,_0x426d6d){const _0x5a500a=_0x4a1256,_0x168bf3=this[_0x5a500a(0x26a)],_0x11918b=$gameSystem['windowPadding'](),_0x1f4339=_0x426d6d['x']+Math[_0x5a500a(0x21d)](_0x426d6d[_0x5a500a(0x597)]/0x2)+_0x11918b;_0x168bf3['x']=_0x168bf3[_0x5a500a(0x597)]/-0x2+_0x1f4339,_0x168bf3['y']=Math[_0x5a500a(0x21d)](_0x426d6d[_0x5a500a(0x1d9)]/0x2);},Window_ItemList['prototype'][_0x4a1256(0x489)]=function(){const _0x560ba2=_0x4a1256;if(this[_0x560ba2(0x551)]()){const _0x2db606=this[_0x560ba2(0x1f9)]();if(this[_0x560ba2(0x1ea)]()<=0x1)!this[_0x560ba2(0x51d)](_0x560ba2(0x5e5))&&Input['isTriggered'](_0x560ba2(0x5e5))&&this[_0x560ba2(0x2eb)](),!this[_0x560ba2(0x51d)](_0x560ba2(0x2ae))&&Input['isTriggered']('pageup')&&this[_0x560ba2(0x496)]();else this[_0x560ba2(0x1ea)]()>0x1&&(Input[_0x560ba2(0x3d6)](_0x560ba2(0x3f3))&&this[_0x560ba2(0x548)](Input[_0x560ba2(0x3c3)]('right')),Input[_0x560ba2(0x3d6)]('left')&&this[_0x560ba2(0x52f)](Input[_0x560ba2(0x3c3)](_0x560ba2(0x2b0))),this['limitedPageUpDownSceneCheck']()?(Input[_0x560ba2(0x3c3)](_0x560ba2(0x5e5))&&Input[_0x560ba2(0x27d)](_0x560ba2(0x44a))&&this['cursorPagedown'](),Input[_0x560ba2(0x3c3)](_0x560ba2(0x2ae))&&Input[_0x560ba2(0x27d)](_0x560ba2(0x44a))&&this[_0x560ba2(0x496)]()):(Input[_0x560ba2(0x3c3)](_0x560ba2(0x5e5))&&this[_0x560ba2(0x2eb)](),Input[_0x560ba2(0x3c3)](_0x560ba2(0x2ae))&&this[_0x560ba2(0x496)]()));Input[_0x560ba2(0x3d6)](_0x560ba2(0x2f5))&&(Input[_0x560ba2(0x27d)](_0x560ba2(0x44a))&&this['allowShiftScrolling']()?this[_0x560ba2(0x2eb)]():this[_0x560ba2(0x320)](Input[_0x560ba2(0x3c3)]('down'))),Input[_0x560ba2(0x3d6)]('up')&&(Input[_0x560ba2(0x27d)]('shift')&&this[_0x560ba2(0x3db)]()?this['cursorPageup']():this[_0x560ba2(0x45e)](Input[_0x560ba2(0x3c3)]('up'))),Imported[_0x560ba2(0x295)]&&this[_0x560ba2(0x55b)](),this[_0x560ba2(0x1f9)]()!==_0x2db606&&this[_0x560ba2(0x28f)]();}},Window_ItemList[_0x4a1256(0x5b7)][_0x4a1256(0x536)]=function(){const _0x56adaf=_0x4a1256,_0x3307c8=SceneManager[_0x56adaf(0x555)],_0x2480d7=[Scene_Item,Scene_Shop];return _0x2480d7[_0x56adaf(0x220)](_0x3307c8[_0x56adaf(0x2c8)]);},Window_ItemList['prototype']['activate']=function(){const _0x4f387c=_0x4a1256;Window_Selectable[_0x4f387c(0x5b7)][_0x4f387c(0x308)][_0x4f387c(0x4f2)](this),this[_0x4f387c(0x460)]&&this[_0x4f387c(0x460)]['isUseModernControls']()&&this[_0x4f387c(0x460)]['activate']();},Window_ItemList[_0x4a1256(0x5b7)]['deactivate']=function(){const _0xd910f7=_0x4a1256;Window_Selectable['prototype'][_0xd910f7(0x4f5)][_0xd910f7(0x4f2)](this),this[_0xd910f7(0x460)]&&this[_0xd910f7(0x460)][_0xd910f7(0x414)]()&&this[_0xd910f7(0x460)][_0xd910f7(0x4f5)]();},Window_ItemList['prototype'][_0x4a1256(0x252)]=function(_0x3459c3){const _0x5e3dbb=_0x4a1256;this['_category']!==_0x3459c3&&(this[_0x5e3dbb(0x48b)]=_0x3459c3,this[_0x5e3dbb(0x39d)](),this[_0x5e3dbb(0x460)]&&this['_categoryWindow'][_0x5e3dbb(0x414)]()?this['smoothSelect'](0x0):this[_0x5e3dbb(0x55e)](0x0,0x0));},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x5b8)]=Window_ItemList[_0x4a1256(0x5b7)][_0x4a1256(0x1ea)],Window_ItemList[_0x4a1256(0x5b7)][_0x4a1256(0x1ea)]=function(){const _0x1bf348=_0x4a1256;if(SceneManager[_0x1bf348(0x555)][_0x1bf348(0x2c8)]===Scene_Battle)return VisuMZ[_0x1bf348(0x242)][_0x1bf348(0x5b8)][_0x1bf348(0x4f2)](this);else return SceneManager['_scene'][_0x1bf348(0x2c8)]===Scene_Map?VisuMZ['ItemsEquipsCore']['Window_ItemList_maxCols'][_0x1bf348(0x4f2)](this):VisuMZ[_0x1bf348(0x242)][_0x1bf348(0x4e9)][_0x1bf348(0x408)][_0x1bf348(0x472)];},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x5cd)]=Window_ItemList[_0x4a1256(0x5b7)][_0x4a1256(0x201)],Window_ItemList[_0x4a1256(0x5b7)][_0x4a1256(0x201)]=function(){const _0x3feaa1=_0x4a1256;return this[_0x3feaa1(0x1ea)]()<=0x1?Window_Selectable[_0x3feaa1(0x5b7)][_0x3feaa1(0x201)][_0x3feaa1(0x4f2)](this):VisuMZ[_0x3feaa1(0x242)][_0x3feaa1(0x5cd)]['call'](this);},Window_ItemList[_0x4a1256(0x5b7)][_0x4a1256(0x220)]=function(_0x6594fa){const _0x53de96=_0x4a1256;switch(this['_category']){case _0x53de96(0x4dd):return DataManager[_0x53de96(0x515)](_0x6594fa);case _0x53de96(0x22b):return DataManager[_0x53de96(0x515)](_0x6594fa)&&_0x6594fa[_0x53de96(0x505)]===0x1;case _0x53de96(0x353):return DataManager[_0x53de96(0x515)](_0x6594fa)&&_0x6594fa[_0x53de96(0x505)]===0x2;case'HiddenItemA':return DataManager['isItem'](_0x6594fa)&&_0x6594fa['itypeId']===0x3;case _0x53de96(0x33d):return DataManager['isItem'](_0x6594fa)&&_0x6594fa[_0x53de96(0x505)]===0x4;case _0x53de96(0x513):return DataManager[_0x53de96(0x515)](_0x6594fa)&&_0x6594fa[_0x53de96(0x294)];case _0x53de96(0x582):return DataManager['isItem'](_0x6594fa)&&!_0x6594fa[_0x53de96(0x294)];case _0x53de96(0x1bc):return DataManager[_0x53de96(0x515)](_0x6594fa)&&[0x0][_0x53de96(0x220)](_0x6594fa[_0x53de96(0x485)]);case _0x53de96(0x4bc):return DataManager[_0x53de96(0x515)](_0x6594fa)&&[0x0,0x1][_0x53de96(0x220)](_0x6594fa['occasion']);case _0x53de96(0x309):return DataManager[_0x53de96(0x515)](_0x6594fa)&&[0x0,0x2][_0x53de96(0x220)](_0x6594fa[_0x53de96(0x485)]);case _0x53de96(0x1ce):return DataManager[_0x53de96(0x515)](_0x6594fa)&&[0x3][_0x53de96(0x220)](_0x6594fa[_0x53de96(0x485)]);case _0x53de96(0x2a2):return DataManager['isWeapon'](_0x6594fa);case _0x53de96(0x4ee):return DataManager['isArmor'](_0x6594fa);default:if(this[_0x53de96(0x48b)]['match'](/WTYPE:(\d+)/i))return DataManager[_0x53de96(0x231)](_0x6594fa)&&_0x6594fa['wtypeId']===Number(RegExp['$1']);else{if(this[_0x53de96(0x48b)][_0x53de96(0x4cd)](/WTYPE:(.*)/i)){const _0x2b89e1=$dataSystem['weaponTypes'][_0x53de96(0x441)](String(RegExp['$1'])[_0x53de96(0x482)]());return DataManager[_0x53de96(0x231)](_0x6594fa)&&_0x6594fa[_0x53de96(0x547)]===_0x2b89e1;}else{if(this[_0x53de96(0x48b)][_0x53de96(0x4cd)](/ATYPE:(\d+)/i))return DataManager[_0x53de96(0x560)](_0x6594fa)&&_0x6594fa['atypeId']===Number(RegExp['$1']);else{if(this[_0x53de96(0x48b)][_0x53de96(0x4cd)](/ATYPE:(.*)/i)){const _0x444e55=$dataSystem[_0x53de96(0x33b)]['indexOf'](String(RegExp['$1'])[_0x53de96(0x482)]());return DataManager[_0x53de96(0x560)](_0x6594fa)&&_0x6594fa['atypeId']===_0x444e55;}else{if(this['_category'][_0x53de96(0x4cd)](/ETYPE:(\d+)/i))return!!_0x6594fa&&_0x6594fa['etypeId']===Number(RegExp['$1']);else{if(this[_0x53de96(0x48b)][_0x53de96(0x4cd)](/ETYPE:(.*)/i)){const _0x1160f7=$dataSystem[_0x53de96(0x391)]['indexOf'](String(RegExp['$1'])[_0x53de96(0x482)]());return DataManager[_0x53de96(0x560)](_0x6594fa)&&_0x6594fa[_0x53de96(0x366)]===_0x1160f7;}else{if(this[_0x53de96(0x48b)][_0x53de96(0x4cd)](/Category:(.*)/i))return!!_0x6594fa&&_0x6594fa[_0x53de96(0x26b)][_0x53de96(0x220)](String(RegExp['$1'])[_0x53de96(0x45b)]()[_0x53de96(0x482)]());}}}}}}}return![];},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x40f)]=Window_ItemList[_0x4a1256(0x5b7)][_0x4a1256(0x32c)],Window_ItemList[_0x4a1256(0x5b7)]['makeItemList']=function(){const _0x31a535=_0x4a1256;VisuMZ[_0x31a535(0x242)][_0x31a535(0x40f)][_0x31a535(0x4f2)](this);if(this['canSortListItemScene']())this['sortListItemScene']();},Window_ItemList[_0x4a1256(0x5b7)][_0x4a1256(0x1bd)]=function(){const _0x49a9ad=_0x4a1256,_0x1a048f=[_0x49a9ad(0x374),_0x49a9ad(0x361),_0x49a9ad(0x20f),_0x49a9ad(0x475)],_0x2cfccb=SceneManager[_0x49a9ad(0x555)];return _0x1a048f[_0x49a9ad(0x220)](_0x2cfccb[_0x49a9ad(0x2c8)]['name']);},Window_ItemList[_0x4a1256(0x5b7)][_0x4a1256(0x433)]=function(){const _0x3d9dba=_0x4a1256,_0x16e38e=Window_ItemCategory['categoryList'],_0x4a7355=_0x16e38e[_0x3d9dba(0x2f0)](_0x374871=>_0x374871[_0x3d9dba(0x446)]===this[_0x3d9dba(0x48b)]);if(!_0x4a7355){VisuMZ[_0x3d9dba(0x242)][_0x3d9dba(0x5be)](this['_data']);return;}const _0x49d57d=((_0x4a7355['SortBy']??'ID')||'ID')[_0x3d9dba(0x45b)]()['trim']();_0x49d57d===_0x3d9dba(0x54d)?this[_0x3d9dba(0x4c1)]['sort']((_0x5405d0,_0x4b4b8b)=>{const _0xb88074=_0x3d9dba;if(!!_0x5405d0&&!!_0x4b4b8b)return _0x5405d0[_0xb88074(0x2ba)]['localeCompare'](_0x4b4b8b[_0xb88074(0x2ba)]);return 0x0;}):VisuMZ[_0x3d9dba(0x242)][_0x3d9dba(0x5be)](this[_0x3d9dba(0x4c1)]);},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x5be)]=function(_0x3563d0){const _0x40826c=_0x4a1256;return _0x3563d0[_0x40826c(0x426)]((_0x4c0772,_0x399912)=>{const _0x26ec31=_0x40826c;if(!!_0x4c0772&&!!_0x399912){if(_0x4c0772[_0x26ec31(0x1e8)]===undefined)VisuMZ[_0x26ec31(0x242)]['Parse_Notetags_Sorting'](_0x4c0772);if(_0x399912[_0x26ec31(0x1e8)]===undefined)VisuMZ[_0x26ec31(0x242)][_0x26ec31(0x4e6)](_0x399912);const _0xab7e67=_0x4c0772[_0x26ec31(0x1e8)],_0xf3c45=_0x399912['sortPriority'];if(_0xab7e67!==_0xf3c45)return _0xf3c45-_0xab7e67;return _0x4c0772['id']-_0x399912['id'];}return 0x0;}),_0x3563d0;},Window_ItemList[_0x4a1256(0x5b7)][_0x4a1256(0x2de)]=function(){return!![];},VisuMZ[_0x4a1256(0x242)]['Window_ItemList_drawItem']=Window_ItemList[_0x4a1256(0x5b7)]['drawItem'],Window_ItemList[_0x4a1256(0x5b7)][_0x4a1256(0x463)]=function(_0x282f99){const _0x265c7e=_0x4a1256;VisuMZ['ItemsEquipsCore'][_0x265c7e(0x31f)][_0x265c7e(0x4f2)](this,_0x282f99),this[_0x265c7e(0x29d)](_0x282f99);},Window_ItemList[_0x4a1256(0x5b7)][_0x4a1256(0x223)]=function(_0x1d76fd,_0x1f22f4,_0x4e189d,_0x3924ad){const _0x2a3c62=_0x4a1256;Window_Selectable[_0x2a3c62(0x5b7)][_0x2a3c62(0x223)][_0x2a3c62(0x4f2)](this,_0x1d76fd,_0x1f22f4,_0x4e189d,_0x3924ad);},Window_ItemList[_0x4a1256(0x5b7)][_0x4a1256(0x29d)]=function(_0x492360){const _0x3592ba=_0x4a1256,_0x5e082c=this['itemAt'](_0x492360);if(!_0x5e082c||!this[_0x3592ba(0x2de)]())return;if(!$gameParty['isNewItem'](_0x5e082c))return;const _0x525219=this['itemLineRect'](_0x492360),_0x55aefe=_0x525219['x'],_0x139db6=_0x525219['y']+(this[_0x3592ba(0x388)]()-0x20)/0x2,_0x58b382=VisuMZ['ItemsEquipsCore'][_0x3592ba(0x4e9)][_0x3592ba(0x3c5)][_0x3592ba(0x4b9)],_0x140add=VisuMZ['ItemsEquipsCore']['Settings'][_0x3592ba(0x3c5)][_0x3592ba(0x573)];this[_0x3592ba(0x22c)](_0x5e082c,_0x55aefe+_0x58b382,_0x139db6+_0x140add);},Window_ItemList[_0x4a1256(0x5b7)]['setStatusWindow']=function(_0x4e37b7){const _0x34277b=_0x4a1256;this['_statusWindow']=_0x4e37b7,this[_0x34277b(0x581)]();},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x27f)]=Window_ItemList[_0x4a1256(0x5b7)][_0x4a1256(0x1ec)],Window_ItemList[_0x4a1256(0x5b7)]['updateHelp']=function(){const _0x55411b=_0x4a1256;VisuMZ[_0x55411b(0x242)][_0x55411b(0x27f)]['call'](this),this[_0x55411b(0x474)]&&this[_0x55411b(0x474)][_0x55411b(0x2c8)]===Window_ShopStatus&&this['_statusWindow'][_0x55411b(0x598)](this[_0x55411b(0x3a5)]());},Window_BattleItem[_0x4a1256(0x5b7)][_0x4a1256(0x2ca)]=function(_0x4edab4){const _0x3b6876=_0x4a1256;return BattleManager[_0x3b6876(0x238)]()?BattleManager[_0x3b6876(0x238)]()['canUse'](_0x4edab4):Window_ItemList['prototype'][_0x3b6876(0x2ca)][_0x3b6876(0x4f2)](this,_0x4edab4);},Window_EventItem[_0x4a1256(0x5b7)][_0x4a1256(0x2de)]=function(){return![];},Window_EquipStatus[_0x4a1256(0x5b7)][_0x4a1256(0x224)]=function(){const _0x2c79ec=_0x4a1256;return VisuMZ[_0x2c79ec(0x242)][_0x2c79ec(0x4e9)][_0x2c79ec(0x34e)]['EnableLayout'];},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x3f2)]=Window_EquipStatus[_0x4a1256(0x5b7)][_0x4a1256(0x39d)],Window_EquipStatus['prototype']['refresh']=function(){const _0x4c0546=_0x4a1256;this['hideAdditionalSprites'](),this[_0x4c0546(0x253)]();if(this[_0x4c0546(0x39f)])this[_0x4c0546(0x39f)]['refresh']();this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x4c0546(0x470)]():VisuMZ[_0x4c0546(0x242)][_0x4c0546(0x3f2)][_0x4c0546(0x4f2)](this);},Window_EquipStatus[_0x4a1256(0x5b7)]['prepareRefreshItemsEquipsCoreLayout']=function(){const _0x4a88d4=_0x4a1256;this[_0x4a88d4(0x3fe)][_0x4a88d4(0x55c)]();if(!this[_0x4a88d4(0x39f)])return;if(this[_0x4a88d4(0x40c)]()){const _0x190ac6=ImageManager['loadPicture'](this[_0x4a88d4(0x39f)][_0x4a88d4(0x4c9)]());_0x190ac6[_0x4a88d4(0x3d1)](this[_0x4a88d4(0x2bf)][_0x4a88d4(0x3f1)](this));}else this[_0x4a88d4(0x241)]();},Window_EquipStatus[_0x4a1256(0x5b7)]['isMainMenuCoreMenuImageOptionAvailable']=function(){const _0x13183e=_0x4a1256;return Imported['VisuMZ_1_MainMenuCore']&&this[_0x13183e(0x39f)][_0x13183e(0x4c9)]()!==''&&VisuMZ[_0x13183e(0x242)][_0x13183e(0x4e9)][_0x13183e(0x34e)][_0x13183e(0x595)];},Window_EquipStatus[_0x4a1256(0x5b7)][_0x4a1256(0x2bf)]=function(){const _0x213733=_0x4a1256;VisuMZ[_0x213733(0x242)][_0x213733(0x4e9)][_0x213733(0x34e)]['DrawPortraitJS'][_0x213733(0x4f2)](this),this[_0x213733(0x37d)]();},Window_EquipStatus[_0x4a1256(0x5b7)][_0x4a1256(0x241)]=function(){const _0x1f9b54=_0x4a1256;VisuMZ[_0x1f9b54(0x242)][_0x1f9b54(0x4e9)]['EquipScene']['DrawFaceJS'][_0x1f9b54(0x4f2)](this),this[_0x1f9b54(0x37d)]();},Window_EquipStatus['prototype']['drawParamsItemsEquipsCore']=function(){const _0x3dec50=_0x4a1256;this[_0x3dec50(0x253)](),VisuMZ[_0x3dec50(0x242)][_0x3dec50(0x4e9)]['EquipScene']['DrawParamJS']['call'](this);},Window_EquipStatus['prototype']['drawItemActorMenuImage']=function(_0x2d6670,_0x163a37,_0x5a8308,_0x628e2f,_0x3d5d0d){const _0x54ee02=_0x4a1256,_0x82c170=ImageManager[_0x54ee02(0x392)](_0x2d6670['getMenuImage']()),_0x1683c6=this['innerWidth']-_0x82c170[_0x54ee02(0x597)];_0x163a37+=_0x1683c6/0x2;if(_0x1683c6<0x0)_0x628e2f-=_0x1683c6;Window_StatusBase[_0x54ee02(0x5b7)][_0x54ee02(0x4e1)][_0x54ee02(0x4f2)](this,_0x2d6670,_0x163a37,_0x5a8308,_0x628e2f,_0x3d5d0d);},Window_EquipStatus[_0x4a1256(0x5b7)][_0x4a1256(0x1b8)]=function(){const _0x2b4670=_0x4a1256;return Imported[_0x2b4670(0x295)]?VisuMZ[_0x2b4670(0x5fa)][_0x2b4670(0x4e9)][_0x2b4670(0x497)]['ExtDisplayedParams']:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x4a1256(0x5b7)][_0x4a1256(0x579)]=function(){const _0x4a4329=_0x4a1256;return VisuMZ[_0x4a4329(0x242)][_0x4a4329(0x4e9)][_0x4a4329(0x34e)][_0x4a4329(0x2d6)];},Window_EquipStatus['prototype']['isUseParamNamesWithIcons']=function(){const _0x235e33=_0x4a1256;return Imported[_0x235e33(0x295)]&&VisuMZ['CoreEngine']['Settings']['Param'][_0x235e33(0x47a)];},Window_EquipStatus[_0x4a1256(0x5b7)][_0x4a1256(0x4c8)]=function(_0x5e5fe3,_0x31cfae,_0x2f73aa,_0xc49e4a){const _0xecdbfa=_0x4a1256,_0x221cd9=this[_0xecdbfa(0x1e7)]();Imported[_0xecdbfa(0x295)]?this[_0xecdbfa(0x4ab)](_0x31cfae+_0x221cd9,_0x2f73aa,_0xc49e4a,_0x5e5fe3,![]):this[_0xecdbfa(0x549)](TextManager['param'](_0x5e5fe3),_0x31cfae+_0x221cd9,_0x2f73aa,_0xc49e4a);},Window_EquipStatus['prototype']['drawUpdatedBeforeParamValue']=function(_0x4aab09,_0x39dab1,_0x42f047,_0x366d3e){const _0x178d23=_0x4a1256,_0x4e8237=this['itemPadding']();let _0x120932=0x0;Imported[_0x178d23(0x295)]?_0x120932=this[_0x178d23(0x39f)][_0x178d23(0x3f8)](_0x4aab09,!![]):_0x120932=this[_0x178d23(0x39f)]['param'](_0x4aab09);const _0x5c31e8=_0x120932;this[_0x178d23(0x549)](_0x120932,_0x39dab1,_0x42f047,_0x366d3e-_0x4e8237,_0x178d23(0x3f3));},Window_EquipStatus['prototype']['drawUpdatedAfterParamValue']=function(_0x35eeb9,_0x449c57,_0x1f1984,_0x189d83){const _0x1b9585=_0x4a1256,_0x452ccb=this[_0x1b9585(0x1e7)]();let _0x24b33c=0x0,_0x2038ff=0x0,_0x3d663a='';if(this[_0x1b9585(0x58c)]){Imported[_0x1b9585(0x295)]?(_0x24b33c=this[_0x1b9585(0x39f)][_0x1b9585(0x3f8)](_0x35eeb9,![]),_0x2038ff=this[_0x1b9585(0x58c)]['paramValueByName'](_0x35eeb9,![]),_0x3d663a=this[_0x1b9585(0x58c)]['paramValueByName'](_0x35eeb9,!![])):(_0x24b33c=this['_actor'][_0x1b9585(0x509)](_0x35eeb9),_0x2038ff=this['_tempActor'][_0x1b9585(0x509)](_0x35eeb9),_0x3d663a=this[_0x1b9585(0x58c)]['param'](_0x35eeb9));const _0x2549c=_0x24b33c,_0x4a02c5=_0x2038ff;diffValue=_0x4a02c5-_0x2549c,this[_0x1b9585(0x527)](ColorManager[_0x1b9585(0x259)](diffValue)),this[_0x1b9585(0x549)](_0x3d663a,_0x449c57,_0x1f1984,_0x189d83-_0x452ccb,_0x1b9585(0x3f3));}},Window_EquipStatus[_0x4a1256(0x5b7)][_0x4a1256(0x23a)]=function(_0x3a68ed,_0x2d1d34,_0x23a9ac,_0x39d430){const _0x1d2b17=_0x4a1256,_0x11d04b=this[_0x1d2b17(0x1e7)]();let _0x29f00a=0x0,_0x3d0bda=0x0,_0x124ee5=![];if(this[_0x1d2b17(0x58c)]){Imported[_0x1d2b17(0x295)]?(_0x29f00a=this[_0x1d2b17(0x39f)][_0x1d2b17(0x3f8)](_0x3a68ed,![]),_0x3d0bda=this['_tempActor'][_0x1d2b17(0x3f8)](_0x3a68ed,![]),_0x124ee5=String(this[_0x1d2b17(0x39f)][_0x1d2b17(0x3f8)](_0x3a68ed,!![]))[_0x1d2b17(0x4cd)](/([%％])/i)):(_0x29f00a=this[_0x1d2b17(0x39f)]['param'](_0x3a68ed),_0x3d0bda=this['_tempActor'][_0x1d2b17(0x509)](_0x3a68ed),_0x124ee5=_0x29f00a%0x1!==0x0||_0x3d0bda%0x1!==0x0);const _0xba74e9=_0x29f00a,_0x534bf0=_0x3d0bda,_0xa2526a=_0x534bf0-_0xba74e9;let _0x23e820=_0xa2526a;if(_0x124ee5)_0x23e820=Math[_0x1d2b17(0x55d)](_0xa2526a*0x64)+'%';_0xa2526a!==0x0&&(this['changeTextColor'](ColorManager[_0x1d2b17(0x259)](_0xa2526a)),_0x23e820=(_0xa2526a>0x0?'(+%1)':'(%1)')['format'](_0x23e820),this[_0x1d2b17(0x549)](_0x23e820,_0x2d1d34+_0x11d04b,_0x23a9ac,_0x39d430,_0x1d2b17(0x2b0)));}},Window_EquipStatus['prototype'][_0x4a1256(0x592)]=function(_0x406983,_0xc7bb8c,_0x296a02,_0x24c32d,_0x34fea7){const _0xfab318=_0x4a1256;if(VisuMZ[_0xfab318(0x242)][_0xfab318(0x4e9)]['EquipScene'][_0xfab318(0x59c)]===![])return;_0x34fea7=Math['max'](_0x34fea7||0x1,0x1);while(_0x34fea7--){_0x24c32d=_0x24c32d||this[_0xfab318(0x388)](),this[_0xfab318(0x3fe)][_0xfab318(0x2bd)]=0xa0;const _0x1de032=ColorManager[_0xfab318(0x5b1)]();this[_0xfab318(0x3fe)]['fillRect'](_0x406983+0x1,_0xc7bb8c+0x1,_0x296a02-0x2,_0x24c32d-0x2,_0x1de032),this[_0xfab318(0x3fe)][_0xfab318(0x2bd)]=0xff;}},ColorManager[_0x4a1256(0x5b1)]=function(){const _0x2667e3=_0x4a1256,_0x4e17d5=VisuMZ[_0x2667e3(0x242)][_0x2667e3(0x4e9)][_0x2667e3(0x34e)];let _0x2f60a0=_0x4e17d5[_0x2667e3(0x3ce)]!==undefined?_0x4e17d5[_0x2667e3(0x3ce)]:0x13;return ColorManager[_0x2667e3(0x2ce)](_0x2f60a0);},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x1b1)]=Window_EquipCommand['prototype'][_0x4a1256(0x305)],Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x305)]=function(_0x55a724){const _0x2409d1=_0x4a1256;VisuMZ['ItemsEquipsCore']['Window_EquipCommand_initialize'][_0x2409d1(0x4f2)](this,_0x55a724),this[_0x2409d1(0x3b8)](_0x55a724);},Window_EquipCommand[_0x4a1256(0x5b7)]['createCommandNameWindow']=function(_0x27196a){const _0x25b091=_0x4a1256,_0x231548=new Rectangle(0x0,0x0,_0x27196a[_0x25b091(0x597)],_0x27196a['height']);this['_commandNameWindow']=new Window_Base(_0x231548),this[_0x25b091(0x2f1)][_0x25b091(0x28e)]=0x0,this['addChild'](this['_commandNameWindow']),this[_0x25b091(0x4f0)]();},Window_EquipCommand[_0x4a1256(0x5b7)]['callUpdateHelp']=function(){const _0x4f6658=_0x4a1256;Window_HorzCommand['prototype'][_0x4f6658(0x581)][_0x4f6658(0x4f2)](this);if(this[_0x4f6658(0x2f1)])this[_0x4f6658(0x4f0)]();},Window_EquipCommand['prototype']['updateCommandNameWindow']=function(){const _0x1a67a4=_0x4a1256,_0xb03605=this[_0x1a67a4(0x2f1)];_0xb03605[_0x1a67a4(0x3fe)]['clear']();const _0x30da0a=this['commandStyleCheck'](this['index']());if(_0x30da0a===_0x1a67a4(0x2b2)){const _0x44ad8a=this[_0x1a67a4(0x4dc)](this[_0x1a67a4(0x1f9)]());let _0x7a91ff=this[_0x1a67a4(0x1fc)](this[_0x1a67a4(0x1f9)]());_0x7a91ff=_0x7a91ff[_0x1a67a4(0x282)](/\\I\[(\d+)\]/gi,''),_0xb03605['resetFontSettings'](),this[_0x1a67a4(0x447)](_0x7a91ff,_0x44ad8a),this[_0x1a67a4(0x373)](_0x7a91ff,_0x44ad8a),this[_0x1a67a4(0x5ad)](_0x7a91ff,_0x44ad8a);}},Window_EquipCommand['prototype'][_0x4a1256(0x447)]=function(_0x47bea2,_0x3a7592){},Window_EquipCommand['prototype'][_0x4a1256(0x373)]=function(_0x5eebf4,_0x2d1063){const _0x4ede17=_0x4a1256,_0x6f590d=this[_0x4ede17(0x2f1)];_0x6f590d['drawText'](_0x5eebf4,0x0,_0x2d1063['y'],_0x6f590d[_0x4ede17(0x1c2)],'center');},Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x5ad)]=function(_0x50bf9d,_0x3cb335){const _0x704911=_0x4a1256,_0x4d7b61=this[_0x704911(0x2f1)],_0x3dbee9=$gameSystem[_0x704911(0x490)](),_0x397908=_0x3cb335['x']+Math[_0x704911(0x21d)](_0x3cb335['width']/0x2)+_0x3dbee9;_0x4d7b61['x']=_0x4d7b61[_0x704911(0x597)]/-0x2+_0x397908,_0x4d7b61['y']=Math[_0x704911(0x21d)](_0x3cb335[_0x704911(0x1d9)]/0x2);},Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x414)]=function(){const _0x5e82db=_0x4a1256;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand['prototype'][_0x5e82db(0x414)][_0x5e82db(0x4f2)](this);},Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x360)]=function(){const _0x3a5d96=_0x4a1256;if(this[_0x3a5d96(0x24d)]()===_0x3a5d96(0x5e3))Window_HorzCommand['prototype'][_0x3a5d96(0x360)][_0x3a5d96(0x4f2)](this);},Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x489)]=function(){const _0x29d1f8=_0x4a1256;!this[_0x29d1f8(0x275)]()&&Window_HorzCommand[_0x29d1f8(0x5b7)][_0x29d1f8(0x489)][_0x29d1f8(0x4f2)](this);},Window_EquipCommand[_0x4a1256(0x5b7)]['processCursorSpecialCheckModernControls']=function(){const _0x3a14f8=_0x4a1256;if(!this['isCursorMovable']())return![];if(SceneManager[_0x3a14f8(0x555)][_0x3a14f8(0x2c8)]!==Scene_Equip)return![];return Input[_0x3a14f8(0x3c3)](_0x3a14f8(0x2f5))&&this[_0x3a14f8(0x4c3)](),![];},Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x4c3)]=function(){const _0x233100=_0x4a1256;this['playCursorSound'](),SceneManager[_0x233100(0x555)][_0x233100(0x20b)](),SceneManager[_0x233100(0x555)][_0x233100(0x211)]['smoothSelect'](-0x1);},Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x1ea)]=function(){const _0x549b9b=_0x4a1256;return this[_0x549b9b(0x456)]?this[_0x549b9b(0x456)][_0x549b9b(0x45a)]:0x3;},Window_EquipCommand[_0x4a1256(0x5b7)]['processTouchModernControls']=function(){const _0x5ccb22=_0x4a1256;if(this[_0x5ccb22(0x25b)]()&&this[_0x5ccb22(0x1b9)]&&SceneManager[_0x5ccb22(0x555)][_0x5ccb22(0x2c8)]===Scene_Equip){if(this[_0x5ccb22(0x2a6)]()&&TouchInput[_0x5ccb22(0x448)]())this[_0x5ccb22(0x321)](![]);else TouchInput[_0x5ccb22(0x3c3)]()&&this[_0x5ccb22(0x321)](!![]);TouchInput[_0x5ccb22(0x2fb)]()&&this['onTouchOk']();}},Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x321)]=function(_0x457d4f){const _0x291d3a=_0x4a1256;this[_0x291d3a(0x25d)]=![];const _0x2c00f3=this[_0x291d3a(0x1f9)](),_0x270381=this['hitIndex'](),_0x3d3aca=SceneManager[_0x291d3a(0x555)][_0x291d3a(0x211)];if(_0x3d3aca[_0x291d3a(0x25b)]()&&_0x3d3aca['visible']){if(_0x270381>=0x0)_0x270381===this[_0x291d3a(0x1f9)]()&&(this[_0x291d3a(0x25d)]=!![]),this['activate'](),this[_0x291d3a(0x36e)](_0x270381);else _0x3d3aca[_0x291d3a(0x574)]()>=0x0&&(this[_0x291d3a(0x4f5)](),this[_0x291d3a(0x5c4)]());}_0x457d4f&&this[_0x291d3a(0x1f9)]()!==_0x2c00f3&&this[_0x291d3a(0x28f)]();},Window_EquipCommand['prototype'][_0x4a1256(0x31b)]=function(){const _0x2d620a=_0x4a1256;this[_0x2d620a(0x4a3)](),this['addOptimizeCommand'](),this[_0x2d620a(0x43e)]();},Window_EquipCommand[_0x4a1256(0x5b7)]['refresh']=function(){const _0x5df2fd=_0x4a1256;Window_HorzCommand[_0x5df2fd(0x5b7)]['refresh'][_0x5df2fd(0x4f2)](this),this[_0x5df2fd(0x53b)]();},Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x4a3)]=function(){const _0x21ca6f=_0x4a1256;if(!this[_0x21ca6f(0x315)]())return;const _0x12aeef=this['commandStyle'](),_0x3605f1=VisuMZ[_0x21ca6f(0x242)][_0x21ca6f(0x4e9)][_0x21ca6f(0x34e)][_0x21ca6f(0x57c)],_0x3f86ad=_0x12aeef===_0x21ca6f(0x543)?TextManager[_0x21ca6f(0x3af)]:_0x21ca6f(0x50f)[_0x21ca6f(0x434)](_0x3605f1,TextManager[_0x21ca6f(0x3af)]),_0x2be975=this[_0x21ca6f(0x5a4)]();this[_0x21ca6f(0x335)](_0x3f86ad,_0x21ca6f(0x5e3),_0x2be975);},Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x315)]=function(){const _0x29a7ad=_0x4a1256;return!this[_0x29a7ad(0x414)]();},Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x5a4)]=function(){return!![];},Window_EquipCommand[_0x4a1256(0x5b7)]['addOptimizeCommand']=function(){const _0x5dac2e=_0x4a1256;if(!this[_0x5dac2e(0x45f)]())return;const _0x6e2c77=this['commandStyle'](),_0x12c6c3=VisuMZ[_0x5dac2e(0x242)]['Settings']['EquipScene'][_0x5dac2e(0x1bf)],_0x440d7a=_0x6e2c77===_0x5dac2e(0x543)?TextManager[_0x5dac2e(0x499)]:_0x5dac2e(0x50f)[_0x5dac2e(0x434)](_0x12c6c3,TextManager[_0x5dac2e(0x499)]),_0x2d676b=this[_0x5dac2e(0x4d2)]();this[_0x5dac2e(0x335)](_0x440d7a,_0x5dac2e(0x499),_0x2d676b);},Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x45f)]=function(){const _0x3c22e6=_0x4a1256;return VisuMZ[_0x3c22e6(0x242)]['Settings'][_0x3c22e6(0x34e)]['CommandAddOptimize'];},Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x4d2)]=function(){return!![];},Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x43e)]=function(){const _0x481a73=_0x4a1256;if(!this['isClearCommandAdded']())return;const _0x83ee2b=this[_0x481a73(0x32a)](),_0xe796df=VisuMZ[_0x481a73(0x242)][_0x481a73(0x4e9)][_0x481a73(0x34e)][_0x481a73(0x2ff)],_0x231b04=_0x83ee2b==='text'?TextManager[_0x481a73(0x55c)]:_0x481a73(0x50f)[_0x481a73(0x434)](_0xe796df,TextManager['clear']),_0xb9b62d=this['isClearCommandEnabled']();this[_0x481a73(0x335)](_0x231b04,'clear',_0xb9b62d);},Window_EquipCommand['prototype'][_0x4a1256(0x4ae)]=function(){const _0x205a63=_0x4a1256;return VisuMZ['ItemsEquipsCore'][_0x205a63(0x4e9)]['EquipScene'][_0x205a63(0x502)];},Window_EquipCommand['prototype']['isClearCommandEnabled']=function(){return!![];},Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x5aa)]=function(){const _0x5819f0=_0x4a1256;return VisuMZ[_0x5819f0(0x242)]['Settings'][_0x5819f0(0x34e)][_0x5819f0(0x53a)];},Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x463)]=function(_0x50ab3f){const _0x53ee48=_0x4a1256,_0x6fab=this[_0x53ee48(0x53f)](_0x50ab3f);if(_0x6fab===_0x53ee48(0x2cb))this['drawItemStyleIconText'](_0x50ab3f);else _0x6fab===_0x53ee48(0x2b2)?this[_0x53ee48(0x5d7)](_0x50ab3f):Window_HorzCommand[_0x53ee48(0x5b7)]['drawItem'][_0x53ee48(0x4f2)](this,_0x50ab3f);},Window_EquipCommand['prototype'][_0x4a1256(0x32a)]=function(){const _0x325768=_0x4a1256;return VisuMZ['ItemsEquipsCore'][_0x325768(0x4e9)]['EquipScene']['CmdStyle'];},Window_EquipCommand[_0x4a1256(0x5b7)]['commandStyleCheck']=function(_0x348567){const _0x1dac89=_0x4a1256;if(_0x348567<0x0)return'text';const _0x5ad48e=this['commandStyle']();if(_0x5ad48e!==_0x1dac89(0x400))return _0x5ad48e;else{if(this['maxItems']()>0x0){const _0x3fc7bd=this[_0x1dac89(0x1fc)](_0x348567);if(_0x3fc7bd[_0x1dac89(0x4cd)](/\\I\[(\d+)\]/i)){const _0xc65310=this['itemLineRect'](_0x348567),_0x25cbc7=this['textSizeEx'](_0x3fc7bd)[_0x1dac89(0x597)];return _0x25cbc7<=_0xc65310['width']?_0x1dac89(0x2cb):_0x1dac89(0x2b2);}}}return'text';},Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x43a)]=function(_0x55528a){const _0x220360=_0x4a1256,_0x1f30d0=this[_0x220360(0x4dc)](_0x55528a),_0xed7f77=this[_0x220360(0x1fc)](_0x55528a),_0x52253f=this[_0x220360(0x564)](_0xed7f77)['width'];this[_0x220360(0x586)](this['isCommandEnabled'](_0x55528a));const _0x14d369=this[_0x220360(0x5aa)]();if(_0x14d369===_0x220360(0x3f3))this[_0x220360(0x218)](_0xed7f77,_0x1f30d0['x']+_0x1f30d0[_0x220360(0x597)]-_0x52253f,_0x1f30d0['y'],_0x52253f);else{if(_0x14d369==='center'){const _0x59cb5e=_0x1f30d0['x']+Math[_0x220360(0x21d)]((_0x1f30d0[_0x220360(0x597)]-_0x52253f)/0x2);this[_0x220360(0x218)](_0xed7f77,_0x59cb5e,_0x1f30d0['y'],_0x52253f);}else this[_0x220360(0x218)](_0xed7f77,_0x1f30d0['x'],_0x1f30d0['y'],_0x52253f);}},Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x5d7)]=function(_0xab08e9){const _0x2c31da=_0x4a1256;this[_0x2c31da(0x1fc)](_0xab08e9)[_0x2c31da(0x4cd)](/\\I\[(\d+)\]/i);const _0x391d03=Number(RegExp['$1'])||0x0,_0x92f34e=this[_0x2c31da(0x4dc)](_0xab08e9),_0x37f8c9=_0x92f34e['x']+Math[_0x2c31da(0x21d)]((_0x92f34e[_0x2c31da(0x597)]-ImageManager[_0x2c31da(0x4d0)])/0x2),_0x5ed4eb=_0x92f34e['y']+(_0x92f34e['height']-ImageManager[_0x2c31da(0x1d8)])/0x2;this[_0x2c31da(0x3d0)](_0x391d03,_0x37f8c9,_0x5ed4eb);},Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x238)]=function(){const _0x256273=_0x4a1256,_0x5b47c6=SceneManager['_scene'];if(_0x5b47c6&&_0x5b47c6[_0x256273(0x2fd)])return _0x5b47c6[_0x256273(0x2fd)]();return null;},Window_EquipCommand[_0x4a1256(0x5b7)]['updateHelp']=function(){const _0x8015b7=_0x4a1256;Window_Command[_0x8015b7(0x5b7)][_0x8015b7(0x1ec)][_0x8015b7(0x4f2)](this),this[_0x8015b7(0x5d5)][_0x8015b7(0x585)](this['helpDescriptionText']());},Window_EquipCommand[_0x4a1256(0x5b7)][_0x4a1256(0x302)]=function(){const _0xc439d5=_0x4a1256,_0x5f594f=this['currentSymbol']();switch(_0x5f594f){case _0xc439d5(0x5e3):return TextManager['ITEMS_EQUIPS_CORE'][_0xc439d5(0x272)]['equip'];case _0xc439d5(0x499):return TextManager[_0xc439d5(0x56f)][_0xc439d5(0x272)][_0xc439d5(0x499)];case _0xc439d5(0x55c):return TextManager[_0xc439d5(0x56f)][_0xc439d5(0x272)]['clear'];default:return'';}},Window_EquipSlot[_0x4a1256(0x5b7)][_0x4a1256(0x414)]=function(){const _0x576041=_0x4a1256;return Imported[_0x576041(0x295)]&&Window_HorzCommand[_0x576041(0x5b7)][_0x576041(0x414)][_0x576041(0x4f2)](this);},Window_EquipSlot['prototype']['activate']=function(){const _0x556912=_0x4a1256;Window_StatusBase[_0x556912(0x5b7)][_0x556912(0x308)]['call'](this),this['callUpdateHelp']();},Window_EquipSlot[_0x4a1256(0x5b7)][_0x4a1256(0x5ac)]=function(){const _0x185889=_0x4a1256;Window_StatusBase[_0x185889(0x5b7)]['processCursorMove'][_0x185889(0x4f2)](this),this[_0x185889(0x257)]();},Window_EquipSlot['prototype'][_0x4a1256(0x257)]=function(){const _0x5dd753=_0x4a1256;if(!this[_0x5dd753(0x4c6)]())return;if(Input[_0x5dd753(0x3c3)](_0x5dd753(0x44a))&&this[_0x5dd753(0x3a5)]()){const _0x30b5b0=SceneManager['_scene']['_actor'];_0x30b5b0&&(this[_0x5dd753(0x54a)](this['index']())?(this['processShiftRemoveShortcut'](),this[_0x5dd753(0x1ec)]()):this[_0x5dd753(0x2a9)]());}},Window_EquipSlot['prototype']['canShiftRemoveEquipment']=function(_0x3cfe1e){const _0x40af57=_0x4a1256,_0x4a9d27=SceneManager[_0x40af57(0x555)][_0x40af57(0x39f)];if(!_0x4a9d27)return;if(!_0x4a9d27['isEquipChangeOk'](_0x3cfe1e))return![];const _0x181280=_0x4a9d27[_0x40af57(0x3bb)]()[_0x3cfe1e];if(_0x4a9d27['nonRemovableEtypes']()['includes'](_0x181280))return![];return!![];;},Window_EquipSlot['prototype'][_0x4a1256(0x5e0)]=function(){const _0x373e33=_0x4a1256;SoundManager['playEquip']();const _0x15950f=SceneManager['_scene'][_0x373e33(0x39f)];_0x15950f[_0x373e33(0x1b2)](this['index'](),null),this[_0x373e33(0x39d)](),this['_itemWindow'][_0x373e33(0x39d)](),this[_0x373e33(0x581)]();const _0x509446=SceneManager[_0x373e33(0x555)]['_statusWindow'];if(_0x509446)_0x509446[_0x373e33(0x39d)]();},Window_EquipSlot[_0x4a1256(0x5b7)]['isShiftRemoveShortcutEnabled']=function(){const _0x567d50=_0x4a1256;if(!this[_0x567d50(0x375)])return![];if(!VisuMZ[_0x567d50(0x242)][_0x567d50(0x4e9)]['EquipScene'][_0x567d50(0x34d)])return![];return!![];},Window_EquipSlot[_0x4a1256(0x5b7)]['processCursorMoveModernControls']=function(){const _0xd496f9=_0x4a1256;!this[_0xd496f9(0x275)]()&&Window_StatusBase[_0xd496f9(0x5b7)][_0xd496f9(0x489)][_0xd496f9(0x4f2)](this);},Window_EquipSlot[_0x4a1256(0x5b7)][_0x4a1256(0x275)]=function(){const _0x6f2550=_0x4a1256;if(!this[_0x6f2550(0x551)]())return![];if(SceneManager['_scene'][_0x6f2550(0x2c8)]!==Scene_Equip)return![];if(this[_0x6f2550(0x265)]())return this[_0x6f2550(0x28f)](),Input[_0x6f2550(0x55c)](),SceneManager[_0x6f2550(0x555)][_0x6f2550(0x1f6)](),![];else{if(Input[_0x6f2550(0x3d6)](_0x6f2550(0x2f5))){const _0x22be71=this[_0x6f2550(0x1f9)]();return Input['isPressed'](_0x6f2550(0x44a))?this[_0x6f2550(0x2eb)]():this[_0x6f2550(0x320)](Input['isTriggered'](_0x6f2550(0x2f5))),this[_0x6f2550(0x1f9)]()!==_0x22be71&&this[_0x6f2550(0x28f)](),!![];}else{if(this['isShiftShortcutKeyForRemove']()&&Input[_0x6f2550(0x3c3)](_0x6f2550(0x44a)))return!![];}}return![];},Window_EquipSlot['prototype'][_0x4a1256(0x265)]=function(){const _0x468a50=_0x4a1256;if(this['index']()!==0x0)return![];const _0x23a1e7=VisuMZ[_0x468a50(0x242)][_0x468a50(0x4e9)][_0x468a50(0x34e)];if(!_0x23a1e7[_0x468a50(0x2fa)]&&!_0x23a1e7[_0x468a50(0x502)])return![];return Input[_0x468a50(0x3c3)]('up');},Window_EquipSlot[_0x4a1256(0x5b7)]['isShiftShortcutKeyForRemove']=function(){const _0x5db154=_0x4a1256;return VisuMZ[_0x5db154(0x242)][_0x5db154(0x4e9)][_0x5db154(0x34e)][_0x5db154(0x34d)];},Window_EquipSlot[_0x4a1256(0x5b7)][_0x4a1256(0x2c4)]=function(){const _0x135021=_0x4a1256;if(this[_0x135021(0x25b)]()&&this[_0x135021(0x1b9)]&&SceneManager[_0x135021(0x555)][_0x135021(0x2c8)]===Scene_Equip){if(this[_0x135021(0x2a6)]()&&TouchInput[_0x135021(0x448)]())this['onTouchSelectModernControls'](![]);else TouchInput[_0x135021(0x3c3)]()&&this[_0x135021(0x321)](!![]);if(TouchInput[_0x135021(0x2fb)]())this[_0x135021(0x378)]();else{if(TouchInput['isCancelled']()){const _0x5ba445=VisuMZ[_0x135021(0x242)]['Settings'][_0x135021(0x34e)];this[_0x135021(0x414)]()&&this[_0x135021(0x375)]&&!_0x5ba445['CommandAddOptimize']&&!_0x5ba445[_0x135021(0x502)]?(SoundManager[_0x135021(0x438)](),SceneManager['pop']()):this[_0x135021(0x3b1)]();}}}},Window_EquipSlot['prototype']['onTouchSelectModernControls']=function(_0x4a2d53){const _0x1729fb=_0x4a1256;this['_doubleTouch']=![];const _0x57b8c5=this[_0x1729fb(0x1f9)](),_0x53f526=this[_0x1729fb(0x574)](),_0x534223=SceneManager[_0x1729fb(0x555)][_0x1729fb(0x236)];if(_0x534223['isOpen']()&&_0x534223[_0x1729fb(0x1b9)]){if(_0x53f526>=0x0)_0x53f526===this[_0x1729fb(0x1f9)]()&&(this[_0x1729fb(0x25d)]=!![]),this[_0x1729fb(0x308)](),this[_0x1729fb(0x36e)](_0x53f526),_0x534223[_0x1729fb(0x4f5)]();else _0x534223[_0x1729fb(0x574)]()>=0x0&&(this[_0x1729fb(0x4f5)](),this[_0x1729fb(0x5c4)](),_0x534223[_0x1729fb(0x308)]());}_0x4a2d53&&this['index']()!==_0x57b8c5&&this[_0x1729fb(0x28f)]();},Window_EquipSlot['prototype']['equipSlotIndex']=function(){const _0x382f52=_0x4a1256;return this[_0x382f52(0x1f9)]();},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x312)]=Window_EquipSlot[_0x4a1256(0x5b7)][_0x4a1256(0x2ca)],Window_EquipSlot[_0x4a1256(0x5b7)][_0x4a1256(0x2ca)]=function(_0x17a5a7){const _0x25b429=_0x4a1256;if(this[_0x25b429(0x37a)]()<=0x0)return![];return VisuMZ[_0x25b429(0x242)][_0x25b429(0x312)][_0x25b429(0x4f2)](this,_0x17a5a7);},VisuMZ['ItemsEquipsCore'][_0x4a1256(0x2b3)]=Window_EquipItem[_0x4a1256(0x5b7)][_0x4a1256(0x220)],Window_EquipItem[_0x4a1256(0x5b7)][_0x4a1256(0x220)]=function(_0x513bb6){const _0x1622f1=_0x4a1256;if(_0x513bb6===null&&this[_0x1622f1(0x4d9)]()['includes'](this['etypeId']()))return![];else{$gameTemp['_checkEquipRequirements']=!![];let _0x4fa338=VisuMZ[_0x1622f1(0x242)][_0x1622f1(0x2b3)][_0x1622f1(0x4f2)](this,_0x513bb6);if(!_0x4fa338&&_0x513bb6&&DataManager[_0x1622f1(0x560)](_0x513bb6)){const _0x270934=_0x513bb6['atypeId']||0x0;if(this[_0x1622f1(0x39f)]&&this['_actor']['isEquipAtypeOk'](_0x270934)){const _0x3b6bd2=DataManager[_0x1622f1(0x5b3)](_0x513bb6);_0x3b6bd2['includes'](this[_0x1622f1(0x366)]())&&(_0x4fa338=!![]);}}return $gameTemp[_0x1622f1(0x37e)]=undefined,_0x4fa338;}},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x3ff)]=Window_EquipItem[_0x4a1256(0x5b7)]['isEnabled'],Window_EquipItem[_0x4a1256(0x5b7)]['isEnabled']=function(_0x30d425){const _0x5d670d=_0x4a1256;if(_0x30d425&&this[_0x5d670d(0x39f)]){if(this[_0x5d670d(0x387)](_0x30d425))return![];if(this[_0x5d670d(0x4de)](_0x30d425))return![];if(this[_0x5d670d(0x528)](_0x30d425))return![];if(!this[_0x5d670d(0x39f)][_0x5d670d(0x3f7)](_0x30d425))return![];}if(!_0x30d425)return!this[_0x5d670d(0x4d9)]()[_0x5d670d(0x220)](this[_0x5d670d(0x366)]());return VisuMZ['ItemsEquipsCore'][_0x5d670d(0x3ff)][_0x5d670d(0x4f2)](this,_0x30d425);},Window_EquipItem[_0x4a1256(0x5b7)][_0x4a1256(0x387)]=function(_0x52ddf5){const _0x1b8450=_0x4a1256,_0x109501=_0x52ddf5[_0x1b8450(0x4ff)];if(_0x109501[_0x1b8450(0x4cd)](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){const _0x2a471b=Number(RegExp['$1'])||0x1;let _0x1c09be=0x0;const _0xefa561=this[_0x1b8450(0x39f)][_0x1b8450(0x5e2)](),_0x840013=SceneManager['_scene'][_0x1b8450(0x211)][_0x1b8450(0x4c4)]();_0xefa561[_0x840013]=null;for(const _0x24a098 of _0xefa561){if(!_0x24a098)continue;if(DataManager[_0x1b8450(0x231)](_0x52ddf5)===DataManager[_0x1b8450(0x231)](_0x24a098)){if(_0x52ddf5['id']===_0x24a098['id'])_0x1c09be+=0x1;}}return _0x1c09be>=_0x2a471b;}else return![];},Window_EquipItem[_0x4a1256(0x5b7)][_0x4a1256(0x4de)]=function(_0x1c0e51){const _0x2d7f74=_0x4a1256;if(!DataManager['isWeapon'](_0x1c0e51))return![];const _0x11ad09=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x36f4b1=0x0;const _0x397181=this[_0x2d7f74(0x39f)][_0x2d7f74(0x5e2)](),_0x1a912c=SceneManager[_0x2d7f74(0x555)]['_slotWindow'][_0x2d7f74(0x4c4)]();_0x397181[_0x1a912c]=null;for(const _0x55f1da of _0x397181){if(!_0x55f1da)continue;if(!DataManager[_0x2d7f74(0x231)](_0x55f1da))continue;if(_0x1c0e51[_0x2d7f74(0x547)]===_0x55f1da[_0x2d7f74(0x547)]){_0x36f4b1+=0x1;if(_0x1c0e51[_0x2d7f74(0x4ff)][_0x2d7f74(0x4cd)](_0x11ad09)){const _0x32002e=Number(RegExp['$1'])||0x1;if(_0x36f4b1>=_0x32002e)return!![];}if(_0x55f1da[_0x2d7f74(0x4ff)]['match'](_0x11ad09)){const _0x31a4dd=Number(RegExp['$1'])||0x1;if(_0x36f4b1>=_0x31a4dd)return!![];}}}return![];},Window_EquipItem[_0x4a1256(0x5b7)][_0x4a1256(0x528)]=function(_0x4ccbb0){const _0x13337f=_0x4a1256;if(!DataManager['isArmor'](_0x4ccbb0))return![];const _0xbcf876=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x2a3ea5=0x0;const _0x472045=this['_actor'][_0x13337f(0x5e2)](),_0x375da9=SceneManager[_0x13337f(0x555)][_0x13337f(0x211)][_0x13337f(0x4c4)]();_0x472045[_0x375da9]=null;for(const _0x36d4b4 of _0x472045){if(!_0x36d4b4)continue;if(!DataManager[_0x13337f(0x560)](_0x36d4b4))continue;if(_0x4ccbb0[_0x13337f(0x1c3)]===_0x36d4b4[_0x13337f(0x1c3)]){_0x2a3ea5+=0x1;if(_0x4ccbb0[_0x13337f(0x4ff)][_0x13337f(0x4cd)](_0xbcf876)){const _0x453eb9=Number(RegExp['$1'])||0x1;if(_0x2a3ea5>=_0x453eb9)return!![];}if(_0x36d4b4[_0x13337f(0x4ff)][_0x13337f(0x4cd)](_0xbcf876)){const _0x36ea67=Number(RegExp['$1'])||0x1;if(_0x2a3ea5>=_0x36ea67)return!![];}}}return![];},Window_EquipItem[_0x4a1256(0x5b7)][_0x4a1256(0x4d9)]=function(){const _0x5f4936=_0x4a1256;return VisuMZ[_0x5f4936(0x242)][_0x5f4936(0x4e9)][_0x5f4936(0x34e)][_0x5f4936(0x4bb)];},Window_EquipItem[_0x4a1256(0x5b7)]['drawItem']=function(_0x5248a9){const _0x5b8588=_0x4a1256,_0x389465=this[_0x5b8588(0x266)](_0x5248a9);_0x389465?Window_ItemList[_0x5b8588(0x5b7)][_0x5b8588(0x463)][_0x5b8588(0x4f2)](this,_0x5248a9):this['drawRemoveItem'](_0x5248a9);},Window_EquipItem[_0x4a1256(0x5b7)][_0x4a1256(0x46e)]=function(_0x1cc2ad){const _0x18df8d=_0x4a1256;this[_0x18df8d(0x586)](this[_0x18df8d(0x2ca)](null));const _0x3367b2=ImageManager['standardIconWidth']||0x20,_0x3efe04=_0x3367b2-ImageManager['iconWidth'],_0x5d9593=_0x3367b2+0x4,_0x1be7ef=VisuMZ['ItemsEquipsCore'][_0x18df8d(0x4e9)][_0x18df8d(0x34e)],_0x3eebd8=this['itemLineRect'](_0x1cc2ad),_0x89434f=_0x3eebd8['y']+(this[_0x18df8d(0x388)]()-ImageManager[_0x18df8d(0x1d8)])/0x2,_0x22e116=Math['max'](0x0,_0x3eebd8[_0x18df8d(0x597)]-_0x5d9593);this[_0x18df8d(0x28b)](),this[_0x18df8d(0x3d0)](_0x1be7ef[_0x18df8d(0x216)],_0x3eebd8['x']+Math[_0x18df8d(0x3b5)](_0x3efe04/0x2),_0x89434f),this[_0x18df8d(0x549)](_0x1be7ef[_0x18df8d(0x3c2)],_0x3eebd8['x']+_0x5d9593,_0x3eebd8['y'],_0x22e116),this[_0x18df8d(0x586)](!![]);},Window_EquipItem[_0x4a1256(0x5b7)][_0x4a1256(0x1ec)]=function(){const _0x496cbe=_0x4a1256;Window_ItemList[_0x496cbe(0x5b7)]['updateHelp'][_0x496cbe(0x4f2)](this);if(this[_0x496cbe(0x39f)]&&this[_0x496cbe(0x474)]&&this[_0x496cbe(0x368)]>=0x0){const _0x37ac52=JsonEx['makeDeepCopy'](this[_0x496cbe(0x39f)]);_0x37ac52['_tempActor']=!![],_0x37ac52[_0x496cbe(0x32b)](this[_0x496cbe(0x368)],this['item']()),this[_0x496cbe(0x474)][_0x496cbe(0x2c5)](_0x37ac52);}},VisuMZ[_0x4a1256(0x242)]['Window_ShopCommand_initialize']=Window_ShopCommand['prototype'][_0x4a1256(0x305)],Window_ShopCommand['prototype'][_0x4a1256(0x305)]=function(_0x137c17){const _0x1e75fc=_0x4a1256;VisuMZ['ItemsEquipsCore'][_0x1e75fc(0x370)][_0x1e75fc(0x4f2)](this,_0x137c17),this[_0x1e75fc(0x3b8)](_0x137c17);},Window_ShopCommand[_0x4a1256(0x5b7)][_0x4a1256(0x3b8)]=function(_0x908fd9){const _0x5276ee=_0x4a1256,_0x6aa237=new Rectangle(0x0,0x0,_0x908fd9['width'],_0x908fd9[_0x5276ee(0x1d9)]);this['_commandNameWindow']=new Window_Base(_0x6aa237),this[_0x5276ee(0x2f1)][_0x5276ee(0x28e)]=0x0,this['addChild'](this[_0x5276ee(0x2f1)]),this[_0x5276ee(0x4f0)]();},Window_ShopCommand['prototype'][_0x4a1256(0x581)]=function(){const _0x140f6c=_0x4a1256;Window_HorzCommand[_0x140f6c(0x5b7)][_0x140f6c(0x581)][_0x140f6c(0x4f2)](this);if(this['_commandNameWindow'])this['updateCommandNameWindow']();},Window_ShopCommand[_0x4a1256(0x5b7)]['updateCommandNameWindow']=function(){const _0x5a1e24=_0x4a1256,_0x5472c0=this['_commandNameWindow'];_0x5472c0['contents'][_0x5a1e24(0x55c)]();const _0x379208=this[_0x5a1e24(0x53f)](this[_0x5a1e24(0x1f9)]());if(_0x379208===_0x5a1e24(0x2b2)){const _0x398e7d=this[_0x5a1e24(0x4dc)](this[_0x5a1e24(0x1f9)]());let _0xe88e93=this[_0x5a1e24(0x1fc)](this['index']());_0xe88e93=_0xe88e93['replace'](/\\I\[(\d+)\]/gi,''),_0x5472c0['resetFontSettings'](),this['commandNameWindowDrawBackground'](_0xe88e93,_0x398e7d),this[_0x5a1e24(0x373)](_0xe88e93,_0x398e7d),this[_0x5a1e24(0x5ad)](_0xe88e93,_0x398e7d);}},Window_ShopCommand[_0x4a1256(0x5b7)][_0x4a1256(0x447)]=function(_0x5ee468,_0x566662){},Window_ShopCommand[_0x4a1256(0x5b7)][_0x4a1256(0x373)]=function(_0x43d36a,_0x2ed698){const _0x567aec=_0x4a1256,_0x2a61a7=this[_0x567aec(0x2f1)];_0x2a61a7[_0x567aec(0x549)](_0x43d36a,0x0,_0x2ed698['y'],_0x2a61a7[_0x567aec(0x1c2)],_0x567aec(0x36d));},Window_ShopCommand[_0x4a1256(0x5b7)][_0x4a1256(0x5ad)]=function(_0x2984b6,_0x3e58e5){const _0x4c1abe=_0x4a1256,_0x43c33d=this[_0x4c1abe(0x2f1)],_0x4e9544=$gameSystem[_0x4c1abe(0x490)](),_0x5ee9d8=_0x3e58e5['x']+Math['floor'](_0x3e58e5['width']/0x2)+_0x4e9544;_0x43c33d['x']=_0x43c33d[_0x4c1abe(0x597)]/-0x2+_0x5ee9d8,_0x43c33d['y']=Math[_0x4c1abe(0x21d)](_0x3e58e5['height']/0x2);},Window_ShopCommand[_0x4a1256(0x5b7)][_0x4a1256(0x1ea)]=function(){const _0xdf722d=_0x4a1256;return this[_0xdf722d(0x456)]?this[_0xdf722d(0x456)][_0xdf722d(0x45a)]:0x3;},Window_ShopCommand[_0x4a1256(0x5b7)][_0x4a1256(0x32d)]=function(){const _0x496cbd=_0x4a1256;return VisuMZ['ItemsEquipsCore'][_0x496cbd(0x4e9)][_0x496cbd(0x4ce)][_0x496cbd(0x4a0)];},Window_ShopCommand[_0x4a1256(0x5b7)][_0x4a1256(0x31b)]=function(){const _0x2bff24=_0x4a1256;this[_0x2bff24(0x1e0)](),this['addSellCommand'](),this[_0x2bff24(0x42d)]();},Window_ShopCommand[_0x4a1256(0x5b7)][_0x4a1256(0x39d)]=function(){const _0x431e85=_0x4a1256;Window_HorzCommand[_0x431e85(0x5b7)]['refresh'][_0x431e85(0x4f2)](this),this[_0x431e85(0x53b)]();},Window_ShopCommand['prototype']['addBuyCommand']=function(){const _0x311d94=_0x4a1256,_0x2f0c2b=this['commandStyle'](),_0x2e18ee=VisuMZ[_0x311d94(0x242)]['Settings'][_0x311d94(0x4ce)]['CmdIconBuy'],_0x45f61a=_0x2f0c2b===_0x311d94(0x543)?TextManager['buy']:_0x311d94(0x50f)['format'](_0x2e18ee,TextManager[_0x311d94(0x41d)]),_0x35f9d9=this['isBuyCommandEnabled']();if(this[_0x311d94(0x32d)]()&&!_0x35f9d9)return;this[_0x311d94(0x335)](_0x45f61a,_0x311d94(0x41d),_0x35f9d9);},Window_ShopCommand[_0x4a1256(0x5b7)][_0x4a1256(0x451)]=function(){const _0x11b0e0=_0x4a1256;return SceneManager['_scene'][_0x11b0e0(0x2c8)]===Scene_Shop?SceneManager[_0x11b0e0(0x555)][_0x11b0e0(0x3ee)]>0x0:!![];},Window_ShopCommand[_0x4a1256(0x5b7)][_0x4a1256(0x255)]=function(){const _0x583306=_0x4a1256,_0x3e6957=this['commandStyle'](),_0x2f0dab=VisuMZ[_0x583306(0x242)][_0x583306(0x4e9)][_0x583306(0x4ce)]['CmdIconSell'],_0x551d5b=_0x3e6957==='text'?TextManager[_0x583306(0x3a2)]:'\x5cI[%1]%2'[_0x583306(0x434)](_0x2f0dab,TextManager[_0x583306(0x3a2)]),_0x3c51a2=this[_0x583306(0x22f)]();if(this['hideDisabledCommands']()&&!_0x3c51a2)return;this['addCommand'](_0x551d5b,_0x583306(0x3a2),_0x3c51a2);},Window_ShopCommand[_0x4a1256(0x5b7)][_0x4a1256(0x22f)]=function(){const _0x108b99=_0x4a1256;return!this[_0x108b99(0x395)];},Window_ShopCommand[_0x4a1256(0x5b7)][_0x4a1256(0x42d)]=function(){const _0x4850b9=_0x4a1256,_0x2c9419=this[_0x4850b9(0x32a)](),_0x413d31=VisuMZ[_0x4850b9(0x242)][_0x4850b9(0x4e9)][_0x4850b9(0x4ce)][_0x4850b9(0x306)],_0x266ff7=VisuMZ[_0x4850b9(0x242)]['Settings'][_0x4850b9(0x4ce)][_0x4850b9(0x58e)],_0x106ba0=_0x2c9419==='text'?_0x266ff7:_0x4850b9(0x50f)[_0x4850b9(0x434)](_0x413d31,_0x266ff7);this[_0x4850b9(0x335)](_0x106ba0,_0x4850b9(0x249));},Window_ShopCommand[_0x4a1256(0x5b7)][_0x4a1256(0x5aa)]=function(){const _0x3dae2b=_0x4a1256;return VisuMZ[_0x3dae2b(0x242)][_0x3dae2b(0x4e9)][_0x3dae2b(0x4ce)][_0x3dae2b(0x53a)];},Window_ShopCommand[_0x4a1256(0x5b7)][_0x4a1256(0x463)]=function(_0x5a6aec){const _0x22fca7=_0x4a1256,_0x3bc8ce=this[_0x22fca7(0x53f)](_0x5a6aec);if(_0x3bc8ce===_0x22fca7(0x2cb))this['drawItemStyleIconText'](_0x5a6aec);else _0x3bc8ce==='icon'?this[_0x22fca7(0x5d7)](_0x5a6aec):Window_HorzCommand[_0x22fca7(0x5b7)][_0x22fca7(0x463)][_0x22fca7(0x4f2)](this,_0x5a6aec);},Window_ShopCommand[_0x4a1256(0x5b7)][_0x4a1256(0x32a)]=function(){const _0x51cf2c=_0x4a1256;return VisuMZ[_0x51cf2c(0x242)][_0x51cf2c(0x4e9)][_0x51cf2c(0x4ce)][_0x51cf2c(0x429)];},Window_ShopCommand['prototype'][_0x4a1256(0x53f)]=function(_0x3258d5){const _0x111df5=_0x4a1256;if(_0x3258d5<0x0)return _0x111df5(0x543);const _0x2d16e8=this['commandStyle']();if(_0x2d16e8!==_0x111df5(0x400))return _0x2d16e8;else{if(this[_0x111df5(0x37a)]()>0x0){const _0x3ef062=this[_0x111df5(0x1fc)](_0x3258d5);if(_0x3ef062[_0x111df5(0x4cd)](/\\I\[(\d+)\]/i)){const _0x1cd47a=this[_0x111df5(0x4dc)](_0x3258d5),_0x2dafe9=this[_0x111df5(0x564)](_0x3ef062)['width'];return _0x2dafe9<=_0x1cd47a[_0x111df5(0x597)]?'iconText':_0x111df5(0x2b2);}}}return _0x111df5(0x543);},Window_ShopCommand[_0x4a1256(0x5b7)][_0x4a1256(0x43a)]=function(_0x3cf8bb){const _0x36a6e1=_0x4a1256,_0x4a62db=this[_0x36a6e1(0x4dc)](_0x3cf8bb),_0x4b2438=this['commandName'](_0x3cf8bb),_0x32069a=this[_0x36a6e1(0x564)](_0x4b2438)[_0x36a6e1(0x597)];this[_0x36a6e1(0x586)](this[_0x36a6e1(0x450)](_0x3cf8bb));const _0x15a105=this[_0x36a6e1(0x5aa)]();if(_0x15a105===_0x36a6e1(0x3f3))this[_0x36a6e1(0x218)](_0x4b2438,_0x4a62db['x']+_0x4a62db[_0x36a6e1(0x597)]-_0x32069a,_0x4a62db['y'],_0x32069a);else{if(_0x15a105==='center'){const _0x2e32b3=_0x4a62db['x']+Math[_0x36a6e1(0x21d)]((_0x4a62db[_0x36a6e1(0x597)]-_0x32069a)/0x2);this[_0x36a6e1(0x218)](_0x4b2438,_0x2e32b3,_0x4a62db['y'],_0x32069a);}else this['drawTextEx'](_0x4b2438,_0x4a62db['x'],_0x4a62db['y'],_0x32069a);}},Window_ShopCommand[_0x4a1256(0x5b7)]['drawItemStyleIcon']=function(_0x5a8fd1){const _0x123ac2=_0x4a1256;this[_0x123ac2(0x1fc)](_0x5a8fd1)[_0x123ac2(0x4cd)](/\\I\[(\d+)\]/i);const _0x3262f4=Number(RegExp['$1'])||0x0,_0x1b85c1=this[_0x123ac2(0x4dc)](_0x5a8fd1),_0x1ace12=_0x1b85c1['x']+Math[_0x123ac2(0x21d)]((_0x1b85c1[_0x123ac2(0x597)]-ImageManager[_0x123ac2(0x4d0)])/0x2),_0x4ab28a=_0x1b85c1['y']+(_0x1b85c1[_0x123ac2(0x1d9)]-ImageManager[_0x123ac2(0x1d8)])/0x2;this[_0x123ac2(0x3d0)](_0x3262f4,_0x1ace12,_0x4ab28a);},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x416)]=Window_ShopBuy[_0x4a1256(0x5b7)]['refresh'],Window_ShopBuy['prototype'][_0x4a1256(0x39d)]=function(){const _0x284267=_0x4a1256;this[_0x284267(0x4bd)](),VisuMZ[_0x284267(0x242)][_0x284267(0x416)]['call'](this);},Window_ShopBuy[_0x4a1256(0x5b7)][_0x4a1256(0x4bd)]=function(){const _0xbf7872=_0x4a1256;SceneManager[_0xbf7872(0x555)][_0xbf7872(0x2c8)]===Scene_Shop&&(this[_0xbf7872(0x2fc)]=SceneManager[_0xbf7872(0x555)][_0xbf7872(0x407)]());},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x20a)]=Window_ShopBuy[_0x4a1256(0x5b7)][_0x4a1256(0x1ee)],Window_ShopBuy[_0x4a1256(0x5b7)][_0x4a1256(0x1ee)]=function(_0x5106fd){const _0x41f7d8=_0x4a1256;if(!_0x5106fd)return 0x0;let _0x355d05=VisuMZ[_0x41f7d8(0x242)][_0x41f7d8(0x20a)]['call'](this,_0x5106fd);return Math[_0x41f7d8(0x221)](0x0,this[_0x41f7d8(0x250)](_0x5106fd,_0x355d05));},Window_ShopBuy['prototype'][_0x4a1256(0x250)]=function(_0x55d5f8,_0x4023e2){const _0x3da66c=_0x4a1256,_0x53431b=_0x55d5f8[_0x3da66c(0x4ff)]||'';if(_0x53431b['match'](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x27b6b7=String(RegExp['$1']);window['price']=_0x4023e2,window[_0x3da66c(0x3a5)]=_0x55d5f8;try{eval(_0x27b6b7);}catch(_0x5c1f76){if($gameTemp[_0x3da66c(0x2be)]())console[_0x3da66c(0x423)](_0x5c1f76);}_0x4023e2=window[_0x3da66c(0x1ee)],window[_0x3da66c(0x1ee)]=undefined,window[_0x3da66c(0x3a5)]=undefined;}_0x4023e2=VisuMZ[_0x3da66c(0x242)][_0x3da66c(0x4e9)]['ShopScene'][_0x3da66c(0x273)][_0x3da66c(0x4f2)](this,_0x55d5f8,_0x4023e2);if(isNaN(_0x4023e2))_0x4023e2=0x0;return Math[_0x3da66c(0x21d)](_0x4023e2);},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x3d3)]=Window_ShopBuy[_0x4a1256(0x5b7)][_0x4a1256(0x2ea)],Window_ShopBuy[_0x4a1256(0x5b7)][_0x4a1256(0x2ea)]=function(_0x4022a0){const _0x6abc83=_0x4a1256,_0x15ac7c=VisuMZ[_0x6abc83(0x242)][_0x6abc83(0x3d3)][_0x6abc83(0x4f2)](this,_0x4022a0);return _0x15ac7c&&!this[_0x6abc83(0x31a)](_0x15ac7c)?null:_0x15ac7c;},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x570)]={'ShowAllSwitches':/<SHOW SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i,'ShowAnySwitches':/<SHOW SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,'HideAllSwitches':/<HIDE SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i,'HideAnySwitches':/<HIDE SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,'BuyTurnSwitchOn':/<BUY TURN ON SWITCH(?:|ES):[ ](.*)>/i,'BuyTurnSwitchOff':/<BUY TURN OFF SWITCH(?:|ES):[ ](.*)>/i,'SellTurnSwitchOn':/<SELL TURN ON SWITCH(?:|ES):[ ](.*)>/i,'SellTurnSwitchOff':/<SELL TURN OFF SWITCH(?:|ES):[ ](.*)>/i},Window_ShopBuy[_0x4a1256(0x5b7)][_0x4a1256(0x31a)]=function(_0x3aa2db){const _0x7ecfc5=_0x4a1256;if(!_0x3aa2db)return![];const _0x303dbb=VisuMZ[_0x7ecfc5(0x242)][_0x7ecfc5(0x570)],_0x406fb0=_0x3aa2db?_0x3aa2db[_0x7ecfc5(0x4ff)]||'':'';if(_0x406fb0[_0x7ecfc5(0x4cd)](_0x303dbb['ShowAllSwitches'])){const _0x29f034=String(RegExp['$1'])[_0x7ecfc5(0x1ff)](',')[_0x7ecfc5(0x229)](_0xd60776=>Number(_0xd60776));if(_0x29f034[_0x7ecfc5(0x347)](_0x505d52=>!$gameSwitches[_0x7ecfc5(0x248)](_0x505d52)))return![];}if(_0x406fb0[_0x7ecfc5(0x4cd)](_0x303dbb[_0x7ecfc5(0x1be)])){const _0x53eba5=String(RegExp['$1'])[_0x7ecfc5(0x1ff)](',')[_0x7ecfc5(0x229)](_0x38efa6=>Number(_0x38efa6));if(_0x53eba5[_0x7ecfc5(0x5c1)](_0xa28780=>!$gameSwitches[_0x7ecfc5(0x248)](_0xa28780)))return![];}if(_0x406fb0[_0x7ecfc5(0x4cd)](_0x303dbb[_0x7ecfc5(0x5e4)])){const _0x1812bb=String(RegExp['$1'])[_0x7ecfc5(0x1ff)](',')[_0x7ecfc5(0x229)](_0x50e97=>Number(_0x50e97));if(_0x1812bb[_0x7ecfc5(0x5c1)](_0x53d04c=>$gameSwitches['value'](_0x53d04c)))return![];}if(_0x406fb0[_0x7ecfc5(0x4cd)](_0x303dbb['HideAnySwitches'])){const _0x2c6b7e=String(RegExp['$1'])[_0x7ecfc5(0x1ff)](',')['map'](_0x40ccc5=>Number(_0x40ccc5));if(_0x2c6b7e[_0x7ecfc5(0x347)](_0x388feb=>$gameSwitches[_0x7ecfc5(0x248)](_0x388feb)))return![];}return!![];},Window_ShopBuy[_0x4a1256(0x5b7)][_0x4a1256(0x463)]=function(_0x5514b5){const _0x3eac9e=_0x4a1256;this[_0x3eac9e(0x253)]();const _0x26f020=this[_0x3eac9e(0x266)](_0x5514b5),_0x51a63f=this[_0x3eac9e(0x4dc)](_0x5514b5),_0x521b04=_0x51a63f[_0x3eac9e(0x597)];this[_0x3eac9e(0x586)](this[_0x3eac9e(0x2ca)](_0x26f020)),this['drawItemName'](_0x26f020,_0x51a63f['x'],_0x51a63f['y'],_0x521b04),this[_0x3eac9e(0x5d0)](_0x26f020,_0x51a63f),this[_0x3eac9e(0x586)](!![]);},Window_ShopBuy[_0x4a1256(0x5b7)][_0x4a1256(0x5d0)]=function(_0x16569b,_0x329bd4){const _0x2005f6=_0x4a1256,_0x28355b=this['price'](_0x16569b);this[_0x2005f6(0x473)](_0x28355b,TextManager[_0x2005f6(0x537)],_0x329bd4['x'],_0x329bd4['y'],_0x329bd4[_0x2005f6(0x597)]);},Window_ShopSell[_0x4a1256(0x5b7)][_0x4a1256(0x1ea)]=function(){const _0xf9936a=_0x4a1256;return SceneManager[_0xf9936a(0x555)][_0xf9936a(0x224)]()?0x1:0x2;},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x42c)]=Window_ShopSell[_0x4a1256(0x5b7)]['isEnabled'],Window_ShopSell['prototype']['isEnabled']=function(_0x4032c6){const _0x118f08=_0x4a1256;if(!_0x4032c6)return![];const _0x5a66c3=_0x4032c6[_0x118f08(0x4ff)];if(_0x5a66c3[_0x118f08(0x4cd)](/<CANNOT SELL>/i))return![];if(_0x5a66c3[_0x118f08(0x4cd)](/<CAN SELL>/i))return!![];if(_0x5a66c3[_0x118f08(0x4cd)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1ed50b=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x93057c of _0x1ed50b){if(!$gameSwitches[_0x118f08(0x248)](_0x93057c))return![];}}if(_0x5a66c3[_0x118f08(0x4cd)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x15e8f2=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3ce043 of _0x15e8f2){if(!$gameSwitches[_0x118f08(0x248)](_0x3ce043))return![];}}if(_0x5a66c3[_0x118f08(0x4cd)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x488989=JSON[_0x118f08(0x5f3)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4cd300 of _0x488989){if($gameSwitches[_0x118f08(0x248)](_0x4cd300))return![];}}return VisuMZ['ItemsEquipsCore'][_0x118f08(0x42c)][_0x118f08(0x4f2)](this,_0x4032c6);},Window_ShopStatus[_0x4a1256(0x41b)]=VisuMZ['ItemsEquipsCore'][_0x4a1256(0x4e9)]['StatusWindow'][_0x4a1256(0x3eb)]??0xf0,VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x1e4)]=Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x598)],Window_ShopStatus['prototype'][_0x4a1256(0x598)]=function(_0x133346){const _0x47a805=_0x4a1256;_0x133346=DataManager[_0x47a805(0x533)](_0x133346),DataManager['isWeapon'](_0x133346)||DataManager[_0x47a805(0x560)](_0x133346)?this['setItemDelay'](_0x133346):VisuMZ[_0x47a805(0x242)]['Window_ShopStatus_setItem'][_0x47a805(0x4f2)](this,_0x133346);},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x4b6)]=function(_0x1fb9dd){const _0x33d236=_0x4a1256;this['_item']=_0x1fb9dd;const _0x5d295a=Window_ShopStatus[_0x33d236(0x41b)];setTimeout(this[_0x33d236(0x3e2)]['bind'](this,_0x1fb9dd),_0x5d295a);},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x3e2)]=function(_0x253d1d){const _0x545b00=_0x4a1256;this[_0x545b00(0x202)]===_0x253d1d&&this[_0x545b00(0x39d)]();},Window_ShopStatus['prototype'][_0x4a1256(0x5a3)]=function(){return![];},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x500)]=function(){const _0x418f81=_0x4a1256;Window_StatusBase[_0x418f81(0x5b7)]['loadFaceImages']['call'](this);for(const _0x440bad of $gameParty['members']()){ImageManager[_0x418f81(0x2bc)](_0x440bad[_0x418f81(0x1e5)]());}},Window_ShopStatus['prototype']['translucentOpacity']=function(){const _0x612a2=_0x4a1256;return VisuMZ[_0x612a2(0x242)][_0x612a2(0x4e9)][_0x612a2(0x53d)]['Translucent'];},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x39d)]=function(){const _0x5573af=_0x4a1256;this[_0x5573af(0x3fe)][_0x5573af(0x55c)](),this[_0x5573af(0x52e)]['clear'](),this[_0x5573af(0x202)]&&(this[_0x5573af(0x253)](),this[_0x5573af(0x586)](!![]),this[_0x5573af(0x5b2)](),this[_0x5573af(0x1b5)]()?this[_0x5573af(0x3fd)]():this[_0x5573af(0x328)](),this[_0x5573af(0x34a)]());},Window_ShopStatus['prototype']['drawPossession']=function(_0x18232a,_0x55b00a){const _0x394ec3=_0x4a1256;if(!this[_0x394ec3(0x1b5)]()&&!DataManager['isItem'](this[_0x394ec3(0x202)]))return;const _0xa3dec9=this[_0x394ec3(0x1c2)]-this[_0x394ec3(0x1e7)]()-_0x18232a,_0x4bd0b9=this[_0x394ec3(0x436)]('0000');this[_0x394ec3(0x527)](ColorManager['systemColor']()),this[_0x394ec3(0x549)](TextManager[_0x394ec3(0x271)],_0x18232a+this[_0x394ec3(0x1e7)](),_0x55b00a,_0xa3dec9-_0x4bd0b9),this[_0x394ec3(0x28b)](),this['drawItemNumber'](this[_0x394ec3(0x202)],_0x18232a,_0x55b00a,_0xa3dec9);},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x592)]=function(_0xf496fb,_0x22fa4c,_0x3bbb49,_0x1bae67,_0x47ab67){const _0xe98271=_0x4a1256;if(VisuMZ['ItemsEquipsCore'][_0xe98271(0x4e9)][_0xe98271(0x53d)][_0xe98271(0x59c)]===![])return;_0x47ab67=Math['max'](_0x47ab67||0x1,0x1);while(_0x47ab67--){_0x1bae67=_0x1bae67||this[_0xe98271(0x388)](),this[_0xe98271(0x52e)][_0xe98271(0x2bd)]=0xa0;const _0x4f935c=ColorManager[_0xe98271(0x2db)]();this['contentsBack'][_0xe98271(0x2a7)](_0xf496fb+0x1,_0x22fa4c+0x1,_0x3bbb49-0x2,_0x1bae67-0x2,_0x4f935c),this[_0xe98271(0x52e)][_0xe98271(0x2bd)]=0xff;}},ColorManager[_0x4a1256(0x2db)]=function(){const _0x1dfde7=_0x4a1256,_0x341cb4=VisuMZ[_0x1dfde7(0x242)]['Settings'][_0x1dfde7(0x53d)];let _0x57483c=_0x341cb4[_0x1dfde7(0x3ce)]!==undefined?_0x341cb4['BackRectColor']:0x13;return ColorManager[_0x1dfde7(0x2ce)](_0x57483c);},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x3fd)]=function(){const _0x5ef3e7=_0x4a1256,_0x1457dc=this['getEquipDataStyle']();if(_0x1457dc===_0x5ef3e7(0x32f))this[_0x5ef3e7(0x4b5)]();else _0x1457dc===_0x5ef3e7(0x439)?this['drawEquipDataDouble']():this[_0x5ef3e7(0x5f2)]();},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x20c)]=function(){const _0x508cee=_0x4a1256;let _0x5134dc=VisuMZ[_0x508cee(0x242)][_0x508cee(0x4e9)][_0x508cee(0x53d)][_0x508cee(0x52b)]??'compare';const _0x4e7434=/<STATUS STYLE:[ ](.*)>/i;return this[_0x508cee(0x202)]&&this[_0x508cee(0x202)]['note']&&this[_0x508cee(0x202)]['note'][_0x508cee(0x4cd)](_0x4e7434)&&(_0x5134dc=String(RegExp['$1'])[_0x508cee(0x3b4)]()[_0x508cee(0x482)]()),_0x5134dc;},Window_ShopStatus[_0x4a1256(0x5b7)]['drawEquipDataCompare']=function(){const _0x2e2765=_0x4a1256;this['_tempActor']=null;if(VisuMZ[_0x2e2765(0x242)]['Settings'][_0x2e2765(0x53d)][_0x2e2765(0x5ab)]){VisuMZ[_0x2e2765(0x242)][_0x2e2765(0x4e9)]['StatusWindow'][_0x2e2765(0x5ab)][_0x2e2765(0x4f2)](this);return;}const _0x25f00a=this['lineHeight'](),_0x1559cc=this[_0x2e2765(0x269)]()+0x8;let _0x1e6e27=0x0,_0x5d2cb3=0x0,_0x47e36f=this[_0x2e2765(0x1c2)],_0x49f6f5=this[_0x2e2765(0x3fa)],_0x13e56b=Math[_0x2e2765(0x21d)](_0x47e36f/0x2),_0x1dc42a=_0x1e6e27+_0x47e36f-_0x13e56b;this[_0x2e2765(0x1e1)](this[_0x2e2765(0x202)],_0x1e6e27+this[_0x2e2765(0x1e7)](),_0x5d2cb3,_0x47e36f-this[_0x2e2765(0x1e7)]()*0x2),this[_0x2e2765(0x592)](_0x1e6e27,_0x5d2cb3,_0x47e36f),_0x5d2cb3+=_0x25f00a;if(this['drawItemEquipType'](_0x1e6e27,_0x5d2cb3,_0x13e56b))_0x5d2cb3+=0x0;if(this[_0x2e2765(0x5ae)](_0x1dc42a,_0x5d2cb3,_0x13e56b))_0x5d2cb3+=_0x25f00a;const _0x569b0e=this[_0x2e2765(0x1b8)](),_0x1fd8a3=_0x5d2cb3;_0x5d2cb3=_0x49f6f5-_0x569b0e[_0x2e2765(0x45a)]*_0x1559cc-0x4;let _0xd9d7b7=_0x1e6e27,_0x2f7eb9=0x0,_0x485bdc=_0x5d2cb3;for(const _0x4b21d3 of _0x569b0e){_0x2f7eb9=Math['max'](this[_0x2e2765(0x1b7)](_0x4b21d3,_0x1e6e27+0x4,_0x5d2cb3+0x4,_0x47e36f),_0x2f7eb9),_0x5d2cb3+=_0x1559cc;}const _0x5a15df=$gameParty[_0x2e2765(0x4f3)](),_0x3d4d20=Math[_0x2e2765(0x21d)]((_0x47e36f-_0x2f7eb9)/_0x5a15df);_0x2f7eb9=_0x47e36f-_0x3d4d20*_0x5a15df;for(const _0x2b1edd of $gameParty[_0x2e2765(0x382)]()){const _0x370bf5=$gameParty['battleMembers']()[_0x2e2765(0x441)](_0x2b1edd),_0x7d9f0=_0xd9d7b7+_0x2f7eb9+_0x370bf5*_0x3d4d20;this['changePaintOpacity'](_0x2b1edd[_0x2e2765(0x3f7)](this[_0x2e2765(0x202)])),this[_0x2e2765(0x50e)](_0x2b1edd,_0x7d9f0+_0x3d4d20/0x2,_0x485bdc);let _0x53a958=_0x485bdc;for(const _0x1bb05a of _0x569b0e){const _0x22ec0e=_0x53a958-(_0x25f00a-_0x1559cc)/0x2;this[_0x2e2765(0x4d8)](_0x2b1edd,_0x1bb05a,_0x7d9f0,_0x22ec0e,_0x3d4d20),_0x53a958+=_0x1559cc;}}this[_0x2e2765(0x592)](_0xd9d7b7,_0x1fd8a3,_0x2f7eb9,_0x485bdc-_0x1fd8a3);for(let _0x18590c=0x0;_0x18590c<_0x5a15df;_0x18590c++){const _0x3aa049=_0xd9d7b7+_0x2f7eb9+_0x18590c*_0x3d4d20;this['drawItemDarkRect'](_0x3aa049,_0x1fd8a3,_0x3d4d20,_0x485bdc-_0x1fd8a3);}for(const _0xb85b58 of _0x569b0e){this['drawItemDarkRect'](_0xd9d7b7,_0x485bdc,_0x2f7eb9,_0x1559cc);for(let _0x3c565c=0x0;_0x3c565c<_0x5a15df;_0x3c565c++){const _0x4fa0c2=_0xd9d7b7+_0x2f7eb9+_0x3c565c*_0x3d4d20;this['drawItemDarkRect'](_0x4fa0c2,_0x485bdc,_0x3d4d20,_0x1559cc);}_0x485bdc+=_0x1559cc;}},Window_ShopStatus['prototype']['drawEquipDataClassic']=function(){const _0x311c04=_0x4a1256;this[_0x311c04(0x58c)]=null;if(VisuMZ[_0x311c04(0x242)][_0x311c04(0x4e9)]['StatusWindow'][_0x311c04(0x363)]){VisuMZ['ItemsEquipsCore']['Settings'][_0x311c04(0x53d)][_0x311c04(0x363)][_0x311c04(0x4f2)](this);return;}const _0x25181a=this['lineHeight']();let _0x569263=0x0,_0x3a6e47=0x0,_0x28acb0=this[_0x311c04(0x1c2)],_0xb387e6=this['innerHeight'],_0x21fd87=Math[_0x311c04(0x21d)](_0x28acb0/0x2),_0x5f0cb6=_0x569263+_0x28acb0-_0x21fd87;this[_0x311c04(0x1e1)](this[_0x311c04(0x202)],_0x569263+this[_0x311c04(0x1e7)](),_0x3a6e47,_0x28acb0-this['itemPadding']()*0x2),this[_0x311c04(0x592)](_0x569263,_0x3a6e47,_0x28acb0),_0x3a6e47+=_0x25181a;if(this[_0x311c04(0x24f)](_0x569263,_0x3a6e47,_0x21fd87))_0x3a6e47+=0x0;if(this['drawItemQuantity'](_0x5f0cb6,_0x3a6e47,_0x21fd87))_0x3a6e47+=_0x25181a;if(this[_0x311c04(0x4c2)](_0x569263,_0x3a6e47,_0x28acb0))_0x3a6e47+=_0x25181a;const _0x53bc3d=this[_0x311c04(0x1b8)]();for(const _0x4022bc of _0x53bc3d){if(this[_0x311c04(0x468)](_0x4022bc))continue;this[_0x311c04(0x4a2)](_0x4022bc,_0x569263,_0x3a6e47,_0x28acb0),_0x3a6e47+=_0x25181a;}_0x3a6e47=this[_0x311c04(0x2d7)](_0x569263,_0x3a6e47,_0x28acb0),this[_0x311c04(0x592)](_0x569263,_0x3a6e47,_0x28acb0,_0xb387e6-_0x3a6e47);},Window_ShopStatus['prototype'][_0x4a1256(0x2ef)]=function(){const _0x1183ab=_0x4a1256;this[_0x1183ab(0x58c)]=null;if(VisuMZ['ItemsEquipsCore'][_0x1183ab(0x4e9)][_0x1183ab(0x53d)][_0x1183ab(0x33a)]){VisuMZ[_0x1183ab(0x242)][_0x1183ab(0x4e9)][_0x1183ab(0x53d)]['DrawEquipDoubleData'][_0x1183ab(0x4f2)](this);return;}const _0x3e3a97=this[_0x1183ab(0x388)]();let _0x2d39c1=0x0,_0x5e1dff=0x0,_0x52791d=this[_0x1183ab(0x1c2)],_0x33c1a1=this['innerHeight'],_0x253e82=Math[_0x1183ab(0x21d)](_0x52791d/0x2),_0x25bbd5=_0x2d39c1+_0x52791d-_0x253e82;this[_0x1183ab(0x1e1)](this[_0x1183ab(0x202)],_0x2d39c1+this[_0x1183ab(0x1e7)](),_0x5e1dff,_0x52791d-this['itemPadding']()*0x2),this[_0x1183ab(0x592)](_0x2d39c1,_0x5e1dff,_0x52791d),_0x5e1dff+=_0x3e3a97;if(this[_0x1183ab(0x24f)](_0x2d39c1,_0x5e1dff,_0x253e82))_0x5e1dff+=0x0;if(this[_0x1183ab(0x5ae)](_0x25bbd5,_0x5e1dff,_0x253e82))_0x5e1dff+=_0x3e3a97;if(this[_0x1183ab(0x4c2)](_0x2d39c1,_0x5e1dff,_0x52791d))_0x5e1dff+=_0x3e3a97;const _0x76a41f=this[_0x1183ab(0x1b8)]();for(const _0xe14b17 of _0x76a41f){if(this[_0x1183ab(0x468)](_0xe14b17))continue;this[_0x1183ab(0x4a2)](_0xe14b17,_0x2d39c1,_0x5e1dff,_0x253e82),_0x2d39c1===_0x253e82?(_0x5e1dff+=_0x3e3a97,_0x2d39c1=0x0):_0x2d39c1=_0x253e82;}_0x2d39c1===_0x253e82&&(this[_0x1183ab(0x592)](_0x253e82,_0x5e1dff,_0x253e82,_0x3e3a97),_0x5e1dff+=_0x3e3a97,_0x2d39c1=0x0),_0x5e1dff=this[_0x1183ab(0x2d7)](_0x2d39c1,_0x5e1dff,_0x52791d),this[_0x1183ab(0x592)](_0x2d39c1,_0x5e1dff,_0x52791d,_0x33c1a1-_0x5e1dff);},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x24f)]=function(_0x216ed6,_0x4e624e,_0x35c39e){const _0x10e239=_0x4a1256;if(!this['isEquipItem']())return![];const _0x2f33da=$dataSystem['equipTypes'][this[_0x10e239(0x202)][_0x10e239(0x366)]];return this[_0x10e239(0x1c9)](_0x2f33da,_0x216ed6,_0x4e624e,_0x35c39e,!![]),this['drawItemDarkRect'](_0x216ed6,_0x4e624e,_0x35c39e),this[_0x10e239(0x253)](),!![];},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x4c2)]=function(_0x59abd1,_0x3e4f9a,_0x46383d){const _0x38f4a8=_0x4a1256;if(!this[_0x38f4a8(0x1b5)]())return![];let _0x33247d='',_0x2704e2='';const _0x55a4c0=VisuMZ[_0x38f4a8(0x242)]['Settings'][_0x38f4a8(0x53d)];return DataManager[_0x38f4a8(0x231)](this[_0x38f4a8(0x202)])?(_0x33247d=_0x55a4c0[_0x38f4a8(0x476)]??_0x38f4a8(0x349),_0x2704e2=$dataSystem['weaponTypes'][this['_item'][_0x38f4a8(0x547)]]||_0x55a4c0[_0x38f4a8(0x43b)]||'-'):(_0x33247d=_0x55a4c0['ArmorType']??_0x38f4a8(0x324),_0x2704e2=$dataSystem['armorTypes'][this['_item'][_0x38f4a8(0x1c3)]]||_0x55a4c0[_0x38f4a8(0x43b)]||'-'),this[_0x38f4a8(0x1c9)](_0x33247d,_0x59abd1,_0x3e4f9a,_0x46383d,!![]),this[_0x38f4a8(0x1c9)](_0x2704e2,_0x59abd1,_0x3e4f9a,_0x46383d,![],_0x38f4a8(0x3f3)),this[_0x38f4a8(0x592)](_0x59abd1,_0x3e4f9a,_0x46383d),this[_0x38f4a8(0x253)](),!![];},Window_ShopStatus[_0x4a1256(0x5b7)]['getItemQuantityText']=function(){const _0x1fedc4=_0x4a1256,_0x347c9a=VisuMZ[_0x1fedc4(0x242)][_0x1fedc4(0x4e9)][_0x1fedc4(0x408)][_0x1fedc4(0x262)];return _0x347c9a['format']($gameParty[_0x1fedc4(0x317)](this[_0x1fedc4(0x202)]));},Window_ShopStatus[_0x4a1256(0x5b7)]['actorParams']=function(){const _0xce36a7=_0x4a1256;let _0x4afcbb=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];if(Imported[_0xce36a7(0x295)]){_0x4afcbb=VisuMZ[_0xce36a7(0x5fa)]['Settings'][_0xce36a7(0x497)]['ExtDisplayedParams'];if(this[_0xce36a7(0x1c8)]())return this[_0xce36a7(0x5e8)]();const _0x502d2f=VisuMZ[_0xce36a7(0x242)][_0xce36a7(0x4e9)][_0xce36a7(0x53d)];if(this[_0xce36a7(0x20c)]()==='classic'){if(DataManager[_0xce36a7(0x231)](this[_0xce36a7(0x202)]))_0x4afcbb=_0x4afcbb['concat'](_0x502d2f[_0xce36a7(0x25e)]||[]);if(DataManager[_0xce36a7(0x560)](this[_0xce36a7(0x202)]))_0x4afcbb=_0x4afcbb[_0xce36a7(0x3c9)](_0x502d2f[_0xce36a7(0x538)]||[]);}else{if(this[_0xce36a7(0x20c)]()===_0xce36a7(0x439)){if(DataManager[_0xce36a7(0x231)](this['_item']))_0x4afcbb=_0x4afcbb['concat'](_0x502d2f[_0xce36a7(0x330)]||[]);if(DataManager[_0xce36a7(0x560)](this['_item']))_0x4afcbb=_0x4afcbb[_0xce36a7(0x3c9)](_0x502d2f['DoubleArmorParameters']||[]);}}}return _0x4afcbb=_0x4afcbb[_0xce36a7(0x229)](_0x533f36=>typeof _0x533f36===_0xce36a7(0x552)?_0x533f36:_0x533f36[_0xce36a7(0x45b)]()[_0xce36a7(0x482)]()),_0x4afcbb;},Window_ShopStatus['prototype']['smallParamFontSize']=function(){const _0x3ae741=_0x4a1256;return VisuMZ['ItemsEquipsCore'][_0x3ae741(0x4e9)][_0x3ae741(0x53d)][_0x3ae741(0x51c)];},Window_ShopStatus[_0x4a1256(0x5b7)]['drawParamName']=function(_0x1cff75,_0x28b4a2,_0x25395b,_0x444374){const _0x1e1dad=_0x4a1256;this[_0x1e1dad(0x253)](),this[_0x1e1dad(0x3fe)][_0x1e1dad(0x503)]=this['smallParamFontSize']();let _0x470df0=this[_0x1e1dad(0x436)](TextManager[_0x1e1dad(0x509)](_0x1cff75))+0x4+_0x28b4a2;return Imported[_0x1e1dad(0x295)]?(this[_0x1e1dad(0x4ab)](_0x28b4a2,_0x25395b,_0x444374,_0x1cff75,!![]),VisuMZ['CoreEngine'][_0x1e1dad(0x4e9)][_0x1e1dad(0x497)][_0x1e1dad(0x47a)]&&(_0x470df0+=ImageManager[_0x1e1dad(0x4d0)]+0x4)):(this[_0x1e1dad(0x527)](ColorManager['systemColor']()),this['drawText'](TextManager[_0x1e1dad(0x509)](_0x1cff75),_0x28b4a2,_0x25395b,_0x444374)),this[_0x1e1dad(0x253)](),_0x470df0;},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x4d8)]=function(_0x35fa77,_0x4aede6,_0x4cb3e2,_0x1ea7b9,_0x4424f1){const _0x41f6a7=_0x4a1256;_0x4cb3e2+=this['itemPadding'](),_0x4424f1-=this[_0x41f6a7(0x1e7)]()*0x2;const _0x6bae99=VisuMZ['ItemsEquipsCore']['Settings'][_0x41f6a7(0x53d)];this[_0x41f6a7(0x3fe)]['fontSize']=_0x6bae99['ParamChangeFontSize'],this[_0x41f6a7(0x586)](_0x35fa77[_0x41f6a7(0x3f7)](this[_0x41f6a7(0x202)]));if(_0x35fa77[_0x41f6a7(0x591)](this[_0x41f6a7(0x202)])&&!_0x35fa77[_0x41f6a7(0x553)](this['_item'])){const _0x1b6e60=_0x6bae99[_0x41f6a7(0x3ba)];this['drawText'](_0x1b6e60,_0x4cb3e2,_0x1ea7b9,_0x4424f1,_0x41f6a7(0x36d));}else{if(_0x35fa77[_0x41f6a7(0x3f7)](this[_0x41f6a7(0x202)])){const _0x5f2a2e=this[_0x41f6a7(0x49a)](_0x35fa77);let _0x24706f=0x0,_0x5e4622=0x0,_0x3326e0=0x0;Imported[_0x41f6a7(0x295)]?(_0x24706f=_0x5f2a2e['paramValueByName'](_0x4aede6),_0x5e4622=_0x24706f-_0x35fa77['paramValueByName'](_0x4aede6),this[_0x41f6a7(0x527)](ColorManager[_0x41f6a7(0x259)](_0x5e4622)),_0x3326e0=(_0x5e4622>=0x0?'+':'')+VisuMZ['ConvertNumberToString'](_0x5e4622,0x0,_0x4aede6)):(_0x24706f=_0x5f2a2e[_0x41f6a7(0x509)](_0x4aede6),_0x5e4622=_0x24706f-_0x35fa77['param'](_0x4aede6),this[_0x41f6a7(0x527)](ColorManager['paramchangeTextColor'](_0x5e4622)),_0x3326e0=(_0x5e4622>=0x0?'+':'')+_0x5e4622),_0x3326e0==='+0'&&(_0x3326e0=_0x6bae99['NoChangeMarker']),this[_0x41f6a7(0x549)](_0x3326e0,_0x4cb3e2,_0x1ea7b9,_0x4424f1,_0x41f6a7(0x36d));}else{const _0x4aa1dc=_0x6bae99[_0x41f6a7(0x486)];this[_0x41f6a7(0x549)](_0x4aa1dc,_0x4cb3e2,_0x1ea7b9,_0x4424f1,_0x41f6a7(0x36d));}}this[_0x41f6a7(0x253)](),this['changePaintOpacity'](!![]);},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x49a)]=function(_0x487b75){const _0x5b4272=_0x4a1256;if(this[_0x5b4272(0x5df)](_0x487b75)){const _0xc4f061=JsonEx[_0x5b4272(0x251)](_0x487b75);_0xc4f061[_0x5b4272(0x58c)]=!![];const _0x3fe37e=_0xc4f061['getEmptyEquipSlotOfSameEtype'](this[_0x5b4272(0x202)]);_0x3fe37e>=0x0&&_0xc4f061['forceChangeEquip'](_0x3fe37e,this[_0x5b4272(0x202)]),this[_0x5b4272(0x58c)]=_0xc4f061;}return this['_tempActor'];},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x5df)]=function(_0x56058a){const _0x378746=_0x4a1256;if(!this['_tempActor'])return!![];return this[_0x378746(0x58c)][_0x378746(0x542)]()!==_0x56058a[_0x378746(0x542)]();},Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x553)]=function(_0x4e5823){const _0x380467=_0x4a1256;if(!_0x4e5823)return![];const _0x2447e2=_0x4e5823[_0x380467(0x366)],_0x14b4c3=this['equipSlots']();for(let _0x426d92=0x0;_0x426d92<_0x14b4c3['length'];_0x426d92++){const _0x5c65fd=_0x14b4c3[_0x426d92];if(_0x5c65fd!==_0x2447e2)continue;if(!this[_0x380467(0x5e2)]()[_0x426d92])return!![];}return![];},Game_Actor[_0x4a1256(0x5b7)][_0x4a1256(0x57b)]=function(_0x180527){const _0xd8987=_0x4a1256;if(!_0x180527)return-0x1;const _0x263f9f=_0x180527[_0xd8987(0x366)],_0x178e0f=this[_0xd8987(0x3bb)]();let _0x4ae730=-0x1;for(let _0x5ea273=0x0;_0x5ea273<_0x178e0f[_0xd8987(0x45a)];_0x5ea273++){const _0x31539d=_0x178e0f[_0x5ea273];if(_0x31539d!==_0x263f9f)continue;if(!this[_0xd8987(0x5e2)]()[_0x5ea273])return _0x5ea273;if(_0x4ae730<0x0)_0x4ae730=_0x5ea273;}return _0x4ae730;},Window_ShopStatus['prototype'][_0x4a1256(0x4a2)]=function(_0x4f6053,_0x20d035,_0x58e005,_0x1f11b5){const _0x660d90=_0x4a1256,_0x56b447=TextManager[_0x660d90(0x509)](_0x4f6053);this[_0x660d90(0x1c9)](_0x56b447,_0x20d035,_0x58e005,_0x1f11b5,!![]);let _0x3936fd='+0';Imported[_0x660d90(0x295)]?_0x3936fd=this['getParamValueClassicCore'](_0x4f6053):_0x3936fd=this[_0x660d90(0x4d6)](_0x4f6053),this[_0x660d90(0x1c9)](_0x3936fd,_0x20d035,_0x58e005,_0x1f11b5,![],_0x660d90(0x3f3)),this[_0x660d90(0x592)](_0x20d035,_0x58e005,_0x1f11b5);},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x468)]=function(_0xc2c6aa){const _0x16179f=_0x4a1256;return Imported[_0x16179f(0x295)]?!!VisuMZ[_0x16179f(0x5fa)]['CustomParamNames'][_0xc2c6aa]:![];},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x29c)]=function(_0x2f8096){const _0x566815=_0x4a1256;if(this[_0x566815(0x3c8)][_0x2f8096])return this[_0x566815(0x3c8)][_0x2f8096];const _0x4518cb=[_0x566815(0x43c),_0x566815(0x1ba),'ATK','DEF',_0x566815(0x52d),_0x566815(0x442),_0x566815(0x3cf),'LUK'],_0x278c62=[_0x566815(0x453),_0x566815(0x517),_0x566815(0x234),_0x566815(0x5f5),_0x566815(0x3e9),_0x566815(0x2e2),_0x566815(0x2cc),_0x566815(0x246),'MRG',_0x566815(0x2d0)],_0x2973d1=[_0x566815(0x4a8),_0x566815(0x243),_0x566815(0x288),_0x566815(0x38a),_0x566815(0x235),'TCR',_0x566815(0x226),_0x566815(0x566),'FDR',_0x566815(0x4e7)];if(_0x4518cb[_0x566815(0x220)](_0x2f8096)){const _0x21425e=_0x4518cb[_0x566815(0x441)](_0x2f8096),_0x149327=this['_item'][_0x566815(0x326)][_0x21425e]||0x0;return this[_0x566815(0x527)](ColorManager[_0x566815(0x259)](_0x149327)),(_0x149327>=0x0?'+':'')+String(_0x149327);}else{if(_0x278c62['includes'](_0x2f8096)){const _0x582688=_0x278c62[_0x566815(0x441)](_0x2f8096);let _0x347142=0x0;for(const _0x431cde of this[_0x566815(0x202)][_0x566815(0x54c)]){if(_0x431cde['code']!==0x16)continue;_0x431cde[_0x566815(0x2fe)]===_0x582688&&(_0x347142+=_0x431cde[_0x566815(0x248)]||0x0);}return this[_0x566815(0x527)](ColorManager['paramchangeTextColor'](_0x347142)),_0x347142*=0x64,(_0x347142>=0x0?'+':'')+String(_0x347142)+'%';}else{if(_0x2973d1['includes'](_0x2f8096)){const _0x3298bd=_0x2973d1[_0x566815(0x441)](_0x2f8096);let _0x2ecb7d=0x1;for(const _0xa9a307 of this[_0x566815(0x202)][_0x566815(0x54c)]){if(_0xa9a307[_0x566815(0x3e6)]!==0x17)continue;_0xa9a307['dataId']===_0x3298bd&&(_0x2ecb7d*=_0xa9a307[_0x566815(0x248)]||0x0);}let _0x1e78e3=0x1;if(['TGR',_0x566815(0x235),_0x566815(0x226),_0x566815(0x566),'FDR'][_0x566815(0x220)](_0x2f8096))_0x1e78e3=-0x1;return this[_0x566815(0x527)](ColorManager[_0x566815(0x259)]((_0x2ecb7d-0x1)*_0x1e78e3)),_0x2ecb7d*=0x64,String(_0x2ecb7d)+'%';}}}return'';},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x4d6)]=function(_0x14543c){const _0x198342=_0x4a1256,_0x196de1=[_0x198342(0x43c),_0x198342(0x1ba),_0x198342(0x323),_0x198342(0x4a5),_0x198342(0x52d),_0x198342(0x442),_0x198342(0x3cf),_0x198342(0x3ec)],_0x438b7d=_0x196de1[_0x14543c]||_0x198342(0x2e0);if(this[_0x198342(0x3c8)][_0x438b7d])return this[_0x198342(0x3c8)][_0x438b7d];const _0x53d4ce=Number(this[_0x198342(0x202)][_0x198342(0x326)][_0x14543c]||0x0);return this[_0x198342(0x527)](ColorManager[_0x198342(0x259)](_0x53d4ce)),(_0x53d4ce>=0x0?'+':'')+String(_0x53d4ce);},Window_ShopStatus['prototype'][_0x4a1256(0x1c8)]=function(){const _0x4b3b52=_0x4a1256,_0xc13463=/<CUSTOM STATUS PARAM(?:|S|ETERS):[ ](.*)>/i;return this[_0x4b3b52(0x202)]&&this[_0x4b3b52(0x202)][_0x4b3b52(0x4ff)]&&this[_0x4b3b52(0x202)][_0x4b3b52(0x4ff)][_0x4b3b52(0x4cd)](_0xc13463);},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x5e8)]=function(){const _0x3f0e4f=_0x4a1256,_0x446251=/<CUSTOM STATUS PARAM(?:|S|ETERS):[ ](.*)>/i;this[_0x3f0e4f(0x202)][_0x3f0e4f(0x4ff)][_0x3f0e4f(0x4cd)](_0x446251);const _0x5b0ba1=String(RegExp['$1'])['split'](',')['map'](_0x57da04=>_0x57da04['toUpperCase']()[_0x3f0e4f(0x482)]()),_0x35212e=[_0x3f0e4f(0x43c),'MAXMP',_0x3f0e4f(0x323),_0x3f0e4f(0x4a5),'MAT',_0x3f0e4f(0x442),_0x3f0e4f(0x3cf),_0x3f0e4f(0x3ec)],_0x801967=[_0x3f0e4f(0x453),_0x3f0e4f(0x517),'CRI','CEV',_0x3f0e4f(0x3e9),_0x3f0e4f(0x2e2),_0x3f0e4f(0x2cc),'HRG',_0x3f0e4f(0x2f2),_0x3f0e4f(0x2d0)],_0x4f307e=[_0x3f0e4f(0x4a8),_0x3f0e4f(0x243),_0x3f0e4f(0x288),_0x3f0e4f(0x38a),'MCR',_0x3f0e4f(0x1f7),_0x3f0e4f(0x226),_0x3f0e4f(0x566),'FDR',_0x3f0e4f(0x4e7)];let _0x2a75cf=[];for(const _0x4b8dbe of _0x5b0ba1){if(_0x35212e[_0x3f0e4f(0x220)](_0x4b8dbe))_0x2a75cf[_0x3f0e4f(0x35d)](_0x4b8dbe);if(_0x801967[_0x3f0e4f(0x220)](_0x4b8dbe))_0x2a75cf[_0x3f0e4f(0x35d)](_0x4b8dbe);if(_0x4f307e[_0x3f0e4f(0x220)](_0x4b8dbe))_0x2a75cf[_0x3f0e4f(0x35d)](_0x4b8dbe);}return _0x2a75cf;},Window_ShopStatus['prototype']['drawItemData']=function(){const _0xf8919=_0x4a1256;VisuMZ[_0xf8919(0x242)][_0xf8919(0x4e9)][_0xf8919(0x53d)]['DrawItemData'][_0xf8919(0x4f2)](this);},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x1e1)]=function(_0x217d29,_0xe61582,_0x215860,_0x1734c4){const _0x1db11=_0x4a1256,_0xf0e035=DataManager['isSkill'](_0x217d29,_0xe61582,_0x215860,_0x1734c4)&&Imported[_0x1db11(0x346)],_0x217b21=_0x217d29?_0x217d29[_0x1db11(0x2ba)]:'';if(_0xf0e035)Window_SkillList['prototype'][_0x1db11(0x340)][_0x1db11(0x4f2)](this,_0x217d29);Window_Base[_0x1db11(0x5b7)][_0x1db11(0x1e1)][_0x1db11(0x4f2)](this,_0x217d29,_0xe61582,_0x215860,_0x1734c4);if(_0xf0e035)_0x217d29[_0x1db11(0x2ba)]=_0x217b21;},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x5b2)]=function(){const _0x1a971d=_0x4a1256;this[_0x1a971d(0x3c8)]={};if(!this['_item'])return;const _0x463798=this[_0x1a971d(0x202)][_0x1a971d(0x4ff)];if(_0x463798[_0x1a971d(0x4cd)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x429304=String(RegExp['$1'])[_0x1a971d(0x1ff)](/[\r\n]+/);for(const _0x393bff of _0x429304){if(_0x393bff[_0x1a971d(0x4cd)](/(.*):[ ](.*)/i)){const _0x114783=String(RegExp['$1'])[_0x1a971d(0x45b)]()[_0x1a971d(0x482)](),_0x5e4911=String(RegExp['$2'])[_0x1a971d(0x482)]();this[_0x1a971d(0x3c8)][_0x114783]=_0x5e4911;}}}},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x225)]=function(){const _0x231226=_0x4a1256;return Math[_0x231226(0x221)](0x1,$gameSystem[_0x231226(0x478)]()-0x4);},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x253)]=function(){const _0x42839b=_0x4a1256;Window_StatusBase['prototype']['resetFontSettings'][_0x42839b(0x4f2)](this),this[_0x42839b(0x3fe)][_0x42839b(0x503)]=this['_resetFontSize']||this[_0x42839b(0x3fe)]['fontSize'],this[_0x42839b(0x3fe)][_0x42839b(0x409)]=this[_0x42839b(0x42f)]||this['contents'][_0x42839b(0x409)];},Window_ShopStatus['prototype'][_0x4a1256(0x4f9)]=function(){const _0xf977d=_0x4a1256;return this[_0xf977d(0x3fe)][_0xf977d(0x503)]/$gameSystem[_0xf977d(0x478)]();},Window_ShopStatus['prototype'][_0x4a1256(0x3d0)]=function(_0x1f3ede,_0x577446,_0x3e5bfe){const _0x261230=_0x4a1256,_0x20bda7=ImageManager['loadSystem'](_0x261230(0x491)),_0xcc1313=ImageManager[_0x261230(0x4d0)],_0x298544=ImageManager[_0x261230(0x1d8)],_0x4e6d43=_0x1f3ede%0x10*_0xcc1313,_0x32e13b=Math['floor'](_0x1f3ede/0x10)*_0x298544,_0x1dad36=Math[_0x261230(0x3b5)](_0xcc1313*this[_0x261230(0x4f9)]()),_0x208b99=Math['ceil'](_0x298544*this['fontSizeRatio']());this[_0x261230(0x3fe)][_0x261230(0x45c)](_0x20bda7,_0x4e6d43,_0x32e13b,_0xcc1313,_0x298544,_0x577446,_0x3e5bfe,_0x1dad36,_0x208b99);},Window_ShopStatus['prototype'][_0x4a1256(0x263)]=function(_0x28dcb4,_0xb25ad4){const _0x4b8950=_0x4a1256,_0x861276=ImageManager['standardIconWidth']||0x20,_0xcd2c13=ImageManager[_0x4b8950(0x3ef)]||0x20;if(_0xb25ad4[_0x4b8950(0x58b)]){const _0x59e2d1=_0x861276-ImageManager['iconWidth'],_0x4cda1d=_0xcd2c13-ImageManager[_0x4b8950(0x1d8)];let _0x4cd6b7=0x2,_0xb38748=0x2;this['lineHeight']()!==0x24&&(_0xb38748=Math['floor']((this['lineHeight']()-_0xcd2c13)/0x2));const _0x37b417=_0xb25ad4['x']+Math['ceil'](Math[_0x4b8950(0x21d)](_0x59e2d1/0x2)*this[_0x4b8950(0x4f9)]())+_0x4cd6b7,_0x4ae755=_0xb25ad4['y']+Math[_0x4b8950(0x3b5)](Math['floor'](_0x4cda1d/0x2)*this[_0x4b8950(0x4f9)]())+_0xb38748;this[_0x4b8950(0x3d0)](_0x28dcb4,_0x37b417,_0x4ae755);}_0xb25ad4['x']+=Math['ceil'](_0x861276*this[_0x4b8950(0x4f9)]()),_0xb25ad4['x']+=Math['ceil'](0x4*this[_0x4b8950(0x4f9)]());},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x1c9)]=function(_0x4d46ee,_0x38918a,_0x4748bc,_0x4448c1,_0xdfe38c,_0x4c353f){const _0x9682d6=_0x4a1256;_0x4d46ee=_0x4d46ee||'',_0x4c353f=_0x4c353f||_0x9682d6(0x2b0),this[_0x9682d6(0x1d7)]=this[_0x9682d6(0x225)](),this[_0x9682d6(0x42f)]=_0xdfe38c?ColorManager['systemColor']():this['contents'][_0x9682d6(0x409)],_0x38918a+=this[_0x9682d6(0x1e7)](),_0x4448c1-=this[_0x9682d6(0x1e7)]()*0x2;const _0x381599=this[_0x9682d6(0x564)](_0x4d46ee);if(_0x4c353f===_0x9682d6(0x36d))_0x38918a=_0x38918a+Math[_0x9682d6(0x21d)]((_0x4448c1-_0x381599[_0x9682d6(0x597)])/0x2);else _0x4c353f===_0x9682d6(0x3f3)&&(_0x38918a=_0x38918a+_0x4448c1-_0x381599[_0x9682d6(0x597)]);_0x4748bc+=(this['lineHeight']()-_0x381599[_0x9682d6(0x1d9)])/0x2,this['drawTextEx'](_0x4d46ee,_0x38918a,_0x4748bc,_0x4448c1),this[_0x9682d6(0x1d7)]=undefined,this[_0x9682d6(0x42f)]=undefined,this[_0x9682d6(0x253)]();},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x200)]=function(_0x59c346,_0x4b47f1,_0x344d61){const _0x4ae862=_0x4a1256;if(!DataManager['isItem'](this['_item']))return![];const _0x190cf2=this[_0x4ae862(0x204)]();this[_0x4ae862(0x1c9)](_0x190cf2,_0x59c346,_0x4b47f1,_0x344d61,!![]);const _0x3347b0=this[_0x4ae862(0x24e)]();return this[_0x4ae862(0x1c9)](_0x3347b0,_0x59c346,_0x4b47f1,_0x344d61,![],'right'),this[_0x4ae862(0x592)](_0x59c346,_0x4b47f1,_0x344d61),this[_0x4ae862(0x253)](),!![];},Window_ShopStatus['prototype']['getItemConsumableLabel']=function(){const _0x59e98b=_0x4a1256;return VisuMZ['ItemsEquipsCore'][_0x59e98b(0x4e9)]['StatusWindow'][_0x59e98b(0x355)];},Window_ShopStatus['prototype'][_0x4a1256(0x24e)]=function(){const _0x41eafa=_0x4a1256,_0x217d7a=_0x41eafa(0x5e1);if(this[_0x41eafa(0x3c8)][_0x217d7a])return this[_0x41eafa(0x3c8)][_0x217d7a];return this[_0x41eafa(0x261)]()?VisuMZ[_0x41eafa(0x242)][_0x41eafa(0x4e9)][_0x41eafa(0x53d)][_0x41eafa(0x513)]:VisuMZ['ItemsEquipsCore'][_0x41eafa(0x4e9)][_0x41eafa(0x53d)][_0x41eafa(0x1bb)];},Window_ShopStatus[_0x4a1256(0x5b7)]['canConsumeItem']=function(){const _0x1efa04=_0x4a1256;return VisuMZ[_0x1efa04(0x5fa)]&&VisuMZ[_0x1efa04(0x5fa)][_0x1efa04(0x4e9)]['QoL'][_0x1efa04(0x488)]&&DataManager[_0x1efa04(0x2cf)](this[_0x1efa04(0x202)])?![]:this[_0x1efa04(0x202)][_0x1efa04(0x294)];},Window_ShopStatus['prototype'][_0x4a1256(0x5ae)]=function(_0x23e046,_0x1506d0,_0x364c57){const _0x9a399f=_0x4a1256;if(!this[_0x9a399f(0x1b5)]()&&!DataManager[_0x9a399f(0x515)](this[_0x9a399f(0x202)]))return![];if(DataManager[_0x9a399f(0x2cf)](this[_0x9a399f(0x202)])&&!$dataSystem[_0x9a399f(0x424)]){const _0x4c4cc5=TextManager[_0x9a399f(0x3dc)];this[_0x9a399f(0x1c9)](_0x4c4cc5,_0x23e046,_0x1506d0,_0x364c57,!![],_0x9a399f(0x36d));}else{const _0x406f14=TextManager['possession'];this[_0x9a399f(0x1c9)](_0x406f14,_0x23e046,_0x1506d0,_0x364c57,!![]);const _0x13eeba=this[_0x9a399f(0x331)]();this[_0x9a399f(0x1c9)](_0x13eeba,_0x23e046,_0x1506d0,_0x364c57,![],_0x9a399f(0x3f3));}return this[_0x9a399f(0x592)](_0x23e046,_0x1506d0,_0x364c57),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x4a1256(0x331)]=function(){const _0x5a4012=_0x4a1256,_0x3110c5='QUANTITY';if(this[_0x5a4012(0x3c8)][_0x3110c5])return this[_0x5a4012(0x3c8)][_0x3110c5];const _0x2313b9=VisuMZ['ItemsEquipsCore'][_0x5a4012(0x4e9)][_0x5a4012(0x408)][_0x5a4012(0x262)];return _0x2313b9['format']($gameParty[_0x5a4012(0x317)](this[_0x5a4012(0x202)]));},Window_ShopStatus['prototype'][_0x4a1256(0x381)]=function(_0x10e1a6,_0x1bc581,_0x592acd){const _0x4de61a=_0x4a1256,_0x25901d=this[_0x4de61a(0x558)]();return this[_0x4de61a(0x1c9)](_0x25901d,_0x10e1a6,_0x1bc581,_0x592acd,![],'center'),this[_0x4de61a(0x592)](_0x10e1a6,_0x1bc581,_0x592acd),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x558)]=function(){const _0xb2ffba=_0x4a1256,_0x24354f='OCCASION';if(this['_customItemInfo'][_0x24354f])return this[_0xb2ffba(0x3c8)][_0x24354f];const _0x95e8df=VisuMZ[_0xb2ffba(0x242)][_0xb2ffba(0x4e9)][_0xb2ffba(0x53d)],_0x82ff54=_0xb2ffba(0x303)['format'](this[_0xb2ffba(0x202)][_0xb2ffba(0x485)]);return _0x95e8df[_0x82ff54];},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x281)]=function(_0xe8e3c1,_0x34d173,_0x50d2e0){const _0x4f9f97=_0x4a1256,_0x343393=this[_0x4f9f97(0x5ed)]();return this[_0x4f9f97(0x1c9)](_0x343393,_0xe8e3c1,_0x34d173,_0x50d2e0,![],_0x4f9f97(0x36d)),this[_0x4f9f97(0x592)](_0xe8e3c1,_0x34d173,_0x50d2e0),this[_0x4f9f97(0x253)](),!![];},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x5ed)]=function(){const _0x52f9ee=_0x4a1256,_0x3e7f1b=_0x52f9ee(0x5c5);if(this[_0x52f9ee(0x3c8)][_0x3e7f1b])return this[_0x52f9ee(0x3c8)][_0x3e7f1b];const _0x12d9bb=VisuMZ[_0x52f9ee(0x242)][_0x52f9ee(0x4e9)]['StatusWindow'];if(Imported[_0x52f9ee(0x3b6)]){const _0x5af2ec=this['_item'][_0x52f9ee(0x4ff)];if(_0x5af2ec['match'](/<TARGET:[ ](.*)>/i)){const _0x13be85=String(RegExp['$1']);if(_0x13be85[_0x52f9ee(0x4cd)](/(\d+) RANDOM ANY/i))return _0x12d9bb[_0x52f9ee(0x437)][_0x52f9ee(0x434)](Number(RegExp['$1']));else{if(_0x13be85[_0x52f9ee(0x4cd)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x12d9bb['ScopeRandomEnemies']['format'](Number(RegExp['$1']));else{if(_0x13be85[_0x52f9ee(0x4cd)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x12d9bb[_0x52f9ee(0x2ee)][_0x52f9ee(0x434)](Number(RegExp['$1']));else{if(_0x13be85[_0x52f9ee(0x4cd)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x12d9bb[_0x52f9ee(0x2d9)];else{if(_0x13be85['match'](/ALLY OR ENEMY/i))return _0x12d9bb['ScopeAllyOrEnemy']||_0x12d9bb[_0x52f9ee(0x4a4)];else{if(_0x13be85[_0x52f9ee(0x4cd)](/ENEMY OR ALLY/i))return _0x12d9bb[_0x52f9ee(0x42e)]||_0x12d9bb[_0x52f9ee(0x3b0)];}}}}}}}const _0x4c5b6e=_0x52f9ee(0x508)[_0x52f9ee(0x434)](this['_item'][_0x52f9ee(0x580)]);return _0x12d9bb[_0x4c5b6e];},Window_ShopStatus['prototype']['drawItemSpeed']=function(_0x341df4,_0x58b3ab,_0x54d44c){const _0x5bbf57=_0x4a1256,_0x21f4d0=this[_0x5bbf57(0x3dd)]();this[_0x5bbf57(0x1c9)](_0x21f4d0,_0x341df4,_0x58b3ab,_0x54d44c,!![]);const _0x18c886=this[_0x5bbf57(0x516)]();return this[_0x5bbf57(0x1c9)](_0x18c886,_0x341df4,_0x58b3ab,_0x54d44c,![],_0x5bbf57(0x3f3)),this[_0x5bbf57(0x592)](_0x341df4,_0x58b3ab,_0x54d44c),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4a1256(0x5b7)]['getItemSpeedLabel']=function(){const _0x4b1d68=_0x4a1256;return VisuMZ[_0x4b1d68(0x242)][_0x4b1d68(0x4e9)][_0x4b1d68(0x53d)][_0x4b1d68(0x1ca)];},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x516)]=function(){const _0x2a0d9f=_0x4a1256,_0x331fba='SPEED';if(this[_0x2a0d9f(0x3c8)][_0x331fba])return this[_0x2a0d9f(0x3c8)][_0x331fba];const _0x255202=this[_0x2a0d9f(0x202)][_0x2a0d9f(0x421)];if(_0x255202>=0x7d0)return VisuMZ['ItemsEquipsCore'][_0x2a0d9f(0x4e9)][_0x2a0d9f(0x53d)][_0x2a0d9f(0x417)];else{if(_0x255202>=0x3e8)return VisuMZ[_0x2a0d9f(0x242)][_0x2a0d9f(0x4e9)]['StatusWindow'][_0x2a0d9f(0x3c0)];else{if(_0x255202>0x0)return VisuMZ[_0x2a0d9f(0x242)][_0x2a0d9f(0x4e9)]['StatusWindow'][_0x2a0d9f(0x27c)];else{if(_0x255202===0x0)return VisuMZ[_0x2a0d9f(0x242)][_0x2a0d9f(0x4e9)][_0x2a0d9f(0x53d)][_0x2a0d9f(0x1d2)];else{if(_0x255202>-0x3e8)return VisuMZ[_0x2a0d9f(0x242)]['Settings'][_0x2a0d9f(0x53d)][_0x2a0d9f(0x4c7)];else{if(_0x255202>-0x7d0)return VisuMZ[_0x2a0d9f(0x242)][_0x2a0d9f(0x4e9)][_0x2a0d9f(0x53d)][_0x2a0d9f(0x3b2)];else return _0x255202<=-0x7d0?VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'][_0x2a0d9f(0x208)]:_0x2a0d9f(0x26d);}}}}}},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x3d2)]=function(_0x4d6f2a,_0x167267,_0x28e36e){const _0x3b4030=_0x4a1256,_0xf9e912=this[_0x3b4030(0x35c)]();this[_0x3b4030(0x1c9)](_0xf9e912,_0x4d6f2a,_0x167267,_0x28e36e,!![]);const _0x209f81=this[_0x3b4030(0x3aa)]();return this[_0x3b4030(0x1c9)](_0x209f81,_0x4d6f2a,_0x167267,_0x28e36e,![],_0x3b4030(0x3f3)),this['drawItemDarkRect'](_0x4d6f2a,_0x167267,_0x28e36e),this[_0x3b4030(0x253)](),!![];},Window_ShopStatus['prototype'][_0x4a1256(0x35c)]=function(){const _0x1b208a=_0x4a1256;return VisuMZ[_0x1b208a(0x242)][_0x1b208a(0x4e9)][_0x1b208a(0x53d)][_0x1b208a(0x46a)];},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x3aa)]=function(){const _0x3f4811=_0x4a1256,_0x1c511b=_0x3f4811(0x3ea);if(this[_0x3f4811(0x3c8)][_0x1c511b])return this[_0x3f4811(0x3c8)][_0x1c511b];if(Imported[_0x3f4811(0x3b6)]){const _0x44d832=this[_0x3f4811(0x202)][_0x3f4811(0x4ff)];if(_0x44d832[_0x3f4811(0x4cd)](/<ALWAYS HIT>/i))return _0x3f4811(0x2dc);else{if(_0x44d832[_0x3f4811(0x4cd)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x3f4811(0x589)['format'](Number(RegExp['$1']));}}return'%1%'[_0x3f4811(0x434)](this['_item']['successRate']);},Window_ShopStatus[_0x4a1256(0x5b7)]['drawItemRepeats']=function(_0x3f40de,_0x5a8ea4,_0x4fe751){const _0xe3e900=_0x4a1256,_0x1d5ea8=this[_0xe3e900(0x531)]();this[_0xe3e900(0x1c9)](_0x1d5ea8,_0x3f40de,_0x5a8ea4,_0x4fe751,!![]);const _0x16b8b1=this[_0xe3e900(0x525)]();return this[_0xe3e900(0x1c9)](_0x16b8b1,_0x3f40de,_0x5a8ea4,_0x4fe751,![],'right'),this[_0xe3e900(0x592)](_0x3f40de,_0x5a8ea4,_0x4fe751),this[_0xe3e900(0x253)](),!![];},Window_ShopStatus['prototype'][_0x4a1256(0x531)]=function(){const _0x48336d=_0x4a1256;return VisuMZ[_0x48336d(0x242)]['Settings'][_0x48336d(0x53d)][_0x48336d(0x2a0)];},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x525)]=function(){const _0x3c0c99=_0x4a1256,_0x3227c7=_0x3c0c99(0x4c5);if(this['_customItemInfo'][_0x3227c7])return this[_0x3c0c99(0x3c8)][_0x3227c7];const _0x5cc202='×%1';return _0x5cc202['format'](this[_0x3c0c99(0x202)][_0x3c0c99(0x25c)]);},Window_ShopStatus[_0x4a1256(0x5b7)]['drawItemHitType']=function(_0x34b1ea,_0x49f546,_0x59d3f7){const _0x3ad6e3=_0x4a1256,_0x25b946=this[_0x3ad6e3(0x1df)]();this['drawItemKeyData'](_0x25b946,_0x34b1ea,_0x49f546,_0x59d3f7,!![]);const _0x14d08a=this['getItemHitTypeText']();return this['drawItemKeyData'](_0x14d08a,_0x34b1ea,_0x49f546,_0x59d3f7,![],_0x3ad6e3(0x3f3)),this['drawItemDarkRect'](_0x34b1ea,_0x49f546,_0x59d3f7),this[_0x3ad6e3(0x253)](),!![];},Window_ShopStatus[_0x4a1256(0x5b7)]['getItemHitTypeLabel']=function(){const _0x43d865=_0x4a1256;return VisuMZ[_0x43d865(0x242)]['Settings'][_0x43d865(0x53d)][_0x43d865(0x44e)];},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x534)]=function(){const _0x177e4e=_0x4a1256,_0x1dd927=_0x177e4e(0x274);if(this[_0x177e4e(0x3c8)][_0x1dd927])return this[_0x177e4e(0x3c8)][_0x1dd927];if(DataManager[_0x177e4e(0x593)]&&DataManager[_0x177e4e(0x593)](this[_0x177e4e(0x202)]))return TextManager[_0x177e4e(0x559)];const _0x1f074b=VisuMZ['ItemsEquipsCore'][_0x177e4e(0x4e9)]['StatusWindow'],_0x4625b2=_0x177e4e(0x23d)[_0x177e4e(0x434)](this['_item'][_0x177e4e(0x594)]);return _0x1f074b[_0x4625b2];},Window_ShopStatus[_0x4a1256(0x5b7)]['drawItemDamage']=function(_0x4aafba,_0x3303e0,_0x3fa95a){const _0x5753fd=_0x4a1256;if(this[_0x5753fd(0x202)][_0x5753fd(0x5ec)][_0x5753fd(0x47c)]<=0x0)return _0x3303e0;if(this[_0x5753fd(0x567)](_0x4aafba,_0x3303e0,_0x3fa95a))_0x3303e0+=this[_0x5753fd(0x388)]();if(this[_0x5753fd(0x276)](_0x4aafba,_0x3303e0,_0x3fa95a))_0x3303e0+=this['lineHeight']();return this[_0x5753fd(0x253)](),_0x3303e0;},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x567)]=function(_0x16d7ed,_0x8c2b4e,_0x8ef290){const _0xad5aaa=_0x4a1256,_0x4919eb=this[_0xad5aaa(0x5d1)]();this[_0xad5aaa(0x1c9)](_0x4919eb,_0x16d7ed,_0x8c2b4e,_0x8ef290,!![]);const _0x223802=this[_0xad5aaa(0x217)]();return this[_0xad5aaa(0x1c9)](_0x223802,_0x16d7ed,_0x8c2b4e,_0x8ef290,![],_0xad5aaa(0x3f3)),this['drawItemDarkRect'](_0x16d7ed,_0x8c2b4e,_0x8ef290),this[_0xad5aaa(0x253)](),!![];},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x5d1)]=function(){const _0x53a178=_0x4a1256;return VisuMZ[_0x53a178(0x242)]['Settings'][_0x53a178(0x53d)]['LabelElement'];},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x217)]=function(){const _0x5a913a=_0x4a1256,_0x521d7e='ELEMENT';if(this[_0x5a913a(0x3c8)][_0x521d7e])return this[_0x5a913a(0x3c8)][_0x521d7e];if(this[_0x5a913a(0x202)][_0x5a913a(0x5ec)][_0x5a913a(0x1f4)]<=-0x1)return VisuMZ['ItemsEquipsCore'][_0x5a913a(0x4e9)][_0x5a913a(0x53d)][_0x5a913a(0x34f)];else return this[_0x5a913a(0x202)][_0x5a913a(0x5ec)][_0x5a913a(0x1f4)]===0x0?VisuMZ[_0x5a913a(0x242)][_0x5a913a(0x4e9)]['StatusWindow'][_0x5a913a(0x5b4)]:$dataSystem['elements'][this[_0x5a913a(0x202)]['damage']['elementId']];},Window_ShopStatus[_0x4a1256(0x5b7)]['drawItemDamageAmount']=function(_0x46f3f1,_0x59d5bf,_0xa2fc39){const _0x4cf1d5=_0x4a1256,_0x3d1dca=this[_0x4cf1d5(0x2aa)]();this[_0x4cf1d5(0x1c9)](_0x3d1dca,_0x46f3f1,_0x59d5bf,_0xa2fc39,!![]),this[_0x4cf1d5(0x1d5)]();const _0x250b74=this[_0x4cf1d5(0x316)](),_0x5f1bb5=ColorManager[_0x4cf1d5(0x29f)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this['_item'][_0x4cf1d5(0x5ec)][_0x4cf1d5(0x47c)]]);return this['changeTextColor'](_0x5f1bb5),this['drawItemKeyData'](_0x250b74,_0x46f3f1,_0x59d5bf,_0xa2fc39,![],_0x4cf1d5(0x3f3)),this[_0x4cf1d5(0x592)](_0x46f3f1,_0x59d5bf,_0xa2fc39),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4a1256(0x5b7)]['getItemDamageAmountLabel']=function(){const _0xfc1ffa=_0x4a1256;return Imported[_0xfc1ffa(0x3b6)]&&DataManager[_0xfc1ffa(0x46d)](this[_0xfc1ffa(0x202)])!==_0xfc1ffa(0x3cd)?this['getItemDamageAmountLabelBattleCore']():this[_0xfc1ffa(0x562)]();},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x562)]=function(){const _0x1ea1ad=_0x4a1256,_0x11ebfa=VisuMZ[_0x1ea1ad(0x242)][_0x1ea1ad(0x4e9)][_0x1ea1ad(0x53d)],_0x1158cb='DamageType%1'[_0x1ea1ad(0x434)](this[_0x1ea1ad(0x202)][_0x1ea1ad(0x5ec)][_0x1ea1ad(0x47c)]),_0x373837=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x1ea1ad(0x202)][_0x1ea1ad(0x5ec)]['type']];return _0x11ebfa[_0x1158cb][_0x1ea1ad(0x434)](_0x373837);},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x1d5)]=function(){const _0x213376=_0x4a1256,_0x24d134=$gameActors[_0x213376(0x238)](0x1);this[_0x213376(0x1cf)]=JsonEx[_0x213376(0x251)](_0x24d134),this[_0x213376(0x240)]=JsonEx[_0x213376(0x251)](_0x24d134);},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x316)]=function(){const _0x11423d=_0x4a1256,_0x149af1=_0x11423d(0x4f4);if(this[_0x11423d(0x3c8)][_0x149af1])return this['_customItemInfo'][_0x149af1];return Imported['VisuMZ_1_BattleCore']&&DataManager[_0x11423d(0x46d)](this[_0x11423d(0x202)])!=='MANUAL'?this['getItemDamageAmountTextBattleCore']():this[_0x11423d(0x38d)]();},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x38d)]=function(){const _0x1b86a6=_0x4a1256;window['a']=this[_0x1b86a6(0x1cf)],window['b']=this[_0x1b86a6(0x240)],this[_0x1b86a6(0x1cf)][_0x1b86a6(0x327)](!![]),this[_0x1b86a6(0x240)][_0x1b86a6(0x327)]([0x3,0x4][_0x1b86a6(0x220)](this[_0x1b86a6(0x202)][_0x1b86a6(0x5ec)][_0x1b86a6(0x47c)]));let _0x3c8221=this['_item'][_0x1b86a6(0x5ec)][_0x1b86a6(0x3c7)];try{const _0x3323b3=Math['max'](eval(_0x3c8221),0x0)/window['a'][_0x1b86a6(0x5d8)];return this[_0x1b86a6(0x54f)](),isNaN(_0x3323b3)?_0x1b86a6(0x26d):'%1%'[_0x1b86a6(0x434)](Math['round'](_0x3323b3*0x64));}catch(_0x144f54){return $gameTemp[_0x1b86a6(0x2be)]()&&(console[_0x1b86a6(0x423)](_0x1b86a6(0x449)[_0x1b86a6(0x434)](this[_0x1b86a6(0x202)][_0x1b86a6(0x2ba)])),console[_0x1b86a6(0x423)](_0x144f54)),this[_0x1b86a6(0x54f)](),_0x1b86a6(0x26d);}},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x54f)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus['prototype'][_0x4a1256(0x550)]=function(_0x1f37c5,_0x441138,_0x802f11){const _0x54c027=_0x4a1256;if(!this[_0x54c027(0x31e)]())return _0x441138;if(this[_0x54c027(0x22d)](_0x1f37c5,_0x441138,_0x802f11))_0x441138+=this[_0x54c027(0x388)]();if(this['drawItemEffectsMpRecovery'](_0x1f37c5,_0x441138,_0x802f11))_0x441138+=this['lineHeight']();if(this[_0x54c027(0x58f)](_0x1f37c5,_0x441138,_0x802f11))_0x441138+=this['lineHeight']();if(this[_0x54c027(0x59b)](_0x1f37c5,_0x441138,_0x802f11))_0x441138+=this[_0x54c027(0x388)]();if(this['drawItemEffectsMpDamage'](_0x1f37c5,_0x441138,_0x802f11))_0x441138+=this[_0x54c027(0x388)]();if(this[_0x54c027(0x415)](_0x1f37c5,_0x441138,_0x802f11))_0x441138+=this['lineHeight']();if(this['drawItemEffectsSelfTpGain'](_0x1f37c5,_0x441138,_0x802f11))_0x441138+=this[_0x54c027(0x388)]();if(this[_0x54c027(0x365)](_0x1f37c5,_0x441138,_0x802f11))_0x441138+=this['lineHeight']();if(this[_0x54c027(0x1db)](_0x1f37c5,_0x441138,_0x802f11))_0x441138+=this[_0x54c027(0x388)]();return this[_0x54c027(0x253)](),_0x441138;},Window_ShopStatus[_0x4a1256(0x5b7)]['getItemEffects']=function(){const _0x28fcf3=_0x4a1256;return this[_0x28fcf3(0x202)][_0x28fcf3(0x286)];},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x31e)]=function(){const _0x47bb05=_0x4a1256;let _0x855306=![];this['_itemData']={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0x3ac741=this[_0x47bb05(0x398)]();for(const _0x4eef3a of _0x3ac741){switch(_0x4eef3a[_0x47bb05(0x3e6)]){case Game_Action[_0x47bb05(0x5cf)]:this[_0x47bb05(0x239)][_0x47bb05(0x291)]+=_0x4eef3a['value1'],this['_itemData'][_0x47bb05(0x207)]+=_0x4eef3a[_0x47bb05(0x2e5)],_0x855306=!![];break;case Game_Action[_0x47bb05(0x22e)]:this[_0x47bb05(0x239)][_0x47bb05(0x2b5)]+=_0x4eef3a['value1'],this[_0x47bb05(0x239)]['flatMP']+=_0x4eef3a[_0x47bb05(0x2e5)],_0x855306=!![];break;case Game_Action[_0x47bb05(0x5da)]:this[_0x47bb05(0x239)]['gainTP']+=_0x4eef3a[_0x47bb05(0x35b)],_0x855306=!![];break;case Game_Action[_0x47bb05(0x351)]:this['_itemData'][_0x47bb05(0x345)][_0x47bb05(0x35d)](_0x4eef3a[_0x47bb05(0x2fe)]),_0x855306=!![];break;case Game_Action[_0x47bb05(0x3a0)]:this[_0x47bb05(0x239)]['removeState']['push'](_0x4eef3a[_0x47bb05(0x2fe)]),this[_0x47bb05(0x239)]['removeStateBuffChanges']=!![],_0x855306=!![];break;case Game_Action[_0x47bb05(0x529)]:this[_0x47bb05(0x239)][_0x47bb05(0x425)][_0x4eef3a[_0x47bb05(0x2fe)]]+=0x1,_0x855306=!![];break;case Game_Action[_0x47bb05(0x571)]:this[_0x47bb05(0x239)][_0x47bb05(0x425)][_0x4eef3a['dataId']]-=0x1,_0x855306=!![];break;case Game_Action[_0x47bb05(0x4e3)]:this['_itemData'][_0x47bb05(0x53e)][_0x47bb05(0x35d)](_0x4eef3a[_0x47bb05(0x2fe)]),this[_0x47bb05(0x239)]['removeStateBuffChanges']=!![],_0x855306=!![];break;case Game_Action[_0x47bb05(0x2a4)]:this[_0x47bb05(0x239)][_0x47bb05(0x3bf)]['push'](_0x4eef3a[_0x47bb05(0x2fe)]),this[_0x47bb05(0x239)][_0x47bb05(0x247)]=!![],_0x855306=!![];break;}}if(this[_0x47bb05(0x239)][_0x47bb05(0x345)][_0x47bb05(0x45a)]>0x0)this[_0x47bb05(0x239)][_0x47bb05(0x21b)]=!![];for(let _0x1c25f5=0x0;_0x1c25f5<this[_0x47bb05(0x239)][_0x47bb05(0x425)][_0x47bb05(0x45a)];_0x1c25f5++){if(this[_0x47bb05(0x239)][_0x47bb05(0x425)][_0x1c25f5]!==0x0)this['_itemData'][_0x47bb05(0x21b)]=!![];}this[_0x47bb05(0x202)][_0x47bb05(0x2df)]!==0x0&&(this[_0x47bb05(0x239)][_0x47bb05(0x5f9)]=this[_0x47bb05(0x202)][_0x47bb05(0x2df)],_0x855306=!![]);const _0x58edf6=['HP\x20RECOVERY',_0x47bb05(0x454),_0x47bb05(0x52a),'HP\x20DAMAGE','MP\x20DAMAGE',_0x47bb05(0x50d),_0x47bb05(0x5a7),'ADDED\x20EFFECTS','REMOVED\x20EFFECTS'];for(const _0x3af693 of _0x58edf6){if(this[_0x47bb05(0x3c8)][_0x3af693]){_0x855306=!![];break;}}return _0x855306;},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x22d)]=function(_0x4bde14,_0x5487a2,_0x44081a){const _0x2b519a=_0x4a1256,_0x32634=_0x2b519a(0x2f9);if(this[_0x2b519a(0x239)][_0x2b519a(0x291)]<=0x0&&this['_itemData'][_0x2b519a(0x207)]<=0x0&&!this['_customItemInfo'][_0x32634])return![];const _0x7b797b=this[_0x2b519a(0x376)]();this[_0x2b519a(0x1c9)](_0x7b797b,_0x4bde14,_0x5487a2,_0x44081a,!![]);const _0x3c7d82=this[_0x2b519a(0x44d)]();return this[_0x2b519a(0x527)](ColorManager[_0x2b519a(0x29f)](0x1)),this[_0x2b519a(0x1c9)](_0x3c7d82,_0x4bde14,_0x5487a2,_0x44081a,![],_0x2b519a(0x3f3)),this[_0x2b519a(0x592)](_0x4bde14,_0x5487a2,_0x44081a),this[_0x2b519a(0x253)](),!![];},Window_ShopStatus['prototype']['getItemEffectsHpRecoveryLabel']=function(){const _0x4a7c74=_0x4a1256,_0x5a5a4a=VisuMZ[_0x4a7c74(0x242)]['Settings'][_0x4a7c74(0x53d)][_0x4a7c74(0x30a)];return _0x5a5a4a[_0x4a7c74(0x434)](TextManager['hp']);},Window_ShopStatus[_0x4a1256(0x5b7)]['getItemEffectsHpRecoveryText']=function(){const _0x421535=_0x4a1256,_0x13005d=_0x421535(0x2f9);if(this[_0x421535(0x3c8)][_0x13005d])return this[_0x421535(0x3c8)][_0x13005d];let _0x48867a='';if(this[_0x421535(0x239)][_0x421535(0x291)]>0x0)_0x48867a+=_0x421535(0x3e8)['format'](Math[_0x421535(0x21d)](this[_0x421535(0x239)]['rateHP']*0x64));if(this[_0x421535(0x239)][_0x421535(0x291)]>0x0&&this[_0x421535(0x239)][_0x421535(0x207)]>0x0)_0x48867a+='\x20';if(this[_0x421535(0x239)][_0x421535(0x207)]>0x0)_0x48867a+=_0x421535(0x3d5)[_0x421535(0x434)](this[_0x421535(0x239)][_0x421535(0x207)]);return _0x48867a;},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x27b)]=function(_0x3bc158,_0x835ea2,_0x3f5249){const _0x532dd9=_0x4a1256,_0x240127='MP\x20RECOVERY';if(this[_0x532dd9(0x239)][_0x532dd9(0x2b5)]<=0x0&&this['_itemData'][_0x532dd9(0x5ef)]<=0x0&&!this[_0x532dd9(0x3c8)][_0x240127])return![];const _0x548695=this[_0x532dd9(0x5d3)]();this[_0x532dd9(0x1c9)](_0x548695,_0x3bc158,_0x835ea2,_0x3f5249,!![]);const _0xd273ad=this[_0x532dd9(0x56d)]();return this[_0x532dd9(0x527)](ColorManager[_0x532dd9(0x29f)](0x3)),this[_0x532dd9(0x1c9)](_0xd273ad,_0x3bc158,_0x835ea2,_0x3f5249,![],_0x532dd9(0x3f3)),this['drawItemDarkRect'](_0x3bc158,_0x835ea2,_0x3f5249),this[_0x532dd9(0x253)](),!![];},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x5d3)]=function(){const _0x5a784b=_0x4a1256,_0x5bbc4f=VisuMZ[_0x5a784b(0x242)][_0x5a784b(0x4e9)][_0x5a784b(0x53d)][_0x5a784b(0x2c1)];return _0x5bbc4f[_0x5a784b(0x434)](TextManager['mp']);},Window_ShopStatus[_0x4a1256(0x5b7)]['getItemEffectsMpRecoveryText']=function(){const _0x2bc01c=_0x4a1256,_0x89084e=_0x2bc01c(0x454);if(this['_customItemInfo'][_0x89084e])return this[_0x2bc01c(0x3c8)][_0x89084e];let _0x32b32d='';if(this['_itemData']['rateMP']>0x0)_0x32b32d+='+%1%'['format'](Math[_0x2bc01c(0x21d)](this[_0x2bc01c(0x239)][_0x2bc01c(0x2b5)]*0x64));if(this[_0x2bc01c(0x239)][_0x2bc01c(0x2b5)]>0x0&&this['_itemData']['flatMP']>0x0)_0x32b32d+='\x20';if(this['_itemData']['flatMP']>0x0)_0x32b32d+=_0x2bc01c(0x3d5)[_0x2bc01c(0x434)](this[_0x2bc01c(0x239)][_0x2bc01c(0x5ef)]);return _0x32b32d;},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x58f)]=function(_0x46e16f,_0x291ae1,_0x1594d7){const _0x36e015=_0x4a1256,_0x33d503='TP\x20RECOVERY';if(this[_0x36e015(0x239)][_0x36e015(0x52c)]<=0x0&&!this[_0x36e015(0x3c8)][_0x33d503])return![];const _0x9216bb=this[_0x36e015(0x4f8)]();this[_0x36e015(0x1c9)](_0x9216bb,_0x46e16f,_0x291ae1,_0x1594d7,!![]);const _0x5c77ec=this[_0x36e015(0x233)]();return this[_0x36e015(0x527)](ColorManager[_0x36e015(0x358)]()),this[_0x36e015(0x1c9)](_0x5c77ec,_0x46e16f,_0x291ae1,_0x1594d7,![],_0x36e015(0x3f3)),this['drawItemDarkRect'](_0x46e16f,_0x291ae1,_0x1594d7),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x4f8)]=function(){const _0x1b8b18=_0x4a1256,_0x47d0e1=VisuMZ[_0x1b8b18(0x242)][_0x1b8b18(0x4e9)][_0x1b8b18(0x53d)][_0x1b8b18(0x5bc)];return _0x47d0e1['format'](TextManager['tp']);},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x233)]=function(){const _0x17317f=_0x4a1256,_0x57dda3=_0x17317f(0x52a);if(this[_0x17317f(0x3c8)][_0x57dda3])return this[_0x17317f(0x3c8)][_0x57dda3];let _0x32a8b8='';return _0x32a8b8+=_0x17317f(0x3d5)['format'](this[_0x17317f(0x239)][_0x17317f(0x52c)]),_0x32a8b8;},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x3fb)]=function(_0x24c732,_0x452fd3,_0x43f296){const _0x4526ed=_0x4a1256,_0x648740=_0x4526ed(0x5a7);if(this['_itemData'][_0x4526ed(0x5f9)]===0x0&&!this[_0x4526ed(0x3c8)][_0x648740])return![];const _0x55b9d8=this[_0x4526ed(0x4a9)]();this['drawItemKeyData'](_0x55b9d8,_0x24c732,_0x452fd3,_0x43f296,!![]);const _0x4a6101=this[_0x4526ed(0x297)]();return this[_0x4526ed(0x239)][_0x4526ed(0x5f9)]>0x0?this[_0x4526ed(0x527)](ColorManager[_0x4526ed(0x358)]()):this[_0x4526ed(0x527)](ColorManager[_0x4526ed(0x372)]()),this[_0x4526ed(0x1c9)](_0x4a6101,_0x24c732,_0x452fd3,_0x43f296,![],_0x4526ed(0x3f3)),this[_0x4526ed(0x592)](_0x24c732,_0x452fd3,_0x43f296),this[_0x4526ed(0x253)](),!![];},Window_ShopStatus[_0x4a1256(0x5b7)]['getItemEffectsSelfTpGainLabel']=function(){const _0x23eecf=_0x4a1256,_0x23ea62=VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'][_0x23eecf(0x2dd)];return _0x23ea62[_0x23eecf(0x434)](TextManager['tp']);},Window_ShopStatus[_0x4a1256(0x5b7)]['getItemEffectsSelfTpGainText']=function(){const _0x1bc6fa=_0x4a1256,_0x15d5ce=_0x1bc6fa(0x5a7);if(this['_customItemInfo'][_0x15d5ce])return this['_customItemInfo'][_0x15d5ce];let _0x1bce38='';return this[_0x1bc6fa(0x239)][_0x1bc6fa(0x5f9)]>0x0?_0x1bce38+=_0x1bc6fa(0x3d5)['format'](this[_0x1bc6fa(0x239)][_0x1bc6fa(0x5f9)]):_0x1bce38+='%1'[_0x1bc6fa(0x434)](this[_0x1bc6fa(0x239)][_0x1bc6fa(0x5f9)]),_0x1bce38;},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x59b)]=function(_0x57dd5d,_0x1ef11e,_0x5365d5){const _0x1ffcd3=_0x4a1256,_0x17cac7=_0x1ffcd3(0x37b);if(this[_0x1ffcd3(0x239)][_0x1ffcd3(0x291)]>=0x0&&this[_0x1ffcd3(0x239)][_0x1ffcd3(0x207)]>=0x0&&!this[_0x1ffcd3(0x3c8)][_0x17cac7])return![];const _0x1f9e65=this[_0x1ffcd3(0x5c0)]();this[_0x1ffcd3(0x1c9)](_0x1f9e65,_0x57dd5d,_0x1ef11e,_0x5365d5,!![]);const _0x2ec4ca=this['getItemEffectsHpDamageText']();return this[_0x1ffcd3(0x527)](ColorManager[_0x1ffcd3(0x29f)](0x0)),this['drawItemKeyData'](_0x2ec4ca,_0x57dd5d,_0x1ef11e,_0x5365d5,![],'right'),this['drawItemDarkRect'](_0x57dd5d,_0x1ef11e,_0x5365d5),this[_0x1ffcd3(0x253)](),!![];},Window_ShopStatus[_0x4a1256(0x5b7)]['getItemEffectsHpDamageLabel']=function(){const _0x8d0b4e=_0x4a1256,_0x25633c=VisuMZ[_0x8d0b4e(0x242)][_0x8d0b4e(0x4e9)][_0x8d0b4e(0x53d)]['LabelDamageHP'];return _0x25633c[_0x8d0b4e(0x434)](TextManager['hp']);},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x270)]=function(){const _0x43e2ea=_0x4a1256,_0x46ee4e=_0x43e2ea(0x37b);if(this['_customItemInfo'][_0x46ee4e])return this[_0x43e2ea(0x3c8)][_0x46ee4e];let _0x16a460='';if(this[_0x43e2ea(0x239)]['rateHP']<0x0)_0x16a460+=_0x43e2ea(0x589)[_0x43e2ea(0x434)](Math['floor'](this[_0x43e2ea(0x239)]['rateHP']*0x64));if(this[_0x43e2ea(0x239)][_0x43e2ea(0x291)]<0x0&&this[_0x43e2ea(0x239)][_0x43e2ea(0x207)]<0x0)_0x16a460+='\x20';if(this[_0x43e2ea(0x239)][_0x43e2ea(0x207)]<0x0)_0x16a460+='%1'['format'](this['_itemData']['flatHP']);return _0x16a460;},Window_ShopStatus[_0x4a1256(0x5b7)]['drawItemEffectsMpDamage']=function(_0x5a86e3,_0x5004bc,_0x4c1f1e){const _0x5a1aca=_0x4a1256,_0x4e96b6=_0x5a1aca(0x3df);if(this[_0x5a1aca(0x239)][_0x5a1aca(0x2b5)]>=0x0&&this[_0x5a1aca(0x239)][_0x5a1aca(0x5ef)]>=0x0&&!this[_0x5a1aca(0x3c8)][_0x4e96b6])return![];const _0x15f75e=this[_0x5a1aca(0x466)]();this[_0x5a1aca(0x1c9)](_0x15f75e,_0x5a86e3,_0x5004bc,_0x4c1f1e,!![]);const _0x22fc38=this['getItemEffectsMpDamageText']();return this['changeTextColor'](ColorManager['damageColor'](0x2)),this[_0x5a1aca(0x1c9)](_0x22fc38,_0x5a86e3,_0x5004bc,_0x4c1f1e,![],_0x5a1aca(0x3f3)),this[_0x5a1aca(0x592)](_0x5a86e3,_0x5004bc,_0x4c1f1e),this[_0x5a1aca(0x253)](),!![];},Window_ShopStatus[_0x4a1256(0x5b7)]['getItemEffectsMpDamageLabel']=function(){const _0x30b5c1=_0x4a1256,_0x38580d=VisuMZ[_0x30b5c1(0x242)]['Settings']['StatusWindow'][_0x30b5c1(0x2c2)];return _0x38580d[_0x30b5c1(0x434)](TextManager['mp']);},Window_ShopStatus[_0x4a1256(0x5b7)]['getItemEffectsMpDamageText']=function(){const _0x13d26a=_0x4a1256,_0x4790ca=_0x13d26a(0x3df);if(this[_0x13d26a(0x3c8)][_0x4790ca])return this['_customItemInfo'][_0x4790ca];let _0x4446b9='';if(this[_0x13d26a(0x239)][_0x13d26a(0x2b5)]<0x0)_0x4446b9+='%1%'[_0x13d26a(0x434)](Math[_0x13d26a(0x21d)](this['_itemData'][_0x13d26a(0x2b5)]*0x64));if(this['_itemData']['rateMP']<0x0&&this[_0x13d26a(0x239)][_0x13d26a(0x5ef)]<0x0)_0x4446b9+='\x20';if(this[_0x13d26a(0x239)][_0x13d26a(0x5ef)]<0x0)_0x4446b9+='%1'[_0x13d26a(0x434)](this['_itemData'][_0x13d26a(0x5ef)]);return _0x4446b9;},Window_ShopStatus['prototype'][_0x4a1256(0x415)]=function(_0x1b061f,_0x4fa2e5,_0x604914){const _0x36767f=_0x4a1256,_0x26514d=_0x36767f(0x50d);if(this[_0x36767f(0x239)][_0x36767f(0x52c)]>=0x0&&!this[_0x36767f(0x3c8)][_0x26514d])return![];const _0x84ce00=this['getItemEffectsTpDamageLabel']();this[_0x36767f(0x1c9)](_0x84ce00,_0x1b061f,_0x4fa2e5,_0x604914,!![]);const _0x2adbd2=this['getItemEffectsTpDamageText']();return this['changeTextColor'](ColorManager[_0x36767f(0x372)]()),this[_0x36767f(0x1c9)](_0x2adbd2,_0x1b061f,_0x4fa2e5,_0x604914,![],_0x36767f(0x3f3)),this[_0x36767f(0x592)](_0x1b061f,_0x4fa2e5,_0x604914),this[_0x36767f(0x253)](),!![];},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x1cc)]=function(){const _0x1b5a38=_0x4a1256,_0xf06ccf=VisuMZ[_0x1b5a38(0x242)]['Settings']['StatusWindow'][_0x1b5a38(0x30c)];return _0xf06ccf['format'](TextManager['tp']);},Window_ShopStatus['prototype'][_0x4a1256(0x3de)]=function(){const _0x46e689=_0x4a1256,_0x10ef60=_0x46e689(0x50d);if(this[_0x46e689(0x3c8)][_0x10ef60])return this[_0x46e689(0x3c8)][_0x10ef60];let _0x204b6e='';return _0x204b6e+='%1'[_0x46e689(0x434)](this[_0x46e689(0x239)][_0x46e689(0x52c)]),_0x204b6e;},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x365)]=function(_0x3a9c38,_0x17a0fb,_0x4b4f60){const _0x3011bf=_0x4a1256,_0x3ef6b7=_0x3011bf(0x399);if(!this[_0x3011bf(0x239)]['addStateBuffChanges']&&!this['_customItemInfo'][_0x3ef6b7])return![];const _0x41716d=this['getItemEffectsAddedStatesBuffsText']();if(_0x41716d[_0x3011bf(0x45a)]<=0x0)return![];const _0x3dfa5f=this[_0x3011bf(0x3a4)]();return this[_0x3011bf(0x1c9)](_0x3dfa5f,_0x3a9c38,_0x17a0fb,_0x4b4f60,!![]),this[_0x3011bf(0x1c9)](_0x41716d,_0x3a9c38,_0x17a0fb,_0x4b4f60,![],_0x3011bf(0x3f3)),this['drawItemDarkRect'](_0x3a9c38,_0x17a0fb,_0x4b4f60),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x3a4)]=function(){const _0x29d5d6=_0x4a1256;return VisuMZ[_0x29d5d6(0x242)][_0x29d5d6(0x4e9)]['StatusWindow'][_0x29d5d6(0x2bb)];},Window_ShopStatus['prototype'][_0x4a1256(0x5dd)]=function(){const _0x55d057=_0x4a1256,_0x56d948=_0x55d057(0x399);if(this[_0x55d057(0x3c8)][_0x56d948])return this['_customItemInfo'][_0x56d948];let _0x4d9da1='',_0x393b96=0x0;const _0x1a6ec5=0x8;for(const _0x224276 of this['_itemData']['addState']){const _0x1440db=$dataStates[_0x224276];if(_0x1440db&&_0x1440db[_0x55d057(0x1f3)]>0x0){_0x4d9da1+='\x5cI[%1]'[_0x55d057(0x434)](_0x1440db[_0x55d057(0x1f3)]),_0x393b96++;if(_0x393b96>=_0x1a6ec5)return _0x4d9da1;}}for(let _0x36eab8=0x0;_0x36eab8<this[_0x55d057(0x239)]['changeBuff'][_0x55d057(0x45a)];_0x36eab8++){const _0x54dd9b=this['_itemData']['changeBuff'][_0x36eab8],_0x5e028e=Game_BattlerBase[_0x55d057(0x5b7)]['buffIconIndex'](_0x54dd9b,_0x36eab8);if(_0x5e028e>0x0){_0x4d9da1+=_0x55d057(0x2d1)[_0x55d057(0x434)](_0x5e028e),_0x393b96++;if(_0x393b96>=_0x1a6ec5)return _0x4d9da1;}}return _0x4d9da1;},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x1db)]=function(_0xf41cfb,_0x381847,_0xd7ec61){const _0x26d190=_0x4a1256,_0x2d21f1='REMOVED\x20EFFECTS';if(!this[_0x26d190(0x239)]['removeStateBuffChanges']&&!this[_0x26d190(0x3c8)][_0x2d21f1])return![];const _0x4bf06c=this[_0x26d190(0x38e)]();this[_0x26d190(0x1c9)](_0x4bf06c,_0xf41cfb,_0x381847,_0xd7ec61,!![]);const _0x28837f=this['getItemEffectsRemovedStatesBuffsText']();return this[_0x26d190(0x1c9)](_0x28837f,_0xf41cfb,_0x381847,_0xd7ec61,![],_0x26d190(0x3f3)),this[_0x26d190(0x592)](_0xf41cfb,_0x381847,_0xd7ec61),this[_0x26d190(0x253)](),!![];},Window_ShopStatus[_0x4a1256(0x5b7)]['getItemEffectsRemovedStatesBuffsLabel']=function(){const _0x51d519=_0x4a1256;return VisuMZ[_0x51d519(0x242)][_0x51d519(0x4e9)][_0x51d519(0x53d)][_0x51d519(0x39e)];},Window_ShopStatus[_0x4a1256(0x5b7)]['getItemEffectsRemovedStatesBuffsText']=function(){const _0x37638b=_0x4a1256,_0x589f51=_0x37638b(0x367);if(this[_0x37638b(0x3c8)][_0x589f51])return this[_0x37638b(0x3c8)][_0x589f51];let _0x44c984='',_0x44ab62=0x0;const _0x1e88c5=VisuMZ[_0x37638b(0x242)][_0x37638b(0x4e9)]['StatusWindow'][_0x37638b(0x318)];for(const _0x1d085e of this['_itemData']['removeState']){const _0x352a31=$dataStates[_0x1d085e];if(_0x352a31&&_0x352a31[_0x37638b(0x1f3)]>0x0){_0x44c984+=_0x37638b(0x2d1)['format'](_0x352a31[_0x37638b(0x1f3)]),_0x44ab62++;if(_0x44ab62>=_0x1e88c5)return _0x44c984;}}for(let _0x59c4f9=0x0;_0x59c4f9<this[_0x37638b(0x239)][_0x37638b(0x53e)][_0x37638b(0x45a)];_0x59c4f9++){const _0x3d7438=this[_0x37638b(0x239)][_0x37638b(0x53e)][_0x59c4f9],_0x53782a=Game_BattlerBase[_0x37638b(0x5b7)]['buffIconIndex'](0x1,_0x3d7438);if(_0x53782a>0x0){_0x44c984+='\x5cI[%1]'[_0x37638b(0x434)](_0x53782a),_0x44ab62++;if(_0x44ab62>=_0x1e88c5)return _0x44c984;}}for(let _0x38e4b0=0x0;_0x38e4b0<this[_0x37638b(0x239)][_0x37638b(0x3bf)][_0x37638b(0x45a)];_0x38e4b0++){const _0x4e1dbf=this[_0x37638b(0x239)][_0x37638b(0x3bf)][_0x38e4b0],_0x57aa96=Game_BattlerBase[_0x37638b(0x5b7)][_0x37638b(0x1da)](-0x1,_0x4e1dbf);if(_0x57aa96>0x0){_0x44c984+='\x5cI[%1]'[_0x37638b(0x434)](_0x57aa96),_0x44ab62++;if(_0x44ab62>=_0x1e88c5)return _0x44c984;}}return _0x44c984;},Window_ShopStatus[_0x4a1256(0x5b7)]['drawItemCustomEntries']=function(_0x5b82be,_0x2bd5ea,_0x1b1727){const _0x105fa5=_0x4a1256;if(this['_item'][_0x105fa5(0x4ff)]['match'](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x3e979c=String(RegExp['$1'])[_0x105fa5(0x1ff)](/[\r\n]+/);for(const _0x156cbb of _0x3e979c){if(_0x156cbb['match'](/(.*):[ ](.*)/i)){const _0x2e5f1f=String(RegExp['$1'])['trim'](),_0x42329b=String(RegExp['$2'])['trim']();this[_0x105fa5(0x3a3)](_0x2e5f1f,_0x42329b,_0x5b82be,_0x2bd5ea,_0x1b1727),_0x2bd5ea+=this[_0x105fa5(0x388)]();}}}return this[_0x105fa5(0x253)](),_0x2bd5ea;},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x3a3)]=function(_0x510d38,_0x4799b2,_0x2196b5,_0x191d73,_0x5d578c){const _0x3e942c=_0x4a1256;this[_0x3e942c(0x1c9)](_0x510d38,_0x2196b5,_0x191d73,_0x5d578c,!![]),this[_0x3e942c(0x1c9)](_0x4799b2,_0x2196b5,_0x191d73,_0x5d578c,![],'right'),this['drawItemDarkRect'](_0x2196b5,_0x191d73,_0x5d578c),this[_0x3e942c(0x253)]();},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x34a)]=function(){const _0x324d38=_0x4a1256;if(!this[_0x324d38(0x202)])return;const _0x46c364=this[_0x324d38(0x202)]['note'],_0x521a13=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0xbb90f8=_0x46c364[_0x324d38(0x4cd)](_0x521a13);if(_0xbb90f8)for(const _0x17d832 of _0xbb90f8){_0x17d832[_0x324d38(0x4cd)](_0x521a13);const _0xe014fd=String(RegExp['$1'])[_0x324d38(0x482)]()||'';if(_0xe014fd==='')continue;const _0x3aec1e=ImageManager[_0x324d38(0x392)](_0xe014fd);_0x3aec1e[_0x324d38(0x3d1)](this['drawCustomShopGraphicLoad'][_0x324d38(0x3f1)](this,_0x3aec1e,this[_0x324d38(0x202)]));}},Window_ShopStatus[_0x4a1256(0x5b7)][_0x4a1256(0x3e0)]=function(_0xed085f,_0x262e6){const _0x289bc9=_0x4a1256;if(this['_item']!==_0x262e6)return;if(!_0xed085f)return;if(_0xed085f[_0x289bc9(0x597)]<=0x0||_0xed085f[_0x289bc9(0x1d9)]<=0x0)return;const _0x583219=_0x262e6['note'];let _0xfcefd=_0x289bc9(0x4ef);_0x583219['match'](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)&&(_0xfcefd='foreground');const _0x300f58=_0xfcefd===_0x289bc9(0x4ef)?this[_0x289bc9(0x52e)]:this[_0x289bc9(0x3fe)];let _0x2e0955=this['innerWidth'],_0x48be7c=this['innerHeight'];_0x583219[_0x289bc9(0x4cd)](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)&&(_0x2e0955=Number(RegExp['$1']));_0x583219[_0x289bc9(0x4cd)](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)&&(_0x48be7c=Number(RegExp['$1']));_0x583219['match'](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)&&(_0x2e0955=Number(RegExp['$1']),_0x48be7c=Number(RegExp['$2']));const _0x2169fb=Math[_0x289bc9(0x29e)](0x1,_0x2e0955/_0xed085f['width'],_0x48be7c/_0xed085f[_0x289bc9(0x1d9)]);let _0x2156df=0x0,_0xb527d7=0x0,_0x877df1=Math['floor'](_0xed085f[_0x289bc9(0x597)]*_0x2169fb),_0x2d2055=Math[_0x289bc9(0x21d)](_0xed085f[_0x289bc9(0x1d9)]*_0x2169fb),_0x969540=_0x289bc9(0x36d);_0x583219['match'](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)&&(_0x969540=String(RegExp['$1'])[_0x289bc9(0x3b4)]()['trim']());if(_0x969540===_0x289bc9(0x2b0))_0x2156df=0x0;else _0x969540===_0x289bc9(0x36d)?_0x2156df=Math['round']((this['innerWidth']-_0x877df1)/0x2):_0x2156df=this[_0x289bc9(0x1c2)]-_0x877df1;let _0x633530=_0x289bc9(0x504);_0x583219[_0x289bc9(0x4cd)](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)&&(_0x633530=String(RegExp['$1'])[_0x289bc9(0x3b4)]()['trim']());if(_0x633530===_0x289bc9(0x5f8))_0xb527d7=0x0;else _0x633530===_0x289bc9(0x504)?_0xb527d7=Math['round']((this[_0x289bc9(0x3fa)]-_0x2d2055)/0x2):_0xb527d7=this['innerHeight']-_0x2d2055;_0x583219[_0x289bc9(0x4cd)](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x2156df+=Number(RegExp['$1']));_0x583219[_0x289bc9(0x4cd)](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0xb527d7+=Number(RegExp['$1']));_0x583219[_0x289bc9(0x4cd)](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)&&(_0x2156df+=Number(RegExp['$1']),_0xb527d7+=Number(RegExp['$2']));let _0x337261=0xff;if(_0x583219[_0x289bc9(0x4cd)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i))_0x337261=Number(RegExp['$1']);else _0x583219[_0x289bc9(0x4cd)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)&&(_0x337261=Math[_0x289bc9(0x55d)](Number(RegExp['$1'])*0.01*0xff)['clamp'](0x0,0xff));_0x300f58[_0x289bc9(0x2bd)]=_0x337261,_0x300f58[_0x289bc9(0x45c)](_0xed085f,0x0,0x0,_0xed085f['width'],_0xed085f[_0x289bc9(0x1d9)],_0x2156df,_0xb527d7,_0x877df1,_0x2d2055),_0x300f58[_0x289bc9(0x2bd)]=0xff;},VisuMZ[_0x4a1256(0x242)][_0x4a1256(0x431)]=function(_0x369550){const _0x115553=_0x4a1256;if(_0x369550===null||typeof _0x369550!==_0x115553(0x4b1))return _0x369550;const _0x15d0b7=Array[_0x115553(0x4fd)](_0x369550)?[]:Object[_0x115553(0x590)](Object['getPrototypeOf'](_0x369550));for(const _0x1b23f2 in _0x369550){Object[_0x115553(0x5b7)]['hasOwnProperty'][_0x115553(0x4f2)](_0x369550,_0x1b23f2)&&(_0x15d0b7[_0x1b23f2]=typeof _0x369550[_0x1b23f2]===_0x115553(0x4b1)&&_0x369550[_0x1b23f2]!==null?VisuMZ[_0x115553(0x242)]['deepCopy'](_0x369550[_0x1b23f2]):_0x369550[_0x1b23f2]);}return _0x15d0b7;};function _0x2e71(){const _0x326ec0=['Scene_Shop_onSellCancel','getItemEffectsMpDamageLabel','mainAreaHeight','isCustomParameter','isArtifact','LabelSuccessRate','Parse_Notetags_Prices','_dummyWindow','getDamageStyle','drawRemoveItem','PurchaseOnly','prepareRefreshItemsEquipsCoreLayout','Scene_Equip_onSlotOk','ListWindowCols','drawCurrencyValue','_statusWindow','Scene_Shop','WeaponType','meetsItemConditionsJS','mainFontSize','Scene_Equip_commandEquip','DrawIcons','Game_BattlerBase_param','type','Game_Item_setObject','item-%1','buttonAssistKey1','getShopTrackingItem','postCreateCategoryWindowItemsEquipsCore','trim','CursedTextPopup','isEquipChangeOk','occasion','CannotEquipMarker','_newItemsList','KeyItemProtect','processCursorMoveModernControls','weaponTypes','_category','hideNewLabelSprites','isEquipAtypeOk','7733736ZzWHBy','categoryNameWindowDrawBackground','windowPadding','IconSet','Game_Enemy_traitObjects_artifact','setupBattleTestItems','update','_newLabelOpacityUpperLimit','cursorPageup','Param','setMp','optimize','createTempActorEquips','NUM','slotWindowRect','Width','resetShopSwitches','isEquipWtypeOk','CmdHideDisabled','onSellItem','drawActorParamClassic','addEquipCommand','Scope7','DEF','_numberWindow','Scene_Equip_statusWindowRect','TGR','getItemEffectsSelfTpGainLabel','activateSellWindow','drawParamText','random','popScene','isClearCommandAdded','Window_ItemCategory_initialize','onTouchSelectModern','object','isBattleTest','Pick\x20and\x20choose\x20equipment\x20to\x20change.','EVAL','drawEquipDataCompare','setItemDelay','SetupArtifactItemIDs','createStatusWindow','OffsetX','show','NonRemoveETypes','BattleUsable','updateMoneyAmount','Window_Selectable_update','itemWindowRect','_bypassProxy','_data','drawItemEquipSubType','processDownCursorSpecialCheckModernControls','equipSlotIndex','REPEAT','isShiftRemoveShortcutEnabled','SpeedNeg999','drawUpdatedParamName','getMenuImage','_sellWindow','mhp','process_VisuMZ_ItemsEquipsCore_EquipSlots','match','ShopScene','troopArtifactIDs','iconWidth','getEtypeIdWithName','isOptimizeCommandEnabled','PurifyParty','partyArtifacts','meetsClassRequirements','getParamValueClassicNoCore','isRightInputMode','drawActorParamDifference','nonRemovableEtypes','Game_Actor_artifact','fontFace','itemLineRect','AllItems','isSoleWeaponType','exit','onBuyCancelItemsEquipsCore','drawItemActorMenuImage','processHandling','EFFECT_REMOVE_BUFF','_forcedSlots','_buttonAssistWindow','Parse_Notetags_Sorting','EXR','Scene_Item_createItemWindow','Settings','SetupProxyItemGroup','buttonAssistSmallIncrement','SwitchID','status','AllArmors','background','updateCommandNameWindow','Game_Party_gainItem_artifact','call','maxBattleMembers','DAMAGE\x20MULTIPLIER','deactivate','Window_ItemCategory_setItemWindow','ActorResetEquipSlots','getItemEffectsTpRecoveryLabel','fontSizeRatio','determineBaseSellingPrice','weapon','normalColor','isArray','Game_BattlerBase_paramPlus_artifact','note','loadFaceImages','shouldCommandWindowExist','CommandAddClear','fontSize','middle','itypeId','isEquipTypeSealed','tradeItemWithParty','Scope%1','param','Game_Actor_changeClass','_armorIDs','addItemCategory','TP\x20DAMAGE','drawActorCharacter','\x5cI[%1]%2','categoryWindowRect','sellingPrice','Scene_Item_categoryWindowRect','Consumable','setStatusWindow','isItem','getItemSpeedText','EVA','setNewItem','armors','updateCategoryNameWindow','mmp','ParamChangeFontSize','isHandled','Scene_Equip_createSlotWindow','goldWindowRect','ShowShopStatus','143045ChmNDl','Window_ShopBuy_item','addItemCategories','onTouchSelect','getItemRepeatsText','isVisuMzLocalizationEnabled','changeTextColor','isSoleArmorType','EFFECT_ADD_BUFF','TP\x20RECOVERY','EquipDataStyle','gainTP','MAT','contentsBack','cursorLeft','Scene_Shop_numberWindowRect','getItemRepeatsLabel','artifactIDs','getProxyItem','getItemHitTypeText','traitObjects','limitedPageUpDownSceneCheck','currencyUnit','ClassicArmorParameters','getArmorIdWithName','CmdTextAlign','refreshCursor','gaugeBackColor','StatusWindow','removeBuff','commandStyleCheck','_shopStatusMenuAlly','loseItem','actorId','text','remove','Scene_Equip_commandWindowRect','onSellOk','wtypeId','cursorRight','drawText','canShiftRemoveEquipment','_cache','traits','NAME','refreshActorEquipSlotsIfUpdated','revertGlobalNamespaceVariables','drawItemEffects','isCursorMovable','number','anyEmptyEquipSlotsOfSameEtype','LayoutStyle','_scene','ParseWeaponNotetags','getPurifyTransformation','getItemOccasionText','toggleType','clearEquipments','processCursorHomeEndTrigger','clear','round','scrollTo','getInputButtonString','isArmor','mainCommandWidth','getItemDamageAmountLabelOriginal','setTopRow','textSizeEx','calcEquipItemPerformance','MDR','drawItemDamageElement','processShopCondListingOnSellItem','ParseArmorNotetags','W%1','armor-%1','process_VisuMZ_ItemsEquipsCore_Notetags','getItemEffectsMpRecoveryText','_handlers','ITEMS_EQUIPS_CORE','ShopListingRegExp','EFFECT_ADD_DEBUFF','equipAdjustHpMp','OffsetY','hitIndex','Step3End','updateChangedSlots','addInnerChild','Game_BattlerBase_param_artifact','paramValueFontSize','statusWindowRect','getEmptyEquipSlotOfSameEtype','CmdIconEquip','categoryItemTypes','commandBuy','IncludeShopItem','scope','callUpdateHelp','Nonconsumable','statusWidth','smoothSelect','setText','changePaintOpacity','Game_Party_numItems','commandSellItemsEquipsCore','%1%','getTextColor','drawing','_tempActor','Actors','CmdCancelRename','drawItemEffectsTpRecovery','create','isEquipped','drawItemDarkRect','isToggleSkill','hitType','MenuPortraits','paramPlus','width','setItem','addShopTrackingGoldSell','_newLabelOpacityChange','drawItemEffectsHpDamage','DrawBackRect','Scene_Shop_commandBuy','boxWidth','itemEnableJS','Parse_Notetags_Category','_cache_etypeIDs','numberWindowRect','isPageChangeRequested','isEquipCommandEnabled','adjustItemWidthByStatus','Categories','USER\x20TP\x20GAIN','refreshActor','clearNewItem','itemTextAlign','DrawEquipData','processCursorMove','commandNameWindowCenter','drawItemQuantity','commandSell','setValue','getItemsEquipsCoreBackColor2','prepareItemCustomData','getEtypeIDs','ElementNone','optimizeCmdDesc','_skillIDs','prototype','Window_ItemList_maxCols','2932110yAPtIP','Scene_Item_itemWindowRect','ActorChangeEquipSlots','LabelRecoverTP','return\x200','SortByIDandPriority','sellPriceRate','getItemEffectsHpDamageLabel','every','Scene_Equip_createCommandWindow','setHelpWindow','deselect','SCOPE','initNewItemsList','commandWindowRectItemsEquipsCore','initNewLabelSprites','onSlotOkAutoSelect','Scene_Shop_prepare','English','helpWindowRect','Window_ItemList_colSpacing','paramBase','EFFECT_RECOVER_HP','drawItemCost','getItemDamageElementLabel','convertInitEquipsToItems','getItemEffectsMpRecoveryLabel','uiHelpPosition','_helpWindow','FontSize','drawItemStyleIcon','atk','paramPlusItemsEquipsCoreCustomJS','EFFECT_GAIN_TP','forceChangeEquipSlots','addShopTrackingItemSell','getItemEffectsAddedStatesBuffsText','TextAlign','needsNewTempActor','processShiftRemoveShortcut','CONSUMABLE','equips','equip','HideAllSwitches','pagedown','_equips','nextActor','customEquipParams','Scene_Shop_commandSell','isProxyItem','versionId','damage','getItemScopeText','consumeItem','flatMP','Game_Actor_paramPlus','MaxWeapons','drawEquipDataClassic','parse','getEquipRequirements','CEV','geUpdatedLayoutStatusWidth','Scene_Shop_onBuyCancel','top','selfTP','CoreEngine','Scene_ItemBase_activateItemWindow','getWeaponIdWithName','buttonAssistText2','Scene_Shop_create','Window_EquipCommand_initialize','changeEquip','buttonAssistCategory','numberWindowRectItemsEquipsCore','isEquipItem','SetupProxyItemGroups','drawParamName','actorParams','visible','MAXMP','NotConsumable','AlwaysUsable','canSortListItemScene','ShowAnySwitches','CmdIconOptimize','_itemWindow','EquipParams','innerWidth','atypeId','uiMenuStyle','Game_Party_setupBattleTestItems_artifact','Game_Actor_isEquipChangeOk','Scene_Shop_sellingPrice','equipHasCustomParams','drawItemKeyData','LabelSpeed','Parse_Notetags_ParamValues','getItemEffectsTpDamageLabel','SwitchBuy','NeverUsable','_tempActorA','optimizeEquipments','_getClassRequirements','Speed0','Window_Selectable_initialize','isDualWield','setupItemDamageTempActors','ARRAYFUNC','_resetFontSize','iconHeight','height','buffIconIndex','drawItemEffectsRemovedStatesBuffs','Scene_Equip_onActorChange','MultiplierStandard','troopArtifacts','getItemHitTypeLabel','addBuyCommand','drawItemName','buyWindowRect','bitmap','Window_ShopStatus_setItem','characterName','_newLabelOpacity','itemPadding','sortPriority','calcWindowHeight','maxCols','Scene_Shop_onBuyOk','updateHelp','goldWindowRectItemsEquipsCore','price','gold','Scene_Shop_createSellWindow','Step1End','currentExt','iconIndex','elementId','FontColor','onSlotCancel','TCR','meetsItemConditionsNotetags','index','uiInputPosition','items','commandName','Parse_Notetags_EquipSlots','baseSellingPrice','split','drawItemConsumable','colSpacing','_item','buttonAssistText1','getItemConsumableLabel','_allowArtifactParamBase','_allowArtifactTraitObjects','flatHP','SpeedNeg2000','Step2End','Window_ShopBuy_price','commandEquip','getEquipDataStyle','canEquipArmor','createCategoryWindow','Scene_Equip','getSkillIdWithName','_slotWindow','Game_Actor_tradeItemWithParty','HiddenItemA','isOptimizeEquipOk','230ARoZwM','RemoveEquipIcon','getItemDamageElementText','drawTextEx','buttonAssistKey3','Scene_Equip_slotWindowRect','addStateBuffChanges','allMembers','floor','mainAreaTop','buttonAssistSlotWindowShift','includes','max','agi','drawItemNumber','isUseItemsEquipsCoreUpdatedLayout','itemDataFontSize','PDR','onCategoryCancel','postCreateSlotWindowItemsEquipsCore','map','Game_Actor_equips_artifacts','RegularItems','placeNewLabel','drawItemEffectsHpRecovery','EFFECT_RECOVER_MP','isSellCommandEnabled','Scene_Load_reloadMapIfUpdated','isWeapon','Scene_Shop_activateSellWindow','getItemEffectsTpRecoveryText','CRI','MCR','_commandWindow','checkItemConditionsSwitchNotetags','actor','_itemData','drawUpdatedParamValueDiff','BorderRegExp','forceResetEquipSlots','HitType%1','isCursedItem','initShopTrackingData','_tempActorB','refreshItemsEquipsCoreNoMenuImage','ItemsEquipsCore','GRD','createBitmap','createItemWindow','HRG','removeStateBuffChanges','value','cancel','registerCommand','test','Scene_Shop_onCategoryCancel','currentSymbol','getItemConsumableText','drawItemEquipType','modifiedBuyPriceItemsEquipsCore','makeDeepCopy','setCategory','resetFontSettings','switchProxyItem','addSellCommand','A%1','checkShiftRemoveShortcut','getMatchingInitEquip','paramchangeTextColor','canEquipWithOptimize','isOpen','repeats','_doubleTouch','ClassicWeaponParameters','567672CNZZes','NonOptimizeETypes','canConsumeItem','ItemQuantityFmt','processDrawIcon','paramId','allowCommandWindowCursorUp','itemAt','bestEquipItem','onCategoryOk','gaugeLineHeight','_categoryNameWindow','categories','_newLabelSprites','?????','parseLocalizedText','buttonAssistKey2','getItemEffectsHpDamageText','possession','helpDesc','BuyPriceJS','HIT\x20TYPE','processCursorSpecialCheckModernControls','drawItemDamageAmount','buttonAssistRemove','buttonAssistOffset3','Scene_Equip_helpWindowRect','ParseAllNotetags','drawItemEffectsMpRecovery','Speed1','isPressed','Scene_Shop_sellWindowRect','Window_ItemList_updateHelp','Enable','drawItemScope','replace','#%1','clamp','armor','effects','inBattle','REC','prepareNewEquipSlotsOnLoad','doSell','resetTextColor','itemWindowRectItemsEquipsCore','isClearEquipOk','opacity','playCursorSound','Blacklist','rateHP','meetsEquipRequirements','partyArtifactIDs','consumable','VisuMZ_0_CoreEngine','ParseItemNotetags','getItemEffectsSelfTpGainText','Scene_Item_createCategoryWindow','newLabelEnabled','ConvertParams','buttonAssistText3','getParamValueClassicCore','placeItemNewLabel','min','damageColor','LabelRepeats','mainAreaBottom','AllWeapons','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','EFFECT_REMOVE_DEBUFF','setObject','isHoverEnabled','fillRect','Step2Start','playBuzzerSound','getItemDamageAmountLabel','setHandler','getShopTrackingGoldBuy','Scene_Shop_commandWindowRect','pageup','currentClass','left','updatedLayoutStyle','icon','Window_EquipItem_includes','nonOptimizeEtypes','rateMP','setBackgroundType','4958204wGMfWR','ARRAYSTRUCT','getEtypeIDsCache','name','LabelApply','loadCharacter','paintOpacity','isPlaytest','onMenuImageLoad','process_VisuMZ_ItemsEquipsCore_RegExp','LabelRecoverMP','LabelDamageMP','getItemColor','processTouchModernControls','setTempActor','isStackableArtifact','fill','constructor','_classIDs','isEnabled','iconText','CNT','isDrawItemNumber','getColor','isKeyItem','TRG','\x5cI[%1]','Scene_Shop_buyWindowRect','paramJS','adjustHiddenShownGoods','purifyCursedEquips','ParamValueFontSize','drawItemCustomEntries','getShopTrackingGoldSell','ScopeAlliesButUser','Game_BattlerBase_canEquip_artifact','getItemsEquipsCoreBackColor1','100%','LabelSelfGainTP','isShowNew','tpGain','n/a','Scene_Shop_helpWindowRect','MRF','mdf','_scrollDuration','value2','Step3Start','ARMOR','postCreateItemsEquipsCore','_bypassNewLabel','goodsToItem','cursorPagedown','weapon-%1','helpAreaTop','ScopeRandomAllies','drawEquipDataDouble','find','_commandNameWindow','MRG','statusWindowRectItemsEquipsCore','ARRAYSTR','down','FontFace','50JJLOoG','updateSmoothScroll','HP\x20RECOVERY','CommandAddOptimize','isClicked','_money','user','dataId','CmdIconClear','%1-%2','Whitelist','helpDescriptionText','Occasion%1','Parse_Notetags_Batch','initialize','CmdIconCancel','===','activate','FieldUsable','LabelRecoverHP','onBuyItem','LabelDamageTP','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','level','meetsItemConditions','setHelpWindowItem','Game_Party_gainItem','Window_EquipSlot_isEnabled','VisuMZ_2_WeaponSwapSystem','_goods','isEquipCommandAdded','getItemDamageAmountText','numItems','MaxIcons','categoryNameWindowCenter','meetsShopListingConditions','makeCommandList','commandBuyItemsEquipsCore','createSellWindow','makeItemData','Window_ItemList_drawItem','cursorDown','onTouchSelectModernControls','gainItem','ATK','Armor\x20Type','addShopTrackingItemBuy','params','setShopStatusWindowMode','drawItemData','categoryStyleCheck','commandStyle','forceChangeEquip','makeItemList','hideDisabledCommands','updateNewLabelOpacity','compare','DoubleWeaponParameters','getItemQuantityText','Scene_Shop_doSell','helpWindowRectItemsEquipsCore','Scene_Item_create','addCommand','prepare','MaxItems','FUNC','categoryList','DrawEquipDoubleData','armorTypes','postCreateItemWindowModernControls','HiddenItemB','Game_Actor_discardEquip','move','alterSkillName','clearNewLabelFromItem','_etypeIDs','parameters','start','addState','VisuMZ_1_SkillsStatesCore','some','addChild','Weapon\x20Type','drawCustomShopGraphic','textLocale','Scene_Equip_onSlotCancel','ShiftShortcutKey','EquipScene','ElementWeapon','isTroopArtifact','EFFECT_ADD_STATE','commandWindowRect','KeyItems','SellTurnSwitchOff','LabelConsume','onBuyCancel','sellWindowRectItemsEquipsCore','powerUpColor','doBuy','4432392qmInjx','value1','getItemSuccessRateLabel','push','Scene_Shop_statusWindowRect','5501ikKJcb','playOkSound','Scene_Item','discardEquip','DrawEquipClassicData','maxVisibleItems','drawItemEffectsAddedStatesBuffs','etypeId','REMOVED\x20EFFECTS','_slotId','Scene_Shop_buyingPrice','isGoodShown','equipItems','Window_Selectable_refresh','center','select','getClassIdWithName','Window_ShopCommand_initialize','Scene_Shop_onSellOk','powerDownColor','commandNameWindowDrawText','Scene_Battle','active','getItemEffectsHpRecoveryLabel','hide','onTouchOk','maxmp','maxItems','HP\x20DAMAGE','previousActor','drawParamsItemsEquipsCore','_checkEquipRequirements','setItemWindow','categoryWindowRectItemsEquipsCore','drawItemOccasion','battleMembers','StatusWindowWidth','Style','SwitchSell','clearCmdDesc','itemHasEquipLimit','lineHeight','FadeSpeed','PHA','drawNewLabelText','getNextAvailableEtypeId','getItemDamageAmountTextOriginal','getItemEffectsRemovedStatesBuffsLabel','values','releaseUnequippableItems','equipTypes','loadPicture','createNewLabelSprite','_shopStatusMenuMode','_purchaseOnly','getShopTrackingData','UNDEFINED!','getItemEffects','ADDED\x20EFFECTS','CheckCursedItemMsg','_weaponIDs','reloadMapIfUpdated','refresh','LabelRemove','_actor','EFFECT_REMOVE_STATE','removeBattleTestArtifacts','sell','drawItemCustomEntryLine','getItemEffectsAddedStatesBuffsLabel','item','def','EnableLayout','getInputMultiButtonStrings','isNewItem','getItemSuccessRateText','onDatabaseLoaded','isSceneShop','Game_Actor_forceChangeEquip','getShopTrackingItemBuy','equip2','Scope1','onTouchCancel','SpeedNeg1999','Window_Selectable_setHelpWindowItem','toLowerCase','ceil','VisuMZ_1_BattleCore','setHp','createCommandNameWindow','buttonAssistItemListRequirement','AlreadyEquipMarker','equipSlots','slotWindowRectItemsEquipsCore','Scene_Boot_onDatabaseLoaded','ItemQuantityFontSize','removeDebuff','Speed1000','activateItemWindow','RemoveEquipText','isTriggered','defaultItemMax','New','changeEquipById','formula','_customItemInfo','concat','Game_Party_initialize','description','Equip\x20the\x20strongest\x20available\x20equipment.','MANUAL','BackRectColor','AGI','drawIcon','addLoadListener','drawItemSuccessRate','Window_ShopBuy_goodsToItem','Parse_Notetags_EnableJS','+%1','isRepeated','RegExp','_buyWindow','getClassRequirements','_calculatingJSParameters','allowShiftScrolling','keyItem','getItemSpeedLabel','getItemEffectsTpDamageText','MP\x20DAMAGE','drawCustomShopGraphicLoad','processShopCondListingOnBuyItem','refreshDelay','splice','SellPriceJS','Scene_Equip_create','code','_itemIDs','+%1%','MEV','SUCCESS\x20RATE','EquipDelayMS','LUK','ParseClassNotetags','_goodsCount','standardIconHeight','allowCreateStatusWindow','bind','Window_EquipStatus_refresh','right','Game_Party_consumeItem','FadeLimit','buttonAssistLargeIncrement','canEquip','paramValueByName','changeEquipBase','innerHeight','drawItemEffectsSelfTpGain','Scene_Shop_doBuy','drawEquipData','contents','Window_EquipItem_isEnabled','auto','version','isLearnedSkill','_paramPlus','STR','onSellOkItemsEquipsCore','category','money','ItemScene','textColor','Icon','SellTurnSwitchOn','isMainMenuCoreMenuImageOptionAvailable','mainFontFace','isPurifyItemSwapOk','Window_ItemList_makeItemList','sellWindowRect','sellPriceOfItem','Step1Start','filter','isUseModernControls','drawItemEffectsTpDamage','Window_ShopBuy_refresh','Speed2000','pop','_shopTrackingData','Game_BattlerBase_meetsItemConditions','EQUIP_DELAY_MS','ItemSceneAdjustItemList','buy','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','addShopTrackingItem','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','speed','Parse_Notetags_ParamJS','log','optKeyItemsNumber','changeBuff','sort','helpAreaHeight','createSlotWindow','CmdStyle','7HFaIde','addShopTrackingGoldBuy','Window_ShopSell_isEnabled','addCancelCommand','ScopeEnemyOrAlly','_resetFontColor','hasItem','deepCopy','Window_ItemList_item','sortListItemScene','format','ARRAYNUM','textWidth','ScopeRandomAny','playCancel','double','drawItemStyleIconText','NoEquipTypeResult','MAXHP','createCommandWindow','addClearCommand','_buyWindowLastIndex','onCategoryCancelItemsEquipsCore','indexOf','MDF','MaxArmors','Scene_Item_helpWindowRect','getItemIdWithName','Type','commandNameWindowDrawBackground','isHovered','Damage\x20Formula\x20Error\x20for\x20%1','shift','BuyTurnSwitchOn','createCategoryNameWindow','getItemEffectsHpRecoveryText','LabelHitType','PurifyActors','isCommandEnabled','isBuyCommandEnabled','_getEquipRequirements','HIT','MP\x20RECOVERY','maxItemAmount','_list','isBottomHelpMode','smoothScrollTo','postCreateSellWindowItemsEquipsCore','length','toUpperCase','blt','JSON','cursorUp','isOptimizeCommandAdded','_categoryWindow','getShopTrackingItemSell','weapons','drawItem','categoryStyle'];_0x2e71=function(){return _0x326ec0;};return _0x2e71();}