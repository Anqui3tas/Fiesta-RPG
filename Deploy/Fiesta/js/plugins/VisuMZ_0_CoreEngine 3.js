//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.86;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.86] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
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
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 * - This does NOT set the max cap to be lower than the default cap.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * 
 * ---
 * 
 * === Tileset-Related Notetags ===
 * 
 * ---
 * 
 * <Taller By x: id>
 * 
 * - Used for: Tileset Notetags
 * - Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
 *   by 'x' tiles.
 *   - Replace 'x' with a number representing the tiles to be taller by.
 *   - Replace 'id' with a number representing the Terrain Tag you will use to
 *     mark this tile with in the Database editor.
 * - When placing these tiles on the map, all you have to do is just place the
 *   bottom tile.
 *   - ie.: For a tree that's one tile taller, just place the tile at the
 *     bottom where you see the trunk.
 *   - Then, in-game, the tree will appear taller by one tile as marked.
 * - Depending on the priority settings, the tile will appear on different
 *   layers.
 *   - O will place the tile on the below player layer.
 *   - X will place the tile on the same level as the player.
 *   - ★ will place the tile on the above player layer.
 *   - O/X layer tiles have a special property where tall sprites standing in
 *     front of it will no longer clip the top of the sprite, while sprites
 *     standing behind it will be covered by it.
 *   - The X layer sprite will only have a hitbox of 1x1 at the base.
 * - This does not work with events using tiles as graphics. Instead, if you
 *   want to do similar, use the Event & Movement Core's <Tile Expand> notetags
 *   for better control.
 * 
 * ---
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Volume
 * - Changes the current BGS volume without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Volume:
 *   - Change the current BGS's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pitch
 * - Changes the current BGS pitch without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pitch:
 *   - Change the current BGS's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pan
 * - Changes the current BGS pan without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pan:
 *   - Change the current BGS's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
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
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 * 
 *   State Icons Non-Frame:
 *   - Replace sprite frame system for non-frame.
 *   - Better for any instances where icons are zoomed.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.86: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * 
 * Version 1.85: October 17, 2024
 * * Feature Updates!
 * ** Updated to fit RPG Maker MZ's updated 1.8.1 version better.
 * 
 * Version 1.84: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New notetags added by Arisu:
 * *** Tileset Notetag: <Taller By x: id>
 * **** Changes any page B, C, D, E tile marked by terrain tag 'id' to be
 *      taller by 'x' tiles.
 * **** When placing these tiles on the map, all you have to do is just place
 *      the bottom tile.
 * ***** ie.: For a tree that's one tile taller, just place the tile at the
 *       bottom where you see the trunk. Then, in-game, the tree will appear
 *       taller by one tile as marked.
 * **** O/X layer tiles have a special property where tall sprites standing in
 *      front of it will no longer clip the top of the sprite, while sprites
 *      standing behind it will be covered by it.
 * **** This does not work with events using tiles as graphics. Instead, if
 *      you want to do similar, use the Event & Movement Core's <Tile Expand>
 *      notetags for better control.
 * 
 * Version 1.83: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated documentation for <param Max: x> notetag.
 * *** This does not set the max cap to be lower than the default cap.
 * * New Feature!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > UI Settings > State Icons Non-Frame
 * **** Replace sprite frame system for non-frame.
 * **** Better for any instances where icons are zoomed.
 * 
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
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
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
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
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * "Don't" will consolidate both into "Escape".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
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
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
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
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
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
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
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
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
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
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
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
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
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
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
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
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
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
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
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
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
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
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
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
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param StateIconsNonFrame:eval
 * @text State Icons Non-Frame
 * @parent UIArea
 * @type boolean
 * @on Non-Frame
 * @off Normal
 * @desc Replace sprite frame system for non-frame.
 * Better for any instances where icons are zoomed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

function _0x5ac5(){const _0xb36e89=['target','Game_Actor_levelUp','_currentMap','IconXParam3','_targets','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','tilesetFlags','isTpb','map','Game_System_initialize','shake','Scene_Boot_updateDocumentTitle','Game_Interpreter_command122','children','PictureEraseRange','filters','MAXMP','ARRAYJSON','Input_update','goldWindowRect','CEV','batch','showIncompleteTilesetError','getCombinedScrollingText','INOUTEXPO','Scene_MenuBase_createCancelButton','paramRateJS','Window_NameInput_cursorLeft','FontSize','Scene_Title_drawGameTitle','characters','Game_Action_itemHit','createContents','OkText','pitch','isNwjs','stencilOp','makeAutoBattleActions','HRG','darwin','Title','Window_Base_drawFace','drawBackground','TextStr','GET','CategoryBgType','PictureCoordinatesMode','bind','PictureShowIcon','gainGold','_onKeyDown','value','processKeyboardDigitChange','makeCommandList','Control\x20Variables\x20Script\x20Error','AutoStretch','add','stencilFunc','sparamRate','showPicture','Window_StatusBase_drawActorLevel','isEventRunning','playTestF7','Bitmap_drawCircle','_forcedBattleSys','altKey','lineHeight','NumberBgType','Window','initVisuMZCoreEngine','process_VisuMZ_CoreEngine_Settings','dummyWindowRect','exec','evade','object','BattleManager_checkSubstitute','home','runCombinedScrollingTextAsCode','createAnimationSprite','_buttonType','_clientArea','WASD','Scene_Map_createSpritesetFix','reserveCommonEvent','SystemSetSideView','skillId','Window_TitleCommand_selectLast','keypress','SHIFT','atypeId','BlurFilter','Game_Picture_updateMove','movePageButtonSideButtonLayout','%1\x0a','pageup','Scene_Boot_onDatabaseLoaded','CTRL','applyEasing','PRINT','BackOpacity','pointY','hpGaugeColor1','Scene_Name_create','HELP','consumeItem','PERCENT','updateCurrentEvent','contains','repositionCancelButtonSideButtonLayout','SystemSetFontSize','SellRect','MapNameTextCode','addQueue','ONE','OS_KEY','Manual','lastAnimationSprite','PixelateImageRendering','_realScale','calcEasing','788136keJiZY','checkSubstitute','createPointAnimationSprite','windowRect','mpCostColor','AMPERSAND','F17','Renderer','PDR','EVA','Game_Interpreter_command111','getLastPluginCommandInterpreter','SCROLL_LOCK','isWindowMaskingEnabled','isAnimationForEach','GoldBgType','_cacheScaleY','\x5c}❪TAB❫\x5c{','select','pagedown','setMute','FDR','_helpWindow','INOUTELASTIC','setupValueFont','FadeSpeed','CLEAR','Param','onClick','PTB','restore','buttonAssistCancel','isSmartEventCollisionOn','loadBitmap','_updateGamepadState','paramBase','deathColor','hide','_dummyWindow','XParamVocab8','_coreEngineShakeStyle','changeTextColor','OUTQUINT','guardSkillId','setHome','isLoopVertical','SideButtons','TRAIT_PARAM','isPlaying','mainCommandWidth','nah','isGamepadTriggered','_updateFilterArea','F21','left','BTestArmors','offset','hpGaugeColor2','isCollidedWithEvents','CIRCUMFLEX','string','sceneTerminationClearEffects','isArrowPressed','gaugeBackColor','Game_Action_itemEva','Input_onKeyDown','randomJS','touchUI','adjustBoxSize','CoreEngine','keyMapper','parse','buttonAssistText1','SCROLLBAR','updateDuration','updatePositionCoreEngine','subject','ParseAllNotetags','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','floor','BACKSPACE','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','_movementDuration','OpenSpeed','createSubSprite','fillStyle','concat','isLoopHorizontal','deactivate','cursorPagedown','mainAreaBottom','process_VisuMZ_CoreEngine_Functions','_pointAnimationQueue','openURL','ButtonAssist','MINUS','_balloonQueue','setSideView','Game_Picture_angle','isBottomHelpMode','gaugeHeight','onerror','ParseActorNotetags','toUpperCase','MaxDuration','test','layoutSettings','EncounterRateMinimum','StatusEquipBgType','QUOTE','length','isSpecialCode','SceneManager_initialize','horzJS','Game_BattlerBase_refresh','getColor','createFauxAnimationSprite','removeAllFauxAnimations','yScrollLinkedOffset','numberShowButton','Game_Character_processMoveCommand','NumberRect','StatusMenu','buttonAreaHeight','getTileExtendTerrainTags','OpenURL','tileWidth','textColor','isRepeated','_bitmap','Graphics_printError','_number','duration','Window_Base_initialize','Finish','isAlive','IconSParam0','ParseItemNotetags','_addSpotTile','Window_NameInput_refresh','keys','CreateBattleSystemID','_stored_powerDownColor','_optionsWindow','ParseEnemyNotetags','call','CustomParamIcons','_shakeSpeed','tilesetNames','Scene_SingleLoadTransition','_currentBgs','ColorHPGauge1','Window_Selectable_processTouch','_targetOffsetX','ShowJS','scrollY','erasePicture','playTestShiftT','_pictureCoordinatesWindow','platform','StatusRect','IconParam3','Padding','IDs','ColorMPGauge1','DetachMapPictureContainer','scaleMode','ColorExpGauge2','ACCEPT','Scene_Options_create','isActor','_anglePlus','INCIRC','eva','tilesets','Weapon-%1-%2','onlyfilename','Window_NameInput_processTouch','_changingClass','ctrl','SlotRect','targetOpacity','_stored_maxLvGaugeColor2','SystemLoadImages','processTouch','members','win32','Sprite_AnimationMV_updatePosition','current','endBattlerActions','_currentBgm','BlurStrength','_downArrowSprite','_backgroundSprite','IconParam4','ExportString','_CoreEngineSettings','DocumentTitleFmt','ItemRect','volume','OUTCIRC','paramY','FUNC','PAUSE','_data','ceil','EnableMasking','buttonAssistKey3','INOUTBACK','isPhysical','_digitGrouping','_anchor','BattleSystem','loading','exp','paramFlat','getControllerInputButtonMatch','none','addEventListener','Sprite_Gauge_gaugeRate','render','createPointAnimationQueue','_cancelButton','BottomHelp','RPGMAKER_VERSION','process_VisuMZ_CoreEngine_CustomParameters','substring','drawTextEx','checkScrollBarBitmap','_skillTypeWindow','isEnemy','_hideTileShadows','Window_Selectable_processCursorMove','ColorHPGauge2','pictureButtons','Game_Action_setAttack','processTouchModernControls','itemRect','smoothSelect','isGamepadButtonPressed','HOME','numActions','setupRate','loadBitmapCoreEngine','_pauseSignSprite','width','_stored_expGaugeColor2','drawGauge','CustomParamAbb','NUMPAD6','playBuzzer','Layer','initMembersCoreEngine','Input_shouldPreventDefault','_hideButtons','WIN_ICO_00','REC','name','asin','PRINTSCREEN','ItemBgType','_lastX','EnableNameInput','Game_Picture_x','ActorMPColor','MCR','traitsPi','Page','bitmapWidth','INSERT','iconWidth','isPressed','DOWN','transform','GoldIcon','updateFrame','Input_pollGamepads','EXR','_targetAnchor','renderNoMask','destroyCoreEngineMarkedBitmaps','itemBackColor1','Window_NumberInput_processDigitChange','_saveFileID','apply','drawRightArrow','saveViewport','sparamFlat2','ExtractStrFromTroop','isItem','isMenuButtonAssistEnabled','buttons','refresh','Spriteset_Map_createTilemap','updateOnceParallelInterpreters','_battlerName','PIPE','ExportAllMapText','removePointAnimation','ProfileRect','INELASTIC','Window_NameInput_cursorRight','alignBottom','Window_EquipItem_isEnabled','reservePlayTestNewGameCommonEvent','centerY','playCursor','clearOnceParallelInterpreters','blt','gold','_textPopupWindow','TRG','Power','playBgm','initialize','SParamVocab8','_windowskin','PictureRotate','start','_targetScaleX','WIN_OEM_FJ_JISHO','Window_NameInput_cursorPagedown','contentsOpacity','IconSParam4','RepositionEnemies','INBACK','HYPHEN_MINUS','axes','sparamPlus','gradientFillRect','ARRAYSTRUCT','performMiss','INOUTQUAD','drawNewParam','mmp','Game_Picture_initRotation','mainAreaTop','startNormalGame','Max','XParamVocab0','easingType','drawGameSubtitle','initButtonHidden','split','_tilemap','getLastGamepadUsed','paramName','Window_SkillList_includes','BlendMode','outlineColorDmg','showFauxAnimations','command355','setBattleSystem','VisuMZ_2_BattleSystemOTB','enabled','ExtJS','targetY','buttonAssistKey4','printError','updateLastTarget','_fauxAnimationQueue','center','Graphics','tab','animationBaseDelay','xparamRateJS','targetX','VisuMZ_2_BattleSystemETB','setValue','onload','_sideButtonLayout','vertJS','background','padding','PageChange','font-smooth','BTestWeapons','ctrlKey','inputWindowRect','drawTextTopAligned','processKeyboardEnd','Scene_Boot_startNormalGame','1.3.0','xparamPlus','centerX','_texture','cursorRight','70DzASLA','_coreEasing','endAnimation','deflate','animationId','list','buttonAssistOk','canEquip','ImprovedAccuracySystem','initCoreEngineScreenShake','Y:\x20%1','scale','_pictureName','style','〘Scrolling\x20Text〙\x0a','_cacheScaleX','shouldAutosave','createBackground','Map%1.json','resetFontSettings','SParamVocab6','sv_actors','TPB\x20ACTIVE','createFauxAnimation','OTB','\x5c}❪SHIFT❫\x5c{','destroyScrollBarBitmaps','DisplayedParams','isKeyItem','EVAL','isMagical','gainItem','sqrt','Input_updateGamepadState','Settings','itemLineRect','sparamPlus2','VOLUME_MUTE','PreserveNumbers','_numberWindow','1.4.4','addChildToBack','paramMaxJS','onButtonImageLoad','ItemBackColor2','clearForcedGameTroopSettingsCoreEngine','Flat','enableDigitGrouping','CANCEL','sellWindowRect','Basic','removeChild','ColorTPGauge1','sparamPlus1','XParamVocab7','_repositioned','_timerSprite','VisuMZ_2_BattleSystemSTB','_editWindow','_text','mainAreaHeightSideButtonLayout','executeLoad','DEF','_stored_ctGaugeColor1','Scene_Map_initialize','currentExp','rowSpacing','Scene_Map_updateMainMultiply','CommandBgType','bgsVolume','4977720jlffze','_lastCommandSymbol','ItemHeight','Spriteset_Base_destroy','makeDocumentTitle','SParamVocab3','addLoadListener','PHA','Game_Interpreter_updateWaitMode','buttonAssistText3','Enemy','removeAllPointAnimations','_targetX','HelpBgType','isMaxLevel','Window_Scrollable_update','_animationQueue','LESS_THAN','itypeId','scrollDown','onMoveEnd','_stored_hpGaugeColor2','Sprite_Gauge_currentValue','wait','dimColor1','sparamRate1','statusParamsWindowRect','CommandRect','framesPerChar','_destroyInternalTextures','Match','system','_mapY','arePageButtonsEnabled','abs','log','animationShouldMirror','areTileShadowsHidden','ButtonHeight','setEasingType','_bgsBuffer','destroyed','determineSideButtonLayoutValid','isOpenAndActive','_target','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','Game_Actor_paramBase','Mirror','_baseTexture','isGamepadConnected','itemHitImprovedAccuracy','Graphics_centerElement','loadMapData','%1:\x20Exit\x20','_previousClass','OutlineColor','_textQueue','_pictureContainer','ParamName','Scene_Base_create','F20','MinDuration','paramPlusJS','AudioChangeBgsPitch','return\x200','_addShadow','updateMove','disable','windowOpacity','targetBackOpacity','CategoryRect','levelUpRecovery','_inputString','seek','open','PERIOD','playTestShiftR','getParameter','commandWindowRect','MvAnimationRate','SaveMenu','CommandWidth','cursorPageup','CLOSE_PAREN','_stored_tpCostColor','params','NONCONVERT','KeySHIFT','DisplayLockY','setEnemyAction','_animation','VisuMZ_3_EventChainReact','ScaleY','Plus1','SkillTypeRect','defaultInputMode','getColorDataFromPluginParameters','DimColor2','sparamRateJS','AutoScrollLockX','down2','BTB','_closing','_pointAnimationSprites','resize','crisisColor','RowSpacing','_stored_ctGaugeColor2','MAT','endAction','updateRotation','MRG','WIN_OEM_RESET','DigitGroupingStandardText','originalJS','IconSet','isGameActive','option','_lastIconIndex','reserveNewGameCommonEvent','ExtractStrFromList','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_opacity','_commandWindow','ShowItemBackground','CancelText','_commandList','CodeJS','text%1','targetScaleY','scrollX','showDevTools','uiAreaWidth','Bitmap_drawText','IconXParam6','_refreshBack','processBack','createBuffer','QUESTION_MARK','OPEN_BRACKET','isNextScene','updateScrollBars','enemies','itemSuccessRate','OpenConsole','pictureId','currentLevelExp','level','areButtonsOutsideMainUI','EnableNumberInput','CRSEL','ENTER','Scene_Equip_create','button','〘Show\x20Text〙\x0a','index','changeTileset','shift','Game_Picture_show','boxHeight','baseTextRect','IconSParam9','backgroundBitmap','updateBgmParameters','padZero','isSideView','isPlaytest','parameters','createTroopNote','min','buttonAssistWindowRect','_allTextHeight','max','createPageButtons','titles1','font','Rate','_slotWindow','strokeRect','ActorTPColor','bgm','catchUnknownError','playTestF6','refreshWithTextCodeSupport','innerWidth','horz','Game_Map_scrollUp','learnings','buttonAssistText%1','playMiss','IconXParam1','createTextPopupWindow','WIN_OEM_AUTO','jsonToZip','_context','Game_Interpreter_PluginCommand','_iconIndex','_commonEventLayers','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','WIN_OEM_JUMP','exit','Enable','_opening','DefaultMode','outbounce','Window_Selectable_cursorDown','Game_Picture_calcEasing','Input_setupEventHandlers','successRate','expGaugeColor1','processKeyboardHome','Window_ShopSell_isEnabled','_stored_hpGaugeColor1','\x20Origin:\x20%1','faceHeight','enableDigitGroupingEx','ARRAYSTR','offsetY','xScrollLinkedOffset','EnableJS','_digitGroupingEx','RegExp','VOLUME_DOWN','_listWindow','loadPicture','anchorCoreEasing','isTileExtended','textBaseline','updatePadding','addWindow','Enemy-%1-%2','outlineColorGauge','SEMICOLON','changeAnglePlusData','fillRect','FINAL','setFrame','DATABASE','sparam','Center','IconSParam3','coreEngineRepositionEnemies','drawValue','cancel','DrawItemBackgroundJS','enter','ControllerButtons','StatusBgType','updateMotion','terms','_timeDuration','show','_drawTextBody','hpColor','F16','OUTBACK','uiAreaHeight','dashToggle','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','_effectsContainer','drawBackgroundRect','popScene','KeyTAB','gaugeRate','framesMax','Scene_Boot_loadSystemImages','isMVAnimation','ApplyEasing','end','SParamVocab4','replace','processAlwaysEscape','clamp','_colorCache','match','makeFontSmaller','VariableEvalReference','LevelUpFullHp','valueOutlineColor','xparamRate2','isUseModernControls','14392trUUoI','requestPointAnimation','updatePointAnimations','WIN_ICO_HELP','setAnglePlusData','cancelShowButton','Game_Temp_initialize','TextJS','moveMenuButtonSideButtonLayout','_internalTextures','NUMPAD3','optionsWindowRect','isBusy','INOUTCUBIC','levelUp','_backgroundFilter','SELECT','updateWaitMode','gaugeLineHeight','_stored_pendingColor','Icon','bodyColor','getKeyboardInputButtonString','_mapX','EndingID','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','Window_NumberInput_start','loadSystemImages','createTilemap','hideButtonFromView','top','DrawIcons','(\x5cd+)>','fadeSpeed','StatusParamsRect','fillText','catchNormalError','setCoreEngineScreenShakeStyle','Symbol','SETTINGS','horizontal','reduce','Show\x20Scrolling\x20Text\x20Script\x20Error','maxLvGaugeColor2','Scene_Base_terminateAnimationClearBugFix','makeActionList','ShopMenu','XParamVocab5','UNDERSCORE','_active','CommonEventID','TCR','_index','loadTitle2','COLON','([\x5c+\x5c-]\x5cd+)>','usableSkills','INOUTSINE','initRotation','_pageupButton','EquipMenu','Bitmap_measureTextWidth','Spriteset_Base_initialize','Total','〘Common\x20Event\x20%1:\x20%2〙\x20End','IconXParam5','quit','_shakePower','Sprite_Battler_startMove','faces','overallHeight','parallaxes','Sprite_destroy','setupTileExtendTerrainTags','RightMenus','_margin','forceOutOfPlaytest','IconSParam1','drawGameVersion','ParseStateNotetags','paramValueByName','clone','CTB','TextFmt','ParseClassNotetags','xparamFlatBonus','Game_Picture_initBasic','ParseSkillNotetags','WIN_OEM_FJ_LOYA','skills','checkCoreEngineDisplayCenter','_fauxAnimationSprites','_battleField','updateScrollBarPosition','DebugConsoleLastControllerID','makeEncounterCount','ForceNoPlayTest','resetTextColor','sparamFlatJS','inbounce','Scene_Shop_create','scrollLeft','updateShadow','default','MEV','visible','makeInputButtonString','itemEva','TextCodeNicknames','allTiles','measureTextWidth','ScaleX','setViewport','getPointAnimationLayer','Game_Party_consumeItem','EREOF','GroupDigits','scrollRight','PositionX','setAnchor','seVolume','Plus','_offsetY','pagedownShowButton','drawParamName','addOnceParallelInterpreter','targets','ShiftR_Toggle','【%1】\x0a','_refreshPauseSign','MultiKeyFmt','WIN_OEM_WSCTRL','SceneManager_onKeyDown','TextCodeClassNames','_url','Window_Base_drawIcon','_scaleX','EXECUTE','connected','F13','deselect','_windowLayer','SCALE_MODES','_stored_normalColor','_muteSound','WIN_OEM_FINISH','ZERO','framebuffer','_displayX','itemHit','animationNextDelay','battlebacks2','Scene_Menu_create','Scene_Status_create','Scene_MenuBase_createPageButtons','subjectHitRate','BgFilename1','Subtitle','F19','buttonAssistOffset4','buttonAssistKey5','isClosed','_pictureCoordinatesMode','addChild','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','atbActive','playOk','WIN_OEM_CUSEL','buttonAssistKey2','AudioChangeBgsVolume','_scrollDuration','_list','F23','TimeProgress','centerSprite','_image','commandWindowRows','doesNameContainBannedWords','areButtonsHidden','_backSprite','STENCIL_TEST','recoverAll','_encounterCount','SkillMenu','XParamVocab2','Scene_Map_createSpriteset','keyCode','encounterStep','F14','isOpen','3QbtASb','catchException','_centerElementCoreEngine','_statusEquipWindow','buttonAssistOffset%1','setViewportCoreEngineFix','GoldChange','SUBTRACT','up2','TitleCommandList','_subject','processCursorMove','IconSParam7','1307817cIntii','integer','zoomScale','playOnceParallelInterpreter','_dimmerSprite','round','ExportStrFromAllTroops','measureText','_stored_tpGaugeColor2','evaded','updateData','changeClass','VariableJsBlock','Graphics_defaultStretchMode','playtestQuickLoad','paramWidth','isSideButtonLayout','toLocaleString','Gold','showPointAnimations','%1/','updateDocumentTitle','IconXParam0','buyWindowRect','SEPARATOR','initialBattleSystem','height','paramX','ZOOM','backspace','MenuLayout','mainAreaTopSideButtonLayout','keyRepeatWait','menuShowButton','_lastY','861006sXmUax','gainSilentTp','EQUALS','enable','_scene','Scene_MenuBase_mainAreaHeight','CAPSLOCK','boxWidth','prototype','parseForcedGameTroopSettingsCoreEngine','updatePictureCoordinates','pixelated','pictures','ExportStrFromAllMaps','child_process','ColorPowerUp','ControllerMatches','HASH','Sprite_StateIcon_updateFrame','JUNJA','XParamVocab6','NoTileShadows','InputRect','TextPopupShow','process_VisuMZ_CoreEngine_ControllerButtons','Scene_Battle_createSpriteset','valueOutlineWidth','_startPlaying','StatusParamsBgType','_forcedBattleGridSystem','thickness','Flat2','AllTroops','smallParamFontSize','indexOf','PLUS','initCoreEngine','NUMPAD1','scaleX','buttonAssistSwitch','UpdatePictureCoordinates','ScreenShake','processKeyboardDelete','_bypassCanCounterCheck','_mainSprite','sparamRate2','processSoundTimings','Flat1','random','GREATER_THAN','LUK','_backSprite2','statusWindowRect','powerUpColor','isAnimationPlaying','_srcBitmap','_width','_sellWindow','terminate','command357','ShowDevTools','maxScrollY','Window_Gold_refresh','itemHeight','clearCachedKeys','_drawTextShadow','original','Window_StatusBase_drawActorSimpleStatus','MIN_SAFE_INTEGER','AntiZoomPictures','([\x5c+\x5c-]\x5cd+)([%％])>','isAnimationOffsetXMirrored','setActionState','maxHorz','SkillTypeBgType','defineProperty','sparamFlatBonus','Sprite_Animation_processSoundTimings','_originalViewport','$dataMap','PositionJS','ExtDisplayedParams','xdg-open','startAutoNewGame','xparamFlat1','focus','_screenX','_actor','requiredWtypeId1','HelpRect','randomInt','_onError','setupBattleTestItems','TPB\x20WAIT','currentClass','processDigitChange','initCoreEasing','Scene_MenuBase_mainAreaTop','textSizeEx','ExtractStrFromMap','CRI','Game_Picture_y','SceneManager_isGameActive','〘Common\x20Event\x20%1:\x20%2〙\x20Start','》Comment《\x0a%1\x0a','createChildSprite','Sprite_Animation_setViewport','getBattleSystem','Game_Picture_updateRotation','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','CONTEXT_MENU','moveRelativeToResolutionChange','keyboard','DefaultStyle','OUTEXPO','iconHeight','SParamVocab9','categoryWindowRect','createPointAnimation','_isButtonHidden','windowPadding','process_VisuMZ_CoreEngine_jsQuickFunctions','Scene_Map_update','paramFlatBonus','onXhrError','createCustomParameter','DashToggleR','updateScrollBarVisibility','AutoScrollLockY','slotWindowRect','BACK_SLASH','_shiftY','QoL','nw.gui','GoldOverlap','SParameterFormula','listWindowRect','_mode','_isWindow','_storedStack','_targetOffsetY','_coreEasingType','textAlign','DELETE','responseText','_storedMapText','Bitmap_strokeRect','Rate2','wtypeId','_destroyCanvas','Game_Map_setDisplayPos','LevelUpFullMp','en-US','Bitmap_gradientFillRect','_playTestFastMode','updateFauxAnimations','setMainFontSize','playCursorSound','version','_pressed','paintOpacity','_setupEventHandlers','key%1','scrollbar','performEscape','Window_Base_drawText','SParamVocab7','XParamVocab9','isBottomButtonMode','SnapshotOpacity','WIN_OEM_ENLW','scrollUp','NUMPAD5','isPointAnimationPlaying','getButtonAssistLocation','updatePositionCoreEngineShakeRand','adjustX','_rate','displayY','bitmap','paramRate1','VisuMZ_2_BattleSystemCTB','F12','setupCustomRateCoreEngine','NON_FRAME','updatePositionCoreEngineShakeVert','loadTileBitmap','WIN_OEM_FJ_MASSHOU','paramMax','currentValue','hit','OUTELASTIC','isMapScrollLinked','optSideView','Scene_Map_createSpriteset_detach','_moveEasingType','WIN_OEM_CLEAR','maxGold','applyForcedGameTroopSettingsCoreEngine','innerHeight','_scrollBarHorz','drawIconBySize','isSceneBattle','processFauxAnimationRequests','%1%2','startMove','blockWidth','paramRate','xparamPlusJS','ONE_MINUS_SRC_ALPHA','contents','ARRAYNUM','maxScrollbar','<JS\x20%1\x20%2:[\x20](.*)>','update','rgba(0,\x200,\x200,\x200.7)','IconSParam8','meVolume','maxTurns','imageSmoothingEnabled','_phase','includes','30259gKVHFV','useDigitGrouping','META','refreshActor','actorWindowRect','BattleManager_invokeCounterAttack','createTitleButtons','bgmVolume','KeyboardInput','titleCommandWindow','BaseTexture','image-rendering','buttonAssistOffset1','updatePosition','snapForBackground','Armor-%1-%2','tpGaugeColor2','Scene_Battle_update','item','SLEEP','_maxDigits','getLevel','mpColor','ENTER_SPECIAL','INSINE','hasEncryptedImages','save','setActorHome','tpCostColor','removeAnimationFromContainer','SideView','openingSpeed','getControllerInputButtonString','Scene_MenuBase_helpAreaTop','setWindowPadding','and\x20add\x20it\x20onto\x20this\x20one.','WIN_OEM_FJ_ROYA','ColorMPCost','NUMPAD9','sin','Spriteset_Battle_createEnemies','drawSegment','helpWindowRect','isTouchedInsideFrame','PictureFilename','Game_BattlerBase_initMembers','Window_refreshBack','_inputWindow','updateMainMultiply','currencyUnit','buttonAssistText5','Window_Base_createTextState','application/json','layeredTiles','position','targetContentsOpacity','makeFontBigger','rightArrowWidth','removeOnceParallelInterpreter','_isPlaytest','_mapNameWindow','pages','battlebacks1','isItemStyle','_drawTextOutline','processKeyboardBackspace','right','setCoreEngineUpdateWindowBg','_statusWindow','img/%1/','startAnimation','_stored_systemColor','Plus2','SParamVocab0','VisuMZ_2_BattleSystemPTB','_tileSprite','_tileExtendTerrainTags','buttonAssistWindowButtonRect','FunctionName','getCoreEngineScreenShakeStyle','ParamChange','processTimingData','repositionEnemiesByResolution','push','GoldMax','_clickHandler','process_VisuMZ_CoreEngine_Notetags','setupScrollBarBitmap','_buttonAssistWindow','updateBackOpacity','Rate1','buttonAssistKey%1','isNormalPriority','Scene_Base_terminate','refreshSpritesetForExtendedTiles','src','flush','systemColor','CallHandlerJS','_upArrowSprite','backOpacity','RevertPreserveNumbers','pan','translucentOpacity','damageColor','_startLoading','HANJA','INQUART','ColorMPGauge2','Origin','trim','setMoveEasingType','equips','_scaleY','CNT','text','createCommandWindow','checkCacheKey','updateMain','_makeFontNameText','useDigitGroupingEx','prepareNextScene','maxCols','toFixed','outlineColor','setupCoreEasing','Bitmap_blt','Scene_Title','createSpriteset','initRotationCoreEngine','ColSpacing','loadIconBitmap','_logWindow','_stored_mpGaugeColor1','calcCoreEasing','getInputMultiButtonStrings','mpGaugeColor1','%1〘Choice\x20Cancel〙%1','STENCIL_BUFFER_BIT','initBasic','updatePlayTestF7','setActorHomeRepositioned','Window_NameInput_cursorDown','title','#%1','DataManager_setupNewGame','ALT','inBattle','Game_Map_scrollRight','buttonAssistWindowSideRect','WindowLayer_render','ProfileBgType','xparamFlatJS','Conditional\x20Branch\x20Script\x20Error','3174976GnobPz','DigitGroupingExText','%1〘Choice\x20%2〙\x20%3%1','_stored_maxLvGaugeColor1','operation','Window_Base_drawCharacter','OUTCUBIC','isSceneMap','needsUpdate','updateFrameCoreEngine','retrievePointAnimation','stop','playBgs','targetScaleX','itemPadding','removeTileExtendSprites','WIN_ICO_CLEAR','Bitmap_resize','IconParam1','clearStencil','charAt','drawFace','isForFriend','_backSprite1','canUse','PositionY','Input_clear','Spriteset_Base_update','ListBgType','OUTSINE','Game_Troop_setup','Game_Event_isCollidedWithEvents','NameInputMessage','repeat','allowShiftScrolling','_pagedownButton','LoadError','createEnemies','Window_Selectable_cursorUp','updateAnchor','processHandling','Location','contentsBack','_gamepadWait','ImgLoad','_duration','BACK_QUOTE','applyEasingAnglePlus','Scene_Map_createMenuButton','createTextState','updateDashToggle','MRF','displayX','onInputBannedWords','_showDevTools','ParseTilesetNotetags','MAX_SAFE_INTEGER','Unnamed','\x0a\x0a\x0a\x0a\x0a','ShiftT_Toggle','TGR','xparam','pendingColor','VisuMZ_1_OptionsCore','_origin','ESC','SceneManager_exit','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','OPEN_PAREN','MODECHANGE','PRESERVCONVERSION(%1)','events','_statusParamsWindow','Sprite_Button_initialize','ConvertNumberToString','_buyWindow','STB','createJsQuickFunction','CrisisRate','0.00','VisuMZ_4_UniqueTileEffects','createCustomBackgroundImages','_lastPluginCommandInterpreter','onKeyDown','SystemSetBattleSystem','SellBgType','ScreenResolution','updateScene','Window_NameInput_initialize','Window_MapName_refresh','selectLast','displayName','consumable','Window_NameInput_cursorPageup','_playtestF7Looping','setupNewGame','targetObjects','_onLoad','clear','processCursorHomeEndTrigger','setTileFrame','Window_Selectable_drawBackgroundRect','OptionsRect','PA1','remove','ListRect','BattleManager_processEscape','bgs','editWindowRect','AllMaps','Window_Base_createContents','createTileExtendSprites','Game_Screen_initialize','Sprite_Actor_setActorHome','RIGHT','SParamVocab2','param','addCommand','ColorMaxLvGauge1','alpha','useFontWidthFix','exportAllMapStrings','Game_Action_updateLastTarget','Game_Interpreter_command355','Smooth','stretch','xparamPlus2','NUMPAD8','type','updateBgsParameters','ColorCrisis','isMaskingEnabled','getGamepads','vert','SParamVocab5','Scene_Item_create','Game_Picture_scaleY','INQUINT','_loadingState','ItemStyle','destroyContents','helpAreaHeight','tileset','MDR','_actorWindow','_spriteset','setSkill','toLowerCase','number','Speed','F7key','blendFunc','invokeCounterAttack','setCommonEvent','_goldWindow','_stored_tpGaugeColor1','FontSmoothing','buttonAssistOffset5','PGDN','buttonAssistText2','stypeId','_categoryWindow','drawActorExpGauge','Tilemap_addSpotTile','DurationPerChat','cursorDown','%1〘End\x20Choice\x20Selection〙%1','ShowScrollBar','Bitmap_fillRect','OffBarColor','retrieveFauxAnimation','Bitmap_clearRect','Wait','initDigitGrouping','Scene_Map_updateScene','_patternHeight','ParamMax','_centerCameraCheck','_scrollBarVert','ConvertParams','NewGameBoot','setup','createButtonAssistWindow','Scene_GameEnd_createBackground','slice','isScrollBarVisible','note','worldTransform','_stored_mpGaugeColor2','Troop%1','textHeight','MAXHP','Item-%1-%2','_itemWindow','IconSParam6','Sprite_AnimationMV_processTimingData','VisuMZ_2_BattleSystemFTB','isCancelled','CustomParam','Scene_Skill_create','ColorDeath','drawGameTitle','VisuMZ_1_BattleCore','initMembers','AccuracyBoost','ExportAllTroopText','mute','filter','move','setEvent','drawText','loadSystem','markCoreEngineModified','etypeId','Game_Event_start','BoxMargin','createDigits','cursorLeft','opacity','ASTERISK','KeyUnlisted','maxScrollX','stringKeyMap','INCUBIC','IconXParam9','measureTextWidthNoRounding','filterArea','isInstanceOfSceneMap','gameTitle','_lastScrollBarValues','checkPassage','down','applyCoreEasing','bitmapHeight','Game_Map_setup','active','centerCameraCheckData','Sprite_Picture_loadBitmap','Linear','numRepeats','vertical','moveCancelButtonSideButtonLayout','%2%1%3','setClickHandler','xparamFlat2','maxItems','code','sparamPlusJS','drawGoldItemStyle','_lastOrigin','removeFauxAnimation','getBackgroundOpacity','ARRAYFUNC','ParseWeaponNotetags','catchLoadError','ModernControls','Duration','Spriteset_Base_isAnimationPlaying','picture','IconXParam7','paramFlatJS','DOLLAR','drawActorNickname','getCustomBackgroundSettings','_lastGamepad','scaleSprite','helpAreaTopSideButtonLayout','updateText','setHandler','normal','StartID','isOptionValid','Map%1','subtitle','_createInternalTextures','ColorCTGauge2','Spriteset_Base_updatePosition','retreat','dimColor2','GameEnd','Window_Base_destroyContents','SwitchToggleOne','KANA','IconParam2','GoldRect','isCursorMovable','SmartEventCollisionPriority','Keyboard','Bitmap_drawTextOutline','pos','buttonAssistText4','drawCharacter','ColorManager_loadWindowskin','sv_enemies','MenuBg','expRate','_onKeyPress','_blank','F10','Window_NameInput_cursorUp','SwitchToggleRange','rgba(0,\x200,\x200,\x201.0)','xparamPlus1','Sprite_Button_updateOpacity','setLastGamepadUsed','skillTypes','_shouldPreventDefault','GRD','updatePictureSettings','setLastPluginCommandInterpreter','maxLvGaugeColor1','_viewportSize','advanced','loadWindowskin','BasicParameterFormula','RequireFocus','ALTGR','process_VisuMZ_CoreEngine_RegExp','drawItem','isEnabled','TargetAngle','nickname','clearRect','constructor','Mute','Scene_Map_updateMain','Chance','setTargetAnchor','_screenY','itemWindowRect','isInputting','STRUCT','Bitmap_initialize','VIEWPORT','turn','_movementWholeDuration','create','command122','CLOSE_BRACKET','registerCommand','faceWidth','normalColor','WIN_OEM_FJ_TOUROKU','refreshScrollBarBitmap','WIN_OEM_PA3','AGI','updateOpacity','pow','sparamFlat1','Color','Window_NameInput_processHandling','BannedWords','HIT','traitObjects','requestFauxAnimation','isTriggered','NUMPAD4','MDF','openness','buttonAssistKey1','_hp','_cache','XParamVocab4','IconSParam2','_offsetX','REPLACE','helpAreaBottom','ParseArmorNotetags','cos','adjustPictureAntiZoom','CtrlQuickLoad','F6key','ColorExpGauge1','CONVERT','XParameterFormula','isNumpadPressed','join','drawActorSimpleStatus','OUTQUAD','_action','setGuard','fontSize','addAnimationSpriteToContainer','setSideButtonLayout','_stored_crisisColor','setColorTone','LINEAR','actor','_inputSpecialKeyCode','DigitGroupingLocale','isGamepadAxisMoved','_baseSprite','CommandList','command111','playEscape','DECIMAL','_pollGamepads','isExpGaugeDrawn','tileHeight','Window_Selectable_itemRect','drawIcon','GoldFontSize','TextManager_param','createCancelButton','paramchangeTextColor','globalAlpha','_forcedTroopView','onDatabaseLoaded','Exported_Script_%1.txt','Script\x20Call\x20Error','checkPlayerLocation','loadTitle1','resetBattleSystem','targetEvaRate','switchModes','mainFontSize','makeCoreEngineCommandList','_centerElement','<%1\x20%2:[\x20]','CustomParamNames','maxVisibleItems','createKeyJS','BgFilename2','Sprite_Picture_updateOrigin','OnLoadJS','_onceParallelInterpreters','setBackgroundType','LineHeight','drawCircle','maxLevel','_profileWindow','isFullDocumentTitle','_bgmBuffer','Game_Map_changeTileset','processCursorMoveModernControls','anchor','textWidth','SwitchRandomizeOne','Scene_Battle_createSpritesetFix','createDimmerSprite','WIN_OEM_ATTN','IconParam7','operand','_targetY','cursorUp','_refreshArrows','WIN_OEM_PA1','Opacity','battleSystem','loadTileset','getInputButtonString','FontWidthFix','processMoveCommand','DOUBLE_QUOTE','KEEP','URL','Actor','tpColor','description','writeFile','ETB','ExportCurMapText','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','exportAllTroopStrings','Game_Action_numRepeats','FTB','alwaysDash','destroy','SubfolderParse','GetParamIcon','_shakeDuration','framesMin','DETACH_PICTURE_CONTAINER','IconSParam5','updateClose','IconIndex','Scene_Name_onInputOk','Tilemap_addShadow','scaleY','encounterStepsMinimum','_tileExtendSprites','IconXParam8','ShowButtons','Game_Map_scrollDown','adjustSprite','expParams','toString','updatePictureAntiZoom','ctGaugeColor1','ColorTPCost','ATK','updateKeyText','JSON','RepositionEnemies130','_height','createPointAnimationTargets','setDisplayPos','overrideMimeType','setAttack','DisplayLockX','CLOSE_CURLY_BRACKET','PictureID','origin','ActorBgType','wholeDuration','format','CustomParamType','processKeyboardHandling','_animationSprites','drawParamText','App','itemBackColor2','_customModified','Untitled','setupButtonImage','send','autoRemovalTiming','alphabetic','mhp','_registerKeyInput','mapId','adjustY','_stypeId','data/','processPointAnimationRequests','EISU','animations','drawActorLevel','createFauxAnimationQueue','ActorRect','maxBattleMembers','menu','missed','Scene_Battle_createCancelButton','_displayY','ColorMaxLvGauge2','Upper\x20Left','BuyBgType','setBackgroundOpacity','charCode','updatePositionCoreEngineShakeHorz','angle','skillTypeWindowRect'];_0x5ac5=function(){return _0xb36e89;};return _0x5ac5();}const _0x488b27=_0x597b;(function(_0x438adb,_0x3bacf0){const _0x75eb16=_0x597b,_0x319419=_0x438adb();while(!![]){try{const _0x12495a=-parseInt(_0x75eb16(0x5f9))/0x1+parseInt(_0x75eb16(0x92a))/0x2*(parseInt(_0x75eb16(0x4eb))/0x3)+parseInt(_0x75eb16(0x42d))/0x4*(-parseInt(_0x75eb16(0x2ce))/0x5)+-parseInt(_0x75eb16(0x51b))/0x6+parseInt(_0x75eb16(0x4f8))/0x7+parseInt(_0x75eb16(0x693))/0x8+-parseInt(_0x75eb16(0x314))/0x9;if(_0x12495a===_0x3bacf0)break;else _0x319419['push'](_0x319419['shift']());}catch(_0x5778d1){_0x319419['push'](_0x319419['shift']());}}}(_0x5ac5,0x30f6f));var label=_0x488b27(0x96f),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x488b27(0x762)](function(_0x247279){const _0x132984=_0x488b27;return _0x247279['status']&&_0x247279['description'][_0x132984(0x5f8)]('['+label+']');})[0x0];VisuMZ[label][_0x488b27(0x2f0)]=VisuMZ[label][_0x488b27(0x2f0)]||{},VisuMZ[_0x488b27(0x746)]=function(_0x2ae463,_0x5b272b){const _0x57fd9b=_0x488b27;for(const _0x18e088 in _0x5b272b){if(_0x18e088[_0x57fd9b(0x426)](/(.*):(.*)/i)){const _0xc14c7a=String(RegExp['$1']),_0x3c9e38=String(RegExp['$2'])[_0x57fd9b(0x991)]()['trim']();let _0x1df678,_0x533435,_0x5d9e0a;switch(_0x3c9e38){case'NUM':_0x1df678=_0x5b272b[_0x18e088]!==''?Number(_0x5b272b[_0x18e088]):0x0;break;case _0x57fd9b(0x5ee):_0x533435=_0x5b272b[_0x18e088]!==''?JSON[_0x57fd9b(0x971)](_0x5b272b[_0x18e088]):[],_0x1df678=_0x533435['map'](_0x2764cf=>Number(_0x2764cf));break;case _0x57fd9b(0x2eb):_0x1df678=_0x5b272b[_0x18e088]!==''?eval(_0x5b272b[_0x18e088]):null;break;case'ARRAYEVAL':_0x533435=_0x5b272b[_0x18e088]!==''?JSON[_0x57fd9b(0x971)](_0x5b272b[_0x18e088]):[],_0x1df678=_0x533435[_0x57fd9b(0x8ba)](_0xb86fe3=>eval(_0xb86fe3));break;case _0x57fd9b(0x87f):_0x1df678=_0x5b272b[_0x18e088]!==''?JSON[_0x57fd9b(0x971)](_0x5b272b[_0x18e088]):'';break;case _0x57fd9b(0x8c3):_0x533435=_0x5b272b[_0x18e088]!==''?JSON[_0x57fd9b(0x971)](_0x5b272b[_0x18e088]):[],_0x1df678=_0x533435[_0x57fd9b(0x8ba)](_0x4d5a8f=>JSON[_0x57fd9b(0x971)](_0x4d5a8f));break;case _0x57fd9b(0x215):_0x1df678=_0x5b272b[_0x18e088]!==''?new Function(JSON[_0x57fd9b(0x971)](_0x5b272b[_0x18e088])):new Function(_0x57fd9b(0x354));break;case _0x57fd9b(0x78f):_0x533435=_0x5b272b[_0x18e088]!==''?JSON[_0x57fd9b(0x971)](_0x5b272b[_0x18e088]):[],_0x1df678=_0x533435['map'](_0x2a3a38=>new Function(JSON[_0x57fd9b(0x971)](_0x2a3a38)));break;case'STR':_0x1df678=_0x5b272b[_0x18e088]!==''?String(_0x5b272b[_0x18e088]):'';break;case _0x57fd9b(0x3ec):_0x533435=_0x5b272b[_0x18e088]!==''?JSON[_0x57fd9b(0x971)](_0x5b272b[_0x18e088]):[],_0x1df678=_0x533435[_0x57fd9b(0x8ba)](_0x4ab335=>String(_0x4ab335));break;case _0x57fd9b(0x7de):_0x5d9e0a=_0x5b272b[_0x18e088]!==''?JSON[_0x57fd9b(0x971)](_0x5b272b[_0x18e088]):{},_0x2ae463[_0xc14c7a]={},VisuMZ[_0x57fd9b(0x746)](_0x2ae463[_0xc14c7a],_0x5d9e0a);continue;case _0x57fd9b(0x295):_0x533435=_0x5b272b[_0x18e088]!==''?JSON[_0x57fd9b(0x971)](_0x5b272b[_0x18e088]):[],_0x1df678=_0x533435['map'](_0x4ad259=>VisuMZ['ConvertParams']({},JSON[_0x57fd9b(0x971)](_0x4ad259)));break;default:continue;}_0x2ae463[_0xc14c7a]=_0x1df678;}}return _0x2ae463;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x6d5)]=SceneManager['exit'],SceneManager[_0x488b27(0x3dc)]=function(){const _0x7b6741=_0x488b27;VisuMZ[_0x7b6741(0x96f)][_0x7b6741(0x6d5)][_0x7b6741(0x1dc)](this);if(Utils[_0x7b6741(0x22b)]>=_0x7b6741(0x2f6)){if(typeof nw===_0x7b6741(0x8fc))nw[_0x7b6741(0x891)][_0x7b6741(0x46f)]();}},(_0x49221a=>{const _0x12fac1=_0x488b27,_0x4b6fdc=_0x49221a[_0x12fac1(0x24c)];for(const _0x48faaa of dependencies){if(!Imported[_0x48faaa]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x12fac1(0x88c)](_0x4b6fdc,_0x48faaa)),SceneManager[_0x12fac1(0x3dc)]();break;}}const _0x340171=_0x49221a[_0x12fac1(0x85d)];if(_0x340171[_0x12fac1(0x426)](/\[Version[ ](.*?)\]/i)){const _0x128557=Number(RegExp['$1']);_0x128557!==VisuMZ[label][_0x12fac1(0x5b9)]&&(alert(_0x12fac1(0x4d1)['format'](_0x4b6fdc,_0x128557)),SceneManager[_0x12fac1(0x3dc)]());}if(_0x340171[_0x12fac1(0x426)](/\[Tier[ ](\d+)\]/i)){const _0x31192f=Number(RegExp['$1']);_0x31192f<tier?(alert(_0x12fac1(0x38d)[_0x12fac1(0x88c)](_0x4b6fdc,_0x31192f,tier)),SceneManager[_0x12fac1(0x3dc)]()):tier=Math[_0x12fac1(0x3c0)](_0x31192f,tier);}VisuMZ[_0x12fac1(0x746)](VisuMZ[label]['Settings'],_0x49221a[_0x12fac1(0x3bb)]);})(pluginData),((()=>{const _0x4bac6c=_0x488b27;if(VisuMZ['CoreEngine'][_0x4bac6c(0x2f0)][_0x4bac6c(0x59f)][_0x4bac6c(0x867)]??!![])for(const _0xb9920f in $plugins){const _0x2c9468=$plugins[_0xb9920f];_0x2c9468[_0x4bac6c(0x24c)][_0x4bac6c(0x426)](/(.*)\/(.*)/i)&&(_0x2c9468[_0x4bac6c(0x24c)]=String(RegExp['$2'][_0x4bac6c(0x667)]()));}})()),PluginManager['registerCommand'](pluginData[_0x488b27(0x24c)],'AnimationPoint',_0x2a915d=>{const _0x4b3c97=_0x488b27;if(!SceneManager[_0x4b3c97(0x51f)])return;if(!SceneManager[_0x4b3c97(0x51f)][_0x4b3c97(0x724)])return;VisuMZ[_0x4b3c97(0x746)](_0x2a915d,_0x2a915d);const _0x58a4ac=Math[_0x4b3c97(0x4fd)](_0x2a915d['pointX']),_0x5b6d48=Math[_0x4b3c97(0x4fd)](_0x2a915d[_0x4b3c97(0x916)]);$gameTemp[_0x4b3c97(0x42e)](_0x58a4ac,_0x5b6d48,_0x2a915d['AnimationID'],_0x2a915d[_0x4b3c97(0x343)],_0x2a915d[_0x4b3c97(0x7d7)]);}),PluginManager['registerCommand'](pluginData['name'],'AudioChangeBgmVolume',_0x2df7c5=>{const _0xbcf93e=_0x488b27;VisuMZ[_0xbcf93e(0x746)](_0x2df7c5,_0x2df7c5);const _0x3d1862=Math[_0xbcf93e(0x4fd)](_0x2df7c5['volume'])[_0xbcf93e(0x424)](0x0,0x64),_0x37ad5f=AudioManager[_0xbcf93e(0x209)];_0x37ad5f&&(_0x37ad5f['volume']=_0x3d1862,_0x37ad5f['pos']=AudioManager[_0xbcf93e(0x843)][_0xbcf93e(0x35d)](),AudioManager['updateBgmParameters'](_0x37ad5f),AudioManager[_0xbcf93e(0x284)](_0x37ad5f,_0x37ad5f[_0xbcf93e(0x7b4)]),AudioManager['_bgmBuffer'][_0xbcf93e(0x536)](_0x37ad5f[_0xbcf93e(0x7b4)]));}),PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],'AudioChangeBgmPitch',_0x424227=>{const _0x252a1e=_0x488b27;VisuMZ['ConvertParams'](_0x424227,_0x424227);const _0x46402c=Math['round'](_0x424227[_0x252a1e(0x8d4)])[_0x252a1e(0x424)](0x32,0x96),_0x5d44ed=AudioManager['_currentBgm'];_0x5d44ed&&(_0x5d44ed[_0x252a1e(0x8d4)]=_0x46402c,_0x5d44ed[_0x252a1e(0x7b4)]=AudioManager['_bgmBuffer'][_0x252a1e(0x35d)](),AudioManager[_0x252a1e(0x3b7)](_0x5d44ed),AudioManager[_0x252a1e(0x284)](_0x5d44ed,_0x5d44ed[_0x252a1e(0x7b4)]),AudioManager[_0x252a1e(0x843)]['_startPlaying'](_0x5d44ed[_0x252a1e(0x7b4)]));}),PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],'AudioChangeBgmPan',_0x30d48f=>{const _0x369a95=_0x488b27;VisuMZ[_0x369a95(0x746)](_0x30d48f,_0x30d48f);const _0x582bb0=Math['round'](_0x30d48f[_0x369a95(0x65f)])['clamp'](-0x64,0x64),_0x2544de=AudioManager[_0x369a95(0x209)];_0x2544de&&(_0x2544de[_0x369a95(0x65f)]=_0x582bb0,_0x2544de[_0x369a95(0x7b4)]=AudioManager[_0x369a95(0x843)][_0x369a95(0x35d)](),AudioManager['updateBgmParameters'](_0x2544de),AudioManager[_0x369a95(0x284)](_0x2544de,_0x2544de[_0x369a95(0x7b4)]),AudioManager[_0x369a95(0x843)][_0x369a95(0x536)](_0x2544de[_0x369a95(0x7b4)]));}),PluginManager[_0x488b27(0x7e6)](pluginData['name'],_0x488b27(0x4d6),_0x3abc1d=>{const _0xd84f26=_0x488b27;VisuMZ['ConvertParams'](_0x3abc1d,_0x3abc1d);const _0x1c883c=Math['round'](_0x3abc1d[_0xd84f26(0x212)])[_0xd84f26(0x424)](0x0,0x64),_0x33274d=AudioManager[_0xd84f26(0x1e1)];_0x33274d&&(_0x33274d[_0xd84f26(0x212)]=_0x1c883c,_0x33274d[_0xd84f26(0x7b4)]=AudioManager['_bgsBuffer']['seek'](),AudioManager[_0xd84f26(0x714)](_0x33274d),AudioManager[_0xd84f26(0x69f)](_0x33274d,_0x33274d['pos']),AudioManager[_0xd84f26(0x33c)][_0xd84f26(0x536)](_0x33274d[_0xd84f26(0x7b4)]));}),PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],_0x488b27(0x353),_0x22eacf=>{const _0x5f54b4=_0x488b27;VisuMZ[_0x5f54b4(0x746)](_0x22eacf,_0x22eacf);const _0x45f265=Math[_0x5f54b4(0x4fd)](_0x22eacf[_0x5f54b4(0x8d4)])[_0x5f54b4(0x424)](0x32,0x96),_0x41b8c0=AudioManager[_0x5f54b4(0x1e1)];_0x41b8c0&&(_0x41b8c0[_0x5f54b4(0x8d4)]=_0x45f265,_0x41b8c0[_0x5f54b4(0x7b4)]=AudioManager[_0x5f54b4(0x33c)][_0x5f54b4(0x35d)](),AudioManager[_0x5f54b4(0x714)](_0x41b8c0),AudioManager[_0x5f54b4(0x69f)](_0x41b8c0,_0x41b8c0['pos']),AudioManager[_0x5f54b4(0x33c)][_0x5f54b4(0x536)](_0x41b8c0[_0x5f54b4(0x7b4)]));}),PluginManager[_0x488b27(0x7e6)](pluginData['name'],'AudioChangeBgsPan',_0x4bee30=>{const _0x102128=_0x488b27;VisuMZ['ConvertParams'](_0x4bee30,_0x4bee30);const _0x3497f2=Math[_0x102128(0x4fd)](_0x4bee30['pan'])[_0x102128(0x424)](-0x64,0x64),_0x103ed7=AudioManager['_currentBgs'];_0x103ed7&&(_0x103ed7[_0x102128(0x65f)]=_0x3497f2,_0x103ed7[_0x102128(0x7b4)]=AudioManager['_bgsBuffer']['seek'](),AudioManager[_0x102128(0x714)](_0x103ed7),AudioManager['playBgs'](_0x103ed7,_0x103ed7[_0x102128(0x7b4)]),AudioManager[_0x102128(0x33c)][_0x102128(0x536)](_0x103ed7[_0x102128(0x7b4)]));}),PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],_0x488b27(0x48b),_0x712e64=>{const _0x199ded=_0x488b27;if(!$gameTemp[_0x199ded(0x3ba)]())return;const _0x2261a5=Input['getLastUsedGamepadType']();console['log'](_0x2261a5);}),PluginManager['registerCommand'](pluginData[_0x488b27(0x24c)],_0x488b27(0x274),_0x408f47=>{const _0x36f8f8=_0x488b27;if(!$gameTemp[_0x36f8f8(0x3ba)]())return;if(!Utils['isNwjs']())return;SceneManager[_0x36f8f8(0x51f)]['_active']=![],VisuMZ[_0x36f8f8(0x96f)][_0x36f8f8(0x528)]();}),PluginManager['registerCommand'](pluginData[_0x488b27(0x24c)],_0x488b27(0x760),_0x394df7=>{const _0x2c9f88=_0x488b27;if(!$gameTemp[_0x2c9f88(0x3ba)]())return;if(!Utils['isNwjs']())return;SceneManager[_0x2c9f88(0x51f)][_0x2c9f88(0x45e)]=![],VisuMZ['CoreEngine'][_0x2c9f88(0x4fe)]();}),PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],_0x488b27(0x860),_0xa114a3=>{const _0x24b94d=_0x488b27;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x24b94d(0x8d5)]())return;if(!$gameMap)return;if($gameMap[_0x24b94d(0x89b)]()<=0x0)return;VisuMZ[_0x24b94d(0x746)](_0xa114a3,_0xa114a3);const _0x140fe8=_0x24b94d(0x7a3)[_0x24b94d(0x88c)]($gameMap[_0x24b94d(0x89b)]()['padZero'](0x3)),_0x2f8b4c=VisuMZ[_0x24b94d(0x96f)][_0x24b94d(0x57e)]($gameMap[_0x24b94d(0x89b)]());VisuMZ['CoreEngine'][_0x24b94d(0x20e)](_0x2f8b4c,_0x140fe8,!![]);}),PluginManager['registerCommand'](pluginData['name'],'ExportCurTroopText',_0x362ac3=>{const _0x2db590=_0x488b27;if(!$gameTemp[_0x2db590(0x3ba)]())return;if(!Utils['isNwjs']())return;if(!$gameParty[_0x2db590(0x68c)]())return;VisuMZ[_0x2db590(0x746)](_0x362ac3,_0x362ac3);const _0x54cd99=_0x2db590(0x750)['format']($gameTroop['_troopId'][_0x2db590(0x3b8)](0x4)),_0x2b087d=VisuMZ['CoreEngine'][_0x2db590(0x26b)]($gameTroop['_troopId']);VisuMZ[_0x2db590(0x96f)][_0x2db590(0x20e)](_0x2b087d,_0x54cd99,!![]);}),VisuMZ[_0x488b27(0x96f)]['ExportString']=function(_0x8071ef,_0x4c3b7c,_0x4302d6){const _0x5b33b8=_0x488b27,_0x216f03=require('fs');let _0xf15f5e=_0x5b33b8(0x82b)[_0x5b33b8(0x88c)](_0x4c3b7c||'0');_0x216f03[_0x5b33b8(0x85e)](_0xf15f5e,_0x8071ef,_0x2227af=>{const _0x4dbd6a=_0x5b33b8;if(_0x2227af)throw err;else _0x4302d6&&alert('Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.'[_0x4dbd6a(0x88c)](_0xf15f5e));});},VisuMZ['CoreEngine'][_0x488b27(0x528)]=function(){const _0xc411b5=_0x488b27,_0x1b96ad=[];for(const _0x2ae6aa of $dataMapInfos){if(!_0x2ae6aa)continue;_0x1b96ad['push'](_0x2ae6aa['id']);}const _0x5940c7=_0x1b96ad[_0xc411b5(0x998)]*0x64+Math['randomInt'](0x64);alert(_0xc411b5(0x341)['format'](_0x5940c7)),this['_storedMapText']=[],this[_0xc411b5(0x8b4)]=$dataMap;for(const _0x4a5513 of _0x1b96ad){VisuMZ['CoreEngine']['loadMapData'](_0x4a5513);}setTimeout(VisuMZ['CoreEngine'][_0xc411b5(0x70c)]['bind'](this),_0x5940c7);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x348)]=function(_0xc9359e){const _0x26f054=_0x488b27,_0xd90d1c=_0x26f054(0x2e0)['format'](_0xc9359e['padZero'](0x3)),_0x52c8af=new XMLHttpRequest(),_0x1eb407=_0x26f054(0x89e)+_0xd90d1c;_0x52c8af[_0x26f054(0x35e)](_0x26f054(0x8de),_0x1eb407),_0x52c8af[_0x26f054(0x884)](_0x26f054(0x62d)),_0x52c8af[_0x26f054(0x2bc)]=()=>this['storeMapData'](_0x52c8af,_0xc9359e,_0xd90d1c,_0x1eb407),_0x52c8af['onerror']=()=>DataManager[_0x26f054(0x597)](_0x26f054(0x56a),_0xd90d1c,_0x1eb407),_0x52c8af[_0x26f054(0x896)]();},VisuMZ[_0x488b27(0x96f)]['storeMapData']=function(_0x54c81b,_0x3f66aa,_0x4eb350,_0x37494b){const _0x219f47=_0x488b27;$dataMap=JSON[_0x219f47(0x971)](_0x54c81b[_0x219f47(0x5ab)]),DataManager['onLoad']($dataMap),this['_storedMapText'][_0x3f66aa]=VisuMZ['CoreEngine'][_0x219f47(0x57e)](_0x3f66aa),$dataMap=this['_currentMap'];},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x70c)]=function(){const _0xde5f4f=_0x488b27,_0x41f17e=_0xde5f4f(0x700);this[_0xde5f4f(0x5ac)][_0xde5f4f(0x6fb)](undefined)[_0xde5f4f(0x6fb)]('')[_0xde5f4f(0x6fb)](null);const _0xd837d5=this[_0xde5f4f(0x5ac)][_0xde5f4f(0x80b)]('\x0a\x0a\x0a\x0a\x0a')['trim']();VisuMZ['CoreEngine']['ExportString'](_0xd837d5,_0x41f17e,!![]),SceneManager['_scene'][_0xde5f4f(0x45e)]=!![];},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x57e)]=function(_0x40690a){const _0x21f81e=_0x488b27;if(!$dataMap)return'';let _0x35f2ca='█'['repeat'](0x46)+'\x0a\x0a',_0x4fed3b='═'[_0x21f81e(0x6b4)](0x46)+'\x0a\x0a',_0x44e2b1='';this['_commonEventLayers']=0x0;for(const _0x34f4c2 of $dataMap[_0x21f81e(0x6da)]){if(!_0x34f4c2)continue;let _0x14ee82=_0x34f4c2['id'],_0x24352e=_0x34f4c2[_0x21f81e(0x24c)],_0x38837c=_0x34f4c2[_0x21f81e(0x636)];for(const _0x14d7bd of _0x38837c){const _0x45b2f6=_0x38837c[_0x21f81e(0x53d)](_0x14d7bd)+0x1;let _0x2b2d4c=_0x4fed3b+_0x21f81e(0x416),_0x4a9046=VisuMZ[_0x21f81e(0x96f)][_0x21f81e(0x38c)](_0x14d7bd[_0x21f81e(0x2d3)]);if(_0x4a9046[_0x21f81e(0x998)]>0x0){if(_0x44e2b1[_0x21f81e(0x998)]>0x0)_0x44e2b1+=_0x4fed3b+_0x21f81e(0x6cd);else{const _0x3d16c7=$dataMapInfos[_0x40690a][_0x21f81e(0x24c)];_0x44e2b1+=_0x35f2ca+_0x21f81e(0x978)['format'](_0x40690a,_0x3d16c7||_0x21f81e(0x6cc))+_0x35f2ca;}_0x44e2b1+=_0x2b2d4c[_0x21f81e(0x88c)](_0x14ee82,_0x24352e,_0x45b2f6,_0x4a9046);}}}return _0x44e2b1[_0x21f81e(0x998)]>0x0&&(_0x44e2b1+=_0x4fed3b),_0x44e2b1;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x4fe)]=function(){const _0x4460e8=_0x488b27,_0x45876e=$dataTroops[_0x4460e8(0x998)]*0xa+Math['randomInt'](0xa);alert(_0x4460e8(0x97b)[_0x4460e8(0x88c)](_0x45876e));const _0x4689fa=[];for(const _0x26b1a0 of $dataTroops){if(!_0x26b1a0)continue;const _0x5bb4f3=_0x26b1a0['id'];_0x4689fa[_0x5bb4f3]=VisuMZ[_0x4460e8(0x96f)][_0x4460e8(0x26b)](_0x5bb4f3);}setTimeout(VisuMZ[_0x4460e8(0x96f)][_0x4460e8(0x862)]['bind'](this,_0x4689fa),_0x45876e);},VisuMZ[_0x488b27(0x96f)]['ExtractStrFromTroop']=function(_0x13e0a5){const _0x2e38a9=_0x488b27;if(!$dataTroops[_0x13e0a5])return'';let _0x2e35f2='█'['repeat'](0x46)+'\x0a\x0a',_0x4f793c='═'['repeat'](0x46)+'\x0a\x0a',_0x10f2f9='';this[_0x2e38a9(0x3d9)]=0x0;const _0x4b03df=$dataTroops[_0x13e0a5];let _0x138c6f=_0x4b03df['pages'];for(const _0x57abfa of _0x138c6f){const _0x15aa68=_0x138c6f[_0x2e38a9(0x53d)](_0x57abfa)+0x1;let _0x5423a6=_0x4f793c+_0x2e38a9(0x6d6),_0x1dae80=VisuMZ[_0x2e38a9(0x96f)]['ExtractStrFromList'](_0x57abfa['list']);_0x1dae80[_0x2e38a9(0x998)]>0x0&&(_0x10f2f9[_0x2e38a9(0x998)]>0x0?_0x10f2f9+=_0x4f793c+'\x0a\x0a\x0a\x0a\x0a':_0x10f2f9+=_0x2e35f2+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'['format'](_0x13e0a5,_0x4b03df[_0x2e38a9(0x24c)]||_0x2e38a9(0x6cc))+_0x2e35f2,_0x10f2f9+=_0x5423a6['format'](_0x15aa68,_0x1dae80));}return _0x10f2f9[_0x2e38a9(0x998)]>0x0&&(_0x10f2f9+=_0x4f793c),_0x10f2f9;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x862)]=function(_0x10b757){const _0x2ed8d9=_0x488b27,_0x10ac02=_0x2ed8d9(0x53b);_0x10b757['remove'](undefined)['remove']('')[_0x2ed8d9(0x6fb)](null);const _0x11effc=_0x10b757[_0x2ed8d9(0x80b)](_0x2ed8d9(0x6cd))[_0x2ed8d9(0x667)]();VisuMZ[_0x2ed8d9(0x96f)]['ExportString'](_0x11effc,_0x10ac02,!![]),SceneManager[_0x2ed8d9(0x51f)][_0x2ed8d9(0x45e)]=!![];},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x38c)]=function(_0x4ec9fa){const _0x2c776c=_0x488b27;let _0x3d8090='\x0a'+'─'[_0x2c776c(0x6b4)](0x46)+'\x0a',_0x201316='\x0a'+'┄'['repeat'](0x46)+'\x0a',_0x4fe6fc='';for(const _0x4b216e of _0x4ec9fa){if(!_0x4b216e)continue;if(_0x4b216e[_0x2c776c(0x789)]===0x65)_0x4fe6fc+=_0x3d8090+'\x0a',_0x4fe6fc+=_0x2c776c(0x3ae),_0x4b216e[_0x2c776c(0x3bb)][0x4]!==''&&_0x4b216e[_0x2c776c(0x3bb)][0x4]!==undefined&&(_0x4fe6fc+=_0x2c776c(0x4ad)[_0x2c776c(0x88c)](_0x4b216e['parameters'][0x4]));else{if(_0x4b216e[_0x2c776c(0x789)]===0x191)_0x4fe6fc+=_0x2c776c(0x90f)[_0x2c776c(0x88c)](_0x4b216e[_0x2c776c(0x3bb)][0x0]);else{if(_0x4b216e['code']===0x192)_0x4fe6fc+=_0x3d8090,_0x4fe6fc+=_0x2c776c(0x695)['format'](_0x201316,_0x4b216e[_0x2c776c(0x3bb)][0x0]+0x1,_0x4b216e['parameters'][0x1]);else{if(_0x4b216e[_0x2c776c(0x789)]===0x193)_0x4fe6fc+=_0x3d8090,_0x4fe6fc+=_0x2c776c(0x682)[_0x2c776c(0x88c)](_0x201316);else{if(_0x4b216e[_0x2c776c(0x789)]===0x194)_0x4fe6fc+=_0x3d8090,_0x4fe6fc+=_0x2c776c(0x739)[_0x2c776c(0x88c)](_0x201316);else{if(_0x4b216e[_0x2c776c(0x789)]===0x69)_0x4fe6fc+=_0x3d8090+'\x0a',_0x4fe6fc+=_0x2c776c(0x2dc);else{if(_0x4b216e[_0x2c776c(0x789)]===0x6c)_0x4fe6fc+=_0x3d8090+'\x0a',_0x4fe6fc+=_0x2c776c(0x583)['format'](_0x4b216e[_0x2c776c(0x3bb)][0x0]);else{if(_0x4b216e[_0x2c776c(0x789)]===0x198)_0x4fe6fc+='%1\x0a'[_0x2c776c(0x88c)](_0x4b216e[_0x2c776c(0x3bb)][0x0]);else{if(_0x4b216e[_0x2c776c(0x789)]===0x75){const _0x45b847=$dataCommonEvents[_0x4b216e['parameters'][0x0]];if(_0x45b847&&this[_0x2c776c(0x3d9)]<=0xa){this[_0x2c776c(0x3d9)]++;let _0x2e8e12=VisuMZ['CoreEngine'][_0x2c776c(0x38c)](_0x45b847['list']);_0x2e8e12[_0x2c776c(0x998)]>0x0&&(_0x4fe6fc+=_0x3d8090,_0x4fe6fc+=_0x201316,_0x4fe6fc+=_0x2c776c(0x582)['format'](_0x45b847['id'],_0x45b847[_0x2c776c(0x24c)]),_0x4fe6fc+=_0x201316,_0x4fe6fc+=_0x2e8e12,_0x4fe6fc+=_0x201316,_0x4fe6fc+=_0x2c776c(0x46d)['format'](_0x45b847['id'],_0x45b847['name']),_0x4fe6fc+=_0x201316),this[_0x2c776c(0x3d9)]--;}}}}}}}}}}}return _0x4fe6fc[_0x2c776c(0x998)]>0x0&&(_0x4fe6fc+=_0x3d8090),_0x4fe6fc;},PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],_0x488b27(0x1c8),_0x1a0e42=>{const _0x6dcb12=_0x488b27;VisuMZ[_0x6dcb12(0x746)](_0x1a0e42,_0x1a0e42);const _0x47a385=_0x1a0e42[_0x6dcb12(0x85a)];VisuMZ[_0x6dcb12(0x987)](_0x47a385);}),PluginManager[_0x488b27(0x7e6)](pluginData['name'],_0x488b27(0x4f1),_0x1aab09=>{const _0x5cafe5=_0x488b27;VisuMZ['ConvertParams'](_0x1aab09,_0x1aab09);const _0x5ad808=_0x1aab09['value']||0x0;$gameParty[_0x5cafe5(0x8e3)](_0x5ad808);}),PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],'MapOnceParallel',_0x5cfb92=>{const _0x353350=_0x488b27;if(!SceneManager[_0x353350(0x69a)]())return;VisuMZ['ConvertParams'](_0x5cfb92,_0x5cfb92);const _0x3072c7=_0x5cfb92[_0x353350(0x45f)];SceneManager['_scene'][_0x353350(0x4fb)](_0x3072c7);}),PluginManager['registerCommand'](pluginData[_0x488b27(0x24c)],_0x488b27(0x8e0),_0x29a4d5=>{const _0x5a1940=_0x488b27;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x5a1940(0x8d5)]())return;VisuMZ[_0x5a1940(0x746)](_0x29a4d5,_0x29a4d5);const _0x444b3c=_0x29a4d5[_0x5a1940(0x888)]||0x1;$gameTemp[_0x5a1940(0x4cf)]=_0x444b3c;}),PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],'PictureEasingType',_0x11c1d1=>{const _0x5d50bf=_0x488b27;VisuMZ[_0x5d50bf(0x746)](_0x11c1d1,_0x11c1d1);const _0x33e1f8=_0x11c1d1[_0x5d50bf(0x3a5)]||0x1,_0x2cfcac=_0x11c1d1[_0x5d50bf(0x29f)]||_0x5d50bf(0x781),_0x43583c=$gameScreen['picture'](_0x33e1f8);_0x43583c&&_0x43583c[_0x5d50bf(0x33b)](_0x2cfcac);}),PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],'PictureEraseAll',_0xf63d65=>{const _0x426dfc=_0x488b27;for(let _0xe4db51=0x1;_0xe4db51<=0x64;_0xe4db51++){$gameScreen[_0x426dfc(0x1e7)](_0xe4db51);}}),PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],_0x488b27(0x8c0),_0x1f471f=>{const _0x263ce6=_0x488b27;VisuMZ[_0x263ce6(0x746)](_0x1f471f,_0x1f471f);const _0x4ec483=Math['min'](_0x1f471f[_0x263ce6(0x7a1)],_0x1f471f[_0x263ce6(0x445)]),_0x435ce3=Math[_0x263ce6(0x3c0)](_0x1f471f[_0x263ce6(0x7a1)],_0x1f471f[_0x263ce6(0x445)]);for(let _0x531be9=_0x4ec483;_0x531be9<=_0x435ce3;_0x531be9++){$gameScreen['erasePicture'](_0x531be9);}}),PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],'PictureRotateBy',_0x35c025=>{const _0x101bf5=_0x488b27;VisuMZ['ConvertParams'](_0x35c025,_0x35c025);const _0x3a8d9e=Math[_0x101bf5(0x4fd)](_0x35c025['PictureID'])[_0x101bf5(0x424)](0x1,0x64),_0x1fe515=-Number(_0x35c025['AdjustAngle']||0x0),_0x32a935=Math[_0x101bf5(0x3c0)](_0x35c025['Duration']||0x0,0x0),_0x93a157=_0x35c025['easingType']||_0x101bf5(0x781),_0x31c435=_0x35c025[_0x101bf5(0x73f)],_0x44bcd5=$gameScreen[_0x101bf5(0x795)](_0x3a8d9e);if(!_0x44bcd5)return;_0x44bcd5[_0x101bf5(0x3fd)](_0x1fe515,_0x32a935,_0x93a157);if(_0x31c435){const _0x17fb49=$gameTemp[_0x101bf5(0x935)]();if(_0x17fb49)_0x17fb49['wait'](_0x32a935);}}),PluginManager['registerCommand'](pluginData[_0x488b27(0x24c)],_0x488b27(0x288),_0x24f2dc=>{const _0x268d59=_0x488b27;VisuMZ[_0x268d59(0x746)](_0x24f2dc,_0x24f2dc);const _0x5d3f69=Math[_0x268d59(0x4fd)](_0x24f2dc[_0x268d59(0x888)])['clamp'](0x1,0x64),_0x58dced=-Number(_0x24f2dc[_0x268d59(0x7d3)]||0x0),_0x1554e4=Math[_0x268d59(0x3c0)](_0x24f2dc['Duration']||0x0,0x0),_0x5395bb=_0x24f2dc['easingType']||_0x268d59(0x781),_0x2b7685=_0x24f2dc[_0x268d59(0x73f)],_0x4a6723=$gameScreen[_0x268d59(0x795)](_0x5d3f69);if(!_0x4a6723)return;_0x4a6723[_0x268d59(0x431)](_0x58dced,_0x1554e4,_0x5395bb);if(_0x2b7685){const _0x2a432c=$gameTemp[_0x268d59(0x935)]();if(_0x2a432c)_0x2a432c['wait'](_0x1554e4);}}),PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],_0x488b27(0x8e2),_0x1f732a=>{const _0x5e07e1=_0x488b27;VisuMZ[_0x5e07e1(0x746)](_0x1f732a,_0x1f732a);const _0x561667=Math[_0x5e07e1(0x4fd)](_0x1f732a[_0x5e07e1(0x888)])[_0x5e07e1(0x424)](0x1,0x64),_0x54a1b1=_0x1f732a[_0x5e07e1(0x2f0)],_0x5629eb=_0x54a1b1[_0x5e07e1(0x666)]['clamp'](0x0,0x1),_0x16cdc7=Math[_0x5e07e1(0x4fd)](_0x54a1b1[_0x5e07e1(0x4a3)]||0x0),_0x3a5221=Math[_0x5e07e1(0x4fd)](_0x54a1b1[_0x5e07e1(0x6ac)]||0x0),_0x2d90a7=Math[_0x5e07e1(0x4fd)](_0x54a1b1[_0x5e07e1(0x49c)]||0x0),_0x565ecc=Math[_0x5e07e1(0x4fd)](_0x54a1b1[_0x5e07e1(0x370)]||0x0),_0x4c6daa=Math[_0x5e07e1(0x4fd)](_0x54a1b1[_0x5e07e1(0x852)])[_0x5e07e1(0x424)](0x0,0xff),_0x24ef68=_0x54a1b1[_0x5e07e1(0x2a7)],_0x5000b7=_0x5e07e1(0x588),_0x4f95f8=_0x1f732a['Smooth']?_0x5e07e1(0x70f):'Pixelated',_0x17eb53=_0x5000b7['format'](_0x1f732a[_0x5e07e1(0x86e)],_0x4f95f8);$gameScreen[_0x5e07e1(0x8ed)](_0x561667,_0x17eb53,_0x5629eb,_0x16cdc7,_0x3a5221,_0x2d90a7,_0x565ecc,_0x4c6daa,_0x24ef68);}),PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],'ScreenShake',_0x3cf392=>{const _0x4462e6=_0x488b27;VisuMZ[_0x4462e6(0x746)](_0x3cf392,_0x3cf392);const _0x40abfb=_0x3cf392['Type']||_0x4462e6(0x54b),_0xbe2ed8=_0x3cf392[_0x4462e6(0x283)][_0x4462e6(0x424)](0x1,0x9),_0x283fc0=_0x3cf392[_0x4462e6(0x728)][_0x4462e6(0x424)](0x1,0x9),_0x2e93bf=_0x3cf392[_0x4462e6(0x793)]||0x1,_0x2225e7=_0x3cf392[_0x4462e6(0x73f)];$gameScreen[_0x4462e6(0x452)](_0x40abfb),$gameScreen['startShake'](_0xbe2ed8,_0x283fc0,_0x2e93bf);if(_0x2225e7){const _0xe69336=$gameTemp[_0x4462e6(0x935)]();if(_0xe69336)_0xe69336[_0x4462e6(0x32b)](_0x2e93bf);}}),PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],_0x488b27(0x848),_0x4fcac8=>{const _0x11a922=_0x488b27;if($gameParty['inBattle']())return;VisuMZ[_0x11a922(0x746)](_0x4fcac8,_0x4fcac8);const _0x3553e0=_0x4fcac8[_0x11a922(0x1ee)],_0xead21=(_0x4fcac8[_0x11a922(0x7d9)]||0x0)/0x64;for(const _0x4abeb3 of _0x3553e0){const _0x2fcda2=Math['random']()<=_0xead21;$gameSwitches[_0x11a922(0x2bb)](_0x4abeb3,_0x2fcda2);}}),PluginManager[_0x488b27(0x7e6)](pluginData['name'],'SwitchRandomizeRange',_0x499c62=>{const _0x295373=_0x488b27;if($gameParty[_0x295373(0x68c)]())return;VisuMZ[_0x295373(0x746)](_0x499c62,_0x499c62);const _0xb44a22=Math[_0x295373(0x3bd)](_0x499c62[_0x295373(0x7a1)],_0x499c62[_0x295373(0x445)]),_0x3bf791=Math[_0x295373(0x3c0)](_0x499c62[_0x295373(0x7a1)],_0x499c62['EndingID']),_0x549757=(_0x499c62['Chance']||0x0)/0x64;for(let _0x5cce31=_0xb44a22;_0x5cce31<=_0x3bf791;_0x5cce31++){const _0x54d108=Math['random']()<=_0x549757;$gameSwitches[_0x295373(0x2bb)](_0x5cce31,_0x54d108);}}),PluginManager['registerCommand'](pluginData[_0x488b27(0x24c)],_0x488b27(0x7ac),_0x4ddc45=>{const _0xd772e4=_0x488b27;if($gameParty['inBattle']())return;VisuMZ[_0xd772e4(0x746)](_0x4ddc45,_0x4ddc45);const _0x54fff1=_0x4ddc45['IDs'];for(const _0x3f6de5 of _0x54fff1){const _0x144d8b=$gameSwitches['value'](_0x3f6de5);$gameSwitches[_0xd772e4(0x2bb)](_0x3f6de5,!_0x144d8b);}}),PluginManager[_0x488b27(0x7e6)](pluginData['name'],_0x488b27(0x7bf),_0x2d3d34=>{const _0x498677=_0x488b27;if($gameParty[_0x498677(0x68c)]())return;VisuMZ[_0x498677(0x746)](_0x2d3d34,_0x2d3d34);const _0x58410a=Math[_0x498677(0x3bd)](_0x2d3d34[_0x498677(0x7a1)],_0x2d3d34['EndingID']),_0x3cf2aa=Math[_0x498677(0x3c0)](_0x2d3d34[_0x498677(0x7a1)],_0x2d3d34['EndingID']);for(let _0x1030f0=_0x58410a;_0x1030f0<=_0x3cf2aa;_0x1030f0++){const _0x2f0ccd=$gameSwitches[_0x498677(0x8e5)](_0x1030f0);$gameSwitches[_0x498677(0x2bb)](_0x1030f0,!_0x2f0ccd);}}),PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],_0x488b27(0x91f),_0x125322=>{const _0x2c4d0c=_0x488b27;VisuMZ[_0x2c4d0c(0x746)](_0x125322,_0x125322);const _0x10f2a7=_0x125322[_0x2c4d0c(0x389)]||0x1;$gameSystem[_0x2c4d0c(0x5b7)](_0x10f2a7);}),PluginManager['registerCommand'](pluginData[_0x488b27(0x24c)],_0x488b27(0x906),_0x1a7e2b=>{const _0x2b3908=_0x488b27;if($gameParty[_0x2b3908(0x68c)]())return;VisuMZ[_0x2b3908(0x746)](_0x1a7e2b,_0x1a7e2b);const _0x44e5d5=_0x1a7e2b[_0x2b3908(0x389)];if(_0x44e5d5[_0x2b3908(0x426)](/Front/i))$gameSystem[_0x2b3908(0x98b)](![]);else _0x44e5d5['match'](/Side/i)?$gameSystem['setSideView'](!![]):$gameSystem[_0x2b3908(0x98b)](!$gameSystem[_0x2b3908(0x3b9)]());}),PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],'SystemLoadAudio',_0x51375b=>{const _0x489873=_0x488b27;if($gameParty['inBattle']())return;VisuMZ[_0x489873(0x746)](_0x51375b,_0x51375b);const _0x2ddf0d=[_0x489873(0x3c8),_0x489873(0x6fe),'me','se'];for(const _0x27dac3 of _0x2ddf0d){const _0x105a15=_0x51375b[_0x27dac3],_0x35820f=_0x489873(0x50c)[_0x489873(0x88c)](_0x27dac3);for(const _0x3db51e of _0x105a15){AudioManager[_0x489873(0x39d)](_0x35820f,_0x3db51e);}}}),PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],_0x488b27(0x202),_0x17490b=>{const _0x39d87e=_0x488b27;if($gameParty[_0x39d87e(0x68c)]())return;VisuMZ[_0x39d87e(0x746)](_0x17490b,_0x17490b);const _0x51ba01=['animations',_0x39d87e(0x637),_0x39d87e(0x4c4),_0x39d87e(0x8d0),'enemies',_0x39d87e(0x472),_0x39d87e(0x474),_0x39d87e(0x527),_0x39d87e(0x2e3),'sv_enemies',_0x39d87e(0x333),_0x39d87e(0x1f9),_0x39d87e(0x3c2),'titles2'];for(const _0x5bf31f of _0x51ba01){const _0x59deb6=_0x17490b[_0x5bf31f],_0x20be2f='img/%1/'['format'](_0x5bf31f);for(const _0x14685a of _0x59deb6){ImageManager['loadBitmap'](_0x20be2f,_0x14685a);}}}),PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],_0x488b27(0x6e7),_0x41a8c5=>{const _0x501d8d=_0x488b27;if($gameParty[_0x501d8d(0x68c)]())return;VisuMZ[_0x501d8d(0x746)](_0x41a8c5,_0x41a8c5);const _0x56243d=_0x41a8c5[_0x501d8d(0x389)][_0x501d8d(0x991)]()[_0x501d8d(0x667)](),_0x3ca242=VisuMZ[_0x501d8d(0x96f)][_0x501d8d(0x1d8)](_0x56243d);$gameSystem[_0x501d8d(0x2ab)](_0x3ca242);}),VisuMZ[_0x488b27(0x96f)][_0x488b27(0x1d8)]=function(_0x845ebd){const _0x4c92bf=_0x488b27;_0x845ebd=_0x845ebd||_0x4c92bf(0x401),_0x845ebd=String(_0x845ebd)[_0x4c92bf(0x991)]()[_0x4c92bf(0x667)]();switch(_0x845ebd){case'DTB':return 0x0;case _0x4c92bf(0x2e4):Imported['VisuMZ_1_OptionsCore']&&(ConfigManager['atbActive']=!![]);return 0x1;case _0x4c92bf(0x578):Imported[_0x4c92bf(0x6d2)]&&(ConfigManager[_0x4c92bf(0x4d2)]=![]);return 0x2;case _0x4c92bf(0x47f):if(Imported['VisuMZ_2_BattleSystemCTB'])return _0x4c92bf(0x47f);break;case _0x4c92bf(0x6df):if(Imported[_0x4c92bf(0x307)])return _0x4c92bf(0x6df);break;case _0x4c92bf(0x379):if(Imported['VisuMZ_2_BattleSystemBTB'])return _0x4c92bf(0x379);break;case _0x4c92bf(0x864):if(Imported['VisuMZ_2_BattleSystemFTB'])return _0x4c92bf(0x864);break;case _0x4c92bf(0x2e6):if(Imported[_0x4c92bf(0x2ac)])return _0x4c92bf(0x2e6);break;case _0x4c92bf(0x85f):if(Imported[_0x4c92bf(0x2ba)])return _0x4c92bf(0x85f);break;case _0x4c92bf(0x947):if(Imported['VisuMZ_2_BattleSystemPTB'])return'PTB';break;}return $dataSystem[_0x4c92bf(0x853)];},PluginManager['registerCommand'](pluginData[_0x488b27(0x24c)],'SystemSetWindowPadding',_0x1cb7b6=>{const _0x5ebd48=_0x488b27;VisuMZ[_0x5ebd48(0x746)](_0x1cb7b6,_0x1cb7b6);const _0x311045=_0x1cb7b6[_0x5ebd48(0x389)]||0x1;$gameSystem[_0x5ebd48(0x61b)](_0x311045);}),PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],_0x488b27(0x532),_0x298d8=>{const _0x2d489e=_0x488b27;VisuMZ[_0x2d489e(0x746)](_0x298d8,_0x298d8);const _0x4f8830=_0x298d8['text']||'';$textPopup(_0x4f8830);}),PluginManager[_0x488b27(0x7e6)](pluginData['name'],_0x488b27(0x428),_0x2faa7c=>{const _0x3570cc=_0x488b27;VisuMZ[_0x3570cc(0x746)](_0x2faa7c,_0x2faa7c);const _0x211d01=_0x2faa7c['id']||0x1,_0x1fdb8c=_0x2faa7c[_0x3570cc(0x697)],_0x18f8ad=_0x2faa7c[_0x3570cc(0x84d)]||0x0;let _0x1cad13=$gameVariables[_0x3570cc(0x8e5)](_0x211d01)||0x0;switch(_0x1fdb8c){case'=':_0x1cad13=_0x18f8ad;break;case'+':_0x1cad13+=_0x18f8ad;break;case'-':_0x1cad13-=_0x18f8ad;break;case'*':_0x1cad13*=_0x18f8ad;break;case'/':_0x1cad13/=_0x18f8ad;break;case'%':_0x1cad13%=_0x18f8ad;break;}_0x1cad13=_0x1cad13||0x0,$gameVariables[_0x3570cc(0x2bb)](_0x211d01,_0x1cad13);}),PluginManager[_0x488b27(0x7e6)](pluginData[_0x488b27(0x24c)],_0x488b27(0x504),_0x57ed11=>{const _0x4613c7=_0x488b27;VisuMZ['ConvertParams'](_0x57ed11,_0x57ed11);const _0xb0f910=_0x57ed11['id']()||0x1,_0xabf950=_0x57ed11[_0x4613c7(0x697)],_0x61b6c6=_0x57ed11[_0x4613c7(0x84d)]()||0x0;let _0x498048=$gameVariables[_0x4613c7(0x8e5)](_0xb0f910)||0x0;switch(_0xabf950){case'=':_0x498048=_0x61b6c6;break;case'+':_0x498048+=_0x61b6c6;break;case'-':_0x498048-=_0x61b6c6;break;case'*':_0x498048*=_0x61b6c6;break;case'/':_0x498048/=_0x61b6c6;break;case'%':_0x498048%=_0x61b6c6;break;}_0x498048=_0x498048||0x0,$gameVariables['setValue'](_0xb0f910,_0x498048);}),VisuMZ[_0x488b27(0x96f)][_0x488b27(0x911)]=Scene_Boot[_0x488b27(0x523)][_0x488b27(0x82a)],Scene_Boot[_0x488b27(0x523)]['onDatabaseLoaded']=function(){const _0x47bb5b=_0x488b27;VisuMZ[_0x47bb5b(0x96f)]['Scene_Boot_onDatabaseLoaded'][_0x47bb5b(0x1dc)](this),this[_0x47bb5b(0x7d0)](),this[_0x47bb5b(0x64f)](),this[_0x47bb5b(0x8f8)](),this[_0x47bb5b(0x985)](),this[_0x47bb5b(0x22c)](),this[_0x47bb5b(0x533)](),VisuMZ['ParseAllNotetags']();},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x3f1)]={},Scene_Boot['prototype'][_0x488b27(0x7d0)]=function(){const _0x333d64=_0x488b27,_0x1660b3=[_0x333d64(0x752),'MAXMP','ATK',_0x333d64(0x30c),_0x333d64(0x380),_0x333d64(0x7f8),_0x333d64(0x7ec),_0x333d64(0x54d)],_0x2f5d5f=['HIT',_0x333d64(0x933),_0x333d64(0x57f),_0x333d64(0x8c6),'MEV',_0x333d64(0x6c6),_0x333d64(0x66b),_0x333d64(0x8d8),_0x333d64(0x383),_0x333d64(0x282)],_0x3b2481=['TGR',_0x333d64(0x7c6),'REC',_0x333d64(0x31b),_0x333d64(0x254),_0x333d64(0x460),_0x333d64(0x932),_0x333d64(0x722),_0x333d64(0x93f),_0x333d64(0x260)],_0x3032dc=[_0x1660b3,_0x2f5d5f,_0x3b2481],_0x40ad18=[_0x333d64(0x4a6),_0x333d64(0x371),_0x333d64(0x641),'Max',_0x333d64(0x3c4),_0x333d64(0x653),'Rate2',_0x333d64(0x2fc),_0x333d64(0x54a),_0x333d64(0x53a)];for(const _0x206aa2 of _0x3032dc){let _0x3cb310='';if(_0x206aa2===_0x1660b3)_0x3cb310=_0x333d64(0x707);if(_0x206aa2===_0x2f5d5f)_0x3cb310=_0x333d64(0x6d0);if(_0x206aa2===_0x3b2481)_0x3cb310=_0x333d64(0x402);for(const _0x584096 of _0x40ad18){let _0x413e22=_0x333d64(0x5e7)['format'](_0x3cb310,_0x584096);VisuMZ[_0x333d64(0x96f)][_0x333d64(0x3f1)][_0x413e22]=[],VisuMZ[_0x333d64(0x96f)]['RegExp'][_0x413e22+'JS']=[];let _0x91f783=_0x333d64(0x835);if(['Plus',_0x333d64(0x2fc)][_0x333d64(0x5f8)](_0x584096))_0x91f783+=_0x333d64(0x464);else{if(['Plus1',_0x333d64(0x54a)][_0x333d64(0x5f8)](_0x584096))_0x91f783+=_0x333d64(0x561);else{if([_0x333d64(0x641),_0x333d64(0x53a)][_0x333d64(0x5f8)](_0x584096))_0x91f783+=_0x333d64(0x446);else{if(_0x584096===_0x333d64(0x29d))_0x91f783+=_0x333d64(0x44d);else{if(_0x584096===_0x333d64(0x653))_0x91f783+='(\x5cd+)([%％])>';else _0x584096===_0x333d64(0x5ae)&&(_0x91f783+='(\x5cd+\x5c.?\x5cd+)>');}}}}for(const _0x4e126a of _0x206aa2){let _0x1b7d24=_0x584096[_0x333d64(0x422)](/[\d+]/g,'')['toUpperCase']();const _0x4ecb9d=_0x91f783[_0x333d64(0x88c)](_0x4e126a,_0x1b7d24);VisuMZ['CoreEngine'][_0x333d64(0x3f1)][_0x413e22][_0x333d64(0x64c)](new RegExp(_0x4ecb9d,'i'));const _0x38c8be=_0x333d64(0x5f0)['format'](_0x4e126a,_0x1b7d24);VisuMZ[_0x333d64(0x96f)][_0x333d64(0x3f1)][_0x413e22+'JS'][_0x333d64(0x64c)](new RegExp(_0x38c8be,'i'));}}}},Scene_Boot[_0x488b27(0x523)][_0x488b27(0x64f)]=function(){const _0x536cb9=_0x488b27;if(VisuMZ[_0x536cb9(0x977)])return;},Scene_Boot[_0x488b27(0x523)]['process_VisuMZ_CoreEngine_Settings']=function(){const _0x17d194=_0x488b27,_0x5ecf8a=VisuMZ[_0x17d194(0x96f)][_0x17d194(0x2f0)];_0x5ecf8a[_0x17d194(0x59f)][_0x17d194(0x3a4)]&&VisuMZ[_0x17d194(0x557)](!![]);_0x5ecf8a['QoL'][_0x17d194(0x792)]&&(Input[_0x17d194(0x970)][0x23]=_0x17d194(0x420),Input[_0x17d194(0x970)][0x24]=_0x17d194(0x8fe));if(_0x5ecf8a[_0x17d194(0x988)]){const _0x307cd2=_0x5ecf8a['ButtonAssist'];_0x307cd2[_0x17d194(0x36b)]=_0x307cd2[_0x17d194(0x36b)]||_0x17d194(0x2e7),_0x307cd2[_0x17d194(0x41a)]=_0x307cd2[_0x17d194(0x41a)]||_0x17d194(0x93b);}_0x5ecf8a[_0x17d194(0x601)][_0x17d194(0x903)]&&(Input[_0x17d194(0x970)][0x57]='up',Input[_0x17d194(0x970)][0x41]=_0x17d194(0x960),Input['keyMapper'][0x53]='down',Input['keyMapper'][0x44]='right',Input[_0x17d194(0x970)][0x45]=_0x17d194(0x93d)),_0x5ecf8a[_0x17d194(0x601)][_0x17d194(0x599)]&&(Input[_0x17d194(0x970)][0x52]='dashToggle'),_0x5ecf8a[_0x17d194(0x945)][_0x17d194(0x2e9)]=_0x5ecf8a[_0x17d194(0x945)]['DisplayedParams']['map'](_0x538cdd=>_0x538cdd['toUpperCase']()[_0x17d194(0x667)]()),_0x5ecf8a[_0x17d194(0x945)][_0x17d194(0x56c)]=_0x5ecf8a['Param'][_0x17d194(0x56c)]['map'](_0x221858=>_0x221858[_0x17d194(0x991)]()[_0x17d194(0x667)]()),_0x5ecf8a[_0x17d194(0x59f)][_0x17d194(0x4ac)]=_0x5ecf8a[_0x17d194(0x59f)][_0x17d194(0x4ac)]??!![],_0x5ecf8a[_0x17d194(0x59f)]['ShiftT_Toggle']=_0x5ecf8a[_0x17d194(0x59f)][_0x17d194(0x6ce)]??!![];},Scene_Boot[_0x488b27(0x523)][_0x488b27(0x985)]=function(){const _0x1c67fd=_0x488b27;this[_0x1c67fd(0x594)]();},Scene_Boot[_0x488b27(0x523)][_0x488b27(0x594)]=function(){const _0x5cf299=_0x488b27,_0x724de6=VisuMZ['CoreEngine'][_0x5cf299(0x2f0)]['jsQuickFunc'];for(const _0x388c66 of _0x724de6){const _0x529aa9=_0x388c66[_0x5cf299(0x647)][_0x5cf299(0x422)](/[ ]/g,''),_0x4764f8=_0x388c66[_0x5cf299(0x393)];VisuMZ[_0x5cf299(0x96f)][_0x5cf299(0x6e0)](_0x529aa9,_0x4764f8);}},VisuMZ[_0x488b27(0x96f)]['createJsQuickFunction']=function(_0x38752c,_0x517a0d){const _0x5045be=_0x488b27;if(!!window[_0x38752c]){if($gameTemp[_0x5045be(0x3ba)]())console['log']('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'[_0x5045be(0x88c)](_0x38752c));}const _0xe5b2a2=_0x5045be(0x8b7)[_0x5045be(0x88c)](_0x38752c,_0x517a0d);window[_0x38752c]=new Function(_0xe5b2a2);},Scene_Boot[_0x488b27(0x523)][_0x488b27(0x22c)]=function(){const _0x35ec2e=_0x488b27,_0x2a877d=VisuMZ[_0x35ec2e(0x96f)][_0x35ec2e(0x2f0)][_0x35ec2e(0x759)];if(!_0x2a877d)return;for(const _0x38a4c0 of _0x2a877d){if(!_0x38a4c0)continue;VisuMZ[_0x35ec2e(0x96f)]['createCustomParameter'](_0x38a4c0);}},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x836)]={},VisuMZ['CoreEngine'][_0x488b27(0x1dd)]={},VisuMZ[_0x488b27(0x96f)]['CustomParamType']={},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x243)]={},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x598)]=function(_0x2b73a8){const _0x576c73=_0x488b27,_0x4857e1=_0x2b73a8['Abbreviation'],_0x24528a=_0x2b73a8[_0x576c73(0x34e)],_0xe8ab2b=_0x2b73a8[_0x576c73(0x441)],_0x3c3e84=_0x2b73a8['Type'],_0x37f13f=new Function(_0x2b73a8['ValueJS']);VisuMZ[_0x576c73(0x96f)]['CustomParamNames'][_0x4857e1[_0x576c73(0x991)]()[_0x576c73(0x667)]()]=_0x24528a,VisuMZ[_0x576c73(0x96f)][_0x576c73(0x1dd)][_0x4857e1[_0x576c73(0x991)]()['trim']()]=_0xe8ab2b,VisuMZ[_0x576c73(0x96f)][_0x576c73(0x88d)][_0x4857e1['toUpperCase']()[_0x576c73(0x667)]()]=_0x3c3e84,VisuMZ[_0x576c73(0x96f)][_0x576c73(0x243)][_0x4857e1[_0x576c73(0x991)]()[_0x576c73(0x667)]()]=_0x4857e1,Object[_0x576c73(0x566)](Game_BattlerBase[_0x576c73(0x523)],_0x4857e1,{'get'(){const _0x5dba34=_0x576c73,_0x29df49=_0x37f13f[_0x5dba34(0x1dc)](this);return _0x3c3e84==='integer'?Math[_0x5dba34(0x4fd)](_0x29df49):_0x29df49;}});},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x40a)]={},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x52b)]={},Scene_Boot[_0x488b27(0x523)]['process_VisuMZ_CoreEngine_ControllerButtons']=function(){const _0x135ce6=_0x488b27,_0x141c37=VisuMZ['CoreEngine']['Settings'][_0x135ce6(0x40a)];for(const _0x5e4281 of _0x141c37){const _0x5d2ad5=(_0x5e4281['Name']||'')[_0x135ce6(0x726)]()[_0x135ce6(0x667)](),_0x24778b=(_0x5e4281[_0x135ce6(0x332)]||'')[_0x135ce6(0x726)]()['trim']();VisuMZ['CoreEngine']['ControllerButtons'][_0x5d2ad5]=_0x5e4281,VisuMZ[_0x135ce6(0x96f)][_0x135ce6(0x52b)][_0x24778b]=_0x5d2ad5;}},VisuMZ[_0x488b27(0x977)]=function(){const _0x3941b5=_0x488b27;for(const _0x4ae4d1 of $dataActors){if(_0x4ae4d1)VisuMZ['ParseActorNotetags'](_0x4ae4d1);}for(const _0x305e0e of $dataClasses){if(_0x305e0e)VisuMZ[_0x3941b5(0x481)](_0x305e0e);}for(const _0x46ae05 of $dataSkills){if(_0x46ae05)VisuMZ[_0x3941b5(0x484)](_0x46ae05);}for(const _0x6139d4 of $dataItems){if(_0x6139d4)VisuMZ[_0x3941b5(0x1d4)](_0x6139d4);}for(const _0x3b8806 of $dataWeapons){if(_0x3b8806)VisuMZ[_0x3941b5(0x790)](_0x3b8806);}for(const _0x437867 of $dataArmors){if(_0x437867)VisuMZ[_0x3941b5(0x802)](_0x437867);}for(const _0x413edb of $dataEnemies){if(_0x413edb)VisuMZ['ParseEnemyNotetags'](_0x413edb);}for(const _0x4d8125 of $dataStates){if(_0x4d8125)VisuMZ['ParseStateNotetags'](_0x4d8125);}for(const _0x5df67a of $dataTilesets){if(_0x5df67a)VisuMZ[_0x3941b5(0x6ca)](_0x5df67a);}},VisuMZ[_0x488b27(0x990)]=function(_0x4e79df){},VisuMZ['ParseClassNotetags']=function(_0x45483a){},VisuMZ[_0x488b27(0x484)]=function(_0x3050e6){},VisuMZ[_0x488b27(0x1d4)]=function(_0x9605e8){},VisuMZ['ParseWeaponNotetags']=function(_0x527e78){},VisuMZ[_0x488b27(0x802)]=function(_0x30ac8a){},VisuMZ[_0x488b27(0x1db)]=function(_0x6415b7){},VisuMZ[_0x488b27(0x47c)]=function(_0x31dd10){},VisuMZ[_0x488b27(0x6ca)]=function(_0x44ab55){},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x990)]=VisuMZ[_0x488b27(0x990)],VisuMZ[_0x488b27(0x990)]=function(_0x2f6b44){const _0x3d5737=_0x488b27;VisuMZ['CoreEngine'][_0x3d5737(0x990)][_0x3d5737(0x1dc)](this,_0x2f6b44);const _0x18fffc=_0x2f6b44[_0x3d5737(0x74d)];if(_0x18fffc[_0x3d5737(0x426)](/<MAX LEVEL:[ ](\d+)>/i)){_0x2f6b44[_0x3d5737(0x840)]=Number(RegExp['$1']);if(_0x2f6b44[_0x3d5737(0x840)]===0x0)_0x2f6b44['maxLevel']=Number[_0x3d5737(0x6cb)];}_0x18fffc[_0x3d5737(0x426)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x2f6b44['initialLevel']=Math['min'](Number(RegExp['$1']),_0x2f6b44[_0x3d5737(0x840)]));},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x481)]=VisuMZ[_0x488b27(0x481)],VisuMZ[_0x488b27(0x481)]=function(_0x22ffe7){const _0x17844e=_0x488b27;VisuMZ[_0x17844e(0x96f)][_0x17844e(0x481)][_0x17844e(0x1dc)](this,_0x22ffe7);if(_0x22ffe7[_0x17844e(0x3cf)])for(const _0x3f59d9 of _0x22ffe7['learnings']){_0x3f59d9[_0x17844e(0x74d)][_0x17844e(0x426)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x3f59d9[_0x17844e(0x3a7)]=Math[_0x17844e(0x3c0)](Number(RegExp['$1']),0x1));}},VisuMZ['CoreEngine'][_0x488b27(0x1db)]=VisuMZ[_0x488b27(0x1db)],VisuMZ[_0x488b27(0x1db)]=function(_0x4b451a){const _0x432021=_0x488b27;VisuMZ[_0x432021(0x96f)][_0x432021(0x1db)]['call'](this,_0x4b451a),_0x4b451a[_0x432021(0x3a7)]=0x1;const _0x37e4e2=_0x4b451a[_0x432021(0x74d)];if(_0x37e4e2[_0x432021(0x426)](/<LEVEL:[ ](\d+)>/i))_0x4b451a['level']=Number(RegExp['$1']);if(_0x37e4e2[_0x432021(0x426)](/<MAXHP:[ ](\d+)>/i))_0x4b451a[_0x432021(0x369)][0x0]=Number(RegExp['$1']);if(_0x37e4e2[_0x432021(0x426)](/<MAXMP:[ ](\d+)>/i))_0x4b451a[_0x432021(0x369)][0x1]=Number(RegExp['$1']);if(_0x37e4e2[_0x432021(0x426)](/<ATK:[ ](\d+)>/i))_0x4b451a['params'][0x2]=Number(RegExp['$1']);if(_0x37e4e2[_0x432021(0x426)](/<DEF:[ ](\d+)>/i))_0x4b451a[_0x432021(0x369)][0x3]=Number(RegExp['$1']);if(_0x37e4e2[_0x432021(0x426)](/<MAT:[ ](\d+)>/i))_0x4b451a[_0x432021(0x369)][0x4]=Number(RegExp['$1']);if(_0x37e4e2[_0x432021(0x426)](/<MDF:[ ](\d+)>/i))_0x4b451a[_0x432021(0x369)][0x5]=Number(RegExp['$1']);if(_0x37e4e2['match'](/<AGI:[ ](\d+)>/i))_0x4b451a[_0x432021(0x369)][0x6]=Number(RegExp['$1']);if(_0x37e4e2[_0x432021(0x426)](/<LUK:[ ](\d+)>/i))_0x4b451a['params'][0x7]=Number(RegExp['$1']);if(_0x37e4e2['match'](/<EXP:[ ](\d+)>/i))_0x4b451a[_0x432021(0x221)]=Number(RegExp['$1']);if(_0x37e4e2['match'](/<GOLD:[ ](\d+)>/i))_0x4b451a[_0x432021(0x280)]=Number(RegExp['$1']);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x505)]=Graphics['_defaultStretchMode'],Graphics['_defaultStretchMode']=function(){const _0x140bd5=_0x488b27;switch(VisuMZ[_0x140bd5(0x96f)][_0x140bd5(0x2f0)][_0x140bd5(0x59f)][_0x140bd5(0x8e9)]){case _0x140bd5(0x710):return!![];case _0x140bd5(0x7a0):return![];default:return VisuMZ[_0x140bd5(0x96f)][_0x140bd5(0x505)][_0x140bd5(0x1dc)](this);}},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x1cd)]=Graphics[_0x488b27(0x2b1)],Graphics['printError']=function(_0x6f256c,_0x21040b,_0x5866e8=null){const _0x411db9=_0x488b27;VisuMZ['CoreEngine'][_0x411db9(0x1cd)][_0x411db9(0x1dc)](this,_0x6f256c,_0x21040b,_0x5866e8),VisuMZ[_0x411db9(0x557)](![]);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x347)]=Graphics[_0x488b27(0x834)],Graphics[_0x488b27(0x834)]=function(_0x559a68){const _0x17b4b1=_0x488b27;VisuMZ[_0x17b4b1(0x96f)][_0x17b4b1(0x347)][_0x17b4b1(0x1dc)](this,_0x559a68),this[_0x17b4b1(0x4ed)](_0x559a68);},Graphics[_0x488b27(0x4ed)]=function(_0x41701c){const _0x3eda50=_0x488b27;VisuMZ[_0x3eda50(0x96f)][_0x3eda50(0x2f0)][_0x3eda50(0x59f)][_0x3eda50(0x72f)]&&(_0x41701c[_0x3eda50(0x2db)][_0x3eda50(0x2c2)]=_0x3eda50(0x224));VisuMZ[_0x3eda50(0x96f)]['Settings'][_0x3eda50(0x59f)][_0x3eda50(0x927)]&&(_0x41701c[_0x3eda50(0x2db)][_0x3eda50(0x604)]=_0x3eda50(0x526));const _0x561764=Math[_0x3eda50(0x3c0)](0x0,Math[_0x3eda50(0x979)](_0x41701c[_0x3eda50(0x240)]*this['_realScale'])),_0xe8fed7=Math['max'](0x0,Math[_0x3eda50(0x979)](_0x41701c['height']*this[_0x3eda50(0x928)]));_0x41701c[_0x3eda50(0x2db)][_0x3eda50(0x240)]=_0x561764+'px',_0x41701c[_0x3eda50(0x2db)][_0x3eda50(0x512)]=_0xe8fed7+'px';},VisuMZ['CoreEngine'][_0x488b27(0x7df)]=Bitmap[_0x488b27(0x523)][_0x488b27(0x285)],Bitmap['prototype'][_0x488b27(0x285)]=function(_0x45d458,_0x5a076e){const _0x41888e=_0x488b27;VisuMZ[_0x41888e(0x96f)][_0x41888e(0x7df)][_0x41888e(0x1dc)](this,_0x45d458,_0x5a076e),this['_smooth']=!(VisuMZ[_0x41888e(0x96f)][_0x41888e(0x2f0)][_0x41888e(0x59f)]['PixelateImageRendering']??!![]);},Bitmap[_0x488b27(0x523)]['markCoreEngineModified']=function(){const _0x21cc39=_0x488b27;this[_0x21cc39(0x893)]=!![];},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x475)]=Sprite['prototype']['destroy'],Sprite[_0x488b27(0x523)][_0x488b27(0x866)]=function(){const _0x286662=_0x488b27;if(this[_0x286662(0x2cc)])VisuMZ[_0x286662(0x96f)]['Sprite_destroy'][_0x286662(0x1dc)](this);this[_0x286662(0x263)]();},Sprite[_0x488b27(0x523)][_0x488b27(0x263)]=function(){const _0x21727c=_0x488b27;if(!this['bitmap'])return;if(!this[_0x21727c(0x5ce)][_0x21727c(0x893)])return;this[_0x21727c(0x5ce)][_0x21727c(0x344)]&&!this[_0x21727c(0x1cc)][_0x21727c(0x344)][_0x21727c(0x33d)]&&this[_0x21727c(0x5ce)]['destroy']();},VisuMZ['CoreEngine']['Bitmap_resize']=Bitmap[_0x488b27(0x523)][_0x488b27(0x37c)],Bitmap[_0x488b27(0x523)][_0x488b27(0x37c)]=function(_0x41955e,_0x4bcdc6){const _0x195cf4=_0x488b27;VisuMZ[_0x195cf4(0x96f)][_0x195cf4(0x6a4)]['call'](this,_0x41955e,_0x4bcdc6),this[_0x195cf4(0x767)]();},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x677)]=Bitmap[_0x488b27(0x523)][_0x488b27(0x27f)],Bitmap[_0x488b27(0x523)]['blt']=function(_0x52db7a,_0x22036f,_0x21b31c,_0x45804b,_0x3a71ef,_0x3461a5,_0x25d9eb,_0x1f1e68,_0x3d37fd){const _0x3a958e=_0x488b27;_0x22036f=Math[_0x3a958e(0x4fd)](_0x22036f),_0x21b31c=Math[_0x3a958e(0x4fd)](_0x21b31c),_0x45804b=Math[_0x3a958e(0x4fd)](_0x45804b),_0x3a71ef=Math['round'](_0x3a71ef),_0x3461a5=Math['round'](_0x3461a5),_0x25d9eb=Math[_0x3a958e(0x4fd)](_0x25d9eb),VisuMZ[_0x3a958e(0x96f)][_0x3a958e(0x677)][_0x3a958e(0x1dc)](this,_0x52db7a,_0x22036f,_0x21b31c,_0x45804b,_0x3a71ef,_0x3461a5,_0x25d9eb,_0x1f1e68,_0x3d37fd),this[_0x3a958e(0x767)]();},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x73e)]=Bitmap[_0x488b27(0x523)]['clearRect'],Bitmap[_0x488b27(0x523)][_0x488b27(0x7d5)]=function(_0x238a94,_0x567894,_0x377666,_0x529c2f){const _0x6feefc=_0x488b27;VisuMZ[_0x6feefc(0x96f)]['Bitmap_clearRect'][_0x6feefc(0x1dc)](this,_0x238a94,_0x567894,_0x377666,_0x529c2f),this[_0x6feefc(0x767)]();},VisuMZ['CoreEngine'][_0x488b27(0x73b)]=Bitmap['prototype'][_0x488b27(0x3fe)],Bitmap['prototype'][_0x488b27(0x3fe)]=function(_0x1d774b,_0x3efff0,_0x456b16,_0x4ab2b2,_0x5eb89d){const _0x1e9583=_0x488b27;VisuMZ[_0x1e9583(0x96f)][_0x1e9583(0x73b)]['call'](this,_0x1d774b,_0x3efff0,_0x456b16,_0x4ab2b2,_0x5eb89d),this[_0x1e9583(0x767)]();},VisuMZ['CoreEngine'][_0x488b27(0x5ad)]=Bitmap['prototype'][_0x488b27(0x3c6)],Bitmap[_0x488b27(0x523)][_0x488b27(0x3c6)]=function(_0x562159,_0x516e0c,_0x69e5f8,_0x54bfaa,_0x3a89ab){const _0x3c501d=_0x488b27;VisuMZ[_0x3c501d(0x96f)][_0x3c501d(0x5ad)][_0x3c501d(0x1dc)](this,_0x562159,_0x516e0c,_0x69e5f8,_0x54bfaa,_0x3a89ab),this[_0x3c501d(0x767)]();},VisuMZ['CoreEngine']['Bitmap_gradientFillRect']=Bitmap[_0x488b27(0x523)][_0x488b27(0x294)],Bitmap[_0x488b27(0x523)][_0x488b27(0x294)]=function(_0x4a5d8c,_0x3bac1c,_0x2caf1b,_0x2809e9,_0x2cc6ea,_0x4d8ce0,_0x35a845){const _0x4e5f3f=_0x488b27;VisuMZ['CoreEngine'][_0x4e5f3f(0x5b4)]['call'](this,_0x4a5d8c,_0x3bac1c,_0x2caf1b,_0x2809e9,_0x2cc6ea,_0x4d8ce0,_0x35a845),this[_0x4e5f3f(0x767)]();},VisuMZ[_0x488b27(0x96f)]['Bitmap_drawCircle']=Bitmap[_0x488b27(0x523)][_0x488b27(0x83f)],Bitmap[_0x488b27(0x523)][_0x488b27(0x83f)]=function(_0x2603ed,_0x247351,_0x50b68c,_0x42e945){const _0x217506=_0x488b27;_0x2603ed=Math[_0x217506(0x4fd)](_0x2603ed),_0x247351=Math[_0x217506(0x4fd)](_0x247351),_0x50b68c=Math['round'](_0x50b68c),VisuMZ[_0x217506(0x96f)][_0x217506(0x8f1)][_0x217506(0x1dc)](this,_0x2603ed,_0x247351,_0x50b68c,_0x42e945),this['markCoreEngineModified']();},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x46a)]=Bitmap['prototype'][_0x488b27(0x49b)],Bitmap[_0x488b27(0x523)][_0x488b27(0x49b)]=function(_0x923bb6){const _0x20c291=_0x488b27;return Math['ceil'](VisuMZ[_0x20c291(0x96f)][_0x20c291(0x46a)][_0x20c291(0x1dc)](this,_0x923bb6));},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x399)]=Bitmap[_0x488b27(0x523)][_0x488b27(0x765)],Bitmap[_0x488b27(0x523)][_0x488b27(0x765)]=function(_0x1a1452,_0x56ee3e,_0x19c0e7,_0x18f56c,_0x1c53ac,_0x2e003b){const _0x432c61=_0x488b27;_0x56ee3e=Math['round'](_0x56ee3e),_0x19c0e7=Math['round'](_0x19c0e7),_0x18f56c=Math['ceil'](_0x18f56c),_0x1c53ac=Math[_0x432c61(0x218)](_0x1c53ac),VisuMZ[_0x432c61(0x96f)][_0x432c61(0x399)]['call'](this,_0x1a1452,_0x56ee3e,_0x19c0e7,_0x18f56c,_0x1c53ac,_0x2e003b),this[_0x432c61(0x767)]();},VisuMZ[_0x488b27(0x96f)]['Bitmap_drawTextOutline']=Bitmap[_0x488b27(0x523)][_0x488b27(0x639)],Bitmap['prototype']['_drawTextOutline']=function(_0x29f278,_0x2ff625,_0x4a4c70,_0xbaaf38){const _0x1830de=_0x488b27;VisuMZ[_0x1830de(0x96f)][_0x1830de(0x2f0)][_0x1830de(0x59f)]['FontShadows']?this[_0x1830de(0x55c)](_0x29f278,_0x2ff625,_0x4a4c70,_0xbaaf38):VisuMZ[_0x1830de(0x96f)][_0x1830de(0x7b3)][_0x1830de(0x1dc)](this,_0x29f278,_0x2ff625,_0x4a4c70,_0xbaaf38);},Bitmap[_0x488b27(0x523)][_0x488b27(0x55c)]=function(_0x4d196b,_0x1c17e4,_0x1901f0,_0x592eef){const _0x434d77=_0x488b27,_0x4f141a=this['context'];_0x4f141a[_0x434d77(0x97f)]=this['outlineColor'],_0x4f141a[_0x434d77(0x450)](_0x4d196b,_0x1c17e4+0x2,_0x1901f0+0x2,_0x592eef);},VisuMZ['CoreEngine'][_0x488b27(0x6ad)]=Input[_0x488b27(0x6f5)],Input[_0x488b27(0x6f5)]=function(){const _0x1a4930=_0x488b27;VisuMZ[_0x1a4930(0x96f)][_0x1a4930(0x6ad)]['call'](this),this[_0x1a4930(0x35c)]=undefined,this[_0x1a4930(0x817)]=undefined,this[_0x1a4930(0x6be)]=Input[_0x1a4930(0x518)];},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x8c4)]=Input[_0x488b27(0x5f1)],Input[_0x488b27(0x5f1)]=function(){const _0x4c2782=_0x488b27;VisuMZ[_0x4c2782(0x96f)]['Input_update'][_0x4c2782(0x1dc)](this);if(this[_0x4c2782(0x6be)])this[_0x4c2782(0x6be)]--;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x25f)]=Input[_0x488b27(0x81f)],Input[_0x488b27(0x81f)]=function(){const _0x4a41a8=_0x488b27;if(this[_0x4a41a8(0x6be)])return;VisuMZ['CoreEngine']['Input_pollGamepads'][_0x4a41a8(0x1dc)](this);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x3e3)]=Input[_0x488b27(0x5bc)],Input[_0x488b27(0x5bc)]=function(){const _0x549021=_0x488b27;VisuMZ[_0x549021(0x96f)][_0x549021(0x3e3)]['call'](this),document[_0x549021(0x225)](_0x549021(0x909),this[_0x549021(0x7bb)][_0x549021(0x8e1)](this));},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x96b)]=Input[_0x488b27(0x8e4)],Input[_0x488b27(0x8e4)]=function(_0x864049){const _0x38c09e=_0x488b27;this[_0x38c09e(0x817)]=_0x864049['keyCode'],VisuMZ['CoreEngine'][_0x38c09e(0x96b)]['call'](this,_0x864049),this['setLastGamepadUsed'](null);},Input[_0x488b27(0x7bb)]=function(_0x4fe86a){const _0x4b8cbe=_0x488b27;this[_0x4b8cbe(0x89a)](_0x4fe86a);},Input[_0x488b27(0x89a)]=function(_0x2a3f98){const _0xff5778=_0x488b27;this[_0xff5778(0x817)]=_0x2a3f98[_0xff5778(0x4e7)];let _0x4bf2dd=String['fromCharCode'](_0x2a3f98[_0xff5778(0x8ae)]);this[_0xff5778(0x35c)]===undefined?this[_0xff5778(0x35c)]=_0x4bf2dd:this['_inputString']+=_0x4bf2dd;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x248)]=Input[_0x488b27(0x7c5)],Input[_0x488b27(0x7c5)]=function(_0x31fb86){const _0xfb9d2f=_0x488b27;if(_0x31fb86===0x8)return![];return VisuMZ[_0xfb9d2f(0x96f)][_0xfb9d2f(0x248)][_0xfb9d2f(0x1dc)](this,_0x31fb86);},Input['isSpecialCode']=function(_0x305adb){const _0x5c2f6d=_0x488b27;if(_0x305adb[_0x5c2f6d(0x426)](/backspace/i))return this[_0x5c2f6d(0x817)]===0x8;if(_0x305adb[_0x5c2f6d(0x426)](/enter/i))return this[_0x5c2f6d(0x817)]===0xd;if(_0x305adb[_0x5c2f6d(0x426)](/escape/i))return this['_inputSpecialKeyCode']===0x1b;},Input[_0x488b27(0x80a)]=function(){const _0x21281e=_0x488b27;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x21281e(0x817)]);},Input[_0x488b27(0x968)]=function(){const _0x2237cc=_0x488b27;return[0x25,0x26,0x27,0x28][_0x2237cc(0x91d)](this[_0x2237cc(0x817)]);},Input['isGamepadConnected']=function(){const _0x4a4a0f=_0x488b27;if(navigator[_0x4a4a0f(0x717)]){const _0x283056=navigator['getGamepads']();if(_0x283056)for(const _0x3e28a9 of _0x283056){if(_0x3e28a9&&_0x3e28a9[_0x4a4a0f(0x4b7)])return!![];}}return![];},Input[_0x488b27(0x95d)]=function(){const _0x3c17a8=_0x488b27;if(navigator[_0x3c17a8(0x717)]){const _0x1cd861=navigator[_0x3c17a8(0x717)]();if(_0x1cd861)for(const _0x36561a of _0x1cd861){if(_0x36561a&&_0x36561a[_0x3c17a8(0x4b7)]){if(this[_0x3c17a8(0x23a)](_0x36561a))return!![];if(this[_0x3c17a8(0x819)](_0x36561a))return!![];}}}return![];},Input[_0x488b27(0x23a)]=function(_0x103dfd){const _0x3a68d7=_0x488b27,_0x57126d=_0x103dfd[_0x3a68d7(0x26e)];for(let _0x118f15=0x0;_0x118f15<_0x57126d[_0x3a68d7(0x998)];_0x118f15++){if(_0x57126d[_0x118f15]['pressed'])return!![];}return![];},Input[_0x488b27(0x819)]=function(_0x33ce3c){const _0x423812=_0x488b27,_0xae771a=_0x33ce3c[_0x423812(0x292)],_0x5c44c2=0.5;if(_0xae771a[0x0]<-_0x5c44c2)return!![];if(_0xae771a[0x0]>_0x5c44c2)return!![];if(_0xae771a[0x1]<-_0x5c44c2)return!![];if(_0xae771a[0x1]>_0x5c44c2)return!![];return![];},Input[_0x488b27(0x2a4)]=function(){const _0x1d1b21=_0x488b27;return this[_0x1d1b21(0x79b)]||null;},Input[_0x488b27(0x7c3)]=function(_0x122f3e){const _0x2d154f=_0x488b27;this[_0x2d154f(0x79b)]=_0x122f3e;},VisuMZ['CoreEngine'][_0x488b27(0x2ef)]=Input[_0x488b27(0x94c)],Input[_0x488b27(0x94c)]=function(_0x403b57){const _0x5c165c=_0x488b27;VisuMZ[_0x5c165c(0x96f)]['Input_updateGamepadState']['call'](this,_0x403b57),(this['isGamepadButtonPressed'](_0x403b57)||this[_0x5c165c(0x819)](_0x403b57))&&this['setLastGamepadUsed'](_0x403b57);},Input['getLastUsedGamepadType']=function(){const _0xfd2dec=_0x488b27;return this[_0xfd2dec(0x79b)]?this[_0xfd2dec(0x79b)]['id']:_0xfd2dec(0x7b2);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x870)]=Tilemap[_0x488b27(0x523)][_0x488b27(0x355)],Tilemap[_0x488b27(0x523)][_0x488b27(0x355)]=function(_0x8d426b,_0xd4edde,_0x2ee6d2,_0x4fe1d1){const _0xdab8ea=_0x488b27;if($gameMap&&$gameMap['areTileShadowsHidden']())return;VisuMZ['CoreEngine']['Tilemap_addShadow'][_0xdab8ea(0x1dc)](this,_0x8d426b,_0xd4edde,_0x2ee6d2,_0x4fe1d1);},Tilemap[_0x488b27(0x931)][_0x488b27(0x523)][_0x488b27(0x7a5)]=function(){const _0x3f5dad=_0x488b27;this[_0x3f5dad(0x331)]();for(let _0x594b85=0x0;_0x594b85<Tilemap[_0x3f5dad(0x246)]['MAX_GL_TEXTURES'];_0x594b85++){const _0xc5b5e1=new PIXI[(_0x3f5dad(0x603))]();_0xc5b5e1['setSize'](0x800,0x800),VisuMZ[_0x3f5dad(0x96f)][_0x3f5dad(0x2f0)][_0x3f5dad(0x59f)]['PixelateImageRendering']&&(_0xc5b5e1[_0x3f5dad(0x1f1)]=PIXI[_0x3f5dad(0x4bb)]['NEAREST']),this[_0x3f5dad(0x436)][_0x3f5dad(0x64c)](_0xc5b5e1);}},WindowLayer[_0x488b27(0x523)][_0x488b27(0x716)]=function(){const _0x315ec0=_0x488b27;return SceneManager&&SceneManager['_scene']?SceneManager['_scene'][_0x315ec0(0x937)]():!![];},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x68f)]=WindowLayer[_0x488b27(0x523)]['render'],WindowLayer['prototype'][_0x488b27(0x227)]=function render(_0x492db4){const _0x4de4be=_0x488b27;this[_0x4de4be(0x716)]()?VisuMZ[_0x4de4be(0x96f)][_0x4de4be(0x68f)]['call'](this,_0x492db4):this['renderNoMask'](_0x492db4);},WindowLayer['prototype'][_0x488b27(0x262)]=function render(_0x136da6){const _0x20ee7f=_0x488b27;if(!this['visible'])return;const _0x440f7b=new PIXI[(_0x20ee7f(0x2b5))](),_0x426b78=_0x136da6['gl'],_0x29687a=this[_0x20ee7f(0x8bf)][_0x20ee7f(0x47e)]();_0x136da6[_0x20ee7f(0x4c0)]['forceStencil'](),_0x440f7b['transform']=this['transform'],_0x136da6['batch'][_0x20ee7f(0x659)](),_0x426b78[_0x20ee7f(0x51e)](_0x426b78[_0x20ee7f(0x4e1)]);while(_0x29687a['length']>0x0){const _0x4a1545=_0x29687a[_0x20ee7f(0x3b1)]();_0x4a1545[_0x20ee7f(0x5a5)]&&_0x4a1545['visible']&&_0x4a1545['openness']>0x0&&(_0x426b78['stencilFunc'](_0x426b78['EQUAL'],0x0,~0x0),_0x426b78[_0x20ee7f(0x8d6)](_0x426b78[_0x20ee7f(0x859)],_0x426b78[_0x20ee7f(0x859)],_0x426b78[_0x20ee7f(0x859)]),_0x4a1545[_0x20ee7f(0x227)](_0x136da6),_0x136da6[_0x20ee7f(0x8c7)][_0x20ee7f(0x659)](),_0x440f7b['clear'](),_0x426b78[_0x20ee7f(0x8eb)](_0x426b78['ALWAYS'],0x1,~0x0),_0x426b78[_0x20ee7f(0x8d6)](_0x426b78[_0x20ee7f(0x800)],_0x426b78[_0x20ee7f(0x800)],_0x426b78[_0x20ee7f(0x800)]),_0x426b78[_0x20ee7f(0x72a)](_0x426b78[_0x20ee7f(0x4bf)],_0x426b78[_0x20ee7f(0x923)]),_0x440f7b[_0x20ee7f(0x227)](_0x136da6),_0x136da6[_0x20ee7f(0x8c7)][_0x20ee7f(0x659)](),_0x426b78[_0x20ee7f(0x72a)](_0x426b78[_0x20ee7f(0x923)],_0x426b78[_0x20ee7f(0x5ec)]));}_0x426b78[_0x20ee7f(0x357)](_0x426b78['STENCIL_TEST']),_0x426b78[_0x20ee7f(0x6f5)](_0x426b78[_0x20ee7f(0x683)]),_0x426b78[_0x20ee7f(0x6a6)](0x0),_0x136da6[_0x20ee7f(0x8c7)][_0x20ee7f(0x659)]();for(const _0x4447c8 of this[_0x20ee7f(0x8bf)]){!_0x4447c8['_isWindow']&&_0x4447c8['visible']&&_0x4447c8[_0x20ee7f(0x227)](_0x136da6);}_0x136da6[_0x20ee7f(0x8c7)][_0x20ee7f(0x659)]();},DataManager[_0x488b27(0x2ea)]=function(_0x23ed06){const _0x5f1a7b=_0x488b27;return this[_0x5f1a7b(0x26c)](_0x23ed06)&&_0x23ed06[_0x5f1a7b(0x326)]===0x2;},VisuMZ[_0x488b27(0x96f)]['DataManager_setupNewGame']=DataManager['setupNewGame'],DataManager[_0x488b27(0x6f2)]=function(){const _0x1ab74c=_0x488b27;VisuMZ[_0x1ab74c(0x96f)][_0x1ab74c(0x68a)][_0x1ab74c(0x1dc)](this),this[_0x1ab74c(0x27b)](),this[_0x1ab74c(0x38b)]();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x23451a=_0x488b27;if($gameTemp[_0x23451a(0x3ba)]()){const _0x2cb337=VisuMZ['CoreEngine'][_0x23451a(0x2f0)][_0x23451a(0x59f)]['NewGameCommonEvent'];if(_0x2cb337>0x0)$gameTemp[_0x23451a(0x905)](_0x2cb337);}},DataManager[_0x488b27(0x38b)]=function(){const _0x527073=_0x488b27,_0x5eaba7=VisuMZ[_0x527073(0x96f)][_0x527073(0x2f0)][_0x527073(0x59f)]['NewGameCommonEventAll']||0x0;if(_0x5eaba7>0x0)$gameTemp[_0x527073(0x905)](_0x5eaba7);},DataManager[_0x488b27(0x3bc)]=function(_0x9b735f){const _0x1a79ab=_0x488b27,_0x436b4c=$dataTroops[_0x9b735f];if(!_0x436b4c)return'';let _0x103555='';_0x103555+=_0x436b4c['name'];for(const _0x52a68f of _0x436b4c[_0x1a79ab(0x636)]){for(const _0x43bcbf of _0x52a68f[_0x1a79ab(0x2d3)]){[0x6c,0x198][_0x1a79ab(0x5f8)](_0x43bcbf[_0x1a79ab(0x789)])&&(_0x103555+='\x0a',_0x103555+=_0x43bcbf[_0x1a79ab(0x3bb)][0x0]);}}return _0x103555;};(VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)]['QoL']['ShortcutScripts']??!![])&&($scene=null,VisuMZ[_0x488b27(0x96f)]['Scene_Base_create']=Scene_Base[_0x488b27(0x523)][_0x488b27(0x7e3)],Scene_Base[_0x488b27(0x523)][_0x488b27(0x7e3)]=function(){const _0x278bf3=_0x488b27;VisuMZ[_0x278bf3(0x96f)][_0x278bf3(0x34f)]['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0x488b27(0x96f)][_0x488b27(0x4e6)]=Scene_Map[_0x488b27(0x523)][_0x488b27(0x679)],Scene_Map[_0x488b27(0x523)]['createSpriteset']=function(){const _0x54fa51=_0x488b27;VisuMZ[_0x54fa51(0x96f)][_0x54fa51(0x4e6)][_0x54fa51(0x1dc)](this),$spriteset=this[_0x54fa51(0x724)];},VisuMZ[_0x488b27(0x96f)]['Scene_Battle_createSpriteset']=Scene_Battle[_0x488b27(0x523)][_0x488b27(0x679)],Scene_Battle[_0x488b27(0x523)]['createSpriteset']=function(){const _0x38e302=_0x488b27;VisuMZ['CoreEngine'][_0x38e302(0x534)][_0x38e302(0x1dc)](this),$spriteset=this[_0x38e302(0x724)];},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x656)]=Scene_Base['prototype'][_0x488b27(0x555)],Scene_Base['prototype']['terminate']=function(){const _0x105efc=_0x488b27;VisuMZ[_0x105efc(0x96f)]['Scene_Base_terminate']['call'](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x488b27(0x96f)]['BattleManager_update']=BattleManager[_0x488b27(0x5f1)],BattleManager[_0x488b27(0x5f1)]=function(_0x2574eb){const _0x1e9770=_0x488b27;VisuMZ[_0x1e9770(0x96f)]['BattleManager_update'][_0x1e9770(0x1dc)](this,_0x2574eb),$subject=this[_0x1e9770(0x4f5)],$targets=this[_0x1e9770(0x8b6)],$target=this[_0x1e9770(0x340)]||this[_0x1e9770(0x8b6)][0x0];},$event=null,VisuMZ[_0x488b27(0x96f)][_0x488b27(0x769)]=Game_Event[_0x488b27(0x523)][_0x488b27(0x289)],Game_Event[_0x488b27(0x523)]['start']=function(){const _0x3257c1=_0x488b27;VisuMZ[_0x3257c1(0x96f)][_0x3257c1(0x769)][_0x3257c1(0x1dc)](this),$event=this;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x595)]=Scene_Map[_0x488b27(0x523)][_0x488b27(0x5f1)],Scene_Map[_0x488b27(0x523)][_0x488b27(0x5f1)]=function(){const _0x404c75=_0x488b27;VisuMZ[_0x404c75(0x96f)][_0x404c75(0x595)][_0x404c75(0x1dc)](this),$gameMap[_0x404c75(0x91c)]();},Game_Map[_0x488b27(0x523)][_0x488b27(0x91c)]=function(){const _0x301bed=_0x488b27;!this[_0x301bed(0x8ef)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x4a92cf){if($gameTemp)$gameTemp['reserveCommonEvent'](_0x4a92cf);});;$onceParallel=function(_0x42bca3,_0x5f3719){const _0x3345dd=_0x488b27;if(SceneManager[_0x3345dd(0x69a)]())SceneManager[_0x3345dd(0x51f)][_0x3345dd(0x4fb)](_0x42bca3,_0x5f3719);else{if(SceneManager[_0x3345dd(0x5e5)]()){if(Imported[_0x3345dd(0x75d)])SceneManager['_scene'][_0x3345dd(0x4fb)](_0x42bca3);else $gameTemp&&$gameTemp[_0x3345dd(0x3ba)]()&&alert('Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!');}else $gameTemp&&$gameTemp[_0x3345dd(0x3ba)]()&&alert(_0x3345dd(0x3da));}},StorageManager[_0x488b27(0x3d5)]=function(_0x406696){return new Promise((_0x535b74,_0x245d12)=>{const _0x53e1a0=_0x597b;try{const _0x16539c=pako[_0x53e1a0(0x2d1)](_0x406696,{'to':_0x53e1a0(0x966),'level':0x1});if(_0x16539c['length']>=0xc350){}_0x535b74(_0x16539c);}catch(_0x284a23){_0x245d12(_0x284a23);}});},TextManager['stringKeyMap']=['','','',_0x488b27(0x2fe),'','',_0x488b27(0x919),'',_0x488b27(0x97a),'TAB','','',_0x488b27(0x944),'ENTER',_0x488b27(0x610),'',_0x488b27(0x90a),_0x488b27(0x912),_0x488b27(0x68b),_0x488b27(0x216),_0x488b27(0x521),_0x488b27(0x7ad),_0x488b27(0x8a0),_0x488b27(0x52e),_0x488b27(0x3ff),_0x488b27(0x663),'',_0x488b27(0x6d4),_0x488b27(0x808),_0x488b27(0x36a),_0x488b27(0x1f3),_0x488b27(0x6d8),'SPACE','PGUP',_0x488b27(0x731),'END',_0x488b27(0x23b),'LEFT','UP',_0x488b27(0x705),_0x488b27(0x25b),_0x488b27(0x43d),_0x488b27(0x914),_0x488b27(0x4b6),_0x488b27(0x24e),_0x488b27(0x258),_0x488b27(0x5aa),'','0','1','2','3','4','5','6','7','8','9',_0x488b27(0x463),_0x488b27(0x3fc),_0x488b27(0x325),_0x488b27(0x51d),_0x488b27(0x54c),_0x488b27(0x39e),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x488b27(0x924),'',_0x488b27(0x589),'',_0x488b27(0x60c),'NUMPAD0',_0x488b27(0x540),'NUMPAD2',_0x488b27(0x437),_0x488b27(0x7f7),_0x488b27(0x5c7),_0x488b27(0x244),'NUMPAD7',_0x488b27(0x712),_0x488b27(0x61f),'MULTIPLY','ADD',_0x488b27(0x510),_0x488b27(0x4f2),_0x488b27(0x81e),'DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x488b27(0x7bd),'F11',_0x488b27(0x5d1),_0x488b27(0x4b8),_0x488b27(0x4e9),'F15',_0x488b27(0x412),_0x488b27(0x930),'F18',_0x488b27(0x4cb),_0x488b27(0x350),_0x488b27(0x95f),'F22',_0x488b27(0x4d9),'F24','','','','','','','','','NUM_LOCK',_0x488b27(0x936),_0x488b27(0x28b),_0x488b27(0x5d6),_0x488b27(0x7e9),_0x488b27(0x485),_0x488b27(0x61d),'','','','','','','','','',_0x488b27(0x965),'EXCLAMATION',_0x488b27(0x858),_0x488b27(0x52c),_0x488b27(0x798),_0x488b27(0x91b),_0x488b27(0x92f),_0x488b27(0x45d),_0x488b27(0x6d7),_0x488b27(0x367),_0x488b27(0x76e),_0x488b27(0x53e),_0x488b27(0x273),_0x488b27(0x291),'OPEN_CURLY_BRACKET',_0x488b27(0x887),'TILDE','','','','',_0x488b27(0x2f3),_0x488b27(0x3f2),'VOLUME_UP','','','SEMICOLON',_0x488b27(0x51d),'COMMA',_0x488b27(0x989),_0x488b27(0x35f),'SLASH',_0x488b27(0x6c1),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x488b27(0x39f),_0x488b27(0x59d),_0x488b27(0x7e5),_0x488b27(0x997),'',_0x488b27(0x5fb),_0x488b27(0x7cf),'',_0x488b27(0x430),_0x488b27(0x24a),'',_0x488b27(0x6a3),'','',_0x488b27(0x384),_0x488b27(0x3db),_0x488b27(0x851),'WIN_OEM_PA2',_0x488b27(0x7eb),_0x488b27(0x4b0),_0x488b27(0x4d4),_0x488b27(0x84b),_0x488b27(0x4be),'WIN_OEM_COPY',_0x488b27(0x3d4),_0x488b27(0x5c5),'WIN_OEM_BACKTAB','ATTN',_0x488b27(0x3aa),'EXSEL',_0x488b27(0x4a0),'PLAY',_0x488b27(0x514),'',_0x488b27(0x6fa),_0x488b27(0x5df),''],TextManager[_0x488b27(0x2d4)]=VisuMZ[_0x488b27(0x96f)]['Settings']['ButtonAssist'][_0x488b27(0x8d3)],TextManager[_0x488b27(0x949)]=VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)][_0x488b27(0x988)][_0x488b27(0x391)],TextManager[_0x488b27(0x542)]=VisuMZ['CoreEngine']['Settings'][_0x488b27(0x988)]['SwitchActorText'],VisuMZ[_0x488b27(0x96f)]['TextManager_param']=TextManager[_0x488b27(0x707)],TextManager[_0x488b27(0x707)]=function(_0xe4aafc){const _0x5a0197=_0x488b27;return typeof _0xe4aafc===_0x5a0197(0x727)?VisuMZ['CoreEngine'][_0x5a0197(0x825)][_0x5a0197(0x1dc)](this,_0xe4aafc):this[_0x5a0197(0x2a5)](_0xe4aafc);},TextManager[_0x488b27(0x2a5)]=function(_0x28378e){const _0x41097a=_0x488b27;_0x28378e=String(_0x28378e||'')[_0x41097a(0x991)]();const _0x3ef96b=VisuMZ[_0x41097a(0x96f)]['Settings']['Param'];if(_0x28378e===_0x41097a(0x752))return $dataSystem[_0x41097a(0x40d)]['params'][0x0];if(_0x28378e===_0x41097a(0x8c2))return $dataSystem['terms'][_0x41097a(0x369)][0x1];if(_0x28378e===_0x41097a(0x87d))return $dataSystem['terms'][_0x41097a(0x369)][0x2];if(_0x28378e==='DEF')return $dataSystem[_0x41097a(0x40d)]['params'][0x3];if(_0x28378e===_0x41097a(0x380))return $dataSystem[_0x41097a(0x40d)][_0x41097a(0x369)][0x4];if(_0x28378e===_0x41097a(0x7f8))return $dataSystem[_0x41097a(0x40d)]['params'][0x5];if(_0x28378e==='AGI')return $dataSystem[_0x41097a(0x40d)][_0x41097a(0x369)][0x6];if(_0x28378e===_0x41097a(0x54d))return $dataSystem[_0x41097a(0x40d)][_0x41097a(0x369)][0x7];if(_0x28378e===_0x41097a(0x7f3))return _0x3ef96b[_0x41097a(0x29e)];if(_0x28378e===_0x41097a(0x933))return _0x3ef96b['XParamVocab1'];if(_0x28378e===_0x41097a(0x57f))return _0x3ef96b[_0x41097a(0x4e5)];if(_0x28378e===_0x41097a(0x8c6))return _0x3ef96b['XParamVocab3'];if(_0x28378e===_0x41097a(0x495))return _0x3ef96b[_0x41097a(0x7fd)];if(_0x28378e==='MRF')return _0x3ef96b[_0x41097a(0x45c)];if(_0x28378e===_0x41097a(0x66b))return _0x3ef96b[_0x41097a(0x52f)];if(_0x28378e===_0x41097a(0x8d8))return _0x3ef96b[_0x41097a(0x304)];if(_0x28378e==='MRG')return _0x3ef96b[_0x41097a(0x951)];if(_0x28378e===_0x41097a(0x282))return _0x3ef96b[_0x41097a(0x5c2)];if(_0x28378e===_0x41097a(0x6cf))return _0x3ef96b[_0x41097a(0x642)];if(_0x28378e===_0x41097a(0x7c6))return _0x3ef96b['SParamVocab1'];if(_0x28378e===_0x41097a(0x24b))return _0x3ef96b[_0x41097a(0x706)];if(_0x28378e==='PHA')return _0x3ef96b[_0x41097a(0x319)];if(_0x28378e==='MCR')return _0x3ef96b[_0x41097a(0x421)];if(_0x28378e==='TCR')return _0x3ef96b[_0x41097a(0x719)];if(_0x28378e==='PDR')return _0x3ef96b[_0x41097a(0x2e2)];if(_0x28378e===_0x41097a(0x722))return _0x3ef96b[_0x41097a(0x5c1)];if(_0x28378e===_0x41097a(0x93f))return _0x3ef96b[_0x41097a(0x286)];if(_0x28378e===_0x41097a(0x260))return _0x3ef96b[_0x41097a(0x58f)];if(VisuMZ[_0x41097a(0x96f)]['CustomParamNames'][_0x28378e])return VisuMZ[_0x41097a(0x96f)][_0x41097a(0x836)][_0x28378e];return'';},TextManager['getInputButtonString']=function(_0x2a5581){const _0x4fcab7=_0x488b27,_0x159981=Input['getLastUsedGamepadType']();return _0x159981==='Keyboard'?this[_0x4fcab7(0x443)](_0x2a5581):this[_0x4fcab7(0x619)](_0x159981,_0x2a5581);},TextManager['getKeyboardInputButtonString']=function(_0x2475c0){const _0xd9fc66=_0x488b27,_0x32d6a2=VisuMZ['CoreEngine']['Settings'][_0xd9fc66(0x988)]['SplitEscape'];if(!_0x32d6a2){if(_0x2475c0===_0xd9fc66(0x407))_0x2475c0='escape';if(_0x2475c0==='menu')_0x2475c0='escape';}let _0x58577e=[];for(let _0x45b1a8 in Input['keyMapper']){_0x45b1a8=Number(_0x45b1a8);if(_0x45b1a8>=0x60&&_0x45b1a8<=0x69)continue;if([0x12,0x20][_0xd9fc66(0x5f8)](_0x45b1a8))continue;_0x2475c0===Input[_0xd9fc66(0x970)][_0x45b1a8]&&_0x58577e[_0xd9fc66(0x64c)](_0x45b1a8);}for(let _0xbf901a=0x0;_0xbf901a<_0x58577e[_0xd9fc66(0x998)];_0xbf901a++){_0x58577e[_0xbf901a]=TextManager[_0xd9fc66(0x771)][_0x58577e[_0xbf901a]];}return this[_0xd9fc66(0x497)](_0x58577e);},TextManager[_0x488b27(0x497)]=function(_0x11a507){const _0x5023bb=_0x488b27,_0x33c626=VisuMZ['CoreEngine'][_0x5023bb(0x2f0)]['ButtonAssist'],_0x13f788=_0x33c626[_0x5023bb(0x76f)],_0xbe749b=_0x11a507['pop'](),_0x67209e='Key%1'['format'](_0xbe749b);return _0x33c626[_0x67209e]?_0x33c626[_0x67209e]:_0x13f788[_0x5023bb(0x88c)](_0xbe749b);},TextManager[_0x488b27(0x680)]=function(_0x58c286,_0x23db75){const _0x3b081a=_0x488b27,_0x185619=VisuMZ[_0x3b081a(0x96f)][_0x3b081a(0x2f0)][_0x3b081a(0x988)],_0x3624c3=_0x185619[_0x3b081a(0x4af)],_0x3eff9a=this[_0x3b081a(0x855)](_0x58c286),_0xf15992=this['getInputButtonString'](_0x23db75);return _0x3624c3[_0x3b081a(0x88c)](_0x3eff9a,_0xf15992);},TextManager['getControllerInputButtonString']=function(_0x10178a,_0x51de88){const _0x428f25=_0x488b27,_0x58d6c7=_0x10178a['toLowerCase']()[_0x428f25(0x667)](),_0x37129f=VisuMZ[_0x428f25(0x96f)][_0x428f25(0x40a)][_0x58d6c7];if(!_0x37129f)return this[_0x428f25(0x223)](_0x10178a,_0x51de88);return _0x37129f[_0x51de88]||this[_0x428f25(0x443)](_0x10178a,_0x51de88);},TextManager[_0x488b27(0x223)]=function(_0x276511,_0xfa2a45){const _0xd5a523=_0x488b27,_0x503420=_0x276511['toLowerCase']()[_0xd5a523(0x667)]();for(const _0x269b7f in VisuMZ[_0xd5a523(0x96f)][_0xd5a523(0x52b)]){if(_0x503420[_0xd5a523(0x5f8)](_0x269b7f)){const _0x83cea7=VisuMZ[_0xd5a523(0x96f)][_0xd5a523(0x52b)][_0x269b7f],_0xf1b338=VisuMZ[_0xd5a523(0x96f)]['ControllerButtons'][_0x83cea7];return _0xf1b338[_0xfa2a45]||this[_0xd5a523(0x443)](_0xfa2a45);}}return this[_0xd5a523(0x443)](_0xfa2a45);},VisuMZ[_0x488b27(0x96f)]['ColorManager_loadWindowskin']=ColorManager[_0x488b27(0x7cc)],ColorManager[_0x488b27(0x7cc)]=function(){const _0x1894a1=_0x488b27;VisuMZ[_0x1894a1(0x96f)][_0x1894a1(0x7b7)][_0x1894a1(0x1dc)](this),this['_colorCache']=this[_0x1894a1(0x425)]||{};},ColorManager[_0x488b27(0x374)]=function(_0x53a116,_0xb0f2f0){const _0x12a548=_0x488b27;return _0xb0f2f0=String(_0xb0f2f0),this[_0x12a548(0x425)]=this[_0x12a548(0x425)]||{},_0xb0f2f0[_0x12a548(0x426)](/#(.*)/i)?this[_0x12a548(0x425)][_0x53a116]=_0x12a548(0x689)[_0x12a548(0x88c)](String(RegExp['$1'])):this[_0x12a548(0x425)][_0x53a116]=this[_0x12a548(0x1ca)](Number(_0xb0f2f0)),this[_0x12a548(0x425)][_0x53a116];},ColorManager['getColor']=function(_0x4351df){const _0x348fc1=_0x488b27;return _0x4351df=String(_0x4351df),_0x4351df[_0x348fc1(0x426)](/#(.*)/i)?'#%1'[_0x348fc1(0x88c)](String(RegExp['$1'])):this[_0x348fc1(0x1ca)](Number(_0x4351df));},ColorManager[_0x488b27(0x55b)]=function(){const _0x25bbbc=_0x488b27;this[_0x25bbbc(0x425)]={};},ColorManager[_0x488b27(0x7e8)]=function(){const _0x1bfef2=_0x488b27,_0x47631b=_0x1bfef2(0x4bc);this[_0x1bfef2(0x425)]=this['_colorCache']||{};if(this['_colorCache'][_0x47631b])return this[_0x1bfef2(0x425)][_0x47631b];const _0x1de3ae=VisuMZ[_0x1bfef2(0x96f)]['Settings'][_0x1bfef2(0x7f0)]['ColorNormal'];return this['getColorDataFromPluginParameters'](_0x47631b,_0x1de3ae);},ColorManager[_0x488b27(0x65a)]=function(){const _0x33f70f=_0x488b27,_0xa8cb8e=_0x33f70f(0x640);this['_colorCache']=this[_0x33f70f(0x425)]||{};if(this[_0x33f70f(0x425)][_0xa8cb8e])return this[_0x33f70f(0x425)][_0xa8cb8e];const _0x1c9bfe=VisuMZ[_0x33f70f(0x96f)]['Settings']['Color']['ColorSystem'];return this[_0x33f70f(0x374)](_0xa8cb8e,_0x1c9bfe);},ColorManager[_0x488b27(0x37d)]=function(){const _0xbebadd=_0x488b27,_0x5221ea=_0xbebadd(0x813);this[_0xbebadd(0x425)]=this[_0xbebadd(0x425)]||{};if(this['_colorCache'][_0x5221ea])return this['_colorCache'][_0x5221ea];const _0x4a0c1f=VisuMZ[_0xbebadd(0x96f)]['Settings'][_0xbebadd(0x7f0)][_0xbebadd(0x715)];return this[_0xbebadd(0x374)](_0x5221ea,_0x4a0c1f);},ColorManager[_0x488b27(0x94e)]=function(){const _0x368223=_0x488b27,_0x5325c4='_stored_deathColor';this[_0x368223(0x425)]=this[_0x368223(0x425)]||{};if(this[_0x368223(0x425)][_0x5325c4])return this[_0x368223(0x425)][_0x5325c4];const _0x1f925c=VisuMZ[_0x368223(0x96f)]['Settings'][_0x368223(0x7f0)][_0x368223(0x75b)];return this[_0x368223(0x374)](_0x5325c4,_0x1f925c);},ColorManager[_0x488b27(0x969)]=function(){const _0x11e3d0=_0x488b27,_0x3454e8='_stored_gaugeBackColor';this[_0x11e3d0(0x425)]=this[_0x11e3d0(0x425)]||{};if(this['_colorCache'][_0x3454e8])return this[_0x11e3d0(0x425)][_0x3454e8];const _0x4b6b45=VisuMZ[_0x11e3d0(0x96f)][_0x11e3d0(0x2f0)]['Color']['ColorGaugeBack'];return this[_0x11e3d0(0x374)](_0x3454e8,_0x4b6b45);},ColorManager[_0x488b27(0x917)]=function(){const _0x227203=_0x488b27,_0x3ca79e=_0x227203(0x3e8);this['_colorCache']=this[_0x227203(0x425)]||{};if(this[_0x227203(0x425)][_0x3ca79e])return this[_0x227203(0x425)][_0x3ca79e];const _0x3f21ba=VisuMZ[_0x227203(0x96f)][_0x227203(0x2f0)]['Color'][_0x227203(0x1e2)];return this[_0x227203(0x374)](_0x3ca79e,_0x3f21ba);},ColorManager[_0x488b27(0x963)]=function(){const _0x92ebee=_0x488b27,_0x1ef5b2=_0x92ebee(0x329);this[_0x92ebee(0x425)]=this['_colorCache']||{};if(this[_0x92ebee(0x425)][_0x1ef5b2])return this[_0x92ebee(0x425)][_0x1ef5b2];const _0x438aed=VisuMZ[_0x92ebee(0x96f)][_0x92ebee(0x2f0)][_0x92ebee(0x7f0)][_0x92ebee(0x234)];return this['getColorDataFromPluginParameters'](_0x1ef5b2,_0x438aed);},ColorManager[_0x488b27(0x681)]=function(){const _0x11e26a=_0x488b27,_0x4d57c0=_0x11e26a(0x67e);this[_0x11e26a(0x425)]=this[_0x11e26a(0x425)]||{};if(this[_0x11e26a(0x425)][_0x4d57c0])return this[_0x11e26a(0x425)][_0x4d57c0];const _0x4164b8=VisuMZ[_0x11e26a(0x96f)][_0x11e26a(0x2f0)]['Color'][_0x11e26a(0x1ef)];return this[_0x11e26a(0x374)](_0x4d57c0,_0x4164b8);},ColorManager['mpGaugeColor2']=function(){const _0x14c6f6=_0x488b27,_0x36711a=_0x14c6f6(0x74f);this[_0x14c6f6(0x425)]=this[_0x14c6f6(0x425)]||{};if(this[_0x14c6f6(0x425)][_0x36711a])return this[_0x14c6f6(0x425)][_0x36711a];const _0x5df7ab=VisuMZ['CoreEngine'][_0x14c6f6(0x2f0)][_0x14c6f6(0x7f0)][_0x14c6f6(0x665)];return this[_0x14c6f6(0x374)](_0x36711a,_0x5df7ab);},ColorManager[_0x488b27(0x92e)]=function(){const _0x6ef42=_0x488b27,_0x4e52a4='_stored_mpCostColor';this[_0x6ef42(0x425)]=this[_0x6ef42(0x425)]||{};if(this['_colorCache'][_0x4e52a4])return this[_0x6ef42(0x425)][_0x4e52a4];const _0x1dbba5=VisuMZ['CoreEngine']['Settings'][_0x6ef42(0x7f0)][_0x6ef42(0x61e)];return this[_0x6ef42(0x374)](_0x4e52a4,_0x1dbba5);},ColorManager[_0x488b27(0x550)]=function(){const _0x746087=_0x488b27,_0x1cb4b9='_stored_powerUpColor';this[_0x746087(0x425)]=this[_0x746087(0x425)]||{};if(this[_0x746087(0x425)][_0x1cb4b9])return this[_0x746087(0x425)][_0x1cb4b9];const _0x384771=VisuMZ[_0x746087(0x96f)][_0x746087(0x2f0)][_0x746087(0x7f0)][_0x746087(0x52a)];return this[_0x746087(0x374)](_0x1cb4b9,_0x384771);},ColorManager['powerDownColor']=function(){const _0x38eae7=_0x488b27,_0x45c696=_0x38eae7(0x1d9);this[_0x38eae7(0x425)]=this['_colorCache']||{};if(this[_0x38eae7(0x425)][_0x45c696])return this[_0x38eae7(0x425)][_0x45c696];const _0x52b19e=VisuMZ['CoreEngine'][_0x38eae7(0x2f0)][_0x38eae7(0x7f0)]['ColorPowerDown'];return this[_0x38eae7(0x374)](_0x45c696,_0x52b19e);},ColorManager[_0x488b27(0x87b)]=function(){const _0x1cdc8a=_0x488b27,_0xc5995f=_0x1cdc8a(0x30d);this['_colorCache']=this[_0x1cdc8a(0x425)]||{};if(this[_0x1cdc8a(0x425)][_0xc5995f])return this['_colorCache'][_0xc5995f];const _0x55e76a=VisuMZ[_0x1cdc8a(0x96f)][_0x1cdc8a(0x2f0)]['Color']['ColorCTGauge1'];return this[_0x1cdc8a(0x374)](_0xc5995f,_0x55e76a);},ColorManager['ctGaugeColor2']=function(){const _0x421a73=_0x488b27,_0x1cfbff=_0x421a73(0x37f);this['_colorCache']=this[_0x421a73(0x425)]||{};if(this['_colorCache'][_0x1cfbff])return this[_0x421a73(0x425)][_0x1cfbff];const _0x5e8f8c=VisuMZ[_0x421a73(0x96f)]['Settings'][_0x421a73(0x7f0)][_0x421a73(0x7a6)];return this['getColorDataFromPluginParameters'](_0x1cfbff,_0x5e8f8c);},ColorManager['tpGaugeColor1']=function(){const _0xa16e7c=_0x488b27,_0x46dce7=_0xa16e7c(0x72e);this[_0xa16e7c(0x425)]=this[_0xa16e7c(0x425)]||{};if(this[_0xa16e7c(0x425)][_0x46dce7])return this[_0xa16e7c(0x425)][_0x46dce7];const _0x5c535b=VisuMZ[_0xa16e7c(0x96f)]['Settings'][_0xa16e7c(0x7f0)][_0xa16e7c(0x302)];return this['getColorDataFromPluginParameters'](_0x46dce7,_0x5c535b);},ColorManager[_0x488b27(0x609)]=function(){const _0x558c59=_0x488b27,_0x2a9d12=_0x558c59(0x500);this[_0x558c59(0x425)]=this[_0x558c59(0x425)]||{};if(this['_colorCache'][_0x2a9d12])return this[_0x558c59(0x425)][_0x2a9d12];const _0x25792e=VisuMZ['CoreEngine'][_0x558c59(0x2f0)]['Color']['ColorTPGauge2'];return this[_0x558c59(0x374)](_0x2a9d12,_0x25792e);},ColorManager[_0x488b27(0x615)]=function(){const _0x5a02e8=_0x488b27,_0x234165=_0x5a02e8(0x368);this[_0x5a02e8(0x425)]=this[_0x5a02e8(0x425)]||{};if(this[_0x5a02e8(0x425)][_0x234165])return this[_0x5a02e8(0x425)][_0x234165];const _0x14e181=VisuMZ['CoreEngine'][_0x5a02e8(0x2f0)][_0x5a02e8(0x7f0)][_0x5a02e8(0x87c)];return this[_0x5a02e8(0x374)](_0x234165,_0x14e181);},ColorManager[_0x488b27(0x6d1)]=function(){const _0x2429aa=_0x488b27,_0x4c9d60=_0x2429aa(0x440);this[_0x2429aa(0x425)]=this[_0x2429aa(0x425)]||{};if(this[_0x2429aa(0x425)][_0x4c9d60])return this[_0x2429aa(0x425)][_0x4c9d60];const _0x218ede=VisuMZ[_0x2429aa(0x96f)][_0x2429aa(0x2f0)][_0x2429aa(0x7f0)][_0x2429aa(0x87c)];return this[_0x2429aa(0x374)](_0x4c9d60,_0x218ede);},ColorManager[_0x488b27(0x3e5)]=function(){const _0x4593c4=_0x488b27,_0x359ea7='_stored_expGaugeColor1';this[_0x4593c4(0x425)]=this[_0x4593c4(0x425)]||{};if(this[_0x4593c4(0x425)][_0x359ea7])return this['_colorCache'][_0x359ea7];const _0x354dd9=VisuMZ[_0x4593c4(0x96f)]['Settings'][_0x4593c4(0x7f0)][_0x4593c4(0x807)];return this[_0x4593c4(0x374)](_0x359ea7,_0x354dd9);},ColorManager['expGaugeColor2']=function(){const _0x5dbf3a=_0x488b27,_0x5be08e=_0x5dbf3a(0x241);this[_0x5dbf3a(0x425)]=this[_0x5dbf3a(0x425)]||{};if(this['_colorCache'][_0x5be08e])return this[_0x5dbf3a(0x425)][_0x5be08e];const _0x569a8c=VisuMZ['CoreEngine'][_0x5dbf3a(0x2f0)][_0x5dbf3a(0x7f0)][_0x5dbf3a(0x1f2)];return this[_0x5dbf3a(0x374)](_0x5be08e,_0x569a8c);},ColorManager[_0x488b27(0x7c9)]=function(){const _0x21f87d=_0x488b27,_0x1716e3=_0x21f87d(0x696);this['_colorCache']=this[_0x21f87d(0x425)]||{};if(this['_colorCache'][_0x1716e3])return this[_0x21f87d(0x425)][_0x1716e3];const _0x4dbf7d=VisuMZ[_0x21f87d(0x96f)][_0x21f87d(0x2f0)][_0x21f87d(0x7f0)][_0x21f87d(0x709)];return this[_0x21f87d(0x374)](_0x1716e3,_0x4dbf7d);},ColorManager[_0x488b27(0x458)]=function(){const _0x201ea0=_0x488b27,_0x4c52b4=_0x201ea0(0x201);this['_colorCache']=this[_0x201ea0(0x425)]||{};if(this['_colorCache'][_0x4c52b4])return this['_colorCache'][_0x4c52b4];const _0x410a14=VisuMZ[_0x201ea0(0x96f)]['Settings']['Color'][_0x201ea0(0x8aa)];return this['getColorDataFromPluginParameters'](_0x4c52b4,_0x410a14);},ColorManager[_0x488b27(0x411)]=function(_0x1593cd){const _0x22e0e3=_0x488b27;return VisuMZ[_0x22e0e3(0x96f)]['Settings'][_0x22e0e3(0x7f0)]['ActorHPColor'][_0x22e0e3(0x1dc)](this,_0x1593cd);},ColorManager[_0x488b27(0x60f)]=function(_0x16c19a){const _0x2dd3d2=_0x488b27;return VisuMZ[_0x2dd3d2(0x96f)][_0x2dd3d2(0x2f0)][_0x2dd3d2(0x7f0)][_0x2dd3d2(0x253)][_0x2dd3d2(0x1dc)](this,_0x16c19a);},ColorManager[_0x488b27(0x85c)]=function(_0x4cd1c7){const _0x58cac5=_0x488b27;return VisuMZ[_0x58cac5(0x96f)][_0x58cac5(0x2f0)][_0x58cac5(0x7f0)][_0x58cac5(0x3c7)][_0x58cac5(0x1dc)](this,_0x4cd1c7);},ColorManager['paramchangeTextColor']=function(_0x1e1423){const _0x3e6830=_0x488b27;return VisuMZ['CoreEngine'][_0x3e6830(0x2f0)][_0x3e6830(0x7f0)][_0x3e6830(0x649)]['call'](this,_0x1e1423);},ColorManager[_0x488b27(0x661)]=function(_0x4c2445){const _0x1da674=_0x488b27;return VisuMZ[_0x1da674(0x96f)][_0x1da674(0x2f0)][_0x1da674(0x7f0)]['DamageColor'][_0x1da674(0x1dc)](this,_0x4c2445);},ColorManager[_0x488b27(0x675)]=function(){const _0x83540f=_0x488b27;return VisuMZ[_0x83540f(0x96f)]['Settings'][_0x83540f(0x7f0)][_0x83540f(0x34b)];},ColorManager[_0x488b27(0x2a8)]=function(){const _0xcd7013=_0x488b27;return VisuMZ['CoreEngine']['Settings'][_0xcd7013(0x7f0)]['OutlineColorDmg']||_0xcd7013(0x5f2);},ColorManager['outlineColorGauge']=function(){const _0x4ae6c7=_0x488b27;return VisuMZ[_0x4ae6c7(0x96f)]['Settings'][_0x4ae6c7(0x7f0)]['OutlineColorGauge']||_0x4ae6c7(0x7c0);},ColorManager[_0x488b27(0x32c)]=function(){const _0x4d3a5e=_0x488b27;return VisuMZ[_0x4d3a5e(0x96f)][_0x4d3a5e(0x2f0)][_0x4d3a5e(0x7f0)]['DimColor1'];},ColorManager[_0x488b27(0x7a9)]=function(){const _0x36cb61=_0x488b27;return VisuMZ['CoreEngine'][_0x36cb61(0x2f0)][_0x36cb61(0x7f0)][_0x36cb61(0x375)];},ColorManager[_0x488b27(0x264)]=function(){const _0x495a38=_0x488b27;return VisuMZ[_0x495a38(0x96f)][_0x495a38(0x2f0)][_0x495a38(0x7f0)]['ItemBackColor1'];},ColorManager[_0x488b27(0x892)]=function(){const _0x2e2418=_0x488b27;return VisuMZ[_0x2e2418(0x96f)][_0x2e2418(0x2f0)]['Color'][_0x2e2418(0x2fa)];},SceneManager[_0x488b27(0x5a6)]=[],SceneManager['isSceneBattle']=function(){const _0x50ce62=_0x488b27;return this[_0x50ce62(0x51f)]&&this[_0x50ce62(0x51f)][_0x50ce62(0x7d6)]===Scene_Battle;},SceneManager[_0x488b27(0x69a)]=function(){const _0x23a32e=_0x488b27;return this[_0x23a32e(0x51f)]&&this[_0x23a32e(0x51f)][_0x23a32e(0x7d6)]===Scene_Map;},SceneManager[_0x488b27(0x776)]=function(){const _0x377f78=_0x488b27;return this[_0x377f78(0x51f)]&&this[_0x377f78(0x51f)]instanceof Scene_Map;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x99a)]=SceneManager['initialize'],SceneManager['initialize']=function(){const _0x3fc984=_0x488b27;VisuMZ[_0x3fc984(0x96f)][_0x3fc984(0x99a)][_0x3fc984(0x1dc)](this),this['initVisuMZCoreEngine']();},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x4b1)]=SceneManager['onKeyDown'],SceneManager[_0x488b27(0x6e6)]=function(_0x3a7b8f){const _0x543e6d=_0x488b27;if($gameTemp)this['onKeyDownKeysF6F7'](_0x3a7b8f);VisuMZ[_0x543e6d(0x96f)]['SceneManager_onKeyDown'][_0x543e6d(0x1dc)](this,_0x3a7b8f);},SceneManager['onKeyDownKeysF6F7']=function(_0x1279cb){const _0x5ef9ec=_0x488b27;if(!_0x1279cb[_0x5ef9ec(0x2c4)]&&!_0x1279cb[_0x5ef9ec(0x8f3)])switch(_0x1279cb['keyCode']){case 0x52:this[_0x5ef9ec(0x360)]();break;case 0x54:this['playTestShiftT']();break;case 0x75:this[_0x5ef9ec(0x3ca)]();break;case 0x76:if(Input[_0x5ef9ec(0x25a)](_0x5ef9ec(0x3b1))||Input[_0x5ef9ec(0x25a)](_0x5ef9ec(0x1fe)))return;this[_0x5ef9ec(0x8f0)]();break;}else{if(_0x1279cb[_0x5ef9ec(0x2c4)]){let _0x2167df=_0x1279cb[_0x5ef9ec(0x4e7)];if(_0x2167df>=0x31&&_0x2167df<=0x39){const _0x1e788a=_0x2167df-0x30;return SceneManager[_0x5ef9ec(0x506)](_0x1e788a);}else{if(_0x2167df>=0x61&&_0x2167df<=0x69){const _0x5b8465=_0x2167df-0x60;return SceneManager[_0x5ef9ec(0x506)](_0x5b8465);}}}}},SceneManager[_0x488b27(0x3ca)]=function(){const _0x53b508=_0x488b27;if($gameTemp[_0x53b508(0x3ba)]()&&VisuMZ[_0x53b508(0x96f)][_0x53b508(0x2f0)]['QoL'][_0x53b508(0x806)]){ConfigManager['seVolume']!==0x0?(ConfigManager[_0x53b508(0x600)]=0x0,ConfigManager[_0x53b508(0x313)]=0x0,ConfigManager[_0x53b508(0x5f4)]=0x0,ConfigManager[_0x53b508(0x4a5)]=0x0):(ConfigManager[_0x53b508(0x600)]=0x64,ConfigManager[_0x53b508(0x313)]=0x64,ConfigManager['meVolume']=0x64,ConfigManager[_0x53b508(0x4a5)]=0x64);ConfigManager['save']();if(this[_0x53b508(0x51f)][_0x53b508(0x7d6)]===Scene_Options){if(this[_0x53b508(0x51f)][_0x53b508(0x1da)])this[_0x53b508(0x51f)][_0x53b508(0x1da)][_0x53b508(0x26f)]();if(this[_0x53b508(0x51f)][_0x53b508(0x3f3)])this[_0x53b508(0x51f)]['_listWindow'][_0x53b508(0x26f)]();}}},SceneManager['playTestF7']=function(){const _0x2378cb=_0x488b27;$gameTemp['isPlaytest']()&&VisuMZ[_0x2378cb(0x96f)][_0x2378cb(0x2f0)][_0x2378cb(0x59f)][_0x2378cb(0x729)]&&($gameTemp['_playTestFastMode']=!$gameTemp[_0x2378cb(0x5b5)]);},SceneManager[_0x488b27(0x360)]=function(){const _0x4bd54c=_0x488b27;if(!VisuMZ[_0x4bd54c(0x96f)][_0x4bd54c(0x2f0)][_0x4bd54c(0x59f)][_0x4bd54c(0x4ac)])return;if(!$gameTemp[_0x4bd54c(0x3ba)]())return;if(!SceneManager['isSceneBattle']())return;if(!Input['isPressed'](_0x4bd54c(0x3b1)))return;for(const _0x1d66dd of $gameParty[_0x4bd54c(0x204)]()){if(!_0x1d66dd)continue;_0x1d66dd[_0x4bd54c(0x4e2)]();}},SceneManager[_0x488b27(0x1e8)]=function(){const _0x5c07fe=_0x488b27;if(!VisuMZ[_0x5c07fe(0x96f)][_0x5c07fe(0x2f0)]['QoL'][_0x5c07fe(0x6ce)])return;if(!$gameTemp[_0x5c07fe(0x3ba)]())return;if(!SceneManager[_0x5c07fe(0x5e5)]())return;if(!Input[_0x5c07fe(0x25a)](_0x5c07fe(0x3b1)))return;for(const _0x3170d0 of $gameParty['members']()){if(!_0x3170d0)continue;_0x3170d0[_0x5c07fe(0x51c)](_0x3170d0['maxTp']());}},SceneManager[_0x488b27(0x506)]=function(_0x36e7d4){const _0x10b9a1=_0x488b27;if(!$gameTemp[_0x10b9a1(0x3ba)]())return;if(!DataManager['savefileInfo'](_0x36e7d4))return;if(!(VisuMZ[_0x10b9a1(0x96f)]['Settings'][_0x10b9a1(0x59f)][_0x10b9a1(0x805)]??!![]))return;this[_0x10b9a1(0x64c)](Scene_QuickLoad),this[_0x10b9a1(0x672)](_0x36e7d4);},SceneManager[_0x488b27(0x8f7)]=function(){const _0x3bc254=_0x488b27;this[_0x3bc254(0x2bd)]=![],this[_0x3bc254(0x249)]=!VisuMZ[_0x3bc254(0x96f)][_0x3bc254(0x2f0)]['UI'][_0x3bc254(0x875)];},SceneManager[_0x488b27(0x812)]=function(_0x3a9f31){const _0x557011=_0x488b27;VisuMZ[_0x557011(0x96f)][_0x557011(0x2f0)]['UI']['SideButtons']&&(this[_0x557011(0x2bd)]=_0x3a9f31);},SceneManager[_0x488b27(0x508)]=function(){const _0x12994a=_0x488b27;return this[_0x12994a(0x2bd)];},SceneManager[_0x488b27(0x4df)]=function(){return this['_hideButtons'];},SceneManager[_0x488b27(0x3a8)]=function(){const _0x19d744=_0x488b27;return this[_0x19d744(0x508)]();},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x581)]=SceneManager[_0x488b27(0x388)],SceneManager[_0x488b27(0x388)]=function(){const _0x235be4=_0x488b27;return VisuMZ[_0x235be4(0x96f)]['Settings'][_0x235be4(0x59f)][_0x235be4(0x7ce)]?VisuMZ['CoreEngine'][_0x235be4(0x581)]['call'](this):!![];},SceneManager[_0x488b27(0x4ec)]=function(_0x47283a){const _0x486244=_0x488b27;if(_0x47283a instanceof Error)this[_0x486244(0x451)](_0x47283a);else _0x47283a instanceof Array&&_0x47283a[0x0]===_0x486244(0x6b7)?this[_0x486244(0x791)](_0x47283a):this[_0x486244(0x3c9)](_0x47283a);this[_0x486244(0x69e)]();},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x6fd)]=BattleManager['processEscape'],BattleManager['processEscape']=function(){const _0x46d234=_0x488b27;return VisuMZ[_0x46d234(0x96f)]['Settings'][_0x46d234(0x59f)]['EscapeAlways']?this[_0x46d234(0x423)]():VisuMZ[_0x46d234(0x96f)][_0x46d234(0x6fd)]['call'](this);},BattleManager[_0x488b27(0x423)]=function(){const _0x116fb5=_0x488b27;return $gameParty[_0x116fb5(0x5bf)](),SoundManager[_0x116fb5(0x81d)](),this['onEscapeSuccess'](),!![];},BattleManager[_0x488b27(0x8b9)]=function(){const _0x450393=_0x488b27;return $gameSystem[_0x450393(0x586)]()>=0x1;},BattleManager['isActiveTpb']=function(){const _0x2fd824=_0x488b27;return $gameSystem[_0x2fd824(0x586)]()===0x1;},VisuMZ[_0x488b27(0x96f)]['Game_Temp_initialize']=Game_Temp[_0x488b27(0x523)][_0x488b27(0x285)],Game_Temp[_0x488b27(0x523)]['initialize']=function(){const _0x1b9775=_0x488b27;VisuMZ['CoreEngine'][_0x1b9775(0x433)]['call'](this),this[_0x1b9775(0x479)](),this[_0x1b9775(0x8a3)](),this[_0x1b9775(0x228)]();},Game_Temp[_0x488b27(0x523)][_0x488b27(0x479)]=function(){const _0x4f7469=_0x488b27;VisuMZ[_0x4f7469(0x96f)][_0x4f7469(0x2f0)][_0x4f7469(0x59f)][_0x4f7469(0x48d)]&&(this[_0x4f7469(0x634)]=![]);},Game_Temp[_0x488b27(0x523)]['setLastPluginCommandInterpreter']=function(_0x3843ca){const _0x5d7ef5=_0x488b27;this[_0x5d7ef5(0x6e5)]=_0x3843ca;},Game_Temp[_0x488b27(0x523)][_0x488b27(0x935)]=function(){const _0x3aae96=_0x488b27;return this[_0x3aae96(0x6e5)];},Game_Temp[_0x488b27(0x523)][_0x488b27(0x2fb)]=function(){const _0x53b657=_0x488b27;this[_0x53b657(0x829)]=undefined,this[_0x53b657(0x8f2)]=undefined,this[_0x53b657(0x538)]=undefined;},Game_Temp[_0x488b27(0x523)]['applyForcedGameTroopSettingsCoreEngine']=function(_0x25a147){const _0x1cd0c1=_0x488b27;$gameMap&&$dataMap&&$dataMap[_0x1cd0c1(0x74d)]&&this[_0x1cd0c1(0x524)]($dataMap[_0x1cd0c1(0x74d)]);const _0x21159e=$dataTroops[_0x25a147];if(_0x21159e){let _0x322925=DataManager[_0x1cd0c1(0x3bc)](_0x21159e['id']);this[_0x1cd0c1(0x524)](_0x322925);}},Game_Temp[_0x488b27(0x523)][_0x488b27(0x524)]=function(_0x3da453){const _0x41c60f=_0x488b27;if(!_0x3da453)return;if(_0x3da453[_0x41c60f(0x426)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x41c60f(0x829)]='FV';else{if(_0x3da453[_0x41c60f(0x426)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x41c60f(0x829)]='SV';else{if(_0x3da453[_0x41c60f(0x426)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x2382f2=String(RegExp['$1']);if(_0x2382f2[_0x41c60f(0x426)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x41c60f(0x829)]='FV';else _0x2382f2[_0x41c60f(0x426)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x41c60f(0x829)]='SV');}}}if(_0x3da453[_0x41c60f(0x426)](/<(?:DTB)>/i))this['_forcedBattleSys']=0x0;else{if(_0x3da453[_0x41c60f(0x426)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x41c60f(0x8f2)]=0x1;else{if(_0x3da453[_0x41c60f(0x426)](/<(?:TPB|ATB)[ ]WAIT>/i))this['_forcedBattleSys']=0x2;else{if(_0x3da453[_0x41c60f(0x426)](/<(?:TPB|ATB)>/i))this[_0x41c60f(0x8f2)]=0x2;else{if(_0x3da453[_0x41c60f(0x426)](/<(?:CTB)>/i))Imported[_0x41c60f(0x5d0)]&&(this[_0x41c60f(0x8f2)]='CTB');else{if(_0x3da453['match'](/<(?:STB)>/i))Imported[_0x41c60f(0x307)]&&(this[_0x41c60f(0x8f2)]=_0x41c60f(0x6df));else{if(_0x3da453[_0x41c60f(0x426)](/<(?:BTB)>/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this['_forcedBattleSys']=_0x41c60f(0x379));else{if(_0x3da453[_0x41c60f(0x426)](/<(?:FTB)>/i))Imported[_0x41c60f(0x757)]&&(this[_0x41c60f(0x8f2)]='FTB');else{if(_0x3da453['match'](/<(?:OTB)>/i))Imported[_0x41c60f(0x2ac)]&&(this[_0x41c60f(0x8f2)]='OTB');else{if(_0x3da453[_0x41c60f(0x426)](/<(?:ETB)>/i))Imported[_0x41c60f(0x2ba)]&&(this['_forcedBattleSys']='ETB');else{if(_0x3da453[_0x41c60f(0x426)](/<(?:PTB)>/i))Imported[_0x41c60f(0x643)]&&(this['_forcedBattleSys']=_0x41c60f(0x947));else{if(_0x3da453[_0x41c60f(0x426)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0xdf73f8=String(RegExp['$1']);if(_0xdf73f8[_0x41c60f(0x426)](/DTB/i))this[_0x41c60f(0x8f2)]=0x0;else{if(_0xdf73f8[_0x41c60f(0x426)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x41c60f(0x8f2)]=0x1;else{if(_0xdf73f8[_0x41c60f(0x426)](/(?:TPB|ATB)[ ]WAIT/i))this['_forcedBattleSys']=0x2;else{if(_0xdf73f8[_0x41c60f(0x426)](/CTB/i))Imported[_0x41c60f(0x5d0)]&&(this[_0x41c60f(0x8f2)]=_0x41c60f(0x47f));else{if(_0xdf73f8[_0x41c60f(0x426)](/STB/i))Imported[_0x41c60f(0x307)]&&(this[_0x41c60f(0x8f2)]=_0x41c60f(0x6df));else{if(_0xdf73f8['match'](/BTB/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this[_0x41c60f(0x8f2)]=_0x41c60f(0x379));else{if(_0xdf73f8[_0x41c60f(0x426)](/FTB/i))Imported[_0x41c60f(0x757)]&&(this[_0x41c60f(0x8f2)]=_0x41c60f(0x864));else{if(_0xdf73f8[_0x41c60f(0x426)](/OTB/i))Imported[_0x41c60f(0x2ac)]&&(this[_0x41c60f(0x8f2)]=_0x41c60f(0x2e6));else{if(_0xdf73f8[_0x41c60f(0x426)](/ETB/i))Imported[_0x41c60f(0x2ba)]&&(this[_0x41c60f(0x8f2)]=_0x41c60f(0x85f));else _0xdf73f8[_0x41c60f(0x426)](/PTB/i)&&(Imported[_0x41c60f(0x643)]&&(this[_0x41c60f(0x8f2)]=_0x41c60f(0x947)));}}}}}}}}}}}}}}}}}}}}if(_0x3da453['match'](/<(?:|BATTLE )GRID>/i))this[_0x41c60f(0x538)]=!![];else _0x3da453['match'](/<NO (?:|BATTLE )GRID>/i)&&(this[_0x41c60f(0x538)]=![]);},Game_Temp[_0x488b27(0x523)][_0x488b27(0x8a3)]=function(){const _0x4b4b55=_0x488b27;this[_0x4b4b55(0x2b3)]=[];},Game_Temp[_0x488b27(0x523)][_0x488b27(0x7f5)]=function(_0x519081,_0x424188,_0x7dee28,_0x3678f6){const _0x5f4c30=_0x488b27;if(!this[_0x5f4c30(0x2a9)]())return;_0x7dee28=_0x7dee28||![],_0x3678f6=_0x3678f6||![];if($dataAnimations[_0x424188]){const _0x14543f={'targets':_0x519081,'animationId':_0x424188,'mirror':_0x7dee28,'mute':_0x3678f6};this[_0x5f4c30(0x2b3)]['push'](_0x14543f);for(const _0x48c451 of _0x519081){_0x48c451[_0x5f4c30(0x63f)]&&_0x48c451[_0x5f4c30(0x63f)]();}}},Game_Temp['prototype'][_0x488b27(0x2a9)]=function(){return!![];},Game_Temp[_0x488b27(0x523)][_0x488b27(0x73d)]=function(){const _0x3774f4=_0x488b27;return this[_0x3774f4(0x2b3)][_0x3774f4(0x3b1)]();},Game_Temp[_0x488b27(0x523)]['createPointAnimationQueue']=function(){const _0x221d77=_0x488b27;this[_0x221d77(0x986)]=[];},Game_Temp[_0x488b27(0x523)][_0x488b27(0x42e)]=function(_0x2b126a,_0x284811,_0x153876,_0x20d017,_0xe90798){const _0x44eccf=_0x488b27;if(!this[_0x44eccf(0x50b)]())return;_0x20d017=_0x20d017||![],_0xe90798=_0xe90798||![];if($dataAnimations[_0x153876]){const _0x54fe94={'x':_0x2b126a,'y':_0x284811,'animationId':_0x153876,'mirror':_0x20d017,'mute':_0xe90798};this[_0x44eccf(0x986)][_0x44eccf(0x64c)](_0x54fe94);}},Game_Temp['prototype'][_0x488b27(0x50b)]=function(){return!![];},Game_Temp[_0x488b27(0x523)][_0x488b27(0x69d)]=function(){const _0x5c50be=_0x488b27;return this['_pointAnimationQueue'][_0x5c50be(0x3b1)]();},VisuMZ[_0x488b27(0x96f)]['Game_System_initialize']=Game_System[_0x488b27(0x523)][_0x488b27(0x285)],Game_System['prototype']['initialize']=function(){const _0x1d74e9=_0x488b27;VisuMZ[_0x1d74e9(0x96f)][_0x1d74e9(0x8bb)]['call'](this),this[_0x1d74e9(0x53f)]();},Game_System[_0x488b27(0x523)][_0x488b27(0x53f)]=function(){const _0x1ad394=_0x488b27;this[_0x1ad394(0x20f)]={'SideView':$dataSystem[_0x1ad394(0x5dc)],'BattleSystem':this[_0x1ad394(0x511)](),'FontSize':$dataSystem[_0x1ad394(0x7cb)][_0x1ad394(0x810)],'Padding':0xc};},Game_System[_0x488b27(0x523)][_0x488b27(0x3b9)]=function(){const _0x286001=_0x488b27;if($gameTemp['_forcedTroopView']==='SV')return!![];else{if($gameTemp[_0x286001(0x829)]==='FV')return![];}if(this[_0x286001(0x20f)]===undefined)this[_0x286001(0x53f)]();if(this[_0x286001(0x20f)]['SideView']===undefined)this[_0x286001(0x53f)]();return this['_CoreEngineSettings']['SideView'];},Game_System[_0x488b27(0x523)][_0x488b27(0x98b)]=function(_0x472c73){const _0x4ec30d=_0x488b27;if(this['_CoreEngineSettings']===undefined)this[_0x4ec30d(0x53f)]();if(this['_CoreEngineSettings']['SideView']===undefined)this[_0x4ec30d(0x53f)]();this[_0x4ec30d(0x20f)][_0x4ec30d(0x617)]=_0x472c73;},Game_System['prototype'][_0x488b27(0x82f)]=function(){const _0xdb43b6=_0x488b27;if(this[_0xdb43b6(0x20f)]===undefined)this[_0xdb43b6(0x53f)]();this[_0xdb43b6(0x20f)][_0xdb43b6(0x21f)]=this['initialBattleSystem']();},Game_System[_0x488b27(0x523)][_0x488b27(0x511)]=function(){const _0x2eaa5c=_0x488b27,_0x5941d8=(VisuMZ[_0x2eaa5c(0x96f)][_0x2eaa5c(0x2f0)][_0x2eaa5c(0x21f)]||_0x2eaa5c(0x401))[_0x2eaa5c(0x991)]()[_0x2eaa5c(0x667)]();return VisuMZ['CoreEngine'][_0x2eaa5c(0x1d8)](_0x5941d8);},Game_System[_0x488b27(0x523)][_0x488b27(0x586)]=function(){const _0x504b5e=_0x488b27;if($gameTemp[_0x504b5e(0x8f2)]!==undefined)return $gameTemp[_0x504b5e(0x8f2)];if(this['_CoreEngineSettings']===undefined)this[_0x504b5e(0x53f)]();if(this[_0x504b5e(0x20f)][_0x504b5e(0x21f)]===undefined)this[_0x504b5e(0x82f)]();return this[_0x504b5e(0x20f)][_0x504b5e(0x21f)];},Game_System['prototype'][_0x488b27(0x2ab)]=function(_0x42dbe6){const _0x2b5057=_0x488b27;if(this[_0x2b5057(0x20f)]===undefined)this[_0x2b5057(0x53f)]();if(this[_0x2b5057(0x20f)][_0x2b5057(0x21f)]===undefined)this[_0x2b5057(0x82f)]();this[_0x2b5057(0x20f)]['BattleSystem']=_0x42dbe6;},Game_System[_0x488b27(0x523)][_0x488b27(0x832)]=function(){const _0x368504=_0x488b27;if(this[_0x368504(0x20f)]===undefined)this[_0x368504(0x53f)]();if(this[_0x368504(0x20f)][_0x368504(0x8ce)]===undefined)this[_0x368504(0x53f)]();return this[_0x368504(0x20f)][_0x368504(0x8ce)];},Game_System['prototype']['setMainFontSize']=function(_0x5d527e){const _0x51e7dc=_0x488b27;if(this[_0x51e7dc(0x20f)]===undefined)this[_0x51e7dc(0x53f)]();if(this[_0x51e7dc(0x20f)]['TimeProgress']===undefined)this['initCoreEngine']();this['_CoreEngineSettings'][_0x51e7dc(0x8ce)]=_0x5d527e;},Game_System['prototype']['windowPadding']=function(){const _0x298caa=_0x488b27;if(this['_CoreEngineSettings']===undefined)this[_0x298caa(0x53f)]();if(this[_0x298caa(0x20f)][_0x298caa(0x1ed)]===undefined)this['initCoreEngine']();return this[_0x298caa(0x20f)][_0x298caa(0x1ed)];},Game_System[_0x488b27(0x523)][_0x488b27(0x61b)]=function(_0x5ea5cb){const _0x698340=_0x488b27;if(this[_0x698340(0x20f)]===undefined)this['initCoreEngine']();if(this[_0x698340(0x20f)][_0x698340(0x4da)]===undefined)this[_0x698340(0x53f)]();this[_0x698340(0x20f)][_0x698340(0x1ed)]=_0x5ea5cb;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x703)]=Game_Screen[_0x488b27(0x523)][_0x488b27(0x285)],Game_Screen[_0x488b27(0x523)][_0x488b27(0x285)]=function(){const _0x2d0039=_0x488b27;VisuMZ[_0x2d0039(0x96f)][_0x2d0039(0x703)][_0x2d0039(0x1dc)](this),this[_0x2d0039(0x2d7)]();},Game_Screen['prototype'][_0x488b27(0x2d7)]=function(){const _0x264078=_0x488b27,_0x2565e6=VisuMZ[_0x264078(0x96f)][_0x264078(0x2f0)][_0x264078(0x544)];this[_0x264078(0x952)]=_0x2565e6?.[_0x264078(0x58c)]||'random';},Game_Screen[_0x488b27(0x523)][_0x488b27(0x648)]=function(){const _0x5e67b8=_0x488b27;if(this['_coreEngineShakeStyle']===undefined)this[_0x5e67b8(0x2d7)]();return this[_0x5e67b8(0x952)];},Game_Screen[_0x488b27(0x523)]['setCoreEngineScreenShakeStyle']=function(_0x4091bc){const _0x5f278b=_0x488b27;if(this['_coreEngineShakeStyle']===undefined)this[_0x5f278b(0x2d7)]();this[_0x5f278b(0x952)]=_0x4091bc['toLowerCase']()[_0x5f278b(0x667)]();},Game_Picture['prototype'][_0x488b27(0x5db)]=function(){const _0x36fe30=_0x488b27;if($gameParty['inBattle']())return![];return this[_0x36fe30(0x1fb)]()&&this[_0x36fe30(0x1fb)]()[_0x36fe30(0x6a7)](0x0)==='!';},Game_Picture[_0x488b27(0x523)]['onlyfilename']=function(){const _0xfb493c=_0x488b27;return this['_name'][_0xfb493c(0x2a2)]('/')['pop']();},VisuMZ['CoreEngine']['Game_Picture_x']=Game_Picture[_0x488b27(0x523)]['x'],Game_Picture['prototype']['x']=function(){const _0x17ec27=_0x488b27;return this['isMapScrollLinked']()?this[_0x17ec27(0x3ee)]():VisuMZ[_0x17ec27(0x96f)][_0x17ec27(0x252)][_0x17ec27(0x1dc)](this);},Game_Picture['prototype'][_0x488b27(0x3ee)]=function(){const _0xd02372=_0x488b27,_0x4478d4=$gameMap[_0xd02372(0x6c7)]()*$gameMap['tileWidth']();return(this['_x']-_0x4478d4)*$gameScreen[_0xd02372(0x4fa)]();},VisuMZ['CoreEngine'][_0x488b27(0x580)]=Game_Picture['prototype']['y'],Game_Picture[_0x488b27(0x523)]['y']=function(){const _0x279355=_0x488b27;return this[_0x279355(0x5db)]()?this[_0x279355(0x9a0)]():VisuMZ[_0x279355(0x96f)][_0x279355(0x580)][_0x279355(0x1dc)](this);},Game_Picture[_0x488b27(0x523)]['yScrollLinkedOffset']=function(){const _0x1ef648=_0x488b27,_0x314166=$gameMap[_0x1ef648(0x5cd)]()*$gameMap[_0x1ef648(0x821)]();return(this['_y']-_0x314166)*$gameScreen['zoomScale']();},VisuMZ[_0x488b27(0x96f)]['Game_Picture_scaleX']=Game_Picture[_0x488b27(0x523)][_0x488b27(0x541)],Game_Picture[_0x488b27(0x523)][_0x488b27(0x541)]=function(){const _0x3f13fd=_0x488b27;let _0x3c9f92=VisuMZ[_0x3f13fd(0x96f)]['Game_Picture_scaleX'][_0x3f13fd(0x1dc)](this);return this[_0x3f13fd(0x5db)]()&&(_0x3c9f92*=$gameScreen[_0x3f13fd(0x4fa)]()),_0x3c9f92;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x71b)]=Game_Picture['prototype'][_0x488b27(0x871)],Game_Picture[_0x488b27(0x523)]['scaleY']=function(){const _0x50a206=_0x488b27;let _0x1ddd9a=VisuMZ[_0x50a206(0x96f)][_0x50a206(0x71b)][_0x50a206(0x1dc)](this);return this[_0x50a206(0x5db)]()&&(_0x1ddd9a*=$gameScreen[_0x50a206(0x4fa)]()),_0x1ddd9a;},Game_Picture['prototype'][_0x488b27(0x33b)]=function(_0x246c90){this['_coreEasingType']=_0x246c90;},VisuMZ['CoreEngine']['Game_Picture_calcEasing']=Game_Picture[_0x488b27(0x523)][_0x488b27(0x929)],Game_Picture['prototype'][_0x488b27(0x929)]=function(_0x51533e){const _0x3c2ab9=_0x488b27;return this[_0x3c2ab9(0x5a8)]=this[_0x3c2ab9(0x5a8)]||0x0,[0x0,0x1,0x2,0x3]['includes'](this[_0x3c2ab9(0x5a8)])?VisuMZ[_0x3c2ab9(0x96f)][_0x3c2ab9(0x3e2)][_0x3c2ab9(0x1dc)](this,_0x51533e):VisuMZ[_0x3c2ab9(0x41f)](_0x51533e,this[_0x3c2ab9(0x5a8)]);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x29a)]=Game_Picture['prototype'][_0x488b27(0x467)],Game_Picture[_0x488b27(0x523)][_0x488b27(0x467)]=function(){const _0x52166f=_0x488b27;VisuMZ['CoreEngine']['Game_Picture_initRotation'][_0x52166f(0x1dc)](this),this['initRotationCoreEngine']();},Game_Picture[_0x488b27(0x523)][_0x488b27(0x67a)]=function(){const _0x1c6058=_0x488b27;this[_0x1c6058(0x1f6)]={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x1c6058(0x781)};},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x98c)]=Game_Picture[_0x488b27(0x523)][_0x488b27(0x8b0)],Game_Picture[_0x488b27(0x523)][_0x488b27(0x8b0)]=function(){const _0x1dc0d9=_0x488b27;let _0x2fb499=VisuMZ[_0x1dc0d9(0x96f)][_0x1dc0d9(0x98c)][_0x1dc0d9(0x1dc)](this);return _0x2fb499+=this['anglePlus'](),_0x2fb499;},Game_Picture[_0x488b27(0x523)]['anglePlus']=function(){const _0x10f0ff=_0x488b27;if(this[_0x10f0ff(0x1f6)]===undefined)this[_0x10f0ff(0x67a)]();return this[_0x10f0ff(0x1f6)]['current']||0x0;},Game_Picture[_0x488b27(0x523)]['setAnglePlusData']=function(_0x532e44,_0x213ac6,_0x268a7b){const _0x44e0f2=_0x488b27;if(this[_0x44e0f2(0x1f6)]===undefined)this[_0x44e0f2(0x67a)]();this[_0x44e0f2(0x1f6)][_0x44e0f2(0x8b2)]=_0x532e44||0x0,this['_anglePlus'][_0x44e0f2(0x1cf)]=_0x213ac6||0x0,this[_0x44e0f2(0x1f6)][_0x44e0f2(0x88b)]=_0x213ac6||0x0,this[_0x44e0f2(0x1f6)][_0x44e0f2(0x29f)]=_0x268a7b||_0x44e0f2(0x781),_0x213ac6<=0x0&&(this[_0x44e0f2(0x1f6)][_0x44e0f2(0x207)]=this[_0x44e0f2(0x1f6)][_0x44e0f2(0x8b2)]);},Game_Picture['prototype'][_0x488b27(0x3fd)]=function(_0x20d1c8,_0x52ce18,_0x45b947){const _0x2983c0=_0x488b27;if(this[_0x2983c0(0x1f6)]===undefined)this[_0x2983c0(0x67a)]();this['_anglePlus']['target']+=_0x20d1c8||0x0,this['_anglePlus']['duration']=_0x52ce18||0x0,this[_0x2983c0(0x1f6)][_0x2983c0(0x88b)]=_0x52ce18||0x0,this[_0x2983c0(0x1f6)][_0x2983c0(0x29f)]=_0x45b947||_0x2983c0(0x781),_0x52ce18<=0x0&&(this[_0x2983c0(0x1f6)][_0x2983c0(0x207)]=this[_0x2983c0(0x1f6)][_0x2983c0(0x8b2)]);},VisuMZ[_0x488b27(0x96f)]['Game_Picture_updateRotation']=Game_Picture[_0x488b27(0x523)][_0x488b27(0x382)],Game_Picture[_0x488b27(0x523)][_0x488b27(0x382)]=function(){const _0xc7b1f5=_0x488b27;VisuMZ['CoreEngine'][_0xc7b1f5(0x587)][_0xc7b1f5(0x1dc)](this),this['updateAnglePlus']();},Game_Picture['prototype']['updateAnglePlus']=function(){const _0x33762d=_0x488b27;if(this[_0x33762d(0x1f6)]===undefined)this['initRotationCoreEngine']();const _0x476f76=this[_0x33762d(0x1f6)];if(_0x476f76[_0x33762d(0x1cf)]<=0x0)return;_0x476f76['current']=this['applyEasingAnglePlus'](_0x476f76['current'],_0x476f76['target']),_0x476f76[_0x33762d(0x1cf)]--,_0x476f76[_0x33762d(0x1cf)]<=0x0&&(_0x476f76[_0x33762d(0x207)]=_0x476f76['target']);},Game_Picture[_0x488b27(0x523)][_0x488b27(0x6c2)]=function(_0x2e84b5,_0x223691){const _0x2f759c=_0x488b27,_0x191f6c=this['_anglePlus'],_0x4a6d22=_0x191f6c['easingType'],_0x11f358=_0x191f6c['duration'],_0x1f467f=_0x191f6c[_0x2f759c(0x88b)],_0x38296d=VisuMZ['ApplyEasing']((_0x1f467f-_0x11f358)/_0x1f467f,_0x4a6d22),_0x2328af=VisuMZ[_0x2f759c(0x41f)]((_0x1f467f-_0x11f358+0x1)/_0x1f467f,_0x4a6d22),_0x5d9a6d=(_0x2e84b5-_0x223691*_0x38296d)/(0x1-_0x38296d);return _0x5d9a6d+(_0x223691-_0x5d9a6d)*_0x2328af;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x8d1)]=Game_Action[_0x488b27(0x523)][_0x488b27(0x4c2)],Game_Action[_0x488b27(0x523)]['itemHit']=function(_0x280616){const _0x4cff60=_0x488b27;return VisuMZ[_0x4cff60(0x96f)]['Settings'][_0x4cff60(0x59f)][_0x4cff60(0x2d6)]?this['itemHitImprovedAccuracy'](_0x280616):VisuMZ[_0x4cff60(0x96f)][_0x4cff60(0x8d1)][_0x4cff60(0x1dc)](this,_0x280616);},Game_Action[_0x488b27(0x523)][_0x488b27(0x346)]=function(_0x160210){const _0x380ff2=_0x488b27,_0x36884a=this[_0x380ff2(0x3a3)](_0x160210),_0x1c366a=this[_0x380ff2(0x4c8)](_0x160210),_0x39c333=this[_0x380ff2(0x830)](_0x160210);return _0x36884a*(_0x1c366a-_0x39c333);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x96a)]=Game_Action[_0x488b27(0x523)][_0x488b27(0x498)],Game_Action[_0x488b27(0x523)][_0x488b27(0x498)]=function(_0x4cabf5){const _0x19c649=_0x488b27;return VisuMZ[_0x19c649(0x96f)][_0x19c649(0x2f0)][_0x19c649(0x59f)][_0x19c649(0x2d6)]?0x0:VisuMZ[_0x19c649(0x96f)][_0x19c649(0x96a)][_0x19c649(0x1dc)](this,_0x4cabf5);},Game_Action[_0x488b27(0x523)]['itemSuccessRate']=function(_0x540daa){const _0x110bc7=_0x488b27;return this['item']()[_0x110bc7(0x3e4)]*0.01;},Game_Action[_0x488b27(0x523)][_0x488b27(0x4c8)]=function(_0x4df0df){const _0x3a9cb6=_0x488b27;if(VisuMZ['CoreEngine']['Settings'][_0x3a9cb6(0x59f)][_0x3a9cb6(0x75f)]&&this[_0x3a9cb6(0x26c)]())return 0x1;return this[_0x3a9cb6(0x21c)]()?VisuMZ[_0x3a9cb6(0x96f)][_0x3a9cb6(0x2f0)][_0x3a9cb6(0x59f)]['AccuracyBoost']&&this[_0x3a9cb6(0x976)]()[_0x3a9cb6(0x1f5)]()?this[_0x3a9cb6(0x976)]()[_0x3a9cb6(0x5d9)]+0.05:this[_0x3a9cb6(0x976)]()[_0x3a9cb6(0x5d9)]:0x1;},Game_Action[_0x488b27(0x523)][_0x488b27(0x830)]=function(_0x4ddf96){const _0x17d6e9=_0x488b27;if(this[_0x17d6e9(0x976)]()[_0x17d6e9(0x1f5)]()===_0x4ddf96[_0x17d6e9(0x1f5)]())return 0x0;if(this[_0x17d6e9(0x21c)]())return VisuMZ[_0x17d6e9(0x96f)][_0x17d6e9(0x2f0)]['QoL'][_0x17d6e9(0x75f)]&&_0x4ddf96[_0x17d6e9(0x231)]()?_0x4ddf96[_0x17d6e9(0x1f8)]-0.05:_0x4ddf96[_0x17d6e9(0x1f8)];else return this[_0x17d6e9(0x2ec)]()?_0x4ddf96['mev']:0x0;},VisuMZ['CoreEngine']['Game_Action_updateLastTarget']=Game_Action[_0x488b27(0x523)][_0x488b27(0x2b2)],Game_Action[_0x488b27(0x523)][_0x488b27(0x2b2)]=function(_0x1c35c0){const _0x282ede=_0x488b27;VisuMZ[_0x282ede(0x96f)][_0x282ede(0x70d)][_0x282ede(0x1dc)](this,_0x1c35c0);if(VisuMZ[_0x282ede(0x96f)][_0x282ede(0x2f0)]['QoL']['ImprovedAccuracySystem'])return;const _0x50c526=_0x1c35c0['result']();_0x50c526['missed']&&(0x1-this[_0x282ede(0x498)](_0x1c35c0)>this[_0x282ede(0x4c2)](_0x1c35c0)&&(_0x50c526[_0x282ede(0x8a7)]=![],_0x50c526[_0x282ede(0x501)]=!![]));},VisuMZ['CoreEngine'][_0x488b27(0x626)]=Game_BattlerBase[_0x488b27(0x523)]['initMembers'],Game_BattlerBase[_0x488b27(0x523)][_0x488b27(0x75e)]=function(){const _0x1c08a1=_0x488b27;this[_0x1c08a1(0x7fc)]={},VisuMZ['CoreEngine']['Game_BattlerBase_initMembers'][_0x1c08a1(0x1dc)](this);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x99c)]=Game_BattlerBase[_0x488b27(0x523)][_0x488b27(0x26f)],Game_BattlerBase[_0x488b27(0x523)][_0x488b27(0x26f)]=function(){const _0x5c0973=_0x488b27;this['_cache']={},VisuMZ[_0x5c0973(0x96f)][_0x5c0973(0x99c)][_0x5c0973(0x1dc)](this);},Game_BattlerBase[_0x488b27(0x523)][_0x488b27(0x66e)]=function(_0x182754){const _0x5e0a46=_0x488b27;return this[_0x5e0a46(0x7fc)]=this[_0x5e0a46(0x7fc)]||{},this[_0x5e0a46(0x7fc)][_0x182754]!==undefined;},Game_BattlerBase[_0x488b27(0x523)]['paramPlus']=function(_0x216c40){const _0x3803b9=_0x488b27,_0x5d01fe=(_0x3e97bc,_0x15247b)=>{const _0x54cc97=_0x597b;if(!_0x15247b)return _0x3e97bc;if(_0x15247b['note'][_0x54cc97(0x426)](VisuMZ[_0x54cc97(0x96f)]['RegExp']['paramPlus'][_0x216c40])){var _0x26bae9=Number(RegExp['$1']);_0x3e97bc+=_0x26bae9;}if(_0x15247b[_0x54cc97(0x74d)]['match'](VisuMZ[_0x54cc97(0x96f)]['RegExp'][_0x54cc97(0x352)][_0x216c40])){var _0x583869=String(RegExp['$1']);try{_0x3e97bc+=eval(_0x583869);}catch(_0x5ac7c3){if($gameTemp['isPlaytest']())console[_0x54cc97(0x337)](_0x5ac7c3);}}return _0x3e97bc;};return this[_0x3803b9(0x7f4)]()[_0x3803b9(0x456)](_0x5d01fe,this['_paramPlus'][_0x216c40]);},Game_BattlerBase['prototype'][_0x488b27(0x5d7)]=function(_0x1aed4f){const _0x21d09c=_0x488b27;var _0x473947=_0x21d09c(0x300)+(this[_0x21d09c(0x1f5)]()?_0x21d09c(0x85b):_0x21d09c(0x31e))+_0x21d09c(0x743)+_0x1aed4f;if(this[_0x21d09c(0x66e)](_0x473947))return this[_0x21d09c(0x7fc)][_0x473947];this[_0x21d09c(0x7fc)][_0x473947]=eval(VisuMZ[_0x21d09c(0x96f)][_0x21d09c(0x2f0)][_0x21d09c(0x945)][_0x473947]);const _0x4713fb=(_0x5236fd,_0x401c8f)=>{const _0x1f132d=_0x21d09c;if(!_0x401c8f)return _0x5236fd;if(_0x401c8f[_0x1f132d(0x74d)][_0x1f132d(0x426)](VisuMZ['CoreEngine'][_0x1f132d(0x3f1)][_0x1f132d(0x5d7)][_0x1aed4f])){var _0x3958b6=Number(RegExp['$1']);if(_0x3958b6===0x0)_0x3958b6=Number[_0x1f132d(0x6cb)];_0x5236fd=Math['max'](_0x5236fd,_0x3958b6);}if(_0x401c8f['note'][_0x1f132d(0x426)](VisuMZ['CoreEngine']['RegExp'][_0x1f132d(0x2f8)][_0x1aed4f])){var _0x4ad14c=String(RegExp['$1']);try{_0x5236fd=Math[_0x1f132d(0x3c0)](_0x5236fd,Number(eval(_0x4ad14c)));}catch(_0x19467f){if($gameTemp[_0x1f132d(0x3ba)]())console['log'](_0x19467f);}}return _0x5236fd;};if(this[_0x21d09c(0x7fc)][_0x473947]===0x0)this[_0x21d09c(0x7fc)][_0x473947]=Number[_0x21d09c(0x6cb)];return this[_0x21d09c(0x7fc)][_0x473947]=this[_0x21d09c(0x7f4)]()['reduce'](_0x4713fb,this[_0x21d09c(0x7fc)][_0x473947]),this[_0x21d09c(0x7fc)][_0x473947];},Game_BattlerBase[_0x488b27(0x523)][_0x488b27(0x5ea)]=function(_0x3abd30){const _0x20de6d=_0x488b27,_0x4a0cc4=this[_0x20de6d(0x255)](Game_BattlerBase[_0x20de6d(0x959)],_0x3abd30),_0x5ad618=(_0x21786b,_0x178b3e)=>{const _0x4ba8d6=_0x20de6d;if(!_0x178b3e)return _0x21786b;if(_0x178b3e[_0x4ba8d6(0x74d)][_0x4ba8d6(0x426)](VisuMZ[_0x4ba8d6(0x96f)][_0x4ba8d6(0x3f1)][_0x4ba8d6(0x5cf)][_0x3abd30])){var _0x74e794=Number(RegExp['$1'])/0x64;_0x21786b*=_0x74e794;}if(_0x178b3e['note'][_0x4ba8d6(0x426)](VisuMZ[_0x4ba8d6(0x96f)][_0x4ba8d6(0x3f1)]['paramRate2'][_0x3abd30])){var _0x74e794=Number(RegExp['$1']);_0x21786b*=_0x74e794;}if(_0x178b3e['note'][_0x4ba8d6(0x426)](VisuMZ[_0x4ba8d6(0x96f)][_0x4ba8d6(0x3f1)][_0x4ba8d6(0x8cc)][_0x3abd30])){var _0x3e0242=String(RegExp['$1']);try{_0x21786b*=eval(_0x3e0242);}catch(_0x349eec){if($gameTemp[_0x4ba8d6(0x3ba)]())console[_0x4ba8d6(0x337)](_0x349eec);}}return _0x21786b;};return this[_0x20de6d(0x7f4)]()[_0x20de6d(0x456)](_0x5ad618,_0x4a0cc4);},Game_BattlerBase[_0x488b27(0x523)][_0x488b27(0x596)]=function(_0x2547a0){const _0x5927c6=_0x488b27,_0x309a9d=(_0xab5d0c,_0x1b0491)=>{const _0xca5c5a=_0x597b;if(!_0x1b0491)return _0xab5d0c;if(_0x1b0491['note'][_0xca5c5a(0x426)](VisuMZ[_0xca5c5a(0x96f)][_0xca5c5a(0x3f1)][_0xca5c5a(0x222)][_0x2547a0])){var _0x5bebb1=Number(RegExp['$1']);_0xab5d0c+=_0x5bebb1;}if(_0x1b0491[_0xca5c5a(0x74d)][_0xca5c5a(0x426)](VisuMZ[_0xca5c5a(0x96f)]['RegExp'][_0xca5c5a(0x797)][_0x2547a0])){var _0x18afc0=String(RegExp['$1']);try{_0xab5d0c+=eval(_0x18afc0);}catch(_0x336899){if($gameTemp['isPlaytest']())console['log'](_0x336899);}}return _0xab5d0c;};return this[_0x5927c6(0x7f4)]()['reduce'](_0x309a9d,0x0);},Game_BattlerBase['prototype'][_0x488b27(0x707)]=function(_0x127ecd){const _0x22b2c4=_0x488b27;let _0x2a4666=_0x22b2c4(0x707)+_0x127ecd+_0x22b2c4(0x46c);if(this[_0x22b2c4(0x66e)](_0x2a4666))return this[_0x22b2c4(0x7fc)][_0x2a4666];return this[_0x22b2c4(0x7fc)][_0x2a4666]=Math[_0x22b2c4(0x4fd)](VisuMZ[_0x22b2c4(0x96f)][_0x22b2c4(0x2f0)][_0x22b2c4(0x945)][_0x22b2c4(0x7cd)]['call'](this,_0x127ecd)),this[_0x22b2c4(0x7fc)][_0x2a4666];},Game_BattlerBase[_0x488b27(0x523)][_0x488b27(0x2ca)]=function(_0x71a7bb){const _0x541b49=_0x488b27,_0x48cbb3=(_0x5bca43,_0x1f2f2a)=>{const _0x34fe81=_0x597b;if(!_0x1f2f2a)return _0x5bca43;if(_0x1f2f2a[_0x34fe81(0x74d)][_0x34fe81(0x426)](VisuMZ[_0x34fe81(0x96f)][_0x34fe81(0x3f1)][_0x34fe81(0x7c1)][_0x71a7bb])){var _0x5ef693=Number(RegExp['$1'])/0x64;_0x5bca43+=_0x5ef693;}if(_0x1f2f2a['note'][_0x34fe81(0x426)](VisuMZ[_0x34fe81(0x96f)]['RegExp'][_0x34fe81(0x711)][_0x71a7bb])){var _0x5ef693=Number(RegExp['$1']);_0x5bca43+=_0x5ef693;}if(_0x1f2f2a['note']['match'](VisuMZ[_0x34fe81(0x96f)]['RegExp'][_0x34fe81(0x5eb)][_0x71a7bb])){var _0x1e7b0b=String(RegExp['$1']);try{_0x5bca43+=eval(_0x1e7b0b);}catch(_0x92d3ea){if($gameTemp[_0x34fe81(0x3ba)]())console[_0x34fe81(0x337)](_0x92d3ea);}}return _0x5bca43;};return this[_0x541b49(0x7f4)]()[_0x541b49(0x456)](_0x48cbb3,0x0);},Game_BattlerBase[_0x488b27(0x523)]['xparamRate']=function(_0x3a8747){const _0x4aa3ef=_0x488b27,_0x3c5d68=(_0xdb4dea,_0x567136)=>{const _0x55c113=_0x597b;if(!_0x567136)return _0xdb4dea;if(_0x567136[_0x55c113(0x74d)]['match'](VisuMZ[_0x55c113(0x96f)]['RegExp']['xparamRate1'][_0x3a8747])){var _0x526b5e=Number(RegExp['$1'])/0x64;_0xdb4dea*=_0x526b5e;}if(_0x567136[_0x55c113(0x74d)][_0x55c113(0x426)](VisuMZ[_0x55c113(0x96f)][_0x55c113(0x3f1)][_0x55c113(0x42b)][_0x3a8747])){var _0x526b5e=Number(RegExp['$1']);_0xdb4dea*=_0x526b5e;}if(_0x567136['note'][_0x55c113(0x426)](VisuMZ['CoreEngine']['RegExp'][_0x55c113(0x2b8)][_0x3a8747])){var _0x1a3c06=String(RegExp['$1']);try{_0xdb4dea*=eval(_0x1a3c06);}catch(_0x43e479){if($gameTemp[_0x55c113(0x3ba)]())console['log'](_0x43e479);}}return _0xdb4dea;};return this[_0x4aa3ef(0x7f4)]()['reduce'](_0x3c5d68,0x1);},Game_BattlerBase[_0x488b27(0x523)][_0x488b27(0x482)]=function(_0x526191){const _0x4947d0=_0x488b27,_0x2a1311=(_0x1a8413,_0x15d6a9)=>{const _0x382941=_0x597b;if(!_0x15d6a9)return _0x1a8413;if(_0x15d6a9[_0x382941(0x74d)][_0x382941(0x426)](VisuMZ[_0x382941(0x96f)][_0x382941(0x3f1)][_0x382941(0x56f)][_0x526191])){var _0x50631a=Number(RegExp['$1'])/0x64;_0x1a8413+=_0x50631a;}if(_0x15d6a9[_0x382941(0x74d)][_0x382941(0x426)](VisuMZ['CoreEngine'][_0x382941(0x3f1)][_0x382941(0x787)][_0x526191])){var _0x50631a=Number(RegExp['$1']);_0x1a8413+=_0x50631a;}if(_0x15d6a9['note'][_0x382941(0x426)](VisuMZ['CoreEngine']['RegExp'][_0x382941(0x691)][_0x526191])){var _0x5866ee=String(RegExp['$1']);try{_0x1a8413+=eval(_0x5866ee);}catch(_0x43fbe8){if($gameTemp[_0x382941(0x3ba)]())console['log'](_0x43fbe8);}}return _0x1a8413;};return this[_0x4947d0(0x7f4)]()[_0x4947d0(0x456)](_0x2a1311,0x0);},Game_BattlerBase['prototype'][_0x488b27(0x6d0)]=function(_0xffdbc3){const _0x20254c=_0x488b27;let _0x2e3e0b=_0x20254c(0x6d0)+_0xffdbc3+_0x20254c(0x46c);if(this[_0x20254c(0x66e)](_0x2e3e0b))return this[_0x20254c(0x7fc)][_0x2e3e0b];return this['_cache'][_0x2e3e0b]=VisuMZ[_0x20254c(0x96f)][_0x20254c(0x2f0)][_0x20254c(0x945)][_0x20254c(0x809)][_0x20254c(0x1dc)](this,_0xffdbc3),this[_0x20254c(0x7fc)][_0x2e3e0b];},Game_BattlerBase[_0x488b27(0x523)][_0x488b27(0x293)]=function(_0x326329){const _0x5316c5=_0x488b27,_0x5d26ae=(_0x21d0c6,_0xd915d8)=>{const _0x3adf9f=_0x597b;if(!_0xd915d8)return _0x21d0c6;if(_0xd915d8[_0x3adf9f(0x74d)][_0x3adf9f(0x426)](VisuMZ[_0x3adf9f(0x96f)][_0x3adf9f(0x3f1)][_0x3adf9f(0x303)][_0x326329])){var _0xe4bccf=Number(RegExp['$1'])/0x64;_0x21d0c6+=_0xe4bccf;}if(_0xd915d8[_0x3adf9f(0x74d)][_0x3adf9f(0x426)](VisuMZ[_0x3adf9f(0x96f)][_0x3adf9f(0x3f1)][_0x3adf9f(0x2f2)][_0x326329])){var _0xe4bccf=Number(RegExp['$1']);_0x21d0c6+=_0xe4bccf;}if(_0xd915d8['note'][_0x3adf9f(0x426)](VisuMZ[_0x3adf9f(0x96f)][_0x3adf9f(0x3f1)][_0x3adf9f(0x78a)][_0x326329])){var _0x58e666=String(RegExp['$1']);try{_0x21d0c6+=eval(_0x58e666);}catch(_0x5caea9){if($gameTemp[_0x3adf9f(0x3ba)]())console[_0x3adf9f(0x337)](_0x5caea9);}}return _0x21d0c6;};return this[_0x5316c5(0x7f4)]()[_0x5316c5(0x456)](_0x5d26ae,0x0);},Game_BattlerBase[_0x488b27(0x523)][_0x488b27(0x8ec)]=function(_0x2119d6){const _0x658ad2=_0x488b27,_0x3ee258=(_0x437c5c,_0x392c95)=>{const _0x269de0=_0x597b;if(!_0x392c95)return _0x437c5c;if(_0x392c95[_0x269de0(0x74d)][_0x269de0(0x426)](VisuMZ[_0x269de0(0x96f)]['RegExp'][_0x269de0(0x32d)][_0x2119d6])){var _0x126561=Number(RegExp['$1'])/0x64;_0x437c5c*=_0x126561;}if(_0x392c95['note'][_0x269de0(0x426)](VisuMZ['CoreEngine'][_0x269de0(0x3f1)][_0x269de0(0x548)][_0x2119d6])){var _0x126561=Number(RegExp['$1']);_0x437c5c*=_0x126561;}if(_0x392c95[_0x269de0(0x74d)][_0x269de0(0x426)](VisuMZ['CoreEngine'][_0x269de0(0x3f1)][_0x269de0(0x376)][_0x2119d6])){var _0x3374a1=String(RegExp['$1']);try{_0x437c5c*=eval(_0x3374a1);}catch(_0x2bb85a){if($gameTemp[_0x269de0(0x3ba)]())console[_0x269de0(0x337)](_0x2bb85a);}}return _0x437c5c;};return this[_0x658ad2(0x7f4)]()[_0x658ad2(0x456)](_0x3ee258,0x1);},Game_BattlerBase[_0x488b27(0x523)][_0x488b27(0x567)]=function(_0x321f79){const _0x1c4547=_0x488b27,_0x5a9262=(_0x565403,_0x51a337)=>{const _0x546acc=_0x597b;if(!_0x51a337)return _0x565403;if(_0x51a337['note'][_0x546acc(0x426)](VisuMZ[_0x546acc(0x96f)][_0x546acc(0x3f1)][_0x546acc(0x7ef)][_0x321f79])){var _0x190c40=Number(RegExp['$1'])/0x64;_0x565403+=_0x190c40;}if(_0x51a337[_0x546acc(0x74d)][_0x546acc(0x426)](VisuMZ['CoreEngine'][_0x546acc(0x3f1)][_0x546acc(0x26a)][_0x321f79])){var _0x190c40=Number(RegExp['$1']);_0x565403+=_0x190c40;}if(_0x51a337[_0x546acc(0x74d)][_0x546acc(0x426)](VisuMZ[_0x546acc(0x96f)][_0x546acc(0x3f1)][_0x546acc(0x48f)][_0x321f79])){var _0x4d41af=String(RegExp['$1']);try{_0x565403+=eval(_0x4d41af);}catch(_0x58a7e5){if($gameTemp['isPlaytest']())console[_0x546acc(0x337)](_0x58a7e5);}}return _0x565403;};return this[_0x1c4547(0x7f4)]()[_0x1c4547(0x456)](_0x5a9262,0x0);},Game_BattlerBase[_0x488b27(0x523)]['sparam']=function(_0xdf749c){const _0x1e8beb=_0x488b27;let _0x353aea=_0x1e8beb(0x402)+_0xdf749c+'Total';if(this['checkCacheKey'](_0x353aea))return this[_0x1e8beb(0x7fc)][_0x353aea];return this['_cache'][_0x353aea]=VisuMZ[_0x1e8beb(0x96f)][_0x1e8beb(0x2f0)][_0x1e8beb(0x945)][_0x1e8beb(0x5a2)][_0x1e8beb(0x1dc)](this,_0xdf749c),this['_cache'][_0x353aea];},Game_BattlerBase[_0x488b27(0x523)][_0x488b27(0x47d)]=function(_0x4b732e,_0x2e015f){const _0xeff25c=_0x488b27;if(typeof paramId===_0xeff25c(0x727))return this[_0xeff25c(0x707)](_0x4b732e);_0x4b732e=String(_0x4b732e||'')[_0xeff25c(0x991)]();if(_0x4b732e===_0xeff25c(0x752))return this['param'](0x0);if(_0x4b732e===_0xeff25c(0x8c2))return this['param'](0x1);if(_0x4b732e===_0xeff25c(0x87d))return this[_0xeff25c(0x707)](0x2);if(_0x4b732e===_0xeff25c(0x30c))return this[_0xeff25c(0x707)](0x3);if(_0x4b732e===_0xeff25c(0x380))return this[_0xeff25c(0x707)](0x4);if(_0x4b732e===_0xeff25c(0x7f8))return this['param'](0x5);if(_0x4b732e==='AGI')return this[_0xeff25c(0x707)](0x6);if(_0x4b732e===_0xeff25c(0x54d))return this[_0xeff25c(0x707)](0x7);if(_0x4b732e===_0xeff25c(0x7f3))return _0x2e015f?String(Math[_0xeff25c(0x4fd)](this[_0xeff25c(0x6d0)](0x0)*0x64))+'%':this[_0xeff25c(0x6d0)](0x0);if(_0x4b732e===_0xeff25c(0x933))return _0x2e015f?String(Math['round'](this[_0xeff25c(0x6d0)](0x1)*0x64))+'%':this[_0xeff25c(0x6d0)](0x1);if(_0x4b732e===_0xeff25c(0x57f))return _0x2e015f?String(Math[_0xeff25c(0x4fd)](this[_0xeff25c(0x6d0)](0x2)*0x64))+'%':this[_0xeff25c(0x6d0)](0x2);if(_0x4b732e===_0xeff25c(0x8c6))return _0x2e015f?String(Math[_0xeff25c(0x4fd)](this['xparam'](0x3)*0x64))+'%':this['xparam'](0x3);if(_0x4b732e==='MEV')return _0x2e015f?String(Math[_0xeff25c(0x4fd)](this['xparam'](0x4)*0x64))+'%':this[_0xeff25c(0x6d0)](0x4);if(_0x4b732e===_0xeff25c(0x6c6))return _0x2e015f?String(Math[_0xeff25c(0x4fd)](this[_0xeff25c(0x6d0)](0x5)*0x64))+'%':this[_0xeff25c(0x6d0)](0x5);if(_0x4b732e===_0xeff25c(0x66b))return _0x2e015f?String(Math[_0xeff25c(0x4fd)](this['xparam'](0x6)*0x64))+'%':this[_0xeff25c(0x6d0)](0x6);if(_0x4b732e===_0xeff25c(0x8d8))return _0x2e015f?String(Math[_0xeff25c(0x4fd)](this[_0xeff25c(0x6d0)](0x7)*0x64))+'%':this[_0xeff25c(0x6d0)](0x7);if(_0x4b732e===_0xeff25c(0x383))return _0x2e015f?String(Math[_0xeff25c(0x4fd)](this['xparam'](0x8)*0x64))+'%':this[_0xeff25c(0x6d0)](0x8);if(_0x4b732e==='TRG')return _0x2e015f?String(Math['round'](this[_0xeff25c(0x6d0)](0x9)*0x64))+'%':this[_0xeff25c(0x6d0)](0x9);if(_0x4b732e===_0xeff25c(0x6cf))return _0x2e015f?String(Math['round'](this[_0xeff25c(0x402)](0x0)*0x64))+'%':this[_0xeff25c(0x402)](0x0);if(_0x4b732e==='GRD')return _0x2e015f?String(Math['round'](this[_0xeff25c(0x402)](0x1)*0x64))+'%':this[_0xeff25c(0x402)](0x1);if(_0x4b732e===_0xeff25c(0x24b))return _0x2e015f?String(Math[_0xeff25c(0x4fd)](this['sparam'](0x2)*0x64))+'%':this['sparam'](0x2);if(_0x4b732e===_0xeff25c(0x31b))return _0x2e015f?String(Math['round'](this['sparam'](0x3)*0x64))+'%':this[_0xeff25c(0x402)](0x3);if(_0x4b732e===_0xeff25c(0x254))return _0x2e015f?String(Math['round'](this[_0xeff25c(0x402)](0x4)*0x64))+'%':this[_0xeff25c(0x402)](0x4);if(_0x4b732e===_0xeff25c(0x460))return _0x2e015f?String(Math['round'](this[_0xeff25c(0x402)](0x5)*0x64))+'%':this[_0xeff25c(0x402)](0x5);if(_0x4b732e===_0xeff25c(0x932))return _0x2e015f?String(Math[_0xeff25c(0x4fd)](this[_0xeff25c(0x402)](0x6)*0x64))+'%':this[_0xeff25c(0x402)](0x6);if(_0x4b732e===_0xeff25c(0x722))return _0x2e015f?String(Math[_0xeff25c(0x4fd)](this[_0xeff25c(0x402)](0x7)*0x64))+'%':this[_0xeff25c(0x402)](0x7);if(_0x4b732e===_0xeff25c(0x93f))return _0x2e015f?String(Math[_0xeff25c(0x4fd)](this[_0xeff25c(0x402)](0x8)*0x64))+'%':this['sparam'](0x8);if(_0x4b732e==='EXR')return _0x2e015f?String(Math['round'](this[_0xeff25c(0x402)](0x9)*0x64))+'%':this['sparam'](0x9);if(VisuMZ[_0xeff25c(0x96f)][_0xeff25c(0x243)][_0x4b732e]){const _0x5d0a76=VisuMZ[_0xeff25c(0x96f)][_0xeff25c(0x243)][_0x4b732e],_0x5a3c7b=this[_0x5d0a76];return VisuMZ[_0xeff25c(0x96f)][_0xeff25c(0x88d)][_0x4b732e]===_0xeff25c(0x4f9)?_0x5a3c7b:_0x2e015f?String(Math[_0xeff25c(0x4fd)](_0x5a3c7b*0x64))+'%':_0x5a3c7b;}return'';},Game_BattlerBase['prototype']['isDying']=function(){const _0x35d651=_0x488b27;return this[_0x35d651(0x1d2)]()&&this[_0x35d651(0x7fb)]<this[_0x35d651(0x899)]*VisuMZ['CoreEngine'][_0x35d651(0x2f0)][_0x35d651(0x945)][_0x35d651(0x6e1)];},Game_Battler[_0x488b27(0x523)][_0x488b27(0x296)]=function(){const _0x2feb16=_0x488b27;SoundManager[_0x2feb16(0x3d1)](),this['requestMotion'](_0x2feb16(0x8fb));},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x342)]=Game_Actor[_0x488b27(0x523)][_0x488b27(0x94d)],Game_Actor[_0x488b27(0x523)][_0x488b27(0x94d)]=function(_0x20a484){const _0x1b0ecd=_0x488b27;if(this['level']>0x63)return this['paramBaseAboveLevel99'](_0x20a484);return VisuMZ[_0x1b0ecd(0x96f)][_0x1b0ecd(0x342)]['call'](this,_0x20a484);},Game_Actor[_0x488b27(0x523)]['paramBaseAboveLevel99']=function(_0x586a41){const _0x48fa2f=_0x488b27,_0x4add62=this['currentClass']()['params'][_0x586a41][0x63],_0x4f8ba1=this['currentClass']()[_0x48fa2f(0x369)][_0x586a41][0x62];return _0x4add62+(_0x4add62-_0x4f8ba1)*(this[_0x48fa2f(0x3a7)]-0x63);},VisuMZ['CoreEngine']['Game_Actor_changeClass']=Game_Actor[_0x488b27(0x523)][_0x488b27(0x503)],Game_Actor[_0x488b27(0x523)][_0x488b27(0x503)]=function(_0x13cafe,_0x404cdd){const _0xf8804a=_0x488b27;$gameTemp[_0xf8804a(0x1fd)]=!![],VisuMZ['CoreEngine']['Game_Actor_changeClass'][_0xf8804a(0x1dc)](this,_0x13cafe,_0x404cdd),$gameTemp[_0xf8804a(0x1fd)]=undefined;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x8b3)]=Game_Actor['prototype']['levelUp'],Game_Actor[_0x488b27(0x523)][_0x488b27(0x43b)]=function(){const _0x4f110f=_0x488b27;VisuMZ[_0x4f110f(0x96f)][_0x4f110f(0x8b3)][_0x4f110f(0x1dc)](this);if(!$gameTemp[_0x4f110f(0x1fd)])this[_0x4f110f(0x35b)]();},Game_Actor[_0x488b27(0x523)][_0x488b27(0x35b)]=function(){const _0x3bd9a2=_0x488b27;this['_cache']={};if(VisuMZ['CoreEngine']['Settings'][_0x3bd9a2(0x59f)][_0x3bd9a2(0x429)])this[_0x3bd9a2(0x7fb)]=this[_0x3bd9a2(0x899)];if(VisuMZ[_0x3bd9a2(0x96f)][_0x3bd9a2(0x2f0)]['QoL'][_0x3bd9a2(0x5b2)])this['_mp']=this[_0x3bd9a2(0x299)];},Game_Actor[_0x488b27(0x523)][_0x488b27(0x7ba)]=function(){const _0x57e805=_0x488b27;if(this[_0x57e805(0x322)]())return 0x1;const _0x301f01=this['nextLevelExp']()-this[_0x57e805(0x3a6)](),_0x190887=this[_0x57e805(0x30f)]()-this[_0x57e805(0x3a6)]();return(_0x190887/_0x301f01)[_0x57e805(0x424)](0x0,0x1);},Game_Actor[_0x488b27(0x523)][_0x488b27(0x7f4)]=function(){const _0x59a04d=_0x488b27,_0x30b321=Game_Battler[_0x59a04d(0x523)]['traitObjects'][_0x59a04d(0x1dc)](this);for(const _0x115ae5 of this[_0x59a04d(0x669)]()){_0x115ae5&&_0x30b321[_0x59a04d(0x64c)](_0x115ae5);}return _0x30b321['push'](this['currentClass'](),this['actor']()),_0x30b321;},Object[_0x488b27(0x566)](Game_Enemy[_0x488b27(0x523)],_0x488b27(0x3a7),{'get':function(){const _0x4c8c5a=_0x488b27;return this[_0x4c8c5a(0x60e)]();},'configurable':!![]}),Game_Enemy['prototype'][_0x488b27(0x60e)]=function(){const _0x61e15a=_0x488b27;return this['enemy']()[_0x61e15a(0x3a7)];},Game_Enemy[_0x488b27(0x523)][_0x488b27(0x58a)]=function(){const _0x308c2a=_0x488b27;!this['_repositioned']&&(this[_0x308c2a(0x7db)]+=Math[_0x308c2a(0x4fd)]((Graphics[_0x308c2a(0x512)]-0x270)/0x2),this[_0x308c2a(0x7db)]-=Math[_0x308c2a(0x979)]((Graphics[_0x308c2a(0x512)]-Graphics[_0x308c2a(0x3b3)])/0x2),$gameSystem['isSideView']()?this[_0x308c2a(0x571)]-=Math[_0x308c2a(0x979)]((Graphics['width']-Graphics[_0x308c2a(0x522)])/0x2):this[_0x308c2a(0x571)]+=Math['round']((Graphics['boxWidth']-0x330)/0x2)),this[_0x308c2a(0x305)]=!![];},Game_Party[_0x488b27(0x523)][_0x488b27(0x5e0)]=function(){const _0x3644f0=_0x488b27;return VisuMZ[_0x3644f0(0x96f)][_0x3644f0(0x2f0)][_0x3644f0(0x50a)][_0x3644f0(0x64d)];},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x49f)]=Game_Party[_0x488b27(0x523)]['consumeItem'],Game_Party[_0x488b27(0x523)][_0x488b27(0x91a)]=function(_0x154a67){const _0x54e9de=_0x488b27;if(VisuMZ['CoreEngine'][_0x54e9de(0x2f0)][_0x54e9de(0x59f)]['KeyItemProtect']&&DataManager[_0x54e9de(0x2ea)](_0x154a67))return;VisuMZ[_0x54e9de(0x96f)][_0x54e9de(0x49f)][_0x54e9de(0x1dc)](this,_0x154a67);},Game_Party[_0x488b27(0x523)][_0x488b27(0x577)]=function(){const _0x312ddf=_0x488b27,_0x1fa43e=VisuMZ[_0x312ddf(0x96f)][_0x312ddf(0x2f0)][_0x312ddf(0x59f)],_0x520698=_0x1fa43e['BTestAddedQuantity']??0x63;let _0x58fe2b=[];(_0x1fa43e['BTestItems']??!![])&&(_0x58fe2b=_0x58fe2b[_0x312ddf(0x980)]($dataItems));(_0x1fa43e[_0x312ddf(0x2c3)]??!![])&&(_0x58fe2b=_0x58fe2b['concat']($dataWeapons));(_0x1fa43e[_0x312ddf(0x961)]??!![])&&(_0x58fe2b=_0x58fe2b['concat']($dataArmors));for(const _0x1419e3 of _0x58fe2b){if(!_0x1419e3)continue;if(_0x1419e3[_0x312ddf(0x24c)][_0x312ddf(0x667)]()<=0x0)continue;if(_0x1419e3['name'][_0x312ddf(0x426)](/-----/i))continue;this[_0x312ddf(0x2ed)](_0x1419e3,_0x520698);}},VisuMZ['CoreEngine'][_0x488b27(0x6b1)]=Game_Troop[_0x488b27(0x523)]['setup'],Game_Troop[_0x488b27(0x523)]['setup']=function(_0x57347d){const _0x3f49a2=_0x488b27;$gameTemp[_0x3f49a2(0x2fb)](),$gameTemp[_0x3f49a2(0x5e1)](_0x57347d),VisuMZ[_0x3f49a2(0x96f)][_0x3f49a2(0x6b1)][_0x3f49a2(0x1dc)](this,_0x57347d);},VisuMZ['CoreEngine'][_0x488b27(0x77d)]=Game_Map[_0x488b27(0x523)][_0x488b27(0x748)],Game_Map[_0x488b27(0x523)][_0x488b27(0x748)]=function(_0x2c8901){const _0x653d95=_0x488b27;VisuMZ[_0x653d95(0x96f)]['Game_Map_setup']['call'](this,_0x2c8901),this['checkCoreEngineDisplayCenter'](),this['setupCoreEngine'](_0x2c8901),this['setupTileExtendTerrainTags']();},Game_Map[_0x488b27(0x523)]['setupCoreEngine']=function(){const _0x20a70e=_0x488b27;this[_0x20a70e(0x232)]=VisuMZ[_0x20a70e(0x96f)]['Settings']['QoL'][_0x20a70e(0x530)]||![];const _0x16bfe7=VisuMZ[_0x20a70e(0x96f)][_0x20a70e(0x2f0)][_0x20a70e(0x6e9)],_0x159c23=$dataMap?$dataMap[_0x20a70e(0x74d)]||'':'';if(_0x159c23[_0x20a70e(0x426)](/<SHOW TILE SHADOWS>/i))this[_0x20a70e(0x232)]=![];else _0x159c23['match'](/<HIDE TILE SHADOWS>/i)&&(this[_0x20a70e(0x232)]=!![]);if(_0x159c23[_0x20a70e(0x426)](/<SCROLL LOCK X>/i))this[_0x20a70e(0x77f)]()[_0x20a70e(0x2cb)]=!![],this[_0x20a70e(0x77f)]()['displayX']=_0x16bfe7['DisplayLockX'];else _0x159c23[_0x20a70e(0x426)](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x20a70e(0x77f)]()[_0x20a70e(0x2cb)]=!![],this[_0x20a70e(0x77f)]()[_0x20a70e(0x6c7)]=Number(RegExp['$1']));if(_0x159c23['match'](/<SCROLL LOCK Y>/i))this[_0x20a70e(0x77f)]()[_0x20a70e(0x27c)]=!![],this[_0x20a70e(0x77f)]()[_0x20a70e(0x5cd)]=_0x16bfe7['DisplayLockY'];else _0x159c23[_0x20a70e(0x426)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x20a70e(0x77f)]()['centerY']=!![],this['centerCameraCheckData']()[_0x20a70e(0x5cd)]=Number(RegExp['$1']));},Game_Map[_0x488b27(0x523)][_0x488b27(0x339)]=function(){const _0x148957=_0x488b27;if(this[_0x148957(0x232)]===undefined)this['setupCoreEngine']();return this['_hideTileShadows'];},Game_Map[_0x488b27(0x523)][_0x488b27(0x487)]=function(){const _0x37cca5=_0x488b27,_0x25749b=VisuMZ[_0x37cca5(0x96f)][_0x37cca5(0x2f0)][_0x37cca5(0x6e9)];this[_0x37cca5(0x744)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x25749b[_0x37cca5(0x377)]){const _0x5ec80e=Graphics[_0x37cca5(0x240)]/this[_0x37cca5(0x1c9)]();_0x5ec80e%0x1!==0x0&&Math[_0x37cca5(0x218)](_0x5ec80e)===this[_0x37cca5(0x240)]()&&!this[_0x37cca5(0x981)]()&&(this[_0x37cca5(0x744)]['centerX']=!![],this[_0x37cca5(0x744)][_0x37cca5(0x6c7)]=_0x25749b[_0x37cca5(0x886)]||0x0);}if(_0x25749b[_0x37cca5(0x59b)]){const _0x37c7b3=Graphics[_0x37cca5(0x512)]/this[_0x37cca5(0x821)]();_0x37c7b3%0x1!==0x0&&Math[_0x37cca5(0x218)](_0x37c7b3)===this['height']()&&!this[_0x37cca5(0x957)]()&&(this['_centerCameraCheck'][_0x37cca5(0x27c)]=!![],this[_0x37cca5(0x744)][_0x37cca5(0x5cd)]=_0x25749b[_0x37cca5(0x36c)]||0x0);}$gameScreen[_0x37cca5(0x4fa)]()===0x1&&(this[_0x37cca5(0x77f)]()['centerX']&&(this[_0x37cca5(0x4c1)]=this[_0x37cca5(0x77f)]()[_0x37cca5(0x6c7)]),this[_0x37cca5(0x77f)]()[_0x37cca5(0x27c)]&&(this[_0x37cca5(0x8a9)]=this[_0x37cca5(0x77f)]()[_0x37cca5(0x5cd)]));},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x5b1)]=Game_Map[_0x488b27(0x523)][_0x488b27(0x883)],Game_Map['prototype']['setDisplayPos']=function(_0x3f6d42,_0x3dbeef){const _0x59f876=_0x488b27;VisuMZ[_0x59f876(0x96f)][_0x59f876(0x5b1)][_0x59f876(0x1dc)](this,_0x3f6d42,_0x3dbeef),$gameScreen['zoomScale']()===0x1&&(!this[_0x59f876(0x981)]()&&this[_0x59f876(0x77f)]()[_0x59f876(0x2cb)]&&(this[_0x59f876(0x4c1)]=this['centerCameraCheckData']()['displayX']),!this[_0x59f876(0x957)]()&&this[_0x59f876(0x77f)]()[_0x59f876(0x27c)]&&(this[_0x59f876(0x8a9)]=this[_0x59f876(0x77f)]()[_0x59f876(0x5cd)]));},Game_Map['prototype'][_0x488b27(0x77f)]=function(){const _0x56da28=_0x488b27;if(this[_0x56da28(0x744)]===undefined)this[_0x56da28(0x487)]();return this[_0x56da28(0x744)];},VisuMZ['CoreEngine']['Game_Map_scrollDown']=Game_Map[_0x488b27(0x523)]['scrollDown'],Game_Map[_0x488b27(0x523)][_0x488b27(0x327)]=function(_0x52334d){const _0x261408=_0x488b27;if(this['centerCameraCheckData']()['centerY']&&$gameScreen[_0x261408(0x4fa)]()===0x1){this[_0x261408(0x8a9)]=this['centerCameraCheckData']()[_0x261408(0x5cd)];return;}VisuMZ['CoreEngine'][_0x261408(0x876)][_0x261408(0x1dc)](this,_0x52334d);},VisuMZ[_0x488b27(0x96f)]['Game_Map_scrollLeft']=Game_Map[_0x488b27(0x523)][_0x488b27(0x492)],Game_Map[_0x488b27(0x523)]['scrollLeft']=function(_0xe14d9e){const _0x1cb891=_0x488b27;if(this[_0x1cb891(0x77f)]()['centerX']&&$gameScreen[_0x1cb891(0x4fa)]()===0x1){this[_0x1cb891(0x4c1)]=this[_0x1cb891(0x77f)]()[_0x1cb891(0x6c7)];return;}VisuMZ[_0x1cb891(0x96f)]['Game_Map_scrollLeft'][_0x1cb891(0x1dc)](this,_0xe14d9e);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x68d)]=Game_Map['prototype'][_0x488b27(0x4a2)],Game_Map[_0x488b27(0x523)][_0x488b27(0x4a2)]=function(_0x3711d7){const _0x317870=_0x488b27;if(this[_0x317870(0x77f)]()[_0x317870(0x2cb)]&&$gameScreen[_0x317870(0x4fa)]()===0x1){this['_displayX']=this['centerCameraCheckData']()[_0x317870(0x6c7)];return;}VisuMZ['CoreEngine']['Game_Map_scrollRight'][_0x317870(0x1dc)](this,_0x3711d7);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x3ce)]=Game_Map[_0x488b27(0x523)][_0x488b27(0x5c6)],Game_Map[_0x488b27(0x523)][_0x488b27(0x5c6)]=function(_0x171b0e){const _0x5ef821=_0x488b27;if(this[_0x5ef821(0x77f)]()[_0x5ef821(0x27c)]&&$gameScreen['zoomScale']()===0x1){this[_0x5ef821(0x8a9)]=this[_0x5ef821(0x77f)]()['displayY'];return;}VisuMZ['CoreEngine']['Game_Map_scrollUp']['call'](this,_0x171b0e);},Game_Map[_0x488b27(0x523)][_0x488b27(0x476)]=function(){const _0x129bad=_0x488b27;this[_0x129bad(0x645)]={};const _0x46836a=this[_0x129bad(0x721)]();if(!_0x46836a)return{};const _0x382f0a=_0x46836a[_0x129bad(0x74d)]||'',_0x5181c3=/<(?:TALLER|EXT|EXTEND|RAISE)[ ]BY[ ](\d+):[ ](.*)>/gi;let _0x1eb470={};const _0x22d415=_0x382f0a[_0x129bad(0x426)](_0x5181c3);if(_0x22d415)for(const _0x5113c0 of _0x22d415){_0x5113c0[_0x129bad(0x426)](_0x5181c3);const _0x3f6864=Number(RegExp['$1'])[_0x129bad(0x424)](0x1,0x10),_0xc5b42e=String(RegExp['$2'])[_0x129bad(0x2a2)](',')[_0x129bad(0x8ba)](_0x1c9870=>Number(_0x1c9870)[_0x129bad(0x424)](0x1,0x7));for(const _0x27a52c of _0xc5b42e){_0x1eb470[_0x27a52c]=_0x3f6864;}}this[_0x129bad(0x645)]=_0x1eb470;},Game_Map['prototype'][_0x488b27(0x1c7)]=function(){const _0x2f80aa=_0x488b27;if(this[_0x2f80aa(0x645)]===undefined)this['setupTileExtendTerrainTags']();return this[_0x2f80aa(0x645)];},Game_Map['prototype'][_0x488b27(0x3f6)]=function(_0x1d9574){const _0x4dd57e=_0x488b27;if(_0x1d9574>=0x400)return![];const _0x24eb9d=$gameMap[_0x4dd57e(0x1c7)]();if(Object[_0x4dd57e(0x1d7)](_0x24eb9d)[_0x4dd57e(0x998)]<=0x0)return![];const _0x458ebc=this['tilesetFlags'](),_0x127fe2=_0x458ebc[_0x1d9574]>>0xc,_0x559320=_0x24eb9d[_0x127fe2]||0x0;return _0x559320>0x0;},VisuMZ['CoreEngine'][_0x488b27(0x844)]=Game_Map[_0x488b27(0x523)][_0x488b27(0x3b0)],Game_Map[_0x488b27(0x523)]['changeTileset']=function(_0x3c0c87){const _0x5ac772=_0x488b27;VisuMZ[_0x5ac772(0x96f)]['Game_Map_changeTileset']['call'](this,_0x3c0c87),this[_0x5ac772(0x657)](),SceneManager[_0x5ac772(0x51f)][_0x5ac772(0x724)][_0x5ac772(0x5f1)]();},Game_Map[_0x488b27(0x523)]['refreshSpritesetForExtendedTiles']=function(){const _0x3be627=_0x488b27,_0x59a269=this[_0x3be627(0x1c7)]();if(Object[_0x3be627(0x1d7)](_0x59a269)[_0x3be627(0x998)]<=0x0)return;const _0x588a7f=SceneManager[_0x3be627(0x51f)][_0x3be627(0x724)];_0x588a7f&&(_0x588a7f[_0x3be627(0x6a2)]&&_0x588a7f[_0x3be627(0x6a2)](),_0x588a7f['createTileExtendSprites']&&_0x588a7f[_0x3be627(0x702)]());},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x1c3)]=Game_Character[_0x488b27(0x523)][_0x488b27(0x857)],Game_Character[_0x488b27(0x523)][_0x488b27(0x857)]=function(_0x1dfda7){const _0x440368=_0x488b27;try{VisuMZ[_0x440368(0x96f)]['Game_Character_processMoveCommand'][_0x440368(0x1dc)](this,_0x1dfda7);}catch(_0x1d855d){if($gameTemp[_0x440368(0x3ba)]())console[_0x440368(0x337)](_0x1d855d);}},Game_Player[_0x488b27(0x523)][_0x488b27(0x48c)]=function(){const _0x482c10=_0x488b27,_0x5883b5=$gameMap[_0x482c10(0x4e8)]();this[_0x482c10(0x4e3)]=Math[_0x482c10(0x575)](_0x5883b5)+Math[_0x482c10(0x575)](_0x5883b5)+this[_0x482c10(0x872)]();},Game_Player[_0x488b27(0x523)][_0x488b27(0x872)]=function(){const _0x38a389=_0x488b27;return $dataMap&&$dataMap[_0x38a389(0x74d)]&&$dataMap['note']['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x38a389(0x96f)][_0x38a389(0x2f0)]['QoL'][_0x38a389(0x995)];},VisuMZ[_0x488b27(0x96f)]['Game_Event_isCollidedWithEvents']=Game_Event[_0x488b27(0x523)][_0x488b27(0x964)],Game_Event[_0x488b27(0x523)][_0x488b27(0x964)]=function(_0x5cc0bb,_0x96284a){const _0x3d534e=_0x488b27;return this[_0x3d534e(0x94a)]()?this['checkSmartEventCollision'](_0x5cc0bb,_0x96284a):VisuMZ[_0x3d534e(0x96f)][_0x3d534e(0x6b2)][_0x3d534e(0x1dc)](this,_0x5cc0bb,_0x96284a);},Game_Event[_0x488b27(0x523)]['isSmartEventCollisionOn']=function(){const _0x4dbc53=_0x488b27;return VisuMZ[_0x4dbc53(0x96f)][_0x4dbc53(0x2f0)][_0x4dbc53(0x59f)][_0x4dbc53(0x7b1)];},Game_Event['prototype']['checkSmartEventCollision']=function(_0x574b71,_0xc6fe47){const _0x1ec7cd=_0x488b27;if(!this[_0x1ec7cd(0x655)]())return![];else{const _0x1d8b0f=$gameMap['eventsXyNt'](_0x574b71,_0xc6fe47)[_0x1ec7cd(0x762)](_0x4ae780=>_0x4ae780[_0x1ec7cd(0x655)]());return _0x1d8b0f['length']>0x0;}},VisuMZ[_0x488b27(0x96f)]['Game_Interpreter_command105']=Game_Interpreter[_0x488b27(0x523)]['command105'],Game_Interpreter[_0x488b27(0x523)]['command105']=function(_0x4d027b){const _0x28d836=_0x488b27,_0xab7f53=this[_0x28d836(0x8c9)]();return _0xab7f53[_0x28d836(0x426)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x28d836(0x8ff)](_0xab7f53):VisuMZ[_0x28d836(0x96f)]['Game_Interpreter_command105']['call'](this,_0x4d027b);},Game_Interpreter[_0x488b27(0x523)][_0x488b27(0x8c9)]=function(){const _0x16b8a4=_0x488b27;let _0x204d0f='',_0x2d574b=this[_0x16b8a4(0x461)]+0x1;while(this[_0x16b8a4(0x4d8)][_0x2d574b]&&this[_0x16b8a4(0x4d8)][_0x2d574b][_0x16b8a4(0x789)]===0x195){_0x204d0f+=this[_0x16b8a4(0x4d8)][_0x2d574b]['parameters'][0x0]+'\x0a',_0x2d574b++;}return _0x204d0f;},Game_Interpreter[_0x488b27(0x523)][_0x488b27(0x8ff)]=function(_0x346dc7){const _0x33abcf=_0x488b27;try{eval(_0x346dc7);}catch(_0x48a63a){$gameTemp[_0x33abcf(0x3ba)]()&&(console[_0x33abcf(0x337)](_0x33abcf(0x457)),console[_0x33abcf(0x337)](_0x48a63a));}return!![];},VisuMZ['CoreEngine'][_0x488b27(0x934)]=Game_Interpreter[_0x488b27(0x523)][_0x488b27(0x81c)],Game_Interpreter[_0x488b27(0x523)]['command111']=function(_0x5aba08){const _0x430610=_0x488b27;try{VisuMZ[_0x430610(0x96f)]['Game_Interpreter_command111']['call'](this,_0x5aba08);}catch(_0xbf405a){$gameTemp[_0x430610(0x3ba)]()&&(console['log'](_0x430610(0x692)),console[_0x430610(0x337)](_0xbf405a)),this['skipBranch']();}return!![];},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x8be)]=Game_Interpreter['prototype'][_0x488b27(0x7e4)],Game_Interpreter[_0x488b27(0x523)][_0x488b27(0x7e4)]=function(_0x3241b8){const _0xae6a13=_0x488b27;try{VisuMZ[_0xae6a13(0x96f)]['Game_Interpreter_command122'][_0xae6a13(0x1dc)](this,_0x3241b8);}catch(_0x5200a5){$gameTemp['isPlaytest']()&&(console[_0xae6a13(0x337)](_0xae6a13(0x8e8)),console[_0xae6a13(0x337)](_0x5200a5));}return!![];},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x70e)]=Game_Interpreter[_0x488b27(0x523)][_0x488b27(0x2aa)],Game_Interpreter[_0x488b27(0x523)][_0x488b27(0x2aa)]=function(){const _0x249c9f=_0x488b27;try{VisuMZ[_0x249c9f(0x96f)][_0x249c9f(0x70e)]['call'](this);}catch(_0xf189d6){$gameTemp[_0x249c9f(0x3ba)]()&&(console[_0x249c9f(0x337)](_0x249c9f(0x82c)),console['log'](_0xf189d6));}return!![];},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x3d7)]=Game_Interpreter[_0x488b27(0x523)][_0x488b27(0x556)],Game_Interpreter[_0x488b27(0x523)]['command357']=function(_0x7f8f49){const _0x41d8c0=_0x488b27;return $gameTemp[_0x41d8c0(0x7c8)](this),VisuMZ[_0x41d8c0(0x96f)][_0x41d8c0(0x3d7)][_0x41d8c0(0x1dc)](this,_0x7f8f49);},Scene_Base['prototype'][_0x488b27(0x44e)]=function(){const _0x45b3ad=_0x488b27;return VisuMZ['CoreEngine'][_0x45b3ad(0x2f0)]['UI'][_0x45b3ad(0x943)];},Scene_Base['prototype']['isBottomHelpMode']=function(){const _0x4b5444=_0x488b27;return VisuMZ[_0x4b5444(0x96f)]['Settings']['UI'][_0x4b5444(0x22a)];},Scene_Base[_0x488b27(0x523)][_0x488b27(0x5c3)]=function(){const _0x247aa4=_0x488b27;return VisuMZ[_0x247aa4(0x96f)]['Settings']['UI']['BottomButtons'];},Scene_Base[_0x488b27(0x523)]['isRightInputMode']=function(){const _0x5dfd87=_0x488b27;return VisuMZ['CoreEngine']['Settings']['UI'][_0x5dfd87(0x477)];},Scene_Base[_0x488b27(0x523)][_0x488b27(0x95b)]=function(){const _0x1307b2=_0x488b27;return VisuMZ['CoreEngine'][_0x1307b2(0x2f0)]['UI'][_0x1307b2(0x365)];},Scene_Base[_0x488b27(0x523)][_0x488b27(0x1c6)]=function(){const _0x316aa3=_0x488b27;return VisuMZ[_0x316aa3(0x96f)][_0x316aa3(0x2f0)]['UI'][_0x316aa3(0x33a)];},Scene_Base[_0x488b27(0x523)][_0x488b27(0x937)]=function(){const _0x2046f9=_0x488b27;return VisuMZ[_0x2046f9(0x96f)][_0x2046f9(0x2f0)][_0x2046f9(0x8f6)][_0x2046f9(0x219)];},VisuMZ[_0x488b27(0x96f)]['Scene_Base_createWindowLayer']=Scene_Base[_0x488b27(0x523)]['createWindowLayer'],Scene_Base[_0x488b27(0x523)]['createWindowLayer']=function(){const _0x9c0cd4=_0x488b27;VisuMZ[_0x9c0cd4(0x96f)]['Scene_Base_createWindowLayer']['call'](this),this[_0x9c0cd4(0x749)](),this[_0x9c0cd4(0x3d3)](),this[_0x9c0cd4(0x4ba)]['x']=Math[_0x9c0cd4(0x4fd)](this[_0x9c0cd4(0x4ba)]['x']),this[_0x9c0cd4(0x4ba)]['y']=Math[_0x9c0cd4(0x4fd)](this[_0x9c0cd4(0x4ba)]['y']);},Scene_Base['prototype'][_0x488b27(0x749)]=function(){},Scene_Base['prototype'][_0x488b27(0x3d3)]=function(){const _0x1f0a3a=_0x488b27;this[_0x1f0a3a(0x281)]=new Window_TextPopup(),this[_0x1f0a3a(0x4d0)](this[_0x1f0a3a(0x281)]);},$textPopup=function(_0x5b83fd){const _0x161f74=_0x488b27,_0x2469fe=SceneManager['_scene']['_textPopupWindow'];_0x2469fe&&_0x2469fe[_0x161f74(0x922)](_0x5b83fd);},Scene_Base[_0x488b27(0x523)][_0x488b27(0x7fa)]=function(){const _0x37931f=_0x488b27;return TextManager[_0x37931f(0x680)](_0x37931f(0x910),'pagedown');},Scene_Base[_0x488b27(0x523)][_0x488b27(0x4d5)]=function(){const _0x29a579=_0x488b27;return TextManager[_0x29a579(0x855)](_0x29a579(0x2b6));},Scene_Base[_0x488b27(0x523)][_0x488b27(0x21a)]=function(){const _0x1a691a=_0x488b27;return TextManager[_0x1a691a(0x855)](_0x1a691a(0x3b1));},Scene_Base[_0x488b27(0x523)][_0x488b27(0x2b0)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base[_0x488b27(0x523)][_0x488b27(0x4cd)]=function(){const _0x10ab5e=_0x488b27;return TextManager[_0x10ab5e(0x855)](_0x10ab5e(0x407));},Scene_Base[_0x488b27(0x523)][_0x488b27(0x972)]=function(){const _0x2c8995=_0x488b27;return this[_0x2c8995(0x468)]&&this[_0x2c8995(0x468)]['visible']?TextManager['buttonAssistSwitch']:'';},Scene_Base[_0x488b27(0x523)][_0x488b27(0x732)]=function(){return'';},Scene_Base[_0x488b27(0x523)]['buttonAssistText3']=function(){return'';},Scene_Base[_0x488b27(0x523)][_0x488b27(0x7b5)]=function(){const _0x128e05=_0x488b27;return TextManager[_0x128e05(0x2d4)];},Scene_Base['prototype'][_0x488b27(0x62b)]=function(){const _0xa829be=_0x488b27;return TextManager[_0xa829be(0x949)];},Scene_Base[_0x488b27(0x523)][_0x488b27(0x605)]=function(){return 0x0;},Scene_Base[_0x488b27(0x523)]['buttonAssistOffset2']=function(){return 0x0;},Scene_Base[_0x488b27(0x523)]['buttonAssistOffset3']=function(){return 0x0;},Scene_Base['prototype'][_0x488b27(0x4cc)]=function(){return 0x0;},Scene_Base['prototype'][_0x488b27(0x730)]=function(){return 0x0;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x41d)]=Scene_Boot[_0x488b27(0x523)][_0x488b27(0x448)],Scene_Boot[_0x488b27(0x523)][_0x488b27(0x448)]=function(){const _0x1d62f4=_0x488b27;VisuMZ['CoreEngine'][_0x1d62f4(0x41d)][_0x1d62f4(0x1dc)](this),this['loadGameImagesCoreEngine']();},Scene_Boot[_0x488b27(0x523)]['loadGameImagesCoreEngine']=function(){const _0x451a28=_0x488b27,_0x58da9a=[_0x451a28(0x8a1),_0x451a28(0x637),'battlebacks2',_0x451a28(0x8d0),_0x451a28(0x3a2),_0x451a28(0x472),_0x451a28(0x474),_0x451a28(0x527),_0x451a28(0x2e3),_0x451a28(0x7b8),_0x451a28(0x333),_0x451a28(0x1f9),_0x451a28(0x3c2),'titles2'];for(const _0x10c23c of _0x58da9a){const _0x593a9f=VisuMZ[_0x451a28(0x96f)]['Settings'][_0x451a28(0x6bf)][_0x10c23c],_0x4bb88f=_0x451a28(0x63e)[_0x451a28(0x88c)](_0x10c23c);for(const _0x524419 of _0x593a9f){ImageManager[_0x451a28(0x94b)](_0x4bb88f,_0x524419);}}},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2c8)]=Scene_Boot[_0x488b27(0x523)][_0x488b27(0x29c)],Scene_Boot[_0x488b27(0x523)]['startNormalGame']=function(){const _0x5a9b02=_0x488b27;Utils[_0x5a9b02(0x7a2)]('test')&&VisuMZ[_0x5a9b02(0x96f)][_0x5a9b02(0x2f0)]['QoL'][_0x5a9b02(0x747)]?this[_0x5a9b02(0x56e)]():VisuMZ[_0x5a9b02(0x96f)][_0x5a9b02(0x2c8)][_0x5a9b02(0x1dc)](this);},Scene_Boot['prototype']['startAutoNewGame']=function(){const _0x21a629=_0x488b27;this[_0x21a629(0x82d)](),DataManager[_0x21a629(0x6f2)](),SceneManager['goto'](Scene_Map);},Scene_Boot[_0x488b27(0x523)][_0x488b27(0x96e)]=function(){const _0x2282e4=_0x488b27,_0x25582c=$dataSystem['advanced'][_0x2282e4(0x398)],_0x43029e=$dataSystem[_0x2282e4(0x7cb)][_0x2282e4(0x414)],_0x5b615b=VisuMZ['CoreEngine'][_0x2282e4(0x2f0)]['UI'][_0x2282e4(0x76a)];Graphics[_0x2282e4(0x522)]=_0x25582c-_0x5b615b*0x2,Graphics[_0x2282e4(0x3b3)]=_0x43029e-_0x5b615b*0x2,this[_0x2282e4(0x33e)]();},VisuMZ['CoreEngine'][_0x488b27(0x8bd)]=Scene_Boot[_0x488b27(0x523)][_0x488b27(0x50d)],Scene_Boot[_0x488b27(0x523)][_0x488b27(0x50d)]=function(){const _0x24c294=_0x488b27;this[_0x24c294(0x842)]()?this['makeDocumentTitle']():VisuMZ[_0x24c294(0x96f)][_0x24c294(0x8bd)][_0x24c294(0x1dc)](this);},Scene_Boot['prototype'][_0x488b27(0x842)]=function(){const _0x4978a8=_0x488b27;if(Scene_Title[_0x4978a8(0x7a4)]==='')return![];if(Scene_Title['subtitle']===_0x4978a8(0x4ca))return![];if(Scene_Title['version']==='')return![];if(Scene_Title['version']===_0x4978a8(0x6e2))return![];return!![];},Scene_Boot['prototype'][_0x488b27(0x318)]=function(){const _0x20b8ef=_0x488b27,_0x4e563a=$dataSystem[_0x20b8ef(0x777)],_0x38b617=Scene_Title[_0x20b8ef(0x7a4)]||'',_0x4b91be=Scene_Title[_0x20b8ef(0x5b9)]||'',_0x266ef8=VisuMZ[_0x20b8ef(0x96f)][_0x20b8ef(0x2f0)]['MenuLayout']['Title'][_0x20b8ef(0x210)],_0x17a08f=_0x266ef8[_0x20b8ef(0x88c)](_0x4e563a,_0x38b617,_0x4b91be);document[_0x20b8ef(0x688)]=_0x17a08f;},Scene_Boot['prototype']['determineSideButtonLayoutValid']=function(){const _0x329e40=_0x488b27;if(VisuMZ[_0x329e40(0x96f)]['Settings']['UI'][_0x329e40(0x958)]){const _0x255819=Graphics[_0x329e40(0x240)]-Graphics[_0x329e40(0x522)]-VisuMZ['CoreEngine'][_0x329e40(0x2f0)]['UI'][_0x329e40(0x76a)]*0x2,_0xfd672=Sprite_Button[_0x329e40(0x523)][_0x329e40(0x5e9)][_0x329e40(0x1dc)](this)*0x4;if(_0x255819>=_0xfd672)SceneManager['setSideButtonLayout'](!![]);}},Scene_Title[_0x488b27(0x7a4)]=VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)]['MenuLayout'][_0x488b27(0x8da)][_0x488b27(0x4ca)],Scene_Title[_0x488b27(0x5b9)]=VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)][_0x488b27(0x516)][_0x488b27(0x8da)]['Version'],Scene_Title[_0x488b27(0x235)]=VisuMZ['CoreEngine'][_0x488b27(0x2f0)]['TitlePicButtons'],VisuMZ[_0x488b27(0x96f)][_0x488b27(0x8cf)]=Scene_Title[_0x488b27(0x523)][_0x488b27(0x75c)],Scene_Title[_0x488b27(0x523)][_0x488b27(0x75c)]=function(){const _0x4f2bca=_0x488b27;VisuMZ[_0x4f2bca(0x96f)][_0x4f2bca(0x2f0)]['MenuLayout'][_0x4f2bca(0x8da)][_0x4f2bca(0x75c)]['call'](this);if(Scene_Title[_0x4f2bca(0x7a4)]!==''&&Scene_Title[_0x4f2bca(0x7a4)]!==_0x4f2bca(0x4ca))this[_0x4f2bca(0x2a0)]();if(Scene_Title[_0x4f2bca(0x5b9)]!==''&&Scene_Title['version']!==_0x4f2bca(0x6e2))this[_0x4f2bca(0x47b)]();},Scene_Title[_0x488b27(0x523)]['drawGameSubtitle']=function(){const _0x249be6=_0x488b27;VisuMZ[_0x249be6(0x96f)]['Settings'][_0x249be6(0x516)]['Title'][_0x249be6(0x2a0)]['call'](this);},Scene_Title[_0x488b27(0x523)]['drawGameVersion']=function(){const _0x370b13=_0x488b27;VisuMZ[_0x370b13(0x96f)][_0x370b13(0x2f0)][_0x370b13(0x516)][_0x370b13(0x8da)][_0x370b13(0x47b)][_0x370b13(0x1dc)](this);},Scene_Title['prototype'][_0x488b27(0x66d)]=function(){const _0x29b32c=_0x488b27;this['createTitleButtons']();const _0x323749=$dataSystem[_0x29b32c(0x602)][_0x29b32c(0x2bf)],_0x1be40c=this[_0x29b32c(0x362)]();this[_0x29b32c(0x38f)]=new Window_TitleCommand(_0x1be40c),this[_0x29b32c(0x38f)][_0x29b32c(0x83d)](_0x323749);const _0xb7e43b=this[_0x29b32c(0x362)]();this[_0x29b32c(0x38f)][_0x29b32c(0x763)](_0xb7e43b['x'],_0xb7e43b['y'],_0xb7e43b[_0x29b32c(0x240)],_0xb7e43b[_0x29b32c(0x512)]),this[_0x29b32c(0x38f)][_0x29b32c(0x8d2)](),this['_commandWindow'][_0x29b32c(0x26f)](),this[_0x29b32c(0x38f)][_0x29b32c(0x6ed)](),this[_0x29b32c(0x3f9)](this['_commandWindow']);},Scene_Title[_0x488b27(0x523)][_0x488b27(0x4dd)]=function(){const _0x353ea0=_0x488b27;return this[_0x353ea0(0x38f)]?this[_0x353ea0(0x38f)][_0x353ea0(0x788)]():VisuMZ[_0x353ea0(0x96f)][_0x353ea0(0x2f0)][_0x353ea0(0x4f4)][_0x353ea0(0x998)];},Scene_Title[_0x488b27(0x523)][_0x488b27(0x362)]=function(){const _0x3af09f=_0x488b27;return VisuMZ[_0x3af09f(0x96f)][_0x3af09f(0x2f0)][_0x3af09f(0x516)][_0x3af09f(0x8da)][_0x3af09f(0x32f)]['call'](this);},Scene_Title['prototype'][_0x488b27(0x5ff)]=function(){const _0x226d9b=_0x488b27;for(const _0x437166 of Scene_Title[_0x226d9b(0x235)]){const _0xbffc30=new Sprite_TitlePictureButton(_0x437166);this[_0x226d9b(0x4d0)](_0xbffc30);}},VisuMZ['CoreEngine'][_0x488b27(0x30e)]=Scene_Map[_0x488b27(0x523)]['initialize'],Scene_Map[_0x488b27(0x523)]['initialize']=function(){const _0x4f6b88=_0x488b27;VisuMZ[_0x4f6b88(0x96f)][_0x4f6b88(0x30e)][_0x4f6b88(0x1dc)](this),$gameTemp[_0x4f6b88(0x2fb)](),this[_0x4f6b88(0x27e)]();},VisuMZ['CoreEngine'][_0x488b27(0x311)]=Scene_Map[_0x488b27(0x523)][_0x488b27(0x629)],Scene_Map[_0x488b27(0x523)][_0x488b27(0x629)]=function(){const _0x49cf68=_0x488b27;VisuMZ[_0x49cf68(0x96f)][_0x49cf68(0x311)][_0x49cf68(0x1dc)](this),$gameTemp[_0x49cf68(0x5b5)]&&!$gameMessage[_0x49cf68(0x439)]()&&(this[_0x49cf68(0x66f)](),SceneManager['updateEffekseer']());},Scene_Map[_0x488b27(0x523)][_0x488b27(0x555)]=function(){const _0x3b776a=_0x488b27;Scene_Message[_0x3b776a(0x523)][_0x3b776a(0x555)][_0x3b776a(0x1dc)](this),!SceneManager[_0x3b776a(0x3a0)](Scene_Battle)&&(this[_0x3b776a(0x724)][_0x3b776a(0x5f1)](),this[_0x3b776a(0x635)][_0x3b776a(0x94f)](),this[_0x3b776a(0x4ba)][_0x3b776a(0x496)]=![],SceneManager[_0x3b776a(0x607)]()),$gameScreen['clearZoom'](),this[_0x3b776a(0x27e)]();},VisuMZ[_0x488b27(0x96f)]['Scene_Map_createMenuButton']=Scene_Map['prototype']['createMenuButton'],Scene_Map[_0x488b27(0x523)]['createMenuButton']=function(){const _0x3e3555=_0x488b27;VisuMZ['CoreEngine'][_0x3e3555(0x6c3)][_0x3e3555(0x1dc)](this),SceneManager[_0x3e3555(0x508)]()&&this[_0x3e3555(0x435)]();},Scene_Map['prototype'][_0x488b27(0x435)]=function(){const _0x2599eb=_0x488b27;this['_menuButton']['x']=Graphics[_0x2599eb(0x522)]+0x4;},VisuMZ['CoreEngine']['Scene_Map_updateScene']=Scene_Map[_0x488b27(0x523)][_0x488b27(0x6ea)],Scene_Map[_0x488b27(0x523)][_0x488b27(0x6ea)]=function(){const _0x56257d=_0x488b27;VisuMZ['CoreEngine'][_0x56257d(0x741)][_0x56257d(0x1dc)](this),this[_0x56257d(0x6c5)]();},Scene_Map[_0x488b27(0x523)]['updateDashToggle']=function(){const _0x1944d3=_0x488b27;Input[_0x1944d3(0x7f6)](_0x1944d3(0x415))&&(ConfigManager[_0x1944d3(0x865)]=!ConfigManager[_0x1944d3(0x865)],ConfigManager[_0x1944d3(0x613)]());},VisuMZ['CoreEngine'][_0x488b27(0x7d8)]=Scene_Map['prototype'][_0x488b27(0x66f)],Scene_Map[_0x488b27(0x523)][_0x488b27(0x66f)]=function(){const _0x365530=_0x488b27;VisuMZ[_0x365530(0x96f)][_0x365530(0x7d8)][_0x365530(0x1dc)](this),this[_0x365530(0x271)]();},Scene_Map[_0x488b27(0x523)][_0x488b27(0x27e)]=function(){const _0x2df03c=_0x488b27;this[_0x2df03c(0x83c)]=[];},Scene_Map[_0x488b27(0x523)][_0x488b27(0x271)]=function(){const _0x1c9baf=_0x488b27;if(!this[_0x1c9baf(0x83c)])return;for(const _0x64e811 of this[_0x1c9baf(0x83c)]){_0x64e811&&_0x64e811[_0x1c9baf(0x5f1)]();}},Scene_Map[_0x488b27(0x523)][_0x488b27(0x4fb)]=function(_0x1d7d3d,_0x81735c){const _0x2f839b=_0x488b27,_0x44dda9=$dataCommonEvents[_0x1d7d3d];if(!_0x44dda9)return;const _0x4e446b=new Game_OnceParallelInterpreter();this[_0x2f839b(0x4aa)](_0x4e446b),_0x4e446b[_0x2f839b(0x72c)](_0x1d7d3d),_0x4e446b[_0x2f839b(0x764)](_0x81735c);},Scene_Map['prototype'][_0x488b27(0x4aa)]=function(_0x2e992a){const _0x45878d=_0x488b27;this[_0x45878d(0x83c)]=this['_onceParallelInterpreters']||[],this[_0x45878d(0x83c)][_0x45878d(0x64c)](_0x2e992a);},Scene_Map[_0x488b27(0x523)][_0x488b27(0x633)]=function(_0x5d8c92){const _0x21db7c=_0x488b27;this[_0x21db7c(0x83c)]=this[_0x21db7c(0x83c)]||[],this[_0x21db7c(0x83c)][_0x21db7c(0x6fb)](_0x5d8c92);};function Game_OnceParallelInterpreter(){const _0x5ab5e7=_0x488b27;this[_0x5ab5e7(0x285)](...arguments);}Game_OnceParallelInterpreter[_0x488b27(0x523)]=Object[_0x488b27(0x7e3)](Game_Interpreter[_0x488b27(0x523)]),Game_OnceParallelInterpreter[_0x488b27(0x523)][_0x488b27(0x7d6)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x488b27(0x523)]['setCommonEvent']=function(_0x3bf88d){const _0x23e4d3=_0x488b27,_0x4d91e9=$dataCommonEvents[_0x3bf88d];_0x4d91e9?this[_0x23e4d3(0x748)](_0x4d91e9[_0x23e4d3(0x2d3)],0x0):this[_0x23e4d3(0x555)]();},Game_OnceParallelInterpreter[_0x488b27(0x523)][_0x488b27(0x764)]=function(_0x535a95){this['_eventId']=_0x535a95||0x0;},Game_OnceParallelInterpreter[_0x488b27(0x523)]['terminate']=function(){const _0x54f77f=_0x488b27;if(!SceneManager[_0x54f77f(0x69a)]())return;SceneManager[_0x54f77f(0x51f)]['removeOnceParallelInterpreter'](this),Game_Interpreter[_0x54f77f(0x523)][_0x54f77f(0x555)][_0x54f77f(0x1dc)](this);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x61a)]=Scene_MenuBase['prototype']['helpAreaTop'],Scene_MenuBase[_0x488b27(0x523)]['helpAreaTop']=function(){const _0x212746=_0x488b27;let _0x47c783=0x0;return SceneManager[_0x212746(0x3a8)]()?_0x47c783=this['helpAreaTopSideButtonLayout']():_0x47c783=VisuMZ[_0x212746(0x96f)]['Scene_MenuBase_helpAreaTop'][_0x212746(0x1dc)](this),_0x47c783;},Scene_MenuBase[_0x488b27(0x523)][_0x488b27(0x79d)]=function(){const _0x4aaacc=_0x488b27;return this[_0x4aaacc(0x98d)]()?this[_0x4aaacc(0x984)]():0x0;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x57c)]=Scene_MenuBase[_0x488b27(0x523)]['mainAreaTop'],Scene_MenuBase[_0x488b27(0x523)][_0x488b27(0x29b)]=function(){const _0x3c9c19=_0x488b27;return SceneManager[_0x3c9c19(0x3a8)]()?this[_0x3c9c19(0x517)]():VisuMZ[_0x3c9c19(0x96f)]['Scene_MenuBase_mainAreaTop'][_0x3c9c19(0x1dc)](this);},Scene_MenuBase[_0x488b27(0x523)][_0x488b27(0x517)]=function(){const _0x2baf42=_0x488b27;if(!this[_0x2baf42(0x98d)]())return this[_0x2baf42(0x801)]();else return this['isMenuButtonAssistEnabled']()&&this[_0x2baf42(0x5c9)]()===_0x2baf42(0x44b)?Window_ButtonAssist[_0x2baf42(0x523)]['lineHeight']():0x0;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x520)]=Scene_MenuBase[_0x488b27(0x523)]['mainAreaHeight'],Scene_MenuBase[_0x488b27(0x523)]['mainAreaHeight']=function(){const _0x131ca1=_0x488b27;let _0xd740f5=0x0;return SceneManager[_0x131ca1(0x3a8)]()?_0xd740f5=this[_0x131ca1(0x30a)]():_0xd740f5=VisuMZ[_0x131ca1(0x96f)][_0x131ca1(0x520)][_0x131ca1(0x1dc)](this),this[_0x131ca1(0x26d)]()&&this['getButtonAssistLocation']()!==_0x131ca1(0x3ad)&&(_0xd740f5-=Window_ButtonAssist[_0x131ca1(0x523)][_0x131ca1(0x8f4)]()),_0xd740f5;},Scene_MenuBase[_0x488b27(0x523)][_0x488b27(0x30a)]=function(){const _0xe0c470=_0x488b27;return Graphics[_0xe0c470(0x3b3)]-this[_0xe0c470(0x720)]();},VisuMZ['CoreEngine']['Scene_MenuBase_createBackground']=Scene_MenuBase[_0x488b27(0x523)]['createBackground'],Scene_MenuBase['prototype'][_0x488b27(0x2df)]=function(){const _0x4c74ec=_0x488b27,_0x3b8cf7=VisuMZ[_0x4c74ec(0x96f)]['Settings'][_0x4c74ec(0x7b9)][_0x4c74ec(0x20a)]??0x8;this[_0x4c74ec(0x43c)]=new PIXI[(_0x4c74ec(0x8c1))][(_0x4c74ec(0x90c))](_0x3b8cf7),this['_backgroundSprite']=new Sprite(),this[_0x4c74ec(0x20c)][_0x4c74ec(0x5ce)]=SceneManager['backgroundBitmap'](),this[_0x4c74ec(0x20c)]['filters']=[this['_backgroundFilter']],this[_0x4c74ec(0x4d0)](this[_0x4c74ec(0x20c)]),this[_0x4c74ec(0x8ad)](0xc0),this[_0x4c74ec(0x8ad)](this[_0x4c74ec(0x78e)]()),this[_0x4c74ec(0x6e4)]();},Scene_MenuBase[_0x488b27(0x523)][_0x488b27(0x78e)]=function(){const _0x3da97c=_0x488b27,_0x4cd8b3=String(this[_0x3da97c(0x7d6)][_0x3da97c(0x24c)]),_0x3affec=this[_0x3da97c(0x79a)](_0x4cd8b3);return _0x3affec?_0x3affec[_0x3da97c(0x5c4)]:0xc0;},Scene_MenuBase[_0x488b27(0x523)][_0x488b27(0x6e4)]=function(){const _0x5a8bf4=_0x488b27,_0x259477=String(this[_0x5a8bf4(0x7d6)][_0x5a8bf4(0x24c)]),_0x422680=this['getCustomBackgroundSettings'](_0x259477);_0x422680&&(_0x422680[_0x5a8bf4(0x4c9)]!==''||_0x422680[_0x5a8bf4(0x839)]!=='')&&(this[_0x5a8bf4(0x6aa)]=new Sprite(ImageManager[_0x5a8bf4(0x82e)](_0x422680['BgFilename1'])),this['_backSprite2']=new Sprite(ImageManager[_0x5a8bf4(0x462)](_0x422680[_0x5a8bf4(0x839)])),this['addChild'](this[_0x5a8bf4(0x6aa)]),this[_0x5a8bf4(0x4d0)](this['_backSprite2']),this[_0x5a8bf4(0x6aa)][_0x5a8bf4(0x5ce)][_0x5a8bf4(0x31a)](this['adjustSprite'][_0x5a8bf4(0x8e1)](this,this['_backSprite1'])),this[_0x5a8bf4(0x54e)][_0x5a8bf4(0x5ce)][_0x5a8bf4(0x31a)](this[_0x5a8bf4(0x877)][_0x5a8bf4(0x8e1)](this,this[_0x5a8bf4(0x54e)])));},Scene_MenuBase['prototype'][_0x488b27(0x79a)]=function(_0x59a655){const _0x3a585b=_0x488b27;return VisuMZ['CoreEngine'][_0x3a585b(0x2f0)]['MenuBg'][_0x59a655]||VisuMZ['CoreEngine'][_0x3a585b(0x2f0)]['MenuBg']['Scene_Unlisted'];},Scene_MenuBase[_0x488b27(0x523)][_0x488b27(0x877)]=function(_0x1c3833){const _0x5ee6b3=_0x488b27;this[_0x5ee6b3(0x79c)](_0x1c3833),this[_0x5ee6b3(0x4db)](_0x1c3833);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x8cb)]=Scene_MenuBase[_0x488b27(0x523)][_0x488b27(0x826)],Scene_MenuBase[_0x488b27(0x523)]['createCancelButton']=function(){const _0x244afc=_0x488b27;VisuMZ[_0x244afc(0x96f)][_0x244afc(0x8cb)]['call'](this),SceneManager[_0x244afc(0x508)]()&&this['moveCancelButtonSideButtonLayout']();},Scene_MenuBase[_0x488b27(0x523)][_0x488b27(0x784)]=function(){const _0x116775=_0x488b27;this[_0x116775(0x229)]['x']=Graphics[_0x116775(0x522)]+0x4;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x4c7)]=Scene_MenuBase[_0x488b27(0x523)][_0x488b27(0x3c1)],Scene_MenuBase[_0x488b27(0x523)][_0x488b27(0x3c1)]=function(){const _0x50a756=_0x488b27;VisuMZ['CoreEngine'][_0x50a756(0x4c7)][_0x50a756(0x1dc)](this),SceneManager[_0x50a756(0x508)]()&&this[_0x50a756(0x90e)]();},Scene_MenuBase[_0x488b27(0x523)][_0x488b27(0x90e)]=function(){const _0x4112da=_0x488b27;this[_0x4112da(0x468)]['x']=-0x1*(this[_0x4112da(0x468)][_0x4112da(0x240)]+this['_pagedownButton']['width']+0x8),this[_0x4112da(0x6b6)]['x']=-0x1*(this[_0x4112da(0x6b6)][_0x4112da(0x240)]+0x4);},Scene_MenuBase[_0x488b27(0x523)][_0x488b27(0x26d)]=function(){const _0x3f60bd=_0x488b27;return VisuMZ['CoreEngine']['Settings'][_0x3f60bd(0x988)][_0x3f60bd(0x3dd)];},Scene_MenuBase[_0x488b27(0x523)][_0x488b27(0x5c9)]=function(){const _0x2c8659=_0x488b27;return SceneManager[_0x2c8659(0x508)]()||SceneManager['areButtonsHidden']()?VisuMZ[_0x2c8659(0x96f)][_0x2c8659(0x2f0)][_0x2c8659(0x988)][_0x2c8659(0x6bc)]:_0x2c8659(0x3ad);},Scene_MenuBase['prototype'][_0x488b27(0x749)]=function(){const _0x1cacf9=_0x488b27;if(!this[_0x1cacf9(0x26d)]())return;const _0xe842d8=this['buttonAssistWindowRect']();this[_0x1cacf9(0x651)]=new Window_ButtonAssist(_0xe842d8),this['addWindow'](this[_0x1cacf9(0x651)]);},Scene_MenuBase[_0x488b27(0x523)][_0x488b27(0x3be)]=function(){const _0x558a8e=_0x488b27;return this[_0x558a8e(0x5c9)]()===_0x558a8e(0x3ad)?this['buttonAssistWindowButtonRect']():this[_0x558a8e(0x68e)]();},Scene_MenuBase[_0x488b27(0x523)][_0x488b27(0x646)]=function(){const _0x60ed2e=_0x488b27,_0x546d04=ConfigManager[_0x60ed2e(0x96d)]?(Sprite_Button[_0x60ed2e(0x523)][_0x60ed2e(0x5e9)]()+0x6)*0x2:0x0,_0x42ea59=this['buttonY'](),_0xe85ac5=Graphics['boxWidth']-_0x546d04*0x2,_0x1be9f1=this[_0x60ed2e(0x1c6)]();return new Rectangle(_0x546d04,_0x42ea59,_0xe85ac5,_0x1be9f1);},Scene_MenuBase[_0x488b27(0x523)]['buttonAssistWindowSideRect']=function(){const _0x5d6480=_0x488b27,_0x88e2aa=Graphics['boxWidth'],_0x5277d3=Window_ButtonAssist[_0x5d6480(0x523)][_0x5d6480(0x8f4)](),_0x3eec12=0x0;let _0x9898e8=0x0;return this[_0x5d6480(0x5c9)]()===_0x5d6480(0x44b)?_0x9898e8=0x0:_0x9898e8=Graphics[_0x5d6480(0x3b3)]-_0x5277d3,new Rectangle(_0x3eec12,_0x9898e8,_0x88e2aa,_0x5277d3);},Scene_Menu[_0x488b27(0x994)]=VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)][_0x488b27(0x516)]['MainMenu'],VisuMZ[_0x488b27(0x96f)]['Scene_Menu_create']=Scene_Menu['prototype'][_0x488b27(0x7e3)],Scene_Menu['prototype'][_0x488b27(0x7e3)]=function(){const _0x463355=_0x488b27;VisuMZ['CoreEngine'][_0x463355(0x4c5)][_0x463355(0x1dc)](this),this[_0x463355(0x63c)]();},Scene_Menu[_0x488b27(0x523)][_0x488b27(0x63c)]=function(){const _0x2b0e1e=_0x488b27;this['_commandWindow']&&this[_0x2b0e1e(0x38f)][_0x2b0e1e(0x83d)](Scene_Menu[_0x2b0e1e(0x994)]['CommandBgType']),this['_goldWindow']&&this['_goldWindow'][_0x2b0e1e(0x83d)](Scene_Menu['layoutSettings'][_0x2b0e1e(0x939)]),this[_0x2b0e1e(0x63d)]&&this['_statusWindow'][_0x2b0e1e(0x83d)](Scene_Menu[_0x2b0e1e(0x994)][_0x2b0e1e(0x40b)]);},Scene_Menu[_0x488b27(0x523)][_0x488b27(0x362)]=function(){const _0x34c346=_0x488b27;return Scene_Menu['layoutSettings'][_0x34c346(0x32f)][_0x34c346(0x1dc)](this);},Scene_Menu[_0x488b27(0x523)][_0x488b27(0x8c5)]=function(){const _0x50ed08=_0x488b27;return Scene_Menu[_0x50ed08(0x994)][_0x50ed08(0x7af)][_0x50ed08(0x1dc)](this);},Scene_Menu[_0x488b27(0x523)][_0x488b27(0x54f)]=function(){const _0x6950e8=_0x488b27;return Scene_Menu[_0x6950e8(0x994)]['StatusRect']['call'](this);},Scene_Item[_0x488b27(0x994)]=VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)]['MenuLayout']['ItemMenu'],VisuMZ['CoreEngine'][_0x488b27(0x71a)]=Scene_Item[_0x488b27(0x523)][_0x488b27(0x7e3)],Scene_Item[_0x488b27(0x523)][_0x488b27(0x7e3)]=function(){VisuMZ['CoreEngine']['Scene_Item_create']['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Item[_0x488b27(0x523)]['setCoreEngineUpdateWindowBg']=function(){const _0x11465d=_0x488b27;this['_helpWindow']&&this[_0x11465d(0x940)][_0x11465d(0x83d)](Scene_Item['layoutSettings'][_0x11465d(0x321)]),this[_0x11465d(0x734)]&&this[_0x11465d(0x734)]['setBackgroundType'](Scene_Item[_0x11465d(0x994)]['CategoryBgType']),this[_0x11465d(0x754)]&&this[_0x11465d(0x754)]['setBackgroundType'](Scene_Item['layoutSettings'][_0x11465d(0x24f)]),this[_0x11465d(0x723)]&&this['_actorWindow'][_0x11465d(0x83d)](Scene_Item['layoutSettings'][_0x11465d(0x88a)]);},Scene_Item[_0x488b27(0x523)]['helpWindowRect']=function(){const _0x232122=_0x488b27;return Scene_Item[_0x232122(0x994)][_0x232122(0x574)][_0x232122(0x1dc)](this);},Scene_Item[_0x488b27(0x523)][_0x488b27(0x590)]=function(){const _0x235bb0=_0x488b27;return Scene_Item[_0x235bb0(0x994)][_0x235bb0(0x35a)][_0x235bb0(0x1dc)](this);},Scene_Item[_0x488b27(0x523)][_0x488b27(0x7dc)]=function(){const _0x4fb6b8=_0x488b27;return Scene_Item[_0x4fb6b8(0x994)]['ItemRect'][_0x4fb6b8(0x1dc)](this);},Scene_Item['prototype'][_0x488b27(0x5fd)]=function(){const _0x1ed1ea=_0x488b27;return Scene_Item[_0x1ed1ea(0x994)][_0x1ed1ea(0x8a4)]['call'](this);},Scene_Skill['layoutSettings']=VisuMZ['CoreEngine']['Settings'][_0x488b27(0x516)][_0x488b27(0x4e4)],VisuMZ[_0x488b27(0x96f)]['Scene_Skill_create']=Scene_Skill[_0x488b27(0x523)][_0x488b27(0x7e3)],Scene_Skill[_0x488b27(0x523)][_0x488b27(0x7e3)]=function(){const _0xe2423=_0x488b27;VisuMZ[_0xe2423(0x96f)][_0xe2423(0x75a)][_0xe2423(0x1dc)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill[_0x488b27(0x523)][_0x488b27(0x63c)]=function(){const _0x8cbcf8=_0x488b27;this[_0x8cbcf8(0x940)]&&this[_0x8cbcf8(0x940)]['setBackgroundType'](Scene_Skill['layoutSettings'][_0x8cbcf8(0x321)]),this[_0x8cbcf8(0x230)]&&this['_skillTypeWindow'][_0x8cbcf8(0x83d)](Scene_Skill['layoutSettings'][_0x8cbcf8(0x565)]),this[_0x8cbcf8(0x63d)]&&this[_0x8cbcf8(0x63d)][_0x8cbcf8(0x83d)](Scene_Skill['layoutSettings'][_0x8cbcf8(0x40b)]),this[_0x8cbcf8(0x754)]&&this[_0x8cbcf8(0x754)]['setBackgroundType'](Scene_Skill[_0x8cbcf8(0x994)][_0x8cbcf8(0x24f)]),this['_actorWindow']&&this[_0x8cbcf8(0x723)]['setBackgroundType'](Scene_Skill[_0x8cbcf8(0x994)]['ActorBgType']);},Scene_Skill[_0x488b27(0x523)][_0x488b27(0x623)]=function(){const _0x5eef24=_0x488b27;return Scene_Skill[_0x5eef24(0x994)][_0x5eef24(0x574)][_0x5eef24(0x1dc)](this);},Scene_Skill[_0x488b27(0x523)][_0x488b27(0x8b1)]=function(){const _0x2f09ea=_0x488b27;return Scene_Skill[_0x2f09ea(0x994)][_0x2f09ea(0x372)]['call'](this);},Scene_Skill[_0x488b27(0x523)][_0x488b27(0x54f)]=function(){const _0x42529f=_0x488b27;return Scene_Skill[_0x42529f(0x994)]['StatusRect'][_0x42529f(0x1dc)](this);},Scene_Skill['prototype']['itemWindowRect']=function(){const _0x420250=_0x488b27;return Scene_Skill[_0x420250(0x994)][_0x420250(0x211)][_0x420250(0x1dc)](this);},Scene_Skill['prototype']['actorWindowRect']=function(){const _0x2ee143=_0x488b27;return Scene_Skill[_0x2ee143(0x994)][_0x2ee143(0x8a4)][_0x2ee143(0x1dc)](this);},Scene_Equip[_0x488b27(0x994)]=VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)]['MenuLayout'][_0x488b27(0x469)],VisuMZ[_0x488b27(0x96f)]['Scene_Equip_create']=Scene_Equip['prototype'][_0x488b27(0x7e3)],Scene_Equip[_0x488b27(0x523)][_0x488b27(0x7e3)]=function(){const _0x20e2e3=_0x488b27;VisuMZ[_0x20e2e3(0x96f)][_0x20e2e3(0x3ac)][_0x20e2e3(0x1dc)](this),this[_0x20e2e3(0x63c)]();},Scene_Equip[_0x488b27(0x523)][_0x488b27(0x63c)]=function(){const _0x38d3ac=_0x488b27;this[_0x38d3ac(0x940)]&&this[_0x38d3ac(0x940)][_0x38d3ac(0x83d)](Scene_Equip[_0x38d3ac(0x994)][_0x38d3ac(0x321)]),this[_0x38d3ac(0x63d)]&&this['_statusWindow'][_0x38d3ac(0x83d)](Scene_Equip[_0x38d3ac(0x994)][_0x38d3ac(0x40b)]),this[_0x38d3ac(0x38f)]&&this['_commandWindow'][_0x38d3ac(0x83d)](Scene_Equip[_0x38d3ac(0x994)][_0x38d3ac(0x312)]),this[_0x38d3ac(0x3c5)]&&this['_slotWindow']['setBackgroundType'](Scene_Equip[_0x38d3ac(0x994)]['SlotBgType']),this[_0x38d3ac(0x754)]&&this[_0x38d3ac(0x754)]['setBackgroundType'](Scene_Equip[_0x38d3ac(0x994)]['ItemBgType']);},Scene_Equip[_0x488b27(0x523)][_0x488b27(0x623)]=function(){const _0x5d8c88=_0x488b27;return Scene_Equip[_0x5d8c88(0x994)][_0x5d8c88(0x574)][_0x5d8c88(0x1dc)](this);},Scene_Equip['prototype']['statusWindowRect']=function(){const _0x20d4a7=_0x488b27;return Scene_Equip[_0x20d4a7(0x994)][_0x20d4a7(0x1eb)]['call'](this);},Scene_Equip['prototype'][_0x488b27(0x362)]=function(){const _0x3481a1=_0x488b27;return Scene_Equip[_0x3481a1(0x994)][_0x3481a1(0x32f)][_0x3481a1(0x1dc)](this);},Scene_Equip[_0x488b27(0x523)][_0x488b27(0x59c)]=function(){const _0x4f0b8f=_0x488b27;return Scene_Equip[_0x4f0b8f(0x994)][_0x4f0b8f(0x1ff)][_0x4f0b8f(0x1dc)](this);},Scene_Equip[_0x488b27(0x523)][_0x488b27(0x7dc)]=function(){const _0x29e550=_0x488b27;return Scene_Equip[_0x29e550(0x994)][_0x29e550(0x211)][_0x29e550(0x1dc)](this);},Scene_Status['layoutSettings']=VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)][_0x488b27(0x516)][_0x488b27(0x1c5)],VisuMZ['CoreEngine']['Scene_Status_create']=Scene_Status[_0x488b27(0x523)][_0x488b27(0x7e3)],Scene_Status['prototype'][_0x488b27(0x7e3)]=function(){const _0x2ffefe=_0x488b27;VisuMZ['CoreEngine'][_0x2ffefe(0x4c6)][_0x2ffefe(0x1dc)](this),this[_0x2ffefe(0x63c)]();},Scene_Status['prototype'][_0x488b27(0x63c)]=function(){const _0x31bda0=_0x488b27;this[_0x31bda0(0x841)]&&this[_0x31bda0(0x841)][_0x31bda0(0x83d)](Scene_Status[_0x31bda0(0x994)][_0x31bda0(0x690)]),this[_0x31bda0(0x63d)]&&this[_0x31bda0(0x63d)][_0x31bda0(0x83d)](Scene_Status['layoutSettings']['StatusBgType']),this[_0x31bda0(0x6db)]&&this[_0x31bda0(0x6db)]['setBackgroundType'](Scene_Status[_0x31bda0(0x994)][_0x31bda0(0x537)]),this[_0x31bda0(0x4ee)]&&this[_0x31bda0(0x4ee)][_0x31bda0(0x83d)](Scene_Status[_0x31bda0(0x994)][_0x31bda0(0x996)]);},Scene_Status[_0x488b27(0x523)]['profileWindowRect']=function(){const _0x3232a4=_0x488b27;return Scene_Status[_0x3232a4(0x994)][_0x3232a4(0x276)]['call'](this);},Scene_Status[_0x488b27(0x523)][_0x488b27(0x54f)]=function(){const _0x48860b=_0x488b27;return Scene_Status[_0x48860b(0x994)][_0x48860b(0x1eb)][_0x48860b(0x1dc)](this);},Scene_Status[_0x488b27(0x523)][_0x488b27(0x32e)]=function(){const _0x2d6105=_0x488b27;return Scene_Status['layoutSettings'][_0x2d6105(0x44f)][_0x2d6105(0x1dc)](this);},Scene_Status[_0x488b27(0x523)]['statusEquipWindowRect']=function(){const _0x198473=_0x488b27;return Scene_Status[_0x198473(0x994)]['StatusEquipRect']['call'](this);},Scene_Options[_0x488b27(0x994)]=VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)][_0x488b27(0x516)]['OptionsMenu'],VisuMZ[_0x488b27(0x96f)][_0x488b27(0x1f4)]=Scene_Options['prototype'][_0x488b27(0x7e3)],Scene_Options[_0x488b27(0x523)]['create']=function(){const _0x162c3c=_0x488b27;VisuMZ[_0x162c3c(0x96f)]['Scene_Options_create'][_0x162c3c(0x1dc)](this),this[_0x162c3c(0x63c)]();},Scene_Options[_0x488b27(0x523)][_0x488b27(0x63c)]=function(){const _0x3e2fc3=_0x488b27;this[_0x3e2fc3(0x1da)]&&this[_0x3e2fc3(0x1da)][_0x3e2fc3(0x83d)](Scene_Options[_0x3e2fc3(0x994)]['OptionsBgType']);},Scene_Options[_0x488b27(0x523)][_0x488b27(0x438)]=function(){const _0x5a17ce=_0x488b27;return Scene_Options[_0x5a17ce(0x994)][_0x5a17ce(0x6f9)][_0x5a17ce(0x1dc)](this);},Scene_Save[_0x488b27(0x994)]=VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)][_0x488b27(0x516)][_0x488b27(0x364)],Scene_Save[_0x488b27(0x523)][_0x488b27(0x7e3)]=function(){const _0x1f8628=_0x488b27;Scene_File[_0x1f8628(0x523)][_0x1f8628(0x7e3)]['call'](this),this[_0x1f8628(0x63c)]();},Scene_Save[_0x488b27(0x523)][_0x488b27(0x63c)]=function(){const _0x3bcf32=_0x488b27;this[_0x3bcf32(0x940)]&&this['_helpWindow'][_0x3bcf32(0x83d)](Scene_Save['layoutSettings'][_0x3bcf32(0x321)]),this[_0x3bcf32(0x3f3)]&&this[_0x3bcf32(0x3f3)][_0x3bcf32(0x83d)](Scene_Save[_0x3bcf32(0x994)][_0x3bcf32(0x6af)]);},Scene_Save[_0x488b27(0x523)]['helpWindowRect']=function(){const _0x52e555=_0x488b27;return Scene_Save['layoutSettings'][_0x52e555(0x574)][_0x52e555(0x1dc)](this);},Scene_Save['prototype'][_0x488b27(0x5a3)]=function(){const _0x5a0120=_0x488b27;return Scene_Save[_0x5a0120(0x994)][_0x5a0120(0x6fc)]['call'](this);},Scene_Load[_0x488b27(0x994)]=VisuMZ['CoreEngine']['Settings'][_0x488b27(0x516)]['LoadMenu'],Scene_Load[_0x488b27(0x523)]['create']=function(){const _0xa30874=_0x488b27;Scene_File[_0xa30874(0x523)][_0xa30874(0x7e3)][_0xa30874(0x1dc)](this),this[_0xa30874(0x63c)]();},Scene_Load[_0x488b27(0x523)][_0x488b27(0x63c)]=function(){const _0x584da3=_0x488b27;this[_0x584da3(0x940)]&&this[_0x584da3(0x940)]['setBackgroundType'](Scene_Load[_0x584da3(0x994)]['HelpBgType']),this[_0x584da3(0x3f3)]&&this[_0x584da3(0x3f3)][_0x584da3(0x83d)](Scene_Load[_0x584da3(0x994)][_0x584da3(0x6af)]);},Scene_Load[_0x488b27(0x523)][_0x488b27(0x623)]=function(){const _0x1bddec=_0x488b27;return Scene_Load['layoutSettings'][_0x1bddec(0x574)]['call'](this);},Scene_Load[_0x488b27(0x523)][_0x488b27(0x5a3)]=function(){const _0x25d7cb=_0x488b27;return Scene_Load['layoutSettings'][_0x25d7cb(0x6fc)][_0x25d7cb(0x1dc)](this);};function Scene_QuickLoad(){const _0x456541=_0x488b27;this[_0x456541(0x285)](...arguments);}Scene_QuickLoad['prototype']=Object[_0x488b27(0x7e3)](Scene_Load[_0x488b27(0x523)]),Scene_QuickLoad[_0x488b27(0x523)][_0x488b27(0x7d6)]=Scene_QuickLoad,Scene_QuickLoad[_0x488b27(0x523)][_0x488b27(0x285)]=function(){const _0x605eb2=_0x488b27;Scene_Load[_0x605eb2(0x523)][_0x605eb2(0x285)][_0x605eb2(0x1dc)](this);},Scene_QuickLoad[_0x488b27(0x523)]['create']=function(){const _0x18acba=_0x488b27;this[_0x18acba(0x30b)](this[_0x18acba(0x266)]);},Scene_QuickLoad[_0x488b27(0x523)]['prepare']=function(_0x24d9f9){const _0x2d3027=_0x488b27;this[_0x2d3027(0x266)]=_0x24d9f9;},Scene_QuickLoad['prototype'][_0x488b27(0x289)]=function(){const _0x10e970=_0x488b27;Scene_MenuBase[_0x10e970(0x523)]['start'][_0x10e970(0x1dc)](this);},Scene_GameEnd[_0x488b27(0x994)]=VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)][_0x488b27(0x516)][_0x488b27(0x7aa)],VisuMZ[_0x488b27(0x96f)][_0x488b27(0x74a)]=Scene_GameEnd[_0x488b27(0x523)]['createBackground'],Scene_GameEnd['prototype'][_0x488b27(0x2df)]=function(){const _0x375eeb=_0x488b27;Scene_MenuBase['prototype'][_0x375eeb(0x2df)]['call'](this);},Scene_GameEnd[_0x488b27(0x523)][_0x488b27(0x66d)]=function(){const _0x4f5984=_0x488b27,_0x1dd893=this[_0x4f5984(0x362)]();this[_0x4f5984(0x38f)]=new Window_GameEnd(_0x1dd893),this[_0x4f5984(0x38f)][_0x4f5984(0x79f)](_0x4f5984(0x407),this[_0x4f5984(0x419)]['bind'](this)),this[_0x4f5984(0x3f9)](this['_commandWindow']),this[_0x4f5984(0x38f)]['setBackgroundType'](Scene_GameEnd[_0x4f5984(0x994)][_0x4f5984(0x312)]);},Scene_GameEnd['prototype'][_0x488b27(0x362)]=function(){const _0x3fa506=_0x488b27;return Scene_GameEnd['layoutSettings'][_0x3fa506(0x32f)][_0x3fa506(0x1dc)](this);},Scene_Shop[_0x488b27(0x994)]=VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)]['MenuLayout'][_0x488b27(0x45b)],VisuMZ[_0x488b27(0x96f)][_0x488b27(0x491)]=Scene_Shop[_0x488b27(0x523)][_0x488b27(0x7e3)],Scene_Shop['prototype'][_0x488b27(0x7e3)]=function(){const _0x252891=_0x488b27;VisuMZ[_0x252891(0x96f)][_0x252891(0x491)][_0x252891(0x1dc)](this),this[_0x252891(0x63c)]();},Scene_Shop['prototype'][_0x488b27(0x63c)]=function(){const _0xf903b4=_0x488b27;this[_0xf903b4(0x940)]&&this[_0xf903b4(0x940)][_0xf903b4(0x83d)](Scene_Shop[_0xf903b4(0x994)]['HelpBgType']),this[_0xf903b4(0x72d)]&&this['_goldWindow']['setBackgroundType'](Scene_Shop[_0xf903b4(0x994)][_0xf903b4(0x939)]),this[_0xf903b4(0x38f)]&&this['_commandWindow']['setBackgroundType'](Scene_Shop[_0xf903b4(0x994)][_0xf903b4(0x312)]),this['_dummyWindow']&&this[_0xf903b4(0x950)]['setBackgroundType'](Scene_Shop[_0xf903b4(0x994)]['DummyBgType']),this[_0xf903b4(0x2f5)]&&this[_0xf903b4(0x2f5)][_0xf903b4(0x83d)](Scene_Shop[_0xf903b4(0x994)][_0xf903b4(0x8f5)]),this['_statusWindow']&&this[_0xf903b4(0x63d)][_0xf903b4(0x83d)](Scene_Shop['layoutSettings'][_0xf903b4(0x40b)]),this[_0xf903b4(0x6de)]&&this['_buyWindow']['setBackgroundType'](Scene_Shop['layoutSettings'][_0xf903b4(0x8ac)]),this[_0xf903b4(0x734)]&&this[_0xf903b4(0x734)][_0xf903b4(0x83d)](Scene_Shop[_0xf903b4(0x994)][_0xf903b4(0x8df)]),this[_0xf903b4(0x554)]&&this[_0xf903b4(0x554)]['setBackgroundType'](Scene_Shop[_0xf903b4(0x994)][_0xf903b4(0x6e8)]);},Scene_Shop[_0x488b27(0x523)][_0x488b27(0x623)]=function(){const _0x24b4dc=_0x488b27;return Scene_Shop[_0x24b4dc(0x994)]['HelpRect'][_0x24b4dc(0x1dc)](this);},Scene_Shop[_0x488b27(0x523)][_0x488b27(0x8c5)]=function(){const _0x294dde=_0x488b27;return Scene_Shop[_0x294dde(0x994)][_0x294dde(0x7af)][_0x294dde(0x1dc)](this);},Scene_Shop[_0x488b27(0x523)][_0x488b27(0x362)]=function(){const _0x4d0365=_0x488b27;return Scene_Shop[_0x4d0365(0x994)][_0x4d0365(0x32f)]['call'](this);},Scene_Shop[_0x488b27(0x523)][_0x488b27(0x8f9)]=function(){const _0x3f62b7=_0x488b27;return Scene_Shop[_0x3f62b7(0x994)]['DummyRect'][_0x3f62b7(0x1dc)](this);},Scene_Shop[_0x488b27(0x523)]['numberWindowRect']=function(){const _0x122a3b=_0x488b27;return Scene_Shop[_0x122a3b(0x994)][_0x122a3b(0x1c4)]['call'](this);},Scene_Shop[_0x488b27(0x523)][_0x488b27(0x54f)]=function(){const _0x52bc4b=_0x488b27;return Scene_Shop['layoutSettings'][_0x52bc4b(0x1eb)][_0x52bc4b(0x1dc)](this);},Scene_Shop['prototype'][_0x488b27(0x50f)]=function(){const _0x28fe4e=_0x488b27;return Scene_Shop[_0x28fe4e(0x994)]['BuyRect'][_0x28fe4e(0x1dc)](this);},Scene_Shop[_0x488b27(0x523)][_0x488b27(0x590)]=function(){const _0x317809=_0x488b27;return Scene_Shop[_0x317809(0x994)][_0x317809(0x35a)]['call'](this);},Scene_Shop[_0x488b27(0x523)][_0x488b27(0x2ff)]=function(){const _0x969b46=_0x488b27;return Scene_Shop[_0x969b46(0x994)][_0x969b46(0x920)][_0x969b46(0x1dc)](this);},Scene_Name[_0x488b27(0x994)]=VisuMZ[_0x488b27(0x96f)]['Settings'][_0x488b27(0x516)]['NameMenu'],VisuMZ[_0x488b27(0x96f)][_0x488b27(0x918)]=Scene_Name[_0x488b27(0x523)]['create'],Scene_Name[_0x488b27(0x523)]['create']=function(){const _0x275f48=_0x488b27;VisuMZ[_0x275f48(0x96f)]['Scene_Name_create'][_0x275f48(0x1dc)](this),this[_0x275f48(0x63c)]();},Scene_Name[_0x488b27(0x523)][_0x488b27(0x63c)]=function(){const _0x45528c=_0x488b27;this[_0x45528c(0x308)]&&this[_0x45528c(0x308)][_0x45528c(0x83d)](Scene_Name['layoutSettings']['EditBgType']),this['_inputWindow']&&this[_0x45528c(0x628)][_0x45528c(0x83d)](Scene_Name[_0x45528c(0x994)]['InputBgType']);},Scene_Name[_0x488b27(0x523)]['helpAreaHeight']=function(){return 0x0;},Scene_Name['prototype'][_0x488b27(0x6ff)]=function(){const _0x4f49cb=_0x488b27;return Scene_Name[_0x4f49cb(0x994)]['EditRect'][_0x4f49cb(0x1dc)](this);},Scene_Name['prototype'][_0x488b27(0x2c5)]=function(){const _0x1966b4=_0x488b27;return Scene_Name[_0x1966b4(0x994)][_0x1966b4(0x531)][_0x1966b4(0x1dc)](this);},Scene_Name[_0x488b27(0x523)][_0x488b27(0x251)]=function(){const _0x4418ab=_0x488b27;if(!this[_0x4418ab(0x628)])return![];return VisuMZ[_0x4418ab(0x96f)][_0x4418ab(0x2f0)][_0x4418ab(0x601)][_0x4418ab(0x251)];},Scene_Name[_0x488b27(0x523)][_0x488b27(0x7fa)]=function(){const _0x96c269=_0x488b27;if(this[_0x96c269(0x251)]()&&this['_inputWindow'][_0x96c269(0x5a4)]!==_0x96c269(0x58b))return TextManager['getInputMultiButtonStrings']('pageup',_0x96c269(0x93d));return Scene_MenuBase[_0x96c269(0x523)][_0x96c269(0x7fa)][_0x96c269(0x1dc)](this);},Scene_Name['prototype']['buttonAssistKey3']=function(){const _0x3ad664=_0x488b27;return this[_0x3ad664(0x251)]()?TextManager[_0x3ad664(0x855)]('tab'):Scene_MenuBase[_0x3ad664(0x523)][_0x3ad664(0x21a)][_0x3ad664(0x1dc)](this);},Scene_Name[_0x488b27(0x523)][_0x488b27(0x2b0)]=function(){const _0x4847e6=_0x488b27;if(this['EnableNameInput']()&&this[_0x4847e6(0x628)][_0x4847e6(0x5a4)]===_0x4847e6(0x58b))return TextManager[_0x4847e6(0x497)]([_0x4847e6(0x3ab)]);return Scene_MenuBase[_0x4847e6(0x523)][_0x4847e6(0x2b0)][_0x4847e6(0x1dc)](this);},Scene_Name['prototype'][_0x488b27(0x4cd)]=function(){const _0x265861=_0x488b27;if(this[_0x265861(0x251)]()&&this['_inputWindow'][_0x265861(0x5a4)]===_0x265861(0x58b))return TextManager[_0x265861(0x497)](['BKSP']);return Scene_MenuBase[_0x265861(0x523)][_0x265861(0x4cd)]['call'](this);},Scene_Name[_0x488b27(0x523)][_0x488b27(0x972)]=function(){const _0x860580=_0x488b27;if(this[_0x860580(0x251)]()&&this[_0x860580(0x628)][_0x860580(0x5a4)]!=='keyboard'){const _0xceed95=VisuMZ[_0x860580(0x96f)][_0x860580(0x2f0)][_0x860580(0x601)];return _0xceed95[_0x860580(0x2c1)]||_0x860580(0x256);}return Scene_MenuBase[_0x860580(0x523)]['buttonAssistText1']['call'](this);},Scene_Name['prototype'][_0x488b27(0x31d)]=function(){const _0x234f9b=_0x488b27;if(this[_0x234f9b(0x251)]()){const _0x1968ad=VisuMZ[_0x234f9b(0x96f)][_0x234f9b(0x2f0)][_0x234f9b(0x601)];return this['_inputWindow'][_0x234f9b(0x5a4)]===_0x234f9b(0x58b)?_0x1968ad[_0x234f9b(0x7b2)]||_0x234f9b(0x7b2):_0x1968ad[_0x234f9b(0x925)]||'Manual';}else return Scene_MenuBase[_0x234f9b(0x523)]['buttonAssistText3']['call'](this);},Scene_Name[_0x488b27(0x523)]['buttonAssistText4']=function(){const _0x7c00e5=_0x488b27;if(this[_0x7c00e5(0x251)]()){const _0xd1633f=VisuMZ[_0x7c00e5(0x96f)]['Settings'][_0x7c00e5(0x601)];if(this['_inputWindow'][_0x7c00e5(0x5a4)]===_0x7c00e5(0x58b))return _0xd1633f['Finish']||_0x7c00e5(0x1d1);}return Scene_MenuBase[_0x7c00e5(0x523)]['buttonAssistText4'][_0x7c00e5(0x1dc)](this);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x86f)]=Scene_Name[_0x488b27(0x523)]['onInputOk'],Scene_Name[_0x488b27(0x523)]['onInputOk']=function(){const _0x327dae=_0x488b27;this[_0x327dae(0x4de)]()?this[_0x327dae(0x6c8)]():VisuMZ[_0x327dae(0x96f)]['Scene_Name_onInputOk'][_0x327dae(0x1dc)](this);},Scene_Name['prototype'][_0x488b27(0x4de)]=function(){const _0x392540=_0x488b27,_0x2dc412=VisuMZ[_0x392540(0x96f)]['Settings'][_0x392540(0x601)];if(!_0x2dc412)return![];const _0x2d6ca0=_0x2dc412[_0x392540(0x7f2)];if(!_0x2d6ca0)return![];const _0x32a7d2=this[_0x392540(0x308)][_0x392540(0x24c)]()['toLowerCase']();for(const _0x1d7fa1 of _0x2d6ca0){if(_0x32a7d2['includes'](_0x1d7fa1[_0x392540(0x726)]()))return!![];}return![];},Scene_Name[_0x488b27(0x523)]['onInputBannedWords']=function(){SoundManager['playBuzzer']();},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x60a)]=Scene_Battle[_0x488b27(0x523)][_0x488b27(0x5f1)],Scene_Battle[_0x488b27(0x523)]['update']=function(){const _0x4db69a=_0x488b27;VisuMZ[_0x4db69a(0x96f)]['Scene_Battle_update'][_0x4db69a(0x1dc)](this);if($gameTemp['_playTestFastMode'])this[_0x4db69a(0x685)]();},Scene_Battle[_0x488b27(0x523)][_0x488b27(0x685)]=function(){const _0x115099=_0x488b27;!BattleManager[_0x115099(0x7dd)]()&&!this['_playtestF7Looping']&&!$gameMessage[_0x115099(0x439)]()&&(this[_0x115099(0x6f1)]=!![],this[_0x115099(0x5f1)](),SceneManager['updateEffekseer'](),this['_playtestF7Looping']=![]);},VisuMZ[_0x488b27(0x96f)]['Scene_Battle_createCancelButton']=Scene_Battle[_0x488b27(0x523)][_0x488b27(0x826)],Scene_Battle[_0x488b27(0x523)][_0x488b27(0x826)]=function(){const _0x162fe3=_0x488b27;VisuMZ[_0x162fe3(0x96f)][_0x162fe3(0x8a8)]['call'](this),SceneManager[_0x162fe3(0x508)]()&&this[_0x162fe3(0x91e)]();},Scene_Battle[_0x488b27(0x523)]['repositionCancelButtonSideButtonLayout']=function(){const _0x58a571=_0x488b27;this[_0x58a571(0x229)]['x']=Graphics[_0x58a571(0x522)]+0x4,this[_0x58a571(0x5c3)]()?this[_0x58a571(0x229)]['y']=Graphics[_0x58a571(0x3b3)]-this['buttonAreaHeight']():this[_0x58a571(0x229)]['y']=0x0;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x6dc)]=Sprite_Button[_0x488b27(0x523)][_0x488b27(0x285)],Sprite_Button[_0x488b27(0x523)]['initialize']=function(_0x949a01){const _0x3ff9cb=_0x488b27;VisuMZ[_0x3ff9cb(0x96f)][_0x3ff9cb(0x6dc)][_0x3ff9cb(0x1dc)](this,_0x949a01),this[_0x3ff9cb(0x2a1)]();},Sprite_Button[_0x488b27(0x523)][_0x488b27(0x2a1)]=function(){const _0x568db5=_0x488b27,_0x3e49ee=VisuMZ[_0x568db5(0x96f)][_0x568db5(0x2f0)]['UI'];this[_0x568db5(0x592)]=![];switch(this[_0x568db5(0x901)]){case _0x568db5(0x407):this[_0x568db5(0x592)]=!_0x3e49ee[_0x568db5(0x432)];break;case _0x568db5(0x910):case _0x568db5(0x93d):this['_isButtonHidden']=!_0x3e49ee[_0x568db5(0x4a8)];break;case _0x568db5(0x77a):case'up':case _0x568db5(0x378):case _0x568db5(0x4f3):case'ok':this[_0x568db5(0x592)]=!_0x3e49ee[_0x568db5(0x1c2)];break;case _0x568db5(0x8a6):this['_isButtonHidden']=!_0x3e49ee[_0x568db5(0x519)];break;}},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x7c2)]=Sprite_Button[_0x488b27(0x523)][_0x488b27(0x7ed)],Sprite_Button[_0x488b27(0x523)][_0x488b27(0x7ed)]=function(){const _0x306122=_0x488b27;SceneManager['areButtonsHidden']()||this[_0x306122(0x592)]?this[_0x306122(0x44a)]():VisuMZ[_0x306122(0x96f)][_0x306122(0x7c2)][_0x306122(0x1dc)](this);},Sprite_Button['prototype'][_0x488b27(0x44a)]=function(){const _0xf3386b=_0x488b27;this[_0xf3386b(0x496)]=![],this[_0xf3386b(0x76d)]=0x0,this['x']=Graphics[_0xf3386b(0x240)]*0xa,this['y']=Graphics['height']*0xa;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x471)]=Sprite_Battler[_0x488b27(0x523)]['startMove'],Sprite_Battler['prototype'][_0x488b27(0x5e8)]=function(_0x3efd09,_0x54e41e,_0x1cd0bc){const _0x53f3a7=_0x488b27;(this[_0x53f3a7(0x1e4)]!==_0x3efd09||this[_0x53f3a7(0x5a7)]!==_0x54e41e)&&(this[_0x53f3a7(0x668)](_0x53f3a7(0x781)),this['_movementWholeDuration']=_0x1cd0bc),VisuMZ['CoreEngine'][_0x53f3a7(0x471)][_0x53f3a7(0x1dc)](this,_0x3efd09,_0x54e41e,_0x1cd0bc);},Sprite_Battler['prototype']['setMoveEasingType']=function(_0x4c7c56){const _0x1ddd39=_0x488b27;this[_0x1ddd39(0x5de)]=_0x4c7c56;},Sprite_Battler['prototype'][_0x488b27(0x356)]=function(){const _0x4c6b69=_0x488b27;if(this[_0x4c6b69(0x97c)]<=0x0)return;const _0xfe9faf=this['_movementDuration'],_0x181eca=this[_0x4c6b69(0x7e2)],_0x4eaca8=this[_0x4c6b69(0x5de)];this[_0x4c6b69(0x7ff)]=this[_0x4c6b69(0x913)](this['_offsetX'],this['_targetOffsetX'],_0xfe9faf,_0x181eca,_0x4eaca8),this[_0x4c6b69(0x4a7)]=this[_0x4c6b69(0x913)](this[_0x4c6b69(0x4a7)],this['_targetOffsetY'],_0xfe9faf,_0x181eca,_0x4eaca8),this[_0x4c6b69(0x97c)]--;if(this['_movementDuration']<=0x0)this[_0x4c6b69(0x328)]();},Sprite_Battler[_0x488b27(0x523)][_0x488b27(0x913)]=function(_0x58e06b,_0xe49897,_0x4cd4dc,_0x5b16cf,_0x4ed16d){const _0x112953=_0x488b27,_0x4aa07f=VisuMZ[_0x112953(0x41f)]((_0x5b16cf-_0x4cd4dc)/_0x5b16cf,_0x4ed16d||_0x112953(0x781)),_0x10437c=VisuMZ['ApplyEasing']((_0x5b16cf-_0x4cd4dc+0x1)/_0x5b16cf,_0x4ed16d||_0x112953(0x781)),_0x5c26cf=(_0x58e06b-_0xe49897*_0x4aa07f)/(0x1-_0x4aa07f);return _0x5c26cf+(_0xe49897-_0x5c26cf)*_0x10437c;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x704)]=Sprite_Actor[_0x488b27(0x523)]['setActorHome'],Sprite_Actor[_0x488b27(0x523)][_0x488b27(0x614)]=function(_0x26905a){const _0x2564ef=_0x488b27;VisuMZ[_0x2564ef(0x96f)][_0x2564ef(0x2f0)]['UI']['RepositionActors']?this[_0x2564ef(0x686)](_0x26905a):VisuMZ[_0x2564ef(0x96f)][_0x2564ef(0x704)][_0x2564ef(0x1dc)](this,_0x26905a);},Sprite_Actor[_0x488b27(0x523)][_0x488b27(0x686)]=function(_0x37f279){const _0x1ae0e8=_0x488b27;let _0x37ddfe=Math[_0x1ae0e8(0x4fd)](Graphics[_0x1ae0e8(0x240)]/0x2+0xc0);_0x37ddfe-=Math[_0x1ae0e8(0x979)]((Graphics[_0x1ae0e8(0x240)]-Graphics[_0x1ae0e8(0x522)])/0x2),_0x37ddfe+=_0x37f279*0x20;let _0x1c4ea2=Graphics[_0x1ae0e8(0x512)]-0xc8-$gameParty[_0x1ae0e8(0x8a5)]()*0x30;_0x1c4ea2-=Math[_0x1ae0e8(0x979)]((Graphics[_0x1ae0e8(0x512)]-Graphics['boxHeight'])/0x2),_0x1c4ea2+=_0x37f279*0x30,this[_0x1ae0e8(0x956)](_0x37ddfe,_0x1c4ea2);},Sprite_Actor['prototype'][_0x488b27(0x7a8)]=function(){const _0x55f1f5=_0x488b27;this[_0x55f1f5(0x5e8)](0x4b0,0x0,0x78);},Sprite_Animation[_0x488b27(0x523)]['setMute']=function(_0x5220f){const _0x3d0732=_0x488b27;this[_0x3d0732(0x4bd)]=_0x5220f;},VisuMZ['CoreEngine'][_0x488b27(0x568)]=Sprite_Animation[_0x488b27(0x523)][_0x488b27(0x549)],Sprite_Animation[_0x488b27(0x523)]['processSoundTimings']=function(){const _0x58ed39=_0x488b27;if(this[_0x58ed39(0x4bd)])return;VisuMZ[_0x58ed39(0x96f)][_0x58ed39(0x568)][_0x58ed39(0x1dc)](this);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x585)]=Sprite_Animation['prototype'][_0x488b27(0x49d)],Sprite_Animation['prototype'][_0x488b27(0x49d)]=function(_0xad5cef){const _0x30ccaf=_0x488b27;this[_0x30ccaf(0x562)]()?this[_0x30ccaf(0x4f0)](_0xad5cef):VisuMZ['CoreEngine'][_0x30ccaf(0x585)][_0x30ccaf(0x1dc)](this,_0xad5cef);},Sprite_Animation[_0x488b27(0x523)][_0x488b27(0x562)]=function(){const _0x2448d8=_0x488b27;if(!this[_0x2448d8(0x36e)])return![];const _0x298b2b=this[_0x2448d8(0x36e)][_0x2448d8(0x24c)]||'';if(_0x298b2b[_0x2448d8(0x426)](/<MIRROR OFFSET X>/i))return!![];if(_0x298b2b[_0x2448d8(0x426)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x2448d8(0x96f)][_0x2448d8(0x2f0)][_0x2448d8(0x59f)]['AnimationMirrorOffset'];},Sprite_Animation[_0x488b27(0x523)][_0x488b27(0x4f0)]=function(_0x3cd02b){const _0x4cd554=_0x488b27,_0x6e1ead=this['_viewportSize'],_0x17ffc5=this[_0x4cd554(0x7ca)],_0x36c4a8=this[_0x4cd554(0x36e)]['offsetX']*(this['_mirror']?-0x1:0x1)-_0x6e1ead/0x2,_0x486f31=this[_0x4cd554(0x36e)][_0x4cd554(0x3ed)]-_0x17ffc5/0x2,_0x1c0f2b=this['targetPosition'](_0x3cd02b);_0x3cd02b['gl']['viewport'](_0x36c4a8+_0x1c0f2b['x'],_0x486f31+_0x1c0f2b['y'],_0x6e1ead,_0x17ffc5);},Sprite_Animation[_0x488b27(0x523)]['targetSpritePosition']=function(_0x1b940e){const _0x1c0be5=_0x488b27;if(_0x1b940e[_0x1c0be5(0x547)]){}const _0x8cab93=this[_0x1c0be5(0x36e)][_0x1c0be5(0x24c)];let _0x39fe70=_0x1b940e[_0x1c0be5(0x512)]*_0x1b940e[_0x1c0be5(0x2d9)]['y'],_0x5e20ac=0x0,_0x45c3c8=-_0x39fe70/0x2;if(_0x8cab93['match'](/<(?:HEAD|HEADER|TOP)>/i))_0x45c3c8=-_0x39fe70;if(_0x8cab93[_0x1c0be5(0x426)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x45c3c8=0x0;if(this['_animation'][_0x1c0be5(0x279)])_0x45c3c8=0x0;if(_0x8cab93[_0x1c0be5(0x426)](/<(?:LEFT)>/i))_0x5e20ac=-_0x1b940e[_0x1c0be5(0x240)]/0x2;if(_0x8cab93['match'](/<(?:RIGHT)>/i))_0x5e20ac=_0x1b940e[_0x1c0be5(0x240)]/0x2;_0x8cab93[_0x1c0be5(0x426)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x5e20ac=Number(RegExp['$1'])*_0x1b940e[_0x1c0be5(0x240)]);_0x8cab93[_0x1c0be5(0x426)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x45c3c8=(0x1-Number(RegExp['$1']))*-_0x39fe70);_0x8cab93[_0x1c0be5(0x426)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x5e20ac=Number(RegExp['$1'])*_0x1b940e[_0x1c0be5(0x240)],_0x45c3c8=(0x1-Number(RegExp['$2']))*-_0x39fe70);if(_0x8cab93[_0x1c0be5(0x426)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x5e20ac+=Number(RegExp['$1']);if(_0x8cab93[_0x1c0be5(0x426)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x45c3c8+=Number(RegExp['$1']);_0x8cab93[_0x1c0be5(0x426)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x5e20ac+=Number(RegExp['$1']),_0x45c3c8+=Number(RegExp['$2']));const _0x167f05=new Point(_0x5e20ac,_0x45c3c8);return _0x1b940e['updateTransform'](),_0x1b940e[_0x1c0be5(0x74e)][_0x1c0be5(0x267)](_0x167f05);},Sprite_AnimationMV[_0x488b27(0x523)][_0x488b27(0x23d)]=function(){const _0x2a15a4=_0x488b27;this[_0x2a15a4(0x5cc)]=VisuMZ[_0x2a15a4(0x96f)][_0x2a15a4(0x2f0)][_0x2a15a4(0x59f)][_0x2a15a4(0x363)]??0x4,this[_0x2a15a4(0x5d2)](),this[_0x2a15a4(0x5cc)]=this[_0x2a15a4(0x5cc)][_0x2a15a4(0x424)](0x1,0xa);},Sprite_AnimationMV[_0x488b27(0x523)][_0x488b27(0x5d2)]=function(){const _0x49be9a=_0x488b27;if(!this[_0x49be9a(0x36e)]);const _0x241a78=this['_animation'][_0x49be9a(0x24c)]||'';_0x241a78[_0x49be9a(0x426)](/<RATE:[ ](\d+)>/i)&&(this[_0x49be9a(0x5cc)]=(Number(RegExp['$1'])||0x1)['clamp'](0x1,0xa));},Sprite_AnimationMV[_0x488b27(0x523)][_0x488b27(0x93e)]=function(_0x163885){const _0x3dc63a=_0x488b27;this[_0x3dc63a(0x4bd)]=_0x163885;},VisuMZ['CoreEngine'][_0x488b27(0x756)]=Sprite_AnimationMV[_0x488b27(0x523)][_0x488b27(0x64a)],Sprite_AnimationMV['prototype'][_0x488b27(0x64a)]=function(_0xaad8c6){const _0x3c6fe7=_0x488b27;this[_0x3c6fe7(0x4bd)]&&(_0xaad8c6=JsonEx['makeDeepCopy'](_0xaad8c6),_0xaad8c6['se']&&(_0xaad8c6['se'][_0x3c6fe7(0x212)]=0x0)),VisuMZ[_0x3c6fe7(0x96f)][_0x3c6fe7(0x756)][_0x3c6fe7(0x1dc)](this,_0xaad8c6);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x206)]=Sprite_AnimationMV[_0x488b27(0x523)][_0x488b27(0x606)],Sprite_AnimationMV[_0x488b27(0x523)][_0x488b27(0x606)]=function(){const _0xa1b5ca=_0x488b27;VisuMZ['CoreEngine'][_0xa1b5ca(0x206)][_0xa1b5ca(0x1dc)](this);if(this[_0xa1b5ca(0x36e)][_0xa1b5ca(0x62f)]===0x3){if(this['x']===0x0)this['x']=Math[_0xa1b5ca(0x4fd)](Graphics[_0xa1b5ca(0x240)]/0x2);if(this['y']===0x0)this['y']=Math[_0xa1b5ca(0x4fd)](Graphics[_0xa1b5ca(0x512)]/0x2);}},Sprite_Damage[_0x488b27(0x523)][_0x488b27(0x76b)]=function(_0xe4e0fc){const _0x3a8798=_0x488b27;let _0x17fa3c=Math[_0x3a8798(0x336)](_0xe4e0fc)[_0x3a8798(0x879)]();this[_0x3a8798(0x5fa)]()&&(_0x17fa3c=VisuMZ['GroupDigits'](_0x17fa3c));const _0x25261c=this[_0x3a8798(0x810)](),_0x4d06ee=Math[_0x3a8798(0x979)](_0x25261c*0.75);for(let _0x25ab1d=0x0;_0x25ab1d<_0x17fa3c['length'];_0x25ab1d++){const _0x3e955c=this[_0x3a8798(0x584)](_0x4d06ee,_0x25261c);_0x3e955c[_0x3a8798(0x5ce)][_0x3a8798(0x765)](_0x17fa3c[_0x25ab1d],0x0,0x0,_0x4d06ee,_0x25261c,_0x3a8798(0x2b4)),_0x3e955c['x']=(_0x25ab1d-(_0x17fa3c[_0x3a8798(0x998)]-0x1)/0x2)*_0x4d06ee,_0x3e955c['dy']=-_0x25ab1d;}},Sprite_Damage[_0x488b27(0x523)]['useDigitGrouping']=function(){const _0x41c1a2=_0x488b27;return VisuMZ[_0x41c1a2(0x96f)][_0x41c1a2(0x2f0)][_0x41c1a2(0x59f)]['DigitGroupingDamageSprites'];},Sprite_Damage[_0x488b27(0x523)][_0x488b27(0x42a)]=function(){return ColorManager['outlineColorDmg']();},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x226)]=Sprite_Gauge[_0x488b27(0x523)][_0x488b27(0x41b)],Sprite_Gauge[_0x488b27(0x523)][_0x488b27(0x41b)]=function(){const _0x4a4f70=_0x488b27;return VisuMZ['CoreEngine'][_0x4a4f70(0x226)][_0x4a4f70(0x1dc)](this)[_0x4a4f70(0x424)](0x0,0x1);},VisuMZ['CoreEngine'][_0x488b27(0x32a)]=Sprite_Gauge[_0x488b27(0x523)][_0x488b27(0x5d8)],Sprite_Gauge[_0x488b27(0x523)][_0x488b27(0x5d8)]=function(){const _0x2d7a42=_0x488b27;let _0x4768c0=VisuMZ[_0x2d7a42(0x96f)][_0x2d7a42(0x32a)][_0x2d7a42(0x1dc)](this);return _0x4768c0;},Sprite_Gauge['prototype'][_0x488b27(0x406)]=function(){const _0x404ae4=_0x488b27;let _0x264a95=this[_0x404ae4(0x5d8)]();this['useDigitGrouping']()&&(_0x264a95=VisuMZ['GroupDigits'](_0x264a95));const _0x394f23=this['bitmapWidth']()-0x1,_0xa6de47=this[_0x404ae4(0x751)]?this[_0x404ae4(0x751)]():this[_0x404ae4(0x77c)]();this[_0x404ae4(0x942)](),this[_0x404ae4(0x5ce)][_0x404ae4(0x765)](_0x264a95,0x0,0x0,_0x394f23,_0xa6de47,_0x404ae4(0x63b));},Sprite_Gauge[_0x488b27(0x523)][_0x488b27(0x535)]=function(){return 0x3;},Sprite_Gauge[_0x488b27(0x523)]['useDigitGrouping']=function(){const _0x23de42=_0x488b27;return VisuMZ['CoreEngine'][_0x23de42(0x2f0)][_0x23de42(0x59f)]['DigitGroupingGaugeSprites'];},Sprite_Gauge[_0x488b27(0x523)][_0x488b27(0x42a)]=function(){const _0x59e26f=_0x488b27;return ColorManager[_0x59e26f(0x3fb)]();},Sprite_StateIcon['NON_FRAME']=VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)]['UI']['StateIconsNonFrame']??!![],VisuMZ[_0x488b27(0x96f)]['Sprite_StateIcon_loadBitmap']=Sprite_StateIcon['prototype']['loadBitmap'],Sprite_StateIcon['prototype'][_0x488b27(0x94b)]=function(){const _0x4b712f=_0x488b27;Sprite_StateIcon['NON_FRAME']?this[_0x4b712f(0x23e)]():VisuMZ[_0x4b712f(0x96f)]['Sprite_StateIcon_loadBitmap'][_0x4b712f(0x1dc)](this);},Sprite_StateIcon[_0x488b27(0x523)][_0x488b27(0x23e)]=function(){const _0x393859=_0x488b27;this['bitmap']=new Bitmap(ImageManager[_0x393859(0x259)],ImageManager[_0x393859(0x58e)]),this['_srcBitmap']=ImageManager[_0x393859(0x766)](_0x393859(0x387));},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x52d)]=Sprite_StateIcon['prototype'][_0x488b27(0x25e)],Sprite_StateIcon['prototype'][_0x488b27(0x25e)]=function(){const _0x4dc068=_0x488b27;Sprite_StateIcon[_0x4dc068(0x5d3)]?this['updateFrameCoreEngine']():VisuMZ[_0x4dc068(0x96f)][_0x4dc068(0x52d)][_0x4dc068(0x1dc)](this);},Sprite_StateIcon['prototype'][_0x488b27(0x69c)]=function(){const _0x56aa39=_0x488b27;if(this['_lastIconIndex']===this[_0x56aa39(0x3d8)])return;this[_0x56aa39(0x38a)]=this[_0x56aa39(0x3d8)];const _0x14bfa7=ImageManager[_0x56aa39(0x259)],_0xb1f0c0=ImageManager['iconHeight'],_0xe6f7c=this[_0x56aa39(0x3d8)]%0x10*_0x14bfa7,_0x43c4ff=Math['floor'](this[_0x56aa39(0x3d8)]/0x10)*_0xb1f0c0,_0x1d2c1=this[_0x56aa39(0x552)],_0x2ed79d=this['bitmap'];_0x2ed79d[_0x56aa39(0x6f5)](),_0x2ed79d[_0x56aa39(0x27f)](_0x1d2c1,_0xe6f7c,_0x43c4ff,_0x14bfa7,_0xb1f0c0,0x0,0x0,_0x2ed79d['width'],_0x2ed79d[_0x56aa39(0x512)]);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x780)]=Sprite_Picture[_0x488b27(0x523)][_0x488b27(0x94b)],Sprite_Picture[_0x488b27(0x523)][_0x488b27(0x94b)]=function(){const _0x3173e3=_0x488b27;this['_pictureName']&&this[_0x3173e3(0x2da)][_0x3173e3(0x426)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x3173e3(0x67c)](Number(RegExp['$1'])):VisuMZ[_0x3173e3(0x96f)]['Sprite_Picture_loadBitmap'][_0x3173e3(0x1dc)](this);},Sprite_Picture[_0x488b27(0x523)][_0x488b27(0x67c)]=function(_0x21b212){const _0x228953=_0x488b27,_0x5b2d78=ImageManager[_0x228953(0x259)],_0x5dad12=ImageManager[_0x228953(0x58e)],_0x4e634e=this['_pictureName'][_0x228953(0x426)](/SMOOTH/i);this[_0x228953(0x5ce)]=new Bitmap(_0x5b2d78,_0x5dad12);const _0x5df0bc=ImageManager[_0x228953(0x766)](_0x228953(0x387)),_0x5be1d8=_0x21b212%0x10*_0x5b2d78,_0x2225e0=Math[_0x228953(0x979)](_0x21b212/0x10)*_0x5dad12;this[_0x228953(0x5ce)]['smooth']=_0x4e634e,this['bitmap'][_0x228953(0x27f)](_0x5df0bc,_0x5be1d8,_0x2225e0,_0x5b2d78,_0x5dad12,0x0,0x0,_0x5b2d78,_0x5dad12);};function Sprite_TitlePictureButton(){const _0x141e2b=_0x488b27;this[_0x141e2b(0x285)](...arguments);}Sprite_TitlePictureButton['prototype']=Object['create'](Sprite_Clickable[_0x488b27(0x523)]),Sprite_TitlePictureButton[_0x488b27(0x523)]['constructor']=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x488b27(0x523)][_0x488b27(0x285)]=function(_0x14189a){const _0x3a904=_0x488b27;Sprite_Clickable['prototype'][_0x3a904(0x285)]['call'](this),this[_0x3a904(0x217)]=_0x14189a,this[_0x3a904(0x64e)]=null,this[_0x3a904(0x748)]();},Sprite_TitlePictureButton[_0x488b27(0x523)]['setup']=function(){const _0x4bdfb5=_0x488b27;this['x']=Graphics['width'],this['y']=Graphics[_0x4bdfb5(0x512)],this[_0x4bdfb5(0x496)]=![],this[_0x4bdfb5(0x895)]();},Sprite_TitlePictureButton['prototype']['setupButtonImage']=function(){const _0x5625ea=_0x488b27;this['bitmap']=ImageManager[_0x5625ea(0x3f4)](this[_0x5625ea(0x217)][_0x5625ea(0x625)]),this[_0x5625ea(0x5ce)][_0x5625ea(0x31a)](this[_0x5625ea(0x2f9)][_0x5625ea(0x8e1)](this));},Sprite_TitlePictureButton[_0x488b27(0x523)][_0x488b27(0x2f9)]=function(){const _0x3f64b3=_0x488b27;this[_0x3f64b3(0x217)][_0x3f64b3(0x83b)][_0x3f64b3(0x1dc)](this),this[_0x3f64b3(0x217)][_0x3f64b3(0x56b)][_0x3f64b3(0x1dc)](this),this['setClickHandler'](this[_0x3f64b3(0x217)][_0x3f64b3(0x65b)]['bind'](this));},Sprite_TitlePictureButton[_0x488b27(0x523)]['update']=function(){const _0x536f69=_0x488b27;Sprite_Clickable['prototype'][_0x536f69(0x5f1)][_0x536f69(0x1dc)](this),this['updateOpacity'](),this[_0x536f69(0x203)]();},Sprite_TitlePictureButton['prototype'][_0x488b27(0x44e)]=function(){const _0xc5537a=_0x488b27;return VisuMZ[_0xc5537a(0x96f)][_0xc5537a(0x2f0)][_0xc5537a(0x516)][_0xc5537a(0x8da)]['ButtonFadeSpeed'];},Sprite_TitlePictureButton[_0x488b27(0x523)][_0x488b27(0x7ed)]=function(){const _0x4870f4=_0x488b27;this[_0x4870f4(0x5ba)]||this['_hovered']?this[_0x4870f4(0x76d)]=0xff:(this['opacity']+=this['visible']?this[_0x4870f4(0x44e)]():-0x1*this[_0x4870f4(0x44e)](),this[_0x4870f4(0x76d)]=Math[_0x4870f4(0x3bd)](0xc0,this[_0x4870f4(0x76d)]));},Sprite_TitlePictureButton[_0x488b27(0x523)][_0x488b27(0x786)]=function(_0x152e75){const _0x2f5d1f=_0x488b27;this[_0x2f5d1f(0x64e)]=_0x152e75;},Sprite_TitlePictureButton['prototype'][_0x488b27(0x946)]=function(){const _0x2f2fc5=_0x488b27;this[_0x2f2fc5(0x64e)]&&this[_0x2f2fc5(0x64e)]();};function Sprite_ExtendedTile(){const _0x2a979f=_0x488b27;this[_0x2a979f(0x285)](...arguments);}Sprite_ExtendedTile[_0x488b27(0x523)]=Object['create'](Sprite[_0x488b27(0x523)]),Sprite_ExtendedTile[_0x488b27(0x523)][_0x488b27(0x7d6)]=Sprite_ExtendedTile,Sprite_ExtendedTile['prototype']['initialize']=function(_0x567311,_0x32a90e,_0x497458,_0x310e6c){const _0x3750a4=_0x488b27;this[_0x3750a4(0x59e)]=Game_CharacterBase['DEFAULT_SHIFT_Y']||-0x6,this[_0x3750a4(0x444)]=_0x567311,this[_0x3750a4(0x334)]=_0x32a90e,this['_tile']=_0x497458,this[_0x3750a4(0x742)]=_0x310e6c,Sprite[_0x3750a4(0x523)][_0x3750a4(0x285)]['call'](this),this[_0x3750a4(0x97e)](),this[_0x3750a4(0x5d5)](),this['setTileFrame'](),this[_0x3750a4(0x5f1)]();},Sprite_ExtendedTile[_0x488b27(0x523)][_0x488b27(0x97e)]=function(){const _0x32ce23=_0x488b27;this[_0x32ce23(0x644)]=new Sprite(),this['_tileSprite'][_0x32ce23(0x846)]['x']=0.5,this[_0x32ce23(0x644)][_0x32ce23(0x846)]['y']=0x1,this[_0x32ce23(0x644)]['y']=-this[_0x32ce23(0x59e)]+0x1,this['addChild'](this['_tileSprite']);},Sprite_ExtendedTile['prototype'][_0x488b27(0x5d5)]=function(){const _0x585c68=_0x488b27,_0x47ea8f=$gameMap[_0x585c68(0x721)](),_0x2396e1=0x5+Math[_0x585c68(0x979)](this['_tile']/0x100);this[_0x585c68(0x644)][_0x585c68(0x5ce)]=ImageManager[_0x585c68(0x854)](_0x47ea8f[_0x585c68(0x1df)][_0x2396e1]);},Sprite_ExtendedTile['prototype'][_0x488b27(0x6f7)]=function(){const _0x352a50=_0x488b27,_0x23d06f=this['_tile'],_0x58b3e4=$gameMap['tileWidth'](),_0xc1ae6e=$gameMap[_0x352a50(0x821)](),_0x16bd20=(Math[_0x352a50(0x979)](_0x23d06f/0x80)%0x2*0x8+_0x23d06f%0x8)*_0x58b3e4,_0x407d56=Math[_0x352a50(0x979)](_0x23d06f%0x100/0x8)%0x10*_0xc1ae6e,_0x506cfe=this['_patternHeight']*_0xc1ae6e;this[_0x352a50(0x644)]['setFrame'](_0x16bd20,_0x407d56-_0x506cfe,_0x58b3e4,_0xc1ae6e+_0x506cfe);},Sprite_ExtendedTile[_0x488b27(0x523)]['update']=function(){const _0x21f46b=_0x488b27;Sprite[_0x21f46b(0x523)][_0x21f46b(0x5f1)][_0x21f46b(0x1dc)](this),this[_0x21f46b(0x606)]();},Sprite_ExtendedTile[_0x488b27(0x523)][_0x488b27(0x606)]=function(){const _0x2472bf=_0x488b27,_0x3b6152=$gameMap[_0x2472bf(0x1c9)](),_0x273981=$gameMap['tileHeight'](),_0x4e4dc2=this[_0x2472bf(0x444)],_0x18e9fa=this[_0x2472bf(0x334)];this['x']=Math[_0x2472bf(0x979)](($gameMap[_0x2472bf(0x5cb)](_0x4e4dc2)+0.5)*_0x3b6152),this['y']=Math['floor'](($gameMap[_0x2472bf(0x89c)](_0x18e9fa)+0x1)*_0x273981)+this[_0x2472bf(0x59e)]-0x1;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x46b)]=Spriteset_Base['prototype'][_0x488b27(0x285)],Spriteset_Base[_0x488b27(0x523)]['initialize']=function(){const _0x5e03c8=_0x488b27;VisuMZ[_0x5e03c8(0x96f)][_0x5e03c8(0x46b)][_0x5e03c8(0x1dc)](this),this[_0x5e03c8(0x247)]();},Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x247)]=function(){const _0x6e2203=_0x488b27;this[_0x6e2203(0x488)]=[],this[_0x6e2203(0x37b)]=[],this[_0x6e2203(0x2dd)]=this[_0x6e2203(0x2d9)]['x'],this[_0x6e2203(0x93a)]=this['scale']['y'];},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x317)]=Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x866)],Spriteset_Base['prototype'][_0x488b27(0x866)]=function(_0x43ed72){const _0x3af0d4=_0x488b27;this[_0x3af0d4(0x99f)](),this[_0x3af0d4(0x31f)](),VisuMZ[_0x3af0d4(0x96f)][_0x3af0d4(0x317)][_0x3af0d4(0x1dc)](this,_0x43ed72);},VisuMZ[_0x488b27(0x96f)]['Spriteset_Base_update']=Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x5f1)],Spriteset_Base[_0x488b27(0x523)]['update']=function(){const _0x209757=_0x488b27;VisuMZ['CoreEngine'][_0x209757(0x6ae)][_0x209757(0x1dc)](this),this['updatePictureSettings'](),this[_0x209757(0x87a)](),this[_0x209757(0x5b6)](),this[_0x209757(0x42f)]();},Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x7c7)]=function(){},Spriteset_Base['prototype']['updatePictureAntiZoom']=function(){const _0x284370=_0x488b27;if(!VisuMZ[_0x284370(0x96f)][_0x284370(0x2f0)]['QoL'][_0x284370(0x560)])return;if(this[_0x284370(0x2dd)]===this[_0x284370(0x2d9)]['x']&&this['_cacheScaleY']===this['scale']['y'])return;this[_0x284370(0x804)](),this[_0x284370(0x2dd)]=this[_0x284370(0x2d9)]['x'],this[_0x284370(0x93a)]=this[_0x284370(0x2d9)]['y'];},Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x804)]=function(){const _0x5cd49f=_0x488b27;if(SceneManager['isSceneMap']()&&Spriteset_Map[_0x5cd49f(0x86b)])return;else{if(SceneManager[_0x5cd49f(0x5e5)]()&&Spriteset_Battle['DETACH_PICTURE_CONTAINER'])return;}this[_0x5cd49f(0x2d9)]['x']!==0x0&&(this[_0x5cd49f(0x34d)]['scale']['x']=0x1/this[_0x5cd49f(0x2d9)]['x'],this['_pictureContainer']['x']=-(this['x']/this['scale']['x'])),this['scale']['y']!==0x0&&(this[_0x5cd49f(0x34d)][_0x5cd49f(0x2d9)]['y']=0x1/this[_0x5cd49f(0x2d9)]['y'],this[_0x5cd49f(0x34d)]['y']=-(this['y']/this['scale']['y']));},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x7a7)]=Spriteset_Base['prototype'][_0x488b27(0x606)],Spriteset_Base['prototype'][_0x488b27(0x606)]=function(){const _0x4a9c43=_0x488b27;VisuMZ[_0x4a9c43(0x96f)][_0x4a9c43(0x7a7)][_0x4a9c43(0x1dc)](this),this['updatePositionCoreEngine']();},Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x975)]=function(){const _0x3eaf80=_0x488b27;if(!$gameScreen)return;if($gameScreen['_shakeDuration']<=0x0)return;this['x']-=Math[_0x3eaf80(0x4fd)]($gameScreen[_0x3eaf80(0x8bc)]());const _0x1b400b=$gameScreen[_0x3eaf80(0x648)]();switch($gameScreen['getCoreEngineScreenShakeStyle']()){case _0x3eaf80(0x55d):this['updatePositionCoreEngineShakeOriginal']();break;case _0x3eaf80(0x455):this[_0x3eaf80(0x8af)]();break;case _0x3eaf80(0x783):this['updatePositionCoreEngineShakeVert']();break;default:this[_0x3eaf80(0x5ca)]();break;}},Spriteset_Base[_0x488b27(0x523)]['updatePositionCoreEngineShakeOriginal']=function(){const _0x22a171=_0x488b27,_0x2713bf=VisuMZ[_0x22a171(0x96f)]['Settings'][_0x22a171(0x544)];if(_0x2713bf&&_0x2713bf[_0x22a171(0x386)])return _0x2713bf[_0x22a171(0x386)][_0x22a171(0x1dc)](this);this['x']+=Math['round']($gameScreen['shake']());},Spriteset_Base[_0x488b27(0x523)]['updatePositionCoreEngineShakeRand']=function(){const _0x23a6df=_0x488b27,_0x186a38=VisuMZ[_0x23a6df(0x96f)]['Settings'][_0x23a6df(0x544)];if(_0x186a38&&_0x186a38[_0x23a6df(0x96c)])return _0x186a38['randomJS']['call'](this);const _0x50fe3e=$gameScreen[_0x23a6df(0x470)]*0.75,_0x486023=$gameScreen['_shakeSpeed']*0.6,_0x57a6d1=$gameScreen[_0x23a6df(0x869)];this['x']+=Math[_0x23a6df(0x4fd)](Math[_0x23a6df(0x575)](_0x50fe3e)-Math[_0x23a6df(0x575)](_0x486023))*(Math[_0x23a6df(0x3bd)](_0x57a6d1,0x1e)*0.5),this['y']+=Math[_0x23a6df(0x4fd)](Math[_0x23a6df(0x575)](_0x50fe3e)-Math[_0x23a6df(0x575)](_0x486023))*(Math[_0x23a6df(0x3bd)](_0x57a6d1,0x1e)*0.5);},Spriteset_Base[_0x488b27(0x523)]['updatePositionCoreEngineShakeHorz']=function(){const _0x111908=_0x488b27,_0x57c7ea=VisuMZ['CoreEngine'][_0x111908(0x2f0)]['ScreenShake'];if(_0x57c7ea&&_0x57c7ea[_0x111908(0x99b)])return _0x57c7ea[_0x111908(0x99b)][_0x111908(0x1dc)](this);const _0x20519a=$gameScreen[_0x111908(0x470)]*0.75,_0x5a6975=$gameScreen['_shakeSpeed']*0.6,_0x31bfe6=$gameScreen['_shakeDuration'];this['x']+=Math['round'](Math[_0x111908(0x575)](_0x20519a)-Math[_0x111908(0x575)](_0x5a6975))*(Math[_0x111908(0x3bd)](_0x31bfe6,0x1e)*0.5);},Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x5d4)]=function(){const _0x4bc03d=_0x488b27,_0x5b3d11=VisuMZ[_0x4bc03d(0x96f)]['Settings'][_0x4bc03d(0x544)];if(_0x5b3d11&&_0x5b3d11[_0x4bc03d(0x2be)])return _0x5b3d11[_0x4bc03d(0x2be)][_0x4bc03d(0x1dc)](this);const _0x41b8e2=$gameScreen[_0x4bc03d(0x470)]*0.75,_0xde941d=$gameScreen[_0x4bc03d(0x1de)]*0.6,_0x328079=$gameScreen[_0x4bc03d(0x869)];this['y']+=Math[_0x4bc03d(0x4fd)](Math[_0x4bc03d(0x575)](_0x41b8e2)-Math[_0x4bc03d(0x575)](_0xde941d))*(Math[_0x4bc03d(0x3bd)](_0x328079,0x1e)*0.5);},Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x5b6)]=function(){const _0x5971e8=_0x488b27;for(const _0x17df03 of this[_0x5971e8(0x488)]){!_0x17df03[_0x5971e8(0x95a)]()&&this[_0x5971e8(0x78d)](_0x17df03);}this[_0x5971e8(0x5e6)]();},Spriteset_Base['prototype'][_0x488b27(0x5e6)]=function(){const _0x469388=_0x488b27;for(;;){const _0x2a163f=$gameTemp[_0x469388(0x73d)]();if(_0x2a163f)this[_0x469388(0x2e5)](_0x2a163f);else break;}},Spriteset_Base['prototype'][_0x488b27(0x2e5)]=function(_0x39437a){const _0x2e1805=_0x488b27,_0x2d2f28=$dataAnimations[_0x39437a[_0x2e1805(0x2d2)]],_0x3adb13=_0x39437a[_0x2e1805(0x4ab)],_0x26c11d=_0x39437a['mirror'],_0x269cef=_0x39437a['mute'];let _0x558d5d=this['animationBaseDelay']();const _0x55fff6=this[_0x2e1805(0x4c3)]();if(this['isAnimationForEach'](_0x2d2f28))for(const _0x156733 of _0x3adb13){this[_0x2e1805(0x99e)]([_0x156733],_0x2d2f28,_0x26c11d,_0x558d5d,_0x269cef),_0x558d5d+=_0x55fff6;}else this[_0x2e1805(0x99e)](_0x3adb13,_0x2d2f28,_0x26c11d,_0x558d5d,_0x269cef);},Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x900)]=function(_0x55bbbd,_0x44660d,_0xe11465,_0x21f940){const _0x3c1a8b=_0x488b27,_0x3c890c=this[_0x3c1a8b(0x41e)](_0x44660d),_0x2bbd3b=new(_0x3c890c?Sprite_AnimationMV:Sprite_Animation)(),_0x18db12=this['makeTargetSprites'](_0x55bbbd),_0x5a44ec=this[_0x3c1a8b(0x2b7)](),_0x2ad8b6=_0x21f940>_0x5a44ec?this[_0x3c1a8b(0x926)]():null;this[_0x3c1a8b(0x338)](_0x55bbbd[0x0])&&(_0xe11465=!_0xe11465),_0x2bbd3b[_0x3c1a8b(0x6f3)]=_0x55bbbd,_0x2bbd3b[_0x3c1a8b(0x748)](_0x18db12,_0x44660d,_0xe11465,_0x21f940,_0x2ad8b6),this[_0x3c1a8b(0x811)](_0x2bbd3b),this[_0x3c1a8b(0x88f)][_0x3c1a8b(0x64c)](_0x2bbd3b);},Spriteset_Base[_0x488b27(0x523)]['createFauxAnimationSprite']=function(_0x4847e2,_0x5c4e52,_0x9dbc46,_0x3ff78d,_0x488abd){const _0x24b3b7=_0x488b27,_0x1f81b3=this[_0x24b3b7(0x41e)](_0x5c4e52),_0x1548b6=new(_0x1f81b3?Sprite_AnimationMV:Sprite_Animation)(),_0x18405f=this['makeTargetSprites'](_0x4847e2);this[_0x24b3b7(0x338)](_0x4847e2[0x0])&&(_0x9dbc46=!_0x9dbc46);_0x1548b6['targetObjects']=_0x4847e2,_0x1548b6[_0x24b3b7(0x748)](_0x18405f,_0x5c4e52,_0x9dbc46,_0x3ff78d),_0x1548b6[_0x24b3b7(0x93e)](_0x488abd),this[_0x24b3b7(0x811)](_0x1548b6);if(this[_0x24b3b7(0x88f)])this[_0x24b3b7(0x88f)][_0x24b3b7(0x6fb)](_0x1548b6);this[_0x24b3b7(0x488)][_0x24b3b7(0x64c)](_0x1548b6);},Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x811)]=function(_0x3d1d18){const _0x44d58b=_0x488b27;this[_0x44d58b(0x417)][_0x44d58b(0x4d0)](_0x3d1d18);},Spriteset_Base[_0x488b27(0x523)]['removeAnimation']=function(_0x12820c){const _0x44ac45=_0x488b27;this[_0x44ac45(0x88f)][_0x44ac45(0x6fb)](_0x12820c),this[_0x44ac45(0x616)](_0x12820c);for(const _0x4524bb of _0x12820c['targetObjects']){_0x4524bb[_0x44ac45(0x2d0)]&&_0x4524bb['endAnimation']();}_0x12820c[_0x44ac45(0x866)]();},Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x78d)]=function(_0x1e044f){const _0x5907d2=_0x488b27;this['_fauxAnimationSprites'][_0x5907d2(0x6fb)](_0x1e044f),this[_0x5907d2(0x616)](_0x1e044f);for(const _0xb28451 of _0x1e044f[_0x5907d2(0x6f3)]){_0xb28451[_0x5907d2(0x2d0)]&&_0xb28451[_0x5907d2(0x2d0)]();}_0x1e044f['destroy']();},Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x616)]=function(_0x370501){const _0x588b18=_0x488b27;this[_0x588b18(0x417)]['removeChild'](_0x370501);},Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x99f)]=function(){const _0x1accf5=_0x488b27;for(const _0x5df47e of this[_0x1accf5(0x488)]){this[_0x1accf5(0x78d)](_0x5df47e);}},Spriteset_Base[_0x488b27(0x523)]['isFauxAnimationPlaying']=function(){const _0x49fe0d=_0x488b27;return this['_fauxAnimationSprites'][_0x49fe0d(0x998)]>0x0;},Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x42f)]=function(){const _0x472068=_0x488b27;for(const _0x598df1 of this['_pointAnimationSprites']){!_0x598df1[_0x472068(0x95a)]()&&this[_0x472068(0x275)](_0x598df1);}this[_0x472068(0x89f)]();},Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x89f)]=function(){const _0x3f45b1=_0x488b27;for(;;){const _0x85b663=$gameTemp[_0x3f45b1(0x69d)]();if(_0x85b663)this[_0x3f45b1(0x591)](_0x85b663);else break;}},Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x591)]=function(_0x270946){const _0xe0895e=_0x488b27,_0x369567=$dataAnimations[_0x270946[_0xe0895e(0x2d2)]],_0x4bbd58=this[_0xe0895e(0x882)](_0x270946),_0x4bb341=_0x270946['mirror'],_0x18cda6=_0x270946[_0xe0895e(0x761)];let _0x28965c=this[_0xe0895e(0x2b7)]();const _0x1f6d43=this[_0xe0895e(0x4c3)]();if(this[_0xe0895e(0x938)](_0x369567))for(const _0x402fdc of _0x4bbd58){this[_0xe0895e(0x92c)]([_0x402fdc],_0x369567,_0x4bb341,_0x28965c,_0x18cda6),_0x28965c+=_0x1f6d43;}else this[_0xe0895e(0x92c)](_0x4bbd58,_0x369567,_0x4bb341,_0x28965c,_0x18cda6);},Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x882)]=function(_0x523d3e){const _0x362da3=_0x488b27,_0x3221dd=new Sprite_Clickable(),_0x55c157=this[_0x362da3(0x49e)]();_0x3221dd['x']=_0x523d3e['x']-_0x55c157['x'],_0x3221dd['y']=_0x523d3e['y']-_0x55c157['y'],_0x3221dd['z']=0x64;const _0x29ab55=this['getPointAnimationLayer']();return _0x29ab55[_0x362da3(0x4d0)](_0x3221dd),[_0x3221dd];},Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x49e)]=function(){return this;},Spriteset_Map[_0x488b27(0x523)][_0x488b27(0x49e)]=function(){const _0x3bdcfd=_0x488b27;return this[_0x3bdcfd(0x2a3)]||this;},Spriteset_Battle['prototype'][_0x488b27(0x49e)]=function(){const _0x2f72c7=_0x488b27;return this[_0x2f72c7(0x489)]||this;},Spriteset_Base[_0x488b27(0x523)]['createPointAnimationSprite']=function(_0x32b9a9,_0x39fbc0,_0x3ae74b,_0x117812,_0x325644){const _0x5b9d30=_0x488b27,_0x17bf1f=this[_0x5b9d30(0x41e)](_0x39fbc0),_0x24ad78=new(_0x17bf1f?Sprite_AnimationMV:Sprite_Animation)();_0x24ad78[_0x5b9d30(0x6f3)]=_0x32b9a9,_0x24ad78[_0x5b9d30(0x748)](_0x32b9a9,_0x39fbc0,_0x3ae74b,_0x117812),_0x24ad78['setMute'](_0x325644),this['addAnimationSpriteToContainer'](_0x24ad78),this[_0x5b9d30(0x37b)][_0x5b9d30(0x64c)](_0x24ad78);},Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x275)]=function(_0x50ef4c){const _0x5d2698=_0x488b27;this['_pointAnimationSprites'][_0x5d2698(0x6fb)](_0x50ef4c),this[_0x5d2698(0x417)][_0x5d2698(0x301)](_0x50ef4c);for(const _0x3df9cc of _0x50ef4c[_0x5d2698(0x6f3)]){_0x3df9cc[_0x5d2698(0x2d0)]&&_0x3df9cc[_0x5d2698(0x2d0)]();const _0x2de2f2=this[_0x5d2698(0x49e)]();if(_0x2de2f2)_0x2de2f2[_0x5d2698(0x301)](_0x3df9cc);}_0x50ef4c[_0x5d2698(0x866)]();},Spriteset_Base[_0x488b27(0x523)]['removeAllPointAnimations']=function(){const _0x529bcb=_0x488b27;for(const _0xa3219b of this[_0x529bcb(0x37b)]){this[_0x529bcb(0x275)](_0xa3219b);}},Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x5c8)]=function(){const _0xe3d3cf=_0x488b27;return this['_pointAnimationSprites'][_0xe3d3cf(0x998)]>0x0;},VisuMZ['CoreEngine'][_0x488b27(0x794)]=Spriteset_Base['prototype'][_0x488b27(0x551)],Spriteset_Base[_0x488b27(0x523)][_0x488b27(0x551)]=function(){const _0x52bb28=_0x488b27;return VisuMZ[_0x52bb28(0x96f)][_0x52bb28(0x794)][_0x52bb28(0x1dc)](this)||this[_0x52bb28(0x5c8)]();},Spriteset_Map[_0x488b27(0x86b)]=VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)]['QoL'][_0x488b27(0x1f0)]||![],VisuMZ[_0x488b27(0x96f)][_0x488b27(0x5dd)]=Scene_Map['prototype'][_0x488b27(0x679)],Scene_Map[_0x488b27(0x523)]['createSpriteset']=function(){const _0x54bf91=_0x488b27;VisuMZ[_0x54bf91(0x96f)]['Scene_Map_createSpriteset_detach'][_0x54bf91(0x1dc)](this);if(!Spriteset_Map[_0x54bf91(0x86b)])return;const _0x1c4d49=this[_0x54bf91(0x724)];if(!_0x1c4d49)return;this[_0x54bf91(0x34d)]=_0x1c4d49[_0x54bf91(0x34d)];if(!this['_pictureContainer'])return;this['addChild'](this[_0x54bf91(0x34d)]);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x270)]=Spriteset_Map[_0x488b27(0x523)]['createTilemap'],Spriteset_Map[_0x488b27(0x523)][_0x488b27(0x449)]=function(){const _0x307412=_0x488b27;VisuMZ[_0x307412(0x96f)][_0x307412(0x270)][_0x307412(0x1dc)](this),this[_0x307412(0x702)]();},Spriteset_Map[_0x488b27(0x523)][_0x488b27(0x702)]=function(){const _0x3972ec=_0x488b27,_0x1001a1=$gameMap['tileset']();if(!_0x1001a1)return;const _0x25a72c=$gameMap['getTileExtendTerrainTags']();if(Object[_0x3972ec(0x1d7)](_0x25a72c)[_0x3972ec(0x998)]<=0x0)return;const _0x6756d8=$gameMap[_0x3972ec(0x8b8)]();this[_0x3972ec(0x873)]=this[_0x3972ec(0x873)]||[];for(let _0x688eb4=0x0;_0x688eb4<$gameMap[_0x3972ec(0x512)]();_0x688eb4++){for(let _0x5ce87f=0x0;_0x5ce87f<$gameMap['width']();_0x5ce87f++){for(const _0x43c228 of $gameMap[_0x3972ec(0x62e)](_0x5ce87f,_0x688eb4)){const _0x5abd95=_0x6756d8[_0x43c228]>>0xc,_0x38204b=_0x25a72c[_0x5abd95]||0x0;if(_0x38204b<=0x0)continue;this['createExtendedTileSprite'](_0x5ce87f,_0x688eb4,_0x43c228,_0x38204b);}}}},Spriteset_Map[_0x488b27(0x523)][_0x488b27(0x6a2)]=function(){const _0x54a44d=_0x488b27;this['_tileExtendSprites']=this[_0x54a44d(0x873)]||[];for(const _0x15aa13 of this['_tileExtendSprites']){this[_0x54a44d(0x2a3)]['removeChild'](_0x15aa13);}this[_0x54a44d(0x873)]=[];},Spriteset_Map[_0x488b27(0x523)]['createExtendedTileSprite']=function(_0x36b7cd,_0x15a623,_0x23d6a2,_0x513524){const _0x5414f1=_0x488b27,_0x261c6d=new Sprite_ExtendedTile(_0x36b7cd,_0x15a623,_0x23d6a2,_0x513524),_0x3d400=$gameMap['tilesetFlags']();_0x3d400[_0x23d6a2]&0x10?_0x261c6d['z']=0x4:_0x261c6d['z']=0x3,this[_0x5414f1(0x2a3)][_0x5414f1(0x4d0)](_0x261c6d),this[_0x5414f1(0x873)]['push'](_0x261c6d);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x736)]=Tilemap[_0x488b27(0x523)][_0x488b27(0x1d5)],Tilemap[_0x488b27(0x523)][_0x488b27(0x1d5)]=function(_0x4c7d9e,_0x41dd62,_0x4b8681){const _0x149195=_0x488b27;if($gameMap[_0x149195(0x3f6)](_0x4c7d9e))return;VisuMZ['CoreEngine'][_0x149195(0x736)][_0x149195(0x1dc)](this,_0x4c7d9e,_0x41dd62,_0x4b8681);},Spriteset_Battle[_0x488b27(0x86b)]=VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)]['QoL']['DetachBattlePictureContainer']||![],VisuMZ[_0x488b27(0x96f)]['Scene_Battle_createSpriteset_detach']=Scene_Battle[_0x488b27(0x523)][_0x488b27(0x679)],Scene_Battle[_0x488b27(0x523)][_0x488b27(0x679)]=function(){const _0x6f3f28=_0x488b27;VisuMZ['CoreEngine']['Scene_Battle_createSpriteset_detach'][_0x6f3f28(0x1dc)](this);if(!Spriteset_Battle[_0x6f3f28(0x86b)])return;const _0x1dd1fd=this[_0x6f3f28(0x724)];if(!_0x1dd1fd)return;this['_pictureContainer']=_0x1dd1fd[_0x6f3f28(0x34d)];if(!this[_0x6f3f28(0x34d)])return;this[_0x6f3f28(0x4d0)](this[_0x6f3f28(0x34d)]);},Spriteset_Battle[_0x488b27(0x523)][_0x488b27(0x2df)]=function(){const _0x46de5a=_0x488b27;this[_0x46de5a(0x43c)]=new PIXI[(_0x46de5a(0x8c1))][(_0x46de5a(0x90c))](clamp=!![]),this[_0x46de5a(0x20c)]=new Sprite(),this[_0x46de5a(0x20c)][_0x46de5a(0x5ce)]=SceneManager[_0x46de5a(0x3b6)](),this[_0x46de5a(0x20c)][_0x46de5a(0x8c1)]=[this[_0x46de5a(0x43c)]],this[_0x46de5a(0x81a)][_0x46de5a(0x4d0)](this[_0x46de5a(0x20c)]);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x621)]=Spriteset_Battle[_0x488b27(0x523)][_0x488b27(0x6b8)],Spriteset_Battle[_0x488b27(0x523)][_0x488b27(0x6b8)]=function(){const _0x44dd82=_0x488b27;this[_0x44dd82(0x405)]()&&this[_0x44dd82(0x64b)](),VisuMZ[_0x44dd82(0x96f)][_0x44dd82(0x621)][_0x44dd82(0x1dc)](this);},Spriteset_Battle[_0x488b27(0x523)][_0x488b27(0x405)]=function(){const _0x17dbc4=_0x488b27,_0x2d4a99=VisuMZ[_0x17dbc4(0x96f)][_0x17dbc4(0x2f0)][_0x17dbc4(0x6e9)];if(!_0x2d4a99)return![];if(Utils['RPGMAKER_VERSION']>=_0x17dbc4(0x2c9)&&!_0x2d4a99[_0x17dbc4(0x880)])return![];return _0x2d4a99[_0x17dbc4(0x28f)];},Spriteset_Battle[_0x488b27(0x523)]['repositionEnemiesByResolution']=function(){const _0x443972=_0x488b27;for(member of $gameTroop[_0x443972(0x204)]()){member[_0x443972(0x58a)]();}},VisuMZ[_0x488b27(0x96f)]['Window_Base_initialize']=Window_Base[_0x488b27(0x523)][_0x488b27(0x285)],Window_Base[_0x488b27(0x523)]['initialize']=function(_0x3fc2d2){const _0x4a213d=_0x488b27;_0x3fc2d2['x']=Math['round'](_0x3fc2d2['x']),_0x3fc2d2['y']=Math['round'](_0x3fc2d2['y']),_0x3fc2d2[_0x4a213d(0x240)]=Math[_0x4a213d(0x4fd)](_0x3fc2d2[_0x4a213d(0x240)]),_0x3fc2d2[_0x4a213d(0x512)]=Math['round'](_0x3fc2d2[_0x4a213d(0x512)]),this['initDigitGrouping'](),VisuMZ[_0x4a213d(0x96f)][_0x4a213d(0x1d0)]['call'](this,_0x3fc2d2),this[_0x4a213d(0x57b)]();},Window_Base[_0x488b27(0x523)][_0x488b27(0x740)]=function(){const _0x5ed16c=_0x488b27;this[_0x5ed16c(0x21d)]=VisuMZ[_0x5ed16c(0x96f)][_0x5ed16c(0x2f0)]['QoL'][_0x5ed16c(0x385)],this[_0x5ed16c(0x3f0)]=VisuMZ[_0x5ed16c(0x96f)][_0x5ed16c(0x2f0)][_0x5ed16c(0x59f)][_0x5ed16c(0x694)];},Window_Base[_0x488b27(0x523)][_0x488b27(0x8f4)]=function(){const _0x353b75=_0x488b27;return VisuMZ[_0x353b75(0x96f)][_0x353b75(0x2f0)]['Window'][_0x353b75(0x83e)];},Window_Base[_0x488b27(0x523)][_0x488b27(0x6a1)]=function(){const _0x594eab=_0x488b27;return VisuMZ[_0x594eab(0x96f)][_0x594eab(0x2f0)][_0x594eab(0x8f6)]['ItemPadding'];},Window_Base['prototype'][_0x488b27(0x652)]=function(){const _0x3fbe65=_0x488b27;$gameSystem[_0x3fbe65(0x358)]?this[_0x3fbe65(0x65d)]=$gameSystem[_0x3fbe65(0x358)]():this['backOpacity']=VisuMZ[_0x3fbe65(0x96f)][_0x3fbe65(0x2f0)][_0x3fbe65(0x8f6)][_0x3fbe65(0x915)];},Window_Base[_0x488b27(0x523)][_0x488b27(0x660)]=function(){const _0x46755a=_0x488b27;return VisuMZ[_0x46755a(0x96f)][_0x46755a(0x2f0)][_0x46755a(0x8f6)]['TranslucentOpacity'];},Window_Base[_0x488b27(0x523)][_0x488b27(0x618)]=function(){const _0x4be430=_0x488b27;return VisuMZ[_0x4be430(0x96f)][_0x4be430(0x2f0)][_0x4be430(0x8f6)][_0x4be430(0x97d)];},VisuMZ['CoreEngine']['Window_Base_update']=Window_Base[_0x488b27(0x523)][_0x488b27(0x5f1)],Window_Base[_0x488b27(0x523)][_0x488b27(0x5f1)]=function(){const _0x52723e=_0x488b27;VisuMZ[_0x52723e(0x96f)]['Window_Base_update'][_0x52723e(0x1dc)](this),this['updateCoreEasing']();},Window_Base[_0x488b27(0x523)]['updateOpen']=function(){const _0x5a8c80=_0x488b27;this[_0x5a8c80(0x3de)]&&(this[_0x5a8c80(0x7f9)]+=this[_0x5a8c80(0x618)](),this[_0x5a8c80(0x4ea)]()&&(this[_0x5a8c80(0x3de)]=![]));},Window_Base[_0x488b27(0x523)][_0x488b27(0x86d)]=function(){const _0x4eac4f=_0x488b27;this[_0x4eac4f(0x37a)]&&(this[_0x4eac4f(0x7f9)]-=this[_0x4eac4f(0x618)](),this['isClosed']()&&(this[_0x4eac4f(0x37a)]=![]));},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x5c0)]=Window_Base[_0x488b27(0x523)][_0x488b27(0x765)],Window_Base[_0x488b27(0x523)][_0x488b27(0x765)]=function(_0x40d996,_0x20ee0c,_0x1308fe,_0x2fe8e4,_0x74fc99){const _0x38ac69=_0x488b27;if(this[_0x38ac69(0x5fa)]())_0x40d996=VisuMZ[_0x38ac69(0x4a1)](_0x40d996);VisuMZ[_0x38ac69(0x96f)][_0x38ac69(0x5c0)][_0x38ac69(0x1dc)](this,_0x40d996,_0x20ee0c,_0x1308fe,_0x2fe8e4,_0x74fc99);},Window_Base[_0x488b27(0x523)][_0x488b27(0x5fa)]=function(){return this['_digitGrouping'];},VisuMZ['CoreEngine'][_0x488b27(0x62c)]=Window_Base[_0x488b27(0x523)][_0x488b27(0x6c4)],Window_Base[_0x488b27(0x523)][_0x488b27(0x6c4)]=function(_0x14974e,_0x560881,_0x4b6949,_0x48d334){const _0x293988=_0x488b27;var _0x49960d=VisuMZ[_0x293988(0x96f)]['Window_Base_createTextState']['call'](this,_0x14974e,_0x560881,_0x4b6949,_0x48d334);if(this['useDigitGroupingEx']())_0x49960d[_0x293988(0x66c)]=String(VisuMZ['GroupDigits'](_0x49960d['text']))||'';return _0x49960d;},Window_Base[_0x488b27(0x523)][_0x488b27(0x671)]=function(){const _0x165e61=_0x488b27;return this[_0x165e61(0x3f0)];},Window_Base[_0x488b27(0x523)][_0x488b27(0x2fd)]=function(_0x179cce){this['_digitGrouping']=_0x179cce;},Window_Base[_0x488b27(0x523)][_0x488b27(0x3eb)]=function(_0x185e51){const _0x8a33ff=_0x488b27;this[_0x8a33ff(0x3f0)]=_0x185e51;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x4b4)]=Window_Base[_0x488b27(0x523)]['drawIcon'],Window_Base['prototype'][_0x488b27(0x823)]=function(_0x461bb3,_0x4cd12f,_0x5814c9){const _0xa52feb=_0x488b27;_0x4cd12f=Math[_0xa52feb(0x4fd)](_0x4cd12f),_0x5814c9=Math[_0xa52feb(0x4fd)](_0x5814c9),VisuMZ['CoreEngine']['Window_Base_drawIcon'][_0xa52feb(0x1dc)](this,_0x461bb3,_0x4cd12f,_0x5814c9);},VisuMZ['CoreEngine'][_0x488b27(0x8db)]=Window_Base[_0x488b27(0x523)][_0x488b27(0x6a8)],Window_Base[_0x488b27(0x523)]['drawFace']=function(_0x543104,_0x2cdd17,_0x3cb1bb,_0x3acd94,_0x518d14,_0x4e2666){const _0x546b2c=_0x488b27;_0x518d14=_0x518d14||ImageManager[_0x546b2c(0x7e7)],_0x4e2666=_0x4e2666||ImageManager[_0x546b2c(0x3ea)],_0x3cb1bb=Math[_0x546b2c(0x4fd)](_0x3cb1bb),_0x3acd94=Math['round'](_0x3acd94),_0x518d14=Math[_0x546b2c(0x4fd)](_0x518d14),_0x4e2666=Math[_0x546b2c(0x4fd)](_0x4e2666),VisuMZ[_0x546b2c(0x96f)][_0x546b2c(0x8db)][_0x546b2c(0x1dc)](this,_0x543104,_0x2cdd17,_0x3cb1bb,_0x3acd94,_0x518d14,_0x4e2666);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x698)]=Window_Base['prototype'][_0x488b27(0x7b6)],Window_Base[_0x488b27(0x523)][_0x488b27(0x7b6)]=function(_0x5bcde3,_0x390744,_0x3ea13e,_0x32bbce){const _0x4a89b5=_0x488b27;_0x3ea13e=Math[_0x4a89b5(0x4fd)](_0x3ea13e),_0x32bbce=Math[_0x4a89b5(0x4fd)](_0x32bbce),VisuMZ[_0x4a89b5(0x96f)][_0x4a89b5(0x698)][_0x4a89b5(0x1dc)](this,_0x5bcde3,_0x390744,_0x3ea13e,_0x32bbce);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x822)]=Window_Selectable[_0x488b27(0x523)][_0x488b27(0x238)],Window_Selectable['prototype'][_0x488b27(0x238)]=function(_0x1f875f){const _0x361d21=_0x488b27;let _0x420aab=VisuMZ['CoreEngine'][_0x361d21(0x822)][_0x361d21(0x1dc)](this,_0x1f875f);return _0x420aab['x']=Math[_0x361d21(0x4fd)](_0x420aab['x']),_0x420aab['y']=Math[_0x361d21(0x4fd)](_0x420aab['y']),_0x420aab[_0x361d21(0x240)]=Math[_0x361d21(0x4fd)](_0x420aab['width']),_0x420aab[_0x361d21(0x512)]=Math[_0x361d21(0x4fd)](_0x420aab[_0x361d21(0x512)]),_0x420aab;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x55e)]=Window_StatusBase[_0x488b27(0x523)]['drawActorSimpleStatus'],Window_StatusBase[_0x488b27(0x523)][_0x488b27(0x80c)]=function(_0x35d417,_0x38baf3,_0x301c12){const _0xad874e=_0x488b27;_0x38baf3=Math[_0xad874e(0x4fd)](_0x38baf3),_0x301c12=Math[_0xad874e(0x4fd)](_0x301c12),VisuMZ[_0xad874e(0x96f)]['Window_StatusBase_drawActorSimpleStatus']['call'](this,_0x35d417,_0x38baf3,_0x301c12);},Window_Base['prototype'][_0x488b27(0x57b)]=function(){const _0x271ba4=_0x488b27;this[_0x271ba4(0x2cf)]={'duration':0x0,'wholeDuration':0x0,'type':_0x271ba4(0x815),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this[_0x271ba4(0x2d9)]['y'],'targetOpacity':this[_0x271ba4(0x76d)],'targetBackOpacity':this[_0x271ba4(0x65d)],'targetContentsOpacity':this[_0x271ba4(0x28d)]};},Window_Base[_0x488b27(0x523)]['updateCoreEasing']=function(){const _0x5d830a=_0x488b27;if(!this['_coreEasing'])return;if(this['_coreEasing']['duration']<=0x0)return;this['x']=this[_0x5d830a(0x77b)](this['x'],this[_0x5d830a(0x2cf)][_0x5d830a(0x2b9)]),this['y']=this[_0x5d830a(0x77b)](this['y'],this[_0x5d830a(0x2cf)][_0x5d830a(0x2af)]),this[_0x5d830a(0x2d9)]['x']=this[_0x5d830a(0x77b)](this[_0x5d830a(0x2d9)]['x'],this[_0x5d830a(0x2cf)][_0x5d830a(0x6a0)]),this[_0x5d830a(0x2d9)]['y']=this[_0x5d830a(0x77b)](this[_0x5d830a(0x2d9)]['y'],this[_0x5d830a(0x2cf)][_0x5d830a(0x395)]),this[_0x5d830a(0x76d)]=this['applyCoreEasing'](this[_0x5d830a(0x76d)],this[_0x5d830a(0x2cf)]['targetOpacity']),this[_0x5d830a(0x65d)]=this['applyCoreEasing'](this['backOpacity'],this[_0x5d830a(0x2cf)][_0x5d830a(0x359)]),this[_0x5d830a(0x28d)]=this['applyCoreEasing'](this[_0x5d830a(0x28d)],this[_0x5d830a(0x2cf)][_0x5d830a(0x630)]),this['_coreEasing'][_0x5d830a(0x1cf)]--;},Window_Base['prototype']['applyCoreEasing']=function(_0x17c85c,_0xbaf05a){const _0x444883=_0x488b27;if(!this[_0x444883(0x2cf)])return _0xbaf05a;const _0x9d9cd5=this[_0x444883(0x2cf)][_0x444883(0x1cf)],_0x366e44=this[_0x444883(0x2cf)]['wholeDuration'],_0x4b5741=this['calcCoreEasing']((_0x366e44-_0x9d9cd5)/_0x366e44),_0x53639d=this[_0x444883(0x67f)]((_0x366e44-_0x9d9cd5+0x1)/_0x366e44),_0x37961a=(_0x17c85c-_0xbaf05a*_0x4b5741)/(0x1-_0x4b5741);return _0x37961a+(_0xbaf05a-_0x37961a)*_0x53639d;},Window_Base['prototype'][_0x488b27(0x67f)]=function(_0x3207f8){const _0x2b54d1=_0x488b27;if(!this[_0x2b54d1(0x2cf)])return _0x3207f8;return VisuMZ['ApplyEasing'](_0x3207f8,this['_coreEasing'][_0x2b54d1(0x713)]||_0x2b54d1(0x815));},Window_Base[_0x488b27(0x523)][_0x488b27(0x3f5)]=function(_0x50a2e9,_0x1e2902){const _0x13daf5=_0x488b27;if(!this[_0x13daf5(0x2cf)])return;this['x']=this[_0x13daf5(0x2cf)][_0x13daf5(0x2b9)],this['y']=this[_0x13daf5(0x2cf)]['targetY'],this[_0x13daf5(0x2d9)]['x']=this[_0x13daf5(0x2cf)][_0x13daf5(0x6a0)],this['scale']['y']=this['_coreEasing'][_0x13daf5(0x395)],this[_0x13daf5(0x76d)]=this[_0x13daf5(0x2cf)][_0x13daf5(0x200)],this['backOpacity']=this[_0x13daf5(0x2cf)][_0x13daf5(0x359)],this['contentsOpacity']=this[_0x13daf5(0x2cf)]['targetContentsOpacity'],this[_0x13daf5(0x676)](_0x50a2e9,_0x1e2902,this['x'],this['y'],this[_0x13daf5(0x2d9)]['x'],this[_0x13daf5(0x2d9)]['y'],this[_0x13daf5(0x76d)],this[_0x13daf5(0x65d)],this[_0x13daf5(0x28d)]);},Window_Base['prototype'][_0x488b27(0x676)]=function(_0xd8c455,_0x4edee1,_0x15b187,_0x256b7c,_0x559b34,_0x1c8543,_0x43d3c9,_0x16ec83,_0x27e489){const _0x3dbe97=_0x488b27;this[_0x3dbe97(0x2cf)]={'duration':_0xd8c455,'wholeDuration':_0xd8c455,'type':_0x4edee1,'targetX':_0x15b187,'targetY':_0x256b7c,'targetScaleX':_0x559b34,'targetScaleY':_0x1c8543,'targetOpacity':_0x43d3c9,'targetBackOpacity':_0x16ec83,'targetContentsOpacity':_0x27e489};},Window_Base[_0x488b27(0x523)]['drawCurrencyValue']=function(_0xee52cc,_0x14fc89,_0x27e657,_0x1b27a0,_0x380e9e){const _0x21f8e1=_0x488b27;this[_0x21f8e1(0x2e1)](),this['contents'][_0x21f8e1(0x810)]=VisuMZ[_0x21f8e1(0x96f)][_0x21f8e1(0x2f0)][_0x21f8e1(0x50a)]['GoldFontSize'];const _0x52ba2e=VisuMZ[_0x21f8e1(0x96f)][_0x21f8e1(0x2f0)][_0x21f8e1(0x50a)][_0x21f8e1(0x25d)];if(_0x52ba2e>0x0&&_0x14fc89===TextManager[_0x21f8e1(0x62a)]){const _0x290634=_0x1b27a0+(this['lineHeight']()-ImageManager[_0x21f8e1(0x58e)])/0x2;this['drawIcon'](_0x52ba2e,_0x27e657+(_0x380e9e-ImageManager[_0x21f8e1(0x259)]),_0x290634),_0x380e9e-=ImageManager['iconWidth']+0x4;}else this[_0x21f8e1(0x953)](ColorManager[_0x21f8e1(0x65a)]()),this[_0x21f8e1(0x765)](_0x14fc89,_0x27e657,_0x1b27a0,_0x380e9e,_0x21f8e1(0x63b)),_0x380e9e-=this[_0x21f8e1(0x847)](_0x14fc89)+0x6;this[_0x21f8e1(0x48e)]();const _0x3580fc=this['textWidth'](this['_digitGrouping']?VisuMZ[_0x21f8e1(0x4a1)](_0xee52cc):_0xee52cc);_0x3580fc>_0x380e9e?this[_0x21f8e1(0x765)](VisuMZ[_0x21f8e1(0x96f)][_0x21f8e1(0x2f0)][_0x21f8e1(0x50a)][_0x21f8e1(0x5a1)],_0x27e657,_0x1b27a0,_0x380e9e,'right'):this['drawText'](_0xee52cc,_0x27e657,_0x1b27a0,_0x380e9e,_0x21f8e1(0x63b)),this[_0x21f8e1(0x2e1)]();},Window_Base[_0x488b27(0x523)][_0x488b27(0x5e4)]=function(_0x43d55f,_0x103591,_0x5d55d4,_0x5c440d,_0x387405){const _0x280e40=_0x488b27,_0x39299b=ImageManager['loadSystem']('IconSet'),_0x56a12a=ImageManager[_0x280e40(0x259)],_0x2377c8=ImageManager[_0x280e40(0x58e)],_0x27964d=_0x43d55f%0x10*_0x56a12a,_0x4a27a2=Math[_0x280e40(0x979)](_0x43d55f/0x10)*_0x2377c8,_0x2d3314=_0x5c440d,_0x2af6f4=_0x5c440d;this['contents'][_0x280e40(0x3d6)][_0x280e40(0x5f6)]=_0x387405,this[_0x280e40(0x5ed)][_0x280e40(0x27f)](_0x39299b,_0x27964d,_0x4a27a2,_0x56a12a,_0x2377c8,_0x103591,_0x5d55d4,_0x2d3314,_0x2af6f4),this[_0x280e40(0x5ed)][_0x280e40(0x3d6)][_0x280e40(0x5f6)]=!![];},Window_Base['prototype'][_0x488b27(0x242)]=function(_0x2ac5d2,_0x47ea6e,_0x34699f,_0x35d832,_0x13d8df,_0x4c2323){const _0x3553aa=_0x488b27,_0x3606d9=Math[_0x3553aa(0x979)]((_0x34699f-0x2)*_0x35d832),_0x3bda94=Sprite_Gauge['prototype'][_0x3553aa(0x98e)]['call'](this),_0x16a192=_0x47ea6e+this[_0x3553aa(0x8f4)]()-_0x3bda94-0x2;this[_0x3553aa(0x5ed)][_0x3553aa(0x3fe)](_0x2ac5d2,_0x16a192,_0x34699f,_0x3bda94,ColorManager[_0x3553aa(0x969)]()),this[_0x3553aa(0x5ed)][_0x3553aa(0x294)](_0x2ac5d2+0x1,_0x16a192+0x1,_0x3606d9,_0x3bda94-0x2,_0x13d8df,_0x4c2323);},Window_Scrollable['SCROLLBAR']={'enabled':VisuMZ[_0x488b27(0x96f)]['Settings']['Window'][_0x488b27(0x73a)]??!![],'thickness':VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)]['Window']['BarThickness']??0x2,'offset':VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)][_0x488b27(0x8f6)]['BarOffset']??0x2,'bodyColor':VisuMZ[_0x488b27(0x96f)]['Settings']['Window']['BarBodyColor']??0x0,'offColor':VisuMZ['CoreEngine'][_0x488b27(0x2f0)][_0x488b27(0x8f6)][_0x488b27(0x73c)]??0x7,'offOpacity':VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)][_0x488b27(0x8f6)]['OffBarOpacity']??0x80},Window_Base[_0x488b27(0x523)][_0x488b27(0x74c)]=function(){const _0x312c4e=_0x488b27;return Window_Scrollable[_0x312c4e(0x973)][_0x312c4e(0x2ad)]&&Window_Scrollable[_0x312c4e(0x973)][_0x312c4e(0x539)]>0x0;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x701)]=Window_Base[_0x488b27(0x523)]['createContents'],Window_Base[_0x488b27(0x523)][_0x488b27(0x8d2)]=function(){const _0x26c4d7=_0x488b27;VisuMZ[_0x26c4d7(0x96f)][_0x26c4d7(0x701)]['call'](this),this['createScrollBarSprites'](),this[_0x26c4d7(0x650)](!![]),this[_0x26c4d7(0x650)](![]);},Window_Base[_0x488b27(0x523)]['createScrollBarSprites']=function(){const _0x10d423=_0x488b27;if(!this[_0x10d423(0x74c)]())return;if(this[_0x10d423(0x5e3)]||this['_scrollBarVert'])return;this[_0x10d423(0x778)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x10d423(0x5e3)]=new Sprite(),this['_scrollBarVert']=new Sprite(),this[_0x10d423(0x4d0)](this[_0x10d423(0x5e3)]),this[_0x10d423(0x4d0)](this[_0x10d423(0x745)]);},Window_Base[_0x488b27(0x523)]['setupScrollBarBitmap']=function(_0x12c27d){const _0x2396f6=_0x488b27,_0x5e9713=_0x12c27d?this[_0x2396f6(0x5e3)]:this[_0x2396f6(0x745)];if(!_0x5e9713)return;const _0x5d50de=Window_Scrollable['SCROLLBAR'],_0x4ce3d4=_0x5d50de[_0x2396f6(0x539)],_0x41da7d=_0x12c27d?this['innerWidth']-_0x4ce3d4*0x2:_0x4ce3d4,_0x33afdb=_0x12c27d?_0x4ce3d4:this[_0x2396f6(0x5e2)]-_0x4ce3d4*0x2;_0x5e9713[_0x2396f6(0x5ce)]=new Bitmap(_0x41da7d,_0x33afdb),_0x5e9713[_0x2396f6(0x400)](0x0,0x0,_0x41da7d,_0x33afdb),this[_0x2396f6(0x48a)](_0x12c27d);},VisuMZ['CoreEngine'][_0x488b27(0x7ab)]=Window_Base[_0x488b27(0x523)][_0x488b27(0x71f)],Window_Base[_0x488b27(0x523)]['destroyContents']=function(){const _0x5a0f18=_0x488b27;VisuMZ[_0x5a0f18(0x96f)][_0x5a0f18(0x7ab)][_0x5a0f18(0x1dc)](this),this[_0x5a0f18(0x2e8)]();},Window_Base['prototype']['destroyScrollBarBitmaps']=function(){const _0x4bea83=_0x488b27,_0x345ad0=[this[_0x4bea83(0x5e3)],this[_0x4bea83(0x745)]];for(const _0x2f22fe of _0x345ad0){if(_0x2f22fe&&_0x2f22fe[_0x4bea83(0x5ce)])_0x2f22fe[_0x4bea83(0x5ce)][_0x4bea83(0x866)]();}},VisuMZ['CoreEngine'][_0x488b27(0x323)]=Window_Scrollable[_0x488b27(0x523)]['update'],Window_Scrollable['prototype'][_0x488b27(0x5f1)]=function(){const _0x292d08=_0x488b27;VisuMZ[_0x292d08(0x96f)][_0x292d08(0x323)]['call'](this),this[_0x292d08(0x3a1)]();},Window_Scrollable['prototype']['updateScrollBars']=function(){const _0x53171d=_0x488b27;this[_0x53171d(0x59a)](),this[_0x53171d(0x22f)](!![]),this['checkScrollBarBitmap'](![]),this[_0x53171d(0x48a)](!![]),this[_0x53171d(0x48a)](![]);},Window_Scrollable['prototype'][_0x488b27(0x59a)]=function(){const _0x3b4e09=_0x488b27,_0x4445ae=[this[_0x3b4e09(0x5e3)],this['_scrollBarVert']];for(const _0x2e4ee8 of _0x4445ae){_0x2e4ee8&&(_0x2e4ee8[_0x3b4e09(0x496)]=this[_0x3b4e09(0x74c)]()&&this[_0x3b4e09(0x4ea)]());}},Window_Scrollable[_0x488b27(0x523)][_0x488b27(0x22f)]=function(_0x4e3864){const _0x20e018=_0x488b27;if(!this['_lastScrollBarValues'])return;const _0x3d5d27=this['scrollbar'](_0x4e3864),_0x205b8b=this[_0x20e018(0x5ef)](_0x4e3864),_0x18fd06=_0x4e3864?_0x20e018(0x3cd):_0x20e018(0x718),_0x3f5014=_0x4e3864?_0x20e018(0x564):'maxVert';(this[_0x20e018(0x778)][_0x18fd06]!==_0x3d5d27||this['_lastScrollBarValues'][_0x3f5014]!==_0x205b8b)&&(this[_0x20e018(0x778)][_0x18fd06]=_0x3d5d27,this[_0x20e018(0x778)][_0x3f5014]=_0x205b8b,this[_0x20e018(0x7ea)](_0x4e3864,_0x3d5d27,_0x205b8b));},Window_Scrollable[_0x488b27(0x523)][_0x488b27(0x5be)]=function(_0xc7958b){const _0x2e8e96=_0x488b27;if(this['_allTextHeight']!==undefined)return _0xc7958b?this[_0x2e8e96(0x396)]():this['origin']['y'];return _0xc7958b?this[_0x2e8e96(0x396)]():this[_0x2e8e96(0x1e6)]();},Window_Scrollable[_0x488b27(0x523)][_0x488b27(0x5ef)]=function(_0x48b90f){const _0x3a4a9f=_0x488b27;if(this['_allTextHeight']!==undefined)return _0x48b90f?this[_0x3a4a9f(0x770)]():Math[_0x3a4a9f(0x3c0)](0x0,this['_allTextHeight']-this[_0x3a4a9f(0x5e2)]);return _0x48b90f?this[_0x3a4a9f(0x770)]():this[_0x3a4a9f(0x558)]();},Window_Scrollable[_0x488b27(0x523)]['scrollbarHeight']=function(){const _0x5c92db=_0x488b27;if(this['_allTextHeight']!==undefined)return Math[_0x5c92db(0x3c0)](0x0,this[_0x5c92db(0x3bf)]);return this[_0x5c92db(0x473)]();},Window_Scrollable[_0x488b27(0x523)][_0x488b27(0x7ea)]=function(_0x4153fa,_0x56ca9f,_0x161165){const _0x4bb80e=_0x488b27,_0x4e7969=_0x4153fa?this['_scrollBarHorz']:this['_scrollBarVert'];if(!_0x4e7969)return;if(!_0x4e7969[_0x4bb80e(0x5ce)])return;const _0x41698b=_0x4e7969[_0x4bb80e(0x5ce)];_0x41698b['clear']();if(_0x161165<=0x0)return;const _0x5825f6=_0x4153fa?this[_0x4bb80e(0x3cc)]/this['overallWidth']():this['innerHeight']/this['scrollbarHeight'](),_0x1149e9=_0x4153fa?Math[_0x4bb80e(0x4fd)](_0x56ca9f*_0x5825f6):0x0,_0x12abf9=_0x4153fa?0x0:Math[_0x4bb80e(0x4fd)](_0x56ca9f*_0x5825f6),_0x2faffb=_0x4153fa?Math[_0x4bb80e(0x4fd)](_0x41698b[_0x4bb80e(0x240)]*_0x5825f6):_0x41698b[_0x4bb80e(0x240)],_0x3fd2cd=_0x4153fa?_0x41698b[_0x4bb80e(0x512)]:Math[_0x4bb80e(0x4fd)](_0x41698b[_0x4bb80e(0x512)]*_0x5825f6),_0x36a6b0=Window_Scrollable[_0x4bb80e(0x973)],_0xde563b=ColorManager[_0x4bb80e(0x99d)](_0x36a6b0['offColor']),_0x4a0587=ColorManager[_0x4bb80e(0x99d)](_0x36a6b0[_0x4bb80e(0x442)]),_0x45ee74=_0x36a6b0['offOpacity'];_0x41698b[_0x4bb80e(0x5bb)]=_0x45ee74,_0x41698b['fillAll'](_0xde563b),_0x41698b[_0x4bb80e(0x5bb)]=0xff,_0x41698b[_0x4bb80e(0x3fe)](_0x1149e9,_0x12abf9,_0x2faffb,_0x3fd2cd,_0x4a0587);},Window_Base['prototype'][_0x488b27(0x48a)]=function(_0x312a74){const _0x1fd483=_0x488b27,_0x130922=_0x312a74?this[_0x1fd483(0x5e3)]:this['_scrollBarVert'];if(!_0x130922)return;const _0x311128=Window_Scrollable[_0x1fd483(0x973)],_0x27dfd7=_0x311128['thickness'],_0x288019=_0x311128[_0x1fd483(0x962)];if(!_0x130922[_0x1fd483(0x25c)])return;_0x130922['x']=this[_0x1fd483(0x2c0)]+(_0x312a74?_0x27dfd7:this[_0x1fd483(0x3cc)]+_0x288019),_0x130922['y']=this[_0x1fd483(0x2c0)]+(_0x312a74?this['innerHeight']+_0x288019:_0x27dfd7);},Window_Selectable[_0x488b27(0x523)][_0x488b27(0x738)]=function(_0x51bec8){const _0x1958b9=_0x488b27;let _0x11f0e3=this['index']();const _0x800705=this[_0x1958b9(0x788)](),_0x2c4bf6=this[_0x1958b9(0x673)]();if(this[_0x1958b9(0x42c)]()&&(_0x11f0e3<_0x800705||_0x51bec8&&_0x2c4bf6===0x1)){_0x11f0e3+=_0x2c4bf6;if(_0x11f0e3>=_0x800705)_0x11f0e3=_0x800705-0x1;this['smoothSelect'](_0x11f0e3);}else!this['isUseModernControls']()&&((_0x11f0e3<_0x800705-_0x2c4bf6||_0x51bec8&&_0x2c4bf6===0x1)&&this[_0x1958b9(0x239)]((_0x11f0e3+_0x2c4bf6)%_0x800705));},VisuMZ[_0x488b27(0x96f)]['Window_Selectable_cursorDown']=Window_Selectable[_0x488b27(0x523)]['cursorDown'],Window_Selectable[_0x488b27(0x523)][_0x488b27(0x738)]=function(_0x3c9f05){const _0x3eb49e=_0x488b27;this[_0x3eb49e(0x42c)]()&&_0x3c9f05&&this['maxCols']()===0x1&&this[_0x3eb49e(0x3af)]()===this[_0x3eb49e(0x788)]()-0x1?this[_0x3eb49e(0x239)](0x0):VisuMZ[_0x3eb49e(0x96f)][_0x3eb49e(0x3e1)][_0x3eb49e(0x1dc)](this,_0x3c9f05);},Window_Selectable[_0x488b27(0x523)]['cursorUp']=function(_0x4fd3f4){const _0x3eb8d8=_0x488b27;let _0x3c766a=Math['max'](0x0,this[_0x3eb8d8(0x3af)]());const _0x4c6e7a=this['maxItems'](),_0x3a6c99=this['maxCols']();if(this[_0x3eb8d8(0x42c)]()&&_0x3c766a>0x0||_0x4fd3f4&&_0x3a6c99===0x1){_0x3c766a-=_0x3a6c99;if(_0x3c766a<=0x0)_0x3c766a=0x0;this[_0x3eb8d8(0x239)](_0x3c766a);}else!this[_0x3eb8d8(0x42c)]()&&((_0x3c766a>=_0x3a6c99||_0x4fd3f4&&_0x3a6c99===0x1)&&this[_0x3eb8d8(0x239)]((_0x3c766a-_0x3a6c99+_0x4c6e7a)%_0x4c6e7a));},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x6b9)]=Window_Selectable[_0x488b27(0x523)]['cursorUp'],Window_Selectable['prototype']['cursorUp']=function(_0x4fd4f6){const _0x17dae5=_0x488b27;this[_0x17dae5(0x42c)]()&&_0x4fd4f6&&this['maxCols']()===0x1&&this[_0x17dae5(0x3af)]()===0x0?this['smoothSelect'](this['maxItems']()-0x1):VisuMZ['CoreEngine'][_0x17dae5(0x6b9)][_0x17dae5(0x1dc)](this,_0x4fd4f6);},Window_Selectable[_0x488b27(0x523)][_0x488b27(0x42c)]=function(){const _0x2ca164=_0x488b27;return VisuMZ['CoreEngine'][_0x2ca164(0x2f0)][_0x2ca164(0x59f)][_0x2ca164(0x792)];},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x233)]=Window_Selectable[_0x488b27(0x523)][_0x488b27(0x4f6)],Window_Selectable[_0x488b27(0x523)][_0x488b27(0x4f6)]=function(){const _0x54fbdb=_0x488b27;this[_0x54fbdb(0x42c)]()?(this[_0x54fbdb(0x845)](),this['processCursorHomeEndTrigger']()):VisuMZ[_0x54fbdb(0x96f)][_0x54fbdb(0x233)]['call'](this);},Window_Selectable[_0x488b27(0x523)][_0x488b27(0x6b5)]=function(){return!![];},Window_Selectable[_0x488b27(0x523)][_0x488b27(0x845)]=function(){const _0xf62e98=_0x488b27;if(this[_0xf62e98(0x7b0)]()){const _0x1f0ccb=this[_0xf62e98(0x3af)]();Input[_0xf62e98(0x1cb)](_0xf62e98(0x77a))&&(Input['isPressed'](_0xf62e98(0x3b1))&&this['allowShiftScrolling']()?this[_0xf62e98(0x983)]():this[_0xf62e98(0x738)](Input[_0xf62e98(0x7f6)](_0xf62e98(0x77a)))),Input[_0xf62e98(0x1cb)]('up')&&(Input[_0xf62e98(0x25a)](_0xf62e98(0x3b1))&&this[_0xf62e98(0x6b5)]()?this[_0xf62e98(0x366)]():this[_0xf62e98(0x84f)](Input[_0xf62e98(0x7f6)]('up'))),Input['isRepeated']('right')&&this[_0xf62e98(0x2cd)](Input[_0xf62e98(0x7f6)]('right')),Input['isRepeated']('left')&&this[_0xf62e98(0x76c)](Input[_0xf62e98(0x7f6)](_0xf62e98(0x960))),!this['isHandled'](_0xf62e98(0x93d))&&Input[_0xf62e98(0x1cb)](_0xf62e98(0x93d))&&this['cursorPagedown'](),!this['isHandled'](_0xf62e98(0x910))&&Input[_0xf62e98(0x1cb)]('pageup')&&this[_0xf62e98(0x366)](),this[_0xf62e98(0x3af)]()!==_0x1f0ccb&&this[_0xf62e98(0x5b8)]();}},Window_Selectable[_0x488b27(0x523)][_0x488b27(0x6f6)]=function(){const _0x3445eb=_0x488b27;if(this[_0x3445eb(0x7b0)]()){const _0x3005ef=this[_0x3445eb(0x3af)]();Input[_0x3445eb(0x7f6)](_0x3445eb(0x8fe))&&this['smoothSelect'](Math[_0x3445eb(0x3bd)](this[_0x3445eb(0x3af)](),0x0)),Input[_0x3445eb(0x7f6)](_0x3445eb(0x420))&&this[_0x3445eb(0x239)](Math['max'](this[_0x3445eb(0x3af)](),this['maxItems']()-0x1)),this[_0x3445eb(0x3af)]()!==_0x3005ef&&this[_0x3445eb(0x5b8)]();}},VisuMZ[_0x488b27(0x96f)]['Window_Selectable_processTouch']=Window_Selectable[_0x488b27(0x523)][_0x488b27(0x203)],Window_Selectable['prototype'][_0x488b27(0x203)]=function(){const _0x17643f=_0x488b27;this[_0x17643f(0x42c)]()?this[_0x17643f(0x237)]():VisuMZ[_0x17643f(0x96f)][_0x17643f(0x1e3)][_0x17643f(0x1dc)](this);},Window_Selectable[_0x488b27(0x523)][_0x488b27(0x237)]=function(){const _0x236291=_0x488b27;VisuMZ['CoreEngine'][_0x236291(0x1e3)][_0x236291(0x1dc)](this);},Window_Selectable[_0x488b27(0x523)]['colSpacing']=function(){const _0x34c271=_0x488b27;return VisuMZ[_0x34c271(0x96f)][_0x34c271(0x2f0)][_0x34c271(0x8f6)][_0x34c271(0x67b)];},Window_Selectable[_0x488b27(0x523)][_0x488b27(0x310)]=function(){const _0xef47a9=_0x488b27;return VisuMZ[_0xef47a9(0x96f)][_0xef47a9(0x2f0)][_0xef47a9(0x8f6)][_0xef47a9(0x37e)];},Window_Selectable[_0x488b27(0x523)][_0x488b27(0x55a)]=function(){const _0x2285c2=_0x488b27;return Window_Scrollable['prototype'][_0x2285c2(0x55a)]['call'](this)+VisuMZ['CoreEngine'][_0x2285c2(0x2f0)]['Window'][_0x2285c2(0x316)];;},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x6f8)]=Window_Selectable[_0x488b27(0x523)][_0x488b27(0x418)],Window_Selectable['prototype'][_0x488b27(0x418)]=function(_0x1224e8){const _0x519abd=_0x488b27,_0x36e233=VisuMZ['CoreEngine'][_0x519abd(0x2f0)]['Window'];if(_0x36e233[_0x519abd(0x390)]===![])return;_0x36e233[_0x519abd(0x408)]?_0x36e233[_0x519abd(0x408)]['call'](this,_0x1224e8):VisuMZ[_0x519abd(0x96f)][_0x519abd(0x6f8)]['call'](this,_0x1224e8);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x559)]=Window_Gold['prototype'][_0x488b27(0x26f)],Window_Gold[_0x488b27(0x523)][_0x488b27(0x26f)]=function(){const _0x4b6a67=_0x488b27;this['isItemStyle']()?this[_0x4b6a67(0x78b)]():VisuMZ[_0x4b6a67(0x96f)][_0x4b6a67(0x559)][_0x4b6a67(0x1dc)](this);},Window_Gold[_0x488b27(0x523)][_0x488b27(0x638)]=function(){const _0x546925=_0x488b27;if(TextManager[_0x546925(0x62a)]!==this[_0x546925(0x62a)]())return![];return VisuMZ['CoreEngine'][_0x546925(0x2f0)][_0x546925(0x50a)][_0x546925(0x71e)];},Window_Gold[_0x488b27(0x523)]['drawGoldItemStyle']=function(){const _0x58b0c1=_0x488b27;this[_0x58b0c1(0x2e1)](),this[_0x58b0c1(0x5ed)]['clear'](),this[_0x58b0c1(0x5ed)][_0x58b0c1(0x810)]=VisuMZ[_0x58b0c1(0x96f)][_0x58b0c1(0x2f0)]['Gold'][_0x58b0c1(0x824)];const _0x1d1c7e=VisuMZ[_0x58b0c1(0x96f)]['Settings'][_0x58b0c1(0x50a)][_0x58b0c1(0x25d)],_0x42fad7=this[_0x58b0c1(0x2f1)](0x0);if(_0x1d1c7e>0x0){const _0x1a19fe=_0x42fad7['y']+(this['lineHeight']()-ImageManager[_0x58b0c1(0x58e)])/0x2;this['drawIcon'](_0x1d1c7e,_0x42fad7['x'],_0x1a19fe);const _0x2e57a1=ImageManager['iconWidth']+0x4;_0x42fad7['x']+=_0x2e57a1,_0x42fad7[_0x58b0c1(0x240)]-=_0x2e57a1;}this['changeTextColor'](ColorManager[_0x58b0c1(0x65a)]()),this[_0x58b0c1(0x765)](this['currencyUnit'](),_0x42fad7['x'],_0x42fad7['y'],_0x42fad7[_0x58b0c1(0x240)],_0x58b0c1(0x960));const _0xfbe665=this['textWidth'](this['currencyUnit']())+0x6;;_0x42fad7['x']+=_0xfbe665,_0x42fad7[_0x58b0c1(0x240)]-=_0xfbe665,this['resetTextColor']();const _0x1d3707=this[_0x58b0c1(0x8e5)](),_0x287179=this[_0x58b0c1(0x847)](this['_digitGrouping']?VisuMZ[_0x58b0c1(0x4a1)](this[_0x58b0c1(0x8e5)]()):this[_0x58b0c1(0x8e5)]());_0x287179>_0x42fad7[_0x58b0c1(0x240)]?this[_0x58b0c1(0x765)](VisuMZ[_0x58b0c1(0x96f)][_0x58b0c1(0x2f0)]['Gold'][_0x58b0c1(0x5a1)],_0x42fad7['x'],_0x42fad7['y'],_0x42fad7['width'],'right'):this[_0x58b0c1(0x765)](this[_0x58b0c1(0x8e5)](),_0x42fad7['x'],_0x42fad7['y'],_0x42fad7[_0x58b0c1(0x240)],'right'),this[_0x58b0c1(0x2e1)]();},Window_StatusBase[_0x488b27(0x523)][_0x488b27(0x890)]=function(_0x460a75,_0x19281a,_0xef3c62,_0x5ab43f,_0x16b5a9){const _0x24a47f=_0x488b27;_0x5ab43f=String(_0x5ab43f||'')['toUpperCase']();if(VisuMZ[_0x24a47f(0x96f)][_0x24a47f(0x2f0)]['Param'][_0x24a47f(0x44c)]){const _0x34cbd8=VisuMZ[_0x24a47f(0x868)](_0x5ab43f);if(_0x16b5a9)this['drawIconBySize'](_0x34cbd8,_0x460a75,_0x19281a,this[_0x24a47f(0x43f)]()),_0xef3c62-=this[_0x24a47f(0x43f)]()+0x2,_0x460a75+=this[_0x24a47f(0x43f)]()+0x2;else{let _0xe6eb7f=0x2;this[_0x24a47f(0x8f4)]()>0x24&&(_0xe6eb7f=Math['floor']((this['lineHeight']()-ImageManager['iconHeight'])/0x2)),this[_0x24a47f(0x823)](_0x34cbd8,_0x460a75+0x2,_0x19281a+_0xe6eb7f),_0xef3c62-=ImageManager[_0x24a47f(0x259)]+0x4,_0x460a75+=ImageManager[_0x24a47f(0x259)]+0x4;}}const _0x45fcae=TextManager[_0x24a47f(0x707)](_0x5ab43f);this[_0x24a47f(0x2e1)](),this[_0x24a47f(0x953)](ColorManager[_0x24a47f(0x65a)]()),_0x16b5a9?(this[_0x24a47f(0x5ed)][_0x24a47f(0x810)]=this[_0x24a47f(0x53c)](),this['contents']['drawText'](_0x45fcae,_0x460a75,_0x19281a,_0xef3c62,this[_0x24a47f(0x43f)](),_0x24a47f(0x960))):this[_0x24a47f(0x765)](_0x45fcae,_0x460a75,_0x19281a,_0xef3c62),this[_0x24a47f(0x2e1)]();},Window_StatusBase[_0x488b27(0x523)][_0x488b27(0x53c)]=function(){const _0x261927=_0x488b27;return $gameSystem[_0x261927(0x832)]()-0x8;},Window_StatusBase['prototype']['drawActorClass']=function(_0x5ed521,_0x63cf94,_0x19cbdf,_0x4c6f47){const _0x2493bd=_0x488b27;_0x4c6f47=_0x4c6f47||0xa8,this[_0x2493bd(0x48e)]();if(VisuMZ[_0x2493bd(0x96f)]['Settings']['UI'][_0x2493bd(0x4b2)])this[_0x2493bd(0x22e)](_0x5ed521['currentClass']()['name'],_0x63cf94,_0x19cbdf,_0x4c6f47);else{const _0x147c23=_0x5ed521[_0x2493bd(0x579)]()[_0x2493bd(0x24c)][_0x2493bd(0x422)](/\\I\[(\d+)\]/gi,'');this[_0x2493bd(0x765)](_0x147c23,_0x63cf94,_0x19cbdf,_0x4c6f47);}},Window_StatusBase[_0x488b27(0x523)][_0x488b27(0x799)]=function(_0x385735,_0x15b0cf,_0x3068ee,_0x5a6c62){const _0x3002c8=_0x488b27;_0x5a6c62=_0x5a6c62||0x10e,this[_0x3002c8(0x48e)]();if(VisuMZ['CoreEngine'][_0x3002c8(0x2f0)]['UI'][_0x3002c8(0x499)])this['drawTextEx'](_0x385735[_0x3002c8(0x7d4)](),_0x15b0cf,_0x3068ee,_0x5a6c62);else{const _0x46e3c2=_0x385735[_0x3002c8(0x7d4)]()['replace'](/\\I\[(\d+)\]/gi,'');this[_0x3002c8(0x765)](_0x385735[_0x3002c8(0x7d4)](),_0x15b0cf,_0x3068ee,_0x5a6c62);}},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x8ee)]=Window_StatusBase['prototype']['drawActorLevel'],Window_StatusBase[_0x488b27(0x523)][_0x488b27(0x8a2)]=function(_0x22eff1,_0x324b1d,_0x2a0863){const _0x33f119=_0x488b27;if(VisuMZ[_0x33f119(0x96f)]['Settings'][_0x33f119(0x945)]['ShowActorLevel']===![])return;if(this[_0x33f119(0x820)]())this[_0x33f119(0x735)](_0x22eff1,_0x324b1d,_0x2a0863);VisuMZ[_0x33f119(0x96f)][_0x33f119(0x8ee)][_0x33f119(0x1dc)](this,_0x22eff1,_0x324b1d,_0x2a0863);},Window_StatusBase[_0x488b27(0x523)]['isExpGaugeDrawn']=function(){const _0x2101f=_0x488b27;return VisuMZ[_0x2101f(0x96f)][_0x2101f(0x2f0)]['UI']['LvExpGauge'];},Window_StatusBase[_0x488b27(0x523)]['drawActorExpGauge']=function(_0x5d32ca,_0x3930f1,_0x365c8c){const _0x26c06d=_0x488b27;if(!_0x5d32ca)return;if(!_0x5d32ca['isActor']())return;const _0x1e63f3=0x80,_0x18f673=_0x5d32ca[_0x26c06d(0x7ba)]();let _0x562626=ColorManager[_0x26c06d(0x3e5)](),_0x37ab68=ColorManager['expGaugeColor2']();_0x18f673>=0x1&&(_0x562626=ColorManager[_0x26c06d(0x7c9)](),_0x37ab68=ColorManager[_0x26c06d(0x458)]()),this[_0x26c06d(0x242)](_0x3930f1,_0x365c8c,_0x1e63f3,_0x18f673,_0x562626,_0x37ab68);},Window_EquipStatus[_0x488b27(0x523)]['drawAllParams']=function(){const _0x228653=_0x488b27;let _0x405b1b=0x0;for(const _0x56f451 of VisuMZ[_0x228653(0x96f)][_0x228653(0x2f0)][_0x228653(0x945)][_0x228653(0x2e9)]){const _0x3f08f9=this[_0x228653(0x6a1)](),_0x135cfc=this[_0x228653(0x214)](_0x405b1b);this['drawItem'](_0x3f08f9,_0x135cfc,_0x56f451),_0x405b1b++;}},Window_EquipStatus[_0x488b27(0x523)][_0x488b27(0x4a9)]=function(_0x6fb0b3,_0x25bac4,_0x5ebff0){const _0x5029fe=_0x488b27,_0x39ddbd=this[_0x5029fe(0x513)]()-this[_0x5029fe(0x6a1)]()*0x2;this[_0x5029fe(0x890)](_0x6fb0b3,_0x25bac4,_0x39ddbd,_0x5ebff0,![]);},Window_EquipStatus[_0x488b27(0x523)]['drawCurrentParam']=function(_0x54e160,_0x35db20,_0x455d3f){const _0x545490=_0x488b27,_0x531740=this['paramWidth']();this[_0x545490(0x48e)](),this[_0x545490(0x765)](this['_actor'][_0x545490(0x47d)](_0x455d3f,!![]),_0x54e160,_0x35db20,_0x531740,_0x545490(0x63b));},Window_EquipStatus[_0x488b27(0x523)][_0x488b27(0x268)]=function(_0x16f77d,_0x3ac9ec){const _0x21797a=_0x488b27,_0x22a3ea=this[_0x21797a(0x632)]();this['changeTextColor'](ColorManager[_0x21797a(0x65a)]());const _0x519d3d=VisuMZ[_0x21797a(0x96f)]['Settings']['UI']['ParamArrow'];this[_0x21797a(0x765)](_0x519d3d,_0x16f77d,_0x3ac9ec,_0x22a3ea,'center');},Window_EquipStatus['prototype'][_0x488b27(0x298)]=function(_0x22f6c0,_0x5b9ada,_0x31b838){const _0x510f1c=_0x488b27,_0x480048=this[_0x510f1c(0x507)](),_0x3df459=this['_tempActor'][_0x510f1c(0x47d)](_0x31b838),_0x3c1b08=_0x3df459-this[_0x510f1c(0x572)][_0x510f1c(0x47d)](_0x31b838);this['changeTextColor'](ColorManager[_0x510f1c(0x827)](_0x3c1b08)),this[_0x510f1c(0x765)](this['_tempActor']['paramValueByName'](_0x31b838,!![]),_0x22f6c0,_0x5b9ada,_0x480048,_0x510f1c(0x63b));},VisuMZ[_0x488b27(0x96f)]['Window_EquipItem_isEnabled']=Window_EquipItem['prototype'][_0x488b27(0x7d2)],Window_EquipItem[_0x488b27(0x523)][_0x488b27(0x7d2)]=function(_0x2ba84f){const _0x439419=_0x488b27;return _0x2ba84f&&this[_0x439419(0x572)]?this[_0x439419(0x572)][_0x439419(0x2d5)](_0x2ba84f):VisuMZ[_0x439419(0x96f)][_0x439419(0x27a)]['call'](this,_0x2ba84f);},Window_StatusParams[_0x488b27(0x523)]['maxItems']=function(){const _0x2cc876=_0x488b27;return VisuMZ[_0x2cc876(0x96f)][_0x2cc876(0x2f0)][_0x2cc876(0x945)]['DisplayedParams'][_0x2cc876(0x998)];},Window_StatusParams[_0x488b27(0x523)][_0x488b27(0x7d1)]=function(_0x4b7912){const _0x12eed9=_0x488b27,_0xd18658=this[_0x12eed9(0x2f1)](_0x4b7912),_0x2e4c90=VisuMZ[_0x12eed9(0x96f)][_0x12eed9(0x2f0)]['Param'][_0x12eed9(0x2e9)][_0x4b7912],_0x40fbe7=TextManager[_0x12eed9(0x707)](_0x2e4c90),_0x5834a4=this['_actor'][_0x12eed9(0x47d)](_0x2e4c90,!![]);this[_0x12eed9(0x890)](_0xd18658['x'],_0xd18658['y'],0xa0,_0x2e4c90,![]),this[_0x12eed9(0x48e)](),this[_0x12eed9(0x765)](_0x5834a4,_0xd18658['x']+0xa0,_0xd18658['y'],0x3c,'right');};if(VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)][_0x488b27(0x601)]['EnableNameInput']){VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)][_0x488b27(0x601)]['QwertyLayout']&&(Window_NameInput['LATIN1']=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x488b27(0x256),'OK']);;VisuMZ['CoreEngine'][_0x488b27(0x6eb)]=Window_NameInput['prototype'][_0x488b27(0x285)],Window_NameInput['prototype'][_0x488b27(0x285)]=function(_0x373012){const _0x8c3f11=_0x488b27;this[_0x8c3f11(0x5a4)]=this[_0x8c3f11(0x373)](),VisuMZ[_0x8c3f11(0x96f)][_0x8c3f11(0x6eb)]['call'](this,_0x373012),this[_0x8c3f11(0x5a4)]==='default'?this[_0x8c3f11(0x93c)](0x0):(Input[_0x8c3f11(0x6f5)](),this[_0x8c3f11(0x4b9)]());},Window_NameInput[_0x488b27(0x523)]['defaultInputMode']=function(){const _0x3874a7=_0x488b27;if(Input[_0x3874a7(0x345)]())return _0x3874a7(0x494);return VisuMZ['CoreEngine'][_0x3874a7(0x2f0)][_0x3874a7(0x601)][_0x3874a7(0x3df)]||'keyboard';},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x7f1)]=Window_NameInput['prototype'][_0x488b27(0x6bb)],Window_NameInput[_0x488b27(0x523)][_0x488b27(0x6bb)]=function(){const _0x2345e1=_0x488b27;if(!this[_0x2345e1(0x4ea)]())return;if(!this['active'])return;if(this[_0x2345e1(0x5a4)]===_0x2345e1(0x58b)&&Input['isGamepadTriggered']())this[_0x2345e1(0x831)]('default');else{if(Input['isSpecialCode'](_0x2345e1(0x515)))Input[_0x2345e1(0x6f5)](),this[_0x2345e1(0x39c)]();else{if(Input[_0x2345e1(0x7f6)]('tab'))Input[_0x2345e1(0x6f5)](),this[_0x2345e1(0x5a4)]===_0x2345e1(0x58b)?this[_0x2345e1(0x831)](_0x2345e1(0x494)):this[_0x2345e1(0x831)](_0x2345e1(0x58b));else{if(this[_0x2345e1(0x5a4)]===_0x2345e1(0x58b))this[_0x2345e1(0x88e)]();else Input[_0x2345e1(0x999)]('escape')?(Input['clear'](),this['switchModes'](_0x2345e1(0x58b))):VisuMZ[_0x2345e1(0x96f)][_0x2345e1(0x7f1)][_0x2345e1(0x1dc)](this);}}}},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x1fc)]=Window_NameInput[_0x488b27(0x523)][_0x488b27(0x203)],Window_NameInput['prototype']['processTouch']=function(){const _0x2c80b1=_0x488b27;if(!this['isOpenAndActive']())return;if(this[_0x2c80b1(0x5a4)]===_0x2c80b1(0x58b)){if(TouchInput[_0x2c80b1(0x7f6)]()&&this[_0x2c80b1(0x624)]())this[_0x2c80b1(0x831)]('default');else TouchInput[_0x2c80b1(0x758)]()&&this[_0x2c80b1(0x831)]('default');}else VisuMZ[_0x2c80b1(0x96f)][_0x2c80b1(0x1fc)]['call'](this);},Window_NameInput[_0x488b27(0x523)][_0x488b27(0x88e)]=function(){const _0x3b6ae8=_0x488b27;if(Input[_0x3b6ae8(0x999)](_0x3b6ae8(0x409)))Input[_0x3b6ae8(0x6f5)](),this['onNameOk']();else{if(Input['_inputString']!==undefined){let _0x51b549=Input[_0x3b6ae8(0x35c)],_0x2502a3=_0x51b549[_0x3b6ae8(0x998)];for(let _0x2aadb5=0x0;_0x2aadb5<_0x2502a3;++_0x2aadb5){this[_0x3b6ae8(0x308)][_0x3b6ae8(0x8ea)](_0x51b549[_0x2aadb5])?SoundManager[_0x3b6ae8(0x4d3)]():SoundManager[_0x3b6ae8(0x245)]();}Input[_0x3b6ae8(0x6f5)]();}}},Window_NameInput[_0x488b27(0x523)]['switchModes']=function(_0x48c69d){const _0x3c5891=_0x488b27;let _0x1c0953=this[_0x3c5891(0x5a4)];this[_0x3c5891(0x5a4)]=_0x48c69d,_0x1c0953!==this[_0x3c5891(0x5a4)]&&(this[_0x3c5891(0x26f)](),SoundManager[_0x3c5891(0x4d3)](),this[_0x3c5891(0x5a4)]==='default'?this['select'](0x0):this[_0x3c5891(0x93c)](-0x1));},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x687)]=Window_NameInput[_0x488b27(0x523)][_0x488b27(0x738)],Window_NameInput['prototype'][_0x488b27(0x738)]=function(_0x49a3e7){const _0x2f156c=_0x488b27;if(this[_0x2f156c(0x5a4)]==='keyboard'&&!Input[_0x2f156c(0x968)]())return;if(Input[_0x2f156c(0x80a)]())return;VisuMZ[_0x2f156c(0x96f)][_0x2f156c(0x687)][_0x2f156c(0x1dc)](this,_0x49a3e7),this['switchModes']('default');},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x7be)]=Window_NameInput[_0x488b27(0x523)]['cursorUp'],Window_NameInput[_0x488b27(0x523)][_0x488b27(0x84f)]=function(_0x46669e){const _0x553cfc=_0x488b27;if(this[_0x553cfc(0x5a4)]==='keyboard'&&!Input[_0x553cfc(0x968)]())return;if(Input[_0x553cfc(0x80a)]())return;VisuMZ[_0x553cfc(0x96f)]['Window_NameInput_cursorUp'][_0x553cfc(0x1dc)](this,_0x46669e),this['switchModes'](_0x553cfc(0x494));},VisuMZ['CoreEngine'][_0x488b27(0x278)]=Window_NameInput[_0x488b27(0x523)][_0x488b27(0x2cd)],Window_NameInput['prototype'][_0x488b27(0x2cd)]=function(_0x76d5ff){const _0x4b8aa1=_0x488b27;if(this[_0x4b8aa1(0x5a4)]===_0x4b8aa1(0x58b)&&!Input[_0x4b8aa1(0x968)]())return;if(Input[_0x4b8aa1(0x80a)]())return;VisuMZ[_0x4b8aa1(0x96f)]['Window_NameInput_cursorRight'][_0x4b8aa1(0x1dc)](this,_0x76d5ff),this[_0x4b8aa1(0x831)](_0x4b8aa1(0x494));},VisuMZ[_0x488b27(0x96f)]['Window_NameInput_cursorLeft']=Window_NameInput[_0x488b27(0x523)][_0x488b27(0x76c)],Window_NameInput[_0x488b27(0x523)][_0x488b27(0x76c)]=function(_0x5bb1a4){const _0x32eb5e=_0x488b27;if(this['_mode']===_0x32eb5e(0x58b)&&!Input['isArrowPressed']())return;if(Input[_0x32eb5e(0x80a)]())return;VisuMZ['CoreEngine'][_0x32eb5e(0x8cd)][_0x32eb5e(0x1dc)](this,_0x5bb1a4),this[_0x32eb5e(0x831)]('default');},VisuMZ['CoreEngine'][_0x488b27(0x28c)]=Window_NameInput[_0x488b27(0x523)][_0x488b27(0x983)],Window_NameInput[_0x488b27(0x523)][_0x488b27(0x983)]=function(){const _0x3f9a51=_0x488b27;if(this['_mode']==='keyboard')return;if(Input[_0x3f9a51(0x80a)]())return;VisuMZ['CoreEngine']['Window_NameInput_cursorPagedown'][_0x3f9a51(0x1dc)](this),this[_0x3f9a51(0x831)]('default');},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x6f0)]=Window_NameInput[_0x488b27(0x523)]['cursorPageup'],Window_NameInput[_0x488b27(0x523)][_0x488b27(0x366)]=function(){const _0x268f9f=_0x488b27;if(this[_0x268f9f(0x5a4)]===_0x268f9f(0x58b))return;if(Input[_0x268f9f(0x80a)]())return;VisuMZ[_0x268f9f(0x96f)][_0x268f9f(0x6f0)]['call'](this),this[_0x268f9f(0x831)]('default');},VisuMZ['CoreEngine'][_0x488b27(0x1d6)]=Window_NameInput['prototype'][_0x488b27(0x26f)],Window_NameInput['prototype'][_0x488b27(0x26f)]=function(){const _0x3d629f=_0x488b27;if(this[_0x3d629f(0x5a4)]==='keyboard'){this['contents'][_0x3d629f(0x6f5)](),this[_0x3d629f(0x6bd)][_0x3d629f(0x6f5)](),this[_0x3d629f(0x48e)]();let _0x4ce2b8=VisuMZ[_0x3d629f(0x96f)][_0x3d629f(0x2f0)]['KeyboardInput'][_0x3d629f(0x6b3)]['split']('\x0a'),_0x49647f=_0x4ce2b8['length'],_0x37a66b=(this[_0x3d629f(0x5e2)]-_0x49647f*this[_0x3d629f(0x8f4)]())/0x2;for(let _0x1247e6=0x0;_0x1247e6<_0x49647f;++_0x1247e6){let _0x37cd51=_0x4ce2b8[_0x1247e6],_0x2c243a=this['textSizeEx'](_0x37cd51)['width'],_0x5bea83=Math['floor']((this['contents'][_0x3d629f(0x240)]-_0x2c243a)/0x2);this[_0x3d629f(0x22e)](_0x37cd51,_0x5bea83,_0x37a66b),_0x37a66b+=this[_0x3d629f(0x8f4)]();}}else VisuMZ[_0x3d629f(0x96f)][_0x3d629f(0x1d6)][_0x3d629f(0x1dc)](this);};}function _0x597b(_0x402f8d,_0x53979a){const _0x5ac5a3=_0x5ac5();return _0x597b=function(_0x597b27,_0x15f7cf){_0x597b27=_0x597b27-0x1c2;let _0x5bd78b=_0x5ac5a3[_0x597b27];return _0x5bd78b;},_0x597b(_0x402f8d,_0x53979a);};VisuMZ[_0x488b27(0x96f)]['Window_ShopSell_isEnabled']=Window_ShopSell[_0x488b27(0x523)][_0x488b27(0x7d2)],Window_ShopSell[_0x488b27(0x523)][_0x488b27(0x7d2)]=function(_0x163cf2){const _0x3d01ae=_0x488b27;return VisuMZ[_0x3d01ae(0x96f)][_0x3d01ae(0x2f0)]['QoL']['KeyItemProtect']&&DataManager['isKeyItem'](_0x163cf2)?![]:VisuMZ[_0x3d01ae(0x96f)][_0x3d01ae(0x3e7)][_0x3d01ae(0x1dc)](this,_0x163cf2);},Window_NumberInput[_0x488b27(0x523)][_0x488b27(0x42c)]=function(){return![];};VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)][_0x488b27(0x601)][_0x488b27(0x3a9)]&&(VisuMZ[_0x488b27(0x96f)]['Window_NumberInput_start']=Window_NumberInput[_0x488b27(0x523)][_0x488b27(0x289)],Window_NumberInput[_0x488b27(0x523)]['start']=function(){const _0x2a21a3=_0x488b27;VisuMZ['CoreEngine'][_0x2a21a3(0x447)]['call'](this),this[_0x2a21a3(0x93c)](this[_0x2a21a3(0x60d)]-0x1),Input['clear']();},VisuMZ[_0x488b27(0x96f)]['Window_NumberInput_processDigitChange']=Window_NumberInput['prototype'][_0x488b27(0x57a)],Window_NumberInput['prototype'][_0x488b27(0x57a)]=function(){const _0x598a30=_0x488b27;if(!this[_0x598a30(0x33f)]())return;if(Input[_0x598a30(0x80a)]())this[_0x598a30(0x8e6)]();else{if(Input[_0x598a30(0x999)](_0x598a30(0x515)))this[_0x598a30(0x63a)]();else{if(Input[_0x598a30(0x817)]===0x2e)this[_0x598a30(0x545)]();else{if(Input[_0x598a30(0x817)]===0x24)this[_0x598a30(0x3e6)]();else Input[_0x598a30(0x817)]===0x23?this['processKeyboardEnd']():VisuMZ['CoreEngine'][_0x598a30(0x265)]['call'](this);}}}},Window_NumberInput[_0x488b27(0x523)][_0x488b27(0x4f6)]=function(){const _0x59112=_0x488b27;if(!this[_0x59112(0x7b0)]())return;Input[_0x59112(0x80a)]()?this['processKeyboardDigitChange']():Window_Selectable['prototype'][_0x59112(0x4f6)][_0x59112(0x1dc)](this);},Window_NumberInput[_0x488b27(0x523)]['processCursorHomeEndTrigger']=function(){},Window_NumberInput[_0x488b27(0x523)][_0x488b27(0x8e6)]=function(){const _0x364d17=_0x488b27;if(String(this['_number'])[_0x364d17(0x998)]>=this[_0x364d17(0x60d)])return;const _0x127fb5=Number(String(this[_0x364d17(0x1ce)])+Input['_inputString']);if(isNaN(_0x127fb5))return;this['_number']=_0x127fb5;const _0x3ad0d8='9'[_0x364d17(0x6b4)](this['_maxDigits']);this[_0x364d17(0x1ce)]=this[_0x364d17(0x1ce)][_0x364d17(0x424)](0x0,_0x3ad0d8),Input[_0x364d17(0x6f5)](),this['refresh'](),SoundManager[_0x364d17(0x27d)](),this[_0x364d17(0x93c)](this[_0x364d17(0x60d)]-0x1);},Window_NumberInput['prototype'][_0x488b27(0x63a)]=function(){const _0x50b08b=_0x488b27;this[_0x50b08b(0x1ce)]=Number(String(this['_number'])[_0x50b08b(0x74b)](0x0,-0x1)),this['_number']=Math[_0x50b08b(0x3c0)](0x0,this[_0x50b08b(0x1ce)]),Input[_0x50b08b(0x6f5)](),this['refresh'](),SoundManager['playCursor'](),this[_0x50b08b(0x93c)](this[_0x50b08b(0x60d)]-0x1);},Window_NumberInput[_0x488b27(0x523)][_0x488b27(0x545)]=function(){const _0x4a7e1d=_0x488b27;this[_0x4a7e1d(0x1ce)]=Number(String(this[_0x4a7e1d(0x1ce)])[_0x4a7e1d(0x22d)](0x1)),this[_0x4a7e1d(0x1ce)]=Math[_0x4a7e1d(0x3c0)](0x0,this['_number']),Input['clear'](),this['refresh'](),SoundManager[_0x4a7e1d(0x27d)](),this[_0x4a7e1d(0x93c)](this['_maxDigits']-0x1);},Window_NumberInput['prototype']['processKeyboardHome']=function(){const _0x5cc730=_0x488b27;if(this[_0x5cc730(0x3af)]()===0x0)return;Input[_0x5cc730(0x6f5)](),this[_0x5cc730(0x26f)](),SoundManager[_0x5cc730(0x27d)](),this[_0x5cc730(0x93c)](0x0);},Window_NumberInput[_0x488b27(0x523)][_0x488b27(0x2c7)]=function(){const _0x39fd29=_0x488b27;if(this[_0x39fd29(0x3af)]()===this[_0x39fd29(0x60d)]-0x1)return;Input[_0x39fd29(0x6f5)](),this[_0x39fd29(0x26f)](),SoundManager[_0x39fd29(0x27d)](),this[_0x39fd29(0x93c)](this[_0x39fd29(0x60d)]-0x1);});;VisuMZ['CoreEngine']['Window_MapName_refresh']=Window_MapName[_0x488b27(0x523)][_0x488b27(0x26f)],Window_MapName[_0x488b27(0x523)][_0x488b27(0x26f)]=function(){const _0xd355f1=_0x488b27;VisuMZ[_0xd355f1(0x96f)]['Settings']['QoL'][_0xd355f1(0x921)]?this[_0xd355f1(0x3cb)]():VisuMZ[_0xd355f1(0x96f)][_0xd355f1(0x6ec)][_0xd355f1(0x1dc)](this);},Window_MapName[_0x488b27(0x523)][_0x488b27(0x3cb)]=function(){const _0x4dfc93=_0x488b27;this[_0x4dfc93(0x5ed)][_0x4dfc93(0x6f5)]();if($gameMap[_0x4dfc93(0x6ee)]()){const _0x53e703=this[_0x4dfc93(0x3cc)];this[_0x4dfc93(0x8dc)](0x0,0x0,_0x53e703,this['lineHeight']());const _0x31cd3d=this['textSizeEx']($gameMap[_0x4dfc93(0x6ee)]())[_0x4dfc93(0x240)];this[_0x4dfc93(0x22e)]($gameMap[_0x4dfc93(0x6ee)](),Math[_0x4dfc93(0x979)]((_0x53e703-_0x31cd3d)/0x2),0x0);}},Window_TitleCommand[_0x488b27(0x392)]=VisuMZ['CoreEngine']['Settings']['TitleCommandList'],Window_TitleCommand[_0x488b27(0x523)][_0x488b27(0x8e7)]=function(){this['makeCoreEngineCommandList']();},Window_TitleCommand[_0x488b27(0x523)]['makeCoreEngineCommandList']=function(){const _0xa2967e=_0x488b27;for(const _0x2a113f of Window_TitleCommand['_commandList']){if(_0x2a113f[_0xa2967e(0x1e5)][_0xa2967e(0x1dc)](this)){const _0x23de99=_0x2a113f[_0xa2967e(0x453)];let _0x2213bd=_0x2a113f['TextStr'];if(['',_0xa2967e(0x894)][_0xa2967e(0x5f8)](_0x2213bd))_0x2213bd=_0x2a113f[_0xa2967e(0x434)][_0xa2967e(0x1dc)](this);const _0x403dfe=_0x2a113f[_0xa2967e(0x3ef)][_0xa2967e(0x1dc)](this),_0x106266=_0x2a113f['ExtJS'][_0xa2967e(0x1dc)](this);this[_0xa2967e(0x708)](_0x2213bd,_0x23de99,_0x403dfe,_0x106266),this[_0xa2967e(0x79f)](_0x23de99,_0x2a113f['CallHandlerJS'][_0xa2967e(0x8e1)](this,_0x106266));}}},VisuMZ[_0x488b27(0x96f)]['Window_TitleCommand_selectLast']=Window_TitleCommand[_0x488b27(0x523)][_0x488b27(0x6ed)],Window_TitleCommand[_0x488b27(0x523)][_0x488b27(0x6ed)]=function(){const _0x26cc03=_0x488b27;VisuMZ[_0x26cc03(0x96f)][_0x26cc03(0x908)][_0x26cc03(0x1dc)](this);if(!Window_TitleCommand[_0x26cc03(0x315)])return;const _0x403d2f=this['findSymbol'](Window_TitleCommand[_0x26cc03(0x315)]),_0x5d0b4c=Math[_0x26cc03(0x979)](this[_0x26cc03(0x837)]()/0x2)-0x1;this['smoothSelect'](_0x403d2f),this[_0x26cc03(0x4d7)]>0x1&&(this['_scrollDuration']=0x1,this['updateSmoothScroll']()),this['setTopRow'](_0x403d2f-_0x5d0b4c);},Window_GameEnd[_0x488b27(0x392)]=VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)][_0x488b27(0x516)][_0x488b27(0x7aa)][_0x488b27(0x81b)],Window_GameEnd[_0x488b27(0x523)][_0x488b27(0x8e7)]=function(){const _0x2128d6=_0x488b27;this[_0x2128d6(0x833)]();},Window_GameEnd[_0x488b27(0x523)][_0x488b27(0x833)]=function(){const _0x550c64=_0x488b27;for(const _0x445342 of Window_GameEnd['_commandList']){if(_0x445342[_0x550c64(0x1e5)][_0x550c64(0x1dc)](this)){const _0x22d9fd=_0x445342[_0x550c64(0x453)];let _0x400c53=_0x445342[_0x550c64(0x8dd)];if(['',_0x550c64(0x894)][_0x550c64(0x5f8)](_0x400c53))_0x400c53=_0x445342[_0x550c64(0x434)]['call'](this);const _0x558e7a=_0x445342[_0x550c64(0x3ef)][_0x550c64(0x1dc)](this),_0x65e372=_0x445342[_0x550c64(0x2ae)][_0x550c64(0x1dc)](this);this[_0x550c64(0x708)](_0x400c53,_0x22d9fd,_0x558e7a,_0x65e372),this[_0x550c64(0x79f)](_0x22d9fd,_0x445342[_0x550c64(0x65b)][_0x550c64(0x8e1)](this,_0x65e372));}}};function Window_ButtonAssist(){const _0x4fc216=_0x488b27;this[_0x4fc216(0x285)](...arguments);}Window_ButtonAssist[_0x488b27(0x523)]=Object[_0x488b27(0x7e3)](Window_Base[_0x488b27(0x523)]),Window_ButtonAssist['prototype'][_0x488b27(0x7d6)]=Window_ButtonAssist,Window_ButtonAssist[_0x488b27(0x523)][_0x488b27(0x285)]=function(_0x173170){const _0x278c6=_0x488b27;this[_0x278c6(0x217)]={},Window_Base['prototype'][_0x278c6(0x285)][_0x278c6(0x1dc)](this,_0x173170),this[_0x278c6(0x83d)](VisuMZ['CoreEngine'][_0x278c6(0x2f0)][_0x278c6(0x988)]['BgType']||0x0),this[_0x278c6(0x26f)]();},Window_ButtonAssist[_0x488b27(0x523)]['lineHeight']=function(){const _0x25b785=_0x488b27;return this['innerHeight']||Window_Base[_0x25b785(0x523)][_0x25b785(0x8f4)][_0x25b785(0x1dc)](this);},Window_ButtonAssist[_0x488b27(0x523)][_0x488b27(0x631)]=function(){const _0x2ac813=_0x488b27;this[_0x2ac813(0x5ed)][_0x2ac813(0x810)]<=0x60&&(this[_0x2ac813(0x5ed)]['fontSize']+=0x6);},Window_ButtonAssist[_0x488b27(0x523)][_0x488b27(0x427)]=function(){const _0x363620=_0x488b27;this[_0x363620(0x5ed)][_0x363620(0x810)]>=0x18&&(this[_0x363620(0x5ed)][_0x363620(0x810)]-=0x6);},Window_ButtonAssist[_0x488b27(0x523)][_0x488b27(0x5f1)]=function(){const _0xcaa190=_0x488b27;Window_Base[_0xcaa190(0x523)]['update'][_0xcaa190(0x1dc)](this),this['updateKeyText']();},Window_ButtonAssist[_0x488b27(0x523)][_0x488b27(0x3f8)]=function(){const _0x868613=_0x488b27;this[_0x868613(0x2c0)]=SceneManager['_scene'][_0x868613(0x5c9)]()!=='button'?0x0:0x8;},Window_ButtonAssist[_0x488b27(0x523)][_0x488b27(0x87e)]=function(){const _0xfc22a4=_0x488b27,_0x247210=SceneManager[_0xfc22a4(0x51f)];for(let _0x410aff=0x1;_0x410aff<=0x5;_0x410aff++){if(this[_0xfc22a4(0x217)][_0xfc22a4(0x5bd)[_0xfc22a4(0x88c)](_0x410aff)]!==_0x247210[_0xfc22a4(0x654)['format'](_0x410aff)]())return this[_0xfc22a4(0x26f)]();if(this['_data'][_0xfc22a4(0x394)[_0xfc22a4(0x88c)](_0x410aff)]!==_0x247210[_0xfc22a4(0x3d0)[_0xfc22a4(0x88c)](_0x410aff)]())return this[_0xfc22a4(0x26f)]();}},Window_ButtonAssist[_0x488b27(0x523)]['refresh']=function(){const _0x1b4ed6=_0x488b27;this[_0x1b4ed6(0x5ed)][_0x1b4ed6(0x6f5)]();for(let _0x335859=0x1;_0x335859<=0x5;_0x335859++){this[_0x1b4ed6(0x622)](_0x335859);}},Window_ButtonAssist[_0x488b27(0x523)][_0x488b27(0x622)]=function(_0xc7bc77){const _0x477dd6=_0x488b27,_0x35bf31=this[_0x477dd6(0x3cc)]/0x5,_0x1e11a3=SceneManager['_scene'],_0x26104b=_0x1e11a3[_0x477dd6(0x654)[_0x477dd6(0x88c)](_0xc7bc77)](),_0x64da0a=_0x1e11a3['buttonAssistText%1'[_0x477dd6(0x88c)](_0xc7bc77)]();this[_0x477dd6(0x217)][_0x477dd6(0x5bd)['format'](_0xc7bc77)]=_0x26104b,this[_0x477dd6(0x217)]['text%1'[_0x477dd6(0x88c)](_0xc7bc77)]=_0x64da0a;if(_0x26104b==='')return;if(_0x64da0a==='')return;const _0x51bac1=_0x1e11a3[_0x477dd6(0x4ef)[_0x477dd6(0x88c)](_0xc7bc77)](),_0x176c9f=this['itemPadding'](),_0xa04bcf=_0x35bf31*(_0xc7bc77-0x1)+_0x176c9f+_0x51bac1,_0x2582f7=VisuMZ[_0x477dd6(0x96f)][_0x477dd6(0x2f0)]['ButtonAssist'][_0x477dd6(0x480)];this[_0x477dd6(0x22e)](_0x2582f7['format'](_0x26104b,_0x64da0a),_0xa04bcf,0x0,_0x35bf31-_0x176c9f*0x2);},VisuMZ['CoreEngine'][_0x488b27(0x31c)]=Game_Interpreter[_0x488b27(0x523)][_0x488b27(0x43e)],Game_Interpreter['prototype'][_0x488b27(0x43e)]=function(){const _0x2be180=_0x488b27;if($gameTemp[_0x2be180(0x4cf)]!==undefined)return VisuMZ[_0x2be180(0x96f)][_0x2be180(0x543)]();return VisuMZ[_0x2be180(0x96f)][_0x2be180(0x31c)][_0x2be180(0x1dc)](this);},VisuMZ['CoreEngine'][_0x488b27(0x543)]=function(){const _0x5d16b7=_0x488b27,_0x47373=$gameTemp[_0x5d16b7(0x4cf)]||0x0;(_0x47373<0x0||_0x47373>0x64||TouchInput[_0x5d16b7(0x758)]()||Input[_0x5d16b7(0x7f6)](_0x5d16b7(0x407)))&&($gameTemp['_pictureCoordinatesMode']=undefined,Input[_0x5d16b7(0x6f5)](),TouchInput['clear']());const _0x5eef88=$gameScreen[_0x5d16b7(0x795)](_0x47373);return _0x5eef88&&(_0x5eef88['_x']=TouchInput['_x'],_0x5eef88['_y']=TouchInput['_y']),VisuMZ[_0x5d16b7(0x96f)][_0x5d16b7(0x525)](),$gameTemp[_0x5d16b7(0x4cf)]!==undefined;},VisuMZ[_0x488b27(0x96f)]['updatePictureCoordinates']=function(){const _0x399951=_0x488b27,_0x42f40c=SceneManager['_scene'];if(!_0x42f40c)return;!_0x42f40c[_0x399951(0x1e9)]&&(SoundManager['playLoad'](),_0x42f40c[_0x399951(0x1e9)]=new Window_PictureCoordinates(),_0x42f40c[_0x399951(0x4d0)](_0x42f40c[_0x399951(0x1e9)])),$gameTemp[_0x399951(0x4cf)]===undefined&&(SoundManager['playCancel'](),_0x42f40c[_0x399951(0x301)](_0x42f40c['_pictureCoordinatesWindow']),_0x42f40c[_0x399951(0x1e9)]=undefined);};function Window_PictureCoordinates(){const _0x4652fc=_0x488b27;this[_0x4652fc(0x285)](...arguments);}Window_PictureCoordinates[_0x488b27(0x523)]=Object[_0x488b27(0x7e3)](Window_Base[_0x488b27(0x523)]),Window_PictureCoordinates[_0x488b27(0x523)][_0x488b27(0x7d6)]=Window_PictureCoordinates,Window_PictureCoordinates['prototype'][_0x488b27(0x285)]=function(){const _0xf94735=_0x488b27;this[_0xf94735(0x78c)]=_0xf94735(0x95c),this[_0xf94735(0x250)]=_0xf94735(0x95c),this[_0xf94735(0x51a)]=_0xf94735(0x95c);const _0x955c14=this[_0xf94735(0x92d)]();Window_Base[_0xf94735(0x523)][_0xf94735(0x285)][_0xf94735(0x1dc)](this,_0x955c14),this[_0xf94735(0x83d)](0x2);},Window_PictureCoordinates[_0x488b27(0x523)][_0x488b27(0x92d)]=function(){const _0x38af17=_0x488b27;let _0x4d179e=0x0,_0x2efdfe=Graphics[_0x38af17(0x512)]-this['lineHeight'](),_0x4ed9b5=Graphics[_0x38af17(0x240)],_0x176ad3=this[_0x38af17(0x8f4)]();return new Rectangle(_0x4d179e,_0x2efdfe,_0x4ed9b5,_0x176ad3);},Window_PictureCoordinates[_0x488b27(0x523)][_0x488b27(0x3f8)]=function(){const _0xcea854=_0x488b27;this[_0xcea854(0x2c0)]=0x0;},Window_PictureCoordinates[_0x488b27(0x523)]['update']=function(){const _0x3cea1a=_0x488b27;Window_Base[_0x3cea1a(0x523)][_0x3cea1a(0x5f1)][_0x3cea1a(0x1dc)](this),this[_0x3cea1a(0x502)]();},Window_PictureCoordinates[_0x488b27(0x523)][_0x488b27(0x502)]=function(){const _0x50a619=_0x488b27;if(!this[_0x50a619(0x69b)]())return;this[_0x50a619(0x26f)]();},Window_PictureCoordinates[_0x488b27(0x523)]['needsUpdate']=function(){const _0x3bd76c=_0x488b27,_0x4306e7=$gameTemp[_0x3bd76c(0x4cf)],_0x2bef99=$gameScreen[_0x3bd76c(0x795)](_0x4306e7);return _0x2bef99?this[_0x3bd76c(0x78c)]!==_0x2bef99[_0x3bd76c(0x6d3)]||this[_0x3bd76c(0x250)]!==_0x2bef99['_x']||this[_0x3bd76c(0x51a)]!==_0x2bef99['_y']:![];},Window_PictureCoordinates[_0x488b27(0x523)][_0x488b27(0x26f)]=function(){const _0x5b8fac=_0x488b27;this['contents'][_0x5b8fac(0x6f5)]();const _0x2f57fc=$gameTemp[_0x5b8fac(0x4cf)],_0x4b9f85=$gameScreen[_0x5b8fac(0x795)](_0x2f57fc);if(!_0x4b9f85)return;this[_0x5b8fac(0x78c)]=_0x4b9f85[_0x5b8fac(0x6d3)],this['_lastX']=_0x4b9f85['_x'],this[_0x5b8fac(0x51a)]=_0x4b9f85['_y'];const _0x7bfa07=ColorManager['itemBackColor1']();this[_0x5b8fac(0x5ed)]['fillRect'](0x0,0x0,this['innerWidth'],this[_0x5b8fac(0x5e2)],_0x7bfa07);const _0x147f74=_0x5b8fac(0x3e9)[_0x5b8fac(0x88c)](_0x4b9f85['_origin']===0x0?_0x5b8fac(0x8ab):_0x5b8fac(0x403)),_0x334c15='X:\x20%1'[_0x5b8fac(0x88c)](_0x4b9f85['_x']),_0x15fb7e=_0x5b8fac(0x2d8)['format'](_0x4b9f85['_y']),_0x8f5e38=_0x5b8fac(0x349)[_0x5b8fac(0x88c)](TextManager[_0x5b8fac(0x855)](_0x5b8fac(0x407)));let _0x10341e=Math[_0x5b8fac(0x979)](this[_0x5b8fac(0x3cc)]/0x4);this[_0x5b8fac(0x765)](_0x147f74,_0x10341e*0x0,0x0,_0x10341e),this[_0x5b8fac(0x765)](_0x334c15,_0x10341e*0x1,0x0,_0x10341e,_0x5b8fac(0x2b4)),this[_0x5b8fac(0x765)](_0x15fb7e,_0x10341e*0x2,0x0,_0x10341e,'center');const _0x48917b=this[_0x5b8fac(0x57d)](_0x8f5e38)[_0x5b8fac(0x240)],_0x3c1889=this[_0x5b8fac(0x3cc)]-_0x48917b;this[_0x5b8fac(0x22e)](_0x8f5e38,_0x3c1889,0x0,_0x48917b);};function Window_TextPopup(){const _0x5f04d2=_0x488b27;this[_0x5f04d2(0x285)](...arguments);}Window_TextPopup[_0x488b27(0x523)]=Object[_0x488b27(0x7e3)](Window_Base[_0x488b27(0x523)]),Window_TextPopup[_0x488b27(0x523)]['constructor']=Window_TextPopup,Window_TextPopup[_0x488b27(0x454)]={'framesPerChar':VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)][_0x488b27(0x8f6)][_0x488b27(0x737)]??1.5,'framesMin':VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)][_0x488b27(0x8f6)][_0x488b27(0x351)]??0x5a,'framesMax':VisuMZ[_0x488b27(0x96f)][_0x488b27(0x2f0)][_0x488b27(0x8f6)][_0x488b27(0x992)]??0x12c},Window_TextPopup[_0x488b27(0x523)][_0x488b27(0x285)]=function(){const _0x488e14=_0x488b27,_0x23e9d3=new Rectangle(0x0,0x0,0x1,0x1);Window_Base[_0x488e14(0x523)][_0x488e14(0x285)][_0x488e14(0x1dc)](this,_0x23e9d3),this[_0x488e14(0x7f9)]=0x0,this[_0x488e14(0x309)]='',this[_0x488e14(0x34c)]=[],this[_0x488e14(0x40e)]=0x0;},Window_TextPopup[_0x488b27(0x523)]['isAutoColorAffected']=function(){return!![];},Window_TextPopup['prototype'][_0x488b27(0x922)]=function(_0x22bd6b){const _0x27940b=_0x488b27;if(this[_0x27940b(0x34c)][this['_textQueue'][_0x27940b(0x998)]-0x1]===_0x22bd6b)return;this['_textQueue'][_0x27940b(0x64c)](_0x22bd6b),SceneManager[_0x27940b(0x51f)][_0x27940b(0x4d0)](this);},Window_TextPopup['prototype'][_0x488b27(0x5f1)]=function(){const _0x2c0710=_0x488b27;Window_Base[_0x2c0710(0x523)][_0x2c0710(0x5f1)][_0x2c0710(0x1dc)](this),this[_0x2c0710(0x79e)](),this[_0x2c0710(0x974)]();},Window_TextPopup['prototype'][_0x488b27(0x79e)]=function(){const _0x17cdc2=_0x488b27;if(this[_0x17cdc2(0x309)]!=='')return;if(this['_textQueue'][_0x17cdc2(0x998)]<=0x0)return;if(!this[_0x17cdc2(0x4ce)]())return;this[_0x17cdc2(0x309)]=this[_0x17cdc2(0x34c)]['shift']();const _0x37a9ac=Window_TextPopup[_0x17cdc2(0x454)],_0x4334fd=Math[_0x17cdc2(0x218)](this[_0x17cdc2(0x309)][_0x17cdc2(0x998)]*_0x37a9ac[_0x17cdc2(0x330)]);this['_timeDuration']=_0x4334fd[_0x17cdc2(0x424)](_0x37a9ac[_0x17cdc2(0x86a)],_0x37a9ac[_0x17cdc2(0x41c)]);const _0x3280d2=this[_0x17cdc2(0x57d)](this[_0x17cdc2(0x309)]);let _0x3f917a=_0x3280d2[_0x17cdc2(0x240)]+this[_0x17cdc2(0x6a1)]()*0x2;_0x3f917a+=$gameSystem['windowPadding']()*0x2;let _0x3c2457=Math[_0x17cdc2(0x3c0)](_0x3280d2[_0x17cdc2(0x512)],this[_0x17cdc2(0x8f4)]());_0x3c2457+=$gameSystem[_0x17cdc2(0x593)]()*0x2;const _0x4cd8b5=Math[_0x17cdc2(0x4fd)]((Graphics['width']-_0x3f917a)/0x2),_0x395828=Math[_0x17cdc2(0x4fd)]((Graphics['height']-_0x3c2457)/0x2),_0x37d4f9=new Rectangle(_0x4cd8b5,_0x395828,_0x3f917a,_0x3c2457);this[_0x17cdc2(0x763)](_0x37d4f9['x'],_0x37d4f9['y'],_0x37d4f9['width'],_0x37d4f9['height']),this[_0x17cdc2(0x8d2)](),this['refresh'](),this['open'](),SceneManager[_0x17cdc2(0x51f)][_0x17cdc2(0x4d0)](this);},Window_TextPopup[_0x488b27(0x523)][_0x488b27(0x26f)]=function(){const _0x597df1=_0x488b27,_0x35ecf1=this[_0x597df1(0x3b4)]();this[_0x597df1(0x5ed)][_0x597df1(0x6f5)](),this['drawTextEx'](this['_text'],_0x35ecf1['x'],_0x35ecf1['y'],_0x35ecf1[_0x597df1(0x240)]);},Window_TextPopup[_0x488b27(0x523)][_0x488b27(0x974)]=function(){const _0x3bc9ba=_0x488b27;if(this['isOpening']()||this['isClosing']())return;if(this[_0x3bc9ba(0x40e)]<=0x0)return;this[_0x3bc9ba(0x40e)]--,this['_timeDuration']<=0x0&&(this['close'](),this[_0x3bc9ba(0x309)]='');},VisuMZ[_0x488b27(0x557)]=function(_0x49eb8e){const _0x529d1f=_0x488b27;if(Utils[_0x529d1f(0x7a2)](_0x529d1f(0x993))){var _0x46666d=require(_0x529d1f(0x5a0))[_0x529d1f(0x8f6)]['get']();SceneManager[_0x529d1f(0x397)]();if(_0x49eb8e)setTimeout(_0x46666d[_0x529d1f(0x570)][_0x529d1f(0x8e1)](_0x46666d),0x190);}},VisuMZ['ApplyEasing']=function(_0x5b5918,_0x20212a){const _0x8d4caf=_0x488b27;_0x20212a=_0x20212a[_0x8d4caf(0x991)]();var _0x578922=1.70158,_0x4e318f=0.7;switch(_0x20212a){case _0x8d4caf(0x815):return _0x5b5918;case _0x8d4caf(0x611):return-0x1*Math['cos'](_0x5b5918*(Math['PI']/0x2))+0x1;case _0x8d4caf(0x6b0):return Math[_0x8d4caf(0x620)](_0x5b5918*(Math['PI']/0x2));case _0x8d4caf(0x466):return-0.5*(Math[_0x8d4caf(0x803)](Math['PI']*_0x5b5918)-0x1);case'INQUAD':return _0x5b5918*_0x5b5918;case _0x8d4caf(0x80d):return _0x5b5918*(0x2-_0x5b5918);case _0x8d4caf(0x297):return _0x5b5918<0.5?0x2*_0x5b5918*_0x5b5918:-0x1+(0x4-0x2*_0x5b5918)*_0x5b5918;case _0x8d4caf(0x772):return _0x5b5918*_0x5b5918*_0x5b5918;case _0x8d4caf(0x699):var _0x4762aa=_0x5b5918-0x1;return _0x4762aa*_0x4762aa*_0x4762aa+0x1;case _0x8d4caf(0x43a):return _0x5b5918<0.5?0x4*_0x5b5918*_0x5b5918*_0x5b5918:(_0x5b5918-0x1)*(0x2*_0x5b5918-0x2)*(0x2*_0x5b5918-0x2)+0x1;case _0x8d4caf(0x664):return _0x5b5918*_0x5b5918*_0x5b5918*_0x5b5918;case'OUTQUART':var _0x4762aa=_0x5b5918-0x1;return 0x1-_0x4762aa*_0x4762aa*_0x4762aa*_0x4762aa;case'INOUTQUART':var _0x4762aa=_0x5b5918-0x1;return _0x5b5918<0.5?0x8*_0x5b5918*_0x5b5918*_0x5b5918*_0x5b5918:0x1-0x8*_0x4762aa*_0x4762aa*_0x4762aa*_0x4762aa;case _0x8d4caf(0x71c):return _0x5b5918*_0x5b5918*_0x5b5918*_0x5b5918*_0x5b5918;case _0x8d4caf(0x954):var _0x4762aa=_0x5b5918-0x1;return 0x1+_0x4762aa*_0x4762aa*_0x4762aa*_0x4762aa*_0x4762aa;case'INOUTQUINT':var _0x4762aa=_0x5b5918-0x1;return _0x5b5918<0.5?0x10*_0x5b5918*_0x5b5918*_0x5b5918*_0x5b5918*_0x5b5918:0x1+0x10*_0x4762aa*_0x4762aa*_0x4762aa*_0x4762aa*_0x4762aa;case'INEXPO':if(_0x5b5918===0x0)return 0x0;return Math[_0x8d4caf(0x7ee)](0x2,0xa*(_0x5b5918-0x1));case _0x8d4caf(0x58d):if(_0x5b5918===0x1)return 0x1;return-Math['pow'](0x2,-0xa*_0x5b5918)+0x1;case _0x8d4caf(0x8ca):if(_0x5b5918===0x0||_0x5b5918===0x1)return _0x5b5918;var _0xe272f5=_0x5b5918*0x2,_0x4fac8b=_0xe272f5-0x1;if(_0xe272f5<0x1)return 0.5*Math['pow'](0x2,0xa*_0x4fac8b);return 0.5*(-Math[_0x8d4caf(0x7ee)](0x2,-0xa*_0x4fac8b)+0x2);case _0x8d4caf(0x1f7):var _0xe272f5=_0x5b5918/0x1;return-0x1*(Math[_0x8d4caf(0x2ee)](0x1-_0xe272f5*_0x5b5918)-0x1);case _0x8d4caf(0x213):var _0x4762aa=_0x5b5918-0x1;return Math['sqrt'](0x1-_0x4762aa*_0x4762aa);case'INOUTCIRC':var _0xe272f5=_0x5b5918*0x2,_0x4fac8b=_0xe272f5-0x2;if(_0xe272f5<0x1)return-0.5*(Math[_0x8d4caf(0x2ee)](0x1-_0xe272f5*_0xe272f5)-0x1);return 0.5*(Math['sqrt'](0x1-_0x4fac8b*_0x4fac8b)+0x1);case _0x8d4caf(0x290):return _0x5b5918*_0x5b5918*((_0x578922+0x1)*_0x5b5918-_0x578922);case _0x8d4caf(0x413):var _0xe272f5=_0x5b5918/0x1-0x1;return _0xe272f5*_0xe272f5*((_0x578922+0x1)*_0xe272f5+_0x578922)+0x1;break;case _0x8d4caf(0x21b):var _0xe272f5=_0x5b5918*0x2,_0x2d55f7=_0xe272f5-0x2,_0x102153=_0x578922*1.525;if(_0xe272f5<0x1)return 0.5*_0xe272f5*_0xe272f5*((_0x102153+0x1)*_0xe272f5-_0x102153);return 0.5*(_0x2d55f7*_0x2d55f7*((_0x102153+0x1)*_0x2d55f7+_0x102153)+0x2);case _0x8d4caf(0x277):if(_0x5b5918===0x0||_0x5b5918===0x1)return _0x5b5918;var _0xe272f5=_0x5b5918/0x1,_0x4fac8b=_0xe272f5-0x1,_0x29787a=0x1-_0x4e318f,_0x102153=_0x29787a/(0x2*Math['PI'])*Math[_0x8d4caf(0x24d)](0x1);return-(Math[_0x8d4caf(0x7ee)](0x2,0xa*_0x4fac8b)*Math[_0x8d4caf(0x620)]((_0x4fac8b-_0x102153)*(0x2*Math['PI'])/_0x29787a));case _0x8d4caf(0x5da):var _0x29787a=0x1-_0x4e318f,_0xe272f5=_0x5b5918*0x2;if(_0x5b5918===0x0||_0x5b5918===0x1)return _0x5b5918;var _0x102153=_0x29787a/(0x2*Math['PI'])*Math[_0x8d4caf(0x24d)](0x1);return Math[_0x8d4caf(0x7ee)](0x2,-0xa*_0xe272f5)*Math[_0x8d4caf(0x620)]((_0xe272f5-_0x102153)*(0x2*Math['PI'])/_0x29787a)+0x1;case _0x8d4caf(0x941):var _0x29787a=0x1-_0x4e318f;if(_0x5b5918===0x0||_0x5b5918===0x1)return _0x5b5918;var _0xe272f5=_0x5b5918*0x2,_0x4fac8b=_0xe272f5-0x1,_0x102153=_0x29787a/(0x2*Math['PI'])*Math[_0x8d4caf(0x24d)](0x1);if(_0xe272f5<0x1)return-0.5*(Math[_0x8d4caf(0x7ee)](0x2,0xa*_0x4fac8b)*Math['sin']((_0x4fac8b-_0x102153)*(0x2*Math['PI'])/_0x29787a));return Math[_0x8d4caf(0x7ee)](0x2,-0xa*_0x4fac8b)*Math['sin']((_0x4fac8b-_0x102153)*(0x2*Math['PI'])/_0x29787a)*0.5+0x1;case'OUTBOUNCE':var _0xe272f5=_0x5b5918/0x1;if(_0xe272f5<0x1/2.75)return 7.5625*_0xe272f5*_0xe272f5;else{if(_0xe272f5<0x2/2.75){var _0x2d55f7=_0xe272f5-1.5/2.75;return 7.5625*_0x2d55f7*_0x2d55f7+0.75;}else{if(_0xe272f5<2.5/2.75){var _0x2d55f7=_0xe272f5-2.25/2.75;return 7.5625*_0x2d55f7*_0x2d55f7+0.9375;}else{var _0x2d55f7=_0xe272f5-2.625/2.75;return 7.5625*_0x2d55f7*_0x2d55f7+0.984375;}}}case'INBOUNCE':var _0xa31993=0x1-VisuMZ['ApplyEasing'](0x1-_0x5b5918,_0x8d4caf(0x3e0));return _0xa31993;case'INOUTBOUNCE':if(_0x5b5918<0.5)var _0xa31993=VisuMZ[_0x8d4caf(0x41f)](_0x5b5918*0x2,_0x8d4caf(0x490))*0.5;else var _0xa31993=VisuMZ[_0x8d4caf(0x41f)](_0x5b5918*0x2-0x1,_0x8d4caf(0x3e0))*0.5+0.5;return _0xa31993;default:return _0x5b5918;}},VisuMZ['GetParamIcon']=function(_0x25d420){const _0x48dc07=_0x488b27;_0x25d420=String(_0x25d420)['toUpperCase']();const _0x1e57b9=VisuMZ[_0x48dc07(0x96f)][_0x48dc07(0x2f0)][_0x48dc07(0x945)];if(_0x25d420==='MAXHP')return _0x1e57b9['IconParam0'];if(_0x25d420===_0x48dc07(0x8c2))return _0x1e57b9[_0x48dc07(0x6a5)];if(_0x25d420===_0x48dc07(0x87d))return _0x1e57b9[_0x48dc07(0x7ae)];if(_0x25d420===_0x48dc07(0x30c))return _0x1e57b9[_0x48dc07(0x1ec)];if(_0x25d420==='MAT')return _0x1e57b9[_0x48dc07(0x20d)];if(_0x25d420===_0x48dc07(0x7f8))return _0x1e57b9['IconParam5'];if(_0x25d420===_0x48dc07(0x7ec))return _0x1e57b9['IconParam6'];if(_0x25d420==='LUK')return _0x1e57b9[_0x48dc07(0x84c)];if(_0x25d420==='HIT')return _0x1e57b9[_0x48dc07(0x50e)];if(_0x25d420==='EVA')return _0x1e57b9[_0x48dc07(0x3d2)];if(_0x25d420===_0x48dc07(0x57f))return _0x1e57b9['IconXParam2'];if(_0x25d420==='CEV')return _0x1e57b9[_0x48dc07(0x8b5)];if(_0x25d420==='MEV')return _0x1e57b9['IconXParam4'];if(_0x25d420===_0x48dc07(0x6c6))return _0x1e57b9[_0x48dc07(0x46e)];if(_0x25d420==='CNT')return _0x1e57b9[_0x48dc07(0x39a)];if(_0x25d420===_0x48dc07(0x8d8))return _0x1e57b9[_0x48dc07(0x796)];if(_0x25d420===_0x48dc07(0x383))return _0x1e57b9[_0x48dc07(0x874)];if(_0x25d420===_0x48dc07(0x282))return _0x1e57b9[_0x48dc07(0x773)];if(_0x25d420===_0x48dc07(0x6cf))return _0x1e57b9[_0x48dc07(0x1d3)];if(_0x25d420===_0x48dc07(0x7c6))return _0x1e57b9[_0x48dc07(0x47a)];if(_0x25d420==='REC')return _0x1e57b9[_0x48dc07(0x7fe)];if(_0x25d420===_0x48dc07(0x31b))return _0x1e57b9[_0x48dc07(0x404)];if(_0x25d420===_0x48dc07(0x254))return _0x1e57b9[_0x48dc07(0x28e)];if(_0x25d420==='TCR')return _0x1e57b9[_0x48dc07(0x86c)];if(_0x25d420===_0x48dc07(0x932))return _0x1e57b9[_0x48dc07(0x755)];if(_0x25d420===_0x48dc07(0x722))return _0x1e57b9[_0x48dc07(0x4f7)];if(_0x25d420==='FDR')return _0x1e57b9[_0x48dc07(0x5f3)];if(_0x25d420==='EXR')return _0x1e57b9[_0x48dc07(0x3b5)];if(VisuMZ[_0x48dc07(0x96f)]['CustomParamIcons'][_0x25d420])return VisuMZ[_0x48dc07(0x96f)]['CustomParamIcons'][_0x25d420]||0x0;return 0x0;},VisuMZ[_0x488b27(0x6dd)]=function(_0x28e513,_0x4fea96,_0x3c63e3){const _0x9cfb07=_0x488b27;if(_0x3c63e3===undefined&&_0x28e513%0x1===0x0)return _0x28e513;if(_0x3c63e3!==undefined&&['MAXHP','MAXMP',_0x9cfb07(0x87d),_0x9cfb07(0x30c),_0x9cfb07(0x380),'MDF',_0x9cfb07(0x7ec),_0x9cfb07(0x54d)]['includes'](String(_0x3c63e3)['toUpperCase']()[_0x9cfb07(0x667)]()))return _0x28e513;_0x4fea96=_0x4fea96||0x0;if(VisuMZ['CoreEngine'][_0x9cfb07(0x243)][_0x3c63e3])return VisuMZ['CoreEngine'][_0x9cfb07(0x88d)][_0x3c63e3]===_0x9cfb07(0x4f9)?_0x28e513:String((_0x28e513*0x64)[_0x9cfb07(0x674)](_0x4fea96))+'%';return String((_0x28e513*0x64)[_0x9cfb07(0x674)](_0x4fea96))+'%';},VisuMZ[_0x488b27(0x4a1)]=function(_0x19d50e){const _0x63b873=_0x488b27;_0x19d50e=String(_0x19d50e);if(!_0x19d50e)return _0x19d50e;if(typeof _0x19d50e!==_0x63b873(0x966))return _0x19d50e;const _0xcdf0f5=VisuMZ[_0x63b873(0x96f)]['Settings'][_0x63b873(0x59f)][_0x63b873(0x818)]||_0x63b873(0x5b3),_0x16349a={'maximumFractionDigits':0x6};_0x19d50e=_0x19d50e['replace'](/\[(.*?)\]/g,(_0x2897ef,_0x3becd8)=>{return VisuMZ['PreserveNumbers'](_0x3becd8,'[',']');}),_0x19d50e=_0x19d50e['replace'](/<(.*?)>/g,(_0x417547,_0x40adaf)=>{const _0x2560c7=_0x63b873;return VisuMZ[_0x2560c7(0x2f4)](_0x40adaf,'<','>');}),_0x19d50e=_0x19d50e[_0x63b873(0x422)](/\{\{(.*?)\}\}/g,(_0x271553,_0x43ffd5)=>{const _0x1d3f83=_0x63b873;return VisuMZ[_0x1d3f83(0x2f4)](_0x43ffd5,'','');}),_0x19d50e=_0x19d50e['replace'](/(\d+\.?\d*)/g,(_0x131184,_0x2fd4b6)=>{const _0x97e7a5=_0x63b873;let _0x5a617f=_0x2fd4b6;if(_0x5a617f[0x0]==='0')return _0x5a617f;if(_0x5a617f[_0x5a617f[_0x97e7a5(0x998)]-0x1]==='.')return Number(_0x5a617f)[_0x97e7a5(0x509)](_0xcdf0f5,_0x16349a)+'.';else return _0x5a617f[_0x5a617f[_0x97e7a5(0x998)]-0x1]===','?Number(_0x5a617f)['toLocaleString'](_0xcdf0f5,_0x16349a)+',':Number(_0x5a617f)[_0x97e7a5(0x509)](_0xcdf0f5,_0x16349a);});let _0x4f78d9=0x3;while(_0x4f78d9--){_0x19d50e=VisuMZ[_0x63b873(0x65e)](_0x19d50e);}return _0x19d50e;},VisuMZ['PreserveNumbers']=function(_0x1000c0,_0x1f97aa,_0x371e03){const _0xb8709f=_0x488b27;return _0x1000c0=_0x1000c0[_0xb8709f(0x422)](/(\d)/gi,(_0x32f239,_0x4d4c75)=>_0xb8709f(0x6d9)[_0xb8709f(0x88c)](Number(_0x4d4c75))),_0xb8709f(0x785)['format'](_0x1000c0,_0x1f97aa,_0x371e03);},VisuMZ['RevertPreserveNumbers']=function(_0x2d66ce){return _0x2d66ce=_0x2d66ce['replace'](/PRESERVCONVERSION\((\d+)\)/gi,(_0x543ff0,_0xf364a7)=>Number(parseInt(_0xf364a7))),_0x2d66ce;},VisuMZ[_0x488b27(0x987)]=function(_0x210d12){const _0x2464d1=_0x488b27;SoundManager[_0x2464d1(0x4d3)]();if(!Utils['isNwjs']()){const _0x36f8d6=window[_0x2464d1(0x35e)](_0x210d12,_0x2464d1(0x7bc));}else{const _0x5584f6=process[_0x2464d1(0x1ea)]==_0x2464d1(0x8d9)?_0x2464d1(0x35e):process[_0x2464d1(0x1ea)]==_0x2464d1(0x205)?_0x2464d1(0x289):_0x2464d1(0x56d);require(_0x2464d1(0x529))[_0x2464d1(0x8fa)](_0x5584f6+'\x20'+_0x210d12);}},VisuMZ[_0x488b27(0x838)]=function(_0x1f8d77,_0x57e6f4){const _0x199dc9=_0x488b27;if(!_0x1f8d77)return'';const _0x3b276b=_0x1f8d77['baseId']||_0x1f8d77['id'];let _0x51d247='';return _0x1f8d77['initialLevel']!==undefined&&_0x1f8d77[_0x199dc9(0x7d4)]!==undefined&&(_0x51d247='Actor-%1-%2'['format'](_0x3b276b,_0x57e6f4)),_0x1f8d77[_0x199dc9(0x878)]!==undefined&&_0x1f8d77[_0x199dc9(0x3cf)]!==undefined&&(_0x51d247='Class-%1-%2'[_0x199dc9(0x88c)](_0x3b276b,_0x57e6f4)),_0x1f8d77['stypeId']!==undefined&&_0x1f8d77[_0x199dc9(0x573)]!==undefined&&(_0x51d247='Skill-%1-%2'[_0x199dc9(0x88c)](_0x3b276b,_0x57e6f4)),_0x1f8d77[_0x199dc9(0x326)]!==undefined&&_0x1f8d77[_0x199dc9(0x6ef)]!==undefined&&(_0x51d247=_0x199dc9(0x753)[_0x199dc9(0x88c)](_0x3b276b,_0x57e6f4)),_0x1f8d77[_0x199dc9(0x5af)]!==undefined&&_0x1f8d77[_0x199dc9(0x768)]===0x1&&(_0x51d247=_0x199dc9(0x1fa)[_0x199dc9(0x88c)](_0x3b276b,_0x57e6f4)),_0x1f8d77[_0x199dc9(0x90b)]!==undefined&&_0x1f8d77['etypeId']>0x1&&(_0x51d247=_0x199dc9(0x608)[_0x199dc9(0x88c)](_0x3b276b,_0x57e6f4)),_0x1f8d77['dropItems']!==undefined&&_0x1f8d77['battlerHue']!==undefined&&(_0x51d247=_0x199dc9(0x3fa)[_0x199dc9(0x88c)](_0x3b276b,_0x57e6f4)),_0x1f8d77[_0x199dc9(0x897)]!==undefined&&_0x1f8d77[_0x199dc9(0x5f5)]!==undefined&&(_0x51d247='State-%1-%2'['format'](_0x3b276b,_0x57e6f4)),_0x51d247;},Window_Base['prototype']['processDrawIcon']=function(_0x58600c,_0x20092c){const _0x11e377=_0x488b27;if(_0x20092c['drawing']){let _0x98d297=0x2;this['lineHeight']()>0x24&&(_0x98d297=Math[_0x11e377(0x979)]((this[_0x11e377(0x8f4)]()-ImageManager['iconHeight'])/0x2)),this['drawIcon'](_0x58600c,_0x20092c['x']+0x2,_0x20092c['y']+_0x98d297);}_0x20092c['x']+=ImageManager[_0x11e377(0x259)]+0x4;},Game_Picture[_0x488b27(0x523)][_0x488b27(0x846)]=function(){const _0x1df70b=_0x488b27;return this[_0x1df70b(0x21e)];},VisuMZ['CoreEngine'][_0x488b27(0x483)]=Game_Picture[_0x488b27(0x523)][_0x488b27(0x684)],Game_Picture[_0x488b27(0x523)][_0x488b27(0x684)]=function(){const _0x46982f=_0x488b27;VisuMZ[_0x46982f(0x96f)][_0x46982f(0x483)][_0x46982f(0x1dc)](this),this[_0x46982f(0x21e)]={'x':0x0,'y':0x0},this[_0x46982f(0x261)]={'x':0x0,'y':0x0};},VisuMZ['CoreEngine'][_0x488b27(0x90d)]=Game_Picture['prototype']['updateMove'],Game_Picture['prototype']['updateMove']=function(){const _0x139804=_0x488b27;this[_0x139804(0x6ba)]();const _0xb404f8=this[_0x139804(0x6c0)];VisuMZ[_0x139804(0x96f)]['Game_Picture_updateMove'][_0x139804(0x1dc)](this),_0xb404f8>0x0&&this[_0x139804(0x6c0)]<=0x0&&(this['_x']=this[_0x139804(0x320)],this['_y']=this[_0x139804(0x84e)],this[_0x139804(0x4b5)]=this[_0x139804(0x28a)],this[_0x139804(0x66a)]=this['_targetScaleY'],this[_0x139804(0x38e)]=this['_targetOpacity'],this['_anchor']&&(this[_0x139804(0x21e)]['x']=this['_targetAnchor']['x'],this[_0x139804(0x21e)]['y']=this[_0x139804(0x261)]['y']));},VisuMZ['CoreEngine'][_0x488b27(0x3b2)]=Game_Picture[_0x488b27(0x523)][_0x488b27(0x40f)],Game_Picture[_0x488b27(0x523)][_0x488b27(0x40f)]=function(_0x16dd1f,_0x36b898,_0x38af91,_0x214d3c,_0x1da82f,_0x35b2ff,_0x221fa6,_0x25f29d){const _0x588895=_0x488b27;VisuMZ[_0x588895(0x96f)][_0x588895(0x3b2)][_0x588895(0x1dc)](this,_0x16dd1f,_0x36b898,_0x38af91,_0x214d3c,_0x1da82f,_0x35b2ff,_0x221fa6,_0x25f29d),this[_0x588895(0x4a4)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x36b898]||{'x':0x0,'y':0x0});},VisuMZ[_0x488b27(0x96f)]['Game_Picture_move']=Game_Picture[_0x488b27(0x523)][_0x488b27(0x763)],Game_Picture[_0x488b27(0x523)][_0x488b27(0x763)]=function(_0x553ca6,_0x3f3d10,_0x59f79a,_0x3ba38b,_0x1ca801,_0x2086b7,_0x5153ff,_0x555177,_0x206988){const _0x4780ba=_0x488b27;VisuMZ[_0x4780ba(0x96f)]['Game_Picture_move']['call'](this,_0x553ca6,_0x3f3d10,_0x59f79a,_0x3ba38b,_0x1ca801,_0x2086b7,_0x5153ff,_0x555177,_0x206988),this[_0x4780ba(0x7da)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x553ca6]||{'x':0x0,'y':0x0});},Game_Picture[_0x488b27(0x523)][_0x488b27(0x6ba)]=function(){const _0x59cf0a=_0x488b27;this[_0x59cf0a(0x6c0)]>0x0&&(this[_0x59cf0a(0x21e)]['x']=this[_0x59cf0a(0x913)](this['_anchor']['x'],this[_0x59cf0a(0x261)]['x']),this['_anchor']['y']=this[_0x59cf0a(0x913)](this['_anchor']['y'],this['_targetAnchor']['y']));},Game_Picture[_0x488b27(0x523)][_0x488b27(0x4a4)]=function(_0x42f0a2){const _0x457a45=_0x488b27;this[_0x457a45(0x21e)]=_0x42f0a2,this['_targetAnchor']=JsonEx['makeDeepCopy'](this['_anchor']);},Game_Picture[_0x488b27(0x523)]['setTargetAnchor']=function(_0x387e13){this['_targetAnchor']=_0x387e13;},VisuMZ[_0x488b27(0x96f)]['Sprite_Picture_updateOrigin']=Sprite_Picture[_0x488b27(0x523)]['updateOrigin'],Sprite_Picture['prototype']['updateOrigin']=function(){const _0x18f5e4=_0x488b27,_0x37e29f=this['picture']();!_0x37e29f[_0x18f5e4(0x846)]()?VisuMZ[_0x18f5e4(0x96f)][_0x18f5e4(0x83a)][_0x18f5e4(0x1dc)](this):(this[_0x18f5e4(0x846)]['x']=_0x37e29f[_0x18f5e4(0x846)]()['x'],this[_0x18f5e4(0x846)]['y']=_0x37e29f[_0x18f5e4(0x846)]()['y']);},Game_Action['prototype'][_0x488b27(0x36d)]=function(_0xcb5652){const _0x51506f=_0x488b27;if(_0xcb5652){const _0x36b51b=_0xcb5652[_0x51506f(0x907)];if(_0x36b51b===0x1&&this[_0x51506f(0x976)]()['attackSkillId']()!==0x1)this[_0x51506f(0x885)]();else _0x36b51b===0x2&&this[_0x51506f(0x976)]()[_0x51506f(0x955)]()!==0x2?this[_0x51506f(0x80f)]():this[_0x51506f(0x725)](_0x36b51b);}else this[_0x51506f(0x6f5)]();},Game_Actor['prototype'][_0x488b27(0x465)]=function(){const _0x3660b1=_0x488b27;return this[_0x3660b1(0x486)]()['filter'](_0x4e1276=>this[_0x3660b1(0x6ab)](_0x4e1276)&&this[_0x3660b1(0x7c4)]()[_0x3660b1(0x5f8)](_0x4e1276[_0x3660b1(0x733)]));},Window_Base['prototype'][_0x488b27(0x84a)]=function(){const _0x4990a2=_0x488b27;this[_0x4990a2(0x4fc)]=new Sprite(),this[_0x4990a2(0x4fc)][_0x4990a2(0x5ce)]=new Bitmap(0x0,0x0),this[_0x4990a2(0x4fc)]['x']=0x0,this[_0x4990a2(0x2f7)](this[_0x4990a2(0x4fc)]);},Window_Base[_0x488b27(0x523)]['refreshDimmerBitmap']=function(){const _0xe47a4f=_0x488b27;if(this['_dimmerSprite']){const _0x43d597=this[_0xe47a4f(0x4fc)]['bitmap'],_0x4204d5=this['width'],_0x597109=this[_0xe47a4f(0x512)],_0x3db2de=this[_0xe47a4f(0x2c0)],_0x524623=ColorManager['dimColor1'](),_0x266cef=ColorManager['dimColor2']();_0x43d597[_0xe47a4f(0x37c)](_0x4204d5,_0x597109),_0x43d597['gradientFillRect'](0x0,0x0,_0x4204d5,_0x3db2de,_0x266cef,_0x524623,!![]),_0x43d597[_0xe47a4f(0x3fe)](0x0,_0x3db2de,_0x4204d5,_0x597109-_0x3db2de*0x2,_0x524623),_0x43d597[_0xe47a4f(0x294)](0x0,_0x597109-_0x3db2de,_0x4204d5,_0x3db2de,_0x524623,_0x266cef,!![]),this[_0xe47a4f(0x4fc)][_0xe47a4f(0x400)](0x0,0x0,_0x4204d5,_0x597109);}},Game_Actor['prototype'][_0x488b27(0x8d7)]=function(){const _0x1551c3=_0x488b27;for(let _0x157463=0x0;_0x157463<this[_0x1551c3(0x23c)]();_0x157463++){const _0x5ad6a0=this[_0x1551c3(0x45a)]();let _0x75dc1a=Number[_0x1551c3(0x55f)];this['setAction'](_0x157463,_0x5ad6a0[0x0]);for(const _0x347dba of _0x5ad6a0){const _0x378bef=_0x347dba['evaluate']();_0x378bef>_0x75dc1a&&(_0x75dc1a=_0x378bef,this['setAction'](_0x157463,_0x347dba));}}this[_0x1551c3(0x563)]('waiting');},Window_BattleItem['prototype']['isEnabled']=function(_0x10a842){const _0x3df6a8=_0x488b27;return BattleManager[_0x3df6a8(0x816)]()?BattleManager[_0x3df6a8(0x816)]()['canUse'](_0x10a842):Window_ItemList['prototype'][_0x3df6a8(0x7d2)][_0x3df6a8(0x1dc)](this,_0x10a842);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x904)]=Scene_Map['prototype'][_0x488b27(0x679)],Scene_Map['prototype'][_0x488b27(0x679)]=function(){const _0x5f1b6c=_0x488b27;VisuMZ[_0x5f1b6c(0x96f)][_0x5f1b6c(0x904)][_0x5f1b6c(0x1dc)](this);const _0x2b7d44=this[_0x5f1b6c(0x724)][_0x5f1b6c(0x306)];if(_0x2b7d44)this[_0x5f1b6c(0x4d0)](_0x2b7d44);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x849)]=Scene_Battle['prototype'][_0x488b27(0x679)],Scene_Battle['prototype'][_0x488b27(0x679)]=function(){const _0xa8afcc=_0x488b27;VisuMZ[_0xa8afcc(0x96f)][_0xa8afcc(0x849)][_0xa8afcc(0x1dc)](this);const _0x29192b=this[_0xa8afcc(0x724)][_0xa8afcc(0x306)];if(_0x29192b)this[_0xa8afcc(0x4d0)](_0x29192b);},Sprite_Actor[_0x488b27(0x523)]['update']=function(){const _0x4731ab=_0x488b27;Sprite_Battler[_0x4731ab(0x523)][_0x4731ab(0x5f1)][_0x4731ab(0x1dc)](this),this[_0x4731ab(0x493)]();if(this[_0x4731ab(0x572)])this[_0x4731ab(0x40c)]();else this['_battlerName']!==''&&(this[_0x4731ab(0x272)]='');},Window[_0x488b27(0x523)][_0x488b27(0x850)]=function(){const _0x412a55=_0x488b27,_0x1f4a66=this[_0x412a55(0x553)],_0x7d153=this[_0x412a55(0x881)],_0xd534a4=0x18,_0x5ae326=_0xd534a4/0x2,_0x2b28d6=0x60+_0xd534a4,_0x141d07=0x0+_0xd534a4;this[_0x412a55(0x20b)]['bitmap']=this[_0x412a55(0x287)],this['_downArrowSprite'][_0x412a55(0x846)]['x']=0.5,this['_downArrowSprite'][_0x412a55(0x846)]['y']=0.5,this[_0x412a55(0x20b)][_0x412a55(0x400)](_0x2b28d6+_0x5ae326,_0x141d07+_0x5ae326+_0xd534a4,_0xd534a4,_0x5ae326),this[_0x412a55(0x20b)]['move'](Math[_0x412a55(0x4fd)](_0x1f4a66/0x2),Math[_0x412a55(0x4fd)](_0x7d153-_0x5ae326)),this[_0x412a55(0x65c)][_0x412a55(0x5ce)]=this['_windowskin'],this[_0x412a55(0x65c)][_0x412a55(0x846)]['x']=0.5,this[_0x412a55(0x65c)][_0x412a55(0x846)]['y']=0.5,this[_0x412a55(0x65c)]['setFrame'](_0x2b28d6+_0x5ae326,_0x141d07,_0xd534a4,_0x5ae326),this[_0x412a55(0x65c)][_0x412a55(0x763)](Math['round'](_0x1f4a66/0x2),Math[_0x412a55(0x4fd)](_0x5ae326));},Window['prototype'][_0x488b27(0x4ae)]=function(){const _0x443df3=_0x488b27,_0x23800e=0x90,_0x52ae8a=0x60,_0x2cadbb=0x18;this[_0x443df3(0x23f)][_0x443df3(0x5ce)]=this[_0x443df3(0x287)],this['_pauseSignSprite'][_0x443df3(0x846)]['x']=0.5,this[_0x443df3(0x23f)][_0x443df3(0x846)]['y']=0x1,this['_pauseSignSprite'][_0x443df3(0x763)](Math[_0x443df3(0x4fd)](this[_0x443df3(0x553)]/0x2),this['_height']),this[_0x443df3(0x23f)][_0x443df3(0x400)](_0x23800e,_0x52ae8a,_0x2cadbb,_0x2cadbb),this[_0x443df3(0x23f)][_0x443df3(0x70a)]=0xff;},Window['prototype'][_0x488b27(0x95e)]=function(){const _0x530c9d=_0x488b27,_0x16d3c7=this[_0x530c9d(0x902)][_0x530c9d(0x74e)][_0x530c9d(0x267)](new Point(0x0,0x0)),_0x4c7bc8=this[_0x530c9d(0x902)][_0x530c9d(0x775)];_0x4c7bc8['x']=_0x16d3c7['x']+this[_0x530c9d(0x889)]['x'],_0x4c7bc8['y']=_0x16d3c7['y']+this[_0x530c9d(0x889)]['y'],_0x4c7bc8[_0x530c9d(0x240)]=Math[_0x530c9d(0x218)](this[_0x530c9d(0x3cc)]*this['scale']['x']),_0x4c7bc8[_0x530c9d(0x512)]=Math[_0x530c9d(0x218)](this[_0x530c9d(0x5e2)]*this[_0x530c9d(0x2d9)]['y']);},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x627)]=Window[_0x488b27(0x523)][_0x488b27(0x39b)],Window[_0x488b27(0x523)][_0x488b27(0x39b)]=function(){const _0x27053a=_0x488b27,_0x419e51=VisuMZ[_0x27053a(0x96f)]['Settings']['Window']['CorrectSkinBleeding']??!![];if(!_0x419e51)return VisuMZ[_0x27053a(0x96f)][_0x27053a(0x627)]['call'](this);const _0x51671f=this[_0x27053a(0x478)],_0x5e043a=Math['max'](0x0,this[_0x27053a(0x553)]-_0x51671f*0x2),_0x17e29e=Math[_0x27053a(0x3c0)](0x0,this['_height']-_0x51671f*0x2),_0x54e856=this[_0x27053a(0x4e0)],_0x29d79f=_0x54e856[_0x27053a(0x8bf)][0x0];_0x54e856['bitmap']=this[_0x27053a(0x287)],_0x54e856[_0x27053a(0x400)](0x0,0x0,0x60,0x60),_0x54e856[_0x27053a(0x763)](_0x51671f,_0x51671f),_0x54e856[_0x27053a(0x2d9)]['x']=_0x5e043a/0x60,_0x54e856[_0x27053a(0x2d9)]['y']=_0x17e29e/0x60,_0x29d79f[_0x27053a(0x5ce)]=this[_0x27053a(0x287)],_0x29d79f[_0x27053a(0x400)](0x0,0x60,0x60,0x60),_0x29d79f[_0x27053a(0x763)](0x0,0x0,_0x5e043a,_0x17e29e),_0x29d79f[_0x27053a(0x2d9)]['x']=0x1/_0x54e856['scale']['x'],_0x29d79f[_0x27053a(0x2d9)]['y']=0x1/_0x54e856[_0x27053a(0x2d9)]['y'],_0x54e856[_0x27053a(0x814)](this['_colorTone']);},Game_Temp[_0x488b27(0x523)][_0x488b27(0x967)]=function(){const _0x39bf2a=_0x488b27;this[_0x39bf2a(0x324)]=[],this['_fauxAnimationQueue']=[],this[_0x39bf2a(0x986)]=[],this[_0x39bf2a(0x98a)]=[];},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x459)]=Scene_Base['prototype'][_0x488b27(0x555)],Scene_Base['prototype'][_0x488b27(0x555)]=function(){const _0x4d8a06=_0x488b27;if($gameTemp)$gameTemp[_0x4d8a06(0x967)]();VisuMZ[_0x4d8a06(0x96f)][_0x4d8a06(0x459)][_0x4d8a06(0x1dc)](this);},Bitmap[_0x488b27(0x523)][_0x488b27(0x774)]=function(_0x1a9bed){const _0x57bb4b=_0x488b27,_0x432ba2=this['context'];_0x432ba2[_0x57bb4b(0x613)](),_0x432ba2[_0x57bb4b(0x3c3)]=this[_0x57bb4b(0x670)]();const _0x443da3=_0x432ba2[_0x57bb4b(0x4ff)](_0x1a9bed)[_0x57bb4b(0x240)];return _0x432ba2[_0x57bb4b(0x948)](),_0x443da3;},Window_Message[_0x488b27(0x523)]['textWidth']=function(_0x100d1f){const _0x3f9f22=_0x488b27;return this[_0x3f9f22(0x70b)]()?this[_0x3f9f22(0x5ed)]['measureTextWidthNoRounding'](_0x100d1f):Window_Base[_0x3f9f22(0x523)][_0x3f9f22(0x847)][_0x3f9f22(0x1dc)](this,_0x100d1f);},Window_Message[_0x488b27(0x523)][_0x488b27(0x70b)]=function(){const _0x44a096=_0x488b27;return VisuMZ[_0x44a096(0x96f)][_0x44a096(0x2f0)][_0x44a096(0x59f)][_0x44a096(0x856)]??!![];},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x863)]=Game_Action[_0x488b27(0x523)][_0x488b27(0x782)],Game_Action[_0x488b27(0x523)][_0x488b27(0x782)]=function(){const _0x1611e6=_0x488b27;return this[_0x1611e6(0x60b)]()?VisuMZ[_0x1611e6(0x96f)][_0x1611e6(0x863)]['call'](this):0x0;},VisuMZ[_0x488b27(0x96f)]['Game_Action_setAttack']=Game_Action['prototype'][_0x488b27(0x885)],Game_Action[_0x488b27(0x523)][_0x488b27(0x885)]=function(){const _0x48eb3e=_0x488b27;if(this['subject']()&&this['subject']()['canAttack']())VisuMZ[_0x48eb3e(0x96f)][_0x48eb3e(0x236)][_0x48eb3e(0x1dc)](this);else BattleManager[_0x48eb3e(0x546)]?VisuMZ[_0x48eb3e(0x96f)][_0x48eb3e(0x236)]['call'](this):this[_0x48eb3e(0x6f5)]();},VisuMZ['CoreEngine'][_0x488b27(0x5fe)]=BattleManager[_0x488b27(0x72b)],BattleManager['invokeCounterAttack']=function(_0x4372dd,_0x12fce9){const _0x4a1995=_0x488b27;this[_0x4a1995(0x546)]=!![],VisuMZ[_0x4a1995(0x96f)]['BattleManager_invokeCounterAttack'][_0x4a1995(0x1dc)](this,_0x4372dd,_0x12fce9),this['_bypassCanCounterCheck']=undefined;},Sprite_Name[_0x488b27(0x523)][_0x488b27(0x77c)]=function(){return 0x24;},Sprite_Name[_0x488b27(0x523)]['redraw']=function(){const _0x503caf=_0x488b27,_0x585ad1=this[_0x503caf(0x24c)](),_0x242254=this[_0x503caf(0x257)](),_0x39daf9=this[_0x503caf(0x77c)]();this['setupFont'](),this['bitmap'][_0x503caf(0x6f5)](),this['bitmap'][_0x503caf(0x2c6)](_0x585ad1,0x4,0x0,_0x242254-0xa,_0x39daf9,'left');},Bitmap[_0x488b27(0x523)][_0x488b27(0x2c6)]=function(_0x437dbd,_0x158727,_0x4deff9,_0x361e17,_0x46da6a,_0x342686){const _0x44523a=_0x488b27,_0x910f55=this['context'],_0x107e9a=_0x910f55['globalAlpha'];_0x361e17=_0x361e17||0xffffffff;let _0x480c24=_0x158727,_0xb2c93=Math['round'](_0x4deff9+0x18/0x2+this[_0x44523a(0x810)]*0.35);_0x342686==='center'&&(_0x480c24+=_0x361e17/0x2),_0x342686===_0x44523a(0x63b)&&(_0x480c24+=_0x361e17),_0x910f55[_0x44523a(0x613)](),_0x910f55['font']=this[_0x44523a(0x670)](),_0x910f55[_0x44523a(0x5a9)]=_0x342686,_0x910f55[_0x44523a(0x3f7)]=_0x44523a(0x898),_0x910f55[_0x44523a(0x828)]=0x1,this[_0x44523a(0x639)](_0x437dbd,_0x480c24,_0xb2c93,_0x361e17),_0x910f55['globalAlpha']=_0x107e9a,this[_0x44523a(0x410)](_0x437dbd,_0x480c24,_0xb2c93,_0x361e17),_0x910f55[_0x44523a(0x948)](),this[_0x44523a(0x344)][_0x44523a(0x5f1)]();},VisuMZ[_0x488b27(0x96f)][_0x488b27(0x8fd)]=BattleManager[_0x488b27(0x92b)],BattleManager[_0x488b27(0x92b)]=function(_0x4e2b13){const _0x20d01e=_0x488b27;if(this[_0x20d01e(0x80e)][_0x20d01e(0x6a9)]())return![];return VisuMZ[_0x20d01e(0x96f)][_0x20d01e(0x8fd)][_0x20d01e(0x1dc)](this,_0x4e2b13);},BattleManager[_0x488b27(0x381)]=function(){const _0x21ea64=_0x488b27;if(this[_0x21ea64(0x4f5)])this[_0x21ea64(0x67d)]['endAction'](this['_subject']);this[_0x21ea64(0x5f7)]=_0x21ea64(0x7e1),this[_0x21ea64(0x4f5)]&&this['_subject'][_0x21ea64(0x23c)]()===0x0&&(this[_0x21ea64(0x208)](this[_0x21ea64(0x4f5)]),this[_0x21ea64(0x4f5)]=null);},Bitmap['prototype'][_0x488b27(0x662)]=function(){const _0x2816fb=_0x488b27;this['_image']=new Image(),this[_0x2816fb(0x4dc)]['onload']=this[_0x2816fb(0x6f4)][_0x2816fb(0x8e1)](this),this[_0x2816fb(0x4dc)][_0x2816fb(0x98f)]=this[_0x2816fb(0x576)]['bind'](this),this[_0x2816fb(0x5b0)](),this[_0x2816fb(0x71d)]=_0x2816fb(0x220),Utils[_0x2816fb(0x612)]()?this['_startDecrypting']():(this[_0x2816fb(0x4dc)][_0x2816fb(0x658)]=this[_0x2816fb(0x4b3)],![]&&this[_0x2816fb(0x4dc)][_0x2816fb(0x240)]>0x0&&(this[_0x2816fb(0x4dc)][_0x2816fb(0x2bc)]=null,this[_0x2816fb(0x6f4)]()));},Scene_Skill[_0x488b27(0x523)]['onActorChange']=function(){const _0x3b5a37=_0x488b27;Scene_MenuBase[_0x3b5a37(0x523)]['onActorChange'][_0x3b5a37(0x1dc)](this),this[_0x3b5a37(0x5fc)](),this[_0x3b5a37(0x754)][_0x3b5a37(0x982)](),this[_0x3b5a37(0x754)][_0x3b5a37(0x4b9)](),this['_skillTypeWindow']['activate']();},Scene_Skill[_0x488b27(0x523)][_0x488b27(0x335)]=function(){const _0x5c683f=_0x488b27;return this[_0x5c683f(0x230)]&&this['_skillTypeWindow'][_0x5c683f(0x77e)];},Game_Map[_0x488b27(0x523)][_0x488b27(0x779)]=function(_0x4b0e86,_0x1cc62a,_0x2d4744){const _0x3db464=_0x488b27,_0x47cae9=this[_0x3db464(0x8b8)](),_0xd2c1fa=this[_0x3db464(0x49a)](_0x4b0e86,_0x1cc62a);for(const _0x286dd0 of _0xd2c1fa){const _0xd5fee5=_0x47cae9[_0x286dd0];if(_0xd5fee5===undefined||_0xd5fee5===null){if($gameTemp[_0x3db464(0x3ba)]()&&!DataManager['isEventTest']()){let _0x4f901a=_0x3db464(0x861)+'\x0a';_0x4f901a+='Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages'+'\x0a',_0x4f901a+=_0x3db464(0x61c),this['showIncompleteTilesetError']()?(alert(_0x4f901a),SceneManager['exit']()):(console[_0x3db464(0x337)](_0x4f901a),!$gameTemp[_0x3db464(0x6c9)]&&($gameTemp[_0x3db464(0x6c9)]=!![],SceneManager[_0x3db464(0x397)]()));}}if((_0xd5fee5&0x10)!==0x0)continue;if((_0xd5fee5&_0x2d4744)===0x0)return!![];if((_0xd5fee5&_0x2d4744)===_0x2d4744)return![];}return![];},Game_Map[_0x488b27(0x523)][_0x488b27(0x8c8)]=function(){const _0x1b015b=_0x488b27;if(Imported[_0x1b015b(0x36f)])return!![];if(Imported[_0x1b015b(0x6e3)])return!![];return![];},Sprite_Animation[_0x488b27(0x523)][_0x488b27(0x269)]=function(_0x3aba52){const _0x21edfc=_0x488b27;!this[_0x21edfc(0x569)]&&(this['_originalViewport']=_0x3aba52['gl'][_0x21edfc(0x361)](_0x3aba52['gl'][_0x21edfc(0x7e0)]));},VisuMZ[_0x488b27(0x96f)]['Scene_Map_shouldAutosave']=Scene_Map[_0x488b27(0x523)]['shouldAutosave'],Scene_Map[_0x488b27(0x523)][_0x488b27(0x2de)]=function(){const _0x3acf7f=_0x488b27,_0x576198=SceneManager[_0x3acf7f(0x34a)][_0x3acf7f(0x24c)];if([_0x3acf7f(0x678),'Scene_Load','Scene_TitleTransition',_0x3acf7f(0x1e0)][_0x3acf7f(0x5f8)](_0x576198))return![];return VisuMZ[_0x3acf7f(0x96f)]['Scene_Map_shouldAutosave'][_0x3acf7f(0x1dc)](this);},VisuMZ['CoreEngine'][_0x488b27(0x2a6)]=Window_SkillList['prototype']['includes'],Window_SkillList['prototype'][_0x488b27(0x5f8)]=function(_0x2fe1e8){const _0xb81d73=_0x488b27;if(this[_0xb81d73(0x89d)]<=0x0)return![];return VisuMZ[_0xb81d73(0x96f)][_0xb81d73(0x2a6)][_0xb81d73(0x1dc)](this,_0x2fe1e8);};