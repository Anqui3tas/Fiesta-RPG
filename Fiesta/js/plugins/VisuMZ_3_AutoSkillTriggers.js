//=============================================================================
// VisuStella MZ - Auto Skill Triggers
// VisuMZ_3_AutoSkillTriggers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_AutoSkillTriggers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AutoSkillTriggers = VisuMZ.AutoSkillTriggers || {};
VisuMZ.AutoSkillTriggers.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.06] [AutoSkillTriggers]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Auto_Skill_Triggers_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Sometimes you want some skills that only occur after a specific condition
 * triggers (ie. death, receiving specific elemental damage, or allies
 * performing skills of a specific type). These skill triggers are now made
 * possible through this plugin.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Skill triggers that launch at the start of battle or winning a battle.
 * * Skills that let actors/enemies do one last hurrah before dying.
 * * Skills that function as a reaction to the user performing specific actions
 *   ranging from basic attacks, guarding, items, physical attacks, magical
 *   attacks, certain hit attacks, skills from specific skill types, or actions
 *   that inflict any specific kind of elemental damage.
 * * A total of 60 different auto triggers for a variety of situations.
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
 * === Skill Trigger-Related Notetags ===
 *
 * <No Auto Skill Trigger>
 *
 * - Used for: Skill, Item State Notetags
 * - This prevents Auto Skill Triggers from occurring upon using this
 *   skill or item.
 *
 * ---
 *
 * <Auto Trigger: condition>
 *
 * <Auto Trigger x%: condition>
 *
 * - Used for: Skill Notetags
 * - Turns this skill into an Auto Trigger Skill, where it will automatically
 *   be used if the 'condition' has been met.
 * - If using the x% variant, the Auto Trigger has a x% chance to occur.
 *   - Replace 'x' with a number value representing the chance to succeed.
 * - Skill must be usable normally outside of the occasion in order to trigger.
 * - This marked skill cannot trigger any other Auto Skill Triggers in order to
 *   prevent an infinite loop.
 * - Skills can have multiple Auto Triggers and will trigger upon meeting the
 *   conditions of any of them.
 * - Replace 'condition' with any of the below keywords:
 * 
 *   *Note1*: Being the target of an action means the potential target must be
 *     a part of the original scope, regardless of how the targets are changed
 *     up later by Action Sequences.
 * 
 * Keywords:
 * 
 *   ---
 * 
 *   Battle Start
 *   - Triggers skill when the battle starts.
 * 
 *   Battle Win
 *   - Triggers skill when the battle is won.
 * 
 *   Death
 *   - Triggers skill moments before the user's death.
 *   - If the user recovers enough HP from the skill trigger, then the
 *     user won't die. However, any other Death triggered effects will
 *     still continue to prompt.
 * 
 *   ---
 * 
 *   Attack User
 *   - Triggers skill when the user uses a basic attack.
 * 
 *   Guard User
 *   - Triggers skill when the user guards.
 * 
 *   Item User
 *   - Triggers skill when the user uses any item.
 * 
 *   Physical User
 *   - Triggers skill when the user performs any physical action.
 * 
 *   Magical User
 *   - Triggers skill when the user performs any magical action.
 * 
 *   Certain Hit User
 *   - Triggers skill when the user performs a certain hit action.
 * 
 *   Skill Type name User
 *   - Triggers skill when the user performs a skill of the named
 *     Skill Type.
 * 
 *   Element name User
 *   - Triggers skill when the user performs an action with the named
 *     element type.
 * 
 *   ---
 * 
 *   Attack Target
 *   - Triggers skill when user is the target of a basic attack.
 *   - See Note1 Above.
 * 
 *   Guard Target
 *   - Triggers skill when user is the target of a guard action.
 *   - See Note1 Above.
 * 
 *   Item Target
 *   - Triggers skill when user is the target of an item action.
 *   - See Note1 Above.
 * 
 *   Physical Target
 *   - Triggers skill when user is the target of a physical action.
 *   - See Note1 Above.
 * 
 *   Magical Target
 *   - Triggers skill when user is the target of a magical action.
 *   - See Note1 Above.
 * 
 *   Certain Hit Target
 *   - Triggers skill when user is the target of a certain hit action.
 *   - See Note1 Above.
 * 
 *   Skill Type name Target
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type.
 *   - See Note1 Above.
 * 
 *   Element name Target
 *   - Triggers skill when user is the target of of an action with the named
 *     element type.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Ally
 *   - Triggers skill when user is the target of a basic attack
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Ally
 *   - Triggers skill when user is the target of a guard action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Ally
 *   - Triggers skill when user is the target of an item action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Ally
 *   - Triggers skill when user is the target of a physical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Ally
 *   - Triggers skill when user is the target of a magical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Ally
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Ally
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Ally
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Enemy
 *   - Triggers skill when user is the target of a basic attack
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Enemy
 *   - Triggers skill when user is the target of a guard action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Enemy
 *   - Triggers skill when user is the target of an item action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Enemy
 *   - Triggers skill when user is the target of a physical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Enemy
 *   - Triggers skill when user is the target of a magical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Enemy
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Enemy
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Enemy
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Friends
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Guard Friends
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Item Friends
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Physical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Magical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Certain Hit Friends
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Skill Type name Friends
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team.
 * 
 *   Element name Friends
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team.
 * 
 *   ---
 * 
 *   Attack Friends Only
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Guard Friends Only
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Item Friends Only
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Physical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Magical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Certain Hit Friends Only
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Skill Type name Friends Only
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   Element name Friends Only
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   ---
 * 
 *   Attack Opponents
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Guard Opponents
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Item Opponents
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Physical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Magical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Certain Hit Opponents
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Skill Type name Opponents
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   Element name Opponents
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   ---
 * 
 * Examples:
 * 
 *   <Auto Trigger: Battle Start>
 *   <Auto Trigger: Death>
 *   <Auto Trigger: Attack User>
 *   <Auto Trigger: Guard User>
 *   <Auto Trigger: Physical Target>
 *   <Auto Trigger: Magical Target>
 *   <Auto Trigger: Certain Hit Ally>
 *   <Auto Trigger: Item Enemy>
 *   <Auto Trigger: Skill Type Magic Ally>
 *   <Auto Trigger: Skill Type Special Enemy>
 *   <Auto Trigger: Element Fire Friends>
 *   <Auto Trigger: Element Ice Opponents>
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
 * Version 1.06: February 12, 2021
 * * Optimization Update!
 * ** Skills that cannot be used will no longer be checked for auto triggers.
 *    Update made by Olivia.
 * 
 * Version 1.05: January 22, 2021
 * * Bug Fixes!
 * ** Triggers involving the user should now work properly. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Arisu:
 * *** <Auto Trigger x%: condition>
 * **** If using the x% variant, the Auto Trigger has a x% chance to occur.
 * **** Replace 'x' with a number value representing the chance to succeed.
 * 
 * Version 1.04: December 25, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for Battle System - STB.
 * 
 * Version 1.03: November 22, 2020
 * * Bug Fixes!
 * ** Auto Skill Triggers no long clear battler speed in TPB. Fixed by Yanfly.
 * 
 * Version 1.02: November 1, 2020
 * * Bug Fixes!
 * ** Stunned enemies will have their auto triggers bypassed. Fix made
 *    by Olivia.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Skills and Items used outside of battle should no longer crash the game.
 *    Fix made by Yanfly.
 * ** Specific trigger types should no longer crash the game.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release Date: October 28, 2020
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
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

const _0x4aa8=['on%1Item','Game_Action_applyGlobal','FRIENDS\x20ONLY','AutoSkillTriggers','indexOf','ARRAYSTR','ARRAYNUM','format','VisuMZ_1_ElementStatusCore','(?:ATTACK\x20%1|STRIKE\x20%1)','deathStateId','setAutoSkillTrigger','clearDeathAutoSkillTrigger','parameters','clone','subject','ARRAYJSON','trim','isPhysical','endAction','Scene_Boot_onDatabaseLoaded','applyGlobal','isItem','elementId','Game_BattlerBase_addNewState','ARRAYSTRUCT','push','_subject','1dFVbTi','Game_BattlerBase_revive','Enemy','727pGbPqH','ConvertParams','process_VisuMZ_AutoSkillTriggers_Notetags','returnSavedAutoSkillTriggerActions','item','1FgYfbT','Game_Action_isValid','BattleManager_endAction','parse','processOnBattleWinAutoSkillTriggers','on%1Certain','on%1Attack','(?:CERTAIN\x20%1|CERTAIN\x20HIT\x20%1)','prototype','User','isAlive','onBattleStart','Game_BattlerBase_isImmortal','onBattleEnd','1817SDTOua','length','591508DAyeJc','isValid','on%1Magical','getElementNameFromID','getAutoSkillTriggerSTypes','isActor','_actions','onDeath','revive','BattleManager_checkBattleEnd','_deathAutoSkillTriggerActive','_action','STRUCT','attackElements','(?:PHYSICAL\x20%1|PHYSICAL\x20ATTACK\x20%1)','onBattleWin','ONDEATH','(?:BATTLE\x20START|START\x20BATTLE|BATTLECRY|BATTLE\x20CRY|FANFARE|SNEAK\x20ATTACK)','(?:GUARD\x20%1|GUARD\x20%1)','<AUTO\x20TRIGGER:[\x20]%1>','version','match','return\x200','processDeathAutoSkillTriggerEffects','aliveMembers','Ally','186702TKUOsj','isAllDead','Friends','isCertainHit','Opponents','map','isGuard','Settings','USER','340OzsXSf','ARRAYEVAL','name','on%1Element%2','isAutoSkillTrigger','OPPONENTS','_actionBattlers','FRIENDS','Game_Battler_onBattleStart','note','description','257AuFTiV','FriendsOnly','754JKKgfM','damage','includes','<AUTO\x20TRIGGER\x20(.*)([%％]):[\x20]%1>','Game_Action_clear','TARGET','occasion','_deathAutoSkillTriggerPerformed','_forcedBattlers','FUNC','RegExp','EVAL','skillTypes','exit','on%2SType%1','_onBattleWinAutoSkillTriggerOn','1399nfkEOq','_CHANCE','2293850EXEpto','on%1SType%2','_savedAutoSkillTriggerActions','elements','applyAutoSkillTriggers','canUse','replace','_autoSkillTrigger','processAutoSkillTrigger','(?:ITEM\x20%1|ITEM\x20%1)','(?:MAGICAL\x20%1|MAGICAL\x20ATTACK\x20%1)','checkBattleEnd','skills','stripNameTextCodes','onDatabaseLoaded','isSceneBattle','getSkillTypeNameFromID','forceAutoSkillTrigger','isMagical','getSkillTypes','checkDeathAutoSkillTriggerRemoval','ALLY','VisuMZ_1_BattleCore','toUpperCase','on%1Guard','clear','Target','clearTpbChargeTime','Game_Battler_onBattleEnd','processAutoSkillTriggers','call','addNewState','opponentsUnit','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Game_Unit_onBattleStart','ENEMY','(?:ELEMENT\x20%1\x20%2|ELE\x20%1\x20%2)','performAutoSkillTriggers','on%2Element%1','filter','canMove','CreateNotetags','_autoSkillTriggerBypassTpbClear','onAllActionsEnd','638138pHuvkc','getAutoSkillTriggerElements','forceAction','CreateNotetag','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_targets'];const _0x50cb=function(_0xc5446c,_0x8a59d3){_0xc5446c=_0xc5446c-0xa0;let _0x4aa8b6=_0x4aa8[_0xc5446c];return _0x4aa8b6;};const _0x20d377=_0x50cb;(function(_0xa42d2b,_0x24324e){const _0x408a38=_0x50cb;while(!![]){try{const _0x545677=parseInt(_0x408a38(0xcb))*parseInt(_0x408a38(0xbb))+-parseInt(_0x408a38(0xb6))*-parseInt(_0x408a38(0xfb))+parseInt(_0x408a38(0xb3))*parseInt(_0x408a38(0x139))+parseInt(_0x408a38(0xf9))*parseInt(_0x408a38(0x10b))+parseInt(_0x408a38(0xe5))+-parseInt(_0x408a38(0xee))*-parseInt(_0x408a38(0xc9))+-parseInt(_0x408a38(0x10d));if(_0x545677===_0x24324e)break;else _0xa42d2b['push'](_0xa42d2b['shift']());}catch(_0x1ff334){_0xa42d2b['push'](_0xa42d2b['shift']());}}}(_0x4aa8,0x9e32b));var label=_0x20d377(0x142),tier=tier||0x0,dependencies=[_0x20d377(0x123)],pluginData=$plugins[_0x20d377(0x134)](function(_0x239f9e){const _0x8adc82=_0x20d377;return _0x239f9e['status']&&_0x239f9e[_0x8adc82(0xf8)][_0x8adc82(0xfd)]('['+label+']');})[0x0];VisuMZ[label][_0x20d377(0xec)]=VisuMZ[label][_0x20d377(0xec)]||{},VisuMZ[_0x20d377(0xb7)]=function(_0x164bb7,_0x50dc6f){const _0x10d92b=_0x20d377;for(const _0x11c62c in _0x50dc6f){if(_0x11c62c['match'](/(.*):(.*)/i)){const _0x2e01bd=String(RegExp['$1']),_0x57a8ab=String(RegExp['$2'])[_0x10d92b(0x124)]()[_0x10d92b(0xa8)]();let _0x4192c7,_0xf9d213,_0x163534;switch(_0x57a8ab){case'NUM':_0x4192c7=_0x50dc6f[_0x11c62c]!==''?Number(_0x50dc6f[_0x11c62c]):0x0;break;case _0x10d92b(0x145):_0xf9d213=_0x50dc6f[_0x11c62c]!==''?JSON[_0x10d92b(0xbe)](_0x50dc6f[_0x11c62c]):[],_0x4192c7=_0xf9d213[_0x10d92b(0xea)](_0x11f012=>Number(_0x11f012));break;case _0x10d92b(0x106):_0x4192c7=_0x50dc6f[_0x11c62c]!==''?eval(_0x50dc6f[_0x11c62c]):null;break;case _0x10d92b(0xef):_0xf9d213=_0x50dc6f[_0x11c62c]!==''?JSON[_0x10d92b(0xbe)](_0x50dc6f[_0x11c62c]):[],_0x4192c7=_0xf9d213[_0x10d92b(0xea)](_0x13f186=>eval(_0x13f186));break;case'JSON':_0x4192c7=_0x50dc6f[_0x11c62c]!==''?JSON[_0x10d92b(0xbe)](_0x50dc6f[_0x11c62c]):'';break;case _0x10d92b(0xa7):_0xf9d213=_0x50dc6f[_0x11c62c]!==''?JSON['parse'](_0x50dc6f[_0x11c62c]):[],_0x4192c7=_0xf9d213[_0x10d92b(0xea)](_0x32bf54=>JSON[_0x10d92b(0xbe)](_0x32bf54));break;case _0x10d92b(0x104):_0x4192c7=_0x50dc6f[_0x11c62c]!==''?new Function(JSON[_0x10d92b(0xbe)](_0x50dc6f[_0x11c62c])):new Function(_0x10d92b(0xe1));break;case'ARRAYFUNC':_0xf9d213=_0x50dc6f[_0x11c62c]!==''?JSON[_0x10d92b(0xbe)](_0x50dc6f[_0x11c62c]):[],_0x4192c7=_0xf9d213['map'](_0x2d1e8c=>new Function(JSON[_0x10d92b(0xbe)](_0x2d1e8c)));break;case'STR':_0x4192c7=_0x50dc6f[_0x11c62c]!==''?String(_0x50dc6f[_0x11c62c]):'';break;case _0x10d92b(0x144):_0xf9d213=_0x50dc6f[_0x11c62c]!==''?JSON[_0x10d92b(0xbe)](_0x50dc6f[_0x11c62c]):[],_0x4192c7=_0xf9d213[_0x10d92b(0xea)](_0x504aec=>String(_0x504aec));break;case _0x10d92b(0xd7):_0x163534=_0x50dc6f[_0x11c62c]!==''?JSON[_0x10d92b(0xbe)](_0x50dc6f[_0x11c62c]):{},_0x4192c7=VisuMZ[_0x10d92b(0xb7)]({},_0x163534);break;case _0x10d92b(0xb0):_0xf9d213=_0x50dc6f[_0x11c62c]!==''?JSON[_0x10d92b(0xbe)](_0x50dc6f[_0x11c62c]):[],_0x4192c7=_0xf9d213[_0x10d92b(0xea)](_0x4363cb=>VisuMZ[_0x10d92b(0xb7)]({},JSON[_0x10d92b(0xbe)](_0x4363cb)));break;default:continue;}_0x164bb7[_0x2e01bd]=_0x4192c7;}}return _0x164bb7;},(_0x42544e=>{const _0x1c46d7=_0x20d377,_0xa9d9e1=_0x42544e[_0x1c46d7(0xf0)];for(const _0x4f0a58 of dependencies){if(!Imported[_0x4f0a58]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x1c46d7(0x146)](_0xa9d9e1,_0x4f0a58)),SceneManager[_0x1c46d7(0x108)]();break;}}const _0x26b611=_0x42544e[_0x1c46d7(0xf8)];if(_0x26b611[_0x1c46d7(0xe0)](/\[Version[ ](.*?)\]/i)){const _0x436ee7=Number(RegExp['$1']);_0x436ee7!==VisuMZ[label][_0x1c46d7(0xdf)]&&(alert(_0x1c46d7(0x13d)[_0x1c46d7(0x146)](_0xa9d9e1,_0x436ee7)),SceneManager['exit']());}if(_0x26b611[_0x1c46d7(0xe0)](/\[Tier[ ](\d+)\]/i)){const _0x19f76e=Number(RegExp['$1']);_0x19f76e<tier?(alert(_0x1c46d7(0x12e)['format'](_0xa9d9e1,_0x19f76e,tier)),SceneManager[_0x1c46d7(0x108)]()):tier=Math['max'](_0x19f76e,tier);}VisuMZ[_0x1c46d7(0xb7)](VisuMZ[label][_0x1c46d7(0xec)],_0x42544e[_0x1c46d7(0xa4)]);})(pluginData),VisuMZ['AutoSkillTriggers']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x20d377(0xc3)][_0x20d377(0x11b)],Scene_Boot['prototype'][_0x20d377(0x11b)]=function(){const _0x5c2258=_0x20d377;VisuMZ[_0x5c2258(0x142)][_0x5c2258(0xab)][_0x5c2258(0x12b)](this),this[_0x5c2258(0xb8)]();},Scene_Boot[_0x20d377(0xc3)][_0x20d377(0xb8)]=function(){VisuMZ['AutoSkillTriggers']['CreateNotetags']();},VisuMZ[_0x20d377(0x142)][_0x20d377(0x105)]={},VisuMZ[_0x20d377(0x142)][_0x20d377(0x136)]=function(){const _0x24c3f2=_0x20d377;let _0x37b71c=[[_0x24c3f2(0xc4),_0x24c3f2(0xed)],[_0x24c3f2(0x127),_0x24c3f2(0x100)],['Ally',_0x24c3f2(0x122)],[_0x24c3f2(0xb5),_0x24c3f2(0x130)],[_0x24c3f2(0xe7),_0x24c3f2(0xf5)],[_0x24c3f2(0xfa),_0x24c3f2(0x141)],['Opponents',_0x24c3f2(0xf3)]],_0x58105b=[[_0x24c3f2(0xc6),_0x24c3f2(0xdc)],[_0x24c3f2(0xda),'(?:BATTLE\x20WIN|WIN\x20BATTLE|VICTORY|VICTORY\x20CRY|VICTORYCRY)'],[_0x24c3f2(0xd2),'(?:DEATH|DEATHRATTLE|DEATH\x20RATTLE|LASTWORD|LAST\x20WORD|FINAL\x20ATTACK)']];for(const _0x6f8583 of _0x37b71c){if(!_0x6f8583)continue;_0x58105b[_0x24c3f2(0xb1)](['on%1Attack'[_0x24c3f2(0x146)](_0x6f8583[0x0]),_0x24c3f2(0xa0)['format'](_0x6f8583[0x1])]),_0x58105b[_0x24c3f2(0xb1)]([_0x24c3f2(0x125)[_0x24c3f2(0x146)](_0x6f8583[0x0]),_0x24c3f2(0xdd)[_0x24c3f2(0x146)](_0x6f8583[0x1])]),_0x58105b[_0x24c3f2(0xb1)]([_0x24c3f2(0x13f)[_0x24c3f2(0x146)](_0x6f8583[0x0]),_0x24c3f2(0x116)[_0x24c3f2(0x146)](_0x6f8583[0x1])]),_0x58105b[_0x24c3f2(0xb1)](['on%1Physical'[_0x24c3f2(0x146)](_0x6f8583[0x0]),_0x24c3f2(0xd9)['format'](_0x6f8583[0x1])]),_0x58105b['push']([_0x24c3f2(0xcd)[_0x24c3f2(0x146)](_0x6f8583[0x0]),_0x24c3f2(0x117)[_0x24c3f2(0x146)](_0x6f8583[0x1])]),_0x58105b['push']([_0x24c3f2(0xc0)[_0x24c3f2(0x146)](_0x6f8583[0x0]),_0x24c3f2(0xc2)[_0x24c3f2(0x146)](_0x6f8583[0x1])]);}for(const _0xdc2320 of $dataSystem[_0x24c3f2(0x107)]){if(!_0xdc2320)continue;let _0x4ab747=DataManager[_0x24c3f2(0x11a)](_0xdc2320);for(const _0x4c05bd of _0x37b71c){if(!_0x4c05bd)continue;_0x58105b[_0x24c3f2(0xb1)]([_0x24c3f2(0x109)[_0x24c3f2(0x146)](_0x4ab747[_0x24c3f2(0x113)](/[ ]/gi,''),_0x4c05bd[0x0]),'(?:SKILL\x20TYPE\x20%1\x20%2|STYPE\x20%1\x20%2)'[_0x24c3f2(0x146)](_0x4ab747,_0x4c05bd[0x1])]);}}for(const _0x2560c5 of $dataSystem['elements']){if(!_0x2560c5)continue;let _0x4987a9=DataManager[_0x24c3f2(0x11a)](_0x2560c5);for(const _0x22150d of _0x37b71c){if(!_0x22150d)continue;_0x58105b[_0x24c3f2(0xb1)]([_0x24c3f2(0x133)['format'](_0x4987a9['replace'](/[ ]/gi,''),_0x22150d[0x0]),_0x24c3f2(0x131)['format'](_0x4987a9,_0x22150d[0x1])]);}}for(const _0x41f141 of _0x58105b){this[_0x24c3f2(0x13c)](_0x41f141[0x0],_0x41f141[0x1]);}},VisuMZ[_0x20d377(0x142)][_0x20d377(0x13c)]=function(_0x569fc3,_0x118468){const _0x11c957=_0x20d377;_0x569fc3=_0x569fc3['toUpperCase']()[_0x11c957(0xa8)]();const _0x175795=_0x11c957(0xde)[_0x11c957(0x146)](_0x118468);VisuMZ['AutoSkillTriggers'][_0x11c957(0x105)][_0x569fc3]=new RegExp(_0x175795,'i');const _0x485512=_0x569fc3+_0x11c957(0x10c),_0x51912a=_0x11c957(0xfe)[_0x11c957(0x146)](_0x118468);VisuMZ[_0x11c957(0x142)][_0x11c957(0x105)][_0x485512]=new RegExp(_0x51912a,'i');},DataManager[_0x20d377(0x11d)]=function(_0x41fc46){const _0x4c71a1=_0x20d377;return this['stripNameTextCodes']($dataSystem[_0x4c71a1(0x107)][_0x41fc46]);},DataManager[_0x20d377(0x11a)]=function(_0x13ecba){const _0x2bdfe5=_0x20d377;if(!_0x13ecba)return'';return _0x13ecba=_0x13ecba['replace'](/\\V\[(\d+)\]/gi,''),_0x13ecba=_0x13ecba[_0x2bdfe5(0x113)](/\\I\[(\d+)\]/gi,''),_0x13ecba=_0x13ecba[_0x2bdfe5(0x113)](/\\C\[(\d+)\]/gi,''),_0x13ecba=_0x13ecba[_0x2bdfe5(0x113)](/\\N\[(\d+)\]/gi,''),_0x13ecba=_0x13ecba[_0x2bdfe5(0x113)](/\\P\[(\d+)\]/gi,''),(_0x13ecba||'')[_0x2bdfe5(0x124)]()['trim']();},DataManager['getElementNameFromID']=function(_0x434226){const _0x3de96a=_0x20d377;return this[_0x3de96a(0x11a)]($dataSystem[_0x3de96a(0x110)][_0x434226]);},VisuMZ[_0x20d377(0x142)]['BattleManager_endAction']=BattleManager[_0x20d377(0xaa)],BattleManager[_0x20d377(0xaa)]=function(){const _0x408691=_0x20d377,_0x53430c=this['_action']&&this[_0x408691(0xd6)]['isAutoSkillTrigger'](),_0x4a9f6c=this[_0x408691(0xb2)];_0x53430c&&(this['_subject'][_0x408691(0x137)]=!![]),VisuMZ['AutoSkillTriggers'][_0x408691(0xbd)][_0x408691(0x12b)](this),_0x4a9f6c&&_0x53430c&&_0x4a9f6c['returnSavedAutoSkillTriggerActions']();},VisuMZ['AutoSkillTriggers'][_0x20d377(0xd4)]=BattleManager[_0x20d377(0x118)],BattleManager['checkBattleEnd']=function(){const _0x568af8=_0x20d377;if($gameTroop[_0x568af8(0xe6)]())$gameParty[_0x568af8(0xbf)]();if(this['_forcedBattlers'][_0x568af8(0xca)]>0x0)return![];return VisuMZ[_0x568af8(0x142)][_0x568af8(0xd4)]['call'](this);},VisuMZ[_0x20d377(0x142)]['Game_Action_clear']=Game_Action['prototype'][_0x20d377(0x126)],Game_Action[_0x20d377(0xc3)][_0x20d377(0x126)]=function(){const _0x1ee728=_0x20d377;VisuMZ[_0x1ee728(0x142)][_0x1ee728(0xff)][_0x1ee728(0x12b)](this),this[_0x1ee728(0xa2)](![]);},Game_Action[_0x20d377(0xc3)][_0x20d377(0xa2)]=function(_0x3036bf){const _0x39fd4b=_0x20d377;this[_0x39fd4b(0x114)]=_0x3036bf;},Game_Action[_0x20d377(0xc3)]['isAutoSkillTrigger']=function(){const _0x2f8dd6=_0x20d377;return!!this[_0x2f8dd6(0x114)];},VisuMZ[_0x20d377(0x142)][_0x20d377(0xbc)]=Game_Action[_0x20d377(0xc3)][_0x20d377(0xcc)],Game_Action[_0x20d377(0xc3)][_0x20d377(0xcc)]=function(){const _0xa1b18f=_0x20d377;let _0x52dd87=VisuMZ[_0xa1b18f(0x142)]['Game_Action_isValid'][_0xa1b18f(0x12b)](this),_0x7ca7b3=this[_0xa1b18f(0xba)]()?this[_0xa1b18f(0xba)]()[_0xa1b18f(0x101)]:-0x1;return this['item']()&&this[_0xa1b18f(0xf2)]()?(this[_0xa1b18f(0xba)]()[_0xa1b18f(0x101)]=0x0,_0x52dd87=_0x52dd87&&this[_0xa1b18f(0xa6)]()['canUse'](this['item']()),this[_0xa1b18f(0xba)]()['occasion']=_0x7ca7b3,_0x52dd87):_0x52dd87;},VisuMZ[_0x20d377(0x142)][_0x20d377(0x140)]=Game_Action['prototype'][_0x20d377(0xac)],Game_Action['prototype'][_0x20d377(0xac)]=function(){const _0x491875=_0x20d377;VisuMZ[_0x491875(0x142)]['Game_Action_applyGlobal'][_0x491875(0x12b)](this),this[_0x491875(0x111)]();},Game_Action[_0x20d377(0xc3)][_0x20d377(0xcf)]=function(){const _0x27dff6=_0x20d377;if(!this['isSkill']())return[];let _0x39a312=[];return Imported['VisuMZ_1_SkillsStatesCore']?_0x39a312=DataManager[_0x27dff6(0x120)](this[_0x27dff6(0xba)]()):_0x39a312[_0x27dff6(0xb1)](this[_0x27dff6(0xba)]()['stypeId']),_0x39a312[_0x27dff6(0xea)](_0x2d482b=>DataManager[_0x27dff6(0x11d)](_0x2d482b));},Game_Action[_0x20d377(0xc3)][_0x20d377(0x13a)]=function(){const _0x3d334d=_0x20d377;let _0x591be4=[];if(Imported[_0x3d334d(0x147)])_0x591be4=this['elements']();else{if(this['item']()[_0x3d334d(0xfc)][_0x3d334d(0xae)]<0x0){const _0x48f219=this[_0x3d334d(0xa6)]();_0x591be4=_0x48f219[_0x3d334d(0xd8)]();}else _0x591be4=[this[_0x3d334d(0xba)]()['damage'][_0x3d334d(0xae)]];}return _0x591be4[_0x3d334d(0xea)](_0x35a1de=>DataManager[_0x3d334d(0xce)](_0x35a1de));},Game_Action[_0x20d377(0xc3)][_0x20d377(0x111)]=function(){const _0x47e9f0=_0x20d377;if(!SceneManager[_0x47e9f0(0x11c)]())return;if(!this[_0x47e9f0(0xba)]())return;if(this[_0x47e9f0(0xba)]()[_0x47e9f0(0xf7)][_0x47e9f0(0xe0)](/<NO AUTO SKILL TRIGGER>/i))return;if(this['item']()['note'][_0x47e9f0(0xe0)](/<AUTO TRIGGER:[ ](.*)>/i))return;const _0x300f24=this[_0x47e9f0(0xa6)](),_0x228e9a=BattleManager[_0x47e9f0(0x13e)]['filter']((_0x2f50cc,_0x48a89d,_0x6fafda)=>_0x6fafda[_0x47e9f0(0x143)](_0x2f50cc)===_0x48a89d),_0x66e03b=_0x300f24['friendsUnit']()[_0x47e9f0(0xe3)](),_0x1ef257=_0x300f24[_0x47e9f0(0x12d)]()[_0x47e9f0(0xe3)]();this[_0x47e9f0(0x132)](_0x300f24,_0x47e9f0(0xc4));for(const _0x3bb80c of _0x228e9a){this[_0x47e9f0(0x132)](_0x3bb80c,'Target');if(_0x3bb80c['isActor']()===_0x300f24[_0x47e9f0(0xd0)]())this[_0x47e9f0(0x132)](_0x3bb80c,_0x47e9f0(0xe4));else _0x3bb80c[_0x47e9f0(0xd0)]()!==_0x300f24['isActor']()&&this[_0x47e9f0(0x132)](_0x3bb80c,_0x47e9f0(0xb5));}for(const _0x306c0b of _0x66e03b){this[_0x47e9f0(0x132)](_0x306c0b,_0x47e9f0(0xe7)),_0x306c0b!==_0x300f24&&this[_0x47e9f0(0x132)](_0x306c0b,_0x47e9f0(0xfa));}for(const _0x2663c8 of _0x1ef257){this[_0x47e9f0(0x132)](_0x2663c8,_0x47e9f0(0xe9));}},Game_Action['prototype'][_0x20d377(0x132)]=function(_0x4ac886,_0x5cafe4){const _0x3b6ac3=_0x20d377;if(!_0x4ac886)return;if(this['isAttack']())_0x4ac886[_0x3b6ac3(0x115)](_0x3b6ac3(0xc1)[_0x3b6ac3(0x146)](_0x5cafe4));if(this[_0x3b6ac3(0xeb)]())_0x4ac886[_0x3b6ac3(0x115)](_0x3b6ac3(0x125)[_0x3b6ac3(0x146)](_0x5cafe4));if(this[_0x3b6ac3(0xad)]())_0x4ac886[_0x3b6ac3(0x115)]('on%1Item'[_0x3b6ac3(0x146)](_0x5cafe4));if(this[_0x3b6ac3(0xa9)]())_0x4ac886[_0x3b6ac3(0x115)]('on%1Physical'[_0x3b6ac3(0x146)](_0x5cafe4));if(this[_0x3b6ac3(0x11f)]())_0x4ac886[_0x3b6ac3(0x115)](_0x3b6ac3(0xcd)[_0x3b6ac3(0x146)](_0x5cafe4));if(this[_0x3b6ac3(0xe8)]())_0x4ac886[_0x3b6ac3(0x115)]('on%1Certain'[_0x3b6ac3(0x146)](_0x5cafe4));const _0x400e40=this[_0x3b6ac3(0xcf)]();for(let _0x63d83e of _0x400e40){if(!_0x63d83e)continue;_0x63d83e=_0x63d83e[_0x3b6ac3(0x113)](/[ ]/gi,''),_0x4ac886[_0x3b6ac3(0x115)](_0x3b6ac3(0x10e)['format'](_0x5cafe4,_0x63d83e));}const _0x4b65bd=this['getAutoSkillTriggerElements']();for(let _0x4c478d of _0x4b65bd){if(!_0x4c478d)continue;_0x4c478d=_0x4c478d[_0x3b6ac3(0x113)](/[ ]/gi,''),_0x4ac886[_0x3b6ac3(0x115)](_0x3b6ac3(0xf1)['format'](_0x5cafe4,_0x4c478d));}},VisuMZ[_0x20d377(0x142)][_0x20d377(0xaf)]=Game_BattlerBase[_0x20d377(0xc3)][_0x20d377(0x12c)],Game_BattlerBase[_0x20d377(0xc3)][_0x20d377(0x12c)]=function(_0x1fac34){const _0x17c276=_0x20d377;if(_0x1fac34===this[_0x17c276(0xa1)]()&&this['hasDeathAutoSkillTrigger']())return this[_0x17c276(0xe2)]();VisuMZ[_0x17c276(0x142)][_0x17c276(0xaf)][_0x17c276(0x12b)](this,_0x1fac34);},Game_BattlerBase[_0x20d377(0xc3)]['hasDeathAutoSkillTrigger']=function(){const _0x2dd837=_0x20d377;if(!this[_0x2dd837(0x135)]())return![];if(this[_0x2dd837(0x102)])return![];const _0x47b378=VisuMZ[_0x2dd837(0x142)][_0x2dd837(0x105)][_0x2dd837(0xdb)];return this['skills']()['some'](_0x14ba94=>_0x14ba94&&_0x14ba94[_0x2dd837(0xf7)][_0x2dd837(0xe0)](_0x47b378));},VisuMZ['AutoSkillTriggers']['Game_BattlerBase_isImmortal']=Game_BattlerBase['prototype']['isImmortal'],Game_BattlerBase[_0x20d377(0xc3)]['isImmortal']=function(){const _0x2d3922=_0x20d377;if(this['_deathAutoSkillTriggerActive'])return!![];return VisuMZ[_0x2d3922(0x142)][_0x2d3922(0xc7)][_0x2d3922(0x12b)](this);},Game_Battler[_0x20d377(0xc3)]['processAutoSkillTrigger']=function(_0x1db296){const _0x4bc390=_0x20d377;if(!SceneManager[_0x4bc390(0x11c)]())return;_0x1db296=_0x1db296[_0x4bc390(0x124)]()[_0x4bc390(0xa8)]();const _0x1a6a55=VisuMZ[_0x4bc390(0x142)][_0x4bc390(0x105)][_0x1db296],_0x5026df=_0x1db296+_0x4bc390(0x10c),_0x3a7bd6=VisuMZ[_0x4bc390(0x142)][_0x4bc390(0x105)][_0x5026df];if(!_0x1a6a55&&!_0x3a7bd6)return;if(!this[_0x4bc390(0x135)]())return;for(const _0x50cf4b of this[_0x4bc390(0x119)]()){if(!_0x50cf4b)continue;if(!this[_0x4bc390(0x112)](_0x50cf4b))continue;let _0x53475f=![];if(_0x50cf4b[_0x4bc390(0xf7)][_0x4bc390(0xe0)](_0x1a6a55))_0x53475f=!![];else{if(_0x50cf4b[_0x4bc390(0xf7)][_0x4bc390(0xe0)](_0x3a7bd6)){const _0x18298c=(Number(RegExp['$1'])||0x0)*0.01;_0x53475f=Math['random']()<_0x18298c;}}if(_0x53475f){this[_0x4bc390(0x11e)](_0x50cf4b['id']);const _0x335acd=BattleManager[_0x4bc390(0xf4)][_0x4bc390(0xa5)](),_0x4b3333=BattleManager['_subject'];BattleManager['_subject']=null,BattleManager[_0x4bc390(0x13b)](this),BattleManager[_0x4bc390(0xf4)]=_0x335acd,BattleManager[_0x4bc390(0xb2)]=_0x4b3333;}}},Game_Battler[_0x20d377(0xc3)][_0x20d377(0x11e)]=function(_0x32d6ad){const _0x1dfe25=_0x20d377;!this[_0x1dfe25(0x10f)]&&(this[_0x1dfe25(0x10f)]=this['_actions'][_0x1dfe25(0xa5)]());this[_0x1dfe25(0x13b)](_0x32d6ad,-0x2);if(!this[_0x1dfe25(0xd1)])return;const _0x32e162=this['_actions'][this['_actions'][_0x1dfe25(0xca)]-0x1];_0x32e162[_0x1dfe25(0xa2)](!![]);},Game_Battler[_0x20d377(0xc3)][_0x20d377(0xb9)]=function(){const _0x36e81b=_0x20d377;if(!this[_0x36e81b(0x10f)])return;if(this[_0x36e81b(0xd1)][_0x36e81b(0xca)]>0x0)return;this[_0x36e81b(0xd1)]=this[_0x36e81b(0x10f)],this[_0x36e81b(0x10f)]=undefined;},VisuMZ[_0x20d377(0x142)]['Game_Battler_onBattleEnd']=Game_Battler[_0x20d377(0xc3)][_0x20d377(0xc8)],Game_Battler[_0x20d377(0xc3)][_0x20d377(0xc8)]=function(){const _0x1a776b=_0x20d377;this[_0x1a776b(0x10f)]=undefined,VisuMZ['AutoSkillTriggers'][_0x1a776b(0x129)][_0x1a776b(0x12b)](this);},VisuMZ['AutoSkillTriggers']['Game_Battler_clearTpbChargeTime']=Game_Battler[_0x20d377(0xc3)][_0x20d377(0x128)],Game_Battler[_0x20d377(0xc3)][_0x20d377(0x128)]=function(){const _0x59dbc5=_0x20d377;if(this[_0x59dbc5(0x137)]){this['_autoSkillTriggerBypassTpbClear']=undefined;return;}VisuMZ['AutoSkillTriggers']['Game_Battler_clearTpbChargeTime'][_0x59dbc5(0x12b)](this);},VisuMZ[_0x20d377(0x142)]['Game_Battler_onBattleStart']=Game_Battler[_0x20d377(0xc3)][_0x20d377(0xc6)],Game_Battler['prototype'][_0x20d377(0xc6)]=function(_0x29fe16){const _0x51bdf5=_0x20d377;this[_0x51bdf5(0x10f)]=undefined,VisuMZ[_0x51bdf5(0x142)][_0x51bdf5(0xf6)][_0x51bdf5(0x12b)](this,_0x29fe16),this['processAutoSkillTrigger'](_0x51bdf5(0xc6)),this[_0x51bdf5(0xa3)]();},VisuMZ[_0x20d377(0x142)][_0x20d377(0xb4)]=Game_BattlerBase[_0x20d377(0xc3)][_0x20d377(0xd3)],Game_BattlerBase['prototype'][_0x20d377(0xd3)]=function(){const _0x612216=_0x20d377;VisuMZ[_0x612216(0x142)][_0x612216(0xb4)][_0x612216(0x12b)](this),this[_0x612216(0xa3)]();},Game_Battler[_0x20d377(0xc3)][_0x20d377(0xa3)]=function(){this['_deathAutoSkillTriggerActive']=![],this['_deathAutoSkillTriggerPerformed']=![];},Game_Battler[_0x20d377(0xc3)][_0x20d377(0xe2)]=function(){const _0x571462=_0x20d377;if(!this[_0x571462(0x135)]())return;this['_deathAutoSkillTriggerActive']=!![],this[_0x571462(0x115)]('onDeath');};const _Game_Battler_onAllActionsEnd_=Game_Battler[_0x20d377(0xc3)]['onAllActionsEnd'];Game_Battler[_0x20d377(0xc3)][_0x20d377(0x138)]=function(){const _0x348fd2=_0x20d377;_Game_Battler_onAllActionsEnd_[_0x348fd2(0x12b)](this),this[_0x348fd2(0x121)]();},Game_Battler[_0x20d377(0xc3)][_0x20d377(0x121)]=function(){const _0x4ee4be=_0x20d377;if(!this[_0x4ee4be(0xd5)])return;if(this['_deathAutoSkillTriggerPerformed'])return;const _0x3babb8=BattleManager[_0x4ee4be(0x103)];for(const _0x43b953 of _0x3babb8){if(!_0x43b953)continue;if(_0x43b953[0x0]===this)return;}this['_deathAutoSkillTriggerActive']=![],this[_0x4ee4be(0x102)]=!![],this['refresh']();if(this[_0x4ee4be(0xc5)]())this[_0x4ee4be(0xa3)]();},VisuMZ[_0x20d377(0x142)][_0x20d377(0x12f)]=Game_Unit[_0x20d377(0xc3)]['onBattleStart'],Game_Unit[_0x20d377(0xc3)][_0x20d377(0xc6)]=function(_0x6b8ea0){const _0xc7d27d=_0x20d377;VisuMZ[_0xc7d27d(0x142)]['Game_Unit_onBattleStart']['call'](this,_0x6b8ea0);if(this['constructor']===Game_Party)this[_0xc7d27d(0x10a)]=![];},Game_Unit['prototype'][_0x20d377(0x12a)]=function(_0x2424d0,_0x46e73f){const _0x5d1776=_0x20d377;_0x46e73f=_0x46e73f||null;const _0x1ff932=this[_0x5d1776(0xe3)]()[_0x5d1776(0x134)](_0x4ee408=>_0x4ee408!==_0x46e73f);for(const _0x5eb9f4 of _0x1ff932){if(!_0x5eb9f4)continue;_0x5eb9f4[_0x5d1776(0x115)](_0x2424d0);}},Game_Party['prototype'][_0x20d377(0xbf)]=function(){const _0x297760=_0x20d377;if(this[_0x297760(0x10a)])return;this[_0x297760(0x10a)]=!![],this[_0x297760(0x12a)](_0x297760(0xda));};