//=============================================================================
// VisuStella MZ - Anti-Damage Barriers
// VisuMZ_3_AntiDmgBarriers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_AntiDmgBarriers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AntiDmgBarriers = VisuMZ.AntiDmgBarriers || {};
VisuMZ.AntiDmgBarriers.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.03] [AntiDmgBarriers]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Anti-Damage_Barriers_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @base VisuMZ_1_ElementStatusCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_ElementStatusCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MZ does not have many options for damage mitigation. There are
 * only raw defensive parameters, elemental rates, and direct damage modifiers.
 * This plugin introduces six categories of Anti-Damage Barriers made in the
 * form of states to allow you to create more ways for the player's party to
 * defend themselves with.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Cancellation Barriers that can block out damage entirely if the damage is
 *   above or below a certain threshold.
 * * Nullification Barriers that block out damage entirely, but have a limited
 *   amount of times they can block damage for.
 * * Reduction Barriers that can stack additively with one another to provide
 *   percentile reduction values.
 * * Absorption Barriers which contain an exact number of points of damage that
 *   they can soak up.
 * * MP Barriers that disperses a percentage of the damage towards a battler's
 *   MP pool as long as they have enough MP.
 * * TP Barriers that function similarly to MP Barriers except they disperse
 *   the damage dealt instead to the TP pool.
 * * The ability to set barriers to block specific types of damage ranging from
 *   all, certain hits, physical hits, magical hits, and even elemental hits.
 * * Skill and trait effects that can bypass barriers.
 * * Make certain barrier types fragile and will break upon receiving specific
 *   types of damage (elemental, physical, magical, etc).
 * * Nullification and Absorption Barriers can regenerate themselves and/or
 *   decay over time.
 * * Playing specific animations whenever barriers tank a hit or break.
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
 * * VisuMZ_1_SkillsStatesCore
 * * VisuMZ_1_ElementStatusCore
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
 * How Barriers Work
 * ============================================================================
 *
 * When an action successfully hits an actor, damage is calculated. Barriers do
 * not block damage that comes directly from event commands, plugin commands,
 * script calls, percentile HP action effects, or damage over time states.
 * 
 * Instead, they must come directly from a damage formula source. Before that
 * damage is applied to a battler, the following series of events happen:
 *
 * ---
 * 
 * === HP Damage Check ===
 * 
 * Check to see if the action is dealing HP damage. This does not apply for MP
 * or TP damage. If no HP damage is being dealt, ignore the rest.
 * 
 * ---
 * 
 * === State Breakers ===
 * 
 * Some states can have the unique trait of dispersing upon receiving specific
 * kinds of damage using the notetags from this plugin. These range from
 * breaking under any kind of damage, certain hit damage, physical damage,
 * magical magical, and elemental damage. If the damage to be dealt is
 * affiliated with any of the listed and the state is vulnerable to that kind
 * of damage, immediately destroy the state before the damage calculations are
 * made. This will affect any of the states remaining.
 * 
 * ---
 * 
 * === Barrier Ignore ===
 * 
 * Check if the action itself (skill or item), if the attacking battler, or if
 * the defending battler has any notetags that would cause them to ignore any
 * barrier effects. If there are, ignore the rest.
 * 
 * ---
 * 
 * === Cancellation Barriers ===
 * 
 * Check for any Cancellation Barriers. Cancellation Barriers come in two
 * different types: Over and Under. The value listed for a Cancel Over Barrier
 * will cancel damage equal to or over a specific amount. The reverse is true
 * for a Cancel Under Barrier as it will cancel damage equal to or under a
 * specific amount. If damage is blocked here, it is blocked entirely and the
 * rest of the steps do not need any calculations made.
 * 
 * ---
 * 
 * === Nullification Barriers ===
 * 
 * Next, check for any Nullification Barriers. These Barriers have a charge to
 * them displayed separate from their turn count. Any matching damage dealt
 * while a Nullification Barrier is active will be reduced entirely to 0 at the
 * cost of one of the Nullification Barrier's charges. If the Nullification
 * Barrier's charges reach 0, that state is automatically removed. If damage
 * is blocked here, it is blocked entirely and the rest of the steps do not 
 * need any calculations made.
 * 
 * If a battler has multiple Nullification Barriers, then charges will be
 * removed from Nullification Barriers with the least amount of turns remaining
 * to the ones with the most amount of turns remaining (or indefinite). If two
 * Nullification Barriers have an equal amount of turns remaining, then the
 * charge will be deducted from the one with the higher priority. If both
 * priorities are the same, then the charge will be deducted will be the one
 * with a lower database ID.
 * 
 * Renewing a Nullification Barrier's state will recalculate its charge count.
 * 
 * ---
 * 
 * === Battle Core's Pre-Damage Step ===
 * 
 * Here, the Battle Core's Pre-Damage Step takes effect. This means any of the
 * <JS Pre-Damage> and related notetags will take effect and any damage
 * modifications made from them will be carried forward.
 * 
 * ---
 * 
 * === Reduction Barriers ===
 * 
 * After applying the Battle Core's Pre-Damage Step, the Reduction Barriers
 * will have their turn. Reduction Barriers can stack with each other and they
 * stack additively. This means if you have a Reduction Barrier state worth
 * 10% and another one that is worth 20% on the same battler, then a total of
 * 30% damage will be reduced. If damage reaches zero, skip the remaining
 * Barrier calculations.
 * 
 * ---
 * 
 * === Absorption Barriers ===
 * 
 * Absorption Barrier states have a set value that they can absorb. This value
 * can be a static number or it can be calculated by a formula. The barrier
 * value an Absorption Barrier has will trade damage 1 for 1. Once the
 * Absorption Barrier reaches 0, it will automatically remove itself. If damage
 * reaches zero, skip the remaining Barrier calculations.
 * 
 * If there is 500 incoming damage and an Absorption Barrier of 100 is present,
 * then 400 damage will go through and the Absorption Barrier is reduced to 0,
 * thus removing itself.
 * 
 * If there is 100 incoming damage and an Absorption Barrier of 500 is present,
 * then 0 damage will go through and the Absorption Barrier is reduced to 400.
 * The Absorption Barrier will remain.
 * 
 * If a battler has multiple Absorption Barriers, then barriers will be removed
 * from Absorption Barriers with the least amount of turns remaining to the
 * ones with the most amount of turns remaining (or indefinite). If two
 * Absorption Barriers have an equal amount of turns remaining, then the
 * barriers deducted from the one with the higher priority. If both priorities
 * are the same, then the barrier deducted from will be the one with a lower
 * database ID.
 * 
 * Renewing an Absorption Barrier's state will recalculate its barrier count.
 * 
 * ---
 * 
 * === MP-Dispersion Barriers ===
 * 
 * If any MP-Dispersion Barriers are present, then it's time for them to take
 * effect. MP Barriers can block a percentage of the damage using MP, trading
 * off 1 for 1. If an MP Barrier has a value of 20%, then 20% of the damage
 * will be redirected to MP (or less if there's insufficient MP). If a battler
 * runs out of MP after this step, the MP-Dispersion Barrier will automatically
 * remove itself. If damage reaches zero, skip the remaining Barrier
 * calculations.
 * 
 * ---
 * 
 * === TP-Dispersion Barriers ===
 * 
 * If any TP-Dispersion Barriers are present, then it's time for them to take
 * effect. TP Barriers can block a percentage of the damage using TP, trading
 * off 1 for 1. If a TP Barrier has a value of 20%, then 20% of the damage
 * will be redirected to TP (or less if there's insufficient TP). If a battler
 * runs out of TP after this step, the TP-Dispersion Barrier will automatically
 * remove itself.
 * 
 * Some battlers might gain TP upon being hit. This gained TP does not apply
 * to the TP-Dispersion Barrier as it is generated after being hit.
 * 
 * ---
 * 
 * === Final Damage ===
 * 
 * After a long, long journey, any remaining damage will be dealt to the target
 * battler (unless there's other plugins affecting damage further).
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
 * === Cancellation Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Barrier Cancel Damage Over: x>
 * <hitType Barrier Cancel Damage Over: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into a Cancellation Barrier that blocks all damage equal
 *   to or over a specific amount determined by a formula.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the damage threshold that
 *   will be blocked by this barrier type.
 * - Replace 'formula' with a calculation that determines how much damage will
 *   be the barrier's threshold.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All Barrier Cancel Damage Over: 1000>
 *   <Physical Barrier Cancel Damage Over: 500>
 *   <Magical Barrier Cancel Damage Over: user.def + target.mdf>
 *   <Element Fire Cancel Damage Over: Math.randomInt(300)>
 *   <Element Wind, Ice Barrier Cancel Damage Over: $gameVariables.value(42)>
 *
 * ---
 *
 * <hitType Barrier Cancel Damage Under: x>
 * <hitType Barrier Cancel Damage Under: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into a Cancellation Barrier that blocks all damage equal
 *   to or under a specific amount determined by a formula.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the damage threshold that
 *   will be blocked by this barrier type.
 * - Replace 'formula' with a calculation that determines how much damage will
 *   be the barrier's threshold.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All Barrier Cancel Damage Under: 100>
 *   <Physical Barrier Cancel Damage Under: 200>
 *   <Magical Barrier Cancel Damage Under: user.def + target.mdf>
 *   <Element Fire Barrier Cancel Damage Under: Math.randomInt(500)>
 *   <Element Wind, Ice Barrier Cancel Damage Under: $gameVariables.value(42)>
 *
 * ---
 * 
 * === Nullification Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Nullify Barrier: x>
 * <hitType Nullify Barrier: formula>
 *
 * - Used for: State Notetags
 * - Nullification Barriers block all damage at the cost of one charge.
 * - If a Nullification Barrier runs out of charges, it will automatically
 *   remove itself from the battler.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the number of charges the
 *   Nullification Barrier will have.
 * - Replace 'formula' with a calculation that determines how much damage will
 *   be the barrier's charges.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * - Note! This effect is incompatible with the Absorption Barrier effect and
 *   both cannot be placed on the same state. They can, however, be placed on
 *   two separate states.
 * 
 *   Examples:
 * 
 *   <All Nullify Barrier: 3>
 *   <Physical Nullify Barrier: 5>
 *   <Magical Nullify Barrier: user.level + target.level>
 *   <Element Fire Nullify Barrier: Math.randomInt(10)>
 *   <Element Wind, Ice Nullify Barrier: $gameVariables.value(42)>
 *
 * ---
 *
 * <Nullify Barrier Degen: x>
 * <Nullify Barrier Degen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the charges for the Nullification Barrier to decay by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to decay by.
 * - Replace 'formula' with a calculation that determines how many charges it
 *   will decay by.
 *   - 'target' will be the battler the Nullification Barrier is on.
 * 
 *   Examples:
 *
 *   <Nullify Barrier Degen: 1>
 *   <Nullify Barrier Degen: Math.randomInt(3)>
 *
 * ---
 *
 * <Nullify Barrier Regen: x>
 * <Nullify Barrier Regen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the charges for the Nullification Barrier to raise by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to regen by.
 * - Replace 'formula' with a calculation that determines how many charges it
 *   will regen by.
 *   - 'target' will be the battler the Nullification Barrier is on.
 * 
 *   Examples:
 *
 *   <Nullify Barrier Regen: 1>
 *   <Nullify Barrier Regen: Math.randomInt(3)>
 *
 * ---
 * 
 * === Reduction Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Reduce Barrier: x%>
 * <hitType Reduce Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns the state into a Reduction Barrier. Reduction Barriers reduce
 *   incoming damage by a percentile.
 * - If a battler has multiple Reduction Barriers, they stack additively.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a percentile number indicating the amount of damage it
 *   will reduce by.
 * - Replace 'formula' with a calculation that determines the percentage of
 *   damage that will be reduced by.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All Reduce Barrier: 20%>
 *   <Physical Reduce Barrier: 40%>
 *   <Magical Reduce Barrier: user.hpRate()>
 *   <Element Fire Reduce Barrier: Math.random() * 0.50>
 *   <Element Wind, Ice Reduce Barrier: $gameVariables.value(42) * 0.01>
 *
 * ---
 * 
 * === Absorption Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Absorb Barrier: x>
 * <hitType Absorb Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns the state into an Absorption Barrier which contains a visible
 *   barrier that will block damage 1 for 1.
 * - If the Absorption Barrier's value is reduced to 0, it will automatically
 *   remove itself.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the barrier value the
 *   Absorption Barrier state has upon being applied.
 * - Replace 'formula' with a calculation that determines what barrier value
 *   Absorption Barrier state has upon being applied.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * - Note! This effect is incompatible with the Nullification Barrier effect
 *   and both cannot be placed on the same state. They can, however, be placed
 *   on two separate states.
 * 
 *   Examples:
 * 
 *   <All Absorb Barrier: 300>
 *   <Physical Absorb Barrier: 500>
 *   <Magical Absorb Barrier: user.def + target.mdf>
 *   <Element Fire Absorb Barrier: Math.randomInt(1000)>
 *   <Element Wind, Ice Absorb Barrier: $gameVariables.value(42)>
 *
 * ---
 *
 * <Absorb Barrier Degen: x>
 * <Absorb Barrier Degen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the barrier for the Absorption Barrier to decay by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to decay by.
 * - Replace 'formula' with a calculation that determines how much barrier it
 *   will decay by.
 *   - 'target' will be the battler the Absorption Barrier is on.
 * 
 *   Examples:
 *
 *   <Absorb Barrier Degen: 1>
 *   <Absorb Barrier Degen: Math.randomInt(3)>
 *
 * ---
 *
 * <Absorb Barrier Regen: x>
 * <Absorb Barrier Regen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the barrier for the Absorption Barrier to regen by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to regen by.
 * - Replace 'formula' with a calculation that determines how much barrier it
 *   will regen by.
 *   - 'target' will be the battler the Absorption Barrier is on.
 * 
 *   Examples:
 *
 *   <Absorb Barrier Regen: 1>
 *   <Absorb Barrier Regen: Math.randomInt(3)>
 *
 * ---
 * 
 * === MP Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType MP Barrier: x%>
 * <hitType MP Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into an MP-Dispersion Barrier state where a portion of
 *   the incoming damage can be dispersed into the affected battler's MP pool.
 * - Damage will be dispersed 1 for 1 with MP. If there is insufficient MP,
 *   the damage dispersion percentile will be reduced to account for MP.
 * - If MP reaches 0, the state will automatically remove itself.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a percentile number indicating the amount of damage that
 *   is dispersed into the battler's MP pool.
 * - Replace 'formula' with a calculation that determines the percentage of
 *   damage that will be dispersed into the MP pool.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All MP Barrier: 20%>
 *   <Physical MP Barrier: 40%>
 *   <Magical MP Barrier: user.hpRate()>
 *   <Element Fire MP Barrier: Math.random() * 0.50>
 *   <Element Wind, Ice MP Barrier: $gameVariables.value(42) * 0.01>
 *
 * ---
 * 
 * === TP Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType TP Barrier: x%>
 * <hitType TP Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into a TP-Dispersion Barrier state where a portion of
 *   the incoming damage can be dispersed into the affected battler's TP pool.
 * - Damage will be dispersed 1 for 1 with TP. If there is insufficient TP,
 *   the damage dispersion percentile will be reduced to account for TP.
 * - If TP reaches 0, the state will automatically remove itself.
 * - TP can be generated upon being hit. This gained TP does not apply to the
 *   TP-Dispersion Barrier as it is generated after being hit.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a percentile number indicating the amount of damage that
 *   is dispersed into the battler's TP pool.
 * - Replace 'formula' with a calculation that determines the percentage of
 *   damage that will be dispersed into the TP pool.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All TP Barrier: 20%>
 *   <Physical TP Barrier: 40%>
 *   <Magical TP Barrier: user.hpRate()>
 *   <Element Fire TP Barrier: Math.random() * 0.50>
 *   <Element Wind, Ice TP Barrier: $gameVariables.value(42) * 0.01>
 *
 * ---
 * 
 * === Barrier Bypass-Related Notetags ===
 * 
 * ---
 *
 * <Ignore Barriers>
 *
 * - Used for: Skill, Item Notetags
 * - Causes this skill or item to completely ignore any barriers on the target.
 *
 * ---
 *
 * <Ignore Barriers as User>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If an attacker with this notetag on any of its trait objects attacks a
 *   target with barriers, ignore the target's barriers.
 *
 * ---
 *
 * <Ignore Barriers as Target>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a target battler has this notetag on any of its trait objects receives
 *   an attack, any barriers on the target battler will be ignored.
 *
 * ---
 * 
 * === Break State-Related Notetags ===
 * 
 * ---
 *
 * <hitType Breaks State>
 *
 * - Used for: State Notetags
 * - If an attack hits a battler with this state and state's notetag, as long
 *   as the damage type matches, automatically remove the state.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - This can be used for states that aren't barriers.
 * - This occurs before most of the pre-damage phase.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Absorption Barriers
 * ============================================================================
 *
 * Settings for the Absorption Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text popup stating how much barrier was lost.
 *   - %1 - Barrier
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Cancellation Barriers
 * ============================================================================
 *
 * Settings for the Cancellation Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: MP-Dispersion Barriers
 * ============================================================================
 *
 * Settings for the MP-Dispersion Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Nullification Barriers
 * ============================================================================
 *
 * Settings for the Nullificaton Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Reduction Barriers
 * ============================================================================
 *
 * Settings for the Reduction Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: TP-Dispersion Barriers
 * ============================================================================
 *
 * Settings for the TP-Dispersion Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text popup stating how much TP was lost.
 *   - %1 - TP Lost, %2 - TP Text
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
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
 * Version 1.03: March 12, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Absorption Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > Absorption Settings > Break > Enemy Flip?
 * *** Plugin Parameters > Cancellation Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > Cancellation Settings > Break > Enemy Flip?
 * *** Plugin Parameters > MP-Dispersion Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > MP-Dispersion Settings > Break > Enemy Flip?
 * *** Plugin Parameters > Nullification Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > Nullification Settings > Break > Enemy Flip?
 * *** Plugin Parameters > Reduction Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > Reduction Settings > Break > Enemy Flip?
 * *** Plugin Parameters > TP-Dispersion Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > TP-Dispersion Settings > Break > Enemy Flip?
 * **** Flip the animation for enemies?
 * 
 * Version 1.02: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.01: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00: November 4, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PluginCommandFunctionName
 * @text Category: Function Name
 * @desc Plugin Command Description Text
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg option:num
 * @text Option Text
 * @type number
 * @max 1
 * @desc Change the value to this number
 * @default 42069
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableAntiDmgBarriersMenu
 * @text System: Enable AntiDmgBarriers in Menu?
 * @desc Enables/disables AntiDmgBarriers menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables AntiDmgBarriers menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowAntiDmgBarriersMenu
 * @text System: Show AntiDmgBarriers in Menu?
 * @desc Shows/hides AntiDmgBarriers menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides AntiDmgBarriers menu inside the main menu.
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
 * @param AntiDmgBarriers
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Absorb:struct
 * @text Absorption Barriers
 * @type struct<Absorb>
 * @desc Settings for the Absorption Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"4","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"5","BreakMirror:eval":"false","BreakMute:eval":"false","Popups":"","PopupText:str":"-%1","TextColor:str":"27","FlashColor:eval":"[255, 0, 255, 160]","FlashDuration:num":"60"}
 *
 * @param Cancel:struct
 * @text Cancellation Barriers
 * @type struct<Cancel>
 * @desc Settings for the Cancellation Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"119","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"15","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param MP:struct
 * @text MP-Dispersion Barriers
 * @type struct<MP>
 * @desc Settings for the MP-Dispersion Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"62","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"81","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param Nullify:struct
 * @text Nullification Barriers
 * @type struct<Nullify>
 * @desc Settings for the Nullificaton Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"58","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"11","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param Reduce:struct
 * @text Reduction Barriers
 * @type struct<Reduce>
 * @desc Settings for the Reduction Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"53","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"14","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param TP:struct
 * @text TP-Dispersion Barriers
 * @type struct<TP>
 * @desc Settings for the TP-Dispersion Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"91","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"45","BreakMirror:eval":"false","BreakMute:eval":"false","Popups":"","PopupText:str":"-%1 %2","TextColor:str":"29","FlashColor:eval":"[0, 255, 0, 160]","FlashDuration:num":"60"}
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
 * Absorption Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Absorb:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 4
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 5
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text popup stating how much barrier was lost.
 * %1 - Barrier
 * @default -%1
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 255, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Cancellation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cancel:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 119
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 15
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * MP Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MP:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 62
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 61
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Nullify Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Nullify:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 58
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 11
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Reduction Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Reduce:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 53
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 14
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * TP Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TP:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 91
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 45
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text popup stating how much TP was lost.
 * %1 - TP Lost, %2 - TP Text
 * @default -%1 %2
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
//=============================================================================

const _0x4c98=['_antiDamageBarrierMp','STRUCT','status','getElementIdWithName','ARRAYSTRUCT','8339XYIqOE','isMagical','min','_antiDamageBarrierCancelUnder','applyPreAntiDamageBarriers','MAX_SAFE_INTEGER','Reduce','initAntiDamageBarriers','applyAbsorptionBarrier','CancelOver','target','split','AbsorbBarrier','priority','StateMatchesBreakEffect','log','ARRAYEVAL','isPhysical','isCertainHit','%1EnemyFlip','some','max','toUpperCase','name','version','onAntiDamageCancelBarrier','5VhZxch','Game_Battler_regenerateAll','_antiDamageBarrierCancelOver','Nullify','map','gainMp','includes','AntiDmgBarriers','ReduceBarrier','isHpEffect','4AprdZQ','VisuMZ_1_BattleCore','getAntiDamageBarrierTp','onAntiDamageBarrierEffect','call','getAntiDamageBarrierMp','user','applyNullificationBarrier','matchesAntiDamageBarrier','regenerateAntiDamageBarrierState','TpBarrier','elements','NUM','stateTurns','note','3433BsTdau','isAntiDamageBarrierIgnored','applyReductionBarrier','regenerateAntiDamageBarriers','Game_Action_applyBattleCoreJS','ARRAYNUM','replace','NullBarrier','38BWyURk','ignoreAllAntiDamageBarriers','PreDamage%1JS','isSceneBattle','FlashDuration','prototype','setStateDisplay','290640CkDhdY','applyPostAntiDamageBarriers','createJsTargets','PopupText','ARRAYSTR','FlashColor','BreakState','ARRAYJSON','MpBarrier','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','autoRemovalTiming','isStateAffected','setAntiDamageBarrierMp','displayTpBarrierPopup','applyCancelUnderBarrier','requestFauxAnimation','%1AnimationID','trim','CalculateCharges','setAntiDamageBarrierCancelOver','getStateDisplay','displayAbsorptionBarrierPopup','parse','format','item','VisuMZ_1_SkillsStatesCore','ALL','traitObjects','applyBattleCoreJS','5516JmMQdv','applyCancelOverBarrier','_antiDamageBarrierReduction','description','applyBreakStateEffects','_antiDamageBarrierTp','exit','Settings','processBreakStateEffect','getAntiDamageBarrierStates','BarrierDegen','VisuMZ_1_ElementStatusCore','Game_Battler_addState','return\x200','_subject','DAMAGE','isAntiDamageBarrierIgnoredAsTarget','push','ceil','ConvertParams','clamp','parameters','clearJsTargets','applyTpBarrier','matchesAntiDamageBarrierType','onAntiDamageNullificationBarrier','1WcSRIL','gainTp','isAlive','ARRAYFUNC','removeState','onAntiDamageReductionBarrier','TextColor','STR','FUNC','getAntiDamageBarrierCancelUnder','applyMpBarrier','onAntiDamageAbsorptionBarrier','subject','states','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','initAntiDamageBarrierDataForState','getAntiDamageBarrierCancelOver','171FCdKMs','addState','JSON','28531KzoNxh','setAntiDamageBarrierReduction','match','setAntiDamageBarrierTp','onAntiDamageMpBarrier','initMembers','%1Mirror','concat','Cancel','ANY','35fJcYwm','14521RmeLjl','CancelUnder','regenerateAll','isAntiDamageBarrierIgnoredAsSubject','136632WWNlpt','setAntiDamageBarrierCancelUnder','BarrierRegen','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','skills','onAntiDamageTpBarrier','RegExp','Absorb'];const _0x36ec=function(_0x551594,_0x58cfa7){_0x551594=_0x551594-0x18b;let _0x4c9896=_0x4c98[_0x551594];return _0x4c9896;};const _0x1d22cc=_0x36ec;(function(_0x3f2b00,_0x160cec){const _0xebb174=_0x36ec;while(!![]){try{const _0x4ecf49=parseInt(_0xebb174(0x1ad))*-parseInt(_0xebb174(0x1ac))+parseInt(_0xebb174(0x1a2))*parseInt(_0xebb174(0x1d8))+parseInt(_0xebb174(0x1b1))*parseInt(_0xebb174(0x1e2))+-parseInt(_0xebb174(0x200))+parseInt(_0xebb174(0x18e))*parseInt(_0xebb174(0x1be))+-parseInt(_0xebb174(0x21d))*parseInt(_0xebb174(0x1f9))+-parseInt(_0xebb174(0x1f1))*-parseInt(_0xebb174(0x19f));if(_0x4ecf49===_0x160cec)break;else _0x3f2b00['push'](_0x3f2b00['shift']());}catch(_0x558dc8){_0x3f2b00['push'](_0x3f2b00['shift']());}}}(_0x4c98,0x43672));var label=_0x1d22cc(0x1df),tier=tier||0x0,dependencies=['VisuMZ_0_CoreEngine',_0x1d22cc(0x1e3),_0x1d22cc(0x219),_0x1d22cc(0x228)],pluginData=$plugins['filter'](function(_0x347231){const _0x51acfb=_0x1d22cc;return _0x347231[_0x51acfb(0x1bb)]&&_0x347231[_0x51acfb(0x220)][_0x51acfb(0x1de)]('['+label+']');})[0x0];VisuMZ[label][_0x1d22cc(0x224)]=VisuMZ[label][_0x1d22cc(0x224)]||{},VisuMZ[_0x1d22cc(0x230)]=function(_0x44469e,_0x1a64b6){const _0x39cafc=_0x1d22cc;for(const _0x48d10a in _0x1a64b6){if(_0x48d10a[_0x39cafc(0x1a4)](/(.*):(.*)/i)){const _0x29c70e=String(RegExp['$1']),_0x4a89b5=String(RegExp['$2'])[_0x39cafc(0x1d4)]()[_0x39cafc(0x211)]();let _0x246f33,_0x2c0ac3,_0x6155f1;switch(_0x4a89b5){case _0x39cafc(0x1ee):_0x246f33=_0x1a64b6[_0x48d10a]!==''?Number(_0x1a64b6[_0x48d10a]):0x0;break;case _0x39cafc(0x1f6):_0x2c0ac3=_0x1a64b6[_0x48d10a]!==''?JSON['parse'](_0x1a64b6[_0x48d10a]):[],_0x246f33=_0x2c0ac3[_0x39cafc(0x1dc)](_0x505247=>Number(_0x505247));break;case'EVAL':_0x246f33=_0x1a64b6[_0x48d10a]!==''?eval(_0x1a64b6[_0x48d10a]):null;break;case _0x39cafc(0x1ce):_0x2c0ac3=_0x1a64b6[_0x48d10a]!==''?JSON[_0x39cafc(0x216)](_0x1a64b6[_0x48d10a]):[],_0x246f33=_0x2c0ac3[_0x39cafc(0x1dc)](_0x36034d=>eval(_0x36034d));break;case _0x39cafc(0x1a1):_0x246f33=_0x1a64b6[_0x48d10a]!==''?JSON[_0x39cafc(0x216)](_0x1a64b6[_0x48d10a]):'';break;case _0x39cafc(0x207):_0x2c0ac3=_0x1a64b6[_0x48d10a]!==''?JSON[_0x39cafc(0x216)](_0x1a64b6[_0x48d10a]):[],_0x246f33=_0x2c0ac3[_0x39cafc(0x1dc)](_0xaa76bf=>JSON[_0x39cafc(0x216)](_0xaa76bf));break;case _0x39cafc(0x196):_0x246f33=_0x1a64b6[_0x48d10a]!==''?new Function(JSON['parse'](_0x1a64b6[_0x48d10a])):new Function(_0x39cafc(0x22a));break;case _0x39cafc(0x191):_0x2c0ac3=_0x1a64b6[_0x48d10a]!==''?JSON[_0x39cafc(0x216)](_0x1a64b6[_0x48d10a]):[],_0x246f33=_0x2c0ac3[_0x39cafc(0x1dc)](_0x5af218=>new Function(JSON[_0x39cafc(0x216)](_0x5af218)));break;case _0x39cafc(0x195):_0x246f33=_0x1a64b6[_0x48d10a]!==''?String(_0x1a64b6[_0x48d10a]):'';break;case _0x39cafc(0x204):_0x2c0ac3=_0x1a64b6[_0x48d10a]!==''?JSON[_0x39cafc(0x216)](_0x1a64b6[_0x48d10a]):[],_0x246f33=_0x2c0ac3[_0x39cafc(0x1dc)](_0x24a856=>String(_0x24a856));break;case _0x39cafc(0x1ba):_0x6155f1=_0x1a64b6[_0x48d10a]!==''?JSON['parse'](_0x1a64b6[_0x48d10a]):{},_0x246f33=VisuMZ[_0x39cafc(0x230)]({},_0x6155f1);break;case _0x39cafc(0x1bd):_0x2c0ac3=_0x1a64b6[_0x48d10a]!==''?JSON[_0x39cafc(0x216)](_0x1a64b6[_0x48d10a]):[],_0x246f33=_0x2c0ac3[_0x39cafc(0x1dc)](_0x223ebd=>VisuMZ[_0x39cafc(0x230)]({},JSON[_0x39cafc(0x216)](_0x223ebd)));break;default:continue;}_0x44469e[_0x29c70e]=_0x246f33;}}return _0x44469e;},(_0x1efa2c=>{const _0xf07750=_0x1d22cc,_0x2ff077=_0x1efa2c[_0xf07750(0x1d5)];for(const _0x5337fe of dependencies){if(!Imported[_0x5337fe]){alert(_0xf07750(0x1b4)[_0xf07750(0x217)](_0x2ff077,_0x5337fe)),SceneManager[_0xf07750(0x223)]();break;}}const _0x111cba=_0x1efa2c[_0xf07750(0x220)];if(_0x111cba['match'](/\[Version[ ](.*?)\]/i)){const _0x3d168a=Number(RegExp['$1']);_0x3d168a!==VisuMZ[label][_0xf07750(0x1d6)]&&(alert(_0xf07750(0x19c)['format'](_0x2ff077,_0x3d168a)),SceneManager[_0xf07750(0x223)]());}if(_0x111cba[_0xf07750(0x1a4)](/\[Tier[ ](\d+)\]/i)){const _0x2bf463=Number(RegExp['$1']);_0x2bf463<tier?(alert(_0xf07750(0x209)[_0xf07750(0x217)](_0x2ff077,_0x2bf463,tier)),SceneManager[_0xf07750(0x223)]()):tier=Math[_0xf07750(0x1d3)](_0x2bf463,tier);}VisuMZ[_0xf07750(0x230)](VisuMZ[label][_0xf07750(0x224)],_0x1efa2c[_0xf07750(0x232)]);})(pluginData),VisuMZ[_0x1d22cc(0x1df)]['RegExp']={'IgnoreAllBarrier':/<IGNORE (?:ALL BARRIER|ALL BARRIERS|BARRIER|BARRIERS)>/gi,'IgnoreAllBarrierAsAttacker':/<IGNORE (?:ALL BARRIER|ALL BARRIERS|BARRIER|BARRIERS) AS (?:ATTACKER|USER)>/gi,'IgnoreAllBarrierAsDefender':/<IGNORE (?:ALL BARRIER|ALL BARRIERS|BARRIER|BARRIERS) AS (?:TARGET|DEFENDER)>/gi,'CancelOver':/<(.*)[ ]BARRIER CANCEL[ ](?:DMG OVER|DAMAGE OVER|OVER):[ ](.*)>/gi,'CancelUnder':/<(.*)[ ]BARRIER CANCEL[ ](?:DMG UNDER|DAMAGE UNDER|UNDER):[ ](.*)>/gi,'NullBarrier':/<(.*)[ ](?:NULLIFY|NULL|NULLIFICATION)[ ]BARRIER:[ ](.*)>/gi,'ReduceBarrier':/<(.*)[ ](?:CUT|REDUCE|REDUCTION)[ ]BARRIER:[ ](.*)>/gi,'AbsorbBarrier':/<(.*)[ ](?:ABSORB|ABSORPTION)[ ]BARRIER:[ ](.*)>/gi,'MpBarrier':/<(.*)[ ](?:MP|MAGIC|MANA)[ ]BARRIER:[ ](.*)>/gi,'TpBarrier':/<(.*)[ ](?:TP|TECH|LIMIT)[ ]BARRIER:[ ](.*)>/gi,'BreakState':/<(.*)[ ](?:BREAK|BREAKS)[ ]STATE>/gi,'BarrierDegen':/<(?:ABSORB|ABSORPTION|NULLIFY|NULL|NULLIFICATION)[ ]BARRIER[ ](?:DECAY|DEGEN):[ ](.*)>/gi,'BarrierRegen':/<(?:ABSORB|ABSORPTION|NULLIFY|NULL|NULLIFICATION)[ ]BARRIER[ ](?:REGENERATION|REGEN):[ ](.*)>/gi},VisuMZ[_0x1d22cc(0x1df)][_0x1d22cc(0x1f5)]=Game_Action[_0x1d22cc(0x1fe)][_0x1d22cc(0x21c)],Game_Action[_0x1d22cc(0x1fe)]['applyBattleCoreJS']=function(_0xc45561,_0x3850e3,_0x42f602,_0x4ed904){const _0x54c316=_0x1d22cc,_0x1b3d35=_0xc45561===_0x54c316(0x1fb)&&this[_0x54c316(0x1e1)]()&&_0x42f602>0x0;return _0x1b3d35&&_0x3850e3[_0x54c316(0x221)](this),_0x1b3d35&&(_0x42f602=this['applyPreAntiDamageBarriers'](_0x3850e3,_0x42f602)),_0x42f602=VisuMZ[_0x54c316(0x1df)][_0x54c316(0x1f5)][_0x54c316(0x1e6)](this,_0xc45561,_0x3850e3,_0x42f602,_0x4ed904),_0x1b3d35&&(_0x42f602=this['applyPostAntiDamageBarriers'](_0x3850e3,_0x42f602)),_0x42f602;},Game_Action[_0x1d22cc(0x1fe)][_0x1d22cc(0x1c2)]=function(_0x33632e,_0x3804e9){const _0x49a609=_0x1d22cc;if(this['isAntiDamageBarrierIgnored'](_0x33632e))return _0x3804e9;if(this['applyCancelOverBarrier'](_0x33632e,_0x3804e9))return 0x0;if(this[_0x49a609(0x20e)](_0x33632e,_0x3804e9))return 0x0;if(this[_0x49a609(0x1e9)](_0x33632e))return 0x0;return _0x3804e9;},Game_Action[_0x1d22cc(0x1fe)][_0x1d22cc(0x201)]=function(_0x5eb38b,_0x4545a1){const _0x19f016=_0x1d22cc;if(this[_0x19f016(0x1f2)](_0x5eb38b))return _0x4545a1;if(_0x4545a1<=0x0)return _0x4545a1;return _0x4545a1=this[_0x19f016(0x1f3)](_0x5eb38b,_0x4545a1),_0x4545a1=this[_0x19f016(0x1c6)](_0x5eb38b,_0x4545a1),_0x4545a1=this[_0x19f016(0x198)](_0x5eb38b,_0x4545a1),_0x4545a1=this[_0x19f016(0x18b)](_0x5eb38b,_0x4545a1),_0x4545a1;},Game_Action['prototype']['isAntiDamageBarrierIgnored']=function(_0x41f8a2){const _0x2a6bf5=_0x1d22cc;if(this[_0x2a6bf5(0x218)]()&&this['item']()[_0x2a6bf5(0x1f0)][_0x2a6bf5(0x1a4)](VisuMZ['AntiDmgBarriers'][_0x2a6bf5(0x1b7)]['IgnoreAllBarrier']))return!![];if(this['isAntiDamageBarrierIgnoredAsSubject']())return!![];if(this[_0x2a6bf5(0x22d)](_0x41f8a2))return!![];return![];},Game_Action[_0x1d22cc(0x1fe)][_0x1d22cc(0x1b0)]=function(){const _0x234fc0=_0x1d22cc,_0x439ec7=this[_0x234fc0(0x19a)]()[_0x234fc0(0x21b)](),_0x4bf5ab=VisuMZ[_0x234fc0(0x1df)][_0x234fc0(0x1b7)]['IgnoreAllBarrierAsAttacker'];return _0x439ec7[_0x234fc0(0x1d2)](_0x5a8277=>_0x5a8277&&_0x5a8277[_0x234fc0(0x1f0)]&&_0x5a8277[_0x234fc0(0x1f0)]['match'](_0x4bf5ab));},Game_Action[_0x1d22cc(0x1fe)][_0x1d22cc(0x22d)]=function(_0x2c6df1){const _0x24c92f=_0x1d22cc,_0x13e208=_0x2c6df1[_0x24c92f(0x21b)](),_0x45da99=VisuMZ['AntiDmgBarriers'][_0x24c92f(0x1b7)]['IgnoreAllBarrierAsDefender'];return _0x13e208['some'](_0x21a011=>_0x21a011&&_0x21a011[_0x24c92f(0x1f0)]&&_0x21a011[_0x24c92f(0x1f0)][_0x24c92f(0x1a4)](_0x45da99));},Game_Action[_0x1d22cc(0x1fe)][_0x1d22cc(0x1e9)]=function(_0x12023e){const _0x415c03=_0x1d22cc,_0x56b9e9=_0x12023e['getAntiDamageBarrierStates']();for(const _0xb3e82 of _0x56b9e9){if(!_0xb3e82)continue;if(this['matchesAntiDamageBarrier'](_0xb3e82,_0x415c03(0x1f8)))return _0x12023e[_0x415c03(0x18d)](_0xb3e82),!![];}return![];},Game_Action[_0x1d22cc(0x1fe)][_0x1d22cc(0x21e)]=function(_0x292de1,_0x2a0e4a){const _0x1ce17b=_0x1d22cc,_0x788c08=_0x292de1[_0x1ce17b(0x19b)]();for(const _0x446eb6 of _0x788c08){if(!_0x446eb6)continue;if(_0x2a0e4a<_0x292de1[_0x1ce17b(0x19e)](_0x446eb6['id']))continue;if(this['matchesAntiDamageBarrier'](_0x446eb6,_0x1ce17b(0x1c7)))return _0x292de1[_0x1ce17b(0x1d7)](_0x446eb6),!![];}return![];},Game_Action['prototype']['applyCancelUnderBarrier']=function(_0x1084ef,_0x435750){const _0x551191=_0x1d22cc,_0x3a37da=_0x1084ef[_0x551191(0x19b)]();for(const _0x3589d0 of _0x3a37da){if(!_0x3589d0)continue;if(_0x435750>_0x1084ef[_0x551191(0x197)](_0x3589d0['id']))continue;if(this[_0x551191(0x1ea)](_0x3589d0,'CancelUnder'))return _0x1084ef[_0x551191(0x1d7)](_0x3589d0),!![];}return![];},Game_Action['prototype'][_0x1d22cc(0x1f3)]=function(_0x4e3416,_0xe9a3dd){const _0xb2c218=_0x1d22cc;if(_0xe9a3dd<=0x0)return _0xe9a3dd;const _0x5d38b3=_0x4e3416['states']();let _0x2a7a2b=0x0;for(const _0x2bb7b1 of _0x5d38b3){if(!_0x2bb7b1)continue;this[_0xb2c218(0x1ea)](_0x2bb7b1,_0xb2c218(0x1e0))&&(_0x2a7a2b+=_0x4e3416['getAntiDamageBarrierReduction'](_0x2bb7b1['id']));}return _0x2a7a2b>0x0&&(console[_0xb2c218(0x1cd)](_0xe9a3dd,_0x2a7a2b),_0xe9a3dd*=(0x1-_0x2a7a2b)[_0xb2c218(0x231)](0x0,0x1),_0x4e3416['onAntiDamageReductionBarrier']()),_0xe9a3dd;},Game_Action[_0x1d22cc(0x1fe)]['applyAbsorptionBarrier']=function(_0x43701a,_0x2e762c){const _0x42944b=_0x1d22cc;if(_0x2e762c<=0x0)return _0x2e762c;const _0x16c09c=_0x43701a[_0x42944b(0x226)]();for(const _0x9ae5c of _0x16c09c){if(!_0x9ae5c)continue;if(this['matchesAntiDamageBarrier'](_0x9ae5c,_0x42944b(0x1ca))){let _0x533421=Number(_0x43701a[_0x42944b(0x214)](_0x9ae5c['id']))||0x0;const _0x46f730=Math[_0x42944b(0x1c0)](_0x2e762c,_0x533421);_0x2e762c-=_0x46f730,_0x533421-=_0x46f730,_0x43701a[_0x42944b(0x1ff)](_0x9ae5c['id'],_0x533421);_0x46f730>0x0&&(_0x43701a[_0x42944b(0x215)](_0x46f730,_0x9ae5c),_0x43701a[_0x42944b(0x199)](_0x9ae5c));if(_0x2e762c<=0x0)break;}}return _0x2e762c;},Game_Action[_0x1d22cc(0x1fe)][_0x1d22cc(0x198)]=function(_0x2bdec3,_0x21f2ae){const _0x57b07e=_0x1d22cc;if(_0x21f2ae<=0x0)return _0x21f2ae;const _0x511c07=_0x2bdec3[_0x57b07e(0x19b)]();let _0x56b3fc=_0x2bdec3['mp'];for(const _0x422003 of _0x511c07){if(!_0x422003)continue;if(this[_0x57b07e(0x1ea)](_0x422003,_0x57b07e(0x208))){const _0x14fa9c=_0x2bdec3[_0x57b07e(0x1e7)](_0x422003['id']),_0x149302=Math[_0x57b07e(0x1c0)](Math[_0x57b07e(0x22f)](_0x21f2ae*_0x14fa9c),_0x2bdec3['mp']);_0x21f2ae-=_0x149302,_0x2bdec3[_0x57b07e(0x1dd)](-_0x149302);_0x149302>0x0&&_0x2bdec3[_0x57b07e(0x1a6)](_0x422003);if(_0x21f2ae<=0x0)break;}}return _0x21f2ae;},Game_Action[_0x1d22cc(0x1fe)]['applyTpBarrier']=function(_0x2f2b85,_0x1386d8){const _0x120ec2=_0x1d22cc;if(_0x1386d8<=0x0)return _0x1386d8;const _0x5e01ea=_0x2f2b85[_0x120ec2(0x19b)]();let _0x532729=_0x2f2b85['mp'];for(const _0x5800f9 of _0x5e01ea){if(!_0x5800f9)continue;if(this[_0x120ec2(0x1ea)](_0x5800f9,'TpBarrier')){const _0x487b65=_0x2f2b85[_0x120ec2(0x1e4)](_0x5800f9['id']),_0x3d2f0e=Math[_0x120ec2(0x1c0)](Math[_0x120ec2(0x22f)](_0x1386d8*_0x487b65),_0x2f2b85['tp']);_0x1386d8-=_0x3d2f0e,_0x2f2b85[_0x120ec2(0x18f)](-_0x3d2f0e);_0x3d2f0e>0x0&&(_0x2f2b85[_0x120ec2(0x20d)](_0x3d2f0e),_0x2f2b85[_0x120ec2(0x1b6)](_0x5800f9));if(_0x1386d8<=0x0)break;}}return _0x1386d8;},Game_Action[_0x1d22cc(0x1fe)][_0x1d22cc(0x1ea)]=function(_0x5ccccf,_0x42e532){const _0x518d6b=_0x1d22cc,_0x226665=VisuMZ['AntiDmgBarriers'][_0x518d6b(0x1b7)][_0x42e532];if(!_0x226665)return![];const _0x4350f5=_0x5ccccf[_0x518d6b(0x1f0)][_0x518d6b(0x1a4)](_0x226665);if(_0x4350f5)for(const _0x20d37d of _0x4350f5){_0x20d37d[_0x518d6b(0x1a4)](_0x226665);const _0x4cf579=String(RegExp['$1']);if(this[_0x518d6b(0x18c)](_0x4cf579))return!![];}return![];},Game_Action[_0x1d22cc(0x1fe)][_0x1d22cc(0x18c)]=function(_0x485acd){const _0x457629=_0x1d22cc;_0x485acd=_0x485acd[_0x457629(0x1d4)]()[_0x457629(0x211)]();if([_0x457629(0x21a),_0x457629(0x1ab),_0x457629(0x22c)][_0x457629(0x1de)](_0x485acd))return!![];else{if(_0x485acd['match'](/ELEMENT/i))return this['matchesAntiDamageBarrierElementType'](_0x485acd);else{if(_0x485acd[_0x457629(0x1a4)](/CERTAIN/i))return this[_0x457629(0x1d0)]();else{if(_0x485acd[_0x457629(0x1a4)](/PHYSICAL/i))return this[_0x457629(0x1cf)]();else{if(_0x485acd[_0x457629(0x1a4)](/MAGICAL/i))return this[_0x457629(0x1bf)]();}}}}},Game_Action[_0x1d22cc(0x1fe)]['matchesAntiDamageBarrierElementType']=function(_0x1f4c60){const _0x197fa8=_0x1d22cc,_0x5185c3=this[_0x197fa8(0x1ed)]();if(_0x1f4c60['match'](/ELEMENT[ ]*(\d+(?:\s*,\s*\d+)*)/i)){const _0x3aa96e=JSON[_0x197fa8(0x216)]('['+RegExp['$1'][_0x197fa8(0x1a4)](/\d+/g)+']');return _0x5185c3['some'](_0x3aae1f=>_0x3aa96e[_0x197fa8(0x1de)](_0x3aae1f));}else{if(_0x1f4c60[_0x197fa8(0x1a4)](/ELEMENT[ ](.*)/i)){const _0x31f3c7=String(RegExp['$1'])[_0x197fa8(0x1c9)](','),_0x236b34=_0x31f3c7[_0x197fa8(0x1dc)](_0x3d4881=>DataManager[_0x197fa8(0x1bc)](_0x3d4881));return _0x5185c3['some'](_0x9d3c7d=>_0x236b34[_0x197fa8(0x1de)](_0x9d3c7d));}}return![];},VisuMZ[_0x1d22cc(0x1df)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x1d22cc(0x1fe)][_0x1d22cc(0x1a7)],Game_BattlerBase['prototype']['initMembers']=function(){const _0x52a78c=_0x1d22cc;VisuMZ[_0x52a78c(0x1df)]['Game_BattlerBase_initMembers'][_0x52a78c(0x1e6)](this),this[_0x52a78c(0x1c5)]();},Game_BattlerBase[_0x1d22cc(0x1fe)]['initAntiDamageBarriers']=function(){const _0x871cc4=_0x1d22cc;this[_0x871cc4(0x1da)]={},this[_0x871cc4(0x1c1)]={},this['_antiDamageBarrierReduction']={},this[_0x871cc4(0x1b9)]={},this[_0x871cc4(0x222)]={};},Game_BattlerBase[_0x1d22cc(0x1fe)][_0x1d22cc(0x19e)]=function(_0x4af1c9){const _0x4035d8=_0x1d22cc;if(!this[_0x4035d8(0x20b)](_0x4af1c9))return 0x0;return this[_0x4035d8(0x1da)]===undefined&&this[_0x4035d8(0x1c5)](),this[_0x4035d8(0x1da)][_0x4af1c9]||0x0;},Game_BattlerBase[_0x1d22cc(0x1fe)][_0x1d22cc(0x213)]=function(_0x1bba93,_0x5cb3d3){const _0x31bf69=_0x1d22cc;this['_antiDamageBarrierCancelOver']===undefined&&this[_0x31bf69(0x1c5)](),this[_0x31bf69(0x1da)][_0x1bba93]=_0x5cb3d3;},Game_BattlerBase['prototype'][_0x1d22cc(0x197)]=function(_0x3d64dd){const _0x4c97b4=_0x1d22cc;if(!this[_0x4c97b4(0x20b)](_0x3d64dd))return 0x0;return this[_0x4c97b4(0x1c1)]===undefined&&this[_0x4c97b4(0x1c5)](),this[_0x4c97b4(0x1c1)][_0x3d64dd]||0x0;},Game_BattlerBase[_0x1d22cc(0x1fe)][_0x1d22cc(0x1b2)]=function(_0x34d387,_0x5005eb){const _0x57ee65=_0x1d22cc;this['_antiDamageBarrierCancelUnder']===undefined&&this[_0x57ee65(0x1c5)](),this[_0x57ee65(0x1c1)][_0x34d387]=_0x5005eb;},Game_BattlerBase[_0x1d22cc(0x1fe)]['getAntiDamageBarrierReduction']=function(_0x31c1c0){const _0x3d0a54=_0x1d22cc;if(!this[_0x3d0a54(0x20b)](_0x31c1c0))return 0x0;return this[_0x3d0a54(0x21f)]===undefined&&this[_0x3d0a54(0x1c5)](),this['_antiDamageBarrierReduction'][_0x31c1c0]||0x0;},Game_BattlerBase[_0x1d22cc(0x1fe)]['setAntiDamageBarrierReduction']=function(_0x21a8af,_0x2c60ec){const _0x3b4f14=_0x1d22cc;this[_0x3b4f14(0x21f)]===undefined&&this[_0x3b4f14(0x1c5)](),this[_0x3b4f14(0x21f)][_0x21a8af]=_0x2c60ec;},Game_BattlerBase[_0x1d22cc(0x1fe)]['getAntiDamageBarrierMp']=function(_0x47b7b4){const _0x11df23=_0x1d22cc;if(!this[_0x11df23(0x20b)](_0x47b7b4))return 0x0;return this['_antiDamageBarrierMp']===undefined&&this[_0x11df23(0x1c5)](),this[_0x11df23(0x1b9)][_0x47b7b4]||0x0;},Game_BattlerBase[_0x1d22cc(0x1fe)][_0x1d22cc(0x20c)]=function(_0x3ced2b,_0x152720){const _0x56a317=_0x1d22cc;this['_antiDamageBarrierMp']===undefined&&this['initAntiDamageBarriers'](),this[_0x56a317(0x1b9)][_0x3ced2b]=_0x152720;},Game_BattlerBase[_0x1d22cc(0x1fe)]['getAntiDamageBarrierTp']=function(_0x9c847){const _0x18c305=_0x1d22cc;if(!this[_0x18c305(0x20b)](_0x9c847))return 0x0;return this[_0x18c305(0x222)]===undefined&&this[_0x18c305(0x1c5)](),this[_0x18c305(0x222)][_0x9c847]||0x0;},Game_BattlerBase[_0x1d22cc(0x1fe)][_0x1d22cc(0x1a5)]=function(_0x1a9222,_0x140ac0){const _0x4a2a0f=_0x1d22cc;this['_antiDamageBarrierTp']===undefined&&this['initAntiDamageBarriers'](),this[_0x4a2a0f(0x222)][_0x1a9222]=_0x140ac0;},Game_BattlerBase[_0x1d22cc(0x1fe)][_0x1d22cc(0x1fa)]=function(){const _0x2561cd=_0x1d22cc,_0x385f0f=this[_0x2561cd(0x21b)]()[_0x2561cd(0x1a9)](this[_0x2561cd(0x1b5)]()),_0x3dbd7b=VisuMZ[_0x2561cd(0x1df)][_0x2561cd(0x1b7)]['IgnoreAllBarrier'];return _0x385f0f[_0x2561cd(0x1d2)](_0x173f89=>_0x173f89&&_0x173f89[_0x2561cd(0x1f0)]&&_0x173f89[_0x2561cd(0x1f0)][_0x2561cd(0x1a4)](_0x3dbd7b));},Game_BattlerBase['prototype'][_0x1d22cc(0x226)]=function(){const _0x380330=_0x1d22cc,_0x203ec2=Number[_0x380330(0x1c3)],_0x3bfcb8=this[_0x380330(0x19b)]()['sort']((_0x46749e,_0x3c59c9)=>{const _0x59fb09=_0x380330,_0x403573=_0x46749e[_0x59fb09(0x20a)]===0x0?_0x203ec2:this[_0x59fb09(0x1ef)](_0x46749e['id']),_0x29d585=_0x3c59c9[_0x59fb09(0x20a)]===0x0?_0x203ec2:this['stateTurns'](_0x3c59c9['id']);if(_0x403573!==_0x29d585)return _0x403573-_0x29d585;const _0x2318f1=_0x46749e[_0x59fb09(0x1cb)],_0x108b33=_0x3c59c9['priority'];if(_0x2318f1!==_0x108b33)return _0x108b33-_0x2318f1;return _0x46749e['id']-_0x3c59c9['id'];});return _0x3bfcb8;},VisuMZ[_0x1d22cc(0x1df)][_0x1d22cc(0x202)]=function(_0x25ec47){const _0x497236=_0x1d22cc;window['user']=BattleManager[_0x497236(0x22b)]||_0x25ec47,window[_0x497236(0x1c8)]=_0x25ec47,window['a']=window[_0x497236(0x1e8)],window['b']=window[_0x497236(0x1c8)];},VisuMZ[_0x1d22cc(0x1df)]['clearJsTargets']=function(){const _0x20a243=_0x1d22cc;window[_0x20a243(0x1e8)]=undefined,window[_0x20a243(0x1c8)]=undefined,window['a']=undefined,window['b']=undefined;},VisuMZ[_0x1d22cc(0x1df)][_0x1d22cc(0x212)]=function(_0x33b2e3){const _0x2b805d=_0x1d22cc;_0x33b2e3=_0x33b2e3[_0x2b805d(0x1f7)](/\b(\d+)([%％])/gi,(_0x4429b3,_0x41c124)=>(Number(_0x41c124)||0x0)*0.01);try{return eval(_0x33b2e3);}catch(_0x13648b){if($gameTemp['isPlaytest']())console[_0x2b805d(0x1cd)](_0x13648b);return 0x0;}},VisuMZ[_0x1d22cc(0x1df)][_0x1d22cc(0x229)]=Game_Battler[_0x1d22cc(0x1fe)][_0x1d22cc(0x1a0)],Game_Battler[_0x1d22cc(0x1fe)]['addState']=function(_0xcf62af){const _0x34eea7=_0x1d22cc;VisuMZ[_0x34eea7(0x1df)]['Game_Battler_addState'][_0x34eea7(0x1e6)](this,_0xcf62af),this[_0x34eea7(0x19d)](_0xcf62af);},Game_Battler[_0x1d22cc(0x1fe)][_0x1d22cc(0x19d)]=function(_0x18efc2){const _0x504b0b=_0x1d22cc;if(!this[_0x504b0b(0x20b)](_0x18efc2))return;const _0x3d41c8=$dataStates[_0x18efc2];if(!_0x3d41c8)return;const _0x27ccf9=VisuMZ[_0x504b0b(0x1df)][_0x504b0b(0x1b7)],_0x1f096e=_0x3d41c8[_0x504b0b(0x1f0)];VisuMZ[_0x504b0b(0x1df)][_0x504b0b(0x202)](this);if(_0x1f096e[_0x504b0b(0x1a4)](_0x27ccf9[_0x504b0b(0x1f8)])){const _0x1b0816=VisuMZ[_0x504b0b(0x1df)]['CalculateCharges'](RegExp['$2']);this['setStateDisplay'](_0x18efc2,_0x1b0816||0x1);}if(_0x1f096e[_0x504b0b(0x1a4)](_0x27ccf9[_0x504b0b(0x1c7)])){const _0x3ce952=VisuMZ[_0x504b0b(0x1df)][_0x504b0b(0x212)](RegExp['$2']);this[_0x504b0b(0x213)](_0x18efc2,_0x3ce952||0x0);}if(_0x1f096e[_0x504b0b(0x1a4)](_0x27ccf9['CancelUnder'])){const _0x1b1110=VisuMZ['AntiDmgBarriers']['CalculateCharges'](RegExp['$2']);this[_0x504b0b(0x1b2)](_0x18efc2,_0x1b1110||0x0);}if(_0x1f096e['match'](_0x27ccf9['ReduceBarrier'])){const _0x38abaa=VisuMZ['AntiDmgBarriers'][_0x504b0b(0x212)](RegExp['$2']);this[_0x504b0b(0x1a3)](_0x18efc2,_0x38abaa||0x0);}if(_0x1f096e['match'](_0x27ccf9[_0x504b0b(0x1ca)])){const _0xf49498=VisuMZ['AntiDmgBarriers'][_0x504b0b(0x212)](RegExp['$2']);this[_0x504b0b(0x1ff)](_0x18efc2,_0xf49498||0x0);}if(_0x1f096e['match'](_0x27ccf9[_0x504b0b(0x208)])){const _0x397aee=VisuMZ[_0x504b0b(0x1df)][_0x504b0b(0x212)](RegExp['$2']);this['setAntiDamageBarrierMp'](_0x18efc2,_0x397aee||0x0);}if(_0x1f096e[_0x504b0b(0x1a4)](_0x27ccf9[_0x504b0b(0x1ec)])){const _0x1d42c2=VisuMZ[_0x504b0b(0x1df)][_0x504b0b(0x212)](RegExp['$2']);this[_0x504b0b(0x1a5)](_0x18efc2,_0x1d42c2||0x0);}VisuMZ['AntiDmgBarriers']['clearJsTargets']();},Game_Battler[_0x1d22cc(0x1fe)]['onAntiDamageBarrierEffect']=function(_0x1af5d2,_0x199c91){const _0x4ee9c4=_0x1d22cc;if(!SceneManager[_0x4ee9c4(0x1fc)]())return;const _0x30be98=VisuMZ[_0x4ee9c4(0x1df)][_0x4ee9c4(0x224)][_0x1af5d2];if(!_0x30be98)return;const _0xfed463=_0x199c91?'Intact':'Break';if(_0x30be98['%1AnimationID'['format'](_0xfed463)]>0x0){const _0x143d3e=[this],_0x1cac7f=_0x30be98[_0x4ee9c4(0x210)[_0x4ee9c4(0x217)](_0xfed463)];let _0x4a1226=_0x30be98[_0x4ee9c4(0x1a8)[_0x4ee9c4(0x217)](_0xfed463)];_0x30be98[_0x4ee9c4(0x1d1)[_0x4ee9c4(0x217)](_0xfed463)]&&(_0x4a1226=!_0x4a1226);const _0x4e17d6=_0x30be98['%1Mute'[_0x4ee9c4(0x217)](_0xfed463)];$gameTemp[_0x4ee9c4(0x20f)](_0x143d3e,_0x1cac7f,_0x4a1226,_0x4e17d6);}},Game_Battler[_0x1d22cc(0x1fe)][_0x1d22cc(0x225)]=function(_0x269fed){const _0x5eed05=_0x1d22cc;if(!_0x269fed)return;const _0x2ca020=_0x269fed['id'],_0x12a083=VisuMZ[_0x5eed05(0x1df)]['RegExp'],_0x4a8a5d=_0x269fed['note'];this[_0x5eed05(0x192)](_0x2ca020);if(_0x4a8a5d[_0x5eed05(0x1a4)](_0x12a083['NullBarrier']))this['onAntiDamageBarrierEffect'](_0x5eed05(0x1db),![]);else{if(_0x4a8a5d[_0x5eed05(0x1a4)](_0x12a083[_0x5eed05(0x1c7)]))this[_0x5eed05(0x1e5)](_0x5eed05(0x1aa),![]);else{if(_0x4a8a5d['match'](_0x12a083[_0x5eed05(0x1ae)]))this[_0x5eed05(0x1e5)](_0x5eed05(0x1aa),![]);else{if(_0x4a8a5d['match'](_0x12a083['ReduceBarrier']))this[_0x5eed05(0x1e5)](_0x5eed05(0x1c4),![]);else{if(_0x4a8a5d['match'](_0x12a083[_0x5eed05(0x1ca)]))this['onAntiDamageBarrierEffect'](_0x5eed05(0x1b8),![]);else{if(_0x4a8a5d[_0x5eed05(0x1a4)](_0x12a083[_0x5eed05(0x208)]))this[_0x5eed05(0x1e5)]('MP',![]);else _0x4a8a5d['match'](_0x12a083[_0x5eed05(0x1ec)])&&this['onAntiDamageBarrierEffect']('TP',![]);}}}}}},Game_Battler[_0x1d22cc(0x1fe)]['onAntiDamageNullificationBarrier']=function(_0x59f8bb){const _0x18e064=_0x1d22cc,_0x4d8868=_0x59f8bb['id'];let _0x1471b2=(Number(this[_0x18e064(0x214)](_0x4d8868))||0x0)-0x1;this[_0x18e064(0x1ff)](_0x4d8868,_0x1471b2),_0x1471b2<=0x0&&this['removeState'](_0x4d8868),this[_0x18e064(0x1e5)](_0x18e064(0x1db),_0x1471b2>0x0);},Game_Battler[_0x1d22cc(0x1fe)][_0x1d22cc(0x1d7)]=function(_0x940fab){const _0x2f48b3=_0x1d22cc;this[_0x2f48b3(0x1e5)]('Cancel',!![]);},Game_Battler[_0x1d22cc(0x1fe)][_0x1d22cc(0x193)]=function(){const _0xb6ebe3=_0x1d22cc;this['onAntiDamageBarrierEffect'](_0xb6ebe3(0x1c4),!![]);},Game_Battler[_0x1d22cc(0x1fe)][_0x1d22cc(0x215)]=function(_0x5aa1ec,_0x3383d3){const _0x2e04ca=_0x1d22cc;if(!SceneManager[_0x2e04ca(0x1fc)]())return![];const _0x17f065=VisuMZ[_0x2e04ca(0x1df)][_0x2e04ca(0x224)]['Absorb'];if(!_0x17f065)return;if(_0x17f065[_0x2e04ca(0x203)]==='')return;const _0x478ffc=_0x17f065[_0x2e04ca(0x203)][_0x2e04ca(0x217)](_0x5aa1ec),_0x23f8af={'textColor':_0x17f065['TextColor'],'flashColor':_0x17f065[_0x2e04ca(0x205)],'flashDuration':_0x17f065[_0x2e04ca(0x1fd)]};this['setupTextPopup'](_0x478ffc,_0x23f8af);},Game_Battler[_0x1d22cc(0x1fe)]['onAntiDamageAbsorptionBarrier']=function(_0xb0bd48){const _0x49de9f=_0x1d22cc,_0xd2e9d7=_0xb0bd48['id'];let _0x4a59d7=Number(this[_0x49de9f(0x214)](_0xd2e9d7))||0x0;_0x4a59d7<=0x0&&this['removeState'](_0xd2e9d7),this[_0x49de9f(0x1e5)](_0x49de9f(0x1b8),_0x4a59d7>0x0);},Game_Battler[_0x1d22cc(0x1fe)]['onAntiDamageMpBarrier']=function(_0x405697){const _0x4f1a65=_0x1d22cc,_0x5a88e3=_0x405697['id'];this['mp']<=0x0&&this[_0x4f1a65(0x192)](_0x5a88e3),this[_0x4f1a65(0x1e5)]('MP',this['mp']>0x0);},Game_Battler[_0x1d22cc(0x1fe)][_0x1d22cc(0x20d)]=function(_0x52079a){const _0x399ee5=_0x1d22cc;if(!SceneManager['isSceneBattle']())return![];const _0x30eb9c=VisuMZ[_0x399ee5(0x1df)][_0x399ee5(0x224)]['TP'];if(!_0x30eb9c)return;if(_0x30eb9c['PopupText']==='')return;const _0x5d50d5=_0x30eb9c[_0x399ee5(0x203)][_0x399ee5(0x217)](_0x52079a,TextManager['tp']),_0x345fb2={'textColor':_0x30eb9c[_0x399ee5(0x194)],'flashColor':_0x30eb9c[_0x399ee5(0x205)],'flashDuration':_0x30eb9c[_0x399ee5(0x1fd)]};this['setupTextPopup'](_0x5d50d5,_0x345fb2);},Game_Battler[_0x1d22cc(0x1fe)][_0x1d22cc(0x1b6)]=function(_0x3d5334){const _0x5a0f37=_0x1d22cc,_0x95ca5f=_0x3d5334['id'];this['tp']<=0x0&&this[_0x5a0f37(0x192)](_0x95ca5f),this[_0x5a0f37(0x1e5)]('TP',this['tp']>0x0);},Game_Battler[_0x1d22cc(0x1fe)][_0x1d22cc(0x221)]=function(_0x4f96a5){const _0x4aec85=_0x1d22cc;if(!_0x4f96a5)return;if(!_0x4f96a5[_0x4aec85(0x218)]())return;let _0x598e07=[];for(const _0x44dc65 of this[_0x4aec85(0x19b)]()){if(!_0x44dc65)continue;if(!this[_0x4aec85(0x20b)](_0x44dc65['id']))continue;VisuMZ['AntiDmgBarriers'][_0x4aec85(0x1cc)](_0x44dc65,_0x4f96a5)&&_0x598e07[_0x4aec85(0x22e)](_0x44dc65['id']);}for(const _0x32fcb8 of _0x598e07){const _0x2230a5=$dataStates[_0x32fcb8];if(!_0x2230a5)continue;this['processBreakStateEffect'](_0x2230a5);}},VisuMZ['AntiDmgBarriers'][_0x1d22cc(0x1cc)]=function(_0x1105ad,_0x3d752d){const _0x161342=_0x1d22cc,_0x2b2007=VisuMZ[_0x161342(0x1df)][_0x161342(0x1b7)][_0x161342(0x206)],_0x46a504=_0x1105ad[_0x161342(0x1f0)][_0x161342(0x1a4)](_0x2b2007);if(_0x46a504)for(const _0x10b165 of _0x46a504){if(!_0x10b165)continue;_0x10b165['match'](_0x2b2007);const _0x47632c=String(RegExp['$1']);if(_0x3d752d[_0x161342(0x18c)](_0x47632c))return!![];}return![];},VisuMZ[_0x1d22cc(0x1df)]['Game_Battler_regenerateAll']=Game_Battler[_0x1d22cc(0x1fe)][_0x1d22cc(0x1af)],Game_Battler[_0x1d22cc(0x1fe)][_0x1d22cc(0x1af)]=function(){const _0x334f46=_0x1d22cc;VisuMZ[_0x334f46(0x1df)][_0x334f46(0x1d9)][_0x334f46(0x1e6)](this),this[_0x334f46(0x190)]()&&this[_0x334f46(0x1f4)]();},Game_Battler['prototype'][_0x1d22cc(0x1f4)]=function(){const _0x388203=_0x1d22cc;VisuMZ[_0x388203(0x1df)][_0x388203(0x202)](this);const _0x3c4217=VisuMZ[_0x388203(0x1df)][_0x388203(0x1b7)];for(const _0xc0b1a8 of this['states']()){if(!_0xc0b1a8)continue;const _0x5eb9cb=_0xc0b1a8[_0x388203(0x1f0)];(_0x5eb9cb[_0x388203(0x1a4)](_0x3c4217['NullBarrier'])||_0x5eb9cb[_0x388203(0x1a4)](_0x3c4217[_0x388203(0x1ca)]))&&this[_0x388203(0x1eb)](_0xc0b1a8);}VisuMZ['AntiDmgBarriers'][_0x388203(0x233)]();},Game_Battler[_0x1d22cc(0x1fe)][_0x1d22cc(0x1eb)]=function(_0x415db9){const _0x557449=_0x1d22cc,_0x57bb92=VisuMZ['AntiDmgBarriers'][_0x557449(0x1b7)],_0x4d6f49=_0x415db9[_0x557449(0x1f0)];let _0x17665f=0x0;_0x4d6f49['match'](_0x57bb92[_0x557449(0x227)])&&(_0x17665f-=VisuMZ[_0x557449(0x1df)][_0x557449(0x212)](RegExp['$1']));_0x4d6f49['match'](_0x57bb92[_0x557449(0x1b3)])&&(_0x17665f+=VisuMZ[_0x557449(0x1df)]['CalculateCharges'](RegExp['$1']));let _0x2ef977=Number(this[_0x557449(0x214)](_0x415db9['id']));_0x2ef977+=_0x17665f,_0x2ef977>0x0?this[_0x557449(0x1ff)](_0x415db9['id'],_0x2ef977):this['processBreakStateEffect'](_0x415db9);};