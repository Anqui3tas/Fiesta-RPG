//=============================================================================
// VisuStella MZ - Aggro Control System
// VisuMZ_2_AggroControlSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_AggroControlSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AggroControlSystem = VisuMZ.AggroControlSystem || {};
VisuMZ.AggroControlSystem.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.06] [AggroControlSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Aggro_Control_System_VisuStella_MZ
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A common mechanic found in many RPG's nowadays is the ability to steer the
 * way enemies target party members. This can be in the form of provocations, 
 * taunts, and aggro.
 *
 * Provocations come in the form of states, where when a unit applies a provoke
 * state on a target, the target must attack the provoker when using single
 * target skills. This plugin provides support for multiple provocations and
 * such provocations will be given focus based on the state's priority value.
 *
 * Taunts are a third way to steer an opponent to focus on a party member. The
 * taunt effects can be split up into global, physical, magical, or certain hit
 * only taunts and these can be applied to almost any trait object.
 *
 * Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Three different ways to influencing which targets enemies should attack:
 *   Provoke, taunt, and aggro.
 * * Provoke and taunt effects work both ways for actors and enemies.
 * * Aggro effects accumulate through battle and can be manipulated through
 *   notetag values, Plugin Commands, and/or Plugin Parameters.
 * * Provoked battlers can have provoke lines displayed to indicate which
 *   unit has provoked them.
 * * Taunting units can have animations played on them repeatedly to quickly
 *   relay information to the player about their taunt properties.
 * * Gauges that can be displayed over the heads of actor sprites to display
 *   how much aggro that actor holds in comparison to the other actors.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
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
 * VisuMZ_0_CoreEngine
 * VisuMZ_1_BattleCore
 *
 * - Provoke Priority Lines and Taunt animations become available if these
 *   plugins are installed.
 *
 * ---
 *
 * ============================================================================
 * How Aggro, Provoke, and Taunts Work
 * ============================================================================
 *
 * This section will explain how aggro, provoke, and taunts work.
 *
 * ---
 *
 * Provoke
 *
 * - Provocations come in the form of states, where when a unit applies a
 * provoke state on a target, the target must attack the provoker when using
 * single target skills. This plugin provides support for multiple provocations
 * and such provocations will be given focus based on the state's database
 * priority value.
 *
 * - The provoke will last only as long as the duration of the state itself. If
 * the state's duration is refreshed by reapplying the Provoke state, then the
 * provoker of that state will then switch over to the one applying the newly
 * added state.
 *
 * - When an actor selects a target for an action and the actor is provoked by
 * an enemy on the other team, the player's choice selection becomes limited to
 * only the provoker.
 *
 * - Provoke can be bypassed through the <Bypass Provoke> notetag.
 *
 * ---
 *
 * Taunts
 *
 * - Taunts are a third way to steer an opponent to focus on a party member.
 * The taunt effects can be split up into global, physical, magical, or certain
 * hit only taunts and these can be applied to almost any trait object.
 *
 * - When an actor selects a target and the enemy team has a taunting unit,
 * the player's choice selection becomes limited to only the targets with the
 * associated taunt type.
 *
 * - Taunts can be bypassed through the <Bypass Taunt> notetag.
 *
 * ---
 *
 * Aggro
 *
 * - Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * - Skills and items can raise its user's aggro value through notetags and/or
 * how much damage they've dealt or healed. Skills and items can also change a
 * target's aggro value through notetags, too.
 *
 * - Through the Plugin Parameters, you can set Aggro to automatically raised
 * based on how much damage or healing dealt by a user.
 *
 * - Some enemies can be bypass forced aggro target through the <Bypass Aggro>
 * notetag while other enemies can be forced to target the highest aggro target
 * through the <Target Highest Aggro> notetag;
 *
 * ---
 *
 * Priorities
 *
 * - Priority will be given in the order of provokes, taunts, and then aggro.
 * This means if an enemy is provoked, the opposing side has a taunt, and there
 * is a member with high aggro, then the enemy will always attack the provoker
 * first before targeting a taunting unit before targeting the unit with high
 * aggro values.
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
 * === Provoke-Related Notetags ===
 *
 * The following notetags enable you to utilize the Provoke effects added by
 * this plugin. Provoked targets can only attack the provoking unit for single
 * target actions.
 *
 * ---
 *
 * <Provoke>
 *
 * - Used for: State Notetags
 * - Causes the state affected unit to be able to only attack the caster of the
 *   provoke state for single target actions.
 * - If multiple provoke states are applied, then the provoker is the one who
 *   applied the highest priority provoke state.
 *
 * ---
 *
 * <Bypass Provoke>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Makes the affected unit to ignore any and all provoke effects applied by
 *   any provoke states, allowing them to target foes as if they are unaffected
 *   by provoke states altogether.
 *
 * ---
 * 
 * <Bypass Provoke>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass provoke effects applied by any provoke states,
 *   allowing this action to target foes as if the user is unaffected by any
 *   provoke effects altogether.
 * 
 * ---
 * 
 * <Provoke Height Origin: x%>
 * 
 * - Used for: Actor, Enemy Notetags
 * - Sets the provoke height origin point to x% of the sprite's height.
 * - This is the landing point for the provoke trails.
 * - Replace 'x' with a number presenting what rate of the sprite's height to
 *   set as the provoke height origin point.
 * 
 * ---
 *
 * === Taunt-Related Notetags ===
 *
 * ---
 *
 * <Taunt>
 * <All Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Physical Taunt>
 * <Magical Taunt>
 * <Certain Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions
 *   respectively.
 * - Add/remove any combination of the above to cause the affected unit to
 *   become the target of those types of actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Bypass Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The affected unit will ignore any and all taunt effects created by the
 *   opposing team, allowing them to use single target actions as if no
 *   taunters exist on the opposing team.
 *
 * ---
 * 
 * <Bypass Taunt>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass taunt effects created by the opposing team,
 *   allowing the user to use single target actions as if no taunters exist on
 *   the opposing team.
 * 
 * ---
 *
 * === Aggro-Related Notetags ===
 *
 * ---
 *
 * <User Aggro: +x>
 * <User Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the user's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <Target Aggro: +x>
 * <Target Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the target's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
 *
 * ---
 *
 * <Aggro: +x>
 * <Aggro: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to passively have increased/decreased aggro
 *   values independent of the amount of aggro it earns in battle.
 * - Replace 'x' with the amount of aggro this object increases/decreases by.
 *
 * ---
 *
 * <Aggro Multiplier: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to increase the amount of perceived aggro it has
 *   by the aggro multiplier.
 * - Replace 'x' with a number representing the percentage to increase/decrease
 *   the perceived aggro by.
 * - If multiple of these traits exist across different trait objects, the
 *   effects are increased multiplicatively.
 *
 * ---
 *
 * <Bypass Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will decide targets by aggro weight
 *   instead of always picking the highest aggro unit(s).
 * - If used on trait objects, the affected unit will decide targets by aggro
 *   weight instead of always picking the highest aggro unit(s).
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 * 
 * <Bypass Highest Aggro>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass highest aggro effects and instead focuses on
 *   targets by aggro weight instead.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 * 
 * ---
 *
 * <Target Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will always decide its targets by
 *   the highest aggro value.
 * - If used on trait objects, the affected unit will always decide on targets
 *   by the highest aggro value.
 * - If the <Bypass Highest Aggro> notetag exists, this effect is ignored.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 *
 * === JavaScript Notetags: Aggro-Related ===
 *
 * ---
 *
 * <JS User Aggro>
 *  code
 *  code
 *  value = code
 * </JS User Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change the user's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <JS Target Aggro>
 *  code
 *  code
 *  value = code
 * </JS Target Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change target's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
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
 * Actor: Change Aggro
 * - Changes target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Actor: Set Aggro
 * - Set target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Aggro
 * - Changes target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Enemy: Set Aggro
 * - Set target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Provoke Settings
 * ============================================================================
 *
 * The Provoke Settings Plugin Parameters adjust the visual aspects related to
 * the provoke effect. These settings will require VisuMZ_1_BattleCore to be
 * installed in order for them to work due to dependencies. 
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 *   Show Priority Lines?:
 *   - Show priority target lines for this plugin?
 *   - Requires VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Line Settings
 * 
 *   Arc Height:
 *   - How tall should the line arc in pixels?
 * 
 *   Blend Mode:
 *   - The blend mode used for the sprite.
 * 
 *   Height Origin:
 *   - The rate from the battler's sprite base to determine where the line
 *     starts from.
 * 
 *   Line Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Opacity:
 *   - The highest possible opacity for active provoke lines.
 * 
 *   Opacity Speed:
 *   - The speed at which opacity fluctuates for the line sprite.
 * 
 *   Parts:
 *   - The number of joint parts to split up the sprite as.
 * 
 *   Parts Size:
 *   - The number in pixels for the diameter of each part.
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Provoke Origin' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Taunt Settings
 * ============================================================================
 *
 * Battlers with specific taunt types can have animations playing on them over
 * and over to relay information to the player. These settings require you to
 * have both VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore installed in your
 * project's plugin list in order to use.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine & VisuMZ_1_BattleCore
 * 
 *   Show Animations?:
 *   - Show animations for each of the taunt effects?
 *   - Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Animation ID's
 * 
 *   Physical Taunt:
 *   - The animation ID used for physical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Magical Taunt:
 *   - The animation ID used for magical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Certain Hit Taunt:
 *   - The animation ID used for certain hit taunts.
 *   - Use 0 or 'None' to bypass this type.
 *
 * ---
 *
 * Animation Settings
 * 
 *   Cycle Time:
 *   - The amount of frames to wait before each animation cycle.
 *   - WARNING: Lower numbers can jeopardize game performance.
 * 
 *   Mirror Actor Ani?:
 *   - Mirror animations played on actors?
 * 
 *   Mute Animation SFX?:
 *   - Mute sounds played by animations?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Aggro Settings
 * ============================================================================
 *
 * This lets you adjust the settings for this plugin's Aggro mechanics. Most of
 * these settings focus on the visual gauge display of the Aggro gauge, but you
 * can also change up the settings for how aggro is utilized.
 *
 * ---
 *
 * General
 * 
 *   Priority: Highest TGR:
 *   - When enemies target actors for an single target attack, always target
 *     the highest members or make it weighted?
 *
 *   Aggro Per Damage:
 *   - The amount of aggro generated per point of HP damage dealt to an enemy.
 *
 *   Aggro Per Heal:
 *   - The amount of aggro generated per point of HP recovered to an ally.
 *
 * ---
 *
 * Gauge
 * 
 *   Visible Battler Gauge:
 *   - Display an aggro gauge over an SV actor's head to show current aggro
 *     level compared to other party members.
 * 
 *   Visible Status Gauge:
 *   - Display an aggro gauge in the Battle Status Window to show the current
 *     aggro level compared to others.
 * 
 *   Gauge Color 1:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Width:
 *   - Width in pixels you want the gauge to be.
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the Aggro Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the Aggro Gauge to be scaled?
 * 
 *   Battler Gauge
 * 
 *     Offset X:
 *     Offset Y:
 *     - How many pixels to offset the Aggro Gauge's X/Y by?
 * 
 *   Battle Status Gauge
 * 
 *     Offset X:
 *     Offset Y:
 *     - How many pixels to offset the Aggro Gauge's X/Y by?
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Aggro Gauge' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
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
 * Version 1.06: March 12, 2021
 * * Bug Fixes!
 * ** Subsequent battles or changing scenes should no longer clear the custom
 *    rendered bitmap used for the provoke trail. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for the Skill and Item versions of the following
 *    notetags into the help file and wiki:
 * *** <Bypass Provoke>
 * *** <Bypass Taunt>
 * *** <Bypass Highest Aggro>
 * 
 * Version 1.05: March 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Aggro Settings > Battle Status Gauge
 * **** These settings allow you to offset the Aggro Gauge in the Battle Status
 *      Window from its original position.
 * 
 * Version 1.04: February 26, 2021
 * * Bug Fixes!
 * ** Fixed positioning of gauge for List Style battle layouts without faces.
 *    Fix made by Olivia.
 * 
 * Version 1.03: February 5, 2021
 * * Feature Update!
 * ** Aggro is now cleared at the end of each battle in addition to the start
 *    of each battle. Update made by Olivia.
 *
 * Version 1.02: November 1, 2020
 * * Compatibility Update!
 * ** Plugin is made more compatible with other plugins.
 * 
 * Version 1.01: October 4, 2020
 * * Bug Fixes!
 * ** Provoke lines should now be placed correctly if the UI area is smaller
 *    than the resolution area.
 * ** The Plugin Commands should no longer cause crashes. Fix made by Irina.
 *
 * Version 1.00: September 28, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeAggro
 * @text Actor: Change Aggro
 * @desc Changes target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorSetAggro
 * @text Actor: Set Aggro
 * @desc Set target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeAggro
 * @text Enemy: Change Aggro
 * @desc Changes target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemySetAggro
 * @text Enemy: Set Aggro
 * @desc Set target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
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
 * @param AggroControl
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Provoke:struct
 * @text Provoke Settings
 * @type struct<Provoke>
 * @desc Settings related to the Provoke mechanic.
 * These settings require VisuMZ_1_BattleCore.
 * @default {"VisuMZ_1_BattleCore":"","ShowLines:eval":"true","LineSettings":"","ArcHeight:num":"125","BlendMode:num":"1","HeightOrigin:num":"0.8","LineColor:str":"#ff0000","Opacity:num":"255","OpacitySpeed:num":"4","Parts:num":"256","PartsSize:num":"5","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Provoke Origin"}
 *
 * @param Taunt:struct
 * @text Taunt Settings
 * @type struct<Taunt>
 * @desc Settings related to the Taunt mechanic.
 * @default {"Dependency":"VisuMZ_1_BattleCore","ShowAnimation:eval":"true","AnimationID":"","AniPhysical:num":"1","AniMagical:num":"2","AniCertain:num":"3","AnimationSettings":"","CycleTime:num":"60","MirrorActorAni:eval":"true","MuteAnimations:eval":"true"}
 *
 * @param Aggro:struct
 * @text Aggro Settings
 * @type struct<Aggro>
 * @desc Settings related to the Aggro mechanic.
 * @default {"General":"","PriorityHighest:eval":"true","AggroPerDmg:num":"0.1","AggroPerHeal:num":"0.5","Gauge":"","VisibleGauge:eval":"false","StatusGauge:eval":"true","GaugeColor1:str":"#959595","GaugeColor2:str":"#ffffff","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"+0","OffsetY:num":"+2","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Aggro Gauge"}
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
 * Provoke Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Provoke:
 *
 * @param VisuMZ_1_BattleCore
 *
 * @param ShowLines:eval
 * @text Show Priority Lines?
 * @parent VisuMZ_1_BattleCore
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show priority target lines for this plugin?
 * Requires VisuMZ_1_BattleCore.
 * @default true
 *
 * @param LineSettings
 * @text Line Settings
 *
 * @param ArcHeight:num
 * @text Arc Height
 * @parent LineSettings
 * @type number
 * @desc How tall should the line arc in pixels?
 * @default 125
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent LineSettings
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for the sprite.
 * @default 1
 *
 * @param HeightOrigin:num
 * @text Height Origin
 * @parent LineSettings
 * @desc The rate from the battler's sprite base to determine where the line starts from.
 * @default 0.8
 *
 * @param LineColor:str
 * @text Line Color
 * @parent LineSettings
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ff0000
 *
 * @param Opacity:num
 * @text Opacity
 * @parent LineSettings
 * @type number
 * @min 1
 * @max 255
 * @desc The highest possible opacity for active provoke lines.
 * @default 255
 *
 * @param OpacitySpeed:num
 * @text Opacity Speed
 * @parent Opacity:num
 * @type number
 * @min 1
 * @desc The speed at which opacity fluctuates for the line sprite.
 * @default 4
 *
 * @param Parts:num
 * @text Parts
 * @parent LineSettings
 * @type number
 * @min 1
 * @desc The number of joint parts to split up the sprite as.
 * @default 256
 *
 * @param PartsSize:num
 * @text Parts Size
 * @parent Parts:num
 * @type number
 * @min 1
 * @desc The number in pixels for the diameter of each part.
 * @default 5
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Provoke Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Provoke Origin' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Provoke Origin
 *
 */
/* ----------------------------------------------------------------------------
 * Taunt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Taunt:
 *
 * @param Dependency
 * @text VisuMZ_0_CoreEngine
 * @default VisuMZ_1_BattleCore
 *
 * @param ShowAnimation:eval
 * @text Show Animations?
 * @parent Dependency
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show animations for each of the taunt effects?
 * Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 * @default true
 *
 * @param AnimationID
 * @text Animation ID's
 *
 * @param AniPhysical:num
 * @text Physical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for physical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 13
 *
 * @param AniMagical:num
 * @text Magical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for magical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 14
 *
 * @param AniCertain:num
 * @text Certain Hit Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for certain hit taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 15
 *
 * @param AnimationSettings
 * @text Animation Settings
 *
 * @param CycleTime:num
 * @text Cycle Time
 * @parent AnimationSettings
 * @type number
 * @min 1
 * @desc The amount of frames to wait before each animation cycle.
 * WARNING: Lower numbers can jeopardize game performance.
 * @default 60
 *
 * @param MirrorActorAni:eval
 * @text Mirror Actor Ani?
 * @parent AnimationSettings
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations played on actors?
 * @default true
 *
 * @param MuteAnimations:eval
 * @text Mute Animation SFX?
 * @parent AnimationSettings
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute sounds played by animations?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Aggro Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Aggro:
 *
 * @param General
 *
 * @param PriorityHighest:eval
 * @text Priority: Highest TGR
 * @parent General
 * @type boolean
 * @on Always
 * @off Weighted
 * @desc When enemies target actors for an single target attack,
 * always target the highest members or make it weighted?
 * @default true
 *
 * @param AggroPerDmg:num
 * @text Aggro Per Damage
 * @parent General
 * @desc The amount of aggro generated per point of HP damage dealt to an enemy.
 * @default 0.1
 *
 * @param AggroPerHeal:num
 * @text Aggro Per Heal
 * @parent General
 * @desc The amount of aggro generated per point of HP recovered to an ally.
 * @default 0.5
 *
 * @param Gauge
 *
 * @param VisibleGauge:eval
 * @text Visible Battler Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge over an SV actor's head to show
 * current aggro level compared to other party members.
 * @default false
 *
 * @param StatusGauge:eval
 * @text Visible Status Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge in the Battle Status Window
 * to show the current aggro level compared to others.
 * @default true
 *
 * @param GaugeColor1:str
 * @text Gauge Color 1
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #959595
 *
 * @param GaugeColor2:str
 * @text Gauge Color 2
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Gauge
 * @desc How large/small do you want the Aggro Gauge to be scaled?
 * @default 0.5
 * 
 * @param BattlerGauge
 * @text Battler Gauge
 * @parent Gauge
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent BattlerGauge
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent BattlerGauge
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * Negative goes up. Positive goes down.
 * @default +2
 * 
 * @param BattleStatus
 * @text Battle Status Gauge
 * @parent Gauge
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Aggro Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Aggro Gauge
 *
 */
//=============================================================================

const _0x3735=['onBattleStart','Sprite_Actor_update','constructor','aggroGauge','onBattleEnd','initTauntAnimations','_animationCycleTime','actor%1-gauge-aggro','EnemySetAggro','BattleStatusOffsetX','_scene','item','getColorDataFromPluginParameters','VisibleGauge','createChildSprites','Sprite_Gauge_gaugeRate','ARRAYJSON','isBypassHighestAggro','isCertainHit','AnchorX','updateChildrenOpacity','executeHpDamage','797645PtZGDT','tgrSumFromGroup','faceWidth','pow','Scene_Options_maxCommands','_aggro','applyGlobal','_battler','isDead','isTauntAffected','currentValueAggroControl','_subject','alwaysTargetHighestAggro','sparam','bind','isShowPriorityLines','_provokeSprite','_spriteset','clearAggro','Window_BattleEnemy_refresh','1YcnmWI','initAggroControl','createInnerSprite','applyProvokeEffect','certainHitTauntMembers','some','addAggroControlSystemAggroCommand','drawAggroGauge','note','OptionName','initMembers','blendMode','itemRectWithPadding','log','updateAggroControl','_battleField','updateOpacityAggroControl','createBattleField','createProvokeHeightOrigin','BattleLayout','round','Battle\x20Actor\x20%1','_provoker','setBattler','LineColor','_targetY','baseAggro','drawValue','_cache','_customModified','magicalTaunt','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','randomInt','_enemies','parameters','convertStringToBattleTarget','description','_opacitySpeed','battleUIOffsetX','applyProvokeFilters','ARRAYNUM','_homeX','updateBattlerPositions','BlendMode','version','EVAL','create','bypassHighestAggro','addChildAt','Spriteset_Battle_createBattleField','parentContainer','aggro-gauge-color-1','Game_Battler_onBattleStart','updateAggroGaugeSprite','textColor','ActorID','createBattleFieldAggroControl','states','134dvrsMX','match','requestFauxAnimation','registerCommand','isAggroType','Settings','battler','4680542utIEHt','update','inputtingAction','currentMaxValue','enemy','BattleStatusOffsetY','_homeY','AggroPerDmg','Game_BattlerBase_initMembers','aggroGaugeX','Game_Action_applyItemUserEffect','magicalTauntMembers','provoke-line-color','addChild','addState','shift','traitObjects','ConfigManager_applyData','bypassProvoke','HITTYPE_PHYSICAL','battleUIOffsetY','reduce','gaugeRate','randomTarget','Game_Action_applyGlobal','refresh','Aggro','ShowLines','width','_physicalTauntAnimation','height','isStateAffected','min','arcHeight','isMagical','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','applyData','aggroGaugeY','members','format','convertBattleTargetToString','gainAggro','iconWidth','AggroPerHeal','_certainHitTauntAnimation','_targetX','bypassTaunt','call','showVisualAtbGauge','setup','AddOption','Game_Battler_addState','magical','indexOf','stateHasProvoke','index','AggroControlSystem','NUM','tgrMax','ShowFacesListStyle','isProvokeAffected','push','ARRAYSTRUCT','Sprite_Actor_createStateSprite','scope','scale','HeightOrigin','_menuAggroType','VisuMZ_2_BattleSystemATB','_%1TauntAnimation','children','aliveMembers','_sprites','Window_Options_addGeneralOptions','bitmap','setAggro','partsSize','1008779vmjMzf','clearProvokers','_tauntAnimationCycle','Sprite_Gauge_drawValue','AniCertain','PartsSize','%1Taunt','provoker','maxSprites','AnchorY','anchor','Sprite_Battler_initMembers','isAtbGaugeVisible','addAggroControlSystemProvokeCommand','toUpperCase','certainHit','2rVknoP','_statusWindow','currentValue','ConvertParams','checkCacheKey','isBypassProvoke','GaugeColor1','tgr','applySubjectAggro','tauntTargetsForAlive','GaugeColor2','findTgrMember','Provoke','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','addAggroControlSystemCommands','isPlaytest','visible','bitmapHeight','#%1','boxWidth','status','aggro','91331htEkas','boxHeight','addGeneralOptions','placeActorName','_mirrorActorTauntAnimations','subject','physicalTauntMembers','time','HITTYPE_CERTAIN','_tauntAnimationTimer','CycleTime','ActorSetAggro','Sprite_Gauge_currentValue','isAggroGaugeVisible','Sprite_Gauge_currentMaxValue','actor','provokeLineColor','isAggroGaugeShown','aggroGaugeColor1','BattleCore','FUNC','length','ShowAnimation','_aggroGaugeSprite','_targetIndex','itemRect','inBattle','getColor','_damageContainer','gaugeHeight','parse','applyItemUserEffect','applyItemUserEffectAggroControl','gaugeColor2','isPhysical','physicalTaunt','prototype','MuteAnimations','nameX','battleAggro','Game_BattlerBase_refresh','drawCircle','actorId','randomTauntTarget','VisuMZ_1_BattleCore','smoothTarget','hitType','gaugeColor1','createStateSprite','isActor','heightOrigin','isEnemy','2jvruSu','highestTgrMember','map','8327dSwXUm','31043tIITgp','Sprite_Gauge_gaugeX','Window_StatusBase_placeActorName','Taunt','provokeBitmap','Sprite_Battler_update','ARRAYEVAL','tgrMin','AniMagical','clamp','leftwardAnimation','list','EnemyIndex','battleLayoutStyle','ArcHeight','aggroGaugeColor2','applyTauntFilters','max','isTargetHighestTGR','includes','_mainSprite','optDisplayTp','padding','isBypassTaunt','physical','aggro-gauge-color-2','addCommand','_provokeContainer','EnemyChangeAggro','createAggroGauge','friendsUnit','createProvokeSprite','_colorCache','updateSubPositions','ConfigManager_makeData','targetsForAlive','AdjustOptionsRect','startNewTauntAnimation','155525kIeHSS','filter','_statusType','certainHitTaunt','exit','updateTauntAnimations','updateOpacity','maxCommands','trim','provokeHeightOrigin','matchTauntType','name','Sprite_Gauge_update','AniPhysical','taunting','currentMaxValueAggroControl','VisuMZ_0_CoreEngine','Opacity','aggroMultiplier','nameY','initialize','Game_Battler_onBattleEnd','3qbaFzc','opacity','_provokeBitmap','provokeOrigin','isAlive','opponentsUnit','ARRAYFUNC','isSceneBattle','HITTYPE_MAGICAL'];const _0x29c2=function(_0x1f0129,_0x10b390){_0x1f0129=_0x1f0129-0x7a;let _0x373596=_0x3735[_0x1f0129];return _0x373596;};const _0x2863f9=_0x29c2;(function(_0x4ee431,_0xf663e){const _0xfe5faf=_0x29c2;while(!![]){try{const _0xc252c0=-parseInt(_0xfe5faf(0x9e))+-parseInt(_0xfe5faf(0x157))*parseInt(_0xfe5faf(0xf8))+-parseInt(_0xfe5faf(0x138))*parseInt(_0xfe5faf(0xfc))+parseInt(_0xfe5faf(0xfb))*-parseInt(_0xfe5faf(0x1a5))+parseInt(_0xfe5faf(0x16b))*-parseInt(_0xfe5faf(0x122))+parseInt(_0xfe5faf(0xae))*parseInt(_0xfe5faf(0xc4))+parseInt(_0xfe5faf(0x1ac));if(_0xc252c0===_0xf663e)break;else _0x4ee431['push'](_0x4ee431['shift']());}catch(_0x34f114){_0x4ee431['push'](_0x4ee431['shift']());}}}(_0x3735,0xda6c7));var label=_0x2863f9(0x89),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x3ebf09){const _0x54797d=_0x2863f9;return _0x3ebf09[_0x54797d(0xc2)]&&_0x3ebf09[_0x54797d(0x18f)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x2863f9(0x1aa)]=VisuMZ[label][_0x2863f9(0x1aa)]||{},VisuMZ['ConvertParams']=function(_0x3ef89c,_0x2c92a5){const _0x138833=_0x2863f9;for(const _0xe2b88 in _0x2c92a5){if(_0xe2b88[_0x138833(0x1a6)](/(.*):(.*)/i)){const _0x2d0241=String(RegExp['$1']),_0x493a48=String(RegExp['$2'])[_0x138833(0xac)]()[_0x138833(0x12a)]();let _0x1e484b,_0x27c374,_0xb9c397;switch(_0x493a48){case _0x138833(0x8a):_0x1e484b=_0x2c92a5[_0xe2b88]!==''?Number(_0x2c92a5[_0xe2b88]):0x0;break;case _0x138833(0x193):_0x27c374=_0x2c92a5[_0xe2b88]!==''?JSON[_0x138833(0xe2)](_0x2c92a5[_0xe2b88]):[],_0x1e484b=_0x27c374[_0x138833(0xfa)](_0x2e9bd5=>Number(_0x2e9bd5));break;case _0x138833(0x198):_0x1e484b=_0x2c92a5[_0xe2b88]!==''?eval(_0x2c92a5[_0xe2b88]):null;break;case _0x138833(0x102):_0x27c374=_0x2c92a5[_0xe2b88]!==''?JSON[_0x138833(0xe2)](_0x2c92a5[_0xe2b88]):[],_0x1e484b=_0x27c374[_0x138833(0xfa)](_0x4abe09=>eval(_0x4abe09));break;case'JSON':_0x1e484b=_0x2c92a5[_0xe2b88]!==''?JSON[_0x138833(0xe2)](_0x2c92a5[_0xe2b88]):'';break;case _0x138833(0x151):_0x27c374=_0x2c92a5[_0xe2b88]!==''?JSON[_0x138833(0xe2)](_0x2c92a5[_0xe2b88]):[],_0x1e484b=_0x27c374['map'](_0x3d0fa8=>JSON['parse'](_0x3d0fa8));break;case _0x138833(0xd8):_0x1e484b=_0x2c92a5[_0xe2b88]!==''?new Function(JSON[_0x138833(0xe2)](_0x2c92a5[_0xe2b88])):new Function('return\x200');break;case _0x138833(0x13e):_0x27c374=_0x2c92a5[_0xe2b88]!==''?JSON[_0x138833(0xe2)](_0x2c92a5[_0xe2b88]):[],_0x1e484b=_0x27c374[_0x138833(0xfa)](_0x185b74=>new Function(JSON[_0x138833(0xe2)](_0x185b74)));break;case'STR':_0x1e484b=_0x2c92a5[_0xe2b88]!==''?String(_0x2c92a5[_0xe2b88]):'';break;case'ARRAYSTR':_0x27c374=_0x2c92a5[_0xe2b88]!==''?JSON['parse'](_0x2c92a5[_0xe2b88]):[],_0x1e484b=_0x27c374['map'](_0x31a770=>String(_0x31a770));break;case'STRUCT':_0xb9c397=_0x2c92a5[_0xe2b88]!==''?JSON[_0x138833(0xe2)](_0x2c92a5[_0xe2b88]):{},_0x1e484b=VisuMZ['ConvertParams']({},_0xb9c397);break;case _0x138833(0x8f):_0x27c374=_0x2c92a5[_0xe2b88]!==''?JSON[_0x138833(0xe2)](_0x2c92a5[_0xe2b88]):[],_0x1e484b=_0x27c374[_0x138833(0xfa)](_0x1f138f=>VisuMZ['ConvertParams']({},JSON[_0x138833(0xe2)](_0x1f138f)));break;default:continue;}_0x3ef89c[_0x2d0241]=_0x1e484b;}}return _0x3ef89c;},(_0x2c6781=>{const _0x18ca26=_0x2863f9,_0x15aede=_0x2c6781[_0x18ca26(0x12d)];for(const _0x15be0a of dependencies){if(!Imported[_0x15be0a]){alert(_0x18ca26(0xbb)[_0x18ca26(0x1d3)](_0x15aede,_0x15be0a)),SceneManager[_0x18ca26(0x126)]();break;}}const _0x4afc5c=_0x2c6781['description'];if(_0x4afc5c[_0x18ca26(0x1a6)](/\[Version[ ](.*?)\]/i)){const _0x488a22=Number(RegExp['$1']);_0x488a22!==VisuMZ[label][_0x18ca26(0x197)]&&(alert(_0x18ca26(0x1cf)[_0x18ca26(0x1d3)](_0x15aede,_0x488a22)),SceneManager['exit']());}if(_0x4afc5c['match'](/\[Tier[ ](\d+)\]/i)){const _0xe7b085=Number(RegExp['$1']);_0xe7b085<tier?(alert(_0x18ca26(0x18a)[_0x18ca26(0x1d3)](_0x15aede,_0xe7b085,tier)),SceneManager[_0x18ca26(0x126)]()):tier=Math['max'](_0xe7b085,tier);}VisuMZ[_0x18ca26(0xb1)](VisuMZ[label][_0x18ca26(0x1aa)],_0x2c6781[_0x18ca26(0x18d)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x2863f9(0x12d)],'ActorChangeAggro',_0x3cf50f=>{const _0x1b94cd=_0x2863f9;if(!$gameParty[_0x1b94cd(0xde)]())return;VisuMZ['ConvertParams'](_0x3cf50f,_0x3cf50f);const _0x3fb694=$gameActors[_0x1b94cd(0xd3)](_0x3cf50f[_0x1b94cd(0x1a2)]),_0x19a81f=_0x3cf50f[_0x1b94cd(0x1c6)];if(_0x3fb694)_0x3fb694[_0x1b94cd(0x7a)](_0x19a81f);}),PluginManager[_0x2863f9(0x1a8)](pluginData[_0x2863f9(0x12d)],_0x2863f9(0xcf),_0x59502a=>{const _0x4f756a=_0x2863f9;if(!$gameParty[_0x4f756a(0xde)]())return;VisuMZ['ConvertParams'](_0x59502a,_0x59502a);const _0x542a14=$gameActors[_0x4f756a(0xd3)](_0x59502a[_0x4f756a(0x1a2)]),_0x5bbecc=_0x59502a[_0x4f756a(0x1c6)];if(_0x542a14)_0x542a14[_0x4f756a(0x9c)](_0x5bbecc);}),PluginManager[_0x2863f9(0x1a8)](pluginData[_0x2863f9(0x12d)],_0x2863f9(0x118),_0x7c73f3=>{const _0x2a7d4e=_0x2863f9;if(!$gameParty[_0x2a7d4e(0xde)]())return;VisuMZ[_0x2a7d4e(0xb1)](_0x7c73f3,_0x7c73f3);const _0x19212b=$gameTroop[_0x2a7d4e(0x1d2)]()[_0x7c73f3[_0x2a7d4e(0x108)]],_0x12ea23=_0x7c73f3['Aggro'];if(_0x19212b)_0x19212b[_0x2a7d4e(0x7a)](_0x12ea23);}),PluginManager[_0x2863f9(0x1a8)](pluginData[_0x2863f9(0x12d)],_0x2863f9(0x149),_0x4f9182=>{const _0x7709f6=_0x2863f9;if(!$gameParty[_0x7709f6(0xde)]())return;VisuMZ[_0x7709f6(0xb1)](_0x4f9182,_0x4f9182);const _0x548047=$gameTroop['members']()[_0x4f9182['EnemyIndex']],_0x17483a=_0x4f9182[_0x7709f6(0x1c6)];if(_0x548047)_0x548047[_0x7709f6(0x9c)](_0x17483a);}),DataManager[_0x2863f9(0x87)]=function(_0x39a048){const _0x24b412=_0x2863f9;if(!_0x39a048)return![];return _0x39a048[_0x24b412(0x173)]['match'](/<PROVOKE>/i);},DataManager['isBypassProvoke']=function(_0x1f9110){const _0x45f56e=_0x2863f9;if(!_0x1f9110)return![];return _0x1f9110[_0x45f56e(0x173)]['match'](/<BYPASS PROVOKE>/i);},DataManager['isBypassTaunt']=function(_0x436812){const _0x262fd4=_0x2863f9;if(!_0x436812)return![];return _0x436812['note'][_0x262fd4(0x1a6)](/<BYPASS TAUNT>/i);},DataManager[_0x2863f9(0x152)]=function(_0x45ddf5){const _0x10471d=_0x2863f9;if(!_0x45ddf5)return![];return _0x45ddf5[_0x10471d(0x173)][_0x10471d(0x1a6)](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},DataManager['alwaysTargetHighestAggro']=function(_0x4a6977){const _0x4c71fd=_0x2863f9;if(!_0x4a6977)return![];return _0x4a6977[_0x4c71fd(0x173)][_0x4c71fd(0x1a6)](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},ImageManager['provokeBitmap']=function(){const _0x27b072=_0x2863f9;if(this[_0x27b072(0x13a)])return this[_0x27b072(0x13a)];return this[_0x27b072(0x13a)]=new Bitmap(0x64,0x64),this['_provokeBitmap'][_0x27b072(0xed)](0x32,0x32,0x32,ColorManager[_0x27b072(0xd4)]()),this['_provokeBitmap'][_0x27b072(0x188)]=![],this[_0x27b072(0x13a)];},ConfigManager['aggroGauge']=!![],ConfigManager[_0x2863f9(0x13b)]=!![],VisuMZ[_0x2863f9(0x89)][_0x2863f9(0x11e)]=ConfigManager['makeData'],ConfigManager['makeData']=function(){const _0x300b26=_0x2863f9,_0x563fa5=VisuMZ[_0x300b26(0x89)][_0x300b26(0x11e)][_0x300b26(0x80)](this);return _0x563fa5['aggroGauge']=this['aggroGauge'],_0x563fa5['provokeOrigin']=this[_0x300b26(0x13b)],_0x563fa5;},VisuMZ[_0x2863f9(0x89)][_0x2863f9(0x1bd)]=ConfigManager['applyData'],ConfigManager[_0x2863f9(0x1d0)]=function(_0x1c74ed){const _0x1ea88f=_0x2863f9;VisuMZ['AggroControlSystem'][_0x1ea88f(0x1bd)][_0x1ea88f(0x80)](this,_0x1c74ed),_0x1ea88f(0x144)in _0x1c74ed?this['aggroGauge']=_0x1c74ed['aggroGauge']:this[_0x1ea88f(0x144)]=!![],_0x1ea88f(0x13b)in _0x1c74ed?this[_0x1ea88f(0x13b)]=_0x1c74ed['provokeOrigin']:this[_0x1ea88f(0x13b)]=!![];},TextManager[_0x2863f9(0x144)]=VisuMZ[_0x2863f9(0x89)][_0x2863f9(0x1aa)][_0x2863f9(0x1c6)][_0x2863f9(0x174)],TextManager[_0x2863f9(0x13b)]=VisuMZ[_0x2863f9(0x89)][_0x2863f9(0x1aa)][_0x2863f9(0xba)][_0x2863f9(0x174)],ColorManager['getColorDataFromPluginParameters']=function(_0x298836,_0x45fff7){const _0x4ffecb=_0x2863f9;return _0x45fff7=String(_0x45fff7),this[_0x4ffecb(0x11c)]=this[_0x4ffecb(0x11c)]||{},_0x45fff7[_0x4ffecb(0x1a6)](/#(.*)/i)?this[_0x4ffecb(0x11c)][_0x298836]=_0x4ffecb(0xc0)[_0x4ffecb(0x1d3)](String(RegExp['$1'])):this[_0x4ffecb(0x11c)][_0x298836]=this[_0x4ffecb(0x1a1)](Number(_0x45fff7)),this[_0x4ffecb(0x11c)][_0x298836];},ColorManager[_0x2863f9(0xdf)]=function(_0x393387){const _0x1c1d36=_0x2863f9;return _0x393387=String(_0x393387),_0x393387[_0x1c1d36(0x1a6)](/#(.*)/i)?_0x1c1d36(0xc0)['format'](String(RegExp['$1'])):this[_0x1c1d36(0x1a1)](Number(_0x393387));},ColorManager[_0x2863f9(0xd4)]=function(){const _0x238918=_0x2863f9,_0x21503f=_0x238918(0x1b8);this[_0x238918(0x11c)]=this[_0x238918(0x11c)]||{};if(this['_colorCache'][_0x21503f])return this[_0x238918(0x11c)][_0x21503f];const _0x4711f7=VisuMZ[_0x238918(0x89)][_0x238918(0x1aa)][_0x238918(0xba)][_0x238918(0x183)];return this[_0x238918(0x14d)](_0x21503f,_0x4711f7);},ColorManager['aggroGaugeColor1']=function(){const _0x18ebdb=_0x2863f9,_0x3a8dcf=_0x18ebdb(0x19e);this[_0x18ebdb(0x11c)]=this['_colorCache']||{};if(this['_colorCache'][_0x3a8dcf])return this[_0x18ebdb(0x11c)][_0x3a8dcf];const _0x50f0f6=VisuMZ[_0x18ebdb(0x89)][_0x18ebdb(0x1aa)][_0x18ebdb(0x1c6)][_0x18ebdb(0xb4)];return this[_0x18ebdb(0x14d)](_0x3a8dcf,_0x50f0f6);},ColorManager[_0x2863f9(0x10b)]=function(){const _0x54cabd=_0x2863f9,_0x3d9a3e=_0x54cabd(0x115);this['_colorCache']=this[_0x54cabd(0x11c)]||{};if(this['_colorCache'][_0x3d9a3e])return this['_colorCache'][_0x3d9a3e];const _0x325c19=VisuMZ[_0x54cabd(0x89)][_0x54cabd(0x1aa)][_0x54cabd(0x1c6)][_0x54cabd(0xb8)];return this[_0x54cabd(0x14d)](_0x3d9a3e,_0x325c19);},SceneManager[_0x2863f9(0x13f)]=function(){const _0x1c0dcd=_0x2863f9;return this['_scene']&&this[_0x1c0dcd(0x14b)][_0x1c0dcd(0x143)]===Scene_Battle;},BattleManager['convertBattleTargetToString']=function(_0x3ec0f0){const _0x5ad8a7=_0x2863f9,_0x36910e=this[_0x5ad8a7(0x162)];if(!_0x36910e)return null;if(_0x36910e[_0x5ad8a7(0xf5)]()&&_0x3ec0f0[_0x5ad8a7(0xf7)]())return _0x5ad8a7(0x180)[_0x5ad8a7(0x1d3)](_0x36910e[_0x5ad8a7(0xee)]());else{if(_0x36910e[_0x5ad8a7(0xf7)]()&&_0x3ec0f0['isActor']())return'Battle\x20Enemy\x20%1'['format'](_0x36910e[_0x5ad8a7(0x88)]());}return null;},BattleManager[_0x2863f9(0x18e)]=function(_0x5c43c3){const _0x380366=_0x2863f9;if(!_0x5c43c3)return null;if(_0x5c43c3[_0x380366(0x1a6)](/BATTLE ACTOR (\d+)/i))return $gameActors[_0x380366(0xd3)](Number(RegExp['$1']));else{if(_0x5c43c3[_0x380366(0x1a6)](/BATTLE ENEMY (\d+)/i))return $gameTroop[_0x380366(0x1d2)]()[Number(RegExp['$1'])];}return null;},BattleManager[_0x2863f9(0x10e)]=function(){const _0x4d96f1=_0x2863f9;return VisuMZ['AggroControlSystem'][_0x4d96f1(0x1aa)][_0x4d96f1(0x1c6)]['PriorityHighest'];},VisuMZ['AggroControlSystem']['Game_Action_targetsForAlive']=Game_Action['prototype'][_0x2863f9(0x11f)],Game_Action[_0x2863f9(0xe8)][_0x2863f9(0x11f)]=function(_0x34c234){const _0x4a9092=_0x2863f9;if(this[_0x4a9092(0x8d)]())return this['makeProvokeTarget']();else{if(this[_0x4a9092(0x160)]())return this[_0x4a9092(0xb7)](_0x34c234);else return this['isAggroAffected']()?[_0x34c234[_0x4a9092(0xf9)]()]:VisuMZ[_0x4a9092(0x89)]['Game_Action_targetsForAlive'][_0x4a9092(0x80)](this,_0x34c234);}},Game_Action['prototype'][_0x2863f9(0x8d)]=function(){const _0x4d8f47=_0x2863f9;if(this['item']()[_0x4d8f47(0x91)]!==0x1)return![];if(DataManager['isBypassProvoke'](this[_0x4d8f47(0x14c)]()))return![];if(this[_0x4d8f47(0xc9)]()[_0x4d8f47(0x1be)]())return![];return this[_0x4d8f47(0xc9)]()[_0x4d8f47(0x8d)]();},Game_Action[_0x2863f9(0xe8)]['makeProvokeTarget']=function(){const _0x43ecde=_0x2863f9;return[this['subject']()[_0x43ecde(0xa5)]()];},Game_Action['prototype'][_0x2863f9(0x160)]=function(){const _0x1ad8d9=_0x2863f9;if(this[_0x1ad8d9(0x14c)]()[_0x1ad8d9(0x91)]!==0x1)return![];if(DataManager[_0x1ad8d9(0x113)](this[_0x1ad8d9(0x14c)]()))return![];if(this[_0x1ad8d9(0xc9)]()[_0x1ad8d9(0x7f)]())return![];const _0x5ea05e=this[_0x1ad8d9(0x13d)]();if(this['isPhysical']()&&_0x5ea05e[_0x1ad8d9(0xca)]()[_0x1ad8d9(0xd9)]>0x0)return!![];if(this[_0x1ad8d9(0x1ce)]()&&_0x5ea05e[_0x1ad8d9(0x1b7)]()['length']>0x0)return!![];if(this[_0x1ad8d9(0x153)]()&&_0x5ea05e[_0x1ad8d9(0x16f)]()[_0x1ad8d9(0xd9)]>0x0)return!![];return![];},Game_Action[_0x2863f9(0xe8)][_0x2863f9(0xb7)]=function(_0x40133a){const _0x371510=_0x2863f9;if(this[_0x371510(0xdc)]<0x0)return[_0x40133a[_0x371510(0xef)](this['item']()[_0x371510(0xf2)])];else{const _0x1692e6=_0x40133a[_0x371510(0xf1)](this[_0x371510(0xdc)]);return _0x1692e6[_0x371510(0x12c)](this['item']()[_0x371510(0xf2)])?[_0x1692e6]:[_0x40133a['randomTauntTarget']()];}},Game_Action['prototype']['isAggroAffected']=function(){const _0x3e7778=_0x2863f9;if(this[_0x3e7778(0x14c)]()[_0x3e7778(0x91)]!==0x1)return![];if(this[_0x3e7778(0xdc)]>=0x0)return![];if(DataManager[_0x3e7778(0x152)](this['item']()))return![];if(this['subject']()[_0x3e7778(0x19a)]())return![];if(DataManager[_0x3e7778(0x163)](this[_0x3e7778(0x14c)]()))return!![];if(this[_0x3e7778(0xc9)]()[_0x3e7778(0x163)]())return!![];return BattleManager[_0x3e7778(0x10e)]();},VisuMZ[_0x2863f9(0x89)][_0x2863f9(0x1c4)]=Game_Action[_0x2863f9(0xe8)][_0x2863f9(0x15d)],Game_Action[_0x2863f9(0xe8)][_0x2863f9(0x15d)]=function(){const _0xa9ca94=_0x2863f9;VisuMZ[_0xa9ca94(0x89)]['Game_Action_applyGlobal']['call'](this),this[_0xa9ca94(0xb6)]();},Game_Action[_0x2863f9(0xe8)]['applySubjectAggro']=function(){const _0x233420=_0x2863f9,_0x27d297=this['item']()['note'];if(_0x27d297['match'](/<(?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT): ([\+\-]\d+)>/i)){const _0x4f4d8b=Number(RegExp['$1']);this[_0x233420(0xc9)]()[_0x233420(0x7a)](_0x4f4d8b);}if(_0x27d297[_0x233420(0x1a6)](/<JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>\s*([\s\S]*)\s*<\/JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>/i)){const _0x19817c=String(RegExp['$1']),_0x6a18a1=this[_0x233420(0xc9)](),_0x578563=this[_0x233420(0x14c)](),_0x254fe3=this[_0x233420(0xc9)](),_0x5d594e=_0x254fe3;let _0xb76b40=_0x6a18a1[_0x233420(0xeb)]();try{eval(_0x19817c);}catch(_0x500ca8){if($gameTemp[_0x233420(0xbd)]())console[_0x233420(0x178)](_0x500ca8);}_0x6a18a1[_0x233420(0x9c)](_0xb76b40);}},VisuMZ[_0x2863f9(0x89)][_0x2863f9(0x1b6)]=Game_Action['prototype'][_0x2863f9(0xe3)],Game_Action[_0x2863f9(0xe8)][_0x2863f9(0xe3)]=function(_0x4b3727){const _0x4f8440=_0x2863f9;VisuMZ[_0x4f8440(0x89)][_0x4f8440(0x1b6)]['call'](this,_0x4b3727),this[_0x4f8440(0xe4)](_0x4b3727);},Game_Action[_0x2863f9(0xe8)]['applyItemUserEffectAggroControl']=function(_0x45e496){const _0x3ab737=_0x2863f9;if(!this['item']())return;if(!SceneManager[_0x3ab737(0x13f)]())return;const _0x526104=this['item']()[_0x3ab737(0x173)];if(_0x526104[_0x3ab737(0x1a6)](/<TARGET (?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)){const _0x144dda=Number(RegExp['$1']);_0x45e496[_0x3ab737(0x7a)](_0x144dda);}if(_0x526104[_0x3ab737(0x1a6)](/<JS TARGET (?:AGGRO|ENMITY|THREAT)>\s*([\s\S]*)\s*<\/JS TARGET (?:AGGRO|ENMITY|THREAT)>/i)){const _0x373f70=String(RegExp['$1']),_0x405f8b=this[_0x3ab737(0xc9)](),_0x413dac=this['item'](),_0x39aefd=this[_0x3ab737(0xc9)](),_0x216c54=_0x45e496;let _0x51fddf=_0x45e496[_0x3ab737(0xeb)]();try{eval(_0x373f70);}catch(_0x261b27){if($gameTemp[_0x3ab737(0xbd)]())console[_0x3ab737(0x178)](_0x261b27);}_0x45e496['setAggro'](_0x51fddf);}},VisuMZ['AggroControlSystem']['Game_Action_executeHpDamage']=Game_Action[_0x2863f9(0xe8)][_0x2863f9(0x156)],Game_Action['prototype'][_0x2863f9(0x156)]=function(_0x273e67,_0x5ab025){const _0x28d6a0=_0x2863f9;VisuMZ[_0x28d6a0(0x89)]['Game_Action_executeHpDamage'][_0x28d6a0(0x80)](this,_0x273e67,_0x5ab025),this['executeHpDamageAggroControl'](_0x273e67,_0x5ab025);},Game_Action[_0x2863f9(0xe8)]['executeHpDamageAggroControl']=function(_0x4a28a5,_0x70438b){const _0x7c583d=_0x2863f9,_0x3d9c1c=VisuMZ[_0x7c583d(0x89)]['Settings'][_0x7c583d(0x1c6)];if(_0x70438b>0x0&&_0x4a28a5['isActor']()!==this[_0x7c583d(0xc9)]()[_0x7c583d(0xf5)]()){const _0x3e110c=_0x3d9c1c[_0x7c583d(0x1b3)];this[_0x7c583d(0xc9)]()[_0x7c583d(0x7a)](_0x3e110c*_0x70438b);}if(_0x70438b<0x0&&_0x4a28a5[_0x7c583d(0xf5)]()===this['subject']()[_0x7c583d(0xf5)]()){const _0x55de56=_0x3d9c1c[_0x7c583d(0x7c)];this[_0x7c583d(0xc9)]()['gainAggro'](_0x55de56*Math['abs'](_0x70438b));}},VisuMZ[_0x2863f9(0x89)][_0x2863f9(0x1b4)]=Game_BattlerBase[_0x2863f9(0xe8)][_0x2863f9(0x175)],Game_BattlerBase['prototype']['initMembers']=function(){const _0x3bb9a2=_0x2863f9;this[_0x3bb9a2(0x187)]={},VisuMZ[_0x3bb9a2(0x89)][_0x3bb9a2(0x1b4)][_0x3bb9a2(0x80)](this),this[_0x3bb9a2(0x16c)]();},Game_BattlerBase[_0x2863f9(0xe8)]['initAggroControl']=function(){const _0x2dac03=_0x2863f9;this[_0x2dac03(0x9f)](),this[_0x2dac03(0x169)]();},Game_BattlerBase[_0x2863f9(0xe8)]['clearProvokers']=function(){const _0x1fa021=_0x2863f9;this[_0x1fa021(0x181)]={};},VisuMZ[_0x2863f9(0x89)][_0x2863f9(0xec)]=Game_BattlerBase[_0x2863f9(0xe8)][_0x2863f9(0x1c5)],Game_BattlerBase['prototype']['refresh']=function(){const _0x3aa4fc=_0x2863f9;this[_0x3aa4fc(0x187)]={},VisuMZ[_0x3aa4fc(0x89)][_0x3aa4fc(0xec)]['call'](this);},Game_BattlerBase[_0x2863f9(0xe8)][_0x2863f9(0xb2)]=function(_0x5192b3){const _0x4f0821=_0x2863f9;return this[_0x4f0821(0x187)]=this['_cache']||{},this[_0x4f0821(0x187)][_0x5192b3]!==undefined;},Game_BattlerBase[_0x2863f9(0xe8)][_0x2863f9(0xa5)]=function(){const _0x47955a=_0x2863f9;for(const _0x12741c of this[_0x47955a(0x1a4)]()){if(DataManager[_0x47955a(0x87)](_0x12741c)){if(this[_0x47955a(0x181)]===undefined)this[_0x47955a(0x9f)]();const _0x345ad1=this[_0x47955a(0x181)][_0x12741c['id']],_0x167b25=BattleManager[_0x47955a(0x18e)](_0x345ad1);if(_0x167b25&&_0x167b25['isAlive']())return _0x167b25;}}return null;},Game_BattlerBase[_0x2863f9(0xe8)][_0x2863f9(0x8d)]=function(){return!!this['provoker']();},Game_BattlerBase[_0x2863f9(0xe8)][_0x2863f9(0x1be)]=function(){const _0x30a5b2=_0x2863f9;return this['traitObjects']()[_0x30a5b2(0x170)](_0x1c23dc=>_0x1c23dc&&_0x1c23dc['note'][_0x30a5b2(0x1a6)](/<BYPASS PROVOKE>/i));},Game_BattlerBase[_0x2863f9(0xe8)]['provokeHeightOrigin']=function(){const _0x5e3490=_0x2863f9;let _0x4dc0fc=_0x5e3490(0x12b);if(this[_0x5e3490(0xb2)](_0x4dc0fc))return this[_0x5e3490(0x187)][_0x4dc0fc];return this[_0x5e3490(0x187)][_0x4dc0fc]=this[_0x5e3490(0x17d)](),this[_0x5e3490(0x187)][_0x4dc0fc];},Game_BattlerBase['prototype'][_0x2863f9(0x17d)]=function(){const _0x5365dc=_0x2863f9,_0x2b3285=this['isActor']()?this[_0x5365dc(0xd3)]()[_0x5365dc(0x173)]:this['isEnemy']()?this[_0x5365dc(0x1b0)]()[_0x5365dc(0x173)]:'';if(_0x2b3285[_0x5365dc(0x1a6)](/<PROVOKE HEIGHT ORIGIN: (\d+)([%％])>/i))return Number(RegExp['$1'])*0.01;return VisuMZ['AggroControlSystem'][_0x5365dc(0x1aa)][_0x5365dc(0xba)][_0x5365dc(0x93)];},Game_BattlerBase[_0x2863f9(0xe8)][_0x2863f9(0x12c)]=function(_0xb1b196){const _0x109e82=_0x2863f9;switch(_0xb1b196){case Game_Action[_0x109e82(0x1bf)]:return this[_0x109e82(0xe7)]();break;case Game_Action[_0x109e82(0x140)]:return this[_0x109e82(0x189)]();break;case Game_Action['HITTYPE_CERTAIN']:return this['certainHitTaunt']();break;}},Game_BattlerBase['prototype']['taunting']=function(){const _0x5f2334=_0x2863f9;return this['physicalTaunt']()||this[_0x5f2334(0x189)]()||this[_0x5f2334(0x125)]();},Game_BattlerBase[_0x2863f9(0xe8)][_0x2863f9(0xe7)]=function(){const _0x58bbb9=_0x2863f9;return this['traitObjects']()['some'](_0x33c7fb=>_0x33c7fb&&_0x33c7fb[_0x58bbb9(0x173)][_0x58bbb9(0x1a6)](/<(?:TAUNT|PHYSICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase['prototype']['magicalTaunt']=function(){const _0x35a7c4=_0x2863f9;return this[_0x35a7c4(0x1bc)]()[_0x35a7c4(0x170)](_0x2aee52=>_0x2aee52&&_0x2aee52['note'][_0x35a7c4(0x1a6)](/<(?:TAUNT|MAGICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x2863f9(0xe8)]['certainHitTaunt']=function(){const _0x3d5199=_0x2863f9;return this[_0x3d5199(0x1bc)]()[_0x3d5199(0x170)](_0x561ea3=>_0x561ea3&&_0x561ea3[_0x3d5199(0x173)]['match'](/<(?:TAUNT|CERTAIN TAUNT|CERTAIN HIT TAUNT|ALL TAUNT)>/i));},Game_BattlerBase['prototype'][_0x2863f9(0x7f)]=function(){const _0x4965b1=_0x2863f9;return this[_0x4965b1(0x1bc)]()['some'](_0x4748c7=>_0x4748c7&&_0x4748c7[_0x4965b1(0x173)][_0x4965b1(0x1a6)](/<BYPASS TAUNT>/i));},Game_BattlerBase[_0x2863f9(0xe8)][_0x2863f9(0x169)]=function(){const _0x46ca9f=_0x2863f9;this[_0x46ca9f(0x15c)]=0x1;},VisuMZ['AggroControlSystem']['Game_BattlerBase_sparam']=Game_BattlerBase['prototype']['sparam'],Game_BattlerBase['prototype'][_0x2863f9(0x164)]=function(_0x3b3bef){const _0xe3129e=_0x2863f9;let _0x427077=VisuMZ[_0xe3129e(0x89)]['Game_BattlerBase_sparam'][_0xe3129e(0x80)](this,_0x3b3bef);if(_0x3b3bef===0x0){if(this['_aggro']===undefined)this[_0xe3129e(0x169)]();_0x427077*=this[_0xe3129e(0xc3)]();}return _0x427077;},Game_BattlerBase[_0x2863f9(0xe8)][_0x2863f9(0x9c)]=function(_0x198fab){const _0x11602d=_0x2863f9;if(this[_0x11602d(0x15c)]===undefined)this['clearAggro']();this['_aggro']=Math['max'](0x1,Math['round'](this[_0x11602d(0x15c)]));},Game_BattlerBase[_0x2863f9(0xe8)]['gainAggro']=function(_0x220312){const _0x2d2c7d=_0x2863f9;if(this[_0x2d2c7d(0x15c)]===undefined)this[_0x2d2c7d(0x169)]();this['_aggro']=Math[_0x2d2c7d(0x10d)](0x1,this[_0x2d2c7d(0x15c)]+Math['round'](_0x220312));},Game_BattlerBase['prototype']['loseAggro']=function(_0x9b35c4){const _0x1de190=_0x2863f9;this[_0x1de190(0x7a)](-_0x9b35c4);},Game_BattlerBase[_0x2863f9(0xe8)][_0x2863f9(0xc3)]=function(){const _0x1c27a4=_0x2863f9;if(this['isDead']())return 0x0;return this['baseAggro']()*this[_0x1c27a4(0x134)]();},Game_BattlerBase['prototype'][_0x2863f9(0xeb)]=function(){const _0x55c39a=_0x2863f9;return this[_0x55c39a(0x15c)]===undefined&&this['clearAggro'](),this[_0x55c39a(0x15c)];},Game_BattlerBase[_0x2863f9(0xe8)][_0x2863f9(0x185)]=function(){const _0x582f80=_0x2863f9;return this['traitObjects']()[_0x582f80(0x1c1)]((_0x1cb2e2,_0x2c4a37)=>{const _0x4c4363=_0x582f80;return _0x2c4a37&&_0x2c4a37['note'][_0x4c4363(0x1a6)](/<(?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)?_0x1cb2e2+Number(RegExp['$1'])/0x64:_0x1cb2e2;},this[_0x582f80(0xeb)]());},Game_BattlerBase['prototype']['aggroMultiplier']=function(){const _0x158bb0=_0x2863f9;return this['traitObjects']()[_0x158bb0(0x1c1)]((_0x4b9b51,_0x156cf3)=>{const _0x3823a0=_0x158bb0;return _0x156cf3&&_0x156cf3[_0x3823a0(0x173)][_0x3823a0(0x1a6)](/<(?:AGGRO|ENMITY|THREAT) MULTIPLIER: (\d+)%>/i)?_0x4b9b51+Number(RegExp['$1'])/0x64:_0x4b9b51;},0x1);},Game_BattlerBase[_0x2863f9(0xe8)][_0x2863f9(0x19a)]=function(){const _0x45823e=_0x2863f9;return this['traitObjects']()[_0x45823e(0x170)](_0x5ad3ff=>_0x5ad3ff&&_0x5ad3ff['note'][_0x45823e(0x1a6)](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},Game_BattlerBase[_0x2863f9(0xe8)][_0x2863f9(0x163)]=function(){const _0xee6b99=_0x2863f9;return this['traitObjects']()['some'](_0x118dee=>_0x118dee&&_0x118dee[_0xee6b99(0x173)][_0xee6b99(0x1a6)](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},VisuMZ[_0x2863f9(0x89)]['Game_Battler_onBattleStart']=Game_Battler[_0x2863f9(0xe8)][_0x2863f9(0x141)],Game_Battler[_0x2863f9(0xe8)][_0x2863f9(0x141)]=function(_0x3fbbd8){const _0x1f509d=_0x2863f9;VisuMZ[_0x1f509d(0x89)][_0x1f509d(0x19f)][_0x1f509d(0x80)](this,_0x3fbbd8),this[_0x1f509d(0x169)]();},VisuMZ[_0x2863f9(0x89)][_0x2863f9(0x137)]=Game_Battler[_0x2863f9(0xe8)]['onBattleEnd'],Game_Battler['prototype'][_0x2863f9(0x145)]=function(){const _0x51b1c4=_0x2863f9;VisuMZ[_0x51b1c4(0x89)][_0x51b1c4(0x137)][_0x51b1c4(0x80)](this),this[_0x51b1c4(0x169)]();},VisuMZ[_0x2863f9(0x89)][_0x2863f9(0x84)]=Game_Battler[_0x2863f9(0xe8)][_0x2863f9(0x1ba)],Game_Battler[_0x2863f9(0xe8)][_0x2863f9(0x1ba)]=function(_0x4d8f08){const _0x284861=_0x2863f9;VisuMZ[_0x284861(0x89)][_0x284861(0x84)][_0x284861(0x80)](this,_0x4d8f08),this[_0x284861(0x16e)](_0x4d8f08);},Game_Battler[_0x2863f9(0xe8)][_0x2863f9(0x16e)]=function(_0x4cb6ab){const _0x4a67cf=_0x2863f9;if(this[_0x4a67cf(0x1cb)](_0x4cb6ab)){if(this[_0x4a67cf(0x181)]===undefined)this[_0x4a67cf(0x9f)]();const _0x5ce230=BattleManager[_0x4a67cf(0x1d4)](this);this[_0x4a67cf(0x181)][_0x4cb6ab]=_0x5ce230,!this[_0x4a67cf(0x181)][_0x4cb6ab]&&delete this[_0x4a67cf(0x181)][_0x4cb6ab];}},Game_Unit[_0x2863f9(0xe8)][_0x2863f9(0xca)]=function(){const _0x478bd3=_0x2863f9;return this['aliveMembers']()[_0x478bd3(0x123)](_0x1a46dc=>_0x1a46dc&&_0x1a46dc[_0x478bd3(0xe7)]());},Game_Unit[_0x2863f9(0xe8)]['magicalTauntMembers']=function(){const _0x2e3a79=_0x2863f9;return this[_0x2e3a79(0x98)]()[_0x2e3a79(0x123)](_0x22325a=>_0x22325a&&_0x22325a[_0x2e3a79(0x189)]());},Game_Unit['prototype'][_0x2863f9(0x16f)]=function(){const _0x216ed0=_0x2863f9;return this[_0x216ed0(0x98)]()[_0x216ed0(0x123)](_0x36f60e=>_0x36f60e&&_0x36f60e[_0x216ed0(0x125)]());},Game_Unit[_0x2863f9(0xe8)][_0x2863f9(0xef)]=function(_0x2bd49b){const _0x548520=_0x2863f9;let _0x1b12b6=[];switch(_0x2bd49b){case Game_Action[_0x548520(0x1bf)]:_0x1b12b6=this[_0x548520(0xca)]();break;case Game_Action['HITTYPE_MAGICAL']:_0x1b12b6=this[_0x548520(0x1b7)]();break;case Game_Action[_0x548520(0xcc)]:_0x1b12b6=this[_0x548520(0x16f)]();break;}let _0x525d33=Math['random']()*this[_0x548520(0x158)](_0x1b12b6),_0x33f31e=null;if(BattleManager[_0x548520(0x10e)]()){const _0x28cbe5=!![];return this['findTgrMember'](_0x1b12b6,_0x28cbe5);}else{for(const _0x1ba830 of _0x1b12b6){_0x525d33-=_0x1ba830[_0x548520(0xb5)],_0x525d33<=0x0&&!_0x33f31e&&(_0x33f31e=_0x1ba830);}return _0x33f31e||this[_0x548520(0x1c3)]();}},Game_Unit[_0x2863f9(0xe8)][_0x2863f9(0x158)]=function(_0x43302b){const _0x5055a7=_0x2863f9;return _0x43302b[_0x5055a7(0x1c1)]((_0xf60500,_0x3d8291)=>_0xf60500+_0x3d8291[_0x5055a7(0xb5)],0x0);},Game_Unit[_0x2863f9(0xe8)][_0x2863f9(0x8b)]=function(){const _0x5652e3=_0x2863f9,_0x1c2b93=this[_0x5652e3(0x98)]()[_0x5652e3(0xfa)](_0x54fc52=>_0x54fc52[_0x5652e3(0xb5)]);return Math['max'](..._0x1c2b93);},Game_Unit[_0x2863f9(0xe8)][_0x2863f9(0x103)]=function(){const _0x3ade9d=_0x2863f9,_0x567ef3=this[_0x3ade9d(0x98)]()['map'](_0x36adad=>_0x36adad['tgr']);return Math['min'](..._0x567ef3);},Game_Unit[_0x2863f9(0xe8)][_0x2863f9(0xf9)]=function(){const _0x18caf1=_0x2863f9,_0x1ddbed=this[_0x18caf1(0x8b)](),_0x2e52cb=this[_0x18caf1(0x98)]()[_0x18caf1(0x123)](_0x797eee=>_0x797eee['tgr']===_0x1ddbed);return _0x2e52cb[Math[_0x18caf1(0x18b)](_0x2e52cb[_0x18caf1(0xd9)])]||this['randomTarget']();},Game_Unit['prototype']['lowestTgrMember']=function(){const _0x1c1512=_0x2863f9,_0xdccc51=this['tgrMin'](),_0x229d81=this[_0x1c1512(0x98)]()[_0x1c1512(0x123)](_0x419c50=>_0x419c50['tgr']===_0xdccc51);return _0x229d81[Math[_0x1c1512(0x18b)](_0x229d81[_0x1c1512(0xd9)])]||this[_0x1c1512(0x1c3)]();},Game_Unit['prototype'][_0x2863f9(0xb9)]=function(_0x4e6dcb,_0x117a96){const _0x5ec7be=_0x2863f9,_0x4d1a9e=_0x4e6dcb[_0x5ec7be(0xfa)](_0x45548d=>_0x45548d[_0x5ec7be(0xb5)]),_0xd7e00a=_0x117a96?Math['max'](..._0x4d1a9e):Math[_0x5ec7be(0x1cc)](..._0x4d1a9e),_0x3f9d6a=_0x4e6dcb[_0x5ec7be(0x123)](_0x2d8b86=>_0x2d8b86[_0x5ec7be(0xb5)]===_0xd7e00a);return _0x3f9d6a[Math[_0x5ec7be(0x18b)](_0x3f9d6a[_0x5ec7be(0xd9)])]||this[_0x5ec7be(0x1c3)]();},VisuMZ[_0x2863f9(0x89)][_0x2863f9(0x15b)]=Scene_Options[_0x2863f9(0xe8)][_0x2863f9(0x129)],Scene_Options['prototype']['maxCommands']=function(){const _0x55cc4c=_0x2863f9;let _0x4f2fe2=VisuMZ[_0x55cc4c(0x89)][_0x55cc4c(0x15b)][_0x55cc4c(0x80)](this);const _0x45e313=VisuMZ['AggroControlSystem'][_0x55cc4c(0x1aa)];if(_0x45e313[_0x55cc4c(0xba)][_0x55cc4c(0x83)]&&_0x45e313[_0x55cc4c(0xba)][_0x55cc4c(0x120)])_0x4f2fe2++;if(_0x45e313[_0x55cc4c(0x1c6)][_0x55cc4c(0x83)]&&_0x45e313['Aggro'][_0x55cc4c(0x120)])_0x4f2fe2++;return _0x4f2fe2;},Sprite_Battler[_0x2863f9(0x147)]=VisuMZ[_0x2863f9(0x89)]['Settings'][_0x2863f9(0xff)][_0x2863f9(0xce)],Sprite_Battler[_0x2863f9(0x1c9)]=VisuMZ[_0x2863f9(0x89)][_0x2863f9(0x1aa)][_0x2863f9(0xff)][_0x2863f9(0x12f)],Sprite_Battler['_magicalTauntAnimation']=VisuMZ[_0x2863f9(0x89)][_0x2863f9(0x1aa)][_0x2863f9(0xff)][_0x2863f9(0x104)],Sprite_Battler[_0x2863f9(0x7d)]=VisuMZ[_0x2863f9(0x89)][_0x2863f9(0x1aa)]['Taunt'][_0x2863f9(0xa2)],Sprite_Battler[_0x2863f9(0xc8)]=VisuMZ[_0x2863f9(0x89)][_0x2863f9(0x1aa)][_0x2863f9(0xff)]['MirrorActorAni'],Sprite_Battler['_muteTauntAnimations']=VisuMZ[_0x2863f9(0x89)]['Settings']['Taunt'][_0x2863f9(0xe9)],VisuMZ[_0x2863f9(0x89)]['Sprite_Battler_initialize']=Sprite_Battler[_0x2863f9(0xe8)][_0x2863f9(0x136)],Sprite_Battler[_0x2863f9(0xe8)]['initialize']=function(_0x5e7ad7){const _0x2a1aec=_0x2863f9;VisuMZ[_0x2a1aec(0x89)]['Sprite_Battler_initialize'][_0x2a1aec(0x80)](this,_0x5e7ad7),this['isShowPriorityLines']()&&setTimeout(this['createProvokeSprite'][_0x2a1aec(0x165)](this),0x3e8);},VisuMZ['AggroControlSystem'][_0x2863f9(0xa9)]=Sprite_Battler[_0x2863f9(0xe8)][_0x2863f9(0x175)],Sprite_Battler['prototype'][_0x2863f9(0x175)]=function(){const _0x128927=_0x2863f9;VisuMZ[_0x128927(0x89)][_0x128927(0xa9)][_0x128927(0x80)](this),this['initTauntAnimations']();},Sprite_Battler[_0x2863f9(0xe8)][_0x2863f9(0x146)]=function(){const _0x2b38c9=_0x2863f9;this['_tauntAnimationTimer']=VisuMZ[_0x2b38c9(0x89)][_0x2b38c9(0x1aa)][_0x2b38c9(0xff)][_0x2b38c9(0xce)],this[_0x2b38c9(0xa0)]=[_0x2b38c9(0x114),_0x2b38c9(0x85),_0x2b38c9(0xad)];},Sprite_Battler[_0x2863f9(0xe8)][_0x2863f9(0x166)]=function(){const _0x1754cf=_0x2863f9;if(!Imported[_0x1754cf(0xf0)])return![];if(![Sprite_Actor,Sprite_Enemy][_0x1754cf(0x10f)](this[_0x1754cf(0x143)]))return![];return ConfigManager[_0x1754cf(0x13b)]&&VisuMZ['AggroControlSystem'][_0x1754cf(0x1aa)][_0x1754cf(0xba)][_0x1754cf(0x1c7)];},Sprite_Battler[_0x2863f9(0xe8)][_0x2863f9(0x11b)]=function(){const _0x2fc041=_0x2863f9;if(!SceneManager[_0x2fc041(0x13f)]())return;this['_provokeSprite']=new Sprite_ProvokeTrail(this),this[_0x2fc041(0x167)][_0x2fc041(0x19d)]()[_0x2fc041(0x1b9)](this['_provokeSprite']);},VisuMZ[_0x2863f9(0x89)]['Sprite_Battler_setBattler']=Sprite_Battler[_0x2863f9(0xe8)]['setBattler'],Sprite_Battler[_0x2863f9(0xe8)][_0x2863f9(0x182)]=function(_0x42172a){const _0x26af8c=_0x2863f9;VisuMZ[_0x26af8c(0x89)]['Sprite_Battler_setBattler'][_0x26af8c(0x80)](this,_0x42172a);if(this[_0x26af8c(0xdb)])this[_0x26af8c(0xdb)][_0x26af8c(0x15e)]=_0x42172a;},VisuMZ[_0x2863f9(0x89)][_0x2863f9(0x101)]=Sprite_Battler[_0x2863f9(0xe8)][_0x2863f9(0x1ad)],Sprite_Battler[_0x2863f9(0xe8)][_0x2863f9(0x1ad)]=function(){const _0x44149b=_0x2863f9;VisuMZ[_0x44149b(0x89)][_0x44149b(0x101)][_0x44149b(0x80)](this),this[_0x44149b(0x127)]();},Sprite_Battler[_0x2863f9(0xe8)][_0x2863f9(0x127)]=function(){const _0x576a9d=_0x2863f9;if(!Imported[_0x576a9d(0x132)])return;if(!Imported[_0x576a9d(0xf0)])return;if(!VisuMZ[_0x576a9d(0x89)][_0x576a9d(0x1aa)][_0x576a9d(0xff)][_0x576a9d(0xda)])return;if(!this['_battler'])return;this['_tauntAnimationTimer']--,this[_0x576a9d(0xcd)]<=0x0&&this[_0x576a9d(0x121)]();},Sprite_Battler[_0x2863f9(0xe8)][_0x2863f9(0x121)]=function(){const _0x206c14=_0x2863f9;this['_tauntAnimationTimer']=Sprite_Battler[_0x206c14(0x147)];if(!this[_0x206c14(0x15e)])return;if(!this[_0x206c14(0x15e)][_0x206c14(0x130)]())return;const _0x13b89a=[this['_battler']],_0x49d712=this['getNextTauntAnimation'](),_0x4d35de=this['_battler']['isActor']()&&Sprite_Battler[_0x206c14(0xc8)],_0x10196b=Sprite_Battler['_muteTauntAnimations'];$gameTemp[_0x206c14(0x1a7)](_0x13b89a,_0x49d712,_0x4d35de,_0x10196b);},Sprite_Battler[_0x2863f9(0xe8)]['getNextTauntAnimation']=function(){const _0x4e14d4=_0x2863f9;let _0x4056f9=this['_tauntAnimationCycle']['length'];while(_0x4056f9){const _0x585f16=this[_0x4e14d4(0xa0)][_0x4e14d4(0x1bb)]();this[_0x4e14d4(0xa0)]['push'](_0x585f16);const _0x1b7075=_0x4e14d4(0xa4)[_0x4e14d4(0x1d3)](_0x585f16);if(this['_battler'][_0x1b7075]()){const _0x589668=_0x4e14d4(0x96)[_0x4e14d4(0x1d3)](_0x585f16),_0x53000b=Sprite_Battler[_0x589668];if(_0x53000b)return _0x53000b;}_0x4056f9--;}return Sprite_Battler[_0x4e14d4(0x7d)];},VisuMZ[_0x2863f9(0x89)]['Sprite_Actor_createStateSprite']=Sprite_Actor[_0x2863f9(0xe8)][_0x2863f9(0xf4)],Sprite_Actor['prototype'][_0x2863f9(0xf4)]=function(){const _0x331a55=_0x2863f9;VisuMZ['AggroControlSystem'][_0x331a55(0x90)][_0x331a55(0x80)](this),this[_0x331a55(0x119)]();},Sprite_Actor['prototype'][_0x2863f9(0x119)]=function(){const _0x151062=_0x2863f9;if(this[_0x151062(0x143)]!==Sprite_Actor)return;if(!this[_0x151062(0xd1)]())return;if(!SceneManager[_0x151062(0x13f)]())return;const _0x47ae69=VisuMZ[_0x151062(0x89)][_0x151062(0x1aa)][_0x151062(0x1c6)],_0x51c997=new Sprite_Gauge();_0x51c997[_0x151062(0xa8)]['x']=_0x47ae69[_0x151062(0x154)],_0x51c997[_0x151062(0xa8)]['y']=_0x47ae69[_0x151062(0xa7)];const _0x4fb11f=Sprite_Gauge['prototype']['bitmapWidth']();_0x51c997[_0x151062(0x92)]['x']=_0x51c997['scale']['y']=_0x47ae69['Scale'],this[_0x151062(0xdb)]=_0x51c997,this[_0x151062(0x1b9)](_0x51c997);},Sprite_Actor['prototype'][_0x2863f9(0xd1)]=function(){const _0x1e8904=_0x2863f9;if(Imported[_0x1e8904(0xf0)]&&this['constructor']===Sprite_SvEnemy)return![];return ConfigManager['aggroGauge']&&VisuMZ['AggroControlSystem'][_0x1e8904(0x1aa)][_0x1e8904(0x1c6)][_0x1e8904(0x14e)];},VisuMZ['AggroControlSystem'][_0x2863f9(0x142)]=Sprite_Actor[_0x2863f9(0xe8)]['update'],Sprite_Actor['prototype'][_0x2863f9(0x1ad)]=function(){const _0x38cfc1=_0x2863f9;VisuMZ[_0x38cfc1(0x89)][_0x38cfc1(0x142)][_0x38cfc1(0x80)](this),this[_0x38cfc1(0x1a0)]();},Sprite_Actor[_0x2863f9(0xe8)][_0x2863f9(0x1a0)]=function(){const _0x4e8434=_0x2863f9;if(!this['_battler'])return;if(!this[_0x4e8434(0xdb)])return;const _0x5dfacc=VisuMZ['AggroControlSystem']['Settings'][_0x4e8434(0x1c6)],_0x275b7a=this[_0x4e8434(0xdb)];let _0x29edd4=_0x5dfacc['OffsetX'];this[_0x4e8434(0x15e)][_0x4e8434(0x191)]&&(_0x29edd4+=this[_0x4e8434(0x15e)][_0x4e8434(0x191)]());let _0x58e17c=_0x5dfacc['OffsetY'];this[_0x4e8434(0x15e)][_0x4e8434(0x1c0)]&&(_0x58e17c+=this['_battler'][_0x4e8434(0x1c0)]()),_0x275b7a['x']=_0x29edd4,_0x275b7a['y']=-this[_0x4e8434(0x1ca)]+_0x58e17c,this[_0x4e8434(0x15e)]&&_0x275b7a[_0x4e8434(0x124)]!=='aggro'&&(_0x275b7a[_0x4e8434(0xbe)]=!![],_0x275b7a['setup'](this['_battler'],_0x4e8434(0xc3))),this[_0x4e8434(0x92)]['x']<0x0&&(_0x275b7a[_0x4e8434(0x92)]['x']=-Math['abs'](_0x275b7a['scale']['x']));},Sprite_Gauge[_0x2863f9(0xe8)][_0x2863f9(0x1a9)]=function(){const _0x403a11=_0x2863f9;return this[_0x403a11(0x15e)]&&this[_0x403a11(0x124)]===_0x403a11(0xc3);},VisuMZ['AggroControlSystem'][_0x2863f9(0xfd)]=Sprite_Gauge[_0x2863f9(0xe8)]['gaugeX'],Sprite_Gauge['prototype']['gaugeX']=function(){const _0x99620b=_0x2863f9;return this[_0x99620b(0x1a9)]()?0x0:VisuMZ[_0x99620b(0x89)]['Sprite_Gauge_gaugeX'][_0x99620b(0x80)](this);},VisuMZ[_0x2863f9(0x89)][_0x2863f9(0x150)]=Sprite_Gauge[_0x2863f9(0xe8)][_0x2863f9(0x1c2)],Sprite_Gauge[_0x2863f9(0xe8)][_0x2863f9(0x1c2)]=function(){const _0x554aca=_0x2863f9;let _0x260017=VisuMZ[_0x554aca(0x89)][_0x554aca(0x150)]['call'](this);if(this['isAggroType']()&&this[_0x554aca(0x15e)]){if(this['_battler'][_0x554aca(0x15f)]())return 0x0;if(this[_0x554aca(0x15e)][_0x554aca(0x13c)]()&&this[_0x554aca(0x15e)][_0x554aca(0x11a)]()[_0x554aca(0x98)]()['length']===0x1)return 0x1;}return _0x260017[_0x554aca(0x105)](0x0,0x1);},VisuMZ[_0x2863f9(0x89)][_0x2863f9(0xd0)]=Sprite_Gauge[_0x2863f9(0xe8)]['currentValue'],Sprite_Gauge['prototype'][_0x2863f9(0xb0)]=function(){const _0x59c054=_0x2863f9;return this[_0x59c054(0x1a9)]()?this[_0x59c054(0x161)]():VisuMZ[_0x59c054(0x89)][_0x59c054(0xd0)]['call'](this);},Sprite_Gauge[_0x2863f9(0xe8)][_0x2863f9(0x161)]=function(){const _0x28e1ba=_0x2863f9,_0x4cfeea=this[_0x28e1ba(0x15e)][_0x28e1ba(0x11a)](),_0x49c696=this['_battler'][_0x28e1ba(0xb5)]-_0x4cfeea['tgrMin'](),_0x26d66f=_0x4cfeea[_0x28e1ba(0x8b)]()-_0x4cfeea[_0x28e1ba(0x103)]();if(_0x49c696>=_0x26d66f)return 0x64;return _0x49c696/Math['max'](_0x26d66f,0x1)*0x64;},VisuMZ['AggroControlSystem'][_0x2863f9(0xd2)]=Sprite_Gauge['prototype']['currentMaxValue'],Sprite_Gauge['prototype'][_0x2863f9(0x1af)]=function(){const _0x27e17b=_0x2863f9;return this['isAggroType']()?this[_0x27e17b(0x131)]():VisuMZ[_0x27e17b(0x89)][_0x27e17b(0xd2)][_0x27e17b(0x80)](this);},Sprite_Gauge[_0x2863f9(0xe8)][_0x2863f9(0x131)]=function(){return 0x64;},VisuMZ[_0x2863f9(0x89)]['Sprite_Gauge_gaugeColor1']=Sprite_Gauge[_0x2863f9(0xe8)][_0x2863f9(0xf3)],Sprite_Gauge[_0x2863f9(0xe8)][_0x2863f9(0xf3)]=function(){const _0x231926=_0x2863f9;return this[_0x231926(0x1a9)]()?ColorManager[_0x231926(0xd6)]():VisuMZ[_0x231926(0x89)]['Sprite_Gauge_gaugeColor1']['call'](this);},VisuMZ[_0x2863f9(0x89)]['Sprite_Gauge_gaugeColor2']=Sprite_Gauge['prototype'][_0x2863f9(0xe5)],Sprite_Gauge[_0x2863f9(0xe8)]['gaugeColor2']=function(){const _0x55e6bf=_0x2863f9;return this[_0x55e6bf(0x1a9)]()?ColorManager[_0x55e6bf(0x10b)]():VisuMZ['AggroControlSystem']['Sprite_Gauge_gaugeColor2'][_0x55e6bf(0x80)](this);},VisuMZ[_0x2863f9(0x89)]['Sprite_Gauge_update']=Sprite_Gauge[_0x2863f9(0xe8)][_0x2863f9(0x1ad)],Sprite_Gauge[_0x2863f9(0xe8)]['update']=function(){const _0x213ebb=_0x2863f9;VisuMZ['AggroControlSystem'][_0x213ebb(0x12e)][_0x213ebb(0x80)](this),this[_0x213ebb(0x17b)]();},Sprite_Gauge['prototype'][_0x2863f9(0x17b)]=function(){const _0x3c91a8=_0x2863f9;if(!this['isAggroType']())return;if(!Imported[_0x3c91a8(0xf0)])return;const _0x53bc10=this[_0x3c91a8(0x15e)][_0x3c91a8(0x1ab)]();if(this[_0x3c91a8(0x94)])this[_0x3c91a8(0x139)]=0xff;else _0x53bc10&&_0x53bc10[_0x3c91a8(0x139)]>0x0?this[_0x3c91a8(0x139)]=0xff:this[_0x3c91a8(0x139)]=0x0;},VisuMZ[_0x2863f9(0x89)][_0x2863f9(0xa1)]=Sprite_Gauge[_0x2863f9(0xe8)][_0x2863f9(0x186)],Sprite_Gauge[_0x2863f9(0xe8)]['drawValue']=function(){const _0x4cbb20=_0x2863f9;if(this[_0x4cbb20(0x1a9)]())return;VisuMZ[_0x4cbb20(0x89)]['Sprite_Gauge_drawValue'][_0x4cbb20(0x80)](this);};function Sprite_ProvokeTrail(){this['initialize'](...arguments);}Sprite_ProvokeTrail['prototype']=Object[_0x2863f9(0x199)](Sprite['prototype']),Sprite_ProvokeTrail[_0x2863f9(0xe8)][_0x2863f9(0x143)]=Sprite_ProvokeTrail,Sprite_ProvokeTrail[_0x2863f9(0xe8)][_0x2863f9(0x136)]=function(_0x33f174){const _0x19e95f=_0x2863f9;this['_mainSprite']=_0x33f174,Sprite['prototype'][_0x19e95f(0x136)][_0x19e95f(0x80)](this),this['initMembers'](),this[_0x19e95f(0x14f)]();},Sprite_ProvokeTrail['prototype'][_0x2863f9(0x175)]=function(){const _0x51cdc0=_0x2863f9,_0x28c3f7=VisuMZ['AggroControlSystem'][_0x51cdc0(0x1aa)]['Provoke'];this[_0x51cdc0(0xa8)]['x']=0.5,this[_0x51cdc0(0xa8)]['y']=0.5,this[_0x51cdc0(0x194)]=0x0,this[_0x51cdc0(0x1b2)]=0x0,this[_0x51cdc0(0x7e)]=0x0,this['_targetY']=0x0,this[_0x51cdc0(0x139)]=0x0,this[_0x51cdc0(0x190)]=_0x28c3f7['OpacitySpeed'],this[_0x51cdc0(0x176)]=_0x28c3f7[_0x51cdc0(0x196)];},Sprite_ProvokeTrail[_0x2863f9(0xe8)]['maxSprites']=function(){const _0x4d3fdf=_0x2863f9;return VisuMZ['AggroControlSystem']['Settings'][_0x4d3fdf(0xba)]['Parts'];},Sprite_ProvokeTrail[_0x2863f9(0xe8)][_0x2863f9(0x9d)]=function(){const _0x4ec3d6=_0x2863f9;return VisuMZ[_0x4ec3d6(0x89)][_0x4ec3d6(0x1aa)]['Provoke'][_0x4ec3d6(0xa3)]/0x64;},Sprite_ProvokeTrail['prototype'][_0x2863f9(0x14f)]=function(){const _0xfee574=_0x2863f9;this[_0xfee574(0x99)]=[];let _0x44e25f=0x0;for(let _0x18666d=0x0;_0x18666d<=this[_0xfee574(0xa6)]();_0x18666d++){const _0x1146ad=new Sprite();_0x1146ad[_0xfee574(0x9b)]=ImageManager[_0xfee574(0x100)](),_0x1146ad[_0xfee574(0xa8)]['x']=0.5,_0x1146ad[_0xfee574(0xa8)]['y']=0.5,_0x1146ad['scale']['x']=_0x1146ad['scale']['y']=this['partsSize'](),_0x1146ad['opacity']=_0x44e25f,_0x1146ad[_0xfee574(0x176)]=this[_0xfee574(0x176)],this[_0xfee574(0x1b9)](_0x1146ad),this[_0xfee574(0x99)][_0xfee574(0x8e)](_0x1146ad),_0x44e25f+=this[_0xfee574(0x190)];if(_0x44e25f>=0xff)_0x44e25f=0x0;}},Sprite_ProvokeTrail[_0x2863f9(0xe8)][_0x2863f9(0x106)]=function(){const _0x3c7a02=_0x2863f9;return this[_0x3c7a02(0x110)][_0x3c7a02(0x143)]===Sprite_Actor;},Sprite_ProvokeTrail['prototype'][_0x2863f9(0x19d)]=function(){const _0x5db598=_0x2863f9;return SceneManager[_0x5db598(0x14b)][_0x5db598(0x168)]['_provokeContainer'];},Sprite_ProvokeTrail['prototype'][_0x2863f9(0x1ad)]=function(){const _0x3f85a8=_0x2863f9;Sprite['prototype'][_0x3f85a8(0x1ad)]['call'](this),this['updateBattlerPositions'](),this[_0x3f85a8(0x11d)](),this[_0x3f85a8(0x128)](),this[_0x3f85a8(0x155)]();},Sprite_ProvokeTrail[_0x2863f9(0xe8)][_0x2863f9(0xf6)]=function(){const _0x3dd49e=_0x2863f9;return VisuMZ[_0x3dd49e(0x89)][_0x3dd49e(0x1aa)]['Provoke'][_0x3dd49e(0x93)];},Sprite_ProvokeTrail[_0x2863f9(0xe8)][_0x2863f9(0x195)]=function(){const _0x3e14c3=_0x2863f9;if(!this[_0x3e14c3(0x110)]['_battler'])return;if(!this['_mainSprite'][_0x3e14c3(0x15e)][_0x3e14c3(0xa5)]())return;const _0x53edb9=this[_0x3e14c3(0x110)][_0x3e14c3(0x15e)][_0x3e14c3(0xa5)]()[_0x3e14c3(0x1ab)]();if(!_0x53edb9)return;const _0x4cd7f9=this[_0x3e14c3(0x110)]['_battler'][_0x3e14c3(0x12b)](),_0x3fc681=this[_0x3e14c3(0x110)][_0x3e14c3(0x15e)][_0x3e14c3(0xa5)]()[_0x3e14c3(0x12b)]();this[_0x3e14c3(0x194)]=this['_mainSprite']['x'],this[_0x3e14c3(0x1b2)]=this['_mainSprite']['y']-this[_0x3e14c3(0x110)][_0x3e14c3(0x1ca)]*_0x4cd7f9,this[_0x3e14c3(0x7e)]=_0x53edb9['x'],this[_0x3e14c3(0x184)]=_0x53edb9['y']-_0x53edb9[_0x3e14c3(0x1ca)]*_0x3fc681,this['_homeX']+=Math[_0x3e14c3(0x17f)]((Graphics['width']-Graphics[_0x3e14c3(0xc1)])/0x2),this['_homeY']+=Math['round']((Graphics[_0x3e14c3(0x1ca)]-Graphics[_0x3e14c3(0xc5)])/0x2),this[_0x3e14c3(0x7e)]+=Math[_0x3e14c3(0x17f)]((Graphics[_0x3e14c3(0x1c8)]-Graphics[_0x3e14c3(0xc1)])/0x2),this[_0x3e14c3(0x184)]+=Math[_0x3e14c3(0x17f)]((Graphics[_0x3e14c3(0x1ca)]-Graphics[_0x3e14c3(0xc5)])/0x2);if(!$gameSystem['isSideView']()){if(_0x53edb9['_battler'][_0x3e14c3(0xf5)]())visible=!![],this['_targetX']+=SceneManager['_scene'][_0x3e14c3(0xaf)]['x'],this['_targetY']+=SceneManager[_0x3e14c3(0x14b)][_0x3e14c3(0xaf)]['y'];else _0x53edb9[_0x3e14c3(0x15e)][_0x3e14c3(0xf7)]()&&(visible=!![],this[_0x3e14c3(0x194)]+=SceneManager[_0x3e14c3(0x14b)][_0x3e14c3(0xaf)]['x'],this[_0x3e14c3(0x1b2)]+=SceneManager[_0x3e14c3(0x14b)][_0x3e14c3(0xaf)]['y']);}},Sprite_ProvokeTrail[_0x2863f9(0xe8)][_0x2863f9(0x1cd)]=function(){const _0x275c6f=_0x2863f9;return VisuMZ['AggroControlSystem'][_0x275c6f(0x1aa)][_0x275c6f(0xba)][_0x275c6f(0x10a)];},Sprite_ProvokeTrail[_0x2863f9(0xe8)][_0x2863f9(0x11d)]=function(){const _0x32b8e8=_0x2863f9;if(!this[_0x32b8e8(0x110)][_0x32b8e8(0x15e)])return;if(!this[_0x32b8e8(0x110)][_0x32b8e8(0x15e)][_0x32b8e8(0xa5)]())return;if(!this[_0x32b8e8(0x99)])return;if(this[_0x32b8e8(0x99)][_0x32b8e8(0xd9)]<=0x0)return;const _0x23b304=(this[_0x32b8e8(0x7e)]-this[_0x32b8e8(0x194)])/this['maxSprites'](),_0x4711e6=(this[_0x32b8e8(0x184)]-this['_homeY'])/this['maxSprites']();for(let _0x10eb45=0x0;_0x10eb45<=this[_0x32b8e8(0xa6)]();_0x10eb45++){const _0x3f45e8=this['_sprites'][_0x10eb45];if(!_0x3f45e8)continue;_0x3f45e8['x']=this['_homeX']+_0x23b304*_0x10eb45;const _0xc6e563=this[_0x32b8e8(0xa6)]()-_0x10eb45,_0x1157f4=this[_0x32b8e8(0xa6)]()/0x2,_0x526c74=this['arcHeight'](),_0x49cb1c=-_0x526c74/Math[_0x32b8e8(0x15a)](_0x1157f4,0x2),_0x30295d=_0x49cb1c*Math['pow'](_0xc6e563-_0x1157f4,0x2)+_0x526c74;_0x3f45e8['y']=this[_0x32b8e8(0x1b2)]+_0x4711e6*_0x10eb45-_0x30295d;}},Sprite_ProvokeTrail['prototype']['maxOpacity']=function(){const _0x408a90=_0x2863f9;return VisuMZ[_0x408a90(0x89)]['Settings'][_0x408a90(0xba)][_0x408a90(0x133)];},Sprite_ProvokeTrail[_0x2863f9(0xe8)]['updateOpacity']=function(){const _0x4c7e07=_0x2863f9,_0x13e690=this['_mainSprite']['_battler'];if(!_0x13e690)this[_0x4c7e07(0x139)]=0x0;else _0x13e690['isAlive']()&&_0x13e690[_0x4c7e07(0xa5)]()?this['opacity']=0xff:this[_0x4c7e07(0x139)]=0x0;},Sprite_ProvokeTrail['prototype']['updateChildrenOpacity']=function(){const _0x58f6b1=_0x2863f9;if(!this[_0x58f6b1(0x110)][_0x58f6b1(0x15e)])return;if(!this['_mainSprite'][_0x58f6b1(0x15e)]['provoker']())return;if(!this['_sprites'])return;if(this[_0x58f6b1(0x99)][_0x58f6b1(0xd9)]<=0x0)return;for(let _0x206474=0x0;_0x206474<=this[_0x58f6b1(0xa6)]();_0x206474++){const _0x6c2ada=this['_sprites'][this[_0x58f6b1(0x106)]()?this['maxSprites']()-_0x206474:_0x206474];if(!_0x6c2ada)continue;_0x6c2ada['opacity']-=this['_opacitySpeed'];if(_0x6c2ada['opacity']<=0x0)_0x6c2ada[_0x58f6b1(0x139)]=0xff;}},VisuMZ['AggroControlSystem'][_0x2863f9(0x19c)]=Spriteset_Battle[_0x2863f9(0xe8)][_0x2863f9(0x17c)],Spriteset_Battle[_0x2863f9(0xe8)][_0x2863f9(0x17c)]=function(){const _0x4082f6=_0x2863f9;VisuMZ['AggroControlSystem'][_0x4082f6(0x19c)][_0x4082f6(0x80)](this),this[_0x4082f6(0x1a3)]();},Spriteset_Battle['prototype']['createBattleFieldAggroControl']=function(){const _0x49754f=_0x2863f9;if(!Imported[_0x49754f(0xf0)])return;const _0x58333e=this[_0x49754f(0x17a)]['x'],_0x3ae2fe=this['_battleField']['y'],_0x5553d8=this[_0x49754f(0x17a)][_0x49754f(0x1c8)],_0x291dca=this[_0x49754f(0x17a)][_0x49754f(0x1ca)];this[_0x49754f(0x117)]=new Sprite(),this[_0x49754f(0x117)]['setFrame'](0x0,0x0,_0x5553d8,_0x291dca),this[_0x49754f(0x117)]['x']=_0x58333e,this[_0x49754f(0x117)]['y']=_0x3ae2fe;if(Imported[_0x49754f(0xf0)]){const _0x3ec5d9=this[_0x49754f(0x97)][_0x49754f(0x86)](this[_0x49754f(0xe0)]);this[_0x49754f(0x19b)](this[_0x49754f(0x117)],_0x3ec5d9);}else this[_0x49754f(0x1b9)](this[_0x49754f(0x117)]);},VisuMZ[_0x2863f9(0x89)]['Spriteset_Battle_update']=Spriteset_Battle['prototype']['update'],Spriteset_Battle['prototype'][_0x2863f9(0x1ad)]=function(){const _0x19d493=_0x2863f9;VisuMZ['AggroControlSystem']['Spriteset_Battle_update'][_0x19d493(0x80)](this),this[_0x19d493(0x179)]();},Spriteset_Battle[_0x2863f9(0xe8)][_0x2863f9(0x179)]=function(){const _0x24c046=_0x2863f9;if(!this[_0x24c046(0x117)])return;if(!this[_0x24c046(0xe0)])return;this[_0x24c046(0x117)]['x']=this[_0x24c046(0xe0)]['x'],this[_0x24c046(0x117)]['y']=this[_0x24c046(0xe0)]['y'];},VisuMZ[_0x2863f9(0x89)][_0x2863f9(0x16a)]=Window_BattleEnemy['prototype']['refresh'],Window_BattleEnemy[_0x2863f9(0xe8)][_0x2863f9(0x1c5)]=function(){const _0x442463=_0x2863f9;if(this[_0x442463(0x192)]())Imported[_0x442463(0xf0)]&&this['sortEnemies'](),Window_Selectable[_0x442463(0xe8)][_0x442463(0x1c5)][_0x442463(0x80)](this);else this['applyTauntFilters']()?(Imported[_0x442463(0xf0)]&&this['sortEnemies'](),Window_Selectable[_0x442463(0xe8)][_0x442463(0x1c5)][_0x442463(0x80)](this)):VisuMZ['AggroControlSystem']['Window_BattleEnemy_refresh'][_0x442463(0x80)](this);},Window_BattleEnemy[_0x2863f9(0xe8)][_0x2863f9(0x192)]=function(){const _0x2ca382=_0x2863f9,_0xa2e3b4=BattleManager[_0x2ca382(0x1ae)](),_0xb3833f=BattleManager[_0x2ca382(0xd3)]();if(!_0xa2e3b4)return![];if(!_0xb3833f)return![];if(DataManager[_0x2ca382(0xb3)](_0xa2e3b4[_0x2ca382(0x14c)]()))return![];if(_0xb3833f['bypassProvoke']())return![];return _0xb3833f[_0x2ca382(0x8d)]()?(this['_enemies']=[_0xb3833f['provoker']()],!![]):![];},Window_BattleEnemy[_0x2863f9(0xe8)][_0x2863f9(0x10c)]=function(){const _0x35ec69=_0x2863f9,_0x1092d5=BattleManager['inputtingAction'](),_0x2fceae=BattleManager[_0x35ec69(0xd3)](),_0x557fed=$gameTroop;if(!_0x1092d5)return![];if(!_0x2fceae)return![];if(!_0x1092d5['item']())return![];if(DataManager[_0x35ec69(0x113)](_0x1092d5['item']()))return![];if(_0x2fceae[_0x35ec69(0x7f)]())return![];if(_0x1092d5[_0x35ec69(0xe6)]()&&_0x557fed[_0x35ec69(0xca)]()[_0x35ec69(0xd9)]>0x0)this[_0x35ec69(0x18c)]=_0x557fed[_0x35ec69(0xca)]();else{if(_0x1092d5[_0x35ec69(0x1ce)]()&&_0x557fed['magicalTauntMembers']()[_0x35ec69(0xd9)]>0x0)this[_0x35ec69(0x18c)]=_0x557fed[_0x35ec69(0x1b7)]();else{if(_0x1092d5[_0x35ec69(0x153)]()&&_0x557fed['certainHitTauntMembers']()[_0x35ec69(0xd9)]>0x0)this[_0x35ec69(0x18c)]=_0x557fed[_0x35ec69(0x16f)]();else return![];}}return!![];},VisuMZ[_0x2863f9(0x89)][_0x2863f9(0x9a)]=Window_Options[_0x2863f9(0xe8)][_0x2863f9(0xc6)],Window_Options['prototype'][_0x2863f9(0xc6)]=function(){const _0x3e8320=_0x2863f9;VisuMZ['AggroControlSystem'][_0x3e8320(0x9a)][_0x3e8320(0x80)](this),this[_0x3e8320(0xbc)]();},Window_Options[_0x2863f9(0xe8)]['addAggroControlSystemCommands']=function(){const _0x56614f=_0x2863f9;VisuMZ['AggroControlSystem'][_0x56614f(0x1aa)][_0x56614f(0xba)][_0x56614f(0x83)]&&this[_0x56614f(0xab)](),VisuMZ[_0x56614f(0x89)]['Settings']['Aggro']['AddOption']&&this['addAggroControlSystemAggroCommand']();},Window_Options[_0x2863f9(0xe8)][_0x2863f9(0xab)]=function(){const _0x4b65c2=_0x2863f9,_0x1d2143=TextManager[_0x4b65c2(0x13b)],_0x305d59=_0x4b65c2(0x13b);this[_0x4b65c2(0x116)](_0x1d2143,_0x305d59);},Window_Options[_0x2863f9(0xe8)][_0x2863f9(0x171)]=function(){const _0x14a4c0=_0x2863f9,_0x11adf5=TextManager[_0x14a4c0(0x144)],_0x3e1fb6=_0x14a4c0(0x144);this['addCommand'](_0x11adf5,_0x3e1fb6);},VisuMZ[_0x2863f9(0x89)][_0x2863f9(0xfe)]=Window_StatusBase[_0x2863f9(0xe8)][_0x2863f9(0xc7)],Window_StatusBase[_0x2863f9(0xe8)]['placeActorName']=function(_0x2b889d,_0x3b5ccd,_0x55e689){const _0x132bb8=_0x2863f9;if(this[_0x132bb8(0xd5)]())this[_0x132bb8(0x172)](_0x2b889d[_0x132bb8(0x88)]());VisuMZ[_0x132bb8(0x89)]['Window_StatusBase_placeActorName'][_0x132bb8(0x80)](this,_0x2b889d,_0x3b5ccd,_0x55e689);},Window_StatusBase[_0x2863f9(0xe8)][_0x2863f9(0xd5)]=function(){const _0x22ac55=_0x2863f9;if(![Window_BattleActor,Window_BattleStatus][_0x22ac55(0x10f)](this[_0x22ac55(0x143)]))return![];if(!SceneManager['isSceneBattle']())return![];return ConfigManager[_0x22ac55(0x144)]&&VisuMZ[_0x22ac55(0x89)][_0x22ac55(0x1aa)][_0x22ac55(0x1c6)]['StatusGauge'];},Window_BattleStatus[_0x2863f9(0xe8)][_0x2863f9(0x172)]=function(_0x24d82d){const _0x51828c=_0x2863f9,_0x42f6e9=this[_0x51828c(0xd3)](_0x24d82d),_0x3b57b0=this[_0x51828c(0x1b5)](_0x24d82d),_0x2b4e8e=this[_0x51828c(0x1d1)](_0x24d82d),_0x53e7a1=_0x51828c(0x148)[_0x51828c(0x1d3)](_0x42f6e9[_0x51828c(0xee)]()),_0x576397=this[_0x51828c(0x16d)](_0x53e7a1,Sprite_Gauge),_0x4ffa12=VisuMZ[_0x51828c(0x89)][_0x51828c(0x1aa)][_0x51828c(0x1c6)];_0x576397['x']=_0x3b57b0+(_0x4ffa12[_0x51828c(0x14a)]||0x0),_0x576397['y']=_0x2b4e8e+(_0x4ffa12[_0x51828c(0x1b1)]||0x0),_0x576397[_0x51828c(0x94)]=!![],_0x576397[_0x51828c(0x82)](_0x42f6e9,_0x51828c(0xc3)),_0x576397['visible']=!![];},Window_BattleStatus[_0x2863f9(0xe8)][_0x2863f9(0x1b5)]=function(_0x4073e9){const _0x136a8b=_0x2863f9;let _0x101b27=this[_0x136a8b(0x177)](_0x4073e9),_0x17681f=this[_0x136a8b(0xea)](_0x101b27);if(Imported[_0x136a8b(0xf0)]){let _0x541e3d=this[_0x136a8b(0xdd)](_0x4073e9);if(this[_0x136a8b(0x109)]()==='list'){const _0x394c50=$dataSystem[_0x136a8b(0x111)]?0x4:0x3,_0x1431e0=_0x394c50*0x80+(_0x394c50-0x1)*0x8+0x4,_0x3fe531=this[_0x136a8b(0xd3)](_0x4073e9);let _0x271549=_0x541e3d['x']+this[_0x136a8b(0x112)];VisuMZ[_0x136a8b(0xd7)][_0x136a8b(0x1aa)][_0x136a8b(0x17e)][_0x136a8b(0x8c)]?_0x271549=_0x541e3d['x']+ImageManager[_0x136a8b(0x159)]+0x8:_0x271549+=ImageManager[_0x136a8b(0x7b)],_0x17681f=Math['round'](Math[_0x136a8b(0x1cc)](_0x541e3d['x']+_0x541e3d[_0x136a8b(0x1c8)]-_0x1431e0,_0x271549)),_0x17681f-=0x4;}else _0x17681f=Math['round'](_0x541e3d['x']+(_0x541e3d[_0x136a8b(0x1c8)]-0x80)/0x2);}return _0x17681f;},Window_BattleStatus[_0x2863f9(0xe8)][_0x2863f9(0x1d1)]=function(_0x5cadc5){const _0x4fd889=_0x2863f9,_0x550b86=this['itemRect'](_0x5cadc5);let _0x3bbb87=this[_0x4fd889(0x135)](_0x550b86);if(Imported['VisuMZ_1_BattleCore']){if(this['battleLayoutStyle']()===_0x4fd889(0x107)){let _0x136902=this[_0x4fd889(0xdd)](_0x5cadc5);_0x3bbb87=Math['round'](_0x136902['y']+(_0x136902[_0x4fd889(0x1ca)]-Sprite_Name[_0x4fd889(0xe8)][_0x4fd889(0xbf)]())/0x2);}}if(this[_0x4fd889(0xaa)]())_0x3bbb87-=Sprite_Gauge[_0x4fd889(0xe8)][_0x4fd889(0xe1)]()-0x1;return _0x3bbb87;},Window_BattleStatus[_0x2863f9(0xe8)]['isAtbGaugeVisible']=function(){const _0x211b17=_0x2863f9;if(!BattleManager['isTpb']())return![];if(Imported[_0x211b17(0x95)])return this[_0x211b17(0x81)](_0x211b17(0xcb));return!![];};