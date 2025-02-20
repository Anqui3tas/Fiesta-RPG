//=============================================================================
// VisuStella MZ - Battle System - ATB - Active Turn Battle
// VisuMZ_2_BattleSystemATB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemATB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemATB = VisuMZ.BattleSystemATB || {};
VisuMZ.BattleSystemATB.version = 1.33;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.33] [BattleSystemATB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_ATB_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The RPG Maker MZ Time Progress Battle (TPB) system is only a few steps away
 * from the acclaimed Active Turn Battle (ATB) system. This plugin will grant
 * it the various features needed to turn it from TPB into ATB.
 * 
 * This plugin will grant control over how the various mechanics work, ranging
 * from penalties to calculations, to actions that can manipulate the ATB gauge
 * of battlers. Battlers that are in the middle of casting a spell can also be
 * interrupted with specific notetag traits.
 * 
 * ATB Gauges can also be displayed on enemies and/or allies, giving the player
 * full access to the current battle state. The ATB Gauges are also improved,
 * showing different colors for different states and showing a new gauge for
 * the casting state.
 * 
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB/ATB mechanics such as speed, calculations, etc.
 * * Notetags that give skills and items access to ATB Gauge manipulation, by
 *   altering how filled they are.
 * * Interrupts can be used on battlers in the middle of casting a skill.
 * * Visual ATB Gauges can be displayed over battlers' heads.
 * * ATB Gauges have extra coloring options added to them to let the player
 *   quickly know the current speed state of the ATB Gauge.
 * * A field-wide ATB Gauge that positions actor and enemy markers on it to
 *   show how far along actors and enemies are relative to each other's turns.
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
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 * 
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
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
 * ATB Gauges
 * 
 * The gauges are now revamped to show different colors to depict the various
 * ATB states a battler can be in. These various states include the following:
 * 
 * - When a battler's speed is fully stopped.
 * - When a battler's speed is slower/faster past a specific rating.
 * - When a battler is ready for an action.
 * - When a battler is casting an action (those with negative speed values).
 * 
 * The colors used for these states can be found and altered in the Plugin
 * Parameters under Gauge Color Settings.
 *
 * ---
 * 
 * Skill & Item Speeds
 * 
 * With TPB, skills and items with negative speed values will cause the battler
 * to enter a "casting" state, meaning they have to wait extra time before the
 * action takes off. With this delayed action execution, one might assume that
 * if there is a positive speed value, the battler would require less time for
 * their next turn.
 * 
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to ATB,
 * skills and items with positive speed values will have an impact on how full
 * their ATB Gauges will be in the following turn. A value of 2000 will put the
 * gauge at 50% full, 1000 will put the gauge at 25% full, 500 will put it at
 * 12.5% full, and so on. Notetags can also be used to influence this.
 * 
 * ---
 * 
 * JS Calculation Mechanics
 * 
 * While the calculation mechanics aren't changed from their original RPG Maker
 * MZ formulas, the functions for them have been overwritten to allow you, the
 * game developer, to alter them as you see fit.
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
 * VisuMZ_0_CoreEngine
 *
 * - ATB Interrupts can have animations played when they trigger if the
 * VisuStella Core Engine is installed.
 *
 * ---
 * 
 * VisuMZ_1_OptionsCore
 * 
 * - Having the VisuStella Options Core available will allow you to adjust the
 * speed at which the ATB gauges fill up.
 * 
 * - The VisuStella Options Core also gives the player the option to toggle
 * between Active and Wait-based ATB.
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
 * === General ATB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 *
 * ---
 * 
 * <ATB Help>
 *  description
 *  description
 * </ATB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under TPB/ATB.
 * - This is primarily used if the skill behaves differently in TPB/ATB versus
 *   any other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to TPB/ATB.
 * 
 * ---
 *
 * <Hide ATB Gauge>
 *
 * - Used for: Enemy Notetags
 * - If you don't want an enemy to show their ATB Gauge, use this notetag.
 * 
 * ---
 * 
 * === ATB Field Gauge-Related Notetags ===
 * 
 * These notetags only work if the ATB Field Gauge is enabled.
 * 
 * ---
 *
 * <ATB Field Gauge Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <ATB Field Gauge Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <ATB Field Gauge Face: Monster, 1>
 * 
 * ---
 * 
 * === ATB Gauge Manipulation-Related Notetags ===
 * 
 * These notetags are used for ATB Gauge manipulation purposes.
 * 
 * ---
 *
 * <ATB After Gauge: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's ATB Gauge will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   ATB Gauge to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <ATB Charge Gauge: x%>
 * <ATB Charge Gauge: +x%>
 * <ATB Charge Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <ATB Cast Gauge: x%>
 * <ATB Cast Gauge: +x%>
 * <ATB Cast Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 *
 * <ATB Interrupt>
 *
 * - Used for: Skill, Item Notetags
 * - If this skill/item hits a target who is in a casting state, interrupt that
 *   action to cancel it and reset the target's ATB Gauge to 0%.
 * 
 * ---
 *
 * <ATB Cannot Be Interrupted>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill/item immune to ATB Interruptions.
 * 
 * ---
 * 
 * <ATB Battle Start Gauge: +x%>
 * <ATB Battle Start Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determine how much extra or less ATB Gauge the battler will start with if
 *   associated with one of these database objects.
 * - Replace 'x' with a percentile value determining how much extra or less ATB
 *   Gauge value the battler will start battle with.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * <ATB After Gauge: +x%>
 * <ATB After Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Determine how much influence there is on the ATB Gauge after finishing a
 *   skill/item. Increase or decrease the amount after each action.
 * - Replace 'x' with a percentile value determining how much influence there
 *   is on the ATB Gauge after the skill/item has finished performing.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * === JavaScript Notetags: ATB Gauge Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional ATB Gauge Manipulation.
 * 
 * ---
 * 
 * <JS ATB Charge Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Charge Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a charging state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS ATB Cast Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Cast Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a casting state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS ATB After Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB After Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to after performing this skill/item action.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to 0.
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
 * Actor: Change Field Gauge Icon
 * - Changes the icons used for the specific actor(s) on the ATB Field Gauge.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change Field Gauge Face
 * - Changes the faces used for the specific actor(s) on the ATB Field Gauge.
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
 * Actor: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the actor(s).
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
 * Enemy: Change Field Gauge Icon
 * - Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change Field Gauge Face
 * - Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
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
 * Enemy: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the enemy(ies).
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
 * System: ATB Field Gauge Visibility
 * - Determine the visibility of the ATB Field Gauge.
 * 
 *   Visibility:
 *   - Changes the visibility of the ATB Field Gauge.
 * 
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System ATB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * Mechanics
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 * 
 *   Stuns Reset Gauge?:
 *   - Should stuns reset the ATB Gauge?
 *     - Charm, Berserk, and Confusion states will still reset the ATB Gauge.
 * 
 *   JS: Initial Gauge:
 *   - JavaScript code to determine how much ATB gauge to give each battler at
 *     the start of battle.
 * 
 *   JS: Speed:
 *   - JavaScript code to determine how much speed a battler has.
 * 
 *   JS: Base Speed:
 *   - JavaScript code to determine how much base speed a battler has.
 * 
 *   JS: Relative Speed:
 *   - JavaScript code to determine what is the relative speed of a battler.
 * 
 *   JS: Acceleration:
 *   - JavaScript code to determine how much gauges accelerate by relative to
 *     reference time.
 * 
 *   JS: Cast Time:
 *   - JavaScript code to determine how much cast time is used for skills/items
 *     with negative speed modifiers.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Interrupt Settings
 * ============================================================================
 *
 * Interrupt settings used for Battle System ATB.
 *
 * ---
 *
 * Interrupt
 * 
 *   Animation ID:
 *   - Play this animation when a unit is interrupted.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mirror Animation:
 *     - Mirror the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mute Animation:
 *     - Mute the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *   Text Popup:
 *   - Text used for popup when interrupts happen.
 *   - Leave empty for no popup.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *     Flash Color:
 *     - Adjust the popup's flash color.
 *     - Format: [red, green, blue, alpha]
 * 
 *     Flash Duration:
 *     - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Gauge Settings
 * ============================================================================
 *
 * General gauge settings used for ATB Gauges.
 *
 * ---
 *
 * General
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the ATB Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the ATB Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the ATB Gauge's X/Y by?
 *
 * ---
 *
 * AGI Gauge Rates
 * 
 *   Slow Rate:
 *   - How much should the AGI rate be at to be considered slow?
 * 
 *   Fast Rate:
 *   - How much should the AGI rate be at to be considered fast?
 *
 * ---
 *
 * Actors
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Show Status Gauges:
 *   - Show ATB Gauges in the status window?
 *   - Applies only to sideview.
 *
 * ---
 *
 * Enemies
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the enemy sprites' heads?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Field Gauge Settings
 * ============================================================================
 * 
 * The ATB Field Gauge is a large gauge placed on the screen with all of the
 * current battle's active participants shown on it. The participants are
 * represented by a marker. Each marker's position on the gauge indicates its
 * battler's ATB progress towards a turn.
 * 
 * In order for this feature to work, enable "Use Field Gauge?" in the
 * Plugin Parameters.
 *
 * ---
 *
 * General
 * 
 *   Use Field Gauge?:
 *   - This value must be set to true in order for the ATB Field Gauge
 *     to appear.
 *   - This needs to be on in order for this feature to work.
 * 
 *   Display Position:
 *   - Select where the Field Gauge will appear on the screen.
 *   - Top
 *   - Bottom
 *   - Left
 *   - Right
 * 
 *   Offset X:
 *   Offset Y:
 *   - How much to offset the X/Y coordinates by.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the gauge when the
 *     help window is open?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Field Gauge.
 *   - Settings may vary depending on position.
 *   - Left to Right
 *   - Right to Left
 *   - Up to Down
 *   - Down to Up
 *
 * ---
 *
 * Field Gauge Settings
 * 
 *   Gauge Skin:
 *   - Optional. Select an image to place behind the gauge.
 *   - This will be centered on the Field Gauge's position.
 * 
 *   Show Gauge?:
 *   - Decide if you want the gauge to be shown.
 * 
 *   Horizontal Length:
 *   - The length of the Field Gauge if placed horizontally.
 * 
 *   Vertical Length:
 *   - The length of the Field Gauge if placed vertically.
 * 
 *   Thickness:
 *   - The thickness of the Field Gauge for either direction.
 * 
 *   Split Location:
 *   - Determine where the gauge should split.
 *   - Use 0.00 for the start. Use 1.00 for the end.
 *
 * ---
 *
 * Marker Sprites
 * 
 *   Actor Marker Side:
 *   - Which side do you want the actor markers to appear?
 * 
 *   Enemy Marker Side:
 *   - Which side do you want the enemy markers to appear?
 * 
 *   Marker Offset:
 *   - How many pixels do you want to offset the markers by?
 * 
 *   Marker Size:
 *   - How pixels wide and tall do you want the markers to be?
 * 
 *   Marker Speed:
 *   - How many pixels maximum can a marker travel in one frame?
 * 
 *   Opacity Rate:
 *   - If a marker has to change opacity, how fast should it change by?
 *
 * ---
 *
 * Marker Border
 * 
 *   Show Border?:
 *   - Show borders for the marker sprites?
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
 * Marker Sprites
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
 * Marker Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the marker sprite?
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
 * Marker Background
 * 
 *   Show Background?:
 *   - Show the background on the marker sprite?
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
 * Marker Arrow
 * 
 *   Show Arrow?:
 *   - Show the arrow sprite pointing towards the Field Gauge?
 * 
 *   Arrow Skin:
 *   - Pick a window skin to draw arrows from.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Color Settings
 * ============================================================================
 *
 * Gauge color settings used for ATB Gauges.
 *
 * ---
 *
 * Colors
 * 
 *   Default Color 1:
 *   Default Color 2:
 *   Full Color 1:
 *   Full Color 2:
 *   Cast Color 1:
 *   Cast Color 2:
 *   Fast Color 1:
 *   Fast Color 2:
 *   Slow Color 1:
 *   Slow Color 2:
 *   Stop Color 1:
 *   Stop Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Settings
 * ============================================================================
 *
 * Options settings used for Battle System ATB.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show ATB Gauges' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
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
 * Version 1.33: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an actor softlock issue where if charm, berserk, and confusion can
 *    lock a 100% charged actor for Active ATB.
 * * Documentation Update!
 * ** Added extra clarification for Plugin Parameter "Stuns Reset Gauge?":
 * *** Charm, Berserk, and Confusion states will still reset the ATB Gauge.
 * 
 * Version 1.32: December 19, 2024
 * * Bug Fixes!
 * ** Fixed a few features that bled over into CTB if the game project used
 *    both ATB and CTB battle systems simultaneously. Fix made by Olivia.
 * * Feature Update!
 * ** "Stuns Reset Gauge" set to "Don't Reset" should now work as expected for
 *    both actors and enemies, instead of just actors, while they are in the
 *    casting state. Update made by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.31: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where sideview battlers would have misplaced ATB gauge
 *    positions. Fix made by Olivia.
 * 
 * Version 1.30: August 17, 2023
 * * Bug Fixes!
 * ** Fixed an error that would cause multi-actions under restrictions to
 *    desynchronize skill speeds and result in softlocks. Fix made by Olivia.
 * ** Fixed an error that would cause slow speeds to all equal one another.
 *    Fix made by Olivia.
 * 
 * Version 1.29: July 13, 2023
 * * Bug Fixes!
 * ** Fixed an error with casting times for battlers not working properly when
 *    the numeric values are too small. Fix made by Olivia.
 * 
 * Version 1.28: June 15, 2023
 * * Bug Fixes!
 * ** Crash should no longer occur for the end of ATB actions. Fix made
 *    by Olivia.
 * 
 * Version 1.27: May 18, 2023
 * * Bug Fixes!
 * ** Enemies no longer soft-lock themselves if they get stunned via a counter
 *    attack with an attack-state that applies stun. Fix made by Olivia.
 * 
 * Version 1.26: March 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused a clash when loaded together with certain
 *    combinations of plugins. Fix made by Olivia.
 * 
 * Version 1.25: February 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented initial ATB Gauge settings and features from
 *    working properly. Fix made by Irina.
 * 
 * Version 1.24: December 15, 2022
 * * Bug Fixes!
 * ** The Battle Core's <JS Pre-Start Turn> and <JS Post-Start Turn> notetags
 *    were previously disabled by this plugin. They should now be working again
 *    without problems. Fix made by Olivia.
 * 
 * Version 1.23: November 10, 2022
 * * Bug Fixes!
 * ** ATB Gauges will now display for ANIMATED sideview enemies depending on
 *    the Show Enemy Gauge setting. Fix made by Olivia.
 * 
 * Version 1.22: September 29, 2022
 * * Bug Fixes!
 * ** After enemies recover from a stun, enemies no longer take an immediate
 *    action regardless of their time gauge state. Fix made by Olivia.
 * 
 * Version 1.21: August 25, 2022
 * * Bug Fixes!
 * ** Restricted enemies will no longer be action-locked after removing the
 *    restriction state. Fix made by Olivia.
 * 
 * Version 1.20: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the ATB Field Gauge faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.19: July 21, 2022
 * * Bug Fixes!
 * ** Battlers under a "Cannot Move" state will no longer reset their ATB gauge
 *    after their "turn" comes up to update it. Fix made by Olivia.
 * 
 * Version 1.18: June 2, 2022
 * * Bug Fixes!
 * ** Notetag effect for <ATB After Gauge: x%> should now be working properly.
 *    Fix made by Olivia.
 * ** Notetag effect for <JS ATB After Gauge> should now be working properly.
 *    Fix made by Olivia.
 * 
 * Version 1.17: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: August 13, 2021
 * * Bug Fixes!
 * ** Crash prevented with certain Plugin Parameter combinations enabled when
 *    the ATB Gauge is filled up. Fix made by Irina.
 * 
 * Version 1.15: July 23, 2021
 * * Bug Fixes!
 * ** When enemies appear out from a troop event, Visual ATB Gauges above their
 *    heads should now appear properly for SV Enemies, too. Fix made by Irina.
 * 
 * Version 1.14: July 16, 2021
 * * Bug Fixes!
 * ** When enemies appear out from a troop event, Visual ATB Gauges above their
 *    heads should now appear properly. Fix made by Olivia.
 * 
 * Version 1.13: May 21, 2021
 * * Bug Fixes!
 * ** When slip damage is allowed to kill, dying actors will have their TPB
 *    state reset to charging in order to prevent lock-ups. Fix by Olivia.
 * 
 * Version 1.12: May 7, 2021
 * * Feature Update!
 * ** Actions with 0 or positive speed will now act immediately without
 *    allowing a single gauge tick pass through. Update made by Olivia.
 * 
 * Version 1.11: April 16, 2021
 * * Bug Fixes!
 * ** ATB Gauge visibility is now properly updated across various events such
 *    as party removal and other obstruction effects. Fix made by Olivia.
 * 
 * Version 1.10: March 12, 2021
 * * Hot Fix!
 * ** Fixed calculation errors due to field gauge. Fix made by Olivia.
 * * Feature Update!
 * ** Slight change to the way calculations are made for the bottom aligned
 *    field gauge position. Update made by Olivia.
 * 
 * Version 1.09: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.08: November 22, 2020
 * * Feature Update!
 * ** ATB Interrupts will not clear all actions (including queued ones) for
 *    mechanical compatibility. Change made by Yanfly.
 * 
 * Version 1.07: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change Field Gauge Face
 * **** Changes the faces used for the specific actor(s) on the ATB
 *      Field Gauge.
 * 
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin should now be compatible with older saves when changing to a save
 *    that didn't use a Field Gauge to one that does. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <ATB Field Gauge Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: October 11, 2020
 * * Documentation Update
 * ** Help file updated with new features.
 * * Feature Update!
 * ** Enemy letters are no longer drawn on the Field Gauge unless there are
 *    multiple enemies of the same type. Added by Arisu.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and Yanfly.
 * *** Plugin Parameters > Field Gauge > Offset X and Y
 * **** How much to offset the X/Y coordinates of the Field Gauge by.
 * 
 * Version 1.02: October 4, 2020
 * * New Features!
 * ** New Plugin Command added "System: ATB Field Gauge Visibility" to let you
 *    show or hide the Field Gauge during battle. Added by Arisu.
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** ATB Cast and Charge notetags no longer cause crashes. Fix made by Olivia.
 * * New Features!
 * ** New plugin parameter added by Olivia.
 * *** Plugin Parameters > Mechanics > Stuns Reset Gauge?
 * **** Should stuns reset the ATB Gauge?
 *
 * Version 1.00: September 21, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeActorIcon
 * @text Actor: Change Field Gauge Icon
 * @desc Changes the icons used for the specific actor(s) on the ATB Field Gauge.
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
 * @command FieldGaugeActorFace
 * @text Actor: Change Field Gauge Face
 * @desc Changes the faces used for the specific actor(s) on the ATB Field Gauge.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeClearActorGraphic
 * @text Actor: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the actor(s).
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
 * @command FieldGaugeEnemyIcon
 * @text Enemy: Change Field Gauge Icon
 * @desc Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
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
 * @command FieldGaugeEnemyFace
 * @text Enemy: Change Field Gauge Face
 * @desc Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
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
 * @command FieldGaugeClearEnemyGraphic
 * @text Enemy: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the enemy(ies).
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
 * @command SystemFieldGaugeVisibility
 * @text System: ATB Field Gauge Visibility
 * @desc Determine the visibility of the ATB Field Gauge.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the ATB Field Gauge.
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
 * @param BattleSystemATB
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
 * @desc Mechanics settings used for Battle System ATB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","StunsResetGauge:eval":"true","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.5","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Interrupt:struct
 * @text Interrupt Settings
 * @type struct<Interrupt>
 * @desc Interrupt settings used for Battle System ATB.
 * @default {"Interrupt":"","InterruptAnimationID:num":"11","InterruptMirror:eval":"false","InterruptMute:eval":"false","InterruptText:str":"INTERRUPTED!","InterruptTextColor:str":"0","InterruptFlashColor:eval":"[255, 0, 0, 160]","InterruptFlashDuration:num":"60"}
 *
 * @param Gauge:struct
 * @text General Gauge Settings
 * @type struct<Gauge>
 * @desc General gauge settings used for ATB Gauges.
 * @default {"General":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"2","AGIGaugeRates":"","SlowRate:num":"0.60","FastRate:num":"1.40","Actors":"","ShowActorGauge:eval":"true","ShowStatusGauge:eval":"false","Enemies":"","ShowEnemyGauge:eval":"true"}
 *
 * @param FieldGauge:struct
 * @text Field Gauge Settings
 * @type struct<FieldGauge>
 * @desc Make a field-wide ATB gauge for all the battlers.
 * @default {"General":"","UseFieldGauge:eval":"false","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","GaugeDirection:eval":"true","Gauge":"","GaugeSystemSkin:str":"","DrawGauge:eval":"true","GaugeLengthHorz:num":"600","GaugeLengthVert:num":"400","GaugeThick:num":"16","GaugeSplit:num":"0.70","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"48","Markers":"","ActorSide:eval":"true","EnemySide:eval":"false","MarkerOffset:num":"28","MarkerSize:num":"32","MarkerSpeed:num":"36","OpacityRate:num":"4","BorderThickness:num":"2","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"1","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"10","EnemyBgColor2:str":"18","EnemySystemBg:str":"","Arrow":"","ShowMarkerArrow:eval":"true","MarkerArrowWindowSkin:str":"Window"}
 *
 * @param Color:struct
 * @text Gauge Color Settings
 * @type struct<Color>
 * @desc Gauge color settings used for ATB Gauges.
 * @default {"default1:str":"26","default2:str":"27","full1:str":"14","full2:str":"6","cast1:str":"2","cast2:str":"10","fast1:str":"27","fast2:str":"18","slow1:str":"22","slow2:str":"23","stop1:str":"7","stop2:str":"8"}
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings used for Battle System ATB.
 * @default {"Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show ATB Gauges"}
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
 * @param General
 * 
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param StunsResetGauge:eval
 * @text Stuns Reset Gauge?
 * @parent General
 * @type boolean
 * @on Reset Gauge
 * @off Don't Reset
 * @desc Should stuns reset the ATB Gauge?
 * @default true
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Gauge
 * @parent JavaScript
 * @desc JavaScript code to determine how much ATB gauge to give
 * each battler at the start of battle.
 * @default Math.random() * 0.5
 *
 * @param TpbSpeedCalcJS:func
 * @text JS: Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much speed a battler has.
 * @default "// Declare Constants\nconst user = this;\n\n// Process Calculation\nlet speed = Math.sqrt(user.agi) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param TpbBaseSpeedCalcJS:func
 * @text JS: Base Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much base speed a battler has.
 * @default "// Declare Constants\nconst user = this;\nconst baseAgility = user.paramBasePlus(6);\n\n// Process Calculation\nlet speed = Math.sqrt(baseAgility) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param BattlerRelativeSpeedJS:func
 * @text JS: Relative Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine what is the relative speed of a battler.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbSpeed()\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\n\n// Process Calculation\nlet relativeSpeed = speed / partyBaseSpeed;\n\n// Return Value\nreturn relativeSpeed;"
 * 
 * @param TpbAccelerationJS:func
 * @text JS: Acceleration
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much gauges accelerate by relative to reference time.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbRelativeSpeed();\nconst referenceTime = $gameParty.tpbReferenceTime();\n\n// Process Calculation\nlet acceleration = speed / referenceTime;\n\n// Return Value\nreturn acceleration;"
 * 
 * @param TpbCastTimeJS:func
 * @text JS: Cast Time
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much cast time is used for skills/items with negative speed modifiers.
 * @default "// Declare Constants\nconst user = this;\nconst actions = user._actions.filter(action => action.isValid());\nconst items = actions.map(action => action.item());\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\n\n// Process Calculation\nlet time = Math.sqrt(delay) / user.tpbSpeed();\n\n// Return Value\nreturn time;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Interrupt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Interrupt:
 *
 * @param Interrupt
 *
 * @param InterruptAnimationID:num
 * @text Animation ID
 * @parent Interrupt
 * @type animation
 * @desc Play this animation when a unit is interrupted.
 * Requires VisuMZ_0_CoreEngine.
 * @default 11
 *
 * @param InterruptMirror:eval
 * @text Mirror Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptMute:eval
 * @text Mute Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptText:str
 * @text Text Popup
 * @parent Interrupt
 * @desc Text used for popup when interrupts happen.
 * Leave empty for no popup.
 * @default INTERRUPTED!
 *
 * @param InterruptTextColor:str
 * @text Text Color
 * @parent InterruptText:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param InterruptFlashColor:eval
 * @text Flash Color
 * @parent InterruptText:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param InterruptFlashDuration:num
 * @text Flash Duration
 * @parent InterruptText:str
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param General
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent General
 * @desc How large/small do you want the ATB Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's Y by?
 * @default 2
 *
 * @param AGIGaugeRates
 * @text AGI Gauge Rates
 *
 * @param SlowRate:num
 * @text Slow Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered slow?
 * @default 0.60
 *
 * @param FastRate:num
 * @text Fast Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered fast?
 * @default 1.40
 *
 * @param Actors
 *
 * @param ShowActorGauge:eval
 * @text Show Sprite Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowStatusGauge:eval
 * @text Show Status Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges in the status window?
 * Applies only to sideview.
 * @default false
 *
 * @param Enemies
 *
 * @param ShowEnemyGauge:eval
 * @text Show Sprite Gauges
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the enemy sprites' heads?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param default1:str
 * @text Default Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param default2:str
 * @text Default Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param full1:str
 * @text Full Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param full2:str
 * @text Full Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param cast1:str
 * @text Cast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param cast2:str
 * @text Cast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 10
 *
 * @param fast1:str
 * @text Fast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param fast2:str
 * @text Fast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param slow1:str
 * @text Slow Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param slow2:str
 * @text Slow Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param stop1:str
 * @text Stop Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param stop2:str
 * @text Stop Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
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
 * @desc Add the 'Show ATB Gauges' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show ATB Gauges
 *
 */
/* ----------------------------------------------------------------------------
 * Field Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~FieldGauge:
 *
 * @param General
 *
 * @param UseFieldGauge:eval
 * @text Use Field Gauge?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc This value must be set to true in order for the ATB Field Gauge to appear.
 * @default false
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Field Gauge will appear on the screen.
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
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * gauge when the help window is open?
 * @default true
 *
 * @param GaugeDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Up to Down
 * @off Right to Left / Down to Up
 * @desc Decide on the direction of the Field Gauge.
 * Settings may vary depending on position.
 * @default true
 *
 * @param Gauge
 * @text Field Gauge Settings
 *
 * @param GaugeSystemSkin:str
 * @text Gauge Skin
 * @parent Gauge
 * @type file
 * @dir img/system/
 * @desc Optional. Select an image to place behind the gauge.
 * This will be centered on the Field Gauge's position.
 * @default 
 *
 * @param DrawGauge:eval
 * @text Show Gauge?
 * @parent Gauge
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Decide if you want the gauge to be shown.
 * @default true
 *
 * @param GaugeLengthHorz:num
 * @text Horizontal Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed horizontally.
 * @default 600
 *
 * @param GaugeLengthVert:num
 * @text Vertical Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed vertically.
 * @default 400
 *
 * @param GaugeThick:num
 * @text Thickness
 * @parent Gauge
 * @type number
 * @min 3
 * @desc The thickness of the Field Gauge for either direction.
 * @default 16
 *
 * @param GaugeSplit:num
 * @text Split Location
 * @parent Gauge
 * @desc Determine where the gauge should split.
 * Use 0.00 for the start. Use 1.00 for the end.
 * @default 0.70
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the gauge's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the gauge's Y coordinates by this much when
 * the Help Window is visible.
 * @default 48
 *
 * @param Markers
 * @text Marker Sprites
 *
 * @param ActorSide:eval
 * @text Actor Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the actor markers to appear?
 * @default true
 *
 * @param EnemySide:eval
 * @text Enemy Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the enemy markers to appear?
 * @default false
 *
 * @param MarkerOffset:num
 * @text Marker Offset
 * @parent Markers
 * @desc How many pixels do you want to offset the markers by?
 * @default 28
 *
 * @param MarkerSize:num
 * @text Marker Size
 * @parent Markers
 * @type number
 * @min 10
 * @desc How pixels wide and tall do you want the markers to be?
 * @default 32
 *
 * @param MarkerSpeed:num
 * @text Marker Speed
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels maximum can a marker travel in one frame?
 * @default 36
 *
 * @param OpacityRate:num
 * @text Opacity Rate
 * @parent Markers
 * @type number
 * @min 1
 * @desc If a marker has to change opacity, how fast should it change by?
 * @default 4
 *
 * @param Border
 * @text Marker Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the marker sprites?
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
 * @text Marker Sprites
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
 * @text Marker Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the marker sprite?
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
 * @text Marker Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the marker sprite?
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
 * @default 1
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
 * @default 10
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
 * @param Arrow
 * @text Marker Arrow
 *
 * @param ShowMarkerArrow:eval
 * @text Show Arrow?
 * @parent Arrow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the arrow sprite pointing towards the Field Gauge?
 * @default true
 *
 * @param MarkerArrowWindowSkin:str
 * @text Arrow Skin
 * @parent Arrow
 * @type file
 * @dir img/system/
 * @desc Pick a window skin to draw arrows from.
 * @default Window
 *
 */
//=============================================================================

const _0xd2f06f=_0x47e9;(function(_0x11e987,_0x4508b7){const _0x78a716=_0x47e9,_0x5e3ff4=_0x11e987();while(!![]){try{const _0x357a27=parseInt(_0x78a716(0x28a))/0x1+-parseInt(_0x78a716(0x26b))/0x2*(parseInt(_0x78a716(0x1d1))/0x3)+-parseInt(_0x78a716(0x208))/0x4+-parseInt(_0x78a716(0x1b4))/0x5+parseInt(_0x78a716(0x302))/0x6*(-parseInt(_0x78a716(0x2a0))/0x7)+parseInt(_0x78a716(0x1b7))/0x8+parseInt(_0x78a716(0x36c))/0x9*(parseInt(_0x78a716(0x1ea))/0xa);if(_0x357a27===_0x4508b7)break;else _0x5e3ff4['push'](_0x5e3ff4['shift']());}catch(_0x2a90da){_0x5e3ff4['push'](_0x5e3ff4['shift']());}}}(_0x2c99,0x9f903));var label=_0xd2f06f(0x283),tier=tier||0x0,dependencies=[_0xd2f06f(0x1d6)],pluginData=$plugins[_0xd2f06f(0x219)](function(_0x16dcfd){const _0x45ae7a=_0xd2f06f;return _0x16dcfd[_0x45ae7a(0x1d7)]&&_0x16dcfd[_0x45ae7a(0x35b)][_0x45ae7a(0x255)]('['+label+']');})[0x0];VisuMZ[label][_0xd2f06f(0x1a9)]=VisuMZ[label][_0xd2f06f(0x1a9)]||{},VisuMZ[_0xd2f06f(0x2c4)]=function(_0x31ff36,_0x33af9c){const _0x35c660=_0xd2f06f;for(const _0x408f2e in _0x33af9c){if(_0x408f2e['match'](/(.*):(.*)/i)){const _0x2a06fd=String(RegExp['$1']),_0x9998d8=String(RegExp['$2'])['toUpperCase']()[_0x35c660(0x33d)]();let _0x4f9ef3,_0x1eb3a5,_0x460a49;switch(_0x9998d8){case'NUM':_0x4f9ef3=_0x33af9c[_0x408f2e]!==''?Number(_0x33af9c[_0x408f2e]):0x0;break;case'ARRAYNUM':_0x1eb3a5=_0x33af9c[_0x408f2e]!==''?JSON[_0x35c660(0x2f1)](_0x33af9c[_0x408f2e]):[],_0x4f9ef3=_0x1eb3a5[_0x35c660(0x1d2)](_0x4e7eb8=>Number(_0x4e7eb8));break;case'EVAL':_0x4f9ef3=_0x33af9c[_0x408f2e]!==''?eval(_0x33af9c[_0x408f2e]):null;break;case _0x35c660(0x36f):_0x1eb3a5=_0x33af9c[_0x408f2e]!==''?JSON[_0x35c660(0x2f1)](_0x33af9c[_0x408f2e]):[],_0x4f9ef3=_0x1eb3a5[_0x35c660(0x1d2)](_0x356fb4=>eval(_0x356fb4));break;case _0x35c660(0x201):_0x4f9ef3=_0x33af9c[_0x408f2e]!==''?JSON[_0x35c660(0x2f1)](_0x33af9c[_0x408f2e]):'';break;case _0x35c660(0x1cb):_0x1eb3a5=_0x33af9c[_0x408f2e]!==''?JSON[_0x35c660(0x2f1)](_0x33af9c[_0x408f2e]):[],_0x4f9ef3=_0x1eb3a5[_0x35c660(0x1d2)](_0x1110d6=>JSON[_0x35c660(0x2f1)](_0x1110d6));break;case _0x35c660(0x355):_0x4f9ef3=_0x33af9c[_0x408f2e]!==''?new Function(JSON['parse'](_0x33af9c[_0x408f2e])):new Function('return\x200');break;case _0x35c660(0x269):_0x1eb3a5=_0x33af9c[_0x408f2e]!==''?JSON[_0x35c660(0x2f1)](_0x33af9c[_0x408f2e]):[],_0x4f9ef3=_0x1eb3a5[_0x35c660(0x1d2)](_0xd1ef2e=>new Function(JSON[_0x35c660(0x2f1)](_0xd1ef2e)));break;case _0x35c660(0x1ec):_0x4f9ef3=_0x33af9c[_0x408f2e]!==''?String(_0x33af9c[_0x408f2e]):'';break;case _0x35c660(0x330):_0x1eb3a5=_0x33af9c[_0x408f2e]!==''?JSON[_0x35c660(0x2f1)](_0x33af9c[_0x408f2e]):[],_0x4f9ef3=_0x1eb3a5[_0x35c660(0x1d2)](_0x57e3f3=>String(_0x57e3f3));break;case'STRUCT':_0x460a49=_0x33af9c[_0x408f2e]!==''?JSON[_0x35c660(0x2f1)](_0x33af9c[_0x408f2e]):{},_0x4f9ef3=VisuMZ[_0x35c660(0x2c4)]({},_0x460a49);break;case'ARRAYSTRUCT':_0x1eb3a5=_0x33af9c[_0x408f2e]!==''?JSON['parse'](_0x33af9c[_0x408f2e]):[],_0x4f9ef3=_0x1eb3a5[_0x35c660(0x1d2)](_0x114365=>VisuMZ[_0x35c660(0x2c4)]({},JSON[_0x35c660(0x2f1)](_0x114365)));break;default:continue;}_0x31ff36[_0x2a06fd]=_0x4f9ef3;}}return _0x31ff36;},(_0x1121eb=>{const _0x1f0fb3=_0xd2f06f,_0x33f2ea=_0x1121eb[_0x1f0fb3(0x242)];for(const _0x2ada20 of dependencies){if(!Imported[_0x2ada20]){alert(_0x1f0fb3(0x23e)['format'](_0x33f2ea,_0x2ada20)),SceneManager[_0x1f0fb3(0x327)]();break;}}const _0x35f932=_0x1121eb['description'];if(_0x35f932['match'](/\[Version[ ](.*?)\]/i)){const _0x35a18f=Number(RegExp['$1']);_0x35a18f!==VisuMZ[label][_0x1f0fb3(0x236)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x1f0fb3(0x2dc)](_0x33f2ea,_0x35a18f)),SceneManager[_0x1f0fb3(0x327)]());}if(_0x35f932[_0x1f0fb3(0x36e)](/\[Tier[ ](\d+)\]/i)){const _0x31a0dc=Number(RegExp['$1']);_0x31a0dc<tier?(alert(_0x1f0fb3(0x1d4)[_0x1f0fb3(0x2dc)](_0x33f2ea,_0x31a0dc,tier)),SceneManager[_0x1f0fb3(0x327)]()):tier=Math[_0x1f0fb3(0x2aa)](_0x31a0dc,tier);}VisuMZ[_0x1f0fb3(0x2c4)](VisuMZ[label][_0x1f0fb3(0x1a9)],_0x1121eb[_0x1f0fb3(0x31d)]);})(pluginData),PluginManager[_0xd2f06f(0x2af)](pluginData['name'],'FieldGaugeActorIcon',_0x5d080b=>{const _0x45bcc1=_0xd2f06f;VisuMZ[_0x45bcc1(0x2c4)](_0x5d080b,_0x5d080b);const _0x3efebd=_0x5d080b['Actors'],_0x1884c7=_0x5d080b[_0x45bcc1(0x33f)];for(const _0x590f5d of _0x3efebd){const _0x247126=$gameActors[_0x45bcc1(0x26f)](_0x590f5d);if(!_0x247126)continue;_0x247126['_fieldAtbGaugeGraphicType']=_0x45bcc1(0x22d),_0x247126[_0x45bcc1(0x22b)]=_0x1884c7;}}),PluginManager['registerCommand'](pluginData['name'],_0xd2f06f(0x2ef),_0xf3415a=>{const _0x56bd68=_0xd2f06f;VisuMZ[_0x56bd68(0x2c4)](_0xf3415a,_0xf3415a);const _0x144603=_0xf3415a[_0x56bd68(0x364)],_0x4bdb7e=_0xf3415a['FaceName'],_0x59c998=_0xf3415a['FaceIndex'];for(const _0x3c5999 of _0x144603){const _0x56d8a2=$gameActors[_0x56bd68(0x26f)](_0x3c5999);if(!_0x56d8a2)continue;_0x56d8a2[_0x56bd68(0x307)]=_0x56bd68(0x2a8),_0x56d8a2['_fieldAtbGaugeFaceName']=_0x4bdb7e,_0x56d8a2[_0x56bd68(0x2d4)]=_0x59c998;}}),PluginManager[_0xd2f06f(0x2af)](pluginData['name'],_0xd2f06f(0x2e7),_0x3d3a60=>{const _0x57b232=_0xd2f06f;VisuMZ[_0x57b232(0x2c4)](_0x3d3a60,_0x3d3a60);const _0x81f88f=_0x3d3a60['Actors'];for(const _0x40b750 of _0x81f88f){const _0x15302e=$gameActors['actor'](_0x40b750);if(!_0x15302e)continue;_0x15302e[_0x57b232(0x1b3)]();}}),PluginManager['registerCommand'](pluginData[_0xd2f06f(0x242)],_0xd2f06f(0x287),_0x42a64a=>{const _0x55d47a=_0xd2f06f;VisuMZ[_0x55d47a(0x2c4)](_0x42a64a,_0x42a64a);const _0x482039=_0x42a64a['Enemies'],_0x590f4b=_0x42a64a[_0x55d47a(0x33f)];for(const _0x4fd0ab of _0x482039){const _0xc5c4f7=$gameTroop[_0x55d47a(0x2b1)]()[_0x4fd0ab];if(!_0xc5c4f7)continue;_0xc5c4f7[_0x55d47a(0x307)]=_0x55d47a(0x22d),_0xc5c4f7[_0x55d47a(0x22b)]=_0x590f4b;}}),PluginManager[_0xd2f06f(0x2af)](pluginData['name'],_0xd2f06f(0x250),_0x173794=>{const _0x4e996c=_0xd2f06f;VisuMZ[_0x4e996c(0x2c4)](_0x173794,_0x173794);const _0x4136cd=_0x173794['Enemies'],_0x216bff=_0x173794['FaceName'],_0x440eae=_0x173794['FaceIndex'];for(const _0x437b54 of _0x4136cd){const _0x7dae6a=$gameTroop[_0x4e996c(0x2b1)]()[_0x437b54];if(!_0x7dae6a)continue;_0x7dae6a[_0x4e996c(0x307)]=_0x4e996c(0x2a8),_0x7dae6a[_0x4e996c(0x310)]=_0x216bff,_0x7dae6a[_0x4e996c(0x2d4)]=_0x440eae;}}),PluginManager[_0xd2f06f(0x2af)](pluginData['name'],_0xd2f06f(0x2a1),_0x59d6fa=>{const _0x3572a9=_0xd2f06f;VisuMZ['ConvertParams'](_0x59d6fa,_0x59d6fa);const _0x6cc47c=_0x59d6fa[_0x3572a9(0x309)];for(const _0x3f3a05 of _0x6cc47c){const _0x58d793=$gameTroop[_0x3572a9(0x2b1)]()[_0x3f3a05];if(!_0x58d793)continue;_0x58d793['clearFieldAtbGraphics']();}}),PluginManager[_0xd2f06f(0x2af)](pluginData['name'],'SystemFieldGaugeVisibility',_0x1693ee=>{const _0x28a076=_0xd2f06f;VisuMZ[_0x28a076(0x2c4)](_0x1693ee,_0x1693ee);const _0x3216d6=_0x1693ee[_0x28a076(0x2d5)];$gameSystem[_0x28a076(0x232)](_0x3216d6);}),VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x340)]=Scene_Boot['prototype'][_0xd2f06f(0x32a)],Scene_Boot[_0xd2f06f(0x1b2)][_0xd2f06f(0x32a)]=function(){const _0x37e604=_0xd2f06f;this['process_VisuMZ_BattleSystemATB_CreateRegExp'](),VisuMZ[_0x37e604(0x283)]['Scene_Boot_onDatabaseLoaded'][_0x37e604(0x1df)](this),this[_0x37e604(0x2f9)]();},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x282)]={},Scene_Boot[_0xd2f06f(0x1b2)]['process_VisuMZ_BattleSystemATB_CreateRegExp']=function(){const _0x4282dd=_0xd2f06f,_0x239f57=VisuMZ[_0x4282dd(0x31a)]['RegExp'],_0x41553b=_0x4282dd(0x1dc),_0x38640d=[_0x4282dd(0x20c),_0x4282dd(0x377),_0x4282dd(0x1f8)];for(const _0x568a3d of _0x38640d){const _0x18bd63=_0x41553b[_0x4282dd(0x2dc)](_0x568a3d[_0x4282dd(0x1c1)]()['trim'](),_0x4282dd(0x2cd),_0x4282dd(0x29a)),_0x364dd6=new RegExp(_0x18bd63,'i');VisuMZ[_0x4282dd(0x283)][_0x4282dd(0x282)][_0x568a3d]=_0x364dd6;}},Scene_Boot[_0xd2f06f(0x1b2)][_0xd2f06f(0x2f9)]=function(){const _0x44ab68=_0xd2f06f;if(VisuMZ[_0x44ab68(0x31e)])return;const _0x328b7e=$dataSkills['concat']($dataItems);for(const _0x287004 of _0x328b7e){if(!_0x287004)continue;VisuMZ[_0x44ab68(0x283)][_0x44ab68(0x2f3)](_0x287004);}},VisuMZ['BattleSystemATB'][_0xd2f06f(0x1f3)]=VisuMZ[_0xd2f06f(0x1f3)],VisuMZ['ParseSkillNotetags']=function(_0x398586){const _0x264019=_0xd2f06f;VisuMZ[_0x264019(0x283)][_0x264019(0x1f3)]['call'](this,_0x398586),VisuMZ[_0x264019(0x283)][_0x264019(0x2f3)](_0x398586);},VisuMZ[_0xd2f06f(0x283)]['ParseItemNotetags']=VisuMZ['ParseItemNotetags'],VisuMZ[_0xd2f06f(0x344)]=function(_0x5203bb){const _0x552205=_0xd2f06f;VisuMZ[_0x552205(0x283)]['ParseItemNotetags'][_0x552205(0x1df)](this,_0x5203bb),VisuMZ[_0x552205(0x283)][_0x552205(0x2f3)](_0x5203bb);},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x2f3)]=function(_0x4cff67){const _0x350ee4=_0xd2f06f,_0x4ac3e4=[_0x350ee4(0x20c),_0x350ee4(0x377),_0x350ee4(0x1f8)];for(const _0x39867d of _0x4ac3e4){VisuMZ[_0x350ee4(0x283)]['createJS'](_0x4cff67,_0x39867d);}},VisuMZ[_0xd2f06f(0x283)]['JS']={},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x308)]=function(_0x280453,_0x177ead){const _0x46a988=_0xd2f06f,_0x2fa0d1=_0x280453[_0x46a988(0x1c5)];if(_0x2fa0d1[_0x46a988(0x36e)](VisuMZ[_0x46a988(0x283)][_0x46a988(0x282)][_0x177ead])){const _0x4d7a6d=String(RegExp['$1']),_0x26e6ba='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x46a988(0x2dc)](_0x4d7a6d,_0x177ead),_0xf22084=VisuMZ[_0x46a988(0x283)][_0x46a988(0x226)](_0x280453,_0x177ead);VisuMZ['BattleSystemATB']['JS'][_0xf22084]=new Function(_0x26e6ba);}},VisuMZ['BattleSystemATB'][_0xd2f06f(0x226)]=function(_0x20f3de,_0x23447c){const _0x2fe8bb=_0xd2f06f;if(VisuMZ[_0x2fe8bb(0x226)])return VisuMZ[_0x2fe8bb(0x226)](_0x20f3de,_0x23447c);let _0x19fda6='';if($dataActors[_0x2fe8bb(0x255)](_0x20f3de))_0x19fda6=_0x2fe8bb(0x34d)['format'](_0x20f3de['id'],_0x23447c);if($dataClasses[_0x2fe8bb(0x255)](_0x20f3de))_0x19fda6=_0x2fe8bb(0x21d)[_0x2fe8bb(0x2dc)](_0x20f3de['id'],_0x23447c);if($dataSkills[_0x2fe8bb(0x255)](_0x20f3de))_0x19fda6='Skill-%1-%2'['format'](_0x20f3de['id'],_0x23447c);if($dataItems[_0x2fe8bb(0x255)](_0x20f3de))_0x19fda6=_0x2fe8bb(0x2c7)[_0x2fe8bb(0x2dc)](_0x20f3de['id'],_0x23447c);if($dataWeapons[_0x2fe8bb(0x255)](_0x20f3de))_0x19fda6=_0x2fe8bb(0x2fa)[_0x2fe8bb(0x2dc)](_0x20f3de['id'],_0x23447c);if($dataArmors['includes'](_0x20f3de))_0x19fda6=_0x2fe8bb(0x1ee)[_0x2fe8bb(0x2dc)](_0x20f3de['id'],_0x23447c);if($dataEnemies[_0x2fe8bb(0x255)](_0x20f3de))_0x19fda6=_0x2fe8bb(0x2f8)['format'](_0x20f3de['id'],_0x23447c);if($dataStates[_0x2fe8bb(0x255)](_0x20f3de))_0x19fda6=_0x2fe8bb(0x314)[_0x2fe8bb(0x2dc)](_0x20f3de['id'],_0x23447c);return _0x19fda6;},ConfigManager[_0xd2f06f(0x1b5)]=!![],VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x2b5)]=ConfigManager[_0xd2f06f(0x316)],ConfigManager[_0xd2f06f(0x316)]=function(){const _0x57e8ab=_0xd2f06f,_0x2ead23=VisuMZ['BattleSystemATB'][_0x57e8ab(0x2b5)][_0x57e8ab(0x1df)](this);return _0x2ead23[_0x57e8ab(0x1b5)]=this['visualAtbGauge'],_0x2ead23;},VisuMZ[_0xd2f06f(0x283)]['ConfigManager_applyData']=ConfigManager[_0xd2f06f(0x2bb)],ConfigManager['applyData']=function(_0x2780ac){const _0x48f7d3=_0xd2f06f;VisuMZ['BattleSystemATB'][_0x48f7d3(0x2db)][_0x48f7d3(0x1df)](this,_0x2780ac),'visualAtbGauge'in _0x2780ac?this['visualAtbGauge']=_0x2780ac[_0x48f7d3(0x1b5)]:this[_0x48f7d3(0x1b5)]=!![];},ImageManager[_0xd2f06f(0x229)]=ImageManager[_0xd2f06f(0x229)]||0x9,ImageManager['svActorVertCells']=ImageManager[_0xd2f06f(0x1ca)]||0x6,TextManager[_0xd2f06f(0x1b5)]=VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x1a9)][_0xd2f06f(0x206)]['Name'],VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x293)]=ColorManager[_0xd2f06f(0x28f)],ColorManager[_0xd2f06f(0x28f)]=function(){const _0x1f408c=_0xd2f06f;VisuMZ[_0x1f408c(0x283)]['ColorManager_loadWindowskin'][_0x1f408c(0x1df)](this),this[_0x1f408c(0x22f)][_0x1f408c(0x221)](this[_0x1f408c(0x324)][_0x1f408c(0x25f)](this));},ColorManager[_0xd2f06f(0x2b4)]=function(_0x2118ff){const _0x2bf266=_0xd2f06f;return _0x2118ff=String(_0x2118ff),_0x2118ff[_0x2bf266(0x36e)](/#(.*)/i)?'#%1'[_0x2bf266(0x2dc)](String(RegExp['$1'])):this[_0x2bf266(0x29d)](Number(_0x2118ff));},ColorManager[_0xd2f06f(0x324)]=function(){const _0x63d417=_0xd2f06f,_0x4a0064=[_0x63d417(0x2e2),_0x63d417(0x30e),_0x63d417(0x22c),_0x63d417(0x2f5),_0x63d417(0x1bd),_0x63d417(0x216)],_0x16b080=VisuMZ[_0x63d417(0x283)][_0x63d417(0x1a9)][_0x63d417(0x268)];this['_atbColors']={};for(const _0x30e319 of _0x4a0064){for(let _0x2da120=0x1;_0x2da120<=0x2;_0x2da120++){const _0x24f2c0=_0x30e319+_0x2da120;this['_atbColors'][_0x24f2c0]=this[_0x63d417(0x2b4)](_0x16b080[_0x24f2c0]);}}},ColorManager[_0xd2f06f(0x1d9)]=function(_0x4bed30){const _0x4767f4=_0xd2f06f;if(this['_atbColors']===undefined)this[_0x4767f4(0x324)]();return this[_0x4767f4(0x292)][_0x4bed30]||_0x4767f4(0x2a6);},SceneManager[_0xd2f06f(0x225)]=function(){const _0x5b2581=_0xd2f06f;return this[_0x5b2581(0x1e8)]&&this[_0x5b2581(0x1e8)][_0x5b2581(0x1cf)]===Scene_Battle;},BattleManager['isATB']=function(){const _0x1d82e9=_0xd2f06f;if(Imported[_0x1d82e9(0x1fe)]&&this['isCTB']())return![];return this['isTpb']();},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x25e)]=BattleManager[_0xd2f06f(0x20a)],BattleManager[_0xd2f06f(0x20a)]=function(){const _0x16bd7a=_0xd2f06f;if(!this[_0x16bd7a(0x2e5)]())return![];else return ConfigManager&&ConfigManager['atbActive']!==undefined?ConfigManager[_0x16bd7a(0x1d3)]:VisuMZ[_0x16bd7a(0x283)][_0x16bd7a(0x25e)]['call'](this);},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x27f)]=Game_System[_0xd2f06f(0x1b2)][_0xd2f06f(0x251)],Game_System[_0xd2f06f(0x1b2)][_0xd2f06f(0x251)]=function(){const _0x3543c2=_0xd2f06f;VisuMZ[_0x3543c2(0x283)][_0x3543c2(0x27f)][_0x3543c2(0x1df)](this),this[_0x3543c2(0x378)]();},Game_System[_0xd2f06f(0x1b2)]['initBattleSystemATB']=function(){this['_atbFieldGaugeVisible']=!![];},Game_System[_0xd2f06f(0x1b2)]['isBattleSystemATBFieldGaugeVisible']=function(){const _0x1743ca=_0xd2f06f;return this['_atbFieldGaugeVisible']===undefined&&this['initBattleSystemATB'](),this[_0x1743ca(0x279)];},Game_System[_0xd2f06f(0x1b2)][_0xd2f06f(0x232)]=function(_0x215a2e){const _0x1d010b=_0xd2f06f;this[_0x1d010b(0x279)]===undefined&&this[_0x1d010b(0x378)](),this[_0x1d010b(0x279)]=_0x215a2e;},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x220)]=Game_Action[_0xd2f06f(0x1b2)][_0xd2f06f(0x1e0)],Game_Action[_0xd2f06f(0x1b2)][_0xd2f06f(0x1e0)]=function(_0x58b286){const _0x2f4660=_0xd2f06f;VisuMZ[_0x2f4660(0x283)][_0x2f4660(0x220)][_0x2f4660(0x1df)](this,_0x58b286),this[_0x2f4660(0x234)](_0x58b286);},Game_Action[_0xd2f06f(0x1b2)]['applyBattleSystemATBUserEffect']=function(_0x50d7ae){const _0x5ee4de=_0xd2f06f;if(!SceneManager[_0x5ee4de(0x225)]())return;if(!BattleManager['isATB']())return;if(this[_0x5ee4de(0x24e)]())this[_0x5ee4de(0x24d)](_0x50d7ae);},Game_Action[_0xd2f06f(0x1b2)]['applyItemBattleSystemATBUserEffect']=function(_0x6ba5b6){const _0x1accf3=_0xd2f06f,_0x20f5a0=this[_0x1accf3(0x24e)]()[_0x1accf3(0x1c5)];if(_0x6ba5b6[_0x1accf3(0x205)]()){const _0x5a2cfd=VisuMZ['BattleSystemATB']['createKeyJS'](this[_0x1accf3(0x24e)](),_0x1accf3(0x20c));if(VisuMZ[_0x1accf3(0x283)]['JS'][_0x5a2cfd]){const _0x24f2f5=VisuMZ[_0x1accf3(0x283)]['JS'][_0x5a2cfd][_0x1accf3(0x1df)](this,this['subject'](),_0x6ba5b6);_0x6ba5b6['setAtbChargeTime'](_0x24f2f5);}_0x20f5a0['match'](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x6ba5b6[_0x1accf3(0x28b)](Number(RegExp['$1'])*0.01),_0x20f5a0[_0x1accf3(0x36e)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x6ba5b6[_0x1accf3(0x23a)](Number(RegExp['$1'])*0.01);}else{if(_0x6ba5b6[_0x1accf3(0x214)]()){const _0x1de995=VisuMZ[_0x1accf3(0x283)][_0x1accf3(0x226)](this[_0x1accf3(0x24e)](),'Cast');if(VisuMZ[_0x1accf3(0x283)]['JS'][_0x1de995]){const _0x1fb999=VisuMZ[_0x1accf3(0x283)]['JS'][_0x1de995][_0x1accf3(0x1df)](this,this['subject'](),_0x6ba5b6);_0x6ba5b6[_0x1accf3(0x277)](_0x1fb999);}_0x20f5a0[_0x1accf3(0x36e)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x6ba5b6[_0x1accf3(0x277)](Number(RegExp['$1'])*0.01),_0x20f5a0[_0x1accf3(0x36e)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x6ba5b6['changeAtbCastTime'](Number(RegExp['$1'])*0.01),_0x20f5a0[_0x1accf3(0x36e)](/<(?:ATB|TPB) INTERRUPT>/i)&&_0x6ba5b6[_0x1accf3(0x325)]();}}},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x2c9)]=Game_Action[_0xd2f06f(0x1b2)][_0xd2f06f(0x2c8)],Game_Action[_0xd2f06f(0x1b2)]['applyGlobal']=function(){const _0x41fe59=_0xd2f06f;VisuMZ[_0x41fe59(0x283)][_0x41fe59(0x2c9)][_0x41fe59(0x1df)](this),this['applyGlobalBattleSystemATBEffects']();},Game_Action['prototype'][_0xd2f06f(0x331)]=function(){const _0x17afce=_0xd2f06f;if(!this[_0x17afce(0x24e)]())return;if(!BattleManager[_0x17afce(0x1cc)]())return;const _0x21bd0=this['item']()['note'];let _0x4650d6=0x0;this[_0x17afce(0x352)]&&(_0x4650d6=this[_0x17afce(0x25d)]()[_0x17afce(0x26d)]);const _0x2b88b4=VisuMZ[_0x17afce(0x283)][_0x17afce(0x226)](this[_0x17afce(0x24e)](),_0x17afce(0x1f8));VisuMZ['BattleSystemATB']['JS'][_0x2b88b4]&&(_0x4650d6=VisuMZ[_0x17afce(0x283)]['JS'][_0x2b88b4][_0x17afce(0x1df)](this,this[_0x17afce(0x25d)](),this[_0x17afce(0x25d)]()));let _0x153c6e=this[_0x17afce(0x24e)]()['speed']>0x0?this[_0x17afce(0x24e)]()[_0x17afce(0x37d)]:0x0;if(this[_0x17afce(0x298)]())_0x153c6e+=this[_0x17afce(0x25d)]()[_0x17afce(0x23f)]();_0x4650d6+=(_0x153c6e/0xfa0)['clamp'](0x0,0x1);this['item']()[_0x17afce(0x1c5)]['match'](/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x4650d6=Number(RegExp['$1'])*0.01);const _0x2e6d24=this['subject']()['traitObjects']()['concat'](this[_0x17afce(0x25d)]()['skills']()),_0x1473d0=/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x254568=_0x2e6d24[_0x17afce(0x1d2)](_0x478066=>_0x478066&&_0x478066[_0x17afce(0x1c5)][_0x17afce(0x36e)](_0x1473d0)?Number(RegExp['$1'])*0.01:0x0);_0x4650d6=_0x254568[_0x17afce(0x2e1)]((_0x3e23c3,_0x1cf05b)=>_0x3e23c3+_0x1cf05b,_0x4650d6),this[_0x17afce(0x24e)]()['note']['match'](/<(?:ATB|TPB) INSTANT>/i)&&(_0x4650d6=0xa),this[_0x17afce(0x25d)]()[_0x17afce(0x1e9)](_0x4650d6);},Game_BattlerBase[_0xd2f06f(0x1b2)][_0xd2f06f(0x28b)]=function(_0xb8900c){const _0x3d4ca0=_0xd2f06f;this['_tpbChargeTime']=_0xb8900c[_0x3d4ca0(0x1d0)](0x0,0x1);},Game_BattlerBase[_0xd2f06f(0x1b2)][_0xd2f06f(0x23a)]=function(_0xb26140){const _0x4386ee=_0xd2f06f;this[_0x4386ee(0x28b)](this['_tpbChargeTime']+_0xb26140);},Game_BattlerBase[_0xd2f06f(0x1b2)]['setAtbCastTime']=function(_0x291c84){const _0x1c440a=_0xd2f06f,_0x2ff12b=this[_0x1c440a(0x260)]();this[_0x1c440a(0x299)]=(_0x2ff12b*_0x291c84)[_0x1c440a(0x1d0)](0x0,_0x2ff12b);},Game_BattlerBase[_0xd2f06f(0x1b2)][_0xd2f06f(0x2bf)]=function(_0x5536e4){const _0x54c8d3=_0xd2f06f,_0x427884=this[_0x54c8d3(0x260)](),_0x71ee15=_0x427884*_0x5536e4;this['_tpbCastTime']=(this['_tpbCastTime']+_0x71ee15)[_0x54c8d3(0x1d0)](0x0,_0x427884);},VisuMZ['BattleSystemATB'][_0xd2f06f(0x1c2)]=Game_BattlerBase[_0xd2f06f(0x1b2)]['die'],Game_BattlerBase[_0xd2f06f(0x1b2)][_0xd2f06f(0x1f6)]=function(){const _0x340dc5=_0xd2f06f;VisuMZ['BattleSystemATB'][_0x340dc5(0x1c2)][_0x340dc5(0x1df)](this),BattleManager['isATB']()&&this[_0x340dc5(0x202)]();},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x34b)]=Game_BattlerBase[_0xd2f06f(0x1b2)][_0xd2f06f(0x1bf)],Game_BattlerBase[_0xd2f06f(0x1b2)][_0xd2f06f(0x1bf)]=function(){const _0x3c6cba=_0xd2f06f;VisuMZ['BattleSystemATB'][_0x3c6cba(0x34b)]['call'](this),BattleManager[_0x3c6cba(0x1cc)]()&&this[_0x3c6cba(0x202)]();},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x2a4)]=Game_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x2de)],Game_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x2de)]=function(_0x16f1e2){const _0x1e9e26=_0xd2f06f;BattleManager[_0x1e9e26(0x1cc)]()?this[_0x1e9e26(0x2d7)](_0x16f1e2):VisuMZ[_0x1e9e26(0x283)][_0x1e9e26(0x2a4)][_0x1e9e26(0x1df)](this,_0x16f1e2);},Game_Battler['prototype'][_0xd2f06f(0x2d7)]=function(_0x50655b){const _0x2828bb=_0xd2f06f,_0x453b12=VisuMZ['BattleSystemATB']['Settings'][_0x2828bb(0x1d8)];let _0x4d1e3b=this[_0x2828bb(0x227)]()*eval(_0x453b12['InitialGaugeJS']);const _0x2d4f28=this[_0x2828bb(0x228)]()['concat'](this[_0x2828bb(0x28d)]()),_0x289f0c=/<(?:ATB|TPB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x1458de=_0x2d4f28[_0x2828bb(0x1d2)](_0x4781e6=>_0x4781e6&&_0x4781e6['note'][_0x2828bb(0x36e)](_0x289f0c)?Number(RegExp['$1'])*0.01:0x0);_0x4d1e3b=_0x1458de[_0x2828bb(0x2e1)]((_0x4c82a8,_0x23f649)=>_0x4c82a8+_0x23f649,_0x4d1e3b),this[_0x2828bb(0x1b0)]=_0x2828bb(0x337),this['_tpbChargeTime']=(_0x50655b?0x1:_0x4d1e3b)[_0x2828bb(0x1d0)](0x0,0x1),this['isRestricted']()&&(this[_0x2828bb(0x26d)]=0x0);},Game_Battler[_0xd2f06f(0x1b2)]['isAtbChargingState']=function(){const _0x4aa60e=_0xd2f06f;return this[_0x4aa60e(0x1b0)]===_0x4aa60e(0x337);},Game_Battler[_0xd2f06f(0x1b2)]['isAtbCastingState']=function(){const _0x1fcecb=_0xd2f06f;return this[_0x1fcecb(0x1b0)]==='casting'&&this['currentAction']()&&this[_0x1fcecb(0x29c)]()[_0x1fcecb(0x24e)]()&&this[_0x1fcecb(0x29c)]()[_0x1fcecb(0x24e)]()['speed']<0x0;},Game_BattlerBase[_0xd2f06f(0x1b2)][_0xd2f06f(0x328)]=function(){const _0x471f25=_0xd2f06f;return this[_0x471f25(0x214)]()?this[_0x471f25(0x299)]/this[_0x471f25(0x260)]():0x0;},Game_Battler[_0xd2f06f(0x1b2)]['atbStopped']=function(){return!this['canMove']();},Game_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x1e9)]=function(_0x523ddd){const _0x4af227=_0xd2f06f;this[_0x4af227(0x319)]=_0x523ddd;},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x280)]=BattleManager['endBattlerActions'],BattleManager[_0xd2f06f(0x31c)]=function(_0x40dd81){const _0x5666cb=_0xd2f06f;this[_0x5666cb(0x1cc)]()&&!_0x40dd81[_0x5666cb(0x379)]()&&(_0x40dd81[_0x5666cb(0x276)]=!![]),VisuMZ[_0x5666cb(0x283)][_0x5666cb(0x280)]['call'](this,_0x40dd81),_0x40dd81[_0x5666cb(0x2eb)]()&&this[_0x5666cb(0x1cc)]()&&!_0x40dd81[_0x5666cb(0x379)]()&&(_0x40dd81[_0x5666cb(0x276)]=![]);},VisuMZ[_0xd2f06f(0x283)]['Game_Battler_clearTpbChargeTime']=Game_Battler[_0xd2f06f(0x1b2)]['clearTpbChargeTime'],Game_Battler['prototype'][_0xd2f06f(0x202)]=function(){const _0x57271b=_0xd2f06f;if(this['_onRestrictBypassAtbReset'])return;VisuMZ[_0x57271b(0x283)][_0x57271b(0x1a6)][_0x57271b(0x1df)](this),this[_0x57271b(0x26d)]+=this[_0x57271b(0x319)]||0x0;},Game_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x325)]=function(){const _0x37ca12=_0xd2f06f;if(!this[_0x37ca12(0x214)]())return;if(!this['currentAction']())return;if(!this[_0x37ca12(0x29c)]()[_0x37ca12(0x24e)]())return;if(this[_0x37ca12(0x29c)]()['item']()[_0x37ca12(0x1c5)][_0x37ca12(0x36e)](/<(?:ATB|TPB) CANNOT (?:BE INTERRUPTED|INTERRUPT)>/i))return;this['clearActions'](),this[_0x37ca12(0x202)](),this[_0x37ca12(0x299)]=0x0,this[_0x37ca12(0x1a8)]();},Game_Battler['prototype'][_0xd2f06f(0x1a8)]=function(){const _0x227205=_0xd2f06f,_0x430f7=VisuMZ[_0x227205(0x283)][_0x227205(0x1a9)][_0x227205(0x303)];if(Imported['VisuMZ_0_CoreEngine']){const _0xb23715=_0x430f7[_0x227205(0x1c4)],_0x3427b5=_0x430f7[_0x227205(0x1ab)],_0x24afa3=_0x430f7[_0x227205(0x281)];$gameTemp['requestFauxAnimation']([this],_0xb23715,_0x3427b5,_0x24afa3);}if(this['battler']()&&_0x430f7[_0x227205(0x26a)][_0x227205(0x37a)]>0x0){const _0xa08122=_0x430f7[_0x227205(0x26a)],_0x57b060={'textColor':ColorManager[_0x227205(0x2b4)](_0x430f7[_0x227205(0x217)]),'flashColor':_0x430f7['InterruptFlashColor'],'flashDuration':_0x430f7[_0x227205(0x2b7)]};this['setupTextPopup'](_0xa08122,_0x57b060);}},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x2ac)]=Game_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x263)],Game_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x263)]=function(){const _0x281019=_0xd2f06f;VisuMZ[_0x281019(0x283)][_0x281019(0x2ac)][_0x281019(0x1df)](this),BattleManager['isATB']()&&(this[_0x281019(0x299)]>=this[_0x281019(0x260)]()&&(this[_0x281019(0x1b0)]='ready'));},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x22e)]=Game_Unit[_0xd2f06f(0x1b2)][_0xd2f06f(0x2cf)],Game_Unit[_0xd2f06f(0x1b2)]['updateTpb']=function(){const _0x52ec4b=_0xd2f06f;if(BattleManager[_0x52ec4b(0x1cc)]()){if(BattleManager[_0x52ec4b(0x339)]()[_0x52ec4b(0x1ef)](_0x3dd5eb=>_0x3dd5eb&&_0x3dd5eb['isAlive']()&&_0x3dd5eb[_0x52ec4b(0x2e4)]()&&_0x3dd5eb['_tpbState']==='ready'))return;}VisuMZ['BattleSystemATB'][_0x52ec4b(0x22e)][_0x52ec4b(0x1df)](this);},VisuMZ['BattleSystemATB'][_0xd2f06f(0x200)]=Game_Battler['prototype'][_0xd2f06f(0x35d)],Game_Battler['prototype'][_0xd2f06f(0x35d)]=function(){const _0x3ac8a0=_0xd2f06f,_0x6886fb=VisuMZ['BattleSystemATB'][_0x3ac8a0(0x1a9)][_0x3ac8a0(0x1d8)],_0x2c34a6=this[_0x3ac8a0(0x35f)]();!_0x6886fb[_0x3ac8a0(0x1bc)]&&_0x2c34a6>=0x4&&(this[_0x3ac8a0(0x276)]=BattleManager['isATB']()),VisuMZ['BattleSystemATB'][_0x3ac8a0(0x200)][_0x3ac8a0(0x1df)](this),BattleManager[_0x3ac8a0(0x1cc)]()&&this[_0x3ac8a0(0x1b0)]===_0x3ac8a0(0x264)&&this[_0x3ac8a0(0x2eb)]()&&(this[_0x3ac8a0(0x373)]=!![]),this[_0x3ac8a0(0x276)]=undefined;},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x2a3)]=Game_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x35a)],Game_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x35a)]=function(){const _0x3a474b=_0xd2f06f;if(this[_0x3a474b(0x276)]&&BattleManager[_0x3a474b(0x1cc)]())return;VisuMZ['BattleSystemATB'][_0x3a474b(0x2a3)]['call'](this);},VisuMZ[_0xd2f06f(0x283)]['Game_Battler_removeState']=Game_Battler['prototype'][_0xd2f06f(0x371)],Game_Battler['prototype'][_0xd2f06f(0x371)]=function(_0x5888e6){const _0x3e46d9=_0xd2f06f,_0x44ad75=!this[_0x3e46d9(0x379)]()&&BattleManager[_0x3e46d9(0x1cc)](),_0x274d4a=this['isStateAffected'](_0x5888e6);VisuMZ[_0x3e46d9(0x283)][_0x3e46d9(0x30d)][_0x3e46d9(0x1df)](this,_0x5888e6);if(!BattleManager['isATB']())return;if(this['isEnemy']()&&_0x274d4a&&!this[_0x3e46d9(0x270)](_0x5888e6))_0x44ad75&&this[_0x3e46d9(0x379)]()&&this[_0x3e46d9(0x373)]&&(this[_0x3e46d9(0x202)](),this['clearActions'](),this[_0x3e46d9(0x299)]=0x0),this['setActionState'](_0x3e46d9(0x370));else _0x44ad75&&this['canMove']()&&this[_0x3e46d9(0x284)]()<=0x0&&(this['makeActions'](),this[_0x3e46d9(0x1b0)]=_0x3e46d9(0x337),this['_onRestrictBypassAtbReset']=undefined);},Game_Battler['prototype'][_0xd2f06f(0x2d0)]=function(){const _0x1e448f=_0xd2f06f;this['processBattleCoreJS'](_0x1e448f(0x32b)),this[_0x1e448f(0x306)]=![],this[_0x1e448f(0x28c)]++,this[_0x1e448f(0x1e6)]=0x0,this['canMakeTpbActionsAtStartTpbTurn']()&&this[_0x1e448f(0x1ad)](),this[_0x1e448f(0x252)]('PostStartTurnJS');},Game_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x265)]=function(){const _0x2ef4b4=_0xd2f06f;if(this['numActions']()!==0x0)return![];if(BattleManager[_0x2ef4b4(0x1cc)]()){if(this['isEnemy']()){if(!this[_0x2ef4b4(0x376)]())return![];}}return!![];},VisuMZ['BattleSystemATB'][_0xd2f06f(0x362)]=Game_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x2ec)],Game_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x2ec)]=function(){const _0x42fe6c=_0xd2f06f;BattleManager[_0x42fe6c(0x1cc)]()?this[_0x42fe6c(0x374)]():VisuMZ[_0x42fe6c(0x283)]['Game_Battler_applyTpbPenalty']['call'](this);},Game_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x374)]=function(){const _0x500a25=_0xd2f06f;this[_0x500a25(0x1b0)]='charging',this['_tpbChargeTime']+=VisuMZ[_0x500a25(0x283)][_0x500a25(0x1a9)][_0x500a25(0x1d8)][_0x500a25(0x361)]||0x0;},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x22a)]=Game_Battler[_0xd2f06f(0x1b2)]['tpbSpeed'],Game_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x30c)]=function(){const _0x504a42=_0xd2f06f;return BattleManager[_0x504a42(0x1cc)]()?VisuMZ[_0x504a42(0x283)][_0x504a42(0x1a9)][_0x504a42(0x1d8)][_0x504a42(0x322)]['call'](this,this):VisuMZ[_0x504a42(0x283)][_0x504a42(0x22a)][_0x504a42(0x1df)](this);},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x2d6)]=Game_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x1be)],Game_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x1be)]=function(){const _0xbe048=_0xd2f06f;return BattleManager[_0xbe048(0x1cc)]()?VisuMZ['BattleSystemATB']['Settings'][_0xbe048(0x1d8)][_0xbe048(0x33e)][_0xbe048(0x1df)](this,this):VisuMZ[_0xbe048(0x283)][_0xbe048(0x2d6)]['call'](this);},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x245)]=Game_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x227)],Game_Battler['prototype'][_0xd2f06f(0x227)]=function(){const _0x51f8e6=_0xd2f06f;return BattleManager[_0x51f8e6(0x1cc)]()?VisuMZ['BattleSystemATB'][_0x51f8e6(0x1a9)][_0x51f8e6(0x1d8)][_0x51f8e6(0x349)]['call'](this,this):VisuMZ[_0x51f8e6(0x283)][_0x51f8e6(0x245)][_0x51f8e6(0x1df)](this);},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x224)]=Game_Battler['prototype'][_0xd2f06f(0x315)],Game_Battler['prototype'][_0xd2f06f(0x315)]=function(){const _0x126987=_0xd2f06f;return BattleManager[_0x126987(0x1cc)]()?this[_0x126987(0x2f2)]():VisuMZ['BattleSystemATB'][_0x126987(0x224)][_0x126987(0x1df)](this);},Game_Battler[_0xd2f06f(0x1b2)]['atbAcceleration']=function(){const _0x3517aa=_0xd2f06f;let _0x21ff7c=VisuMZ['BattleSystemATB']['Settings'][_0x3517aa(0x1d8)][_0x3517aa(0x300)][_0x3517aa(0x1df)](this,this);if(ConfigManager&&ConfigManager[_0x3517aa(0x320)]!==undefined){const _0x51ce9e=ConfigManager[_0x3517aa(0x320)]-0x3;if(_0x51ce9e>0x0)return _0x21ff7c*(_0x51ce9e*0x2);else{if(_0x51ce9e<0x0)return _0x21ff7c*(0x1/(_0x51ce9e*-0x2));}}return _0x21ff7c;},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x1de)]=Game_Battler[_0xd2f06f(0x1b2)]['tpbRequiredCastTime'],Game_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x260)]=function(){const _0xb75612=_0xd2f06f;if(BattleManager[_0xb75612(0x1cc)]()){const _0x55acfe=this[_0xb75612(0x2ea)][_0xb75612(0x1d2)](_0x634336=>_0x634336[_0xb75612(0x24e)]());for(const _0x5e7b63 of _0x55acfe){if(!_0x5e7b63)continue;_0x5e7b63[_0xb75612(0x1ae)]=_0x5e7b63[_0xb75612(0x1ae)]??_0x5e7b63[_0xb75612(0x37d)];}let _0x12bfec=VisuMZ[_0xb75612(0x283)][_0xb75612(0x1a9)][_0xb75612(0x1d8)][_0xb75612(0x369)]['call'](this,this);for(const _0x5104d1 of _0x55acfe){if(!_0x5104d1)continue;_0x5104d1['speed']=_0x5104d1[_0xb75612(0x1ae)];}return _0x12bfec;}else return VisuMZ[_0xb75612(0x283)][_0xb75612(0x1de)][_0xb75612(0x1df)](this);},VisuMZ['BattleSystemATB'][_0xd2f06f(0x215)]=Scene_Options[_0xd2f06f(0x1b2)]['maxCommands'],Scene_Options[_0xd2f06f(0x1b2)][_0xd2f06f(0x203)]=function(){const _0x1db2a0=_0xd2f06f;let _0x88e0e9=VisuMZ[_0x1db2a0(0x283)]['Scene_Options_maxCommands'][_0x1db2a0(0x1df)](this);const _0x54ed88=VisuMZ[_0x1db2a0(0x283)][_0x1db2a0(0x1a9)];if(_0x54ed88[_0x1db2a0(0x206)][_0x1db2a0(0x266)]&&_0x54ed88[_0x1db2a0(0x206)][_0x1db2a0(0x304)]&&BattleManager[_0x1db2a0(0x1cc)]())_0x88e0e9++;return _0x88e0e9;},Sprite_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x2ee)]=function(){const _0x3cf1a1=_0xd2f06f;if(!BattleManager[_0x3cf1a1(0x1cc)]())return;if(!ConfigManager[_0x3cf1a1(0x1b5)])return;const _0xb01bfc=VisuMZ[_0x3cf1a1(0x283)][_0x3cf1a1(0x1a9)]['Gauge'],_0x5db022=new Sprite_Gauge();_0x5db022[_0x3cf1a1(0x333)]['x']=_0xb01bfc['AnchorX'],_0x5db022[_0x3cf1a1(0x333)]['y']=_0xb01bfc[_0x3cf1a1(0x291)],_0x5db022[_0x3cf1a1(0x275)]['x']=_0x5db022[_0x3cf1a1(0x275)]['y']=_0xb01bfc[_0x3cf1a1(0x272)],this[_0x3cf1a1(0x210)]=_0x5db022,this[_0x3cf1a1(0x35e)](this[_0x3cf1a1(0x210)]);},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x2a2)]=Sprite_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x2b8)],Sprite_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x2b8)]=function(_0x2570f4){const _0x1f91d3=_0xd2f06f;VisuMZ['BattleSystemATB'][_0x1f91d3(0x2a2)]['call'](this,_0x2570f4),this[_0x1f91d3(0x1f5)](_0x2570f4),this['updateAtbGaugeSpriteVisibility']();},Sprite_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x1f5)]=function(_0x102885){const _0x41f5d3=_0xd2f06f;if(!_0x102885)return;if(!this[_0x41f5d3(0x210)])return;if(_0x102885[_0x41f5d3(0x367)]()){}else{if(_0x102885['isEnemy']()){if(this[_0x41f5d3(0x1cf)]===Sprite_Enemy&&_0x102885['hasSvBattler']())return;if(this[_0x41f5d3(0x1cf)]===Sprite_SvEnemy&&!_0x102885[_0x41f5d3(0x222)]())return;}}this[_0x41f5d3(0x210)]['setup'](_0x102885,_0x41f5d3(0x334));},Sprite_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x305)]=function(){const _0x21a5b4=_0xd2f06f;if(!this[_0x21a5b4(0x210)])return;const _0x596ebd=this['_battler']&&this[_0x21a5b4(0x1e7)][_0x21a5b4(0x2e4)]()&&!this['_battler'][_0x21a5b4(0x290)]();this[_0x21a5b4(0x210)]['visible']=_0x596ebd,this[_0x21a5b4(0x207)]&&this[_0x21a5b4(0x207)][_0x21a5b4(0x210)]&&(this['_svBattlerSprite'][_0x21a5b4(0x210)][_0x21a5b4(0x235)]=_0x596ebd);},VisuMZ['BattleSystemATB'][_0xd2f06f(0x262)]=Sprite_Battler[_0xd2f06f(0x1b2)]['updateMain'],Sprite_Battler[_0xd2f06f(0x1b2)]['updateMain']=function(){const _0x3eafb4=_0xd2f06f;VisuMZ[_0x3eafb4(0x283)]['Sprite_Battler_updateMain'][_0x3eafb4(0x1df)](this),this['updateAtbGaugeSpritePosition']();},Sprite_Battler['prototype'][_0xd2f06f(0x296)]=function(){const _0x2a1b37=_0xd2f06f;if(!this['_battler'])return;if(!this[_0x2a1b37(0x210)])return;if(this[_0x2a1b37(0x1e7)]&&this[_0x2a1b37(0x1e7)]['isEnemy']()&&this[_0x2a1b37(0x1e7)][_0x2a1b37(0x222)]()){if(this[_0x2a1b37(0x1cf)]===Sprite_Enemy)return;}const _0x391f7d=VisuMZ[_0x2a1b37(0x283)][_0x2a1b37(0x1a9)]['Gauge'],_0x4541d4=this[_0x2a1b37(0x210)];let _0x39d91e=_0x391f7d[_0x2a1b37(0x1b8)];this[_0x2a1b37(0x1e7)][_0x2a1b37(0x313)]&&(_0x39d91e+=this['_battler'][_0x2a1b37(0x313)]());let _0x2fb9c7=_0x391f7d['OffsetY'];this['_battler']['battleUIOffsetY']&&(_0x2fb9c7+=this[_0x2a1b37(0x1e7)][_0x2a1b37(0x1fb)]());_0x4541d4['x']=_0x39d91e;let _0x2ee737=this[_0x2a1b37(0x2ba)];this['_battler']&&this['_battler'][_0x2a1b37(0x2eb)]()&&this[_0x2a1b37(0x1e7)]['hasSvBattler']()&&(_0x2ee737=this[_0x2a1b37(0x1e7)]['svBattlerData']()[_0x2a1b37(0x2ba)]||0x1),_0x4541d4['y']=-_0x2ee737+_0x2fb9c7,this['_battler']['isEnemy']()&&(this[_0x2a1b37(0x1e7)]['enemy']()[_0x2a1b37(0x1c5)]['match'](/<HIDE (?:ATB|TPB) GAUGE>/i)&&(_0x4541d4['visible']=![])),this[_0x2a1b37(0x25a)]()&&(_0x4541d4['y']+=_0x4541d4[_0x2a1b37(0x326)]()*_0x391f7d[_0x2a1b37(0x272)]-0x1),this[_0x2a1b37(0x275)]['x']<0x0&&(_0x4541d4[_0x2a1b37(0x275)]['x']=-Math['abs'](_0x4541d4[_0x2a1b37(0x275)]['x']));},Sprite_Battler[_0xd2f06f(0x1b2)]['checkAggroControlSystemOffsetYAdjustment']=function(){const _0x12d69b=_0xd2f06f;if(!Imported[_0x12d69b(0x20e)])return![];if(this[_0x12d69b(0x1e7)]&&this[_0x12d69b(0x1e7)][_0x12d69b(0x2eb)]())return![];const _0x571f7e=VisuMZ[_0x12d69b(0x32f)][_0x12d69b(0x1a9)][_0x12d69b(0x354)];if(!_0x571f7e['VisibleGauge'])return![];if(!ConfigManager[_0x12d69b(0x32c)])return![];const _0x4ab60c=VisuMZ[_0x12d69b(0x283)]['Settings'][_0x12d69b(0x20f)];return _0x571f7e[_0x12d69b(0x272)]===_0x4ab60c[_0x12d69b(0x272)]&&_0x571f7e[_0x12d69b(0x289)]===_0x4ab60c[_0x12d69b(0x289)]&&_0x571f7e[_0x12d69b(0x291)]===_0x4ab60c['AnchorY']&&_0x571f7e[_0x12d69b(0x1b8)]===_0x4ab60c['OffsetX']&&_0x571f7e[_0x12d69b(0x31f)]===_0x4ab60c[_0x12d69b(0x31f)]&&!![];},VisuMZ[_0xd2f06f(0x283)]['Sprite_Battler_update']=Sprite_Battler[_0xd2f06f(0x1b2)][_0xd2f06f(0x21a)],Sprite_Battler[_0xd2f06f(0x1b2)]['update']=function(){const _0x194e4e=_0xd2f06f;VisuMZ[_0x194e4e(0x283)][_0x194e4e(0x1c7)][_0x194e4e(0x1df)](this),!this[_0x194e4e(0x1e7)]&&this[_0x194e4e(0x210)]&&(this[_0x194e4e(0x210)][_0x194e4e(0x235)]=![],this[_0x194e4e(0x207)]&&(this[_0x194e4e(0x207)]['_atbGaugeSprite'][_0x194e4e(0x235)]=![]));},VisuMZ['BattleSystemATB'][_0xd2f06f(0x29f)]=Sprite_Actor['prototype'][_0xd2f06f(0x1fa)],Sprite_Actor['prototype'][_0xd2f06f(0x1fa)]=function(){const _0x170060=_0xd2f06f;VisuMZ[_0x170060(0x283)][_0x170060(0x29f)][_0x170060(0x1df)](this),this[_0x170060(0x1a5)]()&&this[_0x170060(0x2ee)]();},Sprite_Actor['prototype'][_0xd2f06f(0x1a5)]=function(){const _0x580666=_0xd2f06f;return VisuMZ[_0x580666(0x283)]['Settings']['Gauge'][_0x580666(0x2fd)];},Sprite_SvEnemy[_0xd2f06f(0x1b2)][_0xd2f06f(0x1a5)]=function(){const _0x50aede=_0xd2f06f;return VisuMZ[_0x50aede(0x283)][_0x50aede(0x1a9)]['Gauge'][_0x50aede(0x1d5)];},VisuMZ['BattleSystemATB'][_0xd2f06f(0x1ff)]=Sprite_Enemy[_0xd2f06f(0x1b2)][_0xd2f06f(0x2b9)],Sprite_Enemy[_0xd2f06f(0x1b2)][_0xd2f06f(0x2b9)]=function(){const _0xe5f6e4=_0xd2f06f;VisuMZ[_0xe5f6e4(0x283)][_0xe5f6e4(0x1a9)][_0xe5f6e4(0x20f)][_0xe5f6e4(0x1d5)]&&this[_0xe5f6e4(0x2ee)](),VisuMZ[_0xe5f6e4(0x283)][_0xe5f6e4(0x1ff)][_0xe5f6e4(0x1df)](this);},VisuMZ[_0xd2f06f(0x283)]['Sprite_Enemy_startEffect']=Sprite_Enemy[_0xd2f06f(0x1b2)][_0xd2f06f(0x2ed)],Sprite_Enemy[_0xd2f06f(0x1b2)][_0xd2f06f(0x2ed)]=function(_0x3bfd86){const _0x59c66e=_0xd2f06f;VisuMZ[_0x59c66e(0x283)][_0x59c66e(0x1bb)][_0x59c66e(0x1df)](this,_0x3bfd86),(_0x3bfd86===_0x59c66e(0x2c2)||_0x59c66e(0x244))&&this[_0x59c66e(0x305)]();},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x261)]=Game_BattlerBase[_0xd2f06f(0x1b2)][_0xd2f06f(0x2c2)],Game_BattlerBase[_0xd2f06f(0x1b2)][_0xd2f06f(0x2c2)]=function(){const _0x2fb9b7=_0xd2f06f;VisuMZ[_0x2fb9b7(0x283)][_0x2fb9b7(0x261)][_0x2fb9b7(0x1df)](this),this[_0x2fb9b7(0x2eb)]()&&BattleManager['isATB']()&&this[_0x2fb9b7(0x2c1)]()&&this[_0x2fb9b7(0x2c1)]()[_0x2fb9b7(0x305)]();},VisuMZ['BattleSystemATB'][_0xd2f06f(0x1af)]=Sprite_Gauge[_0xd2f06f(0x1b2)][_0xd2f06f(0x240)],Sprite_Gauge['prototype'][_0xd2f06f(0x240)]=function(){const _0x239890=_0xd2f06f;if(this[_0x239890(0x36b)]===_0x239890(0x334))return this[_0x239890(0x311)](0x1);return VisuMZ[_0x239890(0x283)][_0x239890(0x1af)]['call'](this);},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x1b6)]=Sprite_Gauge['prototype'][_0xd2f06f(0x273)],Sprite_Gauge[_0xd2f06f(0x1b2)][_0xd2f06f(0x273)]=function(){const _0x3423fe=_0xd2f06f;if(this[_0x3423fe(0x36b)]===_0x3423fe(0x334))return this['atbGaugeColor'](0x2);return VisuMZ[_0x3423fe(0x283)][_0x3423fe(0x1b6)][_0x3423fe(0x1df)](this);},Sprite_Gauge['prototype'][_0xd2f06f(0x311)]=function(_0xdee439){const _0x544a9e=_0xd2f06f;if(!this[_0x544a9e(0x1e7)])return ColorManager[_0x544a9e(0x1d9)]('default%1'['format'](_0xdee439));if(this[_0x544a9e(0x1e7)][_0x544a9e(0x288)]())return ColorManager['atbColor'](_0x544a9e(0x21b)[_0x544a9e(0x2dc)](_0xdee439));if(this[_0x544a9e(0x1e7)]['isAtbCastingState']())return ColorManager['atbColor'](_0x544a9e(0x24f)[_0x544a9e(0x2dc)](_0xdee439));if(this[_0x544a9e(0x2f0)]()>=0x1)return ColorManager[_0x544a9e(0x1d9)](_0x544a9e(0x204)[_0x544a9e(0x2dc)](_0xdee439));const _0x275212=VisuMZ['BattleSystemATB'][_0x544a9e(0x1a9)][_0x544a9e(0x20f)],_0x1cd998=this[_0x544a9e(0x1e7)][_0x544a9e(0x21e)](0x6)*this['_battler']['paramBuffRate'](0x6);if(_0x1cd998<=_0x275212[_0x544a9e(0x1c0)])return ColorManager[_0x544a9e(0x1d9)](_0x544a9e(0x1dd)[_0x544a9e(0x2dc)](_0xdee439));if(_0x1cd998>=_0x275212[_0x544a9e(0x1fd)])return ColorManager[_0x544a9e(0x1d9)](_0x544a9e(0x366)[_0x544a9e(0x2dc)](_0xdee439));return ColorManager[_0x544a9e(0x1d9)]('default%1'['format'](_0xdee439));},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x351)]=Sprite_Gauge[_0xd2f06f(0x1b2)][_0xd2f06f(0x1c3)],Sprite_Gauge[_0xd2f06f(0x1b2)][_0xd2f06f(0x1c3)]=function(){const _0xd6fe8c=_0xd2f06f;if(this[_0xd6fe8c(0x1e7)]&&this[_0xd6fe8c(0x36b)]===_0xd6fe8c(0x334))return this[_0xd6fe8c(0x246)]();return VisuMZ[_0xd6fe8c(0x283)][_0xd6fe8c(0x351)][_0xd6fe8c(0x1df)](this);},Sprite_Gauge[_0xd2f06f(0x1b2)][_0xd2f06f(0x246)]=function(){const _0x130afa=_0xd2f06f;return this['_battler']['isAtbCastingState']()?Math[_0x130afa(0x2aa)](this['_battler'][_0x130afa(0x299)],0x0):VisuMZ['BattleSystemATB'][_0x130afa(0x351)][_0x130afa(0x1df)](this);},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x2b3)]=Sprite_Gauge[_0xd2f06f(0x1b2)][_0xd2f06f(0x25b)],Sprite_Gauge[_0xd2f06f(0x1b2)][_0xd2f06f(0x25b)]=function(){const _0x3a3f21=_0xd2f06f;if(this[_0x3a3f21(0x1e7)]&&this[_0x3a3f21(0x36b)]===_0x3a3f21(0x334))return this['atbCurrentMaxValue']();return VisuMZ[_0x3a3f21(0x283)][_0x3a3f21(0x2b3)]['call'](this);},Sprite_Gauge[_0xd2f06f(0x1b2)][_0xd2f06f(0x2a5)]=function(){const _0xb832ae=_0xd2f06f;return this['_battler']['isAtbCastingState']()?Math[_0xb832ae(0x2aa)](this['_battler'][_0xb832ae(0x260)](),1e-9):VisuMZ['BattleSystemATB'][_0xb832ae(0x2b3)][_0xb832ae(0x1df)](this);},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x32d)]=Window_Help['prototype'][_0xd2f06f(0x35c)],Window_Help['prototype'][_0xd2f06f(0x35c)]=function(_0x16dca7){const _0x97441c=_0xd2f06f;BattleManager[_0x97441c(0x1cc)]()&&_0x16dca7&&_0x16dca7[_0x97441c(0x1c5)]&&_0x16dca7[_0x97441c(0x1c5)]['match'](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i)?this[_0x97441c(0x257)](String(RegExp['$1'])):VisuMZ[_0x97441c(0x283)][_0x97441c(0x32d)][_0x97441c(0x1df)](this,_0x16dca7);},VisuMZ['BattleSystemATB'][_0xd2f06f(0x20d)]=Window_StatusBase[_0xd2f06f(0x1b2)][_0xd2f06f(0x318)],Window_StatusBase[_0xd2f06f(0x1b2)][_0xd2f06f(0x318)]=function(_0x4b1af7,_0x383be4,_0x3b0cf0,_0x3556e0){const _0xdbbd4b=_0xd2f06f;if(!this[_0xdbbd4b(0x2a7)](_0x383be4))return;VisuMZ[_0xdbbd4b(0x283)][_0xdbbd4b(0x20d)][_0xdbbd4b(0x1df)](this,_0x4b1af7,_0x383be4,_0x3b0cf0,_0x3556e0);},Window_StatusBase[_0xd2f06f(0x1b2)]['showVisualAtbGauge']=function(_0x1984ab){const _0xf63c6b=_0xd2f06f;if(_0x1984ab!=='time')return!![];if(![_0xf63c6b(0x23d),'Window_SideviewUiBattleStatus'][_0xf63c6b(0x255)](this[_0xf63c6b(0x1cf)][_0xf63c6b(0x242)]))return![];if(!BattleManager[_0xf63c6b(0x1cc)]())return![];if(!ConfigManager[_0xf63c6b(0x1b5)])return![];return VisuMZ[_0xf63c6b(0x283)][_0xf63c6b(0x1a9)][_0xf63c6b(0x20f)][_0xf63c6b(0x20b)];},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x1e3)]=Window_Options[_0xd2f06f(0x1b2)][_0xd2f06f(0x363)],Window_Options[_0xd2f06f(0x1b2)]['addGeneralOptions']=function(){const _0x4ef5aa=_0xd2f06f;VisuMZ['BattleSystemATB'][_0x4ef5aa(0x1e3)][_0x4ef5aa(0x1df)](this),this[_0x4ef5aa(0x1aa)]();},Window_Options[_0xd2f06f(0x1b2)][_0xd2f06f(0x1aa)]=function(){const _0x41e9b8=_0xd2f06f;if(!BattleManager[_0x41e9b8(0x1cc)]())return;VisuMZ['BattleSystemATB'][_0x41e9b8(0x1a9)][_0x41e9b8(0x206)][_0x41e9b8(0x266)]&&this[_0x41e9b8(0x1eb)]();},Window_Options[_0xd2f06f(0x1b2)][_0xd2f06f(0x1eb)]=function(){const _0x1ca556=_0xd2f06f,_0x5d2f64=TextManager[_0x1ca556(0x1b5)],_0xfb194d=_0x1ca556(0x1b5);this[_0x1ca556(0x271)](_0x5d2f64,_0xfb194d);},Game_BattlerBase[_0xd2f06f(0x1b2)][_0xd2f06f(0x1b3)]=function(){const _0x12d074=_0xd2f06f;delete this['_fieldAtbGaugeGraphicType'],delete this[_0x12d074(0x310)],delete this[_0x12d074(0x2d4)],delete this['_fieldAtbGaugeIconIndex'];},Game_BattlerBase[_0xd2f06f(0x1b2)][_0xd2f06f(0x359)]=function(){const _0x43fcfd=_0xd2f06f;return this[_0x43fcfd(0x307)]===undefined&&(this['_fieldAtbGaugeGraphicType']=this[_0x43fcfd(0x27b)]()),this['_fieldAtbGaugeGraphicType'];},Game_BattlerBase['prototype']['createFieldAtbGraphicType']=function(){const _0xe3634d=_0xd2f06f;return Sprite_FieldGaugeATB[_0xe3634d(0x1a9)]['EnemyBattlerType'];},Game_BattlerBase[_0xd2f06f(0x1b2)]['fieldAtbGraphicFaceName']=function(){const _0x260e71=_0xd2f06f;return this[_0x260e71(0x310)]===undefined&&(this[_0x260e71(0x310)]=this[_0x260e71(0x267)]()),this[_0x260e71(0x310)];},Game_BattlerBase[_0xd2f06f(0x1b2)][_0xd2f06f(0x267)]=function(){const _0x59ee40=_0xd2f06f;return Sprite_FieldGaugeATB[_0x59ee40(0x1a9)][_0x59ee40(0x321)];},Game_BattlerBase[_0xd2f06f(0x1b2)][_0xd2f06f(0x2cc)]=function(){const _0x41c2f6=_0xd2f06f;return this[_0x41c2f6(0x2d4)]===undefined&&(this['_fieldAtbGaugeFaceIndex']=this[_0x41c2f6(0x338)]()),this[_0x41c2f6(0x2d4)];},Game_BattlerBase['prototype']['createFieldAtbGraphicFaceIndex']=function(){const _0x5dfdc3=_0xd2f06f;return Sprite_FieldGaugeATB[_0x5dfdc3(0x1a9)][_0x5dfdc3(0x36d)];},Game_BattlerBase[_0xd2f06f(0x1b2)]['fieldAtbGraphicIconIndex']=function(){const _0x3c369f=_0xd2f06f;return this['_fieldAtbGaugeIconIndex']===undefined&&(this[_0x3c369f(0x22b)]=this['createFieldAtbGraphicIconIndex']()),this[_0x3c369f(0x22b)];},Game_BattlerBase[_0xd2f06f(0x1b2)]['createFieldAtbGraphicIconIndex']=function(){const _0x1e644f=_0xd2f06f;return Sprite_FieldGaugeATB['Settings'][_0x1e644f(0x1db)];},Game_BattlerBase[_0xd2f06f(0x1b2)]['setAtbGraphicIconIndex']=function(_0x221f10){const _0x309251=_0xd2f06f;this[_0x309251(0x22b)]=_0x221f10;},Game_Actor[_0xd2f06f(0x1b2)][_0xd2f06f(0x27b)]=function(){const _0x415b34=_0xd2f06f,_0x11963e=this['actor']()[_0x415b34(0x1c5)];if(_0x11963e[_0x415b34(0x36e)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x415b34(0x2a8);else{if(_0x11963e['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x415b34(0x22d);}return Sprite_FieldGaugeATB['Settings']['ActorBattlerType'];},Game_Actor[_0xd2f06f(0x1b2)][_0xd2f06f(0x267)]=function(){const _0xdfd75e=_0xd2f06f,_0x46875d=this['actor']()[_0xdfd75e(0x1c5)];if(_0x46875d[_0xdfd75e(0x36e)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0xdfd75e(0x285)]();},Game_Actor[_0xd2f06f(0x1b2)]['createFieldAtbGraphicFaceIndex']=function(){const _0x410fcc=_0xd2f06f,_0x3531e5=this[_0x410fcc(0x26f)]()[_0x410fcc(0x1c5)];if(_0x3531e5[_0x410fcc(0x36e)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this['faceIndex']();},Game_Actor[_0xd2f06f(0x1b2)]['createFieldAtbGraphicIconIndex']=function(){const _0x43d7d0=_0xd2f06f,_0x1cc47c=this[_0x43d7d0(0x26f)]()[_0x43d7d0(0x1c5)];if(_0x1cc47c['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB[_0x43d7d0(0x1a9)][_0x43d7d0(0x274)];},Game_Enemy[_0xd2f06f(0x1b2)]['createFieldAtbGraphicType']=function(){const _0x22737d=_0xd2f06f,_0x54e5d1=this[_0x22737d(0x29e)]()[_0x22737d(0x1c5)];if(_0x54e5d1[_0x22737d(0x36e)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x22737d(0x2a8);else{if(_0x54e5d1['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x22737d(0x22d);}return Sprite_FieldGaugeATB[_0x22737d(0x1a9)][_0x22737d(0x1da)];},Game_Enemy[_0xd2f06f(0x1b2)][_0xd2f06f(0x267)]=function(){const _0x29aecf=_0xd2f06f,_0x1c47b6=this[_0x29aecf(0x29e)]()['note'];if(_0x1c47b6[_0x29aecf(0x36e)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Sprite_FieldGaugeATB[_0x29aecf(0x1a9)]['EnemyBattlerFaceName'];},Game_Enemy[_0xd2f06f(0x1b2)][_0xd2f06f(0x338)]=function(){const _0x52c7dd=_0xd2f06f,_0x28cb7b=this['enemy']()['note'];if(_0x28cb7b[_0x52c7dd(0x36e)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Sprite_FieldGaugeATB[_0x52c7dd(0x1a9)][_0x52c7dd(0x36d)];},Game_Enemy[_0xd2f06f(0x1b2)][_0xd2f06f(0x241)]=function(){const _0x23617d=_0xd2f06f,_0x5188d3=this[_0x23617d(0x29e)]()[_0x23617d(0x1c5)];if(_0x5188d3[_0x23617d(0x36e)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB[_0x23617d(0x1a9)][_0x23617d(0x1db)];},VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x27d)]=Scene_Battle['prototype'][_0xd2f06f(0x249)],Scene_Battle[_0xd2f06f(0x1b2)][_0xd2f06f(0x249)]=function(){const _0x3ec6d0=_0xd2f06f;this[_0x3ec6d0(0x358)](),VisuMZ['BattleSystemATB'][_0x3ec6d0(0x27d)][_0x3ec6d0(0x1df)](this),this[_0x3ec6d0(0x2ad)]();},Scene_Battle[_0xd2f06f(0x1b2)][_0xd2f06f(0x358)]=function(){const _0x2409b3=_0xd2f06f;if(!BattleManager[_0x2409b3(0x1cc)]())return;if(!Sprite_FieldGaugeATB[_0x2409b3(0x1a9)][_0x2409b3(0x37b)])return;if(!ConfigManager['visualAtbGauge'])return;this[_0x2409b3(0x356)]=new Window_Base(new Rectangle(0x0,0x0,0x0,0x0));const _0x431330=this[_0x2409b3(0x368)](this['_windowLayer']);this['addChildAt'](this[_0x2409b3(0x356)],_0x431330);},Scene_Battle[_0xd2f06f(0x1b2)][_0xd2f06f(0x2ad)]=function(){const _0x4d2d93=_0xd2f06f;if(!BattleManager[_0x4d2d93(0x1cc)]())return;if(!Sprite_FieldGaugeATB[_0x4d2d93(0x1a9)][_0x4d2d93(0x37b)])return;if(!ConfigManager['visualAtbGauge'])return;this[_0x4d2d93(0x2ab)]=new Sprite_FieldGaugeATB(),this[_0x4d2d93(0x356)][_0x4d2d93(0x35e)](this['_fieldGaugeATB']);};function _0x47e9(_0x54f37f,_0x56cfb7){const _0x2c99d9=_0x2c99();return _0x47e9=function(_0x47e9f9,_0x18491b){_0x47e9f9=_0x47e9f9-0x1a4;let _0xe1cc65=_0x2c99d9[_0x47e9f9];return _0xe1cc65;},_0x47e9(_0x54f37f,_0x56cfb7);}function Sprite_FieldGaugeATB(){const _0x24fe8=_0xd2f06f;this[_0x24fe8(0x251)](...arguments);}Sprite_FieldGaugeATB[_0xd2f06f(0x1b2)]=Object[_0xd2f06f(0x2e0)](Sprite[_0xd2f06f(0x1b2)]),Sprite_FieldGaugeATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x1cf)]=Sprite_FieldGaugeATB,Sprite_FieldGaugeATB['Settings']=JsonEx[_0xd2f06f(0x2b2)](VisuMZ[_0xd2f06f(0x283)][_0xd2f06f(0x1a9)][_0xd2f06f(0x1b1)]),Sprite_FieldGaugeATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x251)]=function(){const _0x520a77=_0xd2f06f;Sprite[_0x520a77(0x1b2)][_0x520a77(0x251)]['call'](this),this[_0x520a77(0x34f)](),this[_0x520a77(0x1c6)](),this[_0x520a77(0x2d9)]();},Sprite_FieldGaugeATB['prototype'][_0xd2f06f(0x34f)]=function(){const _0x1475c1=_0xd2f06f;this['anchor']['x']=0.5,this[_0x1475c1(0x333)]['y']=0.5;},Sprite_FieldGaugeATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x2df)]=function(){const _0x444955=_0xd2f06f;if(this[_0x444955(0x1fc)]!==undefined)return this[_0x444955(0x1fc)];const _0x29f15f=Sprite_FieldGaugeATB[_0x444955(0x1a9)][_0x444955(0x2a9)];return this['_horz']=['top','bottom'][_0x444955(0x255)](_0x29f15f),this[_0x444955(0x1fc)];},Sprite_FieldGaugeATB[_0xd2f06f(0x1b2)]['setHomeLocation']=function(){const _0x364f9e=_0xd2f06f,_0x271990=Sprite_FieldGaugeATB['Settings'][_0x364f9e(0x2a9)][_0x364f9e(0x21c)]()[_0x364f9e(0x33d)](),_0x55fe43=Window_Base[_0x364f9e(0x1b2)][_0x364f9e(0x26c)](),_0x513a23=SceneManager[_0x364f9e(0x1e8)]['_statusWindow'][_0x364f9e(0x2ba)]+Math['round'](_0x55fe43*0.5);this[_0x364f9e(0x317)]=0x0,this['_homeY']=0x0;switch(_0x271990){case _0x364f9e(0x24a):this['_homeX']=Math[_0x364f9e(0x2be)](Graphics[_0x364f9e(0x1ac)]*0.5),this['_homeY']=0x60;break;case'bottom':this[_0x364f9e(0x317)]=Math[_0x364f9e(0x2be)](Graphics[_0x364f9e(0x1ac)]*0.5),this[_0x364f9e(0x2bc)]=Graphics[_0x364f9e(0x1f9)]-_0x513a23;break;case _0x364f9e(0x1f0):this[_0x364f9e(0x317)]=0x50,this['_homeY']=Math[_0x364f9e(0x2be)]((Graphics[_0x364f9e(0x1f9)]-_0x513a23)/0x2);break;case'right':this[_0x364f9e(0x317)]=Graphics[_0x364f9e(0x1ac)]-0x50,this[_0x364f9e(0x2bc)]=Math[_0x364f9e(0x2be)]((Graphics[_0x364f9e(0x1f9)]-_0x513a23)/0x2);break;}this[_0x364f9e(0x317)]+=Sprite_FieldGaugeATB[_0x364f9e(0x1a9)]['DisplayOffsetX']||0x0,this[_0x364f9e(0x2bc)]+=Sprite_FieldGaugeATB[_0x364f9e(0x1a9)][_0x364f9e(0x238)]||0x0,this['x']=this['_homeX'],this['y']=this[_0x364f9e(0x2bc)];},Sprite_FieldGaugeATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x2d9)]=function(){const _0xb00e58=_0xd2f06f;this[_0xb00e58(0x336)](),this[_0xb00e58(0x2b6)](),this[_0xb00e58(0x372)]();},Sprite_FieldGaugeATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x336)]=function(){const _0x1dd59d=_0xd2f06f;this[_0x1dd59d(0x231)]=new Sprite(),this['_skinSprite'][_0x1dd59d(0x333)]['x']=0.5,this[_0x1dd59d(0x231)][_0x1dd59d(0x333)]['y']=0.5,this[_0x1dd59d(0x35e)](this[_0x1dd59d(0x231)]);const _0x14d857=Sprite_FieldGaugeATB[_0x1dd59d(0x1a9)][_0x1dd59d(0x1a7)];if(_0x14d857)this[_0x1dd59d(0x231)]['bitmap']=ImageManager[_0x1dd59d(0x2d1)](_0x14d857);},Sprite_FieldGaugeATB['prototype'][_0xd2f06f(0x2b6)]=function(){const _0x43dcd7=_0xd2f06f;this[_0x43dcd7(0x33c)]=new Sprite(),this[_0x43dcd7(0x35e)](this[_0x43dcd7(0x33c)]),this[_0x43dcd7(0x357)]();},Sprite_FieldGaugeATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x357)]=function(){const _0xa878d1=_0xd2f06f,_0x32f211=Sprite_FieldGaugeATB[_0xa878d1(0x1a9)],_0x45c473=this[_0xa878d1(0x2df)](),_0x241a7f=_0x45c473?_0x32f211[_0xa878d1(0x213)]:_0x32f211[_0xa878d1(0x323)],_0x3cf25a=_0x45c473?_0x32f211[_0xa878d1(0x323)]:_0x32f211[_0xa878d1(0x1cd)];this[_0xa878d1(0x33c)][_0xa878d1(0x28e)]=new Bitmap(_0x241a7f,_0x3cf25a),this[_0xa878d1(0x348)](),this[_0xa878d1(0x33c)]['x']=Math[_0xa878d1(0x2c3)](_0x241a7f/-0x2),this[_0xa878d1(0x33c)]['y']=Math[_0xa878d1(0x2c3)](_0x3cf25a/-0x2);},Sprite_FieldGaugeATB['prototype'][_0xd2f06f(0x348)]=function(){const _0x3321f5=_0xd2f06f;if(!Sprite_FieldGaugeATB[_0x3321f5(0x1a9)]['DrawGauge'])return;const _0x36ca29=Sprite_FieldGaugeATB[_0x3321f5(0x1a9)],_0x5ebb2a=this[_0x3321f5(0x33c)][_0x3321f5(0x28e)],_0x355a76=_0x5ebb2a[_0x3321f5(0x2fe)],_0x37b462=_0x5ebb2a['height'],_0x572ca4=ColorManager[_0x3321f5(0x2d3)](),_0x114394=ColorManager[_0x3321f5(0x1f2)](),_0x22c4db=ColorManager[_0x3321f5(0x33a)](),_0x26dbf5=ColorManager[_0x3321f5(0x1d9)](_0x3321f5(0x365)),_0x102c33=ColorManager[_0x3321f5(0x1d9)](_0x3321f5(0x258)),_0x4047e2=this[_0x3321f5(0x2df)](),_0x9348d6=_0x36ca29['GaugeDirection'],_0xcecc0f=_0x36ca29[_0x3321f5(0x259)][_0x3321f5(0x1d0)](0x0,0x1),_0x255706=Math[_0x3321f5(0x2c3)](((_0x4047e2?_0x355a76:_0x37b462)-0x2)*_0xcecc0f);_0x5ebb2a[_0x3321f5(0x1e4)](0x0,0x0,_0x355a76,_0x37b462,_0x572ca4);let _0x2ce608=0x0,_0x34bbd4=0x0,_0x379ceb=0x0,_0x4628ea=0x0;if(_0x4047e2&&_0x9348d6)_0x2ce608=_0x255706-0x1,_0x379ceb=_0x355a76-0x3-_0x2ce608,_0x5ebb2a[_0x3321f5(0x218)](0x1,0x1,_0x2ce608,_0x37b462-0x2,_0x114394,_0x22c4db,![]),_0x5ebb2a[_0x3321f5(0x218)](0x2+_0x2ce608,0x1,_0x379ceb,_0x37b462-0x2,_0x26dbf5,_0x102c33,![]);else{if(_0x4047e2&&!_0x9348d6)_0x2ce608=_0x255706-0x1,_0x379ceb=_0x355a76-0x3-_0x2ce608,_0x5ebb2a['gradientFillRect'](0x2+_0x379ceb,0x1,_0x2ce608,_0x37b462-0x2,_0x114394,_0x22c4db,![]),_0x5ebb2a['gradientFillRect'](0x1,0x1,_0x379ceb,_0x37b462-0x2,_0x26dbf5,_0x102c33,![]);else{if(!_0x4047e2&&_0x9348d6)_0x34bbd4=_0x255706-0x1,_0x4628ea=_0x37b462-0x3-_0x34bbd4,_0x5ebb2a['gradientFillRect'](0x1,0x1,_0x355a76-0x2,_0x34bbd4,_0x114394,_0x22c4db,!![]),_0x5ebb2a['gradientFillRect'](0x1,0x2+_0x34bbd4,_0x355a76-0x2,_0x4628ea,_0x26dbf5,_0x102c33,!![]);else!_0x4047e2&&!_0x9348d6&&(_0x34bbd4=_0x255706-0x1,_0x4628ea=_0x37b462-0x3-_0x34bbd4,_0x5ebb2a[_0x3321f5(0x218)](0x1,0x2+_0x4628ea,_0x355a76-0x2,_0x34bbd4,_0x114394,_0x22c4db,!![]),_0x5ebb2a[_0x3321f5(0x218)](0x1,0x1,_0x355a76-0x2,_0x4628ea,_0x26dbf5,_0x102c33,!![]));}}},Sprite_FieldGaugeATB['prototype'][_0xd2f06f(0x372)]=function(){const _0x51c888=_0xd2f06f;this[_0x51c888(0x239)]&&this[_0x51c888(0x33c)][_0x51c888(0x34a)](this[_0x51c888(0x239)]),this['_battlerContainer']=new Sprite(),this[_0x51c888(0x33c)][_0x51c888(0x35e)](this['_battlerContainer']),this[_0x51c888(0x2dd)]();},Sprite_FieldGaugeATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x2dd)]=function(){const _0x39a44f=_0xd2f06f;this[_0x39a44f(0x2bd)](),this['createActorSprites']();},Sprite_FieldGaugeATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x2bd)]=function(){const _0x1be40e=_0xd2f06f,_0x5e3a1e=$gameTroop[_0x1be40e(0x2b1)](),_0x43b407=_0x5e3a1e[_0x1be40e(0x37a)];for(let _0x177a8e=0x0;_0x177a8e<_0x43b407;_0x177a8e++){this[_0x1be40e(0x248)](_0x177a8e,$gameTroop);}},Sprite_FieldGaugeATB['prototype'][_0xd2f06f(0x2b0)]=function(){const _0xf793e=_0xd2f06f,_0x181703=$gameParty[_0xf793e(0x254)]();for(let _0x527372=0x0;_0x527372<_0x181703;_0x527372++){this[_0xf793e(0x248)](_0x527372,$gameParty);}},Sprite_FieldGaugeATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x248)]=function(_0x1c8e9e,_0x10564e){const _0x347d42=_0xd2f06f,_0x422a25=new Sprite_FieldMarkerATB(_0x1c8e9e,_0x10564e,this[_0x347d42(0x33c)]);this[_0x347d42(0x239)][_0x347d42(0x35e)](_0x422a25);},Sprite_FieldGaugeATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x21a)]=function(){const _0x2f4988=_0xd2f06f;Sprite[_0x2f4988(0x1b2)]['update'][_0x2f4988(0x1df)](this),this[_0x2f4988(0x346)](),this[_0x2f4988(0x312)](),this[_0x2f4988(0x2ca)]();},Sprite_FieldGaugeATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x346)]=function(){const _0x1d570f=_0xd2f06f,_0x4fb0b7=Sprite_FieldGaugeATB[_0x1d570f(0x1a9)];if(_0x4fb0b7[_0x1d570f(0x2a9)]!==_0x1d570f(0x24a))return;if(!_0x4fb0b7['RepositionTopForHelp'])return;const _0x393ca0=SceneManager[_0x1d570f(0x1e8)]['_helpWindow'];if(!_0x393ca0)return;_0x393ca0['visible']?(this['x']=this[_0x1d570f(0x317)]+(_0x4fb0b7[_0x1d570f(0x30f)]||0x0),this['y']=this[_0x1d570f(0x2bc)]+(_0x4fb0b7['RepositionTopHelpY']||0x0)):(this['x']=this[_0x1d570f(0x317)],this['y']=this[_0x1d570f(0x2bc)]);const _0x4aa5f2=SceneManager['_scene'][_0x1d570f(0x34c)];this['x']+=_0x4aa5f2['x'],this['y']+=_0x4aa5f2['y'];},Sprite_FieldGaugeATB[_0xd2f06f(0x1b2)]['updateBattleContainerOrder']=function(){const _0x2c798d=_0xd2f06f;if(!this[_0x2c798d(0x239)])return;const _0x135103=this[_0x2c798d(0x239)][_0x2c798d(0x243)];if(!_0x135103)return;_0x135103['sort'](this['compareBattlerSprites'][_0x2c798d(0x25f)](this));},Sprite_FieldGaugeATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x2ff)]=function(_0x1b4d35,_0x4c8f78){const _0x1253ca=_0xd2f06f,_0x586585=this[_0x1253ca(0x2df)](),_0x19a361=Sprite_FieldGaugeATB[_0x1253ca(0x1a9)][_0x1253ca(0x27a)];if(_0x586585&&_0x19a361)return _0x1b4d35['x']-_0x4c8f78['x'];else{if(_0x586585&&!_0x19a361)return _0x4c8f78['x']-_0x1b4d35['x'];else{if(!_0x586585&&_0x19a361)return _0x1b4d35['y']-_0x4c8f78['y'];else{if(!_0x586585&&!_0x19a361)return _0x4c8f78['y']-_0x1b4d35['y'];}}}},Sprite_FieldGaugeATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x2ca)]=function(){const _0x25c654=_0xd2f06f;this[_0x25c654(0x235)]=$gameSystem[_0x25c654(0x25c)]();};function Sprite_FieldMarkerATB(){const _0x32d3a1=_0xd2f06f;this[_0x32d3a1(0x251)](...arguments);}Sprite_FieldMarkerATB[_0xd2f06f(0x1b2)]=Object['create'](Sprite_Clickable[_0xd2f06f(0x1b2)]),Sprite_FieldMarkerATB['prototype'][_0xd2f06f(0x1cf)]=Sprite_FieldMarkerATB,Sprite_FieldMarkerATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x251)]=function(_0x250758,_0x18a7c2,_0x2d9180){const _0x1e80e8=_0xd2f06f;this[_0x1e80e8(0x27c)]=_0x250758,this[_0x1e80e8(0x1b9)]=_0x18a7c2,this[_0x1e80e8(0x33c)]=_0x2d9180,Sprite_Clickable[_0x1e80e8(0x1b2)][_0x1e80e8(0x251)][_0x1e80e8(0x1df)](this),this[_0x1e80e8(0x34f)](),this[_0x1e80e8(0x2d9)](),this[_0x1e80e8(0x2e9)]=this['targetOpacity']();},Sprite_FieldMarkerATB['prototype']['initMembers']=function(){const _0x829303=_0xd2f06f;this[_0x829303(0x333)]['x']=0.5,this[_0x829303(0x333)]['y']=0.5;},Sprite_FieldMarkerATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x2d9)]=function(){const _0x55c4fc=_0xd2f06f;this[_0x55c4fc(0x211)](),this['createGraphicSprite'](),this[_0x55c4fc(0x1a4)](),this[_0x55c4fc(0x34e)](),this[_0x55c4fc(0x2d2)](),this[_0x55c4fc(0x1f7)](!![]);},Sprite_FieldMarkerATB[_0xd2f06f(0x1b2)]['createBackgroundSprite']=function(){const _0x4bef9a=_0xd2f06f;if(!Sprite_FieldGaugeATB[_0x4bef9a(0x1a9)]['ShowMarkerBg'])return;const _0x23d3cf=Sprite_FieldGaugeATB[_0x4bef9a(0x1a9)],_0x5cdd7e=this[_0x4bef9a(0x1b9)]===$gameParty?_0x4bef9a(0x343):_0x4bef9a(0x212),_0x5c01d8=_0x4bef9a(0x23c)['format'](_0x5cdd7e),_0x1c81da=new Sprite();_0x1c81da[_0x4bef9a(0x333)]['x']=this[_0x4bef9a(0x333)]['x'],_0x1c81da[_0x4bef9a(0x333)]['y']=this[_0x4bef9a(0x333)]['y'];if(_0x23d3cf[_0x5c01d8])_0x1c81da[_0x4bef9a(0x28e)]=ImageManager[_0x4bef9a(0x2d1)](_0x23d3cf[_0x5c01d8]);else{const _0x3cdb96=_0x23d3cf[_0x4bef9a(0x2e8)];_0x1c81da[_0x4bef9a(0x28e)]=new Bitmap(_0x3cdb96,_0x3cdb96);const _0x1a3d1b=ColorManager['getColor'](_0x23d3cf[_0x4bef9a(0x209)['format'](_0x5cdd7e)]),_0x4a432b=ColorManager[_0x4bef9a(0x2b4)](_0x23d3cf['%1BgColor2'[_0x4bef9a(0x2dc)](_0x5cdd7e)]);_0x1c81da[_0x4bef9a(0x28e)][_0x4bef9a(0x218)](0x0,0x0,_0x3cdb96,_0x3cdb96,_0x1a3d1b,_0x4a432b,!![]);}this[_0x4bef9a(0x32e)]=_0x1c81da,this[_0x4bef9a(0x35e)](this[_0x4bef9a(0x32e)]),this['width']=this[_0x4bef9a(0x32e)][_0x4bef9a(0x2fe)],this[_0x4bef9a(0x2ba)]=this[_0x4bef9a(0x32e)][_0x4bef9a(0x2ba)];},Sprite_FieldMarkerATB['prototype'][_0xd2f06f(0x2cb)]=function(){const _0x270005=_0xd2f06f,_0x1dff33=new Sprite();_0x1dff33[_0x270005(0x333)]['x']=this[_0x270005(0x333)]['x'],_0x1dff33[_0x270005(0x333)]['y']=this[_0x270005(0x333)]['y'],this[_0x270005(0x335)]=_0x1dff33,this['addChild'](this[_0x270005(0x335)]),this[_0x270005(0x26e)]();},Sprite_FieldMarkerATB['prototype'][_0xd2f06f(0x1a4)]=function(){const _0xecc882=_0xd2f06f;if(!Sprite_FieldGaugeATB[_0xecc882(0x1a9)]['ShowMarkerBorder'])return;const _0x3a9524=Sprite_FieldGaugeATB[_0xecc882(0x1a9)],_0x175257=this[_0xecc882(0x1b9)]===$gameParty?_0xecc882(0x343):'Enemy',_0x1cb406=_0xecc882(0x2f4)[_0xecc882(0x2dc)](_0x175257),_0x103274=new Sprite();_0x103274[_0xecc882(0x333)]['x']=this[_0xecc882(0x333)]['x'],_0x103274['anchor']['y']=this[_0xecc882(0x333)]['y'];if(_0x3a9524[_0x1cb406])_0x103274[_0xecc882(0x28e)]=ImageManager[_0xecc882(0x2d1)](_0x3a9524[_0x1cb406]);else{let _0x21ab43=_0x3a9524['MarkerSize'],_0x51fd2d=_0x3a9524['BorderThickness'];_0x103274[_0xecc882(0x28e)]=new Bitmap(_0x21ab43,_0x21ab43);const _0x150313='#000000',_0x31c647=ColorManager[_0xecc882(0x2b4)](_0x3a9524[_0xecc882(0x21f)[_0xecc882(0x2dc)](_0x175257)]);_0x103274['bitmap'][_0xecc882(0x1e4)](0x0,0x0,_0x21ab43,_0x21ab43,_0x150313),_0x21ab43-=0x2,_0x103274[_0xecc882(0x28e)][_0xecc882(0x1e4)](0x1,0x1,_0x21ab43,_0x21ab43,_0x31c647),_0x21ab43-=_0x51fd2d*0x2,_0x103274[_0xecc882(0x28e)][_0xecc882(0x1e4)](0x1+_0x51fd2d,0x1+_0x51fd2d,_0x21ab43,_0x21ab43,_0x150313),_0x21ab43-=0x2,_0x51fd2d+=0x1,_0x103274['bitmap']['clearRect'](0x1+_0x51fd2d,0x1+_0x51fd2d,_0x21ab43,_0x21ab43);}this['_backgroundSprite']=_0x103274,this[_0xecc882(0x35e)](this[_0xecc882(0x32e)]);},Sprite_FieldMarkerATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x34e)]=function(){const _0x1efdec=_0xd2f06f,_0x36c4e1=Sprite_FieldGaugeATB[_0x1efdec(0x1a9)];if(!_0x36c4e1[_0x1efdec(0x30b)])return;if(this[_0x1efdec(0x1b9)]===$gameParty)return;const _0x419217=_0x36c4e1[_0x1efdec(0x2e8)],_0x52a058=new Sprite();_0x52a058[_0x1efdec(0x333)]['x']=this[_0x1efdec(0x333)]['x'],_0x52a058[_0x1efdec(0x333)]['y']=this[_0x1efdec(0x333)]['y'],_0x52a058[_0x1efdec(0x28e)]=new Bitmap(_0x419217,_0x419217),this[_0x1efdec(0x2e3)]=_0x52a058,this[_0x1efdec(0x35e)](this['_letterSprite']);},Sprite_FieldMarkerATB['prototype'][_0xd2f06f(0x2d2)]=function(){const _0x181bab=_0xd2f06f,_0x80113f=Sprite_FieldGaugeATB['Settings'];if(!_0x80113f[_0x181bab(0x2f6)])return;const _0x49b7dd=new Sprite();_0x49b7dd[_0x181bab(0x333)]['x']=this[_0x181bab(0x333)]['x'],_0x49b7dd[_0x181bab(0x333)]['y']=this[_0x181bab(0x333)]['y'],this[_0x181bab(0x329)](_0x49b7dd),this['_arrowSprite']=_0x49b7dd,this[_0x181bab(0x35e)](this[_0x181bab(0x2f7)]);},Sprite_FieldMarkerATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x329)]=function(_0x1d6f33){const _0x11add0=_0xd2f06f,_0x4f95ea=Sprite_FieldGaugeATB['Settings'],_0x349a08=_0x4f95ea[_0x11add0(0x2e8)],_0x4f5c79=Math[_0x11add0(0x2be)](_0x349a08/0x2),_0x1bbaf4=this[_0x11add0(0x2df)](),_0x55d14b=this[_0x11add0(0x1b9)]===$gameParty?_0x11add0(0x343):'Enemy',_0x831311=_0x4f95ea['%1Side'['format'](_0x55d14b)];_0x1d6f33['bitmap']=ImageManager['loadSystem'](_0x4f95ea[_0x11add0(0x2fc)]);const _0x47dc55=0x18,_0x2acf6d=_0x47dc55/0x2,_0x12247c=0x60+_0x47dc55,_0x454821=0x0+_0x47dc55;if(_0x1bbaf4&&_0x831311)_0x1d6f33[_0x11add0(0x278)](_0x12247c+_0x2acf6d,_0x454821+_0x2acf6d+_0x47dc55,_0x47dc55,_0x2acf6d),_0x1d6f33['y']+=_0x4f5c79,_0x1d6f33['anchor']['y']=0x0;else{if(_0x1bbaf4&&!_0x831311)_0x1d6f33[_0x11add0(0x278)](_0x12247c+_0x2acf6d,_0x454821,_0x47dc55,_0x2acf6d),_0x1d6f33['y']-=_0x4f5c79,_0x1d6f33['anchor']['y']=0x1;else{if(!_0x1bbaf4&&_0x831311)_0x1d6f33[_0x11add0(0x278)](_0x12247c,_0x454821+_0x2acf6d,_0x2acf6d,_0x47dc55),_0x1d6f33['x']-=Math[_0x11add0(0x2c3)](_0x4f5c79*1.75),_0x1d6f33[_0x11add0(0x333)]['x']=0x0;else!_0x1bbaf4&&!_0x831311&&(_0x1d6f33[_0x11add0(0x278)](_0x12247c+_0x47dc55+_0x2acf6d,_0x454821+_0x2acf6d,_0x2acf6d,_0x47dc55),_0x1d6f33['x']+=Math[_0x11add0(0x2c3)](_0x4f5c79*1.75),_0x1d6f33[_0x11add0(0x333)]['x']=0x1);}}},Sprite_FieldMarkerATB['prototype']['battler']=function(){const _0x4ebe84=_0xd2f06f;return this[_0x4ebe84(0x1b9)]===$gameParty?$gameParty[_0x4ebe84(0x253)]()[this[_0x4ebe84(0x27c)]]:$gameTroop[_0x4ebe84(0x2b1)]()[this[_0x4ebe84(0x27c)]];},Sprite_FieldMarkerATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x21a)]=function(){const _0x186faf=_0xd2f06f;Sprite_Clickable[_0x186faf(0x1b2)]['update'][_0x186faf(0x1df)](this),this[_0x186faf(0x1e2)](),this['updatePositionOffset'](),this[_0x186faf(0x1f7)](),this[_0x186faf(0x2ae)](),this[_0x186faf(0x223)](),this[_0x186faf(0x256)](),this['updateSelectionEffect']();},Sprite_FieldMarkerATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x1e2)]=function(){const _0x185538=_0xd2f06f,_0x11cd70=this[_0x185538(0x375)](),_0x18839c=Sprite_FieldGaugeATB['Settings'][_0x185538(0x342)];if(this['opacity']>_0x11cd70)this['opacity']=Math['max'](_0x11cd70,this[_0x185538(0x2e9)]-_0x18839c);else this[_0x185538(0x2e9)]<_0x11cd70&&(this[_0x185538(0x2e9)]=Math[_0x185538(0x29b)](_0x11cd70,this[_0x185538(0x2e9)]+_0x18839c));},Sprite_FieldMarkerATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x375)]=function(){const _0x1a4010=_0xd2f06f,_0xba7e54=this['battler']();if(!_0xba7e54)return 0x0;if(_0xba7e54[_0x1a4010(0x290)]())return 0x0;if(_0xba7e54[_0x1a4010(0x1e5)]())return 0x0;return 0xff;},Sprite_FieldMarkerATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x2df)]=function(){const _0x58107a=_0xd2f06f;if(this[_0x58107a(0x1fc)]!==undefined)return this[_0x58107a(0x1fc)];const _0x3f3caa=Sprite_FieldGaugeATB[_0x58107a(0x1a9)][_0x58107a(0x2a9)];return this['_horz']=[_0x58107a(0x24a),'bottom'][_0x58107a(0x255)](_0x3f3caa),this[_0x58107a(0x1fc)];},Sprite_FieldMarkerATB[_0xd2f06f(0x1b2)]['updatePositionOffset']=function(){const _0x1ce023=_0xd2f06f,_0x25c690=Sprite_FieldGaugeATB['Settings'],_0x37721e=this['isGaugeHorizontal'](),_0x3f85ca=this['_unit']===$gameParty?_0x1ce023(0x343):'Enemy',_0x756f52=_0x25c690[_0x1ce023(0x1ce)],_0x4d03fe=_0x25c690[_0x1ce023(0x2c6)[_0x1ce023(0x2dc)](_0x3f85ca)];_0x37721e?(this['y']=_0x25c690[_0x1ce023(0x323)]/0x2,this['y']+=_0x4d03fe?-_0x756f52:_0x756f52):(this['x']=_0x25c690['GaugeThick']/0x2,this['x']+=_0x4d03fe?_0x756f52:-_0x756f52);},Sprite_FieldMarkerATB['prototype'][_0xd2f06f(0x1f7)]=function(_0xf27470){const _0x4ef27f=_0xd2f06f,_0x32cf94=this[_0x4ef27f(0x2c1)]();if(!_0x32cf94)return;const _0x4a4b20=_0x32cf94[_0x4ef27f(0x328)]();if(_0x4a4b20>=Infinity)return;const _0x4f275f=Sprite_FieldGaugeATB[_0x4ef27f(0x1a9)],_0x104f91=this[_0x4ef27f(0x2df)](),_0x2cb1cf=this[_0x4ef27f(0x2fb)](),_0x2f61d3=_0xf27470?Infinity:_0x4f275f[_0x4ef27f(0x341)];if(_0x104f91&&this['x']!==_0x2cb1cf){if(this['x']>_0x2cb1cf)this['x']=Math[_0x4ef27f(0x2aa)](_0x2cb1cf,this['x']-_0x2f61d3);if(this['x']<_0x2cb1cf)this['x']=Math[_0x4ef27f(0x29b)](_0x2cb1cf,this['x']+_0x2f61d3);}else{if(!_0x104f91&&this['x']!==_0x2cb1cf){if(this['y']>_0x2cb1cf)this['y']=Math[_0x4ef27f(0x2aa)](_0x2cb1cf,this['y']-_0x2f61d3);if(this['y']<_0x2cb1cf)this['y']=Math['min'](_0x2cb1cf,this['y']+_0x2f61d3);}}},Sprite_FieldMarkerATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x2fb)]=function(){const _0x4d0606=_0xd2f06f,_0x3abd62=Sprite_FieldGaugeATB['Settings'],_0x61646d=this[_0x4d0606(0x2c1)](),_0xc21cad=this[_0x4d0606(0x2df)](),_0x2399a0=this[_0x4d0606(0x33c)]['bitmap']['width'],_0x1bc1b9=this[_0x4d0606(0x33c)][_0x4d0606(0x28e)][_0x4d0606(0x2ba)],_0x4e5ed1=_0x3abd62['GaugeSplit'][_0x4d0606(0x1d0)](0x0,0x1),_0x23ef9b=_0x3abd62[_0x4d0606(0x27a)];let _0x39c831=_0x61646d[_0x4d0606(0x294)]()*_0x4e5ed1;_0x39c831+=(0x1-_0x4e5ed1)*_0x61646d[_0x4d0606(0x328)]();if(_0x61646d===BattleManager[_0x4d0606(0x2d8)])_0x39c831=0x1;if(!_0x23ef9b)_0x39c831=0x1-_0x39c831;let _0x2f3946=0x0;if(_0xc21cad)_0x2f3946=_0x39c831*_0x2399a0;else!_0xc21cad&&(_0x2f3946=_0x39c831*_0x1bc1b9);return Math[_0x4d0606(0x2be)](_0x2f3946);},Sprite_FieldMarkerATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x2ae)]=function(){const _0x2150bf=_0xd2f06f,_0x38314b=this['battler']();if(!_0x38314b)return;const _0x71e380=Sprite_FieldGaugeATB['Settings'],_0x348be7=this[_0x2150bf(0x1b9)]===$gameParty?_0x2150bf(0x343):_0x2150bf(0x212);let _0x6dd4be=_0x38314b[_0x2150bf(0x359)]();if(_0x38314b[_0x2150bf(0x367)]()&&_0x6dd4be===_0x2150bf(0x29e))_0x6dd4be=_0x2150bf(0x2a8);else _0x38314b['isEnemy']()&&_0x6dd4be===_0x2150bf(0x36a)&&(_0x6dd4be=_0x2150bf(0x29e));if(this[_0x2150bf(0x301)]!==_0x6dd4be)return this[_0x2150bf(0x26e)]();switch(this[_0x2150bf(0x301)]){case'face':if(this[_0x2150bf(0x295)]!==_0x38314b[_0x2150bf(0x347)]())return this[_0x2150bf(0x26e)]();if(this[_0x2150bf(0x2ce)]!==_0x38314b[_0x2150bf(0x2cc)]())return this[_0x2150bf(0x26e)]();break;case _0x2150bf(0x22d):if(this[_0x2150bf(0x247)]!==_0x38314b[_0x2150bf(0x230)]())return this[_0x2150bf(0x26e)]();break;case _0x2150bf(0x29e):if(_0x38314b[_0x2150bf(0x222)]()){if(this[_0x2150bf(0x1c9)]!==_0x38314b['svBattlerName']())return this[_0x2150bf(0x26e)]();}else{if(this[_0x2150bf(0x237)]!==_0x38314b['battlerName']())return this[_0x2150bf(0x26e)]();}break;case'svactor':if(_0x38314b[_0x2150bf(0x367)]()){if(this[_0x2150bf(0x1c9)]!==_0x38314b[_0x2150bf(0x27e)]())return this[_0x2150bf(0x26e)]();}else{if(this[_0x2150bf(0x237)]!==_0x38314b[_0x2150bf(0x27e)]())return this['processUpdateGraphic']();}break;}},Sprite_FieldMarkerATB[_0xd2f06f(0x1b2)]['processUpdateGraphic']=function(){const _0xc9ae88=_0xd2f06f,_0x2726a9=this[_0xc9ae88(0x2c1)]();if(!_0x2726a9)return;this[_0xc9ae88(0x301)]=_0x2726a9[_0xc9ae88(0x359)]();if(_0x2726a9[_0xc9ae88(0x367)]()&&this[_0xc9ae88(0x301)]===_0xc9ae88(0x29e))this[_0xc9ae88(0x301)]=_0xc9ae88(0x2a8);else _0x2726a9['isEnemy']()&&this[_0xc9ae88(0x301)]==='svactor'&&(this[_0xc9ae88(0x301)]=_0xc9ae88(0x29e));let _0x3a23bd;switch(this[_0xc9ae88(0x301)]){case _0xc9ae88(0x2a8):this[_0xc9ae88(0x295)]=_0x2726a9[_0xc9ae88(0x347)](),this[_0xc9ae88(0x2ce)]=_0x2726a9['fieldAtbGraphicFaceIndex'](),_0x3a23bd=ImageManager[_0xc9ae88(0x1c8)](this[_0xc9ae88(0x295)]),_0x3a23bd['addLoadListener'](this['changeFaceGraphicBitmap'][_0xc9ae88(0x25f)](this,_0x3a23bd));break;case _0xc9ae88(0x22d):this['_graphicIconIndex']=_0x2726a9[_0xc9ae88(0x230)](),_0x3a23bd=ImageManager[_0xc9ae88(0x2d1)](_0xc9ae88(0x350)),_0x3a23bd[_0xc9ae88(0x221)](this['changeIconGraphicBitmap'][_0xc9ae88(0x25f)](this,_0x3a23bd));break;case'enemy':if(_0x2726a9[_0xc9ae88(0x222)]())this['_graphicSv']=_0x2726a9['svBattlerName'](),_0x3a23bd=ImageManager[_0xc9ae88(0x37c)](this['_graphicSv']),_0x3a23bd['addLoadListener'](this[_0xc9ae88(0x2c5)][_0xc9ae88(0x25f)](this,_0x3a23bd));else $gameSystem[_0xc9ae88(0x31b)]()?(this[_0xc9ae88(0x237)]=_0x2726a9[_0xc9ae88(0x27e)](),_0x3a23bd=ImageManager[_0xc9ae88(0x360)](this[_0xc9ae88(0x237)]),_0x3a23bd[_0xc9ae88(0x221)](this['changeEnemyGraphicBitmap']['bind'](this,_0x3a23bd))):(this[_0xc9ae88(0x237)]=_0x2726a9['battlerName'](),_0x3a23bd=ImageManager['loadEnemy'](this['_graphicEnemy']),_0x3a23bd[_0xc9ae88(0x221)](this['changeEnemyGraphicBitmap'][_0xc9ae88(0x25f)](this,_0x3a23bd)));break;case _0xc9ae88(0x36a):this['_graphicSv']=_0x2726a9[_0xc9ae88(0x27e)](),_0x3a23bd=ImageManager[_0xc9ae88(0x37c)](this['_graphicSv']),_0x3a23bd[_0xc9ae88(0x221)](this['changeSvActorGraphicBitmap'][_0xc9ae88(0x25f)](this,_0x3a23bd));break;}},Sprite_FieldMarkerATB[_0xd2f06f(0x1b2)]['changeFaceGraphicBitmap']=function(_0x223f26){const _0x4a33d1=_0xd2f06f,_0x470eb0=Sprite_FieldGaugeATB[_0x4a33d1(0x1a9)],_0xa33b2f=_0x470eb0[_0x4a33d1(0x2e8)],_0x56ab45=this[_0x4a33d1(0x2ce)];this[_0x4a33d1(0x335)]['bitmap']=new Bitmap(_0xa33b2f,_0xa33b2f);const _0x1bb925=this[_0x4a33d1(0x335)]['bitmap'],_0x1e668b=ImageManager['faceWidth'],_0x14b428=ImageManager[_0x4a33d1(0x2c0)],_0xe41a35=ImageManager['faceWidth'],_0x1de08=ImageManager[_0x4a33d1(0x2c0)],_0x53cb00=_0x56ab45%0x4*_0x1e668b+(_0x1e668b-_0xe41a35)/0x2,_0x5a424f=Math['floor'](_0x56ab45/0x4)*_0x14b428+(_0x14b428-_0x1de08)/0x2;_0x1bb925[_0x4a33d1(0x24b)](_0x223f26,_0x53cb00,_0x5a424f,_0xe41a35,_0x1de08,0x0,0x0,_0xa33b2f,_0xa33b2f);},Sprite_FieldMarkerATB['prototype']['changeIconGraphicBitmap']=function(_0x5e4166){const _0x445f6e=_0xd2f06f,_0x151e19=Sprite_FieldGaugeATB[_0x445f6e(0x1a9)],_0x1a1cc9=_0x151e19[_0x445f6e(0x2e8)],_0x1c1f60=this[_0x445f6e(0x247)];this[_0x445f6e(0x335)][_0x445f6e(0x28e)]=new Bitmap(_0x1a1cc9,_0x1a1cc9);const _0x3e43da=this['_graphicSprite']['bitmap'],_0x4cedb2=ImageManager[_0x445f6e(0x353)],_0x2117c0=ImageManager[_0x445f6e(0x2e6)],_0x1bb3a6=_0x1c1f60%0x10*_0x4cedb2,_0x1c7263=Math[_0x445f6e(0x286)](_0x1c1f60/0x10)*_0x2117c0;_0x3e43da['blt'](_0x5e4166,_0x1bb3a6,_0x1c7263,_0x4cedb2,_0x2117c0,0x0,0x0,_0x1a1cc9,_0x1a1cc9);},Sprite_FieldMarkerATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x2c5)]=function(_0x31977d){const _0x5aeca7=_0xd2f06f,_0x1785b9=Sprite_FieldGaugeATB[_0x5aeca7(0x1a9)],_0xdc65af=_0x1785b9[_0x5aeca7(0x2e8)];this[_0x5aeca7(0x335)][_0x5aeca7(0x28e)]=new Bitmap(_0xdc65af,_0xdc65af);const _0x49e1a5=this[_0x5aeca7(0x335)][_0x5aeca7(0x28e)],_0x6706ff=this[_0x5aeca7(0x1c9)]['match'](/\$/i),_0x45c5ef=_0x6706ff?0x1:ImageManager[_0x5aeca7(0x229)],_0x418241=_0x6706ff?0x1:ImageManager['svActorVertCells'],_0x8cdf40=_0x31977d[_0x5aeca7(0x2fe)]/_0x45c5ef,_0x487535=_0x31977d[_0x5aeca7(0x2ba)]/_0x418241,_0xe93a00=Math['min'](0x1,_0xdc65af/_0x8cdf40,_0xdc65af/_0x487535),_0x265054=_0x8cdf40*_0xe93a00,_0x22e1fc=_0x487535*_0xe93a00,_0x580976=Math[_0x5aeca7(0x2be)]((_0xdc65af-_0x265054)/0x2),_0x26de2e=Math[_0x5aeca7(0x2be)]((_0xdc65af-_0x22e1fc)/0x2);_0x49e1a5['blt'](_0x31977d,0x0,0x0,_0x8cdf40,_0x487535,_0x580976,_0x26de2e,_0x265054,_0x22e1fc);},Sprite_FieldMarkerATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x332)]=function(_0x2ac3f6){const _0x47db28=_0xd2f06f,_0x2e7b69=Sprite_FieldGaugeATB['Settings'],_0xfaefa6=_0x2e7b69[_0x47db28(0x2e8)];this[_0x47db28(0x335)][_0x47db28(0x28e)]=new Bitmap(_0xfaefa6,_0xfaefa6);const _0x133b91=this['_graphicSprite'][_0x47db28(0x28e)],_0x574d85=Math[_0x47db28(0x29b)](0x1,_0xfaefa6/_0x2ac3f6[_0x47db28(0x2fe)],_0xfaefa6/_0x2ac3f6['height']),_0x4163ec=_0x2ac3f6[_0x47db28(0x2fe)]*_0x574d85,_0x4364e2=_0x2ac3f6['height']*_0x574d85,_0x43ef00=Math[_0x47db28(0x2be)]((_0xfaefa6-_0x4163ec)/0x2),_0x4c378f=Math[_0x47db28(0x2be)]((_0xfaefa6-_0x4364e2)/0x2);_0x133b91[_0x47db28(0x24b)](_0x2ac3f6,0x0,0x0,_0x2ac3f6[_0x47db28(0x2fe)],_0x2ac3f6[_0x47db28(0x2ba)],_0x43ef00,_0x4c378f,_0x4163ec,_0x4364e2);},Sprite_FieldMarkerATB['prototype'][_0xd2f06f(0x223)]=function(){const _0x1e27eb=_0xd2f06f,_0x1e3574=this[_0x1e27eb(0x2c1)]();if(!_0x1e3574)return;if(!_0x1e3574[_0x1e27eb(0x2eb)]())return;if(this[_0x1e27eb(0x345)]===_0x1e3574[_0x1e27eb(0x1ed)]())return;this['_graphicHue']=_0x1e3574[_0x1e27eb(0x1ed)](),this['_graphicSprite']['setHue'](_0x1e3574['hasSvBattler']()?0x0:this['_graphicHue']);},Sprite_FieldMarkerATB['prototype'][_0xd2f06f(0x256)]=function(){const _0x275b09=_0xd2f06f;if(!this[_0x275b09(0x2e3)])return;const _0x28ac47=this['battler']();if(!_0x28ac47)return;if(this[_0x275b09(0x23b)]===_0x28ac47[_0x275b09(0x23b)]&&this['_plural']===_0x28ac47[_0x275b09(0x1f1)])return;this['_letter']=_0x28ac47[_0x275b09(0x23b)],this[_0x275b09(0x1f1)]=_0x28ac47[_0x275b09(0x1f1)];const _0x243140=Sprite_FieldGaugeATB['Settings'],_0x4dfea8=_0x243140['MarkerSize'],_0x518983=Math[_0x275b09(0x286)](_0x4dfea8/0x2),_0x3b9743=this[_0x275b09(0x2e3)][_0x275b09(0x28e)];_0x3b9743[_0x275b09(0x33b)]();if(!this[_0x275b09(0x1f1)])return;_0x3b9743[_0x275b09(0x1f4)]=_0x243140[_0x275b09(0x1e1)]||$gameSystem[_0x275b09(0x297)](),_0x3b9743[_0x275b09(0x1ba)]=_0x243140['EnemyBattlerFontSize']||0x10,_0x3b9743[_0x275b09(0x233)](this[_0x275b09(0x23b)],0x2,_0x518983,_0x4dfea8-0x4,_0x518983-0x2,'right');},Sprite_FieldMarkerATB[_0xd2f06f(0x1b2)]['updateSelectionEffect']=function(){const _0x5af390=_0xd2f06f,_0xe80c75=this[_0x5af390(0x2c1)]();if(!_0xe80c75)return;const _0x30ca58=_0xe80c75['battler']();if(!_0x30ca58)return;const _0x453aa0=_0x30ca58[_0x5af390(0x24c)]();if(!_0x453aa0)return;this[_0x5af390(0x2da)](_0x453aa0['_blendColor']);},Sprite_FieldMarkerATB[_0xd2f06f(0x1b2)][_0xd2f06f(0x30a)]=function(){const _0x48d0a4=_0xd2f06f;return this[_0x48d0a4(0x2c1)]();};function _0x2c99(){const _0x54e6d5=['currentValue','InterruptAnimationID','note','setHomeLocation','Sprite_Battler_update','loadFace','_graphicSv','svActorVertCells','ARRAYJSON','isATB','GaugeLengthVert','MarkerOffset','constructor','clamp','6213cmRUJs','map','atbActive','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ShowEnemyGauge','VisuMZ_1_BattleCore','status','Mechanics','atbColor','EnemyBattlerType','EnemyBattlerIcon','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','slow%1','Game_Battler_tpbRequiredCastTime','call','applyItemUserEffect','EnemyBattlerFontFace','updateOpacity','Window_Options_addGeneralOptions','fillRect','isDead','_tpbIdleTime','_battler','_scene','setAtbAfterSpeed','130BUYNVH','addBattleSystemATBShowGaugeCommand','STR','battlerHue','Armor-%1-%2','some','left','_plural','ctGaugeColor1','ParseSkillNotetags','fontFace','setupAtbGaugeSprite','die','updatePositionOnGauge','After','boxHeight','createStateSprite','battleUIOffsetY','_horz','FastRate','VisuMZ_2_BattleSystemCTB','Sprite_Enemy_createStateIconSprite','Game_Battler_onRestrict','JSON','clearTpbChargeTime','maxCommands','full%1','isAtbChargingState','Options','_svBattlerSprite','3976452fFeXXk','%1BgColor1','isActiveTpb','ShowStatusGauge','Charge','Window_StatusBase_placeGauge','VisuMZ_2_AggroControlSystem','Gauge','_atbGaugeSprite','createBackgroundSprite','Enemy','GaugeLengthHorz','isAtbCastingState','Scene_Options_maxCommands','stop','InterruptTextColor','gradientFillRect','filter','update','stop%1','toLowerCase','Class-%1-%2','paramRate','%1BorderColor','Game_Action_applyItemUserEffect','addLoadListener','hasSvBattler','updateGraphicHue','Game_Battler_tpbAcceleration','isSceneBattle','createKeyJS','tpbRelativeSpeed','traitObjects','svActorHorzCells','Game_Battler_tpbSpeed','_fieldAtbGaugeIconIndex','cast','icon','Game_Unit_updateTpb','_windowskin','fieldAtbGraphicIconIndex','_skinSprite','setBattleSystemATBFieldGaugeVisible','drawText','applyBattleSystemATBUserEffect','visible','version','_graphicEnemy','DisplayOffsetY','_battlerContainer','changeAtbChargeTime','_letter','%1SystemBg','Window_BattleStatus','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','attackSpeed','gaugeColor1','createFieldAtbGraphicIconIndex','name','children','disappear','Game_Battler_tpbRelativeSpeed','atbCurrentValue','_graphicIconIndex','createBattlerSprite','createAllWindows','top','blt','mainSprite','applyItemBattleSystemATBUserEffect','item','cast%1','FieldGaugeEnemyFace','initialize','processBattleCoreJS','battleMembers','maxBattleMembers','includes','updateLetter','setText','cast2','GaugeSplit','checkAggroControlSystemOffsetYAdjustment','currentMaxValue','isBattleSystemATBFieldGaugeVisible','subject','BattleManager_isActiveTpb','bind','tpbRequiredCastTime','Game_BattlerBase_appear','Sprite_Battler_updateMain','startTpbCasting','acting','canMakeTpbActionsAtStartTpbTurn','AddOption','createFieldAtbGraphicFaceName','Color','ARRAYFUNC','InterruptText','212RZHZbr','lineHeight','_tpbChargeTime','processUpdateGraphic','actor','isStateAffected','addCommand','Scale','gaugeColor2','ActorBattlerIcon','scale','_onRestrictBypassAtbReset','setAtbCastTime','setFrame','_atbFieldGaugeVisible','GaugeDirection','createFieldAtbGraphicType','_index','Scene_Battle_createAllWindows','battlerName','Game_System_initialize','BattleManager_endBattlerActions','InterruptMute','RegExp','BattleSystemATB','numActions','faceName','floor','FieldGaugeEnemyIcon','atbStopped','AnchorX','597997zKmwWo','setAtbChargeTime','_tpbTurnCount','skills','bitmap','loadWindowskin','isHidden','AnchorY','_atbColors','ColorManager_loadWindowskin','tpbChargeTime','_graphicFaceName','updateAtbGaugeSpritePosition','mainFontFace','isAttack','_tpbCastTime','(?:GAUGE|TIME|SPEED)','min','currentAction','textColor','enemy','Sprite_Actor_createStateSprite','133YcRQer','FieldGaugeClearEnemyGraphic','Sprite_Battler_setBattler','Game_Battler_clearActions','Game_Battler_initTpbChargeTime','atbCurrentMaxValue','#000000','showVisualAtbGauge','face','DisplayPosition','max','_fieldGaugeATB','Game_Battler_startTpbCasting','createFieldGaugeSpriteATB','updateGraphic','registerCommand','createActorSprites','members','makeDeepCopy','Sprite_Gauge_currentMaxValue','getColor','ConfigManager_makeData','createGaugeSprite','InterruptFlashDuration','setBattler','createStateIconSprite','height','applyData','_homeY','createEnemySprites','round','changeAtbCastTime','faceHeight','battler','appear','ceil','ConvertParams','changeSvActorGraphicBitmap','%1Side','Item-%1-%2','applyGlobal','Game_Action_applyGlobal','updateVisibility','createGraphicSprite','fieldAtbGraphicFaceIndex','(?:ATB|TPB)','_graphicFaceIndex','updateTpb','startTpbTurn','loadSystem','createArrowSprite','gaugeBackColor','_fieldAtbGaugeFaceIndex','Visible','Game_Battler_tpbBaseSpeed','initTpbChargeTimeATB','_subject','createChildren','setBlendColor','ConfigManager_applyData','format','createBattlerSprites','initTpbChargeTime','isGaugeHorizontal','create','reduce','default','_letterSprite','isAppeared','isTpb','iconHeight','FieldGaugeClearActorGraphic','MarkerSize','opacity','_actions','isEnemy','applyTpbPenalty','startEffect','createAtbGaugeSprite','FieldGaugeActorFace','gaugeRate','parse','atbAcceleration','Parse_Notetags_CreateJS','%1SystemBorder','fast','ShowMarkerArrow','_arrowSprite','Enemy-%1-%2','process_VisuMZ_BattleSystemATB_JS_Notetags','Weapon-%1-%2','targetPositionOnGauge','MarkerArrowWindowSkin','ShowActorGauge','width','compareBattlerSprites','TpbAccelerationJS','_graphicType','23778xJdvYZ','Interrupt','AdjustRect','updateAtbGaugeSpriteVisibility','_tpbTurnEnd','_fieldAtbGaugeGraphicType','createJS','Enemies','getStateTooltipBattler','EnemyBattlerDrawLetter','tpbSpeed','Game_Battler_removeState','full','RepositionTopHelpX','_fieldAtbGaugeFaceName','atbGaugeColor','updateBattleContainerOrder','battleUIOffsetX','State-%1-%2','tpbAcceleration','makeData','_homeX','placeGauge','_atbAfterSpeed','BattleCore','isSideView','endBattlerActions','parameters','ParseAllNotetags','OffsetY','atbSpeed','EnemyBattlerFaceName','TpbSpeedCalcJS','GaugeThick','setupBattleSystemATBColors','atbInterrupt','gaugeHeight','exit','getAtbCastTimeRate','setupArrowSprite','onDatabaseLoaded','PreStartTurnJS','aggroGauge','Window_Help_setItem','_backgroundSprite','AggroControlSystem','ARRAYSTR','applyGlobalBattleSystemATBEffects','changeEnemyGraphicBitmap','anchor','time','_graphicSprite','createFieldGaugeSkin','charging','createFieldAtbGraphicFaceIndex','allBattleMembers','ctGaugeColor2','clear','_gaugeSprite','trim','TpbBaseSpeedCalcJS','IconIndex','Scene_Boot_onDatabaseLoaded','MarkerSpeed','OpacityRate','Actor','ParseItemNotetags','_graphicHue','updatePosition','fieldAtbGraphicFaceName','drawGaugeBitmap','BattlerRelativeSpeedJS','removeChild','Game_BattlerBase_revive','_windowLayer','Actor-%1-%2','createLetterSprite','initMembers','IconSet','Sprite_Gauge_currentValue','_forcing','iconWidth','Aggro','FUNC','_fieldGaugeATB_Container','createGaugeBitmap','createFieldGaugeContainerATB','fieldAtbGraphicType','clearActions','description','setItem','onRestrict','addChild','restriction','loadSvEnemy','EscapeFailPenalty','Game_Battler_applyTpbPenalty','addGeneralOptions','Actors','cast1','fast%1','isActor','getChildIndex','TpbCastTimeJS','svactor','_statusType','944883vcNfPS','EnemyBattlerFaceIndex','match','ARRAYEVAL','undecided','removeState','createBattlerContainer','_needsAtbClear','applyATBPenalty','targetOpacity','isTpbCharged','Cast','initBattleSystemATB','canMove','length','UseFieldGauge','loadSvActor','speed','createBorderSprite','isShowAtbGauge','Game_Battler_clearTpbChargeTime','GaugeSystemSkin','onAtbInterrupt','Settings','addBattleSystemATBCommands','InterruptMirror','boxWidth','makeTpbActions','_originalSpeed','Sprite_Gauge_gaugeColor1','_tpbState','FieldGauge','prototype','clearFieldAtbGraphics','4588500FguHCZ','visualAtbGauge','Sprite_Gauge_gaugeColor2','7179032ejNEsZ','OffsetX','_unit','fontSize','Sprite_Enemy_startEffect','StunsResetGauge','slow','tpbBaseSpeed','revive','SlowRate','toUpperCase','Game_BattlerBase_die'];_0x2c99=function(){return _0x54e6d5;};return _0x2c99();}