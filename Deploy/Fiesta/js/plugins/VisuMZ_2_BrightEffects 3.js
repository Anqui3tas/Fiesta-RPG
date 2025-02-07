//=============================================================================
// VisuStella MZ - Bright Effects
// VisuMZ_2_BrightEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BrightEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BrightEffects = VisuMZ.BrightEffects || {};
VisuMZ.BrightEffects.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.02] [BrightEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Bright_Effects_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * This RPG Maker MZ plugin allows you to add various bright effects to your
 * game's maps and battle system. These effects can make the game appear more
 * vivid, light, and gives you control over the color settings of a particular
 * map to make a more distinct feeling, too. The bright effects can be changed
 * midway through events in both maps and battles, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * A Bloom filter effect that can help soften the feel of a map by giving
 *   objects on the screen a slight hazy glow.
 * * Godrays can be used to show animated sunlight coming down from the sky
 *   above.
 * * The Color Adjustment filter allows you to alter the brightness, contrast,
 *   and saturation levels of your maps and battles.
 * * Plugin Commands that allow you to adjust these settings on the go.
 * * Notetags for maps to alter the Bloom, Godray, and Color Adjustments
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
 * * Pixi JS Filters*
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 * 
 * *Note* You can download the Pixi JS Filters plugin library from the below
 * URL or from the Action Sequence Impact product page. Install it as a
 * Tier 0 plugin.
 * 
 * *Note2* Pixi JS Filters perform differently on different machines/devices.
 * Please understand that this is outside of VisuStella's control.
 * 
 * URL: https://filters.pixijs.download/v3.1.0/pixi-filters.js
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * New Effects
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Bloom
 * 
 * This filter puts a faint (or large) glow around lighter-colored objects on
 * the map to give them a softer, hazy, brighter feeling.
 * 
 * Properties:
 *
 * Scale: To adjust the strength of the bloom. Higher values is more
 * intense brightness.
 *
 * Brightness: The brightness, lower value is more subtle brightness, higher
 * value is blown-out.
 *
 * Threshold: Defines how bright a color needs to be to affect bloom.
 *
 * ---
 *
 * Godray
 * 
 * The Godray filter puts down rays of light coming from the sky at an angle.
 * This is often used to represent sunlight peaking from above the clouds.
 * 
 * Properties:
 *
 * Visible: If on, the godrays will be visible by default. If off, they won't.
 *
 * Speed: The speed at which the light flickers. Lower for slower rate.
 * Higher for faster speeds.
 *
 * Gain: General intensity of the effect.
 *
 * Lacunarity: The density of the fractal noise.
 *
 * Angle: The angle/light-source direction of the rays.
 *
 * ---
 *
 * Color Adjustment
 * 
 * The Color Adjustment filter allows you to control the colors on the screen
 * to be more/less bright, contrast more/less, and more/less saturated.
 * 
 * Properties:
 *
 * Brightness: Adjusts the overall brightness of the screen. Use lower numbers
 * to make it darker and higher numbers to increase the brightness.
 *
 * Contrast: Increases the separation between dark and bright. Darker colors
 * become darker. Lighter colors become lighter. Increase this number to make
 * the effect more intense or decrease it to lessen it.
 *
 * Saturate: Adjusts the intensity of color on the screen. User higher numbers
 * to make colors more intense and lower numbers to make it less.
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
 * VisuMZ_1_OptionsCore
 * 
 * As of the VisuStella MZ Options Core v1.10 update, both the Bright Effects
 * and Horror Effects plugins will be affected by the "Special Effects" option
 * found under the Options Core's General Settings. If the "Special Effects"
 * option is set to OFF, then the filter effects applied by those plugins will
 * also be disabled. They will be reenabled when the option is set back to ON.
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
 * === Bloom-Related Notetags ===
 * 
 * ---
 *
 * <Bloom Scale: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes the bloom scale to x for map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less bloom
 *   - Higher - More bloom
 *
 * ---
 *
 * <Bloom Brightness: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes the bloom brightness to x for map/battle
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Bloom Threshold: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes the bloom threshold to x for map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less picky
 *   - Higher - More picky
 *
 * ---
 *
 * <Bloom Horz Scale: x to y>
 * <Bloom Vert Scale: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Sets an adjusting scale when traveling left to right on the map
 *   (Horz) or up to down on the map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less bloom
 *   - Higher - More bloom
 *
 * ---
 *
 * <Bloom Horz Brightness: x to y>
 * <Bloom Vert Brightness: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Sets an adjusting brightness when traveling left to right on the
 *   map (Horz) or up to down on the map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Bloom Horz Threshold: x to y>
 * <Bloom Vert Threshold: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Sets an adjusting threshold when traveling left to right on the
 *   map (Horz) or up to down on the map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less picky
 *   - Higher - More picky
 *
 * ---
 * 
 * === Godray-Related Notetags ===
 * 
 * ---
 *
 * <Godray>
 * <No Godray>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes if there will be a godray on the map/battle regardless of the
 *   default settings in the plugin parameters.
 *
 * ---
 *
 * <Godray Speed: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the flickering speed of the rays.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Slower
 *   - Higher - Faster
 *
 * ---
 *
 * <Godray Gain: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the gain/intensity of the rays.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Lighter
 *   - Higher - Intense
 *
 * ---
 *
 * <Godray Lacunarity: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the lacunarity/density of the rays.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less dense
 *   - Higher - More dense
 *
 * ---
 *
 * <Godray Angle: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the angle of the rays.
 * - Replace 'x' with a number to represent the value. Use a negative or
 *   positive integer value.
 *   - Negative - Coming from the left
 *   - Positive - Coming from the right
 *
 * ---
 *
 * <Godray Horz Speed: x to y>
 * <Godray Vert Speed: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray speed going left to right on a map (Horz) or up
 *   to down on a map (Vert). 
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Slower
 *   - Higher - Faster
 *
 * ---
 *
 * <Godray Horz Gain: x to y>
 * <Godray Vert Gain: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray gain going left to right on a map (Horz) or up to
 *   down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Lighter
 *   - Higher - Intense
 *
 * ---
 *
 * <Godray Horz Lacunarity: x to y>
 * <Godray Vert Lacunarity: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray lacunarity going left to right on a map (Horz) or
 *   up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less dense
 *   - Higher - More dense
 *
 * ---
 *
 * <Godray Horz Angle: x to y>
 * <Godray Vert Angle: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray angle going left to right on a map (Horz) or up
 *   to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use a negative or
 *   positive integer values.
 *   - Negative - Coming from the left
 *   - Positive - Coming from the right
 *
 * ---
 * 
 * === Color Adjust-Related Notetags ===
 * 
 * ---
 *
 * <Color Adjust Brightness: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Alters the screen brightness for the map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Color Adjust Contrast: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Adjusts the screen contrast for the map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less contrast
 *   - Higher - More contrast
 *
 * ---
 *
 * <Color Adjust Saturate: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Adjusts the screen saturation for the map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Color Adjust Horz Brightness: x to y>
 * <Color Adjust Vert Brightness: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Alters the screen brightness when moving left to right on a map
 *   (Horz) or up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Color Adjust Horz Contrast: x to y>
 * <Color Adjust Vert Contrast: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts the screen contrast when moving left to right on a map
 *   (Horz) or up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less contrast
 *   - Higher - More contrast
 *
 * ---
 *
 * <Color Adjust Horz Saturate: x to y>
 * <Color Adjust Vert Saturate: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts the screen saturation when moving left to right on a map
 *   (Horz) or up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less intensity
 *   - Higher - More intensity
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
 * === Bloom Plugin Commands ===
 * 
 * ---
 *
 * Bloom: Change Settings
 * - Change the Bloom filter settings for the screen.
 *
 *   Bloom Scale:
 *   - Change bloom scale for the screen.
 *
 *   Bloom Brightness:
 *   - Change bloom brightness for the screen.
 *
 *   Bloom Threshold:
 *   - Change bloom threshold for the screen.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the change to occur.
 *
 * ---
 *
 * Bloom: Reset
 * - Reset the Bloom filter settings for the settings found in the Plugin
 *   Parameters or map notetags.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the reset to occur.
 *
 * ---
 * 
 * === Godray Plugin Commands ===
 * 
 * ---
 *
 * Godray: Change Settings
 * - Change the Godray filter settings for the screen.
 *
 *   Visible?:
 *   - Show godrays on the screen?
 *   - Visibility changes are immediate.
 *
 *   Godray Speed:
 *   - Change godray speed for the screen.
 *
 *   Godray Gain:
 *   - Change godray gain for the screen.
 *
 *   Godray Lacunarity:
 *   - Change godray lacunarity for the screen.
 *
 *   Godray Angle:
 *   - Change godray angle for the screen.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the change to occur.
 *   - Visibility changes are immediate.
 *
 * ---
 *
 * Godray: Reset
 * - Reset the Godray filter settings for the settings found in the Plugin
 *   Parameters or map notetags.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the reset to occur.
 *   - Visibility changes are immediate.
 *
 * ---
 * 
 * === Color Adjust Plugin Commands ===
 * 
 * ---
 *
 * Color Adjust: Change Settings
 * - Change the Color Adjustment filter settings for the screen.
 *
 *   Adjust Brightness:
 *   - Change color adjust brightness for the screen.
 *
 *   Adjust Contrast:
 *   - Change color adjust contrast for the screen.
 *
 *   Adjust Saturation:
 *   - Change color adjust saturation for the screen.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the change to occur.
 *
 * ---
 *
 * Color Adjust: Reset
 * - Reset the Color Adjustment filter settings for the settings found in the
 *   Plugin Parameters or map notetags.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the reset to occur.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Bloom Settings
 * ============================================================================
 *
 * There are two versions of these plugin parameters. One of them are for the
 * Map Defaults and the other is for the Battle Defaults. These settings are
 * applied to the map and battle scenes respectively and will serve as the
 * stock setting when no map notetags, troop name tags, or Plugin Commands have
 * been used to alter them.
 *
 * ---
 *
 * Bloom Settings
 * 
 *   Bloom Scale:
 *   - Default bloom scale for the screen unless changed through tags.
 * 
 *   Bloom Brightness:
 *   - Default bloom brightness for the screen unless changed through tags.
 * 
 *   Bloom Threshold:
 *   - Default bloom threshold for the screen unless changed through tags.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Godray Settings
 * ============================================================================
 *
 * There are two versions of these plugin parameters. One of them are for the
 * Map Defaults and the other is for the Battle Defaults. These settings are
 * applied to the map and battle scenes respectively and will serve as the
 * stock setting when no map notetags, troop name tags, or Plugin Commands have
 * been used to alter them.
 *
 * ---
 *
 * Godray Settings
 * 
 *   Default Visible?:
 *   - Show godrays on all screens by default unless changed through tags?
 * 
 *   Godray Speed:
 *   - Default godray speed for all screens unless changed through tags.
 * 
 *   Godray Gain:
 *   - Default godray gain for all screens unless changed through tags.
 * 
 *   Godray Lacunarity:
 *   - Default godray lacunarity for all screens unless changed through tags.
 * 
 *   Godray Angle:
 *   - Default godray angle for all screens unless changed through tags.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Adjust Settings
 * ============================================================================
 *
 * There are two versions of these plugin parameters. One of them are for the
 * Map Defaults and the other is for the Battle Defaults. These settings are
 * applied to the map and battle scenes respectively and will serve as the
 * stock setting when no map notetags, troop name tags, or Plugin Commands have
 * been used to alter them.
 *
 * ---
 *
 * Color Adjust Settings
 * 
 *   Adjust Brightness:
 *   - Default color adjust brightness for all screens unless changed
 *     through tags.
 * 
 *   Adjust Contrast:
 *   - Default color adjust contrast for all screens unless changed
 *     through tags.
 * 
 *   Adjust Saturation:
 *   - Default color adjust saturation for all screens unless changed
 *     through tags.
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
 * * Compatibility Update!
 * ** Added compatibility with the VisuStella MZ Options Core v1.10 update.
 * *** When the "Special Effects" option is set to OFF, the filters for this
 *     plugin will be shut off. They will be returned to normal when set to ON.
 * * Documentation Update!
 * ** Added the Options Core section to the "Extra Features" list.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Bright effects from battle should no longer carry back over into the
 *    map scene. Fix made by Yanfly.
 *
 * Version 1.00: January 18, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BloomChange
 * @text Bloom: Change Settings
 * @desc Change the Bloom filter settings for the screen.
 *
 * @arg Scale:num
 * @text Bloom Scale
 * @desc Change bloom scale for the screen.
 * @default 0.5
 *
 * @arg Brightness:num
 * @text Bloom Brightness
 * @desc Change bloom brightness for the screen.
 * @default 1.0
 *
 * @arg Threshold:num
 * @text Bloom Threshold
 * @desc Change bloom threshold for the screen.
 * @default 0.5
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the change to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BloomReset
 * @text Bloom: Reset
 * @desc Reset the Bloom filter settings for the settings found in
 * the Plugin Parameters or map notetags.
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the reset to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GodrayChange
 * @text Godray: Change Settings
 * @desc Change the Godray filter settings for the screen.
 *
 * @arg Visible:eval
 * @text Visible?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show godrays on the screen?
 * Visibility changes are immediate.
 * @default true
 *
 * @arg Speed:num
 * @text Godray Speed
 * @desc Change godray speed for the screen.
 * @default 0.01
 *
 * @arg Gain:num
 * @text Godray Gain
 * @desc Change godray gain for the screen.
 * @default 0.6
 *
 * @arg Lacunarity:num
 * @text Godray Lacunarity
 * @desc Change godray lacunarity for the screen.
 * @default 2.0
 *
 * @arg Angle:num
 * @text Godray Angle
 * @desc Change godray angle for the screen.
 * @default -30
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the change to occur.
 * Visibility changes are immediate.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GodrayReset
 * @text Godray: Reset
 * @desc Reset the Godray filter settings for the settings
 * found in the Plugin Parameters or map notetags.
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the reset to occur.
 * Visibility changes are immediate.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ColorAdjustChange
 * @text Color Adjust: Change Settings
 * @desc Change the Color Adjustment filter settings for the screen.
 *
 * @arg Brightness:num
 * @text Adjust Brightness
 * @desc Change color adjust brightness for the screen.
 * @default 1.0
 *
 * @arg Contrast:num
 * @text Adjust Contrast
 * @desc Change color adjust contrast for the screen.
 * @default 0.0
 *
 * @arg Saturate:num
 * @text Adjust Saturation
 * @desc Change color adjust saturation for the screen.
 * @default 0.0
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the change to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ColorAdjustReset
 * @text Color Adjust: Reset
 * @desc Reset the Color Adjustment filter settings for the settings
 * found in the Plugin Parameters or map notetags.
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the reset to occur.
 * @default 60
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
 * @param BrightEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Map
 * @text Map Defaults
 *
 * @param MapBloom:struct
 * @text Bloom Settings
 * @parent Map
 * @type struct<Bloom>
 * @desc Default bloom settings for all maps.
 * @default {"Scale:num":"0.5","Brightness:num":"1.0","Threshold:num":"0.5"}
 *
 * @param MapGodray:struct
 * @text Godray Settings
 * @parent Map
 * @type struct<Godray>
 * @desc Default Godray settings for all maps.
 * @default {"Visible:eval":"false","Speed:num":"0.01","Gain:num":"0.6","Lacunarity:num":"2.0","Angle:num":"-30"}
 *
 * @param MapColorAdjust:struct
 * @text Color Adjust Settings
 * @parent Map
 * @type struct<ColorAdjust>
 * @desc Default color adjustment settings for all maps.
 * @default {"Brightness:num":"1.0","Contrast:num":"0.0","Saturate:num":"0.0"}
 * 
 * @param Battle
 * @text Battle Defaults
 *
 * @param BattleBloom:struct
 * @text Bloom Settings
 * @parent Battle
 * @type struct<Bloom>
 * @desc Default bloom settings for all battles.
 * @default {"Scale:num":"0.5","Brightness:num":"1.0","Threshold:num":"0.5"}
 *
 * @param BattleGodray:struct
 * @text Godray Settings
 * @parent Battle
 * @type struct<Godray>
 * @desc Default Godray settings for all battles.
 * @default {"Visible:eval":"false","Speed:num":"0.01","Gain:num":"0.6","Lacunarity:num":"2.0","Angle:num":"-30"}
 *
 * @param BattleColorAdjust:struct
 * @text Color Adjust Settings
 * @parent Battle
 * @type struct<ColorAdjust>
 * @desc Default color adjustment settings for all battles.
 * @default {"Brightness:num":"1.0","Contrast:num":"0.0","Saturate:num":"0.0"}
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
 * Bloom Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Bloom:
 *
 * @param Scale:num
 * @text Bloom Scale
 * @desc Default bloom scale for the screen unless changed through tags.
 * @default 0.5
 *
 * @param Brightness:num
 * @text Bloom Brightness
 * @desc Default bloom brightness for the screen unless changed through tags.
 * @default 1.0
 *
 * @param Threshold:num
 * @text Bloom Threshold
 * @desc Default bloom threshold for the screen unless changed through tags.
 * @default 0.5
 *
 */
/* ----------------------------------------------------------------------------
 * Godray Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Godray:
 *
 * @param Visible:eval
 * @text Default Visible?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show godrays on all screens by default unless changed through tags?
 * @default false
 *
 * @param Speed:num
 * @text Godray Speed
 * @desc Default godray speed for all screens unless changed through tags.
 * @default 0.01
 *
 * @param Gain:num
 * @text Godray Gain
 * @desc Default godray gain for all screens unless changed through tags.
 * @default 0.6
 *
 * @param Lacunarity:num
 * @text Godray Lacunarity
 * @desc Default godray lacunarity for all screens unless changed through tags.
 * @default 2.0
 *
 * @param Angle:num
 * @text Godray Angle
 * @desc Default godray angle for all screens unless changed through tags.
 * @default -30
 *
 */
/* ----------------------------------------------------------------------------
 * Color Adjust Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ColorAdjust:
 *
 * @param Brightness:num
 * @text Adjust Brightness
 * @desc Default color adjust brightness for all screens unless changed through tags.
 * @default 1.0
 *
 * @param Contrast:num
 * @text Adjust Contrast
 * @desc Default color adjust contrast for all screens unless changed through tags.
 * @default 0.0
 *
 * @param Saturate:num
 * @text Adjust Saturation
 * @desc Default color adjust saturation for all screens unless changed through tags.
 * @default 0.0
 *
 */
//=============================================================================

var _0x2892=['contrast','_realY','registerCommand','BrightEffects','_brightEffectsColorAdjustHorzBrightness','start','Spriteset_Base_update','BattleGodray','setBrightEffectsGodraySettings','_brightEffectsColorAdjustVertContrast','17671mAKScS','_brightEffectsGodrayHorzLacunarity','description','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','updateBrightEffectsAdvBloomFilter','prototype','lacunarity','_brightEffectsGodrayVertSpeed','updateMapBrightEffectsColorAdjust','setupBrightEffectsGodrayFilter','_brightEffectsBloomHorzThreshold','Angle','threshold','Brightness','includes','ColorAdjustChange','_BrightEffectsAdvBloomFilter','ConvertParams','height','createBrightEffectsFilters','map','isSceneBattle','constructor','createBrightEffectsColorAdjustFilter','currentBrightness','_brightEffectsGodrayVertGain','max','_brightEffectsBloomVertScale','_BrightEffectsColorAdjustFilter','41ZpoGXS','Contrast','_brightEffectsBloomHorzBrightness','exit','createBrightEffectsAdvBloomFilter','_realX','Game_Player_update','_brightEffectsBloomVertThreshold','Scale','MapBloom','updateMapBrightEffectsGodray','version','STRUCT','_BrightEffectsColorAdjustSettingsBattle','Lacunarity','setBrightEffectsColorAdjustSettings','getBrightEffectsColorAdjustSettings','enabled','Game_Map_setup','specialEffects','createOverallFilters','speed','MapColorAdjust','1139SzgxFn','_BrightEffectsAdvBloomSettingsBattle','_BrightEffectsGodraySettingsBattle','_BrightEffectsColorAdjustSettingsMap','updateMapBrightEffectsAdvBloom','ARRAYFUNC','troop','Gain','parameters','getBrightEffectsAdvBloomSettings','setBrightEffectsAdvBloomSettings','parse','updateBrightEffectsFilters','Settings','_brightEffectsBloomVertBrightness','setup','bloomScale','note','BloomChange','angle','BattleBloom','_brightEffectsGodrayVertAngle','1CIjsVH','_brightEffectsColorAdjustVertSaturate','_BrightEffectsGodraySettingsMap','setupBrightEffectsAdvBloomFilter','NUM','gain','updateBrightEffectsGodrayFilter','143426UJYxaB','Visible','currentContrast','updateMapBrightEffects','GodrayReset','Saturate','width','ARRAYJSON','Game_CharacterBase_locate','BattleColorAdjust','631YFNTGE','saturate','ColorAdjustReset','_brightEffectsGodrayVertLacunarity','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','createBrightEffectsGodrayFilter','ARRAYSTRUCT','match','ARRAYNUM','_brightEffectsColorAdjustHorzContrast','_brightEffectsGodrayHorzAngle','_brightEffectsGodrayHorzGain','STR','BloomReset','GodrayFilter','Spriteset_Base_createOverallFilters','MapGodray','visible','status','_brightEffectsBloomHorzScale','_BrightEffectsGodrayFilter','632yEyjDA','1171187VTBZOm','format','2908757ZRUWeX','_scene','call','733zHOVaX','getBrightEffectsGodraySettings','Threshold','update','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','updateBrightEffectsColorAdjustFilter','Scene_Battle_start','brightness','_brightEffectsColorAdjustVertBrightness','setupBrightEffectsColorAdjustFilter','setupBrightEffectsFilters','_brightEffectsColorAdjustHorzSaturate','locate','currentSaturate','AdvancedBloomFilter','push','Speed','filters','JSON','duration','Duration','733357kSlTrj','name','_brightEffectsGodrayHorzSpeed','GodrayChange'];var _0x5b86=function(_0x536b18,_0xcbe310){_0x536b18=_0x536b18-0x14f;var _0x289273=_0x2892[_0x536b18];return _0x289273;};var _0x2649d9=_0x5b86;(function(_0x414e5c,_0x56d56c){var _0x577c08=_0x5b86;while(!![]){try{var _0x29d913=parseInt(_0x577c08(0x162))*-parseInt(_0x577c08(0x1a3))+parseInt(_0x577c08(0x188))*-parseInt(_0x577c08(0x18e))+parseInt(_0x577c08(0x169))+parseInt(_0x577c08(0x1b1))*parseInt(_0x577c08(0x1ce))+-parseInt(_0x577c08(0x173))*parseInt(_0x577c08(0x1e5))+-parseInt(_0x577c08(0x189))+parseInt(_0x577c08(0x18b));if(_0x29d913===_0x56d56c)break;else _0x414e5c['push'](_0x414e5c['shift']());}catch(_0x1a5098){_0x414e5c['push'](_0x414e5c['shift']());}}}(_0x2892,0xa8809));var label=_0x2649d9(0x1aa),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x1c6bfc){var _0x101bc2=_0x2649d9;return _0x1c6bfc[_0x101bc2(0x185)]&&_0x1c6bfc['description'][_0x101bc2(0x1bf)]('['+label+']');})[0x0];VisuMZ[label][_0x2649d9(0x159)]=VisuMZ[label][_0x2649d9(0x159)]||{},VisuMZ[_0x2649d9(0x1c2)]=function(_0x18a57d,_0x209c38){var _0x1b92eb=_0x2649d9;for(const _0xecc6cf in _0x209c38){if(_0xecc6cf[_0x1b92eb(0x17a)](/(.*):(.*)/i)){const _0x5e8121=String(RegExp['$1']),_0x4cb319=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x5416a0,_0x9ba575,_0x193db0;switch(_0x4cb319){case _0x1b92eb(0x166):_0x5416a0=_0x209c38[_0xecc6cf]!==''?Number(_0x209c38[_0xecc6cf]):0x0;break;case _0x1b92eb(0x17b):_0x9ba575=_0x209c38[_0xecc6cf]!==''?JSON[_0x1b92eb(0x157)](_0x209c38[_0xecc6cf]):[],_0x5416a0=_0x9ba575['map'](_0x326433=>Number(_0x326433));break;case'EVAL':_0x5416a0=_0x209c38[_0xecc6cf]!==''?eval(_0x209c38[_0xecc6cf]):null;break;case'ARRAYEVAL':_0x9ba575=_0x209c38[_0xecc6cf]!==''?JSON[_0x1b92eb(0x157)](_0x209c38[_0xecc6cf]):[],_0x5416a0=_0x9ba575[_0x1b92eb(0x1c5)](_0x35ddca=>eval(_0x35ddca));break;case _0x1b92eb(0x1a0):_0x5416a0=_0x209c38[_0xecc6cf]!==''?JSON[_0x1b92eb(0x157)](_0x209c38[_0xecc6cf]):'';break;case _0x1b92eb(0x170):_0x9ba575=_0x209c38[_0xecc6cf]!==''?JSON[_0x1b92eb(0x157)](_0x209c38[_0xecc6cf]):[],_0x5416a0=_0x9ba575['map'](_0x28b870=>JSON['parse'](_0x28b870));break;case'FUNC':_0x5416a0=_0x209c38[_0xecc6cf]!==''?new Function(JSON[_0x1b92eb(0x157)](_0x209c38[_0xecc6cf])):new Function('return\x200');break;case _0x1b92eb(0x151):_0x9ba575=_0x209c38[_0xecc6cf]!==''?JSON[_0x1b92eb(0x157)](_0x209c38[_0xecc6cf]):[],_0x5416a0=_0x9ba575[_0x1b92eb(0x1c5)](_0x5d416b=>new Function(JSON[_0x1b92eb(0x157)](_0x5d416b)));break;case _0x1b92eb(0x17f):_0x5416a0=_0x209c38[_0xecc6cf]!==''?String(_0x209c38[_0xecc6cf]):'';break;case'ARRAYSTR':_0x9ba575=_0x209c38[_0xecc6cf]!==''?JSON[_0x1b92eb(0x157)](_0x209c38[_0xecc6cf]):[],_0x5416a0=_0x9ba575['map'](_0x829f6f=>String(_0x829f6f));break;case _0x1b92eb(0x1da):_0x193db0=_0x209c38[_0xecc6cf]!==''?JSON[_0x1b92eb(0x157)](_0x209c38[_0xecc6cf]):{},_0x5416a0=VisuMZ[_0x1b92eb(0x1c2)]({},_0x193db0);break;case _0x1b92eb(0x179):_0x9ba575=_0x209c38[_0xecc6cf]!==''?JSON[_0x1b92eb(0x157)](_0x209c38[_0xecc6cf]):[],_0x5416a0=_0x9ba575[_0x1b92eb(0x1c5)](_0xebc036=>VisuMZ['ConvertParams']({},JSON[_0x1b92eb(0x157)](_0xebc036)));break;default:continue;}_0x18a57d[_0x5e8121]=_0x5416a0;}}return _0x18a57d;},(_0x4a36b7=>{var _0x563f45=_0x2649d9;const _0x12ad78=_0x4a36b7['name'];for(const _0x34fe93 of dependencies){if(!Imported[_0x34fe93]){alert(_0x563f45(0x177)[_0x563f45(0x18a)](_0x12ad78,_0x34fe93)),SceneManager[_0x563f45(0x1d1)]();break;}}const _0x11d9be=_0x4a36b7[_0x563f45(0x1b3)];if(_0x11d9be['match'](/\[Version[ ](.*?)\]/i)){const _0xdeb50d=Number(RegExp['$1']);_0xdeb50d!==VisuMZ[label][_0x563f45(0x1d9)]&&(alert(_0x563f45(0x1b4)['format'](_0x12ad78,_0xdeb50d)),SceneManager[_0x563f45(0x1d1)]());}if(_0x11d9be[_0x563f45(0x17a)](/\[Tier[ ](\d+)\]/i)){const _0x37025f=Number(RegExp['$1']);_0x37025f<tier?(alert(_0x563f45(0x192)[_0x563f45(0x18a)](_0x12ad78,_0x37025f,tier)),SceneManager[_0x563f45(0x1d1)]()):tier=Math[_0x563f45(0x1cb)](_0x37025f,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x563f45(0x159)],_0x4a36b7[_0x563f45(0x154)]);})(pluginData),PluginManager[_0x2649d9(0x1a9)](pluginData[_0x2649d9(0x1a4)],_0x2649d9(0x15e),_0x266a83=>{var _0x49881f=_0x2649d9;VisuMZ[_0x49881f(0x1c2)](_0x266a83,_0x266a83);const _0x29cf0e=$gameScreen[_0x49881f(0x155)]();_0x29cf0e[_0x49881f(0x15c)]=_0x266a83[_0x49881f(0x1d6)],_0x29cf0e[_0x49881f(0x195)]=_0x266a83['Brightness'],_0x29cf0e[_0x49881f(0x1bd)]=_0x266a83[_0x49881f(0x190)],_0x29cf0e[_0x49881f(0x1a1)]=_0x266a83[_0x49881f(0x1a2)],!SceneManager[_0x49881f(0x1c6)]()&&($gameMap[_0x49881f(0x1d0)]=undefined,$gameMap['_brightEffectsBloomVertBrightness']=undefined);}),PluginManager[_0x2649d9(0x1a9)](pluginData[_0x2649d9(0x1a4)],_0x2649d9(0x180),_0x1013dc=>{var _0x51da89=_0x2649d9;VisuMZ[_0x51da89(0x1c2)](_0x1013dc,_0x1013dc);SceneManager[_0x51da89(0x1c6)]()?$gameTroop['setupBrightEffectsAdvBloomFilter']():$gameMap['setupBrightEffectsAdvBloomFilter']();const _0x2d03ad=$gameScreen[_0x51da89(0x155)]();_0x2d03ad[_0x51da89(0x1a1)]=_0x1013dc[_0x51da89(0x1a2)];}),PluginManager[_0x2649d9(0x1a9)](pluginData[_0x2649d9(0x1a4)],_0x2649d9(0x1a6),_0x42d89d=>{var _0xd4c686=_0x2649d9;VisuMZ[_0xd4c686(0x1c2)](_0x42d89d,_0x42d89d);const _0x8d3cbc=$gameScreen[_0xd4c686(0x18f)]();_0x8d3cbc[_0xd4c686(0x184)]=_0x42d89d[_0xd4c686(0x16a)],_0x8d3cbc[_0xd4c686(0x1e3)]=_0x42d89d[_0xd4c686(0x19e)],_0x8d3cbc[_0xd4c686(0x167)]=_0x42d89d[_0xd4c686(0x153)],_0x8d3cbc[_0xd4c686(0x1b7)]=_0x42d89d[_0xd4c686(0x1dc)],_0x8d3cbc[_0xd4c686(0x15f)]=_0x42d89d[_0xd4c686(0x1bc)],_0x8d3cbc[_0xd4c686(0x1a1)]=_0x42d89d['Duration'],!SceneManager[_0xd4c686(0x1c6)]()&&($gameMap['_brightEffectsGodrayHorzSpeed']=undefined,$gameMap[_0xd4c686(0x1b8)]=undefined);}),PluginManager[_0x2649d9(0x1a9)](pluginData['name'],_0x2649d9(0x16d),_0x418a05=>{var _0x33728f=_0x2649d9;VisuMZ['ConvertParams'](_0x418a05,_0x418a05);SceneManager[_0x33728f(0x1c6)]()?$gameTroop[_0x33728f(0x1ba)]():$gameMap[_0x33728f(0x1ba)]();const _0x5d9168=$gameScreen[_0x33728f(0x18f)]();_0x5d9168[_0x33728f(0x1a1)]=_0x418a05['Duration'];}),PluginManager['registerCommand'](pluginData['name'],_0x2649d9(0x1c0),_0x581a56=>{var _0x569a90=_0x2649d9;VisuMZ[_0x569a90(0x1c2)](_0x581a56,_0x581a56);const _0x46d073=$gameScreen[_0x569a90(0x1de)]();_0x46d073[_0x569a90(0x195)]=_0x581a56['Brightness'],_0x46d073[_0x569a90(0x1a7)]=_0x581a56[_0x569a90(0x1cf)],_0x46d073[_0x569a90(0x174)]=_0x581a56['Saturate'],_0x46d073[_0x569a90(0x1a1)]=_0x581a56['Duration'],!SceneManager['isSceneBattle']()&&($gameMap[_0x569a90(0x199)]=undefined,$gameMap['_brightEffectsColorAdjustVertSaturate']=undefined);}),PluginManager[_0x2649d9(0x1a9)](pluginData[_0x2649d9(0x1a4)],_0x2649d9(0x175),_0x4c08f1=>{var _0x192376=_0x2649d9;VisuMZ[_0x192376(0x1c2)](_0x4c08f1,_0x4c08f1);SceneManager[_0x192376(0x1c6)]()?$gameTroop[_0x192376(0x197)]():$gameMap[_0x192376(0x197)]();const _0x463d74=$gameScreen[_0x192376(0x1de)]();_0x463d74['duration']=_0x4c08f1[_0x192376(0x1a2)];}),SceneManager[_0x2649d9(0x1c6)]=function(){var _0xc0e2b6=_0x2649d9;return this['_scene']&&this[_0xc0e2b6(0x18c)]['constructor']===Scene_Battle;},SceneManager['isSceneMap']=function(){var _0xd4242f=_0x2649d9;return this[_0xd4242f(0x18c)]&&this[_0xd4242f(0x18c)][_0xd4242f(0x1c7)]===Scene_Map;},Game_Screen[_0x2649d9(0x1b6)][_0x2649d9(0x156)]=function(_0x4c6ad,_0x53c13d,_0x5f16a4,_0x16a6a8){var _0x4fde48=_0x2649d9;SceneManager[_0x4fde48(0x1c6)]()?this['_BrightEffectsAdvBloomSettingsBattle']={'bloomScale':_0x4c6ad,'brightness':_0x53c13d,'threshold':_0x5f16a4,'duration':_0x16a6a8||0x0}:this['_BrightEffectsAdvBloomSettingsMap']={'bloomScale':_0x4c6ad,'brightness':_0x53c13d,'threshold':_0x5f16a4,'duration':_0x16a6a8||0x0};},Game_Screen[_0x2649d9(0x1b6)][_0x2649d9(0x1af)]=function(_0x4bcb04,_0x1a071e,_0x3360e2,_0x3f7c2e,_0x4ce455,_0x44fc68){var _0x597cf9=_0x2649d9;SceneManager['isSceneBattle']()?this['_BrightEffectsGodraySettingsBattle']={'visible':_0x4bcb04,'speed':_0x1a071e,'gain':_0x3360e2,'lacunarity':_0x3f7c2e,'angle':_0x4ce455,'duration':_0x44fc68||0x0}:this[_0x597cf9(0x164)]={'visible':_0x4bcb04,'speed':_0x1a071e,'gain':_0x3360e2,'lacunarity':_0x3f7c2e,'angle':_0x4ce455,'duration':_0x44fc68||0x0};},Game_Screen['prototype'][_0x2649d9(0x1dd)]=function(_0x3d8d51,_0x220946,_0x34e8fa,_0x172a3c){var _0x56d9c4=_0x2649d9;SceneManager[_0x56d9c4(0x1c6)]()?this['_BrightEffectsColorAdjustSettingsBattle']={'brightness':_0x3d8d51,'contrast':_0x220946,'saturate':_0x34e8fa,'duration':_0x172a3c||0x0}:this['_BrightEffectsColorAdjustSettingsMap']={'brightness':_0x3d8d51,'contrast':_0x220946,'saturate':_0x34e8fa,'duration':_0x172a3c||0x0};},Game_Screen['prototype'][_0x2649d9(0x155)]=function(){var _0x156c6c=_0x2649d9;return SceneManager[_0x156c6c(0x1c6)]()?(this[_0x156c6c(0x1e6)]===undefined&&$gameTroop[_0x156c6c(0x165)](),this[_0x156c6c(0x1e6)]):(this['_BrightEffectsAdvBloomSettingsMap']===undefined&&$gameMap[_0x156c6c(0x165)](),this['_BrightEffectsAdvBloomSettingsMap']);},Game_Screen[_0x2649d9(0x1b6)][_0x2649d9(0x18f)]=function(){var _0x4cd7f2=_0x2649d9;return SceneManager['isSceneBattle']()?(this[_0x4cd7f2(0x1e7)]===undefined&&$gameTroop[_0x4cd7f2(0x1ba)](),this['_BrightEffectsGodraySettingsBattle']):(this[_0x4cd7f2(0x164)]===undefined&&$gameMap['setupBrightEffectsGodrayFilter'](),this['_BrightEffectsGodraySettingsMap']);},Game_Screen['prototype'][_0x2649d9(0x1de)]=function(){var _0x548b38=_0x2649d9;return SceneManager['isSceneBattle']()?(this[_0x548b38(0x1db)]===undefined&&$gameTroop[_0x548b38(0x197)](),this[_0x548b38(0x1db)]):(this[_0x548b38(0x14f)]===undefined&&$gameMap[_0x548b38(0x197)](),this[_0x548b38(0x14f)]);},VisuMZ[_0x2649d9(0x1aa)][_0x2649d9(0x194)]=Scene_Battle[_0x2649d9(0x1b6)][_0x2649d9(0x1ac)],Scene_Battle[_0x2649d9(0x1b6)]['start']=function(){var _0xa54d5d=_0x2649d9;VisuMZ[_0xa54d5d(0x1aa)][_0xa54d5d(0x194)][_0xa54d5d(0x18d)](this),$gameTroop['setupBrightEffectsFilters']();},Game_Troop[_0x2649d9(0x1b6)][_0x2649d9(0x198)]=function(){var _0x4af45e=_0x2649d9;this[_0x4af45e(0x165)](),this['setupBrightEffectsGodrayFilter'](),this[_0x4af45e(0x197)]();},Game_Troop[_0x2649d9(0x1b6)][_0x2649d9(0x165)]=function(){var _0x5e345a=_0x2649d9;const _0x20cad3=VisuMZ[_0x5e345a(0x1aa)]['Settings'][_0x5e345a(0x160)];var _0x5c0d2d=_0x20cad3[_0x5e345a(0x1d6)],_0x167dbc=_0x20cad3[_0x5e345a(0x1be)],_0x3c085d=_0x20cad3[_0x5e345a(0x190)];if(!!this[_0x5e345a(0x152)]()){var _0x3a401e=this['troop']()[_0x5e345a(0x1a4)];if(_0x3a401e['match'](/<BLOOM SCALE: (.*)>/i))var _0x5c0d2d=Number(RegExp['$1'])||0x0;if(_0x3a401e[_0x5e345a(0x17a)](/<BLOOM BRIGHTNESS: (.*)>/i))var _0x167dbc=Number(RegExp['$1'])||0x0;if(_0x3a401e[_0x5e345a(0x17a)](/<BLOOM THRESHOLD: (.*)>/i))var _0x3c085d=Number(RegExp['$1'])||0x0;}$gameScreen[_0x5e345a(0x156)](_0x5c0d2d,_0x167dbc,_0x3c085d,0x0);},Game_Troop[_0x2649d9(0x1b6)][_0x2649d9(0x1ba)]=function(){var _0x20d4f7=_0x2649d9;const _0x2c7267=VisuMZ[_0x20d4f7(0x1aa)][_0x20d4f7(0x159)][_0x20d4f7(0x1ae)];var _0x26bd2c=_0x2c7267[_0x20d4f7(0x16a)],_0x4224e0=_0x2c7267['Speed'],_0xec1a4=_0x2c7267[_0x20d4f7(0x153)],_0x539299=_0x2c7267[_0x20d4f7(0x1dc)],_0x3af970=_0x2c7267['Angle'];if(!!this['troop']()){var _0x45a541=this['troop']()['name'];if(_0x45a541[_0x20d4f7(0x17a)](/<GODRAY>/i))_0x26bd2c=!![];else _0x45a541[_0x20d4f7(0x17a)](/<NO GODRAY>/i)&&(_0x26bd2c=![]);_0x45a541['match'](/<GODRAY SPEED: (.*)>/i)&&(_0x4224e0=Number(RegExp['$1'])||0x0),_0x45a541['match'](/<GODRAY GAIN: (.*)>/i)&&(_0xec1a4=Number(RegExp['$1'])||0x0),_0x45a541[_0x20d4f7(0x17a)](/<GODRAY LACUNARITY: (.*)>/i)&&(_0x539299=Number(RegExp['$1'])||0x0),_0x45a541[_0x20d4f7(0x17a)](/<GODRAY ANGLE: (.*)>/i)&&(_0x3af970=Number(RegExp['$1'])||0x0);}$gameScreen[_0x20d4f7(0x1af)](_0x26bd2c,_0x4224e0,_0xec1a4,_0x539299,_0x3af970,0x0);},Game_Troop[_0x2649d9(0x1b6)][_0x2649d9(0x197)]=function(){var _0x1e8f57=_0x2649d9;const _0xbc5e5c=VisuMZ['BrightEffects'][_0x1e8f57(0x159)][_0x1e8f57(0x172)];var _0x3b2f99=_0xbc5e5c[_0x1e8f57(0x1be)],_0x1479c1=_0xbc5e5c['Contrast'],_0x14ae08=_0xbc5e5c['Saturate'];if(!!this[_0x1e8f57(0x152)]()){var _0x13b7aa=this['troop']()[_0x1e8f57(0x1a4)];if(_0x13b7aa[_0x1e8f57(0x17a)](/<COLOR ADJUST BRIGHTNESS: (.*)>/i))var _0x3b2f99=Number(RegExp['$1'])||0x0;if(_0x13b7aa[_0x1e8f57(0x17a)](/<COLOR ADJUST CONTRAST: (.*)>/i))var _0x1479c1=Number(RegExp['$1'])||0x0;if(_0x13b7aa['match'](/<COLOR ADJUST SATURATE: (.*)>/i))var _0x14ae08=Number(RegExp['$1'])||0x0;}$gameScreen[_0x1e8f57(0x1dd)](_0x3b2f99,_0x1479c1,_0x14ae08,0x0);},VisuMZ[_0x2649d9(0x1aa)][_0x2649d9(0x1e0)]=Game_Map[_0x2649d9(0x1b6)][_0x2649d9(0x15b)],Game_Map[_0x2649d9(0x1b6)][_0x2649d9(0x15b)]=function(_0x27d93b){var _0x29dce6=_0x2649d9;VisuMZ[_0x29dce6(0x1aa)][_0x29dce6(0x1e0)][_0x29dce6(0x18d)](this,_0x27d93b),!!$dataMap&&this['setupBrightEffectsFilters']();},Game_Map[_0x2649d9(0x1b6)][_0x2649d9(0x198)]=function(){var _0x2049b0=_0x2649d9;if(ConfigManager[_0x2049b0(0x1e1)]===![])return;this[_0x2049b0(0x165)](),this[_0x2049b0(0x1ba)](),this['setupBrightEffectsColorAdjustFilter'](),$gamePlayer[_0x2049b0(0x16c)]();},Game_Map[_0x2649d9(0x1b6)][_0x2649d9(0x165)]=function(){var _0x4036a2=_0x2649d9;const _0x2bf3ab=VisuMZ[_0x4036a2(0x1aa)][_0x4036a2(0x159)][_0x4036a2(0x1d7)];var _0x1bd721=_0x2bf3ab[_0x4036a2(0x1d6)],_0x9eb5af=_0x2bf3ab[_0x4036a2(0x1be)],_0x2e1d09=_0x2bf3ab[_0x4036a2(0x190)];this['_brightEffectsBloomHorzScale']=undefined,this[_0x4036a2(0x1cc)]=undefined,this[_0x4036a2(0x1d0)]=undefined,this[_0x4036a2(0x15a)]=undefined,this[_0x4036a2(0x1bb)]=undefined,this[_0x4036a2(0x1d5)]=undefined;if($dataMap){var _0x30602b=$dataMap[_0x4036a2(0x15d)];if(_0x30602b['match'](/<BLOOM SCALE: (.*)>/i))var _0x1bd721=Number(RegExp['$1'])||0x0;if(_0x30602b[_0x4036a2(0x17a)](/<BLOOM BRIGHTNESS: (.*)>/i))var _0x9eb5af=Number(RegExp['$1'])||0x0;if(_0x30602b[_0x4036a2(0x17a)](/<BLOOM THRESHOLD: (.*)>/i))var _0x2e1d09=Number(RegExp['$1'])||0x0;_0x30602b[_0x4036a2(0x17a)](/<BLOOM (?:HORZ|HORIZONTAL) SCALE: (.*) TO (.*)>/i)&&(this[_0x4036a2(0x186)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this['_brightEffectsBloomVertScale']=undefined),_0x30602b[_0x4036a2(0x17a)](/<BLOOM (?:VERT|VERTICAL) SCALE: (.*) TO (.*)>/i)&&(this['_brightEffectsBloomHorzScale']=undefined,this[_0x4036a2(0x1cc)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x30602b['match'](/<BLOOM (?:HORZ|HORIZONTAL) BRIGHTNESS: (.*) TO (.*)>/i)&&(this[_0x4036a2(0x1d0)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x4036a2(0x15a)]=undefined),_0x30602b['match'](/<BLOOM (?:VERT|VERTICAL) BRIGHTNESS: (.*) TO (.*)>/i)&&(this[_0x4036a2(0x1d0)]=undefined,this[_0x4036a2(0x15a)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x30602b[_0x4036a2(0x17a)](/<BLOOM (?:HORZ|HORIZONTAL) THRESHOLD: (.*) TO (.*)>/i)&&(this[_0x4036a2(0x1bb)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x4036a2(0x1d5)]=undefined),_0x30602b['match'](/<BLOOM (?:VERT|VERTICAL) THRESHOLD: (.*) TO (.*)>/i)&&(this[_0x4036a2(0x1bb)]=undefined,this[_0x4036a2(0x1d5)]=[Number(RegExp['$1']),Number(RegExp['$2'])]);}$gameScreen[_0x4036a2(0x156)](_0x1bd721,_0x9eb5af,_0x2e1d09,0x0);},Game_Map['prototype'][_0x2649d9(0x1ba)]=function(){var _0x500ee2=_0x2649d9;const _0x208fb1=VisuMZ[_0x500ee2(0x1aa)][_0x500ee2(0x159)][_0x500ee2(0x183)];var _0x1233c1=_0x208fb1[_0x500ee2(0x16a)],_0x362f1c=_0x208fb1[_0x500ee2(0x19e)],_0x496bfe=_0x208fb1[_0x500ee2(0x153)],_0x32bc63=_0x208fb1['Lacunarity'],_0x42cb48=_0x208fb1[_0x500ee2(0x1bc)];this[_0x500ee2(0x1a5)]=undefined,this[_0x500ee2(0x1b8)]=undefined,this[_0x500ee2(0x17e)]=undefined,this[_0x500ee2(0x1ca)]=undefined,this[_0x500ee2(0x1b2)]=undefined,this[_0x500ee2(0x176)]=undefined,this[_0x500ee2(0x17d)]=undefined,this[_0x500ee2(0x161)]=undefined;if($dataMap){var _0x21fc87=$dataMap['note'];if(_0x21fc87[_0x500ee2(0x17a)](/<GODRAY>/i))_0x1233c1=!![];else _0x21fc87[_0x500ee2(0x17a)](/<NO GODRAY>/i)&&(_0x1233c1=![]);_0x21fc87[_0x500ee2(0x17a)](/<GODRAY SPEED: (.*)>/i)&&(_0x362f1c=Number(RegExp['$1'])||0x0),_0x21fc87[_0x500ee2(0x17a)](/<GODRAY GAIN: (.*)>/i)&&(_0x496bfe=Number(RegExp['$1'])||0x0),_0x21fc87[_0x500ee2(0x17a)](/<GODRAY LACUNARITY: (.*)>/i)&&(_0x32bc63=Number(RegExp['$1'])||0x0),_0x21fc87['match'](/<GODRAY ANGLE: (.*)>/i)&&(_0x42cb48=Number(RegExp['$1'])||0x0),_0x21fc87[_0x500ee2(0x17a)](/<GODRAY (?:HORZ|HORIZONTAL) SPEED: (.*) TO (.*)>/i)&&(this['_brightEffectsGodrayHorzSpeed']=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x500ee2(0x1b8)]=undefined),_0x21fc87[_0x500ee2(0x17a)](/<GODRAY (?:VERT|VERTICAL) SPEED: (.*) TO (.*)>/i)&&(this[_0x500ee2(0x1a5)]=undefined,this[_0x500ee2(0x1b8)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x21fc87[_0x500ee2(0x17a)](/<GODRAY (?:HORZ|HORIZONTAL) GAIN: (.*) TO (.*)>/i)&&(this[_0x500ee2(0x17e)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this['_brightEffectsGodrayVertGain']=undefined),_0x21fc87['match'](/<GODRAY (?:VERT|VERTICAL) GAIN: (.*) TO (.*)>/i)&&(this['_brightEffectsGodrayHorzGain']=undefined,this[_0x500ee2(0x1ca)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x21fc87['match'](/<GODRAY (?:HORZ|HORIZONTAL) LACUNARITY: (.*) TO (.*)>/i)&&(this['_brightEffectsGodrayHorzLacunarity']=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x500ee2(0x176)]=undefined),_0x21fc87['match'](/<GODRAY (?:VERT|VERTICAL) LACUNARITY: (.*) TO (.*)>/i)&&(this['_brightEffectsGodrayHorzLacunarity']=undefined,this[_0x500ee2(0x176)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x21fc87[_0x500ee2(0x17a)](/<GODRAY (?:HORZ|HORIZONTAL) ANGLE: (.*) TO (.*)>/i)&&(this[_0x500ee2(0x17d)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this['_brightEffectsGodrayVertAngle']=undefined),_0x21fc87[_0x500ee2(0x17a)](/<GODRAY (?:VERT|VERTICAL) ANGLE: (.*) TO (.*)>/i)&&(this['_brightEffectsGodrayHorzAngle']=undefined,this[_0x500ee2(0x161)]=[Number(RegExp['$1']),Number(RegExp['$2'])]);}$gameScreen['setBrightEffectsGodraySettings'](_0x1233c1,_0x362f1c,_0x496bfe,_0x32bc63,_0x42cb48,0x0);},Game_Map[_0x2649d9(0x1b6)][_0x2649d9(0x197)]=function(){var _0x4ce369=_0x2649d9;const _0x264d02=VisuMZ[_0x4ce369(0x1aa)][_0x4ce369(0x159)][_0x4ce369(0x1e4)];var _0x39a0f0=_0x264d02[_0x4ce369(0x1be)],_0x229c55=_0x264d02[_0x4ce369(0x1cf)],_0x22289e=_0x264d02[_0x4ce369(0x16e)];this[_0x4ce369(0x1ab)]=undefined,this[_0x4ce369(0x196)]=undefined,this[_0x4ce369(0x17c)]=undefined,this['_brightEffectsColorAdjustVertContrast']=undefined,this[_0x4ce369(0x199)]=undefined,this[_0x4ce369(0x163)]=undefined;if($dataMap){var _0x5f45b6=$dataMap['note'];if(_0x5f45b6[_0x4ce369(0x17a)](/<COLOR ADJUST BRIGHTNESS: (.*)>/i))var _0x39a0f0=Number(RegExp['$1'])||0x0;if(_0x5f45b6[_0x4ce369(0x17a)](/<COLOR ADJUST CONTRAST: (.*)>/i))var _0x229c55=Number(RegExp['$1'])||0x0;if(_0x5f45b6[_0x4ce369(0x17a)](/<COLOR ADJUST SATURATE: (.*)>/i))var _0x22289e=Number(RegExp['$1'])||0x0;_0x5f45b6[_0x4ce369(0x17a)](/<COLOR ADJUST (?:HORZ|HORIZONTAL) BRIGHTNESS: (.*) TO (.*)>/i)&&(this[_0x4ce369(0x1ab)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x4ce369(0x196)]=undefined),_0x5f45b6['match'](/<COLOR ADJUST (?:VERT|VERTICAL) BRIGHTNESS: (.*) TO (.*)>/i)&&(this[_0x4ce369(0x1ab)]=undefined,this[_0x4ce369(0x196)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x5f45b6[_0x4ce369(0x17a)](/<COLOR ADJUST (?:HORZ|HORIZONTAL) CONTRAST: (.*) TO (.*)>/i)&&(this[_0x4ce369(0x17c)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x4ce369(0x1b0)]=undefined),_0x5f45b6['match'](/<COLOR ADJUST (?:VERT|VERTICAL) CONTRAST: (.*) TO (.*)>/i)&&(this[_0x4ce369(0x17c)]=undefined,this[_0x4ce369(0x1b0)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x5f45b6[_0x4ce369(0x17a)](/<COLOR ADJUST (?:HORZ|HORIZONTAL) SATURATE: (.*) TO (.*)>/i)&&(this[_0x4ce369(0x199)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x4ce369(0x163)]=undefined),_0x5f45b6[_0x4ce369(0x17a)](/<COLOR ADJUST (?:VERT|VERTICAL) SATURATE: (.*) TO (.*)>/i)&&(this['_brightEffectsColorAdjustHorzSaturate']=undefined,this['_brightEffectsColorAdjustVertSaturate']=[Number(RegExp['$1']),Number(RegExp['$2'])]);}$gameScreen['setBrightEffectsColorAdjustSettings'](_0x39a0f0,_0x229c55,_0x22289e,0x0);},VisuMZ[_0x2649d9(0x1aa)][_0x2649d9(0x171)]=Game_CharacterBase['prototype'][_0x2649d9(0x19a)],Game_CharacterBase[_0x2649d9(0x1b6)]['locate']=function(_0x335d40,_0xcefa11){var _0x384664=_0x2649d9;VisuMZ[_0x384664(0x1aa)][_0x384664(0x171)]['call'](this,_0x335d40,_0xcefa11),this===$gamePlayer&&this[_0x384664(0x16c)]();},VisuMZ[_0x2649d9(0x1aa)][_0x2649d9(0x1d4)]=Game_Player[_0x2649d9(0x1b6)][_0x2649d9(0x191)],Game_Player['prototype'][_0x2649d9(0x191)]=function(_0x20bfb4){var _0x7a4bda=_0x2649d9;VisuMZ['BrightEffects'][_0x7a4bda(0x1d4)]['call'](this,_0x20bfb4),this[_0x7a4bda(0x16c)]();},Game_Player['prototype'][_0x2649d9(0x16c)]=function(){var _0x2471a3=_0x2649d9;if(ConfigManager['specialEffects']===![])return;this[_0x2471a3(0x150)](),this[_0x2471a3(0x1d8)](),this[_0x2471a3(0x1b9)]();},Game_Player[_0x2649d9(0x1b6)][_0x2649d9(0x150)]=function(){var _0x21e1be=_0x2649d9,_0x537c47=$gameScreen[_0x21e1be(0x155)](),_0x2a4536=_0x537c47[_0x21e1be(0x15c)],_0x24db19=_0x537c47[_0x21e1be(0x195)],_0x5550e2=_0x537c47[_0x21e1be(0x1bd)];if($gameMap[_0x21e1be(0x186)]!==undefined)var _0x187221=$gameMap[_0x21e1be(0x186)][0x0],_0xaed136=$gameMap['_brightEffectsBloomHorzScale'][0x1]-_0x187221,_0x496eca=$gamePlayer[_0x21e1be(0x1d3)]/$gameMap[_0x21e1be(0x16f)](),_0x2a4536=_0x187221+_0xaed136*_0x496eca;else{if($gameMap['_brightEffectsBloomVertScale']!==undefined)var _0x187221=$gameMap['_brightEffectsBloomVertScale'][0x0],_0xaed136=$gameMap['_brightEffectsBloomVertScale'][0x1]-_0x187221,_0x496eca=$gamePlayer['_realY']/$gameMap[_0x21e1be(0x1c3)](),_0x2a4536=_0x187221+_0xaed136*_0x496eca;}if($gameMap['_brightEffectsBloomHorzBrightness']!==undefined)var _0x187221=$gameMap[_0x21e1be(0x1d0)][0x0],_0xaed136=$gameMap[_0x21e1be(0x1d0)][0x1]-_0x187221,_0x496eca=$gamePlayer[_0x21e1be(0x1d3)]/$gameMap[_0x21e1be(0x16f)](),_0x24db19=_0x187221+_0xaed136*_0x496eca;else{if($gameMap['_brightEffectsBloomVertBrightness']!==undefined)var _0x187221=$gameMap[_0x21e1be(0x15a)][0x0],_0xaed136=$gameMap[_0x21e1be(0x15a)][0x1]-_0x187221,_0x496eca=$gamePlayer[_0x21e1be(0x1a8)]/$gameMap['height'](),_0x24db19=_0x187221+_0xaed136*_0x496eca;}if($gameMap[_0x21e1be(0x1bb)]!==undefined)var _0x187221=$gameMap[_0x21e1be(0x1bb)][0x0],_0xaed136=$gameMap['_brightEffectsBloomHorzThreshold'][0x1]-_0x187221,_0x496eca=$gamePlayer[_0x21e1be(0x1d3)]/$gameMap[_0x21e1be(0x16f)](),_0x5550e2=_0x187221+_0xaed136*_0x496eca;else{if($gameMap[_0x21e1be(0x1d5)]!==undefined)var _0x187221=$gameMap[_0x21e1be(0x1d5)][0x0],_0xaed136=$gameMap[_0x21e1be(0x1d5)][0x1]-_0x187221,_0x496eca=$gamePlayer[_0x21e1be(0x1a8)]/$gameMap[_0x21e1be(0x1c3)](),_0x5550e2=_0x187221+_0xaed136*_0x496eca;}$gameScreen[_0x21e1be(0x156)](_0x2a4536,_0x24db19,_0x5550e2,_0x537c47['duration']);},Game_Player[_0x2649d9(0x1b6)][_0x2649d9(0x1d8)]=function(){var _0x304dc2=_0x2649d9,_0xc25fb7=$gameScreen[_0x304dc2(0x18f)](),_0x14417d=_0xc25fb7[_0x304dc2(0x184)],_0x39618b=_0xc25fb7['speed'],_0x44fc94=_0xc25fb7['gain'],_0x45841e=_0xc25fb7[_0x304dc2(0x1b7)],_0x407352=_0xc25fb7[_0x304dc2(0x15f)];if($gameMap[_0x304dc2(0x1a5)]!==undefined)var _0x50d5a5=$gameMap[_0x304dc2(0x1a5)][0x0],_0x19bf03=$gameMap[_0x304dc2(0x1a5)][0x1]-_0x50d5a5,_0x5ad692=$gamePlayer[_0x304dc2(0x1d3)]/$gameMap[_0x304dc2(0x16f)](),_0x39618b=_0x50d5a5+_0x19bf03*_0x5ad692;else{if($gameMap[_0x304dc2(0x1cc)]!==undefined)var _0x50d5a5=$gameMap[_0x304dc2(0x1b8)][0x0],_0x19bf03=$gameMap[_0x304dc2(0x1b8)][0x1]-_0x50d5a5,_0x5ad692=$gamePlayer['_realY']/$gameMap[_0x304dc2(0x1c3)](),_0x39618b=_0x50d5a5+_0x19bf03*_0x5ad692;}if($gameMap[_0x304dc2(0x17e)]!==undefined)var _0x50d5a5=$gameMap[_0x304dc2(0x17e)][0x0],_0x19bf03=$gameMap[_0x304dc2(0x17e)][0x1]-_0x50d5a5,_0x5ad692=$gamePlayer[_0x304dc2(0x1d3)]/$gameMap[_0x304dc2(0x16f)](),_0x44fc94=_0x50d5a5+_0x19bf03*_0x5ad692;else{if($gameMap[_0x304dc2(0x1ca)]!==undefined)var _0x50d5a5=$gameMap[_0x304dc2(0x1ca)][0x0],_0x19bf03=$gameMap[_0x304dc2(0x1ca)][0x1]-_0x50d5a5,_0x5ad692=$gamePlayer['_realY']/$gameMap['height'](),_0x44fc94=_0x50d5a5+_0x19bf03*_0x5ad692;}if($gameMap[_0x304dc2(0x1b2)]!==undefined)var _0x50d5a5=$gameMap[_0x304dc2(0x1b2)][0x0],_0x19bf03=$gameMap[_0x304dc2(0x1b2)][0x1]-_0x50d5a5,_0x5ad692=$gamePlayer['_realX']/$gameMap['width'](),_0x45841e=_0x50d5a5+_0x19bf03*_0x5ad692;else{if($gameMap[_0x304dc2(0x176)]!==undefined)var _0x50d5a5=$gameMap[_0x304dc2(0x176)][0x0],_0x19bf03=$gameMap[_0x304dc2(0x176)][0x1]-_0x50d5a5,_0x5ad692=$gamePlayer[_0x304dc2(0x1a8)]/$gameMap[_0x304dc2(0x1c3)](),_0x45841e=_0x50d5a5+_0x19bf03*_0x5ad692;}if($gameMap[_0x304dc2(0x17d)]!==undefined)var _0x50d5a5=$gameMap[_0x304dc2(0x17d)][0x0],_0x19bf03=$gameMap[_0x304dc2(0x17d)][0x1]-_0x50d5a5,_0x5ad692=$gamePlayer[_0x304dc2(0x1d3)]/$gameMap[_0x304dc2(0x16f)](),_0x407352=_0x50d5a5+_0x19bf03*_0x5ad692;else{if($gameMap[_0x304dc2(0x161)]!==undefined)var _0x50d5a5=$gameMap[_0x304dc2(0x161)][0x0],_0x19bf03=$gameMap['_brightEffectsGodrayVertAngle'][0x1]-_0x50d5a5,_0x5ad692=$gamePlayer[_0x304dc2(0x1a8)]/$gameMap['height'](),_0x407352=_0x50d5a5+_0x19bf03*_0x5ad692;}$gameScreen[_0x304dc2(0x1af)](_0x14417d,_0x39618b,_0x44fc94,_0x45841e,_0x407352,_0xc25fb7[_0x304dc2(0x1a1)]);},Game_Player['prototype'][_0x2649d9(0x1b9)]=function(){var _0x4009f5=_0x2649d9,_0x39b68f=$gameScreen['getBrightEffectsColorAdjustSettings'](),_0x29eb83=_0x39b68f['brightness'],_0x462917=_0x39b68f[_0x4009f5(0x1a7)],_0xaf7037=_0x39b68f[_0x4009f5(0x174)];if($gameMap[_0x4009f5(0x1ab)]!==undefined)var _0x5d0f90=$gameMap[_0x4009f5(0x1ab)][0x0],_0x165c51=$gameMap[_0x4009f5(0x1ab)][0x1]-_0x5d0f90,_0xa36251=$gamePlayer[_0x4009f5(0x1d3)]/$gameMap[_0x4009f5(0x16f)](),_0x29eb83=_0x5d0f90+_0x165c51*_0xa36251;else{if($gameMap[_0x4009f5(0x196)]!==undefined)var _0x5d0f90=$gameMap[_0x4009f5(0x196)][0x0],_0x165c51=$gameMap[_0x4009f5(0x196)][0x1]-_0x5d0f90,_0xa36251=$gamePlayer[_0x4009f5(0x1a8)]/$gameMap[_0x4009f5(0x1c3)](),_0x29eb83=_0x5d0f90+_0x165c51*_0xa36251;}if($gameMap[_0x4009f5(0x17c)]!==undefined)var _0x5d0f90=$gameMap[_0x4009f5(0x17c)][0x0],_0x165c51=$gameMap[_0x4009f5(0x17c)][0x1]-_0x5d0f90,_0xa36251=$gamePlayer[_0x4009f5(0x1d3)]/$gameMap[_0x4009f5(0x16f)](),_0x462917=_0x5d0f90+_0x165c51*_0xa36251;else{if($gameMap[_0x4009f5(0x1b0)]!==undefined)var _0x5d0f90=$gameMap['_brightEffectsColorAdjustVertContrast'][0x0],_0x165c51=$gameMap[_0x4009f5(0x1b0)][0x1]-_0x5d0f90,_0xa36251=$gamePlayer[_0x4009f5(0x1a8)]/$gameMap['height'](),_0x462917=_0x5d0f90+_0x165c51*_0xa36251;}if($gameMap['_brightEffectsColorAdjustHorzSaturate']!==undefined)var _0x5d0f90=$gameMap[_0x4009f5(0x199)][0x0],_0x165c51=$gameMap[_0x4009f5(0x199)][0x1]-_0x5d0f90,_0xa36251=$gamePlayer[_0x4009f5(0x1d3)]/$gameMap[_0x4009f5(0x16f)](),_0xaf7037=_0x5d0f90+_0x165c51*_0xa36251;else{if($gameMap['_brightEffectsColorAdjustVertSaturate']!==undefined)var _0x5d0f90=$gameMap[_0x4009f5(0x163)][0x0],_0x165c51=$gameMap[_0x4009f5(0x163)][0x1]-_0x5d0f90,_0xa36251=$gamePlayer[_0x4009f5(0x1a8)]/$gameMap[_0x4009f5(0x1c3)](),_0xaf7037=_0x5d0f90+_0x165c51*_0xa36251;}$gameScreen[_0x4009f5(0x1dd)](_0x29eb83,_0x462917,_0xaf7037,_0x39b68f['duration']);},VisuMZ['BrightEffects'][_0x2649d9(0x182)]=Spriteset_Base[_0x2649d9(0x1b6)]['createOverallFilters'],Spriteset_Base[_0x2649d9(0x1b6)][_0x2649d9(0x1e2)]=function(){var _0x4c566a=_0x2649d9;VisuMZ['BrightEffects'][_0x4c566a(0x182)][_0x4c566a(0x18d)](this),this[_0x4c566a(0x1c4)]();},Spriteset_Base[_0x2649d9(0x1b6)][_0x2649d9(0x1c4)]=function(){var _0x532950=_0x2649d9;if(ConfigManager[_0x532950(0x1e1)]===![])return;this[_0x532950(0x19f)]=this[_0x532950(0x19f)]||[],this[_0x532950(0x1d2)](),this[_0x532950(0x178)](),this[_0x532950(0x1c8)](),this['updateBrightEffectsFilters']();},Spriteset_Base[_0x2649d9(0x1b6)][_0x2649d9(0x1d2)]=function(){var _0x10e806=_0x2649d9;this[_0x10e806(0x1c1)]=new PIXI['filters'][(_0x10e806(0x19c))](),this[_0x10e806(0x19f)][_0x10e806(0x19d)](this[_0x10e806(0x1c1)]);},Spriteset_Base[_0x2649d9(0x1b6)][_0x2649d9(0x178)]=function(){var _0x59e8b8=_0x2649d9;this['_BrightEffectsGodrayFilter']=new PIXI[(_0x59e8b8(0x19f))][(_0x59e8b8(0x181))](),this[_0x59e8b8(0x187)][_0x59e8b8(0x1df)]=![],this[_0x59e8b8(0x19f)][_0x59e8b8(0x19d)](this[_0x59e8b8(0x187)]);},Spriteset_Base['prototype'][_0x2649d9(0x1c8)]=function(){var _0x186548=_0x2649d9;this[_0x186548(0x1cd)]=new PIXI[(_0x186548(0x19f))]['ColorMatrixFilter'](),this[_0x186548(0x19f)][_0x186548(0x19d)](this[_0x186548(0x1cd)]);},VisuMZ[_0x2649d9(0x1aa)]['Spriteset_Base_update']=Spriteset_Base['prototype'][_0x2649d9(0x191)],Spriteset_Base['prototype']['update']=function(){var _0x2035a3=_0x2649d9;VisuMZ[_0x2035a3(0x1aa)][_0x2035a3(0x1ad)]['call'](this),this[_0x2035a3(0x158)]();},Spriteset_Base[_0x2649d9(0x1b6)][_0x2649d9(0x158)]=function(){var _0x2d98fa=_0x2649d9;this[_0x2d98fa(0x1b5)](),this[_0x2d98fa(0x168)](),this[_0x2d98fa(0x193)]();},Spriteset_Base[_0x2649d9(0x1b6)][_0x2649d9(0x1b5)]=function(){var _0x4b9bbb=_0x2649d9;if(!!this[_0x4b9bbb(0x1c1)]){var _0x323aa3=$gameScreen['getBrightEffectsAdvBloomSettings'](),_0x3447dc=_0x323aa3['duration'];_0x3447dc<=0x0?(this[_0x4b9bbb(0x1c1)][_0x4b9bbb(0x15c)]=_0x323aa3[_0x4b9bbb(0x15c)],this['_BrightEffectsAdvBloomFilter'][_0x4b9bbb(0x195)]=_0x323aa3['brightness'],this[_0x4b9bbb(0x1c1)][_0x4b9bbb(0x1bd)]=_0x323aa3[_0x4b9bbb(0x1bd)]):(_0x323aa3[_0x4b9bbb(0x1a1)]--,this[_0x4b9bbb(0x1c1)]['bloomScale']=(this[_0x4b9bbb(0x1c1)][_0x4b9bbb(0x15c)]*(_0x3447dc-0x1)+_0x323aa3['bloomScale'])/_0x3447dc,this[_0x4b9bbb(0x1c1)][_0x4b9bbb(0x195)]=(this['_BrightEffectsAdvBloomFilter'][_0x4b9bbb(0x195)]*(_0x3447dc-0x1)+_0x323aa3[_0x4b9bbb(0x195)])/_0x3447dc,this[_0x4b9bbb(0x1c1)]['threshold']=(this[_0x4b9bbb(0x1c1)][_0x4b9bbb(0x1bd)]*(_0x3447dc-0x1)+_0x323aa3[_0x4b9bbb(0x1bd)])/_0x3447dc);}},Spriteset_Base['prototype']['updateBrightEffectsGodrayFilter']=function(){var _0x4f17a6=_0x2649d9;if(!!this[_0x4f17a6(0x187)]){var _0x461cea=$gameScreen[_0x4f17a6(0x18f)](),_0x1c09bc=_0x461cea[_0x4f17a6(0x1a1)];_0x1c09bc<=0x0?(this[_0x4f17a6(0x187)][_0x4f17a6(0x1e3)]=_0x461cea[_0x4f17a6(0x1e3)],this[_0x4f17a6(0x187)][_0x4f17a6(0x167)]=_0x461cea['gain'],this[_0x4f17a6(0x187)][_0x4f17a6(0x1b7)]=_0x461cea[_0x4f17a6(0x1b7)],this[_0x4f17a6(0x187)][_0x4f17a6(0x15f)]=_0x461cea[_0x4f17a6(0x15f)]):(_0x461cea[_0x4f17a6(0x1a1)]--,this[_0x4f17a6(0x187)][_0x4f17a6(0x1e3)]=(this['_BrightEffectsGodrayFilter'][_0x4f17a6(0x1e3)]*(_0x1c09bc-0x1)+_0x461cea[_0x4f17a6(0x1e3)])/_0x1c09bc,this['_BrightEffectsGodrayFilter']['gain']=(this[_0x4f17a6(0x187)]['gain']*(_0x1c09bc-0x1)+_0x461cea[_0x4f17a6(0x167)])/_0x1c09bc,this[_0x4f17a6(0x187)][_0x4f17a6(0x1b7)]=(this[_0x4f17a6(0x187)][_0x4f17a6(0x1b7)]*(_0x1c09bc-0x1)+_0x461cea['lacunarity'])/_0x1c09bc,this[_0x4f17a6(0x187)][_0x4f17a6(0x15f)]=(this[_0x4f17a6(0x187)][_0x4f17a6(0x15f)]*(_0x1c09bc-0x1)+_0x461cea[_0x4f17a6(0x15f)])/_0x1c09bc),this['_BrightEffectsGodrayFilter']['time']+=this[_0x4f17a6(0x187)][_0x4f17a6(0x1e3)],this['_BrightEffectsGodrayFilter'][_0x4f17a6(0x1df)]=_0x461cea['visible'];}},Spriteset_Base[_0x2649d9(0x1b6)][_0x2649d9(0x193)]=function(){var _0x4ff2f8=_0x2649d9;if(!!this[_0x4ff2f8(0x1cd)]){var _0x2dfb6f=$gameScreen[_0x4ff2f8(0x1de)](),_0x2ff324=_0x2dfb6f[_0x4ff2f8(0x1a1)];_0x2ff324<=0x0?(this['_BrightEffectsColorAdjustFilter'][_0x4ff2f8(0x1c9)]=_0x2dfb6f[_0x4ff2f8(0x195)],this[_0x4ff2f8(0x1cd)][_0x4ff2f8(0x16b)]=_0x2dfb6f[_0x4ff2f8(0x1a7)],this[_0x4ff2f8(0x1cd)][_0x4ff2f8(0x19b)]=_0x2dfb6f[_0x4ff2f8(0x174)]):(_0x2dfb6f[_0x4ff2f8(0x1a1)]--,this[_0x4ff2f8(0x1cd)][_0x4ff2f8(0x1c9)]=(this[_0x4ff2f8(0x1cd)][_0x4ff2f8(0x1c9)]*(_0x2ff324-0x1)+_0x2dfb6f[_0x4ff2f8(0x195)])/_0x2ff324,this[_0x4ff2f8(0x1cd)][_0x4ff2f8(0x16b)]=(this[_0x4ff2f8(0x1cd)][_0x4ff2f8(0x16b)]*(_0x2ff324-0x1)+_0x2dfb6f[_0x4ff2f8(0x1a7)])/_0x2ff324,this[_0x4ff2f8(0x1cd)][_0x4ff2f8(0x19b)]=(this[_0x4ff2f8(0x1cd)]['currentSaturate']*(_0x2ff324-0x1)+_0x2dfb6f[_0x4ff2f8(0x174)])/_0x2ff324),this[_0x4ff2f8(0x1cd)][_0x4ff2f8(0x195)](this[_0x4ff2f8(0x1cd)]['currentBrightness']),this[_0x4ff2f8(0x1cd)][_0x4ff2f8(0x1a7)](this['_BrightEffectsColorAdjustFilter']['currentContrast'],!![]),this[_0x4ff2f8(0x1cd)]['saturate'](this[_0x4ff2f8(0x1cd)][_0x4ff2f8(0x19b)],!![]);}};