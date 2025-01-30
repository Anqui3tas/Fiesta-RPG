//=============================================================================
// VisuStella MZ - Battle Cursor
// VisuMZ_4_BattleCursor.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_BattleCursor = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCursor = VisuMZ.BattleCursor || {};
VisuMZ.BattleCursor.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.00] [BattleCursor]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Cursor_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows you to set custom cursors when selecting allies and/or
 * enemies for targeting while in battle. This is to help with better visual
 * cues when picking a target if the flashing battler isn't enough.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Use icons, pictures, or system images as battle cursors for selected
 *   actors and enemies.
 * * Decide on how the cursor is anchored and positioned with offsets to fine
 *   tune its location.
 * * Want to animate the cursor? You can do so by following a specific image
 *   format and name schema.
 * * Oscillate the cursor back and forth from a left to right horizontal bounce
 *   or an up to down vertical bounce. Or if you want, just don't have any kind
 *   of oscillation at all!
 * * Customize the battle cursor to appear differently for various actors
 *   and/or enemies through notetags!
 * * Alter the battle cursor mid-battle through Plugin Commands, too!
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Animated Battle Cursor Instructions
 * ============================================================================
 *
 * Save your animated picture into your game project's img/pictures/ folder or
 * the img/system/ folder depending on which you want to load from.
 * 
 * The filename must be named with the following format:
 *
 * filename[HxV]
 *
 * Replace H in the filename with the number of horizontal cells it has.
 * Replace V in the filename with the number of vertical cells it has.
 * The number of total cells it has available is equal the multiplicative
 * product of the horizontal and vertical cells.
 *
 * For example:
 *
 * "Cursor_Blue[3x2]" will have 3 horizontal cells and 2 vertical cells. This
 * means there are a total of 6 cells that will be used for animating.
 *
 * Animations will be played from left to right, then up to down so please
 * arrange them as such. For example, 4x5 will play like this:
 *
 *  1  2  3  4
 *  5  6  7  8
 *  9 10 11 12
 * 13 14 15 16
 * 17 18 19 20
 *
 * Keep this in mind as you format your animated battle selection cursors.
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
 * === Cursor Appearance-Related Notetags ===
 * 
 * ---
 *
 * <Battle Cursor Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the battle select cursor into the specific icon.
 * - Replace 'x' with the icon index you wish to use.
 *
 * ---
 *
 * <Battle Cursor Picture: filename>
 * <Battle Cursor System: filename>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the battle select cursor into the specific image.
 * - The 'Picture' variant loads images from img/pictures/.
 * - The 'System' variant loads images from img/system/.
 * - Replace 'filename' with the filename of the image found in the specific
 *   target folder.
 *   - Do not include the file extension.
 *
 * ---
 *
 * <Battle Cursor Frame Delay: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - If using a 'picture' or 'system' image that has the animated format, you
 *   can adjust how much delay there is between each animated frame.
 * - Replace 'x' with a number representing the delay between frames.
 *   Lower is faster. Higher is slower.
 *
 * ---
 * 
 * === Cursor Location-Related Notetags ===
 * 
 * ---
 *
 * <Battle Cursor Anchor X: Left>
 * <Battle Cursor Anchor X: Center>
 * <Battle Cursor Anchor X: Right>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the origin/anchor X location of the battle cursor sprite for
 *   this specific actor/enemy.
 * 
 * ---
 *
 * <Battle Cursor Anchor Y: Top>
 * <Battle Cursor Anchor Y: Middle>
 * <Battle Cursor Anchor Y: Bottom>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the origin/anchor Y location of the battle cursor sprite for
 *   this specific actor/enemy.
 *
 * ---
 *
 * <Battle Cursor Position X: Left>
 * <Battle Cursor Position X: Center>
 * <Battle Cursor Position X: Right>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the position X location of where the battle cursor sprite
 *   appears on the actor or enemy sprite when targeting them.
 * 
 * ---
 *
 * <Battle Cursor Position Y: Top>
 * <Battle Cursor Position Y: Middle>
 * <Battle Cursor Position Y: Bottom>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the position Y location of where the battle cursor sprite
 *   appears on the actor or enemy sprite when targeting them.
 *
 * ---
 *
 * <Battle Cursor Offset X: +x>
 * <Battle Cursor Offset X: -x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Offsets the X position of the battle cursor sprite by pixels.
 * - Replace 'x' with a number representing the pixels to offset the battle
 *   cursor sprite by.
 *   - Negative numbers go left.
 *   - Positive numbers go right.
 *
 * ---
 *
 * <Battle Cursor Offset Y: +y>
 * <Battle Cursor Offset Y: -y>
 *
 * - Used for: Actor, Enemy Notetags
 * - Offsets the Y position of the battle cursor sprite by pixels.
 * - Replace 'y' with a number representing the pixels to offset the battle
 *   cursor sprite by.
 *   - Negative numbers go up.
 *   - Positive numbers go down.
 *
 * ---
 *
 * === Cursor Wave-Related Notetags ===
 * 
 * ---
 *
 * <Battle Cursor No Wave>
 *
 * - Used for: Actor, Enemy Notetags
 * - Removes any oscillation from the battle cursor.
 *
 * ---
 *
 * <Battle Cursor Horizontal Wave: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - The battle cursor will oscillate back and forth horizontally from the
 *   left to the right.
 * - Replace 'x' with a number representing the pixel distance to oscillate.
 *
 * ---
 *
 * <Battle Cursor Vertical Wave: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - The battle cursor will oscillate back and forth vertically from the
 *   top to the bottom.
 * - Replace 'x' with a number representing the pixel distance to oscillate.
 *
 * ---
 *
 * <Battle Cursor Wave Speed: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Select how fast the cursor oscillates.
 * - Lower is slower. Higher is faster.
 * - Replace 'x' with a number representing the speed at which the cursor will
 *   oscillate at.
 * - Use decimal values between 0 and 1 for the best results.
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
 * === Battle Cursor Plugin Commands ===
 * 
 * ---
 *
 * Battle Cursor: Change Actor Cursor
 * - Change target actor's battle cursor settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *
 *     Icon Index:
 *     - If "icon" is selected as the appearance type, use this icon as
 *       the cursor.
 *
 *     Picture Filename:
 *     - If "picture" is selected as the appearance type, use this image from
 *       img/pictures/ as the cursor.
 *
 *     System Filename:
 *     - If "system" is selected as the appearance type, use this image from
 *       img/system/ as the cursor.
 *
 *     Frame Delay:
 *     - The frame delay for any animated "picture" or "system" cursors before
 *       moving onto the next frame.
 * 
 *   Anchor:
 *
 *     Anchor X:
 *     Anchor Y:
 *     - Select the position to determine where the cursor's Anchor
 *       is located.
 * 
 *   Position:
 *
 *     Position X:
 *     Position Y:
 *     - Select the placement to determine where the cursor's Position
 *       is located.
 * 
 *   Offset:
 * 
 *     Offset X:
 *     Offset Y:
 *     - Select how much to offset the cursor's X/Y position by.
 * 
 *   Wave:
 * 
 *     Wave Type:
 *     - Determine how the cursor moves while active.
 * 
 *     Speed:
 *     - Select how fast the cursor oscillates.
 *     - Lower is slower. Higher is faster.
 * 
 *     Distance:
 *     - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * Battle Cursor: Change Party Member Cursor
 * - Change target party member's battle cursor settings.
 *
 *   Party Index(es):
 *   - Select which party member index(es) to affect.
 *
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *
 *     Icon Index:
 *     - If "icon" is selected as the appearance type, use this icon as
 *       the cursor.
 *
 *     Picture Filename:
 *     - If "picture" is selected as the appearance type, use this image from
 *       img/pictures/ as the cursor.
 *
 *     System Filename:
 *     - If "system" is selected as the appearance type, use this image from
 *       img/system/ as the cursor.
 *
 *     Frame Delay:
 *     - The frame delay for any animated "picture" or "system" cursors before
 *       moving onto the next frame.
 * 
 *   Anchor:
 *
 *     Anchor X:
 *     Anchor Y:
 *     - Select the position to determine where the cursor's Anchor
 *       is located.
 * 
 *   Position:
 *
 *     Position X:
 *     Position Y:
 *     - Select the placement to determine where the cursor's Position
 *       is located.
 * 
 *   Offset:
 * 
 *     Offset X:
 *     Offset Y:
 *     - Select how much to offset the cursor's X/Y position by.
 * 
 *   Wave:
 * 
 *     Wave Type:
 *     - Determine how the cursor moves while active.
 * 
 *     Speed:
 *     - Select how fast the cursor oscillates.
 *     - Lower is slower. Higher is faster.
 * 
 *     Distance:
 *     - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * Battle Cursor: Change Enemy Member Cursor
 * - Change target enemy's battle cursor settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy troop index(es) to affect.
 *
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *
 *     Icon Index:
 *     - If "icon" is selected as the appearance type, use this icon as
 *       the cursor.
 *
 *     Picture Filename:
 *     - If "picture" is selected as the appearance type, use this image from
 *       img/pictures/ as the cursor.
 *
 *     System Filename:
 *     - If "system" is selected as the appearance type, use this image from
 *       img/system/ as the cursor.
 *
 *     Frame Delay:
 *     - The frame delay for any animated "picture" or "system" cursors before
 *       moving onto the next frame.
 * 
 *   Anchor:
 *
 *     Anchor X:
 *     Anchor Y:
 *     - Select the position to determine where the cursor's Anchor
 *       is located.
 * 
 *   Position:
 *
 *     Position X:
 *     Position Y:
 *     - Select the placement to determine where the cursor's Position
 *       is located.
 * 
 *   Offset:
 * 
 *     Offset X:
 *     Offset Y:
 *     - Select how much to offset the cursor's X/Y position by.
 * 
 *   Wave:
 * 
 *     Wave Type:
 *     - Determine how the cursor moves while active.
 * 
 *     Speed:
 *     - Select how fast the cursor oscillates.
 *     - Lower is slower. Higher is faster.
 * 
 *     Distance:
 *     - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor and Enemy Cursor Settings
 * ============================================================================
 *
 * These are the default battle select cursor settings for actors and enemies.
 * All actors will have the same settings as one another unless notetags are
 * used to customize their settings. The same goes for enemies.
 *
 * ---
 *
 * Appearance Type
 * 
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *     - Icon - Uses an icon as the cursor
 *     - Picture - Uses a file from img/pictures/ as the cursor
 *     - System - Uses a file from img/system/ as the cursor
 * 
 *   Icon Index:
 *   - If "icon" is selected as the appearance type, use this icon as
 *     the cursor.
 * 
 *   Picture Filename:
 *   - If "picture" is selected as the appearance type, use this image from
 *     img/pictures/ as the cursor.
 * 
 *   System Filename:
 *   - If "system" is selected as the appearance type, use this image from
 *     img/system/ as the cursor.
 * 
 *   Frame Delay:
 *   - The frame delay for any animated "picture" or "system" cursors before
 *     moving onto the next frame.
 *
 * ---
 *
 * Anchor
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Select the position to determine where the cursor's Anchor X/Y
 *     is located.
 *
 * ---
 *
 * Position
 * 
 *   Position X:
 *   Position Y:
 *   - Select the placement to determine where the cursor's Position X/Y
 *     is located.
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   Offset Y:
 *   - Select how much to offset the cursor's X position by.
 *     - X: Negative numbers go left. Positive numbers go right.
 *     - Y: Negative numbers go up. Positive numbers go down.
 *
 * ---
 *
 * Wave
 * 
 *   Wave Type:
 *   - Determine how the cursor moves while active.
 *     - Horizontal - Cursor oscillates left and right
 *     - Vertical - Cursor oscillates up and down
 *     - None - Cursor does not oscillate.
 * 
 *   Speed:
 *   - Select how fast the cursor oscillates.
 *   - Lower is slower. Higher is faster.
 * 
 *   Distance:
 *   - Select how far the cursor sprite will oscillate from its origin.
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
 * Version 1.00: January 8, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleCursorChangeActorSettings
 * @text Battle Cursor: Change Actor Cursor
 * @desc Change target actor's battle cursor settings.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @arg pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @arg systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @arg frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @arg Anchor
 *
 * @arg anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @arg anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @arg Position
 *
 * @arg positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @arg positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @arg Offset
 *
 * @arg offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @arg offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @arg Wave
 *
 * @arg waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @arg waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @arg waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleCursorChangePartySettings
 * @text Battle Cursor: Change Party Member Cursor
 * @desc Change target party member's battle cursor settings.
 *
 * @arg PartyIndex:arraynum
 * @text Party Index(es)
 * @type number[]
 * @desc Select which party member index(es) to affect.
 * @default ["0"]
 *
 * @arg type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @arg pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @arg systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @arg frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @arg Anchor
 *
 * @arg anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @arg anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @arg Position
 *
 * @arg positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @arg positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @arg Offset
 *
 * @arg offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @arg offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @arg Wave
 *
 * @arg waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @arg waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @arg waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleCursorChangeEnemySettings
 * @text Battle Cursor: Change Enemy Member Cursor
 * @desc Change target enemy's battle cursor settings.
 * In-battle only!
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy troop index(es) to affect.
 * @default ["0"]
 *
 * @arg type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @arg pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @arg systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @arg frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @arg Anchor
 *
 * @arg anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @arg anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @arg Position
 *
 * @arg positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @arg positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @arg Offset
 *
 * @arg offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @arg offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @arg Wave
 *
 * @arg waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @arg waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @arg waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @min 1
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
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
 * @param BattleCursor
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ActorCursor:struct
 * @text Actor Cursor
 * @type struct<BattleCursor>
 * @desc Default battle select cursor settings for actors.
 * @default {"type:str":"icon","iconIndex:num":"112","pictureFilename:str":"","systemFilename:str":"","frameDelay:num":"8","Anchor":"","anchorX:str":"right","anchorY:str":"middle","Position":"","positionX:str":"left","positionY:str":"middle","Offset":"","offsetX:num":"+0","offsetY:num":"+0","Wave":"","waveType:str":"horz","waveSpeed:num":"0.05","waveDistance:num":"10"}
 *
 * @param EnemyCursor:struct
 * @text Enemy Cursor
 * @type struct<BattleCursor>
 * @desc Default battle select cursor settings for enemies.
 * @default {"type:str":"icon","iconIndex:num":"112","pictureFilename:str":"","systemFilename:str":"","frameDelay:num":"8","Anchor":"","anchorX:str":"right","anchorY:str":"middle","Position":"","positionX:str":"left","positionY:str":"middle","Offset":"","offsetX:num":"+0","offsetY:num":"+0","Wave":"","waveType:str":"horz","waveSpeed:num":"0.05","waveDistance:num":"10"}
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
 * BattleCursor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleCursor:
 *
 * @param type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @param iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @param pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @param systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @param frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @param Anchor
 *
 * @param anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @param anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @param Position
 *
 * @param positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @param positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @param Wave
 *
 * @param waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @param waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @param waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @min 1
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 */
//=============================================================================

const _0x311e=['ARRAYSTR','center','updateFrame','positionX','_battler','_battleCursorData','_frameIndex','BattleCursorChangeActorSettings','offsetY','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','loadPicture','_enemySprites','addChild','adjustFlippedBattlefield','parameters','STRUCT','format','EnemyCursor','updatePosition','setBattler','BattleCursorChangePartySettings','status','enemy','createBattleCursorData','Sprite_Enemy_initMembers','isSceneBattle','ARRAYFUNC','toUpperCase','members','setBattleCursor','Sprite_Actor_initMembers','create','exit','updateScale','opacity','includes','type','iconWidth','picture','version','anchor','_scene','waveDistance','frameCount','scale','FUNC','Sprite_Battler_setBattler','match','constructor','NUM','bitmap','BattleCursor','width','determineFrameColsRows','_cache','_battlerContainer','bind','positionY','registerCommand','waveType','pictureFilename','_battleSelectCursorSprite','addLoadListener','map','Settings','_battleCursorContainer','system','updateFrameIcon','isSelected','updateBattler','name','Spriteset_Battle_createBattleFieldContainer','middle','iconIndex','updateWave','right','call','toLowerCase','none','updateFrameColsRows','description','loadBitmap','ConvertParams','ActorCursor','max','updateBattleCursorContainer','initialize','filter','setFrame','bottom','anchorX','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','IconSet','update','parse','initMembers','_frameMax','prototype','_settings','parent','horz','PartyIndex','BattleCursorChangeEnemySettings','makeDeepCopy','trim','actor','iconHeight','STR','loadSystem','updateOpacity','systemFilename','createBattleFieldContainer','ActorIDs','offsetX','_baseSprite','EVAL','findTargetSprite','createBattleSelectCursor','floor','ARRAYJSON','applyBattleCursorNotetags','EnemyIndex','top','frameDelay','ARRAYNUM','VisuMZ_1_BattleCore','setBase','height','_spriteset','ARRAYEVAL','updateBattleSelectCursor','Spriteset_Battle_update','anchorY','JSON','note','_actorSprites','left','_frameRows','_battleField','waveSpeed','icon','_frameCols','cos','updateAnchor'];(function(_0x322b4c,_0x188a45){const _0x311e8b=function(_0x3568cb){while(--_0x3568cb){_0x322b4c['push'](_0x322b4c['shift']());}};_0x311e8b(++_0x188a45);}(_0x311e,0x7c));const _0x3568=function(_0x322b4c,_0x188a45){_0x322b4c=_0x322b4c-0x1ab;let _0x311e8b=_0x311e[_0x322b4c];return _0x311e8b;};const _0x1d6f4e=_0x3568;var label=_0x1d6f4e(0x1f2),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1d6f4e(0x216)](function(_0x2e13fc){const _0x4a4d7e=_0x1d6f4e;return _0x2e13fc[_0x4a4d7e(0x1d4)]&&_0x2e13fc[_0x4a4d7e(0x20f)][_0x4a4d7e(0x1e2)]('['+label+']');})[0x0];VisuMZ[label][_0x1d6f4e(0x1ff)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x1d6f4e(0x211)]=function(_0x258f47,_0x4d0bc6){const _0x3771c8=_0x1d6f4e;for(const _0x419589 in _0x4d0bc6){if(_0x419589[_0x3771c8(0x1ee)](/(.*):(.*)/i)){const _0x142521=String(RegExp['$1']),_0x19e4cf=String(RegExp['$2'])[_0x3771c8(0x1da)]()['trim']();let _0xb1a1d0,_0x2f1463,_0x3148fc;switch(_0x19e4cf){case _0x3771c8(0x1f0):_0xb1a1d0=_0x4d0bc6[_0x419589]!==''?Number(_0x4d0bc6[_0x419589]):0x0;break;case _0x3771c8(0x1ab):_0x2f1463=_0x4d0bc6[_0x419589]!==''?JSON[_0x3771c8(0x21d)](_0x4d0bc6[_0x419589]):[],_0xb1a1d0=_0x2f1463['map'](_0x1e02eb=>Number(_0x1e02eb));break;case _0x3771c8(0x232):_0xb1a1d0=_0x4d0bc6[_0x419589]!==''?eval(_0x4d0bc6[_0x419589]):null;break;case _0x3771c8(0x1b0):_0x2f1463=_0x4d0bc6[_0x419589]!==''?JSON[_0x3771c8(0x21d)](_0x4d0bc6[_0x419589]):[],_0xb1a1d0=_0x2f1463[_0x3771c8(0x1fe)](_0x3f6657=>eval(_0x3f6657));break;case _0x3771c8(0x1b4):_0xb1a1d0=_0x4d0bc6[_0x419589]!==''?JSON['parse'](_0x4d0bc6[_0x419589]):'';break;case _0x3771c8(0x236):_0x2f1463=_0x4d0bc6[_0x419589]!==''?JSON[_0x3771c8(0x21d)](_0x4d0bc6[_0x419589]):[],_0xb1a1d0=_0x2f1463['map'](_0x5decaa=>JSON['parse'](_0x5decaa));break;case _0x3771c8(0x1ec):_0xb1a1d0=_0x4d0bc6[_0x419589]!==''?new Function(JSON[_0x3771c8(0x21d)](_0x4d0bc6[_0x419589])):new Function('return\x200');break;case _0x3771c8(0x1d9):_0x2f1463=_0x4d0bc6[_0x419589]!==''?JSON[_0x3771c8(0x21d)](_0x4d0bc6[_0x419589]):[],_0xb1a1d0=_0x2f1463[_0x3771c8(0x1fe)](_0x1e184b=>new Function(JSON[_0x3771c8(0x21d)](_0x1e184b)));break;case _0x3771c8(0x22a):_0xb1a1d0=_0x4d0bc6[_0x419589]!==''?String(_0x4d0bc6[_0x419589]):'';break;case _0x3771c8(0x1bf):_0x2f1463=_0x4d0bc6[_0x419589]!==''?JSON[_0x3771c8(0x21d)](_0x4d0bc6[_0x419589]):[],_0xb1a1d0=_0x2f1463[_0x3771c8(0x1fe)](_0x28bebd=>String(_0x28bebd));break;case _0x3771c8(0x1ce):_0x3148fc=_0x4d0bc6[_0x419589]!==''?JSON['parse'](_0x4d0bc6[_0x419589]):{},_0xb1a1d0=VisuMZ['ConvertParams']({},_0x3148fc);break;case'ARRAYSTRUCT':_0x2f1463=_0x4d0bc6[_0x419589]!==''?JSON[_0x3771c8(0x21d)](_0x4d0bc6[_0x419589]):[],_0xb1a1d0=_0x2f1463[_0x3771c8(0x1fe)](_0x51a2c1=>VisuMZ[_0x3771c8(0x211)]({},JSON[_0x3771c8(0x21d)](_0x51a2c1)));break;default:continue;}_0x258f47[_0x142521]=_0xb1a1d0;}}return _0x258f47;},(_0x56e20e=>{const _0x422cd4=_0x1d6f4e,_0x17fbca=_0x56e20e[_0x422cd4(0x205)];for(const _0x14255d of dependencies){if(!Imported[_0x14255d]){alert(_0x422cd4(0x21a)[_0x422cd4(0x1cf)](_0x17fbca,_0x14255d)),SceneManager[_0x422cd4(0x1df)]();break;}}const _0x290734=_0x56e20e[_0x422cd4(0x20f)];if(_0x290734[_0x422cd4(0x1ee)](/\[Version[ ](.*?)\]/i)){const _0x230c48=Number(RegExp['$1']);_0x230c48!==VisuMZ[label][_0x422cd4(0x1e6)]&&(alert(_0x422cd4(0x1c8)['format'](_0x17fbca,_0x230c48)),SceneManager[_0x422cd4(0x1df)]());}if(_0x290734[_0x422cd4(0x1ee)](/\[Tier[ ](\d+)\]/i)){const _0xd4cac2=Number(RegExp['$1']);_0xd4cac2<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x422cd4(0x1cf)](_0x17fbca,_0xd4cac2,tier)),SceneManager[_0x422cd4(0x1df)]()):tier=Math['max'](_0xd4cac2,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x422cd4(0x1ff)],_0x56e20e[_0x422cd4(0x1cd)]);})(pluginData),PluginManager[_0x1d6f4e(0x1f9)](pluginData[_0x1d6f4e(0x205)],_0x1d6f4e(0x1c6),_0x441a91=>{const _0x39fefc=_0x1d6f4e;VisuMZ[_0x39fefc(0x211)](_0x441a91,_0x441a91);const _0x585eec=JsonEx['makeDeepCopy'](_0x441a91);_0x585eec['ActorIDs']=undefined;const _0x4d4462=_0x441a91[_0x39fefc(0x22f)][_0x39fefc(0x1fe)](_0x37fd47=>$gameActors[_0x39fefc(0x228)](_0x37fd47));for(const _0x1ca6ad of _0x4d4462){if(!_0x1ca6ad)continue;_0x1ca6ad[_0x39fefc(0x1dc)](_0x585eec);if(SceneManager['isSceneBattle']()){const _0x8dbe46=SceneManager[_0x39fefc(0x1e8)];if(!_0x8dbe46)continue;const _0x4cd517=_0x8dbe46[_0x39fefc(0x1af)];if(!_0x4cd517)continue;const _0x55ddcf=_0x4cd517['findTargetSprite'](_0x1ca6ad);if(_0x55ddcf)_0x55ddcf[_0x39fefc(0x1b1)]();}}}),PluginManager['registerCommand'](pluginData['name'],_0x1d6f4e(0x1d3),_0x812ab8=>{const _0x27f53b=_0x1d6f4e;VisuMZ[_0x27f53b(0x211)](_0x812ab8,_0x812ab8);const _0x12fb52=JsonEx[_0x27f53b(0x226)](_0x812ab8);_0x12fb52[_0x27f53b(0x224)]=undefined;const _0x1a8c49=_0x812ab8['PartyIndex'][_0x27f53b(0x1fe)](_0x211531=>$gameParty[_0x27f53b(0x1db)]()[_0x211531]);for(const _0x3bdad0 of _0x1a8c49){if(!_0x3bdad0)continue;_0x3bdad0[_0x27f53b(0x1dc)](_0x12fb52);if(SceneManager[_0x27f53b(0x1d8)]()){const _0x236d77=SceneManager[_0x27f53b(0x1e8)];if(!_0x236d77)continue;const _0x30dbb4=_0x236d77['_spriteset'];if(!_0x30dbb4)continue;const _0x5f197c=_0x30dbb4['findTargetSprite'](_0x3bdad0);if(_0x5f197c)_0x5f197c[_0x27f53b(0x1b1)]();}}}),PluginManager[_0x1d6f4e(0x1f9)](pluginData[_0x1d6f4e(0x205)],_0x1d6f4e(0x225),_0x46523a=>{const _0x78eaa8=_0x1d6f4e;if(!SceneManager[_0x78eaa8(0x1d8)]())return;VisuMZ[_0x78eaa8(0x211)](_0x46523a,_0x46523a);const _0x2d5194=JsonEx['makeDeepCopy'](_0x46523a);_0x2d5194[_0x78eaa8(0x238)]=undefined;const _0x75bb49=_0x46523a['EnemyIndex'][_0x78eaa8(0x1fe)](_0x2b0f22=>$gameTroop[_0x78eaa8(0x1db)]()[_0x2b0f22]);for(const _0x54ce29 of _0x75bb49){if(!_0x54ce29)continue;_0x54ce29['setBattleCursor'](_0x2d5194);if(SceneManager[_0x78eaa8(0x1d8)]()){const _0x53278f=SceneManager['_scene'];if(!_0x53278f)continue;const _0x4405d5=_0x53278f['_spriteset'];if(!_0x4405d5)continue;const _0x53cf67=_0x4405d5[_0x78eaa8(0x233)](_0x54ce29);if(_0x53cf67)_0x53cf67[_0x78eaa8(0x1b1)]();}}}),SceneManager[_0x1d6f4e(0x1d8)]=function(){const _0x4730ed=_0x1d6f4e;return this[_0x4730ed(0x1e8)]&&this['_scene'][_0x4730ed(0x1ef)]===Scene_Battle;},Game_BattlerBase['prototype']['battleCursor']=function(){const _0x17842e=_0x1d6f4e;return!this[_0x17842e(0x1c4)]&&this[_0x17842e(0x1d6)](),this['_battleCursorData'];},Game_BattlerBase[_0x1d6f4e(0x220)]['createBattleCursorData']=function(){const _0x5219ad=_0x1d6f4e;this[_0x5219ad(0x1c4)]={'type':_0x5219ad(0x1bb),'iconIndex':0x70,'pictureFilename':'','systemFilename':'','frameDelay':0xf4240,'anchorX':'right','anchorY':_0x5219ad(0x207),'positionX':_0x5219ad(0x1b7),'positionY':_0x5219ad(0x207),'offsetX':0x0,'offsetY':0x0,'waveType':_0x5219ad(0x223),'waveSpeed':0.05,'waveDistance':0xa};},Game_BattlerBase[_0x1d6f4e(0x220)][_0x1d6f4e(0x1dc)]=function(_0x287a38){this['_battleCursorData']=_0x287a38;},Game_Battler[_0x1d6f4e(0x220)][_0x1d6f4e(0x237)]=function(_0x3f1465){const _0x34b76c=_0x1d6f4e;if(!_0x3f1465)return;const _0x43eb76=this[_0x34b76c(0x1c4)];_0x3f1465[_0x34b76c(0x1ee)](/<BATTLE (?:SELECT CURSOR|CURSOR) ICON:[ ](.*)>/i)&&(this['_battleCursorData']['type']=_0x34b76c(0x1bb),this[_0x34b76c(0x1c4)]['iconIndex']=Number(RegExp['$1']));_0x3f1465[_0x34b76c(0x1ee)](/<BATTLE (?:SELECT CURSOR|CURSOR) PICTURE:[ ](.*)>/i)&&(this['_battleCursorData'][_0x34b76c(0x1e3)]='picture',this[_0x34b76c(0x1c4)][_0x34b76c(0x1fb)]=String(RegExp['$1'])[_0x34b76c(0x227)]());_0x3f1465[_0x34b76c(0x1ee)](/<BATTLE (?:SELECT CURSOR|CURSOR) SYSTEM:[ ](.*)>/i)&&(this[_0x34b76c(0x1c4)][_0x34b76c(0x1e3)]='system',this['_battleCursorData'][_0x34b76c(0x22d)]=String(RegExp['$1'])[_0x34b76c(0x227)]());_0x3f1465[_0x34b76c(0x1ee)](/<BATTLE (?:SELECT CURSOR|CURSOR) FRAME DELAY:[ ](.*)>/i)&&(this[_0x34b76c(0x1c4)]['frameDelay']=Number(RegExp['$1']));if(_0x3f1465[_0x34b76c(0x1ee)](/<BATTLE (?:SELECT CURSOR|CURSOR) ANCHOR X:[ ](.*)>/i)){const _0x49d7b9=String(RegExp['$1'])[_0x34b76c(0x20c)]()[_0x34b76c(0x227)]();['left',_0x34b76c(0x1c0),_0x34b76c(0x20a)][_0x34b76c(0x1e2)](_0x49d7b9)&&(this['_battleCursorData']['anchorX']=_0x49d7b9);}if(_0x3f1465[_0x34b76c(0x1ee)](/<BATTLE (?:SELECT CURSOR|CURSOR) ANCHOR Y:[ ](.*)>/i)){const _0x4b8093=String(RegExp['$1'])[_0x34b76c(0x20c)]()[_0x34b76c(0x227)]();['top',_0x34b76c(0x207),'bottom'][_0x34b76c(0x1e2)](_0x4b8093)&&(this[_0x34b76c(0x1c4)][_0x34b76c(0x1b3)]=_0x4b8093);}if(_0x3f1465[_0x34b76c(0x1ee)](/<BATTLE (?:SELECT CURSOR|CURSOR) POSITION X:[ ](.*)>/i)){const _0x2fd2a3=String(RegExp['$1'])[_0x34b76c(0x20c)]()[_0x34b76c(0x227)]();['left',_0x34b76c(0x1c0),_0x34b76c(0x20a)][_0x34b76c(0x1e2)](_0x2fd2a3)&&(this['_battleCursorData'][_0x34b76c(0x1c2)]=_0x2fd2a3);}if(_0x3f1465[_0x34b76c(0x1ee)](/<BATTLE (?:SELECT CURSOR|CURSOR) POSITION Y:[ ](.*)>/i)){const _0x5be378=String(RegExp['$1'])[_0x34b76c(0x20c)]()['trim']();[_0x34b76c(0x239),_0x34b76c(0x207),_0x34b76c(0x218)][_0x34b76c(0x1e2)](_0x5be378)&&(this['_battleCursorData'][_0x34b76c(0x1f8)]=_0x5be378);}_0x3f1465['match'](/<BATTLE (?:SELECT CURSOR|CURSOR) OFFSET X:[ ](.*)>/i)&&(this[_0x34b76c(0x1c4)][_0x34b76c(0x230)]=Number(RegExp['$1'])),_0x3f1465[_0x34b76c(0x1ee)](/<BATTLE (?:SELECT CURSOR|CURSOR) OFFSET Y:[ ](.*)>/i)&&(this[_0x34b76c(0x1c4)]['offsetY']=Number(RegExp['$1'])),_0x3f1465[_0x34b76c(0x1ee)](/<BATTLE (?:SELECT CURSOR|CURSOR) (?:NO|NONE) WAVE>/i)&&(this['_battleCursorData']['waveType']=_0x34b76c(0x20d),this[_0x34b76c(0x1c4)]['waveDistance']=0x1),_0x3f1465[_0x34b76c(0x1ee)](/<BATTLE (?:SELECT CURSOR|CURSOR) (?:HORZ|HORIZONTAL) WAVE:[ ](.*)>/i)&&(this[_0x34b76c(0x1c4)][_0x34b76c(0x1fa)]=_0x34b76c(0x223),this[_0x34b76c(0x1c4)][_0x34b76c(0x1e9)]=Number(RegExp['$1'])),_0x3f1465[_0x34b76c(0x1ee)](/<BATTLE (?:SELECT CURSOR|CURSOR) (?:VERT|VERTICAL) WAVE:[ ](.*)>/i)&&(this[_0x34b76c(0x1c4)][_0x34b76c(0x1fa)]='vert',this[_0x34b76c(0x1c4)][_0x34b76c(0x1e9)]=Number(RegExp['$1'])),_0x3f1465[_0x34b76c(0x1ee)](/<BATTLE (?:SELECT CURSOR|CURSOR) WAVE SPEED:[ ](.*)>/i)&&(this['_battleCursorData'][_0x34b76c(0x1ba)]=Number(RegExp['$1'])),this[_0x34b76c(0x1c4)][_0x34b76c(0x23a)]=Math[_0x34b76c(0x213)](0x1,this['_battleCursorData'][_0x34b76c(0x23a)]),this['_battleCursorData'][_0x34b76c(0x1e3)]==='icon'&&(this['_battleCursorData'][_0x34b76c(0x23a)]=0x186a0);},Game_Actor[_0x1d6f4e(0x220)][_0x1d6f4e(0x1d6)]=function(){const _0x13226a=_0x1d6f4e;this[_0x13226a(0x1c4)]=JsonEx[_0x13226a(0x226)](VisuMZ[_0x13226a(0x1f2)]['Settings'][_0x13226a(0x212)]),this[_0x13226a(0x237)](this['actor']()['note']);},Game_Enemy['prototype'][_0x1d6f4e(0x1d6)]=function(){const _0x3af45c=_0x1d6f4e;this['_battleCursorData']=JsonEx[_0x3af45c(0x226)](VisuMZ['BattleCursor']['Settings'][_0x3af45c(0x1d0)]),this[_0x3af45c(0x237)](this[_0x3af45c(0x1d5)]()[_0x3af45c(0x1b5)]);},Sprite_Battler[_0x1d6f4e(0x220)]['createBattleSelectCursor']=function(){const _0x3a7002=_0x1d6f4e;this['_battleSelectCursorSprite']=new Sprite_BattleSelectCursor(),this[_0x3a7002(0x1fc)][_0x3a7002(0x1ad)](this),this[_0x3a7002(0x1cb)](this[_0x3a7002(0x1fc)]);},VisuMZ[_0x1d6f4e(0x1f2)][_0x1d6f4e(0x1ed)]=Sprite_Battler['prototype']['setBattler'],Sprite_Battler[_0x1d6f4e(0x220)][_0x1d6f4e(0x1d2)]=function(_0x5bfac3){const _0x1d9a92=_0x1d6f4e;VisuMZ[_0x1d9a92(0x1f2)]['Sprite_Battler_setBattler'][_0x1d9a92(0x20b)](this,_0x5bfac3),this[_0x1d9a92(0x1fc)]&&this[_0x1d9a92(0x1fc)][_0x1d9a92(0x1d2)](_0x5bfac3);},Sprite_Battler[_0x1d6f4e(0x220)][_0x1d6f4e(0x1b1)]=function(){const _0x55002a=_0x1d6f4e;if(!this[_0x55002a(0x1fc)])return;this[_0x55002a(0x1fc)][_0x55002a(0x204)]();},VisuMZ[_0x1d6f4e(0x1f2)][_0x1d6f4e(0x1dd)]=Sprite_Actor[_0x1d6f4e(0x220)]['initMembers'],Sprite_Actor[_0x1d6f4e(0x220)][_0x1d6f4e(0x21e)]=function(){const _0x867965=_0x1d6f4e;VisuMZ[_0x867965(0x1f2)][_0x867965(0x1dd)]['call'](this);if(Imported[_0x867965(0x1ac)]&&this[_0x867965(0x1ef)]===Sprite_SvEnemy)return;this['createBattleSelectCursor']();},VisuMZ[_0x1d6f4e(0x1f2)][_0x1d6f4e(0x1d7)]=Sprite_Enemy['prototype']['initMembers'],Sprite_Enemy['prototype'][_0x1d6f4e(0x21e)]=function(){const _0xdc3635=_0x1d6f4e;VisuMZ[_0xdc3635(0x1f2)][_0xdc3635(0x1d7)][_0xdc3635(0x20b)](this),this[_0xdc3635(0x234)]();},VisuMZ[_0x1d6f4e(0x1f2)]['Spriteset_Battle_createBattleFieldContainer']=Spriteset_Battle[_0x1d6f4e(0x220)][_0x1d6f4e(0x22e)],Spriteset_Battle[_0x1d6f4e(0x220)]['createBattleFieldContainer']=function(){const _0x1c573f=_0x1d6f4e;VisuMZ[_0x1c573f(0x1f2)][_0x1c573f(0x206)]['call'](this),this[_0x1c573f(0x200)]=new Sprite(),this[_0x1c573f(0x1b9)][_0x1c573f(0x1cb)](this[_0x1c573f(0x200)]);},VisuMZ[_0x1d6f4e(0x1f2)]['Spriteset_Battle_adjustFlippedBattlefield']=Spriteset_Battle[_0x1d6f4e(0x220)][_0x1d6f4e(0x1cc)],Spriteset_Battle[_0x1d6f4e(0x220)][_0x1d6f4e(0x1cc)]=function(){const _0x556df5=_0x1d6f4e;VisuMZ['BattleCursor']['Spriteset_Battle_adjustFlippedBattlefield'][_0x556df5(0x20b)](this),this[_0x556df5(0x200)]&&this['_battlerContainer']&&(this[_0x556df5(0x200)][_0x556df5(0x1eb)]['x']=this[_0x556df5(0x1f6)]['scale']['x'],this['_battleCursorContainer']['scale']['y']=this[_0x556df5(0x1f6)][_0x556df5(0x1eb)]['y'],this[_0x556df5(0x200)]['x']=this['_battlerContainer']['x'],this[_0x556df5(0x200)]['y']=this[_0x556df5(0x1f6)]['y']);},VisuMZ[_0x1d6f4e(0x1f2)][_0x1d6f4e(0x1b2)]=Spriteset_Battle[_0x1d6f4e(0x220)][_0x1d6f4e(0x21c)],Spriteset_Battle[_0x1d6f4e(0x220)]['update']=function(){const _0x567aa2=_0x1d6f4e;VisuMZ[_0x567aa2(0x1f2)][_0x567aa2(0x1b2)]['call'](this),this[_0x567aa2(0x214)]();},Spriteset_Battle['prototype'][_0x1d6f4e(0x214)]=function(){const _0x59bb13=_0x1d6f4e;if(!this[_0x59bb13(0x200)])return;const _0x55e0e8=this[_0x59bb13(0x1b6)]['concat'](this[_0x59bb13(0x1ca)]);for(const _0x2c904b of _0x55e0e8){if(!_0x2c904b)continue;const _0x17aeec=_0x2c904b['_battleSelectCursorSprite'];_0x17aeec&&this['_battleCursorContainer']['addChild'](_0x17aeec);}};function Sprite_BattleSelectCursor(){const _0xd185d2=_0x1d6f4e;this[_0xd185d2(0x215)](...arguments);}Sprite_BattleSelectCursor[_0x1d6f4e(0x220)]=Object[_0x1d6f4e(0x1de)](Sprite[_0x1d6f4e(0x220)]),Sprite_BattleSelectCursor[_0x1d6f4e(0x220)][_0x1d6f4e(0x1ef)]=Sprite_BattleSelectCursor,Sprite_BattleSelectCursor['prototype']['initialize']=function(){const _0x3d5a7c=_0x1d6f4e;Sprite[_0x3d5a7c(0x220)][_0x3d5a7c(0x215)][_0x3d5a7c(0x20b)](this),this[_0x3d5a7c(0x21e)]();},Sprite_BattleSelectCursor[_0x1d6f4e(0x220)][_0x1d6f4e(0x21e)]=function(){const _0x226c2f=_0x1d6f4e;this[_0x226c2f(0x1c3)]=null,this['_settings']=null,this['_frameIndex']=0x0,this[_0x226c2f(0x1bc)]=0x1,this[_0x226c2f(0x1b8)]=0x1,this[_0x226c2f(0x21f)]=0x1,this[_0x226c2f(0x1f5)]={'scale':{'x':0x1,'y':0x1}},this['opacity']=0x0;},Sprite_BattleSelectCursor[_0x1d6f4e(0x220)][_0x1d6f4e(0x1ad)]=function(_0x2eebd8){const _0x53f7f6=_0x1d6f4e;this[_0x53f7f6(0x231)]=_0x2eebd8;},Sprite_BattleSelectCursor[_0x1d6f4e(0x220)][_0x1d6f4e(0x1d2)]=function(_0x56a485){const _0x4c271e=_0x1d6f4e;if(this[_0x4c271e(0x1c3)]===_0x56a485)return;this['_battler']=_0x56a485,this[_0x4c271e(0x1c3)]?this[_0x4c271e(0x204)]():this[_0x4c271e(0x221)]=null;},Sprite_BattleSelectCursor[_0x1d6f4e(0x220)][_0x1d6f4e(0x204)]=function(){const _0x18c8e1=_0x1d6f4e;this[_0x18c8e1(0x221)]=this[_0x18c8e1(0x1c3)]['battleCursor'](),this[_0x18c8e1(0x1be)](),this[_0x18c8e1(0x210)]();},Sprite_BattleSelectCursor[_0x1d6f4e(0x220)][_0x1d6f4e(0x1be)]=function(){const _0x254bc6=_0x1d6f4e;switch(this[_0x254bc6(0x221)][_0x254bc6(0x219)]){case _0x254bc6(0x1b7):this[_0x254bc6(0x1e7)]['x']=0x0;break;case _0x254bc6(0x1c0):this[_0x254bc6(0x1e7)]['x']=0.5;break;case _0x254bc6(0x20a):this[_0x254bc6(0x1e7)]['x']=0x1;break;}switch(this[_0x254bc6(0x221)][_0x254bc6(0x1b3)]){case _0x254bc6(0x239):this[_0x254bc6(0x1e7)]['y']=0x0;break;case _0x254bc6(0x207):this['anchor']['y']=0.5;break;case _0x254bc6(0x218):this['anchor']['y']=0x1;break;}},Sprite_BattleSelectCursor['prototype']['loadBitmap']=function(){const _0x25bfd9=_0x1d6f4e;if(!this[_0x25bfd9(0x221)])return;switch(this[_0x25bfd9(0x221)][_0x25bfd9(0x1e3)]){case _0x25bfd9(0x1bb):this['bitmap']=ImageManager[_0x25bfd9(0x22b)](_0x25bfd9(0x21b));break;case _0x25bfd9(0x1e5):this[_0x25bfd9(0x1f1)]=ImageManager[_0x25bfd9(0x1c9)](this[_0x25bfd9(0x221)]['pictureFilename']),this['determineFrameColsRows'](this[_0x25bfd9(0x221)][_0x25bfd9(0x1fb)]);break;case _0x25bfd9(0x201):this[_0x25bfd9(0x1f1)]=ImageManager[_0x25bfd9(0x22b)](this['_settings']['systemFilename']),this[_0x25bfd9(0x1f4)](this[_0x25bfd9(0x221)][_0x25bfd9(0x22d)]);break;}this[_0x25bfd9(0x1c5)]=0x0,this[_0x25bfd9(0x1f1)][_0x25bfd9(0x1fd)](this[_0x25bfd9(0x1c1)][_0x25bfd9(0x1f7)](this,!![]));},Sprite_BattleSelectCursor['prototype']['determineFrameColsRows']=function(_0x27774f){const _0xa82ad7=_0x1d6f4e;_0x27774f[_0xa82ad7(0x1ee)](/\[(\d+)x(\d+)\]/i)?(this[_0xa82ad7(0x1bc)]=Math['max'](0x1,Number(RegExp['$1'])),this[_0xa82ad7(0x1b8)]=Math[_0xa82ad7(0x213)](0x1,Number(RegExp['$2']))):(this[_0xa82ad7(0x1bc)]=0x1,this[_0xa82ad7(0x1b8)]=0x1),this[_0xa82ad7(0x21f)]=this['_frameCols']*this['_frameRows'];},Sprite_BattleSelectCursor[_0x1d6f4e(0x220)][_0x1d6f4e(0x21c)]=function(){const _0xcd44f1=_0x1d6f4e;Sprite['prototype']['update'][_0xcd44f1(0x20b)](this),this[_0xcd44f1(0x1c3)]&&this[_0xcd44f1(0x1f1)]&&this[_0xcd44f1(0x1f1)]['width']>0x0?(this[_0xcd44f1(0x22c)](),this[_0xcd44f1(0x1e0)](),this['updateFrame'](),this[_0xcd44f1(0x1d1)](),this[_0xcd44f1(0x209)]()):this['opacity']=0x0;},Sprite_BattleSelectCursor[_0x1d6f4e(0x220)]['updateOpacity']=function(){const _0x2b3da5=_0x1d6f4e;this['opacity']=this[_0x2b3da5(0x1c3)][_0x2b3da5(0x203)]()?0xff:0x0;},Sprite_BattleSelectCursor[_0x1d6f4e(0x220)][_0x1d6f4e(0x1e0)]=function(){const _0xb1b89d=_0x1d6f4e;if(!this[_0xb1b89d(0x222)])return;if(this[_0xb1b89d(0x1e1)]<=0x0)return;if(this[_0xb1b89d(0x1f5)]['scale']['x']===this[_0xb1b89d(0x222)][_0xb1b89d(0x1eb)]['x']&&this[_0xb1b89d(0x1f5)][_0xb1b89d(0x1eb)]['y']===this[_0xb1b89d(0x222)][_0xb1b89d(0x1eb)]['y'])return;this[_0xb1b89d(0x1eb)]['x']=0x1/this[_0xb1b89d(0x222)][_0xb1b89d(0x1eb)]['x'],this[_0xb1b89d(0x1eb)]['y']=0x1/this[_0xb1b89d(0x222)][_0xb1b89d(0x1eb)]['y'],this[_0xb1b89d(0x1f5)][_0xb1b89d(0x1eb)]['x']=this[_0xb1b89d(0x222)][_0xb1b89d(0x1eb)]['x'],this[_0xb1b89d(0x1f5)][_0xb1b89d(0x1eb)]['y']=this[_0xb1b89d(0x222)]['scale']['y'];},Sprite_BattleSelectCursor[_0x1d6f4e(0x220)]['updateFrame']=function(_0x15e1ce){const _0x265da4=_0x1d6f4e;if(!_0x15e1ce){if(Graphics[_0x265da4(0x1ea)]%this[_0x265da4(0x221)][_0x265da4(0x23a)]>0x0)return;}switch(this[_0x265da4(0x221)]['type']){case'icon':this[_0x265da4(0x202)]();break;case _0x265da4(0x1e5):case _0x265da4(0x201):this[_0x265da4(0x20e)]();break;};},Sprite_BattleSelectCursor[_0x1d6f4e(0x220)][_0x1d6f4e(0x202)]=function(){const _0x2f190c=_0x1d6f4e,_0x3ad68d=this['_settings'][_0x2f190c(0x208)],_0x1bc2a0=ImageManager[_0x2f190c(0x1e4)],_0x958177=ImageManager[_0x2f190c(0x229)],_0x310045=_0x3ad68d%0x10*_0x1bc2a0,_0x7f8c29=Math['floor'](_0x3ad68d/0x10)*_0x958177;this['setFrame'](_0x310045,_0x7f8c29,_0x1bc2a0,_0x958177);},Sprite_BattleSelectCursor['prototype'][_0x1d6f4e(0x20e)]=function(){const _0x4b9fdd=_0x1d6f4e;this['_frameIndex']++;if(this['_frameIndex']>=this[_0x4b9fdd(0x21f)])this[_0x4b9fdd(0x1c5)]=0x0;var _0x2530fd=this[_0x4b9fdd(0x1f1)]['width']/this['_frameCols'],_0x53bd43=this['bitmap']['height']/this[_0x4b9fdd(0x1b8)],_0x1d3aff=this[_0x4b9fdd(0x1c5)]%this[_0x4b9fdd(0x1bc)]*_0x2530fd,_0x558e1e=Math[_0x4b9fdd(0x235)](this[_0x4b9fdd(0x1c5)]/this['_frameCols'])*_0x53bd43;this[_0x4b9fdd(0x217)](_0x1d3aff,_0x558e1e,_0x2530fd,_0x53bd43);},Sprite_BattleSelectCursor[_0x1d6f4e(0x220)][_0x1d6f4e(0x1d1)]=function(){const _0xcb8764=_0x1d6f4e;if(!this[_0xcb8764(0x222)])return;const _0x118519=this[_0xcb8764(0x231)]?this[_0xcb8764(0x231)]:this['parent'],_0x17cb9e=_0x118519[_0xcb8764(0x1f3)],_0x4bf038=_0x118519[_0xcb8764(0x1ae)];switch(this[_0xcb8764(0x221)][_0xcb8764(0x1c2)]){case'left':this['x']=_0x118519['x']+_0x17cb9e/-0x2;break;case _0xcb8764(0x1c0):this['x']=_0x118519['x']+0x0;break;case _0xcb8764(0x20a):this['x']=_0x118519['x']+_0x17cb9e/0x2;break;}switch(this[_0xcb8764(0x221)]['positionY']){case _0xcb8764(0x239):this['y']=_0x118519['y']+_0x4bf038*-0x1;break;case _0xcb8764(0x207):this['y']=_0x118519['y']+_0x4bf038/-0x2;break;case'bottom':this['y']=_0x118519['y']+0x0;break;}this['x']+=this['_settings'][_0xcb8764(0x230)],this['y']+=this[_0xcb8764(0x221)][_0xcb8764(0x1c7)];},Sprite_BattleSelectCursor[_0x1d6f4e(0x220)][_0x1d6f4e(0x209)]=function(){const _0x38b462=_0x1d6f4e,_0x6ba32c=this['_settings']['waveType'];if(_0x6ba32c==='none')return;if(this[_0x38b462(0x221)][_0x38b462(0x1e9)]<=0x0)return;const _0x1ffa44=this['_settings']['waveDistance'],_0x334003=this['_settings']['waveSpeed'],_0x1e9ddf=Math['round'](Math[_0x38b462(0x1bd)](Graphics['frameCount']*_0x334003)*_0x1ffa44);if(_0x6ba32c==='horz')this['x']+=_0x1e9ddf;else _0x6ba32c==='vert'&&(this['y']+=_0x1e9ddf);};