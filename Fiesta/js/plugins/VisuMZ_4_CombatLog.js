//=============================================================================
// VisuStella MZ - Combat Log
// VisuMZ_4_CombatLog.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_CombatLog = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CombatLog = VisuMZ.CombatLog || {};
VisuMZ.CombatLog.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.06] [CombatLog]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Combat_Log_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Sometimes text appears way too fast in the battle system or sometimes
 * players may miss what kind of information was delivered on-screen. For times
 * like that, being able to access the Combat Log would be important. The
 * Combat Log records all of the text that appears in the battle log window at
 * the top. The player can access the Combat Log display any time during action
 * selection phase or by holding down the designated Hot Key. Sometimes,
 * players can even review over the Combat Log to try and figure out any kinds
 * of patterns enemies may even have.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Record the events that happen in battle into an accessible Combat Log for
 *   players to go back and review.
 * * Access the Combat Log in-battle through the Party Command Window, Actor
 *   Command Window, or by holding down the Hot Key.
 * * Icons are added to help players quickly differentiate between different
 *   types of events.
 * * Combat Log can have its numbers color-coded to quickly determine their
 *   effects towards action targets.
 * * Players can review past Combat Logs from an option in the Main Menu.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
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
 * VisuMZ_1_BattleCore
 * 
 * The VisuStella MZ Battle Core's <Battle Commands> notetag can now add in
 * "Combat Log" to its list to have the Combat Log shown as an option to the
 * Actor Command Window. Do remember to have this option enabled in the Plugin
 * Parameters as well.
 * 
 * ---
 *
 * VisuMZ_1_MessageCore
 *
 * By having the VisuStella MZ Message Core installed, you can enable the
 * Auto Color functions for the Combat Log. Do remember to have this option
 * enabled in the Plugin Parameters as well.
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
 * === Bypass-Related Notetags ===
 * 
 * ---
 *
 * <Bypass Combat Log>
 *
 * - Used for: State Notetags
 * - Insert this notetag inside a state to make its state messages ignored.
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
 * === Combat Log Plugin Commands ===
 * 
 * ---
 *
 * Combat Log: Add Text
 * - Adds custom text to the current Combat Log.
 *
 *   Text:
 *   - What text would you like to add to the Combat Log?
 *
 *   Icon:
 *   - What icon would you like to bind to this entry?
 *
 * ---
 *
 * Combat Log: Add Horizontal Line
 * - Adds a horizontal line to the current Combat Log.
 *
 * ---
 *
 * Combat Log: Bypass Text?
 * - Temporarily bypass adding any new text to the Combat Log until this
 *   is turned off?
 *
 *   Bypass?:
 *   - Bypass text from being added to the Combat Log temporarily?
 *
 * ---
 *
 * Combat Log: Hot Key Enable?
 * - Enables/disables the Combat Log hot key in battle?
 *
 *   Enable?:
 *   - Enables/disables the Combat Log hot key in battle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Show in Main Menu?
 * - Shows/hides CombatLog menu inside the Main Menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Combat Log command inside the Main Menu.
 *   - Note! This command will be disabled if the player does not have any
 *     Combat Logs recorded.
 *
 * ---
 *
 * System: Show in Party Command?
 * - Shows/hides CombatLog menu inside the Window_PartyCommand.
 *
 *   Show/Hide?:
 *   - Shows/hides Combat Log command inside Window_PartyCommand.
 *
 * ---
 *
 * System: Show in Actor Command?
 * - Shows/hides CombatLog menu inside the Window_ActorCommand.
 *
 *   Show/Hide?:
 *   - Shows/hides Combat Log command inside Window_ActorCommand.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for the Combat Log. Determine how the commands appear,
 * the hot key used, and accessibility through the Main Menu, Party Command
 * Window, and Actor Command Window.
 *
 * ---
 *
 * General
 * 
 *   Command Name:
 *   - Name of the 'Combat Log' option in the various menus.
 * 
 *   Icon:
 *   - Icon used for each of the 'Combat Log' options.
 * 
 *   Hot Key:
 *   - This is the key used for quickly opening the Combat Log in battle.
 * 
 *   Stored Logs:
 *   - How many combat logs are stored as a history?
 *   - This affects the Combat Log menu.
 *
 * ---
 *
 * Main Menu
 * 
 *   Show in Main Menu?:
 *   - Add the 'Combat Log' option to the Main Menu by default?
 *   - Note! This command will be disabled if the player does not have any
 *     Combat Logs recorded.
 *
 * ---
 *
 * Window_PartyCommand
 * 
 *   Show in Window?:
 *   - Add the 'Combat Log' option to Window_PartyCommand by default?
 *
 * ---
 *
 * Window_ActorCommand
 * 
 *   Show in Window?:
 *   - Add the 'Combat Log' option to Window_ActorCommand by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Combat Log Settings
 * ============================================================================
 *
 * Settings regarding the Combat Log contents. Disable any unwanted information
 * you want from here to prevent them from being displayed.
 *
 * ---
 *
 * General
 * 
 *   Show Icons?:
 *   - Show icons in the Combat Log?
 * 
 *   Auto Color?:
 *   - Use auto colors for the Combat Log?
 *   - Requires VisuMZ_1_MessageCore
 * 
 *   Color Numbers?:
 *   - Color numbers for damage differences?
 *
 * ---
 *
 * Battle Start
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *
 * ---
 *
 * Enemy Emerge
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Battle Advantages
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Preemptive Icon:
 *   Surprised Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *
 * ---
 *
 * Start Turn
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Turn Count
 *
 * ---
 *
 * End Turn
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Turn Count
 *
 * ---
 *
 * Battle Victory
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Battle Escape
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Battle Defeat
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Action Text
 * 
 *   Show Skill Message 1?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Skill Message 2?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Item Message?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * HP Settings
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * HP Settings > HP Heal
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * HP Settings > HP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * HP Settings > No HP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * MP Settings
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * MP Settings > MP Heal
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * MP Settings > MP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * MP Settings > No MP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * TP Settings
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * TP Settings > TP Heal
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * TP Settings > TP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * TP Settings > No TP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * State Settings
 * 
 *   Show State Add?:
 *   - Show this event in the Combat Log?
 * 
 *   Show State Remove?:
 *   - Show this event in the Combat Log?
 * 
 *   Show State Current?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * Buff & Debuff Settings
 * 
 *   Show Add Buff?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Add Debuff?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Erase Buff?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * Counterattack
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Reflection
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Substitute
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Effect Failure
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Critical Hit
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Missed Hit
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Evaded Hit
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_CombatLog. Pretty up the scene to fit the rest
 * of your game with these settings!
 *
 * ---
 *
 * Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Settings regarding this plugin's windows. These alter how the windows appear
 * in the battle and menu scenes.
 *
 * ---
 *
 * Combat Log (Battle)
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Combat Log (Menu)
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Combat History (Menu)
 * 
 *   Latest Command:
 *   - Text displayed for latest battle.
 *   - %1 - Battle Count
 * 
 *   Past Command:
 *   - Text displayed for past battles.
 *   - %1 - Battle Count
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Compatibility Settings
 * ============================================================================
 *
 * These settings are for creating compatibility with the other VisuStella MZ
 * plugins that can benefit from having their effects recorded inside of the
 * Combat Log.
 *
 * ---
 *
 * Battle System - ATB > Interrupt
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Battle System - CTB > Order Change
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Battle System - STB > Instant
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Anti-Damage Barriers > Cancel Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name
 *
 * ---
 *
 * Anti-Damage Barriers > Nullify Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name
 *
 * ---
 *
 * Anti-Damage Barriers > Reduction Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name
 *
 * ---
 *
 * Anti-Damage Barriers > Absorption Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name, %3 - Damage
 *
 * ---
 *
 * Anti-Damage Barriers > MP Dispersion Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name, %3 - MP
 *
 * ---
 *
 * Anti-Damage Barriers > TP Dispersion Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name, %3 - TP
 *
 * ---
 *
 * Life State Effects > Auto Life
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Curse
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Doom
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Fragile
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Guts
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Undead
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Steal Items > Steal Text
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
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
 * * Trihan
 * * Arisu
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.06: March 12, 2021
 * * Bug Fixes!
 * ** Icons for counters, reflections, and substitutes should now display
 *    properly in the combat log. Fix made by Arisu.
 * ** Turn data should now display properly in TPB-base battle systems.
 *    Fix made by Arisu.
 * ** Switching out to the Options Scene or Party Scene should no longer clear
 *    the Combat Log in-battle. Fix made by Arisu.
 * 
 * Version 1.05: January 22, 2021
 * * Feature Update!
 * ** Dimmed background sprite now expands through the width of the screen
 *    while in battle to no longer display the jagged edges. Update by Irina.
 * 
 * Version 1.04: January 15, 2021
 * * Feature Update!
 * ** Any entries added to the Combat Log with \V[x] will now have their exact
 *    variable data stored at the time instead of displaying their current
 *    variable value. Update made by Irina.
 * 
 * Version 1.03: January 8, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Irina.
 * *** Plugin Parameters > General Settings > Stored Logs
 * **** How many combat logs are stored as a history?
 * 
 * Version 1.02: January 1, 2021
 * * Bug Fixes!
 * ** Compatibility with the Absorption Barrier should be fixed. Fix made by
 *    Yanfly.
 * 
 * Version 1.01: December 25, 2020
 * * Feature Update!
 * ** Combat Log when opened with the hot key will automatically close itself
 *    if the Message Window is open. Update made by Yanfly.
 *
 * Version 1.00: January 15, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogAddText
 * @text Combat Log: Add Text
 * @desc Adds custom text to the current Combat Log.
 *
 * @arg Text:str
 * @text Text
 * @desc What text would you like to add to the Combat Log?
 * @default Custom
 *
 * @arg Icon:num
 * @text Icon
 * @desc What icon would you like to bind to this entry?
 * @default 87
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogAddHorzLine
 * @text Combat Log: Add Horizontal Line
 * @desc Adds a horizontal line to the current Combat Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogBypass
 * @text Combat Log: Bypass Text?
 * @desc Temporarily bypass adding any new text to the Combat Log until this is turned off?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass Text
 * @off Add Normally
 * @desc Bypass text from being added to the Combat Log temporarily?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogEnableHotKey
 * @text Combat Log: Hot Key Enable?
 * @desc Enables/disables the Combat Log hot key in battle?
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables the Combat Log hot key in battle.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowCombatLogMenu
 * @text System: Show in Main Menu?
 * @desc Shows/hides CombatLog menu inside the Main Menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Combat Log command inside the Main Menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowCombatLogParty
 * @text System: Show in Party Command?
 * @desc Shows/hides CombatLog menu inside the Window_PartyCommand.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Combat Log command inside Window_PartyCommand.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowCombatLogActor
 * @text System: Show in Actor Command?
 * @desc Shows/hides CombatLog menu inside the Window_ActorCommand.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Combat Log command inside Window_ActorCommand.
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
 * @param CombatLog
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
 * @desc General settings for the Combat Log.
 * @default {"General":"","Name:str":"Combat Log","Icon:num":"189","HotKey:str":"shift","MainMenu":"","ShowMainMenu:eval":"true","PartyCommand":"","ShowPartyCommand:eval":"true","ActorCommand":"","ShowActorCommand:eval":"true"}
 *
 * @param CombatLog:struct
 * @text Combat Log Settings
 * @type struct<CombatLog>
 * @desc Settings regarding the Combat Log contents.
 * @default {"General":"","ShowIcons:eval":"true","AutoColor:eval":"true","ColorNumbers:eval":"true","BattleStart":"","ShowBattleStart:eval":"true","IconBattleStart:num":"97","TextBattleStart:str":"\\C[4]Battle Start!\\C[0]","EnemyEmerge":"","ShowEnemyEmerge:eval":"true","IconEnemyEmerge:num":"5","Advantages":"","ShowAdvantages:eval":"true","IconPreemptive:num":"77","IconSurprise:num":"78","StartTurn":"","ShowStartTurn:eval":"true","IconStartTurn:num":"97","TextStartTurn:str":"\\C[4]Turn \\C[5]%1\\C[4]: \\C[6]Start!","EndTurn":"","ShowEndTurn:eval":"true","IconEndTurn:num":"97","TextEndTurn:str":"\\C[4]Turn \\C[5]%1\\C[4]: \\C[6]End!","Victory":"","ShowVictory:eval":"true","IconVictory:num":"87","Escape":"","ShowEscape:eval":"true","IconEscape:num":"82","Defeat":"","ShowDefeat:eval":"true","IconDefeat:num":"1","Actions":"","ShowSkillMessage1:eval":"true","ShowSkillMessage2:eval":"true","ShowItemMessage:eval":"true","HP":"","ShowHP:eval":"true","HealHP":"","IconHealHP:num":"72","TextColorHealHP:num":"24","DmgHP":"","IconDmgHP:num":"168","TextColorDmgHP:num":"2","NoDmgHP":"","IconNoDmgHP:num":"81","TextColorNoDmgHP:num":"6","MP":"","ShowMP:eval":"true","HealMP":"","IconHealMP:num":"72","TextColorHealMP:num":"4","DmgMP":"","IconDmgMP:num":"171","TextColorDmgMP:num":"5","NoDmgMP":"","IconNoDmgMP:num":"81","TextColorNoDmgMP:num":"6","TP":"","ShowTP:eval":"true","HealTP":"","IconHealTP:num":"164","TextColorHealTP:num":"24","DmgTP":"","IconDmgTP:num":"170","TextColorDmgTP:num":"28","NoDmgTP":"","IconNoDmgTP:num":"81","TextColorNoDmgTP:num":"6","States":"","ShowStateAdd:eval":"true","ShowStateRemove:eval":"true","ShowStateCurrent:eval":"true","Buffs":"","ShowAddBuff:eval":"true","ShowAddDebuff:eval":"true","ShowEraseBuff:eval":"true","Counter":"","ShowCounter:eval":"true","IconCounter:num":"77","Reflect":"","ShowReflect:eval":"true","IconReflect:num":"81","Subst":"","ShowSubst:eval":"true","IconSubst:num":"81","Fail":"","ShowFail:eval":"true","IconFail:num":"166","Critical":"","ShowCritical:eval":"true","IconCritical:num":"87","Miss":"","ShowMiss:eval":"true","IconMiss:num":"82","Evade":"","ShowEvade:eval":"true","IconEvade:num":"82"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_CombatLog.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Settings regarding this plugin's windows.
 * @default {"CombatLogBattle":"","CombatLogBattle_BgType:num":"1","CombatLogBattle_RectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = Graphics.boxHeight;\\nreturn new Rectangle(wx, wy, ww, wh);\"","CombatLogMenu":"","CombatLogMenu_BgType:num":"0","CombatLogMenu_RectJS:func":"\"const wx = 0;\\nconst wy = this._historyWindow.y + this._historyWindow.height;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.mainAreaHeight() - this._historyWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","CombatHistory":"","CombatHistoryLatest:str":"Latest","CombatHistoryPrevious:str":"Battle #%1","CombatHistory_BgType:num":"0","CombatHistory_RectJS:func":"\"const ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param -
 *
 * @param Compatibility:struct
 * @text Compatibility Settings
 * @type struct<Compatibility>
 * @desc Compatibility settings with other VisuStella MZ plugins.
 * @default {"VisuMZ_2_BattleSystemATB":"","VisuMZ_2_BattleSystemATB_Interrupt":"","ShowBattleSysAtbInterrupt:eval":"true","IconBattleSysAtbInterrupt:num":"78","TextBattleSysAtbInterrupt:str":"%1 has been interrupted!","VisuMZ_2_BattleSystemCTB":"","VisuMZ_2_BattleSystemCTB_OrderChange":"","ShowBattleSysCtbOrderChange:eval":"true","IconBattleSysCtbOrderChange:num":"75","TextBattleSysCtbOrderChange:str":"%1's turn order has changed!","VisuMZ_2_BattleSystemSTB":"","VisuMZ_2_BattleSystemSTB_Instant":"","ShowBattleSysStbInstant:eval":"true","IconBattleSysStbInstant:num":"73","TextBattleSysStbInstant:str":"%1's gains an extra action!","VisuMZ_3_AntiDmgBarriers":"","VisuMZ_3_AntiDmgBarriers_Cancel":"","Show_AntiDmgBarrier_Cancel:eval":"true","Text_AntiDmgBarrier_Cancel:str":"%2 cancels damage for %1!","VisuMZ_3_AntiDmgBarriers_Nullify":"","Show_AntiDmgBarrier_Nullify:eval":"true","Text_AntiDmgBarrier_Nullify:str":"%2 nullifies damage for %1!","VisuMZ_3_AntiDmgBarriers_Reduce":"","Show_AntiDmgBarrier_Reduce:eval":"true","Text_AntiDmgBarrier_Reduce:str":"%2 reduces damage for %1!","VisuMZ_3_AntiDmgBarriers_Absorb":"","Show_AntiDmgBarrier_Absorb:eval":"true","Text_AntiDmgBarrier_Absorb:str":"%2 absorbs \\C[5]%2\\C[0] damage for %1!","VisuMZ_3_AntiDmgBarriers_MpDisperse":"","Show_AntiDmgBarrier_MpDisperse:eval":"true","Text_AntiDmgBarrier_MpDisperse:str":"%2 dispersed damage to %1's %3!","VisuMZ_3_AntiDmgBarriers_TpDisperse":"","Show_AntiDmgBarrier_TpDisperse:eval":"true","Text_AntiDmgBarrier_TpDisperse:str":"%2 dispersed damage to %1's %3!","VisuMZ_3_LifeStateEffects":"","VisuMZ_3_LifeStateEffects_AutoLife":"","Show_LifeStateEffects_AutoLife:eval":"true","Icon_LifeStateEffects_AutoLife:num":"70","Text_LifeStateEffects_AutoLife:str":"%1 is automatically revived!","VisuMZ_3_LifeStateEffects_Curse":"","Show_LifeStateEffects_Curse:eval":"true","Icon_LifeStateEffects_Curse:num":"71","Text_LifeStateEffects_Curse:str":"%1's curse takes hold...","VisuMZ_3_LifeStateEffects_Doom":"","Show_LifeStateEffects_Doom:eval":"true","Icon_LifeStateEffects_Doom:num":"1","Text_LifeStateEffects_Doom:str":"%1 has fallen to doom.","VisuMZ_3_LifeStateEffects_Fragile":"","Show_LifeStateEffects_Fragile:eval":"true","Icon_LifeStateEffects_Fragile:num":"166","Text_LifeStateEffects_Fragile:str":"%1 was too fragile!","VisuMZ_3_LifeStateEffects_Guts":"","Show_LifeStateEffects_Guts:eval":"true","Icon_LifeStateEffects_Guts:num":"77","Text_LifeStateEffects_Guts:str":"%1 powers through a fatal blow!","VisuMZ_3_LifeStateEffects_Undead":"","Show_LifeStateEffects_Undead:eval":"true","Icon_LifeStateEffects_Undead:num":"10","Text_LifeStateEffects_Undead:str":"%1 suffers from being undead!","VisuMZ_3_StealItems":"","VisuMZ_3_StealItems_Steal":"","Show_StealItems_Steal:eval":"true","Icon_StealItems_Steal:num":"142"}
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
 * @param Name:str
 * @text Command Name
 * @parent General
 * @desc Name of the 'Combat Log' option in the various menus.
 * @default Combat Log
 *
 * @param Icon:num
 * @text Icon
 * @parent General
 * @desc Icon used for each of the 'Combat Log' options.
 * @default 189
 *
 * @param HotKey:str
 * @text Hot Key
 * @parent General
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for quickly opening the Combat Log in battle.
 * @default shift
 *
 * @param StoredLogs:num
 * @text Stored Logs
 * @parent General
 * @desc How many combat logs are stored as a history?
 * This affects the Combat Log menu.
 * @default 5
 *
 * @param MainMenu
 * @text Main Menu
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @parent MainMenu
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Combat Log' option to the Main Menu by default?
 * @default true
 *
 * @param PartyCommand
 * @text Window_PartyCommand
 *
 * @param ShowPartyCommand:eval
 * @text Show in Window?
 * @parent PartyCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Combat Log' option to Window_PartyCommand by default?
 * @default true
 *
 * @param ActorCommand
 * @text Window_ActorCommand
 *
 * @param ShowActorCommand:eval
 * @text Show in Window?
 * @parent ActorCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Combat Log' option to Window_ActorCommand by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Combat Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CombatLog:
 *
 * @param General
 *
 * @param ShowIcons:eval
 * @text Show Icons?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show icons in the Combat Log?
 * @default true
 *
 * @param AutoColor:eval
 * @text Auto Color?
 * @parent General
 * @type boolean
 * @on Use Auto Color
 * @off Don't Use
 * @desc Use auto colors for the Combat Log?
 * Requires VisuMZ_1_MessageCore
 * @default true
 *
 * @param ColorNumbers:eval
 * @text Color Numbers?
 * @parent General
 * @type boolean
 * @on Color Numbers
 * @off Don't Color
 * @desc Color numbers for damage differences?
 * @default true
 * 
 * @param BattleStart
 * @text Battle Start
 *
 * @param ShowBattleStart:eval
 * @text Show?
 * @parent BattleStart
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleStart:num
 * @text Icon
 * @parent BattleStart
 * @desc Icon used for this event in the Combat Log.
 * @default 97
 *
 * @param TextBattleStart:str
 * @text Text
 * @parent BattleStart
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes.
 * @default \C[4]Battle Start!\C[0]
 * 
 * @param EnemyEmerge
 * @text Enemy Emerge
 *
 * @param ShowEnemyEmerge:eval
 * @text Show?
 * @parent EnemyEmerge
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEnemyEmerge:num
 * @text Icon
 * @parent EnemyEmerge
 * @desc Icon used for this event in the Combat Log.
 * @default 5
 * 
 * @param Advantages
 * @text Battle Advantages
 *
 * @param ShowAdvantages:eval
 * @text Show?
 * @parent Advantages
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconPreemptive:num
 * @text Preemptive Icon
 * @parent Advantages
 * @desc Icon used for this event in the Combat Log.
 * @default 77
 *
 * @param IconSurprise:num
 * @text Surprised Icon
 * @parent Advantages
 * @desc Icon used for this event in the Combat Log.
 * @default 78
 * 
 * @param StartTurn
 * @text Start Turn
 *
 * @param ShowStartTurn:eval
 * @text Show?
 * @parent StartTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconStartTurn:num
 * @text Icon
 * @parent StartTurn
 * @desc Icon used for this event in the Combat Log.
 * @default 97
 *
 * @param TextStartTurn:str
 * @text Text
 * @parent StartTurn
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Turn Count
 * @default \C[4]Turn \C[5]%1\C[4]: \C[6]Start!
 * 
 * @param EndTurn
 * @text End Turn
 *
 * @param ShowEndTurn:eval
 * @text Show?
 * @parent EndTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEndTurn:num
 * @text Icon
 * @parent EndTurn
 * @desc Icon used for this event in the Combat Log.
 * @default 97
 *
 * @param TextEndTurn:str
 * @text Text
 * @parent EndTurn
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Turn Count
 * @default \C[4]Turn \C[5]%1\C[4]: \C[6]End!
 * 
 * @param Victory
 * @text Battle Victory
 *
 * @param ShowVictory:eval
 * @text Show?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconVictory:num
 * @text Icon
 * @parent Victory
 * @desc Icon used for this event in the Combat Log.
 * @default 87
 * 
 * @param Escape
 * @text Battle Escape
 *
 * @param ShowEscape:eval
 * @text Show?
 * @parent Escape
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEscape:num
 * @text Icon
 * @parent Escape
 * @desc Icon used for this event in the Combat Log.
 * @default 82
 * 
 * @param Defeat
 * @text Battle Defeat
 *
 * @param ShowDefeat:eval
 * @text Show?
 * @parent Defeat
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconDefeat:num
 * @text Icon
 * @parent Defeat
 * @desc Icon used for this event in the Combat Log.
 * @default 1
 * 
 * @param Actions
 * @text Action Text
 *
 * @param ShowSkillMessage1:eval
 * @text Show Skill Message 1?
 * @parent Actions
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowSkillMessage2:eval
 * @text Show Skill Message 2?
 * @parent Actions
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowItemMessage:eval
 * @text Show Item Message?
 * @parent Actions
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HP
 * @text HP Settings
 *
 * @param ShowHP:eval
 * @text Show?
 * @parent HP
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HealHP
 * @text HP Heal
 * @parent HP
 *
 * @param IconHealHP:num
 * @text Icon
 * @parent HealHP
 * @desc Icon used for this event in the Combat Log.
 * @default 72
 *
 * @param TextColorHealHP:num
 * @text Text Color
 * @parent HealHP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 24
 * 
 * @param DmgHP
 * @text HP Damage
 * @parent HP
 *
 * @param IconDmgHP:num
 * @text Icon
 * @parent DmgHP
 * @desc Icon used for this event in the Combat Log.
 * @default 168
 *
 * @param TextColorDmgHP:num
 * @text Text Color
 * @parent DmgHP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 2
 * 
 * @param NoDmgHP
 * @text No HP Damage
 * @parent HP
 *
 * @param IconNoDmgHP:num
 * @text Icon
 * @parent NoDmgHP
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 *
 * @param TextColorNoDmgHP:num
 * @text Text Color
 * @parent NoDmgHP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 6
 * 
 * @param MP
 * @text MP Settings
 *
 * @param ShowMP:eval
 * @text Show?
 * @parent MP
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HealMP
 * @text MP Heal
 * @parent MP
 *
 * @param IconHealMP:num
 * @text Icon
 * @parent HealMP
 * @desc Icon used for this event in the Combat Log.
 * @default 72
 *
 * @param TextColorHealMP:num
 * @text Text Color
 * @parent HealMP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 4
 * 
 * @param DmgMP
 * @text MP Damage
 * @parent MP
 *
 * @param IconDmgMP:num
 * @text Icon
 * @parent DmgMP
 * @desc Icon used for this event in the Combat Log.
 * @default 171
 *
 * @param TextColorDmgMP:num
 * @text Text Color
 * @parent DmgMP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 5
 * 
 * @param NoDmgMP
 * @text No MP Damage
 * @parent MP
 *
 * @param IconNoDmgMP:num
 * @text Icon
 * @parent NoDmgMP
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 *
 * @param TextColorNoDmgMP:num
 * @text Text Color
 * @parent NoDmgMP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 6
 * 
 * @param TP
 * @text TP Settings
 *
 * @param ShowTP:eval
 * @text Show?
 * @parent TP
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HealTP
 * @text TP Heal
 * @parent TP
 *
 * @param IconHealTP:num
 * @text Icon
 * @parent HealTP
 * @desc Icon used for this event in the Combat Log.
 * @default 164
 *
 * @param TextColorHealTP:num
 * @text Text Color
 * @parent HealTP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 24
 * 
 * @param DmgTP
 * @text TP Damage
 * @parent TP
 *
 * @param IconDmgTP:num
 * @text Icon
 * @parent DmgTP
 * @desc Icon used for this event in the Combat Log.
 * @default 170
 *
 * @param TextColorDmgTP:num
 * @text Text Color
 * @parent DmgTP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 28
 * 
 * @param NoDmgTP
 * @text No TP Damage
 * @parent TP
 *
 * @param IconNoDmgTP:num
 * @text Icon
 * @parent NoDmgTP
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 *
 * @param TextColorNoDmgTP:num
 * @text Text Color
 * @parent NoDmgTP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 6
 * 
 * @param States
 * @text State Settings
 *
 * @param ShowStateAdd:eval
 * @text Show State Add?
 * @parent States
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowStateRemove:eval
 * @text Show State Remove?
 * @parent States
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowStateCurrent:eval
 * @text Show State Current?
 * @parent States
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param Buffs
 * @text Buff & Debuff Settings
 *
 * @param ShowAddBuff:eval
 * @text Show Add Buff?
 * @parent Buffs
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowAddDebuff:eval
 * @text Show Add Debuff?
 * @parent Buffs
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowEraseBuff:eval
 * @text Show Erase Buff?
 * @parent Buffs
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param Counter
 * @text Counterattack
 *
 * @param ShowCounter:eval
 * @text Show?
 * @parent Counter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconCounter:num
 * @text Icon
 * @parent Counter
 * @desc Icon used for this event in the Combat Log.
 * @default 77
 * 
 * @param Reflect
 * @text Reflection
 *
 * @param ShowReflect:eval
 * @text Show?
 * @parent Reflect
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconReflect:num
 * @text Icon
 * @parent Reflect
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 * 
 * @param Subst
 * @text Substitute
 *
 * @param ShowSubst:eval
 * @text Show?
 * @parent Subst
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconSubst:num
 * @text Icon
 * @parent Subst
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 * 
 * @param Fail
 * @text Effect Failure
 *
 * @param ShowFail:eval
 * @text Show?
 * @parent Fail
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconFail:num
 * @text Icon
 * @parent Fail
 * @desc Icon used for this event in the Combat Log.
 * @default 166
 * 
 * @param Critical
 * @text Critical Hit
 *
 * @param ShowCritical:eval
 * @text Show?
 * @parent Critical
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconCritical:num
 * @text Icon
 * @parent Critical
 * @desc Icon used for this event in the Combat Log.
 * @default 87
 * 
 * @param Miss
 * @text Missed Hit
 *
 * @param ShowMiss:eval
 * @text Show?
 * @parent Miss
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconMiss:num
 * @text Icon
 * @parent Miss
 * @desc Icon used for this event in the Combat Log.
 * @default 82
 * 
 * @param Evade
 * @text Evaded Hit
 *
 * @param ShowEvade:eval
 * @text Show?
 * @parent Evade
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEvade:num
 * @text Icon
 * @parent Evade
 * @desc Icon used for this event in the Combat Log.
 * @default 82
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param CombatLogBattle
 * @text Combat Log (Battle)
 *
 * @param CombatLogBattle_BgType:num
 * @text Background Type
 * @parent CombatLogBattle
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 1
 *
 * @param CombatLogBattle_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CombatLogBattle
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = Graphics.boxHeight;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param CombatLogMenu
 * @text Combat Log (Menu)
 *
 * @param CombatLogMenu_BgType:num
 * @text Background Type
 * @parent CombatLogMenu
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
 * @param CombatLogMenu_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CombatLogMenu
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this._historyWindow.y + this._historyWindow.height;\nconst ww = Graphics.boxWidth;\nconst wh = this.mainAreaHeight() - this._historyWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param CombatHistory
 * @text Combat History (Menu)
 *
 * @param CombatHistoryLatest:str
 * @text Latest Command
 * @parent CombatHistory
 * @desc Text displayed for latest battle.
 * %1 - Battle Count
 * @default Latest
 *
 * @param CombatHistoryPrevious:str
 * @text Past Command
 * @parent CombatHistory
 * @desc Text displayed for past battles.
 * %1 - Battle Count
 * @default Battle #%1
 *
 * @param CombatHistory_BgType:num
 * @text Background Type
 * @parent CombatHistory
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
 * @param CombatHistory_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CombatHistory
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(1, true);\nconst wx = 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Compatibility Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Compatibility:
 *
 * @param VisuMZ_2_BattleSystemATB
 * @text Battle System - ATB
 * 
 * @param VisuMZ_2_BattleSystemATB_Interrupt
 * @text Interrupt
 * @parent VisuMZ_2_BattleSystemATB
 *
 * @param ShowBattleSysAtbInterrupt:eval
 * @text Show?
 * @parent VisuMZ_2_BattleSystemATB_Interrupt
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleSysAtbInterrupt:num
 * @text Icon
 * @parent VisuMZ_2_BattleSystemATB_Interrupt
 * @desc Icon used for this event in the Combat Log.
 * @default 78
 *
 * @param TextBattleSysAtbInterrupt:str
 * @text Text
 * @parent VisuMZ_2_BattleSystemATB_Interrupt
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 has been interrupted!
 *
 * @param VisuMZ_2_BattleSystemCTB
 * @text Battle System - CTB
 * 
 * @param VisuMZ_2_BattleSystemCTB_OrderChange
 * @text Order Change
 * @parent VisuMZ_2_BattleSystemCTB
 *
 * @param ShowBattleSysCtbOrderChange:eval
 * @text Show?
 * @parent VisuMZ_2_BattleSystemCTB_OrderChange
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleSysCtbOrderChange:num
 * @text Icon
 * @parent VisuMZ_2_BattleSystemCTB_OrderChange
 * @desc Icon used for this event in the Combat Log.
 * @default 75
 *
 * @param TextBattleSysCtbOrderChange:str
 * @text Text
 * @parent VisuMZ_2_BattleSystemCTB_OrderChange
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1's turn order has changed!
 *
 * @param VisuMZ_2_BattleSystemSTB
 * @text Battle System - STB
 * 
 * @param VisuMZ_2_BattleSystemSTB_Instant
 * @text Instant
 * @parent VisuMZ_2_BattleSystemSTB
 *
 * @param ShowBattleSysStbInstant:eval
 * @text Show?
 * @parent VisuMZ_2_BattleSystemSTB_Instant
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleSysStbInstant:num
 * @text Icon
 * @parent VisuMZ_2_BattleSystemSTB_Instant
 * @desc Icon used for this event in the Combat Log.
 * @default 73
 *
 * @param TextBattleSysStbInstant:str
 * @text Text
 * @parent VisuMZ_2_BattleSystemSTB_Instant
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1's gains an extra action!
 *
 * @param VisuMZ_3_AntiDmgBarriers
 * @text Anti-Damage Barriers
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Cancel
 * @text Cancel Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Cancel:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Cancel
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Cancel:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Cancel
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 cancels damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Nullify
 * @text Nullify Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Nullify:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Nullify
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Nullify:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Nullify
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 nullifies damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Reduce
 * @text Reduction Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Reduce:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Reduce:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 reduces damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Reduce
 * @text Reduction Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Reduce:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Reduce:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 reduces damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Absorb
 * @text Absorption Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Absorb:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Absorb
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Absorb:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Absorb
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name, %3 - Damage
 * @default %2 absorbs \C[5]%2\C[0] damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_MpDisperse
 * @text MP Dispersion Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_MpDisperse:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_MpDisperse
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_MpDisperse:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_MpDisperse
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name, %3 - MP
 * @default %2 dispersed damage to %1's %3!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_TpDisperse
 * @text TP Dispersion Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_TpDisperse:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_TpDisperse
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_TpDisperse:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_TpDisperse
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name, %3 - TP
 * @default %2 dispersed damage to %1's %3!
 *
 * @param VisuMZ_3_LifeStateEffects
 * @text Life State Effects
 * 
 * @param VisuMZ_3_LifeStateEffects_AutoLife
 * @text Auto Life
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_AutoLife:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_AutoLife
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_AutoLife:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_AutoLife
 * @desc Icon used for this event in the Combat Log.
 * @default 70
 *
 * @param Text_LifeStateEffects_AutoLife:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_AutoLife
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 is automatically revived!
 * 
 * @param VisuMZ_3_LifeStateEffects_Curse
 * @text Curse
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Curse:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Curse
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Curse:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Curse
 * @desc Icon used for this event in the Combat Log.
 * @default 71
 *
 * @param Text_LifeStateEffects_Curse:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Curse
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1's curse takes hold...
 * 
 * @param VisuMZ_3_LifeStateEffects_Doom
 * @text Doom
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Doom:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Doom
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Doom:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Doom
 * @desc Icon used for this event in the Combat Log.
 * @default 1
 *
 * @param Text_LifeStateEffects_Doom:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Doom
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 has fallen to doom.
 * 
 * @param VisuMZ_3_LifeStateEffects_Fragile
 * @text Fragile
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Fragile:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Fragile
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Fragile:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Fragile
 * @desc Icon used for this event in the Combat Log.
 * @default 166
 *
 * @param Text_LifeStateEffects_Fragile:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Fragile
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 was too fragile!
 * 
 * @param VisuMZ_3_LifeStateEffects_Guts
 * @text Guts
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Guts:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Guts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Guts:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Guts
 * @desc Icon used for this event in the Combat Log.
 * @default 77
 *
 * @param Text_LifeStateEffects_Guts:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Guts
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 powers through a fatal blow!
 * 
 * @param VisuMZ_3_LifeStateEffects_Undead
 * @text Undead
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Undead:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Undead
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Undead:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Undead
 * @desc Icon used for this event in the Combat Log.
 * @default 10
 *
 * @param Text_LifeStateEffects_Undead:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Undead
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 suffers from being undead!
 *
 * @param VisuMZ_3_StealItems
 * @text Steal Items
 * 
 * @param VisuMZ_3_StealItems_Steal
 * @text Steal Text
 * @parent VisuMZ_3_StealItems
 *
 * @param Show_StealItems_Steal:eval
 * @text Show?
 * @parent VisuMZ_3_StealItems_Steal
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_StealItems_Steal:num
 * @text Icon
 * @parent VisuMZ_3_StealItems_Steal
 * @desc Icon used for this event in the Combat Log.
 * @default 142
 *
 */
//=============================================================================

const _0x561a=['ShowMainMenu','20995FQjwMY','CombatLogEnableHotKey','historyWindowRect','ShowSkillMessage2','gradientFillRect','commandStyle','Text_LifeStateEffects_%1','_buffs','isActiveTpb','scaleSprite','setHandler','Game_Battler_onAntiDamageTpBarrier','drawBackgroundRect','replace','down','isSkill','onAtbInterrupt','isMainMenuCombatLogEnabled','Show','148HpIiSj','result','createCommandWindow','mainAreaTop','Window_BattleLog_displayReflection','RemoveUnwantedTextCodes','Window_MenuCommand_addOriginalCommands','Window_BattleLog_displaySubstitute','BattleManager_onEscapeSuccess','Game_BattlerBase_eraseBuff','Scene_Battle_isAnyInputWindowActive','createDisplayObjects','initialize','combatLogBuffChanges','Window_BattleLog_displayCritical','IconDmgMP','Window_BattleLog_displayMiss','partyName','updateTurnEnd','Game_Battler_onAntiDamageCancelBarrier','maxCols','drawRect','format','\x5cN[%1]','isMenuCursorBlacklisted','padding','drawTextEx','IconNoDmgMP','CombatLogMenu_RectJS','processDefeat','findSymbol','aliveMembers','Window_BattleLog_displayCounter','battleCount','ACCESS_BUTTON','Show_StealItems_Steal','IconDefeat','combatLog_EnemyEmerge_Icon','ShowReflect','actorRecovery','TextColorHealHP','ShowIcons','_dimmerSprite','processAbort','isCursorMovable','create','initCombatLogBase','Window_ActorCommand_makeCommandList','getTotalCombatLogs','Heal','escapeStart','active','CombatLog','smoothScrollDown','displayMiss','endTurn','Game_BattlerBase_setTp','exit','unshift','Scene_Battle_updateCancelButton','Settings','_actorCommandWindow','TextColorHealMP','combatLog_HP_Heal','Scene_Battle_isTimeActive','visible','Show_AntiDmgBarrier_Reduce','setHp','Scene_Battle_createDisplayObjects','criticalToEnemy','isBypassCombatLog','displayAbsorptionBarrierPopup','IconFail','combatLog_MP_Heal','TextColorHealTP','displayCritical','getBackgroundOpacity','BattleManager_processAbort','Icon_StealItems_Steal','cursorUp','note','TextBattleSysCtbOrderChange','RegExp','bind','actorNoDamage','BgFilename2','leader','setBypassCombatLog','TextColorNoDmgTP','none','_historyWindow','ShowStateCurrent','startBattleCombatLog','cursorDown','VisuMZ_1_BattleCore','setFrame','shift','pop','boxWidth','physical','setCombatLogIndex','IconNoDmgTP','itemRect','Icon','ARRAYNUM','ShowPartyCommand','IconDmgHP','magicEvasion','onCtbOrderChange','toUpperCase','Game_Battler_removeState','isPartyCmdCombatLogVisible','CombatHistoryLatest','setLogWindow','actorCmd','enemyDamage','IconBattleSysCtbOrderChange','itemHeight','combatLogName','enemyLoss','setCombatLogHotKeyActive','abs','isTriggered','isMainMenuCombatLogVisible','ShowHP','currentExt','history','combatLog_BattleCmd_Icon','_combatLogWindow','General','ShowBattleSysStbInstant','centerSprite','surprise','onAntiDamageTpBarrier','criticalToActor','IconHealHP','status','ShowStartTurn','open','registerCommand','2MWoGfz','applyCombatLogColor','Show_AntiDmgBarrier_Cancel','combatLog_Counter_Icon','Game_Battler_gainSilentTp','getAntiDamageBarrierReduction','ShowSubst','call','combatLog_HP_Dmg','Window','_combatLogSilentTp','_combatLog_HistoryFmt','adjustSprite','isCombatLogCommandVisible','_combatLogAccess','parse','Window_Selectable_allowShiftScrolling','max','increaseBuff','addCustomCommands','refreshCombatLog','Window_BattleLog_displayEvasion','_preemptive','StoredLogs','enemyNoDamage','Text_AntiDmgBarrier_Cancel','stbGainInstant','mainMenu','combatLog_%1_%2','map','isPressed','isActorCmdCombatLogVisible','1rcDpDN','IconVictory','IconNoDmgHP','isAccessKeyPressed','setMp','setBackgroundOpacity','battleRefresh','TextBattleSysStbInstant','CombatLogMenu_BgType','initCombatLogAccess','addState','381911fiIjoz','processCursorHomeEndTrigger','buffAdd','64510NXUgCF','actorNoHit','410038XPKQqB','combatLog_BattleCmd_Name','_scene','ShowAddBuff','makeCommandList','scrollTo','height','BIGGER_LINE_HEIGHT','combatLog_Result_Escape','onAntiDamageMpBarrier','createCombatLogWindow','isOpen','CombatLogBypass','Window_BattleLog_displayFailure','STRUCT','addTextToCombatLog','text','getLastWindow','scale','counterAttack','closeCombatLog','isCombatLogCommandEnabled','combatLog_Reflection_Icon','setLastWindow','SCROLL_SPEED_PAGEDN','removeState','BattleManager_updateTurnEnd','combatLogStateChanges','Text_AntiDmgBarrier_Reduce','displayEvasion','addWindow','AutoColor','BattleManager_processDefeat','dimColor1','hotkeyOn','_cancelButton','close','split','Game_Battler_stbGainInstant','Game_Battler_onAntiDamageNullificationBarrier','Window_BattleLog_startTurn','isAnyInputWindowActive','preemptive','escapeFailure','ARRAYEVAL','618553cBMePU','actorDamage','combatLog_EndTurn','combatLog_StartTurn','boxHeight','combatLog_Result_Defeat','_surprise','combatLog_BattleStart','setPartyCmdCombatLogVisible','Game_BattlerBase_getAntiDamageBarrierReduction','onAntiDamageCancelBarrier','Show_AntiDmgBarrier_Absorb','FUNC','Game_Battler_onCtbOrderChange','eraseBuff','return\x200','message2','Game_Battler_onLifeStateEffect','Text_AntiDmgBarrier_MpDisperse','_combatLogs','_partyCommandWindow','ShowSkillMessage1','Window_Selectable_isCursorMovable','IconBattleSysStbInstant','IconMiss','addOriginalCommands','IconEnemyEmerge','combatLog_EndTurn_Icon','_combatLogIndex','onAntiDamageNullificationBarrier','message3','evasion','refreshDimmerBitmap','openness','Show_AntiDmgBarrier_Nullify','width','Window_BattleLog_startAction','Window_BattleLog_displayAction','smoothScrollTo','addHorzLineToCombatLog','cancel','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_tp','processVictory','VisuMZ_1_MainMenuCore','SystemShowCombatLogParty','Text_AntiDmgBarrier_Nullify','Game_BattlerBase_setHp','startTurn','combatLog_Substitute_Icon','processCancel','calcWindowHeight','resetFontSettings','TextEndTurn','openCombatLog','description','=====HORZLINE=====','constructor','setActorCmdCombatLogVisible','Game_BattlerBase_setMp','match','ShowEvade','message1','onLifeStateEffect','Game_Battler_addState','765829aYzOGX','refresh','35igESBG','26991ShiimG','parameters','_combatLog_Latest','decreaseBuff','IconSurprise','combatLogWindowRect','addChild','prototype','ShowEscape','BgSettings','anchor','deactivate','Show_AntiDmgBarrier_MpDisperse','allowShiftScrolling','createBackground','displayCurrentState','ShowAddDebuff','combatLog_Evasion_Icon','combatLog_Surprise_Icon','TextBattleStart','CombatHistoryPrevious','Bypass','_lastWindow','IconReflect','_logWindow','CombatHistory_RectJS','CombatLogAddHorzLine','addCommand','emerge','displaySubstitute','ARRAYFUNC','enemyRecovery','combatLog_TP_NoDmg','_bypassAddToCombatLog','Game_Battler_onAntiDamageMpBarrier','combatLog_StartTurn_Icon','IconHealMP','combatLog_HP_NoDmg','combatLog_Result_Victory','combatLog_Preemptive_Icon','ShowBattleStart','combatLog_CriticalHit_Icon','Window_BattleLog_displayCurrentState','bitmap','IconStartTurn','TextColorDmgTP','magicReflection','startAction','IconDmgTP','fillRect','useItem','Game_Battler_useItem','IconEvade','success','\x5cI[%1]%2','combatLog','push','BypassCombatLog','victory','maxScrollY','ShowTP','_backSprite1','param','combatLog_TP_Heal','select','TextBattleSysAtbInterrupt','combatLog_Miss_Icon','isSceneBattle','setTp','critical','ARRAYJSON','TextColorDmgHP','finishCurrentCombatLog','addCombatLogCommand','IconCritical','onEscapeFailure','SCROLL_SPEED_CURSOR','SystemShowCombatLogMenu','processOk','ShowMP','Game_System_initialize','combatLog_BattleStart_Icon','Window_PartyCommand_makeCommandList','drawHorzLine','ColorNumbers','itemLineRect','iconIndex','onTouchOk','Text_AntiDmgBarrier_Absorb','loadTitle2','onEscapeSuccess','_backSprite2','addChildToBack','dimColor2','activate','defeat','drawItemBackground','isStateAffected','substitute','Enable','ConvertParams','isActor','length','addLoadListener','ShowStateRemove','setBackgroundType','IconPreemptive','Compatibility','startBattle','isTimeActive','Window_PartyCommand_addCustomCommands','ShowStateAdd','popScene','ShowEraseBuff','commandName','\x5cC[%1]%2\x5cC[0]','name','trim','combatLog_Failure_Icon','turnCount','actorLoss','commandCombatLog','enemyNoHit','CombatLogBattle_RectJS','ShowCounter','Game_BattlerBase_increaseBuff','Icon_LifeStateEffects_%1','IconSubst','BattleManager_startBattle','displayCounter','ShowItemMessage','IconHealTP','CombatLogAddText','HORZ_LINE_THICKNESS','Dmg','ShowVictory','smoothScrollUp','SystemShowCombatLogActor','STR','updateCancelButton','BattleManager_endTurn','gainSilentTp','combatLog_MP_NoDmg','createHistoryWindow','IconEscape','Window_BattleLog_addStealText','_combatLogPayment','combatLog_TP_Dmg','IconBattleStart','IconEndTurn','createCustomBackgroundImages','Game_BattlerBase_decreaseBuff','getCombatLog','TextColorNoDmgHP','isCombatLogHotKeyActive','update','COMBATLOG_MAXIMUM_BATTLE_ENTRIES','_actorId','actionFailure','SnapshotOpacity','combatLog_MP_Dmg','displayReflection'];const _0x5b64=function(_0x4cdc7f,_0x254674){_0x4cdc7f=_0x4cdc7f-0xc1;let _0x561ad3=_0x561a[_0x4cdc7f];return _0x561ad3;};const _0x5254d5=_0x5b64;(function(_0x40d4ab,_0x191226){const _0x432a56=_0x5b64;while(!![]){try{const _0x510f8a=parseInt(_0x432a56(0x190))*-parseInt(_0x432a56(0x18f))+-parseInt(_0x432a56(0x11a))*parseInt(_0x432a56(0xef))+-parseInt(_0x432a56(0x18d))+parseInt(_0x432a56(0x11f))+-parseInt(_0x432a56(0x11d))*-parseInt(_0x432a56(0x10f))+-parseInt(_0x432a56(0x14c))+-parseInt(_0x432a56(0x233))*-parseInt(_0x432a56(0x246));if(_0x510f8a===_0x191226)break;else _0x40d4ab['push'](_0x40d4ab['shift']());}catch(_0x99fe25){_0x40d4ab['push'](_0x40d4ab['shift']());}}}(_0x561a,0x775d7));var label=_0x5254d5(0x27a),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x330106){const _0x59d9f5=_0x5254d5;return _0x330106[_0x59d9f5(0xeb)]&&_0x330106[_0x59d9f5(0x183)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x5254d5(0x282)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x5254d5(0x1f4)]=function(_0x447ee0,_0x5515af){const _0x186cd0=_0x5254d5;for(const _0x32cc47 in _0x5515af){if(_0x32cc47[_0x186cd0(0x188)](/(.*):(.*)/i)){const _0x3b1900=String(RegExp['$1']),_0x248791=String(RegExp['$2'])[_0x186cd0(0xd0)]()[_0x186cd0(0x205)]();let _0x31342e,_0x4aff9b,_0x2da345;switch(_0x248791){case'NUM':_0x31342e=_0x5515af[_0x32cc47]!==''?Number(_0x5515af[_0x32cc47]):0x0;break;case _0x186cd0(0xcb):_0x4aff9b=_0x5515af[_0x32cc47]!==''?JSON[_0x186cd0(0xfe)](_0x5515af[_0x32cc47]):[],_0x31342e=_0x4aff9b[_0x186cd0(0x10c)](_0x1a6342=>Number(_0x1a6342));break;case'EVAL':_0x31342e=_0x5515af[_0x32cc47]!==''?eval(_0x5515af[_0x32cc47]):null;break;case _0x186cd0(0x14b):_0x4aff9b=_0x5515af[_0x32cc47]!==''?JSON['parse'](_0x5515af[_0x32cc47]):[],_0x31342e=_0x4aff9b['map'](_0x450594=>eval(_0x450594));break;case'JSON':_0x31342e=_0x5515af[_0x32cc47]!==''?JSON[_0x186cd0(0xfe)](_0x5515af[_0x32cc47]):'';break;case _0x186cd0(0x1d6):_0x4aff9b=_0x5515af[_0x32cc47]!==''?JSON[_0x186cd0(0xfe)](_0x5515af[_0x32cc47]):[],_0x31342e=_0x4aff9b[_0x186cd0(0x10c)](_0x7a43ce=>JSON[_0x186cd0(0xfe)](_0x7a43ce));break;case _0x186cd0(0x158):_0x31342e=_0x5515af[_0x32cc47]!==''?new Function(JSON[_0x186cd0(0xfe)](_0x5515af[_0x32cc47])):new Function(_0x186cd0(0x15b));break;case _0x186cd0(0x1ae):_0x4aff9b=_0x5515af[_0x32cc47]!==''?JSON['parse'](_0x5515af[_0x32cc47]):[],_0x31342e=_0x4aff9b['map'](_0x197d5a=>new Function(JSON[_0x186cd0(0xfe)](_0x197d5a)));break;case _0x186cd0(0x21a):_0x31342e=_0x5515af[_0x32cc47]!==''?String(_0x5515af[_0x32cc47]):'';break;case'ARRAYSTR':_0x4aff9b=_0x5515af[_0x32cc47]!==''?JSON[_0x186cd0(0xfe)](_0x5515af[_0x32cc47]):[],_0x31342e=_0x4aff9b['map'](_0x29aef2=>String(_0x29aef2));break;case _0x186cd0(0x12d):_0x2da345=_0x5515af[_0x32cc47]!==''?JSON[_0x186cd0(0xfe)](_0x5515af[_0x32cc47]):{},_0x31342e=VisuMZ[_0x186cd0(0x1f4)]({},_0x2da345);break;case'ARRAYSTRUCT':_0x4aff9b=_0x5515af[_0x32cc47]!==''?JSON[_0x186cd0(0xfe)](_0x5515af[_0x32cc47]):[],_0x31342e=_0x4aff9b[_0x186cd0(0x10c)](_0x339c7a=>VisuMZ['ConvertParams']({},JSON[_0x186cd0(0xfe)](_0x339c7a)));break;default:continue;}_0x447ee0[_0x3b1900]=_0x31342e;}}return _0x447ee0;},(_0xba31ec=>{const _0x561139=_0x5254d5,_0x5cf412=_0xba31ec[_0x561139(0x204)];for(const _0x3041c6 of dependencies){if(!Imported[_0x3041c6]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x561139(0x25c)](_0x5cf412,_0x3041c6)),SceneManager['exit']();break;}}const _0x4b555c=_0xba31ec['description'];if(_0x4b555c[_0x561139(0x188)](/\[Version[ ](.*?)\]/i)){const _0x461430=Number(RegExp['$1']);_0x461430!==VisuMZ[label]['version']&&(alert(_0x561139(0x175)['format'](_0x5cf412,_0x461430)),SceneManager[_0x561139(0x27f)]());}if(_0x4b555c[_0x561139(0x188)](/\[Tier[ ](\d+)\]/i)){const _0x4126d1=Number(RegExp['$1']);_0x4126d1<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x5cf412,_0x4126d1,tier)),SceneManager[_0x561139(0x27f)]()):tier=Math[_0x561139(0x100)](_0x4126d1,tier);}VisuMZ[_0x561139(0x1f4)](VisuMZ[label][_0x561139(0x282)],_0xba31ec[_0x561139(0x191)]);})(pluginData),PluginManager[_0x5254d5(0xee)](pluginData['name'],_0x5254d5(0x214),_0x18a2e4=>{const _0x5a10f2=_0x5254d5;VisuMZ[_0x5a10f2(0x1f4)](_0x18a2e4,_0x18a2e4);const _0xd3a85e=_0x18a2e4['Text'],_0x49ad36=_0x18a2e4[_0x5a10f2(0xca)];$gameSystem[_0x5a10f2(0x12e)](_0xd3a85e,_0x49ad36);}),PluginManager['registerCommand'](pluginData[_0x5254d5(0x204)],_0x5254d5(0x1aa),_0xda9a01=>{const _0x25cf3b=_0x5254d5;VisuMZ[_0x25cf3b(0x1f4)](_0xda9a01,_0xda9a01),$gameSystem[_0x25cf3b(0x173)]();}),PluginManager['registerCommand'](pluginData['name'],_0x5254d5(0x12b),_0x2e70e5=>{const _0xfce51c=_0x5254d5;VisuMZ[_0xfce51c(0x1f4)](_0x2e70e5,_0x2e70e5);const _0x4f2972=_0x2e70e5[_0xfce51c(0x1a5)];$gameSystem[_0xfce51c(0x29d)](_0x4f2972);}),PluginManager['registerCommand'](pluginData[_0x5254d5(0x204)],_0x5254d5(0x234),_0x2218bc=>{const _0x548b4a=_0x5254d5;VisuMZ[_0x548b4a(0x1f4)](_0x2218bc,_0x2218bc);const _0x2a59d9=_0x2218bc[_0x548b4a(0x1f3)];$gameSystem[_0x548b4a(0xdb)](_0x2a59d9);}),PluginManager[_0x5254d5(0xee)](pluginData['name'],_0x5254d5(0x1dd),_0x486bc5=>{const _0x3cc93e=_0x5254d5;VisuMZ[_0x3cc93e(0x1f4)](_0x486bc5,_0x486bc5);const _0x680a7c=_0x486bc5['Show'];$gameSystem['setMainMenuCombatLogVisible'](_0x680a7c);}),PluginManager[_0x5254d5(0xee)](pluginData['name'],_0x5254d5(0x179),_0x2444b3=>{const _0x13f628=_0x5254d5;VisuMZ[_0x13f628(0x1f4)](_0x2444b3,_0x2444b3);const _0x2f7b36=_0x2444b3['Show'];$gameSystem[_0x13f628(0x154)](_0x2f7b36);}),PluginManager['registerCommand'](pluginData['name'],_0x5254d5(0x219),_0x3d4e97=>{const _0x4966a6=_0x5254d5;VisuMZ[_0x4966a6(0x1f4)](_0x3d4e97,_0x3d4e97);const _0x427efb=_0x3d4e97[_0x4966a6(0x245)];$gameSystem[_0x4966a6(0x186)](_0x427efb);}),VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x298)]={'BypassCombatLog':/<BYPASS COMBAT LOG>/i},ImageManager['combatLog_BattleCmd_Icon']=VisuMZ[_0x5254d5(0x27a)]['Settings']['General']['Icon'],ImageManager[_0x5254d5(0x1e1)]=VisuMZ[_0x5254d5(0x27a)]['Settings'][_0x5254d5(0x27a)][_0x5254d5(0x224)],ImageManager['combatLog_EnemyEmerge_Icon']=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0x27a)][_0x5254d5(0x166)],ImageManager['combatLog_Preemptive_Icon']=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0x27a)][_0x5254d5(0x1fa)],ImageManager[_0x5254d5(0x1a2)]=VisuMZ['CombatLog'][_0x5254d5(0x282)][_0x5254d5(0x27a)][_0x5254d5(0x194)],ImageManager[_0x5254d5(0x1b3)]=VisuMZ['CombatLog']['Settings'][_0x5254d5(0x27a)][_0x5254d5(0x1bc)],ImageManager[_0x5254d5(0x167)]=VisuMZ['CombatLog']['Settings'][_0x5254d5(0x27a)][_0x5254d5(0x225)],ImageManager[_0x5254d5(0x1b6)]=VisuMZ[_0x5254d5(0x27a)]['Settings'][_0x5254d5(0x27a)][_0x5254d5(0x110)],ImageManager['combatLog_Result_Escape']=VisuMZ['CombatLog']['Settings']['CombatLog'][_0x5254d5(0x220)],ImageManager[_0x5254d5(0x151)]=VisuMZ[_0x5254d5(0x27a)]['Settings'][_0x5254d5(0x27a)][_0x5254d5(0x26a)],ImageManager[_0x5254d5(0xf2)]=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0x27a)]['IconCounter'],ImageManager[_0x5254d5(0x135)]=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)]['CombatLog'][_0x5254d5(0x1a7)],ImageManager['combatLog_Substitute_Icon']=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0x27a)][_0x5254d5(0x20f)],ImageManager['combatLog_Failure_Icon']=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0x27a)][_0x5254d5(0x28e)],ImageManager['combatLog_CriticalHit_Icon']=VisuMZ['CombatLog'][_0x5254d5(0x282)]['CombatLog'][_0x5254d5(0x1da)],ImageManager[_0x5254d5(0x1d2)]=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)]['CombatLog'][_0x5254d5(0x164)],ImageManager[_0x5254d5(0x1a1)]=VisuMZ[_0x5254d5(0x27a)]['Settings']['CombatLog'][_0x5254d5(0x1c4)],ImageManager['combatLog_HP_Heal']=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0x27a)][_0x5254d5(0xea)],ImageManager[_0x5254d5(0xf7)]=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0x27a)][_0x5254d5(0xcd)],ImageManager[_0x5254d5(0x1b5)]=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0x27a)][_0x5254d5(0x111)],ImageManager[_0x5254d5(0x28f)]=VisuMZ['CombatLog'][_0x5254d5(0x282)]['CombatLog'][_0x5254d5(0x1b4)],ImageManager[_0x5254d5(0x230)]=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)]['CombatLog'][_0x5254d5(0x255)],ImageManager['combatLog_MP_NoDmg']=VisuMZ['CombatLog'][_0x5254d5(0x282)]['CombatLog'][_0x5254d5(0x261)],ImageManager[_0x5254d5(0x1cf)]=VisuMZ[_0x5254d5(0x27a)]['Settings'][_0x5254d5(0x27a)][_0x5254d5(0x213)],ImageManager[_0x5254d5(0x223)]=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)]['CombatLog'][_0x5254d5(0x1c0)],ImageManager[_0x5254d5(0x1b0)]=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0x27a)][_0x5254d5(0xc8)],TextManager[_0x5254d5(0x120)]=VisuMZ['CombatLog'][_0x5254d5(0x282)][_0x5254d5(0xe4)]['Name'],TextManager[_0x5254d5(0x153)]=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0x27a)][_0x5254d5(0x1a3)],TextManager[_0x5254d5(0x14f)]=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0x27a)]['TextStartTurn'],TextManager['combatLog_EndTurn']=VisuMZ['CombatLog']['Settings'][_0x5254d5(0x27a)][_0x5254d5(0x181)],TextManager[_0x5254d5(0x192)]=VisuMZ['CombatLog'][_0x5254d5(0x282)][_0x5254d5(0xf8)][_0x5254d5(0xd3)],TextManager[_0x5254d5(0xfa)]=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0xf8)][_0x5254d5(0x1a4)],ColorManager['combatLog_HP_Heal']=VisuMZ[_0x5254d5(0x27a)]['Settings'][_0x5254d5(0x27a)][_0x5254d5(0x26e)],ColorManager[_0x5254d5(0xf7)]=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0x27a)][_0x5254d5(0x1d7)],ColorManager[_0x5254d5(0x1b5)]=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0x27a)][_0x5254d5(0x229)],ColorManager[_0x5254d5(0x28f)]=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0x27a)][_0x5254d5(0x284)],ColorManager['combatLog_MP_Dmg']=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0x27a)]['TextColorDmgMP'],ColorManager['combatLog_MP_NoDmg']=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0x27a)]['IconNoDmgMP'],ColorManager[_0x5254d5(0x1cf)]=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0x27a)][_0x5254d5(0x290)],ColorManager['combatLog_TP_Dmg']=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0x27a)][_0x5254d5(0x1bd)],ColorManager[_0x5254d5(0x1b0)]=VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x282)][_0x5254d5(0x27a)][_0x5254d5(0x29e)],ColorManager[_0x5254d5(0xf0)]=function(_0x18cd28,_0x33a90a){const _0x399619=_0x5254d5;if(!VisuMZ['CombatLog'][_0x399619(0x282)][_0x399619(0x27a)][_0x399619(0x1e4)])return Math[_0x399619(0xdc)](_0x33a90a);const _0x483952=_0x399619(0x10b);let _0x6eabf8;if(_0x33a90a>0x0)_0x6eabf8=_0x483952['format'](_0x18cd28,_0x399619(0x277));else _0x33a90a===0x0?_0x6eabf8=_0x483952[_0x399619(0x25c)](_0x18cd28,'NoDmg'):_0x6eabf8=_0x483952['format'](_0x18cd28,_0x399619(0x216));return _0x33a90a=Math[_0x399619(0xdc)](_0x33a90a),ColorManager[_0x6eabf8]?_0x399619(0x203)[_0x399619(0x25c)](ColorManager[_0x6eabf8],_0x33a90a):_0x33a90a;},SceneManager[_0x5254d5(0x1d3)]=function(){const _0x40bba8=_0x5254d5;return this[_0x40bba8(0x121)]&&this['_scene'][_0x40bba8(0x185)]===Scene_Battle;},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x210)]=BattleManager[_0x5254d5(0x1fc)],BattleManager['startBattle']=function(){const _0xf1e2b3=_0x5254d5;VisuMZ[_0xf1e2b3(0x27a)][_0xf1e2b3(0x210)][_0xf1e2b3(0xf6)](this),this[_0xf1e2b3(0x2a2)]();},BattleManager['startBattleCombatLog']=function(){const _0x55fe2e=_0x5254d5,_0x431b64=VisuMZ['CombatLog'][_0x55fe2e(0x282)][_0x55fe2e(0x27a)];if(_0x431b64[_0x55fe2e(0x1b8)]){$gameSystem[_0x55fe2e(0x1d8)](),$gameSystem[_0x55fe2e(0x29d)](![]),$gameSystem[_0x55fe2e(0x173)]();let _0x5da5de=TextManager[_0x55fe2e(0x153)],_0x4c9e47=ImageManager[_0x55fe2e(0x1e1)];$gameSystem['addTextToCombatLog'](_0x5da5de,_0x4c9e47),$gameSystem[_0x55fe2e(0x173)]();}if(_0x431b64['ShowEnemyEmerge'])for(const _0x30998c of $gameTroop[_0x55fe2e(0x265)]()){let _0x1f663d=TextManager[_0x55fe2e(0x1ac)][_0x55fe2e(0x25c)](_0x30998c[_0x55fe2e(0xd9)]()),_0x22802d=ImageManager[_0x55fe2e(0x26b)];$gameSystem[_0x55fe2e(0x12e)](_0x1f663d,_0x22802d);}if(_0x431b64['ShowAdvantages']){if(this[_0x55fe2e(0x105)]){let _0x416dfc=TextManager[_0x55fe2e(0x149)][_0x55fe2e(0x25c)]($gameParty[_0x55fe2e(0xd9)]()),_0xc8e0c6=ImageManager[_0x55fe2e(0x1b7)];$gameSystem[_0x55fe2e(0x12e)](_0x416dfc,_0xc8e0c6);}else{if(this[_0x55fe2e(0x152)]){let _0x5a3ed3=TextManager[_0x55fe2e(0xe7)][_0x55fe2e(0x25c)]($gameParty[_0x55fe2e(0xd9)]()),_0x1eb380=ImageManager[_0x55fe2e(0x1a2)];$gameSystem[_0x55fe2e(0x12e)](_0x5a3ed3,_0x1eb380);}}}},VisuMZ[_0x5254d5(0x27a)]['BattleManager_endTurn']=BattleManager[_0x5254d5(0x27d)],BattleManager['endTurn']=function(){const _0x2f0dd9=_0x5254d5;if($gameTroop[_0x2f0dd9(0x207)]()>0x0&&VisuMZ[_0x2f0dd9(0x27a)][_0x2f0dd9(0x282)]['CombatLog']['ShowEndTurn']){$gameSystem[_0x2f0dd9(0x173)]();let _0x375271=TextManager[_0x2f0dd9(0x14e)]['format']($gameTroop[_0x2f0dd9(0x207)]()),_0x391b11=ImageManager[_0x2f0dd9(0x167)];$gameSystem['addTextToCombatLog'](_0x375271,_0x391b11),$gameSystem[_0x2f0dd9(0x173)]();}VisuMZ[_0x2f0dd9(0x27a)][_0x2f0dd9(0x21c)][_0x2f0dd9(0xf6)](this);},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x139)]=BattleManager[_0x5254d5(0x258)],BattleManager['updateTurnEnd']=function(){const _0x47fbc3=_0x5254d5;VisuMZ[_0x47fbc3(0x27a)][_0x47fbc3(0x139)][_0x47fbc3(0xf6)](this);if(this['isTpb']()&&VisuMZ[_0x47fbc3(0x27a)][_0x47fbc3(0x282)][_0x47fbc3(0x27a)][_0x47fbc3(0xec)]&&$gameTroop[_0x47fbc3(0x207)]()>0x0){$gameSystem[_0x47fbc3(0x173)]();let _0x44c1c8=TextManager[_0x47fbc3(0x14f)][_0x47fbc3(0x25c)]($gameTroop['turnCount']()),_0x7fd81f=ImageManager['combatLog_StartTurn_Icon'];$gameSystem[_0x47fbc3(0x12e)](_0x44c1c8,_0x7fd81f);}},VisuMZ[_0x5254d5(0x27a)]['BattleManager_processVictory']=BattleManager['processVictory'],BattleManager[_0x5254d5(0x177)]=function(){const _0xf9080e=_0x5254d5;$gameSystem[_0xf9080e(0x29d)](!![]),VisuMZ[_0xf9080e(0x27a)]['BattleManager_processVictory'][_0xf9080e(0xf6)](this),$gameSystem['setBypassCombatLog'](![]);if(VisuMZ[_0xf9080e(0x27a)]['Settings']['CombatLog'][_0xf9080e(0x217)]){$gameSystem[_0xf9080e(0x173)]();let _0x588de2=TextManager[_0xf9080e(0x1ca)][_0xf9080e(0x25c)]($gameParty['combatLogName']()),_0x41d603=ImageManager[_0xf9080e(0x1b6)];$gameSystem['addTextToCombatLog'](_0x588de2,_0x41d603),$gameSystem[_0xf9080e(0x173)]();}},VisuMZ['CombatLog']['BattleManager_processAbort']=BattleManager[_0x5254d5(0x271)],BattleManager[_0x5254d5(0x271)]=function(){const _0x4e05b7=_0x5254d5;$gameSystem[_0x4e05b7(0x29d)](!![]),VisuMZ[_0x4e05b7(0x27a)][_0x4e05b7(0x293)][_0x4e05b7(0xf6)](this),$gameSystem[_0x4e05b7(0x29d)](![]),$gameSystem['addHorzLineToCombatLog']();},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x24e)]=BattleManager[_0x5254d5(0x1ea)],BattleManager[_0x5254d5(0x1ea)]=function(){const _0x1612df=_0x5254d5;VisuMZ['CombatLog'][_0x1612df(0x24e)][_0x1612df(0xf6)](this);if(VisuMZ['CombatLog'][_0x1612df(0x282)][_0x1612df(0x27a)][_0x1612df(0x198)]){$gameSystem[_0x1612df(0x173)]();let _0xb6a1c4=TextManager['escapeStart'][_0x1612df(0x25c)]($gameParty[_0x1612df(0xd9)]()),_0x3c1f22=ImageManager['combatLog_Result_Escape'];$gameSystem[_0x1612df(0x12e)](_0xb6a1c4,_0x3c1f22),$gameSystem[_0x1612df(0x173)]();}},VisuMZ[_0x5254d5(0x27a)]['BattleManager_onEscapeFailure']=BattleManager['onEscapeFailure'],BattleManager[_0x5254d5(0x1db)]=function(){const _0xfacefe=_0x5254d5;VisuMZ[_0xfacefe(0x27a)]['BattleManager_onEscapeFailure'][_0xfacefe(0xf6)](this);if(VisuMZ[_0xfacefe(0x27a)][_0xfacefe(0x282)][_0xfacefe(0x27a)]['ShowEscape']){$gameSystem[_0xfacefe(0x173)]();let _0x1077f1=TextManager[_0xfacefe(0x278)][_0xfacefe(0x25c)]($gameParty[_0xfacefe(0xd9)]()),_0x15dc90=ImageManager[_0xfacefe(0x127)];$gameSystem['addTextToCombatLog'](_0x1077f1,_0x15dc90),$gameSystem[_0xfacefe(0x12e)](TextManager[_0xfacefe(0x14a)],_0x15dc90),$gameSystem[_0xfacefe(0x173)]();}},VisuMZ[_0x5254d5(0x27a)]['BattleManager_processDefeat']=BattleManager[_0x5254d5(0x263)],BattleManager[_0x5254d5(0x263)]=function(){const _0xb87c83=_0x5254d5;VisuMZ[_0xb87c83(0x27a)][_0xb87c83(0x13f)]['call'](this);if(VisuMZ[_0xb87c83(0x27a)]['Settings'][_0xb87c83(0x27a)]['ShowDefeat']){$gameSystem[_0xb87c83(0x173)]();let _0x59210f=TextManager[_0xb87c83(0x1ef)]['format']($gameParty[_0xb87c83(0xd9)]()),_0x430e35=ImageManager[_0xb87c83(0x151)];$gameSystem['addTextToCombatLog'](_0x59210f,_0x430e35),$gameSystem[_0xb87c83(0x173)]();}},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x1e0)]=Game_System[_0x5254d5(0x197)][_0x5254d5(0x252)],Game_System[_0x5254d5(0x197)][_0x5254d5(0x252)]=function(){const _0x14c85f=_0x5254d5;VisuMZ[_0x14c85f(0x27a)][_0x14c85f(0x1e0)][_0x14c85f(0xf6)](this),this[_0x14c85f(0x274)](),this['initCombatLogAccess']();},Game_System[_0x5254d5(0x22c)]=VisuMZ['CombatLog'][_0x5254d5(0x282)][_0x5254d5(0xe4)][_0x5254d5(0x106)]??0x5,Game_System['prototype'][_0x5254d5(0x274)]=function(){const _0x56c5fa=_0x5254d5;this[_0x56c5fa(0x15f)]=[],this[_0x56c5fa(0x1b1)]=![];},Game_System[_0x5254d5(0x197)][_0x5254d5(0x228)]=function(_0x4ca4d6){const _0x50e180=_0x5254d5;if(this[_0x50e180(0x15f)]===undefined)this[_0x50e180(0x274)]();return _0x4ca4d6=_0x4ca4d6||0x0,this[_0x50e180(0x15f)][_0x4ca4d6]=this[_0x50e180(0x15f)][_0x4ca4d6]||[],this[_0x50e180(0x15f)][_0x4ca4d6];},Game_System[_0x5254d5(0x197)][_0x5254d5(0x12e)]=function(_0x114720,_0x2795c9){const _0x2f5050=_0x5254d5;if(this[_0x2f5050(0x28c)]())return;if(!_0x114720)return;_0x2795c9=_0x2795c9||0x0,_0x114720=VisuMZ['CombatLog'][_0x2f5050(0x24b)](_0x114720);const _0x39a1b7=this[_0x2f5050(0x228)](),_0x35708b=_0x114720[_0x2f5050(0x144)]('\x0a');while(_0x35708b[_0x2f5050(0x1f6)]>0x0){let _0xf10296=_0x35708b[_0x2f5050(0xc3)]();VisuMZ[_0x2f5050(0x27a)][_0x2f5050(0x282)][_0x2f5050(0x27a)][_0x2f5050(0x26f)]&&(_0xf10296='\x5cI[%1]%2'[_0x2f5050(0x25c)](_0x2795c9,_0xf10296)),_0x2795c9=0x0,_0x39a1b7[_0x2f5050(0x1c8)](_0xf10296);}this['refreshCombatLog']();},Game_System[_0x5254d5(0x197)][_0x5254d5(0x173)]=function(){const _0x1b83ce=_0x5254d5;if(this['isBypassCombatLog']())return;const _0xe90f5a=this[_0x1b83ce(0x228)](),_0x177d09=_0xe90f5a[_0xe90f5a['length']-0x1];if(_0x177d09===_0x1b83ce(0x184))return;_0xe90f5a[_0x1b83ce(0x1c8)](_0x1b83ce(0x184)),this[_0x1b83ce(0x103)]();},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x24b)]=function(_0x2ba5b5){const _0x540e5e=_0x5254d5;while(_0x2ba5b5['match'](/\\V\[(\d+)\]/gi)){_0x2ba5b5=_0x2ba5b5[_0x540e5e(0x240)](/\\V\[(\d+)\]/gi,(_0x36ee99,_0x39457c)=>$gameVariables['value'](parseInt(_0x39457c)));}return _0x2ba5b5;},Game_System[_0x5254d5(0x197)][_0x5254d5(0x1d8)]=function(){const _0x48cde0=_0x5254d5;if(this[_0x48cde0(0x15f)]===undefined)this[_0x48cde0(0x274)]();this['_combatLogs'][_0x48cde0(0x280)]([]);while(this[_0x48cde0(0x15f)][_0x48cde0(0x1f6)]>Game_System[_0x48cde0(0x22c)]){this[_0x48cde0(0x15f)][_0x48cde0(0xc4)]();}},Game_System[_0x5254d5(0x197)][_0x5254d5(0x276)]=function(){const _0x2acc77=_0x5254d5;if(this['_combatLogs']===undefined)this[_0x2acc77(0x274)]();return this[_0x2acc77(0x15f)][_0x2acc77(0x1f6)];},Game_System[_0x5254d5(0x197)][_0x5254d5(0x28c)]=function(){const _0x103ff7=_0x5254d5;if(this[_0x103ff7(0x1b1)]===undefined)this[_0x103ff7(0x274)]();return this[_0x103ff7(0x1b1)];},Game_System[_0x5254d5(0x197)]['setBypassCombatLog']=function(_0x4fefaf){const _0xcc53=_0x5254d5;if(this[_0xcc53(0x1b1)]===undefined)this[_0xcc53(0x274)]();this['_bypassAddToCombatLog']=_0x4fefaf;;},Game_System['prototype']['refreshCombatLog']=function(){const _0x56cbe5=_0x5254d5;if(!SceneManager[_0x56cbe5(0x1d3)]())return;const _0x25c4ae=SceneManager[_0x56cbe5(0x121)][_0x56cbe5(0xe3)];_0x25c4ae&&_0x25c4ae[_0x56cbe5(0x115)]();},Game_System[_0x5254d5(0x197)][_0x5254d5(0x118)]=function(){const _0x597b37=_0x5254d5,_0x32f727=VisuMZ['CombatLog'][_0x597b37(0x282)]['General'];this['_combatLogAccess']={'mainMenu':_0x32f727[_0x597b37(0x232)],'partyCmd':_0x32f727[_0x597b37(0xcc)],'actorCmd':_0x32f727['ShowActorCommand'],'hotkeyOn':!![]};},Game_System[_0x5254d5(0x197)][_0x5254d5(0xde)]=function(){const _0x4f7742=_0x5254d5;if(this[_0x4f7742(0xfd)]===undefined)this['initCombatLogAccess']();return this[_0x4f7742(0xfd)][_0x4f7742(0x10a)];},Game_System[_0x5254d5(0x197)][_0x5254d5(0x244)]=function(){const _0xa7ef73=_0x5254d5;if(this['_combatLogs']===undefined)this[_0xa7ef73(0x274)]();return this[_0xa7ef73(0x276)]()>0x0;},Game_System[_0x5254d5(0x197)]['setMainMenuCombatLogVisible']=function(_0x2f05aa){const _0x477e42=_0x5254d5;if(this['_combatLogAccess']===undefined)this[_0x477e42(0x118)]();this['_combatLogAccess'][_0x477e42(0x10a)]=_0x2f05aa;},Game_System[_0x5254d5(0x197)][_0x5254d5(0xd2)]=function(){const _0x4b2f07=_0x5254d5;if(this['_combatLogAccess']===undefined)this['initCombatLogAccess']();return this[_0x4b2f07(0xfd)]['partyCmd'];},Game_System['prototype'][_0x5254d5(0x154)]=function(_0x7d93a6){const _0x3cc920=_0x5254d5;if(this[_0x3cc920(0xfd)]===undefined)this[_0x3cc920(0x118)]();this[_0x3cc920(0xfd)]['partyCmd']=_0x7d93a6;},Game_System['prototype'][_0x5254d5(0x10e)]=function(){const _0x4938ce=_0x5254d5;if(this[_0x4938ce(0xfd)]===undefined)this[_0x4938ce(0x118)]();return this[_0x4938ce(0xfd)][_0x4938ce(0xd5)];},Game_System[_0x5254d5(0x197)][_0x5254d5(0x186)]=function(_0x5be690){const _0x43735a=_0x5254d5;if(this[_0x43735a(0xfd)]===undefined)this[_0x43735a(0x118)]();this[_0x43735a(0xfd)]['actorCmd']=_0x5be690;},Game_System[_0x5254d5(0x197)][_0x5254d5(0x22a)]=function(){const _0x3b057f=_0x5254d5;if(this[_0x3b057f(0xfd)]===undefined)this['initCombatLogAccess']();return this['_combatLogAccess'][_0x3b057f(0x141)];},Game_System[_0x5254d5(0x197)]['setCombatLogHotKeyActive']=function(_0x1bb3dd){const _0xaa984=_0x5254d5;if(this[_0xaa984(0xfd)]===undefined)this[_0xaa984(0x118)]();this[_0xaa984(0xfd)][_0xaa984(0x141)]=_0x1bb3dd;},VisuMZ['CombatLog'][_0x5254d5(0x17b)]=Game_BattlerBase[_0x5254d5(0x197)][_0x5254d5(0x289)],Game_BattlerBase['prototype'][_0x5254d5(0x289)]=function(_0x162480){const _0x1c073b=_0x5254d5,_0x11101e=this['_hp'];VisuMZ[_0x1c073b(0x27a)]['Game_BattlerBase_setHp'][_0x1c073b(0xf6)](this,_0x162480);if(!SceneManager['isSceneBattle']())return;if(this[_0x1c073b(0x222)])return;if(!VisuMZ[_0x1c073b(0x27a)]['Settings']['CombatLog'][_0x1c073b(0xdf)])return;const _0x4d17a3=_0x162480;let _0x3555cc,_0x2a2f41,_0x4670ff=_0x4d17a3-_0x11101e;if(_0x4d17a3>_0x11101e)_0x3555cc=this[_0x1c073b(0x1f5)]()?TextManager[_0x1c073b(0x26d)]:TextManager[_0x1c073b(0xd6)],_0x2a2f41=ImageManager[_0x1c073b(0x285)];else _0x4d17a3===_0x11101e?(_0x3555cc=this[_0x1c073b(0x1f5)]()?TextManager[_0x1c073b(0x29a)]:TextManager[_0x1c073b(0x107)],_0x2a2f41=ImageManager['combatLog_HP_NoDmg']):(_0x3555cc=this[_0x1c073b(0x1f5)]()?TextManager[_0x1c073b(0x14d)]:TextManager[_0x1c073b(0xd6)],_0x2a2f41=ImageManager['combatLog_HP_Dmg']);_0x4670ff=ColorManager[_0x1c073b(0xf0)]('HP',_0x4670ff);let _0x11dc61=_0x3555cc[_0x1c073b(0x25c)](this[_0x1c073b(0xd9)](),_0x4670ff,TextManager['hp']);$gameSystem['addTextToCombatLog'](_0x11dc61,_0x2a2f41);},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x187)]=Game_BattlerBase[_0x5254d5(0x197)][_0x5254d5(0x113)],Game_BattlerBase[_0x5254d5(0x197)]['setMp']=function(_0x1c3842){const _0x1aea99=_0x5254d5,_0x323d62=this['_mp'];VisuMZ[_0x1aea99(0x27a)][_0x1aea99(0x187)][_0x1aea99(0xf6)](this,_0x1c3842);if(!SceneManager['isSceneBattle']())return;if(this['_combatLogPayment'])return;if(!VisuMZ[_0x1aea99(0x27a)][_0x1aea99(0x282)][_0x1aea99(0x27a)][_0x1aea99(0x1df)])return;const _0xdb50f=_0x1c3842;let _0x42d6f7,_0x3f41b6,_0x1b98f3=_0xdb50f-_0x323d62;if(_0xdb50f>_0x323d62)_0x42d6f7=this[_0x1aea99(0x1f5)]()?TextManager[_0x1aea99(0x26d)]:TextManager[_0x1aea99(0x1af)],_0x3f41b6=ImageManager[_0x1aea99(0x28f)];else _0xdb50f===_0x323d62?(_0x42d6f7=this[_0x1aea99(0x1f5)]()?TextManager[_0x1aea99(0x208)]:TextManager[_0x1aea99(0xda)],_0x3f41b6=ImageManager[_0x1aea99(0x21e)]):(_0x42d6f7=this[_0x1aea99(0x1f5)]()?TextManager[_0x1aea99(0x208)]:TextManager[_0x1aea99(0xda)],_0x3f41b6=ImageManager[_0x1aea99(0x230)]);_0x1b98f3=ColorManager[_0x1aea99(0xf0)]('MP',_0x1b98f3);let _0x125d83=_0x42d6f7[_0x1aea99(0x25c)](this['combatLogName'](),_0x1b98f3,TextManager['mp']);$gameSystem[_0x1aea99(0x12e)](_0x125d83,_0x3f41b6);},VisuMZ['CombatLog'][_0x5254d5(0x27e)]=Game_BattlerBase[_0x5254d5(0x197)][_0x5254d5(0x1d4)],Game_BattlerBase[_0x5254d5(0x197)][_0x5254d5(0x1d4)]=function(_0x27d82d){const _0x4c6cca=_0x5254d5,_0x380dc1=this[_0x4c6cca(0x176)];VisuMZ[_0x4c6cca(0x27a)][_0x4c6cca(0x27e)][_0x4c6cca(0xf6)](this,_0x27d82d);if(!SceneManager[_0x4c6cca(0x1d3)]())return;if(this['_combatLogPayment'])return;if(this[_0x4c6cca(0xf9)])return;if(!VisuMZ[_0x4c6cca(0x27a)][_0x4c6cca(0x282)][_0x4c6cca(0x27a)][_0x4c6cca(0x1cc)])return;const _0x469eff=_0x27d82d;let _0x29019b,_0x123b73,_0x3f5808=_0x469eff-_0x380dc1;if(_0x469eff>_0x380dc1)_0x29019b=this[_0x4c6cca(0x1f5)]()?TextManager[_0x4c6cca(0x26d)]:TextManager['enemyRecovery'],_0x123b73=ImageManager[_0x4c6cca(0x1cf)];else _0x469eff===_0x380dc1?(_0x29019b=this['isActor']()?TextManager[_0x4c6cca(0x208)]:TextManager[_0x4c6cca(0xda)],_0x123b73=ImageManager[_0x4c6cca(0x1b0)]):(_0x29019b=this[_0x4c6cca(0x1f5)]()?TextManager['actorLoss']:TextManager[_0x4c6cca(0xda)],_0x123b73=ImageManager['combatLog_TP_Dmg']);_0x3f5808=ColorManager['applyCombatLogColor']('TP',_0x3f5808);let _0x5c8be4=_0x29019b[_0x4c6cca(0x25c)](this['combatLogName'](),_0x3f5808,TextManager['tp']);$gameSystem[_0x4c6cca(0x12e)](_0x5c8be4,_0x123b73);},VisuMZ[_0x5254d5(0x27a)]['Game_Battler_gainSilentTp']=Game_Battler[_0x5254d5(0x197)][_0x5254d5(0x21d)],Game_Battler[_0x5254d5(0x197)][_0x5254d5(0x21d)]=function(_0x5e1bc7){const _0x4a01c0=_0x5254d5;this[_0x4a01c0(0xf9)]=!![],VisuMZ[_0x4a01c0(0x27a)][_0x4a01c0(0xf3)][_0x4a01c0(0xf6)](this,_0x5e1bc7),this[_0x4a01c0(0xf9)]=![];},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x1c3)]=Game_Battler[_0x5254d5(0x197)][_0x5254d5(0x1c2)],Game_Battler[_0x5254d5(0x197)]['useItem']=function(_0xdfd8c){const _0x4ae9d9=_0x5254d5;this['_combatLogPayment']=!![],VisuMZ[_0x4ae9d9(0x27a)][_0x4ae9d9(0x1c3)]['call'](this,_0xdfd8c),this[_0x4ae9d9(0x222)]=![];},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x18c)]=Game_Battler[_0x5254d5(0x197)][_0x5254d5(0x119)],Game_Battler[_0x5254d5(0x197)][_0x5254d5(0x119)]=function(_0x6efbee){const _0xe8a0b8=_0x5254d5,_0x405697=this[_0xe8a0b8(0x1f1)](_0x6efbee);VisuMZ[_0xe8a0b8(0x27a)]['Game_Battler_addState'][_0xe8a0b8(0xf6)](this,_0x6efbee);const _0x5dd44a=this['isStateAffected'](_0x6efbee);this['combatLogStateChanges'](_0x6efbee,_0x405697,_0x5dd44a);},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0xd1)]=Game_Battler['prototype'][_0x5254d5(0x138)],Game_Battler['prototype'][_0x5254d5(0x138)]=function(_0x4a674e){const _0x369b0a=_0x5254d5,_0x437453=this[_0x369b0a(0x1f1)](_0x4a674e);VisuMZ[_0x369b0a(0x27a)][_0x369b0a(0xd1)][_0x369b0a(0xf6)](this,_0x4a674e);const _0xfede7f=this[_0x369b0a(0x1f1)](_0x4a674e);this[_0x369b0a(0x13a)](_0x4a674e,_0x437453,_0xfede7f);},Game_Battler[_0x5254d5(0x197)][_0x5254d5(0x13a)]=function(_0x468be9,_0x59e54d,_0x151f96){const _0x2adb7d=_0x5254d5;if(!SceneManager[_0x2adb7d(0x1d3)]())return;const _0x5cdec8=$dataStates[_0x468be9];if(!_0x5cdec8)return;if(_0x5cdec8[_0x2adb7d(0x296)][_0x2adb7d(0x188)](VisuMZ[_0x2adb7d(0x27a)][_0x2adb7d(0x298)][_0x2adb7d(0x1c9)]))return;const _0x3704f3=VisuMZ[_0x2adb7d(0x27a)][_0x2adb7d(0x282)][_0x2adb7d(0x27a)];if(!_0x59e54d&&_0x151f96){let _0x1a217a=this[_0x2adb7d(0x1f5)]()?_0x5cdec8['message1']:_0x5cdec8[_0x2adb7d(0x15c)];if(_0x1a217a&&_0x3704f3[_0x2adb7d(0x1ff)]){let _0x41bb26=_0x1a217a['format'](this[_0x2adb7d(0xd9)]()),_0x1161e8=_0x5cdec8[_0x2adb7d(0x1e6)];$gameSystem[_0x2adb7d(0x12e)](_0x41bb26,_0x1161e8);}}if(_0x59e54d&&_0x151f96){let _0x2567c9=_0x5cdec8['message3'];if(_0x2567c9&&_0x3704f3[_0x2adb7d(0x2a1)]){let _0x51c9d1=_0x2567c9[_0x2adb7d(0x25c)](this[_0x2adb7d(0xd9)]()),_0x87f0d=_0x5cdec8[_0x2adb7d(0x1e6)];$gameSystem['addTextToCombatLog'](_0x51c9d1,_0x87f0d);}}if(_0x59e54d&&!_0x151f96){let _0x187dfb=_0x5cdec8['message4'];if(_0x187dfb&&_0x3704f3[_0x2adb7d(0x1f8)]){let _0x17cb7f=_0x187dfb[_0x2adb7d(0x25c)](this[_0x2adb7d(0xd9)]()),_0x57320a=_0x5cdec8[_0x2adb7d(0x1e6)];$gameSystem['addTextToCombatLog'](_0x17cb7f,_0x57320a);}}},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x20d)]=Game_BattlerBase[_0x5254d5(0x197)][_0x5254d5(0x101)],Game_BattlerBase[_0x5254d5(0x197)][_0x5254d5(0x101)]=function(_0x459956){const _0x26a102=_0x5254d5;VisuMZ[_0x26a102(0x27a)][_0x26a102(0x20d)]['call'](this,_0x459956);if(!VisuMZ['CombatLog']['Settings'][_0x26a102(0x27a)][_0x26a102(0x122)])return;this[_0x26a102(0x253)](_0x459956,0x1,TextManager[_0x26a102(0x11c)]);},VisuMZ['CombatLog'][_0x5254d5(0x227)]=Game_BattlerBase[_0x5254d5(0x197)][_0x5254d5(0x193)],Game_BattlerBase['prototype'][_0x5254d5(0x193)]=function(_0x13691f){const _0x24662f=_0x5254d5;VisuMZ[_0x24662f(0x27a)][_0x24662f(0x227)][_0x24662f(0xf6)](this,_0x13691f);if(!VisuMZ[_0x24662f(0x27a)][_0x24662f(0x282)][_0x24662f(0x27a)][_0x24662f(0x1a0)])return;this[_0x24662f(0x253)](_0x13691f,-0x1,TextManager['debuffAdd']);},VisuMZ[_0x5254d5(0x27a)]['Game_BattlerBase_eraseBuff']=Game_BattlerBase[_0x5254d5(0x197)][_0x5254d5(0x15a)],Game_BattlerBase[_0x5254d5(0x197)]['eraseBuff']=function(_0x55553b){const _0x563f0a=_0x5254d5,_0x14efe0=this[_0x563f0a(0x23a)][_0x55553b]||0x0;VisuMZ[_0x563f0a(0x27a)][_0x563f0a(0x24f)]['call'](this,_0x55553b);const _0x44a677=this[_0x563f0a(0x23a)][_0x55553b]||0x0,_0x33e9ec=_0x44a677>_0x14efe0?0x1:-0x1;if(!VisuMZ[_0x563f0a(0x27a)][_0x563f0a(0x282)][_0x563f0a(0x27a)][_0x563f0a(0x201)])return;this[_0x563f0a(0x253)](_0x55553b,_0x33e9ec,TextManager['buffRemove']);},Game_Battler[_0x5254d5(0x197)][_0x5254d5(0x253)]=function(_0x10e42d,_0x373e9c,_0x5735e0){const _0x26aa78=_0x5254d5;if(!SceneManager[_0x26aa78(0x1d3)]())return;if(!_0x5735e0)return;const _0x2e1e81=this['buffIconIndex'](_0x373e9c||-0x1,_0x10e42d),_0x42cdce=TextManager[_0x26aa78(0x1ce)](_0x10e42d),_0x580a1f=_0x5735e0[_0x26aa78(0x25c)](this['combatLogName'](),_0x42cdce);$gameSystem[_0x26aa78(0x12e)](_0x580a1f,_0x2e1e81);},Game_Actor['prototype']['combatLogName']=function(){const _0x516630=_0x5254d5;return _0x516630(0x25d)[_0x516630(0x25c)](this[_0x516630(0x22d)]);},Game_Enemy[_0x5254d5(0x197)][_0x5254d5(0xd9)]=function(){return this['name']();},Game_Party[_0x5254d5(0x197)][_0x5254d5(0xd9)]=function(){const _0x7f6029=_0x5254d5,_0x387211=this['battleMembers']()[_0x7f6029(0x1f6)];if(_0x387211===0x0)return'';else return _0x387211===0x1?this[_0x7f6029(0x29c)]()[_0x7f6029(0xd9)]():TextManager[_0x7f6029(0x257)][_0x7f6029(0x25c)](this['leader']()[_0x7f6029(0xd9)]());},VisuMZ['CombatLog']['Scene_Menu_createCommandWindow']=Scene_Menu[_0x5254d5(0x197)][_0x5254d5(0x248)],Scene_Menu[_0x5254d5(0x197)]['createCommandWindow']=function(){const _0x2cd00a=_0x5254d5;VisuMZ[_0x2cd00a(0x27a)]['Scene_Menu_createCommandWindow'][_0x2cd00a(0xf6)](this);const _0x16f442=this['_commandWindow'];_0x16f442[_0x2cd00a(0x23d)]('CombatLog',this['commandCombatLog'][_0x2cd00a(0x299)](this));},Scene_Menu[_0x5254d5(0x197)][_0x5254d5(0x209)]=function(){const _0x1b1560=_0x5254d5;SceneManager[_0x1b1560(0x1c8)](Scene_CombatLog);},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x28a)]=Scene_Battle['prototype'][_0x5254d5(0x251)],Scene_Battle[_0x5254d5(0x197)][_0x5254d5(0x251)]=function(){const _0x2c4247=_0x5254d5;VisuMZ['CombatLog'][_0x2c4247(0x28a)]['call'](this),this[_0x2c4247(0x129)]();},Scene_Battle['prototype'][_0x5254d5(0x129)]=function(){const _0x1ae64a=_0x5254d5,_0x397d1a=this[_0x1ae64a(0x195)]();this[_0x1ae64a(0xe3)]=new Window_CombatLogDisplay(_0x397d1a),this[_0x1ae64a(0xe3)]['setCombatLogIndex'](0x0),this[_0x1ae64a(0x13d)](this[_0x1ae64a(0xe3)]),this['_combatLogWindow'][_0x1ae64a(0x1f9)](VisuMZ[_0x1ae64a(0x27a)]['Settings'][_0x1ae64a(0xf8)]['CombatLogBattle_BgType']),this[_0x1ae64a(0xe3)]['setHandler'](_0x1ae64a(0x1c7),this[_0x1ae64a(0x133)][_0x1ae64a(0x299)](this)),this[_0x1ae64a(0xe3)]['setHandler'](_0x1ae64a(0x174),this[_0x1ae64a(0x133)][_0x1ae64a(0x299)](this)),this[_0x1ae64a(0x160)][_0x1ae64a(0x23d)](_0x1ae64a(0x1c7),this[_0x1ae64a(0x182)][_0x1ae64a(0x299)](this,this['_partyCommandWindow'])),this['_actorCommandWindow'][_0x1ae64a(0x23d)](_0x1ae64a(0x1c7),this[_0x1ae64a(0x182)][_0x1ae64a(0x299)](this,this[_0x1ae64a(0x283)]));},Scene_Battle['prototype'][_0x5254d5(0x195)]=function(){const _0x5bfbe1=_0x5254d5,_0xab9bf1=VisuMZ[_0x5bfbe1(0x27a)][_0x5bfbe1(0x282)][_0x5bfbe1(0xf8)][_0x5bfbe1(0x20b)];if(_0xab9bf1)return _0xab9bf1[_0x5bfbe1(0xf6)](this);const _0xde4b27=0x0,_0x350ce8=0x0,_0x124f04=Graphics['boxWidth'],_0x3722d0=Graphics[_0x5bfbe1(0x150)];return new Rectangle(_0xde4b27,_0x350ce8,_0x124f04,_0x3722d0);},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x250)]=Scene_Battle[_0x5254d5(0x197)]['isAnyInputWindowActive'],Scene_Battle[_0x5254d5(0x197)][_0x5254d5(0x148)]=function(){const _0x54598b=_0x5254d5;if(this['_combatLogWindow']&&this[_0x54598b(0xe3)][_0x54598b(0x279)])return!![];return VisuMZ['CombatLog'][_0x54598b(0x250)]['call'](this);},VisuMZ[_0x5254d5(0x27a)]['Scene_Battle_updateCancelButton']=Scene_Battle[_0x5254d5(0x197)][_0x5254d5(0x21b)],Scene_Battle[_0x5254d5(0x197)][_0x5254d5(0x21b)]=function(){const _0x5d1efc=_0x5254d5;VisuMZ[_0x5d1efc(0x27a)][_0x5d1efc(0x281)]['call'](this),this['_combatLogWindow']&&this['_combatLogWindow'][_0x5d1efc(0x16d)]>0x0&&this[_0x5d1efc(0x142)]&&(this[_0x5d1efc(0x142)][_0x5d1efc(0x287)]=![]);},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x286)]=Scene_Battle['prototype'][_0x5254d5(0x1fd)],Scene_Battle[_0x5254d5(0x197)][_0x5254d5(0x1fd)]=function(){const _0x357989=_0x5254d5;return BattleManager[_0x357989(0x23b)]()&&this['_combatLogWindow']&&this['_combatLogWindow'][_0x357989(0x279)]?![]:VisuMZ[_0x357989(0x27a)]['Scene_Battle_isTimeActive'][_0x357989(0xf6)](this);},Scene_Battle[_0x5254d5(0x197)][_0x5254d5(0x182)]=function(_0x2a0ec3){const _0x58744f=_0x5254d5;this['_combatLogWindow']['open'](),this[_0x58744f(0xe3)][_0x58744f(0x1ee)](),this[_0x58744f(0xe3)]['battleRefresh'](),this['_combatLogWindow'][_0x58744f(0x136)](_0x2a0ec3);},Scene_Battle['prototype']['closeCombatLog']=function(){const _0x56727f=_0x5254d5;this[_0x56727f(0xe3)][_0x56727f(0x143)]();const _0x57b903=this[_0x56727f(0xe3)]['getLastWindow']();_0x57b903[_0x56727f(0x1ee)]();};function Scene_CombatLog(){const _0x69ae42=_0x5254d5;this[_0x69ae42(0x252)](...arguments);}Scene_CombatLog[_0x5254d5(0x197)]=Object[_0x5254d5(0x273)](Scene_MenuBase['prototype']),Scene_CombatLog['prototype'][_0x5254d5(0x185)]=Scene_CombatLog,Scene_CombatLog[_0x5254d5(0x197)]['initialize']=function(){const _0x1d1c6d=_0x5254d5;Scene_MenuBase[_0x1d1c6d(0x197)][_0x1d1c6d(0x252)]['call'](this);},Scene_CombatLog[_0x5254d5(0x197)]['helpAreaHeight']=function(){return 0x0;},Scene_CombatLog[_0x5254d5(0x197)]['create']=function(){const _0x8f4a2d=_0x5254d5;Scene_MenuBase[_0x8f4a2d(0x197)][_0x8f4a2d(0x273)][_0x8f4a2d(0xf6)](this),this[_0x8f4a2d(0x21f)](),this[_0x8f4a2d(0x129)]();},Scene_CombatLog[_0x5254d5(0x197)][_0x5254d5(0x21f)]=function(){const _0x41b859=_0x5254d5,_0xdd1a40=this[_0x41b859(0x235)]();this[_0x41b859(0x2a0)]=new Window_CombatLogHistory(_0xdd1a40),this[_0x41b859(0x2a0)][_0x41b859(0x23d)](_0x41b859(0x174),this[_0x41b859(0x200)][_0x41b859(0x299)](this)),this[_0x41b859(0x13d)](this[_0x41b859(0x2a0)]),this[_0x41b859(0x2a0)][_0x41b859(0x1f9)](VisuMZ['CombatLog'][_0x41b859(0x282)]['Window']['CombatHistory_BgType']);},Scene_CombatLog[_0x5254d5(0x197)][_0x5254d5(0x235)]=function(){const _0x593965=_0x5254d5,_0x702d09=VisuMZ[_0x593965(0x27a)][_0x593965(0x282)][_0x593965(0xf8)][_0x593965(0x1a9)];if(_0x702d09)return _0x702d09[_0x593965(0xf6)](this);const _0x44ff20=Graphics[_0x593965(0xc5)],_0x598781=this[_0x593965(0x17f)](0x1,!![]),_0x1dc815=0x0,_0x55149f=this[_0x593965(0x249)]();return new Rectangle(_0x1dc815,_0x55149f,_0x44ff20,_0x598781);},Scene_CombatLog[_0x5254d5(0x197)][_0x5254d5(0x129)]=function(){const _0x3f41aa=_0x5254d5,_0x560919=this['combatLogWindowRect']();this[_0x3f41aa(0xe3)]=new Window_CombatLogDisplay(_0x560919),this[_0x3f41aa(0x13d)](this[_0x3f41aa(0xe3)]),this[_0x3f41aa(0x2a0)][_0x3f41aa(0xd4)](this[_0x3f41aa(0xe3)]),this[_0x3f41aa(0xe3)][_0x3f41aa(0x1f9)](VisuMZ[_0x3f41aa(0x27a)]['Settings'][_0x3f41aa(0xf8)][_0x3f41aa(0x117)]);},Scene_CombatLog[_0x5254d5(0x197)][_0x5254d5(0x195)]=function(){const _0x442cd4=_0x5254d5,_0x2ba5a6=VisuMZ[_0x442cd4(0x27a)][_0x442cd4(0x282)]['Window'][_0x442cd4(0x262)];if(_0x2ba5a6)return _0x2ba5a6[_0x442cd4(0xf6)](this);const _0x38747d=0x0,_0x2190d1=this[_0x442cd4(0x2a0)]['y']+this[_0x442cd4(0x2a0)][_0x442cd4(0x125)],_0x3e4b44=Graphics[_0x442cd4(0xc5)],_0x6ae493=this['mainAreaHeight']()-this['_historyWindow'][_0x442cd4(0x125)];return new Rectangle(_0x38747d,_0x2190d1,_0x3e4b44,_0x6ae493);},Scene_CombatLog[_0x5254d5(0x197)][_0x5254d5(0x19e)]=function(){const _0x15492d=_0x5254d5;Scene_MenuBase['prototype'][_0x15492d(0x19e)]['call'](this),this[_0x15492d(0x114)](this[_0x15492d(0x292)]()),this[_0x15492d(0x226)]();},Scene_CombatLog[_0x5254d5(0x197)][_0x5254d5(0x292)]=function(){const _0x5f427b=_0x5254d5;return VisuMZ[_0x5f427b(0x27a)][_0x5f427b(0x282)][_0x5f427b(0x199)][_0x5f427b(0x22f)];},Scene_CombatLog[_0x5254d5(0x197)][_0x5254d5(0x226)]=function(){const _0x502121=_0x5254d5,_0xcd7d7d=VisuMZ['CombatLog'][_0x502121(0x282)][_0x502121(0x199)];_0xcd7d7d&&(_0xcd7d7d['BgFilename1']!==''||_0xcd7d7d[_0x502121(0x29b)]!=='')&&(this['_backSprite1']=new Sprite(ImageManager['loadTitle1'](_0xcd7d7d['BgFilename1'])),this[_0x502121(0x1eb)]=new Sprite(ImageManager[_0x502121(0x1e9)](_0xcd7d7d[_0x502121(0x29b)])),this['addChild'](this[_0x502121(0x1cd)]),this[_0x502121(0x196)](this['_backSprite2']),this['_backSprite1']['bitmap'][_0x502121(0x1f7)](this['adjustSprite']['bind'](this,this['_backSprite1'])),this[_0x502121(0x1eb)][_0x502121(0x1bb)]['addLoadListener'](this['adjustSprite'][_0x502121(0x299)](this,this[_0x502121(0x1eb)])));},Scene_CombatLog[_0x5254d5(0x197)][_0x5254d5(0xfb)]=function(_0x40b689){const _0x45edbd=_0x5254d5;this[_0x45edbd(0x23c)](_0x40b689),this[_0x45edbd(0xe6)](_0x40b689);},VisuMZ[_0x5254d5(0x27a)]['Window_Selectable_allowShiftScrolling']=Window_Selectable[_0x5254d5(0x197)][_0x5254d5(0x19d)],Window_Selectable[_0x5254d5(0x197)][_0x5254d5(0x19d)]=function(){const _0x55ba89=_0x5254d5;if(SceneManager[_0x55ba89(0x1d3)]()){const _0x257f79=SceneManager['_scene'][_0x55ba89(0xe3)];if(_0x257f79&&_0x257f79[_0x55ba89(0x12a)]())return![];}return VisuMZ['CombatLog'][_0x55ba89(0xff)][_0x55ba89(0xf6)](this);},VisuMZ['CombatLog'][_0x5254d5(0x162)]=Window_Selectable['prototype'][_0x5254d5(0x272)],Window_Selectable[_0x5254d5(0x197)]['isCursorMovable']=function(){const _0x34d996=_0x5254d5;if(SceneManager['isSceneBattle']()){const _0x4ceb36=SceneManager['_scene'][_0x34d996(0xe3)];if(_0x4ceb36&&_0x4ceb36[_0x34d996(0x12a)]())return![];}return VisuMZ[_0x34d996(0x27a)][_0x34d996(0x162)]['call'](this);},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x24c)]=Window_MenuCommand[_0x5254d5(0x197)]['addOriginalCommands'],Window_MenuCommand['prototype'][_0x5254d5(0x165)]=function(){const _0x27710a=_0x5254d5;VisuMZ[_0x27710a(0x27a)][_0x27710a(0x24c)][_0x27710a(0xf6)](this);if(Imported[_0x27710a(0x178)])return;this[_0x27710a(0x1d9)]();},Window_MenuCommand[_0x5254d5(0x197)]['addCombatLogCommand']=function(){const _0x5dd035=_0x5254d5;if(!this['isCombatLogCommandVisible']())return;const _0x1a9a53=TextManager[_0x5dd035(0x120)],_0x402b0c=this['isCombatLogCommandEnabled']();this['addCommand'](_0x1a9a53,_0x5dd035(0x1c7),_0x402b0c);},Window_MenuCommand['prototype'][_0x5254d5(0xfc)]=function(){return $gameSystem['isMainMenuCombatLogVisible']();},Window_MenuCommand[_0x5254d5(0x197)][_0x5254d5(0x134)]=function(){const _0x2aca51=_0x5254d5;return $gameSystem[_0x2aca51(0x244)]();},VisuMZ[_0x5254d5(0x27a)]['Window_BattleLog_startTurn']=Window_BattleLog[_0x5254d5(0x197)][_0x5254d5(0x17c)],Window_BattleLog[_0x5254d5(0x197)][_0x5254d5(0x17c)]=function(){const _0x46fae2=_0x5254d5;VisuMZ['CombatLog'][_0x46fae2(0x147)][_0x46fae2(0xf6)](this);if(!VisuMZ[_0x46fae2(0x27a)]['Settings'][_0x46fae2(0x27a)][_0x46fae2(0xec)])return;$gameSystem[_0x46fae2(0x173)]();let _0x567d81=TextManager[_0x46fae2(0x14f)]['format']($gameTroop[_0x46fae2(0x207)]()),_0x4468b7=ImageManager[_0x46fae2(0x1b3)];$gameSystem[_0x46fae2(0x12e)](_0x567d81,_0x4468b7);},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x170)]=Window_BattleLog[_0x5254d5(0x197)][_0x5254d5(0x1bf)],Window_BattleLog[_0x5254d5(0x197)][_0x5254d5(0x1bf)]=function(_0xe60098,_0x499311,_0x18d357){const _0xc247b=_0x5254d5;$gameSystem[_0xc247b(0x173)](),VisuMZ[_0xc247b(0x27a)]['Window_BattleLog_startAction']['call'](this,_0xe60098,_0x499311,_0x18d357);},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x1ba)]=Window_BattleLog['prototype']['displayCurrentState'],Window_BattleLog[_0x5254d5(0x197)][_0x5254d5(0x19f)]=function(_0x5819b0){const _0x4b241e=_0x5254d5;VisuMZ[_0x4b241e(0x27a)][_0x4b241e(0x1ba)]['call'](this,_0x5819b0);if(!_0x5819b0)return;if(!VisuMZ['CombatLog'][_0x4b241e(0x282)][_0x4b241e(0x27a)][_0x4b241e(0x2a1)]);const _0x5ac552=_0x5819b0['states']();for(const _0x25930f of _0x5ac552){if(!_0x25930f)continue;if(!_0x25930f[_0x4b241e(0x16a)])continue;if(_0x25930f['note']['match'](VisuMZ['CombatLog'][_0x4b241e(0x298)][_0x4b241e(0x1c9)]))continue;let _0x1e208b=_0x25930f['message3'],_0x4ccc47=_0x1e208b[_0x4b241e(0x25c)](_0x5819b0[_0x4b241e(0xd9)]()),_0x228eeb=_0x25930f[_0x4b241e(0x1e6)];$gameSystem[_0x4b241e(0x12e)](_0x4ccc47,_0x228eeb);}},VisuMZ['CombatLog'][_0x5254d5(0x171)]=Window_BattleLog[_0x5254d5(0x197)]['displayAction'],Window_BattleLog[_0x5254d5(0x197)]['displayAction']=function(_0x12d663,_0x1de509){const _0x4a62d8=_0x5254d5;VisuMZ[_0x4a62d8(0x27a)][_0x4a62d8(0x171)][_0x4a62d8(0xf6)](this,_0x12d663,_0x1de509);const _0x1a78bc=VisuMZ[_0x4a62d8(0x27a)]['Settings'][_0x4a62d8(0x27a)];if(DataManager[_0x4a62d8(0x242)](_0x1de509)){if(_0x1de509[_0x4a62d8(0x18a)]&&_0x1a78bc[_0x4a62d8(0x161)]){let _0x7e6790=_0x1de509['message1'],_0xe36cc1=_0x7e6790[_0x4a62d8(0x25c)](_0x12d663[_0x4a62d8(0xd9)](),_0x1de509['name']),_0x6c320d=_0x1de509[_0x4a62d8(0x1e6)];$gameSystem['addTextToCombatLog'](_0xe36cc1,_0x6c320d);}if(_0x1de509[_0x4a62d8(0x15c)]&&_0x1a78bc[_0x4a62d8(0x236)]){let _0x384099=_0x1de509['message2'],_0x101273=_0x384099[_0x4a62d8(0x25c)](_0x12d663[_0x4a62d8(0xd9)](),_0x1de509['name']),_0x225466=_0x1de509[_0x4a62d8(0x1e6)];$gameSystem[_0x4a62d8(0x12e)](_0x101273,_0x225466);}}else{if(TextManager[_0x4a62d8(0x1c2)]&&_0x1a78bc[_0x4a62d8(0x212)]){let _0x4dbe9d=TextManager[_0x4a62d8(0x1c2)],_0x51043c=_0x4dbe9d[_0x4a62d8(0x25c)](_0x12d663[_0x4a62d8(0xd9)](),_0x1de509['name']),_0x37a968=_0x1de509[_0x4a62d8(0x1e6)];$gameSystem[_0x4a62d8(0x12e)](_0x51043c,_0x37a968);}}},VisuMZ['CombatLog'][_0x5254d5(0x266)]=Window_BattleLog[_0x5254d5(0x197)][_0x5254d5(0x211)],Window_BattleLog['prototype']['displayCounter']=function(_0x5bd6b7){const _0x2568a4=_0x5254d5;VisuMZ['CombatLog']['Window_BattleLog_displayCounter'][_0x2568a4(0xf6)](this,_0x5bd6b7);if(TextManager[_0x2568a4(0x132)]&&VisuMZ[_0x2568a4(0x27a)][_0x2568a4(0x282)]['CombatLog'][_0x2568a4(0x20c)]){let _0x46b54b=TextManager['counterAttack'],_0x502951=_0x46b54b[_0x2568a4(0x25c)](_0x5bd6b7[_0x2568a4(0xd9)]()),_0x3cf1a0=ImageManager[_0x2568a4(0xf2)];$gameSystem[_0x2568a4(0x12e)](_0x502951,_0x3cf1a0);}},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x24a)]=Window_BattleLog['prototype']['displayReflection'],Window_BattleLog[_0x5254d5(0x197)][_0x5254d5(0x231)]=function(_0x4be70a){const _0x1f052b=_0x5254d5;VisuMZ[_0x1f052b(0x27a)]['Window_BattleLog_displayReflection']['call'](this,_0x4be70a);if(TextManager[_0x1f052b(0x1be)]&&VisuMZ[_0x1f052b(0x27a)]['Settings']['CombatLog'][_0x1f052b(0x26c)]){let _0x17f3a9=TextManager[_0x1f052b(0x1be)],_0x2dcb8d=_0x17f3a9['format'](_0x4be70a['combatLogName']()),_0x24c7c0=ImageManager[_0x1f052b(0x135)];$gameSystem[_0x1f052b(0x12e)](_0x2dcb8d,_0x24c7c0);}},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x24d)]=Window_BattleLog[_0x5254d5(0x197)][_0x5254d5(0x1ad)],Window_BattleLog[_0x5254d5(0x197)][_0x5254d5(0x1ad)]=function(_0x43c67f,_0x5ecc19){const _0x32f7c5=_0x5254d5;VisuMZ[_0x32f7c5(0x27a)]['Window_BattleLog_displaySubstitute'][_0x32f7c5(0xf6)](this,_0x43c67f,_0x5ecc19);if(TextManager[_0x32f7c5(0x1f2)]&&VisuMZ[_0x32f7c5(0x27a)][_0x32f7c5(0x282)][_0x32f7c5(0x27a)][_0x32f7c5(0xf5)]){const _0x20741f=_0x43c67f[_0x32f7c5(0xd9)]();let _0x208a0e=TextManager[_0x32f7c5(0x1f2)],_0x45f314=_0x208a0e[_0x32f7c5(0x25c)](_0x20741f,_0x5ecc19['combatLogName']()),_0x85234e=ImageManager[_0x32f7c5(0x17d)];$gameSystem[_0x32f7c5(0x12e)](_0x45f314,_0x85234e);}},VisuMZ['CombatLog']['Window_BattleLog_displayFailure']=Window_BattleLog['prototype']['displayFailure'],Window_BattleLog[_0x5254d5(0x197)]['displayFailure']=function(_0x58c25f){const _0x3eebe2=_0x5254d5;VisuMZ[_0x3eebe2(0x27a)][_0x3eebe2(0x12c)]['call'](this,_0x58c25f);if(_0x58c25f[_0x3eebe2(0x247)]()['isHit']()&&!_0x58c25f[_0x3eebe2(0x247)]()[_0x3eebe2(0x1c5)]){if(TextManager[_0x3eebe2(0x22e)]&&VisuMZ[_0x3eebe2(0x27a)][_0x3eebe2(0x282)][_0x3eebe2(0x27a)]['ShowFail']){let _0x3a5004=TextManager['actionFailure'],_0xde1b01=_0x3a5004[_0x3eebe2(0x25c)](_0x58c25f['combatLogName']()),_0x50ab5c=ImageManager[_0x3eebe2(0x206)];$gameSystem[_0x3eebe2(0x12e)](_0xde1b01,_0x50ab5c);}}},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x254)]=Window_BattleLog[_0x5254d5(0x197)][_0x5254d5(0x291)],Window_BattleLog[_0x5254d5(0x197)][_0x5254d5(0x291)]=function(_0x1bd5ca){const _0x11e764=_0x5254d5;VisuMZ[_0x11e764(0x27a)]['Window_BattleLog_displayCritical'][_0x11e764(0xf6)](this,_0x1bd5ca);if(_0x1bd5ca[_0x11e764(0x247)]()[_0x11e764(0x1d5)]&&VisuMZ[_0x11e764(0x27a)][_0x11e764(0x282)]['CombatLog']['ShowCritical']){if(_0x1bd5ca[_0x11e764(0x1f5)]()){if(TextManager[_0x11e764(0xe9)]){let _0x15dd37=TextManager[_0x11e764(0xe9)],_0x172f95=ImageManager['combatLog_CriticalHit_Icon'];$gameSystem['addTextToCombatLog'](_0x15dd37,_0x172f95);}}else{if(TextManager[_0x11e764(0x28b)]){let _0x2cb3a2=TextManager[_0x11e764(0x28b)],_0x220efb=ImageManager[_0x11e764(0x1b9)];$gameSystem[_0x11e764(0x12e)](_0x2cb3a2,_0x220efb);}}}},VisuMZ['CombatLog'][_0x5254d5(0x256)]=Window_BattleLog['prototype'][_0x5254d5(0x27c)],Window_BattleLog[_0x5254d5(0x197)][_0x5254d5(0x27c)]=function(_0x566098){const _0x45dd3f=_0x5254d5;VisuMZ[_0x45dd3f(0x27a)][_0x45dd3f(0x256)][_0x45dd3f(0xf6)](this,_0x566098);if(_0x566098[_0x45dd3f(0x247)]()[_0x45dd3f(0xc6)]&&VisuMZ[_0x45dd3f(0x27a)][_0x45dd3f(0x282)][_0x45dd3f(0x27a)]['ShowMiss']){const _0x35a946=_0x566098[_0x45dd3f(0x1f5)]();if(_0x35a946&&TextManager[_0x45dd3f(0x11e)]){let _0x47aed5=TextManager['actorNoHit'],_0x541cd7=_0x47aed5['format'](_0x566098['combatLogName']()),_0x193ad5=ImageManager[_0x45dd3f(0x1d2)];$gameSystem['addTextToCombatLog'](_0x541cd7,_0x193ad5);}else{if(!_0x35a946&&TextManager[_0x45dd3f(0x20a)]){let _0x55352d=TextManager[_0x45dd3f(0x20a)],_0x4aa9a8=_0x55352d['format'](_0x566098[_0x45dd3f(0xd9)]()),_0x8f1076=ImageManager['combatLog_Miss_Icon'];$gameSystem[_0x45dd3f(0x12e)](_0x4aa9a8,_0x8f1076);}}}else{if(TextManager[_0x45dd3f(0x22e)]&&VisuMZ[_0x45dd3f(0x27a)][_0x45dd3f(0x282)]['CombatLog']['ShowFail']){let _0xfef0e1=TextManager[_0x45dd3f(0x22e)],_0x19e89e=_0xfef0e1[_0x45dd3f(0x25c)](_0x566098[_0x45dd3f(0xd9)]()),_0x68e678=ImageManager[_0x45dd3f(0x206)];$gameSystem[_0x45dd3f(0x12e)](_0x19e89e,_0x68e678);}}},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x104)]=Window_BattleLog[_0x5254d5(0x197)]['displayEvasion'],Window_BattleLog['prototype'][_0x5254d5(0x13c)]=function(_0x59a722){const _0x19422a=_0x5254d5;VisuMZ[_0x19422a(0x27a)][_0x19422a(0x104)][_0x19422a(0xf6)](this,_0x59a722);if(VisuMZ[_0x19422a(0x27a)][_0x19422a(0x282)][_0x19422a(0x27a)][_0x19422a(0x189)]){if(_0x59a722[_0x19422a(0x247)]()['physical']&&TextManager[_0x19422a(0x16b)]){let _0x78e5cd=TextManager[_0x19422a(0x16b)],_0x5d6c4b=_0x78e5cd['format'](_0x59a722[_0x19422a(0xd9)]()),_0x10913a=ImageManager['combatLog_Evasion_Icon'];$gameSystem['addTextToCombatLog'](_0x5d6c4b,_0x10913a);}else{if(TextManager[_0x19422a(0xce)]){let _0x4dce9f=TextManager[_0x19422a(0xce)],_0x40ae56=_0x4dce9f['format'](_0x59a722[_0x19422a(0xd9)]()),_0x5ab73a=ImageManager[_0x19422a(0x1a1)];$gameSystem[_0x19422a(0x12e)](_0x40ae56,_0x5ab73a);}}}},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x1e2)]=Window_PartyCommand[_0x5254d5(0x197)][_0x5254d5(0x123)],Window_PartyCommand['prototype'][_0x5254d5(0x123)]=function(){const _0x406f14=_0x5254d5;VisuMZ[_0x406f14(0x27a)][_0x406f14(0x1e2)][_0x406f14(0xf6)](this);if(Imported[_0x406f14(0xc1)])return;this['addCombatLogCommand']();},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x1fe)]=Window_PartyCommand[_0x5254d5(0x197)][_0x5254d5(0x102)],Window_PartyCommand[_0x5254d5(0x197)]['addCustomCommands']=function(){const _0x50319e=_0x5254d5;VisuMZ['CombatLog']['Window_PartyCommand_addCustomCommands'][_0x50319e(0xf6)](this),this['addCombatLogCommand']();},Window_PartyCommand[_0x5254d5(0x197)]['addCombatLogCommand']=function(){const _0x2a55f3=_0x5254d5;if(!$gameSystem['isPartyCmdCombatLogVisible']())return;if(this[_0x2a55f3(0x264)]('combatLog')>=0x0)return;const _0x1504f3=Imported[_0x2a55f3(0xc1)]?this[_0x2a55f3(0x238)]():'text',_0x4f311e=TextManager['combatLog_BattleCmd_Name'],_0x4ac7be=ImageManager[_0x2a55f3(0xe2)]||0x0,_0x15eb8a=_0x1504f3===_0x2a55f3(0x12f)?_0x4f311e:'\x5cI[%1]%2'['format'](_0x4ac7be,_0x4f311e);this[_0x2a55f3(0x1ab)](_0x15eb8a,_0x2a55f3(0x1c7));},VisuMZ['CombatLog'][_0x5254d5(0x275)]=Window_ActorCommand[_0x5254d5(0x197)][_0x5254d5(0x123)],Window_ActorCommand[_0x5254d5(0x197)][_0x5254d5(0x123)]=function(){const _0x14b4b9=_0x5254d5;VisuMZ[_0x14b4b9(0x27a)][_0x14b4b9(0x275)]['call'](this);if(Imported[_0x14b4b9(0xc1)])return;this[_0x14b4b9(0x1d9)]();},VisuMZ[_0x5254d5(0x27a)]['Window_ActorCommand_addCustomCommands']=Window_ActorCommand[_0x5254d5(0x197)]['addCustomCommands'],Window_ActorCommand[_0x5254d5(0x197)]['addCustomCommands']=function(){const _0x2249ff=_0x5254d5;VisuMZ[_0x2249ff(0x27a)]['Window_ActorCommand_addCustomCommands'][_0x2249ff(0xf6)](this),this[_0x2249ff(0x1d9)]();},Window_ActorCommand['prototype'][_0x5254d5(0x1d9)]=function(){const _0x335477=_0x5254d5;if(!$gameSystem['isActorCmdCombatLogVisible']())return;if(this['findSymbol'](_0x335477(0x1c7))>=0x0)return;const _0x1afed6=Imported['VisuMZ_1_BattleCore']?this[_0x335477(0x238)]():_0x335477(0x12f),_0x5a8eb0=TextManager['combatLog_BattleCmd_Name'],_0x54c4ad=ImageManager['combatLog_BattleCmd_Icon']||0x0,_0x50531f=_0x1afed6===_0x335477(0x12f)?_0x5a8eb0:_0x335477(0x1c6)[_0x335477(0x25c)](_0x54c4ad,_0x5a8eb0);this[_0x335477(0x1ab)](_0x50531f,'combatLog');};function Window_CombatLogHistory(){const _0x5d4d3a=_0x5254d5;this[_0x5d4d3a(0x252)](...arguments);}Window_CombatLogHistory[_0x5254d5(0x197)]=Object['create'](Window_HorzCommand[_0x5254d5(0x197)]),Window_CombatLogHistory[_0x5254d5(0x197)][_0x5254d5(0x185)]=Window_CombatLogHistory,Window_CombatLogHistory['prototype'][_0x5254d5(0x252)]=function(_0x353930){const _0x12ae0a=_0x5254d5;Window_HorzCommand['prototype'][_0x12ae0a(0x252)][_0x12ae0a(0xf6)](this,_0x353930);},Window_CombatLogHistory[_0x5254d5(0x197)][_0x5254d5(0x25a)]=function(){const _0x4382ef=_0x5254d5;return $gameSystem[_0x4382ef(0x276)]();},Window_CombatLogHistory[_0x5254d5(0x197)][_0x5254d5(0x11b)]=function(){},Window_CombatLogHistory[_0x5254d5(0x197)][_0x5254d5(0x2a3)]=function(_0x4234b6){},Window_CombatLogHistory[_0x5254d5(0x197)][_0x5254d5(0x295)]=function(_0x16d915){},Window_CombatLogHistory['prototype'][_0x5254d5(0x22b)]=function(){const _0x1b3b59=_0x5254d5;Window_HorzCommand[_0x1b3b59(0x197)][_0x1b3b59(0x22b)]['call'](this),this['_logWindow']&&this[_0x1b3b59(0x1a8)][_0x1b3b59(0xc7)](this[_0x1b3b59(0xe0)]());},Window_CombatLogHistory[_0x5254d5(0x197)]['setLogWindow']=function(_0x4a1572){const _0x3858f1=_0x5254d5;this[_0x3858f1(0x1a8)]=_0x4a1572;},Window_CombatLogHistory[_0x5254d5(0x197)][_0x5254d5(0x123)]=function(){const _0x464467=_0x5254d5;let _0x59602e=$gameSystem['getTotalCombatLogs']();for(let _0x387d49=0x0;_0x387d49<_0x59602e;_0x387d49++){let _0x22695f=_0x387d49===0x0?TextManager[_0x464467(0x192)]:TextManager[_0x464467(0xfa)],_0x943c12=_0x22695f['format']($gameSystem[_0x464467(0x267)]()-_0x387d49);this[_0x464467(0x1ab)](_0x943c12,_0x464467(0xe1),!![],_0x387d49);}};function Window_CombatLogDisplay(){const _0x21f498=_0x5254d5;this[_0x21f498(0x252)](...arguments);}Window_CombatLogDisplay[_0x5254d5(0x197)]=Object[_0x5254d5(0x273)](Window_Command[_0x5254d5(0x197)]),Window_CombatLogDisplay['prototype']['constructor']=Window_CombatLogDisplay,Window_CombatLogDisplay['BIGGER_LINE_HEIGHT']=![],Window_CombatLogDisplay['SHOW_LINE_BACKGROUND']=![],Window_CombatLogDisplay[_0x5254d5(0x215)]=0x4,Window_CombatLogDisplay[_0x5254d5(0x1dc)]=0.2,Window_CombatLogDisplay['SCROLL_SPEED_PAGEDN']=1.5,Window_CombatLogDisplay[_0x5254d5(0x268)]=VisuMZ[_0x5254d5(0x27a)]['Settings'][_0x5254d5(0xe4)]['HotKey']||_0x5254d5(0x29f),Window_CombatLogDisplay[_0x5254d5(0x197)][_0x5254d5(0x252)]=function(_0x1803c9){const _0x484e8e=_0x5254d5;Window_Command[_0x484e8e(0x197)][_0x484e8e(0x252)]['call'](this,_0x1803c9),this[_0x484e8e(0x19b)](),SceneManager['isSceneBattle']()&&(this[_0x484e8e(0x16d)]=0x0);},Window_CombatLogDisplay['prototype'][_0x5254d5(0xd8)]=function(){const _0x533cdd=_0x5254d5;let _0x2c4ca8=Window_Scrollable[_0x533cdd(0x197)][_0x533cdd(0xd8)]['call'](this);return _0x2c4ca8+(Window_CombatLogDisplay[_0x533cdd(0x126)]?0x8:0x0);},Window_CombatLogDisplay[_0x5254d5(0x197)]['isAutoColorAffected']=function(){const _0x316fa0=_0x5254d5;return VisuMZ['CombatLog']['Settings']['CombatLog'][_0x316fa0(0x13e)];},Window_CombatLogDisplay[_0x5254d5(0x197)][_0x5254d5(0x25e)]=function(){return!![];},Window_CombatLogDisplay[_0x5254d5(0x197)][_0x5254d5(0x1d0)]=function(_0x43c1e3){},Window_CombatLogDisplay['prototype'][_0x5254d5(0x1de)]=function(){const _0x34f168=_0x5254d5;this[_0x34f168(0x17e)]();},Window_CombatLogDisplay['prototype'][_0x5254d5(0x1e7)]=function(){this['processCancel']();},Window_CombatLogDisplay[_0x5254d5(0x197)]['processCursorMove']=function(){const _0x2b002a=_0x5254d5;SceneManager[_0x2b002a(0x1d3)]()&&!this[_0x2b002a(0x279)]&&($gameSystem[_0x2b002a(0x22a)]()&&Window_CombatLogDisplay[_0x2b002a(0x268)]!==undefined&&(this['isAccessKeyPressed']()?this[_0x2b002a(0xed)]():this[_0x2b002a(0x143)]())),this[_0x2b002a(0x12a)]()&&(Input[_0x2b002a(0x10d)](_0x2b002a(0x241))&&this[_0x2b002a(0x27b)](Window_CombatLogDisplay[_0x2b002a(0x1dc)]),Input[_0x2b002a(0x10d)]('up')&&this[_0x2b002a(0x218)](Window_CombatLogDisplay[_0x2b002a(0x1dc)]),Input[_0x2b002a(0x10d)]('pagedown')&&this['smoothScrollDown'](Window_CombatLogDisplay[_0x2b002a(0x137)]),Input[_0x2b002a(0x10d)]('pageup')&&this['smoothScrollUp'](Window_CombatLogDisplay[_0x2b002a(0x137)]),Input['isTriggered']('home')&&this[_0x2b002a(0x172)](0x0,0x0),Input[_0x2b002a(0xdd)]('end')&&this[_0x2b002a(0x172)](0x0,this[_0x2b002a(0x1cb)]()));},Window_CombatLogDisplay[_0x5254d5(0x197)][_0x5254d5(0x112)]=function(){const _0x374651=_0x5254d5;if($gameMessage['isBusy']())return![];return Input[_0x374651(0x10d)](Window_CombatLogDisplay[_0x374651(0x268)]);},Window_CombatLogDisplay['prototype'][_0x5254d5(0xc7)]=function(_0x108161){const _0x1815b7=_0x5254d5;if(this['_combatLogIndex']===_0x108161)return;this[_0x1815b7(0x168)]=_0x108161,this[_0x1815b7(0x18e)](),this[_0x1815b7(0x124)](0x0,0x0);},Window_CombatLogDisplay['prototype']['makeCommandList']=function(){const _0x43935e=_0x5254d5;if(this['_combatLogIndex']===undefined)return;const _0x376521=$gameSystem['getCombatLog'](this[_0x43935e(0x168)]);for(const _0x1587b9 of _0x376521){if(!_0x1587b9)continue;this[_0x43935e(0x1ab)](_0x1587b9,_0x43935e(0x1c7));}const _0x6a3bca=this['_list'][this['_list'][_0x43935e(0x1f6)]-0x1];_0x6a3bca&&_0x6a3bca[_0x43935e(0x204)]!==_0x43935e(0x184)&&this[_0x43935e(0x1ab)]('=====HORZLINE=====','combatLog');},Window_CombatLogDisplay[_0x5254d5(0x197)][_0x5254d5(0x1f0)]=function(_0x3efed1){const _0x1aa3c4=_0x5254d5;if(Window_CombatLogDisplay['SHOW_LINE_BACKGROUND']){const _0x4bd161=this[_0x1aa3c4(0xc9)](_0x3efed1);this[_0x1aa3c4(0x23f)](_0x4bd161);}},Window_CombatLogDisplay[_0x5254d5(0x197)]['drawItem']=function(_0x1a33f3){const _0x212142=_0x5254d5,_0x41ff57=this[_0x212142(0x1e5)](_0x1a33f3),_0x3ddaf8=this[_0x212142(0x202)](_0x1a33f3);_0x3ddaf8===_0x212142(0x184)?this[_0x212142(0x1e3)](_0x41ff57):this[_0x212142(0x260)](_0x3ddaf8,_0x41ff57['x'],_0x41ff57['y'],_0x41ff57['width']);},Window_CombatLogDisplay['prototype'][_0x5254d5(0x1e3)]=function(_0x32d17c){const _0x220ee8=_0x5254d5;this[_0x220ee8(0x180)]();const _0x1751d1=Window_CombatLogDisplay[_0x220ee8(0x215)],_0x12893f=_0x32d17c['y']+(_0x32d17c['height']-_0x1751d1)/0x2;this[_0x220ee8(0x25b)](_0x32d17c['x'],_0x12893f,_0x32d17c['width'],_0x1751d1);},Window_CombatLogDisplay[_0x5254d5(0x197)][_0x5254d5(0x115)]=function(){const _0x4d73fb=_0x5254d5;this[_0x4d73fb(0x168)]=0x0,this[_0x4d73fb(0x18e)](),this['scrollTo'](0x0,this['maxScrollY']());},Window_CombatLogDisplay[_0x5254d5(0x197)][_0x5254d5(0x136)]=function(_0x38bbda){const _0x40e8d0=_0x5254d5;this[_0x40e8d0(0x1a6)]=_0x38bbda;},Window_CombatLogDisplay[_0x5254d5(0x197)][_0x5254d5(0x130)]=function(){const _0x1cadca=_0x5254d5;return this[_0x1cadca(0x1a6)];},Window_CombatLogDisplay[_0x5254d5(0x197)]['createDimmerSprite']=function(){const _0x711627=_0x5254d5;this[_0x711627(0x270)]=new Sprite(),this[_0x711627(0x270)][_0x711627(0x1bb)]=new Bitmap(0x0,0x0),this[_0x711627(0x270)]['x']=-0x4,this[_0x711627(0x1ec)](this['_dimmerSprite']);},Window_CombatLogDisplay[_0x5254d5(0x197)][_0x5254d5(0x16c)]=function(){const _0x361370=_0x5254d5;if(this[_0x361370(0x270)]){const _0x134b0c=this[_0x361370(0x270)][_0x361370(0x1bb)],_0x30896c=this[_0x361370(0x16f)]>0x0?this[_0x361370(0x16f)]+0x8:0x0,_0x7e811b=this[_0x361370(0x125)],_0x154efe=this[_0x361370(0x25f)],_0x518ebc=ColorManager[_0x361370(0x140)](),_0x195fb2=ColorManager[_0x361370(0x1ed)]();_0x134b0c['resize'](_0x30896c,_0x7e811b),_0x134b0c[_0x361370(0x237)](0x0,0x0,_0x30896c,_0x154efe,_0x195fb2,_0x518ebc,!![]),_0x134b0c[_0x361370(0x1c1)](0x0,_0x154efe,_0x30896c,_0x7e811b-_0x154efe*0x2,_0x518ebc),_0x134b0c[_0x361370(0x237)](0x0,_0x7e811b-_0x154efe,_0x30896c,_0x154efe,_0x518ebc,_0x195fb2,!![]),this['_dimmerSprite'][_0x361370(0xc2)](0x0,0x0,_0x30896c,_0x7e811b),$gameParty['inBattle']()&&(this['_dimmerSprite'][_0x361370(0x131)]['x']=0x64,this[_0x361370(0x270)][_0x361370(0x19a)]['x']=0.5);}},VisuMZ[_0x5254d5(0x27a)]['Game_Battler_onAtbInterrupt']=Game_Battler[_0x5254d5(0x197)][_0x5254d5(0x243)],Game_Battler[_0x5254d5(0x197)][_0x5254d5(0x243)]=function(){const _0x371386=_0x5254d5;VisuMZ[_0x371386(0x27a)]['Game_Battler_onAtbInterrupt'][_0x371386(0xf6)](this);if(!SceneManager[_0x371386(0x1d3)]())return;const _0xf228e9=VisuMZ[_0x371386(0x27a)]['Settings'][_0x371386(0x1fb)];if(!_0xf228e9)return;if(!_0xf228e9['ShowBattleSysAtbInterrupt'])return;const _0x2ae583=_0xf228e9[_0x371386(0x1d1)];if(_0x2ae583){let _0x540c26=_0x2ae583['format'](this[_0x371386(0xd9)]()),_0x330015=_0xf228e9['IconBattleSysAtbInterrupt'];$gameSystem[_0x371386(0x12e)](_0x540c26,_0x330015);}},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x159)]=Game_Battler[_0x5254d5(0x197)][_0x5254d5(0xcf)],Game_Battler[_0x5254d5(0x197)]['onCtbOrderChange']=function(_0x1baaf6){const _0x52f4b3=_0x5254d5;VisuMZ[_0x52f4b3(0x27a)]['Game_Battler_onCtbOrderChange'][_0x52f4b3(0xf6)](this,_0x1baaf6);if(_0x1baaf6===0x0)return;if(!SceneManager['isSceneBattle']())return;const _0x505f10=VisuMZ['CombatLog'][_0x52f4b3(0x282)][_0x52f4b3(0x1fb)];if(!_0x505f10)return;if(!_0x505f10['ShowBattleSysCtbOrderChange'])return;const _0x5b9e0a=_0x505f10[_0x52f4b3(0x297)];if(_0x5b9e0a){let _0x26dfa2=_0x5b9e0a[_0x52f4b3(0x25c)](this[_0x52f4b3(0xd9)]()),_0x4e89cb=_0x505f10[_0x52f4b3(0xd7)];$gameSystem[_0x52f4b3(0x12e)](_0x26dfa2,_0x4e89cb);}},VisuMZ[_0x5254d5(0x27a)]['Game_Battler_stbGainInstant']=Game_Battler[_0x5254d5(0x197)][_0x5254d5(0x109)],Game_Battler['prototype'][_0x5254d5(0x109)]=function(_0x5c3e9d){const _0x238768=_0x5254d5;VisuMZ[_0x238768(0x27a)][_0x238768(0x145)][_0x238768(0xf6)](this,_0x5c3e9d);if(_0x5c3e9d===0x0)return;if(!SceneManager[_0x238768(0x1d3)]())return;const _0x3e4383=VisuMZ['CombatLog'][_0x238768(0x282)][_0x238768(0x1fb)];if(!_0x3e4383)return;if(!_0x3e4383[_0x238768(0xe5)])return;const _0x34e8fb=_0x3e4383[_0x238768(0x116)];if(_0x34e8fb){let _0x3506fe=_0x34e8fb['format'](this[_0x238768(0xd9)]()),_0x1bf6d0=_0x3e4383[_0x238768(0x163)];$gameSystem[_0x238768(0x12e)](_0x3506fe,_0x1bf6d0);}},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x146)]=Game_Battler[_0x5254d5(0x197)][_0x5254d5(0x169)],Game_Battler[_0x5254d5(0x197)][_0x5254d5(0x169)]=function(_0x435b60){const _0x199239=_0x5254d5,_0x4f60ab=VisuMZ['CombatLog']['Settings']['Compatibility'];if(_0x4f60ab&&_0x4f60ab[_0x199239(0x16e)]&&SceneManager['isSceneBattle']()){let _0x49cbd3=_0x4f60ab[_0x199239(0x17a)];if(_0x49cbd3){let _0x26f36e=_0x49cbd3[_0x199239(0x25c)](this[_0x199239(0xd9)](),_0x435b60[_0x199239(0x204)]),_0x5e41b4=_0x435b60[_0x199239(0x1e6)];$gameSystem[_0x199239(0x12e)](_0x26f36e,_0x5e41b4);}}VisuMZ[_0x199239(0x27a)][_0x199239(0x146)][_0x199239(0xf6)](this,_0x435b60);},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x259)]=Game_Battler[_0x5254d5(0x197)][_0x5254d5(0x156)],Game_Battler[_0x5254d5(0x197)][_0x5254d5(0x156)]=function(_0x281097){const _0x3a708a=_0x5254d5,_0x4da94c=VisuMZ[_0x3a708a(0x27a)][_0x3a708a(0x282)]['Compatibility'];if(_0x4da94c&&_0x4da94c[_0x3a708a(0xf1)]&&SceneManager['isSceneBattle']()){let _0xeb4ffb=_0x4da94c[_0x3a708a(0x108)];if(_0xeb4ffb){let _0x12566f=_0xeb4ffb[_0x3a708a(0x25c)](this[_0x3a708a(0xd9)](),_0x281097[_0x3a708a(0x204)]),_0x5b7831=_0x281097[_0x3a708a(0x1e6)];$gameSystem['addTextToCombatLog'](_0x12566f,_0x5b7831);}}VisuMZ[_0x3a708a(0x27a)][_0x3a708a(0x259)][_0x3a708a(0xf6)](this,_0x281097);},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x155)]=Game_BattlerBase[_0x5254d5(0x197)][_0x5254d5(0xf4)],Game_BattlerBase[_0x5254d5(0x197)][_0x5254d5(0xf4)]=function(_0x39efa3){const _0x1e14bc=_0x5254d5,_0x27654f=VisuMZ['CombatLog'][_0x1e14bc(0x282)][_0x1e14bc(0x1fb)];if(_0x27654f&&_0x27654f[_0x1e14bc(0x288)]&&SceneManager['isSceneBattle']()){let _0x1cb667=_0x27654f[_0x1e14bc(0x13b)];if(_0x1cb667){let _0x4c346a=_0x1cb667['format'](this[_0x1e14bc(0xd9)](),$dataStates[_0x39efa3]['name']),_0x279238=$dataStates[_0x39efa3][_0x1e14bc(0x1e6)];$gameSystem['addTextToCombatLog'](_0x4c346a,_0x279238);}}return VisuMZ[_0x1e14bc(0x27a)][_0x1e14bc(0x155)]['call'](this,_0x39efa3);},VisuMZ[_0x5254d5(0x27a)]['Game_Battler_displayAbsorptionBarrierPopup']=Game_Battler[_0x5254d5(0x197)][_0x5254d5(0x28d)],Game_Battler['prototype'][_0x5254d5(0x28d)]=function(_0x96d042,_0x5823f6){const _0x5ca513=_0x5254d5;VisuMZ[_0x5ca513(0x27a)]['Game_Battler_displayAbsorptionBarrierPopup'][_0x5ca513(0xf6)](this,_0x96d042,_0x5823f6);if(_0x96d042===0x0)return;const _0x5b8a53=VisuMZ[_0x5ca513(0x27a)][_0x5ca513(0x282)]['Compatibility'];if(_0x5b8a53&&_0x5b8a53[_0x5ca513(0x157)]&&SceneManager[_0x5ca513(0x1d3)]()){let _0x494578=_0x5b8a53[_0x5ca513(0x1e8)];if(_0x494578){let _0x1536e7=_0x494578[_0x5ca513(0x25c)](this[_0x5ca513(0xd9)](),_0x5823f6[_0x5ca513(0x204)],_0x96d042),_0x331d0c=_0x5823f6['iconIndex'];$gameSystem[_0x5ca513(0x12e)](_0x1536e7,_0x331d0c);}}},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x1b2)]=Game_Battler[_0x5254d5(0x197)][_0x5254d5(0x128)],Game_Battler['prototype'][_0x5254d5(0x128)]=function(_0x466f69){const _0x30cec0=_0x5254d5,_0x30ba8a=VisuMZ[_0x30cec0(0x27a)][_0x30cec0(0x282)][_0x30cec0(0x1fb)];if(_0x30ba8a&&_0x30ba8a[_0x30cec0(0x19c)]&&SceneManager[_0x30cec0(0x1d3)]()){let _0x33b165=_0x30ba8a[_0x30cec0(0x15e)];if(_0x33b165){let _0x2ffdb7=_0x33b165[_0x30cec0(0x25c)](this[_0x30cec0(0xd9)](),_0x466f69['name'],TextManager['mp']),_0x494692=_0x466f69[_0x30cec0(0x1e6)];$gameSystem[_0x30cec0(0x12e)](_0x2ffdb7,_0x494692);}}VisuMZ['CombatLog'][_0x30cec0(0x1b2)]['call'](this,_0x466f69);},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x23e)]=Game_Battler[_0x5254d5(0x197)][_0x5254d5(0xe8)],Game_Battler[_0x5254d5(0x197)][_0x5254d5(0xe8)]=function(_0x7363b6){const _0x2ff070=_0x5254d5,_0x496072=VisuMZ[_0x2ff070(0x27a)][_0x2ff070(0x282)]['Compatibility'];if(_0x496072&&_0x496072['Show_AntiDmgBarrier_TpDisperse']&&SceneManager[_0x2ff070(0x1d3)]()){let _0x57a182=_0x496072['Text_AntiDmgBarrier_TpDisperse'];if(_0x57a182){let _0x535440=_0x57a182[_0x2ff070(0x25c)](this[_0x2ff070(0xd9)](),_0x7363b6['name'],TextManager['tp']),_0x161128=_0x7363b6['iconIndex'];$gameSystem['addTextToCombatLog'](_0x535440,_0x161128);}}VisuMZ[_0x2ff070(0x27a)]['Game_Battler_onAntiDamageTpBarrier'][_0x2ff070(0xf6)](this,_0x7363b6);},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x15d)]=Game_Battler['prototype'][_0x5254d5(0x18b)],Game_Battler[_0x5254d5(0x197)][_0x5254d5(0x18b)]=function(_0x3e8278){const _0x123fcc=_0x5254d5;VisuMZ[_0x123fcc(0x27a)]['Game_Battler_onLifeStateEffect'][_0x123fcc(0xf6)](this,_0x3e8278);if(!SceneManager[_0x123fcc(0x1d3)]())return;if(!_0x3e8278)return;const _0x51ae24=VisuMZ[_0x123fcc(0x27a)][_0x123fcc(0x282)][_0x123fcc(0x1fb)];if(!_0x51ae24)return;if(!_0x51ae24['Show_LifeStateEffects_%1'['format'](_0x3e8278)])return;let _0x114982=_0x51ae24[_0x123fcc(0x239)[_0x123fcc(0x25c)](_0x3e8278)];if(_0x114982){let _0x3a50f8=_0x114982['format'](this['combatLogName']()),_0xb52216=_0x51ae24[_0x123fcc(0x20e)[_0x123fcc(0x25c)](_0x3e8278)];$gameSystem['addTextToCombatLog'](_0x3a50f8,_0xb52216);}},VisuMZ[_0x5254d5(0x27a)][_0x5254d5(0x221)]=Window_BattleLog[_0x5254d5(0x197)]['addStealText'],Window_BattleLog[_0x5254d5(0x197)]['addStealText']=function(_0x2e717d){const _0x488bbb=_0x5254d5;VisuMZ[_0x488bbb(0x27a)][_0x488bbb(0x221)][_0x488bbb(0xf6)](this,_0x2e717d);if(_0x2e717d==='')return;const _0x1b83c4=VisuMZ['CombatLog']['Settings'][_0x488bbb(0x1fb)];if(_0x1b83c4&&_0x1b83c4[_0x488bbb(0x269)]&&SceneManager[_0x488bbb(0x1d3)]()){let _0x81e5b1=_0x1b83c4[_0x488bbb(0x294)];$gameSystem[_0x488bbb(0x12e)](_0x2e717d,_0x81e5b1);}};