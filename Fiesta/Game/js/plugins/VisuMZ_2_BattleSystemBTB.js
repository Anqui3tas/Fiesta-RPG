//=============================================================================
// VisuStella MZ - Battle System - BTB - Brave Turn Battle
// VisuMZ_2_BattleSystemBTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemBTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemBTB = VisuMZ.BattleSystemBTB || {};
VisuMZ.BattleSystemBTB.version = 1.18;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.18] [BattleSystemBTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_BTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Brave Turn Battle (BTB) system plays off RPG Maker MZ's default battle
 * system with a twist of allowing actors (and enemies) to use up actions from
 * the future or save up for later. These actions will be queued and delivered
 * all in one go! Any borrowed actions from the future will result in following
 * turns without any actions to use. Should a player decide to save up their
 * actions instead through Guarding, they can charge actions with less
 * repercussions. Players will have to be brave about how to go about the
 * battle system strategically.
 * 
 * Because multiple actions can be queued up all at once, they can result in
 * the creation of an action fusion. Some skills (and items) can appear instead
 * of the originally queued actions to result in stronger, better, and more
 * awesome effects, all of which, can be defined by the game dev.
 * 
 * A Turn Order Display will also appear on the screen to show the order the
 * battlers will take their turns in. This lets the player plan in advance on
 * how to go about the rest of the turn.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "btb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Puts a twist on the Default Turn Battle system by allowing brave players
 *   to borrow actions from the future turns or save them up for later turns.
 * * Brave Points, a new currency, are added to mark how many saved turns there
 *   are for each battler.
 * * Certain actions can cost more Brave Points than others.
 * * Effects that allow battlers to alter the Brave Points of their targets.
 * * A Turn Order Display to show the player when each battler will have its
 *   turn to perform an action.
 * * Action fusion system which takes any of the queued up skills and/or items
 *   to bring forth new ones.
 * * Action fusion combinations can be either flexible or strict.
 * * Flexible action fusion combinations can have their actions queued up in
 *   any order to bring forth the result.
 * * Strict action fusion combinations must require their actions to be queued
 *   up in a specific order in order to bring forth the result.
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
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
 * Turn Order Display
 * 
 * The Turn Order Display will capture the battle's currently active battler
 * and any battlers found in the active battlers array for the BattleManager.
 * This does not overwrite any functions, but the Turn Order Display may or may
 * not conflict with any existing HUD elements that are already positioned on
 * the screen. If so, you can choose to offset the Turn Order Display or move
 * it to a different part of the screen through the plugin parameters.
 * 
 * ---
 * 
 * Brave Points and the Brave Command
 * 
 * Abbreviated to "BP", Brave Points are a new currency available through the
 * Brave Turn Battle system. Battlers require at least 0 BP in order to perform
 * any actions for that turn. By default, each action consumes 1 BP. At the end
 * of each turn, each battler regenerates 1 BP. With the normal flow of battle,
 * this results in a net balance.
 * 
 * However, the player can activate the "Brave Command" located right above the
 * Guard Command. This lets the battler create an extra action to perform. When
 * used, the flow of battle will result in a negative net of BP. When BP is at
 * -1 or under, that battler's turn is skipped until it raises back to 0. This
 * effectively means that the "Brave Command" will borrow actions from future
 * turns.
 * 
 * The Guard Command, however will never consume any BP for its actions even if
 * replaced as it is always determined by the battler's current guard skill.
 * This means that when used, the Guard Command lets a battler save up BP for
 * future turns, allowing BP to go net positive for the turn.
 * 
 * By strategically deciding when to borrow actions or save up for them, whole
 * new strategies can be created for battle.
 * 
 * The game dev has control over how many max actions can be borrowed at once,
 * the maximum and minimum amounts for BP to go to, how much BP will cost at
 * default, and how much BP can be regenerated by default. These settings can
 * all be made within the Plugin Parameters.
 * 
 * ---
 *
 * Action Times +
 * 
 * While the Brave Turn Battle system is active, the "Action Times +" trait
 * is disabled. This is to prevent any conflicts with the Brave system. If the
 * Brave Turn Battle system is disabled during the course of the game, then the
 * "Action Times +" will resume working like normal.
 *
 * ---
 * 
 * Can Input
 * 
 * As mentioned in the "Brave Points and the Brave Command" above, if BP is
 * under 0, then that battler cannot input or act for that turn. The battler
 * would have to wait for BP regenerate back up to 0 first.
 * 
 * ---
 * 
 * Can Guard
 * 
 * The Guard action is only enabled when there's one action to use for that
 * turn. This means that if the "Brave Command" is used to generate new actions
 * to perform during that turn, the Guard Command will be disabled. It can be
 * enabled once again if the player cancels out the Brave Command until the
 * action count reaches 1.
 * 
 * ---
 * 
 * Enemy Brave Actions
 * 
 * Enemies can also use the "Brave Command" by faking it. By making a dummy
 * skill with the <BTB Multiple Actions: id, id, id, id> skill notetag or the
 * <BTB Multiple Actions: name, name, name, name> skill notetag, you can have
 * the enemy perform the exact skills you want in a multi-action queue.
 * 
 * Enemies that use this will also suffer from heavy BP expenditure and wait on
 * subsequent turns until they have enough BP to perform actions again.
 * 
 * This is also how you can have enemies perform Action Fusions. For the queued
 * skills, load up the Action Fusion's skill combination you want for the enemy
 * to perform.
 * 
 * ---
 *
 * ============================================================================
 * Action Fusions
 * ============================================================================
 *
 * This feature deserves its own section as it's quite indepth with how it
 * works. Action Fusions can be performed by either the actor and/or enemy
 * (though this can be disabled in the Plugin Parameters or through traits).
 * In order for them to occur, the queued up action list must have a certain
 * combination of skills/items for the Action Fusion to occur.
 *
 * ---
 * 
 * Fusion Types
 * 
 * There are two types of Action Fusions: Flexible and Strict. Flexible Action
 * Fusions can use a combination of skills/items in any order (thus flexible),
 * while Strict Action Fusions must have their skill/item combinations queued
 * up in the exact order they're listed (thus strict).
 * 
 * They all share the following properties:
 * 
 * Skill Action Fusions can only use skills for combinations. This means that
 * Action Fusions made as a skill database object cannot have item requirements
 * for the combinations.
 * 
 * Item Action Fusions can only use items for combinations. This means that
 * Action Fusions made as an item database object cannot have skills for the
 * combination requirements.
 * 
 * Skills and items that have selectable targets need to have matching targets
 * to be a part of the same Action Fusion combination. For example, if "Quad
 * Attack" requires "Attack", "Attack", "Attack", "Attack", then the player
 * would have to target the same enemy for each of the "Attack" actions. This
 * is to prevent the cases where the player wants to spread out the damage
 * evenly across various enemies without forming it into a single target "Quad
 * Attack" against one.
 * 
 * Skills and items that do not have selectable targets are combination targets
 * for any and all candidates. This means an area of effect "Flame" spell can
 * combine with any target selectable or otherwise skill.
 * 
 * When an Action Fusion is performed, it will not consume the resources for
 * the database object itself, but instead, from each of the skills/items used
 * to bring it out. This means the skill costs of the Action Fusion itself are
 * irrelevant, but the skill costs of the combinations do matter and will be
 * consumed instead. The same applies to items.
 * 
 * If the Action Fusion skill/item is used directly, its resource consumption
 * will be performed as if it was not an Action Fusion skill/item. The "Quad
 * Attack" skill will use its regular MP and TP costs while the "Double Elixir"
 * item will consume itself.
 * 
 * If a queue could potentially meet the demands of multiple Action Fusions,
 * then the Action Fusion with the highest database ID will be given priority,
 * as to make it less complicated. This means if the "Double Attack" Action
 * Fusion and "Triple Attack" Action Fusion were to occur at the same time,
 * if the "Triple Attack" skill has a higher ID than "Double Attack", then
 * "Triple Attack" will take priority instead.
 * 
 * The battler must be able to pay the actions of each of the queued actions
 * used to form the Action Fusion. This means if a battler would run out of MP
 * or items for the cost, it will just simply not occur.
 * 
 * An Action Fusion can have multiple combinations that create it as long as
 * there are multiple notetags that determine the Action Fusion. As an example,
 * the "Flame Strike" can occur with the "Attack" and "Flame" combination or
 * the "Strike" and "Flame" combination.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Examples:
 * 
 *   ---
 * 
 *   Fire Strike
 * 
 *   <BTB Flexible Fusion: Attack, Fire>
 * 
 *   This Action Fusion will occur if a battler has the "Attack" and "Fire"
 *   actions queued up in any order. "Attack" can come before "Fire" or "Fire"
 *   can come before "Attack" and it would still call upon "Fire Strike".
 * 
 *   ---
 * 
 *   Flame Strike
 * 
 *   <BTB Flexible Fusion: Attack, Flame>
 *   <BTB Flexible Fusion: Strike, Flame>
 * 
 *   This Action Fusion will occur if a battler has "Attack" and "Flame",
 *   "Flame" and "Attack", "Strike" and "Flame", or "Flame" and "Strike" in its
 *   action queue.
 * 
 *   ---
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Example:
 * 
 *   ---
 * 
 *   Shadow Flare Blade
 * 
 *   <BTB Strict Fusion: Shade II, Fire II, Attack>
 * 
 *   The battler must queue up "Shade II", "Fire II", and "Attack" in that
 *   exact order or else "Shadow Flare Blade" will not occur. Even if the
 *   battler changed the order to "Fire II", "Shade II", and "Attack", the
 *   Action Fusion will not occur.
 * 
 *   ---
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
 * VisuMZ_3_BoostAction
 * 
 * The Boost Actions plugin cannot be used together with Battle System - BTB.
 * If the Battle System is switched to using Battle System - BTB, then the
 * Boost Actions plugin will shut itself off.
 * 
 * The reason why these plugins cannot work together is because their mechanics
 * play off too similarly to each other and cause conflicts. We, the plugin
 * developer team, highly recommend that you utilize Battle System - BTB's
 * Brave system instead of the Boost system to make the best use of the battle
 * system in effect.
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
 * === General BTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <BTB Help>
 *  description
 *  description
 * </BTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under BTB.
 * - This is primarily used if the skill behaves differently in BTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to BTB.
 *
 * ---
 *
 * <BTB Cannot Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command disabled.
 *
 * ---
 *
 * <BTB Hide Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command hidden along with their
 *   BP values.
 *
 * ---
 * 
 * === BTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the BTB Turn Order Display
 * 
 * ---
 *
 * <BTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <BTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <BTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Brave Points Cost-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB BP Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Determines how much BP the battler uses when performing this action.
 * - Replace 'x' with a number value to determine its BP cost.
 *
 * ---
 *
 * <BTB Hide BP Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Prevents the BP cost from being shown for this action.
 *
 * ---
 * 
 * === Brave Point Manipulation-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB User Set BP: x>
 * <BTB Target Set BP: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the user/target's current BP to a specific value.
 * - Replace 'x' with a number value to determine how much you want the user
 *   or target's BP to be set to.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 *
 * <BTB User Gain BP: +x>
 * <BTB Target Gain BP: +x>
 *
 * <BTB User Lose BP: -x>
 * <BTB Target Lose BP: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to alter how much BP the user/target has.
 * - Replace 'x' with a number value to determine how much BP is gained/lost
 *   for the user/target.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 * 
 * === JavaScript Notetags: Brave Point Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over Brave Point alteration.
 * 
 * ---
 *
 * <JS BTB User BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB User BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the user's final
 *   BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the user's BP.
 *   This value also starts off as the user's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 *
 * <JS BTB Target BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB Target BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the current
 *   target's final BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the target's BP.
 *   This value also starts off as the target's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 * 
 * === Brave Point Managment-Related Notetags ===
 * 
 * The following notetags are used to for battlers to manage their BP settings
 * throughout the course of the fight.
 * 
 * ---
 *
 * <BTB Initial BP: +x>
 * <BTB Initial BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter that battler's initial BP at the start of battle.
 * - Replace 'x' with a number value representing how much you want to alter
 *   the affected battler's initial BP at the start of battle.
 *
 * ---
 *
 * <BTB BP Regen: +x>
 * <BTB BP Degen: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter the amount of BP regenerated at the end of each battle turn.
 * - Replace 'x' with a number value representing how much BP is regenerated
 *   (or decreased). 
 *   - Use a positive number for gaining BP at the end of each turn.
 *   - Use a negative number for losing BP at the end of each turn.
 *
 * ---
 *
 * <BTB Maximum BP: +x>
 * <BTB Maximum BP: -x>
 *
 * <BTB Minimum BP: +x>
 * <BTB Minimum BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase or decrease the maximum/minimum BP that battler can have by 'x'.
 * - Replace 'x' with a number value representing the amount to change the
 *   battler's maximum/minimum BP by.
 * - These numbers cannot exceed or go under the designated amounts set by the
 *   hard cap in this plugin's Plugin Parameters.
 *
 * ---
 * 
 * === Multiple Action-Related Notetags ===
 * 
 * These notetags allow you to determine how multiple actions are handled
 * through the Brave Turn Battle system.
 * 
 * ---
 *
 * <BTB Maximum Actions: +x>
 * <BTB Maximum Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase/decrease the maximum number of actions that battler can have
 *   through the Brave Command.
 * - Replace 'x' with a number value representing the amount of maximum actions
 *   to increase/decrease by.
 * - This value cannot make a battler go below 1 maximum action.
 * - This value cannot make a battler go above the hard cap set in this
 *   plugin's Plugin Parameters.
 *
 * ---
 *
 * <BTB Multiple Actions: id, id>
 * <BTB Multiple Actions: id, id, id>
 * <BTB Multiple Actions: id, id, id, id>
 *
 * <BTB Multiple Actions: name, name>
 * <BTB Multiple Actions: name, name, name>
 * <BTB Multiple Actions: name, name, name, name>
 *
 * - Used for: Skill Notetags
 * - When an enemy (NOT ACTOR) uses this skill, the game will appear as if the
 *   enemy is using the Brave Command to load up multiple actions at a time.
 * - Replace 'id' with the database ID of the skill to use in the multiple
 *   action queue.
 * - Replace 'name' with the name of the skill to use in the enemy's multiple
 *   action queue.
 * 
 * ---
 * 
 * === Action Fusion-Related Notetags ===
 * 
 * For more details, please refer to the Action Fusion dedicated section listed
 * earlier in the documentation.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 *
 * <BTB Cannot Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler cannot perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
 *
 * ---
 *
 * <BTB Enable Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler is allowed to perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
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
 * Actor: Change BTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the BTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change BTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the BTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Actor: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change BTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change BTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: BTB Turn Order Visibility
 * - Determine the visibility of the BTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the BTB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings regarding Battle System BTB. These range from how Brave
 * Points (BP) appear in-game to how their costs are displayed.
 *
 * ---
 *
 * Brave Points
 * 
 *   Full Name:
 *   - What is the full name of "Brave Points" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Brave Points" in your game?
 * 
 *   Icon:
 *   - What icon do you wish to use to represent Brave Points?
 * 
 *   Cost Format:
 *   - How are Brave Point costs displayed?
 *   - %1 - Cost, %2 - BP Text, %3 - Icon
 *
 * ---
 *
 * Displayed Costs
 * 
 *   Cost Position Front?:
 *   - Put the BP Cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the BP cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the BP cost for the Guard command?
 * 
 *   Reduce Shown BP Cost:
 *   - Reduce shown BP costs by this much.
 *   - Used to match traditional games.
 * 
 *   Show Cost: 0 BP:
 *   - Show the BP cost when the cost is 0 BP?
 *   - Shown BP Cost reduction is applied.
 * 
 *   Show Cost: 1 BP:
 *   - Show the BP cost when the cost is 1 BP?
 *   - Shown BP Cost reduction is applied.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Adjust the mechanics settings for the Battle System BTB. Mechanics range
 * from how speed is handled to Brave action caps, how Brave Points are
 * managed, and Action Fusions.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Brave Action Max
 * 
 *   Default:
 *   - What is the default number of max actions a battler can have from the
 *     Brave system?
 * 
 *   Hard Cap:
 *   - What is the absolute highest for maximum actions a battler can have
 *     from the Brave system?
 *
 * ---
 *
 * Brave Points > Limits
 * 
 *   Default Maximum:
 *   - What is the default maximum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Default Minimum:
 *   - What is the default minimum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Hard Cap Maximum:
 *   - What is the absolute maximum number of Brave Points a battler can have
 *     at a time?
 * 
 *   Hard Cap Minimum:
 *   - What is the absolute minimum number of Brave Points a battler can have
 *     at a time?
 *
 * ---
 *
 * Brave Points > Costs
 * 
 *   Default Skill Cost:
 *   - How many Brave Points does a skill cost by default?
 * 
 *   Default Item Cost:
 *   - How many Brave Points does an item cost by default?
 * 
 *   Predicted Cost:
 *   - What is considered predicted cost?
 *
 * ---
 *
 * Brave Points > Start Battle
 * 
 *   Neutral:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     neutral?
 * 
 *   Favored:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     favored?
 *
 * ---
 *
 * Brave Points > Regeneration
 * 
 *   Base Recovery:
 *   - How many Brave Points are regenerated at the end of each turn?
 * 
 *   Needs to be Alive?:
 *   - Do battlers need to be alive to regenerate Brave Points?
 *
 * ---
 *
 * Action Fusions
 * 
 *   Actor Access?:
 *   - Allow actors access to Action Fusions?
 * 
 *   Enemy Access?:
 *   - Allow enemies access to Action Fusions?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Brave Animations Settings
 * ============================================================================
 *
 * Animation when applying/canceling Brave effects.
 *
 * ---
 *
 * On Brave
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Cancel Brave
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Enemy Brave
 * 
 *   Show Activation?:
 *   - Show the enemy activating Brave?
 * 
 *   Wait Frames:
 *   - This is the number of frames to wait between activations.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System BTB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Center Horizontal?:
 *   - Reposition the Turn Order Display to always be centered if it is a
 *     'top' or 'bottom' position?
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Max Horizontal:
 *   - Maximum slots you want to display for top and bottom Turn Order Display
 *     positions?
 * 
 *   Max Vertical:
 *   - Maximum slots you want to display for left and right Turn Order Display
 *     positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Slot Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings Settings
 * ============================================================================
 *
 * Settings regarding the windows of the Battle System BTB. These mostly adjust
 * how certain aspects of the Brave Turn Battle system appear in-game.
 *
 * ---
 *
 * Window_ActorCommand
 * 
 *   Command Text:
 *   - What is the text that appears for the Brave command?
 * 
 *   Show Command?:
 *   - Show the Brave command in the Actor Command Window?
 * 
 *   Page Up/Dn Shortcuts?:
 *   - Use Page Up/Down for shortcuts on activating Brave?
 * 
 *   JS: Draw Counters:
 *   - Code used to determine how the action counters are displayed on
 *     the window.
 * 
 *     Action Slot:
 *     - This is the text used to represent a non-selected action slot.
 * 
 *     Current Action:
 *     - This is the text used to represent the current action slot.
 *
 * ---
 *
 * Window_BattleStatus
 * 
 *   Display Format:
 *   - How are actor Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon
 * 
 *   Predict Format:
 *   - How are predicted Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 *
 * ---
 *
 * Window_BattleStatus > Text Colors
 * 
 *   Neutral Color:
 *   - Text code color for neutral number values.
 * 
 *   Positive Color:
 *   - Text code color for positive number values.
 * 
 *   Negative Color:
 *   - Text code color for negative number values.
 *
 * ---
 *
 * Window_BattleStatus > Style Settings > Default Style
 *
 * Window_BattleStatus > Style Settings > List Style
 *
 * Window_BattleStatus > Style Settings > XP Style
 *
 * Window_BattleStatus > Style Settings > Portrait Style
 *
 * Window_BattleStatus > Style Settings > Border Style
 *
 * Window_BattleStatus > Style Settings > Alignment Style
 * 
 *   Show Display?:
 *   - Show the actor's BP values in the Battle Status Window?
 * 
 *   Alignment:
 *   - How do you want the actor BP values to be aligned?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the actor BP display X/Y by how many pixels?
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
 * Version 1.18: April 17, 2025
 * * Bug Fixes!
 * ** Fixed a bug where flex combinations did not work properly. Fix by Olivia.
 * 
 * Version 1.17: February 20, 2025
 * * Bug Fixes!
 * ** Fixed a bug where for certain battle layouts, the BTB Action Counter on
 *    the actor command window would start off center. Fix made by Olivia.
 * 
 * Version 1.16: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where strict action fusion combinations would not register.
 *    Fix made by Olivia.
 * 
 * Version 1.15: February 15, 2024
 * * Bug Fixes!
 * ** Fixed a bug where action fusions would consume double the amount of items
 *    if the skills were to cost items. Fix made by Olivia.
 * 
 * Version 1.14: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.13: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the BTB Turn Order faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.12: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused a crash due to removing actors midway in battle.
 *    Fix made by Olivia.
 * 
 * Version 1.11: July 7, 2022
 * * Compatibility Update!
 * ** Plugin is now updated to support larger than 8 troop sizes.
 * 
 * Version 1.10: June 9, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.09: March 3, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: May 21, 2021
 * * Bug Fixes!
 * ** Using items and skills outside of battle will no longer have BP
 *    restrictions imposed upon them. Fix made by Olivia.
 * 
 * Version 1.06: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_3_BoostAction plugin.
 * 
 * Version 1.05: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * 
 * Version 1.04: March 5, 2021
 * * Bug Fixes!
 * ** <BTB User Set BP: x>, <BTB User Gain BP: +x>, <BTB User Lose BP: -x>
 *    notetags should no work properly. Fix made by Arisu.
 * 
 * Version 1.03: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * 
 * Version 1.02: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Brave Point preview in the battle status will now be bound by the
 *    absolute minimum hard card and the maximum soft cap. Fixed by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Yanfly.
 * *** <BTB Enable Fusion>
 *
 * Version 1.00: January 4, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderActorIcon
 * @text Actor: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the BTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderActorFace
 * @text Actor: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the BTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderClearActorGraphic
 * @text Actor: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderEnemyIcon
 * @text Enemy: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderEnemyFace
 * @text Enemy: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: BTB Turn Order Visibility
 * @desc Determine the visibility of the BTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the BTB Turn Order Display.
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
 * @param BattleSystemBTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings regarding Battle System BTB.
 * @default {"BravePoints":"","BravePointsFull:str":"Brave Points","BravePointsAbbr:str":"BP","BravePointsIcon:num":"73","BravePointCostFmt:str":"\\FS[22]\\C[4]%1\\C[6]%2\\C[0]","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","ReduceShownBPCost:num":"0","Show_0_BP_Cost:eval":"true","Show_1_BP_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Adjust the mechanics settings for the Battle System BTB.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","ActionMax":"","MaxActionsDefault:num":"4","MaxActionsHardCap:num":"9","BravePoints":"","BravePointsLimits":"","MaxBravePointsDefault:num":"3","MinBravePointsDefault:num":"-4","MaxBravePointsHardCap:num":"9","MinBravePointsHardCap:num":"-9","BravePointsCosts":"","BravePointSkillCost:num":"1","BravePointItemCost:num":"1","BravePointPredictedCost:num":"1","BravePointsStartBattle":"","BravePointStartNeutral:num":"0","BravePointStartFavor:num":"3","BravePointsRegen":"","BravePointRegenBase:num":"1","BravePointsRegenAlive:eval":"true","ActionFusions":"","ActorActionFusions:eval":"true","EnemyActionFusions:eval":"true"}
 *
 * @param BraveAnimation:struct
 * @text Brave Animations
 * @type struct<BraveAnimation>
 * @desc Animation when applying/canceling Brave effects.
 * @default {"OnBrave":"","BraveAnimationID:num":"12","BraveMirror:eval":"false","BraveMute:eval":"false","CancelBrave":"","CancelAnimationID:num":"62","CancelMirror:eval":"false","CancelMute:eval":"false"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System BTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","CenterHorz:eval":"true","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","MaxHorzSprites:num":"16","MaxVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Settings regarding the windows of the Battle System BTB.
 * @default {"Window_ActorCommand":"","CommandName:str":"Brave","ShowCommand:eval":"true","BraveShortcuts:eval":"true","DrawActionCountersJS:func":"\"// Declare Constants\\nconst sprite = arguments[0];\\nconst parentWindow = arguments[1];\\nconst actor = arguments[2];\\n\\n// Set Location\\nsprite.x = Math.round(parentWindow.width / 2);\\nsprite.y = 0;\\nsprite.anchor.x = 0.5\\nsprite.anchor.y = 0.5\\n\\n// Create Text\\nconst textSlot = TextManager.btbActionSlot;\\nconst textCurrent = TextManager.btbActionCurrent;\\nlet text = textSlot.repeat(actor.numActions());\\nconst index = actor._actionInputIndex;\\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\\n\\n// Create and Draw Bitmap\\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\\nbitmap.fontSize = 36;\\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\\nsprite.bitmap = bitmap;\"","ActionSlot:str":"○","ActionCurrent:str":"◉","Window_BattleStatus":"","StatusDisplayFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1","StatusPredictFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1\\FS[16] → \\FS[22]%4","TextColors":"","NeutralColor:num":"0","PositiveColor:num":"4","NegativeColor:num":"2","Styles":"","DefaultStyle":"","default_display:eval":"true","default_align:str":"right","default_offsetX:num":"16","default_offsetY:num":"0","ListStyle":"","list_display:eval":"true","list_align:str":"left","list_offsetX:num":"-8","list_offsetY:num":"0","XPStyle":"","xp_display:eval":"true","xp_align:str":"right","xp_offsetX:num":"16","xp_offsetY:num":"0","PortraitStyle":"","portrait_display:eval":"true","portrait_align:str":"right","portrait_offsetX:num":"-8","portrait_offsetY:num":"56","BorderStyle":"","border_display:eval":"true","border_align:str":"right","border_offsetX:num":"16","border_offsetY:num":"0"}
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
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsFull:str
 * @text Full Name
 * @parent BravePoints
 * @desc What is the full name of "Brave Points" in your game?
 * @default Brave Points
 *
 * @param BravePointsAbbr:str
 * @text Abbreviation
 * @parent BravePoints
 * @desc What is the abbreviation of "Brave Points" in your game?
 * @default BP
 *
 * @param BravePointsIcon:num
 * @text Icon
 * @parent BravePoints
 * @desc What icon do you wish to use to represent Brave Points?
 * @default 73
 *
 * @param BravePointCostFmt:str
 * @text Cost Format
 * @parent BravePoints
 * @desc How are Brave Point costs displayed?
 * %1 - Cost, %2 - BP Text, %3 - Icon
 * @default \FS[22]\C[4]%1\C[6]%2\C[0]
 *
 * @param DisplayedCosts
 * @text Displayed Costs
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @parent DisplayedCosts
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the BP Cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Guard command?
 * @default false
 *
 * @param ReduceShownBPCost:num
 * @text Reduce Shown BP Cost
 * @parent DisplayedCosts
 * @type number
 * @desc Reduce shown BP costs by this much.
 * Used to match traditional games.
 * @default 0
 *
 * @param Show_0_BP_Cost:eval
 * @text Show Cost: 0 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 0 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 * @param Show_1_BP_Cost:eval
 * @text Show Cost: 1 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 1 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ActionMax
 * @text Brave Action Max
 *
 * @param MaxActionsDefault:num
 * @text Default
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the default number of max actions a battler can 
 * have from the Brave system?
 * @default 4
 *
 * @param MaxActionsHardCap:num
 * @text Hard Cap
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the absolute highest for maximum actions a battler
 * can have from the Brave system?
 * @default 9
 *
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsLimits
 * @text Limits
 * @parent BravePoints
 *
 * @param MaxBravePointsDefault:num
 * @text Default Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the default maximum number of Brave Points a
 * battler can have at a time?
 * @default 3
 *
 * @param MinBravePointsDefault:num
 * @text Default Minimum
 * @parent BravePointsLimits
 * @desc What is the default minimum number of Brave Points a
 * battler can have at a time?
 * @default -4
 *
 * @param MaxBravePointsHardCap:num
 * @text Hard Cap Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the absolute maximum number of Brave Points a
 * battler can have at a time?
 * @default 9
 *
 * @param MinBravePointsHardCap:num
 * @text Hard Cap Minimum
 * @parent BravePointsLimits
 * @desc What is the absolute minimum number of Brave Points a
 * battler can have at a time?
 * @default -9
 *
 * @param BravePointsCosts
 * @text Costs
 * @parent BravePoints
 *
 * @param BravePointSkillCost:num
 * @text Default Skill Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does a skill cost by default?
 * @default 1
 *
 * @param BravePointItemCost:num
 * @text Default Item Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does an item cost by default?
 * @default 1
 *
 * @param BravePointPredictedCost:num
 * @text Predicted Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc What is considered predicted cost?
 * @default 1
 *
 * @param BravePointsStartBattle
 * @text Start Battle
 * @parent BravePoints
 *
 * @param BravePointStartNeutral:num
 * @text Neutral
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is neutral?
 * @default 0
 *
 * @param BravePointStartFavor:num
 * @text Favored
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is favored?
 * @default 3
 *
 * @param BravePointsRegen
 * @text Regeneration
 * @parent BravePoints
 *
 * @param BravePointRegenBase:num
 * @text Base Recovery
 * @parent BravePointsRegen
 * @type number
 * @min 0
 * @desc How many Brave Points are regenerated at the end
 * of each turn?
 * @default 1
 *
 * @param BravePointsRegenAlive:eval
 * @text Needs to be Alive?
 * @parent BravePointsRegen
 * @type boolean
 * @on Alive
 * @off Can Be Dead
 * @desc Do battlers need to be alive to regenerate Brave Points?
 * @default true
 *
 * @param ActionFusions
 * @text Action Fusions
 *
 * @param ActorActionFusions:eval
 * @text Actor Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow actors access to Action Fusions?
 * @default true
 *
 * @param EnemyActionFusions:eval
 * @text Enemy Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow enemies access to Action Fusions?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * BraveAnimation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BraveAnimation:
 *
 * @param OnBrave
 * @text On Brave
 *
 * @param BraveAnimationID:num
 * @text Animation ID
 * @parent OnBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 12
 *
 * @param BraveMirror:eval
 * @text Mirror Animation
 * @parent OnBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BraveMute:eval
 * @text Mute Animation
 * @parent OnBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param CancelBrave
 * @text Cancel Brave
 *
 * @param CancelAnimationID:num
 * @text Animation ID
 * @parent CancelBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 62
 *
 * @param CancelMirror:eval
 * @text Mirror Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param CancelMute:eval
 * @text Mute Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param EnemyBrave
 * @text Enemy Brave
 *
 * @param ShowEnemyBrave:eval
 * @text Show Activation?
 * @parent EnemyBrave
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy activating Brave?
 * @default true
 *
 * @param WaitFrames:num
 * @text Wait Frames
 * @parent EnemyBrave
 * @type number
 * @desc This is the number of frames to wait between activations.
 * @default 20
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param CenterHorz:eval
 * @text Center Horizontal?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Center
 * @off Stay
 * @desc Reposition the Turn Order Display to always be centered
 * if it is a 'top' or 'bottom' position?
 * @default true
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 96
 * 
 * @param Slots
 *
 * @param MaxHorzSprites:num
 * @text Max Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param MaxVertSprites:num
 * @text Max Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param Window_ActorCommand
 *
 * @param CommandName:str
 * @text Command Text
 * @parent Window_ActorCommand
 * @desc What is the text that appears for the Brave command?
 * @default Brave
 *
 * @param ShowCommand:eval
 * @text Show Command?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Brave command in the Actor Command Window?
 * @default true
 *
 * @param BraveShortcuts:eval
 * @text Page Up/Dn Shortcuts?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Use Shortcuts
 * @off Don't Use
 * @desc Use Page Up/Down for shortcuts on activating Brave?
 * @default true
 *
 * @param DrawActionCountersJS:func
 * @text JS: Draw Counters
 * @parent Window_ActorCommand
 * @type note
 * @desc Code used to determine how the action counters are
 * displayed on the window.
 * @default "// Declare Constants\nconst sprite = arguments[0];\nconst parentWindow = arguments[1];\nconst actor = arguments[2];\n\n// Set Location\nsprite.x = Math.round(parentWindow.width / 2);\nsprite.y = 0;\nsprite.anchor.x = 0.5\nsprite.anchor.y = 0.5\n\n// Create Text\nconst textSlot = TextManager.btbActionSlot;\nconst textCurrent = TextManager.btbActionCurrent;\nlet text = textSlot.repeat(actor.numActions());\nconst index = actor._actionInputIndex;\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\n\n// Create and Draw Bitmap\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\nbitmap.fontSize = 36;\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\nsprite.bitmap = bitmap;"
 *
 * @param ActionSlot:str
 * @text Action Slot
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent a non-selected action slot.
 * @default ○
 *
 * @param ActionCurrent:str
 * @text Current Action
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent the current action slot.
 * @default ◉
 *
 * @param Window_BattleStatus
 *
 * @param StatusDisplayFmt:str
 * @text Display Format
 * @parent Window_BattleStatus
 * @desc How are actor Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1
 *
 * @param StatusPredictFmt:str
 * @text Predict Format
 * @parent Window_BattleStatus
 * @desc How are predicted Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1\FS[16] → \FS[22]%4
 *
 * @param TextColors
 * @text Text Colors
 * @parent Window_BattleStatus
 *
 * @param NeutralColor:num
 * @text Neutral Color
 * @parent TextColors
 * @desc Text code color for neutral number values.
 * @default 0
 *
 * @param PositiveColor:num
 * @text Positive Color
 * @parent TextColors
 * @desc Text code color for positive number values.
 * @default 4
 *
 * @param NegativeColor:num
 * @text Negative Color
 * @parent TextColors
 * @desc Text code color for negative number values.
 * @default 2
 *
 * @param Styles
 * @text Style Settings
 * @parent Window_BattleStatus
 *
 * @param DefaultStyle
 * @text Default Style
 * @parent Styles
 *
 * @param default_display:eval
 * @text Show Display?
 * @parent DefaultStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param default_align:str
 * @text Alignment
 * @parent DefaultStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param default_offsetX:num
 * @text Offset X
 * @parent DefaultStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param default_offsetY:num
 * @text Offset Y
 * @parent DefaultStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param ListStyle
 * @text List Style
 * @parent Styles
 *
 * @param list_display:eval
 * @text Show Display?
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param list_align:str
 * @text Alignment
 * @parent ListStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default left
 *
 * @param list_offsetX:num
 * @text Offset X
 * @parent ListStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param list_offsetY:num
 * @text Offset Y
 * @parent ListStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param XPStyle
 * @text XP Style
 * @parent Styles
 *
 * @param xp_display:eval
 * @text Show Display?
 * @parent XPStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param xp_align:str
 * @text Alignment
 * @parent XPStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param xp_offsetX:num
 * @text Offset X
 * @parent XPStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param xp_offsetY:num
 * @text Offset Y
 * @parent XPStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param PortraitStyle
 * @text Portrait Style
 * @parent Styles
 *
 * @param portrait_display:eval
 * @text Show Display?
 * @parent PortraitStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param portrait_align:str
 * @text Alignment
 * @parent PortraitStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param portrait_offsetX:num
 * @text Offset X
 * @parent PortraitStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param portrait_offsetY:num
 * @text Offset Y
 * @parent PortraitStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 56
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Styles
 *
 * @param border_display:eval
 * @text Show Display?
 * @parent BorderStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param border_align:str
 * @text Alignment
 * @parent BorderStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param border_offsetX:num
 * @text Offset X
 * @parent BorderStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param border_offsetY:num
 * @text Offset Y
 * @parent BorderStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 */
//=============================================================================

const _0x21afca=_0x5b28;(function(_0x30eb5a,_0x37fb70){const _0x266783=_0x5b28,_0x1cda5b=_0x30eb5a();while(!![]){try{const _0xe171b0=parseInt(_0x266783(0xfa))/0x1*(parseInt(_0x266783(0x162))/0x2)+-parseInt(_0x266783(0x172))/0x3*(-parseInt(_0x266783(0x13e))/0x4)+-parseInt(_0x266783(0x14c))/0x5*(-parseInt(_0x266783(0xa0))/0x6)+parseInt(_0x266783(0x9e))/0x7+-parseInt(_0x266783(0x116))/0x8+parseInt(_0x266783(0xa6))/0x9*(-parseInt(_0x266783(0x229))/0xa)+-parseInt(_0x266783(0x23b))/0xb*(-parseInt(_0x266783(0x247))/0xc);if(_0xe171b0===_0x37fb70)break;else _0x1cda5b['push'](_0x1cda5b['shift']());}catch(_0x144194){_0x1cda5b['push'](_0x1cda5b['shift']());}}}(_0x2e26,0x53432));var label='BattleSystemBTB',tier=tier||0x0,dependencies=[_0x21afca(0x92),_0x21afca(0x22f),'VisuMZ_1_ItemsEquipsCore','VisuMZ_1_SkillsStatesCore'],pluginData=$plugins[_0x21afca(0x157)](function(_0x50cff7){const _0x58c5e1=_0x21afca;return _0x50cff7[_0x58c5e1(0x82)]&&_0x50cff7[_0x58c5e1(0x2a9)][_0x58c5e1(0x169)]('['+label+']');})[0x0];VisuMZ[label][_0x21afca(0x23a)]=VisuMZ[label][_0x21afca(0x23a)]||{},VisuMZ[_0x21afca(0x292)]=function(_0xe2cd42,_0x509fbe){const _0x687844=_0x21afca;for(const _0x35d244 in _0x509fbe){if(_0x35d244[_0x687844(0x2b7)](/(.*):(.*)/i)){const _0x42faa3=String(RegExp['$1']),_0x3ed9bd=String(RegExp['$2'])[_0x687844(0x1d8)]()[_0x687844(0x151)]();let _0x48dc3b,_0x308861,_0x5c1eda;switch(_0x3ed9bd){case'NUM':_0x48dc3b=_0x509fbe[_0x35d244]!==''?Number(_0x509fbe[_0x35d244]):0x0;break;case'ARRAYNUM':_0x308861=_0x509fbe[_0x35d244]!==''?JSON['parse'](_0x509fbe[_0x35d244]):[],_0x48dc3b=_0x308861[_0x687844(0xb4)](_0xdf348f=>Number(_0xdf348f));break;case _0x687844(0x28a):_0x48dc3b=_0x509fbe[_0x35d244]!==''?eval(_0x509fbe[_0x35d244]):null;break;case'ARRAYEVAL':_0x308861=_0x509fbe[_0x35d244]!==''?JSON[_0x687844(0x1a2)](_0x509fbe[_0x35d244]):[],_0x48dc3b=_0x308861[_0x687844(0xb4)](_0x4e6787=>eval(_0x4e6787));break;case _0x687844(0xaa):_0x48dc3b=_0x509fbe[_0x35d244]!==''?JSON[_0x687844(0x1a2)](_0x509fbe[_0x35d244]):'';break;case'ARRAYJSON':_0x308861=_0x509fbe[_0x35d244]!==''?JSON[_0x687844(0x1a2)](_0x509fbe[_0x35d244]):[],_0x48dc3b=_0x308861[_0x687844(0xb4)](_0x52de87=>JSON[_0x687844(0x1a2)](_0x52de87));break;case _0x687844(0x27a):_0x48dc3b=_0x509fbe[_0x35d244]!==''?new Function(JSON[_0x687844(0x1a2)](_0x509fbe[_0x35d244])):new Function(_0x687844(0x1ec));break;case _0x687844(0x264):_0x308861=_0x509fbe[_0x35d244]!==''?JSON[_0x687844(0x1a2)](_0x509fbe[_0x35d244]):[],_0x48dc3b=_0x308861[_0x687844(0xb4)](_0x518d50=>new Function(JSON[_0x687844(0x1a2)](_0x518d50)));break;case _0x687844(0xb8):_0x48dc3b=_0x509fbe[_0x35d244]!==''?String(_0x509fbe[_0x35d244]):'';break;case'ARRAYSTR':_0x308861=_0x509fbe[_0x35d244]!==''?JSON[_0x687844(0x1a2)](_0x509fbe[_0x35d244]):[],_0x48dc3b=_0x308861['map'](_0xfcb47e=>String(_0xfcb47e));break;case _0x687844(0x25f):_0x5c1eda=_0x509fbe[_0x35d244]!==''?JSON[_0x687844(0x1a2)](_0x509fbe[_0x35d244]):{},_0x48dc3b=VisuMZ[_0x687844(0x292)]({},_0x5c1eda);break;case _0x687844(0x250):_0x308861=_0x509fbe[_0x35d244]!==''?JSON[_0x687844(0x1a2)](_0x509fbe[_0x35d244]):[],_0x48dc3b=_0x308861['map'](_0xe1508f=>VisuMZ[_0x687844(0x292)]({},JSON[_0x687844(0x1a2)](_0xe1508f)));break;default:continue;}_0xe2cd42[_0x42faa3]=_0x48dc3b;}}return _0xe2cd42;},(_0x37b71f=>{const _0x496430=_0x21afca,_0x5aef6d=_0x37b71f[_0x496430(0x2b3)];for(const _0x98d8dd of dependencies){if(!Imported[_0x98d8dd]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x5aef6d,_0x98d8dd)),SceneManager[_0x496430(0x2c7)]();break;}}const _0x11cfed=_0x37b71f[_0x496430(0x2a9)];if(_0x11cfed['match'](/\[Version[ ](.*?)\]/i)){const _0x10e6f5=Number(RegExp['$1']);_0x10e6f5!==VisuMZ[label][_0x496430(0x260)]&&(alert(_0x496430(0x215)[_0x496430(0x101)](_0x5aef6d,_0x10e6f5)),SceneManager[_0x496430(0x2c7)]());}if(_0x11cfed[_0x496430(0x2b7)](/\[Tier[ ](\d+)\]/i)){const _0x1ae203=Number(RegExp['$1']);_0x1ae203<tier?(alert(_0x496430(0x165)[_0x496430(0x101)](_0x5aef6d,_0x1ae203,tier)),SceneManager[_0x496430(0x2c7)]()):tier=Math[_0x496430(0x117)](_0x1ae203,tier);}VisuMZ[_0x496430(0x292)](VisuMZ[label][_0x496430(0x23a)],_0x37b71f['parameters']);})(pluginData),PluginManager[_0x21afca(0x202)](pluginData[_0x21afca(0x2b3)],'BtbTurnOrderActorIcon',_0x4bfa95=>{const _0x434ef5=_0x21afca;VisuMZ[_0x434ef5(0x292)](_0x4bfa95,_0x4bfa95);const _0x1a0dc5=_0x4bfa95[_0x434ef5(0xdc)],_0x293442=_0x4bfa95['IconIndex'];for(const _0x314bcb of _0x1a0dc5){const _0x538fb9=$gameActors[_0x434ef5(0x18f)](_0x314bcb);if(!_0x538fb9)continue;_0x538fb9[_0x434ef5(0x1d4)]=_0x434ef5(0x1bb),_0x538fb9[_0x434ef5(0x142)]=_0x293442;}}),PluginManager[_0x21afca(0x202)](pluginData['name'],_0x21afca(0x269),_0x3ed84f=>{const _0x23bcf1=_0x21afca;VisuMZ[_0x23bcf1(0x292)](_0x3ed84f,_0x3ed84f);const _0x2d6422=_0x3ed84f[_0x23bcf1(0xdc)],_0x458571=_0x3ed84f[_0x23bcf1(0xce)],_0xb3f530=_0x3ed84f[_0x23bcf1(0x195)];for(const _0x4e4e02 of _0x2d6422){const _0x49ce76=$gameActors[_0x23bcf1(0x18f)](_0x4e4e02);if(!_0x49ce76)continue;_0x49ce76[_0x23bcf1(0x1d4)]=_0x23bcf1(0x243),_0x49ce76[_0x23bcf1(0xc5)]=_0x458571,_0x49ce76[_0x23bcf1(0x219)]=_0xb3f530;}}),PluginManager['registerCommand'](pluginData[_0x21afca(0x2b3)],_0x21afca(0x17c),_0xa701d8=>{const _0xeefe2=_0x21afca;VisuMZ['ConvertParams'](_0xa701d8,_0xa701d8);const _0x52ad67=_0xa701d8[_0xeefe2(0xdc)];for(const _0x447d82 of _0x52ad67){const _0x326419=$gameActors[_0xeefe2(0x18f)](_0x447d82);if(!_0x326419)continue;_0x326419[_0xeefe2(0x1e1)]();}}),PluginManager[_0x21afca(0x202)](pluginData['name'],'BtbTurnOrderEnemyIcon',_0x3a4508=>{const _0x37a88a=_0x21afca;VisuMZ['ConvertParams'](_0x3a4508,_0x3a4508);const _0x37f89e=_0x3a4508[_0x37a88a(0x1f8)],_0x2add45=_0x3a4508[_0x37a88a(0x86)];for(const _0x2ebf97 of _0x37f89e){const _0x5e0186=$gameTroop['members']()[_0x2ebf97];if(!_0x5e0186)continue;_0x5e0186[_0x37a88a(0x1d4)]='icon',_0x5e0186['_btbTurnOrderIconIndex']=_0x2add45;}}),PluginManager[_0x21afca(0x202)](pluginData['name'],_0x21afca(0x22a),_0x32b1c8=>{const _0x35056a=_0x21afca;VisuMZ[_0x35056a(0x292)](_0x32b1c8,_0x32b1c8);const _0x27f6f9=_0x32b1c8[_0x35056a(0x1f8)],_0x27100e=_0x32b1c8[_0x35056a(0xce)],_0x1fd502=_0x32b1c8[_0x35056a(0x195)];for(const _0x3a713a of _0x27f6f9){const _0x4f0b70=$gameTroop[_0x35056a(0x13b)]()[_0x3a713a];if(!_0x4f0b70)continue;_0x4f0b70[_0x35056a(0x1d4)]=_0x35056a(0x243),_0x4f0b70[_0x35056a(0xc5)]=_0x27100e,_0x4f0b70['_btbTurnOrderFaceIndex']=_0x1fd502;}}),PluginManager[_0x21afca(0x202)](pluginData[_0x21afca(0x2b3)],'BtbTurnOrderClearEnemyGraphic',_0x291980=>{const _0x21117f=_0x21afca;VisuMZ['ConvertParams'](_0x291980,_0x291980);const _0x4cd77a=_0x291980['Enemies'];for(const _0x25ef90 of _0x4cd77a){const _0x17a01f=$gameTroop[_0x21117f(0x13b)]()[_0x25ef90];if(!_0x17a01f)continue;_0x17a01f[_0x21117f(0x1e1)]();}}),PluginManager[_0x21afca(0x202)](pluginData[_0x21afca(0x2b3)],'SystemTurnOrderVisibility',_0x130873=>{const _0x4160f3=_0x21afca;VisuMZ['ConvertParams'](_0x130873,_0x130873);const _0x134116=_0x130873['Visible'];$gameSystem[_0x4160f3(0x9c)](_0x134116);}),VisuMZ[_0x21afca(0x1fb)]['RegExp']={'EnemyMultiAction':/<BTB (?:MULTI|MULTIPLE) (?:ACTION|ACTIONS):[ ](.*)>/i,'BravePointCost':/<BTB (?:BRAVE|BP) COST:[ ](\d+)>/i,'BravePointSetUser':/<BTB USER SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointSetTarget':/<BTB TARGET SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointAlterUser':/<BTB USER (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointAlterTarget':/<BTB TARGET (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'HideBravePointCost':/<BTB HIDE (?:BRAVE|BP) COST>/i,'BTB_Help':/<BTB HELP>\s*([\s\S]*)\s*<\/BTB HELP>/i,'FusionFlex':/<BTB (?:FLEX|FLEXIBLE) FUSION:[ ](.*)>/gi,'FusionStrict':/<BTB (?:STRICT|EXACT) FUSION:[ ](.*)>/gi,'JsBravePointsUser':/<JS BTB USER (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB USER (?:BRAVE|BP)>/i,'JsBravePointsTarget':/<JS BTB TARGET (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB TARGET (?:BRAVE|BP)>/i,'BravePointBattleStart':/<BTB INITIAL (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointRegen':/<BTB (?:BRAVE|BP) (?:REGEN|DEGEN):[ ]([\+\-]\d+)>/i,'MaxBravePoints':/<BTB (?:MAXIMUM|MAX) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MinBravePoints':/<BTB (?:MINIMUM|MIN) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MaxActions':/<BTB (?:MAXIMUM|MAX) (?:ACTION|ACTIONS):[ ]([\+\-]\d+)>/i,'CannotBrave':/<BTB CANNOT BRAVE>/i,'HideBrave':/<BTB HIDE BRAVE>/i,'CannotFusion':/<BTB CANNOT FUSION>/i,'EnableFusion':/<BTB ENABLE FUSION>/i},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x285)]=Scene_Boot[_0x21afca(0x1db)][_0x21afca(0x23c)],Scene_Boot[_0x21afca(0x1db)][_0x21afca(0x23c)]=function(){const _0x2bc074=_0x21afca;VisuMZ[_0x2bc074(0x1fb)][_0x2bc074(0x285)][_0x2bc074(0x1e4)](this),this[_0x2bc074(0x1b5)]();},Scene_Boot['prototype'][_0x21afca(0x1b5)]=function(){const _0x504e3a=_0x21afca;this[_0x504e3a(0x289)](),this[_0x504e3a(0xcc)]();},Scene_Boot[_0x21afca(0x1db)][_0x21afca(0x289)]=function(){const _0x294d9d=_0x21afca;if(VisuMZ['ParseAllNotetags'])return;const _0x1e89f1=$dataSkills['concat']($dataItems);for(const _0x1c857d of _0x1e89f1){if(!_0x1c857d)continue;DataManager[_0x294d9d(0x130)](_0x1c857d);}},VisuMZ[_0x21afca(0x1fb)]['JS']={},Scene_Boot['prototype'][_0x21afca(0xcc)]=function(){const _0x346cff=_0x21afca;if(VisuMZ[_0x346cff(0x24d)])return;const _0x50d1f5=VisuMZ[_0x346cff(0x1fb)][_0x346cff(0x2af)],_0x57d741=$dataSkills[_0x346cff(0x220)](dataItems);for(const _0x2499b3 of _0x57d741){if(!_0x2499b3)continue;VisuMZ[_0x346cff(0x1fb)][_0x346cff(0x141)](_0x2499b3,_0x346cff(0x18d)),VisuMZ['BattleSystemBTB']['Parse_Notetags_BravePointsUserJS'](_0x2499b3,_0x346cff(0xec));}},VisuMZ['BattleSystemBTB']['Parse_Notetags_BravePointsUserJS']=function(_0x333958,_0x2279cc){const _0x1dbeba=_0x21afca,_0x2fc4c1=VisuMZ[_0x1dbeba(0x1fb)]['RegExp'][_0x2279cc],_0x27d42a=_0x333958[_0x1dbeba(0x173)];if(_0x27d42a[_0x1dbeba(0x2b7)](_0x2fc4c1)){const _0x39d7b1=String(RegExp['$1']),_0x376e90=_0x1dbeba(0x1f2)['format'](_0x39d7b1),_0x4199ab=VisuMZ[_0x1dbeba(0x1fb)][_0x1dbeba(0x1e3)](_0x333958,_0x2279cc);VisuMZ[_0x1dbeba(0x1fb)]['JS'][_0x4199ab]=new Function(_0x376e90);}},VisuMZ['BattleSystemBTB'][_0x21afca(0x1e3)]=function(_0x5ce0e3,_0x41c38a){const _0xfa8b69=_0x21afca;if(VisuMZ['createKeyJS'])return VisuMZ[_0xfa8b69(0x1e3)](_0x5ce0e3,_0x41c38a);let _0x3cd280='';if($dataActors[_0xfa8b69(0x169)](_0x5ce0e3))_0x3cd280=_0xfa8b69(0x109)['format'](_0x5ce0e3['id'],_0x41c38a);if($dataClasses[_0xfa8b69(0x169)](_0x5ce0e3))_0x3cd280=_0xfa8b69(0x1ac)['format'](_0x5ce0e3['id'],_0x41c38a);if($dataSkills[_0xfa8b69(0x169)](_0x5ce0e3))_0x3cd280=_0xfa8b69(0xf8)[_0xfa8b69(0x101)](_0x5ce0e3['id'],_0x41c38a);if($dataItems[_0xfa8b69(0x169)](_0x5ce0e3))_0x3cd280=_0xfa8b69(0x15b)[_0xfa8b69(0x101)](_0x5ce0e3['id'],_0x41c38a);if($dataWeapons[_0xfa8b69(0x169)](_0x5ce0e3))_0x3cd280='Weapon-%1-%2'[_0xfa8b69(0x101)](_0x5ce0e3['id'],_0x41c38a);if($dataArmors[_0xfa8b69(0x169)](_0x5ce0e3))_0x3cd280='Armor-%1-%2'['format'](_0x5ce0e3['id'],_0x41c38a);if($dataEnemies['includes'](_0x5ce0e3))_0x3cd280=_0xfa8b69(0x2b5)[_0xfa8b69(0x101)](_0x5ce0e3['id'],_0x41c38a);if($dataStates['includes'](_0x5ce0e3))_0x3cd280='State-%1-%2'[_0xfa8b69(0x101)](_0x5ce0e3['id'],_0x41c38a);return _0x3cd280;},VisuMZ['BattleSystemBTB'][_0x21afca(0xd2)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x21afca(0xd2)]=function(_0x1ca89c){const _0x426a7b=_0x21afca;VisuMZ[_0x426a7b(0x1fb)][_0x426a7b(0xd2)]['call'](this,_0x1ca89c),DataManager[_0x426a7b(0x130)](_0x1ca89c),VisuMZ[_0x426a7b(0x1fb)][_0x426a7b(0x141)](_0x1ca89c,_0x426a7b(0x18d)),VisuMZ[_0x426a7b(0x1fb)]['Parse_Notetags_BravePointsUserJS'](_0x1ca89c,'JsBravePointsTarget');},VisuMZ['BattleSystemBTB']['ParseItemNotetags']=VisuMZ['ParseItemNotetags'],VisuMZ['ParseItemNotetags']=function(_0x3e2c1b){const _0x366369=_0x21afca;VisuMZ[_0x366369(0x1fb)]['ParseItemNotetags']['call'](this,_0x3e2c1b),DataManager['btbRegisterFusions'](_0x3e2c1b),VisuMZ[_0x366369(0x1fb)][_0x366369(0x141)](_0x3e2c1b,_0x366369(0x18d)),VisuMZ['BattleSystemBTB'][_0x366369(0x141)](_0x3e2c1b,_0x366369(0xec));},DataManager[_0x21afca(0x14d)]=function(_0x568d79){const _0x263fd1=_0x21afca;_0x568d79=_0x568d79[_0x263fd1(0x1d8)]()[_0x263fd1(0x151)](),this[_0x263fd1(0x100)]=this[_0x263fd1(0x100)]||{};if(this[_0x263fd1(0x100)][_0x568d79])return this[_0x263fd1(0x100)][_0x568d79];for(const _0x39f389 of $dataSkills){if(!_0x39f389)continue;this[_0x263fd1(0x100)][_0x39f389[_0x263fd1(0x2b3)][_0x263fd1(0x1d8)]()[_0x263fd1(0x151)]()]=_0x39f389['id'];}return this[_0x263fd1(0x100)][_0x568d79]||0x0;},DataManager[_0x21afca(0x26e)]=function(_0x16ed64){const _0x787a8f=_0x21afca;_0x16ed64=_0x16ed64[_0x787a8f(0x1d8)]()['trim'](),this[_0x787a8f(0x1cc)]=this['_itemIDs']||{};if(this[_0x787a8f(0x1cc)][_0x16ed64])return this[_0x787a8f(0x1cc)][_0x16ed64];for(const _0x14358a of $dataItems){if(!_0x14358a)continue;this[_0x787a8f(0x1cc)][_0x14358a[_0x787a8f(0x2b3)][_0x787a8f(0x1d8)]()[_0x787a8f(0x151)]()]=_0x14358a['id'];}return this[_0x787a8f(0x1cc)][_0x16ed64]||0x0;},DataManager[_0x21afca(0x216)]={},DataManager[_0x21afca(0x231)]={},DataManager[_0x21afca(0xcd)]={},DataManager[_0x21afca(0x1d2)]={},DataManager[_0x21afca(0x130)]=function(_0x591bf2){const _0x5c4cd5=_0x21afca;if(!_0x591bf2)return;const _0x3d739d=VisuMZ['BattleSystemBTB']['RegExp'],_0x47a017=_0x591bf2[_0x5c4cd5(0x173)],_0x4f160c=DataManager[_0x5c4cd5(0x1c4)](_0x591bf2),_0x281374=_0x47a017[_0x5c4cd5(0x2b7)](_0x3d739d['FusionFlex']);if(_0x281374)for(const _0x25b4cb of _0x281374){if(!_0x25b4cb)continue;_0x25b4cb[_0x5c4cd5(0x2b7)](_0x3d739d[_0x5c4cd5(0x1fd)]);const _0x2154d3=String(RegExp['$1'])[_0x5c4cd5(0x297)](','),_0x515c15=this[_0x5c4cd5(0x2b6)](_0x2154d3,_0x4f160c)[_0x5c4cd5(0xad)]((_0x22c266,_0x45e781)=>_0x22c266-_0x45e781);if(_0x515c15[_0x5c4cd5(0x150)]<=0x1)continue;const _0x24e52a=_0x515c15['join']('-'),_0x294f3f=_0x4f160c?DataManager[_0x5c4cd5(0x216)]:DataManager[_0x5c4cd5(0xcd)];_0x294f3f[_0x24e52a]=_0x591bf2['id'];}const _0x499613=_0x47a017[_0x5c4cd5(0x2b7)](_0x3d739d[_0x5c4cd5(0xd9)]);if(_0x499613)for(const _0x458bff of _0x499613){if(!_0x458bff)continue;_0x458bff[_0x5c4cd5(0x2b7)](_0x3d739d[_0x5c4cd5(0xd9)]);const _0x4fbb65=String(RegExp['$1'])[_0x5c4cd5(0x297)](','),_0x15dd24=this[_0x5c4cd5(0x2b6)](_0x4fbb65,_0x4f160c);if(_0x15dd24[_0x5c4cd5(0x150)]<=0x1)continue;const _0x459ad3=_0x15dd24['join']('-'),_0x421d0d=_0x4f160c?DataManager[_0x5c4cd5(0x231)]:DataManager[_0x5c4cd5(0x1d2)];_0x421d0d[_0x459ad3]=_0x591bf2['id'];}},DataManager[_0x21afca(0x2b6)]=function(_0x1be86e,_0x3ec572){const _0xddedd3=_0x21afca,_0x299db4=[];for(let _0x19c5b0 of _0x1be86e){_0x19c5b0=(String(_0x19c5b0)||'')[_0xddedd3(0x151)]();const _0x3d951a=/^\d+$/[_0xddedd3(0x25c)](_0x19c5b0);if(_0x3d951a)_0x299db4[_0xddedd3(0x2bb)](Number(_0x19c5b0));else _0x3ec572?_0x299db4[_0xddedd3(0x2bb)](DataManager['getSkillIdWithName'](_0x19c5b0)):_0x299db4[_0xddedd3(0x2bb)](DataManager[_0xddedd3(0x26e)](_0x19c5b0));}return _0x299db4;},ImageManager[_0x21afca(0x2c5)]=VisuMZ['BattleSystemBTB'][_0x21afca(0x23a)][_0x21afca(0x2ac)][_0x21afca(0x154)],ImageManager[_0x21afca(0x20d)]=ImageManager['svActorHorzCells']||0x9,ImageManager['svActorVertCells']=ImageManager['svActorVertCells']||0x6,TextManager[_0x21afca(0xbd)]=VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x23a)][_0x21afca(0x2ac)][_0x21afca(0x1cb)],TextManager['btbBravePointsAbbr']=VisuMZ['BattleSystemBTB'][_0x21afca(0x23a)]['General'][_0x21afca(0xd4)],TextManager[_0x21afca(0x272)]=VisuMZ['BattleSystemBTB']['Settings'][_0x21afca(0x2ac)][_0x21afca(0x1a1)],TextManager[_0x21afca(0x1b3)]=VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x23a)][_0x21afca(0x15c)][_0x21afca(0x13a)],TextManager[_0x21afca(0x255)]=VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x23a)][_0x21afca(0x15c)][_0x21afca(0x107)],TextManager[_0x21afca(0xfc)]=VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x23a)][_0x21afca(0x15c)]['ActionCurrent'],SceneManager[_0x21afca(0x267)]=function(){const _0x3afa95=_0x21afca;return this[_0x3afa95(0x177)]&&this[_0x3afa95(0x177)]['constructor']===Scene_Battle;},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x118)]=BattleManager[_0x21afca(0x1e2)],BattleManager[_0x21afca(0x1e2)]=function(){const _0x524a94=_0x21afca;if(this[_0x524a94(0x235)]())return _0x524a94(0x2c9);return VisuMZ[_0x524a94(0x1fb)][_0x524a94(0x118)][_0x524a94(0x1e4)](this);},BattleManager[_0x21afca(0x235)]=function(){const _0x1eead6=_0x21afca;return $gameSystem[_0x1eead6(0x128)]()==='BTB';},VisuMZ[_0x21afca(0x1fb)]['BattleManager_isTpb']=BattleManager[_0x21afca(0x20b)],BattleManager[_0x21afca(0x20b)]=function(){const _0x17850a=_0x21afca;if(this[_0x17850a(0x235)]())return![];return VisuMZ[_0x17850a(0x1fb)]['BattleManager_isTpb'][_0x17850a(0x1e4)](this);},VisuMZ['BattleSystemBTB'][_0x21afca(0xe6)]=BattleManager[_0x21afca(0x8d)],BattleManager[_0x21afca(0x8d)]=function(){const _0x201290=_0x21afca;if(this[_0x201290(0x235)]())return![];return VisuMZ[_0x201290(0x1fb)][_0x201290(0xe6)][_0x201290(0x1e4)](this);},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x89)]=BattleManager[_0x21afca(0x16e)],BattleManager[_0x21afca(0x16e)]=function(){const _0xbeac18=_0x21afca;if(this[_0xbeac18(0x235)]())return!![];return VisuMZ[_0xbeac18(0x1fb)][_0xbeac18(0x89)][_0xbeac18(0x1e4)](this);},VisuMZ['BattleSystemBTB'][_0x21afca(0x168)]=BattleManager[_0x21afca(0x24e)],BattleManager['startInput']=function(){const _0x5b90ff=_0x21afca;VisuMZ['BattleSystemBTB'][_0x5b90ff(0x168)]['call'](this),this[_0x5b90ff(0x235)]()&&this['isSkipPartyCommandWindow']()&&!this['_surprise']&&$gameParty[_0x5b90ff(0x263)]()&&this[_0x5b90ff(0xc3)]();},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x2b1)]=BattleManager[_0x21afca(0x1fa)],BattleManager[_0x21afca(0x1fa)]=function(){const _0x39cde6=_0x21afca;VisuMZ[_0x39cde6(0x1fb)]['BattleManager_startTurn'][_0x39cde6(0x1e4)](this),this['refreshStatusBTB']();},BattleManager[_0x21afca(0x2a3)]=function(){const _0x2677de=_0x21afca;if(!SceneManager[_0x2677de(0x267)]())return;if(!this[_0x2677de(0x235)]())return;const _0x5b1bd1=SceneManager[_0x2677de(0x177)];if(!_0x5b1bd1)return;const _0x3d7704=_0x5b1bd1[_0x2677de(0x85)];if(!_0x3d7704)return;_0x3d7704[_0x2677de(0x167)]();},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x10a)]=BattleManager['makeActionOrders'],BattleManager[_0x21afca(0x296)]=function(){const _0x348b7e=_0x21afca;VisuMZ[_0x348b7e(0x1fb)][_0x348b7e(0x10a)][_0x348b7e(0x1e4)](this),this[_0x348b7e(0x235)]()&&(this[_0x348b7e(0xb7)]=this[_0x348b7e(0xb7)][_0x348b7e(0x157)](_0x29ecbc=>_0x29ecbc&&_0x29ecbc['_actions'][_0x348b7e(0x150)]>0x0),this[_0x348b7e(0x97)]());},BattleManager[_0x21afca(0x249)]=function(){const _0x1e3b09=_0x21afca;if(!this['isBTB']())return;if(!SceneManager[_0x1e3b09(0x267)]())return;const _0x5d4187=this['_actionBattlers'];for(const _0x463f65 of _0x5d4187){_0x463f65[_0x1e3b09(0x281)]();}_0x5d4187['sort']((_0xe50ff9,_0x182339)=>_0x182339[_0x1e3b09(0x83)]()-_0xe50ff9[_0x1e3b09(0x83)]()),this[_0x1e3b09(0x235)]()&&this[_0x1e3b09(0x97)]();},BattleManager[_0x21afca(0x152)]=function(){const _0x58a3c0=_0x21afca;if(!this[_0x58a3c0(0x235)]())return;this[_0x58a3c0(0xb7)]=this[_0x58a3c0(0xb7)]||[],this[_0x58a3c0(0xb7)]=this['_actionBattlers'][_0x58a3c0(0x157)](_0x559215=>_0x559215&&_0x559215['isAppeared']()&&_0x559215[_0x58a3c0(0xea)]()),this[_0x58a3c0(0x97)]();},BattleManager['updateTurnOrderBTB']=function(_0xcd7f66){const _0x44611f=_0x21afca;if(!this[_0x44611f(0x235)]())return;const _0x42b812=SceneManager[_0x44611f(0x177)][_0x44611f(0x134)];if(!_0x42b812)return;_0x42b812[_0x44611f(0x2a4)](_0xcd7f66);},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0xe5)]=BattleManager['startAction'],BattleManager[_0x21afca(0x198)]=function(){const _0x4bdfaa=_0x21afca;BattleManager[_0x4bdfaa(0x235)]()&&this[_0x4bdfaa(0xf4)]&&this[_0x4bdfaa(0xf4)][_0x4bdfaa(0x1e5)](),VisuMZ['BattleSystemBTB'][_0x4bdfaa(0xe5)][_0x4bdfaa(0x1e4)](this);},VisuMZ['BattleSystemBTB'][_0x21afca(0x136)]=Game_System['prototype'][_0x21afca(0x2ad)],Game_System[_0x21afca(0x1db)][_0x21afca(0x2ad)]=function(){const _0xdf610b=_0x21afca;VisuMZ[_0xdf610b(0x1fb)][_0xdf610b(0x136)]['call'](this),this['initBattleSystemBTB']();},Game_System[_0x21afca(0x1db)][_0x21afca(0x1d3)]=function(){const _0x3f3ae9=_0x21afca;this[_0x3f3ae9(0xdd)]=!![];},Game_System['prototype'][_0x21afca(0x156)]=function(){const _0x3b2504=_0x21afca;return this[_0x3b2504(0xdd)]===undefined&&this['initBattleSystemBTB'](),this[_0x3b2504(0xdd)];},Game_System['prototype'][_0x21afca(0x9c)]=function(_0x50df84){const _0x177dfb=_0x21afca;this[_0x177dfb(0xdd)]===undefined&&this[_0x177dfb(0x1d3)](),this['_btbTurnOrderVisible']=_0x50df84;},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x133)]=Game_Action[_0x21afca(0x1db)][_0x21afca(0x1da)],Game_Action['prototype'][_0x21afca(0x1da)]=function(_0x1917e0){const _0x17f9a6=_0x21afca;VisuMZ[_0x17f9a6(0x1fb)][_0x17f9a6(0x133)][_0x17f9a6(0x1e4)](this,_0x1917e0),this['applyBattleSystemBTBUserEffect'](_0x1917e0);},Game_Action['prototype']['applyBattleSystemBTBUserEffect']=function(_0x3e3c33){const _0x5f5b83=_0x21afca;if(!BattleManager[_0x5f5b83(0x235)]())return;if(this['item']())this[_0x5f5b83(0x193)](_0x3e3c33);},Game_Action[_0x21afca(0x1db)][_0x21afca(0x193)]=function(_0x31d425){const _0x4775db=_0x21afca,_0x48abd5=VisuMZ[_0x4775db(0x1fb)]['RegExp'],_0x2cec76=this[_0x4775db(0x201)]()['note'],_0x22a0d5=this[_0x4775db(0x201)]();if(this[_0x4775db(0x24c)]()){if(_0x2cec76['match'](_0x48abd5[_0x4775db(0x28d)])){const _0x53fdba=Number(RegExp['$1']);this[_0x4775db(0x24c)]()[_0x4775db(0xe8)](_0x53fdba);}if(_0x2cec76['match'](_0x48abd5[_0x4775db(0x23e)])){const _0x5032b8=Number(RegExp['$1']);this[_0x4775db(0x24c)]()[_0x4775db(0x26f)](_0x5032b8);}const _0x507e85=_0x4775db(0x18d),_0x36a38c=VisuMZ[_0x4775db(0x1fb)][_0x4775db(0x1e3)](_0x22a0d5,_0x507e85);if(VisuMZ[_0x4775db(0x1fb)]['JS'][_0x36a38c]){const _0x282258=VisuMZ[_0x4775db(0x1fb)]['JS'][_0x36a38c][_0x4775db(0x1e4)](this,this[_0x4775db(0x24c)](),_0x31d425,this[_0x4775db(0x24c)]()[_0x4775db(0x8f)]());this[_0x4775db(0x24c)]()[_0x4775db(0xe8)](_0x282258);}}if(_0x31d425){if(_0x2cec76[_0x4775db(0x2b7)](_0x48abd5['BravePointSetTarget'])){const _0xc53509=Number(RegExp['$1']);_0x31d425[_0x4775db(0xe8)](_0xc53509);}if(_0x2cec76[_0x4775db(0x2b7)](_0x48abd5[_0x4775db(0x131)])){const _0x52b33e=Number(RegExp['$1']);_0x31d425['gainBravePoints'](_0x52b33e);}const _0x434636=_0x4775db(0xec),_0x568d8c=VisuMZ[_0x4775db(0x1fb)][_0x4775db(0x1e3)](_0x22a0d5,_0x434636);if(VisuMZ['BattleSystemBTB']['JS'][_0x568d8c]){const _0x4f7a5d=VisuMZ[_0x4775db(0x1fb)]['JS'][_0x568d8c]['call'](this,this[_0x4775db(0x24c)](),_0x31d425,_0x31d425[_0x4775db(0x8f)]());_0x31d425['setBravePoints'](_0x4f7a5d);}}},VisuMZ[_0x21afca(0x1fb)]['Game_Action_speed']=Game_Action['prototype']['speed'],Game_Action[_0x21afca(0x1db)][_0x21afca(0x83)]=function(){const _0x3b776e=_0x21afca;return BattleManager['isBTB']()?VisuMZ[_0x3b776e(0x1fb)][_0x3b776e(0x23a)][_0x3b776e(0x271)][_0x3b776e(0x153)][_0x3b776e(0x1e4)](this):VisuMZ[_0x3b776e(0x1fb)][_0x3b776e(0x163)]['call'](this);},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x2aa)]=Game_Action[_0x21afca(0x1db)][_0x21afca(0x286)],Game_Action[_0x21afca(0x1db)][_0x21afca(0x286)]=function(){const _0x2ad90a=_0x21afca;return BattleManager[_0x2ad90a(0x235)]()?VisuMZ[_0x2ad90a(0x1fb)][_0x2ad90a(0x23a)][_0x2ad90a(0x271)][_0x2ad90a(0x2bf)]:VisuMZ[_0x2ad90a(0x1fb)][_0x2ad90a(0x2aa)]['call'](this);},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0xfe)]=Game_Action['prototype'][_0x21afca(0x11f)],Game_Action[_0x21afca(0x1db)][_0x21afca(0x11f)]=function(_0x538d72){const _0x4e8a07=_0x21afca;VisuMZ[_0x4e8a07(0x1fb)]['Game_Action_setSkill'][_0x4e8a07(0x1e4)](this,_0x538d72),BattleManager[_0x4e8a07(0x249)]();},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x1d1)]=Game_Action[_0x21afca(0x1db)][_0x21afca(0x257)],Game_Action[_0x21afca(0x1db)][_0x21afca(0x257)]=function(_0x254aa2){const _0x2dc6e7=_0x21afca;VisuMZ[_0x2dc6e7(0x1fb)][_0x2dc6e7(0x1d1)][_0x2dc6e7(0x1e4)](this,_0x254aa2),BattleManager[_0x2dc6e7(0x249)]();},Game_Action[_0x21afca(0x1db)][_0x21afca(0x164)]=function(_0x69f406){this['_actionFusionRecipe']=_0x69f406;},Game_Action['prototype'][_0x21afca(0x11a)]=function(){const _0x1acabf=_0x21afca;if(this[_0x1acabf(0x261)]===undefined)return 0x0;return this[_0x1acabf(0x261)][_0x1acabf(0x297)]('-')[_0x1acabf(0x150)]-0x1;},Game_Action[_0x21afca(0x1db)][_0x21afca(0xd1)]=function(){const _0x447159=_0x21afca;if(this[_0x447159(0x261)]===undefined)return[];return this[_0x447159(0x261)][_0x447159(0x297)]('-')['map'](_0x467482=>$dataSkills[Number(_0x467482)]);},Game_Action[_0x21afca(0x1db)][_0x21afca(0x26a)]=function(){const _0x32111b=_0x21afca;if(this[_0x32111b(0x261)]===undefined)return[];return this[_0x32111b(0x261)]['split']('-')[_0x32111b(0xb4)](_0x1f3810=>$dataItems[Number(_0x1f3810)]);},Game_BattlerBase[_0x21afca(0x1db)]['bravePoints']=function(){const _0x2ab255=_0x21afca;return this[_0x2ab255(0x2cc)]||0x0;},Game_BattlerBase[_0x21afca(0x1c2)]=VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x23a)]['Mechanics'][_0x21afca(0x19f)],Game_BattlerBase[_0x21afca(0xbe)]=VisuMZ[_0x21afca(0x1fb)]['Settings'][_0x21afca(0x271)]['MaxActionsHardCap'],Game_BattlerBase['prototype'][_0x21afca(0x29c)]=function(){const _0x3ce1a1=_0x21afca;if(this[_0x3ce1a1(0x2b9)]())return 0x1;if(this['hideBraveTrait']())return 0x1;const _0x388959=VisuMZ[_0x3ce1a1(0x1fb)]['RegExp'],_0x51adb7=_0x388959[_0x3ce1a1(0x295)];let _0x5339c0=Game_BattlerBase['BTB_MAX_ACTIONS_DEFAULT'];const _0x37f91a=this['traitObjects']();for(const _0x3980b3 of _0x37f91a){if(!_0x3980b3)continue;const _0x51cb14=_0x3980b3[_0x3ce1a1(0x173)];_0x51cb14['match'](_0x51adb7)&&(_0x5339c0+=Number(RegExp['$1']));}return _0x5339c0[_0x3ce1a1(0x178)](0x1,Game_BattlerBase['BTB_MAX_ACTIONS_HARD_CAP']);},Game_BattlerBase[_0x21afca(0x2d2)]=VisuMZ[_0x21afca(0x1fb)]['Settings']['Mechanics'][_0x21afca(0x1a3)],Game_BattlerBase[_0x21afca(0x143)]=VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x23a)][_0x21afca(0x271)][_0x21afca(0xab)],Game_BattlerBase[_0x21afca(0x16d)]=VisuMZ[_0x21afca(0x1fb)]['Settings'][_0x21afca(0x271)][_0x21afca(0x199)],Game_BattlerBase[_0x21afca(0x10c)]=VisuMZ['BattleSystemBTB']['Settings'][_0x21afca(0x271)][_0x21afca(0x1f7)],Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0x182)]=function(){const _0x28e969=_0x21afca,_0x1bd5b9=VisuMZ[_0x28e969(0x1fb)]['RegExp'],_0x1ad61b=_0x1bd5b9['MaxBravePoints'];let _0x1cca6e=Game_BattlerBase[_0x28e969(0x2d2)];const _0x4f5557=this[_0x28e969(0xf6)]();for(const _0x21a0de of _0x4f5557){if(!_0x21a0de)continue;const _0x2f5d7d=_0x21a0de[_0x28e969(0x173)];_0x2f5d7d[_0x28e969(0x2b7)](_0x1ad61b)&&(_0x1cca6e+=Number(RegExp['$1']));}return Math[_0x28e969(0xd3)](_0x1cca6e,Game_BattlerBase[_0x28e969(0x16d)]);},Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0x284)]=function(){const _0xb253a=_0x21afca,_0x42e07a=VisuMZ[_0xb253a(0x1fb)][_0xb253a(0x2af)],_0x4b0474=_0x42e07a[_0xb253a(0x196)];let _0x5488c9=Game_BattlerBase[_0xb253a(0x143)];const _0x5589ba=this[_0xb253a(0xf6)]();for(const _0x39e46e of _0x5589ba){if(!_0x39e46e)continue;const _0x4a9618=_0x39e46e['note'];_0x4a9618[_0xb253a(0x2b7)](_0x4b0474)&&(_0x5488c9+=Number(RegExp['$1']));}return Math['max'](_0x5488c9,Game_BattlerBase[_0xb253a(0x10c)]);},Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0xe8)]=function(_0x1ca280){const _0x1d6e94=_0x21afca;this[_0x1d6e94(0x2cc)]=Math['min'](_0x1ca280,this[_0x1d6e94(0x182)]()),this[_0x1d6e94(0x1ed)]();},Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0x26f)]=function(_0x392629){const _0x269538=_0x21afca;_0x392629+=this[_0x269538(0x2cc)]||0x0,this[_0x269538(0xe8)](_0x392629);},Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0x12d)]=function(_0x96c216){const _0xda3f70=_0x21afca;this[_0xda3f70(0x26f)](-_0x96c216);},Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0x1ce)]=function(_0x2d6ec1){const _0x36b2d6=_0x21afca,_0x47ccfb=VisuMZ[_0x36b2d6(0x1fb)][_0x36b2d6(0x23a)][_0x36b2d6(0x271)];if(!_0x2d6ec1)return _0x47ccfb[_0x36b2d6(0x90)];if(DataManager[_0x36b2d6(0x1c4)](_0x2d6ec1)){if(_0x2d6ec1['id']===this['guardSkillId']())return 0x0;if(this[_0x36b2d6(0x22e)]()&&this[_0x36b2d6(0x22e)]()[_0x36b2d6(0x201)]()===_0x2d6ec1&&this['currentAction']()[_0x36b2d6(0x13c)])return 0x0;}const _0x5a60d1=VisuMZ[_0x36b2d6(0x1fb)]['RegExp'],_0xa10c71=_0x2d6ec1[_0x36b2d6(0x173)];if(_0xa10c71[_0x36b2d6(0x2b7)](_0x5a60d1[_0x36b2d6(0x1e7)]))return Number(RegExp['$1']);let _0x2fb4a9=0x0;if(DataManager[_0x36b2d6(0x1c4)](_0x2d6ec1))_0x2fb4a9=_0x47ccfb[_0x36b2d6(0x2a7)];else DataManager[_0x36b2d6(0x26b)](_0x2d6ec1)&&(_0x2fb4a9=_0x47ccfb[_0x36b2d6(0x27e)]);return _0x2fb4a9[_0x36b2d6(0x178)](0x0,Game_BattlerBase[_0x36b2d6(0x16d)]);},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x10b)]=Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0x218)],Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0x218)]=function(_0x571059){const _0x460f3a=_0x21afca;if(_0x571059&&SceneManager['isSceneBattle']()&&BattleManager[_0x460f3a(0x235)]()){const _0x20dd1b=this[_0x460f3a(0x1ce)](_0x571059);if(this[_0x460f3a(0x8f)]()-_0x20dd1b<this['minBravePoints']())return![];}return VisuMZ[_0x460f3a(0x1fb)]['Game_BattlerBase_canUse'][_0x460f3a(0x1e4)](this,_0x571059);},Game_BattlerBase[_0x21afca(0x1db)]['payBravePointsCost']=function(_0x3fa42f){const _0x4ed8e9=_0x21afca;if(!BattleManager[_0x4ed8e9(0x235)]())return;const _0x1c6d8d=this['bravePointsCost'](_0x3fa42f);this[_0x4ed8e9(0x12d)](_0x1c6d8d);},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x227)]=Game_Battler[_0x21afca(0x1db)][_0x21afca(0x21c)],Game_Battler[_0x21afca(0x1db)]['useItem']=function(_0x3b85c5){const _0x4d0ef4=_0x21afca;if(this['btbMatchesCurrentFusionAction'](_0x3b85c5)){this[_0x4d0ef4(0x275)](_0x3b85c5);return;}VisuMZ['BattleSystemBTB'][_0x4d0ef4(0x227)]['call'](this,_0x3b85c5),this[_0x4d0ef4(0xb6)](_0x3b85c5);},Game_Battler[_0x21afca(0x1db)][_0x21afca(0xf5)]=function(_0xadd838){const _0x5261b2=_0x21afca;if(!BattleManager[_0x5261b2(0x235)]())return![];if(!SceneManager[_0x5261b2(0x267)]())return![];if(!this[_0x5261b2(0x1eb)]())return![];if(this!==BattleManager[_0x5261b2(0xf4)])return![];if(!this[_0x5261b2(0x22e)]())return![];if(!this['currentAction']()['item']())return![];if(this[_0x5261b2(0x22e)]()[_0x5261b2(0x201)]()!==_0xadd838)return![];if(this[_0x5261b2(0x22e)]()['isSkill']())return this['currentAction']()[_0x5261b2(0xd1)]()[_0x5261b2(0x150)]>0x0;else return this[_0x5261b2(0x22e)]()[_0x5261b2(0x26b)]()?this['currentAction']()[_0x5261b2(0x26a)]()['length']>0x0:![];},Game_Battler['prototype']['useItemBTB']=function(_0x3d5aaa){const _0x5170d7=_0x21afca;if(!SceneManager['isSceneBattle']())return;DataManager[_0x5170d7(0x1c4)](_0x3d5aaa)?this[_0x5170d7(0x23f)]():this[_0x5170d7(0x1d0)]();},Game_Battler[_0x21afca(0x1db)][_0x21afca(0x23f)]=function(){const _0x4d76da=_0x21afca,_0x4d095f=this[_0x4d76da(0x22e)]()[_0x4d76da(0xd1)]();if(!_0x4d095f)return;for(const _0x17c6d0 of _0x4d095f){if(!_0x17c6d0)continue;if(!this[_0x4d76da(0x218)](_0x17c6d0))return![];VisuMZ['BattleSystemBTB']['Game_Battler_useItem'][_0x4d76da(0x1e4)](this,_0x17c6d0),this[_0x4d76da(0xb6)](_0x17c6d0);}return!![];},Game_Battler[_0x21afca(0x1db)][_0x21afca(0x1d0)]=function(){const _0x419358=_0x21afca,_0x414961=this[_0x419358(0x22e)]()['getActionFusionRecipeItems']();if(!_0x414961)return;for(const _0x486898 of _0x414961){if(!_0x486898)continue;if(!this[_0x419358(0x218)](_0x486898))return![];this[_0x419358(0xb6)](_0x486898);}return!![];},Game_BattlerBase[_0x21afca(0x1db)]['predictedBravePoints']=function(){const _0x39411c=_0x21afca,_0x5a6954=this['bravePoints']()-this['predictedBravePointCost']()+this[_0x39411c(0x11c)]();return _0x5a6954['clamp'](Game_BattlerBase[_0x39411c(0x10c)],this['maxBravePoints']());},Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0x277)]=function(){const _0x5dd023=_0x21afca;let _0x23c7c4=0x0;for(const _0xa50866 of this[_0x5dd023(0x276)]){if(!_0xa50866)continue;const _0x212fed=_0xa50866[_0x5dd023(0x201)]();_0x23c7c4+=this['bravePointsCost'](_0x212fed);}return _0x23c7c4;},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0xbb)]=Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0x263)],Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0x263)]=function(){const _0x4d9818=_0x21afca;return BattleManager[_0x4d9818(0x235)]()&&this[_0x4d9818(0x8f)]()<0x0?![]:VisuMZ[_0x4d9818(0x1fb)]['Game_BattlerBase_canInput'][_0x4d9818(0x1e4)](this);},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x16c)]=Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0xf3)],Game_BattlerBase['prototype'][_0x21afca(0xf3)]=function(){const _0xf2d1a4=_0x21afca;return BattleManager[_0xf2d1a4(0x235)]()&&this[_0xf2d1a4(0x102)]()>0x1?![]:VisuMZ[_0xf2d1a4(0x1fb)][_0xf2d1a4(0x16c)][_0xf2d1a4(0x1e4)](this);},Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0x10d)]=function(){const _0x4c6768=_0x21afca;if(this['cannotBraveTrait']())return![];return this[_0x4c6768(0x102)]()<this[_0x4c6768(0x29c)]()&&this[_0x4c6768(0x2cc)]>this[_0x4c6768(0x284)]();},Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0x2b9)]=function(){const _0xb7af48=_0x21afca,_0x3fce16=VisuMZ[_0xb7af48(0x1fb)][_0xb7af48(0x2af)],_0x107b89=_0x3fce16[_0xb7af48(0x217)];return this[_0xb7af48(0xf6)]()[_0xb7af48(0x18e)](_0x86bfc3=>_0x86bfc3&&_0x86bfc3['note'][_0xb7af48(0x2b7)](_0x107b89));},Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0x1c6)]=function(){const _0x441bb1=_0x21afca,_0x32f696=VisuMZ[_0x441bb1(0x1fb)][_0x441bb1(0x2af)],_0x47fe9d=_0x32f696[_0x441bb1(0x8a)];return this[_0x441bb1(0xf6)]()['some'](_0x1203e7=>_0x1203e7&&_0x1203e7[_0x441bb1(0x173)][_0x441bb1(0x2b7)](_0x47fe9d));},Game_BattlerBase['prototype'][_0x21afca(0x1e1)]=function(){const _0x179726=_0x21afca;delete this['_btbTurnOrderGraphicType'],delete this[_0x179726(0xc5)],delete this[_0x179726(0x219)],delete this[_0x179726(0x142)];},Game_BattlerBase[_0x21afca(0x1db)]['TurnOrderBTBGraphicType']=function(){const _0x49e0f2=_0x21afca;return this[_0x49e0f2(0x1d4)]===undefined&&(this[_0x49e0f2(0x1d4)]=this[_0x49e0f2(0x22b)]()),this['_btbTurnOrderGraphicType'];},Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0x22b)]=function(){const _0x344621=_0x21afca;return Window_BTB_TurnOrder[_0x344621(0x23a)][_0x344621(0x278)];},Game_BattlerBase['prototype'][_0x21afca(0xb2)]=function(){const _0x158ab9=_0x21afca;return this['_btbTurnOrderFaceName']===undefined&&(this[_0x158ab9(0xc5)]=this[_0x158ab9(0xbc)]()),this['_btbTurnOrderFaceName'];},Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0xbc)]=function(){const _0x327acb=_0x21afca;return Window_BTB_TurnOrder['Settings'][_0x327acb(0x256)];},Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0x186)]=function(){const _0x139a38=_0x21afca;return this[_0x139a38(0x219)]===undefined&&(this[_0x139a38(0x219)]=this[_0x139a38(0x12c)]()),this['_btbTurnOrderFaceIndex'];},Game_BattlerBase[_0x21afca(0x1db)]['createTurnOrderBTBGraphicFaceIndex']=function(){const _0x560493=_0x21afca;return Window_BTB_TurnOrder[_0x560493(0x23a)][_0x560493(0x12e)];},Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0xa3)]=function(){const _0x25b810=_0x21afca;return this[_0x25b810(0x142)]===undefined&&(this[_0x25b810(0x142)]=this['createTurnOrderBTBGraphicIconIndex']()),this[_0x25b810(0x142)];},Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0xac)]=function(){const _0x419305=_0x21afca;return Window_BTB_TurnOrder[_0x419305(0x23a)][_0x419305(0x12a)];},Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0x1be)]=function(_0x524a97){const _0x4604f3=_0x21afca;this[_0x4604f3(0x142)]=_0x524a97;},VisuMZ['BattleSystemBTB'][_0x21afca(0x29e)]=Game_BattlerBase['prototype']['hide'],Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0x95)]=function(){const _0xdac1f4=_0x21afca;VisuMZ[_0xdac1f4(0x1fb)][_0xdac1f4(0x29e)][_0xdac1f4(0x1e4)](this),BattleManager[_0xdac1f4(0x152)]();},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x1c7)]=Game_BattlerBase[_0x21afca(0x1db)]['appear'],Game_BattlerBase[_0x21afca(0x1db)]['appear']=function(){const _0x26c3be=_0x21afca;VisuMZ[_0x26c3be(0x1fb)][_0x26c3be(0x1c7)]['call'](this),BattleManager[_0x26c3be(0x152)]();},VisuMZ[_0x21afca(0x1fb)]['Game_Battler_performCollapse']=Game_Battler['prototype']['performCollapse'],Game_Battler[_0x21afca(0x1db)][_0x21afca(0x214)]=function(){const _0x55ac07=_0x21afca;VisuMZ[_0x55ac07(0x1fb)][_0x55ac07(0x1bc)][_0x55ac07(0x1e4)](this),BattleManager[_0x55ac07(0x152)]();},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x2ce)]=Game_Battler[_0x21afca(0x1db)]['makeActionTimes'],Game_Battler['prototype']['makeActionTimes']=function(){const _0x2f1bf5=_0x21afca;return BattleManager['isBTB']()?0x1:VisuMZ[_0x2f1bf5(0x1fb)][_0x2f1bf5(0x2ce)][_0x2f1bf5(0x1e4)](this);},VisuMZ['BattleSystemBTB'][_0x21afca(0x2b8)]=Game_Battler[_0x21afca(0x1db)][_0x21afca(0x126)],Game_Battler['prototype'][_0x21afca(0x126)]=function(_0x5a036c){const _0x520258=_0x21afca;VisuMZ[_0x520258(0x1fb)][_0x520258(0x2b8)][_0x520258(0x1e4)](this,_0x5a036c),this['onBattleStartBTB'](_0x5a036c);},Game_Battler[_0x21afca(0x1db)][_0x21afca(0xe0)]=function(_0x26c4e1){const _0x10ee11=_0x21afca;if(!BattleManager[_0x10ee11(0x235)]())return;const _0x2cf88b=VisuMZ['BattleSystemBTB'][_0x10ee11(0x23a)][_0x10ee11(0x271)],_0x3104ca=VisuMZ[_0x10ee11(0x1fb)][_0x10ee11(0x2af)];let _0x530675=_0x26c4e1?_0x2cf88b[_0x10ee11(0x2ca)]:_0x2cf88b['BravePointStartNeutral'];const _0x73545=this[_0x10ee11(0xf6)]();for(const _0x571cd7 of _0x73545){if(!_0x571cd7)continue;const _0x45d0cb=_0x571cd7[_0x10ee11(0x173)];_0x45d0cb[_0x10ee11(0x2b7)](_0x3104ca['BravePointBattleStart'])&&(_0x530675+=Number(RegExp['$1']));}this[_0x10ee11(0xe8)](_0x530675);},Game_Battler[_0x21afca(0x1db)][_0x21afca(0xd0)]=function(){const _0x252e07=_0x21afca;this['_actions'][_0x252e07(0x2bb)](new Game_Action(this));const _0x5dec7c=VisuMZ[_0x252e07(0x1fb)][_0x252e07(0x23a)][_0x252e07(0xc4)];if(_0x5dec7c[_0x252e07(0xa8)]){const _0x3d42e2=_0x252e07(0x19e),_0x56c3ae=_0x5dec7c[_0x252e07(0x149)[_0x252e07(0x101)](_0x3d42e2)],_0x31b7cb=_0x5dec7c[_0x252e07(0x24a)[_0x252e07(0x101)](_0x3d42e2)],_0x67c49=_0x5dec7c[_0x252e07(0xae)[_0x252e07(0x101)](_0x3d42e2)];$gameTemp[_0x252e07(0x270)]([this],_0x56c3ae,_0x31b7cb,_0x67c49);}},Game_Battler[_0x21afca(0x1db)]['cancelBrave']=function(){const _0x54795b=_0x21afca;if(this[_0x54795b(0x276)][_0x54795b(0x150)]<=0x1)return;this[_0x54795b(0x276)]['pop']();const _0x3b7aa5=VisuMZ['BattleSystemBTB'][_0x54795b(0x23a)]['BraveAnimation'];if(_0x3b7aa5[_0x54795b(0x230)]){const _0x34fff9=_0x54795b(0x8e),_0x51327a=_0x3b7aa5[_0x54795b(0x149)[_0x54795b(0x101)](_0x34fff9)],_0x3374d1=_0x3b7aa5[_0x54795b(0x24a)[_0x54795b(0x101)](_0x34fff9)],_0x2f73f7=_0x3b7aa5[_0x54795b(0xae)[_0x54795b(0x101)](_0x34fff9)];$gameTemp['requestFauxAnimation']([this],_0x51327a,_0x3374d1,_0x2f73f7);}},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0xf1)]=Game_Battler[_0x21afca(0x1db)][_0x21afca(0x17e)],Game_Battler[_0x21afca(0x1db)][_0x21afca(0x17e)]=function(){const _0x1306b4=_0x21afca;VisuMZ[_0x1306b4(0x1fb)][_0x1306b4(0xf1)][_0x1306b4(0x1e4)](this),this[_0x1306b4(0x1b2)]();},Game_Battler['prototype'][_0x21afca(0x1b2)]=function(){const _0x3a60e9=_0x21afca;if(!BattleManager[_0x3a60e9(0x235)]())return;if(!$gameParty[_0x3a60e9(0x161)]())return;this['regenerateBravePoints']();},Game_Battler['prototype'][_0x21afca(0xd7)]=function(){const _0x3d9776=_0x21afca,_0x50b436=VisuMZ[_0x3d9776(0x1fb)]['Settings']['Mechanics'],_0x1af0cf=_0x50b436[_0x3d9776(0x2ab)];if(_0x1af0cf&&!this[_0x3d9776(0xea)]())return;const _0x4555d0=this['calcRegenBravePoints']();this[_0x3d9776(0x26f)](_0x4555d0);},Game_Battler[_0x21afca(0x1db)][_0x21afca(0x11c)]=function(){const _0x52facf=_0x21afca,_0x4f282e=VisuMZ[_0x52facf(0x1fb)][_0x52facf(0x2af)],_0x3069c7=VisuMZ[_0x52facf(0x1fb)][_0x52facf(0x23a)][_0x52facf(0x271)];let _0x4129fd=_0x3069c7[_0x52facf(0x242)]||0x0;const _0x123314=this[_0x52facf(0xf6)]();for(const _0x15f2e6 of _0x123314){if(!_0x15f2e6)continue;const _0x547e5d=_0x15f2e6[_0x52facf(0x173)];_0x547e5d[_0x52facf(0x2b7)](_0x4f282e[_0x52facf(0x185)])&&(_0x4129fd+=Number(RegExp['$1']));}return _0x4129fd;},Game_Battler[_0x21afca(0x1db)][_0x21afca(0x1e5)]=function(){const _0x34d5c2=_0x21afca;if(!this[_0x34d5c2(0x268)]())return;if(this[_0x34d5c2(0x102)]()<=0x1)return;if(!this['currentAction']())return;if(!this[_0x34d5c2(0x22e)]()[_0x34d5c2(0x201)]())return;const _0x1fdfc0=this[_0x34d5c2(0x22e)]()[_0x34d5c2(0x1c4)](),_0x5501ad=_0x1fdfc0?DataManager[_0x34d5c2(0x216)]:DataManager[_0x34d5c2(0xcd)],_0x34743c=_0x1fdfc0?DataManager[_0x34d5c2(0x231)]:DataManager[_0x34d5c2(0x1d2)];let _0x36ab67='',_0x565ed7=0x0;{const _0x2c9eda=this['getFlexActionFusionCombinationsBTB']();if(_0x2c9eda[_0x34d5c2(0x150)]>0x0)for(const _0x280104 of _0x2c9eda){if(!_0x280104)continue;_0x5501ad[_0x280104]&&_0x5501ad[_0x280104]>=_0x565ed7&&(this[_0x34d5c2(0x221)](_0x280104)&&(_0x36ab67=_0x280104,_0x565ed7=_0x5501ad[_0x280104]));}}{const _0x29cf9c=this[_0x34d5c2(0x1f9)]();if(_0x29cf9c[_0x34d5c2(0x150)]>0x0)for(const _0x34272c of _0x29cf9c){if(!_0x34272c)continue;_0x34743c[_0x34272c]&&_0x34743c[_0x34272c]>=_0x565ed7&&(this[_0x34d5c2(0x221)](_0x34272c)&&(_0x36ab67=_0x34272c,_0x565ed7=_0x5501ad[_0x34272c]));}}if(_0x565ed7<=0x0)return;this['removeActionFusionIngredients'](_0x36ab67),this['currentAction']()['setActionFusionBTB'](_0x36ab67),_0x1fdfc0?this[_0x34d5c2(0x22e)]()['setSkill'](_0x565ed7):this[_0x34d5c2(0x22e)]()[_0x34d5c2(0x257)](_0x565ed7);},Game_Battler[_0x21afca(0x1db)][_0x21afca(0x268)]=function(){const _0x36207f=_0x21afca;if(this[_0x36207f(0x15e)]())return![];const _0x2209b5=VisuMZ[_0x36207f(0x1fb)][_0x36207f(0x23a)][_0x36207f(0x271)];if(this[_0x36207f(0x1eb)]()){if(_0x2209b5['ActorActionFusions']===undefined)return!![];return _0x2209b5[_0x36207f(0x13d)];}else{if(_0x2209b5['EnemyActionFusions']===undefined)return!![];return _0x2209b5['EnemyActionFusions'];}},Game_BattlerBase[_0x21afca(0x1db)][_0x21afca(0x15e)]=function(){const _0x41ba17=_0x21afca,_0x415715=VisuMZ[_0x41ba17(0x1fb)][_0x41ba17(0x2af)],_0x5154d8=this[_0x41ba17(0xf6)]();for(const _0x5a3d59 of _0x5154d8){if(!_0x5a3d59)continue;const _0x417908=_0x5a3d59[_0x41ba17(0x173)];if(_0x417908['match'](_0x415715[_0x41ba17(0x1b1)]))return!![];if(_0x417908[_0x41ba17(0x2b7)](_0x415715['EnableFusion']))return![];}return![];},Game_Battler[_0x21afca(0x1db)][_0x21afca(0x259)]=function(){const _0x2b0a9a=_0x21afca,_0x68b86e=this[_0x2b0a9a(0x22e)](),_0x165f65=this[_0x2b0a9a(0x276)],_0x4575c1=_0x165f65[_0x2b0a9a(0x157)](_0x25e026=>this[_0x2b0a9a(0x1de)](_0x68b86e,_0x25e026)),_0x2ec28a=_0x4575c1['map'](_0x28cb98=>_0x28cb98[_0x2b0a9a(0x201)]()['id']);_0x2ec28a['push'](_0x68b86e[_0x2b0a9a(0x201)]()['id']),_0x2ec28a[_0x2b0a9a(0xad)]((_0x658808,_0x3c2635)=>_0x658808-_0x3c2635);const _0xa53c5d=VisuMZ[_0x2b0a9a(0x1fb)][_0x2b0a9a(0x293)](_0x2ec28a);return _0xa53c5d[_0x2b0a9a(0x157)]((_0x26dbff,_0x5390b2,_0x55bd26)=>_0x55bd26[_0x2b0a9a(0x1b0)](_0x26dbff)===_0x5390b2);},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x293)]=function(_0x404317){const _0x27c174=_0x21afca;_0x404317['sort']((_0x55d0ba,_0x34d794)=>_0x55d0ba-_0x34d794);const _0xf4a713=[],_0x29d408=function(_0x501b79,_0x4f2bc0){const _0x5c59cc=_0x5b28;_0x4f2bc0[_0x5c59cc(0x150)]>=0x2&&_0xf4a713[_0x5c59cc(0x2bb)](_0x4f2bc0['join']('-'));for(let _0x4ad7ed=_0x501b79;_0x4ad7ed<_0x404317[_0x5c59cc(0x150)];_0x4ad7ed++){_0x29d408(_0x4ad7ed+0x1,[..._0x4f2bc0,_0x404317[_0x4ad7ed]]);}};return _0x29d408(0x0,[]),_0xf4a713[_0x27c174(0xad)](),_0xf4a713[_0x27c174(0x157)]((_0x4c5389,_0x205df3,_0x5e3823)=>_0x5e3823['indexOf'](_0x4c5389)===_0x205df3);},Game_Battler[_0x21afca(0x1db)][_0x21afca(0x1f9)]=function(){const _0x418367=_0x21afca,_0x4f7455=this[_0x418367(0x22e)](),_0x315c14=this['_actions'],_0x43d3ea=[];let _0x3ba0f3=String(_0x4f7455[_0x418367(0x201)]()['id']);for(let _0x4a40fa=0x1;_0x4a40fa<_0x315c14[_0x418367(0x150)];_0x4a40fa++){const _0x246b5e=_0x315c14[_0x4a40fa];if(this[_0x418367(0x1de)](_0x4f7455,_0x246b5e))_0x3ba0f3='%1-%2'['format'](_0x3ba0f3,_0x246b5e['item']()['id']),_0x43d3ea['push'](_0x3ba0f3);else break;}return _0x43d3ea[_0x418367(0x157)]((_0xd3cdaf,_0x365fa9,_0x44b605)=>_0x44b605[_0x418367(0x1b0)](_0xd3cdaf)===_0x365fa9);},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x17a)]=function(_0x4fded7,_0xe515fb){const _0x578692=[],_0x2c3561=function(_0x224eca,_0x1adc95){const _0x523867=_0x5b28;for(var _0x11f570=0x0;_0x11f570<_0x1adc95[_0x523867(0x150)];_0x11f570++){_0x578692[_0x523867(0x2bb)](_0x224eca+'-'+_0x1adc95[_0x11f570]),_0x2c3561(_0x224eca+'-'+_0x1adc95[_0x11f570],_0x1adc95[_0x523867(0x2d1)](_0x11f570+0x1));}};return _0x2c3561(_0x4fded7,_0xe515fb),_0x578692;},Game_Battler[_0x21afca(0x1db)][_0x21afca(0x1de)]=function(_0x1ec7e8,_0x21eeff){const _0x1470d5=_0x21afca;if(!_0x1ec7e8||!_0x21eeff)return![];if(_0x1ec7e8===_0x21eeff)return![];if(!_0x1ec7e8[_0x1470d5(0x201)]()||!_0x21eeff['item']())return![];if(_0x1ec7e8['isSkill']()!==_0x21eeff[_0x1470d5(0x1c4)]())return![];return!![];},Game_Battler['prototype']['canPayActionFusionCombination']=function(_0x3f95ef){const _0x7376d0=_0x21afca,_0x519cf7=this[_0x7376d0(0x22e)]()['isSkill'](),_0x5903d2=JsonEx[_0x7376d0(0x2b0)](this);_0x5903d2[_0x7376d0(0x21f)]=!![],_0x5903d2[_0x7376d0(0x22e)]()['setActionFusionBTB'](_0x3f95ef);const _0x1b4364=JsonEx[_0x7376d0(0x2b0)]($gameParty[_0x7376d0(0x10f)]),_0x456000=JsonEx[_0x7376d0(0x2b0)]($gameParty[_0x7376d0(0x1c9)]),_0x26e08d=JsonEx['makeDeepCopy']($gameParty['_armors']);let _0x339d83=_0x519cf7?_0x5903d2[_0x7376d0(0x23f)]():_0x5903d2[_0x7376d0(0x1d0)]();return $gameParty['_items']=_0x1b4364,$gameParty[_0x7376d0(0x1c9)]=_0x456000,$gameParty[_0x7376d0(0x244)]=_0x26e08d,_0x339d83;},Game_Battler[_0x21afca(0x1db)][_0x21afca(0x7f)]=function(_0x4c26f4){const _0x2d034e=_0x21afca,_0x1daae5=this[_0x2d034e(0x22e)](),_0x5f3ccb=_0x4c26f4[_0x2d034e(0x297)]('-')[_0x2d034e(0xb4)](_0x18442e=>Number(_0x18442e));_0x5f3ccb[_0x2d034e(0x135)]();const _0x3a6627=this[_0x2d034e(0x276)],_0x46ebe8=[];for(const _0x4b70b8 of _0x3a6627){this[_0x2d034e(0x1de)](_0x1daae5,_0x4b70b8)&&(_0x5f3ccb[_0x2d034e(0x169)](_0x4b70b8[_0x2d034e(0x201)]()['id'])&&(_0x46ebe8[_0x2d034e(0x2bb)](_0x4b70b8),_0x5f3ccb[_0x2d034e(0x93)](_0x5f3ccb['indexOf'](_0x4b70b8[_0x2d034e(0x201)]()['id']),0x1)));}for(const _0x575c3d of _0x46ebe8){_0x3a6627[_0x2d034e(0x18c)](_0x575c3d);}},Game_Actor[_0x21afca(0x1db)][_0x21afca(0xe8)]=function(_0x5d7f0e){const _0xa9b5a4=_0x21afca;Game_Battler[_0xa9b5a4(0x1db)][_0xa9b5a4(0xe8)][_0xa9b5a4(0x1e4)](this,_0x5d7f0e);if(!SceneManager[_0xa9b5a4(0x267)]())return;if(!BattleManager[_0xa9b5a4(0x18b)]()[_0xa9b5a4(0x169)](this))return;BattleManager[_0xa9b5a4(0x2a3)]();},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x279)]=Game_Actor[_0x21afca(0x1db)]['makeActions'],Game_Actor[_0x21afca(0x1db)]['makeActions']=function(){const _0x3c1108=_0x21afca;VisuMZ['BattleSystemBTB'][_0x3c1108(0x279)][_0x3c1108(0x1e4)](this),BattleManager[_0x3c1108(0x235)]()&&this[_0x3c1108(0x8f)]()<0x0&&this['clearActions']();},Game_Actor[_0x21afca(0x1db)][_0x21afca(0x22b)]=function(){const _0x120510=_0x21afca,_0x99030f=this[_0x120510(0x18f)]()[_0x120510(0x173)];if(_0x99030f[_0x120510(0x2b7)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x120510(0x243);else{if(_0x99030f[_0x120510(0x2b7)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0x120510(0x1bb);}return Window_BTB_TurnOrder[_0x120510(0x23a)]['ActorBattlerType'];},Game_Actor[_0x21afca(0x1db)][_0x21afca(0xbc)]=function(){const _0x444deb=_0x21afca,_0x367f4d=this['actor']()[_0x444deb(0x173)];if(_0x367f4d[_0x444deb(0x2b7)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x444deb(0xff)]();},Game_Actor[_0x21afca(0x1db)]['createTurnOrderBTBGraphicFaceIndex']=function(){const _0x3b618e=_0x21afca,_0x345e1d=this[_0x3b618e(0x18f)]()[_0x3b618e(0x173)];if(_0x345e1d[_0x3b618e(0x2b7)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x3b618e(0x23d)]();},Game_Actor['prototype'][_0x21afca(0xac)]=function(){const _0x383d5f=_0x21afca,_0xf69d91=this[_0x383d5f(0x18f)]()['note'];if(_0xf69d91[_0x383d5f(0x2b7)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_BTB_TurnOrder[_0x383d5f(0x23a)][_0x383d5f(0x208)];},Game_Actor[_0x21afca(0x1db)][_0x21afca(0x1de)]=function(_0x531fa9,_0x21ca31){const _0x1ad4e6=_0x21afca;if(!Game_Battler[_0x1ad4e6(0x1db)][_0x1ad4e6(0x1de)][_0x1ad4e6(0x1e4)](this,_0x531fa9,_0x21ca31))return![];if(_0x531fa9[_0x1ad4e6(0x1a4)]()&&_0x21ca31[_0x1ad4e6(0x1a4)]()){if(_0x531fa9['isForFriend']()!==_0x21ca31[_0x1ad4e6(0x129)]())return![];if(_0x531fa9[_0x1ad4e6(0x1b9)]!==_0x21ca31[_0x1ad4e6(0x1b9)])return![];}return!![];},Game_Enemy['prototype'][_0x21afca(0x22b)]=function(){const _0xce4d81=_0x21afca,_0x4f91a7=this[_0xce4d81(0xc2)]()['note'];if(_0x4f91a7[_0xce4d81(0x2b7)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0xce4d81(0x243);else{if(_0x4f91a7[_0xce4d81(0x2b7)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0xce4d81(0x1bb);}return Window_BTB_TurnOrder[_0xce4d81(0x23a)]['EnemyBattlerType'];},Game_Enemy[_0x21afca(0x1db)][_0x21afca(0xbc)]=function(){const _0x3cd9ba=_0x21afca,_0x4561f0=this[_0x3cd9ba(0xc2)]()[_0x3cd9ba(0x173)];if(_0x4561f0['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_BTB_TurnOrder[_0x3cd9ba(0x23a)]['EnemyBattlerFaceName'];},Game_Enemy[_0x21afca(0x1db)]['createTurnOrderBTBGraphicFaceIndex']=function(){const _0x354fd8=_0x21afca,_0x118295=this[_0x354fd8(0xc2)]()[_0x354fd8(0x173)];if(_0x118295[_0x354fd8(0x2b7)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_BTB_TurnOrder['Settings'][_0x354fd8(0x12e)];},Game_Enemy[_0x21afca(0x1db)][_0x21afca(0xac)]=function(){const _0x29199e=_0x21afca,_0x2dcbf3=this['enemy']()[_0x29199e(0x173)];if(_0x2dcbf3[_0x29199e(0x2b7)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_BTB_TurnOrder[_0x29199e(0x23a)]['EnemyBattlerIcon'];},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x159)]=Game_Enemy[_0x21afca(0x1db)]['makeActions'],Game_Enemy[_0x21afca(0x1db)][_0x21afca(0x22d)]=function(){const _0x2a135a=_0x21afca;VisuMZ[_0x2a135a(0x1fb)][_0x2a135a(0x159)][_0x2a135a(0x1e4)](this),this[_0x2a135a(0xb5)](),this[_0x2a135a(0x13f)]();},Game_Enemy['prototype'][_0x21afca(0xb5)]=function(){const _0x47f1c9=_0x21afca;if(!BattleManager['isBTB']())return;if(this[_0x47f1c9(0x102)]()<=0x0)return;this[_0x47f1c9(0x27b)]=![],this[_0x47f1c9(0x8f)]()<0x0&&this[_0x47f1c9(0x184)]();},Game_Enemy['prototype'][_0x21afca(0x13f)]=function(){const _0x52ee1f=_0x21afca;if(!BattleManager['isBTB']())return;if(this[_0x52ee1f(0x102)]()<=0x0)return;const _0xbc475a=this['_actions'][0x0];if(!_0xbc475a)return;const _0x5f0854=_0xbc475a[_0x52ee1f(0x201)]();if(!_0x5f0854)return;const _0x24ac13=VisuMZ[_0x52ee1f(0x1fb)][_0x52ee1f(0x2af)],_0x5e78a7=_0x5f0854[_0x52ee1f(0x173)];let _0x21797c=[];if(_0x5e78a7[_0x52ee1f(0x2b7)](_0x24ac13[_0x52ee1f(0x160)])){const _0x284a4f=String(RegExp['$1'])[_0x52ee1f(0x297)](',');for(let _0x52f76d of _0x284a4f){_0x52f76d=(String(_0x52f76d)||'')[_0x52ee1f(0x151)]();const _0x128ba2=/^\d+$/[_0x52ee1f(0x25c)](_0x52f76d);_0x128ba2?_0x21797c[_0x52ee1f(0x2bb)](Number(_0x52f76d)):_0x21797c[_0x52ee1f(0x2bb)](DataManager['getSkillIdWithName'](_0x52f76d));}}if(_0x21797c[_0x52ee1f(0x150)]<=0x0)return;while(_0x21797c['length']>this[_0x52ee1f(0x29c)]()){_0x21797c['pop']();}if(_0x21797c[_0x52ee1f(0x150)]<=0x0)return;this[_0x52ee1f(0x184)]();for(const _0x13732a of _0x21797c){const _0x5002bc=new Game_Action(this);_0x5002bc[_0x52ee1f(0x11f)](_0x13732a),_0x5002bc[_0x52ee1f(0x1c5)]=!![],this[_0x52ee1f(0x276)][_0x52ee1f(0x2bb)](_0x5002bc);}},Game_Enemy['prototype'][_0x21afca(0x21e)]=function(){const _0x592c0b=_0x21afca;let _0x56f818=this[_0x592c0b(0x102)]();for(const _0x2790a5 of this[_0x592c0b(0x276)]){if(!_0x2790a5)continue;_0x56f818+=_0x2790a5[_0x592c0b(0x11a)]();}return _0x56f818-0x1;},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x2a1)]=Game_Unit[_0x21afca(0x1db)][_0x21afca(0x22d)],Game_Unit[_0x21afca(0x1db)][_0x21afca(0x22d)]=function(){const _0x282715=_0x21afca;VisuMZ[_0x282715(0x1fb)][_0x282715(0x2a1)][_0x282715(0x1e4)](this),BattleManager[_0x282715(0x235)]()&&this===$gameTroop&&SceneManager['isSceneBattle']()&&BattleManager[_0x282715(0x296)]();},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x2c8)]=Game_Party[_0x21afca(0x1db)][_0x21afca(0xe7)],Game_Party[_0x21afca(0x1db)][_0x21afca(0xe7)]=function(_0x4ce472){const _0x47b901=_0x21afca;VisuMZ[_0x47b901(0x1fb)][_0x47b901(0x2c8)][_0x47b901(0x1e4)](this,_0x4ce472),SceneManager['isSceneBattle']()&&BattleManager['isBTB']()&&BattleManager[_0x47b901(0xb7)][_0x47b901(0x18c)]($gameActors[_0x47b901(0x18f)](_0x4ce472));},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x8b)]=Scene_Battle['prototype']['onDisabledPartyCommandSelection'],Scene_Battle[_0x21afca(0x1db)][_0x21afca(0x179)]=function(){const _0x4df4cc=_0x21afca;BattleManager[_0x4df4cc(0x235)]()?this[_0x4df4cc(0xc3)]():VisuMZ[_0x4df4cc(0x1fb)][_0x4df4cc(0x8b)][_0x4df4cc(0x1e4)](this);},VisuMZ[_0x21afca(0x1fb)]['Scene_Battle_createActorCommandWindow']=Scene_Battle[_0x21afca(0x1db)][_0x21afca(0xf9)],Scene_Battle[_0x21afca(0x1db)][_0x21afca(0xf9)]=function(){const _0x544610=_0x21afca;VisuMZ['BattleSystemBTB'][_0x544610(0x223)]['call'](this),this[_0x544610(0x147)]();},Scene_Battle[_0x21afca(0x1db)][_0x21afca(0x147)]=function(){const _0x44fc4b=_0x21afca;if(!BattleManager[_0x44fc4b(0x235)]())return;const _0x2adaea=this[_0x44fc4b(0x15d)];if(!_0x2adaea)return;_0x2adaea[_0x44fc4b(0x11e)](_0x44fc4b(0x226),this[_0x44fc4b(0x119)][_0x44fc4b(0xc8)](this)),_0x2adaea[_0x44fc4b(0x11e)](_0x44fc4b(0x1a8),this[_0x44fc4b(0xe9)][_0x44fc4b(0xc8)](this));},Scene_Battle[_0x21afca(0x1db)][_0x21afca(0x119)]=function(){const _0x54ccf1=_0x21afca;this[_0x54ccf1(0xd0)]();},Scene_Battle[_0x21afca(0x1db)][_0x21afca(0xe9)]=function(){const _0x384ac7=_0x21afca,_0x30c2ca=BattleManager[_0x384ac7(0x18f)]();if(!_0x30c2ca)this[_0x384ac7(0x19d)]();else{if(_0x30c2ca[_0x384ac7(0x102)]()<=0x1)this['commandCancel']();else _0x30c2ca[_0x384ac7(0x2be)]>0x0?this[_0x384ac7(0x19d)]():this[_0x384ac7(0x1d7)]();}},Scene_Battle[_0x21afca(0x1db)][_0x21afca(0xd0)]=function(){const _0x17688c=_0x21afca,_0x23f49c=BattleManager[_0x17688c(0x18f)]();if(!_0x23f49c)return;_0x23f49c[_0x17688c(0xd0)]();const _0x5537e5=this[_0x17688c(0x15d)]['_scrollX'],_0x3f4354=this[_0x17688c(0x15d)][_0x17688c(0x187)],_0xc7fc53=this[_0x17688c(0x15d)][_0x17688c(0x1f4)]();this[_0x17688c(0x15d)][_0x17688c(0x234)](_0x23f49c),this[_0x17688c(0x15d)][_0x17688c(0x174)](_0xc7fc53),this[_0x17688c(0x15d)]['_scrollX']=_0x5537e5,this['_actorCommandWindow'][_0x17688c(0x187)]=_0x3f4354;},Scene_Battle[_0x21afca(0x1db)][_0x21afca(0x1d7)]=function(){const _0x1f0d36=_0x21afca,_0x480491=BattleManager[_0x1f0d36(0x18f)]();if(!_0x480491)return;_0x480491[_0x1f0d36(0xb9)]();const _0x17a02e=this[_0x1f0d36(0x15d)][_0x1f0d36(0x11d)],_0xf179bb=this[_0x1f0d36(0x15d)][_0x1f0d36(0x187)],_0x381a55=this[_0x1f0d36(0x15d)][_0x1f0d36(0x1f4)]();this[_0x1f0d36(0x15d)][_0x1f0d36(0x234)](_0x480491),this[_0x1f0d36(0x15d)][_0x1f0d36(0x174)](_0x381a55),this[_0x1f0d36(0x15d)]['_scrollX']=_0x17a02e,this[_0x1f0d36(0x15d)][_0x1f0d36(0x187)]=_0xf179bb;},VisuMZ['BattleSystemBTB'][_0x21afca(0x158)]=Scene_Battle[_0x21afca(0x1db)]['createAllWindows'],Scene_Battle[_0x21afca(0x1db)][_0x21afca(0xf2)]=function(){const _0x297584=_0x21afca;VisuMZ[_0x297584(0x1fb)][_0x297584(0x158)][_0x297584(0x1e4)](this),this['createBTBTurnOrderWindow']();},Scene_Battle[_0x21afca(0x1db)][_0x21afca(0x180)]=function(){const _0x5a7e90=_0x21afca;if(!BattleManager['isBTB']())return;this['_btbTurnOrderWindow']=new Window_BTB_TurnOrder();const _0x3270a6=this[_0x5a7e90(0xd6)](this[_0x5a7e90(0x176)]);this[_0x5a7e90(0x1c8)](this[_0x5a7e90(0x134)],_0x3270a6),this[_0x5a7e90(0x232)](),BattleManager[_0x5a7e90(0x97)](!![]);},Scene_Battle[_0x21afca(0x1db)][_0x21afca(0x232)]=function(){const _0x546f76=_0x21afca,_0x13299b=Window_BTB_TurnOrder['Settings'];if(_0x13299b['DisplayPosition']!==_0x546f76(0x2a5))return;if(!_0x13299b['RepositionLogWindow'])return;if(!this[_0x546f76(0x1d6)])return;const _0x23b0f8=this[_0x546f76(0x134)]['y']-Math[_0x546f76(0x87)]((Graphics[_0x546f76(0x16a)]-Graphics[_0x546f76(0x282)])/0x2),_0x2a5d67=_0x23b0f8+this[_0x546f76(0x134)][_0x546f76(0x16a)];this[_0x546f76(0x1d6)]['y']=_0x2a5d67+_0x13299b[_0x546f76(0x2b2)];};function Sprite_BTB_TurnOrder_Battler(){const _0x32dd3c=_0x21afca;this[_0x32dd3c(0x2ad)](...arguments);}Sprite_BTB_TurnOrder_Battler['prototype']=Object[_0x21afca(0x2c6)](Sprite_Clickable[_0x21afca(0x1db)]),Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0x81)]=Sprite_BTB_TurnOrder_Battler,Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0x2ad)]=function(_0xc1c606,_0x51572d){const _0x3b9e1b=_0x21afca;this[_0x3b9e1b(0xe1)](_0xc1c606,_0x51572d),Sprite_Clickable[_0x3b9e1b(0x1db)]['initialize'][_0x3b9e1b(0x1e4)](this),this[_0x3b9e1b(0x113)]=0x0,this[_0x3b9e1b(0xee)](),this[_0x3b9e1b(0x140)]();},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0xe1)]=function(_0x5f35b9,_0x277b04){const _0x5681b7=_0x21afca;this['_unit']=_0x5f35b9,this['_index']=_0x277b04;const _0x7d9233=Window_BTB_TurnOrder[_0x5681b7(0x23a)],_0x2b0933=this[_0x5681b7(0x2ae)](),_0xe495ba=this[_0x5681b7(0x137)]();this[_0x5681b7(0x1f1)]=0x0,this[_0x5681b7(0x1d5)]=_0x2b0933?_0x7d9233[_0x5681b7(0x181)]*_0xe495ba:0x0,this['_positionTargetY']=_0x2b0933?0x0:_0x7d9233['SpriteThin']*_0xe495ba,this[_0x5681b7(0x29a)]=0x0,this['_fadeTarget']=0xff,this[_0x5681b7(0x1e8)]=![],this['_isAppeared']=![],this[_0x5681b7(0x239)]=0x0,this[_0x5681b7(0x258)]=0x0;},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0xee)]=function(){const _0x39963f=_0x21afca;this[_0x39963f(0x1ff)](),this[_0x39963f(0x251)](),this['createGraphicSprite'](),this[_0x39963f(0x108)](),this['createLetterSprite']();},Sprite_BTB_TurnOrder_Battler['prototype']['createInitialPositions']=function(){const _0x498a06=_0x21afca;this['x']=this[_0x498a06(0x1d5)],this['y']=this[_0x498a06(0x14e)];},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0x2ae)]=function(){const _0x5cff12=_0x21afca,_0x592b90=Window_BTB_TurnOrder[_0x5cff12(0x23a)],_0x49f35e=[_0x5cff12(0x2a5),_0x5cff12(0x2bd)][_0x5cff12(0x169)](_0x592b90['DisplayPosition']);return _0x49f35e;},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0x200)]=function(){const _0x7b5202=_0x21afca,_0x2a0b6e=Window_BTB_TurnOrder[_0x7b5202(0x23a)];return this[_0x7b5202(0x2ae)]()?_0x2a0b6e[_0x7b5202(0x181)]:_0x2a0b6e[_0x7b5202(0xdf)];},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0x203)]=function(){const _0x24282b=_0x21afca,_0xcf3156=Window_BTB_TurnOrder[_0x24282b(0x23a)];return this[_0x24282b(0x2ae)]()?_0xcf3156['SpriteLength']:_0xcf3156[_0x24282b(0x181)];},Sprite_BTB_TurnOrder_Battler['prototype'][_0x21afca(0x1ef)]=function(){const _0x598a5d=_0x21afca;this[_0x598a5d(0x1cf)]=new Bitmap(0x48,0x24);const _0x246a69=this[_0x598a5d(0x2a2)]()?this['battler']()[_0x598a5d(0x2b3)]():'%1\x20%2\x20%3'['format'](this[_0x598a5d(0x9f)],this[_0x598a5d(0x121)]);this[_0x598a5d(0x1cf)]['drawText'](_0x246a69,0x0,0x0,0x48,0x24,_0x598a5d(0xba));},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0x251)]=function(){const _0x508980=_0x21afca;if(!Window_BTB_TurnOrder[_0x508980(0x23a)]['ShowMarkerBg'])return;const _0x3b9dab=Window_BTB_TurnOrder['Settings'],_0xa59266=this[_0x508980(0x9f)]===$gameParty?_0x508980(0x224):_0x508980(0x170),_0x4d6416=_0x508980(0x283)[_0x508980(0x101)](_0xa59266),_0x47221c=new Sprite();_0x47221c['anchor']['x']=this[_0x508980(0xcb)]['x'],_0x47221c[_0x508980(0xcb)]['y']=this['anchor']['y'];if(_0x3b9dab[_0x4d6416])_0x47221c[_0x508980(0x1cf)]=ImageManager[_0x508980(0x1a6)](_0x3b9dab[_0x4d6416]);else{const _0x3dfae8=this[_0x508980(0x200)](),_0xde8fad=this['bitmapHeight']();_0x47221c[_0x508980(0x1cf)]=new Bitmap(_0x3dfae8,_0xde8fad);const _0x44447e=ColorManager[_0x508980(0xf7)](_0x3b9dab['%1BgColor1'[_0x508980(0x101)](_0xa59266)]),_0x504bde=ColorManager[_0x508980(0xf7)](_0x3b9dab['%1BgColor2'[_0x508980(0x101)](_0xa59266)]);_0x47221c[_0x508980(0x1cf)][_0x508980(0x14b)](0x0,0x0,_0x3dfae8,_0xde8fad,_0x44447e,_0x504bde,!![]);}this['_backgroundSprite']=_0x47221c,this[_0x508980(0xa2)](this['_backgroundSprite']);},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0x241)]=function(){const _0x45ada3=_0x21afca,_0x17d244=new Sprite();_0x17d244[_0x45ada3(0xcb)]['x']=this[_0x45ada3(0xcb)]['x'],_0x17d244[_0x45ada3(0xcb)]['y']=this['anchor']['y'],this['_graphicSprite']=_0x17d244,this[_0x45ada3(0xa2)](this[_0x45ada3(0x1d9)]),this[_0x45ada3(0x183)]();},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0x108)]=function(){const _0x481afb=_0x21afca;if(!Window_BTB_TurnOrder['Settings'][_0x481afb(0x96)])return;const _0x3ebff6=Window_BTB_TurnOrder[_0x481afb(0x23a)],_0x1564e2=this[_0x481afb(0x9f)]===$gameParty?_0x481afb(0x224):_0x481afb(0x170),_0x1acb4c=_0x481afb(0x266)[_0x481afb(0x101)](_0x1564e2),_0x95e790=new Sprite();_0x95e790[_0x481afb(0xcb)]['x']=this[_0x481afb(0xcb)]['x'],_0x95e790[_0x481afb(0xcb)]['y']=this[_0x481afb(0xcb)]['y'];if(_0x3ebff6[_0x1acb4c])_0x95e790[_0x481afb(0x1cf)]=ImageManager[_0x481afb(0x1a6)](_0x3ebff6[_0x1acb4c]);else{let _0x501617=this[_0x481afb(0x200)](),_0x26e299=this[_0x481afb(0x203)](),_0x2a8971=_0x3ebff6[_0x481afb(0xa4)];_0x95e790[_0x481afb(0x1cf)]=new Bitmap(_0x501617,_0x26e299);const _0x311855=_0x481afb(0x1ad),_0x370d59=ColorManager[_0x481afb(0xf7)](_0x3ebff6[_0x481afb(0x112)[_0x481afb(0x101)](_0x1564e2)]);_0x95e790[_0x481afb(0x1cf)][_0x481afb(0xeb)](0x0,0x0,_0x501617,_0x26e299,_0x311855),_0x501617-=0x2,_0x26e299-=0x2,_0x95e790[_0x481afb(0x1cf)][_0x481afb(0xeb)](0x1,0x1,_0x501617,_0x26e299,_0x370d59),_0x501617-=_0x2a8971*0x2,_0x26e299-=_0x2a8971*0x2,_0x95e790[_0x481afb(0x1cf)]['fillRect'](0x1+_0x2a8971,0x1+_0x2a8971,_0x501617,_0x26e299,_0x311855),_0x501617-=0x2,_0x26e299-=0x2,_0x2a8971+=0x1,_0x95e790[_0x481afb(0x1cf)][_0x481afb(0x206)](0x1+_0x2a8971,0x1+_0x2a8971,_0x501617,_0x26e299);}this[_0x481afb(0x1f0)]=_0x95e790,this['addChild'](this[_0x481afb(0x1f0)]),this[_0x481afb(0x9b)]=this[_0x481afb(0x1f0)]['width'],this['height']=this[_0x481afb(0x1f0)][_0x481afb(0x16a)];},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0xa5)]=function(){const _0x1cd8a3=_0x21afca,_0x3fcd89=Window_BTB_TurnOrder[_0x1cd8a3(0x23a)];if(!_0x3fcd89[_0x1cd8a3(0x1cd)])return;if(this[_0x1cd8a3(0x9f)]===$gameParty)return;const _0x847534=this['bitmapWidth'](),_0x2e5612=this[_0x1cd8a3(0x203)](),_0x54e5c6=new Sprite();_0x54e5c6[_0x1cd8a3(0xcb)]['x']=this[_0x1cd8a3(0xcb)]['x'],_0x54e5c6[_0x1cd8a3(0xcb)]['y']=this[_0x1cd8a3(0xcb)]['y'],_0x54e5c6[_0x1cd8a3(0x1cf)]=new Bitmap(_0x847534,_0x2e5612),this[_0x1cd8a3(0x11b)]=_0x54e5c6,this['addChild'](this[_0x1cd8a3(0x11b)]);},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0x2a2)]=function(){const _0x591cda=_0x21afca;return this[_0x591cda(0x9f)]?this['_unit'][_0x591cda(0x13b)]()[this['_index']]:null;},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0x123)]=function(){const _0x29ecfb=_0x21afca;Sprite_Clickable['prototype'][_0x29ecfb(0x123)][_0x29ecfb(0x1e4)](this),this[_0x29ecfb(0x103)](),this[_0x29ecfb(0x222)](),this[_0x29ecfb(0x140)](),this[_0x29ecfb(0x138)](),this['updateGraphic'](),this[_0x29ecfb(0x20c)](),this[_0x29ecfb(0x91)](),this[_0x29ecfb(0x190)]();},Sprite_BTB_TurnOrder_Battler['prototype'][_0x21afca(0x103)]=function(){const _0x5e57c5=_0x21afca,_0x1b6d73=this['containerPosition']();if(this['_position']===_0x1b6d73)return;this[_0x5e57c5(0x28b)]=_0x1b6d73;this[_0x5e57c5(0x113)]<0xff&&this[_0x5e57c5(0x2a2)]()&&_0x1b6d73!==this[_0x5e57c5(0x137)]()&&this[_0x5e57c5(0x124)](0xff);if(_0x1b6d73===this[_0x5e57c5(0x137)]()&&this[_0x5e57c5(0x29a)]<=0x0&&this['opacity']>0x0)this[_0x5e57c5(0x124)](0x0);else this['_fadeDuration']<=0x0&&this[_0x5e57c5(0x113)]<0xff&&this[_0x5e57c5(0x140)]();this[_0x5e57c5(0x287)]();},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0xbf)]=function(){const _0x3285d0=_0x21afca,_0x47cd50=this[_0x3285d0(0xa7)]();if(!_0x47cd50)return;let _0x3ac9f8=![];if(this[_0x3285d0(0x239)]!==_0x47cd50[_0x3285d0(0x9b)])_0x3ac9f8=!![];else this[_0x3285d0(0x258)]!==_0x47cd50[_0x3285d0(0x16a)]&&(_0x3ac9f8=!![]);_0x3ac9f8&&this[_0x3285d0(0x287)]();},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)]['calculateTargetPositions']=function(){const _0x387648=_0x21afca,_0x429e49=Window_BTB_TurnOrder[_0x387648(0x23a)],_0x35804f=this[_0x387648(0x2ae)](),_0x3348c8=_0x429e49['OrderDirection'],_0x3297e4=_0x429e49['SubjectDistance'],_0x228a25=SceneManager[_0x387648(0x177)][_0x387648(0x134)];if(!_0x228a25)return;const _0x293845=this[_0x387648(0x84)]();this[_0x387648(0x1f1)]=_0x429e49[_0x387648(0x1a7)],this[_0x387648(0x1d5)]=_0x35804f?_0x429e49[_0x387648(0x181)]*_0x293845:0x0,this[_0x387648(0x14e)]=_0x35804f?0x0:_0x429e49[_0x387648(0x181)]*_0x293845,_0x293845>0x0&&(this['_positionTargetX']+=_0x35804f?_0x3297e4:0x0,this[_0x387648(0x14e)]+=_0x35804f?0x0:_0x3297e4),_0x3348c8?this[_0x387648(0x1d5)]=_0x35804f?_0x228a25[_0x387648(0x9b)]-this[_0x387648(0x1d5)]-_0x429e49[_0x387648(0x181)]:0x0:this[_0x387648(0x14e)]=_0x35804f?0x0:_0x228a25['height']-this[_0x387648(0x14e)]-_0x429e49[_0x387648(0x181)];},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0x222)]=function(){const _0x47d8e4=_0x21afca;if(this[_0x47d8e4(0x29a)]>0x0)return;if(this['_positionDuration']>0x0){const _0x158ddd=this[_0x47d8e4(0x1f1)];this['x']=(this['x']*(_0x158ddd-0x1)+this[_0x47d8e4(0x1d5)])/_0x158ddd,this['y']=(this['y']*(_0x158ddd-0x1)+this[_0x47d8e4(0x14e)])/_0x158ddd,this[_0x47d8e4(0x1f1)]--;}if(this['_positionDuration']<=0x0){this['x']=this['_positionTargetX'],this['y']=this['_positionTargetY'];if(this['opacity']<0xff&&!this['_isBattleOver']&&this['_fadeDuration']<=0x0){const _0x152af9=this[_0x47d8e4(0x2a2)]();_0x152af9&&(this[_0x47d8e4(0x2c2)]=_0x152af9[_0x47d8e4(0xea)]()&&_0x152af9[_0x47d8e4(0x171)]()?0xff:0x0);}}},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0x137)]=function(){const _0x5844b8=_0x21afca,_0x2cb14a=Window_BTB_TurnOrder['Settings'],_0x5d826e=this[_0x5844b8(0x2ae)]()?_0x2cb14a['MaxHorzSprites']:_0x2cb14a['MaxVertSprites'];return _0x5d826e+0x1;},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0xa7)]=function(){const _0x39f5d9=_0x21afca;return SceneManager[_0x39f5d9(0x177)][_0x39f5d9(0x134)];},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)]['containerPosition']=function(){const _0x48e313=_0x21afca,_0x1ce12f=this['battler']();if(!_0x1ce12f)return this[_0x48e313(0x137)]();if(_0x1ce12f===BattleManager[_0x48e313(0xf4)])return 0x0;if(BattleManager[_0x48e313(0xb7)][_0x48e313(0x169)](_0x1ce12f)){const _0x24e71f=BattleManager[_0x48e313(0xb7)][_0x48e313(0x1b0)](_0x1ce12f)+0x1;return _0x24e71f;}return this[_0x48e313(0x137)]();},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0x124)]=function(_0x6299fb){const _0x1a91a1=_0x21afca,_0x356108=Window_BTB_TurnOrder[_0x1a91a1(0x23a)];this['_fadeDuration']=_0x356108['UpdateFrames'],this['_fadeTarget']=_0x6299fb;},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0x140)]=function(){const _0x5022ef=_0x21afca,_0x19ad5c=this['battler']();if(!_0x19ad5c)return;if(this[_0x5022ef(0x1e8)]===_0x19ad5c[_0x5022ef(0xea)]()&&this[_0x5022ef(0x17f)]===_0x19ad5c['isAppeared']())return;this[_0x5022ef(0x1e8)]=_0x19ad5c[_0x5022ef(0xea)](),this['_isAppeared']=_0x19ad5c[_0x5022ef(0x171)]();let _0x2ffd14=this[_0x5022ef(0x1e8)]&&this[_0x5022ef(0x17f)]?0xff:0x0;this[_0x5022ef(0x124)](_0x2ffd14);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x21afca(0x138)]=function(){const _0x2c5da2=_0x21afca;if(this[_0x2c5da2(0x29a)]>0x0){const _0x53891f=this[_0x2c5da2(0x29a)];this[_0x2c5da2(0x113)]=(this['opacity']*(_0x53891f-0x1)+this[_0x2c5da2(0x2c2)])/_0x53891f,this[_0x2c5da2(0x29a)]--,this['_fadeDuration']<=0x0&&(this[_0x2c5da2(0x103)](),this[_0x2c5da2(0x1f1)]=0x0,this[_0x2c5da2(0x222)](),this[_0x2c5da2(0x113)]=this[_0x2c5da2(0x2c2)]);}if(this[_0x2c5da2(0xde)])return;BattleManager['_phase']===_0x2c5da2(0x15a)&&(this[_0x2c5da2(0xde)]=!![],this[_0x2c5da2(0x124)](0x0));},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0xe3)]=function(){const _0x3c5947=_0x21afca,_0x1653c4=this[_0x3c5947(0x2a2)]();if(!_0x1653c4)return;const _0x214cb8=Window_BTB_TurnOrder[_0x3c5947(0x23a)],_0x57f0a2=this['_unit']===$gameParty?_0x3c5947(0x224):_0x3c5947(0x170);let _0x3e94e4=_0x1653c4[_0x3c5947(0x132)]();if(_0x1653c4[_0x3c5947(0x1eb)]()&&_0x3e94e4===_0x3c5947(0xc2))_0x3e94e4='face';else _0x1653c4[_0x3c5947(0x1e9)]()&&_0x3e94e4===_0x3c5947(0x191)&&(_0x3e94e4='enemy');if(this[_0x3c5947(0xed)]!==_0x3e94e4)return this['processUpdateGraphic']();switch(this[_0x3c5947(0xed)]){case _0x3c5947(0x243):if(this[_0x3c5947(0xc1)]!==_0x1653c4[_0x3c5947(0xb2)]())return this[_0x3c5947(0x183)]();if(this[_0x3c5947(0x1bd)]!==_0x1653c4[_0x3c5947(0x186)]())return this[_0x3c5947(0x183)]();break;case'icon':if(this['_graphicIconIndex']!==_0x1653c4[_0x3c5947(0xa3)]())return this[_0x3c5947(0x183)]();break;case _0x3c5947(0xc2):if(_0x1653c4[_0x3c5947(0x17d)]()){if(this[_0x3c5947(0x211)]!==_0x1653c4['svBattlerName']())return this['processUpdateGraphic']();}else{if(this[_0x3c5947(0xc9)]!==_0x1653c4['battlerName']())return this['processUpdateGraphic']();}break;case'svactor':if(_0x1653c4['isActor']()){if(this[_0x3c5947(0x211)]!==_0x1653c4[_0x3c5947(0x1a9)]())return this[_0x3c5947(0x183)]();}else{if(this[_0x3c5947(0xc9)]!==_0x1653c4[_0x3c5947(0x1a9)]())return this[_0x3c5947(0x183)]();}break;}},Sprite_BTB_TurnOrder_Battler['prototype'][_0x21afca(0x183)]=function(){const _0x454aa7=_0x21afca,_0xc44e97=this[_0x454aa7(0x2a2)]();if(!_0xc44e97)return;this['_graphicType']=_0xc44e97['TurnOrderBTBGraphicType']();if(_0xc44e97[_0x454aa7(0x1eb)]()&&this[_0x454aa7(0xed)]===_0x454aa7(0xc2))this['_graphicType']='face';else _0xc44e97[_0x454aa7(0x1e9)]()&&this[_0x454aa7(0xed)]===_0x454aa7(0x191)&&(this[_0x454aa7(0xed)]='enemy');let _0x40e02b;switch(this[_0x454aa7(0xed)]){case'face':this[_0x454aa7(0xc1)]=_0xc44e97['TurnOrderBTBGraphicFaceName'](),this[_0x454aa7(0x1bd)]=_0xc44e97['TurnOrderBTBGraphicFaceIndex'](),_0x40e02b=ImageManager[_0x454aa7(0x2c1)](this[_0x454aa7(0xc1)]),_0x40e02b['addLoadListener'](this[_0x454aa7(0x29b)]['bind'](this,_0x40e02b));break;case _0x454aa7(0x1bb):this[_0x454aa7(0x265)]=_0xc44e97['createTurnOrderBTBGraphicIconIndex'](),_0x40e02b=ImageManager[_0x454aa7(0x1a6)]('IconSet'),_0x40e02b[_0x454aa7(0x1aa)](this[_0x454aa7(0x2ba)][_0x454aa7(0xc8)](this,_0x40e02b));break;case'enemy':if(_0xc44e97[_0x454aa7(0x17d)]())this['_graphicSv']=_0xc44e97[_0x454aa7(0x1ca)](),_0x40e02b=ImageManager['loadSvActor'](this[_0x454aa7(0x211)]),_0x40e02b['addLoadListener'](this[_0x454aa7(0x14f)][_0x454aa7(0xc8)](this,_0x40e02b));else $gameSystem['isSideView']()?(this[_0x454aa7(0xc9)]=_0xc44e97[_0x454aa7(0x1a9)](),_0x40e02b=ImageManager[_0x454aa7(0x228)](this[_0x454aa7(0xc9)]),_0x40e02b[_0x454aa7(0x1aa)](this[_0x454aa7(0xe4)][_0x454aa7(0xc8)](this,_0x40e02b))):(this['_graphicEnemy']=_0xc44e97[_0x454aa7(0x1a9)](),_0x40e02b=ImageManager['loadEnemy'](this[_0x454aa7(0xc9)]),_0x40e02b[_0x454aa7(0x1aa)](this['changeEnemyGraphicBitmap'][_0x454aa7(0xc8)](this,_0x40e02b)));break;case'svactor':this[_0x454aa7(0x211)]=_0xc44e97['battlerName'](),_0x40e02b=ImageManager[_0x454aa7(0x98)](this['_graphicSv']),_0x40e02b[_0x454aa7(0x1aa)](this[_0x454aa7(0x14f)]['bind'](this,_0x40e02b));break;}},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)]['changeFaceGraphicBitmap']=function(_0x12002b){const _0x4a7363=_0x21afca,_0x4e13aa=this['_graphicFaceIndex'],_0x1c2f35=this['bitmapWidth'](),_0x8d1d0d=this[_0x4a7363(0x203)](),_0x667c92=Math[_0x4a7363(0x117)](_0x1c2f35,_0x8d1d0d);this[_0x4a7363(0x1d9)][_0x4a7363(0x1cf)]=new Bitmap(_0x1c2f35,_0x8d1d0d);const _0x25b7df=this[_0x4a7363(0x1d9)][_0x4a7363(0x1cf)],_0x23ff76=ImageManager[_0x4a7363(0x245)],_0x44599d=ImageManager[_0x4a7363(0x19b)],_0x5b5e03=_0x667c92/Math['max'](_0x23ff76,_0x44599d),_0x45c1da=ImageManager[_0x4a7363(0x245)],_0x218577=ImageManager['faceHeight'],_0x30a3a9=_0x4e13aa%0x4*_0x23ff76+(_0x23ff76-_0x45c1da)/0x2,_0x590d69=Math[_0x4a7363(0x1b7)](_0x4e13aa/0x4)*_0x44599d+(_0x44599d-_0x218577)/0x2,_0x3fe4f5=(_0x1c2f35-_0x23ff76*_0x5b5e03)/0x2,_0x375ff6=(_0x8d1d0d-_0x44599d*_0x5b5e03)/0x2;_0x25b7df[_0x4a7363(0x2a6)](_0x12002b,_0x30a3a9,_0x590d69,_0x45c1da,_0x218577,_0x3fe4f5,_0x375ff6,_0x667c92,_0x667c92);},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0x2ba)]=function(_0x5782c7){const _0xaa31e=_0x21afca,_0x3eb9d8=this[_0xaa31e(0x265)],_0x407cd1=this[_0xaa31e(0x200)](),_0x495c0f=this[_0xaa31e(0x203)]();this[_0xaa31e(0x1d9)][_0xaa31e(0x1cf)]=new Bitmap(_0x407cd1,_0x495c0f);const _0x95056d=this[_0xaa31e(0x1d9)][_0xaa31e(0x1cf)],_0x1fe771=ImageManager[_0xaa31e(0xe2)],_0x4672a7=ImageManager[_0xaa31e(0x2cf)],_0x136fcb=Math[_0xaa31e(0xd3)](_0x1fe771,_0x4672a7,_0x407cd1,_0x495c0f),_0x21d0f4=_0x3eb9d8%0x10*_0x1fe771,_0x4f37aa=Math[_0xaa31e(0x1b7)](_0x3eb9d8/0x10)*_0x4672a7,_0x4688da=Math[_0xaa31e(0x1b7)](Math[_0xaa31e(0x117)](_0x407cd1-_0x136fcb,0x0)/0x2),_0x140f48=Math[_0xaa31e(0x1b7)](Math['max'](_0x495c0f-_0x136fcb,0x0)/0x2);_0x95056d['blt'](_0x5782c7,_0x21d0f4,_0x4f37aa,_0x1fe771,_0x4672a7,_0x4688da,_0x140f48,_0x136fcb,_0x136fcb);},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)]['changeSvActorGraphicBitmap']=function(_0x3c06b6){const _0x4460b1=_0x21afca,_0x544c94=this['bitmapWidth'](),_0x2b84ef=this[_0x4460b1(0x203)](),_0x4f9102=Math[_0x4460b1(0xd3)](_0x544c94,_0x2b84ef);this[_0x4460b1(0x1d9)][_0x4460b1(0x1cf)]=new Bitmap(_0x544c94,_0x2b84ef);const _0x2b79f5=this['_graphicSprite']['bitmap'],_0x1acc16=this[_0x4460b1(0x211)][_0x4460b1(0x2b7)](/\$/i),_0x985293=_0x1acc16?0x1:ImageManager['svActorHorzCells'],_0x1a37cb=_0x1acc16?0x1:ImageManager['svActorVertCells'],_0x52fe81=_0x3c06b6[_0x4460b1(0x9b)]/_0x985293,_0x3c6b8d=_0x3c06b6[_0x4460b1(0x16a)]/_0x1a37cb,_0x3a1437=Math[_0x4460b1(0xd3)](0x1,_0x4f9102/_0x52fe81,_0x4f9102/_0x3c6b8d),_0x28c1ed=_0x52fe81*_0x3a1437,_0x199fe6=_0x3c6b8d*_0x3a1437,_0x3a6f1f=Math[_0x4460b1(0x87)]((_0x544c94-_0x28c1ed)/0x2),_0x3e71d4=Math[_0x4460b1(0x87)]((_0x2b84ef-_0x199fe6)/0x2);_0x2b79f5[_0x4460b1(0x2a6)](_0x3c06b6,0x0,0x0,_0x52fe81,_0x3c6b8d,_0x3a6f1f,_0x3e71d4,_0x28c1ed,_0x199fe6);},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0xe4)]=function(_0x4b386a){const _0x449d0a=_0x21afca,_0x34ef71=Window_BTB_TurnOrder[_0x449d0a(0x23a)],_0x705291=this[_0x449d0a(0x200)](),_0x24a12a=this[_0x449d0a(0x203)](),_0x3dbf05=Math[_0x449d0a(0xd3)](_0x705291,_0x24a12a);this[_0x449d0a(0x1d9)][_0x449d0a(0x1cf)]=new Bitmap(_0x705291,_0x24a12a);const _0x2ef2b3=this[_0x449d0a(0x1d9)][_0x449d0a(0x1cf)],_0xd2edf2=Math[_0x449d0a(0xd3)](0x1,_0x3dbf05/_0x4b386a[_0x449d0a(0x9b)],_0x3dbf05/_0x4b386a[_0x449d0a(0x16a)]),_0x53d076=_0x4b386a[_0x449d0a(0x9b)]*_0xd2edf2,_0x19c3f7=_0x4b386a['height']*_0xd2edf2,_0x576417=Math[_0x449d0a(0x87)]((_0x705291-_0x53d076)/0x2),_0x598a8e=Math[_0x449d0a(0x87)]((_0x24a12a-_0x19c3f7)/0x2);_0x2ef2b3[_0x449d0a(0x2a6)](_0x4b386a,0x0,0x0,_0x4b386a[_0x449d0a(0x9b)],_0x4b386a['height'],_0x576417,_0x598a8e,_0x53d076,_0x19c3f7);},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0x20c)]=function(){const _0x391892=_0x21afca,_0x40de34=this[_0x391892(0x2a2)]();if(!_0x40de34)return;if(!_0x40de34[_0x391892(0x1e9)]())return;if(this['_graphicHue']===_0x40de34['battlerHue']())return;this[_0x391892(0x248)]=_0x40de34[_0x391892(0x18a)](),this[_0x391892(0x1d9)]['setHue'](_0x40de34[_0x391892(0x17d)]()?0x0:this[_0x391892(0x248)]);},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0x91)]=function(){const _0x158eb4=_0x21afca;if(!this[_0x158eb4(0x11b)])return;const _0x1e259b=this['battler']();if(!_0x1e259b)return;if(this[_0x158eb4(0x145)]===_0x1e259b['_letter']&&this[_0x158eb4(0x111)]===_0x1e259b[_0x158eb4(0x111)])return;this[_0x158eb4(0x145)]=_0x1e259b[_0x158eb4(0x145)],this[_0x158eb4(0x111)]=_0x1e259b[_0x158eb4(0x111)];const _0x10da6e=Window_BTB_TurnOrder['Settings'],_0x5ad09c=this[_0x158eb4(0x2ae)](),_0x84991b=this[_0x158eb4(0x200)](),_0x388dde=this[_0x158eb4(0x203)](),_0x141a76=this[_0x158eb4(0x11b)]['bitmap'];_0x141a76[_0x158eb4(0x20e)]();if(!this[_0x158eb4(0x111)])return;_0x141a76['fontFace']=_0x10da6e['EnemyBattlerFontFace']||$gameSystem[_0x158eb4(0x1fc)](),_0x141a76['fontSize']=_0x10da6e[_0x158eb4(0x240)]||0x10,_0x5ad09c?_0x141a76['drawText'](this[_0x158eb4(0x145)][_0x158eb4(0x151)](),0x0,_0x388dde/0x2,_0x84991b,_0x388dde/0x2,_0x158eb4(0xba)):_0x141a76[_0x158eb4(0x27c)](this[_0x158eb4(0x145)][_0x158eb4(0x151)](),0x0,0x2,_0x84991b-0x8,_0x388dde-0x4,_0x158eb4(0x104));},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0x190)]=function(){const _0x234b5d=_0x21afca,_0x339ad2=this['battler']();if(!_0x339ad2)return;const _0x247c20=_0x339ad2[_0x234b5d(0x2a2)]();if(!_0x247c20)return;const _0x244c84=_0x247c20['mainSprite']();if(!_0x244c84)return;this['setBlendColor'](_0x244c84['_blendColor']);},Sprite_BTB_TurnOrder_Battler[_0x21afca(0x1db)][_0x21afca(0xc6)]=function(){const _0x1fb63c=_0x21afca;return this[_0x1fb63c(0x2a2)]();},VisuMZ['BattleSystemBTB'][_0x21afca(0x94)]=Window_Base[_0x21afca(0x1db)][_0x21afca(0x21b)],Window_Base[_0x21afca(0x1db)]['makeAdditionalSkillCostText']=function(_0x472b89,_0x1431e1,_0x6e5a0a){const _0x14c460=_0x21afca;return _0x6e5a0a=VisuMZ[_0x14c460(0x1fb)][_0x14c460(0x94)][_0x14c460(0x1e4)](this,_0x472b89,_0x1431e1,_0x6e5a0a),_0x6e5a0a=this[_0x14c460(0xb3)](_0x472b89,_0x1431e1,_0x6e5a0a),_0x6e5a0a;},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x175)]=Window_Base[_0x21afca(0x1db)][_0x21afca(0x144)],Window_Base[_0x21afca(0x1db)]['drawItemNumber']=function(_0x180b38,_0x123e77,_0x36abd9,_0x525366){const _0x235534=_0x21afca;BattleManager['isBTB']()&&this[_0x235534(0x81)]===Window_BattleItem?this[_0x235534(0x207)](_0x180b38,_0x123e77,_0x36abd9,_0x525366):VisuMZ[_0x235534(0x1fb)][_0x235534(0x175)]['call'](this,_0x180b38,_0x123e77,_0x36abd9,_0x525366),this['resetFontSettings']();},Window_Base[_0x21afca(0x1db)][_0x21afca(0x207)]=function(_0x5929e3,_0x1bb3ad,_0x3cd470,_0x5f03ec){const _0x7c8e4b=_0x21afca,_0x50f811=VisuMZ[_0x7c8e4b(0x1fb)]['Settings']['General'],_0x57aae5=BattleManager['_actor']||$gameParty[_0x7c8e4b(0x13b)]()[0x0],_0x10d107=this[_0x7c8e4b(0xb3)](_0x57aae5,_0x5929e3,''),_0x5a4a19=this['textSizeEx'](_0x10d107)[_0x7c8e4b(0x9b)],_0x42932c=_0x50f811[_0x7c8e4b(0x8c)];let _0x43cccf=_0x1bb3ad+_0x5f03ec-_0x5a4a19;if(_0x10d107==='')VisuMZ[_0x7c8e4b(0x1fb)]['Window_Base_drawItemNumber'][_0x7c8e4b(0x1e4)](this,_0x5929e3,_0x1bb3ad,_0x3cd470,_0x5f03ec);else{if(this[_0x7c8e4b(0x24b)](_0x5929e3)){this[_0x7c8e4b(0x27f)]();const _0x45a59b=VisuMZ['ItemsEquipsCore']['Settings']['ItemScene'];this[_0x7c8e4b(0x194)][_0x7c8e4b(0x1dc)]=_0x45a59b['ItemQuantityFontSize'];if(_0x42932c){const _0x5d3aeb=_0x45a59b['ItemQuantityFmt'],_0x85e979=_0x5d3aeb['format']($gameParty[_0x7c8e4b(0x17b)](_0x5929e3)),_0x22599b=this[_0x7c8e4b(0x25d)](_0x85e979+this[_0x7c8e4b(0x1c3)]());_0x43cccf-=_0x22599b;}else _0x5f03ec-=this[_0x7c8e4b(0x25d)](this[_0x7c8e4b(0x1c3)]())+_0x5a4a19;VisuMZ['BattleSystemBTB'][_0x7c8e4b(0x175)][_0x7c8e4b(0x1e4)](this,_0x5929e3,_0x1bb3ad,_0x3cd470,_0x5f03ec);}}this[_0x7c8e4b(0x274)](_0x10d107,_0x43cccf,_0x3cd470);},Window_Base[_0x21afca(0x1db)][_0x21afca(0xb3)]=function(_0x36e100,_0x192178,_0x5957a7){const _0x1fd545=_0x21afca;if(!BattleManager[_0x1fd545(0x235)]())return _0x5957a7;if(!_0x36e100)return _0x5957a7;if(!_0x192178)return _0x5957a7;if(_0x192178[_0x1fd545(0x173)]['match'](VisuMZ[_0x1fd545(0x1fb)][_0x1fd545(0x2af)][_0x1fd545(0xef)]))return _0x5957a7;let _0x436259=_0x36e100[_0x1fd545(0x1ce)](_0x192178);const _0x15bfab=VisuMZ[_0x1fd545(0x1fb)][_0x1fd545(0x23a)][_0x1fd545(0x2ac)],_0x50a3e8=_0x15bfab[_0x1fd545(0x8c)],_0x29a0cc=_0x15bfab[_0x1fd545(0x9a)],_0x472bb4=_0x15bfab[_0x1fd545(0x1a5)],_0xadc2ef=_0x15bfab[_0x1fd545(0x14a)]||0x0,_0x321f4c=_0x15bfab[_0x1fd545(0x99)],_0x9d7428=_0x15bfab['Show_1_BP_Cost'];if(DataManager[_0x1fd545(0x1c4)](_0x192178)&&this['constructor']===Window_ActorCommand){if(!_0x29a0cc&&_0x192178['id']===_0x36e100[_0x1fd545(0x25b)]())return _0x5957a7;if(!_0x472bb4&&_0x192178['id']===_0x36e100[_0x1fd545(0xfb)]())return _0x5957a7;}_0x436259-=_0xadc2ef;if(_0x436259<0x0)return _0x5957a7;if(!_0x321f4c&&_0x436259===0x0)return _0x5957a7;if(!_0x9d7428&&_0x436259===0x1)return _0x5957a7;const _0x48473d=_0x1fd545(0x1e6)['format'](ImageManager[_0x1fd545(0x2c5)]),_0x262939=TextManager[_0x1fd545(0x26d)];let _0x5d4237=TextManager[_0x1fd545(0x272)]['format'](_0x436259,_0x262939,_0x48473d);if(_0x5957a7==='')_0x5957a7+=_0x5d4237;else _0x50a3e8?_0x5957a7=_0x5d4237+this[_0x1fd545(0x1c3)]()+_0x5957a7:_0x5957a7=_0x5957a7+this[_0x1fd545(0x1c3)]()+_0x5d4237;return _0x5957a7;},Window_Selectable['prototype']['isBattleItemWindowBTB']=function(){return![];},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x298)]=Window_Selectable[_0x21afca(0x1db)][_0x21afca(0x174)],Window_Selectable['prototype'][_0x21afca(0x174)]=function(_0x332806){const _0x117bba=_0x21afca;VisuMZ['BattleSystemBTB'][_0x117bba(0x298)]['call'](this,_0x332806),this[_0x117bba(0x2a8)]()&&this['active']&&this[_0x117bba(0x29d)]();},Window_Selectable[_0x21afca(0x1db)][_0x21afca(0x29d)]=function(){const _0x302dfd=_0x21afca;BattleManager[_0x302dfd(0x249)]();},VisuMZ['BattleSystemBTB'][_0x21afca(0x2bc)]=Window_Help[_0x21afca(0x1db)]['setItem'],Window_Help['prototype']['setItem']=function(_0x3a3d08){const _0x2ad487=_0x21afca;BattleManager[_0x2ad487(0x235)]()&&_0x3a3d08&&_0x3a3d08[_0x2ad487(0x173)]&&_0x3a3d08['note']['match'](VisuMZ[_0x2ad487(0x1fb)][_0x2ad487(0x2af)]['BTB_Help'])?this[_0x2ad487(0x120)](String(RegExp['$1'])):VisuMZ[_0x2ad487(0x1fb)][_0x2ad487(0x2bc)][_0x2ad487(0x1e4)](this,_0x3a3d08);},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0xda)]=Window_BattleLog[_0x21afca(0x1db)][_0x21afca(0x198)],Window_BattleLog[_0x21afca(0x1db)][_0x21afca(0x198)]=function(_0x5162d8,_0xf8dab2,_0x20a827){const _0x13ae0f=_0x21afca;this['showBraveAnimationBTB'](_0x5162d8)?this[_0x13ae0f(0xcf)](_0x5162d8,_0xf8dab2,_0x20a827):VisuMZ[_0x13ae0f(0x1fb)]['Window_BattleLog_startAction'][_0x13ae0f(0x1e4)](this,_0x5162d8,_0xf8dab2,_0x20a827);},Window_BattleLog[_0x21afca(0x1db)][_0x21afca(0x204)]=function(_0xf7d8aa,_0x412615,_0x31bf3f){const _0xd19652=_0x21afca;VisuMZ[_0xd19652(0x1fb)][_0xd19652(0xda)][_0xd19652(0x1e4)](this,_0xf7d8aa,_0x412615,_0x31bf3f);},Window_BattleLog[_0x21afca(0x1db)][_0x21afca(0x27d)]=function(_0x1d6e5b){const _0x3eab10=_0x21afca;if(!BattleManager[_0x3eab10(0x235)]())return![];if(!_0x1d6e5b)return![];if(!_0x1d6e5b[_0x3eab10(0x1e9)]())return![];if(_0x1d6e5b['_braveStartupAnimation'])return![];const _0x34cc34=VisuMZ[_0x3eab10(0x1fb)][_0x3eab10(0x23a)][_0x3eab10(0xc4)];if(!_0x34cc34[_0x3eab10(0x2c4)])return![];if(_0x34cc34[_0x3eab10(0xa8)]<=0x0)return![];return VisuMZ[_0x3eab10(0x1fb)][_0x3eab10(0x23a)][_0x3eab10(0xc4)]['ShowEnemyBrave'];},Window_BattleLog[_0x21afca(0x1db)][_0x21afca(0xcf)]=function(_0x25c41b,_0x2cb937,_0x3bd019){const _0x5065e4=_0x21afca;_0x25c41b['_braveStartupAnimation']=!![];let _0x694ee9=_0x25c41b[_0x5065e4(0x21e)]();const _0x2b19fc=VisuMZ[_0x5065e4(0x1fb)][_0x5065e4(0x23a)][_0x5065e4(0xc4)],_0x510c9d=_0x2b19fc[_0x5065e4(0xa8)],_0xebb4d8=_0x2b19fc[_0x5065e4(0x205)];while(_0x694ee9--){this[_0x5065e4(0x2bb)](_0x5065e4(0x1ab),[_0x25c41b],_0x510c9d),_0x694ee9>0x0?this['push']('waitCount',_0xebb4d8):this[_0x5065e4(0x2bb)](_0x5065e4(0x288));}this[_0x5065e4(0x2bb)](_0x5065e4(0x204),_0x25c41b,_0x2cb937,_0x3bd019);},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0xdb)]=Window_ActorCommand['prototype'][_0x21afca(0x12f)],Window_ActorCommand['prototype'][_0x21afca(0x12f)]=function(){const _0x1fc509=_0x21afca;this[_0x1fc509(0x1dd)](),VisuMZ[_0x1fc509(0x1fb)][_0x1fc509(0xdb)][_0x1fc509(0x1e4)](this);},Window_ActorCommand[_0x21afca(0x1db)][_0x21afca(0x1dd)]=function(){const _0x487b76=_0x21afca;if(!this['canAddBraveCommand']())return;const _0x4f95ba=this[_0x487b76(0x237)](),_0xa5ab0e=TextManager[_0x487b76(0x1b3)],_0x236c71=ImageManager[_0x487b76(0x2c5)],_0x213cd6=_0x4f95ba===_0x487b76(0x236)?_0xa5ab0e:_0x487b76(0x20f)[_0x487b76(0x101)](_0x236c71,_0xa5ab0e);this[_0x487b76(0x2c3)](_0x213cd6,_0x487b76(0x226),this[_0x487b76(0x233)][_0x487b76(0x10d)]()),BattleManager['refreshStatusBTB']();},Window_ActorCommand[_0x21afca(0x1db)][_0x21afca(0x139)]=function(){const _0x17d662=_0x21afca;if(!BattleManager['isBTB']())return![];if(!VisuMZ[_0x17d662(0x1fb)]['Settings']['Window'][_0x17d662(0x1ba)])return![];if(this[_0x17d662(0x233)]&&this[_0x17d662(0x233)][_0x17d662(0x1c6)]())return![];return!![];},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x1ee)]=Window_ActorCommand[_0x21afca(0x1db)][_0x21afca(0x234)],Window_ActorCommand[_0x21afca(0x1db)]['setup']=function(_0x2f3802){const _0x12f969=_0x21afca;VisuMZ[_0x12f969(0x1fb)][_0x12f969(0x1ee)][_0x12f969(0x1e4)](this,_0x2f3802),this[_0x12f969(0x280)]();},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x26c)]=Window_Selectable[_0x21afca(0x1db)][_0x21afca(0x2d0)],Window_Selectable[_0x21afca(0x1db)][_0x21afca(0x2d0)]=function(){const _0x5ce06c=_0x21afca;this[_0x5ce06c(0x1f6)]()?this[_0x5ce06c(0x233)]&&!this[_0x5ce06c(0x233)]['hideBraveTrait']()&&this['_actor'][_0x5ce06c(0x10d)]()&&SceneManager[_0x5ce06c(0x177)][_0x5ce06c(0xd0)]():VisuMZ[_0x5ce06c(0x1fb)][_0x5ce06c(0x26c)][_0x5ce06c(0x1e4)](this);},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x12b)]=Window_Selectable[_0x21afca(0x1db)]['cursorPageup'],Window_Selectable[_0x21afca(0x1db)][_0x21afca(0x213)]=function(){const _0x572227=_0x21afca;this[_0x572227(0x1f6)]()?this['_actor']&&!this[_0x572227(0x233)]['hideBraveTrait']()&&this[_0x572227(0x233)]['numActions']()>0x1&&SceneManager[_0x572227(0x177)][_0x572227(0x1d7)]():VisuMZ[_0x572227(0x1fb)][_0x572227(0x12b)]['call'](this);},Window_Selectable[_0x21afca(0x1db)][_0x21afca(0x1f6)]=function(){const _0x2bfc79=_0x21afca;if(this['constructor']!==Window_ActorCommand)return![];if(!SceneManager[_0x2bfc79(0x267)]())return![];if(!BattleManager[_0x2bfc79(0x235)]())return![];return VisuMZ['BattleSystemBTB']['Settings'][_0x2bfc79(0x15c)]['BraveShortcuts'];},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0xca)]=Window_ActorCommand['prototype'][_0x21afca(0x21a)],Window_ActorCommand[_0x21afca(0x1db)][_0x21afca(0x21a)]=function(){const _0x50b368=_0x21afca;VisuMZ['BattleSystemBTB'][_0x50b368(0xca)][_0x50b368(0x1e4)](this),this[_0x50b368(0x280)]();},VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x25a)]=Window_Base['prototype'][_0x21afca(0x110)],Window_Base[_0x21afca(0x1db)][_0x21afca(0x110)]=function(){const _0x3815f2=_0x21afca;VisuMZ['BattleSystemBTB']['Window_Base_close'][_0x3815f2(0x1e4)](this),SceneManager['isSceneBattle']()&&this[_0x3815f2(0x1df)]&&this[_0x3815f2(0x1df)]();},Window_ActorCommand[_0x21afca(0x1db)]['destroyBTBActionCounters']=function(){const _0x1bd334=_0x21afca;if(!this[_0x1bd334(0x262)])return;this['_btbActionSprite'][_0x1bd334(0x1cf)]&&this['_btbActionSprite'][_0x1bd334(0x1cf)][_0x1bd334(0xfd)](),this[_0x1bd334(0x238)](this[_0x1bd334(0x262)]),delete this[_0x1bd334(0x262)];},Window_ActorCommand[_0x21afca(0x1db)]['createBTBActionCounters']=function(){const _0x31875a=_0x21afca;if(!BattleManager[_0x31875a(0x235)]())return;if(!this['_actor'])return;this[_0x31875a(0x1df)]();if(this[_0x31875a(0x233)][_0x31875a(0x1c6)]())return;this[_0x31875a(0x262)]=new Sprite(),this['addChild'](this[_0x31875a(0x262)]),this[_0x31875a(0x1ea)]();},Window_ActorCommand[_0x21afca(0x1db)][_0x21afca(0x1ea)]=function(){const _0x46c21b=_0x21afca,_0x171e4e=VisuMZ[_0x46c21b(0x1fb)][_0x46c21b(0x23a)]['Window']['DrawActionCountersJS'];_0x171e4e?_0x171e4e[_0x46c21b(0x1e4)](this,this[_0x46c21b(0x262)],this,this[_0x46c21b(0x233)]):this[_0x46c21b(0x253)][_0x46c21b(0x1e4)](this,this[_0x46c21b(0x262)],this,this[_0x46c21b(0x233)]);},Window_ActorCommand['prototype'][_0x21afca(0x253)]=function(){const _0x4d580c=_0x21afca,_0x14f007=arguments[0x0],_0x4c350c=arguments[0x1],_0x432b6e=arguments[0x2];_0x14f007['x']=Math[_0x4d580c(0x87)](_0x4c350c[_0x4d580c(0x9b)]/0x2),_0x14f007['y']=0x0,_0x14f007[_0x4d580c(0xcb)]['x']=0.5,_0x14f007[_0x4d580c(0xcb)]['y']=0.5;const _0x3dcfb7=TextManager['btbActionSlot'],_0x1289cd=TextManager['btbActionCurrent'];let _0x47fc20=_0x3dcfb7['repeat'](_0x432b6e[_0x4d580c(0x102)]());const _0x3e6351=_0x432b6e[_0x4d580c(0x2be)];_0x47fc20=_0x47fc20[_0x4d580c(0xc7)](0x0,_0x3e6351)+_0x1289cd+_0x47fc20[_0x4d580c(0xc7)](_0x3e6351+0x1);const _0x1fe6b5=new Bitmap(_0x4c350c[_0x4d580c(0x9b)],_0x4c350c[_0x4d580c(0x88)]());_0x1fe6b5[_0x4d580c(0x1dc)]=0x24,_0x1fe6b5[_0x4d580c(0x27c)](_0x47fc20,0x0,0x0,_0x1fe6b5[_0x4d580c(0x9b)],_0x1fe6b5['height'],_0x4d580c(0xba)),_0x14f007[_0x4d580c(0x1cf)]=_0x1fe6b5;},Window_ActorCommand[_0x21afca(0x1db)][_0x21afca(0x2a8)]=function(){return BattleManager['isBTB']();},Window_ActorCommand[_0x21afca(0x1db)][_0x21afca(0x29d)]=function(){const _0xa6f721=_0x21afca,_0x155448=BattleManager[_0xa6f721(0xa9)]();if(_0x155448){const _0xcb184e=this[_0xa6f721(0x1f5)]();switch(_0xcb184e){case _0xa6f721(0x15f):_0x155448[_0xa6f721(0x16f)]();break;case _0xa6f721(0xd5):_0x155448[_0xa6f721(0x146)]();break;case _0xa6f721(0xa1):_0x155448[_0xa6f721(0x11f)](this[_0xa6f721(0x1e0)]());break;default:_0x155448[_0xa6f721(0x11f)](null);break;}}Window_Command[_0xa6f721(0x1db)][_0xa6f721(0x29d)][_0xa6f721(0x1e4)](this);},Window_Base[_0x21afca(0x1db)][_0x21afca(0x1b6)]=function(_0x336b89,_0x305920,_0x4b14c4,_0x27875c,_0x5398c9){const _0x5deeae=_0x21afca;if(!_0x336b89)return;if(!BattleManager['isBTB']())return;const _0x299a3b=VisuMZ[_0x5deeae(0x1fb)]['Settings'][_0x5deeae(0x15c)],_0x57a6c4=BattleManager['isInputting']()?_0x299a3b['StatusPredictFmt']:_0x299a3b[_0x5deeae(0x105)],_0x56ef67=_0x299a3b['NeutralColor'],_0x4bb29e=_0x299a3b['PositiveColor'],_0x18a629=_0x299a3b['NegativeColor'];let _0x2392d9=0x0,_0xa2e711=0x0;_0xa2e711=_0x336b89[_0x5deeae(0x8f)]();if(_0xa2e711>0x0)_0x2392d9=_0x4bb29e;if(_0xa2e711===0x0)_0x2392d9=_0x56ef67;if(_0xa2e711<0x0)_0x2392d9=_0x18a629;const _0x338ed5=_0x5deeae(0x19c)[_0x5deeae(0x101)](_0x2392d9,_0xa2e711),_0x3b5622=_0x5deeae(0x1e6)[_0x5deeae(0x101)](ImageManager[_0x5deeae(0x2c5)]);_0xa2e711=_0x336b89[_0x5deeae(0x1c0)]();if(_0xa2e711>0x0)_0x2392d9=_0x4bb29e;if(_0xa2e711===0x0)_0x2392d9=_0x56ef67;_0xa2e711<0x0&&(_0x2392d9=_0x18a629);const _0x47a723='\x5cC[%1]%2\x5cC[0]'['format'](_0x2392d9,_0xa2e711);let _0x31be61=_0x57a6c4[_0x5deeae(0x101)](_0x338ed5,TextManager[_0x5deeae(0x26d)],_0x3b5622,_0x47a723);const _0x3af990=this['textSizeEx'](_0x31be61)[_0x5deeae(0x9b)];if(_0x5398c9===_0x5deeae(0xba))_0x305920+=Math[_0x5deeae(0x87)]((_0x27875c-_0x3af990)/0x2);else _0x5398c9===_0x5deeae(0x104)&&(_0x305920+=Math[_0x5deeae(0x87)](_0x27875c-_0x3af990));this['drawTextEx'](_0x31be61,_0x305920,_0x4b14c4,_0x27875c);},Window_StatusBase[_0x21afca(0x1db)][_0x21afca(0x1f3)]=function(_0x3ad49f){const _0x536cac=_0x21afca;if(!_0x3ad49f)return![];if(!BattleManager[_0x536cac(0x235)]())return![];if(!this[_0x536cac(0x189)])return![];if(_0x3ad49f['hideBraveTrait']())return![];const _0x28f66b=VisuMZ[_0x536cac(0x1fb)][_0x536cac(0x23a)][_0x536cac(0x15c)],_0x2c6a03=this['battleLayoutStyle']();return _0x28f66b[_0x536cac(0x212)[_0x536cac(0x101)](_0x2c6a03)];},VisuMZ[_0x21afca(0x1fb)]['Window_BattleStatus_drawItemStatusListStyle']=Window_BattleStatus[_0x21afca(0x1db)][_0x21afca(0x273)],Window_BattleStatus[_0x21afca(0x1db)][_0x21afca(0x273)]=function(_0xa8554c){const _0x571fed=_0x21afca;VisuMZ[_0x571fed(0x1fb)][_0x571fed(0x80)][_0x571fed(0x1e4)](this,_0xa8554c);const _0x287287=this['actor'](_0xa8554c);if(this[_0x571fed(0x1f3)](_0x287287)){const _0x1673cd=this[_0x571fed(0x254)](_0xa8554c),_0x596738=$dataSystem[_0x571fed(0x28e)]?0x4:0x3,_0x3d18e9=_0x596738*0x80+(_0x596738-0x1)*0x8+0x4;let _0xa02923=_0x1673cd['x']+this[_0x571fed(0x1a0)];VisuMZ['BattleCore'][_0x571fed(0x23a)]['BattleLayout'][_0x571fed(0x197)]?_0xa02923=_0x1673cd['x']+ImageManager[_0x571fed(0x245)]+0x8:_0xa02923+=ImageManager[_0x571fed(0xe2)];const _0x243a05=Math[_0x571fed(0x87)](Math[_0x571fed(0xd3)](_0x1673cd['x']+_0x1673cd[_0x571fed(0x9b)]-_0x3d18e9,_0xa02923));let _0x44588e=_0x243a05+0x88,_0x1dc92e=_0x1673cd['y'];_0x44588e+=0x88*($dataSystem[_0x571fed(0x28e)]?0x3:0x2),_0x44588e+=this['getOffsetX_BTB'](),_0x1dc92e+=this[_0x571fed(0x225)]();const _0xea66c5=this[_0x571fed(0xd8)]();if(_0x44588e>_0x1673cd['x']+_0x1673cd[_0x571fed(0x9b)])return;this[_0x571fed(0x1b6)](_0x287287,_0x44588e,_0x1dc92e,_0x1673cd[_0x571fed(0x9b)],_0xea66c5);}},VisuMZ['BattleSystemBTB'][_0x21afca(0x122)]=Window_BattleStatus[_0x21afca(0x1db)][_0x21afca(0xc0)],Window_BattleStatus['prototype'][_0x21afca(0xc0)]=function(_0x1e62e0){const _0x222efc=_0x21afca;VisuMZ[_0x222efc(0x1fb)][_0x222efc(0x122)][_0x222efc(0x1e4)](this,_0x1e62e0);const _0x244a54=this[_0x222efc(0x18f)](_0x1e62e0);if(this['showBravePoints'](_0x244a54)){const _0xf4cd0f=this[_0x222efc(0x299)](_0x1e62e0);let _0x4f7954=_0xf4cd0f['x'],_0x31f24d=_0xf4cd0f['y'];_0x4f7954+=this[_0x222efc(0x125)](),_0x31f24d+=this[_0x222efc(0x225)]();const _0x2e6951=this[_0x222efc(0xd8)]();this['drawActorBravePoints'](_0x244a54,_0x4f7954,_0x31f24d,_0xf4cd0f[_0x222efc(0x9b)],_0x2e6951);}},Window_BattleStatus[_0x21afca(0x1db)]['itemRectPortraitBTB']=function(_0x511857){const _0x51505b=_0x21afca,_0x4f6d01=this[_0x51505b(0x20a)](_0x511857);if(_0x4f6d01['width']<ImageManager[_0x51505b(0x245)])return _0x4f6d01;let _0x67a77b=Math[_0x51505b(0x87)]((_0x4f6d01[_0x51505b(0x9b)]-ImageManager[_0x51505b(0x245)])/0x2);return _0x4f6d01[_0x51505b(0x9b)]=ImageManager[_0x51505b(0x245)],_0x4f6d01['x']+=_0x67a77b,_0x4f6d01;},Window_BattleStatus[_0x21afca(0x1db)][_0x21afca(0xd8)]=function(){const _0x3f0cd3=_0x21afca,_0x55eb89=VisuMZ[_0x3f0cd3(0x1fb)][_0x3f0cd3(0x23a)][_0x3f0cd3(0x15c)],_0x39ce51=this[_0x3f0cd3(0x189)]();return _0x55eb89[_0x3f0cd3(0x1af)[_0x3f0cd3(0x101)](_0x39ce51)]||0x0;},Window_BattleStatus[_0x21afca(0x1db)][_0x21afca(0x125)]=function(){const _0xe18c7c=_0x21afca,_0x54abce=VisuMZ['BattleSystemBTB'][_0xe18c7c(0x23a)]['Window'],_0x340fee=this[_0xe18c7c(0x189)]();return _0x54abce[_0xe18c7c(0xaf)[_0xe18c7c(0x101)](_0x340fee)]||0x0;},Window_BattleStatus[_0x21afca(0x1db)][_0x21afca(0x225)]=function(){const _0x47bc2f=_0x21afca,_0x1fa79a=VisuMZ[_0x47bc2f(0x1fb)][_0x47bc2f(0x23a)][_0x47bc2f(0x15c)],_0x4201ce=this[_0x47bc2f(0x189)]();return _0x1fa79a[_0x47bc2f(0x25e)[_0x47bc2f(0x101)](_0x4201ce)]||0x0;},Window_BattleSkill[_0x21afca(0x1db)]['isBattleItemWindowBTB']=function(){const _0x217566=_0x21afca;return BattleManager[_0x217566(0x235)]();},Window_BattleSkill[_0x21afca(0x1db)][_0x21afca(0x29d)]=function(){const _0x409f3e=_0x21afca,_0x32c693=this['item'](),_0xe3261=BattleManager['inputtingAction']();if(_0xe3261)_0xe3261['setSkill'](_0x32c693?_0x32c693['id']:null);Window_SkillList['prototype'][_0x409f3e(0x29d)][_0x409f3e(0x1e4)](this);},Window_BattleItem[_0x21afca(0x1db)][_0x21afca(0x2a8)]=function(){return BattleManager['isBTB']();},Window_BattleItem[_0x21afca(0x1db)]['applyBattleItemWindowBTB']=function(){const _0x1ffd91=_0x21afca,_0x27d95a=this[_0x1ffd91(0x201)](),_0x343df7=BattleManager['inputtingAction']();if(_0x343df7)_0x343df7[_0x1ffd91(0x257)](_0x27d95a?_0x27d95a['id']:null);Window_ItemList[_0x1ffd91(0x1db)][_0x1ffd91(0x29d)]['call'](this);};function _0x5b28(_0xda6fa9,_0x4f1ca3){const _0x2e2622=_0x2e26();return _0x5b28=function(_0x5b285c,_0xb6f972){_0x5b285c=_0x5b285c-0x7f;let _0x532301=_0x2e2622[_0x5b285c];return _0x532301;},_0x5b28(_0xda6fa9,_0x4f1ca3);}function _0x2e26(){const _0x24be73=['WaitFrames','clearRect','drawItemNumberBTB','ActorBattlerIcon','_turnOrderContainer','itemRect','isTpb','updateGraphicHue','svActorHorzCells','clear','\x5cI[%1]%2','updatePadding','_graphicSv','%1_display','cursorPageup','performCollapse','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_btbSkillFlexFusion','CannotBrave','canUse','_btbTurnOrderFaceIndex','makeCommandList','makeAdditionalSkillCostText','useItem','_targetHomeY','braveAnimationTimes','_tempBattler','concat','canPayActionFusionCombination','updatePosition','Scene_Battle_createActorCommandWindow','Actor','getOffsetY_BTB','brave','Game_Battler_useItem','loadSvEnemy','501820HHmdcw','BtbTurnOrderEnemyFace','createTurnOrderBTBGraphicType','addInnerChild','makeActions','currentAction','VisuMZ_1_BattleCore','CancelAnimationID','_btbSkillStrictFusion','repositionLogWindowBTB','_actor','setup','isBTB','text','commandStyle','removeChild','_containerWidth','Settings','525063jRoRin','onDatabaseLoaded','faceIndex','BravePointAlterUser','btbPaySkillFusionCosts','EnemyBattlerFontSize','createGraphicSprite','BravePointRegenBase','face','_armors','faceWidth','TurnOrder','168JMtWIq','_graphicHue','sortActionOrdersBTB','%1Mirror','isDrawItemNumber','subject','ParseAllNotetags','startInput','compareBattlerSprites','ARRAYSTRUCT','createBackgroundSprite','_targetHomeX','modifyBTBActionCounterSprite_Fallback','itemLineRect','btbActionSlot','EnemyBattlerFaceName','setItem','_containerHeight','getFlexActionFusionCombinationsBTB','Window_Base_close','attackSkillId','test','textWidth','%1_offsetY','STRUCT','version','_actionFusionRecipe','_btbActionSprite','canInput','ARRAYFUNC','_graphicIconIndex','%1SystemBorder','isSceneBattle','canProcessActionFusionsBTB','BtbTurnOrderActorFace','getActionFusionRecipeItems','isItem','Window_Selectable_cursorPagedown','btbBravePointsAbbr','getItemIdWithName','gainBravePoints','requestFauxAnimation','Mechanics','btbCostFormat','drawItemStatusListStyle','drawTextEx','useItemBTB','_actions','predictedBravePointCost','EnemyBattlerType','Game_Actor_makeActions','FUNC','_braveStartupAnimation','drawText','showBraveAnimationBTB','BravePointItemCost','resetFontSettings','createBTBActionCounters','makeSpeed','boxHeight','%1SystemBg','minBravePoints','Scene_Boot_onDatabaseLoaded','allowRandomSpeed','calculateTargetPositions','waitForAnimation','process_VisuMZ_BattleSystemBTB_Notetags','EVAL','_position','_turnOrderInnerSprite','BravePointSetUser','optDisplayTp','createBattlerSprites','RepositionTopHelpX','_homeDuration','ConvertParams','formAllPossibleFlexCombos','initHomePositions','MaxActions','makeActionOrders','split','Window_Selectable_select','itemRectPortraitBTB','_fadeDuration','changeFaceGraphicBitmap','maxBraveActions','applyBattleItemWindowBTB','Game_BattlerBase_hide','_ogWindowLayerY','_helpWindow','Game_Unit_makeActions','battler','refreshStatusBTB','updateTurnOrder','top','blt','BravePointSkillCost','isBattleItemWindowBTB','description','Game_Action_allowRandomSpeed','BravePointsRegenAlive','General','initialize','isHorz','RegExp','makeDeepCopy','BattleManager_startTurn','ScreenBuffer','name','MaxVertSprites','Enemy-%1-%2','btbParseFusionData','match','Game_Battler_onBattleStart','cannotBraveTrait','changeIconGraphicBitmap','push','Window_Help_setItem','bottom','_actionInputIndex','AllowRandomSpeed','RepositionTopHelpY','loadFace','_fadeTarget','addCommand','ShowEnemyBrave','btbBravePointsIcon','create','exit','Game_Party_removeActor','BTB','BravePointStartFavor','_fullHeight','_bravePoints','_homeY','Game_Battler_makeActionTimes','iconHeight','cursorPagedown','slice','BTB_MAX_BRAVEPOINTS_DEFAULT','removeActionFusionIngredients','Window_BattleStatus_drawItemStatusListStyle','constructor','status','speed','containerPosition','_statusWindow','IconIndex','round','lineHeight','BattleManager_isTurnBased','HideBrave','Scene_Battle_onDisabledPartyCommandSelection','CostPosition','isActiveTpb','Cancel','bravePoints','BravePointPredictedCost','updateLetter','VisuMZ_0_CoreEngine','splice','Window_Base_makeAdditionalSkillCostText','hide','ShowMarkerBorder','updateTurnOrderBTB','loadSvActor','Show_0_BP_Cost','ShowCostForAttack','width','setBattleSystemBTBTurnOrderVisible','visible','2044504vCHUTn','_unit','623274ybYXKF','singleSkill','addChild','TurnOrderBTBGraphicIconIndex','BorderThickness','createLetterSprite','99wBCBBU','containerWindow','BraveAnimationID','inputtingAction','JSON','MinBravePointsDefault','createTurnOrderBTBGraphicIconIndex','sort','%1Mute','%1_offsetX','maxBattleMembers','updateVisibility','TurnOrderBTBGraphicFaceName','makeAdditionalCostTextBTB','map','checkActionsBTB','payBravePointsCost','_actionBattlers','STR','cancelBrave','center','Game_BattlerBase_canInput','createTurnOrderBTBGraphicFaceName','btbBravePointsFull','BTB_MAX_ACTIONS_HARD_CAP','checkTargetPositions','drawItemStatusXPStyle','_graphicFaceName','enemy','selectNextCommand','BraveAnimation','_btbTurnOrderFaceName','getStateTooltipBattler','substring','bind','_graphicEnemy','Window_ActorCommand_makeCommandList','anchor','process_VisuMZ_BattleSystemBTB_JS','_btbItemFlexFusion','FaceName','queueBraveAnimationsBTB','performBrave','getActionFusionRecipeSkills','ParseSkillNotetags','min','BravePointsAbbr','guard','getChildIndex','regenerateBravePoints','getAlignmentBTB','FusionStrict','Window_BattleLog_startAction','Window_ActorCommand_addGuardCommand','Actors','_btbTurnOrderVisible','_isBattleOver','SpriteLength','onBattleStartBTB','initMembers','iconWidth','updateGraphic','changeEnemyGraphicBitmap','BattleManager_startAction','BattleManager_isActiveTpb','removeActor','setBravePoints','commandCancelBTB','isAlive','fillRect','JsBravePointsTarget','_graphicType','createChildren','HideBravePointCost','windowRect','Game_Battler_onTurnEnd','createAllWindows','canGuard','_subject','btbMatchesCurrentFusionAction','traitObjects','getColor','Skill-%1-%2','createActorCommandWindow','484egnrev','guardSkillId','btbActionCurrent','destroy','Game_Action_setSkill','faceName','_skillIDs','format','numActions','checkPosition','right','StatusDisplayFmt','recalculateHome','ActionSlot','createBorderSprite','Actor-%1-%2','BattleManager_makeActionOrders','Game_BattlerBase_canUse','BTB_MIN_BRAVEPOINTS_HARD_CAP','canBrave','createBattlerRect','_items','close','_plural','%1BorderColor','opacity','updateSidePosition','OrderDirection','5020768rgsZRb','max','BattleManager_battleSys','commandBrave','getTotalActionFusionRecipes','_letterSprite','calcRegenBravePoints','_scrollX','setHandler','setSkill','setText','_index','Window_BattleStatus_drawItemStatusXPStyle','update','startFade','getOffsetX_BTB','onBattleStart','DisplayOffsetX','getBattleSystem','isForFriend','EnemyBattlerIcon','Window_Selectable_cursorPageup','createTurnOrderBTBGraphicFaceIndex','loseBravePoints','EnemyBattlerFaceIndex','addGuardCommand','btbRegisterFusions','BravePointAlterTarget','TurnOrderBTBGraphicType','Game_Action_applyItemUserEffect','_btbTurnOrderWindow','shift','Game_System_initialize','defaultPosition','updateOpacity','canAddBraveCommand','CommandName','members','_guardUnleash','ActorActionFusions','20RIEGJN','makeMultiActionsBTB','checkOpacity','Parse_Notetags_BravePointsUserJS','_btbTurnOrderIconIndex','BTB_MIN_BRAVEPOINTS_DEFAULT','drawItemNumber','_letter','setGuard','createActorCommandWindowBTB','_ogWindowLayerX','%1AnimationID','ReduceShownBPCost','gradientFillRect','10sSIiMN','getSkillIdWithName','_positionTargetY','changeSvActorGraphicBitmap','length','trim','removeActionBattlersBTB','CalcActionSpeedJS','BravePointsIcon','DisplayOffsetY','isBattleSystemBTBTurnOrderVisible','filter','Scene_Battle_createAllWindows','Game_Enemy_makeActions','battleEnd','Item-%1-%2','Window','_actorCommandWindow','cannotFusionNotetagBTB','attack','EnemyMultiAction','inBattle','1094kuyHax','Game_Action_speed','setActionFusionBTB','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ceil','requestRefresh','BattleManager_startInput','includes','height','CenterHorz','Game_BattlerBase_canGuard','BTB_MAX_BRAVEPOINTS_HARD_CAP','isTurnBased','setAttack','Enemy','isAppeared','52680CaGKOQ','note','select','Window_Base_drawItemNumber','_windowLayer','_scene','clamp','onDisabledPartyCommandSelection','formFlexCombo','numItems','BtbTurnOrderClearActorGraphic','hasSvBattler','onTurnEnd','_isAppeared','createBTBTurnOrderWindow','SpriteThin','maxBravePoints','processUpdateGraphic','clearActions','BravePointRegen','TurnOrderBTBGraphicFaceIndex','_scrollY','DisplayPosition','battleLayoutStyle','battlerHue','allBattleMembers','remove','JsBravePointsUser','some','actor','updateSelectionEffect','svactor','children','applyItemBattleSystemBTBUserEffect','contents','FaceIndex','MinBravePoints','ShowFacesListStyle','startAction','MaxBravePointsHardCap','RepositionTopForHelp','faceHeight','\x5cC[%1]%2\x5cC[0]','commandCancel','Brave','MaxActionsDefault','padding','BravePointCostFmt','parse','MaxBravePointsDefault','needsSelection','ShowCostForGuard','loadSystem','UpdateFrames','cancel','battlerName','addLoadListener','showNormalAnimation','Class-%1-%2','#000000','MaxHorzSprites','%1_align','indexOf','CannotFusion','onTurnEndBTB','btbBraveCommand','_homeX','process_VisuMZ_BattleSystemBTB','drawActorBravePoints','floor','updateBattleContainerOrder','_targetIndex','ShowCommand','icon','Game_Battler_performCollapse','_graphicFaceIndex','setBTBGraphicIconIndex','updateHomePosition','predictedBravePoints','left','BTB_MAX_ACTIONS_DEFAULT','skillCostSeparator','isSkill','_bypassAiValidCheck','hideBraveTrait','Game_BattlerBase_appear','addChildAt','_weapons','svBattlerName','BravePointsFull','_itemIDs','EnemyBattlerDrawLetter','bravePointsCost','bitmap','btbPayItemFusionCosts','Game_Action_setItem','_btbItemStrictFusion','initBattleSystemBTB','_btbTurnOrderGraphicType','_positionTargetX','_logWindow','reduceBrave','toUpperCase','_graphicSprite','applyItemUserEffect','prototype','fontSize','addBraveCommand','canActionFusionWithBTB','destroyBTBActionCounters','currentExt','clearTurnOrderBTBGraphics','battleSys','createKeyJS','call','processActionFusionsBTB','\x5cI[%1]','BravePointCost','_isAlive','isEnemy','modifyBTBActionCounterSprite','isActor','return\x200','refresh','Window_ActorCommand_setup','createTestBitmap','_backgroundSprite','_positionDuration','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','showBravePoints','index','currentSymbol','isUsePageUpDnShortcutBTB','MinBravePointsHardCap','Enemies','getStrictActionFusionCombinationsBTB','startTurn','BattleSystemBTB','mainFontFace','FusionFlex','_fullWidth','createInitialPositions','bitmapWidth','item','registerCommand','bitmapHeight','startActionBTB'];_0x2e26=function(){return _0x24be73;};return _0x2e26();}function Window_BTB_TurnOrder(){const _0x300f29=_0x21afca;this[_0x300f29(0x2ad)](...arguments);}Window_BTB_TurnOrder[_0x21afca(0x1db)]=Object[_0x21afca(0x2c6)](Window_Base['prototype']),Window_BTB_TurnOrder['prototype'][_0x21afca(0x81)]=Window_BTB_TurnOrder,Window_BTB_TurnOrder[_0x21afca(0x23a)]=VisuMZ[_0x21afca(0x1fb)][_0x21afca(0x23a)]['TurnOrder'],Window_BTB_TurnOrder[_0x21afca(0x1db)][_0x21afca(0x2ad)]=function(){const _0x6cec90=_0x21afca,_0x15b6b2=this['windowRect']();this[_0x6cec90(0x294)](_0x15b6b2),Window_Base[_0x6cec90(0x1db)][_0x6cec90(0x2ad)][_0x6cec90(0x1e4)](this,_0x15b6b2),this[_0x6cec90(0x28f)](),this['updateVisibility'](),this[_0x6cec90(0x113)]=0x0;},Window_BTB_TurnOrder['prototype'][_0x21afca(0xf0)]=function(){const _0x29d254=_0x21afca;return this[_0x29d254(0x10e)]($gameParty[_0x29d254(0xb0)](),0x9,!![]);},Window_BTB_TurnOrder['prototype'][_0x21afca(0x294)]=function(_0x58fc45){const _0x1d61c3=_0x21afca;this[_0x1d61c3(0x252)]=this['_homeX']=_0x58fc45['x'],this[_0x1d61c3(0x21d)]=this[_0x1d61c3(0x2cd)]=_0x58fc45['y'],this[_0x1d61c3(0x1fe)]=_0x58fc45[_0x1d61c3(0x9b)],this[_0x1d61c3(0x2cb)]=_0x58fc45[_0x1d61c3(0x16a)],this[_0x1d61c3(0x291)]=0x0;},Window_BTB_TurnOrder[_0x21afca(0x1db)]['createBattlerRect']=function(_0x37bfd7,_0x43cdd0,_0xce2300){const _0x2147bd=_0x21afca,_0x55f27d=Window_BTB_TurnOrder[_0x2147bd(0x23a)],_0x27f6ff=this[_0x2147bd(0x2ae)]()?_0x55f27d[_0x2147bd(0x1ae)]:_0x55f27d[_0x2147bd(0x2b4)],_0x270ee1=Math[_0x2147bd(0xd3)](_0x27f6ff,_0x37bfd7+_0x43cdd0),_0x154519=SceneManager[_0x2147bd(0x177)]['_statusWindow'][_0x2147bd(0x16a)],_0x15b876=SceneManager[_0x2147bd(0x177)][_0x2147bd(0x2a0)][_0x2147bd(0x16a)],_0x7132e5=_0x55f27d['SubjectDistance'],_0xe08dcb=Graphics['height']-_0x154519-_0x15b876;let _0x3dead2=0x0,_0x409308=0x0,_0x15cd7b=0x0,_0x297f54=0x0;switch(_0x55f27d[_0x2147bd(0x188)]){case _0x2147bd(0x2a5):_0x3dead2=_0x55f27d[_0x2147bd(0x181)]*_0x270ee1+_0x7132e5,_0x409308=_0x55f27d['SpriteLength'],_0x15cd7b=Math[_0x2147bd(0x166)]((Graphics[_0x2147bd(0x9b)]-_0x3dead2)/0x2),_0x297f54=_0x55f27d[_0x2147bd(0x2b2)];break;case _0x2147bd(0x2bd):_0x3dead2=_0x55f27d[_0x2147bd(0x181)]*_0x270ee1+_0x7132e5,_0x409308=_0x55f27d[_0x2147bd(0xdf)],_0x15cd7b=Math[_0x2147bd(0x166)]((Graphics[_0x2147bd(0x9b)]-_0x3dead2)/0x2),_0x297f54=Graphics[_0x2147bd(0x16a)]-_0x154519-_0x409308-_0x55f27d[_0x2147bd(0x2b2)];break;case _0x2147bd(0x1c1):_0x3dead2=_0x55f27d[_0x2147bd(0xdf)],_0x409308=_0x55f27d['SpriteThin']*_0x270ee1+_0x7132e5,_0x15cd7b=_0x55f27d['ScreenBuffer'],_0x297f54=Math[_0x2147bd(0x166)]((_0xe08dcb-_0x409308)/0x2),_0x297f54+=_0x15b876;break;case'right':_0x3dead2=_0x55f27d[_0x2147bd(0xdf)],_0x409308=_0x55f27d[_0x2147bd(0x181)]*_0x270ee1+_0x7132e5,_0x15cd7b=Graphics['width']-_0x3dead2-_0x55f27d[_0x2147bd(0x2b2)],_0x297f54=Math['ceil']((_0xe08dcb-_0x409308)/0x2),_0x297f54+=_0x15b876;break;}if(!_0xce2300){const _0x197b92=Window_BTB_TurnOrder[_0x2147bd(0x23a)][_0x2147bd(0x115)];let _0x2fc3bd=Math[_0x2147bd(0xd3)](_0x27f6ff,Math['min']($gameParty['maxBattleMembers']()+0x8)-_0x270ee1);switch(_0x55f27d[_0x2147bd(0x188)]){case _0x2147bd(0x2a5):case'bottom':_0x197b92&&(_0x15cd7b-=_0x2fc3bd*_0x55f27d['SpriteThin']);break;}}return _0x15cd7b+=_0x55f27d[_0x2147bd(0x127)],_0x297f54+=_0x55f27d[_0x2147bd(0x155)],new Rectangle(_0x15cd7b,_0x297f54,_0x3dead2,_0x409308);},Window_BTB_TurnOrder['prototype'][_0x21afca(0x210)]=function(){const _0x4759c7=_0x21afca;this[_0x4759c7(0x1a0)]=0x0;},Window_BTB_TurnOrder[_0x21afca(0x1db)]['isHorz']=function(){const _0x13fb5e=_0x21afca,_0x5a7048=Window_BTB_TurnOrder[_0x13fb5e(0x23a)],_0x42ca23=[_0x13fb5e(0x2a5),'bottom'][_0x13fb5e(0x169)](_0x5a7048[_0x13fb5e(0x188)]);return _0x42ca23;},Window_BTB_TurnOrder[_0x21afca(0x1db)][_0x21afca(0x28f)]=function(){const _0x3e5c27=_0x21afca;this['_turnOrderInnerSprite']=new Sprite(),this[_0x3e5c27(0x22c)](this[_0x3e5c27(0x28c)]),this[_0x3e5c27(0x209)]=[];for(let _0x2df84a=0x0;_0x2df84a<$gameParty[_0x3e5c27(0xb0)]();_0x2df84a++){const _0x11a203=new Sprite_BTB_TurnOrder_Battler($gameParty,_0x2df84a);this[_0x3e5c27(0x28c)][_0x3e5c27(0xa2)](_0x11a203),this[_0x3e5c27(0x209)][_0x3e5c27(0x2bb)](_0x11a203);}for(let _0x1ec687=0x0;_0x1ec687<$gameTroop[_0x3e5c27(0x13b)]()[_0x3e5c27(0x150)];_0x1ec687++){const _0x50e8d3=new Sprite_BTB_TurnOrder_Battler($gameTroop,_0x1ec687);this[_0x3e5c27(0x28c)][_0x3e5c27(0xa2)](_0x50e8d3),this[_0x3e5c27(0x209)][_0x3e5c27(0x2bb)](_0x50e8d3);}},Window_BTB_TurnOrder[_0x21afca(0x1db)][_0x21afca(0x123)]=function(){const _0x4211de=_0x21afca;Window_Base[_0x4211de(0x1db)][_0x4211de(0x123)][_0x4211de(0x1e4)](this),this[_0x4211de(0x1bf)](),this[_0x4211de(0x222)](),this[_0x4211de(0x114)](),this[_0x4211de(0x1b8)](),this[_0x4211de(0xb1)]();},Window_BTB_TurnOrder[_0x21afca(0x1db)][_0x21afca(0x1bf)]=function(){const _0x4bf742=_0x21afca;if(this['_homeDuration']>0x0){const _0x5c2aa4=this[_0x4bf742(0x291)];this['_homeX']=(this['_homeX']*(_0x5c2aa4-0x1)+this[_0x4bf742(0x252)])/_0x5c2aa4,this[_0x4bf742(0x2cd)]=(this[_0x4bf742(0x2cd)]*(_0x5c2aa4-0x1)+this[_0x4bf742(0x21d)])/_0x5c2aa4,this['_homeDuration']--,this['_homeDuration']<=0x0&&(this['_homeX']=this[_0x4bf742(0x252)],this[_0x4bf742(0x2cd)]=this[_0x4bf742(0x21d)]);}},Window_BTB_TurnOrder['prototype'][_0x21afca(0x222)]=function(){const _0x36239c=_0x21afca,_0x1c35b1=Window_BTB_TurnOrder['Settings'];if(_0x1c35b1['DisplayPosition']!==_0x36239c(0x2a5))return;if(!_0x1c35b1[_0x36239c(0x19a)])return;const _0x22ce40=SceneManager[_0x36239c(0x177)][_0x36239c(0x2a0)];if(!_0x22ce40)return;_0x22ce40[_0x36239c(0x9d)]?(this['x']=this[_0x36239c(0x1b4)]+(_0x1c35b1[_0x36239c(0x290)]||0x0),this['y']=this['_homeY']+(_0x1c35b1[_0x36239c(0x2c0)]||0x0)):(this['x']=this[_0x36239c(0x1b4)],this['y']=this[_0x36239c(0x2cd)]);const _0x1a2327=SceneManager['_scene']['_windowLayer'];this['_ogWindowLayerX']===undefined&&(this['_ogWindowLayerX']=Math[_0x36239c(0x87)]((Graphics[_0x36239c(0x9b)]-Math[_0x36239c(0xd3)](Graphics['boxWidth'],_0x1a2327[_0x36239c(0x9b)]))/0x2),this[_0x36239c(0x29f)]=Math[_0x36239c(0x87)]((Graphics['height']-Math[_0x36239c(0xd3)](Graphics[_0x36239c(0x282)],_0x1a2327[_0x36239c(0x16a)]))/0x2)),this['x']+=_0x1a2327['x']-this[_0x36239c(0x148)],this['y']+=_0x1a2327['y']-this['_ogWindowLayerY'];},Window_BTB_TurnOrder[_0x21afca(0x1db)][_0x21afca(0x114)]=function(){const _0x286a70=_0x21afca,_0x5f1624=Window_BTB_TurnOrder[_0x286a70(0x23a)];if([_0x286a70(0x2a5)]['includes'](_0x5f1624[_0x286a70(0x188)]))return;this['x']=this[_0x286a70(0x1b4)],this['y']=this[_0x286a70(0x2cd)];const _0x1abaaf=SceneManager[_0x286a70(0x177)][_0x286a70(0x176)];this['x']+=_0x1abaaf['x'],this['y']+=_0x1abaaf['y'];},Window_BTB_TurnOrder[_0x21afca(0x1db)][_0x21afca(0x1b8)]=function(){const _0x5d5dd7=_0x21afca;if(!this['_turnOrderInnerSprite'])return;const _0x49d9b9=this[_0x5d5dd7(0x28c)][_0x5d5dd7(0x192)];if(!_0x49d9b9)return;_0x49d9b9[_0x5d5dd7(0xad)](this[_0x5d5dd7(0x24f)]['bind'](this));},Window_BTB_TurnOrder[_0x21afca(0x1db)][_0x21afca(0x24f)]=function(_0xacc187,_0x366ce0){const _0x117ba8=_0x21afca,_0x4dad10=this[_0x117ba8(0x2ae)](),_0x108e36=Window_BTB_TurnOrder[_0x117ba8(0x23a)]['OrderDirection'];if(_0x4dad10&&!_0x108e36)return _0xacc187['x']-_0x366ce0['x'];else{if(_0x4dad10&&_0x108e36)return _0x366ce0['x']-_0xacc187['x'];else{if(!_0x4dad10&&_0x108e36)return _0xacc187['y']-_0x366ce0['y'];else{if(!_0x4dad10&&!_0x108e36)return _0x366ce0['y']-_0xacc187['y'];}}}},Window_BTB_TurnOrder[_0x21afca(0x1db)][_0x21afca(0xb1)]=function(){const _0x5a1adb=_0x21afca;this[_0x5a1adb(0x9d)]=$gameSystem[_0x5a1adb(0x156)]();},Window_BTB_TurnOrder['prototype']['updateTurnOrder']=function(_0x9b8833){const _0x33d097=_0x21afca;this[_0x33d097(0x209)][_0x33d097(0xad)]((_0xca05ed,_0x126608)=>{const _0xbe70ee=_0x33d097;return _0xca05ed[_0xbe70ee(0x84)]()-_0x126608[_0xbe70ee(0x84)]();}),this[_0x33d097(0x106)]();if(!_0x9b8833)return;for(const _0xc4e441 of this[_0x33d097(0x209)]){if(!_0xc4e441)continue;_0xc4e441[_0x33d097(0x123)](),_0xc4e441[_0x33d097(0x1f1)]=0x0;}},Window_BTB_TurnOrder[_0x21afca(0x1db)][_0x21afca(0x106)]=function(){const _0x4a600d=_0x21afca;if(!this['isHorz']())return;const _0x4f1ae2=VisuMZ[_0x4a600d(0x1fb)]['Settings'][_0x4a600d(0x246)];if(!_0x4f1ae2[_0x4a600d(0x16b)])return;const _0x583bd3=$gameParty['members']()[_0x4a600d(0x157)](_0x16579f=>_0x16579f&&_0x16579f[_0x4a600d(0xea)]()&&_0x16579f[_0x4a600d(0x171)]())[_0x4a600d(0x150)],_0x1dde4a=$gameTroop['members']()[_0x4a600d(0x157)](_0x462450=>_0x462450&&_0x462450['isAlive']()&&_0x462450[_0x4a600d(0x171)]())['length'],_0x1f39e3=this['createBattlerRect'](_0x583bd3,_0x1dde4a);this['_targetHomeX']=_0x1f39e3['x'],this[_0x4a600d(0x21d)]=_0x1f39e3['y'],(this[_0x4a600d(0x252)]!==this[_0x4a600d(0x1b4)]||this[_0x4a600d(0x21d)]!==this[_0x4a600d(0x2cd)])&&(this[_0x4a600d(0x291)]=_0x4f1ae2[_0x4a600d(0x1a7)]);};