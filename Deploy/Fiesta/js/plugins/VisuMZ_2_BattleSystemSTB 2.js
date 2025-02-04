//=============================================================================
// VisuStella MZ - BattleSystemSTB
// VisuMZ_2_BattleSystemSTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemSTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemSTB = VisuMZ.BattleSystemSTB || {};
VisuMZ.BattleSystemSTB.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.07] [BattleSystemSTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_STB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Standard Turn Battle (STB) system uses RPG Maker MZ's default non-TPB
 * battle system as a base. Action orders are determined by the battler's AGI
 * values and they go from highest to lowest. However, actions are not selected
 * at the start of the turn. Instead, as the turn progresses, actions are then
 * picked as each battler's turn comes up and is executed immediately.
 * 
 * Optional to the battle system but fine tuned to it is the Exploit System.
 * When landing an elemental weakness or critical hit against a foe, the
 * battler can gain bonuses as well as an extra turn while the foe will become
 * stunned or gain any desired state(s). When all enemies are exploited in a
 * single turn, a common event can also be played, too.
 * 
 * A Turn Order Display will also appear on the screen to show the order the
 * battlers will take their turns in. This lets the player plan in advance on
 * how to go about the rest of the turn.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "stb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Utilizes the balanced AGI nature of the Default Turn Battle system.
 * * Allows for actions to execute immediately upon selection.
 * * A Turn Order Display to show the player when each battler will have its
 *   turn to perform an action.
 * * Skills and Items can have an "Instant Use" effect, which allows them to
 *   perform an action immediately without using up a turn.
 * * An optional Exploit System that can be disabled if desired, but otherwise,
 *   fine tuned to make use of STB's highly compatible nature.
 * * Landing an elemental weakness or critical hit can allow the active battler
 *   to gain bonuses, ranging from states to extra actions to custom effects
 *   that can be added on through JavaScript plugin parameters.
 * * An exploited enemy can suffer from states and/or custom effects added
 *   through JavaScript plugin parameters.
 * * If all enemies are exploited, a common event can run to allow for a custom
 *   follow up action.
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
 * Turn Order Display
 * 
 * The Turn Order Display will capture the battle's currently active battler
 * and any battlers found in the active battlers array for the BattleManager.
 * This does not overwrite any functions, but the Turn Order Display may or may
 * not conflict with any existing HUD elements that are already positioned on
 * the screen. If so, you can choose to offset the Turn Order Display or move
 * it to a different part of the screen through the plugin parameters.
 * 
 * ---
 *
 * Action Speed
 * 
 * For skills and items, action speeds now behave differently now. Because
 * actions are now decided after a turn starts, positioning will no longer be
 * decided from the selected skill/item's action speed for the current turn.
 * 
 * Instead, the action speed used by a skill or item will determine the bonus
 * speed (or speed penalty if negative) for the following turn. Using a Guard
 * action with a +2000 Action Speed will raise the following turn's speed by
 * +2000, whereas what is originally a long charge time skill with -1000 speed
 * will decrease the following action's speed by -1000.
 * 
 * You can also customize how speed is calculated through JS Plugin Parameters
 * found in the Mechanics Settings.
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
 * Exploit System
 * 
 * This is an optional system. If you wish to turn it off, you can do so in the
 * plugin parameters.
 * 
 * There are two main ways that battlers can be exploited. One is by receiving
 * damage that strikes an elemental weakness. The other is by receiving damage
 * from a Critical Hit. Exploited battlers can receive penalty states. These
 * states can be adjusted in the plugin parameters. The default penalty state
 * is the Stunned state.
 * 
 * The battler doing the exploiting can receive bonuses instead. This is to
 * reward a power play. These bonuses can range from added states to receiving
 * an extra action and allowing the active battler to immediately attack again.
 * 
 * Each battler can only be exploited once per turn. This means if an enemy
 * would receive multiple attacks to its elemental weakness(es), the exploited
 * effect will only occur once per turn, meaning the penalty states won't stack
 * multiple times over. This limitation is for the sake of game balance, but if
 * you so wish, you can turn off this limitation in the plugin parameters.
 * 
 * Each action can also exploit only once per use and against an unexploited
 * target. This means battlers cannot use the same elemental attacks against
 * the same foes over and over to stack up an infinite amount of turns. If the
 * player wants to gain more bonuses, the player would have to strike against
 * unexploited foes. This limitation is for the sake of game balance, but if
 * you so wish, you can turn off this limitation in the plugin parameters.
 * 
 * When all members of a party/troop are exploited, a common event can be
 * triggered to run, allowing for potential follow up actions. How you wish to
 * make these common events is up to you.
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
 * === General STB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <STB Help>
 *  description
 *  description
 * </STB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under STB.
 * - This is primarily used if the skill behaves differently in STB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to STB.
 *
 * ---
 * 
 * === STB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the STB Turn Order Display
 * 
 * ---
 *
 * <STB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <STB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <STB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Instant Use-Related Notetags ===
 * 
 * ---
 *
 * <STB Instant>
 * <STB Instant Use>
 * <STB Instant Cast>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to be used immediately without consuming a turn.
 *
 * ---
 * 
 * === Exploit-Related Notetags ===
 * 
 * ---
 *
 * <STB Exploited Gain State: id>
 * <STB Exploited Gain State: id, id, id>
 * 
 * <STB Exploited Gain State: name>
 * <STB Exploited Gain State: name, name, name>
 *
 * - Used for: Class, Enemy Notetags
 * - If an actor (with the specified class) or enemy is exploited via elemental
 *   weaknesses or critical hits, apply the listed penalty state(s).
 * - Replace 'id' with a number representing the penalty state ID's you wish
 *   to apply to the exploited battler.
 * - Insert multiple 'id' values to apply multiple penalty states at once.
 * - Replace 'name' with the name of the penalty state you wish to apply to the
 *   exploited battler.
 * - Insert multiple 'name' entries to apply multiple penalty states at once.
 *
 * ---
 *
 * <STB Cannot Be Exploited>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This prevents the affected battler from being exploited via elemental
 *   weaknesses or critical hits.
 *
 * ---
 *
 * <STB Exploiter Gain State: id>
 * <STB Exploiter Gain State: id, id, id>
 * 
 * <STB Exploiter Gain State: name>
 * <STB Exploiter Gain State: name, name, name>
 *
 * - Used for: Class, Enemy Notetags
 * - If an actor (with the specified class) or enemy exploits an opponent with
 *   an elemental weakness or critical hit, apply the listed bonus state(s).
 * - Replace 'id' with a number representing the bonus state ID's you wish
 *   to apply to the exploited battler.
 * - Insert multiple 'id' values to apply multiple bonus states at once.
 * - Replace 'name' with the name of the bonus state you wish to apply to the
 *   exploited battler.
 * - Insert multiple 'name' entries to apply multiple bonus states at once.
 *
 * ---
 *
 * <STB Cannot Be Exploiter>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This prevents the affected battler from exploiting any opponents via
 *   elemental weaknesses or critical hits.
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
 * Actor: Change STB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the STB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change STB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the STB Turn Order.
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
 * Actor: Clear STB Turn Order Graphic
 * - Clears the STB Turn Order graphics for the actor(s).
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
 * Enemy: Change STB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the STB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change STB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the STB Turn Order.
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
 * Enemy: Clear STB Turn Order Graphic
 * - Clears the STB Turn Order graphics for the enemy(ies).
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
 * System: STB Turn Order Visibility
 * - Determine the visibility of the STB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the STB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of the STB Battle System.
 *
 * ---
 *
 * Speed
 * 
 *   JS: Initial Speed:
 *   - Code used to calculate initial speed at the start of battle.
 * 
 *   JS: Next Turn Speed:
 *   - Code used to calculate speed for a following turn.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploit System Settings
 * ============================================================================
 *
 * Here, you can adjust the main settings for the Exploit System, including
 * where you can turn it on/off. The Exploited and Exploiter settings are
 * extensions of the Exploit System and are better off with their own sections.
 *
 * ---
 *
 * Settings
 * 
 *   Enable System?:
 *   - Enable the exploit system? 
 *   - If disabled, ignore all the  mechanics regarding the Exploit System.
 * 
 *   Critical Hits:
 *   - Do critical hits exploit the opponent?
 * 
 *   Elemental Weakness:
 *   - Do elemental weaknesses exploit the opponent?
 * 
 *     Minimum Rate:
 *     - What's the minimum rate needed to count as an elemental weakness?
 * 
 *   Reset Each Turn:
 *   - Reset exploits at the end of each turn?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploited Effects Settings
 * ============================================================================
 *
 * These are effects for the exploited battlers (the receiving end). Change how
 * you want exploited battlers to behave here.
 *
 * ---
 *
 * Mechanics
 * 
 *   Added States:
 *   - A list of the states that are added when a target is exploited.
 * 
 *   Full Exploit Events:
 *   vs Actors Event:
 *   vs Enemies Event:
 *   - If all actors/enemies have been fully exploited, run this common event.
 *   - Does not work with unlimited exploits.
 * 
 *   Unlimited Exploits:
 *   - Can battlers be exploited endlessly?
 * 
 *   JS: On Exploited:
 *   - Code used when the target has been exploited.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
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
 * Plugin Parameters: Exploiter Effects Settings
 * ============================================================================
 *
 * These are effects for the battlers doing the exploiting. Change how you want
 * exploiter battlers to behave here.
 *
 * ---
 *
 * Mechanics
 * 
 *   Added States:
 *   - A list of the states that are added when a user exploits a foe.
 * 
 *   Extra Actions:
 *   - Successfully exploiting an enemy will grant the user this many
 *     extra actions.
 * 
 *   Multiple Exploits:
 *   - Can battlers exploit opponents multiple times with one action?
 * 
 *   JS: On Exploiting:
 *   - Code used when the user is exploiting a foe's weakness.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
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
 * Plugin Parameters: Turn Order Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System STB. These adjust how the
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
 *   Center Horizontal?:
 *   - Reposition the Turn Order Display to always be centered if it is a
 *     'top' or 'bottom' position?
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
 *   Max Horizontal:
 *   - Maximum slots you want to display for top and bottom Turn Order Display
 *     positions?
 * 
 *   Max Vertical:
 *   - Maximum slots you want to display for left and right Turn Order Display
 *     positions?
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
 * Version 1.07: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * 
 * Version 1.06: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: December 25, 2020
 * * Bug Fixes!
 * ** Starting battle from a surprise attack will no longer skip turn 1. And
 *    starting battle without any inputtable actors will no longer skip turn 1.
 *    Fix made by Yanfly.
 * 
 * Version 1.04: December 18, 2020
 * * Feature Update!
 * ** Enemies can now benefit from <STB Instant> skills. Update made by Olivia.
 * ** Action End States updating are now handled by Skills and States Core
 *    v1.07+ for proper intended usage. Change from Battle System - STB v1.02
 *    is reverted here to prevent triggering the update twice.
 * 
 * Version 1.03: December 4, 2020
 * * Bug Fixes!
 * ** Select Next Command no longer returns undefined. Fix made by Olivia.
 * 
 * Version 1.02: November 22, 2020
 * * Bug Fixes!
 * ** Action End States now update at the end of each individual action.
 *    Fix made by Yanfly.
 * 
 * Version 1.01: November 15, 2020
 * * Bug Fixes!
 * ** Now compatible with Party Command Window Disable from the Battle Core.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release Date: November 23, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderActorIcon
 * @text Actor: Change STB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the STB Turn Order.
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
 * @command StbTurnOrderActorFace
 * @text Actor: Change STB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the STB Turn Order.
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
 * @command StbTurnOrderClearActorGraphic
 * @text Actor: Clear STB Turn Order Graphic
 * @desc Clears the STB Turn Order graphics for the actor(s).
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
 * @command StbTurnOrderEnemyIcon
 * @text Enemy: Change STB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the STB Turn Order.
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
 * @command StbTurnOrderEnemyFace
 * @text Enemy: Change STB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the STB Turn Order.
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
 * @command StbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear STB Turn Order Graphic
 * @desc Clears the STB Turn Order graphics for the enemy(ies).
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
 * @text System: STB Turn Order Visibility
 * @desc Determine the visibility of the STB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the STB Turn Order Display.
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
 * @param BattleSystemSTB
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
 * @desc Determines the mechanics of the STB Battle System.
 * @default {"Speed":"","InitialSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\n\\n// Return Speed\\nreturn speed;\"","NextTurnSpeedSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\""}
 *
 * @param Exploit:struct
 * @text Exploit System
 * @type struct<Exploit>
 * @desc Settings for the STB's Exploit System.
 * @default {"EnableExploit:eval":"true","ExploitCritical:eval":"true","ExploitEleWeakness:eval":"true","ExploitEleRate:num":"1.05","TurnResetExploits:eval":"true"}
 *
 * @param Exploited:struct
 * @text Exploited Effects
 * @parent Exploit:struct
 * @type struct<Exploited>
 * @desc Settings for targets being Exploited.
 * @default {"Mechanics":"","AddedStates:arraynum":"[\"13\"]","FullExploitEvents":"","vsActorsFullExploit:num":"0","vsEnemiesFullExploit:num":"0","UnlimitedExploits:eval":"false","CustomJS:func":"\"// Declare Constants\\nconst target = this;\\nconst user = arguments[0];\\nconst action = arguments[1];\\n\\n// Perform Actions\\n\"","Animation":"","AnimationID:num":"0","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"","TextColor:str":"0","FlashColor:eval":"[255, 255, 255, 160]","FlashDuration:num":"60"}
 *
 * @param Exploiter:struct
 * @text Exploiter Effects
 * @parent Exploit:struct
 * @type struct<Exploiter>
 * @desc Settings for users doing the Exploiting.
 * @default {"Mechanics":"","AddedStates:arraynum":"[]","ExtraActions:num":"1","MultipleExploits:eval":"false","CustomJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = arguments[0];\\nconst action = arguments[1];\\n\\n// Perform Actions\\n\"","Animation":"","AnimationID:num":"12","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"ONE MORE!","TextColor:str":"0","FlashColor:eval":"[255, 255, 128, 160]","FlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System STB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","CenterHorz:eval":"true","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","MaxHorzSprites:num":"16","MaxVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
 * @param Speed
 *
 * @param InitialSpeedJS:func
 * @text JS: Initial Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate initial speed at the start of battle.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param NextTurnSpeedSpeedJS:func
 * @text JS: Next Turn Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate speed for a following turn.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Exploit System Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploit:
 *
 * @param EnableExploit:eval
 * @text Enable System?
 * @parent Exploit
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the exploit system? If disabled, ignore all the 
 * mechanics regarding the Exploit System.
 * @default true
 *
 * @param ExploitCritical:eval
 * @text Critical Hits
 * @parent Exploit
 * @type boolean
 * @on Exploit
 * @off Don't Exploit
 * @desc Do critical hits exploit the opponent?
 * @default true
 *
 * @param ExploitEleWeakness:eval
 * @text Elemental Weakness
 * @parent Exploit
 * @type boolean
 * @on Exploit
 * @off Don't Exploit
 * @desc Do elemental weaknesses exploit the opponent?
 * @default true
 *
 * @param ExploitEleRate:num
 * @text Minimum Rate
 * @parent ExploitEleWeakness:eval
 * @desc What's the minimum rate needed to count as an elemental weakness?
 * @default 1.05
 *
 * @param TurnResetExploits:eval
 * @text Reset Each Turn
 * @parent Exploit
 * @type boolean
 * @on Reset Exploits
 * @off Don't Reset
 * @desc Reset exploits at the end of each turn?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Exploited Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploited:
 *
 * @param Mechanics
 * 
 * @param AddedStates:arraynum
 * @text Added States
 * @parent Mechanics
 * @type state[]
 * @desc A list of the states that are added when a target is exploited.
 * @default ["13"]
 * 
 * @param FullExploitEvents
 * @text Full Exploit Events
 * @parent Mechanics
 * 
 * @param vsActorsFullExploit:num
 * @text vs Actors Event
 * @parent FullExploitEvents
 * @type common_event
 * @desc If all actors have been fully exploited, run this common
 * event. Does not work with unlimited exploits.
 * @default 0
 * 
 * @param vsEnemiesFullExploit:num
 * @text vs Enemies Event
 * @parent FullExploitEvents
 * @type common_event
 * @desc If all enemies have been fully exploited, run this common
 * event. Does not work with unlimited exploits.
 * @default 0
 *
 * @param UnlimitedExploits:eval
 * @text Unlimited Exploits
 * @parent Mechanics
 * @type boolean
 * @on Unlimited
 * @off Once Per Turn
 * @desc Can battlers be exploited endlessly?
 * @default false
 *
 * @param CustomJS:func
 * @text JS: On Exploited
 * @parent Mechanics
 * @type note
 * @desc Code used when the target has been exploited.
 * @default "// Declare Constants\nconst target = this;\nconst user = arguments[0];\nconst action = arguments[1];\n\n// Perform Actions\n"
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 0
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default 
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Exploiter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploiter:
 *
 * @param Mechanics
 * 
 * @param AddedStates:arraynum
 * @text Added States
 * @parent Mechanics
 * @type state[]
 * @desc A list of the states that are added when a user exploits a foe.
 * @default []
 * 
 * @param ExtraActions:num
 * @text Extra Actions
 * @parent Mechanics
 * @type number
 * @desc Successfully exploiting an enemy will grant the user this many extra actions.
 * @default 1
 *
 * @param MultipleExploits:eval
 * @text Multiple Exploits
 * @parent Mechanics
 * @type boolean
 * @on Multiple
 * @off Once Per Action
 * @desc Can battlers exploit opponents multiple times with one action?
 * @default false
 *
 * @param CustomJS:func
 * @text JS: On Exploiting
 * @parent Mechanics
 * @type note
 * @desc Code used when the user is exploiting a foe's weakness.
 * @default ""
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 12
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default ONE MORE!
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 128, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
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
 * @param CenterHorz:eval
 * @text Center Horizontal?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Center
 * @off Stay
 * @desc Reposition the Turn Order Display to always be centered
 * if it is a 'top' or 'bottom' position?
 * @default true
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
 * @param MaxHorzSprites:num
 * @text Max Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param MaxVertSprites:num
 * @text Max Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for left and
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

const _0x392d=['addSTBNextTurnSpeed','containerWindow','_graphicFaceIndex','%1SystemBorder','isSTB','shift','ARRAYSTRUCT','_isBattleOver','updateGraphic','_graphicFaceName','Mirror','_stbTurnOrderIconIndex','loadFace','compareBattlerSprites','includes','battleEnd','startTurn','_statusWindow','createActorCommandWindowSTB','finishActorInput','UnlimitedExploits','Enemy','TurnOrder','changeFaceGraphicBitmap','_blendColor','isSceneBattle','traitObjects','_ogWindowLayerY','subject','stbExploitedStates','ExploitCritical','BattleManager_endAction','getNextSubject','StbTurnOrderEnemyFace','_stbExploited','processTurnSTB','_currentActor','_fullHeight','left','executeDamage','fillRect','loadEnemy','unshift','createTurnOrderSTBGraphicIconIndex','AnimationID','SubjectDistance','Settings','isEnemy','speed','call','Game_Battler_performCollapse','225591DJiIsl','_phase','_plural','updateSelectionEffect','_letter','stbExploiterStates','Enemies','BattleManager_selectNextActor','isActor','_stbTurnOrderWindow','aliveMembers','critical','result','EnemyBattlerType','SpriteThin','startActorInput','updateGraphicHue','DisplayPosition','addState','isTurnBased','ExploiterStates','faceIndex','_stbTurnOrderVisible','length','createGraphicSprite','BattleManager_makeActionOrders','%1SystemBg','Exploited','_speed','BattleManager_isTpb','_actionBattlers','addChild','areAllEnemiesExploited','Game_BattlerBase_initMembers','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_isAppeared','ARRAYSTR','selectNextActorSTB','RegExp','Exploit','_letterSprite','containerPosition','format','onBattleStart','executeDamageSTB','becomeSTBExploited','note','AddedStates','STR','defaultPosition','ConvertParams','EnemyBattlerFontFace','148791oFHNAU','ARRAYEVAL','_turnOrderInnerSprite','startInputSTB','Exploiter','StbTurnOrderClearEnemyGraphic','TurnOrderSTBGraphicIconIndex','Mechanics','addChildAt','_isAlive','registerCommand','initBattleSystemSTB','loadSvActor','_backgroundSprite','hasSTBExploited','makeSpeed','face','exit','_positionDuration','prototype','createTurnOrderSTBGraphicType','createBattlerSprites','_stbTurnOrderGraphicType','EnemyBattlerFaceName','return\x200','updateTurnOrder','enemy','MaxHorzSprites','ScreenBuffer','_graphicIconIndex','commandCancelSTB','OrderDirection','1SATjGT','isPartyCommandWindowDisabled','faceWidth','setSTBExploitedFlag','CannotBeExploiter','displayExploitedEffects','members','PopupText','_subject','_unit','update','_stbTurnOrderFaceName','iconWidth','setSTBGraphicIconIndex','Game_Battler_onTurnEnd','description','checkTargetPositions','iconHeight','Game_System_initialize','calculateTargetPositions','CannotBeExploited','_targetHomeY','getColor','ARRAYFUNC','createInitialPositions','initialize','bind','close','isSTBExploited','_surprise','numActions','_ogWindowLayerX','friendsUnit','updateBattleContainerOrder','visible','getStateTooltipBattler','clearRect','_actions','battler','EnemyBattlerDrawLetter','_positionTargetY','opacity','EnemyBattlerFaceIndex','maxBattleMembers','MultipleExploits','svactor','_fadeDuration','fontFace','ShowMarkerBg','TurnOrderSTBGraphicFaceIndex','ExploitEleWeakness','Actor','createBorderSprite','BattleManager_finishActorInput','clearSTB','createAllWindows','EVAL','_stbNextTurnSpeed','StbTurnOrderActorFace','Scene_Battle_commandFight','initMembers','mainSprite','18AWDhnu','create','MaxVertSprites','currentClass','applyGlobalBattleSystemSTB','Scene_Battle_commandCancel','_graphicEnemy','_position','TurnOrderSTBGraphicFaceName','removeActionBattlersSTB','filter','changeEnemyGraphicBitmap','bitmapHeight','checkPosition','padding','Game_Action_executeDamage','min','battlerName','BattleManager_startInput','_partyCommandWindow','setSTBExploited','FlashColor','createSTBTurnOrderWindow','DisplayOffsetX','selectNextCommand','BattleManager_isTurnBased','TurnResetExploits','performActionEnd','actions','Game_Battler_onBattleStart','UpdateFrames','Actors','setup','floor','setItem','_scene','center','_homeDuration','parameters','_stbTurnOrderFaceIndex','bitmapWidth','createLetterSprite','windowRect','onBattleStartSTB','drawText','startInput','_logWindow','_states','blt','_stateTurns','checkOpacity','STRUCT','FaceIndex','BattleManager_isActiveTpb','isAlive','Scene_Battle_createAllWindows','InitialSpeedJS','Game_BattlerBase_appear','isAppeared','commandCancel','createTurnOrderSTBGraphicFaceName','children','FlashDuration','BattleManager_processTurn','RepositionTopHelpY','_actorCommandWindow','EnemyBattlerFontSize','setBlendColor','_graphicHue','createChildren','updateLetter','canInput','toUpperCase','bottom','updateSidePosition','isHorz','_stbExploitAdvantageFlag','endAction','BattleManager_battleSys','Visible','battleSys','clear','Game_Action_speed','processTurn','_turnOrderContainer','StbTurnOrderEnemyIcon','isSTBExploitSystemEnabled','map','_fullWidth','%1BorderColor','processUpdateGraphic','performSTBExploiter','_containerWidth','RepositionTopHelpX','createActorCommandWindow','endActionSTB','areAllActorsExploited','requestFauxAnimation','_targetHomeX','getBattleSystem','stepForward','SpriteLength','autoRemovalTiming','isTpb','FUNC','stbCannotBeExploited','initHomePositions','max','startFade','getStateIdWithName','parse','sort','clearSTBNextTurnSpeed','commandFight','134123bOsZvb','CustomJS','_graphicType','TurnOrderSTBGraphicType','STB','1997mVXwnq','push','EnableExploit','RepositionTopForHelp','bitmap','setText','_handlers','_graphicSprite','boxHeight','changeIconGraphicBitmap','applyGlobal','loadSvEnemy','_index','_positionTargetX','BorderThickness','ExtraActions','hide','ARRAYNUM','getSTBNextTurnSpeed','Game_Action_applyGlobal','clearSTBExploit','171617eLdgnZ','item','mainFontFace','NextTurnSpeedSpeedJS','right','updateTurnOrderSTB','updatePosition','stbCannotBeExploiter','addLoadListener','width','81309NrtdzY','appear','EnemyBattlerIcon','setupTextPopup','performCollapse','Game_BattlerBase_hide','isSideView','updateVisibility','updatePadding','round','match','ParseStateData','onTurnEnd','Game_Battler_performActionEnd','canMove','_stateIDs','name','selectNextActor','_graphicSv','isActionValid','_helpWindow','vsActorsFullExploit','initMembersBattleSystemSTB','svBattlerName','Game_Action_clear','DisplayOffsetY','StbTurnOrderClearActorGraphic','_inputting','_forcedBattlers','Game_Battler_makeSpeed','hasSvBattler','isBattleSystemSTBTurnOrderVisible','265171VeKazr','changeSvActorGraphicBitmap','ActorBattlerIcon','isActiveTpb','createBattlerRect','makeSTBSpeed','_homeX','actor','clearTurnOrderSTBGraphics','test','_fadeTarget','vsEnemiesFullExploit','faceHeight','_homeY','stbGainInstant','anchor','reserveCommonEvent','getChildIndex','constructor','setBattleSystemSTBTurnOrderVisible','top','BattleSystemSTB','ceil','#000000','Mute','1BINqOq','%1\x20%2\x20%3','JSON','loadSystem','setSTBNextTurnSpeed','createTurnOrderSTBGraphicFaceIndex','createBackgroundSprite','icon','trim','height','split'];const _0x22d0=function(_0x5663f8,_0x4e457c){_0x5663f8=_0x5663f8-0x1d8;let _0x392d25=_0x392d[_0x5663f8];return _0x392d25;};const _0x573481=_0x22d0;(function(_0x7d6cd,_0x10b283){const _0xa8e8c0=_0x22d0;while(!![]){try{const _0x1f1d4b=parseInt(_0xa8e8c0(0x2fd))+parseInt(_0xa8e8c0(0x327))+-parseInt(_0xa8e8c0(0x307))*parseInt(_0xa8e8c0(0x340))+parseInt(_0xa8e8c0(0x233))*parseInt(_0xa8e8c0(0x2e3))+-parseInt(_0xa8e8c0(0x213))+-parseInt(_0xa8e8c0(0x1df))+parseInt(_0xa8e8c0(0x271))*parseInt(_0xa8e8c0(0x2e8));if(_0x1f1d4b===_0x10b283)break;else _0x7d6cd['push'](_0x7d6cd['shift']());}catch(_0x1b5d6b){_0x7d6cd['push'](_0x7d6cd['shift']());}}}(_0x392d,0x24e7e));var label=_0x573481(0x33c),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x573481(0x27b)](function(_0x2e0f0b){const _0x571ffb=_0x573481;return _0x2e0f0b['status']&&_0x2e0f0b[_0x571ffb(0x242)][_0x571ffb(0x359)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x573481(0x1da)]||{},VisuMZ[_0x573481(0x211)]=function(_0x4f713c,_0x24bcd5){const _0x1cc0b5=_0x573481;for(const _0x17fb15 in _0x24bcd5){if(_0x17fb15[_0x1cc0b5(0x311)](/(.*):(.*)/i)){const _0x5138cd=String(RegExp['$1']),_0x3b8b1c=String(RegExp['$2'])[_0x1cc0b5(0x2b9)]()[_0x1cc0b5(0x348)]();let _0x1f23ac,_0x42becf,_0x5c470f;switch(_0x3b8b1c){case'NUM':_0x1f23ac=_0x24bcd5[_0x17fb15]!==''?Number(_0x24bcd5[_0x17fb15]):0x0;break;case _0x1cc0b5(0x2f9):_0x42becf=_0x24bcd5[_0x17fb15]!==''?JSON[_0x1cc0b5(0x2df)](_0x24bcd5[_0x17fb15]):[],_0x1f23ac=_0x42becf[_0x1cc0b5(0x2c8)](_0x41c102=>Number(_0x41c102));break;case _0x1cc0b5(0x26b):_0x1f23ac=_0x24bcd5[_0x17fb15]!==''?eval(_0x24bcd5[_0x17fb15]):null;break;case _0x1cc0b5(0x214):_0x42becf=_0x24bcd5[_0x17fb15]!==''?JSON['parse'](_0x24bcd5[_0x17fb15]):[],_0x1f23ac=_0x42becf[_0x1cc0b5(0x2c8)](_0x170d5b=>eval(_0x170d5b));break;case _0x1cc0b5(0x342):_0x1f23ac=_0x24bcd5[_0x17fb15]!==''?JSON[_0x1cc0b5(0x2df)](_0x24bcd5[_0x17fb15]):'';break;case'ARRAYJSON':_0x42becf=_0x24bcd5[_0x17fb15]!==''?JSON['parse'](_0x24bcd5[_0x17fb15]):[],_0x1f23ac=_0x42becf[_0x1cc0b5(0x2c8)](_0x50d7cf=>JSON[_0x1cc0b5(0x2df)](_0x50d7cf));break;case _0x1cc0b5(0x2d9):_0x1f23ac=_0x24bcd5[_0x17fb15]!==''?new Function(JSON[_0x1cc0b5(0x2df)](_0x24bcd5[_0x17fb15])):new Function(_0x1cc0b5(0x22b));break;case _0x1cc0b5(0x24a):_0x42becf=_0x24bcd5[_0x17fb15]!==''?JSON[_0x1cc0b5(0x2df)](_0x24bcd5[_0x17fb15]):[],_0x1f23ac=_0x42becf[_0x1cc0b5(0x2c8)](_0xe7e06c=>new Function(JSON[_0x1cc0b5(0x2df)](_0xe7e06c)));break;case _0x1cc0b5(0x20f):_0x1f23ac=_0x24bcd5[_0x17fb15]!==''?String(_0x24bcd5[_0x17fb15]):'';break;case _0x1cc0b5(0x203):_0x42becf=_0x24bcd5[_0x17fb15]!==''?JSON[_0x1cc0b5(0x2df)](_0x24bcd5[_0x17fb15]):[],_0x1f23ac=_0x42becf['map'](_0x5d050e=>String(_0x5d050e));break;case _0x1cc0b5(0x2a4):_0x5c470f=_0x24bcd5[_0x17fb15]!==''?JSON[_0x1cc0b5(0x2df)](_0x24bcd5[_0x17fb15]):{},_0x1f23ac=VisuMZ['ConvertParams']({},_0x5c470f);break;case _0x1cc0b5(0x351):_0x42becf=_0x24bcd5[_0x17fb15]!==''?JSON[_0x1cc0b5(0x2df)](_0x24bcd5[_0x17fb15]):[],_0x1f23ac=_0x42becf[_0x1cc0b5(0x2c8)](_0x20a88f=>VisuMZ[_0x1cc0b5(0x211)]({},JSON[_0x1cc0b5(0x2df)](_0x20a88f)));break;default:continue;}_0x4f713c[_0x5138cd]=_0x1f23ac;}}return _0x4f713c;},(_0x44c474=>{const _0x3091fc=_0x573481,_0x4e8c54=_0x44c474['name'];for(const _0x3a5af5 of dependencies){if(!Imported[_0x3a5af5]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x3091fc(0x209)](_0x4e8c54,_0x3a5af5)),SceneManager[_0x3091fc(0x224)]();break;}}const _0x45f682=_0x44c474[_0x3091fc(0x242)];if(_0x45f682[_0x3091fc(0x311)](/\[Version[ ](.*?)\]/i)){const _0x4d1617=Number(RegExp['$1']);_0x4d1617!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x3091fc(0x209)](_0x4e8c54,_0x4d1617)),SceneManager['exit']());}if(_0x45f682[_0x3091fc(0x311)](/\[Tier[ ](\d+)\]/i)){const _0x349e8d=Number(RegExp['$1']);_0x349e8d<tier?(alert(_0x3091fc(0x201)[_0x3091fc(0x209)](_0x4e8c54,_0x349e8d,tier)),SceneManager[_0x3091fc(0x224)]()):tier=Math['max'](_0x349e8d,tier);}VisuMZ[_0x3091fc(0x211)](VisuMZ[label][_0x3091fc(0x1da)],_0x44c474[_0x3091fc(0x297)]);})(pluginData),PluginManager[_0x573481(0x21d)](pluginData[_0x573481(0x317)],'StbTurnOrderActorIcon',_0x31c440=>{const _0x4614a2=_0x573481;VisuMZ['ConvertParams'](_0x31c440,_0x31c440);const _0x5e01af=_0x31c440[_0x4614a2(0x290)],_0x39180c=_0x31c440['IconIndex'];for(const _0x5c3ce9 of _0x5e01af){const _0x36e0d5=$gameActors['actor'](_0x5c3ce9);if(!_0x36e0d5)continue;_0x36e0d5['_stbTurnOrderGraphicType']=_0x4614a2(0x347),_0x36e0d5[_0x4614a2(0x356)]=_0x39180c;}}),PluginManager[_0x573481(0x21d)](pluginData[_0x573481(0x317)],_0x573481(0x26d),_0x15e176=>{const _0x5342d9=_0x573481;VisuMZ[_0x5342d9(0x211)](_0x15e176,_0x15e176);const _0x166982=_0x15e176['Actors'],_0x1e8305=_0x15e176['FaceName'],_0x3bbefa=_0x15e176[_0x5342d9(0x2a5)];for(const _0x8ec3f2 of _0x166982){const _0x4cdc27=$gameActors[_0x5342d9(0x32e)](_0x8ec3f2);if(!_0x4cdc27)continue;_0x4cdc27[_0x5342d9(0x229)]='face',_0x4cdc27['_stbTurnOrderFaceName']=_0x1e8305,_0x4cdc27['_stbTurnOrderFaceIndex']=_0x3bbefa;}}),PluginManager[_0x573481(0x21d)](pluginData[_0x573481(0x317)],_0x573481(0x321),_0x3a60d9=>{const _0x178255=_0x573481;VisuMZ[_0x178255(0x211)](_0x3a60d9,_0x3a60d9);const _0x44c4da=_0x3a60d9[_0x178255(0x290)];for(const _0x38b3dc of _0x44c4da){const _0x212231=$gameActors['actor'](_0x38b3dc);if(!_0x212231)continue;_0x212231['clearTurnOrderSTBGraphics']();}}),PluginManager[_0x573481(0x21d)](pluginData[_0x573481(0x317)],_0x573481(0x2c6),_0x3408b9=>{const _0x3ecaea=_0x573481;VisuMZ['ConvertParams'](_0x3408b9,_0x3408b9);const _0x14d100=_0x3408b9['Enemies'],_0x1c294=_0x3408b9['IconIndex'];for(const _0x16e395 of _0x14d100){const _0x5ab50f=$gameTroop[_0x3ecaea(0x239)]()[_0x16e395];if(!_0x5ab50f)continue;_0x5ab50f[_0x3ecaea(0x229)]=_0x3ecaea(0x347),_0x5ab50f[_0x3ecaea(0x356)]=_0x1c294;}}),PluginManager[_0x573481(0x21d)](pluginData['name'],_0x573481(0x36c),_0x504b9e=>{const _0x29f42d=_0x573481;VisuMZ['ConvertParams'](_0x504b9e,_0x504b9e);const _0x594580=_0x504b9e[_0x29f42d(0x1e5)],_0x3c7513=_0x504b9e['FaceName'],_0xf72453=_0x504b9e['FaceIndex'];for(const _0x2eb8e7 of _0x594580){const _0x24a067=$gameTroop['members']()[_0x2eb8e7];if(!_0x24a067)continue;_0x24a067[_0x29f42d(0x229)]=_0x29f42d(0x223),_0x24a067['_stbTurnOrderFaceName']=_0x3c7513,_0x24a067['_stbTurnOrderFaceIndex']=_0xf72453;}}),PluginManager['registerCommand'](pluginData[_0x573481(0x317)],_0x573481(0x218),_0x205fbd=>{const _0x2ddba9=_0x573481;VisuMZ[_0x2ddba9(0x211)](_0x205fbd,_0x205fbd);const _0x61023b=_0x205fbd[_0x2ddba9(0x1e5)];for(const _0x6e3de of _0x61023b){const _0x1b0e3e=$gameTroop[_0x2ddba9(0x239)]()[_0x6e3de];if(!_0x1b0e3e)continue;_0x1b0e3e[_0x2ddba9(0x32f)]();}}),PluginManager[_0x573481(0x21d)](pluginData[_0x573481(0x317)],'SystemTurnOrderVisibility',_0x4e57ca=>{const _0x982e9c=_0x573481;VisuMZ[_0x982e9c(0x211)](_0x4e57ca,_0x4e57ca);const _0x5789ce=_0x4e57ca[_0x982e9c(0x2c0)];$gameSystem[_0x982e9c(0x33a)](_0x5789ce);}),VisuMZ[_0x573481(0x33c)][_0x573481(0x205)]={'Instant':/<STB (?:INSTANT|INSTANT CAST|Instant Use)>/i,'CannotBeExploited':/<STB CANNOT BE EXPLOITED>/i,'CannotBeExploiter':/<STB CANNOT BE EXPLOITER>/i,'ExploitedStates':/<STB EXPLOITED GAIN (?:STATE|STATES):[ ](.*)>/i,'ExploiterStates':/<STB EXPLOITER GAIN (?:STATE|STATES):[ ](.*)>/i},DataManager[_0x573481(0x2de)]=function(_0x4d2481){const _0x59ebad=_0x573481;_0x4d2481=_0x4d2481['toUpperCase']()[_0x59ebad(0x348)](),this[_0x59ebad(0x316)]=this['_stateIDs']||{};if(this[_0x59ebad(0x316)][_0x4d2481])return this['_stateIDs'][_0x4d2481];for(const _0x1d2f83 of $dataStates){if(!_0x1d2f83)continue;this[_0x59ebad(0x316)][_0x1d2f83['name'][_0x59ebad(0x2b9)]()[_0x59ebad(0x348)]()]=_0x1d2f83['id'];}return this[_0x59ebad(0x316)][_0x4d2481]||0x0;},SceneManager[_0x573481(0x364)]=function(){const _0x24e27d=_0x573481;return this[_0x24e27d(0x294)]&&this[_0x24e27d(0x294)]['constructor']===Scene_Battle;},VisuMZ[_0x573481(0x33c)][_0x573481(0x2bf)]=BattleManager[_0x573481(0x2c1)],BattleManager[_0x573481(0x2c1)]=function(){const _0x3ef451=_0x573481;if(this[_0x3ef451(0x34f)]())return _0x3ef451(0x2e7);return VisuMZ[_0x3ef451(0x33c)][_0x3ef451(0x2bf)][_0x3ef451(0x1dd)](this);},BattleManager[_0x573481(0x34f)]=function(){const _0x4dc324=_0x573481;return $gameSystem[_0x4dc324(0x2d4)]()==='STB';},VisuMZ[_0x573481(0x33c)][_0x573481(0x1fc)]=BattleManager['isTpb'],BattleManager[_0x573481(0x2d8)]=function(){const _0x546a18=_0x573481;if(this[_0x546a18(0x34f)]())return![];return VisuMZ[_0x546a18(0x33c)][_0x546a18(0x1fc)][_0x546a18(0x1dd)](this);},VisuMZ[_0x573481(0x33c)][_0x573481(0x2a6)]=BattleManager['isActiveTpb'],BattleManager[_0x573481(0x32a)]=function(){const _0x186364=_0x573481;if(this[_0x186364(0x34f)]())return![];return VisuMZ['BattleSystemSTB']['BattleManager_isActiveTpb']['call'](this);},VisuMZ[_0x573481(0x33c)][_0x573481(0x28a)]=BattleManager[_0x573481(0x1f2)],BattleManager[_0x573481(0x1f2)]=function(){const _0xaf20d2=_0x573481;if(this[_0xaf20d2(0x34f)]())return!![];return VisuMZ[_0xaf20d2(0x33c)][_0xaf20d2(0x28a)][_0xaf20d2(0x1dd)](this);},VisuMZ[_0x573481(0x33c)][_0x573481(0x283)]=BattleManager[_0x573481(0x29e)],BattleManager[_0x573481(0x29e)]=function(){const _0x32b9af=_0x573481;VisuMZ['BattleSystemSTB'][_0x32b9af(0x283)][_0x32b9af(0x1dd)](this);if(this['isSTB']()&&$gameParty['canInput']()&&!this[_0x32b9af(0x250)])this[_0x32b9af(0x216)]();},BattleManager['startInputSTB']=function(){const _0x49b376=_0x573481;this[_0x49b376(0x35b)]();},VisuMZ[_0x573481(0x33c)][_0x573481(0x2b0)]=BattleManager[_0x573481(0x2c4)],BattleManager['processTurn']=function(){const _0x1dce5d=_0x573481;this[_0x1dce5d(0x34f)]()?this[_0x1dce5d(0x36e)]():VisuMZ[_0x1dce5d(0x33c)][_0x1dce5d(0x2b0)]['call'](this);},BattleManager[_0x573481(0x36e)]=function(){const _0x359baf=_0x573481,_0x492c5d=this[_0x359baf(0x23b)];if(_0x492c5d[_0x359baf(0x1e7)]()&&_0x492c5d[_0x359baf(0x2b8)]()){const _0x46ee0a=_0x492c5d['currentAction']();if(!_0x46ee0a)VisuMZ['BattleSystemSTB'][_0x359baf(0x2b0)][_0x359baf(0x1dd)](this);else _0x46ee0a['_forceAction']?VisuMZ[_0x359baf(0x33c)][_0x359baf(0x2b0)][_0x359baf(0x1dd)](this):(this['_currentActor']=_0x492c5d,this[_0x359baf(0x1ee)]());}else VisuMZ['BattleSystemSTB']['BattleManager_processTurn'][_0x359baf(0x1dd)](this);},VisuMZ[_0x573481(0x33c)][_0x573481(0x268)]=BattleManager['finishActorInput'],BattleManager[_0x573481(0x35e)]=function(){const _0x2ffdf1=_0x573481;this[_0x2ffdf1(0x34f)]()?VisuMZ[_0x2ffdf1(0x33c)][_0x2ffdf1(0x2b0)]['call'](this):VisuMZ[_0x2ffdf1(0x33c)]['BattleManager_finishActorInput']['call'](this);},VisuMZ[_0x573481(0x33c)][_0x573481(0x1e6)]=BattleManager[_0x573481(0x318)],BattleManager[_0x573481(0x318)]=function(){const _0x4c817b=_0x573481;this['isSTB']()?this[_0x4c817b(0x204)]():VisuMZ[_0x4c817b(0x33c)][_0x4c817b(0x1e6)][_0x4c817b(0x1dd)](this);},BattleManager[_0x573481(0x204)]=function(){const _0x73be53=_0x573481;this[_0x73be53(0x36f)]=null,this[_0x73be53(0x322)]=![];},VisuMZ['BattleSystemSTB'][_0x573481(0x36a)]=BattleManager[_0x573481(0x2be)],BattleManager[_0x573481(0x2be)]=function(){const _0xb256bb=_0x573481;VisuMZ[_0xb256bb(0x33c)][_0xb256bb(0x36a)]['call'](this),this[_0xb256bb(0x2d0)]();},BattleManager[_0x573481(0x2d0)]=function(){const _0x15208b=_0x573481;if(!this[_0x15208b(0x34f)]())return;this[_0x15208b(0x27a)]();this['_forcedBattlers'][_0x15208b(0x1f6)]>0x0&&(this['_subject']&&(!this[_0x15208b(0x1fd)][_0x15208b(0x359)](this[_0x15208b(0x23b)])&&this[_0x15208b(0x1fd)]['unshift'](this[_0x15208b(0x23b)])),this[_0x15208b(0x23b)]=this[_0x15208b(0x36b)]());;},BattleManager[_0x573481(0x2c7)]=function(){const _0x5c413b=_0x573481;return VisuMZ[_0x5c413b(0x33c)][_0x5c413b(0x1da)][_0x5c413b(0x206)][_0x5c413b(0x2ea)];},BattleManager[_0x573481(0x2d1)]=function(){const _0x5c3fac=_0x573481,_0x5811fd=$gameParty['aliveMembers']()[_0x5c3fac(0x27b)](_0x18da5f=>_0x18da5f[_0x5c3fac(0x2ab)]()),_0x512efc=_0x5811fd[_0x5c3fac(0x27b)](_0x4208de=>_0x4208de[_0x5c3fac(0x24f)]());return _0x5811fd[_0x5c3fac(0x1f6)]===_0x512efc[_0x5c3fac(0x1f6)];},BattleManager[_0x573481(0x1ff)]=function(){const _0x1cb24f=_0x573481,_0x329e78=$gameTroop[_0x1cb24f(0x1e9)]()[_0x1cb24f(0x27b)](_0x3af5d6=>_0x3af5d6[_0x1cb24f(0x2ab)]()),_0x45e99b=_0x329e78[_0x1cb24f(0x27b)](_0x4fdde3=>_0x4fdde3[_0x1cb24f(0x24f)]());return _0x329e78[_0x1cb24f(0x1f6)]===_0x45e99b[_0x1cb24f(0x1f6)];},VisuMZ['BattleSystemSTB'][_0x573481(0x1f8)]=BattleManager['makeActionOrders'],BattleManager['makeActionOrders']=function(){const _0x35be0b=_0x573481;VisuMZ[_0x35be0b(0x33c)]['BattleManager_makeActionOrders'][_0x35be0b(0x1dd)](this),this[_0x35be0b(0x34f)]()&&this[_0x35be0b(0x302)]();},BattleManager[_0x573481(0x27a)]=function(){const _0x42b159=_0x573481;if(!this['isSTB']())return;this['_actionBattlers']=this[_0x42b159(0x1fd)]||[],this[_0x42b159(0x1fd)]=this['_actionBattlers'][_0x42b159(0x27b)](_0x423ff5=>_0x423ff5&&_0x423ff5[_0x42b159(0x2ab)]()&&_0x423ff5['isAlive']()),this[_0x42b159(0x302)]();},BattleManager[_0x573481(0x302)]=function(_0x3d3da2){const _0x1c42e2=_0x573481;if(!this['isSTB']())return;const _0x2b75e5=SceneManager[_0x1c42e2(0x294)][_0x1c42e2(0x1e8)];if(!_0x2b75e5)return;_0x2b75e5[_0x1c42e2(0x22c)](_0x3d3da2);},VisuMZ[_0x573481(0x33c)][_0x573481(0x245)]=Game_System[_0x573481(0x226)]['initialize'],Game_System[_0x573481(0x226)][_0x573481(0x24c)]=function(){const _0x23fef5=_0x573481;VisuMZ['BattleSystemSTB'][_0x23fef5(0x245)][_0x23fef5(0x1dd)](this),this[_0x23fef5(0x21e)]();},Game_System[_0x573481(0x226)][_0x573481(0x21e)]=function(){const _0xd64762=_0x573481;this[_0xd64762(0x1f5)]=!![];},Game_System['prototype'][_0x573481(0x326)]=function(){const _0x51b108=_0x573481;return this[_0x51b108(0x1f5)]===undefined&&this[_0x51b108(0x21e)](),this[_0x51b108(0x1f5)];},Game_System[_0x573481(0x226)][_0x573481(0x33a)]=function(_0x20ccf6){const _0x8627a5=_0x573481;this[_0x8627a5(0x1f5)]===undefined&&this[_0x8627a5(0x21e)](),this[_0x8627a5(0x1f5)]=_0x20ccf6;},VisuMZ['BattleSystemSTB'][_0x573481(0x2c3)]=Game_Action[_0x573481(0x226)]['speed'],Game_Action[_0x573481(0x226)][_0x573481(0x1dc)]=function(){const _0x47a2d5=_0x573481;return BattleManager[_0x47a2d5(0x34f)]()?0x0:VisuMZ[_0x47a2d5(0x33c)][_0x47a2d5(0x2c3)][_0x47a2d5(0x1dd)](this);},VisuMZ['BattleSystemSTB']['Game_Action_applyGlobal']=Game_Action['prototype'][_0x573481(0x2f2)],Game_Action[_0x573481(0x226)]['applyGlobal']=function(){const _0x40fcb1=_0x573481;VisuMZ[_0x40fcb1(0x33c)][_0x40fcb1(0x2fb)][_0x40fcb1(0x1dd)](this),this[_0x40fcb1(0x275)]();},Game_Action[_0x573481(0x226)][_0x573481(0x275)]=function(){const _0x5b3a96=_0x573481;if(!SceneManager[_0x5b3a96(0x364)]())return;if(!BattleManager[_0x5b3a96(0x34f)]())return;const _0xe8bb26=this[_0x5b3a96(0x2fe)](),_0x5b19df=VisuMZ[_0x5b3a96(0x33c)]['RegExp'],_0x10f672=VisuMZ['BattleSystemSTB'][_0x5b3a96(0x1da)][_0x5b3a96(0x21a)];_0xe8bb26&&_0xe8bb26['note'][_0x5b3a96(0x311)](_0x5b19df['Instant'])&&this['subject']()[_0x5b3a96(0x335)](0x1);const _0x1d2dbe=_0x10f672[_0x5b3a96(0x300)][_0x5b3a96(0x1dd)](this);this[_0x5b3a96(0x367)]()[_0x5b3a96(0x34b)](_0x1d2dbe);},VisuMZ['BattleSystemSTB']['Game_Action_clear']=Game_Action[_0x573481(0x226)]['clear'],Game_Action[_0x573481(0x226)][_0x573481(0x2c2)]=function(){const _0x210791=_0x573481;VisuMZ[_0x210791(0x33c)][_0x210791(0x31f)][_0x210791(0x1dd)](this),this[_0x210791(0x269)]();},Game_Action[_0x573481(0x226)][_0x573481(0x269)]=function(){this['_stbExploitAdvantageFlag']=![];},Game_Action[_0x573481(0x226)][_0x573481(0x221)]=function(){const _0x52e09f=_0x573481;return this[_0x52e09f(0x2bd)]===undefined&&this[_0x52e09f(0x269)](),this['_stbExploitAdvantageFlag'];},Game_Action['prototype']['setSTBExploitedFlag']=function(_0xf3546e){const _0x579e20=_0x573481;this[_0x579e20(0x2bd)]===undefined&&this['clearSTB'](),this['_stbExploitAdvantageFlag']=_0xf3546e;},VisuMZ[_0x573481(0x33c)][_0x573481(0x280)]=Game_Action['prototype']['executeDamage'],Game_Action[_0x573481(0x226)][_0x573481(0x372)]=function(_0x3a1685,_0x3cadcb){const _0x49db07=_0x573481;VisuMZ[_0x49db07(0x33c)][_0x49db07(0x280)][_0x49db07(0x1dd)](this,_0x3a1685,_0x3cadcb),this['executeDamageSTB'](_0x3a1685);},Game_Action[_0x573481(0x226)][_0x573481(0x20b)]=function(_0x2d12bc){const _0x5cacc5=_0x573481;if(!SceneManager[_0x5cacc5(0x364)]())return;if(!BattleManager[_0x5cacc5(0x34f)]())return;if(!BattleManager['isSTBExploitSystemEnabled']())return;if(_0x2d12bc[_0x5cacc5(0x253)]()===this['subject']()['friendsUnit']())return;const _0x321a95=VisuMZ['BattleSystemSTB'][_0x5cacc5(0x1da)][_0x5cacc5(0x206)],_0x11c295=_0x2d12bc[_0x5cacc5(0x1eb)]();_0x321a95[_0x5cacc5(0x369)]&&_0x11c295[_0x5cacc5(0x1ea)]&&(this['subject']()[_0x5cacc5(0x2cc)](_0x2d12bc,this),_0x2d12bc['becomeSTBExploited'](this[_0x5cacc5(0x367)](),this));if(_0x321a95[_0x5cacc5(0x265)]){const _0x1abf57=this['calcElementRate'](_0x2d12bc);_0x1abf57>=_0x321a95['ExploitEleRate']&&(this['subject']()[_0x5cacc5(0x2cc)](_0x2d12bc,this),_0x2d12bc[_0x5cacc5(0x20c)](this[_0x5cacc5(0x367)](),this));}},VisuMZ[_0x573481(0x33c)][_0x573481(0x200)]=Game_BattlerBase[_0x573481(0x226)][_0x573481(0x26f)],Game_BattlerBase[_0x573481(0x226)][_0x573481(0x26f)]=function(){const _0x29f0c9=_0x573481;VisuMZ[_0x29f0c9(0x33c)][_0x29f0c9(0x200)][_0x29f0c9(0x1dd)](this),this[_0x29f0c9(0x31d)]();},Game_BattlerBase[_0x573481(0x226)][_0x573481(0x31d)]=function(){const _0x52bb1b=_0x573481;this[_0x52bb1b(0x2e1)](),this[_0x52bb1b(0x2fc)]();},Game_BattlerBase[_0x573481(0x226)][_0x573481(0x2e1)]=function(){const _0x537038=_0x573481;this[_0x537038(0x26c)]=0x0;},Game_BattlerBase[_0x573481(0x226)]['getSTBNextTurnSpeed']=function(){const _0x3c32ef=_0x573481;return this[_0x3c32ef(0x26c)]===undefined&&this['initMembersBattleSystemSTB'](),this['_stbNextTurnSpeed'];},Game_BattlerBase[_0x573481(0x226)]['setSTBNextTurnSpeed']=function(_0x2fe217){const _0x119b69=_0x573481;this['_stbNextTurnSpeed']===undefined&&this[_0x119b69(0x31d)](),this['_stbNextTurnSpeed']=_0x2fe217;},Game_BattlerBase['prototype'][_0x573481(0x34b)]=function(_0x463a14){const _0x4aff3d=_0x573481;this[_0x4aff3d(0x26c)]===undefined&&this[_0x4aff3d(0x31d)](),_0x463a14+=this[_0x4aff3d(0x2fa)](),this['setSTBNextTurnSpeed'](_0x463a14);},Game_BattlerBase[_0x573481(0x226)][_0x573481(0x2fc)]=function(){const _0x22ce20=_0x573481;this[_0x22ce20(0x36d)]=![];},Game_BattlerBase[_0x573481(0x226)][_0x573481(0x24f)]=function(){const _0x4919f9=_0x573481;return this[_0x4919f9(0x36d)]===undefined&&this[_0x4919f9(0x31d)](),this[_0x4919f9(0x36d)];},Game_BattlerBase[_0x573481(0x226)][_0x573481(0x285)]=function(_0x162fdc){const _0x5aa386=_0x573481;this['_stbExploited']===undefined&&this[_0x5aa386(0x31d)](),this[_0x5aa386(0x36d)]=_0x162fdc;},Game_BattlerBase['prototype'][_0x573481(0x2da)]=function(){const _0xf0fb3c=_0x573481,_0x13f494=VisuMZ['BattleSystemSTB'][_0xf0fb3c(0x205)][_0xf0fb3c(0x247)];return this[_0xf0fb3c(0x365)]()['some'](_0x212835=>_0x212835[_0xf0fb3c(0x20d)][_0xf0fb3c(0x311)](_0x13f494));},Game_BattlerBase[_0x573481(0x226)][_0x573481(0x304)]=function(){const _0x37aefe=_0x573481,_0x32bda6=VisuMZ[_0x37aefe(0x33c)][_0x37aefe(0x205)][_0x37aefe(0x237)];return this['traitObjects']()['some'](_0x539aeb=>_0x539aeb['note'][_0x37aefe(0x311)](_0x32bda6));},Game_BattlerBase[_0x573481(0x226)]['clearTurnOrderSTBGraphics']=function(){const _0x122653=_0x573481;delete this[_0x122653(0x229)],delete this[_0x122653(0x23e)],delete this[_0x122653(0x298)],delete this[_0x122653(0x356)];},Game_BattlerBase[_0x573481(0x226)]['TurnOrderSTBGraphicType']=function(){const _0x2c89b2=_0x573481;return this[_0x2c89b2(0x229)]===undefined&&(this[_0x2c89b2(0x229)]=this[_0x2c89b2(0x227)]()),this['_stbTurnOrderGraphicType'];},Game_BattlerBase['prototype'][_0x573481(0x227)]=function(){const _0x465b2e=_0x573481;return Window_STB_TurnOrder[_0x465b2e(0x1da)][_0x465b2e(0x1ec)];},Game_BattlerBase[_0x573481(0x226)][_0x573481(0x279)]=function(){const _0x588846=_0x573481;return this[_0x588846(0x23e)]===undefined&&(this[_0x588846(0x23e)]=this[_0x588846(0x2ad)]()),this[_0x588846(0x23e)];},Game_BattlerBase['prototype'][_0x573481(0x2ad)]=function(){const _0x423f2a=_0x573481;return Window_STB_TurnOrder[_0x423f2a(0x1da)][_0x423f2a(0x22a)];},Game_BattlerBase['prototype']['TurnOrderSTBGraphicFaceIndex']=function(){const _0x5853a8=_0x573481;return this['_stbTurnOrderFaceIndex']===undefined&&(this[_0x5853a8(0x298)]=this[_0x5853a8(0x345)]()),this[_0x5853a8(0x298)];},Game_BattlerBase[_0x573481(0x226)][_0x573481(0x345)]=function(){const _0x4f38d0=_0x573481;return Window_STB_TurnOrder[_0x4f38d0(0x1da)][_0x4f38d0(0x25d)];},Game_BattlerBase[_0x573481(0x226)][_0x573481(0x219)]=function(){const _0x159816=_0x573481;return this[_0x159816(0x356)]===undefined&&(this[_0x159816(0x356)]=this[_0x159816(0x376)]()),this[_0x159816(0x356)];},Game_BattlerBase['prototype'][_0x573481(0x376)]=function(){const _0x435cb6=_0x573481;return Window_STB_TurnOrder[_0x435cb6(0x1da)][_0x435cb6(0x309)];},Game_BattlerBase[_0x573481(0x226)][_0x573481(0x240)]=function(_0x1c7d18){this['_stbTurnOrderIconIndex']=_0x1c7d18;},VisuMZ[_0x573481(0x33c)][_0x573481(0x30c)]=Game_BattlerBase['prototype'][_0x573481(0x2f8)],Game_BattlerBase[_0x573481(0x226)]['hide']=function(){const _0x46807d=_0x573481;VisuMZ['BattleSystemSTB']['Game_BattlerBase_hide'][_0x46807d(0x1dd)](this),BattleManager[_0x46807d(0x27a)]();},VisuMZ[_0x573481(0x33c)][_0x573481(0x2aa)]=Game_BattlerBase[_0x573481(0x226)][_0x573481(0x308)],Game_BattlerBase['prototype'][_0x573481(0x308)]=function(){const _0x16d5d8=_0x573481;VisuMZ[_0x16d5d8(0x33c)][_0x16d5d8(0x2aa)][_0x16d5d8(0x1dd)](this),BattleManager[_0x16d5d8(0x27a)]();},VisuMZ[_0x573481(0x33c)]['Game_Battler_performCollapse']=Game_Battler[_0x573481(0x226)][_0x573481(0x30b)],Game_Battler['prototype'][_0x573481(0x30b)]=function(){const _0x3ab2d6=_0x573481;VisuMZ[_0x3ab2d6(0x33c)][_0x3ab2d6(0x1de)][_0x3ab2d6(0x1dd)](this),BattleManager[_0x3ab2d6(0x27a)]();},VisuMZ[_0x573481(0x33c)][_0x573481(0x28e)]=Game_Battler[_0x573481(0x226)][_0x573481(0x20a)],Game_Battler[_0x573481(0x226)]['onBattleStart']=function(_0x378875){const _0x168133=_0x573481;VisuMZ[_0x168133(0x33c)][_0x168133(0x28e)][_0x168133(0x1dd)](this,_0x378875),this['onBattleStartSTB'](_0x378875);},Game_Battler[_0x573481(0x226)][_0x573481(0x29c)]=function(_0x10b62c){const _0x38fe86=_0x573481;if(!BattleManager[_0x38fe86(0x34f)]())return;this[_0x38fe86(0x2fc)]();const _0x1485ef=new Game_Action(this),_0x259869=VisuMZ[_0x38fe86(0x33c)][_0x38fe86(0x1da)][_0x38fe86(0x21a)][_0x38fe86(0x2a9)][_0x38fe86(0x1dd)](_0x1485ef);this[_0x38fe86(0x344)](_0x259869);},VisuMZ[_0x573481(0x33c)][_0x573481(0x241)]=Game_Battler['prototype'][_0x573481(0x313)],Game_Battler[_0x573481(0x226)]['onTurnEnd']=function(){const _0xa1c9bc=_0x573481;VisuMZ[_0xa1c9bc(0x33c)]['Game_Battler_onTurnEnd']['call'](this),BattleManager[_0xa1c9bc(0x34f)]()&&VisuMZ[_0xa1c9bc(0x33c)][_0xa1c9bc(0x1da)]['Exploit'][_0xa1c9bc(0x28b)]&&this[_0xa1c9bc(0x2fc)]();},VisuMZ[_0x573481(0x33c)]['Game_Battler_performActionEnd']=Game_Battler[_0x573481(0x226)][_0x573481(0x28c)],Game_Battler[_0x573481(0x226)][_0x573481(0x28c)]=function(){const _0x196cd5=_0x573481;VisuMZ[_0x196cd5(0x33c)][_0x196cd5(0x314)][_0x196cd5(0x1dd)](this),BattleManager['isSTB']()&&this['performActionEndSTB']();},Game_Battler[_0x573481(0x226)]['performActionEndSTB']=function(){const _0x5173be=_0x573481;if(this[_0x5173be(0x251)]()>0x0&&this===BattleManager['_subject']){const _0x33e853=BattleManager[_0x5173be(0x323)];if(_0x33e853[_0x5173be(0x1f6)]>0x0&&_0x33e853[0x0]!==this)return;const _0x1216c9=this[_0x5173be(0x259)]();if(_0x1216c9)_0x1216c9[_0x5173be(0x2d5)]();}},VisuMZ['BattleSystemSTB'][_0x573481(0x324)]=Game_Battler['prototype'][_0x573481(0x222)],Game_Battler['prototype']['makeSpeed']=function(){const _0x5a4625=_0x573481;BattleManager[_0x5a4625(0x34f)]()?this[_0x5a4625(0x32c)]():VisuMZ[_0x5a4625(0x33c)][_0x5a4625(0x324)][_0x5a4625(0x1dd)](this);},Game_Battler[_0x573481(0x226)][_0x573481(0x32c)]=function(){const _0x53f38e=_0x573481;this[_0x53f38e(0x1fb)]=this[_0x53f38e(0x2fa)](),this[_0x53f38e(0x344)](0x0);},Game_Battler['prototype']['stbUpdateStatesActionEnd']=function(){const _0x1e40c9=_0x573481;for(const _0x2a95f6 of this[_0x1e40c9(0x2a0)]){const _0x363d08=$dataStates[_0x2a95f6];if(!_0x363d08)continue;if(_0x363d08[_0x1e40c9(0x2d7)]!==0x1)continue;this['_stateTurns'][_0x2a95f6]>0x0&&this[_0x1e40c9(0x2a2)][_0x2a95f6]--;}this['removeStatesAuto'](0x1);},Game_Battler['prototype'][_0x573481(0x368)]=function(){const _0x1247c1=_0x573481,_0x3f784d=this[_0x1247c1(0x1e7)]()?this[_0x1247c1(0x274)]()[_0x1247c1(0x20d)]:this['enemy']()['note'];if(_0x3f784d[_0x1247c1(0x311)](VisuMZ['BattleSystemSTB'][_0x1247c1(0x205)]['ExploitedStates']))return VisuMZ['BattleSystemSTB']['ParseStateData'](RegExp['$1']);return VisuMZ[_0x1247c1(0x33c)][_0x1247c1(0x1da)][_0x1247c1(0x1fa)][_0x1247c1(0x20e)]||[];},Game_Battler[_0x573481(0x226)][_0x573481(0x1e4)]=function(){const _0x502183=_0x573481,_0x274378=this[_0x502183(0x1e7)]()?this['currentClass']()[_0x502183(0x20d)]:this['enemy']()[_0x502183(0x20d)];if(_0x274378[_0x502183(0x311)](VisuMZ[_0x502183(0x33c)]['RegExp'][_0x502183(0x1f3)]))return VisuMZ[_0x502183(0x33c)][_0x502183(0x312)](RegExp['$1']);return VisuMZ['BattleSystemSTB']['Settings'][_0x502183(0x217)]['AddedStates']||[];},VisuMZ['BattleSystemSTB'][_0x573481(0x312)]=function(_0x510333){const _0x22ecb6=_0x573481,_0x2e61ce=_0x510333[_0x22ecb6(0x34a)](','),_0x196781=[];for(let _0x15881f of _0x2e61ce){_0x15881f=(String(_0x15881f)||'')[_0x22ecb6(0x348)]();const _0x20bf17=/^\d+$/[_0x22ecb6(0x330)](_0x15881f);_0x20bf17?_0x196781['push'](Number(_0x15881f)):_0x196781[_0x22ecb6(0x2e9)](DataManager[_0x22ecb6(0x2de)](_0x15881f));}return _0x196781;},Game_Battler[_0x573481(0x226)][_0x573481(0x20c)]=function(_0x3c4e43,_0x2638fe){const _0x31ea6e=_0x573481;if(!BattleManager['isSTB']())return;if(!BattleManager[_0x31ea6e(0x2c7)]())return;if(this[_0x31ea6e(0x24f)]())return;const _0x274eca=VisuMZ[_0x31ea6e(0x33c)]['Settings']['Exploited'];!_0x274eca[_0x31ea6e(0x35f)]&&this[_0x31ea6e(0x285)](!![]);if(this[_0x31ea6e(0x2da)]())return;if(this['hp']<=0x0)return;this[_0x31ea6e(0x238)](_0x274eca);if(this['hp']>0x0||!this['isImmortal']())for(const _0x1b41a7 of this[_0x31ea6e(0x368)]()){if(!$dataStates[_0x1b41a7])continue;this[_0x31ea6e(0x1f1)](_0x1b41a7);}_0x274eca[_0x31ea6e(0x2e4)]&&_0x274eca[_0x31ea6e(0x2e4)][_0x31ea6e(0x1dd)](this,_0x3c4e43,_0x2638fe);if(this[_0x31ea6e(0x1e7)]()&&BattleManager[_0x31ea6e(0x2d1)]()){const _0x4d757d=_0x274eca[_0x31ea6e(0x31c)];_0x4d757d>0x0&&$dataCommonEvents[_0x4d757d]&&$gameTemp[_0x31ea6e(0x337)](_0x4d757d);}else{if(this['isEnemy']()&&BattleManager[_0x31ea6e(0x1ff)]()){const _0x1de47a=_0x274eca[_0x31ea6e(0x332)];_0x1de47a>0x0&&$dataCommonEvents[_0x1de47a]&&$gameTemp['reserveCommonEvent'](_0x1de47a);}}},Game_Battler['prototype']['performSTBExploiter']=function(_0x205579,_0x3632c1){const _0x29ed2c=_0x573481;if(!BattleManager[_0x29ed2c(0x34f)]())return;if(!BattleManager[_0x29ed2c(0x2c7)]())return;if(_0x3632c1[_0x29ed2c(0x221)]())return;if(_0x205579[_0x29ed2c(0x24f)]())return;const _0x4d9971=VisuMZ[_0x29ed2c(0x33c)][_0x29ed2c(0x1da)][_0x29ed2c(0x217)];!_0x4d9971[_0x29ed2c(0x25f)]&&_0x3632c1[_0x29ed2c(0x236)](!![]);if(this[_0x29ed2c(0x304)]())return;this[_0x29ed2c(0x238)](_0x4d9971);_0x4d9971[_0x29ed2c(0x2f7)]>0x0&&this['stbGainInstant'](_0x4d9971[_0x29ed2c(0x2f7)]);for(const _0x2fc74c of this['stbExploiterStates']()){if(!$dataStates[_0x2fc74c])continue;this['addState'](_0x2fc74c);}_0x4d9971[_0x29ed2c(0x2e4)]&&_0x4d9971[_0x29ed2c(0x2e4)][_0x29ed2c(0x1dd)](this,_0x205579,_0x3632c1);},Game_Battler[_0x573481(0x226)]['displayExploitedEffects']=function(_0x51aa0e){const _0xe2f4d9=_0x573481;if(!_0x51aa0e)return;if(_0x51aa0e['AnimationID']){const _0x1e1d20=_0x51aa0e[_0xe2f4d9(0x1d8)],_0x1d1abf=_0x51aa0e[_0xe2f4d9(0x355)],_0x200d1f=_0x51aa0e[_0xe2f4d9(0x33f)];$gameTemp[_0xe2f4d9(0x2d2)]([this],_0x1e1d20,_0x1d1abf,_0x200d1f);}if(this[_0xe2f4d9(0x259)]()&&_0x51aa0e[_0xe2f4d9(0x23a)]['length']>0x0){const _0x3be545=_0x51aa0e[_0xe2f4d9(0x23a)],_0x5db8e6={'textColor':ColorManager[_0xe2f4d9(0x249)](_0x51aa0e['TextColor']),'flashColor':_0x51aa0e[_0xe2f4d9(0x286)],'flashDuration':_0x51aa0e[_0xe2f4d9(0x2af)]};this[_0xe2f4d9(0x30a)](_0x3be545,_0x5db8e6);}},Game_Battler[_0x573481(0x226)]['stbGainInstant']=function(_0x105455){const _0x150994=_0x573481;this[_0x150994(0x258)]=this[_0x150994(0x258)]||[];if(this[_0x150994(0x315)]()){for(let _0x2724ed=0x0;_0x2724ed<_0x105455;_0x2724ed++){this[_0x150994(0x258)][_0x150994(0x2e9)](new Game_Action(this));}if(this['isEnemy']()){const _0xdb8d91=this[_0x150994(0x258)][_0x150994(0x350)](),_0x59d472=this['enemy']()[_0x150994(0x28d)]['filter'](_0x4085a2=>this[_0x150994(0x31a)](_0x4085a2));_0x59d472['length']>0x0&&this['selectAllActions'](_0x59d472),this[_0x150994(0x258)][_0x150994(0x375)](_0xdb8d91);}}},VisuMZ[_0x573481(0x33c)]['Game_Actor_selectNextCommand']=Game_Actor[_0x573481(0x226)][_0x573481(0x289)],Game_Actor[_0x573481(0x226)]['selectNextCommand']=function(){const _0x5758cd=_0x573481;if(BattleManager[_0x5758cd(0x34f)]()){if(this[_0x5758cd(0x259)]())this['battler']()[_0x5758cd(0x2d5)]();return![];}return VisuMZ[_0x5758cd(0x33c)]['Game_Actor_selectNextCommand'][_0x5758cd(0x1dd)](this);},Game_Actor[_0x573481(0x226)][_0x573481(0x227)]=function(){const _0x230f0c=_0x573481,_0x54a206=this[_0x230f0c(0x32e)]()[_0x230f0c(0x20d)];if(_0x54a206[_0x230f0c(0x311)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x230f0c(0x223);else{if(_0x54a206[_0x230f0c(0x311)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return _0x230f0c(0x347);}return Window_STB_TurnOrder[_0x230f0c(0x1da)]['ActorBattlerType'];},Game_Actor['prototype'][_0x573481(0x279)]=function(){const _0x4e55c0=_0x573481,_0x3b15e0=this[_0x4e55c0(0x32e)]()[_0x4e55c0(0x20d)];if(_0x3b15e0[_0x4e55c0(0x311)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this['faceName']();},Game_Actor[_0x573481(0x226)][_0x573481(0x264)]=function(){const _0x301d67=_0x573481,_0x269b0e=this['actor']()[_0x301d67(0x20d)];if(_0x269b0e[_0x301d67(0x311)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x301d67(0x1f4)]();},Game_Actor[_0x573481(0x226)][_0x573481(0x376)]=function(){const _0x1fa8b2=_0x573481,_0x412b1f=this[_0x1fa8b2(0x32e)]()[_0x1fa8b2(0x20d)];if(_0x412b1f[_0x1fa8b2(0x311)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_STB_TurnOrder['Settings'][_0x1fa8b2(0x329)];},Game_Enemy['prototype']['createTurnOrderSTBGraphicType']=function(){const _0x5cadec=_0x573481,_0x414695=this[_0x5cadec(0x22d)]()['note'];if(_0x414695[_0x5cadec(0x311)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x5cadec(0x223);else{if(_0x414695[_0x5cadec(0x311)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return _0x5cadec(0x347);}return Window_STB_TurnOrder[_0x5cadec(0x1da)]['EnemyBattlerType'];},Game_Enemy[_0x573481(0x226)][_0x573481(0x2ad)]=function(){const _0x15573f=_0x573481,_0x3793e9=this['enemy']()['note'];if(_0x3793e9[_0x15573f(0x311)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_STB_TurnOrder['Settings'][_0x15573f(0x22a)];},Game_Enemy[_0x573481(0x226)][_0x573481(0x345)]=function(){const _0xd39acc=_0x573481,_0x54e49b=this[_0xd39acc(0x22d)]()['note'];if(_0x54e49b[_0xd39acc(0x311)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_STB_TurnOrder[_0xd39acc(0x1da)][_0xd39acc(0x25d)];},Game_Enemy[_0x573481(0x226)]['createTurnOrderSTBGraphicIconIndex']=function(){const _0x139021=_0x573481,_0x2954c3=this[_0x139021(0x22d)]()[_0x139021(0x20d)];if(_0x2954c3['match'](/<STB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_STB_TurnOrder[_0x139021(0x1da)]['EnemyBattlerIcon'];},VisuMZ[_0x573481(0x33c)]['Scene_Battle_createActorCommandWindow']=Scene_Battle[_0x573481(0x226)][_0x573481(0x2cf)],Scene_Battle['prototype'][_0x573481(0x2cf)]=function(){const _0x47cd0c=_0x573481;VisuMZ[_0x47cd0c(0x33c)]['Scene_Battle_createActorCommandWindow']['call'](this),BattleManager['isSTB']()&&this[_0x47cd0c(0x35d)]();},Scene_Battle[_0x573481(0x226)][_0x573481(0x35d)]=function(){const _0x8133f0=_0x573481,_0x918cdc=this[_0x8133f0(0x2b2)];this[_0x8133f0(0x234)]()&&delete _0x918cdc[_0x8133f0(0x2ee)]['cancel'];},VisuMZ[_0x573481(0x33c)][_0x573481(0x276)]=Scene_Battle[_0x573481(0x226)][_0x573481(0x2ac)],Scene_Battle[_0x573481(0x226)][_0x573481(0x2ac)]=function(){const _0x1ca309=_0x573481;BattleManager['isSTB']()?this[_0x1ca309(0x231)]():VisuMZ[_0x1ca309(0x33c)]['Scene_Battle_commandCancel']['call'](this);},Scene_Battle[_0x573481(0x226)][_0x573481(0x231)]=function(){const _0x43761f=_0x573481;this[_0x43761f(0x284)][_0x43761f(0x291)](),this[_0x43761f(0x2b2)][_0x43761f(0x24e)]();},VisuMZ[_0x573481(0x33c)][_0x573481(0x26e)]=Scene_Battle['prototype'][_0x573481(0x2e2)],Scene_Battle[_0x573481(0x226)][_0x573481(0x2e2)]=function(){const _0x30dff6=_0x573481;BattleManager[_0x30dff6(0x34f)]()?this['startActorCommandSelection']():VisuMZ['BattleSystemSTB'][_0x30dff6(0x26e)][_0x30dff6(0x1dd)](this);},VisuMZ[_0x573481(0x33c)][_0x573481(0x2a8)]=Scene_Battle[_0x573481(0x226)]['createAllWindows'],Scene_Battle[_0x573481(0x226)][_0x573481(0x26a)]=function(){const _0x519045=_0x573481;VisuMZ[_0x519045(0x33c)][_0x519045(0x2a8)]['call'](this),this['createSTBTurnOrderWindow']();},Scene_Battle['prototype'][_0x573481(0x287)]=function(){const _0x509969=_0x573481;if(!BattleManager[_0x509969(0x34f)]())return;this[_0x509969(0x1e8)]=new Window_STB_TurnOrder();const _0x1be38c=this[_0x509969(0x338)](this['_windowLayer']);this[_0x509969(0x21b)](this[_0x509969(0x1e8)],_0x1be38c),this['repositionLogWindowSTB'](),BattleManager[_0x509969(0x302)](!![]);},Scene_Battle['prototype']['repositionLogWindowSTB']=function(){const _0x11ca50=_0x573481,_0xdc2079=Window_STB_TurnOrder[_0x11ca50(0x1da)];if(_0xdc2079[_0x11ca50(0x1f0)]!==_0x11ca50(0x33b))return;if(!_0xdc2079['RepositionLogWindow'])return;if(!this[_0x11ca50(0x29f)])return;const _0x533915=this['_stbTurnOrderWindow']['y']-Math[_0x11ca50(0x310)]((Graphics[_0x11ca50(0x349)]-Graphics[_0x11ca50(0x2f0)])/0x2),_0x5585bd=_0x533915+this[_0x11ca50(0x1e8)][_0x11ca50(0x349)];this[_0x11ca50(0x29f)]['y']=_0x5585bd+_0xdc2079[_0x11ca50(0x22f)];};function Sprite_STB_TurnOrder_Battler(){const _0x37be50=_0x573481;this[_0x37be50(0x24c)](...arguments);}Sprite_STB_TurnOrder_Battler['prototype']=Object[_0x573481(0x272)](Sprite_Clickable['prototype']),Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x339)]=Sprite_STB_TurnOrder_Battler,Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x24c)]=function(_0x1768fb,_0x7c72a4){const _0x2ac20b=_0x573481;this['initMembers'](_0x1768fb,_0x7c72a4),Sprite_Clickable[_0x2ac20b(0x226)]['initialize'][_0x2ac20b(0x1dd)](this),this[_0x2ac20b(0x25c)]=0x0,this['createChildren'](),this['checkOpacity']();},Sprite_STB_TurnOrder_Battler['prototype'][_0x573481(0x26f)]=function(_0x540fb7,_0x29d57a){const _0x3c3103=_0x573481;this[_0x3c3103(0x23c)]=_0x540fb7,this[_0x3c3103(0x2f4)]=_0x29d57a;const _0x14db15=Window_STB_TurnOrder['Settings'],_0x5760b1=this['isHorz'](),_0x5b9023=this[_0x3c3103(0x210)]();this['_positionDuration']=0x0,this[_0x3c3103(0x2f5)]=_0x5760b1?_0x14db15['SpriteThin']*_0x5b9023:0x0,this['_positionTargetY']=_0x5760b1?0x0:_0x14db15['SpriteThin']*_0x5b9023,this['_fadeDuration']=0x0,this['_fadeTarget']=0xff,this[_0x3c3103(0x21c)]=![],this[_0x3c3103(0x202)]=![],this[_0x3c3103(0x2cd)]=0x0,this['_containerHeight']=0x0;},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x2b6)]=function(){const _0x27b418=_0x573481;this[_0x27b418(0x24b)](),this[_0x27b418(0x346)](),this[_0x27b418(0x1f7)](),this[_0x27b418(0x267)](),this[_0x27b418(0x29a)]();},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)]['createInitialPositions']=function(){this['x']=this['_positionTargetX'],this['y']=this['_positionTargetY'];},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x2bc)]=function(){const _0x1c0052=_0x573481,_0x539756=Window_STB_TurnOrder['Settings'],_0x3259d2=['top',_0x1c0052(0x2ba)]['includes'](_0x539756[_0x1c0052(0x1f0)]);return _0x3259d2;},Sprite_STB_TurnOrder_Battler['prototype'][_0x573481(0x299)]=function(){const _0x2e160e=_0x573481,_0x2a8f59=Window_STB_TurnOrder[_0x2e160e(0x1da)];return this[_0x2e160e(0x2bc)]()?_0x2a8f59[_0x2e160e(0x1ed)]:_0x2a8f59[_0x2e160e(0x2d6)];},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x27d)]=function(){const _0x440ffb=_0x573481,_0x3fe6d2=Window_STB_TurnOrder[_0x440ffb(0x1da)];return this[_0x440ffb(0x2bc)]()?_0x3fe6d2['SpriteLength']:_0x3fe6d2[_0x440ffb(0x1ed)];},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)]['createTestBitmap']=function(){const _0x57b7ec=_0x573481;this[_0x57b7ec(0x2ec)]=new Bitmap(0x48,0x24);const _0x258869=this[_0x57b7ec(0x259)]()?this[_0x57b7ec(0x259)]()[_0x57b7ec(0x317)]():_0x57b7ec(0x341)[_0x57b7ec(0x209)](this['_unit'],this[_0x57b7ec(0x2f4)]);this[_0x57b7ec(0x2ec)][_0x57b7ec(0x29d)](_0x258869,0x0,0x0,0x48,0x24,_0x57b7ec(0x295));},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)]['createBackgroundSprite']=function(){const _0x18f29e=_0x573481;if(!Window_STB_TurnOrder[_0x18f29e(0x1da)][_0x18f29e(0x263)])return;const _0x243150=Window_STB_TurnOrder[_0x18f29e(0x1da)],_0x528478=this[_0x18f29e(0x23c)]===$gameParty?'Actor':_0x18f29e(0x360),_0x465766=_0x18f29e(0x1f9)[_0x18f29e(0x209)](_0x528478),_0x1e9357=new Sprite();_0x1e9357[_0x18f29e(0x336)]['x']=this['anchor']['x'],_0x1e9357[_0x18f29e(0x336)]['y']=this[_0x18f29e(0x336)]['y'];if(_0x243150[_0x465766])_0x1e9357[_0x18f29e(0x2ec)]=ImageManager[_0x18f29e(0x343)](_0x243150[_0x465766]);else{const _0x5d6ed8=this[_0x18f29e(0x299)](),_0x7d6c35=this['bitmapHeight']();_0x1e9357[_0x18f29e(0x2ec)]=new Bitmap(_0x5d6ed8,_0x7d6c35);const _0x33b547=ColorManager[_0x18f29e(0x249)](_0x243150['%1BgColor1'[_0x18f29e(0x209)](_0x528478)]),_0x20ae71=ColorManager[_0x18f29e(0x249)](_0x243150['%1BgColor2'[_0x18f29e(0x209)](_0x528478)]);_0x1e9357['bitmap']['gradientFillRect'](0x0,0x0,_0x5d6ed8,_0x7d6c35,_0x33b547,_0x20ae71,!![]);}this[_0x18f29e(0x220)]=_0x1e9357,this[_0x18f29e(0x1fe)](this[_0x18f29e(0x220)]),this[_0x18f29e(0x306)]=this[_0x18f29e(0x220)][_0x18f29e(0x306)],this[_0x18f29e(0x349)]=this['_backgroundSprite'][_0x18f29e(0x349)];},Sprite_STB_TurnOrder_Battler['prototype'][_0x573481(0x1f7)]=function(){const _0xfe467b=_0x573481,_0x2bca09=new Sprite();_0x2bca09['anchor']['x']=this[_0xfe467b(0x336)]['x'],_0x2bca09['anchor']['y']=this[_0xfe467b(0x336)]['y'],this[_0xfe467b(0x2ef)]=_0x2bca09,this['addChild'](this[_0xfe467b(0x2ef)]),this['processUpdateGraphic']();},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x267)]=function(){const _0x3af819=_0x573481;if(!Window_STB_TurnOrder['Settings']['ShowMarkerBorder'])return;const _0x53ec4a=Window_STB_TurnOrder[_0x3af819(0x1da)],_0x3ee8c4=this['_unit']===$gameParty?_0x3af819(0x266):'Enemy',_0x450fb1=_0x3af819(0x34e)[_0x3af819(0x209)](_0x3ee8c4),_0x37c703=new Sprite();_0x37c703['anchor']['x']=this[_0x3af819(0x336)]['x'],_0x37c703['anchor']['y']=this['anchor']['y'];if(_0x53ec4a[_0x450fb1])_0x37c703['bitmap']=ImageManager['loadSystem'](_0x53ec4a[_0x450fb1]);else{let _0x423b97=this[_0x3af819(0x299)](),_0x354b02=this['bitmapHeight'](),_0x4b46df=_0x53ec4a[_0x3af819(0x2f6)];_0x37c703[_0x3af819(0x2ec)]=new Bitmap(_0x423b97,_0x354b02);const _0x222f37=_0x3af819(0x33e),_0x30ce5b=ColorManager['getColor'](_0x53ec4a[_0x3af819(0x2ca)[_0x3af819(0x209)](_0x3ee8c4)]);_0x37c703[_0x3af819(0x2ec)]['fillRect'](0x0,0x0,_0x423b97,_0x354b02,_0x222f37),_0x423b97-=0x2,_0x354b02-=0x2,_0x37c703[_0x3af819(0x2ec)][_0x3af819(0x373)](0x1,0x1,_0x423b97,_0x354b02,_0x30ce5b),_0x423b97-=_0x4b46df*0x2,_0x354b02-=_0x4b46df*0x2,_0x37c703[_0x3af819(0x2ec)][_0x3af819(0x373)](0x1+_0x4b46df,0x1+_0x4b46df,_0x423b97,_0x354b02,_0x222f37),_0x423b97-=0x2,_0x354b02-=0x2,_0x4b46df+=0x1,_0x37c703['bitmap'][_0x3af819(0x257)](0x1+_0x4b46df,0x1+_0x4b46df,_0x423b97,_0x354b02);}this[_0x3af819(0x220)]=_0x37c703,this[_0x3af819(0x1fe)](this[_0x3af819(0x220)]);},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x29a)]=function(){const _0xb874d5=_0x573481,_0x47a7d0=Window_STB_TurnOrder[_0xb874d5(0x1da)];if(!_0x47a7d0[_0xb874d5(0x25a)])return;if(this['_unit']===$gameParty)return;const _0x16be2c=this[_0xb874d5(0x299)](),_0x3e9a3e=this[_0xb874d5(0x27d)](),_0x576319=new Sprite();_0x576319[_0xb874d5(0x336)]['x']=this['anchor']['x'],_0x576319['anchor']['y']=this[_0xb874d5(0x336)]['y'],_0x576319[_0xb874d5(0x2ec)]=new Bitmap(_0x16be2c,_0x3e9a3e),this['_letterSprite']=_0x576319,this[_0xb874d5(0x1fe)](this[_0xb874d5(0x207)]);},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x259)]=function(){const _0x60f728=_0x573481;return this[_0x60f728(0x23c)]?this[_0x60f728(0x23c)]['members']()[this['_index']]:null;},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x23d)]=function(){const _0x3dab38=_0x573481;Sprite_Clickable[_0x3dab38(0x226)][_0x3dab38(0x23d)][_0x3dab38(0x1dd)](this),this[_0x3dab38(0x27e)](),this[_0x3dab38(0x303)](),this['checkOpacity'](),this['updateOpacity'](),this[_0x3dab38(0x353)](),this[_0x3dab38(0x1ef)](),this['updateLetter'](),this[_0x3dab38(0x1e2)]();},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x27e)]=function(){const _0x2d4fa3=_0x573481,_0x4f7b70=this[_0x2d4fa3(0x208)]();if(this[_0x2d4fa3(0x278)]===_0x4f7b70)return;this['_position']=_0x4f7b70;if(_0x4f7b70===this[_0x2d4fa3(0x210)]()&&this['_fadeDuration']<=0x0&&this[_0x2d4fa3(0x25c)]>0x0)this['startFade'](0x0);else this[_0x2d4fa3(0x261)]<=0x0&&this[_0x2d4fa3(0x25c)]<0xff&&this[_0x2d4fa3(0x2a3)]();this[_0x2d4fa3(0x246)]();},Sprite_STB_TurnOrder_Battler['prototype'][_0x573481(0x243)]=function(){const _0x16e617=_0x573481,_0x195c7f=this['containerWindow']();if(!_0x195c7f)return;let _0x2cad47=![];if(this[_0x16e617(0x2cd)]!==_0x195c7f['width'])_0x2cad47=!![];else this['_containerHeight']!==_0x195c7f[_0x16e617(0x349)]&&(_0x2cad47=!![]);_0x2cad47&&this[_0x16e617(0x246)]();},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x246)]=function(){const _0x19d8a6=_0x573481,_0x105ae4=Window_STB_TurnOrder[_0x19d8a6(0x1da)],_0x7dc130=this['isHorz'](),_0x4977a8=_0x105ae4[_0x19d8a6(0x232)],_0x3a15c7=_0x105ae4['SubjectDistance'],_0x426a8e=SceneManager[_0x19d8a6(0x294)][_0x19d8a6(0x1e8)];if(!_0x426a8e)return;const _0x148e62=this[_0x19d8a6(0x208)]();this[_0x19d8a6(0x225)]=_0x105ae4[_0x19d8a6(0x28f)],this[_0x19d8a6(0x2f5)]=_0x7dc130?_0x105ae4['SpriteThin']*_0x148e62:0x0,this[_0x19d8a6(0x25b)]=_0x7dc130?0x0:_0x105ae4[_0x19d8a6(0x1ed)]*_0x148e62,_0x148e62>0x0&&(this[_0x19d8a6(0x2f5)]+=_0x7dc130?_0x3a15c7:0x0,this['_positionTargetY']+=_0x7dc130?0x0:_0x3a15c7),_0x4977a8?this[_0x19d8a6(0x2f5)]=_0x7dc130?_0x426a8e[_0x19d8a6(0x306)]-this[_0x19d8a6(0x2f5)]-_0x105ae4[_0x19d8a6(0x1ed)]:0x0:this['_positionTargetY']=_0x7dc130?0x0:_0x426a8e[_0x19d8a6(0x349)]-this[_0x19d8a6(0x25b)]-_0x105ae4[_0x19d8a6(0x1ed)];},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x303)]=function(){const _0xaa6a4e=_0x573481;if(this[_0xaa6a4e(0x261)]>0x0)return;if(this[_0xaa6a4e(0x225)]>0x0){const _0x8d8312=this[_0xaa6a4e(0x225)];this['x']=(this['x']*(_0x8d8312-0x1)+this[_0xaa6a4e(0x2f5)])/_0x8d8312,this['y']=(this['y']*(_0x8d8312-0x1)+this['_positionTargetY'])/_0x8d8312,this[_0xaa6a4e(0x225)]--;}if(this[_0xaa6a4e(0x225)]<=0x0){this['x']=this[_0xaa6a4e(0x2f5)],this['y']=this[_0xaa6a4e(0x25b)];if(this[_0xaa6a4e(0x25c)]<0xff&&!this[_0xaa6a4e(0x352)]&&this['_fadeDuration']<=0x0){const _0x34c0ca=this['battler']();_0x34c0ca&&(this['_fadeTarget']=_0x34c0ca['isAlive']()&&_0x34c0ca['isAppeared']()?0xff:0x0);}}},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x210)]=function(){const _0x1942e8=_0x573481,_0x24021d=Window_STB_TurnOrder[_0x1942e8(0x1da)],_0x124787=this[_0x1942e8(0x2bc)]()?_0x24021d['MaxHorzSprites']:_0x24021d[_0x1942e8(0x273)];return _0x124787+0x1;},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x34c)]=function(){return SceneManager['_scene']['_stbTurnOrderWindow'];},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x208)]=function(){const _0x21d6d8=_0x573481,_0x4890c5=this[_0x21d6d8(0x259)]();if(!_0x4890c5)return this[_0x21d6d8(0x210)]();if(_0x4890c5===BattleManager[_0x21d6d8(0x23b)])return 0x0;if(BattleManager[_0x21d6d8(0x1fd)][_0x21d6d8(0x359)](_0x4890c5)){const _0x1603c6=BattleManager['_actionBattlers']['indexOf'](_0x4890c5)+0x1;return _0x1603c6;}return this[_0x21d6d8(0x210)]();},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x2dd)]=function(_0x3caed1){const _0x34fb8b=_0x573481,_0x2ff790=Window_STB_TurnOrder[_0x34fb8b(0x1da)];this[_0x34fb8b(0x261)]=_0x2ff790[_0x34fb8b(0x28f)],this[_0x34fb8b(0x331)]=_0x3caed1;},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)]['checkOpacity']=function(){const _0x316754=_0x573481,_0x17ca94=this['battler']();if(!_0x17ca94)return;if(this['_isAlive']===_0x17ca94['isAlive']()&&this[_0x316754(0x202)]===_0x17ca94[_0x316754(0x2ab)]())return;this[_0x316754(0x21c)]=_0x17ca94['isAlive'](),this['_isAppeared']=_0x17ca94[_0x316754(0x2ab)]();let _0x2010ad=this['_isAlive']&&this[_0x316754(0x202)]?0xff:0x0;this[_0x316754(0x2dd)](_0x2010ad);},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)]['updateOpacity']=function(){const _0xbd3e10=_0x573481;if(this[_0xbd3e10(0x261)]>0x0){const _0x43932a=this[_0xbd3e10(0x261)];this[_0xbd3e10(0x25c)]=(this['opacity']*(_0x43932a-0x1)+this[_0xbd3e10(0x331)])/_0x43932a,this[_0xbd3e10(0x261)]--,this[_0xbd3e10(0x261)]<=0x0&&(this[_0xbd3e10(0x27e)](),this[_0xbd3e10(0x225)]=0x0,this['updatePosition'](),this['opacity']=this[_0xbd3e10(0x331)]);}if(this['_isBattleOver'])return;BattleManager[_0xbd3e10(0x1e0)]===_0xbd3e10(0x35a)&&(this[_0xbd3e10(0x352)]=!![],this['startFade'](0x0));},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x353)]=function(){const _0x5d6461=_0x573481,_0xa372a8=this['battler']();if(!_0xa372a8)return;const _0x20369e=Window_STB_TurnOrder[_0x5d6461(0x1da)],_0x3b22ff=this[_0x5d6461(0x23c)]===$gameParty?'Actor':_0x5d6461(0x360);let _0x2e0fb2=_0xa372a8[_0x5d6461(0x2e6)]();if(_0xa372a8[_0x5d6461(0x1e7)]()&&_0x2e0fb2===_0x5d6461(0x22d))_0x2e0fb2=_0x5d6461(0x223);else _0xa372a8[_0x5d6461(0x1db)]()&&_0x2e0fb2===_0x5d6461(0x260)&&(_0x2e0fb2='enemy');if(this[_0x5d6461(0x2e5)]!==_0x2e0fb2)return this[_0x5d6461(0x2cb)]();switch(this[_0x5d6461(0x2e5)]){case'face':if(this[_0x5d6461(0x354)]!==_0xa372a8['TurnOrderSTBGraphicFaceName']())return this[_0x5d6461(0x2cb)]();if(this[_0x5d6461(0x34d)]!==_0xa372a8[_0x5d6461(0x264)]())return this[_0x5d6461(0x2cb)]();break;case _0x5d6461(0x347):if(this['_graphicIconIndex']!==_0xa372a8[_0x5d6461(0x219)]())return this[_0x5d6461(0x2cb)]();break;case _0x5d6461(0x22d):if(_0xa372a8['hasSvBattler']()){if(this[_0x5d6461(0x319)]!==_0xa372a8[_0x5d6461(0x31e)]())return this[_0x5d6461(0x2cb)]();}else{if(this[_0x5d6461(0x277)]!==_0xa372a8[_0x5d6461(0x282)]())return this[_0x5d6461(0x2cb)]();}break;case _0x5d6461(0x260):if(_0xa372a8['isActor']()){if(this[_0x5d6461(0x319)]!==_0xa372a8['battlerName']())return this[_0x5d6461(0x2cb)]();}else{if(this[_0x5d6461(0x277)]!==_0xa372a8[_0x5d6461(0x282)]())return this[_0x5d6461(0x2cb)]();}break;}},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x2cb)]=function(){const _0x329174=_0x573481,_0x5d897c=this[_0x329174(0x259)]();if(!_0x5d897c)return;this[_0x329174(0x2e5)]=_0x5d897c[_0x329174(0x2e6)]();if(_0x5d897c[_0x329174(0x1e7)]()&&this[_0x329174(0x2e5)]==='enemy')this[_0x329174(0x2e5)]=_0x329174(0x223);else _0x5d897c[_0x329174(0x1db)]()&&this[_0x329174(0x2e5)]==='svactor'&&(this[_0x329174(0x2e5)]='enemy');let _0x45417a;switch(this['_graphicType']){case _0x329174(0x223):this['_graphicFaceName']=_0x5d897c[_0x329174(0x279)](),this[_0x329174(0x34d)]=_0x5d897c[_0x329174(0x264)](),_0x45417a=ImageManager[_0x329174(0x357)](this['_graphicFaceName']),_0x45417a['addLoadListener'](this[_0x329174(0x362)][_0x329174(0x24d)](this,_0x45417a));break;case _0x329174(0x347):this[_0x329174(0x230)]=_0x5d897c['createTurnOrderSTBGraphicIconIndex'](),_0x45417a=ImageManager[_0x329174(0x343)]('IconSet'),_0x45417a[_0x329174(0x305)](this[_0x329174(0x2f1)][_0x329174(0x24d)](this,_0x45417a));break;case _0x329174(0x22d):if(_0x5d897c['hasSvBattler']())this['_graphicSv']=_0x5d897c[_0x329174(0x31e)](),_0x45417a=ImageManager[_0x329174(0x21f)](this[_0x329174(0x319)]),_0x45417a[_0x329174(0x305)](this['changeSvActorGraphicBitmap'][_0x329174(0x24d)](this,_0x45417a));else $gameSystem[_0x329174(0x30d)]()?(this['_graphicEnemy']=_0x5d897c[_0x329174(0x282)](),_0x45417a=ImageManager[_0x329174(0x2f3)](this['_graphicEnemy']),_0x45417a[_0x329174(0x305)](this[_0x329174(0x27c)][_0x329174(0x24d)](this,_0x45417a))):(this[_0x329174(0x277)]=_0x5d897c[_0x329174(0x282)](),_0x45417a=ImageManager[_0x329174(0x374)](this[_0x329174(0x277)]),_0x45417a['addLoadListener'](this[_0x329174(0x27c)][_0x329174(0x24d)](this,_0x45417a)));break;case _0x329174(0x260):this['_graphicSv']=_0x5d897c[_0x329174(0x282)](),_0x45417a=ImageManager['loadSvActor'](this['_graphicSv']),_0x45417a[_0x329174(0x305)](this['changeSvActorGraphicBitmap'][_0x329174(0x24d)](this,_0x45417a));break;}},Sprite_STB_TurnOrder_Battler['prototype']['changeFaceGraphicBitmap']=function(_0x4eeb28){const _0x2fb47b=_0x573481,_0x3bff99=this[_0x2fb47b(0x34d)],_0x224d93=this[_0x2fb47b(0x299)](),_0xd99feb=this[_0x2fb47b(0x27d)](),_0x26ef88=Math[_0x2fb47b(0x2dc)](_0x224d93,_0xd99feb);this[_0x2fb47b(0x2ef)]['bitmap']=new Bitmap(_0x224d93,_0xd99feb);const _0xe50108=this[_0x2fb47b(0x2ef)]['bitmap'],_0xc22961=ImageManager[_0x2fb47b(0x235)],_0x285b1c=ImageManager[_0x2fb47b(0x333)],_0x1af84f=_0x26ef88/Math[_0x2fb47b(0x2dc)](_0xc22961,_0x285b1c),_0x2c3283=ImageManager[_0x2fb47b(0x235)],_0x595c7e=ImageManager[_0x2fb47b(0x333)],_0x49c5ac=_0x3bff99%0x4*_0xc22961+(_0xc22961-_0x2c3283)/0x2,_0x401309=Math[_0x2fb47b(0x292)](_0x3bff99/0x4)*_0x285b1c+(_0x285b1c-_0x595c7e)/0x2,_0x369bab=(_0x224d93-_0xc22961*_0x1af84f)/0x2,_0x526438=(_0xd99feb-_0x285b1c*_0x1af84f)/0x2;_0xe50108[_0x2fb47b(0x2a1)](_0x4eeb28,_0x49c5ac,_0x401309,_0x2c3283,_0x595c7e,_0x369bab,_0x526438,_0x26ef88,_0x26ef88);},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)]['changeIconGraphicBitmap']=function(_0x5e5038){const _0x4cb9eb=_0x573481,_0x586b37=this['_graphicIconIndex'],_0x66b802=this[_0x4cb9eb(0x299)](),_0x124218=this[_0x4cb9eb(0x27d)]();this['_graphicSprite']['bitmap']=new Bitmap(_0x66b802,_0x124218);const _0x1d7ce0=this['_graphicSprite']['bitmap'],_0x134bec=ImageManager[_0x4cb9eb(0x23f)],_0x388a8f=ImageManager[_0x4cb9eb(0x244)],_0x3be56a=Math[_0x4cb9eb(0x281)](_0x134bec,_0x388a8f,_0x66b802,_0x124218),_0x2c5b79=_0x586b37%0x10*_0x134bec,_0x439f4a=Math[_0x4cb9eb(0x292)](_0x586b37/0x10)*_0x388a8f,_0x364812=Math['floor'](Math['max'](_0x66b802-_0x3be56a,0x0)/0x2),_0x36a9e4=Math[_0x4cb9eb(0x292)](Math['max'](_0x124218-_0x3be56a,0x0)/0x2);_0x1d7ce0['blt'](_0x5e5038,_0x2c5b79,_0x439f4a,_0x134bec,_0x388a8f,_0x364812,_0x36a9e4,_0x3be56a,_0x3be56a);},Sprite_STB_TurnOrder_Battler['prototype'][_0x573481(0x328)]=function(_0x4dcf08){const _0x50463b=_0x573481,_0x1072f5=this['bitmapWidth'](),_0x4bd1e1=this[_0x50463b(0x27d)](),_0x4d9833=Math['min'](_0x1072f5,_0x4bd1e1);this[_0x50463b(0x2ef)][_0x50463b(0x2ec)]=new Bitmap(_0x1072f5,_0x4bd1e1);const _0x2e4b08=this[_0x50463b(0x2ef)][_0x50463b(0x2ec)],_0x43e584=0x9,_0x183993=0x6,_0x2bbfd1=_0x4dcf08[_0x50463b(0x306)]/_0x43e584,_0x29f2e5=_0x4dcf08[_0x50463b(0x349)]/_0x183993,_0x4a4cc3=Math['min'](0x1,_0x4d9833/_0x2bbfd1,_0x4d9833/_0x29f2e5),_0x473d91=_0x2bbfd1*_0x4a4cc3,_0x1f2f21=_0x29f2e5*_0x4a4cc3,_0x15e8aa=Math[_0x50463b(0x310)]((_0x1072f5-_0x473d91)/0x2),_0x3792d2=Math[_0x50463b(0x310)]((_0x4bd1e1-_0x1f2f21)/0x2);_0x2e4b08[_0x50463b(0x2a1)](_0x4dcf08,0x0,0x0,_0x2bbfd1,_0x29f2e5,_0x15e8aa,_0x3792d2,_0x473d91,_0x1f2f21);},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x27c)]=function(_0x373365){const _0x12e47d=_0x573481,_0x5d2e9c=Window_STB_TurnOrder[_0x12e47d(0x1da)],_0x312ec1=this['bitmapWidth'](),_0x147b99=this[_0x12e47d(0x27d)](),_0x518b33=Math[_0x12e47d(0x281)](_0x312ec1,_0x147b99);this[_0x12e47d(0x2ef)][_0x12e47d(0x2ec)]=new Bitmap(_0x312ec1,_0x147b99);const _0x391251=this[_0x12e47d(0x2ef)][_0x12e47d(0x2ec)],_0x291624=Math[_0x12e47d(0x281)](0x1,_0x518b33/_0x373365[_0x12e47d(0x306)],_0x518b33/_0x373365['height']),_0x3f2fa7=_0x373365[_0x12e47d(0x306)]*_0x291624,_0x2a3ae2=_0x373365[_0x12e47d(0x349)]*_0x291624,_0x1f76e2=Math['round']((_0x312ec1-_0x3f2fa7)/0x2),_0x5d6037=Math[_0x12e47d(0x310)]((_0x147b99-_0x2a3ae2)/0x2);_0x391251['blt'](_0x373365,0x0,0x0,_0x373365['width'],_0x373365[_0x12e47d(0x349)],_0x1f76e2,_0x5d6037,_0x3f2fa7,_0x2a3ae2);},Sprite_STB_TurnOrder_Battler['prototype']['updateGraphicHue']=function(){const _0x384a1d=_0x573481,_0xf42862=this[_0x384a1d(0x259)]();if(!_0xf42862)return;if(!_0xf42862[_0x384a1d(0x1db)]())return;if(this['_graphicHue']===_0xf42862['battlerHue']())return;this['_graphicHue']=_0xf42862['battlerHue']();if(_0xf42862[_0x384a1d(0x325)]())this['_graphicHue']=0x0;this[_0x384a1d(0x2ef)]['setHue'](this[_0x384a1d(0x2b5)]);},Sprite_STB_TurnOrder_Battler['prototype'][_0x573481(0x2b7)]=function(){const _0x3e4d24=_0x573481;if(!this['_letterSprite'])return;const _0x5b64a6=this[_0x3e4d24(0x259)]();if(!_0x5b64a6)return;if(this[_0x3e4d24(0x1e3)]===_0x5b64a6[_0x3e4d24(0x1e3)]&&this['_plural']===_0x5b64a6[_0x3e4d24(0x1e1)])return;this[_0x3e4d24(0x1e3)]=_0x5b64a6[_0x3e4d24(0x1e3)],this['_plural']=_0x5b64a6[_0x3e4d24(0x1e1)];const _0x49115f=Window_STB_TurnOrder[_0x3e4d24(0x1da)],_0x43c81a=this['isHorz'](),_0xec0252=this[_0x3e4d24(0x299)](),_0x527598=this[_0x3e4d24(0x27d)](),_0x333dec=this[_0x3e4d24(0x207)][_0x3e4d24(0x2ec)];_0x333dec['clear']();if(!this[_0x3e4d24(0x1e1)])return;_0x333dec[_0x3e4d24(0x262)]=_0x49115f[_0x3e4d24(0x212)]||$gameSystem[_0x3e4d24(0x2ff)](),_0x333dec['fontSize']=_0x49115f[_0x3e4d24(0x2b3)]||0x10,_0x43c81a?_0x333dec[_0x3e4d24(0x29d)](this[_0x3e4d24(0x1e3)][_0x3e4d24(0x348)](),0x0,_0x527598/0x2,_0xec0252,_0x527598/0x2,_0x3e4d24(0x295)):_0x333dec['drawText'](this[_0x3e4d24(0x1e3)][_0x3e4d24(0x348)](),0x0,0x2,_0xec0252-0x8,_0x527598-0x4,_0x3e4d24(0x301));},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x1e2)]=function(){const _0x582a85=_0x573481,_0x3d7f21=this[_0x582a85(0x259)]();if(!_0x3d7f21)return;const _0x331a05=_0x3d7f21['battler']();if(!_0x331a05)return;const _0x46ce5a=_0x331a05[_0x582a85(0x270)]();if(!_0x46ce5a)return;this[_0x582a85(0x2b4)](_0x46ce5a[_0x582a85(0x363)]);},Sprite_STB_TurnOrder_Battler[_0x573481(0x226)][_0x573481(0x256)]=function(){const _0x5682f8=_0x573481;return this[_0x5682f8(0x259)]();},VisuMZ[_0x573481(0x33c)]['Window_Help_setItem']=Window_Help[_0x573481(0x226)][_0x573481(0x293)],Window_Help[_0x573481(0x226)][_0x573481(0x293)]=function(_0x2eb7b2){const _0x58e567=_0x573481;BattleManager['isSTB']()&&_0x2eb7b2&&_0x2eb7b2[_0x58e567(0x20d)]&&_0x2eb7b2['note']['match'](/<(?:STB) HELP>\s*([\s\S]*)\s*<\/(?:STB) HELP>/i)?this[_0x58e567(0x2ed)](String(RegExp['$1'])):VisuMZ[_0x58e567(0x33c)]['Window_Help_setItem']['call'](this,_0x2eb7b2);};function Window_STB_TurnOrder(){this['initialize'](...arguments);}Window_STB_TurnOrder[_0x573481(0x226)]=Object[_0x573481(0x272)](Window_Base['prototype']),Window_STB_TurnOrder[_0x573481(0x226)][_0x573481(0x339)]=Window_STB_TurnOrder,Window_STB_TurnOrder['Settings']=VisuMZ['BattleSystemSTB'][_0x573481(0x1da)][_0x573481(0x361)],Window_STB_TurnOrder['prototype'][_0x573481(0x24c)]=function(){const _0x2a2fa8=_0x573481,_0x4a54f7=this[_0x2a2fa8(0x29b)]();this[_0x2a2fa8(0x2db)](_0x4a54f7),Window_Base[_0x2a2fa8(0x226)][_0x2a2fa8(0x24c)][_0x2a2fa8(0x1dd)](this,_0x4a54f7),this[_0x2a2fa8(0x228)](),this[_0x2a2fa8(0x30e)](),this[_0x2a2fa8(0x25c)]=0x0;},Window_STB_TurnOrder['prototype'][_0x573481(0x29b)]=function(){const _0x342300=_0x573481;return this[_0x342300(0x32b)]($gameParty[_0x342300(0x25e)](),0x9,!![]);},Window_STB_TurnOrder[_0x573481(0x226)]['initHomePositions']=function(_0x24d10b){const _0x265cbe=_0x573481;this[_0x265cbe(0x2d3)]=this[_0x265cbe(0x32d)]=_0x24d10b['x'],this[_0x265cbe(0x248)]=this[_0x265cbe(0x334)]=_0x24d10b['y'],this[_0x265cbe(0x2c9)]=_0x24d10b[_0x265cbe(0x306)],this[_0x265cbe(0x370)]=_0x24d10b[_0x265cbe(0x349)],this['_homeDuration']=0x0;},Window_STB_TurnOrder['prototype'][_0x573481(0x32b)]=function(_0x3c9891,_0x4fcb30,_0x380f1e){const _0x4652ce=_0x573481,_0x551c83=Window_STB_TurnOrder[_0x4652ce(0x1da)],_0x1eca87=this[_0x4652ce(0x2bc)]()?_0x551c83[_0x4652ce(0x22e)]:_0x551c83[_0x4652ce(0x273)],_0x18f57c=Math[_0x4652ce(0x281)](_0x1eca87,_0x3c9891+_0x4fcb30),_0x2965d4=SceneManager[_0x4652ce(0x294)][_0x4652ce(0x35c)][_0x4652ce(0x349)],_0x415eb7=SceneManager[_0x4652ce(0x294)][_0x4652ce(0x31b)][_0x4652ce(0x349)],_0x7f0119=_0x551c83[_0x4652ce(0x1d9)],_0x4e41bd=Graphics[_0x4652ce(0x349)]-_0x2965d4-_0x415eb7;let _0x1adf93=0x0,_0x26d21d=0x0,_0x533260=0x0,_0x5f429d=0x0;switch(_0x551c83['DisplayPosition']){case _0x4652ce(0x33b):_0x1adf93=_0x551c83[_0x4652ce(0x1ed)]*_0x18f57c+_0x7f0119,_0x26d21d=_0x551c83[_0x4652ce(0x2d6)],_0x533260=Math[_0x4652ce(0x33d)]((Graphics['width']-_0x1adf93)/0x2),_0x5f429d=_0x551c83[_0x4652ce(0x22f)];break;case _0x4652ce(0x2ba):_0x1adf93=_0x551c83[_0x4652ce(0x1ed)]*_0x18f57c+_0x7f0119,_0x26d21d=_0x551c83[_0x4652ce(0x2d6)],_0x533260=Math[_0x4652ce(0x33d)]((Graphics[_0x4652ce(0x306)]-_0x1adf93)/0x2),_0x5f429d=Graphics['height']-_0x2965d4-_0x26d21d-_0x551c83[_0x4652ce(0x22f)];break;case _0x4652ce(0x371):_0x1adf93=_0x551c83[_0x4652ce(0x2d6)],_0x26d21d=_0x551c83[_0x4652ce(0x1ed)]*_0x18f57c+_0x7f0119,_0x533260=_0x551c83['ScreenBuffer'],_0x5f429d=Math[_0x4652ce(0x33d)]((_0x4e41bd-_0x26d21d)/0x2),_0x5f429d+=_0x415eb7;break;case _0x4652ce(0x301):_0x1adf93=_0x551c83[_0x4652ce(0x2d6)],_0x26d21d=_0x551c83[_0x4652ce(0x1ed)]*_0x18f57c+_0x7f0119,_0x533260=Graphics['width']-_0x1adf93-_0x551c83['ScreenBuffer'],_0x5f429d=Math['ceil']((_0x4e41bd-_0x26d21d)/0x2),_0x5f429d+=_0x415eb7;break;}if(!_0x380f1e){const _0x3011db=Window_STB_TurnOrder[_0x4652ce(0x1da)][_0x4652ce(0x232)];let _0x28e653=Math[_0x4652ce(0x281)](_0x1eca87,Math[_0x4652ce(0x281)]($gameParty['maxBattleMembers']()+0x8)-_0x18f57c);switch(_0x551c83[_0x4652ce(0x1f0)]){case _0x4652ce(0x33b):case _0x4652ce(0x2ba):_0x3011db&&(_0x533260-=_0x28e653*_0x551c83['SpriteThin']);break;}}return _0x533260+=_0x551c83[_0x4652ce(0x288)],_0x5f429d+=_0x551c83[_0x4652ce(0x320)],new Rectangle(_0x533260,_0x5f429d,_0x1adf93,_0x26d21d);},Window_STB_TurnOrder[_0x573481(0x226)][_0x573481(0x30f)]=function(){const _0x260f98=_0x573481;this[_0x260f98(0x27f)]=0x0;},Window_STB_TurnOrder[_0x573481(0x226)][_0x573481(0x2bc)]=function(){const _0x4468ca=_0x573481,_0x27515c=Window_STB_TurnOrder[_0x4468ca(0x1da)],_0x1b690b=['top','bottom'][_0x4468ca(0x359)](_0x27515c[_0x4468ca(0x1f0)]);return _0x1b690b;},Window_STB_TurnOrder[_0x573481(0x226)][_0x573481(0x228)]=function(){const _0x3a561e=_0x573481;this['_turnOrderInnerSprite']=new Sprite(),this['addInnerChild'](this[_0x3a561e(0x215)]),this[_0x3a561e(0x2c5)]=[];for(let _0x297fd6=0x0;_0x297fd6<$gameParty[_0x3a561e(0x25e)]();_0x297fd6++){const _0x15fad1=new Sprite_STB_TurnOrder_Battler($gameParty,_0x297fd6);this[_0x3a561e(0x215)][_0x3a561e(0x1fe)](_0x15fad1),this['_turnOrderContainer'][_0x3a561e(0x2e9)](_0x15fad1);}for(let _0x30188d=0x0;_0x30188d<0x8;_0x30188d++){const _0x49dce4=new Sprite_STB_TurnOrder_Battler($gameTroop,_0x30188d);this[_0x3a561e(0x215)][_0x3a561e(0x1fe)](_0x49dce4),this['_turnOrderContainer'][_0x3a561e(0x2e9)](_0x49dce4);}},Window_STB_TurnOrder['prototype'][_0x573481(0x23d)]=function(){const _0x10fe53=_0x573481;Window_Base[_0x10fe53(0x226)]['update'][_0x10fe53(0x1dd)](this),this['updateHomePosition'](),this[_0x10fe53(0x303)](),this[_0x10fe53(0x2bb)](),this[_0x10fe53(0x254)](),this[_0x10fe53(0x30e)]();},Window_STB_TurnOrder['prototype']['updateHomePosition']=function(){const _0x301cbc=_0x573481;if(this['_homeDuration']>0x0){const _0x5e5906=this[_0x301cbc(0x296)];this[_0x301cbc(0x32d)]=(this[_0x301cbc(0x32d)]*(_0x5e5906-0x1)+this['_targetHomeX'])/_0x5e5906,this[_0x301cbc(0x334)]=(this[_0x301cbc(0x334)]*(_0x5e5906-0x1)+this['_targetHomeY'])/_0x5e5906,this['_homeDuration']--,this['_homeDuration']<=0x0&&(this[_0x301cbc(0x32d)]=this[_0x301cbc(0x2d3)],this[_0x301cbc(0x334)]=this['_targetHomeY']);}},Window_STB_TurnOrder['prototype'][_0x573481(0x303)]=function(){const _0x1dde67=_0x573481,_0x2bc226=Window_STB_TurnOrder['Settings'];if(_0x2bc226[_0x1dde67(0x1f0)]!=='top')return;if(!_0x2bc226[_0x1dde67(0x2eb)])return;const _0x4b45aa=SceneManager[_0x1dde67(0x294)][_0x1dde67(0x31b)];if(!_0x4b45aa)return;_0x4b45aa[_0x1dde67(0x255)]?(this['x']=this['_homeX']+(_0x2bc226[_0x1dde67(0x2ce)]||0x0),this['y']=this[_0x1dde67(0x334)]+(_0x2bc226[_0x1dde67(0x2b1)]||0x0)):(this['x']=this[_0x1dde67(0x32d)],this['y']=this[_0x1dde67(0x334)]);const _0x373782=SceneManager['_scene']['_windowLayer'];this['_ogWindowLayerX']===undefined&&(this[_0x1dde67(0x252)]=Math['round']((Graphics[_0x1dde67(0x306)]-_0x373782['width'])/0x2),this['_ogWindowLayerY']=Math[_0x1dde67(0x310)]((Graphics[_0x1dde67(0x349)]-_0x373782[_0x1dde67(0x349)])/0x2)),this['x']+=_0x373782['x']-this[_0x1dde67(0x252)],this['y']+=_0x373782['y']-this[_0x1dde67(0x366)];},Window_STB_TurnOrder[_0x573481(0x226)][_0x573481(0x2bb)]=function(){const _0x3a01e2=_0x573481,_0x3adfe4=Window_STB_TurnOrder[_0x3a01e2(0x1da)];if(['top'][_0x3a01e2(0x359)](_0x3adfe4[_0x3a01e2(0x1f0)]))return;this['x']=this['_homeX'],this['y']=this['_homeY'];const _0x599492=SceneManager[_0x3a01e2(0x294)]['_windowLayer'];this['x']+=_0x599492['x'],this['y']+=_0x599492['y'];},Window_STB_TurnOrder[_0x573481(0x226)][_0x573481(0x254)]=function(){const _0x2236ae=_0x573481;if(!this['_turnOrderInnerSprite'])return;const _0x242b50=this['_turnOrderInnerSprite'][_0x2236ae(0x2ae)];if(!_0x242b50)return;_0x242b50[_0x2236ae(0x2e0)](this[_0x2236ae(0x358)][_0x2236ae(0x24d)](this));},Window_STB_TurnOrder[_0x573481(0x226)][_0x573481(0x358)]=function(_0x41317e,_0x1fe9c8){const _0x57f9c7=_0x573481,_0x13e4ab=this[_0x57f9c7(0x2bc)](),_0x15f55b=Window_STB_TurnOrder['Settings'][_0x57f9c7(0x232)];if(_0x13e4ab&&!_0x15f55b)return _0x41317e['x']-_0x1fe9c8['x'];else{if(_0x13e4ab&&_0x15f55b)return _0x1fe9c8['x']-_0x41317e['x'];else{if(!_0x13e4ab&&_0x15f55b)return _0x41317e['y']-_0x1fe9c8['y'];else{if(!_0x13e4ab&&!_0x15f55b)return _0x1fe9c8['y']-_0x41317e['y'];}}}},Window_STB_TurnOrder['prototype'][_0x573481(0x30e)]=function(){const _0xddd4c0=_0x573481;this[_0xddd4c0(0x255)]=$gameSystem[_0xddd4c0(0x326)]();},Window_STB_TurnOrder[_0x573481(0x226)][_0x573481(0x22c)]=function(_0x288406){const _0xe5e91b=_0x573481;this[_0xe5e91b(0x2c5)][_0xe5e91b(0x2e0)]((_0x44d38b,_0x5e55c8)=>{const _0x508be3=_0xe5e91b;return _0x44d38b[_0x508be3(0x208)]()-_0x5e55c8[_0x508be3(0x208)]();}),this['recalculateHome']();if(!_0x288406)return;for(const _0x546d03 of this[_0xe5e91b(0x2c5)]){if(!_0x546d03)continue;_0x546d03['update'](),_0x546d03[_0xe5e91b(0x225)]=0x0;}},Window_STB_TurnOrder[_0x573481(0x226)]['recalculateHome']=function(){const _0xaaf7f9=_0x573481;if(!this[_0xaaf7f9(0x2bc)]())return;const _0x2b2c49=VisuMZ[_0xaaf7f9(0x33c)][_0xaaf7f9(0x1da)][_0xaaf7f9(0x361)];if(!_0x2b2c49['CenterHorz'])return;const _0x509a9a=$gameParty[_0xaaf7f9(0x239)]()[_0xaaf7f9(0x27b)](_0x277477=>_0x277477&&_0x277477[_0xaaf7f9(0x2a7)]()&&_0x277477[_0xaaf7f9(0x2ab)]())[_0xaaf7f9(0x1f6)],_0x5ec046=$gameTroop[_0xaaf7f9(0x239)]()[_0xaaf7f9(0x27b)](_0x12c4ca=>_0x12c4ca&&_0x12c4ca[_0xaaf7f9(0x2a7)]()&&_0x12c4ca['isAppeared']())['length'],_0x31d602=this[_0xaaf7f9(0x32b)](_0x509a9a,_0x5ec046);this['_targetHomeX']=_0x31d602['x'],this[_0xaaf7f9(0x248)]=_0x31d602['y'],(this['_targetHomeX']!==this[_0xaaf7f9(0x32d)]||this[_0xaaf7f9(0x248)]!==this[_0xaaf7f9(0x334)])&&(this[_0xaaf7f9(0x296)]=_0x2b2c49[_0xaaf7f9(0x28f)]);};