//=============================================================================
// VisuStella MZ - Battle System BTB - Brave Turn Battle
// VisuMZ_2_BattleSystemBTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemBTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemBTB = VisuMZ.BattleSystemBTB || {};
VisuMZ.BattleSystemBTB.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.04] [BattleSystemBTB]
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

const _0x222a=['bind','addChildAt','_letterSprite','calculateTargetPositions','getOffsetY_BTB','getOffsetX_BTB','createBTBActionCounters','createTurnOrderBTBGraphicType','ParseSkillNotetags','updateGraphic','padding','Mechanics','clearTurnOrderBTBGraphics','ItemsEquipsCore','_tempBattler','isBattleItemWindowBTB','BTB_MIN_BRAVEPOINTS_DEFAULT','_windowLayer','braveAnimationTimes','_containerWidth','Enemy-%1-%2','max','ARRAYEVAL','Actor','1IRoFxg','updateOpacity','isInputting','Class-%1-%2','makeActions','ShowCommand','addLoadListener','inputtingAction','prototype','clearRect','_graphicFaceIndex','min','_bypassAiValidCheck','isBattleSystemBTBTurnOrderVisible','push','DrawActionCountersJS','_letter','BravePointSetTarget','BattleManager_startTurn','speed','MaxHorzSprites','_ogWindowLayerY','242649glsRJb','cancelBrave','createActorCommandWindowBTB','SpriteLength','JSON','Item-%1-%2','reduceBrave','initBattleSystemBTB','123016uElcFs','IconSet','drawItemStatusListStyle','createBattlerSprites','BraveAnimation','EnemyActionFusions','Game_Action_allowRandomSpeed','RepositionLogWindow','btbBravePointsIcon','drawTextEx','updateSelectionEffect','removeActionBattlersBTB','isBTB','substring','faceHeight','opacity','Parse_Notetags_BravePointsUserJS','createBorderSprite','maxBattleMembers','_logWindow','Window_BattleLog_startAction','_isBattleOver','ShowCostForGuard','Game_Action_setItem','Game_Battler_onTurnEnd','fillRect','Game_Action_applyItemUserEffect','drawItemNumberBTB','BravePointCostFmt','updateHomePosition','applyBattleItemWindowBTB','currentAction','iconHeight','name','BattleManager_makeActionOrders','startActionBTB','_graphicSprite','commandBrave','height','Enemies','allowRandomSpeed','onDatabaseLoaded','numActions','FusionStrict','BTB','%1_display','performCollapse','JsBravePointsTarget','selectNextCommand','_fullWidth','JsBravePointsUser','EnableFusion','addChild','BattleManager_battleSys','btbBravePointsAbbr','_plural','EnemyBattlerFaceIndex','Game_BattlerBase_appear','_btbItemStrictFusion','processUpdateGraphic','_blendColor','process_VisuMZ_BattleSystemBTB','itemRect','_actionFusionRecipe','_actor','showBraveAnimationBTB','STR','join','_btbActionSprite','_scene','_btbTurnOrderFaceIndex','refreshStatusBTB','setHandler','makeActionTimes','destroy','compareBattlerSprites','ARRAYJSON','CancelAnimationID','isActiveTpb','Show_0_BP_Cost','MinBravePointsHardCap','commandCancel','mainFontFace','filter','BraveAnimationID','ItemQuantityFontSize','createTurnOrderBTBGraphicFaceName','concat','createBTBTurnOrderWindow','bravePoints','SpriteThin','ARRAYSTR','setBTBGraphicIconIndex','ParseAllNotetags','getItemIdWithName','initialize','modifyBTBActionCounterSprite','FusionFlex','makeActionOrders','_btbTurnOrderVisible','_isAppeared','round','textWidth','BorderThickness','ShowFacesListStyle','setup','SubjectDistance','bottom','_graphicHue','Window_Base_close','enemy','initHomePositions','currentExt','BravePointsFull','clamp','#000000','applyItemBattleSystemBTBUserEffect','_skillIDs','btbActionSlot','canUse','lineHeight','Game_Action_speed','optDisplayTp','Show_1_BP_Cost','getActionFusionRecipeSkills','registerCommand','createBattlerRect','RepositionTopForHelp','svactor','Actor-%1-%2','_homeY','traitObjects','\x5cI[%1]','Window_Base_drawItemNumber','createTestBitmap','resetFontSettings','_position','ActorActionFusions','requestRefresh','isTpb','_btbSkillStrictFusion','BtbTurnOrderClearEnemyGraphic','MaxActionsHardCap','Window_Selectable_select','11xQsPhy','currentSymbol','Game_Battler_performCollapse','iconWidth','FaceName','pop','EnemyBattlerIcon','members','startInput','face','floor','canPayActionFusionCombination','needsSelection','close','Game_BattlerBase_hide','IconIndex','waitCount','makeAdditionalCostTextBTB','isEnemy','checkOpacity','containerPosition','BTB_MIN_BRAVEPOINTS_HARD_CAP','processActionFusionsBTB','ShowCostForAttack','icon','%1AnimationID','BravePointsIcon','setBattleSystemBTBTurnOrderVisible','BattleManager_isTurnBased','makeCommandList','createGraphicSprite','brave','predictedBravePoints','CostPosition','faceIndex','payBravePointsCost','allBattleMembers','MaxVertSprites','cursorPagedown','_actorCommandWindow','Game_Unit_makeActions','makeDeepCopy','ShowMarkerBg','center','updatePadding','makeAdditionalSkillCostText','FaceIndex','_unit','process_VisuMZ_BattleSystemBTB_Notetags','BravePointItemCost','checkPosition','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_homeDuration','186258UhFkjo','Game_System_initialize','Armor-%1-%2','refresh','%1BgColor2','updateTurnOrder','containerWindow','createBackgroundSprite','modifyBTBActionCounterSprite_Fallback','PositiveColor','_actionInputIndex','_statusWindow','commandCancelBTB','Weapon-%1-%2','_homeX','loadSvEnemy','updateGraphicHue','Actors','isDrawItemNumber','version','left','_index','useItem','requestFauxAnimation','btbCostFormat','ARRAYNUM','%1Mute','initMembers','BTB_Help','btbBraveCommand','BtbTurnOrderClearActorGraphic','indexOf','maxBravePoints','onBattleStart','btbBravePointsFull','appear','Settings','isForFriend','skillCostSeparator','Game_BattlerBase_canUse','BTB_MAX_ACTIONS_DEFAULT','sortActionOrdersBTB','calcRegenBravePoints','ActorBattlerType','createTurnOrderBTBGraphicIconIndex','numItems','Window_Help_setItem','getTotalActionFusionRecipes','_containerHeight','EnemyBattlerDrawLetter','top','singleSkill','_phase','minBravePoints','Game_Battler_useItem','Enemy','_positionTargetX','anchor','%1-%2','ShowEnemyBrave','General','constructor','_guardUnleash','RepositionTopHelpX','BravePointStartNeutral','canProcessActionFusionsBTB','createTurnOrderBTBGraphicFaceIndex','BtbTurnOrderActorIcon','MinBravePointsDefault','showBravePoints','bitmapHeight','MaxBravePoints','createLetterSprite','isActor','queueBraveAnimationsBTB','_graphicSv','BravePointPredictedCost','actor','MaxActionsDefault','createAllWindows','Window_BattleStatus_drawItemStatusListStyle','showNormalAnimation','call','svBattlerName','hide','20673sHOrwR','Game_Action_setSkill','_braveStartupAnimation','_btbTurnOrderWindow','applyBattleSystemBTBUserEffect','TurnOrderBTBGraphicType','battler','BTB_MAX_BRAVEPOINTS_HARD_CAP','btbMatchesCurrentFusionAction','battleLayoutStyle','BattleLayout','_itemIDs','State-%1-%2','_graphicEnemy','hideBraveTrait','\x5cC[%1]%2\x5cC[0]','canInput','BravePointsAbbr','EnemyBattlerType','_graphicIconIndex','_isAlive','battleEnd','EnemyBattlerFaceName','getBattleSystem','Window_Selectable_cursorPagedown','process_VisuMZ_BattleSystemBTB_JS','commandStyle','updateVisibility','ScreenBuffer','updatePosition','subject','setItem','item','battlerName','toUpperCase','useItemBTB','ceil','Window_ActorCommand_addGuardCommand','DisplayPosition','Game_BattlerBase_canGuard','sort','WaitFrames','onTurnEndBTB','update','STRUCT','loadSystem','BTB_MAX_ACTIONS_HARD_CAP','Cancel','86201vAYuex','formFlexCombo','MinBravePoints','DisplayOffsetX','BtbTurnOrderActorFace','OrderDirection','isTurnBased','parse','visible','_turnOrderInnerSprite','create','_turnOrderContainer','getColor','_helpWindow','StatusDisplayFmt','_armors','battlerHue','drawItemNumber','_fadeDuration','_actionBattlers','_btbTurnOrderGraphicType','Game_Actor_makeActions','_bravePoints','_actions','BattleSystemBTB','BravePointStartFavor','_btbSkillFlexFusion','bitmapWidth','defaultPosition','performBrave','_items','_targetIndex','textSizeEx','NeutralColor','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','makeSpeed','StatusPredictFmt','repositionLogWindowBTB','updateTurnOrderBTB','HideBrave','isAlive','NegativeColor','btbRegisterFusions','TurnOrderBTBGraphicIconIndex','Window_ActorCommand_makeCommandList','BattleManager_isActiveTpb','AllowRandomSpeed','cancel','ActorBattlerIcon','return\x200','NUM','getSkillIdWithName','FUNC','recalculateHome','setText','btbActionCurrent','setHue','btbParseFusionData','drawText','_fadeTarget','battleSys','isSideView','btbPaySkillFusionCosts','split','fontSize','bitmap','changeSvActorGraphicBitmap','ConvertParams','_targetHomeY','_scrollX','%1_offsetX','UpdateFrames','applyItemUserEffect','Window_BattleStatus_drawItemStatusXPStyle','waitForAnimation','checkActionsBTB','gainBravePoints','onTurnEnd','_targetHomeX','note','ARRAYFUNC','startTurn','234699iraXMn','length','TurnOrderBTBGraphicFaceName','BTB_MAX_BRAVEPOINTS_DEFAULT','\x5cI[%1]%2','createInitialPositions','faceName','addInnerChild','splice','format','EnemyMultiAction','_graphicFaceName','_surprise','getChildIndex','ItemScene','makeMultiActionsBTB','isAppeared','RepositionTopHelpY','gradientFillRect','remove','drawActorBravePoints','RegExp','MaxActions','loadSvActor','onDisabledPartyCommandSelection','BravePointCost','match','MaxBravePointsDefault','setSkill','ParseItemNotetags','map','guard','createActorCommandWindow','Scene_Battle_createAllWindows','maxBraveActions','cannotFusionNotetagBTB','Game_Enemy_makeActions','EnemyBattlerFontSize','itemRectPortraitBTB','BravePointAlterUser','canAddBraveCommand','getStateTooltipBattler','test','repeat','changeIconGraphicBitmap','description','select','changeEnemyGraphicBitmap','some','Window','%1SystemBg','Scene_Battle_createActorCommandWindow','_positionTargetY','BravePointBattleStart','exit','canBrave','includes','setActionFusionBTB','Game_Battler_makeActionTimes','setGuard','startAction','clearActions','cursorPageup','isHorz','ActionCurrent','_btbTurnOrderIconIndex','Window_Base_makeAdditionalSkillCostText','isUsePageUpDnShortcutBTB','_btbItemFlexFusion','updateSidePosition','ActionSlot','%1BgColor1','canActionFusionWithBTB','right','setBlendColor','btbPayItemFusionCosts','canGuard','getActionFusionRecipeItems','BattleManager_startInput','Game_BattlerBase_canInput','BattleCore','cannotBraveTrait','startFade','BattleManager_isTpb','_ogWindowLayerX','_scrollY','trim','%1Mirror','createChildren','width','BattleManager_startAction','_subject','shift','blt','changeFaceGraphicBitmap','TurnOrder','_graphicType','isSkill','298888csQtkK','BravePointSkillCost','updateBattleContainerOrder','TurnOrderBTBGraphicFaceIndex','isSceneBattle','faceWidth','createKeyJS','SystemTurnOrderVisibility','ReduceShownBPCost','_positionDuration','BravePointRegenBase','getAlignmentBTB','loseBravePoints','index','EnemyBattlerFontFace','drawItemStatusXPStyle','_btbTurnOrderFaceName','_backgroundSprite','bravePointsCost','children','destroyBTBActionCounters','removeActionFusionIngredients','setBravePoints','fontFace','getActionFusionCombinationsBTB','Window_Selectable_cursorPageup'];const _0x2b58=function(_0x16d4b2,_0x4d6643){_0x16d4b2=_0x16d4b2-0x13e;let _0x222aaa=_0x222a[_0x16d4b2];return _0x222aaa;};const _0x169c73=_0x2b58;(function(_0x9531bc,_0x12ae34){const _0x8d416a=_0x2b58;while(!![]){try{const _0x4624be=parseInt(_0x8d416a(0x1ce))+-parseInt(_0x8d416a(0x338))*-parseInt(_0x8d416a(0x2ae))+-parseInt(_0x8d416a(0x16c))+-parseInt(_0x8d416a(0x216))+parseInt(_0x8d416a(0x2e3))+-parseInt(_0x8d416a(0x21e))+-parseInt(_0x8d416a(0x368))*-parseInt(_0x8d416a(0x200));if(_0x4624be===_0x12ae34)break;else _0x9531bc['push'](_0x9531bc['shift']());}catch(_0x36acc3){_0x9531bc['push'](_0x9531bc['shift']());}}}(_0x222a,0x306f2));var label=_0x169c73(0x380),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x169c73(0x271)](function(_0x4db0e0){const _0x145ceb=_0x169c73;return _0x4db0e0['status']&&_0x4db0e0['description'][_0x145ceb(0x1a4)]('['+label+']');})[0x0];VisuMZ[label][_0x169c73(0x307)]=VisuMZ[label][_0x169c73(0x307)]||{},VisuMZ['ConvertParams']=function(_0x4b6e55,_0x1ebde9){const _0x5c6a81=_0x169c73;for(const _0x8ca4a6 in _0x1ebde9){if(_0x8ca4a6[_0x5c6a81(0x186)](/(.*):(.*)/i)){const _0x5a8b70=String(RegExp['$1']),_0x337695=String(RegExp['$2'])[_0x5c6a81(0x35a)]()['trim']();let _0x25c7ed,_0x460cd2,_0x5c8634;switch(_0x337695){case _0x5c6a81(0x14c):_0x25c7ed=_0x1ebde9[_0x8ca4a6]!==''?Number(_0x1ebde9[_0x8ca4a6]):0x0;break;case _0x5c6a81(0x2fc):_0x460cd2=_0x1ebde9[_0x8ca4a6]!==''?JSON[_0x5c6a81(0x36f)](_0x1ebde9[_0x8ca4a6]):[],_0x25c7ed=_0x460cd2[_0x5c6a81(0x18a)](_0x101564=>Number(_0x101564));break;case'EVAL':_0x25c7ed=_0x1ebde9[_0x8ca4a6]!==''?eval(_0x1ebde9[_0x8ca4a6]):null;break;case _0x5c6a81(0x1fe):_0x460cd2=_0x1ebde9[_0x8ca4a6]!==''?JSON[_0x5c6a81(0x36f)](_0x1ebde9[_0x8ca4a6]):[],_0x25c7ed=_0x460cd2[_0x5c6a81(0x18a)](_0x11614a=>eval(_0x11614a));break;case _0x5c6a81(0x21a):_0x25c7ed=_0x1ebde9[_0x8ca4a6]!==''?JSON['parse'](_0x1ebde9[_0x8ca4a6]):'';break;case _0x5c6a81(0x26a):_0x460cd2=_0x1ebde9[_0x8ca4a6]!==''?JSON[_0x5c6a81(0x36f)](_0x1ebde9[_0x8ca4a6]):[],_0x25c7ed=_0x460cd2[_0x5c6a81(0x18a)](_0x3078ac=>JSON[_0x5c6a81(0x36f)](_0x3078ac));break;case _0x5c6a81(0x14e):_0x25c7ed=_0x1ebde9[_0x8ca4a6]!==''?new Function(JSON[_0x5c6a81(0x36f)](_0x1ebde9[_0x8ca4a6])):new Function(_0x5c6a81(0x14b));break;case _0x5c6a81(0x16a):_0x460cd2=_0x1ebde9[_0x8ca4a6]!==''?JSON[_0x5c6a81(0x36f)](_0x1ebde9[_0x8ca4a6]):[],_0x25c7ed=_0x460cd2[_0x5c6a81(0x18a)](_0x26501a=>new Function(JSON[_0x5c6a81(0x36f)](_0x26501a)));break;case _0x5c6a81(0x260):_0x25c7ed=_0x1ebde9[_0x8ca4a6]!==''?String(_0x1ebde9[_0x8ca4a6]):'';break;case _0x5c6a81(0x279):_0x460cd2=_0x1ebde9[_0x8ca4a6]!==''?JSON[_0x5c6a81(0x36f)](_0x1ebde9[_0x8ca4a6]):[],_0x25c7ed=_0x460cd2['map'](_0x2c1d62=>String(_0x2c1d62));break;case _0x5c6a81(0x364):_0x5c8634=_0x1ebde9[_0x8ca4a6]!==''?JSON['parse'](_0x1ebde9[_0x8ca4a6]):{},_0x25c7ed=VisuMZ[_0x5c6a81(0x15d)]({},_0x5c8634);break;case'ARRAYSTRUCT':_0x460cd2=_0x1ebde9[_0x8ca4a6]!==''?JSON[_0x5c6a81(0x36f)](_0x1ebde9[_0x8ca4a6]):[],_0x25c7ed=_0x460cd2[_0x5c6a81(0x18a)](_0x3e2643=>VisuMZ[_0x5c6a81(0x15d)]({},JSON[_0x5c6a81(0x36f)](_0x3e2643)));break;default:continue;}_0x4b6e55[_0x5a8b70]=_0x25c7ed;}}return _0x4b6e55;},(_0x238f89=>{const _0x248115=_0x169c73,_0x25b4ef=_0x238f89[_0x248115(0x23f)];for(const _0x19ad94 of dependencies){if(!Imported[_0x19ad94]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x25b4ef,_0x19ad94)),SceneManager[_0x248115(0x1a2)]();break;}}const _0x4d683b=_0x238f89[_0x248115(0x199)];if(_0x4d683b[_0x248115(0x186)](/\[Version[ ](.*?)\]/i)){const _0x5f1c79=Number(RegExp['$1']);_0x5f1c79!==VisuMZ[label][_0x248115(0x2f6)]&&(alert(_0x248115(0x38a)['format'](_0x25b4ef,_0x5f1c79)),SceneManager[_0x248115(0x1a2)]());}if(_0x4d683b[_0x248115(0x186)](/\[Tier[ ](\d+)\]/i)){const _0xfab879=Number(RegExp['$1']);_0xfab879<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x25b4ef,_0xfab879,tier)),SceneManager[_0x248115(0x1a2)]()):tier=Math['max'](_0xfab879,tier);}VisuMZ[_0x248115(0x15d)](VisuMZ[label][_0x248115(0x307)],_0x238f89['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData[_0x169c73(0x23f)],_0x169c73(0x326),_0x241438=>{const _0x1a5431=_0x169c73;VisuMZ['ConvertParams'](_0x241438,_0x241438);const _0x3b019c=_0x241438[_0x1a5431(0x2f4)],_0x422b58=_0x241438['IconIndex'];for(const _0x1d675f of _0x3b019c){const _0x1f28a3=$gameActors[_0x1a5431(0x330)](_0x1d675f);if(!_0x1f28a3)continue;_0x1f28a3[_0x1a5431(0x37c)]=_0x1a5431(0x2c6),_0x1f28a3[_0x1a5431(0x1ad)]=_0x422b58;}}),PluginManager['registerCommand'](pluginData['name'],_0x169c73(0x36c),_0x3dba32=>{const _0x57bc30=_0x169c73;VisuMZ['ConvertParams'](_0x3dba32,_0x3dba32);const _0x2fffd1=_0x3dba32[_0x57bc30(0x2f4)],_0x5279b3=_0x3dba32[_0x57bc30(0x2b2)],_0x1b15c1=_0x3dba32['FaceIndex'];for(const _0x184b39 of _0x2fffd1){const _0x597f40=$gameActors['actor'](_0x184b39);if(!_0x597f40)continue;_0x597f40[_0x57bc30(0x37c)]=_0x57bc30(0x2b7),_0x597f40[_0x57bc30(0x1de)]=_0x5279b3,_0x597f40[_0x57bc30(0x264)]=_0x1b15c1;}}),PluginManager[_0x169c73(0x29b)](pluginData['name'],_0x169c73(0x301),_0x2f3043=>{const _0x5c0eb8=_0x169c73;VisuMZ[_0x5c0eb8(0x15d)](_0x2f3043,_0x2f3043);const _0x5c423a=_0x2f3043['Actors'];for(const _0x4979cd of _0x5c423a){const _0x2267b6=$gameActors[_0x5c0eb8(0x330)](_0x4979cd);if(!_0x2267b6)continue;_0x2267b6['clearTurnOrderBTBGraphics']();}}),PluginManager[_0x169c73(0x29b)](pluginData[_0x169c73(0x23f)],'BtbTurnOrderEnemyIcon',_0x333de9=>{const _0x130117=_0x169c73;VisuMZ[_0x130117(0x15d)](_0x333de9,_0x333de9);const _0x3ac5ac=_0x333de9[_0x130117(0x245)],_0x4b31c8=_0x333de9[_0x130117(0x2bd)];for(const _0x501845 of _0x3ac5ac){const _0x31237c=$gameTroop['members']()[_0x501845];if(!_0x31237c)continue;_0x31237c['_btbTurnOrderGraphicType']=_0x130117(0x2c6),_0x31237c[_0x130117(0x1ad)]=_0x4b31c8;}}),PluginManager[_0x169c73(0x29b)](pluginData['name'],'BtbTurnOrderEnemyFace',_0x416a69=>{const _0x2e8f9c=_0x169c73;VisuMZ[_0x2e8f9c(0x15d)](_0x416a69,_0x416a69);const _0x156d0d=_0x416a69[_0x2e8f9c(0x245)],_0x2e1bbc=_0x416a69[_0x2e8f9c(0x2b2)],_0x3083ce=_0x416a69[_0x2e8f9c(0x2dc)];for(const _0x3a9c37 of _0x156d0d){const _0x14dd83=$gameTroop['members']()[_0x3a9c37];if(!_0x14dd83)continue;_0x14dd83[_0x2e8f9c(0x37c)]=_0x2e8f9c(0x2b7),_0x14dd83[_0x2e8f9c(0x1de)]=_0x2e1bbc,_0x14dd83[_0x2e8f9c(0x264)]=_0x3083ce;}}),PluginManager[_0x169c73(0x29b)](pluginData[_0x169c73(0x23f)],_0x169c73(0x2ab),_0x2c7948=>{const _0x294a64=_0x169c73;VisuMZ[_0x294a64(0x15d)](_0x2c7948,_0x2c7948);const _0x1f6c82=_0x2c7948[_0x294a64(0x245)];for(const _0x20f66c of _0x1f6c82){const _0x1395c7=$gameTroop['members']()[_0x20f66c];if(!_0x1395c7)continue;_0x1395c7[_0x294a64(0x1f4)]();}}),PluginManager[_0x169c73(0x29b)](pluginData[_0x169c73(0x23f)],_0x169c73(0x1d5),_0x3035fa=>{const _0x11e300=_0x169c73;VisuMZ[_0x11e300(0x15d)](_0x3035fa,_0x3035fa);const _0x30c497=_0x3035fa['Visible'];$gameSystem[_0x11e300(0x2c9)](_0x30c497);}),VisuMZ[_0x169c73(0x380)][_0x169c73(0x181)]={'EnemyMultiAction':/<BTB (?:MULTI|MULTIPLE) (?:ACTION|ACTIONS):[ ](.*)>/i,'BravePointCost':/<BTB (?:BRAVE|BP) COST:[ ](\d+)>/i,'BravePointSetUser':/<BTB USER SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointSetTarget':/<BTB TARGET SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointAlterUser':/<BTB USER (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointAlterTarget':/<BTB TARGET (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'HideBravePointCost':/<BTB HIDE (?:BRAVE|BP) COST>/i,'BTB_Help':/<BTB HELP>\s*([\s\S]*)\s*<\/BTB HELP>/i,'FusionFlex':/<BTB (?:FLEX|FLEXIBLE) FUSION:[ ](.*)>/gi,'FusionStrict':/<BTB (?:STRICT|EXACT) FUSION:[ ](.*)>/gi,'JsBravePointsUser':/<JS BTB USER (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB USER (?:BRAVE|BP)>/i,'JsBravePointsTarget':/<JS BTB TARGET (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB TARGET (?:BRAVE|BP)>/i,'BravePointBattleStart':/<BTB INITIAL (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointRegen':/<BTB (?:BRAVE|BP) (?:REGEN|DEGEN):[ ]([\+\-]\d+)>/i,'MaxBravePoints':/<BTB (?:MAXIMUM|MAX) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MinBravePoints':/<BTB (?:MINIMUM|MIN) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MaxActions':/<BTB (?:MAXIMUM|MAX) (?:ACTION|ACTIONS):[ ]([\+\-]\d+)>/i,'CannotBrave':/<BTB CANNOT BRAVE>/i,'HideBrave':/<BTB HIDE BRAVE>/i,'CannotFusion':/<BTB CANNOT FUSION>/i,'EnableFusion':/<BTB ENABLE FUSION>/i},VisuMZ[_0x169c73(0x380)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x169c73(0x247)],Scene_Boot[_0x169c73(0x208)][_0x169c73(0x247)]=function(){const _0x3e0f1b=_0x169c73;VisuMZ['BattleSystemBTB']['Scene_Boot_onDatabaseLoaded'][_0x3e0f1b(0x335)](this),this[_0x3e0f1b(0x25b)]();},Scene_Boot[_0x169c73(0x208)][_0x169c73(0x25b)]=function(){const _0x65e2c2=_0x169c73;this[_0x65e2c2(0x2de)](),this[_0x65e2c2(0x351)]();},Scene_Boot[_0x169c73(0x208)][_0x169c73(0x2de)]=function(){const _0x50b697=_0x169c73;if(VisuMZ[_0x50b697(0x27b)])return;const _0x46db9f=$dataSkills[_0x50b697(0x275)]($dataItems);for(const _0x51db14 of _0x46db9f){if(!_0x51db14)continue;DataManager[_0x50b697(0x144)](_0x51db14);}},VisuMZ[_0x169c73(0x380)]['JS']={},Scene_Boot[_0x169c73(0x208)][_0x169c73(0x351)]=function(){const _0x596fc5=_0x169c73;if(VisuMZ[_0x596fc5(0x27b)])return;const _0x2aa7ba=VisuMZ['BattleSystemBTB'][_0x596fc5(0x181)],_0x500fde=$dataSkills[_0x596fc5(0x275)](dataItems);for(const _0x17c246 of _0x500fde){if(!_0x17c246)continue;VisuMZ[_0x596fc5(0x380)][_0x596fc5(0x22e)](_0x17c246,_0x596fc5(0x250)),VisuMZ[_0x596fc5(0x380)][_0x596fc5(0x22e)](_0x17c246,_0x596fc5(0x24d));}},VisuMZ[_0x169c73(0x380)]['Parse_Notetags_BravePointsUserJS']=function(_0x141cb5,_0x563e1c){const _0x4d689f=_0x169c73,_0x5bc243=VisuMZ[_0x4d689f(0x380)][_0x4d689f(0x181)][_0x563e1c],_0x9bdc1e=_0x141cb5[_0x4d689f(0x169)];if(_0x9bdc1e[_0x4d689f(0x186)](_0x5bc243)){const _0x2708d0=String(RegExp['$1']),_0x144d3c=_0x4d689f(0x2e1)[_0x4d689f(0x175)](_0x2708d0),_0x257b0f=VisuMZ[_0x4d689f(0x380)][_0x4d689f(0x1d4)](_0x141cb5,_0x563e1c);VisuMZ['BattleSystemBTB']['JS'][_0x257b0f]=new Function(_0x144d3c);}},VisuMZ['BattleSystemBTB']['createKeyJS']=function(_0x23aad6,_0x119b61){const _0x21a28a=_0x169c73;let _0x14a98f='';if($dataActors[_0x21a28a(0x1a4)](_0x23aad6))_0x14a98f=_0x21a28a(0x29f)[_0x21a28a(0x175)](_0x23aad6['id'],_0x119b61);if($dataClasses['includes'](_0x23aad6))_0x14a98f=_0x21a28a(0x203)[_0x21a28a(0x175)](_0x23aad6['id'],_0x119b61);if($dataSkills['includes'](_0x23aad6))_0x14a98f='Skill-%1-%2'[_0x21a28a(0x175)](_0x23aad6['id'],_0x119b61);if($dataItems[_0x21a28a(0x1a4)](_0x23aad6))_0x14a98f=_0x21a28a(0x21b)['format'](_0x23aad6['id'],_0x119b61);if($dataWeapons[_0x21a28a(0x1a4)](_0x23aad6))_0x14a98f=_0x21a28a(0x2f0)[_0x21a28a(0x175)](_0x23aad6['id'],_0x119b61);if($dataArmors[_0x21a28a(0x1a4)](_0x23aad6))_0x14a98f=_0x21a28a(0x2e5)[_0x21a28a(0x175)](_0x23aad6['id'],_0x119b61);if($dataEnemies[_0x21a28a(0x1a4)](_0x23aad6))_0x14a98f=_0x21a28a(0x1fc)[_0x21a28a(0x175)](_0x23aad6['id'],_0x119b61);if($dataStates[_0x21a28a(0x1a4)](_0x23aad6))_0x14a98f=_0x21a28a(0x344)['format'](_0x23aad6['id'],_0x119b61);return _0x14a98f;},VisuMZ[_0x169c73(0x380)][_0x169c73(0x1f0)]=VisuMZ['ParseSkillNotetags'],VisuMZ['ParseSkillNotetags']=function(_0x404bf5){const _0x577de4=_0x169c73;VisuMZ[_0x577de4(0x380)]['ParseSkillNotetags'][_0x577de4(0x335)](this,_0x404bf5),DataManager[_0x577de4(0x144)](_0x404bf5),VisuMZ['BattleSystemBTB'][_0x577de4(0x22e)](_0x404bf5,_0x577de4(0x250)),VisuMZ[_0x577de4(0x380)]['Parse_Notetags_BravePointsUserJS'](_0x404bf5,_0x577de4(0x24d));},VisuMZ['BattleSystemBTB']['ParseItemNotetags']=VisuMZ[_0x169c73(0x189)],VisuMZ[_0x169c73(0x189)]=function(_0x4106ee){const _0x390188=_0x169c73;VisuMZ['BattleSystemBTB'][_0x390188(0x189)][_0x390188(0x335)](this,_0x4106ee),DataManager[_0x390188(0x144)](_0x4106ee),VisuMZ[_0x390188(0x380)]['Parse_Notetags_BravePointsUserJS'](_0x4106ee,'JsBravePointsUser'),VisuMZ[_0x390188(0x380)][_0x390188(0x22e)](_0x4106ee,'JsBravePointsTarget');},DataManager[_0x169c73(0x14d)]=function(_0x585341){const _0x5721be=_0x169c73;_0x585341=_0x585341[_0x5721be(0x35a)]()['trim'](),this[_0x5721be(0x293)]=this[_0x5721be(0x293)]||{};if(this[_0x5721be(0x293)][_0x585341])return this[_0x5721be(0x293)][_0x585341];for(const _0x4e0155 of $dataSkills){if(!_0x4e0155)continue;this[_0x5721be(0x293)][_0x4e0155[_0x5721be(0x23f)][_0x5721be(0x35a)]()['trim']()]=_0x4e0155['id'];}return this[_0x5721be(0x293)][_0x585341]||0x0;},DataManager['getItemIdWithName']=function(_0x2d30c1){const _0x3059d8=_0x169c73;_0x2d30c1=_0x2d30c1[_0x3059d8(0x35a)]()[_0x3059d8(0x1c2)](),this['_itemIDs']=this[_0x3059d8(0x343)]||{};if(this[_0x3059d8(0x343)][_0x2d30c1])return this[_0x3059d8(0x343)][_0x2d30c1];for(const _0x2b7570 of $dataItems){if(!_0x2b7570)continue;this[_0x3059d8(0x343)][_0x2b7570[_0x3059d8(0x23f)][_0x3059d8(0x35a)]()[_0x3059d8(0x1c2)]()]=_0x2b7570['id'];}return this[_0x3059d8(0x343)][_0x2d30c1]||0x0;},DataManager[_0x169c73(0x382)]={},DataManager['_btbSkillStrictFusion']={},DataManager[_0x169c73(0x1b0)]={},DataManager[_0x169c73(0x258)]={},DataManager['btbRegisterFusions']=function(_0x529d90){const _0x24630d=_0x169c73;if(!_0x529d90)return;const _0x226b70=VisuMZ[_0x24630d(0x380)][_0x24630d(0x181)],_0x22cecc=_0x529d90[_0x24630d(0x169)],_0x513711=DataManager['isSkill'](_0x529d90),_0xd08c08=_0x22cecc[_0x24630d(0x186)](_0x226b70[_0x24630d(0x27f)]);if(_0xd08c08)for(const _0x42a47a of _0xd08c08){if(!_0x42a47a)continue;_0x42a47a[_0x24630d(0x186)](_0x226b70[_0x24630d(0x27f)]);const _0x266871=String(RegExp['$1'])['split'](','),_0xe59b53=this[_0x24630d(0x153)](_0x266871,_0x513711)[_0x24630d(0x360)]((_0x54577b,_0x228646)=>_0x54577b-_0x228646);if(_0xe59b53[_0x24630d(0x16d)]<=0x1)continue;const _0x300b29=_0xe59b53[_0x24630d(0x261)]('-'),_0x3b31c7=_0x513711?DataManager[_0x24630d(0x382)]:DataManager['_btbItemFlexFusion'];_0x3b31c7[_0x300b29]=_0x529d90['id'];}const _0x15398a=_0x22cecc[_0x24630d(0x186)](_0x226b70[_0x24630d(0x249)]);if(_0x15398a)for(const _0x535236 of _0x15398a){if(!_0x535236)continue;_0x535236[_0x24630d(0x186)](_0x226b70[_0x24630d(0x249)]);const _0x1f926a=String(RegExp['$1'])[_0x24630d(0x159)](','),_0x1ba1c8=this[_0x24630d(0x153)](_0x1f926a,_0x513711);if(_0x1ba1c8['length']<=0x1)continue;const _0x437591=_0x1ba1c8['join']('-'),_0x5d9f91=_0x513711?DataManager[_0x24630d(0x382)]:DataManager[_0x24630d(0x1b0)];_0x5d9f91[_0x437591]=_0x529d90['id'];}},DataManager['btbParseFusionData']=function(_0x16343f,_0xfc2d9d){const _0x521fca=_0x169c73,_0x1b83ff=[];for(let _0x2c7a03 of _0x16343f){_0x2c7a03=(String(_0x2c7a03)||'')[_0x521fca(0x1c2)]();const _0x3142d6=/^\d+$/[_0x521fca(0x196)](_0x2c7a03);if(_0x3142d6)_0x1b83ff['push'](Number(_0x2c7a03));else _0xfc2d9d?_0x1b83ff[_0x521fca(0x20e)](DataManager[_0x521fca(0x14d)](_0x2c7a03)):_0x1b83ff['push'](DataManager[_0x521fca(0x27c)](_0x2c7a03));}return _0x1b83ff;},ImageManager[_0x169c73(0x226)]=VisuMZ['BattleSystemBTB'][_0x169c73(0x307)][_0x169c73(0x31f)][_0x169c73(0x2c8)],TextManager[_0x169c73(0x305)]=VisuMZ[_0x169c73(0x380)]['Settings'][_0x169c73(0x31f)][_0x169c73(0x28f)],TextManager[_0x169c73(0x254)]=VisuMZ[_0x169c73(0x380)][_0x169c73(0x307)][_0x169c73(0x31f)][_0x169c73(0x349)],TextManager['btbCostFormat']=VisuMZ['BattleSystemBTB'][_0x169c73(0x307)][_0x169c73(0x31f)][_0x169c73(0x23a)],TextManager[_0x169c73(0x300)]=VisuMZ[_0x169c73(0x380)][_0x169c73(0x307)][_0x169c73(0x19d)]['CommandName'],TextManager[_0x169c73(0x294)]=VisuMZ[_0x169c73(0x380)][_0x169c73(0x307)]['Window'][_0x169c73(0x1b2)],TextManager[_0x169c73(0x151)]=VisuMZ['BattleSystemBTB'][_0x169c73(0x307)]['Window'][_0x169c73(0x1ac)],SceneManager[_0x169c73(0x1d2)]=function(){const _0xfd5fa1=_0x169c73;return this['_scene']&&this[_0xfd5fa1(0x263)][_0xfd5fa1(0x320)]===Scene_Battle;},VisuMZ[_0x169c73(0x380)][_0x169c73(0x253)]=BattleManager[_0x169c73(0x156)],BattleManager[_0x169c73(0x156)]=function(){const _0x42221a=_0x169c73;if(this[_0x42221a(0x22a)]())return _0x42221a(0x24a);return VisuMZ['BattleSystemBTB'][_0x42221a(0x253)][_0x42221a(0x335)](this);},BattleManager['isBTB']=function(){const _0x177626=_0x169c73;return $gameSystem[_0x177626(0x34f)]()===_0x177626(0x24a);},VisuMZ[_0x169c73(0x380)][_0x169c73(0x1bf)]=BattleManager['isTpb'],BattleManager[_0x169c73(0x2a9)]=function(){const _0x5f489a=_0x169c73;if(this[_0x5f489a(0x22a)]())return![];return VisuMZ[_0x5f489a(0x380)]['BattleManager_isTpb'][_0x5f489a(0x335)](this);},VisuMZ['BattleSystemBTB'][_0x169c73(0x147)]=BattleManager['isActiveTpb'],BattleManager[_0x169c73(0x26c)]=function(){const _0x2fe391=_0x169c73;if(this['isBTB']())return![];return VisuMZ[_0x2fe391(0x380)][_0x2fe391(0x147)][_0x2fe391(0x335)](this);},VisuMZ[_0x169c73(0x380)][_0x169c73(0x2ca)]=BattleManager[_0x169c73(0x36e)],BattleManager[_0x169c73(0x36e)]=function(){const _0x55b97a=_0x169c73;if(this[_0x55b97a(0x22a)]())return!![];return VisuMZ['BattleSystemBTB']['BattleManager_isTurnBased'][_0x55b97a(0x335)](this);},VisuMZ['BattleSystemBTB'][_0x169c73(0x1ba)]=BattleManager[_0x169c73(0x2b6)],BattleManager['startInput']=function(){const _0x403992=_0x169c73;VisuMZ['BattleSystemBTB'][_0x403992(0x1ba)]['call'](this),this[_0x403992(0x22a)]()&&this['isSkipPartyCommandWindow']()&&!this[_0x403992(0x178)]&&$gameParty[_0x403992(0x348)]()&&this[_0x403992(0x24e)]();},VisuMZ[_0x169c73(0x380)][_0x169c73(0x212)]=BattleManager[_0x169c73(0x16b)],BattleManager[_0x169c73(0x16b)]=function(){const _0x239807=_0x169c73;VisuMZ[_0x239807(0x380)][_0x239807(0x212)][_0x239807(0x335)](this),this[_0x239807(0x265)]();},BattleManager[_0x169c73(0x265)]=function(){const _0x174f65=_0x169c73;if(!SceneManager[_0x174f65(0x1d2)]())return;if(!this[_0x174f65(0x22a)]())return;const _0x3ff6b8=SceneManager['_scene'];if(!_0x3ff6b8)return;const _0x48f516=_0x3ff6b8[_0x174f65(0x2ee)];if(!_0x48f516)return;_0x48f516[_0x174f65(0x2a8)]();},VisuMZ['BattleSystemBTB'][_0x169c73(0x240)]=BattleManager[_0x169c73(0x280)],BattleManager[_0x169c73(0x280)]=function(){const _0x291bac=_0x169c73;VisuMZ[_0x291bac(0x380)][_0x291bac(0x240)]['call'](this),this[_0x291bac(0x22a)]()&&(this[_0x291bac(0x37b)]=this[_0x291bac(0x37b)]['filter'](_0x30f2a6=>_0x30f2a6&&_0x30f2a6['_actions'][_0x291bac(0x16d)]>0x0),this[_0x291bac(0x140)]());},BattleManager[_0x169c73(0x30c)]=function(){const _0x161081=_0x169c73;if(!this[_0x161081(0x22a)]())return;if(!SceneManager[_0x161081(0x1d2)]())return;const _0x1c9f9b=this[_0x161081(0x37b)];for(const _0x49ff78 of _0x1c9f9b){_0x49ff78[_0x161081(0x38b)]();}_0x1c9f9b['sort']((_0x40330e,_0x44fea0)=>_0x44fea0[_0x161081(0x213)]()-_0x40330e[_0x161081(0x213)]()),this['isBTB']()&&this[_0x161081(0x140)]();},BattleManager[_0x169c73(0x229)]=function(){const _0x5cdf2e=_0x169c73;if(!this[_0x5cdf2e(0x22a)]())return;this[_0x5cdf2e(0x37b)]=this['_actionBattlers']||[],this[_0x5cdf2e(0x37b)]=this[_0x5cdf2e(0x37b)]['filter'](_0x18b6f1=>_0x18b6f1&&_0x18b6f1['isAppeared']()&&_0x18b6f1[_0x5cdf2e(0x142)]()),this[_0x5cdf2e(0x140)]();},BattleManager[_0x169c73(0x140)]=function(_0x889410){if(!this['isBTB']())return;const _0x4fb9cf=SceneManager['_scene']['_btbTurnOrderWindow'];if(!_0x4fb9cf)return;_0x4fb9cf['updateTurnOrder'](_0x889410);},VisuMZ[_0x169c73(0x380)]['BattleManager_startAction']=BattleManager[_0x169c73(0x1a8)],BattleManager['startAction']=function(){const _0x167e1f=_0x169c73;BattleManager[_0x167e1f(0x22a)]()&&this[_0x167e1f(0x1c7)]&&this[_0x167e1f(0x1c7)]['processActionFusionsBTB'](),VisuMZ['BattleSystemBTB'][_0x167e1f(0x1c6)][_0x167e1f(0x335)](this);},VisuMZ[_0x169c73(0x380)][_0x169c73(0x2e4)]=Game_System['prototype']['initialize'],Game_System[_0x169c73(0x208)][_0x169c73(0x27d)]=function(){const _0x4e2c93=_0x169c73;VisuMZ[_0x4e2c93(0x380)][_0x4e2c93(0x2e4)]['call'](this),this[_0x4e2c93(0x21d)]();},Game_System['prototype'][_0x169c73(0x21d)]=function(){const _0x492602=_0x169c73;this[_0x492602(0x281)]=!![];},Game_System[_0x169c73(0x208)]['isBattleSystemBTBTurnOrderVisible']=function(){const _0x5bda63=_0x169c73;return this[_0x5bda63(0x281)]===undefined&&this[_0x5bda63(0x21d)](),this[_0x5bda63(0x281)];},Game_System[_0x169c73(0x208)][_0x169c73(0x2c9)]=function(_0x55fd99){const _0x16ab79=_0x169c73;this[_0x16ab79(0x281)]===undefined&&this['initBattleSystemBTB'](),this[_0x16ab79(0x281)]=_0x55fd99;},VisuMZ[_0x169c73(0x380)][_0x169c73(0x238)]=Game_Action['prototype'][_0x169c73(0x162)],Game_Action['prototype'][_0x169c73(0x162)]=function(_0x236882){const _0x1983cf=_0x169c73;VisuMZ[_0x1983cf(0x380)]['Game_Action_applyItemUserEffect'][_0x1983cf(0x335)](this,_0x236882),this[_0x1983cf(0x33c)](_0x236882);},Game_Action[_0x169c73(0x208)][_0x169c73(0x33c)]=function(_0x264bea){const _0x29605e=_0x169c73;if(!BattleManager['isBTB']())return;if(this[_0x29605e(0x358)]())this[_0x29605e(0x292)](_0x264bea);},Game_Action[_0x169c73(0x208)][_0x169c73(0x292)]=function(_0x1715bf){const _0x12a266=_0x169c73,_0x2da643=VisuMZ[_0x12a266(0x380)]['RegExp'],_0x57adea=this[_0x12a266(0x358)]()[_0x12a266(0x169)],_0x1f0ca5=this[_0x12a266(0x358)]();if(this[_0x12a266(0x356)]()){if(_0x57adea[_0x12a266(0x186)](_0x2da643['BravePointSetUser'])){const _0x567d12=Number(RegExp['$1']);this['subject']()[_0x12a266(0x1e4)](_0x567d12);}if(_0x57adea[_0x12a266(0x186)](_0x2da643[_0x12a266(0x193)])){const _0x2ff81a=Number(RegExp['$1']);this['subject']()[_0x12a266(0x166)](_0x2ff81a);}const _0xcf4696='JsBravePointsUser',_0x1d4891=VisuMZ[_0x12a266(0x380)][_0x12a266(0x1d4)](_0x1f0ca5,_0xcf4696);if(VisuMZ['BattleSystemBTB']['JS'][_0x1d4891]){const _0x2b80a9=VisuMZ[_0x12a266(0x380)]['JS'][_0x1d4891][_0x12a266(0x335)](this,this[_0x12a266(0x356)](),_0x1715bf,this[_0x12a266(0x356)]()[_0x12a266(0x277)]());this[_0x12a266(0x356)]()[_0x12a266(0x1e4)](_0x2b80a9);}}if(_0x1715bf){if(_0x57adea['match'](_0x2da643[_0x12a266(0x211)])){const _0x346171=Number(RegExp['$1']);_0x1715bf[_0x12a266(0x1e4)](_0x346171);}if(_0x57adea[_0x12a266(0x186)](_0x2da643['BravePointAlterTarget'])){const _0x1ba7aa=Number(RegExp['$1']);_0x1715bf[_0x12a266(0x166)](_0x1ba7aa);}const _0x1ead5d='JsBravePointsTarget',_0x2bea3e=VisuMZ[_0x12a266(0x380)][_0x12a266(0x1d4)](_0x1f0ca5,_0x1ead5d);if(VisuMZ[_0x12a266(0x380)]['JS'][_0x2bea3e]){const _0x350bdc=VisuMZ[_0x12a266(0x380)]['JS'][_0x2bea3e][_0x12a266(0x335)](this,this[_0x12a266(0x356)](),_0x1715bf,_0x1715bf[_0x12a266(0x277)]());_0x1715bf['setBravePoints'](_0x350bdc);}}},VisuMZ['BattleSystemBTB'][_0x169c73(0x297)]=Game_Action['prototype']['speed'],Game_Action[_0x169c73(0x208)][_0x169c73(0x213)]=function(){const _0x4e98da=_0x169c73;return BattleManager[_0x4e98da(0x22a)]()?VisuMZ['BattleSystemBTB'][_0x4e98da(0x307)][_0x4e98da(0x1f3)]['CalcActionSpeedJS']['call'](this):VisuMZ[_0x4e98da(0x380)][_0x4e98da(0x297)][_0x4e98da(0x335)](this);},VisuMZ[_0x169c73(0x380)][_0x169c73(0x224)]=Game_Action[_0x169c73(0x208)][_0x169c73(0x246)],Game_Action[_0x169c73(0x208)][_0x169c73(0x246)]=function(){const _0x324049=_0x169c73;return BattleManager[_0x324049(0x22a)]()?VisuMZ[_0x324049(0x380)][_0x324049(0x307)][_0x324049(0x1f3)][_0x324049(0x148)]:VisuMZ['BattleSystemBTB']['Game_Action_allowRandomSpeed'][_0x324049(0x335)](this);},VisuMZ[_0x169c73(0x380)][_0x169c73(0x339)]=Game_Action[_0x169c73(0x208)][_0x169c73(0x188)],Game_Action['prototype'][_0x169c73(0x188)]=function(_0x5ee65a){const _0x422569=_0x169c73;VisuMZ[_0x422569(0x380)][_0x422569(0x339)]['call'](this,_0x5ee65a),BattleManager[_0x422569(0x30c)]();},VisuMZ[_0x169c73(0x380)][_0x169c73(0x235)]=Game_Action[_0x169c73(0x208)][_0x169c73(0x357)],Game_Action['prototype']['setItem']=function(_0x93a568){const _0xd4195b=_0x169c73;VisuMZ['BattleSystemBTB'][_0xd4195b(0x235)][_0xd4195b(0x335)](this,_0x93a568),BattleManager['sortActionOrdersBTB']();},Game_Action[_0x169c73(0x208)][_0x169c73(0x1a5)]=function(_0xc36450){const _0xcfb4bf=_0x169c73;this[_0xcfb4bf(0x25d)]=_0xc36450;},Game_Action[_0x169c73(0x208)][_0x169c73(0x312)]=function(){const _0x3a8474=_0x169c73;if(this[_0x3a8474(0x25d)]===undefined)return 0x0;return this[_0x3a8474(0x25d)][_0x3a8474(0x159)]('-')['length']-0x1;},Game_Action[_0x169c73(0x208)][_0x169c73(0x29a)]=function(){const _0x5c7eff=_0x169c73;if(this[_0x5c7eff(0x25d)]===undefined)return[];return this[_0x5c7eff(0x25d)]['split']('-')[_0x5c7eff(0x18a)](_0x4535b5=>$dataSkills[Number(_0x4535b5)]);},Game_Action['prototype']['getActionFusionRecipeItems']=function(){const _0x372477=_0x169c73;if(this[_0x372477(0x25d)]===undefined)return[];return this[_0x372477(0x25d)][_0x372477(0x159)]('-')[_0x372477(0x18a)](_0x500dd6=>$dataItems[Number(_0x500dd6)]);},Game_BattlerBase['prototype'][_0x169c73(0x277)]=function(){const _0x27d90a=_0x169c73;return this[_0x27d90a(0x37e)]||0x0;},Game_BattlerBase['BTB_MAX_ACTIONS_DEFAULT']=VisuMZ[_0x169c73(0x380)][_0x169c73(0x307)][_0x169c73(0x1f3)][_0x169c73(0x331)],Game_BattlerBase[_0x169c73(0x366)]=VisuMZ[_0x169c73(0x380)][_0x169c73(0x307)][_0x169c73(0x1f3)][_0x169c73(0x2ac)],Game_BattlerBase[_0x169c73(0x208)]['maxBraveActions']=function(){const _0x157e6f=_0x169c73;if(this[_0x157e6f(0x1bd)]())return 0x1;if(this[_0x157e6f(0x346)]())return 0x1;const _0x384983=VisuMZ[_0x157e6f(0x380)][_0x157e6f(0x181)],_0x274f5a=_0x384983[_0x157e6f(0x182)];let _0x5f22df=Game_BattlerBase[_0x157e6f(0x30b)];const _0x3d6e80=this[_0x157e6f(0x2a1)]();for(const _0x4218e5 of _0x3d6e80){if(!_0x4218e5)continue;const _0x2cbd38=_0x4218e5[_0x157e6f(0x169)];_0x2cbd38['match'](_0x274f5a)&&(_0x5f22df+=Number(RegExp['$1']));}return _0x5f22df[_0x157e6f(0x290)](0x1,Game_BattlerBase['BTB_MAX_ACTIONS_HARD_CAP']);},Game_BattlerBase[_0x169c73(0x16f)]=VisuMZ[_0x169c73(0x380)][_0x169c73(0x307)]['Mechanics'][_0x169c73(0x187)],Game_BattlerBase[_0x169c73(0x1f8)]=VisuMZ['BattleSystemBTB'][_0x169c73(0x307)][_0x169c73(0x1f3)][_0x169c73(0x327)],Game_BattlerBase['BTB_MAX_BRAVEPOINTS_HARD_CAP']=VisuMZ[_0x169c73(0x380)]['Settings'][_0x169c73(0x1f3)]['MaxBravePointsHardCap'],Game_BattlerBase['BTB_MIN_BRAVEPOINTS_HARD_CAP']=VisuMZ['BattleSystemBTB']['Settings'][_0x169c73(0x1f3)][_0x169c73(0x26e)],Game_BattlerBase[_0x169c73(0x208)][_0x169c73(0x303)]=function(){const _0x356453=_0x169c73,_0x369e15=VisuMZ[_0x356453(0x380)]['RegExp'],_0x5a50a4=_0x369e15[_0x356453(0x32a)];let _0x2ae6c1=Game_BattlerBase[_0x356453(0x16f)];const _0x188a07=this['traitObjects']();for(const _0x52801c of _0x188a07){if(!_0x52801c)continue;const _0x5ca251=_0x52801c[_0x356453(0x169)];_0x5ca251['match'](_0x5a50a4)&&(_0x2ae6c1+=Number(RegExp['$1']));}return Math['min'](_0x2ae6c1,Game_BattlerBase[_0x356453(0x33f)]);},Game_BattlerBase[_0x169c73(0x208)]['minBravePoints']=function(){const _0x2931e2=_0x169c73,_0x183d73=VisuMZ[_0x2931e2(0x380)][_0x2931e2(0x181)],_0x22a8d5=_0x183d73[_0x2931e2(0x36a)];let _0x29478f=Game_BattlerBase[_0x2931e2(0x1f8)];const _0xafc537=this['traitObjects']();for(const _0x2ff141 of _0xafc537){if(!_0x2ff141)continue;const _0x37f92a=_0x2ff141[_0x2931e2(0x169)];_0x37f92a[_0x2931e2(0x186)](_0x22a8d5)&&(_0x29478f+=Number(RegExp['$1']));}return Math[_0x2931e2(0x1fd)](_0x29478f,Game_BattlerBase['BTB_MIN_BRAVEPOINTS_HARD_CAP']);},Game_BattlerBase[_0x169c73(0x208)]['setBravePoints']=function(_0x2cffd5){const _0x59c99e=_0x169c73;this[_0x59c99e(0x37e)]=Math[_0x59c99e(0x20b)](_0x2cffd5,this['maxBravePoints']()),this[_0x59c99e(0x2e6)]();},Game_BattlerBase[_0x169c73(0x208)]['gainBravePoints']=function(_0x1e38d6){const _0x48d6c1=_0x169c73;_0x1e38d6+=this[_0x48d6c1(0x37e)]||0x0,this[_0x48d6c1(0x1e4)](_0x1e38d6);},Game_BattlerBase[_0x169c73(0x208)][_0x169c73(0x1da)]=function(_0x1caae4){const _0x46347d=_0x169c73;this[_0x46347d(0x166)](-_0x1caae4);},Game_BattlerBase[_0x169c73(0x208)][_0x169c73(0x1e0)]=function(_0x2877df){const _0x534511=_0x169c73,_0x37cab8=VisuMZ['BattleSystemBTB'][_0x534511(0x307)][_0x534511(0x1f3)];if(!_0x2877df)return _0x37cab8[_0x534511(0x32f)];if(DataManager[_0x534511(0x1cd)](_0x2877df)){if(_0x2877df['id']===this['guardSkillId']())return 0x0;if(this[_0x534511(0x23d)]()&&this[_0x534511(0x23d)]()['item']()===_0x2877df&&this['currentAction']()[_0x534511(0x321)])return 0x0;}const _0x25b689=VisuMZ[_0x534511(0x380)][_0x534511(0x181)],_0x4d89d2=_0x2877df[_0x534511(0x169)];if(_0x4d89d2['match'](_0x25b689[_0x534511(0x185)]))return Number(RegExp['$1']);let _0x5de76f=0x0;if(DataManager[_0x534511(0x1cd)](_0x2877df))_0x5de76f=_0x37cab8[_0x534511(0x1cf)];else DataManager['isItem'](_0x2877df)&&(_0x5de76f=_0x37cab8[_0x534511(0x2df)]);return _0x5de76f['clamp'](0x0,Game_BattlerBase['BTB_MAX_BRAVEPOINTS_HARD_CAP']);},VisuMZ[_0x169c73(0x380)][_0x169c73(0x30a)]=Game_BattlerBase[_0x169c73(0x208)][_0x169c73(0x295)],Game_BattlerBase[_0x169c73(0x208)][_0x169c73(0x295)]=function(_0x14b323){const _0x5bfb54=_0x169c73;if(_0x14b323&&BattleManager[_0x5bfb54(0x22a)]()){const _0x589dd7=this[_0x5bfb54(0x1e0)](_0x14b323);if(this[_0x5bfb54(0x277)]()-_0x589dd7<this['minBravePoints']())return![];}return VisuMZ[_0x5bfb54(0x380)]['Game_BattlerBase_canUse']['call'](this,_0x14b323);},Game_BattlerBase['prototype'][_0x169c73(0x2d1)]=function(_0x425289){const _0x15ae92=_0x169c73;if(!BattleManager[_0x15ae92(0x22a)]())return;const _0x4c50ef=this['bravePointsCost'](_0x425289);this[_0x15ae92(0x1da)](_0x4c50ef);},VisuMZ[_0x169c73(0x380)][_0x169c73(0x319)]=Game_Battler[_0x169c73(0x208)][_0x169c73(0x2f9)],Game_Battler[_0x169c73(0x208)][_0x169c73(0x2f9)]=function(_0x44cffc){const _0x4c6fdf=_0x169c73;if(this[_0x4c6fdf(0x340)](_0x44cffc)){this['useItemBTB'](_0x44cffc);return;}VisuMZ[_0x4c6fdf(0x380)]['Game_Battler_useItem'][_0x4c6fdf(0x335)](this,_0x44cffc),this[_0x4c6fdf(0x2d1)](_0x44cffc);},Game_Battler[_0x169c73(0x208)][_0x169c73(0x340)]=function(_0xa6e37d){const _0x5a0418=_0x169c73;if(!BattleManager[_0x5a0418(0x22a)]())return![];if(!SceneManager[_0x5a0418(0x1d2)]())return![];if(!this['isActor']())return![];if(this!==BattleManager['_subject'])return![];if(!this[_0x5a0418(0x23d)]())return![];if(!this[_0x5a0418(0x23d)]()[_0x5a0418(0x358)]())return![];if(this[_0x5a0418(0x23d)]()[_0x5a0418(0x358)]()!==_0xa6e37d)return![];if(this['currentAction']()[_0x5a0418(0x1cd)]())return this['currentAction']()[_0x5a0418(0x29a)]()['length']>0x0;else return this[_0x5a0418(0x23d)]()['isItem']()?this[_0x5a0418(0x23d)]()[_0x5a0418(0x1b9)]()[_0x5a0418(0x16d)]>0x0:![];},Game_Battler[_0x169c73(0x208)][_0x169c73(0x35b)]=function(_0x396db5){const _0x4e8a99=_0x169c73;DataManager['isSkill'](_0x396db5)?this[_0x4e8a99(0x158)]():this[_0x4e8a99(0x1b7)]();},Game_Battler[_0x169c73(0x208)][_0x169c73(0x158)]=function(){const _0x3f3b8d=_0x169c73,_0x32d728=this[_0x3f3b8d(0x23d)]()['getActionFusionRecipeSkills']();if(!_0x32d728)return;for(const _0x4d5c1d of _0x32d728){if(!_0x4d5c1d)continue;if(!this[_0x3f3b8d(0x295)](_0x4d5c1d))return![];VisuMZ[_0x3f3b8d(0x380)][_0x3f3b8d(0x319)][_0x3f3b8d(0x335)](this,_0x4d5c1d),this[_0x3f3b8d(0x2d1)](_0x4d5c1d);}return!![];},Game_Battler[_0x169c73(0x208)][_0x169c73(0x1b7)]=function(){const _0x4abe96=_0x169c73,_0x2b80c0=this[_0x4abe96(0x23d)]()[_0x4abe96(0x1b9)]();if(!_0x2b80c0)return;for(const _0x3d0463 of _0x2b80c0){if(!_0x3d0463)continue;if(!this['canUse'](_0x3d0463))return![];VisuMZ[_0x4abe96(0x380)][_0x4abe96(0x319)][_0x4abe96(0x335)](this,_0x3d0463),this[_0x4abe96(0x2d1)](_0x3d0463);}return!![];},Game_BattlerBase[_0x169c73(0x208)]['predictedBravePoints']=function(){const _0xc36ec=_0x169c73,_0x474ca2=this['bravePoints']()-this['predictedBravePointCost']()+this[_0xc36ec(0x30d)]();return _0x474ca2[_0xc36ec(0x290)](Game_BattlerBase[_0xc36ec(0x2c3)],this[_0xc36ec(0x303)]());},Game_BattlerBase[_0x169c73(0x208)]['predictedBravePointCost']=function(){const _0x20f133=_0x169c73;let _0x2ec866=0x0;for(const _0x232345 of this[_0x20f133(0x37f)]){if(!_0x232345)continue;const _0x452f59=_0x232345[_0x20f133(0x358)]();_0x2ec866+=this[_0x20f133(0x1e0)](_0x452f59);}return _0x2ec866;},VisuMZ[_0x169c73(0x380)][_0x169c73(0x1bb)]=Game_BattlerBase['prototype'][_0x169c73(0x348)],Game_BattlerBase[_0x169c73(0x208)][_0x169c73(0x348)]=function(){const _0x4237cc=_0x169c73;return BattleManager['isBTB']()&&this[_0x4237cc(0x277)]()<0x0?![]:VisuMZ[_0x4237cc(0x380)]['Game_BattlerBase_canInput'][_0x4237cc(0x335)](this);},VisuMZ[_0x169c73(0x380)][_0x169c73(0x35f)]=Game_BattlerBase[_0x169c73(0x208)][_0x169c73(0x1b8)],Game_BattlerBase[_0x169c73(0x208)][_0x169c73(0x1b8)]=function(){const _0x38a991=_0x169c73;return BattleManager[_0x38a991(0x22a)]()&&this[_0x38a991(0x248)]()>0x1?![]:VisuMZ['BattleSystemBTB'][_0x38a991(0x35f)]['call'](this);},Game_BattlerBase[_0x169c73(0x208)][_0x169c73(0x1a3)]=function(){const _0x2fa684=_0x169c73;if(this['cannotBraveTrait']())return![];return this[_0x2fa684(0x248)]()<this[_0x2fa684(0x18e)]()&&this[_0x2fa684(0x37e)]>this[_0x2fa684(0x318)]();},Game_BattlerBase[_0x169c73(0x208)][_0x169c73(0x1bd)]=function(){const _0x100865=_0x169c73,_0x26232c=VisuMZ['BattleSystemBTB'][_0x100865(0x181)],_0x49f4e7=_0x26232c['CannotBrave'];return this[_0x100865(0x2a1)]()[_0x100865(0x19c)](_0x4982d6=>_0x4982d6&&_0x4982d6[_0x100865(0x169)][_0x100865(0x186)](_0x49f4e7));},Game_BattlerBase['prototype'][_0x169c73(0x346)]=function(){const _0x5b0556=_0x169c73,_0x4a28bd=VisuMZ['BattleSystemBTB'][_0x5b0556(0x181)],_0x185604=_0x4a28bd[_0x5b0556(0x141)];return this[_0x5b0556(0x2a1)]()[_0x5b0556(0x19c)](_0x6ae05f=>_0x6ae05f&&_0x6ae05f[_0x5b0556(0x169)][_0x5b0556(0x186)](_0x185604));},Game_BattlerBase[_0x169c73(0x208)][_0x169c73(0x1f4)]=function(){const _0x38c304=_0x169c73;delete this[_0x38c304(0x37c)],delete this[_0x38c304(0x1de)],delete this[_0x38c304(0x264)],delete this[_0x38c304(0x1ad)];},Game_BattlerBase[_0x169c73(0x208)]['TurnOrderBTBGraphicType']=function(){const _0x581a51=_0x169c73;return this[_0x581a51(0x37c)]===undefined&&(this['_btbTurnOrderGraphicType']=this[_0x581a51(0x1ef)]()),this[_0x581a51(0x37c)];},Game_BattlerBase[_0x169c73(0x208)][_0x169c73(0x1ef)]=function(){return Window_BTB_TurnOrder['Settings']['EnemyBattlerType'];},Game_BattlerBase[_0x169c73(0x208)][_0x169c73(0x16e)]=function(){const _0x60a772=_0x169c73;return this['_btbTurnOrderFaceName']===undefined&&(this[_0x60a772(0x1de)]=this[_0x60a772(0x274)]()),this[_0x60a772(0x1de)];},Game_BattlerBase[_0x169c73(0x208)][_0x169c73(0x274)]=function(){const _0x5bfdf9=_0x169c73;return Window_BTB_TurnOrder[_0x5bfdf9(0x307)][_0x5bfdf9(0x34e)];},Game_BattlerBase[_0x169c73(0x208)]['TurnOrderBTBGraphicFaceIndex']=function(){const _0x6fadfa=_0x169c73;return this[_0x6fadfa(0x264)]===undefined&&(this[_0x6fadfa(0x264)]=this[_0x6fadfa(0x325)]()),this[_0x6fadfa(0x264)];},Game_BattlerBase[_0x169c73(0x208)]['createTurnOrderBTBGraphicFaceIndex']=function(){const _0x59b894=_0x169c73;return Window_BTB_TurnOrder['Settings'][_0x59b894(0x256)];},Game_BattlerBase[_0x169c73(0x208)][_0x169c73(0x145)]=function(){const _0x407d27=_0x169c73;return this['_btbTurnOrderIconIndex']===undefined&&(this[_0x407d27(0x1ad)]=this[_0x407d27(0x30f)]()),this['_btbTurnOrderIconIndex'];},Game_BattlerBase[_0x169c73(0x208)][_0x169c73(0x30f)]=function(){const _0x499a91=_0x169c73;return Window_BTB_TurnOrder[_0x499a91(0x307)][_0x499a91(0x2b4)];},Game_BattlerBase[_0x169c73(0x208)][_0x169c73(0x27a)]=function(_0x43fccb){const _0x4a65ce=_0x169c73;this[_0x4a65ce(0x1ad)]=_0x43fccb;},VisuMZ[_0x169c73(0x380)][_0x169c73(0x2bc)]=Game_BattlerBase[_0x169c73(0x208)][_0x169c73(0x337)],Game_BattlerBase['prototype'][_0x169c73(0x337)]=function(){const _0x501987=_0x169c73;VisuMZ['BattleSystemBTB']['Game_BattlerBase_hide'][_0x501987(0x335)](this),BattleManager['removeActionBattlersBTB']();},VisuMZ[_0x169c73(0x380)][_0x169c73(0x257)]=Game_BattlerBase[_0x169c73(0x208)]['appear'],Game_BattlerBase[_0x169c73(0x208)][_0x169c73(0x306)]=function(){const _0x2d8b57=_0x169c73;VisuMZ[_0x2d8b57(0x380)][_0x2d8b57(0x257)][_0x2d8b57(0x335)](this),BattleManager[_0x2d8b57(0x229)]();},VisuMZ[_0x169c73(0x380)]['Game_Battler_performCollapse']=Game_Battler[_0x169c73(0x208)][_0x169c73(0x24c)],Game_Battler[_0x169c73(0x208)]['performCollapse']=function(){const _0x1ba9b4=_0x169c73;VisuMZ[_0x1ba9b4(0x380)][_0x1ba9b4(0x2b0)][_0x1ba9b4(0x335)](this),BattleManager[_0x1ba9b4(0x229)]();},VisuMZ['BattleSystemBTB'][_0x169c73(0x1a6)]=Game_Battler[_0x169c73(0x208)][_0x169c73(0x267)],Game_Battler[_0x169c73(0x208)]['makeActionTimes']=function(){const _0x3b1592=_0x169c73;return BattleManager[_0x3b1592(0x22a)]()?0x1:VisuMZ[_0x3b1592(0x380)][_0x3b1592(0x1a6)][_0x3b1592(0x335)](this);},VisuMZ[_0x169c73(0x380)]['Game_Battler_onBattleStart']=Game_Battler['prototype'][_0x169c73(0x304)],Game_Battler[_0x169c73(0x208)][_0x169c73(0x304)]=function(_0xdddcbf){const _0x12ff6b=_0x169c73;VisuMZ[_0x12ff6b(0x380)]['Game_Battler_onBattleStart'][_0x12ff6b(0x335)](this,_0xdddcbf),this['onBattleStartBTB'](_0xdddcbf);},Game_Battler['prototype']['onBattleStartBTB']=function(_0x3e8d3b){const _0x1da2c7=_0x169c73;if(!BattleManager['isBTB']())return;const _0x12b37f=VisuMZ[_0x1da2c7(0x380)][_0x1da2c7(0x307)]['Mechanics'],_0x4e29b1=VisuMZ[_0x1da2c7(0x380)]['RegExp'];let _0x4cc79c=_0x3e8d3b?_0x12b37f[_0x1da2c7(0x381)]:_0x12b37f[_0x1da2c7(0x323)];const _0x3b32eb=this[_0x1da2c7(0x2a1)]();for(const _0x46c335 of _0x3b32eb){if(!_0x46c335)continue;const _0x4c9cc8=_0x46c335['note'];_0x4c9cc8['match'](_0x4e29b1[_0x1da2c7(0x1a1)])&&(_0x4cc79c+=Number(RegExp['$1']));}this[_0x1da2c7(0x1e4)](_0x4cc79c);},Game_Battler['prototype']['performBrave']=function(){const _0x21d6cb=_0x169c73;this['_actions']['push'](new Game_Action(this));const _0x4c31bf=VisuMZ[_0x21d6cb(0x380)][_0x21d6cb(0x307)][_0x21d6cb(0x222)];if(_0x4c31bf[_0x21d6cb(0x272)]){const _0x3969d4='Brave',_0x5646e6=_0x4c31bf[_0x21d6cb(0x2c7)[_0x21d6cb(0x175)](_0x3969d4)],_0x2801b0=_0x4c31bf[_0x21d6cb(0x1c3)[_0x21d6cb(0x175)](_0x3969d4)],_0x3e1728=_0x4c31bf[_0x21d6cb(0x2fd)['format'](_0x3969d4)];$gameTemp['requestFauxAnimation']([this],_0x5646e6,_0x2801b0,_0x3e1728);}},Game_Battler[_0x169c73(0x208)]['cancelBrave']=function(){const _0x317ce8=_0x169c73;if(this[_0x317ce8(0x37f)][_0x317ce8(0x16d)]<=0x1)return;this[_0x317ce8(0x37f)]['pop']();const _0x56f940=VisuMZ[_0x317ce8(0x380)]['Settings'][_0x317ce8(0x222)];if(_0x56f940[_0x317ce8(0x26b)]){const _0x421f9f=_0x317ce8(0x367),_0x4e71a8=_0x56f940['%1AnimationID'[_0x317ce8(0x175)](_0x421f9f)],_0x27e91f=_0x56f940[_0x317ce8(0x1c3)['format'](_0x421f9f)],_0x41201c=_0x56f940['%1Mute'[_0x317ce8(0x175)](_0x421f9f)];$gameTemp[_0x317ce8(0x2fa)]([this],_0x4e71a8,_0x27e91f,_0x41201c);}},VisuMZ['BattleSystemBTB'][_0x169c73(0x236)]=Game_Battler[_0x169c73(0x208)][_0x169c73(0x167)],Game_Battler[_0x169c73(0x208)][_0x169c73(0x167)]=function(){const _0xec6ecc=_0x169c73;VisuMZ[_0xec6ecc(0x380)][_0xec6ecc(0x236)][_0xec6ecc(0x335)](this),this[_0xec6ecc(0x362)]();},Game_Battler['prototype'][_0x169c73(0x362)]=function(){const _0xe82539=_0x169c73;if(!BattleManager[_0xe82539(0x22a)]())return;this['regenerateBravePoints']();},Game_Battler[_0x169c73(0x208)]['regenerateBravePoints']=function(){const _0x3a1058=_0x169c73,_0x15096f=VisuMZ[_0x3a1058(0x380)][_0x3a1058(0x307)][_0x3a1058(0x1f3)],_0x1dcbd9=_0x15096f['BravePointsRegenAlive'];if(_0x1dcbd9&&!this[_0x3a1058(0x142)]())return;const _0x28d98d=this['calcRegenBravePoints']();this['gainBravePoints'](_0x28d98d);},Game_Battler['prototype'][_0x169c73(0x30d)]=function(){const _0x4b71ee=_0x169c73,_0x5c96a4=VisuMZ[_0x4b71ee(0x380)]['RegExp'],_0x197b1b=VisuMZ[_0x4b71ee(0x380)][_0x4b71ee(0x307)]['Mechanics'];let _0xb9043e=_0x197b1b[_0x4b71ee(0x1d8)]||0x0;const _0x568984=this[_0x4b71ee(0x2a1)]();for(const _0x2cf098 of _0x568984){if(!_0x2cf098)continue;const _0x56786b=_0x2cf098[_0x4b71ee(0x169)];_0x56786b['match'](_0x5c96a4['BravePointRegen'])&&(_0xb9043e+=Number(RegExp['$1']));}return _0xb9043e;},Game_Battler[_0x169c73(0x208)][_0x169c73(0x2c4)]=function(){const _0x3edbc6=_0x169c73;if(!this[_0x3edbc6(0x324)]())return;if(this['numActions']()<=0x1)return;if(!this[_0x3edbc6(0x23d)]())return;if(!this[_0x3edbc6(0x23d)]()[_0x3edbc6(0x358)]())return;const _0x235c94=this[_0x3edbc6(0x1e6)]();if(_0x235c94[_0x3edbc6(0x16d)]<=0x0)return;let _0x18a13d='',_0x1ed674=0x0;const _0x11df77=this[_0x3edbc6(0x23d)]()[_0x3edbc6(0x1cd)](),_0xcec0d8=_0x11df77?DataManager['_btbSkillFlexFusion']:DataManager[_0x3edbc6(0x1b0)],_0x163337=_0x11df77?DataManager[_0x3edbc6(0x2aa)]:DataManager[_0x3edbc6(0x258)];for(const _0x38a2a4 of _0x235c94){if(!_0x38a2a4)continue;_0xcec0d8[_0x38a2a4]&&_0xcec0d8[_0x38a2a4]>=_0x1ed674&&(this[_0x3edbc6(0x2b9)](_0x38a2a4)&&(_0x18a13d=_0x38a2a4,_0x1ed674=_0xcec0d8[_0x38a2a4])),_0x163337[_0x38a2a4]&&_0x163337[_0x38a2a4]>=_0x1ed674&&(this[_0x3edbc6(0x2b9)](_0x38a2a4)&&(_0x18a13d=_0x38a2a4,_0x1ed674=_0xcec0d8[_0x38a2a4]));}if(_0x1ed674<=0x0)return;this[_0x3edbc6(0x1e3)](_0x18a13d),this[_0x3edbc6(0x23d)]()[_0x3edbc6(0x1a5)](_0x18a13d),_0x11df77?this['currentAction']()[_0x3edbc6(0x188)](_0x1ed674):this['currentAction']()['setItem'](_0x1ed674);},Game_Battler[_0x169c73(0x208)]['canProcessActionFusionsBTB']=function(){const _0x37b560=_0x169c73;if(this[_0x37b560(0x18f)]())return![];const _0x457659=VisuMZ['BattleSystemBTB'][_0x37b560(0x307)][_0x37b560(0x1f3)];if(this[_0x37b560(0x32c)]()){if(_0x457659['ActorActionFusions']===undefined)return!![];return _0x457659[_0x37b560(0x2a7)];}else{if(_0x457659[_0x37b560(0x223)]===undefined)return!![];return _0x457659[_0x37b560(0x223)];}},Game_BattlerBase['prototype'][_0x169c73(0x18f)]=function(){const _0x4affa7=_0x169c73,_0x1e0c33=VisuMZ[_0x4affa7(0x380)][_0x4affa7(0x181)],_0x4504a2=this[_0x4affa7(0x2a1)]();for(const _0x594b43 of _0x4504a2){if(!_0x594b43)continue;const _0x204707=_0x594b43[_0x4affa7(0x169)];if(_0x204707[_0x4affa7(0x186)](_0x1e0c33['CannotFusion']))return!![];if(_0x204707[_0x4affa7(0x186)](_0x1e0c33[_0x4affa7(0x251)]))return![];}return![];},Game_Battler['prototype'][_0x169c73(0x1e6)]=function(){const _0x21d690=_0x169c73,_0x59e8fd=this[_0x21d690(0x23d)](),_0x1ac13d=this[_0x21d690(0x37f)],_0x1f37b2=_0x1ac13d[_0x21d690(0x271)](_0x2337c9=>this['canActionFusionWithBTB'](_0x59e8fd,_0x2337c9)),_0x31cda7=_0x1f37b2['map'](_0x2bf6f1=>_0x2bf6f1[_0x21d690(0x358)]()['id']),_0x1d4d3b=VisuMZ[_0x21d690(0x380)][_0x21d690(0x369)](_0x59e8fd[_0x21d690(0x358)]()['id'],_0x31cda7);let _0x2ce8a8=String(_0x59e8fd[_0x21d690(0x358)]()['id']);for(let _0x283620=0x1;_0x283620<_0x1ac13d['length'];_0x283620++){const _0x11e915=_0x1ac13d[_0x283620];if(this[_0x21d690(0x1b4)](_0x59e8fd,_0x11e915))_0x2ce8a8=_0x21d690(0x31d)[_0x21d690(0x175)](_0x2ce8a8,_0x11e915['item']()['id']),_0x1d4d3b['push'](_0x2ce8a8);else break;}return _0x1d4d3b[_0x21d690(0x271)]((_0x2adda7,_0x2296e6,_0x146efe)=>_0x146efe['indexOf'](_0x2adda7)===_0x2296e6);},VisuMZ[_0x169c73(0x380)][_0x169c73(0x369)]=function(_0x25493c,_0x3636b5){const _0x62dc73=[],_0x15bde7=function(_0x49f971,_0x4868a6){const _0x16828e=_0x2b58;for(var _0x4d794f=0x0;_0x4d794f<_0x4868a6[_0x16828e(0x16d)];_0x4d794f++){_0x62dc73[_0x16828e(0x20e)](_0x49f971+'-'+_0x4868a6[_0x4d794f]),_0x15bde7(_0x49f971+'-'+_0x4868a6[_0x4d794f],_0x4868a6['slice'](_0x4d794f+0x1));}};return _0x15bde7(_0x25493c,_0x3636b5),_0x62dc73;},Game_Battler[_0x169c73(0x208)]['canActionFusionWithBTB']=function(_0x4e01b8,_0x517281){const _0x35501e=_0x169c73;if(!_0x4e01b8||!_0x517281)return![];if(_0x4e01b8===_0x517281)return![];if(!_0x4e01b8['item']()||!_0x517281[_0x35501e(0x358)]())return![];if(_0x4e01b8[_0x35501e(0x1cd)]()!==_0x517281[_0x35501e(0x1cd)]())return![];return!![];},Game_Battler['prototype'][_0x169c73(0x2b9)]=function(_0x766ae0){const _0x56d7fc=_0x169c73,_0xc5dbd4=this['currentAction']()['isSkill'](),_0x316a60=JsonEx[_0x56d7fc(0x2d7)](this);_0x316a60[_0x56d7fc(0x1f6)]=!![],_0x316a60[_0x56d7fc(0x23d)]()[_0x56d7fc(0x1a5)](_0x766ae0);if(_0xc5dbd4)return _0x316a60['btbPaySkillFusionCosts']();else{const _0x1fa060=JsonEx[_0x56d7fc(0x2d7)]($gameParty[_0x56d7fc(0x386)]),_0x1a406d=JsonEx[_0x56d7fc(0x2d7)]($gameParty['_weapons']),_0xf20ff0=JsonEx['makeDeepCopy']($gameParty[_0x56d7fc(0x377)]);let _0x78c3f1=_0x316a60['btbPayItemFusionCosts']();return $gameParty[_0x56d7fc(0x386)]=_0x1fa060,$gameParty['_weapons']=_0x1a406d,$gameParty[_0x56d7fc(0x377)]=_0xf20ff0,_0x78c3f1;}},Game_Battler[_0x169c73(0x208)][_0x169c73(0x1e3)]=function(_0x42e5bb){const _0x5c6bcf=_0x169c73,_0x5e8f89=this[_0x5c6bcf(0x23d)](),_0x4c6248=_0x42e5bb[_0x5c6bcf(0x159)]('-')[_0x5c6bcf(0x18a)](_0x11c25a=>Number(_0x11c25a));_0x4c6248[_0x5c6bcf(0x1c8)]();const _0x114330=this[_0x5c6bcf(0x37f)],_0x5b7da8=[];for(const _0x14ea80 of _0x114330){this['canActionFusionWithBTB'](_0x5e8f89,_0x14ea80)&&(_0x4c6248[_0x5c6bcf(0x1a4)](_0x14ea80[_0x5c6bcf(0x358)]()['id'])&&(_0x5b7da8['push'](_0x14ea80),_0x4c6248[_0x5c6bcf(0x174)](_0x4c6248[_0x5c6bcf(0x302)](_0x14ea80['item']()['id']),0x1)));}for(const _0x33ed1e of _0x5b7da8){_0x114330[_0x5c6bcf(0x17f)](_0x33ed1e);}},Game_Actor['prototype'][_0x169c73(0x1e4)]=function(_0x2d9032){const _0x3acd99=_0x169c73;Game_Battler[_0x3acd99(0x208)][_0x3acd99(0x1e4)][_0x3acd99(0x335)](this,_0x2d9032);if(!SceneManager[_0x3acd99(0x1d2)]())return;if(!BattleManager[_0x3acd99(0x2d2)]()[_0x3acd99(0x1a4)](this))return;BattleManager['refreshStatusBTB']();},VisuMZ[_0x169c73(0x380)][_0x169c73(0x37d)]=Game_Actor[_0x169c73(0x208)]['makeActions'],Game_Actor[_0x169c73(0x208)][_0x169c73(0x204)]=function(){const _0x4984b0=_0x169c73;VisuMZ[_0x4984b0(0x380)][_0x4984b0(0x37d)][_0x4984b0(0x335)](this),BattleManager[_0x4984b0(0x22a)]()&&this[_0x4984b0(0x277)]()<0x0&&this['clearActions']();},Game_Actor[_0x169c73(0x208)][_0x169c73(0x1ef)]=function(){const _0x14fe5e=_0x169c73,_0x4131d8=this[_0x14fe5e(0x330)]()[_0x14fe5e(0x169)];if(_0x4131d8[_0x14fe5e(0x186)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x4131d8[_0x14fe5e(0x186)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0x14fe5e(0x2c6);}return Window_BTB_TurnOrder['Settings'][_0x14fe5e(0x30e)];},Game_Actor[_0x169c73(0x208)][_0x169c73(0x16e)]=function(){const _0x4c5443=_0x169c73,_0x371769=this[_0x4c5443(0x330)]()[_0x4c5443(0x169)];if(_0x371769[_0x4c5443(0x186)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x4c5443(0x172)]();},Game_Actor[_0x169c73(0x208)][_0x169c73(0x1d1)]=function(){const _0x110868=_0x169c73,_0x2bdfb5=this[_0x110868(0x330)]()[_0x110868(0x169)];if(_0x2bdfb5['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x110868(0x2d0)]();},Game_Actor['prototype']['createTurnOrderBTBGraphicIconIndex']=function(){const _0x9551d9=_0x169c73,_0x18599a=this['actor']()[_0x9551d9(0x169)];if(_0x18599a[_0x9551d9(0x186)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_BTB_TurnOrder['Settings'][_0x9551d9(0x14a)];},Game_Actor[_0x169c73(0x208)][_0x169c73(0x1b4)]=function(_0x299850,_0x1883bf){const _0x1f6046=_0x169c73;if(!Game_Battler[_0x1f6046(0x208)][_0x1f6046(0x1b4)][_0x1f6046(0x335)](this,_0x299850,_0x1883bf))return![];if(_0x299850[_0x1f6046(0x2ba)]()&&_0x1883bf[_0x1f6046(0x2ba)]()){if(_0x299850['isForFriend']()!==_0x1883bf[_0x1f6046(0x308)]())return![];if(_0x299850[_0x1f6046(0x387)]!==_0x1883bf['_targetIndex'])return![];}return!![];},Game_Enemy[_0x169c73(0x208)]['createTurnOrderBTBGraphicType']=function(){const _0x14a20d=_0x169c73,_0x490dc3=this['enemy']()[_0x14a20d(0x169)];if(_0x490dc3[_0x14a20d(0x186)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x14a20d(0x2b7);else{if(_0x490dc3[_0x14a20d(0x186)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0x14a20d(0x2c6);}return Window_BTB_TurnOrder[_0x14a20d(0x307)][_0x14a20d(0x34a)];},Game_Enemy[_0x169c73(0x208)][_0x169c73(0x274)]=function(){const _0x5e4431=_0x169c73,_0x2f4589=this['enemy']()[_0x5e4431(0x169)];if(_0x2f4589['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_BTB_TurnOrder['Settings']['EnemyBattlerFaceName'];},Game_Enemy[_0x169c73(0x208)][_0x169c73(0x325)]=function(){const _0x330ed3=_0x169c73,_0x36de13=this[_0x330ed3(0x28c)]()[_0x330ed3(0x169)];if(_0x36de13[_0x330ed3(0x186)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_BTB_TurnOrder['Settings'][_0x330ed3(0x256)];},Game_Enemy[_0x169c73(0x208)][_0x169c73(0x30f)]=function(){const _0x442179=_0x169c73,_0x27f54b=this['enemy']()[_0x442179(0x169)];if(_0x27f54b[_0x442179(0x186)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_BTB_TurnOrder[_0x442179(0x307)]['EnemyBattlerIcon'];},VisuMZ[_0x169c73(0x380)][_0x169c73(0x190)]=Game_Enemy[_0x169c73(0x208)][_0x169c73(0x204)],Game_Enemy[_0x169c73(0x208)][_0x169c73(0x204)]=function(){const _0x6bdb8a=_0x169c73;VisuMZ[_0x6bdb8a(0x380)]['Game_Enemy_makeActions'][_0x6bdb8a(0x335)](this),this['checkActionsBTB'](),this[_0x6bdb8a(0x17b)]();},Game_Enemy[_0x169c73(0x208)][_0x169c73(0x165)]=function(){const _0x232ec6=_0x169c73;if(!BattleManager[_0x232ec6(0x22a)]())return;if(this[_0x232ec6(0x248)]()<=0x0)return;this[_0x232ec6(0x33a)]=![],this[_0x232ec6(0x277)]()<0x0&&this[_0x232ec6(0x1a9)]();},Game_Enemy[_0x169c73(0x208)][_0x169c73(0x17b)]=function(){const _0x14d6d1=_0x169c73;if(!BattleManager[_0x14d6d1(0x22a)]())return;if(this[_0x14d6d1(0x248)]()<=0x0)return;const _0x587dcf=this[_0x14d6d1(0x37f)][0x0];if(!_0x587dcf)return;const _0x2f322b=_0x587dcf[_0x14d6d1(0x358)]();if(!_0x2f322b)return;const _0x20f2d0=VisuMZ['BattleSystemBTB'][_0x14d6d1(0x181)],_0x464c0e=_0x2f322b[_0x14d6d1(0x169)];let _0x1c0b54=[];if(_0x464c0e[_0x14d6d1(0x186)](_0x20f2d0[_0x14d6d1(0x176)])){const _0x1f0171=String(RegExp['$1'])['split'](',');for(let _0x5ac3af of _0x1f0171){_0x5ac3af=(String(_0x5ac3af)||'')[_0x14d6d1(0x1c2)]();const _0x7822bf=/^\d+$/[_0x14d6d1(0x196)](_0x5ac3af);_0x7822bf?_0x1c0b54[_0x14d6d1(0x20e)](Number(_0x5ac3af)):_0x1c0b54[_0x14d6d1(0x20e)](DataManager[_0x14d6d1(0x14d)](_0x5ac3af));}}if(_0x1c0b54['length']<=0x0)return;while(_0x1c0b54[_0x14d6d1(0x16d)]>this[_0x14d6d1(0x18e)]()){_0x1c0b54[_0x14d6d1(0x2b3)]();}if(_0x1c0b54[_0x14d6d1(0x16d)]<=0x0)return;this['clearActions']();for(const _0xf00106 of _0x1c0b54){const _0x1b8a74=new Game_Action(this);_0x1b8a74[_0x14d6d1(0x188)](_0xf00106),_0x1b8a74[_0x14d6d1(0x20c)]=!![],this[_0x14d6d1(0x37f)][_0x14d6d1(0x20e)](_0x1b8a74);}},Game_Enemy[_0x169c73(0x208)]['braveAnimationTimes']=function(){const _0x1a2d93=_0x169c73;let _0x11f842=this['numActions']();for(const _0x2f2f0d of this['_actions']){if(!_0x2f2f0d)continue;_0x11f842+=_0x2f2f0d[_0x1a2d93(0x312)]();}return _0x11f842-0x1;},VisuMZ[_0x169c73(0x380)][_0x169c73(0x2d6)]=Game_Unit[_0x169c73(0x208)][_0x169c73(0x204)],Game_Unit[_0x169c73(0x208)][_0x169c73(0x204)]=function(){const _0x3b1abc=_0x169c73;VisuMZ['BattleSystemBTB'][_0x3b1abc(0x2d6)][_0x3b1abc(0x335)](this),BattleManager[_0x3b1abc(0x22a)]()&&this===$gameTroop&&SceneManager['isSceneBattle']()&&BattleManager['makeActionOrders']();},VisuMZ['BattleSystemBTB']['Scene_Battle_onDisabledPartyCommandSelection']=Scene_Battle[_0x169c73(0x208)][_0x169c73(0x184)],Scene_Battle[_0x169c73(0x208)][_0x169c73(0x184)]=function(){const _0x114fde=_0x169c73;BattleManager[_0x114fde(0x22a)]()?this[_0x114fde(0x24e)]():VisuMZ[_0x114fde(0x380)]['Scene_Battle_onDisabledPartyCommandSelection'][_0x114fde(0x335)](this);},VisuMZ[_0x169c73(0x380)]['Scene_Battle_createActorCommandWindow']=Scene_Battle[_0x169c73(0x208)][_0x169c73(0x18c)],Scene_Battle['prototype'][_0x169c73(0x18c)]=function(){const _0xb71704=_0x169c73;VisuMZ['BattleSystemBTB'][_0xb71704(0x19f)]['call'](this),this[_0xb71704(0x218)]();},Scene_Battle['prototype']['createActorCommandWindowBTB']=function(){const _0x4549db=_0x169c73;if(!BattleManager[_0x4549db(0x22a)]())return;const _0x3a1dd8=this[_0x4549db(0x2d5)];if(!_0x3a1dd8)return;_0x3a1dd8[_0x4549db(0x266)]('brave',this[_0x4549db(0x243)]['bind'](this)),_0x3a1dd8['setHandler'](_0x4549db(0x149),this[_0x4549db(0x2ef)][_0x4549db(0x1e8)](this));},Scene_Battle[_0x169c73(0x208)]['commandBrave']=function(){this['performBrave']();},Scene_Battle[_0x169c73(0x208)][_0x169c73(0x2ef)]=function(){const _0x73dcb3=_0x169c73,_0x5372d0=BattleManager['actor']();if(!_0x5372d0)this[_0x73dcb3(0x26f)]();else{if(_0x5372d0[_0x73dcb3(0x248)]()<=0x1)this[_0x73dcb3(0x26f)]();else _0x5372d0['_actionInputIndex']>0x0?this[_0x73dcb3(0x26f)]():this[_0x73dcb3(0x21c)]();}},Scene_Battle[_0x169c73(0x208)][_0x169c73(0x385)]=function(){const _0x419e94=_0x169c73,_0xaedb06=BattleManager[_0x419e94(0x330)]();if(!_0xaedb06)return;_0xaedb06[_0x419e94(0x385)]();const _0x8655ac=this[_0x419e94(0x2d5)][_0x419e94(0x15f)],_0x3ba3e8=this[_0x419e94(0x2d5)][_0x419e94(0x1c1)],_0x5513c3=this[_0x419e94(0x2d5)][_0x419e94(0x1db)]();this['_actorCommandWindow'][_0x419e94(0x287)](_0xaedb06),this[_0x419e94(0x2d5)][_0x419e94(0x19a)](_0x5513c3),this['_actorCommandWindow'][_0x419e94(0x15f)]=_0x8655ac,this[_0x419e94(0x2d5)][_0x419e94(0x1c1)]=_0x3ba3e8;},Scene_Battle[_0x169c73(0x208)][_0x169c73(0x21c)]=function(){const _0xddcd0=_0x169c73,_0x5c73c7=BattleManager[_0xddcd0(0x330)]();if(!_0x5c73c7)return;_0x5c73c7[_0xddcd0(0x217)]();const _0x2c4f8c=this[_0xddcd0(0x2d5)][_0xddcd0(0x15f)],_0x5d6455=this[_0xddcd0(0x2d5)][_0xddcd0(0x1c1)],_0x5f35e1=this[_0xddcd0(0x2d5)][_0xddcd0(0x1db)]();this[_0xddcd0(0x2d5)]['setup'](_0x5c73c7),this[_0xddcd0(0x2d5)][_0xddcd0(0x19a)](_0x5f35e1),this[_0xddcd0(0x2d5)][_0xddcd0(0x15f)]=_0x2c4f8c,this[_0xddcd0(0x2d5)][_0xddcd0(0x1c1)]=_0x5d6455;},VisuMZ[_0x169c73(0x380)][_0x169c73(0x18d)]=Scene_Battle['prototype'][_0x169c73(0x332)],Scene_Battle[_0x169c73(0x208)][_0x169c73(0x332)]=function(){const _0x2220ca=_0x169c73;VisuMZ[_0x2220ca(0x380)][_0x2220ca(0x18d)]['call'](this),this[_0x2220ca(0x276)]();},Scene_Battle[_0x169c73(0x208)][_0x169c73(0x276)]=function(){const _0x59fe9e=_0x169c73;if(!BattleManager[_0x59fe9e(0x22a)]())return;this['_btbTurnOrderWindow']=new Window_BTB_TurnOrder();const _0x3aed2c=this[_0x59fe9e(0x179)](this['_windowLayer']);this[_0x59fe9e(0x1e9)](this[_0x59fe9e(0x33b)],_0x3aed2c),this['repositionLogWindowBTB'](),BattleManager[_0x59fe9e(0x140)](!![]);},Scene_Battle['prototype'][_0x169c73(0x13f)]=function(){const _0x1b9f90=_0x169c73,_0x17308a=Window_BTB_TurnOrder[_0x1b9f90(0x307)];if(_0x17308a[_0x1b9f90(0x35e)]!==_0x1b9f90(0x315))return;if(!_0x17308a[_0x1b9f90(0x225)])return;if(!this[_0x1b9f90(0x231)])return;const _0x2d1f58=this[_0x1b9f90(0x33b)]['y']-Math[_0x1b9f90(0x283)]((Graphics[_0x1b9f90(0x244)]-Graphics['boxHeight'])/0x2),_0x30d984=_0x2d1f58+this['_btbTurnOrderWindow'][_0x1b9f90(0x244)];this[_0x1b9f90(0x231)]['y']=_0x30d984+_0x17308a[_0x1b9f90(0x354)];};function Sprite_BTB_TurnOrder_Battler(){const _0x40a81e=_0x169c73;this[_0x40a81e(0x27d)](...arguments);}Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)]=Object[_0x169c73(0x372)](Sprite_Clickable['prototype']),Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x320)]=Sprite_BTB_TurnOrder_Battler,Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x27d)]=function(_0x23bb07,_0x444478){const _0x37e892=_0x169c73;this[_0x37e892(0x2fe)](_0x23bb07,_0x444478),Sprite_Clickable[_0x37e892(0x208)][_0x37e892(0x27d)]['call'](this),this['opacity']=0x0,this['createChildren'](),this[_0x37e892(0x2c1)]();},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)]['initMembers']=function(_0x53fc84,_0x1c538e){const _0x2a6587=_0x169c73;this['_unit']=_0x53fc84,this[_0x2a6587(0x2f8)]=_0x1c538e;const _0x308b2a=Window_BTB_TurnOrder[_0x2a6587(0x307)],_0x4d8724=this['isHorz'](),_0x55c650=this[_0x2a6587(0x384)]();this[_0x2a6587(0x1d7)]=0x0,this[_0x2a6587(0x31b)]=_0x4d8724?_0x308b2a[_0x2a6587(0x278)]*_0x55c650:0x0,this[_0x2a6587(0x1a0)]=_0x4d8724?0x0:_0x308b2a['SpriteThin']*_0x55c650,this[_0x2a6587(0x37a)]=0x0,this[_0x2a6587(0x155)]=0xff,this['_isAlive']=![],this[_0x2a6587(0x282)]=![],this['_containerWidth']=0x0,this[_0x2a6587(0x313)]=0x0;},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x1c4)]=function(){const _0x601201=_0x169c73;this[_0x601201(0x171)](),this[_0x601201(0x2ea)](),this[_0x601201(0x2cc)](),this[_0x601201(0x22f)](),this['createLetterSprite']();},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x171)]=function(){const _0x622c86=_0x169c73;this['x']=this[_0x622c86(0x31b)],this['y']=this['_positionTargetY'];},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)]['isHorz']=function(){const _0x4bfb81=_0x169c73,_0x40650e=Window_BTB_TurnOrder[_0x4bfb81(0x307)],_0x442576=['top',_0x4bfb81(0x289)]['includes'](_0x40650e[_0x4bfb81(0x35e)]);return _0x442576;},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x383)]=function(){const _0x3cd268=_0x169c73,_0x4608d5=Window_BTB_TurnOrder[_0x3cd268(0x307)];return this[_0x3cd268(0x1ab)]()?_0x4608d5[_0x3cd268(0x278)]:_0x4608d5[_0x3cd268(0x219)];},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x329)]=function(){const _0x5c084d=_0x169c73,_0x5ad688=Window_BTB_TurnOrder[_0x5c084d(0x307)];return this[_0x5c084d(0x1ab)]()?_0x5ad688[_0x5c084d(0x219)]:_0x5ad688[_0x5c084d(0x278)];},Sprite_BTB_TurnOrder_Battler['prototype'][_0x169c73(0x2a4)]=function(){const _0x40aaa4=_0x169c73;this[_0x40aaa4(0x15b)]=new Bitmap(0x48,0x24);const _0x1a6ea3=this[_0x40aaa4(0x33e)]()?this[_0x40aaa4(0x33e)]()['name']():'%1\x20%2\x20%3'[_0x40aaa4(0x175)](this[_0x40aaa4(0x2dd)],this[_0x40aaa4(0x2f8)]);this[_0x40aaa4(0x15b)]['drawText'](_0x1a6ea3,0x0,0x0,0x48,0x24,'center');},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x2ea)]=function(){const _0x22d07a=_0x169c73;if(!Window_BTB_TurnOrder[_0x22d07a(0x307)][_0x22d07a(0x2d8)])return;const _0x560a3e=Window_BTB_TurnOrder[_0x22d07a(0x307)],_0x3d53cb=this[_0x22d07a(0x2dd)]===$gameParty?_0x22d07a(0x1ff):'Enemy',_0x3b5bc2=_0x22d07a(0x19e)[_0x22d07a(0x175)](_0x3d53cb),_0x4f0d88=new Sprite();_0x4f0d88['anchor']['x']=this[_0x22d07a(0x31c)]['x'],_0x4f0d88[_0x22d07a(0x31c)]['y']=this[_0x22d07a(0x31c)]['y'];if(_0x560a3e[_0x3b5bc2])_0x4f0d88['bitmap']=ImageManager['loadSystem'](_0x560a3e[_0x3b5bc2]);else{const _0x332b2d=this[_0x22d07a(0x383)](),_0x2fa562=this[_0x22d07a(0x329)]();_0x4f0d88['bitmap']=new Bitmap(_0x332b2d,_0x2fa562);const _0x1dacbb=ColorManager[_0x22d07a(0x374)](_0x560a3e[_0x22d07a(0x1b3)[_0x22d07a(0x175)](_0x3d53cb)]),_0x1903e8=ColorManager[_0x22d07a(0x374)](_0x560a3e[_0x22d07a(0x2e7)['format'](_0x3d53cb)]);_0x4f0d88[_0x22d07a(0x15b)][_0x22d07a(0x17e)](0x0,0x0,_0x332b2d,_0x2fa562,_0x1dacbb,_0x1903e8,!![]);}this[_0x22d07a(0x1df)]=_0x4f0d88,this['addChild'](this[_0x22d07a(0x1df)]);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x169c73(0x2cc)]=function(){const _0x3f6776=_0x169c73,_0x5a2784=new Sprite();_0x5a2784['anchor']['x']=this[_0x3f6776(0x31c)]['x'],_0x5a2784[_0x3f6776(0x31c)]['y']=this[_0x3f6776(0x31c)]['y'],this[_0x3f6776(0x242)]=_0x5a2784,this[_0x3f6776(0x252)](this['_graphicSprite']),this[_0x3f6776(0x259)]();},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x22f)]=function(){const _0x70a10f=_0x169c73;if(!Window_BTB_TurnOrder[_0x70a10f(0x307)]['ShowMarkerBorder'])return;const _0x3a6098=Window_BTB_TurnOrder['Settings'],_0x1eedff=this[_0x70a10f(0x2dd)]===$gameParty?'Actor':'Enemy',_0x147b28='%1SystemBorder'[_0x70a10f(0x175)](_0x1eedff),_0x8a32f3=new Sprite();_0x8a32f3[_0x70a10f(0x31c)]['x']=this[_0x70a10f(0x31c)]['x'],_0x8a32f3['anchor']['y']=this['anchor']['y'];if(_0x3a6098[_0x147b28])_0x8a32f3[_0x70a10f(0x15b)]=ImageManager[_0x70a10f(0x365)](_0x3a6098[_0x147b28]);else{let _0x5b1db3=this['bitmapWidth'](),_0x2031e3=this['bitmapHeight'](),_0x4169ea=_0x3a6098[_0x70a10f(0x285)];_0x8a32f3[_0x70a10f(0x15b)]=new Bitmap(_0x5b1db3,_0x2031e3);const _0x4fbbe4=_0x70a10f(0x291),_0x5ab831=ColorManager[_0x70a10f(0x374)](_0x3a6098['%1BorderColor'[_0x70a10f(0x175)](_0x1eedff)]);_0x8a32f3[_0x70a10f(0x15b)][_0x70a10f(0x237)](0x0,0x0,_0x5b1db3,_0x2031e3,_0x4fbbe4),_0x5b1db3-=0x2,_0x2031e3-=0x2,_0x8a32f3['bitmap'][_0x70a10f(0x237)](0x1,0x1,_0x5b1db3,_0x2031e3,_0x5ab831),_0x5b1db3-=_0x4169ea*0x2,_0x2031e3-=_0x4169ea*0x2,_0x8a32f3[_0x70a10f(0x15b)][_0x70a10f(0x237)](0x1+_0x4169ea,0x1+_0x4169ea,_0x5b1db3,_0x2031e3,_0x4fbbe4),_0x5b1db3-=0x2,_0x2031e3-=0x2,_0x4169ea+=0x1,_0x8a32f3[_0x70a10f(0x15b)][_0x70a10f(0x209)](0x1+_0x4169ea,0x1+_0x4169ea,_0x5b1db3,_0x2031e3);}this[_0x70a10f(0x1df)]=_0x8a32f3,this['addChild'](this[_0x70a10f(0x1df)]),this['width']=this['_backgroundSprite']['width'],this[_0x70a10f(0x244)]=this['_backgroundSprite'][_0x70a10f(0x244)];},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x32b)]=function(){const _0x50f62a=_0x169c73,_0x1737d4=Window_BTB_TurnOrder[_0x50f62a(0x307)];if(!_0x1737d4[_0x50f62a(0x314)])return;if(this[_0x50f62a(0x2dd)]===$gameParty)return;const _0x32084a=this[_0x50f62a(0x383)](),_0x2e9f0f=this['bitmapHeight'](),_0x3d01f0=new Sprite();_0x3d01f0['anchor']['x']=this[_0x50f62a(0x31c)]['x'],_0x3d01f0[_0x50f62a(0x31c)]['y']=this['anchor']['y'],_0x3d01f0[_0x50f62a(0x15b)]=new Bitmap(_0x32084a,_0x2e9f0f),this[_0x50f62a(0x1ea)]=_0x3d01f0,this[_0x50f62a(0x252)](this['_letterSprite']);},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x33e)]=function(){const _0x5330e0=_0x169c73;return this['_unit']?this[_0x5330e0(0x2dd)][_0x5330e0(0x2b5)]()[this[_0x5330e0(0x2f8)]]:null;},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x363)]=function(){const _0x2984de=_0x169c73;Sprite_Clickable[_0x2984de(0x208)][_0x2984de(0x363)][_0x2984de(0x335)](this),this['checkPosition'](),this[_0x2984de(0x355)](),this[_0x2984de(0x2c1)](),this['updateOpacity'](),this[_0x2984de(0x1f1)](),this[_0x2984de(0x2f3)](),this['updateLetter'](),this[_0x2984de(0x228)]();},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)]['checkPosition']=function(){const _0x370fd1=_0x169c73,_0xeff621=this[_0x370fd1(0x2c2)]();if(this['_position']===_0xeff621)return;this[_0x370fd1(0x2a6)]=_0xeff621;if(_0xeff621===this[_0x370fd1(0x384)]()&&this[_0x370fd1(0x37a)]<=0x0&&this[_0x370fd1(0x22d)]>0x0)this[_0x370fd1(0x1be)](0x0);else this['_fadeDuration']<=0x0&&this[_0x370fd1(0x22d)]<0xff&&this[_0x370fd1(0x2c1)]();this[_0x370fd1(0x1eb)]();},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)]['checkTargetPositions']=function(){const _0x1067bd=_0x169c73,_0x318de0=this[_0x1067bd(0x2e9)]();if(!_0x318de0)return;let _0x229f02=![];if(this[_0x1067bd(0x1fb)]!==_0x318de0[_0x1067bd(0x1c5)])_0x229f02=!![];else this['_containerHeight']!==_0x318de0[_0x1067bd(0x244)]&&(_0x229f02=!![]);_0x229f02&&this[_0x1067bd(0x1eb)]();},Sprite_BTB_TurnOrder_Battler['prototype'][_0x169c73(0x1eb)]=function(){const _0x3fd296=_0x169c73,_0x26c354=Window_BTB_TurnOrder['Settings'],_0x3c9c99=this['isHorz'](),_0x3dd084=_0x26c354[_0x3fd296(0x36d)],_0x480af0=_0x26c354[_0x3fd296(0x288)],_0x5c0133=SceneManager[_0x3fd296(0x263)][_0x3fd296(0x33b)];if(!_0x5c0133)return;const _0x4f45b5=this[_0x3fd296(0x2c2)]();this[_0x3fd296(0x1d7)]=_0x26c354['UpdateFrames'],this[_0x3fd296(0x31b)]=_0x3c9c99?_0x26c354[_0x3fd296(0x278)]*_0x4f45b5:0x0,this[_0x3fd296(0x1a0)]=_0x3c9c99?0x0:_0x26c354[_0x3fd296(0x278)]*_0x4f45b5,_0x4f45b5>0x0&&(this[_0x3fd296(0x31b)]+=_0x3c9c99?_0x480af0:0x0,this['_positionTargetY']+=_0x3c9c99?0x0:_0x480af0),_0x3dd084?this[_0x3fd296(0x31b)]=_0x3c9c99?_0x5c0133[_0x3fd296(0x1c5)]-this[_0x3fd296(0x31b)]-_0x26c354['SpriteThin']:0x0:this['_positionTargetY']=_0x3c9c99?0x0:_0x5c0133['height']-this[_0x3fd296(0x1a0)]-_0x26c354[_0x3fd296(0x278)];},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x355)]=function(){const _0x2a4414=_0x169c73;if(this[_0x2a4414(0x37a)]>0x0)return;if(this[_0x2a4414(0x1d7)]>0x0){const _0x1b257a=this[_0x2a4414(0x1d7)];this['x']=(this['x']*(_0x1b257a-0x1)+this[_0x2a4414(0x31b)])/_0x1b257a,this['y']=(this['y']*(_0x1b257a-0x1)+this[_0x2a4414(0x1a0)])/_0x1b257a,this['_positionDuration']--;}if(this[_0x2a4414(0x1d7)]<=0x0){this['x']=this[_0x2a4414(0x31b)],this['y']=this['_positionTargetY'];if(this['opacity']<0xff&&!this[_0x2a4414(0x233)]&&this['_fadeDuration']<=0x0){const _0x2d4780=this['battler']();_0x2d4780&&(this[_0x2a4414(0x155)]=_0x2d4780['isAlive']()&&_0x2d4780['isAppeared']()?0xff:0x0);}}},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)]['defaultPosition']=function(){const _0x17c93b=_0x169c73,_0x2f28b5=Window_BTB_TurnOrder[_0x17c93b(0x307)],_0x34b6a1=this[_0x17c93b(0x1ab)]()?_0x2f28b5[_0x17c93b(0x214)]:_0x2f28b5['MaxVertSprites'];return _0x34b6a1+0x1;},Sprite_BTB_TurnOrder_Battler['prototype'][_0x169c73(0x2e9)]=function(){const _0x3d20d5=_0x169c73;return SceneManager[_0x3d20d5(0x263)][_0x3d20d5(0x33b)];},Sprite_BTB_TurnOrder_Battler['prototype'][_0x169c73(0x2c2)]=function(){const _0x4c3c26=_0x169c73,_0x6e91e=this[_0x4c3c26(0x33e)]();if(!_0x6e91e)return this[_0x4c3c26(0x384)]();if(_0x6e91e===BattleManager[_0x4c3c26(0x1c7)])return 0x0;if(BattleManager[_0x4c3c26(0x37b)][_0x4c3c26(0x1a4)](_0x6e91e)){const _0x10f0b9=BattleManager['_actionBattlers'][_0x4c3c26(0x302)](_0x6e91e)+0x1;return _0x10f0b9;}return this[_0x4c3c26(0x384)]();},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x1be)]=function(_0x2ee641){const _0x23ff51=_0x169c73,_0x2a4abd=Window_BTB_TurnOrder['Settings'];this[_0x23ff51(0x37a)]=_0x2a4abd[_0x23ff51(0x161)],this[_0x23ff51(0x155)]=_0x2ee641;},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x2c1)]=function(){const _0x58d719=_0x169c73,_0x26cdcc=this['battler']();if(!_0x26cdcc)return;if(this[_0x58d719(0x34c)]===_0x26cdcc['isAlive']()&&this[_0x58d719(0x282)]===_0x26cdcc[_0x58d719(0x17c)]())return;this[_0x58d719(0x34c)]=_0x26cdcc[_0x58d719(0x142)](),this[_0x58d719(0x282)]=_0x26cdcc['isAppeared']();let _0x35e945=this[_0x58d719(0x34c)]&&this[_0x58d719(0x282)]?0xff:0x0;this[_0x58d719(0x1be)](_0x35e945);},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x201)]=function(){const _0x2d4eb6=_0x169c73;if(this[_0x2d4eb6(0x37a)]>0x0){const _0x4462f4=this[_0x2d4eb6(0x37a)];this['opacity']=(this['opacity']*(_0x4462f4-0x1)+this[_0x2d4eb6(0x155)])/_0x4462f4,this['_fadeDuration']--,this[_0x2d4eb6(0x37a)]<=0x0&&(this[_0x2d4eb6(0x2e0)](),this[_0x2d4eb6(0x1d7)]=0x0,this[_0x2d4eb6(0x355)](),this['opacity']=this[_0x2d4eb6(0x155)]);}if(this[_0x2d4eb6(0x233)])return;BattleManager[_0x2d4eb6(0x317)]===_0x2d4eb6(0x34d)&&(this[_0x2d4eb6(0x233)]=!![],this[_0x2d4eb6(0x1be)](0x0));},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)]['updateGraphic']=function(){const _0x4ffb08=_0x169c73,_0x39ee56=this['battler']();if(!_0x39ee56)return;const _0x5c9d9f=Window_BTB_TurnOrder[_0x4ffb08(0x307)],_0x24c81f=this[_0x4ffb08(0x2dd)]===$gameParty?_0x4ffb08(0x1ff):_0x4ffb08(0x31a);let _0x32d36c=_0x39ee56[_0x4ffb08(0x33d)]();if(_0x39ee56[_0x4ffb08(0x32c)]()&&_0x32d36c===_0x4ffb08(0x28c))_0x32d36c=_0x4ffb08(0x2b7);else _0x39ee56['isEnemy']()&&_0x32d36c===_0x4ffb08(0x29e)&&(_0x32d36c=_0x4ffb08(0x28c));if(this[_0x4ffb08(0x1cc)]!==_0x32d36c)return this['processUpdateGraphic']();switch(this[_0x4ffb08(0x1cc)]){case'face':if(this['_graphicFaceName']!==_0x39ee56[_0x4ffb08(0x16e)]())return this[_0x4ffb08(0x259)]();if(this[_0x4ffb08(0x20a)]!==_0x39ee56['TurnOrderBTBGraphicFaceIndex']())return this[_0x4ffb08(0x259)]();break;case _0x4ffb08(0x2c6):if(this[_0x4ffb08(0x34b)]!==_0x39ee56[_0x4ffb08(0x145)]())return this[_0x4ffb08(0x259)]();break;case _0x4ffb08(0x28c):if(_0x39ee56['hasSvBattler']()){if(this[_0x4ffb08(0x32e)]!==_0x39ee56[_0x4ffb08(0x336)]())return this[_0x4ffb08(0x259)]();}else{if(this[_0x4ffb08(0x345)]!==_0x39ee56['battlerName']())return this[_0x4ffb08(0x259)]();}break;case _0x4ffb08(0x29e):if(_0x39ee56['isActor']()){if(this[_0x4ffb08(0x32e)]!==_0x39ee56[_0x4ffb08(0x359)]())return this['processUpdateGraphic']();}else{if(this[_0x4ffb08(0x345)]!==_0x39ee56[_0x4ffb08(0x359)]())return this[_0x4ffb08(0x259)]();}break;}},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)]['processUpdateGraphic']=function(){const _0x5d58ec=_0x169c73,_0x33d673=this['battler']();if(!_0x33d673)return;this[_0x5d58ec(0x1cc)]=_0x33d673[_0x5d58ec(0x33d)]();if(_0x33d673[_0x5d58ec(0x32c)]()&&this[_0x5d58ec(0x1cc)]===_0x5d58ec(0x28c))this[_0x5d58ec(0x1cc)]=_0x5d58ec(0x2b7);else _0x33d673[_0x5d58ec(0x2c0)]()&&this['_graphicType']===_0x5d58ec(0x29e)&&(this[_0x5d58ec(0x1cc)]=_0x5d58ec(0x28c));let _0x5dbc1b;switch(this[_0x5d58ec(0x1cc)]){case _0x5d58ec(0x2b7):this[_0x5d58ec(0x177)]=_0x33d673[_0x5d58ec(0x16e)](),this[_0x5d58ec(0x20a)]=_0x33d673['TurnOrderBTBGraphicFaceIndex'](),_0x5dbc1b=ImageManager['loadFace'](this[_0x5d58ec(0x177)]),_0x5dbc1b[_0x5d58ec(0x206)](this[_0x5d58ec(0x1ca)][_0x5d58ec(0x1e8)](this,_0x5dbc1b));break;case _0x5d58ec(0x2c6):this[_0x5d58ec(0x34b)]=_0x33d673[_0x5d58ec(0x30f)](),_0x5dbc1b=ImageManager[_0x5d58ec(0x365)](_0x5d58ec(0x21f)),_0x5dbc1b[_0x5d58ec(0x206)](this['changeIconGraphicBitmap'][_0x5d58ec(0x1e8)](this,_0x5dbc1b));break;case _0x5d58ec(0x28c):if(_0x33d673['hasSvBattler']())this['_graphicSv']=_0x33d673[_0x5d58ec(0x336)](),_0x5dbc1b=ImageManager[_0x5d58ec(0x183)](this['_graphicSv']),_0x5dbc1b[_0x5d58ec(0x206)](this['changeSvActorGraphicBitmap'][_0x5d58ec(0x1e8)](this,_0x5dbc1b));else $gameSystem[_0x5d58ec(0x157)]()?(this[_0x5d58ec(0x345)]=_0x33d673[_0x5d58ec(0x359)](),_0x5dbc1b=ImageManager[_0x5d58ec(0x2f2)](this['_graphicEnemy']),_0x5dbc1b[_0x5d58ec(0x206)](this[_0x5d58ec(0x19b)][_0x5d58ec(0x1e8)](this,_0x5dbc1b))):(this[_0x5d58ec(0x345)]=_0x33d673[_0x5d58ec(0x359)](),_0x5dbc1b=ImageManager['loadEnemy'](this['_graphicEnemy']),_0x5dbc1b[_0x5d58ec(0x206)](this[_0x5d58ec(0x19b)][_0x5d58ec(0x1e8)](this,_0x5dbc1b)));break;case'svactor':this[_0x5d58ec(0x32e)]=_0x33d673[_0x5d58ec(0x359)](),_0x5dbc1b=ImageManager[_0x5d58ec(0x183)](this[_0x5d58ec(0x32e)]),_0x5dbc1b[_0x5d58ec(0x206)](this[_0x5d58ec(0x15c)][_0x5d58ec(0x1e8)](this,_0x5dbc1b));break;}},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x1ca)]=function(_0xffd1b){const _0x188100=_0x169c73,_0x28ddd6=this['_graphicFaceIndex'],_0x174261=this['bitmapWidth'](),_0xf3ae40=this[_0x188100(0x329)](),_0x22b6f0=Math[_0x188100(0x1fd)](_0x174261,_0xf3ae40);this['_graphicSprite'][_0x188100(0x15b)]=new Bitmap(_0x174261,_0xf3ae40);const _0x4203e9=this[_0x188100(0x242)][_0x188100(0x15b)],_0x2d01b4=ImageManager[_0x188100(0x1d3)],_0x3f1743=ImageManager[_0x188100(0x22c)],_0x3e0c60=_0x22b6f0/Math[_0x188100(0x1fd)](_0x2d01b4,_0x3f1743),_0x535485=ImageManager[_0x188100(0x1d3)],_0x5d11a8=ImageManager[_0x188100(0x22c)],_0x11b7c1=_0x28ddd6%0x4*_0x2d01b4+(_0x2d01b4-_0x535485)/0x2,_0x2e6da7=Math[_0x188100(0x2b8)](_0x28ddd6/0x4)*_0x3f1743+(_0x3f1743-_0x5d11a8)/0x2,_0x20eb94=(_0x174261-_0x2d01b4*_0x3e0c60)/0x2,_0x2446bf=(_0xf3ae40-_0x3f1743*_0x3e0c60)/0x2;_0x4203e9[_0x188100(0x1c9)](_0xffd1b,_0x11b7c1,_0x2e6da7,_0x535485,_0x5d11a8,_0x20eb94,_0x2446bf,_0x22b6f0,_0x22b6f0);},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x198)]=function(_0x16350a){const _0x4b2266=_0x169c73,_0x2732e7=this[_0x4b2266(0x34b)],_0x330818=this[_0x4b2266(0x383)](),_0x39c192=this['bitmapHeight']();this[_0x4b2266(0x242)][_0x4b2266(0x15b)]=new Bitmap(_0x330818,_0x39c192);const _0x6d7285=this[_0x4b2266(0x242)][_0x4b2266(0x15b)],_0x561c83=ImageManager[_0x4b2266(0x2b1)],_0x174c45=ImageManager[_0x4b2266(0x23e)],_0x533fe3=Math[_0x4b2266(0x20b)](_0x561c83,_0x174c45,_0x330818,_0x39c192),_0x1492dc=_0x2732e7%0x10*_0x561c83,_0x109455=Math[_0x4b2266(0x2b8)](_0x2732e7/0x10)*_0x174c45,_0x2273af=Math[_0x4b2266(0x2b8)](Math['max'](_0x330818-_0x533fe3,0x0)/0x2),_0x5905d1=Math[_0x4b2266(0x2b8)](Math[_0x4b2266(0x1fd)](_0x39c192-_0x533fe3,0x0)/0x2);_0x6d7285[_0x4b2266(0x1c9)](_0x16350a,_0x1492dc,_0x109455,_0x561c83,_0x174c45,_0x2273af,_0x5905d1,_0x533fe3,_0x533fe3);},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x15c)]=function(_0x25fb39){const _0x50a2ab=_0x169c73,_0x221457=this['bitmapWidth'](),_0xedd500=this[_0x50a2ab(0x329)](),_0x144f60=Math[_0x50a2ab(0x20b)](_0x221457,_0xedd500);this['_graphicSprite'][_0x50a2ab(0x15b)]=new Bitmap(_0x221457,_0xedd500);const _0x3b46a6=this[_0x50a2ab(0x242)][_0x50a2ab(0x15b)],_0x2327e3=0x9,_0x48d14c=0x6,_0x2495f0=_0x25fb39[_0x50a2ab(0x1c5)]/_0x2327e3,_0x100fdd=_0x25fb39[_0x50a2ab(0x244)]/_0x48d14c,_0x27559e=Math[_0x50a2ab(0x20b)](0x1,_0x144f60/_0x2495f0,_0x144f60/_0x100fdd),_0x2827cb=_0x2495f0*_0x27559e,_0x4fb73a=_0x100fdd*_0x27559e,_0x2f3c66=Math[_0x50a2ab(0x283)]((_0x221457-_0x2827cb)/0x2),_0x46b06a=Math[_0x50a2ab(0x283)]((_0xedd500-_0x4fb73a)/0x2);_0x3b46a6[_0x50a2ab(0x1c9)](_0x25fb39,0x0,0x0,_0x2495f0,_0x100fdd,_0x2f3c66,_0x46b06a,_0x2827cb,_0x4fb73a);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x169c73(0x19b)]=function(_0x5a877f){const _0x5ef6f3=_0x169c73,_0x1d114f=Window_BTB_TurnOrder[_0x5ef6f3(0x307)],_0x402722=this[_0x5ef6f3(0x383)](),_0x38e92d=this[_0x5ef6f3(0x329)](),_0x4fae4e=Math['min'](_0x402722,_0x38e92d);this['_graphicSprite'][_0x5ef6f3(0x15b)]=new Bitmap(_0x402722,_0x38e92d);const _0x68ffde=this[_0x5ef6f3(0x242)][_0x5ef6f3(0x15b)],_0x4c525b=Math['min'](0x1,_0x4fae4e/_0x5a877f[_0x5ef6f3(0x1c5)],_0x4fae4e/_0x5a877f[_0x5ef6f3(0x244)]),_0x1909f1=_0x5a877f[_0x5ef6f3(0x1c5)]*_0x4c525b,_0x45c63b=_0x5a877f[_0x5ef6f3(0x244)]*_0x4c525b,_0x5bb99d=Math[_0x5ef6f3(0x283)]((_0x402722-_0x1909f1)/0x2),_0x13d559=Math[_0x5ef6f3(0x283)]((_0x38e92d-_0x45c63b)/0x2);_0x68ffde['blt'](_0x5a877f,0x0,0x0,_0x5a877f[_0x5ef6f3(0x1c5)],_0x5a877f[_0x5ef6f3(0x244)],_0x5bb99d,_0x13d559,_0x1909f1,_0x45c63b);},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x2f3)]=function(){const _0x21ab55=_0x169c73,_0x175129=this[_0x21ab55(0x33e)]();if(!_0x175129)return;if(!_0x175129[_0x21ab55(0x2c0)]())return;if(this[_0x21ab55(0x28a)]===_0x175129[_0x21ab55(0x378)]())return;this[_0x21ab55(0x28a)]=_0x175129['battlerHue']();if(_0x175129['hasSvBattler']())this['_graphicHue']=0x0;this[_0x21ab55(0x242)][_0x21ab55(0x152)](this['_graphicHue']);},Sprite_BTB_TurnOrder_Battler['prototype']['updateLetter']=function(){const _0x10d5a6=_0x169c73;if(!this[_0x10d5a6(0x1ea)])return;const _0x1f6fc6=this[_0x10d5a6(0x33e)]();if(!_0x1f6fc6)return;if(this[_0x10d5a6(0x210)]===_0x1f6fc6[_0x10d5a6(0x210)]&&this[_0x10d5a6(0x255)]===_0x1f6fc6['_plural'])return;this[_0x10d5a6(0x210)]=_0x1f6fc6['_letter'],this[_0x10d5a6(0x255)]=_0x1f6fc6[_0x10d5a6(0x255)];const _0xa6b64e=Window_BTB_TurnOrder[_0x10d5a6(0x307)],_0x3fed87=this['isHorz'](),_0x282fe4=this[_0x10d5a6(0x383)](),_0x26da37=this['bitmapHeight'](),_0x417906=this[_0x10d5a6(0x1ea)][_0x10d5a6(0x15b)];_0x417906['clear']();if(!this[_0x10d5a6(0x255)])return;_0x417906[_0x10d5a6(0x1e5)]=_0xa6b64e[_0x10d5a6(0x1dc)]||$gameSystem[_0x10d5a6(0x270)](),_0x417906[_0x10d5a6(0x15a)]=_0xa6b64e[_0x10d5a6(0x191)]||0x10,_0x3fed87?_0x417906[_0x10d5a6(0x154)](this['_letter'][_0x10d5a6(0x1c2)](),0x0,_0x26da37/0x2,_0x282fe4,_0x26da37/0x2,_0x10d5a6(0x2d9)):_0x417906[_0x10d5a6(0x154)](this[_0x10d5a6(0x210)][_0x10d5a6(0x1c2)](),0x0,0x2,_0x282fe4-0x8,_0x26da37-0x4,_0x10d5a6(0x1b5));},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x228)]=function(){const _0x2133aa=_0x169c73,_0x2d1f9d=this['battler']();if(!_0x2d1f9d)return;const _0x4a7025=_0x2d1f9d['battler']();if(!_0x4a7025)return;const _0x3cea64=_0x4a7025['mainSprite']();if(!_0x3cea64)return;this[_0x2133aa(0x1b6)](_0x3cea64[_0x2133aa(0x25a)]);},Sprite_BTB_TurnOrder_Battler[_0x169c73(0x208)][_0x169c73(0x195)]=function(){const _0x1c6546=_0x169c73;return this[_0x1c6546(0x33e)]();},VisuMZ['BattleSystemBTB'][_0x169c73(0x1ae)]=Window_Base[_0x169c73(0x208)]['makeAdditionalSkillCostText'],Window_Base[_0x169c73(0x208)][_0x169c73(0x2db)]=function(_0x1c4ece,_0x7763d4,_0x4f9442){const _0x5bf5b7=_0x169c73;return _0x4f9442=VisuMZ[_0x5bf5b7(0x380)]['Window_Base_makeAdditionalSkillCostText'][_0x5bf5b7(0x335)](this,_0x1c4ece,_0x7763d4,_0x4f9442),_0x4f9442=this['makeAdditionalCostTextBTB'](_0x1c4ece,_0x7763d4,_0x4f9442),_0x4f9442;},VisuMZ[_0x169c73(0x380)][_0x169c73(0x2a3)]=Window_Base[_0x169c73(0x208)]['drawItemNumber'],Window_Base['prototype'][_0x169c73(0x379)]=function(_0x16487b,_0x16d396,_0x22b330,_0x56bf9f){const _0x5bd5c7=_0x169c73;BattleManager[_0x5bd5c7(0x22a)]()&&this[_0x5bd5c7(0x320)]===Window_BattleItem?this[_0x5bd5c7(0x239)](_0x16487b,_0x16d396,_0x22b330,_0x56bf9f):VisuMZ[_0x5bd5c7(0x380)][_0x5bd5c7(0x2a3)][_0x5bd5c7(0x335)](this,_0x16487b,_0x16d396,_0x22b330,_0x56bf9f),this[_0x5bd5c7(0x2a5)]();},Window_Base[_0x169c73(0x208)][_0x169c73(0x239)]=function(_0x10aa01,_0x3f871c,_0x3dc2e5,_0x2c12da){const _0x46a5cc=_0x169c73,_0x30dc09=VisuMZ[_0x46a5cc(0x380)]['Settings'][_0x46a5cc(0x31f)],_0x31d2f6=BattleManager[_0x46a5cc(0x25e)]||$gameParty[_0x46a5cc(0x2b5)]()[0x0],_0x9e2b9b=this[_0x46a5cc(0x2bf)](_0x31d2f6,_0x10aa01,''),_0x42b5a0=this[_0x46a5cc(0x388)](_0x9e2b9b)[_0x46a5cc(0x1c5)],_0x2725b8=_0x30dc09[_0x46a5cc(0x2cf)];let _0x438541=_0x3f871c+_0x2c12da-_0x42b5a0;if(_0x9e2b9b==='')VisuMZ[_0x46a5cc(0x380)][_0x46a5cc(0x2a3)]['call'](this,_0x10aa01,_0x3f871c,_0x3dc2e5,_0x2c12da);else{if(this[_0x46a5cc(0x2f5)](_0x10aa01)){this[_0x46a5cc(0x2a5)]();const _0x24b078=VisuMZ[_0x46a5cc(0x1f5)][_0x46a5cc(0x307)][_0x46a5cc(0x17a)];this['contents'][_0x46a5cc(0x15a)]=_0x24b078[_0x46a5cc(0x273)];if(_0x2725b8){const _0x52a8be=_0x24b078['ItemQuantityFmt'],_0x5a9e07=_0x52a8be['format']($gameParty[_0x46a5cc(0x310)](_0x10aa01)),_0xe93e8f=this[_0x46a5cc(0x284)](_0x5a9e07+this[_0x46a5cc(0x309)]());_0x438541-=_0xe93e8f;}else _0x2c12da-=this[_0x46a5cc(0x284)](this[_0x46a5cc(0x309)]())+_0x42b5a0;VisuMZ[_0x46a5cc(0x380)][_0x46a5cc(0x2a3)]['call'](this,_0x10aa01,_0x3f871c,_0x3dc2e5,_0x2c12da);}}this[_0x46a5cc(0x227)](_0x9e2b9b,_0x438541,_0x3dc2e5);},Window_Base[_0x169c73(0x208)][_0x169c73(0x2bf)]=function(_0x1d48ba,_0x16a7d0,_0x3fbcac){const _0x32b60c=_0x169c73;if(!BattleManager[_0x32b60c(0x22a)]())return _0x3fbcac;if(!_0x1d48ba)return _0x3fbcac;if(!_0x16a7d0)return _0x3fbcac;if(_0x16a7d0[_0x32b60c(0x169)][_0x32b60c(0x186)](VisuMZ[_0x32b60c(0x380)]['RegExp']['HideBravePointCost']))return _0x3fbcac;let _0x3586ae=_0x1d48ba[_0x32b60c(0x1e0)](_0x16a7d0);const _0x2b93e6=VisuMZ['BattleSystemBTB'][_0x32b60c(0x307)]['General'],_0x476630=_0x2b93e6['CostPosition'],_0x37c5c5=_0x2b93e6[_0x32b60c(0x2c5)],_0x3531d4=_0x2b93e6[_0x32b60c(0x234)],_0x5e0691=_0x2b93e6[_0x32b60c(0x1d6)]||0x0,_0x5ab4ce=_0x2b93e6[_0x32b60c(0x26d)],_0x1a5f36=_0x2b93e6[_0x32b60c(0x299)];if(DataManager[_0x32b60c(0x1cd)](_0x16a7d0)&&this[_0x32b60c(0x320)]===Window_ActorCommand){if(!_0x37c5c5&&_0x16a7d0['id']===_0x1d48ba['attackSkillId']())return _0x3fbcac;if(!_0x3531d4&&_0x16a7d0['id']===_0x1d48ba['guardSkillId']())return _0x3fbcac;}_0x3586ae-=_0x5e0691;if(_0x3586ae<0x0)return _0x3fbcac;if(!_0x5ab4ce&&_0x3586ae===0x0)return _0x3fbcac;if(!_0x1a5f36&&_0x3586ae===0x1)return _0x3fbcac;const _0x3f9f64='\x5cI[%1]'[_0x32b60c(0x175)](ImageManager['btbBravePointsIcon']),_0x55d784=TextManager[_0x32b60c(0x254)];let _0x20d1c5=TextManager[_0x32b60c(0x2fb)][_0x32b60c(0x175)](_0x3586ae,_0x55d784,_0x3f9f64);if(_0x3fbcac==='')_0x3fbcac+=_0x20d1c5;else _0x476630?_0x3fbcac=_0x20d1c5+this['skillCostSeparator']()+_0x3fbcac:_0x3fbcac=_0x3fbcac+this[_0x32b60c(0x309)]()+_0x20d1c5;return _0x3fbcac;},Window_Selectable[_0x169c73(0x208)][_0x169c73(0x1f7)]=function(){return![];},VisuMZ[_0x169c73(0x380)][_0x169c73(0x2ad)]=Window_Selectable[_0x169c73(0x208)][_0x169c73(0x19a)],Window_Selectable[_0x169c73(0x208)][_0x169c73(0x19a)]=function(_0x4260d0){const _0x1fe02c=_0x169c73;VisuMZ['BattleSystemBTB'][_0x1fe02c(0x2ad)][_0x1fe02c(0x335)](this,_0x4260d0),this[_0x1fe02c(0x1f7)]()&&this['active']&&this[_0x1fe02c(0x23c)]();},Window_Selectable[_0x169c73(0x208)]['applyBattleItemWindowBTB']=function(){const _0x14aa3f=_0x169c73;BattleManager[_0x14aa3f(0x30c)]();},VisuMZ[_0x169c73(0x380)][_0x169c73(0x311)]=Window_Help[_0x169c73(0x208)][_0x169c73(0x357)],Window_Help[_0x169c73(0x208)][_0x169c73(0x357)]=function(_0x162d42){const _0x4bb1fe=_0x169c73;BattleManager[_0x4bb1fe(0x22a)]()&&_0x162d42&&_0x162d42[_0x4bb1fe(0x169)]&&_0x162d42['note'][_0x4bb1fe(0x186)](VisuMZ['BattleSystemBTB']['RegExp'][_0x4bb1fe(0x2ff)])?this[_0x4bb1fe(0x150)](String(RegExp['$1'])):VisuMZ[_0x4bb1fe(0x380)][_0x4bb1fe(0x311)][_0x4bb1fe(0x335)](this,_0x162d42);},VisuMZ[_0x169c73(0x380)][_0x169c73(0x232)]=Window_BattleLog[_0x169c73(0x208)]['startAction'],Window_BattleLog[_0x169c73(0x208)]['startAction']=function(_0x11bda0,_0x2445c0,_0x145324){const _0x3fa60c=_0x169c73;this['showBraveAnimationBTB'](_0x11bda0)?this[_0x3fa60c(0x32d)](_0x11bda0,_0x2445c0,_0x145324):VisuMZ[_0x3fa60c(0x380)]['Window_BattleLog_startAction'][_0x3fa60c(0x335)](this,_0x11bda0,_0x2445c0,_0x145324);},Window_BattleLog[_0x169c73(0x208)][_0x169c73(0x241)]=function(_0x34f439,_0x531936,_0x39bca5){const _0x1a1811=_0x169c73;VisuMZ['BattleSystemBTB'][_0x1a1811(0x232)][_0x1a1811(0x335)](this,_0x34f439,_0x531936,_0x39bca5);},Window_BattleLog['prototype'][_0x169c73(0x25f)]=function(_0x5df410){const _0x146a6f=_0x169c73;if(!BattleManager[_0x146a6f(0x22a)]())return![];if(!_0x5df410)return![];if(!_0x5df410[_0x146a6f(0x2c0)]())return![];if(_0x5df410[_0x146a6f(0x33a)])return![];const _0x2d7552=VisuMZ[_0x146a6f(0x380)][_0x146a6f(0x307)][_0x146a6f(0x222)];if(!_0x2d7552['ShowEnemyBrave'])return![];if(_0x2d7552[_0x146a6f(0x272)]<=0x0)return![];return VisuMZ[_0x146a6f(0x380)][_0x146a6f(0x307)]['BraveAnimation'][_0x146a6f(0x31e)];},Window_BattleLog['prototype']['queueBraveAnimationsBTB']=function(_0x258217,_0x125320,_0x1132ff){const _0x4fd798=_0x169c73;_0x258217[_0x4fd798(0x33a)]=!![];let _0x1471b6=_0x258217[_0x4fd798(0x1fa)]();const _0x8fb778=VisuMZ[_0x4fd798(0x380)][_0x4fd798(0x307)][_0x4fd798(0x222)],_0x4922b9=_0x8fb778[_0x4fd798(0x272)],_0x34b974=_0x8fb778[_0x4fd798(0x361)];while(_0x1471b6--){this[_0x4fd798(0x20e)](_0x4fd798(0x334),[_0x258217],_0x4922b9),_0x1471b6>0x0?this[_0x4fd798(0x20e)](_0x4fd798(0x2be),_0x34b974):this[_0x4fd798(0x20e)](_0x4fd798(0x164));}this[_0x4fd798(0x20e)](_0x4fd798(0x241),_0x258217,_0x125320,_0x1132ff);},VisuMZ[_0x169c73(0x380)][_0x169c73(0x35d)]=Window_ActorCommand['prototype']['addGuardCommand'],Window_ActorCommand[_0x169c73(0x208)]['addGuardCommand']=function(){const _0x12ee77=_0x169c73;this['addBraveCommand'](),VisuMZ[_0x12ee77(0x380)][_0x12ee77(0x35d)][_0x12ee77(0x335)](this);},Window_ActorCommand[_0x169c73(0x208)]['addBraveCommand']=function(){const _0x5bde01=_0x169c73;if(!this[_0x5bde01(0x194)]())return;const _0x35ecdd=this[_0x5bde01(0x352)](),_0x52644c=TextManager[_0x5bde01(0x300)],_0x46254a=ImageManager[_0x5bde01(0x226)],_0x508671=_0x35ecdd==='text'?_0x52644c:_0x5bde01(0x170)['format'](_0x46254a,_0x52644c);this['addCommand'](_0x508671,_0x5bde01(0x2cd),this[_0x5bde01(0x25e)]['canBrave']()),BattleManager['refreshStatusBTB']();},Window_ActorCommand['prototype'][_0x169c73(0x194)]=function(){const _0x3692ec=_0x169c73;if(!BattleManager[_0x3692ec(0x22a)]())return![];if(!VisuMZ[_0x3692ec(0x380)][_0x3692ec(0x307)]['Window'][_0x3692ec(0x205)])return![];if(this[_0x3692ec(0x25e)]&&this[_0x3692ec(0x25e)][_0x3692ec(0x346)]())return![];return!![];},VisuMZ[_0x169c73(0x380)][_0x169c73(0x350)]=Window_Selectable['prototype'][_0x169c73(0x2d4)],Window_Selectable[_0x169c73(0x208)][_0x169c73(0x2d4)]=function(){const _0x3e5986=_0x169c73;this[_0x3e5986(0x1af)]()?this[_0x3e5986(0x25e)]&&!this[_0x3e5986(0x25e)][_0x3e5986(0x346)]()&&this[_0x3e5986(0x25e)]['canBrave']()&&SceneManager[_0x3e5986(0x263)][_0x3e5986(0x385)]():VisuMZ[_0x3e5986(0x380)][_0x3e5986(0x350)][_0x3e5986(0x335)](this);},VisuMZ[_0x169c73(0x380)][_0x169c73(0x1e7)]=Window_Selectable['prototype'][_0x169c73(0x1aa)],Window_Selectable[_0x169c73(0x208)][_0x169c73(0x1aa)]=function(){const _0x5ea341=_0x169c73;this[_0x5ea341(0x1af)]()?this[_0x5ea341(0x25e)]&&!this['_actor']['hideBraveTrait']()&&this[_0x5ea341(0x25e)][_0x5ea341(0x248)]()>0x1&&SceneManager[_0x5ea341(0x263)]['reduceBrave']():VisuMZ[_0x5ea341(0x380)][_0x5ea341(0x1e7)][_0x5ea341(0x335)](this);},Window_Selectable['prototype'][_0x169c73(0x1af)]=function(){const _0x9b7855=_0x169c73;if(this[_0x9b7855(0x320)]!==Window_ActorCommand)return![];if(!SceneManager['isSceneBattle']())return![];if(!BattleManager['isBTB']())return![];return VisuMZ[_0x9b7855(0x380)][_0x9b7855(0x307)][_0x9b7855(0x19d)]['BraveShortcuts'];},VisuMZ[_0x169c73(0x380)][_0x169c73(0x146)]=Window_ActorCommand[_0x169c73(0x208)]['makeCommandList'],Window_ActorCommand[_0x169c73(0x208)][_0x169c73(0x2cb)]=function(){const _0x1abcbb=_0x169c73;VisuMZ[_0x1abcbb(0x380)][_0x1abcbb(0x146)][_0x1abcbb(0x335)](this),this[_0x1abcbb(0x1ee)]();},VisuMZ[_0x169c73(0x380)][_0x169c73(0x28b)]=Window_Base['prototype'][_0x169c73(0x2bb)],Window_Base[_0x169c73(0x208)][_0x169c73(0x2bb)]=function(){const _0x31f6e7=_0x169c73;VisuMZ[_0x31f6e7(0x380)][_0x31f6e7(0x28b)][_0x31f6e7(0x335)](this),SceneManager['isSceneBattle']()&&this[_0x31f6e7(0x1e2)]&&this[_0x31f6e7(0x1e2)]();},Window_ActorCommand[_0x169c73(0x208)][_0x169c73(0x1e2)]=function(){const _0x98481c=_0x169c73;if(!this[_0x98481c(0x262)])return;this[_0x98481c(0x262)]['bitmap']&&this['_btbActionSprite']['bitmap'][_0x98481c(0x268)](),this['removeChild'](this[_0x98481c(0x262)]),delete this[_0x98481c(0x262)];},Window_ActorCommand[_0x169c73(0x208)][_0x169c73(0x1ee)]=function(){const _0x3c552d=_0x169c73;if(!BattleManager['isBTB']())return;if(!this['_actor'])return;this[_0x3c552d(0x1e2)]();if(this[_0x3c552d(0x25e)][_0x3c552d(0x346)]())return;this[_0x3c552d(0x262)]=new Sprite(),this[_0x3c552d(0x252)](this[_0x3c552d(0x262)]),this[_0x3c552d(0x27e)]();},Window_ActorCommand[_0x169c73(0x208)][_0x169c73(0x27e)]=function(){const _0x2648b4=_0x169c73,_0x4cdcd1=VisuMZ[_0x2648b4(0x380)][_0x2648b4(0x307)][_0x2648b4(0x19d)][_0x2648b4(0x20f)];_0x4cdcd1?_0x4cdcd1[_0x2648b4(0x335)](this,this[_0x2648b4(0x262)],this,this[_0x2648b4(0x25e)]):this[_0x2648b4(0x2eb)][_0x2648b4(0x335)](this,this[_0x2648b4(0x262)],this,this[_0x2648b4(0x25e)]);},Window_ActorCommand['prototype'][_0x169c73(0x2eb)]=function(){const _0x434e6f=_0x169c73,_0x3900f9=arguments[0x0],_0x5e142a=arguments[0x1],_0x55676d=arguments[0x2];_0x3900f9['x']=Math[_0x434e6f(0x283)](_0x5e142a[_0x434e6f(0x1c5)]/0x2),_0x3900f9['y']=0x0,_0x3900f9[_0x434e6f(0x31c)]['x']=0.5,_0x3900f9[_0x434e6f(0x31c)]['y']=0.5;const _0xd532c4=TextManager[_0x434e6f(0x294)],_0x5d565d=TextManager[_0x434e6f(0x151)];let _0x4e5d4d=_0xd532c4[_0x434e6f(0x197)](_0x55676d[_0x434e6f(0x248)]());const _0x30ad00=_0x55676d[_0x434e6f(0x2ed)];_0x4e5d4d=_0x4e5d4d[_0x434e6f(0x22b)](0x0,_0x30ad00)+_0x5d565d+_0x4e5d4d[_0x434e6f(0x22b)](_0x30ad00+0x1);const _0x4157e9=new Bitmap(_0x5e142a[_0x434e6f(0x1c5)],_0x5e142a[_0x434e6f(0x296)]());_0x4157e9['fontSize']=0x24,_0x4157e9['drawText'](_0x4e5d4d,0x0,0x0,_0x4157e9[_0x434e6f(0x1c5)],_0x4157e9[_0x434e6f(0x244)],_0x434e6f(0x2d9)),_0x3900f9[_0x434e6f(0x15b)]=_0x4157e9;},Window_ActorCommand[_0x169c73(0x208)]['isBattleItemWindowBTB']=function(){return!![];},Window_ActorCommand[_0x169c73(0x208)][_0x169c73(0x23c)]=function(){const _0x2fe449=_0x169c73,_0x364810=BattleManager[_0x2fe449(0x207)]();if(_0x364810){const _0x5e363c=this[_0x2fe449(0x2af)]();switch(_0x5e363c){case'attack':_0x364810['setAttack']();break;case _0x2fe449(0x18b):_0x364810[_0x2fe449(0x1a7)]();break;case _0x2fe449(0x316):_0x364810[_0x2fe449(0x188)](this[_0x2fe449(0x28e)]());break;default:_0x364810[_0x2fe449(0x188)](null);break;}}Window_Command[_0x2fe449(0x208)]['applyBattleItemWindowBTB']['call'](this);},Window_Base['prototype']['drawActorBravePoints']=function(_0x3a8dd6,_0x10ba82,_0x4a623d,_0x4775c7,_0xcd1dd3){const _0x48de44=_0x169c73;if(!_0x3a8dd6)return;if(!BattleManager[_0x48de44(0x22a)]())return;const _0x2a6068=VisuMZ['BattleSystemBTB']['Settings']['Window'],_0x297d13=BattleManager[_0x48de44(0x202)]()?_0x2a6068[_0x48de44(0x13e)]:_0x2a6068[_0x48de44(0x376)],_0x315ff3=_0x2a6068[_0x48de44(0x389)],_0x4548f3=_0x2a6068[_0x48de44(0x2ec)],_0x142d26=_0x2a6068[_0x48de44(0x143)];let _0x4e919c=0x0,_0x12e7a8=0x0;_0x12e7a8=_0x3a8dd6[_0x48de44(0x277)]();if(_0x12e7a8>0x0)_0x4e919c=_0x4548f3;if(_0x12e7a8===0x0)_0x4e919c=_0x315ff3;if(_0x12e7a8<0x0)_0x4e919c=_0x142d26;const _0x367654='\x5cC[%1]%2\x5cC[0]'['format'](_0x4e919c,_0x12e7a8),_0x4da3f8=_0x48de44(0x2a2)[_0x48de44(0x175)](ImageManager[_0x48de44(0x226)]);_0x12e7a8=_0x3a8dd6[_0x48de44(0x2ce)]();if(_0x12e7a8>0x0)_0x4e919c=_0x4548f3;if(_0x12e7a8===0x0)_0x4e919c=_0x315ff3;_0x12e7a8<0x0&&(_0x4e919c=_0x142d26);const _0x72ecba=_0x48de44(0x347)[_0x48de44(0x175)](_0x4e919c,_0x12e7a8);let _0x17ced1=_0x297d13[_0x48de44(0x175)](_0x367654,TextManager[_0x48de44(0x254)],_0x4da3f8,_0x72ecba);const _0x47dedf=this['textSizeEx'](_0x17ced1)[_0x48de44(0x1c5)];if(_0xcd1dd3===_0x48de44(0x2d9))_0x10ba82+=Math[_0x48de44(0x283)]((_0x4775c7-_0x47dedf)/0x2);else _0xcd1dd3===_0x48de44(0x1b5)&&(_0x10ba82+=Math[_0x48de44(0x283)](_0x4775c7-_0x47dedf));this[_0x48de44(0x227)](_0x17ced1,_0x10ba82,_0x4a623d,_0x4775c7);},Window_StatusBase[_0x169c73(0x208)][_0x169c73(0x328)]=function(_0x436ff6){const _0x54ce73=_0x169c73;if(!_0x436ff6)return![];if(!BattleManager['isBTB']())return![];if(!this[_0x54ce73(0x341)])return![];if(_0x436ff6[_0x54ce73(0x346)]())return![];const _0x42f228=VisuMZ[_0x54ce73(0x380)]['Settings'][_0x54ce73(0x19d)],_0x4e74ac=this[_0x54ce73(0x341)]();return _0x42f228[_0x54ce73(0x24b)[_0x54ce73(0x175)](_0x4e74ac)];},VisuMZ[_0x169c73(0x380)]['Window_BattleStatus_drawItemStatusListStyle']=Window_BattleStatus[_0x169c73(0x208)]['drawItemStatusListStyle'],Window_BattleStatus[_0x169c73(0x208)][_0x169c73(0x220)]=function(_0x1c9a4e){const _0x546b99=_0x169c73;VisuMZ[_0x546b99(0x380)][_0x546b99(0x333)][_0x546b99(0x335)](this,_0x1c9a4e);const _0x104816=this[_0x546b99(0x330)](_0x1c9a4e);if(this[_0x546b99(0x328)](_0x104816)){const _0x59ceeb=this['itemLineRect'](_0x1c9a4e),_0x431e69=$dataSystem[_0x546b99(0x298)]?0x4:0x3,_0x1e21ea=_0x431e69*0x80+(_0x431e69-0x1)*0x8+0x4;let _0x5c997=_0x59ceeb['x']+this[_0x546b99(0x1f2)];VisuMZ[_0x546b99(0x1bc)][_0x546b99(0x307)][_0x546b99(0x342)][_0x546b99(0x286)]?_0x5c997=_0x59ceeb['x']+ImageManager[_0x546b99(0x1d3)]+0x8:_0x5c997+=ImageManager[_0x546b99(0x2b1)];const _0x12d57a=Math[_0x546b99(0x283)](Math[_0x546b99(0x20b)](_0x59ceeb['x']+_0x59ceeb['width']-_0x1e21ea,_0x5c997));let _0x2195e1=_0x12d57a+0x88,_0x1e2ae9=_0x59ceeb['y'];_0x2195e1+=0x88*($dataSystem[_0x546b99(0x298)]?0x3:0x2),_0x2195e1+=this['getOffsetX_BTB'](),_0x1e2ae9+=this[_0x546b99(0x1ec)]();const _0x118e62=this[_0x546b99(0x1d9)]();if(_0x2195e1>_0x59ceeb['x']+_0x59ceeb[_0x546b99(0x1c5)])return;this[_0x546b99(0x180)](_0x104816,_0x2195e1,_0x1e2ae9,_0x59ceeb[_0x546b99(0x1c5)],_0x118e62);}},VisuMZ['BattleSystemBTB']['Window_BattleStatus_drawItemStatusXPStyle']=Window_BattleStatus[_0x169c73(0x208)][_0x169c73(0x1dd)],Window_BattleStatus[_0x169c73(0x208)][_0x169c73(0x1dd)]=function(_0x36ce2d){const _0xef0960=_0x169c73;VisuMZ[_0xef0960(0x380)][_0xef0960(0x163)][_0xef0960(0x335)](this,_0x36ce2d);const _0x3b3449=this[_0xef0960(0x330)](_0x36ce2d);if(this[_0xef0960(0x328)](_0x3b3449)){const _0x571c0f=this[_0xef0960(0x192)](_0x36ce2d);let _0x520cb8=_0x571c0f['x'],_0x33c7a9=_0x571c0f['y'];_0x520cb8+=this[_0xef0960(0x1ed)](),_0x33c7a9+=this[_0xef0960(0x1ec)]();const _0x427b5b=this[_0xef0960(0x1d9)]();this[_0xef0960(0x180)](_0x3b3449,_0x520cb8,_0x33c7a9,_0x571c0f[_0xef0960(0x1c5)],_0x427b5b);}},Window_BattleStatus[_0x169c73(0x208)][_0x169c73(0x192)]=function(_0x45e82c){const _0x3bc381=_0x169c73,_0x254770=this[_0x3bc381(0x25c)](_0x45e82c);if(_0x254770[_0x3bc381(0x1c5)]<ImageManager[_0x3bc381(0x1d3)])return _0x254770;let _0x216dfa=Math['round']((_0x254770[_0x3bc381(0x1c5)]-ImageManager['faceWidth'])/0x2);return _0x254770[_0x3bc381(0x1c5)]=ImageManager[_0x3bc381(0x1d3)],_0x254770['x']+=_0x216dfa,_0x254770;},Window_BattleStatus['prototype']['getAlignmentBTB']=function(){const _0x5506bb=_0x169c73,_0x205c30=VisuMZ[_0x5506bb(0x380)][_0x5506bb(0x307)]['Window'],_0x25ea98=this['battleLayoutStyle']();return _0x205c30['%1_align'[_0x5506bb(0x175)](_0x25ea98)]||0x0;},Window_BattleStatus[_0x169c73(0x208)]['getOffsetX_BTB']=function(){const _0x529a19=_0x169c73,_0x16d291=VisuMZ[_0x529a19(0x380)][_0x529a19(0x307)][_0x529a19(0x19d)],_0x2298ef=this[_0x529a19(0x341)]();return _0x16d291[_0x529a19(0x160)[_0x529a19(0x175)](_0x2298ef)]||0x0;},Window_BattleStatus[_0x169c73(0x208)][_0x169c73(0x1ec)]=function(){const _0x454fff=_0x169c73,_0x3d2dc5=VisuMZ[_0x454fff(0x380)][_0x454fff(0x307)][_0x454fff(0x19d)],_0x243561=this[_0x454fff(0x341)]();return _0x3d2dc5['%1_offsetY'[_0x454fff(0x175)](_0x243561)]||0x0;},Window_BattleSkill[_0x169c73(0x208)][_0x169c73(0x1f7)]=function(){return!![];},Window_BattleSkill[_0x169c73(0x208)][_0x169c73(0x23c)]=function(){const _0x3ad043=_0x169c73,_0x219061=this[_0x3ad043(0x358)](),_0x5e40d1=BattleManager[_0x3ad043(0x207)]();if(_0x5e40d1)_0x5e40d1[_0x3ad043(0x188)](_0x219061?_0x219061['id']:null);Window_SkillList[_0x3ad043(0x208)][_0x3ad043(0x23c)][_0x3ad043(0x335)](this);},Window_BattleItem['prototype']['isBattleItemWindowBTB']=function(){return!![];},Window_BattleItem[_0x169c73(0x208)]['applyBattleItemWindowBTB']=function(){const _0x333931=_0x169c73,_0x7bceba=this[_0x333931(0x358)](),_0x220fee=BattleManager[_0x333931(0x207)]();if(_0x220fee)_0x220fee[_0x333931(0x357)](_0x7bceba?_0x7bceba['id']:null);Window_ItemList[_0x333931(0x208)][_0x333931(0x23c)][_0x333931(0x335)](this);};function Window_BTB_TurnOrder(){const _0x413118=_0x169c73;this[_0x413118(0x27d)](...arguments);}Window_BTB_TurnOrder['prototype']=Object[_0x169c73(0x372)](Window_Base[_0x169c73(0x208)]),Window_BTB_TurnOrder[_0x169c73(0x208)]['constructor']=Window_BTB_TurnOrder,Window_BTB_TurnOrder[_0x169c73(0x307)]=VisuMZ[_0x169c73(0x380)][_0x169c73(0x307)][_0x169c73(0x1cb)],Window_BTB_TurnOrder[_0x169c73(0x208)][_0x169c73(0x27d)]=function(){const _0x40b10e=_0x169c73,_0x3fcf18=this['windowRect']();this[_0x40b10e(0x28d)](_0x3fcf18),Window_Base['prototype']['initialize']['call'](this,_0x3fcf18),this['createBattlerSprites'](),this[_0x40b10e(0x353)](),this['opacity']=0x0;},Window_BTB_TurnOrder[_0x169c73(0x208)]['windowRect']=function(){const _0xf1c217=_0x169c73;return this[_0xf1c217(0x29c)]($gameParty['maxBattleMembers'](),0x9,!![]);},Window_BTB_TurnOrder['prototype'][_0x169c73(0x28d)]=function(_0x26fe4b){const _0x540a2e=_0x169c73;this[_0x540a2e(0x168)]=this[_0x540a2e(0x2f1)]=_0x26fe4b['x'],this[_0x540a2e(0x15e)]=this[_0x540a2e(0x2a0)]=_0x26fe4b['y'],this[_0x540a2e(0x24f)]=_0x26fe4b[_0x540a2e(0x1c5)],this['_fullHeight']=_0x26fe4b[_0x540a2e(0x244)],this[_0x540a2e(0x2e2)]=0x0;},Window_BTB_TurnOrder[_0x169c73(0x208)][_0x169c73(0x29c)]=function(_0x4842c2,_0x1b63c7,_0x1817e1){const _0x36614c=_0x169c73,_0x635843=Window_BTB_TurnOrder['Settings'],_0x48372c=this[_0x36614c(0x1ab)]()?_0x635843['MaxHorzSprites']:_0x635843[_0x36614c(0x2d3)],_0x2dd93f=Math[_0x36614c(0x20b)](_0x48372c,_0x4842c2+_0x1b63c7),_0x5b3c70=SceneManager['_scene']['_statusWindow']['height'],_0x5f43f3=SceneManager[_0x36614c(0x263)]['_helpWindow']['height'],_0x9939a9=_0x635843['SubjectDistance'],_0x2c703b=Graphics[_0x36614c(0x244)]-_0x5b3c70-_0x5f43f3;let _0x56bae9=0x0,_0x51c390=0x0,_0x4589c1=0x0,_0xc8736b=0x0;switch(_0x635843['DisplayPosition']){case _0x36614c(0x315):_0x56bae9=_0x635843[_0x36614c(0x278)]*_0x2dd93f+_0x9939a9,_0x51c390=_0x635843[_0x36614c(0x219)],_0x4589c1=Math[_0x36614c(0x35c)]((Graphics[_0x36614c(0x1c5)]-_0x56bae9)/0x2),_0xc8736b=_0x635843[_0x36614c(0x354)];break;case'bottom':_0x56bae9=_0x635843[_0x36614c(0x278)]*_0x2dd93f+_0x9939a9,_0x51c390=_0x635843['SpriteLength'],_0x4589c1=Math[_0x36614c(0x35c)]((Graphics[_0x36614c(0x1c5)]-_0x56bae9)/0x2),_0xc8736b=Graphics[_0x36614c(0x244)]-_0x5b3c70-_0x51c390-_0x635843['ScreenBuffer'];break;case _0x36614c(0x2f7):_0x56bae9=_0x635843['SpriteLength'],_0x51c390=_0x635843['SpriteThin']*_0x2dd93f+_0x9939a9,_0x4589c1=_0x635843[_0x36614c(0x354)],_0xc8736b=Math[_0x36614c(0x35c)]((_0x2c703b-_0x51c390)/0x2),_0xc8736b+=_0x5f43f3;break;case'right':_0x56bae9=_0x635843[_0x36614c(0x219)],_0x51c390=_0x635843[_0x36614c(0x278)]*_0x2dd93f+_0x9939a9,_0x4589c1=Graphics[_0x36614c(0x1c5)]-_0x56bae9-_0x635843[_0x36614c(0x354)],_0xc8736b=Math[_0x36614c(0x35c)]((_0x2c703b-_0x51c390)/0x2),_0xc8736b+=_0x5f43f3;break;}if(!_0x1817e1){const _0x2255db=Window_BTB_TurnOrder[_0x36614c(0x307)]['OrderDirection'];let _0x58ac74=Math[_0x36614c(0x20b)](_0x48372c,Math[_0x36614c(0x20b)]($gameParty[_0x36614c(0x230)]()+0x8)-_0x2dd93f);switch(_0x635843['DisplayPosition']){case _0x36614c(0x315):case _0x36614c(0x289):_0x2255db&&(_0x4589c1-=_0x58ac74*_0x635843['SpriteThin']);break;}}return _0x4589c1+=_0x635843[_0x36614c(0x36b)],_0xc8736b+=_0x635843['DisplayOffsetY'],new Rectangle(_0x4589c1,_0xc8736b,_0x56bae9,_0x51c390);},Window_BTB_TurnOrder[_0x169c73(0x208)][_0x169c73(0x2da)]=function(){this['padding']=0x0;},Window_BTB_TurnOrder[_0x169c73(0x208)]['isHorz']=function(){const _0x57aa05=_0x169c73,_0x47a3c8=Window_BTB_TurnOrder[_0x57aa05(0x307)],_0x3875b7=[_0x57aa05(0x315),'bottom'][_0x57aa05(0x1a4)](_0x47a3c8[_0x57aa05(0x35e)]);return _0x3875b7;},Window_BTB_TurnOrder[_0x169c73(0x208)][_0x169c73(0x221)]=function(){const _0x234831=_0x169c73;this[_0x234831(0x371)]=new Sprite(),this[_0x234831(0x173)](this[_0x234831(0x371)]),this[_0x234831(0x373)]=[];for(let _0x549ca2=0x0;_0x549ca2<$gameParty[_0x234831(0x230)]();_0x549ca2++){const _0x20e402=new Sprite_BTB_TurnOrder_Battler($gameParty,_0x549ca2);this['_turnOrderInnerSprite'][_0x234831(0x252)](_0x20e402),this[_0x234831(0x373)][_0x234831(0x20e)](_0x20e402);}for(let _0x2966c1=0x0;_0x2966c1<0x8;_0x2966c1++){const _0x47d977=new Sprite_BTB_TurnOrder_Battler($gameTroop,_0x2966c1);this[_0x234831(0x371)][_0x234831(0x252)](_0x47d977),this['_turnOrderContainer']['push'](_0x47d977);}},Window_BTB_TurnOrder[_0x169c73(0x208)][_0x169c73(0x363)]=function(){const _0x4daa1d=_0x169c73;Window_Base[_0x4daa1d(0x208)][_0x4daa1d(0x363)][_0x4daa1d(0x335)](this),this[_0x4daa1d(0x23b)](),this[_0x4daa1d(0x355)](),this['updateSidePosition'](),this[_0x4daa1d(0x1d0)](),this[_0x4daa1d(0x353)]();},Window_BTB_TurnOrder['prototype'][_0x169c73(0x23b)]=function(){const _0x54adfb=_0x169c73;if(this[_0x54adfb(0x2e2)]>0x0){const _0x5114e5=this[_0x54adfb(0x2e2)];this[_0x54adfb(0x2f1)]=(this[_0x54adfb(0x2f1)]*(_0x5114e5-0x1)+this[_0x54adfb(0x168)])/_0x5114e5,this[_0x54adfb(0x2a0)]=(this[_0x54adfb(0x2a0)]*(_0x5114e5-0x1)+this[_0x54adfb(0x15e)])/_0x5114e5,this['_homeDuration']--,this[_0x54adfb(0x2e2)]<=0x0&&(this[_0x54adfb(0x2f1)]=this[_0x54adfb(0x168)],this[_0x54adfb(0x2a0)]=this['_targetHomeY']);}},Window_BTB_TurnOrder[_0x169c73(0x208)][_0x169c73(0x355)]=function(){const _0x2d6075=_0x169c73,_0x40efcc=Window_BTB_TurnOrder[_0x2d6075(0x307)];if(_0x40efcc[_0x2d6075(0x35e)]!==_0x2d6075(0x315))return;if(!_0x40efcc[_0x2d6075(0x29d)])return;const _0x9367e6=SceneManager['_scene'][_0x2d6075(0x375)];if(!_0x9367e6)return;_0x9367e6[_0x2d6075(0x370)]?(this['x']=this[_0x2d6075(0x2f1)]+(_0x40efcc[_0x2d6075(0x322)]||0x0),this['y']=this['_homeY']+(_0x40efcc[_0x2d6075(0x17d)]||0x0)):(this['x']=this[_0x2d6075(0x2f1)],this['y']=this['_homeY']);const _0x5064ad=SceneManager[_0x2d6075(0x263)][_0x2d6075(0x1f9)];this[_0x2d6075(0x1c0)]===undefined&&(this[_0x2d6075(0x1c0)]=Math['round']((Graphics[_0x2d6075(0x1c5)]-_0x5064ad['width'])/0x2),this[_0x2d6075(0x215)]=Math[_0x2d6075(0x283)]((Graphics['height']-_0x5064ad['height'])/0x2)),this['x']+=_0x5064ad['x']-this['_ogWindowLayerX'],this['y']+=_0x5064ad['y']-this[_0x2d6075(0x215)];},Window_BTB_TurnOrder[_0x169c73(0x208)][_0x169c73(0x1b1)]=function(){const _0x33d1ff=_0x169c73,_0x97f943=Window_BTB_TurnOrder[_0x33d1ff(0x307)];if([_0x33d1ff(0x315)][_0x33d1ff(0x1a4)](_0x97f943[_0x33d1ff(0x35e)]))return;this['x']=this['_homeX'],this['y']=this[_0x33d1ff(0x2a0)];const _0x2f816b=SceneManager[_0x33d1ff(0x263)]['_windowLayer'];this['x']+=_0x2f816b['x'],this['y']+=_0x2f816b['y'];},Window_BTB_TurnOrder[_0x169c73(0x208)][_0x169c73(0x1d0)]=function(){const _0x87b1a2=_0x169c73;if(!this['_turnOrderInnerSprite'])return;const _0x38a1c4=this[_0x87b1a2(0x371)][_0x87b1a2(0x1e1)];if(!_0x38a1c4)return;_0x38a1c4['sort'](this[_0x87b1a2(0x269)][_0x87b1a2(0x1e8)](this));},Window_BTB_TurnOrder[_0x169c73(0x208)]['compareBattlerSprites']=function(_0x799f09,_0x51dd11){const _0x3ead2e=_0x169c73,_0x472c97=this[_0x3ead2e(0x1ab)](),_0x203ea5=Window_BTB_TurnOrder[_0x3ead2e(0x307)][_0x3ead2e(0x36d)];if(_0x472c97&&!_0x203ea5)return _0x799f09['x']-_0x51dd11['x'];else{if(_0x472c97&&_0x203ea5)return _0x51dd11['x']-_0x799f09['x'];else{if(!_0x472c97&&_0x203ea5)return _0x799f09['y']-_0x51dd11['y'];else{if(!_0x472c97&&!_0x203ea5)return _0x51dd11['y']-_0x799f09['y'];}}}},Window_BTB_TurnOrder[_0x169c73(0x208)][_0x169c73(0x353)]=function(){const _0x3dfa8f=_0x169c73;this['visible']=$gameSystem[_0x3dfa8f(0x20d)]();},Window_BTB_TurnOrder[_0x169c73(0x208)][_0x169c73(0x2e8)]=function(_0x25ad7c){const _0x518812=_0x169c73;this['_turnOrderContainer'][_0x518812(0x360)]((_0x2c89f4,_0x334d01)=>{const _0x4cb7d5=_0x518812;return _0x2c89f4['containerPosition']()-_0x334d01[_0x4cb7d5(0x2c2)]();}),this['recalculateHome']();if(!_0x25ad7c)return;for(const _0x37d7ce of this[_0x518812(0x373)]){if(!_0x37d7ce)continue;_0x37d7ce[_0x518812(0x363)](),_0x37d7ce['_positionDuration']=0x0;}},Window_BTB_TurnOrder['prototype'][_0x169c73(0x14f)]=function(){const _0x230aba=_0x169c73;if(!this[_0x230aba(0x1ab)]())return;const _0x34a42a=VisuMZ['BattleSystemBTB']['Settings'][_0x230aba(0x1cb)];if(!_0x34a42a['CenterHorz'])return;const _0x300ba0=$gameParty[_0x230aba(0x2b5)]()[_0x230aba(0x271)](_0x3ce5fe=>_0x3ce5fe&&_0x3ce5fe[_0x230aba(0x142)]()&&_0x3ce5fe[_0x230aba(0x17c)]())[_0x230aba(0x16d)],_0x5de708=$gameTroop['members']()[_0x230aba(0x271)](_0xd47d5b=>_0xd47d5b&&_0xd47d5b['isAlive']()&&_0xd47d5b[_0x230aba(0x17c)]())['length'],_0x32e234=this[_0x230aba(0x29c)](_0x300ba0,_0x5de708);this['_targetHomeX']=_0x32e234['x'],this[_0x230aba(0x15e)]=_0x32e234['y'],(this[_0x230aba(0x168)]!==this[_0x230aba(0x2f1)]||this[_0x230aba(0x15e)]!==this[_0x230aba(0x2a0)])&&(this[_0x230aba(0x2e2)]=_0x34a42a[_0x230aba(0x161)]);};