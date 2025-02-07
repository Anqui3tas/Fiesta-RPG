//=============================================================================
// VisuStella MZ - BattleSystemFTB
// VisuMZ_2_BattleSystemFTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemFTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemFTB = VisuMZ.BattleSystemFTB || {};
VisuMZ.BattleSystemFTB.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.00] [BattleSystemFTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_FTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Free Turn Battle (FTB) is a type of battle system made for RPG Maker MZ,
 * where the teams for actors and enemies take turns attacking one another as
 * a whole. During each team's turns, an action count is given to them and they
 * can freely perform actions among their teammates as wanted (or if turned off
 * by the Plugin Parameters, in a cycle). When the action count is depleted or
 * if one team ran out of battler's that can act, the other team begins their
 * turn and so forth.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ftb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actor and enemy teams take turns attacking each other as a whole.
 * * Action counts are given to each team at the start of each turn to utilize
 *   actions for.
 * * If enabled, actors can be freely switched around to perform actions with.
 * * Alter the mechanics of the Battle System FTB to your liking through the
 *   Plugin Parameters.
 * * An Action Count Display is shown for each side to relay information to the
 *   player about the current state of each turn.
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
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
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
 * Surprise Attacks and Preemptive Bonuses
 * 
 * Due to the nature of a team-based battle system, surprise attacks and
 * preemptive bonuses no longer prevent the other team from being able to act
 * for a turn as that gives the initiating team too much advantage. Instead,
 * a surprise attack means the enemy team will always start first for each turn
 * while a preemptive bonus means the actor team will always start first for
 * each turn.
 * 
 * ---
 * 
 * Agility and Speed
 * 
 * When there is no surprise attack or preemptive bonus, aka a neutral battle
 * initiative, then the team that goes first is determined by their Agility
 * value at the start of battle (unless determined otherwise through the Plugin
 * Parameters).
 * 
 * However, because of the nature of team-based battle systems, agility and
 * speed have no impact on action speeds as action speeds are now instantly
 * performed.
 * 
 * Agility, however, can influence Action Counts through buffs and debuffs if
 * enabled through the Plugin Parameters. Each stack of Agility buffs will
 * raise the Action Count for a team while each stack of Agility debuffs will
 * decrease them for subsequent turns.
 * 
 * ---
 * 
 * Action Orders
 * 
 * As team-based battle systems always have teams go between each other, the
 * standard action orders seen for turn-based and tick-based battle systems no
 * longer exist. However, in the event the actor team has berserk, confused, or
 * autobattlers, the actions will be performed in the following order:
 * 
 * 1. Berserk, confused, and auto battlers go first.
 * 2. If any actions are left, inputtable actors go next.
 * 3. If any actions are left, but there are no inputtable actors, berserk,
 *    confused, and auto battlers use up the remaining actions.
 * 4. Switch to the next team.
 * 
 * For enemy teams, enemies will always go in order from left-to-right for the
 * front view or right-to-left for sideview. If there are actions left, the
 * enemy team will cycle back to the first acting enemy.
 * 
 * ---
 * 
 * Free Range Switching
 * 
 * If this is enabled (it's an optional feature) and it's the player's turn,
 * the player can freely switch between actors in his/her party by pressing the
 * left/right buttons or the page up/page down buttons. The Actor Command
 * Window will automatically update to the newly selected actor. This gives the
 * player complete control and freedom over the party and the party's actions.
 * 
 * For touch controls, instead of pressing left/right or page up/page down on
 * the keyboard, click on the Battle Status Window for the target actor to be
 * selected to perform an action. The Actor Command Window will automatically
 * update to the newly selected actor.
 * 
 * ---
 *
 * Turn Structure
 * 
 * Each battle turn is dedicated to one team or the other. You need to design
 * your turns with this in mind. When one team finishes its actions, the next
 * turn will have the other team perform theirs.
 * 
 * As a result, both teams will not benefit from their turn end activities such
 * as regeneration at the end of each battle turn. Instead, they will only
 * occur at the end of their own respective turns.
 * 
 * However, for states and buffs, this is slightly different. States and buffs
 * update at the end of the opposing team's turn. This is so that 1 turn states
 * like Guard will last until the opponent's turn is over instead of being over
 * immediately after the player's turn ends (rendering the effect useless).
 * 
 * The state and buff turn updates can be disabled in the Plugin Parameters.
 * However, the durations must be accounted for if disabled (ie. making Guard
 * last two turns instead of 1).
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
 * === General FTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <FTB Help>
 *  description
 *  description
 * </FTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under FTB.
 * - This is primarily used if the skill behaves differently in FTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to FTB.
 *
 * ---
 * 
 * === Action Cost-Related Notetags ===
 * 
 * ---
 *
 * <FTB Action Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the FTB action cost of this skill/item to 'x'.
 * - Replace 'x' with a number value representing the action cost required to
 *   perform the skill.
 *
 * ---
 *
 * <FTB Hide Action Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the FTB action cost for this skill/item hidden.
 *
 * ---
 * 
 * === Mechanics-Related Notetags ===
 * 
 * ---
 *
 * <FTB Pass Turn>
 *
 * - Used for: Skill, Item Notetags
 * - If a battler uses this skill/item, then even if there are actions left for
 *   the team to perform, that battler would no longer be able to input as they
 *   have already passed their turn.
 * - By default, this applies to "Guard". If you don't want it to apply to the
 *   Guard skill, turn it off in the Plugin Parameters for mechanics.
 *
 * ---
 *
 * <FTB Actions: +x>
 * <FTB Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Battlers associated with these trait objects can increase or decrease the
 *   maximum number of actions performed each turn.
 * - Replace 'x' with a number representing the increase or decrease in action
 *   count per turn.
 * - Depending on the Plugin Parameters, altering the max value can result in
 *   gaining or losing remaining actions for the current turn.
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
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: FTB Action Count Visibility
 * - Determine the visibility of the FTB Action Count Display.
 *
 *   Visibility:
 *   - Changes the visibility of the FTB Action Count Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Determines the general settings of the FTB Battle System. These settings
 * range from determining how the Action Count resources and costs are
 * displayed to the text that appear during team shifting.
 *
 * ---
 *
 * Action Counts
 * 
 *   Full Name:
 *   - What is the full name of "Action Counts" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Action Counts" in your game?
 * 
 *   Cost Format:
 *   - How are Action Count costs displayed?
 *   - %1 - Cost, %2 - Abbr Text, %3 - Icon
 * 
 * ---
 * 
 * Icons
 * 
 *   Actor Action Icon:
 *   - What icon is used to represent actor actions?
 * 
 *   Enemy Action Icon:
 *   - What icon is used to represent enemy actions?
 * 
 *   Empty Action Icon:
 *   - What icon is used to represent empty actions?
 *
 * ---
 *
 * Team Shift
 * 
 *   Party's Turn:
 *   - Text that appears when it's the party's turn.
 *   - %1 - Party Name
 * 
 *   Enemy's Turn:
 *   - Text that appears when it's the enemy's turn.
 * 
 *   Wait Frames:
 *   - How many frames to wait in between team changes?
 *
 * ---
 *
 * Displayed Costs
 * 
 *   Cost Position Front?:
 *   - Put the action cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the action cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the action cost for the Guard command?
 * 
 *   Show Cost: 0 Action:
 *   - Show the action cost when the cost is 0 action?
 * 
 *   Show Cost: 1 Action:
 *   - Show the action cost when the cost is 1 action?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of the FTB Battle System. From here, you can
 * enable or disable core mechanics, determine how to determine turn advantage,
 * and how the various supporting mechanics operate.
 *
 * ---
 *
 * Main Mechanics
 * 
 *   Enable Free Switch?:
 *   - Enable free range switching between actors?
 * 
 *   Maintain Same Actor?:
 *   - Maintain the same actor after an action?
 *   - Or move onto the next available actor?
 * 
 *   Guard > Pass Turn?:
 *   - Does guarding cause a battler to pass turn?
 * 
 *   Gain Differences?:
 *   - If the max Action Count for a team changes, gain the difference in value
 *     if positive?
 * 
 *   Lose Differences?:
 *   - If the max Action Count for a team changes, lose the difference in value
 *     if negative?
 * 
 *   State/Buff Updates:
 *   - If enabled, update state/buff turns only on opponent turns.
 *   - Otherwise, they occur every turn.
 *
 * ---
 *
 * Turn Advantage
 * 
 *   Neutral Advantage:
 *   - For a neutral advantage battle, what determines which team goes first?
 *     - Random - 50% chance on which team goes first
 *     - Player - Player's team always goes first.
 *     - Lowest AGI - Battler with lowest AGI's team goes first
 *     - Average AGI - Team with the highest average AGI goes first
 *     - Highest AGI - Battler with highest AGI's team goes first
 *     - Total AGI - Team with highest total AGI goes first
 *
 * ---
 *
 * Action Generation
 * 
 *   Base:
 *   - What is the starting base number of actions that are generated per
 *     battler each turn?
 * 
 *   AGI Buff Influence?:
 *   - Do AGI buffs give +1 for each stack?
 * 
 *   AGI Debuff Influence?:
 *   - Do AGI debuffs give -1 for each stack?
 * 
 *   Maximum Actions:
 *   - What is the absolute maximum number of actions a team can have
 *     each turn?
 * 
 *   Minimum Actions:
 *   - What is the bare minimum number of actions a team can have each turn?
 * 
 *   Allow Overflow?:
 *   - Allow current actions to overflow?
 *   - Or let them cap at the current team max?
 *
 * ---
 *
 * Default Action Costs
 * 
 *   Skills:
 *   - What is the default action cost for skills?
 * 
 *   Items:
 *   - What is the default action cost for items?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Count Display Settings
 * ============================================================================
 *
 * Adjust the settings for the Action Count Display. They appear in the upper
 * or lower corners of the screen for the player party and the enemy troop.
 *
 * ---
 *
 * Display Settings
 * 
 *   Draw Horizontally?:
 *   - Which direction do you want the Action Count Display to go?
 * 
 *   Bottom Position?:
 *   - Place the Action Count Display towards the bottom of the screen?
 * 
 *     Offset Top Log Y?:
 *     - If using the top position, offset the log window's Y position.
 * 
 *     Reposition for Help?:
 *     - If using the top position, reposition the display when the help window
 *       is open?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's X/Y coordinates by this much when the
 *     Help Window is visible.
 *
 * ---
 *
 * Picture Settings
 * 
 *   Actor Action Picture:
 *   Enemy Action Picture:
 *   Empty Action Picture:
 *   - Optional. Place an image for an actor, enemy, or empty action instead of
 *     an icon?
 *
 * ---
 *
 * Coordinates
 * 
 *   Screen Buffer X:
 *   Screen Buffer Y:
 *   - Buffer from the the edge of the screen's X/Y by this much.
 * 
 *   Actor Offset X:
 *   Actor Offset Y:
 *   Enemy Offset X:
 *   Enemy Offset Y:
 *   - Offset the actor/enemy images' X/Y by this much.
 *
 * ---
 *
 * Draw Settings
 * 
 *   Max Actions Visible:
 *   - How many action slots max should be drawn for each team?
 * 
 *   Image Size:
 *   - What is the size of the icons or pictures for the action slots?
 * 
 *   Gap Distance:
 *   - How wide should the gab between each slot be in pixels?
 * 
 *   Icon Smoothing?:
 *   - Smooth the display for icons?
 *   - Or pixelate them?
 * 
 *   Picture Smoothing?:
 *   - Smooth the display for pictures?
 *   - Or pixelate them?
 *
 * ---
 *
 * Turns Remaining
 * 
 *   Show Number?:
 *   - Show a number to display the actions remaining?
 * 
 *   Font Size:
 *   - What font size should be used for this number?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the remaining actions number X/Y.
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
 * Version 1.00 Official Release Date: February 22, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemActionCountVisibility
 * @text System: FTB Action Count Visibility
 * @desc Determine the visibility of the FTB Action Count Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the FTB Action Count Display.
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
 * @param BattleSystemFTB
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
 * @desc Determines the general settings of the FTB Battle System.
 * @default {"ActionCounts":"","ActionCountFull:str":"Fight Points","ActionCountAbbr:str":"FP","ActionCountCostFmt:str":"\\FS[22]\\C[0]×%1%3\\C[0]","Icons":"","ActorActionsIcon:num":"165","EnemyActionsIcon:num":"162","EmptyActionsIcon:num":"161","TeamShift":"","PartyTeamShiftFmt:str":"%1's Turn!","TroopTeamShiftFmt:str":"Opponent's Turn!","TeamShiftWait:num":"60","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","Show_0_Action_Cost:eval":"true","Show_1_Action_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Determines the mechanics of the FTB Battle System.
 * @default {"Main":"","FreeChange:eval":"true","KeepPrevActor:eval":"true","GuardPass:eval":"true","GainDiff:eval":"true","LoseDiff:eval":"false","StateBuffUpdate:eval":"true","TurnAdvantage":"","NeutralAdvantage:str":"average agi","ActionGeneration":"","GenerateBase:num":"1","AgiBuff:eval":"true","AgiDebuff:eval":"false","MaxActions:num":"99","MinActions:num":"1","AllowOverflow:eval":"false","DefaultCost":"","DefaultCostSkill:num":"1","DefaultCostItem:num":"1"}
 *
 * @param ActionCountDisplay:struct
 * @text Action Count Display
 * @type struct<ActionCountDisplay>
 * @desc Adjust the settings for the Action Count Display.
 * @default {"Display":"","DrawHorz:eval":"true","BottomPosition:eval":"true","LogWindowTopOffsetY:num":"40","RepositionTopForHelp:eval":"true","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"160","Pictures":"","ActorActionPicture:str":"","EnemyActionPicture:str":"","EmptyActionPicture:str":"","Coordinates":"","ScreenBufferX:num":"16","ScreenBufferY:num":"16","ActorOffsetX:num":"0","ActorOffsetY:num":"0","EnemyOffsetX:num":"0","EnemyOffsetY:num":"0","DrawSettings":"","MaxVisible:num":"10","ImageSize:num":"32","ImageGapDistance:num":"2","IconSmoothing:eval":"false","PictureSmoothing:eval":"true","TurnsRemaining":"","DrawActionsRemaining:eval":"true","ActionsRemainingFontSize:num":"26","ActionsRemainingOffsetX:num":"0","ActionsRemainingOffsetY:num":"0"}
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
 * @param ActionCounts
 * @text Action Counts
 *
 * @param ActionCountFull:str
 * @text Full Name
 * @parent ActionCounts
 * @desc What is the full name of "Action Counts" in your game?
 * @default Fight Points
 *
 * @param ActionCountAbbr:str
 * @text Abbreviation
 * @parent ActionCounts
 * @desc What is the abbreviation of "Action Counts" in your game?
 * @default FP
 *
 * @param ActionCountCostFmt:str
 * @text Cost Format
 * @parent ActionCounts
 * @desc How are Action Count costs displayed?
 * %1 - Cost, %2 - Abbr Text, %3 - Icon
 * @default \FS[22]\C[0]×%1%3\C[0]
 *
 * @param Icons
 *
 * @param ActorActionsIcon:num
 * @text Actor Action Icon
 * @parent Icons
 * @desc What icon is used to represent actor actions?
 * @default 165
 *
 * @param EnemyActionsIcon:num
 * @text Enemy Action Icon
 * @parent Icons
 * @desc What icon is used to represent enemy actions?
 * @default 162
 *
 * @param EmptyActionsIcon:num
 * @text Empty Action Icon
 * @parent Icons
 * @desc What icon is used to represent empty actions?
 * @default 161
 *
 * @param TeamShift
 * @text Team Shift
 *
 * @param PartyTeamShiftFmt:str
 * @text Party's Turn
 * @parent TeamShift
 * @desc Text that appears when it's the party's turn.
 * %1 - Party Name
 * @default %1's Turn!
 *
 * @param TroopTeamShiftFmt:str
 * @text Enemy's Turn
 * @parent TeamShift
 * @desc Text that appears when it's the enemy's turn.
 * @default Opponent's Turn!
 *
 * @param TeamShiftWait:num
 * @text Wait Frames
 * @parent TeamShift
 * @type number
 * @desc How many frames to wait in between team changes?
 * @default 60
 *
 * @param DisplayedCosts
 * @text Displayed Costs
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @parent DisplayedCosts
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the action cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost for the Guard command?
 * @default false
 *
 * @param Show_0_Action_Cost:eval
 * @text Show Cost: 0 Action
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost when the cost is 0 action?
 * @default true
 *
 * @param Show_1_Action_Cost:eval
 * @text Show Cost: 1 Action
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost when the cost is 1 action?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Main
 * @text Main Mechanics
 *
 * @param FreeChange:eval
 * @text Enable Free Switch?
 * @parent Main
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable free range switching between actors?
 * @default true
 *
 * @param KeepPrevActor:eval
 * @text Maintain Same Actor?
 * @parent Main
 * @type boolean
 * @on Maintain
 * @off Next Available
 * @desc Maintain the same actor after an action?
 * Or move onto the next available actor?
 * @default true
 *
 * @param GuardPass:eval
 * @text Guard > Pass Turn?
 * @parent Main
 * @type boolean
 * @on Pass Turn
 * @off Don't Pass
 * @desc Does guarding cause a battler to pass turn?
 * @default true
 *
 * @param GainDiff:eval
 * @text Gain Differences?
 * @parent Main
 * @type boolean
 * @on Gain Differences
 * @off Keep Same
 * @desc If the max Action Count for a team changes,
 * gain the difference in value if positive?
 * @default true
 *
 * @param LoseDiff:eval
 * @text Lose Differences?
 * @parent Main
 * @type boolean
 * @on Lose Differences
 * @off Keep Same
 * @desc If the max Action Count for a team changes,
 * lose the difference in value if negative?
 * @default false
 *
 * @param StateBuffUpdate:eval
 * @text State/Buff Updates
 * @parent Main
 * @type boolean
 * @on Opponent Turns Only
 * @off All Turns
 * @desc If enabled, update state/buff turns only on opponent
 * turns. Otherwise, they occur every turn.
 * @default true
 *
 * @param TurnAdvantage
 * @text Turn Advantage
 *
 * @param NeutralAdvantage:str
 * @text Neutral Advantage
 * @parent TurnAdvantage
 * @type select
 * @option Random - 50% chance on which team goes first
 * @value random
 * @option Player - Player's team always goes first
 * @value player
 * @option Enemy - Enemy's team always goes first
 * @value enemy
 * @option Lowest AGI - Battler with lowest AGI's team goes first
 * @value lowest agi
 * @option Average AGI - Team with the highest average AGI goes first
 * @value average agi
 * @option Highest AGI - Battler with highest AGI's team goes first
 * @value highest agi
 * @option Total AGI - Team with highest total AGI goes first
 * @value total agi
 * @desc For a neutral advantage battle, what determines which team goes first?
 * @default average agi
 *
 * @param ActionGeneration
 * @text Action Generation
 *
 * @param GenerateBase:num
 * @text Base
 * @parent ActionGeneration
 * @type number
 * @desc What is the starting base number of actions that are generated per battler each turn?
 * @default 1
 *
 * @param AgiBuff:eval
 * @text AGI Buff Influence?
 * @parent ActionGeneration
 * @type boolean
 * @on Influence
 * @off No Influence
 * @desc Do AGI buffs give +1 for each stack?
 * @default true
 *
 * @param AgiDebuff:eval
 * @text AGI Debuff Influence?
 * @parent ActionGeneration
 * @type boolean
 * @on Influence
 * @off No Influence
 * @desc Do AGI debuffs give -1 for each stack?
 * @default false
 *
 * @param MaxActions:num
 * @text Maximum Actions
 * @parent ActionGeneration
 * @type number
 * @desc What is the absolute maximum number of actions a team can have each turn?
 * @default 99
 *
 * @param MinActions:num
 * @text Minimum Actions
 * @parent ActionGeneration
 * @type number
 * @desc What is the bare minimum number of actions a team can have each turn?
 * @default 1
 *
 * @param AllowOverflow:eval
 * @text Allow Overflow?
 * @parent ActionGeneration
 * @type boolean
 * @on Allow
 * @off Cap to Max
 * @desc Allow current actions to overflow?
 * Or let them cap at the current team max?
 * @default false
 *
 * @param DefaultCost
 * @text Default Action Costs
 *
 * @param DefaultCostSkill:num
 * @text Skills
 * @parent DefaultCost
 * @type number
 * @desc What is the default action cost for skills?
 * @default 1
 *
 * @param DefaultCostItem:num
 * @text Items
 * @parent DefaultCost
 * @type number
 * @desc What is the default action cost for items?
 * @default 1
 * 
 */
/* ----------------------------------------------------------------------------
 * Action Count Display Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionCountDisplay:
 *
 * @param Display
 * @text Display Settings
 *
 * @param DrawHorz:eval
 * @text Draw Horizontally?
 * @parent Display
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Which direction do you want the Action Count Display to go?
 * @default true
 *
 * @param BottomPosition:eval
 * @text Bottom Position?
 * @parent Display
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Place the Action Count Display towards the bottom of the screen?
 * @default true
 *
 * @param LogWindowTopOffsetY:num
 * @text Offset Top Log Y?
 * @parent BottomPosition:eval
 * @type number
 * @desc If using the top position, offset the log window's Y position.
 * @default 40
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent BottomPosition:eval
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If using the top position, reposition the display when the help window is open?
 * @default true
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
 * @default 160
 *
 * @param Pictures
 * @text Picture Settings
 *
 * @param ActorActionPicture:str
 * @text Actor Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an actor action instead of an icon?
 * @default 
 *
 * @param EnemyActionPicture:str
 * @text Enemy Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an enemy action instead of an icon?
 * @default 
 *
 * @param EmptyActionPicture:str
 * @text Empty Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an empty action instead of an icon?
 * @default 
 *
 * @param Coordinates
 *
 * @param ScreenBufferX:num
 * @text Screen Buffer X
 * @parent Coordinates
 * @desc Buffer from the the edge of the screen's X by this much.
 * @default 16
 *
 * @param ScreenBufferY:num
 * @text Screen Buffer Y
 * @parent Coordinates
 * @desc Buffer from the the edge of the screen's Y by this much.
 * @default 16
 *
 * @param ActorOffsetX:num
 * @text Actor Offset X
 * @parent Coordinates
 * @desc Offset the actor images' X by this much.
 * @default 0
 *
 * @param ActorOffsetY:num
 * @text Actor Offset Y
 * @parent Coordinates
 * @desc Offset the actor images' Y by this much.
 * @default 0
 *
 * @param EnemyOffsetX:num
 * @text Enemy Offset X
 * @parent Coordinates
 * @desc Offset the enemy images' X by this much.
 * @default 0
 *
 * @param EnemyOffsetY:num
 * @text Enemy Offset Y
 * @parent Coordinates
 * @desc Offset the enemy images' Y by this much.
 * @default 0
 *
 * @param DrawSettings
 * @text Draw Settings
 *
 * @param MaxVisible:num
 * @text Max Actions Visible
 * @parent DrawSettings
 * @desc How many action slots max should be drawn for each team?
 * @default 10
 *
 * @param ImageSize:num
 * @text Image Size
 * @parent DrawSettings
 * @desc What is the size of the icons or pictures for the action slots?
 * @default 32
 *
 * @param ImageGapDistance:num
 * @text Gap Distance
 * @parent DrawSettings
 * @desc How wide should the gab between each slot be in pixels?
 * @default 2
 *
 * @param IconSmoothing:eval
 * @text Icon Smoothing?
 * @parent DrawSettings
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Smooth the display for icons?
 * Or pixelate them?
 * @default false
 *
 * @param PictureSmoothing:eval
 * @text Picture Smoothing?
 * @parent DrawSettings
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Smooth the display for pictures?
 * Or pixelate them?
 * @default true
 *
 * @param TurnsRemaining
 * @text Turns Remaining
 *
 * @param DrawActionsRemaining:eval
 * @text Show Number?
 * @parent TurnsRemaining
 * @type boolean
 * @on Show Number
 * @off Don't Show
 * @desc Show a number to display the actions remaining?
 * @default true
 *
 * @param ActionsRemainingFontSize:num
 * @text Font Size
 * @parent DrawActionsRemaining:eval
 * @desc What font size should be used for this number?
 * @default 26
 *
 * @param ActionsRemainingOffsetX:num
 * @text Offset X
 * @parent DrawActionsRemaining:eval
 * @desc Offset the remaining actions number X.
 * @default 0
 *
 * @param ActionsRemainingOffsetY:num
 * @text Offset Y
 * @parent DrawActionsRemaining:eval
 * @desc Offset the remaining actions number Y.
 * @default 0
 *
 */
//=============================================================================

const _0x290d=['makeActions','BattleManager_isTurnBased','DefaultCostItem','Game_Battler_performCollapse','round','isTurnBased','_FTB_RECALC_ADD_DIFF','_currentActions','removeStatesAuto','addChildAt','_helpWindow','traitObjects','constructor','setCurrentActionsFTB','endActionFTB','DrawHorz','ftbTroopTeamShift','createActorCommandWindowFTB','RegExp','Show_0_Action_Cost','MaxVisible','battler','NUM','selectNextActorFTB','BattleManager_isTpb','ActionsRemainingOffsetX','updatePosition','width','parse','Game_Battler_addBuff','initialize','SystemActionCountVisibility','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','MaxActions','return\x200','updateBuffTurns','iconHeight','keepPrevSubjectFTB','forceChangeEquip','ActionCountCostFmt','cursorPagedown','548815qgSlGh','ftbFreeRangeSwitch','index','setUnit','addBuff','Window_Base_drawItemNumber','textWidth','average\x20agi','startInputFTB','removeBuff','close','imageSmoothingEnabled','_FTB_COST_SHOW_0','1303741WOYPZn','updateTurn','BattleManager_makeActionOrders','_passedTurnFTB','getBattleSystem','setMaxActionsFTB','appear','ActionCountFull','GenerateBase','addState','ftbActionPointsFull','Window_Selectable_cursorPageup','isFTB','total\x20agi','ActionsRemainingOffsetY','ScreenBufferY','Enemy','updateStateTurnsFTB','hitIndex','_FTB_MIN_ACTIONS','exit','Game_Battler_onTurnEnd','EnemyOffsetX','BattleManager_processTurn','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','indexOf','_partyCommandWindow','ImageSize','friendsUnit','_subject','battleSys','ftbActionPointsAbbr','members','_storedBitmaps','clear','parameters','_logWindow','createContentsArray','_ftbTeamEven','passTurnFTB','_preemptive','getMaxActionsFTB','_FTB_GUARD_PASS','addDebuff','ftbPartyTeamShift','Scene_Battle_commandCancel','processTouchFTB','Game_Battler_removeBuff','battleEnd','cancel','83183dlJQGm','_FTB_COST_SHOW_1','stepForward','agility','439846tlLpZF','804359BmrsMO','ftbLowestAgility','_phase','_surprise','Window_Help_setItem','Game_System_initialize','refresh','drawTextEx','createStartingCoordinates','loadPicture','gainCurrentActionsFTB','EmptyActionPicture','drawImage','Nothing','version','clearPassTurnFTB','_bypassStateTurnUpdatesFTB','updatePadding','reduceActionsFTB','ARRAYSTRUCT','AgiBuff','_scene','_context','fontSize','_ftbPartyActionCountWindow','createAllWindows','ARRAYEVAL','updateVisibility','clearStates','useItem','_FTB_ACTION_BASE','ARRAYNUM','isDrawItemNumber','random','Game_BattlerBase_hide','cursorLeft','CostPosition','4oZXfdM','ARRAYJSON','PartyTeamShiftFmt','resetFontSettings','startTurnFTB','LoseDiff','RepositionTopHelpY','selectNextActor','STRUCT','Game_Enemy_transform','Window_Selectable_cursorPagedown','Mechanics','ActionCountAbbr','contents','Game_Action_applyGlobal','initMembers','isTriggered','isOpen','blt','includes','sort','commandCancelFTB','_FTB_KEEP_PREV_ACTOR','getCurrentActionsFTB','_FTB_ACTION_AGI_DEBUFF','drawText','canActFTB','canActorBeSelectedFTB','BattleManager_setup','makeActionOrders','BattleManager_endAllBattlersTurn','registerCommand','BattleManager_endAction','Game_Actor_releaseUnequippableItems','drawActionsRemaining','max','createActorCommandWindow','match','_FTB_NEUTRAL_TURN_ADVANTAGE','randomInt','_FTB_ACTION_OVERFLOW','Game_Battler_useItem','_handlers','changeClass','ftb%1ActionsIcon','call','EVAL','ActionsRemainingFontSize','IconSet','innerHeight','length','_FTB_MAX_ACTIONS','clamp','endTurnFTB','Window_Selectable_cursorLeft','applyGlobal','screenX','_ftbActionsMax','_forcedBattlers','concat','BattleManager_startTurn','onTouchSelectFTB','canUse','isPassingTurnFTB','enemies','_ftbActionCountVisible','releaseUnequippableItems','getNextSubject','endAction','Window_Base_makeAdditionalSkillCostText','_FTB_BETWEEN_TEAMS_WAIT','_doubleTouch','startInput','battleMembers','unshift','waitCount','ftbSwitchActorDirection','floor','Settings','MinActions','visible','initMembersFTB','processTurnFTB','processTurn','format','Game_Battler_addDebuff','FUNC','EmptyActionsIcon','ShowCostForGuard','endTurn','drawItemNumber','ActorOffsetX','_ftbTeamOdd','makeAdditionalCostTextFTB','isBattleSystemFTBActionCountVisible','_FTB_COST_POSITION','removeActionBattlersFTB','loadSystem','Current','Game_BattlerBase_clearStates','drawItemNumberFTB','BattleManager_startInput','_buffs','NeutralAdvantage','Scene_Battle_commandFight','opacity','select','BattleManager_startBattle','endAllBattlersTurn','startBattle','RepositionTopForHelp','setText','initBattleSystemFTB','Scene_Battle_createActorCommandWindow','hide','startBattleFTB','ActionPointTraitPlus','_ftbActionsCur','guardSkillId','Game_BattlerBase_updateStateTurns','ActionPointCost','name','_windowLayer','setup','processTouch','toLowerCase','ActorActionPicture','aliveMembers','drawBigIcon','ftbEnemyActionsIcon','_FTB_STATE_BUFF_TURN_UPDATES_ONLY_ON_OPPONENT_TURNS','removeState','ActionCountDisplay','innerWidth','ftbTotalAgility','actors','finishActorInput','performCollapse','startActorCommandSelection','isSkill','983078hlKzPB','map','IconSmoothing','_FTB_FREE_CHANGE','isSceneBattle','subject','Game_Actor_changeClass','FTB','EnemyActionsIcon','makeAdditionalSkillCostText','Window_Selectable_cursorRight','center','createActionsFTB','getChildIndex','General','shift','lowest\x20agi','isActiveTpb','Game_Actor_changeEquipById','update','_inBattle','push','_actionBattlers','drawPicture','processSwitchActors','skillCostSeparator','EnemyActionPicture','setItem','playCursorSound','filter','startTurn','makeActionOrdersFTB','ItemQuantityFontSize','ftbActionCount','GuardPass','ConvertParams','changeEquipById','ScreenBufferX','Game_Actor_forceChangeEquip','maxCols','_actorCommandWindow','cursorPageup','canDrawActionsRemaining','_ftbCurrentUnit','BottomPosition','status','isTpb','Game_Actor_selectNextCommand','EnemyOffsetY','Scene_Battle_createAllWindows','1syGtiq','_FTB_ACTION_AGI_BUFF','_FTB_RECALC_SUB_DIFF','meetEndTurnConditionsFTB','GainDiff','Game_Action_speed','_currentActor','height','stepBack','windowRect','speed','_unit','attackSkillId','getActionCostFTB','Show_1_Action_Cost','ftbActorActionsIcon','BattleManager_selectNextActor','payActionCostFTB','item','Game_Battler_addState','_action','Game_BattlerBase_updateBuffTurns','canMove','onTurnEnd','recalculateActionsFTB','repositionLogWindowFTB','numItems','ftbCreateTeamSwitchText','ftbCostFormat','Empty','ftbEmptyActionsIcon','applyGlobalFTB','padding','_FTB_COST_SHOW_GUARD','checkNeedsUpdate','_FTB_COST_SHOW_ATTACK','performTurnEndFTB','discardEquip','min','Game_Actor_changeEquip','cursorRight','agi','updateStateTurns','createActionCountWindowsFTB','302465WcWayQ','_ftbTurnAdvantageUnit','Game_Actor_discardEquip','note','Game_BattlerBase_canUse','DrawActionsRemaining','transform','player','_forceAction','_ftbTroopActionCountWindow','BattleSystemFTB','_maxActions','Actor','trim','HideActionPointCost','canInput','ftbHighestAgility','%1ActionPicture','create','startActorInput','AllowOverflow','prototype','BattleManager_battleSys','KeepPrevActor','Game_Battler_removeState','startDamagePopup','changeEquip','isActor'];const _0x2d2d=function(_0x1806ad,_0x5373e6){_0x1806ad=_0x1806ad-0x1b9;let _0x290db2=_0x290d[_0x1806ad];return _0x290db2;};const _0x245ac7=_0x2d2d;(function(_0x4af9a3,_0x11014b){const _0x37f334=_0x2d2d;while(!![]){try{const _0x185fe1=-parseInt(_0x37f334(0x247))+parseInt(_0x37f334(0x28c))+-parseInt(_0x37f334(0x2cf))+parseInt(_0x37f334(0x2d0))+parseInt(_0x37f334(0x2cb))*-parseInt(_0x37f334(0x2f5))+-parseInt(_0x37f334(0x1e9))+parseInt(_0x37f334(0x21b))*parseInt(_0x37f334(0x299));if(_0x185fe1===_0x11014b)break;else _0x4af9a3['push'](_0x4af9a3['shift']());}catch(_0x5ad771){_0x4af9a3['push'](_0x4af9a3['shift']());}}}(_0x290d,0x9230a));var label=_0x245ac7(0x251),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x245ac7(0x206)](function(_0x56398a){const _0x278ee0=_0x245ac7;return _0x56398a[_0x278ee0(0x216)]&&_0x56398a['description'][_0x278ee0(0x308)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x2b9c8b,_0x5258ee){const _0x3f9460=_0x245ac7;for(const _0x559bf3 in _0x5258ee){if(_0x559bf3[_0x3f9460(0x31a)](/(.*):(.*)/i)){const _0x2c9602=String(RegExp['$1']),_0x1e25a0=String(RegExp['$2'])['toUpperCase']()[_0x3f9460(0x254)]();let _0x80d09a,_0x3c23b2,_0x253842;switch(_0x1e25a0){case _0x3f9460(0x279):_0x80d09a=_0x5258ee[_0x559bf3]!==''?Number(_0x5258ee[_0x559bf3]):0x0;break;case _0x3f9460(0x2ef):_0x3c23b2=_0x5258ee[_0x559bf3]!==''?JSON['parse'](_0x5258ee[_0x559bf3]):[],_0x80d09a=_0x3c23b2['map'](_0x1463c4=>Number(_0x1463c4));break;case _0x3f9460(0x323):_0x80d09a=_0x5258ee[_0x559bf3]!==''?eval(_0x5258ee[_0x559bf3]):null;break;case _0x3f9460(0x2ea):_0x3c23b2=_0x5258ee[_0x559bf3]!==''?JSON[_0x3f9460(0x27f)](_0x5258ee[_0x559bf3]):[],_0x80d09a=_0x3c23b2['map'](_0x17f35f=>eval(_0x17f35f));break;case'JSON':_0x80d09a=_0x5258ee[_0x559bf3]!==''?JSON[_0x3f9460(0x27f)](_0x5258ee[_0x559bf3]):'';break;case _0x3f9460(0x2f6):_0x3c23b2=_0x5258ee[_0x559bf3]!==''?JSON[_0x3f9460(0x27f)](_0x5258ee[_0x559bf3]):[],_0x80d09a=_0x3c23b2[_0x3f9460(0x1ea)](_0x3ec82a=>JSON['parse'](_0x3ec82a));break;case _0x3f9460(0x34b):_0x80d09a=_0x5258ee[_0x559bf3]!==''?new Function(JSON[_0x3f9460(0x27f)](_0x5258ee[_0x559bf3])):new Function(_0x3f9460(0x285));break;case'ARRAYFUNC':_0x3c23b2=_0x5258ee[_0x559bf3]!==''?JSON[_0x3f9460(0x27f)](_0x5258ee[_0x559bf3]):[],_0x80d09a=_0x3c23b2[_0x3f9460(0x1ea)](_0x1c9b88=>new Function(JSON[_0x3f9460(0x27f)](_0x1c9b88)));break;case'STR':_0x80d09a=_0x5258ee[_0x559bf3]!==''?String(_0x5258ee[_0x559bf3]):'';break;case'ARRAYSTR':_0x3c23b2=_0x5258ee[_0x559bf3]!==''?JSON[_0x3f9460(0x27f)](_0x5258ee[_0x559bf3]):[],_0x80d09a=_0x3c23b2[_0x3f9460(0x1ea)](_0x160cbe=>String(_0x160cbe));break;case _0x3f9460(0x2fd):_0x253842=_0x5258ee[_0x559bf3]!==''?JSON[_0x3f9460(0x27f)](_0x5258ee[_0x559bf3]):{},_0x80d09a=VisuMZ[_0x3f9460(0x20c)]({},_0x253842);break;case _0x3f9460(0x2e3):_0x3c23b2=_0x5258ee[_0x559bf3]!==''?JSON[_0x3f9460(0x27f)](_0x5258ee[_0x559bf3]):[],_0x80d09a=_0x3c23b2[_0x3f9460(0x1ea)](_0x2cbd7b=>VisuMZ['ConvertParams']({},JSON[_0x3f9460(0x27f)](_0x2cbd7b)));break;default:continue;}_0x2b9c8b[_0x2c9602]=_0x80d09a;}}return _0x2b9c8b;},(_0x5e2339=>{const _0x58e837=_0x245ac7,_0x15650b=_0x5e2339[_0x58e837(0x1d6)];for(const _0x191431 of dependencies){if(!Imported[_0x191431]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x58e837(0x349)](_0x15650b,_0x191431)),SceneManager[_0x58e837(0x2ad)]();break;}}const _0x56e0f8=_0x5e2339['description'];if(_0x56e0f8[_0x58e837(0x31a)](/\[Version[ ](.*?)\]/i)){const _0x40999e=Number(RegExp['$1']);_0x40999e!==VisuMZ[label][_0x58e837(0x2de)]&&(alert(_0x58e837(0x283)['format'](_0x15650b,_0x40999e)),SceneManager[_0x58e837(0x2ad)]());}if(_0x56e0f8['match'](/\[Tier[ ](\d+)\]/i)){const _0x17e235=Number(RegExp['$1']);_0x17e235<tier?(alert(_0x58e837(0x2b1)[_0x58e837(0x349)](_0x15650b,_0x17e235,tier)),SceneManager[_0x58e837(0x2ad)]()):tier=Math[_0x58e837(0x318)](_0x17e235,tier);}VisuMZ[_0x58e837(0x20c)](VisuMZ[label]['Settings'],_0x5e2339[_0x58e837(0x2bc)]);})(pluginData),PluginManager[_0x245ac7(0x314)](pluginData[_0x245ac7(0x1d6)],_0x245ac7(0x282),_0x3199e6=>{VisuMZ['ConvertParams'](_0x3199e6,_0x3199e6);const _0x2cdf2c=_0x3199e6['Visible'];$gameSystem['setBattleSystemFTBActionCountVisible'](_0x2cdf2c);}),VisuMZ['BattleSystemFTB'][_0x245ac7(0x275)]={'ActionPointCost':/<FTB (?:FP|ACTION) COST:[ ](\d+)>/i,'HideActionPointCost':/<FTB HIDE (?:FP|ACTION) COST>/i,'PassTurn':/<FTB PASS TURN>/i,'ActionPointTraitPlus':/<FTB (?:FP|ACTION|ACTIONS):[ ]([\+\-]\d+)>/i},DataManager[_0x245ac7(0x228)]=function(_0x103bcb){const _0x35de50=_0x245ac7;if(!_0x103bcb)return 0x0;const _0x361e43=VisuMZ[_0x35de50(0x251)][_0x35de50(0x343)][_0x35de50(0x300)],_0x4a2b84=VisuMZ[_0x35de50(0x251)][_0x35de50(0x275)],_0x2a6d1e=_0x103bcb[_0x35de50(0x24a)];if(_0x2a6d1e[_0x35de50(0x31a)](_0x4a2b84[_0x35de50(0x1d5)]))return Number(RegExp['$1']);else{if(DataManager['isSkill'](_0x103bcb))return _0x361e43['DefaultCostSkill'];else return DataManager['isItem'](_0x103bcb)?_0x361e43[_0x35de50(0x265)]:0x0;}},ImageManager[_0x245ac7(0x22a)]=VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x343)][_0x245ac7(0x1f7)]['ActorActionsIcon'],ImageManager[_0x245ac7(0x1de)]=VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x343)][_0x245ac7(0x1f7)][_0x245ac7(0x1f1)],ImageManager[_0x245ac7(0x239)]=VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x343)][_0x245ac7(0x1f7)][_0x245ac7(0x34c)],TextManager[_0x245ac7(0x2a3)]=VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x343)][_0x245ac7(0x1f7)][_0x245ac7(0x2a0)],TextManager[_0x245ac7(0x2b8)]=VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x343)][_0x245ac7(0x1f7)][_0x245ac7(0x301)],TextManager['ftbCostFormat']=VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x343)][_0x245ac7(0x1f7)][_0x245ac7(0x28a)],TextManager['ftbPartyTeamShift']=VisuMZ['BattleSystemFTB'][_0x245ac7(0x343)][_0x245ac7(0x1f7)][_0x245ac7(0x2f7)],TextManager['ftbTroopTeamShift']=VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x343)][_0x245ac7(0x1f7)]['TroopTeamShiftFmt'],SceneManager[_0x245ac7(0x1ed)]=function(){const _0x3f4744=_0x245ac7;return this[_0x3f4744(0x2e5)]&&this[_0x3f4744(0x2e5)][_0x3f4744(0x26f)]===Scene_Battle;},BattleManager[_0x245ac7(0x1ec)]=VisuMZ[_0x245ac7(0x251)]['Settings'][_0x245ac7(0x300)]['FreeChange'],BattleManager[_0x245ac7(0x30b)]=VisuMZ[_0x245ac7(0x251)]['Settings'][_0x245ac7(0x300)][_0x245ac7(0x25e)],BattleManager[_0x245ac7(0x2c3)]=VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x343)][_0x245ac7(0x300)][_0x245ac7(0x20b)],BattleManager[_0x245ac7(0x269)]=VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x343)][_0x245ac7(0x300)][_0x245ac7(0x21f)],BattleManager['_FTB_RECALC_SUB_DIFF']=VisuMZ['BattleSystemFTB'][_0x245ac7(0x343)][_0x245ac7(0x300)][_0x245ac7(0x2fa)],BattleManager[_0x245ac7(0x31b)]=VisuMZ['BattleSystemFTB']['Settings'][_0x245ac7(0x300)][_0x245ac7(0x1c4)],BattleManager['_FTB_BETWEEN_TEAMS_WAIT']=VisuMZ['BattleSystemFTB'][_0x245ac7(0x343)][_0x245ac7(0x1f7)]['TeamShiftWait'],BattleManager[_0x245ac7(0x1df)]=VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x343)]['Mechanics']['StateBuffUpdate'],VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x25d)]=BattleManager['battleSys'],BattleManager[_0x245ac7(0x2b7)]=function(){const _0x2781eb=_0x245ac7;if(this[_0x2781eb(0x2a5)]())return _0x2781eb(0x1f0);return VisuMZ[_0x2781eb(0x251)][_0x2781eb(0x25d)]['call'](this);},BattleManager['isFTB']=function(){const _0x3fa2c8=_0x245ac7;return $gameSystem[_0x3fa2c8(0x29d)]()===_0x3fa2c8(0x1f0);},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x27b)]=BattleManager[_0x245ac7(0x217)],BattleManager[_0x245ac7(0x217)]=function(){const _0x2470d5=_0x245ac7;if(this['isFTB']())return![];return VisuMZ[_0x2470d5(0x251)][_0x2470d5(0x27b)]['call'](this);},VisuMZ[_0x245ac7(0x251)]['BattleManager_isActiveTpb']=BattleManager[_0x245ac7(0x1fa)],BattleManager[_0x245ac7(0x1fa)]=function(){const _0x65e76f=_0x245ac7;if(this['isFTB']())return![];return VisuMZ[_0x65e76f(0x251)]['BattleManager_isActiveTpb'][_0x65e76f(0x322)](this);},VisuMZ['BattleSystemFTB'][_0x245ac7(0x264)]=BattleManager[_0x245ac7(0x268)],BattleManager[_0x245ac7(0x268)]=function(){const _0x2c3703=_0x245ac7;if(this['isFTB']())return!![];return VisuMZ[_0x2c3703(0x251)][_0x2c3703(0x264)][_0x2c3703(0x322)](this);},VisuMZ['BattleSystemFTB'][_0x245ac7(0x1c2)]=BattleManager[_0x245ac7(0x33d)],BattleManager[_0x245ac7(0x33d)]=function(){const _0xa3034b=_0x245ac7;if(this[_0xa3034b(0x2a5)]())this[_0xa3034b(0x2d3)]=![];VisuMZ['BattleSystemFTB'][_0xa3034b(0x1c2)][_0xa3034b(0x322)](this);if(this[_0xa3034b(0x2a5)]()&&$gameParty['canInput']())this[_0xa3034b(0x294)]();},BattleManager[_0x245ac7(0x294)]=function(){const _0x1c6a5c=_0x245ac7;this[_0x1c6a5c(0x207)]();},VisuMZ[_0x245ac7(0x251)]['BattleManager_processTurn']=BattleManager[_0x245ac7(0x348)],BattleManager['processTurn']=function(){const _0x5229a8=_0x245ac7;this[_0x5229a8(0x2a5)]()?this['processTurnFTB']():VisuMZ[_0x5229a8(0x251)][_0x5229a8(0x2b0)][_0x5229a8(0x322)](this);},BattleManager[_0x245ac7(0x347)]=function(){const _0x4fa440=_0x245ac7,_0x5cf0af=this[_0x4fa440(0x2b6)];if(_0x5cf0af&&!_0x5cf0af[_0x4fa440(0x2b5)]()[_0x4fa440(0x30f)]())this['endAction'](),this[_0x4fa440(0x2b6)]=null,this[_0x4fa440(0x29a)](![]);else{if(_0x5cf0af&&_0x5cf0af[_0x4fa440(0x262)]()&&_0x5cf0af[_0x4fa440(0x256)]()){const _0x2b1d2d=_0x5cf0af['currentAction']();if(!_0x2b1d2d)VisuMZ[_0x4fa440(0x251)][_0x4fa440(0x2b0)][_0x4fa440(0x322)](this);else _0x2b1d2d[_0x4fa440(0x24f)]?VisuMZ['BattleSystemFTB'][_0x4fa440(0x2b0)][_0x4fa440(0x322)](this):(this['_currentActor']=_0x5cf0af,this[_0x4fa440(0x25a)]());}else VisuMZ[_0x4fa440(0x251)][_0x4fa440(0x2b0)]['call'](this);}},VisuMZ[_0x245ac7(0x251)]['BattleManager_finishActorInput']=BattleManager[_0x245ac7(0x1e5)],BattleManager[_0x245ac7(0x1e5)]=function(){const _0x3b66b2=_0x245ac7;this[_0x3b66b2(0x2a5)]()?VisuMZ[_0x3b66b2(0x251)]['BattleManager_processTurn'][_0x3b66b2(0x322)](this):VisuMZ[_0x3b66b2(0x251)]['BattleManager_finishActorInput'][_0x3b66b2(0x322)](this);},VisuMZ[_0x245ac7(0x251)]['BattleManager_selectNextActor']=BattleManager[_0x245ac7(0x2fc)],BattleManager[_0x245ac7(0x2fc)]=function(){const _0x4245a3=_0x245ac7;this['isFTB']()?this[_0x4245a3(0x27a)]():VisuMZ[_0x4245a3(0x251)][_0x4245a3(0x22b)][_0x4245a3(0x322)](this);},BattleManager[_0x245ac7(0x27a)]=function(){const _0x18125a=_0x245ac7;this[_0x18125a(0x221)]=null,this['_inputting']=![];},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x315)]=BattleManager[_0x245ac7(0x339)],BattleManager['endAction']=function(){const _0x1ce819=_0x245ac7,_0x1a5796=this['_subject'];VisuMZ['BattleSystemFTB'][_0x1ce819(0x315)]['call'](this),this[_0x1ce819(0x271)](_0x1a5796);},BattleManager['endActionFTB']=function(_0x537a83){const _0x4cf356=_0x245ac7;if(!this[_0x4cf356(0x2a5)]())return;_0x537a83&&_0x537a83['makeActions']();if(this[_0x4cf356(0x32f)][_0x4cf356(0x327)]>0x0)this['_subject']&&(!this[_0x4cf356(0x1ff)][_0x4cf356(0x308)](this['_subject'])&&this['_actionBattlers']['unshift'](this[_0x4cf356(0x2b6)])),this[_0x4cf356(0x2b6)]=this[_0x4cf356(0x338)]();else this[_0x4cf356(0x288)](_0x537a83)&&(this[_0x4cf356(0x2b6)]=_0x537a83);},BattleManager['keepPrevSubjectFTB']=function(_0x119c3e){const _0x647fe2=_0x245ac7;if(!_0x119c3e)return![];if(!_0x119c3e[_0x647fe2(0x262)]())return![];if(!_0x119c3e[_0x647fe2(0x231)]())return![];if(!_0x119c3e[_0x647fe2(0x256)]())return![];if(_0x119c3e[_0x647fe2(0x334)]())return![];return BattleManager['_FTB_FREE_CHANGE']&&BattleManager['_FTB_KEEP_PREV_ACTOR'];},VisuMZ['BattleSystemFTB']['BattleManager_startBattle']=BattleManager['startBattle'],BattleManager[_0x245ac7(0x1ca)]=function(){const _0x66f30b=_0x245ac7;VisuMZ['BattleSystemFTB'][_0x66f30b(0x1c8)][_0x66f30b(0x322)](this),this['startBattleFTB']();},BattleManager[_0x245ac7(0x1d0)]=function(){const _0x3b2c6f=_0x245ac7;if(!this[_0x3b2c6f(0x2a5)]())return;if(this[_0x3b2c6f(0x2c1)])this[_0x3b2c6f(0x248)]=_0x3b2c6f(0x1e4);else this[_0x3b2c6f(0x2d3)]?this[_0x3b2c6f(0x248)]='enemies':this[_0x3b2c6f(0x248)]=BattleManager[_0x3b2c6f(0x31b)];this[_0x3b2c6f(0x248)]=this[_0x3b2c6f(0x248)]||_0x3b2c6f(0x2f1);let _0x1258ff=0x0,_0xb00ff3=0x0;switch(this[_0x3b2c6f(0x248)][_0x3b2c6f(0x1da)]()['trim']()){case _0x3b2c6f(0x2f1):let _0x3000d5=[_0x3b2c6f(0x1e4),_0x3b2c6f(0x335)];this[_0x3b2c6f(0x248)]=_0x3000d5[Math[_0x3b2c6f(0x31c)](_0x3000d5[_0x3b2c6f(0x327)])];break;case _0x3b2c6f(0x24e):this[_0x3b2c6f(0x248)]=_0x3b2c6f(0x1e4);break;case'enemy':this['_ftbTurnAdvantageUnit']=_0x3b2c6f(0x335);break;case _0x3b2c6f(0x1f9):_0x1258ff=$gameParty['ftbLowestAgility'](),_0xb00ff3=$gameTroop[_0x3b2c6f(0x2d1)](),this[_0x3b2c6f(0x248)]=_0x1258ff>=_0xb00ff3?_0x3b2c6f(0x1e4):_0x3b2c6f(0x335);break;case _0x3b2c6f(0x293):_0x1258ff=$gameParty[_0x3b2c6f(0x2ce)](),_0xb00ff3=$gameTroop[_0x3b2c6f(0x2ce)](),this[_0x3b2c6f(0x248)]=_0x1258ff>=_0xb00ff3?'actors':'enemies';break;case'highest\x20agi':_0x1258ff=$gameParty['ftbHighestAgility'](),_0xb00ff3=$gameTroop[_0x3b2c6f(0x257)](),this['_ftbTurnAdvantageUnit']=_0x1258ff>=_0xb00ff3?_0x3b2c6f(0x1e4):_0x3b2c6f(0x335);break;case _0x3b2c6f(0x2a6):_0x1258ff=$gameParty[_0x3b2c6f(0x1e3)](),_0xb00ff3=$gameTroop[_0x3b2c6f(0x1e3)](),this[_0x3b2c6f(0x248)]=_0x1258ff>=_0xb00ff3?_0x3b2c6f(0x1e4):'enemies';break;}this[_0x3b2c6f(0x1b9)]=this[_0x3b2c6f(0x248)]===_0x3b2c6f(0x1e4)?$gameParty:$gameTroop,this[_0x3b2c6f(0x2bf)]=this[_0x3b2c6f(0x248)]===_0x3b2c6f(0x1e4)?$gameTroop:$gameParty;},VisuMZ[_0x245ac7(0x251)]['BattleManager_makeActionOrders']=BattleManager[_0x245ac7(0x312)],BattleManager[_0x245ac7(0x312)]=function(){const _0x2bbf2a=_0x245ac7;this['isFTB']()?this[_0x2bbf2a(0x208)]():VisuMZ[_0x2bbf2a(0x251)][_0x2bbf2a(0x29b)]['call'](this);},BattleManager[_0x245ac7(0x208)]=function(){const _0x20641f=_0x245ac7;let _0x568d5c=[],_0x4eb734=[],_0x14972e=0x0;const _0x2146f9=$gameTroop['turnCount']();let _0x5e9236=_0x2146f9%0x2===0x0?this['_ftbTeamEven']:this[_0x20641f(0x1b9)];this['_ftbCurrentUnit']=_0x5e9236;if(_0x5e9236===$gameParty){let _0x441048=$gameParty['aliveMembers']()['filter'](_0x3f16a2=>_0x3f16a2[_0x20641f(0x231)]()&&!_0x3f16a2['canInput']()),_0x32454e=$gameParty['aliveMembers']()[_0x20641f(0x206)](_0x47bbbd=>_0x47bbbd[_0x20641f(0x231)]()&&_0x47bbbd[_0x20641f(0x256)]());_0x568d5c=_0x568d5c[_0x20641f(0x330)](_0x441048),_0x14972e=Game_Unit[_0x20641f(0x328)];while(_0x14972e--){_0x568d5c=_0x568d5c[_0x20641f(0x330)](_0x32454e);}_0x14972e=Game_Unit[_0x20641f(0x328)]-0x1;while(_0x14972e--){_0x568d5c=_0x568d5c['concat'](_0x441048);}}if(_0x5e9236===$gameTroop){let _0xa571f1=$gameTroop[_0x20641f(0x1dc)]()[_0x20641f(0x206)](_0x4cfe60=>_0x4cfe60[_0x20641f(0x231)]());$gameSystem['isSideView']()?_0xa571f1[_0x20641f(0x309)]((_0x48186c,_0x24b4be)=>_0x24b4be[_0x20641f(0x32d)]()-_0x48186c[_0x20641f(0x32d)]()):_0xa571f1[_0x20641f(0x309)]((_0x344005,_0x2ba51a)=>_0x344005[_0x20641f(0x32d)]()-_0x2ba51a[_0x20641f(0x32d)]());_0x14972e=Game_Unit[_0x20641f(0x328)];while(_0x14972e--){_0x4eb734=_0x4eb734[_0x20641f(0x330)](_0xa571f1);}$gameTroop[_0x20641f(0x263)]();}this[_0x20641f(0x1ff)]=_0x568d5c[_0x20641f(0x330)](_0x4eb734);},BattleManager[_0x245ac7(0x1bd)]=function(){const _0x25112b=_0x245ac7;if(!this['isFTB']())return;this[_0x25112b(0x1ff)]=this[_0x25112b(0x1ff)]||[],this[_0x25112b(0x1ff)]=this[_0x25112b(0x1ff)][_0x25112b(0x206)](_0xf26e72=>_0xf26e72[_0x25112b(0x231)]()&&!_0xf26e72[_0x25112b(0x334)]());},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x311)]=BattleManager[_0x245ac7(0x1d8)],BattleManager[_0x245ac7(0x1d8)]=function(_0x3ee397,_0xe9c9fc,_0x3ab5b8){const _0x529712=_0x245ac7;VisuMZ['BattleSystemFTB'][_0x529712(0x311)][_0x529712(0x322)](this,_0x3ee397,_0xe9c9fc,_0x3ab5b8),this[_0x529712(0x346)]();},BattleManager[_0x245ac7(0x346)]=function(){const _0x12520b=_0x245ac7;if(!BattleManager[_0x12520b(0x2a5)]())return;this[_0x12520b(0x214)]=undefined,$gameParty['startTurnFTB'](),$gameTroop[_0x12520b(0x2f9)]();},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x331)]=BattleManager['startTurn'],BattleManager[_0x245ac7(0x207)]=function(){const _0x479164=_0x245ac7;this[_0x479164(0x2f9)](),VisuMZ[_0x479164(0x251)][_0x479164(0x331)][_0x479164(0x322)](this),this['ftbCreateTeamSwitchText']();},BattleManager[_0x245ac7(0x2f9)]=function(){const _0x2cf54a=_0x245ac7;if(!BattleManager[_0x2cf54a(0x2a5)]())return;$gameParty[_0x2cf54a(0x2df)](),$gameTroop[_0x2cf54a(0x2df)]();const _0x50addb=$gameTroop['turnCount']()+0x1;let _0x291338=_0x50addb%0x2===0x0?this[_0x2cf54a(0x2bf)]:this[_0x2cf54a(0x1b9)],_0x2e281d=_0x50addb%0x2===0x0?this[_0x2cf54a(0x1b9)]:this[_0x2cf54a(0x2bf)];_0x50addb>0x1&&_0x2e281d['performTurnEndFTB'](),_0x291338[_0x2cf54a(0x2aa)](),_0x291338['startTurnFTB']();},VisuMZ['BattleSystemFTB']['BattleManager_endTurn']=BattleManager[_0x245ac7(0x34e)],BattleManager[_0x245ac7(0x34e)]=function(){const _0x1cfbd8=_0x245ac7;VisuMZ[_0x1cfbd8(0x251)]['BattleManager_endTurn'][_0x1cfbd8(0x322)](this),this[_0x1cfbd8(0x32a)]();},BattleManager[_0x245ac7(0x32a)]=function(){const _0x2c3ecb=_0x245ac7;if(!BattleManager[_0x2c3ecb(0x2a5)]())return;},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x313)]=BattleManager[_0x245ac7(0x1c9)],BattleManager[_0x245ac7(0x1c9)]=function(){const _0x2af621=_0x245ac7;if(this['isFTB']())return;VisuMZ[_0x2af621(0x251)]['BattleManager_endAllBattlersTurn'][_0x2af621(0x322)](this);},BattleManager[_0x245ac7(0x236)]=function(){const _0xa9e194=_0x245ac7;if(!BattleManager[_0xa9e194(0x2a5)]())return;let _0x5aad8c='';if(this[_0xa9e194(0x214)]===$gameParty){let _0x4aa595=$gameParty[_0xa9e194(0x1d6)]();_0x5aad8c=TextManager[_0xa9e194(0x2c5)][_0xa9e194(0x349)](_0x4aa595);}else _0x5aad8c=TextManager[_0xa9e194(0x273)];if(_0x5aad8c!==''){this[_0xa9e194(0x2bd)][_0xa9e194(0x1fe)]('addText',_0x5aad8c);const _0x36b8c5=BattleManager[_0xa9e194(0x33b)];this['_logWindow'][_0xa9e194(0x1fe)](_0xa9e194(0x340),_0x36b8c5),this[_0xa9e194(0x2bd)]['push'](_0xa9e194(0x2bb));}},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x2d5)]=Game_System[_0x245ac7(0x25c)][_0x245ac7(0x281)],Game_System[_0x245ac7(0x25c)][_0x245ac7(0x281)]=function(){const _0x1b5770=_0x245ac7;VisuMZ['BattleSystemFTB']['Game_System_initialize'][_0x1b5770(0x322)](this),this['initBattleSystemFTB']();},Game_System[_0x245ac7(0x25c)][_0x245ac7(0x1cd)]=function(){const _0x204940=_0x245ac7;this[_0x204940(0x336)]=!![];},Game_System[_0x245ac7(0x25c)][_0x245ac7(0x1bb)]=function(){const _0x3cc1df=_0x245ac7;if(BattleManager[_0x3cc1df(0x2d2)]===_0x3cc1df(0x2c9))return![];return this['_ftbActionCountVisible']===undefined&&this['initBattleSystemFTB'](),this['_ftbActionCountVisible'];},Game_System['prototype']['setBattleSystemFTBActionCountVisible']=function(_0xd0dfe3){const _0x2cbb9c=_0x245ac7;this['_ftbActionCountVisible']===undefined&&this[_0x2cbb9c(0x1cd)](),this['_ftbActionCountVisible']=_0xd0dfe3;},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x220)]=Game_Action[_0x245ac7(0x25c)]['speed'],Game_Action[_0x245ac7(0x25c)][_0x245ac7(0x225)]=function(){const _0x333cb4=_0x245ac7;return BattleManager[_0x333cb4(0x2a5)]()?0x0:VisuMZ[_0x333cb4(0x251)][_0x333cb4(0x220)]['call'](this);},VisuMZ['BattleSystemFTB'][_0x245ac7(0x303)]=Game_Action['prototype'][_0x245ac7(0x32c)],Game_Action[_0x245ac7(0x25c)]['applyGlobal']=function(){const _0x1427ca=_0x245ac7;VisuMZ[_0x1427ca(0x251)][_0x1427ca(0x303)][_0x1427ca(0x322)](this),this[_0x1427ca(0x23a)]();},Game_Action[_0x245ac7(0x25c)][_0x245ac7(0x23a)]=function(){const _0x167d84=_0x245ac7;if(!BattleManager[_0x167d84(0x2a5)]())return;if(!this[_0x167d84(0x1ee)]())return;if(!this[_0x167d84(0x22d)]())return;this[_0x167d84(0x1e8)]()&&this[_0x167d84(0x22d)]()['id']===this[_0x167d84(0x1ee)]()[_0x167d84(0x1d3)]()&&(BattleManager[_0x167d84(0x2c3)]&&this[_0x167d84(0x1ee)]()['passTurnFTB']());const _0x2cd57a=VisuMZ[_0x167d84(0x251)][_0x167d84(0x275)],_0x15c6ab=this[_0x167d84(0x22d)]()[_0x167d84(0x24a)];_0x15c6ab[_0x167d84(0x31a)](_0x2cd57a['PassTurn'])&&this['subject']()[_0x167d84(0x2c0)]();},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x2f2)]=Game_BattlerBase[_0x245ac7(0x25c)][_0x245ac7(0x1cf)],Game_BattlerBase[_0x245ac7(0x25c)][_0x245ac7(0x1cf)]=function(){const _0x220504=_0x245ac7;VisuMZ[_0x220504(0x251)]['Game_BattlerBase_hide']['call'](this),BattleManager[_0x220504(0x1bd)](),this['friendsUnit']()[_0x220504(0x233)]();},VisuMZ['BattleSystemFTB']['Game_BattlerBase_appear']=Game_BattlerBase[_0x245ac7(0x25c)][_0x245ac7(0x29f)],Game_BattlerBase[_0x245ac7(0x25c)][_0x245ac7(0x29f)]=function(){const _0xf2d271=_0x245ac7;VisuMZ[_0xf2d271(0x251)]['Game_BattlerBase_appear']['call'](this),BattleManager['removeActionBattlersFTB'](),this[_0xf2d271(0x2b5)]()[_0xf2d271(0x233)]();},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x266)]=Game_Battler[_0x245ac7(0x25c)][_0x245ac7(0x1e6)],Game_Battler[_0x245ac7(0x25c)][_0x245ac7(0x1e6)]=function(){const _0x1d6368=_0x245ac7;VisuMZ['BattleSystemFTB']['Game_Battler_performCollapse']['call'](this),BattleManager['removeActionBattlersFTB'](),this[_0x1d6368(0x2b5)]()[_0x1d6368(0x233)]();},Game_BattlerBase['prototype']['passTurnFTB']=function(){const _0x5cb9be=_0x245ac7;this[_0x5cb9be(0x29c)]=!![],BattleManager[_0x5cb9be(0x1bd)]();},Game_BattlerBase['prototype'][_0x245ac7(0x334)]=function(){const _0x10a461=_0x245ac7;return!!this[_0x10a461(0x29c)];},Game_BattlerBase['_FTB_ACTION_BASE']=VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x343)][_0x245ac7(0x300)][_0x245ac7(0x2a1)],Game_BattlerBase['_FTB_ACTION_AGI_BUFF']=VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x343)][_0x245ac7(0x300)][_0x245ac7(0x2e4)],Game_BattlerBase[_0x245ac7(0x30d)]=VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x343)][_0x245ac7(0x300)]['AgiDebuff'],Game_BattlerBase['prototype'][_0x245ac7(0x20a)]=function(){const _0x4f2fff=_0x245ac7;let _0x5235f4=Game_BattlerBase[_0x4f2fff(0x2ee)];if(this['_buffs']===undefined)this['clearBuffs']();const _0x461b7=this[_0x4f2fff(0x1c3)][0x6]||0x0;if(_0x461b7>0x0&&Game_BattlerBase[_0x4f2fff(0x21c)])_0x5235f4+=_0x461b7;else _0x461b7<0x0&&Game_BattlerBase[_0x4f2fff(0x30d)]&&(_0x5235f4+=_0x461b7);const _0x563c47=VisuMZ[_0x4f2fff(0x251)][_0x4f2fff(0x275)],_0x5f5e6c=this[_0x4f2fff(0x26e)]();for(const _0x5769c8 of _0x5f5e6c){if(!_0x5769c8)continue;const _0x3a68b0=_0x5769c8[_0x4f2fff(0x24a)];_0x3a68b0[_0x4f2fff(0x31a)](_0x563c47[_0x4f2fff(0x1d1)])&&(_0x5235f4+=Number(RegExp['$1']));}return Math[_0x4f2fff(0x318)](0x0,_0x5235f4);},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x1c0)]=Game_BattlerBase[_0x245ac7(0x25c)][_0x245ac7(0x2ec)],Game_BattlerBase[_0x245ac7(0x25c)]['clearStates']=function(){const _0x563e21=_0x245ac7;VisuMZ[_0x563e21(0x251)][_0x563e21(0x1c0)][_0x563e21(0x322)](this),this['friendsUnit']()[_0x563e21(0x233)]();},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x24b)]=Game_BattlerBase[_0x245ac7(0x25c)][_0x245ac7(0x333)],Game_BattlerBase[_0x245ac7(0x25c)][_0x245ac7(0x333)]=function(_0x2c7c75){const _0x548900=_0x245ac7;if(BattleManager[_0x548900(0x2a5)]()){const _0x17d60f=DataManager[_0x548900(0x228)](_0x2c7c75);if(_0x17d60f>this['friendsUnit']()[_0x548900(0x30c)]())return![];}return VisuMZ[_0x548900(0x251)][_0x548900(0x24b)]['call'](this,_0x2c7c75);},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x31e)]=Game_Battler[_0x245ac7(0x25c)][_0x245ac7(0x2ed)],Game_Battler[_0x245ac7(0x25c)][_0x245ac7(0x2ed)]=function(_0xbe0bea){const _0x37618d=_0x245ac7;VisuMZ['BattleSystemFTB'][_0x37618d(0x31e)]['call'](this,_0xbe0bea),this[_0x37618d(0x22c)](_0xbe0bea);},Game_Battler[_0x245ac7(0x25c)][_0x245ac7(0x22c)]=function(_0x558e2f){const _0xda6aa4=_0x245ac7;if(!_0x558e2f)return;if(!SceneManager[_0xda6aa4(0x1ed)]())return;if(!BattleManager[_0xda6aa4(0x2a5)]())return;const _0x225816=BattleManager[_0xda6aa4(0x22f)];if(_0x225816&&_0x225816['_forceAction'])return;const _0x3fa894=DataManager[_0xda6aa4(0x228)](_0x558e2f);this[_0xda6aa4(0x2b5)]()[_0xda6aa4(0x2e2)](_0x3fa894);},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x2ae)]=Game_Battler[_0x245ac7(0x25c)]['onTurnEnd'],Game_Battler[_0x245ac7(0x25c)]['onTurnEnd']=function(){const _0x4c44ec=_0x245ac7;this['_bypassStateTurnUpdatesFTB']=BattleManager[_0x4c44ec(0x2a5)]()&&BattleManager[_0x4c44ec(0x1df)],VisuMZ[_0x4c44ec(0x251)][_0x4c44ec(0x2ae)][_0x4c44ec(0x322)](this),delete this[_0x4c44ec(0x2e0)];},VisuMZ['BattleSystemFTB']['Game_BattlerBase_updateStateTurns']=Game_BattlerBase[_0x245ac7(0x25c)][_0x245ac7(0x245)],Game_BattlerBase[_0x245ac7(0x25c)]['updateStateTurns']=function(){const _0x406789=_0x245ac7;if(this['_bypassStateTurnUpdatesFTB'])return;VisuMZ[_0x406789(0x251)][_0x406789(0x1d4)]['call'](this);},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x230)]=Game_BattlerBase[_0x245ac7(0x25c)][_0x245ac7(0x286)],Game_BattlerBase[_0x245ac7(0x25c)]['updateBuffTurns']=function(){const _0x532c8e=_0x245ac7;if(this[_0x532c8e(0x2e0)])return;VisuMZ[_0x532c8e(0x251)][_0x532c8e(0x230)][_0x532c8e(0x322)](this);},VisuMZ['BattleSystemFTB'][_0x245ac7(0x22e)]=Game_Battler[_0x245ac7(0x25c)][_0x245ac7(0x2a2)],Game_Battler[_0x245ac7(0x25c)][_0x245ac7(0x2a2)]=function(_0x1fc1f6){const _0x4ba830=_0x245ac7;VisuMZ[_0x4ba830(0x251)]['Game_Battler_addState'][_0x4ba830(0x322)](this,_0x1fc1f6),this[_0x4ba830(0x2b5)]()[_0x4ba830(0x233)]();},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x25f)]=Game_Battler['prototype'][_0x245ac7(0x1e0)],Game_Battler[_0x245ac7(0x25c)][_0x245ac7(0x1e0)]=function(_0x404c58){const _0x50c15b=_0x245ac7;VisuMZ['BattleSystemFTB'][_0x50c15b(0x25f)]['call'](this,_0x404c58),this[_0x50c15b(0x2b5)]()[_0x50c15b(0x233)]();},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x280)]=Game_Battler[_0x245ac7(0x25c)]['addBuff'],Game_Battler[_0x245ac7(0x25c)][_0x245ac7(0x290)]=function(_0x1dc0fe,_0x5ac284){const _0x355918=_0x245ac7;VisuMZ[_0x355918(0x251)][_0x355918(0x280)][_0x355918(0x322)](this,_0x1dc0fe,_0x5ac284),this[_0x355918(0x2b5)]()[_0x355918(0x233)]();},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x34a)]=Game_Battler[_0x245ac7(0x25c)][_0x245ac7(0x2c4)],Game_Battler[_0x245ac7(0x25c)][_0x245ac7(0x2c4)]=function(_0x54b2ea,_0x2f1b0b){const _0x437b12=_0x245ac7;VisuMZ[_0x437b12(0x251)][_0x437b12(0x34a)][_0x437b12(0x322)](this,_0x54b2ea,_0x2f1b0b),this[_0x437b12(0x2b5)]()['recalculateActionsFTB']();},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x2c8)]=Game_Battler['prototype']['removeBuff'],Game_Battler[_0x245ac7(0x25c)][_0x245ac7(0x295)]=function(_0x2fbfda){const _0x1e32c0=_0x245ac7;VisuMZ[_0x1e32c0(0x251)][_0x1e32c0(0x2c8)][_0x1e32c0(0x322)](this,_0x2fbfda),this['friendsUnit']()[_0x1e32c0(0x233)]();},VisuMZ['BattleSystemFTB'][_0x245ac7(0x218)]=Game_Actor['prototype']['selectNextCommand'],Game_Actor[_0x245ac7(0x25c)]['selectNextCommand']=function(){const _0x5bf3d1=_0x245ac7;if(BattleManager[_0x5bf3d1(0x2a5)]()){if(this[_0x5bf3d1(0x278)]())this[_0x5bf3d1(0x278)]()[_0x5bf3d1(0x2cd)]();return![];}return VisuMZ[_0x5bf3d1(0x251)][_0x5bf3d1(0x218)][_0x5bf3d1(0x322)](this);},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x242)]=Game_Actor[_0x245ac7(0x25c)][_0x245ac7(0x261)],Game_Actor['prototype'][_0x245ac7(0x261)]=function(_0x2bae89,_0xbd2d06){const _0x4ccd95=_0x245ac7;VisuMZ['BattleSystemFTB'][_0x4ccd95(0x242)][_0x4ccd95(0x322)](this,_0x2bae89,_0xbd2d06),this[_0x4ccd95(0x2b5)]()[_0x4ccd95(0x233)]();},VisuMZ[_0x245ac7(0x251)]['Game_Actor_forceChangeEquip']=Game_Actor[_0x245ac7(0x25c)][_0x245ac7(0x289)],Game_Actor[_0x245ac7(0x25c)][_0x245ac7(0x289)]=function(_0x3b5e0c,_0x1bd88b){const _0x4bab83=_0x245ac7;VisuMZ['BattleSystemFTB'][_0x4bab83(0x20f)][_0x4bab83(0x322)](this,_0x3b5e0c,_0x1bd88b),this[_0x4bab83(0x2b5)]()[_0x4bab83(0x233)]();},VisuMZ['BattleSystemFTB'][_0x245ac7(0x1fb)]=Game_Actor[_0x245ac7(0x25c)][_0x245ac7(0x20d)],Game_Actor['prototype'][_0x245ac7(0x20d)]=function(_0xfabeb2,_0x41e939){const _0x5f23cc=_0x245ac7;VisuMZ[_0x5f23cc(0x251)]['Game_Actor_changeEquipById'][_0x5f23cc(0x322)](this,_0xfabeb2,_0x41e939),this[_0x5f23cc(0x2b5)]()[_0x5f23cc(0x233)]();},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x249)]=Game_Actor[_0x245ac7(0x25c)][_0x245ac7(0x240)],Game_Actor[_0x245ac7(0x25c)]['discardEquip']=function(_0x4c7bdd){const _0x2b9106=_0x245ac7;VisuMZ[_0x2b9106(0x251)][_0x2b9106(0x249)]['call'](this,_0x4c7bdd),this[_0x2b9106(0x2b5)]()[_0x2b9106(0x233)]();},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x316)]=Game_Actor['prototype'][_0x245ac7(0x337)],Game_Actor['prototype']['releaseUnequippableItems']=function(_0xd43440){const _0x4c1324=_0x245ac7;VisuMZ[_0x4c1324(0x251)][_0x4c1324(0x316)][_0x4c1324(0x322)](this,_0xd43440),this['friendsUnit']()[_0x4c1324(0x233)]();},VisuMZ[_0x245ac7(0x251)]['Game_Actor_changeClass']=Game_Actor[_0x245ac7(0x25c)][_0x245ac7(0x320)],Game_Actor[_0x245ac7(0x25c)][_0x245ac7(0x320)]=function(_0x2b0c10,_0x23c2e3){const _0x2504fa=_0x245ac7;VisuMZ[_0x2504fa(0x251)][_0x2504fa(0x1ef)][_0x2504fa(0x322)](this,_0x2b0c10,_0x23c2e3),this[_0x2504fa(0x2b5)]()[_0x2504fa(0x233)]();},VisuMZ['BattleSystemFTB'][_0x245ac7(0x2fe)]=Game_Enemy[_0x245ac7(0x25c)][_0x245ac7(0x24d)],Game_Enemy['prototype'][_0x245ac7(0x24d)]=function(_0x8b8111){const _0x7788be=_0x245ac7;VisuMZ[_0x7788be(0x251)][_0x7788be(0x2fe)][_0x7788be(0x322)](this,_0x8b8111),this[_0x7788be(0x2b5)]()[_0x7788be(0x233)]();},Game_Unit[_0x245ac7(0x328)]=VisuMZ[_0x245ac7(0x251)]['Settings'][_0x245ac7(0x300)][_0x245ac7(0x284)],Game_Unit[_0x245ac7(0x2ac)]=VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x343)]['Mechanics'][_0x245ac7(0x344)],Game_Unit[_0x245ac7(0x31d)]=VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x343)][_0x245ac7(0x300)][_0x245ac7(0x25b)],Game_Unit['prototype']['startTurnFTB']=function(){const _0x48b9f4=_0x245ac7;this[_0x48b9f4(0x1f5)](),this[_0x48b9f4(0x270)](this[_0x48b9f4(0x2c2)]());},Game_Unit[_0x245ac7(0x25c)][_0x245ac7(0x1f5)]=function(){const _0x172b79=_0x245ac7;this[_0x172b79(0x1fd)]=!![];let _0x41017f=0x0,_0x542da9=this[_0x172b79(0x1dc)]()[_0x172b79(0x206)](_0x15bd10=>_0x15bd10[_0x172b79(0x231)]());_0x41017f=_0x542da9['reduce']((_0x1495e8,_0xfeb9e5)=>_0x1495e8+_0xfeb9e5[_0x172b79(0x20a)](),_0x41017f),_0x41017f=_0x41017f[_0x172b79(0x329)](Game_Unit[_0x172b79(0x2ac)],Game_Unit[_0x172b79(0x328)]),this[_0x172b79(0x32e)]=_0x41017f;},Game_Unit[_0x245ac7(0x25c)][_0x245ac7(0x233)]=function(){const _0x3450c5=_0x245ac7;if(!BattleManager['isFTB']())return;if(!$gameParty['inBattle']())return;const _0x4682c1=this[_0x3450c5(0x2c2)]();this[_0x3450c5(0x1f5)]();let _0x5ac300=this[_0x3450c5(0x30c)]();const _0x4d60f0=this[_0x3450c5(0x2c2)]()-_0x4682c1;if(BattleManager[_0x3450c5(0x269)]&&_0x4d60f0>0x0)_0x5ac300+=_0x4d60f0;if(BattleManager[_0x3450c5(0x21d)]&&_0x4d60f0<0x0)_0x5ac300+=_0x4d60f0;_0x5ac300=Math[_0x3450c5(0x241)](_0x5ac300,Game_Unit[_0x3450c5(0x328)]),this[_0x3450c5(0x270)](_0x5ac300);},Game_Unit[_0x245ac7(0x25c)]['getCurrentActionsFTB']=function(){return this['_ftbActionsCur']||0x0;},Game_Unit['prototype'][_0x245ac7(0x270)]=function(_0x30449d){const _0x1ebf1b=_0x245ac7;this[_0x1ebf1b(0x1d2)]=Math[_0x1ebf1b(0x267)](_0x30449d)[_0x1ebf1b(0x329)](0x0,Game_Unit[_0x1ebf1b(0x328)]),!Game_Unit[_0x1ebf1b(0x31d)]&&(this[_0x1ebf1b(0x1d2)]=Math[_0x1ebf1b(0x241)](this[_0x1ebf1b(0x1d2)],this['getMaxActionsFTB']()));},Game_Unit[_0x245ac7(0x25c)][_0x245ac7(0x2da)]=function(_0x55457f){const _0xa9056e=_0x245ac7;this[_0xa9056e(0x270)](this[_0xa9056e(0x30c)]()+_0x55457f);},Game_Unit[_0x245ac7(0x25c)]['loseCurrentActionsFTB']=function(_0x40baf4){const _0x5d5b2c=_0x245ac7;this[_0x5d5b2c(0x2da)](-_0x40baf4);},Game_Unit[_0x245ac7(0x25c)][_0x245ac7(0x2c2)]=function(){const _0x19e702=_0x245ac7;return this[_0x19e702(0x32e)]||0x0;},Game_Unit[_0x245ac7(0x25c)][_0x245ac7(0x29e)]=function(_0x54d39f){const _0x3cdd08=_0x245ac7;this[_0x3cdd08(0x32e)]=_0x54d39f['clamp'](Game_Unit[_0x3cdd08(0x2ac)],Game_Unit[_0x3cdd08(0x328)]);},Game_Unit[_0x245ac7(0x25c)][_0x245ac7(0x2e2)]=function(_0x270484){this['loseCurrentActionsFTB'](_0x270484);},Game_Unit[_0x245ac7(0x25c)]['canActFTB']=function(){const _0x134a28=_0x245ac7;return this[_0x134a28(0x1d2)]=this[_0x134a28(0x1d2)]||0x0,this[_0x134a28(0x1d2)]>0x0;},Game_Unit[_0x245ac7(0x25c)][_0x245ac7(0x23f)]=function(){const _0x512ca7=_0x245ac7;for(const _0x216b37 of this[_0x512ca7(0x2b9)]()){if(!_0x216b37)continue;_0x216b37[_0x512ca7(0x232)](),_0x216b37['startDamagePopup']();}},Game_Unit['prototype'][_0x245ac7(0x21e)]=function(){const _0x45a3cc=_0x245ac7;if(this[_0x45a3cc(0x30c)]()<=0x0)return!![];if(!this[_0x45a3cc(0x1dc)]()['some'](_0x173119=>_0x173119[_0x45a3cc(0x231)]()))return!![];return![];},Game_Unit[_0x245ac7(0x25c)][_0x245ac7(0x2aa)]=function(){const _0xcb432c=_0x245ac7;for(const _0x280dcc of this[_0xcb432c(0x2b9)]()){if(!_0x280dcc)continue;_0x280dcc[_0xcb432c(0x245)](),_0x280dcc[_0xcb432c(0x26b)](0x2),_0x280dcc[_0xcb432c(0x286)](),_0x280dcc[_0xcb432c(0x260)]();}},Game_Unit['prototype'][_0x245ac7(0x2df)]=function(){const _0x544815=_0x245ac7;for(const _0x2a9dfd of this[_0x544815(0x2b9)]()){if(!_0x2a9dfd)continue;_0x2a9dfd[_0x544815(0x29c)]=![];}},Game_Unit['prototype'][_0x245ac7(0x2d1)]=function(){const _0x1a0aee=_0x245ac7,_0x5b19bd=this[_0x1a0aee(0x2b9)]();return Math[_0x1a0aee(0x241)](..._0x5b19bd[_0x1a0aee(0x1ea)](_0x15c410=>_0x15c410['agi']));},Game_Unit[_0x245ac7(0x25c)][_0x245ac7(0x257)]=function(){const _0x1018a8=_0x245ac7,_0x37d482=this[_0x1018a8(0x2b9)]();return Math[_0x1018a8(0x318)](..._0x37d482[_0x1018a8(0x1ea)](_0x336bac=>_0x336bac[_0x1018a8(0x244)]));},Game_Unit['prototype'][_0x245ac7(0x1e3)]=function(){const _0xb1117=_0x245ac7,_0x1f8625=this[_0xb1117(0x2b9)]();return _0x1f8625['reduce']((_0x392446,_0x304500)=>_0x392446+_0x304500[_0xb1117(0x244)],0x0);},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x1ce)]=Scene_Battle[_0x245ac7(0x25c)][_0x245ac7(0x319)],Scene_Battle[_0x245ac7(0x25c)][_0x245ac7(0x319)]=function(){const _0x4d0b7c=_0x245ac7;VisuMZ['BattleSystemFTB'][_0x4d0b7c(0x1ce)][_0x4d0b7c(0x322)](this),BattleManager[_0x4d0b7c(0x2a5)]()&&this[_0x4d0b7c(0x274)]();},Scene_Battle['prototype'][_0x245ac7(0x274)]=function(){const _0x1716e0=_0x245ac7,_0x1bf8bb=this[_0x1716e0(0x211)];this['isPartyCommandWindowDisabled']()&&delete _0x1bf8bb[_0x1716e0(0x31f)][_0x1716e0(0x2ca)];},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x2c6)]=Scene_Battle[_0x245ac7(0x25c)]['commandCancel'],Scene_Battle['prototype']['commandCancel']=function(){const _0x3c815d=_0x245ac7;BattleManager[_0x3c815d(0x2a5)]()?this[_0x3c815d(0x30a)]():VisuMZ[_0x3c815d(0x251)][_0x3c815d(0x2c6)]['call'](this);},Scene_Battle[_0x245ac7(0x25c)][_0x245ac7(0x30a)]=function(){const _0x7eaa9f=_0x245ac7;this[_0x7eaa9f(0x2b3)][_0x7eaa9f(0x1d8)](),this[_0x7eaa9f(0x211)][_0x7eaa9f(0x296)]();},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x1c5)]=Scene_Battle[_0x245ac7(0x25c)]['commandFight'],Scene_Battle[_0x245ac7(0x25c)]['commandFight']=function(){const _0x486c25=_0x245ac7;BattleManager[_0x486c25(0x2a5)]()?this[_0x486c25(0x1e7)]():VisuMZ[_0x486c25(0x251)][_0x486c25(0x1c5)][_0x486c25(0x322)](this);},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x21a)]=Scene_Battle[_0x245ac7(0x25c)][_0x245ac7(0x2e9)],Scene_Battle[_0x245ac7(0x25c)][_0x245ac7(0x2e9)]=function(){const _0x2427b7=_0x245ac7;VisuMZ[_0x2427b7(0x251)][_0x2427b7(0x21a)][_0x2427b7(0x322)](this),this[_0x2427b7(0x246)]();},Scene_Battle[_0x245ac7(0x25c)]['createActionCountWindowsFTB']=function(){const _0x750381=_0x245ac7;if(!BattleManager[_0x750381(0x2a5)]())return;const _0x7900c9=this[_0x750381(0x1f6)](this[_0x750381(0x1d7)]);this[_0x750381(0x250)]=new Window_FTB_ActionCount(),this['_ftbTroopActionCountWindow'][_0x750381(0x28f)]($gameTroop),this[_0x750381(0x26c)](this[_0x750381(0x250)],_0x7900c9),this[_0x750381(0x2e8)]=new Window_FTB_ActionCount(),this[_0x750381(0x2e8)][_0x750381(0x28f)]($gameParty),this['addChildAt'](this[_0x750381(0x2e8)],_0x7900c9),this[_0x750381(0x234)]();},Scene_Battle[_0x245ac7(0x25c)]['repositionLogWindowFTB']=function(){const _0x177c04=_0x245ac7;if(!BattleManager[_0x177c04(0x2a5)]())return;if(!this[_0x177c04(0x2bd)])return;const _0x212af5=Window_FTB_ActionCount['Settings'];if(_0x212af5['BottomPosition'])return;this['_logWindow']['y']+=_0x212af5['LogWindowTopOffsetY'];},Window_Base[_0x245ac7(0x1bc)]=VisuMZ['BattleSystemFTB'][_0x245ac7(0x343)][_0x245ac7(0x1f7)][_0x245ac7(0x2f4)],Window_Base[_0x245ac7(0x23e)]=VisuMZ[_0x245ac7(0x251)]['Settings'][_0x245ac7(0x1f7)]['ShowCostForAttack'],Window_Base['_FTB_COST_SHOW_GUARD']=VisuMZ[_0x245ac7(0x251)]['Settings'][_0x245ac7(0x1f7)][_0x245ac7(0x34d)],Window_Base[_0x245ac7(0x298)]=VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x343)]['General'][_0x245ac7(0x276)],Window_Base[_0x245ac7(0x2cc)]=VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x343)]['General'][_0x245ac7(0x229)],VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x33a)]=Window_Base['prototype'][_0x245ac7(0x1f2)],Window_Base[_0x245ac7(0x25c)][_0x245ac7(0x1f2)]=function(_0x4fdeb7,_0x2a9a8f,_0x4549bd){const _0xf2adee=_0x245ac7;return _0x4549bd=VisuMZ['BattleSystemFTB'][_0xf2adee(0x33a)]['call'](this,_0x4fdeb7,_0x2a9a8f,_0x4549bd),_0x4549bd=this[_0xf2adee(0x1ba)](_0x4fdeb7,_0x2a9a8f,_0x4549bd),_0x4549bd;},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x291)]=Window_Base['prototype'][_0x245ac7(0x34f)],Window_Base['prototype'][_0x245ac7(0x34f)]=function(_0x5d5c9f,_0x14af50,_0x274b40,_0x2ba747){const _0x2183ed=_0x245ac7;BattleManager[_0x2183ed(0x2a5)]()&&this['constructor']===Window_BattleItem?this['drawItemNumberFTB'](_0x5d5c9f,_0x14af50,_0x274b40,_0x2ba747):VisuMZ['BattleSystemFTB'][_0x2183ed(0x291)][_0x2183ed(0x322)](this,_0x5d5c9f,_0x14af50,_0x274b40,_0x2ba747),this[_0x2183ed(0x2f8)]();},Window_Base[_0x245ac7(0x25c)][_0x245ac7(0x1c1)]=function(_0x398faf,_0x14aabc,_0xef4528,_0xa121f2){const _0xa0d9a6=_0x245ac7,_0x27d165=BattleManager['_actor']||$gameParty[_0xa0d9a6(0x2b9)]()[0x0],_0xd48d0c=this[_0xa0d9a6(0x1ba)](_0x27d165,_0x398faf,''),_0x1c6df8=this['textSizeEx'](_0xd48d0c)['width'],_0x5b5bec=Window_Base[_0xa0d9a6(0x1bc)];let _0x10528d=_0x14aabc+_0xa121f2-_0x1c6df8;if(_0xd48d0c==='')VisuMZ[_0xa0d9a6(0x251)][_0xa0d9a6(0x291)][_0xa0d9a6(0x322)](this,_0x398faf,_0x14aabc,_0xef4528,_0xa121f2);else{if(this[_0xa0d9a6(0x2f0)](_0x398faf)){this['resetFontSettings']();const _0x45e792=VisuMZ['ItemsEquipsCore']['Settings']['ItemScene'];this[_0xa0d9a6(0x302)][_0xa0d9a6(0x2e7)]=_0x45e792[_0xa0d9a6(0x209)];if(_0x5b5bec){const _0x443688=_0x45e792['ItemQuantityFmt'],_0x4d34bc=_0x443688[_0xa0d9a6(0x349)]($gameParty[_0xa0d9a6(0x235)](_0x398faf)),_0x486b7c=this[_0xa0d9a6(0x292)](_0x4d34bc+this['skillCostSeparator']());_0x10528d-=_0x486b7c;}else _0xa121f2-=this[_0xa0d9a6(0x292)](this[_0xa0d9a6(0x202)]())+_0x1c6df8;VisuMZ['BattleSystemFTB'][_0xa0d9a6(0x291)][_0xa0d9a6(0x322)](this,_0x398faf,_0x14aabc,_0xef4528,_0xa121f2);}}this[_0xa0d9a6(0x2d7)](_0xd48d0c,_0x10528d,_0xef4528);},Window_Base[_0x245ac7(0x25c)]['makeAdditionalCostTextFTB']=function(_0x1a2bb1,_0x3b429d,_0x2591d6){const _0x2b98fa=_0x245ac7;if(!BattleManager['isFTB']())return _0x2591d6;if(!_0x1a2bb1)return _0x2591d6;if(!_0x3b429d)return _0x2591d6;if(_0x3b429d[_0x2b98fa(0x24a)][_0x2b98fa(0x31a)](VisuMZ[_0x2b98fa(0x251)]['RegExp'][_0x2b98fa(0x255)]))return _0x2591d6;let _0x5bddbe=DataManager[_0x2b98fa(0x228)](_0x3b429d);const _0x2fa136=Window_Base['_FTB_COST_POSITION'],_0x13ddd1=Window_Base[_0x2b98fa(0x23e)],_0xd76c16=Window_Base[_0x2b98fa(0x23c)],_0x37a2ce=Window_Base[_0x2b98fa(0x298)],_0x54e699=Window_Base['_FTB_COST_SHOW_1'];if(DataManager[_0x2b98fa(0x1e8)](_0x3b429d)&&this['constructor']===Window_ActorCommand){if(!_0x13ddd1&&_0x3b429d['id']===_0x1a2bb1[_0x2b98fa(0x227)]())return _0x2591d6;if(!_0xd76c16&&_0x3b429d['id']===_0x1a2bb1[_0x2b98fa(0x1d3)]())return _0x2591d6;}if(_0x5bddbe<0x0)return _0x2591d6;if(!_0x37a2ce&&_0x5bddbe===0x0)return _0x2591d6;if(!_0x54e699&&_0x5bddbe===0x1)return _0x2591d6;const _0x1ead06='\x5cI[%1]'[_0x2b98fa(0x349)](ImageManager['ftbActorActionsIcon']),_0x2fed3a=TextManager['ftbActionPointsAbbr'];let _0x12d68e=TextManager[_0x2b98fa(0x237)]['format'](_0x5bddbe,_0x2fed3a,_0x1ead06);if(_0x2591d6==='')_0x2591d6+=_0x12d68e;else _0x2fa136?_0x2591d6=_0x12d68e+this['skillCostSeparator']()+_0x2591d6:_0x2591d6=_0x2591d6+this['skillCostSeparator']()+_0x12d68e;return _0x2591d6;},VisuMZ['BattleSystemFTB'][_0x245ac7(0x2d4)]=Window_Help[_0x245ac7(0x25c)][_0x245ac7(0x204)],Window_Help['prototype'][_0x245ac7(0x204)]=function(_0xe2548e){const _0x361f04=_0x245ac7;BattleManager[_0x361f04(0x2a5)]()&&_0xe2548e&&_0xe2548e[_0x361f04(0x24a)]&&_0xe2548e['note'][_0x361f04(0x31a)](/<(?:FTB) HELP>\s*([\s\S]*)\s*<\/(?:FTB) HELP>/i)?this[_0x361f04(0x1cc)](String(RegExp['$1'])):VisuMZ['BattleSystemFTB'][_0x361f04(0x2d4)]['call'](this,_0xe2548e);},Window_Selectable['prototype'][_0x245ac7(0x28d)]=function(){const _0x479676=_0x245ac7;return this[_0x479676(0x26f)]===Window_ActorCommand&&BattleManager[_0x479676(0x2a5)]()&&BattleManager[_0x479676(0x1ec)];},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x1f3)]=Window_Selectable['prototype'][_0x245ac7(0x243)],Window_Selectable[_0x245ac7(0x25c)][_0x245ac7(0x243)]=function(_0x596e26){const _0x5ba1d6=_0x245ac7;this[_0x5ba1d6(0x28d)]()&&this[_0x5ba1d6(0x210)]()===0x1?this[_0x5ba1d6(0x341)](!![]):VisuMZ['BattleSystemFTB'][_0x5ba1d6(0x1f3)][_0x5ba1d6(0x322)](this,_0x596e26);},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x32b)]=Window_Selectable[_0x245ac7(0x25c)]['cursorLeft'],Window_Selectable['prototype'][_0x245ac7(0x2f3)]=function(_0xa5e62e){const _0x37ead9=_0x245ac7;this['ftbFreeRangeSwitch']()&&this[_0x37ead9(0x210)]()===0x1?this[_0x37ead9(0x341)](![]):VisuMZ['BattleSystemFTB'][_0x37ead9(0x32b)][_0x37ead9(0x322)](this,_0xa5e62e);},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x2ff)]=Window_Selectable[_0x245ac7(0x25c)][_0x245ac7(0x28b)],Window_Selectable['prototype'][_0x245ac7(0x28b)]=function(){const _0x27b50e=_0x245ac7;this[_0x27b50e(0x28d)]()?this[_0x27b50e(0x341)](!![]):VisuMZ[_0x27b50e(0x251)][_0x27b50e(0x2ff)]['call'](this);},VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x2a4)]=Window_Selectable[_0x245ac7(0x25c)][_0x245ac7(0x212)],Window_Selectable[_0x245ac7(0x25c)][_0x245ac7(0x212)]=function(){const _0x509da2=_0x245ac7;this[_0x509da2(0x28d)]()?this[_0x509da2(0x341)](![]):VisuMZ['BattleSystemFTB'][_0x509da2(0x2a4)][_0x509da2(0x322)](this);},Window_ActorCommand[_0x245ac7(0x25c)]['ftbSwitchActorDirection']=function(_0x13561a){const _0xc2e320=_0x245ac7,_0x24d696=BattleManager[_0xc2e320(0x221)];let _0x2ce6e8=$gameParty[_0xc2e320(0x33e)]()[_0xc2e320(0x2b2)](_0x24d696);const _0x455a60=$gameParty[_0xc2e320(0x33e)]()[_0xc2e320(0x327)]-0x1;let _0x5d4c7d=$gameParty[_0xc2e320(0x33e)]()[_0x2ce6e8];for(;;){_0x2ce6e8+=_0x13561a?0x1:-0x1;if(_0x2ce6e8<0x0)_0x2ce6e8=_0x455a60;if(_0x2ce6e8>_0x455a60)_0x2ce6e8=0x0;_0x5d4c7d=$gameParty[_0xc2e320(0x33e)]()[_0x2ce6e8];if(_0x5d4c7d&&_0x5d4c7d[_0xc2e320(0x256)]()&&!_0x5d4c7d['isPassingTurnFTB']())break;if(_0x5d4c7d===_0x24d696)break;}this[_0xc2e320(0x201)](_0x24d696,_0x5d4c7d);},Window_ActorCommand[_0x245ac7(0x25c)]['processSwitchActors']=function(_0x9dbaf9,_0x354a73){const _0xb32f77=_0x245ac7;if(_0x9dbaf9===_0x354a73)return;if(_0x9dbaf9[_0xb32f77(0x278)]())_0x9dbaf9['battler']()[_0xb32f77(0x223)]();this[_0xb32f77(0x205)](),BattleManager[_0xb32f77(0x2b6)]=_0x354a73,BattleManager[_0xb32f77(0x221)]=_0x354a73,BattleManager[_0xb32f77(0x25a)](),SceneManager[_0xb32f77(0x2e5)]['startActorCommandSelection']();},VisuMZ['BattleSystemFTB']['Window_Selectable_processTouch']=Window_Selectable[_0x245ac7(0x25c)][_0x245ac7(0x1d9)],Window_Selectable['prototype'][_0x245ac7(0x1d9)]=function(){const _0x11402f=_0x245ac7;BattleManager[_0x11402f(0x2a5)]()&&BattleManager[_0x11402f(0x1ec)]&&this[_0x11402f(0x26f)]===Window_BattleStatus?this[_0x11402f(0x2c7)]():VisuMZ[_0x11402f(0x251)]['Window_Selectable_processTouch'][_0x11402f(0x322)](this);},Window_BattleStatus[_0x245ac7(0x25c)][_0x245ac7(0x2c7)]=function(){const _0x4d3001=_0x245ac7;this[_0x4d3001(0x306)]()&&(TouchInput[_0x4d3001(0x305)]()&&this[_0x4d3001(0x332)](!![]));},Window_BattleStatus[_0x245ac7(0x25c)][_0x245ac7(0x332)]=function(_0x4b50f0){const _0x13cc77=_0x245ac7,_0x142eca=SceneManager['_scene'][_0x13cc77(0x211)];if(!_0x142eca)return;if(!_0x142eca['active'])return;this['_doubleTouch']=![];const _0x426344=this[_0x13cc77(0x28e)](),_0x4e5831=this[_0x13cc77(0x2ab)]();if(_0x4e5831>=0x0){const _0xf711d=$gameParty['battleMembers']()[_0x426344],_0xdd7b76=$gameParty[_0x13cc77(0x33e)]()[_0x4e5831];this[_0x13cc77(0x310)](_0xdd7b76)&&(_0x4e5831===this[_0x13cc77(0x28e)]()&&(this[_0x13cc77(0x33c)]=!![]),this[_0x13cc77(0x1c7)](_0x4e5831),_0x142eca['processSwitchActors'](_0xf711d,_0xdd7b76));}},Window_BattleStatus[_0x245ac7(0x25c)][_0x245ac7(0x310)]=function(_0x4f04fb){const _0x275a03=_0x245ac7;if(!_0x4f04fb)return![];if(!_0x4f04fb[_0x275a03(0x231)]())return![];if(!_0x4f04fb[_0x275a03(0x256)]())return![];if(_0x4f04fb[_0x275a03(0x334)]())return![];return!![];};function Window_FTB_ActionCount(){const _0x5741a4=_0x245ac7;this[_0x5741a4(0x281)](...arguments);}Window_FTB_ActionCount[_0x245ac7(0x25c)]=Object[_0x245ac7(0x259)](Window_Base['prototype']),Window_FTB_ActionCount['prototype'][_0x245ac7(0x26f)]=Window_FTB_ActionCount,Window_FTB_ActionCount[_0x245ac7(0x343)]=VisuMZ[_0x245ac7(0x251)][_0x245ac7(0x343)][_0x245ac7(0x1e1)],Window_FTB_ActionCount[_0x245ac7(0x25c)][_0x245ac7(0x281)]=function(){const _0x5a91f6=_0x245ac7,_0xf642e7=this[_0x5a91f6(0x224)]();Window_Base[_0x5a91f6(0x25c)]['initialize'][_0x5a91f6(0x322)](this,_0xf642e7),this['setBackgroundType'](0x0),this[_0x5a91f6(0x304)](),this[_0x5a91f6(0x1c6)]=0x0;},Window_FTB_ActionCount[_0x245ac7(0x25c)][_0x245ac7(0x224)]=function(){const _0x2b0597=_0x245ac7;return new Rectangle(0x0,0x0,Graphics[_0x2b0597(0x27e)],Graphics[_0x2b0597(0x222)]);},Window_FTB_ActionCount[_0x245ac7(0x25c)][_0x245ac7(0x304)]=function(){const _0x1ebada=_0x245ac7;this[_0x1ebada(0x226)]=null,this[_0x1ebada(0x26a)]=0x0,this[_0x1ebada(0x252)]=0x0;const _0x13164d=Window_FTB_ActionCount[_0x1ebada(0x343)];this[_0x1ebada(0x2ba)]={'ActorPicture':_0x13164d[_0x1ebada(0x1db)]?ImageManager[_0x1ebada(0x2d9)](_0x13164d[_0x1ebada(0x1db)]):'','EnemyPicture':_0x13164d[_0x1ebada(0x203)]?ImageManager[_0x1ebada(0x2d9)](_0x13164d[_0x1ebada(0x203)]):'','EmptyPicture':_0x13164d['EmptyActionPicture']?ImageManager[_0x1ebada(0x2d9)](_0x13164d[_0x1ebada(0x2db)]):''};},Window_FTB_ActionCount[_0x245ac7(0x25c)][_0x245ac7(0x2e1)]=function(){const _0x32c7e3=_0x245ac7;this[_0x32c7e3(0x23b)]=0x0;},Window_FTB_ActionCount[_0x245ac7(0x25c)][_0x245ac7(0x28f)]=function(_0x460256){const _0x1732cc=_0x245ac7;this[_0x1732cc(0x226)]=_0x460256,this[_0x1732cc(0x1fc)]();},Window_FTB_ActionCount[_0x245ac7(0x25c)][_0x245ac7(0x1fc)]=function(){const _0x26bced=_0x245ac7;Window_Base[_0x26bced(0x25c)]['update']['call'](this),this['checkNeedsUpdate'](),this[_0x26bced(0x27d)](),this['updateVisibility']();},Window_FTB_ActionCount[_0x245ac7(0x25c)][_0x245ac7(0x23d)]=function(){const _0x2eae5c=_0x245ac7;if(!this[_0x2eae5c(0x226)])return;(this['_currentActions']!==this[_0x2eae5c(0x226)][_0x2eae5c(0x30c)]()||this['_maxActions']!==this[_0x2eae5c(0x226)][_0x2eae5c(0x2c2)]())&&(this['_currentActions']=this[_0x2eae5c(0x226)]['getCurrentActionsFTB'](),this[_0x2eae5c(0x252)]=this[_0x2eae5c(0x226)][_0x2eae5c(0x2c2)](),this[_0x2eae5c(0x2d6)]());},Window_FTB_ActionCount['prototype'][_0x245ac7(0x2eb)]=function(){const _0x343b67=_0x245ac7;this['visible']=$gameSystem[_0x343b67(0x1bb)]();},Window_FTB_ActionCount['prototype'][_0x245ac7(0x2d6)]=function(){const _0x40fdfc=_0x245ac7;this['contents'][_0x40fdfc(0x2bb)]();if(!this[_0x40fdfc(0x226)])return;const _0x302c5f=Window_FTB_ActionCount[_0x40fdfc(0x343)];if(!_0x302c5f)return;const _0x3f3772=this[_0x40fdfc(0x2d8)](),_0xd883b4=this[_0x40fdfc(0x2be)](),_0x183efa=_0x302c5f[_0x40fdfc(0x2b4)]+_0x302c5f['ImageGapDistance'],_0x29d123=_0x302c5f['DrawHorz'];let _0x4d192c=_0x3f3772['x'],_0x3bfa1a=_0x3f3772['y'];while(_0xd883b4[_0x40fdfc(0x327)]>0x0){const _0x3ec361=_0xd883b4[_0x40fdfc(0x1f8)]();this['drawImage'](_0x3ec361,_0x4d192c,_0x3bfa1a,_0xd883b4['length']),_0x29d123?_0x4d192c+=_0x183efa:_0x3bfa1a+=_0x183efa;}},Window_FTB_ActionCount[_0x245ac7(0x25c)][_0x245ac7(0x2d8)]=function(){const _0x4c36b1=_0x245ac7,_0xee079a=Window_FTB_ActionCount['Settings'],_0x40182d=this[_0x4c36b1(0x226)]===$gameParty,_0x4afc7c=_0xee079a['ImageSize'],_0x55db24=_0x4afc7c*(_0xee079a[_0x4c36b1(0x277)]-0x1)+_0xee079a['ImageGapDistance']*(_0xee079a['MaxVisible']-0x2),_0x52a97c=_0xee079a[_0x4c36b1(0x272)],_0x282465=SceneManager[_0x4c36b1(0x2e5)]['_statusWindow'][_0x4c36b1(0x222)];let _0x1e6739=0x0,_0x1bcbd0=0x0;const _0x2463de=_0xee079a[_0x4c36b1(0x215)];if(_0x2463de){_0x1bcbd0=this[_0x4c36b1(0x326)]-_0x282465-_0xee079a[_0x4c36b1(0x2a8)]-_0x4afc7c,_0x1e6739=_0x40182d?this[_0x4c36b1(0x1e2)]-_0xee079a[_0x4c36b1(0x20e)]-_0x4afc7c:_0xee079a['ScreenBufferX'];if(_0x52a97c&&_0x40182d)_0x1e6739-=_0x55db24;else!_0x52a97c&&(_0x1bcbd0-=_0x55db24);}else _0x1bcbd0=_0xee079a[_0x4c36b1(0x2a8)],_0x1e6739=_0x40182d?this[_0x4c36b1(0x1e2)]-_0xee079a['ScreenBufferX']-_0x4afc7c:_0xee079a[_0x4c36b1(0x20e)],_0x52a97c&&_0x40182d&&(_0x1e6739-=_0x55db24);return _0x1e6739+=_0x40182d?_0xee079a[_0x4c36b1(0x350)]:_0xee079a[_0x4c36b1(0x2af)],_0x1bcbd0+=_0x40182d?_0xee079a[_0x4c36b1(0x350)]:_0xee079a[_0x4c36b1(0x219)],new Point(Math['round'](_0x1e6739),Math['round'](_0x1bcbd0));},Window_FTB_ActionCount[_0x245ac7(0x25c)]['createContentsArray']=function(){const _0x3cb623=_0x245ac7,_0x35ca9a=Window_FTB_ActionCount[_0x3cb623(0x343)];let _0x4b5fe2=!![];if(_0x35ca9a[_0x3cb623(0x272)]){if(this[_0x3cb623(0x226)]===$gameParty)_0x4b5fe2=!_0x4b5fe2;}else _0x4b5fe2=!_0x35ca9a[_0x3cb623(0x215)];let _0x4aa100=this[_0x3cb623(0x226)][_0x3cb623(0x30c)](),_0x973a2e=Math[_0x3cb623(0x318)](0x0,this[_0x3cb623(0x226)][_0x3cb623(0x2c2)]()-_0x4aa100);const _0x5535b8=[];while(_0x4aa100--){const _0x163d1d=_0x3cb623(0x1bf);_0x5535b8[_0x3cb623(0x1fe)](_0x163d1d);}while(_0x973a2e--){const _0x4fef8d=_0x3cb623(0x238);_0x4b5fe2?_0x5535b8[_0x3cb623(0x1fe)](_0x4fef8d):_0x5535b8[_0x3cb623(0x33f)](_0x4fef8d);}while(_0x5535b8[_0x3cb623(0x327)]<0xa){const _0x52ee32=_0x3cb623(0x2dd);_0x4b5fe2?_0x5535b8[_0x3cb623(0x1fe)](_0x52ee32):_0x5535b8[_0x3cb623(0x33f)](_0x52ee32);}return _0x5535b8;},Window_FTB_ActionCount[_0x245ac7(0x25c)][_0x245ac7(0x2dc)]=function(_0x134976,_0x54b509,_0x5e143a,_0x550636){const _0x1a84fa=_0x245ac7;if(_0x134976===_0x1a84fa(0x2dd))return;if(_0x134976===_0x1a84fa(0x1bf))_0x134976=this[_0x1a84fa(0x226)]===$gameParty?_0x1a84fa(0x253):_0x1a84fa(0x2a9);const _0x301b74=Window_FTB_ActionCount[_0x1a84fa(0x343)];if(_0x301b74[_0x1a84fa(0x258)[_0x1a84fa(0x349)](_0x134976)]){const _0x2453ef=_0x301b74[_0x1a84fa(0x258)[_0x1a84fa(0x349)](_0x134976)],_0x116a49=ImageManager[_0x1a84fa(0x2d9)](_0x2453ef);_0x116a49['addLoadListener'](this[_0x1a84fa(0x200)]['bind'](this,_0x116a49,_0x54b509,_0x5e143a,_0x550636));}else{const _0x4182d6=ImageManager[_0x1a84fa(0x321)[_0x1a84fa(0x349)](_0x134976)];this[_0x1a84fa(0x1dd)](_0x4182d6,_0x54b509,_0x5e143a),this[_0x1a84fa(0x213)](_0x550636)&&this[_0x1a84fa(0x317)](_0x54b509,_0x5e143a);}},Window_FTB_ActionCount[_0x245ac7(0x25c)][_0x245ac7(0x200)]=function(_0x474688,_0x310e56,_0x480f10,_0x28bb6a){const _0x113253=_0x245ac7;if(!_0x474688)return;const _0x4f9836=Window_FTB_ActionCount[_0x113253(0x343)],_0x4f393c=_0x4f9836[_0x113253(0x2b4)],_0x2b6ad2=_0x4f393c/_0x474688[_0x113253(0x27e)],_0xea7c14=_0x4f393c/_0x474688[_0x113253(0x222)],_0x1f1037=Math[_0x113253(0x241)](_0x2b6ad2,_0xea7c14,0x1),_0x25925f=_0x474688[_0x113253(0x222)],_0x27ccae=_0x474688[_0x113253(0x222)],_0x344889=Math[_0x113253(0x267)](_0x25925f*_0x1f1037),_0xf32f84=Math[_0x113253(0x267)](_0x27ccae*_0x1f1037),_0x33a7f6=Math[_0x113253(0x267)](_0x310e56+(_0x4f393c-_0x344889)/0x2),_0x34c9d6=Math[_0x113253(0x267)](_0x480f10+(_0x4f393c-_0xf32f84)/0x2);this[_0x113253(0x302)][_0x113253(0x2e6)]['imageSmoothingEnabled']=_0x4f9836['PictureSmoothing'],this[_0x113253(0x302)][_0x113253(0x307)](_0x474688,0x0,0x0,_0x25925f,_0x27ccae,_0x33a7f6,_0x34c9d6,_0x344889,_0xf32f84),this[_0x113253(0x302)][_0x113253(0x2e6)]['imageSmoothingEnabled']=!![],this[_0x113253(0x213)](_0x28bb6a)&&this['drawActionsRemaining'](_0x310e56,_0x480f10);},Window_FTB_ActionCount[_0x245ac7(0x25c)]['drawBigIcon']=function(_0x5b01a0,_0x1193eb,_0x5825fd){const _0x41c676=_0x245ac7,_0x143c95=Window_FTB_ActionCount[_0x41c676(0x343)];let _0x120cd9=_0x143c95[_0x41c676(0x2b4)];const _0x76c4f3=ImageManager[_0x41c676(0x1be)](_0x41c676(0x325)),_0x203939=ImageManager['iconWidth'],_0x3628a4=ImageManager[_0x41c676(0x287)],_0x3bac9f=_0x5b01a0%0x10*_0x203939,_0x58e128=Math[_0x41c676(0x342)](_0x5b01a0/0x10)*_0x3628a4;this['contents'][_0x41c676(0x2e6)][_0x41c676(0x297)]=_0x143c95[_0x41c676(0x1eb)],this['contents']['blt'](_0x76c4f3,_0x3bac9f,_0x58e128,_0x203939,_0x3628a4,_0x1193eb,_0x5825fd,_0x120cd9,_0x120cd9),this['contents'][_0x41c676(0x2e6)]['imageSmoothingEnabled']=!![];},Window_FTB_ActionCount[_0x245ac7(0x25c)][_0x245ac7(0x27d)]=function(){const _0x4c6ff8=_0x245ac7,_0x23c015=Window_FTB_ActionCount[_0x4c6ff8(0x343)];if(_0x23c015[_0x4c6ff8(0x215)])return;if(!_0x23c015[_0x4c6ff8(0x1cb)])return;const _0x481dac=SceneManager[_0x4c6ff8(0x2e5)][_0x4c6ff8(0x26d)];if(!_0x481dac)return;_0x481dac[_0x4c6ff8(0x345)]?(this['x']=_0x23c015['RepositionTopHelpX']||0x0,this['y']=_0x23c015[_0x4c6ff8(0x2fb)]||0x0):(this['x']=0x0,this['y']=0x0);},Window_FTB_ActionCount['prototype'][_0x245ac7(0x213)]=function(_0x49d9ec){const _0x1a47d1=_0x245ac7,_0x1331cd=Window_FTB_ActionCount[_0x1a47d1(0x343)];if(!_0x1331cd[_0x1a47d1(0x24c)])return![];const _0x288c17=_0x1331cd[_0x1a47d1(0x215)],_0x2e4a64=_0x1331cd[_0x1a47d1(0x272)],_0x22ab5e=this[_0x1a47d1(0x226)]===$gameParty;if(_0x2e4a64)return _0x22ab5e?_0x49d9ec===0x0:_0x49d9ec===_0x1331cd[_0x1a47d1(0x277)]-0x1;else return _0x288c17?_0x49d9ec===0x0:_0x49d9ec===_0x1331cd['MaxVisible']-0x1;},Window_FTB_ActionCount[_0x245ac7(0x25c)][_0x245ac7(0x317)]=function(_0x12586e,_0x4a82bf){const _0x29d78c=_0x245ac7;this[_0x29d78c(0x2f8)]();const _0x5d3882=Window_FTB_ActionCount[_0x29d78c(0x343)],_0x315e44=new Rectangle(_0x12586e,_0x4a82bf,_0x5d3882['ImageSize'],_0x5d3882[_0x29d78c(0x2b4)]);_0x315e44['x']+=_0x5d3882[_0x29d78c(0x27c)],_0x315e44['y']+=_0x5d3882[_0x29d78c(0x2a7)];const _0x353f6f=this[_0x29d78c(0x226)]['getCurrentActionsFTB']();this[_0x29d78c(0x302)]['fontSize']=_0x5d3882[_0x29d78c(0x324)],this[_0x29d78c(0x302)][_0x29d78c(0x30e)](_0x353f6f,_0x315e44['x'],_0x315e44['y'],_0x315e44[_0x29d78c(0x27e)],_0x315e44[_0x29d78c(0x222)],_0x29d78c(0x1f4)),this['resetFontSettings']();};