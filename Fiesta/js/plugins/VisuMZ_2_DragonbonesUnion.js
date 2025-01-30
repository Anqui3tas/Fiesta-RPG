//=============================================================================
// VisuStella MZ - Dragonbones Union
// VisuMZ_2_DragonbonesUnion.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_DragonbonesUnion = true;

var VisuMZ = VisuMZ || {};
VisuMZ.DragonbonesUnion = VisuMZ.DragonbonesUnion || {};
VisuMZ.DragonbonesUnion.version = 1.12;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.12] [DragonbonesUnion]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Dragonbones_Union_VisuStella_MZ
 * @base Public_0_Dragonbones
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter Public_0_Dragonbones
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * DragonBones allows your games to use skeletal animation, a type of computer
 * animation in which a character (or object) is represented by skins/textures
 * and a digital set of interconnected bones (called the skeleton). Using a set
 * of instructions, the game will create animations based off these skins,
 * skeletons, and instructions to create beautifully smooth and light-weight
 * movements.
 *
 * This plugin gives you such control over various facets of your game: the
 * battle system, event pictures, and map sprites for characters. Various
 * plugin commands, notetags, and comment tags are added through this plugin to
 * give you as much control as you need over Dragonbones from the RPG Maker MZ
 * editor itself.
 *
 * The version of Dragonbones used for this plugin is 5.7.002b.
 * More information can be found at http://dragonbones.com/
 *
 * Features include all (but not limited to) the following:
 * 
 * - Adds Dragonbones support to RPG Maker MZ.
 * - Dragonbones armatures can be used as battler sprites.
 * - Dragonbones armatures can be attached to event pictures.
 * - Dragonbones armatures can be inserted into the map as character sprites.
 * - A variety of Plugin Parameters, Notetags, and Plugin Commands to control
 *   the Dragonbones armatures and their animations.
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
 * - Dragonbones*
 *
 * *Note* You can download this library from the below URL or from the
 * Dragonbones Union product page. Install it as a Tier 0 plugin.
 *
 * URL: https://www.npmjs.com/package/pixi5-dragonbones/v/5.7.0-2b
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Dragonbones Naming
 * ============================================================================
 *
 * If you are trying to set up a Dragonbones armature through notetags, Plugin
 * Commands, etc., and are getting the error message "Cannot Read property
 * 'parent' of null", then most likely, the incorrect Dragonbones armature name
 * is being used.
 *
 * ---
 * 
 * To find the Proper Name:
 * 
 * 1. Open up the Dragonbones armature in the Dragonbones editor.
 * 
 * ---
 * 
 * 2. Open the armature's Properties.
 * 
 * ---
 * 
 * 3. Look at what the "Name:" field lists. This is the name to use with the
 *    Dragonbones Union plugin.
 * 
 * ---
 *
 * ============================================================================
 * Dragonbones Armature Behaviors
 * ============================================================================
 *
 * Dragonbones armatures have certain behaviors when used with battlers,
 * pictures, and/or map sprites.
 *
 * ---
 *
 * 1. When a Dragonbones armature is loaded, it will play the 'idle' animation
 *    or whatever is set inside the Plugin Parameters => General Settings =>
 *    Loaded Animation field upon loading. Make your Dragonbones armatures with
 *    this in mind. At other times, the 'idle' animation will be used as a base
 *    defaulting animation.
 *
 * ---
 *
 * 2. The Dragonbones armature will always be anchored at the X, Y coordinates
 *    of the target. This X, Y coordinate point will be where the root/pivot
 *    point of the Dragonbones armature will be located.
 *
 * ---
 *
 * 3. The properties used by a sprite (ie the opacity, scale, rotation, and
 *    tint) will also be shared and/or amplified with the Dragonbones armature.
 *    The exception to this will be Blend Modes aren't supported.
 *
 * ---
 *
 * ============================================================================
 * IMPORTANT!! Dragonbones Armatures as Map Sprites
 * ============================================================================
 *
 * If you plan on using Dragonbones armatures as map sprites, please keep in
 * mind that there will be certain limitations and properties regarding them,
 * which will be listed below:
 *
 * ---
 *
 * 1. Try not to use more than 99 vertices for meshes. The reason behind this
 *    is because the Dragonbones armature is added as a sprite to the game's
 *    Tilemap. Any and all sprites added to the Tilemap have some restrictions
 *    placed on them as per Pixi JS's design. The Dragonbones armatures are no
 *    exception to this.
 *
 *    If the number of vertices exceeds 99, strange things will occur to the
 *    Dragonbones armature that are outside of this plugin's control. While it
 *    won't stop the plugin from functioning properly, expected behaviors may
 *    happen due to the threshold.
 *
 * ---
 *
 * 2. When using Dragonbones armatures that are too tall or wide, they may clip
 *    into the tile layer above or to the side due to how the Tilemap works.
 *    Things that you would see happen would include clipping into the tops of
 *    trees and structures.
 *
 * ---
 *
 * 3. Certain motions will request specific animations from the Dragonbones
 *    armature. If the animations exist, it will play those motions. If they
 *    don't, the motions may request a different animation down the line. The
 *    request orders are as follows:
 *
 *    Jumping:
 *    - jump, walk, idle
 *
 *    Rope (Climbing) (Requires: VisuMZ_1_EventsMoveCore):
 *    - ropeclimb, ladderclimb, walk, ropeidle, ladderidle, idle
 *
 *    Rope (Idle) (Requires: VisuMZ_1_EventsMoveCore):
 *    - ropeidle, ladderidle, idle
 *
 *    Ladder (Climbing):
 *    - ladderclimb, walk, ladderidle, idle
 *
 *    Ladder (Idle):
 *    - ladderidle, idle
 *
 *    Dashing:
 *    - dash, walk, idle
 *
 *    Walking:
 *    - walk, idle
 *
 *    Idle:
 *    - idle
 *
 *    Name the animations for the Dragonbones armature as such to make the most
 *    out of the motion priority lists.
 *
 * ---
 *
 * 4. You can add directional animations for your Dragonbones armature motion
 *    animations. To do so, add a number after the animation's name like such:
 *    walk2, walk4, walk6, walk8. These numbers are based off the NumPad
 *    directions to determine which way to face:
 *
 *    7 8 9
 *    4   6
 *    1 2 3
 *
 *    These numbers are added onto the priority system listed in #3 above, too.
 *    Diagonal directions also become split and added multiple times for better
 *    streamlining, with a priority given to the horizontal direction before
 *    the vertical direction. For example, dashing becomes the following:
 *
 *    Dashing (Upper Left):
 *    - dash7, dash4, dash8, dash,
 *      walk7, walk4, walk8, walk,
 *      idle7, idle4, idle8, idle
 *
 *    Dashing (Right):
 *    - dash6, dash,
 *      walk6, walk,
 *      idle6, idle
 *
 * ---
 *
 * 5. When a Dragonbones armature is moving, it will animate slower or faster
 *    depending on the character's current movement speed. At speed
 *    '4: Normal', it will animation 4x faster than what's seen in Dragonbones.
 *    At speed '6: x4 Faster', it will animate 6x faster while '1: x8 Slower'
 *    will be at x1 speed seen in Dragonbones. In other words, the speed
 *    animated is equal to the number written on the left of the
 *    movement speed.
 *
 *    When dashing, that multiplier increases by 1 in order to match movement
 *    speeds and the Dragonbones armature will do the same to follow.
 *
 * ---
 *
 * You will need to create your Dragonbones armatures with these 5 key rules in
 * mind in order to make the armatures animate smoothly within your game.
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
 * === Dragonbones Battler Notetags ===
 *
 * The following notetags are to be assigned to either actors and/or enemies.
 * An assigned actor/enemy will have their original sprite hidden from view in
 * favor of the Dragonbones armature to be displayed. Use these notetags to
 * declare various settings for your Dragonbones armatures.
 *
 * ---
 *
 * <Dragonbones Battler: filename>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the DragonBones associated with this actor/enemy to be 'filename'.
 * - The name will be associated with the assets used.
 * - It will be used to check for associated filenames that end with _ske.json,
 *   _tex.json, and _tex.png.
 * - The listed assets must be found in the assigned assets folder.
 *
 * Examples:
 *
 * <Dragonbones Battler: Demon>
 * <Dragonbones Battler: DragonBoy>
 * <Dragonbones Battler: Swordsman>
 * <Dragonbones Battler: Ubbie>
 *
 * ---
 *
 * <Dragonbones Battler Scale: x, y>
 *
 * <Dragonbones Battler Scale X: x>
 * <Dragonbones Battler Scale Y: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the base scale for the Dragonbones associated with this actor/enemy.
 *   This is for those instances where a Dragonbones armature is too large or
 *   small and needs to be scaled down/up.
 * - This scale will be amplified by the actor/enemy's sprite's scale value.
 * - Use the 1st notetag to assign values to both Scale X and Scale Y.
 * - Use the 2nd/3rd notetags to assign Scale X and Y values separately.
 * - Use negative values to flip the Dragonbones armature around.
 *
 * Examples:
 * 
 * <Dragonbones Battler Scale: -0.3, 0.3>
 *
 * <Dragonbones Battler Scale X: -0.3>
 * <Dragonbones Battler Scale Y: 0.3>
 *
 * ---
 *
 * <Dragonbones Battler Offset: x, y>
 *
 * <Dragonbones Battler Offset X: x>
 * <Dragonbones Battler Offset Y: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - When a Dragonbones armature is attached to an actor/enemy's sprite, it
 *   will always be attached at the root point assigned within the Dragonbones
 *   data. If a Dragonbones armature has a root point that does not fit well
 *   with your battler sprite, you can offset it using these notetags.
 * - Replace 'x' and 'y' with number values representing how many pixels you
 *   want to offset the Dragonbones armature by.
 * - Use the 1st notetag to assign values to both Offset X and Offset Y.
 * - Use the 2nd/3rd notetags to assign Offset X and Y values separately.
 * - Use negative values to offset to the left (X) or up (Y) directions.
 *
 * Examples:
 *
 * <Dragonbones Battler Offset: -10, 5>
 *
 * <Dragonbones Battler Offset X: -10>
 * <Dragonbones Battler Offset Y: 5>
 *
 * ---
 *
 * <Dragonbones Battler Size: width, height>
 *
 * <Dragonbones Battler Width: x>
 * <Dragonbones Battler Height: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Dragonbones armatures have no standard width or height. This makes it
 *   problematic when trying to calculate the sprite's width/height for Action
 *   Sequences and the like. These notetags allow you to assign a width and
 *   height value to the sprite, despite the fact the Dragonbones armatures
 *   have no such thing.
 * - Replace 'width', 'height', or 'x' with number values representing the
 *   dimension values in pixels.
 * - Use the 1st notetag to assign values to both Width and Height.
 * - Use the 2nd/3rd notetags to assign Width and Height values separately.
 * - If these notetags aren't used, then use the values defined by default in
 *   Plugin Parameters => Battler Settings => Default => Width/Height.
 *
 * Examples:
 *
 * <Dragonbones Battler Size: 50, 100>
 *
 * <Dragonbones Battler Width: 50>
 * <Dragonbones Battler Height: 100>
 *
 * ---
 *
 * <Dragonbones Battler Time Scale: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Lets you adjust the time scale for the Dragonbones armature.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 *
 * Example:
 *
 * <Dragonbones Battler Time Scale: 1.5>
 *
 * ---
 *
 * <Dragonbones Battler Motion Walk: animation>
 * <Dragonbones Battler Motion Wait: animation>
 * <Dragonbones Battler Motion Chant: animation>
 * <Dragonbones Battler Motion Guard: animation>
 * <Dragonbones Battler Motion Damage: animation>
 * <Dragonbones Battler Motion Evade: animation>
 * <Dragonbones Battler Motion Thrust: animation>
 * <Dragonbones Battler Motion Swing: animation>
 * <Dragonbones Battler Motion Missile: animation>
 * <Dragonbones Battler Motion Skill: animation>
 * <Dragonbones Battler Motion Spell: animation>
 * <Dragonbones Battler Motion Item: animation>
 * <Dragonbones Battler Motion Escape: animation>
 * <Dragonbones Battler Motion Victory: animation>
 * <Dragonbones Battler Motion Dying: animation>
 * <Dragonbones Battler Motion Abnormal: animation>
 * <Dragonbones Battler Motion Sleep: animation>
 * <Dragonbones Battler Motion Dead: animation>
 *
 * - Used for: Actor, Enemy Notetags
 * - Use these notetags to assign Dragonbones animations to play when the
 *   actor/enemy sprite is supposed to play such a motion.
 * - Replace 'animation' with the name of the Dragonbones animation.
 * - If this notetag is not used, when such a motion is rquested, it will
 *   default to attempting to play the animation name equal to the motion.
 * - Animation names do not need to be case sensitive.
 * - If no animation is found, then no animation will be played.
 *
 * Examples:
 *
 * <Dragonbones Battler Motion Wait: idle>
 * <Dragonbones Battler Motion Swing: attack>
 * <Dragonbones Battler Motion Thrust: attack>
 * <Dragonbones Battler Motion Missle: attack>
 * <Dragonbones Battler Motion Skill: special>
 * <Dragonbones Battler Motion Spell: special>
 * <Dragonbones Battler Motion Dead: defeated>
 *
 * ---
 *
 * <Dragonbones Battler Settings>
 *  Battler: filename
 *  
 *  Scale: x, y
 *
 *  Scale X: x
 *  Scale Y: x
 *
 *  Offset: x, y
 *
 *  Offset X: x
 *  Offset Y: x
 *
 *  Size: width, height
 *
 *  Width: x
 *  Height: x
 *
 *  Time Scale: x
 *
 *  Motion Walk: animation
 *  Motion Wait: animation
 *  Motion Chant: animation
 *  Motion Guard: animation
 *  Motion Damage: animation
 *  Motion Evade: animation
 *  Motion Thrust: animation
 *  Motion Swing: animation
 *  Motion Missile: animation
 *  Motion Skill: animation
 *  Motion Spell: animation
 *  Motion Item: animation
 *  Motion Escape: animation
 *  Motion Victory: animation
 *  Motion Dying: animation
 *  Motion Abnormal: animation
 *  Motion Sleep: animation
 *  Motion Dead: animation
 * </Dragonbones Battler Settings>
 *
 * - Used for: Actor, Enemy Notetags
 * - The above notetag allows to wrap up all the information you'd like to
 *   set for Dragonbones battler armatures needed inside a single notetag
 *   container.
 * - The settings are the same as the notetags listed above it.
 * - You may remove the settings you don't wish to change.
 * - The only necessary data is the 'Battler: filename' line.
 *
 * Example:
 *
 * <Dragonbones Battler Settings>
 *  Battler: Demon
 *  
 *  Scale: 0.3, 0.3
 *
 *  Size: 80, 80
 *
 *  Motion Wait: idle
 *  Motion Damage: hit
 *  Motion Swing: attack
 *  Motion Thrust: attack
 *  Motion Missile: attack
 *  Motion Skill: special
 *  Motion spell: special
 *  Motion Dead: defeated
 * </Dragonbones Battler Settings>
 *
 * ---
 *
 * === Dragonbones Map Sprite Notetags & Comment Tags ===
 *
 * You can also use Dragonbones armatures as map sprites. When used, any of the
 * original sprites before will become invisible and will be replaced with the
 * Dragonbones armature.
 *
 * These notetags can be used for actors and events. In the case of events,
 * both notetags and comment tags can be used to determine what settings to use
 * for the Dragonbones armatures.
 *
 * Be cautious when using Comment Tags for event pages since comments contain a
 * maximum line count of 6.
 *
 * ---
 *
 * <Dragonbones Sprite: filename>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Sets the DragonBones associated with this map sprite to be 'filename'.
 * - The name will be associated with the assets used.
 * - It will be used to check for associated filenames that end with _ske.json,
 *   _tex.json, and _tex.png.
 * - The listed assets must be found in the assigned assets folder.
 *
 * Examples:
 *
 * <Dragonbones Sprite: Demon>
 * <Dragonbones Sprite: DragonBoy>
 * <Dragonbones Sprite: Swordsman>
 * <Dragonbones Sprite: Ubbie>
 *
 * ---
 *
 * <Dragonbones Sprite Scale: x, y>
 *
 * <Dragonbones Sprite Scale X: x>
 * <Dragonbones Sprite Scale Y: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Sets the base scale for the Dragonbones associated with this map sprite.
 *   This is for those instances where a Dragonbones armature is too large or
 *   small and needs to be scaled down/up.
 * - This scale will be amplified by the character's sprite's scale value.
 * - Use the 1st notetag to assign values to both Scale X and Scale Y.
 * - Use the 2nd/3rd notetags to assign Scale X and Y values separately.
 * - Use negative values to flip the Dragonbones armature around.
 *
 * Examples:
 * 
 * <Dragonbones Sprite Scale: -0.3, 0.3>
 *
 * <Dragonbones Sprite Scale X: -0.3>
 * <Dragonbones Sprite Scale Y: 0.3>
 *
 * ---
 *
 * <Dragonbones Sprite Offset: x, y>
 *
 * <Dragonbones Sprite Offset X: x>
 * <Dragonbones Sprite Offset Y: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - When a Dragonbones armature is attached to an character's map sprite, it
 *   will always be attached at the root point assigned within the Dragonbones
 *   data. If a Dragonbones armature has a root point that does not fit well
 *   with your battler sprite, you can offset it using these notetags.
 * - Replace 'x' and 'y' with number values representing how many pixels you
 *   want to offset the Dragonbones armature by.
 * - Use the 1st notetag to assign values to both Offset X and Offset Y.
 * - Use the 2nd/3rd notetags to assign Offset X and Y values separately.
 * - Use negative values to offset to the left (X) or up (Y) directions.
 *
 * Examples:
 *
 * <Dragonbones Sprite Offset: -10, 5>
 *
 * <Dragonbones Sprite Offset X: -10>
 * <Dragonbones Sprite Offset Y: 5>
 *
 * ---
 *
 * <Dragonbones Sprite Time Scale: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you adjust the time scale for the Dragonbones armature.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 *
 * Example:
 *
 * <Dragonbones Sprite Time Scale: 1.5>
 *
 * ---
 * 
 * <Dragonbones Sprite Walk Rate: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you adjust the animation speed for the Dragonbones armature only
 *   when it is walking.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 * - If used with the <Dragonbones Sprite Time Scale: x>, the speed will stack
 *   multiplicatively.
 *
 * Example:
 *
 * <Dragonbones Sprite Walk Rate: 1.5>
 * 
 * ---
 * 
 * <Dragonbones Sprite Dash Rate: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you adjust the animation speed for the Dragonbones armature only
 *   when it is dashing.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 * - If used with the <Dragonbones Sprite Time Scale: x>, the speed will stack
 *   multiplicatively.
 *
 * Example:
 *
 * <Dragonbones Sprite Dash Rate: 1.5>
 * 
 * ---
 *
 * <Dragonbones Sprite Size: width, height>
 *
 * <Dragonbones Sprite Width: x>
 * <Dragonbones Sprite Height: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Dragonbones armatures have no standard width or height. This makes it
 *   problematic when trying to calculate the sprite's width/height for various
 *   plugins that use it. These notetags allow you to assign a width and
 *   height value to the sprite, despite the fact the Dragonbones armatures
 *   have no such thing.
 * - Replace 'width', 'height', or 'x' with number values representing the
 *   dimension values in pixels.
 * - Use the 1st notetag to assign values to both Width and Height.
 * - Use the 2nd/3rd notetags to assign Width and Height values separately.
 * - If these notetags aren't used, then use the values defined by default in
 *   the Plugin Parameters.
 *
 * Examples:
 *
 * <Dragonbones Sprite Size: 48, 64>
 *
 * <Dragonbones Sprite Width: 48>
 * <Dragonbones Sprite Height: 64>
 *
 * ---
 *
 * <Dragonbones Sprite Flip Left>
 * <Dragonbones Sprite Flip Right>
 *
 * <Dragonbones Sprite No Flip Left>
 * <Dragonbones Sprite No Flip Right>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets the map sprite know to flip itself when facing either the left/right
 *   directions in order to reuse animations.
 * - The 'No' variants will prevent flipping from occuring.
 * - These notetags will override settings applied in the Plugin Parameters.
 *
 * ---
 *
 * <Dragonbones Sprite Motion Idle: animation>
 * <Dragonbones Sprite Motion Walk: animation>
 * <Dragonbones Sprite Motion Dash: animation>
 * <Dragonbones Sprite Motion Jump: animation>
 * <Dragonbones Sprite Motion LadderIdle: animation>
 * <Dragonbones Sprite Motion LadderClimb: animation>
 * <Dragonbones Sprite Motion RopeIdle: animation>
 * <Dragonbones Sprite Motion RopeClimb: animation>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you set specific animations different from the ones listed in the
 *   Plugin Parameters for specific motions.
 * - Replace 'animation' with the name of the Dragonbones animation.
 * - If this notetag is not used, when such a motion is rquested, it will
 *   default to attempting to play the animation name equal to the motion.
 * - Animation names do not need to be case sensitive.
 * - If no animation is found, then no animation will be played.
 *
 * Example:
 *
 * <Dragonbones Sprite Motion Idle: stand>
 * <Dragonbones Sprite Motion Walk: move>
 * <Dragonbones Sprite Motion Dash: run>
 * <Dragonbones Sprite Motion Jump: hop>
 *
 * ---
 *
 * <Dragonbones Sprite Settings>
 *  Filename: filename
 *
 *  Scale: x, y
 *
 *  Scale X: x
 *  Scale Y: x
 *
 *  Offset: x, y
 *
 *  Offset X: x
 *  Offset Y: x
 *
 *  Time Scale: x
 * 
 *  Walk Rate: x
 *  Dash Rate: x
 *
 *  Width: x
 *  Height: x
 *
 *  Flip Left
 *  Flip Right
 *
 *  No Flip Left
 *  No Flip Right
 *
 *  Motion Idle: animation
 *  Motion Walk: animation
 *  Motion Dash: animation
 *  Motion Jump: animation
 *  Motion LadderIdle: animation
 *  Motion LadderClimb: animation
 *  Motion RopeIdle: animation
 *  Motion RopeClimb: animation
 * </Dragonbones Sprite Settings>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - The above notetag allows to wrap up all the information you'd like to
 *   set for Dragonbones battler armatures needed inside a single notetag
 *   container.
 * - The settings are the same as the notetags listed above it.
 * - You may remove the settings you don't wish to change.
 * - The only necessary data is the 'Filename: filename' line.
 *
 * Example:
 *
 * <Dragonbones Sprite Settings>
 *  Filename: Ubbie
 *
 *  Scale: 0.1, 0.1
 *
 *  Flip Right
 *
 *  Motion Idle: stand
 *  Motion Walk: walk
 * </Dragonbones Sprite Settings>
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
 * === Battler Plugin Commands ===
 * 
 * ---
 *
 * Battler: Actor Change Settings
 * - Change target actor's Dragonbones armature settings for battle.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *     Filename:
 *     - Change the armature's filename.
 *
 *     Offset X:
 *     - Change the armature's Offset X value.
 *
 *     Offset Y:
 *     - Change the armature's Offset Y value.
 *
 *     Scale X:
 *     - Change the armature's Scale X value.
 * 
 *     Scale Y:
 *     - Change the armature's Scale Y value.
 *
 *     Time Scale:
 *     - Change the armature's Time Scale value.
 *
 *     Width:
 *     - Change the battler width size.
 *
 *     Height:
 *     - Change the battler height size.
 *
 *   Motion Settings:
 *
 *     Walk:
 *     Wait:
 *     Chant:
 *     Guard:
 *     Damage:
 *     Evade:
 *     Thrust:
 *     Swing:
 *     Missile:
 *     Skill:
 *     Spell:
 *     Item:
 *     Escape:
 *     Victory:
 *     Dying:
 *     Abnormal:
 *     Sleep:
 *     Dead:
 *     - Change the animation used for this motion.
 *
 * ---
 * 
 * === Map Sprite Plugin Commands ===
 * 
 * ---
 *
 * Map Sprite: Actor Change Settings
 * - Change target actor's Dragonbones armature settings for map sprites.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *     Filename:
 *     - Change the armature's filename.
 *
 *     Offset X:
 *     - Change the armature's Offset X value.
 *
 *     Offset Y:
 *     - Change the armature's Offset Y value.
 *
 *     Scale X:
 *     - Change the armature's Scale X value.
 * 
 *     Scale Y:
 *     - Change the armature's Scale Y value.
 *
 *     Time Scale:
 *     - Change the armature's Time Scale value.
 * 
 *       Walk Rate:
 *       - Change the armature's walk animation rate.
 * 
 *       Dash Rate:
 *       - Change the armature's dash animation rate.
 *
 *     Width:
 *     - Change the battler width size.
 *
 *     Height:
 *     - Change the battler height size.
 *
 *   Flip Settings:
 *
 *     Flip Left?:
 *     Flip Right:
 *     - Flip the scale x value when facing left/right-ward directions?
 *
 *   Motion Settings:
 *
 *     Idle:
 *     Walk:
 *     Dash:
 *     Jump:
 *     Ladder (Idle):
 *     Ladder (Climb):
 *     Rope (Idle):
 *     Rope (Climb):
 *     - Base rope climbing animation name used.
 *
 * ---
 *
 * Map Sprite: Actor Play Animation
 * - Target actor plays a custom Dragonbones animation.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * NOTE: An alternative to this is to put the following code inside of a
 *       Movement Route's script call:
 *
 *       this.dragonbonesAnimation = "AnimationName";
 *
 *       Replace 'AnimationName' (keep the quotes) with the name of the
 *       Dragonbones animation.
 *
 * ---
 *
 * Map Sprite: Actor Stop Animation
 * - Stops a target actor's custom Dragonbones animation.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 * ---
 *
 * Map Sprite: Event Play Animation
 * - Target event plays a custom Dragonbones animation.
 *
 *   Event ID:
 *   - Select which Event ID to affect.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Map Sprite: Event Stop Animation
 * - Stops a target event's custom Dragonbones animation.
 *
 *   Event ID:
 *   - Select which Event ID to affect.
 *
 * ---
 *
 * Map Sprite: Follower Play Animation
 * - Target follower plays a custom Dragonbones animation.
 *
 *   Follower Index:
 *   - Select which Follower Index to affect.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Map Sprite: Follower Stop Animation
 * - Stops a target follower's custom Dragonbones animation.
 *
 *   Follower ID:
 *   - Select which Follower Index to affect.
 *
 * ---
 *
 * Map Sprite: Player Play Animation
 * - Player plays a custom Dragonbones animation.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Map Sprite: Player Stop Animation
 * - Stops player's custom Dragonbones animation.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Dragonbones Setup
 * - Setup a Dragonbones armature for a picture.
 *
 *   Picture ID:
 *   - Select which Picture ID(s) to give a Dragonbones armature.
 *
 *   Armature Filename:
 *   - What is the armature's filename?
 *
 *   Play Animation:
 *   - Play this animation once it starts.
 *
 *   Offset: X:
 *   - Default X offset value for this Dragonbones armature.
 *
 *   Offset: Y:
 *   - Default Y offset value for this Dragonbones armature.
 *
 *   Scale: X:
 *   - Default X scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 *   Scale: Y:
 *   - Default Y scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 *   Time Scale:
 *   - Default time scale for this Dragonbones armature.
 *   - Higher values play faster. Lower values play slower.
 *
 * ---
 *
 * Picture: Play Dragonbones Animation
 * - Make an existing Dragonbones armature attached to a picture play
 *   an animation.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Picture: Offset Dragonbones
 * - Offset the X, Y attachment point of the Dragonbones armature.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Offset: X:
 *   - X offset value for this Dragonbones armature.
 *
 *   Offset: Y:
 *   - Y offset value for this Dragonbones armature.
 *
 * ---
 *
 * Picture: Scale Dragonbones
 * - Change the scaling values of the Dragonbones armature.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Scale: X:
 *   - X scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 *   Scale: Y:
 *   - Y scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 * ---
 *
 * Picture: Time Scale Dragonbones
 * - Change the speed at which Dragonbones animations play.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Time Scale:
 *   - Time scale for this Dragonbones armature.
 *   - Higher values play faster. Lower values play slower.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings that apply to all uses of Dragonbones through
 * this plugin. While the majority of these can remain unchanged, for those who
 * wish to customize the nature of the plugin to their liking can do so through
 * these Plugin Parameters.
 *
 * ---
 *
 * Assets Path
 * - The filepath to the directory that houses all the Dragonbone files.
 *
 * ---
 *
 * Defaults
 * 
 *   Loaded Animation:
 *   - The default animation to play once a Dragonbones armature is loaded.
 * 
 *   Looping Animations:
 *   - Force these animations to become looping animations even if they don't
 *     loop in Dragonbones.
 *
 * ---
 *
 * Skeletal Data
 * Texture Data
 * Texture Asset
 * 
 *   Key:
 *   - Key used to determine where needed data is stored.
 * 
 *   Extension:
 *   - Extension used to determine which files contain needed data.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battler Settings
 * ============================================================================
 *
 * Actor and Enemy sprites can have Dragonbones armatures attached to them as
 * sprites. Use these settings to make the Dragonbones armatures fit your needs
 * in battle.
 *
 * ---
 *
 * Default Settings
 * 
 *   Offset: X:
 *   - Default X offset for battler sprites.
 * 
 *   Offset: Y:
 *   - Default Y offset for battler sprites.
 * 
 *   Scale: X:
 *   - Default scale for X used by Dragonbones battlers.
 * 
 *     Flip for Actors?:
 *     Flip for Enemies?:
 *     - Flip the scale x value into negative automatically for all actors
 *       or enemies?
 * 
 *   Scale: Y:
 *   - Default scale for Y used by Dragonbones battlers.
 * 
 *   Width:
 *   - Treat battler sprites as if they have this width.
 *   - Used for Action Sequences.
 * 
 *   Height:
 *   - Treat battler sprites as if they have this height.
 *   - Used for Action Sequences.
 *
 * ---
 * 
 * Idle Bypass
 * 
 *   List:
 *   - This is a list of animations that will not return back to the idle
 *     animation after completion.
 *   - Remove them if you want them to revert back to the idle animation
 *     after completion.
 *   - Add to the list if you want animations to stay in their final frame.
 * 
 * ---
 *
 * Default Motions
 * 
 *   Walk:
 *   Wait:
 *   Chant:
 *   Guard:
 *   Damage:
 *   Evade:
 *   Thrust:
 *   Swing:
 *   Missile:
 *   Skill:
 *   Spell:
 *   Item:
 *   Escape:
 *   Victory:
 *   Dying:
 *   Abnormal:
 *   Sleep:
 *   Dead:
 *   - Play this Dragonbones animation whenever this motion is requested
 *     by default.
 *   - Used for Action Sequences.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Map Sprite Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust the default configurations for any
 * map sprite that's using a Dragonbones armature. These settings can be
 * overwritten on per a sprite basis using notetags and comment tags, too.
 *
 * ---
 *
 * Defaults
 * 
 *   Offset: X:
 *   - Default X offset for map sprites.
 * 
 *   Offset: Y:
 *   - Default Y offset for map sprites.
 * 
 *   Scale: X:
 *   - Default scale for X used by Dragonbones map sprites.
 * 
 *     Flip Left?:
 *     Flip Right?:
 *     - Flip the scale x value when facing left/right-ward directions?
 * 
 *   Scale: Y:
 *   - Default scale for Y used by Dragonbones map sprites.
 * 
 *   Time Scale:
 *   - The rate at which animations play.
 *   - Higher numbers go faster.
 * 
 *   Width:
 *   - Treat map sprites as if they have this width.
 *   - Used for various plugins.
 * 
 *   Height:
 *   - Treat map sprites as if they have this height.
 *   - Used for various plugins.
 *
 * ---
 *
 * Motion Settings
 * 
 *   Idle:
 *   Walk:
 *   Dash:
 *   Jump:
 *   Ladder (Idle):
 *   Ladder (Climb):
 *   Rope (Idle):
 *   Rope (Climb):
 *   - Base walk animation name used.
 * 
 *   Walk Timer:
 *   - Number of frames to count as walking so that an idle animation isn't
 *     immediately forced upon stopping.
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
 *
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * Special Thanks To
 * 
 * * Green Kel
 * * Ækashics
 * * Swift Illusion
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.12: February 19, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause a crash upon teleporting with an altering
 *    Dragonbones armature load without a base sprite. Fix made by Irina.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Fixed a bug involving the changing of a Dragonbones battler in-battle to
 *    prevent multiple instances being added at once. Fix made by Irina.
 * 
 * Version 1.10: January 22, 2021
 * * Bug Fixes!
 * ** Upon changing map sprites, Dragonbones characters would become skewed.
 *    This should no longer happen.
 * * Documentation Update!
 * ** Updated help file for new features.
 * * New Features!
 * ** Map Sprite: Actor Change Settings new Plugin Command parameters
 * *** "Walk Rate" and "Dash Rate" modifiers added.
 * 
 * Version 1.09: November 29, 2020
 * * Bug Fixes!
 * ** Dragonbones height for actors is no longer affected by frame divisibility
 *    for SV Actors to skew the positions of height data. Fix made by Arisu.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Updated help file for new features.
 * * New Features!
 * ** Two new notetags have been added for map sprites by Irina.
 * *** <Dragonbones Sprite Walk Rate: x>
 * *** <Dragonbones Sprite Dash Rate: x>
 * **** These two new notetags allow you to animate specific Dragonbones
 *      animations at a different speed when walking or dashing. These speed
 *      multipliers will stack multiplicatively with the time scale.
 * 
 * Version 1.07: October 25, 2020
 * * Bug Fixes!
 * ** Dead animations for actors no longer keep looping upon motion refreshes.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Updated help file for new features.
 * * New Features!
 * ** New plugin parameter added by Irina.
 * *** Plugin Parameters > Battler Settings > Idle Bypass > List
 * **** This is a list of animations that will not return back to the idle
 *      animation after completion. Remove them if you want them to revert back
 *      to the idle animation after completion. Add to the list if you want
 *      animations to stay in their final frame.
 * 
 * Version 1.06: October 18, 2020
 * * Bug Fixes!
 * ** Enemies with Dragonbones battlers transforming into other enemies with
 *    Dragonbones battlers will now attach the sprites properly. Fix by Yanfly.
 * ** Enemies with Dragonbones battlers transforming into enemies without them
 *    will now remove the non-transformed bitmap.
 * * Documentation Update!
 * ** Added the 'Dragonbones Naming' section.
 * 
 * Version 1.05: October 4, 2020
 * * Bug Fixes!
 * ** Selected Dragonbones battlers will no longer leave behind a residual
 *    blink effect. Fix made by Irina.
 * ** There should be no more crashes from map events that have been previously
 *    deleted but not cleared from the map event list. Fix made by Irina.
 * 
 * Version 1.04: September 20, 2020
 * * Bug Fixes!
 * ** Hidden enemies with Dragonbones should be invisible at the start of
 *    battle. Fix made by Yanfly.
 * 
 * Version 1.03: September 13, 2020
 * * Compatibility Update!
 * ** Added compatibility with the new Battle Core v1.04 features!
 * 
 * Version 1.02: September 6, 2020
 * * Bug Fixes!
 * ** Previously, a Dragonbones battler does not show the blinking indicator if
 *    the battler is a selected target. This is now fixed. Fix made by Yanfly.
 * ** Prevents a crash now if no bitmap is detected for the main sprite.
 * 
 * Version 1.01: August 30, 2020
 * * Bug Fixes!
 * ** Erasing a picture no longer causes a crash when changing scenes. Fix made
 *    by Yanfly.
 * * Compatibility Update
 * ** Added compatibility for VisuStella MZ's Visual State Effects.
 *
 * Version 1.00: August 24, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Battler_ActorChange
 * @text Battler: Actor Change Settings
 * @desc Change target actor's Dragonbones armature settings for battle.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Filename:str
 * @text Filename
 * @parent ActorID:num
 * @desc Change the armature's filename.
 * @default name
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @parent ActorID:num
 * @desc Change the armature's Offset X value.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent ActorID:num
 * @desc Change the armature's Offset Y value.
 * @default 0
 *
 * @arg ScaleX:eval
 * @text Scale X
 * @parent ActorID:num
 * @desc Change the armature's Scale X value.
 * @default 1.0
 *
 * @arg ScaleY:eval
 * @text Scale Y
 * @parent ActorID:num
 * @desc Change the armature's Scale Y value.
 * @default 1.0
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @parent ActorID:num
 * @desc Change the armature's Time Scale value.
 * @default 1.0
 *
 * @arg Width:eval
 * @text Width
 * @parent ActorID:num
 * @desc Change the battler width size.
 * @default 64
 *
 * @arg Height:eval
 * @text Height
 * @parent ActorID:num
 * @desc Change the battler height size.
 * @default 64
 *
 * @arg DefaultMotions
 * @text Motion Settings
 *
 * @arg MotionWalk:str
 * @text Walk
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default walk
 *
 * @arg MotionWait:str
 * @text Wait
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default wait
 *
 * @arg MotionChant:str
 * @text Chant
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default chant
 *
 * @arg MotionGuard:str
 * @text Guard
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default guard
 *
 * @arg MotionDamage:str
 * @text Damage
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default damage
 *
 * @arg MotionEvade:str
 * @text Evade
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default evade
 *
 * @arg MotionThrust:str
 * @text Thrust
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default thrust
 *
 * @arg MotionSwing:str
 * @text Swing
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default swing
 *
 * @arg MotionMissile:str
 * @text Missile
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default missile
 *
 * @arg MotionSkill:str
 * @text Skill
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default skill
 *
 * @arg MotionSpell:str
 * @text Spell
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default spell
 *
 * @arg MotionItem:str
 * @text Item
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default item
 *
 * @arg MotionEscape:str
 * @text Escape
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default escape
 *
 * @arg MotionVictory:str
 * @text Victory
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default victory
 *
 * @arg MotionDying:str
 * @text Dying
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default dying
 *
 * @arg MotionAbnormal:str
 * @text Abnormal
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default abnormal
 *
 * @arg MotionSleep:str
 * @text Sleep
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default sleep
 *
 * @arg MotionDead:str
 * @text Dead
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default dead
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_ActorChange
 * @text Map Sprite: Actor Change Settings
 * @desc Change target actor's Dragonbones armature settings for map sprites.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Filename:str
 * @text Filename
 * @parent ActorID:num
 * @desc Change the armature's filename.
 * @default name
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @parent ActorID:num
 * @desc Change the armature's Offset X value.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent ActorID:num
 * @desc Change the armature's Offset Y value.
 * @default 0
 *
 * @arg ScaleX:eval
 * @text Scale X
 * @parent ActorID:num
 * @desc Change the armature's Scale X value.
 * @default 0.5
 *
 * @arg ScaleY:eval
 * @text Scale Y
 * @parent ActorID:num
 * @desc Change the armature's Scale Y value.
 * @default 0.5
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @parent ActorID:num
 * @desc Change the armature's Time Scale value.
 * @default 1.0
 *
 * @arg WalkRate:eval
 * @text Walk Rate
 * @parent TimeScale:eval
 * @desc Change the armature's walk animation rate.
 * @default 1.0
 *
 * @arg DashRate:eval
 * @text Dash Rate
 * @parent TimeScale:eval
 * @desc Change the armature's dash animation rate.
 * @default 1.0
 *
 * @arg Width:eval
 * @text Width
 * @parent ActorID:num
 * @desc Change the armature's width value.
 * @default 48
 *
 * @arg Height:eval
 * @text Height
 * @parent ActorID:num
 * @desc Change the armature's height.
 * @default 48
 *
 * @arg FlipSettings
 * @text Flip Settings
 *
 * @arg FlipLeft:eval
 * @text Flip Left?
 * @parent FlipSettings
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing left-ward directions?
 * @default false
 *
 * @arg FlipRight:eval
 * @text Flip Right?
 * @parent FlipSettings
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing right-ward directions?
 * animation is found?
 * @default false
 *
 * @arg Animations
 * @text Motion Settings
 *
 * @arg Idle:str
 * @text Idle
 * @parent Animations
 * @desc Base idle animation name used.
 * @default idle
 *
 * @arg Walk:str
 * @text Walk
 * @parent Animations
 * @desc Base walk animation name used.
 * @default walk
 *
 * @arg Dash:str
 * @text Dash
 * @parent Animations
 * @desc Base dash animation name used.
 * @default dash
 *
 * @arg Jump:str
 * @text Jump
 * @parent Animations
 * @desc Base jump animation name used.
 * @default jump
 *
 * @arg LadderIdle:str
 * @text Ladder (Idle)
 * @parent Animations
 * @desc Base ladder idle animation name used.
 * @default ladderidle
 *
 * @arg LadderClimb:str
 * @text Ladder (Climb)
 * @parent Animations
 * @desc Base ladder climbing animation name used.
 * @default ladderclimb
 *
 * @arg RopeIdle:str
 * @text Rope (Idle)
 * @parent Animations
 * @desc Base rope idle animation name used.
 * @default ropeidle
 *
 * @arg RopeClimb:str
 * @text Rope (Climb)
 * @parent Animations
 * @desc Base rope climbing animation name used.
 * @default ropecllmb
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_ActorAnimationPlay
 * @text Map Sprite: Actor Play Animation
 * @desc Target actor plays a custom Dragonbones animation.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_ActorAnimationStop
 * @text Map Sprite: Actor Stop Animation
 * @desc Stops a target actor's custom Dragonbones animation.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_EventAnimationPlay
 * @text Map Sprite: Event Play Animation
 * @desc Target event plays a custom Dragonbones animation.
 *
 * @arg EventID:eval
 * @text Event ID
 * @desc Select which Event ID to affect.
 * @default 1
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_EventAnimationStop
 * @text Map Sprite: Event Stop Animation
 * @desc Stops a target event's custom Dragonbones animation.
 *
 * @arg EventID:eval
 * @text Event ID
 * @desc Select which Event ID to affect.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_FollowerAnimationPlay
 * @text Map Sprite: Follower Play Animation
 * @desc Target follower plays a custom Dragonbones animation.
 *
 * @arg FollowerIndex:eval
 * @text Follower Index
 * @desc Select which Follower Index to affect.
 * @default 0
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_FollowerAnimationStop
 * @text Map Sprite: Follower Stop Animation
 * @desc Stops a target follower's custom Dragonbones animation.
 *
 * @arg FollowerIndex:eval
 * @text Follower ID
 * @desc Select which Follower Index to affect.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_PlayerAnimationPlay
 * @text Map Sprite: Player Play Animation
 * @desc Player plays a custom Dragonbones animation.
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_PlayerAnimationStop
 * @text Map Sprite: Player Stop Animation
 * @desc Stops player's custom Dragonbones animation.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_SetupDragonbones
 * @text Picture: Dragonbones Setup
 * @desc Setup a Dragonbones armature for a picture.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID(s) to give a Dragonbones armature.
 * @default 1
 *
 * @arg Filename:str
 * @text Armature Filename
 * @desc What is the armature's filename?
 * @default Untitled
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation once it starts.
 * @default Idle
 *
 * @arg OffsetX:eval
 * @text Offset: X
 * @desc Default X offset value for this Dragonbones armature.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset: Y
 * @desc Default Y offset value for this Dragonbones armature.
 * @default 0
 *
 * @arg ScaleX:eval
 * @text Scale: X
 * @desc Default X scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @arg ScaleY:eval
 * @text Scale: Y
 * @desc Default Y scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @desc Default time scale for this Dragonbones armature.
 * Higher values play faster. Lower values play slower.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_DragonbonesAnimation
 * @text Picture: Play Dragonbones Animation
 * @desc Make an existing Dragonbones armature attached to a picture play an animation.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_DragonbonesOffset
 * @text Picture: Offset Dragonbones
 * @desc Offset the X, Y attachment point of the Dragonbones armature.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg OffsetX:eval
 * @text Offset: X
 * @desc X offset value for this Dragonbones armature.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset: Y
 * @desc Y offset value for this Dragonbones armature.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_ScaleDragonbones
 * @text Picture: Scale Dragonbones
 * @desc Change the scaling values of the Dragonbones armature.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg ScaleX:eval
 * @text Scale: X
 * @desc X scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @arg ScaleY:eval
 * @text Scale: Y
 * @desc Y scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_TimeScaleDragonbones
 * @text Picture: Time Scale Dragonbones
 * @desc Change the speed at which Dragonbones animations play.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @desc Default time scale for this Dragonbones armature.
 * Higher values play faster. Lower values play slower.
 * @default 1.0
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
 * @param DragonbonesUnion
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AssetsPath:str
 * @text Assets Path
 * @desc The filepath to the directory that houses all the Dragonbone files.
 * @default ./dragonbones_assets/
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc A set of general settings pertaining to all uses of Dragonbones.
 * @default {"Defaults":"","LoadAnimation:str":"idle","LoopingAnimations:arraystr":"[\"idle\",\"walk\",\"wait\",\"chant\",\"guard\",\"dying\",\"abnormal\",\"sleep\",\"dash\",\"ladderidle\",\"ladderclimb\",\"ropeidle\",\"ropeclimb\"]","SkeletalData":"","SkeKey:str":"dbData","SkeExt:str":"_ske.json","TextureData":"","TexKey:str":"texData","TexExt:str":"_tex.json","TextureAsset":"","TxaKey:str":"texAsset","TxaExt:str":"_tex.png"}
 *
 * @param Battler:struct
 * @text Battler Settings
 * @type struct<Battler>
 * @desc A set of general settings pertaining to Dragonbones battlers.
 * @default {"Defaults":"","OffsetX:num":"0","OffsetY:num":"0","ScaleX:num":"1.0","FlipActors:eval":"false","FlipEnemies:eval":"false","ScaleY:num":"1.0","TimeScale:num":"1.0","Width:num":"64","Height:num":"64","IdleBypass":"","IdleBypassList:arraystr":"[\"dead\",\"escape\",\"victory\"]","DefaultMotions":"","MotionWalk:str":"walk","MotionWait:str":"wait","MotionChant:str":"chant","MotionGuard:str":"guard","MotionDamage:str":"damage","MotionEvade:str":"evade","MotionThrust:str":"thrust","MotionSwing:str":"swing","MotionMissile:str":"missile","MotionSkill:str":"skill","MotionSpell:str":"spell","MotionItem:str":"item","MotionEscape:str":"escape","MotionVictory:str":"victory","MotionDying:str":"dying","MotionAbnormal:str":"abnormal","MotionSleep:str":"sleep","MotionDead:str":"dead"}
 *
 * @param MapSprite:struct
 * @text Map Sprite Settings
 * @type struct<MapSprite>
 * @desc A set of general settings pertaining to Dragonbones map sprites.
 * @default {"Defaults":"","OffsetX:num":"0","OffsetY:num":"0","ScaleX:num":"0.5","FlipLeft:eval":"false","FlipRight:eval":"false","ScaleY:num":"0.5","TimeScale:num":"1.0","Width:num":"48","Height:num":"48","Animations":"","Idle:str":"idle","Walk:str":"walk","WalkTimer:num":"2","Dash:str":"dash","Jump:str":"jump","LadderIdle:str":"ladderidle","LadderClimb:str":"ladderclimb","RopeIdle:str":"ropeidle","RopeClimb:str":"ropecllmb"}
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
 * @param Defaults
 *
 * @param LoadAnimation:str
 * @text Loaded Animation
 * @parent Defaults
 * @desc The default animation to play once a Dragonbones armature is loaded.
 * @default idle
 *
 * @param LoopingAnimations:arraystr
 * @text Looping Animations
 * @parent Defaults
 * @type string[]
 * @desc Force these animations to become looping animations even if they don't loop in Dragonbones.
 * @default ["idle","walk","wait","chant","guard","dying","abnormal","sleep","dash","ladderidle","ladderclimb","ropeidle","ropeclimb"]
 *
 * @param SkeletalData
 * @text Skeletal Data
 *
 * @param SkeKey:str
 * @text Key
 * @parent SkeletalData
 * @desc Key used to determine where skeletal data is stored.
 * @default dbData
 *
 * @param SkeExt:str
 * @text Extension
 * @parent SkeletalData
 * @desc Extension used to determine which files contain skeletal data.
 * @default _ske.json
 *
 * @param TextureData
 * @text Texture Data
 *
 * @param TexKey:str
 * @text Key
 * @parent TextureData
 * @desc Key used to determine where texture data is stored.
 * @default texData
 *
 * @param TexExt:str
 * @text Extension
 * @parent TextureData
 * @desc Extension used to determine which files contain texture data.
 * @default _tex.json
 *
 * @param TextureAsset
 * @text Texture Asset
 *
 * @param TxaKey:str
 * @text Key
 * @parent TextureAsset
 * @desc Key used to determine where texture assets are stored.
 * @default texAsset
 *
 * @param TxaExt:str
 * @text Extension
 * @parent TextureAsset
 * @desc Extension used to determine which files contain texture assets.
 * @default _tex.png
 *
 */
/* ----------------------------------------------------------------------------
 * Battler Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battler:
 *
 * @param Defaults
 * @text Default Settings
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Defaults
 * @desc Default X offset for battler sprites.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Defaults
 * @desc Default Y offset for battler sprites.
 * @default 0
 *
 * @param ScaleX:num
 * @text Scale: X
 * @parent Defaults
 * @desc Default scale for X used by Dragonbones battlers.
 * @default 1.0
 *
 * @param FlipActors:eval
 * @text Flip for Actors?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value into negative automatically for all actors?
 * @default false
 *
 * @param FlipEnemies:eval
 * @text Flip for Enemies?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value into negative automatically for all enemies?
 * @default false
 *
 * @param ScaleY:num
 * @text Scale: Y
 * @parent Defaults
 * @desc Default scale for Y used by Dragonbones battlers.
 * @default 1.0
 *
 * @param TimeScale:num
 * @text Time Scale
 * @parent Defaults
 * @desc The rate at which animations play.
 * Higher numbers go faster.
 * @default 1.0
 *
 * @param Width:num
 * @text Width
 * @parent Defaults
 * @desc Treat battler sprites as if they have this width.
 * Used for Action Sequences.
 * @default 64
 *
 * @param Height:num
 * @text Height
 * @parent Defaults
 * @desc Treat battler sprites as if they have this height.
 * Used for Action Sequences.
 * @default 64
 *
 * @param IdleBypass
 * @text Idle Bypass
 *
 * @param IdleBypassList:arraystr
 * @text List
 * @parent IdleBypass
 * @type combo[]
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc This is a list of animations that will not return back to the idle animation after completion.
 * @default ["dead","escape","victory"]
 *
 * @param DefaultMotions
 * @text Default Motions
 *
 * @param MotionWalk:str
 * @text Walk
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default walk
 *
 * @param MotionWait:str
 * @text Wait
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default wait
 *
 * @param MotionChant:str
 * @text Chant
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default chant
 *
 * @param MotionGuard:str
 * @text Guard
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default guard
 *
 * @param MotionDamage:str
 * @text Damage
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default damage
 *
 * @param MotionEvade:str
 * @text Evade
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default evade
 *
 * @param MotionThrust:str
 * @text Thrust
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default thrust
 *
 * @param MotionSwing:str
 * @text Swing
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default swing
 *
 * @param MotionMissile:str
 * @text Missile
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default missile
 *
 * @param MotionSkill:str
 * @text Skill
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default skill
 *
 * @param MotionSpell:str
 * @text Spell
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default spell
 *
 * @param MotionItem:str
 * @text Item
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default item
 *
 * @param MotionEscape:str
 * @text Escape
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default escape
 *
 * @param MotionVictory:str
 * @text Victory
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default victory
 *
 * @param MotionDying:str
 * @text Dying
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default dying
 *
 * @param MotionAbnormal:str
 * @text Abnormal
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default abnormal
 *
 * @param MotionSleep:str
 * @text Sleep
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default sleep
 *
 * @param MotionDead:str
 * @text Dead
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default dead
 *
 */
/* ----------------------------------------------------------------------------
 * Map Sprite Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MapSprite:
 *
 * @param Defaults
 * @text Default Settings
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Defaults
 * @desc Default X offset for map sprites.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Defaults
 * @desc Default Y offset for map sprites.
 * @default 0
 *
 * @param ScaleX:num
 * @text Scale: X
 * @parent Defaults
 * @desc Default scale for X used by Dragonbones map sprites.
 * @default 0.5
 *
 * @param FlipLeft:eval
 * @text Flip Left?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing left-ward directions?
 * @default false
 *
 * @param FlipRight:eval
 * @text Flip Right?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing right-ward directions?
 * animation is found?
 * @default false
 *
 * @param ScaleY:num
 * @text Scale: Y
 * @parent Defaults
 * @desc Default scale for Y used by Dragonbones map sprites.
 * @default 0.5
 *
 * @param TimeScale:num
 * @text Time Scale
 * @parent Defaults
 * @desc The rate at which animations play.
 * Higher numbers go faster.
 * @default 1.0
 *
 * @param Width:num
 * @text Width
 * @parent Defaults
 * @desc Treat map sprites as if they have this width.
 * Used for various plugins.
 * @default 48
 *
 * @param Height:num
 * @text Height
 * @parent Defaults
 * @desc Treat map sprites as if they have this height.
 * Used for various plugins.
 * @default 48
 *
 * @param Animations
 * @text Motion Settings
 *
 * @param Idle:str
 * @text Idle
 * @parent Animations
 * @desc Base idle animation name used.
 * @default idle
 *
 * @param Walk:str
 * @text Walk
 * @parent Animations
 * @desc Base walk animation name used.
 * @default walk
 *
 * @param WalkTimer:num
 * @text Walk Timer
 * @parent Walk:str
 * @desc Number of frames to count as walking so that an idle animation isn't immediately forced upon stopping.
 * @default 2
 *
 * @param Dash:str
 * @text Dash
 * @parent Animations
 * @desc Base dash animation name used.
 * @default dash
 *
 * @param Jump:str
 * @text Jump
 * @parent Animations
 * @desc Base jump animation name used.
 * @default jump
 *
 * @param LadderIdle:str
 * @text Ladder (Idle)
 * @parent Animations
 * @desc Base ladder idle animation name used.
 * @default ladderidle
 *
 * @param LadderClimb:str
 * @text Ladder (Climb)
 * @parent Animations
 * @desc Base ladder climbing animation name used.
 * @default ladderclimb
 *
 * @param RopeIdle:str
 * @text Rope (Idle)
 * @parent Animations
 * @desc Base rope idle animation name used.
 * @default ropeidle
 *
 * @param RopeClimb:str
 * @text Rope (Climb)
 * @parent Animations
 * @desc Base rope climbing animation name used.
 * @default ropecllmb
 *
 */
//=============================================================================

const _0x51a2=['MapSprite_FollowerAnimationStop','visible','scale','description','ladderclimb','MotionMissile','isGuardWaiting','_battleAniSpeedLooping','name','playTimes','dragonbonesAnimation','Game_Actor_setup','MotionDead','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','prepareNextLoadArmature','concat','updateFrame','updateCharacterFrameDragonbonesUnion','Sprite_Enemy_updateBitmap','STR','Width','performAttack','guard','isEnemy','findPictureSprite','find','STRUCT','playDragonbonesMotion','refresh','escape','Sprite_Character_updateBitmap','setupDragonbonesDataNotetags','scaleX','data','712643jBmrad','FlipActors','Sprite_Enemy_initMembers','isActor','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','status','_dragonbonesFilename','1ojBfUA','addDragonbonesAnimationDirections','Sprite_Character_initialize','filename','MapSprite_PlayerAnimationStop','round','animationNames','Settings','height','loading','LoadedFilenames','requestMotion','makeDeepCopy','isSceneBattle','testLoaded','motion','TxaKey','trim','Game_Enemy_setup','walkRate','_dragonbonesFlipDirection','performDamage','initMembers','add','_dragonbonesSpriteContainer','Game_Picture_initialize','154210aqpJfE','ARRAYEVAL','Picture_ScaleDragonbones','Walk','_dragonbonesBattlerData','updateDragonbonesUnion','updateShadow','PixiFactory','_dragonbones','performActionDragonbonesUnion','MotionVictory','isMoving','push','format','updateDragonbonesSelection','dead','isItem','Scene_Battle_terminate','requestDragonbonesAnimation','texture','MotionEvade','isDashing','direction','currentDragonbonesAnimation','Battler_ActorChange','updateBitmap','VisuMZ_1_BattleCore','MotionAbnormal','dashRate','VisuMZ_1_EventsMoveCore','_shadowSprite','map','note','setupDragonbonesDataCommentTags','play','Game_Event_clearPageSettings','bitmap','795537xRLpEv','damage','OffsetX','runQueuedCallbacks','isCompleted','_character','index','TimeScale','Sprite_Actor_updateFrame','initMembersDragonbonesUnion','chant','terminate','MotionThrust','SkeKey','onLoadDragonbones','load','erasePicture','complete','VisuMZ_1_OptionsCore','setupDragonbonesData','LoopingAnimations','performCollapse','Battler','performDamageDragonbonesUnion','ladderidle','startMotion','createBaseDragonbonesSprite','Sprite_Picture_initialize','Filename','MapSprite_EventAnimationPlay','MotionWalk','abnormal','Game_Actor_performAttack','code','toLowerCase','idle','DefaultAnimation','RopeClimb','addChildAt','dragonbonesFlip','parse','VisuMZ_0_CoreEngine','MotionSwing','initDragonbonesData','isUndecided','ropeclimb','Sprite_Actor_updateBitmap','ScaleY','shared','performCollapseDragonbonesUnion','_scene','1XFFSWJ','includes','setFrame','MotionEscape','This\x20is\x20a\x20static\x20class','ActorID','isJumping','53zGBZIV','lastFileName','Picture_TimeScaleDragonbones','_weaponSprite','sleep','hasDragonbonesBattler','MotionChant','_mainSprite','_dragonbonesAnimation','call','erasePictureDragonbonesUnion','EventID','victory','_spriteset','Sprite_Actor_startMotion','dispose','MotionSleep','update','offsetY','actor','Game_Actor_performDamage','General','FollowerIndex','isAlive','width','Game_Battler_requestMotion','Game_Battler_requestMotionRefresh','722452ARnVvf','LadderIdle','length','_dragonbonesName','isSceneMap','ARRAYSTR','LoadQueue','list','removeChild','processLoad','return\x200','Idle','473960ZSjsPX','loadComplete','follower','performAction','bind','registerCommand','transform','MotionWait','flipRight','PictureID','ARRAYFUNC','shift','Game_Actor_performCollapse','type','MotionSkill','parseDragonBonesData','TxaExt','ropeidle','factory','Game_Actor_performAction','Game_Event_setupPageSettings','page','createArmature','_battler','skill','Picture_DragonbonesAnimation','timeScale','event','FlipRight','testArmature','lastAnimationName','Game_Event_refresh','MapSprite_ActorAnimationStop','battleAniSpeed','opacity','Sprite_Actor_updateShadow','initialize','MapSprite_EventAnimationStop','FUNC','ARRAYJSON','loadNextArmature','wait','disposeDragonbones','OffsetY','DragonbonesUnion','spell','Game_Enemy_performCollapse','prototype','leader','walk','MotionSpell','battler','setBattler','followers','MotionGuard','isHidden','Picture_DragonbonesOffset','createDefaultPicture','EVAL','constructor','addDragonbonesChild','Dash','filter','animation','MapSprite_ActorAnimationPlay','parseTextureAtlasData','dash','animations','ConvertParams','addChild','loadArmature','11317HXiNpu','playDragonbonesAnimation','match','hasDragonbones','LoadAnimation','Game_Screen_erasePicture','TexKey','updateDragonbonesArmature','updateDragonbonesAnimation','MotionDamage','MapSprite_FollowerAnimationPlay','_dragonbonesData','exit','JSON','2HfXIBl','setupPageSettings','Game_Player_refresh','1vDhrYM','attack','attachSpritesToDistortionSprite','checkDragonbonesStringTags','updateDragonbonesTimeScale','flipLeft','_enemyId','isGuard','RopeIdle','Loader','scaleY','showPicture','isOnLadder','dragonbonesSpriteData','jump','Game_Enemy_transform','AssetsPath','picture','enemy','item','ARRAYNUM','parameters','playDragonbonesIdleAnimation','Sprite_Picture_update','clearPageSettings','isSkill','_baseDragonbonesSprite','_pictures','Sprite_Enemy_setBattler','Sprite_Character_updateCharacterFrame','Jump','ARRAYSTRUCT','performActionMotions','411218CMGbDv','MotionItem','Dragonbones','findTargetSprite','_stateSprite','isDying','setupDragonbones','buildArmatureDisplay','isAttack','ScaleX','Animation','FlipEnemies','updateCharacterFrame','updateShadowDragonbonesUnion','updateDragonbonesProperties','CallbackQueue','Height','offsetX','_dragonbonesSpriteData','Game_Enemy_performAction','Game_CharacterBase_update','updateDragonbones','battlerSprites','_dragonbonesMoveTimer','setup','Sprite_Actor_initMembers','dragonbonesData','Game_Enemy_performDamage'];const _0x4f73=function(_0xa4b773,_0x593949){_0xa4b773=_0xa4b773-0xd8;let _0x51a2dc=_0x51a2[_0xa4b773];return _0x51a2dc;};const _0x4dc5c6=_0x4f73;(function(_0x92e8b1,_0x38efd4){const _0x1f624c=_0x4f73;while(!![]){try{const _0x5160c7=-parseInt(_0x1f624c(0x18b))*-parseInt(_0x1f624c(0x1f9))+parseInt(_0x1f624c(0x12c))+-parseInt(_0x1f624c(0x1a6))+parseInt(_0x1f624c(0x112))*-parseInt(_0x1f624c(0x1b2))+parseInt(_0x1f624c(0x22b))*parseInt(_0x1f624c(0x184))+-parseInt(_0x1f624c(0x20a))*parseInt(_0x1f624c(0x151))+parseInt(_0x1f624c(0x207))*parseInt(_0x1f624c(0x10b));if(_0x5160c7===_0x38efd4)break;else _0x92e8b1['push'](_0x92e8b1['shift']());}catch(_0x430bea){_0x92e8b1['push'](_0x92e8b1['shift']());}}}(_0x51a2,0x92226));var label=_0x4dc5c6(0x1de),tier=tier||0x0,dependencies=[_0x4dc5c6(0x22d)],pluginData=$plugins[_0x4dc5c6(0x1f0)](function(_0x5218a4){const _0x5b9af9=_0x4dc5c6;return _0x5218a4[_0x5b9af9(0x110)]&&_0x5218a4['description'][_0x5b9af9(0x185)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x4dc5c6(0x119)]||{},VisuMZ[_0x4dc5c6(0x1f6)]=function(_0x577d64,_0x51d2fd){const _0x56a5cf=_0x4dc5c6;for(const _0x1eaea1 in _0x51d2fd){if(_0x1eaea1[_0x56a5cf(0x1fb)](/(.*):(.*)/i)){const _0x1a1cb2=String(RegExp['$1']),_0x5c5597=String(RegExp['$2'])['toUpperCase']()[_0x56a5cf(0x123)]();let _0xda2753,_0x5c4703,_0x573872;switch(_0x5c5597){case'NUM':_0xda2753=_0x51d2fd[_0x1eaea1]!==''?Number(_0x51d2fd[_0x1eaea1]):0x0;break;case _0x56a5cf(0x21e):_0x5c4703=_0x51d2fd[_0x1eaea1]!==''?JSON['parse'](_0x51d2fd[_0x1eaea1]):[],_0xda2753=_0x5c4703[_0x56a5cf(0x14b)](_0x3b0e11=>Number(_0x3b0e11));break;case _0x56a5cf(0x1ec):_0xda2753=_0x51d2fd[_0x1eaea1]!==''?eval(_0x51d2fd[_0x1eaea1]):null;break;case _0x56a5cf(0x12d):_0x5c4703=_0x51d2fd[_0x1eaea1]!==''?JSON[_0x56a5cf(0x179)](_0x51d2fd[_0x1eaea1]):[],_0xda2753=_0x5c4703[_0x56a5cf(0x14b)](_0x3410e7=>eval(_0x3410e7));break;case _0x56a5cf(0x206):_0xda2753=_0x51d2fd[_0x1eaea1]!==''?JSON[_0x56a5cf(0x179)](_0x51d2fd[_0x1eaea1]):'';break;case _0x56a5cf(0x1d9):_0x5c4703=_0x51d2fd[_0x1eaea1]!==''?JSON[_0x56a5cf(0x179)](_0x51d2fd[_0x1eaea1]):[],_0xda2753=_0x5c4703[_0x56a5cf(0x14b)](_0x30d163=>JSON[_0x56a5cf(0x179)](_0x30d163));break;case _0x56a5cf(0x1d8):_0xda2753=_0x51d2fd[_0x1eaea1]!==''?new Function(JSON[_0x56a5cf(0x179)](_0x51d2fd[_0x1eaea1])):new Function(_0x56a5cf(0x1b0));break;case _0x56a5cf(0x1bc):_0x5c4703=_0x51d2fd[_0x1eaea1]!==''?JSON[_0x56a5cf(0x179)](_0x51d2fd[_0x1eaea1]):[],_0xda2753=_0x5c4703['map'](_0x206d58=>new Function(JSON[_0x56a5cf(0x179)](_0x206d58)));break;case _0x56a5cf(0xfc):_0xda2753=_0x51d2fd[_0x1eaea1]!==''?String(_0x51d2fd[_0x1eaea1]):'';break;case _0x56a5cf(0x1ab):_0x5c4703=_0x51d2fd[_0x1eaea1]!==''?JSON[_0x56a5cf(0x179)](_0x51d2fd[_0x1eaea1]):[],_0xda2753=_0x5c4703[_0x56a5cf(0x14b)](_0x44fe71=>String(_0x44fe71));break;case _0x56a5cf(0x103):_0x573872=_0x51d2fd[_0x1eaea1]!==''?JSON[_0x56a5cf(0x179)](_0x51d2fd[_0x1eaea1]):{},_0xda2753=VisuMZ[_0x56a5cf(0x1f6)]({},_0x573872);break;case _0x56a5cf(0x229):_0x5c4703=_0x51d2fd[_0x1eaea1]!==''?JSON[_0x56a5cf(0x179)](_0x51d2fd[_0x1eaea1]):[],_0xda2753=_0x5c4703[_0x56a5cf(0x14b)](_0xdeed5d=>VisuMZ[_0x56a5cf(0x1f6)]({},JSON[_0x56a5cf(0x179)](_0xdeed5d)));break;default:continue;}_0x577d64[_0x1a1cb2]=_0xda2753;}}return _0x577d64;},(_0x2d7336=>{const _0x2bf55e=_0x4dc5c6,_0x2b6330=_0x2d7336['name'];for(const _0xd03b60 of dependencies){if(!Imported[_0xd03b60]){alert(_0x2bf55e(0x10f)[_0x2bf55e(0x139)](_0x2b6330,_0xd03b60)),SceneManager[_0x2bf55e(0x205)]();break;}}const _0x5e968a=_0x2d7336[_0x2bf55e(0xec)];if(_0x5e968a[_0x2bf55e(0x1fb)](/\[Version[ ](.*?)\]/i)){const _0x462e02=Number(RegExp['$1']);_0x462e02!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x2b6330,_0x462e02)),SceneManager[_0x2bf55e(0x205)]());}if(_0x5e968a[_0x2bf55e(0x1fb)](/\[Tier[ ](\d+)\]/i)){const _0x978a1=Number(RegExp['$1']);_0x978a1<tier?(alert(_0x2bf55e(0xf6)[_0x2bf55e(0x139)](_0x2b6330,_0x978a1,tier)),SceneManager[_0x2bf55e(0x205)]()):tier=Math['max'](_0x978a1,tier);}VisuMZ[_0x2bf55e(0x1f6)](VisuMZ[label][_0x2bf55e(0x119)],_0x2d7336[_0x2bf55e(0x21f)]);})(pluginData);function DragonbonesManager(){const _0x3136ef=_0x4dc5c6;throw new Error(_0x3136ef(0x188));}DragonbonesManager['AssetsPath']=VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x119)][_0x4dc5c6(0x21a)],DragonbonesManager['DefaultAnimation']=VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x119)][_0x4dc5c6(0x1a0)][_0x4dc5c6(0x1fd)],DragonbonesManager[_0x4dc5c6(0x11c)]=[],DragonbonesManager['LoadQueue']=[],DragonbonesManager[_0x4dc5c6(0xdc)]=[],DragonbonesManager['test']=function(_0x4f7928,_0x2b3cb6,_0x258cf9,_0x19068d){const _0x19ac94=_0x4dc5c6;if(!_0x258cf9)_0x258cf9=SceneManager[_0x19ac94(0x183)];if(!_0x19068d)_0x19068d=_0x19ac94(0x1cf);if(_0x258cf9[_0x19068d]){const _0x504531=_0x258cf9[_0x19068d];_0x504531&&(_0x258cf9[_0x19ac94(0x1ae)](_0x504531),_0x504531[_0x19ac94(0x19a)]());}this[_0x19ac94(0x1f8)](_0x4f7928,DragonbonesManager[_0x19ac94(0x120)]['bind'](this,_0x4f7928,_0x2b3cb6,_0x258cf9,_0x19068d));},DragonbonesManager['testLoaded']=function(_0x846a25,_0x3f3715,_0x300140,_0x1c506d){const _0x470c24=_0x4dc5c6,_0x5cd0c1=this[_0x470c24(0x1c8)](_0x846a25);_0x5cd0c1&&(_0x300140[_0x470c24(0x1f7)](_0x5cd0c1),_0x5cd0c1['x']=Graphics[_0x470c24(0x1a3)]/0x2,_0x5cd0c1['y']=Graphics['height']*0x3/0x4,_0x3f3715=_0x3f3715||DragonbonesManager[_0x470c24(0x175)],_0x3f3715=_0x3f3715[_0x470c24(0x173)](),_0x5cd0c1[_0x470c24(0x1f1)][_0x470c24(0x1f5)][_0x3f3715]&&_0x5cd0c1[_0x470c24(0x1f1)][_0x470c24(0x14e)](_0x3f3715)),_0x300140[_0x1c506d]=_0x5cd0c1;},DragonbonesManager[_0x4dc5c6(0x1c8)]=function(_0x36e3b1){const _0x18b37a=_0x4dc5c6,_0x1bbc4c=dragonBones[_0x18b37a(0x133)][_0x18b37a(0x1c4)][_0x18b37a(0x232)](_0x36e3b1);if(!_0x1bbc4c)return null;for(const _0x403c1e in _0x1bbc4c[_0x18b37a(0x1f1)][_0x18b37a(0x1f5)]){if(_0x403c1e[_0x18b37a(0x173)]()===_0x403c1e)continue;_0x1bbc4c[_0x18b37a(0x1f1)]['animations'][_0x403c1e[_0x18b37a(0x173)]()]=_0x1bbc4c[_0x18b37a(0x1f1)][_0x18b37a(0x1f5)][_0x403c1e],delete _0x1bbc4c[_0x18b37a(0x1f1)][_0x18b37a(0x1f5)][_0x403c1e];}for(let _0x336478=0x0;_0x336478<_0x1bbc4c[_0x18b37a(0x1f1)][_0x18b37a(0x118)][_0x18b37a(0x1a8)];_0x336478++){_0x1bbc4c[_0x18b37a(0x1f1)][_0x18b37a(0x118)][_0x336478]=_0x1bbc4c[_0x18b37a(0x1f1)][_0x18b37a(0x118)][_0x336478][_0x18b37a(0x173)]();}const _0x5b9d9c=VisuMZ[_0x18b37a(0x1de)][_0x18b37a(0x119)]['General'][_0x18b37a(0x165)];for(let _0x540bda of _0x5b9d9c){_0x540bda=_0x540bda[_0x18b37a(0x173)]()[_0x18b37a(0x123)]();_0x1bbc4c[_0x18b37a(0x1f1)][_0x18b37a(0x1f5)][_0x540bda]&&(_0x1bbc4c['animation'][_0x18b37a(0x1f5)][_0x540bda][_0x18b37a(0xf2)]=0x0);for(let _0x2d3985=0x1;_0x2d3985<=0x9;_0x2d3985++){const _0x22480f=_0x540bda+_0x2d3985;_0x1bbc4c[_0x18b37a(0x1f1)][_0x18b37a(0x1f5)][_0x22480f]&&(_0x1bbc4c[_0x18b37a(0x1f1)][_0x18b37a(0x1f5)][_0x22480f][_0x18b37a(0xf2)]=0x0);}}return _0x1bbc4c[_0x18b37a(0x1f1)][_0x18b37a(0x1f5)][DragonbonesManager[_0x18b37a(0x175)]]&&_0x1bbc4c['animation'][_0x18b37a(0x14e)](DragonbonesManager[_0x18b37a(0x175)]),_0x1bbc4c;},DragonbonesManager['loadArmature']=function(_0x1ef98b,_0x19c68e){const _0x14bdc0=_0x4dc5c6;_0x1ef98b=_0x1ef98b[_0x14bdc0(0x123)](),DragonbonesManager[_0x14bdc0(0x1ac)][_0x14bdc0(0x138)](_0x1ef98b),DragonbonesManager[_0x14bdc0(0xdc)][_0x14bdc0(0x138)](_0x19c68e);const _0x58b634=PIXI[_0x14bdc0(0x213)][_0x14bdc0(0x181)];!_0x58b634[_0x14bdc0(0x11b)]&&this[_0x14bdc0(0x1da)]();},DragonbonesManager[_0x4dc5c6(0x1da)]=function(){const _0x58bb6e=_0x4dc5c6;DragonbonesManager['LoadQueue'][_0x58bb6e(0x1a8)]>0x0?this['prepareNextLoadArmature']():this[_0x58bb6e(0x154)]();},DragonbonesManager[_0x4dc5c6(0xf7)]=function(){const _0x329a33=_0x4dc5c6,_0x187079=DragonbonesManager[_0x329a33(0x1ac)][_0x329a33(0x1bd)]();if(this[_0x329a33(0x11c)][_0x329a33(0x185)](_0x187079))this[_0x329a33(0x1da)]();else!this[_0x329a33(0x11c)]['includes'](_0x187079)&&this[_0x329a33(0x1af)](_0x187079);},DragonbonesManager['processLoad']=function(_0x187206){const _0x513b03=_0x4dc5c6;this[_0x513b03(0x11c)][_0x513b03(0x138)](_0x187206),this[_0x513b03(0x18c)]=_0x187206;const _0x339efc=VisuMZ[_0x513b03(0x1de)][_0x513b03(0x119)][_0x513b03(0x1a0)],_0x22d9f0=DragonbonesManager[_0x513b03(0x21a)],_0x5649e0=PIXI[_0x513b03(0x213)][_0x513b03(0x181)];_0x5649e0[_0x513b03(0x129)](_0x187206+_0x339efc[_0x513b03(0x15e)],_0x22d9f0+_0x187206+_0x339efc['SkeExt']),_0x5649e0['add'](_0x187206+_0x339efc[_0x513b03(0x1ff)],_0x22d9f0+_0x187206+_0x339efc['TexExt']),_0x5649e0['add'](_0x187206+_0x339efc[_0x513b03(0x122)],_0x22d9f0+_0x187206+_0x339efc[_0x513b03(0x1c2)]),_0x5649e0['once'](_0x513b03(0x162),DragonbonesManager['loadComplete'],this),_0x5649e0[_0x513b03(0x160)]();},DragonbonesManager[_0x4dc5c6(0x1b3)]=function(_0x4328a9,_0x3df784){const _0x4acde2=_0x4dc5c6,_0x530104=VisuMZ['DragonbonesUnion'][_0x4acde2(0x119)][_0x4acde2(0x1a0)],_0x37a982=this[_0x4acde2(0x18c)],_0x3c2d6e=dragonBones[_0x4acde2(0x133)][_0x4acde2(0x1c4)];_0x3c2d6e[_0x4acde2(0x1c1)](_0x3df784[_0x37a982+_0x530104['SkeKey']][_0x4acde2(0x10a)]),_0x3c2d6e[_0x4acde2(0x1f3)](_0x3df784[_0x37a982+_0x530104[_0x4acde2(0x1ff)]][_0x4acde2(0x10a)],_0x3df784[_0x37a982+_0x530104[_0x4acde2(0x122)]][_0x4acde2(0x13f)]),this['loadNextArmature']();},DragonbonesManager[_0x4dc5c6(0x154)]=function(){const _0x48ae58=_0x4dc5c6;while(DragonbonesManager[_0x48ae58(0xdc)][_0x48ae58(0x1a8)]>0x0){const _0x2e31e1=DragonbonesManager[_0x48ae58(0xdc)][_0x48ae58(0x1bd)]();if(_0x2e31e1)_0x2e31e1(this);}},PluginManager[_0x4dc5c6(0x1b7)](pluginData[_0x4dc5c6(0xf1)],_0x4dc5c6(0x144),_0xd9b37f=>{const _0x259f70=_0x4dc5c6;if(!$gameMap)return;VisuMZ['ConvertParams'](_0xd9b37f,_0xd9b37f);const _0xe7b5bf=$gameActors[_0x259f70(0x19e)](_0xd9b37f[_0x259f70(0x189)]);if(!_0xe7b5bf)return;_0xe7b5bf[_0x259f70(0x130)]={'battler':_0xd9b37f[_0x259f70(0x16d)],'scaleX':_0xd9b37f['ScaleX'],'scaleY':_0xd9b37f[_0x259f70(0x180)],'offsetX':_0xd9b37f[_0x259f70(0x153)],'offsetY':_0xd9b37f[_0x259f70(0x1dd)],'timeScale':_0xd9b37f['TimeScale'],'width':_0xd9b37f[_0x259f70(0xfd)],'height':_0xd9b37f[_0x259f70(0xdd)],'motion':{'walk':_0xd9b37f[_0x259f70(0x16f)],'wait':_0xd9b37f['MotionWait'],'chant':_0xd9b37f['MotionChant'],'guard':_0xd9b37f[_0x259f70(0x1e8)],'damage':_0xd9b37f[_0x259f70(0x202)],'evade':_0xd9b37f['MotionEvade'],'thrust':_0xd9b37f[_0x259f70(0x15d)],'swing':_0xd9b37f[_0x259f70(0x17b)],'missile':_0xd9b37f[_0x259f70(0xee)],'skill':_0xd9b37f[_0x259f70(0x1c0)],'spell':_0xd9b37f[_0x259f70(0x1e4)],'item':_0xd9b37f['MotionItem'],'escape':_0xd9b37f[_0x259f70(0x187)],'victory':_0xd9b37f[_0x259f70(0x136)],'dying':_0xd9b37f['MotionDying'],'abnormal':_0xd9b37f[_0x259f70(0x147)],'sleep':_0xd9b37f[_0x259f70(0x19b)],'dead':_0xd9b37f[_0x259f70(0xf5)]}};}),SceneManager[_0x4dc5c6(0x11f)]=function(){const _0x2289ee=_0x4dc5c6;return this[_0x2289ee(0x183)]&&this[_0x2289ee(0x183)][_0x2289ee(0x1ed)]===Scene_Battle;},SceneManager[_0x4dc5c6(0x1aa)]=function(){const _0x153490=_0x4dc5c6;return this['_scene']&&this[_0x153490(0x183)]['constructor']===Scene_Map;},Game_BattlerBase[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x1e5)]=function(){const _0x3f0a90=_0x4dc5c6;if(!SceneManager['isSceneBattle']())return null;if(!SceneManager['_scene'][_0x3f0a90(0x198)])return null;return SceneManager['_scene']['_spriteset'][_0x3f0a90(0x22e)](this);},Game_BattlerBase[_0x4dc5c6(0x1e1)]['initDragonbonesData']=function(){const _0x59e916=_0x4dc5c6,_0x38f98d=VisuMZ[_0x59e916(0x1de)][_0x59e916(0x119)][_0x59e916(0x167)];this[_0x59e916(0x130)]={'battler':'','scaleX':_0x38f98d['ScaleX'],'scaleY':_0x38f98d[_0x59e916(0x180)],'width':_0x38f98d[_0x59e916(0xfd)],'height':_0x38f98d[_0x59e916(0xdd)],'offsetX':_0x38f98d[_0x59e916(0x153)],'offsetY':_0x38f98d[_0x59e916(0x1dd)],'timeScale':_0x38f98d[_0x59e916(0x158)],'motion':{'walk':_0x38f98d[_0x59e916(0x16f)],'wait':_0x38f98d[_0x59e916(0x1b9)],'chant':_0x38f98d[_0x59e916(0x191)],'guard':_0x38f98d[_0x59e916(0x1e8)],'damage':_0x38f98d[_0x59e916(0x202)],'evade':_0x38f98d[_0x59e916(0x140)],'thrust':_0x38f98d[_0x59e916(0x15d)],'swing':_0x38f98d[_0x59e916(0x17b)],'missile':_0x38f98d[_0x59e916(0xee)],'skill':_0x38f98d[_0x59e916(0x1c0)],'spell':_0x38f98d[_0x59e916(0x1e4)],'item':_0x38f98d[_0x59e916(0x22c)],'escape':_0x38f98d['MotionEscape'],'victory':_0x38f98d['MotionVictory'],'dying':_0x38f98d['MotionDying'],'abnormal':_0x38f98d['MotionAbnormal'],'sleep':_0x38f98d[_0x59e916(0x19b)],'dead':_0x38f98d[_0x59e916(0xf5)]}};if(_0x38f98d[_0x59e916(0x10c)]&&this[_0x59e916(0x10e)]())this[_0x59e916(0x130)][_0x59e916(0x109)]*=-0x1;if(_0x38f98d[_0x59e916(0xd8)]&&this[_0x59e916(0x100)]())this[_0x59e916(0x130)][_0x59e916(0x109)]*=-0x1;},Game_BattlerBase[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x164)]=function(){const _0x15804f=_0x4dc5c6,_0x37dc36=VisuMZ[_0x15804f(0x1de)][_0x15804f(0x119)][_0x15804f(0x167)],_0x179cf7=(this['isActor']()?this['actor']():this[_0x15804f(0x21c)]())['note'],_0x20b806=this[_0x15804f(0xe7)]();_0x179cf7[_0x15804f(0x1fb)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:BATTLER|SKIN|NAME):[ ]*(.*)>/i)&&(_0x20b806[_0x15804f(0x1e5)]=String(RegExp['$1'])[_0x15804f(0x123)]());_0x179cf7[_0x15804f(0x1fb)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER):[ ]*(.*)>/i)&&(_0x20b806[_0x15804f(0x1e5)]=String(RegExp['$1'])[_0x15804f(0x123)]());_0x179cf7[_0x15804f(0x1fb)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]SCALE:[ ](.*),[ ](.*)>/i)&&(_0x20b806[_0x15804f(0x109)]=Number(RegExp['$1']),_0x20b806[_0x15804f(0x214)]=Number(RegExp['$2']));_0x179cf7['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:SCALEX|SCALE X):[ ](.*)>/i)&&(_0x20b806[_0x15804f(0x109)]=Number(RegExp['$1']));_0x179cf7[_0x15804f(0x1fb)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]SCALEY:[ ](.*)>/i)&&(_0x20b806[_0x15804f(0x214)]=Number(RegExp['$1']));_0x179cf7[_0x15804f(0x1fb)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]OFFSET:[ ](.*),[ ](.*)>/i)&&(_0x20b806[_0x15804f(0xde)]=Number(RegExp['$1']),_0x20b806[_0x15804f(0x19d)]=Number(RegExp['$2']));_0x179cf7[_0x15804f(0x1fb)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:OFFSETX|OFFSET X):[ ](.*)>/i)&&(_0x20b806['offsetX']=Number(RegExp['$1']));_0x179cf7[_0x15804f(0x1fb)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:OFFSETY|OFFSET Y):[ ](.*)>/i)&&(_0x20b806['offsetY']=Number(RegExp['$1']));_0x179cf7['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:TIMESCALE|TIME SCALE):[ ](.*)>/i)&&(_0x20b806[_0x15804f(0x1cc)]=Number(RegExp['$1']));_0x179cf7[_0x15804f(0x1fb)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]SIZE:[ ](.*),[ ](.*)>/i)&&(_0x20b806[_0x15804f(0x1a3)]=Number(RegExp['$1']),_0x20b806[_0x15804f(0x11a)]=Number(RegExp['$2']));_0x179cf7['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]WIDTH:[ ](.*)>/i)&&(_0x20b806['width']=Number(RegExp['$1']));_0x179cf7[_0x15804f(0x1fb)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]HEIGHT:[ ](.*)>/i)&&(_0x20b806['height']=Number(RegExp['$1']));const _0x47dff1=_0x179cf7[_0x15804f(0x1fb)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:ANI|MOTION)[ ](.*):[ ](.*)>/gi);if(_0x47dff1)for(const _0x583bd4 of _0x47dff1){_0x583bd4['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:ANI|MOTION)[ ](.*):[ ](.*)>/i);const _0x54cf35=String(RegExp['$1'])[_0x15804f(0x173)]()[_0x15804f(0x123)](),_0x5ce9bb=String(RegExp['$2'])[_0x15804f(0x123)]();_0x20b806[_0x15804f(0x121)][_0x54cf35]=_0x5ce9bb;}if(_0x179cf7[_0x15804f(0x1fb)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER) (?:SETTINGS|SETTING)>\s*([\s\S]*)\s*<\/(?:DB|DRAGONBONE|DRAGONBONES BATTLER) (?:SETTINGS|SETTING)>/i)){const _0x222fc7=String(RegExp['$1']);_0x222fc7[_0x15804f(0x1fb)](/(?:BATTLER|SKIN|NAME|FILENAME):[ ]*(.*)/i)&&(_0x20b806[_0x15804f(0x1e5)]=String(RegExp['$1'])[_0x15804f(0x123)]());_0x222fc7[_0x15804f(0x1fb)](/SCALE:[ ](.*),[ ](.*)/i)&&(_0x20b806[_0x15804f(0x109)]=Number(RegExp['$1']),_0x20b806[_0x15804f(0x214)]=Number(RegExp['$2']));_0x222fc7[_0x15804f(0x1fb)](/(?:SCALEX|SCALE X):[ ](.*)/i)&&(_0x20b806[_0x15804f(0x109)]=Number(RegExp['$1']));_0x222fc7[_0x15804f(0x1fb)](/(?:SCALEY|SCALE Y):[ ](.*)/i)&&(_0x20b806['scaleY']=Number(RegExp['$1']));_0x222fc7[_0x15804f(0x1fb)](/OFFSET:[ ](.*),[ ](.*)/i)&&(_0x20b806[_0x15804f(0xde)]=Number(RegExp['$1']),_0x20b806[_0x15804f(0x19d)]=Number(RegExp['$2']));_0x222fc7[_0x15804f(0x1fb)](/(?:OFFSETX|OFFSET X):[ ](.*)/i)&&(_0x20b806['offsetX']=Number(RegExp['$1']));_0x222fc7[_0x15804f(0x1fb)](/(?:OFFSETY|OFFSET Y):[ ](.*)/i)&&(_0x20b806['offsetY']=Number(RegExp['$1']));_0x222fc7[_0x15804f(0x1fb)](/(?:TIMESCALE|TIME SCALE):[ ](.*)/i)&&(_0x20b806[_0x15804f(0x1cc)]=Number(RegExp['$1']));_0x222fc7[_0x15804f(0x1fb)](/SIZE:[ ](.*),[ ](.*)/i)&&(_0x20b806[_0x15804f(0x1a3)]=Number(RegExp['$1']),_0x20b806[_0x15804f(0x11a)]=Number(RegExp['$2']));_0x222fc7['match'](/WIDTH:[ ](.*)/i)&&(_0x20b806[_0x15804f(0x1a3)]=Number(RegExp['$1']));_0x222fc7[_0x15804f(0x1fb)](/HEIGHT:[ ](.*)/i)&&(_0x20b806[_0x15804f(0x11a)]=Number(RegExp['$1']));const _0x470ba0=_0x222fc7[_0x15804f(0x1fb)](/(?:ANI|MOTION)[ ](.*):[ ](.*)/gi);if(_0x470ba0)for(const _0xe7015d of _0x470ba0){_0xe7015d['match'](/(?:ANI|MOTION)[ ](.*):[ ](.*)/i);const _0x3d7628=String(RegExp['$1'])[_0x15804f(0x173)]()[_0x15804f(0x123)](),_0x538c77=String(RegExp['$2'])['trim']();_0x20b806['motion'][_0x3d7628]=_0x538c77;}}if(_0x37dc36[_0x15804f(0x10c)]&&this[_0x15804f(0x10e)]())_0x20b806[_0x15804f(0x109)]*=-0x1;if(_0x37dc36['FlipEnemies']&&this[_0x15804f(0x100)]())_0x20b806[_0x15804f(0x109)]*=-0x1;},Game_BattlerBase['prototype']['dragonbonesData']=function(){const _0x317bb5=_0x4dc5c6;if(this[_0x317bb5(0x130)]!==undefined)return this[_0x317bb5(0x130)];return this[_0x317bb5(0x17c)](),this['setupDragonbonesData'](),this[_0x317bb5(0x130)];},Game_BattlerBase[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x190)]=function(){const _0x3dbf16=_0x4dc5c6;return this[_0x3dbf16(0x1e5)]()&&this['dragonbonesData']()['battler']!=='';},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x1a4)]=Game_Battler[_0x4dc5c6(0x1e1)]['requestMotion'],Game_Battler[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x11d)]=function(_0x1c9af6){const _0x2d8881=_0x4dc5c6;VisuMZ[_0x2d8881(0x1de)][_0x2d8881(0x1a4)][_0x2d8881(0x194)](this,_0x1c9af6),this[_0x2d8881(0x190)]()&&this[_0x2d8881(0x1e5)]()[_0x2d8881(0x104)](_0x1c9af6);},VisuMZ[_0x4dc5c6(0x1de)]['Game_Battler_requestMotionRefresh']=Game_Battler[_0x4dc5c6(0x1e1)]['requestMotionRefresh'],Game_Battler[_0x4dc5c6(0x1e1)]['requestMotionRefresh']=function(){const _0x644210=_0x4dc5c6;VisuMZ['DragonbonesUnion'][_0x644210(0x1a5)][_0x644210(0x194)](this),this[_0x644210(0x190)]()&&this[_0x644210(0x1e5)]()[_0x644210(0x220)]();},Game_Battler['prototype'][_0x4dc5c6(0x13e)]=function(_0x1ea3eb){const _0x2a759f=_0x4dc5c6;this[_0x2a759f(0x190)]()&&this[_0x2a759f(0x1e5)]()[_0x2a759f(0x1fa)](_0x1ea3eb);},Game_Battler[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x168)]=function(){const _0x45c242=_0x4dc5c6;if(!this[_0x45c242(0x190)]())return;this[_0x45c242(0x11d)]('damage');},Game_Battler[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x182)]=function(){const _0x467116=_0x4dc5c6;if(!this[_0x467116(0x190)]())return;this['requestMotion'](_0x467116(0x13b));},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0xf4)]=Game_Actor[_0x4dc5c6(0x1e1)][_0x4dc5c6(0xe5)],Game_Actor[_0x4dc5c6(0x1e1)][_0x4dc5c6(0xe5)]=function(_0x16990d){const _0x362efa=_0x4dc5c6;VisuMZ['DragonbonesUnion'][_0x362efa(0xf4)]['call'](this,_0x16990d),this[_0x362efa(0x17c)](),this[_0x362efa(0x164)]();},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x1c5)]=Game_Actor[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x1b5)],Game_Actor['prototype']['performAction']=function(_0x2f97a4){const _0x17548d=_0x4dc5c6;this[_0x17548d(0x13e)]('attack'),VisuMZ[_0x17548d(0x1de)]['Game_Actor_performAction']['call'](this,_0x2f97a4);},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x171)]=Game_Actor[_0x4dc5c6(0x1e1)][_0x4dc5c6(0xfe)],Game_Actor[_0x4dc5c6(0x1e1)][_0x4dc5c6(0xfe)]=function(){const _0x1fb2af=_0x4dc5c6;this['requestDragonbonesAnimation'](_0x1fb2af(0x20b)),VisuMZ['DragonbonesUnion']['Game_Actor_performAttack'][_0x1fb2af(0x194)](this);},VisuMZ['DragonbonesUnion']['Game_Actor_performDamage']=Game_Actor[_0x4dc5c6(0x1e1)]['performDamage'],Game_Actor['prototype']['performDamage']=function(){const _0x537437=_0x4dc5c6;VisuMZ[_0x537437(0x1de)][_0x537437(0x19f)][_0x537437(0x194)](this),this[_0x537437(0x168)]();},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x1be)]=Game_Actor[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x166)],Game_Actor[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x166)]=function(){const _0x50bc13=_0x4dc5c6;VisuMZ[_0x50bc13(0x1de)][_0x50bc13(0x1be)][_0x50bc13(0x194)](this),this[_0x50bc13(0x182)]();},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x124)]=Game_Enemy[_0x4dc5c6(0x1e1)][_0x4dc5c6(0xe5)],Game_Enemy['prototype'][_0x4dc5c6(0xe5)]=function(_0x572afe,_0x3e0af7,_0x541751){const _0x4fc03e=_0x4dc5c6;VisuMZ[_0x4fc03e(0x1de)]['Game_Enemy_setup']['call'](this,_0x572afe,_0x3e0af7,_0x541751),this[_0x4fc03e(0x17c)](),this[_0x4fc03e(0x164)]();},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x219)]=Game_Enemy[_0x4dc5c6(0x1e1)]['transform'],Game_Enemy[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x1b8)]=function(_0x46071d){const _0x3421bb=_0x4dc5c6,_0x1ef629=this['_enemyId'];VisuMZ[_0x3421bb(0x1de)][_0x3421bb(0x219)][_0x3421bb(0x194)](this,_0x46071d),this[_0x3421bb(0x210)]!==_0x1ef629&&(this[_0x3421bb(0x17c)](),this[_0x3421bb(0x164)]());},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0xe0)]=Game_Enemy[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x1b5)],Game_Enemy[_0x4dc5c6(0x1e1)]['performAction']=function(_0x4b1c24){const _0x126d25=_0x4dc5c6;VisuMZ['DragonbonesUnion']['Game_Enemy_performAction'][_0x126d25(0x194)](this,_0x4b1c24),this['performActionDragonbonesUnion'](_0x4b1c24);},Game_Enemy['prototype'][_0x4dc5c6(0x135)]=function(_0x267f42){const _0x11b207=_0x4dc5c6;if(!this[_0x11b207(0x190)]())return;this['requestDragonbonesAnimation'](_0x11b207(0x20b));if(Imported[_0x11b207(0x146)])return this[_0x11b207(0x22a)](_0x267f42);if(_0x267f42[_0x11b207(0x233)]())this['requestDragonbonesAnimation'](_0x11b207(0x20b));else{if(_0x267f42['isGuard']())this[_0x11b207(0x11d)](_0x11b207(0xff));else{if(_0x267f42['isMagicSkill']())this[_0x11b207(0x11d)](_0x11b207(0x1df));else{if(_0x267f42[_0x11b207(0x223)]())_0x267f42[_0x11b207(0x21d)]()[_0x11b207(0x152)][_0x11b207(0x1bf)]>0x0?this[_0x11b207(0x13e)](_0x11b207(0x20b)):this[_0x11b207(0x11d)](_0x11b207(0x1ca));else _0x267f42[_0x11b207(0x13c)]()&&this[_0x11b207(0x11d)](_0x11b207(0x21d));}}}},VisuMZ['DragonbonesUnion'][_0x4dc5c6(0xe8)]=Game_Enemy[_0x4dc5c6(0x1e1)]['performDamage'],Game_Enemy[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x127)]=function(){const _0x37635b=_0x4dc5c6;VisuMZ[_0x37635b(0x1de)][_0x37635b(0xe8)][_0x37635b(0x194)](this),this['performDamageDragonbonesUnion']();},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x1e0)]=Game_Enemy[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x166)],Game_Enemy['prototype'][_0x4dc5c6(0x166)]=function(){const _0x375c33=_0x4dc5c6;VisuMZ[_0x375c33(0x1de)][_0x375c33(0x1e0)][_0x375c33(0x194)](this),this[_0x375c33(0x182)]();},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x13d)]=Scene_Battle[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x15c)],Scene_Battle['prototype']['terminate']=function(){const _0x1a3a0c=_0x4dc5c6;this[_0x1a3a0c(0x198)][_0x1a3a0c(0x1dc)](),VisuMZ[_0x1a3a0c(0x1de)][_0x1a3a0c(0x13d)]['call'](this);},Sprite_Battler[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x15a)]=function(){const _0x37682f=_0x4dc5c6;this['_dragonbones']=null,this[_0x37682f(0x1a9)]='';},Sprite_Battler[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x231)]=function(){const _0x4a7515=_0x4dc5c6;this[_0x4a7515(0x1dc)]();const _0x528b0b=this[_0x4a7515(0x1c9)][_0x4a7515(0xe7)]();this[_0x4a7515(0x1a9)]=_0x528b0b[_0x4a7515(0x1e5)],armatureName=_0x528b0b[_0x4a7515(0x1e5)],DragonbonesManager[_0x4a7515(0x1f8)](armatureName,this[_0x4a7515(0x15f)]['bind'](this)),this[_0x4a7515(0x150)]=new Bitmap(_0x528b0b[_0x4a7515(0x1a3)],_0x528b0b[_0x4a7515(0x11a)]),this['_mainSprite']&&(this['_mainSprite'][_0x4a7515(0x150)]=new Bitmap(_0x528b0b[_0x4a7515(0x1a3)],_0x528b0b[_0x4a7515(0x11a)]));},Sprite_Battler['prototype'][_0x4dc5c6(0x1dc)]=function(){const _0x439e7b=_0x4dc5c6;this[_0x439e7b(0x134)]&&(this[_0x439e7b(0x12a)]&&this[_0x439e7b(0x12a)][_0x439e7b(0x1ae)](this[_0x439e7b(0x134)]),this[_0x439e7b(0x1ae)](this[_0x439e7b(0x134)]),this['_dragonbones'][_0x439e7b(0x19a)](),delete this[_0x439e7b(0x134)],delete this[_0x439e7b(0x1a9)]);},Sprite_Battler['prototype']['onLoadDragonbones']=function(){const _0x40de17=_0x4dc5c6,_0x14e25b=this[_0x40de17(0x1c9)]['dragonbonesData']();this[_0x40de17(0x134)]=DragonbonesManager[_0x40de17(0x1c8)](_0x14e25b[_0x40de17(0x1e5)]),!this[_0x40de17(0x12a)]&&(this[_0x40de17(0x12a)]=new Sprite(),this[_0x40de17(0x12a)][_0x40de17(0x1f7)](this[_0x40de17(0x134)])),this[_0x40de17(0x177)](this['_dragonbonesSpriteContainer'],0x0),this[_0x40de17(0x20c)]&&(this[_0x40de17(0x20c)](),this[_0x40de17(0x12a)][_0x40de17(0x1f7)](this[_0x40de17(0x134)])),this['playDragonbonesIdleAnimation'](),this[_0x40de17(0x134)]['x']=_0x14e25b[_0x40de17(0xde)],this[_0x40de17(0x134)]['y']=_0x14e25b['offsetY'],this[_0x40de17(0x134)]['scale']['x']=_0x14e25b['scaleX'],this[_0x40de17(0x134)][_0x40de17(0xeb)]['y']=_0x14e25b[_0x40de17(0x214)],this[_0x40de17(0x1c9)]&&this[_0x40de17(0x1c9)][_0x40de17(0x1e9)]()&&(this[_0x40de17(0x1d4)]=0x0);},Sprite_Battler['prototype']['playDragonbonesMotion']=function(_0x3583a4){const _0x1156ef=_0x4dc5c6;if(!this[_0x1156ef(0x134)])return;const _0x1839ba=this[_0x1156ef(0x1c9)][_0x1156ef(0xe7)]();if(_0x1839ba[_0x1156ef(0x121)][_0x3583a4]){const _0x1a9ff5=_0x1839ba[_0x1156ef(0x121)][_0x3583a4];this[_0x1156ef(0x1fa)](_0x1a9ff5);}},Sprite_Battler['prototype'][_0x4dc5c6(0x1fa)]=function(_0x3a83a0){const _0x4f3f12=_0x4dc5c6;_0x3a83a0=_0x3a83a0[_0x4f3f12(0x173)]();if(!this[_0x4f3f12(0x134)])return;const _0x481ab6=this['_dragonbones'][_0x4f3f12(0x1f1)];if(_0x481ab6[_0x4f3f12(0x1f5)][_0x3a83a0]){const _0x47d08d=_0x481ab6['lastAnimationName'],_0x3545ae=[_0x4f3f12(0x174),_0x4f3f12(0x1e3),_0x4f3f12(0x1db),_0x4f3f12(0x15b),_0x4f3f12(0xff),'dying',_0x4f3f12(0x170),_0x4f3f12(0x18f),_0x4f3f12(0x13b)];if(_0x47d08d===_0x3a83a0&&_0x3545ae[_0x4f3f12(0x185)](_0x3a83a0))return;_0x481ab6[_0x4f3f12(0x14e)](_0x3a83a0);}},Sprite_Battler[_0x4dc5c6(0x1e1)][_0x4dc5c6(0xe2)]=function(){const _0x3f357b=_0x4dc5c6;this['updateDragonbonesTimeScale'](),this[_0x3f357b(0x201)](),this[_0x3f357b(0x13a)]();},Sprite_Battler[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x20e)]=function(){const _0x9ba923=_0x4dc5c6;if(!this[_0x9ba923(0x134)])return;let _0x1ce807=this[_0x9ba923(0x1c9)][_0x9ba923(0xe7)]()[_0x9ba923(0x1cc)];const _0x175069=SceneManager[_0x9ba923(0x183)];Imported[_0x9ba923(0x17a)]&&_0x175069['_playtestF7Looping']&&$gameTemp['_playTestFastMode']&&(_0x1ce807*=0x2),Imported[_0x9ba923(0x163)]&&_0x175069[_0x9ba923(0xf0)]&&(_0x1ce807*=(ConfigManager[_0x9ba923(0x1d3)]||0x0)+0x1),this[_0x9ba923(0x134)]['animation'][_0x9ba923(0x1cc)]=_0x1ce807;},Sprite_Battler['prototype'][_0x4dc5c6(0x201)]=function(){const _0x5f4f86=_0x4dc5c6;if(!this[_0x5f4f86(0x134)])return;const _0x5b3ea6=this[_0x5f4f86(0x134)][_0x5f4f86(0x1f1)];if(_0x5b3ea6['isCompleted']){const _0x406d6b=_0x5b3ea6[_0x5f4f86(0x1d0)];let _0x211ac5=VisuMZ['DragonbonesUnion'][_0x5f4f86(0x119)][_0x5f4f86(0x167)]['IdleBypassList'];_0x211ac5===undefined&&(_0x211ac5=[_0x5f4f86(0x13b),_0x5f4f86(0x106),_0x5f4f86(0x197)]),!_0x211ac5['includes'](_0x406d6b)&&this['playDragonbonesIdleAnimation']();}},Sprite_Battler[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x13a)]=function(){return;},Sprite_Battler[_0x4dc5c6(0x1e1)]['playDragonbonesIdleAnimation']=function(){const _0x89c6bc=_0x4dc5c6;if(!this[_0x89c6bc(0x134)])return;const _0x35f9bd=this[_0x89c6bc(0x1c9)];if(!_0x35f9bd)return;const _0x16d90f=this[_0x89c6bc(0x134)][_0x89c6bc(0x1f1)];if(_0x16d90f&&!_0x16d90f[_0x89c6bc(0x155)])return;this[_0x89c6bc(0x1c9)][_0x89c6bc(0x1a2)]()&&this['playDragonbonesAnimation']('idle');const _0x47a8fc=_0x35f9bd['stateMotionIndex']();if(_0x35f9bd['isInputting']()||_0x35f9bd['isActing']())this[_0x89c6bc(0x104)](_0x89c6bc(0x1e3));else{if(_0x47a8fc===0x3)this[_0x89c6bc(0x104)]('dead');else{if(_0x47a8fc===0x2)this['playDragonbonesMotion'](_0x89c6bc(0x18f));else{if(_0x35f9bd['isChanting']())this['playDragonbonesMotion'](_0x89c6bc(0x15b));else{if(_0x35f9bd[_0x89c6bc(0x211)]()||_0x35f9bd[_0x89c6bc(0xef)]())this['playDragonbonesMotion']('guard');else{if(_0x47a8fc===0x1)this['playDragonbonesMotion'](_0x89c6bc(0x170));else{if(_0x35f9bd[_0x89c6bc(0x230)]())this[_0x89c6bc(0x104)]('dying');else _0x35f9bd[_0x89c6bc(0x17d)]()?this[_0x89c6bc(0x104)](_0x89c6bc(0x1e3)):this[_0x89c6bc(0x104)](_0x89c6bc(0x1db));}}}}}}},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0xe6)]=Sprite_Actor[_0x4dc5c6(0x1e1)]['initMembers'],Sprite_Actor[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x128)]=function(){const _0xe5f3ba=_0x4dc5c6;VisuMZ[_0xe5f3ba(0x1de)][_0xe5f3ba(0xe6)][_0xe5f3ba(0x194)](this),this['initMembersDragonbonesUnion']();},VisuMZ['DragonbonesUnion'][_0x4dc5c6(0x17f)]=Sprite_Actor[_0x4dc5c6(0x1e1)]['updateBitmap'],Sprite_Actor[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x145)]=function(){const _0x38471c=_0x4dc5c6,_0xb8db00=this[_0x38471c(0x1c9)];_0xb8db00[_0x38471c(0x190)]()?(Sprite_Battler[_0x38471c(0x1e1)][_0x38471c(0x145)][_0x38471c(0x194)](this),this[_0x38471c(0x1a9)]!==_0xb8db00[_0x38471c(0xe7)]()[_0x38471c(0x1e5)]&&this[_0x38471c(0x231)](),this[_0x38471c(0xe2)]()):(VisuMZ[_0x38471c(0x1de)]['Sprite_Actor_updateBitmap'][_0x38471c(0x194)](this),this[_0x38471c(0x1ae)](this[_0x38471c(0x134)]));},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x199)]=Sprite_Actor[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x16a)],Sprite_Actor[_0x4dc5c6(0x1e1)]['startMotion']=function(_0x1bcc89){const _0x37bf23=_0x4dc5c6;VisuMZ[_0x37bf23(0x1de)][_0x37bf23(0x199)]['call'](this,_0x1bcc89),this[_0x37bf23(0x1ed)]===Sprite_Actor&&this['playDragonbonesMotion'](_0x1bcc89);},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x1d5)]=Sprite_Actor[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x132)],Sprite_Actor[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x132)]=function(){const _0xbc695c=_0x4dc5c6;this[_0xbc695c(0xda)](),VisuMZ[_0xbc695c(0x1de)][_0xbc695c(0x1d5)]['call'](this),this[_0xbc695c(0x1c9)]&&this[_0xbc695c(0x1c9)][_0xbc695c(0x190)]()&&(this[_0xbc695c(0x14a)][_0xbc695c(0xea)]=![]);},Sprite_Actor['prototype'][_0x4dc5c6(0xda)]=function(){const _0x5090db=_0x4dc5c6;if(this[_0x5090db(0x1ed)]!==Sprite_Actor)return;let _0x266d9a=!![];if(this['_battler']&&this[_0x5090db(0x1c9)][_0x5090db(0x190)]())_0x266d9a=![];this[_0x5090db(0x192)][_0x5090db(0xea)]=_0x266d9a,this[_0x5090db(0x18e)][_0x5090db(0xea)]=_0x266d9a,this[_0x5090db(0x22f)][_0x5090db(0xea)]=_0x266d9a;},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x159)]=Sprite_Actor[_0x4dc5c6(0x1e1)][_0x4dc5c6(0xf9)],Sprite_Actor[_0x4dc5c6(0x1e1)]['updateFrame']=function(){const _0x27cb1c=_0x4dc5c6;this[_0x27cb1c(0x1c9)]&&this['_battler'][_0x27cb1c(0x190)]()?this['updateFrameDragonbonesUnion']():VisuMZ[_0x27cb1c(0x1de)]['Sprite_Actor_updateFrame'][_0x27cb1c(0x194)](this);},Sprite_Actor[_0x4dc5c6(0x1e1)]['updateFrameDragonbonesUnion']=function(){const _0x13ca28=_0x4dc5c6,_0x5781d1=this['_mainSprite'][_0x13ca28(0x150)];if(_0x5781d1){const _0x454ab5=_0x5781d1[_0x13ca28(0x1a3)],_0x1c9e5f=_0x5781d1[_0x13ca28(0x11a)];this[_0x13ca28(0x192)][_0x13ca28(0x186)](0x0,0x0,_0x454ab5,_0x1c9e5f),this[_0x13ca28(0x186)](0x0,0x0,_0x454ab5,_0x1c9e5f);}},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x10d)]=Sprite_Enemy[_0x4dc5c6(0x1e1)]['initMembers'],Sprite_Enemy[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x128)]=function(){const _0x238712=_0x4dc5c6;VisuMZ['DragonbonesUnion'][_0x238712(0x10d)][_0x238712(0x194)](this),this[_0x238712(0x15a)]();},VisuMZ['DragonbonesUnion'][_0x4dc5c6(0x226)]=Sprite_Enemy[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x1e6)],Sprite_Enemy[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x1e6)]=function(_0x24262b){const _0x3ef40c=_0x4dc5c6;this[_0x3ef40c(0x1dc)](),VisuMZ[_0x3ef40c(0x1de)][_0x3ef40c(0x226)][_0x3ef40c(0x194)](this,_0x24262b);if(_0x24262b[_0x3ef40c(0x1e9)]())this[_0x3ef40c(0x1d4)]=0x0;},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0xfb)]=Sprite_Enemy['prototype'][_0x4dc5c6(0x145)],Sprite_Enemy[_0x4dc5c6(0x1e1)]['updateBitmap']=function(){const _0x311272=_0x4dc5c6,_0x33efc1=this['_battler'];_0x33efc1[_0x311272(0x190)]()?(Sprite_Battler[_0x311272(0x1e1)][_0x311272(0x145)][_0x311272(0x194)](this),this[_0x311272(0x1a9)]!==_0x33efc1[_0x311272(0xe7)]()[_0x311272(0x1e5)]&&this[_0x311272(0x231)](),this[_0x311272(0xe2)]()):(VisuMZ['DragonbonesUnion'][_0x311272(0xfb)][_0x311272(0x194)](this),this[_0x311272(0x1ae)](this[_0x311272(0x134)]));},Spriteset_Battle[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x1dc)]=function(){const _0x3ad016=_0x4dc5c6;for(const _0x1de9e4 of this[_0x3ad016(0xe3)]()){if(!_0x1de9e4)continue;_0x1de9e4['disposeDragonbones']();}},PluginManager['registerCommand'](pluginData[_0x4dc5c6(0xf1)],'Picture_SetupDragonbones',_0x40325a=>{const _0x3d5956=_0x4dc5c6;if(!$gameScreen)return;VisuMZ[_0x3d5956(0x1f6)](_0x40325a,_0x40325a),$gameScreen['createDefaultPicture'](_0x40325a['PictureID']);const _0x4b5193=$gameScreen['picture'](_0x40325a['PictureID']),_0x7fb09=_0x4b5193[_0x3d5956(0xe7)]();_0x7fb09[_0x3d5956(0x115)]=_0x40325a['Filename'],_0x7fb09[_0x3d5956(0x1f1)]=_0x40325a['Animation'],_0x7fb09[_0x3d5956(0xde)]=_0x40325a[_0x3d5956(0x153)],_0x7fb09['offsetY']=_0x40325a[_0x3d5956(0x1dd)],_0x7fb09['scaleX']=_0x40325a['ScaleX'],_0x7fb09['scaleY']=_0x40325a['ScaleY'],_0x7fb09['timeScale']=_0x40325a[_0x3d5956(0x158)];}),PluginManager[_0x4dc5c6(0x1b7)](pluginData[_0x4dc5c6(0xf1)],_0x4dc5c6(0x1cb),_0x20b6c9=>{const _0x11f9f9=_0x4dc5c6;if(!$gameScreen)return;VisuMZ[_0x11f9f9(0x1f6)](_0x20b6c9,_0x20b6c9),$gameScreen['createDefaultPicture'](_0x20b6c9[_0x11f9f9(0x1bb)]);const _0xc74cb9=$gameScreen[_0x11f9f9(0x21b)](_0x20b6c9['PictureID']),_0x435dd1=_0xc74cb9[_0x11f9f9(0xe7)]();_0x435dd1[_0x11f9f9(0x1f1)]=_0x20b6c9['Animation'];}),PluginManager[_0x4dc5c6(0x1b7)](pluginData[_0x4dc5c6(0xf1)],_0x4dc5c6(0x1ea),_0x22da86=>{const _0x135b83=_0x4dc5c6;if(!$gameScreen)return;VisuMZ[_0x135b83(0x1f6)](_0x22da86,_0x22da86),$gameScreen[_0x135b83(0x1eb)](_0x22da86[_0x135b83(0x1bb)]);const _0x3d5f18=$gameScreen['picture'](_0x22da86[_0x135b83(0x1bb)]),_0x5975c6=_0x3d5f18['dragonbonesData']();_0x5975c6['offsetX']=_0x22da86[_0x135b83(0x153)],_0x5975c6[_0x135b83(0x19d)]=_0x22da86['OffsetY'];}),PluginManager[_0x4dc5c6(0x1b7)](pluginData[_0x4dc5c6(0xf1)],_0x4dc5c6(0x12e),_0x118db2=>{const _0x60fba4=_0x4dc5c6;if(!$gameScreen)return;VisuMZ[_0x60fba4(0x1f6)](_0x118db2,_0x118db2),$gameScreen[_0x60fba4(0x1eb)](_0x118db2[_0x60fba4(0x1bb)]);const _0x486113=$gameScreen['picture'](_0x118db2[_0x60fba4(0x1bb)]),_0x432295=_0x486113[_0x60fba4(0xe7)]();_0x432295[_0x60fba4(0x109)]=_0x118db2[_0x60fba4(0x234)],_0x432295[_0x60fba4(0x214)]=_0x118db2['ScaleY'];}),PluginManager[_0x4dc5c6(0x1b7)](pluginData[_0x4dc5c6(0xf1)],_0x4dc5c6(0x18d),_0x393c62=>{const _0x4222c3=_0x4dc5c6;if(!$gameScreen)return;VisuMZ[_0x4222c3(0x1f6)](_0x393c62,_0x393c62),$gameScreen[_0x4222c3(0x1eb)](_0x393c62[_0x4222c3(0x1bb)]);const _0x2f50bb=$gameScreen[_0x4222c3(0x21b)](_0x393c62['PictureID']),_0x2a9993=_0x2f50bb[_0x4222c3(0xe7)]();_0x2a9993[_0x4222c3(0x1cc)]=_0x393c62[_0x4222c3(0x158)];}),Game_Screen['prototype'][_0x4dc5c6(0x1eb)]=function(_0x1a107a){const _0x26a1f6=_0x4dc5c6;if(this[_0x26a1f6(0x21b)](_0x1a107a))return;this[_0x26a1f6(0x215)](_0x1a107a,'',0x0,Math[_0x26a1f6(0x117)](Graphics['width']/0x2),Math['round'](Graphics[_0x26a1f6(0x11a)]/0x2),0x64,0x64,0xff,0x0);},VisuMZ[_0x4dc5c6(0x1de)]['Game_Screen_erasePicture']=Game_Screen[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x161)],Game_Screen[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x161)]=function(_0xa12869){const _0x3a7993=_0x4dc5c6;this[_0x3a7993(0x195)](_0xa12869),VisuMZ[_0x3a7993(0x1de)][_0x3a7993(0x1fe)][_0x3a7993(0x194)](this,_0xa12869);},Game_Screen[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x195)]=function(_0x528063){const _0x1ac7e9=_0x4dc5c6,_0x590120=this['realPictureId'](_0x528063),_0x35de10=this[_0x1ac7e9(0x225)][_0x590120];if(!_0x35de10)return;_0x35de10[_0x1ac7e9(0x17c)](),_0x35de10[_0x1ac7e9(0x1dc)]();},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x12b)]=Game_Picture[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x1d6)],Game_Picture[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x1d6)]=function(){const _0xfdbbe=_0x4dc5c6;VisuMZ['DragonbonesUnion'][_0xfdbbe(0x12b)][_0xfdbbe(0x194)](this),this[_0xfdbbe(0x17c)]();},Game_Picture[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x17c)]=function(){const _0x27d20f=_0x4dc5c6;this[_0x27d20f(0x204)]={'filename':'','animation':DragonbonesManager['DefaultAnimation'],'scaleX':0x1,'scaleY':0x1,'offsetX':0x0,'offsetY':0x0,'timeScale':0x1};},Game_Picture[_0x4dc5c6(0x1e1)]['dragonbonesData']=function(){const _0x27997f=_0x4dc5c6;if(this[_0x27997f(0x204)]!==undefined)return this['_dragonbonesData'];return this[_0x27997f(0x17c)](),this[_0x27997f(0x204)];},Game_Picture[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x1fc)]=function(){const _0x20d67a=_0x4dc5c6;return this[_0x20d67a(0xe7)]()[_0x20d67a(0x115)]!=='';},Game_Picture[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x1dc)]=function(){const _0x8ca9b1=_0x4dc5c6;if(!SceneManager[_0x8ca9b1(0x183)])return;if(!SceneManager['_scene'][_0x8ca9b1(0x198)])return;const _0x545360=SceneManager[_0x8ca9b1(0x183)][_0x8ca9b1(0x198)][_0x8ca9b1(0x101)](this);if(_0x545360)_0x545360[_0x8ca9b1(0x1dc)]();},Spriteset_Base['prototype']['findPictureSprite']=function(_0x5c437f){const _0x56c330=_0x4dc5c6;return this['_pictureContainer']['children'][_0x56c330(0x102)](_0x305b52=>_0x305b52&&_0x305b52['picture']()===_0x5c437f);},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x16c)]=Sprite_Picture['prototype']['initialize'],Sprite_Picture[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x1d6)]=function(_0x467b43){const _0x52f3a4=_0x4dc5c6;this[_0x52f3a4(0x17c)](),VisuMZ['DragonbonesUnion'][_0x52f3a4(0x16c)][_0x52f3a4(0x194)](this,_0x467b43);},Sprite_Picture[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x17c)]=function(_0x226f0e){const _0x29f486=_0x4dc5c6;this['_dragonbones']=null,this[_0x29f486(0x111)]='',this[_0x29f486(0x193)]='';},VisuMZ['DragonbonesUnion'][_0x4dc5c6(0x221)]=Sprite_Picture[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x19c)],Sprite_Picture[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x19c)]=function(){const _0x300077=_0x4dc5c6;VisuMZ[_0x300077(0x1de)][_0x300077(0x221)][_0x300077(0x194)](this),this[_0x300077(0xe2)]();},Sprite_Picture['prototype'][_0x4dc5c6(0x1dc)]=function(){const _0xb1ae16=_0x4dc5c6;this[_0xb1ae16(0x134)]&&(this[_0xb1ae16(0x1ae)](this[_0xb1ae16(0x134)]),this[_0xb1ae16(0x134)][_0xb1ae16(0x19a)](),this[_0xb1ae16(0x134)]=null,this[_0xb1ae16(0x111)]='',this[_0xb1ae16(0x193)]='');},Sprite_Picture['prototype']['updateDragonbones']=function(){const _0xc71ed7=_0x4dc5c6,_0x27dbf2=this['picture']();if(!_0x27dbf2)return this[_0xc71ed7(0x1dc)]();if(!_0x27dbf2['hasDragonbones']())return this[_0xc71ed7(0x1dc)]();this[_0xc71ed7(0x200)]();if(!this[_0xc71ed7(0x134)])return;this[_0xc71ed7(0x201)](),this[_0xc71ed7(0xdb)](),this['updateDragonbonesTimeScale']();},Sprite_Picture[_0x4dc5c6(0x1e1)]['updateDragonbonesArmature']=function(){const _0x5ce712=_0x4dc5c6,_0x28f354=this[_0x5ce712(0x21b)]()['dragonbonesData']();if(this[_0x5ce712(0x111)]===_0x28f354[_0x5ce712(0x115)])return;this[_0x5ce712(0x1dc)](),this[_0x5ce712(0x111)]=_0x28f354[_0x5ce712(0x115)],DragonbonesManager['loadArmature'](_0x28f354[_0x5ce712(0x115)],this[_0x5ce712(0x15f)]['bind'](this));},Sprite_Picture['prototype'][_0x4dc5c6(0x15f)]=function(){const _0x3113a7=_0x4dc5c6,_0x3415a7=this['picture']()[_0x3113a7(0xe7)]();this[_0x3113a7(0x134)]=DragonbonesManager['createArmature'](_0x3415a7[_0x3113a7(0x115)]),this[_0x3113a7(0x177)](this[_0x3113a7(0x134)],0x0),this[_0x3113a7(0x201)]();},Sprite_Picture['prototype']['updateDragonbonesAnimation']=function(){const _0x3a6f33=_0x4dc5c6;if(!this[_0x3a6f33(0x134)])return;const _0x5d9708=this[_0x3a6f33(0x21b)]()[_0x3a6f33(0xe7)]();this[_0x3a6f33(0x193)]!==_0x5d9708['animation']&&(this[_0x3a6f33(0x193)]=_0x5d9708[_0x3a6f33(0x1f1)],this[_0x3a6f33(0x1fa)]());},Sprite_Picture['prototype'][_0x4dc5c6(0x1fa)]=function(){const _0x405c8b=_0x4dc5c6;if(!this[_0x405c8b(0x134)])return;const _0x4f58a1=this[_0x405c8b(0x134)][_0x405c8b(0x1f1)],_0x230c2d=this[_0x405c8b(0x193)][_0x405c8b(0x173)]()[_0x405c8b(0x123)]();_0x4f58a1[_0x405c8b(0x1f5)][_0x230c2d]&&_0x4f58a1[_0x405c8b(0x14e)](_0x230c2d);},Sprite_Picture[_0x4dc5c6(0x1e1)]['updateDragonbonesProperties']=function(){const _0x266c60=_0x4dc5c6;if(!this[_0x266c60(0x134)])return;const _0x5cd840=this[_0x266c60(0x21b)]()[_0x266c60(0xe7)]();this[_0x266c60(0x134)]['x']=_0x5cd840[_0x266c60(0xde)],this[_0x266c60(0x134)]['y']=_0x5cd840[_0x266c60(0x19d)],this[_0x266c60(0x134)]['scale']['x']=_0x5cd840['scaleX'],this[_0x266c60(0x134)][_0x266c60(0xeb)]['y']=_0x5cd840['scaleY'];},Sprite_Picture[_0x4dc5c6(0x1e1)]['updateDragonbonesTimeScale']=function(){const _0x5e8fca=_0x4dc5c6;if(!this[_0x5e8fca(0x134)])return;const _0x5bdc4a=this['picture']()[_0x5e8fca(0xe7)]();let _0x736f50=_0x5bdc4a['timeScale'];this[_0x5e8fca(0x134)][_0x5e8fca(0x1f1)][_0x5e8fca(0x1cc)]=_0x736f50;},PluginManager['registerCommand'](pluginData[_0x4dc5c6(0xf1)],'MapSprite_ActorChange',_0x419816=>{const _0x57855f=_0x4dc5c6;if(!$gameMap)return;VisuMZ[_0x57855f(0x1f6)](_0x419816,_0x419816);const _0x3df7db=$gameActors['actor'](_0x419816['ActorID']);if(!_0x3df7db)return;const _0x38ca32=JsonEx[_0x57855f(0x11e)](_0x3df7db[_0x57855f(0xdf)]);_0x3df7db['_dragonbonesSpriteData']={'filename':_0x419816[_0x57855f(0x16d)],'animation':'','scaleX':_0x419816['ScaleX'],'scaleY':_0x419816['ScaleY'],'offsetX':_0x419816[_0x57855f(0x153)],'offsetY':_0x419816[_0x57855f(0x1dd)],'timeScale':_0x419816[_0x57855f(0x158)],'walkRate':_0x419816['WalkRate']??0x1,'dashRate':_0x419816['DashRate']??0x1,'width':_0x419816[_0x57855f(0xfd)],'height':_0x419816[_0x57855f(0xdd)],'flipLeft':_0x419816['FlipLeft'],'flipRight':_0x419816['FlipRight'],'animationNames':{'idle':_0x419816[_0x57855f(0x1b1)],'walk':_0x419816[_0x57855f(0x12f)],'dash':_0x419816[_0x57855f(0x1ef)],'jump':_0x419816[_0x57855f(0x228)],'ladderidle':_0x419816[_0x57855f(0x1a7)],'ladderclimb':_0x419816['LadderClimb'],'ropeidle':_0x419816[_0x57855f(0x212)],'ropeclimb':_0x419816[_0x57855f(0x176)]}},$gamePlayer[_0x57855f(0x105)]();}),PluginManager['registerCommand'](pluginData[_0x4dc5c6(0xf1)],_0x4dc5c6(0x1f2),_0x17cf6e=>{const _0x2e46ab=_0x4dc5c6;if(!$gameMap)return;if(SceneManager[_0x2e46ab(0x183)]['constructor']!==Scene_Map)return;VisuMZ[_0x2e46ab(0x1f6)](_0x17cf6e,_0x17cf6e);const _0x208bb8=$gameActors[_0x2e46ab(0x19e)](_0x17cf6e[_0x2e46ab(0x189)]),_0x541410=_0x208bb8[_0x2e46ab(0x157)](),_0x21dff8=_0x541410===0x0?$gamePlayer:$gamePlayer['followers']()['follower'](_0x541410-0x1);if(!_0x21dff8)return;_0x21dff8['dragonbonesAnimation']=_0x17cf6e['Animation'];}),PluginManager['registerCommand'](pluginData[_0x4dc5c6(0xf1)],_0x4dc5c6(0x1d2),_0x581ff8=>{const _0x21f3ad=_0x4dc5c6;if(!$gameMap)return;if(SceneManager[_0x21f3ad(0x183)][_0x21f3ad(0x1ed)]!==Scene_Map)return;VisuMZ[_0x21f3ad(0x1f6)](_0x581ff8,_0x581ff8);const _0x5e7600=$gameActors[_0x21f3ad(0x19e)](_0x581ff8[_0x21f3ad(0x189)]),_0x238790=_0x5e7600['index'](),_0x2ea44a=_0x238790===0x0?$gamePlayer:$gamePlayer[_0x21f3ad(0x1e7)]()[_0x21f3ad(0x1b4)](_0x238790-0x1);if(!_0x2ea44a)return;_0x2ea44a[_0x21f3ad(0xf3)]='';}),PluginManager['registerCommand'](pluginData['name'],_0x4dc5c6(0x16e),_0x1875a5=>{const _0x2b8975=_0x4dc5c6;if(!$gameMap)return;if(SceneManager[_0x2b8975(0x183)][_0x2b8975(0x1ed)]!==Scene_Map)return;VisuMZ['ConvertParams'](_0x1875a5,_0x1875a5);const _0x2a04b2=$gameMap[_0x2b8975(0x1cd)](_0x1875a5['EventID']);if(!_0x2a04b2)return;_0x2a04b2[_0x2b8975(0xf3)]=_0x1875a5[_0x2b8975(0x235)];}),PluginManager['registerCommand'](pluginData[_0x4dc5c6(0xf1)],_0x4dc5c6(0x1d7),_0xf6b1c8=>{const _0x33c062=_0x4dc5c6;if(!$gameMap)return;if(SceneManager[_0x33c062(0x183)][_0x33c062(0x1ed)]!==Scene_Map)return;VisuMZ['ConvertParams'](_0xf6b1c8,_0xf6b1c8);const _0x27690c=$gameMap[_0x33c062(0x1cd)](_0xf6b1c8[_0x33c062(0x196)]);if(!_0x27690c)return;_0x27690c['dragonbonesAnimation']='';}),PluginManager['registerCommand'](pluginData[_0x4dc5c6(0xf1)],_0x4dc5c6(0x203),_0x31991e=>{const _0x360c83=_0x4dc5c6;if(!$gameMap)return;if(SceneManager[_0x360c83(0x183)][_0x360c83(0x1ed)]!==Scene_Map)return;VisuMZ['ConvertParams'](_0x31991e,_0x31991e);const _0x1fa7fb=$gamePlayer[_0x360c83(0x1e7)]()[_0x360c83(0x1b4)](_0x31991e[_0x360c83(0x1a1)]);if(!_0x1fa7fb)return;_0x1fa7fb[_0x360c83(0xf3)]=_0x31991e['Animation'];}),PluginManager[_0x4dc5c6(0x1b7)](pluginData['name'],_0x4dc5c6(0xe9),_0x461da4=>{const _0x13912f=_0x4dc5c6;if(!$gameMap)return;if(SceneManager[_0x13912f(0x183)][_0x13912f(0x1ed)]!==Scene_Map)return;VisuMZ['ConvertParams'](_0x461da4,_0x461da4);const _0xe1002d=$gamePlayer[_0x13912f(0x1e7)]()[_0x13912f(0x1b4)](_0x461da4[_0x13912f(0x1a1)]);if(!_0xe1002d)return;_0xe1002d[_0x13912f(0xf3)]='';}),PluginManager[_0x4dc5c6(0x1b7)](pluginData['name'],'MapSprite_PlayerAnimationPlay',_0x153dd7=>{const _0x14f7c4=_0x4dc5c6;if(!$gameMap)return;if(SceneManager[_0x14f7c4(0x183)][_0x14f7c4(0x1ed)]!==Scene_Map)return;VisuMZ[_0x14f7c4(0x1f6)](_0x153dd7,_0x153dd7),$gamePlayer['dragonbonesAnimation']=_0x153dd7[_0x14f7c4(0x235)];}),PluginManager[_0x4dc5c6(0x1b7)](pluginData[_0x4dc5c6(0xf1)],_0x4dc5c6(0x116),_0x97e615=>{const _0x38f78e=_0x4dc5c6;if(!$gameMap)return;if(SceneManager[_0x38f78e(0x183)][_0x38f78e(0x1ed)]!==Scene_Map)return;$gamePlayer[_0x38f78e(0xf3)]='';}),Object['defineProperty'](Game_CharacterBase[_0x4dc5c6(0x1e1)],_0x4dc5c6(0xf3),{'get':function(){const _0x180758=_0x4dc5c6;return this[_0x180758(0x217)]()['animation'];},'set':function(_0x5bd9c7){const _0x41ebeb=_0x4dc5c6;this[_0x41ebeb(0x217)]()[_0x41ebeb(0x1f1)]=_0x5bd9c7;},'configurable':!![]}),Game_CharacterBase['prototype'][_0x4dc5c6(0x17c)]=function(){const _0x504aa9=_0x4dc5c6,_0x3900f2=VisuMZ[_0x504aa9(0x1de)][_0x504aa9(0x119)]['MapSprite'];this[_0x504aa9(0xdf)]={'filename':'','animation':'','scaleX':_0x3900f2['ScaleX'],'scaleY':_0x3900f2[_0x504aa9(0x180)],'offsetX':_0x3900f2[_0x504aa9(0x153)],'offsetY':_0x3900f2[_0x504aa9(0x1dd)],'timeScale':_0x3900f2[_0x504aa9(0x158)],'walkRate':0x1,'dashRate':0x1,'width':_0x3900f2[_0x504aa9(0xfd)],'height':_0x3900f2['Height'],'flipLeft':_0x3900f2['FlipLeft'],'flipRight':_0x3900f2[_0x504aa9(0x1ce)],'animationNames':{'idle':_0x3900f2[_0x504aa9(0x1b1)],'walk':_0x3900f2[_0x504aa9(0x12f)],'dash':_0x3900f2[_0x504aa9(0x1ef)],'jump':_0x3900f2['Jump'],'ladderidle':_0x3900f2[_0x504aa9(0x1a7)],'ladderclimb':_0x3900f2['LadderClimb'],'ropeidle':_0x3900f2[_0x504aa9(0x212)],'ropeclimb':_0x3900f2[_0x504aa9(0x176)]}},this['_dragonbonesMoveTimer']===undefined&&(this['_dragonbonesMoveTimer']=0x0);},Game_CharacterBase[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x164)]=function(){},Game_CharacterBase[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x20d)]=function(_0x12b450){const _0x2fb3e2=_0x4dc5c6,_0xca04bf=this[_0x2fb3e2(0x217)]();_0x12b450[_0x2fb3e2(0x1fb)](/<DRAGONBONES SPRITE:[ ]*(.*)>/i)&&(_0xca04bf[_0x2fb3e2(0x115)]=String(RegExp['$1'])[_0x2fb3e2(0x123)]());_0x12b450['match'](/<DRAGONBONES SPRITE (?:SKIN|NAME|FILENAME):[ ]*(.*)>/i)&&(_0xca04bf[_0x2fb3e2(0x115)]=String(RegExp['$1'])[_0x2fb3e2(0x123)]());_0x12b450[_0x2fb3e2(0x1fb)](/<DRAGONBONES SPRITE[ ]SCALE:[ ](.*),[ ](.*)>/i)&&(_0xca04bf[_0x2fb3e2(0x109)]=Number(RegExp['$1']),_0xca04bf[_0x2fb3e2(0x214)]=Number(RegExp['$2']));_0x12b450[_0x2fb3e2(0x1fb)](/<DRAGONBONES SPRITE[ ](?:SCALEX|SCALE X):[ ](.*)>/i)&&(_0xca04bf[_0x2fb3e2(0x109)]=Number(RegExp['$1']));_0x12b450[_0x2fb3e2(0x1fb)](/<DRAGONBONES SPRITE[ ](?:SCALEY|SCALE Y):[ ](.*)>/i)&&(_0xca04bf['scaleY']=Number(RegExp['$1']));_0x12b450[_0x2fb3e2(0x1fb)](/<DRAGONBONES SPRITE[ ]OFFSET:[ ](.*),[ ](.*)>/i)&&(_0xca04bf[_0x2fb3e2(0xde)]=Number(RegExp['$1']),_0xca04bf[_0x2fb3e2(0x19d)]=Number(RegExp['$2']));_0x12b450[_0x2fb3e2(0x1fb)](/<DRAGONBONES SPRITE[ ](?:OFFSETX|OFFSET X):[ ](.*)>/i)&&(_0xca04bf[_0x2fb3e2(0xde)]=Number(RegExp['$1']));_0x12b450[_0x2fb3e2(0x1fb)](/<DRAGONBONES SPRITE[ ](?:OFFSETY|OFFSET Y):[ ](.*)>/i)&&(_0xca04bf[_0x2fb3e2(0x19d)]=Number(RegExp['$1']));_0x12b450[_0x2fb3e2(0x1fb)](/<DRAGONBONES SPRITE[ ]SIZE:[ ](.*),[ ](.*)>/i)&&(_0xca04bf[_0x2fb3e2(0x1a3)]=Number(RegExp['$1']),_0xca04bf[_0x2fb3e2(0x11a)]=Number(RegExp['$2']));_0x12b450['match'](/<DRAGONBONES SPRITE[ ]WIDTH:[ ](.*)>/i)&&(_0xca04bf['width']=Number(RegExp['$1']));_0x12b450['match'](/<DRAGONBONES SPRITE[ ]HEIGHT:[ ](.*)>/i)&&(_0xca04bf['height']=Number(RegExp['$1']));_0x12b450[_0x2fb3e2(0x1fb)](/<DRAGONBONES SPRITE[ ](?:TIMESCALE|TIME SCALE):[ ](.*)>/i)&&(_0xca04bf['timeScale']=Number(RegExp['$1']));_0x12b450[_0x2fb3e2(0x1fb)](/<DRAGONBONES SPRITE[ ](?:WALK RATE|WALKING RATE):[ ](.*)>/i)&&(_0xca04bf['walkRate']=Number(RegExp['$1']));_0x12b450[_0x2fb3e2(0x1fb)](/<DRAGONBONES SPRITE[ ](?:DASH RATE|DASHING RATE):[ ](.*)>/i)&&(_0xca04bf[_0x2fb3e2(0x148)]=Number(RegExp['$1']));_0x12b450[_0x2fb3e2(0x1fb)](/<DRAGONBONES SPRITE FLIP LEFT>/i)&&(_0xca04bf[_0x2fb3e2(0x20f)]=!![]);_0x12b450[_0x2fb3e2(0x1fb)](/<DRAGONBONES SPRITE NO FLIP LEFT>/i)&&(_0xca04bf[_0x2fb3e2(0x20f)]=![]);_0x12b450['match'](/<DRAGONBONES SPRITE FLIP RIGHT>/i)&&(_0xca04bf[_0x2fb3e2(0x1ba)]=!![]);_0x12b450[_0x2fb3e2(0x1fb)](/<DRAGONBONES SPRITE NO FLIP RIGHT>/i)&&(_0xca04bf[_0x2fb3e2(0x1ba)]=![]);const _0x461556=_0x12b450[_0x2fb3e2(0x1fb)](/<DRAGONBONES SPRITE MOTION (.*):[ ](.*)>/gi);if(_0x461556)for(const _0x105206 of _0x461556){_0x105206[_0x2fb3e2(0x1fb)](/<DRAGONBONES SPRITE MOTION (.*):[ ](.*)>/i);const _0x237488=String(RegExp['$1'])[_0x2fb3e2(0x173)]()[_0x2fb3e2(0x123)](),_0x5c25bf=String(RegExp['$2'])[_0x2fb3e2(0x173)]()['trim']();_0xca04bf[_0x2fb3e2(0x118)][_0x237488]=_0x5c25bf;}if(_0x12b450['match'](/<DRAGONBONES SPRITE (?:SETTINGS|SETTING)>\s*([\s\S]*)\s*<\/DRAGONBONES SPRITE (?:SETTINGS|SETTING)>/i)){const _0x20d0a0=String(RegExp['$1']);_0x20d0a0['match'](/(?:SKIN|NAME|FILENAME):[ ]*(.*)/i)&&(_0xca04bf[_0x2fb3e2(0x115)]=String(RegExp['$1'])['trim']());_0x20d0a0['match'](/SCALE:[ ](.*),[ ](.*)/i)&&(_0xca04bf[_0x2fb3e2(0x109)]=Number(RegExp['$1']),_0xca04bf[_0x2fb3e2(0x214)]=Number(RegExp['$2']));_0x20d0a0[_0x2fb3e2(0x1fb)](/(?:SCALEX|SCALE X):[ ](.*)/i)&&(_0xca04bf[_0x2fb3e2(0x109)]=Number(RegExp['$1']));_0x20d0a0[_0x2fb3e2(0x1fb)](/(?:SCALEY|SCALE Y):[ ](.*)/i)&&(_0xca04bf[_0x2fb3e2(0x214)]=Number(RegExp['$1']));_0x20d0a0[_0x2fb3e2(0x1fb)](/OFFSET:[ ](.*),[ ](.*)/i)&&(_0xca04bf[_0x2fb3e2(0xde)]=Number(RegExp['$1']),_0xca04bf['offsetY']=Number(RegExp['$2']));_0x20d0a0[_0x2fb3e2(0x1fb)](/(?:OFFSETX|OFFSET X):[ ](.*)/i)&&(_0xca04bf[_0x2fb3e2(0xde)]=Number(RegExp['$1']));_0x20d0a0[_0x2fb3e2(0x1fb)](/(?:OFFSETY|OFFSET Y):[ ](.*)/i)&&(_0xca04bf[_0x2fb3e2(0x19d)]=Number(RegExp['$1']));_0x20d0a0['match'](/(?:TIMESCALE|TIME SCALE):[ ](.*)/i)&&(_0xca04bf[_0x2fb3e2(0x1cc)]=Number(RegExp['$1']));_0x20d0a0[_0x2fb3e2(0x1fb)](/(?:WALK RATE|WALKING RATE):[ ](.*)/i)&&(_0xca04bf[_0x2fb3e2(0x125)]=Number(RegExp['$1']));_0x20d0a0['match'](/(?:DASH RATE|DASHING RATE):[ ](.*)/i)&&(_0xca04bf['dashRate']=Number(RegExp['$1']));_0x20d0a0[_0x2fb3e2(0x1fb)](/SIZE:[ ](.*),[ ](.*)/i)&&(_0xca04bf['width']=Number(RegExp['$1']),_0xca04bf[_0x2fb3e2(0x11a)]=Number(RegExp['$2']));_0x20d0a0[_0x2fb3e2(0x1fb)](/WIDTH:[ ](.*)/i)&&(_0xca04bf[_0x2fb3e2(0x1a3)]=Number(RegExp['$1']));_0x20d0a0[_0x2fb3e2(0x1fb)](/HEIGHT:[ ](.*)/i)&&(_0xca04bf[_0x2fb3e2(0x11a)]=Number(RegExp['$1']));_0x20d0a0['match'](/NO FLIP LEFT/i)&&(_0xca04bf[_0x2fb3e2(0x20f)]=![]);_0x20d0a0['match'](/FLIP LEFT/i)&&(_0xca04bf[_0x2fb3e2(0x20f)]=!![]);_0x20d0a0[_0x2fb3e2(0x1fb)](/NO FLIP RIGHT/i)&&(_0xca04bf[_0x2fb3e2(0x1ba)]=![]);_0x20d0a0[_0x2fb3e2(0x1fb)](/FLIP RIGHT/i)&&(_0xca04bf[_0x2fb3e2(0x1ba)]=!![]);const _0x10f76f=_0x12b450[_0x2fb3e2(0x1fb)](/(?:ANI|MOTION) (.*):[ ](.*)/gi);if(_0x10f76f)for(const _0x3a7c1f of _0x10f76f){_0x3a7c1f['match'](/(?:ANI|MOTION) (.*):[ ](.*)/i);const _0x32777b=String(RegExp['$1'])['toLowerCase']()[_0x2fb3e2(0x123)](),_0x462550=String(RegExp['$2'])[_0x2fb3e2(0x173)]()['trim']();_0xca04bf[_0x2fb3e2(0x118)][_0x32777b]=_0x462550;}}},Game_CharacterBase[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x217)]=function(){const _0x2dae50=_0x4dc5c6;if(this[_0x2dae50(0xdf)]!==undefined)return this['_dragonbonesSpriteData'];return this[_0x2dae50(0x17c)](),this['setupDragonbonesData'](),this[_0x2dae50(0xdf)];},Game_CharacterBase[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x1fc)]=function(){const _0x44f062=_0x4dc5c6;return this[_0x44f062(0x217)]()[_0x44f062(0x115)]!=='';},Game_CharacterBase[_0x4dc5c6(0x1e1)]['currentDragonbonesAnimation']=function(_0x6b92ee){const _0xf54d50=_0x4dc5c6,_0x33ed47=this['dragonbonesSpriteData']();if(!_0x6b92ee)return _0x33ed47['animationNames']['idle'];_0x33ed47[_0xf54d50(0x1f1)]=_0x33ed47['animation'][_0xf54d50(0x173)]()[_0xf54d50(0x123)]();if(_0x33ed47[_0xf54d50(0x1f1)]!==''&&_0x6b92ee['animation'][_0xf54d50(0x1f5)][_0x33ed47['animation']])return _0x33ed47[_0xf54d50(0x1f1)];let _0x2a4548=[];if(this[_0xf54d50(0x18a)]())_0x2a4548=_0x2a4548[_0xf54d50(0xf8)](this[_0xf54d50(0x113)](_0x33ed47[_0xf54d50(0x118)][_0xf54d50(0x218)])),_0x2a4548=_0x2a4548[_0xf54d50(0xf8)](this[_0xf54d50(0x113)](_0x33ed47[_0xf54d50(0x118)][_0xf54d50(0x1e3)]));else{if(this[_0xf54d50(0x216)]()&&!this[_0xf54d50(0x18a)]())Imported[_0xf54d50(0x149)]&&this['isOnRope']()?(this['_dragonbonesMoveTimer']>0x0&&(_0x2a4548['push'](_0x33ed47[_0xf54d50(0x118)][_0xf54d50(0x17e)]),_0x2a4548[_0xf54d50(0x138)](_0x33ed47[_0xf54d50(0x118)][_0xf54d50(0xed)]),_0x2a4548=_0x2a4548[_0xf54d50(0xf8)](this[_0xf54d50(0x113)](_0x33ed47['animationNames'][_0xf54d50(0x1e3)]))),_0x2a4548[_0xf54d50(0x138)](_0x33ed47['animationNames'][_0xf54d50(0x1c3)]),_0x2a4548[_0xf54d50(0x138)](_0x33ed47[_0xf54d50(0x118)][_0xf54d50(0x169)])):(this[_0xf54d50(0xe4)]>0x0&&(_0x2a4548['push'](_0x33ed47[_0xf54d50(0x118)][_0xf54d50(0xed)]),_0x2a4548=_0x2a4548[_0xf54d50(0xf8)](this[_0xf54d50(0x113)](_0x33ed47['animationNames'][_0xf54d50(0x1e3)]))),_0x2a4548[_0xf54d50(0x138)](_0x33ed47[_0xf54d50(0x118)]['ladderidle']));else this['_dragonbonesMoveTimer']>0x0&&(this[_0xf54d50(0x141)]()&&(_0x2a4548=_0x2a4548['concat'](this[_0xf54d50(0x113)](_0x33ed47[_0xf54d50(0x118)][_0xf54d50(0x1f4)]))),_0x2a4548=_0x2a4548[_0xf54d50(0xf8)](this[_0xf54d50(0x113)](_0x33ed47[_0xf54d50(0x118)][_0xf54d50(0x1e3)])));}_0x2a4548=_0x2a4548['concat'](this[_0xf54d50(0x113)](_0x33ed47[_0xf54d50(0x118)]['idle']));for(const _0x4fafcc of _0x2a4548){if(_0x6b92ee[_0xf54d50(0x1f1)][_0xf54d50(0x1f5)][_0x4fafcc])return _0x4fafcc;}return _0x33ed47['animationNames']['idle'];},Game_CharacterBase['prototype'][_0x4dc5c6(0x113)]=function(_0xb6cc52){const _0x3f95b4=_0x4dc5c6,_0x4e0944=this['dragonbonesSpriteData'](),_0x52248f=this[_0x3f95b4(0x142)]();let _0x46acef=[];_0x46acef[_0x3f95b4(0x138)](_0xb6cc52+_0x52248f);if(_0x52248f===0x1){_0x46acef[_0x3f95b4(0x138)](_0xb6cc52+0x4);if(_0x4e0944[_0x3f95b4(0x20f)])_0x46acef[_0x3f95b4(0x138)](_0xb6cc52+0x6);_0x46acef[_0x3f95b4(0x138)](_0xb6cc52+0x2);}if(_0x52248f===0x3){_0x46acef[_0x3f95b4(0x138)](_0xb6cc52+0x6);if(_0x4e0944['flipRight'])_0x46acef['push'](_0xb6cc52+0x4);_0x46acef['push'](_0xb6cc52+0x2);}if(_0x52248f===0x7){_0x46acef[_0x3f95b4(0x138)](_0xb6cc52+0x4);if(_0x4e0944[_0x3f95b4(0x20f)])_0x46acef[_0x3f95b4(0x138)](_0xb6cc52+0x6);_0x46acef['push'](_0xb6cc52+0x8);}if(_0x52248f===0x9){_0x46acef[_0x3f95b4(0x138)](_0xb6cc52+0x6);if(_0x4e0944[_0x3f95b4(0x1ba)])_0x46acef['push'](_0xb6cc52+0x4);_0x46acef[_0x3f95b4(0x138)](_0xb6cc52+0x8);}return _0x46acef[_0x3f95b4(0x138)](_0xb6cc52),_0x46acef;},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0xe1)]=Game_CharacterBase[_0x4dc5c6(0x1e1)]['update'],Game_CharacterBase['prototype']['update']=function(){const _0x5ab0e2=_0x4dc5c6;VisuMZ[_0x5ab0e2(0x1de)][_0x5ab0e2(0xe1)][_0x5ab0e2(0x194)](this),this[_0x5ab0e2(0x131)]();},Game_CharacterBase[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x131)]=function(){const _0x1d0a8b=_0x4dc5c6;if(!this[_0x1d0a8b(0x1fc)]())return;this[_0x1d0a8b(0x137)]()?this['_dragonbonesMoveTimer']=VisuMZ[_0x1d0a8b(0x1de)][_0x1d0a8b(0x119)]['MapSprite']['WalkTimer']:this[_0x1d0a8b(0xe4)]--;},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x209)]=Game_Player[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x105)],Game_Player[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x105)]=function(){const _0x501bcd=_0x4dc5c6;VisuMZ[_0x501bcd(0x1de)][_0x501bcd(0x209)][_0x501bcd(0x194)](this),this[_0x501bcd(0x164)]();},Game_Player['prototype'][_0x4dc5c6(0x164)]=function(){const _0x121053=_0x4dc5c6,_0x3a4617=$gameParty[_0x121053(0x1e2)]();!_0x3a4617?this[_0x121053(0x17c)]():this[_0x121053(0xdf)]=_0x3a4617['dragonbonesSpriteData']();},VisuMZ[_0x4dc5c6(0x1de)]['Game_Follower_refresh']=Game_Follower[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x105)],Game_Follower[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x105)]=function(){const _0x581631=_0x4dc5c6;VisuMZ[_0x581631(0x1de)]['Game_Follower_refresh']['call'](this),this['setupDragonbonesData']();},Game_Follower[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x164)]=function(){const _0x567346=_0x4dc5c6,_0x5aa25e=this['actor']();!_0x5aa25e?this[_0x567346(0x17c)]():this['_dragonbonesSpriteData']=_0x5aa25e['dragonbonesSpriteData']();},Game_Actor[_0x4dc5c6(0x1e1)]['initDragonbonesData']=function(){const _0xce3c51=_0x4dc5c6;Game_BattlerBase[_0xce3c51(0x1e1)]['initDragonbonesData'][_0xce3c51(0x194)](this),Game_CharacterBase[_0xce3c51(0x1e1)][_0xce3c51(0x17c)][_0xce3c51(0x194)](this);},Game_Actor[_0x4dc5c6(0x1e1)]['setupDragonbonesData']=function(){const _0x2ce71a=_0x4dc5c6;Game_BattlerBase[_0x2ce71a(0x1e1)][_0x2ce71a(0x164)][_0x2ce71a(0x194)](this);const _0x51ebc1=this['actor']()[_0x2ce71a(0x14c)];Game_CharacterBase[_0x2ce71a(0x1e1)][_0x2ce71a(0x20d)][_0x2ce71a(0x194)](this,_0x51ebc1);},Game_Actor['prototype'][_0x4dc5c6(0x217)]=function(){const _0x1df789=_0x4dc5c6;if(this[_0x1df789(0xdf)]!==undefined)return this[_0x1df789(0xdf)];return this[_0x1df789(0x17c)](),this[_0x1df789(0x164)](),this[_0x1df789(0xdf)];},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x1d1)]=Game_Event[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x105)],Game_Event['prototype'][_0x4dc5c6(0x105)]=function(){const _0x34da88=_0x4dc5c6;VisuMZ[_0x34da88(0x1de)]['Game_Event_refresh'][_0x34da88(0x194)](this),this[_0x34da88(0x164)]();},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x14f)]=Game_Event[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x222)],Game_Event['prototype'][_0x4dc5c6(0x222)]=function(){const _0x48c239=_0x4dc5c6;VisuMZ['DragonbonesUnion']['Game_Event_clearPageSettings'][_0x48c239(0x194)](this),this['initDragonbonesData']();},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x1c6)]=Game_Event['prototype'][_0x4dc5c6(0x208)],Game_Event[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x208)]=function(){const _0x305187=_0x4dc5c6;VisuMZ[_0x305187(0x1de)][_0x305187(0x1c6)][_0x305187(0x194)](this),this[_0x305187(0x17c)](),this['setupDragonbonesData']();},Game_Event[_0x4dc5c6(0x1e1)]['setupDragonbonesData']=function(){const _0x2daa34=_0x4dc5c6;this[_0x2daa34(0x108)](),this[_0x2daa34(0x14d)]();},Game_Event[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x108)]=function(){const _0xa319a9=_0x4dc5c6;if(!this['event']())return;const _0x881e0=this[_0xa319a9(0x1cd)]()[_0xa319a9(0x14c)];if(_0x881e0==='')return;this[_0xa319a9(0x20d)](_0x881e0);},Game_Event[_0x4dc5c6(0x1e1)]['setupDragonbonesDataCommentTags']=function(){const _0x2f0970=_0x4dc5c6;if(!this[_0x2f0970(0x1cd)]())return;if(!this[_0x2f0970(0x1c7)]())return;const _0x4a5c0b=this[_0x2f0970(0x1ad)]();let _0x220b49='';for(const _0x4a247b of _0x4a5c0b){if([0x6c,0x198][_0x2f0970(0x185)](_0x4a247b[_0x2f0970(0x172)])){if(_0x220b49!=='')_0x220b49+='\x0a';_0x220b49+=_0x4a247b[_0x2f0970(0x21f)][0x0];}}this[_0x2f0970(0x20d)](_0x220b49);},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x114)]=Sprite_Character[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x1d6)],Sprite_Character['prototype'][_0x4dc5c6(0x1d6)]=function(_0x3af133){const _0x55a388=_0x4dc5c6;this[_0x55a388(0x17c)](),VisuMZ[_0x55a388(0x1de)][_0x55a388(0x114)][_0x55a388(0x194)](this,_0x3af133),this[_0x55a388(0x16b)]();},Sprite_Character[_0x4dc5c6(0x1e1)]['initDragonbonesData']=function(){const _0x18d53f=_0x4dc5c6;this[_0x18d53f(0x134)]=null,this[_0x18d53f(0x111)]='',this[_0x18d53f(0x193)]='';},Sprite_Character[_0x4dc5c6(0x1e1)]['createBaseDragonbonesSprite']=function(){const _0x13c65f=_0x4dc5c6;this[_0x13c65f(0x224)]=new Sprite(),this[_0x13c65f(0x1f7)](this[_0x13c65f(0x224)]);},VisuMZ['DragonbonesUnion'][_0x4dc5c6(0x107)]=Sprite_Character['prototype'][_0x4dc5c6(0x145)],Sprite_Character[_0x4dc5c6(0x1e1)]['updateBitmap']=function(){const _0x288102=_0x4dc5c6;VisuMZ[_0x288102(0x1de)]['Sprite_Character_updateBitmap'][_0x288102(0x194)](this),this[_0x288102(0xe2)]();},Sprite_Character[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x1dc)]=function(){const _0x6952e6=_0x4dc5c6;this[_0x6952e6(0x134)]&&(this[_0x6952e6(0x224)]['removeChild'](this[_0x6952e6(0x134)]),this['_dragonbones'][_0x6952e6(0x19a)](),this[_0x6952e6(0x134)]=null,this[_0x6952e6(0x111)]='',this[_0x6952e6(0x193)]='');},Sprite_Character['prototype'][_0x4dc5c6(0xe2)]=function(){const _0x15e23a=_0x4dc5c6;if(!this['_character'])return this[_0x15e23a(0x1dc)]();if(!this['_character'][_0x15e23a(0x1fc)]())return this['disposeDragonbones']();this[_0x15e23a(0x200)]();if(!this['_dragonbones'])return;this['updateDragonbonesAnimation'](),this['updateDragonbonesProperties'](),this['updateDragonbonesTimeScale']();},Sprite_Character['prototype'][_0x4dc5c6(0x200)]=function(){const _0x1e93c5=_0x4dc5c6,_0x305f50=this[_0x1e93c5(0x156)][_0x1e93c5(0x217)]();if(this['_dragonbonesFilename']===_0x305f50[_0x1e93c5(0x115)])return;this['disposeDragonbones'](),this[_0x1e93c5(0x111)]=_0x305f50[_0x1e93c5(0x115)],DragonbonesManager[_0x1e93c5(0x1f8)](_0x305f50[_0x1e93c5(0x115)],this[_0x1e93c5(0x15f)][_0x1e93c5(0x1b6)](this));},Sprite_Character[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x15f)]=function(){const _0x1973a9=_0x4dc5c6,_0xa98d0c=this['_character']['dragonbonesSpriteData']();this['_dragonbones']=DragonbonesManager[_0x1973a9(0x1c8)](_0xa98d0c[_0x1973a9(0x115)]),this[_0x1973a9(0x201)](),setTimeout(this[_0x1973a9(0x1ee)][_0x1973a9(0x1b6)](this),0x0);},Sprite_Character[_0x4dc5c6(0x1e1)]['addDragonbonesChild']=function(){const _0x5a92bf=_0x4dc5c6;if(!this[_0x5a92bf(0x134)])return;if(!this[_0x5a92bf(0x224)])return;this[_0x5a92bf(0x224)]['addChildAt'](this[_0x5a92bf(0x134)],0x0);},Sprite_Character['prototype'][_0x4dc5c6(0x201)]=function(){const _0x5252da=_0x4dc5c6;if(!this[_0x5252da(0x134)])return;const _0x54c95d=this[_0x5252da(0x156)]['dragonbonesSpriteData'](),_0x376898=this[_0x5252da(0x134)][_0x5252da(0x1f1)];_0x376898[_0x5252da(0x155)]&&(this[_0x5252da(0x156)][_0x5252da(0xf3)]='',this['_dragonbonesAnimation']='',_0x376898[_0x5252da(0x1d0)]='');const _0x1b8502=this[_0x5252da(0x156)][_0x5252da(0x143)](this[_0x5252da(0x134)]);this[_0x5252da(0x193)]!==_0x1b8502&&(this[_0x5252da(0x193)]=_0x1b8502,this[_0x5252da(0x1fa)]());},Sprite_Character['prototype'][_0x4dc5c6(0x1fa)]=function(){const _0x3c7dc2=_0x4dc5c6;if(!this[_0x3c7dc2(0x134)])return;const _0x15a227=this[_0x3c7dc2(0x134)]['animation'],_0xefc67d=this[_0x3c7dc2(0x193)][_0x3c7dc2(0x173)]()[_0x3c7dc2(0x123)]();if(_0x15a227[_0x3c7dc2(0x1f5)][_0xefc67d]){if(_0x15a227[_0x3c7dc2(0x1d0)]===_0xefc67d&&_0x15a227[_0x3c7dc2(0x1f5)][_0xefc67d][_0x3c7dc2(0xf2)]<=0x0)return;_0x15a227['play'](_0xefc67d);}},Sprite_Character[_0x4dc5c6(0x1e1)][_0x4dc5c6(0xdb)]=function(){const _0x164ddf=_0x4dc5c6;if(!this[_0x164ddf(0x134)])return;const _0x28ba42=this[_0x164ddf(0x156)][_0x164ddf(0x217)]();this[_0x164ddf(0x134)]['x']=_0x28ba42[_0x164ddf(0xde)],this[_0x164ddf(0x134)]['y']=_0x28ba42[_0x164ddf(0x19d)],this[_0x164ddf(0x134)][_0x164ddf(0xeb)]['x']=_0x28ba42[_0x164ddf(0x109)]*this['dragonbonesFlip'](),this[_0x164ddf(0x134)][_0x164ddf(0xeb)]['y']=_0x28ba42['scaleY'];},Sprite_Character[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x178)]=function(){const _0x276b88=_0x4dc5c6,_0x41e381=this[_0x276b88(0x156)]['dragonbonesSpriteData']();this['_dragonbonesFlipDirection']=this[_0x276b88(0x126)]||0x1;if(_0x41e381['flipLeft']&&[0x1,0x4,0x7][_0x276b88(0x185)](this[_0x276b88(0x156)][_0x276b88(0x142)]()))this[_0x276b88(0x126)]=-0x1;else{if(_0x41e381[_0x276b88(0x1ba)]&&[0x9,0x6,0x3][_0x276b88(0x185)](this[_0x276b88(0x156)][_0x276b88(0x142)]()))this[_0x276b88(0x126)]=-0x1;else![0x8,0x2][_0x276b88(0x185)](this['_character'][_0x276b88(0x142)]())&&(this['_dragonbonesFlipDirection']=0x1);}return this[_0x276b88(0x126)];},Sprite_Character[_0x4dc5c6(0x1e1)][_0x4dc5c6(0x20e)]=function(){const _0x19465f=_0x4dc5c6;if(!this[_0x19465f(0x134)])return;const _0x86e607=this[_0x19465f(0x156)]['dragonbonesSpriteData']();let _0xab491f=_0x86e607[_0x19465f(0x1cc)];this[_0x19465f(0x156)][_0x19465f(0x137)]()&&(_0xab491f*=this[_0x19465f(0x156)]['realMoveSpeed'](),this[_0x19465f(0x156)]['isDashing']()?_0xab491f*=_0x86e607[_0x19465f(0x148)]:_0xab491f*=_0x86e607['walkRate']),this[_0x19465f(0x134)]['animation'][_0x19465f(0x1cc)]=_0xab491f;},VisuMZ[_0x4dc5c6(0x1de)][_0x4dc5c6(0x227)]=Sprite_Character['prototype'][_0x4dc5c6(0xd9)],Sprite_Character['prototype'][_0x4dc5c6(0xd9)]=function(){const _0x14ef00=_0x4dc5c6;this[_0x14ef00(0x156)]&&this[_0x14ef00(0x156)][_0x14ef00(0x1fc)]()?this[_0x14ef00(0xfa)]():VisuMZ[_0x14ef00(0x1de)][_0x14ef00(0x227)]['call'](this);},Sprite_Character[_0x4dc5c6(0x1e1)][_0x4dc5c6(0xfa)]=function(){const _0x2755dc=_0x4dc5c6,_0x249cfc=this[_0x2755dc(0x156)]['dragonbonesSpriteData'](),_0x5584d1=_0x249cfc['height'];this[_0x2755dc(0x186)](0x0,0x0,0x0,_0x5584d1);};