//=============================================================================
// VisuStella MZ - Boost Action
// VisuMZ_3_BoostAction.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_BoostAction = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BoostAction = VisuMZ.BoostAction || {};
VisuMZ.BoostAction.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.10] [BoostAction]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Boost_Action_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds Boost Points, a mechanic which augments the potency of
 * skills and/or items based on the type of notetag they have. The newly added
 * mechanic allows actors and/or enemies to temporarily power themselves up for
 * the current turn by using the Boost Points resource. Boost Points are gained
 * at the end of each turn if the battler did not use any Boost Points. While
 * Boosted, actions can deal more damage, hit more times, make buffs/debuffs or
 * states last longer, and more!
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add a new battle resource to your game: Boost Points!
 * * Determine how many Boost Points can be stored at a time!
 * * Also determine how many Boost Points can be used at a time!
 * * Determine how Boosting affects skills and items through the different
 *   kinds of notetags provided through this plug.
 * * Enemies can Boost, too! As long as the proper notetags are in place!
 * * Utilize Shortcut Keys to quickly Boost skills and/or items.
 * * Boosting skills and/or items can also affect the text displayed in the
 *   Help Window, too!
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
 * * VisuMZ_1_SkillsStatesCore
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_3_WeaknessDisplay
 *
 * The "Analyze" ability in the VisuStella MZ Weakness Display can be Boosted
 * through this plugin and reveal multiple weaknesses at a time.
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
 * When using Action Sequences, Boost effects for damage, turn extensions,
 * analyze, etc. will not occur for anything other than the Action Sequence:
 * "MECH: Action Effect" in order to maintain controlled effects. However, if
 * you do want to apply bonuses for Boosts, utilize "MECH: Boost Store Data" to
 * store inside a variable how many times Boosts were used. This can be used
 * however which way you want it to as long as it is manageable through events
 * and Common Events.
 * 
 * ---
 *
 * VisuMZ_2_BattleSystemBTB
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
 * VisuMZ_3_ActiveChainSkills
 * 
 * Boosts now carry over across the entire chain and granting bonuses to all
 * chained skills instead of just the first skill of the chain. The bonus
 * effects of the boosts will end when the chains end.
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
 * === Boost Effect-Related Notetags ===
 * 
 * ---
 *
 * <Boost Damage>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the damage dealt by this skill/item.
 * - The amount of damage increased will be determined by the Plugin Parameter
 *   Mechanical settings for Damage Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Turns>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the duration of skills, buffs, and debuffs added by
 *   this skill/item.
 * - The amount of turns increased will be determined by the Plugin Parameter
 *   Mechanical settings for Turn Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Repeat>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the number of repeated hits dealt by this skill/item.
 * - The amount of hits increased will be determined by the Plugin Parameter
 *   Mechanical settings for Repeated Hits Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Effect Gain>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the number of Boost Points acquired through the
 *   <Target Boost Points: +x> and <User Boost Points: +x> notetags.
 * - The power of the effect will be determined by the Plugin Parameter
 *   Mechanical settings for Effect Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Analyze>
 *
 * - Used for: Skill, Item Notetags
 * - Requires VisuMZ_3_WeaknessDisplay!
 * - Boosts will alter the number of revealed weaknesses by this skill/item.
 * - The amount of weaknesses revealed will be determined by the Plugin
 *   Parameter Mechanical settings for Analyze Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 * 
 * ---
 * 
 * === Boost Points Gain/Loss-Related Notetags ===
 * 
 * ---
 *
 * <User Boost Points: +x>
 * <User Boost Points: -x>
 *
 * <Target Boost Points: +x>
 * <Target Boost Points: -x>
 *
 * - Used for: Skill, Item Notetags
 * - The user/target will gain/lose Boost Points if this skill/item connects.
 * - Replace 'x' with a number representing the number of Boost Points for the
 *   user/target to gain/lose.
 *
 * ---
 *
 * <Boost Points Battle Start: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Determines how many extra (or less) Boost Points the battler will start
 *   a new battle with.
 * - Replace 'x' with a number representing the amount of Boost Points to
 *   increase or decrease the starting Boost Points value by multiplicatively.
 *
 * ---
 *
 * <Boost Points Battle Start: +x>
 * <Boost Points Battle Start: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Determines how many extra (or less) Boost Points the battler will start
 *   a new battle with.
 * - Replace 'x' with a number representing the amount of Boost Points to
 *   increase or decrease the starting Boost Points value by additively.
 *
 * ---
 * 
 * === Boost Point Requirements-Related Notetags ===
 * 
 * The following are notetags that make skills/items require a certain amount
 * of Boost Points to be in "use" before they can become enabled.
 * 
 * ---
 *
 * <Require x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at least x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require >= x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at least x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require > x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require more than x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require = x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require exactly x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require < x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require less than x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require <= x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at most x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 * 
 * === Boosting-Related Notetags ===
 * 
 * ---
 *
 * <Boost Sealed>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - As long as the battler is affected by a trait object with this notetag,
 *   the battler cannot Boost.
 *
 * ---
 * 
 * === Enemy-Related Notetags ===
 * 
 * ---
 *
 * <Boost Skill id: Full>
 * <Boost name: Full>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will use as many Boost
 *   Points as it can to cast it.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: At Least x>
 * <Boost name: At Least x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only use Boost Points
 *   after reaching 'x' Boost Points and will use as much as it can.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: At Most x>
 * <Boost name: At Most x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only as many Boost
 *   Points as it can unless the Boost Points spent go over 'x'.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: Exactly x>
 * <Boost name: Exactly x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only use 'x' Boost
 *   Points when Boosting for the skill.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 * 
 * === Regeneration-Related Notetags ===
 * 
 * ---
 *
 * <Boost Points Regen: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the amount of Boost Points gained when regenerating Boost Points
 *   (as long as the battler can).
 * - Replace 'x' with a number value representing the amount of Boost Points
 *   to increase or decrease the regenerated amount by multiplicatively.
 *
 * ---
 *
 * <Boost Points Regen: +x>
 * <Boost Points Regen: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the amount of Boost Points gained when regenerating Boost Points
 *   (as long as the battler can).
 * - Replace 'x' with a number value representing the amount of Boost Points
 *   to increase or decrease the regenerated amount by additively.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. 
 *
 * === Boosting-Related Text Codes ===
 *
 * These text codes are used for Help Window descriptions. When Boosting, the
 * text displayed in the Help Window can change to reflect the amount boosted.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Help Window Text Only)
 * ------------------   -------------------------------------------------------
 * 
 * \boostDamage[x]      This will apply damage modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * \boostTurn[x]        This will apply turn modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * \boostRepeat[x]      This will apply repeat hit modifiers to number x based
 *                      on the actor's currently used Boost amount.
 * 
 * \boostEffect[x]      This will apply Boost Point effect modifiers to number
 *                      x based on the actor's currently used Boost amount.
 * 
 * \boostAnalyze[x]     This will apply analyze modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Help Window Text Only)
 * ------------------   -------------------------------------------------------
 * 
 * \boost[text]         The text inside the brackets won't appear unless at
 *                      least 1 Boost is used.
 * 
 * \boost0[text]        The text inside the brackets won't appear unless if any
 *                      Boost is used.
 * 
 * \boost>=x[text]      The text inside the brackets will only appear if at
 *                      least x Boosts are used.
 * 
 * \boost>x[text]       The text inside the brackets will only appear if more
 *                      than x Boosts are used.
 * 
 * \boost=x[text]       The text inside the brackets will only appear if
 *                      exactly x Boosts are used.
 * 
 * \boost<x[text]       The text inside the brackets will only appear if less
 *                      than x Boosts are used.
 * 
 * \boost<=x[text]      The text inside the brackets will only appear if at
 *                      most x Boosts are used.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * These Plugin Parameters govern the mechanics behind Boost Points and
 * Boosting for this RPG Maker MZ plugin.
 *
 * ---
 *
 * Boost Points
 * 
 *   Max Stored:
 *   - Maximum Boost Points that can be stored at any time.
 * 
 *   Max Usable:
 *   - How many Boost Points can be usable at a time?
 * 
 *   Start Battle:
 *   - How many Boost Points as a base do you want battlers to start
 *     battles with?
 * 
 *   Regeneration:
 *   - How many Boost Points do you want battlers to regenerate each
 *     turn applicable?
 * 
 *     Always Regen?:
 *     - Always regenerate Boost Points each turn?
 *     - Otherwise, regenerate on turns when Boost Points weren't used.
 * 
 *     Death Regen?:
 *     - Regenerate Boost Points while dead?
 *     - Otherwise, don't.
 * 
 *   Death Removal?:
 *   - Remove all stored Boost Points on death?
 *   - Otherwise, keep them.
 *
 * ---
 *
 * Boost Animations
 * 
 *   Animation ID's:
 *   - Animation IDs start from 0 Boosts to max.
 *   - These animations play when Boosting/Unboosting.
 * 
 *   Animation Delay:
 *   - How many milliseconds to play between animations when enemies
 *     Boost actions?
 *
 * ---
 *
 * Boost Modifiers
 * 
 *   Damage:
 * 
 *     Multipliers:
 *     - Damage multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Damage> notetag.
 * 
 *     Addition:
 *     - Damage addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Damage> notetag.
 * 
 *   State/Buff Turns:
 * 
 *     Multipliers:
 *     - Turn multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Turns> notetag.
 * 
 *     Addition:
 *     - Turn addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Turns> notetag.
 * 
 *   Repeated Hits:
 * 
 *     Multipliers:
 *     - Repeat multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Repeat> notetag.
 * 
 *     Addition:
 *     - Repeat addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Repeat> notetag.
 * 
 *   Effect:
 * 
 *     Multipliers:
 *     - Effect multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Effect Gain> notetag.
 * 
 *     Addition:
 *     - Effect addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Effect Gain> notetag.
 * 
 *   Analyze:
 * 
 *     Multipliers:
 *     - Analyze multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Analyze> notetag.
 * 
 *     Addition:
 *     - Analyze addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Analyze> notetag.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * These Plugin Parameter settings govern the visual elements related to Boost
 * Points and Boosting.
 *
 * ---
 *
 * Icons
 * 
 *   Boost Icon:
 *   - What icon do you wish to represent Boosting and
 *     Boost Point availability?
 * 
 *   Empty Icon:
 *   - What icon do you wish to represent Unboosting and
 *     Boost Point absence?
 * 
 *   Icon Size Rate:
 *   - What size do you wish the icons to be displayed at?
 *   - Use a number between 0 and 1 for the best results.
 * 
 *   Smooth Icons?:
 *   - Do you wish to smooth out the icons or pixelate them?
 *
 * ---
 *
 * Vocab
 * 
 *   Boost Command:
 *   - This is the text used for the "Boost" command displayed in the
 *     Actor Command Window.
 * 
 *     Show?:
 *     - Show this command in the Actor Command Window?
 * 
 *   Unboost Command:
 *   - This is the text used for the "Unboost" command displayed in the
 *     Actor Command Window.
 * 
 *     Show?:
 *     - Show this command in the Actor Command Window?
 *
 * ---
 *
 * Shortcut Controls
 * 
 *   Page Up/Dn Shortcuts?:
 *   - Enable Page Up/Down keys to adjust Boost points as a shortcut?
 * 
 *   Bypassed Windows:
 *   - These are constructor names for windows that the shortcut key will not
 *     work on.
 *
 * ---
 *
 * Battle Status
 * 
 *   Show Boost Points?:
 *   - Show Boost Points in the Battle Status Window?
 * 
 *   Auto-Position?:
 *   - Automatically position the Boost Points?
 *   - If not, it'll position it to the upper left.
 * 
 *   Offset X/Y:
 *   - How much to offset the Boost icons X/Y position by?
 *   - For X: Negative goes left. Positive goes right.
 *   - For Y: Negative goes up. Positive goes down.
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
 * Version 1.10: June 13, 2024
 * * Bug Fixes!
 * ** Fixed a bug where boost would cause softlocks in certain menus. Fix made
 *    by Olivia.
 * 
 * Version 1.09: March 14, 2024
 * * Feature Update!
 * ** Removed VisuMZ_1_MessageCore dependency.
 * 
 * Version 1.08: October 12, 2023
 * * Documentation Update!
 * ** Fixed a typo found within a notetag:
 * *** <Boost Stealed> should be <Boost Sealed>.
 * **** That is some massive Engrish there, Olivia.
 * ***** Don't sneak these kinds of comments in. They're not funny.
 * 
 * Version 1.07: May 18, 2023
 * * Compatibility Update!
 * ** Added compatibility for Chain Battles. Cooldowns will be carried across
 *    chained battles. Update made by Olivia.
 * 
 * Version 1.06: December 15, 2022
 * * Bug Fixes!
 * ** Fixed a crash that would occur with <Seal Attack> notetag on any actor
 *    that focuses on auto-battle. Fix made by Olivia.
 * * Compatibility Update!
 * ** Added better compatibility with Active Chain Skills. Boosts now carry
 *    over across the entire chain and granting bonuses to all chained skills
 *    instead of just the first skill of the chain. The bonus effects of the
 *    boosts will end when the chains end.
 * * Documentation Update!
 * ** Added section to "VisuStella MZ Compatibility"
 * *** VisuMZ_3_ActiveChainSkills
 * **** Boosts now carry over across the entire chain and granting bonuses to
 *      all chained skills instead of just the first skill of the chain. The
 *      bonus effects of the boosts will end when the chains end.
 * 
 * Version 1.05: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: August 27, 2021
 * * Compatibility Update!
 * ** Boost text should now work properly with VisuStella MZ's Party System
 *    switching. Update made by Olivia.
 * 
 * Version 1.03: June 25, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 23, 2021
 * * Bug Fixes!
 * ** Boost icons should no longer disappear after a single battle. Fix made
 *    by Olivia.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** <User Boost Points: +x> notetag should now work properly. Fix by Olivia.
 * 
 * Version 1.00 Official Release Date: May 5, 2021
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
 * @param BoostAction
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Settings for the Boost Action mechanics.
 * @default {"BoostPoints":"","MaxStored:num":"5","Usable:num":"3","StartBattle:num":"1","Regen:num":"1","AlwaysRegen:eval":"false","DeathRegen:eval":"false","DeathRemoval:eval":"true","Animations":"","Animations:arraynum":"[\"12\",\"13\",\"15\",\"14\",\"2\",\"51\",\"52\",\"53\",\"67\",\"66\",\"107\"]","AnimationDelay:num":"800","Modifiers":"","Damage":"","DmgMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","DmgAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Turns":"","TurnMultiply:arraynum":"[\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\"]","TurnAddition:arraynum":"[\"0\",\"2\",\"4\",\"6\",\"8\",\"10\",\"12\",\"14\",\"16\",\"18\",\"20\"]","Repeat":"","RepeatMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","RepeatAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Effect":"","EffectMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","EffectAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Analyze":"","AnalyzeMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","AnalyzeAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Settings for the Boost Action UI.
 * @default {"Icons":"","BoostIcon:num":"163","EmptyIcon:num":"161","IconSizeRate:num":"0.5","SmoothIcons:eval":"true","Vocab":"","BoostCmd:str":"Boost","ShowBoostCmd:eval":"true","UnboostCmd:str":"Unboost","ShowUnboostCmd:eval":"true","Controls":"","PgUpDnShortcuts:eval":"true","BypassConstructors:arraystr":"[\"Window_BattleActor\",\"Window_BattleEnemy\",\"Window_BattleItem\",\"Window_PartyBattleSwitch\"]","BattleStatus":"","BattleStatusShow:eval":"true","BattleStatusAutoPosition:eval":"true","BattleStatusOffsetX:num":"+0","BattleStatusOffsetY:num":"+0"}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param BoostPoints
 * @text Boost Points
 *
 * @param MaxStored:num
 * @text Max Stored
 * @parent BoostPoints
 * @type number
 * @min 1
 * @desc Maximum Boost Points that can be stored at any time.
 * @default 5
 *
 * @param Usable:num
 * @text Max Usable
 * @parent BoostPoints
 * @type number
 * @min 1
 * @desc How many Boost Points can be usable at a time?
 * @default 3
 *
 * @param StartBattle:num
 * @text Start Battle
 * @parent BoostPoints
 * @type number
 * @desc How many Boost Points as a base do you want battlers
 * to start battles with?
 * @default 1
 *
 * @param Regen:num
 * @text Regeneration
 * @parent BoostPoints
 * @type number
 * @desc How many Boost Points do you want battlers to regenerate
 * each turn applicable?
 * @default 1
 *
 * @param AlwaysRegen:eval
 * @text Always Regen?
 * @parent Regen:num
 * @type boolean
 * @on Always
 * @off Other
 * @desc Always regenerate Boost Points each turn? Otherwise,
 * regenerate on turns when Boost Points weren't used.
 * @default false
 *
 * @param DeathRegen:eval
 * @text Death Regen?
 * @parent Regen:num
 * @type boolean
 * @on Regen on Death
 * @off No Regen
 * @desc Regenerate Boost Points while dead?
 * Otherwise, don't.
 * @default false
 *
 * @param DeathRemoval:eval
 * @text Death Removal?
 * @parent BoostPoints
 * @type boolean
 * @on Remove on Death
 * @off No Removal
 * @desc Remove all stored Boost Points on death?
 * Otherwise, keep them.
 * @default true
 * 
 * @param Animations
 * @text Boost Animations
 *
 * @param Animations:arraynum
 * @text Animation ID's
 * @parent Animations
 * @type animation[]
 * @desc Animation IDs start from 0 Boosts to max.
 * These animations play when Boosting/Unboosting.
 * @default ["12","13","15","14","2","51","52","53","67","66","107"]
 *
 * @param AnimationDelay:num
 * @text Animation Delay
 * @parent Animations
 * @type number
 * @desc How many milliseconds to play between animations when
 * enemies Boost actions?
 * @default 1000
 * 
 * @param Modifiers
 * @text Boost Modifiers
 * 
 * @param Damage
 * @parent Modifiers
 *
 * @param DmgMultiply:arraynum
 * @text Multipliers
 * @parent Damage
 * @type string[]
 * @desc Damage multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Damage> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param DmgAddition:arraynum
 * @text Addition
 * @parent Damage
 * @type string[]
 * @desc Damage addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Damage> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Turns
 * @parent Modifiers
 * @text State/Buff Turns
 *
 * @param TurnMultiply:arraynum
 * @text Multipliers
 * @parent Turns
 * @type string[]
 * @desc Turn multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Turns> notetag.
 * @default ["1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0"]
 *
 * @param TurnAddition:arraynum
 * @text Addition
 * @parent Turns
 * @type string[]
 * @desc Turn addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Turns> notetag.
 * @default ["0","2","4","6","8","10","12","14","16","18","20"]
 * 
 * @param Repeat
 * @parent Modifiers
 * @text Repeated Hits
 *
 * @param RepeatMultiply:arraynum
 * @text Multipliers
 * @parent Repeat
 * @type string[]
 * @desc Repeat multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Repeat> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param RepeatAddition:arraynum
 * @text Addition
 * @parent Repeat
 * @type string[]
 * @desc Repeat addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Repeat> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Effect
 * @parent Modifiers
 *
 * @param EffectMultiply:arraynum
 * @text Multipliers
 * @parent Effect
 * @type string[]
 * @desc Effect multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Effect Gain> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param EffectAddition:arraynum
 * @text Addition
 * @parent Effect
 * @type string[]
 * @desc Effect addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Effect Gain> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Analyze
 * @parent Modifiers
 *
 * @param AnalyzeMultiply:arraynum
 * @text Multipliers
 * @parent Analyze
 * @type string[]
 * @desc Analyze multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Analyze> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param AnalyzeAddition:arraynum
 * @text Addition
 * @parent Analyze
 * @type string[]
 * @desc Analyze addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Analyze> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param Icons
 *
 * @param BoostIcon:num
 * @text Boost Icon
 * @parent Icons
 * @desc What icon do you wish to represent Boosting
 * and Boost Point availability?
 * @default 163
 *
 * @param EmptyIcon:num
 * @text Empty Icon
 * @parent Icons
 * @desc What icon do you wish to represent Unboosting
 * and Boost Point absence?
 * @default 161
 *
 * @param IconSizeRate:num
 * @text Icon Size Rate
 * @parent Icons
 * @desc What size do you wish the icons to be displayed at?
 * Use a number between 0 and 1 for the best results.
 * @default 0.5
 *
 * @param SmoothIcons:eval
 * @text Smooth Icons?
 * @parent Icons
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Do you wish to smooth out the icons or pixelate them?
 * @default true
 * 
 * @param Vocab
 *
 * @param BoostCmd:str
 * @text Boost Command
 * @parent Vocab
 * @desc This is the text used for the "Boost" command
 * displayed in the Actor Command Window.
 * @default Boost
 *
 * @param ShowBoostCmd:eval
 * @text Show?
 * @parent BoostCmd:str
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show this command in the Actor Command Window?
 * @default true
 *
 * @param UnboostCmd:str
 * @text Unboost Command
 * @parent Vocab
 * @desc This is the text used for the "Unboost" command
 * displayed in the Actor Command Window.
 * @default Unboost
 *
 * @param ShowUnboostCmd:eval
 * @text Show?
 * @parent UnboostCmd:str
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show this command in the Actor Command Window?
 * @default true
 * 
 * @param Controls
 * @text Shortcut Controls
 *
 * @param PgUpDnShortcuts:eval
 * @text Page Up/Dn Shortcuts?
 * @parent Controls
 * @type boolean
 * @on Enable Shortcuts
 * @off Disable Shortcuts
 * @desc Enable Page Up/Down keys to adjust Boost points
 * as a shortcut?
 * @default true
 *
 * @param BypassConstructors:arraystr
 * @text Bypassed Windows
 * @parent Controls
 * @type string[]
 * @desc These are constructor names for windows that the shortcut
 * key will not work on.
 * @default ["Window_BattleActor","Window_BattleEnemy","Window_BattleItem","Window_PartyBattleSwitch"]
 * 
 * @param BattleStatus
 * @text Battle Status
 *
 * @param BattleStatusShow:eval
 * @text Show Boost Points?
 * @parent BattleStatus
 * @type boolean
 * @on Show Boost Points
 * @off Hide Boost Points
 * @desc Show Boost Points in the Battle Status Window?
 * @default true
 *
 * @param BattleStatusAutoPosition:eval
 * @text Auto-Position?
 * @parent BattleStatus
 * @type boolean
 * @on Auto-Position
 * @off Manual Position
 * @desc Automatically position the Boost Points?
 * If not, it'll position it to the upper left.
 * @default true
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How much to offset the Boost icons X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How much to offset the Boost icons Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 */
//=============================================================================

const _0x4661ec=_0x350a;(function(_0x260403,_0x31abda){const _0xa9c764=_0x350a,_0x5ef1bb=_0x260403();while(!![]){try{const _0x516718=-parseInt(_0xa9c764(0x318))/(0xd97+0x1*0x2485+0x7f*-0x65)+parseInt(_0xa9c764(0x193))/(0x22d*0xb+-0xdbd+-0x518*0x2)*(-parseInt(_0xa9c764(0xbd))/(0x1*0x1a75+-0xabb+0x53d*-0x3))+parseInt(_0xa9c764(0x1fc))/(-0x19+0x7*-0x2+0x2b)+-parseInt(_0xa9c764(0x217))/(0x1315+0x57c+0x4*-0x623)*(parseInt(_0xa9c764(0x1b7))/(0x1*0x193a+0xf65*-0x1+-0x9cf))+parseInt(_0xa9c764(0x128))/(-0xfa9+0xf89*0x1+0x27)*(parseInt(_0xa9c764(0x204))/(-0x1399+0x2*0xb51+-0x301))+-parseInt(_0xa9c764(0x1f5))/(0x158e*0x1+0x6e*0x4c+-0x25b*0x17)*(-parseInt(_0xa9c764(0x2cd))/(-0x26f7+-0x39*-0x2f+0x1c8a))+parseInt(_0xa9c764(0xf4))/(0xf6c+0x1a3*0x3+0x6a*-0x31);if(_0x516718===_0x31abda)break;else _0x5ef1bb['push'](_0x5ef1bb['shift']());}catch(_0x35e1ad){_0x5ef1bb['push'](_0x5ef1bb['shift']());}}}(_0x2d2a,-0x5dd33+0x5fb45+0x900da));function _0x2d2a(){const _0x5554df=['Fqwig','tShortcut','resize','BoostSeale','5|3|2|1|0|','Require','rCommandWi','_customMod','xGisg','\x20a\x20Tier\x20%2','XyTKM','_actorComm','jrYXI','stLessEqua','All','bpRegenAdd','1968625ppgjlW','trim','AnimationD','aracters','IkNso','loadBitmap','%1\x20is\x20inco','usShow','yclEp','\x5cI[%1]%2','BattleStat','PJQoY','actorId','applyRulin','KQVIa','ZbRwI','includes','sCore','TS_ADDITIO','er_removeB','oostPoints','BypassCons','tialize','BOFIK','ARRAYSTR','AnalyzeAdd','atus','cape','bitmap','clearBoost','ARRAYFUNC','allowBoost','led','Plugin\x20Man','ointsAuto','descriptio','peeuF','JSON','item','TION_SHOW','ACaWr','atusBoostP','ZwVmZ','boostComma','woiOC','applyBoost','_iconIndex','_BATTLE_ST','Game_Enemy','cursorPage','VisuMZ_1_S','zVZpg','BattleCore','ShowBoostC','hxcgM','Damage','actor%1-bo','addLoadLis','ONS','pNsfg','_stateTurn','elected','VYZvJ','GEN','sRegenFlat','n_numRepea','tsUsableIt','ctiveChain','WMRFq','convertBoo','reorder\x20th','RATE','ger_proces','mBTB','andWindow','RepeatAddi','match','AsLFL','Window_Bas','setBoostSu','orCommand_','TIBvX','convertEsc','_battler','ndName','Command','ateTp','rrectly\x20pl','unboostIco','attle','clamp','VVcov','Selection','BoostActio','VisuMZ_3_A','height','processEne','requestFau','ect','_bpSubject','parameters','TS_TURN_RE','setupBoost','TS_DISPLAY','mallest\x20to','other\x20Tier','le_createA','clear','EffectAddi','SmoothIcon','JpOIw','BoostCmd','jIYug','actor','TS_DEATH_R','OpZhl','LessEqual','JnIxs','CkjZO','playOkSoun','BlkIB','BoostGainP','torCommand','UserBoostP','CALrR','ZHSRh','YnfcI','usOffsetX','ape','activate','sRegenRate','vHrsN','xmWyN','er_regener','ist\x20from\x20s','ager.','Points','max','ndow','tion','attleSyste','ICON_SIZE_','SkillID','version','faceWidth','gxJfH','BoostDamag','commandBoo','tleStatus_','SkLdY','BoostPoint','addDebuff','Window_Act','storedBoos','AnalyzeMul','RepeatMult','ATTLE','currentSym','startActor','Analyze','randomInt','canUndoBoo','myBPUsage','pWindowInB','RwCJU','JbFXO','note','HkJcx','BoostTurns','split','UWeMr','er_addBuff','bGhPR','ease\x20updat','le_startAc','_scene','numRepeats','ectable_cu','st0Escape','getStateRe','qpgjD','BpEffect','5238780vYeGOc','boostAddit','isDead','iVfrk','HUIHS','meetsBoost','prototype','eRefresh','Skill\x20','vSYhe','GfynQ','IVcpV','format','er_addDebu','update','boostIcon','BoostIcons','Sheet','apeCharact','GreaterEqu','xbsER','mandName','resetState','cTGZA','wqIKq','stPoints','UNBOOST_AC','usOffsetY','portrait','unboost','currentAct','rsorPageup','scapeChara','Game_Party','AlwaysRege','Kjjiy','pWANt','BoostBattl','ARRAYEVAL','ctorComman','\x20%3\x20plugin','Window_Bat','PointRepea','tNfMm','n.\x0aPlease\x20','sTurn','dSprites','stUpEscape','LDBVm','_waitCount','CommandSel','Help','_partyChan','hpvsK','VisuMZ_2_B','STR','setHandler','Regen','CwGXe','TS_ANIMATI','createChil','cters','AGEDN','tLZbA','NghNC','selectNext','ON_BYPASS_','_subject','ceil','_addActor','LWAYS','map','cKgpQ','erBase_mee','stLessEsca','196086EwpjZD','ing\x20a\x20requ','ATUS','_inBattle','ferBitmap','PzTcX','dRVYf','Dmpxm','addGuardCo','setStoredB','Yaajv','IUQhF','nvIuk','mmand','aced\x20on\x20th','serEffect','createInne','ion','isSceneBat','getActiveC','unboostCom','PgUpDnShor','addBoostCo','lYqIK','create','subject','leStates','calculateB','_toUseBoos','TargetBoos','ARRAYNUM','\x20largest\x20t','move','call','meetsUsabl','loadSystem','EMsEm','drawItemSt','setup','1107UWqMHr','regenerate','\x20plugin\x20pl','swjVN','placeBoost','Settings','return\x200','Action','ConvertPar','tions','aced\x20over\x20','_turnUsedB','Usable','enemy','Window_Sel','lEscape','LYqyg','dWindow','isActor','n_applyGua','\x20into\x20the\x20','VlgCp','ovaht','tiply','StartBattl','t\x20match\x20pl','iply','gjRve','Equal','EGEN','tipliers','UGkVr','stEqualEsc','Repeat','stEscapeCh','SkillName','some','applyItemU','heetBitmap','WHtfO','er_addStat','ateAll','gainToUseB','qualEscape','install\x20%2','_OFFSET_Y','fjaXj','ition','ion_applyI','sRegenValu','oints','gCxUV','BP\x20Effect','RED','ShortcutRe','11235807NekNeE','addCommand','CXAeH','initMember','parse','KSOcP','wtuQs','shouldDraw','_bpTurnRat','ZJeDQ','updateFram','cxNTi','UhAab','RefreshHel','TurnMultip','_bpTurnFla','ARRAYSTRUC','canUseBoos','lineHeight','Turn','erBase_res','ified','down','commandUnb','WPONi','exit','partyChang','gmIZH','BoostRepea','iconWidth','ON_SHOW','floor','_setup','status','PtoUse','stDamageEs','gTrsn','endActionB','e\x20plugin\x20l','YAmsJ','addChild','_logWindow','maxTurns','updateIcon','tener','istStyle','stTurnEsca','gainStored','eStartFlat','_AUTO_POS','boostIcons','toUpperCas','5069127NUkFoU','boostPoint','attleCore','nrrGr','DmgMultipl','attleChain','tsAdded','BHEvY','optDisplay','BOOST_POIN','rsorPagedo','Amount','_icons','round','jAEwx','Subject','eStartRate','setToUseBo','_removeAct','JtFBw','CZbPa','inBattle','bVjlm','ZSPgZ','CONSTRUCTO','izXXZ','quirements','bol','IrxGh','txmsv','etStateCou','_helpWindo','createActo','CLmWa','noigv','boostTrans','ddNZf','width','sHhUZ','processtoU','setFrame','length','addUnboost','tructors','ers','ShowUnboos','KSCVk','Iaeyd','EbSrC','ired\x20plugi','PointDamag','commandSty','mtnjP','tcuts','ection','cEqkn','PointTurns','tCmd','ociHR','SBbei','TS_MAX_TOU','constructo','vhzaP','replace','members','ist.\x0aIt\x20is','EnemyBoost','YEEkj','BattleMana','extCommand','apply','dVCuV','initialize','3|0|2|5|1|','_slot','yquQN','scale','iconHeight','SMgMI','ugin\x27s.\x20Pl','ction','LvbFm','geRefresh','oost','battleLayo','saKNm','endAction','TckjG','Scene_Batt','OeUkq','Game_Actio','eBoostPoin','OveAT','n_apply','thPadding','bject','hcuWW','JqCjT','boost','kEfCB','QbIsm','removeActo','processTur','Counts','smooth','sqwTN','scape','5474gzQfnZ','text','CwBBD','addBuff','_boostAI','plier','wjrSa','boostSmoot','utUTP','usAutoPosi','ON_SHORTCU','refresh','__Game_Act','STRUCT','applyBPEff','EQBeh','tsAnimatio','BVWXr','CEuUr','qgwIg','EOhBW','TS_START_B','bJUfD','toLowerCas','border','MbRDO','ams','e_convertE','EffectMult','4|3|1|5|2|','mgdSQ','e\x20Plugin\x20M','ier\x20number','bpRegenMul','RegExp','_actor','18jcdotv','_storedBoo','meetstoUse','ztClc','DeathRemov','startChang','default','isBoostSea','stAnalyzeE','JmBzu','nSPCF','NUM','nts','le_selectN','setupBattl','minTurns','uWhAB','YxNBH','addState','addActor','stGreaterE','ger_setup','xAnimation','applyGuard','ointsDefau','Less','zLygK','name','BOOST_ACTI','xvvkJ','stEffectEs','greater','erBase_ini','boostMulti','5|3|4|0|1|','djJxr','TS_MAX_STO','seBoostPoi','EmptyIcon','ostPoints','FUNC','TS_MULTIPL','DsJaa','ects','tryPO','bind','initBoostA','IERS','Mechanics','blt','temUserEff','tle','itemRectWi','rSprite','_boostIcon','sRequireme','traitObjec','PulDi','reset','eItemCondi','toUseBoost','callUpdate','9Zzconn','emConditio','T_PAGEUP_P','EVAL','NwDjs','MaxStored','wEIqG','2861912NakMKL','ger_endAct','isBTB','stRepeatEs','szJjM','ON_DELAY','_previousB','Game_Battl','8mwHvbR','tPoints','tsMultipli'];_0x2d2a=function(){return _0x5554df;};return _0x2d2a();}var label=_0x4661ec(0x274)+'n',tier=tier||-0x17ba+-0x368*0xa+0x39ca*0x1,dependencies=['VisuMZ_0_C'+'oreEngine','VisuMZ_1_B'+_0x4661ec(0x12a),_0x4661ec(0x249)+'killsState'+_0x4661ec(0x228)],pluginData=$plugins['filter'](function(_0x360f76){const _0x308661=_0x4661ec,_0x1d30bc={'BHEvY':function(_0x239966,_0x2a0e86){return _0x239966+_0x2a0e86;},'djJxr':function(_0x5d4b13,_0x43babb){return _0x5d4b13+_0x43babb;}};return _0x360f76[_0x308661(0x115)]&&_0x360f76[_0x308661(0x23a)+'n'][_0x308661(0x227)](_0x1d30bc[_0x308661(0x12f)](_0x1d30bc[_0x308661(0x1da)]('[',label),']'));})[0x1190+-0x7cd*-0x2+-0x212a];VisuMZ[label][_0x4661ec(0xc2)]=VisuMZ[label][_0x4661ec(0xc2)]||{},VisuMZ[_0x4661ec(0xc5)+'ams']=function(_0x396503,_0x271fbb){const _0x3abec3=_0x4661ec,_0x49f462={'oiGOx':function(_0xef6f92,_0x21ea47){return _0xef6f92(_0x21ea47);},'fNLOG':function(_0x40234e,_0x10c627){return _0x40234e(_0x10c627);},'KSOcP':_0x3abec3(0x1c2),'Yaajv':function(_0x52dd65,_0x1109af){return _0x52dd65!==_0x1109af;},'IVcpV':function(_0x543e1a,_0x330f8d){return _0x543e1a(_0x330f8d);},'rwgTs':_0x3abec3(0xb4),'NbuRn':_0x3abec3(0x1f8),'ddNZf':function(_0x4ae215,_0x483798){return _0x4ae215!==_0x483798;},'cTGZA':function(_0x446512,_0xb9a7af){return _0x446512(_0xb9a7af);},'xvvkJ':_0x3abec3(0x2f3),'hcuWW':_0x3abec3(0x23c),'CALrR':'ARRAYJSON','OeUkq':_0x3abec3(0x1df),'wqIKq':_0x3abec3(0xc3),'CEuUr':_0x3abec3(0x235),'mgdSQ':_0x3abec3(0x304),'JTpHR':function(_0x338e89,_0x45793e){return _0x338e89!==_0x45793e;},'ApMsp':function(_0xb0a90d,_0x1e6632){return _0xb0a90d(_0x1e6632);},'pNsfg':_0x3abec3(0x22f),'wjrSa':_0x3abec3(0x1a0),'nSPCF':function(_0x4a4231,_0x2c5406){return _0x4a4231!==_0x2c5406;},'djpLh':_0x3abec3(0x104)+'T','JnIxs':function(_0x41ffef,_0x499221){return _0x41ffef!==_0x499221;}};for(const _0x444f05 in _0x271fbb){if(_0x444f05[_0x3abec3(0x263)](/(.*):(.*)/i)){const _0x3d8526=_0x49f462['oiGOx'](String,RegExp['$1']),_0x462953=_0x49f462['fNLOG'](String,RegExp['$2'])[_0x3abec3(0x127)+'e']()['trim']();let _0x3ba976,_0x587218,_0x17c299;switch(_0x462953){case _0x49f462[_0x3abec3(0xf9)]:_0x3ba976=_0x49f462[_0x3abec3(0xa0)](_0x271fbb[_0x444f05],'')?_0x49f462[_0x3abec3(0x2d8)](Number,_0x271fbb[_0x444f05]):-0x533*-0x4+-0x1473+-0x59;break;case _0x49f462['rwgTs']:_0x587218=_0x49f462[_0x3abec3(0xa0)](_0x271fbb[_0x444f05],'')?JSON[_0x3abec3(0xf8)](_0x271fbb[_0x444f05]):[],_0x3ba976=_0x587218[_0x3abec3(0x314)](_0x1400a5=>Number(_0x1400a5));break;case _0x49f462['NbuRn']:_0x3ba976=_0x49f462[_0x3abec3(0x14c)](_0x271fbb[_0x444f05],'')?_0x49f462[_0x3abec3(0x2e4)](eval,_0x271fbb[_0x444f05]):null;break;case _0x49f462[_0x3abec3(0x1d4)]:_0x587218=_0x49f462['Yaajv'](_0x271fbb[_0x444f05],'')?JSON[_0x3abec3(0xf8)](_0x271fbb[_0x444f05]):[],_0x3ba976=_0x587218[_0x3abec3(0x314)](_0x12b62e=>eval(_0x12b62e));break;case _0x49f462[_0x3abec3(0x188)]:_0x3ba976=_0x49f462[_0x3abec3(0xa0)](_0x271fbb[_0x444f05],'')?JSON[_0x3abec3(0xf8)](_0x271fbb[_0x444f05]):'';break;case _0x49f462[_0x3abec3(0x293)]:_0x587218=_0x49f462[_0x3abec3(0x14c)](_0x271fbb[_0x444f05],'')?JSON[_0x3abec3(0xf8)](_0x271fbb[_0x444f05]):[],_0x3ba976=_0x587218[_0x3abec3(0x314)](_0x2cd700=>JSON[_0x3abec3(0xf8)](_0x2cd700));break;case _0x49f462[_0x3abec3(0x181)]:_0x3ba976=_0x49f462[_0x3abec3(0xa0)](_0x271fbb[_0x444f05],'')?new Function(JSON[_0x3abec3(0xf8)](_0x271fbb[_0x444f05])):new Function(_0x49f462[_0x3abec3(0x2e5)]);break;case _0x49f462[_0x3abec3(0x1a5)]:_0x587218=_0x49f462[_0x3abec3(0xa0)](_0x271fbb[_0x444f05],'')?JSON['parse'](_0x271fbb[_0x444f05]):[],_0x3ba976=_0x587218[_0x3abec3(0x314)](_0x15c996=>new Function(JSON[_0x3abec3(0xf8)](_0x15c996)));break;case _0x49f462[_0x3abec3(0x1b1)]:_0x3ba976=_0x49f462['JTpHR'](_0x271fbb[_0x444f05],'')?_0x49f462['ApMsp'](String,_0x271fbb[_0x444f05]):'';break;case _0x49f462[_0x3abec3(0x252)]:_0x587218=_0x49f462[_0x3abec3(0x14c)](_0x271fbb[_0x444f05],'')?JSON[_0x3abec3(0xf8)](_0x271fbb[_0x444f05]):[],_0x3ba976=_0x587218[_0x3abec3(0x314)](_0x2a8ef4=>String(_0x2a8ef4));break;case _0x49f462[_0x3abec3(0x199)]:_0x17c299=_0x49f462[_0x3abec3(0x1c1)](_0x271fbb[_0x444f05],'')?JSON['parse'](_0x271fbb[_0x444f05]):{},_0x3ba976=VisuMZ[_0x3abec3(0xc5)+_0x3abec3(0x1ad)]({},_0x17c299);break;case _0x49f462['djpLh']:_0x587218=_0x49f462[_0x3abec3(0x28c)](_0x271fbb[_0x444f05],'')?JSON[_0x3abec3(0xf8)](_0x271fbb[_0x444f05]):[],_0x3ba976=_0x587218[_0x3abec3(0x314)](_0x5ccf54=>VisuMZ[_0x3abec3(0xc5)+_0x3abec3(0x1ad)]({},JSON[_0x3abec3(0xf8)](_0x5ccf54)));break;default:continue;}_0x396503[_0x3d8526]=_0x3ba976;}}return _0x396503;},(_0x4be751=>{const _0x552605=_0x4661ec,_0x5d8b16={'JtFBw':function(_0x5ae4be,_0x469498){return _0x5ae4be(_0x469498);},'JpOIw':'%1\x20is\x20miss'+_0x552605(0x319)+_0x552605(0x159)+_0x552605(0x2f9)+_0x552605(0xe9)+_0x552605(0xd1)+_0x552605(0x238)+_0x552605(0x29e),'hpvsK':function(_0x18a06f,_0x369309){return _0x18a06f(_0x369309);},'qgwIg':function(_0x16b938,_0xacb361){return _0x16b938!==_0xacb361;},'yCqOE':'%1\x27s\x20versi'+'on\x20does\x20no'+_0x552605(0xd6)+_0x552605(0x177)+_0x552605(0x2c4)+'e\x20it\x20in\x20th'+_0x552605(0x1b2)+'anager.','EQBeh':function(_0x5e1e4f,_0x32b184){return _0x5e1e4f<_0x32b184;},'quAVL':_0x552605(0x21d)+_0x552605(0x26e)+_0x552605(0xa4)+_0x552605(0x11a)+_0x552605(0x169)+_0x552605(0x210)+_0x552605(0xbf)+_0x552605(0xc7)+_0x552605(0x280)+_0x552605(0x2f5)+'s.\x0aPlease\x20'+_0x552605(0x25d)+_0x552605(0x11a)+_0x552605(0x29d)+_0x552605(0x27f)+_0x552605(0xb5)+_0x552605(0x1b3)+'s.'},_0x4f6f27=_0x4be751['name'];for(const _0x4bc182 of dependencies){if(!Imported[_0x4bc182]){_0x5d8b16[_0x552605(0x13b)](alert,_0x5d8b16[_0x552605(0x285)][_0x552605(0x2d9)](_0x4f6f27,_0x4bc182)),SceneManager[_0x552605(0x10d)]();break;}}const _0x299c99=_0x4be751['descriptio'+'n'];if(_0x299c99[_0x552605(0x263)](/\[Version[ ](.*?)\]/i)){const _0x3ea0b8=_0x5d8b16['hpvsK'](Number,RegExp['$1']);_0x5d8b16[_0x552605(0x1a6)](_0x3ea0b8,VisuMZ[label][_0x552605(0x2a6)])&&(_0x5d8b16[_0x552605(0x302)](alert,_0x5d8b16['yCqOE'][_0x552605(0x2d9)](_0x4f6f27,_0x3ea0b8)),SceneManager[_0x552605(0x10d)]());}if(_0x299c99[_0x552605(0x263)](/\[Tier[ ](\d+)\]/i)){const _0x46b599=_0x5d8b16[_0x552605(0x13b)](Number,RegExp['$1']);_0x5d8b16[_0x552605(0x1a2)](_0x46b599,tier)?(_0x5d8b16[_0x552605(0x302)](alert,_0x5d8b16['quAVL'][_0x552605(0x2d9)](_0x4f6f27,_0x46b599,tier)),SceneManager[_0x552605(0x10d)]()):tier=Math[_0x552605(0x2a0)](_0x46b599,tier);}VisuMZ[_0x552605(0xc5)+_0x552605(0x1ad)](VisuMZ[label][_0x552605(0xc2)],_0x4be751[_0x552605(0x27b)]);})(pluginData),VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0x1b5)]={'BoostDamage':/<(?:BP|BOOST) (?:DMG|DAMAGE)>/i,'BoostTurns':/<(?:BP|BOOST) (?:TURN|TURNS)>/i,'BoostRepeat':/<(?:BP|BOOST) (?:REPEAT|REPEATS|HIT|HITS)>/i,'BoostAnalyze':/<(?:BP|BOOST) (?:ANALYZE|ANALYSIS)>/i,'TargetBoostPoints':/<TARGET (?:BP|BOOST POINT|BOOST POINTS): ([\+\-]\d+)>/i,'UserBoostPoints':/<USER (?:BP|BOOST POINT|BOOST POINTS): ([\+\-]\d+)>/i,'BoostGainPoints':/<(?:BP|BOOST) (?:BP|BOOST POINT|BOOST POINTS|POINT|POINTS|EFFECT|EFFECTS) (?:EFFECT|GAIN|LOSS)>/i,'Require':{'Amount':/<REQUIRE (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'GreaterEqual':/<REQUIRE >= (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Greater':/<REQUIRE > (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Equal':/<REQUIRE = (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Less':/<REQUIRE < (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'LessEqual':/<REQUIRE <= (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i},'BoostSealed':/<(?:BP|BOOST) (?:SEAL|SEALED)>/i,'BoostBattleStartRate':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) BATTLE START: (\d+)([%％])>/i,'BoostBattleStartFlat':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) BATTLE START: ([\+\-]\d+)>/i,'BoostPointsRegenRate':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) REGEN: (\d+)([%％])>/i,'BoostPointsRegenFlat':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) REGEN: ([\+\-]\d+)>/i,'EnemyBoostSkillID':/<BOOST SKILL (\d+):[ ](.*)>/i,'EnemyBoostSkillName':/<BOOST (.*):[ ](.*)>/i},ImageManager[_0x4661ec(0x2dc)]=VisuMZ['BoostActio'+'n'][_0x4661ec(0xc2)]['UI']['BoostIcon'],ImageManager['unboostIco'+'n']=VisuMZ[_0x4661ec(0x274)+'n']['Settings']['UI'][_0x4661ec(0x1dd)],ImageManager['boostSmoot'+'h']=VisuMZ['BoostActio'+'n']['Settings']['UI'][_0x4661ec(0x284)+'s'],ImageManager[_0x4661ec(0x126)+_0x4661ec(0xe3)]=function(){const _0x4ab50e=_0x4661ec,_0x279b0a={'VYZvJ':'IconSet'};if(!this[_0x4ab50e(0x1ed)+_0x4ab50e(0x2de)]){this[_0x4ab50e(0x1ed)+_0x4ab50e(0x2de)]=new Bitmap();const _0x37c6aa=ImageManager[_0x4ab50e(0xb9)](_0x279b0a[_0x4ab50e(0x255)]);_0x37c6aa[_0x4ab50e(0x250)+_0x4ab50e(0x120)](this['boostTrans'+_0x4ab50e(0x31c)][_0x4ab50e(0x1e4)](this,_0x37c6aa));}return this['_boostIcon'+_0x4ab50e(0x2de)];},ImageManager[_0x4661ec(0x14b)+_0x4661ec(0x31c)]=function(_0x15bda0){const _0x1f9c9a=_0x4661ec;this[_0x1f9c9a(0x1ed)+_0x1f9c9a(0x2de)][_0x1f9c9a(0x209)](_0x15bda0[_0x1f9c9a(0x14d)],_0x15bda0[_0x1f9c9a(0x276)]),this[_0x1f9c9a(0x1ed)+_0x1f9c9a(0x2de)][_0x1f9c9a(0x1e8)](_0x15bda0,-0xa77+-0x1f38+0x29af,-0x2*0x529+0x8dd*0x1+0x175*0x1,_0x15bda0[_0x1f9c9a(0x14d)],_0x15bda0[_0x1f9c9a(0x276)],0x174b+-0xbc*-0x14+-0x25fb,-0x1ae2+-0x2303*-0x1+0x821*-0x1),this[_0x1f9c9a(0x1ed)+_0x1f9c9a(0x2de)][_0x1f9c9a(0x190)]=ImageManager[_0x1f9c9a(0x19a)+'h'],this['_boostIcon'+_0x1f9c9a(0x2de)][_0x1f9c9a(0x20e)+_0x1f9c9a(0x109)]=![];},TextManager[_0x4661ec(0x242)+_0x4661ec(0x26b)]=VisuMZ['BoostActio'+'n']['Settings']['UI'][_0x4661ec(0x286)],TextManager['unboostCom'+'mandName']=VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0xc2)]['UI']['UnboostCmd'],VisuMZ[_0x4661ec(0x274)+'n']['BattleMana'+_0x4661ec(0x1cc)]=BattleManager['setup'],BattleManager[_0x4661ec(0xbc)]=function(_0x154367,_0x4217c7,_0x326cd2){const _0x5e345a=_0x4661ec;VisuMZ[_0x5e345a(0x274)+'n'][_0x5e345a(0x16c)+'ger_setup']['call'](this,_0x154367,_0x4217c7,_0x326cd2),$gameParty['setupBattl'+_0x5e345a(0x183)+'ts'](),$gameTroop[_0x5e345a(0x1c5)+'eBoostPoin'+'ts']();},VisuMZ['BoostActio'+'n'][_0x4661ec(0x16c)+'ger_proces'+'sTurn']=BattleManager[_0x4661ec(0x18e)+'n'],BattleManager[_0x4661ec(0x18e)+'n']=function(){const _0x3af39a=_0x4661ec;this[_0x3af39a(0x277)+'myUseBoost'](),VisuMZ[_0x3af39a(0x274)+'n'][_0x3af39a(0x16c)+_0x3af39a(0x25f)+_0x3af39a(0x2fa)][_0x3af39a(0xb7)](this);},BattleManager[_0x4661ec(0x277)+'myUseBoost']=function(){const _0x4806a8=_0x4661ec,_0x5b7f2e={'WHtfO':function(_0x108ae6,_0x25c54c){return _0x108ae6>_0x25c54c;}};var _0x3305d8=this[_0x4806a8(0x310)],_0x1e6e58=_0x3305d8[_0x4806a8(0x2eb)+_0x4806a8(0xa7)]();!!_0x3305d8&&_0x3305d8['isEnemy']()&&!!_0x1e6e58&&_0x1e6e58['isSkill']()&&_0x5b7f2e[_0x4806a8(0xe4)](_0x3305d8[_0x4806a8(0x2b0)+'tPoints'](),-0x3*0xaf7+-0x1ccb+0x3db0)&&!_0x3305d8[_0x4806a8(0x1be)+'led']()&&_0x3305d8[_0x4806a8(0x14f)+_0x4806a8(0x1dc)+_0x4806a8(0x1c3)](_0x1e6e58[_0x4806a8(0x23d)]());},BattleManager[_0x4661ec(0x236)+_0x4661ec(0xc4)]=function(){const _0x1b5e01=_0x4661ec;if(Imported[_0x1b5e01(0x303)+_0x1b5e01(0x2a3)+_0x1b5e01(0x260)]&&this[_0x1b5e01(0x1fe)]())return![];return!![];},VisuMZ['BoostActio'+'n']['Game_Actio'+_0x4661ec(0x258)+'ts']=Game_Action[_0x4661ec(0x2d3)][_0x4661ec(0x2c7)],Game_Action[_0x4661ec(0x2d3)][_0x4661ec(0x2c7)]=function(){const _0x48a5b3=_0x4661ec;var _0xcdb158=VisuMZ['BoostActio'+'n'][_0x48a5b3(0x182)+_0x48a5b3(0x258)+'ts'][_0x48a5b3(0xb7)](this);_0xcdb158=this[_0x48a5b3(0x244)+_0x48a5b3(0x2f7)+'ts'](_0xcdb158);return Math[_0x48a5b3(0x135)](_0xcdb158);;},Game_Action['prototype'][_0x4661ec(0x244)+'PointRepea'+'ts']=function(_0x3f5670){const _0x346802=_0x4661ec,_0x180173={'bVjlm':_0x346802(0xde),'qTZJd':function(_0x93a16d,_0x241e18){return _0x93a16d*_0x241e18;}},_0x321748=VisuMZ[_0x346802(0x274)+'n'][_0x346802(0x1b5)];if(!!this[_0x346802(0xaf)]()&&!!this['item']()&&this[_0x346802(0x23d)]()[_0x346802(0x2bd)]['match'](_0x321748[_0x346802(0x110)+'t'])){var _0x28b4f3=this[_0x346802(0xaf)]()[_0x346802(0x1d8)+_0x346802(0x198)](_0x180173[_0x346802(0x13e)]);_0x3f5670=Math[_0x346802(0x135)](_0x180173['qTZJd'](_0x3f5670,_0x28b4f3)),_0x3f5670+=this[_0x346802(0xaf)]()[_0x346802(0x2ce)+_0x346802(0xa7)](_0x180173[_0x346802(0x13e)]);}return _0x3f5670;},VisuMZ['BoostActio'+'n'][_0x4661ec(0x182)+_0x4661ec(0xd0)+'rd']=Game_Action[_0x4661ec(0x2d3)][_0x4661ec(0x1ce)],Game_Action[_0x4661ec(0x2d3)][_0x4661ec(0x1ce)]=function(_0x5c5f4a,_0x485659){const _0x5bdccf=_0x4661ec;return _0x5c5f4a=this[_0x5bdccf(0x244)+_0x5bdccf(0x15a)+'e'](_0x5c5f4a),VisuMZ[_0x5bdccf(0x274)+'n']['Game_Actio'+_0x5bdccf(0xd0)+'rd']['call'](this,_0x5c5f4a,_0x485659);},Game_Action[_0x4661ec(0x2d3)][_0x4661ec(0x244)+_0x4661ec(0x15a)+'e']=function(_0x500661){const _0x3957f4=_0x4661ec,_0x540691={'IrxGh':_0x3957f4(0x24e),'ZJeDQ':function(_0x540533,_0x4d5fa9){return _0x540533*_0x4d5fa9;}},_0x4b56b1=VisuMZ[_0x3957f4(0x274)+'n']['RegExp'];if(!!this[_0x3957f4(0xaf)]()&&this['item']()[_0x3957f4(0x2bd)][_0x3957f4(0x263)](_0x4b56b1[_0x3957f4(0x2a9)+'e'])){var _0x3c9b16=this['subject']()['boostMulti'+_0x3957f4(0x198)](_0x540691[_0x3957f4(0x144)]);_0x500661=Math[_0x3957f4(0x135)](_0x540691[_0x3957f4(0xfd)](_0x500661,_0x3c9b16)),_0x500661+=this['subject']()['boostAddit'+_0x3957f4(0xa7)](_0x540691['IrxGh']);}return _0x500661;},VisuMZ['BoostActio'+'n'][_0x4661ec(0x182)+_0x4661ec(0x185)]=Game_Action[_0x4661ec(0x2d3)][_0x4661ec(0x16e)],Game_Action[_0x4661ec(0x2d3)][_0x4661ec(0x16e)]=function(_0x389004){const _0x450376=_0x4661ec;this['applyBoost'+'PointTurns'](![]),VisuMZ['BoostActio'+'n']['Game_Actio'+_0x450376(0x185)][_0x450376(0xb7)](this,_0x389004),this['applyBoost'+_0x450376(0x160)](!![]);},Game_Action[_0x4661ec(0x2d3)]['applyBoost'+_0x4661ec(0x160)]=function(_0x4f5f85){const _0x58c5de=_0x4661ec,_0x47e7e7={'ZwVmZ':'Turn'},_0x21145a=VisuMZ['BoostActio'+'n'][_0x58c5de(0x1b5)];if(!!this[_0x58c5de(0xaf)]()&&this[_0x58c5de(0x23d)]()[_0x58c5de(0x2bd)]['match'](_0x21145a[_0x58c5de(0x2bf)])){var _0x49d9ed=this[_0x58c5de(0xaf)]()[_0x58c5de(0x1d8)+_0x58c5de(0x198)](_0x47e7e7[_0x58c5de(0x241)]);$gameTemp[_0x58c5de(0xfc)+'e']=_0x49d9ed,$gameTemp[_0x58c5de(0x103)+'t']=this[_0x58c5de(0xaf)]()[_0x58c5de(0x2ce)+_0x58c5de(0xa7)](_0x47e7e7[_0x58c5de(0x241)]);}_0x4f5f85&&($gameTemp[_0x58c5de(0xfc)+'e']=undefined,$gameTemp[_0x58c5de(0x103)+'t']=undefined);},VisuMZ['BoostActio'+'n'][_0x4661ec(0x19f)+'ion_applyI'+_0x4661ec(0x1e9)+_0x4661ec(0x279)]=Game_Action[_0x4661ec(0x2d3)][_0x4661ec(0xe2)+_0x4661ec(0xa5)],Game_Action[_0x4661ec(0x2d3)][_0x4661ec(0xe2)+'serEffect']=function(_0x5e327d){const _0x43efc3=_0x4661ec;VisuMZ['BoostActio'+'n'][_0x43efc3(0x19f)+_0x43efc3(0xed)+_0x43efc3(0x1e9)+_0x43efc3(0x279)]['call'](this,_0x5e327d),this[_0x43efc3(0x1a1)+'ects'](_0x5e327d);},Game_Action['prototype'][_0x4661ec(0x1a1)+_0x4661ec(0x1e2)]=function(_0x5c9509){const _0x354700=_0x4661ec,_0x517ae5={'xbsER':function(_0x1dec73,_0x150b3c){return _0x1dec73(_0x150b3c);},'cKgpQ':function(_0x500a10,_0x5849d0){return _0x500a10*_0x5849d0;},'CXAeH':_0x354700(0xf1),'RlWpL':function(_0x591c0f,_0x18ecee){return _0x591c0f(_0x18ecee);}},_0x29a53f=VisuMZ[_0x354700(0x274)+'n'][_0x354700(0x1b5)];if(!!_0x5c9509&&this[_0x354700(0x23d)]()[_0x354700(0x2bd)][_0x354700(0x263)](_0x29a53f[_0x354700(0xb3)+_0x354700(0x205)])){var _0x1b5794=_0x517ae5[_0x354700(0x2e1)](parseInt,RegExp['$1']);this[_0x354700(0x23d)]()[_0x354700(0x2bd)][_0x354700(0x263)](_0x29a53f[_0x354700(0x290)+_0x354700(0xef)])&&(_0x1b5794=Math[_0x354700(0x135)](_0x517ae5[_0x354700(0x315)](this[_0x354700(0xaf)]()[_0x354700(0x1d8)+_0x354700(0x198)](_0x517ae5[_0x354700(0xf6)]),_0x1b5794)),_0x1b5794+=this[_0x354700(0xaf)]()[_0x354700(0x2ce)+_0x354700(0xa7)](_0x517ae5[_0x354700(0xf6)])),_0x5c9509[_0x354700(0x123)+_0x354700(0x2ad)+'s'](_0x1b5794);}if(!!this[_0x354700(0xaf)]()&&this[_0x354700(0x23d)]()[_0x354700(0x2bd)][_0x354700(0x263)](_0x29a53f[_0x354700(0x292)+_0x354700(0xef)])){var _0x1b5794=_0x517ae5['RlWpL'](parseInt,RegExp['$1']);this[_0x354700(0x23d)]()['note']['match'](_0x29a53f[_0x354700(0x290)+_0x354700(0xef)])&&(_0x1b5794=Math['round'](_0x517ae5[_0x354700(0x315)](this[_0x354700(0xaf)]()[_0x354700(0x1d8)+'plier'](_0x517ae5[_0x354700(0xf6)]),_0x1b5794)),_0x1b5794+=this[_0x354700(0xaf)]()[_0x354700(0x2ce)+_0x354700(0xa7)](_0x517ae5[_0x354700(0xf6)])),this['subject']()['gainStored'+_0x354700(0x2ad)+'s'](_0x1b5794);}},Game_BattlerBase['BOOST_POIN'+_0x4661ec(0x1db)+_0x4661ec(0xf2)]=VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0xc2)][_0x4661ec(0x1e7)][_0x4661ec(0x1fa)],Game_BattlerBase[_0x4661ec(0x131)+_0x4661ec(0x164)+'SE']=VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0xc2)][_0x4661ec(0x1e7)][_0x4661ec(0xc9)],Game_BattlerBase[_0x4661ec(0x131)+_0x4661ec(0x289)+_0x4661ec(0xda)]=VisuMZ['BoostActio'+'n']['Settings'][_0x4661ec(0x1e7)]['DeathRegen'],Game_BattlerBase[_0x4661ec(0x131)+_0x4661ec(0x289)+'EMOVE']=VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0xc2)][_0x4661ec(0x1e7)][_0x4661ec(0x1bb)+'al'],Game_BattlerBase[_0x4661ec(0x131)+'TS_REGEN_A'+_0x4661ec(0x313)]=VisuMZ['BoostActio'+'n'][_0x4661ec(0xc2)]['Mechanics'][_0x4661ec(0x2ef)+'n'],Game_BattlerBase[_0x4661ec(0x131)+_0x4661ec(0x27c)+_0x4661ec(0x256)]=VisuMZ['BoostActio'+'n'][_0x4661ec(0xc2)][_0x4661ec(0x1e7)][_0x4661ec(0x306)],Game_BattlerBase[_0x4661ec(0x131)+_0x4661ec(0x1a8)+_0x4661ec(0x2b3)]=VisuMZ['BoostActio'+'n'][_0x4661ec(0xc2)][_0x4661ec(0x1e7)][_0x4661ec(0xd5)+'e'],VisuMZ['BoostActio'+'n']['Game_Battl'+_0x4661ec(0x1d7)+_0x4661ec(0x22d)]=Game_BattlerBase[_0x4661ec(0x2d3)][_0x4661ec(0x170)],Game_BattlerBase[_0x4661ec(0x2d3)][_0x4661ec(0x170)]=function(){const _0x5516c5=_0x4661ec;VisuMZ[_0x5516c5(0x274)+'n'][_0x5516c5(0x203)+_0x5516c5(0x1d7)+_0x5516c5(0x22d)]['call'](this),this[_0x5516c5(0x1e5)+_0x5516c5(0x178)]();},Game_BattlerBase[_0x4661ec(0x2d3)][_0x4661ec(0x1e5)+_0x4661ec(0x178)]=function(){const _0x5c03b6=_0x4661ec;this[_0x5c03b6(0x1b8)+_0x5c03b6(0x2e6)]=this[_0x5c03b6(0x1b8)+'stPoints']||0x1592+0x32f+0x1*-0x18c1,this[_0x5c03b6(0xb2)+_0x5c03b6(0x205)]=this[_0x5c03b6(0xb2)+'tPoints']||-0x449*-0x7+-0xaac+-0x1353,this['_turnUsedB'+_0x5c03b6(0x22b)]=this[_0x5c03b6(0xc8)+_0x5c03b6(0x22b)]||-0x1cf7+-0x1406+0x1*0x30fd;},Game_BattlerBase['prototype'][_0x4661ec(0x2b0)+_0x4661ec(0x205)]=function(){const _0x5d34a0=_0x4661ec,_0x2c018e={'efvVP':function(_0x3242ce,_0x4a893a){return _0x3242ce===_0x4a893a;}};return _0x2c018e['efvVP'](this[_0x5d34a0(0x1b8)+_0x5d34a0(0x2e6)],undefined)&&this['initBoostA'+_0x5d34a0(0x178)](),this[_0x5d34a0(0x1b8)+_0x5d34a0(0x2e6)];},Game_BattlerBase[_0x4661ec(0x2d3)]['setStoredB'+_0x4661ec(0x22b)]=function(_0x5d334a){const _0x1f2c36=_0x4661ec,_0x14ab56={'WMRFq':function(_0x17414d,_0x43e64b){return _0x17414d===_0x43e64b;}};_0x14ab56[_0x1f2c36(0x25b)](this[_0x1f2c36(0x1b8)+_0x1f2c36(0x2e6)],undefined)&&this[_0x1f2c36(0x1e5)+_0x1f2c36(0x178)](),_0x5d334a=Math[_0x1f2c36(0x135)](_0x5d334a),this['_storedBoo'+_0x1f2c36(0x2e6)]=_0x5d334a[_0x1f2c36(0x271)](-0x1666+0xed6+-0x4*-0x1e4,Game_BattlerBase[_0x1f2c36(0x131)+_0x1f2c36(0x1db)+_0x1f2c36(0xf2)]),this[_0x1f2c36(0x19e)]();},Game_BattlerBase[_0x4661ec(0x2d3)][_0x4661ec(0x1f3)+_0x4661ec(0x29f)]=function(){const _0x1dacc7=_0x4661ec,_0x4b5e62={'vHrsN':function(_0x26fae2,_0x4fc067){return _0x26fae2===_0x4fc067;}};return _0x4b5e62[_0x1dacc7(0x29a)](this[_0x1dacc7(0xb2)+_0x1dacc7(0x205)],undefined)&&this[_0x1dacc7(0x1e5)+_0x1dacc7(0x178)](),this[_0x1dacc7(0xb2)+_0x1dacc7(0x205)];},Game_BattlerBase[_0x4661ec(0x2d3)][_0x4661ec(0x139)+'ostPoints']=function(_0x5133f6){const _0x49cb7d=_0x4661ec,_0x1d32c2={'tLZbA':function(_0x3f581e,_0x31a126){return _0x3f581e===_0x31a126;}};_0x1d32c2[_0x49cb7d(0x30c)](this['_toUseBoos'+'tPoints'],undefined)&&this[_0x49cb7d(0x1e5)+_0x49cb7d(0x178)](),_0x5133f6=Math['round'](_0x5133f6),this[_0x49cb7d(0xb2)+_0x49cb7d(0x205)]=_0x5133f6[_0x49cb7d(0x271)](0x10f*0x13+-0x8*0x358+0x1*0x6a3,Game_BattlerBase[_0x49cb7d(0x131)+_0x49cb7d(0x164)+'SE']),this[_0x49cb7d(0x19e)]();},Game_BattlerBase[_0x4661ec(0x2d3)]['boostPoint'+_0x4661ec(0xee)+'e']=function(){const _0x211bc2=_0x4661ec;if(!Game_BattlerBase[_0x211bc2(0x131)+_0x211bc2(0x289)+_0x211bc2(0xda)]&&(this[_0x211bc2(0x2cf)]()||this['isHidden']()))return-0x7*-0x5e+-0x15ef+0x135d;else{var _0x578958=Game_BattlerBase[_0x211bc2(0x131)+_0x211bc2(0x27c)+'GEN'];return _0x578958=this['bpRegenMul'+_0x211bc2(0xdb)](_0x578958),_0x578958=this['bpRegenAdd'+'ed'](_0x578958),_0x578958;}},Game_BattlerBase['prototype'][_0x4661ec(0x1be)+_0x4661ec(0x237)]=function(){const _0x2c64ba=_0x4661ec,_0x24b155=this[_0x2c64ba(0x1ef)+'ts'](),_0x323719=VisuMZ[_0x2c64ba(0x274)+'n']['RegExp'];return _0x24b155[_0x2c64ba(0xe1)](_0xb1c3da=>_0xb1c3da&&_0xb1c3da[_0x2c64ba(0x2bd)][_0x2c64ba(0x263)](_0x323719[_0x2c64ba(0x20a)+'d']));},VisuMZ['BoostActio'+'n']['Game_Battl'+_0x4661ec(0x108)+_0x4661ec(0x146)+_0x4661ec(0x1c3)]=Game_BattlerBase[_0x4661ec(0x2d3)]['resetState'+_0x4661ec(0x18f)],Game_BattlerBase['prototype'][_0x4661ec(0x2e3)+_0x4661ec(0x18f)]=function(_0x16df94){const _0x21b916=_0x4661ec,_0x5d7a59={'gxJfH':function(_0x34bc04,_0x3ed7ef){return _0x34bc04+_0x3ed7ef;},'GybGK':function(_0x5f8d50,_0x34bdfe){return _0x5f8d50*_0x34bdfe;},'BVWXr':function(_0x3b9e90,_0x209619){return _0x3b9e90+_0x209619;},'XyTKM':function(_0x1cb9a4,_0x8bf0ab){return _0x1cb9a4*_0x8bf0ab;},'SZEGx':function(_0x35023c,_0x8d599d){return _0x35023c-_0x8d599d;},'dRVYf':_0x21b916(0x1f1),'YEEkj':function(_0x472ddf,_0x111330){return _0x472ddf+_0x111330;},'gjRve':_0x21b916(0x1d6),'XEEkk':'add','swjVN':function(_0x338ffe,_0x46de9a){return _0x338ffe+_0x46de9a;},'iuIUc':function(_0x2ae87a,_0x12cd08){return _0x2ae87a+_0x12cd08;}};var _0x1c32d2=this[_0x21b916(0x253)+'s'][_0x16df94]||-0x1*-0x196+-0x192d+-0x29f*-0x9;VisuMZ[_0x21b916(0x274)+'n']['Game_Battl'+_0x21b916(0x108)+_0x21b916(0x146)+_0x21b916(0x1c3)][_0x21b916(0xb7)](this,_0x16df94);if(!!$gameTemp[_0x21b916(0xfc)+'e']){$gameTemp[_0x21b916(0x103)+'t']=$gameTemp[_0x21b916(0x103)+'t']||0x1727+0x9f5+-0x28c*0xd;var _0x15c50e=$dataStates[_0x16df94],_0x5d9508=_0x5d7a59[_0x21b916(0x2a8)](Math[_0x21b916(0x135)](_0x5d7a59['GybGK'](_0x15c50e[_0x21b916(0x11e)],$gameTemp[_0x21b916(0xfc)+'e'])),$gameTemp[_0x21b916(0x103)+'t']),_0x3471fc=_0x5d7a59[_0x21b916(0x1a4)](Math[_0x21b916(0x135)](_0x5d7a59[_0x21b916(0x211)](_0x15c50e[_0x21b916(0x1c6)],$gameTemp[_0x21b916(0xfc)+'e'])),$gameTemp[_0x21b916(0x103)+'t']),_0x11c47a=_0x5d7a59[_0x21b916(0x1a4)](0x1b64*-0x1+-0x1d5a+0x38bf,Math[_0x21b916(0x2a0)](_0x5d7a59['SZEGx'](_0x5d9508,_0x3471fc),0x1*0x312+0x2*-0x653+0x994));const _0x2b7075=this[_0x21b916(0x2ca)+_0x21b916(0x224)+'gs'](_0x15c50e)[_0x21b916(0x1aa)+'e']()[_0x21b916(0x218)]();switch(_0x2b7075){case _0x5d7a59[_0x21b916(0x31e)]:this[_0x21b916(0x253)+'s'][_0x16df94]=_0x5d7a59[_0x21b916(0x16b)](_0x3471fc,Math[_0x21b916(0x2b7)](_0x11c47a));break;case _0x5d7a59[_0x21b916(0xd8)]:const _0x31fd3f=this[_0x21b916(0x253)+'s'][_0x16df94],_0x431872=_0x5d7a59[_0x21b916(0x16b)](_0x3471fc,Math[_0x21b916(0x2b7)](_0x11c47a));this[_0x21b916(0x253)+'s'][_0x16df94]=Math[_0x21b916(0x2a0)](_0x31fd3f,_0x431872);break;case _0x5d7a59['XEEkk']:this[_0x21b916(0x253)+'s'][_0x16df94]=_0x5d7a59[_0x21b916(0xc0)](_0x5d7a59['iuIUc'](_0x3471fc,Math['randomInt'](_0x11c47a)),_0x1c32d2);break;}}},VisuMZ[_0x4661ec(0x274)+'n']['Game_Battl'+_0x4661ec(0x316)+_0x4661ec(0x259)+_0x4661ec(0x1f6)+'ns']=Game_BattlerBase[_0x4661ec(0x2d3)][_0x4661ec(0xb8)+_0x4661ec(0x1f2)+_0x4661ec(0xc6)],Game_BattlerBase['prototype']['meetsUsabl'+_0x4661ec(0x1f2)+_0x4661ec(0xc6)]=function(_0x18c82e){const _0x29c52c=_0x4661ec;return VisuMZ[_0x29c52c(0x274)+'n'][_0x29c52c(0x203)+'erBase_mee'+'tsUsableIt'+_0x29c52c(0x1f6)+'ns'][_0x29c52c(0xb7)](this,_0x18c82e)?this[_0x29c52c(0x1b9)+_0x29c52c(0x2ad)+'sRequireme'+'nt'](_0x18c82e):![];},Game_BattlerBase[_0x4661ec(0x2d3)][_0x4661ec(0x1b9)+_0x4661ec(0x2ad)+_0x4661ec(0x1ee)+'nt']=function(_0x4ea619){const _0x3dcbbf=_0x4661ec,_0x485a05={'YnfcI':function(_0xee0a5d,_0x1274a2){return _0xee0a5d(_0x1274a2);},'lQFxe':function(_0x26b52a,_0x15081){return _0x26b52a>=_0x15081;},'lvkUG':function(_0x55290d,_0x551dad){return _0x55290d>=_0x551dad;},'DsJaa':function(_0xafa0b2,_0x2d2e99){return _0xafa0b2(_0x2d2e99);},'hxcgM':function(_0x18d2da,_0x1317a5){return _0x18d2da>_0x1317a5;},'IUQhF':function(_0x3301f4,_0xc50e81){return _0x3301f4===_0xc50e81;},'GfynQ':function(_0x245427,_0x3d1cab){return _0x245427===_0x3d1cab;},'bmzZc':function(_0xd9d82d,_0x5b4451){return _0xd9d82d<_0x5b4451;},'peeuF':function(_0x504408,_0x2cf7b8){return _0x504408<_0x2cf7b8;},'KQVIa':function(_0x22493e,_0x40a28f){return _0x22493e(_0x40a28f);},'EMsEm':function(_0x98fd5b,_0x3d6b81){return _0x98fd5b<=_0x3d6b81;},'NwDjs':function(_0x273140,_0x4d2785){return _0x273140<=_0x4d2785;}},_0x1a938a=VisuMZ[_0x3dcbbf(0x274)+'n'][_0x3dcbbf(0x1b5)];var _0x6a9b0e=_0x4ea619[_0x3dcbbf(0x2bd)];if(_0x6a9b0e[_0x3dcbbf(0x263)](_0x1a938a[_0x3dcbbf(0x20c)][_0x3dcbbf(0x133)])||_0x6a9b0e[_0x3dcbbf(0x263)](_0x1a938a[_0x3dcbbf(0x20c)]['GreaterEqu'+'al'])){var _0x2234b0=_0x485a05[_0x3dcbbf(0x295)](parseInt,RegExp['$1']);return this[_0x3dcbbf(0xcf)]()?_0x485a05['lQFxe'](this[_0x3dcbbf(0x1f3)+_0x3dcbbf(0x29f)](),_0x2234b0):_0x485a05['lvkUG'](this['storedBoos'+_0x3dcbbf(0x205)](),_0x2234b0);}else{if(_0x4ea619[_0x3dcbbf(0x2bd)]['match'](_0x1a938a['Require'][_0x3dcbbf(0x2e0)+'al'])){var _0x2234b0=_0x485a05[_0x3dcbbf(0x1e1)](parseInt,RegExp['$1']);return this[_0x3dcbbf(0xcf)]()?_0x485a05[_0x3dcbbf(0x24d)](this[_0x3dcbbf(0x1f3)+_0x3dcbbf(0x29f)](),_0x2234b0):_0x485a05[_0x3dcbbf(0x24d)](this[_0x3dcbbf(0x2b0)+_0x3dcbbf(0x205)](),_0x2234b0);}else{if(_0x4ea619[_0x3dcbbf(0x2bd)][_0x3dcbbf(0x263)](_0x1a938a[_0x3dcbbf(0x20c)][_0x3dcbbf(0xd9)])){var _0x2234b0=_0x485a05[_0x3dcbbf(0x295)](parseInt,RegExp['$1']);return this[_0x3dcbbf(0xcf)]()?_0x485a05[_0x3dcbbf(0xa1)](this[_0x3dcbbf(0x1f3)+_0x3dcbbf(0x29f)](),_0x2234b0):_0x485a05[_0x3dcbbf(0x2d7)](this['storedBoos'+_0x3dcbbf(0x205)](),_0x2234b0);}else{if(_0x4ea619[_0x3dcbbf(0x2bd)][_0x3dcbbf(0x263)](_0x1a938a[_0x3dcbbf(0x20c)][_0x3dcbbf(0x1d0)])){var _0x2234b0=_0x485a05['DsJaa'](parseInt,RegExp['$1']);return this['isActor']()?_0x485a05['bmzZc'](this[_0x3dcbbf(0x1f3)+_0x3dcbbf(0x29f)](),_0x2234b0):_0x485a05[_0x3dcbbf(0x23b)](this[_0x3dcbbf(0x2b0)+_0x3dcbbf(0x205)](),_0x2234b0);}else{if(_0x4ea619[_0x3dcbbf(0x2bd)]['match'](_0x1a938a[_0x3dcbbf(0x20c)][_0x3dcbbf(0x28b)])){var _0x2234b0=_0x485a05[_0x3dcbbf(0x225)](parseInt,RegExp['$1']);return this[_0x3dcbbf(0xcf)]()?_0x485a05[_0x3dcbbf(0xba)](this[_0x3dcbbf(0x1f3)+_0x3dcbbf(0x29f)](),_0x2234b0):_0x485a05[_0x3dcbbf(0x1f9)](this[_0x3dcbbf(0x2b0)+'tPoints'](),_0x2234b0);}else return!![];}}}}},Game_Battler[_0x4661ec(0x131)+'TS_MULTIPL'+_0x4661ec(0x1e6)]={'Damage':VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0xc2)][_0x4661ec(0x1e7)][_0x4661ec(0x12c)+'y'],'Turn':VisuMZ['BoostActio'+'n'][_0x4661ec(0xc2)][_0x4661ec(0x1e7)][_0x4661ec(0x102)+'ly'],'Repeat':VisuMZ[_0x4661ec(0x274)+'n']['Settings'][_0x4661ec(0x1e7)][_0x4661ec(0x2b2)+_0x4661ec(0xd7)],'BpEffect':VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0xc2)][_0x4661ec(0x1e7)][_0x4661ec(0x1af)+_0x4661ec(0xd7)],'Analyze':VisuMZ['BoostActio'+'n']['Settings'][_0x4661ec(0x1e7)][_0x4661ec(0x2b1)+_0x4661ec(0xd4)]},Game_Battler['BOOST_POIN'+_0x4661ec(0x229)+'N']={'Damage':VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0xc2)][_0x4661ec(0x1e7)]['DmgAdditio'+'n'],'Turn':VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0xc2)]['Mechanics']['TurnAdditi'+'on'],'Repeat':VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0xc2)][_0x4661ec(0x1e7)][_0x4661ec(0x262)+'tion'],'BpEffect':VisuMZ['BoostActio'+'n'][_0x4661ec(0xc2)][_0x4661ec(0x1e7)][_0x4661ec(0x283)+'tion'],'Analyze':VisuMZ[_0x4661ec(0x274)+'n']['Settings']['Mechanics'][_0x4661ec(0x230)+_0x4661ec(0xec)]},Game_Battler['BOOST_POIN'+_0x4661ec(0x308)+_0x4661ec(0x251)]=VisuMZ['BoostActio'+'n']['Settings'][_0x4661ec(0x1e7)]['Animations'],Game_Battler['prototype']['gainStored'+_0x4661ec(0x2ad)+'s']=function(_0x5986c9){const _0x4c079d=_0x4661ec,_0x3ead0f={'PulDi':function(_0x175dbc,_0x52e341){return _0x175dbc+_0x52e341;}};this[_0x4c079d(0x9f)+'oostPoints'](_0x3ead0f[_0x4c079d(0x1f0)](this[_0x4c079d(0x2b0)+_0x4c079d(0x205)](),_0x5986c9));},Game_Battler[_0x4661ec(0x2d3)][_0x4661ec(0xe7)+_0x4661ec(0x22b)]=function(_0x382dd7){const _0x2bd788=_0x4661ec,_0x55ab22={'gTrsn':function(_0x5b02a8,_0x48ed4f){return _0x5b02a8+_0x48ed4f;}};this[_0x2bd788(0x139)+'ostPoints'](_0x55ab22[_0x2bd788(0x118)](this[_0x2bd788(0x1f3)+_0x2bd788(0x29f)](),_0x382dd7));},Game_Battler[_0x4661ec(0x2d3)][_0x4661ec(0x1d8)+'plier']=function(_0x1d4103){const _0x36591c=_0x4661ec,_0x9e6ff1=Game_Battler[_0x36591c(0x131)+_0x36591c(0x1e0)+'IERS'];if(_0x1d4103[_0x36591c(0x263)](/Damage/i))var _0x54548c=_0x9e6ff1['Damage'];else{if(_0x1d4103[_0x36591c(0x263)](/Turn/i))var _0x54548c=_0x9e6ff1[_0x36591c(0x107)];else{if(_0x1d4103[_0x36591c(0x263)](/Repeat/i))var _0x54548c=_0x9e6ff1['Repeat'];else{if(_0x1d4103[_0x36591c(0x263)](/BP Effect/i))var _0x54548c=_0x9e6ff1[_0x36591c(0x2cc)];else{if(_0x1d4103[_0x36591c(0x263)](/Analyze/i))var _0x54548c=_0x9e6ff1[_0x36591c(0x2b6)];else return this[_0x36591c(0x1f3)+_0x36591c(0x29f)]();}}}}var _0xaaee35=this['toUseBoost'+_0x36591c(0x29f)]();return _0x54548c[_0xaaee35]||_0x54548c[-0x3cd*0x7+-0x17b6+-0x3251*-0x1];},Game_Battler[_0x4661ec(0x2d3)][_0x4661ec(0x2ce)+_0x4661ec(0xa7)]=function(_0x5a28da){const _0x526225=_0x4661ec,_0x474274={'qpgjD':function(_0x3a4f76,_0x159c85){return _0x3a4f76(_0x159c85);}},_0x3ced37=Game_Battler[_0x526225(0x131)+_0x526225(0x229)+'N'];if(_0x5a28da[_0x526225(0x263)](/Damage/i))var _0x5baf83=_0x3ced37[_0x526225(0x24e)];else{if(_0x5a28da[_0x526225(0x263)](/Turn/i))var _0x5baf83=_0x3ced37[_0x526225(0x107)];else{if(_0x5a28da[_0x526225(0x263)](/Repeat/i))var _0x5baf83=_0x3ced37[_0x526225(0xde)];else{if(_0x5a28da[_0x526225(0x263)](/BP Effect/i))var _0x5baf83=_0x3ced37['BpEffect'];else{if(_0x5a28da[_0x526225(0x263)](/Analyze/i))var _0x5baf83=_0x3ced37[_0x526225(0x2b6)];else return this[_0x526225(0x1f3)+_0x526225(0x29f)]();}}}}var _0x6743f5=this[_0x526225(0x1f3)+_0x526225(0x29f)]();return _0x474274[_0x526225(0x2cb)](parseInt,_0x5baf83[_0x6743f5]||_0x5baf83[0x1d3*0x6+-0x2*-0x878+-0x1be2]);},Game_Battler['prototype'][_0x4661ec(0x1c5)+'eBoostPoin'+'ts']=function(){const _0x18c430=_0x4661ec,_0x52d0e6={'Kjjiy':_0x18c430(0x1b0)+'0'},_0x48d9d3=_0x52d0e6[_0x18c430(0x2f0)]['split']('|');let _0x1bb17e=0x5c9+0x2cd*0xa+-0x21cb;while(!![]){switch(_0x48d9d3[_0x1bb17e++]){case'0':this[_0x18c430(0x9f)+_0x18c430(0x22b)](_0x434616);continue;case'1':_0x434616=this[_0x18c430(0x1c5)+_0x18c430(0x183)+_0x18c430(0x206)+'er'](_0x434616);continue;case'2':_0x434616=Math[_0x18c430(0x135)](_0x434616);continue;case'3':var _0x434616=Game_BattlerBase[_0x18c430(0x131)+_0x18c430(0x1a8)+_0x18c430(0x2b3)];continue;case'4':if(this[_0x18c430(0x202)+_0x18c430(0x12d)+_0x18c430(0x274)+'ns']){this['_previousB'+_0x18c430(0x12d)+'BoostActio'+'ns']=undefined;return;}continue;case'5':_0x434616=this[_0x18c430(0x1c5)+_0x18c430(0x183)+_0x18c430(0x12e)](_0x434616);continue;}break;}},Game_Battler['prototype'][_0x4661ec(0x1c5)+_0x4661ec(0x183)+'tsMultipli'+'er']=function(_0x3f6f5f){const _0x35f69=_0x4661ec,_0x499cd9={'LvbFm':function(_0x24007a,_0x3c8fb2){return _0x24007a*_0x3c8fb2;},'txmsv':function(_0x56f164,_0x2edd2c){return _0x56f164(_0x2edd2c);}},_0x4153c8=this[_0x35f69(0x1ef)+'ts'](),_0x250c81=VisuMZ[_0x35f69(0x274)+'n'][_0x35f69(0x1b5)];for(const _0x300106 of _0x4153c8){if(!_0x300106)continue;_0x300106[_0x35f69(0x2bd)][_0x35f69(0x263)](_0x250c81[_0x35f69(0x2f2)+_0x35f69(0x138)])&&(_0x3f6f5f*=_0x499cd9[_0x35f69(0x179)](_0x499cd9[_0x35f69(0x145)](Number,RegExp['$1']),0x925*-0x3+-0x5*-0x585+-0x2a+0.01));}return _0x3f6f5f;},Game_Battler[_0x4661ec(0x2d3)][_0x4661ec(0x1c5)+'eBoostPoin'+'tsAdded']=function(_0x5a4361){const _0x276a1b=_0x4661ec,_0x1147ef={'HUIHS':function(_0x213f63,_0x16246c){return _0x213f63(_0x16246c);}},_0x329fbc=this[_0x276a1b(0x1ef)+'ts'](),_0x37e049=VisuMZ[_0x276a1b(0x274)+'n']['RegExp'];for(const _0x1c469c of _0x329fbc){if(!_0x1c469c)continue;_0x1c469c['note'][_0x276a1b(0x263)](_0x37e049[_0x276a1b(0x2f2)+_0x276a1b(0x124)])&&(_0x5a4361+=_0x1147ef[_0x276a1b(0x2d1)](Number,RegExp['$1']));}return _0x5a4361;},Game_Battler['prototype'][_0x4661ec(0x1bc)+_0x4661ec(0x183)+'tsAnimatio'+'n']=function(){const _0x240a30=_0x4661ec,_0x5a345b={'vSYhe':function(_0x34c5a4,_0x51e26a){return _0x34c5a4(_0x51e26a);},'VlgCp':function(_0x2deb26,_0x1a0d29){return _0x2deb26>_0x1a0d29;}};var _0x2ad29b=this[_0x240a30(0x1f3)+_0x240a30(0x29f)]()['clamp'](0x5a1*0x4+0x2167+-0x37eb,Game_BattlerBase[_0x240a30(0x131)+_0x240a30(0x164)+'SE']);const _0x319b60=Game_Battler[_0x240a30(0x131)+'TS_ANIMATI'+'ONS'];var _0x1a8940=_0x5a345b[_0x240a30(0x2d6)](Number,_0x319b60[_0x2ad29b]||_0x319b60[0x2*-0x6dc+-0x112*0x8+-0x17*-0xf8]);_0x5a345b[_0x240a30(0xd2)](_0x1a8940,-0x23a4+-0x60b+-0x1*-0x29af)&&$gameTemp[_0x240a30(0x278)+'xAnimation']([this],_0x1a8940,![],![]);},Game_Battler['prototype']['canUseBoos'+_0x4661ec(0x205)]=function(){const _0x2fd2f5=_0x4661ec,_0x6ae5c3={'tNfMm':function(_0x592d63,_0xfb0a8e){return _0x592d63<_0xfb0a8e;},'UWeMr':function(_0x45514a,_0x23f767){return _0x45514a>_0x23f767;}};if(this[_0x2fd2f5(0x1be)+_0x2fd2f5(0x237)]())return![];return _0x6ae5c3[_0x2fd2f5(0x2f8)](this[_0x2fd2f5(0x1f3)+'Points'](),Game_BattlerBase[_0x2fd2f5(0x131)+_0x2fd2f5(0x164)+'SE'])&&_0x6ae5c3[_0x2fd2f5(0x2c1)](this[_0x2fd2f5(0x2b0)+_0x2fd2f5(0x205)](),0x2067+-0xaaa+-0x15bd);},Game_Battler[_0x4661ec(0x2d3)][_0x4661ec(0x2b8)+'stPoints']=function(){const _0x1b62fb=_0x4661ec,_0x4f9cfd={'EbSrC':function(_0x5c7f2c,_0x123ecb){return _0x5c7f2c>_0x123ecb;}};return _0x4f9cfd[_0x1b62fb(0x158)](this['toUseBoost'+_0x1b62fb(0x29f)](),-0x2149+0x1*-0x1c66+-0x1*-0x3daf);},VisuMZ['BoostActio'+'n'][_0x4661ec(0x203)+_0x4661ec(0x22a)+'attleState'+'s']=Game_Battler[_0x4661ec(0x2d3)]['removeBatt'+'leStates'],Game_Battler[_0x4661ec(0x2d3)]['removeBatt'+_0x4661ec(0xb0)]=function(){const _0x2cfd63=_0x4661ec;VisuMZ[_0x2cfd63(0x274)+'n'][_0x2cfd63(0x203)+_0x2cfd63(0x22a)+'attleState'+'s'][_0x2cfd63(0xb7)](this),this['_storedBoo'+'stPoints']=0x1f*0x4a+0x19*0x10b+-0x2309,this['_toUseBoos'+_0x2cfd63(0x205)]=0x1*0xa3b+0x918+0x1353*-0x1;},VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0x203)+_0x4661ec(0x29c)+'ateTp']=Game_Battler['prototype'][_0x4661ec(0xbe)+'Tp'],Game_Battler[_0x4661ec(0x2d3)][_0x4661ec(0xbe)+'Tp']=function(){const _0x4ff199=_0x4661ec;VisuMZ[_0x4ff199(0x274)+'n'][_0x4ff199(0x203)+_0x4ff199(0x29c)+_0x4ff199(0x26d)][_0x4ff199(0xb7)](this),this[_0x4ff199(0xbe)+_0x4ff199(0x2ad)+'s']();},VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0x203)+_0x4661ec(0x29c)+_0x4661ec(0xe6)]=Game_Battler[_0x4661ec(0x2d3)][_0x4661ec(0xbe)+_0x4661ec(0x215)],Game_Battler[_0x4661ec(0x2d3)][_0x4661ec(0xbe)+_0x4661ec(0x215)]=function(){const _0xc54817=_0x4661ec;VisuMZ[_0xc54817(0x274)+'n'][_0xc54817(0x203)+'er_regener'+'ateAll'][_0xc54817(0xb7)](this),Game_BattlerBase[_0xc54817(0x131)+'TS_DEATH_R'+_0xc54817(0xda)]&&this[_0xc54817(0x2cf)]()&&$gameParty[_0xc54817(0x13d)]()&&this['regenerate'+'BoostPoint'+'s']();},Game_Battler[_0x4661ec(0x2d3)][_0x4661ec(0xbe)+_0x4661ec(0x2ad)+'s']=function(){const _0x5e4747=_0x4661ec,_0x30fd50={'ociHR':function(_0xd03832,_0x5151a3){return _0xd03832<=_0x5151a3;}};(Game_BattlerBase[_0x5e4747(0x131)+'TS_REGEN_A'+'LWAYS']||_0x30fd50[_0x5e4747(0x162)](this['_turnUsedB'+_0x5e4747(0x22b)],0xc8+-0x1822+0x175a))&&this['gainStored'+_0x5e4747(0x2ad)+'s'](this[_0x5e4747(0x129)+_0x5e4747(0xee)+'e']()),this['_turnUsedB'+_0x5e4747(0x22b)]=0x1c75+0x38*-0xaa+-0x1bf*-0x5;},VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0x16c)+'ger_endAct'+_0x4661ec(0xa7)]=BattleManager['endAction'],BattleManager[_0x4661ec(0x17e)]=function(){const _0x987942=_0x4661ec;this['_subject']&&this['_subject']['endActionB'+_0x987942(0x22b)](),VisuMZ['BoostActio'+'n'][_0x987942(0x16c)+_0x987942(0x1fd)+_0x987942(0xa7)][_0x987942(0xb7)](this);},Game_Battler[_0x4661ec(0x2d3)][_0x4661ec(0x119)+_0x4661ec(0x22b)]=function(){const _0x509833=_0x4661ec;if(Imported[_0x509833(0x275)+_0x509833(0x25a)+'Skills']&&$gameTemp[_0x509833(0xa9)+'hainSkillS'+_0x509833(0x254)]())return;this['_turnUsedB'+_0x509833(0x22b)]+=this['toUseBoost'+_0x509833(0x29f)](),this[_0x509833(0x139)+_0x509833(0x1de)](0x1c53+0x1067+0x1*-0x2cba);},Game_Battler[_0x4661ec(0x2d3)][_0x4661ec(0x1b4)+_0x4661ec(0xdb)]=function(_0x53ac0e){const _0x43498d=_0x4661ec,_0x151c96={'YxNBH':function(_0x3b52ef,_0x13dc51){return _0x3b52ef*_0x13dc51;},'dVCuV':function(_0x57f494,_0x257dc2){return _0x57f494(_0x257dc2);}},_0xe29204=this['traitObjec'+'ts'](),_0x3f2b62=VisuMZ[_0x43498d(0x274)+'n'][_0x43498d(0x1b5)];for(const _0x2fffd8 of _0xe29204){if(!_0x2fffd8)continue;_0x2fffd8[_0x43498d(0x2bd)][_0x43498d(0x263)](_0x3f2b62['BoostPoint'+_0x43498d(0x299)])&&(_0x53ac0e*=_0x151c96[_0x43498d(0x1c8)](_0x151c96[_0x43498d(0x16f)](Number,RegExp['$1']),-0x1d*0x3a+-0x1*0x5ab+0xc3d+0.01));}return _0x53ac0e;},Game_Battler[_0x4661ec(0x2d3)][_0x4661ec(0x216)+'ed']=function(_0x18ab8e){const _0x16bb48=_0x4661ec,_0x438750={'lYqIK':function(_0xdff3c4,_0x13aa4c){return _0xdff3c4(_0x13aa4c);}},_0x1f5764=this['traitObjec'+'ts'](),_0x4c79f9=VisuMZ[_0x16bb48(0x274)+'n'][_0x16bb48(0x1b5)];for(const _0x3d160e of _0x1f5764){if(!_0x3d160e)continue;_0x3d160e['note'][_0x16bb48(0x263)](_0x4c79f9[_0x16bb48(0x2ad)+_0x16bb48(0x257)])&&(_0x18ab8e+=_0x438750[_0x16bb48(0xad)](Number,RegExp['$1']));}return _0x18ab8e;},VisuMZ[_0x4661ec(0x274)+'n']['Game_Battl'+_0x4661ec(0xe5)+'e']=Game_Battler[_0x4661ec(0x2d3)][_0x4661ec(0x1c9)],Game_Battler[_0x4661ec(0x2d3)][_0x4661ec(0x1c9)]=function(_0x1eac44){const _0x1c88ec=_0x4661ec;var _0x39b574=this['isDead']();VisuMZ[_0x1c88ec(0x274)+'n'][_0x1c88ec(0x203)+_0x1c88ec(0xe5)+'e']['call'](this,_0x1eac44),Game_BattlerBase[_0x1c88ec(0x131)+'TS_DEATH_R'+'EMOVE']&&!_0x39b574&&this[_0x1c88ec(0x2cf)]()&&this[_0x1c88ec(0x9f)+'oostPoints'](-0x1*-0x67+-0xe5f+0x8*0x1bf);},VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0x203)+_0x4661ec(0x2c2)]=Game_Battler[_0x4661ec(0x2d3)]['addBuff'],Game_Battler[_0x4661ec(0x2d3)][_0x4661ec(0x196)]=function(_0x59358d,_0x235d4d){const _0x44d76f=_0x4661ec,_0x2c543b={'kEfCB':function(_0x123f5b,_0x27f1bc){return _0x123f5b+_0x27f1bc;},'jAEwx':function(_0xb7e201,_0x2ec7d2){return _0xb7e201*_0x2ec7d2;}};!!$gameTemp[_0x44d76f(0xfc)+'e']&&($gameTemp[_0x44d76f(0x103)+'t']=$gameTemp[_0x44d76f(0x103)+'t']||-0x3cd+-0x4*0x7ae+0x2285,_0x235d4d=_0x2c543b[_0x44d76f(0x18b)](Math[_0x44d76f(0x135)](_0x2c543b[_0x44d76f(0x136)]($gameTemp['_bpTurnRat'+'e'],_0x235d4d)),$gameTemp['_bpTurnFla'+'t'])),VisuMZ[_0x44d76f(0x274)+'n'][_0x44d76f(0x203)+'er_addBuff']['call'](this,_0x59358d,_0x235d4d);},VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0x203)+_0x4661ec(0x2da)+'ff']=Game_Battler[_0x4661ec(0x2d3)][_0x4661ec(0x2ae)],Game_Battler['prototype'][_0x4661ec(0x2ae)]=function(_0x57291f,_0x595664){const _0x614702=_0x4661ec,_0x4fcad6={'JmBzu':function(_0x5a4e66,_0x53e06a){return _0x5a4e66+_0x53e06a;},'Fqwig':function(_0x2d1476,_0x318c34){return _0x2d1476*_0x318c34;}};!!$gameTemp[_0x614702(0xfc)+'e']&&($gameTemp['_bpTurnFla'+'t']=$gameTemp[_0x614702(0x103)+'t']||0x1b5b+-0x20f*0x5+-0x150*0xd,_0x595664=_0x4fcad6[_0x614702(0x1c0)](Math[_0x614702(0x135)](_0x4fcad6[_0x614702(0x207)]($gameTemp[_0x614702(0xfc)+'e'],_0x595664)),$gameTemp['_bpTurnFla'+'t'])),VisuMZ[_0x614702(0x274)+'n'][_0x614702(0x203)+'er_addDebu'+'ff'][_0x614702(0xb7)](this,_0x57291f,_0x595664);},Game_Enemy['BOOST_POIN'+_0x4661ec(0x308)+_0x4661ec(0x201)]=VisuMZ['BoostActio'+'n']['Settings'][_0x4661ec(0x1e7)][_0x4661ec(0x219)+'elay'],VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0x247)+_0x4661ec(0x114)]=Game_Enemy[_0x4661ec(0x2d3)][_0x4661ec(0xbc)],Game_Enemy[_0x4661ec(0x2d3)]['setup']=function(_0x3f4784,_0x592e63,_0x5a9a4b){const _0x431a38=_0x4661ec;VisuMZ['BoostActio'+'n'][_0x431a38(0x247)+_0x431a38(0x114)]['call'](this,_0x3f4784,_0x592e63,_0x5a9a4b),this[_0x431a38(0x27d)+'AI']();},Game_Enemy[_0x4661ec(0x2d3)][_0x4661ec(0x27d)+'AI']=function(){const _0x4933fc=_0x4661ec,_0x4d3c7b={'mAvCW':function(_0x142557,_0x4cf618){return _0x142557===_0x4cf618;},'RwCJU':function(_0x48b901,_0x338276){return _0x48b901<_0x338276;},'sHhUZ':function(_0x362fea,_0xa9aaf6){return _0x362fea+_0xa9aaf6;},'NWKDK':'Skill\x20','SBbei':function(_0x59d87e,_0x7c55a3){return _0x59d87e(_0x7c55a3);},'zLygK':function(_0x236193,_0x18cc5f){return _0x236193(_0x18cc5f);}},_0x320162=VisuMZ[_0x4933fc(0x274)+'n'][_0x4933fc(0x1b5)];if(_0x4d3c7b['mAvCW'](this[_0x4933fc(0xca)]()['_boostAI'],undefined)){this['enemy']()[_0x4933fc(0x197)]={};var _0xb1581c=this[_0x4933fc(0xca)]()[_0x4933fc(0x2bd)][_0x4933fc(0x2c0)](/[\r\n]+/);for(var _0x55682b=0x1*0x1c73+0x24ef+-0x20b1*0x2;_0x4d3c7b[_0x4933fc(0x2bb)](_0x55682b,_0xb1581c[_0x4933fc(0x151)]);_0x55682b++){var _0x35f243=_0xb1581c[_0x55682b];if(_0x35f243['match'](_0x320162[_0x4933fc(0x16a)+_0x4933fc(0x2a5)])){var _0x37a8fd=_0x4d3c7b[_0x4933fc(0x14e)](_0x4d3c7b['NWKDK'],_0x4d3c7b['SBbei'](parseInt,RegExp['$1'])),_0x2bc5e8=_0x4d3c7b[_0x4933fc(0x163)](String,RegExp['$2'])[_0x4933fc(0x1aa)+'e']();this[_0x4933fc(0xca)]()[_0x4933fc(0x197)][_0x37a8fd]=_0x2bc5e8;}else{if(_0x35f243[_0x4933fc(0x263)](_0x320162[_0x4933fc(0x16a)+_0x4933fc(0xe0)])){var _0xf4b07c=_0x4d3c7b[_0x4933fc(0x1d1)](String,RegExp['$1']),_0x2bc5e8=_0x4d3c7b['zLygK'](String,RegExp['$2'])[_0x4933fc(0x1aa)+'e']();this['enemy']()[_0x4933fc(0x197)][_0xf4b07c]=_0x2bc5e8;}}}}},Game_Enemy[_0x4661ec(0x2d3)][_0x4661ec(0x14f)+'seBoostPoi'+_0x4661ec(0x1c3)]=function(_0x124e16){const _0x583038=_0x4661ec,_0x1f2c79={'xGisg':function(_0x444167,_0xd24a8a){return _0x444167>_0xd24a8a;}};this['setupBoost'+'AI']();var _0x392021=this[_0x583038(0xb1)+_0x583038(0x116)](_0x124e16);_0x1f2c79[_0x583038(0x20f)](_0x392021,-0x465+0x1*-0xfd+0x562)&&(this[_0x583038(0x277)+_0x583038(0x2b9)](_0x392021),this[_0x583038(0x1bc)+_0x583038(0x183)+_0x583038(0x1a3)+'n']());},Game_Enemy[_0x4661ec(0x2d3)][_0x4661ec(0xb1)+_0x4661ec(0x116)]=function(_0x11ed98){const _0x3de927=_0x4661ec,_0x487c97={'saKNm':_0x3de927(0x20b)+'4','iVfrk':function(_0x33aea9,_0x35b250){return _0x33aea9(_0x35b250);},'cwSbr':function(_0x533289,_0x1e8d3f){return _0x533289>=_0x1e8d3f;},'UGkVr':function(_0x2f3904,_0x21e7ec){return _0x2f3904<=_0x21e7ec;},'mtnjP':function(_0x41bb1f,_0x393d5b){return _0x41bb1f===_0x393d5b;},'KSCVk':function(_0x22d7ac,_0xfab0e4){return _0x22d7ac+_0xfab0e4;},'OpZhl':_0x3de927(0x2d5)},_0x2a21a6=_0x487c97[_0x3de927(0x17d)][_0x3de927(0x2c0)]('|');let _0xf6c642=0x3d*0x7+-0xf99+-0x6f7*-0x2;while(!![]){switch(_0x2a21a6[_0xf6c642++]){case'0':if(this['enemy']()[_0x3de927(0x197)][_0x36a3ec]||this[_0x3de927(0xca)]()[_0x3de927(0x197)][_0x3d136e]){var _0x23be1f=this[_0x3de927(0xca)]()[_0x3de927(0x197)][_0x36a3ec]||this[_0x3de927(0xca)]()[_0x3de927(0x197)][_0x3d136e];if(_0x23be1f[_0x3de927(0x263)](/(?:ALL|FULL)/i))_0x482d52=this[_0x3de927(0x2b0)+'tPoints']();else{if(_0x23be1f[_0x3de927(0x263)](/AT LEAST (\d+)/i)){var _0x55657b=_0x487c97[_0x3de927(0x2d0)](parseInt,RegExp['$1']);_0x487c97['cwSbr'](this[_0x3de927(0x2b0)+_0x3de927(0x205)](),_0x55657b)&&(_0x482d52=this[_0x3de927(0x2b0)+'tPoints']());}else{if(_0x23be1f['match'](/AT MOST (\d+)/i)){var _0x55657b=_0x487c97[_0x3de927(0x2d0)](parseInt,RegExp['$1']);_0x487c97[_0x3de927(0xdc)](this[_0x3de927(0x2b0)+'tPoints'](),_0x55657b)&&(_0x482d52=this[_0x3de927(0x2b0)+'tPoints']());}else{if(_0x23be1f[_0x3de927(0x263)](/EXACTLY (\d+)/i)){var _0x55657b=_0x487c97[_0x3de927(0x2d0)](parseInt,RegExp['$1']);_0x487c97[_0x3de927(0x15c)](this[_0x3de927(0x2b0)+_0x3de927(0x205)](),_0x55657b)&&(_0x482d52=_0x55657b);}}}}}continue;case'1':var _0x482d52=0xbac+-0x1c21+0x1075;continue;case'2':var _0x3d136e=_0x487c97[_0x3de927(0x156)](_0x487c97[_0x3de927(0x28a)],_0x11ed98['id']);continue;case'3':var _0x36a3ec=_0x11ed98[_0x3de927(0x1d2)];continue;case'4':return _0x482d52['clamp'](-0x132c+-0x4*-0x6aa+-0x77c,Game_BattlerBase['BOOST_POIN'+_0x3de927(0x164)+'SE']);case'5':if(_0x487c97[_0x3de927(0xdc)](this[_0x3de927(0x2b0)+'tPoints'](),-0x21b1+-0x2*-0xf1b+0x37b))return-0x1*-0x1196+-0x7f*0x1f+-0x235;continue;}break;}},Game_Enemy[_0x4661ec(0x2d3)][_0x4661ec(0x277)+'myBPUsage']=function(_0x580491){const _0x38f217=_0x4661ec;_0x580491=_0x580491[_0x38f217(0x271)](0x2b*0x26+-0x541+0x121*-0x1,this[_0x38f217(0x2b0)+'tPoints']()),_0x580491=_0x580491['clamp'](-0x113d+0x1*0x20+0x111d*0x1,Game_BattlerBase[_0x38f217(0x131)+_0x38f217(0x164)+'SE']),this[_0x38f217(0x123)+_0x38f217(0x2ad)+'s'](-_0x580491),this['gainToUseB'+'oostPoints'](_0x580491);},Game_Enemy[_0x4661ec(0x2d3)][_0x4661ec(0x1bc)+_0x4661ec(0x183)+'tsAnimatio'+'n']=function(){const _0x832c79=_0x4661ec,_0x341881={'uzVUt':function(_0x2a40bb,_0x222418){return _0x2a40bb/_0x222418;},'SkLdY':function(_0x16d9b0,_0x4024cc){return _0x16d9b0<=_0x4024cc;},'yclEp':function(_0x25e2a7,_0x18d2c9){return _0x25e2a7>_0x18d2c9;},'utUTP':function(_0x3bbda7,_0x43113b){return _0x3bbda7*_0x43113b;},'jrYXI':function(_0x20c5e0,_0x5dcd7b){return _0x20c5e0-_0x5dcd7b;},'SMgMI':function(_0x50a8ea,_0x5e0db4,_0xb52385){return _0x50a8ea(_0x5e0db4,_0xb52385);},'wEIqG':function(_0x530ad5,_0x455459){return _0x530ad5/_0x455459;}};var _0x5a365b=0x47f*-0x8+0x1*-0xab5+0x2ead,_0x40d9c4=this[_0x832c79(0x1f3)+'Points']()[_0x832c79(0x271)](0x1f66+0x1*0x2010+0x2*-0x1fbb,Game_BattlerBase[_0x832c79(0x131)+_0x832c79(0x164)+'SE']);const _0x488188=Game_Battler[_0x832c79(0x131)+'TS_ANIMATI'+'ONS'],_0x378f90=Game_Enemy[_0x832c79(0x131)+_0x832c79(0x308)+'ON_DELAY'],_0x1bb10f=_0x341881['uzVUt'](0x22*0xbb+0x1ded+-0x32db*0x1,0xa*-0x5c+0x1*-0x20aa+0x247e);for(var _0x3a390f=-0x43f*-0x8+-0xe27*-0x1+0x180f*-0x2;_0x341881[_0x832c79(0x2ac)](_0x3a390f,_0x40d9c4);_0x3a390f++){var _0x10f3f1=_0x488188[_0x3a390f]||_0x488188[0xa0a+0x2*0x5b5+-0x1574];if(_0x341881[_0x832c79(0x21f)](_0x10f3f1,0x2*0x10d5+0x2606+0x10*-0x47b)){let _0x4757fb=_0x341881[_0x832c79(0x19b)](_0x378f90,_0x341881[_0x832c79(0x213)](_0x3a390f,-0x19e4+-0x2519*0x1+0x3efe));_0x341881[_0x832c79(0x176)](setTimeout,$gameTemp['requestFau'+_0x832c79(0x1cd)][_0x832c79(0x1e4)]($gameTemp,[this],_0x10f3f1,![],![]),_0x4757fb);}_0x5a365b+=_0x341881[_0x832c79(0x1fb)](_0x378f90,_0x1bb10f);}_0x5a365b=Math[_0x832c79(0x311)](_0x5a365b),SceneManager[_0x832c79(0x2c6)][_0x832c79(0x11d)][_0x832c79(0x2fe)]=_0x5a365b;},Game_Unit[_0x4661ec(0x2d3)]['setupBattl'+'eBoostPoin'+'ts']=function(){const _0x2a199d=_0x4661ec;var _0x26c8f8=this[_0x2a199d(0x31b)];this[_0x2a199d(0x31b)]=![];for(const _0x3fdf16 of this[_0x2a199d(0x168)]()){if(!_0x3fdf16)continue;_0x3fdf16['setupBattl'+_0x2a199d(0x183)+'ts']();}this[_0x2a199d(0x31b)]=_0x26c8f8;},VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0x2ee)+_0x4661ec(0x312)]=Game_Party[_0x4661ec(0x2d3)][_0x4661ec(0x1ca)],Game_Party['prototype'][_0x4661ec(0x1ca)]=function(_0xa19185){const _0x4c102c=_0x4661ec,_0x416368={'ZHSRh':function(_0x4dc43f,_0x46c674,_0x146b12){return _0x4dc43f(_0x46c674,_0x146b12);}};VisuMZ['BoostActio'+'n'][_0x4c102c(0x2ee)+_0x4c102c(0x312)][_0x4c102c(0xb7)](this,_0xa19185),_0x416368[_0x4c102c(0x294)](setTimeout,VisuMZ['BoostActio'+'n'][_0x4c102c(0x101)+_0x4c102c(0x2ba)+_0x4c102c(0x270)][_0x4c102c(0x1e4)](this),-0xd65+-0x26f2+0x1183*0x3);},VisuMZ['BoostActio'+'n']['Game_Party'+_0x4661ec(0x13a)+'or']=Game_Party['prototype'][_0x4661ec(0x18d)+'r'],Game_Party[_0x4661ec(0x2d3)]['removeActo'+'r']=function(_0x5454e4){const _0x4ff748=_0x4661ec,_0x2725e3={'IkNso':function(_0x9d304,_0x142869,_0x45045e){return _0x9d304(_0x142869,_0x45045e);}};VisuMZ[_0x4ff748(0x274)+'n'][_0x4ff748(0x2ee)+_0x4ff748(0x13a)+'or']['call'](this,_0x5454e4),_0x2725e3[_0x4ff748(0x21b)](setTimeout,VisuMZ[_0x4ff748(0x274)+'n'][_0x4ff748(0x101)+_0x4ff748(0x2ba)+_0x4ff748(0x270)][_0x4ff748(0x1e4)](this),0x23e+0x354+-0x2*0x2b0);},VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0x2ee)+'_partyChan'+_0x4661ec(0x17a)]=Game_Party[_0x4661ec(0x2d3)]['partyChang'+_0x4661ec(0x2d4)],Game_Party[_0x4661ec(0x2d3)][_0x4661ec(0x10e)+'eRefresh']=function(){const _0x22ec85=_0x4661ec,_0x226b3c={'vhzaP':function(_0x41fc9c,_0x3646e0,_0xd81f98){return _0x41fc9c(_0x3646e0,_0xd81f98);}};VisuMZ[_0x22ec85(0x274)+'n']['Game_Party'+_0x22ec85(0x301)+_0x22ec85(0x17a)][_0x22ec85(0xb7)](this),_0x226b3c[_0x22ec85(0x166)](setTimeout,VisuMZ[_0x22ec85(0x274)+'n'][_0x22ec85(0x101)+_0x22ec85(0x2ba)+_0x22ec85(0x270)][_0x22ec85(0x1e4)](this),0x5*-0x772+-0x1*0x17c9+0x3d35);},VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0x101)+_0x4661ec(0x2ba)+_0x4661ec(0x270)]=function(){const _0xa034c=_0x4661ec;if(!SceneManager['isSceneBat'+_0xa034c(0x1ea)]())return;const _0x2f9c83=SceneManager[_0xa034c(0x2c6)][_0xa034c(0x147)+'w'];if(!_0x2f9c83)return;_0x2f9c83[_0xa034c(0x266)+_0xa034c(0x187)](BattleManager[_0xa034c(0x288)]()),_0x2f9c83[_0xa034c(0x19e)]();},VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0x180)+_0x4661ec(0x281)+_0x4661ec(0x2f4)+_0x4661ec(0xce)]=Scene_Battle[_0x4661ec(0x2d3)][_0x4661ec(0x148)+_0x4661ec(0x20d)+_0x4661ec(0x2a1)],Scene_Battle[_0x4661ec(0x2d3)]['createActo'+_0x4661ec(0x20d)+_0x4661ec(0x2a1)]=function(){const _0x4b28b9=_0x4661ec,_0xf49107={'MbRDO':'boost','GXpSa':_0x4b28b9(0x2ea)};VisuMZ['BoostActio'+'n'][_0x4b28b9(0x180)+_0x4b28b9(0x281)+_0x4b28b9(0x2f4)+'dWindow']['call'](this),this[_0x4b28b9(0x212)+_0x4b28b9(0x261)][_0x4b28b9(0x305)](_0xf49107[_0x4b28b9(0x1ac)],this[_0x4b28b9(0x2aa)+'st'][_0x4b28b9(0x1e4)](this)),this[_0x4b28b9(0x212)+_0x4b28b9(0x261)][_0x4b28b9(0x305)](_0xf49107['GXpSa'],this[_0x4b28b9(0x10b)+_0x4b28b9(0x17b)]['bind'](this));},Scene_Battle[_0x4661ec(0x2d3)]['commandBoo'+'st']=function(_0xf18ff4){const _0x4d34cd=_0x4661ec,_0x44a12f={'jIYug':_0x4d34cd(0x171)+'4'},_0x4830b9=_0x44a12f[_0x4d34cd(0x287)][_0x4d34cd(0x2c0)]('|');let _0x5ef828=-0x9+-0x1*-0x271+-0x268;while(!![]){switch(_0x4830b9[_0x5ef828++]){case'0':BattleManager[_0x4d34cd(0x288)]()[_0x4d34cd(0xe7)+'oostPoints'](-0x693+-0x1*-0x1fd+0x1*0x497);continue;case'1':!_0xf18ff4&&this[_0x4d34cd(0x212)+_0x4d34cd(0x261)][_0x4d34cd(0x298)]();continue;case'2':BattleManager[_0x4d34cd(0x288)]()['startChang'+_0x4d34cd(0x183)+_0x4d34cd(0x1a3)+'n']();continue;case'3':BattleManager[_0x4d34cd(0x288)]()[_0x4d34cd(0x123)+'BoostPoint'+'s'](-(-0x1*-0x130d+0xe22+-0x112*0x1f));continue;case'4':this['_actorComm'+_0x4d34cd(0x261)]['refresh']();continue;case'5':this[_0x4d34cd(0x147)+'w'][_0x4d34cd(0x19e)]();continue;}break;}},Scene_Battle['prototype'][_0x4661ec(0x10b)+_0x4661ec(0x17b)]=function(_0x188497){const _0x41db42=_0x4661ec,_0x2af75c={'hvCKi':_0x41db42(0x1d9)+'2'},_0xc1be49=_0x2af75c['hvCKi']['split']('|');let _0x1881e6=0x2f*-0x37+-0x367+0x10*0xd8;while(!![]){switch(_0xc1be49[_0x1881e6++]){case'0':this[_0x41db42(0x147)+'w'][_0x41db42(0x19e)]();continue;case'1':!_0x188497&&this[_0x41db42(0x212)+'andWindow'][_0x41db42(0x298)]();continue;case'2':this['_actorComm'+_0x41db42(0x261)][_0x41db42(0x19e)]();continue;case'3':BattleManager[_0x41db42(0x288)]()[_0x41db42(0x123)+_0x41db42(0x2ad)+'s'](0xb*0x29+-0x1484+-0x7*-0x2ae);continue;case'4':BattleManager[_0x41db42(0x288)]()[_0x41db42(0x1bc)+_0x41db42(0x183)+_0x41db42(0x1a3)+'n']();continue;case'5':BattleManager['actor']()[_0x41db42(0xe7)+_0x41db42(0x22b)](-(0x1f90+-0x1d57+-0x238));continue;}break;}},VisuMZ['BoostActio'+'n'][_0x4661ec(0x180)+'le_selectN'+'extCommand']=Scene_Battle[_0x4661ec(0x2d3)][_0x4661ec(0x30e)+_0x4661ec(0x26c)],Scene_Battle['prototype']['selectNext'+_0x4661ec(0x26c)]=function(){const _0x10cab5=_0x4661ec;this[_0x10cab5(0x147)+'w']&&this[_0x10cab5(0x147)+'w']['clearBoost'+_0x10cab5(0x137)](),VisuMZ['BoostActio'+'n']['Scene_Batt'+_0x10cab5(0x1c4)+_0x10cab5(0x16d)][_0x10cab5(0xb7)](this);},VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0x180)+_0x4661ec(0x2c5)+_0x4661ec(0x291)+'Selection']=Scene_Battle[_0x4661ec(0x2d3)][_0x4661ec(0x2b5)+'CommandSel'+_0x4661ec(0x15e)],Scene_Battle[_0x4661ec(0x2d3)][_0x4661ec(0x2b5)+_0x4661ec(0x2ff)+'ection']=function(){const _0xfe4e2=_0x4661ec;VisuMZ[_0xfe4e2(0x274)+'n'][_0xfe4e2(0x180)+_0xfe4e2(0x2c5)+_0xfe4e2(0x291)+_0xfe4e2(0x273)][_0xfe4e2(0xb7)](this),this[_0xfe4e2(0x147)+'w']&&this[_0xfe4e2(0x147)+'w'][_0xfe4e2(0x266)+_0xfe4e2(0x187)](BattleManager[_0xfe4e2(0x288)]());};function _0x350a(_0x27291,_0x113306){const _0x283fd4=_0x2d2a();return _0x350a=function(_0x428417,_0x2133f6){_0x428417=_0x428417-(-0x116e+0xfbc*0x1+0x250);let _0x190461=_0x283fd4[_0x428417];return _0x190461;},_0x350a(_0x27291,_0x113306);}function Sprite_BoostContainer(){const _0x2ceefd=_0x4661ec;this[_0x2ceefd(0x170)](...arguments);}Sprite_BoostContainer[_0x4661ec(0x2d3)]=Object[_0x4661ec(0xae)](Sprite[_0x4661ec(0x2d3)]),Sprite_BoostContainer[_0x4661ec(0x2d3)][_0x4661ec(0x165)+'r']=Sprite_BoostContainer,Sprite_BoostContainer['ICON_SIZE_'+_0x4661ec(0x25e)]=VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0xc2)]['UI']['IconSizeRa'+'te'],Sprite_BoostContainer['prototype']['initialize']=function(){const _0x4c5efe=_0x4661ec;Sprite['prototype'][_0x4c5efe(0x170)][_0x4c5efe(0xb7)](this),this['initMember'+'s'](),this[_0x4c5efe(0x309)+_0x4c5efe(0x2fb)]();},Sprite_BoostContainer[_0x4661ec(0x2d3)]['initMember'+'s']=function(){const _0x2c49d8=_0x4661ec;this['scale']['x']=Sprite_BoostContainer['ICON_SIZE_'+_0x2c49d8(0x25e)],this[_0x2c49d8(0x174)]['y']=Sprite_BoostContainer['ICON_SIZE_'+_0x2c49d8(0x25e)];},Sprite_BoostContainer[_0x4661ec(0x2d3)][_0x4661ec(0x309)+'dSprites']=function(){const _0x555411=_0x4661ec,_0x1ca2d9={'MCIXj':function(_0x1e4ec2,_0x2e1995){return _0x1e4ec2<=_0x2e1995;}};this[_0x555411(0x134)]=[];for(let _0x3e167b=-0x125a+-0x112d+-0x2f6*-0xc;_0x1ca2d9['MCIXj'](_0x3e167b,Game_BattlerBase['BOOST_POIN'+_0x555411(0x1db)+'RED']);_0x3e167b++){const _0x15afa1=new Sprite_BoostIcon(_0x3e167b);this[_0x555411(0x11c)](_0x15afa1),this[_0x555411(0x134)]['push'](_0x15afa1);}},Sprite_BoostContainer[_0x4661ec(0x2d3)][_0x4661ec(0xbc)]=function(_0xde7052){const _0x5d7f2f=_0x4661ec;if(!this[_0x5d7f2f(0x134)])return;for(const _0x4146f5 of this[_0x5d7f2f(0x134)]){_0x4146f5[_0x5d7f2f(0xbc)](_0xde7052);}};function Sprite_BoostIcon(){this['initialize'](...arguments);}Sprite_BoostIcon[_0x4661ec(0x2d3)]=Object[_0x4661ec(0xae)](Sprite[_0x4661ec(0x2d3)]),Sprite_BoostIcon[_0x4661ec(0x2d3)][_0x4661ec(0x165)+'r']=Sprite_BoostIcon,Sprite_BoostIcon[_0x4661ec(0x2d3)][_0x4661ec(0x170)]=function(_0x459f17){const _0x5f46dd=_0x4661ec;this[_0x5f46dd(0x172)]=_0x459f17,Sprite[_0x5f46dd(0x2d3)][_0x5f46dd(0x170)][_0x5f46dd(0xb7)](this),this['initMember'+'s'](),this[_0x5f46dd(0x21c)]();},Sprite_BoostIcon[_0x4661ec(0x2d3)][_0x4661ec(0xf7)+'s']=function(){const _0xe2e3a=_0x4661ec,_0x469aa8={'ZbRwI':function(_0x1741f0,_0x39e51c){return _0x1741f0*_0x39e51c;},'MxKIz':function(_0xc9dfde,_0x3c094b){return _0xc9dfde-_0x3c094b;}};this['_iconIndex']=ImageManager[_0xe2e3a(0x26f)+'n'],this['x']=_0x469aa8[_0xe2e3a(0x226)](ImageManager['iconWidth'],_0x469aa8['MxKIz'](this[_0xe2e3a(0x172)],-0x1*0x698+-0x1*-0x1778+-0x10df*0x1));},Sprite_BoostIcon[_0x4661ec(0x2d3)][_0x4661ec(0x21c)]=function(){const _0x24cfc2=_0x4661ec;this[_0x24cfc2(0x233)]=ImageManager[_0x24cfc2(0x126)+'heetBitmap'](),this['setFrame'](0x4*-0x295+0x24ee+-0x1a9a,0x258c+-0x23ec+0x8*-0x34,-0xb2*-0x13+0x13c*-0x5+-0x70a*0x1,-0xf0b*-0x1+0x1*0x155f+-0x246a);},Sprite_BoostIcon['prototype'][_0x4661ec(0xbc)]=function(_0x417bab){const _0x47491a=_0x4661ec,_0x512262={'ARCcZ':function(_0x4730b9,_0xb62cb8){return _0x4730b9!==_0xb62cb8;}};_0x512262['ARCcZ'](this[_0x47491a(0x26a)],_0x417bab)&&(this[_0x47491a(0x26a)]=_0x417bab);},Sprite_BoostIcon['prototype'][_0x4661ec(0x2db)]=function(){const _0x3dde3e=_0x4661ec;Sprite[_0x3dde3e(0x2d3)]['update'][_0x3dde3e(0xb7)](this),this[_0x3dde3e(0x11f)](),this[_0x3dde3e(0xfe)+'e']();},Sprite_BoostIcon['prototype']['updateIcon']=function(){const _0x828cbe=_0x4661ec,_0x438c4d={'BlkIB':function(_0x4289bc,_0x170213){return _0x4289bc>=_0x170213;}};if(this[_0x828cbe(0x26a)]){let _0x4c9ac4=this[_0x828cbe(0x26a)][_0x828cbe(0x2b0)+_0x828cbe(0x205)]();_0x438c4d[_0x828cbe(0x28f)](_0x4c9ac4,this[_0x828cbe(0x172)])?this['_iconIndex']=ImageManager[_0x828cbe(0x2dc)]:this[_0x828cbe(0x245)]=ImageManager['unboostIco'+'n'];}else this[_0x828cbe(0x245)]=-0xc2f*0x1+0x117f+-0x550;},Sprite_BoostIcon['prototype'][_0x4661ec(0xfe)+'e']=function(){const _0x5531fe=_0x4661ec,_0x57c321={'ovaht':function(_0x499128,_0x358767){return _0x499128*_0x358767;},'CkjZO':function(_0x2ab22b,_0x337658){return _0x2ab22b%_0x337658;},'CLmWa':function(_0x51a93d,_0x376713){return _0x51a93d/_0x376713;}},_0x56c6a7=ImageManager[_0x5531fe(0x111)],_0x46db97=ImageManager[_0x5531fe(0x175)],_0x2983e9=_0x57c321[_0x5531fe(0xd3)](_0x57c321[_0x5531fe(0x28d)](this[_0x5531fe(0x245)],-0x18b5+0x119*0x15+-0x2*-0xdc),_0x56c6a7),_0x558b60=_0x57c321[_0x5531fe(0xd3)](Math[_0x5531fe(0x113)](_0x57c321[_0x5531fe(0x149)](this[_0x5531fe(0x245)],0x3*0x7c9+0x7*-0x3a0+0x215)),_0x46db97);this[_0x5531fe(0x150)](_0x2983e9,_0x558b60,_0x56c6a7,_0x46db97);},VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0x265)+'e_convertE'+_0x4661ec(0x2ed)+_0x4661ec(0x30a)]=Window_Base['prototype'][_0x4661ec(0x269)+_0x4661ec(0x2df)+_0x4661ec(0x154)],Window_Base[_0x4661ec(0x2d3)][_0x4661ec(0x269)+_0x4661ec(0x2df)+_0x4661ec(0x154)]=function(_0x9fd7b1){const _0x91ba24=_0x4661ec;return _0x9fd7b1=VisuMZ[_0x91ba24(0x274)+'n'][_0x91ba24(0x265)+_0x91ba24(0x1ae)+_0x91ba24(0x2ed)+_0x91ba24(0x30a)][_0x91ba24(0xb7)](this,_0x9fd7b1),_0x9fd7b1=this[_0x91ba24(0x25c)+_0x91ba24(0xdf)+_0x91ba24(0x21a)](_0x9fd7b1),_0x9fd7b1;},Window_Base[_0x4661ec(0x2d3)][_0x4661ec(0x25c)+'stEscapeCh'+'aracters']=function(_0x47312d){const _0x6c515d=_0x4661ec,_0x377f80={'JqCjT':function(_0x452afd,_0x26cc0d){return _0x452afd(_0x26cc0d);},'ACaWr':function(_0x11faa6,_0x4a9737){return _0x11faa6(_0x4a9737);},'PzTcX':function(_0x23d437,_0x3417de){return _0x23d437(_0x3417de);},'AsLFL':function(_0x2b108c,_0x36f476){return _0x2b108c(_0x36f476);},'wtuQs':function(_0x2a314f,_0x34928f){return _0x2a314f(_0x34928f);},'nvIuk':function(_0x2990c8,_0x523a4c){return _0x2990c8(_0x523a4c);},'yquQN':function(_0x596ee8,_0x4199dc){return _0x596ee8(_0x4199dc);},'noigv':function(_0x495c41,_0x204899){return _0x495c41(_0x204899);},'fjaXj':function(_0x376cd0,_0xd25ca7){return _0x376cd0(_0xd25ca7);}};return _0x47312d=_0x47312d[_0x6c515d(0x167)](/\x1b(?:BP|BOOST)DMG\[(\d+)\]/gi,function(){const _0x1bf86a=_0x6c515d;return this['convertBoo'+_0x1bf86a(0x117)+_0x1bf86a(0x232)](_0x377f80[_0x1bf86a(0x189)](parseInt,arguments[0x1*0x1f91+0x18f3+0x11*-0x353]));}[_0x6c515d(0x1e4)](this)),_0x47312d=_0x47312d['replace'](/\x1b(?:BP|BOOST)DAMAGE\[(\d+)\]/gi,function(){const _0x44a732=_0x6c515d;return this[_0x44a732(0x25c)+_0x44a732(0x117)+_0x44a732(0x232)](_0x377f80[_0x44a732(0x23f)](parseInt,arguments[-0x44+-0x1154*-0x1+-0x110f]));}[_0x6c515d(0x1e4)](this)),_0x47312d=_0x47312d[_0x6c515d(0x167)](/\x1b(?:BP|BOOST)TURN\[(\d+)\]/gi,function(){const _0x379a3d=_0x6c515d;return this[_0x379a3d(0x25c)+_0x379a3d(0x122)+'pe'](_0x377f80[_0x379a3d(0x23f)](parseInt,arguments[0xff2+0x22f6+-0x32e7]));}['bind'](this)),_0x47312d=_0x47312d[_0x6c515d(0x167)](/\x1b(?:BP|BOOST)TURNS\[(\d+)\]/gi,function(){const _0x4b085f=_0x6c515d;return this[_0x4b085f(0x25c)+_0x4b085f(0x122)+'pe'](_0x377f80[_0x4b085f(0x189)](parseInt,arguments[-0x2d7*-0x3+0x1984+-0x84*0x42]));}[_0x6c515d(0x1e4)](this)),_0x47312d=_0x47312d[_0x6c515d(0x167)](/\x1b(?:BP|BOOST)REP\[(\d+)\]/gi,function(){const _0x1ca630=_0x6c515d;return this['convertBoo'+_0x1ca630(0x1ff)+'cape'](_0x377f80[_0x1ca630(0x23f)](parseInt,arguments[0x1916+0x26ad*-0x1+0xd98]));}[_0x6c515d(0x1e4)](this)),_0x47312d=_0x47312d[_0x6c515d(0x167)](/\x1b(?:BP|BOOST)REPEAT\[(\d+)\]/gi,function(){const _0x9c7b9d=_0x6c515d;return this[_0x9c7b9d(0x25c)+'stRepeatEs'+_0x9c7b9d(0x232)](_0x377f80[_0x9c7b9d(0x31d)](parseInt,arguments[0x13f9+0x256*-0x6+-0x5f4]));}['bind'](this)),_0x47312d=_0x47312d['replace'](/\x1b(?:BP|BOOST)REPEATS\[(\d+)\]/gi,function(){const _0x2e46e7=_0x6c515d;return this[_0x2e46e7(0x25c)+'stRepeatEs'+_0x2e46e7(0x232)](_0x377f80[_0x2e46e7(0x31d)](parseInt,arguments[-0x1528+-0x1c79+-0x1*-0x31a2]));}[_0x6c515d(0x1e4)](this)),_0x47312d=_0x47312d[_0x6c515d(0x167)](/\x1b(?:BP|BOOST)HITS\[(\d+)\]/gi,function(){const _0x19efc3=_0x6c515d;return this[_0x19efc3(0x25c)+'stRepeatEs'+'cape'](_0x377f80[_0x19efc3(0x23f)](parseInt,arguments[-0x21ab+-0x1209+0x33b5]));}[_0x6c515d(0x1e4)](this)),_0x47312d=_0x47312d[_0x6c515d(0x167)](/\x1b(?:BP|BOOST)ANALYZE\[(\d+)\]/gi,function(){const _0x302378=_0x6c515d;return this[_0x302378(0x25c)+_0x302378(0x1bf)+_0x302378(0x192)](_0x377f80[_0x302378(0x264)](parseInt,arguments[-0x1c43+-0xe41*0x2+-0x152*-0x2b]));}[_0x6c515d(0x1e4)](this)),_0x47312d=_0x47312d[_0x6c515d(0x167)](/\x1b(?:BP|BOOST)EFFECT\[(\d+)\]/gi,function(){const _0x1a25d9=_0x6c515d;return this[_0x1a25d9(0x25c)+_0x1a25d9(0x1d5)+_0x1a25d9(0x232)](_0x377f80['PzTcX'](parseInt,arguments[0x30a*-0x7+0x1458+0x1*0xef]));}[_0x6c515d(0x1e4)](this)),_0x47312d=_0x47312d[_0x6c515d(0x167)](/\x1b(?:BP|BOOST)\[(.*?)\]/gi,function(){const _0x5149c5=_0x6c515d;return this['convertBoo'+'stUpEscape'](_0x377f80[_0x5149c5(0x264)](String,arguments[-0x10*0x19a+0x25d0+-0xc2f]));}['bind'](this)),_0x47312d=_0x47312d['replace'](/\x1b(?:BP|BOOST)0\[(.*?)\]/gi,function(){const _0x49b3de=_0x6c515d;return this[_0x49b3de(0x25c)+_0x49b3de(0x2c9)](_0x377f80[_0x49b3de(0x23f)](String,arguments[0x1097+0xc0f+0x1*-0x1ca5]));}[_0x6c515d(0x1e4)](this)),_0x47312d=_0x47312d[_0x6c515d(0x167)](/\x1b(?:BP|BOOST)=(\d+)\[(.*?)\]/gi,function(){const _0x596daa=_0x6c515d;return this['convertBoo'+_0x596daa(0xdd)+_0x596daa(0x297)](_0x377f80['PzTcX'](parseInt,arguments[-0x227d+0x2353+-0xd5]),_0x377f80[_0x596daa(0xfa)](String,arguments[0x19cf*-0x1+-0x1*-0x23a7+-0x9d6]));}[_0x6c515d(0x1e4)](this)),_0x47312d=_0x47312d['replace'](/\x1b(?:BP|BOOST)=(\d+)\[(.*?)\]/gi,function(){const _0x117a6c=_0x6c515d;return this[_0x117a6c(0x25c)+_0x117a6c(0xdd)+'ape'](_0x377f80[_0x117a6c(0xa2)](parseInt,arguments[-0xd*0x57+0xf3b+0x1*-0xacf]),_0x377f80[_0x117a6c(0x173)](String,arguments[-0x151a+0x10*0x238+-0xe64]));}[_0x6c515d(0x1e4)](this)),_0x47312d=_0x47312d[_0x6c515d(0x167)](/\x1b(?:BP|BOOST)\<=(\d+)\[(.*?)\]/gi,function(){const _0x3c3455=_0x6c515d;return this['convertBoo'+_0x3c3455(0x214)+_0x3c3455(0xcc)](_0x377f80['yquQN'](parseInt,arguments[0x1254+0xa35+-0x1c88]),_0x377f80[_0x3c3455(0x189)](String,arguments[-0x18*-0xb3+0x1113+-0x6c5*0x5]));}[_0x6c515d(0x1e4)](this)),_0x47312d=_0x47312d[_0x6c515d(0x167)](/\x1b(?:BP|BOOST)\<(\d+)\[(.*?)\]/gi,function(){const _0x17fa9e=_0x6c515d;return this[_0x17fa9e(0x25c)+'stLessEsca'+'pe'](_0x377f80[_0x17fa9e(0x264)](parseInt,arguments[-0x1b*0x162+0x72*0x49+0x4d5]),_0x377f80[_0x17fa9e(0x14a)](String,arguments[0x2*-0x8a6+-0x1fac+0x2*0x187d]));}[_0x6c515d(0x1e4)](this)),_0x47312d=_0x47312d['replace'](/\x1b(?:BP|BOOST)\>=(\d+)\[(.*?)\]/gi,function(){const _0x4ad0dc=_0x6c515d;return this[_0x4ad0dc(0x25c)+'stGreaterE'+_0x4ad0dc(0xe8)](_0x377f80[_0x4ad0dc(0x173)](parseInt,arguments[0x15e9+0x1547+-0x3*0xe65]),_0x377f80['PzTcX'](String,arguments[0x2415*0x1+0x1d19+-0x412c]));}[_0x6c515d(0x1e4)](this)),_0x47312d=_0x47312d['replace'](/\x1b(?:BP|BOOST)\>(\d+)\[(.*?)\]/gi,function(){const _0x4e9cf3=_0x6c515d;return this[_0x4e9cf3(0x25c)+_0x4e9cf3(0x1cb)+_0x4e9cf3(0x192)](_0x377f80[_0x4e9cf3(0x189)](parseInt,arguments[-0x26fe+0x1e5c+-0xc9*-0xb]),_0x377f80[_0x4e9cf3(0xeb)](String,arguments[0x65*0x25+0x1a0a+-0x28a1]));}[_0x6c515d(0x1e4)](this)),_0x47312d;},Window_Base['prototype'][_0x4661ec(0x25c)+_0x4661ec(0x117)+_0x4661ec(0x232)]=function(_0x4038a2){const _0x2e4e66=_0x4661ec,_0xc81759={'ztClc':_0x2e4e66(0x24e),'VVcov':function(_0x37a622,_0x1c06df){return _0x37a622*_0x1c06df;}};if(!!this['_bpSubject']){var _0x1e5f59=this[_0x2e4e66(0x27a)][_0x2e4e66(0x1d8)+_0x2e4e66(0x198)](_0xc81759['ztClc']);_0x4038a2=Math[_0x2e4e66(0x135)](_0xc81759[_0x2e4e66(0x272)](_0x4038a2,_0x1e5f59)),_0x4038a2+=this[_0x2e4e66(0x27a)][_0x2e4e66(0x2ce)+_0x2e4e66(0xa7)](_0xc81759[_0x2e4e66(0x1ba)]);}return _0x4038a2;},Window_Base['prototype'][_0x4661ec(0x25c)+_0x4661ec(0x122)+'pe']=function(_0x231db3){const _0x77fa26=_0x4661ec,_0x357ce9={'woiOC':_0x77fa26(0x107),'sSchn':function(_0x2bf3d8,_0x458133){return _0x2bf3d8*_0x458133;}};if(!!this[_0x77fa26(0x27a)]){var _0x2c3275=this[_0x77fa26(0x27a)][_0x77fa26(0x1d8)+_0x77fa26(0x198)](_0x357ce9[_0x77fa26(0x243)]);_0x231db3=Math[_0x77fa26(0x135)](_0x357ce9['sSchn'](_0x231db3,_0x2c3275)),_0x231db3+=this[_0x77fa26(0x27a)][_0x77fa26(0x2ce)+_0x77fa26(0xa7)](_0x357ce9[_0x77fa26(0x243)]);}return _0x231db3;},Window_Base[_0x4661ec(0x2d3)][_0x4661ec(0x25c)+_0x4661ec(0x1ff)+_0x4661ec(0x232)]=function(_0x1b3146){const _0x32676e=_0x4661ec,_0x28857e={'TckjG':_0x32676e(0xde),'zVZpg':function(_0x2ebc67,_0x180e4c){return _0x2ebc67*_0x180e4c;}};if(!!this['_bpSubject']){var _0x11994c=this[_0x32676e(0x27a)]['boostMulti'+_0x32676e(0x198)](_0x28857e[_0x32676e(0x17f)]);_0x1b3146=Math[_0x32676e(0x135)](_0x28857e[_0x32676e(0x24a)](_0x1b3146,_0x11994c)),_0x1b3146+=this['_bpSubject'][_0x32676e(0x2ce)+_0x32676e(0xa7)](_0x28857e[_0x32676e(0x17f)]);}return _0x1b3146;},Window_Base[_0x4661ec(0x2d3)][_0x4661ec(0x25c)+'stAnalyzeE'+_0x4661ec(0x192)]=function(_0xad4b1){const _0x847d14=_0x4661ec,_0x38990a={'bJUfD':_0x847d14(0x2b6),'nrrGr':function(_0x233af7,_0x21b039){return _0x233af7*_0x21b039;}};if(!!this[_0x847d14(0x27a)]){var _0x42ca6f=this['_bpSubject'][_0x847d14(0x1d8)+_0x847d14(0x198)](_0x38990a[_0x847d14(0x1a9)]);_0xad4b1=Math[_0x847d14(0x135)](_0x38990a[_0x847d14(0x12b)](_0xad4b1,_0x42ca6f)),_0xad4b1+=this[_0x847d14(0x27a)][_0x847d14(0x2ce)+_0x847d14(0xa7)](_0x38990a[_0x847d14(0x1a9)]);}return _0xad4b1;},Window_Base[_0x4661ec(0x2d3)]['convertBoo'+_0x4661ec(0x1d5)+_0x4661ec(0x232)]=function(_0x3a22ed){const _0xddc845=_0x4661ec,_0x40ced5={'LYqyg':_0xddc845(0xf1),'izXXZ':function(_0x3037cc,_0x19ef8e){return _0x3037cc*_0x19ef8e;}};if(!!this[_0xddc845(0x27a)]){var _0x6f84bd=this[_0xddc845(0x27a)]['boostMulti'+_0xddc845(0x198)](_0x40ced5[_0xddc845(0xcd)]);_0x3a22ed=Math[_0xddc845(0x135)](_0x40ced5[_0xddc845(0x141)](_0x3a22ed,_0x6f84bd)),_0x3a22ed+=this['_bpSubject']['boostAddit'+'ion'](_0x40ced5['LYqyg']);}return _0x3a22ed;},Window_Base[_0x4661ec(0x2d3)][_0x4661ec(0x25c)+_0x4661ec(0x2fc)]=function(_0x1e5c69){const _0x5e99c7=_0x4661ec,_0x1164a1={'pWANt':function(_0xc8f44e,_0x477dc7){return _0xc8f44e>_0x477dc7;}};return!!this['_bpSubject']&&_0x1164a1[_0x5e99c7(0x2f1)](this[_0x5e99c7(0x27a)][_0x5e99c7(0x1f3)+_0x5e99c7(0x29f)](),0x4*0x7d3+0x281*0x2+-0x244e)?_0x1e5c69:'';},Window_Base['prototype']['convertBoo'+'st0Escape']=function(_0x44b22c){const _0x37b84a=_0x4661ec,_0x1728d7={'auDXZ':function(_0x27f844,_0x18cc98){return _0x27f844<=_0x18cc98;}};return!this['_bpSubject']||_0x1728d7['auDXZ'](this[_0x37b84a(0x27a)][_0x37b84a(0x1f3)+_0x37b84a(0x29f)](),-0x817*0x4+-0x1c0b+0x3c67)?_0x44b22c:'';},Window_Base['prototype'][_0x4661ec(0x25c)+_0x4661ec(0xdd)+'ape']=function(_0x573ed0,_0x119067){const _0xbd15d0=_0x4661ec,_0x29f7f2={'mJFWV':function(_0x526bb4,_0x582dcb){return _0x526bb4===_0x582dcb;}};return!!this[_0xbd15d0(0x27a)]&&_0x29f7f2['mJFWV'](this[_0xbd15d0(0x27a)][_0xbd15d0(0x1f3)+_0xbd15d0(0x29f)](),_0x573ed0)?_0x119067:'';},Window_Base[_0x4661ec(0x2d3)][_0x4661ec(0x25c)+_0x4661ec(0xdd)+_0x4661ec(0x297)]=function(_0x5c90cc,_0x2720dc){const _0x3c5127=_0x4661ec,_0x3a9218={'eYSMU':function(_0x2a8cab,_0xa0a7b9){return _0x2a8cab===_0xa0a7b9;}};return!!this[_0x3c5127(0x27a)]&&_0x3a9218['eYSMU'](this['_bpSubject']['toUseBoost'+_0x3c5127(0x29f)](),_0x5c90cc)?_0x2720dc:'';},Window_Base[_0x4661ec(0x2d3)]['convertBoo'+_0x4661ec(0x214)+'lEscape']=function(_0x612106,_0x43b8f4){const _0xc07e10=_0x4661ec,_0x3d431d={'JbFXO':function(_0x989c60,_0x39dfe7){return _0x989c60<=_0x39dfe7;}};return!!this['_bpSubject']&&_0x3d431d[_0xc07e10(0x2bc)](this['_bpSubject'][_0xc07e10(0x1f3)+'Points'](),_0x612106)?_0x43b8f4:'';},Window_Base[_0x4661ec(0x2d3)]['convertBoo'+_0x4661ec(0x317)+'pe']=function(_0x1c974b,_0x75e831){const _0x10f4ae=_0x4661ec,_0x3f2174={'PJQoY':function(_0x338edc,_0x2549d3){return _0x338edc<_0x2549d3;}};return!!this[_0x10f4ae(0x27a)]&&_0x3f2174[_0x10f4ae(0x222)](this['_bpSubject'][_0x10f4ae(0x1f3)+_0x10f4ae(0x29f)](),_0x1c974b)?_0x75e831:'';},Window_Base[_0x4661ec(0x2d3)]['convertBoo'+_0x4661ec(0x1cb)+_0x4661ec(0xe8)]=function(_0x544220,_0x14a5ae){const _0x3ac8d7=_0x4661ec,_0x1faccb={'qMGlP':function(_0x4f2ce2,_0x20fd7a){return _0x4f2ce2>=_0x20fd7a;}};return!!this[_0x3ac8d7(0x27a)]&&_0x1faccb['qMGlP'](this[_0x3ac8d7(0x27a)][_0x3ac8d7(0x1f3)+_0x3ac8d7(0x29f)](),_0x544220)?_0x14a5ae:'';},Window_Base[_0x4661ec(0x2d3)]['convertBoo'+_0x4661ec(0x1cb)+_0x4661ec(0x192)]=function(_0x33bb22,_0x1b7aa0){const _0x1416e9=_0x4661ec,_0xa94c08={'Cogfc':function(_0x3bcede,_0x134e79){return _0x3bcede>_0x134e79;}};return!!this[_0x1416e9(0x27a)]&&_0xa94c08['Cogfc'](this[_0x1416e9(0x27a)][_0x1416e9(0x1f3)+'Points'](),_0x33bb22)?_0x1b7aa0:'';},Window_Selectable[_0x4661ec(0x1d3)+'ON_SHORTCU'+_0x4661ec(0x1f7)+'AGEDN']=VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0xc2)]['UI'][_0x4661ec(0xab)+_0x4661ec(0x15d)],Window_Selectable[_0x4661ec(0x1d3)+_0x4661ec(0x30f)+_0x4661ec(0x140)+'RS']=VisuMZ[_0x4661ec(0x274)+'n']['Settings']['UI'][_0x4661ec(0x22c)+_0x4661ec(0x153)],Window_Selectable['prototype'][_0x4661ec(0x105)+'tShortcut']=function(){const _0x34657d=_0x4661ec,_0x506bb7=this[_0x34657d(0x165)+'r']['name'];return Window_Selectable[_0x34657d(0x1d3)+_0x34657d(0x30f)+_0x34657d(0x140)+'RS'][_0x34657d(0x227)](_0x506bb7)?![]:!![];},Window_Selectable[_0x4661ec(0x2d3)]['meetsBoost'+_0x4661ec(0xf3)+'quirements']=function(){const _0x104413=_0x4661ec;if(!SceneManager[_0x104413(0xa8)+_0x104413(0x1ea)]())return![];if(!Window_Selectable['BOOST_ACTI'+_0x104413(0x19d)+_0x104413(0x1f7)+_0x104413(0x30b)])return![];if(!BattleManager[_0x104413(0x236)+'Action']())return![];return this[_0x104413(0x105)+_0x104413(0x208)]();},VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0xcb)+'ectable_cu'+_0x4661ec(0x132)+'wn']=Window_Selectable['prototype'][_0x4661ec(0x248)+'down'],Window_Selectable[_0x4661ec(0x2d3)][_0x4661ec(0x248)+_0x4661ec(0x10a)]=function(){const _0x1bbaf6=_0x4661ec;if(this[_0x1bbaf6(0x2d2)+'ShortcutRe'+_0x1bbaf6(0x142)]()){const _0x2fc040=BattleManager[_0x1bbaf6(0x288)]();_0x2fc040&&_0x2fc040[_0x1bbaf6(0x105)+_0x1bbaf6(0x205)]()&&(SceneManager[_0x1bbaf6(0x2c6)][_0x1bbaf6(0x2aa)+'st'](!![]),this[_0x1bbaf6(0x19e)](),this[_0x1bbaf6(0x1f4)+_0x1bbaf6(0x300)]()),Input[_0x1bbaf6(0x282)]();}else VisuMZ['BoostActio'+'n'][_0x1bbaf6(0xcb)+_0x1bbaf6(0x2c8)+_0x1bbaf6(0x132)+'wn'][_0x1bbaf6(0xb7)](this);},VisuMZ[_0x4661ec(0x274)+'n']['Window_Sel'+'ectable_cu'+_0x4661ec(0x2ec)]=Window_Selectable[_0x4661ec(0x2d3)]['cursorPage'+'up'],Window_Selectable['prototype']['cursorPage'+'up']=function(){const _0xe2ce3c=_0x4661ec;if(this[_0xe2ce3c(0x2d2)+'ShortcutRe'+_0xe2ce3c(0x142)]()){const _0x18b3f4=BattleManager[_0xe2ce3c(0x288)]();_0x18b3f4&&_0x18b3f4[_0xe2ce3c(0x2b8)+_0xe2ce3c(0x2e6)]()&&(SceneManager[_0xe2ce3c(0x2c6)][_0xe2ce3c(0x10b)+'oost'](!![]),this['refresh'](),this[_0xe2ce3c(0x1f4)+_0xe2ce3c(0x300)]()),Input[_0xe2ce3c(0x282)]();}else VisuMZ[_0xe2ce3c(0x274)+'n'][_0xe2ce3c(0xcb)+'ectable_cu'+_0xe2ce3c(0x2ec)][_0xe2ce3c(0xb7)](this);},Window_Help[_0x4661ec(0x2d3)][_0x4661ec(0x266)+_0x4661ec(0x187)]=function(_0x1f5034){const _0x48dc76=_0x4661ec;this[_0x48dc76(0x27a)]=_0x1f5034;},Window_Help[_0x4661ec(0x2d3)][_0x4661ec(0x234)+_0x4661ec(0x137)]=function(){const _0xce043=_0x4661ec;this[_0xce043(0x27a)]=undefined;},Window_StatusBase['prototype']['shouldDraw'+_0x4661ec(0x2dd)]=function(){const _0x46bb81=_0x4661ec;return BattleManager[_0x46bb81(0x236)+_0x46bb81(0xc4)]();},Window_StatusBase[_0x4661ec(0x2d3)][_0x4661ec(0xc1)+'Points']=function(_0x29ccfe,_0x5d662c,_0x3de9c3){const _0x52adf6=_0x4661ec,_0x54e768={'NghNC':_0x52adf6(0x24f)+'ostPoints'};if(!this[_0x52adf6(0xfb)+_0x52adf6(0x2dd)]())return;const _0x13df02=_0x54e768[_0x52adf6(0x30d)][_0x52adf6(0x2d9)](_0x29ccfe[_0x52adf6(0x223)]()),_0x215689=this[_0x52adf6(0xa6)+_0x52adf6(0x1ec)](_0x13df02,Sprite_BoostContainer);_0x215689['setup'](_0x29ccfe),_0x215689[_0x52adf6(0xb6)](_0x5d662c,_0x3de9c3),_0x215689['show']();},Window_ActorCommand[_0x4661ec(0x1d3)+_0x4661ec(0x112)]=VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0xc2)]['UI'][_0x4661ec(0x24c)+'md'],Window_ActorCommand[_0x4661ec(0x2e7)+_0x4661ec(0x23e)]=VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0xc2)]['UI'][_0x4661ec(0x155)+_0x4661ec(0x161)],VisuMZ[_0x4661ec(0x274)+'n']['Window_Act'+_0x4661ec(0x267)+_0x4661ec(0x9e)+_0x4661ec(0xa3)]=Window_ActorCommand['prototype'][_0x4661ec(0x9e)+_0x4661ec(0xa3)],Window_ActorCommand[_0x4661ec(0x2d3)]['addGuardCo'+'mmand']=function(){const _0x3982ca=_0x4661ec;BattleManager[_0x3982ca(0x236)+_0x3982ca(0xc4)]()&&(this['addBoostCo'+'mmand'](),this['addUnboost'+_0x3982ca(0x26c)]()),VisuMZ['BoostActio'+'n'][_0x3982ca(0x2af)+_0x3982ca(0x267)+'addGuardCo'+_0x3982ca(0xa3)][_0x3982ca(0xb7)](this);},Window_ActorCommand[_0x4661ec(0x2d3)][_0x4661ec(0xac)+_0x4661ec(0xa3)]=function(){const _0x1fd8de=_0x4661ec,_0x32973c={'CZbPa':function(_0x807802,_0x48cdde){return _0x807802===_0x48cdde;},'cEqkn':'text','HkJcx':_0x1fd8de(0x220),'tryPO':_0x1fd8de(0x18a)};if(!Window_ActorCommand[_0x1fd8de(0x1d3)+_0x1fd8de(0x112)])return;const _0x22db6d=this[_0x1fd8de(0x15b)+'le'](),_0x196bba=TextManager[_0x1fd8de(0x242)+_0x1fd8de(0x26b)],_0x2c7627=ImageManager[_0x1fd8de(0x2dc)],_0x5d9181=_0x32973c[_0x1fd8de(0x13c)](_0x22db6d,_0x32973c[_0x1fd8de(0x15f)])?_0x196bba:_0x32973c[_0x1fd8de(0x2be)][_0x1fd8de(0x2d9)](_0x2c7627,_0x196bba);var _0x545f9e=this[_0x1fd8de(0x1b6)][_0x1fd8de(0x105)+_0x1fd8de(0x205)]();this[_0x1fd8de(0xf5)](_0x5d9181,_0x32973c[_0x1fd8de(0x1e3)],_0x545f9e);},Window_ActorCommand[_0x4661ec(0x2d3)][_0x4661ec(0x152)+_0x4661ec(0x26c)]=function(){const _0x4c0864=_0x4661ec,_0x2acb0d={'BTaCH':function(_0x50608d,_0x42b488){return _0x50608d===_0x42b488;},'ZSPgZ':_0x4c0864(0x194),'CwBBD':_0x4c0864(0x220),'BOFIK':'unboost'};if(!Window_ActorCommand[_0x4c0864(0x2e7)+_0x4c0864(0x23e)])return;const _0x1fc04f=this['commandSty'+'le'](),_0xcaaffb=TextManager[_0x4c0864(0xaa)+_0x4c0864(0x2e2)],_0x1eda2b=ImageManager[_0x4c0864(0x26f)+'n'],_0x2533e5=_0x2acb0d['BTaCH'](_0x1fc04f,_0x2acb0d[_0x4c0864(0x13f)])?_0xcaaffb:_0x2acb0d[_0x4c0864(0x195)][_0x4c0864(0x2d9)](_0x1eda2b,_0xcaaffb);var _0xd7bdca=this[_0x4c0864(0x1b6)]['canUndoBoo'+_0x4c0864(0x2e6)]();this[_0x4c0864(0xf5)](_0x2533e5,_0x2acb0d[_0x4c0864(0x22e)],_0xd7bdca);},Window_ActorCommand['prototype']['playOkSoun'+'d']=function(){const _0x1f27f7=_0x4661ec,_0x5a77dd={'uWhAB':function(_0x4f3d58,_0x81caf4){return _0x4f3d58!==_0x81caf4;},'gNzMj':_0x1f27f7(0x18a),'gmIZH':function(_0x334fa9,_0x1d0562){return _0x334fa9!==_0x1d0562;},'bGhPR':_0x1f27f7(0x2ea)};_0x5a77dd[_0x1f27f7(0x1c7)](this[_0x1f27f7(0x2b4)+'bol'](),_0x5a77dd['gNzMj'])&&_0x5a77dd[_0x1f27f7(0x10f)](this[_0x1f27f7(0x2b4)+_0x1f27f7(0x143)](),_0x5a77dd[_0x1f27f7(0x2c3)])&&Window_Selectable['prototype'][_0x1f27f7(0x28e)+'d'][_0x1f27f7(0xb7)](this);},Window_BattleStatus[_0x4661ec(0x131)+'TS_DISPLAY'+_0x4661ec(0x246)+'ATUS']=VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0xc2)]['UI']['BattleStat'+_0x4661ec(0x21e)],Window_BattleStatus['BOOST_POIN'+_0x4661ec(0x27e)+_0x4661ec(0x125)]=VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0xc2)]['UI'][_0x4661ec(0x221)+_0x4661ec(0x19c)+_0x4661ec(0x2a2)],Window_BattleStatus[_0x4661ec(0x131)+'TS_DISPLAY'+'_OFFSET_X']=VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0xc2)]['UI'][_0x4661ec(0x221)+_0x4661ec(0x296)],Window_BattleStatus['BOOST_POIN'+_0x4661ec(0x27e)+'_OFFSET_Y']=VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0xc2)]['UI'][_0x4661ec(0x221)+_0x4661ec(0x2e8)],VisuMZ[_0x4661ec(0x274)+'n'][_0x4661ec(0x2f6)+_0x4661ec(0x2ab)+_0x4661ec(0xbb)+_0x4661ec(0x231)]=Window_BattleStatus[_0x4661ec(0x2d3)][_0x4661ec(0xbb)+_0x4661ec(0x231)],Window_BattleStatus[_0x4661ec(0x2d3)]['drawItemSt'+_0x4661ec(0x231)]=function(_0x5290b4){const _0x2c1797=_0x4661ec;VisuMZ[_0x2c1797(0x274)+'n'][_0x2c1797(0x2f6)+_0x2c1797(0x2ab)+_0x2c1797(0xbb)+_0x2c1797(0x231)][_0x2c1797(0xb7)](this,_0x5290b4),this[_0x2c1797(0xbb)+'atusBoostP'+_0x2c1797(0xef)](_0x5290b4);},Window_BattleStatus['prototype'][_0x4661ec(0xbb)+_0x4661ec(0x240)+'oints']=function(_0x523c7e){const _0x1e0f93=_0x4661ec;if(!Window_BattleStatus['BOOST_POIN'+_0x1e0f93(0x27e)+'_BATTLE_ST'+_0x1e0f93(0x31a)])return;const _0x5b73e9=this[_0x1e0f93(0x288)](_0x523c7e);if(!_0x5b73e9)return;!Window_BattleStatus['BOOST_POIN'+'TS_DISPLAY'+'_AUTO_POS']?this[_0x1e0f93(0xbb)+_0x1e0f93(0x240)+'ointsDefau'+'lt'](_0x523c7e):this[_0x1e0f93(0xbb)+_0x1e0f93(0x240)+'ointsAuto'](_0x523c7e);},Window_BattleStatus[_0x4661ec(0x2d3)][_0x4661ec(0xbb)+_0x4661ec(0x240)+_0x4661ec(0x1cf)+'lt']=function(_0x186e57){const _0xc8fe21=_0x4661ec,_0x268222={'sqwTN':function(_0x270ab5,_0xf1d91d){return _0x270ab5+_0xf1d91d;},'xmWyN':function(_0x299161,_0x208755){return _0x299161-_0x208755;},'UhAab':function(_0x26600c,_0x7136ca){return _0x26600c+_0x7136ca;}},_0x1dcbb5=this['actor'](_0x186e57),_0x4f0500=this[_0xc8fe21(0x1eb)+_0xc8fe21(0x186)](_0x186e57);let _0x4f7443=_0x268222[_0xc8fe21(0x191)](_0x268222[_0xc8fe21(0x29b)](_0x4f0500['x'],0x1b21+0x1*-0x1521+-0x5fc),Window_BattleStatus[_0xc8fe21(0x131)+'TS_DISPLAY'+'_OFFSET_X']),_0x33e0b1=_0x268222[_0xc8fe21(0x100)](_0x268222['sqwTN'](_0x4f0500['y'],-0x1d8+0x1817+-0x163b),Window_BattleStatus[_0xc8fe21(0x131)+_0xc8fe21(0x27e)+_0xc8fe21(0xea)]);this[_0xc8fe21(0xc1)+_0xc8fe21(0x29f)](_0x1dcbb5,_0x4f7443,_0x33e0b1);},Window_BattleStatus[_0x4661ec(0x2d3)][_0x4661ec(0xbb)+_0x4661ec(0x240)+_0x4661ec(0x239)]=function(_0x3a91df){const _0x156ab4=_0x4661ec,_0xbff9fc={'QbIsm':function(_0x2822f8,_0x47dacf){return _0x2822f8*_0x47dacf;},'gCxUV':function(_0x2b3a1a,_0x149e29){return _0x2b3a1a*_0x149e29;},'CwGXe':function(_0x30e793,_0x4ed85f){return _0x30e793+_0x4ed85f;},'OveAT':'list','YAmsJ':function(_0x4165f1,_0x2cb3bd){return _0x4165f1/_0x2cb3bd;},'cxNTi':function(_0x317c7e,_0x24b6eb){return _0x317c7e-_0x24b6eb;},'TIBvX':_0x156ab4(0x1bd),'LDBVm':_0x156ab4(0x1ab),'WPONi':function(_0x229b29,_0x5c9e47){return _0x229b29+_0x5c9e47;},'EOhBW':_0x156ab4(0x2e9),'Dmpxm':function(_0x312407,_0x148aa2){return _0x312407-_0x148aa2;},'szJjM':function(_0xdb5c5e,_0x4cb680){return _0xdb5c5e-_0x4cb680;},'Iaeyd':function(_0x5defce,_0x2a1320){return _0x5defce*_0x2a1320;}},_0x508aee=this[_0x156ab4(0x288)](_0x3a91df),_0x37613e=this['itemRect'](_0x3a91df),_0x2ccc28=Math[_0x156ab4(0x311)](_0xbff9fc[_0x156ab4(0x18c)](_0xbff9fc[_0x156ab4(0x18c)](ImageManager[_0x156ab4(0x111)],Game_BattlerBase['BOOST_POIN'+'TS_MAX_STO'+_0x156ab4(0xf2)]),Sprite_BoostContainer['ICON_SIZE_'+_0x156ab4(0x25e)])),_0x1d023a=Math[_0x156ab4(0x311)](_0xbff9fc[_0x156ab4(0xf0)](ImageManager['iconHeight'],Sprite_BoostContainer[_0x156ab4(0x2a4)+_0x156ab4(0x25e)]));let _0x5dc576=_0xbff9fc['CwGXe'](_0x37613e['x'],-0x1416+-0x1b41+0x2f5b),_0x1cf832=_0xbff9fc['CwGXe'](_0x37613e['y'],-0x220b*0x1+0x7f2+0x1a1d);const _0x1b4a8a=this[_0x156ab4(0x17c)+'utStyle']();switch(_0x1b4a8a){case _0xbff9fc[_0x156ab4(0x184)]:VisuMZ[_0x156ab4(0x24b)][_0x156ab4(0xc2)]['BattleLayo'+'ut']['ShowFacesL'+_0x156ab4(0x121)]?_0x5dc576+=_0xbff9fc[_0x156ab4(0x307)](ImageManager[_0x156ab4(0x2a7)],-0x2*0xa11+0xae1+0x949):_0x5dc576+=_0xbff9fc['CwGXe'](ImageManager['iconWidth'],-0x99a+0x1bdb+-0x1239);_0x5dc576+=0x261a+-0x266*0x7+-0x1c*0xbe,_0x5dc576+=_0xbff9fc[_0x156ab4(0x18c)](-0x2d8+0x2080+-0x1d20,-0x1e07*-0x1+-0xfc6+0x7*-0x209);$dataSystem[_0x156ab4(0x130)+'Tp']&&(_0x5dc576+=0x1*0x425+-0xa*-0xf7+-0x5*0x2a7);_0x1cf832+=Math[_0x156ab4(0x2a0)](-0x757+-0x1*0x2d5+-0x5d*-0x1c,Math[_0x156ab4(0x135)](_0xbff9fc[_0x156ab4(0x11b)](_0xbff9fc[_0x156ab4(0xff)](this[_0x156ab4(0x106)](),_0x1d023a),0xa3*-0x18+-0x1eab+0x2df5)));break;case'xp':case _0xbff9fc[_0x156ab4(0x268)]:case _0xbff9fc[_0x156ab4(0x2fd)]:_0x5dc576=Math[_0x156ab4(0x135)](_0xbff9fc[_0x156ab4(0x10c)](_0x37613e['x'],_0xbff9fc[_0x156ab4(0x11b)](_0xbff9fc['cxNTi'](_0x37613e[_0x156ab4(0x14d)],_0x2ccc28),0x61c+-0x1a2f+0x1415)));break;case _0xbff9fc[_0x156ab4(0x1a7)]:_0x5dc576=Math[_0x156ab4(0x135)](_0xbff9fc[_0x156ab4(0x10c)](_0x37613e['x'],_0xbff9fc['YAmsJ'](_0xbff9fc[_0x156ab4(0x31f)](_0x37613e['width'],_0x2ccc28),0x9*0x239+-0x7cf*-0x5+-0xb*0x55e)));const _0x4368d3=$dataSystem['optDisplay'+'Tp']?-0x1c9a+0x3b*-0x65+0x5*0xa61:0xa*0x8+-0xfa+0x1*0xad;_0x1cf832=Math['round'](_0xbff9fc['Dmpxm'](_0xbff9fc[_0x156ab4(0x200)](_0xbff9fc[_0x156ab4(0x10c)](_0x37613e['y'],_0x37613e[_0x156ab4(0x276)]),0x1ca3+0x1709+-0x33a8),_0xbff9fc[_0x156ab4(0x157)](this[_0x156ab4(0x106)](),_0x4368d3)));break;}_0x5dc576+=Window_BattleStatus[_0x156ab4(0x131)+'TS_DISPLAY'+'_OFFSET_X'],_0x1cf832+=Window_BattleStatus[_0x156ab4(0x131)+'TS_DISPLAY'+_0x156ab4(0xea)],this[_0x156ab4(0xc1)+'Points'](_0x508aee,_0x5dc576,_0x1cf832);};