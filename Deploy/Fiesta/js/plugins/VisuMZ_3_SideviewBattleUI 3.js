//=============================================================================
// VisuStella MZ - Sideview Battle UI
// VisuMZ_3_SideviewBattleUI.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_SideviewBattleUI = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SideviewBattleUI = VisuMZ.SideviewBattleUI || {};
VisuMZ.SideviewBattleUI.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.04] [SideviewBattleUI]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Sideview_Battle_UI_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the RPG Maker MZ Battle UI for Sideview Battle Systems
 * into something more minimalistic. The menus are placed towards the player's
 * party to let the player focus their attention to the center of the screen
 * instead of to the lower ledges of the screen. The input command windows show
 * up near the inputting actor to give the player a clear understanding of who
 * is performing what action.
 * 
 * *NOTE* To use this battle layout, you will need the updated version of
 * VisuStella's Battle Core. Go into its Plugin Parameters and change the
 * Battle Layout Settings > Battle Layout Style > plugin parameter to this
 * value: "Sideview Battle UI" or "sideview_ui".
 *
 * Features include all (but not limited to) the following:
 * 
 * * This plugin changes the UI for the RPG Maker MZ Sideview Battle System.
 * * Status windows appear on the side of the screen for each actor in battle.
 * * The appearance is more compact for both the status windows and input
 *   command windows.
 * * More of the battlefield can be seen with this kind of layout.
 * * Lots of customization options to adjust the status windows.
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
 * Sideview Only
 * 
 * This plugin only works for the sideview battle system. If this layout is
 * selected in the Battle Core, the battle system will automatically shift to
 * sideview regardless of the settings.
 * 
 * *NOTE* To use this battle layout, you will need the updated version of
 * VisuStella's Battle Core. Go into its Plugin Parameters and change the
 * Battle Layout Settings > Battle Layout Style > plugin parameter to this
 * value: "Sideview Battle UI" or "sideview_ui".
 *
 * ---
 * 
 * Window Properties
 * 
 * With how the battle layout works, many of the command windows used in the
 * battle system will have preset and hardcoded properties to them in order to
 * maintain a specific aesthetic. These include columns, padding, and scaling
 * types to name a few.
 * 
 * Therefore, any plugins that may alter these effects may not have any effect
 * at all provided that this plugin is in a higher tier than those modifying
 * it. This is an intended change to maintain the aesthetic and is not a bug.
 * 
 * ---
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
 * VisuMZ_2_AggroControlSystem
 * VisuMZ_2_BattleSystemBTB
 * VisuMZ_3_BoostAction
 * VisuMZ_3_StateTooltips
 * VisuMZ_4_BreakShields
 *
 * There are features provided in this plugin for the above plugins. Their UI
 * elements can be shown with this plugin's status windows.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battler Offset Settings
 * ============================================================================
 *
 * Settings for battler sprite offsets when using the Sideview Battle UI.
 * Since there's more room on the screen, placing them lower will help adjust
 * for the player's visual comfort.
 *
 * ---
 *
 * Settings
 * 
 *   Perform Offset?:
 *   - Offsets the battler sprite positions when using Sideview Battle UI.
 * 
 *   Offset X:
 *   - How much to offset the sprite positions by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the sprite positions by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Window Settings
 * ============================================================================
 *
 * Settings for general windows when using the Sideview Battle UI. These
 * settings are made for the windows that aren't the status windows but are
 * affected by this plugin.
 *
 * ---
 *
 * Global
 * 
 *   UI Scale:
 *   - What is the scaling rate for battle windows?
 *   - Use a number between 0 and 1 for the best results.
 *
 * ---
 *
 * Help Window
 * 
 *   Fade BG Style?:
 *   - Fade the Help Window background with this UI?
 *
 * ---
 *
 * Actor Command Window
 * 
 *   Max Rows:
 *   - What is the maximum number of rows for the actor command window with
 *     this UI?
 *
 * ---
 *
 * Party Command Window
 * 
 *   Max Rows:
 *   - What is the maximum number of rows for the party command window with
 *     this UI?
 *
 * ---
 *
 * Item Window
 * 
 *   Max Rows:
 *   - What is the maximum number of rows for the item window with this UI?
 * 
 *   Width:
 *   - What is the width item window with this UI?
 *   - This is the width BEFORE scaling.
 * 
 *   Offset X:
 *   - How much to offset the window X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the window Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Skill Window
 * 
 *   Max Rows:
 *   - What is the maximum number of rows for the skill window with this UI?
 * 
 *   Width:
 *   - What is the width skill window with this UI?
 *   - This is the width BEFORE scaling.
 * 
 *   Offset X:
 *   - How much to offset the window X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the window Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Window Settings
 * ============================================================================
 *
 * Settings for the status window when using the Sideview Battle UI. Each of
 * these plugin parameters allow you to adjust many of the various elements
 * found inside of this window.
 *
 * ---
 *
 * Dimensions
 * 
 *   Width Base:
 *   - How width is each actor's status window?
 *   - This is the width AFTER scaling.
 * 
 *   Height Base:
 *   - How tall do you want the status window to be?
 *   - 'auto' for automatic calculations.
 *   - This is the height BEFORE scaling.
 * 
 *     Height Buffer:
 *     - How much space do you want there to be vertically from window
 *       to window?
 *     - This is the height BEFORE scaling.
 * 
 *   Move Distance:
 *   - How far will the status window move when the actor is selected
 *     or active?
 * 
 *     Move Speed:
 *     - How many pixels with the status window move per frame?
 *
 * ---
 * 
 * Standard UI > BG
 * 
 *   Background Dim?:
 *   - Show the dimmed background?
 * 
 * ---
 *
 * Standard UI > Name
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > States
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Ignore Scale?:
 *   - Ignore scaling to show icons at their real size?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > TPB/ATB Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > HP Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > MP Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > TP Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > Aggro Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_2_AggroControlSystem!
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > Boost Points
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_3_BoostAction!
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > Brave Points
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_2_BattleSystemBTB!
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > Break Shield
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_4_BreakShields!
 * 
 *   Ignore Scale?:
 *   - Ignore scaling to show icons at their real size?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > State Tooltips
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_3_StateTooltips!
 *
 * ---
 * 
 * JS
 * 
 *   JS: Custom UI:
 *   - JavaScript used to add custom elements to each status window.
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
 * Version 1.04: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Status Window Settings > Background Dim?
 * **** Show the dimmed background?
 * 
 * Version 1.03: July 30, 2021
 * * Bug Fixes!
 * ** Plugin Parameters for adjusting row quantity should now work properly.
 *    Fix made by Olivia.
 * 
 * Version 1.02: June 18, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.01: April 23, 2021
 * * Bug Fixes!
 * ** Item window during battle should now align properly. Fix made by Olivia.
 *
 * Version 1.00 Official Release Date: May 12, 2021
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
 * @param SideviewBattleUI
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Battler:struct
 * @text Battler Offset Settings
 * @type struct<Battler>
 * @desc Settings for battler sprite offsets when using the Sideview Battle UI.
 * @default {"Enable:eval":"true","OffsetX:num":"+0","OffsetY:num":"+128"}
 *
 * @param GeneralWindow:struct
 * @text General Window Settings
 * @type struct<GeneralWindow>
 * @desc Settings for general windows when using the Sideview Battle UI.
 * @default {"Global":"","UiScale:num":"0.80","HelpWindow":"","HelpFadeStyle:eval":"true","ActorCommandWindow":"","ActorCommandWindowMaxRows:num":"8","PartyCommandWindow":"","PartyCommandWindowMaxRows:num":"8","ItemWindow":"","ItemWindowMaxRows:num":"8","ItemWindowWidth:num":"400","ItemWindowOffsetX:num":"+16","ItemWindowOffsetY:num":"+16","SkillWindow":"","SkillWindowMaxRows:num":"8","SkillWindowWidth:num":"400","SkillWindowOffsetX:num":"+16","SkillWindowOffsetY:num":"+16"}
 *
 * @param StatusWindow:struct
 * @text Status Window Settings
 * @type struct<StatusWindow>
 * @desc Settings for the status window when using the Sideview Battle UI.
 * @default {"Dimensions":"","WidthBase:num":"200","HeightBase:str":"auto","HeightBuffer:num":"4","MoveDistance:num":"48","MoveSpeed:num":"4","Standard":"","Name":"","NameShow:eval":"true","NameOffsetX:num":"+48","NameOffsetY:num":"+0","States":"","StatesShow:eval":"true","StatesIgnoreScale:eval":"true","StatesOffsetX:num":"+20","StatesOffsetY:num":"+20","Tpb":"","TpbShow:eval":"true","TpbOffsetX:num":"+44","TpbOffsetY:num":"+0","Hp":"","HpShow:eval":"true","HpOffsetX:num":"+60","HpOffsetY:num":"+0","Mp":"","MpShow:eval":"true","MpOffsetX:num":"+68","MpOffsetY:num":"+0","Tp":"","TpShow:eval":"true","TpOffsetX:num":"+74","TpOffsetY:num":"+0","Compatibility":"","Aggro":"","AggroShow:eval":"true","AggroOffsetX:num":"+44","AggroOffsetY:num":"+0","Boost":"","BoostShow:eval":"true","BoostOffsetX:num":"+52","BoostOffsetY:num":"+2","Brave":"","BraveShow:eval":"true","BraveOffsetX:num":"+52","BraveOffsetY:num":"-6","BreakShield":"","BreakShieldShow:eval":"true","BreakShieldIgnoreScale:eval":"true","BreakShieldOffsetX:num":"+20","BreakShieldOffsetY:num":"+20","StateTooltips":"","StateTooltipsShow:eval":"true","JS":"","CustomUi:func":"\"// Declare Variables\\nconst actor = arguments[0];\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\n\\n// Draw Custom Elements\\n// Put in code you want here used for windows classes\""}
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
 * Battler Offset Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battler:
 *
 * @param Enable:eval
 * @text Perform Offset?
 * @type boolean
 * @on Do Offset
 * @off Don't Offset
 * @desc Offsets the battler sprite positions when using Sideview Battle UI.
 * @default true
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the sprite positions by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the sprite positions by?
 * Negative goes up. Positive goes down.
 * @default +128
 *
 */
/* ----------------------------------------------------------------------------
 * GeneralWindow Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GeneralWindow:
 *
 * @param Global
 *
 * @param UiScale:num
 * @text UI Scale
 * @parent Global
 * @desc What is the scaling rate for battle windows?
 * Use a number between 0 and 1 for the best results.
 * @default 0.80
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpFadeStyle:eval
 * @text Fade BG Style?
 * @parent HelpWindow
 * @type boolean
 * @on Fade Background
 * @off Default Background
 * @desc Fade the Help Window background with this UI?
 * @default true
 *
 * @param ActorCommandWindow
 * @text Actor Command Window
 *
 * @param ActorCommandWindowMaxRows:num
 * @text Max Rows
 * @parent ActorCommandWindow
 * @type number
 * @min 1
 * @desc What is the maximum number of rows for the actor command window with this UI?
 * @default 8
 *
 * @param PartyCommandWindow
 * @text Party Command Window
 *
 * @param PartyCommandWindowMaxRows:num
 * @text Max Rows
 * @parent PartyCommandWindow
 * @type number
 * @min 1
 * @desc What is the maximum number of rows for the party command window with this UI?
 * @default 8
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemWindowMaxRows:num
 * @text Max Rows
 * @parent ItemWindow
 * @type number
 * @min 1
 * @desc What is the maximum number of rows for the item window with this UI?
 * @default 8
 *
 * @param ItemWindowWidth:num
 * @text Width
 * @parent ItemWindow
 * @type number
 * @min 1
 * @desc What is the width item window with this UI?
 * This is the width BEFORE scaling.
 * @default 400
 *
 * @param ItemWindowOffsetX:num
 * @text Offset X
 * @parent ItemWindow
 * @desc How much to offset the window X position by?
 * Negative goes left. Positive goes right.
 * @default +16
 *
 * @param ItemWindowOffsetY:num
 * @text Offset Y
 * @parent ItemWindow
 * @desc How much to offset the window Y position by?
 * Negative goes up. Positive goes down.
 * @default +16
 *
 * @param SkillWindow
 * @text Skill Window
 *
 * @param SkillWindowMaxRows:num
 * @text Max Rows
 * @parent SkillWindow
 * @type number
 * @min 1
 * @desc What is the maximum number of rows for the skill window with this UI?
 * @default 8
 *
 * @param SkillWindowWidth:num
 * @text Width
 * @parent SkillWindow
 * @type number
 * @min 1
 * @desc What is the width skill window with this UI?
 * This is the width BEFORE scaling.
 * @default 400
 *
 * @param SkillWindowOffsetX:num
 * @text Offset X
 * @parent SkillWindow
 * @desc How much to offset the window X position by?
 * Negative goes left. Positive goes right.
 * @default +16
 *
 * @param SkillWindowOffsetY:num
 * @text Offset Y
 * @parent SkillWindow
 * @desc How much to offset the window Y position by?
 * Negative goes up. Positive goes down.
 * @default +16
 *
 */
/* ----------------------------------------------------------------------------
 * Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param Dimensions
 *
 * @param WidthBase:num
 * @text Width Base
 * @parent Dimensions
 * @type number
 * @desc How width is each actor's status window?
 * This is the width AFTER scaling.
 * @default 200
 *
 * @param HeightBase:str
 * @text Height Base
 * @parent Dimensions
 * @type number
 * @desc How tall do you want the status window to be?
 * 'auto' for automatic calculations. Value is BEFORE scaling.
 * @default auto
 *
 * @param HeightBuffer:num
 * @text Height Buffer
 * @parent HeightBase:str
 * @type number
 * @desc How much space do you want there to be vertically from window to window?
 * @default 4
 *
 * @param MoveDistance:num
 * @text Move Distance
 * @parent Dimensions
 * @type number
 * @desc How far will the status window move when
 * the actor is selected or active?
 * @default 48
 *
 * @param MoveSpeed:num
 * @text Move Speed
 * @parent MoveDistance:num
 * @type number
 * @desc How many pixels with the status window move per frame?
 * @default 4
 *
 * @param Standard
 * @text Standard UI
 *
 * @param BgShow:eval
 * @text Background Dim?
 * @parent Standard
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the dimmed background?
 * @default true
 * 
 * @param Name
 * @parent Standard
 *
 * @param NameShow:eval
 * @text Show?
 * @parent Name
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param NameOffsetX:num
 * @text Offset X
 * @parent Name
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +48
 *
 * @param NameOffsetY:num
 * @text Offset Y
 * @parent Name
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param States
 * @parent Standard
 *
 * @param StatesShow:eval
 * @text Show?
 * @parent States
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param StatesIgnoreScale:eval
 * @text Ignore Scale?
 * @parent States
 * @type boolean
 * @on Ignore Scaling
 * @off Use Scaling
 * @desc Ignore scaling to show icons at their real size?
 * @default true
 *
 * @param StatesOffsetX:num
 * @text Offset X
 * @parent States
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +20
 *
 * @param StatesOffsetY:num
 * @text Offset Y
 * @parent States
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +20
 * 
 * @param Tpb
 * @text TPB/ATB Gauge
 * @parent Standard
 *
 * @param TpbShow:eval
 * @text Show?
 * @parent Tpb
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param TpbOffsetX:num
 * @text Offset X
 * @parent Tpb
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +44
 *
 * @param TpbOffsetY:num
 * @text Offset Y
 * @parent Tpb
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param Hp
 * @text HP Gauge
 * @parent Standard
 *
 * @param HpShow:eval
 * @text Show?
 * @parent Hp
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param HpOffsetX:num
 * @text Offset X
 * @parent Hp
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +60
 *
 * @param HpOffsetY:num
 * @text Offset Y
 * @parent Hp
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param Mp
 * @text MP Gauge
 * @parent Standard
 *
 * @param MpShow:eval
 * @text Show?
 * @parent Mp
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param MpOffsetX:num
 * @text Offset X
 * @parent Mp
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +68
 *
 * @param MpOffsetY:num
 * @text Offset Y
 * @parent Mp
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param Tp
 * @text TP Gauge
 * @parent Standard
 *
 * @param TpShow:eval
 * @text Show?
 * @parent Tp
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param TpOffsetX:num
 * @text Offset X
 * @parent Tp
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +74
 *
 * @param TpOffsetY:num
 * @text Offset Y
 * @parent Tp
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param Compatibility
 * @text Compatibility UI
 * 
 * @param Aggro
 * @text Aggro Gauge
 * @parent Compatibility
 * @default VisuMZ_2_AggroControlSystem
 *
 * @param AggroShow:eval
 * @text Show?
 * @parent Aggro
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_2_AggroControlSystem!
 * @default true
 *
 * @param AggroOffsetX:num
 * @text Offset X
 * @parent Aggro
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +44
 *
 * @param AggroOffsetY:num
 * @text Offset Y
 * @parent Aggro
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param Boost
 * @text Boost Points
 * @parent Compatibility
 * @default VisuMZ_3_BoostAction
 *
 * @param BoostShow:eval
 * @text Show?
 * @parent Boost
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_3_BoostAction!
 * @default true
 *
 * @param BoostOffsetX:num
 * @text Offset X
 * @parent Boost
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +52
 *
 * @param BoostOffsetY:num
 * @text Offset Y
 * @parent Boost
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +2
 * 
 * @param Brave
 * @text Brave Points
 * @parent Compatibility
 * @default VisuMZ_2_BattleSystemBTB
 *
 * @param BraveShow:eval
 * @text Show?
 * @parent Brave
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_2_BattleSystemBTB!
 * @default true
 *
 * @param BraveOffsetX:num
 * @text Offset X
 * @parent Brave
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +52
 *
 * @param BraveOffsetY:num
 * @text Offset Y
 * @parent Brave
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default -6
 * 
 * @param BreakShield
 * @text Break Shield
 * @parent Compatibility
 * @default VisuMZ_4_BreakShields
 *
 * @param BreakShieldShow:eval
 * @text Show?
 * @parent BreakShield
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_4_BreakShields!
 * @default true
 *
 * @param BreakShieldIgnoreScale:eval
 * @text Ignore Scale?
 * @parent BreakShield
 * @type boolean
 * @on Ignore Scaling
 * @off Use Scaling
 * @desc Ignore scaling to show icons at their real size?
 * @default true
 *
 * @param BreakShieldOffsetX:num
 * @text Offset X
 * @parent BreakShield
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +20
 *
 * @param BreakShieldOffsetY:num
 * @text Offset Y
 * @parent BreakShield
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +20
 * 
 * @param StateTooltips
 * @text State Tooltips
 * @parent Compatibility
 * @default VisuMZ_3_StateTooltips
 *
 * @param StateTooltipsShow:eval
 * @text Show?
 * @parent StateTooltips
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_3_StateTooltips!
 * @default true
 *
 * @param JS
 *
 * @param CustomUi:func
 * @text JS: Custom UI
 * @parent JS
 * @type note
 * @desc JavaScript used to add custom elements to each status window.
 * @default "// Declare Variables\nconst actor = arguments[0];\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\n\n// Draw Custom Elements\n// Put in code you want here used for windows classes"
 *
 */
//=============================================================================

function _0x3d88(_0x2704cc,_0x5b98b7){const _0x353657=_0x3536();return _0x3d88=function(_0x3d882f,_0x324447){_0x3d882f=_0x3d882f-0xc5;let _0x6e90a4=_0x353657[_0x3d882f];return _0x6e90a4;},_0x3d88(_0x2704cc,_0x5b98b7);}const _0x2801ab=_0x3d88;(function(_0x45c721,_0x2ee996){const _0x266c80=_0x3d88,_0x15f22e=_0x45c721();while(!![]){try{const _0x3f65f0=parseInt(_0x266c80(0x164))/0x1+parseInt(_0x266c80(0xef))/0x2+parseInt(_0x266c80(0x119))/0x3+parseInt(_0x266c80(0x1cd))/0x4+parseInt(_0x266c80(0x121))/0x5+-parseInt(_0x266c80(0x131))/0x6+-parseInt(_0x266c80(0x15e))/0x7*(parseInt(_0x266c80(0xd7))/0x8);if(_0x3f65f0===_0x2ee996)break;else _0x15f22e['push'](_0x15f22e['shift']());}catch(_0x2e543c){_0x15f22e['push'](_0x15f22e['shift']());}}}(_0x3536,0x7d936));var label=_0x2801ab(0x1d7),tier=tier||0x0,dependencies=['VisuMZ_1_BattleCore'],pluginData=$plugins[_0x2801ab(0x1dd)](function(_0x16a3fd){const _0x4ac36a=_0x2801ab;return _0x16a3fd[_0x4ac36a(0x153)]&&_0x16a3fd[_0x4ac36a(0x1f6)][_0x4ac36a(0xe4)]('['+label+']');})[0x0];VisuMZ[label][_0x2801ab(0xe2)]=VisuMZ[label][_0x2801ab(0xe2)]||{},VisuMZ['ConvertParams']=function(_0x40d854,_0x47f7b1){const _0x1cc5df=_0x2801ab;for(const _0x53c144 in _0x47f7b1){if(_0x53c144[_0x1cc5df(0x15d)](/(.*):(.*)/i)){const _0x22cf60=String(RegExp['$1']),_0x45e3c1=String(RegExp['$2'])[_0x1cc5df(0x127)]()[_0x1cc5df(0xe0)]();let _0x22d890,_0x9d0d81,_0x15aabe;switch(_0x45e3c1){case _0x1cc5df(0x178):_0x22d890=_0x47f7b1[_0x53c144]!==''?Number(_0x47f7b1[_0x53c144]):0x0;break;case _0x1cc5df(0x1e3):_0x9d0d81=_0x47f7b1[_0x53c144]!==''?JSON[_0x1cc5df(0x159)](_0x47f7b1[_0x53c144]):[],_0x22d890=_0x9d0d81['map'](_0x498bb0=>Number(_0x498bb0));break;case _0x1cc5df(0x12d):_0x22d890=_0x47f7b1[_0x53c144]!==''?eval(_0x47f7b1[_0x53c144]):null;break;case _0x1cc5df(0x124):_0x9d0d81=_0x47f7b1[_0x53c144]!==''?JSON['parse'](_0x47f7b1[_0x53c144]):[],_0x22d890=_0x9d0d81['map'](_0xd1ba64=>eval(_0xd1ba64));break;case _0x1cc5df(0x176):_0x22d890=_0x47f7b1[_0x53c144]!==''?JSON[_0x1cc5df(0x159)](_0x47f7b1[_0x53c144]):'';break;case'ARRAYJSON':_0x9d0d81=_0x47f7b1[_0x53c144]!==''?JSON[_0x1cc5df(0x159)](_0x47f7b1[_0x53c144]):[],_0x22d890=_0x9d0d81[_0x1cc5df(0x120)](_0x3ecb24=>JSON[_0x1cc5df(0x159)](_0x3ecb24));break;case _0x1cc5df(0xfb):_0x22d890=_0x47f7b1[_0x53c144]!==''?new Function(JSON[_0x1cc5df(0x159)](_0x47f7b1[_0x53c144])):new Function('return\x200');break;case _0x1cc5df(0x10a):_0x9d0d81=_0x47f7b1[_0x53c144]!==''?JSON[_0x1cc5df(0x159)](_0x47f7b1[_0x53c144]):[],_0x22d890=_0x9d0d81[_0x1cc5df(0x120)](_0x46cd76=>new Function(JSON['parse'](_0x46cd76)));break;case _0x1cc5df(0x139):_0x22d890=_0x47f7b1[_0x53c144]!==''?String(_0x47f7b1[_0x53c144]):'';break;case _0x1cc5df(0x18b):_0x9d0d81=_0x47f7b1[_0x53c144]!==''?JSON[_0x1cc5df(0x159)](_0x47f7b1[_0x53c144]):[],_0x22d890=_0x9d0d81[_0x1cc5df(0x120)](_0x228960=>String(_0x228960));break;case _0x1cc5df(0x1c0):_0x15aabe=_0x47f7b1[_0x53c144]!==''?JSON['parse'](_0x47f7b1[_0x53c144]):{},_0x22d890=VisuMZ[_0x1cc5df(0x157)]({},_0x15aabe);break;case'ARRAYSTRUCT':_0x9d0d81=_0x47f7b1[_0x53c144]!==''?JSON[_0x1cc5df(0x159)](_0x47f7b1[_0x53c144]):[],_0x22d890=_0x9d0d81[_0x1cc5df(0x120)](_0x49e3c3=>VisuMZ[_0x1cc5df(0x157)]({},JSON[_0x1cc5df(0x159)](_0x49e3c3)));break;default:continue;}_0x40d854[_0x22cf60]=_0x22d890;}}return _0x40d854;},(_0x5ebb35=>{const _0x5d3663=_0x2801ab,_0x37238b=_0x5ebb35[_0x5d3663(0x1be)];for(const _0x5ccb1f of dependencies){if(!Imported[_0x5ccb1f]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x5d3663(0x1a8)](_0x37238b,_0x5ccb1f)),SceneManager[_0x5d3663(0x1d5)]();break;}}const _0xdb4a9e=_0x5ebb35['description'];if(_0xdb4a9e['match'](/\[Version[ ](.*?)\]/i)){const _0x4f0f5c=Number(RegExp['$1']);if(_0x4f0f5c!==VisuMZ[label][_0x5d3663(0xe8)]){if(_0x5d3663(0x1c2)===_0x5d3663(0x1c2))alert(_0x5d3663(0x11b)['format'](_0x37238b,_0x4f0f5c)),SceneManager[_0x5d3663(0x1d5)]();else{const _0x158072=_0x367176[_0x5d3663(0x1d7)][_0x5d3663(0x169)][_0x5d3663(0x195)](this);return _0x196f44['isUsingSideviewUiLayout']()&&(_0x158072['y']=_0x3ce3fc[_0x5d3663(0x1f0)]*0xa,_0x158072[_0x5d3663(0x1f0)]=0x0),_0x158072;}}}if(_0xdb4a9e['match'](/\[Tier[ ](\d+)\]/i)){if(_0x5d3663(0x152)!==_0x5d3663(0x152))return _0x45d114[_0x5d3663(0x1fe)]&&_0x42174a[_0x5d3663(0x1d9)]&&_0x1c9f78['VisuMZ_2_AggroControlSystem']&&_0x966384[_0x5d3663(0x162)]&&_0x3d777a[_0x5d3663(0x16b)][_0x5d3663(0xe2)]['Aggro'][_0x5d3663(0xe7)];else{const _0x5a8df7=Number(RegExp['$1']);if(_0x5a8df7<tier){if(_0x5d3663(0xd6)==='KeAWN')alert(_0x5d3663(0x1ab)[_0x5d3663(0x1a8)](_0x37238b,_0x5a8df7,tier)),SceneManager[_0x5d3663(0x1d5)]();else return _0x2eb407[_0x5d3663(0x1d7)][_0x5d3663(0x106)][_0x5d3663(0x195)](this);}else _0x5d3663(0x173)!==_0x5d3663(0x173)?(this[_0x5d3663(0x145)][_0x5d3663(0x1b4)](),this[_0x5d3663(0xf1)]['updateSideviewUiPosition']()):tier=Math[_0x5d3663(0xe6)](_0x5a8df7,tier);}}VisuMZ[_0x5d3663(0x157)](VisuMZ[label][_0x5d3663(0xe2)],_0x5ebb35['parameters']);})(pluginData),BattleManager[_0x2801ab(0x1d3)]=function(){const _0x3c9f5d=_0x2801ab;return SceneManager['isSceneBattle']()&&SceneManager[_0x3c9f5d(0xd1)][_0x3c9f5d(0x1f5)]()==='sideview_ui';},VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0x174)]=Game_System[_0x2801ab(0x17a)][_0x2801ab(0x1b2)],Game_System['prototype'][_0x2801ab(0x1b2)]=function(){const _0x17161a=_0x2801ab;if(BattleManager[_0x17161a(0x1d3)]()){if(_0x17161a(0x13c)!==_0x17161a(0x13c))this[_0x17161a(0x135)]();else return!![];}return VisuMZ[_0x17161a(0x1d7)][_0x17161a(0x174)][_0x17161a(0x195)](this);},VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0x1db)]=Scene_Base['prototype']['isWindowMaskingEnabled'],Scene_Base[_0x2801ab(0x17a)][_0x2801ab(0x1c1)]=function(){const _0x501c24=_0x2801ab;return BattleManager[_0x501c24(0x1d3)]()?![]:VisuMZ[_0x501c24(0x1d7)][_0x501c24(0x1db)][_0x501c24(0x195)](this);},VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0x1c5)]=Scene_Battle[_0x2801ab(0x17a)]['statusWindowRect'],Scene_Battle[_0x2801ab(0x17a)][_0x2801ab(0x17d)]=function(){const _0x395a1b=_0x2801ab,_0x5481c4=VisuMZ['SideviewBattleUI'][_0x395a1b(0x1c5)][_0x395a1b(0x195)](this);if(BattleManager[_0x395a1b(0x1d3)]()){if('TzxZa'!==_0x395a1b(0x151))_0x5481c4['y']=Graphics[_0x395a1b(0x1f0)]*0xa,_0x5481c4[_0x395a1b(0x1f0)]=0x0;else{if(_0x1bcd6e[_0x395a1b(0x1d3)]())return!![];return _0x4d5c44[_0x395a1b(0x1d7)][_0x395a1b(0x174)][_0x395a1b(0x195)](this);}}return _0x5481c4;},VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0x169)]=Scene_Battle[_0x2801ab(0x17a)]['actorWindowRect'],Scene_Battle[_0x2801ab(0x17a)][_0x2801ab(0x15b)]=function(){const _0x46d18b=_0x2801ab,_0xa54ded=VisuMZ['SideviewBattleUI'][_0x46d18b(0x169)]['call'](this);return BattleManager['isUsingSideviewUiLayout']()&&(_0x46d18b(0x190)!=='iuqoQ'?(_0xa54ded['y']=Graphics['height']*0xa,_0xa54ded[_0x46d18b(0x1f0)]=0x0):(_0x2111a8['SideviewBattleUI'][_0x46d18b(0x10f)][_0x46d18b(0x195)](this),this['adjustSideviewUiWidth'](),this[_0x46d18b(0x1ec)]())),_0xa54ded;},VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0x11a)]=Scene_Battle[_0x2801ab(0x17a)][_0x2801ab(0xcd)],Scene_Battle[_0x2801ab(0x17a)][_0x2801ab(0xcd)]=function(){const _0x416092=_0x2801ab;VisuMZ['SideviewBattleUI'][_0x416092(0x11a)][_0x416092(0x195)](this),this[_0x416092(0x179)]();},Scene_Battle[_0x2801ab(0x17a)][_0x2801ab(0x179)]=function(){const _0x2be205=_0x2801ab;if(!BattleManager[_0x2be205(0x11c)]())return;if(!BattleManager[_0x2be205(0x1d3)]())return;this[_0x2be205(0xc5)][_0x2be205(0x1a3)]&&this['_partyCommandWindow'][_0x2be205(0x1b4)]();this[_0x2be205(0x145)][_0x2be205(0x1a3)]&&this[_0x2be205(0x145)][_0x2be205(0x1b4)]();this[_0x2be205(0xf1)]['active']&&(_0x2be205(0x16e)==='taKex'?(_0x6b460[_0x2be205(0x1d3)]()&&_0x17dbc3[_0x2be205(0x1ef)]&&(_0x146834+=_0x3b4d89[_0x2be205(0x16a)],_0x27ffc5+=_0x55e4e2[_0x2be205(0x181)]),_0x98b49a[_0x2be205(0x1d7)][_0x2be205(0x101)][_0x2be205(0x195)](this,_0x355743,_0x1d1de6)):(this[_0x2be205(0x145)][_0x2be205(0x1b4)](),this[_0x2be205(0xf1)][_0x2be205(0x1b4)]()));this[_0x2be205(0x1cc)][_0x2be205(0x1a3)]&&(this[_0x2be205(0x145)][_0x2be205(0x1b4)](),this[_0x2be205(0x1cc)][_0x2be205(0x1b4)]());if(this[_0x2be205(0xe5)][_0x2be205(0x1a3)]){if(_0x2be205(0x1d0)!==_0x2be205(0x1d0))return _0x8233d3['SideviewBattleUI'][_0x2be205(0x1db)]['call'](this);else this[_0x2be205(0x145)][_0x2be205(0x15f)](),this['_skillWindow'][_0x2be205(0x15f)](),this[_0x2be205(0x1cc)][_0x2be205(0x15f)]();}this[_0x2be205(0x117)][_0x2be205(0x1a3)]&&(this[_0x2be205(0x145)]['updateSideviewUiFadeOut'](),this['_skillWindow'][_0x2be205(0x15f)](),this[_0x2be205(0x1cc)][_0x2be205(0x15f)]());},VisuMZ['SideviewBattleUI'][_0x2801ab(0x1ed)]=Scene_Battle[_0x2801ab(0x17a)][_0x2801ab(0x13f)],Scene_Battle['prototype'][_0x2801ab(0x13f)]=function(){const _0x36fa20=_0x2801ab;VisuMZ[_0x36fa20(0x1d7)][_0x36fa20(0x1ed)][_0x36fa20(0x195)](this),this['createSideviewUiBattleStatusWindows']();},Scene_Battle[_0x2801ab(0x17a)]['createSideviewUiBattleStatusWindows']=function(){const _0x566097=_0x2801ab;if(!BattleManager[_0x566097(0x1d3)]())return;this[_0x566097(0x1fb)]=[];const _0x390b88=$gameParty[_0x566097(0xcf)]();for(let _0x57cbae=0x0;_0x57cbae<_0x390b88;_0x57cbae++){if(_0x566097(0x116)===_0x566097(0x116)){const _0x8804ed=new Window_SideviewUiBattleStatus(_0x57cbae);this[_0x566097(0x1d8)](_0x8804ed),this[_0x566097(0x1fb)][_0x566097(0xeb)](_0x8804ed);}else _0x5a1a6c[_0x566097(0x1d7)][_0x566097(0x1f4)][_0x566097(0x195)](this);}},Scene_Battle[_0x2801ab(0x17a)]['refreshSideviewUiBattleStatusWindows']=function(){const _0x32b08f=_0x2801ab;if(!this[_0x32b08f(0x1fb)])return;for(const _0x1519ec of this[_0x32b08f(0x1fb)]){if(!_0x1519ec)continue;_0x1519ec[_0x32b08f(0x14e)]();}},VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xd8)]=Scene_Battle['prototype']['createCancelButton'],Scene_Battle[_0x2801ab(0x17a)][_0x2801ab(0x19e)]=function(){const _0x4e6479=_0x2801ab;if(BattleManager[_0x4e6479(0x1d3)]())return;VisuMZ['SideviewBattleUI'][_0x4e6479(0xd8)][_0x4e6479(0x195)](this);},Sprite_Battler[_0x2801ab(0x1ef)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x132)]['Enable']??!![],Sprite_Battler[_0x2801ab(0x16a)]=VisuMZ[_0x2801ab(0x1d7)]['Settings']['Battler'][_0x2801ab(0xdd)]??0x0,Sprite_Battler[_0x2801ab(0x181)]=VisuMZ[_0x2801ab(0x1d7)]['Settings'][_0x2801ab(0x132)][_0x2801ab(0x150)]??0x80,VisuMZ['SideviewBattleUI'][_0x2801ab(0x101)]=Sprite_Battler[_0x2801ab(0x17a)]['setHome'],Sprite_Battler['prototype'][_0x2801ab(0x1e4)]=function(_0x52df64,_0x4f88ea){const _0x545978=_0x2801ab;BattleManager[_0x545978(0x1d3)]()&&Sprite_Battler[_0x545978(0x1ef)]&&(_0x52df64+=Sprite_Battler[_0x545978(0x16a)],_0x4f88ea+=Sprite_Battler[_0x545978(0x181)]),VisuMZ[_0x545978(0x1d7)]['Sprite_Battler_setHome'][_0x545978(0x195)](this,_0x52df64,_0x4f88ea);},Window_Base[_0x2801ab(0x123)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)]['GeneralWindow']['UiScale']??0.8,Window_Base[_0x2801ab(0xca)]=0x0,Window_Base[_0x2801ab(0x108)]=0x0,Window_Base[_0x2801ab(0x17a)]['initMembersSideviewUi']=function(){const _0x340a5d=_0x2801ab;if(!this[_0x340a5d(0x1d3)]())return;const _0x181b7d=Window_Base[_0x340a5d(0x123)];this[_0x340a5d(0x1d6)]['x']=this['scale']['y']=_0x181b7d;},Window_Base[_0x2801ab(0x17a)][_0x2801ab(0x1d3)]=function(){return BattleManager['isUsingSideviewUiLayout']();},Window_Base['prototype'][_0x2801ab(0x137)]=function(){const _0x4b2880=_0x2801ab;if(!this[_0x4b2880(0x1d3)]())return;const _0x680af0=this['scale']['x'],_0x938109=-(Math[_0x4b2880(0x1b1)](Graphics['width']-Graphics['boxWidth'])/0x2),_0x25fe97=_0x938109+Graphics[_0x4b2880(0x129)]-Math['ceil'](this[_0x4b2880(0x129)]*_0x680af0),_0x41c50b=-(Math[_0x4b2880(0x1b1)](Graphics[_0x4b2880(0x1f0)]-Graphics[_0x4b2880(0xe1)])/0x2),_0x1e1e0d=_0x41c50b+Graphics[_0x4b2880(0x1f0)]-Math[_0x4b2880(0x166)](this[_0x4b2880(0x1f0)]*_0x680af0);this['x']=this['x']['clamp'](_0x938109,_0x25fe97),this['y']=this['y']['clamp'](_0x41c50b,_0x1e1e0d);},Window_Base[_0x2801ab(0x17a)]['sideviewUiTargetActor']=function(){const _0x3fc67b=_0x2801ab;return BattleManager[_0x3fc67b(0xc6)]||$gameParty[_0x3fc67b(0xee)]()[0x0];},Window_Base['prototype']['updateSideviewUiPosition']=function(){const _0x2a70d9=_0x2801ab;if(!this[_0x2a70d9(0x1d3)]())return;const _0x498775=this[_0x2a70d9(0x15c)]();if(!_0x498775)return;const _0x232ec8=_0x498775[_0x2a70d9(0x182)]();this['x']=_0x232ec8['x']+Math[_0x2a70d9(0x142)](_0x232ec8['width']/0x2),this['x']-=Math[_0x2a70d9(0x142)]((Graphics[_0x2a70d9(0x129)]-Graphics[_0x2a70d9(0x1de)])/0x2),this['x']+=SceneManager[_0x2a70d9(0xd1)][_0x2a70d9(0x14d)][_0x2a70d9(0x1e9)]['x'],this['x']+=this[_0x2a70d9(0x170)](),this['y']=_0x232ec8['y']-_0x232ec8[_0x2a70d9(0x1f0)],this['y']-=Math[_0x2a70d9(0x142)]((Graphics[_0x2a70d9(0x1f0)]-Graphics['boxHeight'])/0x2),this['y']+=SceneManager[_0x2a70d9(0xd1)][_0x2a70d9(0x14d)][_0x2a70d9(0x1e9)]['y'],this['y']+=this[_0x2a70d9(0x1aa)](),this[_0x2a70d9(0x137)](),this[_0x2a70d9(0x1da)]();},Window_Base[_0x2801ab(0x17a)]['sideviewUiPositionOffsetX']=function(){const _0x209853=_0x2801ab;return Window_Base[_0x209853(0xca)];},Window_Base[_0x2801ab(0x17a)][_0x2801ab(0x1aa)]=function(){const _0x9ec13a=_0x2801ab;return Window_Base[_0x9ec13a(0x108)];},Window_Base['prototype'][_0x2801ab(0x1a9)]=function(){const _0x569ab1=_0x2801ab;if(!this[_0x569ab1(0x1d3)]())return;const _0x484d26=this[_0x569ab1(0x129)];this[_0x569ab1(0x129)]=this[_0x569ab1(0x122)](),_0x484d26!==this['width']&&this[_0x569ab1(0x1bf)]();},Window_Base[_0x2801ab(0x17a)][_0x2801ab(0x122)]=function(){const _0x4b4247=_0x2801ab;return VisuMZ[_0x4b4247(0x1e1)][_0x4b4247(0xe2)][_0x4b4247(0xc7)][_0x4b4247(0x202)]||0xc0;},Window_Base['prototype']['adjustSideviewUiHeight']=function(){const _0xdc00f2=_0x2801ab;if(!this[_0xdc00f2(0x1d3)]())return;const _0x447f6c=this['height'],_0x51ece5=this['dataSideviewUiLength'](),_0x35dae3=this[_0xdc00f2(0x171)](_0x51ece5),_0x382085=this[_0xdc00f2(0x171)](this[_0xdc00f2(0xf4)]());this['height']=Math[_0xdc00f2(0x1ff)](_0x35dae3,_0x382085),_0x447f6c!==this[_0xdc00f2(0x1f0)]&&this[_0xdc00f2(0x1bf)]();},Window_Base['prototype']['dataSideviewUiLength']=function(){const _0x11ddcf=_0x2801ab;if(this[_0x11ddcf(0x17b)])return this['_data']['length'];if(this[_0x11ddcf(0x1fd)])return this[_0x11ddcf(0x1fd)]['length'];return 0x4;},Window_Base['prototype'][_0x2801ab(0xf4)]=function(){return 0x8;},Window_Base[_0x2801ab(0x17a)]['updateSideviewUiFadeIn']=function(){const _0x214508=_0x2801ab;if(this[_0x214508(0xfe)]&&!this[_0x214508(0x1a3)])return;this[_0x214508(0x1c3)]=!![];},Window_Base['prototype'][_0x2801ab(0x15f)]=function(){const _0x25e541=_0x2801ab;this[_0x25e541(0x1c3)]=![];},Window_Help[_0x2801ab(0x10c)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x16c)][_0x2801ab(0x1ca)]??!![],VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0x1ce)]=Window_Help[_0x2801ab(0x17a)][_0x2801ab(0x110)],Window_Help[_0x2801ab(0x17a)][_0x2801ab(0x110)]=function(_0x4bf25e){const _0x159a57=_0x2801ab;VisuMZ[_0x159a57(0x1d7)][_0x159a57(0x1ce)][_0x159a57(0x195)](this,_0x4bf25e),this['createSideviewUiDimmerSprite']();},Window_Help[_0x2801ab(0x17a)][_0x2801ab(0x19c)]=function(){const _0x1de307=_0x2801ab;if(!this[_0x1de307(0x1d3)]())return;if(!Window_Help[_0x1de307(0x10c)])return;this[_0x1de307(0x172)]=0x0;!this[_0x1de307(0x163)]&&(this[_0x1de307(0x163)]=new Sprite(),this[_0x1de307(0x1fa)](this[_0x1de307(0x163)]));const _0x2cd499=this[_0x1de307(0x129)]-Window_SideviewUiBattleStatus[_0x1de307(0x10b)],_0x547f67=this['lineHeight']()*0x2;this[_0x1de307(0x163)][_0x1de307(0x1e7)]=new Bitmap(_0x2cd499,_0x547f67),this[_0x1de307(0x163)]['x']=-0x4,this[_0x1de307(0x163)]['y']=this[_0x1de307(0x149)];const _0x224bb5=this[_0x1de307(0x163)][_0x1de307(0x1e7)],_0x560291=ColorManager[_0x1de307(0x1eb)](),_0x2e4e73=ColorManager['dimColor2']();_0x224bb5[_0x1de307(0xfc)](0x0,0x0,Math[_0x1de307(0x142)](_0x2cd499/0x2),_0x547f67,_0x560291),_0x224bb5[_0x1de307(0x183)](Math['round'](_0x2cd499/0x2),0x0,Math['round'](_0x2cd499/0x2),_0x547f67,_0x560291,_0x2e4e73);},Window_ItemList[_0x2801ab(0x1bb)]=VisuMZ['SideviewBattleUI']['Settings'][_0x2801ab(0x16c)][_0x2801ab(0x1ae)]??0x8,Window_ItemList[_0x2801ab(0x104)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x16c)][_0x2801ab(0x136)]??0x190,Window_ItemList[_0x2801ab(0xca)]=VisuMZ[_0x2801ab(0x1d7)]['Settings'][_0x2801ab(0x16c)][_0x2801ab(0x18c)]??0x10,Window_ItemList[_0x2801ab(0x108)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x16c)][_0x2801ab(0x147)]??0x10,VisuMZ[_0x2801ab(0x1d7)]['Window_ItemList_initialize']=Window_ItemList['prototype']['initialize'],Window_ItemList[_0x2801ab(0x17a)]['initialize']=function(_0x985abe){const _0x2571ec=_0x2801ab;VisuMZ[_0x2571ec(0x1d7)][_0x2571ec(0x113)][_0x2571ec(0x195)](this,_0x985abe),this[_0x2571ec(0x1fc)]();},VisuMZ['SideviewBattleUI'][_0x2801ab(0x198)]=Window_ItemList[_0x2801ab(0x17a)][_0x2801ab(0x1c9)],Window_ItemList['prototype'][_0x2801ab(0x1c9)]=function(){const _0x50b01d=_0x2801ab;return this['isUsingSideviewUiLayout']()?'XrZsx'!=='XrZsx'?_0x10e230['SideviewBattleUI'][_0x50b01d(0x198)]['call'](this):0x1:VisuMZ['SideviewBattleUI'][_0x50b01d(0x198)][_0x50b01d(0x195)](this);},VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0x1b5)]=Window_ItemList[_0x2801ab(0x17a)][_0x2801ab(0x155)],Window_ItemList[_0x2801ab(0x17a)][_0x2801ab(0x155)]=function(){const _0x9ce7bc=_0x2801ab;if(this[_0x9ce7bc(0x1d3)]()){if(_0x9ce7bc(0xfd)!==_0x9ce7bc(0x1e8))return 0x0;else{let _0x5145c9=_0x57990e[_0x9ce7bc(0x17a)][_0x9ce7bc(0x170)][_0x9ce7bc(0x195)](this);return _0x5145c9+_0x128e8d[_0x9ce7bc(0xca)];}}else return VisuMZ[_0x9ce7bc(0x1d7)]['Window_ItemList_colSpacing'][_0x9ce7bc(0x195)](this);},VisuMZ['SideviewBattleUI'][_0x2801ab(0xdc)]=Window_ItemList[_0x2801ab(0x17a)][_0x2801ab(0x17c)],Window_ItemList[_0x2801ab(0x17a)][_0x2801ab(0x17c)]=function(){const _0x13888a=_0x2801ab;VisuMZ['SideviewBattleUI'][_0x13888a(0xdc)][_0x13888a(0x195)](this),this[_0x13888a(0x1a9)](),this[_0x13888a(0x1ec)](),this[_0x13888a(0x1b4)]();},Window_ItemList[_0x2801ab(0x17a)][_0x2801ab(0x15c)]=function(){const _0x3f89d0=_0x2801ab;return this[_0x3f89d0(0x12a)]||Window_Base['prototype'][_0x3f89d0(0x15c)]['call'](this);},Window_ItemList['prototype'][_0x2801ab(0x122)]=function(){return Window_ItemList['SIDEVIEW_BATTLE_UI_WINDOW_WIDTH']||0xc0;},Window_ItemList[_0x2801ab(0x17a)]['sideviewUiPositionOffsetX']=function(){const _0x41b988=_0x2801ab;let _0x47f171=Window_Selectable['prototype']['sideviewUiPositionOffsetX']['call'](this);return _0x47f171+Window_ItemList[_0x41b988(0xca)];},Window_ItemList['prototype'][_0x2801ab(0x1aa)]=function(){const _0x54b5ec=_0x2801ab;let _0x3c6ac6=Window_Selectable[_0x54b5ec(0x17a)][_0x54b5ec(0x1aa)]['call'](this);return _0x3c6ac6+Window_ItemList[_0x54b5ec(0x108)];},Window_SkillList[_0x2801ab(0x1bb)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)]['GeneralWindow'][_0x2801ab(0xdf)]??0x8,Window_SkillList[_0x2801ab(0x104)]=VisuMZ['SideviewBattleUI']['Settings'][_0x2801ab(0x16c)][_0x2801ab(0x1c4)]??0x190,Window_SkillList[_0x2801ab(0xca)]=VisuMZ[_0x2801ab(0x1d7)]['Settings'][_0x2801ab(0x16c)][_0x2801ab(0x1d1)]??0x10,Window_SkillList[_0x2801ab(0x108)]=VisuMZ[_0x2801ab(0x1d7)]['Settings']['GeneralWindow'][_0x2801ab(0x12b)]??0x10,VisuMZ['SideviewBattleUI'][_0x2801ab(0x187)]=Window_SkillList['prototype']['initialize'],Window_SkillList[_0x2801ab(0x17a)][_0x2801ab(0x110)]=function(_0x25846d){const _0x241d29=_0x2801ab;VisuMZ[_0x241d29(0x1d7)][_0x241d29(0x187)]['call'](this,_0x25846d),this[_0x241d29(0x1fc)]();},VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0x106)]=Window_SkillList['prototype']['maxCols'],Window_SkillList[_0x2801ab(0x17a)][_0x2801ab(0x1c9)]=function(){const _0xb8fe6b=_0x2801ab;return this[_0xb8fe6b(0x1d3)]()?0x1:VisuMZ[_0xb8fe6b(0x1d7)][_0xb8fe6b(0x106)][_0xb8fe6b(0x195)](this);},VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0x1af)]=Window_SkillList[_0x2801ab(0x17a)][_0x2801ab(0x155)],Window_SkillList[_0x2801ab(0x17a)][_0x2801ab(0x155)]=function(){const _0x16473d=_0x2801ab;return this['isUsingSideviewUiLayout']()?0x0:'taoBZ'==='taoBZ'?VisuMZ[_0x16473d(0x1d7)][_0x16473d(0x1af)]['call'](this):0x8;},VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0x1e6)]=Window_SkillList[_0x2801ab(0x17a)]['makeItemList'],Window_SkillList['prototype'][_0x2801ab(0x17c)]=function(){const _0x389451=_0x2801ab;VisuMZ['SideviewBattleUI'][_0x389451(0x1e6)][_0x389451(0x195)](this),this['adjustSideviewUiWidth'](),this[_0x389451(0x1ec)](),this[_0x389451(0x1b4)]();},Window_SkillList[_0x2801ab(0x17a)][_0x2801ab(0x15c)]=function(){const _0x728daf=_0x2801ab;return this[_0x728daf(0x12a)]||Window_Base[_0x728daf(0x17a)][_0x728daf(0x15c)][_0x728daf(0x195)](this);},Window_SkillList[_0x2801ab(0x17a)]['sideviewUiWidth']=function(){return Window_SkillList['SIDEVIEW_BATTLE_UI_WINDOW_WIDTH']||0xc0;},Window_SkillList[_0x2801ab(0x17a)][_0x2801ab(0x170)]=function(){const _0x1c6d23=_0x2801ab;let _0x120d57=Window_Selectable['prototype'][_0x1c6d23(0x170)][_0x1c6d23(0x195)](this);return _0x120d57+Window_SkillList[_0x1c6d23(0xca)];},Window_SkillList['prototype'][_0x2801ab(0x1aa)]=function(){const _0x12a4a7=_0x2801ab;let _0x25ed83=Window_Selectable['prototype'][_0x12a4a7(0x1aa)][_0x12a4a7(0x195)](this);return _0x25ed83+Window_SkillList['SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_Y'];},Window_BattleSkill[_0x2801ab(0x17a)][_0x2801ab(0xf4)]=function(){const _0x136797=_0x2801ab;return Window_SkillList[_0x136797(0x1bb)];},Window_BattleItem['prototype'][_0x2801ab(0xf4)]=function(){return Window_ItemList['SIDEVIEW_BATTLE_UI_WINDOW_MAX_ROWS'];},Window_PartyCommand['SIDEVIEW_BATTLE_UI_WINDOW_MAX_ROWS']=VisuMZ[_0x2801ab(0x1d7)]['Settings']['GeneralWindow'][_0x2801ab(0x1f3)]??0x8,VisuMZ[_0x2801ab(0x1d7)]['Window_PartyCommand_initialize']=Window_PartyCommand[_0x2801ab(0x17a)][_0x2801ab(0x110)],Window_PartyCommand[_0x2801ab(0x17a)][_0x2801ab(0x110)]=function(_0x2be71b){const _0x4102b4=_0x2801ab;VisuMZ[_0x4102b4(0x1d7)]['Window_PartyCommand_initialize'][_0x4102b4(0x195)](this,_0x2be71b),this[_0x4102b4(0x1fc)]();},VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0x10f)]=Window_PartyCommand['prototype'][_0x2801ab(0x12c)],Window_PartyCommand['prototype'][_0x2801ab(0x12c)]=function(){const _0x2bd735=_0x2801ab;VisuMZ[_0x2bd735(0x1d7)][_0x2bd735(0x10f)][_0x2bd735(0x195)](this),this[_0x2bd735(0x1a9)](),this[_0x2bd735(0x1ec)]();},Window_PartyCommand[_0x2801ab(0x17a)][_0x2801ab(0x15c)]=function(){const _0x4fbb7a=_0x2801ab;return $gameParty[_0x4fbb7a(0xee)]()[0x0];},Window_PartyCommand['prototype'][_0x2801ab(0xf4)]=function(){const _0xd07511=_0x2801ab;return Window_PartyCommand[_0xd07511(0x1bb)];},Window_ActorCommand[_0x2801ab(0x1bb)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)]['GeneralWindow'][_0x2801ab(0x18e)]??0x8,VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0x196)]=Window_ActorCommand[_0x2801ab(0x17a)]['initialize'],Window_ActorCommand[_0x2801ab(0x17a)][_0x2801ab(0x110)]=function(_0x4bf021){const _0x500871=_0x2801ab;VisuMZ['SideviewBattleUI'][_0x500871(0x196)][_0x500871(0x195)](this,_0x4bf021),this['initMembersSideviewUi']();},VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0x154)]=Window_ActorCommand[_0x2801ab(0x17a)]['makeCommandList'],Window_ActorCommand[_0x2801ab(0x17a)][_0x2801ab(0x12c)]=function(){const _0x208f3f=_0x2801ab;VisuMZ[_0x208f3f(0x1d7)]['Window_ActorCommand_makeCommandList']['call'](this),this[_0x208f3f(0x1a9)](),this[_0x208f3f(0x1ec)](),this[_0x208f3f(0x1b4)]();},Window_ActorCommand[_0x2801ab(0x17a)]['sideviewUiTargetActor']=function(){const _0x222a73=_0x2801ab;return this[_0x222a73(0x12a)]||Window_Base[_0x222a73(0x17a)][_0x222a73(0x15c)][_0x222a73(0x195)](this);},Window_ActorCommand[_0x2801ab(0x17a)]['maxSideviewUiRows']=function(){const _0x4b522e=_0x2801ab;return Window_ActorCommand[_0x4b522e(0x1bb)];},VisuMZ['SideviewBattleUI'][_0x2801ab(0x1f4)]=Window_BattleStatus['prototype'][_0x2801ab(0x19d)],Window_BattleStatus['prototype'][_0x2801ab(0x19d)]=function(){const _0x4fdacf=_0x2801ab;this[_0x4fdacf(0x1d3)]()?this[_0x4fdacf(0x135)]():VisuMZ['SideviewBattleUI'][_0x4fdacf(0x1f4)]['call'](this);},Window_BattleStatus[_0x2801ab(0x17a)][_0x2801ab(0x135)]=function(){const _0x1e2baf=_0x2801ab;if($gameTemp[_0x1e2baf(0x201)]())this[_0x1e2baf(0x13d)]=![],$gameTemp[_0x1e2baf(0x1cf)](),SceneManager[_0x1e2baf(0xd1)]['refreshSideviewUiBattleStatusWindows']();else this[_0x1e2baf(0x13d)]&&(this[_0x1e2baf(0x13d)]=![],SceneManager[_0x1e2baf(0xd1)][_0x1e2baf(0x180)]());};function Window_SideviewUiBattleStatus(){const _0x1d8f6f=_0x2801ab;this[_0x1d8f6f(0x110)](...arguments);}Window_SideviewUiBattleStatus[_0x2801ab(0x17a)]=Object[_0x2801ab(0x13b)](Window_StatusBase['prototype']),Window_SideviewUiBattleStatus[_0x2801ab(0x17a)][_0x2801ab(0x191)]=Window_SideviewUiBattleStatus,Window_SideviewUiBattleStatus[_0x2801ab(0x10b)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)]['StatusWindow'][_0x2801ab(0x133)]??0xc8,Window_SideviewUiBattleStatus['HEIGHT_BASE']=VisuMZ[_0x2801ab(0x1d7)]['Settings'][_0x2801ab(0x18f)][_0x2801ab(0x1b8)]??_0x2801ab(0xd4),Window_SideviewUiBattleStatus[_0x2801ab(0xf6)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x18f)][_0x2801ab(0x146)]??0x4,Window_SideviewUiBattleStatus[_0x2801ab(0x14a)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)]['StatusWindow'][_0x2801ab(0xde)]??0x30,Window_SideviewUiBattleStatus[_0x2801ab(0x177)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x18f)][_0x2801ab(0x10e)]??0x4,Window_SideviewUiBattleStatus[_0x2801ab(0x165)]=VisuMZ[_0x2801ab(0x1d7)]['Settings'][_0x2801ab(0x18f)][_0x2801ab(0x103)]??!![],Window_SideviewUiBattleStatus[_0x2801ab(0x1fe)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)]['StatusWindow'][_0x2801ab(0x105)]??!![],Window_SideviewUiBattleStatus[_0x2801ab(0x197)]=VisuMZ[_0x2801ab(0x1d7)]['Settings'][_0x2801ab(0x18f)][_0x2801ab(0x200)]??0x30,Window_SideviewUiBattleStatus[_0x2801ab(0x18d)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x18f)][_0x2801ab(0x1bc)]??0x0,Window_SideviewUiBattleStatus[_0x2801ab(0xf3)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x18f)][_0x2801ab(0xf7)]??!![],Window_SideviewUiBattleStatus['STATES_REVERSE_SCALE']=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x18f)][_0x2801ab(0x1df)]??!![],Window_SideviewUiBattleStatus[_0x2801ab(0x1a7)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x18f)][_0x2801ab(0x168)]??0x14,Window_SideviewUiBattleStatus['STATES_OFFSET_Y']=VisuMZ['SideviewBattleUI']['Settings'][_0x2801ab(0x18f)][_0x2801ab(0x1d2)]??0x14,Window_SideviewUiBattleStatus[_0x2801ab(0x175)]=VisuMZ[_0x2801ab(0x1d7)]['Settings']['StatusWindow'][_0x2801ab(0x128)]??!![],Window_SideviewUiBattleStatus['TPB_OFFSET_X']=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x18f)][_0x2801ab(0x156)]??0x2c,Window_SideviewUiBattleStatus['TPB_OFFSET_Y']=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)]['StatusWindow'][_0x2801ab(0x193)]??0x0,Window_SideviewUiBattleStatus[_0x2801ab(0x1ba)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x18f)]['HpShow']??!![],Window_SideviewUiBattleStatus[_0x2801ab(0x19f)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x18f)][_0x2801ab(0x184)]??0x3c,Window_SideviewUiBattleStatus['HP_GAUGE_OFFSET_Y']=VisuMZ['SideviewBattleUI'][_0x2801ab(0xe2)][_0x2801ab(0x18f)][_0x2801ab(0x1f1)]??0x0,Window_SideviewUiBattleStatus['MP_GAUGE_SHOWN']=VisuMZ[_0x2801ab(0x1d7)]['Settings'][_0x2801ab(0x18f)][_0x2801ab(0x186)]??!![],Window_SideviewUiBattleStatus['MP_GAUGE_OFFSET_X']=VisuMZ['SideviewBattleUI'][_0x2801ab(0xe2)][_0x2801ab(0x18f)][_0x2801ab(0x192)]??0x44,Window_SideviewUiBattleStatus[_0x2801ab(0x130)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x18f)][_0x2801ab(0x125)]??0x0,Window_SideviewUiBattleStatus[_0x2801ab(0x1b9)]=VisuMZ[_0x2801ab(0x1d7)]['Settings'][_0x2801ab(0x18f)][_0x2801ab(0xf5)]??!![],Window_SideviewUiBattleStatus[_0x2801ab(0x1b3)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x18f)][_0x2801ab(0xf0)]??0x4a,Window_SideviewUiBattleStatus['TP_GAUGE_OFFSET_Y']=VisuMZ[_0x2801ab(0x1d7)]['Settings'][_0x2801ab(0x18f)][_0x2801ab(0xd3)]??0x0,Window_SideviewUiBattleStatus[_0x2801ab(0x1d9)]=VisuMZ['SideviewBattleUI']['Settings']['StatusWindow'][_0x2801ab(0x1f2)]??!![],Window_SideviewUiBattleStatus[_0x2801ab(0x14b)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x18f)][_0x2801ab(0xed)]??0x2c,Window_SideviewUiBattleStatus[_0x2801ab(0x134)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x18f)][_0x2801ab(0x1ee)]??0x0,Window_SideviewUiBattleStatus[_0x2801ab(0x107)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x18f)][_0x2801ab(0x1ac)]??!![],Window_SideviewUiBattleStatus[_0x2801ab(0x1b7)]=VisuMZ[_0x2801ab(0x1d7)]['Settings'][_0x2801ab(0x18f)][_0x2801ab(0x194)]??0x34,Window_SideviewUiBattleStatus[_0x2801ab(0xd0)]=VisuMZ['SideviewBattleUI']['Settings'][_0x2801ab(0x18f)][_0x2801ab(0x17e)]??0x2,Window_SideviewUiBattleStatus[_0x2801ab(0x16d)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x18f)][_0x2801ab(0x1c6)]??!![],Window_SideviewUiBattleStatus['BRAVE_OFFSET_X']=VisuMZ[_0x2801ab(0x1d7)]['Settings'][_0x2801ab(0x18f)][_0x2801ab(0x204)]??0x34,Window_SideviewUiBattleStatus[_0x2801ab(0x203)]=VisuMZ[_0x2801ab(0x1d7)][_0x2801ab(0xe2)][_0x2801ab(0x18f)][_0x2801ab(0x18a)]??-0x6,Window_SideviewUiBattleStatus[_0x2801ab(0xe3)]=VisuMZ['SideviewBattleUI'][_0x2801ab(0xe2)][_0x2801ab(0x18f)][_0x2801ab(0xcc)]??!![],Window_SideviewUiBattleStatus[_0x2801ab(0x188)]=VisuMZ[_0x2801ab(0x1d7)]['Settings']['StatusWindow']['BreakShieldIgnoreScale']??!![],Window_SideviewUiBattleStatus[_0x2801ab(0x143)]=VisuMZ['SideviewBattleUI']['Settings'][_0x2801ab(0x18f)]['BreakShieldOffsetX']??0x14,Window_SideviewUiBattleStatus[_0x2801ab(0x16f)]=VisuMZ[_0x2801ab(0x1d7)]['Settings']['StatusWindow']['BreakShieldOffsetY']??0x14,Window_SideviewUiBattleStatus[_0x2801ab(0x144)]=VisuMZ['SideviewBattleUI'][_0x2801ab(0xe2)][_0x2801ab(0x18f)][_0x2801ab(0x118)]??!![],Window_SideviewUiBattleStatus[_0x2801ab(0x17a)][_0x2801ab(0x110)]=function(_0x144add){const _0x572333=_0x2801ab;this[_0x572333(0x138)]=_0x144add;const _0x100901=this[_0x572333(0x161)]();Window_StatusBase[_0x572333(0x17a)][_0x572333(0x110)][_0x572333(0x195)](this,_0x100901),this[_0x572333(0x1fc)](),this[_0x572333(0x1a6)](0x2);},Window_SideviewUiBattleStatus[_0x2801ab(0x17a)][_0x2801ab(0x161)]=function(){const _0x11b096=_0x2801ab,_0x1e09c2=Window_Base[_0x11b096(0x123)];let _0x52242c=Window_SideviewUiBattleStatus[_0x11b096(0x10b)],_0x141fc1=Graphics['boxWidth']-_0x52242c;_0x141fc1+=Math['ceil']((Graphics[_0x11b096(0x129)]-Graphics[_0x11b096(0x1de)])/0x2),_0x52242c/=_0x1e09c2,_0x52242c=Math[_0x11b096(0x166)](_0x52242c),_0x52242c+=Math[_0x11b096(0x166)](Window_SideviewUiBattleStatus[_0x11b096(0x14a)]*0x4/_0x1e09c2);let _0x2d3561=Window_SideviewUiBattleStatus[_0x11b096(0x1bd)];_0x2d3561===_0x11b096(0xd4)?_0x11b096(0x140)!==_0x11b096(0x140)?_0x29ae23-=_0x814743[_0x11b096(0x17a)][_0x11b096(0x1b6)]()-0x1:(_0x2d3561=Window_SideviewUiBattleStatus['HEIGHT_BUFFER']*0x2,_0x2d3561+=this[_0x11b096(0xda)]()*this['autoRowCount'](),_0x2d3561=Math[_0x11b096(0x166)](_0x2d3561*_0x1e09c2),_0x2d3561/=_0x1e09c2):_0x2d3561=eval(_0x2d3561)||0x0;let _0x8e2f35=Math[_0x11b096(0x166)](_0x2d3561*_0x1e09c2)*this[_0x11b096(0x138)];return _0x8e2f35-=Math[_0x11b096(0x166)]((Graphics['height']-Graphics[_0x11b096(0xe1)])/0x2),this[_0x11b096(0x1dc)]=_0x141fc1,this[_0x11b096(0xc9)]=this[_0x11b096(0x1dc)]-Math['ceil'](Window_SideviewUiBattleStatus[_0x11b096(0x14a)]/_0x1e09c2),this[_0x11b096(0x148)]=this[_0x11b096(0x1dc)],new Rectangle(_0x141fc1,_0x8e2f35,_0x52242c,_0x2d3561);},Window_SideviewUiBattleStatus[_0x2801ab(0x17a)][_0x2801ab(0x13a)]=function(){const _0x147425=_0x2801ab;let _0x36f9be=0x0;if(Window_SideviewUiBattleStatus[_0x147425(0x1fe)])_0x36f9be+=0x1;if(Window_SideviewUiBattleStatus[_0x147425(0x1ba)])_0x36f9be+=0x1;if(Window_SideviewUiBattleStatus['MP_GAUGE_SHOWN'])_0x36f9be+=0x1;if(Window_SideviewUiBattleStatus['TP_GAUGE_SHOWN'])_0x36f9be+=0x1;if(this[_0x147425(0x206)]())_0x36f9be+=0x1;if(this['isAdjustBravePoints']())_0x36f9be+=0x1;return _0x36f9be||0x1;},Window_SideviewUiBattleStatus['prototype']['updatePadding']=function(){const _0x5d8adb=_0x2801ab;this[_0x5d8adb(0x149)]=0x0;},Window_SideviewUiBattleStatus['prototype'][_0x2801ab(0xfa)]=function(){const _0x4666fa=_0x2801ab;if(!this[_0x4666fa(0x163)])return;if(!Window_SideviewUiBattleStatus['BG_SHOW'])return;const _0x285658=this[_0x4666fa(0x163)]['bitmap'];var _0x9e51cd=ColorManager['dimColor1'](),_0x4c8559=ColorManager[_0x4666fa(0xf9)](),_0x172711=Math['ceil'](this[_0x4666fa(0x129)]/0x4),_0x164805=this[_0x4666fa(0x129)]-_0x172711,_0xf02dd=this[_0x4666fa(0x1f0)];_0x285658[_0x4666fa(0x11e)](this['width'],_0xf02dd),_0x285658[_0x4666fa(0x183)](0x0,0x0,_0x172711,_0xf02dd,_0x4c8559,_0x9e51cd),_0x285658[_0x4666fa(0xfc)](_0x172711,0x0,_0x164805,_0xf02dd,_0x9e51cd),this[_0x4666fa(0x163)]['setFrame'](0x0,0x0,_0x164805,_0xf02dd);},Window_SideviewUiBattleStatus[_0x2801ab(0x17a)][_0x2801ab(0x1e5)]=function(){const _0x1f36a7=_0x2801ab;Window_StatusBase[_0x1f36a7(0x17a)][_0x1f36a7(0x1e5)][_0x1f36a7(0x195)](this),this[_0x1f36a7(0xd2)](),this[_0x1f36a7(0x114)]();},Window_SideviewUiBattleStatus['prototype'][_0x2801ab(0x182)]=function(){const _0x2e0ea2=_0x2801ab;return $gameParty[_0x2e0ea2(0x1b0)]()[this[_0x2e0ea2(0x138)]];},Window_SideviewUiBattleStatus[_0x2801ab(0x17a)][_0x2801ab(0xd2)]=function(){const _0x3fe357=_0x2801ab;if(this[_0x3fe357(0xc8)]===this[_0x3fe357(0x182)]())return;this[_0x3fe357(0xc8)]=this[_0x3fe357(0x182)](),this[_0x3fe357(0x14e)]();if(this['_battler']){if('zvKAU'===_0x3fe357(0x185))return this[_0x3fe357(0xc8)];else this[_0x3fe357(0x1a6)](0x1);}else this[_0x3fe357(0x1a6)](0x2);},Window_SideviewUiBattleStatus[_0x2801ab(0x17a)][_0x2801ab(0x114)]=function(){const _0x18fd0e=_0x2801ab;if(!this[_0x18fd0e(0xc8)])return;this['_targetX']=this[_0x18fd0e(0x12e)]()?this['_activeX']:this[_0x18fd0e(0x1dc)];const _0xf44ef6=Window_SideviewUiBattleStatus[_0x18fd0e(0x177)];if(this['_targetX']>this['x'])this['x']=Math[_0x18fd0e(0x1ff)](this['x']+_0xf44ef6,this['_targetX']);else this[_0x18fd0e(0x148)]<this['x']&&(this['x']=Math['max'](this['x']-_0xf44ef6,this[_0x18fd0e(0x148)]));},Window_SideviewUiBattleStatus[_0x2801ab(0x17a)][_0x2801ab(0x12e)]=function(){const _0x404ff8=_0x2801ab;if(this['_battler']===BattleManager[_0x404ff8(0x1a1)]())return!![];if(this['_battler']===BattleManager['_subject'])return!![];if(this[_0x404ff8(0xc8)][_0x404ff8(0x1a5)]())return!![];return![];},Window_SideviewUiBattleStatus[_0x2801ab(0x17a)][_0x2801ab(0x1a4)]=function(){const _0x2e8d0f=_0x2801ab;return Window_SideviewUiBattleStatus[_0x2e8d0f(0x144)];},Window_SideviewUiBattleStatus[_0x2801ab(0x17a)][_0x2801ab(0x1e0)]=function(){const _0x5774e7=_0x2801ab;return this[_0x5774e7(0xc8)];},Window_SideviewUiBattleStatus[_0x2801ab(0x17a)][_0x2801ab(0x1c8)]=function(){const _0xcd0da3=_0x2801ab,_0x397e64=new Point(TouchInput['x'],TouchInput['y']),_0x23fe39=this[_0xcd0da3(0xec)]['applyInverse'](_0x397e64);return this[_0xcd0da3(0x109)][_0xcd0da3(0x167)](_0x23fe39['x'],_0x23fe39['y']);},Window_SideviewUiBattleStatus[_0x2801ab(0x17a)][_0x2801ab(0x1a2)]=function(){const _0x582d64=_0x2801ab;this[_0x582d64(0x19b)]();if(!this[_0x582d64(0xc8)])return;this[_0x582d64(0x14f)](),this[_0x582d64(0x126)]();},Window_SideviewUiBattleStatus[_0x2801ab(0x17a)][_0x2801ab(0x14f)]=function(){const _0x204f00=_0x2801ab,_0x4477e4=this[_0x204f00(0xc8)];let _0x4d3164=0x4,_0x46a749=Window_SideviewUiBattleStatus[_0x204f00(0xf6)];if(Imported[_0x204f00(0xea)]&&Window_SideviewUiBattleStatus[_0x204f00(0xe3)]){let _0x49a9ee=_0x4d3164+Window_SideviewUiBattleStatus[_0x204f00(0x143)],_0x26a243=_0x46a749+Window_SideviewUiBattleStatus[_0x204f00(0x16f)];this['placeBreakShieldIcon'](_0x4477e4,_0x49a9ee,_0x26a243);if(Window_SideviewUiBattleStatus[_0x204f00(0x15a)]){if(_0x204f00(0x1f9)===_0x204f00(0x1f9)){const _0x5322df=_0x204f00(0x13e)[_0x204f00(0x1a8)](_0x4477e4[_0x204f00(0xd9)]()),_0x53f383=this[_0x204f00(0x10d)];if(_0x53f383[_0x5322df]){if(_0x204f00(0x14c)===_0x204f00(0x14c)){const _0x35738a=_0x53f383[_0x5322df];_0x35738a[_0x204f00(0x1d6)]['x']=_0x35738a[_0x204f00(0x1d6)]['y']=0x1/this['scale']['y'];}else this['x']=_0x47aff1[_0x204f00(0x1ff)](this['x']+_0x36689b,this[_0x204f00(0x148)]);};}else{if(!this[_0x204f00(0x1d3)]())return;if(!_0x1ee36b[_0x204f00(0x10c)])return;this[_0x204f00(0x172)]=0x0;!this[_0x204f00(0x163)]&&(this[_0x204f00(0x163)]=new _0x50a841(),this[_0x204f00(0x1fa)](this[_0x204f00(0x163)]));const _0x34aefa=this[_0x204f00(0x129)]-_0x1e8bfe[_0x204f00(0x10b)],_0x4f833d=this['lineHeight']()*0x2;this['_dimmerSprite'][_0x204f00(0x1e7)]=new _0x1c0097(_0x34aefa,_0x4f833d),this[_0x204f00(0x163)]['x']=-0x4,this[_0x204f00(0x163)]['y']=this['padding'];const _0x1c1528=this[_0x204f00(0x163)][_0x204f00(0x1e7)],_0x125f37=_0x5985b8[_0x204f00(0x1eb)](),_0x228740=_0x29ebb1['dimColor2']();_0x1c1528[_0x204f00(0xfc)](0x0,0x0,_0x140d1c[_0x204f00(0x142)](_0x34aefa/0x2),_0x4f833d,_0x125f37),_0x1c1528[_0x204f00(0x183)](_0x25dabb[_0x204f00(0x142)](_0x34aefa/0x2),0x0,_0x41f493[_0x204f00(0x142)](_0x34aefa/0x2),_0x4f833d,_0x125f37,_0x228740);}}}if(Window_SideviewUiBattleStatus[_0x204f00(0xf3)]){let _0x320965=_0x4d3164+Window_SideviewUiBattleStatus[_0x204f00(0x1a7)],_0x416122=_0x46a749+Window_SideviewUiBattleStatus['STATES_OFFSET_Y'];if(Imported[_0x204f00(0xea)]&&Window_SideviewUiBattleStatus[_0x204f00(0xe3)]){if(_0x204f00(0xce)===_0x204f00(0xce))Window_SideviewUiBattleStatus['BREAK_SHIELD_REVERSE_SCALE']?_0x416122+=Math[_0x204f00(0x166)](ImageManager[_0x204f00(0x1f7)]/this['scale']['y']):_0x416122+=ImageManager['iconHeight'],_0x416122+=0x4;else return _0x380595[_0x204f00(0xc6)]||_0x8dcf22['aliveMembers']()[0x0];}this[_0x204f00(0xd5)](_0x4477e4,_0x320965,_0x416122);if(Window_SideviewUiBattleStatus[_0x204f00(0x15a)]){const _0x13509c='actor%1-stateIcon'[_0x204f00(0x1a8)](_0x4477e4[_0x204f00(0xd9)]()),_0x349546=this[_0x204f00(0x10d)];if(_0x349546[_0x13509c]){if(_0x204f00(0x205)!==_0x204f00(0x205))return this[_0x204f00(0x12a)]||_0x30ade6['prototype']['sideviewUiTargetActor'][_0x204f00(0x195)](this);else{const _0x10769c=_0x349546[_0x13509c];_0x10769c['scale']['x']=_0x10769c[_0x204f00(0x1d6)]['y']=0x1/this['scale']['y'];}};}}if(this[_0x204f00(0x158)]()){let _0xe96e7=_0x4d3164+Window_SideviewUiBattleStatus[_0x204f00(0x189)],_0x27cdbe=_0x46a749+Window_SideviewUiBattleStatus[_0x204f00(0x1ea)];this[_0x204f00(0x111)](_0x4477e4,_0xe96e7,_0x27cdbe);}if(this['isShowAggro']()){if('RGYSy'===_0x204f00(0x199))this[_0x204f00(0x1a6)](0x2);else{let _0x1b2724=_0x4d3164+Window_SideviewUiBattleStatus[_0x204f00(0x14b)],_0x3a999a=_0x46a749+Window_SideviewUiBattleStatus[_0x204f00(0x134)];this[_0x204f00(0x158)]()&&(_0x204f00(0xcb)==='fCpfv'?this[_0x204f00(0x1bf)]():_0x3a999a-=Sprite_Gauge['prototype'][_0x204f00(0x1b6)]()-0x1),this['placeAggroGauge'](_0x4477e4,_0x1b2724,_0x3a999a);}}if(Window_SideviewUiBattleStatus['NAME_SHOWN']){let _0x38b61a=_0x4d3164+Window_SideviewUiBattleStatus[_0x204f00(0x197)],_0x16a345=_0x46a749+Window_SideviewUiBattleStatus[_0x204f00(0x18d)];this[_0x204f00(0xdb)](_0x4477e4,_0x38b61a,_0x16a345);}(Window_SideviewUiBattleStatus[_0x204f00(0x1fe)]||this[_0x204f00(0x158)]()||this[_0x204f00(0x1d4)]())&&(_0x46a749+=this[_0x204f00(0xda)]());if(this[_0x204f00(0x206)]()){const _0x45f447=Math[_0x204f00(0x166)](ImageManager[_0x204f00(0x1f7)]*Sprite_BoostContainer[_0x204f00(0x12f)]);let _0x45fbfb=_0x4d3164+Window_SideviewUiBattleStatus[_0x204f00(0x1b7)],_0x436188=_0x46a749+Window_SideviewUiBattleStatus[_0x204f00(0xd0)];_0x436188+=Math[_0x204f00(0xe6)](0x0,Math[_0x204f00(0x142)]((this[_0x204f00(0xda)]()-_0x45f447)/0x2)),this[_0x204f00(0x102)](_0x4477e4,_0x45fbfb,_0x436188),_0x46a749+=this['gaugeLineHeight']();}if(this[_0x204f00(0x141)]()){if(_0x204f00(0x1c7)===_0x204f00(0x1c7)){let _0x45bfc3=_0x4d3164+Window_SideviewUiBattleStatus['BRAVE_OFFSET_X'],_0x324038=_0x46a749+Window_SideviewUiBattleStatus[_0x204f00(0x203)],_0x432365=Math[_0x204f00(0x166)](Window_SideviewUiBattleStatus[_0x204f00(0x10b)]/this['scale']['x']);this['drawActorBravePoints'](_0x4477e4,_0x45bfc3,_0x324038,_0x432365,'left'),_0x46a749+=this[_0x204f00(0xda)]();}else _0x991da4=_0x503251[_0x204f00(0xf6)]*0x2,_0x20ce1c+=this[_0x204f00(0xda)]()*this[_0x204f00(0x13a)](),_0xe42080=_0xb6576c[_0x204f00(0x166)](_0x9d1736*_0x3ccd5e),_0x590a46/=_0x1eabec;}if(Window_SideviewUiBattleStatus['HP_GAUGE_SHOWN']){if(_0x204f00(0x19a)!==_0x204f00(0x19a)){if(!this[_0x204f00(0x1d3)]())return;const _0x28a333=_0x2ac651['SIDEVIEW_BATTLE_UI_SCALE'];this[_0x204f00(0x1d6)]['x']=this[_0x204f00(0x1d6)]['y']=_0x28a333;}else{let _0x12ea92=_0x4d3164+Window_SideviewUiBattleStatus['HP_GAUGE_OFFSET_X'],_0x39edf5=_0x46a749+Window_SideviewUiBattleStatus['HP_GAUGE_OFFSET_Y'];this[_0x204f00(0x160)](_0x4477e4,'hp',_0x12ea92,_0x39edf5),_0x46a749+=this['gaugeLineHeight']();}}if(Window_SideviewUiBattleStatus['MP_GAUGE_SHOWN']){if(_0x204f00(0xff)===_0x204f00(0x11d)){let _0x3467c5=_0x25862d+_0xdb204c[_0x204f00(0x143)],_0x323688=_0x5b241e+_0x5883cf[_0x204f00(0x16f)];this[_0x204f00(0x11f)](_0x53b1fa,_0x3467c5,_0x323688);if(_0x2e481f['STATES_REVERSE_SCALE']){const _0x5861eb=_0x204f00(0x13e)['format'](_0x21de89['actorId']()),_0x321e9b=this[_0x204f00(0x10d)];if(_0x321e9b[_0x5861eb]){const _0x285116=_0x321e9b[_0x5861eb];_0x285116['scale']['x']=_0x285116[_0x204f00(0x1d6)]['y']=0x1/this[_0x204f00(0x1d6)]['y'];};}}else{let _0x316891=_0x4d3164+Window_SideviewUiBattleStatus['MP_GAUGE_OFFSET_X'],_0x37a6b9=_0x46a749+Window_SideviewUiBattleStatus[_0x204f00(0x130)];this[_0x204f00(0x160)](_0x4477e4,'mp',_0x316891,_0x37a6b9),_0x46a749+=this['gaugeLineHeight']();}}if(Window_SideviewUiBattleStatus[_0x204f00(0x1b9)]){let _0x131c25=_0x4d3164+Window_SideviewUiBattleStatus[_0x204f00(0x1b3)],_0x4e86eb=_0x46a749+Window_SideviewUiBattleStatus['TP_GAUGE_OFFSET_Y'];this[_0x204f00(0x160)](_0x4477e4,'tp',_0x131c25,_0x4e86eb),_0x46a749+=this[_0x204f00(0xda)]();}},Window_SideviewUiBattleStatus[_0x2801ab(0x17a)][_0x2801ab(0x158)]=function(){const _0x543745=_0x2801ab;if(Imported['VisuMZ_2_BattleSystemCTB']&&BattleManager[_0x543745(0xe9)]()){if(_0x543745(0x1cb)===_0x543745(0x1cb))return![];else{if(this['_battler']===_0xa71539['actor']())return!![];if(this[_0x543745(0xc8)]===_0x3a15e5['_subject'])return!![];if(this['_battler']['isSelected']())return!![];return![];}}return BattleManager[_0x543745(0x1e2)]()&&Window_SideviewUiBattleStatus['NAME_SHOWN']&&Window_SideviewUiBattleStatus[_0x543745(0x175)];},Window_SideviewUiBattleStatus[_0x2801ab(0x17a)][_0x2801ab(0x1d4)]=function(){const _0x4ccd30=_0x2801ab;return Window_SideviewUiBattleStatus[_0x4ccd30(0x1fe)]&&Window_SideviewUiBattleStatus[_0x4ccd30(0x1d9)]&&Imported[_0x4ccd30(0xf8)]&&ConfigManager[_0x4ccd30(0x162)]&&VisuMZ[_0x4ccd30(0x16b)]['Settings'][_0x4ccd30(0x1f8)]['StatusGauge'];},Window_SideviewUiBattleStatus['prototype'][_0x2801ab(0x206)]=function(){const _0x366322=_0x2801ab;return Imported[_0x366322(0x115)]&&Window_SideviewUiBattleStatus['BOOST_SHOWN']&&BattleManager['allowBoostAction']();},Window_SideviewUiBattleStatus[_0x2801ab(0x17a)]['isAdjustBravePoints']=function(){const _0x532062=_0x2801ab;return Imported[_0x532062(0x17f)]&&Window_SideviewUiBattleStatus[_0x532062(0x16d)]&&BattleManager[_0x532062(0x1a0)]();},Window_SideviewUiBattleStatus['prototype']['drawCustomJS']=function(){const _0x255ed3=_0x2801ab;VisuMZ[_0x255ed3(0x1d7)]['Settings'][_0x255ed3(0x18f)]['CustomUi']&&(_0x255ed3(0x1ad)!==_0x255ed3(0x100)?VisuMZ['SideviewBattleUI'][_0x255ed3(0xe2)][_0x255ed3(0x18f)][_0x255ed3(0x112)][_0x255ed3(0x195)](this,this[_0x255ed3(0xc8)]):(_0x54905a[_0x255ed3(0x1d7)][_0x255ed3(0x1ed)]['call'](this),this[_0x255ed3(0xf2)]()));};function _0x3536(){const _0x30615d=['Window_SkillList_maxCols','BOOST_SHOWN','SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_Y','innerRect','ARRAYFUNC','WIDTH_BASE','SIDEVIEW_BATTLE_UI_FADE_STYLE','_additionalSprites','MoveSpeed','Window_PartyCommand_makeCommandList','initialize','placeTimeGauge','CustomUi','Window_ItemList_initialize','updatePosition','VisuMZ_3_BoostAction','EXJPM','_enemyWindow','StateTooltipsShow','2573778DzQbmo','Scene_Battle_updateStatusWindowPosition','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','isInputting','uNPGv','resize','placeBreakShieldIcon','map','1604630yNpyZA','sideviewUiWidth','SIDEVIEW_BATTLE_UI_SCALE','ARRAYEVAL','MpOffsetY','drawCustomJS','toUpperCase','TpbShow','width','_actor','SkillWindowOffsetY','makeCommandList','EVAL','isActivePosition','ICON_SIZE_RATE','MP_GAUGE_OFFSET_Y','893586vtSmxn','Battler','WidthBase','AGGRO_OFFSET_Y','updateRefreshSideviewUi','ItemWindowWidth','clampSideviewUiPlacementPosition','_partyIndex','STR','autoRowCount','create','knQcF','_requestRefresh','actor%1-breakShieldIcon','createStatusWindow','uUYWW','isAdjustBravePoints','round','BREAK_SHIELD_OFFSET_X','STATE_TOOLTIPS_SHOWN','_actorCommandWindow','HeightBuffer','ItemWindowOffsetY','_targetX','padding','WIDTH_MOVE','AGGRO_OFFSET_X','HMhJg','_spriteset','refresh','drawBasicStatus','OffsetY','aQDdL','UoNbA','status','Window_ActorCommand_makeCommandList','colSpacing','TpbOffsetX','ConvertParams','isShowTpbGauge','parse','STATES_REVERSE_SCALE','actorWindowRect','sideviewUiTargetActor','match','7gbnqLn','updateSideviewUiFadeOut','placeGauge','createWindowRect','aggroGauge','_dimmerSprite','541978nVNUxJ','BG_SHOW','ceil','contains','StatesOffsetX','Scene_Battle_actorWindowRect','SIDEVIEW_BATTLE_UI_BATTLER_OFFSET_X','AggroControlSystem','GeneralWindow','BRAVE_SHOWN','QcYVJ','BREAK_SHIELD_OFFSET_Y','sideviewUiPositionOffsetX','fittingHeight','opacity','McsLc','Game_System_isSideView','TPB_SHOWN','JSON','MOVE_SPEED','NUM','updateSideviewBattleUIPositions','prototype','_data','makeItemList','statusWindowRect','BoostOffsetY','VisuMZ_2_BattleSystemBTB','refreshSideviewUiBattleStatusWindows','SIDEVIEW_BATTLE_UI_BATTLER_OFFSET_Y','battler','gradientFillRect','HpOffsetX','pbqvl','MpShow','Window_SkillList_initialize','BREAK_SHIELD_REVERSE_SCALE','TPB_OFFSET_X','BraveOffsetY','ARRAYSTR','ItemWindowOffsetX','NAME_OFFSET_Y','ActorCommandWindowMaxRows','StatusWindow','gzjEA','constructor','MpOffsetX','TpbOffsetY','BoostOffsetX','call','Window_ActorCommand_initialize','NAME_OFFSET_X','Window_ItemList_maxCols','mqHco','EmwFO','hideAdditionalSprites','createSideviewUiDimmerSprite','updateRefresh','createCancelButton','HP_GAUGE_OFFSET_X','isBTB','actor','drawAllItems','active','isStateTooltipEnabled','isSelected','setBackgroundType','STATES_OFFSET_X','format','adjustSideviewUiWidth','sideviewUiPositionOffsetY','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','BoostShow','IZzdM','ItemWindowMaxRows','Window_SkillList_colSpacing','battleMembers','floor','isSideView','TP_GAUGE_OFFSET_X','updateSideviewUiPosition','Window_ItemList_colSpacing','gaugeHeight','BOOST_OFFSET_X','HeightBase','TP_GAUGE_SHOWN','HP_GAUGE_SHOWN','SIDEVIEW_BATTLE_UI_WINDOW_MAX_ROWS','NameOffsetY','HEIGHT_BASE','name','createContents','STRUCT','isWindowMaskingEnabled','MmdtH','visible','SkillWindowWidth','Scene_Battle_statusWindowRect','BraveShow','LtsTx','isStateTooltipTouched','maxCols','HelpFadeStyle','NNgFb','_itemWindow','3644976FLwzMU','Window_Help_initialize','clearBattleRefreshRequest','NxIfv','SkillWindowOffsetX','StatesOffsetY','isUsingSideviewUiLayout','isShowAggro','exit','scale','SideviewBattleUI','addWindow','AGGRO_SHOWN','updateSideviewUiFadeIn','Scene_Base_isWindowMaskingEnabled','_homeX','filter','boxWidth','StatesIgnoreScale','getStateTooltipBattler','BattleCore','isTpb','ARRAYNUM','setHome','update','Window_SkillList_makeItemList','bitmap','cCySe','_battleField','TPB_OFFSET_Y','dimColor1','adjustSideviewUiHeight','Scene_Battle_createStatusWindow','AggroOffsetY','SIDEVIEW_BATTLE_UI_MOVE_BATTLERS','height','HpOffsetY','AggroShow','PartyCommandWindowMaxRows','Window_BattleStatus_updateRefresh','battleLayoutStyle','description','iconHeight','Aggro','PMqbc','addChildToBack','_sideviewUiBattleStatusWindows','initMembersSideviewUi','_list','NAME_SHOWN','min','NameOffsetX','isBattleRefreshRequested','CommandWidth','BRAVE_OFFSET_Y','BraveOffsetX','pyhte','isAdjustBoostPoints','_partyCommandWindow','_currentActor','BattleLayout','_battler','_activeX','SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_X','EqNot','BreakShieldShow','updateStatusWindowPosition','MKSkb','maxBattleMembers','BOOST_OFFSET_Y','_scene','updateBattler','TpOffsetY','auto','placeStateIcon','KeAWN','17192536uNEzIn','Scene_Battle_createCancelButton','actorId','gaugeLineHeight','placeActorName','Window_ItemList_makeItemList','OffsetX','MoveDistance','SkillWindowMaxRows','trim','boxHeight','Settings','BREAK_SHIELD_SHOWN','includes','_actorWindow','max','StatusGauge','version','isCTB','VisuMZ_4_BreakShields','push','worldTransform','AggroOffsetX','aliveMembers','360564fUSBtf','TpOffsetX','_skillWindow','createSideviewUiBattleStatusWindows','STATES_SHOWN','maxSideviewUiRows','TpShow','HEIGHT_BUFFER','StatesShow','VisuMZ_2_AggroControlSystem','dimColor2','refreshDimmerBitmap','FUNC','fillRect','rQHdL','activate','SCuuY','ogLjY','Sprite_Battler_setHome','placeBoostPoints','BgShow','SIDEVIEW_BATTLE_UI_WINDOW_WIDTH','NameShow'];_0x3536=function(){return _0x30615d;};return _0x3536();}