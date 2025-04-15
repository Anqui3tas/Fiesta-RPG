//=============================================================================
// VisuStella MZ - Battle A.I.
// VisuMZ_3_BattleAI.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_BattleAI = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleAI = VisuMZ.BattleAI || {};
VisuMZ.BattleAI.version = 1.28;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.28] [BattleAI]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_AI_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This Battle A.I. plugin changes up how enemies and any Auto Battle actors
 * behave by implementing many new key components to their decision making
 * process in battle. These new compotents are: A.I. Styles, A.I. Levels, 
 * Rating Variance, A.I. Conditions, and Influencing TGR Weight.
 *
 * With these new key components put together, you can transform RPG Maker MZ's
 * highly primitive A.I. into something more intelligent. Auto Battle actors
 * can also base their A.I. patterns off an enemy's A.I. in order to behave in
 * more desirable ways during battle as well.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Different A.I. Styles to allow for various ways to setup enemy A.I.
 * * Set A.I. Levels for enemies and Auto Battle actors.
 * * A.I. Levels can be set on a global scale or individual scale.
 * * Set rating variance levels to prioritize actions or randomize them.
 * * These include notetags to change them on a per individual basis.
 * * Create action conditions to make certain skills usable by the A.I. under
 *   specific circumstances.
 * * Action conditions are split between 'ALL' and 'ANY' types which require
 *   either all conditions to be met or at least one condition to be met.
 * * A large selection of condition notetags to use to help customize the best
 *   case situations on when to use a skill and which target to pick.
 * * Default condition settings can be made in the Plugin Parameters to make an
 *   entire database of skills become conditional for A.I. usage.
 * * Influence TGR weight to make certain targets more desirable for specific
 *   types of actions.
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
 * - VisuMZ_1_BattleCore
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
 * Auto Battle A.I. for Actors
 *
 * - With this plugin, there is an option to let certain classes reference
 * specific enemy A.I. patterns to decide which skills to use during battle.
 * If the reference option is not used, the actor will use default Auto Battle
 * evaluations to determine which skills to use instead.
 *
 * ---
 * 
 * A.I. Styles
 * 
 * - There are currently four different A.I. Styles. Actors and enemies can
 * default to a different one globally, or changed individually using notetags.
 * Read more about them in the A.I. Styles section.
 * 
 * ---
 *
 * A.I. Levels
 *
 * - Enemies and actors can be given different A.I. Levels. The higher one's
 * A.I. Level, the more they are to follow conditions. With Level 100 A.I.
 * Level, an A.I. will never disobey a condition. On the other hand, lower
 * A.I. Levels may possibly ignore certain conditions and act as if they are
 * fulfilled.
 *
 * ---
 *
 * A.I. Rating Variance
 *
 * - In the RPG Maker database editor, when deciding an enemy's Action Patterns
 * you can decide on the action's "rating". The rating is a value from 1 to 9
 * where 9 gets the highest priority and 1 gets the lowest. RPG Maker, by
 * default, will sometimes dip the rating a few levels lower to allow lower
 * ratings and bypass the priority system.
 *
 * - This plugin allows you to set the variance level through Plugin Parameters
 * on a global scale or notetags on an individual basis to allow for larger,
 * smaller, or no variance on ratings at all.
 *
 * ---
 *
 * A.I. Conditions for Skill Usage
 *
 * - Enemies and any actors that use Auto Battle A.I. with a reference can only
 * use certain skills as long as specific conditions have been met. These
 * conditions are split between 'ALL' condition sets and 'ANY' condition sets.
 *
 * - 'ALL' condition sets require all of the set's conditions to be met in
 * order for the skill to be used by the A.I.
 *
 * - 'ANY' condition sets require at least one of the set's conditions to be
 * met in order for the skill to be used by the A.I.
 *
 * - A variety of conditions can be inserted into each condition set to make
 * for some very specific usage conditions. These will also help filter out
 * which targets to pick from, too.
 *
 * ---
 *
 * TGR Weight on A.I. Target Selection
 *
 * - TGR is a special parameter in RPG Maker MZ that represents "Target Rate".
 * The higher one's TGR, the more likely they are to become the target of an
 * attack. This plugin allows various things to influence the TGR weight to
 * make certain targets more likely to be targets for attack.
 *
 * - Elemental influence rates on the TGR weight mean that if a target receives
 * more damage from an elemental attack, the TGR weight becomes higher for that
 * skill when determining a target. The higher the elemental damage received,
 * the more the TGR weight shifts upward.
 *
 * - Evasion and Magic Evasion rates do the opposite. The higher a potential
 * target's evasion and magic evasion rate is (for physical and magical skills)
 * the lower the TGR weight becomes for that potential target.
 *
 * - By default Plugin Parameter settings, TGR weight shifting requires the
 * enemy troop to have "knowledge" on the party's element rates, evasion, and
 * magic evasion properties. Enemy troops would have to hit actors with element
 * based attacks to learn the actor's resistance levels, physical attacks to
 * learn the actor's evasion, and magical attacks to learn the actor's magic
 * evasion levels.
 *
 * ---
 *
 * ============================================================================
 * A.I. Styles
 * ============================================================================
 * 
 * There are currently four different A.I. Styles. These determine how the
 * A.I. acts and behaves. You can change the A.I. Style used globally through
 * the Plugin Parameters or individually for classes and enemies through the
 * usage of notetags.
 * 
 * Read below to understand each style and its rules:
 * 
 * ---
 * 
 * Classic Style
 * 
 * "Classic" style is the traditional and default RPG Maker MZ A.I. style.
 * It puts emphasis on the Rating system, where skills with higher ratings are
 * given more priority than skills with lower ratings within variance.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - Priority is given towards actions with higher Ratings.
 * - Rating variance will be determined by Plugin Parameters and/or notetags.
 * - A.I. Level can affect whether or not A.I. Conditions would be ignored.
 * - After applying Ratings, Rating Variances, and A.I. Conditions, if there
 *   are still multiple actions to choose from, pick from the remaining actions
 *   randomly.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Gambit Style
 * 
 * - "Gambit" style is the style from Yanfly Engine Plugin's Battle A.I. Core.
 * It goes down the list of skills with top-down priority as long as they meet
 * the Action Pattern conditions and A.I. conditions. Ratings will be ignored.
 * 
 * - Priority starts from top of skill list and goes to bottom of skill list.
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - Priority is given towards actions located higher on the list.
 * - Actions towards the bottom of the list will have lower priority.
 * - Ratings and Rating Variance has no bearing on whether or not an action
 *   will be picked.
 * - A.I. Level can affect whether or not A.I. Conditions would be ignored.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Casual Style
 * 
 * - "Casual" style takes a lighter approach to A.I. It ignores the Ratings
 * system and doesn't care about the order of actions either. Instead, the
 * only thing this A.I. Style cares about are the A.I. Conditions. All valid
 * actions after that are randomly picked from.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - There is no priority system for Ratings or Order.
 * - A.I. Level does not matter here.
 * - A random action will be selected from a group of remaining valid actions.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Random Style
 * 
 * - "Random" style simply does not care about ratings or order. It only cares
 * if the skill's can be used (can pay for the cost) and Action Pattern
 * conditions. It does not care about A.I. Conditions, Ratings, or Order.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions are ignored.
 * - There is no priority system for Ratings or Order.
 * - A.I. Level does not matter here.
 * - A random action will be selected from a group of remaining valid actions.
 * - If no actions are valid, then do nothing.
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
 * === General A.I. Settings Notetags ===
 *
 * These notetags set the general A.I. related settings for enemies and any
 * actors that use A.I. (requires Auto Battle and has a reference A.I.).
 *
 * ---
 * 
 * <AI Style: x>
 * 
 * - Used for: Class, Enemy Notetags
 * - Replace 'x' with 'Classic', 'Gambit', 'Casual', or 'Random' without the
 *   quotes. Example: <AI Style: Gambit>
 * - Determines the A.I. style used. Refer to the A.I. Styles section on the
 *   various types of styles.
 * - For actors, place this inside the associated class's notebox instead.
 * - For actors, this does not apply if there is no referenced enemy A.I. list.
 * - Setup the reference enemy through either the Plugin Parameters or by using
 *   the <Reference AI: Enemy id> notetag found below.
 * 
 * ---
 *
 * <AI Level: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Designates the unit's A.I. level if A.I. is to be used.
 * - Replace 'x' with a number from 0 to 100.
 * - Units with higher A.I. Levels will be more strict about conditions.
 * - Units with lower A.I. Levels will be more lax about conditions.
 *
 * ---
 *
 * <AI Rating Variance: x>
 * 
 * - Used for: Actor, Enemy Notetags
 * - Sets the variance amount when determining A.I. actions by rating.
 * - Replace 'x' with a number between 0 and 9.
 * - 0 for no variance.
 * - Lower numbers for less variance.
 * - Higher numbers for more variance.
 *
 * ---
 *
 * <Reference AI: Enemy id>
 * <Reference AI: name>
 *
 * - Used for: Class Notetags
 * - Causes any actor using this class that has the Auto Battle trait to use
 *   a specific enemy's attack pattern (ratings, conditions, etc.) to determine
 *   which skill to use in battle.
 * - Replace 'id' with a number representing the enemy's ID to reference.
 * - Replace 'name' with the name the enemy to reference.
 * - Actors are only able to use skills they would normally have access to.
 *   - Actors need to have LEARNED the skill.
 *   - Actors need to be able to access the skill's SKILL TYPE.
 *   - Actors need to have the RESOURCES to pay for the skill.
 * - If you cannot figure out why an auto battle actor cannot use a specific
 *   skill, turn OFF auto battle and see if you can use the skill normally.
 *
 * ---
 *
 * <No Reference AI>
 *
 * - Used for: Class Notetags
 * - Prevents the class from using any enemies as their reference A.I. pattern
 *   (including the one set in the Plugin Parameters).
 *
 * ---
 *
 * === Skill A.I. Condition Notetags ===
 *
 * Insert these notetags into the noteboxes of skills that you'd like to give
 * custom A.I. conditions for. The 'All' version of the notetags require every
 * condition to be met while the 'Any' version of the notetags require only one
 * of the conditions to be met. 
 *
 * If both are used together, then the 'All' conditions must be completely
 * fulfilled while the 'Any' conditions need only one to be fulfilled.
 *
 * ---
 *
 * <All AI Conditions>
 *  condition
 *  condition
 *  condition
 * </All AI Conditions>
 * 
 * - Used for: Skill
 * - Add/remove as many conditions as needed for the skill.
 * - All conditions must be met in order for this to become a valid skill for
 *   the AI to use.
 * - This can be used together with <Any AI Conditions>. If either of these
 *   notetags exist, do not use the Plugin Parameter defaul conditions.
 * - This will not inherit default 'All' conditions in the Plugin Parameters.
 * - Replace 'condition' with any of the following Condition List below.
 *
 * ---
 *
 * <Any AI Conditions>
 *  condition
 *  condition
 *  condition
 * </Any AI Conditions>
 * 
 * - Used for: Skill
 * - Add/remove as many conditions as needed for the skill.
 * - As long as one condition is met, this becomes a valid skill for the AI
 *   to use. If none of them are met, this skill becomes invalid for AI use.
 * - This can be used together with <All AI Conditions>. If either of these
 *   notetags exist, do not use the Plugin Parameter defaul conditions.
 * - This will not inherit default 'Any' conditions in the Plugin Parameters.
 * - Replace 'condition' with any of the following Condition List below.
 *
 * ---
 *
 * <No AI Conditions>
 * 
 * - Used for: Skill
 * - Removes any default 'All' and 'Any' conditions for this skill.
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
 * - A numeric value representing a hard number.
 * - '50%' or any other percentile number to represent a rate.
 * - '0.5' or any other float number to represent a rate.
 *
 * - 'Variable x' (replace 'x' with a number) for variable x's current value.
 *
 * - 'HP%', 'MP%', 'TP%' for HP, MP, and TP rates respectively.
 * - 'MaxHP', 'MaxMP', 'MaxTP' for the potential target's respective values.
 * - 'Level' for the potential target's level. Requires VisuMZ_0_CoreEngine for
 *   this to affect enemies.
 * - 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK' for the potential target's total
 *   parameter value.
 *
 * - 'param Buff Stacks' for the potential target's current Buff stacks.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 * - 'param Debuff Stacks' for the potential target's current Debuff stacks.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * - 'param Buff Turns' for potential target's current buff turn duration.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *   - Returns 0 if the potential target is not affected by that buff.
 * - 'param Debuff Turns' for potential target's current debuff turn duration.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *   - Returns 0 if the potential target is not affected by that debuff.
 *
 * - 'State id Turns' or 'State name Turns' for potential target's current turn
 *   duration on that particular state.
 *   - Replace 'id' with a number representing the ID of the state.
 *   - Replace 'name' with the state's name.
 *   - Returns 0 if the potential target is not affected by that state.
 *   - Returns the max safe number value if the potential target is has that
 *     state as a passive state.
 *
 * - 'Element id Rate', 'Element name Rate', 'name Element Rate'
 *   - Returns a (float) value of the potential target's element's rate.
 *   - Replace 'id' with the ID of the element whose rate is to be checked.
 *   - Replace 'name' with the name of the element whose rate is to be checked.
 *     - Ignore any text codes in the element name.
 *
 * - 'Team Alive Members'
 *   - Returns a number value indicating how many alive members there are on
 *     the potential target's team.
 *
 * - 'Team Dead Members'
 *   - Returns a number value indicating how many dead members there are on
 *     the potential target's team.
 * 
 * - When no keyword matches are found, the comparison value will be
 *   interpreted as JavaScript code. If the JavaScript code fails, it will
 *   default to a 0 value.
 * 
 *   *NOTE* JavaScript cannot be used without comparison operators to reduce
 *   error. This means if you want to check if a switch is on or not, don't
 *   simply use "$gameSwitches.value(42)" as it does not have any comparison
 *   operators. Instead, use "$gameSwitches.value(42) === true" to check.
 *
 *   *NOTE* To make any of these conditions base off of the user instead, add
 *   the word 'user' before the condition as such:
 *
 *   user hp% >= 0.50
 *   user atk buff stacks === 2
 *   user team alive members < 3
 *
 * ---
 *
 * Always
 *
 * - Going to be valid no matter what.
 *
 * ---
 *
 * x% Chance
 * 
 * - Replace 'x' with a number value representing the percent chance this skill
 *   would pass as valid.
 *
 * ---
 *
 * Switch x On
 * Switch x Off
 *
 * - Replace 'x' with the ID of the switch to check as ON/OFF.
 *
 * ---
 *
 * User is Actor
 * User is Enemy
 * Target is Actor
 * Target is Enemy
 *
 * - Requires the user or potential target to be an actor/enemy.
 *
 * ---
 *
 * User Has State id
 * User Has State name
 * Target Has State id
 * Target Has State name
 *
 * - Replace 'id' with the ID of the state the user or potential target needs
 *   to have.
 * - Replace 'name' with the name of the state the target needs to have.
 *
 * ---
 *
 * User Not State id
 * User Not State name
 * Target Not State id
 * Target Not State name
 *
 * - Replace 'id' with the ID of the state the user or potential target
 *   cannot have.
 * - Replace 'name' with the name of the state the target cannot have.
 *
 * ---
 *
 * User Has param Buff 
 * User Has param Debuff 
 * Target Has param Buff 
 * Target Has param Debuff 
 *
 * - Requires user or potential target to have the associated parameter 
 *   buff/debuff at any stack level.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Has param Max Buff 
 * User Has param Max Debuff
 * Target Has param Max Buff 
 * Target Has param Max Debuff
 *
 * - Requires potential user or target to have the associated parameter 
 *   buff/debuff at maxed out stacks.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Not param Buff 
 * User Not param Debuff 
 * Target Not param Buff 
 * Target Not param Debuff 
 *
 * - Requires user or potential target to not have the associated parameter 
 *   buff/debuff at any stack level.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Not param Max Buff 
 * User Not param Max Debuff 
 * Target Not param Max Buff 
 * Target Not param Max Debuff 
 *
 * - Requires user or potential target to not have the associated parameter 
 *   buff/debuff at maxed out stacks.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * === A.I. => TGR Weight Notetags ===
 *
 * You can set how much influence on TGR weights actors and enemies will place
 * when determining valid targets for their actions.
 *
 * ---
 *
 * <AI Element Rate Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the element rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI Element Rate Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in element rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI EVA Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the EVA rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI EVA Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in EVA rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI MEV Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the MEV rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI MEV Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in MEV rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI PDR Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the PDR rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI PDR Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in PDR rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI MDR Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the MDR rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI MDR Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in MDR rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 * 
 * === Specific A.I. Targeting Notetags ===
 * 
 * Specific A.I. targeting means the user will ignore any TGR influences when
 * it comes to pick out of a group of valid candidates to come down to one
 * target. This only affects skills where the user must select a specific
 * target, meaning it will ignore the effects of random and AoE scopes.
 * 
 * ---
 *
 * <AI Target: type>
 *
 * - Used for: Skill Notetags
 * - Bypasses TGR influence in favor of picking a specific target out of a
 *   group of valid targets (does not pick from outside the valid target group)
 *   for a skill target.
 * - Replace 'type' with any of the following:
 * 
 *   ----------------------------   -------------------------------------------
 *   Type                           Description
 *   ----------------------------   -------------------------------------------
 *   User                           Always picks the user if available
 *   First                          Always picks the first valid candidate
 *   Last                           Always picks the last valid candidate
 *   ----------------------------   -------------------------------------------
 *   Highest Level                  Picks candidate with highest level
 *   ----------------------------   -------------------------------------------
 *   Highest MaxHP                  Picks candidate with highest MaxHP
 *   Highest HP                     Picks candidate with highest current HP
 *   Highest HP%                    Picks candidate with highest HP ratio
 *   ----------------------------   -------------------------------------------
 *   Highest MaxMP                  Picks candidate with highest MaxMP
 *   Highest MP                     Picks candidate with highest current MP
 *   Highest MP%                    Picks candidate with highest MP ratio
 *   ----------------------------   -------------------------------------------
 *   Highest MaxTP                  Picks candidate with highest MaxTP
 *   Highest TP                     Picks candidate with highest current TP
 *   Highest TP%                    Picks candidate with highest TP ratio
 *   ----------------------------   -------------------------------------------
 *   Highest ATK                    Picks candidate with highest ATK parameter
 *   Highest DEF                    Picks candidate with highest DEF parameter
 *   Highest MAT                    Picks candidate with highest MAT parameter
 *   Highest MDF                    Picks candidate with highest MDF parameter
 *   Highest AGI                    Picks candidate with highest AGI parameter
 *   Highest LUK                    Picks candidate with highest LUK parameter
 *   ----------------------------   -------------------------------------------
 *   Highest HIT                    Picks candidate with highest HIT parameter
 *   Highest EVA                    Picks candidate with highest EVA parameter
 *   Highest CRI                    Picks candidate with highest CRI parameter
 *   Highest CEV                    Picks candidate with highest CEV parameter
 *   Highest MEV                    Picks candidate with highest MEV parameter
 *   Highest MRF                    Picks candidate with highest MRF parameter
 *   Highest CNT                    Picks candidate with highest CNT parameter
 *   Highest HRG                    Picks candidate with highest HRG parameter
 *   Highest MRG                    Picks candidate with highest MRG parameter
 *   Highest TRG                    Picks candidate with highest TRG parameter
 *   ----------------------------   -------------------------------------------
 *   Highest TGR                    Picks candidate with highest TGR parameter
 *   Highest GRD                    Picks candidate with highest GRD parameter
 *   Highest REC                    Picks candidate with highest REC parameter
 *   Highest PHA                    Picks candidate with highest PHA parameter
 *   Highest MCR                    Picks candidate with highest MCR parameter
 *   Highest TCR                    Picks candidate with highest TCR parameter
 *   Highest PDR                    Picks candidate with highest PDR parameter
 *   Highest MDR                    Picks candidate with highest MDR parameter
 *   Highest FDR                    Picks candidate with highest FDR parameter
 *   Highest EXR                    Picks candidate with highest EXR parameter
 *   ----------------------------   -------------------------------------------
 *   Highest State Count            Picks candidate with most states (any)
 *   Highest Positive State Count   Picks candidate with most positive states
 *   Highest Negative State Count   Picks candidate with most negative states
 *   *Note: These require VisuMZ_1_SkillsStatesCore
 *   ----------------------------   -------------------------------------------
 *   Lowest Level                   Picks candidate with lowest level
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxHP                   Picks candidate with lowest MaxHP
 *   Lowest HP                      Picks candidate with lowest current HP
 *   Lowest HP%                     Picks candidate with lowest HP ratio
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxMP                   Picks candidate with lowest MaxMP
 *   Lowest MP                      Picks candidate with lowest current MP
 *   Lowest MP%                     Picks candidate with lowest MP ratio
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxTP                   Picks candidate with lowest MaxTP
 *   Lowest TP                      Picks candidate with lowest current TP
 *   Lowest TP%                     Picks candidate with lowest TP ratio
 *   ----------------------------   -------------------------------------------
 *   Lowest ATK                     Picks candidate with lowest ATK parameter
 *   Lowest DEF                     Picks candidate with lowest DEF parameter
 *   Lowest MAT                     Picks candidate with lowest MAT parameter
 *   Lowest MDF                     Picks candidate with lowest MDF parameter
 *   Lowest AGI                     Picks candidate with lowest AGI parameter
 *   Lowest LUK                     Picks candidate with lowest LUK parameter
 *   ----------------------------   -------------------------------------------
 *   Lowest HIT                     Picks candidate with lowest HIT parameter
 *   Lowest EVA                     Picks candidate with lowest EVA parameter
 *   Lowest CRI                     Picks candidate with lowest CRI parameter
 *   Lowest CEV                     Picks candidate with lowest CEV parameter
 *   Lowest MEV                     Picks candidate with lowest MEV parameter
 *   Lowest MRF                     Picks candidate with lowest MRF parameter
 *   Lowest CNT                     Picks candidate with lowest CNT parameter
 *   Lowest HRG                     Picks candidate with lowest HRG parameter
 *   Lowest MRG                     Picks candidate with lowest MRG parameter
 *   Lowest TRG                     Picks candidate with lowest TRG parameter
 *   ----------------------------   -------------------------------------------
 *   Lowest TGR                     Picks candidate with lowest TGR parameter
 *   Lowest GRD                     Picks candidate with lowest GRD parameter
 *   Lowest REC                     Picks candidate with lowest REC parameter
 *   Lowest PHA                     Picks candidate with lowest PHA parameter
 *   Lowest MCR                     Picks candidate with lowest MCR parameter
 *   Lowest TCR                     Picks candidate with lowest TCR parameter
 *   Lowest PDR                     Picks candidate with lowest PDR parameter
 *   Lowest MDR                     Picks candidate with lowest MDR parameter
 *   Lowest FDR                     Picks candidate with lowest FDR parameter
 *   Lowest EXR                     Picks candidate with lowest EXR parameter
 *   ----------------------------   -------------------------------------------
 *   Lowest State Count             Picks candidate with least states (any)
 *   Lowest Positive State Count    Picks candidate with least positive states
 *   Lowest Negative State Count    Picks candidate with least negative states
 *   *Note: These require VisuMZ_1_SkillsStatesCore
 *   ----------------------------   -------------------------------------------
 * 
 * ---
 *
 * ============================================================================
 * Regarding $gameTroop.turnCount() for A.I. Conditions
 * ============================================================================
 * 
 * ---
 * 
 * Short Answer:
 *
 * Battle A.I. conditions do NOT support the conditions $gameTroop.turnCount()
 * or user.turnCount() or target.turnCount() for A.I. Conditions.
 * 
 * Instead, use RPG Maker MZ's built-in action editor's turn requirement to
 * make do with the same effect.
 *
 * ---
 * 
 * Long Answer:
 * 
 * The turnCount() functions are not valid for A.I. Conditions and disabled due
 * to all the problems they cause. The reason being is because actions are
 * determined before the turn count increases. This is how RPG Maker MZ handles
 * it by default.
 * 
 * The reason why this does not work is due to the following code found in
 * RPG Maker MZ's core scripts:
 * 
 *   Game_Battler.prototype.turnCount = function() {
 *       if (BattleManager.isTpb()) {
 *           return this._tpbTurnCount;
 *       } else {
 *           return $gameTroop.turnCount() + 1;
 *       }
 *   };
 * 
 * What that means the turn count will always be off by 1. So upon determining
 * the action initially, the match would come off as correct. However, as the
 * turn actually starts and reaches the enemy or actor's turn, the turn count
 * check would read differently and return incorrect information, causing the
 * battler to forfeit their actions.
 * 
 * This facet of RPG Maker MZ can be updated and changed, but it is better that
 * it doesn't in order to maintain compatibility with the rest of the plugins
 * available that utilize the turn counter.
 * 
 * The work around to this problem is, instead, to use the enemy database tab's
 * action editor and apply a Turn Condition to match the required turn instead.
 * You know, the thing with Skill and Rating, where you select which skill for
 * the enemy to use instead.
 * 
 * HOWEVER!
 * 
 * If you are willing to use an "Experimental" feature, aka one that is not
 * heavily tested and may potentially result in unintended side effects, go to:
 * 
 *  Plugin Parameters > A.I. General Settings > Experimental > On-The-Spot A.I.
 * 
 * And set that to "true" without the quotes. This will forcefully remove the
 * +1 towards the count and forcefully make enemies re-evaluate actions upon
 * the start of the string of their actions. This comes with some side effects
 * that will potentially give A.I. advantages or disadvantages depending on the
 * battle system type. Action Speed becomes something that can be abused as it
 * is normally something that is determined based on the queued actions. A.I.
 * can pick a high speed weak action and then switch it for a slow speed strong
 * action. There is no proper fix to this due to how on-the-spot A.I. works as
 * it is ill-fitted for speed-relative battle systems. You have been warned.
 * 
 * In the event that this Plugin Parameter IS enabled, then using the turnCount
 * JavaScript code should work again due to the normalization of how the turn
 * property is calculated.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. General Settings
 * ============================================================================
 *
 * These settings determine the global settings for general Battle A.I. usage.
 *
 * ---
 * 
 * A.I. Style
 * 
 *   Actor Style:
 *   - Which A.I. style do you want for referenced actors to use?
 *   - This does not apply to non-referenced actors.
 * 
 *   Enemy Style:
 *   - Which A.I. style do you want for enemies to use?
 * 
 *   Refer to the A.I. Styles list for a list of valid styles.
 * 
 * ---
 *
 * A.I. Level
 * 
 *   Actor A.I. Level:
 *   - Default A.I. level used for actor A.I.
 *   - Levels: 0-100. Higher is stricter.
 * 
 *   Enemy A.I. Level:
 *   - Default A.I. level used for enemy A.I.
 *   - Levels: 0-100. Higher is stricter.
 *
 * ---
 *
 * A.I. Ratings
 * 
 *   Actor Rating Variance:
 *   - How much to allow variance from the A.I. rating by?
 *   - 0 for no variance. Higher numbers for more variance.
 * 
 *   Enemy Rating Variance:
 *   - How much to allow variance from the A.I. rating by?
 *   - 0 for no variance. Higher numbers for more variance.
 *
 * ---
 *
 * Reference
 * 
 *   Actor => AI Reference:
 *   - Which enemy A.I. should the actor reference by default?
 *   - Use 0 for no references.
 *
 * ---
 *
 * Knowledge
 * 
 *   Learn Knowledge:
 *   - Requires enemies/actors to test the knowledge of the opponents before
 *     using specific conditions.
 * 
 *   Unknown Element Rate:
 *   - What should A.I. treat unknown element rates as?
 *
 * ---
 * 
 * Experimental
 * 
 *   On-The-Spot A.I.:
 *   - A.I. enemies/actors determine actions on the spot when it's their turn.
 * 
 *     No Idle Chant:
 *     - Requires On-The-Spot A.I. enabled.
 *     - For A.I. Battlers, disables idle chant motions due to inconsistency.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. Default Conditions
 * ============================================================================
 *
 * You can set certain conditions to be used as defaults for all skills that
 * lack the <All AI Conditions> and <Any AI Conditions>. If either of those
 * notetags exist, none of these defaults will be used for those skills. These
 * settings will allow you to set both 'All' and 'Any' conditions for defaults.
 *
 * ---
 *
 * Enable?
 * 
 *   All Conditions:
 *   - Create default 'ALL' conditions for all skills without any AI notetags?
 * 
 *   Any Conditions:
 *   - Create default 'ANY' conditions for all skills without any AI notetags?
 *
 * ---
 *
 * HP Damage
 * MP Damage
 * HP Recover
 * MP Recover
 * HP Drain
 * MP Drain
 * 
 *   All Conditions:
 *   - Default 'ALL' conditions used for related skills.
 * 
 *   Any Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *
 * ---
 *
 * Add State
 * Remove State
 * 
 *   All Conditions:
 *   - Default 'ALL' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 * 
 *   Any Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 *
 * ---
 *
 * Add Buff
 * Remove Buff
 * Add Debuff
 * Remove Debuff
 * 
 *   All Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *   - %1 - Dynamic values (ie param's).
 * 
 *   Any Conditions:
 *   - Default 'ALL' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. => TGR Weight Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you to set whether or not you'd like for 
 * weight influence when deciding targets for actions and how much to influence
 * the TGR weight by.
 *
 * ---
 *
 * Weight
 * 
 *   Element Rate => TGR:
 *   - Makes all A.I. consider elemental rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence elemental rates have on
 *       TGR weight.
 * 
 *   EVA Rate => TGR:
 *   - Makes all A.I. consider EVA rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence EVA rates have on
 *       TGR weight.
 * 
 *   MEV Rate => TGR:
 *   - Makes all A.I. consider MEV rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence MEV rates have on
 *       TGR weight.
 * 
 *   PDR Rate => TGR:
 *   - Makes all A.I. consider PDR rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence PDR rates have on
 *       TGR weight.
 * 
 *   MDR Rate => TGR:
 *   - Makes all A.I. consider MDR rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence MDR rates have on
 *       TGR weight.
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
 * Version 1.29: March 20, 2025
 * * Bug Fixes!
 * ** Fixed a problem with TPB actions causing conflicts in AI registration of
 *    certain abilities. This would lead to crashes. Should be no more. Fix
 *    made by Olivia.
 *
 * Version 1.28: Version 1.10: January 16, 2025
 * * Compatibility Update!
 * ** Added better compatibility with Battle Grid System regarding scopes.
 * 
 * Version 1.27: November 14, 2024
 * * Compatibility Update!
 * ** Added better compatibility with Skill Cooldowns' <Once Per Turn> notetag.
 * 
 * Version 1.26: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <AI PDR Influence: x.x>
 * *** <AI MDR Influence: x.x>
 * **** Sets how much TGR weight influence is given based on the PDR/MDR rate.
 * *** <Bypass AI PDR Influence>
 * *** <Bypass AI MDR Influence>
 * **** Makes the actor/enemy not factor in PDR/MDR rates when calculating TGR
 *      weights to determine action targets.
 * ** New Plugin Parameters added by Arisu:
 * *** Parameters > Weights > PDR Rate => TGR
 * *** Parameters > Weights > PDR Rate => TGR > Influence Rate
 * *** Parameters > Weights > MDR Rate => TGR
 * *** Parameters > Weights > MDR Rate => TGR > Influence Rate
 * **** Alters the default PDR/MDR Influence rate.
 * 
 * Version 1.25: June 13, 2024
 * * Feature Updates!
 * ** Reduced AI thinking times. Update made by Olivia.
 * 
 * Version 1.24: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug that would cause an infinite loop with certain battle systems
 *    under on the spot AI setting. Fix made by Olivia.
 * 
 * Version 1.23: January 18, 2024
 * * Compatibility Update!
 * ** Updated better compatibility with Battle System - STB and Auto Skill
 *    Triggers to prevent infinite loops. Update made by Olivia.
 * 
 * Version 1.22: December 14, 2023
 * * Compatibility Update!
 * ** Updated better compatibility for the new Battle System FTB, ETB, and PTB
 *    updates. Update made by Olivia.
 * 
 * Version 1.21: April 13, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented enemies from using skills that had the
 *    <Target: x Random Any> notetag. Fix made by Irina.
 * 
 * Version 1.20: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for Battle Core updated version 1.74
 *    new features.
 * 
 * Version 1.19: January 20, 2023
 * * Bug Fixes!
 * ** On-The-Spot A.I. no longer overwrites Forced Actions. Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for Battle Core updated version 1.73
 *    new features.
 * 
 * Version 1.18: May 19, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** General Settings > Experimental > On-The-Spot A.I. > No Idle Chant
 * **** Requires On-The-Spot A.I. enabled.
 * **** For A.I. Battlers, disables idle chant motions due to inconsistency.
 * 
 * Version 1.17: May 12, 2022
 * * Feature Update!
 * ** Better RNG calculation when using the x% Chance conditional. Update made
 *    by Arisu.
 * 
 * Version 1.16: February 24, 2022
 * * Feature Update!
 * ** Randomization between zero variance A.I. is now better.
 * ** A.I. will no longer keep unusable skills in a skill queue and replace
 *    them with new ones.
 * 
 * Version 1.15: December 2, 2021
 * * Compatibility Update!
 * ** AI for skills and items should now work if their scope is
 *    <Target: All Allies But User>. Update made by Irina.
 * 
 * Version 1.14: October 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Notetag section "Condition List" updated with the following:
 * *** *NOTE* JavaScript cannot be used without comparison operators to reduce
 *     error. This means if you want to check if a switch is on or not, don't
 *     simply use "$gameSwitches.value(42)" as it does not have any comparison
 *     operators. Instead, use "$gameSwitches.value(42) === true" to check.
 * ** Updated section "Regarding $gameTroop.turnCount() for A.I. Conditions"
 * * New Experimental Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** A.I. General Settings > Experimental > On-The-Spot A.I.
 * **** A.I. enemies/actors determine actions on the spot when it's their turn.
 * **** Functions akin to YEP's Battle A.I. Core where enemies determine new
 *      actions on the spot. Doing so will forcefully change the way the Turn
 *      Count is handled for Game_Battler to not utilize the +1.
 * **** This will forcefully remove the +1 towards the count and forcefully
 *      make enemies re-evaluate actions upon the start of the string of their
 *      actions. This comes with some side effects that will potentially give
 *      A.I. advantages or disadvantages depending on the battle system type.
 *      Action Speed becomes something that can be abused as it is normally
 *      something that is determined based on the queued actions. A.I. can pick
 *      a high speed weak action and then switch it for a slow speed strong
 *      action. There is no proper fix to this due to how on-the-spot A.I.
 *      works as it is ill-fitted for speed-relative battle systems. You have
 *      been warned.
 * **** In the event that this Plugin Parameter IS enabled, then using the
 *      turnCount JavaScript code should work again due to the normalization of
 *      how the turn property is calculated.
 * * Optimization Update!
 * ** Updated last version's newest change to be more optimized and occur upon
 *    each iteration of a new subject being determined to account for better
 *    check timing. Update made by Yanfly.
 * 
 * Version 1.13: October 13, 2021
 * * Feature Update!
 * ** A.I. Battlers with no currently determined actions, upon the start of the
 *    time frame for what would be their action, will have one more chance of
 *    determining a new action to use as to not waste their turns.
 * ** This does NOT mean that the A.I. Battlers will adjust their actions for
 *    one with a higher rating. The readjustment will only occur if there are
 *    no actions determined for that instance and only a one time window upon
 *    the start of the time frame for what would be their action.
 * ** Update made by Arisu.
 * 
 * Version 1.12: October 7, 2021
 * * Documentation Update!
 * ** Added section "Regarding $gameTroop.turnCount() for A.I. Conditions".
 * * Feature Update!
 * ** Any A.I. Conditions found with "turnCount()" will be automatically
 *    disabled in order to reduce confusion. This is due to how turnCount()
 *    functions do not accurately depict the current Turn Count depending on
 *    when the function runs. Update made by Olivia.
 * 
 * Version 1.11: September 30, 2021
 * * Bug Fixes!
 * ** Patched up a rare occurance of predetermined actions still having
 *    priority despite having no valid targets. Fix made by Olivia.
 * 
 * Version 1.10: September 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that caused "highest" and "lowest" target schemes to be
 *    inverted. Fix made by Olivia.
 * 
 * Version 1.09: July 9, 2021
 * * Bug Fixes!
 * ** Fixed a bug that caused "highest" and "lowest" target schemes to be
 *    inverted. Fix made by Arisu.
 * 
 * Version 1.08: April 16, 2021
 * * Feature Update!
 * ** Cached randomization seeds should no longer conflict with certain scope
 *    types. Update made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: January 22, 2021
 * * Bug Fixes!
 * ** <AI Target: x> notetags should no longer crashes. Fix made by Irina.
 * 
 * Version 1.06: January 8, 2021
 * * Feature Update!
 * ** For those using classic mode with a variance level of 0, action lists
 *    will be better shuffled to provide more variation between selected
 *    skills. Update made by Irina.
 * 
 * Version 1.05: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly!
 * *** <AI Target: type>
 * **** Bypasses TGR influence in favor of picking a specific target out of a
 *      group of valid targets (does not pick from outside the valid target
 *      group) for a skill target. Read documentation to see targeting types.
 * 
 * Version 1.04: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for notetag <Reference AI: Enemy id>
 * *** - Actors are only able to use skills they would normally have access to.
 *       - Actors need to have LEARNED the skill.
 *       - Actors need to be able to access the skill's SKILL TYPE.
 *       - Actors need to have the RESOURCES to pay for the skill.
 *     - If you cannot figure out why an auto battle actor cannot use a
 *       specific skill, turn OFF auto battle and see if you can use the skill
 *       normally.
 * 
 * Version 1.03: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.02: November 1, 2020
 * * Bug Fixes!
 * ** Charmed battlers will no longer vanish when attack one another. Fix made
 *    by Yanfly.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** <All AI Conditiosn> and <Any AI Conditions> notetags are now fixed and
 *    should work properly. Fix made by Yanfly.
 *
 * Version 1.00: September 30, 2020
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
 * @param BattleAI
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
 * @text A.I. General Settings
 * @type struct<General>
 * @desc General settings pertaining to A.I.
 * @default {"AIStyle":"","ActorStyleAI:str":"classic","EnemyStyleAI:str":"classic","AILevel":"","ActorAILevel:num":"100","EnemyAILevel:num":"100","AIRating":"","ActorRatingVariance:num":"1","EnemyRatingVariance:num":"3","Reference":"","ActorAIReference:num":"0","Knowledge":"","LearnKnowledge:eval":"true","UnknownElementRate:num":"1.00"}
 *
 * @param Default:struct
 * @text A.I. Default Conditions
 * @type struct<Default>
 * @desc Give certain types of skills default conditions.
 * @default {"Enable?":"","EnableAllCon:eval":"true","EnableAnyCon:eval":"true","HpDamage":"","HpDamageAll:json":"\"\"","HpDamageAny:json":"\"Always\"","MpDamage":"","MpDamageAll:json":"\"Target MP > 0\"","MpDamageAny:json":"\"\"","HpRecover":"","HpRecoverAll:json":"\"\"","HpRecoverAny:json":"\"Target HP < Target MaxHP\"","MpRecover":"","MpRecoverAll:json":"\"\"","MpRecoverAny:json":"\"Target MP < Target MaxMP\"","HpDrain":"","HpDrainAll:json":"\"\"","HpDrainAny:json":"\"User HP < User MaxHP\"","MpDrain":"","MpDrainAll:json":"\"Target MP > 0\"","MpDrainAny:json":"\"\"","AddState":"","AddStateAll:json":"\"\"","AddStateAny:json":"\"Target Not State %1\\nTarget State %1 Turns <= 1\"","RemoveState":"","RemoveStateAll:json":"\"\"","RemoveStateAny:json":"\"Target Has State %1\"","AddBuff":"","AddBuffAll:json":"\"\"","AddBuffAny:json":"\"Target Not %1 Max Buff\\nTarget %1 Buff Turns <= 1\"","RemoveBuff":"","RemoveBuffAll:json":"\"\"","RemoveBuffAny:json":"\"Target Has %1 Buff\"","AddDebuff":"","AddDebuffAll:json":"\"\"","AddDebuffAny:json":"\"Target Not %1 Max Debuff\\nTarget %1 Debuff Turns <= 1\"","RemoveDebuff":"","RemoveDebuffAll:json":"\"\"","RemoveDebuffAny:json":"\"Target Has %1 Debuff\""}
 *
 * @param Weight:struct
 * @text A.I. => TGR Weight
 * @type struct<Weight>
 * @desc How do certain properties translate to TGR weight?
 * @default {"ElementTgr:eval":"true","ElementTgrRate:num":"1.25","EvaTgr:eval":"true","EvaTgrRate:num":"1.50","MevTgr:eval":"true","MevTgrRate:num":"2.00"}
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
 * A.I. General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param AIStyle
 * @text A.I. Style
 *
 * @param ActorStyleAI:str
 * @text Actor Style
 * @parent AIStyle
 * @type select
 * @option Classic (Rating-Based with Rating Variance)
 * @value classic
 * @option Gambit (Order-Based, Ignores Rating System)
 * @value gambit
 * @option Casual (Random but follows A.I. Conditions)
 * @value casual
 * @option Random (Pure Random, ignores A.I. Conditions)
 * @value random
 * @desc Which A.I. style do you want for referenced actors to use?
 * This does not apply to non-referenced actors.
 * @default classic
 *
 * @param EnemyStyleAI:str
 * @text Enemy Style
 * @parent AIStyle
 * @type select
 * @option Classic (Rating-Based with Rating Variance)
 * @value classic
 * @option Gambit (Order-Based, Ignores Rating System)
 * @value gambit
 * @option Casual (Random but follows A.I. Conditions)
 * @value casual
 * @option Random (Pure Random, ignores A.I. Conditions)
 * @value random
 * @desc Which A.I. style do you want for enemies to use?
 * @default classic
 *
 * @param AILevel
 * @text A.I. Level
 *
 * @param ActorAILevel:num
 * @text Actor A.I. Level
 * @parent AILevel
 * @type number
 * @min 0
 * @max 100
 * @desc Default A.I. level used for actor A.I.
 * Levels: 0-100. Higher is stricter.
 * @default 100
 *
 * @param EnemyAILevel:num
 * @text Enemy A.I. Level
 * @parent AILevel
 * @type number
 * @min 0
 * @max 100
 * @desc Default A.I. level used for enemy A.I.
 * Levels: 0-100. Higher is stricter.
 * @default 100
 *
 * @param AIRating
 * @text A.I. Ratings
 *
 * @param ActorRatingVariance:num
 * @text Actor Rating Variance
 * @parent AIRating
 * @type number
 * @min 0
 * @max 9
 * @desc How much to allow variance from the A.I. rating by?
 * 0 for no variance. Higher numbers for more variance.
 * @default 1
 *
 * @param EnemyRatingVariance:num
 * @text Enemy Rating Variance
 * @parent AIRating
 * @type number
 * @min 0
 * @max 9
 * @desc How much to allow variance from the A.I. rating by?
 * 0 for no variance. Higher numbers for more variance.
 * @default 3
 *
 * @param Reference
 *
 * @param ActorAIReference:num
 * @text Actor => AI Reference
 * @parent Reference
 * @type enemy
 * @desc Which enemy A.I. should the actor reference by default?
 * Use 0 for no references.
 * @default 0
 *
 * @param Knowledge
 *
 * @param LearnKnowledge:eval
 * @text Learn Knowledge
 * @parent Knowledge
 * @type boolean
 * @on Require
 * @off Don't Require
 * @desc Requires enemies/actors to test the knowledge of
 * the opponents before using specific conditions.
 * @default true
 *
 * @param UnknownElementRate:num
 * @text Unknown Element Rate
 * @parent LearnKnowledge:eval
 * @desc What should A.I. treat unknown element rates as?
 * @default 1.00
 * 
 * @param Experimental
 * 
 * @param OnSpotAI:eval
 * @text On-The-Spot A.I.
 * @parent Experimental
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc A.I. enemies/actors determine actions on the
 * spot when it's their turn.
 * @default false
 * 
 * @param SpotRemoveMotions:eval
 * @text No Idle Chant
 * @parent OnSpotAI:eval
 * @type boolean
 * @on Remove Idle Chanting
 * @off Allow Idle Chanting
 * @desc Requires On-The-Spot A.I. enabled. For A.I. Battlers,
 * disables idle chant motions due to inconsistency.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * A.I. Default Conditions
 * ----------------------------------------------------------------------------
 */
/*~struct~Default:
 *
 * @param Enable?
 *
 * @param EnableAllCon:eval
 * @text All Conditions
 * @parent Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Create default 'ALL' conditions for all skills
 * without any AI notetags?
 * @default true
 *
 * @param EnableAnyCon:eval
 * @text Any Conditions
 * @parent Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Create default 'ANY' conditions for all skills
 * without any AI notetags?
 * @default true
 *
 * @param HpDamage
 * @text HP Damage
 * 
 * @param HpDamageAll:json
 * @text All Conditions
 * @parent HpDamage
 * @type note
 * @desc Default 'ALL' conditions used for HP damage skills.
 * @default ""
 * 
 * @param HpDamageAny:json
 * @text Any Conditions
 * @parent HpDamage
 * @type note
 * @desc Default 'ANY' conditions used for HP damage skills.
 * @default "Always"
 *
 * @param MpDamage
 * @text MP Damage
 * 
 * @param MpDamageAll:json
 * @text All Conditions
 * @parent MpDamage
 * @type note
 * @desc Default 'ALL' conditions used for MP damage skills.
 * @default "Target MP > 0"
 *
 * @param MpDamageAny:json
 * @text Any Conditions
 * @parent MpDamage
 * @type note
 * @desc Default 'ANY' conditions used for MP damage skills.
 * @default ""
 *
 * @param HpRecover
 * @text HP Recover
 * 
 * @param HpRecoverAll:json
 * @text All Conditions
 * @parent HpRecover
 * @type note
 * @desc Default 'ALL' conditions used for HP recovery skills.
 * @default ""
 *
 * @param HpRecoverAny:json
 * @text Any Conditions
 * @parent HpRecover
 * @type note
 * @desc Default 'ANY' conditions used for HP recovery skills.
 * @default "Target HP < Target MaxHP"
 *
 * @param MpRecover
 * @text MP Recover
 * 
 * @param MpRecoverAll:json
 * @text All Conditions
 * @parent MpRecover
 * @type note
 * @desc Default 'ALL' conditions used for MP recovery skills.
 * @default ""
 *
 * @param MpRecoverAny:json
 * @text Any Conditions
 * @parent MpRecover
 * @type note
 * @desc Default 'ANY' conditions used for MP recovery skills.
 * @default "Target MP < Target MaxMP"
 *
 * @param HpDrain
 * @text HP Drain
 * 
 * @param HpDrainAll:json
 * @text All Conditions
 * @parent HpDrain
 * @type note
 * @desc Default 'ALL' conditions used for HP drain skills.
 * @default ""
 *
 * @param HpDrainAny:json
 * @text Any Conditions
 * @parent HpDrain
 * @type note
 * @desc Default 'ANY' conditions used for HP drain skills.
 * @default "User HP < User MaxHP"
 *
 * @param MpDrain
 * @text MP Drain
 * 
 * @param MpDrainAll:json
 * @text All Conditions
 * @parent MpDrain
 * @type note
 * @desc Default 'ALL' conditions used for MP drain skills.
 * @default "Target MP > 0"
 *
 * @param MpDrainAny:json
 * @text Any Conditions
 * @parent MpDrain
 * @type note
 * @desc Default 'ANY' conditions used for MP drain skills.
 * @default ""
 *
 * @param AddState
 * @text Add State
 * 
 * @param AddStateAll:json
 * @text All Conditions
 * @parent AddState
 * @type note
 * @desc Default 'ALL' conditions used for adding states.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param AddStateAny:json
 * @text Any Conditions
 * @parent AddState
 * @type note
 * @desc Default 'ANY' conditions used for adding states.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Not State %1\nTarget State %1 Turns <= 1"
 *
 * @param RemoveState
 * @text Remove State
 * 
 * @param RemoveStateAll:json
 * @text All Conditions
 * @parent RemoveState
 * @type note
 * @desc Default 'ALL' conditions used for removing states.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveStateAny:json
 * @text Any Conditions
 * @parent RemoveState
 * @type note
 * @desc Default 'ANY' conditions used for removing states.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has State %1"
 *
 * @param AddBuff
 * @text Add Buff
 * 
 * @param AddBuffAll:json
 * @text All Conditions
 * @parent AddBuff
 * @type note
 * @desc Default 'ALL' conditions used for adding buffs.
 * %1 - Dynamic values (ie param names).
 * @default ""
 *
 * @param AddBuffAny:json
 * @text Any Conditions
 * @parent AddBuff
 * @type note
 * @desc Default 'ANY' conditions used for adding buffs.
 * %1 - Dynamic values (ie param's).
 * @default "Target Not %1 Max Buff\nTarget %1 Buff Turns <= 1"
 *
 * @param RemoveBuff
 * @text Remove Buff
 * 
 * @param RemoveBuffAll:json
 * @text All Conditions
 * @parent RemoveBuff
 * @type note
 * @desc Default 'ALL' conditions used for removing buffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveBuffAny:json
 * @text Any Conditions
 * @parent RemoveBuff
 * @type note
 * @desc Default 'ANY' conditions used for removing buffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has %1 Buff"
 *
 * @param AddDebuff
 * @text Add Debuff
 * 
 * @param AddDebuffAll:json
 * @text All Conditions
 * @parent AddDebuff
 * @type note
 * @desc Default 'ALL' conditions used for adding debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param AddDebuffAny:json
 * @text Any Conditions
 * @parent AddDebuff
 * @type note
 * @desc Default 'ANY' conditions used for adding debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Not %1 Max Debuff\nTarget %1 Debuff Turns <= 1"
 *
 * @param RemoveDebuff
 * @text Remove Debuff
 * 
 * @param RemoveDebuffAll:json
 * @text All Conditions
 * @parent RemoveDebuff
 * @type note
 * @desc Default 'ALL' conditions used for removing debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveDebuffAny:json
 * @text Any Conditions
 * @parent RemoveDebuff
 * @type note
 * @desc Default 'ANY' conditions used for removing debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has %1 Debuff"
 *
 */
/* ----------------------------------------------------------------------------
 * A.I. => TGR Weight Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Weight:
 *
 * @param ElementTgr:eval
 * @text Element Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider elemental rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param ElementTgrRate:num
 * @text Influence Rate
 * @parent ElementTgr:eval
 * @desc This determines the default level of influence elemental
 * rates have on TGR weight.
 * @default 1.25
 *
 * @param EvaTgr:eval
 * @text EVA Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider EVA rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param EvaTgrRate:num
 * @text Influence Rate
 * @parent EvaTgr:eval
 * @desc This determines the default level of influence EVA
 * rates have on TGR weight.
 * @default 1.50
 *
 * @param MevTgr:eval
 * @text MEV Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider MEV rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param MevTgrRate:num
 * @text Influence Rate
 * @parent MevTgr:eval
 * @desc This determines the default level of influence MEV
 * rates have on TGR weight.
 * @default 2.00
 *
 * @param PdrTgr:eval
 * @text PDR Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider PDR rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param PdrTgrRate:num
 * @text Influence Rate
 * @parent PdrTgr:eval
 * @desc This determines the default level of influence PDR
 * rates have on TGR weight.
 * @default 1.25
 *
 * @param MdrTgr:eval
 * @text MDR Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider MDR rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param MdrTgrRate:num
 * @text Influence Rate
 * @parent MdrTgr:eval
 * @desc This determines the default level of influence MDR
 * rates have on TGR weight.
 * @default 1.50
 *
 */
//=============================================================================

function _0x3399(){const _0x1715d3=['VisuMZ_4_AggroControl','param','isDebuffAffected','canUse','filterForcedTargeting','canAttack','BattleAI','Weight','_forceAction','EnemyAILevel','AddState%1','ARRAYSTRUCT','VisuMZ_2_BattleSystemFTB','Game_Battler_turnCount','9FyclXj','isEnemy','usableSkills','isChanting','OnSpotAI','format','getEnemyIdWithName','trim','currentAction','description','randomInt','ConvertParams','%1\x20%2\x20%3','PdrTgr','determineNewValidAIAction','mhp','EVA','hpRate','randomTarget','mpRate','BattleManager_getNextSubject','VisuMZ_1_SkillsStatesCore','friendsUnit','selectAllActionsRandom','turnCount','replace','The\x20following\x20line\x20is\x20not\x20supported\x20by\x20Battle\x20A.I.:\x0a\x0a','CEV','Game_Battler_makeActions','EFFECT_REMOVE_BUFF','prototype','forcedTargets','MevTgr','ARRAYJSON','isMagical','1296276TWcOhE','getStateIdWithName','MAT','aiStyle','_regexp','damage','isForOpponentBattleCore','doesAIApplyElementalTgrInfluence','The\x20reason\x20is\x20due\x20to\x20the\x20turnCount()\x20function.\x0a','selectAction','AGI','setup','includes','4144nCBleH','FDR','match','aiRatingVariance','EvaTgr','subject','clearAIKnowledge','_elementIDs','Game_Battler_isChanting','remove','isForOpponent','EnableAnyCon','176524nagGDt','mevRates','VisuMZ_2_BattleGridSystem','hasValidTargets','rating','_stateTurns','UnknownElementRate','concat','_stateIDs','addAIKnowledge','doesAIApplyEvaTgrInfluence','initialize','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','noCondition','bypassElementTgr','VisuMZ_2_BattleSystemSTB','aiTarget','JSON','ActorStyleAI','bypassPdrTgr','GRD','aiApplyPdrTgrInfluenceRate','USER','aliveMembers','value2','11tePvDW','bypassMdrTgr','LAST','makeDefaultConditions','makeValidTargets','elementInfluence','itemTargetCandidates','EvaTgrRate','General','EVAL','toUpperCase','VisuMZ_1_ElementStatusCore','ActorAIReference','action','EFFECT_ADD_STATE','mdrInfluenceRate','meetsHpCondition','RemoveBuff%1','Game_Battler_onBattleEnd','isForNotUser','Game_Action_apply','debuff','EFFECT_REMOVE_STATE','aiEvaTgr','BattleManager_endAction','determineTargetActionByAIisStillValid','aiLevel','MpDamage%1','Game_Action_isForOpponentBattleCore','clamp','Game_Enemy_isActionValid','mevInfluenceRate','setEnemyAction','selectAllActionsClassic','isFTB','doesTargetMeetAnyConditions','setAiTgrInfluences','Game_Troop_setup','STR','slice','elementId','states','actorId','mev','MAXHP','hasElementAIKnowledge','isForDeadFriend','aiApplyMevTgrInfluenceRate','allCondition','hasForcedTargets','apply','addXParamAIKnowledge','anyCondition','in\x20order\x20for\x20VisuMZ_3_BattleAI\x20to\x20work.','casual','random','canGuard','Game_Battler_onAllActionsEnd','MpRecover%1','exit','MEV','elementRate','createFilterTarget','meetsPartyLevelCondition','evaInfluenceRate','clearActions','elementKnowledgeRate','Game_Unit_initialize','_subject','Game_BattlerBase_sparam','highestTgrMember','clearForcedTargets','MAXMP','sparam','skillId','Game_Action_makeTargets','guardSkillId','filter','1413104pBGgDc','map','ALWAYS','6684XZtvOl','MCR','ARRAYEVAL','doesAIApplyMdrTgrInfluence','ARRAYSTR','isStateAffected','642412dhnNtJ','POSITIVE','indexOf','note','parse','numActions','aiMdrTgr','isForAnyoneFocusFriends','_applyAIForcedTargetFilters','This\x20is\x20a\x20static\x20class','MP%','Any','onAllActionsEnd','MAXTP','isActor','MAX_SAFE_INTEGER','SpotRemoveMotions','doesTargetMeetAIConditions','isForAnyone','length','Game_Action_itemTargetCandidates','Game_Battler_onBattleStart','checkTeamBasedTurnCountAI','meetsTurnCondition','Game_Unit_randomTarget','aiApplyEvaTgrInfluenceRate','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','isPhysical','currentClass','NEGATIVE\x20STATE\x20COUNT','scope','statesByCategory','NEGATIVE','makeDeepCopy','clearAiTgrInfluence','is%1Affected','makeActions','HP%','POSITIVE\x20STATE\x20COUNT','ElementTgrRate','name','ATK','MdrTgrRate','referenceEnemyForAI','Game_Temp_initialize','determineActionByAIisStillValid','tpRate','isDetermineActionByAI','CRI','AI\x20Manager\x20condition\x20cannot\x20be\x20met:\x20%1','HpDrain%1','applyBattleAiTgrInfluences','opponentsUnit','getAnyConditions','REC','getDefaultAnyConditions','makeAutoBattleActionsWithEnemyAI','selectAllActions','setSkill','value1','removeOncePerTurnAction','doesTargetMeetCondition','MDF','_aiKnowledge','ARRAYFUNC','_bypassAiValidCheck','6HZbrrM','needsSelection','HIGHEST','Game_Actor_makeAutoBattleActions','applyBattleAI','DEF','isSkill','split','HpRecover%1','die','EFFECT_RECOVER_HP','max','LearnKnowledge','aiApplyElementalTgrInfluenceRate','_forceValidTargets','aiKnowledge','log','isConfused','doesAIApplyMevTgrInfluence','25fTCuJS','doesTargetMeetAllConditions','version','checkSkillTargets','isConditionalAI','actions','For\x20more\x20information,\x20view\x20the\x20help\x20file.','isForAnyoneFocusOpponents','isTpb','elementRates','isAggroAffected','attackElements','maxTp','ShuffleArray','EXR','hasXParamAIKnowledge','isBuffAffected','VisuMZ_2_BattleSystemPTB','MRF','MdrTgr','effects','gambit','call','level','elementIds','buff','_aiTgrInfluence','RemoveDebuff%1','getAllConditions','status','isActionValid','_onSpotMadeActionsDeterminedByAI','push','user','_alertTurnCount','dataId','elements','CNT','eva','xparam','aiElementTgr','isSTB','code','LUK','VisuMZ_2_AggroControlSystem','MRG','EnemyStyleAI','addElementAIKnowledge','MDR','enemy','getDefaultAllConditions','item','enemyId','ARRAYNUM','value','floor','charAt','Game_BattlerBase_revive','STATE\x20COUNT','toLowerCase','actor','revive','onBattleEnd','Settings','determineLineValue','_buffTurns','_rngChance','Default','isAutoBattle','FIRST','classic','passesAILevel','PdrTgrRate','meetsMpCondition','PHA','isPlaytest','meetsStateCondition','EnemyRatingVariance','mdr','endAction','5346690geGdLH','forceValidTargets','startAction','isForEveryone','makeTargets','PDR','NUM','bypassMevTgr','makeAutoBattleActions','Game_Unit_aliveMembers','TCR','MpDrain%1','aiTgrInfluence','selectAllActionsGambit','return\x200','isMax%1Affected','MevTgrRate','aiApplyMdrTgrInfluenceRate','36530WZrjQn','isForBattleGrid','meetsSwitchCondition','doesAIApplyPdrTgrInfluence','Game_BattlerBase_die'];_0x3399=function(){return _0x1715d3;};return _0x3399();}function _0x354b(_0x5b1654,_0xc262f2){const _0x339912=_0x3399();return _0x354b=function(_0x354bc0,_0x145b70){_0x354bc0=_0x354bc0-0xf9;let _0x2bdbaf=_0x339912[_0x354bc0];return _0x2bdbaf;},_0x354b(_0x5b1654,_0xc262f2);}const _0x410580=_0x354b;(function(_0x57d6eb,_0x4e85f6){const _0x53281a=_0x354b,_0x323ff3=_0x57d6eb();while(!![]){try{const _0x248585=-parseInt(_0x53281a(0x193))/0x1+parseInt(_0x53281a(0x252))/0x2*(parseInt(_0x53281a(0x11e))/0x3)+parseInt(_0x53281a(0x1e2))/0x4*(parseInt(_0x53281a(0x131))/0x5)+-parseInt(_0x53281a(0x24c))/0x6*(parseInt(_0x53281a(0x1d6))/0x7)+-parseInt(_0x53281a(0x249))/0x8+parseInt(_0x53281a(0x1a6))/0x9*(parseInt(_0x53281a(0x181))/0xa)+-parseInt(_0x53281a(0x1fb))/0xb*(parseInt(_0x53281a(0x1c9))/0xc);if(_0x248585===_0x4e85f6)break;else _0x323ff3['push'](_0x323ff3['shift']());}catch(_0x3b07c0){_0x323ff3['push'](_0x323ff3['shift']());}}}(_0x3399,0x65d21));var label=_0x410580(0x19e),tier=tier||0x0,dependencies=['VisuMZ_1_BattleCore'],pluginData=$plugins[_0x410580(0x248)](function(_0x171b74){const _0x1d584f=_0x410580;return _0x171b74[_0x1d584f(0x14e)]&&_0x171b74[_0x1d584f(0x1af)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x410580(0x170)]=VisuMZ[label][_0x410580(0x170)]||{},VisuMZ[_0x410580(0x1b1)]=function(_0x6c84f7,_0x30eb8a){const _0x5d8462=_0x410580;for(const _0x303a14 in _0x30eb8a){if(_0x303a14[_0x5d8462(0x1d8)](/(.*):(.*)/i)){const _0x379d16=String(RegExp['$1']),_0xa26415=String(RegExp['$2'])[_0x5d8462(0x205)]()[_0x5d8462(0x1ad)]();let _0x4a1d95,_0xd5c857,_0x3bbdd1;switch(_0xa26415){case _0x5d8462(0x187):_0x4a1d95=_0x30eb8a[_0x303a14]!==''?Number(_0x30eb8a[_0x303a14]):0x0;break;case _0x5d8462(0x166):_0xd5c857=_0x30eb8a[_0x303a14]!==''?JSON[_0x5d8462(0x256)](_0x30eb8a[_0x303a14]):[],_0x4a1d95=_0xd5c857[_0x5d8462(0x24a)](_0xbf6ab9=>Number(_0xbf6ab9));break;case _0x5d8462(0x204):_0x4a1d95=_0x30eb8a[_0x303a14]!==''?eval(_0x30eb8a[_0x303a14]):null;break;case _0x5d8462(0x24e):_0xd5c857=_0x30eb8a[_0x303a14]!==''?JSON[_0x5d8462(0x256)](_0x30eb8a[_0x303a14]):[],_0x4a1d95=_0xd5c857['map'](_0x35e98f=>eval(_0x35e98f));break;case _0x5d8462(0x1f3):_0x4a1d95=_0x30eb8a[_0x303a14]!==''?JSON[_0x5d8462(0x256)](_0x30eb8a[_0x303a14]):'';break;case _0x5d8462(0x1c7):_0xd5c857=_0x30eb8a[_0x303a14]!==''?JSON[_0x5d8462(0x256)](_0x30eb8a[_0x303a14]):[],_0x4a1d95=_0xd5c857[_0x5d8462(0x24a)](_0x43b241=>JSON[_0x5d8462(0x256)](_0x43b241));break;case'FUNC':_0x4a1d95=_0x30eb8a[_0x303a14]!==''?new Function(JSON[_0x5d8462(0x256)](_0x30eb8a[_0x303a14])):new Function(_0x5d8462(0x18f));break;case _0x5d8462(0x11c):_0xd5c857=_0x30eb8a[_0x303a14]!==''?JSON[_0x5d8462(0x256)](_0x30eb8a[_0x303a14]):[],_0x4a1d95=_0xd5c857['map'](_0x5af3ec=>new Function(JSON[_0x5d8462(0x256)](_0x5af3ec)));break;case _0x5d8462(0x221):_0x4a1d95=_0x30eb8a[_0x303a14]!==''?String(_0x30eb8a[_0x303a14]):'';break;case _0x5d8462(0x250):_0xd5c857=_0x30eb8a[_0x303a14]!==''?JSON['parse'](_0x30eb8a[_0x303a14]):[],_0x4a1d95=_0xd5c857['map'](_0x219085=>String(_0x219085));break;case'STRUCT':_0x3bbdd1=_0x30eb8a[_0x303a14]!==''?JSON[_0x5d8462(0x256)](_0x30eb8a[_0x303a14]):{},_0x4a1d95=VisuMZ[_0x5d8462(0x1b1)]({},_0x3bbdd1);break;case _0x5d8462(0x1a3):_0xd5c857=_0x30eb8a[_0x303a14]!==''?JSON['parse'](_0x30eb8a[_0x303a14]):[],_0x4a1d95=_0xd5c857[_0x5d8462(0x24a)](_0x4565db=>VisuMZ['ConvertParams']({},JSON[_0x5d8462(0x256)](_0x4565db)));break;default:continue;}_0x6c84f7[_0x379d16]=_0x4a1d95;}}return _0x6c84f7;},(_0x1d4211=>{const _0x432b95=_0x410580,_0x2878a5=_0x1d4211[_0x432b95(0x104)];for(const _0x31f1f3 of dependencies){if(!Imported[_0x31f1f3]){alert(_0x432b95(0x26c)[_0x432b95(0x1ab)](_0x2878a5,_0x31f1f3)),SceneManager[_0x432b95(0x236)]();break;}}const _0x212e5e=_0x1d4211[_0x432b95(0x1af)];if(_0x212e5e[_0x432b95(0x1d8)](/\[Version[ ](.*?)\]/i)){const _0x40f5a8=Number(RegExp['$1']);_0x40f5a8!==VisuMZ[label][_0x432b95(0x133)]&&(alert(_0x432b95(0x1ee)['format'](_0x2878a5,_0x40f5a8)),SceneManager[_0x432b95(0x236)]());}if(_0x212e5e[_0x432b95(0x1d8)](/\[Tier[ ](\d+)\]/i)){const _0x57af28=Number(RegExp['$1']);_0x57af28<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x432b95(0x1ab)](_0x2878a5,_0x57af28,tier)),SceneManager[_0x432b95(0x236)]()):tier=Math[_0x432b95(0x129)](_0x57af28,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x432b95(0x170)],_0x1d4211['parameters']);})(pluginData);function AIManager(){const _0xbf3c20=_0x410580;throw new Error(_0xbf3c20(0x25b));}AIManager[_0x410580(0x1cd)]={'noCondition':/<NO AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'allCondition':/<ALL AI (?:TARGETS|CONDITION|CONDITIONS)>\s*([\s\S]*)\s*<\/ALL AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'anyCondition':/<ANY AI (?:TARGETS|CONDITION|CONDITIONS)>\s*([\s\S]*)\s*<\/ANY AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'bypassElementTgr':/<(?:NO|BYPASS) AI (?:ELEMENT|ELEMENTAL|ELEMENT RATE) INFLUENCE>/i,'bypassEvaTgr':/<(?:NO|BYPASS) AI (?:EVA|EVASION) INFLUENCE>/i,'bypassMevTgr':/<(?:NO|BYPASS) AI (?:MEV|MAGIC EVASION) INFLUENCE>/i,'bypassPdrTgr':/<(?:NO|BYPASS) AI (?:PDR|PHYSICAL DAMAGE RATE) INFLUENCE>/i,'bypassMdrTgr':/<(?:NO|BYPASS) AI (?:MDR|MAGICAL DAMAGE RATE) INFLUENCE>/i,'aiElementTgr':/<AI (?:ELEMENT|ELEMENTAL|ELEMENT RATE) INFLUENCE: (.*)>/i,'aiEvaTgr':/<AI (?:EVA|EVASION) INFLUENCE: (.*)>/i,'aiMevTgr':/<AI (?:MEV|MAGIC EVASION) INFLUENCE: (.*)>/i,'aiPdrTgr':/<AI (?:PDR|PHYSICAL DAMAGE RATE) INFLUENCE: (.*)>/i,'aiMdrTgr':/<AI (?:MDR|MAGICAL DAMAGE RATE) INFLUENCE: (.*)>/i,'aiLevel':/<AI LEVEL: (\d+)>/i,'aiRatingVariance':/<AI RATING VARIANCE: (\d+)>/i,'aiTarget':/<AI (?:TARGET|TARGETS):[ ](.*)>/i,'aiStyle':/<AI STYLE:[ ](.*)>/i},AIManager[_0x410580(0x135)]=function(_0x47a743){const _0x15f38b=_0x410580;if(!_0x47a743)return![];return this[_0x15f38b(0x14d)](_0x47a743)[_0x15f38b(0x265)]>0x0||this['getAnyConditions'](_0x47a743)[_0x15f38b(0x265)]>0x0;},AIManager[_0x410580(0x14d)]=function(_0x31163e){const _0x5ae4e9=_0x410580;if(_0x31163e[_0x5ae4e9(0x255)][_0x5ae4e9(0x1d8)](AIManager[_0x5ae4e9(0x1cd)]['noCondition']))return[];else return _0x31163e[_0x5ae4e9(0x255)]['match'](AIManager[_0x5ae4e9(0x1cd)][_0x5ae4e9(0x22b)])?String(RegExp['$1'])['split'](/[\r\n]+/)['remove'](''):this[_0x5ae4e9(0x163)](_0x31163e);},AIManager['getAnyConditions']=function(_0x27d430){const _0x4a626d=_0x410580;if(_0x27d430[_0x4a626d(0x255)][_0x4a626d(0x1d8)](AIManager[_0x4a626d(0x1cd)][_0x4a626d(0x1ef)]))return[];else return _0x27d430[_0x4a626d(0x255)][_0x4a626d(0x1d8)](AIManager[_0x4a626d(0x1cd)][_0x4a626d(0x22f)])?String(RegExp['$1'])[_0x4a626d(0x125)](/[\r\n]+/)[_0x4a626d(0x1df)](''):this['getDefaultAnyConditions'](_0x27d430);},AIManager[_0x410580(0x163)]=function(_0x4be535){const _0x477377=_0x410580;if(!VisuMZ['BattleAI'][_0x477377(0x170)]['Default']['EnableAllCon'])return[];if(_0x4be535['note'][_0x477377(0x1d8)](AIManager['_regexp'][_0x477377(0x22f)]))return[];return this[_0x477377(0x1fe)](_0x4be535,'All');},AIManager[_0x410580(0x113)]=function(_0x915420){const _0x379db9=_0x410580;if(!VisuMZ[_0x379db9(0x19e)]['Settings'][_0x379db9(0x174)][_0x379db9(0x1e1)])return[];if(_0x915420[_0x379db9(0x255)][_0x379db9(0x1d8)](AIManager[_0x379db9(0x1cd)][_0x379db9(0x22b)]))return[];return this['makeDefaultConditions'](_0x915420,_0x379db9(0x25d));},AIManager['makeDefaultConditions']=function(_0x3745bf,_0x12342b){const _0x5152bb=_0x410580;if(!_0x3745bf)return[];const _0x1dbb1d=VisuMZ[_0x5152bb(0x19e)][_0x5152bb(0x170)][_0x5152bb(0x174)],_0x35f335=[_0x5152bb(0x227),'MAXMP',_0x5152bb(0x105),_0x5152bb(0x123),_0x5152bb(0x1cb),_0x5152bb(0x11a),'AGI',_0x5152bb(0x15c)],_0x25062c=_0x3745bf['damage']['type'],_0x11b3f6=_0x3745bf[_0x5152bb(0x145)];let _0x176dd6=[],_0x188f5a='',_0x3bbd5b='';switch(_0x25062c){case 0x1:_0x188f5a='HpDamage%1'[_0x5152bb(0x1ab)](_0x12342b),_0x3bbd5b=_0x1dbb1d[_0x188f5a],_0x176dd6=_0x176dd6[_0x5152bb(0x1e9)](_0x3bbd5b[_0x5152bb(0x125)](/[\r\n]+/)['remove'](''));break;case 0x2:_0x188f5a=_0x5152bb(0x216)[_0x5152bb(0x1ab)](_0x12342b),_0x3bbd5b=_0x1dbb1d[_0x188f5a],_0x176dd6=_0x176dd6[_0x5152bb(0x1e9)](_0x3bbd5b['split'](/[\r\n]+/)['remove'](''));break;case 0x3:_0x188f5a=_0x5152bb(0x126)['format'](_0x12342b),_0x3bbd5b=_0x1dbb1d[_0x188f5a],_0x176dd6=_0x176dd6[_0x5152bb(0x1e9)](_0x3bbd5b['split'](/[\r\n]+/)[_0x5152bb(0x1df)](''));break;case 0x4:_0x188f5a='MpRecover%1'[_0x5152bb(0x1ab)](_0x12342b),_0x3bbd5b=_0x1dbb1d[_0x188f5a],_0x176dd6=_0x176dd6['concat'](_0x3bbd5b['split'](/[\r\n]+/)[_0x5152bb(0x1df)](''));break;case 0x5:_0x188f5a=_0x5152bb(0x10e)[_0x5152bb(0x1ab)](_0x12342b),_0x3bbd5b=_0x1dbb1d[_0x188f5a],_0x176dd6=_0x176dd6[_0x5152bb(0x1e9)](_0x3bbd5b[_0x5152bb(0x125)](/[\r\n]+/)[_0x5152bb(0x1df)](''));break;case 0x6:_0x188f5a=_0x5152bb(0x18c)[_0x5152bb(0x1ab)](_0x12342b),_0x3bbd5b=_0x1dbb1d[_0x188f5a],_0x176dd6=_0x176dd6[_0x5152bb(0x1e9)](_0x3bbd5b[_0x5152bb(0x125)](/[\r\n]+/)[_0x5152bb(0x1df)](''));break;}for(const _0x2707b6 of _0x11b3f6){if(!_0x2707b6)continue;switch(_0x2707b6[_0x5152bb(0x15b)]){case Game_Action[_0x5152bb(0x128)]:if(_0x2707b6[_0x5152bb(0x117)]>0x0||_0x2707b6[_0x5152bb(0x1fa)]>0x0)_0x188f5a=_0x5152bb(0x126)[_0x5152bb(0x1ab)](_0x12342b),_0x3bbd5b=_0x1dbb1d[_0x188f5a],_0x176dd6=_0x176dd6['concat'](_0x3bbd5b[_0x5152bb(0x125)](/[\r\n]+/)[_0x5152bb(0x1df)](''));else(_0x2707b6['value1']<0x0||_0x2707b6[_0x5152bb(0x1fa)]<0x0)&&(_0x188f5a='HpDamage%1'['format'](_0x12342b),_0x3bbd5b=_0x1dbb1d[_0x188f5a],_0x176dd6=_0x176dd6[_0x5152bb(0x1e9)](_0x3bbd5b[_0x5152bb(0x125)](/[\r\n]+/)[_0x5152bb(0x1df)]('')));break;case Game_Action['EFFECT_RECOVER_MP']:if(_0x2707b6[_0x5152bb(0x117)]>0x0||_0x2707b6[_0x5152bb(0x1fa)]>0x0)_0x188f5a=_0x5152bb(0x235)[_0x5152bb(0x1ab)](_0x12342b),_0x3bbd5b=_0x1dbb1d[_0x188f5a],_0x176dd6=_0x176dd6[_0x5152bb(0x1e9)](_0x3bbd5b[_0x5152bb(0x125)](/[\r\n]+/)[_0x5152bb(0x1df)](''));else(_0x2707b6['value1']<0x0||_0x2707b6[_0x5152bb(0x1fa)]<0x0)&&(_0x188f5a=_0x5152bb(0x216)[_0x5152bb(0x1ab)](_0x12342b),_0x3bbd5b=_0x1dbb1d[_0x188f5a],_0x176dd6=_0x176dd6[_0x5152bb(0x1e9)](_0x3bbd5b['split'](/[\r\n]+/)[_0x5152bb(0x1df)]('')));break;case Game_Action[_0x5152bb(0x209)]:if(_0x2707b6[_0x5152bb(0x154)]===0x0)continue;_0x188f5a=_0x5152bb(0x1a2)['format'](_0x12342b),_0x3bbd5b=_0x1dbb1d[_0x188f5a][_0x5152bb(0x1ab)](_0x2707b6[_0x5152bb(0x154)]),_0x176dd6=_0x176dd6[_0x5152bb(0x1e9)](_0x3bbd5b[_0x5152bb(0x125)](/[\r\n]+/)['remove'](''));break;case Game_Action[_0x5152bb(0x211)]:_0x188f5a='RemoveState%1'[_0x5152bb(0x1ab)](_0x12342b),_0x3bbd5b=_0x1dbb1d[_0x188f5a]['format'](_0x2707b6[_0x5152bb(0x154)]),_0x176dd6=_0x176dd6[_0x5152bb(0x1e9)](_0x3bbd5b['split'](/[\r\n]+/)[_0x5152bb(0x1df)](''));break;case Game_Action['EFFECT_ADD_BUFF']:_0x188f5a='AddBuff%1'['format'](_0x12342b),_0x3bbd5b=_0x1dbb1d[_0x188f5a][_0x5152bb(0x1ab)](_0x35f335[_0x2707b6['dataId']]),_0x176dd6=_0x176dd6[_0x5152bb(0x1e9)](_0x3bbd5b[_0x5152bb(0x125)](/[\r\n]+/)[_0x5152bb(0x1df)](''));break;case Game_Action['EFFECT_ADD_DEBUFF']:_0x188f5a='AddDebuff%1'[_0x5152bb(0x1ab)](_0x12342b),_0x3bbd5b=_0x1dbb1d[_0x188f5a][_0x5152bb(0x1ab)](_0x35f335[_0x2707b6[_0x5152bb(0x154)]]),_0x176dd6=_0x176dd6[_0x5152bb(0x1e9)](_0x3bbd5b['split'](/[\r\n]+/)['remove'](''));break;case Game_Action[_0x5152bb(0x1c3)]:_0x188f5a=_0x5152bb(0x20c)[_0x5152bb(0x1ab)](_0x12342b),_0x3bbd5b=_0x1dbb1d[_0x188f5a][_0x5152bb(0x1ab)](_0x35f335[_0x2707b6['dataId']]),_0x176dd6=_0x176dd6['concat'](_0x3bbd5b[_0x5152bb(0x125)](/[\r\n]+/)[_0x5152bb(0x1df)](''));break;case Game_Action['EFFECT_REMOVE_DEBUFF']:_0x188f5a=_0x5152bb(0x14c)['format'](_0x12342b),_0x3bbd5b=_0x1dbb1d[_0x188f5a][_0x5152bb(0x1ab)](_0x35f335[_0x2707b6[_0x5152bb(0x154)]]),_0x176dd6=_0x176dd6[_0x5152bb(0x1e9)](_0x3bbd5b[_0x5152bb(0x125)](/[\r\n]+/)[_0x5152bb(0x1df)](''));break;}}return _0x176dd6;},AIManager[_0x410580(0x182)]=function(_0x499a3f,_0x47550e){const _0x5f1378=_0x410580;this[_0x5f1378(0x12c)]=this[_0x5f1378(0x1ff)](_0x499a3f,_0x47550e);},AIManager['clearForcedTargets']=function(){const _0x1a8693=_0x410580;this[_0x1a8693(0x12c)]=[];},AIManager[_0x410580(0x1c5)]=function(){const _0x26986f=_0x410580;return this[_0x26986f(0x12c)]=this[_0x26986f(0x12c)]||[],this[_0x26986f(0x12c)];},AIManager[_0x410580(0x22c)]=function(){const _0x5436b9=_0x410580;return this[_0x5436b9(0x1c5)]()[_0x5436b9(0x265)]>0x0;},AIManager[_0x410580(0x1e5)]=function(_0x4ca474,_0x3235ac){const _0x419b3c=_0x410580;if(!_0x4ca474)return![];if(!_0x3235ac)return![];if(!DataManager[_0x419b3c(0x124)](_0x3235ac))return;return this['isConditionalAI'](_0x3235ac)?this[_0x419b3c(0x1ff)](_0x4ca474,_0x3235ac)['length']>=0x1:!![];},AIManager[_0x410580(0x1ff)]=function(_0x32984e,_0xbdaa9){const _0x2f8566=_0x410580;let _0x5f05ed=[];if(this['isConditionalAI'](_0xbdaa9)){const _0x1a4a8a=this[_0x2f8566(0x14d)](_0xbdaa9),_0x459dce=this[_0x2f8566(0x111)](_0xbdaa9),_0x19d81b=new Game_Action(_0x32984e);_0x19d81b[_0x2f8566(0x116)](_0xbdaa9['id']);let _0x50a34b=AIManager[_0x2f8566(0x134)](_0x32984e,_0x19d81b);this[_0x2f8566(0x173)]=Math[_0x2f8566(0x232)](),_0x5f05ed=_0x50a34b[_0x2f8566(0x248)](_0x306b85=>this[_0x2f8566(0x263)](_0x32984e,_0x306b85,_0xbdaa9,_0x1a4a8a,_0x459dce));}return _0x5f05ed;},AIManager[_0x410580(0x134)]=function(_0x2a38b0,_0x363da7){const _0x65d49b=_0x410580;let _0x1b6e56=[];if(Imported[_0x65d49b(0x15d)]&&_0x363da7[_0x65d49b(0x13b)]()){const _0x5e23c2=_0x363da7[_0x65d49b(0x1e0)]()?_0x2a38b0['opponentsUnit']():_0x2a38b0['friendsUnit']();_0x1b6e56=[_0x5e23c2[_0x65d49b(0x241)]()];}else{if(_0x363da7[_0x65d49b(0x184)]())_0x1b6e56=$gameParty['aliveMembers']()[_0x65d49b(0x1e9)]($gameTroop[_0x65d49b(0x1f9)]());else{if(_0x363da7[_0x65d49b(0x264)]&&_0x363da7[_0x65d49b(0x264)]()){const _0x113b57=_0x363da7[_0x65d49b(0x164)]()['scope'];if(_0x363da7[_0x65d49b(0x138)]())_0x1b6e56=_0x2a38b0[_0x65d49b(0x110)]()['aliveMembers']();else _0x363da7[_0x65d49b(0x259)]()&&(_0x1b6e56=_0x2a38b0[_0x65d49b(0x1bc)]()[_0x65d49b(0x1f9)]());}else{if(_0x363da7[_0x65d49b(0x1e0)]())_0x1b6e56=_0x2a38b0[_0x65d49b(0x110)]()[_0x65d49b(0x1f9)]();else{if(_0x363da7['isForDeadFriend']())_0x1b6e56=_0x2a38b0[_0x65d49b(0x1bc)]()['deadMembers']();else _0x363da7['isForFriend']()&&!_0x363da7[_0x65d49b(0x229)]()&&(_0x1b6e56=_0x2a38b0[_0x65d49b(0x1bc)]()[_0x65d49b(0x1f9)]());}}}}return _0x363da7['isForNotUser']&&_0x363da7[_0x65d49b(0x20e)]()&&_0x1b6e56['remove'](_0x2a38b0),_0x1b6e56;},AIManager['doesTargetMeetAIConditions']=function(_0x49b73a,_0x2fcfe4,_0x3f772f,_0x16acb4,_0x592ae8){const _0xafd1d8=_0x410580;return this[_0xafd1d8(0x132)](_0x49b73a,_0x2fcfe4,_0x3f772f,_0x16acb4)&&this[_0xafd1d8(0x21e)](_0x49b73a,_0x2fcfe4,_0x3f772f,_0x592ae8);},AIManager[_0x410580(0x132)]=function(_0x545bee,_0x335b7f,_0x58d21d,_0x52facb){const _0x4a3b66=_0x410580;if(_0x52facb['length']<=0x0)return!![];for(const _0x2374c9 of _0x52facb){if(!_0x2374c9)continue;if(_0x2374c9['length']<=0x0)continue;if(!this['passesAILevel'](_0x545bee))return!![];if(!this[_0x4a3b66(0x119)](_0x545bee,_0x335b7f,_0x58d21d,_0x2374c9))return![];}return!![];},AIManager['doesTargetMeetAnyConditions']=function(_0x59fe1f,_0x228a52,_0x3a3717,_0x525e54){const _0x22dddc=_0x410580;if(_0x525e54['length']<=0x0)return!![];for(const _0x100d7a of _0x525e54){if(!_0x100d7a)continue;if(_0x100d7a['length']<=0x0)continue;if(!this[_0x22dddc(0x178)](_0x59fe1f))return!![];if(this[_0x22dddc(0x119)](_0x59fe1f,_0x228a52,_0x3a3717,_0x100d7a))return!![];}return![];},AIManager['passesAILevel']=function(_0x420eb7){const _0x1a2994=_0x410580,_0x1a1c1c=_0x420eb7[_0x1a2994(0x215)]();return Math[_0x1a2994(0x1b0)](0x64)<_0x1a1c1c;},AIManager[_0x410580(0x119)]=function(_0x42ad68,_0x1c55e4,_0x481a9a,_0x59304f){const _0x12c887=_0x410580,_0x19c041=[_0x12c887(0x227),_0x12c887(0x243),_0x12c887(0x105),_0x12c887(0x123),_0x12c887(0x1cb),_0x12c887(0x11a),_0x12c887(0x1d3),_0x12c887(0x15c)];if(_0x59304f['toUpperCase']()[_0x12c887(0x1ad)]()===_0x12c887(0x24b))return!![];const _0xfc1fb8=_0x42ad68;if(!VisuMZ[_0x12c887(0x19e)][_0x12c887(0x170)][_0x12c887(0x203)][_0x12c887(0x1aa)]){if(_0x59304f['match'](/turnCount\(\)/i)){if($gameTemp['isPlaytest']()&&!this[_0x12c887(0x153)]){let _0x31bdee=_0x12c887(0x1c0);_0x31bdee+=_0x59304f+'\x0a\x0a',_0x31bdee+=_0x12c887(0x1d1),_0x31bdee+=_0x12c887(0x137),alert(_0x31bdee),this[_0x12c887(0x153)]=!![];}return![];}}if(_0x59304f[_0x12c887(0x1d8)](/(.*) (\>=|\>|===|!==|\<|\<=) (.*)/i)){const _0x42bc4c=[String(RegExp['$1']),String(RegExp['$2']),String(RegExp['$3'])],_0x49d230=this['determineLineValue'](_0x42ad68,_0x1c55e4,_0x481a9a,_0x42bc4c[0x0]),_0x28fcb9=_0x42bc4c[0x1],_0x201941=this['determineLineValue'](_0x42ad68,_0x1c55e4,_0x481a9a,_0x42bc4c[0x2]);window[_0x12c887(0x152)]=window['a']=window['b']=undefined;const _0x4d325e=_0x12c887(0x1b2)['format'](_0x49d230,_0x28fcb9,_0x201941);try{return eval(_0x4d325e);}catch(_0x3e9aca){return $gameTemp[_0x12c887(0x17c)]()&&(console[_0x12c887(0x12e)](_0x12c887(0x10d)[_0x12c887(0x1ab)](_0x59304f)),console['log'](_0x3e9aca)),!![];}}else{if(_0x59304f[_0x12c887(0x1d8)](/(\d+\.?\d*)([%％]) CHANCE/i)){const _0x4ec3bd=Number(RegExp['$1'])*0.01;return this['_rngChance']<_0x4ec3bd;}else{if(_0x59304f[_0x12c887(0x1d8)](/SWITCH (\d+) (ON|OFF|TRUE|FALSE)/i)){const _0x3cde93=Number(RegExp['$1']),_0x4c56f7=String(RegExp['$2'])[_0x12c887(0x16c)](),_0x241ed1=_0x4c56f7[_0x12c887(0x1d8)](/ON|TRUE/i);return $gameSwitches['value'](_0x3cde93)===_0x241ed1;}else{if(_0x59304f[_0x12c887(0x1d8)](/(.*) IS ACTOR/i)){const _0x9a6148=String(RegExp['$1'])[_0x12c887(0x1d8)](/(?:USER|SUBJECT)/i)?_0xfc1fb8:_0x1c55e4;return _0x9a6148[_0x12c887(0x260)]();}else{if(_0x59304f[_0x12c887(0x1d8)](/(.*) IS ENEMY/i)){const _0x48b961=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0xfc1fb8:_0x1c55e4;return _0x48b961['isEnemy']();}else{if(_0x59304f[_0x12c887(0x1d8)](/(.*) HAS STATE (\d+)/i)){const _0x705cbf=$dataStates[Number(RegExp['$2'])],_0x392255=String(RegExp['$1'])[_0x12c887(0x1d8)](/(?:USER|SUBJECT)/i)?_0xfc1fb8:_0x1c55e4;return _0x392255[_0x12c887(0x224)]()[_0x12c887(0x1d5)](_0x705cbf);}else{if(_0x59304f[_0x12c887(0x1d8)](/(.*) HAS STATE (.*)/i)){const _0x595ee1=$dataStates[DataManager['getStateIdWithName'](RegExp['$2'])],_0x3992ae=String(RegExp['$1'])[_0x12c887(0x1d8)](/(?:USER|SUBJECT)/i)?_0xfc1fb8:_0x1c55e4;return _0x3992ae['states']()[_0x12c887(0x1d5)](_0x595ee1);}else{if(_0x59304f[_0x12c887(0x1d8)](/(.*) NOT STATE (\d+)/i)){const _0x1112f6=$dataStates[Number(RegExp['$2'])],_0x1919b4=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0xfc1fb8:_0x1c55e4;return!_0x1919b4[_0x12c887(0x224)]()[_0x12c887(0x1d5)](_0x1112f6);}else{if(_0x59304f[_0x12c887(0x1d8)](/(.*) NOT STATE (.*)/i)){const _0x3794b0=$dataStates[DataManager[_0x12c887(0x1ca)](RegExp['$2'])],_0x103e08=String(RegExp['$1'])[_0x12c887(0x1d8)](/(?:USER|SUBJECT)/i)?_0xfc1fb8:_0x1c55e4;return!_0x103e08['states']()[_0x12c887(0x1d5)](_0x3794b0);}else{if(_0x59304f[_0x12c887(0x1d8)](/(.*) HAS (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF)/i)){const _0x344bd8=_0x19c041['indexOf'](String(RegExp['$2'])[_0x12c887(0x205)]()['trim']()),_0x4e13a9=String(RegExp['$3'])['toLowerCase']()[_0x12c887(0x1ad)](),_0x2b2d5e=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0xfc1fb8:_0x1c55e4,_0x3b6de0=_0x12c887(0xff)['format'](_0x4e13a9['charAt'](0x0)['toUpperCase']()+_0x4e13a9[_0x12c887(0x222)](0x1));return _0x2b2d5e[_0x3b6de0](_0x344bd8);}else{if(_0x59304f[_0x12c887(0x1d8)](/(.*) HAS (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) MAX (BUFF|DEBUFF)/i)){const _0x51e97f=_0x19c041[_0x12c887(0x254)](String(RegExp['$2'])['toUpperCase']()[_0x12c887(0x1ad)]()),_0x254ed8=String(RegExp['$3'])['toLowerCase']()[_0x12c887(0x1ad)](),_0x152b3c=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0xfc1fb8:_0x1c55e4,_0x29864e=_0x12c887(0x190)[_0x12c887(0x1ab)](_0x254ed8['charAt'](0x0)[_0x12c887(0x205)]()+_0x254ed8[_0x12c887(0x222)](0x1));return _0x152b3c[_0x29864e](_0x51e97f);}else{if(_0x59304f[_0x12c887(0x1d8)](/(.*) NOT (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF)/i)){const _0xe33b27=_0x19c041['indexOf'](String(RegExp['$2'])[_0x12c887(0x205)]()[_0x12c887(0x1ad)]()),_0x39f95a=String(RegExp['$3'])[_0x12c887(0x16c)]()[_0x12c887(0x1ad)](),_0x3fd06d=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0xfc1fb8:_0x1c55e4,_0x1c712f='is%1Affected'['format'](_0x39f95a['charAt'](0x0)[_0x12c887(0x205)]()+_0x39f95a[_0x12c887(0x222)](0x1));return!_0x3fd06d[_0x1c712f](_0xe33b27);}else{if(_0x59304f[_0x12c887(0x1d8)](/(.*) NOT (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) MAX (BUFF|DEBUFF)/i)){const _0x5a1810=_0x19c041['indexOf'](String(RegExp['$2'])[_0x12c887(0x205)]()[_0x12c887(0x1ad)]()),_0x4657b0=String(RegExp['$3'])[_0x12c887(0x16c)]()[_0x12c887(0x1ad)](),_0x356861=String(RegExp['$1'])[_0x12c887(0x1d8)](/(?:USER|SUBJECT)/i)?_0xfc1fb8:_0x1c55e4,_0x464664=_0x12c887(0x190)[_0x12c887(0x1ab)](_0x4657b0[_0x12c887(0x169)](0x0)[_0x12c887(0x205)]()+_0x4657b0[_0x12c887(0x222)](0x1));return!_0x356861[_0x464664](_0x5a1810);}}}}}}}}}}}}}return!![];},AIManager[_0x410580(0x171)]=function(_0x443e6d,_0x495d86,_0x55f16e,_0x4d833f){const _0x3c3d25=_0x410580,_0x2bedbe=[_0x3c3d25(0x227),_0x3c3d25(0x243),_0x3c3d25(0x105),_0x3c3d25(0x123),_0x3c3d25(0x1cb),_0x3c3d25(0x11a),_0x3c3d25(0x1d3),'LUK'];window[_0x3c3d25(0x152)]=_0x443e6d,window['a']=user,window['b']=_0x495d86;const _0x232703=_0x4d833f,_0x10f613=user[_0x3c3d25(0x110)]();let _0x31f720=_0x4d833f['match'](/(?:USER|SUBJECT)/i)?user:_0x495d86;_0x4d833f=_0x4d833f[_0x3c3d25(0x1bf)](/\b(\d+)([%％])/gi,(_0x12a78f,_0x224a2c)=>Number(_0x224a2c)*0.01);if(_0x4d833f[_0x3c3d25(0x1d8)](/(?:VAR|VARIABLE) (\d+)/i))return $gameVariables[_0x3c3d25(0x167)](Number(RegExp['$1']));if(_0x4d833f[_0x3c3d25(0x1d8)](/TEAM ALIVE MEMBERS/i))return _0x31f720[_0x3c3d25(0x1bc)]()[_0x3c3d25(0x1f9)]()[_0x3c3d25(0x265)];if(_0x4d833f['match'](/TEAM DEAD MEMBERS/i))return _0x31f720[_0x3c3d25(0x1bc)]()['deadMembers']()['length'];if(_0x4d833f[_0x3c3d25(0x1d8)](/ELEMENT (\d+) RATE/i)){const _0x9bd971=Number(RegExp['$1']);return this['elementKnowledgeRate'](_0x443e6d,_0x495d86,_0x31f720,_0x9bd971);}else{if(_0x4d833f[_0x3c3d25(0x1d8)](/ELEMENT (.*) RATE/i)){const _0x202090=DataManager['getElementIdWithName'](String(RegExp['$1']));return this['elementKnowledgeRate'](_0x443e6d,_0x495d86,_0x31f720,_0x202090);}else{if(_0x4d833f[_0x3c3d25(0x1d8)](/(.*) ELEMENT RATE/i)){const _0x3db771=DataManager['getElementIdWithName'](String(RegExp['$1']));return this['elementKnowledgeRate'](_0x443e6d,_0x495d86,_0x31f720,_0x3db771);}}}if(_0x4d833f[_0x3c3d25(0x1d8)](/(MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF) (?:LEVEL|STACK|STACKS)/i)){const _0x342387=_0x2bedbe['indexOf'](String(RegExp['$1'])[_0x3c3d25(0x205)]()['trim']()),_0x17abba=String(RegExp['$2'])[_0x3c3d25(0x16c)]()[_0x3c3d25(0x1ad)]();return _0x31f720[_0x3c3d25(0x14a)](_0x342387)*(_0x17abba===_0x3c3d25(0x14a)?0x1:-0x1);}if(_0x4d833f['match'](/(MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF) (?:TURN|TURNS)/i)){const _0x27fc06=_0x2bedbe[_0x3c3d25(0x254)](String(RegExp['$1'])[_0x3c3d25(0x205)]()['trim']()),_0x4e906d=String(RegExp['$2'])[_0x3c3d25(0x16c)]()['trim']();if(_0x4e906d===_0x3c3d25(0x14a)&&_0x31f720[_0x3c3d25(0x141)](_0x27fc06))return _0x31f720['_buffTurns'][_0x27fc06];else{if(_0x4e906d===_0x3c3d25(0x210)&&_0x31f720[_0x3c3d25(0x19a)](_0x27fc06))return _0x31f720[_0x3c3d25(0x172)][_0x27fc06];}return 0x0;}if(_0x4d833f[_0x3c3d25(0x1d8)](/STATE (\d+) (?:TURN|TURNS)/i)){const _0x2acbef=Number(RegExp['$1']);if(_0x31f720[_0x3c3d25(0x251)](_0x2acbef)){const _0x4bba14=$dataStates[_0x2acbef];return _0x4bba14&&_0x4bba14['autoRemovalTiming']===0x0?Number[_0x3c3d25(0x261)]:_0x31f720[_0x3c3d25(0x1e7)][_0x2acbef]||0x0;}else return _0x31f720['states']()[_0x3c3d25(0x1d5)]($dataStates[_0x2acbef])?Number[_0x3c3d25(0x261)]:0x0;}else{if(_0x4d833f[_0x3c3d25(0x1d8)](/STATE (.*) (?:TURN|TURNS)/i)){const _0x3c51eb=DataManager['getStateIdWithName'](RegExp['$1']);if(_0x31f720[_0x3c3d25(0x251)](_0x3c51eb)){const _0x4b9c10=$dataStates[_0x3c51eb];return _0x4b9c10&&_0x4b9c10['autoRemovalTiming']===0x0?Number[_0x3c3d25(0x261)]:_0x31f720['_stateTurns'][_0x3c51eb]||0x0;}else return _0x31f720['states']()[_0x3c3d25(0x1d5)]($dataStates[_0x3c51eb])?Number[_0x3c3d25(0x261)]:0x0;}}if(_0x4d833f[_0x3c3d25(0x1d8)](/\bHP([%％])/i))return _0x31f720[_0x3c3d25(0x1b7)]();else{if(_0x4d833f[_0x3c3d25(0x1d8)](/\bMP([%％])/i))return _0x31f720['mpRate']();else{if(_0x4d833f[_0x3c3d25(0x1d8)](/\bTP([%％])/i))return _0x31f720[_0x3c3d25(0x10a)]();else{if(_0x4d833f['match'](/\b(?:MAXHP|MAX HP|MHP)\b/i))return _0x31f720[_0x3c3d25(0x1b5)];else{if(_0x4d833f[_0x3c3d25(0x1d8)](/\b(?:MAXMP|MAX MP|MMP)\b/i))return _0x31f720['mmp'];else{if(_0x4d833f[_0x3c3d25(0x1d8)](/\b(?:MAXTP|MAX TP|MTP)\b/i))return _0x31f720[_0x3c3d25(0x13d)]();}}}}}if(_0x4d833f[_0x3c3d25(0x1d8)](/\b(LEVEL|HP|MP|TP|ATK|DEF|MAT|MDF|AGI|LUK)\b/i))return _0x31f720[String(RegExp['$1'])[_0x3c3d25(0x16c)]()[_0x3c3d25(0x1ad)]()];try{return eval(_0x4d833f);}catch(_0x981d1b){return $gameTemp[_0x3c3d25(0x17c)]()&&(console[_0x3c3d25(0x12e)]('AI\x20Manager\x20could\x20not\x20determine\x20this\x20value:\x20%1'[_0x3c3d25(0x1ab)](_0x232703)),console[_0x3c3d25(0x12e)](_0x981d1b)),0x0;}},AIManager[_0x410580(0x23d)]=function(_0x2faa19,_0x49b145,_0x2527e3,_0x4d6eed){const _0x56bf52=_0x410580;if(_0x2faa19[_0x56bf52(0x260)]()===_0x2527e3[_0x56bf52(0x260)]())return _0x2527e3[_0x56bf52(0x238)](_0x4d6eed);else return _0x2527e3['opponentsUnit']()['hasElementAIKnowledge'](_0x4d6eed,_0x2527e3)?_0x2527e3[_0x56bf52(0x238)](_0x4d6eed):VisuMZ[_0x56bf52(0x19e)][_0x56bf52(0x170)][_0x56bf52(0x203)][_0x56bf52(0x1e8)];},AIManager[_0x410580(0x19c)]=function(_0x956a0a,_0x211dd7){const _0x47e361=_0x410580;if(!_0x211dd7)return;if(!_0x211dd7[_0x47e361(0x255)][_0x47e361(0x1d8)](AIManager[_0x47e361(0x1cd)][_0x47e361(0x1f2)]))return;const _0x1759ba=String(RegExp['$1'])[_0x47e361(0x205)]()['trim']();let _0x14a51c=this[_0x47e361(0x239)](_0x956a0a,_0x1759ba);_0x14a51c&&(this['_forceValidTargets']=[_0x14a51c]);},AIManager[_0x410580(0x239)]=function(_0x3780fe,_0x167917){const _0x4382af=_0x410580,_0x4aea89=[_0x4382af(0x227),_0x4382af(0x243),_0x4382af(0x105),_0x4382af(0x123),_0x4382af(0x1cb),_0x4382af(0x11a),_0x4382af(0x1d3),_0x4382af(0x15c)],_0x56b93a=['HIT',_0x4382af(0x1b6),_0x4382af(0x10c),_0x4382af(0x1c1),_0x4382af(0x237),_0x4382af(0x143),_0x4382af(0x156),'HRG',_0x4382af(0x15e),'TRG'],_0x34efdb=['TGR',_0x4382af(0x1f6),_0x4382af(0x112),_0x4382af(0x17b),_0x4382af(0x24d),_0x4382af(0x18b),_0x4382af(0x186),_0x4382af(0x161),_0x4382af(0x1d7),_0x4382af(0x13f)];let _0x19dc3b=null;if(_0x167917===_0x4382af(0x1f8)){if(this[_0x4382af(0x12c)]['includes'](_0x3780fe))return _0x3780fe;}else{if(_0x167917===_0x4382af(0x176))return this['_forceValidTargets'][0x0];else{if(_0x167917===_0x4382af(0x1fd))return this[_0x4382af(0x12c)][this[_0x4382af(0x12c)][_0x4382af(0x265)]-0x1];else{if(_0x167917[_0x4382af(0x1d8)](/(HIGHEST|LOWEST)[ ](.*)/i)){const _0x4d8f3d=String(RegExp['$1'])['toUpperCase']()['trim']()===_0x4382af(0x120),_0x529da1=!_0x4d8f3d,_0xd77cb3=String(RegExp['$2'])[_0x4382af(0x205)]()['trim']();if(_0x4aea89['includes'](_0xd77cb3)){const _0x56558f=_0x4aea89[_0x4382af(0x254)](_0xd77cb3);_0x19dc3b=this['_forceValidTargets'][0x0];for(const _0x4034c5 of this[_0x4382af(0x12c)]){if(_0x4d8f3d&&_0x4034c5['param'](_0x56558f)>_0x19dc3b[_0x4382af(0x199)](_0x56558f))_0x19dc3b=_0x4034c5;if(_0x529da1&&_0x4034c5[_0x4382af(0x199)](_0x56558f)<_0x19dc3b[_0x4382af(0x199)](_0x56558f))_0x19dc3b=_0x4034c5;}return _0x19dc3b;}if(_0x56b93a[_0x4382af(0x1d5)](_0xd77cb3)){const _0x392806=_0x56b93a[_0x4382af(0x254)](_0xd77cb3);_0x19dc3b=this[_0x4382af(0x12c)][0x0];for(const _0x1f27c5 of this[_0x4382af(0x12c)]){if(_0x4d8f3d&&_0x1f27c5[_0x4382af(0x158)](_0x392806)>_0x19dc3b[_0x4382af(0x158)](_0x392806))_0x19dc3b=_0x1f27c5;if(_0x529da1&&_0x1f27c5[_0x4382af(0x158)](_0x392806)<_0x19dc3b[_0x4382af(0x158)](_0x392806))_0x19dc3b=_0x1f27c5;}return _0x19dc3b;}if(_0x34efdb[_0x4382af(0x1d5)](_0xd77cb3)){const _0x11e154=_0x34efdb[_0x4382af(0x254)](_0xd77cb3);_0x19dc3b=this['_forceValidTargets'][0x0];for(const _0x2b08b2 of this[_0x4382af(0x12c)]){if(_0x4d8f3d&&_0x2b08b2[_0x4382af(0x244)](_0x11e154)>_0x19dc3b[_0x4382af(0x244)](_0x11e154))_0x19dc3b=_0x2b08b2;if(_0x529da1&&_0x2b08b2[_0x4382af(0x244)](_0x11e154)<_0x19dc3b[_0x4382af(0x244)](_0x11e154))_0x19dc3b=_0x2b08b2;}return _0x19dc3b;}if(_0xd77cb3==='HP'){_0x19dc3b=this[_0x4382af(0x12c)][0x0];for(const _0x1fa7bf of this[_0x4382af(0x12c)]){if(_0x4d8f3d&&_0x1fa7bf['hp']>_0x19dc3b['hp'])_0x19dc3b=_0x1fa7bf;if(_0x529da1&&_0x1fa7bf['hp']<_0x19dc3b['hp'])_0x19dc3b=_0x1fa7bf;}return _0x19dc3b;}if(_0xd77cb3===_0x4382af(0x101)){_0x19dc3b=this[_0x4382af(0x12c)][0x0];for(const _0x53764e of this[_0x4382af(0x12c)]){if(_0x4d8f3d&&_0x53764e['hpRate']()>_0x19dc3b[_0x4382af(0x1b7)]())_0x19dc3b=_0x53764e;if(_0x529da1&&_0x53764e[_0x4382af(0x1b7)]()<_0x19dc3b[_0x4382af(0x1b7)]())_0x19dc3b=_0x53764e;}return _0x19dc3b;}if(_0xd77cb3==='MP'){_0x19dc3b=this[_0x4382af(0x12c)][0x0];for(const _0x2533a2 of this[_0x4382af(0x12c)]){if(_0x4d8f3d&&_0x2533a2['mp']>_0x19dc3b['mp'])_0x19dc3b=_0x2533a2;if(_0x529da1&&_0x2533a2['mp']<_0x19dc3b['mp'])_0x19dc3b=_0x2533a2;}return _0x19dc3b;}if(_0xd77cb3===_0x4382af(0x25c)){_0x19dc3b=this[_0x4382af(0x12c)][0x0];for(const _0x5b64c2 of this['_forceValidTargets']){if(_0x4d8f3d&&_0x5b64c2[_0x4382af(0x1b9)]()>_0x19dc3b['mpRate']())_0x19dc3b=_0x5b64c2;if(_0x529da1&&_0x5b64c2['mpRate']()<_0x19dc3b[_0x4382af(0x1b9)]())_0x19dc3b=_0x5b64c2;}return _0x19dc3b;}if(_0xd77cb3==='TP'){_0x19dc3b=this[_0x4382af(0x12c)][0x0];for(const _0x308acc of this[_0x4382af(0x12c)]){if(_0x4d8f3d&&_0x308acc['tp']>_0x19dc3b['tp'])_0x19dc3b=_0x308acc;if(_0x529da1&&_0x308acc['tp']<_0x19dc3b['tp'])_0x19dc3b=_0x308acc;}return _0x19dc3b;}if(_0xd77cb3==='TP%'){_0x19dc3b=this[_0x4382af(0x12c)][0x0];for(const _0x3897b9 of this['_forceValidTargets']){if(_0x4d8f3d&&_0x3897b9[_0x4382af(0x10a)]()>_0x19dc3b[_0x4382af(0x10a)]())_0x19dc3b=_0x3897b9;if(_0x529da1&&_0x3897b9[_0x4382af(0x10a)]()<_0x19dc3b[_0x4382af(0x10a)]())_0x19dc3b=_0x3897b9;}return _0x19dc3b;}if(_0xd77cb3===_0x4382af(0x25f)){_0x19dc3b=this['_forceValidTargets'][0x0];for(const _0x2058c8 of this['_forceValidTargets']){if(_0x4d8f3d&&_0x2058c8[_0x4382af(0x13d)]()>_0x19dc3b['maxTp']())_0x19dc3b=_0x2058c8;if(_0x529da1&&_0x2058c8['maxTp']()<_0x19dc3b[_0x4382af(0x13d)]())_0x19dc3b=_0x2058c8;}return _0x19dc3b;}if(_0xd77cb3==='LEVEL'){_0x19dc3b=this['_forceValidTargets'][0x0];for(const _0x42ed00 of this['_forceValidTargets']){if(_0x4d8f3d&&(_0x42ed00['level']||0x0)>(_0x19dc3b[_0x4382af(0x148)]||0x0))_0x19dc3b=_0x42ed00;if(_0x529da1&&(_0x42ed00[_0x4382af(0x148)]||0x0)<(_0x19dc3b[_0x4382af(0x148)]||0x0))_0x19dc3b=_0x42ed00;}return _0x19dc3b;}if(_0xd77cb3===_0x4382af(0x16b)&&Imported[_0x4382af(0x1bb)]){_0x19dc3b=this[_0x4382af(0x12c)][0x0];for(const _0x181773 of this[_0x4382af(0x12c)]){if(_0x4d8f3d&&_0x181773[_0x4382af(0x224)]()[_0x4382af(0x265)]>_0x19dc3b[_0x4382af(0x224)]()['length'])_0x19dc3b=_0x181773;if(_0x529da1&&_0x181773[_0x4382af(0x224)]()['length']<_0x19dc3b[_0x4382af(0x224)]()[_0x4382af(0x265)])_0x19dc3b=_0x181773;}return _0x19dc3b;}if(_0xd77cb3===_0x4382af(0x102)&&Imported[_0x4382af(0x1bb)]){_0x19dc3b=this[_0x4382af(0x12c)][0x0];const _0x301429=_0x4382af(0x253);for(const _0x17910f of this['_forceValidTargets']){if(_0x4d8f3d&&_0x17910f[_0x4382af(0xfb)](_0x301429)[_0x4382af(0x265)]>_0x19dc3b[_0x4382af(0xfb)](_0x301429)[_0x4382af(0x265)])_0x19dc3b=_0x17910f;if(_0x529da1&&_0x17910f[_0x4382af(0xfb)](_0x301429)['length']<_0x19dc3b[_0x4382af(0xfb)](_0x301429)[_0x4382af(0x265)])_0x19dc3b=_0x17910f;}return _0x19dc3b;}if(_0xd77cb3===_0x4382af(0xf9)&&Imported[_0x4382af(0x1bb)]){_0x19dc3b=this['_forceValidTargets'][0x0];const _0x1f2050=_0x4382af(0xfc);for(const _0x582358 of this[_0x4382af(0x12c)]){if(_0x4d8f3d&&_0x582358[_0x4382af(0xfb)](_0x1f2050)[_0x4382af(0x265)]>_0x19dc3b[_0x4382af(0xfb)](_0x1f2050)[_0x4382af(0x265)])_0x19dc3b=_0x582358;if(_0x529da1&&_0x582358[_0x4382af(0xfb)](_0x1f2050)[_0x4382af(0x265)]<_0x19dc3b[_0x4382af(0xfb)](_0x1f2050)[_0x4382af(0x265)])_0x19dc3b=_0x582358;}return _0x19dc3b;}}}}}return null;},DataManager['getElementIdWithName']=function(_0x52bb89){const _0x22db3c=_0x410580;_0x52bb89=_0x52bb89[_0x22db3c(0x205)]()['trim'](),this[_0x22db3c(0x1dd)]=this[_0x22db3c(0x1dd)]||{};if(this['_elementIDs'][_0x52bb89])return this[_0x22db3c(0x1dd)][_0x52bb89];let _0x3252f1=0x1;for(const _0x3f2c39 of $dataSystem[_0x22db3c(0x155)]){if(!_0x3f2c39)continue;let _0x2cfae5=_0x3f2c39[_0x22db3c(0x205)]();_0x2cfae5=_0x2cfae5[_0x22db3c(0x1bf)](/\x1I\[(\d+)\]/gi,''),_0x2cfae5=_0x2cfae5[_0x22db3c(0x1bf)](/\\I\[(\d+)\]/gi,''),this[_0x22db3c(0x1dd)][_0x2cfae5]=_0x3252f1,_0x3252f1++;}return this[_0x22db3c(0x1dd)][_0x52bb89]||0x0;},DataManager['getStateIdWithName']=function(_0x4e8b9c){const _0x127b92=_0x410580;_0x4e8b9c=_0x4e8b9c[_0x127b92(0x205)]()[_0x127b92(0x1ad)](),this[_0x127b92(0x1ea)]=this['_stateIDs']||{};if(this[_0x127b92(0x1ea)][_0x4e8b9c])return this[_0x127b92(0x1ea)][_0x4e8b9c];for(const _0x29d4fc of $dataStates){if(!_0x29d4fc)continue;this[_0x127b92(0x1ea)][_0x29d4fc['name'][_0x127b92(0x205)]()[_0x127b92(0x1ad)]()]=_0x29d4fc['id'];}return this[_0x127b92(0x1ea)][_0x4e8b9c]||0x0;},VisuMZ[_0x410580(0x19e)][_0x410580(0x1ba)]=BattleManager['getNextSubject'],BattleManager['getNextSubject']=function(){const _0x348332=_0x410580,_0xf286de=VisuMZ[_0x348332(0x19e)][_0x348332(0x1ba)]['call'](this);if(_0xf286de&&_0xf286de[_0x348332(0x10b)]()){const _0x18c81a=_0xf286de['currentAction']();if(!_0x18c81a||_0x18c81a&&!_0x18c81a[_0x348332(0x164)]())_0xf286de[_0x348332(0x100)]();else{if(VisuMZ[_0x348332(0x19e)][_0x348332(0x170)][_0x348332(0x203)][_0x348332(0x1aa)]){if(_0x18c81a&&_0x18c81a[_0x348332(0x1a0)])return _0xf286de;_0xf286de[_0x348332(0x100)](),Imported[_0x348332(0x1f1)]&&this[_0x348332(0x15a)]()&&(_0xf286de[_0x348332(0x150)]=!![]);}}}return _0xf286de;},VisuMZ[_0x410580(0x19e)]['BattleManager_startAction']=BattleManager[_0x410580(0x183)],BattleManager[_0x410580(0x183)]=function(){const _0x4bd9e1=_0x410580;this[_0x4bd9e1(0x109)](),this[_0x4bd9e1(0x23f)][_0x4bd9e1(0x1ae)]()?VisuMZ[_0x4bd9e1(0x19e)]['BattleManager_startAction'][_0x4bd9e1(0x147)](this):this[_0x4bd9e1(0x180)]();},VisuMZ[_0x410580(0x19e)][_0x410580(0x213)]=BattleManager[_0x410580(0x180)],BattleManager['endAction']=function(){const _0x39ab5b=_0x410580;this[_0x39ab5b(0x109)](),VisuMZ[_0x39ab5b(0x19e)][_0x39ab5b(0x213)][_0x39ab5b(0x147)](this);},BattleManager['determineActionByAIisStillValid']=function(){const _0x294db6=_0x410580;this[_0x294db6(0x214)](this[_0x294db6(0x23f)]);},BattleManager[_0x410580(0x214)]=function(_0x2d951c){const _0x2b34bb=_0x410580;if(!_0x2d951c)return;if(_0x2d951c['aiStyle']()===_0x2b34bb(0x232))return;if(!_0x2d951c['isDetermineActionByAI']())return;const _0x3b44de=_0x2d951c['currentAction']();if(!_0x3b44de)return;if(_0x3b44de[_0x2b34bb(0x1a0)])return;const _0x34eeaf=_0x3b44de[_0x2b34bb(0x164)]();if(_0x2d951c[_0x2b34bb(0x11d)])return;if(AIManager['hasValidTargets'](_0x2d951c,_0x34eeaf)&&_0x2d951c[_0x2b34bb(0x19b)](_0x34eeaf))return;_0x2d951c[_0x2b34bb(0x1b4)]();},VisuMZ[_0x410580(0x19e)][_0x410580(0x108)]=Game_Temp['prototype']['initialize'],Game_Temp[_0x410580(0x1c4)][_0x410580(0x1ed)]=function(){const _0x1d9e07=_0x410580;VisuMZ[_0x1d9e07(0x19e)][_0x1d9e07(0x108)][_0x1d9e07(0x147)](this),this[_0x1d9e07(0xfe)]();},Game_Temp[_0x410580(0x1c4)][_0x410580(0xfe)]=function(){const _0x2a0b25=_0x410580;this[_0x2a0b25(0x14b)]={'action':null,'elementInfluence':![],'elementInfluenceRate':0x0,'elementIds':[],'evaInfluenceRate':0x0,'mevInfluenceRate':0x0,'pdrInfluenceRate':0x0,'mdrInfluenceRate':0x0};},Game_Temp[_0x410580(0x1c4)][_0x410580(0x18d)]=function(){const _0xaa51a=_0x410580;if(this['_aiTgrInfluence']===undefined)this['clearAiTgrInfluence']();return this[_0xaa51a(0x14b)];},Game_Temp[_0x410580(0x1c4)][_0x410580(0x21f)]=function(_0x4f73fd,_0xb287e6){const _0x488a05=_0x410580;this[_0x488a05(0xfe)]();const _0x5c866f=this[_0x488a05(0x18d)]();_0x5c866f[_0x488a05(0x208)]=_0xb287e6;if(!_0xb287e6)return;if(_0x4f73fd[_0x488a05(0x1d0)]()){_0x5c866f[_0x488a05(0x200)]=!![],_0x5c866f['elementInfluenceRate']=_0x4f73fd[_0x488a05(0x12b)](),_0x5c866f[_0x488a05(0x149)]=[];if(Imported[_0x488a05(0x206)])_0x5c866f[_0x488a05(0x149)]=_0x5c866f[_0x488a05(0x149)]['concat'](_0xb287e6[_0x488a05(0x155)]());else _0xb287e6[_0x488a05(0x164)]()[_0x488a05(0x1ce)][_0x488a05(0x223)]<0x0?_0x5c866f[_0x488a05(0x149)]=_0x5c866f[_0x488a05(0x149)][_0x488a05(0x1e9)](_0x4f73fd[_0x488a05(0x13c)]()):_0x5c866f[_0x488a05(0x149)]['push'](_0xb287e6[_0x488a05(0x164)]()['damage'][_0x488a05(0x223)]);}_0xb287e6[_0x488a05(0x26d)]()&&_0x4f73fd[_0x488a05(0x1ec)]()&&(_0x5c866f[_0x488a05(0x23b)]=_0x4f73fd['aiApplyEvaTgrInfluenceRate']()),_0xb287e6[_0x488a05(0x26d)]()&&_0xb287e6['isDamage']()&&_0x4f73fd[_0x488a05(0x196)]()&&(_0x5c866f['pdrInfluenceRate']=_0x4f73fd[_0x488a05(0x1f7)]()),_0xb287e6[_0x488a05(0x1c8)]()&&_0x4f73fd[_0x488a05(0x130)]()&&(_0x5c866f[_0x488a05(0x21a)]=_0x4f73fd[_0x488a05(0x22a)]()),_0xb287e6[_0x488a05(0x1c8)]()&&_0xb287e6['isDamage']()&&_0x4f73fd[_0x488a05(0x24f)]()&&(_0x5c866f['mdrInfluenceRate']=_0x4f73fd[_0x488a05(0x192)]());},VisuMZ['BattleAI'][_0x410580(0x246)]=Game_Action[_0x410580(0x1c4)][_0x410580(0x185)],Game_Action[_0x410580(0x1c4)]['makeTargets']=function(){const _0x22bb8b=_0x410580;this[_0x22bb8b(0x124)]()&&this[_0x22bb8b(0x1db)]()[_0x22bb8b(0x10b)]()&&(AIManager[_0x22bb8b(0x182)](this[_0x22bb8b(0x1db)](),this['item']()),this[_0x22bb8b(0x11f)]()&&AIManager[_0x22bb8b(0x19c)](this[_0x22bb8b(0x1db)](),this[_0x22bb8b(0x164)]()));$gameTemp[_0x22bb8b(0x21f)](this['subject'](),this);const _0x7167d2=VisuMZ[_0x22bb8b(0x19e)][_0x22bb8b(0x246)][_0x22bb8b(0x147)](this);return $gameTemp[_0x22bb8b(0xfe)](),AIManager[_0x22bb8b(0x242)](),_0x7167d2;},VisuMZ['BattleAI'][_0x410580(0x266)]=Game_Action[_0x410580(0x1c4)][_0x410580(0x201)],Game_Action[_0x410580(0x1c4)][_0x410580(0x201)]=function(){const _0x227474=_0x410580,_0x5516e5=this[_0x227474(0x1db)](),_0x3614fd=this['item']();let _0x4efb5d=VisuMZ[_0x227474(0x19e)]['Game_Action_itemTargetCandidates']['call'](this);if(_0x5516e5[_0x227474(0x10b)]()&&AIManager[_0x227474(0x1e5)](_0x5516e5,_0x3614fd)){let _0x37a234=AIManager[_0x227474(0x1ff)](_0x5516e5,_0x3614fd);_0x4efb5d=_0x4efb5d[_0x227474(0x248)](_0x1f6265=>_0x37a234[_0x227474(0x1d5)](_0x1f6265));}return _0x4efb5d;},VisuMZ[_0x410580(0x19e)][_0x410580(0x20f)]=Game_Action['prototype']['apply'],Game_Action[_0x410580(0x1c4)][_0x410580(0x22d)]=function(_0x306b57){const _0x22495b=_0x410580;VisuMZ[_0x22495b(0x19e)][_0x22495b(0x20f)][_0x22495b(0x147)](this,_0x306b57),this['applyBattleAI'](_0x306b57);},Game_Action[_0x410580(0x1c4)][_0x410580(0x122)]=function(_0x25f198){const _0x137be2=_0x410580;if(!_0x25f198)return;if(this[_0x137be2(0x1db)]()['isActor']()===_0x25f198['isActor']())return;let _0x4d88d5=[];if(Imported['VisuMZ_1_ElementStatusCore'])_0x4d88d5=this[_0x137be2(0x155)]();else this[_0x137be2(0x164)]()[_0x137be2(0x1ce)]['elementId']<0x0?_0x4d88d5=this[_0x137be2(0x1db)]()[_0x137be2(0x13c)]():_0x4d88d5=[this[_0x137be2(0x164)]()['damage'][_0x137be2(0x223)]];_0x25f198[_0x137be2(0x1eb)](_0x4d88d5,this[_0x137be2(0x26d)](),this[_0x137be2(0x1c8)]());},VisuMZ['BattleAI'][_0x410580(0x217)]=Game_Action[_0x410580(0x1c4)][_0x410580(0x1cf)],Game_Action[_0x410580(0x1c4)][_0x410580(0x1cf)]=function(){const _0x1257fa=_0x410580,_0xc81bf4=this[_0x1257fa(0x164)]()[_0x1257fa(0xfa)];if(_0xc81bf4['match'](/ANY/i)){if(Imported[_0x1257fa(0x1e4)]&&this[_0x1257fa(0x194)]()){}else return!![];}return VisuMZ['BattleAI']['Game_Action_isForOpponentBattleCore'][_0x1257fa(0x147)](this);},VisuMZ['BattleAI'][_0x410580(0x240)]=Game_BattlerBase[_0x410580(0x1c4)][_0x410580(0x244)],Game_BattlerBase[_0x410580(0x1c4)][_0x410580(0x244)]=function(_0x29bd20){const _0x100ab9=_0x410580;let _0x450d17=VisuMZ[_0x100ab9(0x19e)][_0x100ab9(0x240)][_0x100ab9(0x147)](this,_0x29bd20);return _0x29bd20===0x0&&(_0x450d17*=this[_0x100ab9(0x10f)]()),_0x450d17;},Game_BattlerBase[_0x410580(0x1c4)][_0x410580(0x10f)]=function(){const _0x2252a0=_0x410580,_0x2ca122=$gameTemp[_0x2252a0(0x18d)](),_0x53dd21=this['opponentsUnit']();if(!_0x2ca122['action'])return 0x1;if(Imported[_0x2252a0(0x198)]){if(_0x2ca122[_0x2252a0(0x208)]&&_0x2ca122[_0x2252a0(0x208)][_0x2252a0(0x13b)]())return 0x1;}let _0x31541f=0x1;if(_0x2ca122[_0x2252a0(0x200)])for(const _0x51e108 of _0x2ca122['elementIds']){_0x53dd21[_0x2252a0(0x228)](_0x51e108,this)&&(_0x31541f*=this[_0x2252a0(0x238)](_0x51e108)*_0x2ca122['elementInfluenceRate']);}_0x53dd21[_0x2252a0(0x140)](_0x2252a0(0x157),this)&&(_0x31541f*=0x1-this[_0x2252a0(0x157)]*_0x2ca122[_0x2252a0(0x23b)]);_0x53dd21[_0x2252a0(0x140)](_0x2252a0(0x226),this)&&(_0x31541f*=0x1-this[_0x2252a0(0x226)]*_0x2ca122[_0x2252a0(0x21a)]);{_0x31541f*=0x1+((this['pdr']-0x1)*_0x2ca122['pdrInfluenceRate']??0x0),_0x31541f*=0x1+((this[_0x2252a0(0x17f)]-0x1)*_0x2ca122[_0x2252a0(0x20a)]??0x0);}return _0x31541f[_0x2252a0(0x218)](0.001,0x3e8);},Game_BattlerBase[_0x410580(0x1c4)][_0x410580(0x1cc)]=function(){const _0x1c1b47=_0x410580;return _0x1c1b47(0x177);},VisuMZ['BattleAI'][_0x410580(0x197)]=Game_BattlerBase[_0x410580(0x1c4)]['die'],Game_BattlerBase[_0x410580(0x1c4)][_0x410580(0x127)]=function(){const _0xdbca3e=_0x410580;this[_0xdbca3e(0x150)]=![],VisuMZ[_0xdbca3e(0x19e)][_0xdbca3e(0x197)][_0xdbca3e(0x147)](this);},VisuMZ[_0x410580(0x19e)][_0x410580(0x16a)]=Game_BattlerBase[_0x410580(0x1c4)][_0x410580(0x16e)],Game_BattlerBase[_0x410580(0x1c4)][_0x410580(0x16e)]=function(){const _0xcd4fd4=_0x410580;this['_onSpotMadeActionsDeterminedByAI']=![],VisuMZ[_0xcd4fd4(0x19e)][_0xcd4fd4(0x16a)][_0xcd4fd4(0x147)](this);},VisuMZ[_0x410580(0x19e)][_0x410580(0x267)]=Game_Battler['prototype']['onBattleStart'],Game_Battler['prototype']['onBattleStart']=function(_0x189476){const _0x11e124=_0x410580;this[_0x11e124(0x150)]=![],VisuMZ[_0x11e124(0x19e)][_0x11e124(0x267)][_0x11e124(0x147)](this,_0x189476);},VisuMZ[_0x410580(0x19e)][_0x410580(0x20d)]=Game_Battler[_0x410580(0x1c4)][_0x410580(0x16f)],Game_Battler[_0x410580(0x1c4)][_0x410580(0x16f)]=function(){const _0x198eb2=_0x410580;this[_0x198eb2(0x150)]=![],VisuMZ[_0x198eb2(0x19e)][_0x198eb2(0x20d)][_0x198eb2(0x147)](this);},VisuMZ['BattleAI'][_0x410580(0x234)]=Game_Battler['prototype'][_0x410580(0x25e)],Game_Battler[_0x410580(0x1c4)][_0x410580(0x25e)]=function(){const _0x3dce3d=_0x410580;this[_0x3dce3d(0x150)]=![],VisuMZ[_0x3dce3d(0x19e)][_0x3dce3d(0x234)][_0x3dce3d(0x147)](this);},VisuMZ['BattleAI'][_0x410580(0x1c2)]=Game_Battler['prototype']['makeActions'],Game_Battler['prototype']['makeActions']=function(){const _0x12d939=_0x410580;if(this[_0x12d939(0x150)])return;VisuMZ['BattleAI'][_0x12d939(0x1c2)][_0x12d939(0x147)](this);},VisuMZ[_0x410580(0x19e)][_0x410580(0x1de)]=Game_Battler['prototype'][_0x410580(0x1a9)],Game_Battler[_0x410580(0x1c4)][_0x410580(0x1a9)]=function(){const _0x35f6d6=_0x410580;if(this[_0x35f6d6(0x10b)]()){const _0x4baff9=VisuMZ[_0x35f6d6(0x19e)][_0x35f6d6(0x170)][_0x35f6d6(0x203)];if(_0x4baff9[_0x35f6d6(0x1aa)]&&_0x4baff9[_0x35f6d6(0x262)])return![];}return VisuMZ[_0x35f6d6(0x19e)][_0x35f6d6(0x1de)][_0x35f6d6(0x147)](this);},Game_Battler[_0x410580(0x1c4)]['isDetermineActionByAI']=function(){const _0x44a6b5=_0x410580;if(this[_0x44a6b5(0x12f)]())return![];return!![];},Game_Battler[_0x410580(0x1c4)][_0x410580(0x1b4)]=function(){},Game_Battler[_0x410580(0x1c4)][_0x410580(0x1d0)]=function(){const _0x39ae25=_0x410580;if(this['isActor']()||this['isEnemy']()){const _0x5750aa=this[_0x39ae25(0x260)]()?this[_0x39ae25(0x16d)]()[_0x39ae25(0x255)]:this[_0x39ae25(0x162)]()[_0x39ae25(0x255)];if(_0x5750aa['match'](AIManager[_0x39ae25(0x1cd)][_0x39ae25(0x1f0)]))return![];else{if(_0x5750aa[_0x39ae25(0x1d8)](AIManager['_regexp'][_0x39ae25(0x159)]))return this[_0x39ae25(0x12b)]()>0x0;}}return VisuMZ['BattleAI'][_0x39ae25(0x170)][_0x39ae25(0x19f)]['ElementTgr'];},Game_Battler[_0x410580(0x1c4)][_0x410580(0x12b)]=function(){const _0x2c0c52=_0x410580;if(this[_0x2c0c52(0x260)]()||this[_0x2c0c52(0x1a7)]()){const _0x315e74=this['isActor']()?this['actor']()[_0x2c0c52(0x255)]:this[_0x2c0c52(0x162)]()['note'];if(_0x315e74['match'](AIManager['_regexp']['aiElementTgr']))return eval(RegExp['$1']);}return VisuMZ[_0x2c0c52(0x19e)]['Settings'][_0x2c0c52(0x19f)][_0x2c0c52(0x103)];},Game_Battler['prototype']['doesAIApplyEvaTgrInfluence']=function(){const _0x1a660f=_0x410580;if(this[_0x1a660f(0x260)]()||this['isEnemy']()){const _0x324961=this['isActor']()?this[_0x1a660f(0x16d)]()[_0x1a660f(0x255)]:this['enemy']()[_0x1a660f(0x255)];if(_0x324961[_0x1a660f(0x1d8)](AIManager[_0x1a660f(0x1cd)]['bypassEvaTgr']))return![];else{if(_0x324961[_0x1a660f(0x1d8)](AIManager[_0x1a660f(0x1cd)][_0x1a660f(0x212)]))return this[_0x1a660f(0x26b)]()>0x0;}}return VisuMZ[_0x1a660f(0x19e)]['Settings'][_0x1a660f(0x19f)][_0x1a660f(0x1da)];},Game_Battler[_0x410580(0x1c4)][_0x410580(0x26b)]=function(){const _0x54f99c=_0x410580;if(this[_0x54f99c(0x260)]()||this['isEnemy']()){const _0x34c0e5=this[_0x54f99c(0x260)]()?this[_0x54f99c(0x16d)]()[_0x54f99c(0x255)]:this['enemy']()[_0x54f99c(0x255)];if(_0x34c0e5[_0x54f99c(0x1d8)](AIManager[_0x54f99c(0x1cd)][_0x54f99c(0x212)]))return eval(RegExp['$1']);}return VisuMZ[_0x54f99c(0x19e)]['Settings'][_0x54f99c(0x19f)][_0x54f99c(0x202)];},Game_Battler[_0x410580(0x1c4)][_0x410580(0x130)]=function(){const _0x3b9f58=_0x410580;if(this[_0x3b9f58(0x260)]()||this[_0x3b9f58(0x1a7)]()){const _0x4b7f0c=this[_0x3b9f58(0x260)]()?this['actor']()['note']:this[_0x3b9f58(0x162)]()[_0x3b9f58(0x255)];if(_0x4b7f0c[_0x3b9f58(0x1d8)](AIManager[_0x3b9f58(0x1cd)][_0x3b9f58(0x188)]))return![];else{if(_0x4b7f0c[_0x3b9f58(0x1d8)](AIManager['_regexp']['aiMevTgr']))return this[_0x3b9f58(0x22a)]()>0x0;}}return VisuMZ[_0x3b9f58(0x19e)][_0x3b9f58(0x170)][_0x3b9f58(0x19f)][_0x3b9f58(0x1c6)];},Game_Battler[_0x410580(0x1c4)]['aiApplyMevTgrInfluenceRate']=function(){const _0x4e0c3d=_0x410580;if(this[_0x4e0c3d(0x260)]()||this[_0x4e0c3d(0x1a7)]()){const _0x4acf11=this[_0x4e0c3d(0x260)]()?this['actor']()[_0x4e0c3d(0x255)]:this[_0x4e0c3d(0x162)]()[_0x4e0c3d(0x255)];if(_0x4acf11[_0x4e0c3d(0x1d8)](AIManager[_0x4e0c3d(0x1cd)]['aiMevTgr']))return eval(RegExp['$1']);}return VisuMZ[_0x4e0c3d(0x19e)][_0x4e0c3d(0x170)][_0x4e0c3d(0x19f)][_0x4e0c3d(0x191)];},Game_Battler[_0x410580(0x1c4)]['doesAIApplyPdrTgrInfluence']=function(){const _0x78afdb=_0x410580;if(this[_0x78afdb(0x260)]()||this[_0x78afdb(0x1a7)]()){const _0x319123=this[_0x78afdb(0x260)]()?this[_0x78afdb(0x16d)]()[_0x78afdb(0x255)]:this[_0x78afdb(0x162)]()['note'];if(_0x319123['match'](AIManager[_0x78afdb(0x1cd)][_0x78afdb(0x1f5)]))return![];else{if(_0x319123[_0x78afdb(0x1d8)](AIManager[_0x78afdb(0x1cd)]['aiPdrTgr']))return this[_0x78afdb(0x1f7)]()>0x0;}}return VisuMZ[_0x78afdb(0x19e)]['Settings'][_0x78afdb(0x19f)][_0x78afdb(0x1b3)]??!![];},Game_Battler['prototype'][_0x410580(0x1f7)]=function(){const _0x2ca1d9=_0x410580;if(this[_0x2ca1d9(0x260)]()||this[_0x2ca1d9(0x1a7)]()){const _0xeb27de=this[_0x2ca1d9(0x260)]()?this[_0x2ca1d9(0x16d)]()[_0x2ca1d9(0x255)]:this[_0x2ca1d9(0x162)]()['note'];if(_0xeb27de[_0x2ca1d9(0x1d8)](AIManager[_0x2ca1d9(0x1cd)]['aiPdrTgr']))return eval(RegExp['$1']);}return VisuMZ[_0x2ca1d9(0x19e)]['Settings']['Weight'][_0x2ca1d9(0x179)]??1.25;},Game_Battler['prototype']['doesAIApplyMdrTgrInfluence']=function(){const _0x36e54d=_0x410580;if(this[_0x36e54d(0x260)]()||this[_0x36e54d(0x1a7)]()){const _0x45caaa=this['isActor']()?this[_0x36e54d(0x16d)]()[_0x36e54d(0x255)]:this[_0x36e54d(0x162)]()[_0x36e54d(0x255)];if(_0x45caaa[_0x36e54d(0x1d8)](AIManager[_0x36e54d(0x1cd)][_0x36e54d(0x1fc)]))return![];else{if(_0x45caaa[_0x36e54d(0x1d8)](AIManager['_regexp'][_0x36e54d(0x258)]))return this[_0x36e54d(0x192)]()>0x0;}}return VisuMZ[_0x36e54d(0x19e)]['Settings'][_0x36e54d(0x19f)][_0x36e54d(0x144)]??!![];},Game_Battler['prototype'][_0x410580(0x192)]=function(){const _0x41f020=_0x410580;if(this[_0x41f020(0x260)]()||this[_0x41f020(0x1a7)]()){const _0xd3645a=this[_0x41f020(0x260)]()?this['actor']()[_0x41f020(0x255)]:this[_0x41f020(0x162)]()['note'];if(_0xd3645a[_0x41f020(0x1d8)](AIManager[_0x41f020(0x1cd)][_0x41f020(0x258)]))return eval(RegExp['$1']);}return VisuMZ[_0x41f020(0x19e)]['Settings'][_0x41f020(0x19f)][_0x41f020(0x106)]??1.5;},Game_Battler[_0x410580(0x1c4)]['aiLevel']=function(){const _0x490949=_0x410580,_0x583fbf=VisuMZ[_0x490949(0x19e)][_0x490949(0x170)][_0x490949(0x203)];if(this[_0x490949(0x260)]()||this['isEnemy']()){const _0x12b2e9=this[_0x490949(0x260)]()?this['actor']()['note']:this[_0x490949(0x162)]()[_0x490949(0x255)];if(_0x12b2e9[_0x490949(0x1d8)](AIManager['_regexp'][_0x490949(0x215)]))return Number(RegExp['$1'])[_0x490949(0x218)](0x0,0x64);else{if(this[_0x490949(0x260)]())return _0x583fbf['ActorAILevel'];else{if(this['isEnemy']())return _0x583fbf[_0x490949(0x1a1)];}}}return _0x583fbf[_0x490949(0x1a1)];},Game_Battler[_0x410580(0x1c4)][_0x410580(0x1eb)]=function(_0x304f3c,_0x7d7a7e,_0x192d26){const _0x53de52=_0x410580,_0x5e49cd=this[_0x53de52(0x110)]();if(_0x304f3c&&_0x304f3c[_0x53de52(0x265)]>0x0)for(const _0x279cf4 of _0x304f3c){_0x5e49cd[_0x53de52(0x160)](_0x279cf4,this);}_0x7d7a7e&&_0x5e49cd[_0x53de52(0x22e)]('evaRates',this),_0x192d26&&_0x5e49cd[_0x53de52(0x22e)](_0x53de52(0x1e3),this);},Game_Battler[_0x410580(0x1c4)][_0x410580(0x140)]=function(_0xeecf24){const _0x4dbe0a=_0x410580,_0x276ce3=this[_0x4dbe0a(0x110)]();return _0x276ce3[_0x4dbe0a(0x140)](_0xeecf24,this);},Game_Battler[_0x410580(0x1c4)][_0x410580(0x1d9)]=function(){const _0x1c3abf=_0x410580,_0x5ab1f0=VisuMZ[_0x1c3abf(0x19e)][_0x1c3abf(0x170)][_0x1c3abf(0x203)];if(this['isActor']()||this[_0x1c3abf(0x1a7)]()){const _0x34f72e=this[_0x1c3abf(0x260)]()?this[_0x1c3abf(0x16d)]()[_0x1c3abf(0x255)]:this['enemy']()['note'];if(_0x34f72e[_0x1c3abf(0x1d8)](AIManager['_regexp'][_0x1c3abf(0x1d9)]))return Number(RegExp['$1'])['clamp'](0x0,0x9);else{if(this[_0x1c3abf(0x260)]())return _0x5ab1f0['ActorRatingVariance'][_0x1c3abf(0x218)](0x0,0x9);else{if(this[_0x1c3abf(0x1a7)]())return _0x5ab1f0[_0x1c3abf(0x17e)][_0x1c3abf(0x218)](0x0,0x9);}}}return _0x5ab1f0[_0x1c3abf(0x17e)]['clamp'](0x0,0x9);},VisuMZ[_0x410580(0x19e)][_0x410580(0x1a5)]=Game_Battler[_0x410580(0x1c4)][_0x410580(0x1be)],Game_Battler[_0x410580(0x1c4)][_0x410580(0x1be)]=function(){const _0x40795f=_0x410580;if(BattleManager[_0x40795f(0x139)]())return VisuMZ[_0x40795f(0x19e)]['Game_Battler_turnCount'][_0x40795f(0x147)](this);if(VisuMZ[_0x40795f(0x19e)][_0x40795f(0x170)][_0x40795f(0x203)]['OnSpotAI']){if(this[_0x40795f(0x268)]())return VisuMZ[_0x40795f(0x19e)]['Game_Battler_turnCount']['call'](this);return $gameTroop['turnCount']();}else return VisuMZ[_0x40795f(0x19e)][_0x40795f(0x1a5)][_0x40795f(0x147)](this);},Game_Battler[_0x410580(0x1c4)][_0x410580(0x268)]=function(){const _0x556af9=_0x410580;if(Imported[_0x556af9(0x1a4)]&&BattleManager[_0x556af9(0x21d)]()){if(VisuMZ['BattleSystemFTB'][_0x556af9(0x133)]<1.11){let _0x17aca7='';_0x17aca7+='VisuMZ_2_BattleSystemFTB\x20needs\x20to\x20be\x20updated\x20',_0x17aca7+=_0x556af9(0x230),alert(_0x17aca7),SceneManager[_0x556af9(0x236)]();}return!![];}else{if(Imported['VisuMZ_2_BattleSystemETB']&&BattleManager[_0x556af9(0x21d)]()){if(VisuMZ['BattleSystemETB'][_0x556af9(0x133)]<1.08){let _0x2f415f='';_0x2f415f+='VisuMZ_2_BattleSystemETB\x20needs\x20to\x20be\x20updated\x20',_0x2f415f+=_0x556af9(0x230),alert(_0x2f415f),SceneManager[_0x556af9(0x236)]();}return!![];}else{if(Imported[_0x556af9(0x142)]&&BattleManager[_0x556af9(0x21d)]()){if(VisuMZ['BattleSystemPTB'][_0x556af9(0x133)]<1.08){let _0x1df7f2='';_0x1df7f2+='VisuMZ_2_BattleSystemPTB\x20needs\x20to\x20be\x20updated\x20',_0x1df7f2+='in\x20order\x20for\x20VisuMZ_3_BattleAI\x20to\x20work.',alert(_0x1df7f2),SceneManager[_0x556af9(0x236)]();}return!![];}}}return![];},Game_Actor[_0x410580(0x1c4)][_0x410580(0x10b)]=function(){const _0x338a78=_0x410580;if(this[_0x338a78(0x12f)]())return![];return this[_0x338a78(0x175)]()&&this[_0x338a78(0x107)]();},Game_Actor[_0x410580(0x1c4)][_0x410580(0x107)]=function(){const _0x44512c=_0x410580,_0x41514e=this[_0x44512c(0x26e)]()[_0x44512c(0x255)];if(_0x41514e['match'](/<NO REFERENCE AI>/i))return null;else{if(_0x41514e['match'](/<REFERENCE AI: ENEMY (\d+)>/i))return $dataEnemies[Number(RegExp['$1'])];else{if(_0x41514e[_0x44512c(0x1d8)](/<REFERENCE AI: (.*)>/i))return $dataEnemies[DataManager[_0x44512c(0x1ac)](String(RegExp['$1']))];}}return $dataEnemies[VisuMZ['BattleAI']['Settings'][_0x44512c(0x203)][_0x44512c(0x207)]];},Game_Actor[_0x410580(0x1c4)][_0x410580(0x1cc)]=function(){const _0x51b50a=_0x410580,_0x28e1c3=this['currentClass']()[_0x51b50a(0x255)];if(_0x28e1c3[_0x51b50a(0x1d8)](AIManager[_0x51b50a(0x1cd)][_0x51b50a(0x1cc)]))return String(RegExp['$1'])[_0x51b50a(0x16c)]()['trim']();return VisuMZ[_0x51b50a(0x19e)][_0x51b50a(0x170)][_0x51b50a(0x203)][_0x51b50a(0x1f4)];},Game_Actor[_0x410580(0x1c4)][_0x410580(0x1b4)]=function(){const _0x6dd8d3=_0x410580;Game_Battler[_0x6dd8d3(0x1c4)]['determineNewValidAIAction'][_0x6dd8d3(0x147)](this),this[_0x6dd8d3(0x189)]();},VisuMZ[_0x410580(0x19e)][_0x410580(0x121)]=Game_Actor[_0x410580(0x1c4)][_0x410580(0x189)],Game_Actor['prototype']['makeAutoBattleActions']=function(){const _0x23e9f5=_0x410580;this['isDetermineActionByAI']()?this[_0x23e9f5(0x114)]():VisuMZ['BattleAI'][_0x23e9f5(0x121)][_0x23e9f5(0x147)](this);},Game_Actor[_0x410580(0x1c4)][_0x410580(0x114)]=function(){const _0x34957c=_0x410580;if(this[_0x34957c(0x257)]()>0x0){const _0x3ab00a=this[_0x34957c(0x1a8)]();if(this[_0x34957c(0x19d)]())_0x3ab00a[_0x34957c(0x151)]($dataSkills[this['attackSkillId']()]);if(this[_0x34957c(0x233)]())_0x3ab00a[_0x34957c(0x151)]($dataSkills[this[_0x34957c(0x247)]()]);const _0x14106a=this['referenceEnemyForAI'](),_0x408e48=JsonEx[_0x34957c(0xfd)](_0x14106a['actions']);for(const _0x1ee892 of _0x408e48){if(_0x1ee892[_0x34957c(0x245)]===0x1)_0x1ee892['skillId']=this['attackSkillId']();if(_0x1ee892[_0x34957c(0x245)]===0x2)_0x1ee892['skillId']=this[_0x34957c(0x247)]();}const _0x217466=_0x408e48[_0x34957c(0x248)](_0x2657c2=>this[_0x34957c(0x14f)](_0x2657c2)&&_0x3ab00a['includes']($dataSkills[_0x2657c2[_0x34957c(0x245)]]));if(_0x217466[_0x34957c(0x265)]>0x0){this[_0x34957c(0x115)](_0x217466);return;}}VisuMZ['BattleAI'][_0x34957c(0x121)][_0x34957c(0x147)](this);},Game_Actor['prototype']['meetsCondition']=function(_0x10a2ff){const _0x20426f=_0x410580;return Game_Enemy[_0x20426f(0x1c4)]['meetsCondition'][_0x20426f(0x147)](this,_0x10a2ff);},Game_Actor[_0x410580(0x1c4)][_0x410580(0x269)]=function(_0xffbc70,_0x4b731b){const _0x1ead3e=_0x410580;return Game_Enemy[_0x1ead3e(0x1c4)][_0x1ead3e(0x269)][_0x1ead3e(0x147)](this,_0xffbc70,_0x4b731b);},Game_Actor[_0x410580(0x1c4)][_0x410580(0x20b)]=function(_0x401e9f,_0x22cd08){const _0x3296a6=_0x410580;return Game_Enemy['prototype']['meetsHpCondition'][_0x3296a6(0x147)](this,_0x401e9f,_0x22cd08);},Game_Actor[_0x410580(0x1c4)]['meetsMpCondition']=function(_0x2e6cda,_0x420723){const _0x52d247=_0x410580;return Game_Enemy[_0x52d247(0x1c4)][_0x52d247(0x17a)][_0x52d247(0x147)](this,_0x2e6cda,_0x420723);},Game_Actor[_0x410580(0x1c4)][_0x410580(0x17d)]=function(_0xac947a){const _0x4618c0=_0x410580;return Game_Enemy['prototype'][_0x4618c0(0x17d)][_0x4618c0(0x147)](this,_0xac947a);},Game_Actor['prototype']['meetsPartyLevelCondition']=function(_0x5b4afd){const _0x142da8=_0x410580;return Game_Enemy[_0x142da8(0x1c4)][_0x142da8(0x23a)]['call'](this,_0x5b4afd);},Game_Actor[_0x410580(0x1c4)][_0x410580(0x195)]=function(_0x2fa446){const _0x497bf4=_0x410580;return Game_Enemy[_0x497bf4(0x1c4)][_0x497bf4(0x195)]['call'](this,_0x2fa446);},Game_Enemy[_0x410580(0x1c4)][_0x410580(0x1cc)]=function(){const _0x201142=_0x410580,_0x3fe8d6=this[_0x201142(0x162)]()['note'];if(_0x3fe8d6[_0x201142(0x1d8)](AIManager[_0x201142(0x1cd)][_0x201142(0x1cc)]))return String(RegExp['$1'])[_0x201142(0x16c)]()['trim']();return VisuMZ['BattleAI'][_0x201142(0x170)][_0x201142(0x203)][_0x201142(0x15f)];},VisuMZ[_0x410580(0x19e)][_0x410580(0x219)]=Game_Enemy['prototype'][_0x410580(0x14f)],Game_Enemy[_0x410580(0x1c4)][_0x410580(0x14f)]=function(_0x2bd5f8){const _0x2ac391=_0x410580;if(!VisuMZ[_0x2ac391(0x19e)]['Game_Enemy_isActionValid'][_0x2ac391(0x147)](this,_0x2bd5f8))return![];if(this[_0x2ac391(0x1cc)]()==='random')return!![];return AIManager[_0x2ac391(0x1e5)](this,$dataSkills[_0x2bd5f8[_0x2ac391(0x245)]]);},Game_Actor[_0x410580(0x1c4)][_0x410580(0x14f)]=function(_0x486115){const _0x398874=_0x410580;return Game_Enemy[_0x398874(0x1c4)]['isActionValid'][_0x398874(0x147)](this,_0x486115);},Game_Enemy[_0x410580(0x1c4)][_0x410580(0x1d2)]=function(_0xa40ad3,_0x26fef2){const _0x4d373b=_0x410580,_0x1473fa=_0xa40ad3['reduce']((_0x41c5ac,_0x190ae4)=>_0x41c5ac+_0x190ae4[_0x4d373b(0x1e6)]-_0x26fef2,0x0);if(_0x1473fa>=0x0){let _0x5917d0=Math[_0x4d373b(0x1b0)](_0x1473fa);for(const _0x510709 of _0xa40ad3){_0x5917d0-=_0x510709['rating']-_0x26fef2;if(_0x5917d0<=0x0)return this[_0x4d373b(0x118)]&&this[_0x4d373b(0x118)](_0x510709),_0x510709;}}else return null;},Game_Actor['prototype'][_0x410580(0x1d2)]=function(_0x304c21,_0x284c9d){const _0xd3b417=_0x410580;return Game_Enemy[_0xd3b417(0x1c4)][_0xd3b417(0x1d2)][_0xd3b417(0x147)](this,_0x304c21,_0x284c9d);},Game_Enemy[_0x410580(0x1c4)][_0x410580(0x115)]=function(_0x2e7589){const _0x163cf8=_0x410580,_0x49c270=String(this[_0x163cf8(0x1cc)]())[_0x163cf8(0x16c)]()['trim']();if([_0x163cf8(0x232),_0x163cf8(0x231)][_0x163cf8(0x1d5)](_0x49c270))this['selectAllActionsRandom'](_0x2e7589);else _0x49c270===_0x163cf8(0x146)?this[_0x163cf8(0x18e)](_0x2e7589):this[_0x163cf8(0x21c)](_0x2e7589);},Game_Actor[_0x410580(0x1c4)][_0x410580(0x115)]=function(_0x5b2e2a){const _0x17451c=_0x410580;Game_Enemy[_0x17451c(0x1c4)][_0x17451c(0x115)]['call'](this,_0x5b2e2a);},Game_Battler[_0x410580(0x1c4)]['selectAllActionsClassic']=function(_0x581eb3){const _0x9e1ca1=_0x410580,_0x376c44=Math[_0x9e1ca1(0x129)](..._0x581eb3[_0x9e1ca1(0x24a)](_0x129259=>_0x129259[_0x9e1ca1(0x1e6)])),_0x5302f5=_0x376c44-this[_0x9e1ca1(0x1d9)](),_0xa72aad=this[_0x9e1ca1(0x257)]();_0x581eb3=_0x581eb3[_0x9e1ca1(0x248)](_0x1f8f27=>_0x1f8f27[_0x9e1ca1(0x1e6)]>=_0x5302f5);for(let _0x22b689=0x0;_0x22b689<_0xa72aad;_0x22b689++){_0x581eb3=VisuMZ[_0x9e1ca1(0x19e)]['ShuffleArray'](_0x581eb3);const _0x1f325a=this[_0x9e1ca1(0x1d2)](_0x581eb3,_0x5302f5);this['action'](_0x22b689)[_0x9e1ca1(0x21b)](_0x1f325a);}},VisuMZ[_0x410580(0x19e)][_0x410580(0x13e)]=function(_0x5ada9a){const _0x127c77=_0x410580;var _0x278969,_0x18297b,_0x23094d;for(_0x23094d=_0x5ada9a[_0x127c77(0x265)]-0x1;_0x23094d>0x0;_0x23094d--){_0x278969=Math[_0x127c77(0x168)](Math[_0x127c77(0x232)]()*(_0x23094d+0x1)),_0x18297b=_0x5ada9a[_0x23094d],_0x5ada9a[_0x23094d]=_0x5ada9a[_0x278969],_0x5ada9a[_0x278969]=_0x18297b;}return _0x5ada9a;},Game_Battler[_0x410580(0x1c4)][_0x410580(0x18e)]=function(_0x56a8a7){const _0x1b1973=_0x410580;for(let _0x3c5938=0x0;_0x3c5938<this[_0x1b1973(0x257)]();_0x3c5938++){const _0x198512=_0x56a8a7[0x0];this[_0x1b1973(0x208)](_0x3c5938)[_0x1b1973(0x21b)](_0x198512);}},Game_Battler[_0x410580(0x1c4)][_0x410580(0x1bd)]=function(_0x4fce1d){const _0x241d95=_0x410580;for(let _0x3eda8e=0x0;_0x3eda8e<this[_0x241d95(0x257)]();_0x3eda8e++){const _0x160437=_0x4fce1d[Math[_0x241d95(0x1b0)](_0x4fce1d['length'])];this[_0x241d95(0x208)](_0x3eda8e)[_0x241d95(0x21b)](_0x160437);}},Game_Enemy[_0x410580(0x1c4)][_0x410580(0x1b4)]=function(){const _0x4113a2=_0x410580;Game_Battler[_0x4113a2(0x1c4)][_0x4113a2(0x1b4)][_0x4113a2(0x147)](this);if(this[_0x4113a2(0x257)]()>0x0){const _0x3965a1=this[_0x4113a2(0x162)]()[_0x4113a2(0x136)]['filter'](_0x4bf332=>this['isActionValid'](_0x4bf332));_0x3965a1['length']>0x0?this['selectAllActions'](_0x3965a1):this[_0x4113a2(0x23c)]();}},VisuMZ[_0x410580(0x19e)][_0x410580(0x23e)]=Game_Unit[_0x410580(0x1c4)][_0x410580(0x1ed)],Game_Unit[_0x410580(0x1c4)]['initialize']=function(){const _0x52513e=_0x410580;VisuMZ[_0x52513e(0x19e)][_0x52513e(0x23e)][_0x52513e(0x147)](this),this['initBattleAI']();},Game_Unit[_0x410580(0x1c4)]['initBattleAI']=function(){const _0x2b33b3=_0x410580;this[_0x2b33b3(0x25a)]=![],this[_0x2b33b3(0x1dc)]();},VisuMZ[_0x410580(0x19e)][_0x410580(0x18a)]=Game_Unit[_0x410580(0x1c4)][_0x410580(0x1f9)],Game_Unit[_0x410580(0x1c4)]['aliveMembers']=function(){const _0x3798dd=_0x410580;let _0x301b25=VisuMZ[_0x3798dd(0x19e)]['Game_Unit_aliveMembers'][_0x3798dd(0x147)](this);if(this[_0x3798dd(0x25a)]){const _0x51014c=AIManager[_0x3798dd(0x1c5)]();_0x301b25=_0x301b25[_0x3798dd(0x248)](_0x3f092d=>_0x51014c['includes'](_0x3f092d));}return _0x301b25;},VisuMZ['BattleAI'][_0x410580(0x26a)]=Game_Unit['prototype'][_0x410580(0x1b8)],Game_Unit[_0x410580(0x1c4)][_0x410580(0x1b8)]=function(){const _0x2c4c18=_0x410580;AIManager[_0x2c4c18(0x22c)]()&&(this[_0x2c4c18(0x25a)]=!![]);const _0xc0344b=VisuMZ[_0x2c4c18(0x19e)][_0x2c4c18(0x26a)][_0x2c4c18(0x147)](this);return this[_0x2c4c18(0x25a)]=![],_0xc0344b;},Game_Unit[_0x410580(0x1c4)][_0x410580(0x1dc)]=function(){const _0x2c553d=_0x410580;this[_0x2c553d(0x11b)]={'evaRates':[],'mevRates':[],'elementRates':{}};},Game_Unit[_0x410580(0x1c4)][_0x410580(0x12d)]=function(){const _0x15f458=_0x410580;if(this['_aiKnowledge']===undefined)this[_0x15f458(0x1dc)]();return this[_0x15f458(0x11b)];},Game_Unit[_0x410580(0x1c4)]['addXParamAIKnowledge']=function(_0x43362c,_0x4cef52){const _0x18ac0d=_0x410580;this[_0x18ac0d(0x12d)]()[_0x43362c]=this['aiKnowledge']()[_0x43362c]||[];const _0x247cd7=_0x4cef52[_0x18ac0d(0x260)]()?_0x4cef52[_0x18ac0d(0x225)]():_0x4cef52[_0x18ac0d(0x165)]();!this[_0x18ac0d(0x12d)]()[_0x43362c]['includes'](_0x247cd7)&&this[_0x18ac0d(0x12d)]()[_0x43362c]['push'](_0x247cd7);},Game_Unit['prototype'][_0x410580(0x140)]=function(_0x12ca18,_0x2955ad){const _0x327e79=_0x410580;if(!VisuMZ[_0x327e79(0x19e)][_0x327e79(0x170)][_0x327e79(0x203)]['LearnKnowledge'])return!![];const _0x44d1a8=_0x12ca18[_0x327e79(0x1d8)](/EVA/i)?'evaRates':'mevRates';this['aiKnowledge']()[_0x44d1a8]=this[_0x327e79(0x12d)]()[_0x44d1a8]||[];const _0x466d3d=_0x2955ad['isActor']()?_0x2955ad[_0x327e79(0x225)]():_0x2955ad[_0x327e79(0x165)]();return this['aiKnowledge']()[_0x44d1a8][_0x327e79(0x1d5)](_0x466d3d);},Game_Unit[_0x410580(0x1c4)][_0x410580(0x160)]=function(_0x356ace,_0x1a7365){const _0x4cbb7d=_0x410580;this[_0x4cbb7d(0x12d)]()[_0x4cbb7d(0x13a)]=this[_0x4cbb7d(0x12d)]()[_0x4cbb7d(0x13a)]||{};const _0x55b49f=this[_0x4cbb7d(0x12d)]()[_0x4cbb7d(0x13a)];_0x55b49f[_0x356ace]=_0x55b49f[_0x356ace]||[];const _0x8d786e=_0x1a7365[_0x4cbb7d(0x260)]()?_0x1a7365[_0x4cbb7d(0x225)]():_0x1a7365[_0x4cbb7d(0x165)]();!_0x55b49f[_0x356ace][_0x4cbb7d(0x1d5)](_0x8d786e)&&_0x55b49f[_0x356ace][_0x4cbb7d(0x151)](_0x8d786e);},Game_Unit[_0x410580(0x1c4)][_0x410580(0x228)]=function(_0x5c17af,_0x561d63){const _0x166c8f=_0x410580;if(!VisuMZ['BattleAI'][_0x166c8f(0x170)][_0x166c8f(0x203)][_0x166c8f(0x12a)])return!![];this['aiKnowledge']()[_0x166c8f(0x13a)]=this[_0x166c8f(0x12d)]()['elementRates']||{};const _0x56971d=this[_0x166c8f(0x12d)]()[_0x166c8f(0x13a)];_0x56971d[_0x5c17af]=_0x56971d[_0x5c17af]||[];const _0x56fa44=_0x561d63[_0x166c8f(0x260)]()?_0x561d63[_0x166c8f(0x225)]():_0x561d63[_0x166c8f(0x165)]();return _0x56971d[_0x5c17af][_0x166c8f(0x1d5)](_0x56fa44);},VisuMZ[_0x410580(0x19e)][_0x410580(0x220)]=Game_Troop['prototype'][_0x410580(0x1d4)],Game_Troop[_0x410580(0x1c4)][_0x410580(0x1d4)]=function(_0x532373){const _0x485c4e=_0x410580;VisuMZ[_0x485c4e(0x19e)][_0x485c4e(0x220)][_0x485c4e(0x147)](this,_0x532373),this[_0x485c4e(0x1dc)]();};