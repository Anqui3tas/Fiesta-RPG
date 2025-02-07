//=============================================================================
// VisuStella MZ - Weapon Swap System
// VisuMZ_2_WeaponSwapSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_WeaponSwapSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaponSwapSystem = VisuMZ.WeaponSwapSystem || {};
VisuMZ.WeaponSwapSystem.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.09] [WeaponSwapSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weapon_Swap_System_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds in a Weapon Swap System. Actors can equip a different
 * weapon for each weapon type available for use. These weapons can be swapped
 * to and from during the middle of a battle. Swapping weapons can let the
 * player's team adapt to certain situations better or giving them the ability
 * to hit certain weapon weaknesses in battle.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actors can equip multiple weapons, one for each weapon type.
 * * These weapons can be switched during the middle of battle.
 * * Choose to display only equippable weapon types in the Equip Menu or all
 *   of the possible weapon types.
 * * Have certain skills switch over to different equipped weapons when
 *   performing them.
 * * Shortcut keys to allow switching between weapon types easily when
 *   selecting commands.
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
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_ItemsEquipsCore
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
 * Dual Wielding
 * 
 * Dual Wielding properties have been disabled to allow for the Weapon Swap
 * System. There are too many conflicts between it and the Weapon Swap System.
 * There is simply no way around it.
 *
 * ---
 * 
 * Required Weapons
 * 
 * RPG Maker MZ's skills allowed for Required Weapons and needed the actor to
 * have any of the said weapon type(s) equipped upon usage. This function has
 * now been changed. Now, as long as the actor has any of the weapon types
 * available and a weapon attached to it, the actor will be able to use the
 * skill without needing to switch to that weapon first.
 * 
 * When using the skill, the actor will switch to the first available weapon
 * type if needed as long as it is a requirement.
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
 * VisuMZ_1_ItemsEquipsCore
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
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
 * === Skill Usage-Related Notetags ===
 * 
 * ---
 *
 * <Require Any Weapon>
 *
 * - Used for: Skill Notetags
 * - Requires the actor to have any weapon equipped in order to use the skill,
 *   regardless of the weapon's type.
 * - This does not affect enemies.
 *
 * ---
 *
 * <Switch to Weapon Type: id>
 * <Switch to Weapon Type: name>
 *
 * - Used for: Skill Notetags
 * - When using the skill, the actor will switch to the equipped weapon of the
 *   matching type.
 * - Replace 'id' with a number representing the weapon type's ID.
 * - Replace 'name' with the name of the weapon type.
 * - Weapon types are not the same as weapons. Weapon types are found in the
 *   Database > Types tab.
 * - This does not affect enemies.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * There's not too many mechanics that can be modified through the Plugin
 * Parameters, but the setting here will at least let you ease up on testing
 * battles from the database.
 *
 * ---
 *
 * Battle Test
 * 
 *   Equip All Weapons?:
 *   - Do you want to equip one of each weapon type during battle tests for
 *     all actors?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * The following Plugin Parameters are dedicated towards modifying the UI
 * elements added through this plugin.
 *
 * ---
 *
 * Attack Command
 * 
 *   Change Attack Icon?:
 *   - Change the Attack command to show the weapon?
 *   - Or have it represent the Attack skill?
 * 
 *   Swap Shortcut?:
 *   - Allow shortcut to switch weapons while selecting the Attack command?
 * 
 *     Show Arrows?:
 *     - Show arrows to the left and right of the Attack command for an easy
 *       reminder of the shortcut?
 *
 * ---
 *
 * Swap Command
 * 
 *   Show Command?:
 *   - Show the Swap weapon command in the Actor Command Window?
 *   - The Swap weapon command will be listed by default after the Attack
 *     command.
 *     - If you do not have the Attack command, it will not be shown unless you
 *       add "Weapon Swap" to the battle command list.
 * 
 * 
 *   Swap Icon:
 *   - What icon do you wish to use to represent the Swap command for the
 *     Actor Command Window?
 * 
 *   Swap Name:
 *   - What text do you want to use to represent the Swap command for the
 *     Actor Command Window?
 * 
 *   Help: Swap:
 *   - Help text for Swap command.
 *
 * ---
 *
 * Equip Scene
 * 
 *   Show Unequippable?:
 *   - Show all weapon types in the equip scene?
 *   - Or only just the equippable ones?
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
 * Version 1.09: December 9, 2021
 * * Compatibility Update!
 * ** Changing classes via the Class Change System plugin should no longer dupe
 *    weapons under specific circumstances. Update made by Olivia.
 * * Feature Update!
 * ** Upon an actor's turn to input a command, if the actor is barefisted while
 *    having available swap weapons, it will default the choice to the first
 *    available slot. Update made by Olivia.
 * ** The barefisted equip would occur before because when navigating the equip
 *    menu, the switched weapon type would change to whatever is selected. If
 *    you go to a slot without any weapons equipped, it would be as having a
 *    barehanded setup.
 * 
 * Version 1.08: July 9, 2021
 * * Bug Fixes!
 * ** Removed a potential equipment duplication exploit with changing classes.
 *    Fix made by Olivia.
 * 
 * Version 1.07: July 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: June 25, 2021
 * * Bug Fixes!
 * ** Have the "Shortcut" plugin parameter off will no longer cause crashes.
 *    Fix made by Olivia.
 * 
 * Version 1.05: June 4, 2021
 * * Bug Fixes!
 * ** Fixed weapon swap notetags to have them occur naturally. Fix by Arisu.
 * 
 * Version 1.04: May 28, 2021
 * * Bug Fixes!
 * ** Cache clear will now occur when using automatic switching to update any
 *    cached stats for actors. Fix made by Olivia.
 * 
 * Version 1.03: May 21, 2021
 * * Bug Fixes!
 * ** Weapon type requirements for skills will the weapon type to be equipped
 *    as one of the available slots. Fix made by Olivia.
 * 
 * Version 1.02: April 16, 2021
 * * Bug Fixes!
 * ** Shortcut arrows should no longer be visible when an actor has only one
 *    weapon to swap to and from. Fix made by Olivia.
 * * Compatibility Update!
 * ** Weapon Swap System should now be compatible with the Item and Equip
 *    Core's non-removable types setting. Update made by Irina.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** Shortcut arrow now accounts for changes in the actor command window size
 *    when updated post-initialization. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Documentation updated for the "UI Settings Plugin Parameters":
 * *** The Swap weapon command will be listed by default after the Attack
 *     command.
 * **** If you do not have the Attack command, it will not be shown unless you
 *      add "Weapon Swap" to the battle command list.
 * * New Features!
 * ** New Plugin Parameters added by Olivia!
 * *** Plugin Parameters > UI Settings > Help: Swap
 * **** Help text for Swap command.
 *
 * Version 1.00 Official Release Date: May 3, 2021
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
 * @param WeaponSwapSystem
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
 * @desc Mechanics settings for the Weapon Swap System.
 * @default {"Testing":"","BattleTestAllWeapons:eval":"true"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc UI settings for the Weapon Swap System.
 * @default {"AttackCommand":"","ChangeAttackIcon:eval":"true","SwapShortcut:eval":"true","ShowShortcutArrows:eval":"true","SwapCommand":"","ShowSwapCommand:eval":"false","SwapCommandIcon:num":"76","SwapCommandName:str":"Swap","EquipScene":"","ShowUnequippable:eval":"false"}
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
 * @param Testing
 * @text Battle Test
 *
 * @param BattleTestAllWeapons:eval
 * @text Equip All Weapons?
 * @parent Testing
 * @type boolean
 * @on All Weapons
 * @off Just Settings
 * @desc Do you want to equip one of each weapon type during
 * battle tests for all actors?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param AttackCommand
 * @text Attack Command
 *
 * @param ChangeAttackIcon:eval
 * @text Change Attack Icon?
 * @parent AttackCommand
 * @type boolean
 * @on Represent Weapon
 * @off Represent Skill Icon
 * @desc Change the Attack command to show the weapon?
 * Or have it represent the Attack skill?
 * @default true
 *
 * @param SwapShortcut:eval
 * @text Swap Shortcut?
 * @parent AttackCommand
 * @type boolean
 * @on Allow Shortcut
 * @off Don't Use
 * @desc Allow shortcut to switch weapons while selecting
 * the Attack command?
 * @default true
 *
 * @param ShowShortcutArrows:eval
 * @text Show Arrows?
 * @parent SwapShortcut:eval
 * @type boolean
 * @on Show Arrows
 * @off Hide Arrows
 * @desc Show arrows to the left and right of the Attack
 * command for an easy reminder of the shortcut?
 * @default true
 *
 * @param SwapCommand
 * @text Swap Command
 *
 * @param ShowSwapCommand:eval
 * @text Show Command?
 * @parent SwapCommand
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show the Swap weapon command in the
 * Actor Command Window?
 * @default true
 *
 * @param SwapCommandIcon:num
 * @text Swap Icon
 * @parent SwapCommand
 * @desc What icon do you wish to use to represent the
 * Swap command for the Actor Command Window?
 * @default 76
 *
 * @param SwapCommandName:str
 * @text Swap Name
 * @parent SwapCommand
 * @desc What text do you want to use to represent the
 * Swap command for the Actor Command Window?
 * @default Swap
 *
 * @param BattleHelpSwap:json
 * @text Help: Swap
 * @parent SwapCommand
 * @type note
 * @desc Help text for Swap command.
 * @default "Switch out the current weapon."
 *
 * @param EquipScene
 * @text Equip Scene
 *
 * @param ShowUnequippable:eval
 * @text Show Unequippable?
 * @parent EquipScene
 * @type boolean
 * @on All Weapons
 * @off Equippable Weapons
 * @desc Show all weapon types in the equip scene?
 * Or only just the equippable ones?
 * @default false
 *
 */
//=============================================================================

function _0x4648(){const _0x4384e2=['toUpperCase','UmtcC','trim','ppvpB','Switch\x20out\x20the\x20current\x20weapon.','weaponSwap','Game_Actor_releaseUnequippableItems','_cache','parent','weaponSwapTypes','map','changeEquip','Window_EquipSlot_isEnabled','817940PnmrMg','bitmap','swapWeaponIcon','WeaponSwapSystem','nonRemovableEtypes','RXaZH','updateSwapToNextAvailableWeapon','addChild','Mechanics','version','UGINu','name','visible','BJtOX','Settings','initWeaponSwapSystem','3301716Guzxun','swapWeaponNext','Game_BattlerBase_meetsSkillConditions','FRMoX','zyXex','7QcHEbl','processWeaponSwapRelease','EVAL','qcpBA','max','unshift','createWeaponSwapTypes','ShowShortcutArrows','YBrcr','WEEXA','isEnabledWeaponSwap','Nrgra','RYgBm','description','MISSING\x20WEAPON\x20TYPE:\x20%1','_checkingWeaponSwaps','Window_EquipItem_includes','_scene','splice','playOkSound','_wtypeID','canAddSkillCommand','CNMLT','isSkill','actorSlotNameWeaponSwap','requestMotionRefresh','Window_EquipSlot_equipSlotIndex','isOptimizeEquipOk','isActor','getFirstOfEachWeaponType','IhwYj','ARRAYSTR','commandWeaponSwap','createWeaponSwapShortcutSprites','activate','meetsAnyWeaponEquippedCondition','clearSwappableWeapons','initEquips','GmsgG','WEAPON_SWAP_CHANGE_ATTACK_ICON','executeEquipChange','eRnJA','onWeaponSwap','removeWeaponSwapCommand','opacity','1096028jiLyPK','tvuDV','SwapCommandIcon','indexOf','loadSystem','changeWeapon','contentsOpacity','_itemWindow','Game_Actor_optimizeEquipments','51784SodsBJ','refreshMotion','push','note','NUM','isEquipChangeOk','_weaponSwapShortcutSprite_Right','call','QdfVR','rhJQz','isClearEquipOk','text','releaseUnequippableItems','Game_Actor_isOptimizeEquipOk','LpNba','ewyCp','_firstOfEachWeaponType','tradeItemWithParty','Game_Actor_equipSlots','iYbfV','Game_Party_setupBattleTestMembers','attackSkillId','subject','2197470FsOVQc','findSymbol','Window_EquipItem_initialize','gTeGO','match','cursorRight','WEAPON_SWAP_SHOW_COMMAND','BattleHelpSwap','Window_EquipSlot_itemAt','clearEquipments','padding','_actor','attack','commandStyle','Scene_Battle_createActorCommandWindow','SwapCommandName','filter','Sprite_Actor_refreshMotion','equipSlots','setObject','DswsI','performWeaponSwap','swapWeaponCmd','optimizeEquipments','RegExp','cursorLeft','addWeaponSwapCommand','gjSMg','setText','BiDah','itemAtWeaponSwap','applyGlobal','switchToWeaponType','uBlJo','ARRAYSTRUCT','TruBW','4984788EyPnri','getWtypeIdWithName','getSwapWeapon','swapWeaponHelp','lgOkp','requiredWtypeId2','NRMlu','605508BjftWI','Game_Actor_initEquips','Game_Actor_isClearEquipOk','weapons','SJSOe','Game_Actor_changeEquip','battler','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','FPaxC','includes','Window_ActorCommand_addAttackCommand','_wtypeIDs','sElAg','prototype','_slotId','ChangeAttackIcon','addAttackCommand','Window_Base_playOkSound','refresh','format','Window_EquipSlot_maxItems','maxItemsWeaponSwap','lineHeight','isEquipWtypeOk','bestEquipWeapon','qHtkF','Window_StatusBase_actorSlotName','Game_Action_applyGlobal','WEAPON_SWAP_SHORTCUT_ARROWS','swapWeaponPrevious','weaponTypes','maxItems','55GSBvYX','object','remove','itemAt','261FchTDV','allMembers','ogevD','WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS','_weaponSwapShortcutSprite_Left','LEBYz','openness','cZILJ','requiredWtypeId1','playEquip','Game_Actor_clearEquipments','updateWeaponSwapShortcutSprites','etypeId','WEAPON_SWAP_BATTLE_TEST_ALL_WEAPONS','optimizeSwappableWeapons','updateShortcutOpacity','parse','alterAttackCommand','SwitchWpnTypeNum','currentSymbol','_equips','parameters','addCommand','Window_ActorCommand_initialize','bECpp','wtypeId','setSwapWeapon','VuezX','callUpdateHelp','STRUCT','createActorCommandWindow','eFGiu','Window','OZHav','_currentweapontype','meetsSkillConditions','setupBattleTestWeapons','Window_EquipItem_setSlotId','eDeTo','canWeaponSwap','dZjqd','actor','isWeaponSwapShortcutVisible','WEAPON_SWAP_SHORTCUT_ENABLE','Game_Battler_requestMotionRefresh','Window_EquipItem_isEnabled','_currentWeaponType','initialize','lmtTv','updateArrows','length','constructor','_actorCommandWindow','ShowSwapCommand','SBjRv','ConvertParams','setSlotId','setup','\x5cI[%1]%2','Window_ActorCommand_setup','updateHelp','exit','1qXBaeR','SwapShortcut','width','_swapWeapons','gainItem','isEnabled','qowNh','isSkillWtypeOk','vZdMJ','isWeaponSwapShortcutEnabled','20oKXKds','_swappingWeapon','FUNC','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','STR','return\x200','PYaHj','processShiftRemoveShortcut','getAllEquippedSwapWeapons','_statusWindow','_list','Window_ActorCommand_updateHelp'];_0x4648=function(){return _0x4384e2;};return _0x4648();}function _0x40a5(_0x3c5b3d,_0x1f4ae3){const _0x464805=_0x4648();return _0x40a5=function(_0x40a560,_0x3ecc24){_0x40a560=_0x40a560-0xfa;let _0x1b4627=_0x464805[_0x40a560];return _0x1b4627;},_0x40a5(_0x3c5b3d,_0x1f4ae3);}const _0x21d659=_0x40a5;(function(_0x3e52d3,_0x90f966){const _0x4cb541=_0x40a5,_0x5b79eb=_0x3e52d3();while(!![]){try{const _0x42df26=-parseInt(_0x4cb541(0x1b0))/0x1*(-parseInt(_0x4cb541(0x103))/0x2)+parseInt(_0x4cb541(0x14e))/0x3+parseInt(_0x4cb541(0x1ba))/0x4*(parseInt(_0x4cb541(0x1d3))/0x5)+-parseInt(_0x4cb541(0x147))/0x6*(-parseInt(_0x4cb541(0x1e8))/0x7)+-parseInt(_0x4cb541(0x10c))/0x8*(-parseInt(_0x4cb541(0x172))/0x9)+-parseInt(_0x4cb541(0x123))/0xa+parseInt(_0x4cb541(0x16e))/0xb*(-parseInt(_0x4cb541(0x1e3))/0xc);if(_0x42df26===_0x90f966)break;else _0x5b79eb['push'](_0x5b79eb['shift']());}catch(_0x113a48){_0x5b79eb['push'](_0x5b79eb['shift']());}}}(_0x4648,0xf1e7b));var label='WeaponSwapSystem',tier=tier||0x0,dependencies=['VisuMZ_1_BattleCore','VisuMZ_1_ItemsEquipsCore'],pluginData=$plugins[_0x21d659(0x133)](function(_0x47fd58){return _0x47fd58['status']&&_0x47fd58['description']['includes']('['+label+']');})[0x0];VisuMZ[label][_0x21d659(0x1e1)]=VisuMZ[label][_0x21d659(0x1e1)]||{},VisuMZ[_0x21d659(0x1a9)]=function(_0x322518,_0x28b145){const _0x322fb9=_0x21d659;for(const _0x3eed3f in _0x28b145){if(_0x322fb9(0x144)==='uBlJo'){if(_0x3eed3f['match'](/(.*):(.*)/i)){if('ehwMK'==='ehwMK'){const _0x57e7ba=String(RegExp['$1']),_0x33a62b=String(RegExp['$2'])['toUpperCase']()[_0x322fb9(0x1c8)]();let _0x4f8db7,_0x136f5a,_0x450140;switch(_0x33a62b){case _0x322fb9(0x110):_0x4f8db7=_0x28b145[_0x3eed3f]!==''?Number(_0x28b145[_0x3eed3f]):0x0;break;case'ARRAYNUM':_0x136f5a=_0x28b145[_0x3eed3f]!==''?JSON[_0x322fb9(0x182)](_0x28b145[_0x3eed3f]):[],_0x4f8db7=_0x136f5a[_0x322fb9(0x1d0)](_0xc88d9a=>Number(_0xc88d9a));break;case _0x322fb9(0x1ea):_0x4f8db7=_0x28b145[_0x3eed3f]!==''?eval(_0x28b145[_0x3eed3f]):null;break;case'ARRAYEVAL':_0x136f5a=_0x28b145[_0x3eed3f]!==''?JSON['parse'](_0x28b145[_0x3eed3f]):[],_0x4f8db7=_0x136f5a['map'](_0xb44218=>eval(_0xb44218));break;case'JSON':_0x4f8db7=_0x28b145[_0x3eed3f]!==''?JSON[_0x322fb9(0x182)](_0x28b145[_0x3eed3f]):'';break;case'ARRAYJSON':_0x136f5a=_0x28b145[_0x3eed3f]!==''?JSON[_0x322fb9(0x182)](_0x28b145[_0x3eed3f]):[],_0x4f8db7=_0x136f5a[_0x322fb9(0x1d0)](_0x553182=>JSON[_0x322fb9(0x182)](_0x553182));break;case _0x322fb9(0x1bc):_0x4f8db7=_0x28b145[_0x3eed3f]!==''?new Function(JSON[_0x322fb9(0x182)](_0x28b145[_0x3eed3f])):new Function(_0x322fb9(0x1bf));break;case'ARRAYFUNC':_0x136f5a=_0x28b145[_0x3eed3f]!==''?JSON['parse'](_0x28b145[_0x3eed3f]):[],_0x4f8db7=_0x136f5a['map'](_0x92d1c4=>new Function(JSON[_0x322fb9(0x182)](_0x92d1c4)));break;case _0x322fb9(0x1be):_0x4f8db7=_0x28b145[_0x3eed3f]!==''?String(_0x28b145[_0x3eed3f]):'';break;case _0x322fb9(0x207):_0x136f5a=_0x28b145[_0x3eed3f]!==''?JSON['parse'](_0x28b145[_0x3eed3f]):[],_0x4f8db7=_0x136f5a[_0x322fb9(0x1d0)](_0x35c50e=>String(_0x35c50e));break;case _0x322fb9(0x18f):_0x450140=_0x28b145[_0x3eed3f]!==''?JSON[_0x322fb9(0x182)](_0x28b145[_0x3eed3f]):{},_0x4f8db7=VisuMZ[_0x322fb9(0x1a9)]({},_0x450140);break;case _0x322fb9(0x145):_0x136f5a=_0x28b145[_0x3eed3f]!==''?JSON[_0x322fb9(0x182)](_0x28b145[_0x3eed3f]):[],_0x4f8db7=_0x136f5a[_0x322fb9(0x1d0)](_0x36ce94=>VisuMZ[_0x322fb9(0x1a9)]({},JSON[_0x322fb9(0x182)](_0x36ce94)));break;default:continue;}_0x322518[_0x57e7ba]=_0x4f8db7;}else{let _0x6599eb=_0x38a80e[_0x322fb9(0x1d6)]['Window_EquipSlot_equipSlotIndex'],_0x2b3cf7=this[_0x322fb9(0x12e)][_0x322fb9(0x1cf)]()['length']-0x1;return _0x5f431a[_0x322fb9(0x175)]&&(_0x2b3cf7=_0xfeac9e['weaponTypes'][_0x322fb9(0x1a4)]-0x2),_0x25072d['max'](0x0,_0x6599eb-_0x2b3cf7);}}}else this[_0x322fb9(0x1fc)]=this[_0x322fb9(0x12e)]['weaponSwapTypes']()[_0x185534];}return _0x322518;},(_0x4c1cf2=>{const _0x428972=_0x21d659,_0x727af6=_0x4c1cf2[_0x428972(0x1de)];for(const _0x2234ba of dependencies){if(!Imported[_0x2234ba]){if(_0x428972(0x1e7)!==_0x428972(0x19a)){alert(_0x428972(0x1bd)['format'](_0x727af6,_0x2234ba)),SceneManager[_0x428972(0x1af)]();break;}else this['isWeaponSwapShortcutEnabled']()?this['performWeaponSwap'](![]):_0x3e5071['prototype']['cursorLeft'][_0x428972(0x113)](this,_0x510f69);}}const _0x2b7d42=_0x4c1cf2[_0x428972(0x1f5)];if(_0x2b7d42[_0x428972(0x127)](/\[Version[ ](.*?)\]/i)){const _0x50bee0=Number(RegExp['$1']);_0x50bee0!==VisuMZ[label][_0x428972(0x1dc)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x428972(0x161)](_0x727af6,_0x50bee0)),SceneManager['exit']());}if(_0x2b7d42[_0x428972(0x127)](/\[Tier[ ](\d+)\]/i)){if(_0x428972(0x1c9)==='ppvpB'){const _0x5ccba9=Number(RegExp['$1']);if(_0x5ccba9<tier){if(_0x428972(0x1f1)!==_0x428972(0x1f1)){if(!this[_0x428972(0x12e)])return![];if(this['currentSymbol']()!=='attack')return![];if(this[_0x428972(0x12e)]['weaponSwapTypes']()[_0x428972(0x1a4)]<=0x1)return![];return this[_0x428972(0x12e)][_0x428972(0x1c2)]()[_0x428972(0x1a4)]>0x1;}else alert(_0x428972(0x155)[_0x428972(0x161)](_0x727af6,_0x5ccba9,tier)),SceneManager['exit']();}else tier=Math[_0x428972(0x1ec)](_0x5ccba9,tier);}else this['subject']()['applyWeaponSwapAction'](this['item']());}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x4c1cf2[_0x428972(0x187)]);})(pluginData),VisuMZ['WeaponSwapSystem'][_0x21d659(0x13b)]={'RequireAnyWpn':/<(?:REQUIRE|REQUIRES) ANY (?:WEAPON|WEAPONS)>/i,'SwitchWpnTypeNum':/<(?:SWITCH|SWITCHES) TO (?:WEAPON|WEAPON TYPE|WTYPE):[ ](\d+)>/i,'SwitchWpnTypeStr':/<(?:SWITCH|SWITCHES) TO (?:WEAPON|WEAPON TYPE|WTYPE):[ ](\d+)>/i},DataManager[_0x21d659(0x205)]=function(){const _0x4c8533=_0x21d659;if(this['_firstOfEachWeaponType'])return this['_firstOfEachWeaponType'];this[_0x4c8533(0x11c)]=[];for(let _0x318b75=0x1;_0x318b75<$dataSystem[_0x4c8533(0x16c)][_0x4c8533(0x1a4)];_0x318b75++){const _0x46e591=$dataWeapons['filter'](_0x7397dc=>_0x7397dc&&_0x7397dc[_0x4c8533(0x18b)]===_0x318b75),_0x367726=_0x46e591[0x0]||null;!_0x367726&&console['log'](_0x4c8533(0x1f6)[_0x4c8533(0x161)]($dataSystem[_0x4c8533(0x16c)][_0x318b75]['replace'](/\\I\[(\d+)\]/gi,''))),this[_0x4c8533(0x11c)][_0x4c8533(0x10e)](_0x367726);}return this['_firstOfEachWeaponType'][_0x4c8533(0x170)](null)[_0x4c8533(0x170)](undefined),this[_0x4c8533(0x11c)];},DataManager[_0x21d659(0x148)]=function(_0x2b2093){const _0x1b5c41=_0x21d659;_0x2b2093=_0x2b2093[_0x1b5c41(0x1c6)]()['trim'](),this[_0x1b5c41(0x159)]=this['_wtypeIDs']||{};if(this[_0x1b5c41(0x159)][_0x2b2093])return this['_wtypeIDs'][_0x2b2093];for(let _0x24179=0x1;_0x24179<0x64;_0x24179++){if(!$dataSystem[_0x1b5c41(0x16c)][_0x24179])continue;let _0x441f67=$dataSystem[_0x1b5c41(0x16c)][_0x24179][_0x1b5c41(0x1c6)]()[_0x1b5c41(0x1c8)]();_0x441f67=_0x441f67['replace'](/\x1I\[(\d+)\]/gi,''),_0x441f67=_0x441f67['replace'](/\\I\[(\d+)\]/gi,''),this['_wtypeIDs'][_0x441f67]=_0x24179;}return this['_wtypeIDs']['BARE\x20HANDS']=0x0,this[_0x1b5c41(0x159)][_0x2b2093]||0x0;},ImageManager['swapWeaponIcon']=VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x1e1)]['UI'][_0x21d659(0x105)],TextManager[_0x21d659(0x139)]=VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x1e1)]['UI'][_0x21d659(0x132)],TextManager[_0x21d659(0x14a)]=VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x1e1)]['UI'][_0x21d659(0x12a)]??_0x21d659(0x1ca),VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x169)]=Game_Action[_0x21d659(0x15b)][_0x21d659(0x142)],Game_Action[_0x21d659(0x15b)][_0x21d659(0x142)]=function(){const _0x43c8ae=_0x21d659;VisuMZ[_0x43c8ae(0x1d6)][_0x43c8ae(0x169)][_0x43c8ae(0x113)](this),this[_0x43c8ae(0x122)]()&&this['subject']()[_0x43c8ae(0x204)]()&&this[_0x43c8ae(0x1ff)]()&&this[_0x43c8ae(0x122)]()['applyWeaponSwapAction'](this['item']());},VisuMZ['WeaponSwapSystem'][_0x21d659(0x1e5)]=Game_BattlerBase[_0x21d659(0x15b)][_0x21d659(0x195)],Game_BattlerBase[_0x21d659(0x15b)][_0x21d659(0x195)]=function(_0x950f32){const _0x1d474c=_0x21d659;return VisuMZ[_0x1d474c(0x1d6)][_0x1d474c(0x1e5)]['call'](this,_0x950f32)&&this[_0x1d474c(0x20b)](_0x950f32);},Game_BattlerBase[_0x21d659(0x15b)]['meetsAnyWeaponEquippedCondition']=function(_0x3de284){return!![];},VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x19e)]=Game_Battler[_0x21d659(0x15b)][_0x21d659(0x201)],Game_Battler['prototype']['requestMotionRefresh']=function(){const _0x1387e0=_0x21d659;if(this[_0x1387e0(0x154)]()&&this[_0x1387e0(0x1bb)]){if('kpWRk'===_0x1387e0(0x1a2)){if(this[_0x1387e0(0x154)]()&&this[_0x1387e0(0x1bb)])return;else _0x2bc69d[_0x1387e0(0x1d6)][_0x1387e0(0x19e)][_0x1387e0(0x113)](this);}else return;}else VisuMZ[_0x1387e0(0x1d6)][_0x1387e0(0x19e)][_0x1387e0(0x113)](this);},Game_Actor[_0x21d659(0x17f)]=VisuMZ[_0x21d659(0x1d6)]['Settings'][_0x21d659(0x1db)]['BattleTestAllWeapons'],VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x14f)]=Game_Actor[_0x21d659(0x15b)][_0x21d659(0xfb)],Game_Actor[_0x21d659(0x15b)][_0x21d659(0xfb)]=function(_0x58d501){const _0x2b0e1b=_0x21d659;VisuMZ[_0x2b0e1b(0x1d6)][_0x2b0e1b(0x14f)][_0x2b0e1b(0x113)](this,_0x58d501),this[_0x2b0e1b(0x1e2)]();},Game_Actor['prototype'][_0x21d659(0x1e2)]=function(){const _0x18a6bd=_0x21d659;this[_0x18a6bd(0x1b3)]={};for(let _0x36fe36=0x1;_0x36fe36<$dataSystem['weaponTypes'][_0x18a6bd(0x1a4)];_0x36fe36++){this['_swapWeapons'][_0x36fe36]=0x0;}this[_0x18a6bd(0x1a0)]=0x0;for(const _0xd4528 of this['weapons']()){if(!_0xd4528)continue;const _0x252c57=_0xd4528[_0x18a6bd(0x18b)];this[_0x18a6bd(0x1b3)][_0x252c57]=_0xd4528['id'],this['_currentWeaponType']=this['_currentWeaponType']||_0x252c57;}},Game_Actor[_0x21d659(0x15b)][_0x21d659(0x199)]=function(){return this['equipSlots']()['includes'](0x1);},VisuMZ[_0x21d659(0x1d6)]['Game_Actor_isDualWield']=Game_Actor[_0x21d659(0x15b)]['isDualWield'],Game_Actor[_0x21d659(0x15b)]['isDualWield']=function(){return![];},VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x11e)]=Game_Actor[_0x21d659(0x15b)][_0x21d659(0x135)],Game_Actor[_0x21d659(0x15b)][_0x21d659(0x135)]=function(){const _0xadf922=_0x21d659;let _0x5105cc=VisuMZ[_0xadf922(0x1d6)][_0xadf922(0x11e)][_0xadf922(0x113)](this);return _0x5105cc[_0xadf922(0x157)](0x1)&&(_0xadf922(0x1b8)===_0xadf922(0x1e6)?this[_0xadf922(0x1fc)]=_0x3148d8+0x1:(_0x5105cc[_0xadf922(0x170)](0x1),_0x5105cc[_0xadf922(0x1ed)](0x1))),_0x5105cc;},Game_Actor[_0x21d659(0x15b)]['weaponSwapTypes']=function(){const _0x27044e=_0x21d659;let _0x1683cb='weaponSwapTypes';if(this['checkCacheKey'](_0x1683cb))return this[_0x27044e(0x1cd)][_0x1683cb];return this[_0x27044e(0x1cd)][_0x1683cb]=this[_0x27044e(0x1ee)](),this['_cache'][_0x1683cb];},Game_Actor[_0x21d659(0x15b)]['createWeaponSwapTypes']=function(){const _0x20b6a3=_0x21d659,_0x469e9a=[],_0x5808ad=$dataSystem['weaponTypes'][_0x20b6a3(0x1a4)];for(let _0x726952=0x1;_0x726952<_0x5808ad;_0x726952++){if('taBaa'!=='taBaa'){if(this[_0x20b6a3(0x151)]()[_0x20b6a3(0x1a4)]>0x0)return;const _0x7660dd=this['getAllEquippedSwapWeapons'](),_0x588244=_0x7660dd[0x0]||null,_0x2858aa=_0x588244?_0x588244['wtypeId']:0x0;this[_0x20b6a3(0x143)](_0x2858aa);}else{if(this[_0x20b6a3(0x165)](_0x726952))_0x469e9a['push'](_0x726952);}}return _0x469e9a;},Game_Actor['prototype'][_0x21d659(0x149)]=function(_0x69a17){const _0x149277=_0x21d659;if(this[_0x149277(0x1b3)]===undefined){if('YBrcr'!==_0x149277(0x1f0))return _0x2b6261[_0x149277(0x1d6)][_0x149277(0x1e5)][_0x149277(0x113)](this,_0x2c4ddf)&&this[_0x149277(0x20b)](_0x4b8350);else this[_0x149277(0x1e2)]();}return this['_swapWeapons'][_0x69a17]=this[_0x149277(0x1b3)][_0x69a17]||0x0,$dataWeapons[this['_swapWeapons'][_0x69a17]]||null;},Game_Actor[_0x21d659(0x15b)][_0x21d659(0x1c2)]=function(){const _0x3429e8=_0x21d659;return this[_0x3429e8(0x1cf)]()['map'](_0x156f4e=>this[_0x3429e8(0x149)](_0x156f4e))[_0x3429e8(0x170)](null)[_0x3429e8(0x170)](undefined);},Game_Actor[_0x21d659(0x15b)][_0x21d659(0x18c)]=function(_0x4dfcc1,_0xacca4b){const _0x3d66db=_0x21d659;this['_swapWeapons']===undefined&&this['initWeaponSwapSystem'](),this[_0x3d66db(0x1b3)][_0x4dfcc1]=_0xacca4b,this['refresh']();},Game_Actor[_0x21d659(0x15b)][_0x21d659(0x1e4)]=function(){const _0x2582a1=_0x21d659;this[_0x2582a1(0x1b3)]===undefined&&this[_0x2582a1(0x1e2)]();const _0x1ee569=this[_0x2582a1(0x1a0)],_0x180b71=this['weaponSwapTypes']();let _0x3aa997=_0x180b71[_0x2582a1(0x106)](this[_0x2582a1(0x1a0)]);for(;;){_0x3aa997++;if(_0x3aa997>=_0x180b71[_0x2582a1(0x1a4)])_0x3aa997=0x0;if(this[_0x2582a1(0x149)](_0x180b71[_0x3aa997]))break;}const _0x4dcc1f=_0x180b71[_0x3aa997];this[_0x2582a1(0x143)](_0x4dcc1f),_0x4dcc1f!==_0x1ee569&&(_0x2582a1(0x140)==='YLPvC'?this[_0x2582a1(0x18c)](_0x1707cd,_0x4ce74f['id']):this['onWeaponSwap'](!![]));},Game_Actor[_0x21d659(0x15b)][_0x21d659(0x16b)]=function(){const _0x5ce7a1=_0x21d659;this[_0x5ce7a1(0x1b3)]===undefined&&this[_0x5ce7a1(0x1e2)]();const _0x4d5879=this[_0x5ce7a1(0x1a0)],_0x4b2937=this[_0x5ce7a1(0x1cf)]();let _0x6d0c87=_0x4b2937[_0x5ce7a1(0x106)](this[_0x5ce7a1(0x1a0)]);for(;;){if(_0x5ce7a1(0x191)===_0x5ce7a1(0x191)){_0x6d0c87--;if(_0x6d0c87<0x0)_0x6d0c87=_0x4b2937[_0x5ce7a1(0x1a4)]-0x1;if(this[_0x5ce7a1(0x149)](_0x4b2937[_0x6d0c87]))break;}else _0x2cf81e=_0x1d8ad5['weaponTypes']['length']-0x2;}const _0x254643=_0x4b2937[_0x6d0c87];this[_0x5ce7a1(0x143)](_0x254643),_0x254643!==_0x4d5879&&(_0x5ce7a1(0x1b6)===_0x5ce7a1(0x1b6)?this[_0x5ce7a1(0x100)](!![]):(_0x548999[_0x5ce7a1(0x1d6)]['Window_ActorCommand_setup'][_0x5ce7a1(0x113)](this,_0x30c3f5),this[_0x5ce7a1(0x112)]&&(this[_0x5ce7a1(0x112)]['x']=this[_0x5ce7a1(0x1b2)])));},Game_Actor['prototype'][_0x21d659(0x100)]=function(_0x50c6c2){const _0x3e590d=_0x21d659,_0x2baca7=this[_0x3e590d(0x151)]()[0x0];_0x2baca7&&_0x50c6c2&&(this[_0x3e590d(0x1bb)]=!![],this['performAttack']());},Game_Actor[_0x21d659(0x15b)][_0x21d659(0x143)]=function(_0x13bfd1){const _0x391909=_0x21d659;this['_swapWeapons']===undefined&&this[_0x391909(0x1e2)]();_0x13bfd1=_0x13bfd1||0x0;if(!this[_0x391909(0x199)]())return;if(!this[_0x391909(0x165)](_0x13bfd1))return;this[_0x391909(0x1a0)]=_0x13bfd1,this[_0x391909(0x1b3)][_0x13bfd1]=this[_0x391909(0x1b3)][_0x13bfd1]||0x0;const _0x4ce01a=$dataWeapons[this[_0x391909(0x1b3)][_0x13bfd1]]||null;this['_equips'][0x0][_0x391909(0x136)](_0x4ce01a),this['_cache']={};},VisuMZ[_0x21d659(0x1d6)]['Game_Actor_changeEquip']=Game_Actor[_0x21d659(0x15b)][_0x21d659(0x1d1)],Game_Actor[_0x21d659(0x15b)][_0x21d659(0x1d1)]=function(_0x31960a,_0x4dfe9a){const _0x21e351=_0x21d659;if(DataManager['isWeapon'](_0x4dfe9a)||_0x31960a===0x0&&this[_0x21e351(0x199)]()){if(_0x21e351(0x11f)===_0x21e351(0x1fe)){const _0x538e32=_0x3e06c6['requiredWtypeId1'],_0x11486a=_0x583896['requiredWtypeId2'];if(_0x538e32===0x0&&_0x11486a===0x0)return!![];if(_0x538e32>0x0&&!this[_0x21e351(0x149)](_0x538e32))return![];if(_0x11486a>0x0&&!this[_0x21e351(0x149)](_0x11486a))return![];return!![];}else this[_0x21e351(0x108)](_0x4dfe9a);}else{if('COodp'===_0x21e351(0x1d8))return!this['nonRemovableEtypes']()[_0x21e351(0x157)](this[_0x21e351(0x17e)]());else VisuMZ['WeaponSwapSystem'][_0x21e351(0x153)]['call'](this,_0x31960a,_0x4dfe9a);}},Game_Actor['prototype'][_0x21d659(0x108)]=function(_0x56328b){const _0x216455=_0x21d659;if(!!_0x56328b){if(_0x216455(0x1c0)!==_0x216455(0x146)){const _0x572433=_0x56328b['wtypeId'];this['switchToWeaponType'](_0x572433);const _0x4ac940=this['weapons']()[0x0];!!_0x4ac940?_0x216455(0x104)===_0x216455(0x104)?this['tradeItemWithParty'](_0x56328b,_0x4ac940):this['_swapWeapons'][_0x19d610]=0x0:this[_0x216455(0x11d)](_0x56328b,null),this['setSwapWeapon'](_0x572433,_0x56328b['id']),this[_0x216455(0x143)](_0x572433);}else{const _0x460c42=_0x4c45ac[_0x216455(0x19b)]();_0x460c42[_0x216455(0x1e4)](),this[_0x216455(0x1a6)][_0x216455(0x20a)](),this[_0x216455(0x1a6)][_0x216455(0x160)]();}}else{if(!!this[_0x216455(0x151)]()[0x0]){const _0x23130d=this['weapons']()[0x0],_0x4aab53=_0x23130d[_0x216455(0x18b)];this[_0x216455(0x143)](_0x4aab53),this[_0x216455(0x11d)](null,_0x23130d),this[_0x216455(0x18c)](_0x4aab53,0x0),this[_0x216455(0x1d9)]();}}this[_0x216455(0x160)]();},Game_Actor['prototype'][_0x21d659(0x1d9)]=function(){const _0x340d3b=_0x21d659;if(this['weapons']()[_0x340d3b(0x1a4)]>0x0)return;const _0x3503ec=this[_0x340d3b(0x1c2)](),_0x4edb90=_0x3503ec[0x0]||null,_0x5cce2b=_0x4edb90?_0x4edb90[_0x340d3b(0x18b)]:0x0;this[_0x340d3b(0x143)](_0x5cce2b);},Game_Actor[_0x21d659(0x15b)][_0x21d659(0x1e9)]=function(_0x10f019){const _0x16649c=_0x21d659;if(this[_0x16649c(0x1f7)]||_0x10f019||this['_tempActor'])return;this[_0x16649c(0x1f7)]=!![];let _0xe38dc8=![];for(let _0xf58cbd=0x1;_0xf58cbd<$dataSystem[_0x16649c(0x16c)]['length'];_0xf58cbd++){if(this[_0x16649c(0x165)](_0xf58cbd))continue;const _0x61e1cc=this[_0x16649c(0x149)](_0xf58cbd);if(!_0x61e1cc)continue;this[_0x16649c(0x1b3)][_0xf58cbd]=0x0,$gameParty[_0x16649c(0x1b4)](_0x61e1cc,0x1),_0xe38dc8=!![];if(this[_0x16649c(0x186)][0x0][_0x16649c(0x16f)]()===_0x61e1cc){if(_0x16649c(0x11a)===_0x16649c(0x14b)){if(_0x21fca9===null)return!this[_0x16649c(0x1d7)]()[_0x16649c(0x157)](this[_0x16649c(0x17e)]());else return this[_0x16649c(0x15c)]===0x0&&this[_0x16649c(0x1fc)]!==0x0?_0x2f3ecc[_0x16649c(0x18b)]===this['_wtypeID']:_0x2a3fb9[_0x16649c(0x1d6)]['Window_EquipItem_includes'][_0x16649c(0x113)](this,_0x3523ff);}else this[_0x16649c(0x186)][0x0][_0x16649c(0x136)](null);}}if(_0xe38dc8){const _0x3aaf1f=this['weapons']()[0x0]||null;this[_0x16649c(0x1a0)]=_0x3aaf1f?_0x3aaf1f[_0x16649c(0x18b)]:0x0,this[_0x16649c(0x160)]();}this[_0x16649c(0x1f7)]=undefined;},VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x1cc)]=Game_Actor[_0x21d659(0x15b)][_0x21d659(0x118)],Game_Actor[_0x21d659(0x15b)][_0x21d659(0x118)]=function(_0x46a782){const _0xa4eba8=_0x21d659;this[_0xa4eba8(0x1e9)](_0x46a782),VisuMZ[_0xa4eba8(0x1d6)][_0xa4eba8(0x1cc)]['call'](this,_0x46a782);},Game_Actor[_0x21d659(0x15b)][_0x21d659(0x196)]=function(){const _0x3576f2=_0x21d659,_0x2a8570=this[_0x3576f2(0x1a0)],_0x3863f9=DataManager[_0x3576f2(0x205)]();for(const _0x39dd96 of this[_0x3576f2(0x1cf)]()){if(this[_0x3576f2(0x149)](_0x39dd96))continue;const _0xd9a312=_0x3863f9[_0x39dd96-0x1];_0xd9a312&&this['setSwapWeapon'](_0x39dd96,_0xd9a312['id']);}this['switchToWeaponType'](_0x2a8570);},Game_Actor[_0x21d659(0x15b)]['meetsAnyWeaponEquippedCondition']=function(_0x9c1958){const _0x209b83=_0x21d659;return _0x9c1958&&_0x9c1958['note'][_0x209b83(0x127)](VisuMZ[_0x209b83(0x1d6)][_0x209b83(0x13b)]['RequireAnyWpn'])?!!this['weapons']()[0x0]:!![];},Game_Actor['prototype'][_0x21d659(0x1b7)]=function(_0x21c5c6){const _0x1fd288=_0x21d659,_0x1bb9f6=_0x21c5c6[_0x1fd288(0x17a)],_0x506917=_0x21c5c6['requiredWtypeId2'];if(_0x1bb9f6===0x0&&_0x506917===0x0)return!![];if(_0x1bb9f6>0x0&&!this[_0x1fd288(0x149)](_0x1bb9f6))return![];if(_0x506917>0x0&&!this[_0x1fd288(0x149)](_0x506917))return![];return!![];},Game_Actor[_0x21d659(0x15b)]['applyWeaponSwapAction']=function(_0x2d15f6){const _0x3a98ea=_0x21d659;if(!DataManager[_0x3a98ea(0x1ff)](_0x2d15f6))return;const _0x19116a=VisuMZ[_0x3a98ea(0x1d6)][_0x3a98ea(0x13b)];if(_0x2d15f6[_0x3a98ea(0x10f)]['match'](_0x19116a[_0x3a98ea(0x184)])){this[_0x3a98ea(0x143)](Number(RegExp['$1']));return;}else{if(_0x2d15f6['note'][_0x3a98ea(0x127)](_0x19116a['SwitchWpnTypeStr'])){const _0x233a48=DataManager[_0x3a98ea(0x148)](RegExp['$1']);this['switchToWeaponType'](_0x233a48);return;}}if(this[_0x3a98ea(0x194)]===_0x2d15f6['requiredWtypeId1']||this[_0x3a98ea(0x194)]===_0x2d15f6['requiredWtypeId2']){if(_0x3a98ea(0x18d)!==_0x3a98ea(0x18a))return;else _0x3dd3ed=_0x4e3b6c[_0x3a98ea(0x16c)][_0x3a98ea(0x1a4)]-0x2;}if(_0x2d15f6[_0x3a98ea(0x17a)]>0x0)this[_0x3a98ea(0x143)](_0x2d15f6[_0x3a98ea(0x17a)]);else _0x2d15f6[_0x3a98ea(0x14c)]>0x0&&this[_0x3a98ea(0x143)](_0x2d15f6[_0x3a98ea(0x14c)]);},VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x10b)]=Game_Actor[_0x21d659(0x15b)]['optimizeEquipments'],Game_Actor['prototype'][_0x21d659(0x13a)]=function(){const _0xbeabdd=_0x21d659;VisuMZ['WeaponSwapSystem'][_0xbeabdd(0x10b)][_0xbeabdd(0x113)](this),this[_0xbeabdd(0x180)]();},VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x119)]=Game_Actor[_0x21d659(0x15b)][_0x21d659(0x203)],Game_Actor[_0x21d659(0x15b)][_0x21d659(0x203)]=function(_0x4453bb){const _0x1f7d1b=_0x21d659;if(this[_0x1f7d1b(0x199)]()&&_0x4453bb===0x0)return![];return VisuMZ[_0x1f7d1b(0x1d6)][_0x1f7d1b(0x119)]['call'](this,_0x4453bb);},Game_Actor[_0x21d659(0x15b)][_0x21d659(0x180)]=function(){const _0x109daf=_0x21d659;if(!this[_0x109daf(0x199)]())return;if(!VisuMZ['WeaponSwapSystem']['Game_Actor_isOptimizeEquipOk'][_0x109daf(0x113)](this,0x0))return;const _0x24f88c=this[_0x109daf(0x1a0)];for(const _0x5ce813 of this['weaponSwapTypes']()){this['switchToWeaponType'](_0x5ce813),this['changeWeapon'](this[_0x109daf(0x166)](_0x5ce813));}this[_0x109daf(0x143)](_0x24f88c),this[_0x109daf(0x160)]();},Game_Actor[_0x21d659(0x15b)][_0x21d659(0x166)]=function(_0x140b88){const _0x27bebd=_0x21d659,_0x114096=$gameParty[_0x27bebd(0x151)]()[_0x27bebd(0x133)](_0x148d39=>_0x148d39[_0x27bebd(0x18b)]===_0x140b88);let _0x496898=null,_0x5023ed=-0x3e8;for(let _0x929d16=0x0;_0x929d16<_0x114096['length'];_0x929d16++){const _0x11940f=this['calcEquipItemPerformance'](_0x114096[_0x929d16]);_0x11940f>_0x5023ed&&(_0x5023ed=_0x11940f,_0x496898=_0x114096[_0x929d16]);}return _0x496898;},VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x17c)]=Game_Actor[_0x21d659(0x15b)]['clearEquipments'],Game_Actor[_0x21d659(0x15b)][_0x21d659(0x12c)]=function(){const _0x129c0e=_0x21d659;VisuMZ[_0x129c0e(0x1d6)]['Game_Actor_clearEquipments'][_0x129c0e(0x113)](this),this[_0x129c0e(0xfa)]();},VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x150)]=Game_Actor[_0x21d659(0x15b)][_0x21d659(0x116)],Game_Actor[_0x21d659(0x15b)][_0x21d659(0x116)]=function(_0x44d5fb){const _0x4d7676=_0x21d659;if(this[_0x4d7676(0x199)]()&&_0x44d5fb===0x0)return![];return VisuMZ['WeaponSwapSystem'][_0x4d7676(0x150)][_0x4d7676(0x113)](this,_0x44d5fb);},Game_Actor[_0x21d659(0x15b)][_0x21d659(0xfa)]=function(){const _0x3e206c=_0x21d659;if(!this[_0x3e206c(0x199)]())return;if(!VisuMZ[_0x3e206c(0x1d6)][_0x3e206c(0x150)][_0x3e206c(0x113)](this,0x0))return;for(let _0x5ae35d=0x1;_0x5ae35d<$dataSystem[_0x3e206c(0x16c)][_0x3e206c(0x1a4)];_0x5ae35d++){this[_0x3e206c(0x143)](_0x5ae35d),this[_0x3e206c(0x108)](null);}this[_0x3e206c(0x160)]();},VisuMZ['WeaponSwapSystem']['Game_Party_setupBattleTestMembers']=Game_Party[_0x21d659(0x15b)]['setupBattleTestMembers'],Game_Party[_0x21d659(0x15b)]['setupBattleTestMembers']=function(){const _0x17620e=_0x21d659;VisuMZ[_0x17620e(0x1d6)][_0x17620e(0x120)]['call'](this);for(const _0x47c0ce of this[_0x17620e(0x173)]()){if(!_0x47c0ce)continue;_0x47c0ce[_0x17620e(0x196)]();}this['_inBattle']=!![];},Scene_Equip[_0x21d659(0x15b)][_0x21d659(0xfe)]=function(){const _0x31cd9f=_0x21d659,_0x3300b2=this[_0x31cd9f(0x19b)](),_0x409222=this[_0x31cd9f(0x10a)][_0x31cd9f(0x15c)],_0x485e05=this['_itemWindow']['item']();_0x3300b2['changeEquip'](_0x409222,_0x485e05);},VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x131)]=Scene_Battle[_0x21d659(0x15b)][_0x21d659(0x190)],Scene_Battle['prototype'][_0x21d659(0x190)]=function(){const _0x5318eb=_0x21d659;VisuMZ[_0x5318eb(0x1d6)]['Scene_Battle_createActorCommandWindow'][_0x5318eb(0x113)](this);const _0x5471c4=this[_0x5318eb(0x1a6)];_0x5471c4['setHandler']('weaponSwap',this[_0x5318eb(0x208)]['bind'](this));},Scene_Battle[_0x21d659(0x15b)]['commandWeaponSwap']=function(){const _0x2c1136=_0x21d659,_0x353da7=BattleManager[_0x2c1136(0x19b)]();_0x353da7[_0x2c1136(0x1e4)](),this['_actorCommandWindow']['activate'](),this[_0x2c1136(0x1a6)][_0x2c1136(0x160)]();},VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x134)]=Sprite_Actor[_0x21d659(0x15b)][_0x21d659(0x10d)],Sprite_Actor[_0x21d659(0x15b)][_0x21d659(0x10d)]=function(){const _0x222821=_0x21d659;if(this[_0x222821(0x12e)]&&this[_0x222821(0x12e)]['_swappingWeapon']){if(_0x222821(0x14d)==='uWhgS')return!![];else this[_0x222821(0x12e)][_0x222821(0x1bb)]=undefined;}VisuMZ[_0x222821(0x1d6)][_0x222821(0x134)][_0x222821(0x113)](this);},VisuMZ['WeaponSwapSystem']['Window_Base_playOkSound']=Window_Base['prototype'][_0x21d659(0x1fb)],Window_Base[_0x21d659(0x15b)]['playOkSound']=function(){const _0x1aff04=_0x21d659;if(this[_0x1aff04(0x1a5)][_0x1aff04(0x1de)]==='Window_ActorCommand'&&this[_0x1aff04(0x185)]()===_0x1aff04(0x1cb)){if(_0x1aff04(0x167)===_0x1aff04(0x167))SoundManager[_0x1aff04(0x17b)]();else{const _0x1a2c0e=_0x42d992(_0x541708['$1']);_0x1a2c0e<_0x298bc2?(_0x3d038f('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x1aff04(0x161)](_0x5d3515,_0x1a2c0e,_0x44ed83)),_0x4c759b['exit']()):_0x12761e=_0x2e068b['max'](_0x1a2c0e,_0x10340c);}}else _0x1aff04(0x179)!=='cZILJ'?_0x2b2120=_0x2d6d4a+0x1:VisuMZ['WeaponSwapSystem'][_0x1aff04(0x15f)][_0x1aff04(0x113)](this);},VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x168)]=Window_StatusBase[_0x21d659(0x15b)]['actorSlotName'],Window_StatusBase[_0x21d659(0x15b)]['actorSlotName']=function(_0x54151c,_0x27b894){const _0x35d7b5=_0x21d659;return _0x54151c&&_0x54151c['canWeaponSwap']()?this[_0x35d7b5(0x200)](_0x54151c,_0x27b894):VisuMZ[_0x35d7b5(0x1d6)]['Window_StatusBase_actorSlotName'][_0x35d7b5(0x113)](this,_0x54151c,_0x27b894);},Window_StatusBase['prototype'][_0x21d659(0x200)]=function(_0xede746,_0x5d0f4b){const _0x40dc69=_0x21d659;let _0x30098d=_0xede746[_0x40dc69(0x1cf)]()[_0x40dc69(0x1a4)]-0x1;if(Window_EquipSlot['WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS']){if('MSzna'!=='MSzna')return _0x413287['WeaponSwapSystem']['Window_EquipSlot_itemAt']['call'](this,_0x2af8f1);else _0x30098d=$dataSystem[_0x40dc69(0x16c)][_0x40dc69(0x1a4)]-0x2;}if(_0x5d0f4b>_0x30098d)return _0x5d0f4b-=_0x30098d,VisuMZ[_0x40dc69(0x1d6)][_0x40dc69(0x168)][_0x40dc69(0x113)](this,_0xede746,_0x5d0f4b);else{let _0x162110='';if(Window_EquipSlot[_0x40dc69(0x175)])_0x162110=$dataSystem['weaponTypes'][_0x5d0f4b+0x1]||'';else{const _0xd4710d=_0xede746[_0x40dc69(0x1cf)]()[_0x5d0f4b];_0x162110=$dataSystem['weaponTypes'][_0xd4710d]||'';}return _0x162110=_0x162110['replace'](/\\I\[(\d+)\]/gi,''),_0x162110;}},Window_EquipSlot[_0x21d659(0x175)]=VisuMZ[_0x21d659(0x1d6)]['Settings']['UI']['ShowUnequippable'],VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x162)]=Window_EquipSlot['prototype']['maxItems'],Window_EquipSlot['prototype'][_0x21d659(0x16d)]=function(){const _0x4293b0=_0x21d659;return this[_0x4293b0(0x12e)]&&this[_0x4293b0(0x12e)][_0x4293b0(0x199)]()?this[_0x4293b0(0x163)]():VisuMZ[_0x4293b0(0x1d6)][_0x4293b0(0x162)][_0x4293b0(0x113)](this);},Window_EquipSlot['prototype'][_0x21d659(0x163)]=function(){const _0x2114c2=_0x21d659;let _0x4d84fb=this[_0x2114c2(0x12e)][_0x2114c2(0x135)]()['length']-0x1;return Window_EquipSlot['WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS']?_0x2114c2(0x115)!==_0x2114c2(0x115)?this['_weaponSwapShortcutSprite_Right']['x']=this[_0x2114c2(0x1b2)]:_0x4d84fb+=$dataSystem[_0x2114c2(0x16c)][_0x2114c2(0x1a4)]-0x1:_0x4d84fb+=this[_0x2114c2(0x12e)][_0x2114c2(0x1cf)]()['length'],_0x4d84fb;},VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x12b)]=Window_EquipSlot[_0x21d659(0x15b)][_0x21d659(0x171)],Window_EquipSlot[_0x21d659(0x15b)][_0x21d659(0x171)]=function(_0x43d917){const _0x373d27=_0x21d659;return this[_0x373d27(0x12e)]&&this[_0x373d27(0x12e)][_0x373d27(0x199)]()?_0x373d27(0x206)!=='ivIMX'?this[_0x373d27(0x141)](_0x43d917):_0x275f15[_0x373d27(0x1d6)][_0x373d27(0x197)]['call'](this,_0x15cfb7):VisuMZ[_0x373d27(0x1d6)][_0x373d27(0x12b)]['call'](this,_0x43d917);},Window_EquipSlot[_0x21d659(0x15b)][_0x21d659(0x141)]=function(_0x3f235d){const _0x295d81=_0x21d659;let _0x48d7d6=this[_0x295d81(0x12e)]['weaponSwapTypes']()[_0x295d81(0x1a4)]-0x1;Window_EquipSlot['WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS']&&(_0x48d7d6=$dataSystem[_0x295d81(0x16c)][_0x295d81(0x1a4)]-0x2);if(_0x3f235d>_0x48d7d6){if(_0x295d81(0x11b)!=='ewyCp')this[_0x295d81(0x138)](!![]);else return _0x3f235d-=_0x48d7d6,VisuMZ[_0x295d81(0x1d6)][_0x295d81(0x12b)][_0x295d81(0x113)](this,_0x3f235d);}else{let _0x304d45=this['_actor']['weaponSwapTypes']()[_0x3f235d];return Window_EquipSlot[_0x295d81(0x175)]&&(_0x304d45=_0x3f235d+0x1),this['_actor'][_0x295d81(0x149)](_0x304d45);}},VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x1d2)]=Window_EquipSlot[_0x21d659(0x15b)][_0x21d659(0x1b5)],Window_EquipSlot[_0x21d659(0x15b)][_0x21d659(0x1b5)]=function(_0x1110b8){const _0xf73102=_0x21d659;if(this[_0xf73102(0x12e)]&&this[_0xf73102(0x12e)]['canWeaponSwap']())return this[_0xf73102(0x1f2)](_0x1110b8);else{if(_0xf73102(0x15a)!=='sElAg')this[_0xf73102(0x11d)](_0x72f7b7,_0x153c81);else return VisuMZ[_0xf73102(0x1d6)][_0xf73102(0x1d2)]['call'](this,_0x1110b8);}},Window_EquipSlot[_0x21d659(0x15b)][_0x21d659(0x1f2)]=function(_0x2835d0){const _0x329b37=_0x21d659;let _0x5b0a3e=this['_actor'][_0x329b37(0x1cf)]()[_0x329b37(0x1a4)]-0x1;Window_EquipSlot['WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS']&&(_0x5b0a3e=$dataSystem[_0x329b37(0x16c)][_0x329b37(0x1a4)]-0x2);if(_0x2835d0>_0x5b0a3e)return _0x2835d0-=_0x5b0a3e,VisuMZ[_0x329b37(0x1d6)][_0x329b37(0x1d2)][_0x329b37(0x113)](this,_0x2835d0);else{if(!this[_0x329b37(0x12e)][_0x329b37(0x111)](0x0))return![];else{if(Window_EquipSlot[_0x329b37(0x175)]){if(_0x329b37(0x1a8)===_0x329b37(0x193))_0x39a2b0+=this['_actor'][_0x329b37(0x1cf)]()[_0x329b37(0x1a4)];else return this[_0x329b37(0x12e)][_0x329b37(0x1cf)]()[_0x329b37(0x157)](_0x2835d0+0x1);}else return!![];}}},Window_EquipSlot[_0x21d659(0x15b)][_0x21d659(0x1c1)]=function(){const _0x254463=_0x21d659;SoundManager['playEquip']();const _0x33b43f=SceneManager['_scene'][_0x254463(0x12e)];this[_0x254463(0x10a)][_0x254463(0x15c)]>0x0?_0x33b43f[_0x254463(0x1d1)](this['_itemWindow'][_0x254463(0x15c)],null):(_0x33b43f['switchToWeaponType'](this[_0x254463(0x10a)]['_wtypeID']),_0x33b43f[_0x254463(0x108)](null));this[_0x254463(0x160)](),this[_0x254463(0x10a)][_0x254463(0x160)](),this[_0x254463(0x18e)]();const _0x1e905b=SceneManager[_0x254463(0x1f9)]['_statusWindow'];if(_0x1e905b)_0x1e905b[_0x254463(0x160)]();},VisuMZ['WeaponSwapSystem'][_0x21d659(0x202)]=Window_EquipSlot[_0x21d659(0x15b)]['equipSlotIndex'],Window_EquipSlot[_0x21d659(0x15b)]['equipSlotIndex']=function(){const _0x4e9b03=_0x21d659;let _0x2fa7a2=VisuMZ['WeaponSwapSystem'][_0x4e9b03(0x202)],_0x137270=this[_0x4e9b03(0x12e)][_0x4e9b03(0x1cf)]()[_0x4e9b03(0x1a4)]-0x1;return Window_EquipSlot[_0x4e9b03(0x175)]&&(_0x4e9b03(0x177)!==_0x4e9b03(0x1eb)?_0x137270=$dataSystem[_0x4e9b03(0x16c)][_0x4e9b03(0x1a4)]-0x2:(this['_swapWeapons']===_0x4e4d9b&&this[_0x4e9b03(0x1e2)](),this[_0x4e9b03(0x1b3)][_0x51b199]=_0xba98a,this[_0x4e9b03(0x160)]())),Math[_0x4e9b03(0x1ec)](0x0,_0x2fa7a2-_0x137270);},VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x125)]=Window_EquipItem[_0x21d659(0x15b)][_0x21d659(0x1a1)],Window_EquipItem[_0x21d659(0x15b)][_0x21d659(0x1a1)]=function(_0x247c70){const _0x556382=_0x21d659;VisuMZ[_0x556382(0x1d6)]['Window_EquipItem_initialize'][_0x556382(0x113)](this,_0x247c70),this[_0x556382(0x1fc)]=0x0;},VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x197)]=Window_EquipItem[_0x21d659(0x15b)][_0x21d659(0x1aa)],Window_EquipItem[_0x21d659(0x15b)][_0x21d659(0x1aa)]=function(_0x48a197){const _0x19a32f=_0x21d659;if(!this[_0x19a32f(0x12e)])return VisuMZ[_0x19a32f(0x1d6)]['Window_EquipItem_setSlotId'][_0x19a32f(0x113)](this,_0x48a197);let _0x175866=this[_0x19a32f(0x12e)]['weaponSwapTypes']()['length']-0x1;Window_EquipSlot[_0x19a32f(0x175)]&&(_0x175866=$dataSystem[_0x19a32f(0x16c)][_0x19a32f(0x1a4)]-0x2),_0x48a197>_0x175866?(_0x48a197-=_0x175866,this[_0x19a32f(0x1fc)]=0x0,VisuMZ[_0x19a32f(0x1d6)][_0x19a32f(0x197)]['call'](this,_0x48a197)):_0x19a32f(0x1dd)!==_0x19a32f(0x1dd)?(_0x3803c8[_0x19a32f(0x15b)]['updateArrows'][_0x19a32f(0x113)](this),this[_0x19a32f(0x17d)]()):(Window_EquipSlot[_0x19a32f(0x175)]?this[_0x19a32f(0x1fc)]=_0x48a197+0x1:this[_0x19a32f(0x1fc)]=this[_0x19a32f(0x12e)][_0x19a32f(0x1cf)]()[_0x48a197],_0x48a197=0x0,VisuMZ[_0x19a32f(0x1d6)][_0x19a32f(0x197)][_0x19a32f(0x113)](this,_0x48a197),this[_0x19a32f(0x12e)]['switchToWeaponType'](this[_0x19a32f(0x1fc)]),this[_0x19a32f(0x1c3)]&&this[_0x19a32f(0x1c3)]['refresh']());},VisuMZ['WeaponSwapSystem']['Window_EquipItem_includes']=Window_EquipItem['prototype'][_0x21d659(0x157)],Window_EquipItem[_0x21d659(0x15b)][_0x21d659(0x157)]=function(_0x546278){const _0x5a2539=_0x21d659;if(_0x546278===null){if(_0x5a2539(0x137)===_0x5a2539(0x174))_0x3698bc(_0x5a2539(0x155)[_0x5a2539(0x161)](_0x4a2482,_0x58a392,_0x4e269a)),_0x5b9fda[_0x5a2539(0x1af)]();else return!this[_0x5a2539(0x1d7)]()[_0x5a2539(0x157)](this['etypeId']());}else{if(this[_0x5a2539(0x15c)]===0x0&&this[_0x5a2539(0x1fc)]!==0x0)return _0x546278[_0x5a2539(0x18b)]===this[_0x5a2539(0x1fc)];else{if(_0x5a2539(0x114)===_0x5a2539(0x114))return VisuMZ[_0x5a2539(0x1d6)][_0x5a2539(0x1f8)][_0x5a2539(0x113)](this,_0x546278);else this[_0x5a2539(0x143)](_0x3d8bf9[_0x5a2539(0x14c)]);}}},VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x19f)]=Window_EquipItem[_0x21d659(0x15b)][_0x21d659(0x1b5)],Window_EquipItem[_0x21d659(0x15b)][_0x21d659(0x1b5)]=function(_0x5b45f3){const _0x473c86=_0x21d659;if(!_0x5b45f3){if(_0x473c86(0x126)===_0x473c86(0x13e))this['tradeItemWithParty'](_0x599d3c,null);else return!this[_0x473c86(0x1d7)]()[_0x473c86(0x157)](this['etypeId']());}return VisuMZ[_0x473c86(0x1d6)][_0x473c86(0x19f)][_0x473c86(0x113)](this,_0x5b45f3);},Window_ActorCommand['WEAPON_SWAP_CHANGE_ATTACK_ICON']=VisuMZ['WeaponSwapSystem'][_0x21d659(0x1e1)]['UI'][_0x21d659(0x15d)],Window_ActorCommand[_0x21d659(0x19d)]=VisuMZ['WeaponSwapSystem'][_0x21d659(0x1e1)]['UI'][_0x21d659(0x1b1)],Window_ActorCommand['WEAPON_SWAP_SHORTCUT_ARROWS']=VisuMZ[_0x21d659(0x1d6)]['Settings']['UI'][_0x21d659(0x1ef)],Window_ActorCommand['WEAPON_SWAP_SHOW_COMMAND']=VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x1e1)]['UI'][_0x21d659(0x1a7)],VisuMZ[_0x21d659(0x1d6)][_0x21d659(0x189)]=Window_ActorCommand[_0x21d659(0x15b)][_0x21d659(0x1a1)],Window_ActorCommand[_0x21d659(0x15b)]['initialize']=function(_0x2ee9e8){const _0x5210e6=_0x21d659;VisuMZ[_0x5210e6(0x1d6)]['Window_ActorCommand_initialize']['call'](this,_0x2ee9e8),this[_0x5210e6(0x209)]();},VisuMZ['WeaponSwapSystem'][_0x21d659(0x158)]=Window_ActorCommand[_0x21d659(0x15b)][_0x21d659(0x15e)],Window_ActorCommand[_0x21d659(0x15b)][_0x21d659(0x15e)]=function(){const _0x5c3c24=_0x21d659;if(this[_0x5c3c24(0x12e)])this['_actor']['updateSwapToNextAvailableWeapon']();VisuMZ[_0x5c3c24(0x1d6)][_0x5c3c24(0x158)][_0x5c3c24(0x113)](this);if(!this[_0x5c3c24(0x12e)][_0x5c3c24(0x199)]())return;this['alterAttackCommand']();if(this[_0x5c3c24(0x124)](_0x5c3c24(0x1cb))>=0x0)return;this['addWeaponSwapCommand']();},Window_ActorCommand[_0x21d659(0x15b)][_0x21d659(0x183)]=function(){const _0x5ab723=_0x21d659,_0x1d01e2=$dataSkills[this['_actor'][_0x5ab723(0x121)]()];if(!_0x1d01e2)return;if(!this[_0x5ab723(0x1fd)](_0x1d01e2))return;if(!Window_ActorCommand[_0x5ab723(0xfd)])return;const _0x446141=this[_0x5ab723(0x12e)]['weapons']()[0x0];if(!_0x446141)return;const _0x373efe=this[_0x5ab723(0x130)](),_0x248469=DataManager['battleCommandName'](_0x1d01e2),_0x590ff6=_0x446141['iconIndex'],_0x5d8c2d=_0x373efe===_0x5ab723(0x117)?_0x248469:_0x5ab723(0x1ac)[_0x5ab723(0x161)](_0x590ff6,_0x248469),_0x3b03dd=this['findSymbol'](_0x5ab723(0x12f));if(_0x3b03dd>=0x0){if(_0x5ab723(0xfc)==='GmsgG'){const _0x3a3fba=this[_0x5ab723(0x1c4)][_0x3b03dd];_0x3a3fba['name']=_0x5d8c2d;}else return this[_0x5ab723(0x1cf)]()['map'](_0x1ae701=>this[_0x5ab723(0x149)](_0x1ae701))['remove'](null)[_0x5ab723(0x170)](_0x36f975);}},Window_ActorCommand[_0x21d659(0x15b)][_0x21d659(0x13d)]=function(_0x25368c){const _0x5dc2f4=_0x21d659;if(!Window_ActorCommand[_0x5dc2f4(0x129)]&&!_0x25368c)return;if(this[_0x5dc2f4(0x12e)][_0x5dc2f4(0x1cf)]()[_0x5dc2f4(0x1a4)]<=0x1)return;this[_0x5dc2f4(0x124)]('weaponSwap')>=0x0&&this['removeWeaponSwapCommand']();const _0x498fb4=this[_0x5dc2f4(0x130)](),_0x205ba1=TextManager[_0x5dc2f4(0x139)],_0x4399f2=ImageManager[_0x5dc2f4(0x1d5)],_0x164cd4=_0x498fb4==='text'?_0x205ba1:_0x5dc2f4(0x1ac)[_0x5dc2f4(0x161)](_0x4399f2,_0x205ba1);this[_0x5dc2f4(0x188)](_0x164cd4,_0x5dc2f4(0x1cb));},Window_ActorCommand['prototype'][_0x21d659(0x101)]=function(){const _0x89a24f=_0x21d659;while(this['findSymbol'](_0x89a24f(0x1cb))>=0x0){if('SJSOe'!==_0x89a24f(0x152))return _0x10b4d2['WEAPON_SWAP_SHORTCUT_ENABLE']&&this['currentSymbol']()===_0x89a24f(0x12f)&&this['_actor']&&this[_0x89a24f(0x12e)][_0x89a24f(0x199)]()&&this[_0x89a24f(0x12e)]['getAllEquippedSwapWeapons']()[_0x89a24f(0x1a4)]>0x1;else{const _0xfa9f43=this[_0x89a24f(0x124)](_0x89a24f(0x1cb));this[_0x89a24f(0x1c4)]['splice'](_0xfa9f43,0x1);}}},Window_ActorCommand[_0x21d659(0x15b)][_0x21d659(0x1b9)]=function(){const _0x563998=_0x21d659;return Window_ActorCommand[_0x563998(0x19d)]&&this[_0x563998(0x185)]()===_0x563998(0x12f)&&this[_0x563998(0x12e)]&&this[_0x563998(0x12e)]['canWeaponSwap']()&&this[_0x563998(0x12e)]['getAllEquippedSwapWeapons']()[_0x563998(0x1a4)]>0x1;},Window_ActorCommand[_0x21d659(0x15b)][_0x21d659(0x128)]=function(_0x50d302){const _0xd837a9=_0x21d659;if(this[_0xd837a9(0x1b9)]())this[_0xd837a9(0x138)](!![]);else{if(_0xd837a9(0x1e0)===_0xd837a9(0x1e0))Window_Command['prototype']['cursorRight'][_0xd837a9(0x113)](this,_0x50d302);else return this[_0xd837a9(0x200)](_0x478fef,_0x37a60e);}},Window_ActorCommand['prototype'][_0x21d659(0x13c)]=function(_0x25fbb3){const _0x38d3e2=_0x21d659;if(this[_0x38d3e2(0x1b9)]()){if(_0x38d3e2(0x1f3)!=='Nrgra')return this[_0x38d3e2(0x163)]();else this[_0x38d3e2(0x138)](![]);}else Window_Command[_0x38d3e2(0x15b)][_0x38d3e2(0x13c)][_0x38d3e2(0x113)](this,_0x25fbb3);},Window_ActorCommand['prototype'][_0x21d659(0x138)]=function(_0x1d8afa){const _0x1e3353=_0x21d659;if(_0x1d8afa){if(_0x1e3353(0x1c7)===_0x1e3353(0xff)){if(!this[_0x1e3353(0x199)]())return;if(!_0x94d97c[_0x1e3353(0x1d6)][_0x1e3353(0x150)][_0x1e3353(0x113)](this,0x0))return;for(let _0x9a5338=0x1;_0x9a5338<_0x5f9156[_0x1e3353(0x16c)]['length'];_0x9a5338++){this[_0x1e3353(0x143)](_0x9a5338),this[_0x1e3353(0x108)](null);}this['refresh']();}else this[_0x1e3353(0x12e)][_0x1e3353(0x1e4)]();}else _0x1e3353(0x1f4)===_0x1e3353(0x1f4)?this[_0x1e3353(0x12e)][_0x1e3353(0x16b)]():_0x225558=_0x22769f[_0x1e3353(0x16c)][_0x5c4e8e+0x1]||'';SoundManager[_0x1e3353(0x17b)](),this['refresh']();},Window_ActorCommand[_0x21d659(0x15b)][_0x21d659(0x209)]=function(){const _0x5ccc90=_0x21d659;if(!Window_ActorCommand['WEAPON_SWAP_SHORTCUT_ENABLE'])return;if(!Window_ActorCommand[_0x5ccc90(0x16a)])return;const _0x597ce2=[new Sprite(),new Sprite()];for(const _0xa596d7 of _0x597ce2){if(_0x5ccc90(0x198)===_0x5ccc90(0x198))this[_0x5ccc90(0x1da)](_0xa596d7),_0xa596d7[_0x5ccc90(0x102)]=0x0,_0xa596d7['anchor']['y']=0.5,_0xa596d7[_0x5ccc90(0x1d4)]=ImageManager[_0x5ccc90(0x107)](_0x5ccc90(0x192));else{const _0x38082d=this[_0x5ccc90(0x124)](_0x5ccc90(0x1cb));this[_0x5ccc90(0x1c4)][_0x5ccc90(0x1fa)](_0x38082d,0x1);}}_0x597ce2[0x0]['anchor']['x']=0x0,_0x597ce2[0x0]['setFrame'](0x78,0x24,0x18,0x18),_0x597ce2[0x0]['x']=0x0,this['_weaponSwapShortcutSprite_Left']=_0x597ce2[0x0],_0x597ce2[0x1]['anchor']['x']=0x1,_0x597ce2[0x1]['setFrame'](0x90,0x24,0x18,0x18),_0x597ce2[0x1]['x']=this['width'],this[_0x5ccc90(0x112)]=_0x597ce2[0x1];},Window_ActorCommand['prototype'][_0x21d659(0x1a3)]=function(){const _0x2ba0ce=_0x21d659;Window_Scrollable[_0x2ba0ce(0x15b)][_0x2ba0ce(0x1a3)][_0x2ba0ce(0x113)](this),this['updateWeaponSwapShortcutSprites']();},Window_ActorCommand[_0x21d659(0x15b)][_0x21d659(0x17d)]=function(){const _0x3c1614=_0x21d659;if(!Window_ActorCommand[_0x3c1614(0x19d)])return;if(!Window_ActorCommand[_0x3c1614(0x16a)])return;VisuMZ['WeaponSwapSystem'][_0x3c1614(0x181)][_0x3c1614(0x113)](this[_0x3c1614(0x176)]),VisuMZ['WeaponSwapSystem'][_0x3c1614(0x181)][_0x3c1614(0x113)](this['_weaponSwapShortcutSprite_Right']);},Window_ActorCommand[_0x21d659(0x15b)][_0x21d659(0x19c)]=function(){const _0x1f189a=_0x21d659;if(!this['_actor'])return![];if(this[_0x1f189a(0x185)]()!=='attack')return![];if(this[_0x1f189a(0x12e)]['weaponSwapTypes']()[_0x1f189a(0x1a4)]<=0x1)return![];return this[_0x1f189a(0x12e)][_0x1f189a(0x1c2)]()[_0x1f189a(0x1a4)]>0x1;},VisuMZ[_0x21d659(0x1d6)]['updateShortcutOpacity']=function(){const _0x5d5738=_0x21d659;if(!this['parent'][_0x5d5738(0x1df)]||this[_0x5d5738(0x1ce)][_0x5d5738(0x109)]<0xff||this[_0x5d5738(0x1ce)][_0x5d5738(0x178)]<0xff)this[_0x5d5738(0x102)]=0x0;else{if(this['parent'][_0x5d5738(0x19c)]()){if(_0x5d5738(0x156)==='zBLZp')return![];else{var _0x42c282=this[_0x5d5738(0x1ce)]['itemRect'](this['parent'][_0x5d5738(0x124)](_0x5d5738(0x12f))),_0x3cce71=_0x42c282['y']+this[_0x5d5738(0x1ce)][_0x5d5738(0x12d)];_0x3cce71>0x0&&_0x3cce71<this[_0x5d5738(0x1ce)]['height']-this[_0x5d5738(0x1ce)][_0x5d5738(0x12d)]*0x2&&(_0x3cce71+=Math['round'](this[_0x5d5738(0x1ce)][_0x5d5738(0x164)]()/0x2),this[_0x5d5738(0x102)]=0xff,this['y']=_0x3cce71);}}else this[_0x5d5738(0x102)]-=0x20;}},VisuMZ['WeaponSwapSystem'][_0x21d659(0x1ad)]=Window_ActorCommand[_0x21d659(0x15b)][_0x21d659(0x1ab)],Window_ActorCommand[_0x21d659(0x15b)][_0x21d659(0x1ab)]=function(_0x2fb00c){const _0x53030f=_0x21d659;VisuMZ['WeaponSwapSystem'][_0x53030f(0x1ad)][_0x53030f(0x113)](this,_0x2fb00c),this[_0x53030f(0x112)]&&(this[_0x53030f(0x112)]['x']=this[_0x53030f(0x1b2)]);},VisuMZ[_0x21d659(0x1d6)]['Settings']['Window_ActorCommand_updateHelp']=Window_ActorCommand[_0x21d659(0x15b)]['updateHelp'],Window_ActorCommand[_0x21d659(0x15b)][_0x21d659(0x1ae)]=function(){const _0x588d46=_0x21d659,_0x461d07=this[_0x588d46(0x185)]();switch(_0x461d07){case _0x588d46(0x1cb):this['_helpWindow'][_0x588d46(0x13f)](TextManager[_0x588d46(0x14a)]);break;default:VisuMZ[_0x588d46(0x1d6)][_0x588d46(0x1e1)][_0x588d46(0x1c5)][_0x588d46(0x113)](this);break;}};