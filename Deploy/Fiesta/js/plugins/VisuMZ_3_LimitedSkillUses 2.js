//=============================================================================
// VisuStella MZ - Limited Skill Uses
// VisuMZ_3_LimitedSkillUses.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_LimitedSkillUses = true;

var VisuMZ = VisuMZ || {};
VisuMZ.LimitedSkillUses = VisuMZ.LimitedSkillUses || {};
VisuMZ.LimitedSkillUses.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.00] [LimitedSkillUses]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Limited_Skill_Uses_VisuStella_MZ
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin enables you to set a limited amount of times certain skills (or
 * all skills) can be used per battle or ever. This adds a different type of
 * skill currency and balance mechanic in limiting the amount of times a skill
 * can be used without directly having to alter MP, TP, or the like.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Determine globally or individually how many skill uses a battler can use
 *   per battle (does not apply to basic attack and guard skills).
 * * Determine how many uses are restored per battle.
 * * Use notetag effects to alter the amount of uses a user or target has
 *   globally, for specific skill types, or for specific individual skills.
 * * Adjust how the limited uses are displayed in-game.
 * * Equipment, class types, states, etc. can all affect the maximum quantity
 *   of uses for skills, too.
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
 * * VisuMZ_1_SkillsStatesCore
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Basic Limited Use-Related Notetags ===
 * 
 * ---
 *
 * <Limited Uses: x>
 *
 * - Used for: Skill Notetags
 * - Sets the limited use maximum base amount for this skill.
 * - This value will override the Plugin Parameter settings for a base value if
 *   "All Skills Limited?" is turned on.
 * - Replace 'x' with a number value representing the base maximum uses this
 *   skill can have.
 *
 * ---
 *
 * <Unlimited Use>
 *
 * - Used for: Skill Notetags
 * - If the Plugin Parameter "All Skills Limited?" is turned on, this will
 *   disable limited uses for this skill, allowing it to be used in unlimited
 *   amounts independent of the Limited Use base.
 *
 * ---
 * 
 * === Use Recovery-Related Notetags ===
 * 
 * ---
 *
 * <Victory Uses Recover: x>
 * <Escape Uses Recover: x>
 * <Defeat Uses Recover: x>
 * <After Battle Uses Recover: x>
 *
 * - Used for: Skill Notetags
 * - Determines how many limited uses are recovered at the end of each battle
 *   depending on the result.
 *   - Victory notetag variant requires winning the battle.
 *   - Escape notetag variant requires escaping the battle.
 *   - Defeat notetag variant requires losing the battle.
 *   - After Battle notetag variant applies to all cases.
 * - Replace 'x' with how many uses are restored upon completing a battle.
 *
 * ---
 *
 * <Bypass Recover All Uses>
 *
 * - Used for: Skill Notetags
 * - This prevents the skill from recovering all uses with the "Recover All"
 *   event command.
 *
 * ---
 *
 * <Allow Recover All Uses>
 *
 * - Used for: Skill Notetags
 * - This allows the skill to recover all uses with the "Recover All" event
 *   command when the "Recover All?" plugin parameter is disabled.
 *
 * ---
 * 
 * === Use Alteration-Related Notetags ===
 * 
 * ---
 *
 * <User Global Uses: +x>
 * <User Global Uses: -x>
 *
 * <User SType id Uses: +x>
 * <User SType id Uses: -x>
 * <User SType name Uses: +x>
 * <User SType name Uses: -x>
 *
 * <User Skill id Uses: +x>
 * <User Skill id Uses: -x>
 * <User Skill name Uses: +x>
 * <User Skill name Uses: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the limited use amounts for the action's user.
 *   - Global notetag variant affects all limited uses.
 *   - SType notetag variant effects all skills with a matching type.
 *   - Skill notetag viarant effects a specific matching skill.
 * - Replace 'id' with the ID of the skill type.
 * - Replace 'name' with the name of the skill type (without text codes).
 * - Replace 'x' with the amount to alter the remaining uses by. Positive
 *   values restore uses while negative values reduce remaining uses.
 *
 * ---
 *
 * <Target Global Uses: +x>
 * <Target Global Uses: -x>
 *
 * <Target SType id Uses: +x>
 * <Target SType id Uses: -x>
 * <Target SType name Uses: +x>
 * <Target SType name Uses: -x>
 *
 * <Target Skill id Uses: +x>
 * <Target Skill id Uses: -x>
 * <Target Skill name Uses: +x>
 * <Target Skill name Uses: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the limited use amounts for the action's target.
 *   - Global notetag variant affects all limited uses.
 *   - SType notetag variant effects all skills with a matching type.
 *     - Replace 'id' with the ID of the skill type.
 *     - Replace 'name' with the name of the skill type (without text codes).
 *   - Skill notetag viarant effects a specific matching skill.
 *     - Replace 'id' with the ID of the skill.
 *     - Replace 'name' with the name of the skill.
 * - Replace 'x' with the amount to alter the remaining uses by. Positive
 *   values restore uses while negative values reduce remaining uses.
 *
 * ---
 * 
 * === Trait Based-Related Notetags ===
 * 
 * ---
 *
 * <Gloal Use Max: +x>
 * <Gloal Use Max: -x>
 * 
 * <SType id Use Max: +x>
 * <SType id Use Max: -x>
 * <SType name Use Max: +x>
 * <SType name Use Max: -x>
 * 
 * <Skill id Use Max: +x>
 * <Skill id Use Max: -x>
 * <Skill name Use Max: +x>
 * <Skill name Use Max: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes the maximum limited uses for all skills, skills of a particular
 *   type, or individual skills.
 *   - Global notetag variant affects all limited uses.
 *   - SType notetag variant effects all skills with a matching type.
 *     - Replace 'id' with the ID of the skill type.
 *     - Replace 'name' with the name of the skill type (without text codes).
 *   - Skill notetag viarant effects a specific matching skill.
 *     - Replace 'id' with the ID of the skill.
 *     - Replace 'name' with the name of the skill.
 * - Replace 'x' with the amount to adjust the maximum uses by. Positive values
 *   increase the maximum uses while negative values decrease them.
 *   - These will be hard capped by the settings found in the Plugin Parmeters.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings regarding Limited Skill Uses.
 *
 * ---
 *
 * General
 * 
 *   Limited Use Icon:
 *   - Icon used for representing Limited Uses in the cost.
 * 
 *   Cost Format:
 *   - Format for Limited Use cost display.
 *   - %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * 
 *   Empty Format:
 *   - Format for Limited Use cost display when empty.
 *   - %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * 
 *   Cost Position Front?:
 *   - Put the Limited Uses at the front of skill/item costs?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanical settings regarding Limited Skill Uses.
 *
 * ---
 *
 * All Limited
 * 
 *   All Skills Limited?:
 *   - Make all skills have limited uses?
 *   - Does not apply to basic attack and guard.
 * 
 *     Default Max:
 *     - If all skills are limited, what is the default maximum uses?
 *
 * ---
 *
 * Hard Caps
 * 
 *   Maximum:
 *   - What is the maximum hardcap for limited uses?
 * 
 *   Minimum:
 *   - What is the minimum hardcap for limited uses?
 *
 * ---
 *
 * Recovery
 * 
 *   Battle Victory:
 *   - How many uses for each skill does a victory restore by default?
 * 
 *   Battle Escape:
 *   - How many uses for each skill does an escape restore by default?
 * 
 *   Battle Defeat:
 *   - How many uses for each skill does a defeat restore by default?
 * 
 *   Recover All?:
 *   - Does the "Recover All" command restore Limited Skill Uses?
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
 * Version 1.00 Official Release Date: March 10, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PluginCommandFunctionName
 * @text Category: Function Name
 * @desc Plugin Command Description Text
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg option:num
 * @text Option Text
 * @type number
 * @max 1
 * @desc Change the value to this number
 * @default 42069
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableLimitedSkillUsesMenu
 * @text System: Enable LimitedSkillUses in Menu?
 * @desc Enables/disables LimitedSkillUses menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables LimitedSkillUses menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowLimitedSkillUsesMenu
 * @text System: Show LimitedSkillUses in Menu?
 * @desc Shows/hides LimitedSkillUses menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides LimitedSkillUses menu inside the main menu.
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
 * @param LimitedSkillUses
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
 * @desc General settings regarding Limited Skill Uses.
 * @default {"Icon:num":"160","CostFmt:str":"\\FS[22]\\C[8]%1/%2\\C[0]","EmptyFmt:str":"\\FS[22]\\C[8]Empty\\C[0]","CostPosition:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanical settings regarding Limited Skill Uses.
 * @default {"AllLimited":"","AllLimited:eval":"false","DefaultMax:num":"2","HardCaps":"","Maximum:num":"100","Minimum:num":"1","Recovery":"","BattleVictory:num":"10","BattleEscape:num":"5","BattleDefeat:num":"5","RecoverAll:eval":"true"}
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
 * @param Icon:num
 * @text Limited Use Icon
 * @desc Icon used for representing Limited Uses in the cost.
 * @default 160
 *
 * @param CostFmt:str
 * @text Cost Format
 * @desc Format for Limited Use cost display.
 * %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * @default \FS[22]\C[8]%1/%2\C[0]
 *
 * @param EmptyFmt:str
 * @text Empty Format
 * @desc Format for Limited Use cost display when empty.
 * %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * @default \FS[22]\C[8]Empty\C[0]
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the Limited Uses at the front of skill/item costs?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param AllLimited
 * @text All Limited
 *
 * @param AllLimited:eval
 * @text All Skills Limited?
 * @parent AllLimited
 * @type boolean
 * @on Limited
 * @off Normal
 * @desc Make all skills have limited uses?
 * Does not apply to basic attack and guard.
 * @default false
 *
 * @param DefaultMax:num
 * @text Default Max
 * @parent AllLimited:eval
 * @type number
 * @min 1
 * @desc If all skills are limited, what is the default maximum uses?
 * @default 2
 *
 * @param HardCaps
 * @text Hard Caps
 *
 * @param Maximum:num
 * @text Maximum
 * @parent HardCaps
 * @type number
 * @desc What is the maximum hardcap for limited uses?
 * @default 100
 *
 * @param Minimum:num
 * @text Minimum
 * @parent HardCaps
 * @type number
 * @desc What is the minimum hardcap for limited uses?
 * @default 1
 *
 * @param Recovery
 *
 * @param BattleVictory:num
 * @text Battle Victory
 * @parent Recovery
 * @type number
 * @desc How many uses for each skill does a victory restore by default?
 * @default 10
 *
 * @param BattleEscape:num
 * @text Battle Escape
 * @parent Recovery
 * @type number
 * @desc How many uses for each skill does an escape restore by default?
 * @default 5
 *
 * @param BattleDefeat:num
 * @text Battle Defeat
 * @parent Recovery
 * @type number
 * @desc How many uses for each skill does a defeat restore by default?
 * @default 5
 *
 * @param RecoverAll:eval
 * @text Recover All?
 * @parent Recovery
 * @type boolean
 * @on Recovers
 * @off Does Not
 * @desc Does the "Recover All" command restore Limited Skill Uses?
 * @default true
 *
 */
//=============================================================================

const _0x4188=['VisuMZ_1_SkillsStatesCore','meetsSkillConditions','getSkillIdWithName','RecoverAll','BattleVictory','exit','FUNC','toUpperCase','recoverAll','subject','call','LIMITED_SKILL_USE_ALL_LIMITED','13oWAQIw','getStypeIdWithName','Window_Base_makeAdditionalSkillCostText','endBattleRecoveryLimitedSkillUses','RecoverEscape','BattleManager_endBattle','TargetSTypeLimitedUses','limitedUseEmptyFmt','AllowRecoverAll','guardSkillId','applyLimitedSkillUsesUserEffect','limitedUseFmt','recoverLimitedSkillUsesBattle','Game_BattlerBase_meetsSkillConditions','576092Ircxpi','TargetSkillLimitedUses','4FDqyfm','SkillLimitedUses','isAttackOrGuardSkill','UserSkillLimitedUses','ARRAYJSON','stypeId','Game_BattlerBase_paySkillCost','RecoverVictory','RegExp','_skillLimitedUseTimes','Maximum','STR','UserGlobalLimitedUses','184787EGqmqO','ARRAYEVAL','ConvertParams','allMembers','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','LIMITED_SKILL_USE_BASE','STypeLimitedUses','Settings','clamp','makeAdditionalSkillCostText','testItemEffect','skillLimitedUseMax','limitedUseIcon','test','_cache_SkillLimitedUseMax','trim','isSkillLimitedUse','name','_stypeIDs','map','calcSkillLimitedUseMax','paySkillCost','canRecoverAllLimitedSkillUses','parameters','applyItemUserEffect','General','skillCostSeparator','LIMITED_SKILL_USE_RECOVERY','format','alterLimitedSkillUses','LIMITED_SKILL_USE_RECOVER_ALL','306283TOlJJO','paySkillLimitedUse','24XrjRLX','102MsDerQ','defeat','skills','UserSTypeLimitedUses','6465uQLneE','recoverLimitedSkillUses','81KVGIWS','item','UnlimitedUse','makeAdditionalCostTextLimitedSkillUses','setSkillLimitedUseTimes','recoverAllLimitedSkillUses','STRUCT','filter','Game_Action_testItemEffect','LIMITED_SKILL_USE_HARDCAP_MIN','ARRAYSTR','Game_Action_applyItemUserEffect','_skillIDs','parse','RecoverDefeat','refresh','LIMITED_SKILL_USE_HARDCAP_MAX','replace','65036NNtuCL','BypassRecoverAll','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ARRAYNUM','prototype','BattleDefeat','description','traitObjects','note','match','TargetGlobalLimitedUses','status','601pUQTFo','LimitedSkillUses','Mechanics','endBattle','ARRAYSTRUCT','32438ZDTpAf','CostPosition','skillLimitedUseTimes','JSON','_inBattle','ARRAYFUNC','max','skillTypes'];const _0x1af4=function(_0x2e81ac,_0x54ea4a){_0x2e81ac=_0x2e81ac-0xf4;let _0x41880a=_0x4188[_0x2e81ac];return _0x41880a;};const _0x2e1d3a=_0x1af4;(function(_0x1a4917,_0x4a36eb){const _0x1d689b=_0x1af4;while(!![]){try{const _0x50d0c9=-parseInt(_0x1d689b(0x103))+-parseInt(_0x1d689b(0x14c))*-parseInt(_0x1d689b(0x105))+parseInt(_0x1d689b(0x133))*-parseInt(_0x1d689b(0x15d))+-parseInt(_0x1d689b(0x158))*parseInt(_0x1d689b(0x134))+parseInt(_0x1d689b(0x13a))*-parseInt(_0x1d689b(0x138))+-parseInt(_0x1d689b(0x131))+parseInt(_0x1d689b(0x112))*parseInt(_0x1d689b(0xf5));if(_0x50d0c9===_0x4a36eb)break;else _0x1a4917['push'](_0x1a4917['shift']());}catch(_0x912191){_0x1a4917['push'](_0x1a4917['shift']());}}}(_0x4188,0x65b09));var label='LimitedSkillUses',tier=tier||0x0,dependencies=[_0x2e1d3a(0x165)],pluginData=$plugins[_0x2e1d3a(0x141)](function(_0x38bc02){const _0x353ff1=_0x2e1d3a;return _0x38bc02[_0x353ff1(0x157)]&&_0x38bc02[_0x353ff1(0x152)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x2e1d3a(0x114)]=function(_0x474fc9,_0x23e80e){const _0x1e1b6f=_0x2e1d3a;for(const _0x450078 in _0x23e80e){if(_0x450078[_0x1e1b6f(0x155)](/(.*):(.*)/i)){const _0x110add=String(RegExp['$1']),_0x97b2cf=String(RegExp['$2'])[_0x1e1b6f(0x16c)]()[_0x1e1b6f(0x121)]();let _0x2f90c5,_0x18a0cb,_0x58f1e5;switch(_0x97b2cf){case'NUM':_0x2f90c5=_0x23e80e[_0x450078]!==''?Number(_0x23e80e[_0x450078]):0x0;break;case _0x1e1b6f(0x14f):_0x18a0cb=_0x23e80e[_0x450078]!==''?JSON[_0x1e1b6f(0x147)](_0x23e80e[_0x450078]):[],_0x2f90c5=_0x18a0cb['map'](_0x5dd2da=>Number(_0x5dd2da));break;case'EVAL':_0x2f90c5=_0x23e80e[_0x450078]!==''?eval(_0x23e80e[_0x450078]):null;break;case _0x1e1b6f(0x113):_0x18a0cb=_0x23e80e[_0x450078]!==''?JSON['parse'](_0x23e80e[_0x450078]):[],_0x2f90c5=_0x18a0cb[_0x1e1b6f(0x125)](_0xdba8a7=>eval(_0xdba8a7));break;case _0x1e1b6f(0x160):_0x2f90c5=_0x23e80e[_0x450078]!==''?JSON[_0x1e1b6f(0x147)](_0x23e80e[_0x450078]):'';break;case _0x1e1b6f(0x109):_0x18a0cb=_0x23e80e[_0x450078]!==''?JSON[_0x1e1b6f(0x147)](_0x23e80e[_0x450078]):[],_0x2f90c5=_0x18a0cb[_0x1e1b6f(0x125)](_0x58414d=>JSON['parse'](_0x58414d));break;case _0x1e1b6f(0x16b):_0x2f90c5=_0x23e80e[_0x450078]!==''?new Function(JSON[_0x1e1b6f(0x147)](_0x23e80e[_0x450078])):new Function('return\x200');break;case _0x1e1b6f(0x162):_0x18a0cb=_0x23e80e[_0x450078]!==''?JSON['parse'](_0x23e80e[_0x450078]):[],_0x2f90c5=_0x18a0cb[_0x1e1b6f(0x125)](_0x2a332e=>new Function(JSON[_0x1e1b6f(0x147)](_0x2a332e)));break;case _0x1e1b6f(0x110):_0x2f90c5=_0x23e80e[_0x450078]!==''?String(_0x23e80e[_0x450078]):'';break;case _0x1e1b6f(0x144):_0x18a0cb=_0x23e80e[_0x450078]!==''?JSON[_0x1e1b6f(0x147)](_0x23e80e[_0x450078]):[],_0x2f90c5=_0x18a0cb[_0x1e1b6f(0x125)](_0x524417=>String(_0x524417));break;case _0x1e1b6f(0x140):_0x58f1e5=_0x23e80e[_0x450078]!==''?JSON[_0x1e1b6f(0x147)](_0x23e80e[_0x450078]):{},_0x2f90c5=VisuMZ[_0x1e1b6f(0x114)]({},_0x58f1e5);break;case _0x1e1b6f(0x15c):_0x18a0cb=_0x23e80e[_0x450078]!==''?JSON[_0x1e1b6f(0x147)](_0x23e80e[_0x450078]):[],_0x2f90c5=_0x18a0cb[_0x1e1b6f(0x125)](_0x28c5c6=>VisuMZ[_0x1e1b6f(0x114)]({},JSON[_0x1e1b6f(0x147)](_0x28c5c6)));break;default:continue;}_0x474fc9[_0x110add]=_0x2f90c5;}}return _0x474fc9;},(_0x278593=>{const _0x4e2f5e=_0x2e1d3a,_0x5f5d47=_0x278593[_0x4e2f5e(0x123)];for(const _0x24622b of dependencies){if(!Imported[_0x24622b]){alert(_0x4e2f5e(0x116)[_0x4e2f5e(0x12e)](_0x5f5d47,_0x24622b)),SceneManager[_0x4e2f5e(0x16a)]();break;}}const _0x30011d=_0x278593[_0x4e2f5e(0x152)];if(_0x30011d['match'](/\[Version[ ](.*?)\]/i)){const _0x21476b=Number(RegExp['$1']);_0x21476b!==VisuMZ[label]['version']&&(alert(_0x4e2f5e(0x14e)['format'](_0x5f5d47,_0x21476b)),SceneManager[_0x4e2f5e(0x16a)]());}if(_0x30011d[_0x4e2f5e(0x155)](/\[Tier[ ](\d+)\]/i)){const _0x4b33d5=Number(RegExp['$1']);_0x4b33d5<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x4e2f5e(0x12e)](_0x5f5d47,_0x4b33d5,tier)),SceneManager[_0x4e2f5e(0x16a)]()):tier=Math[_0x4e2f5e(0x163)](_0x4b33d5,tier);}VisuMZ[_0x4e2f5e(0x114)](VisuMZ[label][_0x4e2f5e(0x119)],_0x278593[_0x4e2f5e(0x129)]);})(pluginData),VisuMZ[_0x2e1d3a(0x159)][_0x2e1d3a(0x10d)]={'LimitedUse':/<(?:LIMIT|LIMITED) (?:USE|USES):[ ](\d+)>/i,'UnlimitedUse':/<UNLIMITED (?:USE|USES)>/i,'RecoverVictory':/<(?:VICTORY|AFTER BATTLE|BATTLE) (?:USE|USES) (?:RECOVER|RECOVERY):[ ](\d+)>/i,'RecoverEscape':/<(?:ESCAPE|AFTER BATTLE|BATTLE) (?:USE|USES) (?:RECOVER|RECOVERY):[ ](\d+)>/i,'RecoverDefeat':/<(?:DEFEAT|AFTER BATTLE|BATTLE) (?:USE|USES) (?:RECOVER|RECOVERY):[ ](\d+)>/i,'BypassRecoverAll':/<BYPASS RECOVER ALL USES>/i,'AllowRecoverAll':/<ALLOW RECOVER ALL USES>/i,'UserGlobalLimitedUses':/<USER GLOBAL (?:USE|USES):[ ]([\+\-]\d+)>/gi,'UserSTypeLimitedUses':/<USER STYPE[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'UserSkillLimitedUses':/<USER SKILL[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'TargetGlobalLimitedUses':/<TARGET GLOBAL (?:USE|USES):[ ]([\+\-]\d+)>/gi,'TargetSTypeLimitedUses':/<TARGET STYPE[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'TargetSkillLimitedUses':/<TARGET SKILL[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'GlobalLimitedUses':/<GLOBAL USE (?:MAX|MAXIMUM):[ ]([\+\-]\d+)>/i,'STypeLimitedUses':/<STYPE[ ](.*)[ ]USE (?:MAX|MAXIMUM):[ ]([\+\-]\d+)>/gi,'SkillLimitedUses':/<SKILL[ ](.*)[ ]USE (?:MAX|MAXIMUM):[ ]([\+\-]\d+)>/gi},DataManager['getSkillIdWithName']=function(_0x4e2b0b){const _0x29511c=_0x2e1d3a;_0x4e2b0b=_0x4e2b0b[_0x29511c(0x16c)]()[_0x29511c(0x121)](),this[_0x29511c(0x146)]=this[_0x29511c(0x146)]||{};if(this['_skillIDs'][_0x4e2b0b])return this[_0x29511c(0x146)][_0x4e2b0b];for(const _0x3600d9 of $dataSkills){if(!_0x3600d9)continue;this[_0x29511c(0x146)][_0x3600d9[_0x29511c(0x123)]['toUpperCase']()[_0x29511c(0x121)]()]=_0x3600d9['id'];}return this['_skillIDs'][_0x4e2b0b]||0x0;},DataManager[_0x2e1d3a(0xf6)]=function(_0x15ec82){const _0x501157=_0x2e1d3a;_0x15ec82=_0x15ec82[_0x501157(0x16c)]()[_0x501157(0x121)](),this[_0x501157(0x124)]=this[_0x501157(0x124)]||{};if(this[_0x501157(0x124)][_0x15ec82])return this['_stypeIDs'][_0x15ec82];for(let _0x543347=0x1;_0x543347<0x64;_0x543347++){if(!$dataSystem[_0x501157(0x164)][_0x543347])continue;let _0x47876d=$dataSystem[_0x501157(0x164)][_0x543347][_0x501157(0x16c)]()[_0x501157(0x121)]();_0x47876d=_0x47876d[_0x501157(0x14b)](/\x1I\[(\d+)\]/gi,''),_0x47876d=_0x47876d[_0x501157(0x14b)](/\\I\[(\d+)\]/gi,''),this[_0x501157(0x124)][_0x47876d]=_0x543347;}return this['_stypeIDs'][_0x15ec82]||0x0;},DataManager[_0x2e1d3a(0x122)]=function(_0x3d22f5){const _0x452356=_0x2e1d3a;if(!_0x3d22f5)return![];const _0x1bd387=VisuMZ[_0x452356(0x159)][_0x452356(0x10d)],_0x38a315=_0x3d22f5[_0x452356(0x154)];if(_0x38a315[_0x452356(0x155)](_0x1bd387['LimitedUse']))return!![];else{if(_0x38a315['match'](_0x1bd387[_0x452356(0x13c)]))return![];}return Game_BattlerBase[_0x452356(0xf4)];},DataManager[_0x2e1d3a(0x128)]=function(_0x344610){const _0x4befb6=_0x2e1d3a;if(!_0x344610)return![];const _0x152de6=VisuMZ['LimitedSkillUses'][_0x4befb6(0x10d)],_0x6acd57=_0x344610[_0x4befb6(0x154)];if(Game_BattlerBase[_0x4befb6(0x130)]){if(_0x6acd57[_0x4befb6(0x155)](_0x152de6[_0x4befb6(0x14d)]))return![];return!![];}else{if(_0x6acd57[_0x4befb6(0x155)](_0x152de6[_0x4befb6(0xfd)]))return!![];return![];}},ImageManager['limitedUseIcon']=VisuMZ[_0x2e1d3a(0x159)][_0x2e1d3a(0x119)][_0x2e1d3a(0x12b)]['Icon'],TextManager['limitedUseFmt']=VisuMZ[_0x2e1d3a(0x159)][_0x2e1d3a(0x119)][_0x2e1d3a(0x12b)]['CostFmt'],TextManager[_0x2e1d3a(0xfc)]=VisuMZ[_0x2e1d3a(0x159)][_0x2e1d3a(0x119)]['General']['EmptyFmt'],VisuMZ[_0x2e1d3a(0x159)][_0x2e1d3a(0xfa)]=BattleManager[_0x2e1d3a(0x15b)],BattleManager[_0x2e1d3a(0x15b)]=function(_0x31e568){const _0x2d3bd6=_0x2e1d3a;VisuMZ[_0x2d3bd6(0x159)][_0x2d3bd6(0xfa)]['call'](this,_0x31e568),$gameParty[_0x2d3bd6(0x139)](_0x31e568);},VisuMZ[_0x2e1d3a(0x159)][_0x2e1d3a(0x145)]=Game_Action[_0x2e1d3a(0x150)][_0x2e1d3a(0x12a)],Game_Action[_0x2e1d3a(0x150)][_0x2e1d3a(0x12a)]=function(_0x3ac01f){const _0x5dea4b=_0x2e1d3a;VisuMZ[_0x5dea4b(0x159)]['Game_Action_applyItemUserEffect'][_0x5dea4b(0x16f)](this,_0x3ac01f),this[_0x5dea4b(0xff)](_0x3ac01f);},Game_Action[_0x2e1d3a(0x150)][_0x2e1d3a(0xff)]=function(_0x52cb74){const _0x2b8818=_0x2e1d3a;if(!this[_0x2b8818(0x13b)]())return;const _0x2ebcd1=VisuMZ[_0x2b8818(0x159)][_0x2b8818(0x10d)];if(this[_0x2b8818(0x16e)]()){const _0x50a124=_0x2ebcd1[_0x2b8818(0x111)],_0x3e8c83=_0x2ebcd1[_0x2b8818(0x137)],_0x44c5f8=_0x2ebcd1[_0x2b8818(0x108)];this[_0x2b8818(0x16e)]()[_0x2b8818(0x12f)](this[_0x2b8818(0x13b)](),_0x50a124,_0x3e8c83,_0x44c5f8);}if(_0x52cb74){const _0x4b28bc=_0x2ebcd1[_0x2b8818(0x156)],_0x2c21bd=_0x2ebcd1[_0x2b8818(0xfb)],_0x51e63e=_0x2ebcd1[_0x2b8818(0x104)];_0x52cb74[_0x2b8818(0x12f)](this[_0x2b8818(0x13b)](),_0x4b28bc,_0x2c21bd,_0x51e63e);}},VisuMZ[_0x2e1d3a(0x159)][_0x2e1d3a(0x142)]=Game_Action['prototype'][_0x2e1d3a(0x11c)],Game_Action[_0x2e1d3a(0x150)][_0x2e1d3a(0x11c)]=function(_0x2236ee,_0x438ab0){const _0x38fed3=_0x2e1d3a,_0x5b1e85=VisuMZ['LimitedSkillUses']['RegExp'],_0x1fbec1=this[_0x38fed3(0x13b)]()[_0x38fed3(0x154)],_0x217f4e=[_0x38fed3(0x111),'UserSTypeLimitedUses',_0x38fed3(0x108),_0x38fed3(0x156),'TargetSTypeLimitedUses',_0x38fed3(0x104)];for(const _0x41522f of _0x217f4e){if(_0x1fbec1[_0x38fed3(0x155)](_0x5b1e85[_0x41522f]))return!![];}return VisuMZ[_0x38fed3(0x159)]['Game_Action_testItemEffect'][_0x38fed3(0x16f)](this,_0x2236ee,_0x438ab0);},Game_BattlerBase[_0x2e1d3a(0xf4)]=VisuMZ[_0x2e1d3a(0x159)]['Settings'][_0x2e1d3a(0x15a)]['AllLimited'],Game_BattlerBase[_0x2e1d3a(0x117)]=VisuMZ[_0x2e1d3a(0x159)][_0x2e1d3a(0x119)][_0x2e1d3a(0x15a)]['DefaultMax'],Game_BattlerBase['LIMITED_SKILL_USE_HARDCAP_MAX']=VisuMZ[_0x2e1d3a(0x159)][_0x2e1d3a(0x119)]['Mechanics'][_0x2e1d3a(0x10f)],Game_BattlerBase['LIMITED_SKILL_USE_HARDCAP_MIN']=VisuMZ['LimitedSkillUses']['Settings'][_0x2e1d3a(0x15a)]['Minimum'],Game_BattlerBase[_0x2e1d3a(0x130)]=VisuMZ[_0x2e1d3a(0x159)][_0x2e1d3a(0x119)][_0x2e1d3a(0x15a)][_0x2e1d3a(0x168)],VisuMZ[_0x2e1d3a(0x159)][_0x2e1d3a(0x102)]=Game_BattlerBase[_0x2e1d3a(0x150)][_0x2e1d3a(0x166)],Game_BattlerBase['prototype'][_0x2e1d3a(0x166)]=function(_0xa55233){const _0x2f2392=_0x2e1d3a;if(DataManager[_0x2f2392(0x122)](_0xa55233)&&!this[_0x2f2392(0x107)](_0xa55233)){const _0x290749=this[_0x2f2392(0x11d)](_0xa55233['id']),_0x1e3573=this['skillLimitedUseTimes'](_0xa55233['id']);if(_0x1e3573>=_0x290749)return![];}return VisuMZ[_0x2f2392(0x159)][_0x2f2392(0x102)]['call'](this,_0xa55233);},Game_BattlerBase[_0x2e1d3a(0x150)][_0x2e1d3a(0x107)]=function(_0x13e770){const _0x4998ad=_0x2e1d3a;if(!_0x13e770)return![];return _0x13e770['id']===this['attackSkillId']()||_0x13e770['id']===this[_0x4998ad(0xfe)]();},VisuMZ[_0x2e1d3a(0x159)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x2e1d3a(0x150)]['refresh'],Game_BattlerBase[_0x2e1d3a(0x150)][_0x2e1d3a(0x149)]=function(){const _0x418cc4=_0x2e1d3a;this[_0x418cc4(0x120)]={},VisuMZ[_0x418cc4(0x159)]['Game_BattlerBase_refresh'][_0x418cc4(0x16f)](this);},VisuMZ['LimitedSkillUses'][_0x2e1d3a(0x10b)]=Game_BattlerBase[_0x2e1d3a(0x150)][_0x2e1d3a(0x127)],Game_BattlerBase['prototype']['paySkillCost']=function(_0x199bab){const _0x32bb41=_0x2e1d3a;VisuMZ[_0x32bb41(0x159)][_0x32bb41(0x10b)]['call'](this,_0x199bab),DataManager[_0x32bb41(0x122)](_0x199bab)&&!this['isAttackOrGuardSkill'](_0x199bab)&&this[_0x32bb41(0x132)](_0x199bab['id'],0x1);},Game_BattlerBase[_0x2e1d3a(0x150)][_0x2e1d3a(0x11d)]=function(_0x3d0cca){const _0x51f820=_0x2e1d3a;this[_0x51f820(0x120)]=this['_cache_SkillLimitedUseMax']||{};if(this['_cache_SkillLimitedUseMax'][_0x3d0cca])return this[_0x51f820(0x120)][_0x3d0cca];return this[_0x51f820(0x120)][_0x3d0cca]=this['calcSkillLimitedUseMax'](_0x3d0cca),this['_cache_SkillLimitedUseMax'][_0x3d0cca];},Game_BattlerBase[_0x2e1d3a(0x150)][_0x2e1d3a(0x126)]=function(_0x3a3d4e){const _0x574e90=_0x2e1d3a,_0xa36046=$dataSkills[_0x3a3d4e];if(!_0xa36046)return 0x0;const _0x2fd4ba=VisuMZ[_0x574e90(0x159)][_0x574e90(0x10d)],_0x3a1dd2=_0xa36046[_0x574e90(0x154)];let _0x52b24e=Game_BattlerBase[_0x574e90(0x117)];_0x3a1dd2['match'](_0x2fd4ba['LimitedUse'])&&(_0x52b24e=Number(RegExp['$1']));const _0x25cb59=this[_0x574e90(0x153)]();for(const _0x4df28c of _0x25cb59){if(!_0x4df28c)continue;_0x4df28c[_0x574e90(0x154)][_0x574e90(0x155)](_0x2fd4ba['GlobalLimitedUses'])&&(_0x52b24e+=Number(RegExp['$1']));const _0x1158f3=_0x4df28c[_0x574e90(0x154)][_0x574e90(0x155)](_0x2fd4ba['STypeLimitedUses']);if(_0x1158f3)for(const _0x5798c7 of _0x1158f3){if(!_0x5798c7)continue;_0x5798c7[_0x574e90(0x155)](_0x2fd4ba[_0x574e90(0x118)]);let _0x5f1f94=String(RegExp['$1']);const _0x9b62ab=Number(RegExp['$2']);_0x5f1f94=(String(_0x5f1f94)||'')['trim']();const _0x449c47=/^\d+$/[_0x574e90(0x11f)](_0x5f1f94),_0x212312=_0x449c47?Number(_0x5f1f94):DataManager[_0x574e90(0xf6)](_0x5f1f94);if(_0x212312===_0xa36046[_0x574e90(0x10a)])_0x52b24e+=_0x9b62ab;}const _0x26931f=_0x4df28c[_0x574e90(0x154)][_0x574e90(0x155)](_0x2fd4ba[_0x574e90(0x106)]);if(_0x26931f)for(const _0x4e1c34 of _0x26931f){if(!_0x4e1c34)continue;_0x4e1c34['match'](_0x2fd4ba['SkillLimitedUses']);let _0x49b008=String(RegExp['$1']);const _0x30218b=Number(RegExp['$2']);_0x49b008=(String(_0x49b008)||'')[_0x574e90(0x121)]();const _0x19ecce=/^\d+$/[_0x574e90(0x11f)](_0x49b008),_0x29b1a7=_0x19ecce?Number(_0x49b008):DataManager[_0x574e90(0x167)](_0x49b008);if(_0x29b1a7===_0x3a3d4e)_0x52b24e+=_0x30218b;}}_0x52b24e=_0x52b24e||0x0;const _0x29fbf7=Game_BattlerBase[_0x574e90(0x143)],_0x148062=Game_BattlerBase[_0x574e90(0x14a)];return _0x52b24e[_0x574e90(0x11a)](_0x29fbf7,_0x148062);},Game_BattlerBase[_0x2e1d3a(0x150)]['skillLimitedUseTimes']=function(_0x14b845){const _0x369cb7=_0x2e1d3a,_0xa57e3b=this[_0x369cb7(0x11d)](_0x14b845);this[_0x369cb7(0x10e)]=this[_0x369cb7(0x10e)]||{};if(this['_skillLimitedUseTimes'][_0x14b845])return this[_0x369cb7(0x10e)][_0x14b845];return this[_0x369cb7(0x10e)][_0x14b845]=0x0,Math[_0x369cb7(0x163)](0x0,this[_0x369cb7(0x10e)][_0x14b845]);},Game_BattlerBase[_0x2e1d3a(0x150)][_0x2e1d3a(0x132)]=function(_0x4df98c,_0x383470){const _0x33c6ce=_0x2e1d3a;_0x383470=_0x383470||0x0,this[_0x33c6ce(0x10e)]=this['_skillLimitedUseTimes']||{},this['_skillLimitedUseTimes'][_0x4df98c]=this['_skillLimitedUseTimes'][_0x4df98c]||0x0,this[_0x33c6ce(0x10e)][_0x4df98c]+=_0x383470,this[_0x33c6ce(0x10e)][_0x4df98c]=Math[_0x33c6ce(0x163)](0x0,this[_0x33c6ce(0x10e)][_0x4df98c]);},Game_BattlerBase['prototype'][_0x2e1d3a(0x13e)]=function(_0x4d5e98,_0x3a5946){const _0x5f1249=_0x2e1d3a;_0x3a5946=_0x3a5946||0x0,this['_skillLimitedUseTimes']=this[_0x5f1249(0x10e)]||{},this['_skillLimitedUseTimes'][_0x4d5e98]=this[_0x5f1249(0x10e)][_0x4d5e98]||0x0,this[_0x5f1249(0x10e)][_0x4d5e98]=_0x3a5946,this[_0x5f1249(0x10e)][_0x4d5e98]=Math[_0x5f1249(0x163)](0x0,this[_0x5f1249(0x10e)][_0x4d5e98]);},VisuMZ[_0x2e1d3a(0x159)]['Game_BattlerBase_recoverAll']=Game_BattlerBase[_0x2e1d3a(0x150)][_0x2e1d3a(0x16d)],Game_BattlerBase['prototype'][_0x2e1d3a(0x16d)]=function(){const _0x5a278e=_0x2e1d3a;VisuMZ[_0x5a278e(0x159)]['Game_BattlerBase_recoverAll']['call'](this),this[_0x5a278e(0x13f)]();},Game_BattlerBase[_0x2e1d3a(0x150)][_0x2e1d3a(0x13f)]=function(){const _0x174eb4=_0x2e1d3a;this[_0x174eb4(0x10e)]=this[_0x174eb4(0x10e)]||{};for(const _0x2c983 in this[_0x174eb4(0x10e)]){if(!this[_0x174eb4(0x10e)][_0x2c983])continue;const _0x5cd143=Number(_0x2c983)||0x0,_0x524c21=$dataSkills[_0x5cd143];if(!_0x524c21)continue;DataManager[_0x174eb4(0x128)](_0x524c21)&&this['setSkillLimitedUseTimes'](_0x5cd143,0x0);}},Game_Battler[_0x2e1d3a(0x12d)]={'victory':VisuMZ['LimitedSkillUses'][_0x2e1d3a(0x119)][_0x2e1d3a(0x15a)][_0x2e1d3a(0x169)],'escape':VisuMZ[_0x2e1d3a(0x159)][_0x2e1d3a(0x119)][_0x2e1d3a(0x15a)]['BattleEscape'],'defeat':VisuMZ[_0x2e1d3a(0x159)][_0x2e1d3a(0x119)][_0x2e1d3a(0x15a)][_0x2e1d3a(0x151)]},Game_Battler[_0x2e1d3a(0x150)][_0x2e1d3a(0x101)]=function(_0x53bf79){const _0x46ea95=_0x2e1d3a;for(const _0x28e51a of this['skills']()){this[_0x46ea95(0xf8)](_0x28e51a,_0x53bf79);}},Game_Battler[_0x2e1d3a(0x150)][_0x2e1d3a(0xf8)]=function(_0x5eb75,_0x3bf2c7){const _0x3f2560=_0x2e1d3a;if(!_0x5eb75)return;if(!DataManager[_0x3f2560(0x122)](_0x5eb75))return;const _0x9e11ff=VisuMZ[_0x3f2560(0x159)][_0x3f2560(0x10d)],_0x4fb99f=_0x5eb75['note'];let _0x4b66ba=0x0;if(_0x3bf2c7===0x0)_0x4fb99f[_0x3f2560(0x155)](_0x9e11ff[_0x3f2560(0x10c)])?_0x4b66ba=Number(RegExp['$1']):_0x4b66ba=Game_Battler['LIMITED_SKILL_USE_RECOVERY']['victory'];else _0x3bf2c7===0x1?_0x4fb99f[_0x3f2560(0x155)](_0x9e11ff[_0x3f2560(0xf9)])?_0x4b66ba=Number(RegExp['$1']):_0x4b66ba=Game_Battler[_0x3f2560(0x12d)]['escape']:_0x4fb99f[_0x3f2560(0x155)](_0x9e11ff[_0x3f2560(0x148)])?_0x4b66ba=Number(RegExp['$1']):_0x4b66ba=Game_Battler[_0x3f2560(0x12d)][_0x3f2560(0x135)];this[_0x3f2560(0x132)](_0x5eb75['id'],-_0x4b66ba);},Game_Battler[_0x2e1d3a(0x150)][_0x2e1d3a(0x12f)]=function(_0x3e4c71,_0x1dfd4b,_0x5694c1,_0x3805fc){const _0x251f8f=_0x2e1d3a;for(const _0x36b3e7 of this[_0x251f8f(0x136)]()){if(!_0x36b3e7)continue;if(!DataManager[_0x251f8f(0x122)](_0x36b3e7))continue;if(this['isAttackOrGuardSkill'](_0x36b3e7))continue;const _0x5aab65=_0x3e4c71[_0x251f8f(0x154)];let _0x2a3473=0x0;_0x5aab65[_0x251f8f(0x155)](_0x1dfd4b)&&(_0x2a3473+=Number(RegExp['$1'])||0x0);const _0x5f3d24=_0x5aab65[_0x251f8f(0x155)](_0x5694c1);if(_0x5f3d24)for(const _0x59cb3c of _0x5f3d24){if(!_0x59cb3c)continue;_0x59cb3c['match'](_0x5694c1);let _0x4eda67=String(RegExp['$1']);const _0x5b5ee8=Number(RegExp['$2']);_0x4eda67=(String(_0x4eda67)||'')[_0x251f8f(0x121)]();const _0x4efadd=/^\d+$/[_0x251f8f(0x11f)](_0x4eda67),_0x1d1ef9=_0x4efadd?Number(_0x4eda67):DataManager[_0x251f8f(0xf6)](_0x4eda67);if(_0x1d1ef9===_0x36b3e7[_0x251f8f(0x10a)])_0x2a3473+=_0x5b5ee8;}const _0x21caf8=_0x5aab65[_0x251f8f(0x155)](_0x3805fc);if(_0x21caf8)for(const _0x25d331 of _0x21caf8){if(!_0x25d331)continue;_0x25d331[_0x251f8f(0x155)](_0x3805fc);let _0x5250cc=String(RegExp['$1']);const _0x5a6420=Number(RegExp['$2']);_0x5250cc=(String(_0x5250cc)||'')[_0x251f8f(0x121)]();const _0x582b5c=/^\d+$/['test'](_0x5250cc),_0x2ab006=_0x582b5c?Number(_0x5250cc):DataManager[_0x251f8f(0x167)](_0x5250cc);if(_0x2ab006===_0x36b3e7['id'])_0x2a3473+=_0x5a6420;}this[_0x251f8f(0x132)](_0x36b3e7['id'],-_0x2a3473);}},Game_Party[_0x2e1d3a(0x150)][_0x2e1d3a(0x139)]=function(_0x212db4){const _0x5243e8=_0x2e1d3a,_0x144054=this[_0x5243e8(0x161)];this[_0x5243e8(0x161)]=![];for(const _0xcb5d9b of this[_0x5243e8(0x115)]()){if(!_0xcb5d9b)continue;_0xcb5d9b['recoverLimitedSkillUsesBattle'](_0x212db4);}this['_inBattle']=_0x144054;},VisuMZ[_0x2e1d3a(0x159)]['Window_Base_makeAdditionalSkillCostText']=Window_Base[_0x2e1d3a(0x150)][_0x2e1d3a(0x11b)],Window_Base['prototype']['makeAdditionalSkillCostText']=function(_0x47ddf6,_0x324a59,_0x4ded00){const _0x881fc2=_0x2e1d3a;return _0x4ded00=VisuMZ[_0x881fc2(0x159)][_0x881fc2(0xf7)][_0x881fc2(0x16f)](this,_0x47ddf6,_0x324a59,_0x4ded00),_0x4ded00=this[_0x881fc2(0x13d)](_0x47ddf6,_0x324a59,_0x4ded00),_0x4ded00;},Window_Base['prototype'][_0x2e1d3a(0x13d)]=function(_0x2128a9,_0x4d69e6,_0x9e624b){const _0x2f7ea4=_0x2e1d3a;if(!_0x2128a9)return _0x9e624b;if(!_0x4d69e6)return _0x9e624b;if(!DataManager[_0x2f7ea4(0x122)](_0x4d69e6))return _0x9e624b;if(_0x2128a9[_0x2f7ea4(0x107)](_0x4d69e6))return _0x9e624b;const _0x2fc03d=VisuMZ[_0x2f7ea4(0x159)]['Settings'][_0x2f7ea4(0x12b)][_0x2f7ea4(0x15e)],_0x285075=_0x2128a9[_0x2f7ea4(0x11d)](_0x4d69e6['id']),_0x26b02f=_0x2128a9[_0x2f7ea4(0x15f)](_0x4d69e6['id']),_0x36ceb3=Math[_0x2f7ea4(0x163)](0x0,_0x285075-_0x26b02f),_0x1eb45e='\x5cI[%1]'[_0x2f7ea4(0x12e)](ImageManager[_0x2f7ea4(0x11e)]),_0x2c168a=_0x36ceb3>0x0?TextManager[_0x2f7ea4(0x100)]:TextManager['limitedUseEmptyFmt'];let _0x263ba3=_0x2c168a[_0x2f7ea4(0x12e)](_0x36ceb3,_0x285075,_0x26b02f,_0x1eb45e);if(_0x9e624b==='')_0x9e624b+=_0x263ba3;else _0x2fc03d?_0x9e624b=_0x263ba3+this[_0x2f7ea4(0x12c)]()+_0x9e624b:_0x9e624b=_0x9e624b+this['skillCostSeparator']()+_0x263ba3;return _0x9e624b;};