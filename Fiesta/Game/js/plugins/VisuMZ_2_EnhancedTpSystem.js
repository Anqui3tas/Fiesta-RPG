//=============================================================================
// VisuStella MZ - Enhanced TP System
// VisuMZ_2_EnhancedTpSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_EnhancedTpSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EnhancedTP = VisuMZ.EnhancedTP || {};
VisuMZ.EnhancedTP.version = 1.16;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.16] [EnhancedTP]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Enhanced_TP_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The TP system in RPG Maker MZ is rather limiting. A lot of the TP system is
 * hardcoded in giving RPG Maker MZ users very little control over how much TP
 * gain a battler can receive from particular actions and situations. This
 * plugin gives you the ability to adjust how much TP battlers will acquire
 * various actions, different TP modes, and letting players selecting and pick
 * what TP mode they want for each actor.
 *
 * Features include all (but not limited to) the following:
 * 
 * * TP Modes that allow actors and enemies to have different ways of
 *   generating TP through battle.
 * * 30 pre-made TP Modes for you to use and/or learn from.
 * * Functionality for skills and items to change a target's TP Mode.
 * * The ability to teach actors new TP modes upon learning new skills.
 * * Unlock new TP Modes from becoming the target of skills and/or items.
 * * Trait Objects (like states) that will enforce a specific TP Mode when
 *   applied.
 * * TP Gauge can flash a variety of colors once a certain percentile range
 *   has been met.
 * * Integrated TP Mode changer for players within Scene_Skill.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
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
 * MaxTP Overwrite
 *
 * - There was nothing altering MaxTP before and this plugin offers TP Modes
 * that change up the MaxTP total. The function has been overwritten for more
 * plugin functionality.
 *
 * ---
 *
 * Preserve TP
 *
 * - Preserve TP function has been overwritten so it is no longer determined by
 * the presence of the Preserve TP trait, but instead, determined by whether or
 * not the current TP Mode has TP Preservation as its property. This is to keep
 * the consistency in the TP Modes and to give the game dev more control over
 * this aspect.
 *
 * ---
 * 
 * Initial TP Gain in Battle Reworked
 *
 * - If 'Preserve TP' was off, battlers would normally have a random amount of
 * TP given to them at the start of battle by default. However, there was no
 * place to control this value in the RPG Maker MZ editor itself so this has
 * been overwritten to give you, the game dev, full control over this aspect,
 * and whether or not it requires the 'Preserve TP' flag or not.
 *
 * ---
 *
 * On Damage TP Gain
 *
 * - The on Damage function has been overwritten to remove the default TP gain
 * aspect in favor of custom TP gain aspect granted by the current equipped TP
 * Mode to keep functionality under control.
 *
 * ---
 * 
 * Sprite_Gauge Changes
 * 
 * - The sprite gauge has been changed slightly to allow for flashing gauges.
 * They're separated into different layers now when it comes strictly to a TP
 * gauge. There shouldn't be any noticeable compatibility problems with them
 * unless there are plugins that alter the TP gauge completely.
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
 * === General TP Mode Notetags ===
 *
 * These are TP Mode-related notatags that affect both actors and enemies.
 *
 * ---
 *
 * <TP Mode: name>
 *
 * - Used for: Actor Enemy, State Notetags
 * - Sets the starting TP Mode for this actor/enemy to be 'name'.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * <Starting TP Modes>
 *  name
 *  name
 *  name
 *  name
 * </Starting TP Modes>
 *
 * - Used for: Actor Notetags
 * - Adds TP Modes to the actor's available list of TP Modes from the start.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Change Target TP Mode: name>
 *
 * <Change User TP Mode: name>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the target/user's TP Mode to the target TP Mode upon using this
 *   item/skill.
 * - For <Change Target TP Mode: name>, the action must successfully hit the
 *   target in order for the TP Mode to change.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * === Actor-Only TP Mode Notetags ===
 *
 * These are TP Mode-related notetags that only affect actors.
 *
 * ---
 *
 * <Learn TP Mode: name>
 *
 * - Used for: Skill Notetags
 * - Causes the target selected actor to learn the specific TP Mode when the
 *   skill is learned.
 * - Insert multiple copies of this notetag to have the skill learn more
 *   TP Modes for the target actor.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Keep in mind that learning the skill is required for the TP Mode to be
 *   learned. Adding the skill through a trait will not teach the TP Mode.
 *
 * ---
 *
 * <Learn TP Modes>
 *  name
 *  name
 *  name
 * </Learn TP Modes>
 *
 * - Used for: Skill Notetags
 * - Causes the target selected actor to learn the specific TP Mode when the
 *   skill is learned.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Unlock TP Mode: name>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the target selected actor to unlock the specific TP Mode.
 * - Insert multiple copies of this notetag to have the item/skill unlock more
 *   TP Modes for the target actor.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * <Unlock TP Modes>
 *  name
 *  name
 *  name
 * </Unlock TP Modes>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the target selected actor to unlock the specific TP Mode.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Force TP Mode: name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces the affected battler to use the specific named TP Mode in battle.
 * - Priority is given based the ordering of trait objects if multiple forced
 *   TP Mode effects are present.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change TP Mode
 * - Changes target actor(s) TP Mode.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 *   TP Mode Name:
 *   - Change to this TP Mode for selected actor(s).
 *
 * ---
 *
 * Actor: Unlock TP Mode
 * - Unlocks TP Modes for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 *   TP Modes:
 *   - Change to this TP Mode for selected actor(s).
 *
 * ---
 *
 * Actor: Unlock All TP Modes
 * - Unlocks all TP Modes for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change TP Mode
 * - Changes target enemy(ies) TP Mode.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to affect.
 *
 *   TP Mode Name:
 *   - Change to this TP Mode for selected enemy(ies).
 *
 * ---
 *
 * === System Plugin Commands ===
 * 
 * ---
 * 
 * System: Show/Hide TP Mode
 * - Shows/Hides TP Mode from Scene_Skill.
 *
 *   Show TP Mode?:
 *   - Shows/Hides TP Mode in Scene_Skill.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings for the Enhanced TP System plugin. These
 * control the default settings for TP Modes and TP Mode option appearing in
 * Scene_Skill for the player.
 *
 * ---
 *
 * Defaults
 * 
 *   Default TP Mode:
 *   - Which TP mode should actors and enemies have by default?
 * 
 *   Global TP Modes:
 *   - TP Modes available to the all actors to pick from.
 *
 * ---
 *
 * Scene_Skill
 * 
 *   Show TP Mode?:
 *   - Show TP Mode in Scene_Skill by default?
 * 
 *   TP Mode Command:
 *   - The command name format shown in Scene_Skill.
 *   - %1 - TP Text
 * 
 *   TP Mode Icon:
 *   - Icon used for TP Mode shown in Scene_Skill.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: TP Modes
 * ============================================================================
 *
 * TP Modes are the TP settings that an actor or enemy has. TP Modes regulate
 * how TP is earned as well as the maximum TP value the actor/enemy can have.
 * Players can switch between TP Modes if granted the option, too.
 *
 * TP Modes can be added, removed, and editted by you the game dev. Each TP
 * Mode will have the following Plugin Parameters for you to adjust:
 *
 * ---
 *
 * General
 * 
 *   TP Mode Name:
 *   - The name for this TP Mode.
 *   - Used for notetag reference.
 * 
 *   Icon:
 *   - Icon used for this TP Mode.
 * 
 *   Help:
 *   - Help description used for this TP Mode.
 *   - %1 - In-game TP vocabulary.
 * 
 *   MaxTP Formula:
 *   - What's the MaxTP for this TP Mode?
 * 
 *   TCR Multiplier:
 *   - Multiplier on how much TP is earned.
 *   - Stacks multiplicatively with TCR.
 * 
 *   Preserve TP?:
 *   - If preserved, carry TP to the next battle.
 *   - If not, TP resets each battle.
 *
 * ---
 * 
 * Gauge
 * 
 *   Flash Gauge?:
 *   - Let this gauge flash once it reaches a certain percentage value.
 *   - Requires VisuMZ_1_SkillsStatesCore!
 * 
 *   Required Rate:
 *   - What rate does this gauge need to be over in order for it to flash?
 * 
 *   Flash Speed:
 *   - How fast should the gauge flash different colors?
 *   - Lower numbers are slower. Higher numbers are faster.
 * 
 *   Color Lightness:
 *   - How light should the flash color be?
 *   - Lower numbers are darker. Higher numbers are lighter.
 * 
 *   Custom Label:
 *   - Instead of displaying "TP", what label do you want to display here?
 *   - Leave empty to keep using "TP".
 *   - This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 *   Custom Color 1:
 *   Custom Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *   - Empty for default colors.
 *   - This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 * ---
 *
 * TP Formulas > Generic
 * 
 *   Initial TP:
 *   - How much TP is gained at the start of battle?
 * 
 *   Critical Hit:
 *   - How much TP is gained when landing a critical hit?
 * 
 *   Evasion:
 *   - How much TP is gained when evading an action?
 * 
 *   Use Item:
 *   - How much TP is gained when using an item in battle?
 * 
 *   Use Skill:
 *   - How much TP is gained when using a skill in battle that isn't
 *     Attack or Guard?
 *
 * ---
 *
 * TP Formulas > During Regen
 * 
 *   TP Regen:
 *   - How much TP is gained each turn during regeneration?
 * 
 *   Critical HP:
 *   - How much TP is gained when user is in critical HP (25%)
 *     during regeneration.
 * 
 *   Full HP:
 *   - How much TP is gained when user has full HP
 *     during regeneration.
 * 
 *   Critical MP:
 *   - How much TP is gained when user is in critical MP (25%)
 *     during regeneration.
 * 
 *   Full MP:
 *   - How much TP is gained when user has full MP
 *     during regeneration.
 * 
 *   Only Member:
 *   - How much TP is gained when user is the only alive party member
 *     during regeneration.
 *
 * ---
 *
 * TP Formulas > HP Damage
 * 
 *   Take HP Damage:
 *   - How much TP is gained when receiving HP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Deal HP Damage:
 *   - How much TP is gained when dealing HP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Ally HP Damage:
 *   - How much TP is gained when an ally receives HP damage?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > HP Heal
 * 
 *   Take HP Heal:
 *   - How much TP is gained when receiving HP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Deal HP Heal:
 *   - How much TP is gained when dealing HP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Ally HP Heal:
 *   - How much TP is gained when an ally receives HP heals?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > MP Damage
 * 
 *   Take MP Damage:
 *   - How much TP is gained when receiving MP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Deal MP Damage:
 *   - How much TP is gained when dealing MP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Ally MP Damage:
 *   - How much TP is gained when an ally receives MP damage?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > MP Heal
 * 
 *   Take MP Heal:
 *   - How much TP is gained when receiving MP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Deal MP Heal:
 *   - How much TP is gained when dealing MP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Ally MP Heal:
 *   - How much TP is gained when an ally receives MP heals?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > Buffs
 * 
 *   Deal Ally Buff:
 *   - How much TP is gained when user inflicts a buff on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy Buff:
 *   - How much TP is gained when user inflicts a buff on an enemy through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Ally Buff:
 *   - How much TP is gained when user gains a buff from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy Buff:
 *   - How much TP is gained when user gains a buff from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > Debuffs
 * 
 *   Deal Ally Debuff:
 *   - How much TP is gained when user inflicts a debuff on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy Debuff:
 *   - How much TP is gained when user inflicts a debuff on an enemy through
 *     an Item/Skill Effect (code does not count).
 * 
 *   Gain Ally Debuff:
 *   - How much TP is gained when user gains a debuff from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy Debuff:
 *   - How much TP is gained when user gains a debuff from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > States
 * 
 *   Deal Ally State:
 *   - How much TP is gained when user inflicts a state on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy State:
 *   - How much TP is gained when user inflicts a state on an enemy through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Ally State:
 *   - How much TP is gained when user gains a state from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy State:
 *   - How much TP is gained when user gains a state from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > Death
 * 
 *   Ally Death:
 *   - How much TP is gained when an allied member dies.
 *   - Does not matter who the killer is.
 * 
 *   Enemy Death:
 *   - How much TP is gained when an enemy member dies.
 *   - Does not matter who the killer is.
 *
 * ---
 *
 * TP Formulas > Battle
 * 
 *   Win Battle:
 *   - How much TP is gained when the player wins a battle.
 * 
 *   Flee Battle:
 *   - How much TP is gained when the player escapes a battle.
 * 
 *   Lose Battle:
 *   - How much TP is gained when the player loses a battle.
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
 * Version 1.16: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * 
 * Version 1.15: August 29, 2024
 * * Feature Update!
 * ** Added failsafes for Bad JavaScript TP Formulas to prevent them from
 *    becoming NaN values, undefined values, or null values. Bad values will
 *    default to 0 and an error message will appear telling which actor, mode,
 *    and key's formula has bad code. Update made by Arisu.
 * 
 * Version 1.14: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where the icon of the TP Modes command in the Skill Scene
 *    would still appear even if command types are set to text only through the
 *    VisuStella MZ Skills & States Core plugin. Fixed by Olivia.
 * 
 * Version 1.13: September 29, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: August 18, 2022
 * * Feature Update!
 * ** Regenerate TP functions no longer occur outside of battle. Update made
 *    by Olivia.
 * 
 * Version 1.11: July 16, 2021
 * * Bug Fixes!
 * ** Fixed a problem that bypassed teaching TP modes through item usage.
 *    Fix made by Arisu.
 * 
 * Version 1.10: July 9, 2021
 * * Bug Fixes!
 * ** Fixed bugs regarding the TP Mode Unlock notetags not being detected
 *    properly. Fix made by Olivia.
 * 
 * Version 1.09: May 28, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: May 7, 2021
 * * Bug Fixes!
 * ** Normal Attack States will no longer trigger state gains if no states are
 *    applied. Fix made by Irina.
 * 
 * Version 1.07: April 23, 2021
 * * Bug Fixes!
 * ** Death effects for TP should now only trigger once. Fix made by Olivia.
 * 
 * Version 1.06: February 12, 2021
 * * Feature Update!
 * ** <Force TP Mode: name> notetag is now updated to be enforced outside of
 *    battle as well. Update made by Olivia.
 * 
 * Version 1.05: January 22, 2021
 * * Documentation Update!
 * ** Add notes to the "Custom Label" and "Custom Color" Plugin Parameters:
 * *** This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 * Version 1.04: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > General Settings > Background Type
 * 
 * Version 1.03: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New plugin parameters added by Arisu:
 * *** Custom Label
 * **** Instead of displaying "TP", what label do you want to display here?
 *      Leave empty to keep using "TP".
 * *** Custom Color 1, Custom Color 2
 * **** Use #rrggbb for custom colors or regular numbers for text colors from
 *      the Window Skin. Empty for default colors.
 * *** These plugin parameters are added onto TP Modes.
 * 
 * Version 1.02: November 8, 2020
 * * Bug Fixes!
 * ** Turning off Preserve TP will no longer generate random amounts of TP at
 *    the start of battle. Fix made by Arisu.
 * 
 * Version 1.01: November 1, 2020
 * * Bug Fixes!
 * ** Skill & States Core is no longer a dependency for Enhanced TP System.
 *    Fix made by Olivia.
 *
 * Version 1.00: October 26, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTPMode
 * @text Actor: Change TP Mode
 * @desc Changes target actor(s) TP Mode.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @arg TPModeName:str
 * @text TP Mode Name
 * @desc Change to this TP Mode for selected actor(s).
 * @default Stoic
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorUnlockTPMode
 * @text Actor: Unlock TP Mode
 * @desc Unlocks TP Modes for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @arg TPModes:arraystr
 * @text TP Modes
 * @type string[]
 * @desc Change to this TP Mode for selected actor(s).
 * @default ["Stoic","Comrade","Warrior","Healer"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorUnlockAllTPModes
 * @text Actor: Unlock All TP Modes
 * @desc Unlocks all TP Modes for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTPMode
 * @text Enemy: Change TP Mode
 * @desc Changes target enemy(ies) TP Mode.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to affect.
 * @default ["0"]
 *
 * @arg TPModeName:str
 * @text TP Mode Name
 * @desc Change to this TP Mode for selected enemy(ies).
 * @default Stoic
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SceneSkillTpMode
 * @text System: Show/Hide TP Mode
 * @desc Shows/Hides TP Mode from Scene_Skill.
 *
 * @arg Show:eval
 * @text Show TP Mode?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/Hides TP Mode in Scene_Skill.
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
 * @param EnhancedTP
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
 * @desc General settings pertaining to TP.
 * @default {"Defaults":"","DefaultTpMode:str":"Stoic","GlobalTPModes:arraystr":"[\"Stoic\",\"Comrade\",\"Warrior\",\"Healer\"]","SceneSkill":"","ShowTpMode:eval":"true","TpModeCmdName:str":"%1 Mode","TpModeIcon:num":"164"}
 *
 * @param TpMode:arraystruct
 * @text TP Modes
 * @type struct<TpMode>[]
 * @desc TP Modes available in the game.
 * @default ["{\"Name:str\":\"Stoic\",\"Icon:num\":\"78\",\"Help:json\":\"\\\"Raise %1 when receiving damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Comrade\",\"Icon:num\":\"76\",\"Help:json\":\"\\\"Raise %1 whenever allies take damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"20 * user.tcr\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Warrior\",\"Icon:num\":\"77\",\"Help:json\":\"\\\"Raise %1 by attacking and dealing HP damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Healer\",\"Icon:num\":\"72\",\"Help:json\":\"\\\"Raise %1 by healing HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Breaker\",\"Icon:num\":\"171\",\"Help:json\":\"\\\"Raise %1 whenever user deals MP damage\\\\nor receives MP damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"50 * (value / Math.max(1, this.mmp)) * user.tcr\",\"DealMpDmg:str\":\"Math.min(16, value / 4) * user.tcr\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Battery\",\"Icon:num\":\"165\",\"Help:json\":\"\\\"Raise %1 whenever use helps an ally restore MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"Math.min(16, value / 4) * user.tcr\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Slayer\",\"Icon:num\":\"1\",\"Help:json\":\"\\\"Raise %1 whenever an enemy is killed.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"25 * user.tcr\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Avenger\",\"Icon:num\":\"17\",\"Help:json\":\"\\\"Raise %1 whenever an ally is killed.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"50 * user.tcr\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Winner\",\"Icon:num\":\"87\",\"Help:json\":\"\\\"Raise %1 whenever your party wins a battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"20 * user.tcr\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Coward\",\"Icon:num\":\"89\",\"Help:json\":\"\\\"Raise %1 whenever your party escapes from battle\\\\nor loses a battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"20 * user.tcr\",\"LoseBattle:str\":\"20 * user.tcr\"}","{\"Name:str\":\"Cautious\",\"Icon:num\":\"32\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with full HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"10 * user.tcr\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Thrifty\",\"Icon:num\":\"33\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with full MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"10 * user.tcr\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Daredevil\",\"Icon:num\":\"48\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with low HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"16 * user.tcr\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Splurger\",\"Icon:num\":\"49\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with low MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"16 * user.tcr\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Caster\",\"Icon:num\":\"79\",\"Help:json\":\"\\\"Raise %1 whenever user performs a skill.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"16 * user.tcr\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Alchemist\",\"Icon:num\":\"176\",\"Help:json\":\"\\\"Raise %1 whenever user uses an item.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"16 * user.tcr\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Enchanter\",\"Icon:num\":\"73\",\"Help:json\":\"\\\"Gains %1 TP whenever user applies a buff\\\\nor status effect to an ally.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"16 * user.tcr\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"16 * user.tcr\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Tactician\",\"Icon:num\":\"74\",\"Help:json\":\"\\\"Gains %1 TP whenever user applies a debuff\\\\nor status effect to a foe.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"16 * user.tcr\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"16 * user.tcr\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Boosted\",\"Icon:num\":\"84\",\"Help:json\":\"\\\"Raise %1 whenever user receives a buff or\\\\nstatus effect from an ally.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"16 * user.tcr\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"16 * user.tcr\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Sufferer\",\"Icon:num\":\"2\",\"Help:json\":\"\\\"Raise %1 whenever user receives a debuff or\\\\nstatus effect from a foe.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"16 * user.tcr\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"16 * user.tcr\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Striker\",\"Icon:num\":\"78\",\"Help:json\":\"\\\"Raise %1 whenever user lands a critical hit.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"16 * user.tcr\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Dancer\",\"Icon:num\":\"82\",\"Help:json\":\"\\\"Raise %1 whenever user evades an attack.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"16 * user.tcr\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Loner\",\"Icon:num\":\"166\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn as the\\\\nlast remaining alive member.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"16 * user.tcr\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Initiator\",\"Icon:num\":\"164\",\"Help:json\":\"\\\"User gains %1 at the start of battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"20 * user.tcr\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Charger\",\"Icon:num\":\"311\",\"Help:json\":\"\\\"User loses all %1 at the start of battle but\\\\ngains more each passing turn.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"-1 * user.maxTp()\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"2 ** user.turnCount() * user.tcr\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Berserker\",\"Icon:num\":\"5\",\"Help:json\":\"\\\"User starts with full %1 at the start of battle,\\\\nbut loses 20 %1 each passing turn.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"user.maxTp()\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"-20\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Maximizer\",\"Icon:num\":\"239\",\"Help:json\":\"\\\"User's Max%1 is raised to 300 gains %1 from\\\\ndealing/receiving HP damage at a slower rate.\\\"\",\"MaxFormula:str\":\"300\",\"MultiplierTCR:num\":\"0.5\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Minimizer\",\"Icon:num\":\"236\",\"Help:json\":\"\\\"User's Max%1 is lowered to 50 gains %1 from\\\\ndealing/receiving HP damage at a faster rate.\\\"\",\"MaxFormula:str\":\"50\",\"MultiplierTCR:num\":\"2.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Recycler\",\"Icon:num\":\"75\",\"Help:json\":\"\\\"User's Max%1 becomes 20. User starts with 20 %1\\\\nand regenerates 20 %1 each turn.\\\"\",\"MaxFormula:str\":\"20\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"20\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"20\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Assassin\",\"Icon:num\":\"10\",\"Help:json\":\"\\\"User's Max%1 becomes 500. User starts with 500 %1,\\\\nbut receiving healing or damage halves user's %1.\\\"\",\"MaxFormula:str\":\"500\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"500\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"user.tp / -2\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"user.tp / -2\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}"]
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
 * @param DefaultTpMode:str
 * @text Default TP Mode
 * @parent Defaults
 * @desc Which TP mode should actors and enemies have by default?
 * @default Stoic
 *
 * @param GlobalTPModes:arraystr
 * @text Global TP Modes
 * @type string[]
 * @parent Defaults
 * @desc TP Modes available to the all actors to pick from.
 * @default ["Stoic","Comrade","Warrior","Healer"]
 *
 * @param SceneSkill
 * @text Scene_Skill
 *
 * @param ShowTpMode:eval
 * @text Show TP Mode?
 * @parent SceneSkill
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show TP Mode in Scene_Skill by default?
 * @default true
 *
 * @param TpModeCmdName:str 
 * @text TP Mode Command
 * @parent SceneSkill
 * @desc The command name format shown in Scene_Skill.
 * %1 - TP Text
 * @default %1 Mode
 *
 * @param TpModeIcon:num
 * @text TP Mode Icon
 * @parent SceneSkill
 * @desc Icon used for TP Mode shown in Scene_Skill.
 * @default 164
 *
 * @param TpWindowBgType:num
 * @text Background Type
 * @parent SceneSkill
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
 */
/* ----------------------------------------------------------------------------
 * TP Modes
 * ----------------------------------------------------------------------------
 */
/*~struct~TpMode:
 *
 * @param Name:str 
 * @text TP Mode Name
 * @desc The name for this TP Mode.
 * Used for notetag reference.
 * @default Untitled
 *
 * @param Icon:num
 * @text Icon
 * @parent Name:str
 * @desc Icon used for this TP Mode.
 * @default 160
 *
 * @param Help:json
 * @text Help
 * @parent Name:str
 * @type note
 * @desc Help description used for this TP Mode.
 * %1 - In-game TP vocabulary.
 * @default "Help Line 1\nHelp Line 2"
 *
 * @param MaxFormula:str
 * @text MaxTP Formula
 * @parent Name:str
 * @desc What's the MaxTP for this TP Mode?
 * @default 100
 *
 * @param MultiplierTCR:num
 * @text TCR Multiplier
 * @parent Name:str
 * @desc Multiplier on how much TP is earned.
 * Stacks multiplicatively with TCR.
 * @default 1.0
 *
 * @param Preserve:eval
 * @text Preserve TP?
 * @parent Name:str
 * @type boolean
 * @on Preserve
 * @off Don't
 * @desc If preserved, carry TP to the next battle.
 * If not, TP resets each battle.
 * @default true
 *
 * @param Gauge
 *
 * @param FlashGauge:eval
 * @text Flash Gauge?
 * @parent Gauge
 * @type boolean
 * @on Flash
 * @off Don't Flash
 * @desc Let this gauge flash once it reaches a certain percentage 
 * value. Requires VisuMZ_1_SkillsStatesCore!
 * @default true
 *
 * @param FlashRequirement:num
 * @text Required Rate
 * @parent Gauge
 * @desc What rate does this gauge need to be over in order for it to flash?
 * @default 1.0
 *
 * @param FlashSpeed:num
 * @text Flash Speed
 * @parent Gauge
 * @type number
 * @min 1
 * @max 255
 * @desc How fast should the gauge flash different colors?
 * Lower numbers are slower. Higher numbers are faster.
 * @default 16
 *
 * @param FlashLightness:num
 * @text Color Lightness
 * @parent Gauge
 * @type number
 * @min 0
 * @max 255
 * @desc How light should the flash color be?
 * Lower numbers are darker. Higher numbers are lighter.
 * @default 160
 *
 * @param CustomLabel:str
 * @text Custom Label
 * @parent Gauge
 * @desc Instead of displaying "TP", what label do you want
 * to display here? Leave empty to keep using "TP".
 * @default 
 *
 * @param CustomColor1:str
 * @text Custom Color 1
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin. Empty for default.
 * @default 
 *
 * @param CustomColor2:str
 * @text Custom Color 2
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin. Empty for default.
 * @default 
 *
 * @param Formulas
 * @text TP Formulas
 *
 * @param Generic
 * @parent Formulas
 *
 * @param Initial:str
 * @text Initial TP
 * @parent Generic
 * @desc How much TP is gained at the start of battle?
 * @default 0
 *
 * @param CriticalHit:str
 * @text Critical Hit
 * @parent Generic
 * @desc How much TP is gained when landing a critical hit?
 * @default 0
 *
 * @param Evasion:str
 * @text Evasion
 * @parent Generic
 * @desc How much TP is gained when evading an action?
 * @default 0
 *
 * @param UseItem:str
 * @text Use Item
 * @parent Generic
 * @desc How much TP is gained when using an item in battle?
 * @default 0
 *
 * @param UseSkill:str
 * @text Use Skill
 * @parent Generic
 * @desc How much TP is gained when using a skill in battle that isn't Attack or Guard?
 * @default 0
 *
 * @param Regen
 * @text During Regen
 * @parent Formulas
 *
 * @param TpRegen:str
 * @text TP Regen
 * @parent Regen
 * @desc How much TP is gained each turn during regeneration?
 * @default 0
 *
 * @param CriticalHp:str
 * @text Critical HP
 * @parent Regen
 * @desc How much TP is gained when user is in critical HP (25%)
 * during regeneration.
 * @default 0
 *
 * @param FullHp:str
 * @text Full HP
 * @parent Regen
 * @desc How much TP is gained when user has full HP
 * during regeneration.
 * @default 0
 *
 * @param CriticalMp:str
 * @text Critical MP
 * @parent Regen
 * @desc How much TP is gained when user is in critical MP (25%)
 * during regeneration.
 * @default 0
 *
 * @param FullMp:str
 * @text Full MP
 * @parent Regen
 * @desc How much TP is gained when user has full MP
 * during regeneration.
 * @default 0
 *
 * @param OnlyMember:str
 * @text Only Member
 * @parent Regen
 * @desc How much TP is gained when user is the only alive party member during regeneration.
 * @default 0
 *
 * @param HPDmg
 * @text HP Damage
 * @parent Formulas
 *
 * @param TakeHpDmg:str
 * @text Take HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when receiving HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param DealHpDmg:str
 * @text Deal HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when dealing HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyHpDmg:str
 * @text Ally HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when an ally receives HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param HPHeal
 * @text HP Heal
 * @parent Formulas
 *
 * @param TakeHpHeal:str
 * @text Take HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when receiving HP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param DealHpHeal:str
 * @text Deal HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when dealing HP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyHpHeal:str
 * @text Ally HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when an ally receives HP heals?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param MPDmg
 * @text MP Damage
 * @parent Formulas
 *
 * @param TakeMpDmg:str
 * @text Take MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when receiving MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param DealMpDmg:str
 * @text Deal MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when dealing MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyMpDmg:str
 * @text Ally MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when an ally receives MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param MPHeal
 * @text MP Heal
 * @parent Formulas
 *
 * @param TakeMpHeal:str
 * @text Take MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when receiving MP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param DealMpHeal:str
 * @text Deal MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when dealing MP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyMpHeal:str
 * @text Ally MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when an ally receives MP heals?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param Buffs
 * @parent Formulas
 *
 * @param DealAllyBuff:str
 * @text Deal Ally Buff
 * @parent Buffs
 * @desc How much TP is gained when user inflicts a buff on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyBuff:str
 * @text Deal Enemy Buff
 * @parent Buffs
 * @desc How much TP is gained when user inflicts a buff on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyBuff:str
 * @text Gain Ally Buff
 * @parent Buffs
 * @desc How much TP is gained when user gains a buff from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyBuff:str
 * @text Gain Enemy Buff
 * @parent Buffs
 * @desc How much TP is gained when user gains a buff from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param Debuffs
 * @parent Formulas
 *
 * @param DealAllyDebuff:str
 * @text Deal Ally Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user inflicts a debuff on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyDebuff:str
 * @text Deal Enemy Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user inflicts a debuff on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyDebuff:str
 * @text Gain Ally Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user gains a debuff from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyDebuff:str
 * @text Gain Enemy Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user gains a debuff from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param States
 * @parent Formulas
 *
 * @param DealAllyState:str
 * @text Deal Ally State
 * @parent States
 * @desc How much TP is gained when user inflicts a state on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyState:str
 * @text Deal Enemy State
 * @parent States
 * @desc How much TP is gained when user inflicts a state on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyState:str
 * @text Gain Ally State
 * @parent States
 * @desc How much TP is gained when user gains a state from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyState:str
 * @text Gain Enemy State
 * @parent States
 * @desc How much TP is gained when user gains a state from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param Death
 * @parent Formulas
 *
 * @param KillAlly:str
 * @text Ally Death
 * @parent Death
 * @desc How much TP is gained when an allied member dies.
 * Does not matter who the killer is.
 * @default 0
 *
 * @param KillEnemy:str
 * @text Enemy Death
 * @parent Death
 * @desc How much TP is gained when an enemy member dies.
 * Does not matter who the killer is.
 * @default 0
 *
 * @param Battle
 * @parent Formulas
 *
 * @param WinBattle:str
 * @text Win Battle
 * @parent Battle
 * @desc How much TP is gained when the player wins a battle.
 * @default 0
 *
 * @param FleeBattle:str
 * @text Flee Battle
 * @parent Battle
 * @desc How much TP is gained when the player escapes a battle.
 * @default 0
 *
 * @param LoseBattle:str
 * @text Lose Battle
 * @parent Battle
 * @desc How much TP is gained when the player loses a battle.
 * @default 0
 *
 */
//=============================================================================

const _0x101051=_0x2696;(function(_0x76f116,_0x12fb48){const _0x65bdd=_0x2696,_0x15e7fd=_0x76f116();while(!![]){try{const _0x3b054d=-parseInt(_0x65bdd(0x236))/0x1*(parseInt(_0x65bdd(0x269))/0x2)+parseInt(_0x65bdd(0x293))/0x3+-parseInt(_0x65bdd(0x19f))/0x4+-parseInt(_0x65bdd(0x285))/0x5*(parseInt(_0x65bdd(0x1b0))/0x6)+parseInt(_0x65bdd(0x28b))/0x7*(parseInt(_0x65bdd(0x214))/0x8)+parseInt(_0x65bdd(0x25b))/0x9+parseInt(_0x65bdd(0x2ad))/0xa*(parseInt(_0x65bdd(0x1ae))/0xb);if(_0x3b054d===_0x12fb48)break;else _0x15e7fd['push'](_0x15e7fd['shift']());}catch(_0x4da896){_0x15e7fd['push'](_0x15e7fd['shift']());}}}(_0xe722,0xec8b2));var label=_0x101051(0x19c),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x101051(0x217)](function(_0x4778e1){const _0x1166f3=_0x101051;return _0x4778e1[_0x1166f3(0x2a0)]&&_0x4778e1[_0x1166f3(0x202)][_0x1166f3(0x1ab)]('['+label+']');})[0x0];VisuMZ[label][_0x101051(0x1a8)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x101051(0x1d7)]=function(_0x4c5694,_0x4e6fa4){const _0x254217=_0x101051;for(const _0x35a4d4 in _0x4e6fa4){if(_0x35a4d4['match'](/(.*):(.*)/i)){const _0x4b78e2=String(RegExp['$1']),_0x4781f9=String(RegExp['$2'])[_0x254217(0x1bd)]()[_0x254217(0x191)]();let _0x1c6a38,_0x43705b,_0x4d54af;switch(_0x4781f9){case _0x254217(0x1dd):_0x1c6a38=_0x4e6fa4[_0x35a4d4]!==''?Number(_0x4e6fa4[_0x35a4d4]):0x0;break;case'ARRAYNUM':_0x43705b=_0x4e6fa4[_0x35a4d4]!==''?JSON[_0x254217(0x276)](_0x4e6fa4[_0x35a4d4]):[],_0x1c6a38=_0x43705b['map'](_0x3c3d12=>Number(_0x3c3d12));break;case _0x254217(0x1dc):_0x1c6a38=_0x4e6fa4[_0x35a4d4]!==''?eval(_0x4e6fa4[_0x35a4d4]):null;break;case _0x254217(0x228):_0x43705b=_0x4e6fa4[_0x35a4d4]!==''?JSON['parse'](_0x4e6fa4[_0x35a4d4]):[],_0x1c6a38=_0x43705b[_0x254217(0x225)](_0x351921=>eval(_0x351921));break;case _0x254217(0x260):_0x1c6a38=_0x4e6fa4[_0x35a4d4]!==''?JSON[_0x254217(0x276)](_0x4e6fa4[_0x35a4d4]):'';break;case'ARRAYJSON':_0x43705b=_0x4e6fa4[_0x35a4d4]!==''?JSON[_0x254217(0x276)](_0x4e6fa4[_0x35a4d4]):[],_0x1c6a38=_0x43705b[_0x254217(0x225)](_0x5bda49=>JSON['parse'](_0x5bda49));break;case'FUNC':_0x1c6a38=_0x4e6fa4[_0x35a4d4]!==''?new Function(JSON[_0x254217(0x276)](_0x4e6fa4[_0x35a4d4])):new Function(_0x254217(0x1fd));break;case _0x254217(0x18a):_0x43705b=_0x4e6fa4[_0x35a4d4]!==''?JSON[_0x254217(0x276)](_0x4e6fa4[_0x35a4d4]):[],_0x1c6a38=_0x43705b[_0x254217(0x225)](_0x26b60a=>new Function(JSON[_0x254217(0x276)](_0x26b60a)));break;case _0x254217(0x1f9):_0x1c6a38=_0x4e6fa4[_0x35a4d4]!==''?String(_0x4e6fa4[_0x35a4d4]):'';break;case _0x254217(0x296):_0x43705b=_0x4e6fa4[_0x35a4d4]!==''?JSON[_0x254217(0x276)](_0x4e6fa4[_0x35a4d4]):[],_0x1c6a38=_0x43705b[_0x254217(0x225)](_0x589e4c=>String(_0x589e4c));break;case _0x254217(0x26f):_0x4d54af=_0x4e6fa4[_0x35a4d4]!==''?JSON['parse'](_0x4e6fa4[_0x35a4d4]):{},_0x1c6a38=VisuMZ['ConvertParams']({},_0x4d54af);break;case'ARRAYSTRUCT':_0x43705b=_0x4e6fa4[_0x35a4d4]!==''?JSON[_0x254217(0x276)](_0x4e6fa4[_0x35a4d4]):[],_0x1c6a38=_0x43705b[_0x254217(0x225)](_0x2a6438=>VisuMZ[_0x254217(0x1d7)]({},JSON[_0x254217(0x276)](_0x2a6438)));break;default:continue;}_0x4c5694[_0x4b78e2]=_0x1c6a38;}}return _0x4c5694;},(_0xee6bd0=>{const _0x508dbf=_0x101051,_0x426058=_0xee6bd0[_0x508dbf(0x2bd)];for(const _0x50fc0c of dependencies){if(!Imported[_0x50fc0c]){alert(_0x508dbf(0x1a4)[_0x508dbf(0x2ca)](_0x426058,_0x50fc0c)),SceneManager['exit']();break;}}const _0x1f6840=_0xee6bd0[_0x508dbf(0x202)];if(_0x1f6840[_0x508dbf(0x205)](/\[Version[ ](.*?)\]/i)){const _0x197623=Number(RegExp['$1']);_0x197623!==VisuMZ[label]['version']&&(alert(_0x508dbf(0x279)[_0x508dbf(0x2ca)](_0x426058,_0x197623)),SceneManager['exit']());}if(_0x1f6840[_0x508dbf(0x205)](/\[Tier[ ](\d+)\]/i)){const _0x2b4d90=Number(RegExp['$1']);_0x2b4d90<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x508dbf(0x2ca)](_0x426058,_0x2b4d90,tier)),SceneManager[_0x508dbf(0x29f)]()):tier=Math[_0x508dbf(0x272)](_0x2b4d90,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x508dbf(0x1a8)],_0xee6bd0[_0x508dbf(0x199)]);})(pluginData),PluginManager[_0x101051(0x281)](pluginData[_0x101051(0x2bd)],_0x101051(0x259),_0x2348b6=>{const _0x4c5c4c=_0x101051;VisuMZ[_0x4c5c4c(0x1d7)](_0x2348b6,_0x2348b6);const _0x395abc=_0x2348b6['Actors'][_0x4c5c4c(0x225)](_0x5c29ac=>$gameActors[_0x4c5c4c(0x237)](_0x5c29ac))['remove'](null),_0x2c4aad=_0x2348b6[_0x4c5c4c(0x1fc)];for(const _0x335991 of _0x395abc){if(!_0x335991)continue;_0x335991['changeTpMode'](_0x2c4aad);}}),PluginManager['registerCommand'](pluginData['name'],_0x101051(0x26a),_0x456436=>{const _0x4ddf97=_0x101051;VisuMZ[_0x4ddf97(0x1d7)](_0x456436,_0x456436);const _0x2dc55e=_0x456436[_0x4ddf97(0x18e)][_0x4ddf97(0x225)](_0x2edbb0=>$gameActors[_0x4ddf97(0x237)](_0x2edbb0))[_0x4ddf97(0x20c)](null),_0x179d6e=_0x456436['TPModes'];for(const _0x4d0df6 of _0x2dc55e){if(!_0x4d0df6)continue;for(const _0x31ef44 of _0x179d6e){_0x4d0df6['learnTpMode'](_0x31ef44);}}}),PluginManager['registerCommand'](pluginData[_0x101051(0x2bd)],_0x101051(0x1a3),_0x533cdc=>{const _0x261185=_0x101051;VisuMZ[_0x261185(0x1d7)](_0x533cdc,_0x533cdc);const _0x693abd=_0x533cdc[_0x261185(0x18e)][_0x261185(0x225)](_0x3c915f=>$gameActors[_0x261185(0x237)](_0x3c915f))[_0x261185(0x20c)](null),_0x5a4b4f=VisuMZ[_0x261185(0x19c)][_0x261185(0x1ff)];for(const _0x243ec1 of _0x693abd){if(!_0x243ec1)continue;for(const _0x250e4c of _0x5a4b4f){_0x243ec1[_0x261185(0x190)](_0x250e4c);}}}),PluginManager['registerCommand'](pluginData[_0x101051(0x2bd)],_0x101051(0x1d8),_0x226c46=>{const _0x1e6d7c=_0x101051;VisuMZ[_0x1e6d7c(0x1d7)](_0x226c46,_0x226c46);const _0x5919a9=_0x226c46[_0x1e6d7c(0x2c3)][_0x1e6d7c(0x225)](_0x3f09f1=>$gameTroop[_0x1e6d7c(0x29a)]()[_0x3f09f1])[_0x1e6d7c(0x20c)](null),_0x340fbd=_0x226c46[_0x1e6d7c(0x1fc)];for(const _0x379d71 of _0x5919a9){if(!_0x379d71)continue;_0x379d71[_0x1e6d7c(0x1bf)](_0x340fbd);}}),PluginManager['registerCommand'](pluginData['name'],_0x101051(0x2be),_0xdc7225=>{const _0x32099c=_0x101051;VisuMZ[_0x32099c(0x1d7)](_0xdc7225,_0xdc7225),$gameSystem[_0x32099c(0x192)](_0xdc7225['Show']);}),VisuMZ['EnhancedTP'][_0x101051(0x27c)]=Scene_Boot[_0x101051(0x19b)][_0x101051(0x24b)],Scene_Boot[_0x101051(0x19b)][_0x101051(0x24b)]=function(){const _0x234f6d=_0x101051;VisuMZ[_0x234f6d(0x19c)][_0x234f6d(0x27c)][_0x234f6d(0x280)](this),this[_0x234f6d(0x297)]();},Scene_Boot['prototype'][_0x101051(0x297)]=function(){const _0x3bdc40=_0x101051;VisuMZ['EnhancedTP'][_0x3bdc40(0x1e3)]={},VisuMZ[_0x3bdc40(0x19c)]['TpModeOrder']=[];for(const _0x2e0aa9 of VisuMZ['EnhancedTP']['Settings'][_0x3bdc40(0x1cc)]){if(!_0x2e0aa9)continue;_0x2e0aa9[_0x3bdc40(0x202)]=_0x2e0aa9['Help'][_0x3bdc40(0x2ca)](TextManager['tp']),this['convertEnhancedTpFunctions'](_0x2e0aa9);const _0xd26a2c=_0x2e0aa9[_0x3bdc40(0x182)][_0x3bdc40(0x1bd)]()[_0x3bdc40(0x191)]();VisuMZ['EnhancedTP']['TpModes'][_0xd26a2c]=_0x2e0aa9,VisuMZ['EnhancedTP'][_0x3bdc40(0x1ff)][_0x3bdc40(0x2aa)](_0xd26a2c);}},Scene_Boot[_0x101051(0x19b)][_0x101051(0x18d)]=function(_0x1a66e1){const _0x1e8792=_0x101051,_0x1e96c0=[_0x1e8792(0x245),_0x1e8792(0x1e1),_0x1e8792(0x185),'Evasion',_0x1e8792(0x18b),_0x1e8792(0x261),_0x1e8792(0x238),_0x1e8792(0x23c),_0x1e8792(0x28d),_0x1e8792(0x21a),_0x1e8792(0x221),_0x1e8792(0x1da),_0x1e8792(0x1f5),'DealHpDmg','AllyHpDmg',_0x1e8792(0x239),'DealHpHeal',_0x1e8792(0x1a2),'TakeMpDmg',_0x1e8792(0x196),_0x1e8792(0x273),_0x1e8792(0x2a4),_0x1e8792(0x2a9),'AllyMpHeal',_0x1e8792(0x1b9),_0x1e8792(0x2ce),_0x1e8792(0x1fa),_0x1e8792(0x235),_0x1e8792(0x294),'DealEnemyDebuff','GainAllyDebuff','GainEnemyDebuff',_0x1e8792(0x233),'DealEnemyState',_0x1e8792(0x2b1),_0x1e8792(0x1de),_0x1e8792(0x248),_0x1e8792(0x1b1),_0x1e8792(0x1c8),_0x1e8792(0x282),_0x1e8792(0x1b2)];for(const _0x2f4e4d of _0x1e96c0){const _0x3ddc90=_0x1e8792(0x26b)[_0x1e8792(0x2ca)](_0x1a66e1[_0x2f4e4d]);_0x1a66e1[_0x1e8792(0x183)[_0x1e8792(0x2ca)](_0x2f4e4d)]=new Function('user',_0x1e8792(0x1cb),_0x1e8792(0x1e2),_0x3ddc90);}},TextManager[_0x101051(0x1c9)]=VisuMZ['EnhancedTP'][_0x101051(0x1a8)]['General'][_0x101051(0x187)],ColorManager[_0x101051(0x1b7)]=function(_0xf74fda){const _0x3951b6=_0x101051;return _0xf74fda=String(_0xf74fda),_0xf74fda[_0x3951b6(0x205)](/#(.*)/i)?_0x3951b6(0x1bc)[_0x3951b6(0x2ca)](String(RegExp['$1'])):this['textColor'](Number(_0xf74fda));},ImageManager['tpModesCommandIcon']=VisuMZ[_0x101051(0x19c)][_0x101051(0x1a8)][_0x101051(0x1f1)][_0x101051(0x2bf)],VisuMZ['EnhancedTP'][_0x101051(0x1d6)]=BattleManager['processVictory'],BattleManager[_0x101051(0x1f3)]=function(){const _0x2a497e=_0x101051;VisuMZ['EnhancedTP'][_0x2a497e(0x1d6)][_0x2a497e(0x280)](this),$gameParty[_0x2a497e(0x250)]('WinBattle',$gameParty['leader'](),0x0);},VisuMZ[_0x101051(0x19c)][_0x101051(0x1e6)]=BattleManager['onEscapeSuccess'],BattleManager['onEscapeSuccess']=function(){const _0x49bf4d=_0x101051;VisuMZ[_0x49bf4d(0x19c)][_0x49bf4d(0x1e6)][_0x49bf4d(0x280)](this),$gameParty['gainTpFromTpMode'](_0x49bf4d(0x282),$gameParty[_0x49bf4d(0x226)](),0x0);},VisuMZ['EnhancedTP'][_0x101051(0x1e4)]=BattleManager[_0x101051(0x2cb)],BattleManager[_0x101051(0x2cb)]=function(){const _0x2e5f15=_0x101051;VisuMZ[_0x2e5f15(0x19c)][_0x2e5f15(0x1e4)]['call'](this),$gameParty[_0x2e5f15(0x250)](_0x2e5f15(0x1b2),$gameParty['leader'](),0x0);},VisuMZ[_0x101051(0x19c)][_0x101051(0x1cd)]=Game_System['prototype'][_0x101051(0x267)],Game_System[_0x101051(0x19b)][_0x101051(0x267)]=function(){const _0x790aa0=_0x101051;VisuMZ[_0x790aa0(0x19c)][_0x790aa0(0x1cd)][_0x790aa0(0x280)](this),this[_0x790aa0(0x23d)]();},Game_System[_0x101051(0x19b)][_0x101051(0x23d)]=function(){const _0x376374=_0x101051;this['_tpMode_SceneSkill']=VisuMZ['EnhancedTP'][_0x376374(0x1a8)][_0x376374(0x1f1)][_0x376374(0x1e7)];},Game_System[_0x101051(0x19b)][_0x101051(0x1b4)]=function(){const _0x4d4c93=_0x101051;if(this['_tpMode_SceneSkill']===undefined)this[_0x4d4c93(0x23d)]();return this[_0x4d4c93(0x193)];},Game_System[_0x101051(0x19b)][_0x101051(0x192)]=function(_0x52b0dd){const _0x4a212f=_0x101051;if(this[_0x4a212f(0x193)]===undefined)this[_0x4a212f(0x23d)]();this[_0x4a212f(0x193)]=_0x52b0dd;},VisuMZ['EnhancedTP'][_0x101051(0x23b)]=Game_Action['prototype'][_0x101051(0x219)],Game_Action[_0x101051(0x19b)]['apply']=function(_0x4e3515){const _0x2cb844=_0x101051;VisuMZ[_0x2cb844(0x19c)][_0x2cb844(0x23b)][_0x2cb844(0x280)](this,_0x4e3515),this[_0x2cb844(0x1b5)](_0x4e3515);},Game_Action[_0x101051(0x19b)]['applyEnhancedTP']=function(_0x6d7acd){const _0x2a6a6d=_0x101051,_0x2d9d62=_0x6d7acd['result']();_0x2d9d62[_0x2a6a6d(0x2ac)]&&this[_0x2a6a6d(0x1e5)]()['gainTpFromTpMode'](_0x2a6a6d(0x185),_0x6d7acd,0x0),(_0x2d9d62[_0x2a6a6d(0x23e)]||_0x2d9d62[_0x2a6a6d(0x286)])&&_0x6d7acd['gainTpFromTpMode'](_0x2a6a6d(0x258),_0x6d7acd,0x0);},VisuMZ[_0x101051(0x19c)][_0x101051(0x25f)]=Game_Action['prototype'][_0x101051(0x22b)],Game_Action[_0x101051(0x19b)]['executeHpDamage']=function(_0x25556c,_0x4a48ab){const _0x14ef4a=_0x101051;VisuMZ[_0x14ef4a(0x19c)]['Game_Action_executeHpDamage'][_0x14ef4a(0x280)](this,_0x25556c,_0x4a48ab);const _0x18d297=this[_0x14ef4a(0x1e5)]();_0x4a48ab>0x0?(_0x25556c['gainTpFromTpMode']('TakeHpDmg',_0x25556c,_0x4a48ab),_0x18d297[_0x14ef4a(0x250)](_0x14ef4a(0x268),_0x25556c,_0x4a48ab),_0x25556c[_0x14ef4a(0x27b)]()['gainTpFromTpMode'](_0x14ef4a(0x234),_0x25556c,_0x4a48ab)):(_0x4a48ab=Math['abs'](_0x4a48ab),_0x25556c[_0x14ef4a(0x250)](_0x14ef4a(0x239),_0x25556c,_0x4a48ab),_0x18d297[_0x14ef4a(0x250)](_0x14ef4a(0x292),_0x25556c,_0x4a48ab),_0x25556c[_0x14ef4a(0x27b)]()[_0x14ef4a(0x250)](_0x14ef4a(0x1a2),_0x25556c,_0x4a48ab));},VisuMZ['EnhancedTP']['Game_Action_executeMpDamage']=Game_Action['prototype'][_0x101051(0x2a6)],Game_Action[_0x101051(0x19b)][_0x101051(0x2a6)]=function(_0x268567,_0x187fc9){const _0x13e7be=_0x101051;VisuMZ[_0x13e7be(0x19c)][_0x13e7be(0x287)][_0x13e7be(0x280)](this,_0x268567,_0x187fc9);const _0x23279b=this[_0x13e7be(0x1e5)]();_0x187fc9>0x0?(_0x268567['gainTpFromTpMode'](_0x13e7be(0x24c),_0x268567,_0x187fc9),_0x23279b['gainTpFromTpMode'](_0x13e7be(0x196),_0x268567,_0x187fc9),_0x268567[_0x13e7be(0x27b)]()['gainTpFromTpMode'](_0x13e7be(0x273),_0x268567,_0x187fc9)):(_0x187fc9=Math[_0x13e7be(0x1b3)](_0x187fc9),_0x268567[_0x13e7be(0x250)](_0x13e7be(0x2a4),_0x268567,_0x187fc9),_0x23279b[_0x13e7be(0x250)](_0x13e7be(0x2a9),_0x268567,_0x187fc9),_0x268567[_0x13e7be(0x27b)]()['gainTpFromTpMode'](_0x13e7be(0x1c6),_0x268567,_0x187fc9));},VisuMZ[_0x101051(0x19c)][_0x101051(0x22e)]=Game_Action['prototype'][_0x101051(0x278)],Game_Action[_0x101051(0x19b)][_0x101051(0x278)]=function(_0x4dcd36,_0x5ed874){const _0x27ec08=_0x101051;VisuMZ[_0x27ec08(0x19c)][_0x27ec08(0x22e)][_0x27ec08(0x280)](this,_0x4dcd36,_0x5ed874);if(!_0x4dcd36[_0x27ec08(0x209)]()[_0x27ec08(0x25a)])return;const _0x12321a=this[_0x27ec08(0x1e5)]();_0x12321a[_0x27ec08(0x207)]()===_0x4dcd36[_0x27ec08(0x207)]()?(_0x12321a['gainTpFromTpMode'](_0x27ec08(0x1b9),_0x4dcd36,0x0),_0x4dcd36['gainTpFromTpMode']('GainAllyBuff',_0x4dcd36,0x0)):(_0x12321a['gainTpFromTpMode']('DealEnemyBuff',_0x4dcd36,0x0),_0x4dcd36[_0x27ec08(0x250)](_0x27ec08(0x235),_0x4dcd36,0x0));},VisuMZ[_0x101051(0x19c)]['Game_Action_itemEffectAddDebuff']=Game_Action[_0x101051(0x19b)][_0x101051(0x256)],Game_Action[_0x101051(0x19b)]['itemEffectAddDebuff']=function(_0x2b9a5a,_0x29d850){const _0x2987a3=_0x101051;VisuMZ['EnhancedTP'][_0x2987a3(0x298)][_0x2987a3(0x280)](this,_0x2b9a5a,_0x29d850);if(!_0x2b9a5a[_0x2987a3(0x209)]()['success'])return;const _0x86ff47=this[_0x2987a3(0x1e5)]();_0x86ff47[_0x2987a3(0x207)]()===_0x2b9a5a['isActor']()?(_0x86ff47[_0x2987a3(0x250)]('DealAllyDebuff',_0x2b9a5a,0x0),_0x2b9a5a['gainTpFromTpMode'](_0x2987a3(0x2c9),_0x2b9a5a,0x0)):(_0x86ff47[_0x2987a3(0x250)](_0x2987a3(0x1ce),_0x2b9a5a,0x0),_0x2b9a5a['gainTpFromTpMode'](_0x2987a3(0x1e8),_0x2b9a5a,0x0));},VisuMZ[_0x101051(0x19c)][_0x101051(0x1c1)]=Game_Action[_0x101051(0x19b)]['itemEffectAddState'],Game_Action[_0x101051(0x19b)]['itemEffectAddState']=function(_0x2fd257,_0x3ab25c){const _0x51add2=_0x101051,_0x20883c=_0x2fd257[_0x51add2(0x209)]()[_0x51add2(0x25a)];_0x2fd257[_0x51add2(0x209)]()[_0x51add2(0x25a)]=![],VisuMZ[_0x51add2(0x19c)][_0x51add2(0x1c1)][_0x51add2(0x280)](this,_0x2fd257,_0x3ab25c);if(!_0x2fd257[_0x51add2(0x209)]()[_0x51add2(0x25a)]){_0x2fd257[_0x51add2(0x209)]()[_0x51add2(0x25a)]=_0x20883c;return;}const _0x1e5723=this[_0x51add2(0x1e5)]();_0x1e5723[_0x51add2(0x207)]()===_0x2fd257['isActor']()?(_0x1e5723['gainTpFromTpMode'](_0x51add2(0x233),_0x2fd257,0x0),_0x2fd257[_0x51add2(0x250)](_0x51add2(0x2b1),_0x2fd257,0x0)):(_0x1e5723['gainTpFromTpMode'](_0x51add2(0x1ed),_0x2fd257,0x0),_0x2fd257[_0x51add2(0x250)](_0x51add2(0x1de),_0x2fd257,0x0));},VisuMZ[_0x101051(0x19c)][_0x101051(0x25d)]=Game_Action[_0x101051(0x19b)][_0x101051(0x1a0)],Game_Action[_0x101051(0x19b)][_0x101051(0x1a0)]=function(_0x2614cf){const _0x5a46ba=_0x101051;VisuMZ[_0x5a46ba(0x19c)][_0x5a46ba(0x25d)]['call'](this,_0x2614cf),this[_0x5a46ba(0x1f2)](_0x2614cf);},Game_Action[_0x101051(0x19b)]['applyItemEnhancedTPEffect']=function(_0x3a3217){const _0x470cab=_0x101051;if(!_0x3a3217)return;const _0xa790c9=this[_0x470cab(0x1bb)]()[_0x470cab(0x2a3)],_0x357f22=this['subject']();_0xa790c9[_0x470cab(0x205)](/<CHANGE TARGET TP MODE: (.*)>/i)&&_0x3a3217[_0x470cab(0x1bf)](String(RegExp['$1']));if(!_0x3a3217['isActor']())return;const _0x16e133=_0xa790c9[_0x470cab(0x205)](/<UNLOCK TP MODE: (.*)>/gi);if(_0x16e133)for(const _0x23be98 of _0x16e133){_0x23be98[_0x470cab(0x205)](/<UNLOCK TP MODE: (.*)>/i),_0x3a3217[_0x470cab(0x190)](String(RegExp['$1']));}if(_0xa790c9[_0x470cab(0x205)](/<UNLOCK TP MODES>\s*([\s\S]*)\s*<\/UNLOCK TP MODES>/i)){const _0x5eb9a2=String(RegExp['$1'])[_0x470cab(0x27e)](/[\r\n]+/);for(const _0x5abd88 of _0x5eb9a2){_0x3a3217[_0x470cab(0x190)](_0x5abd88);}}},VisuMZ[_0x101051(0x19c)][_0x101051(0x283)]=Game_Action[_0x101051(0x19b)]['applyGlobal'],Game_Action[_0x101051(0x19b)]['applyGlobal']=function(){const _0x19bea7=_0x101051;VisuMZ['EnhancedTP']['Game_Action_applyGlobal'][_0x19bea7(0x280)](this),this[_0x19bea7(0x181)]();},Game_Action[_0x101051(0x19b)][_0x101051(0x181)]=function(){const _0x406ccc=_0x101051,_0x1b69f2=this[_0x406ccc(0x1bb)]()[_0x406ccc(0x2a3)],_0x4d3b1d=this[_0x406ccc(0x1e5)]();_0x1b69f2['match'](/<CHANGE USER TP MODE: (.*)>/i)&&_0x4d3b1d['changeTpMode'](String(RegExp['$1']));},VisuMZ[_0x101051(0x19c)][_0x101051(0x208)]=Game_Action[_0x101051(0x19b)]['testApply'],Game_Action['prototype'][_0x101051(0x1f4)]=function(_0x25314d){const _0x853d55=_0x101051;if(this[_0x853d55(0x204)](_0x25314d))return!![];return VisuMZ['EnhancedTP'][_0x853d55(0x208)]['call'](this,_0x25314d);},Game_Action['prototype']['testApplyEnhancedTP']=function(_0x2587a2){const _0x19be46=_0x101051;if(!this[_0x19be46(0x1bb)]())return![];const _0x47956e=this[_0x19be46(0x1bb)]()[_0x19be46(0x2a3)],_0x2e4121=[/<CHANGE USER TP MODE: (.*)>/i,/<CHANGE TARGET TP MODE: (.*)>/i,/<UNLOCK TP MODE: (.*)>/gi,/<UNLOCK TP MODES>\s*([\s\S]*)\s*<\/UNLOCK TP MODES>/i];for(const _0x2ced72 of _0x2e4121){if(_0x47956e[_0x19be46(0x205)](_0x2ced72))return!![];}return![];},Game_BattlerBase[_0x101051(0x19b)]['initEnhancedTP']=function(){const _0x3bc525=_0x101051;this[_0x3bc525(0x1bf)](this[_0x3bc525(0x2bb)]());},Game_BattlerBase[_0x101051(0x19b)]['changeTpMode']=function(_0x3feb64){const _0x4b50f2=_0x101051;_0x3feb64=_0x3feb64[_0x4b50f2(0x1bd)]()[_0x4b50f2(0x191)]();if(!VisuMZ['EnhancedTP'][_0x4b50f2(0x1e3)][_0x3feb64])return;this[_0x4b50f2(0x2a1)]=_0x3feb64,this[_0x4b50f2(0x241)](_0x3feb64);},Game_BattlerBase['prototype'][_0x101051(0x2bb)]=function(){const _0x967dea=_0x101051;return VisuMZ[_0x967dea(0x19c)][_0x967dea(0x1a8)]['General'][_0x967dea(0x2b3)]['toUpperCase']()[_0x967dea(0x191)]();},Game_BattlerBase['prototype'][_0x101051(0x1d1)]=function(){const _0x25e3e2=_0x101051;if(this['_tpMode']===undefined)this[_0x25e3e2(0x23d)]();let _0x1b5baf=this[_0x25e3e2(0x2a1)];for(const _0x3cfde2 of this[_0x25e3e2(0x262)]()){if(!_0x3cfde2)continue;if(_0x3cfde2[_0x25e3e2(0x2a3)]['match'](/<FORCE TP MODE: (.*)>/i)){const _0x5c176d=String(RegExp['$1'])[_0x25e3e2(0x1bd)]()[_0x25e3e2(0x191)]();if(!VisuMZ[_0x25e3e2(0x19c)]['TpModes'][_0x5c176d])continue;_0x1b5baf=_0x5c176d;break;}}return VisuMZ['EnhancedTP'][_0x25e3e2(0x1e3)][_0x1b5baf['toUpperCase']()[_0x25e3e2(0x191)]()];},Game_BattlerBase[_0x101051(0x19b)][_0x101051(0x1f6)]=function(_0x460145,_0x34c268,_0x42c561){const _0x4e265c=_0x101051,_0x410ce6=this[_0x4e265c(0x1d1)]();if(!_0x410ce6)return 0x0;_0x460145=_0x4e265c(0x183)[_0x4e265c(0x2ca)](_0x460145);if(!_0x410ce6[_0x460145])return 0x0;try{let _0x547191=_0x410ce6[_0x460145](this,_0x34c268,_0x42c561);if(isNaN(_0x547191)||_0x547191===undefined||_0x547191===null){if($gameTemp['isPlaytest']()){const _0x33c7d3=_0x34c268[_0x4e265c(0x2a1)]||'Unnamed\x20Mode';console['log'](_0x4e265c(0x26e)[_0x4e265c(0x2ca)](_0x34c268[_0x4e265c(0x2bd)](),_0x33c7d3,_0x460145));}_0x547191=0x0;}return _0x547191;}catch(_0x5b23eb){if($gameTemp[_0x4e265c(0x270)]()){const _0x4d8cfc=_0x34c268[_0x4e265c(0x2a1)]||_0x4e265c(0x29b);console[_0x4e265c(0x251)](_0x4e265c(0x26e)['format'](_0x34c268[_0x4e265c(0x2bd)](),_0x4d8cfc,_0x460145));}return 0x0;}},VisuMZ[_0x101051(0x19c)][_0x101051(0x20b)]=Game_Battler['prototype']['gainSilentTp'],Game_Battler[_0x101051(0x19b)][_0x101051(0x1c2)]=function(_0x27b992){const _0x50a09f=_0x101051;this[_0x50a09f(0x295)]?this[_0x50a09f(0x19d)]=(this[_0x50a09f(0x19d)]+_0x27b992)[_0x50a09f(0x229)](0x0,this[_0x50a09f(0x254)]()):VisuMZ[_0x50a09f(0x19c)]['Game_Battler_gainSilentTp']['call'](this,_0x27b992);},Game_BattlerBase[_0x101051(0x19b)][_0x101051(0x250)]=function(_0x27461b,_0x3c5344,_0x43153e){const _0xd28532=_0x101051,_0x24f063=Math[_0xd28532(0x231)](this['tpModeValue'](_0x27461b,_0x3c5344,_0x43153e));this['gainSilentTp'](_0x24f063);},VisuMZ[_0x101051(0x19c)][_0x101051(0x253)]=Game_BattlerBase[_0x101051(0x19b)]['maxTp'],Game_BattlerBase[_0x101051(0x19b)]['maxTp']=function(){const _0x385c2b=_0x101051;if(this['tpMode']())return Math[_0x385c2b(0x231)](this['tpMode']()[_0x385c2b(0x1e9)](this,this,0x0));return VisuMZ[_0x385c2b(0x19c)][_0x385c2b(0x253)]['call'](this);},VisuMZ['EnhancedTP']['Game_BattlerBase_isPreserveTp']=Game_BattlerBase[_0x101051(0x19b)][_0x101051(0x222)],Game_BattlerBase[_0x101051(0x19b)][_0x101051(0x222)]=function(){const _0x283ab6=_0x101051;if(this['tpMode']())return this[_0x283ab6(0x1d1)]()[_0x283ab6(0x1fb)];return VisuMZ[_0x283ab6(0x19c)][_0x283ab6(0x2b5)][_0x283ab6(0x280)](this);},VisuMZ[_0x101051(0x19c)][_0x101051(0x232)]=Game_BattlerBase[_0x101051(0x19b)][_0x101051(0x2af)],Game_BattlerBase[_0x101051(0x19b)][_0x101051(0x2af)]=function(_0x431368){const _0xec6d3f=_0x101051;let _0x211b90=VisuMZ[_0xec6d3f(0x19c)][_0xec6d3f(0x232)]['call'](this,_0x431368);return _0x431368===0x5&&this[_0xec6d3f(0x1d1)]()&&(_0x211b90*=this['tpMode']()[_0xec6d3f(0x227)]),_0x211b90;},Game_BattlerBase[_0x101051(0x19b)][_0x101051(0x288)]=function(){const _0x5eadad=_0x101051;if(!Imported['VisuMZ_1_SkillsStatesCore'])return![];const _0x41b0f1=this[_0x5eadad(0x1d1)]();if(!_0x41b0f1)return![];if(!_0x41b0f1[_0x5eadad(0x195)])return![];const _0x4aeec7=_0x41b0f1[_0x5eadad(0x1d3)]||0x0;return this['tpRate']()>=_0x4aeec7;},Game_BattlerBase[_0x101051(0x19b)][_0x101051(0x264)]=function(){const _0x468f59=_0x101051,_0x38bb1b=this[_0x468f59(0x1d1)]();if(!_0x38bb1b)return![];return(_0x38bb1b['FlashSpeed']||0x1)['clamp'](0x1,0xff);},Game_BattlerBase['prototype']['tpGaugeFlashLightness']=function(){const _0x2afe27=_0x101051,_0x34fd9a=this[_0x2afe27(0x1d1)]();if(!_0x34fd9a)return![];return(_0x34fd9a[_0x2afe27(0x25c)]||0x0)['clamp'](0x0,0xff);},Game_Battler['prototype'][_0x101051(0x1af)]=function(){},VisuMZ['EnhancedTP'][_0x101051(0x2c6)]=Game_Battler[_0x101051(0x19b)][_0x101051(0x21f)],Game_Battler[_0x101051(0x19b)][_0x101051(0x21f)]=function(_0x475322){const _0x4e89d5=_0x101051;VisuMZ[_0x4e89d5(0x19c)][_0x4e89d5(0x2c6)][_0x4e89d5(0x280)](this,_0x475322),this[_0x4e89d5(0x250)](_0x4e89d5(0x1e1),this,0x0);},VisuMZ[_0x101051(0x19c)]['Game_Battler_useItem']=Game_Battler['prototype']['useItem'],Game_Battler[_0x101051(0x19b)][_0x101051(0x275)]=function(_0x149b1d){const _0x348343=_0x101051;VisuMZ['EnhancedTP']['Game_Battler_useItem'][_0x348343(0x280)](this,_0x149b1d),this[_0x348343(0x289)](_0x149b1d)&&this[_0x348343(0x250)](_0x348343(0x261),this,0x0),DataManager[_0x348343(0x189)](_0x149b1d)&&this['gainTpFromTpMode'](_0x348343(0x18b),this,0x0);},Game_Battler[_0x101051(0x19b)][_0x101051(0x289)]=function(_0xee45eb){const _0x45e9d5=_0x101051;if(!_0xee45eb)return![];if(!DataManager[_0x45e9d5(0x2b4)](_0xee45eb))return![];if(_0xee45eb['id']===this[_0x45e9d5(0x215)]())return![];if(_0xee45eb['id']===this['guardSkillId']())return![];return!![];},VisuMZ[_0x101051(0x19c)][_0x101051(0x271)]=Game_Battler[_0x101051(0x19b)][_0x101051(0x2b6)],Game_Battler[_0x101051(0x19b)][_0x101051(0x2b6)]=function(){const _0x58cd38=_0x101051;if(!$gameParty[_0x58cd38(0x1d2)]())return![];;this['_regeneratingTp']=!![];const _0x119ff0=Math[_0x58cd38(0x231)](this[_0x58cd38(0x254)]()*this[_0x58cd38(0x1b8)]);this[_0x58cd38(0x1c2)](_0x119ff0),this[_0x58cd38(0x250)](_0x58cd38(0x238),this,0x0),this[_0x58cd38(0x22d)]<this[_0x58cd38(0x1c3)]/0x4&&this['gainTpFromTpMode'](_0x58cd38(0x23c),this,0x0),this[_0x58cd38(0x22d)]>=this['mhp']&&this[_0x58cd38(0x250)](_0x58cd38(0x28d),this,0x0),this[_0x58cd38(0x21c)]<this[_0x58cd38(0x2a2)]/0x4&&this['gainTpFromTpMode']('CriticalMp',this,0x0),this[_0x58cd38(0x21c)]>=this[_0x58cd38(0x2a2)]&&this[_0x58cd38(0x250)](_0x58cd38(0x221),this,0x0),this[_0x58cd38(0x27b)]()['aliveMembers']()['length']<=0x1&&this[_0x58cd38(0x250)](_0x58cd38(0x1da),this,0x0),this[_0x58cd38(0x295)]=undefined,this['refresh']();},Game_Battler[_0x101051(0x19b)][_0x101051(0x1db)]=function(_0x46d1c7){},VisuMZ[_0x101051(0x19c)]['Game_Battler_addState']=Game_Battler['prototype']['addState'],Game_Battler[_0x101051(0x19b)]['addState']=function(_0x243518){const _0x30a604=_0x101051,_0x457bee=this[_0x30a604(0x19a)]();VisuMZ['EnhancedTP'][_0x30a604(0x223)][_0x30a604(0x280)](this,_0x243518),_0x243518===this['deathStateId']()&&this[_0x30a604(0x1b6)]()&&_0x457bee&&(this[_0x30a604(0x27b)]()[_0x30a604(0x250)]('KillAlly',this,0x0),this[_0x30a604(0x22c)]()[_0x30a604(0x250)]('KillEnemy',this,0x0));},Game_Battler[_0x101051(0x19b)][_0x101051(0x241)]=function(_0x11c221){const _0x44e3bb=_0x101051;this[_0x44e3bb(0x1eb)]={},this['_tp']=Math[_0x44e3bb(0x28e)](this['_tp'],this[_0x44e3bb(0x254)]());},VisuMZ[_0x101051(0x19c)]['Game_Actor_setup']=Game_Actor[_0x101051(0x19b)]['setup'],Game_Actor[_0x101051(0x19b)][_0x101051(0x1a6)]=function(_0x5d100f){const _0x31e86c=_0x101051;VisuMZ[_0x31e86c(0x19c)]['Game_Actor_setup'][_0x31e86c(0x280)](this,_0x5d100f),this[_0x31e86c(0x23d)]();},Game_Actor[_0x101051(0x19b)][_0x101051(0x23d)]=function(){const _0x4702e7=_0x101051;this['_availableTpModes']=[],Game_Battler[_0x4702e7(0x19b)]['initEnhancedTP'][_0x4702e7(0x280)](this),this[_0x4702e7(0x26d)](),this[_0x4702e7(0x28a)]();},Game_Actor[_0x101051(0x19b)][_0x101051(0x2bb)]=function(){const _0x56487b=_0x101051;return this[_0x56487b(0x237)]()&&this['actor']()[_0x56487b(0x2a3)][_0x56487b(0x205)](/<TP MODE: (.*)>/i)?String(RegExp['$1'])[_0x56487b(0x1bd)]()[_0x56487b(0x191)]():Game_Battler[_0x56487b(0x19b)][_0x56487b(0x2bb)][_0x56487b(0x280)](this);},Game_Actor['prototype'][_0x101051(0x241)]=function(_0x517b1b){const _0x17b156=_0x101051;_0x517b1b=_0x517b1b[_0x17b156(0x1bd)]()[_0x17b156(0x191)](),Game_Battler[_0x17b156(0x19b)][_0x17b156(0x241)][_0x17b156(0x280)](this,_0x517b1b),this[_0x17b156(0x190)](_0x517b1b);},Game_Actor[_0x101051(0x19b)][_0x101051(0x190)]=function(_0x4caf45){const _0x418820=_0x101051;_0x4caf45=_0x4caf45[_0x418820(0x1bd)]()[_0x418820(0x191)]();if(!VisuMZ['EnhancedTP'][_0x418820(0x1e3)][_0x4caf45])return;this[_0x418820(0x243)]=this[_0x418820(0x243)]||[],!this[_0x418820(0x243)][_0x418820(0x1ab)](_0x4caf45)&&(this[_0x418820(0x243)][_0x418820(0x2aa)](_0x4caf45),this['sortTpModes']());},VisuMZ[_0x101051(0x19c)][_0x101051(0x220)]=function(_0x167efc){const _0x57e01e=_0x101051,_0x4e6c1d=[];for(const _0xb9e85 of VisuMZ[_0x57e01e(0x19c)][_0x57e01e(0x1ff)]){if(_0x167efc['includes'](_0xb9e85))_0x4e6c1d[_0x57e01e(0x2aa)](_0xb9e85);}return _0x4e6c1d;},Game_Actor[_0x101051(0x19b)]['sortTpModes']=function(){const _0x450721=_0x101051;if(this['_availableTpModes']===undefined)this[_0x450721(0x23d)]();this['_availableTpModes']=VisuMZ[_0x450721(0x19c)][_0x450721(0x220)](this['_availableTpModes']);},Game_Actor['prototype']['availableTpModes']=function(){const _0x40dca3=_0x101051;if(this[_0x40dca3(0x243)]===undefined)this[_0x40dca3(0x23d)]();this[_0x40dca3(0x26d)]();let _0x516f51=this[_0x40dca3(0x243)][_0x40dca3(0x225)](_0xe25d57=>VisuMZ[_0x40dca3(0x19c)][_0x40dca3(0x1e3)][_0xe25d57]);return _0x516f51[_0x40dca3(0x20c)](null);},Game_Actor[_0x101051(0x19b)][_0x101051(0x26d)]=function(){const _0x56bd1f=_0x101051;for(const _0x462077 of $gameParty[_0x56bd1f(0x1ea)]()){this[_0x56bd1f(0x190)](_0x462077[_0x56bd1f(0x1bd)]()[_0x56bd1f(0x191)]());}},Game_Actor[_0x101051(0x19b)][_0x101051(0x28a)]=function(){const _0x115d80=_0x101051;if(this['actor']()&&this[_0x115d80(0x237)]()['note']['match'](/<STARTING TP (?:MODE|MODES)>\s*([\s\S]*)\s*<\/STARTING TP (?:MODE|MODES)>/i)){const _0x10bb41=String(RegExp['$1'])[_0x115d80(0x27e)](/[\r\n]+/);for(const _0x39aa5d of _0x10bb41){this[_0x115d80(0x190)](_0x39aa5d[_0x115d80(0x1bd)]()[_0x115d80(0x191)]());}}},VisuMZ[_0x101051(0x19c)]['Game_Actor_learnSkill']=Game_Actor[_0x101051(0x19b)][_0x101051(0x1df)],Game_Actor['prototype'][_0x101051(0x1df)]=function(_0x25f653){const _0x2132d0=_0x101051;VisuMZ[_0x2132d0(0x19c)][_0x2132d0(0x186)]['call'](this,_0x25f653),this[_0x2132d0(0x29d)](_0x25f653);},Game_Actor[_0x101051(0x19b)][_0x101051(0x29d)]=function(_0x2a419c){const _0x54ee32=_0x101051;if(!$dataSkills[_0x2a419c])return;const _0x159998=$dataSkills[_0x2a419c][_0x54ee32(0x2a3)],_0x4027ee=_0x159998[_0x54ee32(0x205)](/<LEARN TP MODE: (.*)>/gi);if(_0x4027ee)for(const _0x271797 of _0x4027ee){_0x271797[_0x54ee32(0x205)](/<LEARN TP MODE: (.*)>/i),this[_0x54ee32(0x190)](String(RegExp['$1']));}if(_0x159998['match'](/<LEARN TP MODES>\s*([\s\S]*)\s*<\/LEARN TP MODES>/i)){const _0x550c4f=String(RegExp['$1'])[_0x54ee32(0x27e)](/[\r\n]+/);for(const _0x982bd0 of _0x550c4f){this[_0x54ee32(0x190)](_0x982bd0);}}},Game_Enemy['prototype'][_0x101051(0x2bb)]=function(){const _0x3d2943=_0x101051;return this['enemy']()[_0x3d2943(0x2a3)]['match'](/<TP MODE: (.*)>/i)?String(RegExp['$1'])['toUpperCase']()[_0x3d2943(0x191)]():Game_Battler['prototype'][_0x3d2943(0x2bb)][_0x3d2943(0x280)](this);},Game_Unit['prototype'][_0x101051(0x250)]=function(_0x554bcb,_0xfd8a0e,_0x329f58){const _0x3ae908=_0x101051;for(const _0x5320ea of this['aliveMembers']()){if(!_0x5320ea)continue;_0x5320ea[_0x3ae908(0x250)](_0x554bcb,_0xfd8a0e,_0x329f58);}},VisuMZ['EnhancedTP'][_0x101051(0x230)]=Game_Party[_0x101051(0x19b)][_0x101051(0x267)],Game_Party[_0x101051(0x19b)]['initialize']=function(){const _0x312f5f=_0x101051;VisuMZ[_0x312f5f(0x19c)][_0x312f5f(0x230)]['call'](this),this[_0x312f5f(0x194)]();},Game_Party['prototype'][_0x101051(0x194)]=function(){const _0x5e84a3=_0x101051;this[_0x5e84a3(0x2b2)]=[];for(const _0x3e41e2 of VisuMZ[_0x5e84a3(0x19c)]['Settings'][_0x5e84a3(0x1f1)][_0x5e84a3(0x1ef)]){this[_0x5e84a3(0x2b2)]['push'](_0x3e41e2['toUpperCase']()[_0x5e84a3(0x191)]());}},Game_Party['prototype'][_0x101051(0x1ea)]=function(){const _0x126757=_0x101051;if(this['_tpModes']===undefined)this[_0x126757(0x194)]();return this[_0x126757(0x2b2)];},VisuMZ['EnhancedTP'][_0x101051(0x1fe)]=Scene_Skill['prototype']['create'],Scene_Skill[_0x101051(0x19b)][_0x101051(0x2a8)]=function(){const _0x3c5981=_0x101051;VisuMZ['EnhancedTP'][_0x3c5981(0x1fe)]['call'](this),this[_0x3c5981(0x28f)]();},VisuMZ[_0x101051(0x19c)][_0x101051(0x1ad)]=Scene_Skill[_0x101051(0x19b)][_0x101051(0x1d5)],Scene_Skill[_0x101051(0x19b)]['createSkillTypeWindow']=function(){const _0x346f5d=_0x101051;VisuMZ['EnhancedTP'][_0x346f5d(0x1ad)]['call'](this),this['_skillTypeWindow'][_0x346f5d(0x1a9)](_0x346f5d(0x1d1),this[_0x346f5d(0x213)][_0x346f5d(0x2cd)](this));},Scene_Skill['prototype'][_0x101051(0x28f)]=function(){const _0x5ca2e6=_0x101051,_0x357988=this[_0x5ca2e6(0x210)]();this['_tpModeWindow']=new Window_TpModes(_0x357988),this[_0x5ca2e6(0x1f7)]['setHelpWindow'](this[_0x5ca2e6(0x1a1)]),this[_0x5ca2e6(0x1f7)][_0x5ca2e6(0x1a9)]('ok',this['onTpModeOk'][_0x5ca2e6(0x2cd)](this)),this[_0x5ca2e6(0x1f7)][_0x5ca2e6(0x1a9)]('cancel',this['onTpModeCancel'][_0x5ca2e6(0x2cd)](this)),this['addWindow'](this['_tpModeWindow']);const _0x5d4f6c=VisuMZ[_0x5ca2e6(0x19c)][_0x5ca2e6(0x1a8)][_0x5ca2e6(0x1f1)][_0x5ca2e6(0x255)];this[_0x5ca2e6(0x1f7)][_0x5ca2e6(0x25e)](_0x5d4f6c||0x0);},Scene_Skill[_0x101051(0x19b)]['tpModeWindowRect']=function(){const _0x395194=_0x101051,_0x25f570=0x0,_0x5bb02d=this[_0x395194(0x2a5)]['y']+this['_statusWindow']['height'],_0x374561=Graphics[_0x395194(0x1e0)],_0x5f40aa=this[_0x395194(0x1c0)]()-this['_statusWindow'][_0x395194(0x24e)];return new Rectangle(_0x25f570,_0x5bb02d,_0x374561,_0x5f40aa);},Scene_Skill['prototype'][_0x101051(0x213)]=function(){const _0xafea3d=_0x101051;this[_0xafea3d(0x1f7)]['activate'](),this['_tpModeWindow']['selectLast']();},Scene_Skill[_0x101051(0x19b)][_0x101051(0x1f8)]=function(){const _0x3547cc=_0x101051;this[_0x3547cc(0x1f7)][_0x3547cc(0x2bc)]();const _0x41d144=this[_0x3547cc(0x1f7)][_0x3547cc(0x1bb)]();if(!_0x41d144)return;this[_0x3547cc(0x237)]()['changeTpMode'](_0x41d144[_0x3547cc(0x182)]),this[_0x3547cc(0x1f7)][_0x3547cc(0x2b9)](),this[_0x3547cc(0x2a5)][_0x3547cc(0x2b9)]();},Scene_Skill[_0x101051(0x19b)]['onTpModeCancel']=function(){const _0x2e84ed=_0x101051;this[_0x2e84ed(0x1f7)][_0x2e84ed(0x21b)](),this[_0x2e84ed(0x1c5)]['activate']();},VisuMZ[_0x101051(0x19c)][_0x101051(0x29c)]=Scene_Skill[_0x101051(0x19b)][_0x101051(0x21d)],Scene_Skill['prototype'][_0x101051(0x21d)]=function(){const _0x1be8f4=_0x101051;VisuMZ[_0x1be8f4(0x19c)][_0x1be8f4(0x29c)][_0x1be8f4(0x280)](this);if(this['_tpModeWindow'])this[_0x1be8f4(0x1f7)][_0x1be8f4(0x22f)](this['actor']());},VisuMZ[_0x101051(0x19c)]['Sprite_Gauge_setup']=Sprite_Gauge[_0x101051(0x19b)][_0x101051(0x1a6)],Sprite_Gauge[_0x101051(0x19b)]['setup']=function(_0x50ce6e,_0x722f27){const _0x2001aa=_0x101051;VisuMZ[_0x2001aa(0x19c)][_0x2001aa(0x290)]['call'](this,_0x50ce6e,_0x722f27),this['_statusType']==='tp'&&(this[_0x2001aa(0x244)](),this[_0x2001aa(0x188)]());},Sprite_Gauge[_0x101051(0x19b)][_0x101051(0x244)]=function(){const _0x219c8f=_0x101051;!this[_0x219c8f(0x224)]&&(this[_0x219c8f(0x224)]=new Sprite(),this[_0x219c8f(0x211)](this[_0x219c8f(0x224)])),!this[_0x219c8f(0x197)]&&(this['_tpGaugeSprite']=new Sprite(),this[_0x219c8f(0x211)](this[_0x219c8f(0x197)])),!this[_0x219c8f(0x203)]&&(this[_0x219c8f(0x203)]=new Sprite(),this[_0x219c8f(0x211)](this['_tpTextSprite']));},VisuMZ[_0x101051(0x19c)][_0x101051(0x249)]=Sprite_Gauge[_0x101051(0x19b)][_0x101051(0x1d9)],Sprite_Gauge[_0x101051(0x19b)][_0x101051(0x1d9)]=function(){const _0x202655=_0x101051;let _0x5e73ca=$dataSystem[_0x202655(0x1ac)][_0x202655(0x27f)][0x7];this[_0x202655(0x27d)]==='tp'&&this[_0x202655(0x216)](),VisuMZ['EnhancedTP']['Sprite_Gauge_redraw'][_0x202655(0x280)](this),this[_0x202655(0x27d)]==='tp'&&this[_0x202655(0x24d)](),this['_statusType']==='tp'&&($dataSystem[_0x202655(0x1ac)][_0x202655(0x27f)][0x7]=_0x5e73ca);},Sprite_Gauge['prototype'][_0x101051(0x24d)]=function(){const _0x4522ba=_0x101051;this['_tpTextSprite']&&(this['_tpTextSprite'][_0x4522ba(0x240)]=this[_0x4522ba(0x240)]),this[_0x4522ba(0x252)](0x0,0x0,0x0,0x0);},VisuMZ[_0x101051(0x19c)]['Sprite_Gauge_drawFullGauge']=Sprite_Gauge['prototype'][_0x101051(0x1ec)],Sprite_Gauge['prototype'][_0x101051(0x1ec)]=function(_0x51d9c7,_0x415698,_0x4bb653,_0x54310c,_0x458745,_0x35062c){const _0x1ae643=_0x101051;this[_0x1ae643(0x27d)]==='tp'&&this[_0x1ae643(0x197)]?this[_0x1ae643(0x18f)](_0x51d9c7,_0x415698,_0x4bb653,_0x54310c,_0x458745,_0x35062c):VisuMZ[_0x1ae643(0x19c)][_0x1ae643(0x1ee)][_0x1ae643(0x280)](this,_0x51d9c7,_0x415698,_0x4bb653,_0x54310c,_0x458745,_0x35062c);},Sprite_Gauge[_0x101051(0x19b)][_0x101051(0x1cf)]=function(_0x5afe6e){const _0x5181c4=_0x101051;!this[_0x5181c4(0x224)][_0x5181c4(0x240)]&&(this['_tpGaugeBack'][_0x5181c4(0x240)]=new Bitmap(this[_0x5181c4(0x240)][_0x5181c4(0x246)],this[_0x5181c4(0x240)]['height'])),!this[_0x5181c4(0x197)][_0x5181c4(0x240)]&&(this[_0x5181c4(0x197)][_0x5181c4(0x240)]=new Bitmap(this[_0x5181c4(0x240)][_0x5181c4(0x246)],this[_0x5181c4(0x240)]['height'])),_0x5afe6e&&(this[_0x5181c4(0x224)][_0x5181c4(0x240)][_0x5181c4(0x2c7)](),this['_tpGaugeSprite']['bitmap'][_0x5181c4(0x2c7)]());},Sprite_Gauge['prototype'][_0x101051(0x18f)]=function(_0x5a0a7d,_0x2fcb44,_0x14786a,_0xa1e389,_0x494903,_0xdececd){const _0x2bb9b2=_0x101051;this[_0x2bb9b2(0x1cf)](!![]);const _0x1b4e3e=this[_0x2bb9b2(0x2c4)](),_0x2ca956=Math[_0x2bb9b2(0x231)]((_0x494903-0x2)*_0x1b4e3e),_0x5cb562=_0xdececd-0x2,_0x55a636=this['gaugeBackColor']();this[_0x2bb9b2(0x224)][_0x2bb9b2(0x240)][_0x2bb9b2(0x1c4)](_0x14786a,_0xa1e389,_0x494903,_0xdececd,_0x55a636),_0x5a0a7d=this['changeTpCustomColor'](_0x5a0a7d,0x1),_0x2fcb44=this[_0x2bb9b2(0x277)](_0x2fcb44,0x2),this[_0x2bb9b2(0x197)][_0x2bb9b2(0x240)][_0x2bb9b2(0x29e)](_0x14786a+0x1,_0xa1e389+0x1,_0x2ca956,_0x5cb562,_0x5a0a7d,_0x2fcb44);},VisuMZ[_0x101051(0x19c)][_0x101051(0x1a7)]=Sprite_Gauge['prototype'][_0x101051(0x200)],Sprite_Gauge[_0x101051(0x19b)][_0x101051(0x200)]=function(_0x2ff5f8,_0x4b6d45,_0x4691f7,_0x2b53f2){const _0x1210ab=_0x101051;this[_0x1210ab(0x27d)]==='tp'&&this[_0x1210ab(0x197)]?this[_0x1210ab(0x266)](_0x2ff5f8,_0x4b6d45,_0x4691f7,_0x2b53f2):VisuMZ['EnhancedTP'][_0x1210ab(0x1a7)]['call'](this,_0x2ff5f8,_0x4b6d45,_0x4691f7,_0x2b53f2);},Sprite_Gauge[_0x101051(0x19b)][_0x101051(0x266)]=function(_0xd24a84,_0x4f442f,_0x345767,_0x5bca3b){const _0x17c5c0=_0x101051;this[_0x17c5c0(0x1cf)](!![]);const _0x3530e7=this[_0x17c5c0(0x2c4)](),_0x36df05=Math[_0x17c5c0(0x231)]((_0x345767-0x2)*_0x3530e7),_0x1d0653=_0x5bca3b-0x2,_0x1a4231=this[_0x17c5c0(0x20f)](),_0x547d2b=this[_0x17c5c0(0x277)](this[_0x17c5c0(0x257)](),0x1),_0x20d970=this['changeTpCustomColor'](this['gaugeColor2'](),0x2);this[_0x17c5c0(0x224)]['bitmap'][_0x17c5c0(0x1c4)](_0xd24a84,_0x4f442f,_0x345767,_0x5bca3b,_0x1a4231),this[_0x17c5c0(0x197)][_0x17c5c0(0x240)][_0x17c5c0(0x29e)](_0xd24a84+0x1,_0x4f442f+0x1,_0x36df05,_0x1d0653,_0x547d2b,_0x20d970);},VisuMZ[_0x101051(0x19c)]['Sprite_Gauge_update']=Sprite_Gauge[_0x101051(0x19b)][_0x101051(0x188)],Sprite_Gauge[_0x101051(0x19b)][_0x101051(0x188)]=function(){const _0x225c00=_0x101051;VisuMZ[_0x225c00(0x19c)]['Sprite_Gauge_update'][_0x225c00(0x280)](this),this[_0x225c00(0x2ab)]();},Sprite_Gauge[_0x101051(0x19b)][_0x101051(0x2ab)]=function(){const _0x4478c1=_0x101051;if(this[_0x4478c1(0x27d)]!=='tp')return;if(!this[_0x4478c1(0x197)])return;if(!this[_0x4478c1(0x2ae)])return;const _0x3d54f9=this[_0x4478c1(0x2ae)]['tpMode']();this[_0x4478c1(0x26c)]!==_0x3d54f9&&(this[_0x4478c1(0x26c)]=_0x3d54f9,this[_0x4478c1(0x1d9)]());if(this[_0x4478c1(0x2ae)][_0x4478c1(0x288)]()){const _0x5d28db=this[_0x4478c1(0x2ae)][_0x4478c1(0x264)]();this[_0x4478c1(0x197)][_0x4478c1(0x2c2)](this[_0x4478c1(0x197)][_0x4478c1(0x2c1)]+_0x5d28db);const _0x2b8e60=this[_0x4478c1(0x2ae)][_0x4478c1(0x1ba)]();this[_0x4478c1(0x197)][_0x4478c1(0x206)]([0xff,0xff,0xff,_0x2b8e60]);}else this[_0x4478c1(0x197)][_0x4478c1(0x206)]([0xff,0xff,0xff,0x0]),this[_0x4478c1(0x197)][_0x4478c1(0x2c2)](0x0);},Sprite_Gauge[_0x101051(0x19b)]['changeBattlerTpLabel']=function(){const _0x1d9aca=_0x101051;if(!this[_0x1d9aca(0x2ae)])return;const _0x211255=this[_0x1d9aca(0x2ae)][_0x1d9aca(0x1d1)]();_0x211255[_0x1d9aca(0x2ba)]&&($dataSystem[_0x1d9aca(0x1ac)][_0x1d9aca(0x27f)][0x7]=_0x211255['CustomLabel'][_0x1d9aca(0x191)]());},Sprite_Gauge['prototype']['changeTpCustomColor']=function(_0x41b380,_0x2388a4){const _0x7780a1=_0x101051;if(!this['_battler'])return _0x41b380;const _0x5c2fdf=this[_0x7780a1(0x2ae)]['tpMode'](),_0xa9c22e=_0x7780a1(0x28c)[_0x7780a1(0x2ca)](_0x2388a4);return _0x5c2fdf[_0xa9c22e]?ColorManager[_0x7780a1(0x1b7)](_0x5c2fdf[_0xa9c22e]):_0x41b380;},Window_Base['prototype']['drawTpMode']=function(_0x533bd1,_0x32ffd4,_0x282586,_0x2b2654,_0x1e4e5c){const _0x24da21=_0x101051;if(!_0x533bd1)return;const _0x34c412=ImageManager[_0x24da21(0x299)]||0x20,_0x235960=_0x34c412-ImageManager[_0x24da21(0x1c7)],_0x1f95ac=_0x34c412+0x4,_0x3edc29=_0x282586+(this[_0x24da21(0x1be)]()-ImageManager[_0x24da21(0x2c8)])/0x2,_0x5ec12e=Math[_0x24da21(0x272)](0x0,_0x2b2654-_0x1f95ac);this[_0x24da21(0x27a)](),_0x1e4e5c&&_0x1e4e5c[_0x24da21(0x1d1)]()===_0x533bd1&&this[_0x24da21(0x284)](ColorManager[_0x24da21(0x242)]()),this['drawIcon'](_0x533bd1['Icon'],_0x32ffd4+Math[_0x24da21(0x1ca)](_0x235960/0x2),_0x3edc29),this[_0x24da21(0x23a)](_0x533bd1[_0x24da21(0x182)],_0x32ffd4+_0x1f95ac,_0x282586,_0x5ec12e);},VisuMZ[_0x101051(0x19c)][_0x101051(0x247)]=Window_SkillType[_0x101051(0x19b)][_0x101051(0x274)],Window_SkillType['prototype'][_0x101051(0x274)]=function(){const _0x9c82ab=_0x101051;VisuMZ[_0x9c82ab(0x19c)]['Window_SkillType_makeCommandList'][_0x9c82ab(0x280)](this),this[_0x9c82ab(0x20a)]();},Window_SkillType[_0x101051(0x19b)]['addTpModeCommand']=function(){const _0x4171ba=_0x101051;if(!this[_0x4171ba(0x198)]())return;let _0x29ea5d=TextManager[_0x4171ba(0x1c9)][_0x4171ba(0x2ca)](TextManager['tp']);Imported[_0x4171ba(0x2b8)]&&(this['commandStyle']()!==_0x4171ba(0x1a5)&&(_0x29ea5d=_0x4171ba(0x291)['format'](ImageManager['tpModesCommandIcon'],_0x29ea5d))),this[_0x4171ba(0x23f)](_0x29ea5d,_0x4171ba(0x1d1),!![],'tpMode');},Window_SkillType[_0x101051(0x19b)][_0x101051(0x198)]=function(){return $gameSystem['showTpModeInSceneSkill']();},VisuMZ[_0x101051(0x19c)][_0x101051(0x22a)]=Window_SkillList[_0x101051(0x19b)][_0x101051(0x263)],Window_SkillList[_0x101051(0x19b)][_0x101051(0x263)]=function(_0xc8030e){const _0x58a8b4=_0x101051,_0x4760ea=this[_0x58a8b4(0x20e)]!==_0xc8030e;if(!_0x4760ea)return;this[_0x58a8b4(0x2cc)]();const _0x22be9c=SceneManager[_0x58a8b4(0x1d0)][_0x58a8b4(0x1f7)];if(_0x22be9c)_0x22be9c[_0x58a8b4(0x1f0)]();const _0x1b603f=this['_statusWindow'];if(_0x1b603f)_0x1b603f[_0x58a8b4(0x2cc)]();VisuMZ['EnhancedTP']['Window_SkillList_setStypeId'][_0x58a8b4(0x280)](this,_0xc8030e);if(_0x4760ea&&_0x22be9c&&_0xc8030e==='tpMode'){if(_0x1b603f)_0x1b603f['hide']();this[_0x58a8b4(0x1f0)](),_0x22be9c['show']();}};function _0x2696(_0x70f38b,_0x19fb41){const _0xe722ed=_0xe722();return _0x2696=function(_0x269671,_0x6bd501){_0x269671=_0x269671-0x181;let _0x3ab308=_0xe722ed[_0x269671];return _0x3ab308;},_0x2696(_0x70f38b,_0x19fb41);}function Window_TpModes(){const _0x45ed53=_0x101051;this[_0x45ed53(0x267)](...arguments);}Window_TpModes[_0x101051(0x19b)]=Object[_0x101051(0x2a8)](Window_Selectable[_0x101051(0x19b)]),Window_TpModes['prototype'][_0x101051(0x19e)]=Window_TpModes,Window_TpModes['prototype']['initialize']=function(_0x66dd30){const _0x68c115=_0x101051;Window_Selectable[_0x68c115(0x19b)][_0x68c115(0x267)][_0x68c115(0x280)](this,_0x66dd30),this[_0x68c115(0x1aa)]=null,this[_0x68c115(0x24f)]=[],this[_0x68c115(0x1f0)]();},Window_TpModes[_0x101051(0x19b)][_0x101051(0x22f)]=function(_0x2cf02a){const _0x5a3e00=_0x101051;this[_0x5a3e00(0x1aa)]!==_0x2cf02a&&(this['_actor']=_0x2cf02a,this[_0x5a3e00(0x2b9)](),this[_0x5a3e00(0x184)](0x0,0x0));},Window_TpModes['prototype'][_0x101051(0x2b7)]=function(){return 0x2;},Window_TpModes[_0x101051(0x19b)][_0x101051(0x212)]=function(){return 0x10;},Window_TpModes['prototype'][_0x101051(0x21e)]=function(){const _0x3a9ef8=_0x101051;return this[_0x3a9ef8(0x24f)]?this[_0x3a9ef8(0x24f)][_0x3a9ef8(0x265)]:0x1;},Window_TpModes[_0x101051(0x19b)][_0x101051(0x1bb)]=function(){const _0x7e1a19=_0x101051;return this[_0x7e1a19(0x18c)](this[_0x7e1a19(0x2c5)]());},Window_TpModes[_0x101051(0x19b)][_0x101051(0x18c)]=function(_0x5a17da){const _0x159d84=_0x101051;return this['_data']&&_0x5a17da>=0x0?this[_0x159d84(0x24f)][_0x5a17da]:null;},Window_TpModes[_0x101051(0x19b)][_0x101051(0x2a7)]=function(){const _0x554418=_0x101051;this[_0x554418(0x1aa)]?this[_0x554418(0x24f)]=this[_0x554418(0x1aa)][_0x554418(0x201)]():this[_0x554418(0x24f)]=[];},Window_TpModes['prototype'][_0x101051(0x218)]=function(){const _0x5799e1=_0x101051;this[_0x5799e1(0x20d)](0x0);},Window_TpModes[_0x101051(0x19b)][_0x101051(0x24a)]=function(_0x4392c7){const _0xb6fd1d=_0x101051,_0x38c0c3=this[_0xb6fd1d(0x18c)](_0x4392c7);if(!_0x38c0c3)return;const _0x143310=this[_0xb6fd1d(0x2b0)](_0x4392c7);this['drawTpMode'](_0x38c0c3,_0x143310['x'],_0x143310['y'],_0x143310['width'],this[_0xb6fd1d(0x1aa)]);},Window_TpModes[_0x101051(0x19b)]['updateHelp']=function(){const _0x39c4ec=_0x101051;this[_0x39c4ec(0x1d4)](this[_0x39c4ec(0x1bb)]());},Window_TpModes[_0x101051(0x19b)][_0x101051(0x2b9)]=function(){const _0x71cc2c=_0x101051;this[_0x71cc2c(0x2a7)](),Window_Selectable['prototype']['refresh']['call'](this);},Window_TpModes[_0x101051(0x19b)][_0x101051(0x2c0)]=function(){SoundManager['playEquip']();};function _0xe722(){const _0x2157d4=['clamp','Window_SkillList_setStypeId','executeHpDamage','opponentsUnit','_hp','Game_Action_itemEffectAddBuff','setActor','Game_Party_initialize','floor','Game_BattlerBase_sparam','DealAllyState','AllyHpDmg','GainEnemyBuff','23143CTBfZf','actor','TpRegen','TakeHpHeal','drawText','Game_Action_apply','CriticalHp','initEnhancedTP','evaded','addCommand','bitmap','onChangeTpMode','tpCostColor','_availableTpModes','createEnhancedTpChildSprites','MaxFormula','width','Window_SkillType_makeCommandList','KillAlly','Sprite_Gauge_redraw','drawItem','onDatabaseLoaded','TakeMpDmg','redrawEnhancedTp','height','_data','gainTpFromTpMode','log','setFrame','Game_BattlerBase_maxTp','maxTp','TpWindowBgType','itemEffectAddDebuff','gaugeColor1','Evasion','ActorChangeTPMode','success','7469127NRpGki','FlashLightness','Game_Action_applyItemUserEffect','setBackgroundType','Game_Action_executeHpDamage','JSON','UseSkill','traitObjects','setStypeId','tpGaugeFlashSpeed','length','drawGaugeRectEnhancedTp','initialize','DealHpDmg','2CNrwNT','ActorUnlockTPMode','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20damage\x20=\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20heal\x20=\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20%1;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_tpModeCache','learnAvailablePartyTpModes','ERROR\x20-\x20Bad\x20JavaScript\x20TP\x20Formula:\x20%1,\x20%2,\x20%3','STRUCT','isPlaytest','Game_Battler_regenerateTp','max','AllyMpDmg','makeCommandList','useItem','parse','changeTpCustomColor','itemEffectAddBuff','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','resetTextColor','friendsUnit','Scene_Boot_onDatabaseLoaded','_statusType','split','basic','call','registerCommand','FleeBattle','Game_Action_applyGlobal','changeTextColor','4551665nlxOQG','missed','Game_Action_executeMpDamage','isTpGaugeFlashing','skillIsNotAttackGuard','learnAvailableActorTpModes','11732DmWJFA','CustomColor%1','FullHp','min','createTpModeWindow','Sprite_Gauge_setup','\x5cI[%1]%2','DealHpHeal','342903kDiYNL','DealAllyDebuff','_regeneratingTp','ARRAYSTR','process_VisuMZ_EnhancedTP_Settings','Game_Action_itemEffectAddDebuff','standardIconWidth','members','Unnamed\x20Mode','Scene_Skill_refreshActor','learnSkillEnhancedTP','gradientFillRect','exit','status','_tpMode','mmp','note','TakeMpHeal','_statusWindow','executeMpDamage','makeItemList','create','DealMpHeal','push','updateEnhancedTp','critical','310MRaRBW','_battler','sparam','itemLineRect','GainAllyState','_tpModes','DefaultTpMode','isSkill','Game_BattlerBase_isPreserveTp','regenerateTp','maxCols','VisuMZ_1_SkillsStatesCore','refresh','CustomLabel','defaultTpMode','activate','name','SceneSkillTpMode','TpModeIcon','playOkSound','_hue','setHue','Enemies','gaugeRate','index','Game_Battler_onBattleStart','clear','iconHeight','GainAllyDebuff','format','processDefeat','show','bind','DealEnemyBuff','applyGlobalEnhancedTP','Name','%1Func','scrollTo','CriticalHit','Game_Actor_learnSkill','TpModeCmdName','update','isItem','ARRAYFUNC','UseItem','itemAt','convertEnhancedTpFunctions','Actors','drawFullGaugeEnhancedTp','learnTpMode','trim','setTpModeInSceneSkill','_tpMode_SceneSkill','initTpModes','FlashGauge','DealMpDmg','_tpGaugeSprite','isTpModeCommandVisible','parameters','isAlive','prototype','EnhancedTP','_tp','constructor','6915260TJsQUS','applyItemUserEffect','_helpWindow','AllyHpHeal','ActorUnlockAllTPModes','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','text','setup','Sprite_Gauge_drawGaugeRect','Settings','setHandler','_actor','includes','terms','Scene_Skill_createSkillTypeWindow','553201HTYPpI','initTp','6NqZDhk','KillEnemy','LoseBattle','abs','showTpModeInSceneSkill','applyEnhancedTP','isDead','getColor','trg','DealAllyBuff','tpGaugeFlashLightness','item','#%1','toUpperCase','lineHeight','changeTpMode','mainAreaHeight','Game_Action_itemEffectAddState','gainSilentTp','mhp','fillRect','_skillTypeWindow','AllyMpHeal','iconWidth','WinBattle','tpModesCommandText','ceil','target','TpMode','Game_System_initialize','DealEnemyDebuff','createTpGaugeBitmaps','_scene','tpMode','inBattle','FlashRequirement','setHelpWindowItem','createSkillTypeWindow','BattleManager_processVictory','ConvertParams','EnemyChangeTPMode','redraw','OnlyMember','chargeTpByDamage','EVAL','NUM','GainEnemyState','learnSkill','boxWidth','Initial','value','TpModes','BattleManager_processDefeat','subject','BattleManager_onEscapeSuccess','ShowTpMode','GainEnemyDebuff','MaxFormulaFunc','tpModes','_cache','drawFullGauge','DealEnemyState','Sprite_Gauge_drawFullGauge','GlobalTPModes','hide','General','applyItemEnhancedTPEffect','processVictory','testApply','TakeHpDmg','tpModeValue','_tpModeWindow','onTpModeOk','STR','GainAllyBuff','Preserve','TPModeName','return\x200','Scene_Skill_create','TpModeOrder','drawGaugeRect','availableTpModes','description','_tpTextSprite','testApplyEnhancedTP','match','setBlendColor','isActor','Game_Action_testApply','result','addTpModeCommand','Game_Battler_gainSilentTp','remove','forceSelect','_stypeId','gaugeBackColor','tpModeWindowRect','addChild','colSpacing','commandTpMode','5384VcMZSD','attackSkillId','changeBattlerTpLabel','filter','selectLast','apply','CriticalMp','deselect','_mp','refreshActor','maxItems','onBattleStart','sortTpModes','FullMp','isPreserveTp','Game_Battler_addState','_tpGaugeBack','map','leader','MultiplierTCR','ARRAYEVAL'];_0xe722=function(){return _0x2157d4;};return _0xe722();}