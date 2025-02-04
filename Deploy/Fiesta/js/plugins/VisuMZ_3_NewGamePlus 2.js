//=============================================================================
// VisuStella MZ - New Game +
// VisuMZ_3_NewGamePlus.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_NewGamePlus = true;

var VisuMZ = VisuMZ || {};
VisuMZ.NewGamePlus = VisuMZ.NewGamePlus || {};
VisuMZ.NewGamePlus.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.02] [NewGamePlus]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/New_Game_Plus_VisuStella_MZ
 * @base VisuMZ_1_SaveCore
 * @orderAfter VisuMZ_1_SaveCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * New Game+ is a great way to provide replay value for your game. It lets the
 * player re-experience the game in a different way with either carried over
 * items, to carried over party members, to carried over skills, switches, and
 * variables even. There exists many options to change how New Game+ will work
 * for your game.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Select which switches, variables, actor data, party data, and system data
 *   is carried over into a New Game+.
 * * Use notetags to prevent specific items, weapons, armors, or actors from
 *   carrying over their data.
 * * Two different ways of starting a New Game+.
 * * One way is by saving a New Game+ save file and loading upon it.
 * * The second way is by immediately using the current game's save data and
 *   starting a New Game+ with it.
 * * Run a dedicated Common Event after a New Game+ has started.
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
 * * VisuMZ_1_SaveCore
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
 * Instructions
 * ============================================================================
 *
 * So how do you start a New Game+? There are two ways to do it:
 * 
 * ---
 * 
 * Method 1: Save File with New Game+
 * 
 * Use the Plugin Command from this plugin for "Save: New Game+" from the map
 * scene. The save menu will open and prompt the player where to make a save
 * file for the New Game+ file to be at.
 * 
 * When the player loads up that file, a new game will start instead with all
 * of the carry over effects listed in the Plugin Parameters.
 * 
 * ---
 * 
 * Method 2: Transition into New Game+
 * 
 * Use the Plugin Command from this plugin for "Transition: New Game+" from the
 * map scene. The game will immediately fade out and start a new game with all
 * of the carry over effects listed in the Plugin Parameters.
 * 
 * This is useful for the games who have decided to make one save file games.
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
 * VisuMZ_2_ClassChangeSystem
 *
 * VisuMZ_2_SkillLearnSystem
 *
 * This plugin allows the functionality of carrying over AP, CP, JP, SP if you
 * so wish. You can change the settings in this plugin's Plugin Parameters.
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
 * === New Game+-Related Notetags ===
 * 
 * ---
 *
 * <No New Game+ Carry Over>
 *
 * - Used for: Actor, Item, Weapon, Armor Notetags
 * - This will prevent the item, weapon, or armor from being carried over to
 *   New Game+. If this is used on an actor, the actor will be in its default
 *   state as if a new game started.
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
 * === Save Plugin Commands ===
 * 
 * ---
 *
 * Save: New Game+
 * - Opens up the Save menu for the player to save a New Game+ file.
 * - Only works from map scene.
 *
 * ---
 * 
 * === Transition Plugin Commands ===
 * 
 * ---
 *
 * Transition: New Game+
 * - Transitions the current game directly into a New Game+.
 * - Only works from map scene.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Data Settings
 * ============================================================================
 *
 * This contains actor data that will be carried over when starting a
 * New Game+.
 *
 * ---
 *
 * General
 * 
 *   Copy Actor?:
 *   - Carry over all of each actor's settings when starting a New Game+?
 * 
 *   EXP:
 *   - Carry over each actor's EXP data when starting a New Game+?
 * 
 *   Skills:
 *   - Carry over each actor's skills data when starting a New Game+?
 *
 * ---
 *
 * Compatibility
 * 
 *   Ability Points:
 *   - Carry over each actor's AP when starting a New Game+?
 *   - Requires VisuMZ_2_SkillLearnSystem
 * 
 *   Class Points:
 *   - Carry over each actor's CP when starting a New Game+?
 *   - Requires VisuMZ_2_ClassChangeSystem
 * 
 *   Job Points:
 *   - Carry over each actor's JP when starting a New Game+?
 *   - Requires VisuMZ_2_ClassChangeSystem
 * 
 *   Skill Points:
 *   - Carry over each actor's SP when starting a New Game+?
 *   - Requires VisuMZ_2_SkillLearnSystem
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Party Data Settings
 * ============================================================================
 *
 * This contains party data that will be carried over when starting a
 * New Game+.
 *
 * ---
 *
 * Settings
 * 
 *   Gold:
 *   - Carry over gold data when starting a New Game+?
 * 
 *   Items:
 *   - Carry over item data when starting a New Game+?
 * 
 *   Weapons:
 *   - Carry over weapon data when starting a New Game+?
 * 
 *   Armors:
 *   - Carry over armor data when starting a New Game+?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: System Data Settings
 * ============================================================================
 *
 * This contains system data that will be carried over when starting a
 * New Game+.
 *
 * ---
 *
 * Settings
 * 
 *   Playtime:
 *   - Carry over playtime data when starting a New Game+?
 * 
 *   Save Count:
 *   - Carry over save count data when starting a New Game+?
 * 
 *   Step Count:
 *   - Carry over step count data when starting a New Game+?
 * 
 *   Battle Count:
 *   - Carry over battle count data when starting a New Game+?
 * 
 *   Victory Count:
 *   - Carry over victory count data when starting a New Game+?
 * 
 *   Escape Count:
 *   - Carry over escape count data when starting a New Game+?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Carry Over Switches and Variables
 * ============================================================================
 *
 * When starting a New Game+, usually all of the data found in Switches and
 * Variables will be cleared out to an OFF flag and 0 value respectively. These
 * settings allow you to set exceptions for certain Switches and Variables to
 * retain their data when going into a New Game+.
 *
 * ---
 *
 * Settings
 * 
 *   Switches:
 *   - A list of switches to be carried over when starting a New Game+.
 * 
 *   Variables:
 *   - A list of variables to be carried over when starting a New Game+.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Scene_Save Settings
 * ============================================================================
 *
 * The settings for the Save Menu for New Game+ related entities.
 *
 * ---
 *
 * Settings
 * 
 *   Title Format:
 *   - Title format for a New Game+ file.
 *   - %1 - Save File ID
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Save New Game+ Help:
 *   - Text to display in the help file when saving for a New Game+ target.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: New Game+ Common Event Settings
 * ============================================================================
 *
 * When a New Game+ occurs, you can set the game to run a Common Event once
 * loaded into the map.
 *
 * ---
 *
 * Settings
 * 
 *   Common Event:
 *   - Select a Common Event to run after starting a New Game+.
 *   - Use 0 for no Common Event.
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
 * Version 1.02: February 12, 2021
 * * Bug Fixes!
 * ** Carry-Over Variables Plugin Parameter should now display Variables
 *    instead of Switches. Fix made by Irina.
 * ** Save files will no longer corrupt when carrying over uninitialized
 *    actors. Fix made by Irina.
 * 
 * Version 1.01: January 1, 2021
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.00: January 20, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveNewGamePlus
 * @text Save: New Game+
 * @desc Opens up the Save menu for the player to save a New Game+ file.
 * Only works from map scene.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TransitionNewGamePlus
 * @text Transition: New Game+
 * @desc Transitions the current game directly into a New Game+.
 * Only works from map scene.
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
 * @param NewGamePlus
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param CarryOver
 * @text Carry Over
 *
 * @param Actor:struct
 * @text Actor Data
 * @parent CarryOver
 * @type struct<Actor>
 * @desc This contains actor data that will be carried over when starting a New Game+.
 * @default {"General":"","CopyActor:eval":"true","EXP:eval":"true","Skills:eval":"true","Compatibility":"","AbilityPoints:eval":"true","ClassPoints:eval":"true","JobPoints:eval":"true","SkillPoints:eval":"true"}
 *
 * @param Party:struct
 * @text Party Data
 * @parent CarryOver
 * @type struct<Party>
 * @desc This contains party data that will be carried over when starting a New Game+.
 * @default {"Gold:eval":"true","Items:eval":"true","Weapons:eval":"true","Armors:eval":"true"}
 *
 * @param System:struct
 * @text System Data
 * @parent CarryOver
 * @type struct<System>
 * @desc This contains system data that will be carried over when starting a New Game+.
 * @default {"Playtime:eval":"true","SaveCount:eval":"true","StepCount:eval":"true","BattleCount:eval":"true","VictoryCount:eval":"true","EscapeCount:eval":"true"}
 * 
 * @param Switches:arraynum
 * @text Switches
 * @parent CarryOver
 * @type switch[]
 * @desc A list of switches to be carried over when starting a New Game+.
 * @default []
 * 
 * @param Variables:arraynum
 * @text Variables
 * @parent CarryOver
 * @type variable[]
 * @desc A list of variables to be carried over when starting a New Game+.
 * @default []
 *
 * @param SceneSave:struct
 * @text Scene_Save
 * @type struct<SceneSave>
 * @desc The settings for the Save Menu for New Game+ related entities.
 * @default {"TitleFmt:str":"File %1: NEW GAME+","TextColor:str":"6","SaveNewGamePlusHelp:str":"Which file would you like to save New Game+ to?"}
 * 
 * @param CommonEvent:num
 * @text New Game+ Common Event
 * @type common_event
 * @desc Select a Common Event to run after starting a New Game+.
 * Use 0 for no Common Event.
 * @default 0
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
 * Actor Data Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Actor:
 *
 * @param General
 *
 * @param CopyActor:eval
 * @text Copy Actor?
 * @parent General
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over all of each actor's settings when starting a New Game+?
 * @default true
 *
 * @param EXP:eval
 * @text EXP
 * @parent General
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over each actor's EXP data when starting a New Game+?
 * @default true
 *
 * @param Skills:eval
 * @text Skills
 * @parent General
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over each actor's skills data when starting a New Game+?
 * @default true
 * 
 * @param Compatibility
 *
 * @param AbilityPoints:eval
 * @text Ability Points
 * @parent Compatibility
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over each actor's AP when starting a New Game+?
 * Requires VisuMZ_2_SkillLearnSystem
 * @default true
 *
 * @param ClassPoints:eval
 * @text Class Points
 * @parent Compatibility
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over each actor's CP when starting a New Game+?
 * Requires VisuMZ_2_ClassChangeSystem
 * @default true
 *
 * @param JobPoints:eval
 * @text Job Points
 * @parent Compatibility
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over each actor's JP when starting a New Game+?
 * Requires VisuMZ_2_ClassChangeSystem
 * @default true
 *
 * @param SkillPoints:eval
 * @text Skill Points
 * @parent Compatibility
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over each actor's SP when starting a New Game+?
 * Requires VisuMZ_2_SkillLearnSystem
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Party Data Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Party:
 *
 * @param Gold:eval
 * @text Gold
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over gold data when starting a New Game+?
 * @default true
 *
 * @param Items:eval
 * @text Items
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over item data when starting a New Game+?
 * @default true
 *
 * @param Weapons:eval
 * @text Weapons
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over weapon data when starting a New Game+?
 * @default true
 *
 * @param Armors:eval
 * @text Armors
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over armor data when starting a New Game+?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * System Data Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~System:
 *
 * @param Playtime:eval
 * @text Playtime
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over playtime data when starting a New Game+?
 * @default true
 *
 * @param SaveCount:eval
 * @text Save Count
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over save count data when starting a New Game+?
 * @default true
 *
 * @param StepCount:eval
 * @text Step Count
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over step count data when starting a New Game+?
 * @default true
 *
 * @param BattleCount:eval
 * @text Battle Count
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over battle count data when starting a New Game+?
 * @default true
 *
 * @param VictoryCount:eval
 * @text Victory Count
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over victory count data when starting a New Game+?
 * @default true
 *
 * @param EscapeCount:eval
 * @text Escape Count
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over escape count data when starting a New Game+?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * SceneSave Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SceneSave:
 *
 * @param TitleFmt:str
 * @text Title Format
 * @parent NewGamePlus
 * @desc Title format for a New Game+ file.
 * %1 - Save File ID
 * @default File %1: NEW GAME+
 * 
 * @param TextColor:str
 * @text Text Color
 * @parent NewGamePlus
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param SaveNewGamePlusHelp:str
 * @text Save New Game+ Help
 * @parent NewGamePlus
 * @desc Text to display in the help file when saving for a New Game+ target.
 * @default Which file would you like to save New Game+ to?
 *
 */
//=============================================================================

const _0x2f91=['isNextScene','Armors','Actor','_scene','prepareNewGamePlusData','carryOverNewGamePlusData','changeTextColor','description','allItems','makeSavefileInfo','_battleCount','66603ZqUJyl','textColor','call','constructor','Game_System_initialize','gainStartingAbilityPoints','Window_SavefileList_drawTitle','helpWindowText','initExp','fadeOutAll','getNewGamePlusLoops','_escapeCount','TransitionNewGamePlus','isNewGamePlusEnabled','AbilityPoints','_exp','match','SceneSave','note','status','_newGamePlusLoops','loseItem','equips','Playtime','playtime','drawText','JSON','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','drawNewGamePlusMarker','_skills','setNewGamePlusLoaded','registerCommand','Weapons','trim','_newGamePlusEnabled','isSceneNewGamePlus','length','CommonEvent','_weapons','currentExp','stepcount','391286Zxgzvy','clearEquipments','_classId','isMaxLevel','create','helpNewGamePlus','removeNewGamePlusNoCarryOverItems','initNewGamePlusSettings','parse','steps','_abilityPoints','EXP','1041421uJsEld','SkillPoints','ARRAYJSON','map','_jobPoints','EscapeCount','FUNC','gold','65ZpuHld','prototype','STRUCT','_listWindow','newGamePlusAdjustLevel','TextColor','exit','levelUp','carryOverNewGamePlusPartyData','carryOverNewGamePlusActors','makeDeepCopy','max','setNewGamePlusLoops','runNewGamePlusCommonEvent','isSceneMap','ClassPoints','Settings','SaveNewGamePlus','DataManager_makeSavefileInfo','version','BattleCount','actor','initAbilityPoints','Variables','8IHUmZT','escapecount','Scene_Map_needsSlowFadeOut','CopyActor','VisuMZ_2_SkillLearnSystem','7841CvOHAa','_gold','battlecount','_level','copyNewGamePlusActorData','onLoadSuccess','startNewGamePlus','currentLevelExp','carryOverNewGamePlusSwitches','ARRAYSTR','NewGamePlus','start','_data','_winCount','actors','drawTitle','3950XyxOSx','armors','weapons','#%1','goto','playLoad','1131247RaEoie','_classPoints','fileNewGamePlus','switches','gainStartingClassPoints','JobPoints','initSkills','setValue','savefileInfo','SaveNewGamePlusHelp','needsSlowFadeOut','victorycount','ARRAYFUNC','_ngpData','NUM','isNewGamePlusLoaded','saveCount','width','SaveCount','Skills','canNewGamePlusCarryOver','initialize','EVAL','newGamePlusRefresh','VisuMZ_1_SaveCore','isNewGamePlus','ARRAYSTRUCT','frameCount','newGamePlus','VictoryCount','STR','getColor','format','Items','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','gainStartingSkillPoints','parameters','158LddNCn','refresh','itemRectWithPadding','push','Scene_Load_onLoadSuccess','_newGamePlusLoaded','newGamePlusTitle','ConvertParams','_framesOnSave','ARRAYEVAL','initClassPoints','VisuMZ_2_ClassChangeSystem','_items','_actorId','1287828LEqtMZ','nextLevelExp','includes'];const _0xadcd=function(_0x222832,_0x5ddbf8){_0x222832=_0x222832-0x15a;let _0x2f9177=_0x2f91[_0x222832];return _0x2f9177;};const _0x286b10=_0xadcd;(function(_0x4a4e8c,_0x5bed2c){const _0x3c7aa3=_0xadcd;while(!![]){try{const _0x234c05=-parseInt(_0x3c7aa3(0x1f7))+parseInt(_0x3c7aa3(0x183))*-parseInt(_0x3c7aa3(0x1a0))+-parseInt(_0x3c7aa3(0x17b))+-parseInt(_0x3c7aa3(0x1e9))+parseInt(_0x3c7aa3(0x1b6))+parseInt(_0x3c7aa3(0x1db))*-parseInt(_0x3c7aa3(0x1b0))+parseInt(_0x3c7aa3(0x16f))*parseInt(_0x3c7aa3(0x19b));if(_0x234c05===_0x5bed2c)break;else _0x4a4e8c['push'](_0x4a4e8c['shift']());}catch(_0x191173){_0x4a4e8c['push'](_0x4a4e8c['shift']());}}}(_0x2f91,0xb2b0e));var label='NewGamePlus',tier=tier||0x0,dependencies=[_0x286b10(0x1ce)],pluginData=$plugins['filter'](function(_0x3d95f9){const _0x4a987a=_0x286b10;return _0x3d95f9[_0x4a987a(0x20a)]&&_0x3d95f9[_0x4a987a(0x1f3)][_0x4a987a(0x1eb)]('['+label+']');})[0x0];VisuMZ[label][_0x286b10(0x193)]=VisuMZ[label][_0x286b10(0x193)]||{},VisuMZ['ConvertParams']=function(_0x153358,_0x1d5599){const _0x586934=_0x286b10;for(const _0x4bb74f in _0x1d5599){if(_0x4bb74f[_0x586934(0x207)](/(.*):(.*)/i)){const _0x14b7df=String(RegExp['$1']),_0x3aa2f2=String(RegExp['$2'])['toUpperCase']()[_0x586934(0x167)]();let _0x19a9ac,_0x4aa7fc,_0x7755aa;switch(_0x3aa2f2){case _0x586934(0x1c4):_0x19a9ac=_0x1d5599[_0x4bb74f]!==''?Number(_0x1d5599[_0x4bb74f]):0x0;break;case'ARRAYNUM':_0x4aa7fc=_0x1d5599[_0x4bb74f]!==''?JSON[_0x586934(0x177)](_0x1d5599[_0x4bb74f]):[],_0x19a9ac=_0x4aa7fc['map'](_0x2c25bc=>Number(_0x2c25bc));break;case _0x586934(0x1cc):_0x19a9ac=_0x1d5599[_0x4bb74f]!==''?eval(_0x1d5599[_0x4bb74f]):null;break;case _0x586934(0x1e4):_0x4aa7fc=_0x1d5599[_0x4bb74f]!==''?JSON[_0x586934(0x177)](_0x1d5599[_0x4bb74f]):[],_0x19a9ac=_0x4aa7fc['map'](_0x2494b1=>eval(_0x2494b1));break;case _0x586934(0x160):_0x19a9ac=_0x1d5599[_0x4bb74f]!==''?JSON['parse'](_0x1d5599[_0x4bb74f]):'';break;case _0x586934(0x17d):_0x4aa7fc=_0x1d5599[_0x4bb74f]!==''?JSON[_0x586934(0x177)](_0x1d5599[_0x4bb74f]):[],_0x19a9ac=_0x4aa7fc[_0x586934(0x17e)](_0x1a21e2=>JSON[_0x586934(0x177)](_0x1a21e2));break;case _0x586934(0x181):_0x19a9ac=_0x1d5599[_0x4bb74f]!==''?new Function(JSON[_0x586934(0x177)](_0x1d5599[_0x4bb74f])):new Function('return\x200');break;case _0x586934(0x1c2):_0x4aa7fc=_0x1d5599[_0x4bb74f]!==''?JSON[_0x586934(0x177)](_0x1d5599[_0x4bb74f]):[],_0x19a9ac=_0x4aa7fc[_0x586934(0x17e)](_0x3a1641=>new Function(JSON[_0x586934(0x177)](_0x3a1641)));break;case _0x586934(0x1d4):_0x19a9ac=_0x1d5599[_0x4bb74f]!==''?String(_0x1d5599[_0x4bb74f]):'';break;case _0x586934(0x1a9):_0x4aa7fc=_0x1d5599[_0x4bb74f]!==''?JSON['parse'](_0x1d5599[_0x4bb74f]):[],_0x19a9ac=_0x4aa7fc[_0x586934(0x17e)](_0x55bceb=>String(_0x55bceb));break;case _0x586934(0x185):_0x7755aa=_0x1d5599[_0x4bb74f]!==''?JSON['parse'](_0x1d5599[_0x4bb74f]):{},_0x19a9ac=VisuMZ[_0x586934(0x1e2)]({},_0x7755aa);break;case _0x586934(0x1d0):_0x4aa7fc=_0x1d5599[_0x4bb74f]!==''?JSON[_0x586934(0x177)](_0x1d5599[_0x4bb74f]):[],_0x19a9ac=_0x4aa7fc['map'](_0x49bb50=>VisuMZ[_0x586934(0x1e2)]({},JSON['parse'](_0x49bb50)));break;default:continue;}_0x153358[_0x14b7df]=_0x19a9ac;}}return _0x153358;},(_0xfd1ae5=>{const _0x501792=_0x286b10,_0x2f64bb=_0xfd1ae5['name'];for(const _0x361cd4 of dependencies){if(!Imported[_0x361cd4]){alert(_0x501792(0x161)['format'](_0x2f64bb,_0x361cd4)),SceneManager[_0x501792(0x189)]();break;}}const _0x279f98=_0xfd1ae5[_0x501792(0x1f3)];if(_0x279f98[_0x501792(0x207)](/\[Version[ ](.*?)\]/i)){const _0x2f86c4=Number(RegExp['$1']);_0x2f86c4!==VisuMZ[label][_0x501792(0x196)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x501792(0x1d6)](_0x2f64bb,_0x2f86c4)),SceneManager[_0x501792(0x189)]());}if(_0x279f98[_0x501792(0x207)](/\[Tier[ ](\d+)\]/i)){const _0x32bb3c=Number(RegExp['$1']);_0x32bb3c<tier?(alert(_0x501792(0x1d8)[_0x501792(0x1d6)](_0x2f64bb,_0x32bb3c,tier)),SceneManager['exit']()):tier=Math[_0x501792(0x18e)](_0x32bb3c,tier);}VisuMZ[_0x501792(0x1e2)](VisuMZ[label][_0x501792(0x193)],_0xfd1ae5[_0x501792(0x1da)]);})(pluginData),PluginManager[_0x286b10(0x165)](pluginData['name'],_0x286b10(0x194),_0x8df028=>{const _0x1a06c1=_0x286b10;if(!SceneManager[_0x1a06c1(0x191)]())return;SceneManager[_0x1a06c1(0x1de)](Scene_SaveNewGamePlus);}),PluginManager[_0x286b10(0x165)](pluginData['name'],_0x286b10(0x203),_0x1fabc9=>{const _0x250d09=_0x286b10;if(!SceneManager[_0x250d09(0x191)]())return;SceneManager[_0x250d09(0x1de)](Scene_NewGamePlusTransition);}),DataManager['canNewGamePlusCarryOver']=function(_0x147988){const _0x1304fb=_0x286b10;if(!_0x147988)return![];if(_0x147988[_0x1304fb(0x209)]['match'](/<NO NEW GAME\+ CARRY OVER>/i))return![];return!![];},VisuMZ['NewGamePlus'][_0x286b10(0x195)]=DataManager[_0x286b10(0x1f5)],DataManager[_0x286b10(0x1f5)]=function(){const _0xe7568a=_0x286b10;var _0x12d004=VisuMZ[_0xe7568a(0x1aa)][_0xe7568a(0x195)][_0xe7568a(0x1f9)](this);return _0x12d004[_0xe7568a(0x1d2)]=$gameSystem[_0xe7568a(0x204)](),_0x12d004;},DataManager[_0x286b10(0x1a6)]=function(){const _0x4d424e=_0x286b10;this[_0x4d424e(0x1f0)](),this['setupNewGame'](),this[_0x4d424e(0x1f1)](),this['runNewGamePlusCommonEvent']();},DataManager[_0x286b10(0x1f0)]=function(){const _0x2920f8=_0x286b10;var _0xfaa2bd=$gameActors[_0x2920f8(0x1ac)]['length'];for(var _0x142472=0x0;_0x142472<_0xfaa2bd;++_0x142472){var _0x5e4608=$gameActors[_0x2920f8(0x1ac)][_0x142472];if(_0x5e4608)_0x5e4608[_0x2920f8(0x170)]();}this[_0x2920f8(0x1c3)]={'switches':JsonEx[_0x2920f8(0x18d)]($gameSwitches[_0x2920f8(0x1ac)]),'variables':JsonEx[_0x2920f8(0x18d)]($gameVariables[_0x2920f8(0x1ac)]),'loops':$gameSystem['getNewGamePlusLoops'](),'playtime':$gameSystem['_framesOnSave'],'savecount':$gameSystem[_0x2920f8(0x1c6)](),'stepcount':$gameParty[_0x2920f8(0x178)](),'battlecount':$gameSystem[_0x2920f8(0x1f6)],'victorycount':$gameSystem[_0x2920f8(0x1ad)],'escapecount':$gameSystem['_escapeCount'],'actors':JsonEx[_0x2920f8(0x18d)]($gameActors['_data']),'gold':$gameParty[_0x2920f8(0x1a1)],'items':JsonEx[_0x2920f8(0x18d)]($gameParty[_0x2920f8(0x1e7)]),'weapons':JsonEx[_0x2920f8(0x18d)]($gameParty['_weapons']),'armors':JsonEx[_0x2920f8(0x18d)]($gameParty['_armors'])};},DataManager[_0x286b10(0x1f1)]=function(){const _0x2091fc=_0x286b10;this[_0x2091fc(0x1a8)](),this['carryOverNewGamePlusVariables'](),this['carryOverNewGamePlusSystemData'](),this[_0x2091fc(0x18c)](),this['carryOverNewGamePlusPartyData']();},DataManager['carryOverNewGamePlusSwitches']=function(){const _0x4ba7dc=_0x286b10;for(const _0x49a080 of VisuMZ['NewGamePlus'][_0x4ba7dc(0x193)]['Switches']){if(_0x49a080<=0x0)continue;$gameSwitches[_0x4ba7dc(0x1bd)](_0x49a080,this['_ngpData'][_0x4ba7dc(0x1b9)][_0x49a080]);}},DataManager['carryOverNewGamePlusVariables']=function(){const _0x5a352c=_0x286b10;for(const _0x572354 of VisuMZ[_0x5a352c(0x1aa)][_0x5a352c(0x193)][_0x5a352c(0x19a)]){if(_0x572354<=0x0)continue;$gameVariables[_0x5a352c(0x1bd)](_0x572354,this[_0x5a352c(0x1c3)]['variables'][switchID]);}},DataManager['carryOverNewGamePlusSystemData']=function(){const _0x24e308=_0x286b10,_0x3cde05=VisuMZ[_0x24e308(0x1aa)][_0x24e308(0x193)]['System'];$gameSystem[_0x24e308(0x18f)](this[_0x24e308(0x1c3)]['loops']+0x1),$gameSystem[_0x24e308(0x164)](!![]),_0x3cde05[_0x24e308(0x15d)]&&($gameSystem[_0x24e308(0x1e3)]=this[_0x24e308(0x1c3)][_0x24e308(0x15e)],Graphics[_0x24e308(0x1d1)]=this[_0x24e308(0x1c3)][_0x24e308(0x15e)]),_0x3cde05[_0x24e308(0x1c8)]&&($gameSystem['_saveCount']=this[_0x24e308(0x1c3)]['savecount']),_0x3cde05['StepCount']&&($gameParty['_steps']=this['_ngpData'][_0x24e308(0x16e)]),_0x3cde05[_0x24e308(0x197)]&&($gameSystem[_0x24e308(0x1f6)]=this['_ngpData'][_0x24e308(0x1a2)]),_0x3cde05[_0x24e308(0x1d3)]&&($gameSystem['_winCount']=this[_0x24e308(0x1c3)][_0x24e308(0x1c1)]),_0x3cde05[_0x24e308(0x180)]&&($gameSystem[_0x24e308(0x202)]=this[_0x24e308(0x1c3)][_0x24e308(0x19c)]);},DataManager['carryOverNewGamePlusActors']=function(){const _0x8bc16e=_0x286b10;var _0x1c845a=$gameActors[_0x8bc16e(0x1ac)][_0x8bc16e(0x16a)];for(var _0x4b850d=0x0;_0x4b850d<_0x1c845a;++_0x4b850d){var _0x390a36=$gameActors[_0x8bc16e(0x198)](_0x4b850d);_0x390a36&&(_0x390a36=this[_0x8bc16e(0x1a4)](_0x390a36,_0x4b850d),_0x390a36[_0x8bc16e(0x1cd)]());}},DataManager[_0x286b10(0x1a4)]=function(_0x1acb06,_0x2255da){const _0x5b984e=_0x286b10;if(!DataManager[_0x5b984e(0x1ca)](_0x1acb06[_0x5b984e(0x198)]()))return _0x1acb06;if(!this[_0x5b984e(0x1c3)][_0x5b984e(0x1ae)][_0x2255da])return _0x1acb06;const _0x479ae3=VisuMZ[_0x5b984e(0x1aa)]['Settings'][_0x5b984e(0x1ee)];return _0x479ae3[_0x5b984e(0x19e)]&&this[_0x5b984e(0x1c3)][_0x5b984e(0x1ae)][_0x2255da]&&($gameActors[_0x5b984e(0x1ac)][_0x2255da]=JsonEx[_0x5b984e(0x18d)](this['_ngpData'][_0x5b984e(0x1ae)][_0x2255da]),_0x1acb06=$gameActors[_0x5b984e(0x1ac)][_0x2255da]),_0x479ae3[_0x5b984e(0x17a)]&&this[_0x5b984e(0x1c3)]['actors'][_0x2255da][_0x5b984e(0x206)]?(_0x1acb06[_0x5b984e(0x206)]=JsonEx[_0x5b984e(0x18d)](this[_0x5b984e(0x1c3)]['actors'][_0x2255da]['_exp']),_0x1acb06[_0x5b984e(0x187)]()):(_0x1acb06[_0x5b984e(0x1a3)]=_0x1acb06[_0x5b984e(0x198)]()['initialLevel'],_0x1acb06[_0x5b984e(0x206)]={},_0x1acb06[_0x5b984e(0x1ff)]()),_0x479ae3[_0x5b984e(0x1c9)]&&this[_0x5b984e(0x1c3)][_0x5b984e(0x1ae)][_0x2255da][_0x5b984e(0x163)]?_0x1acb06[_0x5b984e(0x163)]=JsonEx[_0x5b984e(0x18d)](this[_0x5b984e(0x1c3)][_0x5b984e(0x1ae)][_0x2255da][_0x5b984e(0x163)]):_0x1acb06[_0x5b984e(0x1bc)](),Imported[_0x5b984e(0x19f)]&&(_0x479ae3[_0x5b984e(0x205)]&&this['_ngpData'][_0x5b984e(0x1ae)][_0x2255da][_0x5b984e(0x179)]?_0x1acb06['_abilityPoints']=JsonEx['makeDeepCopy'](this['_ngpData']['actors'][_0x2255da][_0x5b984e(0x179)]):(_0x1acb06[_0x5b984e(0x199)](),_0x1acb06[_0x5b984e(0x1fc)]()),_0x479ae3[_0x5b984e(0x17c)]&&this[_0x5b984e(0x1c3)][_0x5b984e(0x1ae)][_0x2255da]['_skillPoints']?_0x1acb06['_skillPoints']=JsonEx[_0x5b984e(0x18d)](this[_0x5b984e(0x1c3)][_0x5b984e(0x1ae)][_0x2255da]['_skillPoints']):(_0x1acb06['initSkillPoints'](),_0x1acb06[_0x5b984e(0x1d9)]())),Imported[_0x5b984e(0x1e6)]&&(_0x479ae3[_0x5b984e(0x192)]&&this[_0x5b984e(0x1c3)][_0x5b984e(0x1ae)][_0x2255da]['_classPoints']?_0x1acb06[_0x5b984e(0x1b7)]=JsonEx[_0x5b984e(0x18d)](this[_0x5b984e(0x1c3)][_0x5b984e(0x1ae)][_0x2255da][_0x5b984e(0x1b7)]):(_0x1acb06[_0x5b984e(0x1e5)](),_0x1acb06[_0x5b984e(0x1ba)]()),_0x479ae3[_0x5b984e(0x1bb)]&&this[_0x5b984e(0x1c3)][_0x5b984e(0x1ae)][_0x2255da]['_jobPoints']?_0x1acb06['_jobPoints']=JsonEx[_0x5b984e(0x18d)](this['_ngpData'][_0x5b984e(0x1ae)][_0x2255da][_0x5b984e(0x17f)]):(_0x1acb06['initJobPoints'](),_0x1acb06['gainStartingJobPoints']())),_0x1acb06;},DataManager[_0x286b10(0x18b)]=function(){const _0x450ea0=_0x286b10,_0x2e9359=VisuMZ[_0x450ea0(0x1aa)][_0x450ea0(0x193)]['Party'];_0x2e9359['Gold']&&($gameParty['_gold']=this[_0x450ea0(0x1c3)][_0x450ea0(0x182)]),_0x2e9359[_0x450ea0(0x1d7)]&&($gameParty[_0x450ea0(0x1e7)]=this[_0x450ea0(0x1c3)]['items']),_0x2e9359[_0x450ea0(0x166)]&&($gameParty[_0x450ea0(0x16c)]=this['_ngpData'][_0x450ea0(0x1b2)]),_0x2e9359[_0x450ea0(0x1ed)]&&($gameParty['_armors']=this['_ngpData'][_0x450ea0(0x1b1)]),$gameParty['removeNewGamePlusNoCarryOverItems']();},DataManager[_0x286b10(0x190)]=function(){const _0x48d8a9=_0x286b10,_0x3e70e0=VisuMZ[_0x48d8a9(0x1aa)]['Settings'],_0x827ec1=_0x3e70e0[_0x48d8a9(0x16b)];if(_0x827ec1<=0x0)return;$gameTemp['reserveCommonEvent'](_0x827ec1);},TextManager[_0x286b10(0x1b8)]=VisuMZ[_0x286b10(0x1aa)][_0x286b10(0x193)]['SceneSave']['TitleFmt'],TextManager[_0x286b10(0x174)]=VisuMZ[_0x286b10(0x1aa)][_0x286b10(0x193)][_0x286b10(0x208)][_0x286b10(0x1bf)],ColorManager['getColor']=function(_0x5cf5aa){const _0x52f626=_0x286b10;return _0x5cf5aa=String(_0x5cf5aa),_0x5cf5aa[_0x52f626(0x207)](/#(.*)/i)?_0x52f626(0x1b3)[_0x52f626(0x1d6)](String(RegExp['$1'])):this[_0x52f626(0x1f8)](Number(_0x5cf5aa));},ColorManager[_0x286b10(0x1e1)]=function(){const _0xe35e4c=_0x286b10;return ColorManager[_0xe35e4c(0x1d5)](VisuMZ[_0xe35e4c(0x1aa)][_0xe35e4c(0x193)][_0xe35e4c(0x208)][_0xe35e4c(0x188)]);},SceneManager['isSceneMap']=function(){const _0x9ca3ea=_0x286b10;return this[_0x9ca3ea(0x1ef)]&&this[_0x9ca3ea(0x1ef)][_0x9ca3ea(0x1fa)]===Scene_Map;},SceneManager[_0x286b10(0x169)]=function(){const _0x2a666e=_0x286b10;return this[_0x2a666e(0x1ef)]&&this[_0x2a666e(0x1ef)][_0x2a666e(0x1fa)]===Scene_SaveNewGamePlus;},VisuMZ[_0x286b10(0x1aa)][_0x286b10(0x1fb)]=Game_System[_0x286b10(0x184)][_0x286b10(0x1cb)],Game_System[_0x286b10(0x184)][_0x286b10(0x1cb)]=function(){const _0x5e3a96=_0x286b10;VisuMZ[_0x5e3a96(0x1aa)][_0x5e3a96(0x1fb)][_0x5e3a96(0x1f9)](this),this[_0x5e3a96(0x176)]();},Game_System[_0x286b10(0x184)][_0x286b10(0x176)]=function(){const _0x5ab393=_0x286b10;this[_0x5ab393(0x168)]=![],this[_0x5ab393(0x15a)]=0x0,this[_0x5ab393(0x1e0)]=![];},Game_System['prototype']['isNewGamePlusEnabled']=function(){const _0xac7b92=_0x286b10;return SceneManager[_0xac7b92(0x169)]();},Game_System[_0x286b10(0x184)][_0x286b10(0x201)]=function(){const _0x4f0dc7=_0x286b10;if(this[_0x4f0dc7(0x15a)]===undefined)this['initNewGamePlusSettings']();return this[_0x4f0dc7(0x15a)];},Game_System[_0x286b10(0x184)][_0x286b10(0x18f)]=function(_0x512a46){const _0x459485=_0x286b10;if(this['_newGamePlusLoops']===undefined)this[_0x459485(0x176)]();this[_0x459485(0x15a)]=_0x512a46;},Game_System['prototype'][_0x286b10(0x1c5)]=function(){const _0x3a4a22=_0x286b10;if(this['_newGamePlusLoaded']===undefined)this[_0x3a4a22(0x176)]();return this[_0x3a4a22(0x1e0)];},Game_System['prototype'][_0x286b10(0x164)]=function(_0xe02b69){const _0x1f22be=_0x286b10;if(this[_0x1f22be(0x1e0)]===undefined)this[_0x1f22be(0x176)]();this[_0x1f22be(0x1e0)]=_0xe02b69;},Game_Actor[_0x286b10(0x184)]['newGamePlusAdjustLevel']=function(){const _0x39b12e=_0x286b10;while(!this[_0x39b12e(0x172)]()&&this[_0x39b12e(0x16d)]()>=this[_0x39b12e(0x1ea)]()){this[_0x39b12e(0x18a)]();}while(this['currentExp']()<this[_0x39b12e(0x1a7)]()){this['levelDown']();}},Game_Actor[_0x286b10(0x184)][_0x286b10(0x1cd)]=function(){const _0x39554b=_0x286b10;var _0x1047cf=$dataActors[this[_0x39554b(0x1e8)]];this[_0x39554b(0x171)]=_0x1047cf['classId'],this['initEquips'](_0x1047cf[_0x39554b(0x15c)]),this[_0x39554b(0x1dc)](),this['recoverAll']();},Game_Party['prototype'][_0x286b10(0x175)]=function(){const _0x37a658=_0x286b10;var _0x51bc8b=$gameParty[_0x37a658(0x1f4)](),_0x280e9f=_0x51bc8b[_0x37a658(0x16a)];for(var _0x473102=0x0;_0x473102<_0x280e9f;++_0x473102){var _0x217e25=_0x51bc8b[_0x473102];if(!_0x217e25)continue;if(DataManager[_0x37a658(0x1ca)](_0x217e25))continue;var _0x48c802=$gameParty['numItems'](_0x217e25);$gameParty[_0x37a658(0x15b)](_0x217e25,_0x48c802);}},VisuMZ[_0x286b10(0x1aa)]['Scene_Map_needsSlowFadeOut']=Scene_Map[_0x286b10(0x184)][_0x286b10(0x1c0)],Scene_Map['prototype'][_0x286b10(0x1c0)]=function(){const _0x1cde3b=_0x286b10;if(SceneManager[_0x1cde3b(0x1ec)](Scene_NewGamePlusTransition))return!![];return VisuMZ[_0x1cde3b(0x1aa)][_0x1cde3b(0x19d)]['call'](this);},VisuMZ['NewGamePlus'][_0x286b10(0x1df)]=Scene_Load[_0x286b10(0x184)][_0x286b10(0x1a5)],Scene_Load['prototype'][_0x286b10(0x1a5)]=function(){const _0x1ecb25=_0x286b10;this[_0x1ecb25(0x186)]&&this[_0x1ecb25(0x186)][_0x1ecb25(0x1cf)](this['_listWindow']['savefileId']())?this['startNewGamePlus']():VisuMZ[_0x1ecb25(0x1aa)][_0x1ecb25(0x1df)][_0x1ecb25(0x1f9)](this);},Scene_Load[_0x286b10(0x184)][_0x286b10(0x1a6)]=function(){const _0xd33b73=_0x286b10;SoundManager[_0xd33b73(0x1b5)](),DataManager[_0xd33b73(0x1a6)](),this[_0xd33b73(0x200)](),SceneManager[_0xd33b73(0x1b4)](Scene_Map);};function Scene_SaveNewGamePlus(){this['initialize'](...arguments);}Scene_SaveNewGamePlus['prototype']=Object[_0x286b10(0x173)](Scene_Save['prototype']),Scene_SaveNewGamePlus[_0x286b10(0x184)][_0x286b10(0x1fa)]=Scene_SaveNewGamePlus,Scene_SaveNewGamePlus[_0x286b10(0x184)][_0x286b10(0x1fe)]=function(){const _0x4b7d64=_0x286b10;return TextManager[_0x4b7d64(0x174)];};function Scene_NewGamePlusTransition(){const _0x12d31b=_0x286b10;this[_0x12d31b(0x1cb)](...arguments);}Scene_NewGamePlusTransition[_0x286b10(0x184)]=Object[_0x286b10(0x173)](Scene_Base[_0x286b10(0x184)]),Scene_NewGamePlusTransition[_0x286b10(0x184)][_0x286b10(0x1fa)]=Scene_NewGamePlusTransition,Scene_NewGamePlusTransition[_0x286b10(0x184)]['initialize']=function(){const _0x2120de=_0x286b10;Scene_Base['prototype'][_0x2120de(0x1cb)][_0x2120de(0x1f9)](this);},Scene_NewGamePlusTransition[_0x286b10(0x184)][_0x286b10(0x1ab)]=function(){const _0x2de607=_0x286b10;DataManager['startNewGamePlus'](),SceneManager[_0x2de607(0x1b4)](Scene_Map);},Window_SavefileList[_0x286b10(0x184)][_0x286b10(0x1cf)]=function(_0x2d9c9d){const _0xcbd643=_0x286b10;if(_0x2d9c9d===0x0)return![];const _0x1efcb1=DataManager[_0xcbd643(0x1be)](_0x2d9c9d);return _0x1efcb1&&_0x1efcb1[_0xcbd643(0x1d2)];},VisuMZ[_0x286b10(0x1aa)][_0x286b10(0x1fd)]=Window_SavefileList[_0x286b10(0x184)]['drawTitle'],Window_SavefileList[_0x286b10(0x184)][_0x286b10(0x1af)]=function(_0x59c82c,_0xb8c244,_0x105985){const _0x3747b6=_0x286b10;this[_0x3747b6(0x1cf)](_0x59c82c)?this[_0x3747b6(0x162)](_0x59c82c,_0xb8c244,_0x105985):VisuMZ[_0x3747b6(0x1aa)][_0x3747b6(0x1fd)][_0x3747b6(0x1f9)](this,_0x59c82c,_0xb8c244,_0x105985);},Window_SavefileList[_0x286b10(0x184)][_0x286b10(0x162)]=function(_0x50e280,_0x1e7bf4,_0xca086e){const _0x201978=_0x286b10;if(_0x50e280===0x0)return;const _0x2563e2=this[_0x201978(0x1dd)](_0x50e280),_0x511523=TextManager['fileNewGamePlus']['format'](_0x50e280);this[_0x201978(0x1f2)](ColorManager[_0x201978(0x1e1)]()),this[_0x201978(0x15f)](_0x511523,_0x1e7bf4,_0xca086e,Math[_0x201978(0x18e)](0xb4,_0x2563e2[_0x201978(0x1c7)]-0xb4));};