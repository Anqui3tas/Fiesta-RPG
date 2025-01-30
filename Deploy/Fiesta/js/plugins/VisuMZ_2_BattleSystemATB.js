//=============================================================================
// VisuStella MZ - Battle System ATB - Active Turn Battle
// VisuMZ_2_BattleSystemATB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemATB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemATB = VisuMZ.BattleSystemATB || {};
VisuMZ.BattleSystemATB.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.10] [BattleSystemATB]
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
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","StunsResetGauge:eval":"false","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.5","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
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
 * @default false
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
 * @type Number
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

const _0x1674=['isAttack','RegExp','ARRAYEVAL','isEnemy','initBattleSystemATB','FieldGaugeActorFace','Scene_Boot_onDatabaseLoaded','createGraphicSprite','createActorSprites','EnemyBattlerFaceName','drawGaugeBitmap','createFieldAtbGraphicIconIndex','createBattlerSprite','maxCommands','addGeneralOptions','Window_StatusBase_placeGauge','default','_graphicFaceName','getColor','Actor-%1-%2','processUpdateGraphic','tpbRequiredCastTime','_atbColors','call','MarkerSize','Game_Battler_initTpbChargeTime','tpbSpeed','_helpWindow','isATB','trim','gradientFillRect','stop','_unit','BattleManager_isActiveTpb','createBackgroundSprite','_graphicIconIndex','skills','concat','ARRAYNUM','_skinSprite','EnemyBattlerIcon','Interrupt','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','IconIndex','addBattleSystemATBCommands','anchor','atbSpeed','isGaugeHorizontal','_fieldGaugeATB','createFieldAtbGraphicFaceName','createEnemySprites','8813yIMkTK','Armor-%1-%2','ARRAYSTR','face','isAtbChargingState','battlerName','update','196505sfGHNB','Game_Battler_applyTpbPenalty','Game_Battler_tpbAcceleration','isTpb','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setBattler','width','length','getChildIndex','format','applyBattleSystemATBUserEffect','setBlendColor','fieldAtbGraphicFaceIndex','DisplayPosition','Sprite_Gauge_gaugeColor1','atbColor','_battlerContainer','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','isRestricted','updatePosition','setupAtbGaugeSprite','EnemyBattlerFaceIndex','version','filter','Sprite_Battler_setBattler','Parse_Notetags_CreateJS','setAtbCastTime','OpacityRate','Game_Action_applyItemUserEffect','actor','updateGraphicHue','battleUIOffsetX','createAllWindows','slow','Scene_Battle_createAllWindows','onRestrict','constructor','updateGraphic','time','_homeY','isAtbCastingState','loadSvActor','ceil','ctGaugeColor1','status','match','createFieldGaugeContainerATB','iconWidth','_arrowSprite','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','FieldGaugeActorIcon','ARRAYSTRUCT','createKeyJS','members','fieldAtbGraphicType','makeDeepCopy','min','applyItemBattleSystemATBUserEffect','_backgroundSprite','paramBuffRate','stop%1','AdjustRect','atbAcceleration','loadSvEnemy','InterruptMute','initTpbChargeTime','InterruptFlashColor','_forcing','makeData','setupBattleSystemATBColors','visible','clamp','(?:GAUGE|TIME|SPEED)','FieldGaugeEnemyFace','map','FieldGaugeClearEnemyGraphic','127754aOoYOt','AddOption','currentAction','Class-%1-%2','fillRect','_homeX','textColor','atbStopped','clearRect','2iUMNPy','atbCurrentMaxValue','scale','abs','_subject','name','Sprite_Enemy_createStateIconSprite','createBorderSprite','Game_System_initialize','clearActions','createChildren','Skill-%1-%2','_graphicSprite','Mechanics','updateLetter','max','Scale','FieldGaugeEnemyIcon','atbInterrupt','EnemyBattlerFontFace','FUNC','Cast','charging','SystemFieldGaugeVisibility','_battler','fast%1','OffsetX','NUM','parse','_letterSprite','UseFieldGauge','_tpbChargeTime','MarkerSpeed','isBattleSystemATBFieldGaugeVisible','_gaugeSprite','Options','Sprite_Gauge_gaugeColor2','InterruptText','applyGlobal','changeAtbChargeTime','VisuMZ_1_BattleCore','GaugeLengthVert','ConfigManager_makeData','height','gaugeColor1','showVisualAtbGauge','Sprite_Battler_updateMain','left','battler','gaugeColor2','process_VisuMZ_BattleSystemATB_CreateRegExp','tpbAcceleration','icon','updatePositionOffset','atbActive','setAtbAfterSpeed','InterruptFlashDuration','ShowMarkerBorder','Window_Help_setItem','fontSize','mainSprite','getStateTooltipBattler','Sprite_Actor_createStateSprite','_fieldGaugeATB_Container','targetOpacity','VisuMZ_0_CoreEngine','Scene_Options_maxCommands','createFieldAtbGraphicFaceIndex','fontFace','Settings','Gauge','_plural','initialize','updateMain','right','_horz','prototype','children','setItem','Window_Options_addGeneralOptions','tpbRelativeSpeed','EnemyBattlerType','Sprite_Gauge_currentMaxValue','createGaugeBitmap','%1BorderColor','enemy','faceWidth','GaugeThick','BattleSystemATB','initMembers','setupTextPopup','isSideView','_index','_fieldAtbGaugeIconIndex','3gRytvA','_graphicSv','JSON','VisibleGauge','setHomeLocation','applyData','battlerHue','_tpbCastTime','currentMaxValue','applyTpbPenalty','battleUIOffsetY','svBattlerName','_atbFieldGaugeVisible','currentValue','faceHeight','Item-%1-%2','targetPositionOnGauge','Enemies','updateSelectionEffect','Game_Battler_tpbBaseSpeed','updateOpacity','After','isSceneBattle','drawText','ShowMarkerBg','Name','ShowEnemyGauge','top','setAtbChargeTime','FieldGauge','MarkerOffset','process_VisuMZ_BattleSystemATB_JS_Notetags','VisuMZ_2_AggroControlSystem','bitmap','_graphicEnemy','GaugeSplit','Aggro','Actors','exit','createStateSprite','isCTB','_fieldAtbGaugeGraphicType','createArrowSprite','addBattleSystemATBShowGaugeCommand','_statusType','GaugeDirection','STR','subject','addChild','loadWindowskin','clearTpbChargeTime','faceName','Game_Battler_tpbRelativeSpeed','Game_Battler_onRestrict','gaugeHeight','TpbAccelerationJS','changeIconGraphicBitmap','blt','FaceIndex','createFieldAtbGraphicType','isHidden','toUpperCase','122531jbCEwh','isActor','ShowActorGauge','STRUCT','TpbBaseSpeedCalcJS','setFrame','updateBattleContainerOrder','9nQTKEE','onDatabaseLoaded','gaugeBackColor','setText','createLetterSprite','StunsResetGauge','sort','EVAL','note','ctGaugeColor2','Charge','canMove','_atbAfterSpeed','Color','isActiveTpb','applyGlobalBattleSystemATBEffects','224868JSNNxn','applyATBPenalty','BorderThickness','changeSvActorGraphicBitmap','loadEnemy','reduce','onAtbInterrupt','_windowLayer','floor','AnchorX','173198NGCxTe','ARRAYFUNC','_letter','19073bdPNzA','EnemyBattlerFontSize','createGaugeSprite','traitObjects','hasSvBattler','ARRAYJSON','%1BgColor1','InterruptAnimationID','battleMembers','createFieldGaugeSpriteATB','tpbBaseSpeed','placeGauge','mainFontFace','_atbGaugeSprite','boxWidth','svactor','ParseAllNotetags','description','clearFieldAtbGraphics','addLoadListener','atbGaugeColor','changeFaceGraphicBitmap','TpbCastTimeJS','attackSpeed','full','MarkerArrowWindowSkin','compareBattlerSprites','checkAggroControlSystemOffsetYAdjustment','#000000','includes','Game_Battler_clearTpbChargeTime','Game_Battler_tpbRequiredCastTime','registerCommand','ParseSkillNotetags','Sprite_Gauge_currentValue','loadSystem','ActorBattlerIcon','ConvertParams','_fieldAtbGaugeFaceIndex','_scene','createJS','Actor','lineHeight','applyItemUserEffect','AnchorY','createFieldGaugeSkin','RepositionTopForHelp','Game_Action_applyGlobal','Visible','ParseItemNotetags','create','fieldAtbGraphicFaceName','changeAtbCastTime','updatePositionOnGauge','bottom','_windowskin','bind','_graphicType','speed','opacity','round','slow%1','_onRestrictBypassAtbReset','initTpbChargeTimeATB','_graphicHue','toLowerCase','visualAtbGauge','fast','item','Game_Battler_tpbSpeed','setupArrowSprite','#%1','DisplayOffsetY','cast1','changeEnemyGraphicBitmap','IconSet','boxHeight','getAtbCastTimeRate','createBattlerSprites','Enemy','isDead','ConfigManager_applyData','FaceName','setup','OffsetY','_graphicFaceIndex','createBattlerContainer','VisuMZ_2_BattleSystemCTB','ColorManager_loadWindowskin','_fieldAtbGaugeFaceName','1QdNnRY','_tpbState','%1Side','createAtbGaugeSprite','TpbSpeedCalcJS','BattlerRelativeSpeedJS','fieldAtbGraphicIconIndex'];const _0x1eb1=function(_0x56d47d,_0x2eda9a){_0x56d47d=_0x56d47d-0x97;let _0x167406=_0x1674[_0x56d47d];return _0x167406;};const _0x7669a6=_0x1eb1;(function(_0x2ca35f,_0x421419){const _0x45a3a1=_0x1eb1;while(!![]){try{const _0x10bcdc=-parseInt(_0x45a3a1(0x214))*-parseInt(_0x45a3a1(0x157))+-parseInt(_0x45a3a1(0x217))*parseInt(_0x45a3a1(0x1fa))+-parseInt(_0x45a3a1(0x102))+-parseInt(_0x45a3a1(0x1f3))*-parseInt(_0x45a3a1(0x1b5))+-parseInt(_0x45a3a1(0x20a))+-parseInt(_0x45a3a1(0xfb))+-parseInt(_0x45a3a1(0x14e))*-parseInt(_0x45a3a1(0xc1));if(_0x10bcdc===_0x421419)break;else _0x2ca35f['push'](_0x2ca35f['shift']());}catch(_0x20e879){_0x2ca35f['push'](_0x2ca35f['shift']());}}}(_0x1674,0x3a91c));var label=_0x7669a6(0x1af),tier=tier||0x0,dependencies=[_0x7669a6(0x17f)],pluginData=$plugins[_0x7669a6(0x119)](function(_0x426708){const _0x355459=_0x7669a6;return _0x426708[_0x355459(0x12e)]&&_0x426708[_0x355459(0x228)][_0x355459(0x234)]('['+label+']');})[0x0];VisuMZ[label][_0x7669a6(0x19c)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x7669a6(0x23c)]=function(_0x25ed66,_0x33c2b0){const _0x568421=_0x7669a6;for(const _0x1bd246 in _0x33c2b0){if(_0x1bd246[_0x568421(0x12f)](/(.*):(.*)/i)){const _0x5b5ed2=String(RegExp['$1']),_0x1b4c22=String(RegExp['$2'])['toUpperCase']()[_0x568421(0xe5)]();let _0x546ecd,_0x1ba5ef,_0x5979fd;switch(_0x1b4c22){case _0x568421(0x172):_0x546ecd=_0x33c2b0[_0x1bd246]!==''?Number(_0x33c2b0[_0x1bd246]):0x0;break;case _0x568421(0xee):_0x1ba5ef=_0x33c2b0[_0x1bd246]!==''?JSON[_0x568421(0x173)](_0x33c2b0[_0x1bd246]):[],_0x546ecd=_0x1ba5ef[_0x568421(0x14c)](_0x579869=>Number(_0x579869));break;case _0x568421(0x201):_0x546ecd=_0x33c2b0[_0x1bd246]!==''?eval(_0x33c2b0[_0x1bd246]):null;break;case _0x568421(0xca):_0x1ba5ef=_0x33c2b0[_0x1bd246]!==''?JSON[_0x568421(0x173)](_0x33c2b0[_0x1bd246]):[],_0x546ecd=_0x1ba5ef[_0x568421(0x14c)](_0x2a1846=>eval(_0x2a1846));break;case _0x568421(0x1b7):_0x546ecd=_0x33c2b0[_0x1bd246]!==''?JSON[_0x568421(0x173)](_0x33c2b0[_0x1bd246]):'';break;case _0x568421(0x21c):_0x1ba5ef=_0x33c2b0[_0x1bd246]!==''?JSON[_0x568421(0x173)](_0x33c2b0[_0x1bd246]):[],_0x546ecd=_0x1ba5ef[_0x568421(0x14c)](_0x1b0f2a=>JSON[_0x568421(0x173)](_0x1b0f2a));break;case _0x568421(0x16b):_0x546ecd=_0x33c2b0[_0x1bd246]!==''?new Function(JSON[_0x568421(0x173)](_0x33c2b0[_0x1bd246])):new Function('return\x200');break;case _0x568421(0x215):_0x1ba5ef=_0x33c2b0[_0x1bd246]!==''?JSON[_0x568421(0x173)](_0x33c2b0[_0x1bd246]):[],_0x546ecd=_0x1ba5ef['map'](_0x1bdb23=>new Function(JSON[_0x568421(0x173)](_0x1bdb23)));break;case _0x568421(0x1e3):_0x546ecd=_0x33c2b0[_0x1bd246]!==''?String(_0x33c2b0[_0x1bd246]):'';break;case _0x568421(0xfd):_0x1ba5ef=_0x33c2b0[_0x1bd246]!==''?JSON[_0x568421(0x173)](_0x33c2b0[_0x1bd246]):[],_0x546ecd=_0x1ba5ef[_0x568421(0x14c)](_0x300f0f=>String(_0x300f0f));break;case _0x568421(0x1f6):_0x5979fd=_0x33c2b0[_0x1bd246]!==''?JSON['parse'](_0x33c2b0[_0x1bd246]):{},_0x546ecd=VisuMZ[_0x568421(0x23c)]({},_0x5979fd);break;case _0x568421(0x135):_0x1ba5ef=_0x33c2b0[_0x1bd246]!==''?JSON[_0x568421(0x173)](_0x33c2b0[_0x1bd246]):[],_0x546ecd=_0x1ba5ef[_0x568421(0x14c)](_0x2d0d38=>VisuMZ[_0x568421(0x23c)]({},JSON[_0x568421(0x173)](_0x2d0d38)));break;default:continue;}_0x25ed66[_0x5b5ed2]=_0x546ecd;}}return _0x25ed66;},(_0x52ef2f=>{const _0x5c6238=_0x7669a6,_0x269952=_0x52ef2f[_0x5c6238(0x15c)];for(const _0x2a5c86 of dependencies){if(!Imported[_0x2a5c86]){alert(_0x5c6238(0x106)['format'](_0x269952,_0x2a5c86)),SceneManager[_0x5c6238(0x1db)]();break;}}const _0x16c342=_0x52ef2f[_0x5c6238(0x228)];if(_0x16c342[_0x5c6238(0x12f)](/\[Version[ ](.*?)\]/i)){const _0x11e906=Number(RegExp['$1']);_0x11e906!==VisuMZ[label][_0x5c6238(0x118)]&&(alert(_0x5c6238(0x133)[_0x5c6238(0x10b)](_0x269952,_0x11e906)),SceneManager[_0x5c6238(0x1db)]());}if(_0x16c342[_0x5c6238(0x12f)](/\[Tier[ ](\d+)\]/i)){const _0x2b5a30=Number(RegExp['$1']);_0x2b5a30<tier?(alert(_0x5c6238(0x113)[_0x5c6238(0x10b)](_0x269952,_0x2b5a30,tier)),SceneManager[_0x5c6238(0x1db)]()):tier=Math['max'](_0x2b5a30,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x52ef2f['parameters']);})(pluginData),PluginManager[_0x7669a6(0x237)](pluginData[_0x7669a6(0x15c)],_0x7669a6(0x134),_0xdb1424=>{const _0x37b5a0=_0x7669a6;VisuMZ['ConvertParams'](_0xdb1424,_0xdb1424);const _0x3fb83c=_0xdb1424[_0x37b5a0(0x1da)],_0x39b795=_0xdb1424[_0x37b5a0(0xf3)];for(const _0x4bbcac of _0x3fb83c){const _0x401459=$gameActors['actor'](_0x4bbcac);if(!_0x401459)continue;_0x401459[_0x37b5a0(0x1de)]=_0x37b5a0(0x18b),_0x401459[_0x37b5a0(0x1b4)]=_0x39b795;}}),PluginManager['registerCommand'](pluginData['name'],_0x7669a6(0xcd),_0x53373c=>{const _0xd183df=_0x7669a6;VisuMZ[_0xd183df(0x23c)](_0x53373c,_0x53373c);const _0x36c77f=_0x53373c[_0xd183df(0x1da)],_0x455da8=_0x53373c['FaceName'],_0x312b54=_0x53373c[_0xd183df(0x1ef)];for(const _0x169ad4 of _0x36c77f){const _0x4267d5=$gameActors['actor'](_0x169ad4);if(!_0x4267d5)continue;_0x4267d5[_0xd183df(0x1de)]=_0xd183df(0xfe),_0x4267d5[_0xd183df(0xc0)]=_0x455da8,_0x4267d5[_0xd183df(0x23d)]=_0x312b54;}}),PluginManager[_0x7669a6(0x237)](pluginData[_0x7669a6(0x15c)],'FieldGaugeClearActorGraphic',_0x22691a=>{const _0x3eb2bd=_0x7669a6;VisuMZ[_0x3eb2bd(0x23c)](_0x22691a,_0x22691a);const _0x368d5b=_0x22691a[_0x3eb2bd(0x1da)];for(const _0x29cb63 of _0x368d5b){const _0x32c769=$gameActors[_0x3eb2bd(0x11f)](_0x29cb63);if(!_0x32c769)continue;_0x32c769[_0x3eb2bd(0x229)]();}}),PluginManager[_0x7669a6(0x237)](pluginData[_0x7669a6(0x15c)],_0x7669a6(0x168),_0x419e77=>{const _0x2ca77b=_0x7669a6;VisuMZ['ConvertParams'](_0x419e77,_0x419e77);const _0x2c839e=_0x419e77[_0x2ca77b(0x1c6)],_0xfdf7c2=_0x419e77[_0x2ca77b(0xf3)];for(const _0x5e67b1 of _0x2c839e){const _0x4abfb6=$gameTroop[_0x2ca77b(0x137)]()[_0x5e67b1];if(!_0x4abfb6)continue;_0x4abfb6['_fieldAtbGaugeGraphicType']='icon',_0x4abfb6[_0x2ca77b(0x1b4)]=_0xfdf7c2;}}),PluginManager['registerCommand'](pluginData[_0x7669a6(0x15c)],_0x7669a6(0x14b),_0x2ec559=>{const _0x358b66=_0x7669a6;VisuMZ[_0x358b66(0x23c)](_0x2ec559,_0x2ec559);const _0x3adb07=_0x2ec559[_0x358b66(0x1c6)],_0x26a4a6=_0x2ec559[_0x358b66(0xb9)],_0x2f9562=_0x2ec559[_0x358b66(0x1ef)];for(const _0x4d3b4b of _0x3adb07){const _0x93d614=$gameTroop[_0x358b66(0x137)]()[_0x4d3b4b];if(!_0x93d614)continue;_0x93d614[_0x358b66(0x1de)]=_0x358b66(0xfe),_0x93d614[_0x358b66(0xc0)]=_0x26a4a6,_0x93d614['_fieldAtbGaugeFaceIndex']=_0x2f9562;}}),PluginManager[_0x7669a6(0x237)](pluginData[_0x7669a6(0x15c)],_0x7669a6(0x14d),_0x2b3cca=>{const _0x29fd33=_0x7669a6;VisuMZ[_0x29fd33(0x23c)](_0x2b3cca,_0x2b3cca);const _0x1d0308=_0x2b3cca['Enemies'];for(const _0x309473 of _0x1d0308){const _0xc81389=$gameTroop['members']()[_0x309473];if(!_0xc81389)continue;_0xc81389[_0x29fd33(0x229)]();}}),PluginManager[_0x7669a6(0x237)](pluginData['name'],_0x7669a6(0x16e),_0x48278e=>{const _0x121565=_0x7669a6;VisuMZ[_0x121565(0x23c)](_0x48278e,_0x48278e);const _0x17ab71=_0x48278e[_0x121565(0x97)];$gameSystem['setBattleSystemATBFieldGaugeVisible'](_0x17ab71);}),VisuMZ[_0x7669a6(0x1af)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x7669a6(0x1a3)]['onDatabaseLoaded'],Scene_Boot['prototype'][_0x7669a6(0x1fb)]=function(){const _0x4781db=_0x7669a6;this[_0x4781db(0x189)](),VisuMZ[_0x4781db(0x1af)][_0x4781db(0xce)][_0x4781db(0xdf)](this),this[_0x4781db(0x1d4)]();},VisuMZ['BattleSystemATB'][_0x7669a6(0xc9)]={},Scene_Boot[_0x7669a6(0x1a3)][_0x7669a6(0x189)]=function(){const _0x2abd0f=_0x7669a6,_0x3cfb68=VisuMZ['BattleCore'][_0x2abd0f(0xc9)],_0x3a50b5='<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>',_0x4b42dc=[_0x2abd0f(0x204),_0x2abd0f(0x16c),_0x2abd0f(0x1ca)];for(const _0x2d3493 of _0x4b42dc){const _0x3ae8a7=_0x3a50b5[_0x2abd0f(0x10b)](_0x2d3493[_0x2abd0f(0x1f2)]()['trim'](),'(?:ATB|TPB)',_0x2abd0f(0x14a)),_0x19b519=new RegExp(_0x3ae8a7,'i');VisuMZ[_0x2abd0f(0x1af)]['RegExp'][_0x2d3493]=_0x19b519;}},Scene_Boot[_0x7669a6(0x1a3)][_0x7669a6(0x1d4)]=function(){const _0x399606=_0x7669a6;if(VisuMZ[_0x399606(0x227)])return;const _0x26481e=$dataSkills[_0x399606(0xed)]($dataItems);for(const _0x5be8ad of _0x26481e){if(!_0x5be8ad)continue;VisuMZ[_0x399606(0x1af)][_0x399606(0x11b)](_0x5be8ad);}},VisuMZ['BattleSystemATB'][_0x7669a6(0x238)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x7669a6(0x238)]=function(_0x19c475){const _0x421520=_0x7669a6;VisuMZ[_0x421520(0x1af)][_0x421520(0x238)][_0x421520(0xdf)](this,_0x19c475),VisuMZ['BattleSystemATB']['Parse_Notetags_CreateJS'](_0x19c475);},VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0x98)]=VisuMZ[_0x7669a6(0x98)],VisuMZ['ParseItemNotetags']=function(_0x310518){const _0x5c00f2=_0x7669a6;VisuMZ[_0x5c00f2(0x1af)][_0x5c00f2(0x98)][_0x5c00f2(0xdf)](this,_0x310518),VisuMZ['BattleSystemATB']['Parse_Notetags_CreateJS'](_0x310518);},VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0x11b)]=function(_0x3ff3d9){const _0x12fa4d=_0x7669a6,_0x1fab9b=[_0x12fa4d(0x204),_0x12fa4d(0x16c),_0x12fa4d(0x1ca)];for(const _0x217560 of _0x1fab9b){VisuMZ[_0x12fa4d(0x1af)][_0x12fa4d(0x23f)](_0x3ff3d9,_0x217560);}},VisuMZ[_0x7669a6(0x1af)]['JS']={},VisuMZ['BattleSystemATB'][_0x7669a6(0x23f)]=function(_0x3770aa,_0x4289a4){const _0x830064=_0x7669a6,_0x36ea87=_0x3770aa[_0x830064(0x202)];if(_0x36ea87[_0x830064(0x12f)](VisuMZ[_0x830064(0x1af)][_0x830064(0xc9)][_0x4289a4])){const _0x41e3cd=String(RegExp['$1']),_0x552785=_0x830064(0xf2)[_0x830064(0x10b)](_0x41e3cd,_0x4289a4),_0x52a5b9=VisuMZ[_0x830064(0x1af)][_0x830064(0x136)](_0x3770aa,_0x4289a4);VisuMZ[_0x830064(0x1af)]['JS'][_0x52a5b9]=new Function(_0x552785);}},VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0x136)]=function(_0x5cf222,_0xdfa3c3){const _0x43da8a=_0x7669a6;let _0x518471='';if($dataActors[_0x43da8a(0x234)](_0x5cf222))_0x518471=_0x43da8a(0xdb)[_0x43da8a(0x10b)](_0x5cf222['id'],_0xdfa3c3);if($dataClasses[_0x43da8a(0x234)](_0x5cf222))_0x518471=_0x43da8a(0x151)[_0x43da8a(0x10b)](_0x5cf222['id'],_0xdfa3c3);if($dataSkills[_0x43da8a(0x234)](_0x5cf222))_0x518471=_0x43da8a(0x162)[_0x43da8a(0x10b)](_0x5cf222['id'],_0xdfa3c3);if($dataItems[_0x43da8a(0x234)](_0x5cf222))_0x518471=_0x43da8a(0x1c4)['format'](_0x5cf222['id'],_0xdfa3c3);if($dataWeapons[_0x43da8a(0x234)](_0x5cf222))_0x518471='Weapon-%1-%2'['format'](_0x5cf222['id'],_0xdfa3c3);if($dataArmors['includes'](_0x5cf222))_0x518471=_0x43da8a(0xfc)['format'](_0x5cf222['id'],_0xdfa3c3);if($dataEnemies[_0x43da8a(0x234)](_0x5cf222))_0x518471='Enemy-%1-%2'[_0x43da8a(0x10b)](_0x5cf222['id'],_0xdfa3c3);if($dataStates[_0x43da8a(0x234)](_0x5cf222))_0x518471='State-%1-%2'[_0x43da8a(0x10b)](_0x5cf222['id'],_0xdfa3c3);return _0x518471;},ConfigManager['visualAtbGauge']=!![],VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0x181)]=ConfigManager[_0x7669a6(0x146)],ConfigManager['makeData']=function(){const _0x27ef2a=_0x7669a6,_0x1ed7fb=VisuMZ[_0x27ef2a(0x1af)][_0x27ef2a(0x181)][_0x27ef2a(0xdf)](this);return _0x1ed7fb[_0x27ef2a(0xa9)]=this[_0x27ef2a(0xa9)],_0x1ed7fb;},VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0xb8)]=ConfigManager['applyData'],ConfigManager[_0x7669a6(0x1ba)]=function(_0x1ec0b1){const _0x322f6f=_0x7669a6;VisuMZ[_0x322f6f(0x1af)][_0x322f6f(0xb8)]['call'](this,_0x1ec0b1),_0x322f6f(0xa9)in _0x1ec0b1?this[_0x322f6f(0xa9)]=_0x1ec0b1[_0x322f6f(0xa9)]:this[_0x322f6f(0xa9)]=!![];},TextManager[_0x7669a6(0xa9)]=VisuMZ['BattleSystemATB'][_0x7669a6(0x19c)][_0x7669a6(0x17a)][_0x7669a6(0x1ce)],VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0xbf)]=ColorManager[_0x7669a6(0x1e6)],ColorManager['loadWindowskin']=function(){const _0x2d02ee=_0x7669a6;VisuMZ[_0x2d02ee(0x1af)]['ColorManager_loadWindowskin'][_0x2d02ee(0xdf)](this),this[_0x2d02ee(0x9e)][_0x2d02ee(0x22a)](this[_0x2d02ee(0x147)]['bind'](this));},ColorManager[_0x7669a6(0xda)]=function(_0x59160d){const _0x1367bd=_0x7669a6;return _0x59160d=String(_0x59160d),_0x59160d[_0x1367bd(0x12f)](/#(.*)/i)?_0x1367bd(0xae)[_0x1367bd(0x10b)](String(RegExp['$1'])):this[_0x1367bd(0x154)](Number(_0x59160d));},ColorManager['setupBattleSystemATBColors']=function(){const _0x297af8=_0x7669a6,_0x51df4a=[_0x297af8(0xd8),_0x297af8(0x22f),'cast',_0x297af8(0xaa),_0x297af8(0x123),_0x297af8(0xe7)],_0x1f2c00=VisuMZ['BattleSystemATB'][_0x297af8(0x19c)][_0x297af8(0x207)];this['_atbColors']={};for(const _0x543411 of _0x51df4a){for(let _0x1e3c9a=0x1;_0x1e3c9a<=0x2;_0x1e3c9a++){const _0x37bcac=_0x543411+_0x1e3c9a;this[_0x297af8(0xde)][_0x37bcac]=this[_0x297af8(0xda)](_0x1f2c00[_0x37bcac]);}}},ColorManager[_0x7669a6(0x111)]=function(_0x222f32){const _0x51a709=_0x7669a6;if(this['_atbColors']===undefined)this[_0x51a709(0x147)]();return this[_0x51a709(0xde)][_0x222f32]||_0x51a709(0x233);},SceneManager[_0x7669a6(0x1cb)]=function(){const _0xff90ea=_0x7669a6;return this[_0xff90ea(0x23e)]&&this['_scene'][_0xff90ea(0x126)]===Scene_Battle;},BattleManager[_0x7669a6(0xe4)]=function(){const _0xdd7e3c=_0x7669a6;if(Imported[_0xdd7e3c(0xbe)]&&this[_0xdd7e3c(0x1dd)]())return![];return this[_0xdd7e3c(0x105)]();},VisuMZ['BattleSystemATB'][_0x7669a6(0xe9)]=BattleManager[_0x7669a6(0x208)],BattleManager[_0x7669a6(0x208)]=function(){const _0x5b1189=_0x7669a6;if(!this['isTpb']())return![];else return ConfigManager&&ConfigManager['atbActive']!==undefined?ConfigManager[_0x5b1189(0x18d)]:VisuMZ[_0x5b1189(0x1af)]['BattleManager_isActiveTpb'][_0x5b1189(0xdf)](this);},VisuMZ[_0x7669a6(0x1af)]['Game_System_initialize']=Game_System[_0x7669a6(0x1a3)][_0x7669a6(0x19f)],Game_System[_0x7669a6(0x1a3)][_0x7669a6(0x19f)]=function(){const _0x2219f4=_0x7669a6;VisuMZ['BattleSystemATB'][_0x2219f4(0x15f)][_0x2219f4(0xdf)](this),this[_0x2219f4(0xcc)]();},Game_System['prototype']['initBattleSystemATB']=function(){const _0x44bf94=_0x7669a6;this[_0x44bf94(0x1c1)]=!![];},Game_System[_0x7669a6(0x1a3)][_0x7669a6(0x178)]=function(){const _0x1fa124=_0x7669a6;return this[_0x1fa124(0x1c1)]===undefined&&this[_0x1fa124(0xcc)](),this[_0x1fa124(0x1c1)];},Game_System[_0x7669a6(0x1a3)]['setBattleSystemATBFieldGaugeVisible']=function(_0x397b5b){const _0x377dc8=_0x7669a6;this[_0x377dc8(0x1c1)]===undefined&&this[_0x377dc8(0xcc)](),this['_atbFieldGaugeVisible']=_0x397b5b;},VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0x11e)]=Game_Action[_0x7669a6(0x1a3)][_0x7669a6(0x242)],Game_Action[_0x7669a6(0x1a3)][_0x7669a6(0x242)]=function(_0x3dcfc8){const _0x3298f2=_0x7669a6;VisuMZ[_0x3298f2(0x1af)][_0x3298f2(0x11e)][_0x3298f2(0xdf)](this,_0x3dcfc8),this[_0x3298f2(0x10c)](_0x3dcfc8);},Game_Action[_0x7669a6(0x1a3)][_0x7669a6(0x10c)]=function(_0x1fe63c){const _0x2e991d=_0x7669a6;if(!SceneManager[_0x2e991d(0x1cb)]())return;if(!BattleManager['isATB']())return;if(this[_0x2e991d(0xab)]())this[_0x2e991d(0x13b)](_0x1fe63c);},Game_Action[_0x7669a6(0x1a3)][_0x7669a6(0x13b)]=function(_0x247254){const _0x58c95a=_0x7669a6,_0x3c8f26=this[_0x58c95a(0xab)]()['note'];if(_0x247254[_0x58c95a(0xff)]()){const _0x5f056a=VisuMZ[_0x58c95a(0x1af)]['createKeyJS'](this['item'](),_0x58c95a(0x204));if(VisuMZ[_0x58c95a(0x1af)]['JS'][_0x5f056a]){const _0x48e0fe=VisuMZ[_0x58c95a(0x1af)]['JS'][_0x5f056a]['call'](this,this[_0x58c95a(0x1e4)](),_0x247254);_0x247254[_0x58c95a(0x1d1)](_0x48e0fe);}_0x3c8f26[_0x58c95a(0x12f)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x247254[_0x58c95a(0x1d1)](Number(RegExp['$1'])*0.01),_0x3c8f26[_0x58c95a(0x12f)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x247254[_0x58c95a(0x17e)](Number(RegExp['$1'])*0.01);}else{if(_0x247254[_0x58c95a(0x12a)]()){const _0x2c4eee=VisuMZ[_0x58c95a(0x1af)][_0x58c95a(0x136)](this[_0x58c95a(0xab)](),'Cast');if(VisuMZ[_0x58c95a(0x1af)]['JS'][_0x2c4eee]){const _0x162a74=VisuMZ['BattleSystemATB']['JS'][_0x2c4eee][_0x58c95a(0xdf)](this,this[_0x58c95a(0x1e4)](),_0x247254);_0x247254[_0x58c95a(0x11c)](_0x162a74);}_0x3c8f26[_0x58c95a(0x12f)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x247254[_0x58c95a(0x11c)](Number(RegExp['$1'])*0.01),_0x3c8f26[_0x58c95a(0x12f)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x247254[_0x58c95a(0x9b)](Number(RegExp['$1'])*0.01),_0x3c8f26[_0x58c95a(0x12f)](/<(?:ATB|TPB) INTERRUPT>/i)&&_0x247254[_0x58c95a(0x169)]();}}},VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0x246)]=Game_Action['prototype'][_0x7669a6(0x17d)],Game_Action['prototype']['applyGlobal']=function(){const _0x1d89d7=_0x7669a6;VisuMZ[_0x1d89d7(0x1af)]['Game_Action_applyGlobal'][_0x1d89d7(0xdf)](this),this[_0x1d89d7(0x209)]();},Game_Action['prototype'][_0x7669a6(0x209)]=function(){const _0x4d04ef=_0x7669a6;if(!this[_0x4d04ef(0xab)]())return;if(!BattleManager[_0x4d04ef(0xe4)]())return;const _0x47b117=this[_0x4d04ef(0xab)]()['note'];let _0x29c6ea=0x0;this[_0x4d04ef(0x145)]&&(_0x29c6ea=this['subject']()[_0x4d04ef(0x176)]);const _0x38bc3d=VisuMZ[_0x4d04ef(0x1af)]['createKeyJS'](this[_0x4d04ef(0xab)](),_0x4d04ef(0x1ca));VisuMZ[_0x4d04ef(0x1af)]['JS'][_0x38bc3d]&&(_0x29c6ea+=VisuMZ[_0x4d04ef(0x1af)]['JS'][_0x38bc3d][_0x4d04ef(0xdf)](this,this[_0x4d04ef(0x1e4)](),this[_0x4d04ef(0x1e4)]()));let _0x5787ae=this[_0x4d04ef(0xab)]()[_0x4d04ef(0xa1)]>0x0?this[_0x4d04ef(0xab)]()[_0x4d04ef(0xa1)]:0x0;if(this[_0x4d04ef(0xc8)]())_0x5787ae+=this[_0x4d04ef(0x1e4)]()[_0x4d04ef(0x22e)]();_0x29c6ea+=(_0x5787ae/0xfa0)[_0x4d04ef(0x149)](0x0,0x1);this['item']()['note'][_0x4d04ef(0x12f)](/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x29c6ea+=Number(RegExp['$1'])*0.01);const _0x49de5e=this[_0x4d04ef(0x1e4)]()[_0x4d04ef(0x21a)]()[_0x4d04ef(0xed)](this[_0x4d04ef(0x1e4)]()['skills']()),_0x330882=/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x54019b=_0x49de5e['map'](_0x18e0d2=>_0x18e0d2&&_0x18e0d2[_0x4d04ef(0x202)][_0x4d04ef(0x12f)](_0x330882)?Number(RegExp['$1'])*0.01:0x0);_0x29c6ea=_0x54019b[_0x4d04ef(0x20f)]((_0x52c4d4,_0x20a670)=>_0x52c4d4+_0x20a670,_0x29c6ea),this[_0x4d04ef(0xab)]()[_0x4d04ef(0x202)]['match'](/<(?:ATB|TPB) INSTANT>/i)&&(_0x29c6ea=0xa),this[_0x4d04ef(0x1e4)]()[_0x4d04ef(0x18e)](_0x29c6ea);},Game_BattlerBase[_0x7669a6(0x1a3)][_0x7669a6(0x1d1)]=function(_0x1e44be){const _0x5db8a2=_0x7669a6;this[_0x5db8a2(0x176)]=_0x1e44be[_0x5db8a2(0x149)](0x0,0x1);},Game_BattlerBase[_0x7669a6(0x1a3)]['changeAtbChargeTime']=function(_0x5b529c){const _0x1a87eb=_0x7669a6;this[_0x1a87eb(0x1d1)](this['_tpbChargeTime']+_0x5b529c);},Game_BattlerBase[_0x7669a6(0x1a3)][_0x7669a6(0x11c)]=function(_0x130bb3){const _0x5db709=_0x7669a6,_0x33bd3d=this[_0x5db709(0xdd)]();this[_0x5db709(0x1bc)]=(_0x33bd3d*_0x130bb3)[_0x5db709(0x149)](0x0,_0x33bd3d);},Game_BattlerBase[_0x7669a6(0x1a3)][_0x7669a6(0x9b)]=function(_0x20e497){const _0x48f69b=_0x7669a6,_0xdde9cf=this[_0x48f69b(0xdd)](),_0x1aadaf=_0xdde9cf*_0x20e497;this[_0x48f69b(0x1bc)]=(this[_0x48f69b(0x1bc)]+_0x1aadaf)[_0x48f69b(0x149)](0x0,_0xdde9cf);},VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0xe1)]=Game_Battler[_0x7669a6(0x1a3)][_0x7669a6(0x143)],Game_Battler['prototype'][_0x7669a6(0x143)]=function(_0x38e147){const _0x511f76=_0x7669a6;BattleManager[_0x511f76(0xe4)]()?this[_0x511f76(0xa6)](_0x38e147):VisuMZ['BattleSystemATB'][_0x511f76(0xe1)]['call'](this,_0x38e147);},Game_Battler[_0x7669a6(0x1a3)][_0x7669a6(0xa6)]=function(_0x458f8d){const _0x1dd8f7=_0x7669a6,_0xfb5408=VisuMZ[_0x1dd8f7(0x1af)][_0x1dd8f7(0x19c)][_0x1dd8f7(0x164)];let _0xb16abc=this[_0x1dd8f7(0x1a7)]()*eval(_0xfb5408['InitialGaugeJS']);const _0x2538a9=this['traitObjects']()['concat'](this[_0x1dd8f7(0xec)]()),_0x3e1e5a=/<(?:ATB|TPB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x1e5a82=_0x2538a9[_0x1dd8f7(0x14c)](_0x36a46b=>_0x36a46b&&_0x36a46b[_0x1dd8f7(0x202)][_0x1dd8f7(0x12f)](_0x3e1e5a)?Number(RegExp['$1'])*0.01:0x0);_0xb16abc=_0x1e5a82['reduce']((_0x53665d,_0x265e8e)=>_0x53665d+_0x265e8e,_0xb16abc),this['_tpbState']=_0x1dd8f7(0x16d),this[_0x1dd8f7(0x176)]=(_0x458f8d?0x1:_0xb16abc)['clamp'](0x0,0x1),this[_0x1dd8f7(0x114)]()&&(this['_tpbChargeTime']=0x0);},Game_Battler['prototype'][_0x7669a6(0xff)]=function(){const _0x1813bc=_0x7669a6;return this[_0x1813bc(0xc2)]===_0x1813bc(0x16d);},Game_Battler[_0x7669a6(0x1a3)][_0x7669a6(0x12a)]=function(){const _0x5903b2=_0x7669a6;return this['_tpbState']==='casting'&&this[_0x5903b2(0x150)]()&&this[_0x5903b2(0x150)]()[_0x5903b2(0xab)]()&&this[_0x5903b2(0x150)]()['item']()[_0x5903b2(0xa1)]<0x0;},Game_BattlerBase[_0x7669a6(0x1a3)][_0x7669a6(0xb4)]=function(){const _0x20893c=_0x7669a6;return this[_0x20893c(0x12a)]()?this[_0x20893c(0x1bc)]/this[_0x20893c(0xdd)]():0x0;},Game_Battler[_0x7669a6(0x1a3)]['atbStopped']=function(){const _0x6af526=_0x7669a6;return!this[_0x6af526(0x205)]();},Game_Battler[_0x7669a6(0x1a3)]['setAtbAfterSpeed']=function(_0x476bb0){this['_atbAfterSpeed']=_0x476bb0;},VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0x235)]=Game_Battler[_0x7669a6(0x1a3)][_0x7669a6(0x1e7)],Game_Battler[_0x7669a6(0x1a3)]['clearTpbChargeTime']=function(){const _0x28be8c=_0x7669a6;if(this['_onRestrictBypassAtbReset'])return;VisuMZ[_0x28be8c(0x1af)][_0x28be8c(0x235)]['call'](this),this[_0x28be8c(0x176)]+=this[_0x28be8c(0x206)]||0x0;},Game_Battler[_0x7669a6(0x1a3)][_0x7669a6(0x169)]=function(){const _0x2026a2=_0x7669a6;if(!this[_0x2026a2(0x12a)]())return;if(!this['currentAction']())return;if(!this[_0x2026a2(0x150)]()['item']())return;if(this[_0x2026a2(0x150)]()['item']()[_0x2026a2(0x202)]['match'](/<(?:ATB|TPB) CANNOT (?:BE INTERRUPTED|INTERRUPT)>/i))return;this[_0x2026a2(0x160)](),this[_0x2026a2(0x1e7)](),this[_0x2026a2(0x1bc)]=0x0,this[_0x2026a2(0x210)]();},Game_Battler[_0x7669a6(0x1a3)]['onAtbInterrupt']=function(){const _0x569d99=_0x7669a6,_0x1b395b=VisuMZ[_0x569d99(0x1af)]['Settings'][_0x569d99(0xf1)];if(Imported[_0x569d99(0x198)]){const _0x584d36=_0x1b395b[_0x569d99(0x21e)],_0x56f624=_0x1b395b['InterruptMirror'],_0x25a747=_0x1b395b[_0x569d99(0x142)];$gameTemp['requestFauxAnimation']([this],_0x584d36,_0x56f624,_0x25a747);}if(this[_0x569d99(0x187)]()&&_0x1b395b[_0x569d99(0x17c)][_0x569d99(0x109)]>0x0){const _0x2beadf=_0x1b395b[_0x569d99(0x17c)],_0x55edc6={'textColor':ColorManager[_0x569d99(0xda)](_0x1b395b['InterruptTextColor']),'flashColor':_0x1b395b[_0x569d99(0x144)],'flashDuration':_0x1b395b[_0x569d99(0x18f)]};this[_0x569d99(0x1b1)](_0x2beadf,_0x55edc6);}},VisuMZ['BattleSystemATB'][_0x7669a6(0x1ea)]=Game_Battler[_0x7669a6(0x1a3)][_0x7669a6(0x125)],Game_Battler[_0x7669a6(0x1a3)][_0x7669a6(0x125)]=function(){const _0x329de3=_0x7669a6;!VisuMZ[_0x329de3(0x1af)][_0x329de3(0x19c)][_0x329de3(0x164)][_0x329de3(0x1ff)]&&(this[_0x329de3(0xa5)]=BattleManager[_0x329de3(0xe4)]()),VisuMZ[_0x329de3(0x1af)]['Game_Battler_onRestrict'][_0x329de3(0xdf)](this),this['_onRestrictBypassAtbReset']=undefined;},VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0x103)]=Game_Battler[_0x7669a6(0x1a3)][_0x7669a6(0x1be)],Game_Battler[_0x7669a6(0x1a3)][_0x7669a6(0x1be)]=function(){const _0x220c5e=_0x7669a6;BattleManager[_0x220c5e(0xe4)]()?this[_0x220c5e(0x20b)]():VisuMZ[_0x220c5e(0x1af)]['Game_Battler_applyTpbPenalty'][_0x220c5e(0xdf)](this);},Game_Battler['prototype'][_0x7669a6(0x20b)]=function(){const _0x214a9b=_0x7669a6;this[_0x214a9b(0xc2)]=_0x214a9b(0x16d),this[_0x214a9b(0x176)]+=VisuMZ[_0x214a9b(0x1af)][_0x214a9b(0x19c)][_0x214a9b(0x164)]['EscapeFailPenalty']||0x0;},VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0xac)]=Game_Battler[_0x7669a6(0x1a3)][_0x7669a6(0xe2)],Game_Battler[_0x7669a6(0x1a3)][_0x7669a6(0xe2)]=function(){const _0x242e98=_0x7669a6;return BattleManager[_0x242e98(0xe4)]()?VisuMZ[_0x242e98(0x1af)][_0x242e98(0x19c)][_0x242e98(0x164)][_0x242e98(0xc5)][_0x242e98(0xdf)](this,this):VisuMZ[_0x242e98(0x1af)][_0x242e98(0xac)][_0x242e98(0xdf)](this);},VisuMZ['BattleSystemATB'][_0x7669a6(0x1c8)]=Game_Battler['prototype'][_0x7669a6(0x221)],Game_Battler[_0x7669a6(0x1a3)]['tpbBaseSpeed']=function(){const _0x2041a8=_0x7669a6;return BattleManager[_0x2041a8(0xe4)]()?VisuMZ[_0x2041a8(0x1af)][_0x2041a8(0x19c)]['Mechanics'][_0x2041a8(0x1f7)][_0x2041a8(0xdf)](this,this):VisuMZ['BattleSystemATB'][_0x2041a8(0x1c8)][_0x2041a8(0xdf)](this);},VisuMZ[_0x7669a6(0x1af)]['Game_Battler_tpbRelativeSpeed']=Game_Battler['prototype']['tpbRelativeSpeed'],Game_Battler['prototype'][_0x7669a6(0x1a7)]=function(){const _0x10f61d=_0x7669a6;return BattleManager[_0x10f61d(0xe4)]()?VisuMZ[_0x10f61d(0x1af)][_0x10f61d(0x19c)]['Mechanics'][_0x10f61d(0xc6)][_0x10f61d(0xdf)](this,this):VisuMZ[_0x10f61d(0x1af)][_0x10f61d(0x1e9)]['call'](this);},VisuMZ['BattleSystemATB'][_0x7669a6(0x104)]=Game_Battler[_0x7669a6(0x1a3)][_0x7669a6(0x18a)],Game_Battler['prototype'][_0x7669a6(0x18a)]=function(){const _0x16ed8e=_0x7669a6;return BattleManager[_0x16ed8e(0xe4)]()?this['atbAcceleration']():VisuMZ[_0x16ed8e(0x1af)][_0x16ed8e(0x104)]['call'](this);},Game_Battler[_0x7669a6(0x1a3)][_0x7669a6(0x140)]=function(){const _0x66e567=_0x7669a6;let _0x12b8f4=VisuMZ[_0x66e567(0x1af)]['Settings'][_0x66e567(0x164)][_0x66e567(0x1ec)][_0x66e567(0xdf)](this,this);if(ConfigManager&&ConfigManager[_0x66e567(0xf6)]!==undefined){const _0x532a64=ConfigManager[_0x66e567(0xf6)]-0x3;if(_0x532a64>0x0)return _0x12b8f4*(_0x532a64*0x2);else{if(_0x532a64<0x0)return _0x12b8f4*(0x1/(_0x532a64*-0x2));}}return _0x12b8f4;},VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0x236)]=Game_Battler[_0x7669a6(0x1a3)]['tpbRequiredCastTime'],Game_Battler[_0x7669a6(0x1a3)][_0x7669a6(0xdd)]=function(){const _0x58dc01=_0x7669a6;return BattleManager[_0x58dc01(0xe4)]()?VisuMZ[_0x58dc01(0x1af)][_0x58dc01(0x19c)][_0x58dc01(0x164)][_0x58dc01(0x22d)]['call'](this,this):VisuMZ[_0x58dc01(0x1af)][_0x58dc01(0x236)][_0x58dc01(0xdf)](this);},VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0x199)]=Scene_Options['prototype'][_0x7669a6(0xd5)],Scene_Options[_0x7669a6(0x1a3)][_0x7669a6(0xd5)]=function(){const _0x401629=_0x7669a6;let _0x27cdb2=VisuMZ[_0x401629(0x1af)]['Scene_Options_maxCommands'][_0x401629(0xdf)](this);const _0x21d0bc=VisuMZ[_0x401629(0x1af)][_0x401629(0x19c)];if(_0x21d0bc[_0x401629(0x17a)][_0x401629(0x14f)]&&_0x21d0bc[_0x401629(0x17a)][_0x401629(0x13f)]&&BattleManager[_0x401629(0xe4)]())_0x27cdb2++;return _0x27cdb2;},Sprite_Battler[_0x7669a6(0x1a3)]['createAtbGaugeSprite']=function(){const _0x9b41d2=_0x7669a6;if(!BattleManager['isATB']())return;if(!ConfigManager[_0x9b41d2(0xa9)])return;const _0x285dfb=VisuMZ[_0x9b41d2(0x1af)][_0x9b41d2(0x19c)][_0x9b41d2(0x19d)],_0x27133e=new Sprite_Gauge();_0x27133e[_0x9b41d2(0xf5)]['x']=_0x285dfb[_0x9b41d2(0x213)],_0x27133e['anchor']['y']=_0x285dfb[_0x9b41d2(0x243)],_0x27133e[_0x9b41d2(0x159)]['x']=_0x27133e[_0x9b41d2(0x159)]['y']=_0x285dfb[_0x9b41d2(0x167)],this[_0x9b41d2(0x224)]=_0x27133e,this[_0x9b41d2(0x1e5)](this['_atbGaugeSprite']);},VisuMZ[_0x7669a6(0x1af)]['Sprite_Battler_setBattler']=Sprite_Battler[_0x7669a6(0x1a3)][_0x7669a6(0x107)],Sprite_Battler[_0x7669a6(0x1a3)][_0x7669a6(0x107)]=function(_0x48d1ea){const _0x31c636=_0x7669a6;VisuMZ[_0x31c636(0x1af)][_0x31c636(0x11a)][_0x31c636(0xdf)](this,_0x48d1ea),this['setupAtbGaugeSprite'](_0x48d1ea);},Sprite_Battler[_0x7669a6(0x1a3)][_0x7669a6(0x116)]=function(_0x448f02){const _0x5a7f31=_0x7669a6;if(!_0x448f02)return;if(!this[_0x5a7f31(0x224)])return;if(_0x448f02[_0x5a7f31(0x1f4)]()){}else{if(_0x448f02[_0x5a7f31(0xcb)]()){if(this[_0x5a7f31(0x126)]===Sprite_Enemy&&_0x448f02[_0x5a7f31(0x21b)]())return;if(this[_0x5a7f31(0x126)]===Sprite_SvEnemy&&!_0x448f02[_0x5a7f31(0x21b)]())return;}}this['_atbGaugeSprite'][_0x5a7f31(0xba)](_0x448f02,'time');},VisuMZ[_0x7669a6(0x1af)]['Sprite_Battler_updateMain']=Sprite_Battler[_0x7669a6(0x1a3)][_0x7669a6(0x1a0)],Sprite_Battler['prototype'][_0x7669a6(0x1a0)]=function(){const _0x3d9926=_0x7669a6;VisuMZ[_0x3d9926(0x1af)][_0x3d9926(0x185)]['call'](this),this['updateAtbGaugeSpritePosition']();},Sprite_Battler[_0x7669a6(0x1a3)]['updateAtbGaugeSpritePosition']=function(){const _0x2d0f5a=_0x7669a6;if(!this[_0x2d0f5a(0x16f)])return;if(!this[_0x2d0f5a(0x224)])return;const _0x1fbbb1=VisuMZ[_0x2d0f5a(0x1af)][_0x2d0f5a(0x19c)][_0x2d0f5a(0x19d)],_0x1d7f09=this[_0x2d0f5a(0x224)];let _0x240b6e=_0x1fbbb1[_0x2d0f5a(0x171)];this[_0x2d0f5a(0x16f)][_0x2d0f5a(0x121)]&&(_0x240b6e+=this[_0x2d0f5a(0x16f)]['battleUIOffsetX']());let _0x44f5d1=_0x1fbbb1['OffsetY'];this['_battler'][_0x2d0f5a(0x1bf)]&&(_0x44f5d1+=this['_battler']['battleUIOffsetY']()),_0x1d7f09['x']=_0x240b6e,_0x1d7f09['y']=-this[_0x2d0f5a(0x182)]+_0x44f5d1,this[_0x2d0f5a(0x16f)][_0x2d0f5a(0xcb)]()&&(this[_0x2d0f5a(0x16f)]['enemy']()[_0x2d0f5a(0x202)][_0x2d0f5a(0x12f)](/<HIDE (?:ATB|TPB) GAUGE>/i)&&(_0x1d7f09[_0x2d0f5a(0x148)]=![])),this[_0x2d0f5a(0x232)]()&&(_0x1d7f09['y']+=_0x1d7f09[_0x2d0f5a(0x1eb)]()*_0x1fbbb1[_0x2d0f5a(0x167)]-0x1),this[_0x2d0f5a(0x159)]['x']<0x0&&(_0x1d7f09[_0x2d0f5a(0x159)]['x']=-Math[_0x2d0f5a(0x15a)](_0x1d7f09[_0x2d0f5a(0x159)]['x']));},Sprite_Battler[_0x7669a6(0x1a3)][_0x7669a6(0x232)]=function(){const _0xa8dc22=_0x7669a6;if(!Imported[_0xa8dc22(0x1d5)])return![];if(this[_0xa8dc22(0x16f)]&&this[_0xa8dc22(0x16f)][_0xa8dc22(0xcb)]())return![];const _0x2ce466=VisuMZ['AggroControlSystem'][_0xa8dc22(0x19c)][_0xa8dc22(0x1d9)];if(!_0x2ce466[_0xa8dc22(0x1b8)])return![];if(!ConfigManager['aggroGauge'])return![];const _0xd1a208=VisuMZ['BattleSystemATB'][_0xa8dc22(0x19c)][_0xa8dc22(0x19d)];return _0x2ce466[_0xa8dc22(0x167)]===_0xd1a208[_0xa8dc22(0x167)]&&_0x2ce466[_0xa8dc22(0x213)]===_0xd1a208[_0xa8dc22(0x213)]&&_0x2ce466[_0xa8dc22(0x243)]===_0xd1a208[_0xa8dc22(0x243)]&&_0x2ce466[_0xa8dc22(0x171)]===_0xd1a208[_0xa8dc22(0x171)]&&_0x2ce466[_0xa8dc22(0xbb)]===_0xd1a208[_0xa8dc22(0xbb)]&&!![];},VisuMZ[_0x7669a6(0x1af)]['Sprite_Actor_createStateSprite']=Sprite_Actor[_0x7669a6(0x1a3)][_0x7669a6(0x1dc)],Sprite_Actor['prototype'][_0x7669a6(0x1dc)]=function(){const _0x29075c=_0x7669a6;VisuMZ['BattleSystemATB'][_0x29075c(0x195)][_0x29075c(0xdf)](this),VisuMZ['BattleSystemATB'][_0x29075c(0x19c)][_0x29075c(0x19d)][_0x29075c(0x1f5)]&&this[_0x29075c(0xc4)]();},VisuMZ['BattleSystemATB'][_0x7669a6(0x15d)]=Sprite_Enemy[_0x7669a6(0x1a3)]['createStateIconSprite'],Sprite_Enemy['prototype']['createStateIconSprite']=function(){const _0x5e9d87=_0x7669a6;VisuMZ['BattleSystemATB']['Settings'][_0x5e9d87(0x19d)][_0x5e9d87(0x1cf)]&&this[_0x5e9d87(0xc4)](),VisuMZ[_0x5e9d87(0x1af)][_0x5e9d87(0x15d)][_0x5e9d87(0xdf)](this);},VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0x110)]=Sprite_Gauge[_0x7669a6(0x1a3)][_0x7669a6(0x183)],Sprite_Gauge['prototype']['gaugeColor1']=function(){const _0x4a1e72=_0x7669a6;if(this[_0x4a1e72(0x1e1)]===_0x4a1e72(0x128))return this[_0x4a1e72(0x22b)](0x1);return VisuMZ[_0x4a1e72(0x1af)][_0x4a1e72(0x110)][_0x4a1e72(0xdf)](this);},VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0x17b)]=Sprite_Gauge['prototype'][_0x7669a6(0x188)],Sprite_Gauge[_0x7669a6(0x1a3)][_0x7669a6(0x188)]=function(){const _0x116ce8=_0x7669a6;if(this[_0x116ce8(0x1e1)]===_0x116ce8(0x128))return this['atbGaugeColor'](0x2);return VisuMZ[_0x116ce8(0x1af)][_0x116ce8(0x17b)][_0x116ce8(0xdf)](this);},Sprite_Gauge[_0x7669a6(0x1a3)][_0x7669a6(0x22b)]=function(_0xcee514){const _0x587cb9=_0x7669a6;if(!this[_0x587cb9(0x16f)])return ColorManager[_0x587cb9(0x111)]('default%1'[_0x587cb9(0x10b)](_0xcee514));if(this[_0x587cb9(0x16f)][_0x587cb9(0x155)]())return ColorManager[_0x587cb9(0x111)](_0x587cb9(0x13e)[_0x587cb9(0x10b)](_0xcee514));if(this[_0x587cb9(0x16f)][_0x587cb9(0x12a)]())return ColorManager[_0x587cb9(0x111)]('cast%1'['format'](_0xcee514));if(this['gaugeRate']()>=0x1)return ColorManager[_0x587cb9(0x111)]('full%1'[_0x587cb9(0x10b)](_0xcee514));const _0x110ca6=VisuMZ[_0x587cb9(0x1af)][_0x587cb9(0x19c)][_0x587cb9(0x19d)],_0x3b8beb=this[_0x587cb9(0x16f)]['paramRate'](0x6)*this['_battler'][_0x587cb9(0x13d)](0x6);if(_0x3b8beb<=_0x110ca6['SlowRate'])return ColorManager[_0x587cb9(0x111)](_0x587cb9(0xa4)[_0x587cb9(0x10b)](_0xcee514));if(_0x3b8beb>=_0x110ca6['FastRate'])return ColorManager[_0x587cb9(0x111)](_0x587cb9(0x170)[_0x587cb9(0x10b)](_0xcee514));return ColorManager[_0x587cb9(0x111)]('default%1'[_0x587cb9(0x10b)](_0xcee514));},VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0x239)]=Sprite_Gauge[_0x7669a6(0x1a3)]['currentValue'],Sprite_Gauge[_0x7669a6(0x1a3)][_0x7669a6(0x1c2)]=function(){const _0x4d615e=_0x7669a6;if(this[_0x4d615e(0x16f)]&&this['_statusType']===_0x4d615e(0x128))return this['atbCurrentValue']();return VisuMZ[_0x4d615e(0x1af)][_0x4d615e(0x239)][_0x4d615e(0xdf)](this);},Sprite_Gauge['prototype']['atbCurrentValue']=function(){const _0x8852d3=_0x7669a6;return this[_0x8852d3(0x16f)][_0x8852d3(0x12a)]()?Math[_0x8852d3(0x166)](this['_battler'][_0x8852d3(0x1bc)],0x0):VisuMZ[_0x8852d3(0x1af)][_0x8852d3(0x239)]['call'](this);},VisuMZ[_0x7669a6(0x1af)]['Sprite_Gauge_currentMaxValue']=Sprite_Gauge[_0x7669a6(0x1a3)][_0x7669a6(0x1bd)],Sprite_Gauge['prototype'][_0x7669a6(0x1bd)]=function(){const _0x12545e=_0x7669a6;if(this[_0x12545e(0x16f)]&&this[_0x12545e(0x1e1)]===_0x12545e(0x128))return this[_0x12545e(0x158)]();return VisuMZ['BattleSystemATB'][_0x12545e(0x1a9)][_0x12545e(0xdf)](this);},Sprite_Gauge['prototype'][_0x7669a6(0x158)]=function(){const _0x476e2d=_0x7669a6;return this['_battler']['isAtbCastingState']()?Math['max'](this[_0x476e2d(0x16f)][_0x476e2d(0xdd)](),0x1):VisuMZ['BattleSystemATB'][_0x476e2d(0x1a9)][_0x476e2d(0xdf)](this);},VisuMZ[_0x7669a6(0x1af)]['Window_Help_setItem']=Window_Help['prototype'][_0x7669a6(0x1a5)],Window_Help[_0x7669a6(0x1a3)][_0x7669a6(0x1a5)]=function(_0x4d20ba){const _0x13b1b3=_0x7669a6;BattleManager['isATB']()&&_0x4d20ba&&_0x4d20ba[_0x13b1b3(0x202)]&&_0x4d20ba[_0x13b1b3(0x202)]['match'](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i)?this[_0x13b1b3(0x1fd)](String(RegExp['$1'])):VisuMZ['BattleSystemATB'][_0x13b1b3(0x191)]['call'](this,_0x4d20ba);},VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0xd7)]=Window_StatusBase[_0x7669a6(0x1a3)][_0x7669a6(0x222)],Window_StatusBase[_0x7669a6(0x1a3)]['placeGauge']=function(_0x229d0a,_0x57a559,_0xf687b6,_0x13cee4){const _0x2fd108=_0x7669a6;if(!this[_0x2fd108(0x184)](_0x57a559))return;VisuMZ['BattleSystemATB'][_0x2fd108(0xd7)][_0x2fd108(0xdf)](this,_0x229d0a,_0x57a559,_0xf687b6,_0x13cee4);},Window_StatusBase[_0x7669a6(0x1a3)]['showVisualAtbGauge']=function(_0x1ae172){const _0x4b714e=_0x7669a6;if(_0x1ae172!=='time')return!![];if(this[_0x4b714e(0x126)]!==Window_BattleStatus)return![];if(!BattleManager[_0x4b714e(0xe4)]())return![];if(!ConfigManager[_0x4b714e(0xa9)])return![];return VisuMZ[_0x4b714e(0x1af)]['Settings'][_0x4b714e(0x19d)]['ShowStatusGauge'];},VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0x1a6)]=Window_Options[_0x7669a6(0x1a3)][_0x7669a6(0xd6)],Window_Options[_0x7669a6(0x1a3)][_0x7669a6(0xd6)]=function(){const _0xd0225a=_0x7669a6;VisuMZ[_0xd0225a(0x1af)]['Window_Options_addGeneralOptions'][_0xd0225a(0xdf)](this),this[_0xd0225a(0xf4)]();},Window_Options[_0x7669a6(0x1a3)][_0x7669a6(0xf4)]=function(){const _0x861677=_0x7669a6;if(!BattleManager[_0x861677(0xe4)]())return;VisuMZ[_0x861677(0x1af)]['Settings']['Options'][_0x861677(0x14f)]&&this[_0x861677(0x1e0)]();},Window_Options[_0x7669a6(0x1a3)]['addBattleSystemATBShowGaugeCommand']=function(){const _0xb44715=_0x7669a6,_0x20539b=TextManager[_0xb44715(0xa9)],_0x264318=_0xb44715(0xa9);this['addCommand'](_0x20539b,_0x264318);},Game_BattlerBase[_0x7669a6(0x1a3)][_0x7669a6(0x229)]=function(){const _0x5c173e=_0x7669a6;delete this['_fieldAtbGaugeGraphicType'],delete this[_0x5c173e(0xc0)],delete this[_0x5c173e(0x23d)],delete this[_0x5c173e(0x1b4)];},Game_BattlerBase[_0x7669a6(0x1a3)][_0x7669a6(0x138)]=function(){const _0x2cca87=_0x7669a6;return this[_0x2cca87(0x1de)]===undefined&&(this['_fieldAtbGaugeGraphicType']=this['createFieldAtbGraphicType']()),this[_0x2cca87(0x1de)];},Game_BattlerBase[_0x7669a6(0x1a3)]['createFieldAtbGraphicType']=function(){const _0xc3d12b=_0x7669a6;return Sprite_FieldGaugeATB[_0xc3d12b(0x19c)][_0xc3d12b(0x1a8)];},Game_BattlerBase['prototype'][_0x7669a6(0x9a)]=function(){const _0x301950=_0x7669a6;return this[_0x301950(0xc0)]===undefined&&(this[_0x301950(0xc0)]=this[_0x301950(0xf9)]()),this[_0x301950(0xc0)];},Game_BattlerBase[_0x7669a6(0x1a3)]['createFieldAtbGraphicFaceName']=function(){const _0x40c8cc=_0x7669a6;return Sprite_FieldGaugeATB[_0x40c8cc(0x19c)][_0x40c8cc(0xd1)];},Game_BattlerBase[_0x7669a6(0x1a3)][_0x7669a6(0x10e)]=function(){const _0x14e4a0=_0x7669a6;return this[_0x14e4a0(0x23d)]===undefined&&(this[_0x14e4a0(0x23d)]=this[_0x14e4a0(0x19a)]()),this[_0x14e4a0(0x23d)];},Game_BattlerBase[_0x7669a6(0x1a3)][_0x7669a6(0x19a)]=function(){const _0x36bae3=_0x7669a6;return Sprite_FieldGaugeATB[_0x36bae3(0x19c)][_0x36bae3(0x117)];},Game_BattlerBase[_0x7669a6(0x1a3)]['fieldAtbGraphicIconIndex']=function(){const _0x263858=_0x7669a6;return this[_0x263858(0x1b4)]===undefined&&(this[_0x263858(0x1b4)]=this[_0x263858(0xd3)]()),this[_0x263858(0x1b4)];},Game_BattlerBase[_0x7669a6(0x1a3)][_0x7669a6(0xd3)]=function(){const _0x376e03=_0x7669a6;return Sprite_FieldGaugeATB[_0x376e03(0x19c)][_0x376e03(0xf0)];},Game_BattlerBase[_0x7669a6(0x1a3)]['setAtbGraphicIconIndex']=function(_0x2d2593){this['_fieldAtbGaugeIconIndex']=_0x2d2593;},Game_Actor[_0x7669a6(0x1a3)][_0x7669a6(0x1f0)]=function(){const _0x260f7a=_0x7669a6,_0x32dc90=this['actor']()[_0x260f7a(0x202)];if(_0x32dc90[_0x260f7a(0x12f)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x32dc90['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x260f7a(0x18b);}return Sprite_FieldGaugeATB[_0x260f7a(0x19c)]['ActorBattlerType'];},Game_Actor[_0x7669a6(0x1a3)]['fieldAtbGraphicFaceName']=function(){const _0x14bcfa=_0x7669a6,_0x47158b=this[_0x14bcfa(0x11f)]()[_0x14bcfa(0x202)];if(_0x47158b[_0x14bcfa(0x12f)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x14bcfa(0x1e8)]();},Game_Actor[_0x7669a6(0x1a3)][_0x7669a6(0x10e)]=function(){const _0x57afb2=_0x7669a6,_0x1a2abe=this[_0x57afb2(0x11f)]()[_0x57afb2(0x202)];if(_0x1a2abe['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this['faceIndex']();},Game_Actor[_0x7669a6(0x1a3)][_0x7669a6(0xd3)]=function(){const _0x2d4005=_0x7669a6,_0x1fc48a=this[_0x2d4005(0x11f)]()['note'];if(_0x1fc48a[_0x2d4005(0x12f)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB['Settings'][_0x2d4005(0x23b)];},Game_Enemy[_0x7669a6(0x1a3)][_0x7669a6(0x1f0)]=function(){const _0x1f72ab=_0x7669a6,_0x23288f=this[_0x1f72ab(0x1ac)]()[_0x1f72ab(0x202)];if(_0x23288f['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x1f72ab(0xfe);else{if(_0x23288f['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return'icon';}return Sprite_FieldGaugeATB[_0x1f72ab(0x19c)][_0x1f72ab(0x1a8)];},Game_Enemy['prototype'][_0x7669a6(0xf9)]=function(){const _0x33c149=_0x7669a6,_0x462187=this['enemy']()[_0x33c149(0x202)];if(_0x462187['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Sprite_FieldGaugeATB[_0x33c149(0x19c)]['EnemyBattlerFaceName'];},Game_Enemy[_0x7669a6(0x1a3)]['createFieldAtbGraphicFaceIndex']=function(){const _0x1a52af=_0x7669a6,_0x4e1fa9=this[_0x1a52af(0x1ac)]()[_0x1a52af(0x202)];if(_0x4e1fa9[_0x1a52af(0x12f)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Sprite_FieldGaugeATB[_0x1a52af(0x19c)]['EnemyBattlerFaceIndex'];},Game_Enemy[_0x7669a6(0x1a3)][_0x7669a6(0xd3)]=function(){const _0xa6574e=_0x7669a6,_0x553e02=this[_0xa6574e(0x1ac)]()[_0xa6574e(0x202)];if(_0x553e02[_0xa6574e(0x12f)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB[_0xa6574e(0x19c)][_0xa6574e(0xf0)];},VisuMZ[_0x7669a6(0x1af)][_0x7669a6(0x124)]=Scene_Battle[_0x7669a6(0x1a3)][_0x7669a6(0x122)],Scene_Battle[_0x7669a6(0x1a3)]['createAllWindows']=function(){const _0x332571=_0x7669a6;this[_0x332571(0x130)](),VisuMZ['BattleSystemATB'][_0x332571(0x124)][_0x332571(0xdf)](this),this[_0x332571(0x220)]();},Scene_Battle[_0x7669a6(0x1a3)][_0x7669a6(0x130)]=function(){const _0x51a891=_0x7669a6;if(!BattleManager[_0x51a891(0xe4)]())return;if(!Sprite_FieldGaugeATB['Settings'][_0x51a891(0x175)])return;if(!ConfigManager[_0x51a891(0xa9)])return;this['_fieldGaugeATB_Container']=new Window_Base(new Rectangle(0x0,0x0,0x0,0x0));const _0x100cd8=this[_0x51a891(0x10a)](this[_0x51a891(0x211)]);this['addChildAt'](this['_fieldGaugeATB_Container'],_0x100cd8);},Scene_Battle[_0x7669a6(0x1a3)][_0x7669a6(0x220)]=function(){const _0x42f4aa=_0x7669a6;if(!BattleManager[_0x42f4aa(0xe4)]())return;if(!Sprite_FieldGaugeATB[_0x42f4aa(0x19c)][_0x42f4aa(0x175)])return;if(!ConfigManager[_0x42f4aa(0xa9)])return;this['_fieldGaugeATB']=new Sprite_FieldGaugeATB(),this[_0x42f4aa(0x196)][_0x42f4aa(0x1e5)](this[_0x42f4aa(0xf8)]);};function Sprite_FieldGaugeATB(){const _0x20728c=_0x7669a6;this[_0x20728c(0x19f)](...arguments);}Sprite_FieldGaugeATB[_0x7669a6(0x1a3)]=Object['create'](Sprite[_0x7669a6(0x1a3)]),Sprite_FieldGaugeATB['prototype'][_0x7669a6(0x126)]=Sprite_FieldGaugeATB,Sprite_FieldGaugeATB[_0x7669a6(0x19c)]=JsonEx[_0x7669a6(0x139)](VisuMZ['BattleSystemATB'][_0x7669a6(0x19c)][_0x7669a6(0x1d2)]),Sprite_FieldGaugeATB['prototype'][_0x7669a6(0x19f)]=function(){const _0xd9b9b6=_0x7669a6;Sprite[_0xd9b9b6(0x1a3)][_0xd9b9b6(0x19f)][_0xd9b9b6(0xdf)](this),this[_0xd9b9b6(0x1b0)](),this[_0xd9b9b6(0x1b9)](),this[_0xd9b9b6(0x161)]();},Sprite_FieldGaugeATB[_0x7669a6(0x1a3)][_0x7669a6(0x1b0)]=function(){const _0x47edac=_0x7669a6;this[_0x47edac(0xf5)]['x']=0.5,this[_0x47edac(0xf5)]['y']=0.5;},Sprite_FieldGaugeATB[_0x7669a6(0x1a3)][_0x7669a6(0xf7)]=function(){const _0xacd5d1=_0x7669a6;if(this['_horz']!==undefined)return this['_horz'];const _0x554f06=Sprite_FieldGaugeATB[_0xacd5d1(0x19c)]['DisplayPosition'];return this[_0xacd5d1(0x1a2)]=[_0xacd5d1(0x1d0),_0xacd5d1(0x9d)][_0xacd5d1(0x234)](_0x554f06),this['_horz'];},Sprite_FieldGaugeATB['prototype'][_0x7669a6(0x1b9)]=function(){const _0x5f4fd2=_0x7669a6,_0x4fc182=Sprite_FieldGaugeATB['Settings'][_0x5f4fd2(0x10f)][_0x5f4fd2(0xa8)]()['trim'](),_0x3251bb=Window_Base[_0x5f4fd2(0x1a3)][_0x5f4fd2(0x241)](),_0x4b9bbe=SceneManager['_scene']['_statusWindow']['height']+Math['round'](_0x3251bb*0.5);this['_homeX']=0x0,this['_homeY']=0x0;switch(_0x4fc182){case _0x5f4fd2(0x1d0):this[_0x5f4fd2(0x153)]=Math[_0x5f4fd2(0xa3)](Graphics[_0x5f4fd2(0x225)]*0.5),this[_0x5f4fd2(0x129)]=0x60;break;case _0x5f4fd2(0x9d):this[_0x5f4fd2(0x153)]=Math[_0x5f4fd2(0xa3)](Graphics['boxWidth']*0.5),this['_homeY']=Graphics[_0x5f4fd2(0xb3)]-_0x4b9bbe;break;case _0x5f4fd2(0x186):this[_0x5f4fd2(0x153)]=0x50,this[_0x5f4fd2(0x129)]=Math['round']((Graphics[_0x5f4fd2(0xb3)]-_0x4b9bbe)/0x2);break;case _0x5f4fd2(0x1a1):this['_homeX']=Graphics[_0x5f4fd2(0x225)]-0x50,this[_0x5f4fd2(0x129)]=Math['round']((Graphics['boxHeight']-_0x4b9bbe)/0x2);break;}this[_0x5f4fd2(0x153)]+=Sprite_FieldGaugeATB[_0x5f4fd2(0x19c)]['DisplayOffsetX']||0x0,this[_0x5f4fd2(0x129)]+=Sprite_FieldGaugeATB[_0x5f4fd2(0x19c)][_0x5f4fd2(0xaf)]||0x0,this['x']=this[_0x5f4fd2(0x153)],this['y']=this[_0x5f4fd2(0x129)];},Sprite_FieldGaugeATB[_0x7669a6(0x1a3)]['createChildren']=function(){const _0x5c31f5=_0x7669a6;this[_0x5c31f5(0x244)](),this[_0x5c31f5(0x219)](),this[_0x5c31f5(0xbd)]();},Sprite_FieldGaugeATB[_0x7669a6(0x1a3)][_0x7669a6(0x244)]=function(){const _0x154bb0=_0x7669a6;this[_0x154bb0(0xef)]=new Sprite(),this['_skinSprite'][_0x154bb0(0xf5)]['x']=0.5,this[_0x154bb0(0xef)][_0x154bb0(0xf5)]['y']=0.5,this[_0x154bb0(0x1e5)](this[_0x154bb0(0xef)]);const _0x170bbf=Sprite_FieldGaugeATB[_0x154bb0(0x19c)]['GaugeSystemSkin'];if(_0x170bbf)this['_skinSprite'][_0x154bb0(0x1d6)]=ImageManager[_0x154bb0(0x23a)](_0x170bbf);},Sprite_FieldGaugeATB[_0x7669a6(0x1a3)][_0x7669a6(0x219)]=function(){const _0x4d73c9=_0x7669a6;this[_0x4d73c9(0x179)]=new Sprite(),this[_0x4d73c9(0x1e5)](this[_0x4d73c9(0x179)]),this[_0x4d73c9(0x1aa)]();},Sprite_FieldGaugeATB[_0x7669a6(0x1a3)][_0x7669a6(0x1aa)]=function(){const _0x35c88d=_0x7669a6,_0x20442c=Sprite_FieldGaugeATB['Settings'],_0xdb5857=this[_0x35c88d(0xf7)](),_0xa6cd18=_0xdb5857?_0x20442c['GaugeLengthHorz']:_0x20442c[_0x35c88d(0x1ae)],_0xc334ae=_0xdb5857?_0x20442c['GaugeThick']:_0x20442c[_0x35c88d(0x180)];this[_0x35c88d(0x179)][_0x35c88d(0x1d6)]=new Bitmap(_0xa6cd18,_0xc334ae),this['drawGaugeBitmap'](),this['_gaugeSprite']['x']=Math[_0x35c88d(0x12c)](_0xa6cd18/-0x2),this['_gaugeSprite']['y']=Math[_0x35c88d(0x12c)](_0xc334ae/-0x2);},Sprite_FieldGaugeATB[_0x7669a6(0x1a3)][_0x7669a6(0xd2)]=function(){const _0x5a8a7a=_0x7669a6;if(!Sprite_FieldGaugeATB[_0x5a8a7a(0x19c)]['DrawGauge'])return;const _0xa2afd6=Sprite_FieldGaugeATB[_0x5a8a7a(0x19c)],_0x265375=this[_0x5a8a7a(0x179)][_0x5a8a7a(0x1d6)],_0x1ebe7=_0x265375[_0x5a8a7a(0x108)],_0x2d83fa=_0x265375[_0x5a8a7a(0x182)],_0x14a70f=ColorManager[_0x5a8a7a(0x1fc)](),_0x3e3cf8=ColorManager[_0x5a8a7a(0x12d)](),_0x2c833f=ColorManager[_0x5a8a7a(0x203)](),_0x12d13f=ColorManager[_0x5a8a7a(0x111)](_0x5a8a7a(0xb0)),_0x1d4e89=ColorManager[_0x5a8a7a(0x111)]('cast2'),_0x3d579b=this[_0x5a8a7a(0xf7)](),_0x524415=_0xa2afd6['GaugeDirection'],_0x39376b=_0xa2afd6['GaugeSplit']['clamp'](0x0,0x1),_0x5c9424=Math['ceil'](((_0x3d579b?_0x1ebe7:_0x2d83fa)-0x2)*_0x39376b);_0x265375[_0x5a8a7a(0x152)](0x0,0x0,_0x1ebe7,_0x2d83fa,_0x14a70f);let _0x243333=0x0,_0x456296=0x0,_0x1a44a2=0x0,_0x7eab62=0x0;if(_0x3d579b&&_0x524415)_0x243333=_0x5c9424-0x1,_0x1a44a2=_0x1ebe7-0x3-_0x243333,_0x265375[_0x5a8a7a(0xe6)](0x1,0x1,_0x243333,_0x2d83fa-0x2,_0x3e3cf8,_0x2c833f,![]),_0x265375[_0x5a8a7a(0xe6)](0x2+_0x243333,0x1,_0x1a44a2,_0x2d83fa-0x2,_0x12d13f,_0x1d4e89,![]);else{if(_0x3d579b&&!_0x524415)_0x243333=_0x5c9424-0x1,_0x1a44a2=_0x1ebe7-0x3-_0x243333,_0x265375['gradientFillRect'](0x2+_0x1a44a2,0x1,_0x243333,_0x2d83fa-0x2,_0x3e3cf8,_0x2c833f,![]),_0x265375[_0x5a8a7a(0xe6)](0x1,0x1,_0x1a44a2,_0x2d83fa-0x2,_0x12d13f,_0x1d4e89,![]);else{if(!_0x3d579b&&_0x524415)_0x456296=_0x5c9424-0x1,_0x7eab62=_0x2d83fa-0x3-_0x456296,_0x265375[_0x5a8a7a(0xe6)](0x1,0x1,_0x1ebe7-0x2,_0x456296,_0x3e3cf8,_0x2c833f,!![]),_0x265375[_0x5a8a7a(0xe6)](0x1,0x2+_0x456296,_0x1ebe7-0x2,_0x7eab62,_0x12d13f,_0x1d4e89,!![]);else!_0x3d579b&&!_0x524415&&(_0x456296=_0x5c9424-0x1,_0x7eab62=_0x2d83fa-0x3-_0x456296,_0x265375[_0x5a8a7a(0xe6)](0x1,0x2+_0x7eab62,_0x1ebe7-0x2,_0x456296,_0x3e3cf8,_0x2c833f,!![]),_0x265375['gradientFillRect'](0x1,0x1,_0x1ebe7-0x2,_0x7eab62,_0x12d13f,_0x1d4e89,!![]));}}},Sprite_FieldGaugeATB[_0x7669a6(0x1a3)][_0x7669a6(0xbd)]=function(){const _0x422808=_0x7669a6;this[_0x422808(0x112)]&&this[_0x422808(0x179)]['removeChild'](this[_0x422808(0x112)]),this[_0x422808(0x112)]=new Sprite(),this[_0x422808(0x179)][_0x422808(0x1e5)](this['_battlerContainer']),this[_0x422808(0xb5)]();},Sprite_FieldGaugeATB['prototype'][_0x7669a6(0xb5)]=function(){const _0x10b358=_0x7669a6;this[_0x10b358(0xfa)](),this[_0x10b358(0xd0)]();},Sprite_FieldGaugeATB[_0x7669a6(0x1a3)]['createEnemySprites']=function(){const _0x1d8425=_0x7669a6,_0x519ac9=$gameTroop[_0x1d8425(0x137)](),_0x478510=_0x519ac9[_0x1d8425(0x109)];for(let _0x56243a=0x0;_0x56243a<_0x478510;_0x56243a++){this[_0x1d8425(0xd4)](_0x56243a,$gameTroop);}},Sprite_FieldGaugeATB[_0x7669a6(0x1a3)]['createActorSprites']=function(){const _0x4bd295=_0x7669a6,_0x3f7c90=$gameParty['maxBattleMembers']();for(let _0x587391=0x0;_0x587391<_0x3f7c90;_0x587391++){this[_0x4bd295(0xd4)](_0x587391,$gameParty);}},Sprite_FieldGaugeATB[_0x7669a6(0x1a3)][_0x7669a6(0xd4)]=function(_0x162b04,_0x42b43a){const _0x164703=_0x7669a6,_0x40745f=new Sprite_FieldMarkerATB(_0x162b04,_0x42b43a,this['_gaugeSprite']);this[_0x164703(0x112)]['addChild'](_0x40745f);},Sprite_FieldGaugeATB['prototype'][_0x7669a6(0x101)]=function(){const _0x283edd=_0x7669a6;Sprite[_0x283edd(0x1a3)][_0x283edd(0x101)][_0x283edd(0xdf)](this),this[_0x283edd(0x115)](),this[_0x283edd(0x1f9)](),this['updateVisibility']();},Sprite_FieldGaugeATB[_0x7669a6(0x1a3)][_0x7669a6(0x115)]=function(){const _0x476dc0=_0x7669a6,_0x1743a9=Sprite_FieldGaugeATB['Settings'];if(_0x1743a9[_0x476dc0(0x10f)]!==_0x476dc0(0x1d0))return;if(!_0x1743a9[_0x476dc0(0x245)])return;const _0x49e098=SceneManager[_0x476dc0(0x23e)][_0x476dc0(0xe3)];if(!_0x49e098)return;_0x49e098['visible']?(this['x']=this[_0x476dc0(0x153)]+(_0x1743a9['RepositionTopHelpX']||0x0),this['y']=this['_homeY']+(_0x1743a9['RepositionTopHelpY']||0x0)):(this['x']=this[_0x476dc0(0x153)],this['y']=this[_0x476dc0(0x129)]);const _0x4324ba=SceneManager[_0x476dc0(0x23e)][_0x476dc0(0x211)];this['x']+=_0x4324ba['x'],this['y']+=_0x4324ba['y'];},Sprite_FieldGaugeATB['prototype'][_0x7669a6(0x1f9)]=function(){const _0x45f799=_0x7669a6;if(!this[_0x45f799(0x112)])return;const _0x1c117b=this['_battlerContainer'][_0x45f799(0x1a4)];if(!_0x1c117b)return;_0x1c117b[_0x45f799(0x200)](this[_0x45f799(0x231)][_0x45f799(0x9f)](this));},Sprite_FieldGaugeATB[_0x7669a6(0x1a3)][_0x7669a6(0x231)]=function(_0x33e208,_0x4b1769){const _0x489e1d=_0x7669a6,_0xfb3cd3=this[_0x489e1d(0xf7)](),_0xb105c4=Sprite_FieldGaugeATB[_0x489e1d(0x19c)][_0x489e1d(0x1e2)];if(_0xfb3cd3&&_0xb105c4)return _0x33e208['x']-_0x4b1769['x'];else{if(_0xfb3cd3&&!_0xb105c4)return _0x4b1769['x']-_0x33e208['x'];else{if(!_0xfb3cd3&&_0xb105c4)return _0x33e208['y']-_0x4b1769['y'];else{if(!_0xfb3cd3&&!_0xb105c4)return _0x4b1769['y']-_0x33e208['y'];}}}},Sprite_FieldGaugeATB[_0x7669a6(0x1a3)]['updateVisibility']=function(){const _0x4dcb8e=_0x7669a6;this[_0x4dcb8e(0x148)]=$gameSystem[_0x4dcb8e(0x178)]();};function Sprite_FieldMarkerATB(){const _0x549d0a=_0x7669a6;this[_0x549d0a(0x19f)](...arguments);}Sprite_FieldMarkerATB[_0x7669a6(0x1a3)]=Object[_0x7669a6(0x99)](Sprite_Clickable[_0x7669a6(0x1a3)]),Sprite_FieldMarkerATB['prototype']['constructor']=Sprite_FieldMarkerATB,Sprite_FieldMarkerATB[_0x7669a6(0x1a3)]['initialize']=function(_0x1cd453,_0x392849,_0x489008){const _0x49c226=_0x7669a6;this[_0x49c226(0x1b3)]=_0x1cd453,this[_0x49c226(0xe8)]=_0x392849,this[_0x49c226(0x179)]=_0x489008,Sprite_Clickable[_0x49c226(0x1a3)][_0x49c226(0x19f)][_0x49c226(0xdf)](this),this[_0x49c226(0x1b0)](),this[_0x49c226(0x161)](),this[_0x49c226(0xa2)]=this[_0x49c226(0x197)]();},Sprite_FieldMarkerATB[_0x7669a6(0x1a3)][_0x7669a6(0x1b0)]=function(){const _0x23cb69=_0x7669a6;this[_0x23cb69(0xf5)]['x']=0.5,this['anchor']['y']=0.5;},Sprite_FieldMarkerATB['prototype']['createChildren']=function(){const _0x16ad47=_0x7669a6;this[_0x16ad47(0xea)](),this[_0x16ad47(0xcf)](),this[_0x16ad47(0x15e)](),this[_0x16ad47(0x1fe)](),this[_0x16ad47(0x1df)](),this['updatePositionOnGauge'](!![]);},Sprite_FieldMarkerATB['prototype'][_0x7669a6(0xea)]=function(){const _0x363a20=_0x7669a6;if(!Sprite_FieldGaugeATB[_0x363a20(0x19c)][_0x363a20(0x1cd)])return;const _0x405ce4=Sprite_FieldGaugeATB[_0x363a20(0x19c)],_0x20aa7e=this[_0x363a20(0xe8)]===$gameParty?_0x363a20(0x240):_0x363a20(0xb6),_0x19c3f2='%1SystemBg'['format'](_0x20aa7e),_0x36a4a3=new Sprite();_0x36a4a3[_0x363a20(0xf5)]['x']=this['anchor']['x'],_0x36a4a3[_0x363a20(0xf5)]['y']=this[_0x363a20(0xf5)]['y'];if(_0x405ce4[_0x19c3f2])_0x36a4a3[_0x363a20(0x1d6)]=ImageManager['loadSystem'](_0x405ce4[_0x19c3f2]);else{const _0x1cbd91=_0x405ce4[_0x363a20(0xe0)];_0x36a4a3[_0x363a20(0x1d6)]=new Bitmap(_0x1cbd91,_0x1cbd91);const _0x268774=ColorManager[_0x363a20(0xda)](_0x405ce4[_0x363a20(0x21d)['format'](_0x20aa7e)]),_0x2dc538=ColorManager['getColor'](_0x405ce4['%1BgColor2'[_0x363a20(0x10b)](_0x20aa7e)]);_0x36a4a3['bitmap'][_0x363a20(0xe6)](0x0,0x0,_0x1cbd91,_0x1cbd91,_0x268774,_0x2dc538,!![]);}this[_0x363a20(0x13c)]=_0x36a4a3,this[_0x363a20(0x1e5)](this[_0x363a20(0x13c)]),this['width']=this[_0x363a20(0x13c)][_0x363a20(0x108)],this[_0x363a20(0x182)]=this[_0x363a20(0x13c)][_0x363a20(0x182)];},Sprite_FieldMarkerATB[_0x7669a6(0x1a3)][_0x7669a6(0xcf)]=function(){const _0x53bdb9=_0x7669a6,_0x4a7bb4=new Sprite();_0x4a7bb4[_0x53bdb9(0xf5)]['x']=this[_0x53bdb9(0xf5)]['x'],_0x4a7bb4[_0x53bdb9(0xf5)]['y']=this[_0x53bdb9(0xf5)]['y'],this[_0x53bdb9(0x163)]=_0x4a7bb4,this[_0x53bdb9(0x1e5)](this[_0x53bdb9(0x163)]),this[_0x53bdb9(0xdc)]();},Sprite_FieldMarkerATB['prototype']['createBorderSprite']=function(){const _0x127ada=_0x7669a6;if(!Sprite_FieldGaugeATB['Settings'][_0x127ada(0x190)])return;const _0x3f4c5e=Sprite_FieldGaugeATB[_0x127ada(0x19c)],_0x2c79e5=this[_0x127ada(0xe8)]===$gameParty?_0x127ada(0x240):_0x127ada(0xb6),_0x476395='%1SystemBorder'[_0x127ada(0x10b)](_0x2c79e5),_0x133bad=new Sprite();_0x133bad[_0x127ada(0xf5)]['x']=this[_0x127ada(0xf5)]['x'],_0x133bad[_0x127ada(0xf5)]['y']=this[_0x127ada(0xf5)]['y'];if(_0x3f4c5e[_0x476395])_0x133bad[_0x127ada(0x1d6)]=ImageManager[_0x127ada(0x23a)](_0x3f4c5e[_0x476395]);else{let _0x100cf2=_0x3f4c5e['MarkerSize'],_0x543263=_0x3f4c5e[_0x127ada(0x20c)];_0x133bad[_0x127ada(0x1d6)]=new Bitmap(_0x100cf2,_0x100cf2);const _0x2f0539=_0x127ada(0x233),_0x3b299a=ColorManager[_0x127ada(0xda)](_0x3f4c5e[_0x127ada(0x1ab)[_0x127ada(0x10b)](_0x2c79e5)]);_0x133bad[_0x127ada(0x1d6)][_0x127ada(0x152)](0x0,0x0,_0x100cf2,_0x100cf2,_0x2f0539),_0x100cf2-=0x2,_0x133bad['bitmap'][_0x127ada(0x152)](0x1,0x1,_0x100cf2,_0x100cf2,_0x3b299a),_0x100cf2-=_0x543263*0x2,_0x133bad[_0x127ada(0x1d6)][_0x127ada(0x152)](0x1+_0x543263,0x1+_0x543263,_0x100cf2,_0x100cf2,_0x2f0539),_0x100cf2-=0x2,_0x543263+=0x1,_0x133bad[_0x127ada(0x1d6)][_0x127ada(0x156)](0x1+_0x543263,0x1+_0x543263,_0x100cf2,_0x100cf2);}this[_0x127ada(0x13c)]=_0x133bad,this['addChild'](this[_0x127ada(0x13c)]);},Sprite_FieldMarkerATB[_0x7669a6(0x1a3)][_0x7669a6(0x1fe)]=function(){const _0x175b95=_0x7669a6,_0x5ebdb8=Sprite_FieldGaugeATB[_0x175b95(0x19c)];if(!_0x5ebdb8['EnemyBattlerDrawLetter'])return;if(this['_unit']===$gameParty)return;const _0x295bd8=_0x5ebdb8[_0x175b95(0xe0)],_0x16bc1d=new Sprite();_0x16bc1d[_0x175b95(0xf5)]['x']=this[_0x175b95(0xf5)]['x'],_0x16bc1d[_0x175b95(0xf5)]['y']=this[_0x175b95(0xf5)]['y'],_0x16bc1d['bitmap']=new Bitmap(_0x295bd8,_0x295bd8),this[_0x175b95(0x174)]=_0x16bc1d,this['addChild'](this[_0x175b95(0x174)]);},Sprite_FieldMarkerATB[_0x7669a6(0x1a3)][_0x7669a6(0x1df)]=function(){const _0x1ccd5e=_0x7669a6,_0x1849df=Sprite_FieldGaugeATB[_0x1ccd5e(0x19c)];if(!_0x1849df['ShowMarkerArrow'])return;const _0x43805b=new Sprite();_0x43805b[_0x1ccd5e(0xf5)]['x']=this[_0x1ccd5e(0xf5)]['x'],_0x43805b['anchor']['y']=this[_0x1ccd5e(0xf5)]['y'],this[_0x1ccd5e(0xad)](_0x43805b),this[_0x1ccd5e(0x132)]=_0x43805b,this[_0x1ccd5e(0x1e5)](this['_arrowSprite']);},Sprite_FieldMarkerATB[_0x7669a6(0x1a3)][_0x7669a6(0xad)]=function(_0x27024b){const _0x5a6187=_0x7669a6,_0x34dc2b=Sprite_FieldGaugeATB[_0x5a6187(0x19c)],_0x3c21b8=_0x34dc2b[_0x5a6187(0xe0)],_0x340057=Math[_0x5a6187(0xa3)](_0x3c21b8/0x2),_0x546aa6=this[_0x5a6187(0xf7)](),_0x3af7e8=this['_unit']===$gameParty?_0x5a6187(0x240):_0x5a6187(0xb6),_0x3fe4c3=_0x34dc2b[_0x5a6187(0xc3)[_0x5a6187(0x10b)](_0x3af7e8)];_0x27024b['bitmap']=ImageManager[_0x5a6187(0x23a)](_0x34dc2b[_0x5a6187(0x230)]);const _0x400f89=0x18,_0x13ea83=_0x400f89/0x2,_0x84245f=0x60+_0x400f89,_0x5677dc=0x0+_0x400f89;if(_0x546aa6&&_0x3fe4c3)_0x27024b[_0x5a6187(0x1f8)](_0x84245f+_0x13ea83,_0x5677dc+_0x13ea83+_0x400f89,_0x400f89,_0x13ea83),_0x27024b['y']+=_0x340057,_0x27024b[_0x5a6187(0xf5)]['y']=0x0;else{if(_0x546aa6&&!_0x3fe4c3)_0x27024b['setFrame'](_0x84245f+_0x13ea83,_0x5677dc,_0x400f89,_0x13ea83),_0x27024b['y']-=_0x340057,_0x27024b[_0x5a6187(0xf5)]['y']=0x1;else{if(!_0x546aa6&&_0x3fe4c3)_0x27024b[_0x5a6187(0x1f8)](_0x84245f,_0x5677dc+_0x13ea83,_0x13ea83,_0x400f89),_0x27024b['x']-=Math[_0x5a6187(0x12c)](_0x340057*1.75),_0x27024b[_0x5a6187(0xf5)]['x']=0x0;else!_0x546aa6&&!_0x3fe4c3&&(_0x27024b[_0x5a6187(0x1f8)](_0x84245f+_0x400f89+_0x13ea83,_0x5677dc+_0x13ea83,_0x13ea83,_0x400f89),_0x27024b['x']+=Math[_0x5a6187(0x12c)](_0x340057*1.75),_0x27024b[_0x5a6187(0xf5)]['x']=0x1);}}},Sprite_FieldMarkerATB[_0x7669a6(0x1a3)]['battler']=function(){const _0x154216=_0x7669a6;return this[_0x154216(0xe8)]===$gameParty?$gameParty[_0x154216(0x21f)]()[this[_0x154216(0x1b3)]]:$gameTroop[_0x154216(0x137)]()[this[_0x154216(0x1b3)]];},Sprite_FieldMarkerATB[_0x7669a6(0x1a3)][_0x7669a6(0x101)]=function(){const _0x2f5343=_0x7669a6;Sprite_Clickable[_0x2f5343(0x1a3)][_0x2f5343(0x101)][_0x2f5343(0xdf)](this),this[_0x2f5343(0x1c9)](),this[_0x2f5343(0x18c)](),this[_0x2f5343(0x9c)](),this[_0x2f5343(0x127)](),this[_0x2f5343(0x120)](),this['updateLetter'](),this['updateSelectionEffect']();},Sprite_FieldMarkerATB['prototype'][_0x7669a6(0x1c9)]=function(){const _0x53d572=_0x7669a6,_0xf96b1a=this['targetOpacity'](),_0x21d0f4=Sprite_FieldGaugeATB[_0x53d572(0x19c)][_0x53d572(0x11d)];if(this['opacity']>_0xf96b1a)this[_0x53d572(0xa2)]=Math[_0x53d572(0x166)](_0xf96b1a,this[_0x53d572(0xa2)]-_0x21d0f4);else this[_0x53d572(0xa2)]<_0xf96b1a&&(this['opacity']=Math[_0x53d572(0x13a)](_0xf96b1a,this[_0x53d572(0xa2)]+_0x21d0f4));},Sprite_FieldMarkerATB[_0x7669a6(0x1a3)][_0x7669a6(0x197)]=function(){const _0x30e96d=_0x7669a6,_0x3b113b=this[_0x30e96d(0x187)]();if(!_0x3b113b)return 0x0;if(_0x3b113b[_0x30e96d(0x1f1)]())return 0x0;if(_0x3b113b[_0x30e96d(0xb7)]())return 0x0;return 0xff;},Sprite_FieldMarkerATB[_0x7669a6(0x1a3)]['isGaugeHorizontal']=function(){const _0xae7692=_0x7669a6;if(this[_0xae7692(0x1a2)]!==undefined)return this[_0xae7692(0x1a2)];const _0x52c3b6=Sprite_FieldGaugeATB[_0xae7692(0x19c)]['DisplayPosition'];return this[_0xae7692(0x1a2)]=[_0xae7692(0x1d0),_0xae7692(0x9d)][_0xae7692(0x234)](_0x52c3b6),this[_0xae7692(0x1a2)];},Sprite_FieldMarkerATB[_0x7669a6(0x1a3)][_0x7669a6(0x18c)]=function(){const _0x1e0fb7=_0x7669a6,_0x1ca7b8=Sprite_FieldGaugeATB[_0x1e0fb7(0x19c)],_0x754a38=this[_0x1e0fb7(0xf7)](),_0x5c71f9=this[_0x1e0fb7(0xe8)]===$gameParty?_0x1e0fb7(0x240):_0x1e0fb7(0xb6),_0x409a46=_0x1ca7b8[_0x1e0fb7(0x1d3)],_0x4cd69c=_0x1ca7b8['%1Side'[_0x1e0fb7(0x10b)](_0x5c71f9)];_0x754a38?(this['y']=_0x1ca7b8[_0x1e0fb7(0x1ae)]/0x2,this['y']+=_0x4cd69c?-_0x409a46:_0x409a46):(this['x']=_0x1ca7b8[_0x1e0fb7(0x1ae)]/0x2,this['x']+=_0x4cd69c?_0x409a46:-_0x409a46);},Sprite_FieldMarkerATB['prototype']['updatePositionOnGauge']=function(_0x59c58c){const _0xdb8acb=_0x7669a6,_0x5b3c54=this[_0xdb8acb(0x187)]();if(!_0x5b3c54)return;const _0x1bced2=Sprite_FieldGaugeATB['Settings'],_0x316a9d=this[_0xdb8acb(0xf7)](),_0x10ee1a=this[_0xdb8acb(0x1c5)](),_0x4ce445=_0x59c58c?Infinity:_0x1bced2[_0xdb8acb(0x177)];if(_0x316a9d&&this['x']!==_0x10ee1a){if(this['x']>_0x10ee1a)this['x']=Math['max'](_0x10ee1a,this['x']-_0x4ce445);if(this['x']<_0x10ee1a)this['x']=Math['min'](_0x10ee1a,this['x']+_0x4ce445);}else{if(!_0x316a9d&&this['x']!==_0x10ee1a){if(this['y']>_0x10ee1a)this['y']=Math[_0xdb8acb(0x166)](_0x10ee1a,this['y']-_0x4ce445);if(this['y']<_0x10ee1a)this['y']=Math[_0xdb8acb(0x13a)](_0x10ee1a,this['y']+_0x4ce445);}}},Sprite_FieldMarkerATB[_0x7669a6(0x1a3)]['targetPositionOnGauge']=function(){const _0xdde008=_0x7669a6,_0x5e6a65=Sprite_FieldGaugeATB[_0xdde008(0x19c)],_0x3422ea=this[_0xdde008(0x187)](),_0x4d44da=this[_0xdde008(0xf7)](),_0x59447c=this[_0xdde008(0x179)]['bitmap'][_0xdde008(0x108)],_0x4fec97=this[_0xdde008(0x179)][_0xdde008(0x1d6)][_0xdde008(0x182)],_0x365c3f=_0x5e6a65[_0xdde008(0x1d8)][_0xdde008(0x149)](0x0,0x1),_0x47f4ca=_0x5e6a65['GaugeDirection'];let _0x52ace1=_0x3422ea['tpbChargeTime']()*_0x365c3f;_0x52ace1+=(0x1-_0x365c3f)*_0x3422ea[_0xdde008(0xb4)]();if(_0x3422ea===BattleManager[_0xdde008(0x15b)])_0x52ace1=0x1;if(!_0x47f4ca)_0x52ace1=0x1-_0x52ace1;let _0x488d7c=0x0;if(_0x4d44da)_0x488d7c=_0x52ace1*_0x59447c;else!_0x4d44da&&(_0x488d7c=_0x52ace1*_0x4fec97);return Math[_0xdde008(0xa3)](_0x488d7c);},Sprite_FieldMarkerATB['prototype'][_0x7669a6(0x127)]=function(){const _0x19c545=_0x7669a6,_0x9c48c0=this[_0x19c545(0x187)]();if(!_0x9c48c0)return;const _0x528e69=Sprite_FieldGaugeATB[_0x19c545(0x19c)],_0x57cdde=this['_unit']===$gameParty?'Actor':_0x19c545(0xb6);let _0x3e508f=_0x9c48c0[_0x19c545(0x138)]();if(_0x9c48c0[_0x19c545(0x1f4)]()&&_0x3e508f==='enemy')_0x3e508f=_0x19c545(0xfe);else _0x9c48c0[_0x19c545(0xcb)]()&&_0x3e508f===_0x19c545(0x226)&&(_0x3e508f=_0x19c545(0x1ac));if(this['_graphicType']!==_0x3e508f)return this['processUpdateGraphic']();switch(this[_0x19c545(0xa0)]){case'face':if(this[_0x19c545(0xd9)]!==_0x9c48c0[_0x19c545(0x9a)]())return this[_0x19c545(0xdc)]();if(this[_0x19c545(0xbc)]!==_0x9c48c0[_0x19c545(0x10e)]())return this[_0x19c545(0xdc)]();break;case'icon':if(this[_0x19c545(0xeb)]!==_0x9c48c0['fieldAtbGraphicIconIndex']())return this[_0x19c545(0xdc)]();break;case _0x19c545(0x1ac):if(_0x9c48c0['hasSvBattler']()){if(this[_0x19c545(0x1b6)]!==_0x9c48c0[_0x19c545(0x1c0)]())return this[_0x19c545(0xdc)]();}else{if(this[_0x19c545(0x1d7)]!==_0x9c48c0[_0x19c545(0x100)]())return this['processUpdateGraphic']();}break;case _0x19c545(0x226):if(_0x9c48c0[_0x19c545(0x1f4)]()){if(this[_0x19c545(0x1b6)]!==_0x9c48c0[_0x19c545(0x100)]())return this['processUpdateGraphic']();}else{if(this[_0x19c545(0x1d7)]!==_0x9c48c0[_0x19c545(0x100)]())return this[_0x19c545(0xdc)]();}break;}},Sprite_FieldMarkerATB['prototype'][_0x7669a6(0xdc)]=function(){const _0x3aadc8=_0x7669a6,_0x12a12c=this[_0x3aadc8(0x187)]();if(!_0x12a12c)return;this[_0x3aadc8(0xa0)]=_0x12a12c[_0x3aadc8(0x138)]();if(_0x12a12c[_0x3aadc8(0x1f4)]()&&this[_0x3aadc8(0xa0)]===_0x3aadc8(0x1ac))this[_0x3aadc8(0xa0)]=_0x3aadc8(0xfe);else _0x12a12c[_0x3aadc8(0xcb)]()&&this['_graphicType']===_0x3aadc8(0x226)&&(this['_graphicType']=_0x3aadc8(0x1ac));let _0x5d6162;switch(this[_0x3aadc8(0xa0)]){case _0x3aadc8(0xfe):this['_graphicFaceName']=_0x12a12c[_0x3aadc8(0x9a)](),this[_0x3aadc8(0xbc)]=_0x12a12c[_0x3aadc8(0x10e)](),_0x5d6162=ImageManager['loadFace'](this[_0x3aadc8(0xd9)]),_0x5d6162['addLoadListener'](this[_0x3aadc8(0x22c)][_0x3aadc8(0x9f)](this,_0x5d6162));break;case _0x3aadc8(0x18b):this[_0x3aadc8(0xeb)]=_0x12a12c[_0x3aadc8(0xc7)](),_0x5d6162=ImageManager['loadSystem'](_0x3aadc8(0xb2)),_0x5d6162[_0x3aadc8(0x22a)](this[_0x3aadc8(0x1ed)][_0x3aadc8(0x9f)](this,_0x5d6162));break;case _0x3aadc8(0x1ac):if(_0x12a12c[_0x3aadc8(0x21b)]())this[_0x3aadc8(0x1b6)]=_0x12a12c[_0x3aadc8(0x1c0)](),_0x5d6162=ImageManager[_0x3aadc8(0x12b)](this[_0x3aadc8(0x1b6)]),_0x5d6162[_0x3aadc8(0x22a)](this[_0x3aadc8(0x20d)][_0x3aadc8(0x9f)](this,_0x5d6162));else $gameSystem[_0x3aadc8(0x1b2)]()?(this[_0x3aadc8(0x1d7)]=_0x12a12c[_0x3aadc8(0x100)](),_0x5d6162=ImageManager[_0x3aadc8(0x141)](this[_0x3aadc8(0x1d7)]),_0x5d6162['addLoadListener'](this[_0x3aadc8(0xb1)][_0x3aadc8(0x9f)](this,_0x5d6162))):(this[_0x3aadc8(0x1d7)]=_0x12a12c[_0x3aadc8(0x100)](),_0x5d6162=ImageManager[_0x3aadc8(0x20e)](this[_0x3aadc8(0x1d7)]),_0x5d6162[_0x3aadc8(0x22a)](this[_0x3aadc8(0xb1)][_0x3aadc8(0x9f)](this,_0x5d6162)));break;case'svactor':this[_0x3aadc8(0x1b6)]=_0x12a12c[_0x3aadc8(0x100)](),_0x5d6162=ImageManager[_0x3aadc8(0x12b)](this['_graphicSv']),_0x5d6162[_0x3aadc8(0x22a)](this['changeSvActorGraphicBitmap'][_0x3aadc8(0x9f)](this,_0x5d6162));break;}},Sprite_FieldMarkerATB[_0x7669a6(0x1a3)][_0x7669a6(0x22c)]=function(_0x554f16){const _0x26c6a3=_0x7669a6,_0x461a37=Sprite_FieldGaugeATB[_0x26c6a3(0x19c)],_0x46ff81=_0x461a37[_0x26c6a3(0xe0)],_0x3bb62b=this[_0x26c6a3(0xbc)];this[_0x26c6a3(0x163)]['bitmap']=new Bitmap(_0x46ff81,_0x46ff81);const _0x10b300=this[_0x26c6a3(0x163)][_0x26c6a3(0x1d6)],_0x1879f4=ImageManager[_0x26c6a3(0x1ad)],_0xe47c1d=ImageManager[_0x26c6a3(0x1c3)],_0xd10436=ImageManager[_0x26c6a3(0x1ad)],_0x556ae7=ImageManager[_0x26c6a3(0x1c3)],_0x5414db=_0x3bb62b%0x4*_0x1879f4+(_0x1879f4-_0xd10436)/0x2,_0x494f6c=Math['floor'](_0x3bb62b/0x4)*_0xe47c1d+(_0xe47c1d-_0x556ae7)/0x2;_0x10b300[_0x26c6a3(0x1ee)](_0x554f16,_0x5414db,_0x494f6c,_0xd10436,_0x556ae7,0x0,0x0,_0x46ff81,_0x46ff81);},Sprite_FieldMarkerATB[_0x7669a6(0x1a3)][_0x7669a6(0x1ed)]=function(_0x310832){const _0x193866=_0x7669a6,_0x357812=Sprite_FieldGaugeATB['Settings'],_0x263021=_0x357812['MarkerSize'],_0x4aa1e7=this[_0x193866(0xeb)];this['_graphicSprite']['bitmap']=new Bitmap(_0x263021,_0x263021);const _0x3bdb7f=this[_0x193866(0x163)]['bitmap'],_0x4524f4=ImageManager[_0x193866(0x131)],_0x13e6d3=ImageManager['iconHeight'],_0x556be3=_0x4aa1e7%0x10*_0x4524f4,_0x612405=Math[_0x193866(0x212)](_0x4aa1e7/0x10)*_0x13e6d3;_0x3bdb7f[_0x193866(0x1ee)](_0x310832,_0x556be3,_0x612405,_0x4524f4,_0x13e6d3,0x0,0x0,_0x263021,_0x263021);},Sprite_FieldMarkerATB['prototype'][_0x7669a6(0x20d)]=function(_0x284da2){const _0x2087ae=_0x7669a6,_0x42f765=Sprite_FieldGaugeATB[_0x2087ae(0x19c)],_0x2d051b=_0x42f765[_0x2087ae(0xe0)];this[_0x2087ae(0x163)]['bitmap']=new Bitmap(_0x2d051b,_0x2d051b);const _0x5c702=this[_0x2087ae(0x163)][_0x2087ae(0x1d6)],_0x1f212b=0x9,_0x1b4575=0x6,_0x505183=_0x284da2[_0x2087ae(0x108)]/_0x1f212b,_0x4de00a=_0x284da2[_0x2087ae(0x182)]/_0x1b4575,_0x48764f=Math[_0x2087ae(0x13a)](0x1,_0x2d051b/_0x505183,_0x2d051b/_0x4de00a),_0x1344fc=_0x505183*_0x48764f,_0xac292=_0x4de00a*_0x48764f,_0x5b994f=Math['round']((_0x2d051b-_0x1344fc)/0x2),_0x540e74=Math[_0x2087ae(0xa3)]((_0x2d051b-_0xac292)/0x2);_0x5c702[_0x2087ae(0x1ee)](_0x284da2,0x0,0x0,_0x505183,_0x4de00a,_0x5b994f,_0x540e74,_0x1344fc,_0xac292);},Sprite_FieldMarkerATB[_0x7669a6(0x1a3)]['changeEnemyGraphicBitmap']=function(_0x3c24a9){const _0xd33df6=_0x7669a6,_0x168def=Sprite_FieldGaugeATB[_0xd33df6(0x19c)],_0x5df4d3=_0x168def['MarkerSize'];this[_0xd33df6(0x163)][_0xd33df6(0x1d6)]=new Bitmap(_0x5df4d3,_0x5df4d3);const _0x5aefde=this[_0xd33df6(0x163)][_0xd33df6(0x1d6)],_0x48edc1=Math['min'](0x1,_0x5df4d3/_0x3c24a9[_0xd33df6(0x108)],_0x5df4d3/_0x3c24a9[_0xd33df6(0x182)]),_0x24e3df=_0x3c24a9[_0xd33df6(0x108)]*_0x48edc1,_0xbfc6a6=_0x3c24a9[_0xd33df6(0x182)]*_0x48edc1,_0x5e3d56=Math['round']((_0x5df4d3-_0x24e3df)/0x2),_0x37ac66=Math[_0xd33df6(0xa3)]((_0x5df4d3-_0xbfc6a6)/0x2);_0x5aefde['blt'](_0x3c24a9,0x0,0x0,_0x3c24a9[_0xd33df6(0x108)],_0x3c24a9['height'],_0x5e3d56,_0x37ac66,_0x24e3df,_0xbfc6a6);},Sprite_FieldMarkerATB['prototype'][_0x7669a6(0x120)]=function(){const _0x958632=_0x7669a6,_0x2b0e83=this[_0x958632(0x187)]();if(!_0x2b0e83)return;if(!_0x2b0e83[_0x958632(0xcb)]())return;if(this[_0x958632(0xa7)]===_0x2b0e83['battlerHue']())return;this[_0x958632(0xa7)]=_0x2b0e83[_0x958632(0x1bb)]();if(_0x2b0e83[_0x958632(0x21b)]())this[_0x958632(0xa7)]=0x0;this[_0x958632(0x163)]['setHue'](this['_graphicHue']);},Sprite_FieldMarkerATB[_0x7669a6(0x1a3)][_0x7669a6(0x165)]=function(){const _0x4ba52e=_0x7669a6;if(!this[_0x4ba52e(0x174)])return;const _0x1fd351=this['battler']();if(!_0x1fd351)return;if(this[_0x4ba52e(0x216)]===_0x1fd351[_0x4ba52e(0x216)]&&this[_0x4ba52e(0x19e)]===_0x1fd351[_0x4ba52e(0x19e)])return;this[_0x4ba52e(0x216)]=_0x1fd351[_0x4ba52e(0x216)],this['_plural']=_0x1fd351[_0x4ba52e(0x19e)];const _0x50639e=Sprite_FieldGaugeATB[_0x4ba52e(0x19c)],_0x6727a0=_0x50639e[_0x4ba52e(0xe0)],_0x8a0d80=Math[_0x4ba52e(0x212)](_0x6727a0/0x2),_0x239192=this['_letterSprite'][_0x4ba52e(0x1d6)];_0x239192['clear']();if(!this[_0x4ba52e(0x19e)])return;_0x239192[_0x4ba52e(0x19b)]=_0x50639e[_0x4ba52e(0x16a)]||$gameSystem[_0x4ba52e(0x223)](),_0x239192[_0x4ba52e(0x192)]=_0x50639e[_0x4ba52e(0x218)]||0x10,_0x239192[_0x4ba52e(0x1cc)](this[_0x4ba52e(0x216)],0x2,_0x8a0d80,_0x6727a0-0x4,_0x8a0d80-0x2,_0x4ba52e(0x1a1));},Sprite_FieldMarkerATB[_0x7669a6(0x1a3)][_0x7669a6(0x1c7)]=function(){const _0x17c664=_0x7669a6,_0x5b2580=this[_0x17c664(0x187)]();if(!_0x5b2580)return;const _0x490b2a=_0x5b2580[_0x17c664(0x187)]();if(!_0x490b2a)return;const _0xb6f2d4=_0x490b2a[_0x17c664(0x193)]();if(!_0xb6f2d4)return;this[_0x17c664(0x10d)](_0xb6f2d4['_blendColor']);},Sprite_FieldMarkerATB[_0x7669a6(0x1a3)][_0x7669a6(0x194)]=function(){const _0xdaaaa4=_0x7669a6;return this[_0xdaaaa4(0x187)]();};