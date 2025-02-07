//=============================================================================
// VisuStella MZ - Life State Effects
// VisuMZ_3_LifeStateEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_LifeStateEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.LifeStateEffects = VisuMZ.LifeStateEffects || {};
VisuMZ.LifeStateEffects.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.02] [LifeStateEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Life_State_Effects_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Life State Effects plugin allow for trait objects and/or states to
 * create specific, though, commonly used effects found in many traditional
 * JRPG's, such as Auto Life, Doom, and Guts. These mechanical effects add a
 * whole new layer of strategy when it comes to status effects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Auto Life effect, which is a state effect that recovers a percentage of
 *   the user's HP and disappears upon triggering.
 * * Curse effect, which prevents HP, MP, and/or TP recovery.
 * * Doom effect, which is a state effect that will kill the affected battler
 *   once the state's timer wears off and expires.
 * * Fragile effect, which causes any time a user receives HP damage from a
 *   direct action, that user will instantly lose all HP.
 * * Guts, which prevents HP from dropping below 1, unless the battler's HP is
 *   at 1, itself.
 * * Undead, which causes normal HP healing to inflict damage instead, instant
 *   death effects to fully restore HP, and Drain effects to be inverted.
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
 * - VisuMZ_1_SkillsStatesCore
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
 * === State-Only Effects ===
 * 
 * ---
 *
 * <Auto Life: x%>
 *
 * - Used for: State Notetags
 * - When the affected battler dies with this state present, this state will
 *   automatically remove itself (and any other states with <Auto Life: x%>) to
 *   restore that much HP% for the battler.
 * - Replace 'x' with a number representing that percentage of HP to heal the
 *   battler upon dying.
 *
 * ---
 *
 * <Doom>
 *
 * - Used for: State Notetags
 * - When this state expires naturally (without direct removal), kill the
 *   affected battler.
 *
 * ---
 * 
 * === Trait-Object Effects ===
 * 
 * ---
 *
 * <Curse HP>
 * <Curse MP>
 * <Curse TP>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Prevents the affected battler from being able to recover HP, MP, and/or TP
 *   depending on which notetag is being used.
 *
 * ---
 *
 * <Fragile>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - If a battler affected by <Fragile> receives a direct attack and takes any
 *   HP damage (as opposed to event command damage or regeneration damage),
 *   then instantly kill the affected battler.
 *
 * ---
 *
 * <Guts>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - This will prevent the battler from taking any fatal damage and leaves them
 *   with only 1 HP. However, if the battler has 1 HP and receives damage, then
 *   the battler will actually die.
 *
 * ---
 *
 * <Undead>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - If the battler receives HP Healing, it receives damage instead.
 * - If the battler is a target of an instant death skill or item, then the
 *   battler will recover full HP.
 * - If the battler is the target of an HP Drain action, then the battler will
 *   drain HP from the attacker instead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Effect Settings
 * ============================================================================
 * 
 * Auto-Life Settings
 * Curse Settings
 * Doom Settings
 * Fragile Settings
 * Guts Settings
 * Undead Settings
 *
 * When certain effects trigger, you can have an animation play (if the
 * VisuStella MZ Core Engine is also installed) and/or a popup appear, too.
 * Each of the six effects provided by this plugin have animation and popup
 * effects that can be adjusted.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Requires VisuMZ_0_CoreEngine.
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
 * Version 1.02: March 12, 2021
 * * Bug Fixes!
 * ** When Doom is applied but the battler later gains state resistance to
 *    Doom, Doom will no longer instantly kill the battler. Fix made by Irina.
 * 
 * Version 1.01: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent an infinite loop with Doom. Fix made by Olivia.
 *
 * Version 1.00: October 7, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param LifeStateEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoLife:struct
 * @text Auto Life Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Auto Life effect.
 * @default {"Animation":"","AnimationID:num":"50","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"AUTOLIFE","TextColor:str":"0","FlashColor:eval":"[0, 255, 128, 160]","FlashDuration:num":"60"}
 *
 * @param Curse:struct
 * @text Curse Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Curse effect.
 * @default {"Animation":"","AnimationID:num":"54","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"CURSE","TextColor:str":"0","FlashColor:eval":"[0, 0, 128, 160]","FlashDuration:num":"60"}
 *
 * @param Doom:struct
 * @text Doom Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Doom effect.
 * @default {"Animation":"","AnimationID:num":"65","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"DOOM","TextColor:str":"0","FlashColor:eval":"[128, 0, 0, 160]","FlashDuration:num":"60"}
 *
 * @param Fragile:struct
 * @text Fragile Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Fragile effect.
 * @default {"Animation":"","AnimationID:num":"60","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"FRAGILE","TextColor:str":"0","FlashColor:eval":"[255, 0, 0, 160]","FlashDuration:num":"60"}
 *
 * @param Guts:struct
 * @text Guts Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Guts effect.
 * @default {"Animation":"","AnimationID:num":"51","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"GUTS","TextColor:str":"0","FlashColor:eval":"[255, 255, 255, 160]","FlashDuration:num":"60"}
 *
 * @param Undead:struct
 * @text Undead Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Undead effect.
 * @default {"Animation":"","AnimationID:num":"58","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"UNDEAD","TextColor:str":"0","FlashColor:eval":"[128, 128, 128, 160]","FlashDuration:num":"60"}
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
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Effect:
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Requires VisuMZ_0_CoreEngine.
 * @default 0
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default TEXT
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
//=============================================================================

const _0x3788=['doom','LifeStateEffects_CurseMp','noHealTp','startDamagePopup','format','parse','Mute','STR','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','onLifeStateEffect','autoLife','212951KUDJYW','NUM','noHealHp','293201IvjDPN','undead','fragile','mhp','addState','Fragile','STRUCT','isHpEffect','hpAffected','Undead','ARRAYFUNC','PopupText','executeDamage','name','includes','116754LJhopG','_processingVisuMzDoomEffect','hasLifeStateCurseTpEffect','setupTextPopup','isSceneBattle','map','ceil','LifeStateEffects_AutoLife','1pOeOSB','26dGPeRz','note','JSON','itemEffectAddAttackState','dead','gainHp','VisuMZ_1_BattleCore','battler','536301whNSzF','FUNC','hasLifeStateAutoLifeEffect','itemEffectAddNormalState','onLifeStateDoomEffect','version','subject','trim','Game_Battler_gainTp','LifeStateEffects_CurseTp','Mirror','FlashDuration','description','status','Guts','16534AJtBZO','skills','eraseState','isDrain','call','hpDamage','reduce','Game_Battler_gainHpCurse','removeState','executeHpDamage','states','Game_Action_executeHpDamage','clamp','Game_Battler_removeStatesAuto','Game_Battler_gainHp','VisuMZ_0_CoreEngine','removeStatesAuto','ARRAYNUM','EVAL','606921rftrRZ','toUpperCase','_result','LifeStateEffects','Game_BattlerBase_eraseState','traitObjects','gainMp','isStateAffected','Game_BattlerBase_setHp','_allowUndeadHpHeal','makeDeepCopy','Game_BattlerBase_addNewState','Game_Action_itemEffectAddNormalState','hasLifeStateGutsEffect','763306bDEhTc','AnimationID','some','hasLifeStateFragileEffect','hasLifeStateUndeadEffect','AutoLife','ARRAYEVAL','1nEGFzb','Settings','Game_Action_executeDamage','ConvertParams','hasLifeStateCurseMpEffect','setHp','parameters','exit','_motion','_removeStatesAutoInEffect','Curse','clearResult','gainTp','return\x200','Game_Battler_gainMpCurse','onLifeStateAutoLifeEffect','Game_Battler_addState','addNewState','prototype','concat','VisuMZ_1_SkillsStatesCore','LifeStateEffects_Undead','requestFauxAnimation','match','checkCacheKey','max','LifeStateEffects_Guts','Game_Action_itemEffectAddAttackState','deathStateId','_cache','isDead','LifeStateEffects_Fragile','RegExp'];const _0x50e9=function(_0x5cb08c,_0x58f10c){_0x5cb08c=_0x5cb08c-0xfc;let _0x378845=_0x3788[_0x5cb08c];return _0x378845;};const _0x599776=_0x50e9;(function(_0x29ce9e,_0x2179dd){const _0x3aab96=_0x50e9;while(!![]){try{const _0x3af668=-parseInt(_0x3aab96(0x170))*-parseInt(_0x3aab96(0x159))+-parseInt(_0x3aab96(0x13e))+-parseInt(_0x3aab96(0x161))+parseInt(_0x3aab96(0xfd))+-parseInt(_0x3aab96(0x112))*parseInt(_0x3aab96(0x141))+-parseInt(_0x3aab96(0x150))*parseInt(_0x3aab96(0x158))+parseInt(_0x3aab96(0x10b));if(_0x3af668===_0x2179dd)break;else _0x29ce9e['push'](_0x29ce9e['shift']());}catch(_0x489e72){_0x29ce9e['push'](_0x29ce9e['shift']());}}}(_0x3788,0x9c788));var label='LifeStateEffects',tier=tier||0x0,dependencies=[_0x599776(0x15f),_0x599776(0x126)],pluginData=$plugins['filter'](function(_0x20b4a8){const _0x4b53ec=_0x599776;return _0x20b4a8[_0x4b53ec(0x16e)]&&_0x20b4a8[_0x4b53ec(0x16d)][_0x4b53ec(0x14f)]('['+label+']');})[0x0];VisuMZ[label][_0x599776(0x113)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x599776(0x115)]=function(_0x472b36,_0x5e44c8){const _0xad9033=_0x599776;for(const _0x2b7116 in _0x5e44c8){if(_0x2b7116[_0xad9033(0x129)](/(.*):(.*)/i)){const _0x4a0e44=String(RegExp['$1']),_0x21c065=String(RegExp['$2'])[_0xad9033(0xfe)]()[_0xad9033(0x168)]();let _0x1d6a7f,_0x3f0a23,_0x47c782;switch(_0x21c065){case _0xad9033(0x13f):_0x1d6a7f=_0x5e44c8[_0x2b7116]!==''?Number(_0x5e44c8[_0x2b7116]):0x0;break;case _0xad9033(0x181):_0x3f0a23=_0x5e44c8[_0x2b7116]!==''?JSON[_0xad9033(0x138)](_0x5e44c8[_0x2b7116]):[],_0x1d6a7f=_0x3f0a23[_0xad9033(0x155)](_0x4fd0a8=>Number(_0x4fd0a8));break;case _0xad9033(0xfc):_0x1d6a7f=_0x5e44c8[_0x2b7116]!==''?eval(_0x5e44c8[_0x2b7116]):null;break;case _0xad9033(0x111):_0x3f0a23=_0x5e44c8[_0x2b7116]!==''?JSON[_0xad9033(0x138)](_0x5e44c8[_0x2b7116]):[],_0x1d6a7f=_0x3f0a23[_0xad9033(0x155)](_0x4242ba=>eval(_0x4242ba));break;case _0xad9033(0x15b):_0x1d6a7f=_0x5e44c8[_0x2b7116]!==''?JSON['parse'](_0x5e44c8[_0x2b7116]):'';break;case'ARRAYJSON':_0x3f0a23=_0x5e44c8[_0x2b7116]!==''?JSON[_0xad9033(0x138)](_0x5e44c8[_0x2b7116]):[],_0x1d6a7f=_0x3f0a23[_0xad9033(0x155)](_0x1f8148=>JSON[_0xad9033(0x138)](_0x1f8148));break;case _0xad9033(0x162):_0x1d6a7f=_0x5e44c8[_0x2b7116]!==''?new Function(JSON[_0xad9033(0x138)](_0x5e44c8[_0x2b7116])):new Function(_0xad9033(0x11f));break;case _0xad9033(0x14b):_0x3f0a23=_0x5e44c8[_0x2b7116]!==''?JSON[_0xad9033(0x138)](_0x5e44c8[_0x2b7116]):[],_0x1d6a7f=_0x3f0a23['map'](_0x1c0837=>new Function(JSON[_0xad9033(0x138)](_0x1c0837)));break;case _0xad9033(0x13a):_0x1d6a7f=_0x5e44c8[_0x2b7116]!==''?String(_0x5e44c8[_0x2b7116]):'';break;case'ARRAYSTR':_0x3f0a23=_0x5e44c8[_0x2b7116]!==''?JSON[_0xad9033(0x138)](_0x5e44c8[_0x2b7116]):[],_0x1d6a7f=_0x3f0a23['map'](_0x2a097b=>String(_0x2a097b));break;case _0xad9033(0x147):_0x47c782=_0x5e44c8[_0x2b7116]!==''?JSON[_0xad9033(0x138)](_0x5e44c8[_0x2b7116]):{},_0x1d6a7f=VisuMZ[_0xad9033(0x115)]({},_0x47c782);break;case'ARRAYSTRUCT':_0x3f0a23=_0x5e44c8[_0x2b7116]!==''?JSON['parse'](_0x5e44c8[_0x2b7116]):[],_0x1d6a7f=_0x3f0a23[_0xad9033(0x155)](_0x2c1b7a=>VisuMZ['ConvertParams']({},JSON[_0xad9033(0x138)](_0x2c1b7a)));break;default:continue;}_0x472b36[_0x4a0e44]=_0x1d6a7f;}}return _0x472b36;},(_0x2a67e0=>{const _0x560c39=_0x599776,_0x2e4215=_0x2a67e0[_0x560c39(0x14e)];for(const _0x4cdfef of dependencies){if(!Imported[_0x4cdfef]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x560c39(0x137)](_0x2e4215,_0x4cdfef)),SceneManager[_0x560c39(0x119)]();break;}}const _0x47cd83=_0x2a67e0[_0x560c39(0x16d)];if(_0x47cd83[_0x560c39(0x129)](/\[Version[ ](.*?)\]/i)){const _0x431478=Number(RegExp['$1']);_0x431478!==VisuMZ[label][_0x560c39(0x166)]&&(alert(_0x560c39(0x13b)[_0x560c39(0x137)](_0x2e4215,_0x431478)),SceneManager[_0x560c39(0x119)]());}if(_0x47cd83[_0x560c39(0x129)](/\[Tier[ ](\d+)\]/i)){const _0x1af582=Number(RegExp['$1']);_0x1af582<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x560c39(0x137)](_0x2e4215,_0x1af582,tier)),SceneManager['exit']()):tier=Math[_0x560c39(0x12b)](_0x1af582,tier);}VisuMZ[_0x560c39(0x115)](VisuMZ[label]['Settings'],_0x2a67e0[_0x560c39(0x118)]);})(pluginData),VisuMZ[_0x599776(0x100)][_0x599776(0x132)]={'guts':/<(?:GUTS)>/i,'undead':/<(?:UNDEAD|ZOMBIE|DAMAGE FROM HEALING)>/i,'fragile':/<(?:FRAGILE|ONE HIT KILL|DEATH ON HP DAMAGE)>/i,'noHealHp':/<(?:CANNOT HEAL HP|CANNOT RECOVER HP|CURSE HP)>/i,'noHealMp':/<(?:CANNOT HEAL MP|CANNOT RECOVER MP|CURSE MP)>/i,'noHealTp':/<(?:CANNOT HEAL TP|CANNOT RECOVER TP|CURSE TP)>/i,'autoLife':/<(?:AUTOLIFE|AUTO LIFE):[ ](\d+)([%％])>/i,'doom':/<(?:DOOM|DEATH SENTENCE)>/i},Game_Battler[_0x599776(0x124)]['onLifeStateEffect']=function(_0x52201e){const _0x5dd21e=_0x599776;if(!SceneManager[_0x5dd21e(0x154)]())return![];const _0x34156e=VisuMZ['LifeStateEffects']['Settings'][_0x52201e];if(!_0x34156e)return;if(Imported[_0x5dd21e(0x17f)]&&_0x34156e[_0x5dd21e(0x10c)]>0x0){const _0x5a5c88=[this],_0x17a2d0=_0x34156e[_0x5dd21e(0x10c)],_0x307d42=_0x34156e[_0x5dd21e(0x16b)],_0x3d64ac=_0x34156e[_0x5dd21e(0x139)];$gameTemp[_0x5dd21e(0x128)](_0x5a5c88,_0x17a2d0,_0x307d42,_0x3d64ac);}if(_0x34156e[_0x5dd21e(0x14c)]!==''){const _0x561484={'textColor':_0x34156e['TextColor'],'flashColor':_0x34156e['FlashColor'],'flashDuration':_0x34156e[_0x5dd21e(0x16c)]};this[_0x5dd21e(0x153)](_0x34156e['PopupText'],_0x561484);}},Game_BattlerBase[_0x599776(0x124)][_0x599776(0x163)]=function(){const _0x38a5a5=_0x599776;if(!SceneManager[_0x38a5a5(0x154)]())return![];const _0x5f17af=_0x38a5a5(0x157);if(this[_0x38a5a5(0x12a)](_0x5f17af))return this['_cache'][_0x5f17af];const _0x4624b7=this['traitObjects']()[_0x38a5a5(0x125)](this[_0x38a5a5(0x171)]());return this[_0x38a5a5(0x12f)][_0x5f17af]=_0x4624b7[_0x38a5a5(0x10d)](_0x23b9ec=>_0x23b9ec&&_0x23b9ec[_0x38a5a5(0x15a)][_0x38a5a5(0x129)](VisuMZ['LifeStateEffects'][_0x38a5a5(0x132)][_0x38a5a5(0x13d)])),this[_0x38a5a5(0x12f)][_0x5f17af];},VisuMZ[_0x599776(0x100)][_0x599776(0x108)]=Game_BattlerBase[_0x599776(0x124)][_0x599776(0x123)],Game_BattlerBase['prototype'][_0x599776(0x123)]=function(_0x526d15){const _0x78e36f=_0x599776;_0x526d15===this[_0x78e36f(0x12e)]()&&this[_0x78e36f(0x163)]()?this[_0x78e36f(0x121)]():VisuMZ[_0x78e36f(0x100)][_0x78e36f(0x108)]['call'](this,_0x526d15);},Game_Battler['prototype'][_0x599776(0x121)]=function(){const _0x1de13b=_0x599776,_0x216459=JsonEx[_0x1de13b(0x107)](this[_0x1de13b(0xff)]),_0xf4872c=VisuMZ['LifeStateEffects'][_0x1de13b(0x132)][_0x1de13b(0x13d)];let _0x4c4cb8=this[_0x1de13b(0x17a)]()['map'](_0x1d2fcb=>_0x1d2fcb&&_0x1d2fcb[_0x1de13b(0x15a)]['match'](_0xf4872c)?Number(RegExp['$1'])*0.01:0x0);const _0x309cee=_0x4c4cb8[_0x1de13b(0x176)]((_0x312fa6,_0x401394)=>_0x312fa6+_0x401394,0x0);let _0x38b70e=Math[_0x1de13b(0x156)](_0x309cee*this[_0x1de13b(0x144)]);_0x38b70e=_0x38b70e[_0x1de13b(0x17c)](0x0,this[_0x1de13b(0x144)]);if(_0x38b70e<=0x0)return;this[_0x1de13b(0x117)](_0x38b70e),this[_0x1de13b(0x11d)](),this[_0x1de13b(0xff)][_0x1de13b(0x175)]=-_0x38b70e,this[_0x1de13b(0xff)][_0x1de13b(0x149)]=!![],this[_0x1de13b(0x136)]();for(const _0x5e2811 of this[_0x1de13b(0x17a)]()){if(!_0x5e2811)continue;_0x5e2811[_0x1de13b(0x15a)][_0x1de13b(0x129)](_0xf4872c)&&this[_0x1de13b(0x178)](_0x5e2811['id']);}this['onLifeStateEffect'](_0x1de13b(0x110)),this[_0x1de13b(0xff)]=_0x216459;},VisuMZ[_0x599776(0x100)]['Game_Battler_removeStatesAuto']=Game_Battler['prototype'][_0x599776(0x180)],Game_Battler[_0x599776(0x124)]['removeStatesAuto']=function(_0x347353){const _0x155069=_0x599776;this[_0x155069(0x11b)]=!![],VisuMZ[_0x155069(0x100)][_0x155069(0x17d)][_0x155069(0x174)](this,_0x347353),this[_0x155069(0x11b)]=undefined;},VisuMZ[_0x599776(0x100)][_0x599776(0x101)]=Game_BattlerBase[_0x599776(0x124)][_0x599776(0x172)],Game_BattlerBase[_0x599776(0x124)][_0x599776(0x172)]=function(_0x42039d){const _0x198368=_0x599776,_0x4c6320=this[_0x198368(0x104)](_0x42039d);VisuMZ[_0x198368(0x100)]['Game_BattlerBase_eraseState']['call'](this,_0x42039d);const _0x5f3745=$dataStates[_0x42039d];this[_0x198368(0x11b)]&&_0x5f3745&&_0x5f3745[_0x198368(0x15a)][_0x198368(0x129)](VisuMZ[_0x198368(0x100)][_0x198368(0x132)][_0x198368(0x133)])&&_0x4c6320&&this['onLifeStateDoomEffect']();},Game_Battler['prototype'][_0x599776(0x165)]=function(){const _0x4e2847=_0x599776;if(this[_0x4e2847(0x151)])return;this[_0x4e2847(0x151)]=!![],this[_0x4e2847(0x117)](0x0),this['refresh'](),this[_0x4e2847(0x151)]=undefined;if(!this[_0x4e2847(0x130)]())return;this[_0x4e2847(0x13c)]('Doom'),this['performCollapse'](),this['requestMotion'](_0x4e2847(0x15d));const _0x38183f=this[_0x4e2847(0x160)]();_0x38183f&&(_0x38183f[_0x4e2847(0x11a)]='dead');},Game_BattlerBase[_0x599776(0x124)]['hasLifeStateFragileEffect']=function(){const _0x1cba2f=_0x599776;if(!SceneManager[_0x1cba2f(0x154)]())return![];const _0x3938ac=_0x1cba2f(0x131);if(this[_0x1cba2f(0x12a)](_0x3938ac))return this['_cache'][_0x3938ac];const _0x261185=this[_0x1cba2f(0x102)]()['concat'](this[_0x1cba2f(0x171)]());return this[_0x1cba2f(0x12f)][_0x3938ac]=_0x261185['some'](_0x4792e5=>_0x4792e5&&_0x4792e5[_0x1cba2f(0x15a)][_0x1cba2f(0x129)](VisuMZ[_0x1cba2f(0x100)][_0x1cba2f(0x132)][_0x1cba2f(0x143)])),this[_0x1cba2f(0x12f)][_0x3938ac];},VisuMZ[_0x599776(0x100)][_0x599776(0x17b)]=Game_Action[_0x599776(0x124)][_0x599776(0x179)],Game_Action[_0x599776(0x124)][_0x599776(0x179)]=function(_0x5a6169,_0x199a01){const _0x330451=_0x599776;VisuMZ[_0x330451(0x100)]['Game_Action_executeHpDamage']['call'](this,_0x5a6169,_0x199a01),_0x199a01>0x0&&_0x5a6169[_0x330451(0x10e)]()&&(_0x5a6169[_0x330451(0x117)](0x0),_0x5a6169[_0x330451(0x13c)](_0x330451(0x146)));},Game_BattlerBase[_0x599776(0x124)][_0x599776(0x10a)]=function(){const _0x4f8c1f=_0x599776;if(!SceneManager['isSceneBattle']())return![];if(this['hp']<=0x1)return![];const _0x1d2af5=_0x4f8c1f(0x12c);if(this[_0x4f8c1f(0x12a)](_0x1d2af5))return this[_0x4f8c1f(0x12f)][_0x1d2af5];const _0x1975e9=this[_0x4f8c1f(0x102)]()[_0x4f8c1f(0x125)](this[_0x4f8c1f(0x171)]());return this[_0x4f8c1f(0x12f)][_0x1d2af5]=_0x1975e9[_0x4f8c1f(0x10d)](_0x25ff92=>_0x25ff92&&_0x25ff92[_0x4f8c1f(0x15a)][_0x4f8c1f(0x129)](VisuMZ[_0x4f8c1f(0x100)]['RegExp']['guts'])),this[_0x4f8c1f(0x12f)][_0x1d2af5];},VisuMZ[_0x599776(0x100)][_0x599776(0x105)]=Game_BattlerBase['prototype']['setHp'],Game_BattlerBase[_0x599776(0x124)][_0x599776(0x117)]=function(_0x1d388c){const _0x148696=_0x599776;this[_0x148696(0x10a)]()&&_0x1d388c<=0x0&&(this[_0x148696(0x13c)](_0x148696(0x16f)),_0x1d388c=0x1),VisuMZ['LifeStateEffects'][_0x148696(0x105)][_0x148696(0x174)](this,_0x1d388c);},Game_BattlerBase[_0x599776(0x124)][_0x599776(0x10f)]=function(){const _0x168e3b=_0x599776;if(this[_0x168e3b(0x106)])return![];const _0x52679d=_0x168e3b(0x127);if(this[_0x168e3b(0x12a)](_0x52679d))return this[_0x168e3b(0x12f)][_0x52679d];const _0xabb182=this[_0x168e3b(0x102)]()['concat'](this[_0x168e3b(0x171)]());return this[_0x168e3b(0x12f)][_0x52679d]=_0xabb182[_0x168e3b(0x10d)](_0x47a840=>_0x47a840&&_0x47a840[_0x168e3b(0x15a)]['match'](VisuMZ[_0x168e3b(0x100)][_0x168e3b(0x132)][_0x168e3b(0x142)])),this['_cache'][_0x52679d];},VisuMZ[_0x599776(0x100)][_0x599776(0x17e)]=Game_Battler['prototype'][_0x599776(0x15e)],Game_Battler['prototype'][_0x599776(0x15e)]=function(_0x567e6a){const _0x53872d=_0x599776;this[_0x53872d(0x10f)]()&&_0x567e6a>0x0&&(_0x567e6a*=-0x1,this[_0x53872d(0x13c)](_0x53872d(0x14a))),VisuMZ['LifeStateEffects']['Game_Battler_gainHp'][_0x53872d(0x174)](this,_0x567e6a);},VisuMZ['LifeStateEffects']['Game_Action_executeDamage']=Game_Action[_0x599776(0x124)]['executeDamage'],Game_Action['prototype'][_0x599776(0x14d)]=function(_0x4ea059,_0x4a9d8a){const _0x45d078=_0x599776;this[_0x45d078(0x173)]()&&this[_0x45d078(0x148)]()&&_0x4a9d8a>0x0&&(this[_0x45d078(0x167)]()[_0x45d078(0x10f)]()&&(this[_0x45d078(0x167)]()[_0x45d078(0x106)]=!![]),_0x4ea059[_0x45d078(0x10f)]()&&(_0x4a9d8a*=-0x1,_0x4ea059[_0x45d078(0x106)]=!![],_0x4ea059[_0x45d078(0x13c)](_0x45d078(0x14a)))),VisuMZ[_0x45d078(0x100)][_0x45d078(0x114)][_0x45d078(0x174)](this,_0x4ea059,_0x4a9d8a),_0x4ea059['_allowUndeadHpHeal']=undefined,this[_0x45d078(0x167)]()[_0x45d078(0x106)]=undefined;},VisuMZ[_0x599776(0x100)][_0x599776(0x12d)]=Game_Action[_0x599776(0x124)][_0x599776(0x15c)],Game_Action[_0x599776(0x124)][_0x599776(0x15c)]=function(_0x39ed10,_0x48a745){const _0x44b51b=_0x599776;_0x39ed10[_0x44b51b(0x10f)]()&&(_0x39ed10[_0x44b51b(0x106)]=!![]),VisuMZ[_0x44b51b(0x100)]['Game_Action_itemEffectAddAttackState'][_0x44b51b(0x174)](this,_0x39ed10,_0x48a745),_0x39ed10[_0x44b51b(0x106)]=undefined;},VisuMZ['LifeStateEffects'][_0x599776(0x122)]=Game_Battler[_0x599776(0x124)][_0x599776(0x145)],Game_Battler[_0x599776(0x124)][_0x599776(0x145)]=function(_0x11edc4){const _0x2d1284=_0x599776;_0x11edc4===this[_0x2d1284(0x12e)]()&&this[_0x2d1284(0x106)]?(this['gainHp'](this[_0x2d1284(0x144)]),this[_0x2d1284(0x13c)](_0x2d1284(0x14a))):VisuMZ['LifeStateEffects'][_0x2d1284(0x122)][_0x2d1284(0x174)](this,_0x11edc4);},VisuMZ['LifeStateEffects'][_0x599776(0x109)]=Game_Action['prototype'][_0x599776(0x164)],Game_Action[_0x599776(0x124)][_0x599776(0x164)]=function(_0x39af5d,_0x1842f4){const _0x5eaea5=_0x599776;_0x1842f4['dataId']===_0x39af5d['deathStateId']()&&_0x39af5d[_0x5eaea5(0x10f)]()?(_0x39af5d[_0x5eaea5(0x106)]=!![],_0x39af5d[_0x5eaea5(0x15e)](_0x39af5d['mhp']),_0x39af5d['_allowUndeadHpHeal']=undefined,_0x39af5d[_0x5eaea5(0x13c)](_0x5eaea5(0x14a))):VisuMZ['LifeStateEffects']['Game_Action_itemEffectAddNormalState'][_0x5eaea5(0x174)](this,_0x39af5d,_0x1842f4);},Game_BattlerBase['prototype']['hasLifeStateCurseHpEffect']=function(){const _0x281143=_0x599776,_0x2c72fd='LifeStateEffects_CurseHp';if(this[_0x281143(0x12a)](_0x2c72fd))return this[_0x281143(0x12f)][_0x2c72fd];const _0x54cd8a=this[_0x281143(0x102)]()['concat'](this['skills']());return this[_0x281143(0x12f)][_0x2c72fd]=_0x54cd8a[_0x281143(0x10d)](_0x54a848=>_0x54a848&&_0x54a848[_0x281143(0x15a)][_0x281143(0x129)](VisuMZ[_0x281143(0x100)][_0x281143(0x132)][_0x281143(0x140)])),this[_0x281143(0x12f)][_0x2c72fd];},Game_BattlerBase[_0x599776(0x124)][_0x599776(0x116)]=function(){const _0xe134fc=_0x599776,_0x2b566e=_0xe134fc(0x134);if(this[_0xe134fc(0x12a)](_0x2b566e))return this['_cache'][_0x2b566e];const _0x566635=this[_0xe134fc(0x102)]()[_0xe134fc(0x125)](this['skills']());return this[_0xe134fc(0x12f)][_0x2b566e]=_0x566635[_0xe134fc(0x10d)](_0x3220c9=>_0x3220c9&&_0x3220c9['note'][_0xe134fc(0x129)](VisuMZ[_0xe134fc(0x100)][_0xe134fc(0x132)]['noHealMp'])),this[_0xe134fc(0x12f)][_0x2b566e];},Game_BattlerBase[_0x599776(0x124)][_0x599776(0x152)]=function(){const _0x5c6435=_0x599776,_0x128247=_0x5c6435(0x16a);if(this['checkCacheKey'](_0x128247))return this[_0x5c6435(0x12f)][_0x128247];const _0x59ac16=this['traitObjects']()[_0x5c6435(0x125)](this['skills']());return this[_0x5c6435(0x12f)][_0x128247]=_0x59ac16['some'](_0x440c16=>_0x440c16&&_0x440c16[_0x5c6435(0x15a)]['match'](VisuMZ[_0x5c6435(0x100)]['RegExp'][_0x5c6435(0x135)])),this[_0x5c6435(0x12f)][_0x128247];},VisuMZ[_0x599776(0x100)][_0x599776(0x177)]=Game_Battler[_0x599776(0x124)][_0x599776(0x15e)],Game_Battler[_0x599776(0x124)][_0x599776(0x15e)]=function(_0x327dda){const _0x65f7b1=_0x599776;_0x327dda>0x0&&this['hasLifeStateCurseHpEffect']()&&(_0x327dda=0x0,this[_0x65f7b1(0x13c)](_0x65f7b1(0x11c))),VisuMZ['LifeStateEffects']['Game_Battler_gainHpCurse'][_0x65f7b1(0x174)](this,_0x327dda);},VisuMZ['LifeStateEffects'][_0x599776(0x120)]=Game_Battler['prototype'][_0x599776(0x103)],Game_Battler[_0x599776(0x124)][_0x599776(0x103)]=function(_0x587eda){const _0x2385a3=_0x599776;_0x587eda>0x0&&this[_0x2385a3(0x116)]()&&(_0x587eda=0x0,this[_0x2385a3(0x13c)](_0x2385a3(0x11c))),VisuMZ['LifeStateEffects'][_0x2385a3(0x120)][_0x2385a3(0x174)](this,_0x587eda);},VisuMZ[_0x599776(0x100)][_0x599776(0x169)]=Game_Battler[_0x599776(0x124)][_0x599776(0x11e)],Game_Battler['prototype'][_0x599776(0x11e)]=function(_0x33a61b){const _0x3204bf=_0x599776;_0x33a61b>0x0&&this[_0x3204bf(0x152)]()&&(_0x33a61b=0x0,this[_0x3204bf(0x13c)](_0x3204bf(0x11c))),VisuMZ[_0x3204bf(0x100)][_0x3204bf(0x169)][_0x3204bf(0x174)](this,_0x33a61b);};