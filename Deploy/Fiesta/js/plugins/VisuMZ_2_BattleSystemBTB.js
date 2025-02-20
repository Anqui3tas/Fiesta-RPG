//=============================================================================
// VisuStella MZ - Battle System - BTB - Brave Turn Battle
// VisuMZ_2_BattleSystemBTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemBTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemBTB = VisuMZ.BattleSystemBTB || {};
VisuMZ.BattleSystemBTB.version = 1.17;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.17] [BattleSystemBTB]
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

const _0x50350f=_0x2cca;(function(_0x83b3a3,_0x536d9d){const _0xfd6bc0=_0x2cca,_0x3c69a6=_0x83b3a3();while(!![]){try{const _0x502bb6=parseInt(_0xfd6bc0(0x166))/0x1*(parseInt(_0xfd6bc0(0x264))/0x2)+parseInt(_0xfd6bc0(0x12b))/0x3+-parseInt(_0xfd6bc0(0x149))/0x4*(-parseInt(_0xfd6bc0(0x137))/0x5)+parseInt(_0xfd6bc0(0x261))/0x6*(-parseInt(_0xfd6bc0(0xea))/0x7)+parseInt(_0xfd6bc0(0x1b3))/0x8+parseInt(_0xfd6bc0(0x2a7))/0x9+parseInt(_0xfd6bc0(0x221))/0xa*(-parseInt(_0xfd6bc0(0xfd))/0xb);if(_0x502bb6===_0x536d9d)break;else _0x3c69a6['push'](_0x3c69a6['shift']());}catch(_0xc485ce){_0x3c69a6['push'](_0x3c69a6['shift']());}}}(_0x4447,0x96548));var label='BattleSystemBTB',tier=tier||0x0,dependencies=[_0x50350f(0x15c),'VisuMZ_1_BattleCore',_0x50350f(0xd3),_0x50350f(0x2da)],pluginData=$plugins['filter'](function(_0x3bdc71){const _0x3d730b=_0x50350f;return _0x3bdc71[_0x3d730b(0x222)]&&_0x3bdc71[_0x3d730b(0xf2)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x50350f(0x1f9)]=VisuMZ[label][_0x50350f(0x1f9)]||{},VisuMZ[_0x50350f(0x1bd)]=function(_0x18f761,_0x4a8ae9){const _0x337a95=_0x50350f;for(const _0x591c33 in _0x4a8ae9){if(_0x591c33[_0x337a95(0x19c)](/(.*):(.*)/i)){const _0x114d32=String(RegExp['$1']),_0x4403d0=String(RegExp['$2'])[_0x337a95(0x11e)]()['trim']();let _0x1cfc31,_0x2bda2a,_0xdde429;switch(_0x4403d0){case _0x337a95(0x119):_0x1cfc31=_0x4a8ae9[_0x591c33]!==''?Number(_0x4a8ae9[_0x591c33]):0x0;break;case'ARRAYNUM':_0x2bda2a=_0x4a8ae9[_0x591c33]!==''?JSON[_0x337a95(0x147)](_0x4a8ae9[_0x591c33]):[],_0x1cfc31=_0x2bda2a['map'](_0x3e899a=>Number(_0x3e899a));break;case _0x337a95(0x167):_0x1cfc31=_0x4a8ae9[_0x591c33]!==''?eval(_0x4a8ae9[_0x591c33]):null;break;case _0x337a95(0x1b0):_0x2bda2a=_0x4a8ae9[_0x591c33]!==''?JSON[_0x337a95(0x147)](_0x4a8ae9[_0x591c33]):[],_0x1cfc31=_0x2bda2a[_0x337a95(0x182)](_0x3dce46=>eval(_0x3dce46));break;case _0x337a95(0x1e7):_0x1cfc31=_0x4a8ae9[_0x591c33]!==''?JSON[_0x337a95(0x147)](_0x4a8ae9[_0x591c33]):'';break;case _0x337a95(0x2ca):_0x2bda2a=_0x4a8ae9[_0x591c33]!==''?JSON['parse'](_0x4a8ae9[_0x591c33]):[],_0x1cfc31=_0x2bda2a[_0x337a95(0x182)](_0x1b4b39=>JSON[_0x337a95(0x147)](_0x1b4b39));break;case _0x337a95(0x1f4):_0x1cfc31=_0x4a8ae9[_0x591c33]!==''?new Function(JSON[_0x337a95(0x147)](_0x4a8ae9[_0x591c33])):new Function('return\x200');break;case'ARRAYFUNC':_0x2bda2a=_0x4a8ae9[_0x591c33]!==''?JSON[_0x337a95(0x147)](_0x4a8ae9[_0x591c33]):[],_0x1cfc31=_0x2bda2a[_0x337a95(0x182)](_0x247be9=>new Function(JSON[_0x337a95(0x147)](_0x247be9)));break;case'STR':_0x1cfc31=_0x4a8ae9[_0x591c33]!==''?String(_0x4a8ae9[_0x591c33]):'';break;case'ARRAYSTR':_0x2bda2a=_0x4a8ae9[_0x591c33]!==''?JSON['parse'](_0x4a8ae9[_0x591c33]):[],_0x1cfc31=_0x2bda2a[_0x337a95(0x182)](_0x14128c=>String(_0x14128c));break;case _0x337a95(0x2d4):_0xdde429=_0x4a8ae9[_0x591c33]!==''?JSON[_0x337a95(0x147)](_0x4a8ae9[_0x591c33]):{},_0x1cfc31=VisuMZ[_0x337a95(0x1bd)]({},_0xdde429);break;case _0x337a95(0x2af):_0x2bda2a=_0x4a8ae9[_0x591c33]!==''?JSON[_0x337a95(0x147)](_0x4a8ae9[_0x591c33]):[],_0x1cfc31=_0x2bda2a[_0x337a95(0x182)](_0x119d09=>VisuMZ['ConvertParams']({},JSON[_0x337a95(0x147)](_0x119d09)));break;default:continue;}_0x18f761[_0x114d32]=_0x1cfc31;}}return _0x18f761;},(_0x1a63d8=>{const _0x8938c2=_0x50350f,_0x4b3774=_0x1a63d8[_0x8938c2(0x2a2)];for(const _0x1294c7 of dependencies){if(!Imported[_0x1294c7]){alert(_0x8938c2(0x1d6)[_0x8938c2(0x2e4)](_0x4b3774,_0x1294c7)),SceneManager[_0x8938c2(0x24e)]();break;}}const _0x42ac69=_0x1a63d8['description'];if(_0x42ac69['match'](/\[Version[ ](.*?)\]/i)){const _0x347dc0=Number(RegExp['$1']);_0x347dc0!==VisuMZ[label][_0x8938c2(0x1da)]&&(alert(_0x8938c2(0x30b)[_0x8938c2(0x2e4)](_0x4b3774,_0x347dc0)),SceneManager['exit']());}if(_0x42ac69[_0x8938c2(0x19c)](/\[Tier[ ](\d+)\]/i)){const _0x11a3c4=Number(RegExp['$1']);_0x11a3c4<tier?(alert(_0x8938c2(0x106)[_0x8938c2(0x2e4)](_0x4b3774,_0x11a3c4,tier)),SceneManager['exit']()):tier=Math[_0x8938c2(0xcd)](_0x11a3c4,tier);}VisuMZ[_0x8938c2(0x1bd)](VisuMZ[label][_0x8938c2(0x1f9)],_0x1a63d8[_0x8938c2(0x1c9)]);})(pluginData),PluginManager[_0x50350f(0x130)](pluginData['name'],_0x50350f(0x265),_0x5931a1=>{const _0x1c0b0e=_0x50350f;VisuMZ[_0x1c0b0e(0x1bd)](_0x5931a1,_0x5931a1);const _0x14805f=_0x5931a1[_0x1c0b0e(0x211)],_0x7c7d49=_0x5931a1['IconIndex'];for(const _0x4ae78e of _0x14805f){const _0x134188=$gameActors['actor'](_0x4ae78e);if(!_0x134188)continue;_0x134188[_0x1c0b0e(0x1e0)]=_0x1c0b0e(0xd2),_0x134188[_0x1c0b0e(0x1d8)]=_0x7c7d49;}}),PluginManager[_0x50350f(0x130)](pluginData[_0x50350f(0x2a2)],_0x50350f(0x203),_0x164c43=>{const _0x403385=_0x50350f;VisuMZ['ConvertParams'](_0x164c43,_0x164c43);const _0x6770ff=_0x164c43[_0x403385(0x211)],_0x261b33=_0x164c43['FaceName'],_0x4fa65e=_0x164c43[_0x403385(0x2fd)];for(const _0x34b0c1 of _0x6770ff){const _0x61dc9c=$gameActors[_0x403385(0x1fc)](_0x34b0c1);if(!_0x61dc9c)continue;_0x61dc9c[_0x403385(0x1e0)]='face',_0x61dc9c[_0x403385(0x2c5)]=_0x261b33,_0x61dc9c[_0x403385(0x233)]=_0x4fa65e;}}),PluginManager[_0x50350f(0x130)](pluginData[_0x50350f(0x2a2)],_0x50350f(0x16e),_0x512227=>{const _0x39ad07=_0x50350f;VisuMZ['ConvertParams'](_0x512227,_0x512227);const _0x51b7ba=_0x512227['Actors'];for(const _0x4bdaf2 of _0x51b7ba){const _0x3d5ec2=$gameActors[_0x39ad07(0x1fc)](_0x4bdaf2);if(!_0x3d5ec2)continue;_0x3d5ec2[_0x39ad07(0x1b4)]();}}),PluginManager['registerCommand'](pluginData[_0x50350f(0x2a2)],_0x50350f(0x19b),_0x267174=>{const _0x1e86a7=_0x50350f;VisuMZ[_0x1e86a7(0x1bd)](_0x267174,_0x267174);const _0x2fa978=_0x267174['Enemies'],_0x250639=_0x267174[_0x1e86a7(0xd5)];for(const _0x30a0d9 of _0x2fa978){const _0x48dd92=$gameTroop[_0x1e86a7(0xdf)]()[_0x30a0d9];if(!_0x48dd92)continue;_0x48dd92[_0x1e86a7(0x1e0)]=_0x1e86a7(0xd2),_0x48dd92[_0x1e86a7(0x1d8)]=_0x250639;}}),PluginManager[_0x50350f(0x130)](pluginData['name'],_0x50350f(0x27c),_0x53d3b0=>{const _0x10935c=_0x50350f;VisuMZ[_0x10935c(0x1bd)](_0x53d3b0,_0x53d3b0);const _0x28e3ea=_0x53d3b0['Enemies'],_0x21f866=_0x53d3b0['FaceName'],_0x48dc79=_0x53d3b0[_0x10935c(0x2fd)];for(const _0x54e48c of _0x28e3ea){const _0x83a3da=$gameTroop[_0x10935c(0xdf)]()[_0x54e48c];if(!_0x83a3da)continue;_0x83a3da[_0x10935c(0x1e0)]=_0x10935c(0xec),_0x83a3da['_btbTurnOrderFaceName']=_0x21f866,_0x83a3da[_0x10935c(0x233)]=_0x48dc79;}}),PluginManager[_0x50350f(0x130)](pluginData[_0x50350f(0x2a2)],'BtbTurnOrderClearEnemyGraphic',_0x362ade=>{const _0x3ba7ca=_0x50350f;VisuMZ[_0x3ba7ca(0x1bd)](_0x362ade,_0x362ade);const _0x1c5c00=_0x362ade[_0x3ba7ca(0x263)];for(const _0xe6e5b8 of _0x1c5c00){const _0x40cb4d=$gameTroop[_0x3ba7ca(0xdf)]()[_0xe6e5b8];if(!_0x40cb4d)continue;_0x40cb4d[_0x3ba7ca(0x1b4)]();}}),PluginManager['registerCommand'](pluginData[_0x50350f(0x2a2)],_0x50350f(0x2fc),_0x4e674b=>{const _0x20e5c9=_0x50350f;VisuMZ[_0x20e5c9(0x1bd)](_0x4e674b,_0x4e674b);const _0x25ca54=_0x4e674b[_0x20e5c9(0x276)];$gameSystem['setBattleSystemBTBTurnOrderVisible'](_0x25ca54);}),VisuMZ[_0x50350f(0x314)][_0x50350f(0x10a)]={'EnemyMultiAction':/<BTB (?:MULTI|MULTIPLE) (?:ACTION|ACTIONS):[ ](.*)>/i,'BravePointCost':/<BTB (?:BRAVE|BP) COST:[ ](\d+)>/i,'BravePointSetUser':/<BTB USER SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointSetTarget':/<BTB TARGET SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointAlterUser':/<BTB USER (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointAlterTarget':/<BTB TARGET (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'HideBravePointCost':/<BTB HIDE (?:BRAVE|BP) COST>/i,'BTB_Help':/<BTB HELP>\s*([\s\S]*)\s*<\/BTB HELP>/i,'FusionFlex':/<BTB (?:FLEX|FLEXIBLE) FUSION:[ ](.*)>/gi,'FusionStrict':/<BTB (?:STRICT|EXACT) FUSION:[ ](.*)>/gi,'JsBravePointsUser':/<JS BTB USER (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB USER (?:BRAVE|BP)>/i,'JsBravePointsTarget':/<JS BTB TARGET (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB TARGET (?:BRAVE|BP)>/i,'BravePointBattleStart':/<BTB INITIAL (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointRegen':/<BTB (?:BRAVE|BP) (?:REGEN|DEGEN):[ ]([\+\-]\d+)>/i,'MaxBravePoints':/<BTB (?:MAXIMUM|MAX) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MinBravePoints':/<BTB (?:MINIMUM|MIN) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MaxActions':/<BTB (?:MAXIMUM|MAX) (?:ACTION|ACTIONS):[ ]([\+\-]\d+)>/i,'CannotBrave':/<BTB CANNOT BRAVE>/i,'HideBrave':/<BTB HIDE BRAVE>/i,'CannotFusion':/<BTB CANNOT FUSION>/i,'EnableFusion':/<BTB ENABLE FUSION>/i},VisuMZ[_0x50350f(0x314)][_0x50350f(0x1c4)]=Scene_Boot[_0x50350f(0x1cd)][_0x50350f(0x30d)],Scene_Boot[_0x50350f(0x1cd)][_0x50350f(0x30d)]=function(){const _0x1487ee=_0x50350f;VisuMZ[_0x1487ee(0x314)][_0x1487ee(0x1c4)][_0x1487ee(0x2f0)](this),this[_0x1487ee(0x196)]();},Scene_Boot[_0x50350f(0x1cd)][_0x50350f(0x196)]=function(){const _0xf7d1b5=_0x50350f;this[_0xf7d1b5(0x268)](),this[_0xf7d1b5(0x2d6)]();},Scene_Boot[_0x50350f(0x1cd)][_0x50350f(0x268)]=function(){const _0x249831=_0x50350f;if(VisuMZ[_0x249831(0x20a)])return;const _0x19fa6e=$dataSkills[_0x249831(0x1fd)]($dataItems);for(const _0xbe34c1 of _0x19fa6e){if(!_0xbe34c1)continue;DataManager[_0x249831(0x10c)](_0xbe34c1);}},VisuMZ[_0x50350f(0x314)]['JS']={},Scene_Boot[_0x50350f(0x1cd)][_0x50350f(0x2d6)]=function(){const _0x1edf0c=_0x50350f;if(VisuMZ[_0x1edf0c(0x20a)])return;const _0x2a5235=VisuMZ[_0x1edf0c(0x314)][_0x1edf0c(0x10a)],_0x20a65e=$dataSkills[_0x1edf0c(0x1fd)](dataItems);for(const _0x47e93f of _0x20a65e){if(!_0x47e93f)continue;VisuMZ[_0x1edf0c(0x314)][_0x1edf0c(0x1f2)](_0x47e93f,'JsBravePointsUser'),VisuMZ[_0x1edf0c(0x314)][_0x1edf0c(0x1f2)](_0x47e93f,_0x1edf0c(0x1cb));}},VisuMZ['BattleSystemBTB']['Parse_Notetags_BravePointsUserJS']=function(_0x4083cd,_0x8e5577){const _0xa40832=_0x50350f,_0x207c96=VisuMZ[_0xa40832(0x314)][_0xa40832(0x10a)][_0x8e5577],_0x1dde1a=_0x4083cd[_0xa40832(0xcf)];if(_0x1dde1a[_0xa40832(0x19c)](_0x207c96)){const _0x5e66e0=String(RegExp['$1']),_0x5cd847='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0xa40832(0x2e4)](_0x5e66e0),_0x5c0ff1=VisuMZ[_0xa40832(0x314)][_0xa40832(0x2bf)](_0x4083cd,_0x8e5577);VisuMZ[_0xa40832(0x314)]['JS'][_0x5c0ff1]=new Function(_0x5cd847);}},VisuMZ[_0x50350f(0x314)][_0x50350f(0x2bf)]=function(_0x2dda13,_0x6c7eb5){const _0x33c07b=_0x50350f;if(VisuMZ[_0x33c07b(0x2bf)])return VisuMZ[_0x33c07b(0x2bf)](_0x2dda13,_0x6c7eb5);let _0x3da75a='';if($dataActors[_0x33c07b(0x237)](_0x2dda13))_0x3da75a='Actor-%1-%2'['format'](_0x2dda13['id'],_0x6c7eb5);if($dataClasses[_0x33c07b(0x237)](_0x2dda13))_0x3da75a=_0x33c07b(0xce)[_0x33c07b(0x2e4)](_0x2dda13['id'],_0x6c7eb5);if($dataSkills[_0x33c07b(0x237)](_0x2dda13))_0x3da75a=_0x33c07b(0x2bc)[_0x33c07b(0x2e4)](_0x2dda13['id'],_0x6c7eb5);if($dataItems[_0x33c07b(0x237)](_0x2dda13))_0x3da75a=_0x33c07b(0x18f)['format'](_0x2dda13['id'],_0x6c7eb5);if($dataWeapons[_0x33c07b(0x237)](_0x2dda13))_0x3da75a=_0x33c07b(0xc5)['format'](_0x2dda13['id'],_0x6c7eb5);if($dataArmors[_0x33c07b(0x237)](_0x2dda13))_0x3da75a='Armor-%1-%2'[_0x33c07b(0x2e4)](_0x2dda13['id'],_0x6c7eb5);if($dataEnemies[_0x33c07b(0x237)](_0x2dda13))_0x3da75a=_0x33c07b(0x1eb)[_0x33c07b(0x2e4)](_0x2dda13['id'],_0x6c7eb5);if($dataStates[_0x33c07b(0x237)](_0x2dda13))_0x3da75a=_0x33c07b(0x243)['format'](_0x2dda13['id'],_0x6c7eb5);return _0x3da75a;},VisuMZ[_0x50350f(0x314)][_0x50350f(0x2f2)]=VisuMZ[_0x50350f(0x2f2)],VisuMZ[_0x50350f(0x2f2)]=function(_0x1647e5){const _0x119d51=_0x50350f;VisuMZ[_0x119d51(0x314)]['ParseSkillNotetags'][_0x119d51(0x2f0)](this,_0x1647e5),DataManager[_0x119d51(0x10c)](_0x1647e5),VisuMZ['BattleSystemBTB']['Parse_Notetags_BravePointsUserJS'](_0x1647e5,_0x119d51(0x122)),VisuMZ[_0x119d51(0x314)][_0x119d51(0x1f2)](_0x1647e5,_0x119d51(0x1cb));},VisuMZ[_0x50350f(0x314)][_0x50350f(0x212)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x50350f(0x212)]=function(_0x1a3273){const _0x4bc419=_0x50350f;VisuMZ[_0x4bc419(0x314)][_0x4bc419(0x212)][_0x4bc419(0x2f0)](this,_0x1a3273),DataManager[_0x4bc419(0x10c)](_0x1a3273),VisuMZ[_0x4bc419(0x314)][_0x4bc419(0x1f2)](_0x1a3273,_0x4bc419(0x122)),VisuMZ[_0x4bc419(0x314)][_0x4bc419(0x1f2)](_0x1a3273,_0x4bc419(0x1cb));},DataManager['getSkillIdWithName']=function(_0x2dc677){const _0xe4c75d=_0x50350f;_0x2dc677=_0x2dc677[_0xe4c75d(0x11e)]()[_0xe4c75d(0xcc)](),this[_0xe4c75d(0xf7)]=this[_0xe4c75d(0xf7)]||{};if(this[_0xe4c75d(0xf7)][_0x2dc677])return this[_0xe4c75d(0xf7)][_0x2dc677];for(const _0x978fc3 of $dataSkills){if(!_0x978fc3)continue;this[_0xe4c75d(0xf7)][_0x978fc3[_0xe4c75d(0x2a2)][_0xe4c75d(0x11e)]()[_0xe4c75d(0xcc)]()]=_0x978fc3['id'];}return this[_0xe4c75d(0xf7)][_0x2dc677]||0x0;},DataManager['getItemIdWithName']=function(_0x84a2f4){const _0x39f4a4=_0x50350f;_0x84a2f4=_0x84a2f4['toUpperCase']()[_0x39f4a4(0xcc)](),this[_0x39f4a4(0x28b)]=this['_itemIDs']||{};if(this['_itemIDs'][_0x84a2f4])return this[_0x39f4a4(0x28b)][_0x84a2f4];for(const _0x81f9d2 of $dataItems){if(!_0x81f9d2)continue;this['_itemIDs'][_0x81f9d2['name']['toUpperCase']()[_0x39f4a4(0xcc)]()]=_0x81f9d2['id'];}return this[_0x39f4a4(0x28b)][_0x84a2f4]||0x0;},DataManager[_0x50350f(0x207)]={},DataManager[_0x50350f(0xdd)]={},DataManager[_0x50350f(0x11f)]={},DataManager[_0x50350f(0x2cb)]={},DataManager[_0x50350f(0x10c)]=function(_0x268ee9){const _0x43e746=_0x50350f;if(!_0x268ee9)return;const _0x12c159=VisuMZ[_0x43e746(0x314)]['RegExp'],_0x44ab9f=_0x268ee9['note'],_0x43a9e5=DataManager['isSkill'](_0x268ee9),_0x92172a=_0x44ab9f[_0x43e746(0x19c)](_0x12c159[_0x43e746(0x189)]);if(_0x92172a)for(const _0x10cd0d of _0x92172a){if(!_0x10cd0d)continue;_0x10cd0d[_0x43e746(0x19c)](_0x12c159[_0x43e746(0x189)]);const _0x1939d2=String(RegExp['$1'])[_0x43e746(0x193)](','),_0x44c441=this[_0x43e746(0x20c)](_0x1939d2,_0x43a9e5)[_0x43e746(0x255)]((_0x3452d1,_0x345154)=>_0x3452d1-_0x345154);if(_0x44c441[_0x43e746(0x102)]<=0x1)continue;const _0x4d8077=_0x44c441[_0x43e746(0xe1)]('-'),_0x1028b2=_0x43a9e5?DataManager[_0x43e746(0x207)]:DataManager[_0x43e746(0x11f)];_0x1028b2[_0x4d8077]=_0x268ee9['id'];}const _0x16f265=_0x44ab9f[_0x43e746(0x19c)](_0x12c159['FusionStrict']);if(_0x16f265)for(const _0x3b07d3 of _0x16f265){if(!_0x3b07d3)continue;_0x3b07d3[_0x43e746(0x19c)](_0x12c159[_0x43e746(0x113)]);const _0x203919=String(RegExp['$1'])[_0x43e746(0x193)](','),_0x10e778=this[_0x43e746(0x20c)](_0x203919,_0x43a9e5);if(_0x10e778[_0x43e746(0x102)]<=0x1)continue;const _0x27202b=_0x10e778[_0x43e746(0xe1)]('-'),_0x58bc50=_0x43a9e5?DataManager['_btbSkillFlexFusion']:DataManager[_0x43e746(0x11f)];_0x58bc50[_0x27202b]=_0x268ee9['id'];}},DataManager[_0x50350f(0x20c)]=function(_0xc8e6d7,_0x3cc820){const _0x52c249=_0x50350f,_0x44344a=[];for(let _0x41afe2 of _0xc8e6d7){_0x41afe2=(String(_0x41afe2)||'')[_0x52c249(0xcc)]();const _0x220737=/^\d+$/['test'](_0x41afe2);if(_0x220737)_0x44344a[_0x52c249(0x256)](Number(_0x41afe2));else _0x3cc820?_0x44344a['push'](DataManager[_0x52c249(0x13c)](_0x41afe2)):_0x44344a[_0x52c249(0x256)](DataManager[_0x52c249(0x25d)](_0x41afe2));}return _0x44344a;},ImageManager['btbBravePointsIcon']=VisuMZ[_0x50350f(0x314)][_0x50350f(0x1f9)]['General'][_0x50350f(0x2be)],ImageManager[_0x50350f(0x227)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x50350f(0x2ad)]=ImageManager[_0x50350f(0x2ad)]||0x6,TextManager[_0x50350f(0x2e8)]=VisuMZ['BattleSystemBTB'][_0x50350f(0x1f9)][_0x50350f(0x214)]['BravePointsFull'],TextManager[_0x50350f(0xf5)]=VisuMZ[_0x50350f(0x314)][_0x50350f(0x1f9)][_0x50350f(0x214)][_0x50350f(0x1d5)],TextManager[_0x50350f(0x257)]=VisuMZ['BattleSystemBTB'][_0x50350f(0x1f9)][_0x50350f(0x214)][_0x50350f(0x1a8)],TextManager[_0x50350f(0xfe)]=VisuMZ['BattleSystemBTB'][_0x50350f(0x1f9)][_0x50350f(0x164)]['CommandName'],TextManager[_0x50350f(0x107)]=VisuMZ['BattleSystemBTB']['Settings'][_0x50350f(0x164)][_0x50350f(0x278)],TextManager[_0x50350f(0x206)]=VisuMZ['BattleSystemBTB'][_0x50350f(0x1f9)][_0x50350f(0x164)][_0x50350f(0x10f)],SceneManager['isSceneBattle']=function(){const _0x591db2=_0x50350f;return this['_scene']&&this[_0x591db2(0x253)][_0x591db2(0x22b)]===Scene_Battle;},VisuMZ[_0x50350f(0x314)][_0x50350f(0x2fa)]=BattleManager['battleSys'],BattleManager[_0x50350f(0x1de)]=function(){const _0x117be0=_0x50350f;if(this[_0x117be0(0xe2)]())return _0x117be0(0x308);return VisuMZ[_0x117be0(0x314)]['BattleManager_battleSys'][_0x117be0(0x2f0)](this);},BattleManager[_0x50350f(0xe2)]=function(){const _0x5bd378=_0x50350f;return $gameSystem['getBattleSystem']()===_0x5bd378(0x308);},VisuMZ['BattleSystemBTB'][_0x50350f(0x205)]=BattleManager['isTpb'],BattleManager[_0x50350f(0x1d1)]=function(){const _0x2cd6a4=_0x50350f;if(this[_0x2cd6a4(0xe2)]())return![];return VisuMZ[_0x2cd6a4(0x314)][_0x2cd6a4(0x205)][_0x2cd6a4(0x2f0)](this);},VisuMZ['BattleSystemBTB']['BattleManager_isActiveTpb']=BattleManager[_0x50350f(0x112)],BattleManager[_0x50350f(0x112)]=function(){const _0x6f1f39=_0x50350f;if(this[_0x6f1f39(0xe2)]())return![];return VisuMZ[_0x6f1f39(0x314)]['BattleManager_isActiveTpb'][_0x6f1f39(0x2f0)](this);},VisuMZ[_0x50350f(0x314)][_0x50350f(0x129)]=BattleManager['isTurnBased'],BattleManager[_0x50350f(0x1a4)]=function(){const _0x32ac3c=_0x50350f;if(this[_0x32ac3c(0xe2)]())return!![];return VisuMZ[_0x32ac3c(0x314)][_0x32ac3c(0x129)][_0x32ac3c(0x2f0)](this);},VisuMZ[_0x50350f(0x314)]['BattleManager_startInput']=BattleManager[_0x50350f(0x2f4)],BattleManager['startInput']=function(){const _0x516a34=_0x50350f;VisuMZ[_0x516a34(0x314)][_0x516a34(0x27a)]['call'](this),this[_0x516a34(0xe2)]()&&this[_0x516a34(0xff)]()&&!this['_surprise']&&$gameParty['canInput']()&&this[_0x516a34(0x26e)]();},VisuMZ[_0x50350f(0x314)][_0x50350f(0x2e9)]=BattleManager[_0x50350f(0x1ce)],BattleManager[_0x50350f(0x1ce)]=function(){const _0x5b73f0=_0x50350f;VisuMZ[_0x5b73f0(0x314)][_0x5b73f0(0x2e9)][_0x5b73f0(0x2f0)](this),this[_0x5b73f0(0x15d)]();},BattleManager[_0x50350f(0x15d)]=function(){const _0x24ae60=_0x50350f;if(!SceneManager[_0x24ae60(0x117)]())return;if(!this[_0x24ae60(0xe2)]())return;const _0x105e12=SceneManager['_scene'];if(!_0x105e12)return;const _0x24c8a5=_0x105e12[_0x24ae60(0x2a4)];if(!_0x24c8a5)return;_0x24c8a5[_0x24ae60(0xe7)]();},VisuMZ[_0x50350f(0x314)][_0x50350f(0xfc)]=BattleManager['makeActionOrders'],BattleManager[_0x50350f(0x1ff)]=function(){const _0x2bbde3=_0x50350f;VisuMZ['BattleSystemBTB'][_0x2bbde3(0xfc)]['call'](this),this['isBTB']()&&(this[_0x2bbde3(0x2d9)]=this[_0x2bbde3(0x2d9)][_0x2bbde3(0x281)](_0x292a5f=>_0x292a5f&&_0x292a5f[_0x2bbde3(0xe6)][_0x2bbde3(0x102)]>0x0),this['updateTurnOrderBTB']());},BattleManager[_0x50350f(0x22a)]=function(){const _0x534178=_0x50350f;if(!this[_0x534178(0xe2)]())return;if(!SceneManager['isSceneBattle']())return;const _0x173d95=this['_actionBattlers'];for(const _0x2acf02 of _0x173d95){_0x2acf02[_0x534178(0x2dc)]();}_0x173d95[_0x534178(0x255)]((_0x58b51a,_0x20ef98)=>_0x20ef98['speed']()-_0x58b51a[_0x534178(0x1b8)]()),this[_0x534178(0xe2)]()&&this[_0x534178(0x1f7)]();},BattleManager[_0x50350f(0x154)]=function(){const _0x250ee4=_0x50350f;if(!this[_0x250ee4(0xe2)]())return;this[_0x250ee4(0x2d9)]=this[_0x250ee4(0x2d9)]||[],this[_0x250ee4(0x2d9)]=this['_actionBattlers'][_0x250ee4(0x281)](_0xbeae6=>_0xbeae6&&_0xbeae6[_0x250ee4(0x1ca)]()&&_0xbeae6[_0x250ee4(0x2cf)]()),this[_0x250ee4(0x1f7)]();},BattleManager['updateTurnOrderBTB']=function(_0x56a42a){const _0x160a9d=_0x50350f;if(!this['isBTB']())return;const _0x4aa56d=SceneManager[_0x160a9d(0x253)]['_btbTurnOrderWindow'];if(!_0x4aa56d)return;_0x4aa56d[_0x160a9d(0xf0)](_0x56a42a);},VisuMZ[_0x50350f(0x314)][_0x50350f(0x1cc)]=BattleManager[_0x50350f(0x1c5)],BattleManager['startAction']=function(){const _0x2548f8=_0x50350f;BattleManager[_0x2548f8(0xe2)]()&&this[_0x2548f8(0xda)]&&this['_subject'][_0x2548f8(0x1bc)](),VisuMZ[_0x2548f8(0x314)][_0x2548f8(0x1cc)][_0x2548f8(0x2f0)](this);},VisuMZ[_0x50350f(0x314)][_0x50350f(0xbf)]=Game_System[_0x50350f(0x1cd)][_0x50350f(0xbb)],Game_System[_0x50350f(0x1cd)][_0x50350f(0xbb)]=function(){const _0x32947c=_0x50350f;VisuMZ[_0x32947c(0x314)][_0x32947c(0xbf)]['call'](this),this[_0x32947c(0x1fa)]();},Game_System[_0x50350f(0x1cd)][_0x50350f(0x1fa)]=function(){const _0x1fda82=_0x50350f;this[_0x1fda82(0x229)]=!![];},Game_System[_0x50350f(0x1cd)]['isBattleSystemBTBTurnOrderVisible']=function(){const _0x32dc5b=_0x50350f;return this[_0x32dc5b(0x229)]===undefined&&this[_0x32dc5b(0x1fa)](),this['_btbTurnOrderVisible'];},Game_System['prototype'][_0x50350f(0x183)]=function(_0x6ac136){const _0x491e62=_0x50350f;this[_0x491e62(0x229)]===undefined&&this[_0x491e62(0x1fa)](),this['_btbTurnOrderVisible']=_0x6ac136;},VisuMZ[_0x50350f(0x314)][_0x50350f(0x2f6)]=Game_Action['prototype']['applyItemUserEffect'],Game_Action['prototype'][_0x50350f(0x2ce)]=function(_0x5e0dd5){const _0x17a4c9=_0x50350f;VisuMZ[_0x17a4c9(0x314)][_0x17a4c9(0x2f6)]['call'](this,_0x5e0dd5),this['applyBattleSystemBTBUserEffect'](_0x5e0dd5);},Game_Action[_0x50350f(0x1cd)][_0x50350f(0xbd)]=function(_0x41ead1){const _0x3ca99c=_0x50350f;if(!BattleManager[_0x3ca99c(0xe2)]())return;if(this[_0x3ca99c(0x1f1)]())this[_0x3ca99c(0x1ed)](_0x41ead1);},Game_Action['prototype']['applyItemBattleSystemBTBUserEffect']=function(_0x4636eb){const _0x5bb382=_0x50350f,_0xd542a6=VisuMZ['BattleSystemBTB']['RegExp'],_0x5cde72=this[_0x5bb382(0x1f1)]()['note'],_0x45bacb=this['item']();if(this['subject']()){if(_0x5cde72[_0x5bb382(0x19c)](_0xd542a6['BravePointSetUser'])){const _0x7fbe0f=Number(RegExp['$1']);this[_0x5bb382(0x2e1)]()[_0x5bb382(0x1a5)](_0x7fbe0f);}if(_0x5cde72[_0x5bb382(0x19c)](_0xd542a6[_0x5bb382(0x19a)])){const _0x31603d=Number(RegExp['$1']);this[_0x5bb382(0x2e1)]()['gainBravePoints'](_0x31603d);}const _0x54133c='JsBravePointsUser',_0x329472=VisuMZ[_0x5bb382(0x314)][_0x5bb382(0x2bf)](_0x45bacb,_0x54133c);if(VisuMZ[_0x5bb382(0x314)]['JS'][_0x329472]){const _0x3be443=VisuMZ['BattleSystemBTB']['JS'][_0x329472][_0x5bb382(0x2f0)](this,this[_0x5bb382(0x2e1)](),_0x4636eb,this[_0x5bb382(0x2e1)]()[_0x5bb382(0x28d)]());this['subject']()[_0x5bb382(0x1a5)](_0x3be443);}}if(_0x4636eb){if(_0x5cde72[_0x5bb382(0x19c)](_0xd542a6[_0x5bb382(0x1d0)])){const _0x4bed68=Number(RegExp['$1']);_0x4636eb[_0x5bb382(0x1a5)](_0x4bed68);}if(_0x5cde72[_0x5bb382(0x19c)](_0xd542a6[_0x5bb382(0x302)])){const _0x5de50b=Number(RegExp['$1']);_0x4636eb[_0x5bb382(0x1c3)](_0x5de50b);}const _0x401e6e='JsBravePointsTarget',_0x5cd136=VisuMZ['BattleSystemBTB']['createKeyJS'](_0x45bacb,_0x401e6e);if(VisuMZ[_0x5bb382(0x314)]['JS'][_0x5cd136]){const _0x3b9025=VisuMZ[_0x5bb382(0x314)]['JS'][_0x5cd136]['call'](this,this['subject'](),_0x4636eb,_0x4636eb[_0x5bb382(0x28d)]());_0x4636eb[_0x5bb382(0x1a5)](_0x3b9025);}}},VisuMZ[_0x50350f(0x314)][_0x50350f(0x1f8)]=Game_Action['prototype']['speed'],Game_Action[_0x50350f(0x1cd)]['speed']=function(){const _0x14d9ad=_0x50350f;return BattleManager[_0x14d9ad(0xe2)]()?VisuMZ[_0x14d9ad(0x314)][_0x14d9ad(0x1f9)]['Mechanics'][_0x14d9ad(0x312)][_0x14d9ad(0x2f0)](this):VisuMZ['BattleSystemBTB'][_0x14d9ad(0x1f8)][_0x14d9ad(0x2f0)](this);},VisuMZ['BattleSystemBTB'][_0x50350f(0xd4)]=Game_Action[_0x50350f(0x1cd)][_0x50350f(0x2ac)],Game_Action['prototype'][_0x50350f(0x2ac)]=function(){const _0x5cad6e=_0x50350f;return BattleManager['isBTB']()?VisuMZ['BattleSystemBTB'][_0x5cad6e(0x1f9)]['Mechanics']['AllowRandomSpeed']:VisuMZ['BattleSystemBTB'][_0x5cad6e(0xd4)]['call'](this);},VisuMZ[_0x50350f(0x314)][_0x50350f(0xeb)]=Game_Action[_0x50350f(0x1cd)][_0x50350f(0x1e4)],Game_Action[_0x50350f(0x1cd)][_0x50350f(0x1e4)]=function(_0x1d32fb){const _0x227b89=_0x50350f;VisuMZ[_0x227b89(0x314)][_0x227b89(0xeb)][_0x227b89(0x2f0)](this,_0x1d32fb),BattleManager['sortActionOrdersBTB']();},VisuMZ[_0x50350f(0x314)][_0x50350f(0x29d)]=Game_Action[_0x50350f(0x1cd)][_0x50350f(0x1be)],Game_Action['prototype'][_0x50350f(0x1be)]=function(_0x2473d6){const _0x145aba=_0x50350f;VisuMZ[_0x145aba(0x314)][_0x145aba(0x29d)][_0x145aba(0x2f0)](this,_0x2473d6),BattleManager[_0x145aba(0x22a)]();},Game_Action['prototype'][_0x50350f(0xc9)]=function(_0x2b29b3){const _0x8a0498=_0x50350f;this[_0x8a0498(0x300)]=_0x2b29b3;},Game_Action[_0x50350f(0x1cd)]['getTotalActionFusionRecipes']=function(){const _0x821628=_0x50350f;if(this['_actionFusionRecipe']===undefined)return 0x0;return this[_0x821628(0x300)]['split']('-')['length']-0x1;},Game_Action[_0x50350f(0x1cd)][_0x50350f(0x307)]=function(){const _0x5e5f5c=_0x50350f;if(this['_actionFusionRecipe']===undefined)return[];return this['_actionFusionRecipe'][_0x5e5f5c(0x193)]('-')['map'](_0x32ca63=>$dataSkills[Number(_0x32ca63)]);},Game_Action[_0x50350f(0x1cd)]['getActionFusionRecipeItems']=function(){const _0x38da78=_0x50350f;if(this[_0x38da78(0x300)]===undefined)return[];return this[_0x38da78(0x300)][_0x38da78(0x193)]('-')[_0x38da78(0x182)](_0xa814fe=>$dataItems[Number(_0xa814fe)]);},Game_BattlerBase[_0x50350f(0x1cd)][_0x50350f(0x28d)]=function(){const _0x4cce50=_0x50350f;return this[_0x4cce50(0x23f)]||0x0;},Game_BattlerBase[_0x50350f(0x2c3)]=VisuMZ[_0x50350f(0x314)]['Settings'][_0x50350f(0x1d9)][_0x50350f(0x13f)],Game_BattlerBase[_0x50350f(0x249)]=VisuMZ[_0x50350f(0x314)][_0x50350f(0x1f9)][_0x50350f(0x1d9)][_0x50350f(0x1df)],Game_BattlerBase[_0x50350f(0x1cd)][_0x50350f(0x21e)]=function(){const _0x135453=_0x50350f;if(this['cannotBraveTrait']())return 0x1;if(this[_0x135453(0x204)]())return 0x1;const _0x472258=VisuMZ[_0x135453(0x314)][_0x135453(0x10a)],_0x2fb419=_0x472258['MaxActions'];let _0x652eb0=Game_BattlerBase[_0x135453(0x2c3)];const _0xf22572=this[_0x135453(0x13d)]();for(const _0x53c16d of _0xf22572){if(!_0x53c16d)continue;const _0x5bee61=_0x53c16d['note'];_0x5bee61[_0x135453(0x19c)](_0x2fb419)&&(_0x652eb0+=Number(RegExp['$1']));}return _0x652eb0['clamp'](0x1,Game_BattlerBase['BTB_MAX_ACTIONS_HARD_CAP']);},Game_BattlerBase[_0x50350f(0x160)]=VisuMZ[_0x50350f(0x314)][_0x50350f(0x1f9)][_0x50350f(0x1d9)][_0x50350f(0x2bb)],Game_BattlerBase[_0x50350f(0x2fe)]=VisuMZ[_0x50350f(0x314)]['Settings'][_0x50350f(0x1d9)][_0x50350f(0x238)],Game_BattlerBase['BTB_MAX_BRAVEPOINTS_HARD_CAP']=VisuMZ[_0x50350f(0x314)][_0x50350f(0x1f9)]['Mechanics']['MaxBravePointsHardCap'],Game_BattlerBase['BTB_MIN_BRAVEPOINTS_HARD_CAP']=VisuMZ[_0x50350f(0x314)][_0x50350f(0x1f9)][_0x50350f(0x1d9)][_0x50350f(0x247)],Game_BattlerBase[_0x50350f(0x1cd)][_0x50350f(0x2b1)]=function(){const _0x2223c9=_0x50350f,_0x29141d=VisuMZ['BattleSystemBTB']['RegExp'],_0x387ab1=_0x29141d[_0x2223c9(0x272)];let _0x51643e=Game_BattlerBase[_0x2223c9(0x160)];const _0x8ee8f7=this['traitObjects']();for(const _0x895eb9 of _0x8ee8f7){if(!_0x895eb9)continue;const _0x4cba4b=_0x895eb9[_0x2223c9(0xcf)];_0x4cba4b[_0x2223c9(0x19c)](_0x387ab1)&&(_0x51643e+=Number(RegExp['$1']));}return Math[_0x2223c9(0x2ae)](_0x51643e,Game_BattlerBase['BTB_MAX_BRAVEPOINTS_HARD_CAP']);},Game_BattlerBase['prototype'][_0x50350f(0x240)]=function(){const _0x56c124=_0x50350f,_0x2c371e=VisuMZ[_0x56c124(0x314)]['RegExp'],_0x451abf=_0x2c371e[_0x56c124(0x24b)];let _0x29879f=Game_BattlerBase[_0x56c124(0x2fe)];const _0x118098=this[_0x56c124(0x13d)]();for(const _0x39efe4 of _0x118098){if(!_0x39efe4)continue;const _0x2572c9=_0x39efe4[_0x56c124(0xcf)];_0x2572c9[_0x56c124(0x19c)](_0x451abf)&&(_0x29879f+=Number(RegExp['$1']));}return Math[_0x56c124(0xcd)](_0x29879f,Game_BattlerBase['BTB_MIN_BRAVEPOINTS_HARD_CAP']);},Game_BattlerBase[_0x50350f(0x1cd)]['setBravePoints']=function(_0x1bbb19){const _0x48777e=_0x50350f;this[_0x48777e(0x23f)]=Math[_0x48777e(0x2ae)](_0x1bbb19,this[_0x48777e(0x2b1)]()),this[_0x48777e(0x127)]();},Game_BattlerBase['prototype'][_0x50350f(0x1c3)]=function(_0x3b4b8d){const _0x25658a=_0x50350f;_0x3b4b8d+=this[_0x25658a(0x23f)]||0x0,this['setBravePoints'](_0x3b4b8d);},Game_BattlerBase[_0x50350f(0x1cd)][_0x50350f(0x115)]=function(_0x212597){this['gainBravePoints'](-_0x212597);},Game_BattlerBase['prototype']['bravePointsCost']=function(_0x879ab){const _0x3f425e=_0x50350f,_0x41b051=VisuMZ[_0x3f425e(0x314)][_0x3f425e(0x1f9)]['Mechanics'];if(!_0x879ab)return _0x41b051['BravePointPredictedCost'];if(DataManager[_0x3f425e(0x21f)](_0x879ab)){if(_0x879ab['id']===this['guardSkillId']())return 0x0;if(this[_0x3f425e(0x24c)]()&&this['currentAction']()[_0x3f425e(0x1f1)]()===_0x879ab&&this[_0x3f425e(0x24c)]()[_0x3f425e(0x1e3)])return 0x0;}const _0x5ac23f=VisuMZ[_0x3f425e(0x314)][_0x3f425e(0x10a)],_0x2cca2e=_0x879ab[_0x3f425e(0xcf)];if(_0x2cca2e[_0x3f425e(0x19c)](_0x5ac23f[_0x3f425e(0x25b)]))return Number(RegExp['$1']);let _0x22fe34=0x0;if(DataManager['isSkill'](_0x879ab))_0x22fe34=_0x41b051[_0x3f425e(0x17d)];else DataManager[_0x3f425e(0x14f)](_0x879ab)&&(_0x22fe34=_0x41b051[_0x3f425e(0x1af)]);return _0x22fe34['clamp'](0x0,Game_BattlerBase[_0x3f425e(0x118)]);},VisuMZ[_0x50350f(0x314)][_0x50350f(0x1a9)]=Game_BattlerBase[_0x50350f(0x1cd)]['canUse'],Game_BattlerBase[_0x50350f(0x1cd)][_0x50350f(0x216)]=function(_0x30cead){const _0x5da5db=_0x50350f;if(_0x30cead&&SceneManager[_0x5da5db(0x117)]()&&BattleManager[_0x5da5db(0xe2)]()){const _0x7abbca=this['bravePointsCost'](_0x30cead);if(this[_0x5da5db(0x28d)]()-_0x7abbca<this['minBravePoints']())return![];}return VisuMZ[_0x5da5db(0x314)]['Game_BattlerBase_canUse'][_0x5da5db(0x2f0)](this,_0x30cead);},Game_BattlerBase['prototype']['payBravePointsCost']=function(_0x291158){const _0x39dbb5=_0x50350f;if(!BattleManager[_0x39dbb5(0xe2)]())return;const _0x3c4f7f=this[_0x39dbb5(0x2a9)](_0x291158);this[_0x39dbb5(0x115)](_0x3c4f7f);},VisuMZ[_0x50350f(0x314)][_0x50350f(0x28a)]=Game_Battler['prototype'][_0x50350f(0x2aa)],Game_Battler[_0x50350f(0x1cd)][_0x50350f(0x2aa)]=function(_0x1f2958){const _0xa6262c=_0x50350f;if(this[_0xa6262c(0x12c)](_0x1f2958)){this[_0xa6262c(0xfa)](_0x1f2958);return;}VisuMZ['BattleSystemBTB'][_0xa6262c(0x28a)]['call'](this,_0x1f2958),this[_0xa6262c(0x292)](_0x1f2958);},Game_Battler['prototype'][_0x50350f(0x12c)]=function(_0x441b79){const _0x2a453b=_0x50350f;if(!BattleManager[_0x2a453b(0xe2)]())return![];if(!SceneManager[_0x2a453b(0x117)]())return![];if(!this[_0x2a453b(0x246)]())return![];if(this!==BattleManager[_0x2a453b(0xda)])return![];if(!this[_0x2a453b(0x24c)]())return![];if(!this[_0x2a453b(0x24c)]()['item']())return![];if(this[_0x2a453b(0x24c)]()[_0x2a453b(0x1f1)]()!==_0x441b79)return![];if(this[_0x2a453b(0x24c)]()[_0x2a453b(0x21f)]())return this['currentAction']()[_0x2a453b(0x307)]()[_0x2a453b(0x102)]>0x0;else return this[_0x2a453b(0x24c)]()['isItem']()?this[_0x2a453b(0x24c)]()[_0x2a453b(0x136)]()[_0x2a453b(0x102)]>0x0:![];},Game_Battler['prototype'][_0x50350f(0xfa)]=function(_0xfba7aa){const _0x238e8a=_0x50350f;if(!SceneManager[_0x238e8a(0x117)]())return;DataManager[_0x238e8a(0x21f)](_0xfba7aa)?this['btbPaySkillFusionCosts']():this[_0x238e8a(0x103)]();},Game_Battler[_0x50350f(0x1cd)]['btbPaySkillFusionCosts']=function(){const _0x1f6bbd=_0x50350f,_0x352578=this[_0x1f6bbd(0x24c)]()[_0x1f6bbd(0x307)]();if(!_0x352578)return;for(const _0x157e9a of _0x352578){if(!_0x157e9a)continue;if(!this[_0x1f6bbd(0x216)](_0x157e9a))return![];VisuMZ[_0x1f6bbd(0x314)]['Game_Battler_useItem'][_0x1f6bbd(0x2f0)](this,_0x157e9a),this[_0x1f6bbd(0x292)](_0x157e9a);}return!![];},Game_Battler[_0x50350f(0x1cd)]['btbPayItemFusionCosts']=function(){const _0x8834c2=_0x50350f,_0x3a667c=this['currentAction']()[_0x8834c2(0x136)]();if(!_0x3a667c)return;for(const _0x4ce02a of _0x3a667c){if(!_0x4ce02a)continue;if(!this[_0x8834c2(0x216)](_0x4ce02a))return![];this['payBravePointsCost'](_0x4ce02a);}return!![];},Game_BattlerBase[_0x50350f(0x1cd)][_0x50350f(0x1ba)]=function(){const _0x1cead7=_0x50350f,_0x27dd1c=this[_0x1cead7(0x28d)]()-this[_0x1cead7(0x25a)]()+this[_0x1cead7(0x2f9)]();return _0x27dd1c[_0x1cead7(0x1e1)](Game_BattlerBase[_0x1cead7(0x248)],this['maxBravePoints']());},Game_BattlerBase[_0x50350f(0x1cd)][_0x50350f(0x25a)]=function(){const _0x6feffa=_0x50350f;let _0x58bfba=0x0;for(const _0x224e09 of this[_0x6feffa(0xe6)]){if(!_0x224e09)continue;const _0x259bef=_0x224e09[_0x6feffa(0x1f1)]();_0x58bfba+=this[_0x6feffa(0x2a9)](_0x259bef);}return _0x58bfba;},VisuMZ[_0x50350f(0x314)][_0x50350f(0x29e)]=Game_BattlerBase[_0x50350f(0x1cd)][_0x50350f(0x168)],Game_BattlerBase[_0x50350f(0x1cd)][_0x50350f(0x168)]=function(){const _0x1ac7ac=_0x50350f;return BattleManager[_0x1ac7ac(0xe2)]()&&this['bravePoints']()<0x0?![]:VisuMZ[_0x1ac7ac(0x314)][_0x1ac7ac(0x29e)]['call'](this);},VisuMZ['BattleSystemBTB'][_0x50350f(0x1b9)]=Game_BattlerBase[_0x50350f(0x1cd)][_0x50350f(0x236)],Game_BattlerBase['prototype'][_0x50350f(0x236)]=function(){const _0x32c290=_0x50350f;return BattleManager[_0x32c290(0xe2)]()&&this['numActions']()>0x1?![]:VisuMZ['BattleSystemBTB'][_0x32c290(0x1b9)][_0x32c290(0x2f0)](this);},Game_BattlerBase['prototype'][_0x50350f(0x1dc)]=function(){const _0x2d31ab=_0x50350f;if(this[_0x2d31ab(0x20b)]())return![];return this[_0x2d31ab(0x218)]()<this['maxBraveActions']()&&this[_0x2d31ab(0x23f)]>this[_0x2d31ab(0x240)]();},Game_BattlerBase['prototype'][_0x50350f(0x20b)]=function(){const _0x5008f2=_0x50350f,_0x3b80d0=VisuMZ[_0x5008f2(0x314)][_0x5008f2(0x10a)],_0x590ac2=_0x3b80d0[_0x5008f2(0x2f7)];return this[_0x5008f2(0x13d)]()['some'](_0x586543=>_0x586543&&_0x586543[_0x5008f2(0xcf)][_0x5008f2(0x19c)](_0x590ac2));},Game_BattlerBase[_0x50350f(0x1cd)]['hideBraveTrait']=function(){const _0x5737d2=_0x50350f,_0x25ac6f=VisuMZ[_0x5737d2(0x314)][_0x5737d2(0x10a)],_0xf3da11=_0x25ac6f[_0x5737d2(0x277)];return this[_0x5737d2(0x13d)]()['some'](_0x917a73=>_0x917a73&&_0x917a73[_0x5737d2(0xcf)][_0x5737d2(0x19c)](_0xf3da11));},Game_BattlerBase[_0x50350f(0x1cd)]['clearTurnOrderBTBGraphics']=function(){const _0x58e665=_0x50350f;delete this['_btbTurnOrderGraphicType'],delete this[_0x58e665(0x2c5)],delete this[_0x58e665(0x233)],delete this['_btbTurnOrderIconIndex'];},Game_BattlerBase[_0x50350f(0x1cd)][_0x50350f(0x258)]=function(){const _0x13c0aa=_0x50350f;return this[_0x13c0aa(0x1e0)]===undefined&&(this['_btbTurnOrderGraphicType']=this[_0x13c0aa(0xc6)]()),this[_0x13c0aa(0x1e0)];},Game_BattlerBase[_0x50350f(0x1cd)]['createTurnOrderBTBGraphicType']=function(){const _0x23b632=_0x50350f;return Window_BTB_TurnOrder[_0x23b632(0x1f9)]['EnemyBattlerType'];},Game_BattlerBase[_0x50350f(0x1cd)][_0x50350f(0x181)]=function(){const _0xc7550b=_0x50350f;return this[_0xc7550b(0x2c5)]===undefined&&(this[_0xc7550b(0x2c5)]=this[_0xc7550b(0x2b9)]()),this[_0xc7550b(0x2c5)];},Game_BattlerBase[_0x50350f(0x1cd)]['createTurnOrderBTBGraphicFaceName']=function(){const _0x147199=_0x50350f;return Window_BTB_TurnOrder[_0x147199(0x1f9)][_0x147199(0x2fb)];},Game_BattlerBase['prototype'][_0x50350f(0x2c9)]=function(){const _0x3f6d3c=_0x50350f;return this[_0x3f6d3c(0x233)]===undefined&&(this['_btbTurnOrderFaceIndex']=this['createTurnOrderBTBGraphicFaceIndex']()),this[_0x3f6d3c(0x233)];},Game_BattlerBase[_0x50350f(0x1cd)][_0x50350f(0xf9)]=function(){const _0x4cc07a=_0x50350f;return Window_BTB_TurnOrder['Settings'][_0x4cc07a(0x27e)];},Game_BattlerBase[_0x50350f(0x1cd)][_0x50350f(0x1cf)]=function(){const _0xc2256d=_0x50350f;return this[_0xc2256d(0x1d8)]===undefined&&(this[_0xc2256d(0x1d8)]=this[_0xc2256d(0x2b2)]()),this[_0xc2256d(0x1d8)];},Game_BattlerBase[_0x50350f(0x1cd)]['createTurnOrderBTBGraphicIconIndex']=function(){const _0x2f704e=_0x50350f;return Window_BTB_TurnOrder[_0x2f704e(0x1f9)][_0x2f704e(0x22c)];},Game_BattlerBase[_0x50350f(0x1cd)][_0x50350f(0x306)]=function(_0xf6b6e2){const _0x456973=_0x50350f;this[_0x456973(0x1d8)]=_0xf6b6e2;},VisuMZ[_0x50350f(0x314)][_0x50350f(0x299)]=Game_BattlerBase[_0x50350f(0x1cd)]['hide'],Game_BattlerBase[_0x50350f(0x1cd)][_0x50350f(0x2b7)]=function(){const _0x389003=_0x50350f;VisuMZ[_0x389003(0x314)][_0x389003(0x299)][_0x389003(0x2f0)](this),BattleManager[_0x389003(0x154)]();},VisuMZ[_0x50350f(0x314)][_0x50350f(0x26a)]=Game_BattlerBase[_0x50350f(0x1cd)][_0x50350f(0xc8)],Game_BattlerBase[_0x50350f(0x1cd)][_0x50350f(0xc8)]=function(){const _0x37a22b=_0x50350f;VisuMZ['BattleSystemBTB'][_0x37a22b(0x26a)]['call'](this),BattleManager[_0x37a22b(0x154)]();},VisuMZ[_0x50350f(0x314)][_0x50350f(0x293)]=Game_Battler[_0x50350f(0x1cd)][_0x50350f(0x2ed)],Game_Battler[_0x50350f(0x1cd)]['performCollapse']=function(){const _0x279cbb=_0x50350f;VisuMZ[_0x279cbb(0x314)][_0x279cbb(0x293)][_0x279cbb(0x2f0)](this),BattleManager[_0x279cbb(0x154)]();},VisuMZ[_0x50350f(0x314)][_0x50350f(0x16c)]=Game_Battler[_0x50350f(0x1cd)][_0x50350f(0x12a)],Game_Battler[_0x50350f(0x1cd)][_0x50350f(0x12a)]=function(){const _0x5d422b=_0x50350f;return BattleManager['isBTB']()?0x1:VisuMZ[_0x5d422b(0x314)][_0x5d422b(0x16c)][_0x5d422b(0x2f0)](this);},VisuMZ[_0x50350f(0x314)][_0x50350f(0x245)]=Game_Battler[_0x50350f(0x1cd)][_0x50350f(0x271)],Game_Battler[_0x50350f(0x1cd)][_0x50350f(0x271)]=function(_0x24c540){const _0x35d16a=_0x50350f;VisuMZ[_0x35d16a(0x314)][_0x35d16a(0x245)][_0x35d16a(0x2f0)](this,_0x24c540),this[_0x35d16a(0x304)](_0x24c540);},Game_Battler[_0x50350f(0x1cd)]['onBattleStartBTB']=function(_0x5e2dc9){const _0x3f8e6e=_0x50350f;if(!BattleManager['isBTB']())return;const _0xed40d=VisuMZ[_0x3f8e6e(0x314)][_0x3f8e6e(0x1f9)][_0x3f8e6e(0x1d9)],_0x35ac20=VisuMZ['BattleSystemBTB'][_0x3f8e6e(0x10a)];let _0x71c14c=_0x5e2dc9?_0xed40d[_0x3f8e6e(0x22e)]:_0xed40d['BravePointStartNeutral'];const _0x1782a6=this['traitObjects']();for(const _0x4f1cf1 of _0x1782a6){if(!_0x4f1cf1)continue;const _0x6c6f0c=_0x4f1cf1[_0x3f8e6e(0xcf)];_0x6c6f0c[_0x3f8e6e(0x19c)](_0x35ac20[_0x3f8e6e(0x114)])&&(_0x71c14c+=Number(RegExp['$1']));}this['setBravePoints'](_0x71c14c);},Game_Battler[_0x50350f(0x1cd)][_0x50350f(0x269)]=function(){const _0x1001ec=_0x50350f;this[_0x1001ec(0xe6)][_0x1001ec(0x256)](new Game_Action(this));const _0x2e97f3=VisuMZ['BattleSystemBTB'][_0x1001ec(0x1f9)]['BraveAnimation'];if(_0x2e97f3[_0x1001ec(0x2d7)]){const _0x728f11=_0x1001ec(0x27d),_0x39a80c=_0x2e97f3[_0x1001ec(0x201)['format'](_0x728f11)],_0x40d760=_0x2e97f3[_0x1001ec(0xf4)[_0x1001ec(0x2e4)](_0x728f11)],_0x413a99=_0x2e97f3[_0x1001ec(0xc1)[_0x1001ec(0x2e4)](_0x728f11)];$gameTemp[_0x1001ec(0xf3)]([this],_0x39a80c,_0x40d760,_0x413a99);}},Game_Battler[_0x50350f(0x1cd)][_0x50350f(0x139)]=function(){const _0x9714ed=_0x50350f;if(this['_actions'][_0x9714ed(0x102)]<=0x1)return;this[_0x9714ed(0xe6)][_0x9714ed(0x2b3)]();const _0x14e0b3=VisuMZ[_0x9714ed(0x314)]['Settings']['BraveAnimation'];if(_0x14e0b3[_0x9714ed(0x176)]){const _0x4a990c=_0x9714ed(0xc4),_0x5a8f28=_0x14e0b3['%1AnimationID'[_0x9714ed(0x2e4)](_0x4a990c)],_0x371a9a=_0x14e0b3['%1Mirror'[_0x9714ed(0x2e4)](_0x4a990c)],_0x153a71=_0x14e0b3[_0x9714ed(0xc1)[_0x9714ed(0x2e4)](_0x4a990c)];$gameTemp['requestFauxAnimation']([this],_0x5a8f28,_0x371a9a,_0x153a71);}},VisuMZ[_0x50350f(0x314)]['Game_Battler_onTurnEnd']=Game_Battler['prototype'][_0x50350f(0x1ae)],Game_Battler[_0x50350f(0x1cd)][_0x50350f(0x1ae)]=function(){const _0x589c42=_0x50350f;VisuMZ[_0x589c42(0x314)][_0x589c42(0x26d)][_0x589c42(0x2f0)](this),this[_0x589c42(0x2a3)]();},Game_Battler[_0x50350f(0x1cd)][_0x50350f(0x2a3)]=function(){const _0x9b5244=_0x50350f;if(!BattleManager[_0x9b5244(0xe2)]())return;if(!$gameParty[_0x9b5244(0x2c2)]())return;this[_0x9b5244(0x15b)]();},Game_Battler['prototype'][_0x50350f(0x15b)]=function(){const _0x1b925e=_0x50350f,_0x3ae168=VisuMZ[_0x1b925e(0x314)][_0x1b925e(0x1f9)][_0x1b925e(0x1d9)],_0x3a778f=_0x3ae168[_0x1b925e(0x184)];if(_0x3a778f&&!this[_0x1b925e(0x2cf)]())return;const _0x579267=this[_0x1b925e(0x2f9)]();this[_0x1b925e(0x1c3)](_0x579267);},Game_Battler['prototype'][_0x50350f(0x2f9)]=function(){const _0x419950=_0x50350f,_0x2e7bbf=VisuMZ[_0x419950(0x314)][_0x419950(0x10a)],_0x390e38=VisuMZ[_0x419950(0x314)]['Settings'][_0x419950(0x1d9)];let _0xe27db0=_0x390e38[_0x419950(0xca)]||0x0;const _0x13b13c=this['traitObjects']();for(const _0x2331f1 of _0x13b13c){if(!_0x2331f1)continue;const _0x178cdc=_0x2331f1[_0x419950(0xcf)];_0x178cdc[_0x419950(0x19c)](_0x2e7bbf[_0x419950(0x289)])&&(_0xe27db0+=Number(RegExp['$1']));}return _0xe27db0;},Game_Battler[_0x50350f(0x1cd)]['processActionFusionsBTB']=function(){const _0x1deb75=_0x50350f;if(!this[_0x1deb75(0x234)]())return;if(this[_0x1deb75(0x218)]()<=0x1)return;if(!this[_0x1deb75(0x24c)]())return;if(!this[_0x1deb75(0x24c)]()[_0x1deb75(0x1f1)]())return;const _0x146e26=this[_0x1deb75(0x2d5)]();if(_0x146e26['length']<=0x0)return;let _0x5f47b9='',_0x257f26=0x0;const _0x3998f9=this[_0x1deb75(0x24c)]()['isSkill'](),_0x2fcbc7=_0x3998f9?DataManager[_0x1deb75(0x207)]:DataManager['_btbItemFlexFusion'],_0x145c2a=_0x3998f9?DataManager[_0x1deb75(0xdd)]:DataManager[_0x1deb75(0x2cb)];for(const _0x31e69c of _0x146e26){if(!_0x31e69c)continue;_0x2fcbc7[_0x31e69c]&&_0x2fcbc7[_0x31e69c]>=_0x257f26&&(this[_0x1deb75(0x10b)](_0x31e69c)&&(_0x5f47b9=_0x31e69c,_0x257f26=_0x2fcbc7[_0x31e69c])),_0x145c2a[_0x31e69c]&&_0x145c2a[_0x31e69c]>=_0x257f26&&(this['canPayActionFusionCombination'](_0x31e69c)&&(_0x5f47b9=_0x31e69c,_0x257f26=_0x2fcbc7[_0x31e69c]));}if(_0x257f26<=0x0)return;this[_0x1deb75(0x10e)](_0x5f47b9),this['currentAction']()['setActionFusionBTB'](_0x5f47b9),_0x3998f9?this['currentAction']()['setSkill'](_0x257f26):this[_0x1deb75(0x24c)]()['setItem'](_0x257f26);},Game_Battler['prototype']['canProcessActionFusionsBTB']=function(){const _0x1d75c0=_0x50350f;if(this['cannotFusionNotetagBTB']())return![];const _0x2ce310=VisuMZ[_0x1d75c0(0x314)][_0x1d75c0(0x1f9)][_0x1d75c0(0x1d9)];if(this['isActor']()){if(_0x2ce310[_0x1d75c0(0x169)]===undefined)return!![];return _0x2ce310[_0x1d75c0(0x169)];}else{if(_0x2ce310[_0x1d75c0(0x252)]===undefined)return!![];return _0x2ce310[_0x1d75c0(0x252)];}},Game_BattlerBase[_0x50350f(0x1cd)][_0x50350f(0x311)]=function(){const _0x3a1835=_0x50350f,_0x3f8838=VisuMZ['BattleSystemBTB']['RegExp'],_0x35b411=this[_0x3a1835(0x13d)]();for(const _0x19a9f1 of _0x35b411){if(!_0x19a9f1)continue;const _0x1ee2a5=_0x19a9f1['note'];if(_0x1ee2a5[_0x3a1835(0x19c)](_0x3f8838[_0x3a1835(0x1fe)]))return!![];if(_0x1ee2a5[_0x3a1835(0x19c)](_0x3f8838[_0x3a1835(0x101)]))return![];}return![];},Game_Battler['prototype']['getActionFusionCombinationsBTB']=function(){const _0x3020a3=_0x50350f,_0xea02c9=this[_0x3020a3(0x24c)](),_0x1a18a9=this['_actions'],_0x239050=_0x1a18a9[_0x3020a3(0x281)](_0x5d81cb=>this[_0x3020a3(0x267)](_0xea02c9,_0x5d81cb)),_0x4f2fc6=_0x239050['map'](_0x3127f1=>_0x3127f1[_0x3020a3(0x1f1)]()['id']),_0x119570=VisuMZ[_0x3020a3(0x314)][_0x3020a3(0x14c)](_0xea02c9['item']()['id'],_0x4f2fc6);let _0x68950e=String(_0xea02c9[_0x3020a3(0x1f1)]()['id']);for(let _0x384e6d=0x1;_0x384e6d<_0x1a18a9[_0x3020a3(0x102)];_0x384e6d++){const _0x362d43=_0x1a18a9[_0x384e6d];if(this[_0x3020a3(0x267)](_0xea02c9,_0x362d43))_0x68950e='%1-%2'[_0x3020a3(0x2e4)](_0x68950e,_0x362d43['item']()['id']),_0x119570[_0x3020a3(0x256)](_0x68950e);else break;}return _0x119570['filter']((_0x326402,_0x24c012,_0x16fce9)=>_0x16fce9[_0x3020a3(0x11b)](_0x326402)===_0x24c012);},VisuMZ['BattleSystemBTB'][_0x50350f(0x14c)]=function(_0x3df1c8,_0xd2dec4){const _0x2be919=[],_0x5c1cf1=function(_0x3bbd2d,_0x59e731){const _0x26ab81=_0x2cca;for(var _0x2e1f03=0x0;_0x2e1f03<_0x59e731[_0x26ab81(0x102)];_0x2e1f03++){_0x2be919['push'](_0x3bbd2d+'-'+_0x59e731[_0x2e1f03]),_0x5c1cf1(_0x3bbd2d+'-'+_0x59e731[_0x2e1f03],_0x59e731[_0x26ab81(0x165)](_0x2e1f03+0x1));}};return _0x5c1cf1(_0x3df1c8,_0xd2dec4),_0x2be919;},Game_Battler[_0x50350f(0x1cd)][_0x50350f(0x267)]=function(_0x25dc0d,_0x3f2c40){const _0x1e751c=_0x50350f;if(!_0x25dc0d||!_0x3f2c40)return![];if(_0x25dc0d===_0x3f2c40)return![];if(!_0x25dc0d[_0x1e751c(0x1f1)]()||!_0x3f2c40[_0x1e751c(0x1f1)]())return![];if(_0x25dc0d[_0x1e751c(0x21f)]()!==_0x3f2c40['isSkill']())return![];return!![];},Game_Battler['prototype'][_0x50350f(0x10b)]=function(_0xf36ef3){const _0x390ebb=_0x50350f,_0x52f7ad=this[_0x390ebb(0x24c)]()[_0x390ebb(0x21f)](),_0x4ed647=JsonEx[_0x390ebb(0x2f1)](this);_0x4ed647[_0x390ebb(0x200)]=!![],_0x4ed647[_0x390ebb(0x24c)]()['setActionFusionBTB'](_0xf36ef3);const _0x33af11=JsonEx[_0x390ebb(0x2f1)]($gameParty['_items']),_0x309ed2=JsonEx[_0x390ebb(0x2f1)]($gameParty[_0x390ebb(0x220)]),_0x23124c=JsonEx['makeDeepCopy']($gameParty[_0x390ebb(0x1ac)]);let _0x54848c=_0x52f7ad?_0x4ed647[_0x390ebb(0xd1)]():_0x4ed647[_0x390ebb(0x103)]();return $gameParty[_0x390ebb(0x12f)]=_0x33af11,$gameParty[_0x390ebb(0x220)]=_0x309ed2,$gameParty[_0x390ebb(0x1ac)]=_0x23124c,_0x54848c;},Game_Battler[_0x50350f(0x1cd)][_0x50350f(0x10e)]=function(_0x21e4a4){const _0x4cdbb3=_0x50350f,_0x28ff86=this['currentAction'](),_0x17d62f=_0x21e4a4[_0x4cdbb3(0x193)]('-')['map'](_0xc90ab0=>Number(_0xc90ab0));_0x17d62f['shift']();const _0x2e6da3=this[_0x4cdbb3(0xe6)],_0x1d4cd9=[];for(const _0x4af0dd of _0x2e6da3){this[_0x4cdbb3(0x267)](_0x28ff86,_0x4af0dd)&&(_0x17d62f[_0x4cdbb3(0x237)](_0x4af0dd[_0x4cdbb3(0x1f1)]()['id'])&&(_0x1d4cd9[_0x4cdbb3(0x256)](_0x4af0dd),_0x17d62f[_0x4cdbb3(0x2f5)](_0x17d62f[_0x4cdbb3(0x11b)](_0x4af0dd[_0x4cdbb3(0x1f1)]()['id']),0x1)));}for(const _0x515c67 of _0x1d4cd9){_0x2e6da3[_0x4cdbb3(0x2e0)](_0x515c67);}},Game_Actor[_0x50350f(0x1cd)][_0x50350f(0x1a5)]=function(_0x377f47){const _0xace809=_0x50350f;Game_Battler['prototype'][_0xace809(0x1a5)][_0xace809(0x2f0)](this,_0x377f47);if(!SceneManager[_0xace809(0x117)]())return;if(!BattleManager['allBattleMembers']()['includes'](this))return;BattleManager[_0xace809(0x15d)]();},VisuMZ[_0x50350f(0x314)][_0x50350f(0x2cd)]=Game_Actor[_0x50350f(0x1cd)][_0x50350f(0x14e)],Game_Actor[_0x50350f(0x1cd)]['makeActions']=function(){const _0x2ac1df=_0x50350f;VisuMZ[_0x2ac1df(0x314)]['Game_Actor_makeActions'][_0x2ac1df(0x2f0)](this),BattleManager[_0x2ac1df(0xe2)]()&&this[_0x2ac1df(0x28d)]()<0x0&&this['clearActions']();},Game_Actor['prototype'][_0x50350f(0xc6)]=function(){const _0x3331fa=_0x50350f,_0x39e2c3=this[_0x3331fa(0x1fc)]()[_0x3331fa(0xcf)];if(_0x39e2c3['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x3331fa(0xec);else{if(_0x39e2c3[_0x3331fa(0x19c)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0x3331fa(0xd2);}return Window_BTB_TurnOrder['Settings'][_0x3331fa(0x21a)];},Game_Actor[_0x50350f(0x1cd)][_0x50350f(0x2b9)]=function(){const _0x2081c6=_0x50350f,_0x585be5=this[_0x2081c6(0x1fc)]()[_0x2081c6(0xcf)];if(_0x585be5[_0x2081c6(0x19c)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this['faceName']();},Game_Actor[_0x50350f(0x1cd)][_0x50350f(0xf9)]=function(){const _0x469a1b=_0x50350f,_0x4a28f1=this['actor']()['note'];if(_0x4a28f1[_0x469a1b(0x19c)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this['faceIndex']();},Game_Actor[_0x50350f(0x1cd)][_0x50350f(0x2b2)]=function(){const _0x37c7a2=_0x50350f,_0x2f8352=this[_0x37c7a2(0x1fc)]()[_0x37c7a2(0xcf)];if(_0x2f8352['match'](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_BTB_TurnOrder['Settings'][_0x37c7a2(0x148)];},Game_Actor[_0x50350f(0x1cd)]['canActionFusionWithBTB']=function(_0x1662c6,_0x6a3614){const _0x5a7817=_0x50350f;if(!Game_Battler[_0x5a7817(0x1cd)][_0x5a7817(0x267)][_0x5a7817(0x2f0)](this,_0x1662c6,_0x6a3614))return![];if(_0x1662c6[_0x5a7817(0x15a)]()&&_0x6a3614[_0x5a7817(0x15a)]()){if(_0x1662c6[_0x5a7817(0x225)]()!==_0x6a3614[_0x5a7817(0x225)]())return![];if(_0x1662c6[_0x5a7817(0x217)]!==_0x6a3614[_0x5a7817(0x217)])return![];}return!![];},Game_Enemy['prototype']['createTurnOrderBTBGraphicType']=function(){const _0x25bc90=_0x50350f,_0x2fb58a=this['enemy']()[_0x25bc90(0xcf)];if(_0x2fb58a['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x25bc90(0xec);else{if(_0x2fb58a[_0x25bc90(0x19c)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return Window_BTB_TurnOrder[_0x25bc90(0x1f9)]['EnemyBattlerType'];},Game_Enemy[_0x50350f(0x1cd)][_0x50350f(0x2b9)]=function(){const _0x451165=_0x50350f,_0x565b76=this['enemy']()[_0x451165(0xcf)];if(_0x565b76['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_BTB_TurnOrder[_0x451165(0x1f9)][_0x451165(0x2fb)];},Game_Enemy['prototype'][_0x50350f(0xf9)]=function(){const _0x3fe8ae=_0x50350f,_0x3c0974=this[_0x3fe8ae(0x2df)]()[_0x3fe8ae(0xcf)];if(_0x3c0974['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_BTB_TurnOrder[_0x3fe8ae(0x1f9)][_0x3fe8ae(0x27e)];},Game_Enemy[_0x50350f(0x1cd)]['createTurnOrderBTBGraphicIconIndex']=function(){const _0x233116=_0x50350f,_0x13e9b9=this[_0x233116(0x2df)]()[_0x233116(0xcf)];if(_0x13e9b9[_0x233116(0x19c)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_BTB_TurnOrder['Settings'][_0x233116(0x22c)];},VisuMZ[_0x50350f(0x314)][_0x50350f(0x121)]=Game_Enemy[_0x50350f(0x1cd)][_0x50350f(0x14e)],Game_Enemy['prototype']['makeActions']=function(){const _0x49bb54=_0x50350f;VisuMZ['BattleSystemBTB'][_0x49bb54(0x121)][_0x49bb54(0x2f0)](this),this[_0x49bb54(0x296)](),this[_0x49bb54(0x140)]();},Game_Enemy[_0x50350f(0x1cd)]['checkActionsBTB']=function(){const _0xf0b736=_0x50350f;if(!BattleManager[_0xf0b736(0xe2)]())return;if(this[_0xf0b736(0x218)]()<=0x0)return;this['_braveStartupAnimation']=![],this['bravePoints']()<0x0&&this[_0xf0b736(0x20d)]();},Game_Enemy[_0x50350f(0x1cd)][_0x50350f(0x140)]=function(){const _0x312395=_0x50350f;if(!BattleManager[_0x312395(0xe2)]())return;if(this[_0x312395(0x218)]()<=0x0)return;const _0x344723=this[_0x312395(0xe6)][0x0];if(!_0x344723)return;const _0x14c428=_0x344723[_0x312395(0x1f1)]();if(!_0x14c428)return;const _0x343fc4=VisuMZ['BattleSystemBTB'][_0x312395(0x10a)],_0x505ed4=_0x14c428['note'];let _0x4f937f=[];if(_0x505ed4[_0x312395(0x19c)](_0x343fc4[_0x312395(0xde)])){const _0x535a72=String(RegExp['$1'])[_0x312395(0x193)](',');for(let _0x4ee284 of _0x535a72){_0x4ee284=(String(_0x4ee284)||'')[_0x312395(0xcc)]();const _0x79a99=/^\d+$/[_0x312395(0x2a8)](_0x4ee284);_0x79a99?_0x4f937f[_0x312395(0x256)](Number(_0x4ee284)):_0x4f937f[_0x312395(0x256)](DataManager[_0x312395(0x13c)](_0x4ee284));}}if(_0x4f937f[_0x312395(0x102)]<=0x0)return;while(_0x4f937f['length']>this[_0x312395(0x21e)]()){_0x4f937f['pop']();}if(_0x4f937f[_0x312395(0x102)]<=0x0)return;this[_0x312395(0x20d)]();for(const _0x3c0094 of _0x4f937f){const _0x312189=new Game_Action(this);_0x312189['setSkill'](_0x3c0094),_0x312189[_0x312395(0x146)]=!![],this[_0x312395(0xe6)][_0x312395(0x256)](_0x312189);}},Game_Enemy[_0x50350f(0x1cd)][_0x50350f(0x262)]=function(){const _0x27ef8b=_0x50350f;let _0x3c82ba=this[_0x27ef8b(0x218)]();for(const _0x2749a5 of this['_actions']){if(!_0x2749a5)continue;_0x3c82ba+=_0x2749a5[_0x27ef8b(0x30a)]();}return _0x3c82ba-0x1;},VisuMZ[_0x50350f(0x314)][_0x50350f(0x2d3)]=Game_Unit[_0x50350f(0x1cd)][_0x50350f(0x14e)],Game_Unit[_0x50350f(0x1cd)]['makeActions']=function(){const _0x25c6ba=_0x50350f;VisuMZ['BattleSystemBTB'][_0x25c6ba(0x2d3)][_0x25c6ba(0x2f0)](this),BattleManager[_0x25c6ba(0xe2)]()&&this===$gameTroop&&SceneManager[_0x25c6ba(0x117)]()&&BattleManager['makeActionOrders']();},VisuMZ[_0x50350f(0x314)][_0x50350f(0x18e)]=Game_Party['prototype']['removeActor'],Game_Party[_0x50350f(0x1cd)][_0x50350f(0x1b1)]=function(_0x304147){const _0xdf5ac8=_0x50350f;VisuMZ[_0xdf5ac8(0x314)][_0xdf5ac8(0x18e)][_0xdf5ac8(0x2f0)](this,_0x304147),SceneManager[_0xdf5ac8(0x117)]()&&BattleManager[_0xdf5ac8(0xe2)]()&&BattleManager[_0xdf5ac8(0x2d9)][_0xdf5ac8(0x2e0)]($gameActors[_0xdf5ac8(0x1fc)](_0x304147));},VisuMZ[_0x50350f(0x314)][_0x50350f(0x1c8)]=Scene_Battle[_0x50350f(0x1cd)][_0x50350f(0x30f)],Scene_Battle[_0x50350f(0x1cd)][_0x50350f(0x30f)]=function(){const _0x9e4d2e=_0x50350f;BattleManager[_0x9e4d2e(0xe2)]()?this['selectNextCommand']():VisuMZ[_0x9e4d2e(0x314)][_0x9e4d2e(0x1c8)][_0x9e4d2e(0x2f0)](this);},VisuMZ[_0x50350f(0x314)][_0x50350f(0x274)]=Scene_Battle['prototype']['createActorCommandWindow'],Scene_Battle['prototype']['createActorCommandWindow']=function(){const _0x51e266=_0x50350f;VisuMZ[_0x51e266(0x314)]['Scene_Battle_createActorCommandWindow'][_0x51e266(0x2f0)](this),this['createActorCommandWindowBTB']();},Scene_Battle['prototype'][_0x50350f(0x26f)]=function(){const _0x72cae5=_0x50350f;if(!BattleManager[_0x72cae5(0xe2)]())return;const _0x3a9c2e=this[_0x72cae5(0xef)];if(!_0x3a9c2e)return;_0x3a9c2e[_0x72cae5(0xe9)](_0x72cae5(0x18b),this[_0x72cae5(0x173)][_0x72cae5(0x16a)](this)),_0x3a9c2e[_0x72cae5(0xe9)](_0x72cae5(0x2cc),this[_0x72cae5(0xf1)][_0x72cae5(0x16a)](this));},Scene_Battle[_0x50350f(0x1cd)][_0x50350f(0x173)]=function(){const _0x5dfbd2=_0x50350f;this[_0x5dfbd2(0x269)]();},Scene_Battle[_0x50350f(0x1cd)]['commandCancelBTB']=function(){const _0x56b803=_0x50350f,_0x1d4cad=BattleManager[_0x56b803(0x1fc)]();if(!_0x1d4cad)this['commandCancel']();else{if(_0x1d4cad['numActions']()<=0x1)this[_0x56b803(0x290)]();else _0x1d4cad[_0x56b803(0x1ef)]>0x0?this[_0x56b803(0x290)]():this[_0x56b803(0x2de)]();}},Scene_Battle[_0x50350f(0x1cd)]['performBrave']=function(){const _0x37048f=_0x50350f,_0x2ca54c=BattleManager[_0x37048f(0x1fc)]();if(!_0x2ca54c)return;_0x2ca54c[_0x37048f(0x269)]();const _0x46c99a=this[_0x37048f(0xef)][_0x37048f(0x178)],_0x4fa691=this[_0x37048f(0xef)][_0x37048f(0x2ea)],_0x4452e8=this['_actorCommandWindow']['index']();this['_actorCommandWindow'][_0x37048f(0x224)](_0x2ca54c),this[_0x37048f(0xef)][_0x37048f(0x155)](_0x4452e8),this['_actorCommandWindow'][_0x37048f(0x178)]=_0x46c99a,this[_0x37048f(0xef)][_0x37048f(0x2ea)]=_0x4fa691;},Scene_Battle['prototype'][_0x50350f(0x2de)]=function(){const _0x100acc=_0x50350f,_0x328ae2=BattleManager['actor']();if(!_0x328ae2)return;_0x328ae2[_0x100acc(0x139)]();const _0x4efff5=this[_0x100acc(0xef)][_0x100acc(0x178)],_0xf81642=this[_0x100acc(0xef)][_0x100acc(0x2ea)],_0x4aeff2=this[_0x100acc(0xef)][_0x100acc(0x2c1)]();this['_actorCommandWindow'][_0x100acc(0x224)](_0x328ae2),this[_0x100acc(0xef)]['select'](_0x4aeff2),this['_actorCommandWindow'][_0x100acc(0x178)]=_0x4efff5,this[_0x100acc(0xef)]['_scrollY']=_0xf81642;},VisuMZ[_0x50350f(0x314)]['Scene_Battle_createAllWindows']=Scene_Battle[_0x50350f(0x1cd)][_0x50350f(0x19d)],Scene_Battle[_0x50350f(0x1cd)][_0x50350f(0x19d)]=function(){const _0x6c6bbd=_0x50350f;VisuMZ[_0x6c6bbd(0x314)]['Scene_Battle_createAllWindows']['call'](this),this[_0x6c6bbd(0x239)]();},Scene_Battle[_0x50350f(0x1cd)]['createBTBTurnOrderWindow']=function(){const _0x295b5e=_0x50350f;if(!BattleManager[_0x295b5e(0xe2)]())return;this[_0x295b5e(0x1ee)]=new Window_BTB_TurnOrder();const _0x38c248=this[_0x295b5e(0x275)](this['_windowLayer']);this['addChildAt'](this['_btbTurnOrderWindow'],_0x38c248),this[_0x295b5e(0xd8)](),BattleManager[_0x295b5e(0x1f7)](!![]);},Scene_Battle[_0x50350f(0x1cd)]['repositionLogWindowBTB']=function(){const _0x9312e3=_0x50350f,_0x552ce3=Window_BTB_TurnOrder[_0x9312e3(0x1f9)];if(_0x552ce3['DisplayPosition']!==_0x9312e3(0x197))return;if(!_0x552ce3[_0x9312e3(0x187)])return;if(!this['_logWindow'])return;const _0x227161=this['_btbTurnOrderWindow']['y']-Math[_0x9312e3(0x1b7)]((Graphics[_0x9312e3(0x21b)]-Graphics['boxHeight'])/0x2),_0x3d1197=_0x227161+this[_0x9312e3(0x1ee)][_0x9312e3(0x21b)];this['_logWindow']['y']=_0x3d1197+_0x552ce3['ScreenBuffer'];};function Sprite_BTB_TurnOrder_Battler(){this['initialize'](...arguments);}function _0x2cca(_0x2c01f3,_0x348271){const _0x444731=_0x4447();return _0x2cca=function(_0x2cca99,_0x37bbcf){_0x2cca99=_0x2cca99-0xbb;let _0x22155b=_0x444731[_0x2cca99];return _0x22155b;},_0x2cca(_0x2c01f3,_0x348271);}Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)]=Object[_0x50350f(0x29a)](Sprite_Clickable[_0x50350f(0x1cd)]),Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0x22b)]=Sprite_BTB_TurnOrder_Battler,Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0xbb)]=function(_0x22fb35,_0x49f33d){const _0x7bb3a9=_0x50350f;this['initMembers'](_0x22fb35,_0x49f33d),Sprite_Clickable[_0x7bb3a9(0x1cd)][_0x7bb3a9(0xbb)]['call'](this),this[_0x7bb3a9(0x2ef)]=0x0,this['createChildren'](),this[_0x7bb3a9(0x1d3)]();},Sprite_BTB_TurnOrder_Battler['prototype']['initMembers']=function(_0x1ebd64,_0x1f091a){const _0x435517=_0x50350f;this['_unit']=_0x1ebd64,this[_0x435517(0x2b8)]=_0x1f091a;const _0x406236=Window_BTB_TurnOrder[_0x435517(0x1f9)],_0x29def2=this[_0x435517(0xf8)](),_0x2c7a6a=this[_0x435517(0x1d7)]();this[_0x435517(0x1a0)]=0x0,this['_positionTargetX']=_0x29def2?_0x406236[_0x435517(0x279)]*_0x2c7a6a:0x0,this[_0x435517(0x215)]=_0x29def2?0x0:_0x406236[_0x435517(0x279)]*_0x2c7a6a,this['_fadeDuration']=0x0,this['_fadeTarget']=0xff,this[_0x435517(0x2db)]=![],this[_0x435517(0x235)]=![],this['_containerWidth']=0x0,this[_0x435517(0x230)]=0x0;},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0x232)]=function(){const _0x417ac9=_0x50350f;this[_0x417ac9(0x2c4)](),this[_0x417ac9(0xee)](),this['createGraphicSprite'](),this['createBorderSprite'](),this[_0x417ac9(0xc7)]();},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0x2c4)]=function(){const _0x440504=_0x50350f;this['x']=this[_0x440504(0x291)],this['y']=this[_0x440504(0x215)];},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0xf8)]=function(){const _0x450e9c=_0x50350f,_0x28c326=Window_BTB_TurnOrder[_0x450e9c(0x1f9)],_0x4fa2f0=[_0x450e9c(0x197),'bottom'][_0x450e9c(0x237)](_0x28c326[_0x450e9c(0x2a0)]);return _0x4fa2f0;},Sprite_BTB_TurnOrder_Battler['prototype'][_0x50350f(0x29c)]=function(){const _0x4ebdba=_0x50350f,_0x11d78a=Window_BTB_TurnOrder[_0x4ebdba(0x1f9)];return this[_0x4ebdba(0xf8)]()?_0x11d78a[_0x4ebdba(0x279)]:_0x11d78a[_0x4ebdba(0x2eb)];},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0x2c0)]=function(){const _0x15e11d=_0x50350f,_0x3606f6=Window_BTB_TurnOrder['Settings'];return this[_0x15e11d(0xf8)]()?_0x3606f6[_0x15e11d(0x2eb)]:_0x3606f6['SpriteThin'];},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0xed)]=function(){const _0x3f98ef=_0x50350f;this['bitmap']=new Bitmap(0x48,0x24);const _0x4a05d6=this[_0x3f98ef(0x219)]()?this[_0x3f98ef(0x219)]()[_0x3f98ef(0x2a2)]():'%1\x20%2\x20%3'['format'](this['_unit'],this[_0x3f98ef(0x2b8)]);this[_0x3f98ef(0x1f5)]['drawText'](_0x4a05d6,0x0,0x0,0x48,0x24,_0x3f98ef(0x282));},Sprite_BTB_TurnOrder_Battler['prototype'][_0x50350f(0xee)]=function(){const _0x23affe=_0x50350f;if(!Window_BTB_TurnOrder[_0x23affe(0x1f9)][_0x23affe(0xcb)])return;const _0x4c07e6=Window_BTB_TurnOrder[_0x23affe(0x1f9)],_0x19065b=this[_0x23affe(0x2a6)]===$gameParty?'Actor':'Enemy',_0x13a929=_0x23affe(0x1d4)['format'](_0x19065b),_0x2c7806=new Sprite();_0x2c7806['anchor']['x']=this[_0x23affe(0x17c)]['x'],_0x2c7806[_0x23affe(0x17c)]['y']=this[_0x23affe(0x17c)]['y'];if(_0x4c07e6[_0x13a929])_0x2c7806['bitmap']=ImageManager[_0x23affe(0x1c0)](_0x4c07e6[_0x13a929]);else{const _0x26142b=this[_0x23affe(0x29c)](),_0x3d630c=this[_0x23affe(0x2c0)]();_0x2c7806[_0x23affe(0x1f5)]=new Bitmap(_0x26142b,_0x3d630c);const _0x43a081=ColorManager['getColor'](_0x4c07e6['%1BgColor1'['format'](_0x19065b)]),_0x2523f2=ColorManager[_0x23affe(0x26c)](_0x4c07e6[_0x23affe(0x1a1)['format'](_0x19065b)]);_0x2c7806['bitmap']['gradientFillRect'](0x0,0x0,_0x26142b,_0x3d630c,_0x43a081,_0x2523f2,!![]);}this[_0x23affe(0x1bf)]=_0x2c7806,this[_0x23affe(0x1db)](this['_backgroundSprite']);},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)]['createGraphicSprite']=function(){const _0x30f536=_0x50350f,_0x55e2c4=new Sprite();_0x55e2c4[_0x30f536(0x17c)]['x']=this[_0x30f536(0x17c)]['x'],_0x55e2c4[_0x30f536(0x17c)]['y']=this[_0x30f536(0x17c)]['y'],this['_graphicSprite']=_0x55e2c4,this[_0x30f536(0x1db)](this[_0x30f536(0xc2)]),this[_0x30f536(0x2ab)]();},Sprite_BTB_TurnOrder_Battler['prototype'][_0x50350f(0x2c7)]=function(){const _0x58cb48=_0x50350f;if(!Window_BTB_TurnOrder['Settings'][_0x58cb48(0x1ab)])return;const _0x126479=Window_BTB_TurnOrder[_0x58cb48(0x1f9)],_0x162ed4=this['_unit']===$gameParty?_0x58cb48(0x315):_0x58cb48(0xd6),_0x1de578=_0x58cb48(0x1e6)['format'](_0x162ed4),_0x140824=new Sprite();_0x140824[_0x58cb48(0x17c)]['x']=this['anchor']['x'],_0x140824['anchor']['y']=this[_0x58cb48(0x17c)]['y'];if(_0x126479[_0x1de578])_0x140824[_0x58cb48(0x1f5)]=ImageManager['loadSystem'](_0x126479[_0x1de578]);else{let _0x51dab1=this[_0x58cb48(0x29c)](),_0x198518=this['bitmapHeight'](),_0x297e37=_0x126479[_0x58cb48(0x231)];_0x140824['bitmap']=new Bitmap(_0x51dab1,_0x198518);const _0x25cb5a='#000000',_0x5291a8=ColorManager[_0x58cb48(0x26c)](_0x126479[_0x58cb48(0x23a)[_0x58cb48(0x2e4)](_0x162ed4)]);_0x140824[_0x58cb48(0x1f5)][_0x58cb48(0x13a)](0x0,0x0,_0x51dab1,_0x198518,_0x25cb5a),_0x51dab1-=0x2,_0x198518-=0x2,_0x140824[_0x58cb48(0x1f5)][_0x58cb48(0x13a)](0x1,0x1,_0x51dab1,_0x198518,_0x5291a8),_0x51dab1-=_0x297e37*0x2,_0x198518-=_0x297e37*0x2,_0x140824[_0x58cb48(0x1f5)][_0x58cb48(0x13a)](0x1+_0x297e37,0x1+_0x297e37,_0x51dab1,_0x198518,_0x25cb5a),_0x51dab1-=0x2,_0x198518-=0x2,_0x297e37+=0x1,_0x140824['bitmap'][_0x58cb48(0x12e)](0x1+_0x297e37,0x1+_0x297e37,_0x51dab1,_0x198518);}this['_backgroundSprite']=_0x140824,this[_0x58cb48(0x1db)](this['_backgroundSprite']),this['width']=this[_0x58cb48(0x1bf)][_0x58cb48(0x2ec)],this[_0x58cb48(0x21b)]=this[_0x58cb48(0x1bf)][_0x58cb48(0x21b)];},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0xc7)]=function(){const _0x402cba=_0x50350f,_0x41477d=Window_BTB_TurnOrder[_0x402cba(0x1f9)];if(!_0x41477d[_0x402cba(0x286)])return;if(this['_unit']===$gameParty)return;const _0x1428eb=this[_0x402cba(0x29c)](),_0xe174f4=this[_0x402cba(0x2c0)](),_0x4917d6=new Sprite();_0x4917d6[_0x402cba(0x17c)]['x']=this['anchor']['x'],_0x4917d6[_0x402cba(0x17c)]['y']=this[_0x402cba(0x17c)]['y'],_0x4917d6['bitmap']=new Bitmap(_0x1428eb,_0xe174f4),this[_0x402cba(0xfb)]=_0x4917d6,this[_0x402cba(0x1db)](this['_letterSprite']);},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0x219)]=function(){const _0x2d7569=_0x50350f;return this[_0x2d7569(0x2a6)]?this[_0x2d7569(0x2a6)]['members']()[this[_0x2d7569(0x2b8)]]:null;},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0x2b6)]=function(){const _0x5b1241=_0x50350f;Sprite_Clickable[_0x5b1241(0x1cd)][_0x5b1241(0x2b6)]['call'](this),this['checkPosition'](),this[_0x5b1241(0x1a2)](),this[_0x5b1241(0x1d3)](),this['updateOpacity'](),this[_0x5b1241(0x283)](),this[_0x5b1241(0x251)](),this[_0x5b1241(0x156)](),this[_0x5b1241(0x309)]();},Sprite_BTB_TurnOrder_Battler['prototype'][_0x50350f(0xf6)]=function(){const _0x1f7380=_0x50350f,_0x2815d4=this['containerPosition']();if(this[_0x1f7380(0x25c)]===_0x2815d4)return;this[_0x1f7380(0x25c)]=_0x2815d4;this[_0x1f7380(0x2ef)]<0xff&&this[_0x1f7380(0x219)]()&&_0x2815d4!==this['defaultPosition']()&&this[_0x1f7380(0x29f)](0xff);if(_0x2815d4===this[_0x1f7380(0x1d7)]()&&this[_0x1f7380(0x111)]<=0x0&&this[_0x1f7380(0x2ef)]>0x0)this['startFade'](0x0);else this['_fadeDuration']<=0x0&&this[_0x1f7380(0x2ef)]<0xff&&this['checkOpacity']();this['calculateTargetPositions']();},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0x254)]=function(){const _0xc1a271=_0x50350f,_0x5bfbdf=this[_0xc1a271(0x172)]();if(!_0x5bfbdf)return;let _0x296324=![];if(this[_0xc1a271(0x175)]!==_0x5bfbdf[_0xc1a271(0x2ec)])_0x296324=!![];else this[_0xc1a271(0x230)]!==_0x5bfbdf[_0xc1a271(0x21b)]&&(_0x296324=!![]);_0x296324&&this[_0xc1a271(0x298)]();},Sprite_BTB_TurnOrder_Battler['prototype']['calculateTargetPositions']=function(){const _0x3cfd1d=_0x50350f,_0x12e623=Window_BTB_TurnOrder[_0x3cfd1d(0x1f9)],_0x47eb60=this[_0x3cfd1d(0xf8)](),_0x3aa06c=_0x12e623['OrderDirection'],_0x3e17ce=_0x12e623[_0x3cfd1d(0x2d2)],_0x2d64a7=SceneManager[_0x3cfd1d(0x253)][_0x3cfd1d(0x1ee)];if(!_0x2d64a7)return;const _0x45f2d1=this[_0x3cfd1d(0x1f0)]();this[_0x3cfd1d(0x1a0)]=_0x12e623[_0x3cfd1d(0x14a)],this[_0x3cfd1d(0x291)]=_0x47eb60?_0x12e623[_0x3cfd1d(0x279)]*_0x45f2d1:0x0,this[_0x3cfd1d(0x215)]=_0x47eb60?0x0:_0x12e623[_0x3cfd1d(0x279)]*_0x45f2d1,_0x45f2d1>0x0&&(this[_0x3cfd1d(0x291)]+=_0x47eb60?_0x3e17ce:0x0,this['_positionTargetY']+=_0x47eb60?0x0:_0x3e17ce),_0x3aa06c?this[_0x3cfd1d(0x291)]=_0x47eb60?_0x2d64a7[_0x3cfd1d(0x2ec)]-this['_positionTargetX']-_0x12e623['SpriteThin']:0x0:this[_0x3cfd1d(0x215)]=_0x47eb60?0x0:_0x2d64a7[_0x3cfd1d(0x21b)]-this[_0x3cfd1d(0x215)]-_0x12e623['SpriteThin'];},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0x1a2)]=function(){const _0x24b2ef=_0x50350f;if(this[_0x24b2ef(0x111)]>0x0)return;if(this['_positionDuration']>0x0){const _0x150bbb=this[_0x24b2ef(0x1a0)];this['x']=(this['x']*(_0x150bbb-0x1)+this[_0x24b2ef(0x291)])/_0x150bbb,this['y']=(this['y']*(_0x150bbb-0x1)+this[_0x24b2ef(0x215)])/_0x150bbb,this['_positionDuration']--;}if(this['_positionDuration']<=0x0){this['x']=this[_0x24b2ef(0x291)],this['y']=this[_0x24b2ef(0x215)];if(this[_0x24b2ef(0x2ef)]<0xff&&!this[_0x24b2ef(0x1e2)]&&this[_0x24b2ef(0x111)]<=0x0){const _0x9c3263=this[_0x24b2ef(0x219)]();_0x9c3263&&(this[_0x24b2ef(0x134)]=_0x9c3263[_0x24b2ef(0x2cf)]()&&_0x9c3263[_0x24b2ef(0x1ca)]()?0xff:0x0);}}},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0x1d7)]=function(){const _0x53d83b=_0x50350f,_0x27a354=Window_BTB_TurnOrder[_0x53d83b(0x1f9)],_0x5e6e9d=this[_0x53d83b(0xf8)]()?_0x27a354[_0x53d83b(0x104)]:_0x27a354['MaxVertSprites'];return _0x5e6e9d+0x1;},Sprite_BTB_TurnOrder_Battler['prototype']['containerWindow']=function(){const _0x3043af=_0x50350f;return SceneManager['_scene'][_0x3043af(0x1ee)];},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0x1f0)]=function(){const _0x3d38f3=_0x50350f,_0x27ad78=this[_0x3d38f3(0x219)]();if(!_0x27ad78)return this[_0x3d38f3(0x1d7)]();if(_0x27ad78===BattleManager[_0x3d38f3(0xda)])return 0x0;if(BattleManager[_0x3d38f3(0x2d9)]['includes'](_0x27ad78)){const _0x1b7ab8=BattleManager[_0x3d38f3(0x2d9)][_0x3d38f3(0x11b)](_0x27ad78)+0x1;return _0x1b7ab8;}return this[_0x3d38f3(0x1d7)]();},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0x29f)]=function(_0x2de203){const _0x219192=_0x50350f,_0x398f90=Window_BTB_TurnOrder['Settings'];this['_fadeDuration']=_0x398f90['UpdateFrames'],this[_0x219192(0x134)]=_0x2de203;},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)]['checkOpacity']=function(){const _0xeb3771=_0x50350f,_0x195377=this[_0xeb3771(0x219)]();if(!_0x195377)return;if(this[_0xeb3771(0x2db)]===_0x195377[_0xeb3771(0x2cf)]()&&this['_isAppeared']===_0x195377['isAppeared']())return;this['_isAlive']=_0x195377['isAlive'](),this[_0xeb3771(0x235)]=_0x195377[_0xeb3771(0x1ca)]();let _0x15eaf1=this[_0xeb3771(0x2db)]&&this['_isAppeared']?0xff:0x0;this[_0xeb3771(0x29f)](_0x15eaf1);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x50350f(0x14b)]=function(){const _0x182e12=_0x50350f;if(this[_0x182e12(0x111)]>0x0){const _0x339793=this[_0x182e12(0x111)];this[_0x182e12(0x2ef)]=(this[_0x182e12(0x2ef)]*(_0x339793-0x1)+this[_0x182e12(0x134)])/_0x339793,this[_0x182e12(0x111)]--,this[_0x182e12(0x111)]<=0x0&&(this[_0x182e12(0xf6)](),this['_positionDuration']=0x0,this[_0x182e12(0x1a2)](),this[_0x182e12(0x2ef)]=this[_0x182e12(0x134)]);}if(this[_0x182e12(0x1e2)])return;BattleManager['_phase']==='battleEnd'&&(this['_isBattleOver']=!![],this[_0x182e12(0x29f)](0x0));},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0x283)]=function(){const _0x53136e=_0x50350f,_0x363b41=this['battler']();if(!_0x363b41)return;const _0x59ecca=Window_BTB_TurnOrder[_0x53136e(0x1f9)],_0x484536=this[_0x53136e(0x2a6)]===$gameParty?_0x53136e(0x315):'Enemy';let _0x39899a=_0x363b41[_0x53136e(0x258)]();if(_0x363b41['isActor']()&&_0x39899a===_0x53136e(0x2df))_0x39899a='face';else _0x363b41[_0x53136e(0x2b5)]()&&_0x39899a===_0x53136e(0x174)&&(_0x39899a='enemy');if(this[_0x53136e(0x126)]!==_0x39899a)return this[_0x53136e(0x2ab)]();switch(this['_graphicType']){case _0x53136e(0xec):if(this[_0x53136e(0x2e3)]!==_0x363b41['TurnOrderBTBGraphicFaceName']())return this[_0x53136e(0x2ab)]();if(this[_0x53136e(0x144)]!==_0x363b41[_0x53136e(0x2c9)]())return this['processUpdateGraphic']();break;case _0x53136e(0xd2):if(this[_0x53136e(0x18c)]!==_0x363b41[_0x53136e(0x1cf)]())return this[_0x53136e(0x2ab)]();break;case _0x53136e(0x2df):if(_0x363b41[_0x53136e(0x28c)]()){if(this[_0x53136e(0x284)]!==_0x363b41[_0x53136e(0x266)]())return this['processUpdateGraphic']();}else{if(this[_0x53136e(0x305)]!==_0x363b41[_0x53136e(0x228)]())return this['processUpdateGraphic']();}break;case _0x53136e(0x174):if(_0x363b41[_0x53136e(0x246)]()){if(this[_0x53136e(0x284)]!==_0x363b41['battlerName']())return this[_0x53136e(0x2ab)]();}else{if(this[_0x53136e(0x305)]!==_0x363b41['battlerName']())return this[_0x53136e(0x2ab)]();}break;}},Sprite_BTB_TurnOrder_Battler['prototype'][_0x50350f(0x2ab)]=function(){const _0x4a88f1=_0x50350f,_0x2921b6=this[_0x4a88f1(0x219)]();if(!_0x2921b6)return;this[_0x4a88f1(0x126)]=_0x2921b6[_0x4a88f1(0x258)]();if(_0x2921b6['isActor']()&&this[_0x4a88f1(0x126)]===_0x4a88f1(0x2df))this[_0x4a88f1(0x126)]=_0x4a88f1(0xec);else _0x2921b6[_0x4a88f1(0x2b5)]()&&this[_0x4a88f1(0x126)]===_0x4a88f1(0x174)&&(this['_graphicType']=_0x4a88f1(0x2df));let _0x1d4a73;switch(this[_0x4a88f1(0x126)]){case _0x4a88f1(0xec):this[_0x4a88f1(0x2e3)]=_0x2921b6[_0x4a88f1(0x181)](),this['_graphicFaceIndex']=_0x2921b6[_0x4a88f1(0x2c9)](),_0x1d4a73=ImageManager[_0x4a88f1(0x24f)](this[_0x4a88f1(0x2e3)]),_0x1d4a73[_0x4a88f1(0x2d8)](this[_0x4a88f1(0x11a)][_0x4a88f1(0x16a)](this,_0x1d4a73));break;case _0x4a88f1(0xd2):this[_0x4a88f1(0x18c)]=_0x2921b6[_0x4a88f1(0x2b2)](),_0x1d4a73=ImageManager['loadSystem']('IconSet'),_0x1d4a73['addLoadListener'](this[_0x4a88f1(0xc0)][_0x4a88f1(0x16a)](this,_0x1d4a73));break;case _0x4a88f1(0x2df):if(_0x2921b6['hasSvBattler']())this[_0x4a88f1(0x284)]=_0x2921b6['svBattlerName'](),_0x1d4a73=ImageManager[_0x4a88f1(0x16d)](this['_graphicSv']),_0x1d4a73[_0x4a88f1(0x2d8)](this[_0x4a88f1(0x2e2)][_0x4a88f1(0x16a)](this,_0x1d4a73));else $gameSystem['isSideView']()?(this[_0x4a88f1(0x305)]=_0x2921b6['battlerName'](),_0x1d4a73=ImageManager[_0x4a88f1(0xd7)](this['_graphicEnemy']),_0x1d4a73[_0x4a88f1(0x2d8)](this['changeEnemyGraphicBitmap'][_0x4a88f1(0x16a)](this,_0x1d4a73))):(this[_0x4a88f1(0x305)]=_0x2921b6[_0x4a88f1(0x228)](),_0x1d4a73=ImageManager['loadEnemy'](this[_0x4a88f1(0x305)]),_0x1d4a73[_0x4a88f1(0x2d8)](this[_0x4a88f1(0x294)][_0x4a88f1(0x16a)](this,_0x1d4a73)));break;case _0x4a88f1(0x174):this[_0x4a88f1(0x284)]=_0x2921b6[_0x4a88f1(0x228)](),_0x1d4a73=ImageManager['loadSvActor'](this['_graphicSv']),_0x1d4a73[_0x4a88f1(0x2d8)](this[_0x4a88f1(0x2e2)]['bind'](this,_0x1d4a73));break;}},Sprite_BTB_TurnOrder_Battler['prototype']['changeFaceGraphicBitmap']=function(_0x47f8a6){const _0x4d6d57=_0x50350f,_0x109dec=this[_0x4d6d57(0x144)],_0x40acf0=this[_0x4d6d57(0x29c)](),_0x537962=this[_0x4d6d57(0x2c0)](),_0x5785fd=Math[_0x4d6d57(0xcd)](_0x40acf0,_0x537962);this[_0x4d6d57(0xc2)][_0x4d6d57(0x1f5)]=new Bitmap(_0x40acf0,_0x537962);const _0x253e4d=this[_0x4d6d57(0xc2)]['bitmap'],_0x4c582b=ImageManager[_0x4d6d57(0x241)],_0x5fc68b=ImageManager[_0x4d6d57(0x2a1)],_0x16a1fc=_0x5785fd/Math[_0x4d6d57(0xcd)](_0x4c582b,_0x5fc68b),_0xd6b3f9=ImageManager['faceWidth'],_0x73fc32=ImageManager[_0x4d6d57(0x2a1)],_0x299b5a=_0x109dec%0x4*_0x4c582b+(_0x4c582b-_0xd6b3f9)/0x2,_0x3d9d98=Math[_0x4d6d57(0x2e6)](_0x109dec/0x4)*_0x5fc68b+(_0x5fc68b-_0x73fc32)/0x2,_0x479e87=(_0x40acf0-_0x4c582b*_0x16a1fc)/0x2,_0x2abd27=(_0x537962-_0x5fc68b*_0x16a1fc)/0x2;_0x253e4d[_0x4d6d57(0x132)](_0x47f8a6,_0x299b5a,_0x3d9d98,_0xd6b3f9,_0x73fc32,_0x479e87,_0x2abd27,_0x5785fd,_0x5785fd);},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0xc0)]=function(_0x68de23){const _0x54d41a=_0x50350f,_0x11b26b=this['_graphicIconIndex'],_0x2dbdd6=this['bitmapWidth'](),_0x26e357=this[_0x54d41a(0x2c0)]();this[_0x54d41a(0xc2)][_0x54d41a(0x1f5)]=new Bitmap(_0x2dbdd6,_0x26e357);const _0x1b6ca9=this['_graphicSprite']['bitmap'],_0x51b8d4=ImageManager[_0x54d41a(0x1d2)],_0x431e25=ImageManager[_0x54d41a(0x226)],_0x2673e1=Math[_0x54d41a(0x2ae)](_0x51b8d4,_0x431e25,_0x2dbdd6,_0x26e357),_0x409860=_0x11b26b%0x10*_0x51b8d4,_0x4b5d89=Math[_0x54d41a(0x2e6)](_0x11b26b/0x10)*_0x431e25,_0xd80011=Math[_0x54d41a(0x2e6)](Math[_0x54d41a(0xcd)](_0x2dbdd6-_0x2673e1,0x0)/0x2),_0x53be3f=Math[_0x54d41a(0x2e6)](Math[_0x54d41a(0xcd)](_0x26e357-_0x2673e1,0x0)/0x2);_0x1b6ca9[_0x54d41a(0x132)](_0x68de23,_0x409860,_0x4b5d89,_0x51b8d4,_0x431e25,_0xd80011,_0x53be3f,_0x2673e1,_0x2673e1);},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0x2e2)]=function(_0x332139){const _0x75d873=_0x50350f,_0x38edc8=this[_0x75d873(0x29c)](),_0x3d9de6=this[_0x75d873(0x2c0)](),_0x831063=Math[_0x75d873(0x2ae)](_0x38edc8,_0x3d9de6);this[_0x75d873(0xc2)][_0x75d873(0x1f5)]=new Bitmap(_0x38edc8,_0x3d9de6);const _0x1db32d=this['_graphicSprite']['bitmap'],_0x38f14e=this[_0x75d873(0x284)][_0x75d873(0x19c)](/\$/i),_0x615509=_0x38f14e?0x1:ImageManager['svActorHorzCells'],_0x4dda5f=_0x38f14e?0x1:ImageManager[_0x75d873(0x2ad)],_0x742771=_0x332139[_0x75d873(0x2ec)]/_0x615509,_0x16f88f=_0x332139[_0x75d873(0x21b)]/_0x4dda5f,_0x3cdebe=Math[_0x75d873(0x2ae)](0x1,_0x831063/_0x742771,_0x831063/_0x16f88f),_0x292f4e=_0x742771*_0x3cdebe,_0xad34fe=_0x16f88f*_0x3cdebe,_0x3da7bc=Math[_0x75d873(0x1b7)]((_0x38edc8-_0x292f4e)/0x2),_0x284742=Math[_0x75d873(0x1b7)]((_0x3d9de6-_0xad34fe)/0x2);_0x1db32d['blt'](_0x332139,0x0,0x0,_0x742771,_0x16f88f,_0x3da7bc,_0x284742,_0x292f4e,_0xad34fe);},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)]['changeEnemyGraphicBitmap']=function(_0x3ac665){const _0x5d6523=_0x50350f,_0x291d45=Window_BTB_TurnOrder[_0x5d6523(0x1f9)],_0xbf5dd7=this['bitmapWidth'](),_0x347678=this['bitmapHeight'](),_0x663a93=Math['min'](_0xbf5dd7,_0x347678);this['_graphicSprite'][_0x5d6523(0x1f5)]=new Bitmap(_0xbf5dd7,_0x347678);const _0x4f0a54=this['_graphicSprite'][_0x5d6523(0x1f5)],_0x424bca=Math[_0x5d6523(0x2ae)](0x1,_0x663a93/_0x3ac665[_0x5d6523(0x2ec)],_0x663a93/_0x3ac665[_0x5d6523(0x21b)]),_0x44dca0=_0x3ac665[_0x5d6523(0x2ec)]*_0x424bca,_0x5eb32e=_0x3ac665[_0x5d6523(0x21b)]*_0x424bca,_0x8c894a=Math[_0x5d6523(0x1b7)]((_0xbf5dd7-_0x44dca0)/0x2),_0x22dcad=Math[_0x5d6523(0x1b7)]((_0x347678-_0x5eb32e)/0x2);_0x4f0a54[_0x5d6523(0x132)](_0x3ac665,0x0,0x0,_0x3ac665[_0x5d6523(0x2ec)],_0x3ac665['height'],_0x8c894a,_0x22dcad,_0x44dca0,_0x5eb32e);},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0x251)]=function(){const _0x1b8bf8=_0x50350f,_0x27b55c=this[_0x1b8bf8(0x219)]();if(!_0x27b55c)return;if(!_0x27b55c['isEnemy']())return;if(this[_0x1b8bf8(0x15e)]===_0x27b55c[_0x1b8bf8(0x1f6)]())return;this['_graphicHue']=_0x27b55c[_0x1b8bf8(0x1f6)](),this[_0x1b8bf8(0xc2)]['setHue'](_0x27b55c['hasSvBattler']()?0x0:this[_0x1b8bf8(0x15e)]);},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)]['updateLetter']=function(){const _0x3b8c8b=_0x50350f;if(!this[_0x3b8c8b(0xfb)])return;const _0x3cfdc3=this['battler']();if(!_0x3cfdc3)return;if(this[_0x3b8c8b(0x1aa)]===_0x3cfdc3[_0x3b8c8b(0x1aa)]&&this['_plural']===_0x3cfdc3[_0x3b8c8b(0x208)])return;this[_0x3b8c8b(0x1aa)]=_0x3cfdc3[_0x3b8c8b(0x1aa)],this[_0x3b8c8b(0x208)]=_0x3cfdc3[_0x3b8c8b(0x208)];const _0x3c82bb=Window_BTB_TurnOrder[_0x3b8c8b(0x1f9)],_0x4bd868=this['isHorz'](),_0x3a24e8=this['bitmapWidth'](),_0x3da7c2=this[_0x3b8c8b(0x2c0)](),_0x3f9a9d=this[_0x3b8c8b(0xfb)]['bitmap'];_0x3f9a9d[_0x3b8c8b(0xd0)]();if(!this[_0x3b8c8b(0x208)])return;_0x3f9a9d[_0x3b8c8b(0x1ec)]=_0x3c82bb[_0x3b8c8b(0x22f)]||$gameSystem[_0x3b8c8b(0x198)](),_0x3f9a9d[_0x3b8c8b(0x27b)]=_0x3c82bb[_0x3b8c8b(0x202)]||0x10,_0x4bd868?_0x3f9a9d[_0x3b8c8b(0x16f)](this[_0x3b8c8b(0x1aa)][_0x3b8c8b(0xcc)](),0x0,_0x3da7c2/0x2,_0x3a24e8,_0x3da7c2/0x2,_0x3b8c8b(0x282)):_0x3f9a9d[_0x3b8c8b(0x16f)](this['_letter'][_0x3b8c8b(0xcc)](),0x0,0x2,_0x3a24e8-0x8,_0x3da7c2-0x4,_0x3b8c8b(0xe4));},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)]['updateSelectionEffect']=function(){const _0x28c15e=_0x50350f,_0x751ed5=this[_0x28c15e(0x219)]();if(!_0x751ed5)return;const _0x341052=_0x751ed5[_0x28c15e(0x219)]();if(!_0x341052)return;const _0x322c7b=_0x341052[_0x28c15e(0x30c)]();if(!_0x322c7b)return;this[_0x28c15e(0x17b)](_0x322c7b[_0x28c15e(0xbc)]);},Sprite_BTB_TurnOrder_Battler[_0x50350f(0x1cd)][_0x50350f(0x177)]=function(){return this['battler']();},VisuMZ['BattleSystemBTB'][_0x50350f(0x250)]=Window_Base[_0x50350f(0x1cd)][_0x50350f(0x17a)],Window_Base[_0x50350f(0x1cd)][_0x50350f(0x17a)]=function(_0x43fa5d,_0x5e4f0b,_0xd8be42){const _0x224bd0=_0x50350f;return _0xd8be42=VisuMZ['BattleSystemBTB'][_0x224bd0(0x250)][_0x224bd0(0x2f0)](this,_0x43fa5d,_0x5e4f0b,_0xd8be42),_0xd8be42=this[_0x224bd0(0x2d0)](_0x43fa5d,_0x5e4f0b,_0xd8be42),_0xd8be42;},VisuMZ[_0x50350f(0x314)]['Window_Base_drawItemNumber']=Window_Base[_0x50350f(0x1cd)]['drawItemNumber'],Window_Base[_0x50350f(0x1cd)][_0x50350f(0xc3)]=function(_0x98a3d7,_0x270a6b,_0x5ce4b3,_0x3be338){const _0x5796bd=_0x50350f;BattleManager[_0x5796bd(0xe2)]()&&this[_0x5796bd(0x22b)]===Window_BattleItem?this['drawItemNumberBTB'](_0x98a3d7,_0x270a6b,_0x5ce4b3,_0x3be338):VisuMZ[_0x5796bd(0x314)][_0x5796bd(0x2e7)]['call'](this,_0x98a3d7,_0x270a6b,_0x5ce4b3,_0x3be338),this['resetFontSettings']();},Window_Base['prototype'][_0x50350f(0x23b)]=function(_0x5da3f4,_0x5c5a0b,_0x446fd6,_0x50edfe){const _0x4b544d=_0x50350f,_0x220d99=VisuMZ['BattleSystemBTB'][_0x4b544d(0x1f9)][_0x4b544d(0x214)],_0x395f20=BattleManager[_0x4b544d(0x1bb)]||$gameParty['members']()[0x0],_0x3fdb0f=this[_0x4b544d(0x2d0)](_0x395f20,_0x5da3f4,''),_0x53c431=this[_0x4b544d(0x185)](_0x3fdb0f)[_0x4b544d(0x2ec)],_0x8697c4=_0x220d99[_0x4b544d(0x303)];let _0x3e700f=_0x5c5a0b+_0x50edfe-_0x53c431;if(_0x3fdb0f==='')VisuMZ[_0x4b544d(0x314)][_0x4b544d(0x2e7)][_0x4b544d(0x2f0)](this,_0x5da3f4,_0x5c5a0b,_0x446fd6,_0x50edfe);else{if(this[_0x4b544d(0x150)](_0x5da3f4)){this[_0x4b544d(0x100)]();const _0x308885=VisuMZ[_0x4b544d(0x213)][_0x4b544d(0x1f9)][_0x4b544d(0x194)];this['contents'][_0x4b544d(0x27b)]=_0x308885['ItemQuantityFontSize'];if(_0x8697c4){const _0x4a79b0=_0x308885[_0x4b544d(0x142)],_0x267d4e=_0x4a79b0[_0x4b544d(0x2e4)]($gameParty[_0x4b544d(0x145)](_0x5da3f4)),_0x46bbb4=this[_0x4b544d(0x1b2)](_0x267d4e+this[_0x4b544d(0x287)]());_0x3e700f-=_0x46bbb4;}else _0x50edfe-=this[_0x4b544d(0x1b2)](this[_0x4b544d(0x287)]())+_0x53c431;VisuMZ[_0x4b544d(0x314)][_0x4b544d(0x2e7)][_0x4b544d(0x2f0)](this,_0x5da3f4,_0x5c5a0b,_0x446fd6,_0x50edfe);}}this[_0x4b544d(0x244)](_0x3fdb0f,_0x3e700f,_0x446fd6);},Window_Base['prototype'][_0x50350f(0x2d0)]=function(_0x52b46d,_0x15039c,_0x460ffe){const _0x2a3530=_0x50350f;if(!BattleManager[_0x2a3530(0xe2)]())return _0x460ffe;if(!_0x52b46d)return _0x460ffe;if(!_0x15039c)return _0x460ffe;if(_0x15039c[_0x2a3530(0xcf)]['match'](VisuMZ[_0x2a3530(0x314)][_0x2a3530(0x10a)][_0x2a3530(0xdc)]))return _0x460ffe;let _0x4ad58c=_0x52b46d[_0x2a3530(0x2a9)](_0x15039c);const _0x5437a7=VisuMZ[_0x2a3530(0x314)]['Settings'][_0x2a3530(0x214)],_0x5b9352=_0x5437a7[_0x2a3530(0x303)],_0x54fc4c=_0x5437a7[_0x2a3530(0x15f)],_0x566f79=_0x5437a7[_0x2a3530(0x1f3)],_0x216b03=_0x5437a7[_0x2a3530(0x301)]||0x0,_0x5a4e60=_0x5437a7['Show_0_BP_Cost'],_0x181a05=_0x5437a7[_0x2a3530(0x120)];if(DataManager[_0x2a3530(0x21f)](_0x15039c)&&this[_0x2a3530(0x22b)]===Window_ActorCommand){if(!_0x54fc4c&&_0x15039c['id']===_0x52b46d['attackSkillId']())return _0x460ffe;if(!_0x566f79&&_0x15039c['id']===_0x52b46d['guardSkillId']())return _0x460ffe;}_0x4ad58c-=_0x216b03;if(_0x4ad58c<0x0)return _0x460ffe;if(!_0x5a4e60&&_0x4ad58c===0x0)return _0x460ffe;if(!_0x181a05&&_0x4ad58c===0x1)return _0x460ffe;const _0x5516b9=_0x2a3530(0x190)[_0x2a3530(0x2e4)](ImageManager[_0x2a3530(0x2b0)]),_0x5228c5=TextManager[_0x2a3530(0xf5)];let _0x1a1db6=TextManager[_0x2a3530(0x257)][_0x2a3530(0x2e4)](_0x4ad58c,_0x5228c5,_0x5516b9);if(_0x460ffe==='')_0x460ffe+=_0x1a1db6;else _0x5b9352?_0x460ffe=_0x1a1db6+this[_0x2a3530(0x287)]()+_0x460ffe:_0x460ffe=_0x460ffe+this['skillCostSeparator']()+_0x1a1db6;return _0x460ffe;},Window_Selectable['prototype'][_0x50350f(0x124)]=function(){return![];},VisuMZ['BattleSystemBTB'][_0x50350f(0x12d)]=Window_Selectable[_0x50350f(0x1cd)]['select'],Window_Selectable['prototype'][_0x50350f(0x155)]=function(_0x2f8031){const _0x2876e3=_0x50350f;VisuMZ['BattleSystemBTB']['Window_Selectable_select'][_0x2876e3(0x2f0)](this,_0x2f8031),this[_0x2876e3(0x124)]()&&this[_0x2876e3(0xbe)]&&this['applyBattleItemWindowBTB']();},Window_Selectable[_0x50350f(0x1cd)][_0x50350f(0x2b4)]=function(){BattleManager['sortActionOrdersBTB']();},VisuMZ[_0x50350f(0x314)]['Window_Help_setItem']=Window_Help[_0x50350f(0x1cd)][_0x50350f(0x1be)],Window_Help[_0x50350f(0x1cd)][_0x50350f(0x1be)]=function(_0x51c190){const _0x5e1951=_0x50350f;BattleManager['isBTB']()&&_0x51c190&&_0x51c190[_0x5e1951(0xcf)]&&_0x51c190[_0x5e1951(0xcf)][_0x5e1951(0x19c)](VisuMZ[_0x5e1951(0x314)][_0x5e1951(0x10a)][_0x5e1951(0x1c6)])?this[_0x5e1951(0x1c1)](String(RegExp['$1'])):VisuMZ['BattleSystemBTB'][_0x5e1951(0x223)][_0x5e1951(0x2f0)](this,_0x51c190);},VisuMZ[_0x50350f(0x314)][_0x50350f(0x19f)]=Window_BattleLog[_0x50350f(0x1cd)][_0x50350f(0x1c5)],Window_BattleLog['prototype'][_0x50350f(0x1c5)]=function(_0x2b4c2c,_0x560fc0,_0x2c7730){const _0x2e0d2c=_0x50350f;this[_0x2e0d2c(0x2f8)](_0x2b4c2c)?this[_0x2e0d2c(0x158)](_0x2b4c2c,_0x560fc0,_0x2c7730):VisuMZ[_0x2e0d2c(0x314)][_0x2e0d2c(0x19f)]['call'](this,_0x2b4c2c,_0x560fc0,_0x2c7730);},Window_BattleLog[_0x50350f(0x1cd)][_0x50350f(0x1c7)]=function(_0x23c558,_0x3c7480,_0x52905a){const _0x305783=_0x50350f;VisuMZ[_0x305783(0x314)][_0x305783(0x19f)][_0x305783(0x2f0)](this,_0x23c558,_0x3c7480,_0x52905a);},Window_BattleLog[_0x50350f(0x1cd)][_0x50350f(0x2f8)]=function(_0x4affd8){const _0x336976=_0x50350f;if(!BattleManager[_0x336976(0xe2)]())return![];if(!_0x4affd8)return![];if(!_0x4affd8[_0x336976(0x2b5)]())return![];if(_0x4affd8[_0x336976(0x2d1)])return![];const _0x3e0cfa=VisuMZ[_0x336976(0x314)]['Settings'][_0x336976(0x186)];if(!_0x3e0cfa[_0x336976(0x1a7)])return![];if(_0x3e0cfa[_0x336976(0x2d7)]<=0x0)return![];return VisuMZ[_0x336976(0x314)][_0x336976(0x1f9)]['BraveAnimation'][_0x336976(0x1a7)];},Window_BattleLog[_0x50350f(0x1cd)][_0x50350f(0x158)]=function(_0x8e099f,_0x14d4a4,_0x43f108){const _0x3a5974=_0x50350f;_0x8e099f['_braveStartupAnimation']=!![];let _0x224a59=_0x8e099f[_0x3a5974(0x262)]();const _0x2557eb=VisuMZ[_0x3a5974(0x314)][_0x3a5974(0x1f9)]['BraveAnimation'],_0x4c66a6=_0x2557eb[_0x3a5974(0x2d7)],_0x1cc4bc=_0x2557eb[_0x3a5974(0x192)];while(_0x224a59--){this[_0x3a5974(0x256)](_0x3a5974(0x2a5),[_0x8e099f],_0x4c66a6),_0x224a59>0x0?this[_0x3a5974(0x256)](_0x3a5974(0x30e),_0x1cc4bc):this[_0x3a5974(0x256)](_0x3a5974(0x157));}this[_0x3a5974(0x256)]('startActionBTB',_0x8e099f,_0x14d4a4,_0x43f108);},VisuMZ['BattleSystemBTB']['Window_ActorCommand_addGuardCommand']=Window_ActorCommand['prototype'][_0x50350f(0x191)],Window_ActorCommand[_0x50350f(0x1cd)][_0x50350f(0x191)]=function(){const _0x568989=_0x50350f;this[_0x568989(0x20f)](),VisuMZ['BattleSystemBTB'][_0x568989(0x25e)]['call'](this);},Window_ActorCommand[_0x50350f(0x1cd)][_0x50350f(0x20f)]=function(){const _0x1c78d9=_0x50350f;if(!this[_0x1c78d9(0x297)]())return;const _0x439d62=this[_0x1c78d9(0x1b6)](),_0xd9692b=TextManager[_0x1c78d9(0xfe)],_0x365d9f=ImageManager[_0x1c78d9(0x2b0)],_0x158909=_0x439d62==='text'?_0xd9692b:_0x1c78d9(0x105)['format'](_0x365d9f,_0xd9692b);this['addCommand'](_0x158909,_0x1c78d9(0x18b),this[_0x1c78d9(0x1bb)][_0x1c78d9(0x1dc)]()),BattleManager[_0x1c78d9(0x15d)]();},Window_ActorCommand[_0x50350f(0x1cd)][_0x50350f(0x297)]=function(){const _0x15cf28=_0x50350f;if(!BattleManager[_0x15cf28(0xe2)]())return![];if(!VisuMZ[_0x15cf28(0x314)][_0x15cf28(0x1f9)]['Window'][_0x15cf28(0x27f)])return![];if(this['_actor']&&this['_actor'][_0x15cf28(0x204)]())return![];return!![];},VisuMZ['BattleSystemBTB'][_0x50350f(0x16b)]=Window_ActorCommand[_0x50350f(0x1cd)][_0x50350f(0x224)],Window_ActorCommand[_0x50350f(0x1cd)]['setup']=function(_0x49f762){const _0x32d3de=_0x50350f;VisuMZ[_0x32d3de(0x314)][_0x32d3de(0x16b)]['call'](this,_0x49f762),this[_0x32d3de(0x2bd)]();},VisuMZ['BattleSystemBTB']['Window_Selectable_cursorPagedown']=Window_Selectable[_0x50350f(0x1cd)][_0x50350f(0xd9)],Window_Selectable[_0x50350f(0x1cd)][_0x50350f(0xd9)]=function(){const _0x25105a=_0x50350f;this[_0x25105a(0x22d)]()?this['_actor']&&!this['_actor']['hideBraveTrait']()&&this['_actor'][_0x25105a(0x1dc)]()&&SceneManager[_0x25105a(0x253)][_0x25105a(0x269)]():VisuMZ[_0x25105a(0x314)][_0x25105a(0x1b5)][_0x25105a(0x2f0)](this);},VisuMZ['BattleSystemBTB'][_0x50350f(0x23c)]=Window_Selectable[_0x50350f(0x1cd)]['cursorPageup'],Window_Selectable[_0x50350f(0x1cd)][_0x50350f(0x25f)]=function(){const _0x3fcdd0=_0x50350f;this[_0x3fcdd0(0x22d)]()?this[_0x3fcdd0(0x1bb)]&&!this[_0x3fcdd0(0x1bb)][_0x3fcdd0(0x204)]()&&this[_0x3fcdd0(0x1bb)][_0x3fcdd0(0x218)]()>0x1&&SceneManager[_0x3fcdd0(0x253)][_0x3fcdd0(0x2de)]():VisuMZ[_0x3fcdd0(0x314)][_0x3fcdd0(0x23c)][_0x3fcdd0(0x2f0)](this);},Window_Selectable[_0x50350f(0x1cd)]['isUsePageUpDnShortcutBTB']=function(){const _0x175cc5=_0x50350f;if(this[_0x175cc5(0x22b)]!==Window_ActorCommand)return![];if(!SceneManager[_0x175cc5(0x117)]())return![];if(!BattleManager[_0x175cc5(0xe2)]())return![];return VisuMZ[_0x175cc5(0x314)][_0x175cc5(0x1f9)]['Window'][_0x175cc5(0x161)];},VisuMZ['BattleSystemBTB'][_0x50350f(0xe3)]=Window_ActorCommand[_0x50350f(0x1cd)][_0x50350f(0x310)],Window_ActorCommand[_0x50350f(0x1cd)][_0x50350f(0x310)]=function(){const _0x48bb53=_0x50350f;VisuMZ['BattleSystemBTB']['Window_ActorCommand_makeCommandList'][_0x48bb53(0x2f0)](this),this[_0x48bb53(0x2bd)]();},VisuMZ[_0x50350f(0x314)][_0x50350f(0x1fb)]=Window_Base[_0x50350f(0x1cd)][_0x50350f(0xe8)],Window_Base[_0x50350f(0x1cd)][_0x50350f(0xe8)]=function(){const _0x581ae2=_0x50350f;VisuMZ[_0x581ae2(0x314)][_0x581ae2(0x1fb)][_0x581ae2(0x2f0)](this),SceneManager[_0x581ae2(0x117)]()&&this[_0x581ae2(0x19e)]&&this[_0x581ae2(0x19e)]();},Window_ActorCommand[_0x50350f(0x1cd)][_0x50350f(0x19e)]=function(){const _0x77f4ea=_0x50350f;if(!this[_0x77f4ea(0x2ff)])return;this[_0x77f4ea(0x2ff)]['bitmap']&&this[_0x77f4ea(0x2ff)][_0x77f4ea(0x1f5)][_0x77f4ea(0x295)](),this['removeChild'](this[_0x77f4ea(0x2ff)]),delete this[_0x77f4ea(0x2ff)];},Window_ActorCommand['prototype'][_0x50350f(0x2bd)]=function(){const _0x5b4cb2=_0x50350f;if(!BattleManager[_0x5b4cb2(0xe2)]())return;if(!this[_0x5b4cb2(0x1bb)])return;this[_0x5b4cb2(0x19e)]();if(this[_0x5b4cb2(0x1bb)][_0x5b4cb2(0x204)]())return;this['_btbActionSprite']=new Sprite(),this[_0x5b4cb2(0x1db)](this[_0x5b4cb2(0x2ff)]),this[_0x5b4cb2(0x24a)]();},Window_ActorCommand[_0x50350f(0x1cd)]['modifyBTBActionCounterSprite']=function(){const _0x56d37f=_0x50350f,_0x262c7d=VisuMZ[_0x56d37f(0x314)]['Settings']['Window'][_0x56d37f(0x280)];_0x262c7d?_0x262c7d[_0x56d37f(0x2f0)](this,this[_0x56d37f(0x2ff)],this,this[_0x56d37f(0x1bb)]):this[_0x56d37f(0x151)][_0x56d37f(0x2f0)](this,this['_btbActionSprite'],this,this[_0x56d37f(0x1bb)]);},Window_ActorCommand[_0x50350f(0x1cd)][_0x50350f(0x151)]=function(){const _0x33ce3a=_0x50350f,_0x2cfc7a=arguments[0x0],_0x2feb79=arguments[0x1],_0x5b58d5=arguments[0x2];_0x2cfc7a['x']=Math[_0x33ce3a(0x1b7)](_0x2feb79[_0x33ce3a(0x2ec)]/0x2),_0x2cfc7a['y']=0x0,_0x2cfc7a[_0x33ce3a(0x17c)]['x']=0.5,_0x2cfc7a[_0x33ce3a(0x17c)]['y']=0.5;const _0xeb62cb=TextManager[_0x33ce3a(0x107)],_0x17bfe2=TextManager[_0x33ce3a(0x206)];let _0x4a0cf9=_0xeb62cb[_0x33ce3a(0x135)](_0x5b58d5[_0x33ce3a(0x218)]());const _0x1d1462=_0x5b58d5['_actionInputIndex'];_0x4a0cf9=_0x4a0cf9[_0x33ce3a(0x1a6)](0x0,_0x1d1462)+_0x17bfe2+_0x4a0cf9[_0x33ce3a(0x1a6)](_0x1d1462+0x1);const _0x1b28de=new Bitmap(_0x2feb79['width'],_0x2feb79['lineHeight']());_0x1b28de[_0x33ce3a(0x27b)]=0x24,_0x1b28de[_0x33ce3a(0x16f)](_0x4a0cf9,0x0,0x0,_0x1b28de[_0x33ce3a(0x2ec)],_0x1b28de[_0x33ce3a(0x21b)],_0x33ce3a(0x282)),_0x2cfc7a[_0x33ce3a(0x1f5)]=_0x1b28de;},Window_ActorCommand[_0x50350f(0x1cd)][_0x50350f(0x124)]=function(){const _0x5dee76=_0x50350f;return BattleManager[_0x5dee76(0xe2)]();},Window_ActorCommand[_0x50350f(0x1cd)][_0x50350f(0x2b4)]=function(){const _0x29e0e6=_0x50350f,_0xe69d93=BattleManager[_0x29e0e6(0x159)]();if(_0xe69d93){const _0x31ca47=this[_0x29e0e6(0x116)]();switch(_0x31ca47){case _0x29e0e6(0x21c):_0xe69d93[_0x29e0e6(0x2e5)]();break;case _0x29e0e6(0x242):_0xe69d93[_0x29e0e6(0x1c2)]();break;case _0x29e0e6(0x2ee):_0xe69d93[_0x29e0e6(0x1e4)](this['currentExt']());break;default:_0xe69d93['setSkill'](null);break;}}Window_Command['prototype'][_0x29e0e6(0x2b4)][_0x29e0e6(0x2f0)](this);},Window_Base[_0x50350f(0x1cd)]['drawActorBravePoints']=function(_0x18656c,_0x3330e1,_0x557775,_0x1fc5d6,_0x31f86c){const _0x5e0bbc=_0x50350f;if(!_0x18656c)return;if(!BattleManager[_0x5e0bbc(0xe2)]())return;const _0x1e0fa2=VisuMZ['BattleSystemBTB']['Settings'][_0x5e0bbc(0x164)],_0xf5d20a=BattleManager[_0x5e0bbc(0x1ad)]()?_0x1e0fa2['StatusPredictFmt']:_0x1e0fa2[_0x5e0bbc(0x273)],_0x391cfb=_0x1e0fa2[_0x5e0bbc(0x26b)],_0x1df767=_0x1e0fa2[_0x5e0bbc(0x18d)],_0x49576a=_0x1e0fa2[_0x5e0bbc(0x29b)];let _0x3f0f2f=0x0,_0x5852a4=0x0;_0x5852a4=_0x18656c[_0x5e0bbc(0x28d)]();if(_0x5852a4>0x0)_0x3f0f2f=_0x1df767;if(_0x5852a4===0x0)_0x3f0f2f=_0x391cfb;if(_0x5852a4<0x0)_0x3f0f2f=_0x49576a;const _0x255b04='\x5cC[%1]%2\x5cC[0]'['format'](_0x3f0f2f,_0x5852a4),_0x38a3d7=_0x5e0bbc(0x190)[_0x5e0bbc(0x2e4)](ImageManager[_0x5e0bbc(0x2b0)]);_0x5852a4=_0x18656c[_0x5e0bbc(0x1ba)]();if(_0x5852a4>0x0)_0x3f0f2f=_0x1df767;if(_0x5852a4===0x0)_0x3f0f2f=_0x391cfb;_0x5852a4<0x0&&(_0x3f0f2f=_0x49576a);const _0x61ae02=_0x5e0bbc(0x270)[_0x5e0bbc(0x2e4)](_0x3f0f2f,_0x5852a4);let _0x51c9c2=_0xf5d20a[_0x5e0bbc(0x2e4)](_0x255b04,TextManager[_0x5e0bbc(0xf5)],_0x38a3d7,_0x61ae02);const _0x25455c=this[_0x5e0bbc(0x185)](_0x51c9c2)[_0x5e0bbc(0x2ec)];if(_0x31f86c==='center')_0x3330e1+=Math[_0x5e0bbc(0x1b7)]((_0x1fc5d6-_0x25455c)/0x2);else _0x31f86c===_0x5e0bbc(0xe4)&&(_0x3330e1+=Math[_0x5e0bbc(0x1b7)](_0x1fc5d6-_0x25455c));this[_0x5e0bbc(0x244)](_0x51c9c2,_0x3330e1,_0x557775,_0x1fc5d6);},Window_StatusBase[_0x50350f(0x1cd)][_0x50350f(0x153)]=function(_0x529ca5){const _0x17d4b9=_0x50350f;if(!_0x529ca5)return![];if(!BattleManager[_0x17d4b9(0xe2)]())return![];if(!this[_0x17d4b9(0x108)])return![];if(_0x529ca5[_0x17d4b9(0x204)]())return![];const _0x52c21d=VisuMZ[_0x17d4b9(0x314)][_0x17d4b9(0x1f9)][_0x17d4b9(0x164)],_0x4dec7f=this[_0x17d4b9(0x108)]();return _0x52c21d[_0x17d4b9(0x1e8)[_0x17d4b9(0x2e4)](_0x4dec7f)];},VisuMZ[_0x50350f(0x314)][_0x50350f(0x21d)]=Window_BattleStatus['prototype']['drawItemStatusListStyle'],Window_BattleStatus[_0x50350f(0x1cd)][_0x50350f(0x1a3)]=function(_0x1073b3){const _0x1d9730=_0x50350f;VisuMZ['BattleSystemBTB'][_0x1d9730(0x21d)][_0x1d9730(0x2f0)](this,_0x1073b3);const _0xb2fd7f=this['actor'](_0x1073b3);if(this[_0x1d9730(0x153)](_0xb2fd7f)){const _0x191376=this['itemLineRect'](_0x1073b3),_0x3fd3dc=$dataSystem[_0x1d9730(0xe0)]?0x4:0x3,_0x23783c=_0x3fd3dc*0x80+(_0x3fd3dc-0x1)*0x8+0x4;let _0x38e218=_0x191376['x']+this[_0x1d9730(0x1ea)];VisuMZ[_0x1d9730(0x2dd)]['Settings'][_0x1d9730(0x13b)][_0x1d9730(0x17f)]?_0x38e218=_0x191376['x']+ImageManager[_0x1d9730(0x241)]+0x8:_0x38e218+=ImageManager['iconWidth'];const _0x401acf=Math[_0x1d9730(0x1b7)](Math[_0x1d9730(0x2ae)](_0x191376['x']+_0x191376[_0x1d9730(0x2ec)]-_0x23783c,_0x38e218));let _0xa346b=_0x401acf+0x88,_0x145f90=_0x191376['y'];_0xa346b+=0x88*($dataSystem[_0x1d9730(0xe0)]?0x3:0x2),_0xa346b+=this[_0x1d9730(0x28e)](),_0x145f90+=this['getOffsetY_BTB']();const _0x1e40c0=this[_0x1d9730(0x1e9)]();if(_0xa346b>_0x191376['x']+_0x191376[_0x1d9730(0x2ec)])return;this[_0x1d9730(0x2c8)](_0xb2fd7f,_0xa346b,_0x145f90,_0x191376[_0x1d9730(0x2ec)],_0x1e40c0);}},VisuMZ[_0x50350f(0x314)][_0x50350f(0x17e)]=Window_BattleStatus[_0x50350f(0x1cd)]['drawItemStatusXPStyle'],Window_BattleStatus[_0x50350f(0x1cd)][_0x50350f(0x23e)]=function(_0x2c0a7f){const _0x5814c6=_0x50350f;VisuMZ[_0x5814c6(0x314)][_0x5814c6(0x17e)][_0x5814c6(0x2f0)](this,_0x2c0a7f);const _0xad3725=this[_0x5814c6(0x1fc)](_0x2c0a7f);if(this['showBravePoints'](_0xad3725)){const _0x50120b=this[_0x5814c6(0x11d)](_0x2c0a7f);let _0x30fa6f=_0x50120b['x'],_0x4667c8=_0x50120b['y'];_0x30fa6f+=this[_0x5814c6(0x28e)](),_0x4667c8+=this[_0x5814c6(0x209)]();const _0x71433e=this[_0x5814c6(0x1e9)]();this[_0x5814c6(0x2c8)](_0xad3725,_0x30fa6f,_0x4667c8,_0x50120b['width'],_0x71433e);}},Window_BattleStatus[_0x50350f(0x1cd)][_0x50350f(0x11d)]=function(_0x3bd1ff){const _0x24fcac=_0x50350f,_0x6877fe=this[_0x24fcac(0x110)](_0x3bd1ff);if(_0x6877fe[_0x24fcac(0x2ec)]<ImageManager[_0x24fcac(0x241)])return _0x6877fe;let _0x11d502=Math[_0x24fcac(0x1b7)]((_0x6877fe[_0x24fcac(0x2ec)]-ImageManager[_0x24fcac(0x241)])/0x2);return _0x6877fe[_0x24fcac(0x2ec)]=ImageManager[_0x24fcac(0x241)],_0x6877fe['x']+=_0x11d502,_0x6877fe;},Window_BattleStatus[_0x50350f(0x1cd)][_0x50350f(0x1e9)]=function(){const _0x2a1c91=_0x50350f,_0x40310d=VisuMZ[_0x2a1c91(0x314)][_0x2a1c91(0x1f9)][_0x2a1c91(0x164)],_0x5b92bc=this[_0x2a1c91(0x108)]();return _0x40310d['%1_align'[_0x2a1c91(0x2e4)](_0x5b92bc)]||0x0;},Window_BattleStatus[_0x50350f(0x1cd)][_0x50350f(0x28e)]=function(){const _0x5eb8ba=_0x50350f,_0x3c24ec=VisuMZ['BattleSystemBTB'][_0x5eb8ba(0x1f9)][_0x5eb8ba(0x164)],_0x36b972=this[_0x5eb8ba(0x108)]();return _0x3c24ec[_0x5eb8ba(0x133)[_0x5eb8ba(0x2e4)](_0x36b972)]||0x0;},Window_BattleStatus[_0x50350f(0x1cd)][_0x50350f(0x209)]=function(){const _0x21ad0c=_0x50350f,_0x4f3c5c=VisuMZ[_0x21ad0c(0x314)][_0x21ad0c(0x1f9)][_0x21ad0c(0x164)],_0x28ec00=this[_0x21ad0c(0x108)]();return _0x4f3c5c['%1_offsetY'[_0x21ad0c(0x2e4)](_0x28ec00)]||0x0;},Window_BattleSkill[_0x50350f(0x1cd)][_0x50350f(0x124)]=function(){const _0x4626f4=_0x50350f;return BattleManager[_0x4626f4(0xe2)]();},Window_BattleSkill[_0x50350f(0x1cd)][_0x50350f(0x2b4)]=function(){const _0x5c6917=_0x50350f,_0x2c9128=this[_0x5c6917(0x1f1)](),_0x5358d1=BattleManager[_0x5c6917(0x159)]();if(_0x5358d1)_0x5358d1[_0x5c6917(0x1e4)](_0x2c9128?_0x2c9128['id']:null);Window_SkillList[_0x5c6917(0x1cd)][_0x5c6917(0x2b4)][_0x5c6917(0x2f0)](this);},Window_BattleItem[_0x50350f(0x1cd)][_0x50350f(0x124)]=function(){const _0x5bb4ac=_0x50350f;return BattleManager[_0x5bb4ac(0xe2)]();},Window_BattleItem[_0x50350f(0x1cd)]['applyBattleItemWindowBTB']=function(){const _0x4bfec5=_0x50350f,_0x760519=this['item'](),_0x55bd72=BattleManager[_0x4bfec5(0x159)]();if(_0x55bd72)_0x55bd72[_0x4bfec5(0x1be)](_0x760519?_0x760519['id']:null);Window_ItemList[_0x4bfec5(0x1cd)]['applyBattleItemWindowBTB'][_0x4bfec5(0x2f0)](this);};function Window_BTB_TurnOrder(){const _0x385f93=_0x50350f;this[_0x385f93(0xbb)](...arguments);}function _0x4447(){const _0x37fa23=['addInnerChild','Actors','ParseItemNotetags','ItemsEquipsCore','General','_positionTargetY','canUse','_targetIndex','numActions','battler','ActorBattlerType','height','attack','Window_BattleStatus_drawItemStatusListStyle','maxBraveActions','isSkill','_weapons','110gwvmkv','status','Window_Help_setItem','setup','isForFriend','iconHeight','svActorHorzCells','battlerName','_btbTurnOrderVisible','sortActionOrdersBTB','constructor','EnemyBattlerIcon','isUsePageUpDnShortcutBTB','BravePointStartFavor','EnemyBattlerFontFace','_containerHeight','BorderThickness','createChildren','_btbTurnOrderFaceIndex','canProcessActionFusionsBTB','_isAppeared','canGuard','includes','MinBravePointsDefault','createBTBTurnOrderWindow','%1BorderColor','drawItemNumberBTB','Window_Selectable_cursorPageup','RepositionTopHelpY','drawItemStatusXPStyle','_bravePoints','minBravePoints','faceWidth','guard','State-%1-%2','drawTextEx','Game_Battler_onBattleStart','isActor','MinBravePointsHardCap','BTB_MIN_BRAVEPOINTS_HARD_CAP','BTB_MAX_ACTIONS_HARD_CAP','modifyBTBActionCounterSprite','MinBravePoints','currentAction','bottom','exit','loadFace','Window_Base_makeAdditionalSkillCostText','updateGraphicHue','EnemyActionFusions','_scene','checkTargetPositions','sort','push','btbCostFormat','TurnOrderBTBGraphicType','_fullWidth','predictedBravePointCost','BravePointCost','_position','getItemIdWithName','Window_ActorCommand_addGuardCommand','cursorPageup','_turnOrderContainer','6JADIQB','braveAnimationTimes','Enemies','431374GMNMEU','BtbTurnOrderActorIcon','svBattlerName','canActionFusionWithBTB','process_VisuMZ_BattleSystemBTB_Notetags','performBrave','Game_BattlerBase_appear','NeutralColor','getColor','Game_Battler_onTurnEnd','selectNextCommand','createActorCommandWindowBTB','\x5cC[%1]%2\x5cC[0]','onBattleStart','MaxBravePoints','StatusDisplayFmt','Scene_Battle_createActorCommandWindow','getChildIndex','Visible','HideBrave','ActionSlot','SpriteThin','BattleManager_startInput','fontSize','BtbTurnOrderEnemyFace','Brave','EnemyBattlerFaceIndex','ShowCommand','DrawActionCountersJS','filter','center','updateGraphic','_graphicSv','updateSidePosition','EnemyBattlerDrawLetter','skillCostSeparator','updateBattleContainerOrder','BravePointRegen','Game_Battler_useItem','_itemIDs','hasSvBattler','bravePoints','getOffsetX_BTB','_turnOrderInnerSprite','commandCancel','_positionTargetX','payBravePointsCost','Game_Battler_performCollapse','changeEnemyGraphicBitmap','destroy','checkActionsBTB','canAddBraveCommand','calculateTargetPositions','Game_BattlerBase_hide','create','NegativeColor','bitmapWidth','Game_Action_setItem','Game_BattlerBase_canInput','startFade','DisplayPosition','faceHeight','name','onTurnEndBTB','_statusWindow','showNormalAnimation','_unit','1054125LkeDlb','test','bravePointsCost','useItem','processUpdateGraphic','allowRandomSpeed','svActorVertCells','min','ARRAYSTRUCT','btbBravePointsIcon','maxBravePoints','createTurnOrderBTBGraphicIconIndex','pop','applyBattleItemWindowBTB','isEnemy','update','hide','_index','createTurnOrderBTBGraphicFaceName','_windowLayer','MaxBravePointsDefault','Skill-%1-%2','createBTBActionCounters','BravePointsIcon','createKeyJS','bitmapHeight','index','inBattle','BTB_MAX_ACTIONS_DEFAULT','createInitialPositions','_btbTurnOrderFaceName','RepositionTopHelpX','createBorderSprite','drawActorBravePoints','TurnOrderBTBGraphicFaceIndex','ARRAYJSON','_btbItemStrictFusion','cancel','Game_Actor_makeActions','applyItemUserEffect','isAlive','makeAdditionalCostTextBTB','_braveStartupAnimation','SubjectDistance','Game_Unit_makeActions','STRUCT','getActionFusionCombinationsBTB','process_VisuMZ_BattleSystemBTB_JS','BraveAnimationID','addLoadListener','_actionBattlers','VisuMZ_1_SkillsStatesCore','_isAlive','makeSpeed','BattleCore','reduceBrave','enemy','remove','subject','changeSvActorGraphicBitmap','_graphicFaceName','format','setAttack','floor','Window_Base_drawItemNumber','btbBravePointsFull','BattleManager_startTurn','_scrollY','SpriteLength','width','performCollapse','singleSkill','opacity','call','makeDeepCopy','ParseSkillNotetags','MaxVertSprites','startInput','splice','Game_Action_applyItemUserEffect','CannotBrave','showBraveAnimationBTB','calcRegenBravePoints','BattleManager_battleSys','EnemyBattlerFaceName','SystemTurnOrderVisibility','FaceIndex','BTB_MIN_BRAVEPOINTS_DEFAULT','_btbActionSprite','_actionFusionRecipe','ReduceShownBPCost','BravePointAlterTarget','CostPosition','onBattleStartBTB','_graphicEnemy','setBTBGraphicIconIndex','getActionFusionRecipeSkills','BTB','updateSelectionEffect','getTotalActionFusionRecipes','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','mainSprite','onDatabaseLoaded','waitCount','onDisabledPartyCommandSelection','makeCommandList','cannotFusionNotetagBTB','CalcActionSpeedJS','maxBattleMembers','BattleSystemBTB','Actor','initialize','_blendColor','applyBattleSystemBTBUserEffect','active','Game_System_initialize','changeIconGraphicBitmap','%1Mute','_graphicSprite','drawItemNumber','Cancel','Weapon-%1-%2','createTurnOrderBTBGraphicType','createLetterSprite','appear','setActionFusionBTB','BravePointRegenBase','ShowMarkerBg','trim','max','Class-%1-%2','note','clear','btbPaySkillFusionCosts','icon','VisuMZ_1_ItemsEquipsCore','Game_Action_allowRandomSpeed','IconIndex','Enemy','loadSvEnemy','repositionLogWindowBTB','cursorPagedown','_subject','_targetHomeX','HideBravePointCost','_btbSkillStrictFusion','EnemyMultiAction','members','optDisplayTp','join','isBTB','Window_ActorCommand_makeCommandList','right','children','_actions','requestRefresh','close','setHandler','5376245leAIff','Game_Action_setSkill','face','createTestBitmap','createBackgroundSprite','_actorCommandWindow','updateTurnOrder','commandCancelBTB','description','requestFauxAnimation','%1Mirror','btbBravePointsAbbr','checkPosition','_skillIDs','isHorz','createTurnOrderBTBGraphicFaceIndex','useItemBTB','_letterSprite','BattleManager_makeActionOrders','1480116PMYWvl','btbBraveCommand','isSkipPartyCommandWindow','resetFontSettings','EnableFusion','length','btbPayItemFusionCosts','MaxHorzSprites','\x5cI[%1]%2','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','btbActionSlot','battleLayoutStyle','visible','RegExp','canPayActionFusionCombination','btbRegisterFusions','updateHomePosition','removeActionFusionIngredients','ActionCurrent','itemRect','_fadeDuration','isActiveTpb','FusionStrict','BravePointBattleStart','loseBravePoints','currentSymbol','isSceneBattle','BTB_MAX_BRAVEPOINTS_HARD_CAP','NUM','changeFaceGraphicBitmap','indexOf','createBattlerSprites','itemRectPortraitBTB','toUpperCase','_btbItemFlexFusion','Show_1_BP_Cost','Game_Enemy_makeActions','JsBravePointsUser','_helpWindow','isBattleItemWindowBTB','OrderDirection','_graphicType','refresh','recalculateHome','BattleManager_isTurnBased','makeActionTimes','1990233QAzDcD','btbMatchesCurrentFusionAction','Window_Selectable_select','clearRect','_items','registerCommand','_ogWindowLayerX','blt','%1_offsetX','_fadeTarget','repeat','getActionFusionRecipeItems','1013905stCLEk','_homeDuration','cancelBrave','fillRect','BattleLayout','getSkillIdWithName','traitObjects','_homeX','MaxActionsDefault','makeMultiActionsBTB','initHomePositions','ItemQuantityFmt','_homeY','_graphicFaceIndex','numItems','_bypassAiValidCheck','parse','ActorBattlerIcon','12oPthDF','UpdateFrames','updateOpacity','formFlexCombo','_ogWindowLayerY','makeActions','isItem','isDrawItemNumber','modifyBTBActionCounterSprite_Fallback','isBattleSystemBTBTurnOrderVisible','showBravePoints','removeActionBattlersBTB','select','updateLetter','waitForAnimation','queueBraveAnimationsBTB','inputtingAction','needsSelection','regenerateBravePoints','VisuMZ_0_CoreEngine','refreshStatusBTB','_graphicHue','ShowCostForAttack','BTB_MAX_BRAVEPOINTS_DEFAULT','BraveShortcuts','compareBattlerSprites','ceil','Window','slice','5AXRxjv','EVAL','canInput','ActorActionFusions','bind','Window_ActorCommand_setup','Game_Battler_makeActionTimes','loadSvActor','BtbTurnOrderClearActorGraphic','drawText','DisplayOffsetY','CenterHorz','containerWindow','commandBrave','svactor','_containerWidth','CancelAnimationID','getStateTooltipBattler','_scrollX','TurnOrder','makeAdditionalSkillCostText','setBlendColor','anchor','BravePointSkillCost','Window_BattleStatus_drawItemStatusXPStyle','ShowFacesListStyle','windowRect','TurnOrderBTBGraphicFaceName','map','setBattleSystemBTBTurnOrderVisible','BravePointsRegenAlive','textSizeEx','BraveAnimation','RepositionLogWindow','boxHeight','FusionFlex','createBattlerRect','brave','_graphicIconIndex','PositiveColor','Game_Party_removeActor','Item-%1-%2','\x5cI[%1]','addGuardCommand','WaitFrames','split','ItemScene','updateVisibility','process_VisuMZ_BattleSystemBTB','top','mainFontFace','ScreenBuffer','BravePointAlterUser','BtbTurnOrderEnemyIcon','match','createAllWindows','destroyBTBActionCounters','Window_BattleLog_startAction','_positionDuration','%1BgColor2','updatePosition','drawItemStatusListStyle','isTurnBased','setBravePoints','substring','ShowEnemyBrave','BravePointCostFmt','Game_BattlerBase_canUse','_letter','ShowMarkerBorder','_armors','isInputting','onTurnEnd','BravePointItemCost','ARRAYEVAL','removeActor','textWidth','3172712PuWJNL','clearTurnOrderBTBGraphics','Window_Selectable_cursorPagedown','commandStyle','round','speed','Game_BattlerBase_canGuard','predictedBravePoints','_actor','processActionFusionsBTB','ConvertParams','setItem','_backgroundSprite','loadSystem','setText','setGuard','gainBravePoints','Scene_Boot_onDatabaseLoaded','startAction','BTB_Help','startActionBTB','Scene_Battle_onDisabledPartyCommandSelection','parameters','isAppeared','JsBravePointsTarget','BattleManager_startAction','prototype','startTurn','TurnOrderBTBGraphicIconIndex','BravePointSetTarget','isTpb','iconWidth','checkOpacity','%1SystemBg','BravePointsAbbr','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','defaultPosition','_btbTurnOrderIconIndex','Mechanics','version','addChild','canBrave','_fullHeight','battleSys','MaxActionsHardCap','_btbTurnOrderGraphicType','clamp','_isBattleOver','_guardUnleash','setSkill','_targetHomeY','%1SystemBorder','JSON','%1_display','getAlignmentBTB','padding','Enemy-%1-%2','fontFace','applyItemBattleSystemBTBUserEffect','_btbTurnOrderWindow','_actionInputIndex','containerPosition','item','Parse_Notetags_BravePointsUserJS','ShowCostForGuard','FUNC','bitmap','battlerHue','updateTurnOrderBTB','Game_Action_speed','Settings','initBattleSystemBTB','Window_Base_close','actor','concat','CannotFusion','makeActionOrders','_tempBattler','%1AnimationID','EnemyBattlerFontSize','BtbTurnOrderActorFace','hideBraveTrait','BattleManager_isTpb','btbActionCurrent','_btbSkillFlexFusion','_plural','getOffsetY_BTB','ParseAllNotetags','cannotBraveTrait','btbParseFusionData','clearActions','left','addBraveCommand'];_0x4447=function(){return _0x37fa23;};return _0x4447();}Window_BTB_TurnOrder[_0x50350f(0x1cd)]=Object[_0x50350f(0x29a)](Window_Base[_0x50350f(0x1cd)]),Window_BTB_TurnOrder['prototype'][_0x50350f(0x22b)]=Window_BTB_TurnOrder,Window_BTB_TurnOrder[_0x50350f(0x1f9)]=VisuMZ[_0x50350f(0x314)][_0x50350f(0x1f9)][_0x50350f(0x179)],Window_BTB_TurnOrder[_0x50350f(0x1cd)]['initialize']=function(){const _0x4408b6=_0x50350f,_0x3bae9f=this[_0x4408b6(0x180)]();this[_0x4408b6(0x141)](_0x3bae9f),Window_Base[_0x4408b6(0x1cd)]['initialize'][_0x4408b6(0x2f0)](this,_0x3bae9f),this[_0x4408b6(0x11c)](),this[_0x4408b6(0x195)](),this[_0x4408b6(0x2ef)]=0x0;},Window_BTB_TurnOrder[_0x50350f(0x1cd)][_0x50350f(0x180)]=function(){const _0x1ed8ae=_0x50350f;return this[_0x1ed8ae(0x18a)]($gameParty['maxBattleMembers'](),0x9,!![]);},Window_BTB_TurnOrder['prototype'][_0x50350f(0x141)]=function(_0x3cf1db){const _0x354cc1=_0x50350f;this['_targetHomeX']=this[_0x354cc1(0x13e)]=_0x3cf1db['x'],this['_targetHomeY']=this['_homeY']=_0x3cf1db['y'],this[_0x354cc1(0x259)]=_0x3cf1db[_0x354cc1(0x2ec)],this[_0x354cc1(0x1dd)]=_0x3cf1db[_0x354cc1(0x21b)],this[_0x354cc1(0x138)]=0x0;},Window_BTB_TurnOrder[_0x50350f(0x1cd)][_0x50350f(0x18a)]=function(_0x3e168f,_0x2087d4,_0x30033a){const _0x5664b5=_0x50350f,_0x773d19=Window_BTB_TurnOrder['Settings'],_0x4d713a=this['isHorz']()?_0x773d19[_0x5664b5(0x104)]:_0x773d19[_0x5664b5(0x2f3)],_0x159bc1=Math[_0x5664b5(0x2ae)](_0x4d713a,_0x3e168f+_0x2087d4),_0x83f739=SceneManager[_0x5664b5(0x253)][_0x5664b5(0x2a4)][_0x5664b5(0x21b)],_0x487b39=SceneManager['_scene'][_0x5664b5(0x123)][_0x5664b5(0x21b)],_0x32befd=_0x773d19['SubjectDistance'],_0x27d77c=Graphics[_0x5664b5(0x21b)]-_0x83f739-_0x487b39;let _0x2f20ae=0x0,_0x218e4a=0x0,_0x1dde13=0x0,_0xa237b8=0x0;switch(_0x773d19[_0x5664b5(0x2a0)]){case _0x5664b5(0x197):_0x2f20ae=_0x773d19[_0x5664b5(0x279)]*_0x159bc1+_0x32befd,_0x218e4a=_0x773d19['SpriteLength'],_0x1dde13=Math['ceil']((Graphics['width']-_0x2f20ae)/0x2),_0xa237b8=_0x773d19[_0x5664b5(0x199)];break;case _0x5664b5(0x24d):_0x2f20ae=_0x773d19[_0x5664b5(0x279)]*_0x159bc1+_0x32befd,_0x218e4a=_0x773d19[_0x5664b5(0x2eb)],_0x1dde13=Math[_0x5664b5(0x163)]((Graphics[_0x5664b5(0x2ec)]-_0x2f20ae)/0x2),_0xa237b8=Graphics['height']-_0x83f739-_0x218e4a-_0x773d19[_0x5664b5(0x199)];break;case _0x5664b5(0x20e):_0x2f20ae=_0x773d19['SpriteLength'],_0x218e4a=_0x773d19[_0x5664b5(0x279)]*_0x159bc1+_0x32befd,_0x1dde13=_0x773d19[_0x5664b5(0x199)],_0xa237b8=Math[_0x5664b5(0x163)]((_0x27d77c-_0x218e4a)/0x2),_0xa237b8+=_0x487b39;break;case _0x5664b5(0xe4):_0x2f20ae=_0x773d19[_0x5664b5(0x2eb)],_0x218e4a=_0x773d19[_0x5664b5(0x279)]*_0x159bc1+_0x32befd,_0x1dde13=Graphics[_0x5664b5(0x2ec)]-_0x2f20ae-_0x773d19[_0x5664b5(0x199)],_0xa237b8=Math['ceil']((_0x27d77c-_0x218e4a)/0x2),_0xa237b8+=_0x487b39;break;}if(!_0x30033a){const _0x4c583d=Window_BTB_TurnOrder['Settings'][_0x5664b5(0x125)];let _0x5bf447=Math[_0x5664b5(0x2ae)](_0x4d713a,Math[_0x5664b5(0x2ae)]($gameParty[_0x5664b5(0x313)]()+0x8)-_0x159bc1);switch(_0x773d19[_0x5664b5(0x2a0)]){case _0x5664b5(0x197):case _0x5664b5(0x24d):_0x4c583d&&(_0x1dde13-=_0x5bf447*_0x773d19[_0x5664b5(0x279)]);break;}}return _0x1dde13+=_0x773d19['DisplayOffsetX'],_0xa237b8+=_0x773d19[_0x5664b5(0x170)],new Rectangle(_0x1dde13,_0xa237b8,_0x2f20ae,_0x218e4a);},Window_BTB_TurnOrder[_0x50350f(0x1cd)]['updatePadding']=function(){this['padding']=0x0;},Window_BTB_TurnOrder['prototype'][_0x50350f(0xf8)]=function(){const _0xf9d3c=_0x50350f,_0xee5f3d=Window_BTB_TurnOrder[_0xf9d3c(0x1f9)],_0x51de63=[_0xf9d3c(0x197),'bottom'][_0xf9d3c(0x237)](_0xee5f3d[_0xf9d3c(0x2a0)]);return _0x51de63;},Window_BTB_TurnOrder['prototype'][_0x50350f(0x11c)]=function(){const _0x34c016=_0x50350f;this['_turnOrderInnerSprite']=new Sprite(),this[_0x34c016(0x210)](this[_0x34c016(0x28f)]),this[_0x34c016(0x260)]=[];for(let _0x295102=0x0;_0x295102<$gameParty['maxBattleMembers']();_0x295102++){const _0x2afbaf=new Sprite_BTB_TurnOrder_Battler($gameParty,_0x295102);this[_0x34c016(0x28f)]['addChild'](_0x2afbaf),this[_0x34c016(0x260)][_0x34c016(0x256)](_0x2afbaf);}for(let _0x37133e=0x0;_0x37133e<$gameTroop['members']()['length'];_0x37133e++){const _0x3b671c=new Sprite_BTB_TurnOrder_Battler($gameTroop,_0x37133e);this[_0x34c016(0x28f)]['addChild'](_0x3b671c),this[_0x34c016(0x260)][_0x34c016(0x256)](_0x3b671c);}},Window_BTB_TurnOrder[_0x50350f(0x1cd)][_0x50350f(0x2b6)]=function(){const _0x12a023=_0x50350f;Window_Base[_0x12a023(0x1cd)][_0x12a023(0x2b6)]['call'](this),this[_0x12a023(0x10d)](),this[_0x12a023(0x1a2)](),this['updateSidePosition'](),this[_0x12a023(0x288)](),this[_0x12a023(0x195)]();},Window_BTB_TurnOrder[_0x50350f(0x1cd)][_0x50350f(0x10d)]=function(){const _0x5d308b=_0x50350f;if(this['_homeDuration']>0x0){const _0x53fb47=this['_homeDuration'];this['_homeX']=(this[_0x5d308b(0x13e)]*(_0x53fb47-0x1)+this[_0x5d308b(0xdb)])/_0x53fb47,this[_0x5d308b(0x143)]=(this['_homeY']*(_0x53fb47-0x1)+this['_targetHomeY'])/_0x53fb47,this[_0x5d308b(0x138)]--,this[_0x5d308b(0x138)]<=0x0&&(this[_0x5d308b(0x13e)]=this[_0x5d308b(0xdb)],this[_0x5d308b(0x143)]=this[_0x5d308b(0x1e5)]);}},Window_BTB_TurnOrder[_0x50350f(0x1cd)]['updatePosition']=function(){const _0x4edb2b=_0x50350f,_0x1a271f=Window_BTB_TurnOrder[_0x4edb2b(0x1f9)];if(_0x1a271f[_0x4edb2b(0x2a0)]!=='top')return;if(!_0x1a271f['RepositionTopForHelp'])return;const _0xec4f37=SceneManager['_scene'][_0x4edb2b(0x123)];if(!_0xec4f37)return;_0xec4f37['visible']?(this['x']=this['_homeX']+(_0x1a271f[_0x4edb2b(0x2c6)]||0x0),this['y']=this[_0x4edb2b(0x143)]+(_0x1a271f[_0x4edb2b(0x23d)]||0x0)):(this['x']=this[_0x4edb2b(0x13e)],this['y']=this[_0x4edb2b(0x143)]);const _0x1fa199=SceneManager['_scene'][_0x4edb2b(0x2ba)];this['_ogWindowLayerX']===undefined&&(this['_ogWindowLayerX']=Math[_0x4edb2b(0x1b7)]((Graphics[_0x4edb2b(0x2ec)]-Math[_0x4edb2b(0x2ae)](Graphics['boxWidth'],_0x1fa199[_0x4edb2b(0x2ec)]))/0x2),this['_ogWindowLayerY']=Math['round']((Graphics[_0x4edb2b(0x21b)]-Math[_0x4edb2b(0x2ae)](Graphics[_0x4edb2b(0x188)],_0x1fa199['height']))/0x2)),this['x']+=_0x1fa199['x']-this[_0x4edb2b(0x131)],this['y']+=_0x1fa199['y']-this[_0x4edb2b(0x14d)];},Window_BTB_TurnOrder[_0x50350f(0x1cd)][_0x50350f(0x285)]=function(){const _0x35ba25=_0x50350f,_0x5f1538=Window_BTB_TurnOrder[_0x35ba25(0x1f9)];if([_0x35ba25(0x197)][_0x35ba25(0x237)](_0x5f1538['DisplayPosition']))return;this['x']=this[_0x35ba25(0x13e)],this['y']=this['_homeY'];const _0x6d322e=SceneManager[_0x35ba25(0x253)]['_windowLayer'];this['x']+=_0x6d322e['x'],this['y']+=_0x6d322e['y'];},Window_BTB_TurnOrder[_0x50350f(0x1cd)][_0x50350f(0x288)]=function(){const _0x545ecd=_0x50350f;if(!this[_0x545ecd(0x28f)])return;const _0x252e44=this[_0x545ecd(0x28f)][_0x545ecd(0xe5)];if(!_0x252e44)return;_0x252e44[_0x545ecd(0x255)](this[_0x545ecd(0x162)][_0x545ecd(0x16a)](this));},Window_BTB_TurnOrder[_0x50350f(0x1cd)][_0x50350f(0x162)]=function(_0x591ebb,_0x1ce7ac){const _0x218b81=_0x50350f,_0x4d7112=this[_0x218b81(0xf8)](),_0x98be87=Window_BTB_TurnOrder[_0x218b81(0x1f9)][_0x218b81(0x125)];if(_0x4d7112&&!_0x98be87)return _0x591ebb['x']-_0x1ce7ac['x'];else{if(_0x4d7112&&_0x98be87)return _0x1ce7ac['x']-_0x591ebb['x'];else{if(!_0x4d7112&&_0x98be87)return _0x591ebb['y']-_0x1ce7ac['y'];else{if(!_0x4d7112&&!_0x98be87)return _0x1ce7ac['y']-_0x591ebb['y'];}}}},Window_BTB_TurnOrder[_0x50350f(0x1cd)]['updateVisibility']=function(){const _0x528a90=_0x50350f;this[_0x528a90(0x109)]=$gameSystem[_0x528a90(0x152)]();},Window_BTB_TurnOrder[_0x50350f(0x1cd)][_0x50350f(0xf0)]=function(_0x55ba35){const _0x5f28de=_0x50350f;this[_0x5f28de(0x260)][_0x5f28de(0x255)]((_0x56fb7e,_0x44245e)=>{const _0x1c3362=_0x5f28de;return _0x56fb7e['containerPosition']()-_0x44245e[_0x1c3362(0x1f0)]();}),this['recalculateHome']();if(!_0x55ba35)return;for(const _0x1cab4e of this[_0x5f28de(0x260)]){if(!_0x1cab4e)continue;_0x1cab4e[_0x5f28de(0x2b6)](),_0x1cab4e['_positionDuration']=0x0;}},Window_BTB_TurnOrder['prototype'][_0x50350f(0x128)]=function(){const _0x5de7fe=_0x50350f;if(!this[_0x5de7fe(0xf8)]())return;const _0x254820=VisuMZ['BattleSystemBTB'][_0x5de7fe(0x1f9)][_0x5de7fe(0x179)];if(!_0x254820[_0x5de7fe(0x171)])return;const _0x29682c=$gameParty[_0x5de7fe(0xdf)]()['filter'](_0x27892c=>_0x27892c&&_0x27892c['isAlive']()&&_0x27892c[_0x5de7fe(0x1ca)]())[_0x5de7fe(0x102)],_0x47ece8=$gameTroop['members']()[_0x5de7fe(0x281)](_0x5625c7=>_0x5625c7&&_0x5625c7[_0x5de7fe(0x2cf)]()&&_0x5625c7[_0x5de7fe(0x1ca)]())['length'],_0x50c3e0=this[_0x5de7fe(0x18a)](_0x29682c,_0x47ece8);this[_0x5de7fe(0xdb)]=_0x50c3e0['x'],this[_0x5de7fe(0x1e5)]=_0x50c3e0['y'],(this[_0x5de7fe(0xdb)]!==this['_homeX']||this['_targetHomeY']!==this[_0x5de7fe(0x143)])&&(this['_homeDuration']=_0x254820[_0x5de7fe(0x14a)]);};