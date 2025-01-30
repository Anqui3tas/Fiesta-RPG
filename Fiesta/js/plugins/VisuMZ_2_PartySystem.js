//=============================================================================
// VisuStella MZ - Party System
// VisuMZ_2_PartySystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_PartySystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.PartySystem = VisuMZ.PartySystem || {};
VisuMZ.PartySystem.version = 1.15;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.15] [PartySystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Party_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MZ only gives game projects the ability to switch party members
 * within the main menu and nothing more. There's no inherent functionality to
 * lock party members, make party members required, and/or give players the
 * ability to switch party members mid-battle.
 *
 * This plugin will add in all of those functions as well as a dedicated scene
 * for switching party members. Party switching will allow party members to be
 * removed, swapped, and sorted. Through the usage of Plugin Commands, party
 * members can also be locked and/or required for party presence.
 *
 * Those using the VisuStella MZ Battle Core will also have access to features
 * in this plugin that aren't available otherwise. These features give players
 * the functionality to switch out the whole party lineup mid-battle and/or
 * individual party member switching.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Custom scene dedicated to party management.
 * * Change the maximum number of party members that can participate in battle.
 * * Plugin Commands to lock party members.
 * * Plugin Commands to make certain party members required.
 * * Added functionality with Battle Core to switch party members mid-battle.
 * * This comes in the form of changing either the whole party at once.
 * * Or switching individual members out one at a time.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Main Menu Formation Command
 *
 * - This command is now changed to send the player to Scene_Party for the
 * player to have a dedicated scene for changing the party.
 *
 * ---
 *
 * Battle Members Array
 *
 * - Previously, the battle members are decided by which actors are lined up
 * first in the party roster. This has been changed to give players the freedom
 * to have a party size less than the maximum. This change is made by changing
 * the way the battle members are determined by using a new array. However, any
 * and all functions utilize the $gameParty.battleMembers() function will still
 * behave as normal.
 *
 * ---
 *
 * Formation Change OK Function
 *
 * - RPG Maker MZ did not do anything with the Game_Actor.isFormationChangeOk
 * function so this plugin overwrote it completely to allow for the new
 * lock and require features to work.
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
 * VisuMZ_1_BattleCore
 *
 * - If the VisuStella MZ Battle Core plugin is present, players are able to 
 * access party switching functionality mid-battle at will. This can be in the
 * form of switching out the entire active party roster at once or individually
 * for each actor.
 *
 * - Switching Entire Rosters: This can be done by going into this plugin's
 * Plugin Parameters => General => Party Command Window => Add Party Command.
 * If the Party Command Window is accessible, the player will be able to see
 * the option between 'Auto Battle' and 'Options'.
 *
 * - Individual Member Switching: This requires going to VisuMZ_1_BattleCore's
 * Plugin Parameters => Actor Command Window => Battle Commands => Command List
 * and add in the "party" option. The "party" option can also be added to the
 * <Battle Commands> notetag.
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
 * === Party Plugin Commands ===
 * 
 * ---
 *
 * Party: Call Party Scene
 * - Calls the party changing scene.
 *
 * ---
 *
 * Party: Change Max Battle Members
 * - Changes the number of max battle members possible.
 * - Cannot be use mid-battle.
 *
 *   Max Members:
 *   - Changes the number of max battle members possible.
 *   - Use 0 for the game's default number.
 *
 * ---
 *
 * Party: Lock/Unlock Member(s)
 * - Allows you to lock/unlock a party member.
 * - Locked actors cannot change their party position.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to lock/unlock.
 *   - Locked actors cannot change their party position.
 *
 *   Lock?:
 *   - Lock the selected actor(s)?
 *
 * ---
 * 
 * Party: Move Actor(s) to Active
 * - Map Only.
 * - Moves an actor to the active party if there is room.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the active party if there is room.
 * 
 * ---
 * 
 * Party: Move Actor(s) to Reserve
 * - Map Only.
 * - Moves an actor to the reserve party.
 * - Must be 1 actor left.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the reserve party.
 * 
 * ---
 * 
 * Party: Move Party Index to Reserve
 * - Map only.
 * - Moves an actor in a specific party index to reserve.
 * - Must be 1 actor left.
 * 
 *   Index:
 *   - Type in which index to move.
 *   - Index values start at 0.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * Party: Move Random Reserve to Active
 * - Map only.
 * - Moves a random actor from the reserve party to active.
 * - Must be enough space in active party.
 * 
 * ---
 *
 * Party: Require Member(s)
 * - Allows you to require/free a party member.
 * - Required actors must be in the party to exit the scene.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to require/free.
 *   - Required actors must be in the party to exit the scene.
 *
 *   Require?:
 *   - Make the selected actor(s) required?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These Plugin Parameters control the overall behaviors pertaining to the
 * Party System added with this plugin. These behaviors range from the maximum
 * number of members that can participate in battle to the availability of the
 * party switching mechanics.
 *
 * ---
 *
 * General
 * 
 *   Max Battle Members:
 *   - Maximum number of battle members.
 *
 * ---
 *
 * Party Scene
 * 
 *   Add Remove Command:
 *   - Add the 'Remove' command to the party scene?
 * 
 *   Locked Member Icon:
 *   - Icon used for a locked party member.
 * 
 *   Requiured Member Icon:
 *   - Icon used for a required party member.
 *
 * ---
 *
 * Party Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Party Command:
 *   - Add the 'Party' command to the Party Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 *
 * ---
 *
 * Actor Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Switch Command:
 *   - Add the 'Switch' command to the Actor Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 * 
 *   Switch Out Animation?:
 *   - Show the sprites switching out when using individual party
 *     member switching?
 * 
 *   TPB: Immediate Action:
 *   - Allow actors to immediate act upon switching in for TPB battle systems?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * These Plugin Parameters control the text that you see in-game related to the
 * Party System plugin.
 *
 * ---
 *
 * General
 * 
 *   Active Party:
 *   - Vocabulary used to represent the Active Party.
 * 
 *   Reserve Party:
 *   - Vocabulary used to represent the Reserve Party.
 * 
 *   Status:
 *   - Vocabulary used to represent the Status Window.
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
 * Party Scene > Windows
 * 
 *   Empty:
 *   - For the party and status windows when no actor is selected.
 * 
 *   Remove:
 *   - For the remove option.
 *
 * ---
 *
 * Party Scene > Button Assist
 * 
 *   Swap Positions:
 *   - Button assist text for the page up/down commands.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Remove:
 *   - Button assist text for the removal command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Sort:
 *   - Button assist text for the sort command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap In:
 *   - Button assist text for swapping in actors.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap Out:
 *   - Button assist text for swapping out actors.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Battle Scene
 * 
 *   Party Command:
 *   - Command text for entering Party Scene.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Formation:
 *   - Help text for Formation command.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Queue Message:
 *   - Message to say the Party Scene is queued.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Switch Command:
 *   - Command text for switching out members.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Switch:
 *   - Help text for Switch command.
 *   - Requires VisuMZ_1_BattleCore!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Party.
 *
 * ---
 *
 * Background Settings
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
 * If you don't like the locations of the windows in Scene_Party, change them
 * up with these Plugin Parameters, provided that you have an understanding of
 * JavaScript code.
 *
 * ---
 *
 * Active Party Label
 * Active Party Window
 * Reserve Party Label
 * Reserve Party Window
 * Status Label
 * Status Window
 * Battle Switch Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Columns:
 *   - Available only for the Reserve Party Window.
 *   - How many columns do you want there to be for the window?
 * 
 *   Actor Graphic:
 *   - Available only for Active Party Window and Reserve Party Window.
 *   - Choose how the actor graphics appear in the specific windows.
 *     - Face
 *     - Map Sprite
 *     - Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * 
 *     Map Sprite:
 *     Sideview Battler:
 * 
 *       Offset X:
 *       Offset Y:
 *       - If showing map sprites, offset the x or y coordinates.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
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
 * Version 1.15: March 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Gneral > Battle Scene > Battle Party Icon
 * **** For some reason, we never had a setting that lets you change the party
 *      icon. Well, now there is!
 * 
 * Version 1.14: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Party Index to Reserve
 * **** Moves an actor in a specific party index to reserve.
 *      Map only. Must be 1 actor left. You may use code.
 * *** Party: Move Random Reserve to Active
 * **** Moves a random actor from the reserve party to active.
 *      Map only. Must be enough space in active party.
 * 
 * Version 1.13: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Actor(s) to Active
 * **** Map only. Moves an actor to the active party if there is room.
 * *** Party: Move Actor(s) to Reserve
 * **** Map only. Moves an actor to the reserve party.
 * 
 * Version 1.12: January 15, 2021
 * * Bug Fixes!
 * ** For battle testing, if the number of battle test members exceeds the
 *    maximum battle member slots, trim them until they match. Fix by Olivia.
 * 
 * Version 1.11: January 1, 2021
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.10: December 25, 2020
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.09: December 18, 2020
 * * Bug Fixes!
 * ** Removing party members in the active party by event command will now be
 *    properly removed from the party. Fix made by Yanfly.
 * 
 * Version 1.08: December 4, 2020
 * * Bug Fixes!
 * ** With TPB battle systems, after switching out party members, the battle
 *    system will no longer carry over any previous active battle members in
 *    the command window. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: November 22, 2020
 * * Bug Fixes!
 * ** With Active TPB, switching out a party member mid-action is no longer
 *    possible to prevent bugs. Intead, there party switching action will be
 *    queued and take effect after the action has been completed. Fix made by
 *    Yanfly.
 * * Compatibility Update!
 * ** Game_Party.swapOrder function now works with this plugin. However, keep
 *    in mind that due to how this party system plugin allows you have empty
 *    slots in the active battle party, this function will fill in the empty
 *    slots upon usage. Update made by Yanfly.
 *
 * Version 1.06: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin Command "Party: Change Max Battle Members" now works again.
 *    Fix made by Arisu.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: October 11, 2020
 * * Bug Fixes!
 * ** Adding party members during battle through the party window command will
 *    no longer cause crashes after they input an action. Fix made by Yanfly.
 * 
 * Version 1.02: October 4, 2020
 * * Bug Fixes!
 * ** Adding party members during test play should now work again.
 *    Fix made by Irina.
 * ** Changing party members mid-battle through the actor command should now
 *    refresh the party followers afterwards. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Arisu!
 * *** General > Party Command Window > TPB: Immediate Action
 * **** Allow actors to immediate act upon switching in for TPB battle systems?
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** When switching actors with states, buffs, and/or debuffs already applied,
 *    the state icons found in the status window will now switch over properly,
 *    too. Fix made by Arisu.
 *
 * Version 1.00: September 7, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallPartyScene
 * @text Party: Call Party Scene
 * @desc Calls the party changing scene.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeMaxBattleMembers
 * @text Party: Change Max Battle Members
 * @desc Changes the number of max battle members possible.
 * Cannot be use mid-battle.
 *
 * @arg Value:eval
 * @text Max Members
 * @desc Changes the number of max battle members possible.
 * Use 0 for the game's default number.
 * @default 4
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LockPartyMembers
 * @text Party: Lock/Unlock Member(s)
 * @desc Allows you to lock/unlock a party member.
 * Locked actors cannot change their party position.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to lock/unlock.
 * Locked actors cannot change their party position.
 * @default ["1"]
 * 
 * @arg Lock:eval
 * @text Lock?
 * @type boolean
 * @on Lock
 * @off Unlock
 * @desc Lock the selected actor(s)?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToActive
 * @text Party: Move Actor(s) to Active
 * @desc Moves an actor to the active party if there is room.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the active party if there is room.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToReserve
 * @text Party: Move Actor(s) to Reserve
 * @desc Moves an actor to the reserve party. Must be 1 actor left.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the reserve party.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MovePartyIndexToReserve
 * @text Party: Move Party Index to Reserve
 * @desc Moves an actor in a specific party index to reserve.
 * Map only. Must be 1 actor left.
 *
 * @arg Index:eval
 * @text Party Index
 * @desc Type in which index to move. Index values start at 0.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveRandomToActive
 * @text Party: Move Random Reserve to Active
 * @desc Moves a random actor from the reserve party to active.
 * Map only. Must be enough space in active party.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RequirePartyMembers
 * @text Party: Require Member(s)
 * @desc Allows you to require/free a party member.
 * Required actors must be in the party to exit the scene.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to require/free.
 * Required actors must be in the party to exit the scene.
 * @default ["1"]
 * 
 * @arg Require:eval
 * @text Require?
 * @type boolean
 * @on Require
 * @off Don't Require
 * @desc Make the selected actor(s) required?
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
 * @param PartySystem
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
 * @desc General settings pertaining to Party-related mechanics.
 * @default {"General":"","MaxBattleMembers:num":"4","PartyScene":"","AddRemoveCmd:eval":"true","LockIcon:num":"195","RequireIcon:num":"87","DrawBackRect:eval":"true","BackRectColor:str":"19","PartyCmdWin":"","PartyCmdWinAddParty:eval":"false","PartyCmdCooldown:num":"1","tpbImmediateAction:eval":"true","ActorCmdWin":"","ActorCmdWinAddParty:eval":"true","ActorCmdCooldown:num":"1","SwitchOutAnimation:eval":"true"}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"General":"","ActiveParty:str":"Active Party","ReserveParty:str":"Reserve Party","Status:str":"Status","PartyScene":"","Windows":"","Empty:str":"- Empty -","Remove:str":"Remove","ButtonAssist":"","AssistSwapPosition:str":"Quick Swap","AssistRemove:str":"Remove","AssistSort:str":"Sort","AssistSwapIn:str":"Swap In","AssistSwapOut:str":"Swap Out","BattleScene":"","BattlePartyCmd:str":"Party","BattleHelpFormation:json":"\"Change up your party formation.\"","QueuePartyScene:str":"%1 Menu queued after action is complete.","BattleSwitchOut:str":"Switch","BattleHelpSwitch:json":"\"Switch out this party member with another.\""}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Party.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc These settings let you control how the windows appear in Scene_Party.
 * @default {"ActivePartyLabel":"","ActivePartyLabelBgType:num":"0","ActivePartyLabelRect:func":"\"const wx = 0;\\nconst wy = this.mainAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ActivePartyWindow":"","ActivePartyWindowBgType:num":"0","ActivePartyGraphic:str":"face","ActivePartyMapSprite":"","ActiveSpriteOffsetX:num":"0","ActiveSpriteOffsetY:num":"4","ActivePartySvBattler":"","ActiveBattlerOffsetX:num":"0","ActiveBattlerOffsetY:num":"4","ActivePartyWindowRect:func":"\"const wx = 0;\\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\\nconst ww = Graphics.boxWidth;\\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyLabel":"","ReservePartyLabelBgType:num":"0","ReservePartyLabelRect:func":"\"const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyWindow":"","ReservePartyWindowBgType:num":"0","ReserveItemThickness:num":"2","ReservePartyGraphic:str":"face","ReservePartyMapSprite":"","ReserveSpriteOffsetX:num":"24","ReserveSpriteOffsetY:num":"4","ReservePartySvBattler":"","ReserveBattlerOffsetX:num":"48","ReserveBattlerOffsetY:num":"4","ReservePartyWindowRect:func":"\"const ww = this._reservePartyLabel.width;\\nconst wx = this._reservePartyLabel.x;\\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusLabel":"","StatusLabelBgType:num":"0","StatusLabelRect:func":"\"const ww = Graphics.boxWidth - this._reservePartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusWindow":"","StatusWindowBgType:num":"0","StatusWindowDraw:func":"\"// Draw Empty\\nif (!this._actor) {\\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\\n    this.changeTextColor(ColorManager.systemColor());\\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\\n    return;\\n}\\n\\n// Draw Face and Simple Status\\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\\n\\n// Declare Constants\\nconst lineHeight = this.lineHeight();\\nconst params = this.actorParams();\\nconst paramWidth = Math.round(this.innerWidth / 2);\\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\\nconst baseX = 0;\\nlet x = 0;\\nlet y = ImageManager.faceHeight + lineHeight / 2;\\n\\n// Draw Parameters\\nfor (const param of params) {\\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\\n    this.drawParamName(param, x, y, paramWidth);\\n    this.drawParamValue(param, x, y, paramWidth);\\n\\n    if (x === baseX) {\\n        x += paramWidth;\\n    } else {\\n        x = baseX;\\n        y += lineHeight;\\n    }\\n}\"","StatusWindowRect:func":"\"const ww = this._statusPartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._reservePartyWindow.y;\\nconst wh = this._reservePartyWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","BattleSwitchWindow":"","BattleSwitchWindowBgType:num":"0","BattleSwitchWindowRect:func":"\"const padding = $gameSystem.windowPadding() * 2;\\nlet ww = 516 + padding;\\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * @param MaxBattleMembers:num
 * @text Max Battle Members
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of battle members.
 * @default 4
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyIcon:num
 * @text Battle Party Icon
 * @parent BattleScene
 * @desc Icon used for changing party members.
 * @default 75
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param AddRemoveCmd:eval
 * @text Add Remove Command
 * @parent PartyScene
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Remove' command to the party scene?
 * @default true
 *
 * @param LockIcon:num
 * @text Locked Member Icon
 * @parent PartyScene
 * @desc Icon used for a locked party member.
 * @default 195
 *
 * @param RequireIcon:num
 * @text Requiured Member Icon
 * @parent PartyScene
 * @desc Icon used for a required party member.
 * @default 87
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent PartyScene
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
 * @param PartyCmdWin
 * @text Party Command Window
 *
 * @param PartyCmdWinAddParty:eval
 * @text Add Party Command
 * @parent PartyCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Party' command to the Party Command Window?
 * @default false
 *
 * @param PartyCmdCooldown:num
 * @text Command Cooldown
 * @parent PartyCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param ActorCmdWin
 * @text Actor Command Window
 *
 * @param ActorCmdWinAddParty:eval
 * @text Add Switch Command
 * @parent ActorCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Switch' command to the Actor Command Window?
 * @default true
 *
 * @param ActorCmdCooldown:num
 * @text Command Cooldown
 * @parent ActorCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param SwitchOutAnimation:eval
 * @text Switch Out Animation?
 * @parent ActorCmdWin
 * @type boolean
 * @on Show
 * @off Don't
 * @desc Show the sprites switching out when using individual party member switching?
 * @default true
 *
 * @param tpbImmediateAction:eval
 * @text TPB: Immediate Action
 * @parent ActorCmdWin
 * @type boolean
 * @on Immediate Action
 * @off Empty Gauge
 * @desc Allow actors to immediate act upon switching in for TPB battle systems?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param General
 *
 * @param ActiveParty:str
 * @text Active Party
 * @parent General
 * @desc Vocabulary used to represent the Active Party.
 * @default Active Party
 *
 * @param ReserveParty:str
 * @text Reserve Party
 * @parent General
 * @desc Vocabulary used to represent the Reserve Party.
 * @default Reserve Party
 *
 * @param Status:str
 * @text Status
 * @parent General
 * @desc Vocabulary used to represent the Status Window.
 * @default Status
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param Windows
 * @parent PartyScene
 *
 * @param Empty:str
 * @text Empty
 * @parent Windows
 * @desc For the party and status windows when no actor is selected.
 * @default - Empty -
 *
 * @param Remove:str
 * @text Remove
 * @parent Windows
 * @desc For the remove option.
 * @default Remove
 *
 * @param ButtonAssist
 * @text Button Assist
 * @parent PartyScene
 *
 * @param AssistSwapPosition:str
 * @text Swap Positions
 * @parent ButtonAssist
 * @desc Button assist text for the page up/down commands.
 * Requires VisuMZ_0_CoreEngine!
 * @default Quick Swap
 *
 * @param AssistRemove:str
 * @text Remove
 * @parent ButtonAssist
 * @desc Button assist text for the removal command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Remove
 *
 * @param AssistSort:str
 * @text Sort
 * @parent ButtonAssist
 * @desc Button assist text for the sort command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Sort
 *
 * @param AssistSwapIn:str
 * @text Swap In
 * @parent ButtonAssist
 * @desc Button assist text for swapping in actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap In
 *
 * @param AssistSwapOut:str
 * @text Swap Out
 * @parent ButtonAssist
 * @desc Button assist text for swapping out actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap Out
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyCmd:str
 * @text Party Command
 * @parent BattleScene
 * @desc Command text for entering Party Scene.
 * Requires VisuMZ_1_BattleCore!
 * @default Party
 *
 * @param BattleHelpFormation:json
 * @text Help: Formation
 * @parent BattlePartyCmd:str
 * @type note
 * @desc Help text for Formation command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Change up your party formation."
 *
 * @param QueuePartyScene:str
 * @text Queue Message
 * @parent BattlePartyCmd:str
 * @desc Message to say the Party Scene is queued.
 * Requires VisuMZ_1_BattleCore!
 * @default %1 Menu queued after action is complete.
 *
 * @param BattleSwitchOut:str
 * @text Switch Command
 * @parent BattleScene
 * @desc Command text for switching out members.
 * Requires VisuMZ_1_BattleCore!
 * @default Switch
 *
 * @param BattleHelpSwitch:json
 * @text Help: Switch
 * @parent BattleSwitchOut:str
 * @type note
 * @desc Help text for Switch command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Switch out this party member with another."
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
 * @param ActivePartyLabel
 * @text Active Party Label
 *
 * @param ActivePartyLabelBgType:num
 * @text Background Type
 * @parent ActivePartyLabel
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
 * @param ActivePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.mainAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ActivePartyWindow
 * @text Active Party Window
 *
 * @param ActivePartyWindowBgType:num
 * @text Background Type
 * @parent ActivePartyWindow
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
 * @param ActivePartyGraphic:str
 * @text Actor Graphic
 * @parent ActivePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the active party menu.
 * @default face
 *
 * @param ActivePartyMapSprite
 * @text Map Sprite
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveSpriteOffsetX:num
 * @text Offset X
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveSpriteOffsetY:num
 * @text Offset Y
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartySvBattler
 * @text Sideview Battler
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveBattlerOffsetX:num
 * @text Offset X
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveBattlerOffsetY:num
 * @text Offset Y
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\nconst ww = Graphics.boxWidth;\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyLabel
 * @text Reserve Party Label
 *
 * @param ReservePartyLabelBgType:num
 * @text Background Type
 * @parent ReservePartyLabel
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
 * @param ReservePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyWindow
 * @text Reserve Party Window
 *
 * @param ReservePartyWindowBgType:num
 * @text Background Type
 * @parent ReservePartyWindow
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
 * @param ReserveCol:num
 * @text Columns
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many columns do you want there to be for the window?
 * @default 1
 *
 * @param ReserveItemThickness:num
 * @text Row Thickness
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many rows thick do you want selectable items to be?
 * @default 2
 *
 * @param ReservePartyGraphic:str
 * @text Actor Graphic
 * @parent ReservePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the reserve party menu.
 * @default face
 *
 * @param ReservePartyMapSprite
 * @text Map Sprite
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveSpriteOffsetX:num
 * @text Offset X
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from left.
 * @default 24
 *
 * @param ReserveSpriteOffsetY:num
 * @text Offset Y
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartySvBattler
 * @text Sideview Battler
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveBattlerOffsetX:num
 * @text Offset X
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from left.
 * @default 48
 *
 * @param ReserveBattlerOffsetY:num
 * @text Offset Y
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._reservePartyLabel.width;\nconst wx = this._reservePartyLabel.x;\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusLabel
 * @text Status Label
 *
 * @param StatusLabelBgType:num
 * @text Background Type
 * @parent StatusLabel
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
 * @param StatusLabelRect:func
 * @text JS: X, Y, W, H
 * @parent StatusLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._reservePartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusWindowBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusWindowDraw:func
 * @text JS: Draw Data
 * @parent StatusWindow
 * @type note
 * @desc Code used to draw the display data in the Status Window.
 * @default "// Draw Empty\nif (!this._actor) {\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\n    this.changeTextColor(ColorManager.systemColor());\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\n    return;\n}\n\n// Draw Face and Simple Status\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\n\n// Declare Constants\nconst lineHeight = this.lineHeight();\nconst params = this.actorParams();\nconst paramWidth = Math.round(this.innerWidth / 2);\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\nconst baseX = 0;\nlet x = 0;\nlet y = ImageManager.faceHeight + lineHeight / 2;\n\n// Draw Parameters\nfor (const param of params) {\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\n    this.drawParamName(param, x, y, paramWidth);\n    this.drawParamValue(param, x, y, paramWidth);\n\n    if (x === baseX) {\n        x += paramWidth;\n    } else {\n        x = baseX;\n        y += lineHeight;\n    }\n}"
 *
 * @param StatusWindowRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._statusPartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._reservePartyWindow.y;\nconst wh = this._reservePartyWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param BattleSwitchWindow
 * @text Battle Switch Window
 *
 * @param BattleSwitchWindowBgType:num
 * @text Background Type
 * @parent BattleSwitchWindow
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
 * @param BattleSwitchWindowRect:func
 * @text JS: X, Y, W, H
 * @parent BattleSwitchWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * Does not apply to Border Battle Layout style.
 * @default "const padding = $gameSystem.windowPadding() * 2;\nlet ww = 516 + padding;\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x217d=['updateHelp','round','applyBattlePartySwitchCooldown','1jVgUQr','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','createPageButtons','_rowThickness','ReserveItemThickness','isSceneParty','mapId','Scene_Battle_isTimeActive','_actorCommandWindow','playOkSound','BattleHelpFormation','Game_Unit_inBattle','_currentActor','reselect','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','stepForward','preparePartySwitchMember','drawItemStatus','addRemoveCommand','ensureCursorVisible','swapOrderPartySystemPlugin','_scene','createAllWindows','drawActorPartyIconsVert','LockPartyMembers','startOpacity','filter','drawItemEmpty','border','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Game_Party_initialize','MoveActorsToActive','anyRequiredPartyMembersInReserve','isAppeared','snapForBackground','setActor','Game_Party_removeActor','random','requiredPartyMemberIcon','updateBattleProcess','RequireIcon','ActivePartyGraphic','_windowLayer','ReservePartyGraphic','iconHeight','_partyRequired','ReservePartyLabelRect','ReserveSpriteOffsetY','callFormation','StatusWindowBgType','shift','deactivate','battler','ARRAYFUNC','statusParty','isFormationCommandEnabled','Scene_Battle_createAllWindows','clearBypassAutoSave','loadTitle2','isShowPartySwitchOutAnimation','nameStartPosition','remove','createCustomBackgroundImages','isAutosaveEnabled','isActiveTpb','setText','DrawBackRect','ReserveSpriteOffsetX','MoveRandomToActive','createStatusLabel','_reservePartyLabel','addChild','initialize','removePartyMember','reserveMembers','drawIcon','_actors','addLoadListener','createPartyCommandWindowBattleCore','setBattler','width','right','playCursorSound','buttonAssistText3','contents','parse','deselect','drawItemImageSprite','onActiveOk','STRUCT','partySwitchWindowRectBorder','ReservePartyLabelBgType','_partySwitchBattleCommandCooldown','Scene_Base_isAutosaveEnabled','cursorDown','BgFilename1','activeParty','General','clearPartySwitchCommandCooldown','AssistSwapIn','name','ARRAYSTR','isPartyCommandEnabled','maxBattleMembers','scaleSprite','sort','sortActors','isActor','innerHeight','initEquips','lineHeight','1oBCUJQ','createReservePartyWindow','isBTB','_backSprite2','changePaintOpacity','call','cursorUp','partySwitchWindowRectStandard','lockPartyMemberIcon','actorId','_reservePartyWindow','Vocab','38613YwqwVC','clearPartyBattleCommandCooldown','updateTurnOrderSTB','drawParamName','direction','RequirePartyMembers','drawDarkRect','processShiftSortShortcut','sortActionOrdersBTB','SceneManager_isNextSceneBattleTransitionable','increaseTurn','initMaxBattleMembers','_actorGraphic','ActiveBattlerOffsetX','changeTextColor','AssistSwapPosition','_statusPartyLabel','JSON','min','createPartySwitchWindow','playEquip','isAnyInputWindowActive','loadPartyImages','getParamValue','isCurrentItemEnabled','startMove','allMembers','BgSettings','statusLabelRect','ActivePartyLabelRect','param','Status','buttonAssistKey3','dimColor2','PartySystem','addActorToBattleMembers','Game_Party_setupStartingMembers','recoverAll','initBattleMembers','createActorCommandWindow','Game_Troop_increaseTurn','isSTB','toUpperCase','drawActorClass','Sprite_Actor_update','isImmediateTpb','createInnerSprite','select','drawParamText','drawParamValue','isShiftRemoveShortcutEnabled','dimColor1','battlePartyChangeIcon','415110RlYtEb','refreshAllWindows','_battleSystemIncompatibilityError','loadTitle1','ConvertParams','isAlive','initPartySystem','maxCols','active','activePartyWindowRect','reserveTransfer','text','placeBasicGauges','AddRemoveCmd','openness','windowPadding','reservePartyWindowRect','commandFormation','BackRectColor','770281XEvwEh','followers','AssistSort','drawActorName','ActorCmdCooldown','toLowerCase','partySwitchWindowRect','WARNING:\x20Party\x20Change\x20command\x20is\x20unavailable\x20for\x20Window_PartyCommand\x20for\x20this\x20Battle\x20System','rearrangePartyActors','_statusWindow','format','callPartyMemberSwitch','includes','isFormationChangeOk','makeActionOrders','regenerateAll','cursorPagedown','getPartySystemBackColor','663300YEDYxL','isPreviousSceneBattleTransitionable','isSceneBattle','_partySwitchTargetActor','ActiveTpbFormationMessage','ActiveSpriteOffsetY','uiInputPosition','innerWidth','loadFace','currentSymbol','exit','ARRAYEVAL','pendingIndex','ActiveParty','ActorCmdWinAddParty','_partyLocked','addFormationCommand','onBattleStart','setStatusWindow','_activePartyLabel','BgFilename2','activePartyLabelRect','_bypassAutoSavePartySystem','height','indexOf','FUNC','systemColor','isSceneMap','cursorPageup','isNextSceneBattleTransitionable','addText','battlePartyChangeCmdHelp','_helpWindow','Actors','131585uREsYU','postPartySwitchMenuTurnBased','setupBattleTest','postPartySwitchMenuTpb','characterName','fillRect','_callSceneParty','index','makeActions','assistSwapOutPartyMember','_callPartyMemberSwitch','battleMembers','StatusWindowDraw','addPartyCommand','smoothSelect','battlePartyChangeCmd','updateTurnOrderCTB','level','isQueueFormationMenu','Lock','pop','isPartyCommandAdded','processCursorMove','drawActorPartyIcons','setPartyLock','isCancelEnabled','ReserveBattlerOffsetY','inBattle','drawItemImageSvActor','adjustSprite','LockIcon','BattleManager_setup','rawBattleMembers','startSwitchInAnimation','gradientFillRect','registerCommand','getBackgroundOpacity','maxItems','createActivePartyWindow','switchStateIconActor','Window_ActorCommand_updateHelp','hpColor','padding','VisuMZ_2_BattleSystemBTB','BattleSwitchOut','drawSvActor','processShiftRemoveShortcut','addWindow','AssistSwapOut','isRightInputMode','Scene_Battle_isAnyInputWindowActive','currentActor','setHandler','setBattlePartySwitchCooldown','reservePartyLabelRect','_partyCommandWindow','CoreEngine','Scene_Battle_createPartyCommandWindowBattleCore','isShiftShortcutEnabled','ReservePartyWindowBgType','match','map','updatePadding','#%1','BattleSwitchWindowBgType','assistSwapInPartyMember','reserveParty','onBattlePartySwitch','MaxBattleMembers','checkShiftSortShortcut','processPartySwitchMember','_backSprite1','actorParams','ChangeMaxBattleMembers','isFormationCommandAdded','bind','constructor','removeActorFromBattleMembers','StatusLabelRect','SceneManager_isPreviousSceneBattleTransitionable','BattlePartyIcon','Value','Game_Party_swapOrder','itemPadding','isRequiredInParty','isPreviousScene','Settings','popScene','_activePartyWindow','itemLineRect','2265307DtoGBK','formation','battlePartySwitchCooldown','processCancel','VisuMZ_2_BattleSystemFTB','getColor','_tpbState','STR','canSwitchPartyInBattle','updatePartySwitch','centerSprite','gaugeBackColor','isEnabled','_partySystemBattleCommandCooldown','addNonBattleTestMembers','faceName','sprite','createBackground','loadSvActor','floor','_tpbChargeTime','statusWindowRect','_pageupButton','callUpdateHelp','itemRect','refresh','DisplayedParams','Game_Party_addActor','loadCharacter','hasBattleSystemIncompatibilities','removeActor','drawRemoveCommand','assistSwapPositions','checkShiftRemoveShortcut','Window','createStatusWindow','changeMaxBattleMembers','drawActorFace','resetFontSettings','defaultMaxBattleMembers','createActivePartyLabel','setupStartingMembers','StatusLabelBgType','onReserveOk','actor','processDrawItem','commandPartyMemberSwitch','VisuMZ_1_MainMenuCore','setup','visible','_partySystemSwitchOut','battlePartySwitchCmdHelp','_actor','VisuMZ_2_BattleSystemSTB','_lastIndex','assistSortPartyMembers','clear','drawItemImage','cancel','battlerName','Index','itemHeight','_subject','onReserveCancel','_inputting','EVAL','_spriteset','updateBattlePartySwitchCooldown','actor%1-stateIcon','uiMenuStyle','\x5cI[%1]%2','push','buttonAssistText4','startSwitchOutAnimation','drawActorPartyIconsHorz','selectActor','svbattler','skillItemWindowRectBorderStyle','isFTB','addActorToBattleMembersAtIndex','_partyMemberSwitchWindow','length','Scene_Battle_createActorCommandWindow','Game_Party_setupBattleTest','Empty','cursorVisible','ActiveBattlerOffsetY','VisuMZ_2_BattleSystemCTB','emptyPartyMember','charged','center','bitmap','155773GUqVtk','_statusPartyWindow','checkInitBattleMembers','parameters','trim','close','prototype','setupBattleTestMembers','onPartySwitchCancel','update','tpbImmediateAction','_actionBattlers','activate','commandStyle','battleLayoutStyle','createReservePartyLabel','refreshOG','_logWindow','quickSwap','_partySwitchDuration','addActor','isTpb','loadFaceImages','ceil','create','isTriggered','drawItemImageFace','setBackgroundType','textColor','Window_PartyCommand_updateHelp','Game_Battler_onBattleStart','drawItemDarkRect','partyChangeRefresh','Game_Actor_setup','ReserveBattlerOffsetX','Game_Battler_regenerateAll','addCommand','drawText','isNextScene','swapOrder','isTimeActive','_clickHandler','iconWidth','_battleMaxSize','addCustomCommands','faceWidth','_battleMembers','ActivePartyWindowBgType','max','paintOpacity','MovePartyIndexToReserve','itemRectWithPadding','terminate'];const _0x1ba7=function(_0x28e224,_0x4fed07){_0x28e224=_0x28e224-0xbf;let _0x217d27=_0x217d[_0x28e224];return _0x217d27;};const _0x1391e=_0x1ba7;(function(_0x43cf68,_0x45884a){const _0x5d8484=_0x1ba7;while(!![]){try{const _0x576f73=parseInt(_0x5d8484(0x177))*-parseInt(_0x5d8484(0x299))+parseInt(_0x5d8484(0x261))+-parseInt(_0x5d8484(0x1ab))+parseInt(_0x5d8484(0x12f))*parseInt(_0x5d8484(0x123))+-parseInt(_0x5d8484(0x189))+-parseInt(_0x5d8484(0x164))+parseInt(_0x5d8484(0x205));if(_0x576f73===_0x45884a)break;else _0x43cf68['push'](_0x43cf68['shift']());}catch(_0x56bb22){_0x43cf68['push'](_0x43cf68['shift']());}}}(_0x217d,0x750b9));var label=_0x1391e(0x151),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1391e(0xce)](function(_0x1d7f4f){const _0x17fc1b=_0x1391e;return _0x1d7f4f['status']&&_0x1d7f4f['description'][_0x17fc1b(0x183)]('['+label+']');})[0x0];VisuMZ[label][_0x1391e(0x201)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x1391e(0x168)]=function(_0x6a694b,_0x341bcb){const _0x82f8f8=_0x1391e;for(const _0x27a6a4 in _0x341bcb){if(_0x27a6a4[_0x82f8f8(0x1e7)](/(.*):(.*)/i)){const _0x5cf8a3=String(RegExp['$1']),_0x54554f=String(RegExp['$2'])[_0x82f8f8(0x159)]()[_0x82f8f8(0x265)]();let _0x12b490,_0x533aa9,_0x42bbc1;switch(_0x54554f){case'NUM':_0x12b490=_0x341bcb[_0x27a6a4]!==''?Number(_0x341bcb[_0x27a6a4]):0x0;break;case'ARRAYNUM':_0x533aa9=_0x341bcb[_0x27a6a4]!==''?JSON[_0x82f8f8(0x109)](_0x341bcb[_0x27a6a4]):[],_0x12b490=_0x533aa9[_0x82f8f8(0x1e8)](_0x4d66b5=>Number(_0x4d66b5));break;case _0x82f8f8(0x246):_0x12b490=_0x341bcb[_0x27a6a4]!==''?eval(_0x341bcb[_0x27a6a4]):null;break;case _0x82f8f8(0x194):_0x533aa9=_0x341bcb[_0x27a6a4]!==''?JSON[_0x82f8f8(0x109)](_0x341bcb[_0x27a6a4]):[],_0x12b490=_0x533aa9['map'](_0x32a3a7=>eval(_0x32a3a7));break;case _0x82f8f8(0x140):_0x12b490=_0x341bcb[_0x27a6a4]!==''?JSON[_0x82f8f8(0x109)](_0x341bcb[_0x27a6a4]):'';break;case'ARRAYJSON':_0x533aa9=_0x341bcb[_0x27a6a4]!==''?JSON[_0x82f8f8(0x109)](_0x341bcb[_0x27a6a4]):[],_0x12b490=_0x533aa9[_0x82f8f8(0x1e8)](_0x56a4b5=>JSON[_0x82f8f8(0x109)](_0x56a4b5));break;case _0x82f8f8(0x1a2):_0x12b490=_0x341bcb[_0x27a6a4]!==''?new Function(JSON[_0x82f8f8(0x109)](_0x341bcb[_0x27a6a4])):new Function('return\x200');break;case _0x82f8f8(0xe9):_0x533aa9=_0x341bcb[_0x27a6a4]!==''?JSON[_0x82f8f8(0x109)](_0x341bcb[_0x27a6a4]):[],_0x12b490=_0x533aa9[_0x82f8f8(0x1e8)](_0xaffd2f=>new Function(JSON[_0x82f8f8(0x109)](_0xaffd2f)));break;case _0x82f8f8(0x20c):_0x12b490=_0x341bcb[_0x27a6a4]!==''?String(_0x341bcb[_0x27a6a4]):'';break;case _0x82f8f8(0x119):_0x533aa9=_0x341bcb[_0x27a6a4]!==''?JSON['parse'](_0x341bcb[_0x27a6a4]):[],_0x12b490=_0x533aa9[_0x82f8f8(0x1e8)](_0x2bb0ce=>String(_0x2bb0ce));break;case _0x82f8f8(0x10d):_0x42bbc1=_0x341bcb[_0x27a6a4]!==''?JSON[_0x82f8f8(0x109)](_0x341bcb[_0x27a6a4]):{},_0x12b490=VisuMZ['ConvertParams']({},_0x42bbc1);break;case'ARRAYSTRUCT':_0x533aa9=_0x341bcb[_0x27a6a4]!==''?JSON[_0x82f8f8(0x109)](_0x341bcb[_0x27a6a4]):[],_0x12b490=_0x533aa9[_0x82f8f8(0x1e8)](_0x1e2c5b=>VisuMZ[_0x82f8f8(0x168)]({},JSON[_0x82f8f8(0x109)](_0x1e2c5b)));break;default:continue;}_0x6a694b[_0x5cf8a3]=_0x12b490;}}return _0x6a694b;},(_0x23d401=>{const _0x582469=_0x1391e,_0x1189c5=_0x23d401[_0x582469(0x118)];for(const _0x1e697c of dependencies){if(!Imported[_0x1e697c]){alert(_0x582469(0x29a)[_0x582469(0x181)](_0x1189c5,_0x1e697c)),SceneManager['exit']();break;}}const _0x1c68c6=_0x23d401['description'];if(_0x1c68c6['match'](/\[Version[ ](.*?)\]/i)){const _0x4a83c4=Number(RegExp['$1']);_0x4a83c4!==VisuMZ[label]['version']&&(alert(_0x582469(0xc2)[_0x582469(0x181)](_0x1189c5,_0x4a83c4)),SceneManager[_0x582469(0x193)]());}if(_0x1c68c6[_0x582469(0x1e7)](/\[Tier[ ](\d+)\]/i)){const _0x4146e1=Number(RegExp['$1']);_0x4146e1<tier?(alert(_0x582469(0xd1)['format'](_0x1189c5,_0x4146e1,tier)),SceneManager[_0x582469(0x193)]()):tier=Math[_0x582469(0x291)](_0x4146e1,tier);}VisuMZ[_0x582469(0x168)](VisuMZ[label][_0x582469(0x201)],_0x23d401[_0x582469(0x264)]);})(pluginData),PluginManager[_0x1391e(0x1ce)](pluginData['name'],'CallPartyScene',_0x2c3fe1=>{const _0x5a7647=_0x1391e;SceneManager[_0x5a7647(0x24c)](Scene_Party);}),PluginManager[_0x1391e(0x1ce)](pluginData['name'],_0x1391e(0x1f4),_0x3cb24f=>{const _0xec7b84=_0x1391e;if($gameParty[_0xec7b84(0x1c6)]())return;VisuMZ['ConvertParams'](_0x3cb24f,_0x3cb24f);const _0xe8f79e=_0x3cb24f[_0xec7b84(0x1fc)];$gameParty[_0xec7b84(0x229)](_0xe8f79e);}),PluginManager['registerCommand'](pluginData[_0x1391e(0x118)],_0x1391e(0xd3),_0x145551=>{const _0x12adfe=_0x1391e;if(!SceneManager[_0x12adfe(0x1a4)]())return;VisuMZ['ConvertParams'](_0x145551,_0x145551);const _0x328171=_0x145551[_0x12adfe(0x1aa)];for(const _0x191077 of _0x328171){$gameParty[_0x12adfe(0x152)](_0x191077);}$gamePlayer[_0x12adfe(0x21e)]();}),PluginManager['registerCommand'](pluginData[_0x1391e(0x118)],'MoveActorsToReserve',_0x365bd2=>{const _0x51c276=_0x1391e;if(!SceneManager[_0x51c276(0x1a4)]())return;VisuMZ[_0x51c276(0x168)](_0x365bd2,_0x365bd2);const _0xa215b2=_0x365bd2['Actors'];for(const _0x41bb5f of _0xa215b2){if($gameParty[_0x51c276(0x1b6)]()[_0x51c276(0x256)]<=0x1)break;$gameParty[_0x51c276(0x1f8)](_0x41bb5f);}$gamePlayer[_0x51c276(0x21e)]();}),PluginManager[_0x1391e(0x1ce)](pluginData[_0x1391e(0x118)],_0x1391e(0x293),_0x490717=>{const _0x3d4182=_0x1391e;if(!SceneManager[_0x3d4182(0x1a4)]())return;if($gameParty['battleMembers']()[_0x3d4182(0x256)]<=0x1)return;if(!$gameParty[_0x3d4182(0x28f)])return;if($gameParty[_0x3d4182(0x28f)][_0x3d4182(0x256)]<=0x0)return;VisuMZ['ConvertParams'](_0x490717,_0x490717);const _0xca198d=_0x490717[_0x3d4182(0x241)],_0xb10693=$gameParty[_0x3d4182(0x28f)][_0xca198d];$gameParty[_0x3d4182(0x1f8)](_0xb10693),$gamePlayer[_0x3d4182(0x21e)]();}),PluginManager[_0x1391e(0x1ce)](pluginData[_0x1391e(0x118)],_0x1391e(0xf8),_0x2fd7eb=>{const _0x1ca445=_0x1391e;if(!SceneManager[_0x1ca445(0x1a4)]())return;if($gameParty[_0x1ca445(0x1b6)]()[_0x1ca445(0x256)]>=$gameParty[_0x1ca445(0x11b)]())return;if($gameParty[_0x1ca445(0xfe)]()['length']<=0x0)return;const _0x52f2a8=$gameParty['reserveMembers'](),_0x14ebfb=_0x52f2a8[Math[_0x1ca445(0x218)](Math[_0x1ca445(0xd9)]()*_0x52f2a8['length'])],_0x16af75=_0x14ebfb[_0x1ca445(0x12c)]();$gameParty['addActorToBattleMembers'](_0x16af75),$gamePlayer['refresh']();}),PluginManager[_0x1391e(0x1ce)](pluginData['name'],_0x1391e(0xcc),_0x7899f3=>{const _0xe211dc=_0x1391e;VisuMZ[_0xe211dc(0x168)](_0x7899f3,_0x7899f3);const _0x2f9e20=_0x7899f3[_0xe211dc(0x1aa)][_0xe211dc(0x1e8)](_0x5a78e9=>$gameActors[_0xe211dc(0x231)](_0x5a78e9))[_0xe211dc(0xf1)](null),_0x392270=_0x7899f3[_0xe211dc(0x1be)];for(const _0x4e3809 of _0x2f9e20){if(!_0x4e3809)continue;_0x4e3809[_0xe211dc(0x1c3)](_0x392270);}}),PluginManager[_0x1391e(0x1ce)](pluginData[_0x1391e(0x118)],_0x1391e(0x134),_0x41a71b=>{const _0x28b141=_0x1391e;VisuMZ[_0x28b141(0x168)](_0x41a71b,_0x41a71b);const _0x4eeb05=_0x41a71b['Actors'][_0x28b141(0x1e8)](_0x2d9484=>$gameActors[_0x28b141(0x231)](_0x2d9484))[_0x28b141(0xf1)](null),_0x243be1=_0x41a71b['Require'];for(const _0x5bc7ec of _0x4eeb05){if(!_0x5bc7ec)continue;_0x5bc7ec['setPartyRequirement'](_0x243be1);}}),ImageManager[_0x1391e(0x12b)]=VisuMZ[_0x1391e(0x151)][_0x1391e(0x201)][_0x1391e(0x115)][_0x1391e(0x1c9)],ImageManager[_0x1391e(0xda)]=VisuMZ[_0x1391e(0x151)][_0x1391e(0x201)][_0x1391e(0x115)][_0x1391e(0xdc)],TextManager[_0x1391e(0x114)]=VisuMZ[_0x1391e(0x151)][_0x1391e(0x201)][_0x1391e(0x12e)][_0x1391e(0x196)],TextManager[_0x1391e(0x1ed)]=VisuMZ[_0x1391e(0x151)][_0x1391e(0x201)][_0x1391e(0x12e)]['ReserveParty'],TextManager[_0x1391e(0xea)]=VisuMZ[_0x1391e(0x151)][_0x1391e(0x201)]['Vocab'][_0x1391e(0x14e)],TextManager[_0x1391e(0x25d)]=VisuMZ[_0x1391e(0x151)][_0x1391e(0x201)]['Vocab'][_0x1391e(0x259)],TextManager[_0x1391e(0xfd)]=VisuMZ['PartySystem'][_0x1391e(0x201)][_0x1391e(0x12e)]['Remove'],TextManager['assistSwapPositions']=VisuMZ[_0x1391e(0x151)][_0x1391e(0x201)][_0x1391e(0x12e)][_0x1391e(0x13e)],TextManager['assistRemovePartyMember']=VisuMZ[_0x1391e(0x151)][_0x1391e(0x201)][_0x1391e(0x12e)]['AssistRemove'],TextManager[_0x1391e(0x23c)]=VisuMZ['PartySystem'][_0x1391e(0x201)][_0x1391e(0x12e)][_0x1391e(0x179)],TextManager['assistSwapInPartyMember']=VisuMZ['PartySystem'][_0x1391e(0x201)][_0x1391e(0x12e)][_0x1391e(0x117)],TextManager[_0x1391e(0x1b4)]=VisuMZ['PartySystem'][_0x1391e(0x201)]['Vocab'][_0x1391e(0x1db)],ColorManager[_0x1391e(0x20a)]=function(_0x58b0b5){const _0x57e449=_0x1391e;return _0x58b0b5=String(_0x58b0b5),_0x58b0b5['match'](/#(.*)/i)?_0x57e449(0x1ea)[_0x57e449(0x181)](String(RegExp['$1'])):this[_0x57e449(0x27d)](Number(_0x58b0b5));},SceneManager[_0x1391e(0x29e)]=function(){const _0x449209=_0x1391e;return this['_scene']&&this['_scene'][_0x449209(0x1f7)]===Scene_Party;},SceneManager[_0x1391e(0x1a4)]=function(){const _0x185a8a=_0x1391e;return this[_0x185a8a(0xc9)]&&this[_0x185a8a(0xc9)][_0x185a8a(0x1f7)]===Scene_Map;},VisuMZ['PartySystem'][_0x1391e(0x1ca)]=BattleManager['setup'],BattleManager[_0x1391e(0x235)]=function(_0x3ce7af,_0x81f7bb,_0xf27bc3){const _0x1e8199=_0x1391e;VisuMZ[_0x1e8199(0x151)][_0x1e8199(0x1ca)][_0x1e8199(0x128)](this,_0x3ce7af,_0x81f7bb,_0xf27bc3),$gameParty['clearPartyBattleCommandCooldown']();},VisuMZ[_0x1391e(0x151)][_0x1391e(0x27f)]=Game_Battler[_0x1391e(0x267)][_0x1391e(0x19a)],Game_Battler[_0x1391e(0x267)]['onBattleStart']=function(_0xdc5bb){const _0x13b472=_0x1391e;VisuMZ[_0x13b472(0x151)]['Game_Battler_onBattleStart'][_0x13b472(0x128)](this,_0xdc5bb);if(this[_0x13b472(0x11f)]())this[_0x13b472(0x116)]();},VisuMZ[_0x1391e(0x151)][_0x1391e(0x284)]=Game_Battler[_0x1391e(0x267)][_0x1391e(0x186)],Game_Battler[_0x1391e(0x267)][_0x1391e(0x186)]=function(){const _0x1bba50=_0x1391e;VisuMZ[_0x1bba50(0x151)][_0x1bba50(0x284)][_0x1bba50(0x128)](this);if(this['isActor']())this[_0x1bba50(0x248)]();},VisuMZ[_0x1391e(0x151)][_0x1391e(0x282)]=Game_Actor[_0x1391e(0x267)]['setup'],Game_Actor[_0x1391e(0x267)][_0x1391e(0x235)]=function(_0x29b9ad){const _0x250f7c=_0x1391e;VisuMZ[_0x250f7c(0x151)][_0x250f7c(0x282)][_0x250f7c(0x128)](this,_0x29b9ad),this[_0x250f7c(0x16a)](),this['clearPartySwitchCommandCooldown']();},Game_Actor['prototype'][_0x1391e(0x16a)]=function(){const _0x5ba969=_0x1391e;this[_0x5ba969(0x198)]=![],this['_partyRequired']=![];},Game_Actor['prototype'][_0x1391e(0x184)]=function(){const _0xed81b=_0x1391e;if(this[_0xed81b(0x198)]===undefined)this[_0xed81b(0x16a)]();return!this['_partyLocked'];},Game_Actor[_0x1391e(0x267)][_0x1391e(0x1c3)]=function(_0x30d1c6){const _0x54a8dd=_0x1391e;if(this[_0x54a8dd(0x198)]===undefined)this[_0x54a8dd(0x16a)]();this[_0x54a8dd(0x198)]=_0x30d1c6;},Game_Actor[_0x1391e(0x267)][_0x1391e(0x1ff)]=function(){const _0x2dd180=_0x1391e;if(this['_partyRequired']===undefined)this[_0x2dd180(0x16a)]();return this[_0x2dd180(0xe1)];},Game_Actor['prototype']['setPartyRequirement']=function(_0x1bbb1a){const _0x582532=_0x1391e;if(this[_0x582532(0xe1)]===undefined)this['initPartySystem']();this[_0x582532(0xe1)]=_0x1bbb1a;},Game_Actor[_0x1391e(0x267)][_0x1391e(0x116)]=function(){const _0xa69e07=_0x1391e;this[_0xa69e07(0x110)]=0x0;},Game_Actor['prototype'][_0x1391e(0x20d)]=function(){const _0x59e026=_0x1391e;if(this['_partySwitchBattleCommandCooldown']===undefined)this[_0x59e026(0x116)]();if(!this[_0x59e026(0x184)]())return![];if(this[_0x59e026(0x1ff)]())return![];return this[_0x59e026(0x110)]<=0x0;},Game_Actor[_0x1391e(0x267)][_0x1391e(0x207)]=function(){const _0x406951=_0x1391e;if(this[_0x406951(0x110)]===undefined)this[_0x406951(0x116)]();return this[_0x406951(0x110)];},Game_Actor[_0x1391e(0x267)][_0x1391e(0x1e0)]=function(_0x559ffe){const _0x2ecea7=_0x1391e;if(this['_partySwitchBattleCommandCooldown']===undefined)this[_0x2ecea7(0x116)]();this[_0x2ecea7(0x110)]=_0x559ffe||0x0;},Game_Actor[_0x1391e(0x267)][_0x1391e(0x298)]=function(){const _0x8f62e7=_0x1391e;if(this[_0x8f62e7(0x110)]===undefined)this[_0x8f62e7(0x116)]();const _0x1173b3=VisuMZ[_0x8f62e7(0x151)]['Settings'][_0x8f62e7(0x115)][_0x8f62e7(0x17b)];this[_0x8f62e7(0x1e0)](_0x1173b3);},Game_Actor[_0x1391e(0x267)][_0x1391e(0x248)]=function(){const _0x269ec4=_0x1391e;if(this['_partySwitchBattleCommandCooldown']===undefined)this[_0x269ec4(0x116)]();this[_0x269ec4(0x110)]--;},Game_Actor[_0x1391e(0x267)][_0x1391e(0x1ee)]=function(_0x10ea18){const _0x5500c3=_0x1391e;Imported[_0x5500c3(0x25c)]&&BattleManager['isCTB']()&&BattleManager[_0x5500c3(0x1bb)]();Imported[_0x5500c3(0x23a)]&&BattleManager[_0x5500c3(0x158)]()&&(BattleManager[_0x5500c3(0x131)](),BattleManager[_0x5500c3(0x243)]=this,BattleManager[_0x5500c3(0xc0)]=this);if(Imported[_0x5500c3(0x1d6)]&&BattleManager['isBTB']()){BattleManager[_0x5500c3(0x243)]=undefined,BattleManager[_0x5500c3(0xc0)]=this;const _0x47222e=BattleManager[_0x5500c3(0x26c)]['indexOf'](_0x10ea18);BattleManager[_0x5500c3(0x26c)][_0x47222e]=this,BattleManager[_0x5500c3(0x137)]();}Imported['VisuMZ_2_BattleSystemFTB']&&BattleManager[_0x5500c3(0x253)]()&&(BattleManager[_0x5500c3(0x243)]=this,BattleManager[_0x5500c3(0xc0)]=this);},VisuMZ['PartySystem'][_0x1391e(0xbf)]=Game_Unit[_0x1391e(0x267)][_0x1391e(0x1c6)],Game_Unit[_0x1391e(0x267)][_0x1391e(0x1c6)]=function(){const _0x278209=_0x1391e;if(SceneManager[_0x278209(0x29e)]())return![];return VisuMZ[_0x278209(0x151)][_0x278209(0xbf)][_0x278209(0x128)](this);},Game_Party[_0x1391e(0x22c)]=VisuMZ[_0x1391e(0x151)][_0x1391e(0x201)][_0x1391e(0x115)][_0x1391e(0x1ef)],VisuMZ['PartySystem'][_0x1391e(0xd2)]=Game_Party[_0x1391e(0x267)][_0x1391e(0xfc)],Game_Party[_0x1391e(0x267)][_0x1391e(0xfc)]=function(){const _0x3aef9d=_0x1391e;VisuMZ[_0x3aef9d(0x151)][_0x3aef9d(0xd2)]['call'](this),this['clearPartyBattleCommandCooldown'](),this[_0x3aef9d(0x13a)](),this[_0x3aef9d(0x155)]();},Game_Party[_0x1391e(0x267)][_0x1391e(0x130)]=function(){this['_partySystemBattleCommandCooldown']=0x0;},Game_Party[_0x1391e(0x267)][_0x1391e(0x20d)]=function(){const _0x118367=_0x1391e;if(this[_0x118367(0x212)]===undefined)this[_0x118367(0x130)]();return this[_0x118367(0x212)]<=0x0;},Game_Party[_0x1391e(0x267)][_0x1391e(0x207)]=function(){const _0x20bee3=_0x1391e;if(this['_partySystemBattleCommandCooldown']===undefined)this['clearPartyBattleCommandCooldown']();return this[_0x20bee3(0x212)];},Game_Party[_0x1391e(0x267)]['setBattlePartySwitchCooldown']=function(_0x2fb536){const _0x523264=_0x1391e;if(this['_partySystemBattleCommandCooldown']===undefined)this['clearPartyBattleCommandCooldown']();this[_0x523264(0x212)]=_0x2fb536;},Game_Party[_0x1391e(0x267)][_0x1391e(0x298)]=function(){const _0x449c93=_0x1391e;if(this[_0x449c93(0x212)]===undefined)this[_0x449c93(0x130)]();this['_partySystemBattleCommandCooldown']=VisuMZ[_0x449c93(0x151)][_0x449c93(0x201)][_0x449c93(0x115)]['PartyCmdCooldown']||0x0;},Game_Party[_0x1391e(0x267)][_0x1391e(0x248)]=function(){const _0x3d4442=_0x1391e;if(this[_0x3d4442(0x212)]===undefined)this['clearPartyBattleCommandCooldown']();this[_0x3d4442(0x212)]--;},Game_Party[_0x1391e(0x267)][_0x1391e(0x13a)]=function(){const _0x5f25ff=_0x1391e;this[_0x5f25ff(0x28c)]=0x0;},Game_Party[_0x1391e(0x267)]['changeMaxBattleMembers']=function(_0x37ff96){const _0x4cc0cd=_0x1391e;this[_0x4cc0cd(0x28c)]=_0x37ff96,this['initBattleMembers'](!![]),$gamePlayer&&$gamePlayer[_0x4cc0cd(0x178)]()&&$gamePlayer[_0x4cc0cd(0x178)]()[_0x4cc0cd(0x229)]();},Game_Followers[_0x1391e(0x267)]['changeMaxBattleMembers']=function(){const _0x5d78be=_0x1391e;if(!SceneManager['isSceneMap']())return;this['setup']();const _0x1db855=$gameMap[_0x5d78be(0x29f)](),_0x699366=$gamePlayer['x'],_0x5e0797=$gamePlayer['y'],_0x4df242=$gamePlayer[_0x5d78be(0x133)]();$gameTemp[_0x5d78be(0x19f)]=!![],$gamePlayer[_0x5d78be(0x16e)](_0x1db855,_0x699366,_0x5e0797,_0x4df242,0x0),setTimeout(this[_0x5d78be(0xed)][_0x5d78be(0x1f6)](this),0x7d0);},Game_Followers[_0x1391e(0x267)]['clearBypassAutoSave']=function(){const _0x3be778=_0x1391e;$gameTemp[_0x3be778(0x19f)]=![];},VisuMZ[_0x1391e(0x151)]['Scene_Base_isAutosaveEnabled']=Scene_Base['prototype'][_0x1391e(0xf3)],Scene_Base[_0x1391e(0x267)]['isAutosaveEnabled']=function(){const _0x346107=_0x1391e;if($gameTemp[_0x346107(0x19f)])return![];return VisuMZ[_0x346107(0x151)][_0x346107(0x111)][_0x346107(0x128)](this);},Game_Party['prototype']['maxBattleMembers']=function(){const _0x2cf3ed=_0x1391e;if(this[_0x2cf3ed(0x28c)]===undefined)this['initBattleMembers']();return this[_0x2cf3ed(0x28c)]||Game_Party[_0x2cf3ed(0x22c)];},Game_Party[_0x1391e(0x267)][_0x1391e(0x263)]=function(){const _0x2e1ba5=_0x1391e;if(this[_0x2e1ba5(0x28c)]===undefined)this[_0x2e1ba5(0x155)]();if(!this['_battleMembers'])this['initBattleMembers']();while(this['_battleMembers'][_0x2e1ba5(0x256)]<this[_0x2e1ba5(0x28c)]){this[_0x2e1ba5(0x28f)][_0x2e1ba5(0x24c)](0x0);}},Game_Party[_0x1391e(0x267)][_0x1391e(0x155)]=function(_0x1dc6ca){const _0x1ce1a1=_0x1391e;!_0x1dc6ca&&(this[_0x1ce1a1(0x28c)]=Game_Party[_0x1ce1a1(0x22c)]);this[_0x1ce1a1(0x28f)]=this['_actors']['slice'](0x0,this['_battleMaxSize']);while(this[_0x1ce1a1(0x28f)][_0x1ce1a1(0x256)]<this[_0x1ce1a1(0x28c)]){this['_battleMembers']['push'](0x0);}if($gamePlayer)$gamePlayer[_0x1ce1a1(0x21e)]();},Game_Party[_0x1391e(0x267)]['battleMembers']=function(){const _0x4115ba=_0x1391e;return this[_0x4115ba(0x1cb)]()[_0x4115ba(0xce)](_0x73958a=>!!_0x73958a);},Game_Party[_0x1391e(0x267)][_0x1391e(0x1cb)]=function(){const _0x5c5328=_0x1391e;this[_0x5c5328(0x263)]();const _0x5165bc=this['_battleMembers'][_0x5c5328(0x1e8)](_0x50554d=>$gameActors[_0x5c5328(0x231)](_0x50554d));return SceneManager['isSceneParty']()?_0x5165bc:_0x5165bc[_0x5c5328(0xce)](_0x4fe219=>_0x4fe219&&_0x4fe219[_0x5c5328(0xd5)]());},Game_Party[_0x1391e(0x267)][_0x1391e(0xfe)]=function(){const _0x101555=_0x1391e,_0x39a039=this[_0x101555(0x1b6)]();return this[_0x101555(0x149)]()[_0x101555(0xce)](_0x287f17=>!_0x39a039[_0x101555(0x183)](_0x287f17));},VisuMZ['PartySystem'][_0x1391e(0x153)]=Game_Party[_0x1391e(0x267)][_0x1391e(0x22e)],Game_Party['prototype']['setupStartingMembers']=function(){const _0x20e856=_0x1391e;VisuMZ[_0x20e856(0x151)][_0x20e856(0x153)][_0x20e856(0x128)](this),this[_0x20e856(0x155)]();},VisuMZ[_0x1391e(0x151)][_0x1391e(0x258)]=Game_Party[_0x1391e(0x267)][_0x1391e(0x1ad)],Game_Party[_0x1391e(0x267)][_0x1391e(0x1ad)]=function(){const _0x5ae254=_0x1391e;VisuMZ[_0x5ae254(0x151)][_0x5ae254(0x258)][_0x5ae254(0x128)](this),this['addNonBattleTestMembers']();},Game_Party['prototype'][_0x1391e(0x268)]=function(){const _0x746173=_0x1391e;this[_0x746173(0x28c)]=Game_Party[_0x746173(0x22c)],this[_0x746173(0x28f)]=[],this['_actors']=[];for(const _0x1cc835 of $dataSystem['testBattlers']){const _0xdc0c3a=$gameActors[_0x746173(0x231)](_0x1cc835[_0x746173(0x12c)]);if(!_0xdc0c3a)continue;_0xdc0c3a['changeLevel'](_0x1cc835[_0x746173(0x1bc)],![]),_0xdc0c3a[_0x746173(0x121)](_0x1cc835['equips']),_0xdc0c3a[_0x746173(0x154)](),this[_0x746173(0x28f)][_0x746173(0x24c)](_0x1cc835[_0x746173(0x12c)]),this[_0x746173(0x100)][_0x746173(0x24c)](_0x1cc835[_0x746173(0x12c)]);}while(this['_battleMembers'][_0x746173(0x256)]<this[_0x746173(0x28c)]){this[_0x746173(0x28f)][_0x746173(0x24c)](0x0);}while(this[_0x746173(0x28f)][_0x746173(0x256)]>this[_0x746173(0x11b)]()){this[_0x746173(0x28f)][_0x746173(0x1bf)]();}if($gamePlayer)$gamePlayer[_0x746173(0x21e)]();},Game_Party[_0x1391e(0x267)][_0x1391e(0x213)]=function(){const _0x4a267f=_0x1391e,_0x55a0cb=this[_0x4a267f(0x1b6)]();for(let _0x3944b0=0x1;_0x3944b0<$dataActors[_0x4a267f(0x256)];_0x3944b0++){const _0x7959fe=$gameActors[_0x4a267f(0x231)](_0x3944b0);if(!_0x7959fe)continue;if(_0x7959fe['name']()['length']<=0x0)continue;if(_0x7959fe[_0x4a267f(0x118)]()['match'](/-----/i))continue;if(_0x55a0cb[_0x4a267f(0x183)](_0x7959fe))continue;this[_0x4a267f(0x100)]['push'](_0x7959fe[_0x4a267f(0x12c)]());}},VisuMZ[_0x1391e(0x151)][_0x1391e(0x220)]=Game_Party[_0x1391e(0x267)][_0x1391e(0x275)],Game_Party[_0x1391e(0x267)][_0x1391e(0x275)]=function(_0x13f1ed){const _0x3dccf4=_0x1391e;VisuMZ['PartySystem']['Game_Party_addActor'][_0x3dccf4(0x128)](this,_0x13f1ed),this[_0x3dccf4(0x152)](_0x13f1ed);},Game_Party[_0x1391e(0x267)][_0x1391e(0x152)]=function(_0x53cd95){const _0x3e2c6d=_0x1391e;this[_0x3e2c6d(0x263)]();if(this['_battleMembers']['includes'](_0x53cd95))return;if(!this[_0x3e2c6d(0x100)]['includes'](_0x53cd95))return;if(!this[_0x3e2c6d(0x28f)]['includes'](0x0))return;const _0x1da4cc=$gameActors[_0x3e2c6d(0x231)](_0x53cd95);if(!_0x1da4cc)return;const _0x3d33e7=this[_0x3e2c6d(0x28f)]['indexOf'](0x0);if(_0x3d33e7<0x0)return;this['_battleMembers'][_0x3d33e7]=_0x53cd95,_0x1da4cc[_0x3e2c6d(0x1b3)](),this[_0x3e2c6d(0x281)]();},Game_Party[_0x1391e(0x267)][_0x1391e(0x254)]=function(_0x558419,_0x17dcff){const _0xd4a885=_0x1391e;this[_0xd4a885(0x263)]();if(this[_0xd4a885(0x28f)][_0xd4a885(0x183)](_0x558419))return;if(!this['_battleMembers'][_0xd4a885(0x183)](0x0))return;const _0x46ad87=$gameActors['actor'](_0x558419);if(!_0x46ad87)return;this['_battleMembers'][_0x17dcff]=_0x558419,_0x46ad87[_0xd4a885(0x1b3)](),this[_0xd4a885(0x281)]();},VisuMZ[_0x1391e(0x151)][_0x1391e(0xd8)]=Game_Party['prototype'][_0x1391e(0x223)],Game_Party[_0x1391e(0x267)][_0x1391e(0x223)]=function(_0x5cabad){const _0x537f3f=_0x1391e;this[_0x537f3f(0x1f8)](_0x5cabad),VisuMZ[_0x537f3f(0x151)]['Game_Party_removeActor'][_0x537f3f(0x128)](this,_0x5cabad);},Game_Party[_0x1391e(0x267)]['removeActorFromBattleMembers']=function(_0x8c3683){const _0x273e91=_0x1391e;this[_0x273e91(0x263)]();if(!this[_0x273e91(0x28f)]['includes'](_0x8c3683))return;if(_0x8c3683<=0x0)return;const _0xe264b3=this[_0x273e91(0x28f)][_0x273e91(0x1a1)](_0x8c3683);this['_battleMembers'][_0xe264b3]=0x0,this[_0x273e91(0x100)][_0x273e91(0xf1)](_0x8c3683),this[_0x273e91(0x100)]['push'](_0x8c3683),this[_0x273e91(0x281)]();},Game_Party[_0x1391e(0x267)][_0x1391e(0x281)]=function(){const _0x544af2=_0x1391e;this[_0x544af2(0x17f)](),$gamePlayer['refresh'](),$gameMap['requestRefresh']();},Game_Party['prototype']['rearrangePartyActors']=function(){const _0x292107=_0x1391e;this[_0x292107(0x263)]();const _0x1b4319=this[_0x292107(0x1b6)]()['concat'](this[_0x292107(0xfe)]());this[_0x292107(0x100)]=_0x1b4319[_0x292107(0x1e8)](_0xbbacf5=>_0xbbacf5?_0xbbacf5['actorId']():0x0)[_0x292107(0xf1)](0x0);},Game_Party[_0x1391e(0x267)][_0x1391e(0x11e)]=function(){const _0x44407b=_0x1391e;this[_0x44407b(0x100)][_0x44407b(0x11d)]((_0x1542f3,_0x5a4b6a)=>_0x1542f3-_0x5a4b6a),this[_0x44407b(0x17f)](),this[_0x44407b(0x281)]();},Game_Party[_0x1391e(0x267)][_0x1391e(0xd4)]=function(){const _0x4b6ac7=_0x1391e;for(const _0x4749d7 of this[_0x4b6ac7(0xfe)]()){if(!_0x4749d7)continue;if(_0x4749d7[_0x4b6ac7(0x1ff)]())return!![];}return![];},VisuMZ[_0x1391e(0x151)][_0x1391e(0x1fd)]=Game_Party['prototype'][_0x1391e(0x288)],Game_Party[_0x1391e(0x267)][_0x1391e(0x288)]=function(_0x22bd7c,_0x387395){const _0x5e7b3c=_0x1391e;VisuMZ[_0x5e7b3c(0x151)][_0x5e7b3c(0x1fd)][_0x5e7b3c(0x128)](this,_0x22bd7c,_0x387395),this[_0x5e7b3c(0xc8)](_0x22bd7c,_0x387395);},Game_Party[_0x1391e(0x267)][_0x1391e(0xc8)]=function(_0x6a604d,_0x3ffbe9){const _0x5bf05e=_0x1391e;this[_0x5bf05e(0x28f)]=[];for(let _0xb28215=0x0;_0xb28215<this[_0x5bf05e(0x100)][_0x5bf05e(0x256)];_0xb28215++){if(this[_0x5bf05e(0x28f)][_0x5bf05e(0x256)]>=this[_0x5bf05e(0x11b)]())break;this[_0x5bf05e(0x28f)][_0xb28215]=this[_0x5bf05e(0x100)][_0xb28215];}$gamePlayer[_0x5bf05e(0x21e)]();},VisuMZ[_0x1391e(0x151)][_0x1391e(0x157)]=Game_Troop[_0x1391e(0x267)][_0x1391e(0x139)],Game_Troop[_0x1391e(0x267)][_0x1391e(0x139)]=function(){const _0x234b08=_0x1391e;VisuMZ[_0x234b08(0x151)]['Game_Troop_increaseTurn']['call'](this),$gameParty[_0x234b08(0x248)]();},Scene_Menu['prototype'][_0x1391e(0x175)]=function(){const _0xc3cb6a=_0x1391e;SceneManager[_0xc3cb6a(0x24c)](Scene_Party);};function Scene_Party(){const _0x5ab661=_0x1391e;this[_0x5ab661(0xfc)](...arguments);}Scene_Party[_0x1391e(0x267)]=Object[_0x1391e(0x279)](Scene_MenuBase[_0x1391e(0x267)]),Scene_Party[_0x1391e(0x267)][_0x1391e(0x1f7)]=Scene_Party,Scene_Party[_0x1391e(0x267)][_0x1391e(0xfc)]=function(){const _0x311c1b=_0x1391e;this['loadPartyImages'](),Scene_MenuBase[_0x311c1b(0x267)][_0x311c1b(0xfc)][_0x311c1b(0x128)](this);},Scene_Party[_0x1391e(0x267)][_0x1391e(0x1dc)]=function(){const _0x1f9ae9=_0x1391e;if(ConfigManager[_0x1f9ae9(0x24a)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x1f9ae9(0x18f)];else return ConfigManager[_0x1f9ae9(0x24a)]===![]?![]:Scene_MenuBase[_0x1f9ae9(0x267)][_0x1f9ae9(0x1dc)][_0x1f9ae9(0x128)](this);},Scene_Party[_0x1391e(0x267)]['helpAreaHeight']=function(){return 0x0;},Scene_Party[_0x1391e(0x267)]['needsPageButtons']=function(){return!![];},Scene_Party['prototype'][_0x1391e(0x29b)]=function(){const _0x231052=_0x1391e;Scene_MenuBase[_0x231052(0x267)][_0x231052(0x29b)][_0x231052(0x128)](this),this[_0x231052(0x21b)][_0x231052(0x28a)]=undefined,this['_pagedownButton'][_0x231052(0x28a)]=undefined;},Scene_Party[_0x1391e(0x267)][_0x1391e(0x145)]=function(){const _0x11da59=_0x1391e;for(const _0x564761 of $gameParty['members']()){ImageManager[_0x11da59(0x191)](_0x564761[_0x11da59(0x214)]()),ImageManager[_0x11da59(0x221)](_0x564761[_0x11da59(0x1af)]()),ImageManager[_0x11da59(0x217)](_0x564761['battlerName']());}},Scene_Party[_0x1391e(0x267)]['create']=function(){const _0x967c19=_0x1391e;Scene_MenuBase[_0x967c19(0x267)]['create'][_0x967c19(0x128)](this),this[_0x967c19(0x22d)](),this['createActivePartyWindow'](),this[_0x967c19(0x270)](),this[_0x967c19(0x124)](),this[_0x967c19(0xf9)](),this[_0x967c19(0x228)]();},Scene_Party[_0x1391e(0x267)][_0x1391e(0x22d)]=function(){const _0x3bbfb6=_0x1391e,_0x4b7c8a=this['activePartyLabelRect']();this['_activePartyLabel']=new Window_PartyLabel(_0x4b7c8a,TextManager[_0x3bbfb6(0x114)]),this[_0x3bbfb6(0x19c)][_0x3bbfb6(0x27c)](VisuMZ[_0x3bbfb6(0x151)][_0x3bbfb6(0x201)][_0x3bbfb6(0x227)]['ActivePartyLabelBgType']),this[_0x3bbfb6(0x1da)](this[_0x3bbfb6(0x19c)]);},Scene_Party[_0x1391e(0x267)][_0x1391e(0x19e)]=function(){const _0x152f85=_0x1391e;return VisuMZ[_0x152f85(0x151)][_0x152f85(0x201)][_0x152f85(0x227)][_0x152f85(0x14c)][_0x152f85(0x128)](this);},Scene_Party[_0x1391e(0x267)][_0x1391e(0x1d1)]=function(){const _0x56a77a=_0x1391e,_0x47143a=this[_0x56a77a(0x16d)]();this['_activePartyWindow']=new Window_PartyActive(_0x47143a),this[_0x56a77a(0x203)][_0x56a77a(0x27c)](VisuMZ['PartySystem'][_0x56a77a(0x201)]['Window'][_0x56a77a(0x290)]),this[_0x56a77a(0x203)][_0x56a77a(0x1df)]('ok',this['onActiveOk'][_0x56a77a(0x1f6)](this)),this['_activePartyWindow'][_0x56a77a(0x1df)](_0x56a77a(0x23f),this[_0x56a77a(0x202)][_0x56a77a(0x1f6)](this)),this[_0x56a77a(0x1da)](this[_0x56a77a(0x203)]);},Scene_Party[_0x1391e(0x267)][_0x1391e(0x16d)]=function(){const _0x3f9130=_0x1391e;return VisuMZ[_0x3f9130(0x151)]['Settings'][_0x3f9130(0x227)]['ActivePartyWindowRect'][_0x3f9130(0x128)](this);},Scene_Party[_0x1391e(0x267)][_0x1391e(0x10c)]=function(){const _0xe1449e=_0x1391e;this['_reservePartyWindow'][_0xe1449e(0x26d)](),this[_0xe1449e(0x12d)][_0xe1449e(0xc1)]();},Scene_Party[_0x1391e(0x267)][_0x1391e(0x270)]=function(){const _0x18547d=_0x1391e,_0x2baa46=this[_0x18547d(0x1e1)]();this['_reservePartyLabel']=new Window_PartyLabel(_0x2baa46,TextManager[_0x18547d(0x1ed)]),this[_0x18547d(0xfa)][_0x18547d(0x27c)](VisuMZ[_0x18547d(0x151)][_0x18547d(0x201)]['Window'][_0x18547d(0x10f)]),this[_0x18547d(0x1da)](this[_0x18547d(0xfa)]);},Scene_Party[_0x1391e(0x267)][_0x1391e(0x1e1)]=function(){const _0x238d15=_0x1391e;return VisuMZ[_0x238d15(0x151)][_0x238d15(0x201)]['Window'][_0x238d15(0xe2)][_0x238d15(0x128)](this);},Scene_Party['prototype'][_0x1391e(0x124)]=function(){const _0x1ea62c=_0x1391e,_0x35c7d8=this[_0x1ea62c(0x174)]();this['_reservePartyWindow']=new Window_PartyReserve(_0x35c7d8),this[_0x1ea62c(0x12d)][_0x1ea62c(0x27c)](VisuMZ[_0x1ea62c(0x151)][_0x1ea62c(0x201)][_0x1ea62c(0x227)][_0x1ea62c(0x1e6)]),this['_reservePartyWindow'][_0x1ea62c(0x1df)]('ok',this[_0x1ea62c(0x230)][_0x1ea62c(0x1f6)](this)),this[_0x1ea62c(0x12d)][_0x1ea62c(0x1df)](_0x1ea62c(0x23f),this[_0x1ea62c(0x244)][_0x1ea62c(0x1f6)](this)),this['addWindow'](this[_0x1ea62c(0x12d)]);},Scene_Party[_0x1391e(0x267)][_0x1391e(0x174)]=function(){const _0x13d159=_0x1391e;return VisuMZ[_0x13d159(0x151)][_0x13d159(0x201)][_0x13d159(0x227)]['ReservePartyWindowRect'][_0x13d159(0x128)](this);},Scene_Party['prototype']['onReserveOk']=function(){const _0x576d98=_0x1391e,_0x4cc284=this[_0x576d98(0x12d)][_0x576d98(0x195)](),_0x1655fd=this[_0x576d98(0x203)][_0x576d98(0x1de)]();if(_0x4cc284<0x0){if(_0x1655fd)$gameParty[_0x576d98(0x1f8)](_0x1655fd[_0x576d98(0x12c)]());}else{const _0x3cd8aa=this['_reservePartyWindow'][_0x576d98(0x1de)]()['actorId'](),_0x5e482c=this[_0x576d98(0x203)][_0x576d98(0x1b2)]();if(_0x1655fd)$gameParty[_0x576d98(0x1f8)](_0x1655fd['actorId']());$gameParty[_0x576d98(0x254)](_0x3cd8aa,_0x5e482c);}this['refreshAllWindows'](),this['onReserveCancel']();},Scene_Party[_0x1391e(0x267)][_0x1391e(0x165)]=function(){const _0x382ce3=_0x1391e;this[_0x382ce3(0x203)][_0x382ce3(0x21e)](),this[_0x382ce3(0x12d)]['refresh']();},Scene_Party[_0x1391e(0x267)][_0x1391e(0x244)]=function(){const _0x582ee0=_0x1391e;this[_0x582ee0(0x12d)][_0x582ee0(0xe7)](),this['_reservePartyWindow'][_0x582ee0(0x10a)](),this[_0x582ee0(0x203)][_0x582ee0(0x26d)]();},Scene_Party['prototype'][_0x1391e(0xf9)]=function(){const _0x3345fb=_0x1391e,_0xe00d49=this[_0x3345fb(0x14b)]();this['_statusPartyLabel']=new Window_PartyLabel(_0xe00d49,TextManager[_0x3345fb(0xea)]),this['_statusPartyLabel'][_0x3345fb(0x27c)](VisuMZ[_0x3345fb(0x151)][_0x3345fb(0x201)]['Window'][_0x3345fb(0x22f)]),this[_0x3345fb(0x1da)](this[_0x3345fb(0x13f)]);},Scene_Party[_0x1391e(0x267)][_0x1391e(0x14b)]=function(){const _0x5a87a3=_0x1391e;return VisuMZ[_0x5a87a3(0x151)][_0x5a87a3(0x201)][_0x5a87a3(0x227)][_0x5a87a3(0x1f9)][_0x5a87a3(0x128)](this);},Scene_Party[_0x1391e(0x267)][_0x1391e(0x228)]=function(){const _0x475da9=_0x1391e,_0x28509a=this[_0x475da9(0x21a)]();this[_0x475da9(0x262)]=new Window_PartyStatus(_0x28509a),this['_statusPartyWindow'][_0x475da9(0x27c)](VisuMZ[_0x475da9(0x151)]['Settings'][_0x475da9(0x227)][_0x475da9(0xe5)]),this[_0x475da9(0x1da)](this[_0x475da9(0x262)]),this[_0x475da9(0x12d)]['setStatusWindow'](this[_0x475da9(0x262)]),this[_0x475da9(0x203)][_0x475da9(0x19b)](this['_statusPartyWindow']);},Scene_Party['prototype']['statusWindowRect']=function(){const _0x26bd53=_0x1391e;return VisuMZ['PartySystem']['Settings'][_0x26bd53(0x227)]['StatusWindowRect'][_0x26bd53(0x128)](this);},Scene_Party['prototype'][_0x1391e(0x14f)]=function(){const _0x4f00c=_0x1391e;return TextManager['getInputButtonString'](_0x4f00c(0xe6));},Scene_Party[_0x1391e(0x267)]['buttonAssistText1']=function(){const _0x5b7f78=_0x1391e;return TextManager[_0x5b7f78(0x225)];},Scene_Party['prototype'][_0x1391e(0x107)]=function(){const _0x361087=_0x1391e,_0x5af79e=this['_activePartyWindow'],_0x378231=this[_0x361087(0x12d)];if(_0x5af79e&&_0x5af79e['active']&&_0x5af79e[_0x361087(0x1de)]()&&_0x5af79e[_0x361087(0x161)]())return TextManager['assistRemovePartyMember'];else return _0x378231&&_0x378231[_0x361087(0x16c)]&&$gameParty[_0x361087(0xfe)]()[_0x361087(0x256)]>0x0?TextManager[_0x361087(0x23c)]:'';},Scene_Party[_0x1391e(0x267)][_0x1391e(0x24d)]=function(){const _0x3f9587=_0x1391e;if(this[_0x3f9587(0x203)]&&this[_0x3f9587(0x203)]['active'])return TextManager[_0x3f9587(0x1b4)];else return this[_0x3f9587(0x12d)]&&this[_0x3f9587(0x12d)][_0x3f9587(0x16c)]?TextManager[_0x3f9587(0x1ec)]:Scene_MenuBase[_0x3f9587(0x267)][_0x3f9587(0x24d)]['call'](this);},Scene_Party[_0x1391e(0x267)]['createBackground']=function(){const _0x499f93=_0x1391e;Scene_MenuBase[_0x499f93(0x267)][_0x499f93(0x216)][_0x499f93(0x128)](this),this['setBackgroundOpacity'](this[_0x499f93(0x1cf)]()),this[_0x499f93(0xf2)]();},Scene_Party[_0x1391e(0x267)]['getBackgroundOpacity']=function(){const _0xa8d614=_0x1391e;return VisuMZ[_0xa8d614(0x151)]['Settings'][_0xa8d614(0x14a)]['SnapshotOpacity'];},Scene_Party[_0x1391e(0x267)]['createCustomBackgroundImages']=function(){const _0x3f81a4=_0x1391e,_0xe749ff={'BgFilename1':VisuMZ[_0x3f81a4(0x151)][_0x3f81a4(0x201)][_0x3f81a4(0x14a)]['BgFilename1'],'BgFilename2':VisuMZ[_0x3f81a4(0x151)][_0x3f81a4(0x201)][_0x3f81a4(0x14a)]['BgFilename2']};_0xe749ff&&(_0xe749ff[_0x3f81a4(0x113)]!==''||_0xe749ff[_0x3f81a4(0x19d)]!=='')&&(this[_0x3f81a4(0x1f2)]=new Sprite(ImageManager[_0x3f81a4(0x167)](_0xe749ff[_0x3f81a4(0x113)])),this[_0x3f81a4(0x126)]=new Sprite(ImageManager[_0x3f81a4(0xee)](_0xe749ff[_0x3f81a4(0x19d)])),this[_0x3f81a4(0xfb)](this['_backSprite1']),this[_0x3f81a4(0xfb)](this[_0x3f81a4(0x126)]),this[_0x3f81a4(0x1f2)][_0x3f81a4(0x260)][_0x3f81a4(0x101)](this[_0x3f81a4(0x1c8)]['bind'](this,this[_0x3f81a4(0x1f2)])),this[_0x3f81a4(0x126)][_0x3f81a4(0x260)][_0x3f81a4(0x101)](this[_0x3f81a4(0x1c8)]['bind'](this,this[_0x3f81a4(0x126)])));},Scene_Party['prototype']['adjustSprite']=function(_0x590e2e){const _0x192b8d=_0x1391e;this[_0x192b8d(0x11c)](_0x590e2e),this[_0x192b8d(0x20f)](_0x590e2e);},Scene_Party[_0x1391e(0x267)]['terminate']=function(){const _0x49f69f=_0x1391e;Scene_MenuBase[_0x49f69f(0x267)][_0x49f69f(0x295)]['call'](this),$gameParty[_0x49f69f(0x281)]();},Window_StatusBase[_0x1391e(0x267)]['drawActorPartyIcons']=function(_0x35da30,_0x575ac9,_0x4e1105,_0x26e5b6){const _0x5bad49=_0x1391e;if(!_0x35da30)return;_0x26e5b6?this[_0x5bad49(0xcb)](_0x35da30,_0x575ac9,_0x4e1105):this[_0x5bad49(0x24f)](_0x35da30,_0x575ac9,_0x4e1105);},Window_StatusBase[_0x1391e(0x267)][_0x1391e(0x24f)]=function(_0xe09d76,_0x1dfba2,_0x302939){const _0x1bc40f=_0x1391e;_0x302939+=Math['round']((this[_0x1bc40f(0x122)]()-ImageManager[_0x1bc40f(0xe0)])/0x2),!_0xe09d76['isFormationChangeOk']()&&(this[_0x1bc40f(0xff)](ImageManager[_0x1bc40f(0x12b)],_0x1dfba2,_0x302939),_0x1dfba2+=ImageManager[_0x1bc40f(0x28b)]+0x4),_0xe09d76[_0x1bc40f(0x1ff)]()&&(this[_0x1bc40f(0xff)](ImageManager[_0x1bc40f(0xda)],_0x1dfba2,_0x302939),_0x1dfba2+=ImageManager[_0x1bc40f(0x28b)]+0x4);},Window_StatusBase[_0x1391e(0x267)][_0x1391e(0xcb)]=function(_0x2aa009,_0x2454ae,_0x22be80){const _0x2f8565=_0x1391e;let _0x13dce5=0x0;if(!_0x2aa009[_0x2f8565(0x184)]())_0x13dce5+=0x1;if(_0x2aa009[_0x2f8565(0x1ff)]())_0x13dce5+=0x1;if(_0x13dce5<=0x1)return this['drawActorPartyIconsHorz'](_0x2aa009,_0x2454ae,_0x22be80);_0x22be80+=Math[_0x2f8565(0x297)]((this['lineHeight']()-ImageManager[_0x2f8565(0xe0)])/0x2),_0x22be80-=Math[_0x2f8565(0x297)](this[_0x2f8565(0x122)]()/0x2),this[_0x2f8565(0xff)](ImageManager['lockPartyMemberIcon'],_0x2454ae,_0x22be80),_0x22be80+=this['lineHeight'](),this[_0x2f8565(0xff)](ImageManager[_0x2f8565(0xda)],_0x2454ae,_0x22be80);};function Window_PartyLabel(){this['initialize'](...arguments);}Window_PartyLabel[_0x1391e(0x267)]=Object['create'](Window_Base['prototype']),Window_PartyLabel['prototype'][_0x1391e(0x1f7)]=Window_PartyLabel,Window_PartyLabel['prototype']['initialize']=function(_0x103050,_0x3c37fa){const _0x2be5b6=_0x1391e;Window_Base[_0x2be5b6(0x267)][_0x2be5b6(0xfc)][_0x2be5b6(0x128)](this,_0x103050),this[_0x2be5b6(0xf5)](_0x3c37fa);},Window_PartyLabel[_0x1391e(0x267)][_0x1391e(0x1e9)]=function(){const _0x2197f2=_0x1391e;this[_0x2197f2(0x1d5)]=0x0;},Window_PartyLabel[_0x1391e(0x267)][_0x1391e(0xf5)]=function(_0x15259f){const _0x12bd6c=_0x1391e;this[_0x12bd6c(0x108)][_0x12bd6c(0x23d)](),this[_0x12bd6c(0x286)](_0x15259f,0x0,0x0,this[_0x12bd6c(0x190)],'center');};function Window_PartyActive(){const _0x49f19a=_0x1391e;this[_0x49f19a(0xfc)](...arguments);}Window_PartyActive[_0x1391e(0x267)]=Object[_0x1391e(0x279)](Window_StatusBase[_0x1391e(0x267)]),Window_PartyActive['prototype'][_0x1391e(0x1f7)]=Window_PartyActive,Window_PartyActive[_0x1391e(0x13b)]=VisuMZ['PartySystem'][_0x1391e(0x201)][_0x1391e(0x227)][_0x1391e(0xdd)],Window_PartyActive['prototype'][_0x1391e(0xfc)]=function(_0x1f3d35){const _0xb1ccd2=_0x1391e;Window_StatusBase['prototype'][_0xb1ccd2(0xfc)][_0xb1ccd2(0x128)](this,_0x1f3d35),this[_0xb1ccd2(0x21e)](),this[_0xb1ccd2(0x26d)](),this[_0xb1ccd2(0x1b9)](0x0);},Window_PartyActive[_0x1391e(0x267)][_0x1391e(0xc6)]=function(){const _0x4cbb7b=_0x1391e;return VisuMZ[_0x4cbb7b(0x151)][_0x4cbb7b(0x201)][_0x4cbb7b(0x115)][_0x4cbb7b(0x171)];},Window_PartyActive['prototype'][_0x1391e(0x1d0)]=function(){const _0x3f48c0=_0x1391e;return $gameParty[_0x3f48c0(0x11b)]();},Window_PartyActive[_0x1391e(0x267)][_0x1391e(0x16b)]=function(){const _0x5b666c=_0x1391e;return $gameParty[_0x5b666c(0x11b)]();},Window_PartyActive[_0x1391e(0x267)]['itemHeight']=function(){const _0x4f6952=_0x1391e;return this[_0x4f6952(0x120)];},Window_PartyActive[_0x1391e(0x267)]['actor']=function(_0x13a91f){const _0x423d6e=_0x1391e;return $gameParty[_0x423d6e(0x1cb)]()[_0x13a91f];},Window_PartyActive[_0x1391e(0x267)]['currentActor']=function(){const _0x690bf7=_0x1391e;return this[_0x690bf7(0x231)](this['index']());},Window_PartyActive[_0x1391e(0x267)][_0x1391e(0x147)]=function(){const _0x3cb4f7=_0x1391e,_0x1c1a52=this[_0x3cb4f7(0x231)](this[_0x3cb4f7(0x1b2)]());return _0x1c1a52?_0x1c1a52['isFormationChangeOk']():!![];},Window_PartyActive[_0x1391e(0x267)][_0x1391e(0x1c4)]=function(){const _0x5c1676=_0x1391e;if($gameParty['members']()[_0x5c1676(0x256)]<=0x0)return!![];if($gameParty[_0x5c1676(0xd4)]())return![];return $gameParty[_0x5c1676(0x1b6)]()[_0x5c1676(0x256)]>0x0;},Window_PartyActive[_0x1391e(0x267)][_0x1391e(0x1c1)]=function(){const _0x298f81=_0x1391e;Window_StatusBase['prototype'][_0x298f81(0x1c1)][_0x298f81(0x128)](this),this['checkShiftRemoveShortcut']();},Window_PartyActive[_0x1391e(0x267)][_0x1391e(0x112)]=function(_0x19956a){this['isOkEnabled']()&&this['processOk']();},Window_PartyActive[_0x1391e(0x267)][_0x1391e(0x187)]=function(){const _0x453820=_0x1391e,_0x31e07a=this[_0x453820(0x1b2)](),_0x254e44=_0x31e07a+0x1>=this[_0x453820(0x1d0)]()?0x0:_0x31e07a+0x1;this[_0x453820(0x273)](_0x31e07a,_0x254e44);},Window_PartyActive[_0x1391e(0x267)][_0x1391e(0x1a5)]=function(){const _0x18d644=this['index'](),_0x105916=_0x18d644-0x1<0x0?this['maxItems']()-0x1:_0x18d644-0x1;this['quickSwap'](_0x18d644,_0x105916);},Window_PartyActive['prototype']['quickSwap']=function(_0x3443d4,_0x54d332){const _0x5b32c6=_0x1391e,_0x573d8e=this[_0x5b32c6(0x231)](_0x3443d4),_0x242529=this[_0x5b32c6(0x231)](_0x54d332);if(_0x573d8e&&!_0x573d8e[_0x5b32c6(0x184)]())return;if(_0x242529&&!_0x242529[_0x5b32c6(0x184)]())return;const _0x214cab=$gameParty[_0x5b32c6(0x28f)];_0x214cab[_0x3443d4]=_0x242529?_0x242529[_0x5b32c6(0x12c)]():0x0,_0x214cab[_0x54d332]=_0x573d8e?_0x573d8e['actorId']():0x0,this[_0x5b32c6(0x21e)](),this[_0x5b32c6(0x106)](),this[_0x5b32c6(0x1b9)](_0x54d332);},Window_PartyActive[_0x1391e(0x267)][_0x1391e(0x226)]=function(){const _0x4b6387=_0x1391e;if(!this[_0x4b6387(0x161)]())return;if(Input[_0x4b6387(0x27a)](_0x4b6387(0xe6))){const _0x25780d=this['currentActor']();this[_0x4b6387(0x1d9)]();}},Window_PartyActive[_0x1391e(0x267)][_0x1391e(0x1d9)]=function(){const _0x1c7b0b=_0x1391e;SoundManager['playEquip']();const _0x1f258e=this[_0x1c7b0b(0x1de)]();$gameParty['removeActorFromBattleMembers'](_0x1f258e[_0x1c7b0b(0x12c)]()),this[_0x1c7b0b(0x21c)](),SceneManager[_0x1c7b0b(0xc9)][_0x1c7b0b(0x165)]();},Window_PartyActive['prototype']['isShiftRemoveShortcutEnabled']=function(){const _0x22845c=_0x1391e;if(!this['addRemoveCommand']())return![];const _0x3a2a7b=this['currentActor']();return this[_0x22845c(0x16c)]&&_0x3a2a7b&&_0x3a2a7b[_0x22845c(0x184)]();},Window_PartyActive[_0x1391e(0x267)]['drawItem']=function(_0x6f9cea){const _0x2b2bb3=_0x1391e,_0x35094c=this['actor'](_0x6f9cea);if(!_0x35094c)return this['drawItemEmpty'](_0x6f9cea);this[_0x2b2bb3(0x22b)]();const _0x1e18f5=this[_0x2b2bb3(0x21d)](_0x6f9cea);this[_0x2b2bb3(0x23e)](_0x6f9cea);const _0x236125=_0x1e18f5['y']+_0x1e18f5['height']-this[_0x2b2bb3(0x122)]();this[_0x2b2bb3(0x135)](_0x1e18f5['x'],_0x236125,_0x1e18f5[_0x2b2bb3(0x104)],0x2),this[_0x2b2bb3(0x1c2)](_0x35094c,_0x1e18f5['x']+0x2,_0x1e18f5['y']),this[_0x2b2bb3(0x17a)](_0x35094c,_0x1e18f5['x'],_0x236125,_0x1e18f5[_0x2b2bb3(0x104)]);},Window_PartyActive[_0x1391e(0x267)][_0x1391e(0xcf)]=function(_0x5d3a50){const _0x694a1=_0x1391e;this[_0x694a1(0x22b)]();const _0x215da0=this['itemRect'](_0x5d3a50);this[_0x694a1(0x280)](_0x215da0['x'],_0x215da0['y'],_0x215da0['width'],_0x215da0[_0x694a1(0x1a0)]);const _0x21d1fe=_0x215da0['y']+Math[_0x694a1(0x297)]((_0x215da0['height']-this['lineHeight']())/0x2);this[_0x694a1(0x13d)](ColorManager['systemColor']()),this[_0x694a1(0x286)](TextManager[_0x694a1(0x25d)],_0x215da0['x'],_0x21d1fe,_0x215da0[_0x694a1(0x104)],_0x694a1(0x25f));},Window_PartyActive['prototype']['drawItemDarkRect']=function(_0x235556,_0x3e2e46,_0x1c5ae7,_0x243d97,_0x3f90ca){const _0x9a863f=_0x1391e;_0x3f90ca=Math[_0x9a863f(0x291)](_0x3f90ca||0x1,0x1);while(_0x3f90ca--){_0x243d97=_0x243d97||this['lineHeight'](),this[_0x9a863f(0x108)][_0x9a863f(0x292)]=0xa0;const _0x4df998=ColorManager[_0x9a863f(0x210)]();this[_0x9a863f(0x108)]['fillRect'](_0x235556+0x1,_0x3e2e46+0x1,_0x1c5ae7-0x2,_0x243d97-0x2,_0x4df998),this[_0x9a863f(0x108)]['paintOpacity']=0xff;}},Window_PartyActive['prototype'][_0x1391e(0x23e)]=function(_0x5f1757){const _0x10b306=_0x1391e;switch(Window_PartyActive[_0x10b306(0x13b)][_0x10b306(0x17c)]()[_0x10b306(0x265)]()){case'face':this['drawItemImageFace'](_0x5f1757);break;case'sprite':this[_0x10b306(0x10b)](_0x5f1757);break;case _0x10b306(0x251):Imported[_0x10b306(0x234)]&&this[_0x10b306(0x1c7)](_0x5f1757);break;};},Window_PartyActive['prototype'][_0x1391e(0x27b)]=function(_0x427eb3){const _0x38908d=_0x1391e,_0x5cc9d9=this[_0x38908d(0x231)](_0x427eb3),_0x40b8e=this['itemRect'](_0x427eb3),_0x39723e=Math[_0x38908d(0x141)](ImageManager['faceWidth'],_0x40b8e['width']-0x2),_0x1cd73f=_0x40b8e[_0x38908d(0x1a0)]-0x2;this[_0x38908d(0x127)](_0x5cc9d9[_0x38908d(0x184)]());const _0x217894=Math[_0x38908d(0x297)](_0x40b8e['x']+(_0x40b8e[_0x38908d(0x104)]-_0x39723e)/0x2);this[_0x38908d(0x22a)](_0x5cc9d9,_0x217894,_0x40b8e['y']+0x1,_0x39723e,_0x1cd73f),this['changePaintOpacity'](!![]);},Window_PartyActive[_0x1391e(0x267)]['drawItemImageSprite']=function(_0x4adff2){const _0xd1ca82=_0x1391e,_0x301bc0=this[_0xd1ca82(0x231)](_0x4adff2),_0x196ecb=this['itemRect'](_0x4adff2),_0xc82e57=VisuMZ[_0xd1ca82(0x151)][_0xd1ca82(0x201)][_0xd1ca82(0x227)],_0x36d858=_0x196ecb['x']+Math[_0xd1ca82(0x297)](_0x196ecb[_0xd1ca82(0x104)]/0x2)+_0xc82e57['ActiveSpriteOffsetX'],_0x5b9dee=_0x196ecb['y']+_0x196ecb['height']-this[_0xd1ca82(0x122)]()-_0xc82e57[_0xd1ca82(0x18e)];this['drawActorCharacter'](_0x301bc0,_0x36d858,_0x5b9dee);},Window_PartyActive['prototype']['drawItemImageSvActor']=function(_0x3b6936){const _0x3a045b=_0x1391e,_0x586547=this[_0x3a045b(0x231)](_0x3b6936),_0x5d8b5a=_0x586547['battlerName'](),_0x2290d5=this['itemRect'](_0x3b6936),_0x193972=VisuMZ[_0x3a045b(0x151)][_0x3a045b(0x201)][_0x3a045b(0x227)],_0x1dad0e=_0x2290d5['x']+Math[_0x3a045b(0x297)](_0x2290d5[_0x3a045b(0x104)]/0x2)+_0x193972[_0x3a045b(0x13c)],_0x467222=_0x2290d5['y']+_0x2290d5[_0x3a045b(0x1a0)]-this[_0x3a045b(0x122)]()-_0x193972[_0x3a045b(0x25b)];this[_0x3a045b(0x1d8)](_0x5d8b5a,_0x1dad0e,_0x467222);},Window_PartyActive[_0x1391e(0x267)][_0x1391e(0x135)]=function(_0x3e9fc1,_0x562b7a,_0x3f3a47,_0x5c8c48){const _0x1c0edc=_0x1391e,_0x3d2661=ColorManager[_0x1c0edc(0x162)](),_0xc9c530=ColorManager[_0x1c0edc(0x150)](),_0x47f73b=_0x3f3a47/0x2,_0x2565ea=this['lineHeight']();while(_0x5c8c48--){this['contents'][_0x1c0edc(0x1cd)](_0x3e9fc1,_0x562b7a,_0x47f73b,_0x2565ea,_0xc9c530,_0x3d2661),this[_0x1c0edc(0x108)][_0x1c0edc(0x1cd)](_0x3e9fc1+_0x47f73b,_0x562b7a,_0x47f73b,_0x2565ea,_0x3d2661,_0xc9c530);}},Window_PartyActive['prototype'][_0x1391e(0x17a)]=function(_0x2edf0f,_0x47325f,_0x823bd8,_0x5b37e7){const _0x4818f5=_0x1391e;_0x5b37e7=_0x5b37e7||0xa8,this[_0x4818f5(0x13d)](ColorManager[_0x4818f5(0x1d4)](_0x2edf0f)),this[_0x4818f5(0x286)](_0x2edf0f[_0x4818f5(0x118)](),_0x47325f,_0x823bd8,_0x5b37e7,_0x4818f5(0x25f));},Window_PartyActive['prototype'][_0x1391e(0x19b)]=function(_0x406a77){const _0x259aae=_0x1391e;this[_0x259aae(0x180)]=_0x406a77,this['callUpdateHelp']();},Window_PartyActive[_0x1391e(0x267)][_0x1391e(0x21c)]=function(){const _0x2ba3da=_0x1391e;if(this[_0x2ba3da(0x180)])this[_0x2ba3da(0x180)][_0x2ba3da(0xd7)](this[_0x2ba3da(0x231)](this[_0x2ba3da(0x1b2)]()));};function Window_PartyReserve(){const _0x2f9a89=_0x1391e;this[_0x2f9a89(0xfc)](...arguments);}Window_PartyReserve[_0x1391e(0x267)]=Object['create'](Window_StatusBase[_0x1391e(0x267)]),Window_PartyReserve[_0x1391e(0x267)][_0x1391e(0x1f7)]=Window_PartyReserve,Window_PartyReserve['_actorGraphic']=VisuMZ[_0x1391e(0x151)][_0x1391e(0x201)]['Window'][_0x1391e(0xdf)],Window_PartyReserve[_0x1391e(0x29c)]=VisuMZ['PartySystem']['Settings'][_0x1391e(0x227)][_0x1391e(0x29d)],Window_PartyReserve['prototype'][_0x1391e(0xfc)]=function(_0x2757ec){const _0x232ffa=_0x1391e;Window_StatusBase['prototype'][_0x232ffa(0xfc)][_0x232ffa(0x128)](this,_0x2757ec),this[_0x232ffa(0x23b)]=0x0,this[_0x232ffa(0x21e)]();},Window_PartyReserve[_0x1391e(0x267)][_0x1391e(0x16b)]=function(){const _0x4e908b=_0x1391e;return VisuMZ[_0x4e908b(0x151)][_0x4e908b(0x201)][_0x4e908b(0x227)]['ReserveCol']||0x1;},Window_PartyReserve[_0x1391e(0x267)][_0x1391e(0x242)]=function(){const _0x16a7f5=_0x1391e;return this[_0x16a7f5(0x122)]()*Window_PartyReserve[_0x16a7f5(0x29c)]+0x6;},Window_PartyReserve[_0x1391e(0x267)][_0x1391e(0xc6)]=function(){const _0x1007b7=_0x1391e;return VisuMZ[_0x1007b7(0x151)][_0x1007b7(0x201)][_0x1007b7(0x115)][_0x1007b7(0x171)];},Window_PartyReserve[_0x1391e(0x267)][_0x1391e(0x1d0)]=function(){const _0x377fac=_0x1391e;let _0x50a5da=$gameParty['reserveMembers']()[_0x377fac(0x256)];if(this[_0x377fac(0xc6)]())_0x50a5da++;return _0x50a5da;},Window_PartyReserve[_0x1391e(0x267)]['actor']=function(_0x2ab9e2){const _0xada01=_0x1391e;return $gameParty[_0xada01(0xfe)]()[_0x2ab9e2];},Window_PartyReserve[_0x1391e(0x267)][_0x1391e(0x1de)]=function(){const _0x525b3d=_0x1391e;return this[_0x525b3d(0x231)](this[_0x525b3d(0x1b2)]());},Window_PartyReserve['prototype'][_0x1391e(0x2a2)]=function(){const _0x4db971=_0x1391e;SoundManager[_0x4db971(0x143)]();},Window_PartyReserve[_0x1391e(0x267)]['isCurrentItemEnabled']=function(){const _0x5f1f3e=_0x1391e,_0x5644df=this[_0x5f1f3e(0x231)](this['index']());return _0x5644df?_0x5644df[_0x5f1f3e(0x184)]():!![];},Window_PartyReserve[_0x1391e(0x267)]['processCursorMove']=function(){const _0x4409cb=_0x1391e;Window_StatusBase[_0x4409cb(0x267)]['processCursorMove'][_0x4409cb(0x128)](this),this[_0x4409cb(0x1f0)]();},Window_PartyReserve[_0x1391e(0x267)]['cursorUp']=function(_0x470cad){const _0x3a02d7=_0x1391e;this[_0x3a02d7(0x1b2)]()<=0x0?this[_0x3a02d7(0x208)]():Window_StatusBase[_0x3a02d7(0x267)][_0x3a02d7(0x129)][_0x3a02d7(0x128)](this,_0x470cad);},Window_PartyReserve['prototype'][_0x1391e(0x187)]=function(){const _0x2a1b4a=_0x1391e,_0x380290=this[_0x2a1b4a(0x1b2)](),_0x5b994d=_0x380290+0x1>=this[_0x2a1b4a(0x1d0)]()-0x1?0x0:_0x380290+0x1;this[_0x2a1b4a(0x273)](_0x380290,_0x5b994d);},Window_PartyReserve[_0x1391e(0x267)][_0x1391e(0x1a5)]=function(){const _0x4bb053=_0x1391e,_0x491d94=this['index'](),_0x57eaee=_0x491d94-0x1<0x0?this[_0x4bb053(0x1d0)]()-0x2:_0x491d94-0x1;this['quickSwap'](_0x491d94,_0x57eaee);},Window_PartyReserve[_0x1391e(0x267)][_0x1391e(0x273)]=function(_0x5ec41e,_0x52110e){const _0x22b0c4=_0x1391e,_0x10afdb=this['actor'](_0x5ec41e),_0x47a05a=this[_0x22b0c4(0x231)](_0x52110e);if(!_0x10afdb?.[_0x22b0c4(0x184)]()||!_0x47a05a?.[_0x22b0c4(0x184)]())return;else{if(!_0x10afdb||!_0x47a05a)return;}const _0x40a9a6=$gameParty[_0x22b0c4(0x100)],_0x81b5e6=_0x40a9a6[_0x22b0c4(0x1a1)](_0x10afdb[_0x22b0c4(0x12c)]()),_0x4cfeee=_0x40a9a6[_0x22b0c4(0x1a1)](_0x47a05a[_0x22b0c4(0x12c)]());_0x40a9a6[_0x81b5e6]=_0x47a05a?_0x47a05a['actorId']():0x0,_0x40a9a6[_0x4cfeee]=_0x10afdb?_0x10afdb[_0x22b0c4(0x12c)]():0x0,this[_0x22b0c4(0x21e)](),this['playCursorSound'](),this[_0x22b0c4(0x1b9)](_0x52110e);},Window_PartyReserve['prototype'][_0x1391e(0x1f0)]=function(){const _0x110347=_0x1391e;if(!this['isShiftShortcutEnabled']())return;Input[_0x110347(0x27a)](_0x110347(0xe6))&&this[_0x110347(0x136)]();},Window_PartyReserve[_0x1391e(0x267)][_0x1391e(0x136)]=function(){const _0xae0818=_0x1391e;SoundManager[_0xae0818(0x143)](),$gameParty[_0xae0818(0x11e)](),this['smoothSelect'](0x0),SceneManager[_0xae0818(0xc9)][_0xae0818(0x165)]();},Window_PartyReserve[_0x1391e(0x267)][_0x1391e(0x1e5)]=function(){const _0x3dacf7=_0x1391e;return this[_0x3dacf7(0x16c)];},Window_PartyReserve[_0x1391e(0x267)][_0x1391e(0x195)]=function(){const _0xbad33d=_0x1391e,_0x4e07c3=this[_0xbad33d(0x1de)]();return _0x4e07c3?_0x4e07c3['index']():-0x1;},Window_PartyReserve[_0x1391e(0x267)]['select']=function(_0x58a9ee){const _0x51cb18=_0x1391e;Window_StatusBase[_0x51cb18(0x267)][_0x51cb18(0x15e)][_0x51cb18(0x128)](this,_0x58a9ee);if(_0x58a9ee>=0x0)this[_0x51cb18(0x23b)]=_0x58a9ee;},Window_PartyReserve[_0x1391e(0x267)][_0x1391e(0xc1)]=function(){const _0x2e90f9=_0x1391e;this[_0x2e90f9(0x23b)]=Math['min'](this[_0x2e90f9(0x23b)],this[_0x2e90f9(0x1d0)]()-0x1),this[_0x2e90f9(0x1b9)](this['_lastIndex']),this[_0x2e90f9(0xc7)](!![]),this[_0x2e90f9(0x25a)]=!![];},Window_PartyReserve[_0x1391e(0x267)]['drawItem']=function(_0x32d786){const _0x1761c8=_0x1391e,_0x21a9fb=this[_0x1761c8(0x231)](_0x32d786);if(!_0x21a9fb)return this['drawRemoveCommand'](_0x32d786);const _0x335949=this['itemLineRect'](_0x32d786);this[_0x1761c8(0x23e)](_0x32d786);const _0x2a505c=0xa8,_0x399f0a=Window_PartyReserve[_0x1761c8(0x29c)]===0x1,_0xdc644=ImageManager[_0x1761c8(0x28b)]*(_0x399f0a?0x2:0x1),_0x4adbb7=this[_0x1761c8(0xf0)]()+this['itemPadding'](),_0x27a4e3=_0x335949[_0x1761c8(0x104)]-_0x2a505c,_0x5a3e98=_0x335949['x']+_0xdc644+Math['min'](_0x4adbb7,_0x27a4e3),_0xf2036=_0x399f0a?![]:!![];this[_0x1761c8(0x127)](_0x21a9fb[_0x1761c8(0x184)]()),this[_0x1761c8(0x1c2)](_0x21a9fb,_0x335949['x'],_0x335949['y'],_0xf2036),this[_0x1761c8(0x17a)](_0x21a9fb,_0x5a3e98,_0x335949['y'],_0x2a505c),this['changePaintOpacity'](!![]);},Window_PartyReserve[_0x1391e(0x267)][_0x1391e(0xf0)]=function(){const _0xd2e82f=_0x1391e,_0x26fe4d=VisuMZ[_0xd2e82f(0x151)][_0xd2e82f(0x201)][_0xd2e82f(0x227)];switch(Window_PartyReserve[_0xd2e82f(0x13b)][_0xd2e82f(0x17c)]()['trim']()){case'face':return ImageManager[_0xd2e82f(0x28e)];case _0xd2e82f(0x215):return _0x26fe4d[_0xd2e82f(0xf7)]*0x2;case _0xd2e82f(0x251):return _0x26fe4d['ReserveBattlerOffsetX']*0x2;};},Window_PartyReserve[_0x1391e(0x267)][_0x1391e(0x224)]=function(_0x4cc1d1){const _0x54a70a=_0x1391e,_0x2f620b=this[_0x54a70a(0x204)](_0x4cc1d1);this[_0x54a70a(0x127)](!![]);const _0x101d72=TextManager['removePartyMember'];this[_0x54a70a(0x286)](_0x101d72,_0x2f620b['x'],_0x2f620b['y'],_0x2f620b[_0x54a70a(0x104)],_0x54a70a(0x25f));},Window_PartyReserve['prototype'][_0x1391e(0x23e)]=function(_0x558064){const _0xae50e1=_0x1391e;switch(Window_PartyReserve['_actorGraphic'][_0xae50e1(0x17c)]()[_0xae50e1(0x265)]()){case'face':this[_0xae50e1(0x27b)](_0x558064);break;case _0xae50e1(0x215):this[_0xae50e1(0x10b)](_0x558064);break;case _0xae50e1(0x251):Imported[_0xae50e1(0x234)]&&this[_0xae50e1(0x1c7)](_0x558064);break;};},Window_PartyReserve[_0x1391e(0x267)]['drawItemImageFace']=function(_0x4673a5){const _0x2ebf81=_0x1391e,_0x39e357=this[_0x2ebf81(0x231)](_0x4673a5),_0x1dbffe=this['itemRect'](_0x4673a5),_0x1e1446=Window_PartyReserve[_0x2ebf81(0x29c)]===0x1;_0x1dbffe['x']+=ImageManager['iconWidth']*(_0x1e1446?0x2:0x1);const _0x2feaad=ImageManager['faceWidth'],_0x357e7c=_0x1dbffe['height']-0x2;this[_0x2ebf81(0x127)](_0x39e357[_0x2ebf81(0x184)]()),this[_0x2ebf81(0x22a)](_0x39e357,_0x1dbffe['x']+0x1,_0x1dbffe['y']+0x1,_0x2feaad,_0x357e7c),this[_0x2ebf81(0x127)](!![]);},Window_PartyReserve[_0x1391e(0x267)][_0x1391e(0x10b)]=function(_0x218232){const _0x441f48=_0x1391e,_0x1e55df=this[_0x441f48(0x231)](_0x218232),_0xa2ab1=this[_0x441f48(0x21d)](_0x218232),_0x3dc676=Window_PartyReserve['_rowThickness']===0x1;_0xa2ab1['x']+=ImageManager['iconWidth']*(_0x3dc676?0x2:0x1);const _0x1ba79d=VisuMZ['PartySystem']['Settings']['Window'],_0x55e247=_0xa2ab1['x']+_0x1ba79d[_0x441f48(0xf7)]+this[_0x441f48(0x1fe)](),_0x18ae42=_0xa2ab1['y']+_0xa2ab1[_0x441f48(0x1a0)]-_0x1ba79d[_0x441f48(0xe3)];this['drawActorCharacter'](_0x1e55df,_0x55e247,_0x18ae42);},Window_PartyReserve[_0x1391e(0x267)]['drawItemImageSvActor']=function(_0x1c9543){const _0xe2f255=_0x1391e,_0x21d69c=this['actor'](_0x1c9543),_0x4808a1=_0x21d69c[_0xe2f255(0x240)](),_0x5ddc08=this[_0xe2f255(0x21d)](_0x1c9543),_0x18ec51=Window_PartyReserve['_rowThickness']===0x1;_0x5ddc08['x']+=ImageManager[_0xe2f255(0x28b)]*(_0x18ec51?0x2:0x1);const _0x26c3ad=VisuMZ[_0xe2f255(0x151)][_0xe2f255(0x201)]['Window'],_0x3b1311=_0x5ddc08['x']+_0x26c3ad[_0xe2f255(0x283)]+this[_0xe2f255(0x1fe)](),_0x4a6d88=_0x5ddc08['y']+_0x5ddc08['height']-_0x26c3ad[_0xe2f255(0x1c5)];this[_0xe2f255(0x1d8)](_0x4808a1,_0x3b1311,_0x4a6d88);},Window_PartyReserve[_0x1391e(0x267)][_0x1391e(0x19b)]=function(_0x26980e){const _0x338e73=_0x1391e;this[_0x338e73(0x180)]=_0x26980e,this[_0x338e73(0x21c)]();},Window_PartyReserve[_0x1391e(0x267)][_0x1391e(0x21c)]=function(){const _0x470fb2=_0x1391e;this[_0x470fb2(0x180)]&&this[_0x470fb2(0x180)][_0x470fb2(0xd7)](this[_0x470fb2(0x231)](this[_0x470fb2(0x1b2)]()));};function Window_PartyStatus(){const _0x3d030e=_0x1391e;this[_0x3d030e(0xfc)](...arguments);}Window_PartyStatus[_0x1391e(0x267)]=Object['create'](Window_StatusBase['prototype']),Window_PartyStatus[_0x1391e(0x267)][_0x1391e(0x1f7)]=Window_PartyStatus,Window_PartyStatus['prototype'][_0x1391e(0xfc)]=function(_0x2912a5){const _0x4088e6=_0x1391e;this[_0x4088e6(0x239)]=null,Window_StatusBase[_0x4088e6(0x267)][_0x4088e6(0xfc)][_0x4088e6(0x128)](this,_0x2912a5);},Window_PartyStatus[_0x1391e(0x267)][_0x1391e(0x280)]=function(_0x419fa7,_0x4ce6dd,_0x83435a,_0xfa93a5,_0x47561f){const _0x59e9b9=_0x1391e;if(VisuMZ[_0x59e9b9(0x151)][_0x59e9b9(0x201)][_0x59e9b9(0x115)][_0x59e9b9(0xf6)]===![])return;_0x47561f=Math[_0x59e9b9(0x291)](_0x47561f||0x1,0x1);while(_0x47561f--){_0xfa93a5=_0xfa93a5||this[_0x59e9b9(0x122)](),this[_0x59e9b9(0x108)]['paintOpacity']=0xa0;const _0x427aa8=ColorManager[_0x59e9b9(0x188)]();this[_0x59e9b9(0x108)][_0x59e9b9(0x1b0)](_0x419fa7+0x1,_0x4ce6dd+0x1,_0x83435a-0x2,_0xfa93a5-0x2,_0x427aa8),this[_0x59e9b9(0x108)][_0x59e9b9(0x292)]=0xff;}},ColorManager[_0x1391e(0x188)]=function(){const _0x242053=_0x1391e,_0x5b2a11=VisuMZ[_0x242053(0x151)][_0x242053(0x201)][_0x242053(0x115)];let _0x548493=_0x5b2a11[_0x242053(0x176)]!==undefined?_0x5b2a11[_0x242053(0x176)]:0x13;return ColorManager[_0x242053(0x20a)](_0x548493);},Window_PartyStatus[_0x1391e(0x267)]['setActor']=function(_0x1e4ee5){const _0x4639c8=_0x1391e;if(this['_actor']===_0x1e4ee5)return;this[_0x4639c8(0x239)]=_0x1e4ee5;if(_0x1e4ee5){const _0x52623c=ImageManager[_0x4639c8(0x191)](_0x1e4ee5[_0x4639c8(0x214)]());_0x52623c['addLoadListener'](this['refresh'][_0x4639c8(0x1f6)](this));}else this[_0x4639c8(0x21e)]();},Window_PartyStatus[_0x1391e(0x267)]['refresh']=function(){const _0x4003db=_0x1391e;Window_StatusBase['prototype'][_0x4003db(0x21e)]['call'](this),this[_0x4003db(0x108)][_0x4003db(0x23d)](),this[_0x4003db(0x22b)](),VisuMZ[_0x4003db(0x151)][_0x4003db(0x201)][_0x4003db(0x227)][_0x4003db(0x1b7)][_0x4003db(0x128)](this);},Window_PartyStatus[_0x1391e(0x267)][_0x1391e(0x271)]=function(){const _0x4508d4=_0x1391e;if(!this[_0x4508d4(0x239)]){this[_0x4508d4(0x280)](0x0,0x0,this[_0x4508d4(0x190)],this['innerHeight']);const _0x43e007=Math['round']((this[_0x4508d4(0x120)]-this['lineHeight']())/0x2);this[_0x4508d4(0x13d)](ColorManager['systemColor']()),this['drawText'](TextManager['emptyPartyMember'],0x0,_0x43e007,this[_0x4508d4(0x190)],_0x4508d4(0x25f));return;}this[_0x4508d4(0x22a)](this[_0x4508d4(0x239)],0x1,0x0,ImageManager[_0x4508d4(0x28e)],ImageManager['faceHeight']),this['drawActorSimpleStatus'](this[_0x4508d4(0x239)],ImageManager[_0x4508d4(0x28e)]+0x24,0x0);const _0x5487de=this[_0x4508d4(0x122)](),_0x39f6b1=this['actorParams'](),_0x239626=Math['round'](this[_0x4508d4(0x190)]/0x2),_0x49da07=Math[_0x4508d4(0x278)](_0x39f6b1[_0x4508d4(0x256)]/0x2)*_0x5487de,_0x4bf347=0x0;let _0x471e5a=0x0,_0x3388a4=ImageManager['faceHeight']+_0x5487de/0x2;for(const _0x430685 of _0x39f6b1){this['drawItemDarkRect'](_0x471e5a,_0x3388a4,_0x239626,_0x5487de),this[_0x4508d4(0x132)](_0x430685,_0x471e5a,_0x3388a4,_0x239626),this[_0x4508d4(0x160)](_0x430685,_0x471e5a,_0x3388a4,_0x239626),_0x471e5a===_0x4bf347?_0x471e5a+=_0x239626:(_0x471e5a=_0x4bf347,_0x3388a4+=_0x5487de);}},Window_PartyStatus[_0x1391e(0x267)][_0x1391e(0x1f3)]=function(){const _0x5ac8e9=_0x1391e;return Imported['VisuMZ_0_CoreEngine']?VisuMZ[_0x5ac8e9(0x1e3)][_0x5ac8e9(0x201)]['Param'][_0x5ac8e9(0x21f)]:[0x2,0x3,0x4,0x5,0x6,0x7];},Window_PartyStatus['prototype'][_0x1391e(0x132)]=function(_0xf29ed,_0x37dbd8,_0x3cacbf,_0x37d556){const _0x59f3c5=_0x1391e,_0x3f130c=this[_0x59f3c5(0x1fe)]();_0x37d556-=_0x3f130c*0x2;if(Imported['VisuMZ_0_CoreEngine'])this[_0x59f3c5(0x15f)](_0x37dbd8+_0x3f130c,_0x3cacbf,_0x37d556,_0xf29ed,![]);else{const _0x34363c=TextManager[_0x59f3c5(0x14d)](_0xf29ed);this[_0x59f3c5(0x13d)](ColorManager[_0x59f3c5(0x1a3)]()),this[_0x59f3c5(0x286)](_0x34363c,_0x37dbd8+_0x3f130c,_0x3cacbf,_0x37d556);}},Window_PartyStatus[_0x1391e(0x267)][_0x1391e(0x160)]=function(_0x2f2543,_0x4f1aaf,_0x4a48a8,_0x3e5ec6){const _0x417caf=_0x1391e;this['resetFontSettings']();const _0x6f5f4b=this['itemPadding'](),_0x3ab780=this[_0x417caf(0x146)](_0x2f2543);this[_0x417caf(0x286)](_0x3ab780,_0x4f1aaf+_0x6f5f4b,_0x4a48a8,_0x3e5ec6-_0x6f5f4b*0x2,_0x417caf(0x105));},Window_PartyStatus[_0x1391e(0x267)][_0x1391e(0x146)]=function(_0x1f99bc){const _0x2d2750=_0x1391e,_0x1b1d29=this['_actor'];return Imported['VisuMZ_0_CoreEngine']?_0x1b1d29['paramValueByName'](_0x1f99bc,!![]):_0x1b1d29[_0x2d2750(0x14d)](_0x1f99bc);};function Window_PartyBattleSwitch(){const _0x461c31=_0x1391e;this[_0x461c31(0xfc)](...arguments);}Window_PartyBattleSwitch[_0x1391e(0x267)]=Object[_0x1391e(0x279)](Window_StatusBase[_0x1391e(0x267)]),Window_PartyBattleSwitch[_0x1391e(0x267)][_0x1391e(0x1f7)]=Window_PartyBattleSwitch,Window_PartyBattleSwitch[_0x1391e(0x267)][_0x1391e(0xfc)]=function(_0x495d90){const _0x3dd7c7=_0x1391e;Window_StatusBase[_0x3dd7c7(0x267)]['initialize'][_0x3dd7c7(0x128)](this,_0x495d90),this[_0x3dd7c7(0x27c)](VisuMZ[_0x3dd7c7(0x151)][_0x3dd7c7(0x201)]['Window'][_0x3dd7c7(0x1eb)]),this[_0x3dd7c7(0x172)]=0x0;},Window_PartyBattleSwitch[_0x1391e(0x267)][_0x1391e(0x277)]=function(){const _0x3884c6=_0x1391e;for(const _0x5efc6e of $gameParty[_0x3884c6(0x149)]()){ImageManager[_0x3884c6(0x191)](_0x5efc6e[_0x3884c6(0x214)]());}},Window_PartyBattleSwitch[_0x1391e(0x267)][_0x1391e(0x16b)]=function(){return 0x1;},Window_PartyBattleSwitch['prototype'][_0x1391e(0x231)]=function(_0x42d612){const _0x526019=_0x1391e;return $gameParty[_0x526019(0xfe)]()[_0x42d612];},Window_PartyBattleSwitch[_0x1391e(0x267)][_0x1391e(0x1de)]=function(){const _0x2b8929=_0x1391e;return this[_0x2b8929(0x231)](this['index']());},Window_PartyBattleSwitch[_0x1391e(0x267)]['itemHeight']=function(){return this['lineHeight']()*0x2+0x8;},Window_PartyBattleSwitch[_0x1391e(0x267)][_0x1391e(0x1d0)]=function(){const _0xc6199=_0x1391e;return $gameParty[_0xc6199(0xfe)]()[_0xc6199(0x256)];},Window_PartyBattleSwitch['prototype']['activate']=function(){const _0x12f51d=_0x1391e;Window_StatusBase[_0x12f51d(0x267)]['activate'][_0x12f51d(0x128)](this),this['open'](),this['refresh'](),this[_0x12f51d(0x1b9)](0x0);},Window_PartyBattleSwitch[_0x1391e(0x267)][_0x1391e(0xe7)]=function(){const _0xa9adb9=_0x1391e;Window_StatusBase[_0xa9adb9(0x267)][_0xa9adb9(0xe7)]['call'](this),this[_0xa9adb9(0x266)]();},Window_PartyBattleSwitch[_0x1391e(0x267)]['isCurrentItemEnabled']=function(){const _0x3e9570=_0x1391e;return this['isEnabled'](this[_0x3e9570(0x1de)]());},Window_PartyBattleSwitch[_0x1391e(0x267)][_0x1391e(0x211)]=function(_0x278efa){const _0x2e6d5d=_0x1391e;if(!_0x278efa)return![];return _0x278efa[_0x2e6d5d(0x184)]()&&_0x278efa[_0x2e6d5d(0x169)]();},Window_PartyBattleSwitch[_0x1391e(0x267)]['drawItem']=function(_0x5ae4de){const _0x5cf95d=_0x1391e,_0xc1f6c4=this[_0x5cf95d(0x231)](_0x5ae4de);if(!_0xc1f6c4)return;const _0x280d61=ImageManager[_0x5cf95d(0x191)](_0xc1f6c4[_0x5cf95d(0x214)]());_0x280d61['addLoadListener'](this[_0x5cf95d(0x232)]['bind'](this,_0x5ae4de));},Window_PartyBattleSwitch[_0x1391e(0x267)][_0x1391e(0x232)]=function(_0x1224ae){const _0x49f70e=_0x1391e;this[_0x49f70e(0x23e)](_0x1224ae),this[_0x49f70e(0xc5)](_0x1224ae);},Window_PartyBattleSwitch[_0x1391e(0x267)][_0x1391e(0x23e)]=function(_0x17cae4){const _0x2c3cc2=_0x1391e,_0x3337e5=this[_0x2c3cc2(0x231)](_0x17cae4),_0x3bc154=this['itemRect'](_0x17cae4);this[_0x2c3cc2(0x127)](this[_0x2c3cc2(0x211)](_0x3337e5)),this[_0x2c3cc2(0x22a)](_0x3337e5,_0x3bc154['x']+0x1,_0x3bc154['y']+0x1,ImageManager[_0x2c3cc2(0x28e)],_0x3bc154[_0x2c3cc2(0x1a0)]-0x2),this[_0x2c3cc2(0x127)](!![]);},Window_PartyBattleSwitch[_0x1391e(0x267)][_0x1391e(0xc5)]=function(_0x2c1203){const _0x2634c6=_0x1391e,_0x410c24=this[_0x2634c6(0x231)](_0x2c1203),_0xb975a1=this[_0x2634c6(0x294)](_0x2c1203),_0x42d7e8=_0xb975a1['x']+ImageManager[_0x2634c6(0x28e)]+0x24,_0x445f27=_0x42d7e8+0xb4;this[_0x2634c6(0x127)](this[_0x2634c6(0x211)](_0x410c24)),this[_0x2634c6(0x17a)](_0x410c24,_0x42d7e8,_0xb975a1['y']),this[_0x2634c6(0x15a)](_0x410c24,_0x42d7e8,_0xb975a1['y']+this[_0x2634c6(0x122)]()),this[_0x2634c6(0x170)](_0x410c24,_0x445f27,_0xb975a1['y']),this[_0x2634c6(0x127)](!![]);};Imported['VisuMZ_1_BattleCore']&&(ImageManager[_0x1391e(0x163)]=VisuMZ[_0x1391e(0x151)]['Settings'][_0x1391e(0x115)][_0x1391e(0x1fb)]??0x4b,TextManager[_0x1391e(0x1ba)]=VisuMZ[_0x1391e(0x151)][_0x1391e(0x201)]['Vocab']['BattlePartyCmd'],TextManager[_0x1391e(0x1a8)]=VisuMZ[_0x1391e(0x151)][_0x1391e(0x201)]['Vocab'][_0x1391e(0x2a3)],TextManager['battlePartySwitchCmd']=VisuMZ[_0x1391e(0x151)]['Settings'][_0x1391e(0x12e)][_0x1391e(0x1d7)],TextManager[_0x1391e(0x238)]=VisuMZ[_0x1391e(0x151)][_0x1391e(0x201)][_0x1391e(0x12e)]['BattleHelpSwitch'],TextManager[_0x1391e(0x18d)]=VisuMZ['PartySystem'][_0x1391e(0x201)][_0x1391e(0x12e)]['QueuePartyScene'],VisuMZ[_0x1391e(0x151)][_0x1391e(0x1fa)]=SceneManager[_0x1391e(0x18a)],SceneManager[_0x1391e(0x18a)]=function(){const _0x1cde22=_0x1391e;if(SceneManager[_0x1cde22(0x200)](Scene_Party))return!![];return VisuMZ[_0x1cde22(0x151)]['SceneManager_isPreviousSceneBattleTransitionable'][_0x1cde22(0x128)](this);},VisuMZ[_0x1391e(0x151)][_0x1391e(0x138)]=SceneManager['isNextSceneBattleTransitionable'],SceneManager[_0x1391e(0x1a6)]=function(){const _0x1a38d=_0x1391e;if(SceneManager[_0x1a38d(0x287)](Scene_Party))return!![];return VisuMZ[_0x1a38d(0x151)]['SceneManager_isNextSceneBattleTransitionable'][_0x1a38d(0x128)](this);},SceneManager[_0x1391e(0x1a4)]=function(){const _0x78649c=_0x1391e;return this[_0x78649c(0xc9)]&&this[_0x78649c(0xc9)][_0x78649c(0x1f7)]===Scene_Map;},VisuMZ[_0x1391e(0x151)][_0x1391e(0xec)]=Scene_Battle['prototype'][_0x1391e(0xca)],Scene_Battle[_0x1391e(0x267)][_0x1391e(0xca)]=function(){const _0x642c5e=_0x1391e;VisuMZ[_0x642c5e(0x151)][_0x642c5e(0xec)][_0x642c5e(0x128)](this),this[_0x642c5e(0x142)](),this[_0x642c5e(0x1ae)](),this[_0x642c5e(0x1ac)]();},Scene_Battle[_0x1391e(0x267)]['createPartySwitchWindow']=function(){const _0x1805c8=_0x1391e,_0x14b1c4=this[_0x1805c8(0x17d)]();this[_0x1805c8(0x255)]=new Window_PartyBattleSwitch(_0x14b1c4),this[_0x1805c8(0x1da)](this[_0x1805c8(0x255)]),this[_0x1805c8(0x255)]['setHandler']('ok',this['onPartySwitchOk'][_0x1805c8(0x1f6)](this)),this['_partyMemberSwitchWindow'][_0x1805c8(0x1df)]('cancel',this[_0x1805c8(0x269)]['bind'](this));},Scene_Battle[_0x1391e(0x267)][_0x1391e(0x17d)]=function(){const _0x417573=_0x1391e,_0x36ba9f=this[_0x417573(0x26f)]();return _0x36ba9f===_0x417573(0xd0)?this['partySwitchWindowRectBorder']():this[_0x417573(0x12a)]();},Scene_Battle[_0x1391e(0x267)][_0x1391e(0x12a)]=function(){const _0x56dd0d=_0x1391e;return VisuMZ[_0x56dd0d(0x151)]['Settings'][_0x56dd0d(0x227)]['BattleSwitchWindowRect'][_0x56dd0d(0x128)](this);},Scene_Battle[_0x1391e(0x267)][_0x1391e(0x10e)]=function(){const _0x7e75a3=_0x1391e,_0x46e18a=this[_0x7e75a3(0x252)](),_0x52a0a9=$gameSystem[_0x7e75a3(0x173)]()*0x2;return _0x46e18a['width']=0x204+_0x52a0a9,_0x46e18a;},VisuMZ[_0x1391e(0x151)][_0x1391e(0x1dd)]=Scene_Battle[_0x1391e(0x267)][_0x1391e(0x144)],Scene_Battle['prototype'][_0x1391e(0x144)]=function(){const _0x26de4c=_0x1391e;if(this['_partyMemberSwitchWindow']&&this[_0x26de4c(0x255)][_0x26de4c(0x16c)])return!![];if(this[_0x26de4c(0x237)])return!![];if(this['_callPartyMemberSwitch'])return!![];if(this[_0x26de4c(0x1b1)])return!![];return VisuMZ[_0x26de4c(0x151)][_0x26de4c(0x1dd)]['call'](this);},VisuMZ[_0x1391e(0x151)][_0x1391e(0x1e4)]=Scene_Battle[_0x1391e(0x267)][_0x1391e(0x102)],Scene_Battle[_0x1391e(0x267)]['createPartyCommandWindowBattleCore']=function(){const _0x187909=_0x1391e;VisuMZ[_0x187909(0x151)][_0x187909(0x1e4)][_0x187909(0x128)](this),this['_partyCommandWindow'][_0x187909(0x1df)](_0x187909(0x206),this[_0x187909(0x175)][_0x187909(0x1f6)](this));},Scene_Battle[_0x1391e(0x267)][_0x1391e(0x175)]=function(){const _0xad40a7=_0x1391e;this[_0xad40a7(0x1bd)]()?(this[_0xad40a7(0x1b1)]=!![],this[_0xad40a7(0x272)][_0xad40a7(0x1a7)](TextManager['ActiveTpbFormationMessage'][_0xad40a7(0x181)](TextManager['formation']))):this[_0xad40a7(0xe4)]();},Scene_Battle[_0x1391e(0x267)]['isQueueFormationMenu']=function(){const _0x1c0c94=_0x1391e;return BattleManager[_0x1c0c94(0xf4)]();},Scene_Battle[_0x1391e(0x267)][_0x1391e(0xe4)]=function(){const _0x58e3ce=_0x1391e;this[_0x58e3ce(0x1b1)]=![],this[_0x58e3ce(0x247)][_0x58e3ce(0x26a)](),this[_0x58e3ce(0xde)][_0x58e3ce(0x236)]=![],SceneManager[_0x58e3ce(0xd6)](),SceneManager[_0x58e3ce(0x24c)](Scene_Party),$gameParty[_0x58e3ce(0x298)](),BattleManager[_0x58e3ce(0x276)]()&&(BattleManager['_tpbSceneChangeCacheActor']=BattleManager[_0x58e3ce(0x231)]());},VisuMZ[_0x1391e(0x151)]['Scene_Battle_updateBattleProcess']=Scene_Battle[_0x1391e(0x267)][_0x1391e(0xdb)],Scene_Battle[_0x1391e(0x267)][_0x1391e(0xdb)]=function(){const _0x3633ec=_0x1391e;VisuMZ[_0x3633ec(0x151)]['Scene_Battle_updateBattleProcess'][_0x3633ec(0x128)](this),this[_0x3633ec(0x1b1)]&&!BattleManager[_0x3633ec(0x243)]&&this[_0x3633ec(0xe4)](),this[_0x3633ec(0x1b5)]&&!BattleManager[_0x3633ec(0x243)]&&this['callPartyMemberSwitch']();},VisuMZ['PartySystem'][_0x1391e(0x2a0)]=Scene_Battle[_0x1391e(0x267)][_0x1391e(0x289)],Scene_Battle[_0x1391e(0x267)][_0x1391e(0x289)]=function(){const _0x37bef0=_0x1391e;if(BattleManager[_0x37bef0(0xf4)]()){if(this['_partyMemberSwitchWindow']&&this[_0x37bef0(0x255)]['active'])return![];}return VisuMZ[_0x37bef0(0x151)][_0x37bef0(0x2a0)][_0x37bef0(0x128)](this);},VisuMZ[_0x1391e(0x151)][_0x1391e(0x257)]=Scene_Battle['prototype'][_0x1391e(0x156)],Scene_Battle[_0x1391e(0x267)]['createActorCommandWindow']=function(){const _0x3e13f8=_0x1391e;VisuMZ[_0x3e13f8(0x151)][_0x3e13f8(0x257)][_0x3e13f8(0x128)](this),this[_0x3e13f8(0x2a1)][_0x3e13f8(0x1df)](_0x3e13f8(0x206),this[_0x3e13f8(0x233)]['bind'](this));},Scene_Battle[_0x1391e(0x267)][_0x1391e(0x233)]=function(){const _0x3f2b1e=_0x1391e;this[_0x3f2b1e(0x1bd)]()?(this['_callPartyMemberSwitch']=!![],this[_0x3f2b1e(0x272)]['addText'](TextManager[_0x3f2b1e(0x18d)][_0x3f2b1e(0x181)](TextManager[_0x3f2b1e(0x206)]))):this['callPartyMemberSwitch']();},Scene_Battle['prototype'][_0x1391e(0x182)]=function(){const _0x329c9e=_0x1391e;this[_0x329c9e(0x1b5)]=![],this[_0x329c9e(0x272)]['clear'](),BattleManager['actor']()&&this[_0x329c9e(0x255)][_0x329c9e(0x26d)]();},Scene_Battle[_0x1391e(0x267)]['onPartySwitchOk']=function(){const _0x22fb52=_0x1391e,_0x2f110d=this[_0x22fb52(0x255)]['currentActor']();_0x2f110d?this[_0x22fb52(0xc4)](_0x2f110d):(this[_0x22fb52(0x255)]['deactivate'](),this[_0x22fb52(0x2a1)][_0x22fb52(0x26d)]());},Scene_Battle[_0x1391e(0x267)]['preparePartySwitchMember']=function(_0x211d54){const _0x389fba=_0x1391e,_0xb6f82a=BattleManager[_0x389fba(0x231)](),_0x2c8c90=_0xb6f82a[_0x389fba(0xe8)]();this[_0x389fba(0x255)]['deactivate'](),this[_0x389fba(0xef)]()&&_0x2c8c90?(this['_partySystemSwitchOut']=!![],_0x2c8c90[_0x389fba(0x24e)](_0x211d54)):this[_0x389fba(0x1f1)](_0x211d54);},Scene_Battle[_0x1391e(0x267)][_0x1391e(0xef)]=function(){const _0x34372f=_0x1391e;return VisuMZ[_0x34372f(0x151)][_0x34372f(0x201)][_0x34372f(0x115)]['SwitchOutAnimation'];},Scene_Battle[_0x1391e(0x267)][_0x1391e(0x1f1)]=function(_0x37bca1){const _0x256f70=_0x1391e;this[_0x256f70(0x237)]=![];const _0x3b62f6=BattleManager[_0x256f70(0x231)](),_0x3d7904=_0x3b62f6[_0x256f70(0xe8)]();$gameParty[_0x256f70(0x28f)][_0x3b62f6[_0x256f70(0x1b2)]()]=_0x37bca1[_0x256f70(0x12c)](),$gameParty['partyChangeRefresh']();if(this['isImmediateTpb']())_0x37bca1[_0x256f70(0x219)]=_0x3b62f6[_0x256f70(0x219)],_0x37bca1[_0x256f70(0x20b)]=_0x256f70(0x25e);else BattleManager[_0x256f70(0x276)]()&&_0x37bca1['clearTpbChargeTime']();BattleManager[_0x256f70(0xc0)]=_0x37bca1,_0x37bca1['applyBattlePartySwitchCooldown'](),_0x37bca1[_0x256f70(0x1b3)](),_0x37bca1[_0x256f70(0x1ee)](_0x3b62f6),_0x3d7904&&_0x3d7904[_0x256f70(0x103)](_0x37bca1),this['_statusWindow'][_0x256f70(0x1d2)](_0x3b62f6,_0x37bca1),this[_0x256f70(0x180)][_0x256f70(0x21e)](),this[_0x256f70(0x2a1)]['setup'](_0x37bca1),this[_0x256f70(0x2a1)][_0x256f70(0x1b9)](0x0),this[_0x256f70(0x2a1)][_0x256f70(0x26d)](),this[_0x256f70(0x2a1)]['_debug']=!![];},Scene_Battle[_0x1391e(0x267)][_0x1391e(0x15c)]=function(){const _0xda3d55=_0x1391e;if(!BattleManager[_0xda3d55(0x276)]())return![];const _0x57495b=VisuMZ[_0xda3d55(0x151)][_0xda3d55(0x201)]['General'];return _0x57495b[_0xda3d55(0x26b)]===undefined&&(_0x57495b[_0xda3d55(0x26b)]=!![]),_0x57495b[_0xda3d55(0x26b)];},Window_StatusBase[_0x1391e(0x267)][_0x1391e(0x1d2)]=function(_0xf71851,_0x5c86ae){const _0x5daa5a=_0x1391e,_0x259e2a=_0x5daa5a(0x249)[_0x5daa5a(0x181)](_0xf71851[_0x5daa5a(0x12c)]()),_0x3e2c5c=this[_0x5daa5a(0x15d)](_0x259e2a,Sprite_StateIcon);_0x3e2c5c['setup'](_0x5c86ae);},Scene_Battle[_0x1391e(0x267)]['onPartySwitchCancel']=function(){const _0x21b0a0=_0x1391e;this[_0x21b0a0(0x255)]['deactivate'](),this[_0x21b0a0(0x2a1)][_0x21b0a0(0x26d)](),this['_actorCommandWindow'][_0x21b0a0(0x21e)]();},Scene_Battle[_0x1391e(0x267)][_0x1391e(0x1ae)]=function(){const _0x46c0ab=_0x1391e;if(!BattleManager['isTpb']())return;if(!SceneManager[_0x46c0ab(0x200)](Scene_Party))return;this['_partyCommandWindow'][_0x46c0ab(0xe7)](),this[_0x46c0ab(0x1e2)]['close'](),this[_0x46c0ab(0x2a1)][_0x46c0ab(0xe7)](),this['_actorCommandWindow'][_0x46c0ab(0x266)](),BattleManager['_currentActor']=null,BattleManager['_inputting']=![];},Scene_Battle[_0x1391e(0x267)][_0x1391e(0x1ac)]=function(){const _0x53a220=_0x1391e;if(BattleManager[_0x53a220(0x276)]())return;if(!SceneManager[_0x53a220(0x200)](Scene_Party))return;Imported['VisuMZ_2_BattleSystemBTB']&&BattleManager[_0x53a220(0x125)]()&&BattleManager[_0x53a220(0x185)](),Imported[_0x53a220(0x209)]&&BattleManager[_0x53a220(0x253)]()&&(BattleManager[_0x53a220(0xc0)]=$gameParty[_0x53a220(0x1b6)]()[0x0],BattleManager[_0x53a220(0x243)]=BattleManager[_0x53a220(0x231)](),BattleManager[_0x53a220(0x245)]=!![],this[_0x53a220(0x2a1)][_0x53a220(0x235)](BattleManager['actor']()),this['_statusWindow'][_0x53a220(0x250)](BattleManager[_0x53a220(0x231)]()));},Sprite_Actor[_0x1391e(0x274)]=0xc,Sprite_Actor['prototype']['startSwitchOutAnimation']=function(_0x1a47f7){const _0x3eedd0=_0x1391e;this[_0x3eedd0(0x18c)]=_0x1a47f7;const _0x95e7f8=Sprite_Actor[_0x3eedd0(0x274)];this[_0x3eedd0(0x148)](0x12c,0x0,_0x95e7f8),this[_0x3eedd0(0xcd)](0x0,_0x95e7f8),this['_partySwitchDuration']=_0x95e7f8;},Sprite_Actor[_0x1391e(0x267)][_0x1391e(0x1cc)]=function(_0x1e43cd){const _0x29b584=_0x1391e;if(SceneManager[_0x29b584(0x18b)]()){SceneManager['_scene'][_0x29b584(0x1f1)](_0x1e43cd);const _0xb1e263=Sprite_Actor[_0x29b584(0x274)];this[_0x29b584(0xc3)](),this['startOpacity'](0xff,_0xb1e263);}this[_0x29b584(0x18c)]=null;},VisuMZ[_0x1391e(0x151)][_0x1391e(0x15b)]=Sprite_Actor['prototype']['update'],Sprite_Actor[_0x1391e(0x267)]['update']=function(){const _0x243d7d=_0x1391e;VisuMZ[_0x243d7d(0x151)]['Sprite_Actor_update'][_0x243d7d(0x128)](this);if(this[_0x243d7d(0x274)])this[_0x243d7d(0x20e)]();},Sprite_Actor[_0x1391e(0x267)]['updatePartySwitch']=function(){const _0x49a609=_0x1391e;this[_0x49a609(0x274)]=this[_0x49a609(0x274)]||0x0,this['_partySwitchDuration']--,this[_0x49a609(0x274)]<=0x0&&this[_0x49a609(0x1cc)](this['_partySwitchTargetActor']);},Window_PartyCommand['prototype'][_0x1391e(0x28d)]=function(){const _0x10b02f=_0x1391e;this[_0x10b02f(0x199)]();},Window_PartyCommand[_0x1391e(0x267)][_0x1391e(0x199)]=function(){const _0xb3bbee=_0x1391e;if(!this[_0xb3bbee(0x1f5)]())return;if(this['hasBattleSystemIncompatibilities']()){$gameTemp['isPlaytest']()&&!BattleManager[_0xb3bbee(0x166)]&&(console['log'](_0xb3bbee(0x17e)),BattleManager[_0xb3bbee(0x166)]=!![]);return;}const _0x44b4c9=this['commandStyle'](),_0x98ed5d=ImageManager[_0xb3bbee(0x163)],_0x1877cb=_0x44b4c9===_0xb3bbee(0x16f)?TextManager[_0xb3bbee(0x1ba)]:_0xb3bbee(0x24b)[_0xb3bbee(0x181)](_0x98ed5d,TextManager['battlePartyChangeCmd']),_0x5438ff=this[_0xb3bbee(0xeb)]();this['addCommand'](_0x1877cb,_0xb3bbee(0x206),_0x5438ff);},Window_PartyCommand[_0x1391e(0x267)][_0x1391e(0x1f5)]=function(){const _0x457dee=_0x1391e;return VisuMZ['PartySystem'][_0x457dee(0x201)][_0x457dee(0x115)]['PartyCmdWinAddParty'];},Window_PartyCommand[_0x1391e(0x267)][_0x1391e(0x222)]=function(){if(Imported['VisuMZ_2_BattleSystemSTB']&&BattleManager['isSTB']())return!![];return![];},Window_PartyCommand['prototype'][_0x1391e(0xeb)]=function(){const _0x483dc8=_0x1391e;if($gameParty['allMembers']()[_0x483dc8(0x256)]<=0x1)return![];if(!$gameParty[_0x483dc8(0x20d)]())return![];return $gameSystem['isFormationEnabled']();},VisuMZ[_0x1391e(0x151)][_0x1391e(0x201)][_0x1391e(0x27e)]=Window_PartyCommand[_0x1391e(0x267)][_0x1391e(0x296)],Window_PartyCommand[_0x1391e(0x267)][_0x1391e(0x296)]=function(){const _0x5b4ca6=_0x1391e,_0x158cd1=this[_0x5b4ca6(0x192)]();switch(_0x158cd1){case _0x5b4ca6(0x206):this[_0x5b4ca6(0x1a9)][_0x5b4ca6(0xf5)](TextManager[_0x5b4ca6(0x1a8)]);break;default:VisuMZ[_0x5b4ca6(0x151)][_0x5b4ca6(0x201)][_0x5b4ca6(0x27e)][_0x5b4ca6(0x128)](this);break;}},Window_ActorCommand['prototype'][_0x1391e(0x1b8)]=function(){const _0x80cc2=_0x1391e;if(!this[_0x80cc2(0x1c0)]())return;const _0x5c09b8=this[_0x80cc2(0x26e)](),_0x4a2870=ImageManager['battlePartyChangeIcon'],_0x3605df=_0x5c09b8===_0x80cc2(0x16f)?TextManager['battlePartySwitchCmd']:'\x5cI[%1]%2'[_0x80cc2(0x181)](_0x4a2870,TextManager['battlePartyChangeCmd']),_0x30cd97=this['isPartyCommandEnabled']();this[_0x80cc2(0x285)](_0x3605df,_0x80cc2(0x206),_0x30cd97);},Window_ActorCommand['prototype']['isPartyCommandAdded']=function(){const _0xa610df=_0x1391e;if(!this['_actor'])return![];return VisuMZ[_0xa610df(0x151)][_0xa610df(0x201)][_0xa610df(0x115)][_0xa610df(0x197)];},Window_ActorCommand['prototype'][_0x1391e(0x11a)]=function(){const _0xea7035=_0x1391e;if($gameParty[_0xea7035(0x149)]()['length']<=0x1)return![];if(!this[_0xea7035(0x239)])return![];if(!this[_0xea7035(0x239)][_0xea7035(0x20d)]())return![];return this[_0xea7035(0x239)][_0xea7035(0x184)]();},VisuMZ['PartySystem'][_0x1391e(0x201)]['Window_ActorCommand_updateHelp']=Window_ActorCommand[_0x1391e(0x267)]['updateHelp'],Window_ActorCommand[_0x1391e(0x267)][_0x1391e(0x296)]=function(){const _0x424161=_0x1391e,_0x1f96ae=this['currentSymbol']();switch(_0x1f96ae){case _0x424161(0x206):this[_0x424161(0x1a9)][_0x424161(0xf5)](TextManager[_0x424161(0x238)]);break;default:VisuMZ[_0x424161(0x151)][_0x424161(0x201)][_0x424161(0x1d3)][_0x424161(0x128)](this);break;}});;