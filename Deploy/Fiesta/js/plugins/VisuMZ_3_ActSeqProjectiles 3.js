//=============================================================================
// VisuStella MZ - Action Sequence Projectiles
// VisuMZ_3_ActSeqProjectiles.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_ActSeqProjectiles = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ActSeqProjectiles = VisuMZ.ActSeqProjectiles || {};
VisuMZ.ActSeqProjectiles.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.02] [ActSeqProjectiles]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Action_Sequence_Projectiles_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds projectile control the Battle Core's Action Sequences,
 * allowing you, the game dev, to create entities that fire from one screen
 * location to another screen location. These locations can be either battler
 * targets or exact points on the screen. Projectiles can come in the form of
 * pictures, icons, and animations. Make them spin, make them arc, make them
 * travel at differing speeds across the battlefield!
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create projectiles that can be fired across the battlefield.
 * * Projectiles can be pictures, icons, and/or animations.
 * * Action Sequences give you control over where they come from and where
 *   they go: targets and/or points.
 * * Extra settings that give you extra control over projectiles such as
 *   automatic angles, angle offsets, blend modes, trajectory easy, hues,
 *   scaling, and spin speed.
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
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Projectile Types
 * ============================================================================
 *
 * Projectiles come in three types: pictures, icons, and animations. Each have
 * their own properties, but ultimately, work very similar.
 *
 * ---
 *
 * Picture Projectiles
 * 
 * These projectiles use images found in the img/pictures/ folder of your game
 * project. Used as static images, they allow you to create projectiles of any
 * size and dimension to your liking. These offer the most flexibility when it
 * comes to options and extra settings.
 *
 * ---
 * 
 * Icon Projectiles
 * 
 * For those who want to save up on resources and utilize the already loaded
 * icon sheet, you can simply select an icon index to pick an icon as the
 * projectile's image. Like pictures, these offer the most flexibility when it
 * comes to options and extra settings.
 * 
 * ---
 * 
 * Animation Projectiles
 * 
 * Those who want a bit more spice in their projectiles and want something that
 * animates can picture animation projectiles. The animation will play through
 * its frames until it hits its end, after which, the animation restarts.
 * However, because animations are much more complicated than just a static
 * image, some options and extra settings are not available for animations.
 * 
 * ---
 *
 * ============================================================================
 * Action Sequence Plugin Commands
 * ============================================================================
 *
 * The following are Action Sequence Plugin Commands that have been added with
 * this plugin. These are accessible from the Battle Core plugin (not this one)
 * in order to keep all the Action Sequences in place.
 * 
 * Once again, these plugin commands are only accessible through the Battle
 * Core plugin and not this one! Make sure you have the most update to date
 * version of the Battle Core for them.
 * 
 * ---
 * 
 * === Action Sequences - Projectiles ===
 * 
 * Create projectiles on the screen and fire them off at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * ---
 *
 * PROJECTILE: Animation
 * - Create an animation projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Animation ID:
 *     - Determine which animation to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 *
 * PROJECTILE: Icon
 * - Create an icon projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Icon:
 *     - Determine which icon to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the projectile?
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Hue:
 *       - Adjust the hue of the projectile.
 *       - Insert a number between 0 and 360.
 *
 *       Scale:
 *       - Adjust the size scaling of the projectile.
 *       - Use decimals for exact control.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 *
 * PROJECTILE: Picture
 * - Create a picture projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Picture Filename:
 *     - Determine which picture to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the projectile?
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Hue:
 *       - Adjust the hue of the projectile.
 *       - Insert a number between 0 and 360.
 *
 *       Scale:
 *       - Adjust the size scaling of the projectile.
 *       - Use decimals for exact control.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Angle Adjustment Settings
 * ============================================================================
 *
 * These settings are primarily used to automatically adjust the angle of any
 * pictures, icon, and/or animation so that they work with the automatic
 * angling of the projectiles as to always appear aimed at the goal point.
 *
 * ---
 *
 * Angle Adjustments
 * 
 *   Animation Angle:
 *   - Adjust projectile angle for animations by this many degrees.
 * 
 *   Icon Angle:
 *   - Adjust projectile angle for icons by this many degrees.
 * 
 *   Picture Angle:
 *   - Adjust projectile angle for pictures by this many degrees.
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
 * Version 1.02: January 22, 2021
 * * Bug Fixes!
 * ** Projectile start locations and end locations now factor in a target's
 *    additional Y position from jumping and/or floating. Fix made by Irina.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Settings are no longer cached and are now independent for one another.
 *    Fix made by Yanfly.
 *
 * Version 1.00: January 13, 2021
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
 * @param ActSeqProjectiles
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param AngleAdjustments
 * @text Angle Adjustments
 *
 * @param AnimationAngleAdjust:num
 * @text Animation Angle
 * @parent AngleAdjustments
 * @desc Adjust projectile angle for animations by this many degrees.
 * @default 225
 *
 * @param IconAngleAdjust:num
 * @text Icon Angle
 * @parent AngleAdjustments
 * @desc Adjust projectile angle for icons by this many degrees.
 * @default 135
 *
 * @param PictureAngleAdjust:num
 * @text Picture Angle
 * @parent AngleAdjustments
 * @desc Adjust projectile angle for pictures by this many degrees.
 * @default 135
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
//=============================================================================

const _0x3796=['STRUCT','setupPictureFrame','toUpperCase','format','Icon','751622tAhAJG','EVAL','createBattleFieldContainer','1VTswLl','parent','description','ARRAYNUM','_baseY','CreateTargetCoordinates','setupIconFrame','_scene','setFrame','_moveTargetY','_muteSound','createActSeqProjectilesAnimationQueue','AutoAngle','_moveBaseX','rotation','_startReady','Sprite_AnimationMV_processTimingData','filter','loadSystem','Spriteset_Battle_adjustFlippedBattlefield','_mirror','_spriteset','return\x200','isAnimationForEach','AngleOffset','isAnyProjectilePresent','_moveTime','1656949iWWsUv','EasingType','ARRAYJSON','_easing','createActSeqProjectilesAnimation','retrieveActSeqProjectilesAnimation','Spriteset_Base_initialize','floor','_settings','exit','_ActSeqProjectilesAnimationSprites','_radianAdjustment','CreateActionSequenceTargets','51lpDRyU','bind','Game_Temp_initialize','updateActSeqProjectilesAnimations','_moveDuration','_effectsContainer','setup','_targets','AnimationAngleAdjust','height','map','addLoadListener','_animation','771kNclFp','Extra','loadPicture','processActSeqProjectilesAnimationRequests','isSideView','version','13148xAcTci','parameters','PointX','iconHeight','Sprite_AnimationMV_update','applyAngle','Picture','pow','PictureAngleAdjust','extraPositionY','setupAnimation','bitmap','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ARRAYFUNC','removeActSeqProjectilesAnimation','angle','call','Spin','AnimationID','setMute','ConvertParams','length','processSoundTimings','_projectilesContainer','setupCoordinates','_moveTargetX','removeAllActSeqProjectilesAnimations','addChild','Sprite_Animation_processSoundTimings','createBitmap','ApplyEasing','match','startProjectile','trim','_handle','parse','IconSet','_adjustedProjectileRadians','BlendMode','OffsetY','setHue','STR','removeChild','animationId','initialize','PointY','blendMode','processTimingData','create','_endReady','restartActSeqProjectilesAnimation','Spriteset_Base_destroy','2CtosxD','_moveTotalDuration','Arc','round','atan2','scale','constructor','13462wwcmUs','applyProjectileAngle','updateMove','initMembers','1553sTSbvM','isPlaying','Sprite_Animation_updateEffectGeometry','animationNextDelay','Goal','_battlerContainer','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_animationSprite','_moveBaseY','_moveCalcX','Scale','_moveCalcY','max','target','_ActSeqProjectilesAnimationQueue','endProjectile','anchor','getPeak','updateSpin','adjustFlippedBattlefield','updateEffectGeometry','prototype','name','Start','update','makeDeepCopy','OffsetX','714119HWRmQx','ActSeqProjectiles','push','children','Settings','destroy','createActSeqProjectilesAnimationSprite','_battleField','Targets','targets','startAnimation','1016933wzspOI','createActionSequenceProjectile','battler'];const _0x30be=function(_0x1f941d,_0x2ee7da){_0x1f941d=_0x1f941d-0x12f;let _0x37966c=_0x3796[_0x1f941d];return _0x37966c;};const _0x3d89ed=_0x30be;(function(_0x22bb44,_0x71157){const _0x1563c1=_0x30be;while(!![]){try{const _0x241bda=parseInt(_0x1563c1(0x14e))+parseInt(_0x1563c1(0x1cb))*-parseInt(_0x1563c1(0x186))+-parseInt(_0x1563c1(0x13b))+-parseInt(_0x1563c1(0x18c))*parseInt(_0x1563c1(0x1c0))+parseInt(_0x1563c1(0x151))*parseInt(_0x1563c1(0x146))+parseInt(_0x1563c1(0x1c7))*-parseInt(_0x1563c1(0x179))+parseInt(_0x1563c1(0x16c));if(_0x241bda===_0x71157)break;else _0x22bb44['push'](_0x22bb44['shift']());}catch(_0x144264){_0x22bb44['push'](_0x22bb44['shift']());}}}(_0x3796,0xc398c));var label=_0x3d89ed(0x13c),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3d89ed(0x162)](function(_0x44599c){const _0x32582a=_0x3d89ed;return _0x44599c['status']&&_0x44599c[_0x32582a(0x153)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x3d89ed(0x13f)]=VisuMZ[label][_0x3d89ed(0x13f)]||{},VisuMZ[_0x3d89ed(0x1a0)]=function(_0x32a261,_0x4a806b){const _0x1a997e=_0x3d89ed;for(const _0x5b0695 in _0x4a806b){if(_0x5b0695[_0x1a997e(0x1ab)](/(.*):(.*)/i)){const _0x3d88a2=String(RegExp['$1']),_0x17ffd7=String(RegExp['$2'])[_0x1a997e(0x14b)]()[_0x1a997e(0x1ad)]();let _0x3b58ea,_0x39b80b,_0x44098d;switch(_0x17ffd7){case'NUM':_0x3b58ea=_0x4a806b[_0x5b0695]!==''?Number(_0x4a806b[_0x5b0695]):0x0;break;case _0x1a997e(0x154):_0x39b80b=_0x4a806b[_0x5b0695]!==''?JSON['parse'](_0x4a806b[_0x5b0695]):[],_0x3b58ea=_0x39b80b[_0x1a997e(0x183)](_0x375f5d=>Number(_0x375f5d));break;case _0x1a997e(0x14f):_0x3b58ea=_0x4a806b[_0x5b0695]!==''?eval(_0x4a806b[_0x5b0695]):null;break;case'ARRAYEVAL':_0x39b80b=_0x4a806b[_0x5b0695]!==''?JSON[_0x1a997e(0x1af)](_0x4a806b[_0x5b0695]):[],_0x3b58ea=_0x39b80b[_0x1a997e(0x183)](_0x3b7be=>eval(_0x3b7be));break;case'JSON':_0x3b58ea=_0x4a806b[_0x5b0695]!==''?JSON[_0x1a997e(0x1af)](_0x4a806b[_0x5b0695]):'';break;case _0x1a997e(0x16e):_0x39b80b=_0x4a806b[_0x5b0695]!==''?JSON[_0x1a997e(0x1af)](_0x4a806b[_0x5b0695]):[],_0x3b58ea=_0x39b80b[_0x1a997e(0x183)](_0x354b52=>JSON['parse'](_0x354b52));break;case'FUNC':_0x3b58ea=_0x4a806b[_0x5b0695]!==''?new Function(JSON[_0x1a997e(0x1af)](_0x4a806b[_0x5b0695])):new Function(_0x1a997e(0x167));break;case _0x1a997e(0x199):_0x39b80b=_0x4a806b[_0x5b0695]!==''?JSON[_0x1a997e(0x1af)](_0x4a806b[_0x5b0695]):[],_0x3b58ea=_0x39b80b['map'](_0x43e674=>new Function(JSON[_0x1a997e(0x1af)](_0x43e674)));break;case _0x1a997e(0x1b5):_0x3b58ea=_0x4a806b[_0x5b0695]!==''?String(_0x4a806b[_0x5b0695]):'';break;case'ARRAYSTR':_0x39b80b=_0x4a806b[_0x5b0695]!==''?JSON['parse'](_0x4a806b[_0x5b0695]):[],_0x3b58ea=_0x39b80b[_0x1a997e(0x183)](_0x3cda0e=>String(_0x3cda0e));break;case _0x1a997e(0x149):_0x44098d=_0x4a806b[_0x5b0695]!==''?JSON[_0x1a997e(0x1af)](_0x4a806b[_0x5b0695]):{},_0x3b58ea=VisuMZ['ConvertParams']({},_0x44098d);break;case'ARRAYSTRUCT':_0x39b80b=_0x4a806b[_0x5b0695]!==''?JSON[_0x1a997e(0x1af)](_0x4a806b[_0x5b0695]):[],_0x3b58ea=_0x39b80b['map'](_0x2317b9=>VisuMZ['ConvertParams']({},JSON[_0x1a997e(0x1af)](_0x2317b9)));break;default:continue;}_0x32a261[_0x3d88a2]=_0x3b58ea;}}return _0x32a261;},(_0xda7ca2=>{const _0x2520ad=_0x3d89ed,_0x2ea124=_0xda7ca2[_0x2520ad(0x136)];for(const _0x4bebe5 of dependencies){if(!Imported[_0x4bebe5]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x2ea124,_0x4bebe5)),SceneManager[_0x2520ad(0x175)]();break;}}const _0x31b76d=_0xda7ca2[_0x2520ad(0x153)];if(_0x31b76d[_0x2520ad(0x1ab)](/\[Version[ ](.*?)\]/i)){const _0x8afeeb=Number(RegExp['$1']);_0x8afeeb!==VisuMZ[label][_0x2520ad(0x18b)]&&(alert(_0x2520ad(0x198)[_0x2520ad(0x14c)](_0x2ea124,_0x8afeeb)),SceneManager[_0x2520ad(0x175)]());}if(_0x31b76d[_0x2520ad(0x1ab)](/\[Tier[ ](\d+)\]/i)){const _0x3a6ea8=Number(RegExp['$1']);_0x3a6ea8<tier?(alert(_0x2520ad(0x1d1)[_0x2520ad(0x14c)](_0x2ea124,_0x3a6ea8,tier)),SceneManager[_0x2520ad(0x175)]()):tier=Math[_0x2520ad(0x1d7)](_0x3a6ea8,tier);}VisuMZ[_0x2520ad(0x1a0)](VisuMZ[label][_0x2520ad(0x13f)],_0xda7ca2[_0x2520ad(0x18d)]);})(pluginData),VisuMZ[_0x3d89ed(0x13c)]['Game_Temp_initialize']=Game_Temp[_0x3d89ed(0x135)][_0x3d89ed(0x1b8)],Game_Temp[_0x3d89ed(0x135)][_0x3d89ed(0x1b8)]=function(){const _0x5a9857=_0x3d89ed;VisuMZ[_0x5a9857(0x13c)][_0x5a9857(0x17b)][_0x5a9857(0x19c)](this),this[_0x5a9857(0x15c)]();},Game_Temp[_0x3d89ed(0x135)]['createActSeqProjectilesAnimationQueue']=function(){const _0x535667=_0x3d89ed;this[_0x535667(0x1d9)]=[];},Game_Temp[_0x3d89ed(0x135)]['requestActSeqProjectilesAnimation']=function(_0x1400e0,_0x16c4ad,_0x1d655b,_0x2f5d8c){const _0x34bb7a=_0x3d89ed;_0x1d655b=_0x1d655b||![],_0x2f5d8c=_0x2f5d8c||![];if($dataAnimations[_0x16c4ad]){const _0x11afce={'targets':_0x1400e0,'animationId':_0x16c4ad,'mirror':_0x1d655b,'mute':_0x2f5d8c};this[_0x34bb7a(0x1d9)][_0x34bb7a(0x13d)](_0x11afce);for(const _0x15e6db of _0x1400e0){_0x15e6db[_0x34bb7a(0x145)]&&_0x15e6db[_0x34bb7a(0x145)]();}}},Game_Temp[_0x3d89ed(0x135)]['retrieveActSeqProjectilesAnimation']=function(){const _0x1b531d=_0x3d89ed;return this[_0x1b531d(0x1d9)]['shift']();},Sprite_Animation[_0x3d89ed(0x135)][_0x3d89ed(0x19f)]=function(_0x39a845){const _0x5f0466=_0x3d89ed;this[_0x5f0466(0x15b)]=_0x39a845;},VisuMZ[_0x3d89ed(0x13c)][_0x3d89ed(0x1a8)]=Sprite_Animation['prototype'][_0x3d89ed(0x1a2)],Sprite_Animation['prototype'][_0x3d89ed(0x1a2)]=function(){const _0x339f75=_0x3d89ed;if(this[_0x339f75(0x15b)])return;VisuMZ['ActSeqProjectiles'][_0x339f75(0x1a8)][_0x339f75(0x19c)](this);},VisuMZ['ActSeqProjectiles'][_0x3d89ed(0x1cd)]=Sprite_Animation[_0x3d89ed(0x135)][_0x3d89ed(0x134)],Sprite_Animation[_0x3d89ed(0x135)]['updateEffectGeometry']=function(){const _0x548e0d=_0x3d89ed;VisuMZ['ActSeqProjectiles']['Sprite_Animation_updateEffectGeometry']['call'](this),this['_adjustedProjectileRadians']!==undefined&&this[_0x548e0d(0x1c8)](this[_0x548e0d(0x1b1)]);},Sprite_Animation['prototype'][_0x3d89ed(0x1c8)]=function(_0x565973){const _0x50414d=_0x3d89ed,_0x56ceef=this['_animation'][_0x50414d(0x1c5)]/0x64,_0x122e6e=Math['PI']/0xb4,_0x3744f9=this[_0x50414d(0x185)][_0x50414d(0x15f)]['x']*_0x122e6e,_0x487176=this[_0x50414d(0x185)][_0x50414d(0x15f)]['y']*_0x122e6e,_0x1a1747=this[_0x50414d(0x185)]['rotation']['z']*_0x122e6e-_0x565973;this[_0x50414d(0x1ae)]&&this[_0x50414d(0x1ae)]['setRotation'](_0x3744f9,_0x487176,_0x1a1747);},Sprite_AnimationMV[_0x3d89ed(0x135)][_0x3d89ed(0x19f)]=function(_0x2e9a14){const _0x10da97=_0x3d89ed;this[_0x10da97(0x15b)]=_0x2e9a14;},VisuMZ[_0x3d89ed(0x13c)][_0x3d89ed(0x161)]=Sprite_AnimationMV[_0x3d89ed(0x135)]['processTimingData'],Sprite_AnimationMV['prototype'][_0x3d89ed(0x1bb)]=function(_0x4b830d){const _0x295d80=_0x3d89ed;this[_0x295d80(0x15b)]&&(_0x4b830d=JsonEx[_0x295d80(0x139)](_0x4b830d),_0x4b830d['se']&&(_0x4b830d['se']['volume']=0x0)),VisuMZ[_0x295d80(0x13c)][_0x295d80(0x161)][_0x295d80(0x19c)](this,_0x4b830d);},VisuMZ[_0x3d89ed(0x13c)]['Sprite_AnimationMV_update']=Sprite_AnimationMV[_0x3d89ed(0x135)]['update'],Sprite_AnimationMV[_0x3d89ed(0x135)][_0x3d89ed(0x138)]=function(){const _0xcbde71=_0x3d89ed;VisuMZ[_0xcbde71(0x13c)][_0xcbde71(0x190)][_0xcbde71(0x19c)](this),this['_adjustedProjectileRadians']!==undefined&&(this[_0xcbde71(0x15f)]=this['_adjustedProjectileRadians']);},VisuMZ[_0x3d89ed(0x13c)][_0x3d89ed(0x172)]=Spriteset_Base[_0x3d89ed(0x135)][_0x3d89ed(0x1b8)],Spriteset_Base[_0x3d89ed(0x135)][_0x3d89ed(0x1b8)]=function(){const _0x2979c2=_0x3d89ed;VisuMZ['ActSeqProjectiles'][_0x2979c2(0x172)][_0x2979c2(0x19c)](this),this['_ActSeqProjectilesAnimationSprites']=[];},VisuMZ[_0x3d89ed(0x13c)][_0x3d89ed(0x1bf)]=Spriteset_Base[_0x3d89ed(0x135)][_0x3d89ed(0x140)],Spriteset_Base['prototype'][_0x3d89ed(0x140)]=function(_0x4a2991){const _0x65faf4=_0x3d89ed;this[_0x65faf4(0x1a6)](),VisuMZ['ActSeqProjectiles'][_0x65faf4(0x1bf)][_0x65faf4(0x19c)](this,_0x4a2991);},VisuMZ[_0x3d89ed(0x13c)]['Spriteset_Base_update']=Spriteset_Base[_0x3d89ed(0x135)]['update'],Spriteset_Base[_0x3d89ed(0x135)]['update']=function(){const _0x186ce1=_0x3d89ed;VisuMZ['ActSeqProjectiles']['Spriteset_Base_update']['call'](this),this[_0x186ce1(0x17c)]();},Spriteset_Base['prototype'][_0x3d89ed(0x17c)]=function(){const _0x246089=_0x3d89ed;for(const _0x52ae11 of this['_ActSeqProjectilesAnimationSprites']){!_0x52ae11[_0x246089(0x1cc)]()&&this[_0x246089(0x1be)](_0x52ae11);}this[_0x246089(0x189)]();},Spriteset_Base[_0x3d89ed(0x135)][_0x3d89ed(0x189)]=function(){const _0x3c8e14=_0x3d89ed;for(;;){const _0x3f9dc4=$gameTemp[_0x3c8e14(0x171)]();if(_0x3f9dc4)this[_0x3c8e14(0x170)](_0x3f9dc4);else break;}},Spriteset_Base[_0x3d89ed(0x135)][_0x3d89ed(0x170)]=function(_0x48e3c0){const _0x5ec9bc=_0x3d89ed,_0x545414=$dataAnimations[_0x48e3c0[_0x5ec9bc(0x1b7)]],_0x43dce6=_0x48e3c0[_0x5ec9bc(0x144)],_0x42b741=_0x48e3c0['mirror'],_0x94e806=_0x48e3c0['mute'];let _0x5c3266=this['animationBaseDelay']();const _0x56aeae=this[_0x5ec9bc(0x1ce)]();if(this[_0x5ec9bc(0x168)](_0x545414))for(const _0x2557aa of _0x43dce6){this[_0x5ec9bc(0x141)]([_0x2557aa],_0x545414,_0x42b741,_0x5c3266,_0x94e806),_0x5c3266+=_0x56aeae;}else this[_0x5ec9bc(0x141)](_0x43dce6,_0x545414,_0x42b741,_0x5c3266);},Spriteset_Base[_0x3d89ed(0x135)][_0x3d89ed(0x141)]=function(_0x818c40,_0x3c964b,_0x403ea9,_0x29dcd6,_0x5d81a7){const _0x46d02b=_0x3d89ed,_0x42ddba=this['isMVAnimation'](_0x3c964b),_0x90d0ef=new(_0x42ddba?Sprite_AnimationMV:Sprite_Animation)(),_0x36c918=_0x818c40;return this['animationShouldMirror'](_0x818c40[0x0])&&(_0x403ea9=!_0x403ea9),_0x90d0ef['targetObjects']=_0x818c40,_0x90d0ef[_0x46d02b(0x17f)](_0x36c918,_0x3c964b,_0x403ea9,_0x29dcd6),_0x90d0ef[_0x46d02b(0x19f)](_0x5d81a7),this['_effectsContainer']['addChild'](_0x90d0ef),this['_ActSeqProjectilesAnimationSprites'][_0x46d02b(0x13d)](_0x90d0ef),_0x90d0ef;},Spriteset_Base['prototype'][_0x3d89ed(0x1be)]=function(_0x2a265f){const _0x28d009=_0x3d89ed;if(!_0x2a265f)return;const _0x3215f3=_0x2a265f[_0x28d009(0x180)],_0x41b072=_0x2a265f[_0x28d009(0x185)],_0x59fd1f=_0x2a265f[_0x28d009(0x165)],_0x345f63=0x0,_0x1ed9b5=_0x2a265f['_muteSound'];this['removeActSeqProjectilesAnimation'](_0x2a265f);const _0x14c273=this['createActSeqProjectilesAnimationSprite'](_0x3215f3,_0x41b072,_0x59fd1f,_0x345f63,_0x1ed9b5);for(const _0x1ebfe8 of _0x3215f3){_0x1ebfe8&&(_0x1ebfe8['_animationSprite']=_0x14c273);}},Spriteset_Base['prototype'][_0x3d89ed(0x19a)]=function(_0x2e505d){const _0x5a18c=_0x3d89ed;this[_0x5a18c(0x176)]['remove'](_0x2e505d),this[_0x5a18c(0x17e)][_0x5a18c(0x1b6)](_0x2e505d);for(const _0x3b0b04 of _0x2e505d['targetObjects']){_0x3b0b04['endAnimation']&&_0x3b0b04['endAnimation']();}_0x2e505d[_0x5a18c(0x140)]();},Spriteset_Base[_0x3d89ed(0x135)][_0x3d89ed(0x1a6)]=function(){const _0x4443c9=_0x3d89ed;for(const _0x281732 of this[_0x4443c9(0x176)]){this['removeActSeqProjectilesAnimation'](_0x281732);}},Spriteset_Base['prototype']['isActSeqProjectilesAnimationPlaying']=function(){const _0xb57bad=_0x3d89ed;return this['_ActSeqProjectilesAnimationSprites'][_0xb57bad(0x1a1)]>0x0;},VisuMZ['ActSeqProjectiles']['Spriteset_Battle_createBattleFieldContainer']=Spriteset_Battle[_0x3d89ed(0x135)][_0x3d89ed(0x150)],Spriteset_Battle[_0x3d89ed(0x135)]['createBattleFieldContainer']=function(){const _0xf5ebde=_0x3d89ed;VisuMZ['ActSeqProjectiles']['Spriteset_Battle_createBattleFieldContainer'][_0xf5ebde(0x19c)](this),this[_0xf5ebde(0x1a3)]=new Sprite(),this[_0xf5ebde(0x142)][_0xf5ebde(0x1a7)](this[_0xf5ebde(0x1a3)]);},VisuMZ[_0x3d89ed(0x13c)][_0x3d89ed(0x164)]=Spriteset_Battle[_0x3d89ed(0x135)][_0x3d89ed(0x133)],Spriteset_Battle[_0x3d89ed(0x135)][_0x3d89ed(0x133)]=function(){const _0x54013c=_0x3d89ed;VisuMZ['ActSeqProjectiles']['Spriteset_Battle_adjustFlippedBattlefield'][_0x54013c(0x19c)](this),this[_0x54013c(0x1a3)]&&this[_0x54013c(0x1d0)]&&(this[_0x54013c(0x1a3)][_0x54013c(0x1c5)]['x']=this[_0x54013c(0x1d0)][_0x54013c(0x1c5)]['x'],this[_0x54013c(0x1a3)]['scale']['y']=this['_battlerContainer']['scale']['y'],this[_0x54013c(0x1a3)]['x']=this[_0x54013c(0x1d0)]['x'],this[_0x54013c(0x1a3)]['y']=this[_0x54013c(0x1d0)]['y']);},Spriteset_Battle['prototype'][_0x3d89ed(0x147)]=function(_0x4fbd8d){const _0x294afd=_0x3d89ed;if(!_0x4fbd8d)return;_0x4fbd8d=JsonEx['makeDeepCopy'](_0x4fbd8d);const _0x411171=[],_0x386b91=[];VisuMZ[_0x294afd(0x13c)]['CreateCoordinates'](_0x411171,_0x4fbd8d[_0x294afd(0x137)]),VisuMZ[_0x294afd(0x13c)]['CreateCoordinates'](_0x386b91,_0x4fbd8d[_0x294afd(0x1cf)]);const _0x283010=this[_0x294afd(0x1a3)];for(const _0xdd8fcc of _0x411171){for(const _0x2d4757 of _0x386b91){const _0x4a0884=new Sprite_Projectile(_0x4fbd8d,_0xdd8fcc,_0x2d4757);_0x283010[_0x294afd(0x1a7)](_0x4a0884);}}},VisuMZ[_0x3d89ed(0x13c)]['CreateCoordinates']=function(_0x351054,_0x44af92){const _0x5c4a04=_0x3d89ed,_0x30cbbb=_0x44af92['Type'],_0x5add73=_0x44af92[_0x5c4a04(0x13a)],_0x530458=_0x44af92[_0x5c4a04(0x1b3)];_0x30cbbb==='point'&&_0x351054['push'](new Point(_0x44af92[_0x5c4a04(0x18e)]+_0x5add73,_0x44af92[_0x5c4a04(0x1b9)]+_0x530458));if(_0x30cbbb===_0x5c4a04(0x1d8)){const _0xe46fcc=VisuMZ[_0x5c4a04(0x178)](_0x44af92[_0x5c4a04(0x143)]),_0x439c59=_0xe46fcc['filter'](_0x554e01=>_0x554e01&&_0x554e01[_0x5c4a04(0x148)]())[_0x5c4a04(0x183)](_0xb5cf76=>VisuMZ[_0x5c4a04(0x13c)][_0x5c4a04(0x156)](_0xb5cf76));if(!_0x439c59)return;if(_0x44af92['TargetCenter']){const _0x192eda=_0x439c59[_0x5c4a04(0x1a1)]||0x1;let _0x5d4af6=0x0,_0xa2769=0x0;for(const _0x2efe97 of _0x439c59){_0x5d4af6+=_0x2efe97[0x0],_0xa2769+=_0x2efe97[0x1];}_0x5d4af6/=_0x192eda,_0xa2769/=_0x192eda,_0x351054['push'](new Point(Math[_0x5c4a04(0x1c3)](_0x5d4af6+_0x5add73),Math['round'](_0xa2769+_0x530458)));}else for(const _0x4e885f of _0x439c59){_0x351054[_0x5c4a04(0x13d)](new Point(Math[_0x5c4a04(0x1c3)](_0x4e885f[0x0]+_0x5add73),Math[_0x5c4a04(0x1c3)](_0x4e885f[0x1]+_0x530458)));}}},VisuMZ[_0x3d89ed(0x13c)]['CreateTargetCoordinates']=function(_0x5d35fe){const _0x4623f1=_0x3d89ed;let _0xcd8f66=_0x5d35fe[_0x4623f1(0x148)]()['_baseX'],_0x3fa393=_0x5d35fe['battler']()[_0x4623f1(0x155)]-_0x5d35fe[_0x4623f1(0x148)]()[_0x4623f1(0x182)]/0x2;_0x3fa393+=_0x5d35fe[_0x4623f1(0x148)]()[_0x4623f1(0x195)]();if(!$gameSystem[_0x4623f1(0x18a)]()&&_0x5d35fe['isActor']()){const _0x57fed7=SceneManager[_0x4623f1(0x158)]['_statusWindow'],_0x376585=SceneManager[_0x4623f1(0x158)]['_windowLayer'];_0xcd8f66+=_0x376585['x']+_0x57fed7['x'],_0x3fa393+=_0x376585['y']+_0x57fed7['y'];}return[_0xcd8f66,_0x3fa393];},Spriteset_Battle[_0x3d89ed(0x135)][_0x3d89ed(0x16a)]=function(){const _0x3a6f72=_0x3d89ed;if(!this[_0x3a6f72(0x1a3)])return!![];return this[_0x3a6f72(0x1a3)][_0x3a6f72(0x13e)][_0x3a6f72(0x1a1)]>0x0;};function Sprite_Projectile(){const _0x523f45=_0x3d89ed;this[_0x523f45(0x1b8)](...arguments);}Sprite_Projectile[_0x3d89ed(0x135)]=Object[_0x3d89ed(0x1bc)](Sprite[_0x3d89ed(0x135)]),Sprite_Projectile['prototype'][_0x3d89ed(0x1c6)]=Sprite_Projectile,Sprite_Projectile[_0x3d89ed(0x135)][_0x3d89ed(0x1b8)]=function(_0x115038,_0x2d33e7,_0x131d9f){const _0x3469e5=_0x3d89ed;this['_settings']=_0x115038,this['setupCoordinates'](_0x2d33e7,_0x131d9f),Sprite['prototype'][_0x3469e5(0x1b8)]['call'](this),this['initMembers'](),this[_0x3469e5(0x1a9)]();},Sprite_Projectile[_0x3d89ed(0x135)][_0x3d89ed(0x1a4)]=function(_0x4b6023,_0x57407a){const _0x1e1363=_0x3d89ed;this[_0x1e1363(0x15e)]=_0x4b6023['x'],this[_0x1e1363(0x1d3)]=_0x4b6023['y'],this[_0x1e1363(0x1d4)]=_0x4b6023['x'],this['_moveCalcY']=_0x4b6023['y'],this[_0x1e1363(0x1a5)]=_0x57407a['x'],this[_0x1e1363(0x15a)]=_0x57407a['y'];},Sprite_Projectile[_0x3d89ed(0x135)][_0x3d89ed(0x1ca)]=function(){const _0xfea1dc=_0x3d89ed;this[_0xfea1dc(0x130)]['x']=0.5,this[_0xfea1dc(0x130)]['y']=0.5,this['x']=Graphics['width']*-0xa,this['y']=Graphics[_0xfea1dc(0x182)]*-0xa,this[_0xfea1dc(0x16b)]=0x0,this['_moveDuration']=this[_0xfea1dc(0x174)]['Duration']||0x0,this['_moveTotalDuration']=this[_0xfea1dc(0x17d)],this[_0xfea1dc(0x16f)]='LINEAR',this[_0xfea1dc(0x177)]=0x0,this[_0xfea1dc(0x160)]=![],this['_endReady']=![];const _0x3d1a69=this['_settings']['Extra'];if(!_0x3d1a69)return;this[_0xfea1dc(0x19b)]=_0x3d1a69[_0xfea1dc(0x169)]||0x0,this[_0xfea1dc(0x16f)]=_0x3d1a69[_0xfea1dc(0x16d)],!this[_0xfea1dc(0x174)]['AnimationID']&&(this[_0xfea1dc(0x1ba)]=_0x3d1a69[_0xfea1dc(0x1b2)]||0x0,this[_0xfea1dc(0x1b4)](_0x3d1a69['Hue']||0x0),this[_0xfea1dc(0x1c5)]['x']=this[_0xfea1dc(0x1c5)]['y']=Math[_0xfea1dc(0x1d7)](0.001,_0x3d1a69[_0xfea1dc(0x1d5)]||0.001));},Sprite_Projectile[_0x3d89ed(0x135)][_0x3d89ed(0x1a9)]=function(){const _0x1b4492=_0x3d89ed;if(this['_settings'][_0x1b4492(0x19e)])this[_0x1b4492(0x197)]=new Bitmap(0x1,0x1),this[_0x1b4492(0x196)](),this[_0x1b4492(0x1ac)]();else{if(this[_0x1b4492(0x174)][_0x1b4492(0x14d)])this[_0x1b4492(0x197)]=ImageManager[_0x1b4492(0x163)](_0x1b4492(0x1b0)),this['bitmap'][_0x1b4492(0x184)](this[_0x1b4492(0x157)][_0x1b4492(0x17a)](this));else this[_0x1b4492(0x174)][_0x1b4492(0x192)]?(this[_0x1b4492(0x197)]=ImageManager[_0x1b4492(0x188)](this[_0x1b4492(0x174)]['Picture']),this[_0x1b4492(0x197)]['addLoadListener'](this[_0x1b4492(0x14a)]['bind'](this))):(this[_0x1b4492(0x197)]=new Bitmap(0x1,0x1),this[_0x1b4492(0x1ac)]());}},Sprite_Projectile[_0x3d89ed(0x135)][_0x3d89ed(0x196)]=function(){const _0x5e9e7c=_0x3d89ed,_0x4d78bc=VisuMZ[_0x5e9e7c(0x13c)][_0x5e9e7c(0x13f)][_0x5e9e7c(0x181)];this[_0x5e9e7c(0x177)]=_0x4d78bc*(Math['PI']/0xb4);const _0x2faee6=BattleManager['_spriteset'];if(!_0x2faee6)return this['endProjectile']();const _0x2ddb86=this['_settings'][_0x5e9e7c(0x19e)],_0x88c9ef=$dataAnimations[_0x2ddb86];if(!_0x88c9ef)return this[_0x5e9e7c(0x12f)]();const _0x747519=![],_0x43ef48=0x0,_0x461669=!![];this[_0x5e9e7c(0x1d2)]=_0x2faee6[_0x5e9e7c(0x141)]([this],_0x88c9ef,_0x747519,_0x43ef48,_0x461669),this[_0x5e9e7c(0x1ac)]();},Sprite_Projectile[_0x3d89ed(0x135)][_0x3d89ed(0x157)]=function(){const _0x377235=_0x3d89ed,_0x3aa255=VisuMZ[_0x377235(0x13c)]['Settings']['IconAngleAdjust'];this['_radianAdjustment']=_0x3aa255*(Math['PI']/0xb4);const _0x248a98=this[_0x377235(0x174)][_0x377235(0x14d)],_0x26619a=ImageManager['iconWidth'],_0x5d5b99=ImageManager[_0x377235(0x18f)],_0x1fe0e4=_0x248a98%0x10*_0x26619a,_0x19c403=Math[_0x377235(0x173)](_0x248a98/0x10)*_0x5d5b99;this[_0x377235(0x159)](_0x1fe0e4,_0x19c403,_0x26619a,_0x5d5b99),this[_0x377235(0x1ac)]();},Sprite_Projectile[_0x3d89ed(0x135)][_0x3d89ed(0x14a)]=function(){const _0x5797b6=_0x3d89ed,_0x1ba5c0=VisuMZ['ActSeqProjectiles']['Settings'][_0x5797b6(0x194)];this['_radianAdjustment']=_0x1ba5c0*(Math['PI']/0xb4),this[_0x5797b6(0x1ac)]();},Sprite_Projectile[_0x3d89ed(0x135)][_0x3d89ed(0x1ac)]=function(){const _0x560903=_0x3d89ed;this[_0x560903(0x160)]=!![];},Sprite_Projectile[_0x3d89ed(0x135)][_0x3d89ed(0x138)]=function(){const _0x4c2eec=_0x3d89ed;Sprite[_0x4c2eec(0x135)][_0x4c2eec(0x138)][_0x4c2eec(0x19c)](this);if(!this[_0x4c2eec(0x160)])return;this[_0x4c2eec(0x1bd)]?this[_0x4c2eec(0x12f)]():(this[_0x4c2eec(0x1c9)](),this[_0x4c2eec(0x132)]());},Sprite_Projectile[_0x3d89ed(0x135)]['endProjectile']=function(){const _0x21cd04=_0x3d89ed;if(!this[_0x21cd04(0x152)])return;this[_0x21cd04(0x152)][_0x21cd04(0x1b6)](this);if(this['_animationSprite']){const _0x410199=BattleManager[_0x21cd04(0x166)];_0x410199&&(_0x410199['removeActSeqProjectilesAnimation'](this[_0x21cd04(0x1d2)]),delete this['_animationSprite']);}},Sprite_Projectile[_0x3d89ed(0x135)][_0x3d89ed(0x1c9)]=function(){const _0x31bc59=_0x3d89ed;if(this[_0x31bc59(0x17d)]<0x0)return;this[_0x31bc59(0x16b)]++;var _0x15797c=this['_moveTime'],_0x4d5a9b=this[_0x31bc59(0x1c1)],_0x477c33=this[_0x31bc59(0x15e)],_0xbfb636=this[_0x31bc59(0x1d3)],_0x505f68=this[_0x31bc59(0x1a5)],_0x23e0f8=this[_0x31bc59(0x15a)];_0x15797c/=_0x4d5a9b,_0x15797c=VisuMZ[_0x31bc59(0x1aa)](_0x15797c,this[_0x31bc59(0x16f)][_0x31bc59(0x14b)]()[_0x31bc59(0x1ad)]());var _0x2d4343=this['_moveCalcX'],_0x523e7a=this[_0x31bc59(0x1d6)];this['_moveCalcX']=_0x477c33+_0x15797c*(_0x505f68-_0x477c33),this[_0x31bc59(0x1d6)]=_0xbfb636+_0x15797c*(_0x23e0f8-_0xbfb636)-this[_0x31bc59(0x131)]();var _0x9e9a82=this[_0x31bc59(0x1d4)],_0x5d5905=this['_moveCalcY'];this[_0x31bc59(0x191)](_0x2d4343,_0x9e9a82,_0x523e7a,_0x5d5905),this['x']=Math[_0x31bc59(0x1c3)](this['_moveCalcX']),this['y']=Math['round'](this['_moveCalcY']),this[_0x31bc59(0x17d)]--,this[_0x31bc59(0x17d)]<0x0&&(this['x']=this[_0x31bc59(0x1a5)],this['y']=this[_0x31bc59(0x15a)],this[_0x31bc59(0x1bd)]=!![]);},Sprite_Projectile[_0x3d89ed(0x135)][_0x3d89ed(0x191)]=function(_0x205e13,_0x292263,_0x674aa6,_0x47e448){const _0x987efd=_0x3d89ed;if(this['_settings'][_0x987efd(0x187)]&&this['_settings'][_0x987efd(0x187)][_0x987efd(0x15d)]){var _0x90218b=_0x292263-_0x205e13,_0x4eb59e=_0x47e448-_0x674aa6,_0x53c5f9=Math[_0x987efd(0x1c4)](_0x4eb59e,_0x90218b);_0x53c5f9+=this[_0x987efd(0x174)]['Extra'][_0x987efd(0x169)]*(Math['PI']/0xb4),this[_0x987efd(0x15f)]=_0x53c5f9+this[_0x987efd(0x177)],this[_0x987efd(0x1d2)]&&(this[_0x987efd(0x1d2)][_0x987efd(0x1b1)]=this[_0x987efd(0x15f)]);}},Sprite_Projectile['prototype'][_0x3d89ed(0x131)]=function(){const _0x32555e=_0x3d89ed;if(!this[_0x32555e(0x174)][_0x32555e(0x187)])return 0x0;if(this[_0x32555e(0x174)][_0x32555e(0x187)][_0x32555e(0x1c2)]===0x0)return 0x0;var _0x4b0294=this[_0x32555e(0x1c1)]-this['_moveDuration'],_0x4610b3=this['_moveTotalDuration']/0x2,_0x323e2b=this[_0x32555e(0x174)][_0x32555e(0x187)]?this[_0x32555e(0x174)]['Extra']['Arc']||0x0:0x0,_0x3a4384=-_0x323e2b/Math[_0x32555e(0x193)](_0x4610b3,0x2),_0x2abe50=_0x3a4384*Math[_0x32555e(0x193)](_0x4b0294-_0x4610b3,0x2)+_0x323e2b;return _0x2abe50;},Sprite_Projectile[_0x3d89ed(0x135)]['updateSpin']=function(){const _0x2e1e7c=_0x3d89ed;if(!this[_0x2e1e7c(0x174)]['Extra'])return;this[_0x2e1e7c(0x19b)]+=this['_settings'][_0x2e1e7c(0x187)][_0x2e1e7c(0x19d)]||0x0;};