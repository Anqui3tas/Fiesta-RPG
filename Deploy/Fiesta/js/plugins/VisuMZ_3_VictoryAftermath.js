//=============================================================================
// VisuStella MZ - Victory Aftermath
// VisuMZ_3_VictoryAftermath.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_VictoryAftermath = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VictoryAftermath = VisuMZ.VictoryAftermath || {};
VisuMZ.VictoryAftermath.version = 1.22;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.22] [VictoryAftermath]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Victory_Aftermath_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Victory Aftermath plugin consolidates the rewards granted upon finishing
 * a battle successfully into one screen (or more if there are level ups).
 * This helps reduce the amount of button presses needed to display similar
 * information by default. The level up screens will also display parameter
 * changes and new skills acquired in addition to victory quotes.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Consolidates EXP, Gold, and Items acquired through battle rewards into one
 *   battle screen.
 * * EXP gauges for currently active battle party will be displayed on the same
 *   screen to indicate progress.
 * * Upon leveling up, individual screens can be shown (optionally) to display
 *   parameter changes, new skills acquired, and level up quotes.
 * * Plugin Commands can be used to clear/add new quotes at any time.
 * * Plugin Commands can be used by bypass certain parts of the Victory
 *   Aftermath segments or the entire thing completely.
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 *
 * - The EXP gauge colors will match the color settings found in the Core
 * Engine's Plugin Parameters instead of defaulting to specific colors.
 *
 * - The continue message will display any changed input keys designated by
 * the Core Engine's Plugin Parameters.
 *
 * ---
 *
 * VisuMZ_1_MainMenuCore
 *
 * - Upon leveling up, the Menu Image will show up (optional) as a bust during
 * the quote segment.
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
 * <Level Up Quotes>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 * </Level Up Quotes>
 *
 * - Used for: Actor Notetags
 * - Description
 * - Replace 'text' with the text you'd want the actor to say when leveling up.
 * - The <New Quote> tag is used between the <Level Up Quotes> notetags to
 *   separate quotes.
 * - If an actor has multiple quotes (due to the <New Quote> notetag), then a
 *   random quote will be selected upon level up.
 * - If this notetag is not found inside an actor's notebox, a random level up
 *   quote will be selected from the Plugin Parameters => Level Up => Quotes =>
 *   Level Up Quotes plugin parameter.
 *
 * ---
 *
 * <New Skill Quotes>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 * </New Skill Quotes>
 *
 * - Used for: Actor Notetags
 * - Description
 * - Replace 'text' with the text you'd want the actor to say when leveling up
 *   in addition to learning a new skill upon leveling up.
 * - The <New Quote> tag is used between the <New Skill Quotes> notetags to
 *   separate quotes.
 * - If an actor has multiple quotes (due to the <New Quote> notetag), then a
 *   random quote will be selected upon level up and learning a new skill.
 * - If this notetag is not found inside an actor's notebox, a random new skill
 *   quote will be selected from the Plugin Parameters => Level Up => Quotes =>
 *   New Skill Quotes plugin parameter.
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
 * Actor: Add Level Up Quotes
 * - Add new entries target actor's level up quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to add quotes for.
 *
 *   New Quotes:
 *   - Add new entries to actor's level up quotes.
 *   - Text codes allowed. %1 - Actor's Name
 *
 * ---
 *
 * Actor: Add New Skill Quotes
 * - Add new entries target actor's new skill quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to add quotes for.
 *
 *   New Quotes:
 *   - Add new entries to actor's new skill quotes.
 *   - Text codes allowed. %1 - Actor's Name
 *
 * ---
 *
 * Actor: Clear Level Up Quotes
 * - Clear target actor's level up quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to clear quotes for.
 *
 * ---
 *
 * Actor: Clear New Skill Quotes
 * - Clear target actor's new skill quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to clear quotes for.
 *
 * ---
 * 
 * === Post-Battle Plugin Commands ===
 * 
 * ---
 * 
 * Post-Battle: Set Post-Battle BGM
 * - This determines what BGM to play after battle.
 * - Use only in battle!
 * - For clarification, this affects the BGM that is played upon returning to
 *   the map scene.
 * 
 *   Filename:
 *   - Filename of the BGM played.
 * 
 *   Volume:
 *   - Volume of the BGM played.
 * 
 *   Pitch:
 *   - Pitch of the BGM played.
 * 
 *   Pan:
 *   - Pan of the BGM played.
 * 
 * ---
 * 
 * Post-Battle: Set Post-Battle BGS
 * - This determines what BGS to play after battle.
 * - Use only in battle!
 * - For clarification, this affects the BGS that is played upon returning to
 *   the map scene.
 * 
 *   Filename:
 *   - Filename of the BGS played.
 * 
 *   Volume:
 *   - Volume of the BGS played.
 * 
 *   Pitch:
 *   - Pitch of the BGS played.
 * 
 *   Pan:
 *   - Pan of the BGS played.
 * 
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Bypass Victory Motion
 * - Bypass actors performing their victory motion?
 *
 *   Bypass?:
 *   - Bypass actors performing their victory motion?
 *
 * ---
 *
 * System: Bypass Victory Music
 * - Bypass playing the victory music?
 *
 *   Bypass?:
 *   - Bypass playing the victory music?
 *
 * ---
 *
 * System: Bypass Victory Phase
 * - Bypass the entire victory phase and all aspects about it?
 *
 *   Bypass?:
 *   - Bypass the entire victory phase and all aspects about it?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The general settings Plugin Parameters control the overall settings found
 * within the main aspects of the Victory Aftermath sequence.
 *
 * ---
 *
 * General Settings
 * 
 *   Fade In Speed:
 *   - Fade in speed for the victory window.
 * 
 *   Hide Delay (MS):
 *   - Delay in milliseconds before hiding the UI Windows.
 * 
 *   Show Delay (MS):
 *   - Delay in milliseconds before showing the Victory Windows.
 * 
 *   Update Duration:
 *   - Duration in frames on updating actor EXP gauges.
 * 
 *   Auto Skip Auto Battle?:
 *   - Skip the Victory Aftermath sequence if the player has decided to use
 *     the party Auto Battle command?
 * 
 *   Mirror Contents?:
 *   - Mirror the positions of EXP, Gold, and Items?
 * 
 *   Show EXP Gauges?:
 *   - Show the EXP Gauges of the main party members for the first screen of
 *     the Victory Aftermath?
 *   - This is added for those with large parties and cannot fit everything
 *     into one screen for all party members and would prefer not showing any
 *     EXP Gauges at all instead.
 * 
 *   Drops Sorted By:
 *   - How are drops sorted by in the Victory Aftermath?
 *     - ID
 *     - Name
 *
 * ---
 * 
 * Color Settings
 * 
 *   Background Color 1:
 *   Background Color 2:
 *   Reward Strip 1:
 *   Reward Strip 2:
 *   Actor Strip:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 * 
 * ---
 * 
 * Collapse Effect
 * 
 *   Normal Collapse Wait?:
 *   - Wait for the normal collapse effect to finish?
 * 
 *   Boss Collapse Wait?:
 *   - Wait for the boss collapse effect to finish?
 * 
 * ---
 * 
 * Victory Music
 * 
 *   Victory BGM:
 *   - Background music to play during the victory sequence.
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
 * Plugin Parameters: Reward Strips Settings
 * ============================================================================
 *
 * Reward strip settings that appear in the first screen of the Victory
 * Aftermath. These are used to let you have control over what rewards are
 * displayed at the end of each battle and can be used to display custom data
 * from other plugins as well.
 *
 * ---
 *
 * Reward Strip
 * 
 *   Label:
 *   - This one doesn't have any use other than being a label to  quickly
 *     determine what this one is for.
 * 
 *   JS: Show:
 *   - Code used to determine if the reward strip is shown.
 * 
 *   JS: Text:
 *   - Code used to determine if the text displayed as the category.
 * 
 *   JS: Data:
 *   - Code used to determine what data should be displayed in the
 *     reward strip.
 *
 * ---
 * 
 * The default parameters for this will be updated from time to time as more
 * VisuStella MZ plugins are released to add in extra displayed resources that
 * the party can gain from battle.
 *
 * ============================================================================
 * Plugin Parameters: Level Up Settings
 * ============================================================================
 *
 * When actors level up, extra screens will be displayed in the Victory
 * Aftermath sequence. Alter these settings to best fit your game.
 *
 * ---
 *
 * General
 * 
 *   Enable?:
 *   - Enable the Level Up portion of the Victory Aftermath phase?
 * 
 *   Show Face?:
 *   - Show the actor's face?
 * 
 *   Show Param Change?:
 *   - Show an extra column for parameter value differences?
 * 
 *     Hide Level?:
 *     - Hide the level change in the parameter value differences?
 * 
 *   Shown Max Skills:
 *   - The maximum amount of skills that are displayed.
 *   - This is due to limited screen space.
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
 * Quotes
 * 
 *   Level Up Quotes:
 *   - A list of generic level up quotes for those who don't have the
 *     <Level Up Quote> notetags.
 *   - %1 - Actor Name
 * 
 *   New Skill Quotes:
 *   - A list of generic level up quotes for those who don't have the
 *     <New Skill Quote> notetags.
 *   - %1 - Actor Name
 *
 * ---
 *
 * VisuMZ_1_MainMenuCore
 * - The following Plugin Parameters require VisuMZ_1_MainMenuCore.
 * 
 *   Show Bust?:
 *   - Show the actor's menu image as a bust?
 * 
 *   Bust Position X:
 *   - Positon to center the actor's menu image bust.
 *   - You may use JavaScript code.
 * 
 *   Bust Position Y:
 *   - Positon to anchor the actor's menu image bust.
 *   - You may use JavaScript code.
 * 
 *   Bust Scale:
 *   - The amount to scale the actor's menu image bust.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * There's certain diction used in the Victory Aftermath plugin that's not set
 * anywhere else in the game. Change the settings to make it fit your game.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Continue Format:
 *   - Text format for continue message.
 *   - %1 - OK key, %2 - Cancel key
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Level Format:
 *   - Text format for actor level.
 *   - %1 - Level
 * 
 *   Level Up:
 *   - Text format for reaching a level up.
 * 
 *   Sound Effect:
 *   - Sound effect played when a level up occurs.
 * 
 *     Volume:
 *     - Volume of the sound effect played.
 * 
 *     Pitch:
 *     - Pitch of the sound effect played.
 * 
 *     Pan:
 *     - Pan of the sound effect played.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors
 *     from the Window Skin.
 * 
 *   New Skill Format:
 *   - Text format describing that a new skill has been learned.
 *   - %1 - Actor Name
 * 
 *   Reward Items:
 *   - Text displayed for items rewarded.
 * 
 *   Victory Title:
 *   - Text displayed at the top of the victory screen.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.22: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Parameters > General Settings > Color Settings > Background Color 1
 * *** Parameters > General Settings > Color Settings > Background Color 2
 * *** Parameters > General Settings > Color Settings > Reward Strip 1
 * *** Parameters > General Settings > Color Settings > Reward Strip 1
 * *** Parameters > General Settings > Color Settings > Actor Strip
 * **** Colors with a bit of alpha settings.
 * 
 * Version 1.21: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Parameters > General > Drops Sorted By:
 * **** Set your drops to be sorted by ID or name.
 * 
 * Version 1.20: May 16, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia:
 * *** Post-Battle: Set Post-Battle BGM
 * *** Post-Battle: Set Post-Battle BGS
 * **** This determines what BGM/BGM to play after battle.
 * **** Use only in battle!
 * **** Used to make bgm/bgs changes seamless.
 * 
 * Version 1.19: December 14, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * ** The default Plugin Parameter for "Reward Strips" have been updated to
 *    contain compatibility for a future plugin.
 * 
 * Version 1.18: May 18, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.17: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: January 6, 2022
 * * Bug Fixes!
 * ** Fixed incorrect level change display text. Fix made by Olivia.
 * 
 * Version 1.15: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** Battle Core's post-battle common events should now load properly. This
 *     incompatibility is due to RPG Maker MZ 1.4.0's core scripts added in
 *     a common event queue clear. Update made by Olivia.
 * 
 * Version 1.14: December 9, 2021
 * * Feature Update!
 * ** Victory Aftermath gauges now automatically round to the nearest pixel
 *    rather than be on half pixels with specific resolutions. Update by Irina.
 * 
 * Version 1.13: September 23, 2021
 * * Bug Fixes!
 * ** Values for parameter differences should no longer be hidden or the same
 *    as the previous values. Fix made by Irina.
 * 
 * Version 1.12: August 27, 2021
 * * Bug Fixes!
 * ** X-Parameters and S-Parameters shown in the level up stat changes should
 *    now display the percentage signs properly. Fix made by Olivia.
 * 
 * Version 1.11: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.10: March 12, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia!
 * *** Plugin Parameters > General > Show EXP Gauges?
 * **** Show the EXP Gauges of the main party members for the first screen of
 *      the Victory Aftermath?
 * **** This is added for those with large parties and cannot fit everything
 *      into one screen for all party members and would prefer not showing any
 *      EXP Gauges at all instead.
 * 
 * Version 1.09: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > Vocab > Level Up > Volume
 * *** Plugin Parameters > Vocab > Level Up > Pitch
 * *** Plugin Parameters > Vocab > Level Up > Pan
 * **** For the people who want more control over the level up sound effect.
 * 
 * Version 1.08: December 11, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Feature Updates!
 * ** The default Plugin Parameter for "Reward Strips" have been updated to
 *    contain compatibility for a future plugin.
 * 
 * Version 1.07: December 4, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Parameter added by Olivia:
 * ** Plugin Parameters > Level Up Settings > Hide Level?
 * *** Hide the level change in the parameter value differences when comparing
 *     the stat changes from the previous level to the next.
 * 
 * Version 1.06: November 29, 2020
 * * Bug Fixed!
 * ** The default reward strips Plugin Parameters data is now updated for the
 *    SP display costs to show the Skill Points data instead of Ability Points
 *    data. Fix made by Arisu.
 * 
 * Version 1.05: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New plugin parameter added by Arisu.
 * *** Plugin Parameters > Reward Strips
 * **** Reward strip settings that appear in the first screen of the Victory
 *      Aftermath. These are used to let you have control over what rewards are
 *      displayed at the end of each battle and can be used to display custom
 *      data from other plugins as well.
 * 
 * Version 1.04: October 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New plugin parameter added by Olivia.
 * *** Plugin Parameters > General > Mirror Contents?
 * **** Mirror the positions of EXP, Gold, and Items?
 * 
 * Version 1.03: October 18, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** BGM pitch plugin parameter is now uncapped.
 * * New Features!
 * ** New plugin parameters added by Yanfly.
 * *** Plugin Parameters > General > Collapse Effect > Normal Collapse Wait?
 * *** Plugin Parameters > General > Collapse Effect > Boss Collapse Wait?
 * **** These settings enable you to decide if you want the Victory Aftermath
 *      to wait until collapse effects are finished before continuing.
 * *** Plugin Parameters > General > Music > Volume
 * *** Plugin Parameters > General > Music > Pitch
 * *** Plugin Parameters > General > Music > Pan
 * **** Adjusts the volume, pitch, and pan of the victory music.
 * 
 * Version 1.02: September 13, 2020
 * * Feature Update!
 * ** Victory Aftermath windows now wait until all boss collapse effects are
 *    done before showing. Update added by Olivia.
 * * New Features!
 * ** New Plugin Parameter under General Settings: Auto Skip Auto Battle?
 * *** Skip the Victory Aftermath sequence if the player has decided to use the
 *     party Auto Battle command?
 * *** Feature added by Olivia
 * 
 * Version 1.01: September 6, 2020
 * * New Features!
 * ** New Plugin Parameters added in Level Up Settings for disabling
 *    the back rectangles and/or changing their colors.
 *
 * Version 1.00: August 26, 2020
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
 * @command ActorQuotesLevelUpAdd
 * @text Actor: Add Level Up Quotes
 * @desc Add new entries target actor's level up quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to add quotes for.
 * @default 1
 *
 * @arg NewQuotes:arrayjson
 * @text New Quotes
 * @type note[]
 * @desc Add new entries to actor's level up quotes.
 * Text codes allowed. %1 - Actor's Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Text\\\"\""]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesNewSkillAdd
 * @text Actor: Add New Skill Quotes
 * @desc Add new entries target actor's new skill quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to add quotes for.
 * @default 1
 *
 * @arg NewQuotes:arrayjson
 * @text New Quotes
 * @type note[]
 * @desc Add new entries to actor's new skill quotes.
 * Text codes allowed. %1 - Actor's Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Text\\\"\""]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesLevelUpClear
 * @text Actor: Clear Level Up Quotes
 * @desc Clear target actor's level up quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to clear quotes for.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesNewSkillClear
 * @text Actor: Clear New Skill Quotes
 * @desc Clear target actor's new skill quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to clear quotes for.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PostBattle
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PostBattleBgm
 * @text Post-Battle: Set Post-Battle BGM
 * @desc This determines what BGM to play after battle.
 * Use only in battle! Affects map BGM, not victory BGM.
 *
 * @arg name:str
 * @text Filename
 * @type file
 * @dir audio/bgm/
 * @require 1
 * @desc Filename of the BGM played.
 * @default >>>ATTENTION<<<
 *
 * @arg volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the BGM played.
 * @default 90
 *
 * @arg pitch:num
 * @text Pitch
 * @type number
 * @desc Pitch of the BGM played.
 * @default 100
 *
 * @arg pan:num
 * @text Pan
 * @desc Pan of the BGM played.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PostBattleBgs
 * @text Post-Battle: Set Post-Battle BGS
 * @desc This determines what BGS to play after battle.
 * Use only in battle! Affects map BGS, not victory BGS.
 *
 * @arg name:str
 * @text Filename
 * @type file
 * @dir audio/bgs/
 * @require 1
 * @desc Filename of the BGS played.
 * @default >>>ATTENTION<<<
 *
 * @arg volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the BGS played.
 * @default 90
 *
 * @arg pitch:num
 * @text Pitch
 * @type number
 * @desc Pitch of the BGS played.
 * @default 100
 *
 * @arg pan:num
 * @text Pan
 * @desc Pan of the BGS played.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryMotion
 * @text System: Bypass Victory Motion
 * @desc Bypass actors performing their victory motion?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass actors performing their victory motion?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryMusic
 * @text System: Bypass Victory Music
 * @desc Bypass playing the victory music?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass playing the victory music?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryPhase
 * @text System: Bypass Victory Phase
 * @desc Bypass the entire victory phase and all aspects about it?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass the entire victory phase and all aspects about it?
 * @default true
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
 * @param VictoryAftermath
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
 * @desc General settings pertaining to the Victory Aftermath phase.
 * @default {"General":"","FadeInSpeed:num":"8","HideDelayMS:num":"1500","ShowDelayMS:num":"2000","UpdateDuration:num":"180","AutoBattleAutoSkip:eval":"true","MirrorContents:eval":"false","Collapse":"","WaitRegularCollapse:eval":"true","WaitBossCollapse:eval":"true","Music":"","Bgm:str":"Ship3","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param Rewards:arraystruct
 * @text Reward Strips
 * @parent General:struct
 * @type struct<Rewards>[]
 * @desc Reward strip settings that appear in the first screen of the Victory Aftermath.
 * @default ["{\"Label\":\"EXP\",\"Show:func\":\"\\\"return true;\\\"\",\"Text:func\":\"\\\"return TextManager.exp;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.exp;\\\"\"}","{\"Label\":\"Gold\",\"Show:func\":\"\\\"return true;\\\"\",\"Text:func\":\"\\\"return TextManager.currencyUnit;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.gold;\\\"\"}","{\"Label\":\"AP (Skill Learn System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_SkillLearnSystem &&\\\\n    VisuMZ.SkillLearnSystem.Settings.AbilityPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.abilityPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.abilityPoints;\\\"\"}","{\"Label\":\"CP (Class Change System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    VisuMZ.ClassChangeSystem.Settings.ClassPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.classPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.classPoints;\\\"\"}","{\"Label\":\"JP (Class Change System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    VisuMZ.ClassChangeSystem.Settings.JobPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.jobPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.jobPoints;\\\"\"}","{\"Label\":\"SP (Skill Learn System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_SkillLearnSystem &&\\\\n    VisuMZ.SkillLearnSystem.Settings.SkillPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.skillPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.skillPoints;\\\"\"}","{\"Label\":\"Medal EXP (Equip Medal System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_EquipMedalSys &&\\\\n    VisuMZ.EquipMedalSys.Settings.General.ShowVictory &&\\\\n    BattleManager._rewards.equipMedalExp > 0;\\\"\",\"Text:func\":\"\\\"return TextManager.equipMedalExp;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.equipMedalExp;\\\"\"}"]
 *
 * @param LevelUp:struct
 * @text Level Up Settings
 * @type struct<LevelUp>
 * @desc Settings pertaining to the Level Up portion of the Victory Aftermath phase.
 * @default {"General":"","Enable:eval":"true","ShowFace:eval":"false","ShowParamDiff:eval":"true","HideLevelDiff:eval":"false","MaxSkills:num":"8","DelayBuffer:num":"200","DrawBackRect:eval":"true","BackRectColor:str":"19","Quotes":"","LevelUpQuotes:arrayjson":"[\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Alright! A level up!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Yes! I've leveled up!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Oh? I've leveled up!?\\\\n This is awesome!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Looks like I've become stronger!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I feel like I'm getting used to battle.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"The power! I can feel it!\\\\\\\"\\\"\"]","NewSkillQuotes:arrayjson":"[\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Looks like I've acquired a new skill!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"This new skill should come in handy.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"It seems I've learned something new!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I've acquired a new power!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"This should be useful for future battles.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I wonder what this new skill is like?\\\\\\\"\\\"\"]","MainMenuCore":"","ShowBust:eval":"true","BustPosX:str":"Graphics.width * 0.25","BustPosY:str":"Graphics.height","BustScale:num":"1.20"}
 *
 * @param Vocab:struct
 * @text Vocabulary
 * @type struct<Vocab>
 * @desc The vocabulary used for this plugin and related settings.
 * @default {"ContinueFmt:str":"Press %1 or %2 to continue","KeyOK:str":"OK","KeyCancel:str":"Cancel","LvFmt:str":"LV %1","LvUp:str":"LEVEL UP!","LvUpSfx:str":"Up4","LvUpVolume:num":"90","LvUpPitch:num":"100","LvUpPan:num":"0","LvUpColor:str":"17","NewSkill:str":"%1 has learned:","RewardItems:str":"Items Obtained","Victory:str":"Victory!"}
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
 * @param General
 * 
 * @param FadeInSpeed:num
 * @text Fade In Speed
 * @parent General
 * @desc Fade in speed for the victory window.
 * @default 8
 *
 * @param HideDelayMS:num
 * @text Hide Delay (MS)
 * @parent General
 * @desc Delay in milliseconds before hiding the UI Windows.
 * @default 1500
 *
 * @param ShowDelayMS:num
 * @text Show Delay (MS)
 * @parent General
 * @desc Delay in milliseconds before showing the Victory Windows.
 * @default 2000
 *
 * @param UpdateDuration:num
 * @text Update Duration
 * @parent General
 * @desc Duration in frames on updating actor EXP gauges.
 * @default 180
 *
 * @param AutoBattleAutoSkip:eval
 * @text Skip Auto Battle?
 * @parent General
 * @type boolean
 * @on Skip
 * @off Don't Skip
 * @desc Skip the Victory Aftermath sequence if the player has
 * decided to use the party Auto Battle command?
 * @default true
 *
 * @param MirrorContents:eval
 * @text Mirror Contents?
 * @parent General
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the positions of EXP, Gold, and Items?
 * @default false
 *
 * @param ShowExpGauges:eval
 * @text Show EXP Gauges?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the EXP Gauges of the main party members
 * for the first screen of the Victory Aftermath?
 * @default true
 *
 * @param DropsSortBy:str
 * @text Drops Sorted By
 * @parent General
 * @type select
 * @option ID
 * @option Name
 * @desc How are drops sorted by in the Victory Aftermath?
 * @default ID
 *
 * @param Colors
 * @text Color Settings
 *
 * @param bgColor1:str
 * @text Background Color 1
 * @parent Colors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.8)
 *
 * @param bgColor2:str
 * @text Background Color 2
 * @parent Colors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.4)
 *
 * @param rewardStrip1:str
 * @text Reward Strip 1
 * @parent Colors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param rewardStrip2:str
 * @text Reward Strip 2
 * @parent Colors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.0)
 *
 * @param actorStrip1:str
 * @text Actor Strip
 * @parent Colors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 * 
 * @param Collapse
 * @text Collapse Effect
 *
 * @param WaitRegularCollapse:eval
 * @text Normal Collapse Wait?
 * @parent Collapse
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait for the normal collapse effect to finish?
 * @default true
 *
 * @param WaitBossCollapse:eval
 * @text Boss Collapse Wait?
 * @parent Collapse
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait for the boss collapse effect to finish?
 * @default true
 * 
 * @param Music
 * @text Victory Music
 *
 * @param Bgm:str
 * @text Victory BGM
 * @parent Music
 * @type file
 * @dir audio/bgm/
 * @desc Background music to play during the victory sequence.
 * @default Ship3
 *
 * @param volume:num
 * @text Volume
 * @parent Music
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @parent Music
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @parent Music
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Rewards Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Rewards:
 *
 * @param Label
 * @desc This one doesn't have any use other than being a label to 
 * quickly determine what this one is for.
 * @default Untitled
 *
 * @param Show:func
 * @text JS: Show
 * @type note
 * @desc Code used to determine if the reward strip is shown.
 * @default "return true;"
 *
 * @param Text:func
 * @text JS: Text
 * @type note
 * @desc Code used to determine if the text displayed as the category.
 * @default "return 'Untitled';"
 *
 * @param Data:func
 * @text JS: Data
 * @type note
 * @desc Code used to determine what data should be displayed in the reward strip.
 * @default "return 0;"
 *
 */
/* ----------------------------------------------------------------------------
 * Level Up Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LevelUp:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the Level Up portion of the Victory Aftermath phase?
 * @default true
 *
 * @param ShowFace:eval
 * @text Show Face?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the actor's face?
 * @default false
 *
 * @param ShowParamDiff:eval
 * @text Show Param Change?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show an extra column for parameter value differences?
 * @default true
 *
 * @param HideLevelDiff:eval
 * @text Hide Level?
 * @parent ShowParamDiff:eval
 * @type boolean
 * @on Hide
 * @off Normal
 * @desc Hide the level change in the parameter value differences?
 * @default false
 *
 * @param MaxSkills:num
 * @text Shown Max Skills
 * @parent General
 * @desc The maximum amount of skills that are displayed.
 * This is due to limited screen space.
 * @default 8
 *
 * @param DelayBuffer:num
 * @text Delay Buffer
 * @parent General
 * @type number
 * @desc How many milliseconds to wait in between playing
 * each level up sound effect?
 * @default 200
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
 * @param Quotes
 *
 * @param LevelUpQuotes:arrayjson
 * @text Level Up Quotes
 * @parent Quotes
 * @type note[]
 * @desc A list of generic level up quotes for those who don't
 * have the <Level Up Quote> notetags. %1 - Actor Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Alright! A level up!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Yes! I've leveled up!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Oh? I've leveled up!?\\n This is awesome!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Looks like I've become stronger!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I feel like I'm getting used to battle.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"The power! I can feel it!\\\"\""]
 *
 * @param NewSkillQuotes:arrayjson
 * @text New Skill Quotes
 * @parent Quotes
 * @type note[]
 * @desc A list of generic level up quotes for those who don't
 * have the <New Skill Quote> notetags. %1 - Actor Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Looks like I've acquired a new skill!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"This new skill should come in handy.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"It seems I've learned something new!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I've acquired a new power!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"This should be useful for future battles.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I wonder what this new skill is like?\\\"\""]
 *
 * @param MainMenuCore
 * @text VisuMZ_1_MainMenuCore
 *
 * @param ShowBust:eval
 * @text Show Bust?
 * @parent MainMenuCore
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the actor's menu image as a bust?
 * @default true
 *
 * @param BustPosX:str
 * @text Bust Position X
 * @parent MainMenuCore
 * @desc Positon to center the actor's menu image bust.
 * You may use JavaScript code.
 * @default Graphics.width * 0.25
 *
 * @param BustPosY:str
 * @text Bust Position Y
 * @parent MainMenuCore
 * @desc Positon to anchor the actor's menu image bust.
 * You may use JavaScript code.
 * @default Graphics.height
 *
 * @param BustScale:num
 * @text Bust Scale
 * @parent MainMenuCore
 * @desc The amount to scale the actor's menu image bust.
 * @default 1.20
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param ContinueFmt:str
 * @text Continue Format
 * @desc Text format for continue message.
 * %1 - OK key, %2 - Cancel key
 * @default Press %1 or %2 to continue
 *
 * @param KeyOK:str
 * @text OK Button
 * @parent ContinueFmt:str
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param KeyCancel:str
 * @text Cancel Button
 * @parent ContinueFmt:str
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param LvFmt:str
 * @text Level Format
 * @desc Text format for actor level.
 * %1 - Level
 * @default LV %1
 *
 * @param LvUp:str
 * @text Level Up
 * @desc Text format for reaching a level up.
 * @default LEVEL UP!
 *
 * @param LvUpSfx:str
 * @text Sound Effect
 * @parent LvUp:str
 * @type file
 * @dir audio/se/
 * @desc Sound effect played when a level up occurs.
 * @default Up4
 *
 * @param LvUpVolume:num
 * @text Volume
 * @parent LvUpSfx:str
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param LvUpPitch:num
 * @text Pitch
 * @parent LvUpSfx:str
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param LvUpPan:num
 * @text Pan
 * @parent LvUpSfx:str
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @param LvUpColor:str
 * @text Text Color
 * @parent LvUp:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param NewSkill:str
 * @text New Skill Format
 * @desc Text format describing that a new skill has been learned.
 * %1 - Actor Name
 * @default %1 has learned:
 *
 * @param RewardItems:str
 * @text Reward Items
 * @desc Text displayed for items rewarded.
 * @default Items Obtained
 *
 * @param Victory:str
 * @text Victory Title
 * @desc Text displayed at the top of the victory screen.
 * @default Victory!
 *
 */
//=============================================================================

const _0x3001bb=_0x2985;(function(_0x309a00,_0xcb4781){const _0x2d787f=_0x2985,_0x2f86d4=_0x309a00();while(!![]){try{const _0x2e2bf9=parseInt(_0x2d787f(0x209))/0x1*(parseInt(_0x2d787f(0x281))/0x2)+parseInt(_0x2d787f(0x12d))/0x3+parseInt(_0x2d787f(0x151))/0x4*(parseInt(_0x2d787f(0x10e))/0x5)+parseInt(_0x2d787f(0x180))/0x6+-parseInt(_0x2d787f(0xc9))/0x7*(-parseInt(_0x2d787f(0x171))/0x8)+-parseInt(_0x2d787f(0x1b8))/0x9+-parseInt(_0x2d787f(0x220))/0xa;if(_0x2e2bf9===_0xcb4781)break;else _0x2f86d4['push'](_0x2f86d4['shift']());}catch(_0x13a817){_0x2f86d4['push'](_0x2f86d4['shift']());}}}(_0x1394,0x6ffe4));var label=_0x3001bb(0x124),tier=tier||0x0,dependencies=[_0x3001bb(0x187)],pluginData=$plugins[_0x3001bb(0x1ec)](function(_0x231be3){const _0x2a3340=_0x3001bb;return _0x231be3[_0x2a3340(0x204)]&&_0x231be3[_0x2a3340(0x288)][_0x2a3340(0x100)]('['+label+']');})[0x0];function _0x2985(_0x433e16,_0x29f6ac){const _0x139408=_0x1394();return _0x2985=function(_0x2985e1,_0x32becd){_0x2985e1=_0x2985e1-0xc9;let _0xf4cd4f=_0x139408[_0x2985e1];return _0xf4cd4f;},_0x2985(_0x433e16,_0x29f6ac);}VisuMZ[label]['Settings']=VisuMZ[label][_0x3001bb(0xf4)]||{},VisuMZ['ConvertParams']=function(_0x416d2e,_0x149340){const _0x391a39=_0x3001bb;for(const _0xc40e86 in _0x149340){if(_0xc40e86[_0x391a39(0x1b5)](/(.*):(.*)/i)){const _0x3ca495=String(RegExp['$1']),_0x38cdee=String(RegExp['$2'])[_0x391a39(0x147)]()[_0x391a39(0x1a7)]();let _0x3223aa,_0x1427d5,_0xd87f8d;switch(_0x38cdee){case _0x391a39(0x221):_0x3223aa=_0x149340[_0xc40e86]!==''?Number(_0x149340[_0xc40e86]):0x0;break;case _0x391a39(0x200):_0x1427d5=_0x149340[_0xc40e86]!==''?JSON[_0x391a39(0x15c)](_0x149340[_0xc40e86]):[],_0x3223aa=_0x1427d5[_0x391a39(0x174)](_0x2aa5e7=>Number(_0x2aa5e7));break;case _0x391a39(0x179):_0x3223aa=_0x149340[_0xc40e86]!==''?eval(_0x149340[_0xc40e86]):null;break;case'ARRAYEVAL':_0x1427d5=_0x149340[_0xc40e86]!==''?JSON[_0x391a39(0x15c)](_0x149340[_0xc40e86]):[],_0x3223aa=_0x1427d5[_0x391a39(0x174)](_0x473df4=>eval(_0x473df4));break;case _0x391a39(0x105):_0x3223aa=_0x149340[_0xc40e86]!==''?JSON[_0x391a39(0x15c)](_0x149340[_0xc40e86]):'';break;case _0x391a39(0x1f2):_0x1427d5=_0x149340[_0xc40e86]!==''?JSON[_0x391a39(0x15c)](_0x149340[_0xc40e86]):[],_0x3223aa=_0x1427d5[_0x391a39(0x174)](_0x411e8b=>JSON[_0x391a39(0x15c)](_0x411e8b));break;case _0x391a39(0x1d2):_0x3223aa=_0x149340[_0xc40e86]!==''?new Function(JSON[_0x391a39(0x15c)](_0x149340[_0xc40e86])):new Function('return\x200');break;case _0x391a39(0x12e):_0x1427d5=_0x149340[_0xc40e86]!==''?JSON[_0x391a39(0x15c)](_0x149340[_0xc40e86]):[],_0x3223aa=_0x1427d5[_0x391a39(0x174)](_0x2290c2=>new Function(JSON[_0x391a39(0x15c)](_0x2290c2)));break;case'STR':_0x3223aa=_0x149340[_0xc40e86]!==''?String(_0x149340[_0xc40e86]):'';break;case _0x391a39(0x259):_0x1427d5=_0x149340[_0xc40e86]!==''?JSON[_0x391a39(0x15c)](_0x149340[_0xc40e86]):[],_0x3223aa=_0x1427d5['map'](_0xe6b008=>String(_0xe6b008));break;case _0x391a39(0x1d7):_0xd87f8d=_0x149340[_0xc40e86]!==''?JSON[_0x391a39(0x15c)](_0x149340[_0xc40e86]):{},_0x3223aa=VisuMZ[_0x391a39(0x1ff)]({},_0xd87f8d);break;case _0x391a39(0x158):_0x1427d5=_0x149340[_0xc40e86]!==''?JSON[_0x391a39(0x15c)](_0x149340[_0xc40e86]):[],_0x3223aa=_0x1427d5[_0x391a39(0x174)](_0x35cb76=>VisuMZ[_0x391a39(0x1ff)]({},JSON['parse'](_0x35cb76)));break;default:continue;}_0x416d2e[_0x3ca495]=_0x3223aa;}}return _0x416d2e;},(_0x45bade=>{const _0x131487=_0x3001bb,_0x42ea6f=_0x45bade[_0x131487(0x230)];for(const _0xb14dc7 of dependencies){if(!Imported[_0xb14dc7]){alert(_0x131487(0x1a6)['format'](_0x42ea6f,_0xb14dc7)),SceneManager['exit']();break;}}const _0x2d9c42=_0x45bade['description'];if(_0x2d9c42[_0x131487(0x1b5)](/\[Version[ ](.*?)\]/i)){const _0x3e750d=Number(RegExp['$1']);_0x3e750d!==VisuMZ[label]['version']&&(alert(_0x131487(0x17c)['format'](_0x42ea6f,_0x3e750d)),SceneManager[_0x131487(0x195)]());}if(_0x2d9c42[_0x131487(0x1b5)](/\[Tier[ ](\d+)\]/i)){const _0x28080b=Number(RegExp['$1']);_0x28080b<tier?(alert(_0x131487(0x26d)[_0x131487(0x117)](_0x42ea6f,_0x28080b,tier)),SceneManager[_0x131487(0x195)]()):tier=Math['max'](_0x28080b,tier);}VisuMZ[_0x131487(0x1ff)](VisuMZ[label][_0x131487(0xf4)],_0x45bade[_0x131487(0x118)]);})(pluginData),PluginManager[_0x3001bb(0x242)](pluginData[_0x3001bb(0x230)],'ActorQuotesLevelUpAdd',_0x35a947=>{const _0x52d178=_0x3001bb;VisuMZ[_0x52d178(0x1ff)](_0x35a947,_0x35a947);const _0x234b09=$gameActors[_0x52d178(0x1af)](_0x35a947[_0x52d178(0x1c4)]),_0x5a05b5=_0x35a947[_0x52d178(0x15d)];if(_0x234b09)while(_0x5a05b5[_0x52d178(0x106)]>0x0){_0x234b09[_0x52d178(0x156)]()['push'](_0x5a05b5['shift']());}}),PluginManager['registerCommand'](pluginData[_0x3001bb(0x230)],_0x3001bb(0x19c),_0x5bb61c=>{const _0x26c0f1=_0x3001bb;VisuMZ[_0x26c0f1(0x1ff)](_0x5bb61c,_0x5bb61c);const _0x16963e=$gameActors['actor'](_0x5bb61c[_0x26c0f1(0x1c4)]),_0x5d517a=_0x5bb61c['NewQuotes'];if(_0x16963e)while(_0x5d517a[_0x26c0f1(0x106)]>0x0){_0x16963e[_0x26c0f1(0xf0)]()[_0x26c0f1(0x1ac)](_0x5d517a[_0x26c0f1(0x108)]());}}),PluginManager['registerCommand'](pluginData[_0x3001bb(0x230)],_0x3001bb(0x111),_0x4bdbc5=>{const _0x5da4bc=_0x3001bb;VisuMZ['ConvertParams'](_0x4bdbc5,_0x4bdbc5);const _0x2d565e=$gameActors[_0x5da4bc(0x1af)](_0x4bdbc5[_0x5da4bc(0x1c4)]);if(_0x2d565e)while(_0x2d565e['levelUpQuotes']()[_0x5da4bc(0x106)]>0x0){_0x2d565e[_0x5da4bc(0x156)]()['shift']();}}),PluginManager[_0x3001bb(0x242)](pluginData['name'],_0x3001bb(0x1b4),_0x33cfe0=>{const _0x1fdb67=_0x3001bb;VisuMZ[_0x1fdb67(0x1ff)](_0x33cfe0,_0x33cfe0);const _0x413921=$gameActors['actor'](_0x33cfe0[_0x1fdb67(0x1c4)]);if(_0x413921)while(_0x413921[_0x1fdb67(0xf0)]()[_0x1fdb67(0x106)]>0x0){_0x413921[_0x1fdb67(0xf0)]()[_0x1fdb67(0x108)]();}}),PluginManager[_0x3001bb(0x242)](pluginData[_0x3001bb(0x230)],_0x3001bb(0xec),_0x1d2dfc=>{const _0x225bca=_0x3001bb;if(!$gameParty['inBattle']())return;VisuMZ[_0x225bca(0x1ff)](_0x1d2dfc,_0x1d2dfc),BattleManager[_0x225bca(0x1ab)]={'name':String(_0x1d2dfc[_0x225bca(0x230)]||''),'volume':Number(_0x1d2dfc['volume']||0x0),'pitch':Number(_0x1d2dfc[_0x225bca(0x28a)]||0x0),'pan':Number(_0x1d2dfc[_0x225bca(0x128)]||0x0),'pos':0x0};}),PluginManager[_0x3001bb(0x242)](pluginData['name'],_0x3001bb(0x26e),_0x2c05cd=>{const _0x37ddaf=_0x3001bb;if(!$gameParty[_0x37ddaf(0x284)]())return;VisuMZ[_0x37ddaf(0x1ff)](_0x2c05cd,_0x2c05cd),BattleManager['_mapBgs']={'name':String(_0x2c05cd['name']||''),'volume':Number(_0x2c05cd[_0x37ddaf(0x152)]||0x0),'pitch':Number(_0x2c05cd[_0x37ddaf(0x28a)]||0x0),'pan':Number(_0x2c05cd[_0x37ddaf(0x128)]||0x0),'pos':0x0};}),PluginManager['registerCommand'](pluginData['name'],_0x3001bb(0xd0),_0x26f710=>{const _0x4011a6=_0x3001bb;VisuMZ[_0x4011a6(0x1ff)](_0x26f710,_0x26f710),$gameSystem['victoryAftermathSettings']()[_0x4011a6(0x20d)]=_0x26f710['Bypass'];}),PluginManager[_0x3001bb(0x242)](pluginData[_0x3001bb(0x230)],'SystemBypassVictoryMusic',_0x2bc2f8=>{const _0x558632=_0x3001bb;VisuMZ[_0x558632(0x1ff)](_0x2bc2f8,_0x2bc2f8),$gameSystem[_0x558632(0x22e)]()[_0x558632(0x23d)]=_0x2bc2f8['Bypass'];}),PluginManager[_0x3001bb(0x242)](pluginData['name'],_0x3001bb(0x126),_0x3cf938=>{const _0x2c37f5=_0x3001bb;VisuMZ['ConvertParams'](_0x3cf938,_0x3cf938),$gameSystem['victoryAftermathSettings']()[_0x2c37f5(0x24d)]=_0x3cf938[_0x2c37f5(0x165)];}),TextManager[_0x3001bb(0x203)]=VisuMZ['VictoryAftermath'][_0x3001bb(0xf4)][_0x3001bb(0x1aa)][_0x3001bb(0x163)],TextManager['victoryKeyOk']=VisuMZ[_0x3001bb(0x124)][_0x3001bb(0xf4)][_0x3001bb(0x1aa)][_0x3001bb(0x129)],TextManager[_0x3001bb(0x206)]=VisuMZ[_0x3001bb(0x124)][_0x3001bb(0xf4)][_0x3001bb(0x1aa)]['KeyCancel'],TextManager[_0x3001bb(0x101)]=VisuMZ[_0x3001bb(0x124)][_0x3001bb(0xf4)][_0x3001bb(0x1aa)][_0x3001bb(0x1c1)],TextManager['victoryDisplayLvUp']=VisuMZ[_0x3001bb(0x124)][_0x3001bb(0xf4)][_0x3001bb(0x1aa)][_0x3001bb(0x1b9)],TextManager['victoryDisplayItem']=VisuMZ[_0x3001bb(0x124)][_0x3001bb(0xf4)][_0x3001bb(0x1aa)][_0x3001bb(0x19d)],TextManager[_0x3001bb(0x14d)]=VisuMZ[_0x3001bb(0x124)]['Settings'][_0x3001bb(0x1aa)][_0x3001bb(0x13a)],TextManager[_0x3001bb(0x27f)]=VisuMZ['VictoryAftermath'][_0x3001bb(0xf4)][_0x3001bb(0x1aa)][_0x3001bb(0x26f)],TextManager[_0x3001bb(0x27d)]=function(_0x409417){const _0x2b04f1=_0x3001bb,_0x264bb4=VisuMZ[_0x2b04f1(0x124)]['Settings']['LevelUp'][_0x2b04f1(0xf1)];if(!_0x409417)return _0x264bb4[Math[_0x2b04f1(0x176)](_0x264bb4[_0x2b04f1(0x106)])];if(!_0x409417[_0x2b04f1(0x26b)]())return _0x264bb4[Math[_0x2b04f1(0x176)](_0x264bb4['length'])];const _0x5f3193=_0x409417[_0x2b04f1(0x156)]();if(_0x5f3193[_0x2b04f1(0x106)]>0x0)return _0x5f3193[Math[_0x2b04f1(0x176)](_0x5f3193[_0x2b04f1(0x106)])];return _0x264bb4[Math['randomInt'](_0x264bb4[_0x2b04f1(0x106)])];},TextManager['quoteLevelSkill']=function(_0x4e182f){const _0x4c50e7=_0x3001bb,_0x2fc132=VisuMZ[_0x4c50e7(0x124)][_0x4c50e7(0xf4)][_0x4c50e7(0x1b7)][_0x4c50e7(0x20e)];if(!_0x4e182f)return _0x2fc132[Math['randomInt'](_0x2fc132[_0x4c50e7(0x106)])];if(!_0x4e182f[_0x4c50e7(0x26b)]())return _0x2fc132[Math[_0x4c50e7(0x176)](_0x2fc132[_0x4c50e7(0x106)])];const _0x29f048=_0x4e182f[_0x4c50e7(0xf0)]();if(_0x29f048[_0x4c50e7(0x106)]>0x0)return _0x29f048[Math[_0x4c50e7(0x176)](_0x29f048[_0x4c50e7(0x106)])];return _0x2fc132[Math[_0x4c50e7(0x176)](_0x2fc132[_0x4c50e7(0x106)])];},ColorManager[_0x3001bb(0x232)]=function(_0x3f3a24,_0x83bf9b){const _0x222684=_0x3001bb;return _0x83bf9b=String(_0x83bf9b),this[_0x222684(0x16c)]=this[_0x222684(0x16c)]||{},_0x83bf9b[_0x222684(0x1b5)](/#(.*)/i)?this[_0x222684(0x16c)][_0x3f3a24]=_0x222684(0x15f)[_0x222684(0x117)](String(RegExp['$1'])):this[_0x222684(0x16c)][_0x3f3a24]=this[_0x222684(0x21c)](Number(_0x83bf9b)),this[_0x222684(0x16c)][_0x3f3a24];},ColorManager[_0x3001bb(0x18b)]=function(_0x23079f){const _0x4dc0b2=_0x3001bb;return _0x23079f=String(_0x23079f),_0x23079f[_0x4dc0b2(0x1b5)](/#(.*)/i)?_0x4dc0b2(0x15f)[_0x4dc0b2(0x117)](String(RegExp['$1'])):this['textColor'](Number(_0x23079f));},ColorManager[_0x3001bb(0x25f)]=function(){const _0x92de0a=_0x3001bb,_0x2dfb2e=_0x92de0a(0xf8);this[_0x92de0a(0x16c)]=this[_0x92de0a(0x16c)]||{};if(this[_0x92de0a(0x16c)][_0x2dfb2e])return this[_0x92de0a(0x16c)][_0x2dfb2e];const _0x5e652a=VisuMZ[_0x92de0a(0x124)][_0x92de0a(0xf4)][_0x92de0a(0x1aa)][_0x92de0a(0x112)];return this[_0x92de0a(0x232)](_0x2dfb2e,_0x5e652a);},SoundManager['playVictoryLevelUpSFX']=function(){const _0x4e86c9=_0x3001bb;if(this[_0x4e86c9(0x263)])return;if(!this['_victoryLevelUpSFX']){const _0x16996c=VisuMZ[_0x4e86c9(0x124)][_0x4e86c9(0xf4)][_0x4e86c9(0x1aa)];this[_0x4e86c9(0x27e)]={'name':_0x16996c[_0x4e86c9(0x20a)]||'','volume':_0x16996c[_0x4e86c9(0x191)]??0x5a,'pitch':_0x16996c[_0x4e86c9(0xd8)]??0x64,'pan':_0x16996c[_0x4e86c9(0x1e4)]??0x0};}this[_0x4e86c9(0x27e)][_0x4e86c9(0x230)]!==''&&(AudioManager['playSe'](this['_victoryLevelUpSFX']),this[_0x4e86c9(0x263)]=!![],setTimeout(this[_0x4e86c9(0x213)][_0x4e86c9(0xce)](this),0xc8));},SoundManager[_0x3001bb(0x213)]=function(){const _0x3aa5a0=_0x3001bb;this[_0x3aa5a0(0x263)]=![];},SoundManager[_0x3001bb(0x1d1)]=function(){const _0x286acc=_0x3001bb;if(!this[_0x286acc(0x1ee)]){const _0x3fec17=VisuMZ[_0x286acc(0x124)][_0x286acc(0xf4)][_0x286acc(0x23c)];if(_0x3fec17[_0x286acc(0x152)]===undefined)_0x3fec17['volume']=0x5a;if(_0x3fec17[_0x286acc(0x28a)]===undefined)_0x3fec17[_0x286acc(0x28a)]=0x64;if(_0x3fec17['pan']===undefined)_0x3fec17[_0x286acc(0x128)]=0x0;this[_0x286acc(0x1ee)]={'name':_0x3fec17[_0x286acc(0xff)]||'','volume':_0x3fec17[_0x286acc(0x152)]||0x0,'pitch':_0x3fec17['pitch']||0x0,'pan':_0x3fec17[_0x286acc(0x128)]||0x0};}this['_victoryBgm'][_0x286acc(0x230)]!==''&&AudioManager['playBgm'](this[_0x286acc(0x1ee)]);},BattleManager['_victoryUpdateDuration']=VisuMZ[_0x3001bb(0x124)][_0x3001bb(0xf4)][_0x3001bb(0x23c)][_0x3001bb(0xd9)]||0x1,VisuMZ[_0x3001bb(0x124)][_0x3001bb(0x247)]=BattleManager[_0x3001bb(0x1e9)],BattleManager['initMembers']=function(){const _0x28e5eb=_0x3001bb;VisuMZ[_0x28e5eb(0x124)][_0x28e5eb(0x247)][_0x28e5eb(0x12a)](this),this['_victoryPhase']=![],this[_0x28e5eb(0xea)]=-0x1,this[_0x28e5eb(0x1bb)]=![];},VisuMZ[_0x3001bb(0x124)][_0x3001bb(0x121)]=BattleManager[_0x3001bb(0x286)],BattleManager[_0x3001bb(0x286)]=function(){const _0xab4cf3=_0x3001bb;return this['isVictoryPhase']()?!![]:VisuMZ[_0xab4cf3(0x124)][_0xab4cf3(0x121)][_0xab4cf3(0x12a)](this);},BattleManager[_0x3001bb(0x212)]=function(){const _0x2674b8=_0x3001bb;return this[_0x2674b8(0x16e)]==='battleEnd'&&this[_0x2674b8(0x15e)];},BattleManager[_0x3001bb(0x169)]=function(){const _0x255bd1=_0x3001bb;this[_0x255bd1(0x1fa)](_0x255bd1(0x1f0)),this[_0x255bd1(0xdd)](),Imported['VisuMZ_3_BattleVoices']&&$gameParty[_0x255bd1(0x265)]('BattleVictory');},BattleManager[_0x3001bb(0xdd)]=function(){const _0x1e0678=_0x3001bb;this[_0x1e0678(0x17d)](),this[_0x1e0678(0x15a)](),this[_0x1e0678(0x1fd)](),this['prepareVictoryAftermathTransition']();},BattleManager[_0x3001bb(0x17d)]=function(){const _0x4bc4a6=_0x3001bb;$gameParty[_0x4bc4a6(0x22c)](),$gameParty[_0x4bc4a6(0x1dd)]();},BattleManager[_0x3001bb(0x15a)]=function(){const _0x2db83a=_0x3001bb;if(this[_0x2db83a(0x251)]())return;this[_0x2db83a(0x1d0)](),SoundManager[_0x2db83a(0x1d1)]();},BattleManager[_0x3001bb(0x251)]=function(){const _0x35c01d=_0x3001bb;return $gameSystem[_0x35c01d(0x22e)]()[_0x35c01d(0x23d)]||$gameSystem['victoryAftermathSettings']()['bypassVictoryPhase'];},BattleManager['processVictoryAftermathRewards']=function(){const _0x421461=_0x3001bb;this[_0x421461(0x245)](),this['makeRewards'](),this['gainRewards']();},BattleManager['makeTempActors']=function(){const _0x1c74f9=_0x3001bb;this[_0x1c74f9(0x177)]=$gameParty['battleMembers']()[_0x1c74f9(0x174)](_0xa8dbfa=>_0xa8dbfa[_0x1c74f9(0xfc)]()),this[_0x1c74f9(0x13f)]=JsonEx[_0x1c74f9(0x178)](this['_victoryTempActorsA']);},BattleManager['prepareVictoryAftermathTransition']=function(){const _0x319ff6=_0x3001bb;this[_0x319ff6(0x19f)](),this[_0x319ff6(0x1da)](0x0),this[_0x319ff6(0x138)](_0x319ff6(0x13a)),this[_0x319ff6(0x15e)]=!![],this[_0x319ff6(0x287)]()?this['skipVictoryAftermathTransition']():this[_0x319ff6(0x192)]();},BattleManager[_0x3001bb(0x19f)]=function(){const _0x2f2f78=_0x3001bb,_0x13a56b=VisuMZ[_0x2f2f78(0x124)]['Settings'][_0x2f2f78(0x23c)];_0x13a56b[_0x2f2f78(0x1ba)]===undefined&&(_0x13a56b['AutoBattleAutoSkip']=!![]),_0x13a56b[_0x2f2f78(0x1ba)]===!![]&&(this[_0x2f2f78(0x1bb)]=this[_0x2f2f78(0x231)]);},BattleManager[_0x3001bb(0x287)]=function(){const _0x1a6b19=_0x3001bb;if(this[_0x1a6b19(0x1bb)])return!![];return $gameSystem['victoryAftermathSettings']()[_0x1a6b19(0x24d)];},BattleManager[_0x3001bb(0x261)]=function(){const _0x3717d5=_0x3001bb,_0x4545fc=VisuMZ[_0x3717d5(0x124)][_0x3717d5(0xf4)][_0x3717d5(0x23c)],_0x34268d=SceneManager[_0x3717d5(0x268)];setTimeout(_0x34268d[_0x3717d5(0x166)]['bind'](_0x34268d),_0x4545fc[_0x3717d5(0x120)]);},BattleManager['processVictoryAftermathTransition']=function(){const _0x265c0c=_0x3001bb,_0x413f8d=VisuMZ[_0x265c0c(0x124)][_0x265c0c(0xf4)][_0x265c0c(0x23c)],_0x5c92e9=SceneManager[_0x265c0c(0x268)];this[_0x265c0c(0x277)]=this['_rewards'][_0x265c0c(0x28d)]/(BattleManager['_victoryUpdateDuration']||0x1),Window_StatusBase[_0x265c0c(0x13e)][_0x265c0c(0x17e)](),setTimeout(_0x5c92e9['hideWindowsForVictoryAftermath']['bind'](_0x5c92e9),_0x413f8d[_0x265c0c(0xf9)]),setTimeout(_0x5c92e9[_0x265c0c(0x20f)][_0x265c0c(0xce)](_0x5c92e9),_0x413f8d[_0x265c0c(0x120)]);},BattleManager['nextVictoryLevelUpActor']=function(){const _0x301fb2=_0x3001bb;for(;;){this[_0x301fb2(0xea)]++;if(this[_0x301fb2(0xea)]>=$gameParty['maxBattleMembers']())return null;const _0x5d53fe=$gameParty['battleMembers']()[this[_0x301fb2(0xea)]],_0x1b2268=this[_0x301fb2(0x13f)][this[_0x301fb2(0xea)]];if(_0x5d53fe['level']!==_0x1b2268[_0x301fb2(0x23f)])return _0x5d53fe;}return null;},VisuMZ[_0x3001bb(0x124)][_0x3001bb(0x194)]=Game_System[_0x3001bb(0x13e)][_0x3001bb(0x153)],Game_System[_0x3001bb(0x13e)]['initialize']=function(){const _0x18bb15=_0x3001bb;VisuMZ[_0x18bb15(0x124)][_0x18bb15(0x194)][_0x18bb15(0x12a)](this),this[_0x18bb15(0x285)]();},Game_System['prototype'][_0x3001bb(0x285)]=function(){const _0x213aa4=_0x3001bb;this[_0x213aa4(0xe3)]={'bypassVictoryMusic':![],'bypassVictoryPhase':![],'bypassVictoryMotion':![]};},Game_System[_0x3001bb(0x13e)][_0x3001bb(0x22e)]=function(){const _0x353770=_0x3001bb;if(this['_victoryAftermathSettings']===undefined)this[_0x353770(0x285)]();return this[_0x353770(0xe3)];},VisuMZ[_0x3001bb(0x124)][_0x3001bb(0xe9)]=Game_Actor['prototype'][_0x3001bb(0x243)],Game_Actor[_0x3001bb(0x13e)][_0x3001bb(0x243)]=function(_0x153bed){const _0x5e3297=_0x3001bb;VisuMZ[_0x5e3297(0x124)][_0x5e3297(0xe9)][_0x5e3297(0x12a)](this,_0x153bed),this[_0x5e3297(0x257)]();},Game_Actor[_0x3001bb(0x13e)][_0x3001bb(0x257)]=function(){const _0x49a70d=_0x3001bb;this[_0x49a70d(0x21d)]=[],this[_0x49a70d(0x1e2)]=[];const _0x1bf8e2=this['actor']()['note'];_0x1bf8e2['match'](/<LEVEL UP (?:QUOTE|QUOTES)>\s*([\s\S]*)\s*<\/LEVEL UP (?:QUOTE|QUOTES)>/i)&&(this[_0x49a70d(0x21d)]=String(RegExp['$1'])['split'](/<NEW QUOTE>[\r\n]+/i)),_0x1bf8e2[_0x49a70d(0x1b5)](/<NEW SKILL (?:QUOTE|QUOTES)>\s*([\s\S]*)\s*<\/NEW SKILL (?:QUOTE|QUOTES)>/i)&&(this[_0x49a70d(0x1e2)]=String(RegExp['$1'])[_0x49a70d(0x1c2)](/<NEW QUOTE>[\r\n]+/i));},Game_Actor[_0x3001bb(0x13e)]['levelUpQuotes']=function(){const _0x46bc17=_0x3001bb;if(this[_0x46bc17(0x21d)]===undefined)this['setupVictoryAftermathQuotes']();return this[_0x46bc17(0x21d)];},Game_Actor[_0x3001bb(0x13e)][_0x3001bb(0xf0)]=function(){const _0x2b1fad=_0x3001bb;if(this[_0x2b1fad(0x1e2)]===undefined)this[_0x2b1fad(0x257)]();return this[_0x2b1fad(0x1e2)];},Game_Actor[_0x3001bb(0x13e)][_0x3001bb(0x1cc)]=function(){const _0x440d9f=_0x3001bb;if(this[_0x440d9f(0x12f)]())return 0x1;const _0x10e817=this[_0x440d9f(0x273)]()-this[_0x440d9f(0x141)](),_0x45eac6=this[_0x440d9f(0x14c)]()-this[_0x440d9f(0x141)]();return(_0x45eac6/_0x10e817)['clamp'](0x0,0x1);},VisuMZ[_0x3001bb(0x124)][_0x3001bb(0xf6)]=Game_Actor[_0x3001bb(0x13e)][_0x3001bb(0x23e)],Game_Actor['prototype'][_0x3001bb(0x23e)]=function(){const _0xf9d4b9=_0x3001bb;return SceneManager[_0xf9d4b9(0xef)]()?![]:VisuMZ['VictoryAftermath']['Game_Actor_shouldDisplayLevelUp']['call'](this);},Game_Actor['prototype']['makeVictoryCopy']=function(){const _0x5e0126=JsonEx['makeDeepCopy'](this);return _0x5e0126['_victoryAftermathCopy']=!![],_0x5e0126;},VisuMZ[_0x3001bb(0x124)][_0x3001bb(0x258)]=Game_Actor[_0x3001bb(0x13e)][_0x3001bb(0x154)],Game_Actor[_0x3001bb(0x13e)][_0x3001bb(0x154)]=function(){const _0x24058c=_0x3001bb;return this[_0x24058c(0x185)]?!![]:VisuMZ[_0x24058c(0x124)][_0x24058c(0x258)]['call'](this);},VisuMZ[_0x3001bb(0x124)]['Game_Actor_performVictory']=Game_Actor[_0x3001bb(0x13e)][_0x3001bb(0x1dd)],Game_Actor[_0x3001bb(0x13e)][_0x3001bb(0x1dd)]=function(){const _0x36ee5a=_0x3001bb;this[_0x36ee5a(0x104)]()?this['setActionState'](_0x36ee5a(0x229)):VisuMZ[_0x36ee5a(0x124)]['Game_Actor_performVictory'][_0x36ee5a(0x12a)](this);},Game_Actor[_0x3001bb(0x13e)][_0x3001bb(0x104)]=function(){const _0x59cce5=_0x3001bb;return $gameSystem['victoryAftermathSettings']()[_0x59cce5(0x20d)]||$gameSystem[_0x59cce5(0x22e)]()[_0x59cce5(0x24d)];},Scene_Battle[_0x3001bb(0x13e)][_0x3001bb(0x17a)]=function(){const _0x19f35d=_0x3001bb;if(this['_spriteset'][_0x19f35d(0x216)]())return setTimeout(this[_0x19f35d(0x17a)]['bind'](this),0x7d0);if(!SceneManager[_0x19f35d(0xef)]())return;this[_0x19f35d(0x148)](![]),this[_0x19f35d(0x13c)](),this[_0x19f35d(0x107)](),this[_0x19f35d(0x198)]['y']=Graphics[_0x19f35d(0x24b)]*0xa;},Scene_Battle[_0x3001bb(0x13e)][_0x3001bb(0x20f)]=function(){const _0x26918b=_0x3001bb;if(this[_0x26918b(0x267)][_0x26918b(0x216)]())return setTimeout(this[_0x26918b(0x20f)][_0x26918b(0xce)](this),0x7d0);this[_0x26918b(0x13d)]=[],this[_0x26918b(0x26c)](),this['createVictoryContinueMessageWindow'](),this[_0x26918b(0x1c5)]();},Scene_Battle['prototype'][_0x3001bb(0x26c)]=function(){const _0x2d6303=_0x3001bb;this[_0x2d6303(0x234)]=[],this[_0x2d6303(0x103)](),this['createVictoryStepLevelUps']();},Scene_Battle['prototype']['createVictoryStepRewards']=function(){const _0x2e8519=_0x3001bb;this[_0x2e8519(0x234)][_0x2e8519(0x1ac)](_0x2e8519(0x250));},Scene_Battle[_0x3001bb(0x13e)][_0x3001bb(0x17f)]=function(){const _0x26fbf9=_0x3001bb;if(!this[_0x26fbf9(0x1bf)]())return;for(const _0x2398e8 of $gameParty['battleMembers']()){if(!_0x2398e8)continue;const _0x463ace=BattleManager[_0x26fbf9(0x177)][_0x2398e8[_0x26fbf9(0x256)]()];_0x2398e8[_0x26fbf9(0x23f)]>_0x463ace[_0x26fbf9(0x23f)]&&this[_0x26fbf9(0x1ad)](_0x2398e8);}},Scene_Battle[_0x3001bb(0x13e)][_0x3001bb(0x1ad)]=function(_0x58c305){const _0x3b5105=_0x3001bb;Imported['VisuMZ_1_MainMenuCore']&&Window_VictoryLevelUp['_showBust']&&ImageManager[_0x3b5105(0x271)](_0x58c305[_0x3b5105(0x260)]()),this[_0x3b5105(0x234)]['push'](_0x3b5105(0x168));},Scene_Battle[_0x3001bb(0x13e)][_0x3001bb(0x1bf)]=function(){const _0x2af7ba=_0x3001bb;return VisuMZ[_0x2af7ba(0x124)]['Settings']['LevelUp'][_0x2af7ba(0xfb)];},Scene_Battle['prototype'][_0x3001bb(0x1c5)]=function(){const _0x5ad299=_0x3001bb;this[_0x5ad299(0x1f3)]=this[_0x5ad299(0x234)][_0x5ad299(0x108)]()||'',this['processVictoryStep']();},Scene_Battle[_0x3001bb(0x13e)][_0x3001bb(0x272)]=function(){const _0x17b7e0=_0x3001bb;switch(this['_victoryStep']['toLowerCase']()[_0x17b7e0(0x1a7)]()){case _0x17b7e0(0x250):this['createVictoryRewardsWindow'](),this[_0x17b7e0(0x1b3)][_0x17b7e0(0x27b)](BattleManager[_0x17b7e0(0x14b)]);break;case _0x17b7e0(0x168):this[_0x17b7e0(0x21e)](),this[_0x17b7e0(0x175)](),this[_0x17b7e0(0x1b3)][_0x17b7e0(0x27b)](0x0);break;default:this[_0x17b7e0(0x166)]();break;}this[_0x17b7e0(0x28b)](this[_0x17b7e0(0x1b3)]);},Scene_Battle[_0x3001bb(0x13e)][_0x3001bb(0x137)]=function(){const _0x472800=_0x3001bb,_0x162645=Window_Base[_0x472800(0x13e)][_0x472800(0x1bc)](),_0x4aee5c=Math[_0x472800(0x235)](Graphics[_0x472800(0xeb)]/0x2)-0x64,_0x3679b0=Math[_0x472800(0x235)](Graphics[_0x472800(0x24b)]-_0x162645*1.25),_0x2d3b52=Math['round'](Graphics[_0x472800(0xeb)]/0x2),_0xaeee15=_0x162645;return new Rectangle(_0x4aee5c,_0x3679b0,_0x2d3b52,_0xaeee15);},Scene_Battle['prototype'][_0x3001bb(0x115)]=function(){const _0x7c82e3=_0x3001bb,_0x1ccb43=0x0,_0x2d7d3a=0x0,_0x36ec5a=Graphics[_0x7c82e3(0xeb)],_0x523e8c=Graphics[_0x7c82e3(0x24b)];return new Rectangle(_0x1ccb43,_0x2d7d3a,_0x36ec5a,_0x523e8c);},Scene_Battle[_0x3001bb(0x13e)][_0x3001bb(0x193)]=function(){const _0x172b3a=_0x3001bb;if(this[_0x172b3a(0x1b3)])return;const _0x396cae=this[_0x172b3a(0x137)](),_0x24badf=new Window_VictoryContinueMessage(_0x396cae);this[_0x172b3a(0x28b)](_0x24badf),this['_victoryWindows'][_0x172b3a(0x1ac)](_0x24badf),this[_0x172b3a(0x1b3)]=_0x24badf;},Scene_Battle[_0x3001bb(0x13e)][_0x3001bb(0x131)]=function(){const _0x2091c5=_0x3001bb;if(this[_0x2091c5(0x133)])return;const _0x74af36=this[_0x2091c5(0x115)](),_0x5af7e4=new Window_VictoryRewards(_0x74af36);this['addChild'](_0x5af7e4),this[_0x2091c5(0x13d)]['push'](_0x5af7e4),this[_0x2091c5(0x133)]=_0x5af7e4;},Scene_Battle[_0x3001bb(0x13e)][_0x3001bb(0x21e)]=function(){const _0x17acd2=_0x3001bb;if(this['_victoryLevelUpWindow'])return;const _0x72efd=this['victoryFullScreenWindowRect'](),_0x10c0a9=new Window_VictoryLevelUp(_0x72efd);this[_0x17acd2(0x28b)](_0x10c0a9),this[_0x17acd2(0x13d)][_0x17acd2(0x1ac)](_0x10c0a9),this[_0x17acd2(0x132)]=_0x10c0a9;},Scene_Battle['prototype'][_0x3001bb(0x175)]=function(){const _0x15aab4=_0x3001bb,_0x40c139=BattleManager[_0x15aab4(0x252)]();this[_0x15aab4(0x132)][_0x15aab4(0x219)](_0x40c139),Imported[_0x15aab4(0x255)]&&_0x40c139['playBattleVoice'](_0x15aab4(0x1a2));},Scene_Battle[_0x3001bb(0x13e)][_0x3001bb(0x166)]=function(){const _0x2ccacb=_0x3001bb;BattleManager[_0x2ccacb(0x143)](),BattleManager[_0x2ccacb(0x15e)]=![];};Imported[_0x3001bb(0x266)]&&(VisuMZ[_0x3001bb(0x124)][_0x3001bb(0x16b)]=Scene_Battle[_0x3001bb(0x13e)][_0x3001bb(0x24a)],Scene_Battle[_0x3001bb(0x13e)][_0x3001bb(0x24a)]=function(){const _0x36c78f=_0x3001bb;if(BattleManager[_0x36c78f(0x212)]())return![];return VisuMZ['VictoryAftermath'][_0x36c78f(0x16b)]['call'](this);});;Scene_Battle[_0x3001bb(0x13e)]['isVictoryContinueReady']=function(){const _0x12c4d0=_0x3001bb;return this['_victoryContinueWindow']&&this[_0x12c4d0(0x1b3)][_0x12c4d0(0x14f)]();},VisuMZ[_0x3001bb(0x124)][_0x3001bb(0x202)]=Scene_Battle[_0x3001bb(0x13e)][_0x3001bb(0x222)],Scene_Battle[_0x3001bb(0x13e)][_0x3001bb(0x222)]=function(){const _0x41ca18=_0x3001bb;VisuMZ[_0x41ca18(0x124)][_0x41ca18(0x202)][_0x41ca18(0x12a)](this),this[_0x41ca18(0x130)]();},Scene_Battle[_0x3001bb(0x13e)][_0x3001bb(0x130)]=function(){const _0x5be5a6=_0x3001bb;if(!BattleManager[_0x5be5a6(0x212)]())return;if(!this[_0x5be5a6(0x236)]())return;(Input[_0x5be5a6(0x254)]('ok')||Input[_0x5be5a6(0x254)](_0x5be5a6(0x15b))||TouchInput[_0x5be5a6(0x254)]())&&(Input['clear'](),TouchInput[_0x5be5a6(0x217)](),this[_0x5be5a6(0x1c5)]());},Sprite_Enemy['prototype']['isCollapsing']=function(){const _0x15344b=_0x3001bb,_0xde8d8a=VisuMZ[_0x15344b(0x124)][_0x15344b(0xf4)][_0x15344b(0x23c)];if(this[_0x15344b(0x181)]===_0x15344b(0x201)){if(_0xde8d8a[_0x15344b(0x1a1)]!==undefined)return _0xde8d8a[_0x15344b(0x1a1)];}else{if(this[_0x15344b(0x181)]==='bossCollapse'){if(_0xde8d8a[_0x15344b(0x146)]!==undefined)return _0xde8d8a[_0x15344b(0x146)];}}return[_0x15344b(0x201),_0x15344b(0x186)]['includes']();},Sprite_Battler[_0x3001bb(0x13e)][_0x3001bb(0x216)]=function(){return![];},Spriteset_Battle[_0x3001bb(0x13e)][_0x3001bb(0x216)]=function(){const _0x599519=_0x3001bb;return this['battlerSprites']()[_0x599519(0x173)](_0x1d1080=>_0x1d1080['isCollapsing']());};function Sprite_VictoryGauge(){const _0x9638aa=_0x3001bb;this[_0x9638aa(0x153)](...arguments);}Sprite_VictoryGauge[_0x3001bb(0x13e)]=Object[_0x3001bb(0x1d9)](Sprite['prototype']),Sprite_VictoryGauge[_0x3001bb(0x13e)][_0x3001bb(0x1e6)]=Sprite_VictoryGauge,Sprite_VictoryGauge[_0x3001bb(0x13e)]['initialize']=function(_0x59be8e,_0x55f956,_0x54514d){const _0x1bf288=_0x3001bb;this[_0x1bf288(0x28c)]=_0x59be8e,this[_0x1bf288(0x11a)]=_0x55f956,this[_0x1bf288(0x14a)]=_0x54514d,Sprite[_0x1bf288(0x13e)][_0x1bf288(0x153)][_0x1bf288(0x12a)](this),this[_0x1bf288(0x1e9)](),this[_0x1bf288(0x18d)](),this[_0x1bf288(0x10d)](),this[_0x1bf288(0x182)]();},Sprite_VictoryGauge[_0x3001bb(0x13e)][_0x3001bb(0x1e9)]=function(){const _0x3e541f=_0x3001bb;this['_duration']=BattleManager['_victoryUpdateDuration'],this[_0x3e541f(0x1ca)]=this[_0x3e541f(0x1af)]()[_0x3e541f(0x23f)],this[_0x3e541f(0x1f6)]=![];},Sprite_VictoryGauge[_0x3001bb(0x13e)]['createBitmap']=function(){const _0x25d4ef=_0x3001bb;this['bitmap']=new Bitmap(this[_0x25d4ef(0x14a)],this[_0x25d4ef(0x1bc)]()*0x2);},Sprite_VictoryGauge[_0x3001bb(0x13e)][_0x3001bb(0x1bc)]=function(){const _0x4be9e6=_0x3001bb;return Window_Base['prototype'][_0x4be9e6(0x1bc)]();},Sprite_VictoryGauge[_0x3001bb(0x13e)][_0x3001bb(0x1af)]=function(){const _0x3faa5c=_0x3001bb;return BattleManager[_0x3faa5c(0x177)][this[_0x3faa5c(0x28c)]];},Sprite_VictoryGauge[_0x3001bb(0x13e)][_0x3001bb(0x222)]=function(){const _0x140258=_0x3001bb;Sprite['prototype']['update'][_0x140258(0x12a)](this),this['updateExpGain'](),this[_0x140258(0x182)]();},Sprite_VictoryGauge[_0x3001bb(0x13e)][_0x3001bb(0x1a8)]=function(){const _0x460cf1=_0x3001bb;if(this[_0x460cf1(0x1f4)]<=0x0)return;const _0x83821d=this[_0x460cf1(0x1af)]();this[_0x460cf1(0x1f4)]--;this[_0x460cf1(0x21b)]()&&(this['_duration']=0x0);if(this[_0x460cf1(0x1f4)]<=0x0){const _0x3778ea=$gameActors[_0x460cf1(0x1af)](_0x83821d[_0x460cf1(0x270)]);_0x83821d[_0x460cf1(0x278)](_0x3778ea['currentExp'](),![]);}else _0x83821d['gainTempExp'](BattleManager[_0x460cf1(0x277)]);this['_currentlevel']!==_0x83821d[_0x460cf1(0x23f)]&&(this[_0x460cf1(0x1ca)]=_0x83821d[_0x460cf1(0x23f)],this[_0x460cf1(0x1f6)]=!![],SoundManager[_0x460cf1(0x25e)]()),this[_0x460cf1(0x10d)]();},Game_Actor[_0x3001bb(0x13e)][_0x3001bb(0xe1)]=function(_0x5eb7fe){const _0x143f2e=_0x3001bb,_0x5b4114=this[_0x143f2e(0x14c)]()+_0x5eb7fe*this['finalExpRate']();this['changeExp'](_0x5b4114,this['shouldDisplayLevelUp']());},Sprite_VictoryGauge[_0x3001bb(0x13e)][_0x3001bb(0x21b)]=function(){const _0x2a94ee=_0x3001bb;return SceneManager['_scene'][_0x2a94ee(0x236)]();},Sprite_VictoryGauge[_0x3001bb(0x13e)][_0x3001bb(0x182)]=function(){const _0x2680ac=_0x3001bb;this['opacity']=this[_0x2680ac(0x11a)][_0x2680ac(0xe4)];},Sprite_VictoryGauge['prototype'][_0x3001bb(0x10d)]=function(){const _0x4baa17=_0x3001bb;this[_0x4baa17(0x25a)][_0x4baa17(0x217)](),this[_0x4baa17(0x248)](),this[_0x4baa17(0x1cd)](),this[_0x4baa17(0x24f)](),this[_0x4baa17(0xdb)](),this[_0x4baa17(0xf2)](),this['drawExpValues']();},Sprite_VictoryGauge[_0x3001bb(0x13e)][_0x3001bb(0x248)]=function(){const _0x55f80a=_0x3001bb;this[_0x55f80a(0x25a)][_0x55f80a(0x1b6)]=$gameSystem[_0x55f80a(0x17b)](),this[_0x55f80a(0x25a)]['fontSize']=$gameSystem['mainFontSize'](),this[_0x55f80a(0x25a)][_0x55f80a(0x21c)]=ColorManager['normalColor']();},Sprite_VictoryGauge[_0x3001bb(0x13e)][_0x3001bb(0x1cd)]=function(){const _0x213ef8=_0x3001bb;this[_0x213ef8(0x248)]();const _0x27dc0a=this['lineHeight'](),_0x22ac83=Math[_0x213ef8(0x235)](_0x27dc0a/0x2),_0x39250a=0x0,_0x4cf7b8=this[_0x213ef8(0x25a)][_0x213ef8(0xeb)]-_0x27dc0a,_0x2e8439=_0x213ef8(0x225),_0x12d645=this[_0x213ef8(0x1af)]()[_0x213ef8(0x230)]();this['bitmap'][_0x213ef8(0x211)](_0x12d645,_0x22ac83,_0x39250a,_0x4cf7b8,_0x27dc0a,_0x2e8439);},Sprite_VictoryGauge[_0x3001bb(0x13e)][_0x3001bb(0x24f)]=function(){const _0x2f7da1=_0x3001bb;this['resetFontSettings']();const _0x5e78df=this[_0x2f7da1(0x1bc)](),_0x246707=Math['round'](_0x5e78df/0x2),_0xf34062=0x0,_0x542bfc=this['bitmap'][_0x2f7da1(0xeb)]-_0x5e78df,_0x41d6cb=this['getAdditionalRewardsText']()===''?'right':_0x2f7da1(0x22b),_0x47b018=TextManager['victoryDisplayLvFmt'][_0x2f7da1(0x117)](this[_0x2f7da1(0x1af)]()[_0x2f7da1(0x23f)]);this['_showLevelUp']&&(this['bitmap'][_0x2f7da1(0x21c)]=ColorManager[_0x2f7da1(0x269)]()),this[_0x2f7da1(0x25a)]['drawText'](_0x47b018,_0x246707,_0xf34062,_0x542bfc,_0x5e78df,_0x41d6cb);},Sprite_VictoryGauge['prototype'][_0x3001bb(0x241)]=function(){const _0x3ec5c9=_0x3001bb,_0x21851b=$gameParty[_0x3ec5c9(0x16a)]()[this[_0x3ec5c9(0x28c)]];if(!_0x21851b)return'';if(Imported['VisuMZ_X_Template']&&VisuMZ['Template'][_0x3ec5c9(0xf4)][_0x3ec5c9(0x1e1)][_0x3ec5c9(0x207)])return VisuMZ[_0x3ec5c9(0x1d4)]['Settings'][_0x3ec5c9(0x1e1)][_0x3ec5c9(0x122)]['format'](_0x21851b['earnedJobPoints'](),TextManager['jobPointsAbbr'],TextManager['jobPointsFull']);if(Imported['VisuMZ_2_ClassChangeSystem']){const _0x442581=VisuMZ[_0x3ec5c9(0x22f)][_0x3ec5c9(0xf4)];if(_0x442581['ClassPoints'][_0x3ec5c9(0x207)])return _0x442581[_0x3ec5c9(0xcb)][_0x3ec5c9(0x122)][_0x3ec5c9(0x117)](_0x21851b[_0x3ec5c9(0x1e5)](),TextManager[_0x3ec5c9(0x238)],TextManager[_0x3ec5c9(0xdf)]);if(_0x442581['JobPoints']['AftermathActorDisplay'])return _0x442581[_0x3ec5c9(0x1e1)][_0x3ec5c9(0x122)]['format'](_0x21851b[_0x3ec5c9(0x25c)](),TextManager[_0x3ec5c9(0x1eb)],TextManager[_0x3ec5c9(0x11e)]);}if(Imported[_0x3ec5c9(0x25b)]){const _0x1a3764=VisuMZ['SkillLearnSystem'][_0x3ec5c9(0xf4)];if(_0x1a3764[_0x3ec5c9(0x1bd)][_0x3ec5c9(0x207)])return _0x1a3764[_0x3ec5c9(0x1bd)][_0x3ec5c9(0x122)][_0x3ec5c9(0x117)](_0x21851b['earnedAbilityPoints'](),TextManager[_0x3ec5c9(0x162)],TextManager['abilityPointsFull']);if(_0x1a3764[_0x3ec5c9(0x262)][_0x3ec5c9(0x207)])return _0x1a3764[_0x3ec5c9(0x262)][_0x3ec5c9(0x122)][_0x3ec5c9(0x117)](_0x21851b[_0x3ec5c9(0xd5)](),TextManager[_0x3ec5c9(0x19b)],TextManager[_0x3ec5c9(0x10b)]);}return'';},Sprite_VictoryGauge[_0x3001bb(0x13e)][_0x3001bb(0xdb)]=function(){const _0x4abae7=_0x3001bb;this[_0x4abae7(0x248)]();const _0x587f07=this[_0x4abae7(0x1bc)](),_0x1a285b=Math[_0x4abae7(0x235)](_0x587f07/0x2),_0x53ebd7=0x0,_0x3e482c=this[_0x4abae7(0x25a)][_0x4abae7(0xeb)]-_0x587f07,_0xf08535=_0x4abae7(0x228);let _0x1644e3=this[_0x4abae7(0x241)]();this['bitmap'][_0x4abae7(0x211)](_0x1644e3,_0x1a285b,_0x53ebd7,_0x3e482c,_0x587f07,_0xf08535);},Sprite_VictoryGauge[_0x3001bb(0x13e)]['drawExpGauge']=function(){const _0xe413c9=_0x3001bb,_0x508c7c=this[_0xe413c9(0x1bc)](),_0x4996d6=this[_0xe413c9(0x25a)][_0xe413c9(0xeb)]-_0x508c7c,_0x51e523=Sprite_Gauge['prototype'][_0xe413c9(0x145)](),_0x877192=Math[_0xe413c9(0x235)](_0x508c7c/0x2),_0x3de9d2=_0x508c7c*0x2-_0x51e523-0x2,_0x374c03=Math[_0xe413c9(0x23b)]((_0x4996d6-0x2)*this[_0xe413c9(0x1af)]()[_0xe413c9(0x1cc)]()),_0x384b21=_0x51e523-0x2,_0x3c26ce=this[_0xe413c9(0x249)](),_0x3b0b8c=this[_0xe413c9(0x164)](),_0x23ac3c=this[_0xe413c9(0x10a)]();if(Imported[_0xe413c9(0x279)]){const _0xfcfedd=VisuMZ[_0xe413c9(0x1a0)][_0xe413c9(0xf4)]['battlerEXPStyle']??_0xe413c9(0x109);this[_0xe413c9(0x25a)][_0xe413c9(0x144)](_0xfcfedd,_0x877192,_0x3de9d2,_0x4996d6,_0x51e523,this[_0xe413c9(0x1af)]()[_0xe413c9(0x1cc)](),_0x3c26ce,_0x3b0b8c,_0x23ac3c);}else this['bitmap'][_0xe413c9(0x20c)](_0x877192,_0x3de9d2,_0x4996d6,_0x51e523,_0x3c26ce),this[_0xe413c9(0x25a)][_0xe413c9(0x1a4)](_0x877192+0x1,_0x3de9d2+0x1,_0x374c03,_0x384b21,_0x3b0b8c,_0x23ac3c);},Sprite_VictoryGauge[_0x3001bb(0x13e)][_0x3001bb(0x249)]=function(){return ColorManager['gaugeBackColor']();},Sprite_VictoryGauge[_0x3001bb(0x13e)]['gaugeColor1']=function(){const _0x12b7d4=_0x3001bb;return this[_0x12b7d4(0x1af)]()['isMaxLevel']()?Imported[_0x12b7d4(0xfa)]?ColorManager['maxLvGaugeColor1']():ColorManager['textColor'](0xe):Imported['VisuMZ_0_CoreEngine']?ColorManager[_0x12b7d4(0x1db)]():ColorManager[_0x12b7d4(0x21c)](0x1e);},Sprite_VictoryGauge[_0x3001bb(0x13e)][_0x3001bb(0x10a)]=function(){const _0x247982=_0x3001bb;return this[_0x247982(0x1af)]()[_0x247982(0x12f)]()?Imported[_0x247982(0xfa)]?ColorManager[_0x247982(0x1c0)]():ColorManager[_0x247982(0x21c)](0x6):Imported['VisuMZ_0_CoreEngine']?ColorManager[_0x247982(0x1ea)]():ColorManager[_0x247982(0x21c)](0x1f);},Sprite_VictoryGauge[_0x3001bb(0x13e)][_0x3001bb(0x1ae)]=function(){const _0x162305=_0x3001bb;this[_0x162305(0x248)]();const _0x42d2d6=this[_0x162305(0x1bc)](),_0x596fcc=_0x42d2d6,_0x382554=_0x42d2d6;let _0x1dd37e=this[_0x162305(0x25a)][_0x162305(0xeb)]-_0x42d2d6*0x2;const _0x55c9e8=this[_0x162305(0x1af)]();let _0x2d743e=Math[_0x162305(0x235)](_0x55c9e8[_0x162305(0x14c)]()-_0x55c9e8[_0x162305(0x141)]()),_0x43a0eb='/'+Math['round'](_0x55c9e8['nextLevelExp']()-_0x55c9e8[_0x162305(0x141)]());Imported[_0x162305(0xfa)]&&VisuMZ['CoreEngine'][_0x162305(0xf4)]['QoL'][_0x162305(0x239)]&&(_0x2d743e=VisuMZ[_0x162305(0x215)](_0x2d743e),_0x43a0eb=VisuMZ[_0x162305(0x215)](_0x43a0eb));this[_0x162305(0x1f6)]?(this['bitmap'][_0x162305(0x21c)]=ColorManager['victoryLevelUpColor'](),this['bitmap'][_0x162305(0x211)](TextManager[_0x162305(0x1c6)],_0x596fcc,_0x382554,_0x1dd37e,_0x42d2d6,_0x162305(0x225))):this[_0x162305(0x25a)]['drawText'](TextManager[_0x162305(0x28d)],_0x596fcc,_0x382554,_0x1dd37e,_0x42d2d6,'left');this[_0x162305(0x248)]();if(_0x55c9e8[_0x162305(0x12f)]()){this[_0x162305(0x25a)][_0x162305(0x211)](_0x162305(0x197),_0x596fcc,_0x382554,_0x1dd37e,_0x42d2d6,_0x162305(0x228));return;}this[_0x162305(0x25a)][_0x162305(0x280)]-=0x8,this[_0x162305(0x25a)][_0x162305(0x21c)]=ColorManager['textColor'](0x8),this[_0x162305(0x25a)]['drawText'](_0x43a0eb,_0x596fcc,_0x382554,_0x1dd37e,_0x42d2d6,_0x162305(0x228)),_0x1dd37e-=this[_0x162305(0x25a)][_0x162305(0x11d)](_0x43a0eb),this[_0x162305(0x248)](),this['bitmap'][_0x162305(0x211)](_0x2d743e,_0x596fcc,_0x382554,_0x1dd37e,_0x42d2d6,_0x162305(0x228));};function Window_VictoryContinueMessage(){const _0x7e5ca4=_0x3001bb;this[_0x7e5ca4(0x153)](...arguments);}Window_VictoryContinueMessage[_0x3001bb(0x13e)]=Object[_0x3001bb(0x1d9)](Window_Base[_0x3001bb(0x13e)]),Window_VictoryContinueMessage['prototype'][_0x3001bb(0x1e6)]=Window_VictoryContinueMessage,Window_VictoryContinueMessage[_0x3001bb(0x13e)][_0x3001bb(0x153)]=function(_0x24c7c0){const _0x5da4cc=_0x3001bb;Window_Base[_0x5da4cc(0x13e)][_0x5da4cc(0x153)][_0x5da4cc(0x12a)](this,_0x24c7c0),this[_0x5da4cc(0x102)](0x2),this['refresh']();},Window_VictoryContinueMessage[_0x3001bb(0x13e)][_0x3001bb(0x27b)]=function(_0x4a1da){const _0x4982a7=_0x3001bb;this[_0x4982a7(0x183)]=_0x4a1da,this['contentsOpacity']=0x0;},Window_VictoryContinueMessage[_0x3001bb(0x13e)][_0x3001bb(0x1e0)]=function(){const _0x24f805=_0x3001bb;this[_0x24f805(0xca)]=0x0;},Window_VictoryContinueMessage[_0x3001bb(0x13e)]['update']=function(){const _0x48ba74=_0x3001bb;Window_Base[_0x48ba74(0x13e)][_0x48ba74(0x222)][_0x48ba74(0x12a)](this),this[_0x48ba74(0x1b0)]();},Window_VictoryContinueMessage[_0x3001bb(0x13e)][_0x3001bb(0x1b0)]=function(){const _0x59b310=_0x3001bb;this[_0x59b310(0x183)]>0x0&&this[_0x59b310(0x21b)]()&&(this[_0x59b310(0x183)]=0x0,Input[_0x59b310(0x217)](),TouchInput[_0x59b310(0x217)]());if(this[_0x59b310(0x183)]-->0x0)return;this[_0x59b310(0xe4)]+=Window_VictoryRewards['_opacitySpeed'];},Window_VictoryContinueMessage[_0x3001bb(0x13e)][_0x3001bb(0x21b)]=function(){const _0x1b5023=_0x3001bb;return Input['isPressed']('ok')||Input[_0x1b5023(0x1e8)](_0x1b5023(0x15b))||TouchInput[_0x1b5023(0x1e8)]();},Window_VictoryContinueMessage[_0x3001bb(0x13e)][_0x3001bb(0x10d)]=function(){const _0x455982=_0x3001bb;this['contents'][_0x455982(0x217)]();const _0x217475=TextManager['victoryContinueFmt'];let _0x393200=TextManager[_0x455982(0x19e)],_0x4b92f4=TextManager[_0x455982(0x206)];Imported[_0x455982(0xfa)]&&(_0x393200=TextManager[_0x455982(0xda)]('ok'),_0x4b92f4=TextManager['getInputButtonString'](_0x455982(0x15b)));const _0x1d1f8d=_0x217475['format'](_0x393200,_0x4b92f4),_0x5285df=this[_0x455982(0x1c3)](_0x1d1f8d)[_0x455982(0xeb)],_0x1fe552=Math[_0x455982(0x235)]((this['innerWidth']-_0x5285df)/0x2);this['drawTextEx'](_0x1d1f8d,_0x1fe552,0x0,_0x5285df);},Window_VictoryContinueMessage['prototype']['isContinueReady']=function(){return this['_delayDuration']<=0x0;};function Window_VictoryRewards(){this['initialize'](...arguments);}Window_VictoryRewards[_0x3001bb(0x190)]=VisuMZ[_0x3001bb(0x124)][_0x3001bb(0xf4)][_0x3001bb(0x23c)][_0x3001bb(0x205)],Window_VictoryRewards[_0x3001bb(0x13e)]=Object[_0x3001bb(0x1d9)](Window_StatusBase[_0x3001bb(0x13e)]),Window_VictoryRewards['prototype'][_0x3001bb(0x1e6)]=Window_VictoryRewards,Window_VictoryRewards[_0x3001bb(0x13e)][_0x3001bb(0x153)]=function(_0x5ec4b9){const _0x351d5f=_0x3001bb;Window_StatusBase[_0x351d5f(0x13e)][_0x351d5f(0x153)][_0x351d5f(0x12a)](this,_0x5ec4b9),this['setBackgroundType'](0x2),this[_0x351d5f(0xe4)]=0x0,this[_0x351d5f(0x10d)]();},Window_VictoryRewards[_0x3001bb(0x13e)][_0x3001bb(0x1e0)]=function(){const _0x1dd247=_0x3001bb;this[_0x1dd247(0xca)]=0x0;},Window_VictoryRewards[_0x3001bb(0x13e)][_0x3001bb(0x222)]=function(){const _0x328016=_0x3001bb;Window_StatusBase[_0x328016(0x13e)][_0x328016(0x222)][_0x328016(0x12a)](this),this['updateContentsOpacity']();},Window_VictoryRewards['prototype']['updateContentsOpacity']=function(){const _0x17aafb=_0x3001bb;SceneManager[_0x17aafb(0x268)][_0x17aafb(0x1f3)]==='rewards'?this[_0x17aafb(0xe4)]+=Window_VictoryRewards[_0x17aafb(0x190)]:this[_0x17aafb(0xe4)]-=Window_VictoryRewards[_0x17aafb(0x190)];},Window_VictoryRewards[_0x3001bb(0x13e)][_0x3001bb(0x275)]=function(){const _0x3918a1=_0x3001bb;return VisuMZ[_0x3918a1(0x124)]['Settings']['General'][_0x3918a1(0x1fb)];},Window_VictoryRewards['prototype'][_0x3001bb(0x10d)]=function(){const _0x14934d=_0x3001bb;Window_StatusBase['prototype'][_0x14934d(0x10d)][_0x14934d(0x12a)](this),this[_0x14934d(0x142)]['clear'](),this[_0x14934d(0x248)](),this[_0x14934d(0x23a)](),this[_0x14934d(0x24c)](),this[_0x14934d(0x10f)](),this['makeItemGainWindow'](),this[_0x14934d(0x116)]();},Window_VictoryRewards[_0x3001bb(0x1d3)]=VisuMZ[_0x3001bb(0x124)][_0x3001bb(0xf4)][_0x3001bb(0x23c)][_0x3001bb(0xe0)]??_0x3001bb(0xe2),Window_VictoryRewards['BG_COLOR_2']=VisuMZ[_0x3001bb(0x124)][_0x3001bb(0xf4)]['General']['bgColor2']??'rgba(0,\x200,\x200,\x200.4)',Window_VictoryRewards[_0x3001bb(0x13e)]['drawBackgroundElements']=function(){const _0x54a68e=_0x3001bb,_0x539abf=this[_0x54a68e(0x1bc)](),_0xa63d9a=0x0,_0x5cb5d5=_0x539abf*2.5,_0x2df862=Window_VictoryRewards[_0x54a68e(0x1d3)],_0xf996b7=Window_VictoryRewards['BG_COLOR_2'],_0x486c71=ColorManager['normalColor']();this[_0x54a68e(0x142)][_0x54a68e(0x1a4)](_0xa63d9a,_0x5cb5d5,this[_0x54a68e(0xeb)],this[_0x54a68e(0x24b)]-_0x5cb5d5-_0x539abf*1.5,_0x2df862,_0xf996b7),this[_0x54a68e(0x142)]['fillRect'](0x0,_0x5cb5d5-0x1,this[_0x54a68e(0xeb)],0x2,_0x486c71),this[_0x54a68e(0x142)][_0x54a68e(0x20c)](0x0,this['height']-_0x539abf*1.5-0x1,this[_0x54a68e(0xeb)],0x2,_0x486c71);const _0x5ced0e=this[_0x54a68e(0x275)](),_0x3807de=_0x5ced0e?Math[_0x54a68e(0x235)](this[_0x54a68e(0xeb)]/0x2+0x28):0x64,_0x2de842=_0x5cb5d5-_0x539abf*0.75,_0x58cd74=TextManager[_0x54a68e(0x14d)];this[_0x54a68e(0x1a5)](),this[_0x54a68e(0x1a5)](),this['drawText'](_0x58cd74,_0x3807de,_0x2de842,this[_0x54a68e(0xeb)]);},Window_VictoryRewards[_0x3001bb(0xd6)]=VisuMZ[_0x3001bb(0x124)][_0x3001bb(0xf4)][_0x3001bb(0xd3)],Window_VictoryRewards[_0x3001bb(0x13e)][_0x3001bb(0x24c)]=function(){const _0x213d1d=_0x3001bb;this[_0x213d1d(0x248)]();const _0x2b19d8=this[_0x213d1d(0x275)](),_0x3175c5=this[_0x213d1d(0x1bc)](),_0x13dbe9=Math[_0x213d1d(0x23b)](_0x3175c5/0x2),_0x44f328=_0x2b19d8?Math[_0x213d1d(0x235)](this[_0x213d1d(0xeb)]/0x2+0x28):0x64,_0x1bbbda=Math[_0x213d1d(0x235)](_0x3175c5*3.5),_0x2b98f6=Math['round'](this[_0x213d1d(0xeb)]/0x2-0x8c),_0x58d455=_0x2b98f6-_0x13dbe9-0x50;let _0x47d87b=_0x1bbbda;for(const _0x970caa of Window_VictoryRewards[_0x213d1d(0xd6)]){if(!_0x970caa[_0x213d1d(0x1a9)]())continue;this[_0x213d1d(0x244)](_0x44f328,_0x47d87b,_0x2b98f6),this[_0x213d1d(0x223)](ColorManager['systemColor']()),this['drawText'](_0x970caa[_0x213d1d(0x218)](),_0x44f328+_0x13dbe9,_0x47d87b,_0x58d455),this[_0x213d1d(0x223)](ColorManager['normalColor']());const _0x50bb7b=_0x970caa[_0x213d1d(0x196)]();Imported[_0x213d1d(0xf7)]&&_0x970caa[_0x213d1d(0x218)]()===TextManager[_0x213d1d(0x20b)]?this[_0x213d1d(0x1d6)](_0x50bb7b,TextManager[_0x213d1d(0x20b)],_0x44f328+_0x13dbe9,_0x47d87b,_0x58d455):this[_0x213d1d(0x211)](_0x50bb7b,_0x44f328+_0x13dbe9,_0x47d87b,_0x58d455,_0x213d1d(0x228)),_0x47d87b+=_0x3175c5;}},Window_VictoryRewards[_0x3001bb(0x140)]=VisuMZ[_0x3001bb(0x124)][_0x3001bb(0xf4)]['General'][_0x3001bb(0x1f9)]??_0x3001bb(0x16f),Window_VictoryRewards['REWARD_STRIP_COLOR_2']=VisuMZ[_0x3001bb(0x124)][_0x3001bb(0xf4)][_0x3001bb(0x23c)]['rewardStrip2']??_0x3001bb(0x237),Window_VictoryRewards[_0x3001bb(0x13e)][_0x3001bb(0x244)]=function(_0x3a957e,_0x292ce5,_0x327ada){const _0x21aacf=_0x3001bb,_0x43992d=this[_0x21aacf(0x1bc)]()-0x2,_0x1aecb8=Math[_0x21aacf(0x23b)](_0x43992d/0x2),_0x150bac=Window_VictoryRewards[_0x21aacf(0x140)],_0x415f3a=Window_VictoryRewards[_0x21aacf(0x208)],_0x2dd8d2=0x50,_0x3b8cbe=_0x327ada-_0x1aecb8-_0x2dd8d2;!ImageManager['victoryRewardBitmap']&&(ImageManager['victoryRewardBitmap']=new Bitmap(_0x327ada,_0x43992d),ImageManager[_0x21aacf(0x1a3)][_0x21aacf(0x189)]=this['translucentOpacity'](),ImageManager[_0x21aacf(0x1a3)]['drawCircle'](_0x1aecb8,_0x1aecb8,_0x1aecb8,_0x150bac),ImageManager['victoryRewardBitmap']['clearRect'](_0x1aecb8,0x0,_0x43992d,_0x43992d),ImageManager[_0x21aacf(0x1a3)][_0x21aacf(0x20c)](_0x1aecb8,0x0,_0x3b8cbe,_0x43992d,_0x150bac),ImageManager[_0x21aacf(0x1a3)][_0x21aacf(0x1a4)](_0x1aecb8+_0x3b8cbe,0x0,_0x2dd8d2,_0x43992d,_0x150bac,_0x415f3a)),this[_0x21aacf(0x142)][_0x21aacf(0x161)](ImageManager[_0x21aacf(0x1a3)],0x0,0x0,_0x327ada,_0x43992d,_0x3a957e,_0x292ce5,_0x327ada,_0x43992d);},Window_VictoryRewards[_0x3001bb(0x13e)][_0x3001bb(0x10f)]=function(){const _0x5e5df3=_0x3001bb;this[_0x5e5df3(0x248)]();if(BattleManager['_rewards'][_0x5e5df3(0x19a)][_0x5e5df3(0x106)]<=0x0)return;const _0x1621e4=this[_0x5e5df3(0x275)](),_0x1737b1=this[_0x5e5df3(0x1bc)](),_0x5c7cfc=_0x1621e4?0x8c:Math[_0x5e5df3(0x235)](this[_0x5e5df3(0xeb)]/0x2+0x28),_0x135848=Math[_0x5e5df3(0x235)](_0x1737b1*0x3),_0x32cc4e=Math[_0x5e5df3(0x235)](this[_0x5e5df3(0xeb)]/0x2-0x8c),_0x399c60=TextManager[_0x5e5df3(0x114)],_0x31b9ce=ColorManager[_0x5e5df3(0x214)]();this[_0x5e5df3(0x1a5)](),this[_0x5e5df3(0x211)](_0x399c60,_0x5c7cfc,_0x135848,_0x32cc4e,_0x5e5df3(0x225));const _0x342eec=_0x1621e4?0x64:Math[_0x5e5df3(0x235)](this[_0x5e5df3(0xeb)]/0x2),_0x256480=_0x135848+_0x1737b1*1.5,_0xf699a9=Math[_0x5e5df3(0x235)](this['width']/0x2)-0x64;this[_0x5e5df3(0x142)][_0x5e5df3(0x20c)](_0x342eec,_0x256480,_0xf699a9,0x2,_0x31b9ce);},Window_VictoryRewards['prototype'][_0x3001bb(0x1fc)]=function(){const _0x3b8b74=_0x3001bb,_0x622ead=this[_0x3b8b74(0x275)](),_0x44dd8e=this[_0x3b8b74(0x1bc)](),_0x30c82e=_0x622ead?0x64:Math[_0x3b8b74(0x235)](this['width']/0x2+0x28),_0x28557c=Math[_0x3b8b74(0x235)](_0x44dd8e*0x5),_0x545f08=Math[_0x3b8b74(0x235)](this[_0x3b8b74(0xeb)]/0x2-0x8c),_0x5a99b5=this[_0x3b8b74(0x24b)]-_0x28557c-_0x44dd8e*0x2,_0x4c6a0e=new Rectangle(_0x30c82e,_0x28557c,_0x545f08,_0x5a99b5);this['_itemGainWindow']=new Window_VictoryItem(_0x4c6a0e,this),this['addChild'](this[_0x3b8b74(0x150)]);},Window_VictoryRewards[_0x3001bb(0x13e)][_0x3001bb(0x116)]=function(){const _0x4bf269=_0x3001bb;this[_0x4bf269(0x248)]();const _0x5ed1a0=this[_0x4bf269(0x275)](),_0x5a3be0=this['lineHeight'](),_0x3b9192=$gameParty['maxBattleMembers'](),_0x552722=_0x5ed1a0?Math[_0x4bf269(0x235)](this['width']/0x2+0x28):0x64,_0x51629c=this[_0x4bf269(0x24b)]-1.5-_0x5a3be0*0x2*(_0x3b9192+0x1),_0x2517bf=Math[_0x4bf269(0x235)](this[_0x4bf269(0xeb)]/0x2-0x8c);let _0x1ae6ee=Math[_0x4bf269(0x235)](_0x51629c);if(VisuMZ[_0x4bf269(0x124)][_0x4bf269(0xf4)][_0x4bf269(0x23c)][_0x4bf269(0x188)]??!![])for(let _0x18729c=0x0;_0x18729c<_0x3b9192;_0x18729c++){if(!$gameParty['members']()[_0x18729c])continue;this[_0x4bf269(0x1cb)](_0x552722,_0x1ae6ee,_0x2517bf),this[_0x4bf269(0x125)](_0x18729c,_0x552722,_0x1ae6ee,_0x2517bf),_0x1ae6ee+=_0x5a3be0*0x2;}},Window_VictoryRewards['ACTOR_STRIP_COLOR_1']=VisuMZ[_0x3001bb(0x124)][_0x3001bb(0xf4)]['General'][_0x3001bb(0x1f9)]??'rgba(0,\x200,\x200,\x201)',Window_VictoryRewards[_0x3001bb(0x13e)][_0x3001bb(0x1cb)]=function(_0x5e428e,_0x162cd9,_0x3e42d0){const _0x13169c=_0x3001bb,_0x421ce6=this[_0x13169c(0x1bc)]()-0x2,_0xf74dca=Math[_0x13169c(0x23b)](_0x421ce6/0x2),_0x14266a=Window_VictoryRewards[_0x13169c(0x1ce)],_0x3a102e=_0x3e42d0-_0x421ce6;!ImageManager[_0x13169c(0x1ed)]&&(ImageManager[_0x13169c(0x1ed)]=new Bitmap(_0x3e42d0,_0x421ce6),ImageManager[_0x13169c(0x1ed)]['paintOpacity']=this['translucentOpacity'](),ImageManager['victoryNameBitmap']['drawCircle'](_0xf74dca,_0xf74dca,_0xf74dca,_0x14266a),ImageManager['victoryNameBitmap'][_0x13169c(0x283)](_0xf74dca+_0x3a102e,_0xf74dca,_0xf74dca,_0x14266a),ImageManager[_0x13169c(0x1ed)][_0x13169c(0xd2)](_0xf74dca,0x0,_0x3a102e,_0x421ce6),ImageManager[_0x13169c(0x1ed)]['fillRect'](_0xf74dca,0x0,_0x3a102e,_0x421ce6,_0x14266a)),this[_0x13169c(0x142)]['blt'](ImageManager[_0x13169c(0x1ed)],0x0,0x0,_0x3e42d0,_0x421ce6,_0x5e428e,_0x162cd9,_0x3e42d0,_0x421ce6);},Window_VictoryRewards[_0x3001bb(0x13e)]['placeActorGauges']=function(_0x3dbcf5,_0x1bca19,_0x9d2c76,_0x4d97fe){const _0x43d7b9=_0x3001bb,_0x277a1e=_0x43d7b9(0xe5)[_0x43d7b9(0x117)](_0x3dbcf5),_0x30aacc=this[_0x43d7b9(0x1fe)](_0x277a1e,_0x3dbcf5,_0x4d97fe);_0x30aacc[_0x43d7b9(0xdc)](_0x1bca19,_0x9d2c76),_0x30aacc[_0x43d7b9(0x149)]();},Window_VictoryRewards[_0x3001bb(0x13e)][_0x3001bb(0x1fe)]=function(_0x19a409,_0x5cdd1d,_0x5c125a){const _0x39859c=_0x3001bb,_0x26a3bf=this['_additionalSprites'];if(_0x26a3bf[_0x19a409])return _0x26a3bf[_0x19a409];else{const _0x2b1f9e=new Sprite_VictoryGauge(_0x5cdd1d,this,_0x5c125a);return _0x26a3bf[_0x19a409]=_0x2b1f9e,this[_0x39859c(0x136)](_0x2b1f9e),_0x2b1f9e;}};function Window_VictoryItem(){this['initialize'](...arguments);}function _0x1394(){const _0x1525de=['ExtDisplayedParams','drawText','isVictoryPhase','removeVictoryLevelUpBuffer','normalColor','GroupDigits','isCollapsing','clear','Text','setActor','isEnabled','isFastForwarded','textColor','_victoryAftermathLevelUpQuotes','createVictoryLevelUpWindow','getQuoteText','29966030AkoJsz','NUM','update','changeTextColor','MessageWidth','left','ShowBust','scale','right','done','drawLevelMessage','center','removeBattleStates','sort','victoryAftermathSettings','ClassChangeSystem','name','_autoBattle','getColorDataFromPluginParameters','BustScale','_victorySteps','round','isVictoryContinueReady','rgba(0,\x200,\x200,\x200)','classPointsAbbr','DigitGroupingStandardText','drawBackgroundElements','floor','General','bypassVictoryMusic','shouldDisplayLevelUp','level','_drawParamDiff','getAdditionalRewardsText','registerCommand','setup','drawRewardStrip','makeTempActors','beforeActor','BattleManager_initMembers','resetFontSettings','gaugeBackColor','allowUpdateBattleAniSpeed','height','drawRewards','bypassVictoryPhase','ShowParamDiff','drawActorLevel','rewards','isBypassVictoryAftermathMusic','nextVictoryLevelUpActor','getQuoteWidth','isRepeated','VisuMZ_3_BattleVoices','index','setupVictoryAftermathQuotes','Game_Actor_isBattleMember','ARRAYSTR','bitmap','VisuMZ_2_SkillLearnSystem','earnedJobPoints','BustPosY','playVictoryLevelUpSFX','victoryLevelUpColor','getMenuImage','skipVictoryAftermathTransition','SkillPoints','_victoryLevelUpBuffer','drawActorFace','playBattleVoice','VisuMZ_1_OptionsCore','_spriteset','_scene','powerUpColor','_data','isActor','createVictorySteps','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','PostBattleBgs','NewSkill','_actorId','loadPicture','processVictoryStep','nextLevelExp','drawItemNumber','mirrorContents','drawNewLearnedSkills','_tempActorExpGain','changeExp','VisuMZ_3_VisualGaugeStyles','HideLevelDiff','setDelayDuration','drawItemName','quoteLevelUp','_victoryLevelUpSFX','victoryNewSkillFmt','fontSize','94kjLlBc','actorParams','drawCircle','inBattle','initVictoryAftermath','isBusy','isBypassVictoryAftermathPhase','description','ShowFace','pitch','addChild','_index','exp','59647UkRpRI','padding','ClassPoints','localeCompare','BustPosX','bind','_subWindow','SystemBypassVictoryMotion','itemHeight','clearRect','Rewards','(+%1)','earnedSkillPoints','_rewardSets','quoteLevelSkill','LvUpPitch','UpdateDuration','getInputButtonString','drawActorAdditionalRewards','move','processVictoryAftermath','maxCols','classPointsFull','bgColor1','gainTempExp','rgba(0,\x200,\x200,\x200.8)','_victoryAftermathSettings','contentsOpacity','actor%1-gauge','drawNewLearnedSkillsBackground','drawItemDarkRect','drawParamDiffValue','Game_Actor_setup','_victoryActorIndex','width','PostBattleBgm','DrawBackRect','MaxSkills','isSceneBattle','newSkillQuotes','LevelUpQuotes','drawExpGauge','isShowNew','Settings','drawNewLearnedSkillsList','Game_Actor_shouldDisplayLevelUp','VisuMZ_3_VisualGoldDisplay','victory-level-up-color','HideDelayMS','VisuMZ_0_CoreEngine','Enable','makeVictoryCopy','itemCount','getVictoryAftermathBackColor','Bgm','includes','victoryDisplayLvFmt','setBackgroundType','createVictoryStepRewards','isBypassVictoryAftermathMotion','JSON','length','hideSubInputWindows','shift','arrow','gaugeColor2','skillPointsFull','ItemsEquipsCore','refresh','738085pGCvvT','drawItemGainTitle','_rewards','ActorQuotesLevelUpClear','LvUpColor','isArmor','victoryDisplayItem','victoryFullScreenWindowRect','drawPartyExpGauges','format','parameters','_showFace','_mainWindow','findNewSkills','itemPadding','measureTextWidth','jobPointsFull','x%1','ShowDelayMS','BattleManager_isBusy','AftermathText','param','VictoryAftermath','placeActorGauges','SystemBypassVictoryPhase','opacity','pan','KeyOK','call','MessageCore','indexOf','1951044SgtoEy','ARRAYFUNC','isMaxLevel','updateVictoryPhase','createVictoryRewardsWindow','_victoryLevelUpWindow','_victoryRewardsWindow','VisuMZ_1_MessageCore','levelUp','addInnerChild','victoryContinueMessageWindowRect','processPostBattleCommonEvents','paramchangeTextColor','Victory','faceHeight','closeCommandWindows','_victoryWindows','prototype','_victoryTempActorsB','REWARD_STRIP_COLOR_1','currentLevelExp','contents','replayBgmAndBgs','drawVisualStyleGauge','gaugeHeight','WaitBossCollapse','toUpperCase','setVisibleUI','show','_fullWidth','_victoryUpdateDuration','currentExp','victoryDisplayTitle','_actorSprite','isContinueReady','_itemGainWindow','20KleVSk','volume','initialize','isBattleMember','SORT_TYPE','levelUpQuotes','sortItemList','ARRAYSTRUCT','afterActor','processVictoryAftermathMusic','cancel','parse','NewQuotes','_victoryPhase','#%1','toLowerCase','blt','abilityPointsAbbr','ContinueFmt','gaugeColor1','Bypass','finishVictoryPhase','DropsSortBy','levelups','processVictory','members','Scene_Battle_allowUpdateBattleAniSpeed','_colorCache','max','_phase','rgba(0,\x200,\x200,\x201)','_actor','816JyvxCB','faceWidth','some','map','setupVictoryLevelUpNextActor','randomInt','_victoryTempActorsA','makeDeepCopy','EVAL','hideWindowsForVictoryAftermath','mainFontFace','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','processVictoryAftermathParty','loadFaceImages','createVictoryStepLevelUps','4834488SJgIIb','_effectType','updateOpacity','_delayDuration','drawParamBeforeValue','_victoryAftermathCopy','bossCollapse','VisuMZ_1_BattleCore','ShowExpGauges','paintOpacity','drawParamChanges','getColor','ItemScene','createBitmap','paramValueFontSize','drawItemBackground','_opacitySpeed','LvUpVolume','processVictoryAftermathTransition','createVictoryContinueMessageWindow','Game_System_initialize','exit','Data','MAX\x20LEVEL','_statusWindow','VisuMZ_1_ItemsEquipsCore','items','skillPointsAbbr','ActorQuotesNewSkillAdd','RewardItems','victoryKeyOk','checkVictoryAftermathAutoBattleAutoSkip','VisualGaugeStyles','WaitRegularCollapse','BattleVictoryLevelUp','victoryRewardBitmap','gradientFillRect','makeFontBigger','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','trim','updateExpGain','Show','Vocab','_mapBgm','push','onVictoryStepLevelUpMember','drawExpValues','actor','updateContentsOpacity','anchor','createSubWindow','_victoryContinueWindow','ActorQuotesNewSkillClear','match','fontFace','LevelUp','2578815CmdCcr','LvUp','AutoBattleAutoSkip','_autoBattleVictorySkip','lineHeight','AbilityPoints','drawLevelUpQuote','isVictoryLevelUpPhaseEnabled','maxLvGaugeColor2','LvFmt','split','textSizeEx','ActorID','updateVictorySteps','victoryDisplayLvUp','maxVisibleItems','BG_COLOR_2','drawParamAfterValue','_currentlevel','drawActorNameStrip','expRate','drawActorName','ACTOR_STRIP_COLOR_1','activate','playVictoryMe','playVictoryBgm','FUNC','BG_COLOR_1','Template','_showBust','drawCurrencyValue','STRUCT','isItem','create','endBattle','expGaugeColor1','CoreEngine','performVictory','concat','createActorSprite','updatePadding','JobPoints','_victoryAftermathNewSkillQuotes','drawParamName','LvUpPan','earnedClassPoints','constructor','addChildToBack','isPressed','initMembers','expGaugeColor2','jobPointsAbbr','filter','victoryNameBitmap','_victoryBgm','paramValueByName','BattleVictoryJS','systemColor','ARRAYJSON','_victoryStep','_duration','drawTextEx','_showLevelUp','min','makeItemList','rewardStrip1','processBattleCoreJS','MirrorContents','makeItemGainWindow','processVictoryAftermathRewards','createGaugeSprite','ConvertParams','ARRAYNUM','collapse','Scene_Battle_update','victoryContinueFmt','status','FadeInSpeed','victoryKeyCancel','AftermathActorDisplay','REWARD_STRIP_COLOR_2','14437Gzyetg','LvUpSfx','currencyUnit','fillRect','bypassVictoryMotion','NewSkillQuotes','createVictoryAftermathWindows'];_0x1394=function(){return _0x1525de;};return _0x1394();}Window_VictoryItem[_0x3001bb(0x13e)]=Object[_0x3001bb(0x1d9)](Window_ItemList[_0x3001bb(0x13e)]),Window_VictoryItem[_0x3001bb(0x13e)][_0x3001bb(0x1e6)]=Window_VictoryItem,Window_VictoryItem['SORT_TYPE']=VisuMZ[_0x3001bb(0x124)][_0x3001bb(0xf4)][_0x3001bb(0x23c)][_0x3001bb(0x167)]??'ID',Window_VictoryItem[_0x3001bb(0x13e)][_0x3001bb(0x153)]=function(_0x44dbea,_0x4320ec){const _0x113786=_0x3001bb;this[_0x113786(0x11a)]=_0x4320ec,Window_ItemList[_0x113786(0x13e)][_0x113786(0x153)]['call'](this,_0x44dbea),this['setBackgroundType'](0x2),this['refresh'](),this[_0x113786(0x1b0)](),this[_0x113786(0x26a)][_0x113786(0x106)]>this[_0x113786(0x1c7)]()&&(this[_0x113786(0x1cf)](),this['select'](0x0));},Window_VictoryItem[_0x3001bb(0x13e)][_0x3001bb(0xd1)]=function(){const _0x8b6a60=_0x3001bb;return Window_Base[_0x8b6a60(0x13e)][_0x8b6a60(0xd1)][_0x8b6a60(0x12a)](this);},Window_VictoryItem[_0x3001bb(0x13e)][_0x3001bb(0x1e0)]=function(){this['padding']=0x0;},Window_VictoryItem[_0x3001bb(0x13e)][_0x3001bb(0xde)]=function(){return 0x1;},Window_VictoryItem[_0x3001bb(0x13e)]['colSpacing']=function(){return 0x0;},Window_VictoryItem[_0x3001bb(0x13e)][_0x3001bb(0x222)]=function(){const _0x3754b6=_0x3001bb;Window_ItemList[_0x3754b6(0x13e)][_0x3754b6(0x222)][_0x3754b6(0x12a)](this),this[_0x3754b6(0x1b0)]();},Window_VictoryItem[_0x3001bb(0x13e)][_0x3001bb(0x1b0)]=function(){const _0x3ded4b=_0x3001bb;this['contentsOpacity']=this['_mainWindow'][_0x3ded4b(0xe4)];},Window_VictoryItem[_0x3001bb(0x13e)][_0x3001bb(0x1f8)]=function(){const _0x5d64be=_0x3001bb,_0x3171b7=BattleManager[_0x5d64be(0x110)][_0x5d64be(0x19a)];_0x3171b7[_0x5d64be(0x22d)]((_0x42a724,_0x479eb1)=>_0x42a724['id']-_0x479eb1['id']);const _0x1a78ec=_0x3171b7[_0x5d64be(0x1ec)](_0x2ee918=>DataManager[_0x5d64be(0x1d8)](_0x2ee918)),_0x44a138=_0x3171b7[_0x5d64be(0x1ec)](_0x24a0e6=>DataManager['isWeapon'](_0x24a0e6)),_0x196eff=_0x3171b7[_0x5d64be(0x1ec)](_0x34c0d6=>DataManager[_0x5d64be(0x113)](_0x34c0d6));this[_0x5d64be(0x26a)]=_0x1a78ec[_0x5d64be(0x1de)](_0x44a138)[_0x5d64be(0x1de)](_0x196eff),this[_0x5d64be(0x26a)]=this[_0x5d64be(0x26a)]['filter']((_0x5f1dd4,_0x1f61cd,_0xe0d2dc)=>_0xe0d2dc[_0x5d64be(0x12c)](_0x5f1dd4)===_0x1f61cd),this[_0x5d64be(0x157)]();},Window_VictoryItem[_0x3001bb(0x13e)][_0x3001bb(0x157)]=function(){const _0x9f20a2=_0x3001bb,_0x502de9=Window_VictoryItem[_0x9f20a2(0x155)][_0x9f20a2(0x160)]()[_0x9f20a2(0x1a7)]();if(_0x502de9==='name'&&this[_0x9f20a2(0x26a)][_0x9f20a2(0x106)]>0x0)return this['_data'][_0x9f20a2(0x22d)]((_0x6fe5e8,_0x138434)=>_0x6fe5e8['name'][_0x9f20a2(0xcc)](_0x138434[_0x9f20a2(0x230)]));},Window_VictoryItem[_0x3001bb(0x13e)][_0x3001bb(0x21a)]=function(_0x49cb55){return!![];},Window_VictoryItem[_0x3001bb(0x13e)][_0x3001bb(0xf3)]=function(){return![];},Window_VictoryItem[_0x3001bb(0x13e)][_0x3001bb(0xfd)]=function(_0x13a219){const _0x1e5742=_0x3001bb;return BattleManager[_0x1e5742(0x110)][_0x1e5742(0x19a)][_0x1e5742(0x1ec)](_0x5b5e9f=>_0x5b5e9f===_0x13a219)[_0x1e5742(0x106)];},Window_VictoryItem[_0x3001bb(0x13e)][_0x3001bb(0x18f)]=function(_0x21c69f){},Window_VictoryItem[_0x3001bb(0x13e)][_0x3001bb(0x274)]=function(_0x2b926b,_0x8a3a15,_0x54e2ab,_0x26acc3){const _0x613974=_0x3001bb;let _0x3af488=_0x613974(0x11f);Imported[_0x613974(0x199)]&&(_0x3af488=VisuMZ['ItemsEquipsCore']['Settings'][_0x613974(0x18c)]['ItemQuantityFmt']);let _0x53e641=_0x3af488['format'](this['itemCount'](_0x2b926b));this[_0x613974(0x211)](_0x53e641,_0x8a3a15,_0x54e2ab,_0x26acc3,_0x613974(0x228));};function Window_VictoryLevelUp(){const _0x4651c4=_0x3001bb;this[_0x4651c4(0x153)](...arguments);}Window_VictoryLevelUp[_0x3001bb(0x190)]=Window_VictoryRewards[_0x3001bb(0x190)],Window_VictoryLevelUp[_0x3001bb(0x1d5)]=VisuMZ[_0x3001bb(0x124)]['Settings']['LevelUp'][_0x3001bb(0x226)],Window_VictoryLevelUp[_0x3001bb(0x13e)]=Object[_0x3001bb(0x1d9)](Window_StatusBase[_0x3001bb(0x13e)]),Window_VictoryLevelUp[_0x3001bb(0x13e)][_0x3001bb(0x1e6)]=Window_VictoryLevelUp,Window_VictoryLevelUp[_0x3001bb(0x13e)][_0x3001bb(0x153)]=function(_0x2940d6){const _0x913899=_0x3001bb;Window_StatusBase[_0x913899(0x13e)]['initialize'][_0x913899(0x12a)](this,_0x2940d6),this[_0x913899(0x102)](0x2),this['contentsOpacity']=0x0,this[_0x913899(0x10d)](),this[_0x913899(0x1df)](),this[_0x913899(0x1b2)]();},Window_VictoryLevelUp[_0x3001bb(0x13e)][_0x3001bb(0x1e0)]=function(){const _0xf1ce3f=_0x3001bb;this[_0xf1ce3f(0xca)]=0x0;},Window_VictoryLevelUp[_0x3001bb(0x13e)][_0x3001bb(0x222)]=function(){const _0x877081=_0x3001bb;Window_StatusBase[_0x877081(0x13e)][_0x877081(0x222)][_0x877081(0x12a)](this),this[_0x877081(0x1b0)]();},Window_VictoryLevelUp[_0x3001bb(0x13e)][_0x3001bb(0x1b0)]=function(){const _0x36a670=_0x3001bb;SceneManager[_0x36a670(0x268)][_0x36a670(0x1f3)]===_0x36a670(0x168)?this[_0x36a670(0xe4)]+=Window_VictoryLevelUp[_0x36a670(0x190)]:this[_0x36a670(0xe4)]-=Window_VictoryLevelUp[_0x36a670(0x190)],this[_0x36a670(0x14e)]&&(this['_actorSprite'][_0x36a670(0x127)]=this[_0x36a670(0xe4)]);},Window_VictoryLevelUp[_0x3001bb(0x13e)]['refresh']=function(){const _0x4cd2f5=_0x3001bb;Window_StatusBase[_0x4cd2f5(0x13e)][_0x4cd2f5(0x10d)][_0x4cd2f5(0x12a)](this),this[_0x4cd2f5(0x142)][_0x4cd2f5(0x217)](),this[_0x4cd2f5(0x248)](),this[_0x4cd2f5(0x23a)]();},Window_VictoryLevelUp[_0x3001bb(0x13e)][_0x3001bb(0x23a)]=function(){const _0x3a7e30=_0x3001bb,_0x234929=this[_0x3a7e30(0x1bc)](),_0x1fdbe2=Window_VictoryRewards[_0x3a7e30(0x1d3)],_0x2d8f18=Window_VictoryRewards['BG_COLOR_2'],_0x53d71f=ColorManager[_0x3a7e30(0x214)](),_0x98e4c7=SceneManager[_0x3a7e30(0x268)][_0x3a7e30(0x1b3)]['x'],_0x3acebc=Math[_0x3a7e30(0x235)](this[_0x3a7e30(0xeb)]/0x2);this['contents']['gradientFillRect'](_0x98e4c7,0x0,_0x3acebc,this['height'],_0x2d8f18,_0x1fdbe2,!![]),this['contents'][_0x3a7e30(0x20c)](_0x98e4c7-0x1,0x0,0x2,this[_0x3a7e30(0x24b)],_0x53d71f),this['contents'][_0x3a7e30(0x20c)](_0x98e4c7+_0x3acebc-0x1,0x0,0x2,this[_0x3a7e30(0x24b)],_0x53d71f);const _0x3d9728=_0x234929,_0x47ae1f=_0x234929*0x1;this['contents'][_0x3a7e30(0x1a4)](0x0,_0x3d9728,this['width'],_0x47ae1f,_0x1fdbe2,_0x2d8f18),this[_0x3a7e30(0x142)][_0x3a7e30(0x20c)](0x0,_0x3d9728-0x1,this[_0x3a7e30(0xeb)],0x2,_0x53d71f),this['contents'][_0x3a7e30(0x20c)](0x0,_0x3d9728+_0x47ae1f-0x1,this[_0x3a7e30(0xeb)],0x2,_0x53d71f);const _0x2d81d1=this[_0x3a7e30(0x24b)]-_0x234929*5.5,_0x572e99=_0x234929*0x4;this['contents'][_0x3a7e30(0x1a4)](0x0,_0x2d81d1,this['width'],_0x572e99,_0x1fdbe2,_0x2d8f18),this[_0x3a7e30(0x142)][_0x3a7e30(0x1a4)](0x0,_0x2d81d1,this['width'],_0x572e99,_0x2d8f18,_0x1fdbe2),this[_0x3a7e30(0x142)][_0x3a7e30(0x20c)](0x0,_0x2d81d1-0x2,this[_0x3a7e30(0xeb)],0x2,_0x53d71f),this[_0x3a7e30(0x142)]['fillRect'](0x0,_0x2d81d1+_0x572e99,this[_0x3a7e30(0xeb)],0x2,_0x53d71f);},Window_VictoryLevelUp[_0x3001bb(0x13e)][_0x3001bb(0x1df)]=function(){const _0x57aad4=_0x3001bb,_0x4ed923=VisuMZ[_0x57aad4(0x124)][_0x57aad4(0xf4)][_0x57aad4(0x1b7)];this[_0x57aad4(0x14e)]=new Sprite(),this[_0x57aad4(0x14e)][_0x57aad4(0x1b1)]['x']=0.5,this['_actorSprite']['anchor']['y']=0x1,this[_0x57aad4(0x14e)][_0x57aad4(0x127)]=0x0,this[_0x57aad4(0x14e)]['x']=Math['round'](eval(_0x4ed923[_0x57aad4(0xcd)])),this[_0x57aad4(0x14e)]['y']=Math[_0x57aad4(0x235)](eval(_0x4ed923[_0x57aad4(0x25d)])),this[_0x57aad4(0x14e)][_0x57aad4(0x227)]['x']=_0x4ed923[_0x57aad4(0x233)],this[_0x57aad4(0x14e)][_0x57aad4(0x227)]['y']=_0x4ed923[_0x57aad4(0x233)],this[_0x57aad4(0x1e7)](this[_0x57aad4(0x14e)]);},Window_VictoryLevelUp[_0x3001bb(0x13e)][_0x3001bb(0x1b2)]=function(){const _0x49a7bc=_0x3001bb,_0x2d7012=new Rectangle(0x0,0x0,this['width'],this[_0x49a7bc(0x24b)]);this[_0x49a7bc(0xcf)]=new Window_VictoryLevelUpActor(_0x2d7012,this),this[_0x49a7bc(0x28b)](this['_subWindow']);},Window_VictoryLevelUp[_0x3001bb(0x13e)][_0x3001bb(0x219)]=function(_0x2015f1){const _0x9d66bd=_0x3001bb;Imported['VisuMZ_1_MainMenuCore']&&Window_VictoryLevelUp[_0x9d66bd(0x1d5)]&&(this[_0x9d66bd(0x14e)]['bitmap']=ImageManager[_0x9d66bd(0x271)](_0x2015f1[_0x9d66bd(0x260)]())),SoundManager[_0x9d66bd(0x25e)](),this[_0x9d66bd(0xcf)]['setActor'](_0x2015f1);};function Window_VictoryLevelUpActor(){const _0x244ab5=_0x3001bb;this[_0x244ab5(0x153)](...arguments);}Window_VictoryLevelUpActor[_0x3001bb(0x190)]=Window_VictoryRewards['_opacitySpeed'],Window_VictoryLevelUpActor[_0x3001bb(0x240)]=VisuMZ[_0x3001bb(0x124)][_0x3001bb(0xf4)][_0x3001bb(0x1b7)][_0x3001bb(0x24e)],Window_VictoryLevelUpActor[_0x3001bb(0x119)]=VisuMZ['VictoryAftermath']['Settings']['LevelUp'][_0x3001bb(0x289)],Window_VictoryLevelUpActor['prototype']=Object[_0x3001bb(0x1d9)](Window_StatusBase[_0x3001bb(0x13e)]),Window_VictoryLevelUpActor[_0x3001bb(0x13e)][_0x3001bb(0x1e6)]=Window_VictoryLevelUpActor,Window_VictoryLevelUpActor[_0x3001bb(0x13e)][_0x3001bb(0x153)]=function(_0x3d7d23,_0x212f40){const _0xc1dfd5=_0x3001bb;this[_0xc1dfd5(0x11a)]=_0x212f40,Window_StatusBase[_0xc1dfd5(0x13e)][_0xc1dfd5(0x153)][_0xc1dfd5(0x12a)](this,_0x3d7d23),this['setBackgroundType'](0x2),this[_0xc1dfd5(0xe4)]=0x0,this[_0xc1dfd5(0x170)]=null,this[_0xc1dfd5(0x10d)]();},Window_VictoryLevelUpActor['prototype']['updatePadding']=function(){this['padding']=0x0;},Window_VictoryLevelUpActor[_0x3001bb(0x13e)]['update']=function(){const _0x2c36a3=_0x3001bb;Window_StatusBase[_0x2c36a3(0x13e)][_0x2c36a3(0x222)]['call'](this),this[_0x2c36a3(0x1b0)]();},Window_VictoryLevelUpActor['prototype'][_0x3001bb(0x1b0)]=function(){const _0xe1245f=_0x3001bb;this[_0xe1245f(0xe4)]=this[_0xe1245f(0x11a)]['contentsOpacity'];},Window_VictoryLevelUpActor[_0x3001bb(0x13e)][_0x3001bb(0x219)]=function(_0x11246d){this['_actor']=_0x11246d,this['refresh']();},Window_VictoryLevelUpActor[_0x3001bb(0x13e)][_0x3001bb(0x246)]=function(){const _0x2f1b5d=_0x3001bb,_0x4b0cef=this[_0x2f1b5d(0x170)][_0x2f1b5d(0x256)]();return BattleManager[_0x2f1b5d(0x13f)][_0x4b0cef];},Window_VictoryLevelUpActor[_0x3001bb(0x13e)][_0x3001bb(0x159)]=function(){const _0x273357=_0x3001bb,_0x30a177=this[_0x273357(0x170)][_0x273357(0x256)]();return BattleManager[_0x273357(0x177)][_0x30a177];},Window_VictoryLevelUpActor[_0x3001bb(0x13e)][_0x3001bb(0x10d)]=function(){const _0x323ceb=_0x3001bb;Window_StatusBase[_0x323ceb(0x13e)][_0x323ceb(0x10d)][_0x323ceb(0x12a)](this),this['contents'][_0x323ceb(0x217)](),this[_0x323ceb(0x248)]();if(!this['_actor'])return;this['drawLevelMessage'](),this[_0x323ceb(0x18a)](),this[_0x323ceb(0x276)](),this[_0x323ceb(0x1be)]();},Window_VictoryLevelUpActor[_0x3001bb(0x13e)][_0x3001bb(0x22a)]=function(){const _0x4f4678=_0x3001bb,_0x851424=this[_0x4f4678(0x1bc)](),_0x1059d0=TextManager[_0x4f4678(0x135)][_0x4f4678(0x117)](this[_0x4f4678(0x170)][_0x4f4678(0x230)](),TextManager[_0x4f4678(0x23f)],this['_actor'][_0x4f4678(0x23f)]),_0xb9a1a6=this[_0x4f4678(0x1c3)](_0x1059d0)[_0x4f4678(0xeb)],_0x593329=SceneManager[_0x4f4678(0x268)][_0x4f4678(0x1b3)]['x']+Math['round']((this[_0x4f4678(0xeb)]/0x2-_0xb9a1a6)/0x2),_0x1d9f54=_0x851424;this[_0x4f4678(0x1f5)](_0x1059d0,_0x593329,_0x1d9f54,_0xb9a1a6);},Window_VictoryLevelUpActor['prototype'][_0x3001bb(0xe7)]=function(_0x21f07c,_0x4ec44b,_0x1fb9df,_0x291af0,_0x37b079){const _0x521f0d=_0x3001bb;if(VisuMZ[_0x521f0d(0x124)][_0x521f0d(0xf4)][_0x521f0d(0x1b7)][_0x521f0d(0xed)]===![])return;_0x37b079=Math[_0x521f0d(0x16d)](_0x37b079||0x1,0x1);while(_0x37b079--){_0x291af0=_0x291af0||this[_0x521f0d(0x1bc)](),this['contents'][_0x521f0d(0x189)]=0xa0;const _0x421bac=ColorManager[_0x521f0d(0xfe)]();this[_0x521f0d(0x142)][_0x521f0d(0x20c)](_0x21f07c+0x1,_0x4ec44b+0x1,_0x1fb9df-0x2,_0x291af0-0x2,_0x421bac),this[_0x521f0d(0x142)]['paintOpacity']=0xff;}},ColorManager[_0x3001bb(0xfe)]=function(){const _0x290ced=_0x3001bb,_0x356670=VisuMZ[_0x290ced(0x124)][_0x290ced(0xf4)][_0x290ced(0x1b7)];let _0x5cd231=_0x356670['BackRectColor']!==undefined?_0x356670['BackRectColor']:0x13;return ColorManager[_0x290ced(0x18b)](_0x5cd231);},Window_VictoryLevelUpActor['prototype'][_0x3001bb(0x18a)]=function(){const _0x5ca4fa=_0x3001bb,_0x322b0d=this[_0x5ca4fa(0x1bc)](),_0x599e4e='→',_0x1908c7=this[_0x5ca4fa(0x282)](),_0x1e1903=_0x322b0d*0x2,_0x24b551=this['height']-_0x322b0d*5.5,_0x4b29cc=this['textWidth'](_0x599e4e)+this['itemPadding']()*0x2,_0x3b1d36=Window_VictoryLevelUpActor[_0x5ca4fa(0x240)]?0x4:0x3,_0x59ecd1=Math[_0x5ca4fa(0x235)]((this['width']/0x2-_0x4b29cc-this[_0x5ca4fa(0x11c)]()*0x2)/_0x3b1d36),_0xbc47f3=_0x24b551-_0x1e1903,_0x2ae5b2=VisuMZ['VictoryAftermath'][_0x5ca4fa(0xf4)][_0x5ca4fa(0x1b7)][_0x5ca4fa(0x27a)],_0x2aaac0=SceneManager[_0x5ca4fa(0x268)]['_victoryContinueWindow']['x']+this[_0x5ca4fa(0x11c)](),_0x186e77=_0x2aaac0+_0x59ecd1,_0x5a245b=_0x186e77+_0x59ecd1,_0x4b4c87=_0x5a245b+_0x4b29cc,_0x2380f5=_0x4b4c87+_0x59ecd1;let _0x423279=Math[_0x5ca4fa(0x235)](_0x1e1903+(_0xbc47f3-(_0x1908c7['length']+(_0x2ae5b2?0x0:0x1))*_0x322b0d)/0x2),_0x543934=0x2;!_0x2ae5b2&&(this[_0x5ca4fa(0x248)](),VisuMZ[_0x5ca4fa(0x10c)]&&(this['contents']['fontSize']=Window_EquipStatus['prototype'][_0x5ca4fa(0x18e)]()),this[_0x5ca4fa(0xe7)](_0x2aaac0,_0x423279,_0x59ecd1,_0x322b0d,_0x543934),this[_0x5ca4fa(0x1e3)]('level',_0x2aaac0,_0x423279,_0x59ecd1),this[_0x5ca4fa(0xe7)](_0x186e77,_0x423279,_0x59ecd1,_0x322b0d,_0x543934),this[_0x5ca4fa(0x184)](_0x5ca4fa(0x23f),_0x186e77,_0x423279,_0x59ecd1),this[_0x5ca4fa(0xe7)](_0x5a245b,_0x423279,_0x4b29cc,_0x322b0d,_0x543934),this[_0x5ca4fa(0x223)](ColorManager['systemColor']()),this[_0x5ca4fa(0x211)](_0x599e4e,_0x5a245b,_0x423279,_0x4b29cc,'center'),this['drawItemDarkRect'](_0x4b4c87,_0x423279,_0x59ecd1,_0x322b0d,_0x543934),this[_0x5ca4fa(0x1c9)](_0x5ca4fa(0x23f),_0x4b4c87,_0x423279,_0x59ecd1),Window_VictoryLevelUpActor[_0x5ca4fa(0x240)]&&(this[_0x5ca4fa(0xe7)](_0x2380f5,_0x423279,_0x59ecd1,_0x322b0d,_0x543934),this[_0x5ca4fa(0xe8)]('level',_0x2380f5,_0x423279,_0x59ecd1)),_0x423279+=_0x322b0d,_0x543934=_0x543934===0x2?0x1:0x2);for(const _0x3eced9 of _0x1908c7){this[_0x5ca4fa(0x248)](),VisuMZ[_0x5ca4fa(0x10c)]&&(this[_0x5ca4fa(0x142)][_0x5ca4fa(0x280)]=Window_EquipStatus[_0x5ca4fa(0x13e)]['paramValueFontSize']()),this[_0x5ca4fa(0xe7)](_0x2aaac0,_0x423279,_0x59ecd1,_0x322b0d,_0x543934),this[_0x5ca4fa(0x1e3)](_0x3eced9,_0x2aaac0,_0x423279,_0x59ecd1),this[_0x5ca4fa(0xe7)](_0x186e77,_0x423279,_0x59ecd1,_0x322b0d,_0x543934),this['drawParamBeforeValue'](_0x3eced9,_0x186e77,_0x423279,_0x59ecd1),this[_0x5ca4fa(0xe7)](_0x5a245b,_0x423279,_0x4b29cc,_0x322b0d,_0x543934),this[_0x5ca4fa(0x223)](ColorManager[_0x5ca4fa(0x1f1)]()),this[_0x5ca4fa(0x211)](_0x599e4e,_0x5a245b,_0x423279,_0x4b29cc,_0x5ca4fa(0x22b)),this[_0x5ca4fa(0xe7)](_0x4b4c87,_0x423279,_0x59ecd1,_0x322b0d,_0x543934),this[_0x5ca4fa(0x1c9)](_0x3eced9,_0x4b4c87,_0x423279,_0x59ecd1),Window_VictoryLevelUpActor[_0x5ca4fa(0x240)]&&(this[_0x5ca4fa(0xe7)](_0x2380f5,_0x423279,_0x59ecd1,_0x322b0d,_0x543934),this[_0x5ca4fa(0xe8)](_0x3eced9,_0x2380f5,_0x423279,_0x59ecd1)),_0x423279+=_0x322b0d,_0x543934=_0x543934===0x2?0x1:0x2;}},Window_VictoryLevelUpActor['prototype']['actorParams']=function(){const _0x3b2b9b=_0x3001bb;return Imported[_0x3b2b9b(0xfa)]?VisuMZ[_0x3b2b9b(0x1dc)]['Settings']['Param'][_0x3b2b9b(0x210)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_VictoryLevelUpActor[_0x3001bb(0x13e)][_0x3001bb(0x1e3)]=function(_0x287cb5,_0x238fe0,_0x4332b7,_0x18c78b){const _0x5970d2=_0x3001bb;this[_0x5970d2(0x223)](ColorManager[_0x5970d2(0x1f1)]());let _0xc598ac='';_0x287cb5==='level'?_0xc598ac=TextManager[_0x5970d2(0x23f)]:_0xc598ac=TextManager[_0x5970d2(0x123)](_0x287cb5),this[_0x5970d2(0x211)](_0xc598ac,_0x238fe0+this[_0x5970d2(0x11c)](),_0x4332b7,_0x18c78b-this[_0x5970d2(0x11c)]()*0x2);},Window_VictoryLevelUpActor[_0x3001bb(0x13e)]['drawParamBeforeValue']=function(_0x1213f7,_0x276f81,_0xc42943,_0x2d9d91){const _0x52b6ff=_0x3001bb,_0x1be74b=this[_0x52b6ff(0x246)]();let _0x5506c8='';_0x1213f7===_0x52b6ff(0x23f)?_0x5506c8=_0x1be74b[_0x52b6ff(0x23f)]:_0x5506c8=Imported[_0x52b6ff(0xfa)]?_0x1be74b[_0x52b6ff(0x1ef)](_0x1213f7,!![]):_0x1be74b[_0x52b6ff(0x123)](_0x1213f7),this['changeTextColor'](ColorManager[_0x52b6ff(0x214)]()),this[_0x52b6ff(0x211)](_0x5506c8,_0x276f81+this[_0x52b6ff(0x11c)](),_0xc42943,_0x2d9d91-this[_0x52b6ff(0x11c)]()*0x2,_0x52b6ff(0x228));},Window_VictoryLevelUpActor[_0x3001bb(0x13e)][_0x3001bb(0x1c9)]=function(_0x448df7,_0x235b62,_0x2d8ad4,_0x4c4adc){const _0x78d297=_0x3001bb,_0x2ab610=this[_0x78d297(0x246)](),_0x4863e3=this[_0x78d297(0x170)];let _0x29ec0a=0x0,_0x540890=0x0,_0x5248d9='0';_0x448df7===_0x78d297(0x23f)?(_0x29ec0a=_0x2ab610[_0x78d297(0x23f)],_0x540890=_0x4863e3[_0x78d297(0x23f)],_0x5248d9=_0x540890):(_0x29ec0a=Imported[_0x78d297(0xfa)]?_0x2ab610[_0x78d297(0x1ef)](_0x448df7,![]):_0x2ab610[_0x78d297(0x123)](_0x448df7),_0x540890=Imported[_0x78d297(0xfa)]?_0x4863e3['paramValueByName'](_0x448df7,![]):_0x4863e3['param'](_0x448df7),_0x5248d9=Imported[_0x78d297(0xfa)]?_0x4863e3[_0x78d297(0x1ef)](_0x448df7,!![]):_0x540890);const _0x806f67=_0x540890-_0x29ec0a;this[_0x78d297(0x223)](ColorManager['paramchangeTextColor'](_0x806f67)),this[_0x78d297(0x211)](_0x5248d9,_0x235b62+this['itemPadding'](),_0x2d8ad4,_0x4c4adc-this[_0x78d297(0x11c)]()*0x2,_0x78d297(0x228));},Window_VictoryLevelUpActor['prototype'][_0x3001bb(0xe8)]=function(_0x778dac,_0x10c009,_0x15c5a6,_0x1838b7){const _0x311e9a=_0x3001bb,_0x53b35b=this['beforeActor'](),_0x27551a=this[_0x311e9a(0x170)];let _0x4dd02b=0x0,_0x58ba79=0x0;_0x778dac===_0x311e9a(0x23f)?(_0x4dd02b=_0x53b35b[_0x311e9a(0x23f)],_0x58ba79=_0x27551a['level']):(_0x4dd02b=Imported[_0x311e9a(0xfa)]?_0x53b35b['paramValueByName'](_0x778dac,![]):_0x53b35b[_0x311e9a(0x123)](_0x778dac),_0x58ba79=Imported[_0x311e9a(0xfa)]?_0x27551a['paramValueByName'](_0x778dac,![]):_0x27551a[_0x311e9a(0x123)](_0x778dac));const _0x4018ca=_0x58ba79-_0x4dd02b;let _0x6573e5=_0x4018ca;if(_0x4dd02b%0x1!==0x0)_0x6573e5=Math['round'](_0x4018ca*0x64)+'%';_0x4018ca!==0x0&&(this[_0x311e9a(0x223)](ColorManager[_0x311e9a(0x139)](_0x4018ca)),_0x6573e5=(_0x4018ca>=0x0?_0x311e9a(0xd4):'(%1)')['format'](_0x6573e5),this[_0x311e9a(0x211)](_0x6573e5,_0x10c009+this[_0x311e9a(0x11c)](),_0x15c5a6,_0x1838b7-this[_0x311e9a(0x11c)]()*0x2,_0x311e9a(0x225)));},Window_VictoryLevelUpActor[_0x3001bb(0x13e)][_0x3001bb(0x276)]=function(){const _0x7e34c7=_0x3001bb;this[_0x7e34c7(0x248)]();const _0x40f69c=this[_0x7e34c7(0x11b)]();if(_0x40f69c[_0x7e34c7(0x106)]<=0x0)return;const _0x1de999=VisuMZ['VictoryAftermath'][_0x7e34c7(0xf4)][_0x7e34c7(0x1b7)][_0x7e34c7(0xee)];while(_0x40f69c['length']>_0x1de999){_0x40f69c['pop']();}this[_0x7e34c7(0xe6)](_0x40f69c),this[_0x7e34c7(0xf5)](_0x40f69c);},Window_VictoryLevelUpActor[_0x3001bb(0x13e)][_0x3001bb(0x11b)]=function(){const _0x31ea90=_0x3001bb,_0x5a93c1=this['beforeActor']()['skills']();return this['_actor'][_0x31ea90(0x11b)](_0x5a93c1);},Window_VictoryLevelUpActor['prototype'][_0x3001bb(0xe6)]=function(_0xe7a882){const _0x4bd847=_0x3001bb,_0x767dc0=this['lineHeight'](),_0x23c939=Window_VictoryRewards[_0x4bd847(0x1d3)],_0x2a479f=Window_VictoryRewards[_0x4bd847(0x1c8)],_0x3eee3d=ColorManager[_0x4bd847(0x214)](),_0x426e5e=Math['round'](this[_0x4bd847(0xeb)]/0x2)-0x64-_0x767dc0*0x2,_0x5ac78c=(_0xe7a882[_0x4bd847(0x106)]+0x1)*_0x767dc0,_0x4a5ef0=_0x767dc0,_0x1deb80=this[_0x4bd847(0x24b)]-_0x767dc0*6.5-_0x5ac78c;this[_0x4bd847(0x142)]['fillRect'](_0x4a5ef0-0x2,_0x1deb80-0x2,_0x426e5e+0x4,_0x5ac78c+0x4,_0x3eee3d),this[_0x4bd847(0x142)][_0x4bd847(0xd2)](_0x4a5ef0,_0x1deb80,_0x426e5e,_0x5ac78c),this[_0x4bd847(0x142)][_0x4bd847(0x1a4)](_0x4a5ef0,_0x1deb80,_0x426e5e,_0x5ac78c,_0x23c939,_0x2a479f);},Window_VictoryLevelUpActor[_0x3001bb(0x13e)][_0x3001bb(0xf5)]=function(_0x3509a1){const _0x1d2365=_0x3001bb,_0x304de5=this['lineHeight'](),_0x5259ec=Window_VictoryRewards['BG_COLOR_1'],_0x4a3fc4=Window_VictoryRewards[_0x1d2365(0x1c8)],_0x206893=ColorManager[_0x1d2365(0x214)](),_0x47a6b5=Math[_0x1d2365(0x235)](this['width']/0x2)-0x64-(_0x304de5+this[_0x1d2365(0x11c)]())*0x2,_0x156be3=(_0x3509a1[_0x1d2365(0x106)]+0x1)*_0x304de5;let _0x489b67=_0x304de5+this[_0x1d2365(0x11c)](),_0x527258=this[_0x1d2365(0x24b)]-_0x304de5*6.5-_0x156be3;const _0xb0c6c0=TextManager[_0x1d2365(0x27f)][_0x1d2365(0x117)](this[_0x1d2365(0x170)][_0x1d2365(0x230)]()),_0x1ab1b5=this[_0x1d2365(0x1c3)](_0xb0c6c0)['width'],_0x1df375=Math[_0x1d2365(0x235)](_0x489b67+(_0x47a6b5-_0x1ab1b5)/0x2);this[_0x1d2365(0x1f5)](_0xb0c6c0,_0x1df375,_0x527258,_0x1ab1b5),_0x527258+=_0x304de5,this[_0x1d2365(0x142)][_0x1d2365(0x20c)](_0x489b67,_0x527258-0x1,_0x47a6b5,0x2,_0x206893);for(const _0x488ce0 of _0x3509a1){if(!_0x488ce0)continue;this[_0x1d2365(0x248)](),this[_0x1d2365(0x27c)](_0x488ce0,_0x489b67+this[_0x1d2365(0x11c)](),_0x527258,_0x47a6b5-this['itemPadding']()*0x2),_0x527258+=_0x304de5;}},Window_VictoryLevelUpActor[_0x3001bb(0x13e)][_0x3001bb(0x1be)]=function(){const _0xe83afe=_0x3001bb,_0x772e89=this[_0xe83afe(0x1bc)](),_0xa75fe5=Window_VictoryLevelUpActor['_showFace'],_0x292aee=this['getQuoteWidth'](),_0x331d8a=_0x772e89*0x4,_0x11f138=Math[_0xe83afe(0x235)]((this['width']-_0x292aee)/0x2),_0x55c81c=_0x11f138+(_0xa75fe5?ImageManager['faceWidth']+0x14:0x0),_0x372656=this[_0xe83afe(0x24b)]-_0x772e89*5.5;let _0x287592=this[_0xe83afe(0x21f)]();_0xa75fe5&&this[_0xe83afe(0x264)](this[_0xe83afe(0x170)],_0x11f138,_0x372656,ImageManager[_0xe83afe(0x172)],ImageManager[_0xe83afe(0x13b)]),this[_0xe83afe(0x1f5)](_0x287592,_0x55c81c,_0x372656,_0x292aee-_0x55c81c);},Window_VictoryLevelUpActor['prototype'][_0x3001bb(0x253)]=function(){const _0x36074c=_0x3001bb;let _0x4a942a=Graphics['boxWidth'];return Imported[_0x36074c(0x134)]&&(_0x4a942a=Math[_0x36074c(0x1f7)](_0x4a942a,VisuMZ[_0x36074c(0x12b)][_0x36074c(0xf4)][_0x36074c(0x23c)][_0x36074c(0x224)])),_0x4a942a-this[_0x36074c(0x11c)]()*0x2;},Window_VictoryLevelUpActor[_0x3001bb(0x13e)][_0x3001bb(0x21f)]=function(){const _0x2bbebd=_0x3001bb;return this['findNewSkills']()['length']>0x0?TextManager[_0x2bbebd(0xd7)](this[_0x2bbebd(0x170)])[_0x2bbebd(0x117)](this[_0x2bbebd(0x170)][_0x2bbebd(0x230)]()):TextManager['quoteLevelUp'](this[_0x2bbebd(0x170)])['format'](this[_0x2bbebd(0x170)][_0x2bbebd(0x230)]());};