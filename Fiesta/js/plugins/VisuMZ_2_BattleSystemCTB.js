//=============================================================================
// VisuStella MZ - Battle System CTB - Charge Turn Battle
// VisuMZ_2_BattleSystemCTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemCTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemCTB = VisuMZ.BattleSystemCTB || {};
VisuMZ.BattleSystemCTB.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.06] [BattleSystemCTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_CTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin creates a Charge Turn Battle (CTB) system using RPG Maker MZ's
 * TPB as a base. CTB functions by calculating the speed of every battler and
 * balancing them relative to one another. When it's a battler's turn, the
 * battler will either choose an action to perform immediately or charge it
 * for later depending if the skill requires charging.
 * 
 * This is a battle system where agility plays an important factor in the
 * progress of battle where higher agility values give battlers more advantage
 * and additional turns over lower agility values, which give battlers less
 * advantage and less turns.
 * 
 * A turn order display will appear to compensate for the removal of gauges.
 * The turn order display will show a preview of what the turn order could
 * possibly be like. This turn order display is variable and can be changed
 * due to player and enemy influence by using different action speeds, effects
 * provided by this plugin that alter the turn order, and more!
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB integrated mechanics converted for CTB such as
 *   speed, calculations, etc.
 * * No more waiting for gauges to show up! In fact, you won't even see the
 *   TPB gauge in-game.
 * * A turn order display that previews a potential lineup for how the
 *   participating battlers in battle will play out.
 * * Notetags that give skills and items access to manipulating a battler's
 *   CTB speed.
 * * Notetags that give skills and items access to directly manipulate a target
 *   batter's position on the Turn Order display.
 * * These mechanics are separate from ATB and TPB itself, so you can still use
 *   either battle system without affecting both of them.
 * * Through the Core Engine, you can switch in and out of CTB for a different
 *   battle system.
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
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
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
 * Turn Order Display
 * 
 * Despite the fact that the Battle System CTB plugin uses RPG Maker MZ's TPB
 * as a base, it does not have any gauges to depict the time it takes for a
 * battler's turn to appear. Instead, a turn order display appears on the
 * screen (you pick where it can appear: top, bottom, left, or right) and shows
 * a possible preview of the battler turn order.
 * 
 * This is only a preview of what can happen because lots of different things
 * can influence the position and ordering of the turn order display, ranging
 * from skill/item speeds, notetag effects, changes in AGI, etc. What is seen
 * on the turn order display is the most likely possibility instead of the
 * exact order to occur due to the external influences.
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
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to CTB,
 * skills and items with positive speed values will have an impact on how full
 * their CTB Speed will be in the following turn. A value of 2000 will put the
 * turn at 50% ready, 1000 will put the gauge at 25% ready, 500 will put it at
 * 12.5% ready, and so on. Notetags can also be used to influence this.
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === General CTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <CTB Help>
 *  description
 *  description
 * </CTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under CTB.
 * - This is primarily used if the skill behaves differently in CTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to CTB.
 *
 * ---
 * 
 * === CTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the CTB Turn Order Display
 * 
 * ---
 *
 * <CTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <CTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <CTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === CTB Speed Manipulation-Related Notetags ===
 * 
 * These notetags are used for CTB Speed manipulation purposes.
 * 
 * ---
 *
 * <CTB Set Order: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position to exactly x.
 * - Replace 'x' with a number value depicting the exact position of the turn
 *   order position. 0 is the currently active battler and cannot be used.
 *   1 is closest to taking a turn. Higher numbers are further away.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB Change Order: +x>
 * <CTB Change Order: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position by x slots.
 * - Replace 'x' with a number value indicating the increase or decrease.
 *   Negative values decrease the turns needed to wait while positive values
 *   increase the turns needed.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB After Speed: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's CTB Speed will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   CTB Speed to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <CTB Charge Speed: x%>
 * <CTB Charge Speed: +x%>
 * <CTB Charge Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <CTB Cast Speed: x%>
 * <CTB Cast Speed: +x%>
 * <CTB Cast Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 * 
 * === JavaScript Notetags: CTB Speed Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional CTB Speed Manipulation.
 * 
 * ---
 * 
 * <JS CTB Order>
 *  code
 *  code
 *  order = code;
 * </JS CTB Order>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine where to set the target's
 *   order on the CTB Turn Order Display to.
 * - The 'order' variable represents the final position on the Turn Order
 *   Display to place the target.
 * - The 'position' variable represents the target's current position on the
 *   Turn Order Display.
 * - This does not affect the currently active battler.
 * 
 * ---
 * 
 * <JS CTB Charge Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Charge Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a charging state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS CTB Cast Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Cast Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a casting state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS CTB After Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB After Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to after performing this skill/item action.
 * - The 'rate' variable represents rate value the CTB Speed will change to
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
 * Actor: Change CTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the CTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change CTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the CTB Turn Order.
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
 * Actor: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the actor(s).
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
 * Enemy: Change CTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change CTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
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
 * Enemy: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the enemy(ies).
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
 * System: CTB Turn Order Visibility
 * - Determine the visibility of the CTB Turn Order Display.
 * 
 *   Visibility:
 *   - Changes the visibility of the CTB Turn Order Display.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System CTB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * General
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Initial Speed:
 *   - JavaScript code to determine how much speed to give each battler at the
 *     start of battle.
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
 * Plugin Parameters: Order Change Effects Settings
 * ============================================================================
 * 
 * Whenever the turn order a battler is changed by a CTB Order notetag, play
 * these effects on the target battler. These effects do not play if the order
 * was changed due to speed changes and only through the specific notetags.
 *
 * ---
 *
 * Delay Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is delayed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is delayed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is delayed.
 *
 * ---
 *
 * Delay Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is delayed.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * Rush Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is rushed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is rushed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is rushed.
 *
 * ---
 *
 * Rush Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is rushed.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System CTB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Total Horizontal:
 *   - How many slots do you want to display for top and bottom Turn Order
 *     Display positions?
 * 
 *   Total Vertical:
 *   - How many slots do you want to display for left and right Turn Order
 *     Display positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
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
 * Slot Sprites
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
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
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
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
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
 * Version 1.06: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * ** Added in a built-in anti-softlock check.
 * 
 * Version 1.05: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Optimization Update!
 * ** Uses less resources for turn order display.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change CTB Turn Order Face
 * **** Changes the faces used for the specific actor(s) on the CTB Turn Order.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Turn Order icons no longer stay invisible after rotating out completely.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <CTB Turn Order Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Action times + should no longer freeze the game. Fix made by Yanfly.
 * ** Actors and enemies without actions will no longer softlock the game.
 *    Fix made by Yanfly.
 * ** Auto-battle during CTB should no longer lock the game! Fix by Yanfly.
 * ** Enemies without any actions should no longer cause endless loops.
 *    Fix made by Yanfly.
 * ** SV_Actor graphics on the Turn Order display are now centered.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release: October 19, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderActorIcon
 * @text Actor: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the CTB Turn Order.
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
 * @command CtbTurnOrderActorFace
 * @text Actor: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the CTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderClearActorGraphic
 * @text Actor: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the actor(s).
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
 * @command CtbTurnOrderEnemyIcon
 * @text Enemy: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
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
 * @command CtbTurnOrderEnemyFace
 * @text Enemy: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
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
 * @command CtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the enemy(ies).
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
 * @command SystemTurnOrderVisibility
 * @text System: CTB Turn Order Visibility
 * @desc Determine the visibility of the CTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the CTB Turn Order Display.
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
 * @param BattleSystemCTB
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
 * @desc Mechanics settings used for Battle System CTB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.50","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Effect:struct
 * @text Order Change Effects
 * @type struct<Effect>
 * @desc Effects to play when the Turn Order is changed in CTB.
 * @default {"Delay":"","DelayAnimation":"","DelayAnimationID:num":"54","DelayMirror:eval":"false","DelayMute:eval":"false","DelayPopups":"","DelayPopupText:str":"DELAY","DelayTextColor:str":"25","DelayFlashColor:eval":"[255, 0, 0, 160]","DelayFlashDuration:num":"60","Rush":"","RushAnimation":"","RushAnimationID:num":"51","RushMirror:eval":"false","RushMute:eval":"false","RushPopups":"","RushPopupText:str":"RUSH","RushTextColor:str":"24","RushFlashColor:eval":"[0, 255, 0, 160]","RushFlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System CTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","TotalHorzSprites:num":"16","TotalVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Speed
 * @parent JavaScript
 * @desc JavaScript code to determine how much speed to give
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
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Effect:
 *
 * @param Delay
 * @text Delay Turn Order
 * 
 * @param DelayAnimation
 * @text Animation
 * @parent Delay
 *
 * @param DelayAnimationID:num
 * @text Animation ID
 * @parent DelayAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is delayed.
 * @default 54
 *
 * @param DelayMirror:eval
 * @text Mirror Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayMute:eval
 * @text Mute Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayPopups
 * @text Popups
 * @parent Delay
 *
 * @param DelayPopupText:str
 * @text Text
 * @parent DelayPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is delayed.
 * @default DELAY
 *
 * @param DelayTextColor:str
 * @text Text Color
 * @parent DelayPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param DelayFlashColor:eval
 * @text Flash Color
 * @parent DelayPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param DelayFlashDuration:num
 * @text Flash Duration
 * @parent DelayPopups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Rush
 * @text Rush Turn Order
 * 
 * @param RushAnimation
 * @text Animation
 * @parent Rush
 *
 * @param RushAnimationID:num
 * @text Animation ID
 * @parent RushAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is rushed.
 * @default 51
 *
 * @param RushMirror:eval
 * @text Mirror Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushMute:eval
 * @text Mute Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushPopups
 * @text Popups
 * @parent Rush
 *
 * @param RushPopupText:str
 * @text Text
 * @parent RushPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is rushed.
 * @default RUSH
 *
 * @param RushTextColor:str
 * @text Text Color
 * @parent RushPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param RushFlashColor:eval
 * @text Flash Color
 * @parent RushPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param RushFlashDuration:num
 * @text Flash Duration
 * @parent RushPopups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
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
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 96
 * 
 * @param Slots
 *
 * @param TotalHorzSprites:num
 * @text Total Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param TotalVertSprites:num
 * @text Total Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
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
 * @text Slot Sprites
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
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
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
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
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
 * @default 19
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
 * @default 19
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
 */
//=============================================================================

const _0x1bf1=['isCtbCastingState','windowRect','find','updateOpacity','process_VisuMZ_BattleSystemCTB_JS_Notetags','createTurnOrderCTBGraphicFaceName','defaultPosition','checkCtbAntiSoftlock','_ctbTurnOrderGraphicType','containerWindow','some','createBorderSprite','TpbCastTimeJS','containerPosition','attackSpeed','loadEnemy','Game_Action_applyItemUserEffect','_graphicType','ScreenBuffer','createBackgroundSprite','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','log','onCtbOrderChange','clearTpbChargeTime','battler','%1BgColor2','isActiveTpb','_actionBattlers','removeCurrentAction','onTpbCharged','BattleManager_updateTurn','%1AnimationID','STRUCT','TurnOrderCTBGraphicFaceIndex','isDead','time','OrderDirection','_homeY','setCtbChargeTime','bottom','setBattleSystemCTBTurnOrderVisible','changeCtbCastTime','BattleManager_endAction','faceName','height','width','_ctbTurnOrderIconIndex','max','updateTpbCastTimeCTB','Armor-%1-%2','CtbTurnOrderClearActorGraphic','ctbStopped','name','isAttack','BattleManager_isTpb','clearRect','clamp','_positionTargetY','Enemy','isSideView','svactor','applyItemBattleSystemCTBUserEffect','TurnOrderCTBGraphicFaceName','EnemyBattlerFaceName','isTpbReady','_tpbState','SpriteLength','InitialGaugeJS','requestMotionRefresh','EnemyBattlerDrawLetter','OrderJS','MAX_SAFE_INTEGER','onRestrict','UpdateFrames','opacity','updateGraphic','CtbTurnOrderActorFace','ShowMarkerBorder','Visible','Item-%1-%2','EnemyBattlerType','FaceName','_statusWindow','updateTpbChargeTime','CTB','SubjectDistance','_blendColor','Actors','isPlaytest','rotateCTBSprite','note','processUpdateGraphic','visible','RegExp','processCtbAntiSoftlock','createBattlerSprites','create','_backgroundSprite','faceHeight','createAllWindows','updateAllTpbBattlersCTB','updatePadding','RepositionTopHelpX','toUpperCase','_letter','updateLetter','applyGlobal','_letterSprite','After','icon','updateBattleContainerOrder','initialize','parse','rotateDupeNumber','NUM','getCurrentTurnOrderPositionCTB','loadSvEnemy','gradientFillRect','getColor','21JjmYcQ','postEndActionCTB','%1TextColor','startBattle','Scene_Boot_onDatabaseLoaded','updateTpbCastTime','addLoadListener','isAppeared','FaceIndex','blt','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','map','clear','isActor','repositionLogWindowCTB','concat','preEndActionCTB','DisplayPosition','Game_Battler_tpbSpeed','RepositionTopForHelp','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','BattleManager_startActorInput','loadFace','isAnyBattlerReadyCTB','287564UyIdqd','updateGraphicHue','changeCtbChargeTime','applyItemUserEffect','floor','_graphicSprite','ctbTicksToGoalAddedCastTime','right','Actor-%1-%2','clearTpbChargeTimeCTB','Mechanics','_index','IconIndex','Game_BattlerBase_hide','isPassCTB','padding','isCtbChargingState','5WQZBDU','setCtbAfterSpeed','%1BorderColor','createGraphicSprite','registerCommand','updatePosition','%1SystemBorder','Scene_Battle_createAllWindows','boxHeight','EnemyBattlerFaceIndex','endAction','trim','isRestricted','_graphicIconIndex','TotalHorzSprites','Game_Battler_clearTpbChargeTime','2leDbnj','createCTBTurnOrderWindow','Game_Action_applyGlobal','allBattleMembers','_ctbTurnOrderVisible','ParseSkillNotetags','SpriteThin','CtbTurnOrderActorIcon','undecided','_graphicEnemy','Game_Battler_initTpbChargeTime','constructor','initBattleSystemCTB','JSON','traitObjects','Game_Battler_onRestrict','Settings','appear','3vwpWVK','bitmap','createChildren','status','faceWidth','ParseAllNotetags','compareBattlerSprites','Effect','BattleManager_startBattle','isBattleSystemCTBTurnOrderVisible','Game_BattlerBase_appear','changeIconGraphicBitmap','ticksLeft','_ctbTurnOrderFaceName','tpbChargeTime','#000000','startActorInput','_fadeTarget','Game_Battler_applyTpbPenalty','length','anchor','BattleManager_isActiveTpb','mainFontFace','BattleManager_updateAllTpbBattlers','startAction','battleEnd','isEnemy','prototype','sort','_ctbAfterSpeed','9532NzKJqb','Game_Battler_tpbRelativeSpeed','tpbRelativeSpeed','%1FlashColor','top','EnemyBattlerIcon','VisuMZ_1_BattleCore','TurnOrderCTBGraphicIconIndex','turn','EnemyBattlerFontSize','Anti-CTB\x20Softlock\x20Count:','tpbAcceleration','round','CtbTurnOrderEnemyFace','Window_StatusBase_placeGauge','_anti_CTB_SoftlockCount','ConvertParams','bitmapWidth','_turnOrderInnerSprite','updateTpbChargeTimeCTB','tpbSpeed','_tpbCastTime','createKeyJS','updateVisibility','_fadeDuration','setCtbCastTime','process_VisuMZ_BattleSystemCTB_CreateRegExp','bind','_onRestrictBypassCtbReset','getChildIndex','addChildAt','battlerName','Game_Battler_updateTpbChargeTime','_isAppeared','includes','_graphicSv','1115KgIGgl','_graphicFaceIndex','format','_inputting','setTurnOrderCTB','updateTpb','_positionDuration','getCtbCastTimeRate','parameters','Window_Help_setItem','ParseItemNotetags','loadSystem','STR','addChild','exit','fillRect','processTurnCTB','updateTurnOrder','createTurnOrderCTBGraphicType','151977vfHEKS','isAlive','Game_Battler_tpbAcceleration','BattleManager_battleSys','setItem','updateAllTpbBattlers','216379GOUzWx','RepositionLogWindow','EVAL','createLetterSprite','TotalVertSprites','FUNC','version','_dupe','item','Enemies','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','members','processTurnOrderChangeCTB','_ogWindowLayerX','_isAlive','min','face','updateTpbBattler','reduce','(?:GAUGE|TIME|SPEED)','DisplayOffsetX','hide','ARRAYSTR','_subject','%1PopupText','isInputting','charging','fontSize','subject','_tpbChargeTime','changeEnemyGraphicBitmap','_helpWindow','ShowMarkerBg','Game_Battler_updateTpbCastTime','isActing','_logWindow','TurnOrderCTBGraphicType','_ctbTurnOrderFaceIndex','svBattlerName','skills','Charge','setText','changeTurnOrderByCTB','Parse_Notetags_CreateJS','Class-%1-%2','fontFace','_isBattleOver','BattleManager_processTurn','currentAction','rotateCTBSprites','processTurn','applyBattleSystemCTBUserEffect','_graphicHue','changeSvActorGraphicBitmap','Game_Battler_tpbBaseSpeed','actor','updateTurn','isCTB','onDatabaseLoaded','(?:CTB)','Weapon-%1-%2','updateTurnOrderCTB','bitmapHeight','_scene','_phase','checkOpacity','%1SystemBg','TpbBaseSpeedCalcJS','push','applyTpbPenalty','_unit','speed','updateTurnCTB','createTurnOrderCTBGraphicFaceIndex','casting','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','MIN_SAFE_INTEGER','maxBattleMembers','Actor','%1Mirror','canMove','getNextSubject','createTurnOrderCTBGraphicIconIndex','_turnOrderContainer','isTpbCharged','tpbRequiredCastTime','battlerHue','%1Mute','call','isHorz','enemy','_homeX','isTpb','update','_forcing','iconHeight','startFade','center','_graphicFaceName','_positionTargetX','placeGauge','Game_System_initialize','left','ActorBattlerType','requestFauxAnimation','battleSys','ceil','_ogWindowLayerY','TpbSpeedCalcJS','204432TfOtSG','isSceneBattle','Cast','ARRAYNUM','initTpbChargeTimeCTB','setBlendColor','Enemy-%1-%2','9231ksDCWF','createInitialPositions','updateSelectionEffect','description','ctbTicksToGoal','otherCtbChecksPassed','changeFaceGraphicBitmap','hasSvBattler','Rush','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20position\x20=\x20target.getCurrentTurnOrderPositionCTB();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20order\x20=\x20position;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(order)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20order\x20=\x20position;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20order;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','addInnerChild','_plural','getStateTooltipBattler','match','faceIndex','indexOf','_autoBattle','applyGlobalBattleSystemCTBEffects','_ctbTurnOrderWindow','createRateJS','VisuMZ_0_CoreEngine','prepare','BattleSystemCTB','drawText','initMembers','Game_Battler_tpbRequiredCastTime'];const _0x28a0=function(_0x1dbd4b,_0x12e2a3){_0x1dbd4b=_0x1dbd4b-0x7c;let _0x1bf10b=_0x1bf1[_0x1dbd4b];return _0x1bf10b;};const _0x3696d0=_0x28a0;(function(_0x1b4eb4,_0xc74462){const _0x396bc6=_0x28a0;while(!![]){try{const _0x1f0ffb=-parseInt(_0x396bc6(0x147))+parseInt(_0x396bc6(0x14e))*parseInt(_0x396bc6(0x1df))+parseInt(_0x396bc6(0x9d))*-parseInt(_0x396bc6(0x208))+-parseInt(_0x396bc6(0x1f7))+parseInt(_0x396bc6(0x218))*parseInt(_0x396bc6(0xc1))+-parseInt(_0x396bc6(0xd4))+parseInt(_0x396bc6(0xda))*parseInt(_0x396bc6(0x7f));if(_0x1f0ffb===_0xc74462)break;else _0x1b4eb4['push'](_0x1b4eb4['shift']());}catch(_0x5e2e78){_0x1b4eb4['push'](_0x1b4eb4['shift']());}}}(_0x1bf1,0x257f1));var label=_0x3696d0(0x164),tier=tier||0x0,dependencies=[_0x3696d0(0x162),_0x3696d0(0xa3)],pluginData=$plugins['filter'](function(_0x3ec104){const _0x4d871a=_0x3696d0;return _0x3ec104[_0x4d871a(0x82)]&&_0x3ec104[_0x4d871a(0x151)][_0x4d871a(0xbf)]('['+label+']');})[0x0];VisuMZ[label][_0x3696d0(0x7d)]=VisuMZ[label][_0x3696d0(0x7d)]||{},VisuMZ[_0x3696d0(0xad)]=function(_0x350bee,_0xddf6e7){const _0x52453d=_0x3696d0;for(const _0x457855 in _0xddf6e7){if(_0x457855['match'](/(.*):(.*)/i)){const _0x189a6a=String(RegExp['$1']),_0xe3c6fa=String(RegExp['$2'])[_0x52453d(0x1cf)]()[_0x52453d(0x213)]();let _0x288d3d,_0x5d754e,_0x18977a;switch(_0xe3c6fa){case _0x52453d(0x1da):_0x288d3d=_0xddf6e7[_0x457855]!==''?Number(_0xddf6e7[_0x457855]):0x0;break;case _0x52453d(0x14a):_0x5d754e=_0xddf6e7[_0x457855]!==''?JSON[_0x52453d(0x1d8)](_0xddf6e7[_0x457855]):[],_0x288d3d=_0x5d754e[_0x52453d(0x1ea)](_0x270d37=>Number(_0x270d37));break;case _0x52453d(0xdc):_0x288d3d=_0xddf6e7[_0x457855]!==''?eval(_0xddf6e7[_0x457855]):null;break;case'ARRAYEVAL':_0x5d754e=_0xddf6e7[_0x457855]!==''?JSON[_0x52453d(0x1d8)](_0xddf6e7[_0x457855]):[],_0x288d3d=_0x5d754e[_0x52453d(0x1ea)](_0x7db84f=>eval(_0x7db84f));break;case _0x52453d(0x225):_0x288d3d=_0xddf6e7[_0x457855]!==''?JSON[_0x52453d(0x1d8)](_0xddf6e7[_0x457855]):'';break;case'ARRAYJSON':_0x5d754e=_0xddf6e7[_0x457855]!==''?JSON[_0x52453d(0x1d8)](_0xddf6e7[_0x457855]):[],_0x288d3d=_0x5d754e['map'](_0x38e9=>JSON[_0x52453d(0x1d8)](_0x38e9));break;case _0x52453d(0xdf):_0x288d3d=_0xddf6e7[_0x457855]!==''?new Function(JSON['parse'](_0xddf6e7[_0x457855])):new Function('return\x200');break;case'ARRAYFUNC':_0x5d754e=_0xddf6e7[_0x457855]!==''?JSON[_0x52453d(0x1d8)](_0xddf6e7[_0x457855]):[],_0x288d3d=_0x5d754e[_0x52453d(0x1ea)](_0x7faf36=>new Function(JSON[_0x52453d(0x1d8)](_0x7faf36)));break;case _0x52453d(0xcd):_0x288d3d=_0xddf6e7[_0x457855]!==''?String(_0xddf6e7[_0x457855]):'';break;case _0x52453d(0xf0):_0x5d754e=_0xddf6e7[_0x457855]!==''?JSON[_0x52453d(0x1d8)](_0xddf6e7[_0x457855]):[],_0x288d3d=_0x5d754e[_0x52453d(0x1ea)](_0x213b65=>String(_0x213b65));break;case _0x52453d(0x188):_0x18977a=_0xddf6e7[_0x457855]!==''?JSON[_0x52453d(0x1d8)](_0xddf6e7[_0x457855]):{},_0x288d3d=VisuMZ[_0x52453d(0xad)]({},_0x18977a);break;case'ARRAYSTRUCT':_0x5d754e=_0xddf6e7[_0x457855]!==''?JSON[_0x52453d(0x1d8)](_0xddf6e7[_0x457855]):[],_0x288d3d=_0x5d754e[_0x52453d(0x1ea)](_0xa409f5=>VisuMZ[_0x52453d(0xad)]({},JSON['parse'](_0xa409f5)));break;default:continue;}_0x350bee[_0x189a6a]=_0x288d3d;}}return _0x350bee;},(_0x5311d3=>{const _0x80cd4f=_0x3696d0,_0x88a53c=_0x5311d3[_0x80cd4f(0x19c)];for(const _0x5d3e78 of dependencies){if(!Imported[_0x5d3e78]){alert(_0x80cd4f(0xe4)[_0x80cd4f(0xc3)](_0x88a53c,_0x5d3e78)),SceneManager[_0x80cd4f(0xcf)]();break;}}const _0x1b8d99=_0x5311d3[_0x80cd4f(0x151)];if(_0x1b8d99['match'](/\[Version[ ](.*?)\]/i)){const _0x2de3e0=Number(RegExp['$1']);_0x2de3e0!==VisuMZ[label][_0x80cd4f(0xe0)]&&(alert(_0x80cd4f(0x125)[_0x80cd4f(0xc3)](_0x88a53c,_0x2de3e0)),SceneManager[_0x80cd4f(0xcf)]());}if(_0x1b8d99['match'](/\[Tier[ ](\d+)\]/i)){const _0x4d860e=Number(RegExp['$1']);_0x4d860e<tier?(alert(_0x80cd4f(0x1f3)[_0x80cd4f(0xc3)](_0x88a53c,_0x4d860e,tier)),SceneManager[_0x80cd4f(0xcf)]()):tier=Math['max'](_0x4d860e,tier);}VisuMZ[_0x80cd4f(0xad)](VisuMZ[label][_0x80cd4f(0x7d)],_0x5311d3[_0x80cd4f(0xc9)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x3696d0(0x19c)],_0x3696d0(0x21f),_0x33ed46=>{const _0x2b6ce4=_0x3696d0;VisuMZ[_0x2b6ce4(0xad)](_0x33ed46,_0x33ed46);const _0x3fd2f3=_0x33ed46['Actors'],_0x309e3c=_0x33ed46[_0x2b6ce4(0x203)];for(const _0x4900d6 of _0x3fd2f3){const _0x21bb3d=$gameActors[_0x2b6ce4(0x111)](_0x4900d6);if(!_0x21bb3d)continue;_0x21bb3d[_0x2b6ce4(0x170)]='icon',_0x21bb3d[_0x2b6ce4(0x196)]=_0x309e3c;}}),PluginManager[_0x3696d0(0x20c)](pluginData['name'],_0x3696d0(0x1b4),_0x53c9b4=>{const _0x526a6a=_0x3696d0;VisuMZ[_0x526a6a(0xad)](_0x53c9b4,_0x53c9b4);const _0x243219=_0x53c9b4[_0x526a6a(0x1bf)],_0x2ab267=_0x53c9b4[_0x526a6a(0x1b9)],_0x230298=_0x53c9b4[_0x526a6a(0x1e7)];for(const _0x5a8028 of _0x243219){const _0x2c4ef9=$gameActors['actor'](_0x5a8028);if(!_0x2c4ef9)continue;_0x2c4ef9[_0x526a6a(0x170)]=_0x526a6a(0xea),_0x2c4ef9[_0x526a6a(0x8c)]=_0x2ab267,_0x2c4ef9[_0x526a6a(0xff)]=_0x230298;}}),PluginManager['registerCommand'](pluginData[_0x3696d0(0x19c)],_0x3696d0(0x19a),_0x2a1e6c=>{const _0x47f829=_0x3696d0;VisuMZ[_0x47f829(0xad)](_0x2a1e6c,_0x2a1e6c);const _0x530f1d=_0x2a1e6c['Actors'];for(const _0x412ea0 of _0x530f1d){const _0x3074c3=$gameActors[_0x47f829(0x111)](_0x412ea0);if(!_0x3074c3)continue;_0x3074c3['clearTurnOrderCTBGraphics']();}}),PluginManager[_0x3696d0(0x20c)](pluginData[_0x3696d0(0x19c)],'CtbTurnOrderEnemyIcon',_0x47f5e2=>{const _0x4c2484=_0x3696d0;VisuMZ[_0x4c2484(0xad)](_0x47f5e2,_0x47f5e2);const _0x6e6191=_0x47f5e2['Enemies'],_0xd91526=_0x47f5e2[_0x4c2484(0x203)];for(const _0xb9cd1b of _0x6e6191){const _0x58f783=$gameTroop[_0x4c2484(0xe5)]()[_0xb9cd1b];if(!_0x58f783)continue;_0x58f783[_0x4c2484(0x170)]='icon',_0x58f783[_0x4c2484(0x196)]=_0xd91526;}}),PluginManager[_0x3696d0(0x20c)](pluginData['name'],_0x3696d0(0xaa),_0x1985f3=>{const _0x48cd1b=_0x3696d0;VisuMZ[_0x48cd1b(0xad)](_0x1985f3,_0x1985f3);const _0x189a40=_0x1985f3[_0x48cd1b(0xe3)],_0x598fed=_0x1985f3[_0x48cd1b(0x1b9)],_0x578660=_0x1985f3[_0x48cd1b(0x1e7)];for(const _0x29b25c of _0x189a40){const _0x50671b=$gameTroop['members']()[_0x29b25c];if(!_0x50671b)continue;_0x50671b[_0x48cd1b(0x170)]=_0x48cd1b(0xea),_0x50671b[_0x48cd1b(0x8c)]=_0x598fed,_0x50671b[_0x48cd1b(0xff)]=_0x29b25c;}}),PluginManager[_0x3696d0(0x20c)](pluginData[_0x3696d0(0x19c)],'CtbTurnOrderClearEnemyGraphic',_0x4659ea=>{const _0x305427=_0x3696d0;VisuMZ['ConvertParams'](_0x4659ea,_0x4659ea);const _0x3f0b9b=_0x4659ea[_0x305427(0xe3)];for(const _0x12fd00 of _0x3f0b9b){const _0xf765b6=$gameTroop[_0x305427(0xe5)]()[_0x12fd00];if(!_0xf765b6)continue;_0xf765b6['clearTurnOrderCTBGraphics']();}}),PluginManager[_0x3696d0(0x20c)](pluginData[_0x3696d0(0x19c)],'SystemTurnOrderVisibility',_0x3e939d=>{const _0x2f0e60=_0x3696d0;VisuMZ[_0x2f0e60(0xad)](_0x3e939d,_0x3e939d);const _0x1939da=_0x3e939d[_0x2f0e60(0x1b6)];$gameSystem[_0x2f0e60(0x190)](_0x1939da);}),VisuMZ['BattleSystemCTB'][_0x3696d0(0x1e3)]=Scene_Boot[_0x3696d0(0x9a)][_0x3696d0(0x114)],Scene_Boot[_0x3696d0(0x9a)][_0x3696d0(0x114)]=function(){const _0x30e74d=_0x3696d0;this[_0x30e74d(0xb7)](),VisuMZ[_0x30e74d(0x164)][_0x30e74d(0x1e3)][_0x30e74d(0x132)](this),this[_0x30e74d(0x16c)]();},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0x1c5)]={},Scene_Boot[_0x3696d0(0x9a)][_0x3696d0(0xb7)]=function(){const _0x30d0a3=_0x3696d0,_0x48b254=VisuMZ[_0x30d0a3(0x164)]['RegExp'],_0x58d05f=_0x30d0a3(0x1e9),_0x2db22b=[_0x30d0a3(0x102),_0x30d0a3(0x149),_0x30d0a3(0x1d4)];for(const _0x2d7ece of _0x2db22b){const _0x1c3b10=_0x58d05f[_0x30d0a3(0xc3)](_0x2d7ece['toUpperCase']()['trim'](),_0x30d0a3(0x115),_0x30d0a3(0xed)),_0x23022c=new RegExp(_0x1c3b10,'i');VisuMZ[_0x30d0a3(0x164)][_0x30d0a3(0x1c5)][_0x2d7ece]=_0x23022c;}VisuMZ[_0x30d0a3(0x164)][_0x30d0a3(0x1c5)][_0x30d0a3(0x1ae)]=/<JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>\s*([\s\S]*)\s*<\/JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>/i;},Scene_Boot['prototype'][_0x3696d0(0x16c)]=function(){const _0x1d9f5b=_0x3696d0;if(VisuMZ[_0x1d9f5b(0x84)])return;const _0x330105=$dataSkills['concat']($dataItems);for(const _0x40ca5b of _0x330105){if(!_0x40ca5b)continue;VisuMZ['BattleSystemCTB']['Parse_Notetags_CreateJS'](_0x40ca5b);}},VisuMZ[_0x3696d0(0x164)]['ParseSkillNotetags']=VisuMZ[_0x3696d0(0x21d)],VisuMZ[_0x3696d0(0x21d)]=function(_0x1689f3){const _0x439776=_0x3696d0;VisuMZ[_0x439776(0x164)][_0x439776(0x21d)][_0x439776(0x132)](this,_0x1689f3),VisuMZ[_0x439776(0x164)]['Parse_Notetags_CreateJS'](_0x1689f3);},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0xcb)]=VisuMZ[_0x3696d0(0xcb)],VisuMZ[_0x3696d0(0xcb)]=function(_0x536281){const _0x45a4c8=_0x3696d0;VisuMZ['BattleSystemCTB']['ParseItemNotetags'][_0x45a4c8(0x132)](this,_0x536281),VisuMZ['BattleSystemCTB'][_0x45a4c8(0x105)](_0x536281);},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0x105)]=function(_0x21c947){const _0x2538dd=_0x3696d0,_0x5bc6b1=[_0x2538dd(0x102),_0x2538dd(0x149),_0x2538dd(0x1d4)];for(const _0x2a3137 of _0x5bc6b1){VisuMZ['BattleSystemCTB'][_0x2538dd(0x161)](_0x21c947,_0x2a3137);}VisuMZ[_0x2538dd(0x164)]['createOrderJS'](_0x21c947,'Order');},VisuMZ[_0x3696d0(0x164)]['JS']={},VisuMZ[_0x3696d0(0x164)]['createRateJS']=function(_0x2a7a96,_0x36da62){const _0xf93a7f=_0x3696d0,_0x330c08=_0x2a7a96['note'];if(_0x330c08[_0xf93a7f(0x15b)](VisuMZ['BattleSystemCTB'][_0xf93a7f(0x1c5)][_0x36da62])){const _0xcd0477=String(RegExp['$1']),_0x434a6b=_0xf93a7f(0x17c)[_0xf93a7f(0xc3)](_0xcd0477,_0x36da62),_0x5b632c=VisuMZ[_0xf93a7f(0x164)]['createKeyJS'](_0x2a7a96,_0x36da62);VisuMZ['BattleSystemCTB']['JS'][_0x5b632c]=new Function(_0x434a6b);}},VisuMZ[_0x3696d0(0x164)]['createOrderJS']=function(_0x39ae08,_0x47f9d1){const _0x399528=_0x3696d0,_0x3ad1ac=_0x39ae08[_0x399528(0x1c2)];if(_0x3ad1ac[_0x399528(0x15b)](VisuMZ[_0x399528(0x164)][_0x399528(0x1c5)]['OrderJS'])){const _0x45b8e1=String(RegExp['$1']),_0x45459b=_0x399528(0x157)[_0x399528(0xc3)](_0x45b8e1,_0x47f9d1),_0x5effb5=VisuMZ[_0x399528(0x164)][_0x399528(0xb3)](_0x39ae08,_0x47f9d1);VisuMZ[_0x399528(0x164)]['JS'][_0x5effb5]=new Function(_0x45459b);}},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0xb3)]=function(_0x42c8ff,_0x2f7a75){const _0x594f92=_0x3696d0;let _0x52ea2b='';if($dataActors[_0x594f92(0xbf)](_0x42c8ff))_0x52ea2b=_0x594f92(0x1ff)[_0x594f92(0xc3)](_0x42c8ff['id'],_0x2f7a75);if($dataClasses[_0x594f92(0xbf)](_0x42c8ff))_0x52ea2b=_0x594f92(0x106)[_0x594f92(0xc3)](_0x42c8ff['id'],_0x2f7a75);if($dataSkills['includes'](_0x42c8ff))_0x52ea2b='Skill-%1-%2'[_0x594f92(0xc3)](_0x42c8ff['id'],_0x2f7a75);if($dataItems[_0x594f92(0xbf)](_0x42c8ff))_0x52ea2b=_0x594f92(0x1b7)[_0x594f92(0xc3)](_0x42c8ff['id'],_0x2f7a75);if($dataWeapons[_0x594f92(0xbf)](_0x42c8ff))_0x52ea2b=_0x594f92(0x116)[_0x594f92(0xc3)](_0x42c8ff['id'],_0x2f7a75);if($dataArmors[_0x594f92(0xbf)](_0x42c8ff))_0x52ea2b=_0x594f92(0x199)[_0x594f92(0xc3)](_0x42c8ff['id'],_0x2f7a75);if($dataEnemies[_0x594f92(0xbf)](_0x42c8ff))_0x52ea2b=_0x594f92(0x14d)['format'](_0x42c8ff['id'],_0x2f7a75);if($dataStates[_0x594f92(0xbf)](_0x42c8ff))_0x52ea2b='State-%1-%2'[_0x594f92(0xc3)](_0x42c8ff['id'],_0x2f7a75);return _0x52ea2b;},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0xd7)]=BattleManager[_0x3696d0(0x143)],BattleManager[_0x3696d0(0x143)]=function(){const _0x5aab29=_0x3696d0;if(this['isCTB']())return _0x5aab29(0x1bc);return VisuMZ[_0x5aab29(0x164)][_0x5aab29(0xd7)][_0x5aab29(0x132)](this);},BattleManager[_0x3696d0(0x113)]=function(){const _0xec11ad=_0x3696d0;return $gameSystem['getBattleSystem']()===_0xec11ad(0x1bc);},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0x19e)]=BattleManager[_0x3696d0(0x136)],BattleManager[_0x3696d0(0x136)]=function(){const _0x2a7ddd=_0x3696d0;if(this[_0x2a7ddd(0x113)]())return!![];return VisuMZ[_0x2a7ddd(0x164)]['BattleManager_isTpb'][_0x2a7ddd(0x132)](this);},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0x94)]=BattleManager[_0x3696d0(0x182)],BattleManager[_0x3696d0(0x182)]=function(){const _0x21017b=_0x3696d0;if(this['isCTB']())return![];return VisuMZ[_0x21017b(0x164)][_0x21017b(0x94)][_0x21017b(0x132)](this);},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0x186)]=BattleManager[_0x3696d0(0x112)],BattleManager['updateTurn']=function(_0x338e7d){const _0x3c0fc3=_0x3696d0;this['isCTB']()?this[_0x3c0fc3(0x122)](_0x338e7d):VisuMZ[_0x3c0fc3(0x164)][_0x3c0fc3(0x186)][_0x3c0fc3(0x132)](this,_0x338e7d);},BattleManager[_0x3696d0(0x122)]=function(_0x570ae5){const _0x387b7c=_0x3696d0;$gameParty[_0x387b7c(0x1ac)]();for(;;){if(this[_0x387b7c(0x1f6)]())break;_0x570ae5&&this[_0x387b7c(0xc6)](),!this[_0x387b7c(0xf1)]&&(this[_0x387b7c(0xf1)]=this[_0x387b7c(0x12b)]()),this[_0x387b7c(0xf1)]&&(this[_0x387b7c(0x10c)](),this['updateTurnOrderCTB']());}this[_0x387b7c(0x16f)]();},VisuMZ['BattleSystemCTB'][_0x3696d0(0x109)]=BattleManager['processTurn'],BattleManager[_0x3696d0(0x10c)]=function(){const _0x52b477=_0x3696d0;this['isCTB']()?this[_0x52b477(0xd1)]():VisuMZ['BattleSystemCTB']['BattleManager_processTurn'][_0x52b477(0x132)](this);},BattleManager['processTurnCTB']=function(){const _0xeebe63=_0x3696d0,_0x145b64=this[_0xeebe63(0xf1)],_0x483ae1=_0x145b64['currentAction']();_0x483ae1?(_0x483ae1[_0xeebe63(0x163)](),_0x483ae1['isValid']()?(this[_0xeebe63(0x97)](),_0x145b64[_0xeebe63(0x184)]()):(_0x145b64[_0xeebe63(0x184)](),_0x145b64[_0xeebe63(0x209)](0x0),this[_0xeebe63(0x212)](),this[_0xeebe63(0xf1)]=null)):(_0x145b64[_0xeebe63(0x209)](0x0),this[_0xeebe63(0x212)](),this[_0xeebe63(0xf1)]=null);},BattleManager[_0x3696d0(0x1f6)]=function(){const _0xb8a579=_0x3696d0;if(this[_0xb8a579(0xf1)])return!![];if(this['_phase']!==_0xb8a579(0xa5))return!![];if(this[_0xb8a579(0xf3)]())return!![];if(this[_0xb8a579(0x15e)])return![];const _0x5d7029=this[_0xb8a579(0x21b)]()['filter'](_0x580c93=>_0x580c93&&_0x580c93[_0xb8a579(0x1e6)]());return _0x5d7029[_0xb8a579(0x172)](_0x535c29=>_0x535c29['isPassCTB']());},Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0x205)]=function(){const _0x983e49=_0x3696d0;if(this[_0x983e49(0x12e)]())return!![];if(this[_0x983e49(0x1a8)]())return!![];if(this[_0x983e49(0xfc)]())return!![];return![];},BattleManager[_0x3696d0(0x16f)]=function(){const _0x5a6480=_0x3696d0;this['isAnyBattlerReadyCTB']()&&this[_0x5a6480(0x153)]()?(this[_0x5a6480(0xac)]=this[_0x5a6480(0xac)]||0x0,this[_0x5a6480(0xac)]++,this[_0x5a6480(0xac)]>=0xa&&this[_0x5a6480(0x1c6)]()):this[_0x5a6480(0xac)]=0x0;},BattleManager[_0x3696d0(0x153)]=function(){const _0xd153be=_0x3696d0;if(this[_0xd153be(0xf1)])return![];if(this['_phase']!==_0xd153be(0xa5))return![];if(this[_0xd153be(0xf3)]())return![];return!![];},BattleManager['processCtbAntiSoftlock']=function(){const _0x444de0=_0x3696d0;$gameTemp[_0x444de0(0x1c0)]()&&console[_0x444de0(0x17d)](_0x444de0(0xa7),this[_0x444de0(0xac)]);for(const _0x47fd9d of this[_0x444de0(0x21b)]()){if(!_0x47fd9d)continue;_0x47fd9d['isAlive']()&&(_0x47fd9d['setActionState'](_0x444de0(0x220)),_0x47fd9d[_0x444de0(0x1a9)]=_0x444de0(0xf4));}this['_subject']=null,this[_0x444de0(0x11a)]=_0x444de0(0xa5),this[_0x444de0(0xc4)]=![];},VisuMZ[_0x3696d0(0x164)]['BattleManager_updateAllTpbBattlers']=BattleManager['updateAllTpbBattlers'],BattleManager[_0x3696d0(0xd9)]=function(){const _0x4e0b7f=_0x3696d0;this[_0x4e0b7f(0x113)]()?this[_0x4e0b7f(0x1cc)]():VisuMZ['BattleSystemCTB'][_0x4e0b7f(0x96)][_0x4e0b7f(0x132)](this);},BattleManager[_0x3696d0(0x1cc)]=function(){const _0x2648ee=_0x3696d0,_0xd618ba=this['allBattleMembers']();_0xd618ba[_0x2648ee(0x9b)]((_0x4b2f43,_0x26e9c8)=>{const _0x5936eb=_0x2648ee;return _0x4b2f43['ctbTicksToGoal'](0x1)-_0x26e9c8[_0x5936eb(0x152)](0x1);});for(const _0x2a12c2 of _0xd618ba){this[_0x2648ee(0xeb)](_0x2a12c2);}},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0x87)]=BattleManager[_0x3696d0(0x1e2)],BattleManager[_0x3696d0(0x1e2)]=function(){const _0x43aead=_0x3696d0;VisuMZ[_0x43aead(0x164)][_0x43aead(0x87)][_0x43aead(0x132)](this),this[_0x43aead(0x117)](!![]);},VisuMZ['BattleSystemCTB'][_0x3696d0(0x192)]=BattleManager[_0x3696d0(0x212)],BattleManager[_0x3696d0(0x212)]=function(){const _0x3c3905=_0x3696d0;this[_0x3c3905(0x1ef)](),VisuMZ[_0x3c3905(0x164)][_0x3c3905(0x192)][_0x3c3905(0x132)](this),this[_0x3c3905(0x1e0)]();},BattleManager[_0x3696d0(0x1ef)]=function(){const _0x8735b=_0x3696d0;if(!this[_0x8735b(0x113)]())return;this['_subject']&&this[_0x8735b(0xf1)]['numActions']()<=0x0&&(this[_0x8735b(0x10b)](),this['_subject']['setActionState'](_0x8735b(0x220)));},BattleManager[_0x3696d0(0x1e0)]=function(){const _0x308c53=_0x3696d0;if(!this[_0x308c53(0x113)]())return;this[_0x308c53(0x117)](),this[_0x308c53(0xf1)]&&this['processTurn']();},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0x1f4)]=BattleManager[_0x3696d0(0x8f)],BattleManager[_0x3696d0(0x8f)]=function(){const _0x5b47ce=_0x3696d0;this[_0x5b47ce(0x117)](),VisuMZ[_0x5b47ce(0x164)][_0x5b47ce(0x1f4)][_0x5b47ce(0x132)](this);},BattleManager[_0x3696d0(0x117)]=function(_0x50f884){const _0x145459=_0x3696d0;if(!this[_0x145459(0x113)]())return;const _0x5a9785=SceneManager['_scene'][_0x145459(0x160)];if(!_0x5a9785)return;_0x5a9785['updateTurnOrder'](_0x50f884);},BattleManager[_0x3696d0(0x10b)]=function(){const _0x2c4074=_0x3696d0;if(!this[_0x2c4074(0x113)]())return;const _0x1ad126=SceneManager['_scene']['_ctbTurnOrderWindow'];if(!_0x1ad126)return;_0x1ad126['rotateCTBSprite'](this[_0x2c4074(0xf1)]);},VisuMZ['BattleSystemCTB'][_0x3696d0(0x13f)]=Game_System[_0x3696d0(0x9a)][_0x3696d0(0x1d7)],Game_System[_0x3696d0(0x9a)]['initialize']=function(){const _0x5d8e0d=_0x3696d0;VisuMZ[_0x5d8e0d(0x164)][_0x5d8e0d(0x13f)][_0x5d8e0d(0x132)](this),this[_0x5d8e0d(0x224)]();},Game_System[_0x3696d0(0x9a)][_0x3696d0(0x224)]=function(){this['_ctbTurnOrderVisible']=!![];},Game_System['prototype'][_0x3696d0(0x88)]=function(){const _0x2e53d8=_0x3696d0;return this[_0x2e53d8(0x21c)]===undefined&&this[_0x2e53d8(0x224)](),this[_0x2e53d8(0x21c)];},Game_System[_0x3696d0(0x9a)][_0x3696d0(0x190)]=function(_0x191b66){const _0x534a70=_0x3696d0;this[_0x534a70(0x21c)]===undefined&&this['initBattleSystemCTB'](),this[_0x534a70(0x21c)]=_0x191b66;},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0x178)]=Game_Action['prototype'][_0x3696d0(0x1fa)],Game_Action[_0x3696d0(0x9a)][_0x3696d0(0x1fa)]=function(_0x71ab00){const _0x1c3c8=_0x3696d0;VisuMZ[_0x1c3c8(0x164)][_0x1c3c8(0x178)][_0x1c3c8(0x132)](this,_0x71ab00),this[_0x1c3c8(0x10d)](_0x71ab00);},Game_Action['prototype'][_0x3696d0(0x10d)]=function(_0x3a4fc7){const _0x4420ae=_0x3696d0;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x4420ae(0x113)]())return;if(this[_0x4420ae(0xe2)]())this[_0x4420ae(0x1a5)](_0x3a4fc7);},Game_Action['prototype'][_0x3696d0(0x1a5)]=function(_0x57aee3){const _0x78e598=_0x3696d0,_0x3ecaaf=this[_0x78e598(0xe2)]()[_0x78e598(0x1c2)];if(_0x57aee3[_0x78e598(0x207)]()){const _0x4cb48e=VisuMZ[_0x78e598(0x164)]['createKeyJS'](this[_0x78e598(0xe2)](),_0x78e598(0x102));if(VisuMZ[_0x78e598(0x164)]['JS'][_0x4cb48e]){const _0x4ad42d=VisuMZ[_0x78e598(0x164)]['JS'][_0x4cb48e][_0x78e598(0x132)](this,this['subject'](),_0x57aee3);_0x57aee3[_0x78e598(0x18e)](_0x4ad42d);}_0x3ecaaf[_0x78e598(0x15b)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x57aee3[_0x78e598(0x18e)](Number(RegExp['$1'])*0.01),_0x3ecaaf['match'](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x57aee3[_0x78e598(0x1f9)](Number(RegExp['$1'])*0.01);}else{if(_0x57aee3[_0x78e598(0x168)]()){const _0x1c8d38=VisuMZ[_0x78e598(0x164)][_0x78e598(0xb3)](this[_0x78e598(0xe2)](),_0x78e598(0x149));if(VisuMZ[_0x78e598(0x164)]['JS'][_0x1c8d38]){const _0x563067=VisuMZ[_0x78e598(0x164)]['JS'][_0x1c8d38][_0x78e598(0x132)](this,this['subject'](),_0x57aee3);_0x57aee3['setCtbCastTime'](_0x563067);}_0x3ecaaf['match'](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x57aee3[_0x78e598(0xb6)](Number(RegExp['$1'])*0.01),_0x3ecaaf[_0x78e598(0x15b)](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x57aee3[_0x78e598(0x191)](Number(RegExp['$1'])*0.01);}}const _0x1603f3=VisuMZ[_0x78e598(0x164)]['createKeyJS'](this[_0x78e598(0xe2)](),'Order');if(VisuMZ[_0x78e598(0x164)]['JS'][_0x1603f3]){const _0x5ac554=VisuMZ[_0x78e598(0x164)]['JS'][_0x1603f3][_0x78e598(0x132)](this,this['subject'](),_0x57aee3);_0x57aee3[_0x78e598(0xc5)](_0x5ac554);}_0x3ecaaf[_0x78e598(0x15b)](/<(?:CTB) (?:SET|MAKE|EXACT) ORDER:[ ](\d+)>/i)&&_0x57aee3[_0x78e598(0xc5)](Number(RegExp['$1'])),_0x3ecaaf[_0x78e598(0x15b)](/<(?:CTB) (?:CHANGE|DELAY|RUSH|SHIFT) ORDER:[ ]([\+\-]\d+)>/i)&&_0x57aee3[_0x78e598(0x104)](Number(RegExp['$1']));},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0x21a)]=Game_Action[_0x3696d0(0x9a)]['applyGlobal'],Game_Action[_0x3696d0(0x9a)][_0x3696d0(0x1d2)]=function(){const _0x3b06b2=_0x3696d0;VisuMZ[_0x3b06b2(0x164)]['Game_Action_applyGlobal'][_0x3b06b2(0x132)](this),this[_0x3b06b2(0x15f)]();},Game_Action[_0x3696d0(0x9a)][_0x3696d0(0x15f)]=function(){const _0x1a5cbb=_0x3696d0;if(!this[_0x1a5cbb(0xe2)]())return;if(!BattleManager[_0x1a5cbb(0x113)]())return;const _0x5f269d=this['item']()[_0x1a5cbb(0x1c2)];let _0x5d70f0=0x0;this[_0x1a5cbb(0x138)]&&(_0x5d70f0=this[_0x1a5cbb(0xf6)]()[_0x1a5cbb(0xf7)]);const _0x3bd240=VisuMZ[_0x1a5cbb(0x164)][_0x1a5cbb(0xb3)](this[_0x1a5cbb(0xe2)](),'After');VisuMZ[_0x1a5cbb(0x164)]['JS'][_0x3bd240]&&(_0x5d70f0+=VisuMZ[_0x1a5cbb(0x164)]['JS'][_0x3bd240][_0x1a5cbb(0x132)](this,this[_0x1a5cbb(0xf6)](),this[_0x1a5cbb(0xf6)]()));let _0x19f4fd=this[_0x1a5cbb(0xe2)]()[_0x1a5cbb(0x121)]>0x0?this[_0x1a5cbb(0xe2)]()[_0x1a5cbb(0x121)]:0x0;if(this[_0x1a5cbb(0x19d)]())_0x19f4fd+=this[_0x1a5cbb(0xf6)]()[_0x1a5cbb(0x176)]();_0x5d70f0+=(_0x19f4fd/0xfa0)[_0x1a5cbb(0x1a0)](0x0,0x1);this['item']()[_0x1a5cbb(0x1c2)][_0x1a5cbb(0x15b)](/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x5d70f0+=Number(RegExp['$1'])*0.01);const _0x41b84f=this['subject']()[_0x1a5cbb(0x226)]()[_0x1a5cbb(0x1ee)](this[_0x1a5cbb(0xf6)]()[_0x1a5cbb(0x101)]()),_0x3f5c23=/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x1891ec=_0x41b84f[_0x1a5cbb(0x1ea)](_0x3a259e=>_0x3a259e&&_0x3a259e[_0x1a5cbb(0x1c2)][_0x1a5cbb(0x15b)](_0x3f5c23)?Number(RegExp['$1'])*0.01:0x0);_0x5d70f0=_0x1891ec[_0x1a5cbb(0xec)]((_0x5386bc,_0x56cf52)=>_0x5386bc+_0x56cf52,_0x5d70f0),this[_0x1a5cbb(0xf6)]()[_0x1a5cbb(0x209)](_0x5d70f0);},Game_BattlerBase[_0x3696d0(0x9a)][_0x3696d0(0x18e)]=function(_0x3686fe){const _0x202712=_0x3696d0;this[_0x202712(0xf7)]=_0x3686fe;},Game_BattlerBase[_0x3696d0(0x9a)][_0x3696d0(0x1f9)]=function(_0x2ead93){const _0x10915a=_0x3696d0;this['setCtbChargeTime'](this[_0x10915a(0xf7)]+_0x2ead93);},Game_BattlerBase['prototype']['setCtbCastTime']=function(_0x1e9dac){const _0x489459=_0x3696d0,_0x50f70f=this[_0x489459(0x12f)]();this[_0x489459(0xb2)]=_0x50f70f*_0x1e9dac;},Game_BattlerBase['prototype'][_0x3696d0(0x191)]=function(_0x5f498c){const _0x2120a3=_0x3696d0,_0x2df71d=this[_0x2120a3(0x12f)](),_0x215a19=_0x2df71d*_0x5f498c;this[_0x2120a3(0xb2)]=this[_0x2120a3(0xb2)]+_0x215a19;},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0x89)]=Game_BattlerBase['prototype'][_0x3696d0(0x7e)],Game_BattlerBase['prototype'][_0x3696d0(0x7e)]=function(){const _0x65d4a0=_0x3696d0;VisuMZ[_0x65d4a0(0x164)][_0x65d4a0(0x89)][_0x65d4a0(0x132)](this),BattleManager[_0x65d4a0(0x117)]();},VisuMZ['BattleSystemCTB'][_0x3696d0(0x204)]=Game_BattlerBase['prototype'][_0x3696d0(0xef)],Game_BattlerBase[_0x3696d0(0x9a)][_0x3696d0(0xef)]=function(){const _0x3a9a1c=_0x3696d0;VisuMZ['BattleSystemCTB'][_0x3a9a1c(0x204)]['call'](this),BattleManager[_0x3a9a1c(0x117)]();},Game_BattlerBase[_0x3696d0(0x9a)]['clearTurnOrderCTBGraphics']=function(){const _0x71b1f4=_0x3696d0;delete this[_0x71b1f4(0x170)],delete this[_0x71b1f4(0x8c)],delete this[_0x71b1f4(0xff)],delete this[_0x71b1f4(0x196)];},Game_BattlerBase[_0x3696d0(0x9a)][_0x3696d0(0xfe)]=function(){const _0x1fa356=_0x3696d0;return this['_ctbTurnOrderGraphicType']===undefined&&(this[_0x1fa356(0x170)]=this['createTurnOrderCTBGraphicType']()),this[_0x1fa356(0x170)];},Game_BattlerBase['prototype']['createTurnOrderCTBGraphicType']=function(){const _0x2c0325=_0x3696d0;return Window_CTB_TurnOrder['Settings'][_0x2c0325(0x1b8)];},Game_BattlerBase['prototype'][_0x3696d0(0x1a6)]=function(){const _0x1b5a0f=_0x3696d0;return this[_0x1b5a0f(0x8c)]===undefined&&(this['_ctbTurnOrderFaceName']=this[_0x1b5a0f(0x16d)]()),this[_0x1b5a0f(0x8c)];},Game_BattlerBase[_0x3696d0(0x9a)]['createTurnOrderCTBGraphicFaceName']=function(){return Window_CTB_TurnOrder['Settings']['EnemyBattlerFaceName'];},Game_BattlerBase['prototype'][_0x3696d0(0x189)]=function(){const _0x545952=_0x3696d0;return this[_0x545952(0xff)]===undefined&&(this[_0x545952(0xff)]=this[_0x545952(0x123)]()),this[_0x545952(0xff)];},Game_BattlerBase['prototype'][_0x3696d0(0x123)]=function(){const _0x1c6520=_0x3696d0;return Window_CTB_TurnOrder[_0x1c6520(0x7d)][_0x1c6520(0x211)];},Game_BattlerBase[_0x3696d0(0x9a)][_0x3696d0(0xa4)]=function(){const _0x152fa9=_0x3696d0;return this['_ctbTurnOrderIconIndex']===undefined&&(this[_0x152fa9(0x196)]=this['createTurnOrderCTBGraphicIconIndex']()),this[_0x152fa9(0x196)];},Game_BattlerBase[_0x3696d0(0x9a)]['createTurnOrderCTBGraphicIconIndex']=function(){const _0x41abb8=_0x3696d0;return Window_CTB_TurnOrder[_0x41abb8(0x7d)][_0x41abb8(0xa2)];},Game_BattlerBase[_0x3696d0(0x9a)]['setCTBGraphicIconIndex']=function(_0x5a7863){const _0x995748=_0x3696d0;this[_0x995748(0x196)]=_0x5a7863;},Game_BattlerBase[_0x3696d0(0x9a)]['ctbTicksToGoal']=function(_0x4e1c57,_0x4e9530){const _0x2a0702=_0x3696d0;if(this[_0x2a0702(0x18a)]())return Number['MAX_SAFE_INTEGER'];if(!this[_0x2a0702(0x1e6)]())return Number['MAX_SAFE_INTEGER'];if(_0x4e1c57===0x1&&!_0x4e9530){if(this===BattleManager['_subject'])return Number[_0x2a0702(0x126)]/0xa;if(this===BattleManager[_0x2a0702(0x111)]())return Number[_0x2a0702(0x126)]/0xa;if(BattleManager[_0x2a0702(0x183)]&&BattleManager[_0x2a0702(0x183)][_0x2a0702(0xbf)](this)){let _0x2870d3=Number[_0x2a0702(0x126)]/0x1388;return _0x2870d3+=BattleManager[_0x2a0702(0x183)][_0x2a0702(0x15d)](this)*0x5,_0x2870d3;}}return _0x4e1c57-=this[_0x2a0702(0x8d)](),_0x4e1c57/=this[_0x2a0702(0xa8)](),_0x4e1c57+=this['ctbTicksToGoalAddedCastTime'](),_0x4e1c57;},Game_BattlerBase[_0x3696d0(0x9a)][_0x3696d0(0x1fd)]=function(){const _0x19e831=_0x3696d0;return this['_tpbState']===_0x19e831(0x124)?(this['tpbRequiredCastTime']()-this[_0x19e831(0xb2)])/this[_0x19e831(0xa8)]():0x0;},VisuMZ['BattleSystemCTB'][_0x3696d0(0x222)]=Game_Battler[_0x3696d0(0x9a)]['initTpbChargeTime'],Game_Battler[_0x3696d0(0x9a)]['initTpbChargeTime']=function(_0x167c60){const _0x49020f=_0x3696d0;BattleManager[_0x49020f(0x113)]()?this[_0x49020f(0x14b)](_0x167c60):VisuMZ['BattleSystemCTB']['Game_Battler_initTpbChargeTime'][_0x49020f(0x132)](this,_0x167c60);},Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0x14b)]=function(_0x7a07fa){const _0x3fbe13=_0x3696d0,_0x19124d=VisuMZ[_0x3fbe13(0x164)][_0x3fbe13(0x7d)][_0x3fbe13(0x201)];let _0x155516=this[_0x3fbe13(0x9f)]()*eval(_0x19124d[_0x3fbe13(0x1ab)]);const _0x5ed359=this['traitObjects']()[_0x3fbe13(0x1ee)](this[_0x3fbe13(0x101)]()),_0x374289=/<(?:CTB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x3076e4=_0x5ed359['map'](_0x2d9916=>_0x2d9916&&_0x2d9916[_0x3fbe13(0x1c2)][_0x3fbe13(0x15b)](_0x374289)?Number(RegExp['$1'])*0.01:0x0);_0x155516=_0x3076e4['reduce']((_0x25c388,_0x5da77d)=>_0x25c388+_0x5da77d,_0x155516),this[_0x3fbe13(0x1a9)]=_0x3fbe13(0xf4),this[_0x3fbe13(0xf7)]=(_0x7a07fa?0x1:_0x155516)['clamp'](0x0,0x1),this[_0x3fbe13(0x214)]()&&(this[_0x3fbe13(0xf7)]=0x0);},Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0x207)]=function(){const _0x1cedda=_0x3696d0;return this[_0x1cedda(0x1a9)]===_0x1cedda(0xf4);},Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0x168)]=function(){const _0x557233=_0x3696d0;return this[_0x557233(0x1a9)]==='casting'&&this[_0x557233(0x10a)]()&&this[_0x557233(0x10a)]()[_0x557233(0xe2)]()&&this[_0x557233(0x10a)]()['item']()[_0x557233(0x121)]<0x0;},Game_BattlerBase[_0x3696d0(0x9a)][_0x3696d0(0xc8)]=function(){const _0x594082=_0x3696d0;return this[_0x594082(0x168)]()?this['_tpbCastTime']/this[_0x594082(0x12f)]():0x0;},Game_Battler['prototype'][_0x3696d0(0x19b)]=function(){const _0x3aba74=_0x3696d0;return!this[_0x3aba74(0x12a)]();},Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0x209)]=function(_0x2748d7){const _0x417a33=_0x3696d0;this[_0x417a33(0x9c)]=_0x2748d7;},VisuMZ['BattleSystemCTB'][_0x3696d0(0x7c)]=Game_Battler['prototype'][_0x3696d0(0x1b0)],Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0x1b0)]=function(){const _0x5368a5=_0x3696d0;this['_onRestrictBypassCtbReset']=BattleManager[_0x5368a5(0x113)](),VisuMZ[_0x5368a5(0x164)][_0x5368a5(0x7c)][_0x5368a5(0x132)](this),this[_0x5368a5(0xb9)]=undefined;},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0x217)]=Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0x17f)],Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0x17f)]=function(){const _0x1a1889=_0x3696d0;BattleManager[_0x1a1889(0x113)]()?this[_0x1a1889(0x200)]():VisuMZ[_0x1a1889(0x164)][_0x1a1889(0x217)][_0x1a1889(0x132)](this);},Game_Battler['prototype'][_0x3696d0(0x200)]=function(){const _0x4ce1a0=_0x3696d0;if(this[_0x4ce1a0(0xb9)])return;this['_tpbState']=_0x4ce1a0(0xf4),this[_0x4ce1a0(0xf7)]-=0x1,this[_0x4ce1a0(0xf7)]+=this[_0x4ce1a0(0x9c)]||0x0;},VisuMZ['BattleSystemCTB'][_0x3696d0(0x91)]=Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0x11f)],Game_Battler[_0x3696d0(0x9a)]['applyTpbPenalty']=function(){const _0x3a6a00=_0x3696d0;BattleManager[_0x3a6a00(0x113)]()?this['applyCTBPenalty']():VisuMZ['BattleSystemCTB'][_0x3a6a00(0x91)][_0x3a6a00(0x132)](this);},Game_Battler[_0x3696d0(0x9a)]['applyCTBPenalty']=function(){const _0x85a9b0=_0x3696d0;this[_0x85a9b0(0x1a9)]=_0x85a9b0(0xf4),this[_0x85a9b0(0xf7)]+=VisuMZ[_0x85a9b0(0x164)]['Settings'][_0x85a9b0(0x201)]['EscapeFailPenalty']||0x0;},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0x1f1)]=Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0xb1)],Game_Battler['prototype'][_0x3696d0(0xb1)]=function(){const _0x510492=_0x3696d0;return BattleManager[_0x510492(0x113)]()?VisuMZ['BattleSystemCTB']['Settings']['Mechanics'][_0x510492(0x146)][_0x510492(0x132)](this,this):VisuMZ['BattleSystemCTB'][_0x510492(0x1f1)][_0x510492(0x132)](this);},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0x110)]=Game_Battler[_0x3696d0(0x9a)]['tpbBaseSpeed'],Game_Battler['prototype']['tpbBaseSpeed']=function(){const _0x246074=_0x3696d0;return BattleManager[_0x246074(0x113)]()?VisuMZ['BattleSystemCTB'][_0x246074(0x7d)][_0x246074(0x201)][_0x246074(0x11d)][_0x246074(0x132)](this,this):VisuMZ[_0x246074(0x164)]['Game_Battler_tpbBaseSpeed'][_0x246074(0x132)](this);},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0x9e)]=Game_Battler['prototype'][_0x3696d0(0x9f)],Game_Battler[_0x3696d0(0x9a)]['tpbRelativeSpeed']=function(){const _0x2a0ad6=_0x3696d0;return BattleManager['isCTB']()?VisuMZ[_0x2a0ad6(0x164)]['Settings'][_0x2a0ad6(0x201)]['BattlerRelativeSpeedJS'][_0x2a0ad6(0x132)](this,this):VisuMZ['BattleSystemCTB'][_0x2a0ad6(0x9e)][_0x2a0ad6(0x132)](this);},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0xd6)]=Game_Battler['prototype'][_0x3696d0(0xa8)],Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0xa8)]=function(){const _0x4ead49=_0x3696d0;if(BattleManager[_0x4ead49(0x113)]()){let _0x29f402=VisuMZ[_0x4ead49(0x164)][_0x4ead49(0x7d)][_0x4ead49(0x201)]['TpbAccelerationJS'][_0x4ead49(0x132)](this,this);const _0x3b0998=0x0;return _0x29f402+_0x3b0998;}else return VisuMZ[_0x4ead49(0x164)][_0x4ead49(0xd6)]['call'](this);},VisuMZ['BattleSystemCTB'][_0x3696d0(0x167)]=Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0x12f)],Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0x12f)]=function(){const _0x2f2815=_0x3696d0;return BattleManager[_0x2f2815(0x113)]()?VisuMZ[_0x2f2815(0x164)][_0x2f2815(0x7d)][_0x2f2815(0x201)][_0x2f2815(0x174)]['call'](this,this):VisuMZ[_0x2f2815(0x164)]['Game_Battler_tpbRequiredCastTime'][_0x2f2815(0x132)](this);},Game_Battler['prototype'][_0x3696d0(0x1db)]=function(){const _0x1f092e=_0x3696d0,_0x3fb08c=SceneManager[_0x1f092e(0x119)][_0x1f092e(0x160)];if(!_0x3fb08c)return-0x1;const _0x50e52c=_0x3fb08c[_0x1f092e(0x12d)];if(!_0x50e52c)return-0x1;const _0xf797e1=_0x50e52c[_0x1f092e(0x16a)](_0xbdd045=>_0xbdd045['battler']()===this);return _0x50e52c[_0x1f092e(0x15d)](_0xf797e1);},Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0x104)]=function(_0x3a72b3){const _0x4b3792=_0x3696d0;if(!BattleManager['isCTB']())return;if(!SceneManager[_0x4b3792(0x148)]())return;if(this===BattleManager[_0x4b3792(0x111)]())return;if(this===BattleManager['_subject'])return;const _0x87a82c=this['getCurrentTurnOrderPositionCTB']();if(_0x87a82c<0x0)return;this[_0x4b3792(0xc5)](_0x87a82c+_0x3a72b3);},Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0xc5)]=function(_0x2cf838){const _0x6e58d5=_0x3696d0;if(!BattleManager['isCTB']())return;if(!SceneManager[_0x6e58d5(0x148)]())return;if(this===BattleManager[_0x6e58d5(0x111)]())return;if(this===BattleManager[_0x6e58d5(0xf1)])return;_0x2cf838=Math[_0x6e58d5(0x197)](_0x2cf838,0x1),this['processTurnOrderChangeCTB'](_0x2cf838);},Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0xe6)]=function(_0x14a121){const _0x542803=_0x3696d0;if(!BattleManager[_0x542803(0x113)]())return;if(!SceneManager[_0x542803(0x148)]())return;if(this===BattleManager[_0x542803(0x111)]())return;if(this===BattleManager[_0x542803(0xf1)])return;const _0x203dc3=SceneManager[_0x542803(0x119)][_0x542803(0x160)];if(!_0x203dc3)return;const _0x404bc5=_0x203dc3[_0x542803(0x12d)];if(!_0x404bc5)return;const _0x1b902e=this['getCurrentTurnOrderPositionCTB']();_0x1b902e!==_0x14a121&&this[_0x542803(0x17e)](_0x14a121-_0x1b902e);let _0x1b3874=_0x14a121,_0x4b6b7a=_0x14a121;_0x1b902e>_0x14a121?_0x1b3874-=0x1:_0x4b6b7a+=0x1;const _0x4386c0=_0x404bc5[_0x1b3874][_0x542803(0x8b)](!![]),_0x92c5be=_0x404bc5[_0x4b6b7a][_0x542803(0x8b)](!![]),_0x32251a=(_0x4386c0+_0x92c5be)/0x2;let _0x95165a=_0x32251a*this['tpbAcceleration']();if(this['_tpbState']===_0x542803(0xf4))this[_0x542803(0xf7)]=0x1-_0x95165a;else this[_0x542803(0x1a9)]===_0x542803(0x124)&&(this[_0x542803(0xb2)]=this['tpbRequiredCastTime']()-_0x95165a);BattleManager[_0x542803(0x183)]=[],BattleManager[_0x542803(0x117)]();},Game_Battler['prototype']['onCtbOrderChange']=function(_0x143fc6){const _0x517c16=_0x3696d0,_0x3ccdaa=VisuMZ['BattleSystemCTB']['Settings'][_0x517c16(0x86)],_0x1fb7d0=_0x143fc6>0x0?'Delay':_0x517c16(0x156);if(_0x3ccdaa[_0x517c16(0x187)['format'](_0x1fb7d0)]){const _0x3c523b=_0x3ccdaa[_0x517c16(0x187)[_0x517c16(0xc3)](_0x1fb7d0)],_0x17cabe=_0x3ccdaa[_0x517c16(0x129)[_0x517c16(0xc3)](_0x1fb7d0)],_0x328600=_0x3ccdaa[_0x517c16(0x131)[_0x517c16(0xc3)](_0x1fb7d0)];$gameTemp[_0x517c16(0x142)]([this],_0x3c523b,_0x17cabe,_0x328600);}if(this['battler']()&&_0x3ccdaa[_0x517c16(0xf2)[_0x517c16(0xc3)](_0x1fb7d0)][_0x517c16(0x92)]>0x0){const _0x25bde8=_0x3ccdaa[_0x517c16(0xf2)[_0x517c16(0xc3)](_0x1fb7d0)],_0x22db82={'textColor':ColorManager[_0x517c16(0x1de)](_0x3ccdaa[_0x517c16(0x1e1)[_0x517c16(0xc3)](_0x1fb7d0)]),'flashColor':_0x3ccdaa[_0x517c16(0xa0)['format'](_0x1fb7d0)],'flashDuration':_0x3ccdaa['%1FlashDuration'[_0x517c16(0xc3)](_0x1fb7d0)]};this['setupTextPopup'](_0x25bde8,_0x22db82);}},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0xbd)]=Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0x1bb)],Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0x1bb)]=function(){const _0xcbaa56=_0x3696d0;BattleManager[_0xcbaa56(0x113)]()?this[_0xcbaa56(0xb0)]():VisuMZ[_0xcbaa56(0x164)]['Game_Battler_updateTpbChargeTime']['call'](this);},Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0xb0)]=function(){const _0x2cb55a=_0x3696d0;this[_0x2cb55a(0x1a9)]===_0x2cb55a(0xf4)&&(this[_0x2cb55a(0xf7)]+=this[_0x2cb55a(0xa8)](),this[_0x2cb55a(0xf7)]>=0x1&&this[_0x2cb55a(0x185)]());},VisuMZ['BattleSystemCTB'][_0x3696d0(0xfb)]=Game_Battler['prototype'][_0x3696d0(0x1e4)],Game_Battler['prototype'][_0x3696d0(0x1e4)]=function(){const _0x20bf5a=_0x3696d0;BattleManager[_0x20bf5a(0x113)]()?this[_0x20bf5a(0x198)]():VisuMZ[_0x20bf5a(0x164)][_0x20bf5a(0xfb)]['call'](this);},Game_Battler[_0x3696d0(0x9a)][_0x3696d0(0x198)]=function(){const _0xc0a634=_0x3696d0;this[_0xc0a634(0x1a9)]===_0xc0a634(0x124)&&(this['_tpbCastTime']+=this['tpbAcceleration'](),this[_0xc0a634(0xb2)]>=this[_0xc0a634(0x12f)]()&&(this['_tpbState']='ready'));},Game_Actor[_0x3696d0(0x9a)]['createTurnOrderCTBGraphicType']=function(){const _0x47dd30=_0x3696d0,_0x520440=this[_0x47dd30(0x111)]()['note'];if(_0x520440[_0x47dd30(0x15b)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x47dd30(0xea);else{if(_0x520440[_0x47dd30(0x15b)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x47dd30(0x1d5);}return Window_CTB_TurnOrder[_0x47dd30(0x7d)][_0x47dd30(0x141)];},Game_Actor[_0x3696d0(0x9a)]['TurnOrderCTBGraphicFaceName']=function(){const _0x551b82=_0x3696d0,_0x3d2149=this[_0x551b82(0x111)]()[_0x551b82(0x1c2)];if(_0x3d2149[_0x551b82(0x15b)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x551b82(0x193)]();},Game_Actor[_0x3696d0(0x9a)][_0x3696d0(0x189)]=function(){const _0x136d40=_0x3696d0,_0x195a82=this[_0x136d40(0x111)]()[_0x136d40(0x1c2)];if(_0x195a82[_0x136d40(0x15b)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x136d40(0x15c)]();},Game_Actor['prototype']['createTurnOrderCTBGraphicIconIndex']=function(){const _0x6c996e=_0x3696d0,_0x4a5a3c=this[_0x6c996e(0x111)]()[_0x6c996e(0x1c2)];if(_0x4a5a3c[_0x6c996e(0x15b)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_CTB_TurnOrder[_0x6c996e(0x7d)]['ActorBattlerIcon'];},Game_Enemy[_0x3696d0(0x9a)][_0x3696d0(0xd3)]=function(){const _0x14d887=_0x3696d0,_0x949855=this['enemy']()[_0x14d887(0x1c2)];if(_0x949855[_0x14d887(0x15b)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x14d887(0xea);else{if(_0x949855[_0x14d887(0x15b)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return Window_CTB_TurnOrder[_0x14d887(0x7d)][_0x14d887(0x1b8)];},Game_Enemy[_0x3696d0(0x9a)]['createTurnOrderCTBGraphicFaceName']=function(){const _0x350912=_0x3696d0,_0xcb95ad=this['enemy']()[_0x350912(0x1c2)];if(_0xcb95ad['match'](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_CTB_TurnOrder[_0x350912(0x7d)][_0x350912(0x1a7)];},Game_Enemy[_0x3696d0(0x9a)]['createTurnOrderCTBGraphicFaceIndex']=function(){const _0x48d66a=_0x3696d0,_0x5a6a9e=this[_0x48d66a(0x134)]()[_0x48d66a(0x1c2)];if(_0x5a6a9e[_0x48d66a(0x15b)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_CTB_TurnOrder[_0x48d66a(0x7d)][_0x48d66a(0x211)];},Game_Enemy[_0x3696d0(0x9a)][_0x3696d0(0x12c)]=function(){const _0x2f070b=_0x3696d0,_0x3cdc23=this[_0x2f070b(0x134)]()['note'];if(_0x3cdc23[_0x2f070b(0x15b)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_CTB_TurnOrder['Settings'][_0x2f070b(0xa2)];},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0x20f)]=Scene_Battle['prototype'][_0x3696d0(0x1cb)],Scene_Battle[_0x3696d0(0x9a)][_0x3696d0(0x1cb)]=function(){const _0x5e36f4=_0x3696d0;VisuMZ['BattleSystemCTB']['Scene_Battle_createAllWindows'][_0x5e36f4(0x132)](this),this[_0x5e36f4(0x219)]();},Scene_Battle['prototype'][_0x3696d0(0x219)]=function(){const _0x249cfe=_0x3696d0;if(!BattleManager[_0x249cfe(0x113)]())return;this[_0x249cfe(0x160)]=new Window_CTB_TurnOrder();const _0x33db77=this[_0x249cfe(0xba)](this['_windowLayer']);this[_0x249cfe(0xbb)](this['_ctbTurnOrderWindow'],_0x33db77),this['repositionLogWindowCTB'](),BattleManager['updateTurnOrderCTB'](!![]);},Scene_Battle[_0x3696d0(0x9a)][_0x3696d0(0x1ed)]=function(){const _0x47d546=_0x3696d0,_0x909cf9=Window_CTB_TurnOrder[_0x47d546(0x7d)];if(_0x909cf9[_0x47d546(0x1f0)]!=='top')return;if(!_0x909cf9[_0x47d546(0xdb)])return;if(!this['_logWindow'])return;const _0x152493=this[_0x47d546(0x160)]['y']-Math['round']((Graphics[_0x47d546(0x194)]-Graphics[_0x47d546(0x210)])/0x2),_0x68bbad=_0x152493+this[_0x47d546(0x160)]['height'];this[_0x47d546(0xfd)]['y']=_0x68bbad+_0x909cf9[_0x47d546(0x17a)];};function Sprite_CTB_TurnOrder_Battler(){const _0x159871=_0x3696d0;this[_0x159871(0x1d7)](...arguments);}Sprite_CTB_TurnOrder_Battler['prototype']=Object['create'](Sprite_Clickable[_0x3696d0(0x9a)]),Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)]['constructor']=Sprite_CTB_TurnOrder_Battler,Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)][_0x3696d0(0x1d7)]=function(_0x1b4db2,_0xd131cf,_0x29a0f4){const _0x291e50=_0x3696d0;this[_0x291e50(0x166)](_0x1b4db2,_0xd131cf,_0x29a0f4),Sprite_Clickable[_0x291e50(0x9a)][_0x291e50(0x1d7)][_0x291e50(0x132)](this),this['createChildren']();},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)][_0x3696d0(0x166)]=function(_0x2baffc,_0x354c81,_0x2f93e0){const _0x3efc0a=_0x3696d0;this[_0x3efc0a(0x120)]=_0x2baffc,this[_0x3efc0a(0x202)]=_0x354c81,this[_0x3efc0a(0xe1)]=_0x2f93e0;const _0x43e62d=Window_CTB_TurnOrder[_0x3efc0a(0x7d)],_0x2e8a18=this['isHorz'](),_0x16d468=this['defaultPosition']();this[_0x3efc0a(0xc7)]=0x0,this[_0x3efc0a(0x13d)]=_0x2e8a18?_0x43e62d[_0x3efc0a(0x21e)]*_0x16d468:0x0,this[_0x3efc0a(0x1a1)]=_0x2e8a18?0x0:_0x43e62d[_0x3efc0a(0x21e)]*_0x16d468,this['_fadeDuration']=0x0,this[_0x3efc0a(0x90)]=0xff,this[_0x3efc0a(0xe8)]=!![],this['_isAppeared']=!![];},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)][_0x3696d0(0x81)]=function(){const _0x5d3d10=_0x3696d0;this['createInitialPositions'](),this[_0x5d3d10(0x17b)](),this[_0x5d3d10(0x20b)](),this[_0x5d3d10(0x173)](),this[_0x5d3d10(0xdd)]();},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)][_0x3696d0(0x14f)]=function(){const _0x5bab1e=_0x3696d0;this['x']=this[_0x5bab1e(0x13d)],this['y']=this[_0x5bab1e(0x1a1)];},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)][_0x3696d0(0x133)]=function(){const _0x57f570=_0x3696d0,_0x3c6cbb=Window_CTB_TurnOrder[_0x57f570(0x7d)],_0x16d486=[_0x57f570(0xa1),_0x57f570(0x18f)][_0x57f570(0xbf)](_0x3c6cbb[_0x57f570(0x1f0)]);return _0x16d486;},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)][_0x3696d0(0xae)]=function(){const _0x18ebba=_0x3696d0,_0x42a692=Window_CTB_TurnOrder[_0x18ebba(0x7d)];return this[_0x18ebba(0x133)]()?_0x42a692[_0x18ebba(0x21e)]:_0x42a692[_0x18ebba(0x1aa)];},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)]['bitmapHeight']=function(){const _0x5e8573=_0x3696d0,_0x41c548=Window_CTB_TurnOrder[_0x5e8573(0x7d)];return this['isHorz']()?_0x41c548[_0x5e8573(0x1aa)]:_0x41c548[_0x5e8573(0x21e)];},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)]['createTestBitmap']=function(){const _0x111f83=_0x3696d0;this[_0x111f83(0x80)]=new Bitmap(0x48,0x24);const _0x18c327=this[_0x111f83(0x180)]()?this[_0x111f83(0x180)]()[_0x111f83(0x19c)]():'%1\x20%2\x20%3'[_0x111f83(0xc3)](this['_unit'],this[_0x111f83(0x202)],this[_0x111f83(0xe1)]);this[_0x111f83(0x80)][_0x111f83(0x165)](_0x18c327,0x0,0x0,0x48,0x24,'center');},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)][_0x3696d0(0x17b)]=function(){const _0x1f30b5=_0x3696d0;if(!Window_CTB_TurnOrder[_0x1f30b5(0x7d)][_0x1f30b5(0xfa)])return;const _0x2ea7ef=Window_CTB_TurnOrder[_0x1f30b5(0x7d)],_0x388a14=this['_unit']===$gameParty?_0x1f30b5(0x128):'Enemy',_0x49cebe=_0x1f30b5(0x11c)[_0x1f30b5(0xc3)](_0x388a14),_0x39ec79=new Sprite();_0x39ec79['anchor']['x']=this[_0x1f30b5(0x93)]['x'],_0x39ec79[_0x1f30b5(0x93)]['y']=this[_0x1f30b5(0x93)]['y'];if(_0x2ea7ef[_0x49cebe])_0x39ec79['bitmap']=ImageManager['loadSystem'](_0x2ea7ef[_0x49cebe]);else{const _0x58ffc5=this['bitmapWidth'](),_0x4eb617=this['bitmapHeight']();_0x39ec79[_0x1f30b5(0x80)]=new Bitmap(_0x58ffc5,_0x4eb617);const _0x1f3edb=ColorManager[_0x1f30b5(0x1de)](_0x2ea7ef['%1BgColor1'['format'](_0x388a14)]),_0x2028b8=ColorManager['getColor'](_0x2ea7ef[_0x1f30b5(0x181)[_0x1f30b5(0xc3)](_0x388a14)]);_0x39ec79['bitmap'][_0x1f30b5(0x1dd)](0x0,0x0,_0x58ffc5,_0x4eb617,_0x1f3edb,_0x2028b8,!![]);}this[_0x1f30b5(0x1c9)]=_0x39ec79,this[_0x1f30b5(0xce)](this['_backgroundSprite']),this[_0x1f30b5(0x195)]=this[_0x1f30b5(0x1c9)][_0x1f30b5(0x195)],this[_0x1f30b5(0x194)]=this[_0x1f30b5(0x1c9)][_0x1f30b5(0x194)];},Sprite_CTB_TurnOrder_Battler['prototype'][_0x3696d0(0x20b)]=function(){const _0xc909fb=_0x3696d0,_0x335f14=new Sprite();_0x335f14[_0xc909fb(0x93)]['x']=this['anchor']['x'],_0x335f14['anchor']['y']=this[_0xc909fb(0x93)]['y'],this['_graphicSprite']=_0x335f14,this['addChild'](this[_0xc909fb(0x1fc)]),this[_0xc909fb(0x1c3)]();},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)][_0x3696d0(0x173)]=function(){const _0xa5e2e5=_0x3696d0;if(!Window_CTB_TurnOrder[_0xa5e2e5(0x7d)][_0xa5e2e5(0x1b5)])return;const _0xabc87d=Window_CTB_TurnOrder[_0xa5e2e5(0x7d)],_0x4de07c=this[_0xa5e2e5(0x120)]===$gameParty?'Actor':_0xa5e2e5(0x1a2),_0x31a504=_0xa5e2e5(0x20e)[_0xa5e2e5(0xc3)](_0x4de07c),_0x321e71=new Sprite();_0x321e71[_0xa5e2e5(0x93)]['x']=this[_0xa5e2e5(0x93)]['x'],_0x321e71[_0xa5e2e5(0x93)]['y']=this[_0xa5e2e5(0x93)]['y'];if(_0xabc87d[_0x31a504])_0x321e71['bitmap']=ImageManager[_0xa5e2e5(0xcc)](_0xabc87d[_0x31a504]);else{let _0x26b7b5=this[_0xa5e2e5(0xae)](),_0x218058=this[_0xa5e2e5(0x118)](),_0x2e48bf=_0xabc87d['BorderThickness'];_0x321e71[_0xa5e2e5(0x80)]=new Bitmap(_0x26b7b5,_0x218058);const _0x5aba9f=_0xa5e2e5(0x8e),_0x476234=ColorManager[_0xa5e2e5(0x1de)](_0xabc87d[_0xa5e2e5(0x20a)['format'](_0x4de07c)]);_0x321e71[_0xa5e2e5(0x80)]['fillRect'](0x0,0x0,_0x26b7b5,_0x218058,_0x5aba9f),_0x26b7b5-=0x2,_0x218058-=0x2,_0x321e71['bitmap'][_0xa5e2e5(0xd0)](0x1,0x1,_0x26b7b5,_0x218058,_0x476234),_0x26b7b5-=_0x2e48bf*0x2,_0x218058-=_0x2e48bf*0x2,_0x321e71[_0xa5e2e5(0x80)][_0xa5e2e5(0xd0)](0x1+_0x2e48bf,0x1+_0x2e48bf,_0x26b7b5,_0x218058,_0x5aba9f),_0x26b7b5-=0x2,_0x218058-=0x2,_0x2e48bf+=0x1,_0x321e71[_0xa5e2e5(0x80)][_0xa5e2e5(0x19f)](0x1+_0x2e48bf,0x1+_0x2e48bf,_0x26b7b5,_0x218058);}this[_0xa5e2e5(0x1c9)]=_0x321e71,this[_0xa5e2e5(0xce)](this[_0xa5e2e5(0x1c9)]);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x3696d0(0xdd)]=function(){const _0xc36d5b=_0x3696d0,_0x47a7a5=Window_CTB_TurnOrder['Settings'];if(!_0x47a7a5[_0xc36d5b(0x1ad)])return;if(this[_0xc36d5b(0x120)]===$gameParty)return;const _0x3d5884=this[_0xc36d5b(0xae)](),_0x3f4bf6=this[_0xc36d5b(0x118)](),_0x153d60=new Sprite();_0x153d60[_0xc36d5b(0x93)]['x']=this['anchor']['x'],_0x153d60[_0xc36d5b(0x93)]['y']=this[_0xc36d5b(0x93)]['y'],_0x153d60[_0xc36d5b(0x80)]=new Bitmap(_0x3d5884,_0x3f4bf6),this[_0xc36d5b(0x1d3)]=_0x153d60,this[_0xc36d5b(0xce)](this['_letterSprite']);},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)][_0x3696d0(0x180)]=function(){const _0x41f42e=_0x3696d0;return this[_0x41f42e(0x120)]?this[_0x41f42e(0x120)][_0x41f42e(0xe5)]()[this[_0x41f42e(0x202)]]:null;},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)][_0x3696d0(0x8b)]=function(_0x25aa07){const _0xa41896=_0x3696d0,_0x39f8a3=this['battler']();if(!_0x39f8a3)return Number[_0xa41896(0x1af)];const _0x49c5c7=0x1*(this[_0xa41896(0xe1)]+0x1);return _0x39f8a3[_0xa41896(0x152)](_0x49c5c7,_0x25aa07);},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)][_0x3696d0(0x137)]=function(){const _0x1ec46c=_0x3696d0;Sprite_Clickable[_0x1ec46c(0x9a)][_0x1ec46c(0x137)][_0x1ec46c(0x132)](this),this['checkPosition'](),this[_0x1ec46c(0x20d)](),this[_0x1ec46c(0x11b)](),this[_0x1ec46c(0x16b)](),this[_0x1ec46c(0x1b3)](),this[_0x1ec46c(0x1f8)](),this[_0x1ec46c(0x1d1)](),this[_0x1ec46c(0x150)]();},Sprite_CTB_TurnOrder_Battler['prototype']['checkPosition']=function(){const _0x51a6d2=_0x3696d0,_0x1458d6=this[_0x51a6d2(0x175)]();if(this['_position']===_0x1458d6)return;this['_position']=_0x1458d6;const _0x3abdaf=Window_CTB_TurnOrder[_0x51a6d2(0x7d)],_0x5007e8=this[_0x51a6d2(0x133)](),_0x1b735d=_0x3abdaf[_0x51a6d2(0x18c)],_0x361f2b=_0x3abdaf[_0x51a6d2(0x1bd)],_0xdee283=SceneManager['_scene'][_0x51a6d2(0x160)];if(!_0xdee283)return;this['_positionDuration']=_0x3abdaf[_0x51a6d2(0x1b1)],this[_0x51a6d2(0x13d)]=_0x5007e8?_0x3abdaf['SpriteThin']*_0x1458d6:0x0,this[_0x51a6d2(0x1a1)]=_0x5007e8?0x0:_0x3abdaf[_0x51a6d2(0x21e)]*_0x1458d6,_0x1458d6>0x0&&(this['_positionTargetX']+=_0x5007e8?_0x361f2b:0x0,this[_0x51a6d2(0x1a1)]+=_0x5007e8?0x0:_0x361f2b),_0x1b735d?this[_0x51a6d2(0x13d)]=_0x5007e8?_0xdee283[_0x51a6d2(0x195)]-this['_positionTargetX']-_0x3abdaf[_0x51a6d2(0x21e)]:0x0:this['_positionTargetY']=_0x5007e8?0x0:_0xdee283[_0x51a6d2(0x194)]-this[_0x51a6d2(0x1a1)]-_0x3abdaf['SpriteThin'];},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)]['updatePosition']=function(){const _0x578e45=_0x3696d0;if(this[_0x578e45(0xb5)]>0x0)return;if(this['_positionDuration']>0x0){const _0x270359=this[_0x578e45(0xc7)];this['x']=(this['x']*(_0x270359-0x1)+this[_0x578e45(0x13d)])/_0x270359,this['y']=(this['y']*(_0x270359-0x1)+this[_0x578e45(0x1a1)])/_0x270359,this[_0x578e45(0xc7)]--;}this['_positionDuration']<=0x0&&(this['x']=this[_0x578e45(0x13d)],this['y']=this[_0x578e45(0x1a1)],this['opacity']<=0x0&&!this[_0x578e45(0x108)]&&this[_0x578e45(0x13a)](0xff));},Sprite_CTB_TurnOrder_Battler['prototype'][_0x3696d0(0x16e)]=function(){const _0x5d683d=_0x3696d0;return Window_CTB_TurnOrder['Settings'][_0x5d683d(0x216)]*0x14;},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)]['containerWindow']=function(){const _0x20c45c=_0x3696d0;return SceneManager[_0x20c45c(0x119)][_0x20c45c(0x160)];},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)][_0x3696d0(0x175)]=function(){const _0x157077=_0x3696d0;if(!this[_0x157077(0x171)]())return this[_0x157077(0x16e)]();const _0x56d93e=this['containerWindow']()['_turnOrderContainer'];return _0x56d93e[_0x157077(0x15d)](this);},Sprite_CTB_TurnOrder_Battler['prototype']['rotateDupeNumber']=function(){const _0x1ea675=_0x3696d0,_0x37b855=Window_CTB_TurnOrder[_0x1ea675(0x7d)],_0x5bc38b=this[_0x1ea675(0x133)](),_0x416145=_0x5bc38b?_0x37b855[_0x1ea675(0x216)]:_0x37b855[_0x1ea675(0xde)];this['_dupe']-=0x1,this['_dupe']<0x0&&(this[_0x1ea675(0xe1)]=_0x416145-0x1,this[_0x1ea675(0x13a)](0x0));},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)][_0x3696d0(0x13a)]=function(_0x4b51f5){const _0xbd25c2=_0x3696d0,_0x25422f=Window_CTB_TurnOrder['Settings'];this[_0xbd25c2(0xb5)]=_0x25422f[_0xbd25c2(0x1b1)],this[_0xbd25c2(0x90)]=_0x4b51f5;},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)]['checkOpacity']=function(){const _0x5b1e8c=_0x3696d0,_0x563d1=this[_0x5b1e8c(0x180)]();if(!_0x563d1)return;if(this[_0x5b1e8c(0xe8)]===_0x563d1[_0x5b1e8c(0xd5)]()&&this[_0x5b1e8c(0xbe)]===_0x563d1[_0x5b1e8c(0x1e6)]())return;this[_0x5b1e8c(0xe8)]=_0x563d1[_0x5b1e8c(0xd5)](),this[_0x5b1e8c(0xbe)]=_0x563d1['isAppeared']();let _0x8f5726=this['_isAlive']&&this['_isAppeared']?0xff:0x0;this[_0x5b1e8c(0x13a)](_0x8f5726);},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)]['updateOpacity']=function(){const _0x24f69b=_0x3696d0;if(this[_0x24f69b(0xb5)]>0x0){const _0x5396c7=this[_0x24f69b(0xb5)];this['opacity']=(this[_0x24f69b(0x1b2)]*(_0x5396c7-0x1)+this[_0x24f69b(0x90)])/_0x5396c7,this['_fadeDuration']--,this[_0x24f69b(0xb5)]<=0x0&&(this['checkPosition'](),this[_0x24f69b(0xc7)]=0x0,this[_0x24f69b(0x20d)](),this[_0x24f69b(0x1b2)]=this['_fadeTarget']);}if(this[_0x24f69b(0x108)])return;BattleManager['_phase']===_0x24f69b(0x98)&&(this[_0x24f69b(0x108)]=!![],this[_0x24f69b(0x13a)](0x0));},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)]['updateGraphic']=function(){const _0x50f6f5=_0x3696d0,_0x19bf76=this[_0x50f6f5(0x180)]();if(!_0x19bf76)return;const _0x5bd383=Window_CTB_TurnOrder[_0x50f6f5(0x7d)],_0x2a3f33=this[_0x50f6f5(0x120)]===$gameParty?_0x50f6f5(0x128):_0x50f6f5(0x1a2);let _0x105cfb=_0x19bf76[_0x50f6f5(0xfe)]();if(_0x19bf76['isActor']()&&_0x105cfb==='enemy')_0x105cfb=_0x50f6f5(0xea);else _0x19bf76[_0x50f6f5(0x99)]()&&_0x105cfb==='svactor'&&(_0x105cfb=_0x50f6f5(0x134));if(this[_0x50f6f5(0x179)]!==_0x105cfb)return this[_0x50f6f5(0x1c3)]();switch(this[_0x50f6f5(0x179)]){case'face':if(this[_0x50f6f5(0x13c)]!==_0x19bf76[_0x50f6f5(0x1a6)]())return this[_0x50f6f5(0x1c3)]();if(this[_0x50f6f5(0xc2)]!==_0x19bf76[_0x50f6f5(0x189)]())return this[_0x50f6f5(0x1c3)]();break;case _0x50f6f5(0x1d5):if(this[_0x50f6f5(0x215)]!==_0x19bf76[_0x50f6f5(0xa4)]())return this[_0x50f6f5(0x1c3)]();break;case'enemy':if(_0x19bf76[_0x50f6f5(0x155)]()){if(this[_0x50f6f5(0xc0)]!==_0x19bf76[_0x50f6f5(0x100)]())return this[_0x50f6f5(0x1c3)]();}else{if(this[_0x50f6f5(0x221)]!==_0x19bf76[_0x50f6f5(0xbc)]())return this[_0x50f6f5(0x1c3)]();}break;case _0x50f6f5(0x1a4):if(_0x19bf76['isActor']()){if(this['_graphicSv']!==_0x19bf76[_0x50f6f5(0xbc)]())return this[_0x50f6f5(0x1c3)]();}else{if(this[_0x50f6f5(0x221)]!==_0x19bf76[_0x50f6f5(0xbc)]())return this[_0x50f6f5(0x1c3)]();}break;}},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)][_0x3696d0(0x1c3)]=function(){const _0x5a76d1=_0x3696d0,_0x5baa78=this['battler']();if(!_0x5baa78)return;this[_0x5a76d1(0x179)]=_0x5baa78['TurnOrderCTBGraphicType']();if(_0x5baa78[_0x5a76d1(0x1ec)]()&&this[_0x5a76d1(0x179)]==='enemy')this[_0x5a76d1(0x179)]=_0x5a76d1(0xea);else _0x5baa78[_0x5a76d1(0x99)]()&&this[_0x5a76d1(0x179)]===_0x5a76d1(0x1a4)&&(this['_graphicType']=_0x5a76d1(0x134));let _0x1602ea;switch(this[_0x5a76d1(0x179)]){case'face':this[_0x5a76d1(0x13c)]=_0x5baa78[_0x5a76d1(0x1a6)](),this[_0x5a76d1(0xc2)]=_0x5baa78[_0x5a76d1(0x189)](),_0x1602ea=ImageManager[_0x5a76d1(0x1f5)](this[_0x5a76d1(0x13c)]),_0x1602ea[_0x5a76d1(0x1e5)](this[_0x5a76d1(0x154)][_0x5a76d1(0xb8)](this,_0x1602ea));break;case _0x5a76d1(0x1d5):this[_0x5a76d1(0x215)]=_0x5baa78[_0x5a76d1(0x12c)](),_0x1602ea=ImageManager[_0x5a76d1(0xcc)]('IconSet'),_0x1602ea['addLoadListener'](this[_0x5a76d1(0x8a)]['bind'](this,_0x1602ea));break;case _0x5a76d1(0x134):if(_0x5baa78[_0x5a76d1(0x155)]())this[_0x5a76d1(0xc0)]=_0x5baa78[_0x5a76d1(0x100)](),_0x1602ea=ImageManager['loadSvActor'](this['_graphicSv']),_0x1602ea[_0x5a76d1(0x1e5)](this[_0x5a76d1(0x10f)][_0x5a76d1(0xb8)](this,_0x1602ea));else $gameSystem[_0x5a76d1(0x1a3)]()?(this[_0x5a76d1(0x221)]=_0x5baa78[_0x5a76d1(0xbc)](),_0x1602ea=ImageManager[_0x5a76d1(0x1dc)](this['_graphicEnemy']),_0x1602ea[_0x5a76d1(0x1e5)](this[_0x5a76d1(0xf8)][_0x5a76d1(0xb8)](this,_0x1602ea))):(this[_0x5a76d1(0x221)]=_0x5baa78[_0x5a76d1(0xbc)](),_0x1602ea=ImageManager[_0x5a76d1(0x177)](this[_0x5a76d1(0x221)]),_0x1602ea['addLoadListener'](this[_0x5a76d1(0xf8)]['bind'](this,_0x1602ea)));break;case'svactor':this['_graphicSv']=_0x5baa78[_0x5a76d1(0xbc)](),_0x1602ea=ImageManager['loadSvActor'](this[_0x5a76d1(0xc0)]),_0x1602ea['addLoadListener'](this[_0x5a76d1(0x10f)][_0x5a76d1(0xb8)](this,_0x1602ea));break;}},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)]['changeFaceGraphicBitmap']=function(_0x13d50b){const _0x27a3ff=_0x3696d0,_0x5b3b93=this['_graphicFaceIndex'],_0x1be0ec=this['bitmapWidth'](),_0x38b07a=this[_0x27a3ff(0x118)](),_0x542c8f=Math[_0x27a3ff(0x197)](_0x1be0ec,_0x38b07a);this[_0x27a3ff(0x1fc)][_0x27a3ff(0x80)]=new Bitmap(_0x1be0ec,_0x38b07a);const _0x5cb7e8=this[_0x27a3ff(0x1fc)]['bitmap'],_0x3e6c03=ImageManager[_0x27a3ff(0x83)],_0x1eb009=ImageManager[_0x27a3ff(0x1ca)],_0x4e8a8e=_0x542c8f/Math[_0x27a3ff(0x197)](_0x3e6c03,_0x1eb009),_0x11e3eb=ImageManager[_0x27a3ff(0x83)],_0x18a8f5=ImageManager[_0x27a3ff(0x1ca)],_0x390731=_0x5b3b93%0x4*_0x3e6c03+(_0x3e6c03-_0x11e3eb)/0x2,_0xab0585=Math[_0x27a3ff(0x1fb)](_0x5b3b93/0x4)*_0x1eb009+(_0x1eb009-_0x18a8f5)/0x2,_0x5c55f5=(_0x1be0ec-_0x3e6c03*_0x4e8a8e)/0x2,_0x48cac3=(_0x38b07a-_0x1eb009*_0x4e8a8e)/0x2;_0x5cb7e8[_0x27a3ff(0x1e8)](_0x13d50b,_0x390731,_0xab0585,_0x11e3eb,_0x18a8f5,_0x5c55f5,_0x48cac3,_0x542c8f,_0x542c8f);},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)][_0x3696d0(0x8a)]=function(_0x30e818){const _0x39af13=_0x3696d0,_0x200650=this['_graphicIconIndex'],_0x16d2c6=this[_0x39af13(0xae)](),_0x7d12ac=this['bitmapHeight']();this[_0x39af13(0x1fc)][_0x39af13(0x80)]=new Bitmap(_0x16d2c6,_0x7d12ac);const _0xac218c=this[_0x39af13(0x1fc)][_0x39af13(0x80)],_0x349d08=ImageManager['iconWidth'],_0x27dfbc=ImageManager[_0x39af13(0x139)],_0x329b96=Math['min'](_0x349d08,_0x27dfbc,_0x16d2c6,_0x7d12ac),_0x59418a=_0x200650%0x10*_0x349d08,_0x573277=Math[_0x39af13(0x1fb)](_0x200650/0x10)*_0x27dfbc,_0x1f63cb=Math[_0x39af13(0x1fb)](Math[_0x39af13(0x197)](_0x16d2c6-_0x329b96,0x0)/0x2),_0x57d8c6=Math[_0x39af13(0x1fb)](Math[_0x39af13(0x197)](_0x7d12ac-_0x329b96,0x0)/0x2);_0xac218c['blt'](_0x30e818,_0x59418a,_0x573277,_0x349d08,_0x27dfbc,_0x1f63cb,_0x57d8c6,_0x329b96,_0x329b96);},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)][_0x3696d0(0x10f)]=function(_0x4f32d4){const _0x312f42=_0x3696d0,_0xc288eb=this[_0x312f42(0xae)](),_0xda5ceb=this[_0x312f42(0x118)](),_0x4ea578=Math[_0x312f42(0xe9)](_0xc288eb,_0xda5ceb);this[_0x312f42(0x1fc)]['bitmap']=new Bitmap(_0xc288eb,_0xda5ceb);const _0x462dc5=this['_graphicSprite'][_0x312f42(0x80)],_0x34ccfa=0x9,_0x58d990=0x6,_0x543a8d=_0x4f32d4[_0x312f42(0x195)]/_0x34ccfa,_0x14e445=_0x4f32d4['height']/_0x58d990,_0x165d72=Math['min'](0x1,_0x4ea578/_0x543a8d,_0x4ea578/_0x14e445),_0xb2cec0=_0x543a8d*_0x165d72,_0x3304ef=_0x14e445*_0x165d72,_0x35f298=Math[_0x312f42(0xa9)]((_0xc288eb-_0xb2cec0)/0x2),_0x22230a=Math[_0x312f42(0xa9)]((_0xda5ceb-_0x3304ef)/0x2);_0x462dc5[_0x312f42(0x1e8)](_0x4f32d4,0x0,0x0,_0x543a8d,_0x14e445,_0x35f298,_0x22230a,_0xb2cec0,_0x3304ef);},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)][_0x3696d0(0xf8)]=function(_0x3d9907){const _0x2b87c6=_0x3696d0,_0x2d37bd=Window_CTB_TurnOrder[_0x2b87c6(0x7d)],_0x441351=this[_0x2b87c6(0xae)](),_0x3fa598=this['bitmapHeight'](),_0x393fc9=Math[_0x2b87c6(0xe9)](_0x441351,_0x3fa598);this['_graphicSprite'][_0x2b87c6(0x80)]=new Bitmap(_0x441351,_0x3fa598);const _0x51bc80=this[_0x2b87c6(0x1fc)][_0x2b87c6(0x80)],_0x12c8a9=Math[_0x2b87c6(0xe9)](0x1,_0x393fc9/_0x3d9907['width'],_0x393fc9/_0x3d9907[_0x2b87c6(0x194)]),_0x486997=_0x3d9907['width']*_0x12c8a9,_0x483299=_0x3d9907[_0x2b87c6(0x194)]*_0x12c8a9,_0x138333=Math[_0x2b87c6(0xa9)]((_0x441351-_0x486997)/0x2),_0xd4292d=Math[_0x2b87c6(0xa9)]((_0x3fa598-_0x483299)/0x2);_0x51bc80[_0x2b87c6(0x1e8)](_0x3d9907,0x0,0x0,_0x3d9907[_0x2b87c6(0x195)],_0x3d9907['height'],_0x138333,_0xd4292d,_0x486997,_0x483299);},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)]['updateGraphicHue']=function(){const _0x6ad5e4=_0x3696d0,_0x87a05e=this[_0x6ad5e4(0x180)]();if(!_0x87a05e)return;if(!_0x87a05e[_0x6ad5e4(0x99)]())return;if(this['_graphicHue']===_0x87a05e[_0x6ad5e4(0x130)]())return;this[_0x6ad5e4(0x10e)]=_0x87a05e[_0x6ad5e4(0x130)]();if(_0x87a05e[_0x6ad5e4(0x155)]())this[_0x6ad5e4(0x10e)]=0x0;this[_0x6ad5e4(0x1fc)]['setHue'](this[_0x6ad5e4(0x10e)]);},Sprite_CTB_TurnOrder_Battler['prototype']['updateLetter']=function(){const _0xbf04e=_0x3696d0;if(!this['_letterSprite'])return;const _0x50989e=this[_0xbf04e(0x180)]();if(!_0x50989e)return;if(this[_0xbf04e(0x1d0)]===_0x50989e[_0xbf04e(0x1d0)]&&this['_plural']===_0x50989e[_0xbf04e(0x159)])return;this[_0xbf04e(0x1d0)]=_0x50989e[_0xbf04e(0x1d0)],this[_0xbf04e(0x159)]=_0x50989e[_0xbf04e(0x159)];const _0x28f481=Window_CTB_TurnOrder[_0xbf04e(0x7d)],_0xa640b0=this[_0xbf04e(0x133)](),_0x4ec65d=this[_0xbf04e(0xae)](),_0x4abcef=this[_0xbf04e(0x118)](),_0x491485=this[_0xbf04e(0x1d3)][_0xbf04e(0x80)];_0x491485[_0xbf04e(0x1eb)]();if(!this[_0xbf04e(0x159)])return;_0x491485[_0xbf04e(0x107)]=_0x28f481['EnemyBattlerFontFace']||$gameSystem[_0xbf04e(0x95)](),_0x491485[_0xbf04e(0xf5)]=_0x28f481[_0xbf04e(0xa6)]||0x10,_0xa640b0?_0x491485[_0xbf04e(0x165)](this[_0xbf04e(0x1d0)][_0xbf04e(0x213)](),0x0,_0x4abcef/0x2,_0x4ec65d,_0x4abcef/0x2,_0xbf04e(0x13b)):_0x491485[_0xbf04e(0x165)](this[_0xbf04e(0x1d0)]['trim'](),0x0,0x2,_0x4ec65d-0x8,_0x4abcef-0x4,_0xbf04e(0x1fe));},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)]['updateSelectionEffect']=function(){const _0x40938e=_0x3696d0,_0x482389=this[_0x40938e(0x180)]();if(!_0x482389)return;const _0x480a9e=_0x482389[_0x40938e(0x180)]();if(!_0x480a9e)return;const _0x32462b=_0x480a9e['mainSprite']();if(!_0x32462b)return;this[_0x40938e(0x14c)](_0x32462b[_0x40938e(0x1be)]);},Sprite_CTB_TurnOrder_Battler[_0x3696d0(0x9a)][_0x3696d0(0x15a)]=function(){const _0x570787=_0x3696d0;return this[_0x570787(0x180)]();},VisuMZ[_0x3696d0(0x164)]['Window_Help_setItem']=Window_Help[_0x3696d0(0x9a)][_0x3696d0(0xd8)],Window_Help[_0x3696d0(0x9a)]['setItem']=function(_0x3dcbae){const _0x22a843=_0x3696d0;BattleManager[_0x22a843(0x113)]()&&_0x3dcbae&&_0x3dcbae['note']&&_0x3dcbae['note'][_0x22a843(0x15b)](/<(?:CTB) HELP>\s*([\s\S]*)\s*<\/(?:CTB) HELP>/i)?this[_0x22a843(0x103)](String(RegExp['$1'])):VisuMZ[_0x22a843(0x164)][_0x22a843(0xca)][_0x22a843(0x132)](this,_0x3dcbae);},VisuMZ[_0x3696d0(0x164)][_0x3696d0(0xab)]=Window_StatusBase[_0x3696d0(0x9a)][_0x3696d0(0x13e)],Window_StatusBase[_0x3696d0(0x9a)][_0x3696d0(0x13e)]=function(_0xeef6e2,_0x3aca89,_0x4a4e39,_0x15da6f){const _0x242d5c=_0x3696d0;if(BattleManager[_0x242d5c(0x113)]()&&_0x3aca89===_0x242d5c(0x18b))return;VisuMZ['BattleSystemCTB'][_0x242d5c(0xab)][_0x242d5c(0x132)](this,_0xeef6e2,_0x3aca89,_0x4a4e39,_0x15da6f);};function Window_CTB_TurnOrder(){this['initialize'](...arguments);}Window_CTB_TurnOrder[_0x3696d0(0x9a)]=Object[_0x3696d0(0x1c8)](Window_Base[_0x3696d0(0x9a)]),Window_CTB_TurnOrder[_0x3696d0(0x9a)][_0x3696d0(0x223)]=Window_CTB_TurnOrder,Window_CTB_TurnOrder['Settings']=VisuMZ[_0x3696d0(0x164)][_0x3696d0(0x7d)]['TurnOrder'],Window_CTB_TurnOrder[_0x3696d0(0x9a)]['initialize']=function(){const _0x245d1a=_0x3696d0,_0xc080b0=this[_0x245d1a(0x169)]();this['_homeX']=_0xc080b0['x'],this[_0x245d1a(0x18d)]=_0xc080b0['y'],Window_Base[_0x245d1a(0x9a)][_0x245d1a(0x1d7)][_0x245d1a(0x132)](this,_0xc080b0),this[_0x245d1a(0x1c7)](),this['updateVisibility'](),this['opacity']=0x0;},Window_CTB_TurnOrder[_0x3696d0(0x9a)][_0x3696d0(0x169)]=function(){const _0x40a998=_0x3696d0,_0x2f78f0=Window_CTB_TurnOrder[_0x40a998(0x7d)],_0x1cbb36=SceneManager[_0x40a998(0x119)][_0x40a998(0x1ba)]['height'],_0x3cc666=SceneManager[_0x40a998(0x119)][_0x40a998(0xf9)]['height'],_0x3136af=_0x2f78f0[_0x40a998(0x1bd)];let _0x322a83=0x0,_0x174591=0x0,_0x293dfa=0x0,_0x2a519f=0x0;switch(_0x2f78f0[_0x40a998(0x1f0)]){case'top':_0x322a83=_0x2f78f0[_0x40a998(0x21e)]*_0x2f78f0[_0x40a998(0x216)]+_0x3136af,_0x174591=_0x2f78f0[_0x40a998(0x1aa)],_0x293dfa=Math[_0x40a998(0x144)]((Graphics[_0x40a998(0x195)]-_0x322a83)/0x2),_0x2a519f=_0x2f78f0[_0x40a998(0x17a)];break;case _0x40a998(0x18f):_0x322a83=_0x2f78f0[_0x40a998(0x21e)]*_0x2f78f0[_0x40a998(0x216)]+_0x3136af,_0x174591=_0x2f78f0['SpriteLength'],_0x293dfa=Math[_0x40a998(0x144)]((Graphics[_0x40a998(0x195)]-_0x322a83)/0x2),_0x2a519f=Graphics['height']-_0x1cbb36-_0x174591-_0x2f78f0[_0x40a998(0x17a)];break;case _0x40a998(0x140):_0x322a83=_0x2f78f0[_0x40a998(0x1aa)],_0x174591=_0x2f78f0[_0x40a998(0x21e)]*_0x2f78f0[_0x40a998(0xde)]+_0x3136af,_0x293dfa=_0x2f78f0[_0x40a998(0x17a)],_0x2a519f=Math[_0x40a998(0x144)]((Graphics[_0x40a998(0x194)]-_0x1cbb36+_0x3cc666-_0x174591)/0x2);break;case _0x40a998(0x1fe):_0x322a83=_0x2f78f0[_0x40a998(0x1aa)],_0x174591=_0x2f78f0[_0x40a998(0x21e)]*_0x2f78f0[_0x40a998(0xde)]+_0x3136af,_0x293dfa=Graphics[_0x40a998(0x195)]-_0x322a83-_0x2f78f0[_0x40a998(0x17a)],_0x2a519f=Math[_0x40a998(0x144)]((Graphics[_0x40a998(0x194)]-_0x1cbb36+_0x3cc666-_0x174591)/0x2);break;}return _0x293dfa+=_0x2f78f0[_0x40a998(0xee)],_0x2a519f+=_0x2f78f0['DisplayOffsetY'],new Rectangle(_0x293dfa,_0x2a519f,_0x322a83,_0x174591);},Window_CTB_TurnOrder['prototype'][_0x3696d0(0x1cd)]=function(){const _0x5ddf84=_0x3696d0;this[_0x5ddf84(0x206)]=0x0;},Window_CTB_TurnOrder['prototype']['isHorz']=function(){const _0x54475b=_0x3696d0,_0x22c4e8=Window_CTB_TurnOrder[_0x54475b(0x7d)],_0x206d7f=[_0x54475b(0xa1),_0x54475b(0x18f)][_0x54475b(0xbf)](_0x22c4e8[_0x54475b(0x1f0)]);return _0x206d7f;},Window_CTB_TurnOrder[_0x3696d0(0x9a)][_0x3696d0(0x1c7)]=function(){const _0x1459a5=_0x3696d0,_0x54de1e=Window_CTB_TurnOrder['Settings'],_0x14f9a2=this[_0x1459a5(0x133)](),_0x4f952e=_0x14f9a2?_0x54de1e[_0x1459a5(0x216)]:_0x54de1e[_0x1459a5(0xde)];this[_0x1459a5(0xaf)]=new Sprite(),this[_0x1459a5(0x158)](this['_turnOrderInnerSprite']),this[_0x1459a5(0x12d)]=[];for(let _0x370e7c=0x0;_0x370e7c<$gameParty[_0x1459a5(0x127)]();_0x370e7c++){for(let _0x4b50e4=0x0;_0x4b50e4<_0x4f952e;_0x4b50e4++){const _0x399af6=new Sprite_CTB_TurnOrder_Battler($gameParty,_0x370e7c,_0x4b50e4);this[_0x1459a5(0xaf)][_0x1459a5(0xce)](_0x399af6),this[_0x1459a5(0x12d)][_0x1459a5(0x11e)](_0x399af6);}}for(let _0xa768f=0x0;_0xa768f<0x8;_0xa768f++){for(let _0xfb2674=0x0;_0xfb2674<_0x4f952e;_0xfb2674++){const _0x555da5=new Sprite_CTB_TurnOrder_Battler($gameTroop,_0xa768f,_0xfb2674);this['_turnOrderInnerSprite'][_0x1459a5(0xce)](_0x555da5),this[_0x1459a5(0x12d)][_0x1459a5(0x11e)](_0x555da5);}}},Window_CTB_TurnOrder[_0x3696d0(0x9a)][_0x3696d0(0x137)]=function(){const _0x4ad744=_0x3696d0;Window_Base[_0x4ad744(0x9a)][_0x4ad744(0x137)][_0x4ad744(0x132)](this),this[_0x4ad744(0x20d)](),this['updateBattleContainerOrder'](),this[_0x4ad744(0xb4)]();},Window_CTB_TurnOrder['prototype'][_0x3696d0(0x20d)]=function(){const _0x1d0f1f=_0x3696d0,_0x5b14dc=Window_CTB_TurnOrder['Settings'];if(_0x5b14dc[_0x1d0f1f(0x1f0)]!==_0x1d0f1f(0xa1))return;if(!_0x5b14dc[_0x1d0f1f(0x1f2)])return;const _0x397d58=SceneManager[_0x1d0f1f(0x119)][_0x1d0f1f(0xf9)];if(!_0x397d58)return;_0x397d58[_0x1d0f1f(0x1c4)]?(this['x']=this[_0x1d0f1f(0x135)]+(_0x5b14dc[_0x1d0f1f(0x1ce)]||0x0),this['y']=this[_0x1d0f1f(0x18d)]+(_0x5b14dc['RepositionTopHelpY']||0x0)):(this['x']=this[_0x1d0f1f(0x135)],this['y']=this[_0x1d0f1f(0x18d)]);const _0x55557f=SceneManager[_0x1d0f1f(0x119)]['_windowLayer'];this[_0x1d0f1f(0xe7)]===undefined&&(this['_ogWindowLayerX']=Math['round']((Graphics[_0x1d0f1f(0x195)]-_0x55557f[_0x1d0f1f(0x195)])/0x2),this[_0x1d0f1f(0x145)]=Math[_0x1d0f1f(0xa9)]((Graphics['height']-_0x55557f[_0x1d0f1f(0x194)])/0x2)),this['x']+=_0x55557f['x']-this[_0x1d0f1f(0xe7)],this['y']+=_0x55557f['y']-this[_0x1d0f1f(0x145)];},Window_CTB_TurnOrder[_0x3696d0(0x9a)][_0x3696d0(0x1d6)]=function(){const _0xb914f3=_0x3696d0;if(!this[_0xb914f3(0xaf)])return;const _0x21a9c3=this[_0xb914f3(0xaf)]['children'];if(!_0x21a9c3)return;_0x21a9c3[_0xb914f3(0x9b)](this['compareBattlerSprites']['bind'](this));},Window_CTB_TurnOrder[_0x3696d0(0x9a)][_0x3696d0(0x85)]=function(_0x473054,_0x1cb81d){const _0x557c8e=_0x3696d0,_0xd283b3=this[_0x557c8e(0x133)](),_0x31a117=Window_CTB_TurnOrder[_0x557c8e(0x7d)]['OrderDirection'];if(_0xd283b3&&!_0x31a117)return _0x473054['x']-_0x1cb81d['x'];else{if(_0xd283b3&&_0x31a117)return _0x1cb81d['x']-_0x473054['x'];else{if(!_0xd283b3&&_0x31a117)return _0x473054['y']-_0x1cb81d['y'];else{if(!_0xd283b3&&!_0x31a117)return _0x1cb81d['y']-_0x473054['y'];}}}},Window_CTB_TurnOrder['prototype']['updateVisibility']=function(){const _0x1d19cf=_0x3696d0;this[_0x1d19cf(0x1c4)]=$gameSystem[_0x1d19cf(0x88)]();},Window_CTB_TurnOrder[_0x3696d0(0x9a)][_0x3696d0(0xd2)]=function(_0x5048b8){const _0xd5b53d=_0x3696d0;this[_0xd5b53d(0x12d)][_0xd5b53d(0x9b)]((_0x21e133,_0x3c3601)=>{const _0x1ed68c=_0xd5b53d;return _0x21e133[_0x1ed68c(0x8b)]()-_0x3c3601[_0x1ed68c(0x8b)]();});if(!_0x5048b8)return;for(const _0x1a6fde of this[_0xd5b53d(0x12d)]){if(!_0x1a6fde)continue;_0x1a6fde[_0xd5b53d(0x137)](),_0x1a6fde[_0xd5b53d(0xc7)]=0x0;}},Window_CTB_TurnOrder[_0x3696d0(0x9a)][_0x3696d0(0x1c1)]=function(_0x58ef5f){const _0x1eb04e=_0x3696d0;for(const _0x5efc77 of this['_turnOrderContainer']){if(!_0x5efc77)continue;if(_0x5efc77[_0x1eb04e(0x180)]()!==_0x58ef5f)continue;_0x5efc77[_0x1eb04e(0x1d9)]();}};