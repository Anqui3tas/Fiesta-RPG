//=============================================================================
// VisuStella MZ - Battle System - OTB - Order Turn Battle
// VisuMZ_2_BattleSystemOTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemOTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemOTB = VisuMZ.BattleSystemOTB || {};
VisuMZ.BattleSystemOTB.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.08] [BattleSystemOTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_OTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the RPG Maker MZ battle system to "Order Turn Battle",
 * a turn-based battle system where actions are executed immediately and the
 * orders for both the current and next turn are not only visible, but also
 * malleable. New mechanics are introduced where the player can manipulate the
 * turn order of an action's user or action's target in various ways they want.
 * 
 * The two Turn Orders are displayed at the top of the top of the screen to
 * give the player a clear understanding of who's turn it will be when it
 * becomes time to act, making it easier and viable for the player to formulate
 * strategies and adapt to the situation in battle.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "otb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Utilizes the balanced AGI nature of the Default Turn Battle system.
 * * Allows for actions to execute immediately upon selection.
 * * Two Turn Order Displays appear at the top of the screen, giving the player
 *   an idea of who's turn it will be and when, for both the current turn and
 *   the next turn.
 * * Skills and Items can have an "Instant Use" effect, which allows them to
 *   perform an action immediately without using up a turn.
 * * Skills and Items can manipulate the turn order of the action's user or the
 *   action's target(s). This can apply to either the current turn or the next
 *   turn, depending on the notetags and/or action effects used.
 * * The Turn Order Display will give a preview on how turn orders will change
 *   upon specific skills and/or items being used.
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
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Turn Order Displays
 * 
 * The Two Turn Order Displays will capture the battle's current and next turn
 * orders determined by the BattleManager. This feature does not overwrite any
 * functions, but the Turn Order Displays may or may not conflict with any
 * existing HUD elements that are already positioned on the screen. If so, you
 * can choose to offset the Turn Order Display or move it to a different part
 * of the screen through the plugin parameters.
 * 
 * ---
 * 
 * Agility
 * 
 * Agility behaves slightly different from normal when it comes to the Order
 * Turn Battle system. Aside from the first turn in battle, agility will always
 * calculate the turn order for the "Next Turn" when conducted. This means that
 * any changes to agility values will not have any effect on the next turn's
 * already established turn order.
 * 
 * However, this can be remedied by utilizing the notetags provided by this
 * plugin to alter the Next Turn orders for specific targets. In fact, for
 * skill and item "effects" that add AGI Buffs and/or Debuffs, the target's
 * turn position on the Turn Order Display will be manipulated in accordance.
 * This auto-conversion feature can be disabled in the Plugin Parameters.
 * 
 * ---
 * 
 * Action Speed
 * 
 * Because the Order Turn Battle system already calculates agility speeds
 * before selecting an action to perform, the effects of the actioon speed will
 * not work the same way it did with the default battle system. Instead, the
 * Action Speed will be sent through a formula to determine its effect on the
 * following turn, either pushing the user ahead in next turn's turn order
 * (with a positive speed value) or back (with a negative speed value).
 * 
 * This option can have its formula altered or straight up disabled in the
 * Plugin Parameters.
 * 
 * ---
 * 
 * Infinity Speed and Clamping
 * 
 * Since Action Speeds are decided in such a way, enemies that will survive a
 * stun state past two turns will have "Infinity" speed on the recovery turn,
 * allowing them to act first relative to the rest of the battle participants
 * in order to balance out the turns they've lost.
 * 
 * Enemies with "Infinity" speed cannot be overtaken through turn order
 * manipulation while they are on the "Next Turn" order. If anything, battlers
 * who shift their turn order faster will be just trailing behind them, thus
 * the "clamping" effect. However if this occurs during the "Current Turn"
 * order, all is fair game and any battler can overtake them. Plan out your
 * battle system effects carefully with these rules in mind.
 * 
 * If you do not like the idea of Infinity Speed and/or Clamping, you can turn
 * them off in the Plugin Parameters.
 * 
 * This effect does not affect stun states that last only one turn. The effect
 * will only occur with stun states that last 2 turns or more.
 * 
 * ---
 * 
 * Instant Use
 * 
 * Skills and Items can have an "Instant Use" property which allows them to be
 * used immediately without consuming a turn. This can be used for actions that
 * otherwise do not warrant a whole turn. These can be used for minor buffs,
 * debuffs, toggles, etc.
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
 * VisuMZ_2_PartySystem
 * 
 * In battle, the player cannot change entire parties at once from the Party
 * Command Window. The feature will be unaccessible while Order Turn Battle is
 * in play. However, the player can still change party members through the
 * Actor Command Window by having actors replace other actors. Party changing
 * is also available through battle events, Common Events, and script calls.
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
 * === General OTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <OTB Help>
 *  description
 *  description
 * </OTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under OTB.
 * - This is primarily used if the skill behaves differently in OTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to OTB.
 *
 * ---
 * 
 * === OTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the OTB Turn Order Display
 * 
 * ---
 *
 * <OTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <OTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <OTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Instant Use-Related Notetags ===
 * 
 * ---
 *
 * <OTB Instant>
 * <OTB Instant Use>
 * <OTB Instant Cast>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to be used immediately without consuming a turn.
 *
 * ---
 * 
 * === Added Action Notetags ===
 * 
 * ---
 * 
 * <OTB User Add Current Turn Actions: x>
 * <OTB User Add Next Turn Actions: x>
 * 
 * - Used for: Skill, Item Notetags
 * - Adds extra actions for the user to perform during the current/next turn.
 *   - Added actions will go towards the back of the action list.
 *   - Multi-hit skills/items will trigger this effect multiple times.
 * - Replace 'x' with a number representing the amount of actions to add.
 * 
 * ---
 * 
 * <OTB Target Add Current Turn Actions: x>
 * <OTB Target Add Next Turn Actions: x>
 * 
 * - Used for: Skill, Item Notetags
 * - Adds extra actions for the target to perform during the current/next turn.
 *   - Added actions will go towards the back of the action list.
 *   - Multi-hit skills/items will trigger this effect multiple times.
 * - Replace 'x' with a number representing the amount of actions to add.
 * 
 * ---
 * 
 * === Turn Order Manipulation-Related Notetags ===
 * 
 * ---
 *
 * <OTB User Current Turn: +x>
 * <OTB User Next Turn: +x>
 * <OTB User Follow Turn: +x>
 *
 * <OTB User Current Turn: -x>
 * <OTB User Next Turn: -x>
 * <OTB User Follow Turn: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the user's position in the turn order for the current turn, next
 *   turn, or whichever turn is following.
 * - If using the "Follow" variant, if the user has actions left for the
 *   current turn, it will affect the current turn. If not, it affects the
 *   next turn instead.
 * - Replace 'x' with a number representing the number of slots to change.
 *   - Negative numbers move the user closer to the front.
 *   - Positive numbers move the user towards the back.
 * - This effect only occurs once per skill/item use and at the start of the
 *   action when initializing the skill/item.
 *
 * ---
 *
 * <OTB Target Current Turn: +x>
 * <OTB Target Next Turn: +x>
 * <OTB Target Follow Turn: +x>
 *
 * <OTB Target Current Turn: -x>
 * <OTB Target Next Turn: -x>
 * <OTB Target Follow Turn: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the target's position in the turn order for the current turn, next
 *   turn, or whichever turn is following.
 * - If using the "Follow" variant, if the target has actions left for the
 *   current turn, it will affect the current turn. If not, it affects the
 *   next turn instead.
 * - Replace 'x' with a number representing the number of slots to change.
 *   - Negative numbers move the target closer to the front.
 *   - Positive numbers move the target towards the back.
 * - This effect will occur as many times as there are successfully connected
 *   hits for each target, meaning a target can have its turn order shifted
 *   multiple times.
 * - These are best used with single target skills/items as multi-target skills
 *   may shift multiple targets back and forth with each other if they are
 *   adjacent to one another.
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
 * Actor: Change OTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the OTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change OTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the OTB Turn Order.
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
 * Actor: Clear OTB Turn Order Graphic
 * - Clears the OTB Turn Order graphics for the actor(s).
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
 * Enemy: Change OTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the OTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change OTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the OTB Turn Order.
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
 * Enemy: Clear OTB Turn Order Graphic
 * - Clears the OTB Turn Order graphics for the enemy(ies).
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
 * System: OTB Turn Order Visibility
 * - Determine the visibility of the OTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the OTB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Conversion Settings
 * ============================================================================
 *
 * Automatically converts specific mechanics to fit OTB.
 *
 * ---
 *
 * Buffs
 * 
 *   AGI Buff => Current:
 *   - Auto-convert AGI Buff effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   AGI Buff => Next:
 *   - Auto-convert AGI Buff effects for Items/Skills to speed up target's
 *     next Turn Order?
 *
 * ---
 *
 * Debuffs
 * 
 *   AGI Debuff => Current:
 *   - Auto-convert AGI Debuff effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   AGI Debuff => Next:
 *   - Auto-convert AGI Debuff effects for Items/Skills to speed up target's
 *     next Turn Order?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of Battle System OTB. These range from how Action
 * Times are handled to speed.
 *
 * ---
 *
 * Action Times+
 * 
 *   Enable Action Times?:
 *   - Enable Action Times+ to have an effect on OTB?
 * 
 *     Randomize Order?:
 *     - If enabled, randomize the action order for added actions?
 *
 * ---
 *
 * Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   Post-Stun Infinity?:
 *   - After a 2+ turn stun states, battlers have infinity speed for their
 *     recovery turn.
 *   - Once again, this only applies to stun states that last 2+ turns.
 * 
 *     Infinity Clamp?:
 *     - Prevents turn order manipulation from going faster than infinity
 *       speed battlers.
 * 
 *   JS: Initial Speed:
 *   - Code used to calculate initial speed at the start of battle.
 * 
 *   JS: Speed => Order:
 *   - Code used to calculate how action speeds alter next turn's order.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System OTB. These adjust how the
 * two visible turn orders appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 *     - Top
 *     - Bottom
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
 *     Offset X:
 *     - Reposition the display's X coordinates by this much when the Help
 *       Window is visible.
 * 
 *     Offset Y:
 *     - Reposition the display's Y coordinates by this much when the Help
 *       Window is visible.
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *     - Left to Right
 *     - Right to Left
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
 * UI Background
 * 
 *   Background Style:
 *   - Select the style you want for the background.
 *     - fill
 *     - gradient
 *     - image
 *     - transparent
 * 
 *   Image Filename:
 *   - When using the "image" style, select an image from /img/system/ as the
 *     background image.
 * 
 *     Offset X:
 *     - How much do you want to offset the Background Image's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the Background Image's Y position?
 * 
 * ---
 * 
 * UI Text
 * 
 *   Font Size:
 *   - The font size used for parameter values.
 * 
 *   Active Battler Text:
 *   - Text used to display the active battler.
 *   - This text will always be center aligned.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Current Turn Text:
 *   - Text used to display the current turn.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Next Turn Text:
 *   - Text used to display the next turn.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Text Align:
 *   - Text alignment for the Current and Next Turn texts?
 *     - auto
 *     - left
 *     - center
 *     - right
 * 
 * ---
 * 
 * Slots
 * 
 *   Width:
 *   - How many pixels wide should the slots be on the Turn Order display?
 * 
 *   Height:
 *   - How many pixels tall should the slots be on the Turn Order display?
 * 
 *   Preview Scale:
 *   - How much do you want to scale the preview sprites by?
 *   - Use a number between 0 and 1 for the best results.
 * 
 *     Offset X:
 *     - How much do you want to offset the Preview Sprites' X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the Preview Sprites' Y position?
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
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
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
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
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
 * Version 1.08: March 10, 2022
 * * Feature Update!
 * ** OTB Instant Actions should now appear in the turn order in a more
 *    sensible fashion. Update made by Olivia.
 * 
 * Version 1.07: February 24, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Olivia:
 * *** <OTB User Add Current Turn Actions: x>
 * *** <OTB User Add Next Turn Actions: x>
 * *** <OTB Target Add Current Turn Actions: x>
 * *** <OTB Target Add Next Turn Actions: x>
 * **** Adds extra actions for the user/target to perform during the
 *      current/next turn.
 * **** Added actions will go towards the back of the action list.
 * **** Multi-hit skills/items will trigger this effect multiple times.
 * 
 * Version 1.05: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.04: August 6, 2021
 * * Bug Fixes!
 * ** Enemies with multiple actions will no longer step forward when it's not
 *    their turn. Fix made by Olivia.
 * 
 * Version 1.03: June 25, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 16, 2021
 * * Bug Fixes!
 * ** Post-stun infinity clamping should now be adjusted properly for
 *    previewing turn order changes.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** Subsequent battles will properly reset the turn order. Fix by Olivia.
 * 
 * Version 1.00 Official Release Date: April 26, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderActorIcon
 * @text Actor: Change OTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the OTB Turn Order.
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
 * @command OtbTurnOrderActorFace
 * @text Actor: Change OTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the OTB Turn Order.
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
 * @command OtbTurnOrderClearActorGraphic
 * @text Actor: Clear OTB Turn Order Graphic
 * @desc Clears the OTB Turn Order graphics for the actor(s).
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
 * @command OtbTurnOrderEnemyIcon
 * @text Enemy: Change OTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the OTB Turn Order.
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
 * @command OtbTurnOrderEnemyFace
 * @text Enemy: Change OTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the OTB Turn Order.
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
 * @command OtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear OTB Turn Order Graphic
 * @desc Clears the OTB Turn Order graphics for the enemy(ies).
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
 * @text System: OTB Turn Order Visibility
 * @desc Determine the visibility of the OTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the OTB Turn Order Display.
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
 * @param BattleSystemOTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Conversion:struct
 * @text Conversion Settings
 * @type struct<Conversion>
 * @desc Automatically converts specific mechanics to fit OTB.
 * @default {"Buffs":"","ConvertAgiBuffCurrent:eval":"true","ConvertAgiBuffNext:eval":"true","Debuffs":"","ConvertAgiDebuffCurrent:eval":"true","ConvertAgiDebuffNext:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Determines the mechanics of Battle System OTB.
 * @default {"Actions":"","EnableActionTimes:eval":"true","RandomizeActionTimesOrder:eval":"true","Speed":"","AllowRandomSpeed:eval":"false","PostStunInfinitySpeed:eval":"true","InfinityClamp:eval":"true","InitialSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\n\\n// Return Speed\\nreturn speed;\"","ConvertSpeedJS:func":"\"// Declare Constants\\nconst item = this.item();\\nconst modifier = 50;\\n\\n// Calculate Order Slots Changed\\nlet change = item.speed / (-modifier);\\nchange = (change >= 0) ? Math.ceil(change) : Math.floor(change);\\n\\n// Return Change\\nreturn change || 0;\""}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System OTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionTopHelpX:num":"+0","RepositionTopHelpY:num":"+96","RepositionLogWindow:eval":"true","LogWindowOffsetY:num":"+0","OrderDirection:eval":"false","SubjectDistance:num":"16","ScreenBuffer:num":"36","UiBackground":"","BgDimStyle:str":"gradient","BgImageFilename:str":"","BgImageOffsetX:num":"+0","BgImageOffsetY:num":"+0","UiText":"","UiFontSize:num":"16","UiSubjectText:str":"★","UiSubjectOffsetX:num":"+0","UiSubjectOffsetY:num":"-6","UiCurrentText:str":"✦CURRENT TURN✦","UiCurrentOffsetX:num":"+6","UiCurrentOffsetY:num":"-6","UiNextText:str":"✧NEXT TURN✧","UiNextOffsetX:num":"+6","UiNextOffsetY:num":"-6","UiAlignment:str":"auto","Slots":"","SpriteThin:num":"72","SpriteLength:num":"72","PreviewScale:num":"0.5","PreviewOffsetX:num":"+0","PreviewOffsetY:num":"+0","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","PreviewActorBorderColor:str":"0","ActorSystemBorder:str":"","PreviewActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","PreviewEnemyBorderColor:str":"0","EnemySystemBorder:str":"","PreviewEnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","PreviewActorBgColor1:str":"19","ActorBgColor2:str":"9","PreviewActorBgColor2:str":"0","ActorSystemBg:str":"","PreviewActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","PreviewEnemyBgColor1:str":"19","EnemyBgColor2:str":"18","PreviewEnemyBgColor2:str":"0","EnemySystemBg:str":"","PreviewEnemySystemBg:str":""}
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
 * Conversion Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Conversion:
 * 
 * @param Buffs
 *
 * @param ConvertAgiBuffCurrent:eval
 * @text AGI Buff => Current
 * @parent Buffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Buff effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiBuffNext:eval
 * @text AGI Buff => Next
 * @parent Buffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Buff effects for Items/Skills to speed up target's next Turn Order?
 * @default true
 * 
 * @param Debuffs
 *
 * @param ConvertAgiDebuffCurrent:eval
 * @text AGI Debuff => Current
 * @parent Debuffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Debuff effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiDebuffNext:eval
 * @text AGI Debuff => Next
 * @parent Debuffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Debuff effects for Items/Skills to speed up target's next Turn Order?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Actions
 * @text Action Times+
 *
 * @param EnableActionTimes:eval
 * @text Enable Action Times?
 * @parent Actions
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Action Times+ to have an effect on OTB?
 * @default true
 *
 * @param RandomizeActionTimesOrder:eval
 * @text Randomize Order?
 * @parent EnableActionTimes:eval
 * @type boolean
 * @on Randomize
 * @off Clumped
 * @desc If enabled, randomize the action order for added actions?
 * @default true
 * 
 * @param Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent Speed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param PostStunInfinitySpeed:eval
 * @text Post-Stun Infinity?
 * @parent Speed
 * @type boolean
 * @on Infinity
 * @off Normal
 * @desc After a 2+ turn stun states, battlers have infinity speed for their recovery turn.
 * @default true
 *
 * @param InfinityClamp:eval
 * @text Infinity Clamp?
 * @parent PostStunInfinitySpeed:eval
 * @type boolean
 * @on Enable Clamp
 * @off Disable Clamp
 * @desc Prevents turn order manipulation from going faster than infinity speed battlers.
 * @default true
 *
 * @param InitialSpeedJS:func
 * @text JS: Initial Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate initial speed at the start of battle.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ConvertSpeedJS:func
 * @text JS: Speed => Order
 * @parent Speed
 * @type note
 * @desc Code used to calculate how action speeds alter next turn's order.
 * @default "// Declare Constants\nconst item = this.item();\nconst modifier = 50;\n\n// Calculate Order Slots Changed\nlet change = item.speed / (-modifier);\nchange = (change >= 0) ? Math.ceil(change) : Math.floor(change);\n\n// Return Change\nreturn change || 0;"
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
 * @param RepositionTopHelpX:num
 * @text Offset X
 * @parent RepositionTopForHelp:eval
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default +0
 *
 * @param RepositionTopHelpY:num
 * @text Offset Y
 * @parent RepositionTopForHelp:eval
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default +96
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
 * @param LogWindowOffsetY:num
 * @text Offset Y
 * @parent RepositionLogWindow:eval
 * @desc How much do you want to offset the Log Window's Y position?
 * @default +0
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right
 * @off Right to Left
 * @desc Decide on the direction of the Turn Order.
 * @default false
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 16
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 36
 *
 * @param UiBackground
 * @text UI Background
 *
 * @param BgDimStyle:str
 * @text Background Style
 * @parent UiBackground
 * @type select
 * @option fill
 * @option gradient
 * @option image
 * @option transparent
 * @desc Select the style you want for the background.
 * @default gradient
 *
 * @param BgImageFilename:str
 * @text Image Filename
 * @parent UiBackground
 * @type file
 * @dir img/system/
 * @desc When using the "image" style, select an image from /img/system/ as the background image.
 * @default 
 *
 * @param BgImageOffsetX:num
 * @text Offset X
 * @parent BgImageFilename:str
 * @desc How much do you want to offset the Background Image's X position?
 * @default +0
 *
 * @param BgImageOffsetY:num
 * @text Offset Y
 * @parent BgImageFilename:str
 * @desc How much do you want to offset the Background Image's Y position?
 * @default +0
 *
 * @param UiText
 * @text UI Text
 *
 * @param UiFontSize:num
 * @text Font Size
 * @parent UiText
 * @desc The font size used for parameter values.
 * @default 16
 *
 * @param UiSubjectText:str
 * @text Active Battler Text
 * @parent UiText
 * @desc Text used to display the active battler.
 * This text will always be center aligned.
 * @default ★
 *
 * @param UiSubjectOffsetX:num
 * @text Offset X
 * @parent UiSubjectText:str
 * @desc How much do you want to offset the text's X position?
 * @default +0
 *
 * @param UiSubjectOffsetY:num
 * @text Offset Y
 * @parent UiSubjectText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiCurrentText:str
 * @text Current Turn Text
 * @parent UiText
 * @desc Text used to display the current turn.
 * @default ✦CURRENT TURN✦
 *
 * @param UiCurrentOffsetX:num
 * @text Offset X
 * @parent UiCurrentText:str
 * @desc How much do you want to offset the text's X position?
 * @default +6
 *
 * @param UiCurrentOffsetY:num
 * @text Offset Y
 * @parent UiCurrentText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiNextText:str
 * @text Next Turn Text
 * @parent UiText
 * @desc Text used to display the next turn.
 * @default ✧NEXT TURN✧
 *
 * @param UiNextOffsetX:num
 * @text Offset X
 * @parent UiNextText:str
 * @desc How much do you want to offset the text's X position?
 * @default +6
 *
 * @param UiNextOffsetY:num
 * @text Offset Y
 * @parent UiNextText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiAlignment:str
 * @text Text Align
 * @parent UiText
 * @type combo
 * @option auto
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Current and Next Turn texts?
 * @default auto
 * 
 * @param Slots
 *
 * @param SpriteThin:num
 * @text Width
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels wide should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteLength:num
 * @text Height
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels tall should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param PreviewScale:num
 * @text Preview Scale
 * @parent Slots
 * @desc How much do you want to scale the preview sprites by?
 * Use a number between 0 and 1 for the best results.
 * @default 0.5
 *
 * @param PreviewOffsetX:num
 * @text Offset X
 * @parent PreviewScale:num
 * @desc How much do you want to offset the Preview Sprites' X position?
 * @default +0
 *
 * @param PreviewOffsetY:num
 * @text Offset Y
 * @parent PreviewScale:num
 * @desc How much do you want to offset the Preview Sprites' Y position?
 * @default +0
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
 * @param PreviewActorBorderColor:str
 * @text Preview Version
 * @parent ActorBorderColor:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param PreviewActorSystemBorder:str
 * @text Preview Version
 * @parent ActorSystemBorder:str
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
 * @param PreviewEnemyBorderColor:str
 * @text Preview Version
 * @parent EnemyBorderColor:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param PreviewEnemySystemBorder:str
 * @text Preview Version
 * @parent EnemySystemBorder:str
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
 * @param PreviewActorBgColor1:str
 * @text Preview Version
 * @parent ActorBgColor1:str
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
 * @param PreviewActorBgColor2:str
 * @text Preview Version
 * @parent ActorBgColor2:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param PreviewActorSystemBg:str
 * @text Preview Version
 * @parent ActorSystemBg:str
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
 * @param PreviewEnemyBgColor1:str
 * @text Preview Version
 * @parent EnemyBgColor1:str
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
 * @param PreviewEnemyBgColor2:str
 * @text Preview Version
 * @parent EnemyBgColor2:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 * @param PreviewEnemySystemBg:str
 * @text Preview Version
 * @parent EnemySystemBg:str
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
//=============================================================================

const _0x22f2b4=_0x2ead;(function(_0x355fe5,_0x42440b){const _0x241de3=_0x2ead,_0x292848=_0x355fe5();while(!![]){try{const _0x140676=parseInt(_0x241de3(0xad))/0x1*(-parseInt(_0x241de3(0xf5))/0x2)+-parseInt(_0x241de3(0x104))/0x3+-parseInt(_0x241de3(0x226))/0x4*(-parseInt(_0x241de3(0x285))/0x5)+-parseInt(_0x241de3(0x1a9))/0x6*(parseInt(_0x241de3(0x13f))/0x7)+-parseInt(_0x241de3(0x160))/0x8+-parseInt(_0x241de3(0xa5))/0x9*(parseInt(_0x241de3(0x14b))/0xa)+-parseInt(_0x241de3(0xed))/0xb*(-parseInt(_0x241de3(0x143))/0xc);if(_0x140676===_0x42440b)break;else _0x292848['push'](_0x292848['shift']());}catch(_0x21eca8){_0x292848['push'](_0x292848['shift']());}}}(_0x6bbd,0x43175));var label='BattleSystemOTB',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x22f2b4(0x1e2)](function(_0x19dfaf){const _0x20d5aa=_0x22f2b4;return _0x19dfaf[_0x20d5aa(0x242)]&&_0x19dfaf[_0x20d5aa(0x28c)][_0x20d5aa(0x208)]('['+label+']');})[0x0];function _0x2ead(_0x8036ee,_0x1be6f5){const _0x6bbd86=_0x6bbd();return _0x2ead=function(_0x2ead92,_0x2d743f){_0x2ead92=_0x2ead92-0x8f;let _0x425be5=_0x6bbd86[_0x2ead92];return _0x425be5;},_0x2ead(_0x8036ee,_0x1be6f5);}VisuMZ[label][_0x22f2b4(0x2fb)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x22f2b4(0x153)]=function(_0x5d6aca,_0x246fb9){const _0x271a99=_0x22f2b4;for(const _0xabc144 in _0x246fb9){if(_0xabc144[_0x271a99(0x213)](/(.*):(.*)/i)){if(_0x271a99(0x316)==='gZFYd'){const _0x3aa35b=String(RegExp['$1']),_0x51237f=String(RegExp['$2'])[_0x271a99(0x1cb)]()[_0x271a99(0x2d7)]();let _0x1b7ded,_0x3d1b88,_0x14e793;switch(_0x51237f){case _0x271a99(0x11a):_0x1b7ded=_0x246fb9[_0xabc144]!==''?Number(_0x246fb9[_0xabc144]):0x0;break;case _0x271a99(0x1fa):_0x3d1b88=_0x246fb9[_0xabc144]!==''?JSON[_0x271a99(0x2cd)](_0x246fb9[_0xabc144]):[],_0x1b7ded=_0x3d1b88[_0x271a99(0x25b)](_0x3af683=>Number(_0x3af683));break;case _0x271a99(0x301):_0x1b7ded=_0x246fb9[_0xabc144]!==''?eval(_0x246fb9[_0xabc144]):null;break;case _0x271a99(0x25d):_0x3d1b88=_0x246fb9[_0xabc144]!==''?JSON[_0x271a99(0x2cd)](_0x246fb9[_0xabc144]):[],_0x1b7ded=_0x3d1b88['map'](_0x5c8579=>eval(_0x5c8579));break;case _0x271a99(0x235):_0x1b7ded=_0x246fb9[_0xabc144]!==''?JSON['parse'](_0x246fb9[_0xabc144]):'';break;case'ARRAYJSON':_0x3d1b88=_0x246fb9[_0xabc144]!==''?JSON[_0x271a99(0x2cd)](_0x246fb9[_0xabc144]):[],_0x1b7ded=_0x3d1b88[_0x271a99(0x25b)](_0x5cef69=>JSON['parse'](_0x5cef69));break;case'FUNC':_0x1b7ded=_0x246fb9[_0xabc144]!==''?new Function(JSON['parse'](_0x246fb9[_0xabc144])):new Function('return\x200');break;case'ARRAYFUNC':_0x3d1b88=_0x246fb9[_0xabc144]!==''?JSON[_0x271a99(0x2cd)](_0x246fb9[_0xabc144]):[],_0x1b7ded=_0x3d1b88[_0x271a99(0x25b)](_0x81608a=>new Function(JSON[_0x271a99(0x2cd)](_0x81608a)));break;case _0x271a99(0x118):_0x1b7ded=_0x246fb9[_0xabc144]!==''?String(_0x246fb9[_0xabc144]):'';break;case _0x271a99(0xa3):_0x3d1b88=_0x246fb9[_0xabc144]!==''?JSON[_0x271a99(0x2cd)](_0x246fb9[_0xabc144]):[],_0x1b7ded=_0x3d1b88[_0x271a99(0x25b)](_0x13ec83=>String(_0x13ec83));break;case'STRUCT':_0x14e793=_0x246fb9[_0xabc144]!==''?JSON['parse'](_0x246fb9[_0xabc144]):{},_0x1b7ded=VisuMZ[_0x271a99(0x153)]({},_0x14e793);break;case _0x271a99(0x1db):_0x3d1b88=_0x246fb9[_0xabc144]!==''?JSON[_0x271a99(0x2cd)](_0x246fb9[_0xabc144]):[],_0x1b7ded=_0x3d1b88[_0x271a99(0x25b)](_0x1d36c2=>VisuMZ[_0x271a99(0x153)]({},JSON[_0x271a99(0x2cd)](_0x1d36c2)));break;default:continue;}_0x5d6aca[_0x3aa35b]=_0x1b7ded;}else{const _0x8824d2=this[_0x271a99(0x2ac)];this[_0x271a99(0x187)]()&&delete _0x8824d2[_0x271a99(0x193)][_0x271a99(0x16f)];}}}return _0x5d6aca;},(_0x66040=>{const _0x28b5bf=_0x22f2b4,_0x3e868e=_0x66040['name'];for(const _0x555d34 of dependencies){if(!Imported[_0x555d34]){alert(_0x28b5bf(0xaa)[_0x28b5bf(0x1d5)](_0x3e868e,_0x555d34)),SceneManager[_0x28b5bf(0x1f4)]();break;}}const _0x180c49=_0x66040[_0x28b5bf(0x28c)];if(_0x180c49[_0x28b5bf(0x213)](/\[Version[ ](.*?)\]/i)){if(_0x28b5bf(0x159)===_0x28b5bf(0x129))return-_0x24e7e5;else{const _0x484b06=Number(RegExp['$1']);_0x484b06!==VisuMZ[label][_0x28b5bf(0xb8)]&&(alert(_0x28b5bf(0x29d)['format'](_0x3e868e,_0x484b06)),SceneManager[_0x28b5bf(0x1f4)]());}}if(_0x180c49[_0x28b5bf(0x213)](/\[Tier[ ](\d+)\]/i)){if(_0x28b5bf(0x22f)===_0x28b5bf(0x22f)){const _0x3c1302=Number(RegExp['$1']);_0x3c1302<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x3e868e,_0x3c1302,tier)),SceneManager['exit']()):_0x28b5bf(0x2b2)==='dmWJw'?_0x4994a3['addBattlerToTurnOrderAtStart'](_0x1a5f04,_0x47f689):tier=Math[_0x28b5bf(0x2ef)](_0x3c1302,tier);}else{const _0x5eb41b=this['battler']();if(!_0x5eb41b)return;const _0x4464d1=_0x5eb41b[_0x28b5bf(0x13a)]();if(!_0x4464d1)return;const _0x79889f=_0x4464d1[_0x28b5bf(0x2a1)]();if(!_0x79889f)return;this['setBlendColor'](_0x79889f['_blendColor']);}}VisuMZ[_0x28b5bf(0x153)](VisuMZ[label]['Settings'],_0x66040[_0x28b5bf(0x11c)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x22f2b4(0x10f)],_0x22f2b4(0x164),_0x1e1890=>{const _0x522beb=_0x22f2b4;VisuMZ[_0x522beb(0x153)](_0x1e1890,_0x1e1890);const _0x1cc9e9=_0x1e1890[_0x522beb(0x1a2)],_0x59e6d4=_0x1e1890[_0x522beb(0xda)];for(const _0x3dc92e of _0x1cc9e9){const _0x3d678f=$gameActors[_0x522beb(0xb9)](_0x3dc92e);if(!_0x3d678f)continue;_0x3d678f['_otbTurnOrderGraphicType']='icon',_0x3d678f[_0x522beb(0x8f)]=_0x59e6d4;}}),PluginManager[_0x22f2b4(0x260)](pluginData[_0x22f2b4(0x10f)],_0x22f2b4(0x17c),_0x5a360b=>{const _0x1bec06=_0x22f2b4;VisuMZ[_0x1bec06(0x153)](_0x5a360b,_0x5a360b);const _0x12afb5=_0x5a360b['Actors'],_0x5c6c0e=_0x5a360b[_0x1bec06(0x97)],_0x364da7=_0x5a360b[_0x1bec06(0x16e)];for(const _0x2873d2 of _0x12afb5){const _0x2c1509=$gameActors[_0x1bec06(0xb9)](_0x2873d2);if(!_0x2c1509)continue;_0x2c1509[_0x1bec06(0x271)]=_0x1bec06(0x255),_0x2c1509['_otbTurnOrderFaceName']=_0x5c6c0e,_0x2c1509[_0x1bec06(0x27e)]=_0x364da7;}}),PluginManager[_0x22f2b4(0x260)](pluginData[_0x22f2b4(0x10f)],_0x22f2b4(0x1b4),_0x5c4aeb=>{const _0x51cb37=_0x22f2b4;VisuMZ[_0x51cb37(0x153)](_0x5c4aeb,_0x5c4aeb);const _0x26afd6=_0x5c4aeb[_0x51cb37(0x1a2)];for(const _0x17d7db of _0x26afd6){const _0x59c9ea=$gameActors[_0x51cb37(0xb9)](_0x17d7db);if(!_0x59c9ea)continue;_0x59c9ea[_0x51cb37(0x2e7)]();}}),PluginManager[_0x22f2b4(0x260)](pluginData[_0x22f2b4(0x10f)],'OtbTurnOrderEnemyIcon',_0x5163a0=>{const _0x252096=_0x22f2b4;VisuMZ[_0x252096(0x153)](_0x5163a0,_0x5163a0);const _0x382ced=_0x5163a0[_0x252096(0x1de)],_0x13f834=_0x5163a0['IconIndex'];for(const _0x30756d of _0x382ced){if('Rnrje'!==_0x252096(0x319)){const _0x4d3af0=$gameTroop['members']()[_0x30756d];if(!_0x4d3af0)continue;_0x4d3af0[_0x252096(0x271)]='icon',_0x4d3af0[_0x252096(0x8f)]=_0x13f834;}else _0x4ee2b6[_0x252096(0x269)]['Scene_Battle_commandCancel']['call'](this);}}),PluginManager['registerCommand'](pluginData[_0x22f2b4(0x10f)],'OtbTurnOrderEnemyFace',_0x28acf3=>{const _0x52a9f8=_0x22f2b4;VisuMZ['ConvertParams'](_0x28acf3,_0x28acf3);const _0x100cae=_0x28acf3['Enemies'],_0x43065b=_0x28acf3[_0x52a9f8(0x97)],_0x81bc71=_0x28acf3[_0x52a9f8(0x16e)];for(const _0x5b3452 of _0x100cae){if('qRPZP'===_0x52a9f8(0x230)){const _0x2c2195=$gameTroop['members']()[_0x5b3452];if(!_0x2c2195)continue;_0x2c2195[_0x52a9f8(0x271)]=_0x52a9f8(0x255),_0x2c2195['_otbTurnOrderFaceName']=_0x43065b,_0x2c2195[_0x52a9f8(0x27e)]=_0x81bc71;}else{_0x222c8f[_0x52a9f8(0x269)][_0x52a9f8(0x219)][_0x52a9f8(0x282)](this,_0x420f11);if(_0x2d81c2[_0x52a9f8(0x27c)])return;_0x84b90[_0x52a9f8(0x135)]()&&_0x45e183[_0x52a9f8(0x1d4)]()&&(_0x402ba4[_0x52a9f8(0x2b7)](),_0x1b35ca[_0x52a9f8(0x95)](_0x1180c4['actor'](_0x18e769)));}}}),PluginManager[_0x22f2b4(0x260)](pluginData['name'],_0x22f2b4(0x1c4),_0x5343e9=>{const _0x3ee5b6=_0x22f2b4;VisuMZ[_0x3ee5b6(0x153)](_0x5343e9,_0x5343e9);const _0x2aad17=_0x5343e9[_0x3ee5b6(0x1de)];for(const _0x554543 of _0x2aad17){if(_0x3ee5b6(0xf7)===_0x3ee5b6(0x225))_0x3b0883+=_0x220a5e(_0x4a019f['$1']);else{const _0xa50f74=$gameTroop[_0x3ee5b6(0x22d)]()[_0x554543];if(!_0xa50f74)continue;_0xa50f74[_0x3ee5b6(0x2e7)]();}}}),PluginManager['registerCommand'](pluginData[_0x22f2b4(0x10f)],'SystemTurnOrderVisibility',_0x5d5173=>{const _0x4437b7=_0x22f2b4;VisuMZ[_0x4437b7(0x153)](_0x5d5173,_0x5d5173);const _0x3752ba=_0x5d5173[_0x4437b7(0x119)];$gameSystem[_0x4437b7(0x14d)](_0x3752ba);}),VisuMZ['BattleSystemOTB'][_0x22f2b4(0x2c7)]={'Instant':/<OTB (?:INSTANT|INSTANT CAST|INSTANT USE)>/i,'UserFollOrder':/<OTB USER FOLLOW TURN: ([\+\-]\d+)>/i,'UserCurrOrder':/<OTB USER CURRENT TURN: ([\+\-]\d+)>/i,'UserNextOrder':/<OTB USER NEXT TURN: ([\+\-]\d+)>/i,'TargetFollOrder':/<OTB TARGET FOLLOW TURN: ([\+\-]\d+)>/i,'TargetCurrOrder':/<OTB TARGET CURRENT TURN: ([\+\-]\d+)>/i,'TargetNextOrder':/<OTB TARGET NEXT TURN: ([\+\-]\d+)>/i,'UserAddActionCurrent':/<OTB USER ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'UserAddActionNext':/<OTB USER ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionCurrent':/<OTB TARGET ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionNext':/<OTB TARGET ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i},DataManager['getStateIdWithName']=function(_0x1dba53){const _0x155d02=_0x22f2b4;_0x1dba53=_0x1dba53[_0x155d02(0x1cb)]()[_0x155d02(0x2d7)](),this['_stateIDs']=this['_stateIDs']||{};if(this[_0x155d02(0x252)][_0x1dba53])return this[_0x155d02(0x252)][_0x1dba53];for(const _0x39c674 of $dataStates){if(!_0x39c674)continue;this[_0x155d02(0x252)][_0x39c674['name'][_0x155d02(0x1cb)]()[_0x155d02(0x2d7)]()]=_0x39c674['id'];}return this[_0x155d02(0x252)][_0x1dba53]||0x0;},ImageManager[_0x22f2b4(0x2d4)]=ImageManager[_0x22f2b4(0x2d4)]||0x9,ImageManager[_0x22f2b4(0x198)]=ImageManager[_0x22f2b4(0x198)]||0x6,SceneManager[_0x22f2b4(0x135)]=function(){const _0x47c214=_0x22f2b4;return this[_0x47c214(0x2be)]&&this[_0x47c214(0x2be)][_0x47c214(0x211)]===Scene_Battle;},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x172)]=BattleManager[_0x22f2b4(0x223)],BattleManager[_0x22f2b4(0x223)]=function(_0x2eac36,_0x3c2fa9,_0x23fccc){const _0x584c9f=_0x22f2b4;VisuMZ[_0x584c9f(0x269)][_0x584c9f(0x172)][_0x584c9f(0x282)](this,_0x2eac36,_0x3c2fa9,_0x23fccc),this[_0x584c9f(0x2d6)]();},BattleManager['initMembersOTB']=function(){const _0x4a6050=_0x22f2b4;if(!this[_0x4a6050(0x1d4)]())return;this['_otb_actionBattlersNext']=[],this[_0x4a6050(0xcc)]=![];},VisuMZ['BattleSystemOTB'][_0x22f2b4(0xd5)]=BattleManager['battleSys'],BattleManager['battleSys']=function(){const _0x9b829a=_0x22f2b4;if(this[_0x9b829a(0x1d4)]())return _0x9b829a(0x1d0);return VisuMZ['BattleSystemOTB'][_0x9b829a(0xd5)][_0x9b829a(0x282)](this);},BattleManager[_0x22f2b4(0x1d4)]=function(){const _0x110b0b=_0x22f2b4;return $gameSystem['getBattleSystem']()===_0x110b0b(0x1d0);},VisuMZ['BattleSystemOTB'][_0x22f2b4(0x17d)]=BattleManager['isTpb'],BattleManager[_0x22f2b4(0x2b5)]=function(){const _0x11c5b5=_0x22f2b4;if(this[_0x11c5b5(0x1d4)]())return![];return VisuMZ[_0x11c5b5(0x269)][_0x11c5b5(0x17d)][_0x11c5b5(0x282)](this);},VisuMZ['BattleSystemOTB'][_0x22f2b4(0x23a)]=BattleManager['isActiveTpb'],BattleManager[_0x22f2b4(0x18b)]=function(){const _0x3ddf0a=_0x22f2b4;if(this[_0x3ddf0a(0x1d4)]())return![];return VisuMZ[_0x3ddf0a(0x269)][_0x3ddf0a(0x23a)]['call'](this);},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0xaf)]=BattleManager[_0x22f2b4(0x303)],BattleManager[_0x22f2b4(0x303)]=function(){const _0x36e248=_0x22f2b4;if(this[_0x36e248(0x1d4)]())return!![];return VisuMZ[_0x36e248(0x269)]['BattleManager_isTurnBased'][_0x36e248(0x282)](this);},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x314)]=BattleManager[_0x22f2b4(0x13e)],BattleManager[_0x22f2b4(0x13e)]=function(){const _0x3267fd=_0x22f2b4;VisuMZ[_0x3267fd(0x269)][_0x3267fd(0x314)]['call'](this),this[_0x3267fd(0x1d4)]()&&$gameParty[_0x3267fd(0x2f7)]()&&!this['_surprise']&&this['startInputOTB']();},BattleManager[_0x22f2b4(0x30f)]=function(){this['startTurn']();},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x250)]=BattleManager['processTurn'],BattleManager['processTurn']=function(){const _0x4010aa=_0x22f2b4;this[_0x4010aa(0x1d4)]()?this['processTurnOTB']():VisuMZ[_0x4010aa(0x269)]['BattleManager_processTurn'][_0x4010aa(0x282)](this);},BattleManager['processTurnOTB']=function(){const _0x5c6f08=_0x22f2b4,_0x2fbfff=this[_0x5c6f08(0x1a4)];if(_0x2fbfff['isActor']()&&_0x2fbfff['canInput']()){if(_0x5c6f08(0x234)!=='vZgnS'){if(!_0x47a537)return;const _0x5cf21f=_0x3af8d8[_0x5c6f08(0x2de)]();_0x361392[_0x5c6f08(0x2d0)]();if(!this[_0x5c6f08(0x1e3)][_0x5c6f08(0x208)](_0x48ee29)){const _0x5bdaca=_0x55e166[_0x5c6f08(0x2ef)](0x0,_0x5cf21f-(_0x1a97e5[_0x5c6f08(0x181)]||0x0));this[_0x5c6f08(0x1c0)](_0xf136d4,_0x5bdaca,this[_0x5c6f08(0x1e3)]);}if(!this[_0x5c6f08(0x1c5)][_0x5c6f08(0x208)](_0x5ac88c)){const _0x2a2122=_0x5cf21f;this[_0x5c6f08(0x1c0)](_0x1be1b4,_0x2a2122,this[_0x5c6f08(0x1c5)]);}}else{const _0x374062=_0x2fbfff[_0x5c6f08(0xf9)]();if(!_0x374062){if(_0x5c6f08(0xc7)!==_0x5c6f08(0xc7)){if(_0x4896a2[_0x5c6f08(0x178)])_0x48df21+=0x1;}else VisuMZ[_0x5c6f08(0x269)]['BattleManager_processTurn'][_0x5c6f08(0x282)](this);}else{if(_0x374062[_0x5c6f08(0xcb)])_0x5c6f08(0x324)===_0x5c6f08(0x324)?VisuMZ[_0x5c6f08(0x269)]['BattleManager_processTurn']['call'](this):(this[_0x5c6f08(0x2ae)](),this['createBackgroundSprite'](),this['createGraphicSprite'](),this['createBorderSprite'](),this[_0x5c6f08(0x1b7)]());else{if(_0x5c6f08(0x311)!==_0x5c6f08(0xff))this[_0x5c6f08(0x202)]=_0x2fbfff,this['startActorInput']();else{this['_targetHomeX']=this[_0x5c6f08(0x168)]=_0x479907['x'],this[_0x5c6f08(0x289)]=this['_homeY']=_0x40ca99['y'],this[_0x5c6f08(0x1b9)]=0x0;const _0x5be8d3=_0x78c6c7[_0x5c6f08(0x2fb)];this[_0x5c6f08(0x23f)]=_0x416d0a[_0x5c6f08(0x19c)]((_0x4130d7[_0x5c6f08(0x93)]-_0x5be8d3['SpriteThin']-_0x5be8d3[_0x5c6f08(0xb0)]*0x2)/0x2),_0x5be8d3[_0x5c6f08(0x166)]?(this[_0x5c6f08(0x30e)]=_0x584922[_0x5c6f08(0x93)]-_0x5be8d3['SpriteThin'],this[_0x5c6f08(0xcd)]=this[_0x5c6f08(0x23f)]+_0x5be8d3['SubjectDistance'],this[_0x5c6f08(0x293)]=0x0):(this[_0x5c6f08(0x30e)]=0x0,this[_0x5c6f08(0xcd)]=_0x5be8d3['SpriteThin']+_0x5be8d3['SubjectDistance'],this['_nextX']=this[_0x5c6f08(0xcd)]+_0x5be8d3['SubjectDistance']+this['_spriteGroupWidth']);}}}}}else _0x5c6f08(0x18f)!==_0x5c6f08(0x123)?VisuMZ[_0x5c6f08(0x269)][_0x5c6f08(0x250)]['call'](this):_0x2238f3=_0x57f2d2['OrderDirection']?_0x5c6f08(0xbb):'left';},VisuMZ[_0x22f2b4(0x269)]['BattleManager_finishActorInput']=BattleManager['finishActorInput'],BattleManager[_0x22f2b4(0x1fb)]=function(){const _0x39daf1=_0x22f2b4;this[_0x39daf1(0x1d4)]()?VisuMZ[_0x39daf1(0x269)][_0x39daf1(0x250)][_0x39daf1(0x282)](this):VisuMZ[_0x39daf1(0x269)][_0x39daf1(0x127)][_0x39daf1(0x282)](this);},VisuMZ[_0x22f2b4(0x269)]['BattleManager_selectNextActor']=BattleManager['selectNextActor'],BattleManager[_0x22f2b4(0x284)]=function(){const _0x4a6297=_0x22f2b4;this[_0x4a6297(0x1d4)]()?this[_0x4a6297(0x206)]():_0x4a6297(0x28a)===_0x4a6297(0xd9)?(_0x1e51cf[_0x4a6297(0x269)][_0x4a6297(0x10a)]['call'](this,_0x21a374),_0x35bd17['isSceneBattle']()&&_0x158e13[_0x4a6297(0x1d4)]()&&_0x5ce0c5['removeActionBattlersOTB']()):VisuMZ['BattleSystemOTB'][_0x4a6297(0x1d3)][_0x4a6297(0x282)](this);},BattleManager[_0x22f2b4(0x206)]=function(){this['_currentActor']=null,this['_inputting']=![];},VisuMZ['BattleSystemOTB'][_0x22f2b4(0xf8)]=BattleManager[_0x22f2b4(0x320)],BattleManager['endAction']=function(){const _0x105e31=_0x22f2b4;this['preEndActionOTB'](),VisuMZ[_0x105e31(0x269)][_0x105e31(0xf8)][_0x105e31(0x282)](this),this[_0x105e31(0x249)]();},BattleManager[_0x22f2b4(0x1fd)]=function(){const _0x303a05=_0x22f2b4;if(!this['isOTB']())return;this['removeActionBattlersOTB'](),this[_0x303a05(0x1a4)]&&(_0x303a05(0x12e)===_0x303a05(0x1c1)?_0x491220['drawText'](this['_letter']['trim'](),0x0,_0x21762b/0x2,_0x1f5927*0x7/0x8,_0x410052/0x2,'right'):this[_0x303a05(0x1a4)][_0x303a05(0x1bf)]()),this['_subject']&&this['_subject'][_0x303a05(0x18d)]()&&this[_0x303a05(0x1e3)]['includes'](this[_0x303a05(0x1a4)])&&this[_0x303a05(0x1a4)][_0x303a05(0x2d0)]();},BattleManager['postEndActionOTB']=function(){const _0xc91ee8=_0x22f2b4;if(!this[_0xc91ee8(0x1d4)]())return;this[_0xc91ee8(0x2b7)]();this['_subject']&&(this[_0xc91ee8(0x241)](this['_subject']),this[_0xc91ee8(0x1a4)]=null);if(this[_0xc91ee8(0x171)][_0xc91ee8(0x99)]>0x0){if('AtOqC'!==_0xc91ee8(0x22c)){if(this['_graphicSv']!==_0x4e61a8[_0xc91ee8(0x31a)]())return this['processUpdateGraphic']();}else this['_subject']=this[_0xc91ee8(0x1a3)]();};},BattleManager[_0x22f2b4(0x259)]=VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x2fb)]['Mechanics'][_0x22f2b4(0xc9)],BattleManager[_0x22f2b4(0x183)]=VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x2fb)][_0x22f2b4(0x107)][_0x22f2b4(0x222)],BattleManager[_0x22f2b4(0x147)]=VisuMZ[_0x22f2b4(0x269)]['Settings']['Mechanics'][_0x22f2b4(0x114)],VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x2dc)]=BattleManager['makeActionOrders'],BattleManager[_0x22f2b4(0x1b3)]=function(){const _0x45272e=_0x22f2b4;if(this[_0x45272e(0x1d4)]()){if(_0x45272e(0x22a)!=='Yqtvn')this[_0x45272e(0x1cf)]();else{const _0x5a1100=this['windowRect']();this[_0x45272e(0x136)](_0x5a1100),_0xd44e5d[_0x45272e(0x1ed)][_0x45272e(0xb3)][_0x45272e(0x282)](this,_0x5a1100),this['opacity']=0x0,this[_0x45272e(0x1b8)](),this['drawUiText'](),this['createSpriteContainers'](),this[_0x45272e(0x1f5)]();}}else'qunSU'===_0x45272e(0x2a9)?this[_0x45272e(0x1ab)]():VisuMZ[_0x45272e(0x269)][_0x45272e(0x2dc)]['call'](this);},BattleManager['makeActionOrdersOTB']=function(){const _0x4858e5=_0x22f2b4;let _0xcd5993=this['_otb_createdFirstTurnOrders']?0x1:0x2;while(_0xcd5993--){this[_0x4858e5(0x117)]();}const _0x21aba7=!this[_0x4858e5(0xcc)];this[_0x4858e5(0xcc)]=!![];},BattleManager[_0x22f2b4(0x117)]=function(){const _0x4ccb53=_0x22f2b4;this[_0x4ccb53(0x1e3)]=this['_otb_actionBattlersNext'],this[_0x4ccb53(0x26f)]();const _0x56b14e=[];_0x56b14e['push'](...$gameParty[_0x4ccb53(0x2cc)]()),_0x56b14e[_0x4ccb53(0x14f)](...$gameTroop[_0x4ccb53(0x22d)]());for(const _0x380f4b of _0x56b14e){'iiFoq'!==_0x4ccb53(0x148)?_0x4627f2=_0x5dbb0a['actor'](_0x1eb01e[_0x4ccb53(0x286)]()):_0x380f4b[_0x4ccb53(0x296)]();}_0x56b14e[_0x4ccb53(0x327)]((_0x428c9d,_0x3204c6)=>_0x3204c6['speed']()-_0x428c9d[_0x4ccb53(0x2fa)]()),this[_0x4ccb53(0x1c5)]=_0x56b14e,this[_0x4ccb53(0x265)](),this[_0x4ccb53(0x2b7)](),this[_0x4ccb53(0x1ff)]();},BattleManager['otbApplyActionTimes']=function(){const _0x1949ab=_0x22f2b4;if(!BattleManager['OTB_ADDED_ACTION_TIMES'])return;const _0x589886=this['_otb_actionBattlersNext'],_0x2ecbdb=this[_0x1949ab(0x310)]();for(const _0x5af4a7 of _0x2ecbdb){if(_0x1949ab(0xfb)===_0x1949ab(0xfb)){if(!_0x5af4a7)continue;if(!_0x5af4a7[_0x1949ab(0x1e9)]())continue;if(!_0x5af4a7['isAlive']())continue;if(!_0x589886[_0x1949ab(0x208)](_0x5af4a7))continue;const _0x2d73f5=_0x589886['indexOf'](_0x5af4a7);let _0x50d1d9=_0x5af4a7['makeActionTimes']()-0x1;while(_0x50d1d9--){let _0x41e493=_0x2d73f5;BattleManager[_0x1949ab(0x183)]&&(_0x41e493=Math[_0x1949ab(0x17e)](_0x589886[_0x1949ab(0x99)]-_0x2d73f5)+_0x2d73f5),_0x589886[_0x1949ab(0xc0)](_0x41e493,0x0,_0x5af4a7);}}else this[_0x1949ab(0x1d4)]()?this[_0x1949ab(0x24f)]():_0xd9b4c7[_0x1949ab(0x269)][_0x1949ab(0x250)][_0x1949ab(0x282)](this);}},BattleManager[_0x22f2b4(0x2b7)]=function(){const _0xe5fae6=_0x22f2b4;if(!this['isOTB']())return;this['_actionBattlers']=this[_0xe5fae6(0x1e3)]||[],this[_0xe5fae6(0x1e3)][_0xe5fae6(0xfd)](null),this[_0xe5fae6(0x1e3)]['remove'](undefined),this['_actionBattlers']=this[_0xe5fae6(0x1e3)][_0xe5fae6(0x1e2)](_0x3761cb=>_0x3761cb[_0xe5fae6(0x2ce)]()),this['_actionBattlers']=this[_0xe5fae6(0x1e3)][_0xe5fae6(0x1e2)](_0x455759=>VisuMZ[_0xe5fae6(0x269)][_0xe5fae6(0x257)](_0x455759)),this['_surprise']&&(_0xe5fae6(0xe9)==='UZrHZ'?(_0x58150c=_0x4a9a2d?_0x11b349[_0xe5fae6(0x293)]:_0x419870['_currentX'],_0x138852+=_0x322b7d*_0x30247b):this[_0xe5fae6(0x1e3)]=this['_actionBattlers'][_0xe5fae6(0x1e2)](_0x4ce7c2=>!_0x4ce7c2['isActor']())),this[_0xe5fae6(0x281)]&&(_0xe5fae6(0x2b1)!==_0xe5fae6(0x2b1)?(_0x4cf4a2[_0xe5fae6(0xc3)](),this[_0xe5fae6(0x96)][_0xe5fae6(0x223)](),this['_actorCommandWindow']['close']()):this[_0xe5fae6(0x1e3)]=this[_0xe5fae6(0x1e3)][_0xe5fae6(0x1e2)](_0x8c3c24=>!_0x8c3c24[_0xe5fae6(0x2f3)]())),this[_0xe5fae6(0x1c5)]=this[_0xe5fae6(0x1c5)]||[],this['_otb_actionBattlersNext'][_0xe5fae6(0xfd)](null),this[_0xe5fae6(0x1c5)]['remove'](undefined),this[_0xe5fae6(0x1c5)]=this[_0xe5fae6(0x1c5)]['filter'](_0x113bd8=>_0x113bd8[_0xe5fae6(0x2ce)]()),this[_0xe5fae6(0x1c5)]=this[_0xe5fae6(0x1c5)]['filter'](_0x579457=>VisuMZ[_0xe5fae6(0x269)][_0xe5fae6(0x113)](_0x579457)),this[_0xe5fae6(0x1d9)](),this[_0xe5fae6(0x2a8)]();},VisuMZ['BattleSystemOTB'][_0x22f2b4(0x257)]=function(_0x29f742){const _0x4b79d5=_0x22f2b4;if(!_0x29f742)return![];if(!_0x29f742[_0x4b79d5(0x329)]())return![];if(!_0x29f742[_0x4b79d5(0x1e9)]())return![];return _0x29f742[_0x4b79d5(0x18d)]();},VisuMZ[_0x22f2b4(0x269)]['ActionBattlersNextFilter']=function(_0x83b1c8){const _0xfa95f5=_0x22f2b4;if(!_0x83b1c8)return![];const _0x11c762=JsonEx[_0xfa95f5(0x240)](_0x83b1c8);return _0x11c762[_0xfa95f5(0x125)]=!![],_0x11c762[_0xfa95f5(0x232)]=!![],_0x11c762[_0xfa95f5(0x2cb)](),_0x11c762[_0xfa95f5(0x1f8)](0x1),_0x11c762[_0xfa95f5(0x1f8)](0x2),_0x11c762[_0xfa95f5(0x2a0)](),VisuMZ['BattleSystemOTB'][_0xfa95f5(0x257)](_0x11c762);},BattleManager['turnOrderChangeOTB']=function(_0x45c115,_0x50d9c9,_0x3123ae){const _0x344650=_0x22f2b4;if(!_0x50d9c9)return;const _0x5718cc=_0x3123ae?this[_0x344650(0x1c5)]:this[_0x344650(0x1e3)];if(!_0x5718cc)return;if(!_0x5718cc[_0x344650(0x208)](_0x45c115))return;const _0x36b66b=VisuMZ['BattleSystemOTB'][_0x344650(0xe8)](_0x45c115,_0x5718cc),_0x355c5e=_0x3123ae?VisuMZ[_0x344650(0x269)][_0x344650(0x177)](_0x5718cc):0x0,_0x5e1bce=_0x36b66b[_0x344650(0x99)]-0x1;for(let _0x103019=_0x5e1bce;_0x103019>=0x0;_0x103019--){_0x5718cc['splice'](_0x36b66b[_0x103019],0x1);}for(var _0x46cef0=0x0;_0x46cef0<_0x36b66b[_0x344650(0x99)];_0x46cef0++){var _0x429252=(_0x36b66b[_0x46cef0]-_0x50d9c9)['clamp'](_0x355c5e,_0x5718cc['length']);_0x5718cc[_0x344650(0xc0)](_0x429252,0x0,_0x45c115);}this[_0x344650(0x2b7)](),this['refreshTurnOrder']();},VisuMZ['BattleSystemOTB'][_0x22f2b4(0xe8)]=function(_0x67e9f2,_0x50376c){const _0x297eea=[],_0x482419=_0x50376c['length'];for(let _0x9e8543=0x0;_0x9e8543<_0x482419;_0x9e8543++){if(_0x50376c[_0x9e8543]===_0x67e9f2)_0x297eea['push'](_0x9e8543);}return _0x297eea;},VisuMZ[_0x22f2b4(0x269)]['getInfinityClamp']=function(_0x48e1da){const _0x140688=_0x22f2b4;if(!BattleManager['OTB_STUN_INFINITY_CLAMP'])return 0x0;if(!_0x48e1da)return 0x0;let _0x4a6986=0x0;const _0x337d01=_0x48e1da['length'];for(let _0x39af3c=0x0;_0x39af3c<_0x337d01;_0x39af3c++){const _0x4740a8=_0x48e1da[_0x39af3c];if(!_0x4740a8)continue;if(_0x4740a8[_0x140688(0x2fa)]()!==Infinity){if(_0x140688(0x245)!==_0x140688(0x9f))return _0x39af3c;else{if(!this[_0x140688(0x1d4)]())return;const _0x3700df=_0x2193b1[_0x140688(0x2be)][_0x140688(0xbd)];while(_0x36ee9b--){_0x201e73['push'](_0x2b64b0),_0x3700df&&_0x3700df['addBattlerToTurnOrderAtEnd'](_0x3c15fa,_0x41f7cf);}}}else _0x4a6986++;}return _0x4a6986;},BattleManager[_0x22f2b4(0x26f)]=function(){const _0x261893=_0x22f2b4;if(!this[_0x261893(0x1d4)]())return;const _0x3cf97c=SceneManager[_0x261893(0x2be)][_0x261893(0xbd)];if(!_0x3cf97c)return;_0x3cf97c['shiftNextTurnSpritesToCurrentTurn']();},BattleManager['otbCreateNewTurnOrderSprites']=function(){const _0x228ae8=_0x22f2b4;if(!this[_0x228ae8(0x1d4)]())return;const _0x9ea78c=SceneManager['_scene'][_0x228ae8(0xbd)];if(!_0x9ea78c)return;_0x9ea78c['createNewTurnOrderSprites']();},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x163)]=BattleManager[_0x22f2b4(0x1a3)],BattleManager[_0x22f2b4(0x1a3)]=function(){const _0x4b5a62=_0x22f2b4;return this[_0x4b5a62(0x1a4)]=VisuMZ[_0x4b5a62(0x269)][_0x4b5a62(0x163)]['call'](this),this[_0x4b5a62(0x1d4)]()&&this[_0x4b5a62(0x1a4)]&&this[_0x4b5a62(0x112)](this[_0x4b5a62(0x1a4)]),this['_subject'];},BattleManager[_0x22f2b4(0x112)]=function(_0x3e6e76){const _0x15929c=_0x22f2b4;if(!this[_0x15929c(0x1d4)]())return;const _0xee826a=SceneManager[_0x15929c(0x2be)][_0x15929c(0xbd)];if(!_0xee826a)return;if(!_0x3e6e76)return;_0xee826a['shiftTurnOrderForSubject'](_0x3e6e76);},BattleManager['refreshTurnOrder']=function(){const _0x20906f=_0x22f2b4;if(!this[_0x20906f(0x1d4)]())return;const _0x2f5edb=SceneManager[_0x20906f(0x2be)][_0x20906f(0xbd)];if(!_0x2f5edb)return;_0x2f5edb[_0x20906f(0x2b9)]();},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x204)]=BattleManager['endTurn'],BattleManager['endTurn']=function(){const _0x2d7174=_0x22f2b4;VisuMZ['BattleSystemOTB'][_0x2d7174(0x204)][_0x2d7174(0x282)](this),this[_0x2d7174(0x1d4)]()&&this[_0x2d7174(0x140)]();},BattleManager[_0x22f2b4(0x140)]=function(){const _0x5a02ec=_0x22f2b4;if(!this[_0x5a02ec(0x1d4)]())return;const _0xeea400=SceneManager[_0x5a02ec(0x2be)][_0x5a02ec(0xbd)];if(!_0xeea400)return;_0xeea400[_0x5a02ec(0x109)]();},BattleManager[_0x22f2b4(0x1d9)]=function(){const _0x134129=_0x22f2b4;if(!this[_0x134129(0x1d4)]())return;const _0x51ddcb=SceneManager[_0x134129(0x2be)][_0x134129(0xbd)];if(!_0x51ddcb)return;_0x51ddcb[_0x134129(0x280)]();},BattleManager[_0x22f2b4(0x95)]=function(_0x894cc5){const _0x2ce830=_0x22f2b4;if(!_0x894cc5)return;const _0x455fd5=_0x894cc5[_0x2ce830(0x2de)]();_0x894cc5[_0x2ce830(0x2d0)]();if(!this[_0x2ce830(0x1e3)][_0x2ce830(0x208)](_0x894cc5)){const _0x3bc277=Math[_0x2ce830(0x2ef)](0x0,_0x455fd5-(_0x894cc5['_otbTimesActedThisTurn']||0x0));this['otbAddBattlerToTurnOrderAtEnd'](_0x894cc5,_0x3bc277,this[_0x2ce830(0x1e3)]);}if(!this[_0x2ce830(0x1c5)][_0x2ce830(0x208)](_0x894cc5)){const _0x3b749d=_0x455fd5;this['otbAddBattlerToTurnOrderAtEnd'](_0x894cc5,_0x3b749d,this['_otb_actionBattlersNext']);}},BattleManager[_0x22f2b4(0x144)]=function(_0x2b3d83,_0x52f450,_0x25011b){const _0x1737d5=_0x22f2b4;if(!this[_0x1737d5(0x1d4)]())return;const _0x13d9e0=SceneManager[_0x1737d5(0x2be)][_0x1737d5(0xbd)];while(_0x52f450--){_0x25011b['push'](_0x2b3d83),_0x13d9e0&&_0x13d9e0[_0x1737d5(0x306)](_0x2b3d83,_0x25011b);}},BattleManager[_0x22f2b4(0x276)]=function(_0x3be783){const _0x279650=_0x22f2b4;if(!_0x3be783)return;const _0x4ac34c=_0x3be783[_0x279650(0x2de)]();_0x3be783['makeActions']();if(!this[_0x279650(0x1e3)][_0x279650(0x208)](_0x3be783)){const _0x5c5c72=Math[_0x279650(0x2ef)](0x0,_0x4ac34c-(_0x3be783[_0x279650(0x181)]||0x0));this[_0x279650(0x1c0)](_0x3be783,_0x5c5c72,this[_0x279650(0x1e3)]);}if(!this[_0x279650(0x1c5)][_0x279650(0x208)](_0x3be783)){const _0x2f5eee=_0x4ac34c;this[_0x279650(0x1c0)](_0x3be783,_0x2f5eee,this[_0x279650(0x1c5)]);}},BattleManager[_0x22f2b4(0xca)]=function(_0x19211a,_0x58c120,_0x336f8e){const _0x210763=_0x22f2b4;if(!this[_0x210763(0x1d4)]())return;const _0x1892cd=SceneManager[_0x210763(0x2be)][_0x210763(0xbd)];while(_0x58c120--){if(_0x210763(0x31b)!==_0x210763(0x31b)){const _0x3a6d27=new _0x131feb(_0x3cf239,-0x1,null);this[_0x210763(0xf6)][_0x210763(0x275)](_0x3a6d27),this[_0x210763(0x1a4)]=_0x3a6d27,_0x3a6d27[_0x210763(0x264)](0xff),_0x3a6d27['_positionDuration']=0x258,_0x3a6d27['x']=this['_subjectX'],_0x3a6d27[_0x210763(0xd2)]=this[_0x210763(0x30e)],_0x113429&&(_0x3a6d27[_0x210763(0x2f1)]=0xff);}else _0x336f8e['unshift'](_0x19211a),_0x1892cd&&_0x1892cd[_0x210763(0x1c0)](_0x19211a,_0x336f8e);}},BattleManager[_0x22f2b4(0xc3)]=function(){const _0x1f360e=_0x22f2b4;if(!this['isOTB']())return;const _0xadb262=SceneManager[_0x1f360e(0x2be)][_0x1f360e(0xbd)];if(!_0xadb262)return;_0xadb262['previewOrderByAction'](null);},BattleManager[_0x22f2b4(0x2e6)]=function(){const _0x508e90=_0x22f2b4;if(!this[_0x508e90(0x1d4)]())return;const _0x57b74b=SceneManager[_0x508e90(0x2be)][_0x508e90(0xbd)];if(!_0x57b74b)return;_0x57b74b[_0x508e90(0x12b)](this[_0x508e90(0x2e5)]());},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x13c)]=Game_System[_0x22f2b4(0x1ed)][_0x22f2b4(0xb3)],Game_System[_0x22f2b4(0x1ed)]['initialize']=function(){const _0x49974f=_0x22f2b4;VisuMZ[_0x49974f(0x269)][_0x49974f(0x13c)][_0x49974f(0x282)](this),this[_0x49974f(0x2a3)]();},Game_System['prototype']['initBattleSystemOTB']=function(){const _0x12942e=_0x22f2b4;this[_0x12942e(0x19a)]=!![];},Game_System['prototype']['isBattleSystemOTBTurnOrderVisible']=function(){const _0x28c4b6=_0x22f2b4;if(this[_0x28c4b6(0x19a)]===undefined){if(_0x28c4b6(0xa9)!==_0x28c4b6(0xa9)){if(this[_0x28c4b6(0x13a)]())this[_0x28c4b6(0x13a)]()['stepForward']();return![];}else this[_0x28c4b6(0x2a3)]();}return this[_0x28c4b6(0x19a)];},Game_System[_0x22f2b4(0x1ed)][_0x22f2b4(0x14d)]=function(_0x37126a){const _0x2555da=_0x22f2b4;this['_otbTurnOrderVisible']===undefined&&this[_0x2555da(0x2a3)](),this['_otbTurnOrderVisible']=_0x37126a;},Game_Action[_0x22f2b4(0x1e7)]=VisuMZ[_0x22f2b4(0x269)]['Settings']['Conversion'][_0x22f2b4(0xe2)],Game_Action[_0x22f2b4(0x178)]=VisuMZ['BattleSystemOTB'][_0x22f2b4(0x2fb)][_0x22f2b4(0x29f)][_0x22f2b4(0x2bd)],Game_Action[_0x22f2b4(0xe4)]=VisuMZ['BattleSystemOTB']['Settings'][_0x22f2b4(0x29f)][_0x22f2b4(0x19f)],Game_Action['OTB_CONVERT_AGI_DEBUFF_NEXT_TURN']=VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x2fb)]['Conversion'][_0x22f2b4(0x288)],VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x27f)]=Game_Action[_0x22f2b4(0x1ed)]['speed'],Game_Action['prototype'][_0x22f2b4(0x2fa)]=function(){const _0x388890=_0x22f2b4;return BattleManager['isOTB']()?0x0:'QHSMz'!=='QHSMz'?this['_unit']===_0x3ae706?_0x388890(0xb7):_0x388890(0x2e0):VisuMZ[_0x388890(0x269)]['Game_Action_speed'][_0x388890(0x282)](this);},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x233)]=Game_Action[_0x22f2b4(0x1ed)][_0x22f2b4(0x2e9)],Game_Action['prototype'][_0x22f2b4(0x2e9)]=function(){const _0x15205=_0x22f2b4;VisuMZ['BattleSystemOTB'][_0x15205(0x233)][_0x15205(0x282)](this),this['applyGlobalBattleSystemOTB']();},Game_Action[_0x22f2b4(0x1ed)][_0x22f2b4(0x20e)]=function(){const _0x96210c=_0x22f2b4;if(!SceneManager[_0x96210c(0x135)]())return;if(!BattleManager[_0x96210c(0x1d4)]())return;if(!this['item']())return;if(!this[_0x96210c(0x299)]())return;const _0x216712=VisuMZ[_0x96210c(0x269)][_0x96210c(0x2c7)],_0x48de81=this[_0x96210c(0x1a7)]()[_0x96210c(0x142)];_0x48de81[_0x96210c(0x213)](_0x216712['Instant'])&&(_0x96210c(0x268)!==_0x96210c(0x268)?(_0x4d782e[_0x96210c(0x287)]&&_0x3e1d72['_sourceArray']['remove'](_0xcfdf63),this[_0x96210c(0xf6)][_0x96210c(0x323)](_0x1273e9),this[_0x96210c(0x2d3)][_0x96210c(0x323)](_0x46684f)):this[_0x96210c(0x299)]()[_0x96210c(0x1bb)](0x1));let _0x30a71c=this['otbCalcUserCurrentOrderChange'](),_0x91755c=this[_0x96210c(0x137)]();_0x30a71c!==0x0&&BattleManager['turnOrderChangeOTB'](this[_0x96210c(0x299)](),-_0x30a71c,![]),_0x91755c!==0x0&&BattleManager['turnOrderChangeOTB'](this[_0x96210c(0x299)](),-_0x91755c,!![]);},Game_Action['prototype']['otbCalcUserCurrentOrderChange']=function(){const _0x33b259=_0x22f2b4;if(!SceneManager[_0x33b259(0x135)]())return 0x0;if(!BattleManager[_0x33b259(0x1d4)]())return 0x0;if(!this[_0x33b259(0x1a7)]())return 0x0;if(!this[_0x33b259(0x299)]())return 0x0;if(!this[_0x33b259(0x299)]()[_0x33b259(0x2ea)]())return 0x0;const _0x455041=VisuMZ[_0x33b259(0x269)]['RegExp'],_0x12466e=this[_0x33b259(0x1a7)]()[_0x33b259(0x142)],_0x2e32d1=BattleManager[_0x33b259(0x1e3)]||[];let _0xddc49a=0x0;return _0x12466e['match'](_0x455041[_0x33b259(0x263)])&&(_0x33b259(0x1ea)===_0x33b259(0x1ea)?_0x2e32d1[_0x33b259(0x208)](this['subject']())&&(_0xddc49a+=Number(RegExp['$1'])):_0x3864fd[_0x33b259(0x24e)]=_0x566675[_0x33b259(0x300)](_0x3f0bbe[_0xa442f])),_0x12466e[_0x33b259(0x213)](_0x455041[_0x33b259(0x227)])&&(_0xddc49a+=Number(RegExp['$1'])),_0xddc49a;},Game_Action[_0x22f2b4(0x1ed)][_0x22f2b4(0x137)]=function(){const _0x3c6418=_0x22f2b4;if(!SceneManager[_0x3c6418(0x135)]())return 0x0;if(!BattleManager['isOTB']())return 0x0;if(!this[_0x3c6418(0x1a7)]())return 0x0;if(!this['subject']())return 0x0;if(!this['subject']()[_0x3c6418(0x2ea)]())return 0x0;const _0x51cbd3=VisuMZ[_0x3c6418(0x269)]['Settings'][_0x3c6418(0x107)],_0xeac5df=VisuMZ[_0x3c6418(0x269)][_0x3c6418(0x2c7)],_0x23bae4=this[_0x3c6418(0x1a7)]()['note'],_0xef3fc3=BattleManager['_otb_actionBattlersNext']||[];let _0x4c9b61=0x0;_0x51cbd3[_0x3c6418(0xa1)]&&(_0x4c9b61+=_0x51cbd3[_0x3c6418(0xa1)][_0x3c6418(0x282)](this));_0x23bae4[_0x3c6418(0x213)](_0xeac5df[_0x3c6418(0x263)])&&(_0xef3fc3['includes'](this[_0x3c6418(0x299)]())&&(_0x4c9b61+=Number(RegExp['$1'])));if(_0x23bae4['match'](_0xeac5df['UserNextOrder'])){if(_0x3c6418(0x2a7)==='jfkoL')_0x4c9b61+=Number(RegExp['$1']);else return _0x5add0a[_0x3c6418(0x269)][_0x3c6418(0x27f)][_0x3c6418(0x282)](this);}return _0x4c9b61;},VisuMZ['BattleSystemOTB'][_0x22f2b4(0x246)]=Game_Action['prototype'][_0x22f2b4(0x1b5)],Game_Action[_0x22f2b4(0x1ed)]['applyItemUserEffect']=function(_0x5f40cd){const _0xb224e8=_0x22f2b4;VisuMZ['BattleSystemOTB'][_0xb224e8(0x246)]['call'](this,_0x5f40cd),this[_0xb224e8(0xba)](_0x5f40cd),this['applyItemTargetEffectOTB'](_0x5f40cd);},Game_Action[_0x22f2b4(0x1ed)][_0x22f2b4(0xba)]=function(_0x460238){const _0x5d42cf=_0x22f2b4;if(!SceneManager['isSceneBattle']())return;if(!BattleManager['isOTB']())return;if(!this['item']())return;if(!_0x460238)return;const _0x894117=VisuMZ[_0x5d42cf(0x269)]['RegExp'],_0x199fcd=this['item']()['note'];if(_0x199fcd[_0x5d42cf(0x213)](_0x894117[_0x5d42cf(0x1da)])){if('hyafK'===_0x5d42cf(0x21f)){const _0x2e4eac=!![],_0x2b83e8=Number(RegExp['$1'])||0x0;this[_0x5d42cf(0x299)]()[_0x5d42cf(0x17a)](_0x2b83e8,_0x2e4eac);}else{const _0x1829b6=_0x23894c(_0x3c58b1['$1']);_0x1829b6!==_0x230964[_0x441ef4][_0x5d42cf(0xb8)]&&(_0x36d5ac(_0x5d42cf(0x29d)['format'](_0x114f68,_0x1829b6)),_0xa1524f['exit']());}}if(_0x199fcd[_0x5d42cf(0x213)](_0x894117[_0x5d42cf(0x237)])){if(_0x5d42cf(0xf3)===_0x5d42cf(0x32e)){if(!this[_0x5d42cf(0x1d4)]())return;const _0x535b81=_0xf1f6c5[_0x5d42cf(0x2be)]['_otbTurnOrderWindow'];if(!_0x535b81)return;_0x535b81[_0x5d42cf(0x1ad)]();}else{const _0x358a8d=![],_0x2c6ae9=Number(RegExp['$1'])||0x0;this[_0x5d42cf(0x299)]()[_0x5d42cf(0x17a)](_0x2c6ae9,_0x358a8d);}}if(_0x199fcd[_0x5d42cf(0x213)](_0x894117[_0x5d42cf(0x1f7)])){if(_0x5d42cf(0x1b0)==='EKAGK'){const _0x57a63a=_0x23b412[_0x5d42cf(0x2ef)](0x0,_0x54c97b-(_0x5c363a['_otbTimesActedThisTurn']||0x0));this[_0x5d42cf(0x144)](_0x5e1d45,_0x57a63a,this[_0x5d42cf(0x1e3)]);}else{const _0x28579d=!![],_0x5bda23=Number(RegExp['$1'])||0x0;_0x460238[_0x5d42cf(0x17a)](_0x5bda23,_0x28579d);}}if(_0x199fcd['match'](_0x894117[_0x5d42cf(0x2ff)])){const _0x4770a9=![],_0x56d7bb=Number(RegExp['$1'])||0x0;_0x460238[_0x5d42cf(0x17a)](_0x56d7bb,_0x4770a9);}},Game_Action['prototype'][_0x22f2b4(0x24b)]=function(_0x497511){const _0x267462=_0x22f2b4;if(!SceneManager[_0x267462(0x135)]())return;if(!BattleManager['isOTB']())return;if(!this[_0x267462(0x1a7)]())return;if(!_0x497511)return;if(!_0x497511[_0x267462(0x2ea)]())return 0x0;let _0x3ea3d3=this['otbCalcTargetCurrentOrderChange'](_0x497511),_0x5f530e=this[_0x267462(0x2ad)](_0x497511);_0x3ea3d3!==0x0&&(_0x267462(0x103)===_0x267462(0x273)?(this[_0x267462(0x30e)]=0x0,this[_0x267462(0xcd)]=_0xb73f82['SpriteThin']+_0x46a403[_0x267462(0xb0)],this['_nextX']=this[_0x267462(0xcd)]+_0x37081a[_0x267462(0xb0)]+this[_0x267462(0x23f)]):BattleManager[_0x267462(0x1c7)](_0x497511,-_0x3ea3d3,![])),_0x5f530e!==0x0&&BattleManager[_0x267462(0x1c7)](_0x497511,-_0x5f530e,!![]);},Game_Action['prototype'][_0x22f2b4(0x247)]=function(_0x399669){const _0xf44dd3=_0x22f2b4;if(!SceneManager['isSceneBattle']())return 0x0;if(!BattleManager[_0xf44dd3(0x1d4)]())return 0x0;if(!this[_0xf44dd3(0x1a7)]())return 0x0;if(!_0x399669)return 0x0;if(!_0x399669[_0xf44dd3(0x2ea)]())return 0x0;const _0xeba782=VisuMZ['BattleSystemOTB'][_0xf44dd3(0x2c7)],_0x2feec9=this[_0xf44dd3(0x1a7)]()[_0xf44dd3(0x142)],_0x58295f=BattleManager[_0xf44dd3(0x1e3)]||[];let _0x375c1c=0x0;_0x2feec9['match'](_0xeba782['TargetFollOrder'])&&(_0x58295f[_0xf44dd3(0x208)](_0x399669)&&(_0x375c1c+=Number(RegExp['$1'])));if(_0x2feec9['match'](_0xeba782['TargetCurrOrder'])){if(_0xf44dd3(0x313)===_0xf44dd3(0xd0))return 0x0;else _0x375c1c+=Number(RegExp['$1']);}const _0x18f107=this[_0xf44dd3(0x1a7)]()[_0xf44dd3(0x328)];for(const _0x4ba87d of _0x18f107){if(!_0x4ba87d)continue;if(_0x4ba87d[_0xf44dd3(0x18a)]===Game_Action['EFFECT_ADD_BUFF']&&_0x4ba87d[_0xf44dd3(0x2e4)]===0x6){if(_0xf44dd3(0x218)!=='FyYjI')return this[_0xf44dd3(0x29b)]();else{if(Game_Action['OTB_CONVERT_AGI_BUFF_CURRENT_TURN'])_0x375c1c-=0x1;}}if(_0x4ba87d[_0xf44dd3(0x18a)]===Game_Action['EFFECT_ADD_DEBUFF']&&_0x4ba87d[_0xf44dd3(0x2e4)]===0x6){if(Game_Action[_0xf44dd3(0x178)])_0x375c1c+=0x1;}}return _0x375c1c;},Game_Action[_0x22f2b4(0x1ed)]['otbCalcTargetNextOrderChange']=function(_0x19a83f){const _0x14f6e2=_0x22f2b4;if(!SceneManager[_0x14f6e2(0x135)]())return 0x0;if(!BattleManager['isOTB']())return 0x0;if(!this[_0x14f6e2(0x1a7)]())return 0x0;if(!_0x19a83f)return 0x0;if(!_0x19a83f[_0x14f6e2(0x2ea)]())return 0x0;const _0x58b320=VisuMZ['BattleSystemOTB'][_0x14f6e2(0x2c7)],_0x3d4b5c=this[_0x14f6e2(0x1a7)]()[_0x14f6e2(0x142)],_0x3cdcd5=BattleManager[_0x14f6e2(0x1c5)]||[];let _0x3e04a9=0x0;if(_0x3d4b5c['match'](_0x58b320[_0x14f6e2(0x26a)])){if(_0x14f6e2(0x1bd)!==_0x14f6e2(0x1bd)){const _0x3baf6f=this[_0x14f6e2(0x13a)]();if(!_0x3baf6f)return;if(this['_isAlive']===_0x3baf6f[_0x14f6e2(0x329)]()&&this[_0x14f6e2(0x1dc)]===_0x3baf6f[_0x14f6e2(0x1e9)]())return;this[_0x14f6e2(0x124)]=_0x3baf6f[_0x14f6e2(0x329)](),this[_0x14f6e2(0x1dc)]=_0x3baf6f[_0x14f6e2(0x1e9)]();let _0x4785f8=this[_0x14f6e2(0x124)]&&this[_0x14f6e2(0x1dc)]?0xff:0x0;this[_0x14f6e2(0x264)](_0x4785f8);}else _0x3cdcd5[_0x14f6e2(0x208)](_0x19a83f)&&(_0x3e04a9+=Number(RegExp['$1']));}_0x3d4b5c[_0x14f6e2(0x213)](_0x58b320[_0x14f6e2(0x98)])&&(_0x3e04a9+=Number(RegExp['$1']));const _0x19eaee=this['item']()[_0x14f6e2(0x328)];for(const _0x27caad of _0x19eaee){if(_0x14f6e2(0x2ee)===_0x14f6e2(0x16d))this['opacity']=this[_0x14f6e2(0x1ce)];else{if(!_0x27caad)continue;if(_0x27caad[_0x14f6e2(0x18a)]===Game_Action[_0x14f6e2(0x2da)]&&_0x27caad[_0x14f6e2(0x2e4)]===0x6){if(Game_Action[_0x14f6e2(0xe4)])_0x3e04a9-=0x1;}if(_0x27caad[_0x14f6e2(0x18a)]===Game_Action[_0x14f6e2(0x152)]&&_0x27caad[_0x14f6e2(0x2e4)]===0x6){if('gFGBX'!==_0x14f6e2(0x1ac))this['x']=this['_homeX']+(_0x8199e3[_0x14f6e2(0x1ef)]||0x0),this['y']=this[_0x14f6e2(0x158)]+(_0x3942a4[_0x14f6e2(0x2bc)]||0x0);else{if(Game_Action[_0x14f6e2(0x31c)])_0x3e04a9+=0x1;}}}}return _0x3e04a9;},Game_BattlerBase[_0x22f2b4(0x1ed)][_0x22f2b4(0x2e7)]=function(){const _0x28e412=_0x22f2b4;delete this['_otbTurnOrderGraphicType'],delete this[_0x28e412(0x274)],delete this[_0x28e412(0x27e)],delete this[_0x28e412(0x8f)];},Game_BattlerBase[_0x22f2b4(0x1ed)][_0x22f2b4(0x294)]=function(){const _0x4378d9=_0x22f2b4;return this['_otbTurnOrderGraphicType']===undefined&&(this[_0x4378d9(0x271)]=this[_0x4378d9(0x1eb)]()),this[_0x4378d9(0x271)];},Game_BattlerBase[_0x22f2b4(0x1ed)]['createTurnOrderOTBGraphicType']=function(){const _0x5b99ba=_0x22f2b4;return Window_OTB_TurnOrder[_0x5b99ba(0x2fb)][_0x5b99ba(0x2c0)];},Game_BattlerBase[_0x22f2b4(0x1ed)][_0x22f2b4(0x238)]=function(){const _0x5b4003=_0x22f2b4;if(this['_otbTurnOrderFaceName']===undefined){if(_0x5b4003(0x261)===_0x5b4003(0x146))return _0x435bd9[_0x5b4003(0x1d4)]()?_0x5cff28[_0x5b4003(0x269)][_0x5b4003(0x2fb)][_0x5b4003(0x107)]['AllowRandomSpeed']:_0xa15f7b[_0x5b4003(0x269)][_0x5b4003(0x21a)][_0x5b4003(0x282)](this);else this['_otbTurnOrderFaceName']=this['createTurnOrderOTBGraphicFaceName']();}return this[_0x5b4003(0x274)];},Game_BattlerBase['prototype'][_0x22f2b4(0x283)]=function(){return Window_OTB_TurnOrder['Settings']['EnemyBattlerFaceName'];},Game_BattlerBase[_0x22f2b4(0x1ed)][_0x22f2b4(0x236)]=function(){const _0xf643fa=_0x22f2b4;if(this[_0xf643fa(0x27e)]===undefined){if(_0xf643fa(0x182)!==_0xf643fa(0x221))this['_otbTurnOrderFaceIndex']=this['createTurnOrderOTBGraphicFaceIndex']();else return null;}return this[_0xf643fa(0x27e)];},Game_BattlerBase[_0x22f2b4(0x1ed)]['createTurnOrderOTBGraphicFaceIndex']=function(){const _0x4513b1=_0x22f2b4;return Window_OTB_TurnOrder[_0x4513b1(0x2fb)][_0x4513b1(0x2dd)];},Game_BattlerBase[_0x22f2b4(0x1ed)][_0x22f2b4(0x11b)]=function(){const _0x59745e=_0x22f2b4;if(this[_0x59745e(0x8f)]===undefined){if(_0x59745e(0x1b1)!==_0x59745e(0x1b1)){const _0xcfd438=_0xe48d63[_0x59745e(0x1c5)];this[_0x59745e(0x2ec)](_0xcfd438);}else this[_0x59745e(0x8f)]=this[_0x59745e(0x151)]();}return this[_0x59745e(0x8f)];},Game_BattlerBase[_0x22f2b4(0x1ed)][_0x22f2b4(0x151)]=function(){const _0x1537f5=_0x22f2b4;return Window_OTB_TurnOrder[_0x1537f5(0x2fb)]['EnemyBattlerIcon'];},Game_BattlerBase[_0x22f2b4(0x1ed)][_0x22f2b4(0x1aa)]=function(_0x2b36d5){const _0x46dce3=_0x22f2b4;this[_0x46dce3(0x8f)]=_0x2b36d5;},VisuMZ['BattleSystemOTB'][_0x22f2b4(0xc8)]=Game_BattlerBase['prototype'][_0x22f2b4(0x243)],Game_BattlerBase[_0x22f2b4(0x1ed)]['hide']=function(){const _0x3530e7=_0x22f2b4;VisuMZ['BattleSystemOTB'][_0x3530e7(0xc8)][_0x3530e7(0x282)](this),BattleManager[_0x3530e7(0x2b7)]();},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0xdc)]=Game_BattlerBase[_0x22f2b4(0x1ed)][_0x22f2b4(0xae)],Game_BattlerBase[_0x22f2b4(0x1ed)][_0x22f2b4(0xae)]=function(){const _0x47d425=_0x22f2b4,_0x423e13=this[_0x47d425(0x133)];VisuMZ[_0x47d425(0x269)]['Game_BattlerBase_appear'][_0x47d425(0x282)](this),BattleManager['isOTB']()&&SceneManager[_0x47d425(0x135)]()&&_0x423e13&&!this['_hidden']&&BattleManager[_0x47d425(0x95)](this);},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x20b)]=Game_Battler['prototype'][_0x22f2b4(0x170)],Game_Battler[_0x22f2b4(0x1ed)]['performCollapse']=function(){const _0x5be464=_0x22f2b4;VisuMZ[_0x5be464(0x269)][_0x5be464(0x20b)]['call'](this),BattleManager['removeActionBattlersOTB']();},Game_Battler[_0x22f2b4(0x1a5)]=VisuMZ['BattleSystemOTB'][_0x22f2b4(0x2fb)][_0x22f2b4(0x107)][_0x22f2b4(0x23e)],VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x32a)]=Game_Battler['prototype'][_0x22f2b4(0x26b)],Game_Battler[_0x22f2b4(0x1ed)]['onBattleStart']=function(_0x45fc2a){const _0x3385ca=_0x22f2b4;VisuMZ['BattleSystemOTB'][_0x3385ca(0x32a)][_0x3385ca(0x282)](this,_0x45fc2a),this['onBattleStartOTB'](_0x45fc2a);},Game_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x24c)]=function(_0x3a1557){const _0x50127c=_0x22f2b4;if(!BattleManager[_0x50127c(0x1d4)]())return;this[_0x50127c(0x181)]=0x0;},VisuMZ['BattleSystemOTB']['Game_Battler_onBattleEnd']=Game_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x23c)],Game_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x23c)]=function(){const _0x3477df=_0x22f2b4;VisuMZ[_0x3477df(0x269)]['Game_Battler_onBattleEnd'][_0x3477df(0x282)](this),this[_0x3477df(0x1fc)]();},Game_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x1fc)]=function(){const _0x423514=_0x22f2b4;if(!BattleManager[_0x423514(0x1d4)]())return;this[_0x423514(0x181)]=0x0;},Game_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x1bf)]=function(){const _0x16923a=_0x22f2b4;if(!BattleManager['isOTB']())return;this[_0x16923a(0x181)]=this[_0x16923a(0x181)]||0x0,this[_0x16923a(0x181)]++;if(this[_0x16923a(0x20f)]()>0x0&&this===BattleManager[_0x16923a(0x1a4)]){if('pWyWw'!==_0x16923a(0xd3)){const _0x219164=BattleManager[_0x16923a(0x171)];if(_0x219164[_0x16923a(0x99)]>0x0&&_0x219164[0x0]!==this)return;const _0x24ff56=this[_0x16923a(0x13a)]();if(_0x24ff56&&BattleManager['isNextOtbSubject'](this))_0x24ff56[_0x16923a(0x162)]();}else this[_0x16923a(0xf6)][_0x16923a(0x184)][_0x16923a(0x327)]((_0x16b81c,_0x965127)=>_0x965127['x']-_0x16b81c['x']);}},BattleManager['isNextOtbSubject']=function(_0x3ed80c){const _0x3334d3=_0x22f2b4;if(!_0x3ed80c)return![];return this[_0x3334d3(0x1e3)][0x0]===_0x3ed80c;},VisuMZ['BattleSystemOTB'][_0x22f2b4(0x2bb)]=Game_Battler[_0x22f2b4(0x1ed)]['onTurnEnd'],Game_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x115)]=function(){const _0x487b07=_0x22f2b4;VisuMZ[_0x487b07(0x269)][_0x487b07(0x2bb)][_0x487b07(0x282)](this),this[_0x487b07(0x2b4)]();},Game_Battler['prototype'][_0x22f2b4(0x2b4)]=function(){const _0x4c8101=_0x22f2b4;if(!BattleManager[_0x4c8101(0x1d4)]())return;this['_otbTimesActedThisTurn']=0x0;},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x197)]=Game_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x296)],Game_Battler['prototype'][_0x22f2b4(0x296)]=function(){const _0x11e7e5=_0x22f2b4;BattleManager['isOTB']()?this[_0x11e7e5(0x2fc)]():_0x11e7e5(0x101)===_0x11e7e5(0x2ba)?this[_0x11e7e5(0x1af)]=_0x11e7e5(0x2b8):VisuMZ[_0x11e7e5(0x269)][_0x11e7e5(0x197)][_0x11e7e5(0x282)](this);},Game_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x2fc)]=function(){const _0x551bd7=_0x22f2b4;if(this[_0x551bd7(0x2c5)]())this[_0x551bd7(0x1c6)]=Infinity;else{if(_0x551bd7(0x156)===_0x551bd7(0x121))this[_0x551bd7(0x1d4)]()?this['makeActionOrdersOTB']():_0x1a34ba[_0x551bd7(0x269)]['BattleManager_makeActionOrders'][_0x551bd7(0x282)](this);else{const _0x21b374=this[_0x551bd7(0xf9)]()||new Game_Action(this);this[_0x551bd7(0x1c6)]=VisuMZ[_0x551bd7(0x269)]['Settings'][_0x551bd7(0x107)][_0x551bd7(0x2f6)][_0x551bd7(0x282)](_0x21b374);}}},Game_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x2c5)]=function(){const _0x3de22c=_0x22f2b4;if(!Game_Battler['OTB_STUN_INFINITY_SPEED'])return![];if(!this[_0x3de22c(0x329)]())return![];if(!this[_0x3de22c(0x1e9)]())return![];if(this['canMove']())return![];const _0x41ad9e=JsonEx[_0x3de22c(0x240)](this);return _0x41ad9e['_tempActor']=!![],_0x41ad9e['_tempBattler']=!![],_0x41ad9e[_0x3de22c(0x2cb)](),_0x41ad9e[_0x3de22c(0x1f8)](0x1),_0x41ad9e['removeStatesAuto'](0x2),_0x41ad9e['refresh'](),_0x41ad9e[_0x3de22c(0x18d)]();},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x21a)]=Game_Action[_0x22f2b4(0x1ed)]['allowRandomSpeed'],Game_Action[_0x22f2b4(0x1ed)]['allowRandomSpeed']=function(){const _0x592981=_0x22f2b4;if(BattleManager[_0x592981(0x1d4)]())return VisuMZ[_0x592981(0x269)][_0x592981(0x2fb)][_0x592981(0x107)][_0x592981(0x321)];else{if('DpGBO'===_0x592981(0xd8))_0x27b164=this[_0x592981(0xd7)]();else return VisuMZ[_0x592981(0x269)][_0x592981(0x21a)][_0x592981(0x282)](this);}},Game_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x1bb)]=function(_0x1080c2){const _0xc1aa5e=_0x22f2b4;if(!this[_0xc1aa5e(0x18d)]())return;this[_0xc1aa5e(0x181)]=this[_0xc1aa5e(0x181)]||0x0,this[_0xc1aa5e(0x181)]--,BattleManager['otbAddBattlerToTurnOrderAtStart'](this,_0x1080c2,BattleManager[_0xc1aa5e(0x1e3)]);},Game_Battler[_0x22f2b4(0x1ed)]['otbAddActions']=function(_0x28a2a8,_0x595732){const _0x2fad48=_0x22f2b4;if(!this['canMove']())return;_0x595732?_0x2fad48(0x174)!==_0x2fad48(0x30b)?BattleManager['otbAddBattlerToTurnOrderAtEnd'](this,_0x28a2a8,BattleManager[_0x2fad48(0x1e3)]):this[_0x2fad48(0xef)](_0x129062,!![],_0x4d8c0c):BattleManager[_0x2fad48(0x144)](this,_0x28a2a8,BattleManager[_0x2fad48(0x1c5)]);},Game_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x2ea)]=function(){const _0x24f3f5=_0x22f2b4;if(this[_0x24f3f5(0x2fa)]()===Infinity)return![];return!![];},Game_Battler['prototype']['otbProcessActionCheck']=function(_0x6abffc,_0x493b08){const _0x14c463=_0x22f2b4;if(this[_0x14c463(0x232)]||this[_0x14c463(0x125)])return;if(!SceneManager[_0x14c463(0x135)]())return;if(!BattleManager[_0x14c463(0x1d4)]())return;if(_0x6abffc&&!this[_0x14c463(0x18d)]())BattleManager['removeActionBattlersOTB']();else{if(!_0x6abffc&&this[_0x14c463(0x18d)]()){if(_0x14c463(0x253)!==_0x14c463(0x253)){const _0x484b8e=_0xd5b04b[_0x14c463(0x300)](_0x1fb2fa[_0x14c463(0x20d)]);_0x484b8e[_0x14c463(0x231)](this[_0x14c463(0x1e6)][_0x14c463(0x2e8)](this,_0x484b8e));return;}else BattleManager[_0x14c463(0x95)](this);}}if(this['canMove']()){const _0x297a0d=this[_0x14c463(0x2de)]()-_0x493b08;_0x297a0d>0x0&&(BattleManager[_0x14c463(0x144)](this,_0x297a0d,BattleManager[_0x14c463(0x1e3)]),BattleManager['otbAddBattlerToTurnOrderAtEnd'](this,_0x297a0d,BattleManager[_0x14c463(0x1c5)]));}},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x186)]=Game_Battler['prototype'][_0x22f2b4(0x196)],Game_Battler[_0x22f2b4(0x1ed)]['addState']=function(_0x2b37d1){const _0x388762=_0x22f2b4,_0x148db0=this[_0x388762(0x18d)](),_0x4440d3=this[_0x388762(0x2de)]();VisuMZ[_0x388762(0x269)][_0x388762(0x186)]['call'](this,_0x2b37d1),this['otbProcessActionCheck'](_0x148db0,_0x4440d3);},VisuMZ['BattleSystemOTB'][_0x22f2b4(0xe1)]=Game_Battler['prototype']['removeState'],Game_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x2c4)]=function(_0x30b611){const _0x337d20=_0x22f2b4,_0xc02f3e=this['canMove'](),_0x4c1804=this['makeActionTimes']();VisuMZ[_0x337d20(0x269)]['Game_Battler_removeState'][_0x337d20(0x282)](this,_0x30b611),this[_0x337d20(0x2c9)](_0xc02f3e,_0x4c1804);},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x297)]=Game_Actor[_0x22f2b4(0x1ed)]['selectNextCommand'],Game_Actor[_0x22f2b4(0x1ed)][_0x22f2b4(0x138)]=function(){const _0x1e1c82=_0x22f2b4;if(BattleManager['isOTB']()){if(this[_0x1e1c82(0x13a)]())this['battler']()[_0x1e1c82(0x162)]();return![];}return VisuMZ[_0x1e1c82(0x269)][_0x1e1c82(0x297)][_0x1e1c82(0x282)](this);},Game_Actor[_0x22f2b4(0x1ed)][_0x22f2b4(0x1eb)]=function(){const _0x11b3a3=_0x22f2b4,_0x2a76ef=this[_0x11b3a3(0xb9)]()['note'];if(_0x2a76ef[_0x11b3a3(0x213)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x11b3a3(0x255);else{if(_0x2a76ef[_0x11b3a3(0x213)](/<OTB TURN ORDER ICON:[ ](\d+)>/i)){if('IDUYH'===_0x11b3a3(0x22e))return _0x11b3a3(0xa0);else _0x4c5adb['BattleSystemOTB'][_0x11b3a3(0x250)][_0x11b3a3(0x282)](this);}}return Window_OTB_TurnOrder[_0x11b3a3(0x2fb)]['ActorBattlerType'];},Game_Actor[_0x22f2b4(0x1ed)][_0x22f2b4(0x238)]=function(){const _0x5ef192=_0x22f2b4,_0x40eb1a=this[_0x5ef192(0xb9)]()['note'];if(_0x40eb1a[_0x5ef192(0x213)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x5ef192(0x91)==='zgfbI')_0x29757a[_0x5ef192(0x269)]['BattleManager_setup'][_0x5ef192(0x282)](this,_0x36d9c9,_0x2ca823,_0x43aca2),this[_0x5ef192(0x2d6)]();else return String(RegExp['$1']);}return this['faceName']();},Game_Actor[_0x22f2b4(0x1ed)][_0x22f2b4(0x236)]=function(){const _0x95dd9e=_0x22f2b4,_0x320ad0=this['actor']()[_0x95dd9e(0x142)];if(_0x320ad0[_0x95dd9e(0x213)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x95dd9e(0xd6)]();},Game_Actor[_0x22f2b4(0x1ed)][_0x22f2b4(0x151)]=function(){const _0x2ae736=_0x22f2b4,_0x482900=this[_0x2ae736(0xb9)]()['note'];if(_0x482900[_0x2ae736(0x213)](/<OTB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x2ae736(0x126)==='djjAu')return Number(RegExp['$1']);else _0x2e9724[_0x2ae736(0x287)]['remove'](_0x15501e);}return Window_OTB_TurnOrder[_0x2ae736(0x2fb)][_0x2ae736(0xe5)];},Game_Enemy[_0x22f2b4(0x1ed)][_0x22f2b4(0x1eb)]=function(){const _0x4788e1=_0x22f2b4,_0x585692=this[_0x4788e1(0x2b8)]()[_0x4788e1(0x142)];if(_0x585692[_0x4788e1(0x213)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if('fmLGH'===_0x4788e1(0x1d7)){const _0x352bc1=_0x4016a5[_0x4788e1(0x2fb)];this[_0x4788e1(0x1ee)]['x']=this['scale']['y']=_0x352bc1[_0x4788e1(0x1f2)];}else return _0x4788e1(0x255);}else{if(_0x585692[_0x4788e1(0x213)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return Window_OTB_TurnOrder[_0x4788e1(0x2fb)][_0x4788e1(0x2c0)];},Game_Enemy['prototype'][_0x22f2b4(0x283)]=function(){const _0x4acbb2=_0x22f2b4,_0x588261=this[_0x4acbb2(0x2b8)]()['note'];if(_0x588261[_0x4acbb2(0x213)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return'vJrSM'!=='fYzNH'?String(RegExp['$1']):_0x6898a4['Settings'][_0x4acbb2(0x2c0)];return Window_OTB_TurnOrder[_0x4acbb2(0x2fb)]['EnemyBattlerFaceName'];},Game_Enemy['prototype'][_0x22f2b4(0x224)]=function(){const _0x376168=_0x22f2b4,_0x399277=this[_0x376168(0x2b8)]()[_0x376168(0x142)];if(_0x399277['match'](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x376168(0xc4)!==_0x376168(0x2d2))return Number(RegExp['$2']);else _0x2b80e4['drawText'](this[_0x376168(0x302)]['trim'](),_0x2144d6*0x1/0x8,_0x18e632/0x2,_0x188c6e,_0x3235fd/0x2,_0x376168(0x2f5));}return Window_OTB_TurnOrder['Settings']['EnemyBattlerFaceIndex'];},Game_Enemy[_0x22f2b4(0x1ed)][_0x22f2b4(0x151)]=function(){const _0x2966e3=_0x22f2b4,_0x5e8f2d=this[_0x2966e3(0x2b8)]()[_0x2966e3(0x142)];if(_0x5e8f2d[_0x2966e3(0x213)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_OTB_TurnOrder[_0x2966e3(0x2fb)][_0x2966e3(0xe6)];},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x219)]=Game_Party[_0x22f2b4(0x1ed)][_0x22f2b4(0x15c)],Game_Party['prototype'][_0x22f2b4(0x15c)]=function(_0xa23e77){const _0x31cbe8=_0x22f2b4;VisuMZ['BattleSystemOTB'][_0x31cbe8(0x219)][_0x31cbe8(0x282)](this,_0xa23e77);if(Imported[_0x31cbe8(0x27c)])return;SceneManager['isSceneBattle']()&&BattleManager['isOTB']()&&(BattleManager[_0x31cbe8(0x2b7)](),BattleManager['otbReturnBattlerToTurnOrders']($gameActors[_0x31cbe8(0xb9)](_0xa23e77)));},VisuMZ[_0x22f2b4(0x269)]['Game_Party_removeActor']=Game_Party[_0x22f2b4(0x1ed)][_0x22f2b4(0x14c)],Game_Party[_0x22f2b4(0x1ed)][_0x22f2b4(0x14c)]=function(_0x42b903){const _0x297b1d=_0x22f2b4;VisuMZ[_0x297b1d(0x269)][_0x297b1d(0x10a)][_0x297b1d(0x282)](this,_0x42b903),SceneManager[_0x297b1d(0x135)]()&&BattleManager[_0x297b1d(0x1d4)]()&&(_0x297b1d(0x2d1)===_0x297b1d(0x2d1)?BattleManager['removeActionBattlersOTB']():_0x2bdbf5[_0x297b1d(0xc0)](_0xd5a729[_0x5628e4],0x1));},VisuMZ[_0x22f2b4(0x269)]['Scene_Battle_createActorCommandWindow']=Scene_Battle[_0x22f2b4(0x1ed)]['createActorCommandWindow'],Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x29a)]=function(){const _0x57e949=_0x22f2b4;VisuMZ[_0x57e949(0x269)][_0x57e949(0x1d2)][_0x57e949(0x282)](this);if(BattleManager[_0x57e949(0x1d4)]()){if(_0x57e949(0x312)!=='IskXi'){const _0x548c9e=this[_0x57e949(0xa2)];this['x']=(this['x']*(_0x548c9e-0x1)+this[_0x57e949(0xd2)])/_0x548c9e,this['y']=(this['y']*(_0x548c9e-0x1)+this[_0x57e949(0x19d)])/_0x548c9e,this['_positionDuration']--;}else this[_0x57e949(0x207)]();}},Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x207)]=function(){const _0x182f1f=_0x22f2b4,_0x44551d=this[_0x182f1f(0x2ac)];this[_0x182f1f(0x187)]()&&delete _0x44551d['_handlers']['cancel'];},VisuMZ['BattleSystemOTB']['Scene_Battle_commandCancel']=Scene_Battle[_0x22f2b4(0x1ed)]['commandCancel'],Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x149)]=function(){const _0x36211b=_0x22f2b4;BattleManager[_0x36211b(0x1d4)]()?_0x36211b(0x2eb)!==_0x36211b(0x1ba)?this[_0x36211b(0x2cf)]():_0x14396b+=_0x937359(_0x14532e['$1']):VisuMZ[_0x36211b(0x269)][_0x36211b(0x169)][_0x36211b(0x282)](this);},Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x2cf)]=function(){const _0x2b1623=_0x22f2b4;BattleManager[_0x2b1623(0xc3)](),this[_0x2b1623(0x96)][_0x2b1623(0x223)](),this[_0x2b1623(0x2ac)]['close']();},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x216)]=Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x200)],Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x200)]=function(){const _0x217d99=_0x22f2b4;if(BattleManager[_0x217d99(0x1d4)]()){if(_0x217d99(0x1f1)===_0x217d99(0x1f1))this[_0x217d99(0x9c)]();else{const _0xadde6d=this[_0x217d99(0x2de)]()-_0x2ff23f;_0xadde6d>0x0&&(_0x510031[_0x217d99(0x144)](this,_0xadde6d,_0x231712[_0x217d99(0x1e3)]),_0x4b1f0f[_0x217d99(0x144)](this,_0xadde6d,_0x4b4214[_0x217d99(0x1c5)]));}}else VisuMZ[_0x217d99(0x269)][_0x217d99(0x216)][_0x217d99(0x282)](this);},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x199)]=Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x105)],Scene_Battle[_0x22f2b4(0x1ed)]['createAllWindows']=function(){const _0x49ddf9=_0x22f2b4;VisuMZ[_0x49ddf9(0x269)][_0x49ddf9(0x199)][_0x49ddf9(0x282)](this),this[_0x49ddf9(0x100)]();},Scene_Battle['prototype'][_0x22f2b4(0x100)]=function(){const _0x55e51c=_0x22f2b4;if(!BattleManager[_0x55e51c(0x1d4)]())return;this[_0x55e51c(0xbd)]=new Window_OTB_TurnOrder();const _0x565214=this[_0x55e51c(0x228)](this[_0x55e51c(0x2a2)]);this['addChildAt'](this[_0x55e51c(0xbd)],_0x565214),this[_0x55e51c(0x203)](),SceneManager['isPreviousSceneBattleTransitionable']()&&this[_0x55e51c(0xbd)][_0x55e51c(0x248)]();},Scene_Battle['prototype'][_0x22f2b4(0x203)]=function(){const _0x4c4ea7=_0x22f2b4,_0xb3b711=Window_OTB_TurnOrder[_0x4c4ea7(0x2fb)];if(_0xb3b711[_0x4c4ea7(0x325)]!==_0x4c4ea7(0x1d6))return;if(!_0xb3b711[_0x4c4ea7(0x1c3)])return;if(!this[_0x4c4ea7(0x2d5)])return;const _0x3392bd=this[_0x4c4ea7(0xbd)]['y']-Math[_0x4c4ea7(0x19e)]((Graphics[_0x4c4ea7(0x11f)]-Graphics['boxHeight'])/0x2),_0x1fdc99=_0x3392bd+this[_0x4c4ea7(0xbd)][_0x4c4ea7(0x11f)];this['_logWindow']['y']=_0x1fdc99+(_0xb3b711['LogWindowOffsetY']||0x0);},VisuMZ['BattleSystemOTB'][_0x22f2b4(0xf1)]=Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x1b6)],Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x1b6)]=function(){const _0x2b65d5=_0x22f2b4;BattleManager[_0x2b65d5(0xc3)](),VisuMZ['BattleSystemOTB'][_0x2b65d5(0xf1)][_0x2b65d5(0x282)](this);},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x2b0)]=Scene_Battle[_0x22f2b4(0x1ed)]['commandGuard'],Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x28e)]=function(){const _0x447916=_0x22f2b4;BattleManager[_0x447916(0xc3)](),VisuMZ['BattleSystemOTB'][_0x447916(0x2b0)][_0x447916(0x282)](this);},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x19b)]=Scene_Battle['prototype'][_0x22f2b4(0x167)],Scene_Battle[_0x22f2b4(0x1ed)]['onActorOk']=function(){const _0x401cfc=_0x22f2b4;BattleManager[_0x401cfc(0xc3)](),VisuMZ[_0x401cfc(0x269)][_0x401cfc(0x19b)][_0x401cfc(0x282)](this);},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x139)]=Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x189)],Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x189)]=function(){const _0x18d3e6=_0x22f2b4;BattleManager[_0x18d3e6(0xc3)](),VisuMZ['BattleSystemOTB'][_0x18d3e6(0x139)][_0x18d3e6(0x282)](this);},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x2ca)]=Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x15b)],Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x15b)]=function(){const _0x4c1ca7=_0x22f2b4;BattleManager[_0x4c1ca7(0xc3)](),VisuMZ[_0x4c1ca7(0x269)][_0x4c1ca7(0x2ca)][_0x4c1ca7(0x282)](this);},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x32d)]=Scene_Battle['prototype'][_0x22f2b4(0xd4)],Scene_Battle['prototype'][_0x22f2b4(0xd4)]=function(){const _0x3f3a83=_0x22f2b4;BattleManager['otbPreviewOrderClear'](),VisuMZ[_0x3f3a83(0x269)]['Scene_Battle_onEnemyCancel']['call'](this);},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0xfe)]=Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x1e4)],Scene_Battle['prototype'][_0x22f2b4(0x1e4)]=function(){const _0x4e8184=_0x22f2b4;BattleManager[_0x4e8184(0xc3)](),VisuMZ[_0x4e8184(0x269)][_0x4e8184(0xfe)][_0x4e8184(0x282)](this);},VisuMZ[_0x22f2b4(0x269)]['Scene_Battle_onSkillCancel']=Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x2bf)],Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x2bf)]=function(){const _0x534de0=_0x22f2b4;BattleManager['otbPreviewOrderClear'](),VisuMZ[_0x534de0(0x269)]['Scene_Battle_onSkillCancel']['call'](this);},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x25a)]=Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x30a)],Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x30a)]=function(){const _0x32e543=_0x22f2b4;BattleManager['otbPreviewOrderClear'](),VisuMZ[_0x32e543(0x269)][_0x32e543(0x25a)][_0x32e543(0x282)](this);},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x2e1)]=Scene_Battle[_0x22f2b4(0x1ed)]['onItemCancel'],Scene_Battle[_0x22f2b4(0x1ed)]['onItemCancel']=function(){const _0x1ed523=_0x22f2b4;BattleManager[_0x1ed523(0xc3)](),VisuMZ['BattleSystemOTB'][_0x1ed523(0x2e1)][_0x1ed523(0x282)](this);},VisuMZ['BattleSystemOTB'][_0x22f2b4(0x10c)]=Scene_Battle['prototype']['actorCommandSingleSkill'],Scene_Battle[_0x22f2b4(0x1ed)][_0x22f2b4(0x2c1)]=function(){const _0x145174=_0x22f2b4;BattleManager[_0x145174(0xc3)](),VisuMZ[_0x145174(0x269)]['Scene_Battle_actorCommandSingleSkill']['call'](this);};function Sprite_OTB_TurnOrder_Battler(){const _0x98722b=_0x22f2b4;this[_0x98722b(0xb3)](...arguments);}Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)]=Object[_0x22f2b4(0xe3)](Sprite_Clickable['prototype']),Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x211)]=Sprite_OTB_TurnOrder_Battler,Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0xb3)]=function(_0x44d85a,_0x5e284f,_0x901e15){const _0x16331d=_0x22f2b4;this[_0x16331d(0x262)](_0x44d85a,_0x5e284f,_0x901e15),Sprite_Clickable[_0x16331d(0x1ed)][_0x16331d(0xb3)]['call'](this),this[_0x16331d(0x2f1)]=0x0,this[_0x16331d(0xe0)](),this[_0x16331d(0xab)]();},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x262)]=function(_0x44d868,_0xf5f145,_0x5ba96b){const _0x39a619=_0x22f2b4;this[_0x39a619(0x217)]=_0x44d868[_0x39a619(0xd1)]()?$gameParty:$gameTroop,this[_0x39a619(0x229)]=_0x44d868[_0x39a619(0x286)](),this[_0x39a619(0x2ab)]=_0xf5f145,this[_0x39a619(0x287)]=_0x5ba96b;const _0x11de3b=Window_OTB_TurnOrder[_0x39a619(0x2fb)],_0x486d52=this[_0x39a619(0x120)]();this['_positionDuration']=0x0,this[_0x39a619(0xd2)]=_0x11de3b[_0x39a619(0x166)]?-_0x11de3b[_0x39a619(0xbe)]:this[_0x39a619(0xb5)]()['width'],this[_0x39a619(0x19d)]=0x0,this['_fadeDuration']=0x0,this[_0x39a619(0x1ce)]=0xff,this[_0x39a619(0x124)]=![],this['_isAppeared']=![],this[_0x39a619(0x132)]=0x0,this['_containerHeight']=0x0;},Sprite_OTB_TurnOrder_Battler['prototype']['createChildren']=function(){const _0x281132=_0x22f2b4;this[_0x281132(0x2ae)](),this['createBackgroundSprite'](),this[_0x281132(0xf2)](),this['createBorderSprite'](),this[_0x281132(0x1b7)]();},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)]['createInitialPositions']=function(){const _0x1c5107=_0x22f2b4;this['x']=this[_0x1c5107(0xd2)],this['y']=this[_0x1c5107(0x19d)];},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)]['isHorz']=function(){return!![];},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)]['bitmapWidth']=function(){const _0x2542aa=_0x22f2b4,_0x20cee7=Window_OTB_TurnOrder[_0x2542aa(0x2fb)];return _0x20cee7[_0x2542aa(0xbe)];},Sprite_OTB_TurnOrder_Battler['prototype'][_0x22f2b4(0x205)]=function(){const _0x598083=_0x22f2b4,_0x2c8fda=Window_OTB_TurnOrder[_0x598083(0x2fb)];return _0x2c8fda[_0x598083(0x12f)];},Sprite_OTB_TurnOrder_Battler['prototype'][_0x22f2b4(0x322)]=function(){const _0x3ccbd7=_0x22f2b4;return this[_0x3ccbd7(0x217)]===$gameParty?_0x3ccbd7(0xb7):_0x3ccbd7(0x2e0);},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)]['createBackgroundSprite']=function(){const _0x1d1a09=_0x22f2b4;if(!Window_OTB_TurnOrder[_0x1d1a09(0x2fb)][_0x1d1a09(0x10d)])return;const _0x1ca313=Window_OTB_TurnOrder[_0x1d1a09(0x2fb)],_0x111923=this[_0x1d1a09(0x322)](),_0x110170='%1SystemBg'[_0x1d1a09(0x1d5)](_0x111923),_0x101368=new Sprite();_0x101368[_0x1d1a09(0x291)]['x']=this[_0x1d1a09(0x291)]['x'],_0x101368[_0x1d1a09(0x291)]['y']=this[_0x1d1a09(0x291)]['y'];if(_0x1ca313[_0x110170]){if(_0x1d1a09(0xa8)!=='wPFEA'){const _0x44901c=_0x3e697e['Settings'];if(!_0x44901c['EnemyBattlerDrawLetter'])return;if(this[_0x1d1a09(0x217)]===_0x3d9096)return;const _0x1f3904=this[_0x1d1a09(0xcf)](),_0x42eb76=this[_0x1d1a09(0x205)](),_0xcf8d83=new _0xfa961e();_0xcf8d83[_0x1d1a09(0x291)]['x']=this[_0x1d1a09(0x291)]['x'],_0xcf8d83[_0x1d1a09(0x291)]['y']=this[_0x1d1a09(0x291)]['y'],_0xcf8d83['bitmap']=new _0x59dcb7(_0x1f3904,_0x42eb76),this[_0x1d1a09(0x2fd)]=_0xcf8d83,this['addChild'](this[_0x1d1a09(0x2fd)]);}else _0x101368[_0x1d1a09(0x24e)]=ImageManager[_0x1d1a09(0x300)](_0x1ca313[_0x110170]);}else{if(_0x1d1a09(0x1ec)!=='OpLZM'){const _0xe147a7=this[_0x1d1a09(0x1a7)](),_0x279d33=_0x4ba8d5[_0x1d1a09(0x2e5)]();if(_0x279d33)_0x279d33[_0x1d1a09(0x1e8)](_0xe147a7?_0xe147a7['id']:null);_0x35d92d[_0x1d1a09(0x1ed)][_0x1d1a09(0x10b)][_0x1d1a09(0x282)](this);}else{const _0x5d7898=this[_0x1d1a09(0xcf)](),_0x366ab6=this[_0x1d1a09(0x205)]();_0x101368[_0x1d1a09(0x24e)]=new Bitmap(_0x5d7898,_0x366ab6);const _0x38861e=ColorManager[_0x1d1a09(0x150)](_0x1ca313[_0x1d1a09(0x12a)['format'](_0x111923)]),_0x3257c3=ColorManager[_0x1d1a09(0x150)](_0x1ca313[_0x1d1a09(0x2d8)[_0x1d1a09(0x1d5)](_0x111923)]);_0x101368[_0x1d1a09(0x24e)][_0x1d1a09(0x25c)](0x0,0x0,_0x5d7898,_0x366ab6,_0x38861e,_0x3257c3,!![]);}}this[_0x1d1a09(0x1c8)]=_0x101368,this[_0x1d1a09(0x275)](this[_0x1d1a09(0x1c8)]),this['width']=this[_0x1d1a09(0x1c8)][_0x1d1a09(0x93)],this['height']=this[_0x1d1a09(0x1c8)][_0x1d1a09(0x11f)];},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0xf2)]=function(){const _0x5e5d84=_0x22f2b4,_0x313beb=new Sprite();_0x313beb[_0x5e5d84(0x291)]['x']=this[_0x5e5d84(0x291)]['x'],_0x313beb[_0x5e5d84(0x291)]['y']=this[_0x5e5d84(0x291)]['y'],this[_0x5e5d84(0x134)]=_0x313beb,this['addChild'](this['_graphicSprite']),this[_0x5e5d84(0x29b)]();},Sprite_OTB_TurnOrder_Battler['prototype'][_0x22f2b4(0x277)]=function(){const _0x2b79af=_0x22f2b4;if(!Window_OTB_TurnOrder[_0x2b79af(0x2fb)][_0x2b79af(0x14a)])return;const _0x337842=Window_OTB_TurnOrder['Settings'],_0x4eee69=this[_0x2b79af(0x322)](),_0x2e240b='%1SystemBorder'[_0x2b79af(0x1d5)](_0x4eee69),_0x3e6a99=new Sprite();_0x3e6a99[_0x2b79af(0x291)]['x']=this[_0x2b79af(0x291)]['x'],_0x3e6a99['anchor']['y']=this[_0x2b79af(0x291)]['y'];if(_0x337842[_0x2e240b]){if(_0x2b79af(0xdd)!==_0x2b79af(0xeb))_0x3e6a99[_0x2b79af(0x24e)]=ImageManager['loadSystem'](_0x337842[_0x2e240b]);else{if(this['isOTB']())return _0x2b79af(0x1d0);return _0x391fa0[_0x2b79af(0x269)][_0x2b79af(0xd5)]['call'](this);}}else{if(_0x2b79af(0x15f)!==_0x2b79af(0x15f))_0x203528['BattleSystemOTB'][_0x2b79af(0x246)][_0x2b79af(0x282)](this,_0x1a3de1),this[_0x2b79af(0xba)](_0x333550),this[_0x2b79af(0x24b)](_0x260464);else{let _0x305513=this[_0x2b79af(0xcf)](),_0x48f59b=this['bitmapHeight'](),_0xdfa234=this[_0x2b79af(0x130)]();_0x3e6a99[_0x2b79af(0x24e)]=new Bitmap(_0x305513,_0x48f59b);const _0x16cc48='#000000',_0x123ddb=ColorManager[_0x2b79af(0x150)](_0x337842[_0x2b79af(0x1fe)[_0x2b79af(0x1d5)](_0x4eee69)]);_0x3e6a99[_0x2b79af(0x24e)][_0x2b79af(0x1dd)](0x0,0x0,_0x305513,_0x48f59b,_0x16cc48),_0x305513-=0x2,_0x48f59b-=0x2,_0x3e6a99['bitmap']['fillRect'](0x1,0x1,_0x305513,_0x48f59b,_0x123ddb),_0x305513-=_0xdfa234*0x2,_0x48f59b-=_0xdfa234*0x2,_0x3e6a99['bitmap'][_0x2b79af(0x1dd)](0x1+_0xdfa234,0x1+_0xdfa234,_0x305513,_0x48f59b,_0x16cc48),_0x305513-=0x2,_0x48f59b-=0x2,_0xdfa234+=0x1,_0x3e6a99[_0x2b79af(0x24e)][_0x2b79af(0x188)](0x1+_0xdfa234,0x1+_0xdfa234,_0x305513,_0x48f59b);}}this['_backgroundSprite']=_0x3e6a99,this[_0x2b79af(0x275)](this[_0x2b79af(0x1c8)]);},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x130)]=function(){const _0x55686f=Window_OTB_TurnOrder['Settings'];return _0x55686f['BorderThickness'];},Sprite_OTB_TurnOrder_Battler['prototype']['createLetterSprite']=function(){const _0x15fa91=_0x22f2b4,_0x1dd40e=Window_OTB_TurnOrder[_0x15fa91(0x2fb)];if(!_0x1dd40e['EnemyBattlerDrawLetter'])return;if(this[_0x15fa91(0x217)]===$gameParty)return;const _0x1ff4a6=this[_0x15fa91(0xcf)](),_0x49412c=this[_0x15fa91(0x205)](),_0x1db034=new Sprite();_0x1db034['anchor']['x']=this[_0x15fa91(0x291)]['x'],_0x1db034[_0x15fa91(0x291)]['y']=this['anchor']['y'],_0x1db034[_0x15fa91(0x24e)]=new Bitmap(_0x1ff4a6,_0x49412c),this[_0x15fa91(0x2fd)]=_0x1db034,this[_0x15fa91(0x275)](this[_0x15fa91(0x2fd)]);},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x13a)]=function(){const _0x391145=_0x22f2b4;return this[_0x391145(0x217)]?this[_0x391145(0x217)][_0x391145(0x22d)]()[this['_index']]:null;},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x122)]=function(){const _0x5c45c7=_0x22f2b4;Sprite_Clickable['prototype'][_0x5c45c7(0x122)][_0x5c45c7(0x282)](this),this[_0x5c45c7(0x16c)](),this[_0x5c45c7(0xab)](),this['updateOpacity'](),this['updateGraphic'](),this['updateGraphicHue'](),this[_0x5c45c7(0x244)](),this[_0x5c45c7(0x21c)]();},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x308)]=function(_0x4cc218,_0x143e09){const _0x18018d=_0x22f2b4,_0x16322d=Window_OTB_TurnOrder[_0x18018d(0x2fb)];this['_positionDuration']=_0x16322d[_0x18018d(0x31d)],this[_0x18018d(0xd2)]=_0x4cc218,this[_0x18018d(0x19d)]=_0x143e09;},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)]['updatePosition']=function(){const _0x3ca16f=_0x22f2b4;if(this['_positionDuration']>0x0){const _0x231699=this['_positionDuration'];this['x']=(this['x']*(_0x231699-0x1)+this['_positionTargetX'])/_0x231699,this['y']=(this['y']*(_0x231699-0x1)+this['_positionTargetY'])/_0x231699,this['_positionDuration']--;}if(this[_0x3ca16f(0xa2)]<=0x0){if(_0x3ca16f(0x28f)===_0x3ca16f(0x28f)){this['x']=this['_positionTargetX'],this['y']=this['_positionTargetY'];if(this[_0x3ca16f(0x2f1)]<0xff&&!this[_0x3ca16f(0x15d)]&&this[_0x3ca16f(0x157)]<=0x0){const _0x5f03e4=this['battler']();_0x5f03e4&&('aZzHG'!==_0x3ca16f(0x279)?this[_0x3ca16f(0x1ce)]=_0x5f03e4[_0x3ca16f(0x329)]()&&_0x5f03e4[_0x3ca16f(0x1e9)]()?0xff:0x0:(_0x22983c[_0x3ca16f(0x269)][_0x3ca16f(0x314)][_0x3ca16f(0x282)](this),this[_0x3ca16f(0x1d4)]()&&_0x163783[_0x3ca16f(0x2f7)]()&&!this[_0x3ca16f(0x24d)]&&this[_0x3ca16f(0x30f)]()));}}else{const _0x54b20a=this[_0x3ca16f(0x30e)]+_0xfce933[_0x3ca16f(0x1c9)],_0x594132=_0x429de9+_0x3ee1cd['UiSubjectOffsetY'],_0x23146c=_0x1347d3['SpriteThin'];this[_0x3ca16f(0x2c8)](_0x39893d[_0x3ca16f(0x209)],_0x54b20a,_0x594132,_0x23146c,_0x3ca16f(0x2aa));}}},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x201)]=function(){return 0x1;},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0xb5)]=function(){const _0x487555=_0x22f2b4;return SceneManager[_0x487555(0x2be)][_0x487555(0xbd)];},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0xc6)]=function(){const _0x7b9703=_0x22f2b4,_0x1f6eba=this['battler']();if(!_0x1f6eba)return this[_0x7b9703(0x201)]();if(_0x1f6eba===BattleManager[_0x7b9703(0x1a4)])return 0x0;if(BattleManager[_0x7b9703(0x1e3)][_0x7b9703(0x208)](_0x1f6eba)){const _0xce4a9b=BattleManager[_0x7b9703(0x1e3)][_0x7b9703(0x1a8)](_0x1f6eba)+0x1;return _0xce4a9b;}return this[_0x7b9703(0x201)]();},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x264)]=function(_0x9b1cfb){const _0x59ccec=_0x22f2b4,_0x2d92c=Window_OTB_TurnOrder[_0x59ccec(0x2fb)];this['_fadeDuration']=_0x2d92c[_0x59ccec(0x31d)],this[_0x59ccec(0x1ce)]=_0x9b1cfb;},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0xab)]=function(){const _0x2ebe8e=_0x22f2b4,_0x2d1d3b=this[_0x2ebe8e(0x13a)]();if(!_0x2d1d3b)return;if(this[_0x2ebe8e(0x124)]===_0x2d1d3b[_0x2ebe8e(0x329)]()&&this[_0x2ebe8e(0x1dc)]===_0x2d1d3b[_0x2ebe8e(0x1e9)]())return;this[_0x2ebe8e(0x124)]=_0x2d1d3b['isAlive'](),this[_0x2ebe8e(0x1dc)]=_0x2d1d3b[_0x2ebe8e(0x1e9)]();let _0x9c4380=this[_0x2ebe8e(0x124)]&&this[_0x2ebe8e(0x1dc)]?0xff:0x0;this['startFade'](_0x9c4380);},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)]['updateOpacity']=function(){const _0x4ae5ee=_0x22f2b4;if(this[_0x4ae5ee(0x157)]>0x0){const _0x1a610f=this[_0x4ae5ee(0x157)];this['opacity']=(this['opacity']*(_0x1a610f-0x1)+this['_fadeTarget'])/_0x1a610f,this[_0x4ae5ee(0x157)]--,this[_0x4ae5ee(0x157)]<=0x0&&('LiTNG'===_0x4ae5ee(0x2fe)?this['opacity']=this['_fadeTarget']:_0x48a300[_0x4ae5ee(0x1d4)]()&&_0x470928&&_0x1bae24['note']&&_0x22b172[_0x4ae5ee(0x142)]['match'](/<(?:OTB) HELP>\s*([\s\S]*)\s*<\/(?:OTB) HELP>/i)?this[_0x4ae5ee(0x2e2)](_0xac9440(_0x2a46fc['$1'])):_0x4b37a2[_0x4ae5ee(0x269)][_0x4ae5ee(0x25e)][_0x4ae5ee(0x282)](this,_0x46dce9));}if(this[_0x4ae5ee(0x15d)])return;BattleManager[_0x4ae5ee(0x102)]===_0x4ae5ee(0xac)&&('xPdVW'===_0x4ae5ee(0x2f0)?(this[_0x4ae5ee(0x15d)]=!![],this['startFade'](0x0)):_0x4f6c65+=_0x535a73(_0x2ee78c['$1']));},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)]['updateGraphic']=function(){const _0x412996=_0x22f2b4,_0x557a7a=this[_0x412996(0x13a)]();if(!_0x557a7a)return;const _0x587aa7=Window_OTB_TurnOrder[_0x412996(0x2fb)],_0xfae3d7=this['_unit']===$gameParty?_0x412996(0xb7):_0x412996(0x2e0);let _0x342953=_0x557a7a['TurnOrderOTBGraphicType']();if(_0x557a7a[_0x412996(0xd1)]()&&_0x342953===_0x412996(0x2b8))_0x342953=_0x412996(0x255);else _0x557a7a[_0x412996(0x2f3)]()&&_0x342953==='svactor'&&('RJERL'===_0x412996(0x2c3)?this['_previewContainer']['x']+=_0xfe50a5[_0x412996(0xbe)]:_0x342953=_0x412996(0x2b8));if(this[_0x412996(0x1af)]!==_0x342953)return this[_0x412996(0x29b)]();switch(this[_0x412996(0x1af)]){case _0x412996(0x255):if(this[_0x412996(0xc1)]!==_0x557a7a[_0x412996(0x238)]()){if(_0x412996(0x298)===_0x412996(0x298))return this['processUpdateGraphic']();else{let _0x56a39d=this['bitmapWidth'](),_0x45e4fd=this['bitmapHeight'](),_0x2d2309=this[_0x412996(0x130)]();_0x3102ac[_0x412996(0x24e)]=new _0x1c6cab(_0x56a39d,_0x45e4fd);const _0x4b1948='#000000',_0x252510=_0x1ac273[_0x412996(0x150)](_0x2f89b9[_0x412996(0x1fe)[_0x412996(0x1d5)](_0xdceb7d)]);_0xababb9[_0x412996(0x24e)]['fillRect'](0x0,0x0,_0x56a39d,_0x45e4fd,_0x4b1948),_0x56a39d-=0x2,_0x45e4fd-=0x2,_0x79f284[_0x412996(0x24e)][_0x412996(0x1dd)](0x1,0x1,_0x56a39d,_0x45e4fd,_0x252510),_0x56a39d-=_0x2d2309*0x2,_0x45e4fd-=_0x2d2309*0x2,_0x1a2ec5['bitmap']['fillRect'](0x1+_0x2d2309,0x1+_0x2d2309,_0x56a39d,_0x45e4fd,_0x4b1948),_0x56a39d-=0x2,_0x45e4fd-=0x2,_0x2d2309+=0x1,_0x306a50[_0x412996(0x24e)][_0x412996(0x188)](0x1+_0x2d2309,0x1+_0x2d2309,_0x56a39d,_0x45e4fd);}}if(this[_0x412996(0x1a0)]!==_0x557a7a[_0x412996(0x236)]())return _0x412996(0x27b)==='kMLXo'?this[_0x412996(0x29b)]():this[_0x412996(0x29b)]();break;case _0x412996(0xa0):if(this[_0x412996(0x176)]!==_0x557a7a[_0x412996(0x11b)]())return this[_0x412996(0x29b)]();break;case _0x412996(0x2b8):if(_0x557a7a[_0x412996(0x1d8)]()){if(_0x412996(0x110)!==_0x412996(0x258)){if(this[_0x412996(0x18c)]!==_0x557a7a[_0x412996(0xec)]())return this[_0x412996(0x29b)]();}else this[_0x412996(0x1c6)]=_0x373329;}else{if(this['_graphicEnemy']!==_0x557a7a['battlerName']())return this[_0x412996(0x29b)]();}break;case _0x412996(0xc5):if(_0x557a7a[_0x412996(0xd1)]()){if(this[_0x412996(0x18c)]!==_0x557a7a[_0x412996(0x31a)]())return _0x412996(0x92)===_0x412996(0x2a6)?this[_0x412996(0x2be)]&&this[_0x412996(0x2be)][_0x412996(0x211)]===_0x298c26:this['processUpdateGraphic']();}else{if(this[_0x412996(0x1a1)]!==_0x557a7a[_0x412996(0x31a)]()){if(_0x412996(0xa6)===_0x412996(0xa6))return this['processUpdateGraphic']();else _0x52cf51[_0x412996(0xfc)]=_0x130750['round']((_0xa82737[_0x412996(0x93)]-_0x44bab6['min'](_0xec30ca[_0x412996(0x1f3)],_0x1884f9[_0x412996(0x93)]))/0x2);}}break;}},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x29b)]=function(){const _0x191592=_0x22f2b4,_0x526381=this[_0x191592(0x13a)]();if(!_0x526381)return;this[_0x191592(0x1af)]=_0x526381[_0x191592(0x294)]();if(_0x526381[_0x191592(0xd1)]()&&this[_0x191592(0x1af)]==='enemy')this[_0x191592(0x1af)]=_0x191592(0x255);else _0x526381['isEnemy']()&&this['_graphicType']===_0x191592(0xc5)&&(_0x191592(0x212)!==_0x191592(0x212)?(_0x4a6cf8(_0x191592(0x90)[_0x191592(0x1d5)](_0x1e2c58,_0xfa73db,_0x4ab124)),_0x295e1b[_0x191592(0x1f4)]()):this[_0x191592(0x1af)]=_0x191592(0x2b8));let _0x5041f8;switch(this[_0x191592(0x1af)]){case _0x191592(0x255):this[_0x191592(0xc1)]=_0x526381[_0x191592(0x238)](),this[_0x191592(0x1a0)]=_0x526381['TurnOrderOTBGraphicFaceIndex'](),_0x5041f8=ImageManager[_0x191592(0x17b)](this[_0x191592(0xc1)]),_0x5041f8[_0x191592(0x231)](this['changeFaceGraphicBitmap'][_0x191592(0x2e8)](this,_0x5041f8));break;case _0x191592(0xa0):this['_graphicIconIndex']=_0x526381['createTurnOrderOTBGraphicIconIndex'](),_0x5041f8=ImageManager[_0x191592(0x300)](_0x191592(0x31f)),_0x5041f8['addLoadListener'](this[_0x191592(0x239)][_0x191592(0x2e8)](this,_0x5041f8));break;case _0x191592(0x2b8):if(_0x526381[_0x191592(0x1d8)]())this[_0x191592(0x18c)]=_0x526381['svBattlerName'](),_0x5041f8=ImageManager[_0x191592(0xbc)](this[_0x191592(0x18c)]),_0x5041f8[_0x191592(0x231)](this['changeSvActorGraphicBitmap'][_0x191592(0x2e8)](this,_0x5041f8));else $gameSystem[_0x191592(0xdb)]()?(this[_0x191592(0x1a1)]=_0x526381['battlerName'](),_0x5041f8=ImageManager['loadSvEnemy'](this[_0x191592(0x1a1)]),_0x5041f8[_0x191592(0x231)](this[_0x191592(0x26d)]['bind'](this,_0x5041f8))):(this[_0x191592(0x1a1)]=_0x526381['battlerName'](),_0x5041f8=ImageManager[_0x191592(0x29c)](this[_0x191592(0x1a1)]),_0x5041f8[_0x191592(0x231)](this[_0x191592(0x26d)]['bind'](this,_0x5041f8)));break;case _0x191592(0xc5):this['_graphicSv']=_0x526381['battlerName'](),_0x5041f8=ImageManager[_0x191592(0xbc)](this[_0x191592(0x18c)]),_0x5041f8[_0x191592(0x231)](this[_0x191592(0x2f4)][_0x191592(0x2e8)](this,_0x5041f8));break;}},Sprite_OTB_TurnOrder_Battler['prototype']['changeFaceGraphicBitmap']=function(_0x5f3394){const _0x4be9aa=_0x22f2b4,_0xa87b13=this['_graphicFaceIndex'],_0x45ce61=this[_0x4be9aa(0xcf)](),_0x1d4714=this[_0x4be9aa(0x205)](),_0x49d190=Math[_0x4be9aa(0x2ef)](_0x45ce61,_0x1d4714);this[_0x4be9aa(0x134)][_0x4be9aa(0x24e)]=new Bitmap(_0x45ce61,_0x1d4714);const _0x62acdc=this[_0x4be9aa(0x134)]['bitmap'],_0x432620=ImageManager['faceWidth'],_0x54bfde=ImageManager['faceHeight'],_0x3cfd27=_0x49d190/Math[_0x4be9aa(0x2ef)](_0x432620,_0x54bfde),_0x59eff7=ImageManager['faceWidth'],_0x32ce6d=ImageManager['faceHeight'],_0x2b8fc0=_0xa87b13%0x4*_0x432620+(_0x432620-_0x59eff7)/0x2,_0x589ff2=Math[_0x4be9aa(0x326)](_0xa87b13/0x4)*_0x54bfde+(_0x54bfde-_0x32ce6d)/0x2,_0x12fa54=(_0x45ce61-_0x432620*_0x3cfd27)/0x2,_0x57632c=(_0x1d4714-_0x54bfde*_0x3cfd27)/0x2;_0x62acdc[_0x4be9aa(0x161)](_0x5f3394,_0x2b8fc0,_0x589ff2,_0x59eff7,_0x32ce6d,_0x12fa54,_0x57632c,_0x49d190,_0x49d190);},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)]['changeIconGraphicBitmap']=function(_0x5c0908){const _0x4fceb1=_0x22f2b4,_0x513d89=this[_0x4fceb1(0x176)],_0x5aeeff=this[_0x4fceb1(0xcf)](),_0x1a6b79=this[_0x4fceb1(0x205)]();this[_0x4fceb1(0x134)]['bitmap']=new Bitmap(_0x5aeeff,_0x1a6b79);const _0x2ee827=this[_0x4fceb1(0x134)][_0x4fceb1(0x24e)],_0xcb38cc=ImageManager[_0x4fceb1(0x290)],_0x4cd1a2=ImageManager[_0x4fceb1(0x175)],_0x412d68=Math['min'](_0xcb38cc,_0x4cd1a2,_0x5aeeff,_0x1a6b79),_0xb34801=_0x513d89%0x10*_0xcb38cc,_0x5e7b59=Math[_0x4fceb1(0x326)](_0x513d89/0x10)*_0x4cd1a2,_0x5f5b10=Math[_0x4fceb1(0x326)](Math[_0x4fceb1(0x2ef)](_0x5aeeff-_0x412d68,0x0)/0x2),_0x5ca4e1=Math['floor'](Math[_0x4fceb1(0x2ef)](_0x1a6b79-_0x412d68,0x0)/0x2);_0x2ee827[_0x4fceb1(0x161)](_0x5c0908,_0xb34801,_0x5e7b59,_0xcb38cc,_0x4cd1a2,_0x5f5b10,_0x5ca4e1,_0x412d68,_0x412d68);},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x2f4)]=function(_0x20f914){const _0x223271=_0x22f2b4,_0x5d9151=this[_0x223271(0xcf)](),_0x2aec75=this[_0x223271(0x205)](),_0x20d096=Math['min'](_0x5d9151,_0x2aec75);this['_graphicSprite'][_0x223271(0x24e)]=new Bitmap(_0x5d9151,_0x2aec75);const _0x315844=this[_0x223271(0x134)][_0x223271(0x24e)],_0x31ec27=this[_0x223271(0x18c)][_0x223271(0x213)](/\$/i),_0x4b6549=_0x31ec27?0x1:ImageManager[_0x223271(0x2d4)],_0x403fcc=_0x31ec27?0x1:ImageManager[_0x223271(0x198)],_0x28e5ad=_0x20f914[_0x223271(0x93)]/_0x4b6549,_0x42e0bc=_0x20f914['height']/_0x403fcc,_0x2b7436=Math[_0x223271(0x10e)](0x1,_0x20d096/_0x28e5ad,_0x20d096/_0x42e0bc),_0x569007=_0x28e5ad*_0x2b7436,_0x570991=_0x42e0bc*_0x2b7436,_0x7d6016=Math['round']((_0x5d9151-_0x569007)/0x2),_0x4ac85e=Math[_0x223271(0x19e)]((_0x2aec75-_0x570991)/0x2);_0x315844[_0x223271(0x161)](_0x20f914,0x0,0x0,_0x28e5ad,_0x42e0bc,_0x7d6016,_0x4ac85e,_0x569007,_0x570991);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x22f2b4(0x26d)]=function(_0x1be8db){const _0x528a65=_0x22f2b4,_0x52f823=Window_OTB_TurnOrder[_0x528a65(0x2fb)],_0x1999c8=this['bitmapWidth'](),_0x20efea=this[_0x528a65(0x205)](),_0x834d1c=Math[_0x528a65(0x10e)](_0x1999c8,_0x20efea);this['_graphicSprite'][_0x528a65(0x24e)]=new Bitmap(_0x1999c8,_0x20efea);const _0x10baff=this[_0x528a65(0x134)][_0x528a65(0x24e)],_0xe441cb=Math[_0x528a65(0x10e)](0x1,_0x834d1c/_0x1be8db[_0x528a65(0x93)],_0x834d1c/_0x1be8db[_0x528a65(0x11f)]),_0x1af80c=_0x1be8db[_0x528a65(0x93)]*_0xe441cb,_0x44d91d=_0x1be8db[_0x528a65(0x11f)]*_0xe441cb,_0x280d8f=Math[_0x528a65(0x19e)]((_0x1999c8-_0x1af80c)/0x2),_0x443053=Math[_0x528a65(0x19e)]((_0x20efea-_0x44d91d)/0x2);_0x10baff[_0x528a65(0x161)](_0x1be8db,0x0,0x0,_0x1be8db[_0x528a65(0x93)],_0x1be8db[_0x528a65(0x11f)],_0x280d8f,_0x443053,_0x1af80c,_0x44d91d);},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)]['updateGraphicHue']=function(){const _0x46e4a6=_0x22f2b4,_0x4e750e=this['battler']();if(!_0x4e750e)return;if(!_0x4e750e[_0x46e4a6(0x2f3)]())return;if(this[_0x46e4a6(0x31e)]===_0x4e750e[_0x46e4a6(0x1e0)]())return;this[_0x46e4a6(0x31e)]=_0x4e750e[_0x46e4a6(0x1e0)]();if(_0x4e750e[_0x46e4a6(0x1d8)]())this[_0x46e4a6(0x31e)]=0x0;this[_0x46e4a6(0x134)]['setHue'](this[_0x46e4a6(0x31e)]);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x22f2b4(0x244)]=function(){const _0x489c7d=_0x22f2b4;if(!this[_0x489c7d(0x2fd)])return;const _0x430ec2=this[_0x489c7d(0x13a)]();if(!_0x430ec2)return;if(this[_0x489c7d(0x302)]===_0x430ec2['_letter']&&this[_0x489c7d(0x32b)]===_0x430ec2['_plural'])return;this[_0x489c7d(0x302)]=_0x430ec2[_0x489c7d(0x302)],this['_plural']=_0x430ec2['_plural'];const _0x5cbb83=Window_OTB_TurnOrder[_0x489c7d(0x2fb)],_0x256557=this[_0x489c7d(0xcf)](),_0x284250=this[_0x489c7d(0x205)](),_0xfafdbe=this[_0x489c7d(0x2fd)][_0x489c7d(0x24e)];_0xfafdbe[_0x489c7d(0x292)]();if(!this[_0x489c7d(0x32b)])return;_0xfafdbe[_0x489c7d(0x25f)]=_0x5cbb83[_0x489c7d(0x22b)]||$gameSystem[_0x489c7d(0x195)](),_0xfafdbe['fontSize']=_0x5cbb83[_0x489c7d(0x141)]||0x10,_0x5cbb83['OrderDirection']?_0xfafdbe[_0x489c7d(0x2c8)](this['_letter'][_0x489c7d(0x2d7)](),_0x256557*0x1/0x8,_0x284250/0x2,_0x256557,_0x284250/0x2,_0x489c7d(0x2f5)):_0xfafdbe[_0x489c7d(0x2c8)](this[_0x489c7d(0x302)]['trim'](),0x0,_0x284250/0x2,_0x256557*0x7/0x8,_0x284250/0x2,_0x489c7d(0xbb));},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)][_0x22f2b4(0x21c)]=function(){const _0x1eb845=_0x22f2b4,_0xa4719b=this[_0x1eb845(0x13a)]();if(!_0xa4719b)return;const _0x3a65e2=_0xa4719b[_0x1eb845(0x13a)]();if(!_0x3a65e2)return;const _0x28eb8c=_0x3a65e2[_0x1eb845(0x2a1)]();if(!_0x28eb8c)return;this['setBlendColor'](_0x28eb8c['_blendColor']);},Sprite_OTB_TurnOrder_Battler['prototype']['getStateTooltipBattler']=function(){return null;},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)]['changeSourceArray']=function(_0x5cdfed){const _0x17e81b=_0x22f2b4;this['_sourceArray']=_0x5cdfed,this[_0x17e81b(0x21d)](),this[_0x17e81b(0x287)]===null&&(this[_0x17e81b(0x2ab)]=-0x1);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x22f2b4(0x21d)]=function(){const _0x85e5d8=_0x22f2b4,_0x54b668=this[_0x85e5d8(0xb5)]();if(!_0x54b668)return;const _0x864629=Window_OTB_TurnOrder[_0x85e5d8(0x2fb)],_0x3cbcec=_0x864629[_0x85e5d8(0x166)],_0x5ec88f=this['_sourceArray']===_0x54b668[_0x85e5d8(0xce)]?!![]:![],_0x24747c=this[_0x85e5d8(0x2ab)]===-0x1&&BattleManager[_0x85e5d8(0x1a4)]===this[_0x85e5d8(0x13a)](),_0xf366a9=_0x54b668[_0x85e5d8(0x23f)]-_0x864629['SpriteThin'];let _0x9624df=Math[_0x85e5d8(0x19c)](_0xf366a9/(this[_0x85e5d8(0x287)]['length']-0x1||0x1));_0x9624df=Math[_0x85e5d8(0x10e)](_0x864629[_0x85e5d8(0xbe)],_0x9624df);let _0x19ec0e=0x0,_0x3a073f=0x0,_0x555cd6=_0x24747c?-0x1:this[_0x85e5d8(0x287)]['indexOf'](this);if(!_0x24747c){if(_0x85e5d8(0x11e)===_0x85e5d8(0x11e))_0x555cd6=this[_0x85e5d8(0xd7)]();else{const _0x3f8cab=_0x32a2e5[_0x85e5d8(0x2fb)];return _0x3f8cab[_0x85e5d8(0x12f)];}}if(_0x24747c)_0x19ec0e=_0x54b668[_0x85e5d8(0x30e)];else _0x3cbcec?_0x85e5d8(0x210)!==_0x85e5d8(0x210)?this['padding']=0x0:(_0x19ec0e=(_0x5ec88f?_0x54b668['_nextX']:_0x54b668[_0x85e5d8(0xcd)])+_0xf366a9,_0x19ec0e-=_0x555cd6*_0x9624df):(_0x19ec0e=_0x5ec88f?_0x54b668[_0x85e5d8(0x293)]:_0x54b668[_0x85e5d8(0xcd)],_0x19ec0e+=_0x555cd6*_0x9624df);_0x19ec0e+=this[_0x85e5d8(0x2a4)](_0x555cd6,_0x864629['SpriteThin']-_0x9624df),!_0x24747c&&_0x555cd6<0x0&&(_0x19ec0e=this['x'],_0x3a073f=this['y'],this[_0x85e5d8(0x264)](0x0)),this[_0x85e5d8(0x308)](_0x19ec0e,_0x3a073f);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x22f2b4(0x2a4)]=function(_0x1415f8,_0x39977a){return 0x0;},Sprite_OTB_TurnOrder_Battler[_0x22f2b4(0x1ed)]['calculateTargetIndex']=function(){const _0x2ae4ff=_0x22f2b4,_0x497041=this[_0x2ae4ff(0xb5)]();if(!_0x497041)return 0x0;const _0x52000b=this[_0x2ae4ff(0x287)]===_0x497041[_0x2ae4ff(0xce)]?!![]:![],_0x15c6c0=_0x52000b?BattleManager[_0x2ae4ff(0x1c5)]:BattleManager[_0x2ae4ff(0x1e3)],_0x245540=this[_0x2ae4ff(0x13a)](),_0x340d6a=VisuMZ['BattleSystemOTB'][_0x2ae4ff(0xe8)](_0x245540,_0x15c6c0);return _0x340d6a[this[_0x2ae4ff(0x2ab)]]??_0x340d6a[_0x340d6a[_0x2ae4ff(0x99)]-0x1]??-0x1;};function Sprite_OTB_TurnOrder_Preview(){const _0x196a1f=_0x22f2b4;this[_0x196a1f(0xb3)](...arguments);}Sprite_OTB_TurnOrder_Preview[_0x22f2b4(0x1ed)]=Object['create'](Sprite_OTB_TurnOrder_Battler['prototype']),Sprite_OTB_TurnOrder_Preview[_0x22f2b4(0x1ed)][_0x22f2b4(0x211)]=Sprite_OTB_TurnOrder_Preview,Sprite_OTB_TurnOrder_Preview[_0x22f2b4(0x1ed)][_0x22f2b4(0xb3)]=function(_0x493260,_0x2a7991,_0x4f1df1,_0x3c9493){const _0x4c1f08=_0x22f2b4;this['_offset']=_0x3c9493,Sprite_OTB_TurnOrder_Battler['prototype'][_0x4c1f08(0xb3)][_0x4c1f08(0x282)](this,_0x493260,_0x2a7991,_0x4f1df1),this[_0x4c1f08(0x2df)]();},Sprite_OTB_TurnOrder_Preview['prototype']['adjustForPreview']=function(){const _0x340376=_0x22f2b4,_0xe558c2=Window_OTB_TurnOrder[_0x340376(0x2fb)];this[_0x340376(0x1ee)]['x']=this['scale']['y']=_0xe558c2[_0x340376(0x1f2)];},Sprite_OTB_TurnOrder_Preview[_0x22f2b4(0x1ed)]['getUnitSideSide']=function(){const _0x15ea6b=_0x22f2b4;return this[_0x15ea6b(0x217)]===$gameParty?'PreviewActor':_0x15ea6b(0xdf);},Sprite_OTB_TurnOrder_Preview[_0x22f2b4(0x1ed)][_0x22f2b4(0x130)]=function(){const _0x19deae=_0x22f2b4,_0x374e00=Window_OTB_TurnOrder[_0x19deae(0x2fb)];return Math[_0x19deae(0x19c)](_0x374e00[_0x19deae(0xb2)]/(_0x374e00[_0x19deae(0x1f2)]||0.01));},Sprite_OTB_TurnOrder_Preview[_0x22f2b4(0x1ed)]['moveToPosition']=function(_0x2d7c8f,_0x3289a8){const _0xd19f18=_0x22f2b4;Sprite_OTB_TurnOrder_Battler[_0xd19f18(0x1ed)][_0xd19f18(0x308)][_0xd19f18(0x282)](this,_0x2d7c8f,_0x3289a8),this['x']=this[_0xd19f18(0xd2)],this['y']=this[_0xd19f18(0x19d)];},Sprite_OTB_TurnOrder_Preview[_0x22f2b4(0x1ed)]['startFade']=function(_0x19bd93){const _0x22781b=_0x22f2b4;Sprite_OTB_TurnOrder_Battler[_0x22781b(0x1ed)][_0x22781b(0x264)][_0x22781b(0x282)](this,_0x19bd93),_0x19bd93>0x0?this[_0x22781b(0x157)]=0x1:_0x22781b(0x1b2)===_0x22781b(0x185)?this['makeOTBSpeed']():(this[_0x22781b(0x157)]/=0x2,this[_0x22781b(0x157)]=Math[_0x22781b(0x326)](this[_0x22781b(0x157)]));},Sprite_OTB_TurnOrder_Preview[_0x22f2b4(0x1ed)][_0x22f2b4(0x2a4)]=function(_0x23bb7a,_0x5b7a21){const _0x544bf3=_0x22f2b4,_0x710d01=Window_OTB_TurnOrder['Settings'];if(_0x23bb7a>0x0){if(this[_0x544bf3(0x1cc)]>0x0){if(_0x710d01[_0x544bf3(0x166)]){if(_0x544bf3(0x1be)==='aaYuP')return-_0x710d01[_0x544bf3(0xbe)];else _0x3e183b+=_0x327535(_0x2d5a8a['$1']);}else return _0x710d01[_0x544bf3(0xbe)];}else{if(this[_0x544bf3(0x1cc)]<0x0)return _0x710d01[_0x544bf3(0x166)]?-_0x5b7a21:_0x544bf3(0x1a6)===_0x544bf3(0x266)?0x0:_0x5b7a21;}}return 0x0;},Sprite_OTB_TurnOrder_Preview['prototype'][_0x22f2b4(0xd7)]=function(){const _0x2506fd=_0x22f2b4,_0x4d4171=this[_0x2506fd(0xb5)](),_0x51cdbd=this[_0x2506fd(0x287)]===_0x4d4171[_0x2506fd(0xce)]?!![]:![],_0x29d4c0=_0x51cdbd?BattleManager[_0x2506fd(0x1c5)]:BattleManager[_0x2506fd(0x1e3)];let _0x26249b=0x0,_0x407077=_0x29d4c0[_0x2506fd(0x99)]-0x1;_0x51cdbd&&(_0x26249b=Math[_0x2506fd(0x2ef)](0x0,VisuMZ[_0x2506fd(0x269)]['getInfinityClamp'](_0x29d4c0)));let _0x2b32ec=Sprite_OTB_TurnOrder_Battler['prototype'][_0x2506fd(0xd7)][_0x2506fd(0x282)](this);return _0x2b32ec+=this[_0x2506fd(0x1cc)],_0x2b32ec[_0x2506fd(0xe7)](_0x26249b,_0x407077);},Sprite_OTB_TurnOrder_Preview[_0x22f2b4(0x1ed)][_0x22f2b4(0x21c)]=function(){},Window_Selectable[_0x22f2b4(0x1ed)][_0x22f2b4(0xa7)]=function(){return![];},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x278)]=Window_Selectable[_0x22f2b4(0x1ed)]['select'],Window_Selectable['prototype'][_0x22f2b4(0x20c)]=function(_0x591dd7){const _0x4d31ee=_0x22f2b4;VisuMZ[_0x4d31ee(0x269)]['Window_Selectable_select'][_0x4d31ee(0x282)](this,_0x591dd7),this[_0x4d31ee(0xa7)]()&&this[_0x4d31ee(0xde)]&&(_0x4d31ee(0x27d)===_0x4d31ee(0x295)?_0x2c07a7[_0x4d31ee(0x24e)]=_0x12f360[_0x4d31ee(0x300)](_0x578156[_0x151aad]):this[_0x4d31ee(0x10b)]());},Window_Selectable['prototype'][_0x22f2b4(0x10b)]=function(){const _0x45f7a3=_0x22f2b4;BattleManager[_0x45f7a3(0x2e6)]();},VisuMZ[_0x22f2b4(0x269)][_0x22f2b4(0x25e)]=Window_Help[_0x22f2b4(0x1ed)]['setItem'],Window_Help[_0x22f2b4(0x1ed)][_0x22f2b4(0x21b)]=function(_0x2a50ea){const _0xa8e483=_0x22f2b4;BattleManager[_0xa8e483(0x1d4)]()&&_0x2a50ea&&_0x2a50ea[_0xa8e483(0x142)]&&_0x2a50ea[_0xa8e483(0x142)][_0xa8e483(0x213)](/<(?:OTB) HELP>\s*([\s\S]*)\s*<\/(?:OTB) HELP>/i)?this[_0xa8e483(0x2e2)](String(RegExp['$1'])):VisuMZ[_0xa8e483(0x269)]['Window_Help_setItem'][_0xa8e483(0x282)](this,_0x2a50ea);},Window_ActorCommand[_0x22f2b4(0x1ed)]['isBattleItemWindowOTB']=function(){const _0x5c3260=_0x22f2b4;return BattleManager[_0x5c3260(0x1d4)]();},Window_ActorCommand['prototype'][_0x22f2b4(0x10b)]=function(){const _0x53a292=_0x22f2b4,_0x19f757=BattleManager[_0x53a292(0x2e5)]();if(_0x19f757){const _0x124b11=this['currentSymbol']();switch(_0x124b11){case _0x53a292(0xb4):_0x19f757['setAttack']();break;case'guard':_0x19f757[_0x53a292(0x191)]();break;case _0x53a292(0x1f9):_0x19f757[_0x53a292(0x1e8)](this['currentExt']());break;default:_0x19f757[_0x53a292(0x1e8)](null);break;}}Window_Command[_0x53a292(0x1ed)][_0x53a292(0x10b)][_0x53a292(0x282)](this);},Window_BattleSkill['prototype'][_0x22f2b4(0xa7)]=function(){const _0x2382fd=_0x22f2b4;return BattleManager[_0x2382fd(0x1d4)]();},Window_BattleSkill[_0x22f2b4(0x1ed)]['applyBattleItemWindowOTB']=function(){const _0x50df98=_0x22f2b4,_0x537384=this[_0x50df98(0x1a7)](),_0x124539=BattleManager[_0x50df98(0x2e5)]();if(_0x124539)_0x124539[_0x50df98(0x1e8)](_0x537384?_0x537384['id']:null);Window_SkillList[_0x50df98(0x1ed)][_0x50df98(0x10b)][_0x50df98(0x282)](this);},Window_BattleItem[_0x22f2b4(0x1ed)][_0x22f2b4(0xa7)]=function(){const _0x3c6b52=_0x22f2b4;return BattleManager[_0x3c6b52(0x1d4)]();},Window_BattleItem[_0x22f2b4(0x1ed)][_0x22f2b4(0x10b)]=function(){const _0x55f19f=_0x22f2b4,_0x160372=this[_0x55f19f(0x1a7)](),_0x2a2e04=BattleManager[_0x55f19f(0x2e5)]();if(_0x2a2e04)_0x2a2e04[_0x55f19f(0x21b)](_0x160372?_0x160372['id']:null);Window_ItemList[_0x55f19f(0x1ed)][_0x55f19f(0x10b)][_0x55f19f(0x282)](this);},Window_BattleActor[_0x22f2b4(0x1ed)][_0x22f2b4(0xa7)]=function(){return BattleManager['isOTB']();},Window_BattleEnemy[_0x22f2b4(0x1ed)]['isBattleItemWindowOTB']=function(){const _0x2d6a20=_0x22f2b4;return BattleManager[_0x2d6a20(0x1d4)]();};function _0x6bbd(){const _0x3cd773=['aFjaT','evtRV','OTB_STUN_INFINITY_CLAMP','iiFoq','commandCancel','ShowMarkerBorder','455340ycgwBT','removeActor','setBattleSystemOTBTurnOrderVisible','SideviewBattleUI','push','getColor','createTurnOrderOTBGraphicIconIndex','EFFECT_ADD_DEBUFF','ConvertParams','processSpriteRemoval','DisplayOffsetX','gdcWU','_fadeDuration','_homeY','yogmU','VBVUR','onEnemyOk','addActor','_isBattleOver','UiNextOffsetY','sTVGf','175936WFGErs','blt','stepForward','BattleManager_getNextSubject','OtbTurnOrderActorIcon','contents','OrderDirection','onActorOk','_homeX','Scene_Battle_commandCancel','JYpGn','drawUiText','updatePosition','pgWvp','FaceIndex','cancel','performCollapse','_forcedBattlers','BattleManager_setup','GzaYr','gFXMi','iconHeight','_graphicIconIndex','getInfinityClamp','OTB_CONVERT_AGI_DEBUFF_CURRENT_TURN','shift','otbAddActions','loadFace','OtbTurnOrderActorFace','BattleManager_isTpb','randomInt','paIMW','dimColor1','_otbTimesActedThisTurn','LIejs','OTB_ADDED_RANDOMIZE_ADDED_ACTION_ORDER','children','jLqtK','Game_Battler_addState','isPartyCommandWindowDisabled','clearRect','onActorCancel','code','isActiveTpb','_graphicSv','canMove','RepositionTopForHelp','cHMQc','BgImageOffsetY','setGuard','_requestTurnOrderUpdate','_handlers','updateTurnOrders','mainFontFace','addState','Game_Battler_makeSpeed','svActorVertCells','Scene_Battle_createAllWindows','_otbTurnOrderVisible','Scene_Battle_onActorOk','ceil','_positionTargetY','round','ConvertAgiBuffNext','_graphicFaceIndex','_graphicEnemy','Actors','getNextSubject','_subject','OTB_STUN_INFINITY_SPEED','JuGhU','item','indexOf','96MuASLC','setOTBGraphicIconIndex','startTurn','gFGBX','shiftNextTurnSpritesToCurrentTurn','oaUiW','_graphicType','CqdDl','GCkds','cvFLb','makeActionOrders','OtbTurnOrderClearActorGraphic','applyItemUserEffect','commandAttack','createLetterSprite','drawDimmedArea','_homeDuration','eHAxU','otbGainInstant','UiNextOffsetX','wPWOl','aaYuP','performActionEndOTB','addBattlerToTurnOrderAtStart','LfZiA','image','RepositionLogWindow','OtbTurnOrderClearEnemyGraphic','_otb_actionBattlersNext','_speed','turnOrderChangeOTB','_backgroundSprite','UiSubjectOffsetX','VRSrU','toUpperCase','_offset','dZHnR','_fadeTarget','makeActionOrdersOTB','OTB','_ogWindowLayerY','Scene_Battle_createActorCommandWindow','BattleManager_selectNextActor','isOTB','format','top','BVgsv','hasSvBattler','otbRemoveUnableTurnOrderSprites','UserAddActionCurrent','ARRAYSTRUCT','_isAppeared','fillRect','Enemies','FJJMS','battlerHue','_previewNext','filter','_actionBattlers','onSkillOk','wTqKy','drawBgImage','OTB_CONVERT_AGI_BUFF_CURRENT_TURN','setSkill','isAppeared','eoLkx','createTurnOrderOTBGraphicType','OpLZM','prototype','scale','RepositionTopHelpX','ScreenBuffer','AZEaK','PreviewScale','boxWidth','exit','updateVisibility','createOrderPreview','TargetAddActionCurrent','removeStatesAuto','singleSkill','ARRAYNUM','finishActorInput','onBattleEndOTB','preEndActionOTB','%1BorderColor','otbCreateNewTurnOrderSprites','commandFight','defaultPosition','_currentActor','repositionLogWindowOTB','BattleManager_endTurn','bitmapHeight','selectNextActorOTB','createActorCommandWindowOTB','includes','UiSubjectText','auto','Game_Battler_performCollapse','select','BgImageFilename','applyGlobalBattleSystemOTB','numActions','loRsz','constructor','qQlLS','match','lineHeight','UiCurrentText','Scene_Battle_commandFight','_unit','FyYjI','Game_Party_addActor','Game_Action_allowRandomSpeed','setItem','updateSelectionEffect','calculateTargetPositions','VNyPn','hyafK','isBattleSystemOTBTurnOrderVisible','DouTw','RandomizeActionTimesOrder','setup','createTurnOrderOTBGraphicFaceIndex','biGaF','20vpKpVt','UserCurrOrder','getChildIndex','_index','vRmUf','EnemyBattlerFontFace','AtOqC','members','IDUYH','NdQHo','qRPZP','addLoadListener','_tempBattler','Game_Action_applyGlobal','vZgnS','JSON','TurnOrderOTBGraphicFaceIndex','UserAddActionNext','TurnOrderOTBGraphicFaceName','changeIconGraphicBitmap','BattleManager_isActiveTpb','xwQtB','onBattleEnd','UiNextText','PostStunInfinitySpeed','_spriteGroupWidth','makeDeepCopy','endBattlerActions','status','hide','updateLetter','mrymN','Game_Action_applyItemUserEffect','otbCalcTargetCurrentOrderChange','resumeTurnOrderSprites','postEndActionOTB','bottom','applyItemTargetEffectOTB','onBattleStartOTB','_surprise','bitmap','processTurnOTB','BattleManager_processTurn','removeSprite','_stateIDs','fyLFj','RCNNt','face','resetFontSettings','ActionBattlersFilter','OXbMe','OTB_ADDED_ACTION_TIMES','Scene_Battle_onItemOk','map','gradientFillRect','ARRAYEVAL','Window_Help_setItem','fontFace','registerCommand','upViJ','initMembers','UserFollOrder','startFade','otbApplyActionTimes','wEhcV','AkcMW','iwmoI','BattleSystemOTB','TargetFollOrder','onBattleStart','UiCurrentOffsetY','changeEnemyGraphicBitmap','isNextOtbSubject','otbShiftNextTurnSpritesToCurrentTurn','needsSelection','_otbTurnOrderGraphicType','BgImageOffsetX','SMYHV','_otbTurnOrderFaceName','addChild','otbUnshiftBattlerToTurnOrders','createBorderSprite','Window_Selectable_select','lWOqt','shiftTurnOrderForSubject','UCDGd','VisuMZ_2_PartySystem','uOgav','_otbTurnOrderFaceIndex','Game_Action_speed','removeUnableTurnOrderSprites','_preemptive','call','createTurnOrderOTBGraphicFaceName','selectNextActor','488425RxzTpj','index','_sourceArray','ConvertAgiDebuffNext','_targetHomeY','nuHpW','addChildToBack','description','xdJVz','commandGuard','zMGBe','iconWidth','anchor','clear','_nextX','TurnOrderOTBGraphicType','rhnlv','makeSpeed','Game_Actor_selectNextCommand','kzTpB','subject','createActorCommandWindow','processUpdateGraphic','loadEnemy','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','uyahL','Conversion','refresh','mainSprite','_windowLayer','initBattleSystemOTB','additionalTargetXAdjustments','Xfbps','FDFOK','jfkoL','refreshTurnOrder','QpzfM','center','_instance','_actorCommandWindow','otbCalcTargetNextOrderChange','createInitialPositions','contentsBack','Scene_Battle_commandGuard','NkdwG','HUoYO','createNewTurnOrderSprites','onTurnEndOTB','isTpb','MoveDistance','removeActionBattlersOTB','enemy','requestUpdateTurnOrders','XtpSF','Game_Battler_onTurnEnd','RepositionTopHelpY','ConvertAgiDebuffCurrent','_scene','onSkillCancel','EnemyBattlerType','actorCommandSingleSkill','UiCurrentOffsetX','sBfJV','removeState','isInfinitySpeedOTB','_fadeSpeed','RegExp','drawText','otbProcessActionCheck','Scene_Battle_onEnemyOk','updateStateTurns','battleMembers','parse','isBattleMember','commandCancelOTB','makeActions','ZdGUA','ZgoGR','_previewContainer','svActorHorzCells','_logWindow','initMembersOTB','trim','%1BgColor2','klFJx','EFFECT_ADD_BUFF','_bgImageSprite','BattleManager_makeActionOrders','EnemyBattlerFaceIndex','makeActionTimes','adjustForPreview','Enemy','Scene_Battle_onItemCancel','setText','UiFontSize','dataId','inputtingAction','otbPreviewOrderChange','clearTurnOrderOTBGraphics','bind','applyGlobal','canChangeOtbTurnOrder','iKsir','createTurnOrderSprites','visible','xDMTs','max','xPdVW','opacity','qxESZ','isEnemy','changeSvActorGraphicBitmap','left','InitialSpeedJS','canInput','DisplayOffsetY','kiAAT','speed','Settings','makeOTBSpeed','_letterSprite','LiTNG','TargetAddActionNext','loadSystem','EVAL','_letter','isTurnBased','isUsingSideviewUiLayout','PreviewOffsetY','addBattlerToTurnOrderAtEnd','padding','moveToPosition','HzgUz','onItemOk','pwBXt','%1-%2','BgDimStyle','_subjectX','startInputOTB','allBattleMembers','tARyU','IskXi','OUWDW','BattleManager_startInput','PreviewOffsetX','gZFYd','createSpriteContainers','_enemyWindow','IKrbX','battlerName','uxkqr','OTB_CONVERT_AGI_DEBUFF_NEXT_TURN','UpdateFrames','_graphicHue','IconSet','endAction','AllowRandomSpeed','getUnitSideSide','removeChild','FtmkQ','DisplayPosition','floor','sort','effects','isAlive','Game_Battler_onBattleStart','_plural','sortContainer','Scene_Battle_onEnemyCancel','mqgbL','_otbTurnOrderIconIndex','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','vJTIO','POHyG','width','OpgqK','otbReturnBattlerToTurnOrders','_partyCommandWindow','FaceName','TargetNextOrder','length','StatusWindow','pgvmB','startActorCommandSelection','_targetHomeX','EmVPC','hCVfV','icon','ConvertSpeedJS','_positionDuration','ARRAYSTR','ZHyxj','54XYxfAs','zBRha','isBattleItemWindowOTB','wPFEA','pUszK','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','checkOpacity','battleEnd','41idnoaK','appear','BattleManager_isTurnBased','SubjectDistance','OEiML','BorderThickness','initialize','attack','containerWindow','transparent','Actor','version','actor','applyItemAddedActionOTB','right','loadSvActor','_otbTurnOrderWindow','SpriteThin','clearOrderPreview','splice','_graphicFaceName','gradient','otbPreviewOrderClear','JHgFu','svactor','containerPosition','isvom','Game_BattlerBase_hide','EnableActionTimes','otbAddBattlerToTurnOrderAtStart','_forceAction','_otb_createdFirstTurnOrders','_currentX','_nextTurn','bitmapWidth','cYYmr','isActor','_positionTargetX','wFCpO','onEnemyCancel','BattleManager_battleSys','faceIndex','calculateTargetIndex','SVihV','vTENV','IconIndex','isSideView','Game_BattlerBase_appear','jTyOg','active','PreviewEnemy','createChildren','Game_Battler_removeState','ConvertAgiBuffCurrent','create','OTB_CONVERT_AGI_BUFF_NEXT_TURN','ActorBattlerIcon','EnemyBattlerIcon','clamp','GetAllIndicies','mBQkN','windowRect','iSoRy','svBattlerName','44AoRbtS','otbCalcUserCurrentOrderChange','createOrderPreviewSprite','WidthBase','Scene_Battle_commandAttack','createGraphicSprite','UXBeu','VisuMZ_3_SideviewBattleUI','12858fqTZnk','_spriteContainer','qvtzS','BattleManager_endAction','currentAction','PLijM','KEAmz','_ogWindowLayerX','remove','Scene_Battle_onSkillOk','uFFPW','createOTBTurnOrderWindow','uJGxc','_phase','WiISS','1367541XZIuOA','createAllWindows','_previewCurrent','Mechanics','cWRMU','removeCurrentSubject','Game_Party_removeActor','applyBattleItemWindowOTB','Scene_Battle_actorCommandSingleSkill','ShowMarkerBg','min','name','LCUah','boxHeight','otbShiftTurnOrderForSubject','ActionBattlersNextFilter','InfinityClamp','onTurnEnd','_helpWindow','makeNextActionOrdersOTB','STR','Visible','NUM','TurnOrderOTBGraphicIconIndex','parameters','ICvUO','kVuam','height','isHorz','ozTCe','update','CwOtS','_isAlive','_tempActor','djjAu','BattleManager_finishActorInput','KhtHG','jiMPB','%1BgColor1','previewOrderByAction','unshift','_currentTurn','KPTvx','SpriteLength','getBorderThickness','_contentsBackSprite','_containerWidth','_hidden','_graphicSprite','isSceneBattle','initHomePositions','otbCalcUserNextOrderChange','selectNextCommand','Scene_Battle_onActorCancel','battler','eDJYF','Game_System_initialize','Adyui','startInput','73381kYrBha','otbRemoveCurrentSubject','EnemyBattlerFontSize','note','2906220YdMTcl','otbAddBattlerToTurnOrderAtEnd'];_0x6bbd=function(){return _0x3cd773;};return _0x6bbd();}function Window_OTB_TurnOrder(){this['initialize'](...arguments);}Window_OTB_TurnOrder[_0x22f2b4(0x1ed)]=Object[_0x22f2b4(0xe3)](Window_Base[_0x22f2b4(0x1ed)]),Window_OTB_TurnOrder[_0x22f2b4(0x1ed)]['constructor']=Window_OTB_TurnOrder,Window_OTB_TurnOrder[_0x22f2b4(0x2fb)]=VisuMZ['BattleSystemOTB'][_0x22f2b4(0x2fb)]['TurnOrder'],Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0xb3)]=function(){const _0x2cd56b=_0x22f2b4,_0x5d66c1=this[_0x2cd56b(0xea)]();this[_0x2cd56b(0x136)](_0x5d66c1),Window_Base[_0x2cd56b(0x1ed)][_0x2cd56b(0xb3)][_0x2cd56b(0x282)](this,_0x5d66c1),this['opacity']=0x0,this[_0x2cd56b(0x1b8)](),this['drawUiText'](),this[_0x2cd56b(0x317)](),this[_0x2cd56b(0x1f5)]();},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0xea)]=function(){const _0x1bb1e1=_0x22f2b4,_0x2fe3bd=Window_OTB_TurnOrder['Settings'],_0x5e5074=SceneManager[_0x1bb1e1(0x2be)]['_statusWindow'][_0x1bb1e1(0x11f)];let _0xc8ecba=Graphics[_0x1bb1e1(0x93)]-_0x2fe3bd['ScreenBuffer']*0x2,_0xc72be8=_0x2fe3bd[_0x1bb1e1(0x12f)]+this[_0x1bb1e1(0x214)](),_0x38595d=_0x2fe3bd[_0x1bb1e1(0x1f0)],_0x1e81e4=0x0;switch(_0x2fe3bd[_0x1bb1e1(0x325)]){case _0x1bb1e1(0x24a):_0x1e81e4=Graphics[_0x1bb1e1(0x11f)]-_0x5e5074-_0x2fe3bd['ScreenBuffer']-_0xc72be8;break;default:_0x1e81e4=_0x2fe3bd['ScreenBuffer'];break;}if(Imported[_0x1bb1e1(0xf4)]&&BattleManager[_0x1bb1e1(0x304)]()){const _0x486e93=VisuMZ[_0x1bb1e1(0x14e)][_0x1bb1e1(0x2fb)][_0x1bb1e1(0x9a)];_0xc8ecba-=_0x486e93[_0x1bb1e1(0xf0)]+_0x486e93[_0x1bb1e1(0x2b6)],_0xc8ecba-=_0x2fe3bd['ScreenBuffer'];}return _0x38595d+=_0x2fe3bd[_0x1bb1e1(0x155)]||0x0,_0x1e81e4+=_0x2fe3bd[_0x1bb1e1(0x2f8)]||0x0,new Rectangle(_0x38595d,_0x1e81e4,_0xc8ecba,_0xc72be8);},Window_OTB_TurnOrder['prototype'][_0x22f2b4(0x136)]=function(_0x122608){const _0x2f035d=_0x22f2b4;this[_0x2f035d(0x9d)]=this[_0x2f035d(0x168)]=_0x122608['x'],this[_0x2f035d(0x289)]=this[_0x2f035d(0x158)]=_0x122608['y'],this['_homeDuration']=0x0;const _0x169cf6=Window_OTB_TurnOrder[_0x2f035d(0x2fb)];this[_0x2f035d(0x23f)]=Math['ceil']((_0x122608['width']-_0x169cf6[_0x2f035d(0xbe)]-_0x169cf6[_0x2f035d(0xb0)]*0x2)/0x2),_0x169cf6[_0x2f035d(0x166)]?_0x2f035d(0x17f)!==_0x2f035d(0x1ca)?(this[_0x2f035d(0x30e)]=_0x122608[_0x2f035d(0x93)]-_0x169cf6[_0x2f035d(0xbe)],this[_0x2f035d(0xcd)]=this['_spriteGroupWidth']+_0x169cf6[_0x2f035d(0xb0)],this[_0x2f035d(0x293)]=0x0):_0x1b1361[_0x2f035d(0x269)][_0x2f035d(0x25e)]['call'](this,_0x3aaea1):_0x2f035d(0x2f2)!==_0x2f035d(0x2f2)?(_0x303955[_0x2f035d(0x1ed)][_0x2f035d(0x122)]['call'](this),this['updateTurnOrders'](),this[_0x2f035d(0x16c)](),this[_0x2f035d(0x1f5)](),this[_0x2f035d(0x32c)]()):(this[_0x2f035d(0x30e)]=0x0,this['_currentX']=_0x169cf6[_0x2f035d(0xbe)]+_0x169cf6[_0x2f035d(0xb0)],this[_0x2f035d(0x293)]=this['_currentX']+_0x169cf6['SubjectDistance']+this['_spriteGroupWidth']);},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)]['updatePadding']=function(){const _0x31783f=_0x22f2b4;this[_0x31783f(0x307)]=0x0;},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0x1b8)]=function(){const _0x51b669=_0x22f2b4,_0x3b417d=Window_OTB_TurnOrder[_0x51b669(0x2fb)];if(_0x3b417d[_0x51b669(0x30d)]===_0x51b669(0xb6))return;if(_0x3b417d['BgDimStyle']===_0x51b669(0x1c2)&&_0x3b417d[_0x51b669(0x20d)]!==''){const _0x34910f=ImageManager['loadSystem'](_0x3b417d[_0x51b669(0x20d)]);_0x34910f[_0x51b669(0x231)](this[_0x51b669(0x1e6)][_0x51b669(0x2e8)](this,_0x34910f));return;};const _0x377279=this[_0x51b669(0x2af)],_0x353cc2=ColorManager[_0x51b669(0x180)](),_0x314c0f=ColorManager['dimColor2'](),_0x2e3f4f=this['_subjectX'],_0x407dfa=_0x3b417d[_0x51b669(0xbe)],_0x5e99ee=0x0,_0x55b208=_0x3b417d[_0x51b669(0x12f)],_0x1c63e5=this[_0x51b669(0xcd)],_0x360966=this['_nextX'],_0x25768a=this[_0x51b669(0x23f)];switch(_0x3b417d[_0x51b669(0x30d)]){case _0x51b669(0xc2):if(_0x3b417d['OrderDirection'])_0x377279['gradientFillRect'](_0x2e3f4f,_0x5e99ee,_0x407dfa/0x2,_0x55b208,_0x314c0f,_0x353cc2,![]),_0x377279[_0x51b669(0x1dd)](_0x2e3f4f+_0x407dfa/0x2,_0x5e99ee,_0x407dfa/0x2,_0x55b208,_0x353cc2),_0x377279[_0x51b669(0x25c)](_0x1c63e5,_0x5e99ee,_0x25768a/0x2,_0x55b208,_0x314c0f,_0x353cc2,![]),_0x377279[_0x51b669(0x1dd)](_0x1c63e5+_0x25768a/0x2,_0x5e99ee,_0x25768a/0x2,_0x55b208,_0x353cc2),_0x377279[_0x51b669(0x25c)](_0x360966,_0x5e99ee,_0x25768a/0x2,_0x55b208,_0x314c0f,_0x353cc2,![]),_0x377279['fillRect'](_0x360966+_0x25768a/0x2,_0x5e99ee,_0x25768a/0x2,_0x55b208,_0x353cc2);else{if(_0x51b669(0x2d9)==='UKjGy'){const _0x195a8a=this[_0x51b669(0x2b8)]()[_0x51b669(0x142)];if(_0x195a8a[_0x51b669(0x213)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x51b669(0x255);else{if(_0x195a8a[_0x51b669(0x213)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return _0x51b669(0xa0);}return _0x339302['Settings'][_0x51b669(0x2c0)];}else _0x377279[_0x51b669(0x1dd)](_0x2e3f4f,_0x5e99ee,_0x407dfa/0x2,_0x55b208,_0x353cc2),_0x377279['gradientFillRect'](_0x2e3f4f+_0x407dfa/0x2,_0x5e99ee,_0x407dfa/0x2,_0x55b208,_0x353cc2,_0x314c0f,![]),_0x377279[_0x51b669(0x1dd)](_0x1c63e5,_0x5e99ee,_0x25768a/0x2,_0x55b208,_0x353cc2),_0x377279[_0x51b669(0x25c)](_0x1c63e5+_0x25768a/0x2,_0x5e99ee,_0x25768a/0x2,_0x55b208,_0x353cc2,_0x314c0f,![]),_0x377279[_0x51b669(0x1dd)](_0x360966,_0x5e99ee,_0x25768a/0x2,_0x55b208,_0x353cc2),_0x377279[_0x51b669(0x25c)](_0x360966+_0x25768a/0x2,_0x5e99ee,_0x25768a/0x2,_0x55b208,_0x353cc2,_0x314c0f,![]);}break;default:_0x377279[_0x51b669(0x1dd)](_0x2e3f4f,_0x5e99ee,_0x407dfa,_0x55b208,_0x353cc2),_0x377279[_0x51b669(0x1dd)](_0x1c63e5,_0x5e99ee,_0x25768a,_0x55b208,_0x353cc2),_0x377279[_0x51b669(0x1dd)](_0x360966,_0x5e99ee,_0x25768a,_0x55b208,_0x353cc2);break;}},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0x1e6)]=function(_0x536430){const _0x36da19=_0x22f2b4;this[_0x36da19(0x2db)]=new Sprite(),this[_0x36da19(0x2db)][_0x36da19(0x24e)]=_0x536430,this[_0x36da19(0x28b)](this[_0x36da19(0x2db)]);const _0x2d8c5c=Window_OTB_TurnOrder['Settings'];this['_bgImageSprite']['x']=_0x2d8c5c[_0x36da19(0x272)],this[_0x36da19(0x2db)]['y']=_0x2d8c5c['BgImageOffsetY'];},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0x16b)]=function(){const _0x30c722=_0x22f2b4;this[_0x30c722(0x165)]['clear'](),this[_0x30c722(0x256)]();const _0x9c36ff=Window_OTB_TurnOrder[_0x30c722(0x2fb)];this['contents']['fontSize']=_0x9c36ff[_0x30c722(0x2e3)];let _0x16d8f0=_0x9c36ff['UiAlignment'];if(_0x16d8f0===_0x30c722(0x20a)){if(_0x30c722(0x309)!==_0x30c722(0x1e5))_0x16d8f0=_0x9c36ff[_0x30c722(0x166)]?_0x30c722(0xbb):_0x30c722(0x2f5);else{if(!_0x2ee504[_0x30c722(0x135)]())return;if(!_0x2bd571[_0x30c722(0x1d4)]())return;if(!this[_0x30c722(0x1a7)]())return;if(!_0x466596)return;if(!_0x35fba6[_0x30c722(0x2ea)]())return 0x0;let _0x5b78ac=this[_0x30c722(0x247)](_0x4358b6),_0x24e139=this[_0x30c722(0x2ad)](_0x461189);_0x5b78ac!==0x0&&_0x33939e[_0x30c722(0x1c7)](_0x67a5d1,-_0x5b78ac,![]),_0x24e139!==0x0&&_0x5cc93d[_0x30c722(0x1c7)](_0x2a6927,-_0x24e139,!![]);}}let _0x5c543b=_0x9c36ff[_0x30c722(0x12f)];if(_0x9c36ff[_0x30c722(0x209)]!==''){if(_0x30c722(0x2a5)===_0x30c722(0x2a5)){const _0x440c9d=this['_subjectX']+_0x9c36ff[_0x30c722(0x1c9)],_0x5a0e76=_0x5c543b+_0x9c36ff['UiSubjectOffsetY'],_0xfaec1d=_0x9c36ff[_0x30c722(0xbe)];this[_0x30c722(0x2c8)](_0x9c36ff[_0x30c722(0x209)],_0x440c9d,_0x5a0e76,_0xfaec1d,_0x30c722(0x2aa));}else{const _0x22a9dc=this[_0x30c722(0x2b8)]()[_0x30c722(0x142)];if(_0x22a9dc[_0x30c722(0x213)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x36d747(_0x3613a7['$2']);return _0x40eefd[_0x30c722(0x2fb)][_0x30c722(0x2dd)];}}if(_0x9c36ff[_0x30c722(0x215)]!==''){if(_0x30c722(0x1cd)!==_0x30c722(0x94)){const _0x59f608=this[_0x30c722(0xcd)]+_0x9c36ff[_0x30c722(0x2c2)],_0x12d86d=_0x5c543b+_0x9c36ff[_0x30c722(0x26c)],_0x41ff3c=this[_0x30c722(0x23f)];this[_0x30c722(0x2c8)](_0x9c36ff[_0x30c722(0x215)],_0x59f608,_0x12d86d,_0x41ff3c,_0x16d8f0);}else{this['_actionBattlers']=this[_0x30c722(0x1c5)],this['otbShiftNextTurnSpritesToCurrentTurn']();const _0x49b4c5=[];_0x49b4c5['push'](..._0x36c0db[_0x30c722(0x2cc)]()),_0x49b4c5[_0x30c722(0x14f)](..._0x2d7c3b[_0x30c722(0x22d)]());for(const _0x2bb8c8 of _0x49b4c5){_0x2bb8c8[_0x30c722(0x296)]();}_0x49b4c5[_0x30c722(0x327)]((_0x45b44b,_0x49fd91)=>_0x49fd91['speed']()-_0x45b44b['speed']()),this['_otb_actionBattlersNext']=_0x49b4c5,this[_0x30c722(0x265)](),this[_0x30c722(0x2b7)](),this[_0x30c722(0x1ff)]();}}if(_0x9c36ff[_0x30c722(0x23d)]!==''){const _0x3cfa2f=this[_0x30c722(0x293)]+_0x9c36ff[_0x30c722(0x1bc)],_0x447401=_0x5c543b+_0x9c36ff[_0x30c722(0x15e)],_0x40b421=this['_spriteGroupWidth'];this['drawText'](_0x9c36ff[_0x30c722(0x23d)],_0x3cfa2f,_0x447401,_0x40b421,_0x16d8f0);}},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0x317)]=function(){const _0x328d97=_0x22f2b4,_0x263a2c=Window_OTB_TurnOrder[_0x328d97(0x2fb)];this['_spriteContainer']=new Sprite(),this[_0x328d97(0x275)](this['_spriteContainer']),this[_0x328d97(0x1a4)]=null,this[_0x328d97(0x12d)]=[],this[_0x328d97(0xce)]=[],this[_0x328d97(0x2d3)]=new Sprite(),this[_0x328d97(0x2d3)]['x']=_0x263a2c[_0x328d97(0x315)],this[_0x328d97(0x2d3)]['y']=_0x263a2c[_0x328d97(0x305)],this[_0x328d97(0x2d3)]['x']-=Math[_0x328d97(0x19c)](_0x263a2c[_0x328d97(0xbe)]*0.5*_0x263a2c[_0x328d97(0x1f2)]),_0x263a2c['OrderDirection']&&(this[_0x328d97(0x2d3)]['x']+=_0x263a2c[_0x328d97(0xbe)]),this[_0x328d97(0x2d3)]['y']-=Math['ceil'](_0x263a2c[_0x328d97(0x12f)]*0.5*_0x263a2c[_0x328d97(0x1f2)]),this[_0x328d97(0x275)](this['_previewContainer']),this[_0x328d97(0x106)]=[],this[_0x328d97(0x1e1)]=[];},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0x122)]=function(){const _0x26527c=_0x22f2b4;Window_Base['prototype'][_0x26527c(0x122)][_0x26527c(0x282)](this),this[_0x26527c(0x194)](),this[_0x26527c(0x16c)](),this[_0x26527c(0x1f5)](),this[_0x26527c(0x32c)]();},Window_OTB_TurnOrder['prototype'][_0x22f2b4(0x2b9)]=function(){const _0x4079ef=_0x22f2b4;this[_0x4079ef(0x192)]=!![];},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)]['updateTurnOrders']=function(){const _0x2aae93=_0x22f2b4;if(!this[_0x2aae93(0x192)])return;this['_requestTurnOrderUpdate']=![];for(const _0x219dc9 of this[_0x2aae93(0x12d)]){if('oaUiW'!==_0x2aae93(0x1ae)){let _0x4b770c=this[_0x2aae93(0xcc)]?0x1:0x2;while(_0x4b770c--){this['makeNextActionOrdersOTB']();}const _0x2f45ed=!this['_otb_createdFirstTurnOrders'];this[_0x2aae93(0xcc)]=!![];}else{if(!_0x219dc9)continue;_0x219dc9[_0x2aae93(0x21d)]();}}for(const _0x29bdd8 of this[_0x2aae93(0xce)]){if(!_0x29bdd8)continue;_0x29bdd8[_0x2aae93(0x21d)]();}},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0x16c)]=function(){const _0x17d902=_0x22f2b4,_0x2d11db=Window_OTB_TurnOrder[_0x17d902(0x2fb)];if(_0x2d11db['DisplayPosition']!==_0x17d902(0x1d6))return;if(!_0x2d11db[_0x17d902(0x18e)])return;const _0x47bab6=SceneManager[_0x17d902(0x2be)][_0x17d902(0x116)];if(!_0x47bab6)return;if(_0x47bab6[_0x17d902(0x2ed)])this['x']=this[_0x17d902(0x168)]+(_0x2d11db[_0x17d902(0x1ef)]||0x0),this['y']=this['_homeY']+(_0x2d11db[_0x17d902(0x2bc)]||0x0);else{if('VwUse'==='VwUse')this['x']=this['_homeX'],this['y']=this[_0x17d902(0x158)];else{if(!_0x6251e1[_0x17d902(0x1d4)]())return;this[_0x17d902(0x181)]=this[_0x17d902(0x181)]||0x0,this[_0x17d902(0x181)]++;if(this[_0x17d902(0x20f)]()>0x0&&this===_0x538640[_0x17d902(0x1a4)]){const _0x32808e=_0x113ba4[_0x17d902(0x171)];if(_0x32808e['length']>0x0&&_0x32808e[0x0]!==this)return;const _0x4a6b8f=this[_0x17d902(0x13a)]();if(_0x4a6b8f&&_0x37902a[_0x17d902(0x26e)](this))_0x4a6b8f[_0x17d902(0x162)]();}}}const _0x2498fd=SceneManager[_0x17d902(0x2be)]['_windowLayer'];Window_OTB_TurnOrder[_0x17d902(0xfc)]===undefined&&(_0x17d902(0x145)!==_0x17d902(0x145)?this[_0x17d902(0x1a4)]=this[_0x17d902(0x1a3)]():Window_OTB_TurnOrder['_ogWindowLayerX']=Math[_0x17d902(0x19e)]((Graphics[_0x17d902(0x93)]-Math[_0x17d902(0x10e)](Graphics[_0x17d902(0x1f3)],_0x2498fd[_0x17d902(0x93)]))/0x2));Window_OTB_TurnOrder[_0x17d902(0x1d1)]===undefined&&(Window_OTB_TurnOrder[_0x17d902(0x1d1)]=Math['round']((Graphics[_0x17d902(0x11f)]-Math[_0x17d902(0x10e)](Graphics[_0x17d902(0x111)],_0x2498fd[_0x17d902(0x11f)]))/0x2));;this['x']+=_0x2498fd['x']-Window_OTB_TurnOrder[_0x17d902(0xfc)],this['y']+=_0x2498fd['y']-Window_OTB_TurnOrder[_0x17d902(0x1d1)];},Window_OTB_TurnOrder['prototype']['updateVisibility']=function(){const _0x4e2884=_0x22f2b4;this['visible']=$gameSystem[_0x4e2884(0x220)]();if(BattleManager['_phase']===_0x4e2884(0xac)){if(_0x4e2884(0x13b)!==_0x4e2884(0x13b))_0x44c4ba[_0x4e2884(0x208)](this[_0x4e2884(0x299)]())&&(_0x5a10bb+=_0x22230c(_0x179fc6['$1']));else{if(!this[_0x4e2884(0x2c6)]){if('iJlXv'!==_0x4e2884(0x128)){const _0x36a4e5=Window_OTB_TurnOrder['Settings'];this[_0x4e2884(0x2c6)]=Math['ceil'](0xff/(_0x36a4e5[_0x4e2884(0x31d)]||0x1));}else _0x51da13[_0x4e2884(0xc3)](),_0x4a803a[_0x4e2884(0x269)][_0x4e2884(0xf1)][_0x4e2884(0x282)](this);}this['opacity']-=this[_0x4e2884(0x2c6)],this['contentsOpacity']-=this['_fadeSpeed'],this[_0x4e2884(0x131)][_0x4e2884(0x2f1)]-=this['_fadeSpeed'];}}},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)]['sortContainer']=function(){const _0x36a4eb=_0x22f2b4;if(!this[_0x36a4eb(0xf6)])return;const _0x18c3c2=Window_OTB_TurnOrder[_0x36a4eb(0x2fb)],_0xf7c083=_0x18c3c2[_0x36a4eb(0x166)];if(_0xf7c083){if(_0x36a4eb(0xa4)!=='ZHyxj'){const _0x54d19e=this[_0x36a4eb(0xb5)](),_0xaea725=this[_0x36a4eb(0x287)]===_0x54d19e[_0x36a4eb(0xce)]?!![]:![],_0x20ed1a=_0xaea725?_0x20f628[_0x36a4eb(0x1c5)]:_0x175e45[_0x36a4eb(0x1e3)];let _0x4271f6=0x0,_0x50d3fb=_0x20ed1a[_0x36a4eb(0x99)]-0x1;_0xaea725&&(_0x4271f6=_0x1150ea['max'](0x0,_0x58182e[_0x36a4eb(0x269)][_0x36a4eb(0x177)](_0x20ed1a)));let _0x4d3436=_0x2d1481[_0x36a4eb(0x1ed)]['calculateTargetIndex'][_0x36a4eb(0x282)](this);return _0x4d3436+=this[_0x36a4eb(0x1cc)],_0x4d3436[_0x36a4eb(0xe7)](_0x4271f6,_0x50d3fb);}else this['_spriteContainer'][_0x36a4eb(0x184)][_0x36a4eb(0x327)]((_0x5c1daf,_0x11e712)=>_0x5c1daf['x']-_0x11e712['x']);}else this['_spriteContainer'][_0x36a4eb(0x184)][_0x36a4eb(0x327)]((_0x167c3c,_0x35ae4e)=>_0x35ae4e['x']-_0x167c3c['x']);},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0x251)]=function(_0x117de1){const _0x14ae43=_0x22f2b4;if(!_0x117de1)return;_0x117de1[_0x14ae43(0x287)]&&('bAAfw'!=='uDaTZ'?_0x117de1[_0x14ae43(0x287)][_0x14ae43(0xfd)](_0x117de1):(this['x']=this['_positionTargetX'],this['y']=this[_0x14ae43(0x19d)]));const _0x1b9076=Window_OTB_TurnOrder[_0x14ae43(0x2fb)],_0x1be401=0x3e8/0x3c*_0x1b9076[_0x14ae43(0x31d)]+0x1f4;_0x117de1[_0x14ae43(0x264)](0x0),setTimeout(this[_0x14ae43(0x154)]['bind'](this,_0x117de1),_0x1be401);},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0x154)]=function(_0x5b6550){const _0x4d89ef=_0x22f2b4;_0x5b6550[_0x4d89ef(0x287)]&&('eOWym'!=='eOWym'?this[_0x4d89ef(0x27e)]=this[_0x4d89ef(0x224)]():_0x5b6550[_0x4d89ef(0x287)][_0x4d89ef(0xfd)](_0x5b6550)),this[_0x4d89ef(0xf6)][_0x4d89ef(0x323)](_0x5b6550),this['_previewContainer']['removeChild'](_0x5b6550);},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0x109)]=function(){const _0x4c2c51=_0x22f2b4;if(!this['_subject'])return;this[_0x4c2c51(0x251)](this[_0x4c2c51(0x1a4)]);},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0x1ad)]=function(){const _0x3f54c8=_0x22f2b4;while(this[_0x3f54c8(0x12d)][_0x3f54c8(0x99)]){const _0x4ef45a=this['_currentTurn']['shift']();_0x4ef45a[_0x3f54c8(0x264)](0x0);}while(this[_0x3f54c8(0xce)][_0x3f54c8(0x99)]){const _0x7d4678=this[_0x3f54c8(0xce)][_0x3f54c8(0x179)]();if(!_0x7d4678)continue;this[_0x3f54c8(0x12d)][_0x3f54c8(0x14f)](_0x7d4678);}for(const _0x57212d of this[_0x3f54c8(0x12d)]){if(_0x3f54c8(0x16a)!==_0x3f54c8(0x15a)){if(!_0x57212d)continue;_0x57212d['changeSourceArray'](this[_0x3f54c8(0x12d)]);}else{const _0x5992fc=this[_0x3f54c8(0x13a)]();if(!_0x5992fc)return this['defaultPosition']();if(_0x5992fc===_0x397c2f['_subject'])return 0x0;if(_0x17b9fb['_actionBattlers']['includes'](_0x5992fc)){const _0x346e3a=_0x8f48af['_actionBattlers'][_0x3f54c8(0x1a8)](_0x5992fc)+0x1;return _0x346e3a;}return this[_0x3f54c8(0x201)]();}}},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0x2ec)]=function(_0x12799a,_0xe5f1c9){const _0x3d9641=_0x22f2b4,_0x9f8123=_0x12799a===BattleManager[_0x3d9641(0x1e3)]?this['_currentTurn']:this[_0x3d9641(0xce)],_0x469c33={};for(const _0x1cc469 of _0x12799a){if(_0x3d9641(0x1df)===_0x3d9641(0x1df)){const _0x1214a1=_0x3d9641(0x30c)[_0x3d9641(0x1d5)](_0x1cc469[_0x3d9641(0xd1)]()?'actor':_0x3d9641(0x2b8),_0x1cc469[_0x3d9641(0x286)]());_0x469c33[_0x1214a1]=_0x469c33[_0x1214a1]||0x0;const _0x157376=_0x469c33[_0x1214a1]++,_0x2c7aa2=new Sprite_OTB_TurnOrder_Battler(_0x1cc469,_0x157376,_0x9f8123);this[_0x3d9641(0xf6)][_0x3d9641(0x275)](_0x2c7aa2),_0x9f8123[_0x3d9641(0x14f)](_0x2c7aa2);}else return _0x19e890[_0x3d9641(0x269)][_0x3d9641(0x21a)]['call'](this);}for(const _0x3b82a1 of _0x9f8123){if('VNyPn'!==_0x3d9641(0x21e))_0x569e28+=_0x670a7(_0x4496d2['$1']);else{if(!_0x3b82a1)continue;_0x3b82a1[_0x3d9641(0x264)](0xff),_0x3b82a1[_0x3d9641(0x21d)](),_0xe5f1c9&&(_0x3b82a1[_0x3d9641(0x2f1)]=0xff,_0x3b82a1['x']=_0x3b82a1[_0x3d9641(0xd2)],_0x3b82a1[_0x3d9641(0xa2)]=0x0);}}},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0x2b3)]=function(){const _0x533d9d=_0x22f2b4,_0x16441c=BattleManager['_otb_actionBattlersNext'];this[_0x533d9d(0x2ec)](_0x16441c);},Window_OTB_TurnOrder['prototype']['shiftTurnOrderForSubject']=function(_0x2780bf,_0x5497dc){const _0x4a228b=_0x22f2b4;this[_0x4a228b(0x109)]();for(const _0x1ceeec of this[_0x4a228b(0x12d)]){if(!_0x1ceeec)continue;_0x1ceeec[_0x4a228b(0x13a)]()===_0x2780bf&&(_0x1ceeec[_0x4a228b(0x2ab)]=_0x1ceeec[_0x4a228b(0x2ab)]||0x0,_0x1ceeec['_instance']--);}const _0x42f69d=this['_currentTurn']['findIndex'](_0x3e629f=>_0x3e629f[_0x4a228b(0x13a)]()===_0x2780bf);if(this[_0x4a228b(0x12d)][_0x42f69d])this[_0x4a228b(0x1a4)]=this['_currentTurn'][_0x42f69d],this['_currentTurn'][_0x42f69d][_0x4a228b(0x21d)](),this[_0x4a228b(0x12d)][_0x4a228b(0xc0)](_0x42f69d,0x1);else{if(_0x2780bf){const _0x5b1a9=new Sprite_OTB_TurnOrder_Battler(_0x2780bf,-0x1,null);this[_0x4a228b(0xf6)]['addChild'](_0x5b1a9),this[_0x4a228b(0x1a4)]=_0x5b1a9,_0x5b1a9[_0x4a228b(0x264)](0xff),_0x5b1a9[_0x4a228b(0xa2)]=0x258,_0x5b1a9['x']=this[_0x4a228b(0x30e)],_0x5b1a9[_0x4a228b(0xd2)]=this['_subjectX'];if(_0x5497dc){if('TpARi'!==_0x4a228b(0x254))_0x5b1a9[_0x4a228b(0x2f1)]=0xff;else return this[_0x4a228b(0x29b)]();}}}for(const _0x3b0c43 of this['_currentTurn']){if(_0x4a228b(0x2f9)===_0x4a228b(0xfa))return this['_unit']?this[_0x4a228b(0x217)][_0x4a228b(0x22d)]()[this['_index']]:null;else{if(!_0x3b0c43)continue;_0x3b0c43[_0x4a228b(0x21d)]();}}},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0x280)]=function(){const _0x189781=_0x22f2b4;for(const _0x3e0f90 of this['_currentTurn']){if(_0x189781(0x28d)===_0x189781(0x23b)){const _0x264446=![],_0x5a84a9=_0x49a0eb(_0x453de7['$1'])||0x0;this[_0x189781(0x299)]()['otbAddActions'](_0x5a84a9,_0x264446);}else{if(!_0x3e0f90)continue;const _0x19ee00=_0x3e0f90['battler']();if(BattleManager['_actionBattlers'][_0x189781(0x208)](_0x19ee00))continue;this['removeSprite'](_0x3e0f90);}}for(const _0x1f62cc of this[_0x189781(0xce)]){if(_0x189781(0x267)!==_0x189781(0x267))return;else{if(!_0x1f62cc)continue;const _0x53542d=_0x1f62cc[_0x189781(0x13a)]();if(BattleManager[_0x189781(0x1c5)][_0x189781(0x208)](_0x53542d))continue;this['removeSprite'](_0x1f62cc);}}},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0x306)]=function(_0x34fe8f,_0x193c7c){const _0xd257c9=_0x22f2b4,_0x5f235e=_0x193c7c===BattleManager[_0xd257c9(0x1e3)]?this[_0xd257c9(0x12d)]:this[_0xd257c9(0xce)];if(!_0x5f235e)return;const _0x5c61aa=VisuMZ[_0xd257c9(0x269)]['GetAllIndicies'](_0x34fe8f,_0x193c7c),_0x52e3fd=_0x5c61aa[_0xd257c9(0x99)]-0x1,_0x405542=new Sprite_OTB_TurnOrder_Battler(_0x34fe8f,_0x52e3fd,_0x5f235e);this['_spriteContainer'][_0xd257c9(0x275)](_0x405542),_0x5f235e['push'](_0x405542),_0x405542[_0xd257c9(0x264)](0xff),this[_0xd257c9(0x2b9)]();},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0x1c0)]=function(_0x238ffa,_0x1e6e3c){const _0xa5665d=_0x22f2b4,_0x43c35a=_0x1e6e3c===BattleManager[_0xa5665d(0x1e3)]?this[_0xa5665d(0x12d)]:this[_0xa5665d(0xce)];if(!_0x43c35a)return;for(const _0x3ec414 of _0x43c35a){if(_0xa5665d(0xb1)===_0xa5665d(0xb1)){if(!_0x3ec414)continue;_0x3ec414[_0xa5665d(0x13a)]()===_0x238ffa&&(_0x3ec414['_instance']=_0x3ec414['_instance']||0x0,_0x3ec414[_0xa5665d(0x2ab)]++);}else{const _0x5c6cdc=[],_0x453bb8=_0x5c8c7d[_0xa5665d(0x99)];for(let _0x2416d4=0x0;_0x2416d4<_0x453bb8;_0x2416d4++){if(_0x24dc1e[_0x2416d4]===_0x3c8f60)_0x5c6cdc[_0xa5665d(0x14f)](_0x2416d4);}return _0x5c6cdc;}}const _0x31e389=0x0,_0x43e8d6=new Sprite_OTB_TurnOrder_Battler(_0x238ffa,_0x31e389,_0x43c35a);this['_spriteContainer'][_0xa5665d(0x275)](_0x43e8d6),_0x43c35a[_0xa5665d(0x12c)](_0x43e8d6),_0x43e8d6['startFade'](0xff),_0x43e8d6[_0xa5665d(0xa2)]=0x258,_0x43e8d6['x']=this[_0xa5665d(0x30e)],this[_0xa5665d(0x2b9)]();},Window_OTB_TurnOrder['prototype'][_0x22f2b4(0x248)]=function(){const _0x498b55=_0x22f2b4;this[_0x498b55(0x2ec)](BattleManager[_0x498b55(0x1e3)],!![]),this[_0x498b55(0x2ec)](BattleManager[_0x498b55(0x1c5)],!![]),this[_0x498b55(0x27a)](BattleManager[_0x498b55(0x1a4)],!![]),this[_0x498b55(0x32c)]();},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0x12b)]=function(_0x1207e9){const _0x4ecda1=_0x22f2b4;this[_0x4ecda1(0xbf)](),_0x1207e9&&_0x1207e9[_0x4ecda1(0x1a7)]()!==null&&this[_0x4ecda1(0x1f6)](_0x1207e9);},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0xbf)]=function(){const _0x1c017d=_0x22f2b4;for(const _0x1db4b3 of this[_0x1c017d(0x2d3)]['children']){if(!_0x1db4b3)continue;this['removeSprite'](_0x1db4b3);}},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0x1f6)]=function(_0x197eae){const _0x3653e8=_0x22f2b4,_0x4b15b6=_0x197eae[_0x3653e8(0x299)](),_0x59c79c=_0x197eae[_0x3653e8(0xee)](),_0x2181b4=_0x197eae[_0x3653e8(0x137)]();if(_0x59c79c!==0x0){if(_0x3653e8(0x9e)===_0x3653e8(0x108)){this[_0x3653e8(0x2db)]=new _0x5eee4e(),this['_bgImageSprite'][_0x3653e8(0x24e)]=_0x20a704,this[_0x3653e8(0x28b)](this[_0x3653e8(0x2db)]);const _0x23b71f=_0x1302c5[_0x3653e8(0x2fb)];this[_0x3653e8(0x2db)]['x']=_0x23b71f[_0x3653e8(0x272)],this[_0x3653e8(0x2db)]['y']=_0x23b71f[_0x3653e8(0x190)];}else this['createOrderPreviewSprite'](_0x4b15b6,![],_0x59c79c);}if(_0x2181b4!==0x0){if('pgvmB'!==_0x3653e8(0x9b)){if(!this[_0x3653e8(0x18d)]())return;_0x49332a?_0x993254['otbAddBattlerToTurnOrderAtEnd'](this,_0x333fbe,_0x51e0d6[_0x3653e8(0x1e3)]):_0x152c8f[_0x3653e8(0x144)](this,_0x573c64,_0x52e8c0[_0x3653e8(0x1c5)]);}else this[_0x3653e8(0xef)](_0x4b15b6,!![],_0x2181b4);}if(!_0x197eae[_0x3653e8(0x270)]())return;const _0x116449=SceneManager[_0x3653e8(0x2be)]['_actorWindow'],_0x33dbb5=SceneManager['_scene'][_0x3653e8(0x318)];let _0x22d157=null;if(_0x116449&&_0x116449[_0x3653e8(0xde)]){if(_0x3653e8(0x13d)===_0x3653e8(0x173))return this[_0x3653e8(0x19a)]===_0x3f925a&&this[_0x3653e8(0x2a3)](),this[_0x3653e8(0x19a)];else _0x22d157=_0x116449[_0x3653e8(0xb9)](_0x116449['index']());}else _0x33dbb5&&_0x33dbb5[_0x3653e8(0xde)]&&(_0x22d157=_0x33dbb5[_0x3653e8(0x2b8)]());if(!_0x22d157)return;const _0x24fbd4=_0x197eae[_0x3653e8(0x247)](_0x22d157),_0x1ae4bc=_0x197eae[_0x3653e8(0x2ad)](_0x22d157);_0x24fbd4!==0x0&&this[_0x3653e8(0xef)](_0x22d157,![],_0x24fbd4),_0x1ae4bc!==0x0&&this[_0x3653e8(0xef)](_0x22d157,!![],_0x1ae4bc);},Window_OTB_TurnOrder[_0x22f2b4(0x1ed)][_0x22f2b4(0xef)]=function(_0x129106,_0x40254e,_0x541d19){const _0x2f9a2a=_0x22f2b4;if(!_0x129106)return;if(_0x541d19===0x0)return;const _0x276fdd=_0x40254e?BattleManager[_0x2f9a2a(0x1c5)]:BattleManager[_0x2f9a2a(0x1e3)],_0x5b471f=VisuMZ[_0x2f9a2a(0x269)][_0x2f9a2a(0xe8)](_0x129106,_0x276fdd),_0x321d7f=_0x40254e?this[_0x2f9a2a(0xce)]:this['_currentTurn'],_0x120883=_0x40254e?this[_0x2f9a2a(0x1e1)]:this[_0x2f9a2a(0x106)];if(_0x5b471f['length']<=0x0)return;for(let _0x4eba06=0x0;_0x4eba06<_0x5b471f['length'];_0x4eba06++){if(_0x2f9a2a(0x11d)===_0x2f9a2a(0x29e)){if(_0x33ae56['OTB_CONVERT_AGI_DEBUFF_NEXT_TURN'])_0x2b15be+=0x1;}else{const _0x3b7712=new Sprite_OTB_TurnOrder_Preview(_0x129106,_0x4eba06,_0x321d7f,_0x541d19);this[_0x2f9a2a(0x2d3)][_0x2f9a2a(0x275)](_0x3b7712),_0x120883[_0x2f9a2a(0x14f)](_0x3b7712),_0x3b7712['calculateTargetPositions'](),_0x3b7712[_0x2f9a2a(0x264)](0xff);}}};