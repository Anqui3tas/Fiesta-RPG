//=============================================================================
// VisuStella MZ - Battle A.I.
// VisuMZ_3_BattleAI.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_BattleAI = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleAI = VisuMZ.BattleAI || {};
VisuMZ.BattleAI.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.07] [BattleAI]
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
 * It goes down the list of skills and uses them in order as long as they meet
 * the Action Pattern conditions and A.I. conditions. Ratings will be ignored.
 * 
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
 *   Influence Rate:
 *   - This determines the default level of influence MEV rates have on
 *     TGR weight.
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
 */
//=============================================================================

const _0x2981=['guardSkillId','actorId','_subject','ActorAIReference','meetsCondition','aiApplyEvaTgrInfluenceRate','Game_Unit_initialize','ARRAYFUNC','EvaTgr','damage','sparam','isPlaytest','VisuMZ_1_ElementStatusCore','indexOf','randomInt','Game_Action_apply','charAt','meetsStateCondition','EnableAnyCon','HRG','NEGATIVE\x20STATE\x20COUNT','random','isAutoBattle','AddDebuff%1','hpRate','ActorRatingVariance','highest','call','%1\x20%2\x20%3','selectAllActionsRandom','isMagical','clamp','enemyId','801rCTlsH','clearAiTgrInfluence','EvaTgrRate','statesByCategory','makeDefaultConditions','evaInfluenceRate','itemTargetCandidates','mpRate','initBattleAI','getEnemyIdWithName','toUpperCase','status','canAttack','hasXParamAIKnowledge','filterForcedTargeting','This\x20is\x20a\x20static\x20class','elementId','_bypassAiValidCheck','isConfused','concat','FIRST','rating','xparam','DEF','MAT','skillId','doesAIApplyEvaTgrInfluence','MDR','referenceEnemyForAI','isActionValid','MpDrain%1','doesTargetMeetAIConditions','isBuffAffected','action','actor','return\x200','log','mev','hasForcedTargets','trim','allCondition','doesAIApplyElementalTgrInfluence','General','getDefaultAnyConditions','value1','1687HGVNcZ','reduce','value','selectAction','dataId','aiStyle','VisuMZ_1_SkillsStatesCore','MRG','Game_Actor_makeAutoBattleActions','param','evaRates','currentAction','hasElementAIKnowledge','getAnyConditions','aiMevTgr','setAiTgrInfluences','isForEveryone','addAIKnowledge','EnemyRatingVariance','determineNewValidAIAction','HpDamage%1','friendsUnit','parameters','map','split','_applyAIForcedTargetFilters','EnableAllCon','MEV','getStateIdWithName','Game_Troop_setup','elementRates','MCR','bypassMevTgr','LEVEL','1075563MwFNcU','gambit','BattleAI','EFFECT_ADD_DEBUFF','MpRecover%1','CEV','isConditionalAI','_forceValidTargets','push','elementInfluence','UnknownElementRate','note','MAXMP','version','noCondition','selectAllActions','level','_aiKnowledge','USER','currentClass','LUK','needsSelection','ActorStyleAI','getElementIdWithName','aiTarget','startAction','getAllConditions','doesAIApplyMevTgrInfluence','LearnKnowledge','FUNC','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','format','HpRecover%1','user','numActions','EFFECT_REMOVE_BUFF','EnemyAILevel','parse','ElementTgr','1148807CNtrFe','includes','value2','ElementTgrRate','actions','remove','FDR','ATK','setEnemyAction','BattleManager_startAction','AddBuff%1','EFFECT_ADD_STATE','STATE\x20COUNT','classic','filter','deadMembers','bypassElementTgr','opponentsUnit','meetsPartyLevelCondition','All','aiApplyElementalTgrInfluenceRate','aliveMembers','isForOpponent','CRI','1204384PUaeWF','Default','Game_Action_makeTargets','_regexp','elementInfluenceRate','determineActionByAIisStillValid','RemoveDebuff%1','length','autoRemovalTiming','MP%','floor','ConvertParams','REC','HIT','meetsSwitchCondition','slice','MAX_SAFE_INTEGER','getDefaultAllConditions','createFilterTarget','aiApplyMevTgrInfluenceRate','toLowerCase','meetsTurnCondition','isPhysical','exit','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','doesTargetMeetCondition','elementIds','maxTp','hasValidTargets','description','match','Weight','TCR','replace','eva','elementKnowledgeRate','isDetermineActionByAI','ARRAYEVAL','Game_Unit_randomTarget','EFFECT_RECOVER_HP','passesAILevel','AGI','clearForcedTargets','initialize','4720UWEooK','addElementAIKnowledge','aiElementTgr','RemoveState%1','anyCondition','addXParamAIKnowledge','MDF','POSITIVE','EVAL','forceValidTargets','STR','EFFECT_REMOVE_DEBUFF','PHA','AddState%1','AI\x20Manager\x20could\x20not\x20determine\x20this\x20value:\x20%1','casual','EFFECT_RECOVER_MP','mevRates','isMax%1Affected','elements','elementRate','subject','PDR','NEGATIVE','determineLineValue','aiRatingVariance','aiTgrInfluence','attackElements','Settings','type','MAXHP','name','Game_Enemy_isActionValid','forcedTargets','isStateAffected','meetsHpCondition','Game_Temp_initialize','doesTargetMeetAllConditions','max','isDebuffAffected','_stateIDs','isEnemy','enemy','makeDeepCopy','clearAIKnowledge','723373zOlqZr','selectAllActionsGambit','meetsMpCondition','isForDeadFriend','TP%','LAST','NUM','states','aiLevel','ALWAYS','899091pwJvGf','EVA','isSkill','tpRate','code','mmp','137tARAmS','buff','mevInfluenceRate','_elementIDs','ARRAYSTRUCT','applyBattleAI','attackSkillId','mhp','VisuMZ_1_BattleCore','MpDamage%1','makeTargets','_aiTgrInfluence','usableSkills','_stateTurns','RemoveBuff%1','aiEvaTgr','doesTargetMeetAnyConditions','isActor','makeAutoBattleActionsWithEnemyAI','Game_BattlerBase_sparam','prototype','isForAliveFriend','JSON','GRD','apply','makeAutoBattleActions','item','aiKnowledge','makeValidTargets'];const _0x1cae=function(_0x4f8ee0,_0x5aaa52){_0x4f8ee0=_0x4f8ee0-0x1ae;let _0x2981a9=_0x2981[_0x4f8ee0];return _0x2981a9;};const _0x407437=_0x1cae;(function(_0x59c566,_0x161f3a){const _0x3e32b0=_0x1cae;while(!![]){try{const _0x2c3d15=parseInt(_0x3e32b0(0x1e5))+parseInt(_0x3e32b0(0x28d))*-parseInt(_0x3e32b0(0x1c3))+-parseInt(_0x3e32b0(0x224))+-parseInt(_0x3e32b0(0x20c))+-parseInt(_0x3e32b0(0x27d))+-parseInt(_0x3e32b0(0x287))+-parseInt(_0x3e32b0(0x250))*-parseInt(_0x3e32b0(0x2cb));if(_0x2c3d15===_0x161f3a)break;else _0x59c566['push'](_0x59c566['shift']());}catch(_0x538e5b){_0x59c566['push'](_0x59c566['shift']());}}}(_0x2981,0x9e925));var label=_0x407437(0x1e7),tier=tier||0x0,dependencies=[_0x407437(0x295)],pluginData=$plugins[_0x407437(0x21a)](function(_0x1d0ee1){const _0x17cc4c=_0x407437;return _0x1d0ee1[_0x17cc4c(0x2d6)]&&_0x1d0ee1[_0x17cc4c(0x241)][_0x17cc4c(0x20d)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x407437(0x26c)]||{},VisuMZ['ConvertParams']=function(_0x5c66ce,_0x267fb9){const _0x56a667=_0x407437;for(const _0x2a646f in _0x267fb9){if(_0x2a646f['match'](/(.*):(.*)/i)){const _0x474891=String(RegExp['$1']),_0x17ecc3=String(RegExp['$2'])[_0x56a667(0x2d5)]()[_0x56a667(0x1bd)]();let _0x20a681,_0x2c384f,_0x18b192;switch(_0x17ecc3){case _0x56a667(0x283):_0x20a681=_0x267fb9[_0x2a646f]!==''?Number(_0x267fb9[_0x2a646f]):0x0;break;case'ARRAYNUM':_0x2c384f=_0x267fb9[_0x2a646f]!==''?JSON[_0x56a667(0x20a)](_0x267fb9[_0x2a646f]):[],_0x20a681=_0x2c384f['map'](_0x427718=>Number(_0x427718));break;case _0x56a667(0x258):_0x20a681=_0x267fb9[_0x2a646f]!==''?eval(_0x267fb9[_0x2a646f]):null;break;case _0x56a667(0x249):_0x2c384f=_0x267fb9[_0x2a646f]!==''?JSON[_0x56a667(0x20a)](_0x267fb9[_0x2a646f]):[],_0x20a681=_0x2c384f['map'](_0x1d2388=>eval(_0x1d2388));break;case _0x56a667(0x2a3):_0x20a681=_0x267fb9[_0x2a646f]!==''?JSON[_0x56a667(0x20a)](_0x267fb9[_0x2a646f]):'';break;case'ARRAYJSON':_0x2c384f=_0x267fb9[_0x2a646f]!==''?JSON[_0x56a667(0x20a)](_0x267fb9[_0x2a646f]):[],_0x20a681=_0x2c384f[_0x56a667(0x1da)](_0x2ae6c1=>JSON[_0x56a667(0x20a)](_0x2ae6c1));break;case _0x56a667(0x202):_0x20a681=_0x267fb9[_0x2a646f]!==''?new Function(JSON['parse'](_0x267fb9[_0x2a646f])):new Function(_0x56a667(0x1b9));break;case _0x56a667(0x2b1):_0x2c384f=_0x267fb9[_0x2a646f]!==''?JSON[_0x56a667(0x20a)](_0x267fb9[_0x2a646f]):[],_0x20a681=_0x2c384f[_0x56a667(0x1da)](_0x4a2475=>new Function(JSON['parse'](_0x4a2475)));break;case _0x56a667(0x25a):_0x20a681=_0x267fb9[_0x2a646f]!==''?String(_0x267fb9[_0x2a646f]):'';break;case'ARRAYSTR':_0x2c384f=_0x267fb9[_0x2a646f]!==''?JSON['parse'](_0x267fb9[_0x2a646f]):[],_0x20a681=_0x2c384f[_0x56a667(0x1da)](_0x26492c=>String(_0x26492c));break;case'STRUCT':_0x18b192=_0x267fb9[_0x2a646f]!==''?JSON[_0x56a667(0x20a)](_0x267fb9[_0x2a646f]):{},_0x20a681=VisuMZ['ConvertParams']({},_0x18b192);break;case _0x56a667(0x291):_0x2c384f=_0x267fb9[_0x2a646f]!==''?JSON[_0x56a667(0x20a)](_0x267fb9[_0x2a646f]):[],_0x20a681=_0x2c384f[_0x56a667(0x1da)](_0x1652aa=>VisuMZ[_0x56a667(0x22f)]({},JSON[_0x56a667(0x20a)](_0x1652aa)));break;default:continue;}_0x5c66ce[_0x474891]=_0x20a681;}}return _0x5c66ce;},(_0x4263c9=>{const _0x1df5a5=_0x407437,_0x5ca44d=_0x4263c9[_0x1df5a5(0x26f)];for(const _0x5755a3 of dependencies){if(!Imported[_0x5755a3]){alert(_0x1df5a5(0x23c)[_0x1df5a5(0x204)](_0x5ca44d,_0x5755a3)),SceneManager[_0x1df5a5(0x23b)]();break;}}const _0x5256d5=_0x4263c9['description'];if(_0x5256d5[_0x1df5a5(0x242)](/\[Version[ ](.*?)\]/i)){const _0x3c6998=Number(RegExp['$1']);_0x3c6998!==VisuMZ[label][_0x1df5a5(0x1f2)]&&(alert(_0x1df5a5(0x203)[_0x1df5a5(0x204)](_0x5ca44d,_0x3c6998)),SceneManager[_0x1df5a5(0x23b)]());}if(_0x5256d5['match'](/\[Tier[ ](\d+)\]/i)){const _0x51c399=Number(RegExp['$1']);_0x51c399<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x1df5a5(0x204)](_0x5ca44d,_0x51c399,tier)),SceneManager[_0x1df5a5(0x23b)]()):tier=Math['max'](_0x51c399,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x1df5a5(0x26c)],_0x4263c9[_0x1df5a5(0x1d9)]);})(pluginData);function AIManager(){const _0x2c8e31=_0x407437;throw new Error(_0x2c8e31(0x2da));}AIManager[_0x407437(0x227)]={'noCondition':/<NO AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'allCondition':/<ALL AI (?:TARGETS|CONDITION|CONDITIONS)>\s*([\s\S]*)\s*<\/ALL AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'anyCondition':/<ANY AI (?:TARGETS|CONDITION|CONDITIONS)>\s*([\s\S]*)\s*<\/ANY AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'bypassElementTgr':/<(?:NO|BYPASS) AI (?:ELEMENT|ELEMENTAL|ELEMENT RATE) INFLUENCE>/i,'bypassEvaTgr':/<(?:NO|BYPASS) AI (?:EVA|EVASION) INFLUENCE>/i,'bypassMevTgr':/<(?:NO|BYPASS) AI (?:MEV|MAGIC EVASION) INFLUENCE>/i,'aiElementTgr':/<AI (?:ELEMENT|ELEMENTAL|ELEMENT RATE) INFLUENCE: (.*)>/i,'aiEvaTgr':/<AI (?:EVA|EVASION) INFLUENCE: (.*)>/i,'aiMevTgr':/<AI (?:MEV|MAGIC EVASION) INFLUENCE: (.*)>/i,'aiLevel':/<AI LEVEL: (\d+)>/i,'aiRatingVariance':/<AI RATING VARIANCE: (\d+)>/i,'aiTarget':/<AI (?:TARGET|TARGETS):[ ](.*)>/i,'aiStyle':/<AI STYLE:[ ](.*)>/i},AIManager[_0x407437(0x1eb)]=function(_0xf0fcff){const _0x543d39=_0x407437;if(!_0xf0fcff)return![];return this[_0x543d39(0x1ff)](_0xf0fcff)['length']>0x0||this[_0x543d39(0x1d0)](_0xf0fcff)[_0x543d39(0x22b)]>0x0;},AIManager['getAllConditions']=function(_0x2621c0){const _0xb9200c=_0x407437;if(_0x2621c0[_0xb9200c(0x1f0)][_0xb9200c(0x242)](AIManager['_regexp'][_0xb9200c(0x1f3)]))return[];else return _0x2621c0[_0xb9200c(0x1f0)][_0xb9200c(0x242)](AIManager['_regexp'][_0xb9200c(0x1be)])?String(RegExp['$1'])[_0xb9200c(0x1db)](/[\r\n]+/)[_0xb9200c(0x211)](''):this[_0xb9200c(0x235)](_0x2621c0);},AIManager['getAnyConditions']=function(_0x4e7f18){const _0xb8d543=_0x407437;if(_0x4e7f18[_0xb8d543(0x1f0)][_0xb8d543(0x242)](AIManager['_regexp']['noCondition']))return[];else return _0x4e7f18['note']['match'](AIManager[_0xb8d543(0x227)][_0xb8d543(0x254)])?String(RegExp['$1'])[_0xb8d543(0x1db)](/[\r\n]+/)['remove'](''):this[_0xb8d543(0x1c1)](_0x4e7f18);},AIManager[_0x407437(0x235)]=function(_0x950431){const _0x1b53a7=_0x407437;if(!VisuMZ[_0x1b53a7(0x1e7)][_0x1b53a7(0x26c)][_0x1b53a7(0x225)][_0x1b53a7(0x1dd)])return[];if(_0x950431[_0x1b53a7(0x1f0)][_0x1b53a7(0x242)](AIManager[_0x1b53a7(0x227)][_0x1b53a7(0x254)]))return[];return this[_0x1b53a7(0x2cf)](_0x950431,_0x1b53a7(0x21f));},AIManager[_0x407437(0x1c1)]=function(_0x52ffca){const _0x43f1d8=_0x407437;if(!VisuMZ['BattleAI'][_0x43f1d8(0x26c)][_0x43f1d8(0x225)][_0x43f1d8(0x2bc)])return[];if(_0x52ffca[_0x43f1d8(0x1f0)][_0x43f1d8(0x242)](AIManager[_0x43f1d8(0x227)][_0x43f1d8(0x1be)]))return[];return this[_0x43f1d8(0x2cf)](_0x52ffca,'Any');},AIManager[_0x407437(0x2cf)]=function(_0x1361ee,_0x4df9fe){const _0x1195b4=_0x407437;if(!_0x1361ee)return[];const _0x3738c8=VisuMZ[_0x1195b4(0x1e7)]['Settings'][_0x1195b4(0x225)],_0x2c28d5=['MAXHP',_0x1195b4(0x1f1),'ATK',_0x1195b4(0x2e2),_0x1195b4(0x1ae),_0x1195b4(0x256),_0x1195b4(0x24d),_0x1195b4(0x1f9)],_0xc2fd53=_0x1361ee[_0x1195b4(0x2b3)][_0x1195b4(0x26d)],_0x36bb4c=_0x1361ee['effects'];let _0x37b578=[],_0x4639e8='',_0x36ffbd='';switch(_0xc2fd53){case 0x1:_0x4639e8=_0x1195b4(0x1d7)['format'](_0x4df9fe),_0x36ffbd=_0x3738c8[_0x4639e8],_0x37b578=_0x37b578[_0x1195b4(0x2de)](_0x36ffbd[_0x1195b4(0x1db)](/[\r\n]+/)[_0x1195b4(0x211)](''));break;case 0x2:_0x4639e8='MpDamage%1'['format'](_0x4df9fe),_0x36ffbd=_0x3738c8[_0x4639e8],_0x37b578=_0x37b578[_0x1195b4(0x2de)](_0x36ffbd['split'](/[\r\n]+/)[_0x1195b4(0x211)](''));break;case 0x3:_0x4639e8=_0x1195b4(0x205)[_0x1195b4(0x204)](_0x4df9fe),_0x36ffbd=_0x3738c8[_0x4639e8],_0x37b578=_0x37b578['concat'](_0x36ffbd['split'](/[\r\n]+/)['remove'](''));break;case 0x4:_0x4639e8=_0x1195b4(0x1e9)[_0x1195b4(0x204)](_0x4df9fe),_0x36ffbd=_0x3738c8[_0x4639e8],_0x37b578=_0x37b578[_0x1195b4(0x2de)](_0x36ffbd[_0x1195b4(0x1db)](/[\r\n]+/)[_0x1195b4(0x211)](''));break;case 0x5:_0x4639e8='HpDrain%1'[_0x1195b4(0x204)](_0x4df9fe),_0x36ffbd=_0x3738c8[_0x4639e8],_0x37b578=_0x37b578['concat'](_0x36ffbd[_0x1195b4(0x1db)](/[\r\n]+/)[_0x1195b4(0x211)](''));break;case 0x6:_0x4639e8=_0x1195b4(0x1b4)[_0x1195b4(0x204)](_0x4df9fe),_0x36ffbd=_0x3738c8[_0x4639e8],_0x37b578=_0x37b578[_0x1195b4(0x2de)](_0x36ffbd['split'](/[\r\n]+/)[_0x1195b4(0x211)](''));break;}for(const _0x341bb5 of _0x36bb4c){if(!_0x341bb5)continue;switch(_0x341bb5[_0x1195b4(0x28b)]){case Game_Action[_0x1195b4(0x24b)]:if(_0x341bb5[_0x1195b4(0x1c2)]>0x0||_0x341bb5[_0x1195b4(0x20e)]>0x0)_0x4639e8=_0x1195b4(0x205)['format'](_0x4df9fe),_0x36ffbd=_0x3738c8[_0x4639e8],_0x37b578=_0x37b578['concat'](_0x36ffbd[_0x1195b4(0x1db)](/[\r\n]+/)['remove'](''));else(_0x341bb5[_0x1195b4(0x1c2)]<0x0||_0x341bb5[_0x1195b4(0x20e)]<0x0)&&(_0x4639e8='HpDamage%1'['format'](_0x4df9fe),_0x36ffbd=_0x3738c8[_0x4639e8],_0x37b578=_0x37b578[_0x1195b4(0x2de)](_0x36ffbd['split'](/[\r\n]+/)['remove']('')));break;case Game_Action[_0x1195b4(0x260)]:if(_0x341bb5[_0x1195b4(0x1c2)]>0x0||_0x341bb5['value2']>0x0)_0x4639e8=_0x1195b4(0x1e9)[_0x1195b4(0x204)](_0x4df9fe),_0x36ffbd=_0x3738c8[_0x4639e8],_0x37b578=_0x37b578[_0x1195b4(0x2de)](_0x36ffbd[_0x1195b4(0x1db)](/[\r\n]+/)['remove'](''));else(_0x341bb5[_0x1195b4(0x1c2)]<0x0||_0x341bb5[_0x1195b4(0x20e)]<0x0)&&(_0x4639e8=_0x1195b4(0x296)['format'](_0x4df9fe),_0x36ffbd=_0x3738c8[_0x4639e8],_0x37b578=_0x37b578[_0x1195b4(0x2de)](_0x36ffbd['split'](/[\r\n]+/)[_0x1195b4(0x211)]('')));break;case Game_Action[_0x1195b4(0x217)]:if(_0x341bb5['dataId']===0x0)continue;_0x4639e8=_0x1195b4(0x25d)[_0x1195b4(0x204)](_0x4df9fe),_0x36ffbd=_0x3738c8[_0x4639e8][_0x1195b4(0x204)](_0x341bb5[_0x1195b4(0x1c7)]),_0x37b578=_0x37b578['concat'](_0x36ffbd['split'](/[\r\n]+/)[_0x1195b4(0x211)](''));break;case Game_Action['EFFECT_REMOVE_STATE']:_0x4639e8=_0x1195b4(0x253)[_0x1195b4(0x204)](_0x4df9fe),_0x36ffbd=_0x3738c8[_0x4639e8]['format'](_0x341bb5[_0x1195b4(0x1c7)]),_0x37b578=_0x37b578[_0x1195b4(0x2de)](_0x36ffbd[_0x1195b4(0x1db)](/[\r\n]+/)['remove'](''));break;case Game_Action['EFFECT_ADD_BUFF']:_0x4639e8=_0x1195b4(0x216)['format'](_0x4df9fe),_0x36ffbd=_0x3738c8[_0x4639e8][_0x1195b4(0x204)](_0x2c28d5[_0x341bb5[_0x1195b4(0x1c7)]]),_0x37b578=_0x37b578[_0x1195b4(0x2de)](_0x36ffbd[_0x1195b4(0x1db)](/[\r\n]+/)[_0x1195b4(0x211)](''));break;case Game_Action[_0x1195b4(0x1e8)]:_0x4639e8=_0x1195b4(0x2c1)['format'](_0x4df9fe),_0x36ffbd=_0x3738c8[_0x4639e8]['format'](_0x2c28d5[_0x341bb5['dataId']]),_0x37b578=_0x37b578[_0x1195b4(0x2de)](_0x36ffbd[_0x1195b4(0x1db)](/[\r\n]+/)[_0x1195b4(0x211)](''));break;case Game_Action[_0x1195b4(0x208)]:_0x4639e8=_0x1195b4(0x29b)[_0x1195b4(0x204)](_0x4df9fe),_0x36ffbd=_0x3738c8[_0x4639e8][_0x1195b4(0x204)](_0x2c28d5[_0x341bb5[_0x1195b4(0x1c7)]]),_0x37b578=_0x37b578[_0x1195b4(0x2de)](_0x36ffbd[_0x1195b4(0x1db)](/[\r\n]+/)[_0x1195b4(0x211)](''));break;case Game_Action[_0x1195b4(0x25b)]:_0x4639e8=_0x1195b4(0x22a)[_0x1195b4(0x204)](_0x4df9fe),_0x36ffbd=_0x3738c8[_0x4639e8][_0x1195b4(0x204)](_0x2c28d5[_0x341bb5[_0x1195b4(0x1c7)]]),_0x37b578=_0x37b578[_0x1195b4(0x2de)](_0x36ffbd[_0x1195b4(0x1db)](/[\r\n]+/)[_0x1195b4(0x211)](''));break;}}return _0x37b578;},AIManager[_0x407437(0x259)]=function(_0x37da4f,_0x15afcf){const _0x4f30f1=_0x407437;this[_0x4f30f1(0x1ec)]=this['makeValidTargets'](_0x37da4f,_0x15afcf);},AIManager[_0x407437(0x24e)]=function(){const _0x344ade=_0x407437;this[_0x344ade(0x1ec)]=[];},AIManager[_0x407437(0x271)]=function(){const _0x5d1da1=_0x407437;return this[_0x5d1da1(0x1ec)]=this[_0x5d1da1(0x1ec)]||[],this[_0x5d1da1(0x1ec)];},AIManager['hasForcedTargets']=function(){const _0x4f44f8=_0x407437;return this[_0x4f44f8(0x271)]()[_0x4f44f8(0x22b)]>0x0;},AIManager[_0x407437(0x240)]=function(_0x382e72,_0x5d86da){const _0x28b917=_0x407437;if(!_0x382e72)return![];if(!_0x5d86da)return![];if(!DataManager[_0x28b917(0x289)](_0x5d86da))return;return this[_0x28b917(0x1eb)](_0x5d86da)?this[_0x28b917(0x2a9)](_0x382e72,_0x5d86da)['length']>=0x1:!![];},AIManager[_0x407437(0x2a9)]=function(_0x2c2c66,_0x3e19e7){const _0x203957=_0x407437;let _0x517aa7=[];if(this[_0x203957(0x1eb)](_0x3e19e7)){const _0x17cd91=this[_0x203957(0x1ff)](_0x3e19e7),_0x52f2c1=this[_0x203957(0x1d0)](_0x3e19e7),_0x128823=new Game_Action(_0x2c2c66);_0x128823['setSkill'](_0x3e19e7['id']);let _0x47b019=[];if(_0x128823[_0x203957(0x1d3)]())_0x47b019=$gameParty[_0x203957(0x221)]()['concat']($gameTroop['aliveMembers']());else{if(_0x128823[_0x203957(0x222)]())_0x47b019=_0x2c2c66[_0x203957(0x21d)]()[_0x203957(0x221)]();else{if(_0x128823[_0x203957(0x280)]())_0x47b019=_0x2c2c66[_0x203957(0x1d8)]()[_0x203957(0x21b)]();else _0x128823[_0x203957(0x2a2)]()&&(_0x47b019=_0x2c2c66['friendsUnit']()[_0x203957(0x221)]());}}_0x517aa7=_0x47b019[_0x203957(0x21a)](_0x57266f=>this[_0x203957(0x1b5)](_0x2c2c66,_0x57266f,_0x3e19e7,_0x17cd91,_0x52f2c1));}return _0x517aa7;},AIManager['doesTargetMeetAIConditions']=function(_0x1584af,_0x3a352b,_0xdb7c54,_0x361055,_0x5e8360){const _0x585522=_0x407437;return this[_0x585522(0x275)](_0x1584af,_0x3a352b,_0xdb7c54,_0x361055)&&this[_0x585522(0x29d)](_0x1584af,_0x3a352b,_0xdb7c54,_0x5e8360);},AIManager[_0x407437(0x275)]=function(_0x2a339a,_0x2f25e7,_0x58be37,_0x17c587){const _0x5ad56e=_0x407437;if(_0x17c587['length']<=0x0)return!![];for(const _0x28d249 of _0x17c587){if(!_0x28d249)continue;if(_0x28d249[_0x5ad56e(0x22b)]<=0x0)continue;if(!this[_0x5ad56e(0x24c)](_0x2a339a))return!![];if(!this[_0x5ad56e(0x23d)](_0x2a339a,_0x2f25e7,_0x58be37,_0x28d249))return![];}return!![];},AIManager[_0x407437(0x29d)]=function(_0x11f73a,_0x2f53c1,_0x29fea8,_0x55d5fa){const _0x456fb7=_0x407437;if(_0x55d5fa[_0x456fb7(0x22b)]<=0x0)return!![];for(const _0x172fbd of _0x55d5fa){if(!_0x172fbd)continue;if(_0x172fbd['length']<=0x0)continue;if(!this['passesAILevel'](_0x11f73a))return!![];if(this['doesTargetMeetCondition'](_0x11f73a,_0x2f53c1,_0x29fea8,_0x172fbd))return!![];}return![];},AIManager[_0x407437(0x24c)]=function(_0x42b73a){const _0x279a7f=_0x407437,_0x53d26d=_0x42b73a[_0x279a7f(0x285)]();return Math[_0x279a7f(0x2b8)](0x64)<_0x53d26d;},AIManager['doesTargetMeetCondition']=function(_0x1eb702,_0x372c11,_0x531ac1,_0xd06bd5){const _0x4e11c4=_0x407437,_0x478961=[_0x4e11c4(0x26e),_0x4e11c4(0x1f1),'ATK',_0x4e11c4(0x2e2),_0x4e11c4(0x1ae),_0x4e11c4(0x256),_0x4e11c4(0x24d),_0x4e11c4(0x1f9)];if(_0xd06bd5[_0x4e11c4(0x2d5)]()[_0x4e11c4(0x1bd)]()===_0x4e11c4(0x286))return!![];const _0x41da15=_0x1eb702;if(_0xd06bd5[_0x4e11c4(0x242)](/(.*) (\>=|\>|===|!==|\<|\<=) (.*)/i)){const _0x285007=[String(RegExp['$1']),String(RegExp['$2']),String(RegExp['$3'])],_0x52c5af=this[_0x4e11c4(0x268)](_0x1eb702,_0x372c11,_0x531ac1,_0x285007[0x0]),_0x4c9dac=_0x285007[0x1],_0x4b59b5=this[_0x4e11c4(0x268)](_0x1eb702,_0x372c11,_0x531ac1,_0x285007[0x2]);window['user']=window['a']=window['b']=undefined;const _0x31edbc=_0x4e11c4(0x2c6)['format'](_0x52c5af,_0x4c9dac,_0x4b59b5);try{return eval(_0x31edbc);}catch(_0x2d2c3d){return $gameTemp['isPlaytest']()&&(console[_0x4e11c4(0x1ba)]('AI\x20Manager\x20condition\x20cannot\x20be\x20met:\x20%1'[_0x4e11c4(0x204)](_0xd06bd5)),console[_0x4e11c4(0x1ba)](_0x2d2c3d)),!![];}}else{if(_0xd06bd5[_0x4e11c4(0x242)](/(\d+\.?\d*)([%％]) CHANCE/i)){const _0x4acf4d=Number(RegExp['$1'])*0.01;return Math[_0x4e11c4(0x2bf)]()<_0x4acf4d;}else{if(_0xd06bd5[_0x4e11c4(0x242)](/SWITCH (\d+) (ON|OFF|TRUE|FALSE)/i)){const _0x4e760f=Number(RegExp['$1']),_0x7a02cd=String(RegExp['$2'])[_0x4e11c4(0x238)](),_0x38423d=_0x7a02cd['match'](/ON|TRUE/i);return $gameSwitches[_0x4e11c4(0x1c5)](_0x4e760f)===_0x38423d;}else{if(_0xd06bd5[_0x4e11c4(0x242)](/(.*) IS ACTOR/i)){const _0x5a4436=String(RegExp['$1'])[_0x4e11c4(0x242)](/(?:USER|SUBJECT)/i)?_0x41da15:_0x372c11;return _0x5a4436[_0x4e11c4(0x29e)]();}else{if(_0xd06bd5[_0x4e11c4(0x242)](/(.*) IS ENEMY/i)){const _0x3f6539=String(RegExp['$1'])[_0x4e11c4(0x242)](/(?:USER|SUBJECT)/i)?_0x41da15:_0x372c11;return _0x3f6539[_0x4e11c4(0x279)]();}else{if(_0xd06bd5[_0x4e11c4(0x242)](/(.*) HAS STATE (\d+)/i)){const _0xd1d269=$dataStates[Number(RegExp['$2'])],_0x28222c=String(RegExp['$1'])[_0x4e11c4(0x242)](/(?:USER|SUBJECT)/i)?_0x41da15:_0x372c11;return _0x28222c[_0x4e11c4(0x284)]()[_0x4e11c4(0x20d)](_0xd1d269);}else{if(_0xd06bd5[_0x4e11c4(0x242)](/(.*) HAS STATE (.*)/i)){const _0x1eac8a=$dataStates[DataManager['getStateIdWithName'](RegExp['$2'])],_0x1702b6=String(RegExp['$1'])[_0x4e11c4(0x242)](/(?:USER|SUBJECT)/i)?_0x41da15:_0x372c11;return _0x1702b6[_0x4e11c4(0x284)]()[_0x4e11c4(0x20d)](_0x1eac8a);}else{if(_0xd06bd5[_0x4e11c4(0x242)](/(.*) NOT STATE (\d+)/i)){const _0x49e642=$dataStates[Number(RegExp['$2'])],_0x2f79cf=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x41da15:_0x372c11;return!_0x2f79cf[_0x4e11c4(0x284)]()[_0x4e11c4(0x20d)](_0x49e642);}else{if(_0xd06bd5[_0x4e11c4(0x242)](/(.*) NOT STATE (.*)/i)){const _0x1025e3=$dataStates[DataManager['getStateIdWithName'](RegExp['$2'])],_0x141acb=String(RegExp['$1'])[_0x4e11c4(0x242)](/(?:USER|SUBJECT)/i)?_0x41da15:_0x372c11;return!_0x141acb['states']()['includes'](_0x1025e3);}else{if(_0xd06bd5[_0x4e11c4(0x242)](/(.*) HAS (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF)/i)){const _0x932b7=_0x478961[_0x4e11c4(0x2b7)](String(RegExp['$2'])[_0x4e11c4(0x2d5)]()[_0x4e11c4(0x1bd)]()),_0x33f88a=String(RegExp['$3'])[_0x4e11c4(0x238)]()[_0x4e11c4(0x1bd)](),_0x5f3c8c=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x41da15:_0x372c11,_0x5b6d32='is%1Affected'[_0x4e11c4(0x204)](_0x33f88a[_0x4e11c4(0x2ba)](0x0)['toUpperCase']()+_0x33f88a['slice'](0x1));return _0x5f3c8c[_0x5b6d32](_0x932b7);}else{if(_0xd06bd5[_0x4e11c4(0x242)](/(.*) HAS (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) MAX (BUFF|DEBUFF)/i)){const _0x50614b=_0x478961[_0x4e11c4(0x2b7)](String(RegExp['$2'])[_0x4e11c4(0x2d5)]()[_0x4e11c4(0x1bd)]()),_0x32fa3a=String(RegExp['$3'])[_0x4e11c4(0x238)]()['trim'](),_0x5ec0dd=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x41da15:_0x372c11,_0x59e9fa=_0x4e11c4(0x262)[_0x4e11c4(0x204)](_0x32fa3a[_0x4e11c4(0x2ba)](0x0)['toUpperCase']()+_0x32fa3a[_0x4e11c4(0x233)](0x1));return _0x5ec0dd[_0x59e9fa](_0x50614b);}else{if(_0xd06bd5[_0x4e11c4(0x242)](/(.*) NOT (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF)/i)){const _0x4dc643=_0x478961['indexOf'](String(RegExp['$2'])['toUpperCase']()[_0x4e11c4(0x1bd)]()),_0x3c22a1=String(RegExp['$3'])[_0x4e11c4(0x238)]()['trim'](),_0x68f83c=String(RegExp['$1'])[_0x4e11c4(0x242)](/(?:USER|SUBJECT)/i)?_0x41da15:_0x372c11,_0x4a49ab='is%1Affected'[_0x4e11c4(0x204)](_0x3c22a1[_0x4e11c4(0x2ba)](0x0)['toUpperCase']()+_0x3c22a1[_0x4e11c4(0x233)](0x1));return!_0x68f83c[_0x4a49ab](_0x4dc643);}else{if(_0xd06bd5[_0x4e11c4(0x242)](/(.*) NOT (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) MAX (BUFF|DEBUFF)/i)){const _0x108af0=_0x478961[_0x4e11c4(0x2b7)](String(RegExp['$2'])[_0x4e11c4(0x2d5)]()[_0x4e11c4(0x1bd)]()),_0x3708ca=String(RegExp['$3'])[_0x4e11c4(0x238)]()[_0x4e11c4(0x1bd)](),_0x2ee088=String(RegExp['$1'])[_0x4e11c4(0x242)](/(?:USER|SUBJECT)/i)?_0x41da15:_0x372c11,_0xa368d2=_0x4e11c4(0x262)[_0x4e11c4(0x204)](_0x3708ca[_0x4e11c4(0x2ba)](0x0)[_0x4e11c4(0x2d5)]()+_0x3708ca[_0x4e11c4(0x233)](0x1));return!_0x2ee088[_0xa368d2](_0x108af0);}}}}}}}}}}}}}return!![];},AIManager['determineLineValue']=function(_0x2aebb2,_0xfe2513,_0x14d18b,_0x27bf41){const _0x39c808=_0x407437,_0x55ac90=['MAXHP',_0x39c808(0x1f1),_0x39c808(0x213),_0x39c808(0x2e2),'MAT',_0x39c808(0x256),_0x39c808(0x24d),_0x39c808(0x1f9)];window[_0x39c808(0x206)]=_0x2aebb2,window['a']=user,window['b']=_0xfe2513;const _0x24cc00=_0x27bf41,_0x2cc156=user[_0x39c808(0x21d)]();let _0x19c601=_0x27bf41[_0x39c808(0x242)](/(?:USER|SUBJECT)/i)?user:_0xfe2513;_0x27bf41=_0x27bf41['replace'](/\b(\d+)([%％])/gi,(_0x149f18,_0x44216b)=>Number(_0x44216b)*0.01);if(_0x27bf41[_0x39c808(0x242)](/(?:VAR|VARIABLE) (\d+)/i))return $gameVariables[_0x39c808(0x1c5)](Number(RegExp['$1']));if(_0x27bf41['match'](/TEAM ALIVE MEMBERS/i))return _0x19c601[_0x39c808(0x1d8)]()[_0x39c808(0x221)]()['length'];if(_0x27bf41[_0x39c808(0x242)](/TEAM DEAD MEMBERS/i))return _0x19c601[_0x39c808(0x1d8)]()[_0x39c808(0x21b)]()[_0x39c808(0x22b)];if(_0x27bf41[_0x39c808(0x242)](/ELEMENT (\d+) RATE/i)){const _0x2ab57f=Number(RegExp['$1']);return this[_0x39c808(0x247)](_0x2aebb2,_0xfe2513,_0x19c601,_0x2ab57f);}else{if(_0x27bf41[_0x39c808(0x242)](/ELEMENT (.*) RATE/i)){const _0x1a0dc0=DataManager['getElementIdWithName'](String(RegExp['$1']));return this[_0x39c808(0x247)](_0x2aebb2,_0xfe2513,_0x19c601,_0x1a0dc0);}else{if(_0x27bf41[_0x39c808(0x242)](/(.*) ELEMENT RATE/i)){const _0x3f8f9b=DataManager[_0x39c808(0x1fc)](String(RegExp['$1']));return this[_0x39c808(0x247)](_0x2aebb2,_0xfe2513,_0x19c601,_0x3f8f9b);}}}if(_0x27bf41['match'](/(MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF) (?:LEVEL|STACK|STACKS)/i)){const _0x2dc497=_0x55ac90['indexOf'](String(RegExp['$1'])[_0x39c808(0x2d5)]()[_0x39c808(0x1bd)]()),_0x5b8d8a=String(RegExp['$2'])[_0x39c808(0x238)]()[_0x39c808(0x1bd)]();return _0x19c601['buff'](_0x2dc497)*(_0x5b8d8a==='buff'?0x1:-0x1);}if(_0x27bf41['match'](/(MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF) (?:TURN|TURNS)/i)){const _0x5d6eb8=_0x55ac90['indexOf'](String(RegExp['$1'])[_0x39c808(0x2d5)]()[_0x39c808(0x1bd)]()),_0x39288d=String(RegExp['$2'])[_0x39c808(0x238)]()[_0x39c808(0x1bd)]();if(_0x39288d===_0x39c808(0x28e)&&_0x19c601[_0x39c808(0x1b6)](_0x5d6eb8))return _0x19c601['_buffTurns'][_0x5d6eb8];else{if(_0x39288d==='debuff'&&_0x19c601[_0x39c808(0x277)](_0x5d6eb8))return _0x19c601['_buffTurns'][_0x5d6eb8];}return 0x0;}if(_0x27bf41[_0x39c808(0x242)](/STATE (\d+) (?:TURN|TURNS)/i)){const _0x4eac7b=Number(RegExp['$1']);if(_0x19c601[_0x39c808(0x272)](_0x4eac7b)){const _0x55b070=$dataStates[_0x4eac7b];return _0x55b070&&_0x55b070[_0x39c808(0x22c)]===0x0?Number[_0x39c808(0x234)]:_0x19c601[_0x39c808(0x29a)][_0x4eac7b]||0x0;}else return _0x19c601['states']()[_0x39c808(0x20d)]($dataStates[_0x4eac7b])?Number[_0x39c808(0x234)]:0x0;}else{if(_0x27bf41['match'](/STATE (.*) (?:TURN|TURNS)/i)){const _0x30dd25=DataManager[_0x39c808(0x1df)](RegExp['$1']);if(_0x19c601[_0x39c808(0x272)](_0x30dd25)){const _0x1daa9e=$dataStates[_0x30dd25];return _0x1daa9e&&_0x1daa9e['autoRemovalTiming']===0x0?Number[_0x39c808(0x234)]:_0x19c601[_0x39c808(0x29a)][_0x30dd25]||0x0;}else return _0x19c601['states']()[_0x39c808(0x20d)]($dataStates[_0x30dd25])?Number[_0x39c808(0x234)]:0x0;}}if(_0x27bf41[_0x39c808(0x242)](/\bHP([%％])/i))return _0x19c601[_0x39c808(0x2c2)]();else{if(_0x27bf41[_0x39c808(0x242)](/\bMP([%％])/i))return _0x19c601['mpRate']();else{if(_0x27bf41[_0x39c808(0x242)](/\bTP([%％])/i))return _0x19c601[_0x39c808(0x28a)]();else{if(_0x27bf41[_0x39c808(0x242)](/\b(?:MAXHP|MAX HP|MHP)\b/i))return _0x19c601[_0x39c808(0x294)];else{if(_0x27bf41[_0x39c808(0x242)](/\b(?:MAXMP|MAX MP|MMP)\b/i))return _0x19c601[_0x39c808(0x28c)];else{if(_0x27bf41[_0x39c808(0x242)](/\b(?:MAXTP|MAX TP|MTP)\b/i))return _0x19c601[_0x39c808(0x23f)]();}}}}}if(_0x27bf41[_0x39c808(0x242)](/\b(LEVEL|HP|MP|TP|ATK|DEF|MAT|MDF|AGI|LUK)\b/i))return _0x19c601[String(RegExp['$1'])[_0x39c808(0x238)]()[_0x39c808(0x1bd)]()];try{return eval(_0x27bf41);}catch(_0x38c8d0){return $gameTemp[_0x39c808(0x2b5)]()&&(console['log'](_0x39c808(0x25e)[_0x39c808(0x204)](_0x24cc00)),console[_0x39c808(0x1ba)](_0x38c8d0)),0x0;}},AIManager[_0x407437(0x247)]=function(_0x61bf8c,_0xe84479,_0x1d08e2,_0x18fc0e){const _0x42b227=_0x407437;if(_0x61bf8c['isActor']()===_0x1d08e2['isActor']())return _0x1d08e2[_0x42b227(0x264)](_0x18fc0e);else return _0x1d08e2[_0x42b227(0x21d)]()[_0x42b227(0x1cf)](_0x18fc0e,_0x1d08e2)?_0x1d08e2['elementRate'](_0x18fc0e):VisuMZ[_0x42b227(0x1e7)][_0x42b227(0x26c)][_0x42b227(0x1c0)][_0x42b227(0x1ef)];},AIManager[_0x407437(0x2d9)]=function(_0x131744,_0x4a0a5c){const _0x5b9414=_0x407437;if(!_0x4a0a5c)return;if(!_0x4a0a5c[_0x5b9414(0x1f0)][_0x5b9414(0x242)](AIManager[_0x5b9414(0x227)][_0x5b9414(0x1fd)]))return;const _0x98cade=String(RegExp['$1'])[_0x5b9414(0x2d5)]()[_0x5b9414(0x1bd)]();let _0x4f756b=this['createFilterTarget'](_0x131744,_0x98cade);_0x4f756b&&(this[_0x5b9414(0x1ec)]=[_0x4f756b]);},AIManager[_0x407437(0x236)]=function(_0x16adae,_0xde07b2){const _0x29f6bd=_0x407437,_0x33f1fd=[_0x29f6bd(0x26e),'MAXMP',_0x29f6bd(0x213),_0x29f6bd(0x2e2),_0x29f6bd(0x1ae),_0x29f6bd(0x256),_0x29f6bd(0x24d),_0x29f6bd(0x1f9)],_0x36e616=[_0x29f6bd(0x231),_0x29f6bd(0x288),_0x29f6bd(0x223),_0x29f6bd(0x1ea),_0x29f6bd(0x1de),'MRF','CNT',_0x29f6bd(0x2bd),_0x29f6bd(0x1ca),'TRG'],_0x49d480=['TGR',_0x29f6bd(0x2a4),_0x29f6bd(0x230),_0x29f6bd(0x25c),_0x29f6bd(0x1e2),_0x29f6bd(0x244),_0x29f6bd(0x266),_0x29f6bd(0x1b1),_0x29f6bd(0x212),'EXR'];let _0x4ac7dd=null;if(_0xde07b2===_0x29f6bd(0x1f7)){if(this[_0x29f6bd(0x1ec)]['includes'](_0x16adae))return _0x16adae;}else{if(_0xde07b2===_0x29f6bd(0x2df))return this[_0x29f6bd(0x1ec)][0x0];else{if(_0xde07b2===_0x29f6bd(0x282))return this[_0x29f6bd(0x1ec)][this[_0x29f6bd(0x1ec)][_0x29f6bd(0x22b)]-0x1];else{if(_0xde07b2[_0x29f6bd(0x242)](/(HIGHEST|LOWEST)[ ](.*)/i)){const _0x49c275=String(RegExp['$1'])[_0x29f6bd(0x2d5)]()[_0x29f6bd(0x1bd)]()===_0x29f6bd(0x2c4),_0x9efdc8=!_0x49c275,_0x4e7b51=String(RegExp['$2'])[_0x29f6bd(0x2d5)]()['trim']();if(_0x33f1fd['includes'](_0x4e7b51)){const _0x2a2f95=_0x33f1fd[_0x29f6bd(0x2b7)](_0x4e7b51);_0x4ac7dd=this[_0x29f6bd(0x1ec)][0x0];for(const _0x383d09 of this[_0x29f6bd(0x1ec)]){if(_0x49c275&&_0x383d09[_0x29f6bd(0x1cc)](_0x2a2f95)>_0x4ac7dd['param'](_0x2a2f95))_0x4ac7dd=_0x383d09;if(_0x9efdc8&&_0x383d09[_0x29f6bd(0x1cc)](_0x2a2f95)<_0x4ac7dd[_0x29f6bd(0x1cc)](_0x2a2f95))_0x4ac7dd=_0x383d09;}return _0x4ac7dd;}if(_0x36e616['includes'](_0x4e7b51)){const _0x2a95a4=_0x36e616['indexOf'](_0x4e7b51);_0x4ac7dd=this[_0x29f6bd(0x1ec)][0x0];for(const _0x571a43 of this[_0x29f6bd(0x1ec)]){if(_0x49c275&&_0x571a43['xparam'](_0x2a95a4)>_0x4ac7dd[_0x29f6bd(0x2e1)](_0x2a95a4))_0x4ac7dd=_0x571a43;if(_0x9efdc8&&_0x571a43[_0x29f6bd(0x2e1)](_0x2a95a4)<_0x4ac7dd['xparam'](_0x2a95a4))_0x4ac7dd=_0x571a43;}return _0x4ac7dd;}if(_0x49d480[_0x29f6bd(0x20d)](_0x4e7b51)){const _0x14caca=_0x49d480[_0x29f6bd(0x2b7)](_0x4e7b51);_0x4ac7dd=this['_forceValidTargets'][0x0];for(const _0xc7279b of this[_0x29f6bd(0x1ec)]){if(_0x49c275&&_0xc7279b['sparam'](_0x14caca)>_0x4ac7dd[_0x29f6bd(0x2b4)](_0x14caca))_0x4ac7dd=_0xc7279b;if(_0x9efdc8&&_0xc7279b[_0x29f6bd(0x2b4)](_0x14caca)<_0x4ac7dd[_0x29f6bd(0x2b4)](_0x14caca))_0x4ac7dd=_0xc7279b;}return _0x4ac7dd;}if(_0x4e7b51==='HP'){_0x4ac7dd=this[_0x29f6bd(0x1ec)][0x0];for(const _0x20c294 of this['_forceValidTargets']){if(_0x49c275&&_0x20c294['hp']>_0x4ac7dd['hp'])_0x4ac7dd=_0x20c294;if(_0x9efdc8&&_0x20c294['hp']<_0x4ac7dd['hp'])_0x4ac7dd=_0x20c294;}return _0x4ac7dd;}if(_0x4e7b51==='HP%'){_0x4ac7dd=this['_forceValidTargets'][0x0];for(const _0x14446a of this[_0x29f6bd(0x1ec)]){if(_0x49c275&&_0x14446a[_0x29f6bd(0x2c2)]()>_0x4ac7dd[_0x29f6bd(0x2c2)]())_0x4ac7dd=_0x14446a;if(_0x9efdc8&&_0x14446a['hpRate']()<_0x4ac7dd[_0x29f6bd(0x2c2)]())_0x4ac7dd=_0x14446a;}return _0x4ac7dd;}if(_0x4e7b51==='MP'){_0x4ac7dd=this[_0x29f6bd(0x1ec)][0x0];for(const _0x3592b5 of this[_0x29f6bd(0x1ec)]){if(_0x49c275&&_0x3592b5['mp']>_0x4ac7dd['mp'])_0x4ac7dd=_0x3592b5;if(_0x9efdc8&&_0x3592b5['mp']<_0x4ac7dd['mp'])_0x4ac7dd=_0x3592b5;}return _0x4ac7dd;}if(_0x4e7b51===_0x29f6bd(0x22d)){_0x4ac7dd=this['_forceValidTargets'][0x0];for(const _0x5237d5 of this[_0x29f6bd(0x1ec)]){if(_0x49c275&&_0x5237d5['mpRate']()>_0x4ac7dd[_0x29f6bd(0x2d2)]())_0x4ac7dd=_0x5237d5;if(_0x9efdc8&&_0x5237d5[_0x29f6bd(0x2d2)]()<_0x4ac7dd[_0x29f6bd(0x2d2)]())_0x4ac7dd=_0x5237d5;}return _0x4ac7dd;}if(_0x4e7b51==='TP'){_0x4ac7dd=this[_0x29f6bd(0x1ec)][0x0];for(const _0x4985aa of this[_0x29f6bd(0x1ec)]){if(_0x49c275&&_0x4985aa['tp']>_0x4ac7dd['tp'])_0x4ac7dd=_0x4985aa;if(_0x9efdc8&&_0x4985aa['tp']<_0x4ac7dd['tp'])_0x4ac7dd=_0x4985aa;}return _0x4ac7dd;}if(_0x4e7b51===_0x29f6bd(0x281)){_0x4ac7dd=this['_forceValidTargets'][0x0];for(const _0x18cb0c of this[_0x29f6bd(0x1ec)]){if(_0x49c275&&_0x18cb0c['tpRate']()>_0x4ac7dd[_0x29f6bd(0x28a)]())_0x4ac7dd=_0x18cb0c;if(_0x9efdc8&&_0x18cb0c[_0x29f6bd(0x28a)]()<_0x4ac7dd['tpRate']())_0x4ac7dd=_0x18cb0c;}return _0x4ac7dd;}if(_0x4e7b51==='MAXTP'){_0x4ac7dd=this[_0x29f6bd(0x1ec)][0x0];for(const _0x5c4894 of this['_forceValidTargets']){if(_0x49c275&&_0x5c4894[_0x29f6bd(0x23f)]()>_0x4ac7dd[_0x29f6bd(0x23f)]())_0x4ac7dd=_0x5c4894;if(_0x9efdc8&&_0x5c4894['maxTp']()<_0x4ac7dd[_0x29f6bd(0x23f)]())_0x4ac7dd=_0x5c4894;}return _0x4ac7dd;}if(_0x4e7b51===_0x29f6bd(0x1e4)){_0x4ac7dd=this[_0x29f6bd(0x1ec)][0x0];for(const _0x10d2cf of this[_0x29f6bd(0x1ec)]){if(_0x49c275&&(_0x10d2cf[_0x29f6bd(0x1f5)]||0x0)>(_0x4ac7dd[_0x29f6bd(0x1f5)]||0x0))_0x4ac7dd=_0x10d2cf;if(_0x9efdc8&&(_0x10d2cf['level']||0x0)<(_0x4ac7dd[_0x29f6bd(0x1f5)]||0x0))_0x4ac7dd=_0x10d2cf;}return _0x4ac7dd;}if(_0x4e7b51===_0x29f6bd(0x218)&&Imported[_0x29f6bd(0x1c9)]){_0x4ac7dd=this[_0x29f6bd(0x1ec)][0x0];for(const _0x7d1da1 of this[_0x29f6bd(0x1ec)]){if(_0x49c275&&_0x7d1da1[_0x29f6bd(0x284)]()[_0x29f6bd(0x22b)]>_0x4ac7dd[_0x29f6bd(0x284)]()[_0x29f6bd(0x22b)])_0x4ac7dd=_0x7d1da1;if(_0x9efdc8&&_0x7d1da1[_0x29f6bd(0x284)]()[_0x29f6bd(0x22b)]<_0x4ac7dd[_0x29f6bd(0x284)]()[_0x29f6bd(0x22b)])_0x4ac7dd=_0x7d1da1;}return _0x4ac7dd;}if(_0x4e7b51==='POSITIVE\x20STATE\x20COUNT'&&Imported[_0x29f6bd(0x1c9)]){_0x4ac7dd=this[_0x29f6bd(0x1ec)][0x0];const _0x2bfde5=_0x29f6bd(0x257);for(const _0x1e7c3e of this[_0x29f6bd(0x1ec)]){if(_0x49c275&&_0x1e7c3e['statesByCategory'](_0x2bfde5)[_0x29f6bd(0x22b)]>_0x4ac7dd[_0x29f6bd(0x2ce)](_0x2bfde5)[_0x29f6bd(0x22b)])_0x4ac7dd=_0x1e7c3e;if(_0x9efdc8&&_0x1e7c3e[_0x29f6bd(0x2ce)](_0x2bfde5)[_0x29f6bd(0x22b)]<_0x4ac7dd[_0x29f6bd(0x2ce)](_0x2bfde5)['length'])_0x4ac7dd=_0x1e7c3e;}return _0x4ac7dd;}if(_0x4e7b51===_0x29f6bd(0x2be)&&Imported['VisuMZ_1_SkillsStatesCore']){_0x4ac7dd=this[_0x29f6bd(0x1ec)][0x0];const _0x240110=_0x29f6bd(0x267);for(const _0x181a7a of this[_0x29f6bd(0x1ec)]){if(_0x49c275&&_0x181a7a['statesByCategory'](_0x240110)[_0x29f6bd(0x22b)]>_0x4ac7dd[_0x29f6bd(0x2ce)](_0x240110)['length'])_0x4ac7dd=_0x181a7a;if(_0x9efdc8&&_0x181a7a[_0x29f6bd(0x2ce)](_0x240110)['length']<_0x4ac7dd['statesByCategory'](_0x240110)[_0x29f6bd(0x22b)])_0x4ac7dd=_0x181a7a;}return _0x4ac7dd;}}}}}return null;},DataManager[_0x407437(0x1fc)]=function(_0x14be04){const _0x5931b0=_0x407437;_0x14be04=_0x14be04[_0x5931b0(0x2d5)]()[_0x5931b0(0x1bd)](),this[_0x5931b0(0x290)]=this[_0x5931b0(0x290)]||{};if(this['_elementIDs'][_0x14be04])return this['_elementIDs'][_0x14be04];let _0x592646=0x1;for(const _0x853b9a of $dataSystem[_0x5931b0(0x263)]){if(!_0x853b9a)continue;let _0xf3522b=_0x853b9a['toUpperCase']();_0xf3522b=_0xf3522b[_0x5931b0(0x245)](/\x1I\[(\d+)\]/gi,''),_0xf3522b=_0xf3522b[_0x5931b0(0x245)](/\\I\[(\d+)\]/gi,''),this[_0x5931b0(0x290)][_0xf3522b]=_0x592646,_0x592646++;}return this[_0x5931b0(0x290)][_0x14be04]||0x0;},DataManager['getStateIdWithName']=function(_0x4d29f6){const _0x1026ed=_0x407437;_0x4d29f6=_0x4d29f6[_0x1026ed(0x2d5)]()[_0x1026ed(0x1bd)](),this[_0x1026ed(0x278)]=this[_0x1026ed(0x278)]||{};if(this['_stateIDs'][_0x4d29f6])return this[_0x1026ed(0x278)][_0x4d29f6];for(const _0x9cc3d6 of $dataStates){if(!_0x9cc3d6)continue;this[_0x1026ed(0x278)][_0x9cc3d6[_0x1026ed(0x26f)][_0x1026ed(0x2d5)]()[_0x1026ed(0x1bd)]()]=_0x9cc3d6['id'];}return this[_0x1026ed(0x278)][_0x4d29f6]||0x0;},VisuMZ[_0x407437(0x1e7)]['BattleManager_startAction']=BattleManager[_0x407437(0x1fe)],BattleManager[_0x407437(0x1fe)]=function(){const _0x5f3742=_0x407437;this[_0x5f3742(0x229)](),VisuMZ[_0x5f3742(0x1e7)][_0x5f3742(0x215)][_0x5f3742(0x2c5)](this);},BattleManager[_0x407437(0x229)]=function(){const _0xb24aa3=_0x407437,_0x2ae356=this[_0xb24aa3(0x2ac)];if(_0x2ae356['aiStyle']()==='random')return;if(!_0x2ae356[_0xb24aa3(0x248)]())return;const _0x47debe=_0x2ae356[_0xb24aa3(0x1ce)](),_0x145301=_0x47debe[_0xb24aa3(0x2a7)]();if(_0x47debe[_0xb24aa3(0x2dc)])return;if(AIManager[_0xb24aa3(0x240)](_0x2ae356,_0x145301))return;_0x2ae356[_0xb24aa3(0x1d6)]();},VisuMZ[_0x407437(0x1e7)][_0x407437(0x274)]=Game_Temp[_0x407437(0x2a1)][_0x407437(0x24f)],Game_Temp[_0x407437(0x2a1)][_0x407437(0x24f)]=function(){const _0x1bd2c1=_0x407437;VisuMZ[_0x1bd2c1(0x1e7)]['Game_Temp_initialize'][_0x1bd2c1(0x2c5)](this),this[_0x1bd2c1(0x2cc)]();},Game_Temp[_0x407437(0x2a1)][_0x407437(0x2cc)]=function(){const _0x540efd=_0x407437;this[_0x540efd(0x298)]={'action':null,'elementInfluence':![],'elementInfluenceRate':0x0,'elementIds':[],'evaInfluenceRate':0x0,'mevInfluenceRate':0x0};},Game_Temp[_0x407437(0x2a1)][_0x407437(0x26a)]=function(){const _0x5ee61c=_0x407437;if(this[_0x5ee61c(0x298)]===undefined)this[_0x5ee61c(0x2cc)]();return this[_0x5ee61c(0x298)];},Game_Temp[_0x407437(0x2a1)][_0x407437(0x1d2)]=function(_0x1e4f93,_0x1f2186){const _0x8b90ab=_0x407437;this[_0x8b90ab(0x2cc)]();const _0x2dc19f=this[_0x8b90ab(0x26a)]();_0x2dc19f[_0x8b90ab(0x1b7)]=_0x1f2186;if(_0x1e4f93['doesAIApplyElementalTgrInfluence']()){_0x2dc19f['elementInfluence']=!![],_0x2dc19f[_0x8b90ab(0x228)]=_0x1e4f93[_0x8b90ab(0x220)](),_0x2dc19f[_0x8b90ab(0x23e)]=[];if(Imported[_0x8b90ab(0x2b6)])_0x2dc19f[_0x8b90ab(0x23e)]=_0x2dc19f[_0x8b90ab(0x23e)][_0x8b90ab(0x2de)](_0x1f2186[_0x8b90ab(0x263)]());else _0x1f2186['item']()[_0x8b90ab(0x2b3)]['elementId']<0x0?_0x2dc19f[_0x8b90ab(0x23e)]=_0x2dc19f[_0x8b90ab(0x23e)][_0x8b90ab(0x2de)](_0x1e4f93[_0x8b90ab(0x26b)]()):_0x2dc19f[_0x8b90ab(0x23e)][_0x8b90ab(0x1ed)](_0x1f2186[_0x8b90ab(0x2a7)]()[_0x8b90ab(0x2b3)]['elementId']);}_0x1f2186[_0x8b90ab(0x23a)]()&&_0x1e4f93[_0x8b90ab(0x1b0)]()&&(_0x2dc19f[_0x8b90ab(0x2d0)]=_0x1e4f93[_0x8b90ab(0x2af)]()),_0x1f2186[_0x8b90ab(0x2c8)]()&&_0x1e4f93[_0x8b90ab(0x200)]()&&(_0x2dc19f[_0x8b90ab(0x28f)]=_0x1e4f93[_0x8b90ab(0x237)]());},VisuMZ['BattleAI'][_0x407437(0x226)]=Game_Action[_0x407437(0x2a1)][_0x407437(0x297)],Game_Action[_0x407437(0x2a1)][_0x407437(0x297)]=function(){const _0x461739=_0x407437;this[_0x461739(0x289)]()&&this['subject']()[_0x461739(0x248)]()&&(AIManager[_0x461739(0x259)](this['subject'](),this[_0x461739(0x2a7)]()),this[_0x461739(0x1fa)]()&&AIManager['filterForcedTargeting'](this[_0x461739(0x265)](),this[_0x461739(0x2a7)]()));$gameTemp[_0x461739(0x1d2)](this['subject'](),this);const _0x61127a=VisuMZ['BattleAI'][_0x461739(0x226)]['call'](this);return $gameTemp[_0x461739(0x2cc)](),AIManager[_0x461739(0x24e)](),_0x61127a;},VisuMZ['BattleAI']['Game_Action_itemTargetCandidates']=Game_Action['prototype'][_0x407437(0x2d1)],Game_Action[_0x407437(0x2a1)][_0x407437(0x2d1)]=function(){const _0x17ad4c=_0x407437,_0x11d031=this['subject'](),_0x26329d=this['item']();let _0x377453=VisuMZ['BattleAI']['Game_Action_itemTargetCandidates'][_0x17ad4c(0x2c5)](this);if(_0x11d031[_0x17ad4c(0x248)]()&&AIManager['hasValidTargets'](_0x11d031,_0x26329d)){let _0x427ba4=AIManager[_0x17ad4c(0x2a9)](_0x11d031,_0x26329d);_0x377453=_0x377453['filter'](_0x411733=>_0x427ba4[_0x17ad4c(0x20d)](_0x411733));}return _0x377453;},VisuMZ[_0x407437(0x1e7)][_0x407437(0x2b9)]=Game_Action['prototype'][_0x407437(0x2a5)],Game_Action[_0x407437(0x2a1)]['apply']=function(_0x34177e){const _0x594e=_0x407437;VisuMZ[_0x594e(0x1e7)][_0x594e(0x2b9)][_0x594e(0x2c5)](this,_0x34177e),this[_0x594e(0x292)](_0x34177e);},Game_Action[_0x407437(0x2a1)][_0x407437(0x292)]=function(_0x2b9900){const _0xc46d17=_0x407437;if(!_0x2b9900)return;if(this[_0xc46d17(0x265)]()[_0xc46d17(0x29e)]()===_0x2b9900[_0xc46d17(0x29e)]())return;let _0x49e08d=[];if(Imported[_0xc46d17(0x2b6)])_0x49e08d=this['elements']();else this[_0xc46d17(0x2a7)]()[_0xc46d17(0x2b3)]['elementId']<0x0?_0x49e08d=this['subject']()['attackElements']():_0x49e08d=[this[_0xc46d17(0x2a7)]()[_0xc46d17(0x2b3)][_0xc46d17(0x2db)]];_0x2b9900[_0xc46d17(0x1d4)](_0x49e08d,this[_0xc46d17(0x23a)](),this[_0xc46d17(0x2c8)]());},VisuMZ[_0x407437(0x1e7)][_0x407437(0x2a0)]=Game_BattlerBase[_0x407437(0x2a1)][_0x407437(0x2b4)],Game_BattlerBase[_0x407437(0x2a1)][_0x407437(0x2b4)]=function(_0x4d853a){let _0x1a102b=VisuMZ['BattleAI']['Game_BattlerBase_sparam']['call'](this,_0x4d853a);return _0x4d853a===0x0&&(_0x1a102b*=this['applyBattleAiTgrInfluences']()),_0x1a102b;},Game_BattlerBase[_0x407437(0x2a1)]['applyBattleAiTgrInfluences']=function(){const _0x328377=_0x407437,_0x4b432d=$gameTemp[_0x328377(0x26a)](),_0x3d1895=this['opponentsUnit']();if(Imported['VisuMZ_4_AggroControl']){if(_0x4b432d[_0x328377(0x1b7)]&&_0x4b432d[_0x328377(0x1b7)]['isAggroAffected']())return 0x1;}let _0x1cf496=0x1;if(_0x4b432d[_0x328377(0x1ee)])for(const _0x2a873c of _0x4b432d['elementIds']){_0x3d1895[_0x328377(0x1cf)](_0x2a873c,this)&&(_0x1cf496*=this[_0x328377(0x264)](_0x2a873c)*_0x4b432d[_0x328377(0x228)]);}return _0x3d1895['hasXParamAIKnowledge'](_0x328377(0x246),this)&&(_0x1cf496*=0x1-this['eva']*_0x4b432d[_0x328377(0x2d0)]),_0x3d1895['hasXParamAIKnowledge']('mev',this)&&(_0x1cf496*=0x1-this[_0x328377(0x1bb)]*_0x4b432d[_0x328377(0x28f)]),_0x1cf496['clamp'](0.001,0x3e8);},Game_BattlerBase['prototype'][_0x407437(0x1c8)]=function(){const _0x4f8bea=_0x407437;return _0x4f8bea(0x219);},Game_Battler[_0x407437(0x2a1)][_0x407437(0x248)]=function(){if(this['isConfused']())return![];return!![];},Game_Battler[_0x407437(0x2a1)][_0x407437(0x1d6)]=function(){},Game_Battler[_0x407437(0x2a1)][_0x407437(0x1bf)]=function(){const _0x2545a2=_0x407437;if(this['isActor']()||this['isEnemy']()){const _0x4322e3=this[_0x2545a2(0x29e)]()?this[_0x2545a2(0x1b8)]()[_0x2545a2(0x1f0)]:this['enemy']()['note'];if(_0x4322e3[_0x2545a2(0x242)](AIManager[_0x2545a2(0x227)][_0x2545a2(0x21c)]))return![];else{if(_0x4322e3['match'](AIManager['_regexp'][_0x2545a2(0x252)]))return this[_0x2545a2(0x220)]()>0x0;}}return VisuMZ['BattleAI'][_0x2545a2(0x26c)][_0x2545a2(0x243)][_0x2545a2(0x20b)];},Game_Battler[_0x407437(0x2a1)][_0x407437(0x220)]=function(){const _0x439174=_0x407437;if(this[_0x439174(0x29e)]()||this[_0x439174(0x279)]()){const _0x3ecddf=this[_0x439174(0x29e)]()?this[_0x439174(0x1b8)]()[_0x439174(0x1f0)]:this['enemy']()[_0x439174(0x1f0)];if(_0x3ecddf['match'](AIManager[_0x439174(0x227)][_0x439174(0x252)]))return eval(RegExp['$1']);}return VisuMZ[_0x439174(0x1e7)][_0x439174(0x26c)][_0x439174(0x243)][_0x439174(0x20f)];},Game_Battler['prototype'][_0x407437(0x1b0)]=function(){const _0x333a4b=_0x407437;if(this[_0x333a4b(0x29e)]()||this[_0x333a4b(0x279)]()){const _0x599d0d=this['isActor']()?this['actor']()['note']:this[_0x333a4b(0x27a)]()[_0x333a4b(0x1f0)];if(_0x599d0d[_0x333a4b(0x242)](AIManager['_regexp']['bypassEvaTgr']))return![];else{if(_0x599d0d[_0x333a4b(0x242)](AIManager[_0x333a4b(0x227)][_0x333a4b(0x29c)]))return this[_0x333a4b(0x2af)]()>0x0;}}return VisuMZ[_0x333a4b(0x1e7)][_0x333a4b(0x26c)]['Weight'][_0x333a4b(0x2b2)];},Game_Battler[_0x407437(0x2a1)][_0x407437(0x2af)]=function(){const _0x3729e5=_0x407437;if(this[_0x3729e5(0x29e)]()||this[_0x3729e5(0x279)]()){const _0x5e95f3=this[_0x3729e5(0x29e)]()?this[_0x3729e5(0x1b8)]()[_0x3729e5(0x1f0)]:this[_0x3729e5(0x27a)]()[_0x3729e5(0x1f0)];if(_0x5e95f3[_0x3729e5(0x242)](AIManager[_0x3729e5(0x227)][_0x3729e5(0x29c)]))return eval(RegExp['$1']);}return VisuMZ['BattleAI'][_0x3729e5(0x26c)][_0x3729e5(0x243)][_0x3729e5(0x2cd)];},Game_Battler[_0x407437(0x2a1)][_0x407437(0x200)]=function(){const _0x16100b=_0x407437;if(this['isActor']()||this[_0x16100b(0x279)]()){const _0xc03523=this[_0x16100b(0x29e)]()?this[_0x16100b(0x1b8)]()[_0x16100b(0x1f0)]:this[_0x16100b(0x27a)]()[_0x16100b(0x1f0)];if(_0xc03523[_0x16100b(0x242)](AIManager[_0x16100b(0x227)][_0x16100b(0x1e3)]))return![];else{if(_0xc03523[_0x16100b(0x242)](AIManager[_0x16100b(0x227)]['aiMevTgr']))return this[_0x16100b(0x237)]()>0x0;}}return VisuMZ[_0x16100b(0x1e7)][_0x16100b(0x26c)][_0x16100b(0x243)][_0x16100b(0x2b2)];},Game_Battler[_0x407437(0x2a1)][_0x407437(0x237)]=function(){const _0x25dbfc=_0x407437;if(this[_0x25dbfc(0x29e)]()||this[_0x25dbfc(0x279)]()){const _0x488fcb=this[_0x25dbfc(0x29e)]()?this['actor']()[_0x25dbfc(0x1f0)]:this[_0x25dbfc(0x27a)]()[_0x25dbfc(0x1f0)];if(_0x488fcb['match'](AIManager[_0x25dbfc(0x227)][_0x25dbfc(0x1d1)]))return eval(RegExp['$1']);}return VisuMZ[_0x25dbfc(0x1e7)][_0x25dbfc(0x26c)][_0x25dbfc(0x243)][_0x25dbfc(0x2cd)];},Game_Battler[_0x407437(0x2a1)][_0x407437(0x285)]=function(){const _0x466eb9=_0x407437,_0x1c416b=VisuMZ['BattleAI']['Settings']['General'];if(this['isActor']()||this[_0x466eb9(0x279)]()){const _0x1f2624=this[_0x466eb9(0x29e)]()?this[_0x466eb9(0x1b8)]()[_0x466eb9(0x1f0)]:this[_0x466eb9(0x27a)]()[_0x466eb9(0x1f0)];if(_0x1f2624[_0x466eb9(0x242)](AIManager['_regexp'][_0x466eb9(0x285)]))return Number(RegExp['$1'])[_0x466eb9(0x2c9)](0x0,0x64);else{if(this[_0x466eb9(0x29e)]())return _0x1c416b['ActorAILevel'];else{if(this[_0x466eb9(0x279)]())return _0x1c416b[_0x466eb9(0x209)];}}}return _0x1c416b[_0x466eb9(0x209)];},Game_Battler[_0x407437(0x2a1)][_0x407437(0x1d4)]=function(_0x4d6438,_0x57aa13,_0xae7198){const _0x16c1bc=_0x407437,_0x20d773=this[_0x16c1bc(0x21d)]();if(_0x4d6438&&_0x4d6438[_0x16c1bc(0x22b)]>0x0)for(const _0x24b67b of _0x4d6438){_0x20d773['addElementAIKnowledge'](_0x24b67b,this);}_0x57aa13&&_0x20d773[_0x16c1bc(0x255)](_0x16c1bc(0x1cd),this),_0xae7198&&_0x20d773[_0x16c1bc(0x255)](_0x16c1bc(0x261),this);},Game_Battler['prototype'][_0x407437(0x2d8)]=function(_0x3c3457){const _0x21fe89=_0x407437,_0x24e54e=this[_0x21fe89(0x21d)]();return _0x24e54e['hasXParamAIKnowledge'](_0x3c3457,this);},Game_Battler['prototype'][_0x407437(0x269)]=function(){const _0x1d6afa=_0x407437,_0x4c158d=VisuMZ[_0x1d6afa(0x1e7)][_0x1d6afa(0x26c)][_0x1d6afa(0x1c0)];if(this['isActor']()||this[_0x1d6afa(0x279)]()){const _0x41c5cd=this[_0x1d6afa(0x29e)]()?this['actor']()[_0x1d6afa(0x1f0)]:this[_0x1d6afa(0x27a)]()[_0x1d6afa(0x1f0)];if(_0x41c5cd[_0x1d6afa(0x242)](AIManager[_0x1d6afa(0x227)][_0x1d6afa(0x269)]))return Number(RegExp['$1'])[_0x1d6afa(0x2c9)](0x0,0x9);else{if(this[_0x1d6afa(0x29e)]())return _0x4c158d[_0x1d6afa(0x2c3)][_0x1d6afa(0x2c9)](0x0,0x9);else{if(this[_0x1d6afa(0x279)]())return _0x4c158d[_0x1d6afa(0x1d5)][_0x1d6afa(0x2c9)](0x0,0x9);}}}return _0x4c158d[_0x1d6afa(0x1d5)]['clamp'](0x0,0x9);},Game_Actor[_0x407437(0x2a1)]['isDetermineActionByAI']=function(){const _0x4eef47=_0x407437;if(this[_0x4eef47(0x2dd)]())return![];return this[_0x4eef47(0x2c0)]()&&this[_0x4eef47(0x1b2)]();},Game_Actor[_0x407437(0x2a1)][_0x407437(0x1b2)]=function(){const _0x2cb39c=_0x407437,_0x7bfc5a=this[_0x2cb39c(0x1f8)]()[_0x2cb39c(0x1f0)];if(_0x7bfc5a[_0x2cb39c(0x242)](/<NO REFERENCE AI>/i))return null;else{if(_0x7bfc5a[_0x2cb39c(0x242)](/<REFERENCE AI: ENEMY (\d+)>/i))return $dataEnemies[Number(RegExp['$1'])];else{if(_0x7bfc5a[_0x2cb39c(0x242)](/<REFERENCE AI: (.*)>/i))return $dataEnemies[DataManager[_0x2cb39c(0x2d4)](String(RegExp['$1']))];}}return $dataEnemies[VisuMZ['BattleAI'][_0x2cb39c(0x26c)][_0x2cb39c(0x1c0)][_0x2cb39c(0x2ad)]];},Game_Actor[_0x407437(0x2a1)][_0x407437(0x1c8)]=function(){const _0x163ed7=_0x407437,_0x1fd6a0=this[_0x163ed7(0x1f8)]()['note'];if(_0x1fd6a0[_0x163ed7(0x242)](AIManager[_0x163ed7(0x227)][_0x163ed7(0x1c8)]))return String(RegExp['$1'])['toLowerCase']()[_0x163ed7(0x1bd)]();return VisuMZ[_0x163ed7(0x1e7)][_0x163ed7(0x26c)][_0x163ed7(0x1c0)][_0x163ed7(0x1fb)];},Game_Actor[_0x407437(0x2a1)][_0x407437(0x1d6)]=function(){const _0x3e26e0=_0x407437;Game_Battler[_0x3e26e0(0x2a1)][_0x3e26e0(0x1d6)][_0x3e26e0(0x2c5)](this),this[_0x3e26e0(0x2a6)]();},VisuMZ[_0x407437(0x1e7)][_0x407437(0x1cb)]=Game_Actor[_0x407437(0x2a1)][_0x407437(0x2a6)],Game_Actor['prototype'][_0x407437(0x2a6)]=function(){const _0x31f82e=_0x407437;this[_0x31f82e(0x248)]()?this[_0x31f82e(0x29f)]():VisuMZ['BattleAI']['Game_Actor_makeAutoBattleActions'][_0x31f82e(0x2c5)](this);},Game_Actor['prototype'][_0x407437(0x29f)]=function(){const _0x584888=_0x407437;if(this['numActions']()>0x0){const _0x3cccde=this[_0x584888(0x299)]();if(this[_0x584888(0x2d7)]())_0x3cccde[_0x584888(0x1ed)]($dataSkills[this['attackSkillId']()]);if(this['canGuard']())_0x3cccde[_0x584888(0x1ed)]($dataSkills[this[_0x584888(0x2aa)]()]);const _0x17d027=this[_0x584888(0x1b2)](),_0x520872=JsonEx[_0x584888(0x27b)](_0x17d027['actions']);for(const _0x226251 of _0x520872){if(_0x226251[_0x584888(0x1af)]===0x1)_0x226251[_0x584888(0x1af)]=this[_0x584888(0x293)]();if(_0x226251[_0x584888(0x1af)]===0x2)_0x226251[_0x584888(0x1af)]=this[_0x584888(0x2aa)]();}const _0x1f7137=_0x520872[_0x584888(0x21a)](_0x1740d3=>this[_0x584888(0x1b3)](_0x1740d3)&&_0x3cccde[_0x584888(0x20d)]($dataSkills[_0x1740d3[_0x584888(0x1af)]]));if(_0x1f7137[_0x584888(0x22b)]>0x0){this[_0x584888(0x1f4)](_0x1f7137);return;}}VisuMZ['BattleAI'][_0x584888(0x1cb)][_0x584888(0x2c5)](this);},Game_Actor[_0x407437(0x2a1)][_0x407437(0x2ae)]=function(_0x2664d2){const _0x36be04=_0x407437;return Game_Enemy[_0x36be04(0x2a1)][_0x36be04(0x2ae)]['call'](this,_0x2664d2);},Game_Actor[_0x407437(0x2a1)]['meetsTurnCondition']=function(_0x4ac2ef,_0x5cf7e0){const _0x4e7501=_0x407437;return Game_Enemy[_0x4e7501(0x2a1)][_0x4e7501(0x239)][_0x4e7501(0x2c5)](this,_0x4ac2ef,_0x5cf7e0);},Game_Actor['prototype'][_0x407437(0x273)]=function(_0x30213f,_0x1ed0dc){const _0x101e72=_0x407437;return Game_Enemy[_0x101e72(0x2a1)][_0x101e72(0x273)]['call'](this,_0x30213f,_0x1ed0dc);},Game_Actor[_0x407437(0x2a1)][_0x407437(0x27f)]=function(_0x1a11b1,_0x5028af){const _0x475d4f=_0x407437;return Game_Enemy[_0x475d4f(0x2a1)]['meetsMpCondition'][_0x475d4f(0x2c5)](this,_0x1a11b1,_0x5028af);},Game_Actor['prototype'][_0x407437(0x2bb)]=function(_0x2689d4){const _0x5cc1fc=_0x407437;return Game_Enemy['prototype'][_0x5cc1fc(0x2bb)]['call'](this,_0x2689d4);},Game_Actor[_0x407437(0x2a1)]['meetsPartyLevelCondition']=function(_0x373e57){const _0x478f17=_0x407437;return Game_Enemy['prototype'][_0x478f17(0x21e)][_0x478f17(0x2c5)](this,_0x373e57);},Game_Actor['prototype'][_0x407437(0x232)]=function(_0x3b6c35){const _0x11e323=_0x407437;return Game_Enemy['prototype'][_0x11e323(0x232)]['call'](this,_0x3b6c35);},Game_Enemy[_0x407437(0x2a1)][_0x407437(0x1c8)]=function(){const _0x43a5df=_0x407437,_0x62961b=this['enemy']()[_0x43a5df(0x1f0)];if(_0x62961b[_0x43a5df(0x242)](AIManager[_0x43a5df(0x227)]['aiStyle']))return String(RegExp['$1'])[_0x43a5df(0x238)]()[_0x43a5df(0x1bd)]();return VisuMZ[_0x43a5df(0x1e7)][_0x43a5df(0x26c)][_0x43a5df(0x1c0)]['EnemyStyleAI'];},VisuMZ[_0x407437(0x1e7)][_0x407437(0x270)]=Game_Enemy[_0x407437(0x2a1)][_0x407437(0x1b3)],Game_Enemy[_0x407437(0x2a1)][_0x407437(0x1b3)]=function(_0x1cb07a){const _0x4d7a99=_0x407437;if(!VisuMZ[_0x4d7a99(0x1e7)][_0x4d7a99(0x270)][_0x4d7a99(0x2c5)](this,_0x1cb07a))return![];if(this[_0x4d7a99(0x1c8)]()===_0x4d7a99(0x2bf))return!![];return AIManager[_0x4d7a99(0x240)](this,$dataSkills[_0x1cb07a[_0x4d7a99(0x1af)]]);},Game_Actor[_0x407437(0x2a1)][_0x407437(0x1b3)]=function(_0xe3b88){const _0x593e2d=_0x407437;return Game_Enemy[_0x593e2d(0x2a1)][_0x593e2d(0x1b3)]['call'](this,_0xe3b88);},Game_Enemy[_0x407437(0x2a1)][_0x407437(0x1c6)]=function(_0x148f91,_0x2750d4){const _0x2f3efb=_0x407437,_0xd6aff6=_0x148f91[_0x2f3efb(0x1c4)]((_0x203c70,_0x46de94)=>_0x203c70+_0x46de94['rating']-_0x2750d4,0x0);if(_0xd6aff6>=0x0){let _0x4892c5=Math['randomInt'](_0xd6aff6);for(const _0x1a6cc8 of _0x148f91){_0x4892c5-=_0x1a6cc8[_0x2f3efb(0x2e0)]-_0x2750d4;if(_0x4892c5<=0x0)return _0x1a6cc8;}}else return null;},Game_Actor[_0x407437(0x2a1)][_0x407437(0x1c6)]=function(_0x8ea77b,_0x347533){const _0xf7e7c5=_0x407437;return Game_Enemy[_0xf7e7c5(0x2a1)]['selectAction'][_0xf7e7c5(0x2c5)](this,_0x8ea77b,_0x347533);},Game_Enemy[_0x407437(0x2a1)][_0x407437(0x1f4)]=function(_0x2b13f6){const _0x599ffd=_0x407437,_0x1ed566=String(this['aiStyle']())[_0x599ffd(0x238)]()[_0x599ffd(0x1bd)]();if(['random',_0x599ffd(0x25f)][_0x599ffd(0x20d)](_0x1ed566))this[_0x599ffd(0x2c7)](_0x2b13f6);else _0x1ed566===_0x599ffd(0x1e6)?this['selectAllActionsGambit'](_0x2b13f6):this['selectAllActionsClassic'](_0x2b13f6);},Game_Actor[_0x407437(0x2a1)][_0x407437(0x1f4)]=function(_0x135fc9){const _0x5ca833=_0x407437;Game_Enemy[_0x5ca833(0x2a1)]['selectAllActions'][_0x5ca833(0x2c5)](this,_0x135fc9);},Game_Battler[_0x407437(0x2a1)]['selectAllActionsClassic']=function(_0x38ed6b){const _0xacea2f=_0x407437,_0x5755bc=Math[_0xacea2f(0x276)](..._0x38ed6b[_0xacea2f(0x1da)](_0x386df2=>_0x386df2[_0xacea2f(0x2e0)])),_0x26bd1a=_0x5755bc-this[_0xacea2f(0x269)]();_0x38ed6b=_0x38ed6b[_0xacea2f(0x21a)](_0x229347=>_0x229347['rating']>=_0x26bd1a),_0x38ed6b=VisuMZ[_0xacea2f(0x1e7)]['ShuffleArray'](_0x38ed6b);for(let _0x4939bc=0x0;_0x4939bc<this[_0xacea2f(0x207)]();_0x4939bc++){this[_0xacea2f(0x1b7)](_0x4939bc)[_0xacea2f(0x214)](this[_0xacea2f(0x1c6)](_0x38ed6b,_0x26bd1a));}},VisuMZ['BattleAI']['ShuffleArray']=function(_0x38c8d9){const _0x2e3303=_0x407437;var _0x1ddba2,_0x123412,_0x1aa2a6;for(_0x1aa2a6=_0x38c8d9[_0x2e3303(0x22b)]-0x1;_0x1aa2a6>0x0;_0x1aa2a6--){_0x1ddba2=Math[_0x2e3303(0x22e)](Math[_0x2e3303(0x2bf)]()*(_0x1aa2a6+0x1)),_0x123412=_0x38c8d9[_0x1aa2a6],_0x38c8d9[_0x1aa2a6]=_0x38c8d9[_0x1ddba2],_0x38c8d9[_0x1ddba2]=_0x123412;}return _0x38c8d9;},Game_Battler[_0x407437(0x2a1)][_0x407437(0x27e)]=function(_0xff09b2){const _0x3ee005=_0x407437;for(let _0x146684=0x0;_0x146684<this[_0x3ee005(0x207)]();_0x146684++){const _0x1f5a2d=_0xff09b2[0x0];this[_0x3ee005(0x1b7)](_0x146684)['setEnemyAction'](_0x1f5a2d);}},Game_Battler[_0x407437(0x2a1)]['selectAllActionsRandom']=function(_0x352b32){const _0x12204d=_0x407437;for(let _0x43df06=0x0;_0x43df06<this[_0x12204d(0x207)]();_0x43df06++){const _0x5a43a7=_0x352b32[Math[_0x12204d(0x2b8)](_0x352b32[_0x12204d(0x22b)])];this[_0x12204d(0x1b7)](_0x43df06)[_0x12204d(0x214)](_0x5a43a7);}},Game_Enemy[_0x407437(0x2a1)]['determineNewValidAIAction']=function(){const _0x176558=_0x407437;Game_Battler['prototype'][_0x176558(0x1d6)][_0x176558(0x2c5)](this);if(this[_0x176558(0x207)]()>0x0){const _0x3a0b49=this[_0x176558(0x27a)]()[_0x176558(0x210)][_0x176558(0x21a)](_0x31c788=>this[_0x176558(0x1b3)](_0x31c788));_0x3a0b49[_0x176558(0x22b)]>0x0&&this[_0x176558(0x1f4)](_0x3a0b49);}},VisuMZ[_0x407437(0x1e7)][_0x407437(0x2b0)]=Game_Unit[_0x407437(0x2a1)][_0x407437(0x24f)],Game_Unit[_0x407437(0x2a1)][_0x407437(0x24f)]=function(){const _0x2afeb1=_0x407437;VisuMZ['BattleAI'][_0x2afeb1(0x2b0)][_0x2afeb1(0x2c5)](this),this[_0x2afeb1(0x2d3)]();},Game_Unit[_0x407437(0x2a1)][_0x407437(0x2d3)]=function(){const _0x4b5ca4=_0x407437;this[_0x4b5ca4(0x1dc)]=![],this[_0x4b5ca4(0x27c)]();},VisuMZ[_0x407437(0x1e7)]['Game_Unit_aliveMembers']=Game_Unit[_0x407437(0x2a1)][_0x407437(0x221)],Game_Unit['prototype'][_0x407437(0x221)]=function(){const _0x39d44c=_0x407437;let _0x39ef5c=VisuMZ['BattleAI']['Game_Unit_aliveMembers'][_0x39d44c(0x2c5)](this);if(this[_0x39d44c(0x1dc)]){const _0x1a756a=AIManager[_0x39d44c(0x271)]();_0x39ef5c=_0x39ef5c[_0x39d44c(0x21a)](_0x3a3fca=>_0x1a756a[_0x39d44c(0x20d)](_0x3a3fca));}return _0x39ef5c;},VisuMZ[_0x407437(0x1e7)]['Game_Unit_randomTarget']=Game_Unit[_0x407437(0x2a1)]['randomTarget'],Game_Unit[_0x407437(0x2a1)]['randomTarget']=function(){const _0x5454cb=_0x407437;AIManager[_0x5454cb(0x1bc)]()&&(this['_applyAIForcedTargetFilters']=!![]);const _0x3e81ec=VisuMZ[_0x5454cb(0x1e7)][_0x5454cb(0x24a)]['call'](this);return this[_0x5454cb(0x1dc)]=![],_0x3e81ec;},Game_Unit[_0x407437(0x2a1)][_0x407437(0x27c)]=function(){this['_aiKnowledge']={'evaRates':[],'mevRates':[],'elementRates':{}};},Game_Unit['prototype'][_0x407437(0x2a8)]=function(){const _0x4e6509=_0x407437;if(this[_0x4e6509(0x1f6)]===undefined)this[_0x4e6509(0x27c)]();return this[_0x4e6509(0x1f6)];},Game_Unit['prototype']['addXParamAIKnowledge']=function(_0x399c7d,_0xe79be7){const _0x5a7648=_0x407437;this['aiKnowledge']()[_0x399c7d]=this[_0x5a7648(0x2a8)]()[_0x399c7d]||[];const _0x427276=_0xe79be7[_0x5a7648(0x29e)]()?_0xe79be7[_0x5a7648(0x2ab)]():_0xe79be7[_0x5a7648(0x2ca)]();!this['aiKnowledge']()[_0x399c7d][_0x5a7648(0x20d)](_0x427276)&&this[_0x5a7648(0x2a8)]()[_0x399c7d][_0x5a7648(0x1ed)](_0x427276);},Game_Unit[_0x407437(0x2a1)][_0x407437(0x2d8)]=function(_0x2ec03f,_0x56cb5e){const _0x1d07ad=_0x407437;if(!VisuMZ['BattleAI'][_0x1d07ad(0x26c)][_0x1d07ad(0x1c0)][_0x1d07ad(0x201)])return!![];const _0x4fe7a6=_0x2ec03f[_0x1d07ad(0x242)](/EVA/i)?_0x1d07ad(0x1cd):'mevRates';this[_0x1d07ad(0x2a8)]()[_0x4fe7a6]=this['aiKnowledge']()[_0x4fe7a6]||[];const _0x553757=_0x56cb5e['isActor']()?_0x56cb5e[_0x1d07ad(0x2ab)]():_0x56cb5e[_0x1d07ad(0x2ca)]();return this[_0x1d07ad(0x2a8)]()[_0x4fe7a6][_0x1d07ad(0x20d)](_0x553757);},Game_Unit[_0x407437(0x2a1)][_0x407437(0x251)]=function(_0x18f8ca,_0x1ee796){const _0x34a535=_0x407437;this[_0x34a535(0x2a8)]()[_0x34a535(0x1e1)]=this[_0x34a535(0x2a8)]()['elementRates']||{};const _0x5d04fd=this['aiKnowledge']()[_0x34a535(0x1e1)];_0x5d04fd[_0x18f8ca]=_0x5d04fd[_0x18f8ca]||[];const _0x5b8f02=_0x1ee796[_0x34a535(0x29e)]()?_0x1ee796[_0x34a535(0x2ab)]():_0x1ee796[_0x34a535(0x2ca)]();!_0x5d04fd[_0x18f8ca][_0x34a535(0x20d)](_0x5b8f02)&&_0x5d04fd[_0x18f8ca]['push'](_0x5b8f02);},Game_Unit[_0x407437(0x2a1)][_0x407437(0x1cf)]=function(_0x2dd8e4,_0x4efdfd){const _0x1e23f9=_0x407437;if(!VisuMZ[_0x1e23f9(0x1e7)]['Settings']['General'][_0x1e23f9(0x201)])return!![];this['aiKnowledge']()[_0x1e23f9(0x1e1)]=this[_0x1e23f9(0x2a8)]()['elementRates']||{};const _0x2f23dc=this[_0x1e23f9(0x2a8)]()[_0x1e23f9(0x1e1)];_0x2f23dc[_0x2dd8e4]=_0x2f23dc[_0x2dd8e4]||[];const _0x4c9f15=_0x4efdfd[_0x1e23f9(0x29e)]()?_0x4efdfd['actorId']():_0x4efdfd['enemyId']();return _0x2f23dc[_0x2dd8e4][_0x1e23f9(0x20d)](_0x4c9f15);},VisuMZ['BattleAI'][_0x407437(0x1e0)]=Game_Troop[_0x407437(0x2a1)]['setup'],Game_Troop[_0x407437(0x2a1)]['setup']=function(_0x3d807f){const _0x3d5c7c=_0x407437;VisuMZ[_0x3d5c7c(0x1e7)][_0x3d5c7c(0x1e0)][_0x3d5c7c(0x2c5)](this,_0x3d807f),this['clearAIKnowledge']();};