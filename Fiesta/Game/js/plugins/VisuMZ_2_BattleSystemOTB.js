//=============================================================================
// VisuStella MZ - Battle System - OTB - Order Turn Battle
// VisuMZ_2_BattleSystemOTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemOTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemOTB = VisuMZ.BattleSystemOTB || {};
VisuMZ.BattleSystemOTB.version = 1.16;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.16] [BattleSystemOTB]
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
 * Force Actions
 * 
 * Due to how OTB behaves, Force Actions have be adjusted to fit the battle
 * system. With other battle systems, force actions are added into a hidden
 * queue that would act upon after the current battler finishes his/her current
 * action. The new changes made with force actions is that they now appear on
 * the queue visibly.
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
 * Version 1.17: November 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where the <OTB Target Follow Turn: +x> and similar notetags
 *    altered the following turn regardless of the presence of the target in 
 *    current turn order. Fix made by Olivia.
 * 
 * Version 1.16: September 19, 2024
 * * Compatibility Update!
 * ** Added better compatibility with Auto Skill Triggers. Update by Arisu.
 * 
 * Version 1.15: May 16, 2024
 * * Feature Update!
 * ** Direct removal of stun states will restore actions for battlers for
 *    current turns and follow up turns. Update made by Olivia.
 * 
 * Version 1.14: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused turn order glitches with Action Times+ that
 *    aren't at 100% value. Fix made by Olivia.
 * ** Fixed a bug that caused added Action Times+ to not trigger on actors that
 *    have already exhausted their current turns if raised due to a state.
 *    Fix made by Olivia.
 * 
 * Version 1.13: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug where the Forced Action of a battler is not used properly.
 *    Fix made by Arisu.
 * 
 * Version 1.12: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the OTB Turn Order faces and icons to not change
 *    properly for actors and enemies.
 * 
 * Version 1.10: July 7, 2022
 * * Feature Update!
 * ** When the "Recover All" event command revives a dead unit, that revived
 *    unit can gain actions back if all other conditions are met. Update made
 *    by Olivia.
 * 
 * Version 1.09: June 2, 2022
 * * Documentation Update!
 * ** Added "Force Actions" to "Major Updates" section.
 * *** Due to how OTB behaves, Force Actions have be adjusted to fit the battle
 *     system. With other battle systems, force actions are added into a hidden
 *     queue that would act upon after the current battler finishes his/her
 *     current action. The new changes made with force actions is that they now
 *     appear on the queue visibly.
 * * Bug Fixes!
 * ** Fixed a bug that caused Forced Actions to not work properly while in OTB.
 *    Changes made to Forced Actions will now insert new actions at the front
 *    of the current action queue. Fix made by Olivia.
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

const _0x262bda=_0x255f;function _0x255f(_0x2f51ab,_0x5e3ea0){const _0x3bc23f=_0x3bc2();return _0x255f=function(_0x255f49,_0x6d48f5){_0x255f49=_0x255f49-0x84;let _0x43a4a4=_0x3bc23f[_0x255f49];return _0x43a4a4;},_0x255f(_0x2f51ab,_0x5e3ea0);}(function(_0x2b1da1,_0x5302e6){const _0x221a92=_0x255f,_0x29f32e=_0x2b1da1();while(!![]){try{const _0x2b6eee=-parseInt(_0x221a92(0x215))/0x1+-parseInt(_0x221a92(0x12b))/0x2*(-parseInt(_0x221a92(0x26b))/0x3)+-parseInt(_0x221a92(0x8d))/0x4+parseInt(_0x221a92(0x152))/0x5*(parseInt(_0x221a92(0x143))/0x6)+-parseInt(_0x221a92(0x161))/0x7*(-parseInt(_0x221a92(0x1bc))/0x8)+parseInt(_0x221a92(0x21b))/0x9*(-parseInt(_0x221a92(0xbb))/0xa)+-parseInt(_0x221a92(0x203))/0xb*(parseInt(_0x221a92(0x27b))/0xc);if(_0x2b6eee===_0x5302e6)break;else _0x29f32e['push'](_0x29f32e['shift']());}catch(_0x3a5712){_0x29f32e['push'](_0x29f32e['shift']());}}}(_0x3bc2,0x80ac9));var label=_0x262bda(0xf6),tier=tier||0x0,dependencies=[_0x262bda(0x1d1),_0x262bda(0x1ef)],pluginData=$plugins[_0x262bda(0x28b)](function(_0x4985f9){const _0x328aaf=_0x262bda;return _0x4985f9['status']&&_0x4985f9[_0x328aaf(0x1c9)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x262bda(0x251)]||{},VisuMZ['ConvertParams']=function(_0x4b8cee,_0x2954c0){const _0xd51c3e=_0x262bda;for(const _0x9f2505 in _0x2954c0){if(_0x9f2505[_0xd51c3e(0x1f3)](/(.*):(.*)/i)){const _0x416f83=String(RegExp['$1']),_0x16f3f0=String(RegExp['$2'])[_0xd51c3e(0x1ff)]()[_0xd51c3e(0x22f)]();let _0x3579d6,_0xfed5f8,_0x1e7577;switch(_0x16f3f0){case'NUM':_0x3579d6=_0x2954c0[_0x9f2505]!==''?Number(_0x2954c0[_0x9f2505]):0x0;break;case _0xd51c3e(0x1c5):_0xfed5f8=_0x2954c0[_0x9f2505]!==''?JSON[_0xd51c3e(0xd7)](_0x2954c0[_0x9f2505]):[],_0x3579d6=_0xfed5f8['map'](_0xeddc7b=>Number(_0xeddc7b));break;case _0xd51c3e(0xad):_0x3579d6=_0x2954c0[_0x9f2505]!==''?eval(_0x2954c0[_0x9f2505]):null;break;case _0xd51c3e(0x13e):_0xfed5f8=_0x2954c0[_0x9f2505]!==''?JSON['parse'](_0x2954c0[_0x9f2505]):[],_0x3579d6=_0xfed5f8['map'](_0x1b7fab=>eval(_0x1b7fab));break;case _0xd51c3e(0x24c):_0x3579d6=_0x2954c0[_0x9f2505]!==''?JSON[_0xd51c3e(0xd7)](_0x2954c0[_0x9f2505]):'';break;case'ARRAYJSON':_0xfed5f8=_0x2954c0[_0x9f2505]!==''?JSON[_0xd51c3e(0xd7)](_0x2954c0[_0x9f2505]):[],_0x3579d6=_0xfed5f8['map'](_0x46e10f=>JSON['parse'](_0x46e10f));break;case _0xd51c3e(0x1a3):_0x3579d6=_0x2954c0[_0x9f2505]!==''?new Function(JSON[_0xd51c3e(0xd7)](_0x2954c0[_0x9f2505])):new Function(_0xd51c3e(0x13c));break;case _0xd51c3e(0x1c8):_0xfed5f8=_0x2954c0[_0x9f2505]!==''?JSON[_0xd51c3e(0xd7)](_0x2954c0[_0x9f2505]):[],_0x3579d6=_0xfed5f8[_0xd51c3e(0x289)](_0x22c4f5=>new Function(JSON[_0xd51c3e(0xd7)](_0x22c4f5)));break;case'STR':_0x3579d6=_0x2954c0[_0x9f2505]!==''?String(_0x2954c0[_0x9f2505]):'';break;case'ARRAYSTR':_0xfed5f8=_0x2954c0[_0x9f2505]!==''?JSON['parse'](_0x2954c0[_0x9f2505]):[],_0x3579d6=_0xfed5f8['map'](_0x5dc43a=>String(_0x5dc43a));break;case _0xd51c3e(0x254):_0x1e7577=_0x2954c0[_0x9f2505]!==''?JSON['parse'](_0x2954c0[_0x9f2505]):{},_0x3579d6=VisuMZ[_0xd51c3e(0x184)]({},_0x1e7577);break;case _0xd51c3e(0xb6):_0xfed5f8=_0x2954c0[_0x9f2505]!==''?JSON[_0xd51c3e(0xd7)](_0x2954c0[_0x9f2505]):[],_0x3579d6=_0xfed5f8['map'](_0x19c2c3=>VisuMZ[_0xd51c3e(0x184)]({},JSON[_0xd51c3e(0xd7)](_0x19c2c3)));break;default:continue;}_0x4b8cee[_0x416f83]=_0x3579d6;}}return _0x4b8cee;},(_0x4ab3c2=>{const _0x5e1f7d=_0x262bda,_0x26e838=_0x4ab3c2['name'];for(const _0xdf8654 of dependencies){if(!Imported[_0xdf8654]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x5e1f7d(0x104)](_0x26e838,_0xdf8654)),SceneManager[_0x5e1f7d(0x26c)]();break;}}const _0x5acc37=_0x4ab3c2[_0x5e1f7d(0x1c9)];if(_0x5acc37[_0x5e1f7d(0x1f3)](/\[Version[ ](.*?)\]/i)){const _0x39c426=Number(RegExp['$1']);_0x39c426!==VisuMZ[label][_0x5e1f7d(0x1b0)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x5e1f7d(0x104)](_0x26e838,_0x39c426)),SceneManager[_0x5e1f7d(0x26c)]());}if(_0x5acc37[_0x5e1f7d(0x1f3)](/\[Tier[ ](\d+)\]/i)){const _0x860740=Number(RegExp['$1']);_0x860740<tier?(alert(_0x5e1f7d(0x25c)[_0x5e1f7d(0x104)](_0x26e838,_0x860740,tier)),SceneManager[_0x5e1f7d(0x26c)]()):tier=Math[_0x5e1f7d(0x1e3)](_0x860740,tier);}VisuMZ[_0x5e1f7d(0x184)](VisuMZ[label][_0x5e1f7d(0x251)],_0x4ab3c2['parameters']);})(pluginData),PluginManager[_0x262bda(0x158)](pluginData[_0x262bda(0x212)],'OtbTurnOrderActorIcon',_0x195925=>{const _0x5a6d10=_0x262bda;VisuMZ[_0x5a6d10(0x184)](_0x195925,_0x195925);const _0xfd0254=_0x195925[_0x5a6d10(0xb2)],_0x3c45d2=_0x195925['IconIndex'];for(const _0x3a700e of _0xfd0254){const _0x26deb9=$gameActors[_0x5a6d10(0x28d)](_0x3a700e);if(!_0x26deb9)continue;_0x26deb9[_0x5a6d10(0x267)]=_0x5a6d10(0x26d),_0x26deb9[_0x5a6d10(0x1ab)]=_0x3c45d2;}}),PluginManager[_0x262bda(0x158)](pluginData[_0x262bda(0x212)],'OtbTurnOrderActorFace',_0x5c6c81=>{const _0x4e14ba=_0x262bda;VisuMZ[_0x4e14ba(0x184)](_0x5c6c81,_0x5c6c81);const _0x852e6=_0x5c6c81['Actors'],_0x143fc9=_0x5c6c81[_0x4e14ba(0x2a8)],_0x14c02b=_0x5c6c81[_0x4e14ba(0x2a3)];for(const _0x10f84f of _0x852e6){const _0x39a0ae=$gameActors[_0x4e14ba(0x28d)](_0x10f84f);if(!_0x39a0ae)continue;_0x39a0ae[_0x4e14ba(0x267)]=_0x4e14ba(0x2b2),_0x39a0ae[_0x4e14ba(0xf0)]=_0x143fc9,_0x39a0ae['_otbTurnOrderFaceIndex']=_0x14c02b;}}),PluginManager[_0x262bda(0x158)](pluginData[_0x262bda(0x212)],_0x262bda(0x27a),_0x3ad577=>{const _0x48f06a=_0x262bda;VisuMZ[_0x48f06a(0x184)](_0x3ad577,_0x3ad577);const _0x377b60=_0x3ad577[_0x48f06a(0xb2)];for(const _0x370a33 of _0x377b60){const _0x4535cd=$gameActors['actor'](_0x370a33);if(!_0x4535cd)continue;_0x4535cd[_0x48f06a(0xa3)]();}}),PluginManager[_0x262bda(0x158)](pluginData[_0x262bda(0x212)],_0x262bda(0x13d),_0x2a84b0=>{const _0x2a896b=_0x262bda;VisuMZ[_0x2a896b(0x184)](_0x2a84b0,_0x2a84b0);const _0x1ffb37=_0x2a84b0['Enemies'],_0x5aca60=_0x2a84b0[_0x2a896b(0xcc)];for(const _0x4fd39f of _0x1ffb37){const _0x57b2e1=$gameTroop[_0x2a896b(0x99)]()[_0x4fd39f];if(!_0x57b2e1)continue;_0x57b2e1[_0x2a896b(0x267)]=_0x2a896b(0x26d),_0x57b2e1[_0x2a896b(0x1ab)]=_0x5aca60;}}),PluginManager['registerCommand'](pluginData[_0x262bda(0x212)],_0x262bda(0x291),_0x51193d=>{const _0x500515=_0x262bda;VisuMZ[_0x500515(0x184)](_0x51193d,_0x51193d);const _0x1ed13f=_0x51193d[_0x500515(0x139)],_0x43ca69=_0x51193d['FaceName'],_0x201fcb=_0x51193d[_0x500515(0x2a3)];for(const _0x139269 of _0x1ed13f){const _0x25be7c=$gameTroop[_0x500515(0x99)]()[_0x139269];if(!_0x25be7c)continue;_0x25be7c[_0x500515(0x267)]=_0x500515(0x2b2),_0x25be7c['_otbTurnOrderFaceName']=_0x43ca69,_0x25be7c[_0x500515(0x297)]=_0x201fcb;}}),PluginManager['registerCommand'](pluginData['name'],_0x262bda(0x110),_0x4aba5a=>{const _0xd98be4=_0x262bda;VisuMZ['ConvertParams'](_0x4aba5a,_0x4aba5a);const _0x2862db=_0x4aba5a['Enemies'];for(const _0x4829af of _0x2862db){const _0x3b2789=$gameTroop[_0xd98be4(0x99)]()[_0x4829af];if(!_0x3b2789)continue;_0x3b2789[_0xd98be4(0xa3)]();}}),PluginManager['registerCommand'](pluginData[_0x262bda(0x212)],_0x262bda(0xde),_0x5e6ae1=>{const _0x446603=_0x262bda;VisuMZ['ConvertParams'](_0x5e6ae1,_0x5e6ae1);const _0xf9d409=_0x5e6ae1['Visible'];$gameSystem[_0x446603(0x1f5)](_0xf9d409);}),VisuMZ[_0x262bda(0xf6)][_0x262bda(0x11b)]={'Instant':/<OTB (?:INSTANT|INSTANT CAST|INSTANT USE)>/i,'UserFollOrder':/<OTB USER FOLLOW TURN: ([\+\-]\d+)>/i,'UserCurrOrder':/<OTB USER CURRENT TURN: ([\+\-]\d+)>/i,'UserNextOrder':/<OTB USER NEXT TURN: ([\+\-]\d+)>/i,'TargetFollOrder':/<OTB TARGET FOLLOW TURN: ([\+\-]\d+)>/i,'TargetCurrOrder':/<OTB TARGET CURRENT TURN: ([\+\-]\d+)>/i,'TargetNextOrder':/<OTB TARGET NEXT TURN: ([\+\-]\d+)>/i,'UserAddActionCurrent':/<OTB USER ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'UserAddActionNext':/<OTB USER ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionCurrent':/<OTB TARGET ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionNext':/<OTB TARGET ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i},DataManager[_0x262bda(0xa6)]=function(_0x55abda){const _0x2ee75b=_0x262bda;_0x55abda=_0x55abda['toUpperCase']()['trim'](),this[_0x2ee75b(0x1e0)]=this['_stateIDs']||{};if(this[_0x2ee75b(0x1e0)][_0x55abda])return this[_0x2ee75b(0x1e0)][_0x55abda];for(const _0xd9ab1d of $dataStates){if(!_0xd9ab1d)continue;this['_stateIDs'][_0xd9ab1d[_0x2ee75b(0x212)]['toUpperCase']()[_0x2ee75b(0x22f)]()]=_0xd9ab1d['id'];}return this[_0x2ee75b(0x1e0)][_0x55abda]||0x0;},ImageManager[_0x262bda(0x1cd)]=ImageManager['svActorHorzCells']||0x9,ImageManager['svActorVertCells']=ImageManager[_0x262bda(0x22a)]||0x6,SceneManager[_0x262bda(0x116)]=function(){const _0x4d6272=_0x262bda;return this[_0x4d6272(0x252)]&&this['_scene'][_0x4d6272(0x1f0)]===Scene_Battle;},VisuMZ[_0x262bda(0xf6)]['BattleManager_setup']=BattleManager[_0x262bda(0x235)],BattleManager['setup']=function(_0x191cee,_0x1229ed,_0x2c1d89){const _0x4c3334=_0x262bda;VisuMZ['BattleSystemOTB'][_0x4c3334(0x282)][_0x4c3334(0x1b5)](this,_0x191cee,_0x1229ed,_0x2c1d89),this[_0x4c3334(0x20b)]();},BattleManager['initMembersOTB']=function(){const _0x38b320=_0x262bda;if(!this['isOTB']())return;this[_0x38b320(0x15c)]=[],this[_0x38b320(0x20a)]=![];},VisuMZ[_0x262bda(0xf6)]['BattleManager_battleSys']=BattleManager[_0x262bda(0x1a0)],BattleManager[_0x262bda(0x1a0)]=function(){const _0x34e8c9=_0x262bda;if(this['isOTB']())return'OTB';return VisuMZ[_0x34e8c9(0xf6)][_0x34e8c9(0x177)][_0x34e8c9(0x1b5)](this);},BattleManager[_0x262bda(0x172)]=function(){const _0x2b67ed=_0x262bda;return $gameSystem[_0x2b67ed(0xdd)]()===_0x2b67ed(0x18c);},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x2a9)]=BattleManager[_0x262bda(0x234)],BattleManager[_0x262bda(0x234)]=function(){const _0x1e3f37=_0x262bda;if(this['isOTB']())return![];return VisuMZ[_0x1e3f37(0xf6)][_0x1e3f37(0x2a9)][_0x1e3f37(0x1b5)](this);},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x187)]=BattleManager['isActiveTpb'],BattleManager[_0x262bda(0x17d)]=function(){const _0x1afda1=_0x262bda;if(this[_0x1afda1(0x172)]())return![];return VisuMZ[_0x1afda1(0xf6)][_0x1afda1(0x187)][_0x1afda1(0x1b5)](this);},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x166)]=BattleManager[_0x262bda(0x10f)],BattleManager[_0x262bda(0x10f)]=function(){const _0x2cad49=_0x262bda;if(this[_0x2cad49(0x172)]())return!![];return VisuMZ[_0x2cad49(0xf6)][_0x2cad49(0x166)][_0x2cad49(0x1b5)](this);},VisuMZ[_0x262bda(0xf6)]['BattleManager_startInput']=BattleManager[_0x262bda(0x14e)],BattleManager[_0x262bda(0x14e)]=function(){const _0x51a342=_0x262bda;VisuMZ[_0x51a342(0xf6)][_0x51a342(0x29c)][_0x51a342(0x1b5)](this),this[_0x51a342(0x172)]()&&$gameParty[_0x51a342(0xe3)]()&&!this[_0x51a342(0x165)]&&this[_0x51a342(0x271)]();},BattleManager[_0x262bda(0x271)]=function(){const _0xce4986=_0x262bda;this[_0xce4986(0x121)]();},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x100)]=BattleManager['processTurn'],BattleManager['processTurn']=function(){const _0x2cc9ca=_0x262bda;this[_0x2cc9ca(0x172)]()?this[_0x2cc9ca(0x205)]():VisuMZ[_0x2cc9ca(0xf6)][_0x2cc9ca(0x100)][_0x2cc9ca(0x1b5)](this);},BattleManager[_0x262bda(0x205)]=function(){const _0x4a7117=_0x262bda,_0x251193=this[_0x4a7117(0x25d)];if(_0x251193['isActor']()&&_0x251193[_0x4a7117(0xe3)]()){const _0x3b37ea=_0x251193['currentAction']();if(!_0x3b37ea)VisuMZ[_0x4a7117(0xf6)][_0x4a7117(0x100)][_0x4a7117(0x1b5)](this);else _0x3b37ea[_0x4a7117(0x294)]?VisuMZ[_0x4a7117(0xf6)]['BattleManager_processTurn']['call'](this):(this[_0x4a7117(0x24d)]=_0x251193,this[_0x4a7117(0x15b)]());}else VisuMZ[_0x4a7117(0xf6)]['BattleManager_processTurn']['call'](this);},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x193)]=BattleManager[_0x262bda(0x1bb)],BattleManager['finishActorInput']=function(){const _0x24b799=_0x262bda;this[_0x24b799(0x172)]()?VisuMZ[_0x24b799(0xf6)][_0x24b799(0x100)][_0x24b799(0x1b5)](this):VisuMZ['BattleSystemOTB']['BattleManager_finishActorInput']['call'](this);},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x27f)]=BattleManager['selectNextActor'],BattleManager[_0x262bda(0xc0)]=function(){const _0x23a6b3=_0x262bda;this[_0x23a6b3(0x172)]()?this[_0x23a6b3(0x16d)]():VisuMZ[_0x23a6b3(0xf6)][_0x23a6b3(0x27f)][_0x23a6b3(0x1b5)](this);},BattleManager[_0x262bda(0x16d)]=function(){const _0x100dd8=_0x262bda;this[_0x100dd8(0x24d)]=null,this['_inputting']=![];},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x1d6)]=BattleManager[_0x262bda(0x15f)],BattleManager[_0x262bda(0x15f)]=function(){const _0x41b209=_0x262bda;this[_0x41b209(0x21f)](),VisuMZ[_0x41b209(0xf6)][_0x41b209(0x1d6)]['call'](this),this['postEndActionOTB']();},BattleManager['preEndActionOTB']=function(){const _0x2498e3=_0x262bda;if(!this['isOTB']())return;this[_0x2498e3(0x276)]();this['_subject']&&this[_0x2498e3(0x25d)][_0x2498e3(0x185)]();if(this[_0x2498e3(0x25d)]&&this[_0x2498e3(0x25d)]['canMove']()&&this['_actionBattlers'][_0x2498e3(0x2af)](this[_0x2498e3(0x25d)])){const _0x325b7a=this[_0x2498e3(0x25d)][_0x2498e3(0x262)]['filter'](_0x45bdb4=>_0x45bdb4[_0x2498e3(0x294)]);this['_subject'][_0x2498e3(0x2ac)]();if(_0x325b7a){let _0x7714df=_0x325b7a[_0x2498e3(0x1ea)];while(_0x7714df--){this[_0x2498e3(0x25d)][_0x2498e3(0x262)][_0x2498e3(0x180)]();}this[_0x2498e3(0x25d)][_0x2498e3(0x262)]=_0x325b7a[_0x2498e3(0xa2)](this[_0x2498e3(0x25d)][_0x2498e3(0x262)]);}}},BattleManager[_0x262bda(0x10d)]=function(){const _0x121df6=_0x262bda;if(!this['isOTB']())return;this[_0x121df6(0x276)]();this[_0x121df6(0x25d)]&&(this[_0x121df6(0x283)](this[_0x121df6(0x25d)]),this[_0x121df6(0x25d)]=null);this[_0x121df6(0x137)][_0x121df6(0x1ea)]>0x0&&(this[_0x121df6(0x25d)]=this[_0x121df6(0x244)]());;},BattleManager[_0x262bda(0x25a)]=VisuMZ[_0x262bda(0xf6)][_0x262bda(0x251)][_0x262bda(0x23d)][_0x262bda(0x150)],BattleManager[_0x262bda(0x1b4)]=VisuMZ['BattleSystemOTB']['Settings'][_0x262bda(0x23d)][_0x262bda(0x125)],BattleManager['OTB_STUN_INFINITY_CLAMP']=VisuMZ[_0x262bda(0xf6)][_0x262bda(0x251)][_0x262bda(0x23d)][_0x262bda(0x272)],VisuMZ[_0x262bda(0xf6)][_0x262bda(0x231)]=BattleManager[_0x262bda(0x269)],BattleManager[_0x262bda(0x269)]=function(){const _0x8ba701=_0x262bda;this[_0x8ba701(0x172)]()?this[_0x8ba701(0x129)]():VisuMZ[_0x8ba701(0xf6)][_0x8ba701(0x231)]['call'](this);},BattleManager['makeActionOrdersOTB']=function(){const _0x53ec4a=_0x262bda;let _0x3bc7f5=this[_0x53ec4a(0x20a)]?0x1:0x2;while(_0x3bc7f5--){this[_0x53ec4a(0x1dc)]();}const _0x221461=!this[_0x53ec4a(0x20a)];this[_0x53ec4a(0x20a)]=!![];},BattleManager[_0x262bda(0x1dc)]=function(){const _0x1a4078=_0x262bda;this[_0x1a4078(0x280)]=this[_0x1a4078(0x15c)],this[_0x1a4078(0x204)]();const _0x300d20=[];_0x300d20[_0x1a4078(0x16f)](...$gameParty[_0x1a4078(0x162)]()),_0x300d20[_0x1a4078(0x16f)](...$gameTroop[_0x1a4078(0x99)]());for(const _0x427374 of _0x300d20){_0x427374[_0x1a4078(0x25e)]();}_0x300d20[_0x1a4078(0x136)]((_0x32da5c,_0x37ee27)=>_0x37ee27[_0x1a4078(0x22b)]()-_0x32da5c[_0x1a4078(0x22b)]()),this[_0x1a4078(0x15c)]=_0x300d20,this[_0x1a4078(0x1f7)](),this[_0x1a4078(0x276)](),this[_0x1a4078(0xb1)]();},BattleManager[_0x262bda(0x1f7)]=function(){const _0x41c369=_0x262bda;if(!BattleManager[_0x41c369(0x25a)])return;const _0x495ac0=this['_otb_actionBattlersNext'],_0x51d045=this[_0x41c369(0x18b)]();for(const _0xa3554c of _0x51d045){if(!_0xa3554c)continue;if(!_0xa3554c[_0x41c369(0x96)]())continue;if(!_0xa3554c[_0x41c369(0x176)]())continue;if(!_0x495ac0[_0x41c369(0x2af)](_0xa3554c))continue;const _0x12e472=_0x495ac0[_0x41c369(0x144)](_0xa3554c);let _0x2ae8e7=_0xa3554c[_0x41c369(0xe2)]()-0x1;while(_0x2ae8e7--){let _0x43d273=_0x12e472;BattleManager[_0x41c369(0x1b4)]&&(_0x43d273=Math[_0x41c369(0x140)](_0x495ac0[_0x41c369(0x1ea)]-_0x12e472)+_0x12e472),_0x495ac0[_0x41c369(0x200)](_0x43d273,0x0,_0xa3554c);}}},BattleManager['removeActionBattlersOTB']=function(){const _0x1922cf=_0x262bda;if(!this['isOTB']())return;this['_actionBattlers']=this[_0x1922cf(0x280)]||[],this[_0x1922cf(0x280)][_0x1922cf(0x201)](null),this[_0x1922cf(0x280)][_0x1922cf(0x201)](undefined),this['_actionBattlers']=this['_actionBattlers'][_0x1922cf(0x28b)](_0x4b504b=>_0x4b504b[_0x1922cf(0xa1)]()),this[_0x1922cf(0x280)]=this[_0x1922cf(0x280)]['filter'](_0x338fcc=>VisuMZ[_0x1922cf(0xf6)]['ActionBattlersFilter'](_0x338fcc)),this[_0x1922cf(0x165)]&&(this[_0x1922cf(0x280)]=this[_0x1922cf(0x280)][_0x1922cf(0x28b)](_0x5ab279=>!_0x5ab279[_0x1922cf(0x91)]())),this[_0x1922cf(0x10a)]&&(this[_0x1922cf(0x280)]=this[_0x1922cf(0x280)][_0x1922cf(0x28b)](_0x4e388d=>!_0x4e388d[_0x1922cf(0x1d5)]())),this[_0x1922cf(0x15c)]=this[_0x1922cf(0x15c)]||[],this['_otb_actionBattlersNext']['remove'](null),this[_0x1922cf(0x15c)][_0x1922cf(0x201)](undefined),this[_0x1922cf(0x15c)]=this[_0x1922cf(0x15c)][_0x1922cf(0x28b)](_0x25d1ae=>_0x25d1ae[_0x1922cf(0xa1)]()),this['_otb_actionBattlersNext']=this['_otb_actionBattlersNext'][_0x1922cf(0x28b)](_0x5c0572=>VisuMZ[_0x1922cf(0xf6)]['ActionBattlersNextFilter'](_0x5c0572)),this[_0x1922cf(0x26a)](),this[_0x1922cf(0x15e)]();},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x87)]=function(_0x1aa8fe){const _0x579429=_0x262bda;if(!_0x1aa8fe)return![];if(!_0x1aa8fe[_0x579429(0x176)]())return![];if(!_0x1aa8fe[_0x579429(0x96)]())return![];return _0x1aa8fe[_0x579429(0x1fc)]();},VisuMZ[_0x262bda(0xf6)]['ActionBattlersNextFilter']=function(_0x4af611){const _0x4e133a=_0x262bda;if(!_0x4af611)return![];const _0x471483=JsonEx[_0x4e133a(0xc2)](_0x4af611);return _0x471483[_0x4e133a(0x237)]=!![],_0x471483[_0x4e133a(0xc4)]=!![],_0x471483[_0x4e133a(0xac)](),_0x471483['removeStatesAuto'](0x1),_0x471483['removeStatesAuto'](0x2),_0x471483['refresh'](),VisuMZ[_0x4e133a(0xf6)][_0x4e133a(0x87)](_0x471483);},BattleManager[_0x262bda(0x236)]=function(_0x50132d,_0x1d0014,_0xed3033){const _0x279a0f=_0x262bda;if(!_0x1d0014)return;const _0x5cfe89=_0xed3033?this['_otb_actionBattlersNext']:this[_0x279a0f(0x280)];if(!_0x5cfe89)return;if(!_0x5cfe89[_0x279a0f(0x2af)](_0x50132d))return;const _0x3742f2=VisuMZ[_0x279a0f(0xf6)]['GetAllIndicies'](_0x50132d,_0x5cfe89),_0x514c1b=_0xed3033?VisuMZ[_0x279a0f(0xf6)][_0x279a0f(0x198)](_0x5cfe89):0x0,_0x560bc5=_0x3742f2[_0x279a0f(0x1ea)]-0x1;for(let _0x67cdce=_0x560bc5;_0x67cdce>=0x0;_0x67cdce--){_0x5cfe89[_0x279a0f(0x200)](_0x3742f2[_0x67cdce],0x1);}for(var _0xaeca97=0x0;_0xaeca97<_0x3742f2[_0x279a0f(0x1ea)];_0xaeca97++){var _0x5398be=(_0x3742f2[_0xaeca97]-_0x1d0014)[_0x279a0f(0x1d0)](_0x514c1b,_0x5cfe89['length']);_0x5cfe89[_0x279a0f(0x200)](_0x5398be,0x0,_0x50132d);}this['removeActionBattlersOTB'](),this[_0x279a0f(0x15e)]();},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x265)]=function(_0x552c4b,_0x531a19){const _0x46e87b=_0x262bda,_0x41411b=[],_0x3c5462=_0x531a19[_0x46e87b(0x1ea)];for(let _0x549795=0x0;_0x549795<_0x3c5462;_0x549795++){if(_0x531a19[_0x549795]===_0x552c4b)_0x41411b[_0x46e87b(0x16f)](_0x549795);}return _0x41411b;},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x198)]=function(_0x27b268){const _0x5c3ecb=_0x262bda;if(!BattleManager[_0x5c3ecb(0x14f)])return 0x0;if(!_0x27b268)return 0x0;let _0x22fb37=0x0;const _0x1e8dd4=_0x27b268[_0x5c3ecb(0x1ea)];for(let _0x111832=0x0;_0x111832<_0x1e8dd4;_0x111832++){const _0x149517=_0x27b268[_0x111832];if(!_0x149517)continue;if(_0x149517[_0x5c3ecb(0x22b)]()!==Infinity)return _0x111832;else _0x22fb37++;}return _0x22fb37;},BattleManager[_0x262bda(0x204)]=function(){const _0x49d0f4=_0x262bda;if(!this[_0x49d0f4(0x172)]())return;const _0x428344=SceneManager[_0x49d0f4(0x252)][_0x49d0f4(0xca)];if(!_0x428344)return;_0x428344['shiftNextTurnSpritesToCurrentTurn']();},BattleManager[_0x262bda(0xb1)]=function(){const _0x4b5799=_0x262bda;if(!this[_0x4b5799(0x172)]())return;const _0x114433=SceneManager['_scene']['_otbTurnOrderWindow'];if(!_0x114433)return;_0x114433[_0x4b5799(0x105)]();},VisuMZ['BattleSystemOTB']['BattleManager_getNextSubject']=BattleManager[_0x262bda(0x244)],BattleManager[_0x262bda(0x244)]=function(){const _0x4c7524=_0x262bda;return this[_0x4c7524(0x25d)]=VisuMZ[_0x4c7524(0xf6)][_0x4c7524(0x1f2)][_0x4c7524(0x1b5)](this),this[_0x4c7524(0x172)]()&&this[_0x4c7524(0x25d)]&&this['otbShiftTurnOrderForSubject'](this[_0x4c7524(0x25d)]),this[_0x4c7524(0x25d)];},BattleManager['otbShiftTurnOrderForSubject']=function(_0x379e5e){const _0x2528ea=_0x262bda;if(!this[_0x2528ea(0x172)]())return;const _0xeb69f5=SceneManager[_0x2528ea(0x252)][_0x2528ea(0xca)];if(!_0xeb69f5)return;if(!_0x379e5e)return;_0xeb69f5[_0x2528ea(0x1fd)](_0x379e5e);},BattleManager['refreshTurnOrder']=function(){const _0x49ea1e=_0x262bda;if(!this[_0x49ea1e(0x172)]())return;const _0xd50fd1=SceneManager['_scene'][_0x49ea1e(0xca)];if(!_0xd50fd1)return;_0xd50fd1[_0x49ea1e(0xa5)]();},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x8b)]=BattleManager[_0x262bda(0x227)],BattleManager['endTurn']=function(){const _0x445756=_0x262bda;VisuMZ['BattleSystemOTB'][_0x445756(0x8b)][_0x445756(0x1b5)](this),this[_0x445756(0x172)]()&&(this[_0x445756(0x253)](),$gameParty[_0x445756(0x21a)](),$gameTroop[_0x445756(0x21a)]());},BattleManager[_0x262bda(0x253)]=function(){const _0x15bb8e=_0x262bda;if(!this[_0x15bb8e(0x172)]())return;const _0x121ea0=SceneManager[_0x15bb8e(0x252)][_0x15bb8e(0xca)];if(!_0x121ea0)return;_0x121ea0[_0x15bb8e(0x11c)]();},BattleManager['otbRemoveUnableTurnOrderSprites']=function(){const _0x311990=_0x262bda;if(!this[_0x311990(0x172)]())return;const _0x12d401=SceneManager[_0x311990(0x252)][_0x311990(0xca)];if(!_0x12d401)return;_0x12d401[_0x311990(0xb8)]();},BattleManager[_0x262bda(0x2a7)]=function(_0x2d3871){const _0x4cd129=_0x262bda;if(!_0x2d3871)return;const _0x4fbead=_0x2d3871['makeActionTimes']();_0x2d3871[_0x4cd129(0x2ac)]();if(!this[_0x4cd129(0x280)]['includes'](_0x2d3871)){const _0x193ef9=Math[_0x4cd129(0x1e3)](0x0,_0x4fbead-(_0x2d3871[_0x4cd129(0x113)]||0x0));this[_0x4cd129(0x26e)](_0x2d3871,_0x193ef9,this[_0x4cd129(0x280)]);}if(!this[_0x4cd129(0x15c)][_0x4cd129(0x2af)](_0x2d3871)){const _0x58e02d=_0x4fbead;this[_0x4cd129(0x26e)](_0x2d3871,_0x58e02d,this['_otb_actionBattlersNext']);}},BattleManager['otbAddBattlerToTurnOrderAtEnd']=function(_0x338012,_0x2abbc8,_0x16e3eb){const _0xef1847=_0x262bda;if(!this[_0xef1847(0x172)]())return;const _0x71eefa=SceneManager[_0xef1847(0x252)][_0xef1847(0xca)];_0x338012[_0xef1847(0x2ac)]();while(_0x2abbc8--){_0x16e3eb[_0xef1847(0x16f)](_0x338012),_0x71eefa&&_0x71eefa[_0xef1847(0x1b9)](_0x338012,_0x16e3eb);}},BattleManager[_0x262bda(0x1a2)]=function(_0x15ed30){const _0x4840cf=_0x262bda;if(!_0x15ed30)return;const _0xb944ce=_0x15ed30[_0x4840cf(0xe2)]();_0x15ed30[_0x4840cf(0x2ac)]();if(!this[_0x4840cf(0x280)][_0x4840cf(0x2af)](_0x15ed30)){const _0x2a1216=Math[_0x4840cf(0x1e3)](0x0,_0xb944ce-(_0x15ed30[_0x4840cf(0x113)]||0x0));this['addBattlerToTurnOrderAtStart'](_0x15ed30,_0x2a1216,this[_0x4840cf(0x280)]);}if(!this[_0x4840cf(0x15c)][_0x4840cf(0x2af)](_0x15ed30)){const _0x469434=_0xb944ce;this[_0x4840cf(0x134)](_0x15ed30,_0x469434,this[_0x4840cf(0x15c)]);}},BattleManager['otbAddBattlerToTurnOrderAtStart']=function(_0x272e02,_0x1ff3c1,_0x31b4df){const _0x688f10=_0x262bda;if(!this['isOTB']())return;const _0x28b1ee=SceneManager[_0x688f10(0x252)][_0x688f10(0xca)];while(_0x1ff3c1--){_0x31b4df['unshift'](_0x272e02),_0x28b1ee&&_0x28b1ee['addBattlerToTurnOrderAtStart'](_0x272e02,_0x31b4df);}},BattleManager['otbAddForceActionBattler']=function(_0x1ea627){const _0x4a74a4=_0x262bda;if(!this[_0x4a74a4(0x172)]())return;const _0x8d633=this[_0x4a74a4(0x280)],_0x439d96=_0x1ea627===this['_subject']?0x0:0x1;let _0xe69694=0x0;for(let _0x142c0b=0x0;_0x142c0b<_0x8d633[_0x4a74a4(0x1ea)];_0x142c0b++){const _0x37039a=_0x8d633[_0x142c0b];if(!_0x37039a)continue;if(!_0x37039a[_0x4a74a4(0x262)])continue;if(!_0x37039a[_0x4a74a4(0x262)][_0x439d96])continue;if(!_0x37039a[_0x4a74a4(0x262)][_0x439d96]['_forceAction'])continue;_0xe69694=_0x142c0b;}this['_actionBattlers'][_0x4a74a4(0x200)](_0xe69694,0x0,_0x1ea627);const _0x2734de=SceneManager[_0x4a74a4(0x252)]['_otbTurnOrderWindow'];_0x2734de&&_0x2734de['addForceActionBattler'](_0x1ea627,_0xe69694);},BattleManager[_0x262bda(0x226)]=function(){const _0x24e0de=_0x262bda;if(!this[_0x24e0de(0x172)]())return;const _0x272351=SceneManager[_0x24e0de(0x252)][_0x24e0de(0xca)];if(!_0x272351)return;_0x272351[_0x24e0de(0xb4)](null);},BattleManager[_0x262bda(0x206)]=function(){const _0x2ee431=_0x262bda;if(!this[_0x2ee431(0x172)]())return;const _0x4dba2c=SceneManager[_0x2ee431(0x252)]['_otbTurnOrderWindow'];if(!_0x4dba2c)return;_0x4dba2c[_0x2ee431(0xb4)](this[_0x2ee431(0xdf)]());},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x221)]=Game_System[_0x262bda(0x1a8)][_0x262bda(0x11e)],Game_System[_0x262bda(0x1a8)][_0x262bda(0x11e)]=function(){const _0x4a3391=_0x262bda;VisuMZ[_0x4a3391(0xf6)]['Game_System_initialize'][_0x4a3391(0x1b5)](this),this[_0x4a3391(0x17c)]();},Game_System['prototype']['initBattleSystemOTB']=function(){const _0x10b841=_0x262bda;this[_0x10b841(0x157)]=!![];},Game_System['prototype']['isBattleSystemOTBTurnOrderVisible']=function(){const _0x86f41=_0x262bda;return this['_otbTurnOrderVisible']===undefined&&this['initBattleSystemOTB'](),this[_0x86f41(0x157)];},Game_System[_0x262bda(0x1a8)]['setBattleSystemOTBTurnOrderVisible']=function(_0x4bd3ff){const _0x5ba391=_0x262bda;this[_0x5ba391(0x157)]===undefined&&this[_0x5ba391(0x17c)](),this['_otbTurnOrderVisible']=_0x4bd3ff;},Game_Action['OTB_CONVERT_AGI_BUFF_CURRENT_TURN']=VisuMZ[_0x262bda(0xf6)]['Settings'][_0x262bda(0x117)][_0x262bda(0x1ba)],Game_Action[_0x262bda(0x270)]=VisuMZ[_0x262bda(0xf6)]['Settings']['Conversion'][_0x262bda(0x21c)],Game_Action[_0x262bda(0x148)]=VisuMZ[_0x262bda(0xf6)][_0x262bda(0x251)]['Conversion'][_0x262bda(0x29d)],Game_Action[_0x262bda(0x295)]=VisuMZ[_0x262bda(0xf6)][_0x262bda(0x251)][_0x262bda(0x117)][_0x262bda(0x175)],VisuMZ[_0x262bda(0xf6)][_0x262bda(0x27d)]=Game_Action['prototype'][_0x262bda(0x22b)],Game_Action[_0x262bda(0x1a8)]['speed']=function(){const _0x129e34=_0x262bda;return BattleManager[_0x129e34(0x172)]()?0x0:VisuMZ[_0x129e34(0xf6)][_0x129e34(0x27d)][_0x129e34(0x1b5)](this);},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x27c)]=Game_Action['prototype'][_0x262bda(0xfe)],Game_Action[_0x262bda(0x1a8)][_0x262bda(0xfe)]=function(){const _0x1ffa8b=_0x262bda;VisuMZ[_0x1ffa8b(0xf6)][_0x1ffa8b(0x27c)]['call'](this),this[_0x1ffa8b(0x109)]();},Game_Action['prototype'][_0x262bda(0x109)]=function(){const _0x4b9a53=_0x262bda;if(!SceneManager[_0x4b9a53(0x116)]())return;if(!BattleManager[_0x4b9a53(0x172)]())return;if(!this[_0x4b9a53(0x19f)]())return;if(!this['subject']())return;const _0xecc7b7=VisuMZ[_0x4b9a53(0xf6)][_0x4b9a53(0x11b)],_0x336869=this[_0x4b9a53(0x19f)]()[_0x4b9a53(0x97)];_0x336869[_0x4b9a53(0x1f3)](_0xecc7b7[_0x4b9a53(0x1a9)])&&this[_0x4b9a53(0x1e1)]()['otbGainInstant'](0x1);let _0x3363b2=this['otbCalcUserCurrentOrderChange'](),_0x121cad=this['otbCalcUserNextOrderChange']();_0x3363b2!==0x0&&BattleManager['turnOrderChangeOTB'](this[_0x4b9a53(0x1e1)](),-_0x3363b2,![]),_0x121cad!==0x0&&BattleManager[_0x4b9a53(0x236)](this[_0x4b9a53(0x1e1)](),-_0x121cad,!![]);},Game_Action[_0x262bda(0x1a8)][_0x262bda(0x239)]=function(){const _0xc6e1e4=_0x262bda;if(!SceneManager[_0xc6e1e4(0x116)]())return 0x0;if(!BattleManager[_0xc6e1e4(0x172)]())return 0x0;if(!this[_0xc6e1e4(0x19f)]())return 0x0;if(!this[_0xc6e1e4(0x1e1)]())return 0x0;if(!this[_0xc6e1e4(0x1e1)]()[_0xc6e1e4(0x12c)]())return 0x0;const _0xc2633b=VisuMZ[_0xc6e1e4(0xf6)][_0xc6e1e4(0x11b)],_0x23b290=this[_0xc6e1e4(0x19f)]()[_0xc6e1e4(0x97)],_0x1f588d=BattleManager[_0xc6e1e4(0x280)]||[];let _0x3a22f2=0x0;return _0x23b290[_0xc6e1e4(0x1f3)](_0xc2633b[_0xc6e1e4(0xe1)])&&(_0x1f588d['includes'](this[_0xc6e1e4(0x1e1)]())&&(_0x3a22f2+=Number(RegExp['$1']))),_0x23b290['match'](_0xc2633b['UserCurrOrder'])&&(_0x3a22f2+=Number(RegExp['$1'])),_0x3a22f2;},Game_Action[_0x262bda(0x1a8)][_0x262bda(0x95)]=function(){const _0x1dd4c2=_0x262bda;if(!SceneManager[_0x1dd4c2(0x116)]())return 0x0;if(!BattleManager[_0x1dd4c2(0x172)]())return 0x0;if(!this[_0x1dd4c2(0x19f)]())return 0x0;if(!this[_0x1dd4c2(0x1e1)]())return 0x0;if(!this[_0x1dd4c2(0x1e1)]()[_0x1dd4c2(0x12c)]())return 0x0;const _0x59351e=VisuMZ[_0x1dd4c2(0xf6)][_0x1dd4c2(0x251)]['Mechanics'],_0x114e3b=VisuMZ['BattleSystemOTB'][_0x1dd4c2(0x11b)],_0x147222=this[_0x1dd4c2(0x19f)]()['note'],_0x101811=BattleManager[_0x1dd4c2(0x280)]||[],_0x464c1a=BattleManager[_0x1dd4c2(0x15c)]||[];let _0x10348b=0x0;return _0x59351e[_0x1dd4c2(0x2aa)]&&(_0x10348b+=_0x59351e[_0x1dd4c2(0x2aa)][_0x1dd4c2(0x1b5)](this)),_0x147222[_0x1dd4c2(0x1f3)](_0x114e3b[_0x1dd4c2(0xe1)])&&(_0x464c1a['includes'](this[_0x1dd4c2(0x1e1)]())&&!_0x101811[_0x1dd4c2(0x2af)](this[_0x1dd4c2(0x1e1)]())&&(_0x10348b+=Number(RegExp['$1']))),_0x147222['match'](_0x114e3b[_0x1dd4c2(0x2b4)])&&(_0x10348b+=Number(RegExp['$1'])),_0x10348b;},VisuMZ['BattleSystemOTB'][_0x262bda(0x250)]=Game_Action['prototype'][_0x262bda(0x12a)],Game_Action[_0x262bda(0x1a8)]['applyItemUserEffect']=function(_0x3803a3){const _0xc4f3e6=_0x262bda;VisuMZ[_0xc4f3e6(0xf6)][_0xc4f3e6(0x250)][_0xc4f3e6(0x1b5)](this,_0x3803a3),this[_0xc4f3e6(0x10e)](_0x3803a3),this['applyItemTargetEffectOTB'](_0x3803a3);},Game_Action[_0x262bda(0x1a8)][_0x262bda(0x10e)]=function(_0x953160){const _0x546d80=_0x262bda;if(!SceneManager[_0x546d80(0x116)]())return;if(!BattleManager[_0x546d80(0x172)]())return;if(!this[_0x546d80(0x19f)]())return;if(!_0x953160)return;const _0x16fc78=VisuMZ['BattleSystemOTB']['RegExp'],_0xa603fc=this['item']()[_0x546d80(0x97)];if(_0xa603fc[_0x546d80(0x1f3)](_0x16fc78['UserAddActionCurrent'])){const _0x28ae71=!![],_0x3f6ac2=Number(RegExp['$1'])||0x0;this[_0x546d80(0x1e1)]()[_0x546d80(0x14a)](_0x3f6ac2,_0x28ae71);}if(_0xa603fc[_0x546d80(0x1f3)](_0x16fc78['UserAddActionNext'])){const _0x5b0fe1=![],_0x38016b=Number(RegExp['$1'])||0x0;this[_0x546d80(0x1e1)]()[_0x546d80(0x14a)](_0x38016b,_0x5b0fe1);}if(_0xa603fc[_0x546d80(0x1f3)](_0x16fc78['TargetAddActionCurrent'])){const _0x49e34b=!![],_0x395f9c=Number(RegExp['$1'])||0x0;_0x953160[_0x546d80(0x14a)](_0x395f9c,_0x49e34b);}if(_0xa603fc[_0x546d80(0x1f3)](_0x16fc78[_0x546d80(0x29b)])){const _0x101c93=![],_0x41bd6a=Number(RegExp['$1'])||0x0;_0x953160['otbAddActions'](_0x41bd6a,_0x101c93);}},Game_Action[_0x262bda(0x1a8)][_0x262bda(0x28f)]=function(_0x3c4d94){const _0xbb2890=_0x262bda;if(!SceneManager[_0xbb2890(0x116)]())return;if(!BattleManager['isOTB']())return;if(!this[_0xbb2890(0x19f)]())return;if(!_0x3c4d94)return;if(!_0x3c4d94[_0xbb2890(0x12c)]())return 0x0;let _0x5b3d5a=this['otbCalcTargetCurrentOrderChange'](_0x3c4d94),_0x16b57b=this[_0xbb2890(0x22e)](_0x3c4d94);_0x5b3d5a!==0x0&&BattleManager[_0xbb2890(0x236)](_0x3c4d94,-_0x5b3d5a,![]),_0x16b57b!==0x0&&BattleManager['turnOrderChangeOTB'](_0x3c4d94,-_0x16b57b,!![]);},Game_Action[_0x262bda(0x1a8)][_0x262bda(0x210)]=function(_0x3afe23){const _0x1cc6f2=_0x262bda;if(!SceneManager[_0x1cc6f2(0x116)]())return 0x0;if(!BattleManager[_0x1cc6f2(0x172)]())return 0x0;if(!this['item']())return 0x0;if(!_0x3afe23)return 0x0;if(!_0x3afe23[_0x1cc6f2(0x12c)]())return 0x0;const _0x42608f=VisuMZ[_0x1cc6f2(0xf6)]['RegExp'],_0x5eeaa8=this[_0x1cc6f2(0x19f)]()[_0x1cc6f2(0x97)],_0xea27fd=BattleManager[_0x1cc6f2(0x280)]||[];let _0x2c2e64=0x0;_0x5eeaa8[_0x1cc6f2(0x1f3)](_0x42608f[_0x1cc6f2(0x147)])&&(_0xea27fd[_0x1cc6f2(0x2af)](_0x3afe23)&&(_0x2c2e64+=Number(RegExp['$1'])));_0x5eeaa8[_0x1cc6f2(0x1f3)](_0x42608f['TargetCurrOrder'])&&(_0x2c2e64+=Number(RegExp['$1']));const _0x1384a1=this[_0x1cc6f2(0x19f)]()[_0x1cc6f2(0x178)];for(const _0x149a27 of _0x1384a1){if(!_0x149a27)continue;if(_0x149a27[_0x1cc6f2(0x1c3)]===Game_Action[_0x1cc6f2(0x298)]&&_0x149a27['dataId']===0x6){if(Game_Action[_0x1cc6f2(0x19e)])_0x2c2e64-=0x1;}if(_0x149a27[_0x1cc6f2(0x1c3)]===Game_Action[_0x1cc6f2(0xb5)]&&_0x149a27['dataId']===0x6){if(Game_Action[_0x1cc6f2(0x270)])_0x2c2e64+=0x1;}}return _0x2c2e64;},Game_Action[_0x262bda(0x1a8)][_0x262bda(0x22e)]=function(_0x581283){const _0x4a26dc=_0x262bda;if(!SceneManager[_0x4a26dc(0x116)]())return 0x0;if(!BattleManager[_0x4a26dc(0x172)]())return 0x0;if(!this[_0x4a26dc(0x19f)]())return 0x0;if(!_0x581283)return 0x0;if(!_0x581283[_0x4a26dc(0x12c)]())return 0x0;const _0x57da76=VisuMZ[_0x4a26dc(0xf6)]['RegExp'],_0x178786=this[_0x4a26dc(0x19f)]()['note'],_0x44d6ca=BattleManager[_0x4a26dc(0x280)]||[],_0x2e79a9=BattleManager[_0x4a26dc(0x15c)]||[];let _0xd0714f=0x0;_0x178786[_0x4a26dc(0x1f3)](_0x57da76[_0x4a26dc(0x147)])&&(_0x2e79a9[_0x4a26dc(0x2af)](_0x581283)&&!_0x44d6ca[_0x4a26dc(0x2af)](_0x581283)&&(_0xd0714f+=Number(RegExp['$1'])));_0x178786[_0x4a26dc(0x1f3)](_0x57da76[_0x4a26dc(0x25b)])&&(_0xd0714f+=Number(RegExp['$1']));const _0x1e8e95=this[_0x4a26dc(0x19f)]()[_0x4a26dc(0x178)];for(const _0x331b36 of _0x1e8e95){if(!_0x331b36)continue;if(_0x331b36[_0x4a26dc(0x1c3)]===Game_Action[_0x4a26dc(0x298)]&&_0x331b36['dataId']===0x6){if(Game_Action[_0x4a26dc(0x148)])_0xd0714f-=0x1;}if(_0x331b36[_0x4a26dc(0x1c3)]===Game_Action[_0x4a26dc(0xb5)]&&_0x331b36['dataId']===0x6){if(Game_Action['OTB_CONVERT_AGI_DEBUFF_NEXT_TURN'])_0xd0714f+=0x1;}}return _0xd0714f;},Game_BattlerBase[_0x262bda(0x1a8)][_0x262bda(0xa3)]=function(){const _0x1e2945=_0x262bda;delete this['_otbTurnOrderGraphicType'],delete this['_otbTurnOrderFaceName'],delete this[_0x1e2945(0x297)],delete this[_0x1e2945(0x1ab)];},Game_BattlerBase[_0x262bda(0x1a8)][_0x262bda(0x130)]=function(){const _0x3b859f=_0x262bda;return this[_0x3b859f(0x267)]===undefined&&(this[_0x3b859f(0x267)]=this[_0x3b859f(0x296)]()),this['_otbTurnOrderGraphicType'];},Game_BattlerBase[_0x262bda(0x1a8)][_0x262bda(0x296)]=function(){const _0x1ab1a2=_0x262bda;return Window_OTB_TurnOrder['Settings'][_0x1ab1a2(0xbe)];},Game_BattlerBase[_0x262bda(0x1a8)][_0x262bda(0x1ec)]=function(){const _0x30308b=_0x262bda;return this[_0x30308b(0xf0)]===undefined&&(this[_0x30308b(0xf0)]=this['createTurnOrderOTBGraphicFaceName']()),this[_0x30308b(0xf0)];},Game_BattlerBase[_0x262bda(0x1a8)]['createTurnOrderOTBGraphicFaceName']=function(){const _0x4035b0=_0x262bda;return Window_OTB_TurnOrder[_0x4035b0(0x251)][_0x4035b0(0x14d)];},Game_BattlerBase['prototype'][_0x262bda(0xf1)]=function(){const _0x1eaeab=_0x262bda;return this[_0x1eaeab(0x297)]===undefined&&(this[_0x1eaeab(0x297)]=this[_0x1eaeab(0x170)]()),this[_0x1eaeab(0x297)];},Game_BattlerBase[_0x262bda(0x1a8)][_0x262bda(0x170)]=function(){const _0x2594dc=_0x262bda;return Window_OTB_TurnOrder['Settings'][_0x2594dc(0x228)];},Game_BattlerBase[_0x262bda(0x1a8)]['TurnOrderOTBGraphicIconIndex']=function(){const _0x40e776=_0x262bda;return this[_0x40e776(0x1ab)]===undefined&&(this[_0x40e776(0x1ab)]=this[_0x40e776(0x213)]()),this['_otbTurnOrderIconIndex'];},Game_BattlerBase[_0x262bda(0x1a8)][_0x262bda(0x213)]=function(){const _0x341c80=_0x262bda;return Window_OTB_TurnOrder[_0x341c80(0x251)][_0x341c80(0x199)];},Game_BattlerBase[_0x262bda(0x1a8)][_0x262bda(0x229)]=function(_0x16573e){const _0x72db7f=_0x262bda;this[_0x72db7f(0x1ab)]=_0x16573e;},VisuMZ['BattleSystemOTB']['Game_BattlerBase_hide']=Game_BattlerBase['prototype'][_0x262bda(0x18a)],Game_BattlerBase[_0x262bda(0x1a8)][_0x262bda(0x18a)]=function(){const _0x50ff50=_0x262bda;VisuMZ[_0x50ff50(0xf6)][_0x50ff50(0x238)][_0x50ff50(0x1b5)](this),BattleManager[_0x50ff50(0x276)]();},VisuMZ[_0x262bda(0xf6)][_0x262bda(0xf5)]=Game_BattlerBase[_0x262bda(0x1a8)][_0x262bda(0x292)],Game_BattlerBase[_0x262bda(0x1a8)]['appear']=function(){const _0x2657ab=_0x262bda,_0x50336a=this['_hidden'];VisuMZ[_0x2657ab(0xf6)][_0x2657ab(0xf5)][_0x2657ab(0x1b5)](this),BattleManager['isOTB']()&&SceneManager['isSceneBattle']()&&_0x50336a&&!this[_0x2657ab(0x101)]&&BattleManager[_0x2657ab(0x2a7)](this);},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x1bd)]=Game_Battler[_0x262bda(0x1a8)]['performCollapse'],Game_Battler[_0x262bda(0x1a8)][_0x262bda(0x1c0)]=function(){const _0x302369=_0x262bda;VisuMZ['BattleSystemOTB'][_0x302369(0x1bd)][_0x302369(0x1b5)](this),BattleManager[_0x302369(0x276)]();},Game_Battler[_0x262bda(0x111)]=VisuMZ[_0x262bda(0xf6)][_0x262bda(0x251)][_0x262bda(0x23d)]['PostStunInfinitySpeed'],VisuMZ['BattleSystemOTB'][_0x262bda(0x223)]=Game_Battler[_0x262bda(0x1a8)]['onBattleStart'],Game_Battler[_0x262bda(0x1a8)][_0x262bda(0xc9)]=function(_0x217786){const _0x53c4bd=_0x262bda;VisuMZ['BattleSystemOTB'][_0x53c4bd(0x223)][_0x53c4bd(0x1b5)](this,_0x217786),this[_0x53c4bd(0x27e)](_0x217786);},Game_Battler['prototype']['onBattleStartOTB']=function(_0x5031b1){const _0x52329f=_0x262bda;if(!BattleManager['isOTB']())return;this['_otbTimesActedThisTurn']=0x0,this[_0x52329f(0x1a1)]=undefined;},VisuMZ['BattleSystemOTB'][_0x262bda(0x268)]=Game_Battler[_0x262bda(0x1a8)][_0x262bda(0x8a)],Game_Battler[_0x262bda(0x1a8)][_0x262bda(0x8a)]=function(){const _0x27fff0=_0x262bda;VisuMZ[_0x27fff0(0xf6)][_0x27fff0(0x268)][_0x27fff0(0x1b5)](this),this[_0x27fff0(0x284)]();},Game_Battler['prototype'][_0x262bda(0x284)]=function(){const _0xc0a04a=_0x262bda;if(!BattleManager[_0xc0a04a(0x172)]())return;this[_0xc0a04a(0x113)]=0x0;},Game_Battler['prototype'][_0x262bda(0x185)]=function(){const _0x3aae98=_0x262bda;if(!BattleManager[_0x3aae98(0x172)]())return;this[_0x3aae98(0x113)]=this[_0x3aae98(0x113)]||0x0,this[_0x3aae98(0x113)]++;if(this['numActions']()>0x0&&this===BattleManager[_0x3aae98(0x25d)]){const _0x422970=BattleManager[_0x3aae98(0x137)];if(_0x422970[_0x3aae98(0x1ea)]>0x0&&_0x422970[0x0]!==this)return;const _0x5498c9=this['battler']();if(_0x5498c9&&BattleManager[_0x3aae98(0xd5)](this))_0x5498c9[_0x3aae98(0x1c2)]();}},BattleManager['isNextOtbSubject']=function(_0x2cfdb4){const _0x5670fc=_0x262bda;if(!_0x2cfdb4)return![];return this[_0x5670fc(0x280)][0x0]===_0x2cfdb4;},VisuMZ['BattleSystemOTB'][_0x262bda(0x257)]=Game_Battler[_0x262bda(0x1a8)][_0x262bda(0x188)],Game_Battler['prototype'][_0x262bda(0x188)]=function(){const _0x4acb47=_0x262bda;VisuMZ[_0x4acb47(0xf6)][_0x4acb47(0x257)][_0x4acb47(0x1b5)](this),this[_0x4acb47(0x102)]();},Game_Battler[_0x262bda(0x1a8)][_0x262bda(0x102)]=function(){const _0x46259f=_0x262bda;if(!BattleManager['isOTB']())return;this[_0x46259f(0x113)]=0x0;},VisuMZ[_0x262bda(0xf6)][_0x262bda(0xdb)]=Game_Battler[_0x262bda(0x1a8)]['makeSpeed'],Game_Battler['prototype']['makeSpeed']=function(){const _0x2b158a=_0x262bda;BattleManager['isOTB']()?this[_0x2b158a(0x2b1)]():VisuMZ[_0x2b158a(0xf6)][_0x2b158a(0xdb)]['call'](this);},Game_Battler['prototype'][_0x262bda(0x2b1)]=function(){const _0x60ce80=_0x262bda;if(this[_0x60ce80(0xb7)]())this[_0x60ce80(0xa7)]=Infinity;else{const _0x328b96=this['currentAction']()||new Game_Action(this);this[_0x60ce80(0xa7)]=VisuMZ[_0x60ce80(0xf6)][_0x60ce80(0x251)][_0x60ce80(0x23d)][_0x60ce80(0x11f)][_0x60ce80(0x1b5)](_0x328b96);}},Game_Battler['prototype'][_0x262bda(0xb7)]=function(){const _0xc1dafa=_0x262bda;if(!Game_Battler[_0xc1dafa(0x111)])return![];if(!this[_0xc1dafa(0x176)]())return![];if(!this[_0xc1dafa(0x96)]())return![];if(this[_0xc1dafa(0x1fc)]())return![];const _0x3adf0f=JsonEx[_0xc1dafa(0xc2)](this);return _0x3adf0f['_tempActor']=!![],_0x3adf0f[_0xc1dafa(0xc4)]=!![],_0x3adf0f['updateStateTurns'](),_0x3adf0f[_0xc1dafa(0x23e)](0x1),_0x3adf0f[_0xc1dafa(0x23e)](0x2),_0x3adf0f['refresh'](),_0x3adf0f[_0xc1dafa(0x1fc)]();},VisuMZ['BattleSystemOTB'][_0x262bda(0x12f)]=Game_Action[_0x262bda(0x1a8)][_0x262bda(0xce)],Game_Action[_0x262bda(0x1a8)][_0x262bda(0xce)]=function(){const _0x860286=_0x262bda;return BattleManager['isOTB']()?VisuMZ[_0x860286(0xf6)][_0x860286(0x251)][_0x860286(0x23d)]['AllowRandomSpeed']:VisuMZ[_0x860286(0xf6)][_0x860286(0x12f)][_0x860286(0x1b5)](this);},Game_Battler['prototype'][_0x262bda(0x1be)]=function(_0x41721f){const _0xee426c=_0x262bda;if(!this[_0xee426c(0x1fc)]())return;this[_0xee426c(0x113)]=this[_0xee426c(0x113)]||0x0,this[_0xee426c(0x113)]--,BattleManager[_0xee426c(0x8e)](this,_0x41721f,BattleManager[_0xee426c(0x280)]);},Game_Battler[_0x262bda(0x1a8)][_0x262bda(0x14a)]=function(_0x4a7c76,_0x109cea){const _0x584e1a=_0x262bda;if(!this['canMove']())return;_0x109cea?BattleManager[_0x584e1a(0x26e)](this,_0x4a7c76,BattleManager[_0x584e1a(0x280)]):BattleManager[_0x584e1a(0x26e)](this,_0x4a7c76,BattleManager['_otb_actionBattlersNext']);},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x222)]=Game_Battler[_0x262bda(0x1a8)][_0x262bda(0xe2)],Game_Battler[_0x262bda(0x1a8)][_0x262bda(0xe2)]=function(){const _0x31ba6a=_0x262bda;return BattleManager[_0x31ba6a(0x172)]()?this[_0x31ba6a(0x18d)]():VisuMZ[_0x31ba6a(0xf6)][_0x31ba6a(0x222)]['call'](this);},Game_Battler[_0x262bda(0x1a8)][_0x262bda(0x18d)]=function(){const _0x88f884=_0x262bda;if(this[_0x88f884(0x1a1)]!==undefined)return this[_0x88f884(0x1a1)];this[_0x88f884(0x28e)]=this['actionPlusSet']()['length'];const _0x504fb0=this[_0x88f884(0xb3)](),_0x6f16c2=_0x504fb0[_0x88f884(0x1cc)]((_0x20cd85,_0x4384d6)=>Math[_0x88f884(0xa9)]()<_0x4384d6?_0x20cd85+0x1:_0x20cd85,0x1);return this[_0x88f884(0x1a1)]=_0x6f16c2,this[_0x88f884(0x1a1)];},Game_Unit[_0x262bda(0x1a8)]['clearMakeActionTimesCacheOTB']=function(){const _0x3a93dd=_0x262bda;for(const _0x38b1ad of this[_0x3a93dd(0x99)]()){_0x38b1ad&&(_0x38b1ad['_cache_makeActionTimesOTB']=undefined);}},Game_Battler[_0x262bda(0x1a8)]['canChangeOtbTurnOrder']=function(){if(this['speed']()===Infinity)return![];return!![];},Game_Battler[_0x262bda(0x1a8)][_0x262bda(0x155)]=function(_0x4178d5,_0x5a6bcf){const _0x583d86=_0x262bda;if(this[_0x583d86(0xc4)]||this[_0x583d86(0x237)])return;if(!SceneManager[_0x583d86(0x116)]())return;if(!BattleManager[_0x583d86(0x172)]())return;if(this[_0x583d86(0x28e)]!==this[_0x583d86(0xb3)]()[_0x583d86(0x1ea)])this['_last_otb_actionPlusSetLength']=this[_0x583d86(0xb3)]()[_0x583d86(0x1ea)],this[_0x583d86(0x1a1)]=undefined;else return;if(_0x4178d5&&!this[_0x583d86(0x1fc)]())BattleManager[_0x583d86(0x276)]();else!_0x4178d5&&this[_0x583d86(0x1fc)]()&&BattleManager[_0x583d86(0x2a7)](this);if(this[_0x583d86(0x1fc)]()){const _0x30cdb2=this['makeActionTimes']()-_0x5a6bcf;_0x30cdb2>0x0&&(BattleManager['otbAddBattlerToTurnOrderAtEnd'](this,_0x30cdb2,BattleManager[_0x583d86(0x280)]),BattleManager[_0x583d86(0x26e)](this,_0x30cdb2,BattleManager[_0x583d86(0x15c)]));}},VisuMZ['BattleSystemOTB'][_0x262bda(0x275)]=Game_Battler[_0x262bda(0x1a8)][_0x262bda(0xaf)],Game_Battler[_0x262bda(0x1a8)][_0x262bda(0xaf)]=function(_0x4ef710){const _0x279c5f=_0x262bda,_0x111b93=this['canMove'](),_0x3ca115=this['makeActionTimes']();VisuMZ['BattleSystemOTB'][_0x279c5f(0x275)]['call'](this,_0x4ef710),this[_0x279c5f(0x28e)]=undefined,this[_0x279c5f(0x155)](_0x111b93,_0x3ca115);},VisuMZ['BattleSystemOTB'][_0x262bda(0x90)]=Game_Battler['prototype'][_0x262bda(0xbc)],Game_Battler[_0x262bda(0x1a8)]['removeState']=function(_0x4ae17a){const _0x19403d=_0x262bda,_0x475374=this[_0x19403d(0x1fc)](),_0x37e49c=this['makeActionTimes']();VisuMZ[_0x19403d(0xf6)][_0x19403d(0x90)][_0x19403d(0x1b5)](this,_0x4ae17a),this[_0x19403d(0x28e)]=undefined,this[_0x19403d(0x155)](_0x475374,_0x37e49c);},VisuMZ['BattleSystemOTB']['Game_BattlerBase_recoverAll']=Game_BattlerBase[_0x262bda(0x1a8)]['recoverAll'],Game_BattlerBase[_0x262bda(0x1a8)][_0x262bda(0x18e)]=function(){const _0x30fe64=_0x262bda;if(BattleManager[_0x30fe64(0x172)]())this[_0x30fe64(0xbc)](this[_0x30fe64(0x242)]());VisuMZ[_0x30fe64(0xf6)][_0x30fe64(0x247)][_0x30fe64(0x1b5)](this);if(BattleManager[_0x30fe64(0x172)]())this[_0x30fe64(0x1b3)]();},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x218)]=Game_Battler['prototype']['forceAction'],Game_Battler['prototype']['forceAction']=function(_0x280f73,_0x20747f){const _0x3a8e3f=_0x262bda;BattleManager[_0x3a8e3f(0x172)]()?this[_0x3a8e3f(0x135)](_0x280f73,_0x20747f):VisuMZ[_0x3a8e3f(0xf6)]['Game_Battler_forceAction'][_0x3a8e3f(0x1b5)](this,_0x280f73,_0x20747f);},Game_Battler[_0x262bda(0x1a8)]['forceActionOTB']=function(_0x2d367b,_0x406fde){const _0x12755b=_0x262bda,_0x2c450a=new Game_Action(this,!![]);_0x2c450a[_0x12755b(0x2b0)](_0x2d367b),_0x2c450a[_0x12755b(0x294)]=!![];if(_0x406fde===-0x2)_0x2c450a[_0x12755b(0xaa)](this[_0x12755b(0x119)]);else _0x406fde===-0x1?_0x2c450a['decideRandomTarget']():_0x2c450a[_0x12755b(0xaa)](_0x406fde);let _0x2f932e=this['_actions'][_0x12755b(0x285)](_0x495136=>_0x495136[_0x12755b(0x294)]);if(this===BattleManager[_0x12755b(0x25d)])_0x2f932e=Math[_0x12755b(0x1e3)](_0x2f932e,0x0);_0x2f932e++,this[_0x12755b(0x262)][_0x12755b(0x200)](_0x2f932e,0x0,_0x2c450a);},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x245)]=BattleManager[_0x262bda(0xb9)],BattleManager['forceAction']=function(_0x57d25d){const _0x4eddd4=_0x262bda;BattleManager[_0x4eddd4(0x172)]()?this[_0x4eddd4(0x135)](_0x57d25d):VisuMZ[_0x4eddd4(0xf6)][_0x4eddd4(0x245)][_0x4eddd4(0x1b5)](this,_0x57d25d);},BattleManager[_0x262bda(0x135)]=function(_0x56a5e8){const _0x7684c6=_0x262bda;BattleManager[_0x7684c6(0x94)](_0x56a5e8);},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x256)]=Game_Actor['prototype'][_0x262bda(0x88)],Game_Actor[_0x262bda(0x1a8)][_0x262bda(0x88)]=function(){const _0x3c258e=_0x262bda;if(BattleManager[_0x3c258e(0x172)]()){if(this[_0x3c258e(0x233)]())this[_0x3c258e(0x233)]()[_0x3c258e(0x1c2)]();return![];}return VisuMZ[_0x3c258e(0xf6)][_0x3c258e(0x256)][_0x3c258e(0x1b5)](this);},Game_Actor['prototype'][_0x262bda(0x296)]=function(){const _0x2583e8=_0x262bda,_0x535842=this['actor']()[_0x2583e8(0x97)];if(_0x535842[_0x2583e8(0x1f3)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x2583e8(0x2b2);else{if(_0x535842[_0x2583e8(0x1f3)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return _0x2583e8(0x26d);}return Window_OTB_TurnOrder[_0x2583e8(0x251)]['ActorBattlerType'];},Game_Actor['prototype'][_0x262bda(0x168)]=function(){const _0x4d5b1a=_0x262bda,_0x5871af=this[_0x4d5b1a(0x28d)]()[_0x4d5b1a(0x97)];if(_0x5871af[_0x4d5b1a(0x1f3)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x4d5b1a(0x1eb)]();},Game_Actor['prototype'][_0x262bda(0x170)]=function(){const _0x757ac3=_0x262bda,_0x1c244f=this[_0x757ac3(0x28d)]()[_0x757ac3(0x97)];if(_0x1c244f[_0x757ac3(0x1f3)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this['faceIndex']();},Game_Actor[_0x262bda(0x1a8)]['createTurnOrderOTBGraphicIconIndex']=function(){const _0x54455e=_0x262bda,_0x4b0c94=this[_0x54455e(0x28d)]()[_0x54455e(0x97)];if(_0x4b0c94[_0x54455e(0x1f3)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_OTB_TurnOrder[_0x54455e(0x251)]['ActorBattlerIcon'];},Game_Enemy[_0x262bda(0x1a8)][_0x262bda(0x296)]=function(){const _0xa97c99=_0x262bda,_0x4be05f=this[_0xa97c99(0xe9)]()['note'];if(_0x4be05f[_0xa97c99(0x1f3)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x4be05f['match'](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return _0xa97c99(0x26d);}return Window_OTB_TurnOrder[_0xa97c99(0x251)][_0xa97c99(0xbe)];},Game_Enemy[_0x262bda(0x1a8)][_0x262bda(0x168)]=function(){const _0x31e738=_0x262bda,_0x5bf45d=this[_0x31e738(0xe9)]()[_0x31e738(0x97)];if(_0x5bf45d[_0x31e738(0x1f3)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_OTB_TurnOrder['Settings']['EnemyBattlerFaceName'];},Game_Enemy[_0x262bda(0x1a8)][_0x262bda(0x170)]=function(){const _0x2a4ad4=_0x262bda,_0x4cebd7=this[_0x2a4ad4(0xe9)]()['note'];if(_0x4cebd7[_0x2a4ad4(0x1f3)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_OTB_TurnOrder['Settings'][_0x2a4ad4(0x228)];},Game_Enemy[_0x262bda(0x1a8)][_0x262bda(0x213)]=function(){const _0x495e2b=_0x262bda,_0x19eda1=this[_0x495e2b(0xe9)]()[_0x495e2b(0x97)];if(_0x19eda1['match'](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_OTB_TurnOrder[_0x495e2b(0x251)][_0x495e2b(0x199)];},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x159)]=Game_Party[_0x262bda(0x1a8)]['addActor'],Game_Party[_0x262bda(0x1a8)][_0x262bda(0x163)]=function(_0xd5b02e){const _0x28752a=_0x262bda;VisuMZ[_0x28752a(0xf6)][_0x28752a(0x159)][_0x28752a(0x1b5)](this,_0xd5b02e);if(Imported[_0x28752a(0x1ee)])return;SceneManager[_0x28752a(0x116)]()&&BattleManager['isOTB']()&&(BattleManager[_0x28752a(0x276)](),BattleManager[_0x28752a(0x2a7)]($gameActors[_0x28752a(0x28d)](_0xd5b02e)));},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x19b)]=Game_Party['prototype'][_0x262bda(0x258)],Game_Party[_0x262bda(0x1a8)][_0x262bda(0x258)]=function(_0x4aa4f0){const _0x1dd889=_0x262bda;VisuMZ['BattleSystemOTB'][_0x1dd889(0x19b)][_0x1dd889(0x1b5)](this,_0x4aa4f0),SceneManager['isSceneBattle']()&&BattleManager['isOTB']()&&BattleManager['removeActionBattlersOTB']();},VisuMZ['BattleSystemOTB']['Scene_Battle_createActorCommandWindow']=Scene_Battle[_0x262bda(0x1a8)][_0x262bda(0x196)],Scene_Battle[_0x262bda(0x1a8)][_0x262bda(0x196)]=function(){const _0x3107ee=_0x262bda;VisuMZ[_0x3107ee(0xf6)][_0x3107ee(0x21d)][_0x3107ee(0x1b5)](this),BattleManager[_0x3107ee(0x172)]()&&this[_0x3107ee(0x19c)]();},Scene_Battle[_0x262bda(0x1a8)][_0x262bda(0x19c)]=function(){const _0x2ffdf0=_0x262bda,_0x5374de=this[_0x2ffdf0(0x141)];this[_0x2ffdf0(0xd3)]()&&delete _0x5374de[_0x2ffdf0(0x128)]['cancel'];},VisuMZ['BattleSystemOTB'][_0x262bda(0x1f9)]=Scene_Battle[_0x262bda(0x1a8)][_0x262bda(0x219)],Scene_Battle[_0x262bda(0x1a8)][_0x262bda(0x219)]=function(){const _0x3be5a2=_0x262bda;BattleManager[_0x3be5a2(0x172)]()?this[_0x3be5a2(0x84)]():VisuMZ[_0x3be5a2(0xf6)][_0x3be5a2(0x1f9)][_0x3be5a2(0x1b5)](this);},Scene_Battle[_0x262bda(0x1a8)][_0x262bda(0x84)]=function(){const _0x1f3d65=_0x262bda;BattleManager[_0x1f3d65(0x226)](),this[_0x1f3d65(0x1b2)]['setup'](),this[_0x1f3d65(0x141)][_0x1f3d65(0x17a)]();},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x217)]=Scene_Battle[_0x262bda(0x1a8)][_0x262bda(0xbd)],Scene_Battle[_0x262bda(0x1a8)][_0x262bda(0xbd)]=function(){const _0x1e187a=_0x262bda;BattleManager[_0x1e187a(0x172)]()?this[_0x1e187a(0xc7)]():VisuMZ['BattleSystemOTB'][_0x1e187a(0x217)]['call'](this);},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x264)]=Scene_Battle[_0x262bda(0x1a8)]['createAllWindows'],Scene_Battle[_0x262bda(0x1a8)][_0x262bda(0xd6)]=function(){const _0x59d1ce=_0x262bda;VisuMZ[_0x59d1ce(0xf6)]['Scene_Battle_createAllWindows'][_0x59d1ce(0x1b5)](this),this['createOTBTurnOrderWindow']();},Scene_Battle['prototype']['createOTBTurnOrderWindow']=function(){const _0x4ba452=_0x262bda;if(!BattleManager[_0x4ba452(0x172)]())return;this[_0x4ba452(0xca)]=new Window_OTB_TurnOrder();const _0x4da086=this[_0x4ba452(0x133)](this['_windowLayer']);this[_0x4ba452(0xeb)](this[_0x4ba452(0xca)],_0x4da086),this['repositionLogWindowOTB'](),SceneManager[_0x4ba452(0x8c)]()&&this[_0x4ba452(0xca)]['resumeTurnOrderSprites']();},Scene_Battle[_0x262bda(0x1a8)][_0x262bda(0x93)]=function(){const _0x19edc1=_0x262bda,_0x22e655=Window_OTB_TurnOrder[_0x19edc1(0x251)];if(_0x22e655[_0x19edc1(0xa0)]!==_0x19edc1(0x261))return;if(!_0x22e655[_0x19edc1(0x13f)])return;if(!this[_0x19edc1(0x273)])return;const _0x4547d7=this[_0x19edc1(0xca)]['y']-Math['round']((Graphics[_0x19edc1(0x248)]-Graphics['boxHeight'])/0x2),_0x23fad1=_0x4547d7+this['_otbTurnOrderWindow'][_0x19edc1(0x248)];this[_0x19edc1(0x273)]['y']=_0x23fad1+(_0x22e655[_0x19edc1(0x1d9)]||0x0);},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x182)]=Scene_Battle[_0x262bda(0x1a8)][_0x262bda(0x24e)],Scene_Battle[_0x262bda(0x1a8)][_0x262bda(0x24e)]=function(){const _0x2ca69=_0x262bda;BattleManager[_0x2ca69(0x226)](),VisuMZ[_0x2ca69(0xf6)][_0x2ca69(0x182)][_0x2ca69(0x1b5)](this);},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x189)]=Scene_Battle['prototype'][_0x262bda(0x260)],Scene_Battle[_0x262bda(0x1a8)]['commandGuard']=function(){const _0x3ab4a2=_0x262bda;BattleManager[_0x3ab4a2(0x226)](),VisuMZ[_0x3ab4a2(0xf6)]['Scene_Battle_commandGuard'][_0x3ab4a2(0x1b5)](this);},VisuMZ['BattleSystemOTB'][_0x262bda(0x164)]=Scene_Battle[_0x262bda(0x1a8)][_0x262bda(0x220)],Scene_Battle[_0x262bda(0x1a8)]['onActorOk']=function(){const _0x3d8795=_0x262bda;BattleManager[_0x3d8795(0x226)](),VisuMZ['BattleSystemOTB'][_0x3d8795(0x164)]['call'](this);},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x154)]=Scene_Battle['prototype']['onActorCancel'],Scene_Battle[_0x262bda(0x1a8)][_0x262bda(0x1e2)]=function(){const _0x481759=_0x262bda;BattleManager[_0x481759(0x226)](),VisuMZ[_0x481759(0xf6)][_0x481759(0x154)]['call'](this);},VisuMZ[_0x262bda(0xf6)][_0x262bda(0xc3)]=Scene_Battle['prototype'][_0x262bda(0xb0)],Scene_Battle[_0x262bda(0x1a8)]['onEnemyOk']=function(){const _0x4c7e6b=_0x262bda;BattleManager['otbPreviewOrderClear'](),VisuMZ[_0x4c7e6b(0xf6)]['Scene_Battle_onEnemyOk']['call'](this);},VisuMZ[_0x262bda(0xf6)][_0x262bda(0xba)]=Scene_Battle[_0x262bda(0x1a8)]['onEnemyCancel'],Scene_Battle['prototype'][_0x262bda(0x20d)]=function(){const _0x424251=_0x262bda;BattleManager[_0x424251(0x226)](),VisuMZ[_0x424251(0xf6)][_0x424251(0xba)][_0x424251(0x1b5)](this);},VisuMZ['BattleSystemOTB'][_0x262bda(0xa4)]=Scene_Battle['prototype'][_0x262bda(0x1c4)],Scene_Battle[_0x262bda(0x1a8)]['onSkillOk']=function(){const _0x4eef99=_0x262bda;BattleManager['otbPreviewOrderClear'](),VisuMZ['BattleSystemOTB'][_0x4eef99(0xa4)][_0x4eef99(0x1b5)](this);},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x171)]=Scene_Battle['prototype'][_0x262bda(0x11a)],Scene_Battle['prototype'][_0x262bda(0x11a)]=function(){const _0x343628=_0x262bda;BattleManager[_0x343628(0x226)](),VisuMZ[_0x343628(0xf6)][_0x343628(0x171)][_0x343628(0x1b5)](this);},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x153)]=Scene_Battle[_0x262bda(0x1a8)][_0x262bda(0x10c)],Scene_Battle['prototype'][_0x262bda(0x10c)]=function(){const _0x27cfac=_0x262bda;BattleManager[_0x27cfac(0x226)](),VisuMZ['BattleSystemOTB'][_0x27cfac(0x153)]['call'](this);},VisuMZ[_0x262bda(0xf6)][_0x262bda(0x192)]=Scene_Battle['prototype'][_0x262bda(0x86)],Scene_Battle[_0x262bda(0x1a8)][_0x262bda(0x86)]=function(){const _0x7d1fd8=_0x262bda;BattleManager['otbPreviewOrderClear'](),VisuMZ[_0x7d1fd8(0xf6)][_0x7d1fd8(0x192)][_0x7d1fd8(0x1b5)](this);},VisuMZ['BattleSystemOTB'][_0x262bda(0x1da)]=Scene_Battle[_0x262bda(0x1a8)][_0x262bda(0x290)],Scene_Battle[_0x262bda(0x1a8)][_0x262bda(0x290)]=function(){const _0x5b2fdf=_0x262bda;BattleManager[_0x5b2fdf(0x226)](),VisuMZ['BattleSystemOTB'][_0x5b2fdf(0x1da)][_0x5b2fdf(0x1b5)](this);};function Sprite_OTB_TurnOrder_Battler(){const _0x297c54=_0x262bda;this[_0x297c54(0x11e)](...arguments);}Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)]=Object['create'](Sprite_Clickable['prototype']),Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x1f0)]=Sprite_OTB_TurnOrder_Battler,Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x11e)]=function(_0x500442,_0x5c9d35,_0x7e6049){const _0x201af9=_0x262bda;this['initMembers'](_0x500442,_0x5c9d35,_0x7e6049),Sprite_Clickable[_0x201af9(0x1a8)][_0x201af9(0x11e)][_0x201af9(0x1b5)](this),this[_0x201af9(0x277)]=0x0,this['createChildren'](),this[_0x201af9(0x24b)]();},Sprite_OTB_TurnOrder_Battler['prototype'][_0x262bda(0x1dd)]=function(_0x28cabe,_0x443e49,_0x14b503){const _0x50fd82=_0x262bda;this[_0x50fd82(0xe6)]=_0x28cabe['isActor']()?$gameParty:$gameTroop,this[_0x50fd82(0xd0)]=_0x28cabe[_0x50fd82(0x123)](),this[_0x50fd82(0x1d8)]=_0x443e49,this['_sourceArray']=_0x14b503;const _0x553c76=Window_OTB_TurnOrder['Settings'],_0x5b371e=this[_0x50fd82(0x28c)]();this[_0x50fd82(0x29a)]=0x0,this[_0x50fd82(0x20e)]=_0x553c76[_0x50fd82(0x124)]?-_0x553c76['SpriteThin']:this[_0x50fd82(0x156)]()[_0x50fd82(0x1e9)],this[_0x50fd82(0xf3)]=0x0,this[_0x50fd82(0xd4)]=0x0,this[_0x50fd82(0xd8)]=0xff,this[_0x50fd82(0x25f)]=![],this[_0x50fd82(0x9a)]=![],this['_containerWidth']=0x0,this[_0x50fd82(0x255)]=0x0;},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x225)]=function(){const _0x493378=_0x262bda;this[_0x493378(0x1df)](),this[_0x493378(0x92)](),this[_0x493378(0x89)](),this[_0x493378(0x9e)](),this['createLetterSprite']();},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)]['createInitialPositions']=function(){const _0x326118=_0x262bda;this['x']=this[_0x326118(0x20e)],this['y']=this['_positionTargetY'];},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x28c)]=function(){return!![];},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x1ed)]=function(){const _0x55114a=_0x262bda,_0x53b762=Window_OTB_TurnOrder[_0x55114a(0x251)];return _0x53b762['SpriteThin'];},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x167)]=function(){const _0x207e3a=_0x262bda,_0x3ad4b9=Window_OTB_TurnOrder[_0x207e3a(0x251)];return _0x3ad4b9['SpriteLength'];},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0xe0)]=function(){const _0x59bc78=_0x262bda;return this['_unit']===$gameParty?_0x59bc78(0x1b8):_0x59bc78(0xd9);},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x92)]=function(){const _0x5441c4=_0x262bda;if(!Window_OTB_TurnOrder['Settings'][_0x5441c4(0x151)])return;const _0x415cd6=Window_OTB_TurnOrder[_0x5441c4(0x251)],_0x2f5280=this[_0x5441c4(0xe0)](),_0x3aa251=_0x5441c4(0x1b7)[_0x5441c4(0x104)](_0x2f5280),_0x1de2e4=new Sprite();_0x1de2e4[_0x5441c4(0x241)]['x']=this[_0x5441c4(0x241)]['x'],_0x1de2e4['anchor']['y']=this[_0x5441c4(0x241)]['y'];if(_0x415cd6[_0x3aa251])_0x1de2e4[_0x5441c4(0x1db)]=ImageManager[_0x5441c4(0x186)](_0x415cd6[_0x3aa251]);else{const _0x2e5570=this[_0x5441c4(0x1ed)](),_0x4ee12a=this[_0x5441c4(0x167)]();_0x1de2e4['bitmap']=new Bitmap(_0x2e5570,_0x4ee12a);const _0x1f329b=ColorManager['getColor'](_0x415cd6[_0x5441c4(0x98)[_0x5441c4(0x104)](_0x2f5280)]),_0x1f4c9c=ColorManager[_0x5441c4(0x1f4)](_0x415cd6[_0x5441c4(0x114)[_0x5441c4(0x104)](_0x2f5280)]);_0x1de2e4[_0x5441c4(0x1db)][_0x5441c4(0xab)](0x0,0x0,_0x2e5570,_0x4ee12a,_0x1f329b,_0x1f4c9c,!![]);}this['_backgroundSprite']=_0x1de2e4,this[_0x5441c4(0xe7)](this[_0x5441c4(0x1ca)]),this['width']=this[_0x5441c4(0x1ca)][_0x5441c4(0x1e9)],this[_0x5441c4(0x248)]=this['_backgroundSprite']['height'];},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)]['createGraphicSprite']=function(){const _0x45e57c=_0x262bda,_0x321b91=new Sprite();_0x321b91['anchor']['x']=this[_0x45e57c(0x241)]['x'],_0x321b91[_0x45e57c(0x241)]['y']=this[_0x45e57c(0x241)]['y'],this['_graphicSprite']=_0x321b91,this[_0x45e57c(0xe7)](this['_graphicSprite']),this[_0x45e57c(0x17e)]();},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)]['createBorderSprite']=function(){const _0x39dcfe=_0x262bda;if(!Window_OTB_TurnOrder[_0x39dcfe(0x251)][_0x39dcfe(0x120)])return;const _0x454053=Window_OTB_TurnOrder[_0x39dcfe(0x251)],_0xcbed8d=this['getUnitSideSide'](),_0x175b8e=_0x39dcfe(0x145)['format'](_0xcbed8d),_0x35d7d=new Sprite();_0x35d7d[_0x39dcfe(0x241)]['x']=this['anchor']['x'],_0x35d7d[_0x39dcfe(0x241)]['y']=this[_0x39dcfe(0x241)]['y'];if(_0x454053[_0x175b8e])_0x35d7d[_0x39dcfe(0x1db)]=ImageManager[_0x39dcfe(0x186)](_0x454053[_0x175b8e]);else{let _0x58ba1d=this[_0x39dcfe(0x1ed)](),_0x59bff5=this[_0x39dcfe(0x167)](),_0x509356=this[_0x39dcfe(0x183)]();_0x35d7d[_0x39dcfe(0x1db)]=new Bitmap(_0x58ba1d,_0x59bff5);const _0x5f09c2=_0x39dcfe(0x85),_0x47a61b=ColorManager[_0x39dcfe(0x1f4)](_0x454053['%1BorderColor'['format'](_0xcbed8d)]);_0x35d7d[_0x39dcfe(0x1db)]['fillRect'](0x0,0x0,_0x58ba1d,_0x59bff5,_0x5f09c2),_0x58ba1d-=0x2,_0x59bff5-=0x2,_0x35d7d['bitmap']['fillRect'](0x1,0x1,_0x58ba1d,_0x59bff5,_0x47a61b),_0x58ba1d-=_0x509356*0x2,_0x59bff5-=_0x509356*0x2,_0x35d7d[_0x39dcfe(0x1db)][_0x39dcfe(0x1a6)](0x1+_0x509356,0x1+_0x509356,_0x58ba1d,_0x59bff5,_0x5f09c2),_0x58ba1d-=0x2,_0x59bff5-=0x2,_0x509356+=0x1,_0x35d7d[_0x39dcfe(0x1db)][_0x39dcfe(0x1de)](0x1+_0x509356,0x1+_0x509356,_0x58ba1d,_0x59bff5);}this[_0x39dcfe(0x1ca)]=_0x35d7d,this[_0x39dcfe(0xe7)](this[_0x39dcfe(0x1ca)]);},Sprite_OTB_TurnOrder_Battler['prototype']['getBorderThickness']=function(){const _0x22bcf5=_0x262bda,_0x10a7c4=Window_OTB_TurnOrder[_0x22bcf5(0x251)];return _0x10a7c4[_0x22bcf5(0xd2)];},Sprite_OTB_TurnOrder_Battler['prototype'][_0x262bda(0x243)]=function(){const _0x1159cb=_0x262bda,_0x9765c5=Window_OTB_TurnOrder[_0x1159cb(0x251)];if(!_0x9765c5[_0x1159cb(0x149)])return;if(this[_0x1159cb(0xe6)]===$gameParty)return;const _0x3b36c2=this['bitmapWidth'](),_0x12055e=this[_0x1159cb(0x167)](),_0x1ed923=new Sprite();_0x1ed923['anchor']['x']=this[_0x1159cb(0x241)]['x'],_0x1ed923[_0x1159cb(0x241)]['y']=this['anchor']['y'],_0x1ed923[_0x1159cb(0x1db)]=new Bitmap(_0x3b36c2,_0x12055e),this[_0x1159cb(0x208)]=_0x1ed923,this[_0x1159cb(0xe7)](this[_0x1159cb(0x208)]);},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x233)]=function(){const _0x4cb77e=_0x262bda;return this[_0x4cb77e(0xe6)]?this['_unit'][_0x4cb77e(0x99)]()[this['_index']]:null;},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x281)]=function(){const _0x11441e=_0x262bda;Sprite_Clickable[_0x11441e(0x1a8)][_0x11441e(0x281)][_0x11441e(0x1b5)](this),this[_0x11441e(0x107)](),this['checkOpacity'](),this[_0x11441e(0x1d3)](),this[_0x11441e(0x179)](),this[_0x11441e(0x2ad)](),this[_0x11441e(0x15d)](),this[_0x11441e(0x278)]();},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x214)]=function(_0x37a2d7,_0x2cd3d0){const _0x403464=_0x262bda,_0x40fdd8=Window_OTB_TurnOrder[_0x403464(0x251)];this[_0x403464(0x29a)]=_0x40fdd8[_0x403464(0x1cf)],this['_positionTargetX']=_0x37a2d7,this[_0x403464(0xf3)]=_0x2cd3d0;},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x107)]=function(){const _0x354c30=_0x262bda;if(this[_0x354c30(0x29a)]>0x0){const _0x237440=this[_0x354c30(0x29a)];this['x']=(this['x']*(_0x237440-0x1)+this[_0x354c30(0x20e)])/_0x237440,this['y']=(this['y']*(_0x237440-0x1)+this[_0x354c30(0xf3)])/_0x237440,this[_0x354c30(0x29a)]--;}if(this[_0x354c30(0x29a)]<=0x0){this['x']=this[_0x354c30(0x20e)],this['y']=this[_0x354c30(0xf3)];if(this[_0x354c30(0x277)]<0xff&&!this[_0x354c30(0x1e8)]&&this[_0x354c30(0xd4)]<=0x0){const _0x5701c5=this[_0x354c30(0x233)]();_0x5701c5&&(this[_0x354c30(0xd8)]=_0x5701c5[_0x354c30(0x176)]()&&_0x5701c5[_0x354c30(0x96)]()?0xff:0x0);}}},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)]['defaultPosition']=function(){return 0x1;},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x156)]=function(){const _0x4f3fdd=_0x262bda;return SceneManager[_0x4f3fdd(0x252)][_0x4f3fdd(0xca)];},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)]['containerPosition']=function(){const _0x5710c4=_0x262bda,_0x2e16cf=this[_0x5710c4(0x233)]();if(!_0x2e16cf)return this[_0x5710c4(0x2a1)]();if(_0x2e16cf===BattleManager[_0x5710c4(0x25d)])return 0x0;if(BattleManager['_actionBattlers'][_0x5710c4(0x2af)](_0x2e16cf)){const _0x18f699=BattleManager['_actionBattlers'][_0x5710c4(0x144)](_0x2e16cf)+0x1;return _0x18f699;}return this[_0x5710c4(0x2a1)]();},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x286)]=function(_0x3ade01){const _0x4212c4=_0x262bda,_0x53f148=Window_OTB_TurnOrder[_0x4212c4(0x251)];this['_fadeDuration']=_0x53f148[_0x4212c4(0x1cf)],this[_0x4212c4(0xd8)]=_0x3ade01;},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x24b)]=function(){const _0x49b295=_0x262bda,_0x3defae=this[_0x49b295(0x233)]();if(!_0x3defae)return;if(this[_0x49b295(0x25f)]===_0x3defae[_0x49b295(0x176)]()&&this[_0x49b295(0x9a)]===_0x3defae[_0x49b295(0x96)]())return;this[_0x49b295(0x25f)]=_0x3defae['isAlive'](),this[_0x49b295(0x9a)]=_0x3defae[_0x49b295(0x96)]();let _0x51fd5d=this[_0x49b295(0x25f)]&&this['_isAppeared']?0xff:0x0;this[_0x49b295(0x286)](_0x51fd5d);},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x1d3)]=function(){const _0x4387e1=_0x262bda;if(this[_0x4387e1(0xd4)]>0x0){const _0x44b20c=this['_fadeDuration'];this['opacity']=(this[_0x4387e1(0x277)]*(_0x44b20c-0x1)+this[_0x4387e1(0xd8)])/_0x44b20c,this[_0x4387e1(0xd4)]--,this[_0x4387e1(0xd4)]<=0x0&&(this[_0x4387e1(0x277)]=this['_fadeTarget']);}if(this[_0x4387e1(0x1e8)])return;BattleManager[_0x4387e1(0xf4)]==='battleEnd'&&(this[_0x4387e1(0x1e8)]=!![],this[_0x4387e1(0x286)](0x0));},Sprite_OTB_TurnOrder_Battler['prototype'][_0x262bda(0x179)]=function(){const _0x5bc8f2=_0x262bda,_0x18670d=this[_0x5bc8f2(0x233)]();if(!_0x18670d)return;const _0xf36743=Window_OTB_TurnOrder[_0x5bc8f2(0x251)],_0xa9a925=this['_unit']===$gameParty?_0x5bc8f2(0x1b8):_0x5bc8f2(0xd9);let _0xd5b673=_0x18670d['TurnOrderOTBGraphicType']();if(_0x18670d[_0x5bc8f2(0x91)]()&&_0xd5b673===_0x5bc8f2(0xe9))_0xd5b673=_0x5bc8f2(0x2b2);else _0x18670d[_0x5bc8f2(0x1d5)]()&&_0xd5b673==='svactor'&&(_0xd5b673=_0x5bc8f2(0xe9));if(this['_graphicType']!==_0xd5b673)return this[_0x5bc8f2(0x17e)]();switch(this[_0x5bc8f2(0x13b)]){case'face':if(this['_graphicFaceName']!==_0x18670d[_0x5bc8f2(0x1ec)]())return this[_0x5bc8f2(0x17e)]();if(this[_0x5bc8f2(0x29e)]!==_0x18670d[_0x5bc8f2(0xf1)]())return this[_0x5bc8f2(0x17e)]();break;case _0x5bc8f2(0x26d):if(this[_0x5bc8f2(0x169)]!==_0x18670d['TurnOrderOTBGraphicIconIndex']())return this[_0x5bc8f2(0x17e)]();break;case'enemy':if(_0x18670d[_0x5bc8f2(0x2b3)]()){if(this[_0x5bc8f2(0x16a)]!==_0x18670d['svBattlerName']())return this[_0x5bc8f2(0x17e)]();}else{if(this[_0x5bc8f2(0x246)]!==_0x18670d[_0x5bc8f2(0x2a5)]())return this[_0x5bc8f2(0x17e)]();}break;case'svactor':if(_0x18670d['isActor']()){if(this[_0x5bc8f2(0x16a)]!==_0x18670d['battlerName']())return this[_0x5bc8f2(0x17e)]();}else{if(this[_0x5bc8f2(0x246)]!==_0x18670d[_0x5bc8f2(0x2a5)]())return this[_0x5bc8f2(0x17e)]();}break;}},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x17e)]=function(){const _0x4ca002=_0x262bda,_0x23f7b3=this['battler']();if(!_0x23f7b3)return;this[_0x4ca002(0x13b)]=_0x23f7b3['TurnOrderOTBGraphicType']();if(_0x23f7b3[_0x4ca002(0x91)]()&&this[_0x4ca002(0x13b)]===_0x4ca002(0xe9))this[_0x4ca002(0x13b)]=_0x4ca002(0x2b2);else _0x23f7b3['isEnemy']()&&this[_0x4ca002(0x13b)]===_0x4ca002(0x118)&&(this[_0x4ca002(0x13b)]=_0x4ca002(0xe9));let _0x326af6;switch(this[_0x4ca002(0x13b)]){case'face':this['_graphicFaceName']=_0x23f7b3[_0x4ca002(0x1ec)](),this['_graphicFaceIndex']=_0x23f7b3[_0x4ca002(0xf1)](),_0x326af6=ImageManager['loadFace'](this['_graphicFaceName']),_0x326af6[_0x4ca002(0x174)](this[_0x4ca002(0xc1)]['bind'](this,_0x326af6));break;case _0x4ca002(0x26d):this[_0x4ca002(0x169)]=_0x23f7b3[_0x4ca002(0x213)](),_0x326af6=ImageManager[_0x4ca002(0x186)](_0x4ca002(0x1aa)),_0x326af6[_0x4ca002(0x174)](this['changeIconGraphicBitmap'][_0x4ca002(0x9d)](this,_0x326af6));break;case _0x4ca002(0xe9):if(_0x23f7b3['hasSvBattler']())this[_0x4ca002(0x16a)]=_0x23f7b3[_0x4ca002(0x8f)](),_0x326af6=ImageManager[_0x4ca002(0x16c)](this[_0x4ca002(0x16a)]),_0x326af6[_0x4ca002(0x174)](this[_0x4ca002(0x1f1)][_0x4ca002(0x9d)](this,_0x326af6));else $gameSystem[_0x4ca002(0x1d4)]()?(this[_0x4ca002(0x246)]=_0x23f7b3[_0x4ca002(0x2a5)](),_0x326af6=ImageManager[_0x4ca002(0x146)](this[_0x4ca002(0x246)]),_0x326af6[_0x4ca002(0x174)](this['changeEnemyGraphicBitmap'][_0x4ca002(0x9d)](this,_0x326af6))):(this[_0x4ca002(0x246)]=_0x23f7b3['battlerName'](),_0x326af6=ImageManager['loadEnemy'](this[_0x4ca002(0x246)]),_0x326af6['addLoadListener'](this[_0x4ca002(0xd1)][_0x4ca002(0x9d)](this,_0x326af6)));break;case _0x4ca002(0x118):this[_0x4ca002(0x16a)]=_0x23f7b3['battlerName'](),_0x326af6=ImageManager[_0x4ca002(0x16c)](this[_0x4ca002(0x16a)]),_0x326af6[_0x4ca002(0x174)](this[_0x4ca002(0x1f1)][_0x4ca002(0x9d)](this,_0x326af6));break;}},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)]['changeFaceGraphicBitmap']=function(_0x4f325d){const _0x5f37dc=_0x262bda,_0x44d995=this[_0x5f37dc(0x29e)],_0x2c93b5=this[_0x5f37dc(0x1ed)](),_0x2d7274=this[_0x5f37dc(0x167)](),_0x2286aa=Math['max'](_0x2c93b5,_0x2d7274);this[_0x5f37dc(0xf2)]['bitmap']=new Bitmap(_0x2c93b5,_0x2d7274);const _0x58a660=this[_0x5f37dc(0xf2)]['bitmap'],_0x4274fa=ImageManager[_0x5f37dc(0x29f)],_0x155a56=ImageManager[_0x5f37dc(0x195)],_0x330c59=_0x2286aa/Math[_0x5f37dc(0x1e3)](_0x4274fa,_0x155a56),_0x1a6dd7=ImageManager['faceWidth'],_0x3140b0=ImageManager[_0x5f37dc(0x195)],_0x725826=_0x44d995%0x4*_0x4274fa+(_0x4274fa-_0x1a6dd7)/0x2,_0x32102d=Math[_0x5f37dc(0x1d7)](_0x44d995/0x4)*_0x155a56+(_0x155a56-_0x3140b0)/0x2,_0x4eeab8=(_0x2c93b5-_0x4274fa*_0x330c59)/0x2,_0x453216=(_0x2d7274-_0x155a56*_0x330c59)/0x2;_0x58a660[_0x5f37dc(0x190)](_0x4f325d,_0x725826,_0x32102d,_0x1a6dd7,_0x3140b0,_0x4eeab8,_0x453216,_0x2286aa,_0x2286aa);},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x1fa)]=function(_0x4147b8){const _0x481d27=_0x262bda,_0x456914=this[_0x481d27(0x169)],_0x5d189b=this[_0x481d27(0x1ed)](),_0x191327=this['bitmapHeight']();this['_graphicSprite']['bitmap']=new Bitmap(_0x5d189b,_0x191327);const _0xd8356c=this[_0x481d27(0xf2)][_0x481d27(0x1db)],_0x5c0f0a=ImageManager[_0x481d27(0x28a)],_0x1392c9=ImageManager[_0x481d27(0x19d)],_0x188459=Math[_0x481d27(0x9f)](_0x5c0f0a,_0x1392c9,_0x5d189b,_0x191327),_0x20e057=_0x456914%0x10*_0x5c0f0a,_0x1e3c91=Math['floor'](_0x456914/0x10)*_0x1392c9,_0x18e0c4=Math['floor'](Math[_0x481d27(0x1e3)](_0x5d189b-_0x188459,0x0)/0x2),_0x1489c5=Math[_0x481d27(0x1d7)](Math[_0x481d27(0x1e3)](_0x191327-_0x188459,0x0)/0x2);_0xd8356c[_0x481d27(0x190)](_0x4147b8,_0x20e057,_0x1e3c91,_0x5c0f0a,_0x1392c9,_0x18e0c4,_0x1489c5,_0x188459,_0x188459);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x262bda(0x1f1)]=function(_0x1755f7){const _0x405dd1=_0x262bda,_0x22568a=this[_0x405dd1(0x1ed)](),_0x4b5ec2=this['bitmapHeight'](),_0x199f52=Math['min'](_0x22568a,_0x4b5ec2);this[_0x405dd1(0xf2)][_0x405dd1(0x1db)]=new Bitmap(_0x22568a,_0x4b5ec2);const _0x8a6418=this[_0x405dd1(0xf2)][_0x405dd1(0x1db)],_0x65bb79=this[_0x405dd1(0x16a)][_0x405dd1(0x1f3)](/\$/i),_0x5c159b=_0x65bb79?0x1:ImageManager[_0x405dd1(0x1cd)],_0x49dac6=_0x65bb79?0x1:ImageManager[_0x405dd1(0x22a)],_0x5c5fdc=_0x1755f7[_0x405dd1(0x1e9)]/_0x5c159b,_0x522770=_0x1755f7[_0x405dd1(0x248)]/_0x49dac6,_0x15e430=Math[_0x405dd1(0x9f)](0x1,_0x199f52/_0x5c5fdc,_0x199f52/_0x522770),_0xad97a3=_0x5c5fdc*_0x15e430,_0x44dcec=_0x522770*_0x15e430,_0x1a8797=Math[_0x405dd1(0x19a)]((_0x22568a-_0xad97a3)/0x2),_0x422b7d=Math['round']((_0x4b5ec2-_0x44dcec)/0x2);_0x8a6418[_0x405dd1(0x190)](_0x1755f7,0x0,0x0,_0x5c5fdc,_0x522770,_0x1a8797,_0x422b7d,_0xad97a3,_0x44dcec);},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0xd1)]=function(_0x3a86e5){const _0x14a9ab=_0x262bda,_0x26c424=Window_OTB_TurnOrder[_0x14a9ab(0x251)],_0x29c668=this[_0x14a9ab(0x1ed)](),_0x3770c0=this[_0x14a9ab(0x167)](),_0x2ab1be=Math[_0x14a9ab(0x9f)](_0x29c668,_0x3770c0);this[_0x14a9ab(0xf2)][_0x14a9ab(0x1db)]=new Bitmap(_0x29c668,_0x3770c0);const _0xd109e2=this[_0x14a9ab(0xf2)][_0x14a9ab(0x1db)],_0x21d20e=Math[_0x14a9ab(0x9f)](0x1,_0x2ab1be/_0x3a86e5[_0x14a9ab(0x1e9)],_0x2ab1be/_0x3a86e5['height']),_0x203d72=_0x3a86e5[_0x14a9ab(0x1e9)]*_0x21d20e,_0x32215c=_0x3a86e5['height']*_0x21d20e,_0x4e6ce4=Math['round']((_0x29c668-_0x203d72)/0x2),_0x1200be=Math[_0x14a9ab(0x19a)]((_0x3770c0-_0x32215c)/0x2);_0xd109e2['blt'](_0x3a86e5,0x0,0x0,_0x3a86e5[_0x14a9ab(0x1e9)],_0x3a86e5['height'],_0x4e6ce4,_0x1200be,_0x203d72,_0x32215c);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x262bda(0x2ad)]=function(){const _0x3035fe=_0x262bda,_0x7ee74f=this[_0x3035fe(0x233)]();if(!_0x7ee74f)return;if(!_0x7ee74f[_0x3035fe(0x1d5)]())return;if(this['_graphicHue']===_0x7ee74f['battlerHue']())return;this[_0x3035fe(0x24f)]=_0x7ee74f[_0x3035fe(0x106)](),this[_0x3035fe(0xf2)]['setHue'](_0x7ee74f[_0x3035fe(0x2b3)]()?0x0:this['_graphicHue']);},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x15d)]=function(){const _0x14b9e0=_0x262bda;if(!this[_0x14b9e0(0x208)])return;const _0x1cdc2d=this[_0x14b9e0(0x233)]();if(!_0x1cdc2d)return;if(this[_0x14b9e0(0x211)]===_0x1cdc2d[_0x14b9e0(0x211)]&&this[_0x14b9e0(0xcd)]===_0x1cdc2d[_0x14b9e0(0xcd)])return;this['_letter']=_0x1cdc2d[_0x14b9e0(0x211)],this[_0x14b9e0(0xcd)]=_0x1cdc2d['_plural'];const _0x3ca6c6=Window_OTB_TurnOrder[_0x14b9e0(0x251)],_0x2cae88=this[_0x14b9e0(0x1ed)](),_0x403318=this[_0x14b9e0(0x167)](),_0x33c433=this[_0x14b9e0(0x208)][_0x14b9e0(0x1db)];_0x33c433[_0x14b9e0(0x131)]();if(!this['_plural'])return;_0x33c433[_0x14b9e0(0x17b)]=_0x3ca6c6[_0x14b9e0(0x232)]||$gameSystem['mainFontFace'](),_0x33c433[_0x14b9e0(0x279)]=_0x3ca6c6['EnemyBattlerFontSize']||0x10,_0x3ca6c6[_0x14b9e0(0x124)]?_0x33c433[_0x14b9e0(0x15a)](this['_letter'][_0x14b9e0(0x22f)](),_0x2cae88*0x1/0x8,_0x403318/0x2,_0x2cae88,_0x403318/0x2,_0x14b9e0(0xc6)):_0x33c433[_0x14b9e0(0x15a)](this[_0x14b9e0(0x211)][_0x14b9e0(0x22f)](),0x0,_0x403318/0x2,_0x2cae88*0x7/0x8,_0x403318/0x2,'right');},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x278)]=function(){const _0x1160f9=_0x262bda,_0x22bc69=this[_0x1160f9(0x233)]();if(!_0x22bc69)return;const _0x218597=_0x22bc69[_0x1160f9(0x233)]();if(!_0x218597)return;const _0x571612=_0x218597[_0x1160f9(0x1ae)]();if(!_0x571612)return;this[_0x1160f9(0xef)](_0x571612[_0x1160f9(0x1c1)]);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x262bda(0x26f)]=function(){return null;},Sprite_OTB_TurnOrder_Battler['prototype']['changeSourceArray']=function(_0x54f98e){const _0x37ee5f=_0x262bda;this[_0x37ee5f(0xc5)]=_0x54f98e,this[_0x37ee5f(0x22d)](),this[_0x37ee5f(0xc5)]===null&&(this[_0x37ee5f(0x1d8)]=-0x1);},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x22d)]=function(){const _0x2b0528=_0x262bda,_0x17e068=this[_0x2b0528(0x156)]();if(!_0x17e068)return;const _0x30d9e8=Window_OTB_TurnOrder[_0x2b0528(0x251)],_0x75a30=_0x30d9e8[_0x2b0528(0x124)],_0x16605e=this[_0x2b0528(0xc5)]===_0x17e068[_0x2b0528(0xec)]?!![]:![],_0x43a8a0=this['_instance']===-0x1&&BattleManager[_0x2b0528(0x25d)]===this['battler'](),_0x4bab1e=_0x17e068[_0x2b0528(0x230)]-_0x30d9e8[_0x2b0528(0xe8)];let _0x15a7c9=Math[_0x2b0528(0x18f)](_0x4bab1e/(this[_0x2b0528(0xc5)][_0x2b0528(0x1ea)]-0x1||0x1));_0x15a7c9=Math[_0x2b0528(0x9f)](_0x30d9e8[_0x2b0528(0xe8)],_0x15a7c9);let _0x2e8504=0x0,_0x15b6c2=0x0,_0x30df6b=_0x43a8a0?-0x1:this[_0x2b0528(0xc5)][_0x2b0528(0x144)](this);!_0x43a8a0&&(_0x30df6b=this['calculateTargetIndex']());if(_0x43a8a0)_0x2e8504=_0x17e068[_0x2b0528(0x9c)];else _0x75a30?(_0x2e8504=(_0x16605e?_0x17e068[_0x2b0528(0xbf)]:_0x17e068[_0x2b0528(0x21e)])+_0x4bab1e,_0x2e8504-=_0x30df6b*_0x15a7c9):(_0x2e8504=_0x16605e?_0x17e068[_0x2b0528(0xbf)]:_0x17e068[_0x2b0528(0x21e)],_0x2e8504+=_0x30df6b*_0x15a7c9);_0x2e8504+=this[_0x2b0528(0x1bf)](_0x30df6b,_0x30d9e8[_0x2b0528(0xe8)]-_0x15a7c9),!_0x43a8a0&&_0x30df6b<0x0&&(_0x2e8504=this['x'],_0x15b6c2=this['y'],this[_0x2b0528(0x286)](0x0)),this[_0x2b0528(0x214)](_0x2e8504,_0x15b6c2);},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)][_0x262bda(0x1bf)]=function(_0x102e90,_0x4d6193){return 0x0;},Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)]['calculateTargetIndex']=function(){const _0x4a37e6=_0x262bda,_0xa0efaa=this['containerWindow']();if(!_0xa0efaa)return 0x0;const _0x52b87b=this[_0x4a37e6(0xc5)]===_0xa0efaa[_0x4a37e6(0xec)]?!![]:![],_0x2bb878=_0x52b87b?BattleManager[_0x4a37e6(0x15c)]:BattleManager[_0x4a37e6(0x280)],_0x5138ac=this[_0x4a37e6(0x233)](),_0x30d3ad=VisuMZ[_0x4a37e6(0xf6)]['GetAllIndicies'](_0x5138ac,_0x2bb878);return _0x30d3ad[this[_0x4a37e6(0x1d8)]]??_0x30d3ad[_0x30d3ad[_0x4a37e6(0x1ea)]-0x1]??-0x1;};function Sprite_OTB_TurnOrder_Preview(){this['initialize'](...arguments);}Sprite_OTB_TurnOrder_Preview[_0x262bda(0x1a8)]=Object[_0x262bda(0x1f6)](Sprite_OTB_TurnOrder_Battler[_0x262bda(0x1a8)]),Sprite_OTB_TurnOrder_Preview['prototype'][_0x262bda(0x1f0)]=Sprite_OTB_TurnOrder_Preview,Sprite_OTB_TurnOrder_Preview[_0x262bda(0x1a8)][_0x262bda(0x11e)]=function(_0x221feb,_0x2ab730,_0x378454,_0x47979e){const _0x123c11=_0x262bda;this['_offset']=_0x47979e,Sprite_OTB_TurnOrder_Battler[_0x123c11(0x1a8)][_0x123c11(0x11e)][_0x123c11(0x1b5)](this,_0x221feb,_0x2ab730,_0x378454),this[_0x123c11(0xf7)]();},Sprite_OTB_TurnOrder_Preview[_0x262bda(0x1a8)][_0x262bda(0xf7)]=function(){const _0x599c3b=_0x262bda,_0x40cc3f=Window_OTB_TurnOrder['Settings'];this[_0x599c3b(0x202)]['x']=this[_0x599c3b(0x202)]['y']=_0x40cc3f['PreviewScale'];},Sprite_OTB_TurnOrder_Preview[_0x262bda(0x1a8)]['getUnitSideSide']=function(){const _0x4cb6ed=_0x262bda;return this[_0x4cb6ed(0xe6)]===$gameParty?'PreviewActor':_0x4cb6ed(0x209);},Sprite_OTB_TurnOrder_Preview[_0x262bda(0x1a8)][_0x262bda(0x183)]=function(){const _0xd25235=_0x262bda,_0x1a1a0e=Window_OTB_TurnOrder[_0xd25235(0x251)];return Math[_0xd25235(0x18f)](_0x1a1a0e['BorderThickness']/(_0x1a1a0e[_0xd25235(0x23a)]||0.01));},Sprite_OTB_TurnOrder_Preview[_0x262bda(0x1a8)]['moveToPosition']=function(_0x13449c,_0x17215f){const _0x35cd6a=_0x262bda;Sprite_OTB_TurnOrder_Battler['prototype'][_0x35cd6a(0x214)]['call'](this,_0x13449c,_0x17215f),this['x']=this['_positionTargetX'],this['y']=this['_positionTargetY'];},Sprite_OTB_TurnOrder_Preview[_0x262bda(0x1a8)][_0x262bda(0x286)]=function(_0x56e77e){const _0x17aabf=_0x262bda;Sprite_OTB_TurnOrder_Battler['prototype'][_0x17aabf(0x286)][_0x17aabf(0x1b5)](this,_0x56e77e),_0x56e77e>0x0?this[_0x17aabf(0xd4)]=0x1:(this[_0x17aabf(0xd4)]/=0x2,this[_0x17aabf(0xd4)]=Math[_0x17aabf(0x1d7)](this['_fadeDuration']));},Sprite_OTB_TurnOrder_Preview['prototype'][_0x262bda(0x1bf)]=function(_0xf6d729,_0x5a6f75){const _0xfd89ea=_0x262bda,_0x28dc55=Window_OTB_TurnOrder[_0xfd89ea(0x251)];if(_0xf6d729>0x0){if(this[_0xfd89ea(0x1ad)]>0x0)return _0x28dc55[_0xfd89ea(0x124)]?-_0x28dc55[_0xfd89ea(0xe8)]:_0x28dc55['SpriteThin'];else{if(this[_0xfd89ea(0x1ad)]<0x0)return _0x28dc55[_0xfd89ea(0x124)]?-_0x5a6f75:_0x5a6f75;}}return 0x0;},Sprite_OTB_TurnOrder_Preview['prototype'][_0x262bda(0x2ab)]=function(){const _0x27f0d8=_0x262bda,_0x2c769f=this[_0x27f0d8(0x156)](),_0x542aa4=this[_0x27f0d8(0xc5)]===_0x2c769f['_nextTurn']?!![]:![],_0x3dd8f3=_0x542aa4?BattleManager['_otb_actionBattlersNext']:BattleManager[_0x27f0d8(0x280)];let _0x230c43=0x0,_0x4ff032=_0x3dd8f3[_0x27f0d8(0x1ea)]-0x1;_0x542aa4&&(_0x230c43=Math[_0x27f0d8(0x1e3)](0x0,VisuMZ[_0x27f0d8(0xf6)][_0x27f0d8(0x198)](_0x3dd8f3)));let _0x4bb93f=Sprite_OTB_TurnOrder_Battler[_0x27f0d8(0x1a8)]['calculateTargetIndex'][_0x27f0d8(0x1b5)](this);return _0x4bb93f+=this[_0x27f0d8(0x1ad)],_0x4bb93f['clamp'](_0x230c43,_0x4ff032);},Sprite_OTB_TurnOrder_Preview[_0x262bda(0x1a8)][_0x262bda(0x278)]=function(){},Window_Selectable[_0x262bda(0x1a8)][_0x262bda(0x224)]=function(){return![];},VisuMZ['BattleSystemOTB'][_0x262bda(0x1f8)]=Window_Selectable[_0x262bda(0x1a8)][_0x262bda(0xfa)],Window_Selectable[_0x262bda(0x1a8)][_0x262bda(0xfa)]=function(_0x2c38e9){const _0x30415c=_0x262bda;VisuMZ[_0x30415c(0xf6)][_0x30415c(0x1f8)][_0x30415c(0x1b5)](this,_0x2c38e9),this[_0x30415c(0x224)]()&&this['active']&&this[_0x30415c(0x1d2)]();},Window_Selectable[_0x262bda(0x1a8)][_0x262bda(0x1d2)]=function(){const _0x1eee71=_0x262bda;BattleManager[_0x1eee71(0x206)]();},VisuMZ[_0x262bda(0xf6)]['Window_Help_setItem']=Window_Help[_0x262bda(0x1a8)][_0x262bda(0x288)],Window_Help[_0x262bda(0x1a8)]['setItem']=function(_0x3c2377){const _0x1dfda1=_0x262bda;BattleManager[_0x1dfda1(0x172)]()&&_0x3c2377&&_0x3c2377[_0x1dfda1(0x97)]&&_0x3c2377[_0x1dfda1(0x97)][_0x1dfda1(0x1f3)](/<(?:OTB) HELP>\s*([\s\S]*)\s*<\/(?:OTB) HELP>/i)?this[_0x1dfda1(0xfc)](String(RegExp['$1'])):VisuMZ[_0x1dfda1(0xf6)][_0x1dfda1(0x173)][_0x1dfda1(0x1b5)](this,_0x3c2377);},Window_ActorCommand[_0x262bda(0x1a8)][_0x262bda(0x224)]=function(){const _0x1e9841=_0x262bda;return BattleManager[_0x1e9841(0x172)]();},Window_ActorCommand[_0x262bda(0x1a8)]['applyBattleItemWindowOTB']=function(){const _0x2665d3=_0x262bda,_0x205831=BattleManager[_0x2665d3(0xdf)]();if(_0x205831){const _0x17fadd=this[_0x2665d3(0x1b6)]();switch(_0x17fadd){case'attack':_0x205831[_0x2665d3(0x2a2)]();break;case _0x2665d3(0x194):_0x205831[_0x2665d3(0x1b1)]();break;case _0x2665d3(0x197):_0x205831['setSkill'](this[_0x2665d3(0x266)]());break;default:_0x205831[_0x2665d3(0x2b0)](null);break;}}Window_Command['prototype']['applyBattleItemWindowOTB'][_0x2665d3(0x1b5)](this);},Window_BattleSkill[_0x262bda(0x1a8)][_0x262bda(0x224)]=function(){const _0x629ef0=_0x262bda;return BattleManager[_0x629ef0(0x172)]();},Window_BattleSkill['prototype'][_0x262bda(0x1d2)]=function(){const _0x28b624=_0x262bda,_0x12be26=this['item'](),_0x3172a0=BattleManager['inputtingAction']();if(_0x3172a0)_0x3172a0[_0x28b624(0x2b0)](_0x12be26?_0x12be26['id']:null);Window_SkillList['prototype'][_0x28b624(0x1d2)][_0x28b624(0x1b5)](this);},Window_BattleItem[_0x262bda(0x1a8)][_0x262bda(0x224)]=function(){const _0x3cd1de=_0x262bda;return BattleManager[_0x3cd1de(0x172)]();},Window_BattleItem['prototype']['applyBattleItemWindowOTB']=function(){const _0x58ce32=_0x262bda,_0x1419a9=this[_0x58ce32(0x19f)](),_0xd6cf9c=BattleManager[_0x58ce32(0xdf)]();if(_0xd6cf9c)_0xd6cf9c[_0x58ce32(0x288)](_0x1419a9?_0x1419a9['id']:null);Window_ItemList[_0x58ce32(0x1a8)][_0x58ce32(0x1d2)]['call'](this);},Window_BattleActor[_0x262bda(0x1a8)][_0x262bda(0x224)]=function(){return BattleManager['isOTB']();},Window_BattleEnemy['prototype'][_0x262bda(0x224)]=function(){return BattleManager['isOTB']();};function _0x3bc2(){const _0x1a2b91=['_statusWindow','UiSubjectText','fillRect','right','prototype','Instant','IconSet','_otbTurnOrderIconIndex','RepositionTopHelpY','_offset','mainSprite','shift','version','setGuard','_partyCommandWindow','refresh','OTB_ADDED_RANDOMIZE_ADDED_ACTION_ORDER','call','currentSymbol','%1SystemBg','Actor','addBattlerToTurnOrderAtEnd','ConvertAgiBuffCurrent','finishActorInput','3537464UCneos','Game_Battler_performCollapse','otbGainInstant','additionalTargetXAdjustments','performCollapse','_blendColor','stepForward','code','onSkillOk','ARRAYNUM','updatePadding','_bgImageSprite','ARRAYFUNC','description','_backgroundSprite','processSpriteRemoval','reduce','svActorHorzCells','_spriteContainer','UpdateFrames','clamp','VisuMZ_0_CoreEngine','applyBattleItemWindowOTB','updateOpacity','isSideView','isEnemy','BattleManager_endAction','floor','_instance','LogWindowOffsetY','Scene_Battle_actorCommandSingleSkill','bitmap','makeNextActionOrdersOTB','initMembers','clearRect','createInitialPositions','_stateIDs','subject','onActorCancel','max','RepositionTopHelpX','UiSubjectOffsetX','UiNextOffsetY','_helpWindow','_isBattleOver','width','length','faceName','TurnOrderOTBGraphicFaceName','bitmapWidth','VisuMZ_2_PartySystem','VisuMZ_1_BattleCore','constructor','changeSvActorGraphicBitmap','BattleManager_getNextSubject','match','getColor','setBattleSystemOTBTurnOrderVisible','create','otbApplyActionTimes','Window_Selectable_select','Scene_Battle_commandCancel','changeIconGraphicBitmap','visible','canMove','shiftTurnOrderForSubject','createOrderPreview','toUpperCase','splice','remove','scale','207735rBUudU','otbShiftNextTurnSpritesToCurrentTurn','processTurnOTB','otbPreviewOrderChange','drawDimmedArea','_letterSprite','PreviewEnemy','_otb_createdFirstTurnOrders','initMembersOTB','contentsBack','onEnemyCancel','_positionTargetX','ScreenBuffer','otbCalcTargetCurrentOrderChange','_letter','name','createTurnOrderOTBGraphicIconIndex','moveToPosition','208671CsRbAw','_targetHomeY','Scene_Battle_commandFight','Game_Battler_forceAction','commandCancel','clearMakeActionTimesCacheOTB','8381727NePzUl','ConvertAgiDebuffCurrent','Scene_Battle_createActorCommandWindow','_currentX','preEndActionOTB','onActorOk','Game_System_initialize','Game_Battler_makeActionTimes','Game_Battler_onBattleStart','isBattleItemWindowOTB','createChildren','otbPreviewOrderClear','endTurn','EnemyBattlerFaceIndex','setOTBGraphicIconIndex','svActorVertCells','speed','removeSprite','calculateTargetPositions','otbCalcTargetNextOrderChange','trim','_spriteGroupWidth','BattleManager_makeActionOrders','EnemyBattlerFontFace','battler','isTpb','setup','turnOrderChangeOTB','_tempActor','Game_BattlerBase_hide','otbCalcUserCurrentOrderChange','PreviewScale','contents','updateVisibility','Mechanics','removeStatesAuto','RepositionTopForHelp','image','anchor','deathStateId','createLetterSprite','getNextSubject','BattleManager_forceAction','_graphicEnemy','Game_BattlerBase_recoverAll','height','SubjectDistance','BgImageOffsetY','checkOpacity','JSON','_currentActor','commandAttack','_graphicHue','Game_Action_applyItemUserEffect','Settings','_scene','otbRemoveCurrentSubject','STRUCT','_containerHeight','Game_Actor_selectNextCommand','Game_Battler_onTurnEnd','removeActor','clearOrderPreview','OTB_ADDED_ACTION_TIMES','TargetNextOrder','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_subject','makeSpeed','_isAlive','commandGuard','top','_actions','_currentTurn','Scene_Battle_createAllWindows','GetAllIndicies','currentExt','_otbTurnOrderGraphicType','Game_Battler_onBattleEnd','makeActionOrders','otbRemoveUnableTurnOrderSprites','486078tykoOT','exit','icon','otbAddBattlerToTurnOrderAtEnd','getStateTooltipBattler','OTB_CONVERT_AGI_DEBUFF_CURRENT_TURN','startInputOTB','InfinityClamp','_logWindow','changeSourceArray','Game_Battler_addState','removeActionBattlersOTB','opacity','updateSelectionEffect','fontSize','OtbTurnOrderClearActorGraphic','48eqLQQe','Game_Action_applyGlobal','Game_Action_speed','onBattleStartOTB','BattleManager_selectNextActor','_actionBattlers','update','BattleManager_setup','endBattlerActions','onBattleEndOTB','findIndex','startFade','gradient','setItem','map','iconWidth','filter','isHorz','actor','_last_otb_actionPlusSetLength','applyItemTargetEffectOTB','actorCommandSingleSkill','OtbTurnOrderEnemyFace','appear','padding','_forceAction','OTB_CONVERT_AGI_DEBUFF_NEXT_TURN','createTurnOrderOTBGraphicType','_otbTurnOrderFaceIndex','EFFECT_ADD_BUFF','SideviewBattleUI','_positionDuration','TargetAddActionNext','BattleManager_startInput','ConvertAgiBuffNext','_graphicFaceIndex','faceWidth','BgImageFilename','defaultPosition','setAttack','FaceIndex','MoveDistance','battlerName','windowRect','otbReturnBattlerToTurnOrders','FaceName','BattleManager_isTpb','ConvertSpeedJS','calculateTargetIndex','makeActions','updateGraphicHue','_previewCurrent','includes','setSkill','makeOTBSpeed','face','hasSvBattler','UserNextOrder','commandCancelOTB','#000000','onItemCancel','ActionBattlersFilter','selectNextCommand','createGraphicSprite','onBattleEnd','BattleManager_endTurn','isPreviousSceneBattleTransitionable','2300736tQHbdL','otbAddBattlerToTurnOrderAtStart','svBattlerName','Game_Battler_removeState','isActor','createBackgroundSprite','repositionLogWindowOTB','otbAddForceActionBattler','otbCalcUserNextOrderChange','isAppeared','note','%1BgColor1','members','_isAppeared','_requestTurnOrderUpdate','_subjectX','bind','createBorderSprite','min','DisplayPosition','isBattleMember','concat','clearTurnOrderOTBGraphics','Scene_Battle_onSkillOk','requestUpdateTurnOrders','getStateIdWithName','_speed','createOrderPreviewSprite','random','setTarget','gradientFillRect','updateStateTurns','EVAL','createTurnOrderSprites','addState','onEnemyOk','otbCreateNewTurnOrderSprites','Actors','actionPlusSet','previewOrderByAction','EFFECT_ADD_DEBUFF','ARRAYSTRUCT','isInfinitySpeedOTB','removeUnableTurnOrderSprites','forceAction','Scene_Battle_onEnemyCancel','10EupjRH','removeState','commandFight','EnemyBattlerType','_nextX','selectNextActor','changeFaceGraphicBitmap','makeDeepCopy','Scene_Battle_onEnemyOk','_tempBattler','_sourceArray','left','startActorCommandSelection','_homeX','onBattleStart','_otbTurnOrderWindow','unshift','IconIndex','_plural','allowRandomSpeed','_previewContainer','_index','changeEnemyGraphicBitmap','BorderThickness','isPartyCommandWindowDisabled','_fadeDuration','isNextOtbSubject','createAllWindows','parse','_fadeTarget','Enemy','children','Game_Battler_makeSpeed','UiFontSize','getBattleSystem','SystemTurnOrderVisibility','inputtingAction','getUnitSideSide','UserFollOrder','makeActionTimes','canInput','UiNextText','addChildToBack','_unit','addChild','SpriteThin','enemy','UiAlignment','addChildAt','_nextTurn','_ogWindowLayerY','battleEnd','setBlendColor','_otbTurnOrderFaceName','TurnOrderOTBGraphicFaceIndex','_graphicSprite','_positionTargetY','_phase','Game_BattlerBase_appear','BattleSystemOTB','adjustForPreview','%1-%2','UiNextOffsetX','select','isBattleSystemOTBTurnOrderVisible','setText','_homeDuration','applyGlobal','lineHeight','BattleManager_processTurn','_hidden','onTurnEndOTB','resetFontSettings','format','createNewTurnOrderSprites','battlerHue','updatePosition','_ogWindowLayerX','applyGlobalBattleSystemOTB','_preemptive','updateTurnOrders','onItemOk','postEndActionOTB','applyItemAddedActionOTB','isTurnBased','OtbTurnOrderClearEnemyGraphic','OTB_STUN_INFINITY_SPEED','_homeY','_otbTimesActedThisTurn','%1BgColor2','drawUiText','isSceneBattle','Conversion','svactor','_lastTargetIndex','onSkillCancel','RegExp','removeCurrentSubject','PreviewOffsetX','initialize','InitialSpeedJS','ShowMarkerBorder','startTurn','sortContainer','index','OrderDirection','RandomizeActionTimesOrder','active','bottom','_handlers','makeActionOrdersOTB','applyItemUserEffect','6dUlwfM','canChangeOtbTurnOrder','UiSubjectOffsetY','UiCurrentOffsetY','Game_Action_allowRandomSpeed','TurnOrderOTBGraphicType','clear','contentsOpacity','getChildIndex','addBattlerToTurnOrderAtStart','forceActionOTB','sort','_forcedBattlers','boxWidth','Enemies','DisplayOffsetY','_graphicType','return\x200','OtbTurnOrderEnemyIcon','ARRAYEVAL','RepositionLogWindow','randomInt','_actorCommandWindow','BgDimStyle','811974HAbIiS','indexOf','%1SystemBorder','loadSvEnemy','TargetFollOrder','OTB_CONVERT_AGI_BUFF_NEXT_TURN','EnemyBattlerDrawLetter','otbAddActions','_fadeSpeed','createSpriteContainers','EnemyBattlerFaceName','startInput','OTB_STUN_INFINITY_CLAMP','EnableActionTimes','ShowMarkerBg','35abrcZa','Scene_Battle_onItemOk','Scene_Battle_onActorCancel','otbProcessActionCheck','containerWindow','_otbTurnOrderVisible','registerCommand','Game_Party_addActor','drawText','startActorInput','_otb_actionBattlersNext','updateLetter','refreshTurnOrder','endAction','drawBgImage','14LZhJXh','battleMembers','addActor','Scene_Battle_onActorOk','_surprise','BattleManager_isTurnBased','bitmapHeight','createTurnOrderOTBGraphicFaceName','_graphicIconIndex','_graphicSv','SpriteLength','loadSvActor','selectNextActorOTB','initHomePositions','push','createTurnOrderOTBGraphicFaceIndex','Scene_Battle_onSkillCancel','isOTB','Window_Help_setItem','addLoadListener','ConvertAgiDebuffNext','isAlive','BattleManager_battleSys','effects','updateGraphic','close','fontFace','initBattleSystemOTB','isActiveTpb','processUpdateGraphic','_contentsBackSprite','pop','_previewNext','Scene_Battle_commandAttack','getBorderThickness','ConvertParams','performActionEndOTB','loadSystem','BattleManager_isActiveTpb','onTurnEnd','Scene_Battle_commandGuard','hide','allBattleMembers','OTB','makeActionTimesOTB','recoverAll','ceil','blt','transparent','Scene_Battle_onItemCancel','BattleManager_finishActorInput','guard','faceHeight','createActorCommandWindow','singleSkill','getInfinityClamp','EnemyBattlerIcon','round','Game_Party_removeActor','createActorCommandWindowOTB','iconHeight','OTB_CONVERT_AGI_BUFF_CURRENT_TURN','item','battleSys','_cache_makeActionTimesOTB','otbUnshiftBattlerToTurnOrders','FUNC'];_0x3bc2=function(){return _0x1a2b91;};return _0x3bc2();}function Window_OTB_TurnOrder(){this['initialize'](...arguments);}Window_OTB_TurnOrder['prototype']=Object[_0x262bda(0x1f6)](Window_Base[_0x262bda(0x1a8)]),Window_OTB_TurnOrder[_0x262bda(0x1a8)][_0x262bda(0x1f0)]=Window_OTB_TurnOrder,Window_OTB_TurnOrder[_0x262bda(0x251)]=VisuMZ[_0x262bda(0xf6)][_0x262bda(0x251)]['TurnOrder'],Window_OTB_TurnOrder['prototype'][_0x262bda(0x11e)]=function(){const _0x591ca=_0x262bda,_0x2e57fb=this[_0x591ca(0x2a6)]();this[_0x591ca(0x16e)](_0x2e57fb),Window_Base[_0x591ca(0x1a8)]['initialize']['call'](this,_0x2e57fb),this['opacity']=0x0,this[_0x591ca(0x207)](),this[_0x591ca(0x115)](),this[_0x591ca(0x14c)](),this[_0x591ca(0x23c)]();},Window_OTB_TurnOrder[_0x262bda(0x1a8)]['windowRect']=function(){const _0x5f5b2e=_0x262bda,_0x9d11de=Window_OTB_TurnOrder[_0x5f5b2e(0x251)],_0x11ba48=SceneManager[_0x5f5b2e(0x252)][_0x5f5b2e(0x1a4)][_0x5f5b2e(0x248)];let _0x2d3233=Graphics['width']-_0x9d11de[_0x5f5b2e(0x20f)]*0x2,_0x3b1673=_0x9d11de[_0x5f5b2e(0x16b)]+this[_0x5f5b2e(0xff)](),_0x38b216=_0x9d11de[_0x5f5b2e(0x20f)],_0x164824=0x0;switch(_0x9d11de[_0x5f5b2e(0xa0)]){case _0x5f5b2e(0x127):_0x164824=Graphics['height']-_0x11ba48-_0x9d11de[_0x5f5b2e(0x20f)]-_0x3b1673;break;default:_0x164824=_0x9d11de['ScreenBuffer'];break;}if(Imported['VisuMZ_3_SideviewBattleUI']&&BattleManager['isUsingSideviewUiLayout']()){const _0x5940f6=VisuMZ[_0x5f5b2e(0x299)][_0x5f5b2e(0x251)]['StatusWindow'];_0x2d3233-=_0x5940f6['WidthBase']+_0x5940f6[_0x5f5b2e(0x2a4)],_0x2d3233-=_0x9d11de['ScreenBuffer'];}return _0x38b216+=_0x9d11de['DisplayOffsetX']||0x0,_0x164824+=_0x9d11de[_0x5f5b2e(0x13a)]||0x0,new Rectangle(_0x38b216,_0x164824,_0x2d3233,_0x3b1673);},Window_OTB_TurnOrder[_0x262bda(0x1a8)]['initHomePositions']=function(_0x3f5e7d){const _0x7d1779=_0x262bda;this['_targetHomeX']=this[_0x7d1779(0xc8)]=_0x3f5e7d['x'],this[_0x7d1779(0x216)]=this['_homeY']=_0x3f5e7d['y'],this[_0x7d1779(0xfd)]=0x0;const _0x4f725a=Window_OTB_TurnOrder[_0x7d1779(0x251)];this[_0x7d1779(0x230)]=Math[_0x7d1779(0x18f)]((_0x3f5e7d['width']-_0x4f725a[_0x7d1779(0xe8)]-_0x4f725a['SubjectDistance']*0x2)/0x2),_0x4f725a[_0x7d1779(0x124)]?(this[_0x7d1779(0x9c)]=_0x3f5e7d[_0x7d1779(0x1e9)]-_0x4f725a[_0x7d1779(0xe8)],this[_0x7d1779(0x21e)]=this[_0x7d1779(0x230)]+_0x4f725a[_0x7d1779(0x249)],this[_0x7d1779(0xbf)]=0x0):(this[_0x7d1779(0x9c)]=0x0,this[_0x7d1779(0x21e)]=_0x4f725a[_0x7d1779(0xe8)]+_0x4f725a['SubjectDistance'],this[_0x7d1779(0xbf)]=this[_0x7d1779(0x21e)]+_0x4f725a[_0x7d1779(0x249)]+this[_0x7d1779(0x230)]);},Window_OTB_TurnOrder[_0x262bda(0x1a8)][_0x262bda(0x1c6)]=function(){const _0x16f31a=_0x262bda;this[_0x16f31a(0x293)]=0x0;},Window_OTB_TurnOrder[_0x262bda(0x1a8)][_0x262bda(0x207)]=function(){const _0x4b74ae=_0x262bda,_0x15df59=Window_OTB_TurnOrder[_0x4b74ae(0x251)];if(_0x15df59[_0x4b74ae(0x142)]===_0x4b74ae(0x191))return;if(_0x15df59[_0x4b74ae(0x142)]===_0x4b74ae(0x240)&&_0x15df59[_0x4b74ae(0x2a0)]!==''){const _0x25fff8=ImageManager[_0x4b74ae(0x186)](_0x15df59['BgImageFilename']);_0x25fff8[_0x4b74ae(0x174)](this[_0x4b74ae(0x160)][_0x4b74ae(0x9d)](this,_0x25fff8));return;};const _0x437d71=this[_0x4b74ae(0x20c)],_0x46cb11=ColorManager['dimColor1'](),_0x3f0b21=ColorManager['dimColor2'](),_0x1dbb21=this[_0x4b74ae(0x9c)],_0x50dbd0=_0x15df59[_0x4b74ae(0xe8)],_0x2ec939=0x0,_0x4f9afe=_0x15df59[_0x4b74ae(0x16b)],_0x53acbd=this[_0x4b74ae(0x21e)],_0x135d91=this[_0x4b74ae(0xbf)],_0x43bf5b=this['_spriteGroupWidth'];switch(_0x15df59[_0x4b74ae(0x142)]){case _0x4b74ae(0x287):_0x15df59[_0x4b74ae(0x124)]?(_0x437d71[_0x4b74ae(0xab)](_0x1dbb21,_0x2ec939,_0x50dbd0/0x2,_0x4f9afe,_0x3f0b21,_0x46cb11,![]),_0x437d71[_0x4b74ae(0x1a6)](_0x1dbb21+_0x50dbd0/0x2,_0x2ec939,_0x50dbd0/0x2,_0x4f9afe,_0x46cb11),_0x437d71[_0x4b74ae(0xab)](_0x53acbd,_0x2ec939,_0x43bf5b/0x2,_0x4f9afe,_0x3f0b21,_0x46cb11,![]),_0x437d71['fillRect'](_0x53acbd+_0x43bf5b/0x2,_0x2ec939,_0x43bf5b/0x2,_0x4f9afe,_0x46cb11),_0x437d71[_0x4b74ae(0xab)](_0x135d91,_0x2ec939,_0x43bf5b/0x2,_0x4f9afe,_0x3f0b21,_0x46cb11,![]),_0x437d71[_0x4b74ae(0x1a6)](_0x135d91+_0x43bf5b/0x2,_0x2ec939,_0x43bf5b/0x2,_0x4f9afe,_0x46cb11)):(_0x437d71[_0x4b74ae(0x1a6)](_0x1dbb21,_0x2ec939,_0x50dbd0/0x2,_0x4f9afe,_0x46cb11),_0x437d71[_0x4b74ae(0xab)](_0x1dbb21+_0x50dbd0/0x2,_0x2ec939,_0x50dbd0/0x2,_0x4f9afe,_0x46cb11,_0x3f0b21,![]),_0x437d71[_0x4b74ae(0x1a6)](_0x53acbd,_0x2ec939,_0x43bf5b/0x2,_0x4f9afe,_0x46cb11),_0x437d71['gradientFillRect'](_0x53acbd+_0x43bf5b/0x2,_0x2ec939,_0x43bf5b/0x2,_0x4f9afe,_0x46cb11,_0x3f0b21,![]),_0x437d71[_0x4b74ae(0x1a6)](_0x135d91,_0x2ec939,_0x43bf5b/0x2,_0x4f9afe,_0x46cb11),_0x437d71['gradientFillRect'](_0x135d91+_0x43bf5b/0x2,_0x2ec939,_0x43bf5b/0x2,_0x4f9afe,_0x46cb11,_0x3f0b21,![]));break;default:_0x437d71[_0x4b74ae(0x1a6)](_0x1dbb21,_0x2ec939,_0x50dbd0,_0x4f9afe,_0x46cb11),_0x437d71[_0x4b74ae(0x1a6)](_0x53acbd,_0x2ec939,_0x43bf5b,_0x4f9afe,_0x46cb11),_0x437d71[_0x4b74ae(0x1a6)](_0x135d91,_0x2ec939,_0x43bf5b,_0x4f9afe,_0x46cb11);break;}},Window_OTB_TurnOrder[_0x262bda(0x1a8)][_0x262bda(0x160)]=function(_0x1ec7d1){const _0x5495a4=_0x262bda;this[_0x5495a4(0x1c7)]=new Sprite(),this[_0x5495a4(0x1c7)]['bitmap']=_0x1ec7d1,this[_0x5495a4(0xe5)](this[_0x5495a4(0x1c7)]);const _0x2f0d32=Window_OTB_TurnOrder[_0x5495a4(0x251)];this[_0x5495a4(0x1c7)]['x']=_0x2f0d32['BgImageOffsetX'],this['_bgImageSprite']['y']=_0x2f0d32[_0x5495a4(0x24a)];},Window_OTB_TurnOrder[_0x262bda(0x1a8)][_0x262bda(0x115)]=function(){const _0x5c8177=_0x262bda;this['contents'][_0x5c8177(0x131)](),this[_0x5c8177(0x103)]();const _0x1c914b=Window_OTB_TurnOrder[_0x5c8177(0x251)];this[_0x5c8177(0x23b)]['fontSize']=_0x1c914b[_0x5c8177(0xdc)];let _0x13ee7d=_0x1c914b[_0x5c8177(0xea)];_0x13ee7d==='auto'&&(_0x13ee7d=_0x1c914b[_0x5c8177(0x124)]?_0x5c8177(0x1a7):_0x5c8177(0xc6));let _0x41527a=_0x1c914b[_0x5c8177(0x16b)];if(_0x1c914b[_0x5c8177(0x1a5)]!==''){const _0x34b654=this[_0x5c8177(0x9c)]+_0x1c914b[_0x5c8177(0x1e5)],_0x4bfce5=_0x41527a+_0x1c914b[_0x5c8177(0x12d)],_0x30bb75=_0x1c914b['SpriteThin'];this[_0x5c8177(0x15a)](_0x1c914b[_0x5c8177(0x1a5)],_0x34b654,_0x4bfce5,_0x30bb75,'center');}if(_0x1c914b['UiCurrentText']!==''){const _0x20fca3=this[_0x5c8177(0x21e)]+_0x1c914b['UiCurrentOffsetX'],_0x45059c=_0x41527a+_0x1c914b[_0x5c8177(0x12e)],_0x1a13df=this[_0x5c8177(0x230)];this['drawText'](_0x1c914b['UiCurrentText'],_0x20fca3,_0x45059c,_0x1a13df,_0x13ee7d);}if(_0x1c914b[_0x5c8177(0xe4)]!==''){const _0x59b05e=this['_nextX']+_0x1c914b[_0x5c8177(0xf9)],_0x28f7c0=_0x41527a+_0x1c914b[_0x5c8177(0x1e6)],_0x27d368=this[_0x5c8177(0x230)];this['drawText'](_0x1c914b['UiNextText'],_0x59b05e,_0x28f7c0,_0x27d368,_0x13ee7d);}},Window_OTB_TurnOrder[_0x262bda(0x1a8)][_0x262bda(0x14c)]=function(){const _0x57f45f=_0x262bda,_0x46465d=Window_OTB_TurnOrder['Settings'];this['_spriteContainer']=new Sprite(),this[_0x57f45f(0xe7)](this[_0x57f45f(0x1ce)]),this[_0x57f45f(0x25d)]=null,this['_currentTurn']=[],this[_0x57f45f(0xec)]=[],this[_0x57f45f(0xcf)]=new Sprite(),this['_previewContainer']['x']=_0x46465d[_0x57f45f(0x11d)],this['_previewContainer']['y']=_0x46465d['PreviewOffsetY'],this[_0x57f45f(0xcf)]['x']-=Math[_0x57f45f(0x18f)](_0x46465d[_0x57f45f(0xe8)]*0.5*_0x46465d[_0x57f45f(0x23a)]),_0x46465d[_0x57f45f(0x124)]&&(this[_0x57f45f(0xcf)]['x']+=_0x46465d[_0x57f45f(0xe8)]),this['_previewContainer']['y']-=Math[_0x57f45f(0x18f)](_0x46465d[_0x57f45f(0x16b)]*0.5*_0x46465d[_0x57f45f(0x23a)]),this[_0x57f45f(0xe7)](this[_0x57f45f(0xcf)]),this[_0x57f45f(0x2ae)]=[],this['_previewNext']=[];},Window_OTB_TurnOrder[_0x262bda(0x1a8)][_0x262bda(0x281)]=function(){const _0x2386d9=_0x262bda;Window_Base[_0x2386d9(0x1a8)][_0x2386d9(0x281)][_0x2386d9(0x1b5)](this),this[_0x2386d9(0x10b)](),this['updatePosition'](),this[_0x2386d9(0x23c)](),this[_0x2386d9(0x122)]();},Window_OTB_TurnOrder[_0x262bda(0x1a8)]['requestUpdateTurnOrders']=function(){const _0x2dafb1=_0x262bda;this[_0x2dafb1(0x9b)]=!![];},Window_OTB_TurnOrder[_0x262bda(0x1a8)][_0x262bda(0x10b)]=function(){const _0x381fca=_0x262bda;if(!this['_requestTurnOrderUpdate'])return;this[_0x381fca(0x9b)]=![];for(const _0x1486cc of this[_0x381fca(0x263)]){if(!_0x1486cc)continue;_0x1486cc[_0x381fca(0x22d)]();}for(const _0x4bbf53 of this[_0x381fca(0xec)]){if(!_0x4bbf53)continue;_0x4bbf53[_0x381fca(0x22d)]();}},Window_OTB_TurnOrder[_0x262bda(0x1a8)][_0x262bda(0x107)]=function(){const _0x4a0276=_0x262bda,_0x1e4eb3=Window_OTB_TurnOrder[_0x4a0276(0x251)];if(_0x1e4eb3[_0x4a0276(0xa0)]!==_0x4a0276(0x261))return;if(!_0x1e4eb3[_0x4a0276(0x23f)])return;const _0x424bff=SceneManager[_0x4a0276(0x252)][_0x4a0276(0x1e7)];if(!_0x424bff)return;_0x424bff[_0x4a0276(0x1fb)]?(this['x']=this[_0x4a0276(0xc8)]+(_0x1e4eb3[_0x4a0276(0x1e4)]||0x0),this['y']=this[_0x4a0276(0x112)]+(_0x1e4eb3[_0x4a0276(0x1ac)]||0x0)):(this['x']=this['_homeX'],this['y']=this[_0x4a0276(0x112)]);const _0x2d723d=SceneManager[_0x4a0276(0x252)]['_windowLayer'];Window_OTB_TurnOrder[_0x4a0276(0x108)]===undefined&&(Window_OTB_TurnOrder[_0x4a0276(0x108)]=Math[_0x4a0276(0x19a)]((Graphics[_0x4a0276(0x1e9)]-Math['min'](Graphics[_0x4a0276(0x138)],_0x2d723d[_0x4a0276(0x1e9)]))/0x2));Window_OTB_TurnOrder[_0x4a0276(0xed)]===undefined&&(Window_OTB_TurnOrder[_0x4a0276(0xed)]=Math[_0x4a0276(0x19a)]((Graphics[_0x4a0276(0x248)]-Math[_0x4a0276(0x9f)](Graphics['boxHeight'],_0x2d723d[_0x4a0276(0x248)]))/0x2));;this['x']+=_0x2d723d['x']-Window_OTB_TurnOrder[_0x4a0276(0x108)],this['y']+=_0x2d723d['y']-Window_OTB_TurnOrder[_0x4a0276(0xed)];},Window_OTB_TurnOrder[_0x262bda(0x1a8)][_0x262bda(0x23c)]=function(){const _0x2de1e2=_0x262bda;this[_0x2de1e2(0x1fb)]=$gameSystem[_0x2de1e2(0xfb)]();if(BattleManager[_0x2de1e2(0xf4)]===_0x2de1e2(0xee)){if(!this[_0x2de1e2(0x14b)]){const _0x184b33=Window_OTB_TurnOrder[_0x2de1e2(0x251)];this[_0x2de1e2(0x14b)]=Math[_0x2de1e2(0x18f)](0xff/(_0x184b33['UpdateFrames']||0x1));}this[_0x2de1e2(0x277)]-=this[_0x2de1e2(0x14b)],this[_0x2de1e2(0x132)]-=this['_fadeSpeed'],this[_0x2de1e2(0x17f)][_0x2de1e2(0x277)]-=this['_fadeSpeed'];}},Window_OTB_TurnOrder[_0x262bda(0x1a8)][_0x262bda(0x122)]=function(){const _0x4c6d71=_0x262bda;if(!this[_0x4c6d71(0x1ce)])return;const _0x553199=Window_OTB_TurnOrder['Settings'],_0x3e4a6d=_0x553199['OrderDirection'];_0x3e4a6d?this[_0x4c6d71(0x1ce)][_0x4c6d71(0xda)]['sort']((_0x314dab,_0x4c9915)=>_0x314dab['x']-_0x4c9915['x']):this[_0x4c6d71(0x1ce)][_0x4c6d71(0xda)][_0x4c6d71(0x136)]((_0x2cf0c2,_0x7db7b0)=>_0x7db7b0['x']-_0x2cf0c2['x']);},Window_OTB_TurnOrder[_0x262bda(0x1a8)][_0x262bda(0x22c)]=function(_0x260256){const _0x53606f=_0x262bda;if(!_0x260256)return;_0x260256['_sourceArray']&&_0x260256[_0x53606f(0xc5)][_0x53606f(0x201)](_0x260256);const _0x2631f6=Window_OTB_TurnOrder[_0x53606f(0x251)],_0x11b656=0x3e8/0x3c*_0x2631f6[_0x53606f(0x1cf)]+0x1f4;_0x260256[_0x53606f(0x286)](0x0),setTimeout(this[_0x53606f(0x1cb)][_0x53606f(0x9d)](this,_0x260256),_0x11b656);},Window_OTB_TurnOrder['prototype']['processSpriteRemoval']=function(_0xf1b318){const _0x1e4b74=_0x262bda;_0xf1b318[_0x1e4b74(0xc5)]&&_0xf1b318['_sourceArray'][_0x1e4b74(0x201)](_0xf1b318),this[_0x1e4b74(0x1ce)]['removeChild'](_0xf1b318),this[_0x1e4b74(0xcf)]['removeChild'](_0xf1b318);},Window_OTB_TurnOrder['prototype']['removeCurrentSubject']=function(){const _0x470e89=_0x262bda;if(!this['_subject'])return;this[_0x470e89(0x22c)](this['_subject']);},Window_OTB_TurnOrder[_0x262bda(0x1a8)]['shiftNextTurnSpritesToCurrentTurn']=function(){const _0x353fce=_0x262bda;while(this[_0x353fce(0x263)][_0x353fce(0x1ea)]){const _0x2ad42d=this[_0x353fce(0x263)]['shift']();_0x2ad42d[_0x353fce(0x286)](0x0);}while(this[_0x353fce(0xec)][_0x353fce(0x1ea)]){const _0x2c8838=this['_nextTurn'][_0x353fce(0x1af)]();if(!_0x2c8838)continue;this[_0x353fce(0x263)][_0x353fce(0x16f)](_0x2c8838);}for(const _0x4cc6f6 of this[_0x353fce(0x263)]){if(!_0x4cc6f6)continue;_0x4cc6f6[_0x353fce(0x274)](this['_currentTurn']);}},Window_OTB_TurnOrder[_0x262bda(0x1a8)][_0x262bda(0xae)]=function(_0x1a1636,_0x51dcba){const _0x3e47b2=_0x262bda,_0x265503=_0x1a1636===BattleManager[_0x3e47b2(0x280)]?this['_currentTurn']:this[_0x3e47b2(0xec)],_0x24791a={};for(const _0x3bb4f0 of _0x1a1636){const _0x4df280=_0x3e47b2(0xf8)[_0x3e47b2(0x104)](_0x3bb4f0[_0x3e47b2(0x91)]()?_0x3e47b2(0x28d):_0x3e47b2(0xe9),_0x3bb4f0[_0x3e47b2(0x123)]());_0x24791a[_0x4df280]=_0x24791a[_0x4df280]||0x0;const _0x3988b2=_0x24791a[_0x4df280]++,_0x58b22b=new Sprite_OTB_TurnOrder_Battler(_0x3bb4f0,_0x3988b2,_0x265503);this['_spriteContainer'][_0x3e47b2(0xe7)](_0x58b22b),_0x265503[_0x3e47b2(0x16f)](_0x58b22b);}for(const _0x129b3c of _0x265503){if(!_0x129b3c)continue;_0x129b3c[_0x3e47b2(0x286)](0xff),_0x129b3c['calculateTargetPositions'](),_0x51dcba&&(_0x129b3c[_0x3e47b2(0x277)]=0xff,_0x129b3c['x']=_0x129b3c[_0x3e47b2(0x20e)],_0x129b3c[_0x3e47b2(0x29a)]=0x0);}},Window_OTB_TurnOrder[_0x262bda(0x1a8)]['createNewTurnOrderSprites']=function(){const _0x507ede=_0x262bda,_0x2dacca=BattleManager[_0x507ede(0x15c)];this[_0x507ede(0xae)](_0x2dacca);},Window_OTB_TurnOrder['prototype'][_0x262bda(0x1fd)]=function(_0x2a8fd0,_0x5402a6){const _0x3e8a1e=_0x262bda;this[_0x3e8a1e(0x11c)]();for(const _0x320d05 of this[_0x3e8a1e(0x263)]){if(!_0x320d05)continue;_0x320d05[_0x3e8a1e(0x233)]()===_0x2a8fd0&&(_0x320d05[_0x3e8a1e(0x1d8)]=_0x320d05[_0x3e8a1e(0x1d8)]||0x0,_0x320d05[_0x3e8a1e(0x1d8)]--);}const _0x252897=this[_0x3e8a1e(0x263)][_0x3e8a1e(0x285)](_0x2138c4=>_0x2138c4[_0x3e8a1e(0x233)]()===_0x2a8fd0);if(this[_0x3e8a1e(0x263)][_0x252897])this['_subject']=this['_currentTurn'][_0x252897],this[_0x3e8a1e(0x263)][_0x252897][_0x3e8a1e(0x22d)](),this[_0x3e8a1e(0x263)]['splice'](_0x252897,0x1);else{if(_0x2a8fd0){const _0x3c717d=new Sprite_OTB_TurnOrder_Battler(_0x2a8fd0,-0x1,null);this['_spriteContainer'][_0x3e8a1e(0xe7)](_0x3c717d),this[_0x3e8a1e(0x25d)]=_0x3c717d,_0x3c717d[_0x3e8a1e(0x286)](0xff),_0x3c717d['_positionDuration']=0x258,_0x3c717d['x']=this[_0x3e8a1e(0x9c)],_0x3c717d[_0x3e8a1e(0x20e)]=this[_0x3e8a1e(0x9c)],_0x5402a6&&(_0x3c717d[_0x3e8a1e(0x277)]=0xff);}}for(const _0x2639a8 of this['_currentTurn']){if(!_0x2639a8)continue;_0x2639a8['calculateTargetPositions']();}},Window_OTB_TurnOrder[_0x262bda(0x1a8)][_0x262bda(0xb8)]=function(){const _0x47716f=_0x262bda;for(const _0x4ea179 of this[_0x47716f(0x263)]){if(!_0x4ea179)continue;const _0x3880d5=_0x4ea179[_0x47716f(0x233)]();if(BattleManager[_0x47716f(0x280)][_0x47716f(0x2af)](_0x3880d5))continue;this[_0x47716f(0x22c)](_0x4ea179);}for(const _0x1eb159 of this[_0x47716f(0xec)]){if(!_0x1eb159)continue;const _0xea3edd=_0x1eb159[_0x47716f(0x233)]();if(BattleManager[_0x47716f(0x15c)][_0x47716f(0x2af)](_0xea3edd))continue;this[_0x47716f(0x22c)](_0x1eb159);}},Window_OTB_TurnOrder[_0x262bda(0x1a8)][_0x262bda(0x1b9)]=function(_0x163504,_0x513cd0){const _0x1f92d8=_0x262bda,_0x1381bf=_0x513cd0===BattleManager[_0x1f92d8(0x280)]?this[_0x1f92d8(0x263)]:this['_nextTurn'];if(!_0x1381bf)return;const _0x304998=VisuMZ[_0x1f92d8(0xf6)][_0x1f92d8(0x265)](_0x163504,_0x513cd0),_0x457f84=_0x304998[_0x1f92d8(0x1ea)]-0x1,_0x2b854c=new Sprite_OTB_TurnOrder_Battler(_0x163504,_0x457f84,_0x1381bf);this[_0x1f92d8(0x1ce)][_0x1f92d8(0xe7)](_0x2b854c),_0x1381bf[_0x1f92d8(0x16f)](_0x2b854c),_0x2b854c['startFade'](0xff),this[_0x1f92d8(0xa5)]();},Window_OTB_TurnOrder[_0x262bda(0x1a8)][_0x262bda(0x134)]=function(_0x24c4db,_0x377e69){const _0x5c7816=_0x262bda,_0x272a45=_0x377e69===BattleManager[_0x5c7816(0x280)]?this[_0x5c7816(0x263)]:this[_0x5c7816(0xec)];if(!_0x272a45)return;for(const _0x69751a of _0x272a45){if(!_0x69751a)continue;_0x69751a['battler']()===_0x24c4db&&(_0x69751a[_0x5c7816(0x1d8)]=_0x69751a[_0x5c7816(0x1d8)]||0x0,_0x69751a[_0x5c7816(0x1d8)]++);}const _0x393b35=0x0,_0x523bb8=new Sprite_OTB_TurnOrder_Battler(_0x24c4db,_0x393b35,_0x272a45);this[_0x5c7816(0x1ce)][_0x5c7816(0xe7)](_0x523bb8),_0x272a45[_0x5c7816(0xcb)](_0x523bb8),_0x523bb8[_0x5c7816(0x286)](0xff),_0x523bb8[_0x5c7816(0x29a)]=0x258,_0x523bb8['x']=this[_0x5c7816(0x9c)],this[_0x5c7816(0xa5)]();},Window_OTB_TurnOrder[_0x262bda(0x1a8)]['addForceActionBattler']=function(_0xa77415,_0x387f7b){const _0x556783=_0x262bda,_0x27fec6=this[_0x556783(0x263)];if(!_0x27fec6)return;let _0x485975=0x0;for(let _0x15e33f=0x0;_0x15e33f<_0x387f7b;_0x15e33f++){const _0x4516a6=_0x27fec6[_0x15e33f];if(!_0x4516a6)continue;if(_0x4516a6[_0x556783(0x233)]()!==_0xa77415)continue;_0x485975=_0x4516a6['_instance']+0x1;}for(let _0x2d1e16=_0x387f7b;_0x2d1e16<_0x27fec6[_0x556783(0x1ea)];_0x2d1e16++){const _0x4cc656=_0x27fec6[_0x2d1e16];if(!_0x4cc656)continue;if(_0x4cc656[_0x556783(0x233)]()!==_0xa77415)continue;_0x4cc656[_0x556783(0x1d8)]=_0x4cc656['_instance']||0x0,_0x4cc656[_0x556783(0x1d8)]++;}const _0x26729b=new Sprite_OTB_TurnOrder_Battler(_0xa77415,_0x485975,_0x27fec6);this[_0x556783(0x1ce)][_0x556783(0xe7)](_0x26729b),_0x27fec6['splice'](_0x387f7b,0x0,_0x26729b),_0x26729b[_0x556783(0x286)](0xff),_0x26729b['_positionDuration']=0x258,_0x26729b['x']=this[_0x556783(0x9c)],this['requestUpdateTurnOrders']();},Window_OTB_TurnOrder['prototype']['resumeTurnOrderSprites']=function(){const _0x1790ae=_0x262bda;this[_0x1790ae(0xae)](BattleManager[_0x1790ae(0x280)],!![]),this['createTurnOrderSprites'](BattleManager['_otb_actionBattlersNext'],!![]),this['shiftTurnOrderForSubject'](BattleManager['_subject'],!![]),this[_0x1790ae(0x122)]();},Window_OTB_TurnOrder[_0x262bda(0x1a8)]['previewOrderByAction']=function(_0x3acf6a){const _0x438e9d=_0x262bda;this[_0x438e9d(0x259)](),_0x3acf6a&&_0x3acf6a['item']()!==null&&this[_0x438e9d(0x1fe)](_0x3acf6a);},Window_OTB_TurnOrder[_0x262bda(0x1a8)][_0x262bda(0x259)]=function(){const _0x148902=_0x262bda;for(const _0x2048eb of this[_0x148902(0xcf)][_0x148902(0xda)]){if(!_0x2048eb)continue;this[_0x148902(0x22c)](_0x2048eb);}},Window_OTB_TurnOrder[_0x262bda(0x1a8)]['createOrderPreview']=function(_0x1440b3){const _0x607f79=_0x262bda,_0x4a4254=_0x1440b3[_0x607f79(0x1e1)](),_0x157a1c=_0x1440b3[_0x607f79(0x239)](),_0x4f18dd=_0x1440b3[_0x607f79(0x95)]();_0x157a1c!==0x0&&this[_0x607f79(0xa8)](_0x4a4254,![],_0x157a1c);_0x4f18dd!==0x0&&this[_0x607f79(0xa8)](_0x4a4254,!![],_0x4f18dd);if(!_0x1440b3['needsSelection']())return;const _0x41ee36=SceneManager['_scene']['_actorWindow'],_0x50e957=SceneManager[_0x607f79(0x252)]['_enemyWindow'];let _0x16d632=null;if(_0x41ee36&&_0x41ee36[_0x607f79(0x126)])_0x16d632=_0x41ee36[_0x607f79(0x28d)](_0x41ee36['index']());else _0x50e957&&_0x50e957[_0x607f79(0x126)]&&(_0x16d632=_0x50e957[_0x607f79(0xe9)]());if(!_0x16d632)return;const _0x486e95=_0x1440b3[_0x607f79(0x210)](_0x16d632),_0x5124de=_0x1440b3['otbCalcTargetNextOrderChange'](_0x16d632);_0x486e95!==0x0&&this[_0x607f79(0xa8)](_0x16d632,![],_0x486e95),_0x5124de!==0x0&&this[_0x607f79(0xa8)](_0x16d632,!![],_0x5124de);},Window_OTB_TurnOrder['prototype'][_0x262bda(0xa8)]=function(_0xb37ecf,_0x58898a,_0x375fc4){const _0x44828c=_0x262bda;if(!_0xb37ecf)return;if(_0x375fc4===0x0)return;const _0xbfc2e3=_0x58898a?BattleManager[_0x44828c(0x15c)]:BattleManager[_0x44828c(0x280)],_0x46e257=VisuMZ[_0x44828c(0xf6)][_0x44828c(0x265)](_0xb37ecf,_0xbfc2e3),_0x398b03=_0x58898a?this[_0x44828c(0xec)]:this[_0x44828c(0x263)],_0x4bc845=_0x58898a?this[_0x44828c(0x181)]:this[_0x44828c(0x2ae)];if(_0x46e257[_0x44828c(0x1ea)]<=0x0)return;for(let _0x1215c4=0x0;_0x1215c4<_0x46e257[_0x44828c(0x1ea)];_0x1215c4++){const _0x2f2b55=new Sprite_OTB_TurnOrder_Preview(_0xb37ecf,_0x1215c4,_0x398b03,_0x375fc4);this[_0x44828c(0xcf)][_0x44828c(0xe7)](_0x2f2b55),_0x4bc845[_0x44828c(0x16f)](_0x2f2b55),_0x2f2b55[_0x44828c(0x22d)](),_0x2f2b55[_0x44828c(0x286)](0xff);}};