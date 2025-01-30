//=============================================================================
// VisuStella MZ - Class Change System
// VisuMZ_2_ClassChangeSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ClassChangeSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ClassChangeSystem = VisuMZ.ClassChangeSystem || {};
VisuMZ.ClassChangeSystem.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.05] [ClassChangeSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Class_Change_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds the ability for your player to freely change the classes of
 * actors outside of battle from a menu. When changing into different classes,
 * players adjust the game's actors to a different playstyle with different
 * skills, equipment, and traits to make them behave differently.
 * 
 * Multiclassing is also possible. Actors can possess one class to many, from
 * two to ten to as many as you've set up in the Plugin Parameters. Adjust the
 * rulings for how multiclasses behave in your game. Let actors inherit a small
 * percentage of parameters from the multiclasses, skills, equipment access,
 * and more!
 *
 * Features include all (but not limited to) the following:
 * 
 * * A custom scene to let actors change their classes inside of.
 * * When class changing, determine if levels are maintained across all classes
 *   or if each class has their own levels to raise.
 * * Multiclasses allow actors to have more than one class at a time.
 * * Determine the rulings for each multiclass tier through the Plugin
 *   Parameters to gain control over how they influence your game.
 * * Restrict certain multiclass tiers from being able to change classes.
 * * Allow only some classes to be equippable to specific multiclass tiers.
 * * Unlock new classes automatically by reaching certain class levels or when
 *   certain resources have reached certain thresholds.
 * * These resources the new Class Points and Job Points.
 * * Class Points and Job Points are brand new resources added through this
 *   plugin which can be acquired through a variety a means ranging from
 *   participating in battle, defeating enemies, and/or leveling up.
 * * Also unlock classes through Plugin Commands!
 * * Actors can have class specific graphics depending on their primary class.
 *   Appearance changes range from faces, map sprites, battlers, and portraits
 *   used by other VisuStella MZ plugins.
 * * Play an animation on the actor inside the Class Change scene when changing
 *   classes.
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
 * Class Specific Graphics
 * 
 * If an actor has class specific graphics, they will overwrite the face
 * graphic, map character sprite graphic, battler graphic, and any portraits
 * that have been added through the VisuStella MZ plugins. The class specific
 * graphics will take priority over the default graphics.
 * 
 * ---
 * 
 * Change Actor Images Event Command
 * 
 * When changing an actor's graphics through the "Change Actor Images" event
 * command, these changes will take priority over the Class Specific Graphics.
 * If you want to remove these priority graphics, set the "Change Actor Images"
 * images to "(None)".
 * 
 * Keep in mind that this means you cannot make an "invisible" graphic through
 * the "(None)" selection anymore. Instead, you need to make a work around by
 * making a custom graphic image that is fully transparent.
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
 * VisuMZ_3_VictoryAftermath
 *
 * If VisuStella MZ's Victory Aftermath plugin is installed, the amount of
 * Job Points and Class Points earned can be visibly shown in the rewards
 * window.
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 * VisuMZ_1_MainMenuCore
 *
 * If the Battle Core and/or the Main Menu Core is installed, the Class Change
 * System also gives access to notetags that alter their battle portraits
 * and/or menu portraits based on whatever class an actor is.
 *
 * ---
 *
 * ============================================================================
 * Clarification
 * ============================================================================
 *
 * This section is to add clarification on some questions you may have
 * regarding the Class Change System.
 *
 * ---
 *
 * Q. Why do my actors have access to random skill(s) of x class(es)?
 * 
 * A. Are those classes a part of the classes that have already been unlocked?
 * Are the skills learned at level 1 for those classes? And are those classes
 * sharing a particular Skill Type? Then that's your answer.
 * 
 * When classes are unlocked, they are unlocked at level 1. When unlocked at
 * level 1, all of the skills at level 1 are also learned by that actor. And if
 * the classes all share a Skill Type, those skills will also become available
 * to that Skill Type.
 * 
 * If you don't want your classes to have access to all of the skills of the
 * same Skill Type, then give them different Skill Types unique to each class
 * and change the Skill Types of the skills taught for those classes to that
 * class's unique Skill Type.
 *
 * ---
 * 
 * Q. Why does the <Passive State: x> notetag from Skills and States Core apply
 * even if my actor does not have access to the parent skill?
 * 
 * A. Skills with the <Passive State: x> notetag only have a requirement of the
 * skills needing to be learned. It does not have a requirement of the skills
 * needing to be accessible through the Skill Types.
 * 
 * Even without the Class Change System, if you teach an actor a skill that
 * has a Skill Type the actor does not have access to, that actor will still
 * benefit from the <Passive State: x> notetag.
 * 
 * To make it apply only when a certain class is present, you will need to
 * utilize the Passive Condition notetags found in the Skills and States Core.
 * 
 * ---
 * 
 * Q. How do I get the data on which classes and multiclasses an actor has?
 * 
 * A. You would have to use the following code to acquire their data:
 * 
 *   actor.multiclasses()
 *   - This returns an array of all of the multiclasses an actor has.
 *   - This includes the actor's primary class.
 * 
 *   actor.multiclass(x)
 *   - This returns the class data (not ID) of whatever class the actor has
 *     in x multiclass slot.
 *   - An x value of 1 would yield the primary class.
 * 
 *   actor.multiclassId(x)
 *   - This returns the class ID (not data) of whatever class the actor has
 *     in x multiclass slot.
 *   - An x value of 1 would yield the primary class's ID.
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
 * === Class Basics-Related Notetags ===
 * 
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Class Notetags
 * - Assigns an icon index for the class to 'x'.
 * - Replace 'x' with a number representing the index value on the IconSet
 *   image in the img/system/ folder for the icon you want to assign.
 * - If this notetag is not used, the icon index will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 *
 * ---
 *
 * <Help Description>
 *  text
 *  text
 * </Help Description>
 *
 * - Used for: Class Notetags
 * - Assigns a help description to the class.
 * - Replace 'text' with text you want displayed when this class is selected
 *   in the Class Change scene's class list.
 * - If this notetag is not used, the help description will default to the
 *   setting found in the Class Change System's Plugin Parameters.
 *
 * ---
 *
 * <Class Change Animation: x>
 *
 * - Used for: Class Notetags
 * - Assigns an animation for the class when the actor changes to that class.
 * - Replace 'x' with a number representing the ID of the animation found in
 *   the database to play when the actor changes to that class.
 * - If this notetag is not used, the animation will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 *
 * ---
 * 
 * <Class Change Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Class Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   class's icon during for the Class Change scene.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of class changing, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === Class Specific Graphics-Related Notetags ===
 * 
 * ---
 *
 * <Class id Face: filename, index>
 * 
 * <Class name Face: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific face graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/faces/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * 
 * Examples: 
 * 
 *   <Class 1 Face: Actor2, 0>
 * 
 *   <Class Swordsman Face: Actor2, 0>
 *
 * ---
 *
 * <Class id Character: filename, index>
 * 
 * <Class name Character: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific map character sprite graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/characters/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * 
 * Examples: 
 * 
 *   <Class 1 Character: Actor2, 0>
 * 
 *   <Class Swordsman Character: Actor2, 0>
 *
 * ---
 *
 * <Class id Battler: filename>
 * 
 * <Class name Battler: filename>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific sideview battler graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/sv_actors/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Battler: Actor2_1>
 * 
 *   <Class Swordsman Battler: Actor2_1>
 *
 * ---
 *
 * <Class id Menu Portrait: filename>
 * 
 * <Class name Menu Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_MainMenuCore!
 * - Gives this actor a class specific menu portrait graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Menu Portrait: Actor2_1>
 * 
 *   <Class Swordsman Menu Portrait: Actor2_1>
 *
 * ---
 *
 * <Class id Battle Portrait: filename>
 * 
 * <Class name Battle Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_BattleCore!
 * - Gives this actor a class specific battle portrait graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Battle Portrait: Actor2_1>
 * 
 *   <Class Swordsman Battle Portrait: Actor2_1>
 *
 * ---
 * 
 * === Class Unlocking-Related Notetags ===
 * 
 * ---
 *
 * <Unlocked Classes: id>
 * <Unlocked Classes: id, id, id>
 * 
 * <Unlocked Classes: name>
 * <Unlocked Classes: name, name, name>
 *
 * - Used for: Actor Notetags
 * - Allows this actor to start with certain classes unlocked. These classes
 *   are unlocked in addition to the ones found in the Plugin Parameters.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Insert multiple data entries to unlock more classes.
 *
 * ---
 *
 * <Auto Unlock Requirements>
 *  Class id: Level x
 *  Class name: Level x
 * 
 *  Class id: x AP
 *  Class name: x AP
 * 
 *  Class id: x CP
 *  Class name: x CP
 * 
 *  Class id: x JP
 *  Class name: x JP
 * 
 *  Class id: x SP
 *  Class name: x SP
 * 
 *  AP: x
 *  CP: x
 *  JP: x
 *  SP: x
 * </Auto Unlock Requirements>
 *
 * - Used for: Class Notetags
 * - Have this class unlock automatically whenever all of the conditions have
 *   been met after a battle is over or upon entering the Class Change scene.
 * - Insert/delete any number of copies of the middle conditions as needed.
 * - For 'id' conditions, replace 'id' with a number representing class's ID.
 * - For 'name' conditions, replace 'name' with the class's name.
 * - For 'AP', 'CP', 'JP', 'SP' conditions that have class markers, they
 *   require that many of the resource as the 'x' value for that class.
 *   These are best used with resource types that are class specific.
 * - For 'AP', 'CP', 'JP', 'SP' conditions that have class markers, they
 *   require that many of the resource as the 'x' value for the current class.
 *   These are best used with resource types that are shared.
 * - 'AP' and 'SP' conditions require VisuMZ_2_SkillLearnSystem.
 * 
 * Examples:
 * 
 * <Auto Unlock Requirements>
 *  Class 4: Level 20
 *  Class 6: Level 15
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: Level 20
 *  Class Spellblade: Level 15
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: 200 JP
 *  Class Spellblade: 100 JP
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: 200 JP
 *  CP: 500
 * </Auto Unlock Requirements>
 *
 * ---
 * 
 * === Category-Related Notetags ===
 * 
 * ---
 *
 * <Starting Multiclasses: x>
 *
 * - Used for: Actor Notetags
 * - Lets the actor start with 'x' amount of class slots to assign.
 * - Replace 'x' with a number value representing the number of slots the
 *   actor can assign classes to.
 * - If this notetag is not used, the slot values will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 * - Slot values cannot go under 1 or exceed the maximum number of layers found
 *   in the "Multiclass Settings" Plugin Parameters.
 *
 * ---
 *
 * <Starting Tier x Class: id>
 * 
 * <Starting Tier x Class: name>
 *
 * - Used for: Actor Notetags
 * - If an actor has multiclass slots, determine which subclasses are assigned
 *   to them at the start.
 * - Replace 'x' with a number value representing the multiclass slot to assign
 *   to. '1' is the primary slot. '2' is the second slot.
 * - For 'id' conditions, replace 'id' with a number representing class's ID.
 * - For 'name' conditions, replace 'name' with the class's name.
 * - Insert multiple copies of this notetag to assign multiple classes to
 *   different slots.
 * 
 * Example:
 * 
 * <Starting Tier 2 Class: Sorcerer>
 * 
 * <Starting Tier 3 Class: Priest>
 *
 * ---
 *
 * <Restrict Class Change Tier: x>
 * <Restrict Class Change Tiers: x, x, x>
 *
 * - Used for: Actor Notetags
 * - This makes an actor unable to change the class found in any of the listed
 *   tier slots unless this effect is cancelled by Plugin Commands.
 * - Replace 'x' with a number representing the tier slot(s) to restrict.
 *
 * ---
 *
 * <Class Change Tier Only: x>
 * <Class Change Tiers Only: x, x, x>
 *
 * - Used for: Class Notetags
 * - This makes the specific class only assignable to specific class tiers.
 * - Replace 'x' with a number representing the tier slot(s) that this class
 *   can be assigned and equipped to.
 *
 * ---
 * 
 * === Class Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting CP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Class Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Class Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting CP: x>
 * <Class name Starting CP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Class Points the actor starts with in a specific
 *   class if Class Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Class Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Class Points for.
 * - Replace 'name' with the name of the class to set starting Class Points
 *   for.
 *
 * ---
 *
 * <CP Gain: x>
 * <User CP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Class Points.
 * - Replace 'x' with a number representing the amount of Class Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Class Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target CP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Class Points.
 * - Replace 'x' with a number representing the amount of Class Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <CP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Class Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Class Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Class Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Class Points Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Class Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Class
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Class Points are directly added, lost, or set.
 *
 * ---
 * 
 * === Job Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting JP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Job Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Job Points to
 *   start out with.
 *
 * ---
 *
 * <Class id Starting JP: x>
 * <Class name Starting JP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Job Points the actor starts with in a specific
 *   class if Job Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Job Points to
 *   start out with.
 * - Replace 'id' with the ID of the class to set starting Job Points for.
 * - Replace 'name' with the name of the class to set starting Job Points for.
 *
 * ---
 *
 * <JP Gain: x>
 * <User JP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Job Points.
 * - Replace 'x' with a number representing the amount of Job Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Job Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target JP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Job Points.
 * - Replace 'x' with a number representing the amount of Job Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <JP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Job Points the enemy will give the player's party
 *   upon being defeated.
 * - Replace 'x' with a number representing the amount of Job Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Job Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Job Points Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Job Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Job Points
 *   that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Job Points are directly added, lost, or set.
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
 * === Unlock Class Plugin Commands ===
 * 
 * ---
 *
 * Unlock Class: Add For Actor(s)
 * - Unlock class(es) for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to unlock class(es) for.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be unlocked.
 *
 * ---
 *
 * Unlock Class: Add For Global
 * - Unlock class(es) for all party members.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be unlocked.
 *
 * ---
 *
 * Unlock Class: Remove From Actor(s)
 * - Remove unlock class(es) for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to remove an unlocked class(es) for.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be removed from the unlocked status.
 *
 * ---
 *
 * Unlock Class: Remove From Global
 * - Remove unlock class(es) for all party members.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be removed from the unlocked status.
 *
 * ---
 * 
 * === Change Restriction Plugin Commands ===
 * 
 * ---
 *
 * Change Restriction: Add Tier Restriction
 * - Add restrictions to prevent class changing specific tier(s) to
 *   target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to restrict class tier(s) for.
 *
 *   Tiers(s):
 *   - Select which class tier(s) to restrict changing for.
 *
 * ---
 *
 * Change Restriction: Remove Tier Restriction
 * - Remove restrictions to allow class changing specific tier(s) for
 *   target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to remove class tier(s) restrictions for.
 *
 *   Tiers(s):
 *   - Select which class tier(s) to remove restrictions for.
 *
 * ---
 * 
 * === Multiclass Plugin Commands ===
 * 
 * ---
 *
 * Multiclass: Change Actor(s) Multiclass
 * - Changes a specific multiclass for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Tier:
 *   - Which multiclass tier to change for the target actor(s)?
 *
 *   Class ID:
 *   - Which class should go into this multiclass tier slot?
 *
 * ---
 *
 * Multiclass: Raise Limit for Actor(s)
 * - Raise the multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Raise Limit By:
 *   - Raise the multiclass limit for target actor(s) by this much.
 *
 * ---
 *
 * Multiclass: Lower Limit for Actor(s)
 * - Lower the multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Reduce Limit By:
 *   - Lower the multiclass limit for target actor(s) by this much.
 *
 * ---
 *
 * Multiclass: Set Limit for Actor(s)
 * - Set multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Set Limit To:
 *   - Set multiclass limit for target actor(s) to this much.
 *
 * ---
 * 
 * === Class Points Plugin Commands ===
 * 
 * ---
 *
 * Class Points: Gain
 * - The target actor(s) gains Class Points.
 * - Gained amounts are affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Add
 * - The target actor(s) receives Class Points.
 * - Received amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Lose
 * - The target actor(s) loses Class Points.
 * - Lost amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Set
 * - Changes the exact Class Points for the target actor(s).
 * - Changed amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === Job Points Plugin Commands ===
 * 
 * ---
 *
 * Job Points: Gain
 * - The target actor(s) gains Job Points.
 * - Gained amounts are affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Add
 * - The target actor(s) receives Job Points.
 * - Received amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Lose
 * - The target actor(s) loses Job Points.
 * - Lost amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Set
 * - Changes the exact Job Points for the target actor(s).
 * - Changed amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Enable Class Change in Menu?
 * - Enables/disables Class Change inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Class Change inside the main menu.
 *
 * ---
 *
 * System: Show Class Change in Menu?
 * - Shows/hides Class Change inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Class Change inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for Class Change System.
 *
 * ---
 *
 * Basics
 * 
 *   Default Help:
 *   - Default help description for all classes.
 *   - %1 - Class Name
 * 
 *   Default Icon:
 *   - Default icon used for all classes.
 * 
 *   Maintain Levels?:
 *   - Make each class have the same level or make each class have
 *     their own level?
 * 
 *   Change-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing classes with MaxHP/MaxMP values.
 *
 * ---
 *
 * Class Unlocking
 * 
 *   Always Unlocked:
 *   - Which classes are always unlocked and available?
 * 
 *   Starting Multiclasses:
 *   - How many classes can actors use at the start by default?
 *   - Use 1 for just the primary class.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_ClassChange.
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
 * Plugin Parameters: Class Change Sound Settings
 * ============================================================================
 *
 * Sound effect played when changing classes through Scene_ClassChange.
 *
 * ---
 *
 * Class Change Sound Settings
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Access Settings
 * ============================================================================
 *
 * Menu Access settings for Class Change.
 *
 * ---
 *
 * Main Menu Settings
 * 
 *   Command Name:
 *   - Name of the 'ClassChangeSystem' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'ClassChangeSystem' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'ClassChangeSystem' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Multiclass Settings
 * ============================================================================
 *
 * Multiclass settings for this plugin. Each tier allows you to have separate
 * settings. The order the tiers are inserted will represent the settings that
 * will be applied to those tiers when classes are assigned in those slots.
 * 
 * The majority of these settings do not apply to Tier 1 because Tier 1 is the
 * primary class. However, Tier 1 must exist in these Plugin Parameters to
 * provide settings for the Class Change scene.
 *
 * ---
 *
 * General
 * 
 *   Class Tier Name:
 *   - Name of this class tier.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Help Description:
 *   - Help description when this multiclass slot is picked.
 *
 * ---
 *
 * Base Parameter Bonuses
 * 
 *   MaxHP:
 *   MaxMP:
 *   ATK:
 *   DEF:
 *   MAT:
 *   MDF:
 *   AGI:
 *   LUK:
 *   - How little of this class tier's parameter should be added to base stats?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Reward Rates
 * 
 *   EXP:
 *   - How much EXP does a class in this tier earn?
 *   - Does not apply to Tier 1. Only for Battle Rewards.
 * 
 *   Resources:
 *   - Resource rate (ie. CP, JP) earned for this tier.
 *   - Does not apply to Tier 1. Only for Battle Rewards.
 *
 * ---
 *
 * Inherit Traits > Rates
 * 
 *   Element Rates?:
 *   - Inherit the element rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Debuff Rates?:
 *   - Inherit the debuff rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   State Rates?:
 *   - Inherit the state rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   State Resistance?:
 *   - Inherit the state resistances from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Param Rates
 * 
 *   Base-Param Rates?:
 *   - Inherit Base Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   X-Param Rates?:
 *   - Inherit X-Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   S-Param Rates?:
 *   - Inherit S-Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Attack
 * 
 *   Attack Elements?:
 *   - Inherit the attack elements from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Attack States?:
 *   - Inherit the attack states from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Skills
 * 
 *   Added STypes?:
 *   - Inherit the added STypes from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Added Skills?:
 *   - Inherit the added skills from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Equipment
 * 
 *   Equippable Weapons?:
 *   - Inherit the equippable weapons from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Equippable Armors?:
 *   - Inherit the equippable armors from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings for Scene_ClassChange. These adjust the overall layout of
 * the scene as well as how some of the content inside of the windows look. Not
 * all aspects of the scene are fully customizable due to mechanical limits.
 *
 * ---
 *
 * Scene_ClassChange
 * 
 *   Recommended Layout?:
 *   - Use the recommended Menu Layout provided by this plugin?
 * 
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu
 *     scene layout?
 * 
 *   Displayed Resources:
 *   - Select which resources to display in Scene_Class's class lists.
 *   - Non-shared resources appear in the lists up to a limit of 2.
 * 
 *   Confirm Animation ID:
 *   - Play this animation when a class change has been made.
 * 
 *     Primary Offset X:
 *     Primary Offset Y:
 *     Subclass Offset X:
 *     Subclass Offset Y:
 *     - Adjust the offsets for the class change animation.
 *
 * ---
 *
 * Window_ClassStatus
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Param Font Size:
 *   - The font size used for parameter values.
 * 
 *   Show Menu Portraits?:
 *   - If Main Menu Core is installed, display the Menu Portraits instead of
 *     the actor's face in the status window?
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *   Back Rectangle Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 *   JS: Portrait Upper:
 *   - If Menu Portraits are available, this is code used to draw the upper
 *     data like this in the Status Window.
 * 
 *   JS: Face Upper:
 *   - If faces used used, this is code used to draw the upper data like this
 *     in the Status Window.
 * 
 *   JS: Parameter Lower:
 *   - Code to determine how parameters are drawn in the Status Window.
 *
 * ---
 *
 * Window_ClassTier
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   No Class Assigned:
 *   - Text used when no class is assigned to the slot.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing classes?
 * 
 *   Button Assist Text:
 *   - Text used for the Button Assist Window
 * 
 *   JS: Extra Data:
 *   - Code used to draw extra data if there is enough room.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Window_ClassList
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Unassign Class:
 *   - Text used for an empty class slot.
 * 
 *     Help Description:
 *     - Help description for unassigning a class.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Class Points Settings
 * ============================================================================
 *
 * Class Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Class Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Class Points:
 *   - Do you want Class Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Class Points an actor can have?
 *   - Use 0 for unlimited Class Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Class Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Class Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Class Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Class Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Class Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Class Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Class Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Class Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much CP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Class Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Class Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawClassPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorClassPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Class Points aren't shared or if you want the Class
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Job Points Settings
 * ============================================================================
 *
 * Job Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Job Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Job Points:
 *   - Do you want Job Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Job Points an actor can have?
 *   - Use 0 for unlimited Job Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Job Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Job Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Job Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Job Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Job Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Job Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Job Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Job Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much JP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Job Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Job Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawJobPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorJobPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Job Points aren't shared or if you want the Job
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
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
 * Version 1.05: February 12, 2021
 * * Bug Fixes!
 * ** Param bonuses for subclasses are no longer based on the current level but
 *    instead, the level for the subclass. Fix made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: January 8, 2021
 * * Bug Fixes!
 * ** Leveling up should now automatically cache the current class level.
 *    Fix made by Irina.
 * 
 * Version 1.03: January 1, 2021
 * * Bug Fixes!
 * ** General Settings should now have default values when added. If you are
 *    still getting an error when starting a new game, please open up the
 *    General Settings in the Plugin Parameters and hit OK. Fix made by Yanfly.
 * 
 * Version 1.02: December 25, 2020
 * * Bug Fixes!
 * ** Added a refresh after setting up new actors to recalculate any cached
 *    parameter values, skills, and passive states. Fix made by Yanfly.
 * ** Equipment duplication glitch should no longer occur.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Class Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      class icon for the Class Change scene.
 * ** New Plugin Parameters added by Yanfly.
 * *** Window Settings > Scene_ClassChange > Confirm Animation ID > Offset X
 * *** Window Settings > Scene_ClassChange > Confirm Animation ID > Offset Y
 * **** Offsets have been added to let you adjust where the animation occurs
 *      for primary and subclass changing.
 * 
 * Version 1.01: December 18, 2020
 * * Bug Fixes!
 * ** Class specific character graphics no longer default to index 0 when no
 *    index is found or declared by notetags. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added "Clarification" section to the documentation to explain some things
 *    that users might not understand correctly.
 * * Feature Update!
 * ** The button assist text for the "SHIFT" removal is now offset towards the
 *    left a bit for more room. Update made by Yanfly.
 *
 * Version 1.00 Official Release Date: January 11, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockForActor
 * @text Unlock Class: Add For Actor(s)
 * @desc Unlock class(es) for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to unlock class(es) for.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be unlocked.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockForGlobal
 * @text Unlock Class: Add For Global
 * @desc Unlock class(es) for all party members.
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be unlocked.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockRemoveActor
 * @text Unlock Class: Remove From Actor(s)
 * @desc Remove unlock class(es) for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to remove an unlocked class(es) for.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be removed from the unlocked status.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockRemoveGlobal
 * @text Unlock Class: Remove From Global
 * @desc Remove unlock class(es) for all party members.
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be removed from the unlocked status.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassChangeAddRestrictTier
 * @text Change Restriction: Add Tier Restriction
 * @desc Add restrictions to prevent class changing specific tier(s)
 * to target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to restrict class tier(s) for.
 * @default ["1"]
 *
 * @arg Tiers:arraynum
 * @text Tiers(s)
 * @type number[]
 * @desc Select which class tier(s) to restrict changing for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassChangeRemoveRestrictTier
 * @text Change Restriction: Remove Tier Restriction
 * @desc Remove restrictions to allow class changing specific tier(s)
 * for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to remove class tier(s) restrictions for.
 * @default ["1"]
 *
 * @arg Tiers:arraynum
 * @text Tiers(s)
 * @type number[]
 * @desc Select which class tier(s) to remove restrictions for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassChangeActorClass
 * @text Multiclass: Change Actor(s) Multiclass
 * @desc Changes a specific multiclass for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Tier:num
 * @text Tier
 * @type number
 * @min 1
 * @desc Which multiclass tier to change for the target actor(s)?
 * @default 2
 *
 * @arg ClassID:num
 * @text Class ID
 * @type class
 * @desc Which class should go into this multiclass tier slot?
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassRaiseLimit
 * @text Multiclass: Raise Limit for Actor(s)
 * @desc Raise the multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Raise Limit By
 * @type number
 * @min 1
 * @desc Raise the multiclass limit for target actor(s) by this much.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassLowerLimit
 * @text Multiclass: Lower Limit for Actor(s)
 * @desc Lower the multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Reduce Limit By
 * @type number
 * @min 1
 * @desc Lower the multiclass limit for target actor(s) by this much.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassSetLimit
 * @text Multiclass: Set Limit for Actor(s)
 * @desc Set multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Set Limit To
 * @type number
 * @min 1
 * @desc Set multiclass limit for target actor(s) to this much.
 * @default 2
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsGain
 * @text Class Points: Gain
 * @desc The target actor(s) gains Class Points.
 * Gained amounts are affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsAdd
 * @text Class Points: Add
 * @desc The target actor(s) receives Class Points.
 * Received amounts are NOT affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsLose
 * @text Class Points: Lose
 * @desc The target actor(s) loses Class Points.
 * Lost amounts are NOT affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsSet
 * @text Class Points: Set
 * @desc Changes the exact Class Points for the target actor(s).
 * Changed amounts are NOT affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsGain
 * @text Job Points: Gain
 * @desc The target actor(s) gains Job Points.
 * Gained amounts are affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsAdd
 * @text Job Points: Add
 * @desc The target actor(s) receives Job Points.
 * Received amounts are NOT affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsLose
 * @text Job Points: Lose
 * @desc The target actor(s) loses Job Points.
 * Lost amounts are NOT affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsSet
 * @text Job Points: Set
 * @desc Changes the exact Job Points for the target actor(s).
 * Changed amounts are NOT affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableClassChangeSystemMenu
 * @text System: Enable Class Change in Menu?
 * @desc Enables/disables Class Change inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Class Change inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowClassChangeSystemMenu
 * @text System: Show Class Change in Menu?
 * @desc Shows/hides Class Change inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Class Change inside the main menu.
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
 * @param ClassChangeSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param ClassChange
 * @text Class Change
 *
 * @param General:struct
 * @text General Settings
 * @parent ClassChange
 * @type struct<General>
 * @desc General settings for Class Change System.
 * @default {"Basics":"","HelpDescription:json":"\"The %1 class.\"","Icon:num":"96","MaintainLevels:eval":"false","ChangeAdjusHpMp:eval":"true","Unlock":"","AlwaysUnlocked:arraynum":"[\"1\",\"2\",\"3\",\"4\"]","StartingMulticlasses:num":"2"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @parent ClassChange
 * @type struct<BgSettings>
 * @desc Background settings for Scene_ClassChange.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param ChangeClassSound:struct
 * @text Change Class Sound
 * @parent ClassChange
 * @type struct<Sound>
 * @desc Sound effect played when changing classes through Scene_ClassChange.
 * @default {"name:str":"Equip2","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param MainMenu:struct
 * @text Menu Access Settings
 * @parent ClassChange
 * @type struct<MenuAccess>
 * @desc Menu Access settings for Class Change.
 * @default {"Name:str":"Class","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 *
 * @param Multiclass:arraystruct
 * @text Multiclass Settings
 * @parent ClassChange
 * @type struct<Multiclass>[]
 * @desc Multiclass settings for this plugin. Each tier allows you to have separate settings.
 * @default ["{\"Name:str\":\"Primary\",\"TextColor:str\":\"6\",\"HelpDescription:json\":\"\\\"Units gain all the benefits of its primary class.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"1.00\",\"paramRate1:num\":\"1.00\",\"paramRate2:num\":\"1.00\",\"paramRate3:num\":\"1.00\",\"paramRate4:num\":\"1.00\",\"paramRate5:num\":\"1.00\",\"paramRate6:num\":\"1.00\",\"paramRate7:num\":\"1.00\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"true\",\"DebuffRates:eval\":\"true\",\"StateRates:eval\":\"true\",\"StateResistance:eval\":\"true\",\"Param\":\"\",\"ParamRates:eval\":\"true\",\"XParamRates:eval\":\"true\",\"SParamRates:eval\":\"true\",\"Attack\":\"\",\"AttackElements:eval\":\"true\",\"AttackStates:eval\":\"true\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"Subclass\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"3rd Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"4th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"5th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"6th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"7th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"8th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"9th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"10th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}"]
 *
 * @param Window:struct
 * @text Window Settings
 * @parent ClassChange
 * @type struct<Window>
 * @desc Window settings for Scene_ClassChange.
 * @default {"Scene":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/right","DisplayedResources:arraystr":"[\"AP\",\"CP\",\"JP\",\"SP\"]","ConfirmAnimationID:num":"120","Window_ClassStatus":"","Window_ClassStatus_BgType:num":"0","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawBackRect:eval":"true","BackRectColor:str":"19","Window_ClassStatus_RectJS:func":"\"const ww = Math.floor(Graphics.boxWidth / 2);\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? 0 : ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth / 2;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorLevel(this._actor, x1, lineHeight * 1);\\nthis.placeBasicGauges(this._actor, x1, lineHeight * 2);\\nthis.drawActorResources(x2, lineHeight * 0, this.innerWidth / 2);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorResources(x, dataY + this.lineHeight() * 1, ImageManager.faceWidth);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","Window_ClassTier":"","Window_ClassTier_BgType:num":"0","VocabNoClassAssigned:str":"No Class Assigned","ShiftShortcutKey:eval":"true","ShiftButtonAssistText:str":"Unassign","Window_ClassTier_ExtraJS:func":"\"// Declare Arguments\\nconst classID = arguments[0];\\nconst tier = arguments[1];\\nconst settings = arguments[2];\\nconst rect = arguments[3];\\nconst targetClass = $dataClasses[classID];\\nconst wordWrap = Imported.VisuMZ_1_MessageCore;\\nconst removeIcons = true;\\nconst fontSize = 22;\\n\\n// Create Coordinates\\nlet x = rect.x + (this.itemPadding() * 4);\\nlet y = rect.y + (this.lineHeight() * 3.25);\\nlet width = rect.width - (this.itemPadding() * 8);\\n\\n// Skill Type Access\\nif (settings.AddedStypes && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\\n    let stypes = targetClass.traits.\\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_STYPE_ADD).\\n        map(trait => $dataSystem.skillTypes[trait.dataId]).\\n        join(', ');\\n    let text = '\\\\\\\\C[16]%1:\\\\\\\\C[0] \\\\\\\\FS[%3]%2'.format(TextManager.skill, stypes, fontSize || 22);\\n    if (removeIcons) text = text.replace(/\\\\\\\\I\\\\[(\\\\d+)\\\\]/gi, '');\\n    if (wordWrap) text = '<WordWrap>' + text;\\n    this.drawTextEx(text, x, y, width);\\n    y += this.lineHeight();\\n}\\n\\n// Weapon Access\\nif (settings.EquipWeapons && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\\n    let stypes = targetClass.traits.\\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_EQUIP_WTYPE).\\n        map(trait => $dataSystem.weaponTypes[trait.dataId]).\\n        join(', ');\\n    let text = '\\\\\\\\C[16]%1:\\\\\\\\C[0] \\\\\\\\FS[%3]%2'.format(TextManager.weapon, stypes, fontSize || 22);\\n    if (removeIcons) text = text.replace(/\\\\\\\\I\\\\[(\\\\d+)\\\\]/gi, '');\\n    if (wordWrap) text = '<WordWrap>' + text;\\n    this.drawTextEx(text, x, y, width);\\n    y += this.lineHeight();\\n}\"","Window_ClassTier_RectJS:func":"\"const ww = Graphics.boxWidth - this._statusWindow.width;\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","Window_ClassList":"","Window_ClassList_BgType:num":"0","VocabUnassignClass:str":"Unassign Class","UnassignHelpDescription:json":"\"Remove any classes for this slot.\"","Window_ClassList_RectJS:func":"\"const ww = Graphics.boxWidth - this._statusWindow.width;\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param Resources
 *
 * @param ClassPoints:struct
 * @text Class Points Settings
 * @parent Resources
 * @type struct<ClassPoints>
 * @desc Settings for Class Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"true","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"87","Vocabulary":"","FullText:str":"Class Points","AbbrText:str":"CP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"0","PerLevelUp:str":"100","PerEnemy:str":"0","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"false","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"false","AftermathText:str":"+%1 %2"}
 *
 * @param JobPoints:struct
 * @text Job Points Settings
 * @parent Resources
 * @type struct<JobPoints>
 * @desc Settings for Job Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"false","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"188","Vocabulary":"","FullText:str":"Job Points","AbbrText:str":"JP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"10 + Math.randomInt(10)","PerLevelUp:str":"0","PerEnemy:str":"50 + Math.randomInt(50)","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"true","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"true","AftermathText:str":"+%1 %2"}
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
 * @param Basics
 *
 * @param HelpDescription:json
 * @text Default Help
 * @parent Basics
 * @type note
 * @desc Default help description for all classes.
 * %1 - Class Name
 * @default "The %1 class."
 *
 * @param Icon:num
 * @text Default Icon
 * @parent Basics
 * @desc Default icon used for all classes.
 * @default 96
 *
 * @param MaintainLevels:eval
 * @text Maintain Levels?
 * @parent Basics
 * @type boolean
 * @on Each Class Same Level
 * @off Each Class Separate
 * @desc Make each class have the same level or
 * make each class have their own level?
 * @default false
 *
 * @param ChangeAdjusHpMp:eval
 * @text Change-Adjust HP/MP
 * @parent Basics
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing classes with MaxHP/MaxMP values.
 * @default true
 * 
 * @param Unlock
 * @text Class Unlocking
 *
 * @param AlwaysUnlocked:arraynum
 * @text Always Unlocked
 * @parent Unlock
 * @type class[]
 * @desc Which classes are always unlocked and available?
 * @default ["1","2","3","4"]
 *
 * @param StartingMulticlasses:num
 * @text Starting Multiclasses
 * @parent Unlock
 * @type number
 * @min 1
 * @desc How many classes can actors use at the start by default?
 * Use 1 for just the primary class.
 * @default 2
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
 * Menu Access Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuAccess:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Template' option in the Main Menu.
 * @default Class
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Template' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Template' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Multiclass Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Multiclass:
 *
 * @param Name:str
 * @text Class Tier Name
 * @desc Name of this class tier.
 * @default Untitled
 * 
 * @param TextColor:str
 * @text Text Color
 * @parent Name:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param HelpDescription:json
 * @text Help Description
 * @parent Name:str
 * @type note
 * @desc Help description when this multiclass slot is picked.
 * @default "Assign a class to this slot."
 * 
 * @param BaseParameters
 * @text Base Parameter Bonuses
 * 
 * @param paramRate0:num
 * @text MaxHP
 * @parent BaseParameters
 * @desc How little of this class tier's MaxHP should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate1:num
 * @text MaxMP
 * @parent BaseParameters
 * @desc How little of this class tier's MaxMP should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate2:num
 * @text ATK
 * @parent BaseParameters
 * @desc How little of this class tier's ATK should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate3:num
 * @text DEF
 * @parent BaseParameters
 * @desc How little of this class tier's DEF should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate4:num
 * @text MAT
 * @parent BaseParameters
 * @desc How little of this class tier's MAT should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate5:num
 * @text MDF
 * @parent BaseParameters
 * @desc How little of this class tier's MDF should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate6:num
 * @text AGI
 * @parent BaseParameters
 * @desc How little of this class tier's AGI should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate7:num
 * @text LUK
 * @parent BaseParameters
 * @desc How little of this class tier's LUK should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param Rewards
 * @text Reward Rates
 * 
 * @param expRate:num
 * @text EXP
 * @parent Rewards
 * @desc How much EXP does a class in this tier earn?
 * Does not apply to Tier 1. Only for Battle Rewards.
 * @default 0.25
 * 
 * @param resourceRate:num
 * @text Resources
 * @parent Rewards
 * @desc Resource rate (ie. CP, JP) earned for this tier.
 * Does not apply to Tier 1. Only for Battle Rewards.
 * @default 0.25
 * 
 * @param Traits
 * @text Inherit Traits
 * 
 * @param Rates
 * @parent Traits
 *
 * @param ElementRates:eval
 * @text Element Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the element rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param DebuffRates:eval
 * @text Debuff Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the debuff rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param StateRates:eval
 * @text State Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the state rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param StateResistance:eval
 * @text State Resistance?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the state resistances from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Param
 * @text Param Rates
 * @parent Traits
 *
 * @param ParamRates:eval
 * @text Base-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit Base Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param XParamRates:eval
 * @text X-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit X-Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param SParamRates:eval
 * @text S-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit S-Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Attack
 * @parent Traits
 *
 * @param AttackElements:eval
 * @text Attack Elements?
 * @parent Attack
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the attack elements from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param AttackStates:eval
 * @text Attack States?
 * @parent Attack
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the attack states from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Skills
 * @parent Traits
 *
 * @param AddedStypes:eval
 * @text Added STypes?
 * @parent Skills
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the added STypes from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 * @param AddedSkills:eval
 * @text Added Skills?
 * @parent Skills
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the added skills from this class tier?
 * Does not apply to Tier 1.
 * @default true
 * 
 * @param Equip
 * @text Equipment
 * @parent Traits
 *
 * @param EquipWeapons:eval
 * @text Equippable Weapons?
 * @parent Equip
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the equippable weapons from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 * @param EquipArmors:eval
 * @text Equippable Armors?
 * @parent Equip
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the equippable armors from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip2
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @max 100
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 * 
 * @param Scene
 * @text Scene_ClassChange
 *
 * @param EnableLayout:eval
 * @text Recommended Layout?
 * @parent Scene
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the recommended Menu Layout provided by this plugin?
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent Scene
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 * 
 * @param DisplayedResources:arraystr
 * @text Displayed Resources
 * @parent Scene
 * @type select[]
 * @option AP - Ability Points (Requires VisuMZ_2_SkillLearnSystem)
 * @value AP
 * @option CP - Class Points
 * @value CP
 * @option JP - Job Points
 * @value JP
 * @option SP - Skill Points (Requires VisuMZ_2_SkillLearnSystem)
 * @value SP
 * @desc Select which resources to display in Scene_Class's class
 * lists. Non-shared (limit: 2) resources appear in the lists.
 * @default ["AP","CP","JP","SP"]
 *
 * @param ConfirmAnimationID:num
 * @text Confirm Animation ID
 * @parent Scene
 * @type animation
 * @desc Play this animation when a class change has been made.
 * @default 120
 *
 * @param ConfirmAniPrimaryOffsetX:num
 * @text Primary Offset X
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset X of primary class animations.
 * Negative for left. Positive for right.
 * @default 0
 *
 * @param ConfirmAniPrimaryOffsetY:num
 * @text Primary Offset Y
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset Y of primary class animations.
 * Negative for up. Positive for down.
 * @default 0
 *
 * @param ConfirmAniSubclassOffsetX:num
 * @text Subclass Offset X
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset X of subclass animations.
 * Negative for left. Positive for right.
 * @default 0
 *
 * @param ConfirmAniSubclassOffsetY:num
 * @text Subclass Offset Y
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset Y of subclass animations.
 * Negative for up. Positive for down.
 * @default 0
 *
 * @param Window_ClassStatus
 *
 * @param Window_ClassStatus_BgType:num
 * @text Background Type
 * @parent Window_ClassStatus
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
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent Window_ClassStatus
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent Window_ClassStatus
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent Window_ClassStatus
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Window_ClassStatus_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassStatus
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.floor(Graphics.boxWidth / 2);\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? 0 : ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent Window_ClassStatus
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth / 2;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorLevel(this._actor, x1, lineHeight * 1);\nthis.placeBasicGauges(this._actor, x1, lineHeight * 2);\nthis.drawActorResources(x2, lineHeight * 0, this.innerWidth / 2);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent Window_ClassStatus
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorResources(x, dataY + this.lineHeight() * 1, ImageManager.faceWidth);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent Window_ClassStatus
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param Window_ClassTier
 *
 * @param Window_ClassTier_BgType:num
 * @text Background Type
 * @parent Window_ClassTier
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
 * @param VocabNoClassAssigned:str
 * @text No Class Assigned
 * @parent Window_ClassTier
 * @desc Text used when no class is assigned to the slot.
 * @default No Class Assigned
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent Window_ClassTier
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing classes?
 * @default true
 *
 * @param ShiftButtonAssistText:str
 * @text Button Assist Text
 * @parent ShiftShortcutKey:eval
 * @desc Text used for the Button Assist Window
 * @default Unassign
 *
 * @param Window_ClassTier_ExtraJS:func
 * @text JS: Extra Data
 * @parent Window_ClassTier
 * @type note
 * @desc Code used to draw extra data if there is enough room.
 * @default "// Declare Arguments\nconst classID = arguments[0];\nconst tier = arguments[1];\nconst settings = arguments[2];\nconst rect = arguments[3];\nconst targetClass = $dataClasses[classID];\nconst wordWrap = Imported.VisuMZ_1_MessageCore;\nconst removeIcons = true;\nconst fontSize = 22;\n\n// Create Coordinates\nlet x = rect.x + (this.itemPadding() * 4);\nlet y = rect.y + (this.lineHeight() * 3.25);\nlet width = rect.width - (this.itemPadding() * 8);\n\n// Skill Type Access\nif (settings.AddedStypes && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\n    let stypes = targetClass.traits.\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_STYPE_ADD).\n        map(trait => $dataSystem.skillTypes[trait.dataId]).\n        join(', ');\n    let text = '\\\\C[16]%1:\\\\C[0] \\\\FS[%3]%2'.format(TextManager.skill, stypes, fontSize || 22);\n    if (removeIcons) text = text.replace(/\\\\I\\[(\\d+)\\]/gi, '');\n    if (wordWrap) text = '<WordWrap>' + text;\n    this.drawTextEx(text, x, y, width);\n    y += this.lineHeight();\n}\n\n// Weapon Access\nif (settings.EquipWeapons && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\n    let stypes = targetClass.traits.\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_EQUIP_WTYPE).\n        map(trait => $dataSystem.weaponTypes[trait.dataId]).\n        join(', ');\n    let text = '\\\\C[16]%1:\\\\C[0] \\\\FS[%3]%2'.format(TextManager.weapon, stypes, fontSize || 22);\n    if (removeIcons) text = text.replace(/\\\\I\\[(\\d+)\\]/gi, '');\n    if (wordWrap) text = '<WordWrap>' + text;\n    this.drawTextEx(text, x, y, width);\n    y += this.lineHeight();\n}"
 *
 * @param Window_ClassTier_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassTier
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._statusWindow.width;\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param Window_ClassList
 *
 * @param Window_ClassList_BgType:num
 * @text Background Type
 * @parent Window_ClassList
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
 * @param VocabUnassignClass:str
 * @text Unassign Class
 * @parent Window_ClassList
 * @desc Text used for an empty class slot.
 * @default Unassign Class
 *
 * @param UnassignHelpDescription:json
 * @text Help Description
 * @parent VocabUnassignClass:str
 * @type note
 * @desc Help description for unassigning a class.
 * @default "Remove any classes for this slot."
 *
 * @param Window_ClassList_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassList
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._statusWindow.width;\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Class Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ClassPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Class Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Class Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type Number
 * @desc What's the maximum amount of Class Points an actor can have?
 * Use 0 for unlimited Class Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Class Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Class Points?
 * @default 87
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Class Points appears in-game.
 * @default Class Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Class Points appears in-game.
 * @default CP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[5]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Class Points should an actor gain per action?
 * You may use code.
 * @default 0
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Class Points should an actor gain per level up?
 * You may use code.
 * @default 100
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Class Points should an actor gain per enemy?
 * You may use code.
 * @default 0
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Class Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much CP an actor has earned in battle during the
 * victory phase?
 * @default true
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Class Points as
 * the main acquired resource in the actor windows?
 * @default true
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
/* ----------------------------------------------------------------------------
 * Job Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~JobPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Job Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Job Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type Number
 * @desc What's the maximum amount of Job Points an actor can have?
 * Use 0 for unlimited Job Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Job Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Job Points?
 * @default 188
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Job Points appears in-game.
 * @default Job Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Job Points appears in-game.
 * @default JP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[5]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Job Points should an actor gain per action?
 * You may use code.
 * @default 10 + Math.randomInt(10)
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Job Points should an actor gain per level up?
 * You may use code.
 * @default 0
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Job Points should an actor gain per enemy?
 * You may use code.
 * @default 50 + Math.randomInt(50)
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Job Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much JP an actor has earned in battle during the
 * victory phase?
 * @default true
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Job Points as
 * the main acquired resource in the actor windows?
 * @default true
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
//=============================================================================

const _0x1061=['armor','ClassChangeAddRestrictTier','refreshNoMenuImage','createClassChangeAnimation','AttackStates','StartingClassTier','ParamArrow','drawTextEx','RestrictClassChangeTier','multiclass','Scene_Menu_createCommandWindow','Window_ClassStatus_BgType','drawRightArrow','Game_Actor_setBattlerImage','isBattleMember','highestMulticlassTier','onDatabaseLoaded','AlwaysUnlocked','setBackgroundOpacity','setBattlePortrait','setItem','CoreEngine','loadTitle2','drawUpdatedParamValueDiff','xparam','updateClassLevel','_priorityCharacterName','colSpacing','dimColor1','changeTextColor','gain%1Points','drawClassExpGauge','getMenuImage','addedSkillTypes','right','buttonAssistOffset3','ChangeAdjusHpMp','applyJobPoints','Multiclass','SystemShowClassChangeSystemMenu','MulticlassChangeActorClass','addChild','isEquipWtypeOk','UserGainJobPoints','expParams','length','_windowLayer','loseClassPoints','drawClassPoints','makeDeepCopy','Game_BattlerBase_addedSkills','initMulticlass','ARRAYSTRUCT','checkMulticlasses','_rewards','setBattlerImage','classAdjustHpMp','drawClassResources','jobPointsFull','ElementRates','addOriginalCommands','_multiclassTiers','DrawFaceJS','parse','paramBaseForClass','splice','TRAIT_EQUIP_WTYPE','resetTextColor','MaxResource','AddedSkills','getBattlePortraitFilename','contents','initClassPoints','gainStartingJobPoints','addCommand','levelUpGainAbilityPoints','iconWidth','findMulticlassTier','learnings','loadSystem','ClassChangeAnimation','blt','gainClassPoints','Game_BattlerBase_attackStates','buttonAssistKey3','_classChangeTierRestrictions','getClassIdWithName','General','faceName','maxLvGaugeColor1','classListWindowRect','Scene_Menu_onPersonalOk','removeClassChangeTierRestriction','center','isMainMenuClassChangeSystemVisible','index','skillTypes','setup','isPlaytest','prepareRefreshItemsEquipsCoreLayout','paramchangeTextColor','FUNC','getActorClassBattlePortrait','concat','initClassLevels','ConvertParams','gainClassPointsForMulticlasses','weapon','getActorClassBattlerName','currentClassLevelExp','isUseSkillsStatesCoreUpdatedLayout','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','loseJobPoints','EquipArmors','loadPicture','Weapon-%1-%2','newPage','_priorityBattlePortrait','Game_BattlerBase_debuffRate','1128151MtdlMI','StartingMulticlasses','processShiftRemoveShortcut','BgSettings','Tier','paramRate','Enable','visibleResources','Game_Actor_faceName','getBackgroundOpacity','TierOnlyClass','addMulticlassTiers','Parse_Notetags_Basic','_exp','uiInputPosition','learnSkill','addWindow','drawText','isEnabled','Window_MenuCommand_addOriginalCommands','resetFontSettings','Class-%1-%2','setMainMenuClassChangeSystemVisible','earnedJobPoints','refreshActorPortrait','svbattler','PerEnemy','determineActiveWindow','JobPointsRate','ChangeClassSound','registerActorClassImages','ext','\x5cI[%1]','smoothSelect','gainJobPoints','IconSet','skill','BackRectColor','clearParamPlus','getSkillPoints','setTempActor','Item-%1-%2','VictoryText','ARRAYEVAL','ClassCharaName','DebuffRates','gainExp','drawFadedItemBackground','createClassListWindow','TextColor','getActorClassMenuPortrait','drawBigItemIcon','getMulticlassAtTier','_buttonAssistWindow','ClassChangeRemoveRestrictTier','expGaugeColor2','onPersonalOk','ClassPointsGain','classLevel','jobPointsTotal','filter','AliveActors','levelUp','AbbrText','DisplayedResources','Actor-%1-Class-%2','_ClassChangeSystem_MainMenu','name','isRecommendedLayout','actor','members','width','classPoints','_tempActor','updateHelp','_animations','createStatusWindow','indexOf','_statusWindow','getActorUnlockedClasses','makeRewardsJobPoints','hide','forceRemoveClassChangeAnimations','attackStatesRate','Game_Actor_setCharacterImage','changeClassExp','drawParamText','drawClassLevel','initialize','SnapshotOpacity','changePaintOpacity','Enemy-%1-%2','Window_ClassStatus_RectJS','checkForAutoClassUnlocks','actorClassBattlerName','shift','actorClassFaceName','getActorClassFaceName','item','map','226402sCOsnm','isLearnedSkill','getColor','onBattleStart','bitmap','JobPointsLose','Limit','rightArrowWidth','classExpRate','classPointsRate','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','DrawIcons','180765CCsZya','characterIndex','gainJobPointsForMulticlasses','initClassChangeUnlocks','actorClassBattlePortrait','param','add','bind','ActorUnlockedClasses','EnemyJobPoints','innerWidth','jobPoints','match','onMulticlassOk','State-%1-%2','levelUpGainClassPoints','createCustomBackgroundImages','setupClassChangeSystem','update','gainMulticlassRewardPoints','Tiers','max','level','Actors','_updateClassLearnedSkills','stateResistSet','expForClassLevel','loseMulticlassTiers','_list','currentSymbol','setBackgroundType','Game_Actor_characterIndex','1eJWlkR','format','remove','_classPoints','_scene','split','getActorClassCharacterName','isClassChangeTierRestricted','ConfirmAnimationID','isMainMenuCoreMenuImageOptionAvailable','StateResistance','TargetGainClassPoints','ShowMainMenu','DrawParamJS','MulticlassSetLimit','sparam','hideAdditionalSprites','TRAIT_EQUIP_ATYPE','drawJobPoints','Game_Battler_onBattleStart','actorClassCharacterName','commandPersonal','drawExtraContents','131angatg','frames','height','process_VisuMZ_ClassChangeSystem_Notetags','onMenuImageLoad','code','ConfirmAniPrimaryOffsetY','classChange_multiclass_remove_help','elementRate','setCharacterImage','enabled','refresh','isClassAutoUnlockRequirementsMet','imageSmoothingEnabled','params','getClassChangeBackColor2','floor','Actor-%1-%2','traitObjects','mainAreaHeight','TRAIT_STYPE_ADD','version','_helpWindow','weaponTypes','Game_BattlerBase_isEquipAtypeOk','setMenuImage','ParamRates','clear','Window_ClassList_RectJS','_wordWrap','StartingJobPoints','_jobPoints','1433fOJgeG','maintainLevels','graphicType','applyClassChangeSystemUserEffect','Class','addClassPoints','ClassBattlePortrait','setHelpWindow','addedSkills','log','VisuMZ_1_MainMenuCore','updatedLayoutStyle','skillId','drawActorAbilityPoints','TargetGainJobPoints','<WordWrap>','debuffRate','naturalUnlockClass','expGaugeColor1','MulticlassRaiseLimit','VisuMZ_2_SkillLearnSystem','isBottomHelpMode','AttackElements','EVAL','Game_Actor_traitObjects','forceSelect','Game_Actor_tradeItemWithParty','_highestTier','Game_Actor_getMenuImage','STR','checkShiftRemoveShortcut','createClassTierWindow','createBackground','optExtraExp','ClassUnlockRemoveActor','uiMenuStyle','processCursorMove','ARRAYFUNC','actorId','drawItemActorSvBattler','BattleManager_gainExp','drawActorFace','isMainMenuClassChangeSystemEnabled','onActorChange','earnedClassPoints','refreshActor','isActor','dataId','playBuzzerSound','SkillLearnSystem','PerLevelUp','boxWidth','popScene','VisuMZ_1_MessageCore','isClassExpGaugeDrawn','trim','StartClassJobPoints','displayRewardsClassPoints','_unlockedClasses','Game_Action_applyItemUserEffect','paintOpacity','cancel','attackStates','addJobPoints','MenuPortraits','Game_BattlerBase_addedSkillTypes','initClassChangeSystemMainMenu','Game_BattlerBase_elementRate','XParamRates','SharedResource','Scene_Boot_onDatabaseLoaded','setMulticlassTiers','Game_Actor_setFaceImage','getJobPoints','min','Skill-%1-%2','jobPointsIcon','finalExpRate','centerSprite','SParamRates','itemRectWithPadding','Game_Actor_faceIndex','armorTypes','isRightInputMode','changeMulticlass','Game_BattlerBase_attackElements','isAlive','gradientFillRect','playStaticSe','ClassPointsLose','initClassChangeSystem','arePageButtonsEnabled','paramValueFontSize','jobPointsAbbr','playOkSound','expRate','totalMulticlass','clamp','unlockClass','JobPointsSet','setActor','buttonAssistText3','updateClassLearnedSkills','traits','pow','apply','characterName','classDescription','constructor','BattleManager_endBattle','return\x200','deadMembers','classPointsTotal','_ClassChangeSystem_preventLevelUpGain','playClassChange','attackElements','drawItem','isClassChangeCommandEnabled','paramValueByName','EquipWeapons','setClassPoints','AddedStypes','includes','removeChild','Game_BattlerBase_sparam','sprite','checkForNewUnlockedClasses','JobPoints','setHandler','displayRewardsJobPoints','_multiclassCheck','MainMenu','Game_BattlerBase_stateResistSet','test','actorClassFaceIndex','getClassChangeTiersOnly','battlerName','adjustSprite','classPointsFmt','drawParameterList','drawItemDarkRect','innerHeight','isWordWrapEnabled','FullText','setHp','Window_ClassTier_ExtraJS','addLoadListener','drawPicture','VisuMZ_0_CoreEngine','RegExp','reduce','_classLevel','Window_ClassTier_RectJS','mpRate','jobPointsRate','getActorClassCharacterIndex','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Game_BattlerBase_xparam','faceIndex','isMVAnimation','changeExp','activate','setJobPoints','_backSprite2','highestTier','shown','ConfirmAniSubclassOffsetX','active','_priorityBattlerName','mmp','_context','note','actorParams','replace','recoverAll','battleMembers','Game_Party_initialize','_classIDs','makeCommandList','gainMulticlassExp','classPointsFull','Game_Actor_setMenuImage','none','updateClassChangeAnimations','nextClassLevelExp','multiclasses','maxLvGaugeColor2','addClassChangeSystemCommand','applyClassPoints','applyItemClassChangeSystemUserEffect','Game_BattlerBase_stateRate','ParamValueFontSize','textColor','createAnimationDummySprite','Game_Actor_paramBase','PerAction','hpRate','inBattle','_priorityMenuImage','jobPointsVisible','_classTierWindow','deselect','drawActorSkillPoints','drawActorJobPoints','show','getAbilityPoints','_tier','drawUpdatedAfterParamValue','mainAreaTop','registerCommand','drawGauge','HelpDescription','toUpperCase','#%1','pageup','isUseParamNamesWithIcons','initJobPoints','classPointsVisible','setStatusWindow','previousActor','StartingClassPoints','gainRewardsClassPoints','ClassPoints','gainRewardsJobPoints','BattleManager_makeRewards','description','classPointsAbbr','_earnedClassPoints','Game_BattlerBase_paramRate','_cache','displayRewards','Name','drawItemActorSprite','Points','\x5cC[16]%1:\x5cC[0]\x20\x5cFS[%3]%2','makeRewardsClassPoints','textSizeEx','drawActorResources','_classChangeTier','TextFmt','classTierWindowRect','MAX_SAFE_INTEGER','6378QnIIdN','setTier','currentClass','isTriggered','setFaceImage','removeUnlockedClass','currentExt','tier','DrawPortraitJS','JobPointsAdd','drawItemActorMenuImage','BgFilename2','ClassUnlockRemoveGlobal','ParseClassNotetags','isShiftRemoveShortcutEnabled','push','classChange','ParseAllNotetags','exit','_commandWindow','paramBase','addClassChangeTierRestriction','addClassChangeSystemCommandAutomatically','Classes','itemRect','Param','setText','_actor','left','VisuMZ_2_ClassChangeSystem','EnemyClassPoints','ClassMenuPortrait','buttonAssistSlotWindowShift','paramRate%1','endBattle','allMembers','getUnlockedClasses','tradeItemWithParty','getActorClassFaceIndex','itemPadding','classPointsIcon','classChange_multiclass_remove','SkillPoints','Icon','setMp','call','ARRAYNUM','subject','Game_Actor_characterName','ClassChangeSystem','getMulticlasses','stateRate','isClassChangeCommandVisible','isEquipAtypeOk','getClassChangeAnimationID','_backSprite1','canShiftRemoveClass','pagedown','itemHeight','Show','getClassPoints','Game_Actor_getBattlePortraitFilename','ClassPointsRate','multiclassId','round','_priorityFaceIndex','onClassListOk','Game_Actor_levelUp','_targets','actorClassCharacterIndex','Job','applyItemUserEffect','isPlaying','StartClassClassPoints','SystemEnableClassChangeSystemMenu','83HbbSyU','Game_BattlerBase_attackStatesRate','ClassDescription','Game_System_initialize','Settings','status','createCommandWindow','Window','Game_BattlerBase_isEquipWtypeOk','(+%1)','enemy','_priorityFaceName','classChange_multiclass_noClass','onClassListCancel','statusWindowRect','(%1)','callUpdateHelp','actorClassMenuPortrait','createKeyJS','ParseActorNotetags','classIcon','drawActorClassPoints','ClassBattlerName','fillRect','_earnedJobPoints','classChange_multiclass_ShiftHelp','updateStatusWindow','systemColor','initClassChangeRestrictions','ClassUnlockForActor','996555cLSWbR','2158708XbvVUN','DrawBackRect','_classId','iconIndex','sort','Game_Actor_battlerName','nextActor','Game_Actor_changeClass','deactivate','changeClass','_priorityCharacterIndex','prototype','lineHeight','ARRAYJSON','ClassFaceName','ShiftShortcutKey','AutoUnlockRequirements','levelUpGainJobPoints','applyMulticlassObjects','_multiclasses','MulticlassLowerLimit','create','uiHelpPosition','join','bigPicture','drawBigItemImage','MaintainLevels','jobPointsFmt','_classListWindow','ClassIcon','LayoutStyle'];const _0x3773=function(_0x5155b4,_0x926e86){_0x5155b4=_0x5155b4-0xc4;let _0x1061c1=_0x1061[_0x5155b4];return _0x1061c1;};const _0x15b20a=_0x3773;(function(_0x2904d3,_0x1a6cbe){const _0x2c321e=_0x3773;while(!![]){try{const _0x5d70b6=parseInt(_0x2c321e(0xe7))*-parseInt(_0x2c321e(0x224))+parseInt(_0x2c321e(0x2d9))*-parseInt(_0x2c321e(0x369))+-parseInt(_0x2c321e(0x33d))+parseInt(_0x2c321e(0x349))+-parseInt(_0x2c321e(0x242))+-parseInt(_0x2c321e(0xc7))*-parseInt(_0x2c321e(0x1d9))+parseInt(_0x2c321e(0x243));if(_0x5d70b6===_0x1a6cbe)break;else _0x2904d3['push'](_0x2904d3['shift']());}catch(_0x55f3ff){_0x2904d3['push'](_0x2904d3['shift']());}}}(_0x1061,0xac1b0));var label=_0x15b20a(0x20a),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x15b20a(0x315)](function(_0x42610c){const _0x152902=_0x15b20a;return _0x42610c[_0x152902(0x229)]&&_0x42610c[_0x152902(0x1c8)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x15b20a(0x228)]=VisuMZ[label][_0x15b20a(0x228)]||{},VisuMZ[_0x15b20a(0x2cb)]=function(_0x11cd8b,_0x2d43df){const _0x454b23=_0x15b20a;for(const _0x50adb4 in _0x2d43df){if(_0x50adb4[_0x454b23(0x355)](/(.*):(.*)/i)){const _0x43af54=String(RegExp['$1']),_0x24e3ac=String(RegExp['$2'])['toUpperCase']()[_0x454b23(0x11e)]();let _0x5bc9f7,_0x3051b,_0x318728;switch(_0x24e3ac){case'NUM':_0x5bc9f7=_0x2d43df[_0x50adb4]!==''?Number(_0x2d43df[_0x50adb4]):0x0;break;case _0x454b23(0x207):_0x3051b=_0x2d43df[_0x50adb4]!==''?JSON[_0x454b23(0x2a1)](_0x2d43df[_0x50adb4]):[],_0x5bc9f7=_0x3051b[_0x454b23(0x33c)](_0x259cdc=>Number(_0x259cdc));break;case _0x454b23(0xfe):_0x5bc9f7=_0x2d43df[_0x50adb4]!==''?eval(_0x2d43df[_0x50adb4]):null;break;case _0x454b23(0x304):_0x3051b=_0x2d43df[_0x50adb4]!==''?JSON[_0x454b23(0x2a1)](_0x2d43df[_0x50adb4]):[],_0x5bc9f7=_0x3051b[_0x454b23(0x33c)](_0x3f4139=>eval(_0x3f4139));break;case'JSON':_0x5bc9f7=_0x2d43df[_0x50adb4]!==''?JSON[_0x454b23(0x2a1)](_0x2d43df[_0x50adb4]):'';break;case _0x454b23(0x250):_0x3051b=_0x2d43df[_0x50adb4]!==''?JSON[_0x454b23(0x2a1)](_0x2d43df[_0x50adb4]):[],_0x5bc9f7=_0x3051b[_0x454b23(0x33c)](_0xbfcd6c=>JSON['parse'](_0xbfcd6c));break;case _0x454b23(0x2c7):_0x5bc9f7=_0x2d43df[_0x50adb4]!==''?new Function(JSON[_0x454b23(0x2a1)](_0x2d43df[_0x50adb4])):new Function(_0x454b23(0x155));break;case _0x454b23(0x10c):_0x3051b=_0x2d43df[_0x50adb4]!==''?JSON[_0x454b23(0x2a1)](_0x2d43df[_0x50adb4]):[],_0x5bc9f7=_0x3051b[_0x454b23(0x33c)](_0x4dc8a3=>new Function(JSON[_0x454b23(0x2a1)](_0x4dc8a3)));break;case _0x454b23(0x104):_0x5bc9f7=_0x2d43df[_0x50adb4]!==''?String(_0x2d43df[_0x50adb4]):'';break;case'ARRAYSTR':_0x3051b=_0x2d43df[_0x50adb4]!==''?JSON['parse'](_0x2d43df[_0x50adb4]):[],_0x5bc9f7=_0x3051b[_0x454b23(0x33c)](_0x4682cf=>String(_0x4682cf));break;case'STRUCT':_0x318728=_0x2d43df[_0x50adb4]!==''?JSON[_0x454b23(0x2a1)](_0x2d43df[_0x50adb4]):{},_0x5bc9f7=VisuMZ[_0x454b23(0x2cb)]({},_0x318728);break;case _0x454b23(0x296):_0x3051b=_0x2d43df[_0x50adb4]!==''?JSON[_0x454b23(0x2a1)](_0x2d43df[_0x50adb4]):[],_0x5bc9f7=_0x3051b[_0x454b23(0x33c)](_0x55fa3c=>VisuMZ[_0x454b23(0x2cb)]({},JSON[_0x454b23(0x2a1)](_0x55fa3c)));break;default:continue;}_0x11cd8b[_0x43af54]=_0x5bc9f7;}}return _0x11cd8b;},(_0x51e53f=>{const _0x553921=_0x15b20a,_0x375b43=_0x51e53f['name'];for(const _0x180cdd of dependencies){if(!Imported[_0x180cdd]){alert(_0x553921(0x2d1)[_0x553921(0x36a)](_0x375b43,_0x180cdd)),SceneManager[_0x553921(0x1eb)]();break;}}const _0x30f05b=_0x51e53f[_0x553921(0x1c8)];if(_0x30f05b['match'](/\[Version[ ](.*?)\]/i)){const _0x17b288=Number(RegExp['$1']);_0x17b288!==VisuMZ[label][_0x553921(0xdc)]&&(alert(_0x553921(0x347)[_0x553921(0x36a)](_0x375b43,_0x17b288)),SceneManager[_0x553921(0x1eb)]());}if(_0x30f05b['match'](/\[Tier[ ](\d+)\]/i)){const _0x4a63fb=Number(RegExp['$1']);_0x4a63fb<tier?(alert(_0x553921(0x183)['format'](_0x375b43,_0x4a63fb,tier)),SceneManager[_0x553921(0x1eb)]()):tier=Math[_0x553921(0x35e)](_0x4a63fb,tier);}VisuMZ[_0x553921(0x2cb)](VisuMZ[label]['Settings'],_0x51e53f['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData[_0x15b20a(0x31c)],_0x15b20a(0x241),_0x187e8b=>{const _0xfcd076=_0x15b20a;VisuMZ[_0xfcd076(0x2cb)](_0x187e8b,_0x187e8b);const _0x51d82a=_0x187e8b[_0xfcd076(0x360)][_0xfcd076(0x33c)](_0x496dc7=>$gameActors['actor'](_0x496dc7)),_0x259d87=_0x187e8b['Classes'];for(const _0x2118f6 of _0x51d82a){if(!_0x2118f6)continue;for(const _0x28d79c of _0x259d87){_0x2118f6[_0xfcd076(0x149)](_0x28d79c);}}}),PluginManager[_0x15b20a(0x1b8)](pluginData['name'],'ClassUnlockForGlobal',_0x4607ad=>{const _0x21f034=_0x15b20a;VisuMZ[_0x21f034(0x2cb)](_0x4607ad,_0x4607ad);const _0x1c097b=_0x4607ad[_0x21f034(0x1f0)];for(const _0x54a456 of _0x1c097b){$gameParty[_0x21f034(0x149)](_0x54a456);}}),PluginManager[_0x15b20a(0x1b8)](pluginData['name'],_0x15b20a(0x109),_0x5ad58a=>{const _0x1137c3=_0x15b20a;VisuMZ['ConvertParams'](_0x5ad58a,_0x5ad58a);const _0x5d603a=_0x5ad58a[_0x1137c3(0x360)][_0x1137c3(0x33c)](_0x2d9860=>$gameActors['actor'](_0x2d9860)),_0x19a9a4=_0x5ad58a[_0x1137c3(0x1f0)];for(const _0x317b31 of _0x5d603a){if(!_0x317b31)continue;for(const _0x1aa5df of _0x19a9a4){_0x317b31[_0x1137c3(0x1de)](_0x1aa5df);}}}),PluginManager[_0x15b20a(0x1b8)](pluginData[_0x15b20a(0x31c)],_0x15b20a(0x1e5),_0x108bca=>{const _0x47f6be=_0x15b20a;VisuMZ['ConvertParams'](_0x108bca,_0x108bca);const _0x55240e=_0x108bca['Classes'];for(const _0x120bf4 of _0x55240e){$gameParty[_0x47f6be(0x1de)](_0x120bf4);}}),PluginManager[_0x15b20a(0x1b8)](pluginData[_0x15b20a(0x31c)],_0x15b20a(0x263),_0x52f78b=>{const _0x39fdfd=_0x15b20a;VisuMZ['ConvertParams'](_0x52f78b,_0x52f78b);const _0xace145=_0x52f78b['Actors'][_0x39fdfd(0x33c)](_0x53d47b=>$gameActors[_0x39fdfd(0x31e)](_0x53d47b)),_0x51070d=_0x52f78b[_0x39fdfd(0x35d)];for(const _0x334653 of _0xace145){if(!_0x334653)continue;for(const _0x30a24c of _0x51070d){_0x334653[_0x39fdfd(0x1ee)](_0x30a24c);}}}),PluginManager['registerCommand'](pluginData['name'],_0x15b20a(0x30f),_0x4b8ed0=>{const _0x55dfb5=_0x15b20a;VisuMZ[_0x55dfb5(0x2cb)](_0x4b8ed0,_0x4b8ed0);const _0x5c69d3=_0x4b8ed0[_0x55dfb5(0x360)]['map'](_0x495bab=>$gameActors[_0x55dfb5(0x31e)](_0x495bab)),_0xdd20f=_0x4b8ed0[_0x55dfb5(0x35d)];for(const _0x2ac5da of _0x5c69d3){if(!_0x2ac5da)continue;for(const _0x396846 of _0xdd20f){_0x2ac5da[_0x55dfb5(0x2be)](_0x396846);}}}),PluginManager['registerCommand'](pluginData['name'],_0x15b20a(0x28a),_0x771f6e=>{const _0x1816ef=_0x15b20a;VisuMZ[_0x1816ef(0x2cb)](_0x771f6e,_0x771f6e);const _0x464e06=_0x771f6e[_0x1816ef(0x360)][_0x1816ef(0x33c)](_0x50e51b=>$gameActors['actor'](_0x50e51b)),_0x322b60=_0x771f6e[_0x1816ef(0x2dd)],_0x41e272=_0x771f6e['ClassID'];for(const _0x3b8965 of _0x464e06){if(!_0x3b8965)continue;_0x3b8965['changeMulticlass'](_0x41e272,_0x322b60);}}),PluginManager[_0x15b20a(0x1b8)](pluginData['name'],_0x15b20a(0xfa),_0x215daa=>{const _0x585fd=_0x15b20a;VisuMZ[_0x585fd(0x2cb)](_0x215daa,_0x215daa);const _0x36a6d9=_0x215daa['Actors'][_0x585fd(0x33c)](_0x3afa07=>$gameActors['actor'](_0x3afa07)),_0xba9ed=_0x215daa[_0x585fd(0x343)];for(const _0x4f02d8 of _0x36a6d9){if(!_0x4f02d8)continue;_0x4f02d8[_0x585fd(0x2e4)](_0xba9ed);}}),PluginManager[_0x15b20a(0x1b8)](pluginData[_0x15b20a(0x31c)],_0x15b20a(0x257),_0x5dc3e4=>{const _0x1c3131=_0x15b20a;VisuMZ['ConvertParams'](_0x5dc3e4,_0x5dc3e4);const _0x277a5d=_0x5dc3e4[_0x1c3131(0x360)][_0x1c3131(0x33c)](_0x21c6ff=>$gameActors['actor'](_0x21c6ff)),_0xc05fef=_0x5dc3e4[_0x1c3131(0x343)];for(const _0x3a9aaf of _0x277a5d){if(!_0x3a9aaf)continue;_0x3a9aaf[_0x1c3131(0x364)](_0xc05fef);}}),PluginManager[_0x15b20a(0x1b8)](pluginData[_0x15b20a(0x31c)],_0x15b20a(0x377),_0x297465=>{const _0x39168d=_0x15b20a;VisuMZ[_0x39168d(0x2cb)](_0x297465,_0x297465);const _0x5ca1c6=_0x297465[_0x39168d(0x360)][_0x39168d(0x33c)](_0x4647cd=>$gameActors['actor'](_0x4647cd)),_0x1752e1=_0x297465[_0x39168d(0x343)];for(const _0x216e91 of _0x5ca1c6){if(!_0x216e91)continue;_0x216e91[_0x39168d(0x12e)](_0x1752e1);}}),PluginManager['registerCommand'](pluginData['name'],_0x15b20a(0x312),_0x3db6df=>{const _0x3076ed=_0x15b20a;VisuMZ[_0x3076ed(0x2cb)](_0x3db6df,_0x3db6df);const _0x742370=_0x3db6df[_0x3076ed(0x360)][_0x3076ed(0x33c)](_0x143307=>$gameActors[_0x3076ed(0x31e)](_0x143307)),_0xa5140a=_0x3db6df[_0x3076ed(0x1f0)],_0x4e4a6e=_0x3db6df[_0x3076ed(0x1d0)];for(const _0x1f5517 of _0x742370){if(!_0x1f5517)continue;for(const _0x224fef of _0xa5140a){_0x1f5517[_0x3076ed(0x2b4)](_0x4e4a6e,_0x224fef);}}}),PluginManager[_0x15b20a(0x1b8)](pluginData['name'],'ClassPointsAdd',_0x544020=>{const _0x2d0361=_0x15b20a;VisuMZ[_0x2d0361(0x2cb)](_0x544020,_0x544020);const _0x2c2ec2=_0x544020[_0x2d0361(0x360)][_0x2d0361(0x33c)](_0x2bd9fe=>$gameActors['actor'](_0x2bd9fe)),_0x240a92=_0x544020['Classes'],_0x1ee932=_0x544020[_0x2d0361(0x1d0)];for(const _0x37db1f of _0x2c2ec2){if(!_0x37db1f)continue;for(const _0x29703f of _0x240a92){_0x37db1f[_0x2d0361(0xec)](_0x1ee932,_0x29703f);}}}),PluginManager[_0x15b20a(0x1b8)](pluginData['name'],_0x15b20a(0x140),_0x592de4=>{const _0x547726=_0x15b20a;VisuMZ[_0x547726(0x2cb)](_0x592de4,_0x592de4);const _0xf50e7c=_0x592de4[_0x547726(0x360)][_0x547726(0x33c)](_0x1f4b99=>$gameActors[_0x547726(0x31e)](_0x1f4b99)),_0x58e82e=_0x592de4[_0x547726(0x1f0)],_0x317f78=_0x592de4['Points'];for(const _0x3ce79c of _0xf50e7c){if(!_0x3ce79c)continue;for(const _0x59e946 of _0x58e82e){_0x3ce79c[_0x547726(0x291)](_0x317f78,_0x59e946);}}}),PluginManager[_0x15b20a(0x1b8)](pluginData[_0x15b20a(0x31c)],'ClassPointsSet',_0x50fa38=>{const _0x5cf4d3=_0x15b20a;VisuMZ[_0x5cf4d3(0x2cb)](_0x50fa38,_0x50fa38);const _0x347976=_0x50fa38[_0x5cf4d3(0x360)][_0x5cf4d3(0x33c)](_0x53163d=>$gameActors[_0x5cf4d3(0x31e)](_0x53163d)),_0x5a0582=_0x50fa38[_0x5cf4d3(0x1f0)],_0x3667d2=_0x50fa38['Points'];for(const _0x27631b of _0x347976){if(!_0x27631b)continue;for(const _0x3262f7 of _0x5a0582){_0x27631b[_0x5cf4d3(0x15f)](_0x3667d2,_0x3262f7);}}}),PluginManager['registerCommand'](pluginData[_0x15b20a(0x31c)],'JobPointsGain',_0x1a75f3=>{const _0x194f0d=_0x15b20a;VisuMZ[_0x194f0d(0x2cb)](_0x1a75f3,_0x1a75f3);const _0x4a6ac2=_0x1a75f3[_0x194f0d(0x360)][_0x194f0d(0x33c)](_0x4723e7=>$gameActors[_0x194f0d(0x31e)](_0x4723e7)),_0x11bf78=_0x1a75f3[_0x194f0d(0x1f0)],_0x333979=_0x1a75f3[_0x194f0d(0x1d0)];for(const _0x2b8b9e of _0x4a6ac2){if(!_0x2b8b9e)continue;for(const _0x567bfb of _0x11bf78){_0x2b8b9e[_0x194f0d(0x2fb)](_0x333979,_0x567bfb);}}}),PluginManager[_0x15b20a(0x1b8)](pluginData['name'],_0x15b20a(0x1e2),_0x5bd3ec=>{const _0x5a7872=_0x15b20a;VisuMZ[_0x5a7872(0x2cb)](_0x5bd3ec,_0x5bd3ec);const _0x7b8635=_0x5bd3ec['Actors'][_0x5a7872(0x33c)](_0xf72553=>$gameActors['actor'](_0xf72553)),_0x325495=_0x5bd3ec[_0x5a7872(0x1f0)],_0x37d78a=_0x5bd3ec[_0x5a7872(0x1d0)];for(const _0x1607b0 of _0x7b8635){if(!_0x1607b0)continue;for(const _0x55a244 of _0x325495){_0x1607b0[_0x5a7872(0x126)](_0x37d78a,_0x55a244);}}}),PluginManager[_0x15b20a(0x1b8)](pluginData[_0x15b20a(0x31c)],_0x15b20a(0x342),_0x10c85f=>{const _0x19b439=_0x15b20a;VisuMZ[_0x19b439(0x2cb)](_0x10c85f,_0x10c85f);const _0x180571=_0x10c85f['Actors'][_0x19b439(0x33c)](_0x249eaf=>$gameActors[_0x19b439(0x31e)](_0x249eaf)),_0x404f2a=_0x10c85f[_0x19b439(0x1f0)],_0x1e7d78=_0x10c85f[_0x19b439(0x1d0)];for(const _0x117dc9 of _0x180571){if(!_0x117dc9)continue;for(const _0x2c9d6d of _0x404f2a){_0x117dc9[_0x19b439(0x2d2)](_0x1e7d78,_0x2c9d6d);}}}),PluginManager[_0x15b20a(0x1b8)](pluginData[_0x15b20a(0x31c)],_0x15b20a(0x14a),_0x6a926f=>{const _0x119c01=_0x15b20a;VisuMZ['ConvertParams'](_0x6a926f,_0x6a926f);const _0x36fa4d=_0x6a926f[_0x119c01(0x360)][_0x119c01(0x33c)](_0x34cba8=>$gameActors[_0x119c01(0x31e)](_0x34cba8)),_0x222e42=_0x6a926f[_0x119c01(0x1f0)],_0x1926e3=_0x6a926f[_0x119c01(0x1d0)];for(const _0x4c3ae5 of _0x36fa4d){if(!_0x4c3ae5)continue;for(const _0x4749a8 of _0x222e42){_0x4c3ae5[_0x119c01(0x189)](_0x1926e3,_0x4749a8);}}}),PluginManager[_0x15b20a(0x1b8)](pluginData[_0x15b20a(0x31c)],_0x15b20a(0x223),_0x4a9f07=>{const _0x1fdcb0=_0x15b20a;VisuMZ['ConvertParams'](_0x4a9f07,_0x4a9f07),$gameSystem['setMainMenuClassChangeSystemEnabled'](_0x4a9f07[_0x1fdcb0(0x2df)]);}),PluginManager[_0x15b20a(0x1b8)](pluginData[_0x15b20a(0x31c)],_0x15b20a(0x289),_0x4af1c7=>{const _0x5c8c9f=_0x15b20a;VisuMZ[_0x5c8c9f(0x2cb)](_0x4af1c7,_0x4af1c7),$gameSystem['setMainMenuClassChangeSystemVisible'](_0x4af1c7[_0x5c8c9f(0x214)]);}),VisuMZ[_0x15b20a(0x20a)]['functionName']=function(){const _0x5462a9=_0x15b20a;try{}catch(_0x3f6a31){if($gameTemp[_0x5462a9(0x2c4)]())console['log'](_0x3f6a31);}},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x12d)]=Scene_Boot['prototype'][_0x15b20a(0x272)],Scene_Boot[_0x15b20a(0x24e)][_0x15b20a(0x272)]=function(){const _0x8c3039=_0x15b20a;VisuMZ[_0x8c3039(0x20a)]['Scene_Boot_onDatabaseLoaded']['call'](this),this['process_VisuMZ_ClassChangeSystem']();},Scene_Boot[_0x15b20a(0x24e)]['process_VisuMZ_ClassChangeSystem']=function(){this['process_VisuMZ_ClassChangeSystem_Notetags']();},VisuMZ['ClassChangeSystem'][_0x15b20a(0x17c)]={'StartingClassPoints':/<STARTING (?:CLASS POINTS|JP):[ ](.*)>/i,'StartClassClassPoints':/<CLASS (.*) STARTING (?:CLASS POINTS|JP):[ ](.*)>/gi,'UserGainClassPoints':/<(?:CLASS POINTS|JP|USER CLASS POINTS|USER JP) GAIN:[ ](.*)>/i,'TargetGainClassPoints':/<TARGET (?:CLASS POINTS|JP) GAIN:[ ](.*)>/i,'EnemyClassPoints':/<(?:CLASS POINTS|JP):[ ](.*)>/i,'ClassPointsRate':/<(?:CLASS POINTS|JP) RATE:[ ](\d+)([%％])>/i,'StartingJobPoints':/<STARTING (?:JOB POINTS|JP):[ ](.*)>/i,'StartClassJobPoints':/<CLASS (.*) STARTING (?:JOB POINTS|JP):[ ](.*)>/gi,'UserGainJobPoints':/<(?:JOB POINTS|JP|USER JOB POINTS|USER JP) GAIN:[ ](.*)>/i,'TargetGainJobPoints':/<TARGET (?:JOB POINTS|JP) GAIN:[ ](.*)>/i,'EnemyJobPoints':/<(?:JOB POINTS|JP):[ ](.*)>/i,'JobPointsRate':/<(?:JOB POINTS|JP) RATE:[ ](\d+)([%％])>/i,'ClassDescription':/<(?:HELP|DESCRIPTION|HELP DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|DESCRIPTION|HELP DESCRIPTION)>/i,'ClassIcon':/<(?:ICON|ICON INDEX):[ ](\d+)>/i,'classPicture':/<(?:CLASS|CLASS CHANGE) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'ClassFaceName':/<(.*)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'ClassCharaName':/<(.*)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'ClassBattlerName':/<(.*)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'ClassMenuPortrait':/<(.*)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'ClassBattlePortrait':/<(.*)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'ActorUnlockedClasses':/<(?:UNLOCK|UNLOCKED) (?:CLASS|CLASSES):[ ](.*)>/gi,'AutoUnlockRequirements':/<(?:AUTO|AUTOMATIC) UNLOCK REQUIREMENTS>\s*([\s\S]*)\s*<\/(?:AUTO|AUTOMATIC) UNLOCK REQUIREMENTS>/i,'StartingMulticlasses':/<STARTING MULTICLASSES:[ ](\d+)>/i,'StartingClassTier':/<STARTING TIER[ ](\d+)[ ]CLASS:[ ](.*)>/gi,'RestrictClassChangeTier':/<RESTRICT CLASS CHANGE (?:TIER|TIERS):[ ](.*)>/gi,'TierOnlyClass':/<CLASS CHANGE (?:TIER|TIERS) ONLY:[ ](.*)>/gi,'ClassChangeAnimation':/<CLASS CHANGE ANIMATION:[ ](\d+)>/i},Scene_Boot[_0x15b20a(0x24e)][_0x15b20a(0xca)]=function(){const _0x2cbbbc=_0x15b20a;if(VisuMZ[_0x2cbbbc(0x1ea)])return;for(const _0x4504d3 of $dataActors){if(!_0x4504d3)continue;ImageManager[_0x2cbbbc(0x2f7)](_0x4504d3);}for(const _0x5be9b8 of $dataClasses){if(!_0x5be9b8)continue;VisuMZ[_0x2cbbbc(0x20a)][_0x2cbbbc(0x2e5)](_0x5be9b8);}},VisuMZ[_0x15b20a(0x20a)]['JS']={},VisuMZ['ClassChangeSystem']['createJS']=function(_0x370d01,_0x1b263a,_0x212f01){const _0x5e217b=_0x15b20a,_0x310b39=_0x370d01[_0x5e217b(0x192)];if(_0x310b39[_0x5e217b(0x355)](_0x212f01)){const _0x5143b8=String(RegExp['$1']),_0x17d5e9='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x200;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x5e217b(0x36a)](_0x5143b8),_0xc771d4=VisuMZ[_0x5e217b(0x20a)][_0x5e217b(0x236)](_0x370d01,_0x1b263a);VisuMZ[_0x5e217b(0x20a)]['JS'][_0xc771d4]=new Function(_0x17d5e9);}},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x236)]=function(_0x22f07c,_0xd661f1){const _0x2b07df=_0x15b20a;let _0x5902e8='';if($dataActors[_0x2b07df(0x161)](_0x22f07c))_0x5902e8=_0x2b07df(0xd8)['format'](_0x22f07c['id'],_0xd661f1);if($dataClasses['includes'](_0x22f07c))_0x5902e8=_0x2b07df(0x2ee)[_0x2b07df(0x36a)](_0x22f07c['id'],_0xd661f1);if($dataSkills[_0x2b07df(0x161)](_0x22f07c))_0x5902e8=_0x2b07df(0x132)[_0x2b07df(0x36a)](_0x22f07c['id'],_0xd661f1);if($dataItems[_0x2b07df(0x161)](_0x22f07c))_0x5902e8=_0x2b07df(0x302)[_0x2b07df(0x36a)](_0x22f07c['id'],_0xd661f1);if($dataWeapons['includes'](_0x22f07c))_0x5902e8=_0x2b07df(0x2d5)['format'](_0x22f07c['id'],_0xd661f1);if($dataArmors[_0x2b07df(0x161)](_0x22f07c))_0x5902e8='Armor-%1-%2'['format'](_0x22f07c['id'],_0xd661f1);if($dataEnemies[_0x2b07df(0x161)](_0x22f07c))_0x5902e8=_0x2b07df(0x334)[_0x2b07df(0x36a)](_0x22f07c['id'],_0xd661f1);if($dataStates[_0x2b07df(0x161)](_0x22f07c))_0x5902e8=_0x2b07df(0x357)[_0x2b07df(0x36a)](_0x22f07c['id'],_0xd661f1);return _0x5902e8;},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x237)]=VisuMZ[_0x15b20a(0x237)],VisuMZ[_0x15b20a(0x237)]=function(_0x377e85){const _0x1bd59f=_0x15b20a;VisuMZ['ClassChangeSystem'][_0x1bd59f(0x237)][_0x1bd59f(0x206)](this,_0x377e85),ImageManager[_0x1bd59f(0x2f7)](_0x377e85);},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x1e6)]=VisuMZ[_0x15b20a(0x1e6)],VisuMZ[_0x15b20a(0x1e6)]=function(_0x1d5377){const _0x280a06=_0x15b20a;VisuMZ['ClassChangeSystem'][_0x280a06(0x1e6)]['call'](this,_0x1d5377),VisuMZ[_0x280a06(0x20a)]['Parse_Notetags_Basic'](_0x1d5377);},VisuMZ['ClassChangeSystem']['Parse_Notetags_Basic']=function(_0x81a02c){const _0x247708=_0x15b20a;_0x81a02c['iconIndex']=ImageManager[_0x247708(0x238)]||0x0,_0x81a02c[_0x247708(0x1c8)]=TextManager[_0x247708(0x152)][_0x247708(0x36a)](_0x81a02c['name']||'');const _0x4930ed=VisuMZ[_0x247708(0x20a)][_0x247708(0x17c)],_0x2eea08=_0x81a02c[_0x247708(0x192)];_0x2eea08[_0x247708(0x355)](_0x4930ed[_0x247708(0x260)])&&(_0x81a02c['iconIndex']=Number(RegExp['$1'])),_0x2eea08['match'](_0x4930ed[_0x247708(0x226)])&&(_0x81a02c[_0x247708(0x1c8)]=String(RegExp['$1']));},DataManager[_0x15b20a(0x328)]=function(_0x769eb6){const _0x291778=_0x15b20a;if(!_0x769eb6)return[];let _0x40ef3a=[];return _0x40ef3a=_0x40ef3a[_0x291778(0x2c9)](_0x769eb6[_0x291778(0x20b)]()['map'](_0x1a8fe5=>_0x1a8fe5['id'])),_0x40ef3a=_0x40ef3a[_0x291778(0x2c9)](_0x769eb6[_0x291778(0x1fd)]()),_0x40ef3a=_0x40ef3a[_0x291778(0x2c9)]($gameParty['getUnlockedClasses']()),_0x40ef3a=_0x40ef3a[_0x291778(0x2c9)](VisuMZ[_0x291778(0x20a)]['Settings'][_0x291778(0x2b9)][_0x291778(0x273)]),_0x40ef3a=_0x40ef3a['filter']((_0x1044bc,_0x121fc6,_0x5d7461)=>_0x5d7461['indexOf'](_0x1044bc)===_0x121fc6),_0x40ef3a[_0x291778(0x247)](function(_0x56ccf1,_0x33a5cc){return _0x56ccf1-_0x33a5cc;}),_0x40ef3a[_0x291778(0x33c)](_0x1a96c8=>$dataClasses[_0x1a96c8])[_0x291778(0x36b)](null);},DataManager[_0x15b20a(0x165)]=function(_0x26d83b){const _0x2227db=_0x15b20a,_0x52bdc1=[],_0x979f36=DataManager['getActorUnlockedClasses'](_0x26d83b);for(const _0x2ad75b of $dataClasses){if(!_0x2ad75b)continue;if(_0x979f36[_0x2227db(0x161)](_0x2ad75b))continue;this['isClassAutoUnlockRequirementsMet'](_0x26d83b,_0x2ad75b)&&_0x52bdc1['push'](_0x2ad75b['id']);}return _0x52bdc1;},DataManager[_0x15b20a(0xd3)]=function(_0x21de36,_0x59b91b){const _0x3128c1=_0x15b20a;if(!_0x21de36)return![];if(!_0x59b91b)return![];const _0x59b4f5=VisuMZ['ClassChangeSystem'][_0x3128c1(0x17c)],_0x550d72=_0x59b91b[_0x3128c1(0x192)];if(_0x550d72[_0x3128c1(0x355)](_0x59b4f5[_0x3128c1(0x253)])){const _0x9a8643=String(RegExp['$1'])[_0x3128c1(0x36e)](/[\r\n]+/);for(const _0x184b87 of _0x9a8643){let _0x9d23c6=0x0;if(_0x184b87[_0x3128c1(0x355)](/(.*):[ ](.*)/i)){const _0x474c59=String(RegExp['$1']),_0x4f5a19=String(RegExp['$2']);if(_0x474c59[_0x3128c1(0x355)](/CLASS[ ](\d+)/i))_0x9d23c6=Number(RegExp['$1']);else{if(_0x474c59['match'](/CLASS[ ](.*)/i))_0x9d23c6=this['getClassIdWithName'](RegExp['$1']);else{if(_0x474c59['match'](/\b(?:AP|CP|JP|SP)\b/i)){const _0x248b7e=_0x474c59[_0x3128c1(0x1bb)]()['trim'](),_0x491526=Number(_0x4f5a19)||0x0;if(Imported[_0x3128c1(0xfb)]){if(_0x248b7e==='AP'){const _0x19ba0f=_0x21de36['getAbilityPoints']();if(_0x19ba0f<_0x491526)return![];}else{if(_0x248b7e==='SP'){const _0x235723=_0x21de36[_0x3128c1(0x300)]();if(_0x235723<_0x491526)return![];}}}if(Imported[_0x3128c1(0x1f6)]){if(_0x248b7e==='CP'){const _0x1a7273=_0x21de36[_0x3128c1(0x215)]();if(_0x1a7273<_0x491526)return![];}else{if(_0x248b7e==='JP'){const _0xee01c6=_0x21de36['getJobPoints']();if(_0xee01c6<_0x491526)return![];}}}}}}if(_0x4f5a19[_0x3128c1(0x355)](/LEVEL[ ](\d+)/i)){const _0x434811=Number(RegExp['$1']);if(_0x21de36['classLevel'](_0x9d23c6)<_0x434811)return![];}else{if(_0x4f5a19[_0x3128c1(0x355)](/(\d+)[ ]CP/i)){const _0x39d720=Number(RegExp['$1']);if(_0x21de36[_0x3128c1(0x215)](_0x9d23c6)<_0x39d720)return![];}else{if(_0x4f5a19[_0x3128c1(0x355)](/(\d+)[ ]JP/i)){const _0xbcfdbf=Number(RegExp['$1']);if(_0x21de36[_0x3128c1(0x130)](_0x9d23c6)<_0xbcfdbf)return![];}else{if(_0x4f5a19['match'](/(\d+)[ ]AP/i)){if(!Imported[_0x3128c1(0xfb)])continue;const _0x21c178=Number(RegExp['$1']);if(_0x21de36[_0x3128c1(0x1b4)](_0x9d23c6)<_0x21c178)return![];}else{if(_0x4f5a19[_0x3128c1(0x355)](/(\d+)[ ]SP/i)){const _0x9e9e9f=Number(RegExp['$1']);if(_0x21de36[_0x3128c1(0x300)](_0x9d23c6)<_0x9e9e9f)return![];}}}}}}}return!![];}return![];},DataManager[_0x15b20a(0x16e)]=function(_0x35d3fa){const _0x5e4f9d=_0x15b20a;if(!_0x35d3fa)return[];const _0x24274e=VisuMZ['ClassChangeSystem'][_0x5e4f9d(0x17c)],_0x241702=_0x35d3fa[_0x5e4f9d(0x192)];let _0x5bb601=[];const _0x1dcd7b=_0x241702[_0x5e4f9d(0x355)](_0x24274e[_0x5e4f9d(0x2e3)]);if(_0x1dcd7b){for(const _0xee907f of _0x1dcd7b){if(!_0xee907f)continue;_0xee907f['match'](_0x24274e[_0x5e4f9d(0x2e3)]);const _0x366faa=String(RegExp['$1'])[_0x5e4f9d(0x36e)](',')[_0x5e4f9d(0x33c)](_0x25ce9c=>Number(_0x25ce9c))[_0x5e4f9d(0x36b)](null)[_0x5e4f9d(0x36b)](undefined)[_0x5e4f9d(0x36b)](NaN);_0x5bb601=_0x5bb601[_0x5e4f9d(0x2c9)](_0x366faa);}return _0x5bb601;}else{const _0x455fe5=VisuMZ[_0x5e4f9d(0x20a)][_0x5e4f9d(0x228)][_0x5e4f9d(0x288)][_0x5e4f9d(0x28f)];return Array['from']({'length':_0x455fe5},(_0x220be5,_0x5afe86)=>_0x5afe86+0x1);}},DataManager['getClassIdWithName']=function(_0x1734cf){const _0x1763d6=_0x15b20a;_0x1734cf=_0x1734cf[_0x1763d6(0x1bb)]()[_0x1763d6(0x11e)](),this['_classIDs']=this[_0x1763d6(0x198)]||{};if(this[_0x1763d6(0x198)][_0x1734cf])return this[_0x1763d6(0x198)][_0x1734cf];for(const _0x201fca of $dataClasses){if(!_0x201fca)continue;let _0x4c33be=_0x201fca[_0x1763d6(0x31c)];_0x4c33be=_0x4c33be[_0x1763d6(0x194)](/\x1I\[(\d+)\]/gi,''),_0x4c33be=_0x4c33be[_0x1763d6(0x194)](/\\I\[(\d+)\]/gi,''),this[_0x1763d6(0x198)][_0x4c33be[_0x1763d6(0x1bb)]()['trim']()]=_0x201fca['id'];}return this[_0x1763d6(0x198)][_0x1734cf]||0x0;},ImageManager[_0x15b20a(0x201)]=VisuMZ['ClassChangeSystem']['Settings']['ClassPoints']['Icon'],ImageManager['jobPointsIcon']=VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x228)][_0x15b20a(0x166)][_0x15b20a(0x204)],ImageManager[_0x15b20a(0x238)]=VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x228)][_0x15b20a(0x2b9)][_0x15b20a(0x204)],ImageManager[_0x15b20a(0x339)]={},ImageManager[_0x15b20a(0x16d)]={},ImageManager['actorClassCharacterName']={},ImageManager[_0x15b20a(0x21e)]={},ImageManager[_0x15b20a(0x337)]={},ImageManager['actorClassMenuPortrait']={},ImageManager[_0x15b20a(0x34d)]={},ImageManager[_0x15b20a(0x2f7)]=function(_0x1f33e1){const _0x8ed416=_0x15b20a;if(!_0x1f33e1)return;const _0x590e20=VisuMZ[_0x8ed416(0x20a)][_0x8ed416(0x17c)],_0x49757f=_0x1f33e1['note'],_0x12c035=_0x1f33e1['id'],_0x10e251=_0x49757f[_0x8ed416(0x355)](_0x590e20[_0x8ed416(0x251)]);if(_0x10e251)for(const _0x4c9d18 of _0x10e251){if(!_0x4c9d18)continue;_0x4c9d18['match'](_0x590e20[_0x8ed416(0x251)]);const _0x358f73=String(RegExp['$1']),_0x3b0c9f=String(RegExp['$2'])[_0x8ed416(0x11e)](),_0xee3053=Number(RegExp['$3']);let _0x485e17=0x0;if(_0x358f73[_0x8ed416(0x355)](/CLASS[ ](\d+)/i))_0x485e17=Number(RegExp['$1']);else _0x358f73['match'](/CLASS[ ](.*)/i)?_0x485e17=DataManager['getClassIdWithName'](RegExp['$1']):_0x485e17=DataManager['getClassIdWithName'](_0x358f73);if(_0x485e17>0x0){const _0x525ec8=_0x8ed416(0x31a)[_0x8ed416(0x36a)](_0x12c035,_0x485e17);ImageManager[_0x8ed416(0x339)][_0x525ec8]=_0x3b0c9f,ImageManager['actorClassFaceIndex'][_0x525ec8]=_0xee3053;}}const _0x550374=_0x49757f[_0x8ed416(0x355)](_0x590e20[_0x8ed416(0x305)]);if(_0x550374)for(const _0x34fbaf of _0x550374){if(!_0x34fbaf)continue;_0x34fbaf[_0x8ed416(0x355)](_0x590e20[_0x8ed416(0x305)]);const _0x33e68f=String(RegExp['$1']),_0x43a59=String(RegExp['$2'])[_0x8ed416(0x11e)](),_0x1a7659=Number(RegExp['$3']);let _0x2c950a=0x0;if(_0x33e68f['match'](/CLASS[ ](\d+)/i))_0x2c950a=Number(RegExp['$1']);else _0x33e68f['match'](/CLASS[ ](.*)/i)?_0x2c950a=DataManager[_0x8ed416(0x2b8)](RegExp['$1']):_0x2c950a=DataManager[_0x8ed416(0x2b8)](_0x33e68f);if(_0x2c950a>0x0){const _0x5b27f1=_0x8ed416(0x31a)['format'](_0x12c035,_0x2c950a);ImageManager[_0x8ed416(0xc4)][_0x5b27f1]=_0x43a59,ImageManager[_0x8ed416(0x21e)][_0x5b27f1]=_0x1a7659;}}const _0x32eb43=_0x49757f[_0x8ed416(0x355)](_0x590e20[_0x8ed416(0x23a)]);if(_0x32eb43)for(const _0x210e5f of _0x32eb43){if(!_0x210e5f)continue;_0x210e5f[_0x8ed416(0x355)](_0x590e20['ClassBattlerName']);const _0x3970ce=String(RegExp['$1']),_0x3df9c8=String(RegExp['$2'])[_0x8ed416(0x11e)]();let _0x44746c=0x0;if(_0x3970ce[_0x8ed416(0x355)](/CLASS[ ](\d+)/i))_0x44746c=Number(RegExp['$1']);else _0x3970ce[_0x8ed416(0x355)](/CLASS[ ](.*)/i)?_0x44746c=DataManager[_0x8ed416(0x2b8)](RegExp['$1']):_0x44746c=DataManager['getClassIdWithName'](_0x3970ce);if(_0x44746c>0x0){const _0x43a908=_0x8ed416(0x31a)[_0x8ed416(0x36a)](_0x12c035,_0x44746c);ImageManager[_0x8ed416(0x337)][_0x43a908]=_0x3df9c8;}}const _0x402662=_0x49757f[_0x8ed416(0x355)](_0x590e20[_0x8ed416(0x1f8)]);if(_0x402662)for(const _0x209e51 of _0x402662){if(!_0x209e51)continue;_0x209e51[_0x8ed416(0x355)](_0x590e20['ClassMenuPortrait']);const _0x5e3c50=String(RegExp['$1']),_0x361f4b=String(RegExp['$2'])['trim']();let _0x250c1a=0x0;if(_0x5e3c50['match'](/CLASS[ ](\d+)/i))_0x250c1a=Number(RegExp['$1']);else _0x5e3c50[_0x8ed416(0x355)](/CLASS[ ](.*)/i)?_0x250c1a=DataManager[_0x8ed416(0x2b8)](RegExp['$1']):_0x250c1a=DataManager[_0x8ed416(0x2b8)](_0x5e3c50);if(_0x250c1a>0x0){const _0x3d6f4e=_0x8ed416(0x31a)[_0x8ed416(0x36a)](_0x12c035,_0x250c1a);ImageManager[_0x8ed416(0x235)][_0x3d6f4e]=_0x361f4b;}}const _0x43ad4b=_0x49757f[_0x8ed416(0x355)](_0x590e20[_0x8ed416(0xed)]);if(_0x43ad4b)for(const _0x4fb4d6 of _0x43ad4b){if(!_0x4fb4d6)continue;_0x4fb4d6[_0x8ed416(0x355)](_0x590e20[_0x8ed416(0xed)]);const _0x45e4a2=String(RegExp['$1']),_0x1491af=String(RegExp['$2'])[_0x8ed416(0x11e)]();let _0x13c236=0x0;if(_0x45e4a2[_0x8ed416(0x355)](/CLASS[ ](\d+)/i))_0x13c236=Number(RegExp['$1']);else _0x45e4a2[_0x8ed416(0x355)](/CLASS[ ](.*)/i)?_0x13c236=DataManager[_0x8ed416(0x2b8)](RegExp['$1']):_0x13c236=DataManager['getClassIdWithName'](_0x45e4a2);if(_0x13c236>0x0){const _0x41de58=_0x8ed416(0x31a)['format'](_0x12c035,_0x13c236);ImageManager[_0x8ed416(0x34d)][_0x41de58]=_0x1491af;}}},ImageManager[_0x15b20a(0x33a)]=function(_0x549a25){const _0x13bd61=_0x15b20a;if(!_0x549a25)return'';const _0x1cc880=_0x13bd61(0x31a)[_0x13bd61(0x36a)](_0x549a25['actorId'](),_0x549a25[_0x13bd61(0x1db)]()['id']);return ImageManager['actorClassFaceName'][_0x1cc880]||'';},ImageManager[_0x15b20a(0x1ff)]=function(_0x2cb088){const _0x46ba6d=_0x15b20a;if(!_0x2cb088)return undefined;const _0x2b90b9='Actor-%1-Class-%2'['format'](_0x2cb088['actorId'](),_0x2cb088['currentClass']()['id']);return ImageManager[_0x46ba6d(0x16d)][_0x2b90b9]||undefined;},ImageManager[_0x15b20a(0x36f)]=function(_0x4c1a3b){const _0x4c64ff=_0x15b20a;if(!_0x4c1a3b)return'';const _0x5bb5d7=_0x4c64ff(0x31a)['format'](_0x4c1a3b[_0x4c64ff(0x10d)](),_0x4c1a3b[_0x4c64ff(0x1db)]()['id']);return ImageManager[_0x4c64ff(0xc4)][_0x5bb5d7]||'';},ImageManager['getActorClassCharacterIndex']=function(_0xd6f17d){const _0x23f407=_0x15b20a;if(!_0xd6f17d)return undefined;const _0x515d26=_0x23f407(0x31a)[_0x23f407(0x36a)](_0xd6f17d['actorId'](),_0xd6f17d[_0x23f407(0x1db)]()['id']);return ImageManager[_0x23f407(0x21e)][_0x515d26]||undefined;},ImageManager[_0x15b20a(0x2ce)]=function(_0xd0a370){const _0x4c1f1e=_0x15b20a;if(!_0xd0a370)return'';const _0x357115=_0x4c1f1e(0x31a)[_0x4c1f1e(0x36a)](_0xd0a370[_0x4c1f1e(0x10d)](),_0xd0a370[_0x4c1f1e(0x1db)]()['id']);return ImageManager['actorClassBattlerName'][_0x357115]||'';},ImageManager[_0x15b20a(0x30b)]=function(_0x4f6bc3){const _0x110e2f=_0x15b20a;if(!_0x4f6bc3)return'';const _0x2d670f='Actor-%1-Class-%2'[_0x110e2f(0x36a)](_0x4f6bc3[_0x110e2f(0x10d)](),_0x4f6bc3['currentClass']()['id']);return ImageManager[_0x110e2f(0x235)][_0x2d670f]||'';},ImageManager['getActorClassBattlePortrait']=function(_0x21e491){const _0x28f9d0=_0x15b20a;if(!_0x21e491)return'';const _0x4341e5=_0x28f9d0(0x31a)[_0x28f9d0(0x36a)](_0x21e491[_0x28f9d0(0x10d)](),_0x21e491[_0x28f9d0(0x1db)]()['id']);return ImageManager[_0x28f9d0(0x34d)][_0x4341e5]||'';},SoundManager[_0x15b20a(0x159)]=function(_0x45cfa5){const _0xd7d812=_0x15b20a;AudioManager[_0xd7d812(0x13f)](VisuMZ[_0xd7d812(0x20a)][_0xd7d812(0x228)][_0xd7d812(0x2f6)]);},TextManager['classChangeMenuCommand']=VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x228)][_0x15b20a(0x16a)][_0x15b20a(0x1ce)],TextManager[_0x15b20a(0x19b)]=VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x228)][_0x15b20a(0x1c5)]['FullText'],TextManager[_0x15b20a(0x1c9)]=VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x228)]['ClassPoints'][_0x15b20a(0x318)],TextManager['classPointsFmt']=VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x228)]['ClassPoints']['TextFmt'],TextManager['jobPointsFull']=VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x228)][_0x15b20a(0x166)][_0x15b20a(0x176)],TextManager['jobPointsAbbr']=VisuMZ['ClassChangeSystem'][_0x15b20a(0x228)][_0x15b20a(0x166)][_0x15b20a(0x318)],TextManager['jobPointsFmt']=VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x228)][_0x15b20a(0x166)][_0x15b20a(0x1d6)],TextManager[_0x15b20a(0x152)]=VisuMZ['ClassChangeSystem'][_0x15b20a(0x228)][_0x15b20a(0x2b9)]['HelpDescription'],TextManager[_0x15b20a(0x230)]=VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x228)][_0x15b20a(0x22b)]['VocabNoClassAssigned'],TextManager['classChange_multiclass_ShiftHelp']=VisuMZ[_0x15b20a(0x20a)]['Settings'][_0x15b20a(0x22b)]['ShiftButtonAssistText'],TextManager[_0x15b20a(0x202)]=VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x228)][_0x15b20a(0x22b)]['VocabUnassignClass'],TextManager[_0x15b20a(0xce)]=VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x228)]['Window']['UnassignHelpDescription'],ColorManager[_0x15b20a(0x33f)]=function(_0x2ac164){const _0x50b8ae=_0x15b20a;return _0x2ac164=String(_0x2ac164),_0x2ac164[_0x50b8ae(0x355)](/#(.*)/i)?_0x50b8ae(0x1bc)[_0x50b8ae(0x36a)](String(RegExp['$1'])):this[_0x50b8ae(0x1a7)](Number(_0x2ac164));},VisuMZ[_0x15b20a(0x20a)]['BattleManager_makeRewards']=BattleManager['makeRewards'],BattleManager['makeRewards']=function(){const _0x34ac4d=_0x15b20a;VisuMZ['ClassChangeSystem'][_0x34ac4d(0x1c7)][_0x34ac4d(0x206)](this),this['makeRewardsClassPoints'](),this[_0x34ac4d(0x1c4)](),this['makeRewardsJobPoints'](),this[_0x34ac4d(0x1c6)]();},VisuMZ['ClassChangeSystem']['BattleManager_displayRewards']=BattleManager[_0x15b20a(0x1cd)],BattleManager[_0x15b20a(0x1cd)]=function(){const _0x39da76=_0x15b20a;VisuMZ['ClassChangeSystem']['BattleManager_displayRewards'][_0x39da76(0x206)](this),this[_0x39da76(0x120)](),this[_0x39da76(0x168)]();},VisuMZ[_0x15b20a(0x20a)]['BattleManager_gainExp']=BattleManager[_0x15b20a(0x307)],BattleManager[_0x15b20a(0x307)]=function(){const _0x5e4ebd=_0x15b20a;VisuMZ[_0x5e4ebd(0x20a)][_0x5e4ebd(0x10f)][_0x5e4ebd(0x206)](this);const _0x5db1ea=this[_0x5e4ebd(0x298)]['exp'];for(const _0x576a51 of $gameParty[_0x5e4ebd(0x1fc)]()){_0x576a51[_0x5e4ebd(0x19a)](_0x5db1ea);}},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x154)]=BattleManager[_0x15b20a(0x1fb)],BattleManager[_0x15b20a(0x1fb)]=function(_0x464695){const _0x3c1f0a=_0x15b20a;VisuMZ[_0x3c1f0a(0x20a)][_0x3c1f0a(0x154)][_0x3c1f0a(0x206)](this,_0x464695);for(const _0x147442 of $gameParty[_0x3c1f0a(0x1fc)]()){_0x147442['checkForAutoClassUnlocks']();}},BattleManager[_0x15b20a(0x1d2)]=function(){const _0x13784f=_0x15b20a;this['_rewards'][_0x13784f(0x321)]=$gameTroop[_0x13784f(0x157)]();},BattleManager[_0x15b20a(0x120)]=function(){const _0x5229fd=_0x15b20a;if(!this[_0x5229fd(0x1c0)]())return;$gameMessage[_0x5229fd(0x2d6)]();const _0x38a155=$gameParty[_0x5229fd(0x31f)](),_0x1080ea=settings[_0x5229fd(0x303)];for(const _0x17d2ed of _0x38a155){if(!_0x17d2ed)continue;const _0x2b933c=_0x1080ea[_0x5229fd(0x36a)](_0x17d2ed[_0x5229fd(0x31c)](),_0x17d2ed[_0x5229fd(0x113)](),TextManager[_0x5229fd(0x1c9)],TextManager[_0x5229fd(0x171)]);$gameMessage[_0x5229fd(0x34f)]('\x5c.'+_0x2b933c);}},BattleManager['gainRewardsClassPoints']=function(){const _0x22fe63=_0x15b20a;this[_0x22fe63(0x298)][_0x22fe63(0x321)]=this[_0x22fe63(0x298)][_0x22fe63(0x321)]||0x0;let _0x3e3a0b=$gameParty['allMembers']();VisuMZ[_0x22fe63(0x20a)][_0x22fe63(0x228)][_0x22fe63(0x1c5)][_0x22fe63(0x316)]&&(_0x3e3a0b=_0x3e3a0b[_0x22fe63(0x315)](_0x3c2d6e=>_0x3c2d6e[_0x22fe63(0x13d)]()));for(const _0x43451c of _0x3e3a0b){if(!_0x43451c)continue;if(!$dataSystem['optExtraExp']&&!_0x43451c[_0x22fe63(0x270)]())continue;_0x43451c[_0x22fe63(0x2b4)](this['_rewards'][_0x22fe63(0x321)]),_0x43451c[_0x22fe63(0x2cc)](this['_rewards'][_0x22fe63(0x321)]);}},BattleManager[_0x15b20a(0x1c0)]=function(){const _0x1ed281=_0x15b20a;return VisuMZ['ClassChangeSystem'][_0x1ed281(0x228)]['ClassPoints']['ShowVictory'];},BattleManager[_0x15b20a(0x329)]=function(){const _0x456054=_0x15b20a;this[_0x456054(0x298)]['jobPoints']=$gameTroop['jobPointsTotal']();},BattleManager[_0x15b20a(0x168)]=function(){const _0x414abc=_0x15b20a;if(!this['jobPointsVisible']())return;$gameMessage[_0x414abc(0x2d6)]();const _0x38d8d4=$gameParty[_0x414abc(0x31f)](),_0x1269c2=settings[_0x414abc(0x303)];for(const _0x1215c7 of _0x38d8d4){if(!_0x1215c7)continue;const _0x1e3d32=_0x1269c2[_0x414abc(0x36a)](_0x1215c7[_0x414abc(0x31c)](),_0x1215c7[_0x414abc(0x2f0)](),TextManager['jobPointsAbbr'],TextManager[_0x414abc(0x25e)]);$gameMessage[_0x414abc(0x34f)]('\x5c.'+_0x1e3d32);}},BattleManager[_0x15b20a(0x1c6)]=function(){const _0x2a8f0e=_0x15b20a;this['_rewards']['jobPoints']=this[_0x2a8f0e(0x298)][_0x2a8f0e(0x354)]||0x0;let _0x1c6dde=$gameParty[_0x2a8f0e(0x1fc)]();VisuMZ[_0x2a8f0e(0x20a)][_0x2a8f0e(0x228)][_0x2a8f0e(0x166)][_0x2a8f0e(0x316)]&&(_0x1c6dde=_0x1c6dde[_0x2a8f0e(0x315)](_0x8afe9f=>_0x8afe9f[_0x2a8f0e(0x13d)]()));for(const _0x1d87b4 of _0x1c6dde){if(!_0x1d87b4)continue;if(!$dataSystem[_0x2a8f0e(0x108)]&&!_0x1d87b4[_0x2a8f0e(0x270)]())continue;_0x1d87b4[_0x2a8f0e(0x2fb)](this['_rewards'][_0x2a8f0e(0x354)]),_0x1d87b4[_0x2a8f0e(0x34b)](this[_0x2a8f0e(0x298)][_0x2a8f0e(0x354)]);}},BattleManager[_0x15b20a(0x1ae)]=function(){return VisuMZ['ClassChangeSystem']['Settings']['JobPoints']['ShowVictory'];},VisuMZ[_0x15b20a(0x20a)]['Game_System_initialize']=Game_System[_0x15b20a(0x24e)]['initialize'],Game_System[_0x15b20a(0x24e)]['initialize']=function(){const _0x1579f8=_0x15b20a;VisuMZ[_0x1579f8(0x20a)][_0x1579f8(0x227)][_0x1579f8(0x206)](this),this['initClassChangeSystemMainMenu']();},Game_System[_0x15b20a(0x24e)][_0x15b20a(0x129)]=function(){const _0x1eba9a=_0x15b20a;this[_0x1eba9a(0x31b)]={'shown':VisuMZ['ClassChangeSystem'][_0x1eba9a(0x228)][_0x1eba9a(0x16a)][_0x1eba9a(0x375)],'enabled':VisuMZ[_0x1eba9a(0x20a)]['Settings']['MainMenu']['EnableMainMenu']};},Game_System[_0x15b20a(0x24e)][_0x15b20a(0x2c0)]=function(){const _0x1438c6=_0x15b20a;if(this[_0x1438c6(0x31b)]===undefined)this[_0x1438c6(0x141)]();return this[_0x1438c6(0x31b)][_0x1438c6(0x18c)];},Game_System[_0x15b20a(0x24e)][_0x15b20a(0x2ef)]=function(_0x459387){const _0x420658=_0x15b20a;if(this[_0x420658(0x31b)]===undefined)this[_0x420658(0x141)]();this[_0x420658(0x31b)][_0x420658(0x18c)]=_0x459387;},Game_System['prototype']['isMainMenuClassChangeSystemEnabled']=function(){const _0x134384=_0x15b20a;if(this[_0x134384(0x31b)]===undefined)this['initClassChangeSystem']();return this[_0x134384(0x31b)][_0x134384(0xd1)];},Game_System[_0x15b20a(0x24e)]['setMainMenuClassChangeSystemEnabled']=function(_0x1e1eee){const _0x17ad51=_0x15b20a;if(this['_ClassChangeSystem_MainMenu']===undefined)this[_0x17ad51(0x141)]();this['_ClassChangeSystem_MainMenu'][_0x17ad51(0xd1)]=_0x1e1eee;},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x122)]=Game_Action['prototype'][_0x15b20a(0x220)],Game_Action[_0x15b20a(0x24e)][_0x15b20a(0x220)]=function(_0x2401b9){const _0x28e42a=_0x15b20a;VisuMZ['ClassChangeSystem'][_0x28e42a(0x122)][_0x28e42a(0x206)](this,_0x2401b9),this['applyClassChangeSystemUserEffect'](_0x2401b9);},Game_Action[_0x15b20a(0x24e)][_0x15b20a(0xea)]=function(_0x17cb19){const _0x48cd79=_0x15b20a;if(this['item']())this[_0x48cd79(0x1a4)](_0x17cb19);},Game_Action[_0x15b20a(0x24e)][_0x15b20a(0x1a4)]=function(_0x23fdb5){const _0x158aad=_0x15b20a,_0x56306c=VisuMZ[_0x158aad(0x20a)]['RegExp'],_0x36e5de=this[_0x158aad(0x33b)]()[_0x158aad(0x192)];if($gameParty[_0x158aad(0x1ac)]()){if(this[_0x158aad(0x208)]()[_0x158aad(0x115)]()&&_0x36e5de['match'](_0x56306c['UserGainClassPoints'])){const _0x4ffa7d=eval(RegExp['$1']);this['subject']()[_0x158aad(0x2b4)](_0x4ffa7d);}else this[_0x158aad(0x1a3)]();if(_0x23fdb5[_0x158aad(0x115)]()&&_0x36e5de[_0x158aad(0x355)](_0x56306c[_0x158aad(0x374)])){const _0x2bf011=eval(RegExp['$1']);_0x23fdb5['gainClassPoints'](_0x2bf011);}}if($gameParty[_0x158aad(0x1ac)]()){if(this[_0x158aad(0x208)]()[_0x158aad(0x115)]()&&_0x36e5de[_0x158aad(0x355)](_0x56306c[_0x158aad(0x28d)])){const _0x2e450e=eval(RegExp['$1']);this[_0x158aad(0x208)]()[_0x158aad(0x2fb)](_0x2e450e);}else this[_0x158aad(0x287)]();if(_0x23fdb5[_0x158aad(0x115)]()&&_0x36e5de[_0x158aad(0x355)](_0x56306c[_0x158aad(0xf5)])){const _0x382bf4=eval(RegExp['$1']);_0x23fdb5[_0x158aad(0x2fb)](_0x382bf4);}}if(_0x36e5de[_0x158aad(0x355)](/<NOTETAG>/i)){}},Game_Action['prototype']['applyClassPoints']=function(){const _0x2b18ad=_0x15b20a;if(!$gameParty[_0x2b18ad(0x1ac)]())return;if(!this['subject']()[_0x2b18ad(0x115)]())return;const _0x4bd6c6=VisuMZ[_0x2b18ad(0x20a)][_0x2b18ad(0x228)][_0x2b18ad(0x1c5)];let _0x4ae895=0x0;try{_0x4ae895=eval(_0x4bd6c6[_0x2b18ad(0x1aa)]);}catch(_0x18e1d4){if($gameTemp['isPlaytest']())console[_0x2b18ad(0xf0)](_0x18e1d4);}this[_0x2b18ad(0x208)]()[_0x2b18ad(0x2b4)](_0x4ae895);},Game_Action[_0x15b20a(0x24e)]['applyJobPoints']=function(){const _0x4f12da=_0x15b20a;if(!$gameParty[_0x4f12da(0x1ac)]())return;if(!this[_0x4f12da(0x208)]()['isActor']())return;const _0x4a2331=VisuMZ[_0x4f12da(0x20a)]['Settings'][_0x4f12da(0x166)];let _0x2e84c2=0x0;try{_0x2e84c2=eval(_0x4a2331[_0x4f12da(0x1aa)]);}catch(_0x123412){if($gameTemp['isPlaytest']())console['log'](_0x123412);}this[_0x4f12da(0x208)]()[_0x4f12da(0x2fb)](_0x2e84c2);},VisuMZ['ClassChangeSystem'][_0x15b20a(0x37c)]=Game_Battler[_0x15b20a(0x24e)][_0x15b20a(0x340)],Game_Battler[_0x15b20a(0x24e)]['onBattleStart']=function(_0x57a5b5){const _0x3a5d81=_0x15b20a;VisuMZ[_0x3a5d81(0x20a)][_0x3a5d81(0x37c)][_0x3a5d81(0x206)](this,_0x57a5b5),this['isActor']()&&(this['_earnedClassPoints']=this['getClassPoints'](),this[_0x3a5d81(0x23c)]=this[_0x3a5d81(0x130)]());},Game_Actor['CLASS_CHANGE_ADJUST_HP_MP']=VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x228)][_0x15b20a(0x2b9)][_0x15b20a(0x286)],VisuMZ['ClassChangeSystem']['Game_Actor_setup']=Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x2c3)],Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x2c3)]=function(_0xd7c52c){const _0x4be6e3=_0x15b20a;VisuMZ[_0x4be6e3(0x20a)]['Game_Actor_setup']['call'](this,_0xd7c52c),this[_0x4be6e3(0x2aa)](),this['gainStartingClassPoints'](),this[_0x4be6e3(0x1bf)](),this[_0x4be6e3(0x2ab)](),this[_0x4be6e3(0x35a)]();},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x35a)]=function(){const _0x2517c2=_0x15b20a;this[_0x2517c2(0x34c)](),this['initMulticlass'](),this[_0x2517c2(0x2ca)](),this['initClassChangeRestrictions'](),this[_0x2517c2(0x14d)](),this[_0x2517c2(0xd2)](),this[_0x2517c2(0x2ff)](),this[_0x2517c2(0x195)]();},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x24a)]=Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x24c)],Game_Actor['prototype'][_0x15b20a(0x24c)]=function(_0x2ab85c,_0x57ad07){const _0x1e5994=_0x15b20a;_0x57ad07=this[_0x1e5994(0xe8)]();_0x57ad07&&(this[_0x1e5994(0x2e6)]=this[_0x1e5994(0x2e6)]||{},this['_exp'][_0x2ab85c]=this['_exp'][this['_classId']]||0x0,_0x57ad07=![]);this['_ClassChangeSystem_preventLevelUpGain']=!![];const _0x36c4df=JsonEx['makeDeepCopy'](this);_0x36c4df[_0x1e5994(0x322)]=!![],VisuMZ[_0x1e5994(0x20a)][_0x1e5994(0x24a)][_0x1e5994(0x206)](this,_0x2ab85c,_0x57ad07),this[_0x1e5994(0x29a)](_0x36c4df),this['checkMulticlasses'](),this['naturalUnlockClass'](_0x2ab85c),this[_0x1e5994(0x158)]=undefined;},VisuMZ['ClassChangeSystem']['Game_Actor_tradeItemWithParty']=Game_Actor['prototype'][_0x15b20a(0x1fe)],Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x1fe)]=function(_0x824785,_0x241ccb){const _0x4471e3=_0x15b20a;if(this[_0x4471e3(0x322)])return![];return VisuMZ[_0x4471e3(0x20a)][_0x4471e3(0x101)]['call'](this,_0x824785,_0x241ccb);},VisuMZ[_0x15b20a(0x20a)]['Game_Actor_levelUp']=Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x317)],Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x317)]=function(){const _0x149690=_0x15b20a;VisuMZ[_0x149690(0x20a)][_0x149690(0x21c)]['call'](this);const _0x10c748=this[_0x149690(0x1db)]()['id'];this[_0x149690(0x358)](_0x10c748),this[_0x149690(0x254)](_0x10c748),this['_classLevel']=this[_0x149690(0x17e)]||{},this['_classLevel'][_0x10c748]=this[_0x149690(0x35f)];},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x29a)]=function(_0x1069e9){const _0x22f801=_0x15b20a;if(!Game_Actor['CLASS_CHANGE_ADJUST_HP_MP'])return;const _0x4451c2=Math[_0x22f801(0x219)](_0x1069e9[_0x22f801(0x1ab)]()*this['mhp']),_0x357a0b=Math[_0x22f801(0x219)](_0x1069e9[_0x22f801(0x180)]()*this[_0x22f801(0x190)]);if(this['hp']>0x0)this[_0x22f801(0x177)](_0x4451c2);if(this['mp']>0x0)this[_0x22f801(0x205)](_0x357a0b);},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x2aa)]=function(){const _0x11b820=_0x15b20a;this[_0x11b820(0x36c)]={};},Game_Actor[_0x15b20a(0x24e)]['gainStartingClassPoints']=function(){const _0x47c0fb=_0x15b20a,_0x1776d5=VisuMZ[_0x47c0fb(0x20a)][_0x47c0fb(0x17c)],_0x541992=this['actor']()[_0x47c0fb(0x192)];if(_0x541992[_0x47c0fb(0x355)](_0x1776d5[_0x47c0fb(0x1c3)])){const _0x100c59=eval(RegExp['$1']);this[_0x47c0fb(0x2b4)](_0x100c59);}const _0x1b4d76=VisuMZ[_0x47c0fb(0x20a)]['Settings']['ClassPoints'];if(!_0x1b4d76['SharedResource'])return;const _0x167066=_0x541992[_0x47c0fb(0x355)](_0x1776d5[_0x47c0fb(0x222)]);if(_0x167066)for(const _0x5a3ceb of _0x167066){if(!_0x5a3ceb)continue;_0x5a3ceb[_0x47c0fb(0x355)](_0x1776d5[_0x47c0fb(0x222)]);const _0x3fd050=String(RegExp['$1']),_0x4bdc56=eval(RegExp['$2']),_0x388d83=/^\d+$/[_0x47c0fb(0x16c)](_0x3fd050);let _0x5d599b=0x0;_0x388d83?_0x5d599b=Number(_0x3fd050):_0x5d599b=DataManager['getClassIdWithName'](_0x3fd050),this[_0x47c0fb(0x2b4)](_0x4bdc56,_0x5d599b);}},Game_Actor['prototype'][_0x15b20a(0x215)]=function(_0x594615){const _0x3d3d74=_0x15b20a;this[_0x3d3d74(0x36c)]===undefined&&this[_0x3d3d74(0x2aa)]();const _0x355228=VisuMZ['ClassChangeSystem']['Settings'][_0x3d3d74(0x1c5)];return _0x355228[_0x3d3d74(0x12c)]?_0x594615=0x0:_0x594615=_0x594615||this[_0x3d3d74(0x1db)]()['id'],this[_0x3d3d74(0x36c)][_0x594615]=this[_0x3d3d74(0x36c)][_0x594615]||0x0,Math['round'](this[_0x3d3d74(0x36c)][_0x594615]);},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x15f)]=function(_0x3d82fb,_0x514860){const _0x1c05ef=_0x15b20a;this[_0x1c05ef(0x36c)]===undefined&&this[_0x1c05ef(0x2aa)]();const _0x2c4632=VisuMZ['ClassChangeSystem']['Settings']['ClassPoints'];_0x2c4632[_0x1c05ef(0x12c)]?_0x514860=0x0:_0x514860=_0x514860||this[_0x1c05ef(0x1db)]()['id'];this[_0x1c05ef(0x36c)][_0x514860]=this[_0x1c05ef(0x36c)][_0x514860]||0x0,this[_0x1c05ef(0x36c)][_0x514860]=Math[_0x1c05ef(0x219)](_0x3d82fb||0x0);const _0x10d2da=_0x2c4632[_0x1c05ef(0x2a6)]||Number[_0x1c05ef(0x1d8)];this[_0x1c05ef(0x36c)][_0x514860]=this[_0x1c05ef(0x36c)][_0x514860]['clamp'](0x0,_0x10d2da);},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x2b4)]=function(_0x52cc5c,_0x3e8726){const _0x123f63=_0x15b20a;_0x52cc5c>0x0&&(_0x52cc5c*=this[_0x123f63(0x346)]()),this[_0x123f63(0xec)](_0x52cc5c,_0x3e8726);},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x2cc)]=function(_0x108fab){const _0x496a3d=_0x15b20a;if(!Imported[_0x496a3d(0x1f6)])return;_0x108fab>0x0&&(_0x108fab*=this[_0x496a3d(0x346)]()),this['gainMulticlassRewardPoints'](_0x108fab,_0x496a3d(0xeb));},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0xec)]=function(_0x2098cb,_0xef34b7){const _0x13e069=_0x15b20a,_0x4a3fce=VisuMZ[_0x13e069(0x20a)][_0x13e069(0x228)]['ClassPoints'];_0x4a3fce[_0x13e069(0x12c)]?_0xef34b7=0x0:_0xef34b7=_0xef34b7||this[_0x13e069(0x1db)]()['id'],_0x2098cb+=this['getClassPoints'](_0xef34b7),this['setClassPoints'](_0x2098cb,_0xef34b7);},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x291)]=function(_0xb90676,_0x44c089){this['addClassPoints'](-_0xb90676,_0x44c089);},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x346)]=function(){const _0x2f323a=_0x15b20a;return this[_0x2f323a(0xd9)]()[_0x2f323a(0x17d)]((_0x364c14,_0x78f273)=>{const _0x1565da=_0x2f323a;return _0x78f273&&_0x78f273[_0x1565da(0x192)]['match'](VisuMZ[_0x1565da(0x20a)][_0x1565da(0x17c)][_0x1565da(0x217)])?_0x364c14*(Number(RegExp['$1'])*0.01):_0x364c14;},0x1);},Game_Actor['prototype'][_0x15b20a(0x358)]=function(_0x9cc5fd){const _0x386379=_0x15b20a;if(this[_0x386379(0x158)])return;const _0x5582d8=VisuMZ['ClassChangeSystem'][_0x386379(0x228)]['ClassPoints'];let _0x5d3d7d=0x0;try{_0x5d3d7d=eval(_0x5582d8['PerLevelUp']);}catch(_0x14de80){if($gameTemp[_0x386379(0x2c4)]())console[_0x386379(0xf0)](_0x14de80);}this[_0x386379(0x2b4)](_0x5d3d7d,_0x9cc5fd);},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x113)]=function(){const _0x138356=_0x15b20a;return this[_0x138356(0x1ca)]=this[_0x138356(0x1ca)]||0x0,this[_0x138356(0x215)]()-this['_earnedClassPoints'];},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x1bf)]=function(){const _0x4911a9=_0x15b20a;this[_0x4911a9(0xe6)]={};},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x2ab)]=function(){const _0x482e5c=_0x15b20a,_0x45ceef=VisuMZ[_0x482e5c(0x20a)][_0x482e5c(0x17c)],_0x9357c0=this[_0x482e5c(0x31e)]()[_0x482e5c(0x192)];if(_0x9357c0['match'](_0x45ceef[_0x482e5c(0xe5)])){const _0x3b9310=eval(RegExp['$1']);this['gainJobPoints'](_0x3b9310);}const _0x3319f9=VisuMZ[_0x482e5c(0x20a)]['Settings'][_0x482e5c(0x166)];if(!_0x3319f9[_0x482e5c(0x12c)])return;const _0x44b331=_0x9357c0[_0x482e5c(0x355)](_0x45ceef[_0x482e5c(0x11f)]);if(_0x44b331)for(const _0x2760f7 of _0x44b331){if(!_0x2760f7)continue;_0x2760f7['match'](_0x45ceef['StartClassJobPoints']);const _0xf8dc0a=String(RegExp['$1']),_0x199b3b=eval(RegExp['$2']),_0x1c6688=/^\d+$/[_0x482e5c(0x16c)](_0xf8dc0a);let _0x5ae6e0=0x0;_0x1c6688?_0x5ae6e0=Number(_0xf8dc0a):_0x5ae6e0=DataManager[_0x482e5c(0x2b8)](_0xf8dc0a),this[_0x482e5c(0x2fb)](_0x199b3b,_0x5ae6e0);}},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x130)]=function(_0x431693){const _0x1b3d30=_0x15b20a;this[_0x1b3d30(0xe6)]===undefined&&this['initJobPoints']();const _0x279b94=VisuMZ[_0x1b3d30(0x20a)][_0x1b3d30(0x228)][_0x1b3d30(0x166)];return _0x279b94[_0x1b3d30(0x12c)]?_0x431693=0x0:_0x431693=_0x431693||this[_0x1b3d30(0x1db)]()['id'],this['_jobPoints'][_0x431693]=this[_0x1b3d30(0xe6)][_0x431693]||0x0,Math[_0x1b3d30(0x219)](this[_0x1b3d30(0xe6)][_0x431693]);},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x189)]=function(_0x1dfbf0,_0x32d4aa){const _0x5641e4=_0x15b20a;this[_0x5641e4(0xe6)]===undefined&&this['initJobPoints']();const _0x310a56=VisuMZ[_0x5641e4(0x20a)][_0x5641e4(0x228)][_0x5641e4(0x166)];_0x310a56[_0x5641e4(0x12c)]?_0x32d4aa=0x0:_0x32d4aa=_0x32d4aa||this[_0x5641e4(0x1db)]()['id'];this[_0x5641e4(0xe6)][_0x32d4aa]=this[_0x5641e4(0xe6)][_0x32d4aa]||0x0,this['_jobPoints'][_0x32d4aa]=Math['round'](_0x1dfbf0||0x0);const _0x2be882=_0x310a56['MaxResource']||Number[_0x5641e4(0x1d8)];this[_0x5641e4(0xe6)][_0x32d4aa]=this['_jobPoints'][_0x32d4aa][_0x5641e4(0x148)](0x0,_0x2be882);},Game_Actor['prototype']['gainJobPoints']=function(_0x4154ee,_0x4ea235){const _0x4a3743=_0x15b20a;_0x4154ee>0x0&&(_0x4154ee*=this[_0x4a3743(0x181)]()),this[_0x4a3743(0x126)](_0x4154ee,_0x4ea235);},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x34b)]=function(_0x24fb6f){const _0x1a528a=_0x15b20a;if(!Imported[_0x1a528a(0x1f6)])return;_0x24fb6f>0x0&&(_0x24fb6f*=this[_0x1a528a(0x181)]()),this[_0x1a528a(0x35c)](_0x24fb6f,_0x1a528a(0x21f));},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x126)]=function(_0x2712b3,_0x43bc38){const _0xf0c1fa=_0x15b20a,_0x325695=VisuMZ['ClassChangeSystem'][_0xf0c1fa(0x228)][_0xf0c1fa(0x166)];_0x325695[_0xf0c1fa(0x12c)]?_0x43bc38=0x0:_0x43bc38=_0x43bc38||this[_0xf0c1fa(0x1db)]()['id'],_0x2712b3+=this['getJobPoints'](_0x43bc38),this[_0xf0c1fa(0x189)](_0x2712b3,_0x43bc38);},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x2d2)]=function(_0x3630c4,_0x2966af){const _0x584f19=_0x15b20a;this[_0x584f19(0x126)](-_0x3630c4,_0x2966af);},Game_Actor['prototype'][_0x15b20a(0x181)]=function(){const _0x3b86f5=_0x15b20a;return this[_0x3b86f5(0xd9)]()[_0x3b86f5(0x17d)]((_0x57a158,_0x118a5a)=>{const _0x1fdfa0=_0x3b86f5;return _0x118a5a&&_0x118a5a['note'][_0x1fdfa0(0x355)](VisuMZ[_0x1fdfa0(0x20a)][_0x1fdfa0(0x17c)][_0x1fdfa0(0x2f5)])?_0x57a158*(Number(RegExp['$1'])*0.01):_0x57a158;},0x1);},Game_Actor['prototype'][_0x15b20a(0x254)]=function(_0x363946){const _0x2ba2a3=_0x15b20a;if(this[_0x2ba2a3(0x158)])return;const _0x5e509e=VisuMZ[_0x2ba2a3(0x20a)][_0x2ba2a3(0x228)]['JobPoints'];let _0x1900fd=0x0;try{_0x1900fd=eval(_0x5e509e[_0x2ba2a3(0x119)]);}catch(_0x110c9e){if($gameTemp[_0x2ba2a3(0x2c4)]())console[_0x2ba2a3(0xf0)](_0x110c9e);}this[_0x2ba2a3(0x2fb)](_0x1900fd,_0x363946);},Game_Actor['prototype'][_0x15b20a(0x2f0)]=function(){const _0x5e24b4=_0x15b20a;return this[_0x5e24b4(0x23c)]=this['_earnedJobPoints']||0x0,this['getJobPoints']()-this[_0x5e24b4(0x23c)];},VisuMZ['ClassChangeSystem'][_0x15b20a(0x12f)]=Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x1dd)],Game_Actor[_0x15b20a(0x24e)]['setFaceImage']=function(_0x3ac17b,_0x3cbbbc){const _0x2d9bd0=_0x15b20a;_0x3ac17b!==''?(this[_0x2d9bd0(0x22f)]=_0x3ac17b,this['_priorityFaceIndex']=_0x3cbbbc):(this[_0x2d9bd0(0x22f)]=undefined,this['_priorityFaceIndex']=undefined);},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x2e1)]=Game_Actor['prototype'][_0x15b20a(0x2ba)],Game_Actor['prototype'][_0x15b20a(0x2ba)]=function(){const _0x5f4928=_0x15b20a;if(this[_0x5f4928(0x22f)]!==undefined)return this[_0x5f4928(0x22f)];return ImageManager[_0x5f4928(0x33a)](this)||VisuMZ['ClassChangeSystem']['Game_Actor_faceName'][_0x5f4928(0x206)](this);},VisuMZ[_0x15b20a(0x20a)]['Game_Actor_faceIndex']=Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x185)],Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x185)]=function(){const _0x4d61ac=_0x15b20a;if(this[_0x4d61ac(0x21a)]!==undefined)return this[_0x4d61ac(0x21a)];const _0x21657f=ImageManager[_0x4d61ac(0x1ff)](this);if(_0x21657f!==undefined)return _0x21657f;return VisuMZ[_0x4d61ac(0x20a)][_0x4d61ac(0x138)]['call'](this);},VisuMZ['ClassChangeSystem'][_0x15b20a(0x32d)]=Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0xd0)],Game_Actor[_0x15b20a(0x24e)]['setCharacterImage']=function(_0x132f81,_0x51924f){const _0x24914a=_0x15b20a;_0x132f81!==''?(this[_0x24914a(0x27c)]=_0x132f81,this[_0x24914a(0x24d)]=_0x51924f):(this[_0x24914a(0x27c)]=undefined,this[_0x24914a(0x24d)]=undefined);},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x209)]=Game_Actor[_0x15b20a(0x24e)]['characterName'],Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x151)]=function(){const _0x119775=_0x15b20a;if(this[_0x119775(0x27c)]!==undefined)return this[_0x119775(0x27c)];return ImageManager[_0x119775(0x36f)](this)||VisuMZ['ClassChangeSystem'][_0x119775(0x209)][_0x119775(0x206)](this);},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x368)]=Game_Actor['prototype'][_0x15b20a(0x34a)],Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x34a)]=function(){const _0x302bc2=_0x15b20a;if(this['_priorityCharacterIndex']!==undefined)return this[_0x302bc2(0x24d)];const _0x2357f2=ImageManager[_0x302bc2(0x182)](this);if(_0x2357f2!==undefined)return _0x2357f2;return VisuMZ[_0x302bc2(0x20a)][_0x302bc2(0x368)][_0x302bc2(0x206)](this);},VisuMZ['ClassChangeSystem'][_0x15b20a(0x26f)]=Game_Actor['prototype'][_0x15b20a(0x299)],Game_Actor[_0x15b20a(0x24e)]['setBattlerImage']=function(_0x30f101){const _0x46bee9=_0x15b20a;_0x30f101!==''?this[_0x46bee9(0x18f)]=_0x30f101:this[_0x46bee9(0x18f)]=undefined;},VisuMZ[_0x15b20a(0x20a)]['Game_Actor_battlerName']=Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x16f)],Game_Actor['prototype'][_0x15b20a(0x16f)]=function(){const _0x3a2103=_0x15b20a;if(this[_0x3a2103(0x18f)]!==undefined)return this[_0x3a2103(0x18f)];return ImageManager['getActorClassBattlerName'](this)||VisuMZ[_0x3a2103(0x20a)][_0x3a2103(0x248)][_0x3a2103(0x206)](this);;},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x19c)]=Game_Actor['prototype'][_0x15b20a(0xe0)],Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0xe0)]=function(_0x264060){_0x264060!==''?this['_priorityMenuImage']=_0x264060:this['_priorityMenuImage']=undefined;},VisuMZ['ClassChangeSystem']['Game_Actor_getMenuImage']=Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x282)],Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x282)]=function(){const _0x3216cd=_0x15b20a;if(this[_0x3216cd(0x1ad)]!==undefined)return this[_0x3216cd(0x1ad)];return ImageManager['getActorClassMenuPortrait'](this)||VisuMZ['ClassChangeSystem'][_0x3216cd(0x103)][_0x3216cd(0x206)](this);;},VisuMZ['ClassChangeSystem']['Game_Actor_setBattlePortrait']=Game_Actor['prototype'][_0x15b20a(0x275)],Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x275)]=function(_0x57b560){const _0x53419c=_0x15b20a;_0x57b560!==''?this[_0x53419c(0x2d7)]=_0x57b560:this['_priorityBattlePortrait']=undefined;if(SceneManager['isSceneBattle']()&&$gameParty[_0x53419c(0x196)]()[_0x53419c(0x161)](this)){const _0x172b07=SceneManager[_0x53419c(0x36d)][_0x53419c(0x327)];if(_0x172b07)_0x172b07[_0x53419c(0x2f1)](this);}},VisuMZ[_0x15b20a(0x20a)]['Game_Actor_getBattlePortraitFilename']=Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x2a8)],Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x2a8)]=function(){const _0x189f55=_0x15b20a;if(this[_0x189f55(0x2d7)]!==undefined)return this[_0x189f55(0x2d7)];return ImageManager[_0x189f55(0x2c8)](this)||VisuMZ[_0x189f55(0x20a)][_0x189f55(0x216)][_0x189f55(0x206)](this);;},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x34c)]=function(){const _0x2d72ea=_0x15b20a;this[_0x2d72ea(0x121)]=[this[_0x2d72ea(0x1db)]()['id']];const _0x33bcf1=VisuMZ[_0x2d72ea(0x20a)]['RegExp'],_0x208cd0=this[_0x2d72ea(0x31e)]()['note'],_0x338de3=_0x208cd0[_0x2d72ea(0x355)](_0x33bcf1[_0x2d72ea(0x351)]);if(_0x338de3)for(const _0x31a544 of _0x338de3){if(!_0x31a544)continue;_0x31a544[_0x2d72ea(0x355)](_0x33bcf1[_0x2d72ea(0x351)]);const _0x3335f3=String(RegExp['$1'])['split'](',');for(let _0x581c4e of _0x3335f3){_0x581c4e=(String(_0x581c4e)||'')[_0x2d72ea(0x11e)]();const _0x5cb19c=/^\d+$/[_0x2d72ea(0x16c)](_0x581c4e);_0x5cb19c?this[_0x2d72ea(0x121)][_0x2d72ea(0x1e8)](Number(_0x581c4e)):this[_0x2d72ea(0x121)][_0x2d72ea(0x1e8)](DataManager['getClassIdWithName'](_0x581c4e));}}},Game_Actor['prototype'][_0x15b20a(0x1fd)]=function(){const _0x55ba8f=_0x15b20a;if(this[_0x55ba8f(0x121)]===undefined)this[_0x55ba8f(0x34c)]();return this['_unlockedClasses'];},Game_Actor['prototype'][_0x15b20a(0x149)]=function(_0x1bfff4){const _0x2c5352=_0x15b20a;if(this[_0x2c5352(0x121)]===undefined)this[_0x2c5352(0x34c)]();if(this[_0x2c5352(0x121)][_0x2c5352(0x161)](_0x1bfff4))return;this[_0x2c5352(0x121)]['push'](_0x1bfff4),this[_0x2c5352(0x121)][_0x2c5352(0x36b)](0x0),this[_0x2c5352(0x121)]['sort'](function(_0x1bb89f,_0x205006){return _0x1bb89f-_0x205006;});},Game_Actor['prototype']['removeUnlockedClass']=function(_0x390651){const _0x449cb0=_0x15b20a;if(this[_0x449cb0(0x121)]===undefined)this[_0x449cb0(0x34c)]();if(!this['_unlockedClasses'][_0x449cb0(0x161)](_0x390651))return;this[_0x449cb0(0x121)][_0x449cb0(0x36b)](_0x390651)[_0x449cb0(0x36b)](null),this[_0x449cb0(0x121)][_0x449cb0(0x247)](function(_0x402661,_0x47fb18){return _0x402661-_0x47fb18;});},Game_Actor['prototype'][_0x15b20a(0xf8)]=function(_0x1b3783){this['unlockClass'](_0x1b3783);},Game_Actor[_0x15b20a(0x24e)]['initMulticlass']=function(){const _0x21bd47=_0x15b20a;this[_0x21bd47(0x29f)]=VisuMZ[_0x21bd47(0x20a)][_0x21bd47(0x228)]['General'][_0x21bd47(0x2da)],this[_0x21bd47(0x256)]=[this[_0x21bd47(0x245)]];const _0x9bed1e=this['actor']()[_0x21bd47(0x192)],_0x3db92f=VisuMZ[_0x21bd47(0x20a)][_0x21bd47(0x17c)];_0x9bed1e[_0x21bd47(0x355)](_0x3db92f[_0x21bd47(0x2da)])&&(this[_0x21bd47(0x29f)]=Number(RegExp['$1']));const _0x2743ac=_0x9bed1e[_0x21bd47(0x355)](_0x3db92f['StartingClassTier']);if(_0x2743ac)for(const _0x2db782 of _0x2743ac){if(!_0x2db782)continue;_0x2db782[_0x21bd47(0x355)](_0x3db92f[_0x21bd47(0x267)]);const _0x50bde4=Number(RegExp['$1'])-0x1;if(_0x50bde4+0x1>this[_0x21bd47(0x29f)])continue;let _0x32a9d5=(String(RegExp['$2'])||'')['trim']();const _0x1e77ff=/^\d+$/[_0x21bd47(0x16c)](_0x32a9d5);_0x1e77ff?this[_0x21bd47(0x256)][_0x50bde4]=Number(_0x32a9d5):this[_0x21bd47(0x256)][_0x50bde4]=DataManager[_0x21bd47(0x2b8)](_0x32a9d5);}this[_0x21bd47(0x297)](),this[_0x21bd47(0x29f)]=this[_0x21bd47(0x29f)][_0x21bd47(0x148)](0x1,VisuMZ['ClassChangeSystem'][_0x21bd47(0x228)][_0x21bd47(0x288)][_0x21bd47(0x28f)]||0x1);for(const _0x1f86e6 of this[_0x21bd47(0x256)]){this['unlockClass'](_0x1f86e6);}},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x20b)]=function(){const _0x2667b3=_0x15b20a;if(this[_0x2667b3(0x256)]===undefined)this[_0x2667b3(0x295)]();return this['_multiclasses'][0x0]=this[_0x2667b3(0x245)],this[_0x2667b3(0x256)][_0x2667b3(0x315)](_0x207f4a=>!!$dataClasses[_0x207f4a])[_0x2667b3(0x33c)](_0x77c985=>$dataClasses[_0x77c985]);},Game_Actor['prototype'][_0x15b20a(0x1a0)]=function(){const _0x27ba21=_0x15b20a;return this[_0x27ba21(0x20b)]();},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x30d)]=function(_0x1fc547){const _0x5ec55c=_0x15b20a;if(this[_0x5ec55c(0x256)]===undefined)this[_0x5ec55c(0x295)]();return _0x1fc547-=0x1,$dataClasses[this[_0x5ec55c(0x256)][_0x1fc547]]||null;},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x26b)]=function(_0x1b2689){const _0x238801=_0x15b20a;return this[_0x238801(0x30d)](_0x1b2689);},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x218)]=function(_0x3d168f){const _0x560687=_0x15b20a,_0x1981bf=this[_0x560687(0x30d)](_0x3d168f);return _0x1981bf?_0x1981bf['id']:0x0;},Game_Actor[_0x15b20a(0x24e)]['totalMulticlass']=function(){const _0x46ba73=_0x15b20a;if(this[_0x46ba73(0x29f)]===undefined)this[_0x46ba73(0x295)]();return this[_0x46ba73(0x29f)]=this[_0x46ba73(0x29f)][_0x46ba73(0x148)](0x1,VisuMZ[_0x46ba73(0x20a)][_0x46ba73(0x228)][_0x46ba73(0x288)][_0x46ba73(0x28f)]||0x1),this[_0x46ba73(0x29f)];},Game_Actor[_0x15b20a(0x24e)]['setMulticlassTiers']=function(_0x110119){const _0xcced84=_0x15b20a;if(this['_multiclassTiers']===undefined)this[_0xcced84(0x295)]();this['_multiclassTiers']=_0x110119[_0xcced84(0x148)](0x1,VisuMZ[_0xcced84(0x20a)][_0xcced84(0x228)]['Multiclass'][_0xcced84(0x28f)]||0x1);},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x2e4)]=function(_0x20d39f){const _0x411829=_0x15b20a;_0x20d39f+=this['totalMulticlass'](),this[_0x411829(0x12e)](_0x20d39f);},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x364)]=function(_0x5758ce){const _0xa36744=_0x15b20a;_0x5758ce=this[_0xa36744(0x147)]()-_0x5758ce,this[_0xa36744(0x12e)](_0x5758ce);},Game_Actor[_0x15b20a(0x24e)]['checkMulticlasses']=function(){const _0x13cb5e=_0x15b20a;if(this[_0x13cb5e(0x256)]===undefined)this['initMulticlass']();let _0x4bcf15=![];const _0x25c0c4=this[_0x13cb5e(0x147)]();while(this[_0x13cb5e(0x256)][_0x13cb5e(0x28f)]>_0x25c0c4){_0x4bcf15=!![],this[_0x13cb5e(0x256)]['pop']();}this[_0x13cb5e(0x256)][0x0]=this['currentClass']()['id'];const _0x541eb1=this[_0x13cb5e(0x256)][_0x13cb5e(0x28f)];for(let _0x31737b=0x1;_0x31737b<_0x541eb1;_0x31737b++){this[_0x13cb5e(0x256)][_0x31737b]===this[_0x13cb5e(0x1db)]()['id']&&(this[_0x13cb5e(0x256)][_0x31737b]=0x0,_0x4bcf15=!![]);}if(_0x4bcf15)this[_0x13cb5e(0xd2)]();},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x12a)]=Game_BattlerBase[_0x15b20a(0x24e)][_0x15b20a(0xcf)],Game_BattlerBase['prototype'][_0x15b20a(0xcf)]=function(_0x3e47fa){const _0x165263=_0x15b20a;if(this[_0x165263(0x115)]())this[_0x165263(0x169)]=_0x165263(0x29d);return VisuMZ[_0x165263(0x20a)][_0x165263(0x12a)][_0x165263(0x206)](this,_0x3e47fa);},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x2d8)]=Game_BattlerBase[_0x15b20a(0x24e)][_0x15b20a(0xf7)],Game_BattlerBase[_0x15b20a(0x24e)][_0x15b20a(0xf7)]=function(_0x18b6b2){const _0x188bc4=_0x15b20a;if(this[_0x188bc4(0x115)]())this['_multiclassCheck']=_0x188bc4(0x306);return VisuMZ['ClassChangeSystem'][_0x188bc4(0x2d8)][_0x188bc4(0x206)](this,_0x18b6b2);},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x1a5)]=Game_BattlerBase[_0x15b20a(0x24e)]['stateRate'],Game_BattlerBase[_0x15b20a(0x24e)][_0x15b20a(0x20c)]=function(_0x420821){const _0x12133f=_0x15b20a;if(this[_0x12133f(0x115)]())this['_multiclassCheck']='StateRates';return VisuMZ[_0x12133f(0x20a)][_0x12133f(0x1a5)]['call'](this,_0x420821);},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x16b)]=Game_BattlerBase['prototype'][_0x15b20a(0x362)],Game_BattlerBase[_0x15b20a(0x24e)]['stateResistSet']=function(){const _0x278ecf=_0x15b20a;if(this[_0x278ecf(0x115)]())this[_0x278ecf(0x169)]=_0x278ecf(0x373);return VisuMZ[_0x278ecf(0x20a)][_0x278ecf(0x16b)][_0x278ecf(0x206)](this);},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x1cb)]=Game_BattlerBase[_0x15b20a(0x24e)][_0x15b20a(0x2de)],Game_BattlerBase[_0x15b20a(0x24e)][_0x15b20a(0x2de)]=function(_0x24f365){const _0x21eabe=_0x15b20a;if(this[_0x21eabe(0x115)]())this[_0x21eabe(0x169)]=_0x21eabe(0xe1);return VisuMZ['ClassChangeSystem'][_0x21eabe(0x1cb)][_0x21eabe(0x206)](this,_0x24f365);},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x184)]=Game_BattlerBase[_0x15b20a(0x24e)][_0x15b20a(0x27a)],Game_BattlerBase['prototype'][_0x15b20a(0x27a)]=function(_0x2dc752){const _0x6880f4=_0x15b20a;if(this['isActor']())this[_0x6880f4(0x169)]=_0x6880f4(0x12b);return VisuMZ[_0x6880f4(0x20a)][_0x6880f4(0x184)][_0x6880f4(0x206)](this,_0x2dc752);},VisuMZ['ClassChangeSystem'][_0x15b20a(0x163)]=Game_BattlerBase['prototype'][_0x15b20a(0x378)],Game_BattlerBase['prototype'][_0x15b20a(0x378)]=function(_0x1e3a52){const _0xac4ec=_0x15b20a;if(this['isActor']())this[_0xac4ec(0x169)]=_0xac4ec(0x136);return VisuMZ[_0xac4ec(0x20a)][_0xac4ec(0x163)]['call'](this,_0x1e3a52);},VisuMZ['ClassChangeSystem'][_0x15b20a(0x13c)]=Game_BattlerBase[_0x15b20a(0x24e)][_0x15b20a(0x15a)],Game_BattlerBase[_0x15b20a(0x24e)]['attackElements']=function(){const _0x5a1cc2=_0x15b20a;if(this[_0x5a1cc2(0x115)]())this[_0x5a1cc2(0x169)]=_0x5a1cc2(0xfd);return VisuMZ['ClassChangeSystem'][_0x5a1cc2(0x13c)][_0x5a1cc2(0x206)](this);},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x2b5)]=Game_BattlerBase['prototype'][_0x15b20a(0x125)],Game_BattlerBase[_0x15b20a(0x24e)][_0x15b20a(0x125)]=function(){const _0x5479ea=_0x15b20a;if(this[_0x5479ea(0x115)]())this['_multiclassCheck']=_0x5479ea(0x266);return VisuMZ[_0x5479ea(0x20a)][_0x5479ea(0x2b5)][_0x5479ea(0x206)](this);},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x225)]=Game_BattlerBase[_0x15b20a(0x24e)][_0x15b20a(0x32c)],Game_BattlerBase[_0x15b20a(0x24e)][_0x15b20a(0x32c)]=function(_0x4bd8e8){const _0x29e1af=_0x15b20a;if(this[_0x29e1af(0x115)]())this[_0x29e1af(0x169)]=_0x29e1af(0x266);return VisuMZ[_0x29e1af(0x20a)]['Game_BattlerBase_attackStatesRate'][_0x29e1af(0x206)](this,_0x4bd8e8);},VisuMZ[_0x15b20a(0x20a)]['Game_BattlerBase_addedSkillTypes']=Game_BattlerBase[_0x15b20a(0x24e)][_0x15b20a(0x283)],Game_BattlerBase['prototype'][_0x15b20a(0x283)]=function(){const _0x43bd8a=_0x15b20a;if(this[_0x43bd8a(0x115)]())this['_multiclassCheck']=_0x43bd8a(0x160);return VisuMZ[_0x43bd8a(0x20a)][_0x43bd8a(0x128)][_0x43bd8a(0x206)](this);},VisuMZ[_0x15b20a(0x20a)]['Game_BattlerBase_addedSkills']=Game_BattlerBase[_0x15b20a(0x24e)]['addedSkills'],Game_BattlerBase['prototype'][_0x15b20a(0xef)]=function(){const _0x5b53a3=_0x15b20a;if(this['isActor']())this[_0x5b53a3(0x169)]=_0x5b53a3(0x2a7);return VisuMZ[_0x5b53a3(0x20a)][_0x5b53a3(0x294)]['call'](this);},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x22c)]=Game_BattlerBase[_0x15b20a(0x24e)]['isEquipWtypeOk'],Game_BattlerBase[_0x15b20a(0x24e)][_0x15b20a(0x28c)]=function(_0x3580e6){const _0xc0a0bb=_0x15b20a;if(this['isActor']())this['_multiclassCheck']=_0xc0a0bb(0x15e);return VisuMZ[_0xc0a0bb(0x20a)][_0xc0a0bb(0x22c)][_0xc0a0bb(0x206)](this,_0x3580e6);},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0xdf)]=Game_BattlerBase[_0x15b20a(0x24e)][_0x15b20a(0x20e)],Game_BattlerBase[_0x15b20a(0x24e)]['isEquipAtypeOk']=function(_0x176e19){const _0x5a09ca=_0x15b20a;if(this[_0x5a09ca(0x115)]())this[_0x5a09ca(0x169)]='EquipArmors';return VisuMZ[_0x5a09ca(0x20a)][_0x5a09ca(0xdf)][_0x5a09ca(0x206)](this,_0x176e19);},VisuMZ['ClassChangeSystem'][_0x15b20a(0xff)]=Game_Actor['prototype']['traitObjects'],Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0xd9)]=function(){const _0xd9d4d6=_0x15b20a;let _0x3e5250=VisuMZ[_0xd9d4d6(0x20a)][_0xd9d4d6(0xff)][_0xd9d4d6(0x206)](this);return this[_0xd9d4d6(0x169)]&&(_0x3e5250=this[_0xd9d4d6(0x255)](_0x3e5250)),this[_0xd9d4d6(0x169)]=undefined,_0x3e5250;},Game_Actor[_0x15b20a(0x24e)]['applyMulticlassObjects']=function(_0x49a8c4){const _0x2faf69=_0x15b20a;if(this[_0x2faf69(0x256)]===undefined)this[_0x2faf69(0x295)]();const _0x186784=this['_multiclassCheck'];let _0x22a53e=_0x49a8c4['indexOf'](this['currentClass']());const _0x4a7784=VisuMZ[_0x2faf69(0x20a)][_0x2faf69(0x228)][_0x2faf69(0x288)],_0x1bc927=_0x4a7784[_0x2faf69(0x28f)];for(let _0x272038=0x1;_0x272038<_0x1bc927;_0x272038++){let _0xa04816=$dataClasses[this[_0x2faf69(0x256)][_0x272038]||0x0];if(!_0xa04816)continue;if(_0xa04816===this['currentClass']())continue;const _0x5d7928=_0x4a7784[_0x272038];if(!_0x5d7928)continue;_0x5d7928[this[_0x2faf69(0x169)]]&&_0x49a8c4[_0x2faf69(0x2a3)](++_0x22a53e,0x0,_0xa04816);}return _0x49a8c4;},Game_Actor[_0x15b20a(0x24e)]['gainMulticlassRewardPoints']=function(_0x1edb80,_0x26a462){const _0x720e5e=_0x15b20a;if(_0x1edb80<=0x0)return;if(!_0x26a462)return;if(!$dataSystem[_0x720e5e(0x108)]&&!this[_0x720e5e(0x270)]())return;this[_0x720e5e(0x20b)]();const _0x2736dc=VisuMZ['ClassChangeSystem'][_0x720e5e(0x228)][_0x720e5e(0x288)],_0x78abc2=_0x2736dc['length'];for(let _0xe198dd=0x1;_0xe198dd<_0x78abc2;_0xe198dd++){let _0x421346=$dataClasses[this[_0x720e5e(0x256)][_0xe198dd]||0x0];if(!_0x421346)continue;if(_0x421346===this[_0x720e5e(0x1db)]())continue;const _0x50d0be=_0x2736dc[_0xe198dd];if(!_0x50d0be)continue;if(this['gain%1Points'[_0x720e5e(0x36a)](_0x26a462)]){const _0x5c467a=_0x50d0be['resourceRate'],_0x1e30d8=_0x5c467a*_0x1edb80;this[_0x720e5e(0x280)['format'](_0x26a462)](_0x1e30d8,this[_0x720e5e(0x256)][_0xe198dd]);}}},Game_Actor['prototype'][_0x15b20a(0x19a)]=function(_0x538b88){const _0x27ea4a=_0x15b20a;if(!_0x538b88)return;if(this[_0x27ea4a(0xe8)]())return;this['getMulticlasses']();const _0x5b7507=VisuMZ[_0x27ea4a(0x20a)][_0x27ea4a(0x228)][_0x27ea4a(0x288)],_0x363d9e=_0x5b7507[_0x27ea4a(0x28f)];for(let _0x2c1d38=0x1;_0x2c1d38<_0x363d9e;_0x2c1d38++){let _0x4e068c=$dataClasses[this['_multiclasses'][_0x2c1d38]||0x0];if(!_0x4e068c)continue;if(_0x4e068c===this[_0x27ea4a(0x1db)]())continue;const _0x8bd05d=_0x5b7507[_0x2c1d38];if(!_0x8bd05d)continue;const _0x2a670f=_0x8bd05d[_0x27ea4a(0x146)],_0x11f176=Math[_0x27ea4a(0x219)](_0x538b88*_0x2a670f*this[_0x27ea4a(0x134)]()),_0x3ab1e7=this['_multiclasses'][_0x2c1d38];this[_0x27ea4a(0x2e6)][_0x3ab1e7]=this['_exp'][_0x3ab1e7]||0x0;const _0x4dc1fb=this[_0x27ea4a(0x2e6)][_0x3ab1e7]+_0x11f176;this['changeClassExp'](_0x4dc1fb,_0x3ab1e7);}},Game_Actor['prototype']['changeMulticlass']=function(_0x55ace6,_0x522e52){const _0x2f42ec=_0x15b20a;if(this[_0x2f42ec(0x256)]===undefined)this['initMulticlass']();_0x522e52-=0x1;if(_0x55ace6<=0x0&&_0x522e52<=0x0)return;this[_0x2f42ec(0x149)](_0x55ace6);const _0x891078=this['_multiclasses'][_0x2f42ec(0x28f)];for(let _0x215e78=0x0;_0x215e78<_0x891078;_0x215e78++){this[_0x2f42ec(0x256)][_0x215e78]===_0x55ace6&&(this[_0x2f42ec(0x256)][_0x215e78]=0x0);}this[_0x2f42ec(0x256)][0x0]=this['currentClass']()['id'];if(_0x522e52<=0x0){this['changeClass'](_0x55ace6);return;}this[_0x2f42ec(0x256)][_0x522e52]=_0x55ace6,this[_0x2f42ec(0x297)]();const _0x6f965b=JsonEx[_0x2f42ec(0x293)](this);_0x6f965b[_0x2f42ec(0x322)]=!![],this[_0x2f42ec(0xd2)](),this[_0x2f42ec(0x29a)](_0x6f965b),this[_0x2f42ec(0x297)]();},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x2af)]=function(_0x20e3c1){const _0x45fd43=_0x15b20a;if(this[_0x45fd43(0x256)]===undefined)this[_0x45fd43(0x295)]();return this['_multiclasses'][0x0]=this[_0x45fd43(0x1db)]()['id'],this[_0x45fd43(0x256)][_0x45fd43(0x326)](_0x20e3c1)+0x1;},Game_Actor[_0x15b20a(0x24e)]['initClassLevels']=function(){const _0x10aca3=_0x15b20a;this[_0x10aca3(0x17e)]={},this[_0x10aca3(0x17e)][this[_0x10aca3(0x1db)]()['id']]=this['level'];},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0xe8)]=function(){const _0x4b7d71=_0x15b20a;return VisuMZ[_0x4b7d71(0x20a)][_0x4b7d71(0x228)][_0x4b7d71(0x2b9)][_0x4b7d71(0x25d)];},Game_Actor['prototype'][_0x15b20a(0x313)]=function(_0x46dd0f){const _0xcda413=_0x15b20a;if(this[_0xcda413(0xe8)]())return this[_0xcda413(0x35f)];return this[_0xcda413(0x27b)](_0x46dd0f),this[_0xcda413(0x17e)][_0x46dd0f];},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x32e)]=function(_0x362b3f,_0x7c60e5){const _0x174595=_0x15b20a;if(this[_0x174595(0xe8)]())return this[_0x174595(0x187)](_0x362b3f);this[_0x174595(0x2e6)][_0x7c60e5]=Math[_0x174595(0x35e)](_0x362b3f,0x0),this[_0x174595(0x27b)](_0x7c60e5);if(_0x7c60e5===this[_0x174595(0x1db)]()['id'])this[_0x174595(0xd2)]();},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x27b)]=function(_0x41bbb3){const _0x24b937=_0x15b20a;if(this['maintainLevels']())return;this[_0x24b937(0x2e6)][_0x41bbb3]=this[_0x24b937(0x2e6)][_0x41bbb3]||0x0,this['_classLevel']=this[_0x24b937(0x17e)]||{},this[_0x24b937(0x17e)][_0x41bbb3]=this['_classLevel'][_0x41bbb3]||0x1;while(!(this[_0x24b937(0x17e)][_0x41bbb3]>=this['maxLevel']())&&this['_exp'][_0x41bbb3]>=this[_0x24b937(0x19f)](_0x41bbb3,this[_0x24b937(0x17e)][_0x41bbb3])){this[_0x24b937(0x17e)][_0x41bbb3]+=0x1,this['classLevelUp'](_0x41bbb3);}while(this['_exp'][_0x41bbb3]<this['currentClassLevelExp'](_0x41bbb3,this['_classLevel'][_0x41bbb3])){this[_0x24b937(0x17e)][_0x41bbb3]-=0x1;}this[_0x24b937(0x14d)]();},Game_Actor['prototype'][_0x15b20a(0x363)]=function(_0x11070c,_0x5a908d){const _0x2f5bcb=_0x15b20a,_0x4ee84d=$dataClasses[_0x11070c],_0x1afd5e=_0x4ee84d[_0x2f5bcb(0x28e)][0x0],_0x327a7b=_0x4ee84d[_0x2f5bcb(0x28e)][0x1],_0x3b88b5=_0x4ee84d[_0x2f5bcb(0x28e)][0x2],_0x2de5a9=_0x4ee84d['expParams'][0x3];return Math[_0x2f5bcb(0x219)](_0x1afd5e*Math[_0x2f5bcb(0x14f)](_0x5a908d-0x1,0.9+_0x3b88b5/0xfa)*_0x5a908d*(_0x5a908d+0x1)/(0x6+Math[_0x2f5bcb(0x14f)](_0x5a908d,0x2)/0x32/_0x2de5a9)+(_0x5a908d-0x1)*_0x327a7b);},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x19f)]=function(_0x238a3d,_0x40ab5b){const _0x26e6ea=_0x15b20a;return this[_0x26e6ea(0x363)](_0x238a3d,_0x40ab5b+0x1);},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x2cf)]=function(_0xc633a,_0x449c3e){const _0x4cc9f6=_0x15b20a;return this[_0x4cc9f6(0x363)](_0xc633a,_0x449c3e);},Game_Actor[_0x15b20a(0x24e)]['classLevelUp']=function(_0xa74c00){const _0x884fba=_0x15b20a;this[_0x884fba(0x358)](_0xa74c00),this['levelUpGainJobPoints'](_0xa74c00),Imported[_0x884fba(0xfb)]&&(this[_0x884fba(0x2ad)](_0xa74c00),this['levelUpGainSkillPoints'](_0xa74c00));},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x14d)]=function(){const _0x336dd9=_0x15b20a;if(this[_0x336dd9(0x361)])return;this[_0x336dd9(0x361)]=!![];const _0x30aa91=DataManager['getActorUnlockedClasses'](this);for(const _0x2b43e1 of _0x30aa91){if(!_0x2b43e1)continue;const _0x5d8472=_0x2b43e1[_0x336dd9(0x2b0)];if(!_0x5d8472)continue;for(const _0x3e5c8e of _0x5d8472){if(this[_0x336dd9(0x33e)](_0x3e5c8e[_0x336dd9(0xf3)]))continue;if(this['classLevel'](_0x2b43e1['id'])>=_0x3e5c8e[_0x336dd9(0x35f)]){const _0x21c7d6=this[_0x336dd9(0x1cc)]||{};this[_0x336dd9(0x2e8)](_0x3e5c8e[_0x336dd9(0xf3)]),this[_0x336dd9(0x1cc)]=_0x21c7d6;}}}this['_updateClassLearnedSkills']=![];},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x1a9)]=Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x1ed)],Game_Actor['prototype']['paramBase']=function(_0x528d5d){const _0x2196b8=_0x15b20a;let _0x5810cb=VisuMZ[_0x2196b8(0x20a)][_0x2196b8(0x1a9)][_0x2196b8(0x206)](this,_0x528d5d);this[_0x2196b8(0x20b)]();const _0x517dad=VisuMZ[_0x2196b8(0x20a)]['Settings'][_0x2196b8(0x288)],_0x3bd499=_0x2196b8(0x1fa)[_0x2196b8(0x36a)](_0x528d5d),_0xeee61e=_0x517dad[_0x2196b8(0x28f)];for(let _0xea0edc=0x1;_0xea0edc<_0xeee61e;_0xea0edc++){let _0x4289b1=$dataClasses[this['_multiclasses'][_0xea0edc]||0x0];if(!_0x4289b1)continue;if(_0x4289b1===this[_0x2196b8(0x1db)]())continue;const _0x49d9e3=_0x517dad[_0xea0edc];if(!_0x49d9e3)continue;const _0x177494=_0x49d9e3[_0x3bd499];_0x5810cb+=_0x177494*this[_0x2196b8(0x2a2)](this['_multiclasses'][_0xea0edc],_0x528d5d);}return _0x5810cb;},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x2a2)]=function(_0x6805a9,_0x34f3b2){const _0x3e5de0=_0x15b20a,_0x1bf9a3=$dataClasses[_0x6805a9],_0xea62a2=this[_0x3e5de0(0x313)](_0x6805a9);if(_0xea62a2>0x63){const _0x33e6bf=_0x1bf9a3['params'][_0x34f3b2][0x63],_0x22db32=_0x1bf9a3[_0x3e5de0(0xd5)][_0x34f3b2][0x62];return _0x33e6bf+(_0x33e6bf-_0x22db32)*(_0xea62a2-0x63);}else return _0x1bf9a3[_0x3e5de0(0xd5)][_0x34f3b2][_0xea62a2];},Game_Actor[_0x15b20a(0x24e)]['classExpRate']=function(_0x190b7a){const _0x45e48d=_0x15b20a;if(this[_0x45e48d(0x17e)][_0x190b7a]>=this['maxLevel']())return 0x1;const _0x49804b=this['classLevel'](_0x190b7a),_0x2dcbda=this[_0x45e48d(0x19f)](_0x190b7a,_0x49804b)-this[_0x45e48d(0x2cf)](_0x190b7a,_0x49804b);this[_0x45e48d(0x2e6)][_0x190b7a]=this[_0x45e48d(0x2e6)][_0x190b7a]||0x0;const _0x5a5914=this[_0x45e48d(0x2e6)][_0x190b7a]-this['currentClassLevelExp'](_0x190b7a,_0x49804b);return(_0x5a5914/_0x2dcbda)['clamp'](0x0,0x1);},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x336)]=function(){const _0xef21c6=_0x15b20a;for(;;){const _0x5d661b=DataManager[_0xef21c6(0x165)](this);if(_0x5d661b['length']>0x0)for(const _0x24b558 of _0x5d661b){this['unlockClass'](_0x24b558);}else break;}},Game_Actor[_0x15b20a(0x24e)]['initClassChangeRestrictions']=function(){const _0x247dcf=_0x15b20a;let _0x264bab=[];const _0x2e3126=VisuMZ[_0x247dcf(0x20a)][_0x247dcf(0x17c)],_0x58524e=this[_0x247dcf(0x31e)]()[_0x247dcf(0x192)],_0x2f0d38=_0x58524e[_0x247dcf(0x355)](_0x2e3126[_0x247dcf(0x26a)]);if(_0x2f0d38)for(const _0x278307 of _0x2f0d38){if(!_0x278307)continue;_0x278307[_0x247dcf(0x355)](_0x2e3126['RestrictClassChangeTier']);const _0x4f8e74=String(RegExp['$1'])[_0x247dcf(0x36e)](',')[_0x247dcf(0x33c)](_0x5ff4ee=>Number(_0x5ff4ee));_0x264bab=_0x264bab[_0x247dcf(0x2c9)](_0x4f8e74);}_0x264bab=_0x264bab['filter']((_0x4d6ffe,_0x53f9be,_0x5d04e5)=>_0x5d04e5[_0x247dcf(0x326)](_0x4d6ffe)===_0x53f9be),_0x264bab[_0x247dcf(0x36b)](null)[_0x247dcf(0x36b)](undefined),_0x264bab['sort']((_0x1cbaad,_0x506712)=>_0x1cbaad-_0x506712),this['_classChangeTierRestrictions']=_0x264bab;},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x370)]=function(_0xf7a1d5){const _0x4cc63c=_0x15b20a;return this['_classChangeTierRestrictions']===undefined&&this[_0x4cc63c(0x240)](),this[_0x4cc63c(0x2b7)]['includes'](_0xf7a1d5);},Game_Actor['prototype'][_0x15b20a(0x1ee)]=function(_0x525e52){const _0x4493b5=_0x15b20a;this[_0x4493b5(0x2b7)]===undefined&&this['initClassChangeRestrictions']();if(this[_0x4493b5(0x2b7)][_0x4493b5(0x161)](_0x525e52))return;this[_0x4493b5(0x2b7)][_0x4493b5(0x1e8)](_0x525e52),this[_0x4493b5(0x2b7)]['sort']((_0x3e09da,_0x2a9af3)=>_0x3e09da-_0x2a9af3);},Game_Actor[_0x15b20a(0x24e)][_0x15b20a(0x2be)]=function(_0x7f08bd){const _0x59d863=_0x15b20a;this['_classChangeTierRestrictions']===undefined&&this[_0x59d863(0x240)]();if(!this[_0x59d863(0x2b7)][_0x59d863(0x161)](_0x7f08bd))return;this[_0x59d863(0x2b7)][_0x59d863(0x36b)](_0x7f08bd),this[_0x59d863(0x2b7)][_0x59d863(0x247)]((_0x196c49,_0x4540d3)=>_0x196c49-_0x4540d3);},Game_Enemy[_0x15b20a(0x24e)][_0x15b20a(0x321)]=function(){const _0x425400=_0x15b20a,_0x38dc23=VisuMZ['ClassChangeSystem'][_0x425400(0x228)]['ClassPoints'],_0xcd1a1e=VisuMZ['ClassChangeSystem']['RegExp'],_0x3d9961=this[_0x425400(0x22e)]()['note'];if(_0x3d9961['match'](_0xcd1a1e[_0x425400(0x1f7)]))try{return eval(RegExp['$1']);}catch(_0x2635de){if($gameTemp[_0x425400(0x2c4)]())console[_0x425400(0xf0)](_0x2635de);return 0x0;}try{return eval(_0x38dc23[_0x425400(0x2f3)]);}catch(_0x5f9699){if($gameTemp['isPlaytest']())console[_0x425400(0xf0)](_0x5f9699);return 0x0;}},Game_Enemy[_0x15b20a(0x24e)][_0x15b20a(0x354)]=function(){const _0x4302f7=_0x15b20a,_0xad61dd=VisuMZ[_0x4302f7(0x20a)][_0x4302f7(0x228)][_0x4302f7(0x166)],_0x5e1844=VisuMZ[_0x4302f7(0x20a)]['RegExp'],_0x389ff5=this[_0x4302f7(0x22e)]()[_0x4302f7(0x192)];if(_0x389ff5[_0x4302f7(0x355)](_0x5e1844[_0x4302f7(0x352)]))try{return eval(RegExp['$1']);}catch(_0x8b4aa1){if($gameTemp[_0x4302f7(0x2c4)]())console[_0x4302f7(0xf0)](_0x8b4aa1);return 0x0;}try{return eval(_0xad61dd[_0x4302f7(0x2f3)]);}catch(_0xb83e2b){if($gameTemp['isPlaytest']())console['log'](_0xb83e2b);return 0x0;}},VisuMZ[_0x15b20a(0x20a)]['Game_Party_initialize']=Game_Party[_0x15b20a(0x24e)][_0x15b20a(0x331)],Game_Party[_0x15b20a(0x24e)][_0x15b20a(0x331)]=function(){const _0xcedd33=_0x15b20a;VisuMZ[_0xcedd33(0x20a)][_0xcedd33(0x197)][_0xcedd33(0x206)](this),this['initClassChangeUnlocks']();},Game_Party[_0x15b20a(0x24e)]['initClassChangeUnlocks']=function(){const _0x3888ed=_0x15b20a;this[_0x3888ed(0x121)]=[];},Game_Party[_0x15b20a(0x24e)][_0x15b20a(0x1fd)]=function(){const _0x1505f3=_0x15b20a;if(this['_unlockedClasses']===undefined)this[_0x1505f3(0x34c)]();return this[_0x1505f3(0x121)];},Game_Party[_0x15b20a(0x24e)][_0x15b20a(0x149)]=function(_0x5c7f87){const _0x1f06d4=_0x15b20a;for(const _0x280201 of this['allMembers']()){if(!_0x280201)continue;_0x280201[_0x1f06d4(0x149)](_0x5c7f87);}if(this[_0x1f06d4(0x121)]===undefined)this[_0x1f06d4(0x34c)]();if(this['_unlockedClasses'][_0x1f06d4(0x161)](_0x5c7f87))return;this['_unlockedClasses'][_0x1f06d4(0x1e8)](_0x5c7f87),this[_0x1f06d4(0x121)][_0x1f06d4(0x247)](function(_0x175a07,_0xb68702){return _0x175a07-_0xb68702;});},Game_Party[_0x15b20a(0x24e)][_0x15b20a(0x1de)]=function(_0x5b9644){const _0x823a84=_0x15b20a;for(const _0x5489ec of this[_0x823a84(0x1fc)]()){if(!_0x5489ec)continue;_0x5489ec['removeUnlockedClass'](_0x5b9644);}if(this[_0x823a84(0x121)]===undefined)this['initClassChangeUnlocks']();if(!this['_unlockedClasses'][_0x823a84(0x161)](_0x5b9644))return;this[_0x823a84(0x121)][_0x823a84(0x36b)](_0x5b9644)[_0x823a84(0x36b)](null),this['_unlockedClasses'][_0x823a84(0x247)](function(_0x590d1f,_0x4656c6){return _0x590d1f-_0x4656c6;});},Game_Party[_0x15b20a(0x24e)][_0x15b20a(0x271)]=function(){const _0x190b44=_0x15b20a,_0x1c0c06=this[_0x190b44(0x1fc)]();return Math['max'](...this['members']()['map'](_0x3ad238=>_0x3ad238[_0x190b44(0x147)]()));},Game_Troop['prototype'][_0x15b20a(0x157)]=function(){const _0x383fc7=_0x15b20a;return this[_0x383fc7(0x156)]()[_0x383fc7(0x17d)]((_0x248eb7,_0x383707)=>_0x248eb7+_0x383707[_0x383fc7(0x321)](),0x0);},Game_Troop[_0x15b20a(0x24e)][_0x15b20a(0x314)]=function(){const _0x526b8e=_0x15b20a;return this[_0x526b8e(0x156)]()[_0x526b8e(0x17d)]((_0x29a0b1,_0x431fa3)=>_0x29a0b1+_0x431fa3['jobPoints'](),0x0);},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x26c)]=Scene_Menu[_0x15b20a(0x24e)][_0x15b20a(0x22a)],Scene_Menu[_0x15b20a(0x24e)][_0x15b20a(0x22a)]=function(){const _0x4d0519=_0x15b20a;VisuMZ[_0x4d0519(0x20a)][_0x4d0519(0x26c)]['call'](this);const _0x503e16=this[_0x4d0519(0x1ec)];_0x503e16[_0x4d0519(0x167)]('ClassChangeSystem',this[_0x4d0519(0xc5)][_0x4d0519(0x350)](this));},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x2bd)]=Scene_Menu['prototype']['onPersonalOk'],Scene_Menu[_0x15b20a(0x24e)][_0x15b20a(0x311)]=function(){const _0x16745e=_0x15b20a;this[_0x16745e(0x1ec)][_0x16745e(0x366)]()===_0x16745e(0x20a)?SceneManager[_0x16745e(0x1e8)](Scene_ClassChange):VisuMZ[_0x16745e(0x20a)][_0x16745e(0x2bd)][_0x16745e(0x206)](this);};function Scene_ClassChange(){const _0x4a926d=_0x15b20a;this[_0x4a926d(0x331)](...arguments);}Scene_ClassChange[_0x15b20a(0x24e)]=Object[_0x15b20a(0x258)](Scene_MenuBase[_0x15b20a(0x24e)]),Scene_ClassChange['prototype'][_0x15b20a(0x153)]=Scene_ClassChange,Scene_ClassChange['prototype']['initialize']=function(){const _0x260d51=_0x15b20a;Scene_MenuBase[_0x260d51(0x24e)][_0x260d51(0x331)]['call'](this),this['_animations']=this['_animations']||[];},Scene_ClassChange[_0x15b20a(0x24e)]['needsPageButtons']=function(){return!![];},Scene_ClassChange['prototype'][_0x15b20a(0x142)]=function(){const _0x3d6adc=_0x15b20a;return this[_0x3d6adc(0x18b)]()>0x1?this['_classTierWindow']&&this['_classTierWindow'][_0x3d6adc(0x18e)]:this['_classListWindow']&&this[_0x3d6adc(0x25f)][_0x3d6adc(0x18e)];},Scene_ClassChange['prototype'][_0x15b20a(0x35b)]=function(){const _0xcc22d1=_0x15b20a;Scene_MenuBase[_0xcc22d1(0x24e)]['update']['call'](this),this[_0xcc22d1(0x19e)]();},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x31d)]=function(){return!![];},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0xfc)]=function(){const _0x42f0d6=_0x15b20a;if(ConfigManager[_0x42f0d6(0x10a)]&&ConfigManager[_0x42f0d6(0x259)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x42f0d6(0x2d0)]())return this[_0x42f0d6(0xf2)]()['match'](/LOWER/i);else Scene_MenuBase[_0x42f0d6(0x24e)][_0x42f0d6(0x13a)][_0x42f0d6(0x206)](this);}},Scene_ClassChange['prototype'][_0x15b20a(0x13a)]=function(){const _0x4c4232=_0x15b20a;if(ConfigManager[_0x4c4232(0x10a)]&&ConfigManager[_0x4c4232(0x2e7)]!==undefined)return ConfigManager[_0x4c4232(0x2e7)];else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0x4c4232(0xf2)]()[_0x4c4232(0x355)](/RIGHT/i);else Scene_MenuBase['prototype'][_0x4c4232(0x13a)][_0x4c4232(0x206)](this);}},Scene_ClassChange['prototype']['updatedLayoutStyle']=function(){const _0x5d4dc6=_0x15b20a;return VisuMZ[_0x5d4dc6(0x20a)][_0x5d4dc6(0x228)][_0x5d4dc6(0x22b)][_0x5d4dc6(0x261)];},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x2d0)]=function(){const _0x4ca0a4=_0x15b20a;return VisuMZ[_0x4ca0a4(0x20a)][_0x4ca0a4(0x228)][_0x4ca0a4(0x22b)]['EnableLayout'];},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x258)]=function(){const _0x250493=_0x15b20a;Scene_MenuBase[_0x250493(0x24e)][_0x250493(0x258)][_0x250493(0x206)](this),this['createHelpWindow'](),this[_0x250493(0x325)](),this['createClassTierWindow'](),this[_0x250493(0x309)](),this[_0x250493(0x2f4)](),this[_0x250493(0x114)]();},Scene_ClassChange[_0x15b20a(0x24e)]['createStatusWindow']=function(){const _0x263304=_0x15b20a,_0x1a1991=this[_0x263304(0x232)]();this['_statusWindow']=new Window_ClassStatus(_0x1a1991),this['addWindow'](this[_0x263304(0x327)]),this[_0x263304(0x327)]['setBackgroundType'](VisuMZ[_0x263304(0x20a)][_0x263304(0x228)][_0x263304(0x22b)][_0x263304(0x26d)]);},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x232)]=function(){const _0x3f4b43=_0x15b20a,_0xa92adb=VisuMZ[_0x3f4b43(0x20a)][_0x3f4b43(0x228)][_0x3f4b43(0x22b)];if(_0xa92adb[_0x3f4b43(0x335)])return _0xa92adb[_0x3f4b43(0x335)][_0x3f4b43(0x206)](this);const _0x25308a=Math[_0x3f4b43(0xd7)](Graphics['boxWidth']/0x2),_0x1c24f8=this[_0x3f4b43(0xda)](),_0x165b79=this[_0x3f4b43(0x13a)]()?0x0:_0x25308a,_0x44dbca=this[_0x3f4b43(0x1b7)]();return new Rectangle(_0x165b79,_0x44dbca,_0x25308a,_0x1c24f8);},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x106)]=function(){const _0x52d750=_0x15b20a,_0x13509f=this[_0x52d750(0x1d7)](),_0x334a70=new Window_ClassTier(_0x13509f);_0x334a70[_0x52d750(0xee)](this['_helpWindow']),_0x334a70[_0x52d750(0x367)](VisuMZ[_0x52d750(0x20a)][_0x52d750(0x228)][_0x52d750(0x22b)]['Window_ClassTier_BgType']),this[_0x52d750(0x2e9)](_0x334a70),this[_0x52d750(0x1af)]=_0x334a70,_0x334a70[_0x52d750(0x167)](_0x52d750(0x124),this['popScene'][_0x52d750(0x350)](this)),this['highestTier']()>0x1&&(_0x334a70[_0x52d750(0x167)]('pagedown',this['nextActor'][_0x52d750(0x350)](this)),_0x334a70['setHandler']('pageup',this['previousActor'][_0x52d750(0x350)](this))),_0x334a70[_0x52d750(0x167)](_0x52d750(0x1e0),this[_0x52d750(0x356)][_0x52d750(0x350)](this));},Scene_ClassChange[_0x15b20a(0x24e)]['classTierWindowRect']=function(){const _0x58e41d=_0x15b20a,_0xc86940=VisuMZ[_0x58e41d(0x20a)][_0x58e41d(0x228)]['Window'];if(_0xc86940[_0x58e41d(0x17f)])return _0xc86940[_0x58e41d(0x17f)][_0x58e41d(0x206)](this);const _0x578f46=Graphics[_0x58e41d(0x11a)]-this['_statusWindow'][_0x58e41d(0x320)],_0x40ac77=this[_0x58e41d(0xda)](),_0x2968ed=this[_0x58e41d(0x13a)]()?_0x578f46:0x0,_0x2c6fc2=this[_0x58e41d(0x1b7)]();return new Rectangle(_0x2968ed,_0x2c6fc2,_0x578f46,_0x40ac77);},Scene_ClassChange[_0x15b20a(0x24e)]['createClassListWindow']=function(){const _0x127f53=_0x15b20a,_0x408058=this[_0x127f53(0x2bc)](),_0x48826c=new Window_ClassList(_0x408058);_0x48826c[_0x127f53(0xee)](this[_0x127f53(0xdd)]),_0x48826c[_0x127f53(0x1c1)](this[_0x127f53(0x327)]),_0x48826c[_0x127f53(0x367)](VisuMZ[_0x127f53(0x20a)]['Settings'][_0x127f53(0x22b)]['Window_ClassList_BgType']),this[_0x127f53(0x2e9)](_0x48826c),this[_0x127f53(0x25f)]=_0x48826c,_0x48826c[_0x127f53(0x167)]('cancel',this[_0x127f53(0x231)]['bind'](this)),this[_0x127f53(0x18b)]()<=0x1&&(_0x48826c[_0x127f53(0x167)](_0x127f53(0x212),this[_0x127f53(0x249)]['bind'](this)),_0x48826c[_0x127f53(0x167)](_0x127f53(0x1bd),this[_0x127f53(0x1c2)][_0x127f53(0x350)](this))),_0x48826c[_0x127f53(0x167)](_0x127f53(0x1e9),this[_0x127f53(0x21b)][_0x127f53(0x350)](this));},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x2bc)]=function(){const _0x389510=_0x15b20a,_0xfdcb4e=VisuMZ[_0x389510(0x20a)][_0x389510(0x228)]['Window'];if(_0xfdcb4e[_0x389510(0xe3)])return _0xfdcb4e[_0x389510(0xe3)][_0x389510(0x206)](this);const _0x272d95=Graphics[_0x389510(0x11a)]-this[_0x389510(0x327)][_0x389510(0x320)],_0x15d91c=this[_0x389510(0xda)](),_0x4d1e17=this[_0x389510(0x13a)]()?_0x272d95:0x0,_0x5a6113=this[_0x389510(0x1b7)]();return new Rectangle(_0x4d1e17,_0x5a6113,_0x272d95,_0x15d91c);},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x18b)]=function(){const _0x17599b=_0x15b20a;if(this[_0x17599b(0x102)]!==undefined)return this[_0x17599b(0x102)];return this[_0x17599b(0x102)]=$gameParty[_0x17599b(0x271)](),this[_0x17599b(0x102)];},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x2f4)]=function(){const _0x13bc88=_0x15b20a;this[_0x13bc88(0x18b)]()>0x1?(this[_0x13bc88(0x1af)][_0x13bc88(0x100)](0x0),this[_0x13bc88(0x1af)][_0x13bc88(0x1b3)](),this[_0x13bc88(0x1af)]['activate'](),this[_0x13bc88(0x25f)][_0x13bc88(0x32a)](),this[_0x13bc88(0x25f)]['deactivate']()):(this['_classListWindow'][_0x13bc88(0x100)](0x0),this['_classListWindow']['setTier'](0x1),this[_0x13bc88(0x25f)]['show'](),this[_0x13bc88(0x25f)][_0x13bc88(0x188)](),this['_classTierWindow'][_0x13bc88(0x32a)](),this['_classTierWindow'][_0x13bc88(0x24b)]());},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x114)]=function(){const _0x2135a8=_0x15b20a,_0x3b00e9=this[_0x2135a8(0x31e)]();_0x3b00e9['checkForAutoClassUnlocks'](),this[_0x2135a8(0x327)]['setActor'](_0x3b00e9),this['_classTierWindow'][_0x2135a8(0x14b)](_0x3b00e9),this[_0x2135a8(0x25f)][_0x2135a8(0x14b)](_0x3b00e9);},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x112)]=function(){const _0x635ef3=_0x15b20a;Scene_MenuBase[_0x635ef3(0x24e)][_0x635ef3(0x112)][_0x635ef3(0x206)](this),this[_0x635ef3(0x114)](),this[_0x635ef3(0x2f4)]();},Scene_ClassChange['prototype'][_0x15b20a(0x356)]=function(){const _0x822499=_0x15b20a,_0x4b1278=this['_classTierWindow']['currentExt']();this[_0x822499(0x25f)][_0x822499(0x1da)](_0x4b1278),this[_0x822499(0x25f)]['show'](),this[_0x822499(0x25f)][_0x822499(0x188)](),this[_0x822499(0x25f)][_0x822499(0x100)](0x0),this[_0x822499(0x1af)][_0x822499(0x32a)](),this[_0x822499(0x1af)][_0x822499(0x24b)](),this['forceRemoveClassChangeAnimations']();},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x231)]=function(){const _0x1b427b=_0x15b20a;this[_0x1b427b(0x18b)]()>0x1?(this['_classTierWindow'][_0x1b427b(0x1b3)](),this['_classTierWindow'][_0x1b427b(0x188)](),this[_0x1b427b(0x25f)][_0x1b427b(0x32a)](),this[_0x1b427b(0x25f)][_0x1b427b(0x24b)](),this[_0x1b427b(0x327)]['setTempActor'](null)):this[_0x1b427b(0x11b)]();},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x21b)]=function(){const _0x592a95=_0x15b20a,_0x28fe1e=this[_0x592a95(0x25f)]['_tier'],_0x1a0eb3=this[_0x592a95(0x25f)][_0x592a95(0x1df)](),_0x4fe0d9=this[_0x592a95(0x25f)]['index'](),_0x38a470=_0x1a0eb3?_0x1a0eb3['id']:0x0;this[_0x592a95(0x1f4)]['changeMulticlass'](_0x38a470,_0x28fe1e),this[_0x592a95(0x1af)][_0x592a95(0xd2)](),this['_classListWindow'][_0x592a95(0xd2)](),this[_0x592a95(0x327)][_0x592a95(0x301)](null),this['startClassChangeAnimation'](_0x38a470,_0x28fe1e),this[_0x592a95(0x2f4)]();if(this[_0x592a95(0x1af)][_0x592a95(0x18e)])this['_classTierWindow'][_0x592a95(0x2fa)](_0x28fe1e-0x1);else this['_classListWindow'][_0x592a95(0x18e)]&&this['_classListWindow'][_0x592a95(0x2fa)](_0x4fe0d9);},Scene_ClassChange['prototype']['startClassChangeAnimation']=function(_0x158bc4,_0x57feda){const _0x3b47a4=_0x15b20a,_0x22d906=this[_0x3b47a4(0x1a8)](_0x57feda);this[_0x3b47a4(0x265)](_0x158bc4,_0x57feda,_0x22d906);},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x1a8)]=function(_0x24f448){const _0x28bdff=_0x15b20a,_0x298c86=new Sprite(),_0xa001ba=VisuMZ['ClassChangeSystem'][_0x28bdff(0x228)][_0x28bdff(0x22b)];if(_0x24f448<=0x1){const _0x314f6d=this[_0x28bdff(0x327)];_0x298c86['x']=_0x314f6d['x']+Math[_0x28bdff(0x219)](_0x314f6d[_0x28bdff(0x320)]/0x2),_0x298c86['y']=_0x314f6d['y']+Math[_0x28bdff(0x219)](_0x314f6d['height']/0x2),_0x298c86['x']+=_0xa001ba['ConfirmAniPrimaryOffsetX']||0x0,_0x298c86['y']+=_0xa001ba[_0x28bdff(0xcd)]||0x0;}else{const _0x17aaea=this[_0x28bdff(0x1af)],_0x37bab1=_0x17aaea[_0x28bdff(0x1f1)](_0x17aaea[_0x28bdff(0x2c1)]()),_0x1d639b=_0x17aaea['padding']||0x0;_0x298c86['x']=_0x17aaea['x']+_0x37bab1['x']+Math[_0x28bdff(0x219)](_0x37bab1[_0x28bdff(0x320)]/0x2)+_0x1d639b,_0x298c86['y']=_0x17aaea['y']+_0x37bab1['y']+Math[_0x28bdff(0x219)](_0x37bab1[_0x28bdff(0xc9)]/0x2)+_0x1d639b,_0x298c86['x']+=_0xa001ba[_0x28bdff(0x18d)]||0x0,_0x298c86['y']+=_0xa001ba['ConfirmAniSubclassOffsetY']||0x0;}return _0x298c86['x']+=this[_0x28bdff(0x290)]['x'],_0x298c86['y']+=this[_0x28bdff(0x290)]['y'],_0x298c86;},Scene_ClassChange['prototype'][_0x15b20a(0x265)]=function(_0x59ff0b,_0x1629b1,_0x4e24b0){const _0x3f0bb0=_0x15b20a,_0x48690d=this[_0x3f0bb0(0x20f)](_0x59ff0b),_0x1082db=$dataAnimations[_0x48690d];if(!_0x1082db)return;const _0x58fa8d=this[_0x3f0bb0(0x186)](_0x1082db),_0xd6be8d=new(_0x58fa8d?Sprite_AnimationMV:Sprite_Animation)(),_0x568148=[_0x4e24b0],_0x44b2d2=0x0;_0xd6be8d['setup'](_0x568148,_0x1082db,![],_0x44b2d2,null),_0xd6be8d[_0x3f0bb0(0x1d5)]=_0x1629b1,this[_0x3f0bb0(0x28b)](_0x4e24b0),this[_0x3f0bb0(0x28b)](_0xd6be8d),this[_0x3f0bb0(0x324)][_0x3f0bb0(0x1e8)](_0xd6be8d);},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x20f)]=function(_0x2ef4ff){const _0x1f6286=_0x15b20a,_0x4ec70d=$dataClasses[_0x2ef4ff];if(_0x4ec70d){const _0x36ccbb=VisuMZ[_0x1f6286(0x20a)][_0x1f6286(0x17c)],_0x2f2bc7=_0x4ec70d['note'];if(_0x2f2bc7[_0x1f6286(0x355)](_0x36ccbb[_0x1f6286(0x2b2)]))return Number(RegExp['$1']);}return VisuMZ['ClassChangeSystem'][_0x1f6286(0x228)]['Window'][_0x1f6286(0x371)];},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x186)]=function(_0x3adb62){const _0x32b936=_0x15b20a;return!!_0x3adb62[_0x32b936(0xc8)];},Scene_ClassChange[_0x15b20a(0x24e)]['updateClassChangeAnimations']=function(){const _0x2a3022=_0x15b20a,_0x8a5079=[];for(const _0x206861 of this[_0x2a3022(0x324)]){if(!_0x206861)continue;if(_0x206861[_0x2a3022(0x221)]())continue;_0x8a5079[_0x2a3022(0x1e8)](_0x206861);}for(const _0x53bbdd of _0x8a5079){if(!_0x53bbdd)continue;for(const _0x94d58d of _0x53bbdd[_0x2a3022(0x21d)]){this['removeChild'](_0x94d58d);}this[_0x2a3022(0x324)][_0x2a3022(0x36b)](_0x53bbdd),this['removeChild'](_0x53bbdd);};},Scene_ClassChange['prototype'][_0x15b20a(0x32b)]=function(){const _0x13cc81=_0x15b20a,_0x10f854=[];for(const _0x3c9ea9 of this[_0x13cc81(0x324)]){if(!_0x3c9ea9)continue;if(_0x3c9ea9[_0x13cc81(0x1d5)]<=0x1)continue;_0x10f854[_0x13cc81(0x1e8)](_0x3c9ea9);}for(const _0x396b55 of _0x10f854){if(!_0x396b55)continue;for(const _0x5ab7a6 of _0x396b55[_0x13cc81(0x21d)]){this[_0x13cc81(0x162)](_0x5ab7a6);}this[_0x13cc81(0x324)][_0x13cc81(0x36b)](_0x396b55),this[_0x13cc81(0x162)](_0x396b55);};},Scene_ClassChange['prototype'][_0x15b20a(0x1f9)]=function(){const _0xcb6c24=_0x15b20a;if(!this['_classTierWindow'])return![];if(!this[_0xcb6c24(0x1af)][_0xcb6c24(0x18e)])return![];return this[_0xcb6c24(0x1af)][_0xcb6c24(0x1e7)]();},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x2b6)]=function(){const _0x56d39f=_0x15b20a;if(this[_0x56d39f(0x1f9)]())return TextManager['getInputButtonString']('shift');return Scene_MenuBase[_0x56d39f(0x24e)]['buttonAssistKey3'][_0x56d39f(0x206)](this);},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x14c)]=function(){const _0x534295=_0x15b20a;if(this[_0x534295(0x1f9)]())return TextManager[_0x534295(0x23d)];return Scene_MenuBase[_0x534295(0x24e)][_0x534295(0x14c)][_0x534295(0x206)](this);},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x285)]=function(){const _0x5e6fbc=_0x15b20a;if(this[_0x5e6fbc(0x1f9)]())return this[_0x5e6fbc(0x30e)][_0x5e6fbc(0x320)]/0x5/-0x3;return Scene_MenuBase[_0x5e6fbc(0x24e)][_0x5e6fbc(0x285)][_0x5e6fbc(0x206)](this);},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x107)]=function(){const _0x17cb5a=_0x15b20a;Scene_MenuBase[_0x17cb5a(0x24e)][_0x17cb5a(0x107)]['call'](this),this[_0x17cb5a(0x274)](this[_0x17cb5a(0x2e2)]()),this[_0x17cb5a(0x359)]();},Scene_ClassChange[_0x15b20a(0x24e)][_0x15b20a(0x2e2)]=function(){const _0x5e0c2c=_0x15b20a;return VisuMZ[_0x5e0c2c(0x20a)][_0x5e0c2c(0x228)][_0x5e0c2c(0x2dc)][_0x5e0c2c(0x332)];},Scene_ClassChange[_0x15b20a(0x24e)]['createCustomBackgroundImages']=function(){const _0x5d51cc=_0x15b20a,_0x3a537e=VisuMZ[_0x5d51cc(0x20a)]['Settings']['BgSettings'];_0x3a537e&&(_0x3a537e['BgFilename1']!==''||_0x3a537e[_0x5d51cc(0x1e4)]!=='')&&(this['_backSprite1']=new Sprite(ImageManager['loadTitle1'](_0x3a537e['BgFilename1']||'')),this['_backSprite2']=new Sprite(ImageManager[_0x5d51cc(0x278)](_0x3a537e['BgFilename2']||'')),this['addChild'](this[_0x5d51cc(0x210)]),this[_0x5d51cc(0x28b)](this[_0x5d51cc(0x18a)]),this[_0x5d51cc(0x210)][_0x5d51cc(0x341)][_0x5d51cc(0x179)](this['adjustSprite'][_0x5d51cc(0x350)](this,this[_0x5d51cc(0x210)])),this[_0x5d51cc(0x18a)]['bitmap'][_0x5d51cc(0x179)](this[_0x5d51cc(0x170)]['bind'](this,this[_0x5d51cc(0x18a)])));},Scene_ClassChange[_0x15b20a(0x24e)]['adjustSprite']=function(_0x2abe3c){const _0x332643=_0x15b20a;this['scaleSprite'](_0x2abe3c),this[_0x332643(0x135)](_0x2abe3c);},Window_Base[_0x15b20a(0x24e)][_0x15b20a(0x292)]=function(_0x58131a,_0x38c82c,_0xf237e7,_0x2a475f,_0x3913fc){const _0x5848bb=_0x15b20a;_0x3913fc=_0x3913fc||_0x5848bb(0x1f5);const _0x33387e=_0x5848bb(0x2f9)[_0x5848bb(0x36a)](ImageManager[_0x5848bb(0x201)]),_0x268c2b=TextManager[_0x5848bb(0x171)],_0x1fcc69=_0x268c2b[_0x5848bb(0x36a)](_0x58131a,TextManager['classPointsAbbr'],_0x33387e,TextManager[_0x5848bb(0x19b)]),_0x1b3981=this[_0x5848bb(0x1d3)](_0x1fcc69)[_0x5848bb(0x320)];if(_0x3913fc===_0x5848bb(0x1f5))_0x38c82c+=0x0;else _0x3913fc==='center'?_0x38c82c+=Math[_0x5848bb(0x219)]((_0x2a475f-_0x1b3981)/0x2):_0x38c82c+=_0x2a475f-_0x1b3981;this[_0x5848bb(0x269)](_0x1fcc69,_0x38c82c,_0xf237e7);},Window_Base['prototype'][_0x15b20a(0x239)]=function(_0x587ae,_0x7f27bb,_0xd97e8d,_0x5be145,_0x56059f,_0xbdff8){const _0x2f45de=_0x15b20a,_0x8b0d8b=_0x587ae[_0x2f45de(0x215)](_0x7f27bb);this['drawClassPoints'](_0x8b0d8b,_0xd97e8d,_0x5be145,_0x56059f,_0xbdff8);},Window_Base[_0x15b20a(0x24e)]['drawJobPoints']=function(_0xde8dbd,_0x2a885b,_0x2f2618,_0x3bbeee,_0x4e014e){const _0x11bd8d=_0x15b20a;_0x4e014e=_0x4e014e||_0x11bd8d(0x1f5);const _0x256f2d='\x5cI[%1]'[_0x11bd8d(0x36a)](ImageManager[_0x11bd8d(0x133)]),_0x2790ca=TextManager[_0x11bd8d(0x25e)],_0x58022a=_0x2790ca['format'](_0xde8dbd,TextManager[_0x11bd8d(0x144)],_0x256f2d,TextManager[_0x11bd8d(0x29c)]),_0x243cee=this[_0x11bd8d(0x1d3)](_0x58022a)[_0x11bd8d(0x320)];if(_0x4e014e===_0x11bd8d(0x1f5))_0x2a885b+=0x0;else _0x4e014e===_0x11bd8d(0x2bf)?_0x2a885b+=Math['round']((_0x3bbeee-_0x243cee)/0x2):_0x2a885b+=_0x3bbeee-_0x243cee;this[_0x11bd8d(0x269)](_0x58022a,_0x2a885b,_0x2f2618);},Window_Base[_0x15b20a(0x24e)]['drawActorJobPoints']=function(_0x1360de,_0x4c9381,_0x46557a,_0x350db8,_0x33d8db,_0x4b1721){const _0x401343=_0x15b20a,_0x3173b5=_0x1360de[_0x401343(0x130)](_0x4c9381);this[_0x401343(0x37b)](_0x3173b5,_0x46557a,_0x350db8,_0x33d8db,_0x4b1721);},Window_Base[_0x15b20a(0x24e)][_0x15b20a(0x330)]=function(_0x470eb5,_0x1194fe,_0x1826e5,_0x349097){const _0x19734a=_0x15b20a;if(!$dataClasses[_0x1194fe])return;this['isClassExpGaugeDrawn']()&&this[_0x19734a(0x281)](_0x470eb5,_0x1194fe,_0x1826e5,_0x349097),this[_0x19734a(0x27f)](ColorManager[_0x19734a(0x23f)]()),this[_0x19734a(0x2ea)](TextManager['levelA'],_0x1826e5,_0x349097,0x30),this[_0x19734a(0x2a5)](),this[_0x19734a(0x2ea)](_0x470eb5[_0x19734a(0x313)](_0x1194fe),_0x1826e5+0x54,_0x349097,0x24,_0x19734a(0x284));},Window_Base['prototype'][_0x15b20a(0x11d)]=function(){const _0x2bec99=_0x15b20a;return Imported['VisuMZ_0_CoreEngine']&&VisuMZ[_0x2bec99(0x277)][_0x2bec99(0x228)]['UI']['LvExpGauge'];},Window_Base[_0x15b20a(0x24e)][_0x15b20a(0x281)]=function(_0x1ce35c,_0x153653,_0x11992f,_0x539111){const _0x2c7286=_0x15b20a;if(!_0x1ce35c)return;if(!_0x1ce35c['isActor']())return;const _0x22a453=0x80,_0x8a698e=_0x1ce35c[_0x2c7286(0x345)](_0x153653);let _0x379073=ColorManager[_0x2c7286(0xf9)](),_0x4d5db7=ColorManager[_0x2c7286(0x310)]();_0x8a698e>=0x1&&(_0x379073=ColorManager[_0x2c7286(0x2bb)](),_0x4d5db7=ColorManager[_0x2c7286(0x1a1)]()),this[_0x2c7286(0x1b9)](_0x11992f,_0x539111,_0x22a453,_0x8a698e,_0x379073,_0x4d5db7);},VisuMZ[_0x15b20a(0x20a)][_0x15b20a(0x2ec)]=Window_MenuCommand[_0x15b20a(0x24e)]['addOriginalCommands'],Window_MenuCommand[_0x15b20a(0x24e)][_0x15b20a(0x29e)]=function(){const _0x3088e2=_0x15b20a;VisuMZ[_0x3088e2(0x20a)][_0x3088e2(0x2ec)][_0x3088e2(0x206)](this),this['addClassChangeSystemCommand']();},Window_MenuCommand[_0x15b20a(0x24e)][_0x15b20a(0x1a2)]=function(){const _0x22acc3=_0x15b20a;if(!this['addClassChangeSystemCommandAutomatically']())return;if(!this[_0x22acc3(0x20d)]())return;const _0x49904f=TextManager['classChangeMenuCommand'],_0x275b81=this[_0x22acc3(0x15c)]();this[_0x22acc3(0x2ac)](_0x49904f,_0x22acc3(0x20a),_0x275b81);},Window_MenuCommand[_0x15b20a(0x24e)][_0x15b20a(0x1ef)]=function(){return Imported['VisuMZ_1_MainMenuCore']?![]:!![];},Window_MenuCommand['prototype'][_0x15b20a(0x20d)]=function(){return $gameSystem['isMainMenuClassChangeSystemVisible']();},Window_MenuCommand['prototype']['isClassChangeCommandEnabled']=function(){const _0x3f11bc=_0x15b20a;return $gameSystem[_0x3f11bc(0x111)]();};function Window_ClassStatus(){const _0x4165c0=_0x15b20a;this[_0x4165c0(0x331)](...arguments);}Window_ClassStatus['prototype']=Object['create'](Window_StatusBase[_0x15b20a(0x24e)]),Window_ClassStatus['prototype'][_0x15b20a(0x153)]=Window_ClassStatus,Window_ClassStatus['prototype']['initialize']=function(_0x4958ef){const _0x4ef30a=_0x15b20a;Window_StatusBase[_0x4ef30a(0x24e)][_0x4ef30a(0x331)][_0x4ef30a(0x206)](this,_0x4958ef),this[_0x4ef30a(0x1f4)]=null,this[_0x4ef30a(0x322)]=null,this[_0x4ef30a(0xd2)]();},Window_ClassStatus['prototype'][_0x15b20a(0x14b)]=function(_0x1113e8){const _0x5b43bd=_0x15b20a;this[_0x5b43bd(0x1f4)]!==_0x1113e8&&(this['_actor']=_0x1113e8,this[_0x5b43bd(0xd2)]());},Window_ClassStatus[_0x15b20a(0x24e)][_0x15b20a(0x27d)]=function(){return 0x0;},Window_ClassStatus['prototype'][_0x15b20a(0x301)]=function(_0x1b8de7){const _0x2872de=_0x15b20a;this[_0x2872de(0x322)]!==_0x1b8de7&&(this[_0x2872de(0x322)]=_0x1b8de7,this[_0x2872de(0xd2)]());},Window_ClassStatus[_0x15b20a(0x24e)][_0x15b20a(0xd2)]=function(){const _0x341860=_0x15b20a;this[_0x341860(0x379)](),this[_0x341860(0x2ed)]();if(this[_0x341860(0x1f4)])this['_actor']['refresh']();this['prepareRefreshItemsEquipsCoreLayout']();},Window_ClassStatus[_0x15b20a(0x24e)][_0x15b20a(0x2c5)]=function(){const _0x239869=_0x15b20a;this['contents'][_0x239869(0xe2)]();if(!this[_0x239869(0x1f4)])return;if(this[_0x239869(0x372)]()){const _0x2242f6=ImageManager['loadPicture'](this[_0x239869(0x1f4)]['getMenuImage']());_0x2242f6[_0x239869(0x179)](this[_0x239869(0xcb)]['bind'](this));}else this[_0x239869(0x264)]();},Window_ClassStatus[_0x15b20a(0x24e)]['isMainMenuCoreMenuImageOptionAvailable']=function(){const _0x7c9ad9=_0x15b20a;return Imported[_0x7c9ad9(0xf1)]&&this[_0x7c9ad9(0x1f4)][_0x7c9ad9(0x282)]()!==''&&VisuMZ[_0x7c9ad9(0x20a)][_0x7c9ad9(0x228)][_0x7c9ad9(0x22b)][_0x7c9ad9(0x127)];},Window_ClassStatus['prototype']['onMenuImageLoad']=function(){const _0x2fff2f=_0x15b20a;VisuMZ[_0x2fff2f(0x20a)][_0x2fff2f(0x228)][_0x2fff2f(0x22b)][_0x2fff2f(0x1e1)][_0x2fff2f(0x206)](this),this['drawParameterList']();},Window_ClassStatus[_0x15b20a(0x24e)]['drawItemActorMenuImage']=function(_0x2d4b18,_0x5f55d4,_0xc57a50,_0x3b4420,_0x2fd2a3){const _0x507668=_0x15b20a,_0x3f5182=ImageManager[_0x507668(0x2d4)](_0x2d4b18['getMenuImage']()),_0x14144d=this[_0x507668(0x353)]-_0x3f5182[_0x507668(0x320)];_0x5f55d4+=_0x14144d/0x2;if(_0x14144d<0x0)_0x3b4420-=_0x14144d;Window_StatusBase[_0x507668(0x24e)][_0x507668(0x1e3)][_0x507668(0x206)](this,_0x2d4b18,_0x5f55d4,_0xc57a50,_0x3b4420,_0x2fd2a3);},Window_ClassStatus[_0x15b20a(0x24e)][_0x15b20a(0x264)]=function(){const _0x4a45d6=_0x15b20a;VisuMZ['ClassChangeSystem'][_0x4a45d6(0x228)]['Window'][_0x4a45d6(0x2a0)][_0x4a45d6(0x206)](this),this[_0x4a45d6(0x172)]();},Window_ClassStatus[_0x15b20a(0x24e)][_0x15b20a(0x172)]=function(){const _0x2fe7e3=_0x15b20a;this[_0x2fe7e3(0x2ed)](),VisuMZ['ClassChangeSystem'][_0x2fe7e3(0x228)][_0x2fe7e3(0x22b)][_0x2fe7e3(0x376)][_0x2fe7e3(0x206)](this);},Window_ClassStatus[_0x15b20a(0x24e)][_0x15b20a(0x193)]=function(){const _0x447170=_0x15b20a;return Imported[_0x447170(0x17b)]?VisuMZ[_0x447170(0x277)][_0x447170(0x228)][_0x447170(0x1f2)]['ExtDisplayedParams']:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ClassStatus[_0x15b20a(0x24e)][_0x15b20a(0x143)]=function(){const _0x49a9f3=_0x15b20a;return VisuMZ[_0x49a9f3(0x20a)][_0x49a9f3(0x228)][_0x49a9f3(0x22b)][_0x49a9f3(0x1a6)];},Window_ClassStatus[_0x15b20a(0x24e)][_0x15b20a(0x1be)]=function(){const _0x5890de=_0x15b20a;return Imported[_0x5890de(0x17b)]&&VisuMZ['CoreEngine']['Settings'][_0x5890de(0x1f2)][_0x5890de(0x348)];},Window_ClassStatus['prototype'][_0x15b20a(0x110)]=function(_0x581f25,_0x24a8e4,_0x59ad73,_0x435ad6,_0x2e1a58){const _0x38c749=_0x15b20a;if(Imported['VisuMZ_1_MainMenuCore'])switch(this[_0x38c749(0xe9)]()){case _0x38c749(0x19d):break;case _0x38c749(0x164):this[_0x38c749(0x1cf)](_0x581f25,_0x24a8e4,_0x59ad73,_0x435ad6,_0x2e1a58);break;case _0x38c749(0x2f2):this[_0x38c749(0x10e)](_0x581f25,_0x24a8e4,_0x59ad73,_0x435ad6,_0x2e1a58);break;default:Window_StatusBase[_0x38c749(0x24e)][_0x38c749(0x110)]['call'](this,_0x581f25,_0x24a8e4,_0x59ad73,_0x435ad6,_0x2e1a58);break;}else Window_StatusBase['prototype'][_0x38c749(0x110)]['call'](this,_0x581f25,_0x24a8e4,_0x59ad73,_0x435ad6,_0x2e1a58);},Window_ClassStatus[_0x15b20a(0x24e)][_0x15b20a(0x26e)]=function(_0x22d7d2,_0x125af8){const _0x4fcf45=_0x15b20a,_0x21b953=this[_0x4fcf45(0x344)]();this['changeTextColor'](ColorManager[_0x4fcf45(0x23f)]());if(Imported[_0x4fcf45(0x17b)]){const _0xd2b6de=VisuMZ['CoreEngine'][_0x4fcf45(0x228)]['UI'][_0x4fcf45(0x268)];this['drawText'](_0xd2b6de,_0x22d7d2,_0x125af8,_0x21b953,_0x4fcf45(0x2bf));}else this['drawText']('→',_0x22d7d2,_0x125af8,_0x21b953,_0x4fcf45(0x2bf));},Window_ClassStatus[_0x15b20a(0x24e)][_0x15b20a(0x344)]=function(){return 0x20;},Window_ClassStatus[_0x15b20a(0x24e)]['drawUpdatedParamName']=function(_0x9aa51c,_0x33bd05,_0xa35ead,_0x4def4b){const _0x3a6848=_0x15b20a,_0x23d027=this['itemPadding']();Imported[_0x3a6848(0x17b)]?this[_0x3a6848(0x32f)](_0x33bd05+_0x23d027,_0xa35ead,_0x4def4b,_0x9aa51c,![]):this[_0x3a6848(0x2ea)](TextManager[_0x3a6848(0x34e)](_0x9aa51c),_0x33bd05+_0x23d027,_0xa35ead,_0x4def4b);},Window_ClassStatus[_0x15b20a(0x24e)]['drawUpdatedBeforeParamValue']=function(_0x9bb996,_0xf7dbb2,_0x1336fe,_0x2d11d8){const _0x492018=_0x15b20a,_0x4bce60=this[_0x492018(0x200)]();let _0x7ecd9=0x0;Imported[_0x492018(0x17b)]?_0x7ecd9=this[_0x492018(0x1f4)][_0x492018(0x15d)](_0x9bb996,!![]):_0x7ecd9=this['_actor'][_0x492018(0x34e)](_0x9bb996);const _0x5b479c=_0x7ecd9;this[_0x492018(0x2ea)](_0x7ecd9,_0xf7dbb2,_0x1336fe,_0x2d11d8-_0x4bce60,'right');},Window_ClassStatus[_0x15b20a(0x24e)][_0x15b20a(0x1b6)]=function(_0x446588,_0x5ce2b3,_0x1248e1,_0x5aef06){const _0x2d27b1=_0x15b20a,_0x1fa8d7=this[_0x2d27b1(0x200)]();let _0x1f42c6=0x0,_0x3d7fe0=0x0,_0x1a0f98='';if(this[_0x2d27b1(0x322)]){Imported[_0x2d27b1(0x17b)]?(_0x1f42c6=this[_0x2d27b1(0x1f4)][_0x2d27b1(0x15d)](_0x446588,![]),_0x3d7fe0=this['_tempActor'][_0x2d27b1(0x15d)](_0x446588,![]),_0x1a0f98=this[_0x2d27b1(0x322)][_0x2d27b1(0x15d)](_0x446588,!![])):(_0x1f42c6=this[_0x2d27b1(0x1f4)][_0x2d27b1(0x34e)](_0x446588),_0x3d7fe0=this[_0x2d27b1(0x322)][_0x2d27b1(0x34e)](_0x446588),_0x1a0f98=this[_0x2d27b1(0x322)]['param'](_0x446588));const _0x525b01=_0x1f42c6,_0xbbbb12=_0x3d7fe0;diffValue=_0xbbbb12-_0x525b01,this[_0x2d27b1(0x27f)](ColorManager[_0x2d27b1(0x2c6)](diffValue)),this[_0x2d27b1(0x2ea)](_0x1a0f98,_0x5ce2b3,_0x1248e1,_0x5aef06-_0x1fa8d7,'right');}},Window_ClassStatus[_0x15b20a(0x24e)][_0x15b20a(0x279)]=function(_0xbc0647,_0x43457b,_0x59d5c7,_0x5aac57){const _0x260b3f=_0x15b20a,_0x31a92a=this['itemPadding']();let _0x1b599b=0x0,_0x9581f1=0x0,_0x41d3e2=![];if(this[_0x260b3f(0x322)]){Imported[_0x260b3f(0x17b)]?(_0x1b599b=this[_0x260b3f(0x1f4)]['paramValueByName'](_0xbc0647,![]),_0x9581f1=this[_0x260b3f(0x322)]['paramValueByName'](_0xbc0647,![]),_0x41d3e2=String(this[_0x260b3f(0x1f4)][_0x260b3f(0x15d)](_0xbc0647,!![]))['match'](/([%％])/i)):(_0x1b599b=this[_0x260b3f(0x1f4)][_0x260b3f(0x34e)](_0xbc0647),_0x9581f1=this['_tempActor'][_0x260b3f(0x34e)](_0xbc0647),_0x41d3e2=_0x1b599b%0x1!==0x0||_0x9581f1%0x1!==0x0);const _0x55dfc6=_0x1b599b,_0x3da61d=_0x9581f1,_0x323859=_0x3da61d-_0x55dfc6;let _0xe36a9e=_0x323859;if(_0x41d3e2)_0xe36a9e=Math[_0x260b3f(0x219)](_0x323859*0x64)+'%';_0x323859!==0x0&&(this[_0x260b3f(0x27f)](ColorManager[_0x260b3f(0x2c6)](_0x323859)),_0xe36a9e=(_0x323859>0x0?_0x260b3f(0x22d):_0x260b3f(0x233))[_0x260b3f(0x36a)](_0xe36a9e),this[_0x260b3f(0x2ea)](_0xe36a9e,_0x43457b+_0x31a92a,_0x59d5c7,_0x5aac57,_0x260b3f(0x1f5)));}},Window_ClassStatus[_0x15b20a(0x24e)][_0x15b20a(0x173)]=function(_0x3c099c,_0x1116f0,_0x162d4e,_0x2f757f,_0xe01309){const _0x509397=_0x15b20a;if(VisuMZ[_0x509397(0x20a)][_0x509397(0x228)][_0x509397(0x22b)][_0x509397(0x244)]===![])return;_0xe01309=Math[_0x509397(0x35e)](_0xe01309||0x1,0x1);while(_0xe01309--){_0x2f757f=_0x2f757f||this[_0x509397(0x24f)](),this[_0x509397(0x2a9)]['paintOpacity']=0xa0;const _0x417c16=ColorManager[_0x509397(0xd6)]();this['contents'][_0x509397(0x23b)](_0x3c099c+0x1,_0x1116f0+0x1,_0x162d4e-0x2,_0x2f757f-0x2,_0x417c16),this[_0x509397(0x2a9)][_0x509397(0x123)]=0xff;}},ColorManager[_0x15b20a(0xd6)]=function(){const _0x3ec64e=_0x15b20a,_0xb2aba1=VisuMZ['ClassChangeSystem'][_0x3ec64e(0x228)][_0x3ec64e(0x22b)];let _0x4e4a46=_0xb2aba1[_0x3ec64e(0x2fe)]!==undefined?_0xb2aba1['BackRectColor']:0x13;return ColorManager['getColor'](_0x4e4a46);},Window_ClassStatus[_0x15b20a(0x24e)][_0x15b20a(0x1d4)]=function(_0x859a47,_0x3fc5c5,_0x1312ff){const _0x4d6d2b=_0x15b20a,_0x39c22c=VisuMZ[_0x4d6d2b(0x20a)]['Settings'][_0x4d6d2b(0x22b)]['DisplayedResources'],_0x4f81fd=this[_0x4d6d2b(0x1f4)]['currentClass']()['id'];for(const _0x434e3d of _0x39c22c){switch(_0x434e3d[_0x4d6d2b(0x1bb)]()['trim']()){case'AP':if(!Imported[_0x4d6d2b(0xfb)])continue;this[_0x4d6d2b(0xf4)](this[_0x4d6d2b(0x1f4)],_0x4f81fd,_0x859a47,_0x3fc5c5,_0x1312ff,'right'),_0x3fc5c5+=this[_0x4d6d2b(0x24f)]();break;case'CP':if(!Imported['VisuMZ_2_ClassChangeSystem'])continue;this[_0x4d6d2b(0x239)](this[_0x4d6d2b(0x1f4)],_0x4f81fd,_0x859a47,_0x3fc5c5,_0x1312ff,_0x4d6d2b(0x284)),_0x3fc5c5+=this['lineHeight']();break;case'JP':if(!Imported['VisuMZ_2_ClassChangeSystem'])continue;this[_0x4d6d2b(0x1b2)](this[_0x4d6d2b(0x1f4)],_0x4f81fd,_0x859a47,_0x3fc5c5,_0x1312ff,_0x4d6d2b(0x284)),_0x3fc5c5+=this[_0x4d6d2b(0x24f)]();break;case'SP':if(!Imported['VisuMZ_2_SkillLearnSystem'])continue;this[_0x4d6d2b(0x1b1)](this[_0x4d6d2b(0x1f4)],_0x4f81fd,_0x859a47,_0x3fc5c5,_0x1312ff,'right'),_0x3fc5c5+=this[_0x4d6d2b(0x24f)]();break;}}};function Window_ClassCommand(){const _0x4bb611=_0x15b20a;this[_0x4bb611(0x331)](...arguments);}Window_ClassCommand['prototype']=Object[_0x15b20a(0x258)](Window_Command[_0x15b20a(0x24e)]),Window_ClassCommand[_0x15b20a(0x24e)][_0x15b20a(0x153)]=Window_ClassCommand,Window_ClassCommand[_0x15b20a(0x24e)][_0x15b20a(0x331)]=function(_0x5d86b9){const _0x7c4e32=_0x15b20a;Window_Command[_0x7c4e32(0x24e)]['initialize'][_0x7c4e32(0x206)](this,_0x5d86b9),this[_0x7c4e32(0x1b0)](),this[_0x7c4e32(0x24b)]();},Window_ClassCommand[_0x15b20a(0x24e)][_0x15b20a(0x213)]=function(){const _0x37d426=_0x15b20a;return this[_0x37d426(0x24f)]()*0x3+0x8;},Window_ClassCommand[_0x15b20a(0x24e)][_0x15b20a(0x14b)]=function(_0x178592){const _0x287908=_0x15b20a;this[_0x287908(0x1f4)]!==_0x178592&&(this['_actor']=_0x178592,this[_0x287908(0xd2)]());},Window_ClassCommand[_0x15b20a(0x24e)][_0x15b20a(0xd2)]=function(){const _0x19a24c=_0x15b20a;Window_Command[_0x19a24c(0x24e)]['refresh']['call'](this),this['refreshCursor']();if(this['active'])this['updateHelp']();},Window_ClassCommand['prototype']['drawFadedItemBackground']=function(_0x5c848b,_0x179e7b){const _0x43e762=_0x15b20a;_0x179e7b=_0x179e7b||0x1,this[_0x43e762(0x333)](![]);const _0x194976=ColorManager[_0x43e762(0x27e)](),_0x3aadba=ColorManager['dimColor2'](),_0x36df7b=_0x5c848b['width']/0x2,_0x4fbf85=this[_0x43e762(0x24f)]();while(_0x179e7b--){this[_0x43e762(0x2a9)][_0x43e762(0x13e)](_0x5c848b['x'],_0x5c848b['y'],_0x36df7b,_0x4fbf85,_0x3aadba,_0x194976),this[_0x43e762(0x2a9)][_0x43e762(0x13e)](_0x5c848b['x']+_0x36df7b,_0x5c848b['y'],_0x36df7b,_0x4fbf85,_0x194976,_0x3aadba);}this[_0x43e762(0x333)](!![]);},Window_ClassCommand[_0x15b20a(0x24e)][_0x15b20a(0x25c)]=function(_0x4067d2,_0x3c6701,_0xd3be49){const _0x147926=_0x15b20a;if(!_0x3c6701)return;const _0x394c9e=VisuMZ['ClassChangeSystem'][_0x147926(0x17c)],_0x53a2fa=_0x3c6701['note'];let _0x4ce3ac='';if(_0x53a2fa[_0x147926(0x355)](_0x394c9e['classPicture']))_0x4ce3ac=String(RegExp['$1']);else _0x53a2fa[_0x147926(0x355)](_0x394c9e[_0x147926(0x25b)])&&(_0x4ce3ac=String(RegExp['$1']));if(_0x4ce3ac){const _0xa8b708=ImageManager['loadPicture'](_0x4ce3ac);_0xa8b708['addLoadListener'](this['drawPicture'][_0x147926(0x350)](this,_0x4067d2,_0xa8b708));}else this[_0x147926(0x30c)](_0x3c6701,_0xd3be49);},Window_ClassCommand[_0x15b20a(0x24e)][_0x15b20a(0x17a)]=function(_0x201d9e,_0x3682f7){const _0x24a160=_0x15b20a,_0xfbca66=this[_0x24a160(0x137)](_0x201d9e);let _0x121884=_0xfbca66['x']+this['itemPadding'](),_0x493dcb=_0xfbca66['y']+0x4,_0x3c9086=_0xfbca66[_0x24a160(0x320)]-this[_0x24a160(0x200)]()*0x2,_0x31696c=Math[_0x24a160(0x131)](this[_0x24a160(0x24f)]()*0x3,_0xfbca66[_0x24a160(0xc9)])-0x4,_0x417b4c=Math[_0x24a160(0x131)](_0x3c9086,_0x31696c);const _0x3ee1d1=_0x417b4c/_0x3682f7['width'],_0x18a368=_0x417b4c/_0x3682f7[_0x24a160(0xc9)],_0x1606b5=Math[_0x24a160(0x131)](_0x3ee1d1,_0x18a368,0x1);let _0x4e5d47=Math[_0x24a160(0x219)](_0x3682f7[_0x24a160(0x320)]*_0x1606b5),_0x5521cc=Math['round'](_0x3682f7[_0x24a160(0xc9)]*_0x1606b5);_0x121884+=Math[_0x24a160(0x219)]((_0x417b4c-_0x4e5d47)/0x2),_0x493dcb+=Math[_0x24a160(0x219)]((_0x417b4c-_0x5521cc)/0x2);const _0x5bb44e=_0x3682f7[_0x24a160(0x320)],_0x440844=_0x3682f7[_0x24a160(0xc9)];this[_0x24a160(0x2a9)][_0x24a160(0x191)][_0x24a160(0xd4)]=!![],this[_0x24a160(0x2a9)]['blt'](_0x3682f7,0x0,0x0,_0x5bb44e,_0x440844,_0x121884,_0x493dcb,_0x4e5d47,_0x5521cc),this[_0x24a160(0x2a9)][_0x24a160(0x191)][_0x24a160(0xd4)]=!![];},Window_ClassCommand[_0x15b20a(0x24e)][_0x15b20a(0x30c)]=function(_0x58a1bd,_0x2d4811){const _0x42c405=_0x15b20a;if(!_0x58a1bd)return;const _0x2f081d=_0x58a1bd[_0x42c405(0x246)];let _0x22df1b=_0x2d4811['x']+this[_0x42c405(0x200)](),_0x30cb22=_0x2d4811['y']+0x4,_0x3318cc=_0x2d4811['width']-this[_0x42c405(0x200)]()*0x2,_0x13647f=Math[_0x42c405(0x131)](this[_0x42c405(0x24f)]()*0x3,_0x2d4811[_0x42c405(0xc9)]),_0x50f7e8=Math[_0x42c405(0x131)](_0x3318cc,_0x13647f);_0x50f7e8=Math['floor'](_0x50f7e8/ImageManager[_0x42c405(0x2ae)])*ImageManager[_0x42c405(0x2ae)],_0x30cb22+=(_0x13647f-_0x50f7e8)/0x2;const _0x499881=ImageManager[_0x42c405(0x2b1)](_0x42c405(0x2fc)),_0x5a0175=ImageManager[_0x42c405(0x2ae)],_0x1a578f=ImageManager['iconHeight'],_0x28b125=_0x2f081d%0x10*_0x5a0175,_0x2b5c03=Math[_0x42c405(0xd7)](_0x2f081d/0x10)*_0x1a578f;this['contents'][_0x42c405(0x191)][_0x42c405(0xd4)]=![],this[_0x42c405(0x2a9)][_0x42c405(0x2b3)](_0x499881,_0x28b125,_0x2b5c03,_0x5a0175,_0x1a578f,_0x22df1b,_0x30cb22,_0x50f7e8,_0x50f7e8),this[_0x42c405(0x2a9)][_0x42c405(0x191)]['imageSmoothingEnabled']=!![];},Window_ClassCommand[_0x15b20a(0x24e)][_0x15b20a(0x2e0)]=function(){const _0x1080d8=_0x15b20a;return VisuMZ[_0x1080d8(0x20a)][_0x1080d8(0x228)][_0x1080d8(0x22b)][_0x1080d8(0x319)]||[];},Window_ClassCommand[_0x15b20a(0x24e)][_0x15b20a(0x29b)]=function(_0x510e51,_0x54f49d){const _0x43df96=_0x15b20a,_0x4677fd=this[_0x43df96(0x2e0)]();let _0x377941=_0x54f49d['y']+this[_0x43df96(0x24f)](),_0x443d90=0x0;const _0x3f1482=_0x54f49d['width']-this[_0x43df96(0x200)]()*0x2;for(const _0x406dad of _0x4677fd){if(_0x443d90>=0x2)return;switch(_0x406dad){case'AP':if(!Imported[_0x43df96(0xfb)])continue;let _0x8473d8=VisuMZ['SkillLearnSystem'][_0x43df96(0x228)]['AbilityPoints'];if(!_0x8473d8)continue;if(_0x8473d8['SharedResource'])continue;this[_0x43df96(0xf4)](this['_actor'],_0x510e51,_0x54f49d['x'],_0x377941,_0x3f1482,'right'),_0x377941+=this[_0x43df96(0x24f)](),_0x443d90++;break;case'CP':if(!Imported[_0x43df96(0x1f6)])continue;let _0x2c71f7=VisuMZ[_0x43df96(0x20a)]['Settings'][_0x43df96(0x1c5)];if(!_0x2c71f7)continue;if(_0x2c71f7['SharedResource'])continue;this[_0x43df96(0x239)](this[_0x43df96(0x1f4)],_0x510e51,_0x54f49d['x'],_0x377941,_0x3f1482,_0x43df96(0x284)),_0x377941+=this['lineHeight'](),_0x443d90++;break;case'JP':if(!Imported['VisuMZ_2_ClassChangeSystem'])continue;let _0x43cfec=VisuMZ[_0x43df96(0x20a)][_0x43df96(0x228)][_0x43df96(0x166)];if(!_0x43cfec)continue;if(_0x43cfec['SharedResource'])continue;this[_0x43df96(0x1b2)](this[_0x43df96(0x1f4)],_0x510e51,_0x54f49d['x'],_0x377941,_0x3f1482,_0x43df96(0x284)),_0x377941+=this[_0x43df96(0x24f)](),_0x443d90++;break;case'SP':if(!Imported['VisuMZ_2_SkillLearnSystem'])continue;let _0xa95c45=VisuMZ[_0x43df96(0x118)][_0x43df96(0x228)][_0x43df96(0x203)];if(!_0xa95c45)continue;if(_0xa95c45[_0x43df96(0x12c)])continue;this[_0x43df96(0x1b1)](this['_actor'],_0x510e51,_0x54f49d['x'],_0x377941,_0x3f1482,_0x43df96(0x284)),_0x377941+=this['lineHeight'](),_0x443d90++;break;}}};function Window_ClassTier(){const _0x4d2fc3=_0x15b20a;this[_0x4d2fc3(0x331)](...arguments);}Window_ClassTier[_0x15b20a(0x24e)]=Object[_0x15b20a(0x258)](Window_ClassCommand[_0x15b20a(0x24e)]),Window_ClassTier[_0x15b20a(0x24e)]['constructor']=Window_ClassTier,Window_ClassTier[_0x15b20a(0x24e)][_0x15b20a(0x331)]=function(_0x42f97d){Window_ClassCommand['prototype']['initialize']['call'](this,_0x42f97d);},Window_ClassTier[_0x15b20a(0x24e)][_0x15b20a(0x175)]=function(){const _0x4ce42c=_0x15b20a;return this[_0x4ce42c(0xe4)];},Window_ClassTier[_0x15b20a(0x24e)]['itemHeight']=function(){const _0x5a4858=_0x15b20a;let _0x333b75=Window_ClassCommand[_0x5a4858(0x24e)][_0x5a4858(0x213)]['call'](this);if(this[_0x5a4858(0x1f4)]){const _0x1922ec=this[_0x5a4858(0x1f4)]['totalMulticlass']()||0x1;_0x333b75=Math[_0x5a4858(0x35e)](_0x333b75,this[_0x5a4858(0x174)]/_0x1922ec);}return _0x333b75;},Window_ClassTier[_0x15b20a(0x24e)][_0x15b20a(0x323)]=function(){const _0x416a61=_0x15b20a;if(this[_0x416a61(0xdd)]){if(this['currentExt']()){const _0x535b42=VisuMZ['ClassChangeSystem'][_0x416a61(0x228)][_0x416a61(0x288)];if(!_0x535b42)return;const _0x2deb7a=_0x535b42[this[_0x416a61(0x1df)]()-0x1];if(!_0x2deb7a)return;this[_0x416a61(0xdd)]['setText'](_0x2deb7a[_0x416a61(0x1ba)]);}else this['_helpWindow'][_0x416a61(0x1f3)]('');}},Window_ClassTier['prototype'][_0x15b20a(0x199)]=function(){const _0xa5d6d5=_0x15b20a;if(!this[_0xa5d6d5(0x1f4)])return;const _0x4de448=this[_0xa5d6d5(0x1f4)][_0xa5d6d5(0x147)](),_0x13bda8=VisuMZ[_0xa5d6d5(0x20a)][_0xa5d6d5(0x228)]['Multiclass'];for(let _0x26692f=0x0;_0x26692f<_0x4de448;_0x26692f++){const _0x2ff73e=_0x13bda8[_0x26692f];if(!_0x2ff73e)continue;const _0x538fa7=_0x2ff73e[_0xa5d6d5(0x1ce)],_0x108864=_0x26692f+0x1,_0x14129c=this['isEnabled'](_0x108864);this['addCommand'](_0x538fa7,_0xa5d6d5(0x1e0),_0x14129c,_0x108864);}},Window_ClassTier[_0x15b20a(0x24e)][_0x15b20a(0x2eb)]=function(_0x1dba5a){const _0x4eeee6=_0x15b20a;if(this['_actor'][_0x4eeee6(0x370)](_0x1dba5a))return![];return _0x1dba5a>0x0;},Window_ClassTier[_0x15b20a(0x24e)][_0x15b20a(0x15b)]=function(_0x27d66b){const _0x4c6b1e=_0x15b20a;if(!this['_actor'])return;const _0x36fd67=this[_0x4c6b1e(0x137)](_0x27d66b),_0x319472=this[_0x4c6b1e(0x365)][_0x27d66b]['ext']||0x1,_0x4ff883=this['_actor']['getMulticlassAtTier'](_0x319472),_0x22ba02=_0x4ff883?_0x4ff883['id']:0x0,_0x27c42a=VisuMZ[_0x4c6b1e(0x20a)]['Settings'][_0x4c6b1e(0x288)];if(!_0x27c42a)return;const _0x49479b=_0x27c42a[_0x319472-0x1];if(!_0x49479b)return;let _0x1ecd36=_0x36fd67['x'],_0xd6a592=_0x36fd67['y'],_0x531176=_0x36fd67[_0x4c6b1e(0x320)]-this[_0x4c6b1e(0x200)]()*0x2,_0x537be2=_0x36fd67[_0x4c6b1e(0xc9)],_0x338754=Math[_0x4c6b1e(0x131)](_0x531176,_0x537be2,this[_0x4c6b1e(0x24f)]()*0x3);_0x338754=Math[_0x4c6b1e(0xd7)](_0x338754/ImageManager['iconWidth'])*ImageManager['iconWidth'],_0x1ecd36+=_0x338754+this[_0x4c6b1e(0x200)]()*0x4,this[_0x4c6b1e(0x2ed)](),this[_0x4c6b1e(0x2a5)](),this[_0x4c6b1e(0x308)](_0x36fd67),this[_0x4c6b1e(0x333)](this[_0x4c6b1e(0x2eb)](_0x319472)),this[_0x4c6b1e(0x25c)](_0x27d66b,_0x4ff883,_0x36fd67),this['changeTextColor'](ColorManager[_0x4c6b1e(0x33f)](_0x49479b[_0x4c6b1e(0x30a)])),this['drawText'](_0x49479b[_0x4c6b1e(0x1ce)],_0x36fd67['x'],_0x36fd67['y'],_0x36fd67[_0x4c6b1e(0x320)],'center'),this[_0x4c6b1e(0x2a5)]();if(!_0x4ff883){this[_0x4c6b1e(0x333)](![]);const _0x2981f7=Math[_0x4c6b1e(0x219)](_0x36fd67['y']+this[_0x4c6b1e(0x24f)]()+(_0x36fd67['height']-this[_0x4c6b1e(0x24f)]()*0x2)/0x2);this[_0x4c6b1e(0x2ea)](TextManager['classChange_multiclass_noClass'],_0x36fd67['x'],_0x2981f7,_0x36fd67[_0x4c6b1e(0x320)],_0x4c6b1e(0x2bf));return;}_0xd6a592+=this[_0x4c6b1e(0x24f)](),this[_0x4c6b1e(0x2ea)](_0x4ff883[_0x4c6b1e(0x31c)],_0x1ecd36,_0xd6a592,_0x36fd67['width']-_0x1ecd36),_0xd6a592+=this[_0x4c6b1e(0x24f)](),this['drawClassLevel'](this[_0x4c6b1e(0x1f4)],_0x22ba02,_0x1ecd36,_0xd6a592-0x4),_0xd6a592+=this['lineHeight'](),this[_0x4c6b1e(0x29b)](_0x22ba02,_0x36fd67),this[_0x4c6b1e(0xc6)](_0x22ba02,_0x319472,_0x49479b,_0x36fd67);},Window_ClassTier[_0x15b20a(0x24e)]['drawExtraContents']=function(){const _0x359008=_0x15b20a,_0x487182=VisuMZ[_0x359008(0x20a)][_0x359008(0x228)]['Window'][_0x359008(0x178)];if(_0x487182){_0x487182[_0x359008(0x150)](this,arguments);return;}const _0x147e76=arguments[0x0],_0xa6570e=arguments[0x1],_0x49a0c6=arguments[0x2],_0x4f7475=arguments[0x3],_0x5047bb=$dataClasses[_0x147e76],_0x41a5a5=Imported[_0x359008(0x11c)],_0x5b525a=!![],_0x593527=0x16;let _0x24f531=_0x4f7475['x']+this['itemPadding']()*0x4,_0xd9b956=_0x4f7475['y']+this['lineHeight']()*3.25,_0x1b66e6=_0x4f7475[_0x359008(0x320)]-this[_0x359008(0x200)]()*0x8;if(_0x49a0c6[_0x359008(0x160)]&&_0xd9b956+this['lineHeight']()<=_0x4f7475['y']+_0x4f7475[_0x359008(0xc9)]){let _0x5f0f64=_0x5047bb[_0x359008(0x14e)][_0x359008(0x315)](_0x283208=>_0x283208[_0x359008(0xcc)]===Game_BattlerBase[_0x359008(0xdb)])[_0x359008(0x33c)](_0x42b349=>$dataSystem[_0x359008(0x2c2)][_0x42b349[_0x359008(0x116)]])['join'](',\x20'),_0x3dc006=_0x359008(0x1d1)[_0x359008(0x36a)](TextManager[_0x359008(0x2fd)],_0x5f0f64,_0x593527||0x16);if(_0x5b525a)_0x3dc006=_0x3dc006[_0x359008(0x194)](/\\I\[(\d+)\]/gi,'');if(_0x41a5a5)_0x3dc006=_0x359008(0xf6)+_0x3dc006;this[_0x359008(0x269)](_0x3dc006,_0x24f531,_0xd9b956,_0x1b66e6),_0xd9b956+=this[_0x359008(0x24f)]();}if(_0x49a0c6['EquipWeapons']&&_0xd9b956+this[_0x359008(0x24f)]()<=_0x4f7475['y']+_0x4f7475['height']){let _0x1a2e65=_0x5047bb['traits'][_0x359008(0x315)](_0x1def74=>_0x1def74['code']===Game_BattlerBase[_0x359008(0x2a4)])[_0x359008(0x33c)](_0x365e49=>$dataSystem[_0x359008(0xde)][_0x365e49[_0x359008(0x116)]])[_0x359008(0x25a)](',\x20'),_0x4fce30=_0x359008(0x1d1)['format'](TextManager[_0x359008(0x2cd)],_0x1a2e65,_0x593527||0x16);if(_0x5b525a)_0x4fce30=_0x4fce30[_0x359008(0x194)](/\\I\[(\d+)\]/gi,'');if(_0x41a5a5)_0x4fce30='<WordWrap>'+_0x4fce30;this[_0x359008(0x269)](_0x4fce30,_0x24f531,_0xd9b956,_0x1b66e6),_0xd9b956+=this['lineHeight']();}if(_0x49a0c6[_0x359008(0x2d3)]&&_0xd9b956+this[_0x359008(0x24f)]()<=_0x4f7475['y']+_0x4f7475[_0x359008(0xc9)]){let _0x29e122=_0x5047bb[_0x359008(0x14e)][_0x359008(0x315)](_0x62f791=>_0x62f791[_0x359008(0xcc)]===Game_BattlerBase[_0x359008(0x37a)])[_0x359008(0x33c)](_0x1cb668=>$dataSystem[_0x359008(0x139)][_0x1cb668[_0x359008(0x116)]])[_0x359008(0x25a)](',\x20'),_0x23f862='\x5cC[16]%1:\x5cC[0]\x20\x5cFS[%3]%2'[_0x359008(0x36a)](TextManager[_0x359008(0x262)],_0x29e122,_0x593527||0x16);if(_0x5b525a)_0x23f862=_0x23f862[_0x359008(0x194)](/\\I\[(\d+)\]/gi,'');if(_0x41a5a5)_0x23f862=_0x359008(0xf6)+_0x23f862;this[_0x359008(0x269)](_0x23f862,_0x24f531,_0xd9b956,_0x1b66e6),_0xd9b956+=this[_0x359008(0x24f)]();}},Window_ClassTier[_0x15b20a(0x24e)]['processCursorMove']=function(){const _0x118e87=_0x15b20a;Window_ClassCommand['prototype'][_0x118e87(0x10b)][_0x118e87(0x206)](this),this[_0x118e87(0x105)]();},Window_ClassTier['prototype'][_0x15b20a(0x105)]=function(){const _0x4fe41f=_0x15b20a;if(!this[_0x4fe41f(0x1e7)]())return;if(!this[_0x4fe41f(0x1f4)])return;Input[_0x4fe41f(0x1dc)](_0x4fe41f(0x338))&&(this[_0x4fe41f(0x1f4)]&&(this['canShiftRemoveClass'](this[_0x4fe41f(0x2c1)]())?(this[_0x4fe41f(0x2db)](),this[_0x4fe41f(0x323)]()):this[_0x4fe41f(0x117)]()));},Window_ClassTier[_0x15b20a(0x24e)][_0x15b20a(0x1e7)]=function(){const _0x8daf07=_0x15b20a;if(!this[_0x8daf07(0x18e)])return![];if(!VisuMZ[_0x8daf07(0x20a)]['Settings']['Window'][_0x8daf07(0x252)])return![];return!![];},Window_ClassTier[_0x15b20a(0x24e)][_0x15b20a(0x211)]=function(_0x21537a){const _0x3ea542=_0x15b20a;if(!this['_actor'])return;const _0xd92e37=this[_0x3ea542(0x2c1)]()+0x1;if(_0xd92e37<=0x1)return![];if(this[_0x3ea542(0x1f4)]['isClassChangeTierRestricted'](_0xd92e37))return![];if(!this['_actor']['getMulticlassAtTier'](_0xd92e37))return![];return!![];;},Window_ClassTier[_0x15b20a(0x24e)][_0x15b20a(0x2db)]=function(){const _0x50f910=_0x15b20a;SoundManager[_0x50f910(0x159)](),this[_0x50f910(0x1f4)]['changeMulticlass'](0x0,this[_0x50f910(0x2c1)]()+0x1),this[_0x50f910(0xd2)](),SceneManager['_scene'][_0x50f910(0x327)]['refresh']();};function Window_ClassList(){const _0x273888=_0x15b20a;this[_0x273888(0x331)](...arguments);}Window_ClassList['prototype']=Object[_0x15b20a(0x258)](Window_ClassCommand['prototype']),Window_ClassList[_0x15b20a(0x24e)][_0x15b20a(0x153)]=Window_ClassList,Window_ClassList[_0x15b20a(0x24e)]['initialize']=function(_0x518c99){const _0x45e9c7=_0x15b20a;this[_0x45e9c7(0x1b5)]=0x1,Window_ClassCommand[_0x45e9c7(0x24e)]['initialize'][_0x45e9c7(0x206)](this,_0x518c99);},Window_ClassList['prototype'][_0x15b20a(0x145)]=function(){const _0x881807=_0x15b20a;SoundManager[_0x881807(0x159)]();},Window_ClassList[_0x15b20a(0x24e)][_0x15b20a(0x1c1)]=function(_0x58a81a){const _0x5b2b85=_0x15b20a;this['_statusWindow']=_0x58a81a,this[_0x5b2b85(0x234)]();},Window_ClassList[_0x15b20a(0x24e)][_0x15b20a(0x323)]=function(){const _0x5371a5=_0x15b20a;this[_0x5371a5(0xdd)]&&(this[_0x5371a5(0x1df)]()?this[_0x5371a5(0xdd)][_0x5371a5(0x276)](this[_0x5371a5(0x1df)]()):this[_0x5371a5(0xdd)][_0x5371a5(0x1f3)](TextManager[_0x5371a5(0xce)])),this['_actor']&&this[_0x5371a5(0x327)]&&this[_0x5371a5(0x23e)]();},Window_ClassList[_0x15b20a(0x24e)][_0x15b20a(0x23e)]=function(){const _0xd1f199=_0x15b20a,_0x4349e5=this[_0xd1f199(0x1df)](),_0x940008=JsonEx['makeDeepCopy'](this[_0xd1f199(0x1f4)]);_0x940008[_0xd1f199(0x322)]=!![],_0x4349e5!==this[_0xd1f199(0x1f4)][_0xd1f199(0x1db)]()&&(_0x4349e5?_0x940008['changeMulticlass'](_0x4349e5['id'],this[_0xd1f199(0x1b5)]):_0x940008[_0xd1f199(0x13b)](0x0,this[_0xd1f199(0x1b5)])),this['_statusWindow'][_0xd1f199(0x301)](_0x940008);},Window_ClassList['prototype'][_0x15b20a(0x1da)]=function(_0x18f706){const _0x291571=_0x15b20a;this[_0x291571(0x1b5)]!==_0x18f706&&(this[_0x291571(0x1b5)]=_0x18f706,this[_0x291571(0xd2)]());},Window_ClassList[_0x15b20a(0x24e)][_0x15b20a(0x199)]=function(){const _0x57d5f8=_0x15b20a;if(!this[_0x57d5f8(0x1f4)])return;if(this['_tier']<=0x0)return;const _0x730dc3=DataManager[_0x57d5f8(0x328)](this[_0x57d5f8(0x1f4)]);for(const _0x305cf9 of _0x730dc3){if(!_0x305cf9)continue;const _0x5a418e=_0x305cf9['name'],_0x3ffd91=this['isEnabled'](_0x305cf9);this[_0x57d5f8(0x2ac)](_0x5a418e,'classChange',_0x3ffd91,_0x305cf9);}this[_0x57d5f8(0x1b5)]>0x1&&this[_0x57d5f8(0x2ac)]('',_0x57d5f8(0x1e9),!![],null);},Window_ClassList['prototype'][_0x15b20a(0x2eb)]=function(_0x247ec6){const _0x45f663=_0x15b20a;if(this[_0x45f663(0x1f4)]['isClassChangeTierRestricted'](this['_tier']))return![];if(this['_tier']>0x1&&_0x247ec6===this[_0x45f663(0x1f4)][_0x45f663(0x1db)]())return![];if(_0x247ec6){const _0x3a9440=this['_actor'][_0x45f663(0x2af)](_0x247ec6['id']);if(_0x3a9440>0x0&&this[_0x45f663(0x1f4)][_0x45f663(0x370)](_0x3a9440))return![];const _0x32d658=DataManager['getClassChangeTiersOnly'](_0x247ec6);if(!_0x32d658[_0x45f663(0x161)](this['_tier']))return![];}return this[_0x45f663(0x1b5)]>0x0;},Window_ClassList[_0x15b20a(0x24e)][_0x15b20a(0x15b)]=function(_0x677693){const _0xe51d31=_0x15b20a;if(!this[_0xe51d31(0x1f4)])return;const _0x595c50=this[_0xe51d31(0x137)](_0x677693),_0x52153d=this[_0xe51d31(0x1b5)],_0x2ca7fe=this[_0xe51d31(0x365)][_0x677693][_0xe51d31(0x2f8)],_0x5ec10c=_0x2ca7fe?_0x2ca7fe['id']:0x0,_0x3f86b6=VisuMZ[_0xe51d31(0x20a)][_0xe51d31(0x228)][_0xe51d31(0x288)];if(!_0x3f86b6)return;const _0x17c041=_0x3f86b6[_0x52153d-0x1];if(!_0x17c041)return;let _0xee8155=_0x595c50['x'],_0x381054=_0x595c50['y'],_0x17d318=_0x595c50[_0xe51d31(0x320)]-this[_0xe51d31(0x200)]()*0x2,_0xd0ac31=_0x595c50['height'],_0x128926=Math[_0xe51d31(0x131)](_0x17d318,_0xd0ac31,this[_0xe51d31(0x24f)]()*0x3);_0x128926=Math['floor'](_0x128926/ImageManager[_0xe51d31(0x2ae)])*ImageManager['iconWidth'],_0xee8155+=_0x128926+this[_0xe51d31(0x200)]()*0x4,this[_0xe51d31(0x2ed)](),this['resetTextColor'](),this[_0xe51d31(0x308)](_0x595c50),this['changePaintOpacity'](this[_0xe51d31(0x2eb)](_0x2ca7fe));if(!_0x2ca7fe){this[_0xe51d31(0x333)](![]);const _0x5ef662=Math['round'](_0x595c50['y']+this[_0xe51d31(0x24f)]()+(_0x595c50[_0xe51d31(0xc9)]-this[_0xe51d31(0x24f)]()*0x2)/0x2);this[_0xe51d31(0x2ea)](TextManager['classChange_multiclass_remove'],_0x595c50['x'],_0x5ef662,_0x595c50[_0xe51d31(0x320)],_0xe51d31(0x2bf));return;}this[_0xe51d31(0x25c)](_0x677693,_0x2ca7fe,_0x595c50);const _0x1c98fe=this['_actor'][_0xe51d31(0x2af)](_0x5ec10c);if(_0x1c98fe>0x0){const _0x222ea4=_0x3f86b6[_0x1c98fe-0x1];_0x222ea4&&(this[_0xe51d31(0x27f)](ColorManager[_0xe51d31(0x33f)](_0x222ea4[_0xe51d31(0x30a)])),this[_0xe51d31(0x2ea)](_0x222ea4[_0xe51d31(0x1ce)],_0x595c50['x'],_0x595c50['y'],_0x595c50[_0xe51d31(0x320)],_0xe51d31(0x2bf)),this[_0xe51d31(0x2a5)]());}this['changePaintOpacity'](this[_0xe51d31(0x2eb)](_0x2ca7fe)),_0x381054+=this[_0xe51d31(0x24f)](),this[_0xe51d31(0x2ea)](_0x2ca7fe[_0xe51d31(0x31c)],_0xee8155,_0x381054,_0x595c50[_0xe51d31(0x320)]-_0xee8155),_0x381054+=this[_0xe51d31(0x24f)](),this['drawClassLevel'](this[_0xe51d31(0x1f4)],_0x5ec10c,_0xee8155,_0x381054-0x4),_0x381054+=this[_0xe51d31(0x24f)](),this[_0xe51d31(0x29b)](_0x5ec10c,_0x595c50);};