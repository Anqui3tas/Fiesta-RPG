//=============================================================================
// VisuStella MZ - Boost Action
// VisuMZ_3_BoostAction.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_BoostAction = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BoostAction = VisuMZ.BoostAction || {};
VisuMZ.BoostAction.version = 1.11;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.11] [BoostAction]
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
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - This is used for on boost.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - This is used for on boost.
 * 
 *   Repeat Animation?:
 *   - Repeat boost animation played?
 *   - Only repeated during command input.
 * 
 *     Repeat Cycle:
 *     - How many frames to wait between each animation?
 *     - 60 frames = 1 second.
 * 
 *     Mirror Animation:
 *     - Mirror the effect animation when repeated?
 *     - Overrides on boost Mirror setting.
 * 
 *     Mute Animation:
 *     - Mute the effect animation when repeated?
 *     - Overrides on boost Mute setting.
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
 * Version 1.11: March 20, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Parameters > Mechanics > Boost Animations > Mirror Animation
 * *** Parameters > Mechanics > Boost Animations > Mute Animation
 * **** Mirror/Mute the effect animation?
 * *** Parameters > Mechanics > Boost Animations > Repeat Animation?
 * *** Parameters > Mechanics > Boost Animations > Repeat > Repeat Cycle
 * *** Parameters > Mechanics > Boost Animations > Repeat > Mirror Animation
 * *** Parameters > Mechanics > Boost Animations > Repeat > Mute Animation
 * **** Allows repeating animations while boosted and inputting.
 * **** Only repeated during command input.
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
 * @param BoostAniMirror:eval
 * @text Mirror Animation
 * @parent Animations
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * This is used for on boost.
 * @default false
 *
 * @param BoostAniMute:eval
 * @text Mute Animation
 * @parent Animations
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * This is used for on boost.
 * @default false
 *
 * @param RepeatBoostAni:eval
 * @text Repeat Animation?
 * @parent Animations
 * @type boolean
 * @on Repeat
 * @off Single
 * @desc Repeat boost animation played?
 * Only repeated during command input.
 * @default false
 * 
 * @param RepeatAniCycle:num
 * @text Repeat Cycle
 * @parent RepeatBoostAni:eval
 * @desc How many frames to wait between each animation?
 * 60 frames = 1 second.
 * @default 120
 *
 * @param RepeatAniMirror:eval
 * @text Mirror Animation
 * @parent RepeatBoostAni:eval
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation when repeated?
 * Overrides on boost Mirror setting.
 * @default false
 *
 * @param RepeatAniMute:eval
 * @text Mute Animation
 * @parent RepeatBoostAni:eval
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation when repeated?
 * Overrides on boost Mute setting.
 * @default true
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

function _0x5ae3(){const _0x370691=['round','item','BOOST_POINTS_START_BATTLE','BOOST_POINTS_DISPLAY_OFFSET_Y','shouldDrawBoostIcons','BOOST_ACTION_SHOW','_battler','convertBoost0Escape','DeathRemoval','convertBoostLessEscape','setupBattleBoostPointsAdded','BpEffect','version','UserBoostPoints','BOOST_POINTS_DISPLAY_OFFSET_X','RepeatAddition','_waitCount','Window_Selectable_cursorPageup','_inBattle','clearBoostSubject','updateIcon','ARRAYSTR','BoostDamage','Game_BattlerBase_initialize','ShowFacesListStyle','playOkSound','__Game_Action_applyItemUserEffect','storedBoostPoints','convertBoostGreaterEqualEscape','_toUseBoostPoints','BattleManager_setup','addState','applyBoostPointDamage','placeBoostPoints','boostIcon','BoostCmd','_storedBoostPoints','1164CUrOAo','bpRegenAdded','Game_BattlerBase_resetStateCounts','unboostIcon','IconSizeRate','gainToUseBoostPoints','commandUnboost','BattleManager_processTurn','TurnMultiply','itemRectWithPadding','\x5cI[%1]%2','endActionBoostPoints','BP\x20Effect','applyGuard','Scene_Battle_selectNextCommand','addGuardCommand','show','currentAction','_turnUsedBoostPoints','RepeatAniCycle','EnemyBoostSkillName','Analyze','STRUCT','initialize','startChangeBoostPointsAnimation','boostMultiplier','ARRAYSTRUCT','convertBoostEqualEscape','1311574zQYhgX','bind','Game_Battler_addDebuff','max','EffectAddition','BattleLayout','Window_Base_convertEscapeCharacters','Window_ActorCommand_addGuardCommand','BOOST_POINTS_ANIMATIONS','description','isUsingRepeatBoostAnimation','drawItemStatusBoostPointsDefault','isActor','optDisplayTp','Scene_Battle_createActorCommandWindow','EffectMultiply','addLoadListener','height','StartBattle','BoostIcon','updateFrame','traitObjects','BoostAniMute','_bpTurnRate','_boostAI','apply','Turn','clearRepeatBoostAnimation','setStoredBoostPoints','boost','addDebuff','toLowerCase','trim','addBuff','note','BoostBattleStartRate','commandStyle','gainStoredBoostPoints','BOOST_ACTION_BYPASS_CONSTRUCTORS','convertBoostUpEscape','_helpWindow','convertBoostDamageEscape','name','isSkill','partyChangeRefresh','GreaterEqual','convertBoostGreaterEscape','faceWidth','Repeat','isBoostSealed','BoostPointsRegenFlat','BOOST_POINTS_DEATH_REMOVE','DeathRegen','commandBoost','unboost','callUpdateHelp','getStateReapplyRulings','Scene_Battle_startActorCommandSelection','calculateBPtoUse','isHidden','BOOST_POINTS_REGEN_ALWAYS','initBoostAction','UNBOOST_ACTION_SHOW','9872rEYgds','list','move','Game_Action_numRepeats','14AjVnsf','BattleStatusOffsetY','reset','members','push','BattleStatusShow','canUseBoostShortcut','_scene','cursorPageup','applyBoostPointRepeats','RefreshHelpWindowInBattle','unboostCommandName','Scene_Battle_update','BoostRepeat','RepeatAniMirror','Window_Selectable_cursorPagedown','AnalyzeMultiply','Settings','resize','convertBoostEscapeCharacters','BOOST_POINTS_MULTIPLIERS','VisuMZ_3_ActiveChainSkills','create','loadSystem','lineHeight','format','bpRegenMultipliers','Mechanics','addActor','length','scale','2726796jXRYuu','drawItemStatusBoostPointsAuto','Game_Battler_removeBattleStates','clamp','Game_Battler_regenerateAll','Require','convertBoostRepeatEscape','ShowBoostCmd','BOOST_POINTS_TURN_REGEN','initMembers','LessEqual','TargetBoostPoints','resetStateCounts','activate','AnimationDelay','constructor','BoostAniMirror','_stateTurns','ARRAYNUM','width','Game_BattlerBase_meetsUsableItemConditions','removeBattleStates','allowBoostAction','Less','blt','VisuMZ_2_BattleSystemBTB','VisuMZ_0_CoreEngine','_customModified','1431756dkASbo','_previousBattleChainBoostActions','RepeatAniMute','Equal','_repeatBoostAnimationTimer','convertEscapeCharacters','randomInt','VisuMZ_1_SkillsStatesCore','setupBoostAI','applyBPEffects','refresh','Damage','BOOST_POINTS_ADDITION','startActorCommandSelection','processtoUseBoostPoints','_bpSubject','maxTurns','AnalyzeAddition','add','canUndoBoostPoints','Window_BattleStatus_drawItemStatus','PgUpDnShortcuts','boostCommandName','_actor','4388545xsDCtO','smooth','Game_Action_applyGuard','ICON_SIZE_RATE','_bpTurnFlat','BOOST_POINTS_ANIMATION_DELAY','boostPointsRegenValue','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','setupBattleBoostPoints','BoostBattleStartFlat','12912Cyilxh','Game_Party_addActor','BoostGainPoints','parameters','29343920DetVaa','BoostTurns','actor%1-boostPoints','itemRect','DmgMultiply','DmgAddition','boostTransferBitmap','BOOST_POINTS_MAX_TOUSE','AlwaysRegen','subject','drawItemStatusBoostPoints','map','BypassConstructors','ConvertParams','addCommand','text','removeActor','_icons','regenerateTp','BOOST_POINTS_MAX_STORED','update','default','processEnemyUseBoost','UnboostCmd','call','updateRepeatBoostAnimation','_slot','setHandler','processTurn','createChildSprites','applyBoostPointTurns','Usable','canUseBoostPoints','BattleManager_endAction','RegExp','addChild','getActiveChainSkillSelected','EVAL','parse','Amount','TurnAddition','isEnemy','convertBoostTurnEscape','numRepeats','toUpperCase','processEnemyBPUsage','drawItemStatus','BOOST_POINTS_DEATH_REGEN','Game_Action_apply','iconHeight','actor','Skill\x20','endAction','_subject','replace','convertBoostEffectEscape','createActorCommandWindow','boostSmooth','_boostIconSheet','BattleCore','match','_iconIndex','currentSymbol','Regen','applyItemUserEffect','4491skGNwB','startRepeatBoostAnimation','EmptyIcon','Game_Battler_regenerateTp','ARRAYFUNC','BOOST_POINTS_DISPLAY_AUTO_POS','Game_Enemy_setup','isDead','ceil','Game_Battler_addBuff','prototype','meetsBoostShortcutRequirements','BattleStatusAutoPosition','isBTB','BoostAction','isSceneBattle','enemy','requestFauxAnimation','exit','setupBattleBoostPointsMultiplier','selectNextCommand','FUNC','loadBitmap','Game_Party_partyChangeRefresh','convertBoostLessEqualEscape','setup','boostIconsheetBitmap','meetsUsableItemConditions','setToUseBoostPoints','some','border','includes','setBoostSubject','iconWidth','_actorCommandWindow','boostAddition','status','meetstoUseBoostPointsRequirement','toUseBoostPoints','BOOST_POINTS_DISPLAY_BATTLE_STATUS','return\x200','inBattle'];_0x5ae3=function(){return _0x370691;};return _0x5ae3();}const _0x592f49=_0x3e8a;(function(_0x116181,_0x54d9d2){const _0x1dbb48=_0x3e8a,_0x3e1688=_0x116181();while(!![]){try{const _0x5297d5=parseInt(_0x1dbb48(0x2ed))/0x1+parseInt(_0x1dbb48(0x21b))/0x2+parseInt(_0x1dbb48(0x2d1))/0x3*(parseInt(_0x1dbb48(0x1dc))/0x4)+-parseInt(_0x1dbb48(0x233))/0x5+parseInt(_0x1dbb48(0x1ff))/0x6*(parseInt(_0x1dbb48(0x1e0))/0x7)+parseInt(_0x1dbb48(0x23d))/0x8*(parseInt(_0x1dbb48(0x282))/0x9)+-parseInt(_0x1dbb48(0x241))/0xa;if(_0x5297d5===_0x54d9d2)break;else _0x3e1688['push'](_0x3e1688['shift']());}catch(_0x1a83e2){_0x3e1688['push'](_0x3e1688['shift']());}}}(_0x5ae3,0xd89d5));function _0x3e8a(_0xbd5ce5,_0x255a0e){const _0x5ae3b3=_0x5ae3();return _0x3e8a=function(_0x3e8ad0,_0x4c7793){_0x3e8ad0=_0x3e8ad0-0x1ab;let _0x58da5c=_0x5ae3b3[_0x3e8ad0];return _0x58da5c;},_0x3e8a(_0xbd5ce5,_0x255a0e);}var label='BoostAction',tier=tier||0x0,dependencies=[_0x592f49(0x219),'VisuMZ_1_BattleCore',_0x592f49(0x222)],pluginData=$plugins['filter'](function(_0xadcd83){const _0x4b059c=_0x592f49;return _0xadcd83[_0x4b059c(0x2a6)]&&_0xadcd83['description'][_0x4b059c(0x2a1)]('['+label+']');})[0x0];VisuMZ[label][_0x592f49(0x1f1)]=VisuMZ[label][_0x592f49(0x1f1)]||{},VisuMZ['ConvertParams']=function(_0x4a3946,_0x17279f){const _0x20488e=_0x592f49;for(const _0x562f4c in _0x17279f){if(_0x562f4c[_0x20488e(0x27d)](/(.*):(.*)/i)){const _0x5577df=String(RegExp['$1']),_0x386caf=String(RegExp['$2'])[_0x20488e(0x26d)]()[_0x20488e(0x1bd)]();let _0x1e025c,_0x59566b,_0x1b8b40;switch(_0x386caf){case'NUM':_0x1e025c=_0x17279f[_0x562f4c]!==''?Number(_0x17279f[_0x562f4c]):0x0;break;case _0x20488e(0x211):_0x59566b=_0x17279f[_0x562f4c]!==''?JSON[_0x20488e(0x267)](_0x17279f[_0x562f4c]):[],_0x1e025c=_0x59566b[_0x20488e(0x24c)](_0x3676a8=>Number(_0x3676a8));break;case _0x20488e(0x266):_0x1e025c=_0x17279f[_0x562f4c]!==''?eval(_0x17279f[_0x562f4c]):null;break;case'ARRAYEVAL':_0x59566b=_0x17279f[_0x562f4c]!==''?JSON['parse'](_0x17279f[_0x562f4c]):[],_0x1e025c=_0x59566b[_0x20488e(0x24c)](_0x4691ab=>eval(_0x4691ab));break;case'JSON':_0x1e025c=_0x17279f[_0x562f4c]!==''?JSON[_0x20488e(0x267)](_0x17279f[_0x562f4c]):'';break;case'ARRAYJSON':_0x59566b=_0x17279f[_0x562f4c]!==''?JSON[_0x20488e(0x267)](_0x17279f[_0x562f4c]):[],_0x1e025c=_0x59566b[_0x20488e(0x24c)](_0x38aca9=>JSON[_0x20488e(0x267)](_0x38aca9));break;case _0x20488e(0x297):_0x1e025c=_0x17279f[_0x562f4c]!==''?new Function(JSON['parse'](_0x17279f[_0x562f4c])):new Function(_0x20488e(0x2aa));break;case _0x20488e(0x286):_0x59566b=_0x17279f[_0x562f4c]!==''?JSON[_0x20488e(0x267)](_0x17279f[_0x562f4c]):[],_0x1e025c=_0x59566b[_0x20488e(0x24c)](_0x427ee5=>new Function(JSON[_0x20488e(0x267)](_0x427ee5)));break;case'STR':_0x1e025c=_0x17279f[_0x562f4c]!==''?String(_0x17279f[_0x562f4c]):'';break;case _0x20488e(0x2c1):_0x59566b=_0x17279f[_0x562f4c]!==''?JSON['parse'](_0x17279f[_0x562f4c]):[],_0x1e025c=_0x59566b['map'](_0x2462e9=>String(_0x2462e9));break;case _0x20488e(0x2e7):_0x1b8b40=_0x17279f[_0x562f4c]!==''?JSON[_0x20488e(0x267)](_0x17279f[_0x562f4c]):{},_0x1e025c=VisuMZ[_0x20488e(0x24e)]({},_0x1b8b40);break;case _0x20488e(0x2eb):_0x59566b=_0x17279f[_0x562f4c]!==''?JSON[_0x20488e(0x267)](_0x17279f[_0x562f4c]):[],_0x1e025c=_0x59566b['map'](_0x43d14a=>VisuMZ[_0x20488e(0x24e)]({},JSON[_0x20488e(0x267)](_0x43d14a)));break;default:continue;}_0x4a3946[_0x5577df]=_0x1e025c;}}return _0x4a3946;},(_0x5f42dc=>{const _0x369d6b=_0x592f49,_0x5e63df=_0x5f42dc['name'];for(const _0x2b14d8 of dependencies){if(!Imported[_0x2b14d8]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x5e63df,_0x2b14d8)),SceneManager['exit']();break;}}const _0x2beb69=_0x5f42dc[_0x369d6b(0x2f6)];if(_0x2beb69['match'](/\[Version[ ](.*?)\]/i)){const _0x1d91e8=Number(RegExp['$1']);_0x1d91e8!==VisuMZ[label][_0x369d6b(0x2b8)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x369d6b(0x1f9)](_0x5e63df,_0x1d91e8)),SceneManager[_0x369d6b(0x294)]());}if(_0x2beb69['match'](/\[Tier[ ](\d+)\]/i)){const _0xa09af2=Number(RegExp['$1']);_0xa09af2<tier?(alert(_0x369d6b(0x23a)['format'](_0x5e63df,_0xa09af2,tier)),SceneManager[_0x369d6b(0x294)]()):tier=Math[_0x369d6b(0x2f0)](_0xa09af2,tier);}VisuMZ[_0x369d6b(0x24e)](VisuMZ[label][_0x369d6b(0x1f1)],_0x5f42dc[_0x369d6b(0x240)]);})(pluginData),VisuMZ[_0x592f49(0x290)]['RegExp']={'BoostDamage':/<(?:BP|BOOST) (?:DMG|DAMAGE)>/i,'BoostTurns':/<(?:BP|BOOST) (?:TURN|TURNS)>/i,'BoostRepeat':/<(?:BP|BOOST) (?:REPEAT|REPEATS|HIT|HITS)>/i,'BoostAnalyze':/<(?:BP|BOOST) (?:ANALYZE|ANALYSIS)>/i,'TargetBoostPoints':/<TARGET (?:BP|BOOST POINT|BOOST POINTS): ([\+\-]\d+)>/i,'UserBoostPoints':/<USER (?:BP|BOOST POINT|BOOST POINTS): ([\+\-]\d+)>/i,'BoostGainPoints':/<(?:BP|BOOST) (?:BP|BOOST POINT|BOOST POINTS|POINT|POINTS|EFFECT|EFFECTS) (?:EFFECT|GAIN|LOSS)>/i,'Require':{'Amount':/<REQUIRE (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'GreaterEqual':/<REQUIRE >= (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Greater':/<REQUIRE > (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Equal':/<REQUIRE = (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Less':/<REQUIRE < (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'LessEqual':/<REQUIRE <= (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i},'BoostSealed':/<(?:BP|BOOST) (?:SEAL|SEALED)>/i,'BoostBattleStartRate':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) BATTLE START: (\d+)([%％])>/i,'BoostBattleStartFlat':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) BATTLE START: ([\+\-]\d+)>/i,'BoostPointsRegenRate':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) REGEN: (\d+)([%％])>/i,'BoostPointsRegenFlat':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) REGEN: ([\+\-]\d+)>/i,'EnemyBoostSkillID':/<BOOST SKILL (\d+):[ ](.*)>/i,'EnemyBoostSkillName':/<BOOST (.*):[ ](.*)>/i},ImageManager[_0x592f49(0x2ce)]=VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)]['UI'][_0x592f49(0x1b0)],ImageManager[_0x592f49(0x2d4)]=VisuMZ[_0x592f49(0x290)]['Settings']['UI'][_0x592f49(0x284)],ImageManager['boostSmooth']=VisuMZ['BoostAction'][_0x592f49(0x1f1)]['UI']['SmoothIcons'],ImageManager[_0x592f49(0x29c)]=function(){const _0x21a854=_0x592f49;if(!this[_0x21a854(0x27b)]){this[_0x21a854(0x27b)]=new Bitmap();const _0x26c392=ImageManager[_0x21a854(0x1f7)]('IconSet');_0x26c392[_0x21a854(0x1ad)](this[_0x21a854(0x247)]['bind'](this,_0x26c392));}return this['_boostIconSheet'];},ImageManager[_0x592f49(0x247)]=function(_0x56cacf){const _0x4fbc2b=_0x592f49;this[_0x4fbc2b(0x27b)][_0x4fbc2b(0x1f2)](_0x56cacf[_0x4fbc2b(0x212)],_0x56cacf[_0x4fbc2b(0x1ae)]),this[_0x4fbc2b(0x27b)][_0x4fbc2b(0x217)](_0x56cacf,0x0,0x0,_0x56cacf[_0x4fbc2b(0x212)],_0x56cacf[_0x4fbc2b(0x1ae)],0x0,0x0),this[_0x4fbc2b(0x27b)][_0x4fbc2b(0x234)]=ImageManager[_0x4fbc2b(0x27a)],this['_boostIconSheet'][_0x4fbc2b(0x21a)]=![];},TextManager[_0x592f49(0x231)]=VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)]['UI'][_0x592f49(0x2cf)],TextManager[_0x592f49(0x1eb)]=VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)]['UI'][_0x592f49(0x258)],VisuMZ['BoostAction'][_0x592f49(0x2ca)]=BattleManager[_0x592f49(0x29b)],BattleManager[_0x592f49(0x29b)]=function(_0xf29a70,_0x583b2e,_0x5147ee){const _0x5457f3=_0x592f49;VisuMZ[_0x5457f3(0x290)][_0x5457f3(0x2ca)][_0x5457f3(0x259)](this,_0xf29a70,_0x583b2e,_0x5147ee),$gameParty['setupBattleBoostPoints'](),$gameTroop[_0x5457f3(0x23b)]();},VisuMZ[_0x592f49(0x290)][_0x592f49(0x2d8)]=BattleManager[_0x592f49(0x25d)],BattleManager['processTurn']=function(){const _0x6d53ae=_0x592f49;this[_0x6d53ae(0x257)](),VisuMZ[_0x6d53ae(0x290)][_0x6d53ae(0x2d8)][_0x6d53ae(0x259)](this);},BattleManager[_0x592f49(0x257)]=function(){const _0x12a092=_0x592f49;var _0xc6c0a4=this[_0x12a092(0x276)],_0x284002=_0xc6c0a4[_0x12a092(0x2e2)]();!!_0xc6c0a4&&_0xc6c0a4[_0x12a092(0x26a)]()&&!!_0x284002&&_0x284002[_0x12a092(0x1c8)]()&&_0xc6c0a4[_0x12a092(0x2c7)]()>0x0&&!_0xc6c0a4[_0x12a092(0x1ce)]()&&_0xc6c0a4[_0x12a092(0x229)](_0x284002['item']());},BattleManager['allowBoostAction']=function(){const _0x2d0ccc=_0x592f49;if(Imported[_0x2d0ccc(0x218)]&&this[_0x2d0ccc(0x28f)]())return![];return!![];},VisuMZ[_0x592f49(0x290)][_0x592f49(0x1df)]=Game_Action['prototype'][_0x592f49(0x26c)],Game_Action[_0x592f49(0x28c)][_0x592f49(0x26c)]=function(){const _0x17a9e4=_0x592f49;var _0x516547=VisuMZ[_0x17a9e4(0x290)][_0x17a9e4(0x1df)][_0x17a9e4(0x259)](this);_0x516547=this['applyBoostPointRepeats'](_0x516547);return Math[_0x17a9e4(0x2ac)](_0x516547);;},Game_Action[_0x592f49(0x28c)][_0x592f49(0x1e9)]=function(_0x14996a){const _0x31cacc=_0x592f49,_0x4dbd36=VisuMZ['BoostAction'][_0x31cacc(0x263)];if(!!this['subject']()&&!!this['item']()&&this[_0x31cacc(0x2ad)]()[_0x31cacc(0x1bf)][_0x31cacc(0x27d)](_0x4dbd36[_0x31cacc(0x1ed)])){var _0x22c373=this[_0x31cacc(0x24a)]()[_0x31cacc(0x2ea)](_0x31cacc(0x1cd));_0x14996a=Math[_0x31cacc(0x2ac)](_0x14996a*_0x22c373),_0x14996a+=this[_0x31cacc(0x24a)]()['boostAddition'](_0x31cacc(0x1cd));}return _0x14996a;},VisuMZ['BoostAction'][_0x592f49(0x235)]=Game_Action['prototype'][_0x592f49(0x2de)],Game_Action[_0x592f49(0x28c)][_0x592f49(0x2de)]=function(_0x5925df,_0x4c2525){const _0x24f540=_0x592f49;return _0x5925df=this[_0x24f540(0x2cc)](_0x5925df),VisuMZ[_0x24f540(0x290)]['Game_Action_applyGuard'][_0x24f540(0x259)](this,_0x5925df,_0x4c2525);},Game_Action[_0x592f49(0x28c)][_0x592f49(0x2cc)]=function(_0x445beb){const _0x36141a=_0x592f49,_0x1e67f6=VisuMZ[_0x36141a(0x290)][_0x36141a(0x263)];if(!!this['subject']()&&this[_0x36141a(0x2ad)]()[_0x36141a(0x1bf)]['match'](_0x1e67f6[_0x36141a(0x2c2)])){var _0x10fbc1=this['subject']()[_0x36141a(0x2ea)]('Damage');_0x445beb=Math[_0x36141a(0x2ac)](_0x445beb*_0x10fbc1),_0x445beb+=this[_0x36141a(0x24a)]()['boostAddition'](_0x36141a(0x226));}return _0x445beb;},VisuMZ['BoostAction'][_0x592f49(0x271)]=Game_Action[_0x592f49(0x28c)][_0x592f49(0x1b6)],Game_Action[_0x592f49(0x28c)][_0x592f49(0x1b6)]=function(_0x145593){const _0x5b5aae=_0x592f49;this[_0x5b5aae(0x25f)](![]),VisuMZ[_0x5b5aae(0x290)][_0x5b5aae(0x271)][_0x5b5aae(0x259)](this,_0x145593),this['applyBoostPointTurns'](!![]);},Game_Action[_0x592f49(0x28c)][_0x592f49(0x25f)]=function(_0x174677){const _0x58e83d=_0x592f49,_0x5f15a1=VisuMZ[_0x58e83d(0x290)]['RegExp'];if(!!this[_0x58e83d(0x24a)]()&&this['item']()['note'][_0x58e83d(0x27d)](_0x5f15a1[_0x58e83d(0x242)])){var _0x3a7741=this[_0x58e83d(0x24a)]()[_0x58e83d(0x2ea)](_0x58e83d(0x1b7));$gameTemp[_0x58e83d(0x1b4)]=_0x3a7741,$gameTemp['_bpTurnFlat']=this['subject']()['boostAddition']('Turn');}_0x174677&&($gameTemp[_0x58e83d(0x1b4)]=undefined,$gameTemp[_0x58e83d(0x237)]=undefined);},VisuMZ['BoostAction'][_0x592f49(0x2c6)]=Game_Action[_0x592f49(0x28c)]['applyItemUserEffect'],Game_Action['prototype'][_0x592f49(0x281)]=function(_0x4aabec){const _0x55505f=_0x592f49;VisuMZ[_0x55505f(0x290)][_0x55505f(0x2c6)][_0x55505f(0x259)](this,_0x4aabec),this[_0x55505f(0x224)](_0x4aabec);},Game_Action[_0x592f49(0x28c)]['applyBPEffects']=function(_0xc4e3f8){const _0x67b79=_0x592f49,_0x497118=VisuMZ['BoostAction'][_0x67b79(0x263)];if(!!_0xc4e3f8&&this[_0x67b79(0x2ad)]()[_0x67b79(0x1bf)][_0x67b79(0x27d)](_0x497118[_0x67b79(0x20a)])){var _0x2658e8=parseInt(RegExp['$1']);this['item']()[_0x67b79(0x1bf)]['match'](_0x497118[_0x67b79(0x23f)])&&(_0x2658e8=Math[_0x67b79(0x2ac)](this[_0x67b79(0x24a)]()[_0x67b79(0x2ea)](_0x67b79(0x2dd))*_0x2658e8),_0x2658e8+=this[_0x67b79(0x24a)]()[_0x67b79(0x2a5)](_0x67b79(0x2dd))),_0xc4e3f8['gainStoredBoostPoints'](_0x2658e8);}if(!!this[_0x67b79(0x24a)]()&&this[_0x67b79(0x2ad)]()[_0x67b79(0x1bf)][_0x67b79(0x27d)](_0x497118[_0x67b79(0x2b9)])){var _0x2658e8=parseInt(RegExp['$1']);this['item']()[_0x67b79(0x1bf)]['match'](_0x497118[_0x67b79(0x23f)])&&(_0x2658e8=Math[_0x67b79(0x2ac)](this[_0x67b79(0x24a)]()[_0x67b79(0x2ea)](_0x67b79(0x2dd))*_0x2658e8),_0x2658e8+=this['subject']()['boostAddition'](_0x67b79(0x2dd))),this[_0x67b79(0x24a)]()[_0x67b79(0x1c2)](_0x2658e8);}},Game_BattlerBase['BOOST_POINTS_MAX_STORED']=VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)]['Mechanics']['MaxStored'],Game_BattlerBase[_0x592f49(0x248)]=VisuMZ['BoostAction'][_0x592f49(0x1f1)][_0x592f49(0x1fb)][_0x592f49(0x260)],Game_BattlerBase[_0x592f49(0x270)]=VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)][_0x592f49(0x1fb)][_0x592f49(0x1d1)],Game_BattlerBase[_0x592f49(0x1d0)]=VisuMZ[_0x592f49(0x290)]['Settings'][_0x592f49(0x1fb)][_0x592f49(0x2b4)],Game_BattlerBase['BOOST_POINTS_REGEN_ALWAYS']=VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)][_0x592f49(0x1fb)][_0x592f49(0x249)],Game_BattlerBase[_0x592f49(0x207)]=VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)][_0x592f49(0x1fb)][_0x592f49(0x280)],Game_BattlerBase[_0x592f49(0x2ae)]=VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)][_0x592f49(0x1fb)][_0x592f49(0x1af)],VisuMZ[_0x592f49(0x290)][_0x592f49(0x2c3)]=Game_BattlerBase[_0x592f49(0x28c)][_0x592f49(0x2e8)],Game_BattlerBase[_0x592f49(0x28c)][_0x592f49(0x2e8)]=function(){const _0x10f464=_0x592f49;VisuMZ[_0x10f464(0x290)][_0x10f464(0x2c3)][_0x10f464(0x259)](this),this[_0x10f464(0x1da)]();},Game_BattlerBase['prototype'][_0x592f49(0x1da)]=function(){const _0xbc61d0=_0x592f49;this[_0xbc61d0(0x2d0)]=this[_0xbc61d0(0x2d0)]||0x0,this[_0xbc61d0(0x2c9)]=this[_0xbc61d0(0x2c9)]||0x0,this[_0xbc61d0(0x2e3)]=this[_0xbc61d0(0x2e3)]||0x0;},Game_BattlerBase[_0x592f49(0x28c)][_0x592f49(0x2c7)]=function(){const _0x136dfb=_0x592f49;return this[_0x136dfb(0x2d0)]===undefined&&this['initBoostAction'](),this[_0x136dfb(0x2d0)];},Game_BattlerBase['prototype'][_0x592f49(0x1b9)]=function(_0x83bbf1){const _0x4b4782=_0x592f49;this[_0x4b4782(0x2d0)]===undefined&&this['initBoostAction'](),_0x83bbf1=Math[_0x4b4782(0x2ac)](_0x83bbf1),this[_0x4b4782(0x2d0)]=_0x83bbf1[_0x4b4782(0x202)](0x0,Game_BattlerBase[_0x4b4782(0x254)]),this[_0x4b4782(0x225)]();},Game_BattlerBase[_0x592f49(0x28c)][_0x592f49(0x2a8)]=function(){return this['_toUseBoostPoints']===undefined&&this['initBoostAction'](),this['_toUseBoostPoints'];},Game_BattlerBase['prototype'][_0x592f49(0x29e)]=function(_0x4c163d){const _0x3ae5fc=_0x592f49;this[_0x3ae5fc(0x2c9)]===undefined&&this[_0x3ae5fc(0x1da)](),_0x4c163d=Math[_0x3ae5fc(0x2ac)](_0x4c163d),this[_0x3ae5fc(0x2c9)]=_0x4c163d[_0x3ae5fc(0x202)](0x0,Game_BattlerBase['BOOST_POINTS_MAX_TOUSE']),this[_0x3ae5fc(0x225)]();},Game_BattlerBase['prototype'][_0x592f49(0x239)]=function(){const _0x25107b=_0x592f49;if(!Game_BattlerBase[_0x25107b(0x270)]&&(this[_0x25107b(0x289)]()||this[_0x25107b(0x1d8)]()))return 0x0;else{var _0x11f835=Game_BattlerBase['BOOST_POINTS_TURN_REGEN'];return _0x11f835=this[_0x25107b(0x1fa)](_0x11f835),_0x11f835=this['bpRegenAdded'](_0x11f835),_0x11f835;}},Game_BattlerBase[_0x592f49(0x28c)][_0x592f49(0x1ce)]=function(){const _0xd5ed0f=_0x592f49,_0x345cf1=this[_0xd5ed0f(0x1b2)](),_0x1bd923=VisuMZ[_0xd5ed0f(0x290)][_0xd5ed0f(0x263)];return _0x345cf1[_0xd5ed0f(0x29f)](_0x5dcaec=>_0x5dcaec&&_0x5dcaec[_0xd5ed0f(0x1bf)][_0xd5ed0f(0x27d)](_0x1bd923['BoostSealed']));},VisuMZ[_0x592f49(0x290)]['Game_BattlerBase_resetStateCounts']=Game_BattlerBase[_0x592f49(0x28c)][_0x592f49(0x20b)],Game_BattlerBase[_0x592f49(0x28c)][_0x592f49(0x20b)]=function(_0x5d6ffb){const _0x3c76ac=_0x592f49;var _0xb04eb9=this['_stateTurns'][_0x5d6ffb]||0x0;VisuMZ[_0x3c76ac(0x290)][_0x3c76ac(0x2d3)][_0x3c76ac(0x259)](this,_0x5d6ffb);if(!!$gameTemp['_bpTurnRate']){$gameTemp[_0x3c76ac(0x237)]=$gameTemp[_0x3c76ac(0x237)]||0x0;var _0x596d5e=$dataStates[_0x5d6ffb],_0x40558=Math['round'](_0x596d5e[_0x3c76ac(0x22b)]*$gameTemp[_0x3c76ac(0x1b4)])+$gameTemp[_0x3c76ac(0x237)],_0x457e41=Math[_0x3c76ac(0x2ac)](_0x596d5e['minTurns']*$gameTemp[_0x3c76ac(0x1b4)])+$gameTemp[_0x3c76ac(0x237)],_0x504da5=0x1+Math['max'](_0x40558-_0x457e41,0x0);const _0x11503f=this[_0x3c76ac(0x1d5)](_0x596d5e)['toLowerCase']()[_0x3c76ac(0x1bd)]();switch(_0x11503f){case _0x3c76ac(0x1e2):this[_0x3c76ac(0x210)][_0x5d6ffb]=_0x457e41+Math[_0x3c76ac(0x221)](_0x504da5);break;case'greater':const _0x21d44d=this[_0x3c76ac(0x210)][_0x5d6ffb],_0x1c0965=_0x457e41+Math[_0x3c76ac(0x221)](_0x504da5);this[_0x3c76ac(0x210)][_0x5d6ffb]=Math[_0x3c76ac(0x2f0)](_0x21d44d,_0x1c0965);break;case _0x3c76ac(0x22d):this[_0x3c76ac(0x210)][_0x5d6ffb]=_0x457e41+Math['randomInt'](_0x504da5)+_0xb04eb9;break;}}},VisuMZ[_0x592f49(0x290)]['Game_BattlerBase_meetsUsableItemConditions']=Game_BattlerBase[_0x592f49(0x28c)][_0x592f49(0x29d)],Game_BattlerBase[_0x592f49(0x28c)]['meetsUsableItemConditions']=function(_0x5b69af){const _0x3e754e=_0x592f49;return VisuMZ[_0x3e754e(0x290)][_0x3e754e(0x213)][_0x3e754e(0x259)](this,_0x5b69af)?this[_0x3e754e(0x2a7)](_0x5b69af):![];},Game_BattlerBase[_0x592f49(0x28c)]['meetstoUseBoostPointsRequirement']=function(_0x13bbfb){const _0x555994=_0x592f49,_0x5d3a0e=VisuMZ['BoostAction'][_0x555994(0x263)];var _0xd6b6f5=_0x13bbfb[_0x555994(0x1bf)];if(_0xd6b6f5[_0x555994(0x27d)](_0x5d3a0e[_0x555994(0x204)][_0x555994(0x268)])||_0xd6b6f5[_0x555994(0x27d)](_0x5d3a0e[_0x555994(0x204)][_0x555994(0x1ca)])){var _0x28819d=parseInt(RegExp['$1']);return this[_0x555994(0x2f9)]()?this['toUseBoostPoints']()>=_0x28819d:this[_0x555994(0x2c7)]()>=_0x28819d;}else{if(_0x13bbfb[_0x555994(0x1bf)][_0x555994(0x27d)](_0x5d3a0e['Require']['GreaterEqual'])){var _0x28819d=parseInt(RegExp['$1']);return this[_0x555994(0x2f9)]()?this[_0x555994(0x2a8)]()>_0x28819d:this[_0x555994(0x2c7)]()>_0x28819d;}else{if(_0x13bbfb['note'][_0x555994(0x27d)](_0x5d3a0e[_0x555994(0x204)][_0x555994(0x21e)])){var _0x28819d=parseInt(RegExp['$1']);return this[_0x555994(0x2f9)]()?this[_0x555994(0x2a8)]()===_0x28819d:this['storedBoostPoints']()===_0x28819d;}else{if(_0x13bbfb[_0x555994(0x1bf)][_0x555994(0x27d)](_0x5d3a0e['Require'][_0x555994(0x216)])){var _0x28819d=parseInt(RegExp['$1']);return this[_0x555994(0x2f9)]()?this['toUseBoostPoints']()<_0x28819d:this['storedBoostPoints']()<_0x28819d;}else{if(_0x13bbfb[_0x555994(0x1bf)][_0x555994(0x27d)](_0x5d3a0e['Require'][_0x555994(0x209)])){var _0x28819d=parseInt(RegExp['$1']);return this[_0x555994(0x2f9)]()?this['toUseBoostPoints']()<=_0x28819d:this[_0x555994(0x2c7)]()<=_0x28819d;}else return!![];}}}}},Game_Battler[_0x592f49(0x1f4)]={'Damage':VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)][_0x592f49(0x1fb)][_0x592f49(0x245)],'Turn':VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)]['Mechanics'][_0x592f49(0x2d9)],'Repeat':VisuMZ['BoostAction'][_0x592f49(0x1f1)][_0x592f49(0x1fb)]['RepeatMultiply'],'BpEffect':VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)][_0x592f49(0x1fb)][_0x592f49(0x1ac)],'Analyze':VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)][_0x592f49(0x1fb)][_0x592f49(0x1f0)]},Game_Battler['BOOST_POINTS_ADDITION']={'Damage':VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)][_0x592f49(0x1fb)][_0x592f49(0x246)],'Turn':VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)][_0x592f49(0x1fb)][_0x592f49(0x269)],'Repeat':VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)]['Mechanics'][_0x592f49(0x2bb)],'BpEffect':VisuMZ['BoostAction'][_0x592f49(0x1f1)][_0x592f49(0x1fb)][_0x592f49(0x2f1)],'Analyze':VisuMZ['BoostAction'][_0x592f49(0x1f1)][_0x592f49(0x1fb)][_0x592f49(0x22c)]},Game_Battler[_0x592f49(0x2f5)]=VisuMZ[_0x592f49(0x290)]['Settings'][_0x592f49(0x1fb)]['Animations'],Game_Battler[_0x592f49(0x28c)][_0x592f49(0x1c2)]=function(_0x2d54c1){const _0x550364=_0x592f49;this[_0x550364(0x1b9)](this[_0x550364(0x2c7)]()+_0x2d54c1);},Game_Battler[_0x592f49(0x28c)][_0x592f49(0x2d6)]=function(_0x1649f3){const _0x14c667=_0x592f49;this[_0x14c667(0x29e)](this[_0x14c667(0x2a8)]()+_0x1649f3);},Game_Battler[_0x592f49(0x28c)][_0x592f49(0x2ea)]=function(_0x3c2953){const _0x242924=_0x592f49,_0xe59017=Game_Battler[_0x242924(0x1f4)];if(_0x3c2953[_0x242924(0x27d)](/Damage/i))var _0x41a51a=_0xe59017[_0x242924(0x226)];else{if(_0x3c2953[_0x242924(0x27d)](/Turn/i))var _0x41a51a=_0xe59017[_0x242924(0x1b7)];else{if(_0x3c2953['match'](/Repeat/i))var _0x41a51a=_0xe59017[_0x242924(0x1cd)];else{if(_0x3c2953['match'](/BP Effect/i))var _0x41a51a=_0xe59017[_0x242924(0x2b7)];else{if(_0x3c2953[_0x242924(0x27d)](/Analyze/i))var _0x41a51a=_0xe59017[_0x242924(0x2e6)];else return this['toUseBoostPoints']();}}}}var _0x44ba54=this['toUseBoostPoints']();return _0x41a51a[_0x44ba54]||_0x41a51a[0x0];},Game_Battler[_0x592f49(0x28c)][_0x592f49(0x2a5)]=function(_0x32b08c){const _0x304eb5=_0x592f49,_0x36ed48=Game_Battler[_0x304eb5(0x227)];if(_0x32b08c['match'](/Damage/i))var _0x3da9ba=_0x36ed48[_0x304eb5(0x226)];else{if(_0x32b08c[_0x304eb5(0x27d)](/Turn/i))var _0x3da9ba=_0x36ed48[_0x304eb5(0x1b7)];else{if(_0x32b08c['match'](/Repeat/i))var _0x3da9ba=_0x36ed48[_0x304eb5(0x1cd)];else{if(_0x32b08c[_0x304eb5(0x27d)](/BP Effect/i))var _0x3da9ba=_0x36ed48[_0x304eb5(0x2b7)];else{if(_0x32b08c[_0x304eb5(0x27d)](/Analyze/i))var _0x3da9ba=_0x36ed48['Analyze'];else return this[_0x304eb5(0x2a8)]();}}}}var _0x882a1e=this[_0x304eb5(0x2a8)]();return parseInt(_0x3da9ba[_0x882a1e]||_0x3da9ba[0x0]);},Game_Battler[_0x592f49(0x28c)]['setupBattleBoostPoints']=function(){const _0x53994d=_0x592f49;if(this[_0x53994d(0x21c)]){this[_0x53994d(0x21c)]=undefined;return;}var _0x349c3c=Game_BattlerBase[_0x53994d(0x2ae)];_0x349c3c=this[_0x53994d(0x295)](_0x349c3c),_0x349c3c=this['setupBattleBoostPointsAdded'](_0x349c3c),_0x349c3c=Math[_0x53994d(0x2ac)](_0x349c3c),this[_0x53994d(0x1b9)](_0x349c3c);},Game_Battler[_0x592f49(0x28c)][_0x592f49(0x295)]=function(_0xb9c6ba){const _0x4a7465=_0x592f49,_0x3c9bd2=this[_0x4a7465(0x1b2)](),_0x52dd15=VisuMZ['BoostAction'][_0x4a7465(0x263)];for(const _0x1344b8 of _0x3c9bd2){if(!_0x1344b8)continue;_0x1344b8['note'][_0x4a7465(0x27d)](_0x52dd15[_0x4a7465(0x1c0)])&&(_0xb9c6ba*=Number(RegExp['$1'])*0.01);}return _0xb9c6ba;},Game_Battler[_0x592f49(0x28c)][_0x592f49(0x2b6)]=function(_0x476efb){const _0x4d0d32=_0x592f49,_0x52e387=this[_0x4d0d32(0x1b2)](),_0x190c98=VisuMZ[_0x4d0d32(0x290)][_0x4d0d32(0x263)];for(const _0xca472a of _0x52e387){if(!_0xca472a)continue;_0xca472a['note'][_0x4d0d32(0x27d)](_0x190c98[_0x4d0d32(0x23c)])&&(_0x476efb+=Number(RegExp['$1']));}return _0x476efb;},Game_Battler[_0x592f49(0x28c)][_0x592f49(0x2e9)]=function(_0x4bf4f4){const _0x4d5569=_0x592f49;var _0x34e5e1=this[_0x4d5569(0x2a8)]()[_0x4d5569(0x202)](0x0,Game_BattlerBase[_0x4d5569(0x248)]);const _0x2d703b=Game_Battler['BOOST_POINTS_ANIMATIONS'];var _0x4d97b6=Number(_0x2d703b[_0x34e5e1]||_0x2d703b[0x0]);if(_0x4d97b6>0x0){const _0x3b0b68=VisuMZ['BoostAction']['Settings'][_0x4d5569(0x1fb)],_0x5b0644=_0x4bf4f4?_0x3b0b68[_0x4d5569(0x1ee)]||![]:_0x3b0b68[_0x4d5569(0x20f)]||![],_0xf03922=_0x4bf4f4?_0x3b0b68[_0x4d5569(0x21d)]||![]:_0x3b0b68[_0x4d5569(0x1b3)]||![];$gameTemp[_0x4d5569(0x293)]([this],_0x4d97b6,_0x5b0644,_0xf03922);}},Game_Battler[_0x592f49(0x28c)][_0x592f49(0x261)]=function(){const _0x24ed4a=_0x592f49;if(this[_0x24ed4a(0x1ce)]())return![];return this[_0x24ed4a(0x2a8)]()<Game_BattlerBase[_0x24ed4a(0x248)]&&this[_0x24ed4a(0x2c7)]()>0x0;},Game_Battler[_0x592f49(0x28c)]['canUndoBoostPoints']=function(){const _0x3f4776=_0x592f49;return this[_0x3f4776(0x2a8)]()>0x0;},VisuMZ[_0x592f49(0x290)][_0x592f49(0x201)]=Game_Battler[_0x592f49(0x28c)][_0x592f49(0x214)],Game_Battler[_0x592f49(0x28c)]['removeBattleStates']=function(){const _0x2a19ac=_0x592f49;VisuMZ['BoostAction'][_0x2a19ac(0x201)][_0x2a19ac(0x259)](this),this['_storedBoostPoints']=0x0,this[_0x2a19ac(0x2c9)]=0x0;},VisuMZ[_0x592f49(0x290)][_0x592f49(0x285)]=Game_Battler[_0x592f49(0x28c)][_0x592f49(0x253)],Game_Battler['prototype']['regenerateTp']=function(){const _0x136fe9=_0x592f49;VisuMZ['BoostAction'][_0x136fe9(0x285)]['call'](this),this['regenerateBoostPoints']();},VisuMZ[_0x592f49(0x290)][_0x592f49(0x203)]=Game_Battler[_0x592f49(0x28c)]['regenerateAll'],Game_Battler['prototype']['regenerateAll']=function(){const _0x41b3b2=_0x592f49;VisuMZ['BoostAction'][_0x41b3b2(0x203)][_0x41b3b2(0x259)](this),Game_BattlerBase[_0x41b3b2(0x270)]&&this[_0x41b3b2(0x289)]()&&$gameParty[_0x41b3b2(0x2ab)]()&&this['regenerateBoostPoints']();},Game_Battler[_0x592f49(0x28c)]['regenerateBoostPoints']=function(){const _0x1d0e98=_0x592f49;(Game_BattlerBase[_0x1d0e98(0x1d9)]||this['_turnUsedBoostPoints']<=0x0)&&this[_0x1d0e98(0x1c2)](this[_0x1d0e98(0x239)]()),this[_0x1d0e98(0x2e3)]=0x0;},VisuMZ[_0x592f49(0x290)][_0x592f49(0x262)]=BattleManager[_0x592f49(0x275)],BattleManager[_0x592f49(0x275)]=function(){const _0x5e22db=_0x592f49;this[_0x5e22db(0x276)]&&this['_subject'][_0x5e22db(0x2dc)](),VisuMZ[_0x5e22db(0x290)]['BattleManager_endAction']['call'](this);},Game_Battler[_0x592f49(0x28c)][_0x592f49(0x2dc)]=function(){const _0x1f832d=_0x592f49;if(Imported[_0x1f832d(0x1f5)]&&$gameTemp[_0x1f832d(0x265)]())return;this[_0x1f832d(0x2e3)]+=this[_0x1f832d(0x2a8)](),this['setToUseBoostPoints'](0x0);},Game_Battler[_0x592f49(0x28c)][_0x592f49(0x1fa)]=function(_0x46a224){const _0x49fdc4=_0x592f49,_0xb8f526=this[_0x49fdc4(0x1b2)](),_0x44df3d=VisuMZ[_0x49fdc4(0x290)][_0x49fdc4(0x263)];for(const _0x40a5f3 of _0xb8f526){if(!_0x40a5f3)continue;_0x40a5f3[_0x49fdc4(0x1bf)][_0x49fdc4(0x27d)](_0x44df3d['BoostPointsRegenRate'])&&(_0x46a224*=Number(RegExp['$1'])*0.01);}return _0x46a224;},Game_Battler[_0x592f49(0x28c)][_0x592f49(0x2d2)]=function(_0x3c57f0){const _0x5e467d=_0x592f49,_0x104034=this[_0x5e467d(0x1b2)](),_0x14ecd1=VisuMZ[_0x5e467d(0x290)][_0x5e467d(0x263)];for(const _0x3d9a04 of _0x104034){if(!_0x3d9a04)continue;_0x3d9a04[_0x5e467d(0x1bf)][_0x5e467d(0x27d)](_0x14ecd1[_0x5e467d(0x1cf)])&&(_0x3c57f0+=Number(RegExp['$1']));}return _0x3c57f0;},VisuMZ[_0x592f49(0x290)]['Game_Battler_addState']=Game_Battler[_0x592f49(0x28c)][_0x592f49(0x2cb)],Game_Battler['prototype'][_0x592f49(0x2cb)]=function(_0x10eec9){const _0x6f9c91=_0x592f49;var _0x2156f1=this[_0x6f9c91(0x289)]();VisuMZ[_0x6f9c91(0x290)]['Game_Battler_addState'][_0x6f9c91(0x259)](this,_0x10eec9),Game_BattlerBase[_0x6f9c91(0x1d0)]&&!_0x2156f1&&this[_0x6f9c91(0x289)]()&&this[_0x6f9c91(0x1b9)](0x0);},VisuMZ[_0x592f49(0x290)][_0x592f49(0x28b)]=Game_Battler[_0x592f49(0x28c)]['addBuff'],Game_Battler[_0x592f49(0x28c)][_0x592f49(0x1be)]=function(_0x1a1c51,_0x483259){const _0x511cbc=_0x592f49;!!$gameTemp[_0x511cbc(0x1b4)]&&($gameTemp[_0x511cbc(0x237)]=$gameTemp['_bpTurnFlat']||0x0,_0x483259=Math['round']($gameTemp[_0x511cbc(0x1b4)]*_0x483259)+$gameTemp[_0x511cbc(0x237)]),VisuMZ[_0x511cbc(0x290)][_0x511cbc(0x28b)][_0x511cbc(0x259)](this,_0x1a1c51,_0x483259);},VisuMZ[_0x592f49(0x290)][_0x592f49(0x2ef)]=Game_Battler[_0x592f49(0x28c)][_0x592f49(0x1bb)],Game_Battler['prototype'][_0x592f49(0x1bb)]=function(_0x3c5a9d,_0x588ee8){const _0x4aa73e=_0x592f49;!!$gameTemp[_0x4aa73e(0x1b4)]&&($gameTemp[_0x4aa73e(0x237)]=$gameTemp['_bpTurnFlat']||0x0,_0x588ee8=Math['round']($gameTemp['_bpTurnRate']*_0x588ee8)+$gameTemp['_bpTurnFlat']),VisuMZ[_0x4aa73e(0x290)][_0x4aa73e(0x2ef)][_0x4aa73e(0x259)](this,_0x3c5a9d,_0x588ee8);},Game_Enemy[_0x592f49(0x238)]=VisuMZ[_0x592f49(0x290)]['Settings'][_0x592f49(0x1fb)][_0x592f49(0x20d)],VisuMZ[_0x592f49(0x290)]['Game_Enemy_setup']=Game_Enemy[_0x592f49(0x28c)][_0x592f49(0x29b)],Game_Enemy['prototype']['setup']=function(_0x3522f7,_0x3b24e7,_0x529b19){const _0x21b3dd=_0x592f49;VisuMZ[_0x21b3dd(0x290)][_0x21b3dd(0x288)][_0x21b3dd(0x259)](this,_0x3522f7,_0x3b24e7,_0x529b19),this[_0x21b3dd(0x223)]();},Game_Enemy[_0x592f49(0x28c)][_0x592f49(0x223)]=function(){const _0x40dc36=_0x592f49,_0x41adf1=VisuMZ[_0x40dc36(0x290)][_0x40dc36(0x263)];if(this[_0x40dc36(0x292)]()[_0x40dc36(0x1b5)]===undefined){this[_0x40dc36(0x292)]()[_0x40dc36(0x1b5)]={};var _0x4727a2=this[_0x40dc36(0x292)]()[_0x40dc36(0x1bf)]['split'](/[\r\n]+/);for(var _0x1607e5=0x0;_0x1607e5<_0x4727a2[_0x40dc36(0x1fd)];_0x1607e5++){var _0x2b8fdc=_0x4727a2[_0x1607e5];if(_0x2b8fdc[_0x40dc36(0x27d)](_0x41adf1['EnemyBoostSkillID'])){var _0x3f15fd='Skill\x20'+parseInt(RegExp['$1']),_0x2408ea=String(RegExp['$2'])[_0x40dc36(0x1bc)]();this[_0x40dc36(0x292)]()[_0x40dc36(0x1b5)][_0x3f15fd]=_0x2408ea;}else{if(_0x2b8fdc[_0x40dc36(0x27d)](_0x41adf1[_0x40dc36(0x2e5)])){var _0x43a39c=String(RegExp['$1']),_0x2408ea=String(RegExp['$2'])[_0x40dc36(0x1bc)]();this[_0x40dc36(0x292)]()[_0x40dc36(0x1b5)][_0x43a39c]=_0x2408ea;}}}}},Game_Enemy[_0x592f49(0x28c)][_0x592f49(0x229)]=function(_0x32df07){const _0x212f92=_0x592f49;this[_0x212f92(0x223)]();var _0x10ac7=this['calculateBPtoUse'](_0x32df07);_0x10ac7>0x0&&(this[_0x212f92(0x26e)](_0x10ac7),this[_0x212f92(0x2e9)]());},Game_Enemy[_0x592f49(0x28c)][_0x592f49(0x1d7)]=function(_0x436d9c){const _0x4a37aa=_0x592f49;if(this[_0x4a37aa(0x2c7)]()<=0x0)return 0x0;var _0x1a763e=_0x436d9c[_0x4a37aa(0x1c7)],_0x13e88c=_0x4a37aa(0x274)+_0x436d9c['id'],_0x46819d=0x0;if(this['enemy']()[_0x4a37aa(0x1b5)][_0x1a763e]||this[_0x4a37aa(0x292)]()[_0x4a37aa(0x1b5)][_0x13e88c]){var _0x492762=this[_0x4a37aa(0x292)]()[_0x4a37aa(0x1b5)][_0x1a763e]||this['enemy']()[_0x4a37aa(0x1b5)][_0x13e88c];if(_0x492762['match'](/(?:ALL|FULL)/i))_0x46819d=this[_0x4a37aa(0x2c7)]();else{if(_0x492762[_0x4a37aa(0x27d)](/AT LEAST (\d+)/i)){var _0x1f7c50=parseInt(RegExp['$1']);this[_0x4a37aa(0x2c7)]()>=_0x1f7c50&&(_0x46819d=this['storedBoostPoints']());}else{if(_0x492762[_0x4a37aa(0x27d)](/AT MOST (\d+)/i)){var _0x1f7c50=parseInt(RegExp['$1']);this['storedBoostPoints']()<=_0x1f7c50&&(_0x46819d=this[_0x4a37aa(0x2c7)]());}else{if(_0x492762['match'](/EXACTLY (\d+)/i)){var _0x1f7c50=parseInt(RegExp['$1']);this[_0x4a37aa(0x2c7)]()===_0x1f7c50&&(_0x46819d=_0x1f7c50);}}}}}return _0x46819d['clamp'](0x0,Game_BattlerBase[_0x4a37aa(0x248)]);},Game_Enemy[_0x592f49(0x28c)][_0x592f49(0x26e)]=function(_0x3aedda){const _0x4392c1=_0x592f49;_0x3aedda=_0x3aedda[_0x4392c1(0x202)](0x0,this['storedBoostPoints']()),_0x3aedda=_0x3aedda[_0x4392c1(0x202)](0x0,Game_BattlerBase['BOOST_POINTS_MAX_TOUSE']),this[_0x4392c1(0x1c2)](-_0x3aedda),this[_0x4392c1(0x2d6)](_0x3aedda);},Game_Enemy[_0x592f49(0x28c)][_0x592f49(0x2e9)]=function(){const _0x471b27=_0x592f49;var _0x14a4f0=0x0,_0x2049d2=this['toUseBoostPoints']()['clamp'](0x0,Game_BattlerBase[_0x471b27(0x248)]);const _0x1aaf51=Game_Battler[_0x471b27(0x2f5)],_0x4f6b41=Game_Enemy[_0x471b27(0x238)],_0x146cd1=0x3e8/0x3c;for(var _0x5c1d43=0x1;_0x5c1d43<=_0x2049d2;_0x5c1d43++){var _0x246327=_0x1aaf51[_0x5c1d43]||_0x1aaf51[0x0];if(_0x246327>0x0){let _0xf4679c=_0x4f6b41*(_0x5c1d43-0x1);setTimeout($gameTemp[_0x471b27(0x293)]['bind']($gameTemp,[this],_0x246327,![],![]),_0xf4679c);}_0x14a4f0+=_0x4f6b41/_0x146cd1;}_0x14a4f0=Math[_0x471b27(0x28a)](_0x14a4f0),SceneManager['_scene']['_logWindow'][_0x471b27(0x2bc)]=_0x14a4f0;},Game_Unit['prototype'][_0x592f49(0x23b)]=function(){const _0x5a06cf=_0x592f49;var _0x223236=this[_0x5a06cf(0x2be)];this['_inBattle']=![];for(const _0x1dcaea of this[_0x5a06cf(0x1e3)]()){if(!_0x1dcaea)continue;_0x1dcaea[_0x5a06cf(0x23b)]();}this[_0x5a06cf(0x2be)]=_0x223236;},VisuMZ[_0x592f49(0x290)]['Game_Party_addActor']=Game_Party[_0x592f49(0x28c)][_0x592f49(0x1fc)],Game_Party[_0x592f49(0x28c)]['addActor']=function(_0x4217b7){const _0x4aa13d=_0x592f49;VisuMZ['BoostAction'][_0x4aa13d(0x23e)]['call'](this,_0x4217b7),setTimeout(VisuMZ[_0x4aa13d(0x290)][_0x4aa13d(0x1ea)]['bind'](this),0x32);},VisuMZ['BoostAction']['Game_Party_removeActor']=Game_Party[_0x592f49(0x28c)]['removeActor'],Game_Party[_0x592f49(0x28c)][_0x592f49(0x251)]=function(_0x52257d){const _0x270a4c=_0x592f49;VisuMZ['BoostAction']['Game_Party_removeActor'][_0x270a4c(0x259)](this,_0x52257d),setTimeout(VisuMZ['BoostAction'][_0x270a4c(0x1ea)][_0x270a4c(0x2ee)](this),0x32);},VisuMZ['BoostAction'][_0x592f49(0x299)]=Game_Party[_0x592f49(0x28c)][_0x592f49(0x1c9)],Game_Party[_0x592f49(0x28c)]['partyChangeRefresh']=function(){const _0x35fc4e=_0x592f49;VisuMZ['BoostAction'][_0x35fc4e(0x299)][_0x35fc4e(0x259)](this),setTimeout(VisuMZ[_0x35fc4e(0x290)][_0x35fc4e(0x1ea)][_0x35fc4e(0x2ee)](this),0x32);},VisuMZ[_0x592f49(0x290)][_0x592f49(0x1ea)]=function(){const _0x53e2b2=_0x592f49;if(!SceneManager[_0x53e2b2(0x291)]())return;const _0x336f6b=SceneManager['_scene'][_0x53e2b2(0x1c5)];if(!_0x336f6b)return;_0x336f6b[_0x53e2b2(0x2a2)](BattleManager[_0x53e2b2(0x273)]()),_0x336f6b[_0x53e2b2(0x225)]();},VisuMZ[_0x592f49(0x290)][_0x592f49(0x1ab)]=Scene_Battle[_0x592f49(0x28c)]['createActorCommandWindow'],Scene_Battle['prototype'][_0x592f49(0x279)]=function(){const _0x27f1e2=_0x592f49;VisuMZ[_0x27f1e2(0x290)][_0x27f1e2(0x1ab)][_0x27f1e2(0x259)](this),this[_0x27f1e2(0x2a4)][_0x27f1e2(0x25c)]('boost',this[_0x27f1e2(0x1d2)]['bind'](this)),this['_actorCommandWindow'][_0x27f1e2(0x25c)](_0x27f1e2(0x1d3),this[_0x27f1e2(0x2d7)][_0x27f1e2(0x2ee)](this));},Scene_Battle['prototype'][_0x592f49(0x1d2)]=function(_0x5cb934){const _0x5aafe0=_0x592f49;BattleManager[_0x5aafe0(0x273)]()['gainStoredBoostPoints'](-0x1),BattleManager[_0x5aafe0(0x273)]()[_0x5aafe0(0x2d6)](0x1),BattleManager[_0x5aafe0(0x273)]()[_0x5aafe0(0x2e9)](),this[_0x5aafe0(0x283)](),this[_0x5aafe0(0x1c5)][_0x5aafe0(0x225)](),!_0x5cb934&&this[_0x5aafe0(0x2a4)][_0x5aafe0(0x20c)](),this[_0x5aafe0(0x2a4)][_0x5aafe0(0x225)]();},Scene_Battle[_0x592f49(0x28c)][_0x592f49(0x2d7)]=function(_0x5ae6a0){const _0x54f6ec=_0x592f49;BattleManager[_0x54f6ec(0x273)]()['gainToUseBoostPoints'](-0x1),BattleManager['actor']()[_0x54f6ec(0x1c2)](0x1),BattleManager[_0x54f6ec(0x273)]()[_0x54f6ec(0x2e9)](),this[_0x54f6ec(0x283)](),this[_0x54f6ec(0x1c5)][_0x54f6ec(0x225)](),!_0x5ae6a0&&this[_0x54f6ec(0x2a4)][_0x54f6ec(0x20c)](),this['_actorCommandWindow'][_0x54f6ec(0x225)]();},VisuMZ[_0x592f49(0x290)][_0x592f49(0x2df)]=Scene_Battle[_0x592f49(0x28c)][_0x592f49(0x296)],Scene_Battle[_0x592f49(0x28c)][_0x592f49(0x296)]=function(){const _0xd195a=_0x592f49;this['_helpWindow']&&(this[_0xd195a(0x1c5)][_0xd195a(0x2bf)](),this[_0xd195a(0x1b8)]()),VisuMZ[_0xd195a(0x290)][_0xd195a(0x2df)][_0xd195a(0x259)](this);},VisuMZ[_0x592f49(0x290)][_0x592f49(0x1d6)]=Scene_Battle[_0x592f49(0x28c)][_0x592f49(0x228)],Scene_Battle[_0x592f49(0x28c)][_0x592f49(0x228)]=function(){const _0x3cc7f2=_0x592f49;VisuMZ['BoostAction'][_0x3cc7f2(0x1d6)][_0x3cc7f2(0x259)](this),this[_0x3cc7f2(0x1c5)]&&(this['_helpWindow'][_0x3cc7f2(0x2a2)](BattleManager['actor']()),this[_0x3cc7f2(0x1b8)]());},VisuMZ[_0x592f49(0x290)][_0x592f49(0x1ec)]=Scene_Battle[_0x592f49(0x28c)][_0x592f49(0x255)],Scene_Battle[_0x592f49(0x28c)]['update']=function(){const _0x3d8687=_0x592f49;VisuMZ[_0x3d8687(0x290)]['Scene_Battle_update'][_0x3d8687(0x259)](this),this['updateRepeatBoostAnimation']();},Scene_Battle[_0x592f49(0x28c)][_0x592f49(0x2f7)]=function(){const _0x38938e=_0x592f49;return this[_0x38938e(0x21f)]===undefined&&this[_0x38938e(0x1b8)](),VisuMZ[_0x38938e(0x290)]['Settings']['Mechanics']['RepeatBoostAni']??![];},Scene_Battle[_0x592f49(0x28c)][_0x592f49(0x1b8)]=function(){const _0x5e9dd5=_0x592f49;this[_0x5e9dd5(0x21f)]=-0x1;},Scene_Battle['prototype'][_0x592f49(0x283)]=function(){const _0x5b2e7b=_0x592f49,_0x50da23=BattleManager[_0x5b2e7b(0x273)]()[_0x5b2e7b(0x2a8)]();this[_0x5b2e7b(0x21f)]=_0x50da23>0x0?VisuMZ[_0x5b2e7b(0x290)][_0x5b2e7b(0x1f1)]['Mechanics'][_0x5b2e7b(0x2e4)]||0x1:-0x1;},Scene_Battle[_0x592f49(0x28c)][_0x592f49(0x25a)]=function(){const _0xa132c2=_0x592f49;if(!this['isUsingRepeatBoostAnimation']())return;if(this['_repeatBoostAnimationTimer']<=0x0)return;this[_0xa132c2(0x21f)]--,this[_0xa132c2(0x21f)]<=0x0&&BattleManager['actor']()&&(BattleManager['actor']()['startChangeBoostPointsAnimation'](!![]),BattleManager[_0xa132c2(0x273)]()[_0xa132c2(0x2a8)]()>0x0&&this[_0xa132c2(0x283)]());};function Sprite_BoostContainer(){const _0x35123d=_0x592f49;this[_0x35123d(0x2e8)](...arguments);}Sprite_BoostContainer['prototype']=Object['create'](Sprite[_0x592f49(0x28c)]),Sprite_BoostContainer[_0x592f49(0x28c)][_0x592f49(0x20e)]=Sprite_BoostContainer,Sprite_BoostContainer[_0x592f49(0x236)]=VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)]['UI'][_0x592f49(0x2d5)],Sprite_BoostContainer['prototype']['initialize']=function(){const _0x40a467=_0x592f49;Sprite['prototype'][_0x40a467(0x2e8)][_0x40a467(0x259)](this),this[_0x40a467(0x208)](),this[_0x40a467(0x25e)]();},Sprite_BoostContainer[_0x592f49(0x28c)][_0x592f49(0x208)]=function(){const _0x42becc=_0x592f49;this[_0x42becc(0x1fe)]['x']=Sprite_BoostContainer['ICON_SIZE_RATE'],this[_0x42becc(0x1fe)]['y']=Sprite_BoostContainer[_0x42becc(0x236)];},Sprite_BoostContainer['prototype'][_0x592f49(0x25e)]=function(){const _0x555147=_0x592f49;this['_icons']=[];for(let _0x42ecf4=0x1;_0x42ecf4<=Game_BattlerBase[_0x555147(0x254)];_0x42ecf4++){const _0x43bdd4=new Sprite_BoostIcon(_0x42ecf4);this[_0x555147(0x264)](_0x43bdd4),this[_0x555147(0x252)][_0x555147(0x1e4)](_0x43bdd4);}},Sprite_BoostContainer[_0x592f49(0x28c)][_0x592f49(0x29b)]=function(_0x1ae708){const _0x54b10c=_0x592f49;if(!this['_icons'])return;for(const _0x343bcf of this[_0x54b10c(0x252)]){_0x343bcf['setup'](_0x1ae708);}};function Sprite_BoostIcon(){const _0x4ac6c6=_0x592f49;this[_0x4ac6c6(0x2e8)](...arguments);}Sprite_BoostIcon[_0x592f49(0x28c)]=Object[_0x592f49(0x1f6)](Sprite['prototype']),Sprite_BoostIcon[_0x592f49(0x28c)]['constructor']=Sprite_BoostIcon,Sprite_BoostIcon[_0x592f49(0x28c)][_0x592f49(0x2e8)]=function(_0x3301ea){const _0x392752=_0x592f49;this[_0x392752(0x25b)]=_0x3301ea,Sprite[_0x392752(0x28c)]['initialize'][_0x392752(0x259)](this),this['initMembers'](),this[_0x392752(0x298)]();},Sprite_BoostIcon[_0x592f49(0x28c)][_0x592f49(0x208)]=function(){const _0xc9f335=_0x592f49;this[_0xc9f335(0x27e)]=ImageManager[_0xc9f335(0x2d4)],this['x']=ImageManager[_0xc9f335(0x2a3)]*(this[_0xc9f335(0x25b)]-0x1);},Sprite_BoostIcon[_0x592f49(0x28c)][_0x592f49(0x298)]=function(){const _0x5def75=_0x592f49;this['bitmap']=ImageManager[_0x5def75(0x29c)](),this['setFrame'](0x0,0x0,0x0,0x0);},Sprite_BoostIcon[_0x592f49(0x28c)]['setup']=function(_0x855f05){const _0x445396=_0x592f49;this[_0x445396(0x2b2)]!==_0x855f05&&(this[_0x445396(0x2b2)]=_0x855f05);},Sprite_BoostIcon['prototype'][_0x592f49(0x255)]=function(){const _0x36bdf8=_0x592f49;Sprite[_0x36bdf8(0x28c)][_0x36bdf8(0x255)][_0x36bdf8(0x259)](this),this[_0x36bdf8(0x2c0)](),this[_0x36bdf8(0x1b1)]();},Sprite_BoostIcon[_0x592f49(0x28c)][_0x592f49(0x2c0)]=function(){const _0x484a7a=_0x592f49;if(this['_battler']){let _0xd3f27b=this[_0x484a7a(0x2b2)]['storedBoostPoints']();_0xd3f27b>=this[_0x484a7a(0x25b)]?this[_0x484a7a(0x27e)]=ImageManager[_0x484a7a(0x2ce)]:this['_iconIndex']=ImageManager[_0x484a7a(0x2d4)];}else this['_iconIndex']=0x0;},Sprite_BoostIcon['prototype']['updateFrame']=function(){const _0x17c893=_0x592f49,_0x1944dd=ImageManager[_0x17c893(0x2a3)],_0x348c91=ImageManager['iconHeight'],_0x18dd20=this[_0x17c893(0x27e)]%0x10*_0x1944dd,_0x27cb4a=Math['floor'](this[_0x17c893(0x27e)]/0x10)*_0x348c91;this['setFrame'](_0x18dd20,_0x27cb4a,_0x1944dd,_0x348c91);},VisuMZ['BoostAction'][_0x592f49(0x2f3)]=Window_Base[_0x592f49(0x28c)]['convertEscapeCharacters'],Window_Base[_0x592f49(0x28c)][_0x592f49(0x220)]=function(_0x1521cb){const _0x3551ab=_0x592f49;return _0x1521cb=VisuMZ[_0x3551ab(0x290)]['Window_Base_convertEscapeCharacters'][_0x3551ab(0x259)](this,_0x1521cb),_0x1521cb=this[_0x3551ab(0x1f3)](_0x1521cb),_0x1521cb;},Window_Base[_0x592f49(0x28c)]['convertBoostEscapeCharacters']=function(_0x3af9fe){const _0x1165f7=_0x592f49;return _0x3af9fe=_0x3af9fe[_0x1165f7(0x277)](/\x1b(?:BP|BOOST)DMG\[(\d+)\]/gi,function(){const _0x251be1=_0x1165f7;return this[_0x251be1(0x1c6)](parseInt(arguments[0x1]));}[_0x1165f7(0x2ee)](this)),_0x3af9fe=_0x3af9fe['replace'](/\x1b(?:BP|BOOST)DAMAGE\[(\d+)\]/gi,function(){const _0x43921e=_0x1165f7;return this[_0x43921e(0x1c6)](parseInt(arguments[0x1]));}['bind'](this)),_0x3af9fe=_0x3af9fe['replace'](/\x1b(?:BP|BOOST)TURN\[(\d+)\]/gi,function(){const _0x3b41f8=_0x1165f7;return this[_0x3b41f8(0x26b)](parseInt(arguments[0x1]));}['bind'](this)),_0x3af9fe=_0x3af9fe[_0x1165f7(0x277)](/\x1b(?:BP|BOOST)TURNS\[(\d+)\]/gi,function(){return this['convertBoostTurnEscape'](parseInt(arguments[0x1]));}['bind'](this)),_0x3af9fe=_0x3af9fe[_0x1165f7(0x277)](/\x1b(?:BP|BOOST)REP\[(\d+)\]/gi,function(){const _0x4199b9=_0x1165f7;return this[_0x4199b9(0x205)](parseInt(arguments[0x1]));}[_0x1165f7(0x2ee)](this)),_0x3af9fe=_0x3af9fe[_0x1165f7(0x277)](/\x1b(?:BP|BOOST)REPEAT\[(\d+)\]/gi,function(){const _0x3ffe07=_0x1165f7;return this[_0x3ffe07(0x205)](parseInt(arguments[0x1]));}[_0x1165f7(0x2ee)](this)),_0x3af9fe=_0x3af9fe['replace'](/\x1b(?:BP|BOOST)REPEATS\[(\d+)\]/gi,function(){const _0x382808=_0x1165f7;return this[_0x382808(0x205)](parseInt(arguments[0x1]));}['bind'](this)),_0x3af9fe=_0x3af9fe['replace'](/\x1b(?:BP|BOOST)HITS\[(\d+)\]/gi,function(){const _0x43d6d1=_0x1165f7;return this[_0x43d6d1(0x205)](parseInt(arguments[0x1]));}[_0x1165f7(0x2ee)](this)),_0x3af9fe=_0x3af9fe[_0x1165f7(0x277)](/\x1b(?:BP|BOOST)ANALYZE\[(\d+)\]/gi,function(){return this['convertBoostAnalyzeEscape'](parseInt(arguments[0x1]));}['bind'](this)),_0x3af9fe=_0x3af9fe['replace'](/\x1b(?:BP|BOOST)EFFECT\[(\d+)\]/gi,function(){const _0x3fbaf4=_0x1165f7;return this[_0x3fbaf4(0x278)](parseInt(arguments[0x1]));}[_0x1165f7(0x2ee)](this)),_0x3af9fe=_0x3af9fe[_0x1165f7(0x277)](/\x1b(?:BP|BOOST)\[(.*?)\]/gi,function(){const _0x3fbf23=_0x1165f7;return this[_0x3fbf23(0x1c4)](String(arguments[0x1]));}['bind'](this)),_0x3af9fe=_0x3af9fe['replace'](/\x1b(?:BP|BOOST)0\[(.*?)\]/gi,function(){const _0x3ce344=_0x1165f7;return this[_0x3ce344(0x2b3)](String(arguments[0x1]));}[_0x1165f7(0x2ee)](this)),_0x3af9fe=_0x3af9fe[_0x1165f7(0x277)](/\x1b(?:BP|BOOST)=(\d+)\[(.*?)\]/gi,function(){return this['convertBoostEqualEscape'](parseInt(arguments[0x1]),String(arguments[0x2]));}['bind'](this)),_0x3af9fe=_0x3af9fe[_0x1165f7(0x277)](/\x1b(?:BP|BOOST)=(\d+)\[(.*?)\]/gi,function(){const _0xc5defa=_0x1165f7;return this[_0xc5defa(0x2ec)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x1165f7(0x2ee)](this)),_0x3af9fe=_0x3af9fe[_0x1165f7(0x277)](/\x1b(?:BP|BOOST)\<=(\d+)\[(.*?)\]/gi,function(){const _0x5ba487=_0x1165f7;return this[_0x5ba487(0x29a)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x1165f7(0x2ee)](this)),_0x3af9fe=_0x3af9fe[_0x1165f7(0x277)](/\x1b(?:BP|BOOST)\<(\d+)\[(.*?)\]/gi,function(){const _0x570dcc=_0x1165f7;return this[_0x570dcc(0x2b5)](parseInt(arguments[0x1]),String(arguments[0x2]));}['bind'](this)),_0x3af9fe=_0x3af9fe['replace'](/\x1b(?:BP|BOOST)\>=(\d+)\[(.*?)\]/gi,function(){const _0x1b5cc6=_0x1165f7;return this[_0x1b5cc6(0x2c8)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x1165f7(0x2ee)](this)),_0x3af9fe=_0x3af9fe[_0x1165f7(0x277)](/\x1b(?:BP|BOOST)\>(\d+)\[(.*?)\]/gi,function(){return this['convertBoostGreaterEscape'](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x1165f7(0x2ee)](this)),_0x3af9fe;},Window_Base[_0x592f49(0x28c)][_0x592f49(0x1c6)]=function(_0x5683ce){const _0x16379f=_0x592f49;if(!!this[_0x16379f(0x22a)]){var _0x283065=this[_0x16379f(0x22a)][_0x16379f(0x2ea)](_0x16379f(0x226));_0x5683ce=Math[_0x16379f(0x2ac)](_0x5683ce*_0x283065),_0x5683ce+=this['_bpSubject']['boostAddition'](_0x16379f(0x226));}return _0x5683ce;},Window_Base[_0x592f49(0x28c)][_0x592f49(0x26b)]=function(_0x1f5f55){const _0x35e8fb=_0x592f49;if(!!this[_0x35e8fb(0x22a)]){var _0x5c7380=this[_0x35e8fb(0x22a)][_0x35e8fb(0x2ea)](_0x35e8fb(0x1b7));_0x1f5f55=Math[_0x35e8fb(0x2ac)](_0x1f5f55*_0x5c7380),_0x1f5f55+=this['_bpSubject']['boostAddition'](_0x35e8fb(0x1b7));}return _0x1f5f55;},Window_Base[_0x592f49(0x28c)][_0x592f49(0x205)]=function(_0x375b34){const _0x53c763=_0x592f49;if(!!this[_0x53c763(0x22a)]){var _0x5ecd00=this[_0x53c763(0x22a)][_0x53c763(0x2ea)]('Repeat');_0x375b34=Math['round'](_0x375b34*_0x5ecd00),_0x375b34+=this[_0x53c763(0x22a)]['boostAddition']('Repeat');}return _0x375b34;},Window_Base[_0x592f49(0x28c)]['convertBoostAnalyzeEscape']=function(_0x5e8a7a){const _0x41e4f3=_0x592f49;if(!!this['_bpSubject']){var _0x183dc5=this[_0x41e4f3(0x22a)][_0x41e4f3(0x2ea)]('Analyze');_0x5e8a7a=Math[_0x41e4f3(0x2ac)](_0x5e8a7a*_0x183dc5),_0x5e8a7a+=this['_bpSubject'][_0x41e4f3(0x2a5)](_0x41e4f3(0x2e6));}return _0x5e8a7a;},Window_Base[_0x592f49(0x28c)]['convertBoostEffectEscape']=function(_0xdde581){const _0x5cacfd=_0x592f49;if(!!this['_bpSubject']){var _0x3702f9=this[_0x5cacfd(0x22a)]['boostMultiplier'](_0x5cacfd(0x2dd));_0xdde581=Math[_0x5cacfd(0x2ac)](_0xdde581*_0x3702f9),_0xdde581+=this[_0x5cacfd(0x22a)]['boostAddition'](_0x5cacfd(0x2dd));}return _0xdde581;},Window_Base[_0x592f49(0x28c)]['convertBoostUpEscape']=function(_0x4fe0ac){const _0x5136ac=_0x592f49;return!!this['_bpSubject']&&this[_0x5136ac(0x22a)][_0x5136ac(0x2a8)]()>0x0?_0x4fe0ac:'';},Window_Base['prototype'][_0x592f49(0x2b3)]=function(_0x48128f){const _0x4a93df=_0x592f49;return!this[_0x4a93df(0x22a)]||this[_0x4a93df(0x22a)]['toUseBoostPoints']()<=0x0?_0x48128f:'';},Window_Base[_0x592f49(0x28c)][_0x592f49(0x2ec)]=function(_0x3e6094,_0x5aaf99){const _0x4d6282=_0x592f49;return!!this[_0x4d6282(0x22a)]&&this[_0x4d6282(0x22a)]['toUseBoostPoints']()===_0x3e6094?_0x5aaf99:'';},Window_Base[_0x592f49(0x28c)][_0x592f49(0x2ec)]=function(_0x3ee868,_0x393fe9){const _0x414d4a=_0x592f49;return!!this[_0x414d4a(0x22a)]&&this[_0x414d4a(0x22a)]['toUseBoostPoints']()===_0x3ee868?_0x393fe9:'';},Window_Base['prototype'][_0x592f49(0x29a)]=function(_0x165922,_0x47f3af){const _0x4155da=_0x592f49;return!!this[_0x4155da(0x22a)]&&this[_0x4155da(0x22a)][_0x4155da(0x2a8)]()<=_0x165922?_0x47f3af:'';},Window_Base['prototype'][_0x592f49(0x2b5)]=function(_0x24f2f2,_0xa1752c){const _0x329bca=_0x592f49;return!!this[_0x329bca(0x22a)]&&this['_bpSubject'][_0x329bca(0x2a8)]()<_0x24f2f2?_0xa1752c:'';},Window_Base[_0x592f49(0x28c)][_0x592f49(0x2c8)]=function(_0x162d46,_0x197c6e){const _0x1f5f92=_0x592f49;return!!this[_0x1f5f92(0x22a)]&&this[_0x1f5f92(0x22a)][_0x1f5f92(0x2a8)]()>=_0x162d46?_0x197c6e:'';},Window_Base[_0x592f49(0x28c)][_0x592f49(0x1cb)]=function(_0x1d598c,_0x542d0a){const _0x192033=_0x592f49;return!!this['_bpSubject']&&this[_0x192033(0x22a)]['toUseBoostPoints']()>_0x1d598c?_0x542d0a:'';},Window_Selectable['BOOST_ACTION_SHORTCUT_PAGEUP_PAGEDN']=VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)]['UI'][_0x592f49(0x230)],Window_Selectable[_0x592f49(0x1c3)]=VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)]['UI'][_0x592f49(0x24d)],Window_Selectable[_0x592f49(0x28c)]['canUseBoostShortcut']=function(){const _0x4b1a4e=_0x592f49,_0x309cb=this['constructor'][_0x4b1a4e(0x1c7)];return Window_Selectable[_0x4b1a4e(0x1c3)][_0x4b1a4e(0x2a1)](_0x309cb)?![]:!![];},Window_Selectable[_0x592f49(0x28c)][_0x592f49(0x28d)]=function(){const _0x5b3794=_0x592f49;if(!SceneManager[_0x5b3794(0x291)]())return![];if(!Window_Selectable['BOOST_ACTION_SHORTCUT_PAGEUP_PAGEDN'])return![];if(!BattleManager[_0x5b3794(0x215)]())return![];return this[_0x5b3794(0x1e6)]();},VisuMZ['BoostAction'][_0x592f49(0x1ef)]=Window_Selectable['prototype']['cursorPagedown'],Window_Selectable[_0x592f49(0x28c)]['cursorPagedown']=function(){const _0x57d4c3=_0x592f49;if(this[_0x57d4c3(0x28d)]()){const _0x100b87=BattleManager[_0x57d4c3(0x273)]();_0x100b87&&_0x100b87['canUseBoostPoints']()&&(SceneManager[_0x57d4c3(0x1e7)][_0x57d4c3(0x1d2)](!![]),this[_0x57d4c3(0x225)](),this[_0x57d4c3(0x1d4)]()),Input['clear']();}else VisuMZ[_0x57d4c3(0x290)][_0x57d4c3(0x1ef)]['call'](this);},VisuMZ[_0x592f49(0x290)]['Window_Selectable_cursorPageup']=Window_Selectable[_0x592f49(0x28c)][_0x592f49(0x1e8)],Window_Selectable['prototype'][_0x592f49(0x1e8)]=function(){const _0x5626d4=_0x592f49;if(this['meetsBoostShortcutRequirements']()){const _0x57007c=BattleManager[_0x5626d4(0x273)]();_0x57007c&&_0x57007c['canUndoBoostPoints']()&&(SceneManager[_0x5626d4(0x1e7)][_0x5626d4(0x2d7)](!![]),this['refresh'](),this[_0x5626d4(0x1d4)]()),Input['clear']();}else VisuMZ[_0x5626d4(0x290)][_0x5626d4(0x2bd)][_0x5626d4(0x259)](this);},Window_Help[_0x592f49(0x28c)][_0x592f49(0x2a2)]=function(_0x20fdde){const _0xa47a69=_0x592f49;this[_0xa47a69(0x22a)]=_0x20fdde;},Window_Help['prototype'][_0x592f49(0x2bf)]=function(){this['_bpSubject']=undefined;},Window_StatusBase[_0x592f49(0x28c)][_0x592f49(0x2b0)]=function(){const _0x1e3fa3=_0x592f49;return BattleManager[_0x1e3fa3(0x215)]();},Window_StatusBase[_0x592f49(0x28c)][_0x592f49(0x2cd)]=function(_0x13d600,_0x1b8a97,_0x1d0ff7){const _0x1c58b6=_0x592f49;if(!this[_0x1c58b6(0x2b0)]())return;const _0x492634=_0x1c58b6(0x243)[_0x1c58b6(0x1f9)](_0x13d600['actorId']()),_0x4a4232=this['createInnerSprite'](_0x492634,Sprite_BoostContainer);_0x4a4232[_0x1c58b6(0x29b)](_0x13d600),_0x4a4232[_0x1c58b6(0x1de)](_0x1b8a97,_0x1d0ff7),_0x4a4232[_0x1c58b6(0x2e1)]();},Window_ActorCommand[_0x592f49(0x2b1)]=VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)]['UI'][_0x592f49(0x206)],Window_ActorCommand[_0x592f49(0x1db)]=VisuMZ[_0x592f49(0x290)][_0x592f49(0x1f1)]['UI']['ShowUnboostCmd'],VisuMZ[_0x592f49(0x290)]['Window_ActorCommand_addGuardCommand']=Window_ActorCommand['prototype']['addGuardCommand'],Window_ActorCommand['prototype'][_0x592f49(0x2e0)]=function(){const _0x181621=_0x592f49;BattleManager[_0x181621(0x215)]()&&(this['addBoostCommand'](),this['addUnboostCommand']()),VisuMZ['BoostAction'][_0x181621(0x2f4)][_0x181621(0x259)](this);},Window_ActorCommand[_0x592f49(0x28c)]['addBoostCommand']=function(){const _0x1c9529=_0x592f49;if(!Window_ActorCommand['BOOST_ACTION_SHOW'])return;const _0x476add=this[_0x1c9529(0x1c1)](),_0x40ce54=TextManager[_0x1c9529(0x231)],_0x137617=ImageManager[_0x1c9529(0x2ce)],_0xc108f9=_0x476add===_0x1c9529(0x250)?_0x40ce54:'\x5cI[%1]%2'['format'](_0x137617,_0x40ce54);var _0xb6f32=this[_0x1c9529(0x232)][_0x1c9529(0x261)]();this[_0x1c9529(0x24f)](_0xc108f9,'boost',_0xb6f32);},Window_ActorCommand[_0x592f49(0x28c)]['addUnboostCommand']=function(){const _0x5af468=_0x592f49;if(!Window_ActorCommand[_0x5af468(0x1db)])return;const _0x4dd46b=this['commandStyle'](),_0x24c768=TextManager['unboostCommandName'],_0x12a506=ImageManager[_0x5af468(0x2d4)],_0x22784a=_0x4dd46b==='text'?_0x24c768:_0x5af468(0x2db)[_0x5af468(0x1f9)](_0x12a506,_0x24c768);var _0x7e3655=this[_0x5af468(0x232)][_0x5af468(0x22e)]();this['addCommand'](_0x22784a,_0x5af468(0x1d3),_0x7e3655);},Window_ActorCommand[_0x592f49(0x28c)][_0x592f49(0x2c5)]=function(){const _0x34aa51=_0x592f49;this[_0x34aa51(0x27f)]()!==_0x34aa51(0x1ba)&&this['currentSymbol']()!==_0x34aa51(0x1d3)&&Window_Selectable[_0x34aa51(0x28c)][_0x34aa51(0x2c5)][_0x34aa51(0x259)](this);},Window_BattleStatus[_0x592f49(0x2a9)]=VisuMZ[_0x592f49(0x290)]['Settings']['UI'][_0x592f49(0x1e5)],Window_BattleStatus[_0x592f49(0x287)]=VisuMZ['BoostAction'][_0x592f49(0x1f1)]['UI'][_0x592f49(0x28e)],Window_BattleStatus['BOOST_POINTS_DISPLAY_OFFSET_X']=VisuMZ[_0x592f49(0x290)]['Settings']['UI']['BattleStatusOffsetX'],Window_BattleStatus[_0x592f49(0x2af)]=VisuMZ[_0x592f49(0x290)]['Settings']['UI'][_0x592f49(0x1e1)],VisuMZ[_0x592f49(0x290)][_0x592f49(0x22f)]=Window_BattleStatus['prototype'][_0x592f49(0x26f)],Window_BattleStatus[_0x592f49(0x28c)][_0x592f49(0x26f)]=function(_0x530cef){const _0x9bc1d0=_0x592f49;VisuMZ[_0x9bc1d0(0x290)][_0x9bc1d0(0x22f)]['call'](this,_0x530cef),this[_0x9bc1d0(0x24b)](_0x530cef);},Window_BattleStatus[_0x592f49(0x28c)][_0x592f49(0x24b)]=function(_0x573ccc){const _0x416951=_0x592f49;if(!Window_BattleStatus[_0x416951(0x2a9)])return;const _0x4e45cf=this['actor'](_0x573ccc);if(!_0x4e45cf)return;!Window_BattleStatus[_0x416951(0x287)]?this[_0x416951(0x2f8)](_0x573ccc):this[_0x416951(0x200)](_0x573ccc);},Window_BattleStatus[_0x592f49(0x28c)][_0x592f49(0x2f8)]=function(_0x161cae){const _0x3a4ca6=_0x592f49,_0x4dc3cc=this[_0x3a4ca6(0x273)](_0x161cae),_0x5dc8f6=this[_0x3a4ca6(0x2da)](_0x161cae);let _0x3ffa25=_0x5dc8f6['x']-0x4+Window_BattleStatus[_0x3a4ca6(0x2ba)],_0x506a02=_0x5dc8f6['y']+0x4+Window_BattleStatus[_0x3a4ca6(0x2af)];this['placeBoostPoints'](_0x4dc3cc,_0x3ffa25,_0x506a02);},Window_BattleStatus[_0x592f49(0x28c)][_0x592f49(0x200)]=function(_0xe7b86b){const _0x3c7b7a=_0x592f49,_0xf5e85c=this[_0x3c7b7a(0x273)](_0xe7b86b),_0x2538b5=this[_0x3c7b7a(0x244)](_0xe7b86b),_0x4ec5cd=Math[_0x3c7b7a(0x28a)](ImageManager['iconWidth']*Game_BattlerBase[_0x3c7b7a(0x254)]*Sprite_BoostContainer[_0x3c7b7a(0x236)]),_0x323805=Math[_0x3c7b7a(0x28a)](ImageManager[_0x3c7b7a(0x272)]*Sprite_BoostContainer[_0x3c7b7a(0x236)]);let _0x1ab251=_0x2538b5['x']+0x4,_0x107553=_0x2538b5['y']+0x4;const _0x3ebc29=this['battleLayoutStyle']();switch(_0x3ebc29){case _0x3c7b7a(0x1dd):VisuMZ[_0x3c7b7a(0x27c)][_0x3c7b7a(0x1f1)][_0x3c7b7a(0x2f2)][_0x3c7b7a(0x2c4)]?_0x1ab251+=ImageManager[_0x3c7b7a(0x1cc)]+0x8:_0x1ab251+=ImageManager['iconWidth']+0x8;_0x1ab251+=0x88,_0x1ab251+=0x88*0x2;$dataSystem[_0x3c7b7a(0x2fa)]&&(_0x1ab251+=0x88);_0x107553+=Math[_0x3c7b7a(0x2f0)](0x0,Math[_0x3c7b7a(0x2ac)]((this[_0x3c7b7a(0x1f8)]()-_0x323805)/0x2));break;case'xp':case _0x3c7b7a(0x256):case _0x3c7b7a(0x2a0):_0x1ab251=Math[_0x3c7b7a(0x2ac)](_0x2538b5['x']+(_0x2538b5[_0x3c7b7a(0x212)]-_0x4ec5cd)/0x2);break;case'portrait':_0x1ab251=Math[_0x3c7b7a(0x2ac)](_0x2538b5['x']+(_0x2538b5[_0x3c7b7a(0x212)]-_0x4ec5cd)/0x2);const _0xf51a33=$dataSystem[_0x3c7b7a(0x2fa)]?0x4:0x3;_0x107553=Math['round'](_0x2538b5['y']+_0x2538b5['height']-0x4-this[_0x3c7b7a(0x1f8)]()*_0xf51a33);break;}_0x1ab251+=Window_BattleStatus[_0x3c7b7a(0x2ba)],_0x107553+=Window_BattleStatus[_0x3c7b7a(0x2af)],this['placeBoostPoints'](_0xf5e85c,_0x1ab251,_0x107553);};