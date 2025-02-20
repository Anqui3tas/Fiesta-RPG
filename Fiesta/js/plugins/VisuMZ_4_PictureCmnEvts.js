//=============================================================================
// VisuStella MZ - Picture Common Events
// VisuMZ_4_PictureCommonEvents.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_PictureCommonEvents = true;

var VisuMZ = VisuMZ || {};
VisuMZ.PictureCommonEvents = VisuMZ.PictureCommonEvents || {};
VisuMZ.PictureCommonEvents.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.03] [PictureCommonEvents]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Picture_Common_Events_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * With RPG Maker MZ having better touch support, it's important that almost
 * everything can be interacted with such as pictures. Pictures on the map
 * screen can have a Common Event bound to them, which will launch once clicked
 * (assuming no other events are running). These pictures can also change the
 * Common Events bound to them and/or clear them during the game.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Functionality to bind Common Events to pictures.
 * * Change which Common Events run during a playthrough.
 * * Clear Common Events from pictures to remove any bindings.
 * * Clicked pictures can require clicking on only opaque pixels and not
 *   fully transparent ones.
 * * Include hover effects like blend mode changes and tone shifts to help
 *   players understand when a picture has been selected.
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
 * Compatibility Issues
 * ============================================================================
 *
 * This plugin will most likely have compatibility issues with anything that
 * involves clicking pictures. If you are using another plugin that does
 * something with clicking pictures on the map screen, the likelihood of
 * clashing can occur if these plugins utilize the same pictures and we will
 * not be held accountable for that as it is something within your power to
 * change by simply picking different pictures.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * In the Plugin Parameters, you will see a list of all the pictures that you
 * can bind to a Common Event. If that number is something other than 0, then
 * the number associated with it will be the Common Event that will run. If you
 * assign it to a Common Event ID that does not exist, you will get an error so
 * please be wary of that.
 * 
 * Also be warned that the player CANNOT press Picture Common Events whenever
 * an event is running (with the exception of Parallels). This is NOT a bug.
 * 
 * This is because if an event is running under the main event interpreter and
 * a Picture Common Event were to be pressed, it would interrupt the flow of
 * the event. This would result in cutscenes to be potentially bugged,
 * currently running events to also be bugged, etc.
 * 
 * As such, the ability to click and activate Picture Common Events during an
 * event (with the exception of Parallels) are disabled to prevent potential
 * problems with the game dev cycle.
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
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Change Picture Common Event
 * - Change the Common Event bound to specific picture(s).
 *
 *   Picture ID(s):
 *   - Select which Picture ID(s) to change.
 *
 *   Common Event ID:
 *   - Change the Common Event bound to specific picture(s).
 * 
 *   Custom
 * 
 *     Opaque Only?
 *     - Ignore clicks on transparent pixels and accept only opaque pixels for
 *       this specific picture.
 * 
 *       Error Margin:
 *       - Error margin when clicking for opaque pixels.
 *       - This value determines the radius.
 * 
 *     Change Tone on Hover?
 *     - Change the tone of the picture on hover?
 * 
 *       Hover Tone:
 *       - Tone settings upon hovering.
 *       - Format: [Red, Green, Blue, Gray]
 * 
 *     Blend Mode on Hover:
 *     - The blend mode used when this picture is hovered over.
 *
 * ---
 *
 * System: Clear All Picture Common Events
 * - Clears all Common Event bound to specific picture(s).
 *
 * ---
 *
 * System: Clear Picture Common Event
 * - Clears any Common Event bound to specific picture(s).
 *
 *   Picture ID(s):
 *   - Select which Picture ID(s) to clear.
 *
 * ---
 *
 * System: Erase & Clear All Pictures
 * - Erases all pictures on the screen and clears their Common Events.
 * 
 * ---
 *
 * System: Erase & Clear Picture
 * - Erases and clears any Common Events attached to specific picture(s).
 *
 *   Picture ID(s):
 *   - Select which Picture ID(s) to erase and clear.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Global Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you to adjust which Pictures will trigger
 * which Common Events upon being clicked.
 *
 * ---
 * 
 * General
 * 
 *   Opaque Only?
 *   - Ignore clicks on transparent pixels and accept only opaque pixels for
 *     the Plugin Parameter bindings.
 * 
 *     Error Margin:
 *     - Error margin when clicking for opaque pixels.
 *     - This value determines the radius.
 * 
 *   Change Tone on Hover?
 *   - Change the tone of the picture on hover?
 * 
 *     Hover Tone:
 *     - Tone settings upon hovering.
 *     - Format: [Red, Green, Blue, Gray]
 * 
 *   Blend Mode on Hover:
 *   - The blend mode used when this picture is hovered over.
 * 
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Picture Settings
 * ============================================================================
 *
 * Each of the 100 picture slots are listed in the Plugin Parameters and can
 * be assigned a default setting that is already set up at the start of the
 * game without needing to assign a Common Event to it by a Plugin Command.
 * 
 * You can still overwrite their settings through a Plugin Command.
 * 
 * ---
 *
 * Pictures #1 through #100
 * 
 *   Picture #1:
 *   through
 *   Picture #100:
 *   - Default Common Event settings to bind to this picture ID.
 *
 * ---
 * 
 * Picture Settings
 *
 *   Common Event ID:
 *   - The common event settings you wish to tie to this picture.
 * 
 *   Custom
 * 
 *     Opaque Only?
 *     - Ignore clicks on transparent pixels and accept only opaque pixels for
 *       this specific picture.
 * 
 *       Error Margin:
 *       - Error margin when clicking for opaque pixels.
 *       - This value determines the radius.
 * 
 *     Change Tone on Hover?
 *     - Change the tone of the picture on hover?
 * 
 *       Hover Tone:
 *       - Tone settings upon hovering.
 *       - Format: [Red, Green, Blue, Gray]
 * 
 *     Blend Mode on Hover:
 *     - The blend mode used when this picture is hovered over.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.03: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * 
 * Version 1.02: March 17, 2022
 * * Documentation Update!
 * ** Added to "Instructions" section by Arisu:
 * *** Also be warned that the player CANNOT press Picture Common Events
 *     whenever an event is running (with the exception of Parallels). This is
 *     NOT a bug.
 * *** This is because if an event is running under the main event interpreter
 *     and a Picture Common Event were to be pressed, it would interrupt the
 *     flow of the event. This would result in cutscenes to be potentially
 *     bugged, currently running events to also be bugged, etc.
 * *** As such, the ability to click and activate Picture Common Events during
 *     an event (with the exception of Parallels) are disabled to prevent
 *     potential problems with the game dev cycle.
 * 
 * Version 1.01: November 18, 2021
 * * Compatibility Update!
 * ** Should now work properly with VisuStella MZ Picture Choices.
 *    Update made by Olivia.
 *
 * Version 1.00: September 4, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangePictureCommonEvent
 * @text System: Change Picture Common Event
 * @desc Change the Common Event bound to specific picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc Select which Picture ID(s) to change.
 * @default ["1"]
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Change the Common Event bound to specific picture(s).
 * @default 0
 *
 * @arg Custom
 *
 * @arg UseGlobal:eval
 * @text Use Global?
 * @parent Custom
 * @type boolean
 * @on Use Global Settings
 * @off Use Custom Settings
 * @desc If this uses Global Settings, 
 * then ignore the options below.
 * @default true
 *
 * @arg OpaqueOnly:eval
 * @text Opaque Only?
 * @parent Custom
 * @type boolean
 * @on Opaque Only
 * @off Allow Transparency
 * @desc Ignore clicks on transparent pixels and accept only
 * opaque pixels for this specific picture.
 * @default true
 *
 * @arg OpaqueErrorMargin:num
 * @text Error Margin
 * @parent OpaqueOnly:eval
 * @type number
 * @min 0
 * @max 10
 * @desc Error margin when clicking for opaque pixels.
 * This value determines the radius.
 * @default 3
 *
 * @arg ChangeTone:eval
 * @text Change Tone on Hover?
 * @parent Custom
 * @type boolean
 * @on Change Tone
 * @off Don't Change
 * @desc Change the tone of the picture on hover?
 * @default true
 *
 * @arg HoverTone:eval
 * @text Hover Tone
 * @parent ChangeTone:eval
 * @desc Tone settings upon hovering.
 * Format: [Red, Green, Blue, Gray]
 * @default [128, 128, 128, 0]
 *
 * @arg BlendMode:num
 * @text Blend Mode on Hover
 * @parent Custom
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used when this picture is hovered over.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearAllPictureCommonEvents
 * @text System: Clear All Picture Common Events
 * @desc Clears all Common Event bound to specific picture(s).
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearPictureCommonEvent
 * @text System: Clear Picture Common Event
 * @desc Clears any Common Event bound to specific picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc Select which Picture ID(s) to clear.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EraseClearAllPictures
 * @text System: Erase & Clear All Pictures
 * @desc Erases all pictures on the screen and clears their Common Events.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EraseClearPicture
 * @text System: Erase & Clear Picture
 * @desc Erases and clears any Common Events attached to specific picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc Select which Picture ID(s) to erase and clear.
 * @default ["1"]
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
 * @param PictureCommonEvents
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param DefaultGlobal:struct
 * @text Default Global Settings
 * @type struct<DefaultGlobal>
 * @desc Default global settings that are used in general.
 * @default {"OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_1_to_10
 * @text #1 through #10
 * @parent Default
 *
 * @param Picture1:struct
 * @text Picture #1
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture2:struct
 * @text Picture #2
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture3:struct
 * @text Picture #3
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture4:struct
 * @text Picture #4
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture5:struct
 * @text Picture #5
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture6:struct
 * @text Picture #6
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture7:struct
 * @text Picture #7
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture8:struct
 * @text Picture #8
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture9:struct
 * @text Picture #9
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture10:struct
 * @text Picture #10
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_11_to_20
 * @text #11 through #20
 * @parent Default
 *
 * @param Picture11:struct
 * @text Picture #11
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture12:struct
 * @text Picture #12
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture13:struct
 * @text Picture #13
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture14:struct
 * @text Picture #14
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture15:struct
 * @text Picture #15
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture16:struct
 * @text Picture #16
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture17:struct
 * @text Picture #17
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture18:struct
 * @text Picture #18
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture19:struct
 * @text Picture #19
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture20:struct
 * @text Picture #20
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_21_to_30
 * @text #21 through #30
 * @parent Default
 *
 * @param Picture21:struct
 * @text Picture #21
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture22:struct
 * @text Picture #22
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture23:struct
 * @text Picture #23
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture24:struct
 * @text Picture #24
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture25:struct
 * @text Picture #25
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture26:struct
 * @text Picture #26
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture27:struct
 * @text Picture #27
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture28:struct
 * @text Picture #28
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture29:struct
 * @text Picture #29
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture30:struct
 * @text Picture #30
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_31_to_40
 * @text #31 through #40
 * @parent Default
 *
 * @param Picture31:struct
 * @text Picture #31
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture32:struct
 * @text Picture #32
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture33:struct
 * @text Picture #33
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture34:struct
 * @text Picture #34
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture35:struct
 * @text Picture #35
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture36:struct
 * @text Picture #36
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture37:struct
 * @text Picture #37
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture38:struct
 * @text Picture #38
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture39:struct
 * @text Picture #39
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture40:struct
 * @text Picture #40
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_41_to_50
 * @text #41 through #50
 * @parent Default
 *
 * @param Picture41:struct
 * @text Picture #41
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture42:struct
 * @text Picture #42
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture43:struct
 * @text Picture #43
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture44:struct
 * @text Picture #44
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture45:struct
 * @text Picture #45
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture46:struct
 * @text Picture #46
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture47:struct
 * @text Picture #47
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture48:struct
 * @text Picture #48
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture49:struct
 * @text Picture #49
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture50:struct
 * @text Picture #50
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_51_to_60
 * @text #51 through #60
 * @parent Default
 *
 * @param Picture51:struct
 * @text Picture #51
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture52:struct
 * @text Picture #52
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture53:struct
 * @text Picture #53
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture54:struct
 * @text Picture #54
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture55:struct
 * @text Picture #55
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture56:struct
 * @text Picture #56
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture57:struct
 * @text Picture #57
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture58:struct
 * @text Picture #58
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture59:struct
 * @text Picture #59
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture60:struct
 * @text Picture #60
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_61_to_70
 * @text #61 through #70
 * @parent Default
 *
 * @param Picture61:struct
 * @text Picture #61
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture62:struct
 * @text Picture #62
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture63:struct
 * @text Picture #63
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture64:struct
 * @text Picture #64
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture65:struct
 * @text Picture #65
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture66:struct
 * @text Picture #66
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture67:struct
 * @text Picture #67
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture68:struct
 * @text Picture #68
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture69:struct
 * @text Picture #69
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture70:struct
 * @text Picture #70
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_71_to_80
 * @text #71 through #80
 * @parent Default
 *
 * @param Picture71:struct
 * @text Picture #71
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture72:struct
 * @text Picture #72
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture73:struct
 * @text Picture #73
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture74:struct
 * @text Picture #74
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture75:struct
 * @text Picture #75
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture76:struct
 * @text Picture #76
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture77:struct
 * @text Picture #77
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture78:struct
 * @text Picture #78
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture79:struct
 * @text Picture #79
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture80:struct
 * @text Picture #80
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_81_to_90
 * @text #81 through #90
 * @parent Default
 *
 * @param Picture81:struct
 * @text Picture #81
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture82:struct
 * @text Picture #82
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture83:struct
 * @text Picture #83
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture84:struct
 * @text Picture #84
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture85:struct
 * @text Picture #85
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture86:struct
 * @text Picture #86
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture87:struct
 * @text Picture #87
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture88:struct
 * @text Picture #88
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture89:struct
 * @text Picture #89
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture90:struct
 * @text Picture #90
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_91_to_100
 * @text #91 through #100
 * @parent Default
 *
 * @param Picture91:struct
 * @text Picture #91
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture92:struct
 * @text Picture #92
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture93:struct
 * @text Picture #93
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture94:struct
 * @text Picture #94
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture95:struct
 * @text Picture #95
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture96:struct
 * @text Picture #96
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture97:struct
 * @text Picture #97
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture98:struct
 * @text Picture #98
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture99:struct
 * @text Picture #99
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc The common event settings you wish to tie to this picture.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture100:struct
 * @text Picture #100
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc The common event settings you wish to tie to this picture.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
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
 * Default Global Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~DefaultGlobal:
 *
 * @param OpaqueOnly:eval
 * @text Opaque Only?
 * @parent Global
 * @type boolean
 * @on Opaque Only
 * @off Allow Transparency
 * @desc Ignore clicks on transparent pixels and accept only
 * opaque pixels for the Plugin Parameter bindings.
 * @default true
 *
 * @param OpaqueErrorMargin:num
 * @text Error Margin
 * @parent OpaqueOnly:eval
 * @type number
 * @min 0
 * @max 10
 * @desc Error margin when clicking for opaque pixels.
 * This value determines the radius.
 * @default 3
 *
 * @param ChangeTone:eval
 * @text Change Tone on Hover?
 * @parent Global
 * @type boolean
 * @on Change Tone
 * @off Don't Change
 * @desc Change the tone of the picture on hover?
 * @default true
 *
 * @param HoverTone:eval
 * @text Hover Tone
 * @parent ChangeTone:eval
 * @desc Tone settings upon hovering.
 * Format: [Red, Green, Blue, Gray]
 * @default [128, 128, 128, 0]
 *
 * @param BlendMode:num
 * @text Blend Mode on Hover
 * @parent Global
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used when this picture is hovered over.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Picture:
 *
 * @param CommonEventID:num
 * @text Common Event ID
 * @parent NeededData
 * @type common_event
 * @desc The common event settings you wish to tie to this picture.
 * @default 0
 *
 * @param Custom
 *
 * @param UseGlobal:eval
 * @text Use Global?
 * @parent Custom
 * @type boolean
 * @on Use Global Settings
 * @off Use Custom Settings
 * @desc If this uses Global Settings, 
 * then ignore the options below.
 * @default true
 *
 * @param OpaqueOnly:eval
 * @text Opaque Only?
 * @parent Custom
 * @type boolean
 * @on Opaque Only
 * @off Allow Transparency
 * @desc Ignore clicks on transparent pixels and accept only
 * opaque pixels for this specific picture.
 * @default true
 *
 * @param OpaqueErrorMargin:num
 * @text Error Margin
 * @parent OpaqueOnly:eval
 * @type number
 * @min 0
 * @max 10
 * @desc Error margin when clicking for opaque pixels.
 * This value determines the radius.
 * @default 3
 *
 * @param ChangeTone:eval
 * @text Change Tone on Hover?
 * @parent Custom
 * @type boolean
 * @on Change Tone
 * @off Don't Change
 * @desc Change the tone of the picture on hover?
 * @default true
 *
 * @param HoverTone:eval
 * @text Hover Tone
 * @parent ChangeTone:eval
 * @desc Tone settings upon hovering.
 * Format: [Red, Green, Blue, Gray]
 * @default [128, 128, 128, 0]
 *
 * @param BlendMode:num
 * @text Blend Mode on Hover
 * @parent Custom
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used when this picture is hovered over.
 * @default 0
 *
 */
//=============================================================================

const _0x4e0714=_0x2f53;(function(_0x238c8b,_0x98fe4e){const _0x11a7df=_0x2f53,_0x4edda5=_0x238c8b();while(!![]){try{const _0x250dcf=parseInt(_0x11a7df(0x17f))/0x1*(parseInt(_0x11a7df(0x180))/0x2)+-parseInt(_0x11a7df(0x1ba))/0x3*(parseInt(_0x11a7df(0x1c4))/0x4)+-parseInt(_0x11a7df(0x1b6))/0x5*(-parseInt(_0x11a7df(0x1c3))/0x6)+parseInt(_0x11a7df(0x169))/0x7+parseInt(_0x11a7df(0x1ca))/0x8+parseInt(_0x11a7df(0x1cc))/0x9+-parseInt(_0x11a7df(0x18e))/0xa;if(_0x250dcf===_0x98fe4e)break;else _0x4edda5['push'](_0x4edda5['shift']());}catch(_0xd839cc){_0x4edda5['push'](_0x4edda5['shift']());}}}(_0x4bb0,0x58160));var label=_0x4e0714(0x168),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x22fbf1){const _0x5627a3=_0x4e0714;return _0x22fbf1[_0x5627a3(0x1c7)]&&_0x22fbf1[_0x5627a3(0x193)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x4e0714(0x16a)]||{},VisuMZ['ConvertParams']=function(_0x9804e4,_0x376928){const _0x546932=_0x4e0714;for(const _0x42b8c9 in _0x376928){if(_0x42b8c9[_0x546932(0x18f)](/(.*):(.*)/i)){const _0x27d14c=String(RegExp['$1']),_0x3b7b04=String(RegExp['$2'])[_0x546932(0x17b)]()[_0x546932(0x190)]();let _0x467f2a,_0x2f90c6,_0xe63445;switch(_0x3b7b04){case _0x546932(0x1c1):_0x467f2a=_0x376928[_0x42b8c9]!==''?Number(_0x376928[_0x42b8c9]):0x0;break;case'ARRAYNUM':_0x2f90c6=_0x376928[_0x42b8c9]!==''?JSON['parse'](_0x376928[_0x42b8c9]):[],_0x467f2a=_0x2f90c6['map'](_0x17276b=>Number(_0x17276b));break;case _0x546932(0x1c2):_0x467f2a=_0x376928[_0x42b8c9]!==''?eval(_0x376928[_0x42b8c9]):null;break;case _0x546932(0x1a1):_0x2f90c6=_0x376928[_0x42b8c9]!==''?JSON['parse'](_0x376928[_0x42b8c9]):[],_0x467f2a=_0x2f90c6[_0x546932(0x17c)](_0x44752d=>eval(_0x44752d));break;case _0x546932(0x16f):_0x467f2a=_0x376928[_0x42b8c9]!==''?JSON[_0x546932(0x177)](_0x376928[_0x42b8c9]):'';break;case _0x546932(0x1a2):_0x2f90c6=_0x376928[_0x42b8c9]!==''?JSON[_0x546932(0x177)](_0x376928[_0x42b8c9]):[],_0x467f2a=_0x2f90c6[_0x546932(0x17c)](_0x5d93fb=>JSON[_0x546932(0x177)](_0x5d93fb));break;case'FUNC':_0x467f2a=_0x376928[_0x42b8c9]!==''?new Function(JSON['parse'](_0x376928[_0x42b8c9])):new Function(_0x546932(0x1ad));break;case'ARRAYFUNC':_0x2f90c6=_0x376928[_0x42b8c9]!==''?JSON[_0x546932(0x177)](_0x376928[_0x42b8c9]):[],_0x467f2a=_0x2f90c6[_0x546932(0x17c)](_0x548b64=>new Function(JSON[_0x546932(0x177)](_0x548b64)));break;case _0x546932(0x1b9):_0x467f2a=_0x376928[_0x42b8c9]!==''?String(_0x376928[_0x42b8c9]):'';break;case'ARRAYSTR':_0x2f90c6=_0x376928[_0x42b8c9]!==''?JSON[_0x546932(0x177)](_0x376928[_0x42b8c9]):[],_0x467f2a=_0x2f90c6[_0x546932(0x17c)](_0x34a756=>String(_0x34a756));break;case _0x546932(0x170):_0xe63445=_0x376928[_0x42b8c9]!==''?JSON[_0x546932(0x177)](_0x376928[_0x42b8c9]):{},_0x467f2a=VisuMZ[_0x546932(0x19f)]({},_0xe63445);break;case _0x546932(0x1a6):_0x2f90c6=_0x376928[_0x42b8c9]!==''?JSON['parse'](_0x376928[_0x42b8c9]):[],_0x467f2a=_0x2f90c6['map'](_0x379f7f=>VisuMZ[_0x546932(0x19f)]({},JSON[_0x546932(0x177)](_0x379f7f)));break;default:continue;}_0x9804e4[_0x27d14c]=_0x467f2a;}}return _0x9804e4;},(_0x12f02c=>{const _0x5119bf=_0x4e0714,_0x1afa3a=_0x12f02c[_0x5119bf(0x1ae)];for(const _0x215f56 of dependencies){if(!Imported[_0x215f56]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x5119bf(0x1cb)](_0x1afa3a,_0x215f56)),SceneManager[_0x5119bf(0x1c9)]();break;}}const _0x51113d=_0x12f02c[_0x5119bf(0x193)];if(_0x51113d[_0x5119bf(0x18f)](/\[Version[ ](.*?)\]/i)){const _0x375de5=Number(RegExp['$1']);_0x375de5!==VisuMZ[label][_0x5119bf(0x181)]&&(alert(_0x5119bf(0x1a5)['format'](_0x1afa3a,_0x375de5)),SceneManager['exit']());}if(_0x51113d[_0x5119bf(0x18f)](/\[Tier[ ](\d+)\]/i)){const _0x4185f7=Number(RegExp['$1']);_0x4185f7<tier?(alert(_0x5119bf(0x162)[_0x5119bf(0x1cb)](_0x1afa3a,_0x4185f7,tier)),SceneManager[_0x5119bf(0x1c9)]()):tier=Math[_0x5119bf(0x161)](_0x4185f7,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x5119bf(0x16a)],_0x12f02c[_0x5119bf(0x1b4)]);})(pluginData),PluginManager[_0x4e0714(0x172)](pluginData[_0x4e0714(0x1ae)],_0x4e0714(0x17d),_0x7cc719=>{const _0x525e87=_0x4e0714;VisuMZ['ConvertParams'](_0x7cc719,_0x7cc719);const _0x3ed6a5=_0x7cc719['PictureIDs']||[0x1],_0x10cbcc={'CommonEventID':_0x7cc719[_0x525e87(0x182)],'UseGlobal':_0x7cc719[_0x525e87(0x189)],'OpaqueOnly':_0x7cc719[_0x525e87(0x176)],'OpaqueErrorMargin':_0x7cc719[_0x525e87(0x1b1)],'ChangeTone':_0x7cc719[_0x525e87(0x18a)],'HoverTone':_0x7cc719[_0x525e87(0x16e)],'BlendMode':_0x7cc719[_0x525e87(0x196)]};if(_0x10cbcc[_0x525e87(0x189)]){const _0xedb63=VisuMZ[_0x525e87(0x168)]['Settings']['DefaultGlobal'];_0x10cbcc[_0x525e87(0x176)]=_0xedb63[_0x525e87(0x176)],_0x10cbcc[_0x525e87(0x1b1)]=_0xedb63[_0x525e87(0x1b1)],_0x10cbcc[_0x525e87(0x18a)]=_0xedb63[_0x525e87(0x18a)],_0x10cbcc[_0x525e87(0x16e)]=_0xedb63[_0x525e87(0x16e)],_0x10cbcc[_0x525e87(0x196)]=_0xedb63[_0x525e87(0x196)];}for(const _0x43c7b7 of _0x3ed6a5){$gameSystem[_0x525e87(0x194)](_0x43c7b7,JsonEx['makeDeepCopy'](_0x10cbcc));}}),PluginManager[_0x4e0714(0x172)](pluginData[_0x4e0714(0x1ae)],_0x4e0714(0x164),_0x1379fe=>{const _0x372e4d=_0x4e0714;for(let _0x1372ae=0x1;_0x1372ae<=$gameScreen[_0x372e4d(0x1b2)]();_0x1372ae++){$gameSystem['clearPictureCommonEventSettings'](_0x1372ae);}}),PluginManager[_0x4e0714(0x172)](pluginData[_0x4e0714(0x1ae)],_0x4e0714(0x1be),_0x30bb87=>{const _0x50c74a=_0x4e0714;VisuMZ[_0x50c74a(0x19f)](_0x30bb87,_0x30bb87);const _0x474b58=_0x30bb87[_0x50c74a(0x1b0)];for(const _0x19c1ed of _0x474b58){$gameSystem[_0x50c74a(0x191)](_0x19c1ed);}}),PluginManager[_0x4e0714(0x172)](pluginData[_0x4e0714(0x1ae)],_0x4e0714(0x1b7),_0x31de1a=>{$gameSystem['_pictureCommonEvents']={};for(let _0x476d90=0x1;_0x476d90<=$gameScreen['maxPictures']();_0x476d90++){$gameScreen['erasePicture'](_0x476d90);}}),PluginManager[_0x4e0714(0x172)](pluginData[_0x4e0714(0x1ae)],_0x4e0714(0x167),_0x23aec6=>{const _0x1f89c4=_0x4e0714;VisuMZ[_0x1f89c4(0x19f)](_0x23aec6,_0x23aec6);const _0x52987e=_0x23aec6[_0x1f89c4(0x1b0)];for(const _0x31a70e of _0x52987e){$gameScreen[_0x1f89c4(0x160)](_0x31a70e),$gameSystem[_0x1f89c4(0x191)](_0x31a70e);}}),VisuMZ[_0x4e0714(0x168)]['Game_System_initialize']=Game_System['prototype'][_0x4e0714(0x197)],Game_System[_0x4e0714(0x186)][_0x4e0714(0x197)]=function(){const _0x5516ba=_0x4e0714;VisuMZ[_0x5516ba(0x168)][_0x5516ba(0x192)][_0x5516ba(0x1c0)](this),this[_0x5516ba(0x175)]();},Game_System[_0x4e0714(0x186)][_0x4e0714(0x175)]=function(){const _0x4c344c=_0x4e0714;this['_pictureCommonEvents']={};for(let _0x28e536=0x1;_0x28e536<=$gameScreen[_0x4c344c(0x1b2)]();_0x28e536++){this['createPictureCommonEventData'](_0x28e536);}},VisuMZ['PictureCommonEvents'][_0x4e0714(0x19d)]=function(){return{'CommonEventID':0x0,'UseGlobal':!![],'OpaqueOnly':!![],'OpaqueErrorMargin':0x3,'ChangeTone':!![],'HoverTone':[0x80,0x80,0x80,0x0],'BlendMode':0x0};},Game_System[_0x4e0714(0x186)][_0x4e0714(0x1b5)]=function(_0x1aafee){const _0x266e7a=_0x4e0714,_0x21025f=VisuMZ[_0x266e7a(0x168)][_0x266e7a(0x16a)],_0x3fc377=VisuMZ[_0x266e7a(0x168)][_0x266e7a(0x16a)][_0x266e7a(0x184)],_0x309313=_0x266e7a(0x1c6)[_0x266e7a(0x1cb)](_0x1aafee),_0x110112=_0x21025f[_0x309313]?JsonEx[_0x266e7a(0x1b8)](_0x21025f[_0x309313]):VisuMZ[_0x266e7a(0x168)][_0x266e7a(0x19d)]();this[_0x266e7a(0x1a8)][_0x1aafee]=_0x110112;if(!_0x110112[_0x266e7a(0x189)])return;_0x110112[_0x266e7a(0x176)]=_0x3fc377[_0x266e7a(0x176)],_0x110112[_0x266e7a(0x1b1)]=_0x3fc377[_0x266e7a(0x1b1)],_0x110112[_0x266e7a(0x18a)]=_0x3fc377[_0x266e7a(0x18a)],_0x110112['HoverTone']=_0x3fc377[_0x266e7a(0x16e)],_0x110112[_0x266e7a(0x196)]=_0x3fc377[_0x266e7a(0x196)];},Game_System[_0x4e0714(0x186)]['pictureCommonEventData']=function(_0x26d83c){const _0x1aaf04=_0x4e0714;return this[_0x1aaf04(0x1a8)]===undefined&&this[_0x1aaf04(0x175)](),this[_0x1aaf04(0x1a8)][_0x26d83c]===undefined&&this[_0x1aaf04(0x1b5)](_0x26d83c),this[_0x1aaf04(0x1a8)][_0x26d83c];},Game_System[_0x4e0714(0x186)][_0x4e0714(0x1ac)]=function(_0x8df63){const _0xd51524=_0x4e0714;if(this[_0xd51524(0x1a8)]===undefined)this[_0xd51524(0x175)]();return this[_0xd51524(0x1cd)](_0x8df63)[_0xd51524(0x182)];},Game_System['prototype']['clearPictureCommonEventSettings']=function(_0x7a5092){const _0x37256f=_0x4e0714;this[_0x37256f(0x1a8)][_0x7a5092]=VisuMZ['PictureCommonEvents']['TemplateSettings']();},Game_System[_0x4e0714(0x186)][_0x4e0714(0x194)]=function(_0x13c043,_0x3ed825){const _0xc79f34=_0x4e0714;if(this[_0xc79f34(0x1a8)]===undefined)this[_0xc79f34(0x175)]();this['_pictureCommonEvents'][_0x13c043]=_0x3ed825;},Game_System['prototype'][_0x4e0714(0x1aa)]=function(_0x4ab959){const _0x53f130=_0x4e0714;if(this['_pictureCommonEvents']===undefined)this[_0x53f130(0x175)]();return this[_0x53f130(0x1cd)](_0x4ab959)[_0x53f130(0x176)];},Game_System[_0x4e0714(0x186)][_0x4e0714(0x1d1)]=function(_0x23570a){const _0x20aa7b=_0x4e0714;if(this['_pictureCommonEvents']===undefined)this['initPictureCommonEvents']();return this[_0x20aa7b(0x1cd)](_0x23570a)[_0x20aa7b(0x1b1)];},Game_System['prototype'][_0x4e0714(0x17e)]=function(_0x4c5325){const _0x201481=_0x4e0714;if(this[_0x201481(0x1a8)]===undefined)this[_0x201481(0x175)]();return this[_0x201481(0x1cd)](_0x4c5325)[_0x201481(0x18a)];},Game_System[_0x4e0714(0x186)][_0x4e0714(0x187)]=function(_0x4c06f3){const _0x4c2bf6=_0x4e0714;if(this[_0x4c2bf6(0x1a8)]===undefined)this['initPictureCommonEvents']();return this[_0x4c2bf6(0x1cd)](_0x4c06f3)[_0x4c2bf6(0x16e)];},Game_System[_0x4e0714(0x186)][_0x4e0714(0x1a9)]=function(_0x3d6b01){const _0x54736f=_0x4e0714;if(this[_0x54736f(0x1a8)]===undefined)this[_0x54736f(0x175)]();return this[_0x54736f(0x1cd)](_0x3d6b01)[_0x54736f(0x196)];},VisuMZ[_0x4e0714(0x168)][_0x4e0714(0x1d0)]=Scene_Map[_0x4e0714(0x186)][_0x4e0714(0x18d)],Scene_Map[_0x4e0714(0x186)]['isAnyButtonPressed']=function(){const _0x21434=_0x4e0714;return VisuMZ['PictureCommonEvents'][_0x21434(0x1d0)][_0x21434(0x1c0)](this)||this['_spriteset'][_0x21434(0x19a)]();},Sprite_Picture['prototype'][_0x4e0714(0x178)]=function(){const _0x46ad86=_0x4e0714;if(Imported[_0x46ad86(0x16b)]&&this[_0x46ad86(0x179)]())return!![];if($gameMessage[_0x46ad86(0x195)]())return![];if($gameParty[_0x46ad86(0x1bd)]())return![];if(!this[_0x46ad86(0x16c)])return![];if(this[_0x46ad86(0x1b3)]<=0x0)return![];const _0x1349b4=SceneManager['_scene'];if(_0x1349b4&&_0x1349b4['constructor']===Scene_Map){if(!_0x1349b4[_0x46ad86(0x18b)]())return![];}return this[_0x46ad86(0x1a3)]()&&$gameSystem[_0x46ad86(0x1ac)](this[_0x46ad86(0x17a)])>0x0;},Sprite_Picture[_0x4e0714(0x186)][_0x4e0714(0x179)]=function(){const _0x412734=_0x4e0714;return this[_0x412734(0x1ab)]();},Sprite_Picture[_0x4e0714(0x186)]['checkCommonEventOpaqueOnly']=function(){const _0x363486=_0x4e0714;if(!$gameSystem[_0x363486(0x1aa)](this['_pictureId']))return!![];const _0xd38704=new Point(TouchInput['x'],TouchInput['y']),_0x1c8aba=this[_0x363486(0x173)][_0x363486(0x198)](_0xd38704);let _0xd09bc2=Math[_0x363486(0x19b)](_0x1c8aba['x']+this[_0x363486(0x1a0)]['x']+this[_0x363486(0x1cf)]['x']*this[_0x363486(0x1bb)][_0x363486(0x1c8)]),_0x334e4d=Math[_0x363486(0x19b)](_0x1c8aba['y']+this['_frame']['y']+this['anchor']['y']*this['bitmap']['height']);return this[_0x363486(0x1bc)](_0xd09bc2,_0x334e4d);},Sprite_Picture['prototype'][_0x4e0714(0x1bc)]=function(_0x1ef2f3,_0x54dc39){const _0x4e8846=_0x4e0714,_0x26b916=$gameSystem[_0x4e8846(0x1d1)](this[_0x4e8846(0x17a)]),_0x1961e9=new Rectangle(0x0,0x0,this[_0x4e8846(0x1bb)]['width'],this['bitmap']['height']);for(let _0x3a89b2=-_0x26b916;_0x3a89b2<=_0x26b916;_0x3a89b2++){for(let _0x2b3c69=-_0x26b916;_0x2b3c69<=_0x26b916;_0x2b3c69++){const _0x2c62e8=_0x1ef2f3+_0x3a89b2,_0x48ed0b=_0x54dc39+_0x2b3c69;if(!_0x1961e9[_0x4e8846(0x1af)](_0x2c62e8,_0x48ed0b))continue;const _0x4a9434=this[_0x4e8846(0x1bb)]['getAlphaPixel'](_0x2c62e8,_0x48ed0b);if(_0x4a9434>0x0)return!![];}}return![];},Sprite_Picture['prototype']['isBeingTouched']=function(){const _0x1e5fa2=_0x4e0714,_0x574060=Sprite_Clickable[_0x1e5fa2(0x186)][_0x1e5fa2(0x19e)][_0x1e5fa2(0x1c0)](this);return _0x574060&&this[_0x1e5fa2(0x166)]();},Sprite_Picture['prototype'][_0x4e0714(0x1bf)]=function(){const _0x530e1f=_0x4e0714;Sprite_Clickable[_0x530e1f(0x186)][_0x530e1f(0x1bf)][_0x530e1f(0x1c0)](this);if(!this[_0x530e1f(0x163)]())return;this[_0x530e1f(0x18c)]=!![];},Sprite_Picture['prototype']['onMouseExit']=function(){const _0x52a0d9=_0x4e0714;Sprite_Clickable[_0x52a0d9(0x186)][_0x52a0d9(0x1ce)][_0x52a0d9(0x1c0)](this);if(!this[_0x52a0d9(0x163)]())return;this[_0x52a0d9(0x18c)]=![];},Sprite_Picture['prototype']['onClick']=function(){const _0x58f3a4=_0x4e0714;Sprite_Clickable[_0x58f3a4(0x186)][_0x58f3a4(0x1a4)][_0x58f3a4(0x1c0)](this),this[_0x58f3a4(0x185)]();},Sprite_Picture[_0x4e0714(0x186)][_0x4e0714(0x185)]=function(){const _0x517124=_0x4e0714;if(!this['hasCommonEvent']())return;if(!this[_0x517124(0x166)]())return;const _0x169629=$gameSystem['pictureCommonEvent'](this['_pictureId']);$gameTemp[_0x517124(0x165)](_0x169629),this[_0x517124(0x1ce)]();},Sprite_Picture[_0x4e0714(0x186)][_0x4e0714(0x163)]=function(){const _0x62fa04=_0x4e0714,_0x5ac1e0=$gameSystem[_0x62fa04(0x1ac)](this['_pictureId']);return _0x5ac1e0>0x0;},VisuMZ[_0x4e0714(0x168)][_0x4e0714(0x188)]=Sprite_Picture[_0x4e0714(0x186)][_0x4e0714(0x171)],Sprite_Picture[_0x4e0714(0x186)][_0x4e0714(0x171)]=function(){const _0x587ae7=_0x4e0714;VisuMZ[_0x587ae7(0x168)][_0x587ae7(0x188)]['call'](this),this[_0x587ae7(0x199)]();},Sprite_Picture[_0x4e0714(0x186)]['updatePictureCommonEventMouseOver']=function(){const _0xb3169d=_0x4e0714;if(!this[_0xb3169d(0x18c)])return;this[_0xb3169d(0x1c5)]=$gameSystem[_0xb3169d(0x1a9)](this['_pictureId'])||0x0,$gameSystem[_0xb3169d(0x17e)](this[_0xb3169d(0x17a)])&&this['setColorTone']($gameSystem['getPictureCommonEventHoverTone'](this[_0xb3169d(0x17a)])||[0x0,0x0,0x0,0x0]);},Sprite_Picture['prototype']['isPictureCommonEventPressed']=function(){const _0x162edd=_0x4e0714;if(!this['picture']())return![];if(!this[_0x162edd(0x183)]())return![];if($gameSystem[_0x162edd(0x1ac)](this[_0x162edd(0x17a)])<=0x0)return![];if(!this[_0x162edd(0x166)]())return![];return!![];},Spriteset_Base[_0x4e0714(0x186)][_0x4e0714(0x19a)]=function(){const _0x5b6351=_0x4e0714;return this[_0x5b6351(0x1a7)][_0x5b6351(0x19c)][_0x5b6351(0x16d)](_0x265670=>_0x265670[_0x5b6351(0x174)]());};function _0x2f53(_0x58e364,_0x399fe0){const _0x4bb0b4=_0x4bb0();return _0x2f53=function(_0x2f53d3,_0xebc30a){_0x2f53d3=_0x2f53d3-0x160;let _0x1fd065=_0x4bb0b4[_0x2f53d3];return _0x1fd065;},_0x2f53(_0x58e364,_0x399fe0);}function _0x4bb0(){const _0x4da4db=['_frame','ARRAYEVAL','ARRAYJSON','picture','onClick','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ARRAYSTRUCT','_pictureContainer','_pictureCommonEvents','getPictureCommonEventBlendMode','isPictureCommonEventOpaqueOnly','hasPictureChoiceBinding','pictureCommonEvent','return\x200','name','contains','PictureIDs','OpaqueErrorMargin','maxPictures','opacity','parameters','createPictureCommonEventData','2952550qGOfZS','EraseClearAllPictures','makeDeepCopy','STR','2000508EdvjwL','bitmap','checkCommonEventOpaqueErrorMargin','inBattle','ClearPictureCommonEvent','onMouseEnter','call','NUM','EVAL','6WLPAqf','4hXWdOv','blendMode','Picture%1','status','width','exit','3778792ZxPpxT','format','1065366nhDOlL','pictureCommonEventData','onMouseExit','anchor','Scene_Map_isAnyButtonPressed','getPictureCommonEventErrorMargin','erasePicture','max','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','hasCommonEvent','ClearAllPictureCommonEvents','reserveCommonEvent','checkCommonEventOpaqueOnly','EraseClearPicture','PictureCommonEvents','2697555IXjKut','Settings','VisuMZ_2_PictureChoices','visible','some','HoverTone','JSON','STRUCT','updateOther','registerCommand','worldTransform','isPictureCommonEventPressed','initPictureCommonEvents','OpaqueOnly','parse','isClickEnabled','hasPictureChoiceEvent','_pictureId','toUpperCase','map','ChangePictureCommonEvent','doesPictureCommonEventChangeTone','3snkcNk','318586SBtUlK','version','CommonEventID','isPressed','DefaultGlobal','callCommonEvent','prototype','getPictureCommonEventHoverTone','Sprite_Picture_updateOther','UseGlobal','ChangeTone','isMapTouchOk','_pictureCommonEventMouseOver','isAnyButtonPressed','10168410BuvCtN','match','trim','clearPictureCommonEventSettings','Game_System_initialize','description','setPictureCommonEventSettings','isBusy','BlendMode','initialize','applyInverse','updatePictureCommonEventMouseOver','isAnyPictureCommonEventPressed','round','children','TemplateSettings','isBeingTouched','ConvertParams'];_0x4bb0=function(){return _0x4da4db;};return _0x4bb0();}