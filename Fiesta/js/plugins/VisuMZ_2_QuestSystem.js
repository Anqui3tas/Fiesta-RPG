//=============================================================================
// VisuStella MZ - Quest Journal System
// VisuMZ_2_QuestSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_QuestSystem = true;

(function () {
  const externalQuestFile = "data/Quests.json";

  const _DataManager_loadDatabase = DataManager.loadDatabase;
  DataManager.loadDatabase = function () {
    _DataManager_loadDatabase.call(this);
    this.loadExternalQuestData();
  };

  DataManager.loadExternalQuestData = function () {
    const xhr = new XMLHttpRequest();
    const url = externalQuestFile;
    xhr.open("GET", url);
    xhr.overrideMimeType("application/json");
    xhr.onload = function () {
      if (xhr.status < 400) {
        try {
          const data = JSON.parse(xhr.responseText);
          if (data && Array.isArray(data.quests)) {
            console.log(`Loaded ${data.quests.length} external quests.`);

            // Defer until $dataSystem and $gameSystem are ready
            const applyExternalQuests = () => {
              if (!$dataSystem || !$gameSystem) return setTimeout(applyExternalQuests, 50);

              $dataSystem._customQuests = data.quests;
              $dataSystem._questCategories = data.categories || [];

              // Replace internal VisuStella quest data
              VisuMZ.QuestSystem._customQuests = data.quests;
              VisuMZ.QuestSystem._questCategories = data.categories || [];

              // Clear Plugin Parameter quests (plugin parameters are read-only at runtime)
              VisuMZ.QuestSystem._parameters = VisuMZ.QuestSystem._parameters || {};
              VisuMZ.QuestSystem._parameters['Categories:arraystruct'] = [];

              // Optional: auto-track and auto-add
              data.quests.forEach((q) => {
                if (!q.key) {
                  console.warn('Quest is missing required "key" field:', q);
                  return;
                }
                if (q.autoAdd) $gameSystem.setQuestStatus(q.key, "known");
                if (q.autoTrack) $gameSystem._trackedQuest = q.key;
              });

              console.log("External quests applied.");
            };

            applyExternalQuests();
          } else {
            console.warn("External Quests.json is missing a `quests` array.");
          }
        } catch (e) {
          console.error("Error parsing Quests.json:", e);
        }
      } else {
        console.error("Failed to load Quests.json:", xhr.statusText);
      }
    };
    xhr.onerror = function () {
      console.error("Network error loading Quests.json");
    };
    xhr.send();
  };
})();

var VisuMZ = VisuMZ || {};
VisuMZ.QuestSystem = VisuMZ.QuestSystem || {};
VisuMZ.QuestSystem.version = 1.17;

//=============================================================================
/*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.17] [QuestSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Quest_Journal_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A quest journal is a very important tool provided by game developers for the
 * players. It lists various quests, missions, and objectives that the player
 * can pursue in order to progress further into the game. This can be helpful
 * in reminding the player what needs to be done in the event the player can
 * forget what things there are to do in a vast and large RPG world.
 *
 * This plugin places a quest journal system into your RPG Maker MZ game. You
 * can set up how the quest journal appears, move its windows around and/or
 * reshape them to fit your game.
 *
 * You can adjust the quest's title, display a difficulty level, remind the
 * player who the quest is from, where that quest is from, various dynamic
 * descriptions explaining the quest, a list of objectives to make, a list of
 * rewards that will be given to the player once the quest is complete, and any
 * subtext footnotes and quotes you may wish to insert into each quest.
 *
 * *NOTE*
 *
 * Keep in mind that while this plugin does enable a quest journal system into
 * your game, this plugin will NOT automate it. If you have a quest enabled, it
 * is still up to you to add the quest properly into the journal, set its many
 * objectives, when the other objectives appear, what the rewards are, and then
 * giving out the rewards yourself manually. The purpose of this plugin is to
 * simply serve as a visual record for your player to see what quests have been
 * handed down to him or her.
 *
 * Features include all (but not limited to) the following:
 *
 * * Unlimited quest categories.
 * * Unlimited quest slots.
 * * Full control over what appears in the quest journal system and how it
 *   appears in-game.
 * * Update quest descriptions, objectives, rewards, subtexts, etc. mid-game
 *   through the use of Plugin Commands.
 * * A dedicated quest menu that's accessible from the Main Menu or by
 *   Plugin Command call.
 * * A quest tracker that appears in the map scene to keep the player updated
 *   on how far they are progressing in their current quest.
 * * Options for the player to show/hide the quest tracker and reposition its
 *   location on the screen.
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
 * Explanation - Categories and Quests
 * ============================================================================
 *
 * The following is an explanation on the differences between Categories and
 * Quests for the usage of this plugin.
 *
 * ---
 *
 * Categories
 *
 * Quest Categories separate the quest types in your game. These can be used to
 * help players differentiate which are story-driven quests, which are optional
 * quests, recurring quests, etc. These have limited settings, but serve as
 * containers for quests that fall under its category.
 *
 * ---
 *
 * Plugin Parameters > Categories > Category Name:
 *
 * This is the category's name. It appears however you type it using text
 * codes, allowing you to color-code it if needed.
 *
 * ---
 *
 * Plugin Parameters > Categories > Quests:
 *
 * These contain the quests that are listed under this category. Enter in as
 * many as needed/desired.
 *
 * ---
 *
 * Quests
 *
 * Each Quest Category will contain a list of quests that can appear in-game.
 * These individual quests make up the meat and bones of the Quest System and
 * will serve to relay information to the player on what he/she needs to do in
 * order to make progress in your game.
 *
 * ---
 *
 * Plugin Parameters > General > Log Window > Quest Log
 *
 * This determines how the template used by the quest logs to parse information
 * regarding the quests themselves. By default, they are formatted like such:
 *
 * ---
 *
 * \{[[Title]]\}
 * \c[4]Level:\c[0] [[Difficulty]]
 * \c[4]From:\c[0] [[From]]
 * \c[4]Location:\c[0] [[Location]]
 *
 * \c[4]Description:\c[0]
 * [[Description]]
 *
 * \c[4]Objectives:\c[0]
 * [[Objectives]]
 *
 * \c[4]Rewards:\c[0]
 * [[Rewards]]
 *
 * [[Subtext]]
 *
 * [[Quote]]
 *
 * ---
 *
 * Each [[Marker]] is to be replaced by the quest date related to them.
 *
 * - [[Title]] - Inserts the title of the quest.
 *
 * - [[RawTitle]] - Inserts the title of the quest without any text codes
 *   removed. Keep in mind that icons do NOT resize based on the text size.
 *
 * - [[Difficulty]] - Inserts the quest difficulty text.
 *
 * - [[From]] - Inserts the quest origin text.
 *
 * - [[Location]] - Inserts the quest location text.
 *
 * - [[Description]] - Inserts the currently active quest description.
 *   - The quest description can change depending on which Description ID
 *     is currently active for that quest.
 *
 * - [[Objectives]] - Inserts a list of the visible quest objectives.
 *   - The quest objectives visible to the player will be determined by
 *     the quest's Visible Objectives settings and any Plugin Commands
 *     used to alter which objectives are visible and what state they are
 *     currently in (known, completed, failed).
 *
 * - [[Rewards]] - Inserts a list of visible quest rewards.
 *   - The quest rewards visible to the player will be determined by the
 *     quest's Visible Rewards settings and any Plugin Commands used to
 *     alter which rewards are visible and what state they are currently
 *     in (known, claimed, denied).
 *
 * - [[Subtext]] - Inserts the currently active quest subtext.
 *   - The quest subtext can change depending on which Subtext ID is
 *     currently active for that quest.
 *
 * - [[Quote]] - Inserts the currently active quest quote.
 *   - The quest quote can change depending on which Quote ID is
 *     currently active for that quest.
 *
 * ---
 *
 * Each of the following aspects of the quests can be changed through the usage
 * of Plugin Commands:
 *
 * - Description
 * - Objectives
 * - Rewards
 * - Subtext
 * - Quote
 *
 * The following are the Plugin Commands that can change them:
 *
 * - Quest: Description Change
 * - Quest: Objectives Change
 * - Quest: Rewards Change
 * - Quest: Subtext Change
 * - Quest: Quote Change
 *
 * ---
 *
 * More information will be explained in their respective Plugin Parameter
 * sections further down in the help file.
 *
 * ============================================================================
 * Control Variable and Conditional Branch Usage
 * ============================================================================
 *
 * For those wanting to use Control Variable event commands and/or Conditional
 * Branch event commands with the Quest Journal System plugin, you can insert
 * the following functions into the "Script" input fields of the respective
 * event commands.
 *
 * These are new JavaScript functions added through this plugin and will not
 * work without it.
 *
 * ---
 *
 * === Control Variable Script Functions ===
 *
 * These are newly added JavaScript functions that return a numeric value.
 * The functions are best used with the Control Variable script input field.
 *
 * ---
 *
 * totalQuestsAvailable()
 *
 * - Returns the total number of quests available for the player.
 *
 * ---
 *
 * totalQuestsCompleted()
 *
 * - Returns the total number of quests completed by the player.
 *
 * ---
 *
 * totalQuestsFailed()
 *
 * - Returns the total number of quests failed by the player.
 *
 * ---
 *
 * totalQuestsRevealed()
 *
 * - Returns the total number of quests visible to the player.
 *
 * ---
 *
 * totalQuestsInGame()
 *
 * - Returns the total number of quests available in-game.
 *
 * ---
 *
 * getQuestDescriptionIndex(questKey)
 *
 * - Returns the select quest's current description index ID.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: getQuestDescriptionIndex('Welcome')
 *
 * ---
 *
 * totalVisibleQuestObjectives(questKey)
 *
 * - Returns the total number of visible quest objectives for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalVisibleQuestObjectives('Welcome')
 *
 * ---
 *
 * totalQuestObjectives(questKey)
 *
 * - Returns the total number of quest objectives for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalQuestObjectives('Welcome')
 *
 * ---
 *
 * totalVisibleQuestRewards(questKey)
 *
 * - Returns the total number of visible quest rewards for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalVisibleQuestRewards('Welcome')
 *
 * ---
 *
 * totalQuestRewards(questKey)
 *
 * - Returns the total number of quest rewards for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalQuestRewards('Welcome')
 *
 * ---
 *
 * getQuestSubtextIndex(questKey)
 *
 * - Returns the select quest's current subtext index ID.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: getQuestSubtextIndex('Welcome')
 *
 * ---
 *
 * getQuestQuoteIndex(questKey)
 *
 * - Returns the select quest's current subtext index ID.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: getQuestQuoteIndex('Welcome')
 *
 * ---
 *
 * === Conditional Branch Script Functions ===
 *
 * These are newly added JavaScript functions that return a true/false value.
 * The functions are best used with the Conditional Branch script input field.
 *
 * ---
 *
 * isQuestObjectiveCompleted(questKey, objectiveID)
 *
 * - Returns a true/false value depending on the selected quest's objective
 *   and if it is completed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest objective you want
 *   to check.
 * - Example: isQuestObjectiveCompleted('Welcome', 1)
 *
 * ---
 *
 * isQuestObjectiveFailed(questKey, objectiveID)
 *
 * - Returns a true/false value depending on the selected quest's objective
 *   and if it is failed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest objective you want
 *   to check.
 * - Example: isQuestObjectiveFailed('Welcome', 1)
 *
 * ---
 *
 * isQuestObjectiveUncleared(questKey, objectiveID)
 *
 * - Returns a true/false value depending on the selected quest's objective
 *   and if it is uncleared.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest objective you want
 *   to check.
 * - Example: isQuestObjectiveUncleared('Welcome', 1)
 *
 * ---
 *
 * isQuestRewardClaimed(questKey, rewardID)
 *
 * - Returns a true/false value depending on the selected quest's reward
 *   and if it is claimed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest reward you want
 *   to check.
 * - Example: isQuestRewardClaimed('Welcome', 1)
 *
 * ---
 *
 * isQuestRewardDenied(questKey, rewardID)
 *
 * - Returns a true/false value depending on the selected quest's reward
 *   and if it is denied.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest reward you want
 *   to check.
 * - Example: isQuestRewardDenied('Welcome', 1)
 *
 * ---
 *
 * isQuestRewardUnclaimed(questKey, rewardID)
 *
 * - Returns a true/false value depending on the selected quest's reward
 *   and if it is unclaimed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest reward you want
 *   to check.
 * - Example: isQuestRewardUnclaimed('Welcome', 1)
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
 * === Action Tracking-Related Notetags ===
 *
 * ---
 *
 * <Variable id On Use: +x>
 * <Variable id On Use: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Whenever any actor uses this specific skill or item, increase or decrease
 *   the target variable by a certain amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 *
 * ---
 *
 * === Enemy Tracking-Related Notetags ===
 *
 * ---
 *
 * <Variable id On Death: +x>
 * <Variable id On Death: -x>
 *
 * - Used for: Enemy Notetags
 * - Whenever this specific enemy dies, increase or decrease the target
 *   variable by a certain amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 *
 * ---
 *
 * === Item Tracking-Related Notetags ===
 *
 * ---
 *
 * <Variable id On Gain: +x>
 * <Variable id On Gain: -x>
 *
 * - Used Item, Weapon, Armor Notetags
 * - Whenever the party gains the specific item, weapon, or armor, increase or
 *   decrease the target variable by a certai amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 *
 * ---
 *
 * <Variable id On Lose: +x>
 * <Variable id On Lose: -x>
 *
 * - Used Item, Weapon, Armor Notetags
 * - Whenever the party loses the specific item, weapon, or armor, increase or
 *   decrease the target variable by a certai amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 *
 * ---
 *
 * <Track With Variable id>
 *
 * - Used Item, Weapon, Armor Notetags
 * - Whenever there is a change made to the specific item, weapon, or armor,
 *   set the value of the target variable to the number of items owned.
 * - Replace 'id' with the Variable ID you wish to alter.
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
 * === Quest Plugin Commands ===
 *
 * ---
 *
 * Quest: Add/Complete/Fail/Remove
 * - Adds quest(s) to be known/completed/failed.
 * - Or removes them.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Status:
 *   - Change the status to this.
 *     - Add to Known
 *     - Add to Completed
 *     - Add to Failed
 *     - Remove from All
 *
 * ---
 *
 * Quest: Description Change
 * - Changes the description of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Description ID:
 *   - Change the description of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Quest: Objectives Change
 * - Changes the objective(s) status of the quest(s).
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Objective ID(s):
 *   - Select the objective ID(s) to change.
 *   - You may use JavaScript code.
 *
 *   Status:
 *   - Change the status of the objective(s) to this.
 *     - Show Objective(s)
 *     - Complete Objective(s)
 *     - Fail Objective(s)
 *     - Remove Objective(s)
 *
 * ---
 *
 * Quest: Quote Change
 * - Changes the quote of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Subtext ID:
 *   - Change the quote of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Quest: Rewards Change
 * - Changes the reward(s) status of the quest(s).
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Reward ID(s):
 *   - Select the reward ID(s) to change.
 *   - You may use JavaScript code.
 *
 *   Status:
 *   - Change the status of the reward(s) to this.
 *     - Show Reward(s)
 *     - Claim Reward(s)
 *     - Deny Reward(s)
 *     - Remove Reward(s)
 *
 * ---
 *
 * Quest: Subtext Change
 * - Changes the subtext of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Subtext ID:
 *   - Change the subtext of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * === Label Plugin Commands ===
 *
 * ---
 *
 * Label: Add Quest Label
 * - Add Quest Labels to target items, weapons, and armors.
 *
 *   Item ID(s):
 *   Weapon ID(s):
 *   Armor ID(s):
 *   - Select which Item, Weapon, or Armor ID(s) to add Quest Labels to.
 *
 * ---
 *
 * Label: Clear Quest Label
 * - Clear Quest Labels from target items, weapons, and armors.
 *
 *   Item ID(s):
 *   Weapon ID(s):
 *   Armor ID(s):
 *   - Select which Item, Weapon, or Armor ID(s) to clear Quest Labels from.
 *
 * ---
 *
 * === Tracker Plugin Commands ===
 *
 * ---
 *
 * Tracker: Change Quest
 * - Changes the tracked quest.
 *
 *   Quest Key:
 *   - Insert the quest key here.
 *
 * ---
 *
 * Tracker: Refresh Window
 * - Refreshes the quest tracker window.
 *
 * ---
 *
 * Tracker: Show/Hide Window
 * - Can forcefully hide window.
 * - Showing will depend on the player's Options setting.
 *
 *   Show/Hide?:
 *   - Shows/hides the tracker window on the map.
 *
 * ---
 *
 * === System Plugin Commands ===
 *
 * ---
 *
 * System: Call Scene_Quest
 * - Opens Scene_Quest for the player.
 * - Does not work in battle.
 *
 * ---
 *
 * System: Enable Quests in Menu?
 * - Enables/disables quest menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables quest menu inside the main menu.
 *
 * ---
 *
 * System: Show Quests in Menu?
 * - Shows/hides quest menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides quest menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The general settings determine various aspects of the Quest System plugin
 * from the quests that appear at the start of the game to how it's displayed
 * inside menus.
 *
 * ---
 *
 * Starting Quests
 *
 *   Known Quests:
 *   - Which quests are known at the start of the game?
 *   - Insert their keys here.
 *
 *   Completed Quests:
 *   - Which quests are completed at the start of the game?
 *   - Insert their keys here.
 *
 *   Failed Quests:
 *   - Which quests are failed at the start of the game?
 *   - Insert their keys here.
 *
 *   Tracked Quest:
 *   - Which quest is tracked at the start of the game?
 *
 * ---
 *
 * Scene_Quest
 *
 * ---
 *
 * Scene_Quest > Background Settings:
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
 * Scene_Quest > Vocab
 *
 * ---
 *
 * Scene_Quest > Vocab > Command Window
 *
 *   Command: Known:
 *   - Text used to display known quests.
 *
 *   Command: Completed:
 *   - Text used to display completed quests.
 *
 *   Command: Failed:
 *   - Text used to display failed quests.
 *
 * ---
 *
 * Scene_Quest > Vocab > Label Window
 *
 *   Empty Title:
 *   - Text displayed in the Label Window when no quest is selected.
 *
 * ---
 *
 * Scene_Quest > Vocab > List Window
 *
 *   Open Categories:
 *   - Text format for an open category.
 *   - %1 - Category Name, %2 - Quest Amount
 *
 *   Closed Categories:
 *   - Text format for a closed category.
 *   - %1 - Category Name, %2 - Quest Amount
 *
 *   No Quest Listed:
 *   - Text when no quest is listed.
 *
 *   Tracked Quest:
 *   - Text format for a tracked quest.
 *   - %1 - Tracked Quest's Name
 *
 * ---
 *
 * Scene_Quest > Vocab > Log Window
 *
 *   Empty Message:
 *   - Text displayed when no quest is selected.
 *
 *     JS: On Load:
 *     - Runs code upon making the empty message.
 *     - Useful for setting up variables.
 *
 *   Quest Log:
 *   - Text format for Quest Log Window.
 *   - Instructions:
 *     - Insert the [[Keyword]] marks in the text where you want certain parts
 *       of the quest to appear.
 *
 *       - [[Title]] - Inserts the title of the quest.
 *
 *       - [[Difficulty]] - Inserts the quest difficulty text.
 *
 *       - [[From]] - Inserts the quest origin text.
 *
 *       - [[Location]] - Inserts the quest location text.
 *
 *       - [[Description]] - Inserts the currently active quest description.
 *         - The quest description can change depending on which Description ID
 *           is currently active for that quest.
 *
 *       - [[Objectives]] - Inserts a list of the visible quest objectives.
 *         - The quest objectives visible to the player will be determined by
 *           the quest's Visible Objectives settings and any Plugin Commands
 *           used to alter which objectives are visible and what state they are
 *           currently in (known, completed, failed).
 *
 *       - [[Rewards]] - Inserts a list of visible quest rewards.
 *         - The quest rewards visible to the player will be determined by the
 *           quest's Visible Rewards settings and any Plugin Commands used to
 *           alter which rewards are visible and what state they are currently
 *           in (known, claimed, denied).
 *
 *       - [[Subtext]] - Inserts the currently active quest subtext.
 *         - The quest subtext can change depending on which Subtext ID is
 *           currently active for that quest.
 *
 *       - [[Quote]] - Inserts the currently active quest quote.
 *         - The quest quote can change depending on which Quote ID is
 *           currently active for that quest.
 *
 *   Objective (Known):
 *   - Text format for known objectives.
 *   - %1 - Objective Text
 *
 *   Objective (Done):
 *   - Text format for complete objectives.
 *   - %1 - Objective Text
 *
 *   Objective (Failed):
 *   - Text format for failed objectives.
 *   - %1 - Objective Text
 *
 *   Reward (Known):
 *   - Text format for normal rewards.
 *   - %1 - Reward Text
 *
 *   Reward (Claimed):
 *   - Text format for claimed rewards.
 *   - %1 - Reward Text
 *
 *   Reward (Denied):
 *   - Text format for denied rewards.
 *   - %1 - Reward Text
 *
 * ---
 *
 * Scene_Quest > Vocab > Button Assist Window
 *
 *   Scroll Up/Down:
 *   - Text for Page Up/Down to scroll log window.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 *   Tracker:
 *   - Text for tracking quests.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 *   Expand:
 *   - Text for expanding categories.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 *   Collapse:
 *   - Text for collapsing categories.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Scene_Quest > Icons
 *
 *   Icon: Known:
 *   - Icon used for this command.
 *
 *   Icon: Completed:
 *   - Icon used for this command.
 *
 *   Icon: Failed:
 *   - Icon used for this command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Category Settings
 * ============================================================================
 *
 * Quest Categories separate the quest types in your game. These can be used to
 * help players differentiate which are story-driven quests, which are optional
 * quests, recurring quests, etc. These have limited settings, but serve as
 * containers for quests that fall under its category.
 *
 * ---
 *
 * Category
 *
 *   Category Name:
 *   - This category's name.
 *   - You may use text codes.
 *
 *   Quests:
 *   - A list of quests listed under this category.
 *   - Quests will be listed in the same order as this parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Settings
 * ============================================================================
 *
 * Each Quest Category will contain a list of quests that can appear in-game.
 * These individual quests make up the meat and bones of the Quest System and
 * will serve to relay information to the player on what he/she needs to do in
 * order to make progress in your game.
 *
 * ---
 *
 * Quest
 *
 *   Quest ID Key:
 *   - This quest's identification key. Quests require unique keys for the
 *     plugin to differentiate them.
 *   - It is VERY important that you keep this key unique from other quests in
 *     order for the Quest System to operate properly in your game.
 *
 * ---
 *
 * Header
 *
 *   Title:
 *   - The title of the quest. This is what appears in-game.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Title]] marker.
 *
 *   Difficulty:
 *   - Difficulty level for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Difficulty]] marker.
 *
 *   From:
 *   - Insert the name of the one who issued this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[From]] marker.
 *
 *   Location:
 *   - Insert location name where this quest was issued.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Location]] marker.
 *
 *   Description:
 *   - Type out the description(s) used for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Description]] marker.
 *   - The displayed description will depend on the Description ID set through
 *     Plugin Command.
 *   - If no Description ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 *
 * ---
 *
 * Lists
 *
 *   Objectives List:
 *   - The objectives to be completed for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Objectives]] marker.
 *   - Depending on which ID's are set to visible, a list will created at the
 *     marker displaying each of the objectives.
 *    - This can be done thorugh the Visible Objectives parameter or through
 *      Plugin Commands.
 *
 *   Visible Objectives:
 *   - The objectives that are visible from the start.
 *
 *   Rewards List:
 *   - The reward list for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Rewards]] marker.
 *   - Depending on which ID's are set to visible, a list will created at the
 *     marker displaying each of the rewards.
 *    - This can be done thorugh the Visible Rewards parameter or through
 *      Plugin Commands.
 *
 *   Visible Rewards:
 *   - The rewards that are visible from the start.
 *
 * ---
 *
 * Footer
 *
 *   Subtext:
 *   - Subtext to be displayed with the quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Subtext]] marker.
 *   - The displayed description will depend on the Subtext ID set through
 *     Plugin Command.
 *   - If no Subtext ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 *
 *   Quotes:
 *   - Quotes to be displayed with the quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Quote]] marker.
 *   - The displayed description will depend on the Quote ID set through
 *     Plugin Command.
 *   - If no Quote ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 *
 * ---
 *
 * JavaScript
 *
 *   JS: On Load:
 *   - Runs code upon loading the quest in Scene_Quest.
 *   - Useful for setting up variables.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Label Settings
 * ============================================================================
 *
 * Change how Quest Labels apply to your game project. Quest Labels are applied
 * to items, weapons, and armors manually by the you, the game dev, through
 * this plugin's Plugin Commands. They add a "QUEST" text over the icon of the
 * target item(s) and these will be shown to the player inside most windows
 * that show items.
 *
 * This way, players can instantly recognize which items are quest-related (as
 * long as they are marked by you, the game dev) and make quicker on-the-go
 * decisions such as whether or not to use them or sell them.
 *
 * ---
 *
 * Settings
 *
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 *
 *   Text:
 *   - The text written on the Quest Label.
 *
 *   Font Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 *   Font Face:
 *   - Font face used for the Quest Label.
 *
 *   Font Size:
 *   - The font size used for the Quest text.
 *
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 *
 *   Fade Speed:
 *   - What's the fade speed of the Quest Label?
 *
 *   Offset X:
 *   - How much to offset the Quest Label's X position by.
 *
 *   Offset Y:
 *   - How much to offset the Quest Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Tracker Settings
 * ============================================================================
 *
 * The Quest Tracker Window is a window that appears on the map scene to
 * display the objectives (and other desired information) of the currently
 * tracked quest decided by the player.
 *
 * ---
 *
 * General
 *
 *   Tracker Format:
 *   - Text format for Quest Tracker Window.
 *   - Read help file for instructions.
 *
 * ---
 *
 * Fading
 *
 *   Close Minimum Opacity:
 *   - Minimum opacity when the player is too close to the quest tracker on
 *     the map screen.
 *
 *   Tracker Fade Speed:
 *   - Fade speed of the tracker when toggled on/off.
 *   - Lower is slower. Higher is faster.
 *
 * ---
 *
 * Options
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Add Show Tracker?:
 *   - Add the 'Show Tracker' option to the Options menu?
 *
 *     Option Name:
 *     - Command name of the option.
 *
 *   Add Position Tracker?:
 *   - Add the 'Position Tracker' option to the Options menu?
 *
 *     Option Name:
 *     - Command name of the option.
 *
 *     Option OFF:
 *     - Text displayed when the option is OFF.
 *
 *     Option ON:
 *     - Text displayed when the option is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Set up the main menu defaults.
 *
 * ---
 *
 * Main Menu Settings
 *
 *   Command Name:
 *   - Name of the 'Quest' option in the Main Menu.
 *
 *   Show in Main Menu?:
 *   - Add the 'Quest' option to the Main Menu by default?
 *
 *   Enable in Main Menu?:
 *   - Enable the 'Quest' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Quest.
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
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * These settings let you control the various windows that appear in the
 * Scene_Quest menu and the Quest Tracker Window that appears in Scene_Map.
 *
 * ---
 *
 * Command Window
 *
 *   Show Failed Quests?:
 *   - Show/hide Failed Quests in the command window.
 *
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Align:
 *   - Text alignment for the Command Window.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Quest Label
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Log Window
 *
 *   PageUp/Down Speed:
 *   - Scroll speed for PageUp/Down.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 *   EXPERIMENTAL:
 *
 *     Automatic Word Wrap?:
 *     - Enables/disables automatic word wrap.
 *     - Requires VisuMZ_1_MessageCore!
 *     - This feature is experimental. Word Wrap does not worth perfectly
 *       with the Log Window, although it performs well enough. This feature
 *       will be updated and completed at a later point in the future. Use it
 *       at your own discretion.
 *
 * ---
 *
 * List Window
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Tracker Window
 *
 *   Window Scale:
 *   - How much do you want to scale the Tracker Window's size by?
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Script Calls
 * ============================================================================
 *
 * The following are Script Calls that can be used with this plugin. These are
 * made for JavaScript proficient users. We are not responsible if you use them
 * incorrectly or for unintended usage.
 *
 * ---
 *
 * $gameSystem.setQuestStatus(key, status)
 * - Changes the quest's completion status.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'completed'
 *   - 'failed'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestStatus('exampleName', 'completed')
 *
 * ---
 *
 * $gameSystem.setQuestDescription(key, id)
 * - Changes the quest's description.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with description ID to use.
 *
 * Example: $gameSystem.setQuestDescription('exampleName', 2)
 *
 * ---
 *
 * $gameSystem.setQuestObjectives(key, ids, status)
 * - Changes the quest's objectives.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'ids' with an array of ID's to use.
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'completed'
 *   - 'failed'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestDescription('exampleName', [1, 2, 3], 'failed')
 *
 * ---
 *
 * $gameSystem.setQuestRewards(key, ids, status)
 * - Changes the quest's rewards.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'ids' with an array of ID's to use.
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'claimed'
 *   - 'denied'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestRewards('exampleName', [1, 3, 5], 'claimed')
 *
 * ---
 *
 * $gameSystem.setQuestSubtext(key, id)
 * - Changes the quest's subtext.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with subtext ID to use.
 *
 * Example: $gameSystem.questSubtext('exampleName', 3)
 *
 * ---
 *
 * $gameSystem.setQuestQuote(key, id)
 * - Changes the quest's quote.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with quote ID to use.
 *
 * Example: $gameSystem.setQuestQuote('exampleName', 4)
 *
 * ---
 *
 * DISCLAIMER:
 *
 * Keep in mind that VisuStella is NOT responsible for your proficiency (or
 * otherwise) of JavaScript.
 *
 * If you get any errors with the custom code, it is up to YOU to fix it.
 *
 * If you do not understand how any of this section works, do not be afraid.
 * It's not the end of the world.
 *
 * You can still change the status of the quests and its objectives through the
 * usage of Plugin Commands.
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
 * Version 1.17: July 13, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Script Call section updated for more clarity.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Label: Add Quest Label
 * **** Add Quest Labels to target items, weapons, and armors.
 * *** Label: Clear Quest Label
 * **** Clear Quest Labels from target items, weapons, and armors.
 * ** New Plugin Parameters added by Irina:
 * *** Quest Label Settings
 * **** Change how Quest Labels apply to your game project. Quest Labels are
 *      applied to items, weapons, and armors manually by the you, the game
 *      dev, through this plugin's Plugin Commands. They add a "QUEST" text
 *      over the icon of the target item(s) and these will be shown to the
 *      player inside most windows that show items.
 * **** This way, players can instantly recognize which items are quest-related
 *      (as long as they are marked by you, the game dev) and make quicker
 *      on-the-go decisions such as whether or not to use them or sell them.
 *
 * Version 1.16: November 24, 2022
 * * Feature Update!
 * ** Updated Plugin Command "Tracker: Show/Hide Window" cases from "Enable"
 *    and "Disable" to "Show" and "Hide". Update made by Arisu.
 *
 * Version 1.15: October 6, 2022
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.14: August 18, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Quest Tracker Settings > Fading > Close Minimum Opacity
 * *** Quest Tracker Settings > Fading > Tracker Fade Speed
 * **** These settings allow you to make the quest tracker become opaque the
 *      moment the player comes near the quest tracker on the screen.
 *
 * Version 1.13: March 10, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.12: July 9, 2021
 * * Feature Update!
 * ** Improved calculations for determining window size. Update made by Irina.
 *
 * Version 1.11: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Feature!
 * ** Added new [[Marker]] to Quest Log format and Quest Tracker formats.
 * *** [[RawTitle]] - Inserts the title of the quest without any text codes
 *     removed. Keep in mind that icons do NOT resize based on the text size.
 *
 * Version 1.10: December 11, 2020
 * * Bugs Fixed!
 * ** Quest tracking should now automatically remove itself once a quest is
 *    dubbed complete, failed, or removed. Fix made by Yanfly.
 *
 * Version 1.09: November 29, 2020
 * * Bug Fixed!
 * ** The Button Assist Window will now properly display the text for expanding
 *    and collapsing quest categories. Fix made by Arisu.
 *
 * Version 1.08: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.07: November 1, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Updates!
 * ** When multiple parallel events are occuring, they will no longer cause lag
 *    by inducing multiple refreshes at a time. Update by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Quest Tracker Settings > Tracker Format
 * **** Text format for Quest Tracker Window. This lets you customize the text
 *      that appears in the Quest Tracker instead of just having the title and
 *      the objectives.
 *
 * Version 1.06: October 25, 2020
 * * Feature Update!
 * ** If Message Core is not detected, <ColorLock> and </ColorLock> notetags
 *    will be automatically removed. Added by Arisu.
 *
 * Version 1.05: October 11, 2020
 * * Documentation Update!
 * ** "Control Variable and Conditional Branch Usage" section added for those
 *    who wish to gather data for the script input fields of the mentioned
 *    event commands.
 *
 * Version 1.04: October 4, 2020
 * * Bug Fixes!
 * ** Quest Tracker window refreshes should no longer cause infinite loops when
 *    used with specific script calls. Fix made by Yanfly.
 *
 * Version 1.03: September 20, 2020
 * * Documentation Update!
 * ** For all the new features!
 * * New Features!
 * ** New notetags added by Olivia!
 * ** <Variable id On Death: +x> and <Variable id On Death: -x> for enemies.
 * ** <Variable id On Gain: +x> and <Variable id On Gain: -x> for items,
 *    weapons, and armors.
 * ** <Variable id On Lose: +x> and <Variable id On Lose: -x> for items,
 *    weapons, and armors.
 * ** <Track With Variable id> for items, weapons, and armors.
 * ** <Variable id On Use: +x> and <Variable id On Use: -x> for items & skills.
 *
 * Version 1.02: September 13, 2020
 * * Bugs Fixed!:
 * ** Quest Tracker Window should no longer flicker.
 *
 * Version 1.01: September 6, 2020
 * * Bug Fixed!
 * ** Disabled track windows no longer appear on the screen for one frame after
 *    leaving a menu of any sort. Fix made by Yanfly.
 * ** Viewing the failed quests no longer crash the game. Fix made by Yanfly.
 * * Feature Update!
 * ** The following Plugin Commands will now automatically update the tracker
 *    if needed. Feature update by Yanfly.
 * *** Quest: Add/Complete/Fail/Remove
 * *** Quest: Description Change
 * *** Quest: Objectives Change
 * *** Quest: Quote Change
 * *** Quest: Rewards Change
 * *** Quest: Subtext Change
 *
 * Version 1.00: August 31, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestSet
 * @text Quest: Add/Complete/Fail/Remove
 * @desc Adds quest(s) to be known/completed/failed.
 * Or removes them.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Add to Known
 * @value known
 * @option Add to Completed
 * @value completed
 * @option Add to Failed
 * @value failed
 * @option Remove from All
 * @value remove
 * @desc Change the status to this.
 * @default known
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestDescription
 * @text Quest: Description Change
 * @desc Changes the description of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Description ID
 * @desc Change the description of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestObjectives
 * @text Quest: Objectives Change
 * @desc Changes the objective(s) status of the quest(s).
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetIDs:arrayeval
 * @text Objective ID(s)
 * @type string[]
 * @desc Select the objective ID(s) to change.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Show Objective(s)
 * @value show
 * @option Complete Objective(s)
 * @value complete
 * @option Fail Objective(s)
 * @value fail
 * @option Remove Objective(s)
 * @value remove
 * @desc Change the status of the objective(s) to this.
 * @default show
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestQuote
 * @text Quest: Quote Change
 * @desc Changes the quote of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Quote ID
 * @desc Change the quote of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestRewards
 * @text Quest: Rewards Change
 * @desc Changes the reward(s) status of the quest(s).
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetIDs:arrayeval
 * @text Reward ID(s)
 * @type string[]
 * @desc Select the reward ID(s) to change.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Show Reward(s)
 * @value show
 * @option Claim Reward(s)
 * @value claim
 * @option Deny Reward(s)
 * @value deny
 * @option Remove Reward(s)
 * @value remove
 * @desc Change the status of the reward(s) to this.
 * @default show
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestSubtext
 * @text Quest: Subtext Change
 * @desc Changes the subtext of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Subtext ID
 * @desc Change the subtext of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Label
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LabelAddQuestLabel
 * @text Label: Add Quest Label
 * @desc Add Quest Labels to target items, weapons, and armors.
 *
 * @arg ItemIDs:arraynum
 * @text Item ID(s)
 * @type item[]
 * @desc Select which Item ID(s) to add Quest Labels to.
 * @default []
 *
 * @arg WeaponIDs:arraynum
 * @text Weapon ID(s)
 * @type weapon[]
 * @desc Select which Weapon ID(s) to add Quest Labels to.
 * @default []
 *
 * @arg ArmorIDs:arraynum
 * @text Armor ID(s)
 * @type armor[]
 * @desc Select which Armor ID(s) to add Quest Labels to.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LabelClearQuestLabel
 * @text Label: Clear Quest Label
 * @desc Clear Quest Labels from target items, weapons, and armors.
 *
 * @arg ItemIDs:arraynum
 * @text Item ID(s)
 * @type item[]
 * @desc Select which Item ID(s) to clear Quest Labels from.
 * @default []
 *
 * @arg WeaponIDs:arraynum
 * @text Weapon ID(s)
 * @type weapon[]
 * @desc Select which Weapon ID(s) to clear Quest Labels from.
 * @default []
 *
 * @arg ArmorIDs:arraynum
 * @text Armor ID(s)
 * @type armor[]
 * @desc Select which Armor ID(s) to clear Quest Labels from.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Tracker
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerChangeQuest
 * @text Tracker: Change Quest
 * @desc Changes the tracked quest.
 *
 * @arg Key:str
 * @text Quest Key
 * @desc Insert the quest key here.
 * @default Example
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerRefreshWindow
 * @text Tracker: Refresh Window
 * @desc Refreshes the quest tracker window.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerShowHide
 * @text Tracker: Show/Hide Window
 * @desc Can forcefully hide window.
 * Showing will depend on the player's Options setting.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides the tracker window on the map.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemCallSceneQuest
 * @text System: Call Scene_Quest
 * @desc Opens Scene_Quest for the player.
 * Does not work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableQuestMenu
 * @text System: Enable Quests in Menu?
 * @desc Enables/disables quest menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables quest menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowQuestMenu
 * @text System: Show Quests in Menu?
 * @desc Shows/hides quest menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides quest menu inside the main menu.
 * @default true
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
 * @param QuestSystem
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
 * @desc General settings for the Quest System.
 * @default {"StartingQuests":"","KnownQuests:arraystr":"[\"Welcome\",\"Example\",\"Plugin_Tutorial_Title\",\"Plugin_Tutorial_Difficulty\",\"Plugin_Tutorial_From\",\"Plugin_Tutorial_Description\",\"Plugin_Tutorial_Objectives\",\"Plugin_Tutorial_Rewards\",\"Plugin_Tutorial_Subtext\",\"Plugin_Tutorial_Quote\",\"Challenge_Plugin_Variables\",\"Challenge_Plugin_Switches\"]","CompletedQuests:arraystr":"[]","FailedQuests:arraystr":"[]","TrackedQuest:str":"Welcome","SceneQuest":"","Vocab":"","VocabCommandWindow":"","CommandWindow_Known_Text:str":"Available","CommandWindow_Completed_Text:str":"Completed","CommandWindow_Failed_Text:str":"Failed","VocabLabelWindow":"","EmptyTitleLabel:str":"\\i[186]Quest Journal","VocabListWindow":"","ListWindowCategoryOpenFmt:str":"- %1(%2)","ListWindowCategoryCloseFmt:str":"+ %1(%2)","NoQuestListed:str":"(No Quests Listed)","ListWindowTrackedQuest:str":"\\c[17]%1\\c[0]","VocabLogWindow":"","LogEmpty:json":"\"\\\\c[5]Main Quests\\\\c[0] are quests that must be\\ncompleted in order to progress further\\ninto the game's story.\\n\\n\\\\c[6]Side Quests\\\\c[0] are optional quests that can\\nbe completed at your discretion. Upon\\ncompleting a side quest, you can receive\\nuseful rewards that may assist you on\\nyour journey.\"","OnLoadQuestJS:func":"\"// Insert JavaScript code here.\"","LogFmt:json":"\"\\\\{[[Title]]\\\\}\\n\\\\c[4]Level:\\\\c[0] [[Difficulty]]\\n\\\\c[4]From:\\\\c[0] [[From]]\\n\\\\c[4]Location:\\\\c[0] [[Location]]\\n\\n\\\\c[4]Description:\\\\c[0]\\n[[Description]]\\n\\n\\\\c[4]Objectives:\\\\c[0]\\n[[Objectives]]\\n\\n\\\\c[4]Rewards:\\\\c[0]\\n[[Rewards]]\\n\\n[[Subtext]]\\n\\n[[Quote]]\"","Objective_Normal_Fmt:str":"◎%1","Objective_Completed_Fmt:str":"\\c[24]<ColorLock>✔%1</ColorLock>\\c[0]","Objective_Failed_Fmt:str":"\\c[25]<ColorLock>✘%1</ColorLock>\\c[0]","Reward_Normal_Fmt:str":"◎%1","Reward_Completed_Fmt:str":"\\c[24]<ColorLock>✔%1</ColorLock>\\c[0]","Reward_Failed_Fmt:str":"\\c[25]<ColorLock>✘%1</ColorLock>\\c[0]","ButtonAssistWindow":"","ButtonAssistPageUpDown:str":"Scroll Up/Down","questButtonAssistActive:str":"Track","ButtonAssistExpand:str":"Expand","ButtonAssistCollapse:str":"Collapse","CommandWindowIcons":"","CommandWindow_Known_Icon:num":"193","CommandWindow_Completed_Icon:num":"192","CommandWindow_Failed_Icon:num":"194"}
 *
 * @param Categories:arraystruct
 * @text Quest Categories
 * @type struct<Category>[]
 * @desc A list of categories and their quests.
 * @default ["{\"CategoryName:str\":\"\\\\C[5]Main Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Welcome\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Welcome Quest\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Thank you for using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplugin made by \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella MZ\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThis is an example quest to demonstrate\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhow the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] works. It functions\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nprimarily as a log book for the various\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nadventures inside your game.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Take a look at the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] menu.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]tracked quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to something else.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[186]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] for your game!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[84]Helping support \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Example\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Example Quest\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is where the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngoes. Type in whatever text you need\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhere in order to explain to the player\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nabout the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Describe each of the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhere for the player.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can have multiple quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nout at once.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If you do, make sure you have the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Visible Objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] list the ID's of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe objectives you want visible from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe very beginning.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Here, you can list all the rewards the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngame will give the player upon the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncompletion of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can list the rewards however you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nlike, but do keep it concise.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can list multiple rewards, too.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If you do, make sure you have the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Visible Rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] list the ID's of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrewards you want visible from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nvery beginning.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is a \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]. It is used as extra\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ntext that you may want to place on your\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest journal that differs from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"We learn by example and by direct\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nexperience because there are real limits\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto the adequacy of verbal instruction.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Malcolm Gladwell\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"CategoryName:str\":\"\\\\c[6]Side Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Title\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Titles\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"The quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is listed in three\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndifferent places in the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Scene\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n1. The top of the screen.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n2. The top of the quest log entry.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n3. The quest list on the side.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nBe sure to put some thought in deciding\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyour titles as they are there to convey\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nwhat the quest is all about.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the title through the quest's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can use icons in the quest title by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[x]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] text code. Keep in mind\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthat the icon will be removed from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest log entry.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A good title is the title of a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsuccessful book.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Raymond Chandler\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Difficulty\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Difficulty\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can be used to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nconvey what kinds of expectations they\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nshould have regarding challenge.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThese can range from star ratings like:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[87]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[87]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nLevel ranges like:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Level 20+\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the difficulty through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A quest's difficulty is often used to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrelay the expected level of conflict a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplayer may face.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A pessimist sees the difficulty in\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nevery opportunity; an optimist sees the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nopportunity in every difficulty.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Winston Churchill\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_From\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]From\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Explaining which \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]NPC\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] the quest is from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncan help remind the player its origin\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nand also help save the player some time\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nin trying to find that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]NPC\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] again when\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngoing to claim the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" text through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]From\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]From\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Use the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] as a means to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstreamline your player's experience.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"More important than the quest for\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncertainty is the quest for clarity.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Francois Gautier\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Description\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Descriptions\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Insert the quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThe displayed \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] will\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndepend on the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Description ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] that is\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncurrently active for the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is the updated quest description. This\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncan only be seen when it is Description ID #2.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Description ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Description Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Description Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Descriptions are valuable tools that can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbe used to help remind the player the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\npurpose of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Description begins in the writer's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nimagination but should finish in the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nreader's.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Stephen King\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Objectives\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Objectives\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium-Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] are used to streamline\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe goals the player needs to achieve in\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\norder to make progress.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the status of each\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Known\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Completed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nor \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]Failed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can also \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]remove\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] objectives from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbeing viewed.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can determine the default \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nobjectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Visible\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nObjectives \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can reveal new \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough the use of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Objectives Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]The following are examples:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Known Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Completed Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Failed Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Objectives Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Treat \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] like a set of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ninstructions or outline for the player\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto follow in order to get the desired\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresult both of you want.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"People with objectives succeed because\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthey know where they're going.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Earl Nightingale\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Plugin_Tutorial_Objectives';\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [5], 'show');\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [6], 'complete');\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [7], 'fail');\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Rewards\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Rewards\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium-Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] are the goodies that are\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\npromised to be given to the player upon\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe completion of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the status of each\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Known\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Claimed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nor \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]Denied\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can also \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]remove\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] rewardsfrom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbeing viewed.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can determine the default \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Visible\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nRewards \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Rewards Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can reveal new \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough the use of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Rewards Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]The following are examples:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Known Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Claimed Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Denied Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Rewards are incentives for the player to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncomplete them, especially quests of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhigher difficulty levels.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Reward the behavior you want repeated.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Larry Winget\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Plugin_Tutorial_Rewards';\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [4], 'show');\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [5], 'claim');\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [6], 'deny');\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Subtext\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Subtexts\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"The \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] section can be used in a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnumber of ways, from hints to summaries,\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto warnings.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nAnd like the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], you can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nchange the text displayed in the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough changing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Subtext ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Subtext ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Subtexts\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can serve as hints, summaries,\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nwarnings, reminders, you name it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"After all, reminding a player to do\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsomething only means you want them to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsucceed at it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A discerning eye needs only a hint, and\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nunderstatement leaves the imagination\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nfree to build its own elaborations.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Russell Page\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Quote\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Quotes\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quotes\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can be used to reference specific\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nlines of dialogue that could help the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplayer understand what's needed to be\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndone.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nOr they could just be \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quotes\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] made by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\njust about anyone.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nAnd like quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]descriptions and quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtexts\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], the quest quotes can also be\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nchanged to display something else based\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\non the quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quote ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Quote ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Quote Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"How you want to use them is up to you.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You miss 100% of the shots you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndon't take.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Micahel Scott\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If at first you don't succeed, then\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nskydiving definitely isn't for you.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Steven Wright\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"CategoryName:str\":\"\\\\c[2]Challenge Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Challenge_Plugin_Variables\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[5]Variables\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game variables are set\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nup to automatically equal the number of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nof the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]first item\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] in the inventory.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThe \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] will automatically set\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nitself to completed if the variable's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nvalue is determined to be over 10.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Obtain \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\v[1]/10x First Database Item!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Knowledge for \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[2]DISCLAIMER:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nKeep in mind that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is NOT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresponsible for your proficiency (or\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\notherwise) of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you get any errors with the custom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncode, it is up to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to fix it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you do not understand how any of this\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsection works, do not be afraid. It's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnot the end of the world.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nYou can still change the status of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quests\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] and its \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusage of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Commands\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst value = $gameParty.numItems($dataItems[1])\\\\\\\\\\\\\\\\nconst status = value >= 10 ? 'completed' : 'known';\\\\\\\\\\\\\\\\nconst key = 'Challenge_Plugin_Variables';\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\n$gameVariables.setValue(1, value);\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [1], status)\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Challenge_Plugin_Switches\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[5]Switches\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game switch 1's ON/OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstatus will determine which description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthis quest will use.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nGame Switch 1 is now \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nDescription ID \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is being used.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game switch 1's ON/OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstatus will determine which description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthis quest will use.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nGame Switch 1 is now \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]ON\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nDescription ID \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is being used.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change Switch 1's ON/OFF status.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"View this quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Knowledge for \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[2]DISCLAIMER:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nKeep in mind that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is NOT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresponsible for your proficiency (or\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\notherwise) of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you get any errors with the custom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncode, it is up to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to fix it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you do not understand how any of this\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsection works, do not be afraid. It's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnot the end of the world.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nYou can still change the status of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quests\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] and its \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusage of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Commands\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Challenge_Plugin_Switches';\\\\\\\\\\\\\\\\nconst id = $gameSwitches.value(1) ? 2 : 1;\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\n$gameSystem.setQuestDescription(key, id)\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}"]
 *
 * @param Label:struct
 * @text Quest Label Settings
 * @type struct<Label>
 * @desc Change how Quest Labels apply to your game project.
 * @default {"Icon:num":"0","Text:str":"QUEST","FontColor:str":"24","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"-12"}
 *
 * @param Tracker:struct
 * @text Quest Tracker Settings
 * @type struct<Tracker>
 * @desc Setup how all the quest tracker works.
 * @default {"General":"","TrackerFmt:json":"\"\\\\{[[Title]]\\\\}\\n[[Objectives]]\"","Options":"","AdjustRect:eval":"true","AddShowOption:eval":"true","ShowName:str":"Show Quest Tracker","AddPositionOption:eval":"true","PositionName:str":"Quest Tracker Position","PositionOff:str":"←","PositionOn:str":"→"}
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Set up the main menu defaults.
 * @default {"Name:str":"Quest","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Quest.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Setup how all the windows appear in-game.
 * @default {"CommandWindow":"","ShowFailed:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CommandWindow_BgType:num":"0","CommandWindow_Rect:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(Window_QuestCommand.prototype.totalCommands(), true);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","QuestLabel":"","QuestLabel_BgType:num":"0","QuestLabel_Rect:func":"\"const ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, false);\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","LogWindow":"","LogWindow_Auto_WordWrap:eval":"false","LogWindow_ScrollSpeed:num":"0.20","LogWindow_BgType:num":"0","LogWindow_Rect:func":"\"const ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.mainAreaHeight() - this.questLabelWindowRect().height;\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop() + this.questLabelWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","ListWindow":"","ListWindow_BgType:num":"0","ListWindow_Rect:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.mainAreaHeight() - this.commandWindowRect().height;\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nconst wy = this.mainAreaTop() + this.commandWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","TrackerWindow":"","TrackerWindow_Scale:num":"0.50","TrackerWindow_BgType:num":"0","TrackerWindow_Rect:func":"\"const ww = 560;\\nconst wh = Graphics.height / Window_QuestTracker.scale;\\nconst wx = this.questTrackerOnRight() ? Graphics.width - Math.ceil(ww * Window_QuestTracker.scale) : 0;\\nconst wy = this.buttonAreaHeight() + 8;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * @param StartingQuests
 * @text Starting Quests
 *
 * @param KnownQuests:arraystr
 * @text Known Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are known at the start of the game?
 * Insert their keys here.
 * @default ["Welcome","Example","Plugin_Tutorial_Title","Plugin_Tutorial_Difficulty","Plugin_Tutorial_From","Plugin_Tutorial_Description","Plugin_Tutorial_Objectives","Plugin_Tutorial_Rewards","Plugin_Tutorial_Subtext","Plugin_Tutorial_Quote","Challenge_Plugin_Variables","Challenge_Plugin_Switches"]
 *
 * @param CompletedQuests:arraystr
 * @text Completed Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are completed at the start of the game?
 * Insert their keys here.
 * @default []
 *
 * @param FailedQuests:arraystr
 * @text Failed Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are failed at the start of the game?
 * Insert their keys here.
 * @default []
 *
 * @param TrackedQuest:str
 * @text Tracked Quest
 * @parent StartingQuests
 * @desc Which quest is tracked at the start of the game?
 * @default Welcome
 *
 * @param SceneQuest
 * @text Scene_Quest
 *
 * @param Vocab
 * @parent SceneQuest
 *
 * @param VocabCommandWindow
 * @text Command Window
 * @parent Vocab
 *
 * @param CommandWindow_Known_Text:str
 * @text Command: Known
 * @parent VocabCommandWindow
 * @desc Text used to display known quests.
 * @default Available
 *
 * @param CommandWindow_Completed_Text:str
 * @text Command: Completed
 * @parent VocabCommandWindow
 * @desc Text used to display completed quests.
 * @default Completed
 *
 * @param CommandWindow_Failed_Text:str
 * @text Command: Failed
 * @parent VocabCommandWindow
 * @desc Text used to display failed quests.
 * @default Failed
 *
 * @param VocabLabelWindow
 * @text Label Window
 * @parent Vocab
 *
 * @param EmptyTitleLabel:str
 * @text Empty Title
 * @parent VocabLabelWindow
 * @desc Text displayed in the Label Window when no quest is selected.
 * @default \i[186]Quest Journal
 *
 * @param VocabListWindow
 * @text List Window
 * @parent Vocab
 *
 * @param ListWindowCategoryOpenFmt:str
 * @text Open Categories
 * @parent VocabListWindow
 * @desc Text format for an open category.
 * %1 - Category Name, %2 - Quest Amount
 * @default - %1(%2)
 *
 * @param ListWindowCategoryCloseFmt:str
 * @text Closed Categories
 * @parent VocabListWindow
 * @desc Text format for a closed category.
 * %1 - Category Name, %2 - Quest Amount
 * @default + %1(%2)
 *
 * @param NoQuestListed:str
 * @text No Quest Listed
 * @parent VocabListWindow
 * @desc Text when no quest is listed.
 * @default (No Quests Listed)
 *
 * @param ListWindowTrackedQuest:str
 * @text Tracked Quest
 * @parent VocabListWindow
 * @desc Text format for a tracked quest.
 * %1 - Tracked Quest's Name
 * @default \c[17]%1\c[0]
 *
 * @param VocabLogWindow
 * @text Log Window
 * @parent Vocab
 *
 * @param LogEmpty:json
 * @text Empty Message
 * @parent VocabLogWindow
 * @type note
 * @desc Text displayed when no quest is selected.
 * @default "\\c[5]Main Quests\\c[0] are quests that must be\ncompleted in order to progress further\ninto the game's story.\n\n\\c[6]Side Quests\\c[0] are optional quests that can\nbe completed at your discretion. Upon\ncompleting a side quest, you can receive\nuseful rewards that may assist you on\nyour journey."
 *
 * @param OnLoadQuestJS:func
 * @text JS: On Load
 * @parent LogEmpty:json
 * @type note
 * @desc Runs code upon making the empty message.
 * Useful for setting up variables.
 * @default "// Insert JavaScript code here."
 *
 * @param LogFmt:json
 * @text Quest Log
 * @parent VocabLogWindow
 * @type note
 * @desc Text format for Quest Log Window.
 * Read help file for instructions.
 * @default "\\{[[Title]]\\}\n\\c[4]Level:\\c[0] [[Difficulty]]\n\\c[4]From:\\c[0] [[From]]\n\\c[4]Location:\\c[0] [[Location]]\n\n\\c[4]Description:\\c[0]\n[[Description]]\n\n\\c[4]Objectives:\\c[0]\n[[Objectives]]\n\n\\c[4]Rewards:\\c[0]\n[[Rewards]]\n\n[[Subtext]]\n\n[[Quote]]"
 *
 * @param Objective_Normal_Fmt:str
 * @text Objective (Known)
 * @parent LogFmt:json
 * @desc Text format for known objectives.
 * %1 - Objective Text
 * @default ◎%1
 *
 * @param Objective_Completed_Fmt:str
 * @text Objective (Done)
 * @parent LogFmt:json
 * @desc Text format for complete objectives.
 * %1 - Objective Text
 * @default \c[24]<ColorLock>✔%1</ColorLock>\c[0]
 *
 * @param Objective_Failed_Fmt:str
 * @text Objective (Failed)
 * @parent LogFmt:json
 * @desc Text format for failed objectives.
 * %1 - Objective Text
 * @default \c[25]<ColorLock>✘%1</ColorLock>\c[0]
 *
 * @param Reward_Normal_Fmt:str
 * @text Reward (Known)
 * @parent LogFmt:json
 * @desc Text format for normal rewards.
 * %1 - Reward Text
 * @default ◎%1
 *
 * @param Reward_Completed_Fmt:str
 * @text Reward (Claimed)
 * @parent LogFmt:json
 * @desc Text format for claimed rewards.
 * %1 - Reward Text
 * @default \c[24]<ColorLock>✔%1</ColorLock>\c[0]
 *
 * @param Reward_Failed_Fmt:str
 * @text Reward (Denied)
 * @parent LogFmt:json
 * @desc Text format for denied rewards.
 * %1 - Reward Text
 * @default \c[25]<ColorLock>✘%1</ColorLock>\c[0]
 *
 * @param ButtonAssistWindow
 * @text Button Assist Window
 * @parent Vocab
 *
 * @param ButtonAssistPageUpDown:str
 * @text Scroll Up/Down
 * @parent ButtonAssistWindow
 * @desc Text for Page Up/Down to scroll log window.
 * Requires VisuMZ_0_CoreEngine!
 * @default Scroll Up/Down
 *
 * @param questButtonAssistActive:str
 * @text Tracker
 * @parent ButtonAssistWindow
 * @desc Text for tracking quests.
 * Requires VisuMZ_0_CoreEngine!
 * @default Track
 *
 * @param ButtonAssistExpand:str
 * @text Expand
 * @parent ButtonAssistWindow
 * @desc Text for expanding categories.
 * Requires VisuMZ_0_CoreEngine!
 * @default Expand
 *
 * @param ButtonAssistCollapse:str
 * @text Collapse
 * @parent ButtonAssistWindow
 * @desc Text for collapsing categories.
 * Requires VisuMZ_0_CoreEngine!
 * @default Collapse
 *
 * @param CommandWindowIcons
 * @text Icons
 * @parent SceneQuest
 *
 * @param CommandWindow_Known_Icon:num
 * @text Icon: Known
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 193
 *
 * @param CommandWindow_Completed_Icon:num
 * @text Icon: Completed
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 192
 *
 * @param CommandWindow_Failed_Icon:num
 * @text Icon: Failed
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 194
 *
 */
/* ----------------------------------------------------------------------------
 * Quest Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param CategoryName:str
 * @text Category Name
 * @desc This category's name.
 * You may use text codes.
 * @default Untitled
 *
 * @param Quests:arraystruct
 * @text Quests
 * @type struct<Quest>[]
 * @desc A list of quests listed under this category.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Individual Quest Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Quest:
 *
 * @param Key:str
 * @text Quest ID Key
 * @desc This quest's identification key. Quests require
 * unique keys for the plugin to differentiate them.
 * @default (Needs Key)
 *
 * @param Header
 *
 * @param Title:str
 * @text Title
 * @parent Header
 * @desc The title of the quest. This is what appears in-game.
 * You may use text codes.
 * @default \i[87]Untitled Quest
 *
 * @param Difficulty:str
 * @text Difficulty
 * @parent Header
 * @desc Difficulty level for this quest.
 * You may use text codes.
 * @default Easy Peasy
 *
 * @param From:str
 * @text From
 * @parent Header
 * @desc Insert the name of the one who issued this quest.
 * You may use text codes.
 * @default NPC Name
 *
 * @param Location:str
 * @text Location
 * @parent Header
 * @desc Insert location name where this quest was issued.
 * You may use text codes.
 * @default Location Name
 *
 * @param Description:arrayjson
 * @text Description
 * @parent Header
 * @type note[]
 * @desc Type out the description(s) used for this quest.
 * You may use text codes.
 * @default ["\"This is the \\\\c[4]default\\\\c[0] quest description.\"","\"This is the \\\\c[4]default\\\\c[0] quest description.\\n\\nYou can insert multiple description entries in case you\\never want to update the quest description midway while the\\nquest is in progress.\""]
 *
 * @param Lists
 *
 * @param Objectives:arrayjson
 * @text Objectives List
 * @parent Lists
 * @type note[]
 * @desc The objectives to be completed for this quest.
 * You may use text codes.
 * @default ["\"\\\\c[4]First\\\\c[0] objective to be cleared.\"","\"\\\\c[4]Second\\\\c[0] objective, but it's hidden.\"","\"To make other objectives appear,\\nenable them through the \\\\c[4]'Visible\\nObjectives'\\\\c[0] plugin parameter or by\\nusing a plugin command to make\\nthem appear\""]
 *
 * @param VisibleObjectives:arraynum
 * @text Visible Objectives
 * @parent Objectives:arrayjson
 * @type number[]
 * @min 1
 * @desc The objectives that are visible from the start.
 * @default ["1"]
 *
 * @param Rewards:arrayjson
 * @text Rewards List
 * @parent Lists
 * @type note[]
 * @desc The reward list for this quest.
 * You may use text codes.
 * @default ["\"\\\\i[176]Potion x5\"","\"\\\\i[178]Ether x3\"","\"To make other rewards appear,\\nenable them through the \\\\c[4]'Visible\\nRewards'\\\\c[0] plugin parameter or by\\nusing a plugin command to make\\nthem appear\""]
 *
 * @param VisibleRewards:arraynum
 * @text Visible Rewards
 * @parent Rewards:arrayjson
 * @type number[]
 * @min 1
 * @desc The rewards that are visible from the start.
 * @default ["1"]
 *
 * @param Footer
 *
 * @param Subtext:arrayjson
 * @text Subtext
 * @parent Footer
 * @type note[]
 * @desc Subtext to be displayed with the quest.
 * You may use text codes.
 * @default ["\"\"","\"This is a \\\\c[4]subtext\\\\c[0]. It is used as extra\\ntext that you may want to place on your\\nquest journal that differs from the\\n\\\\c[4]description\\\\c[0].\""]
 *
 * @param Quotes:arrayjson
 * @text Quotes
 * @parent Footer
 * @type note[]
 * @desc Quotes to be displayed with the quest.
 * You may use text codes.
 * @default ["\"\"","\"Insert the quotes of NPC's here.\""]
 *
 * @param JavaScript
 *
 * @param OnLoadQuestJS:func
 * @text JS: On Load
 * @parent JavaScript
 * @type note
 * @desc Runs code upon loading the quest in Scene_Quest.
 * Useful for setting up variables.
 * @default "// Insert JavaScript code here."
 *
 */
/* ----------------------------------------------------------------------------
 * Quest Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the Quest Label.
 * @default QUEST
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the Quest Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the Quest text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the Quest Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the Quest Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the Quest Label's Y position by.
 * @default -12
 *
 */
/* ----------------------------------------------------------------------------
 * Quest Tracker Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tracker:
 *
 * @param General
 *
 * @param TrackerFmt:json
 * @text Tracker Format
 * @parent General
 * @type note
 * @desc Text format for Quest Tracker Window.
 * Read help file for instructions.
 * @default "\\{[[Title]]\\}\n[[Objectives]]"
 *
 * @param Fading
 *
 * @param MinTrackerOpacity:num
 * @text Close Minimum Opacity
 * @parent Fading
 * @type number
 * @min 0
 * @desc Minimum opacity when the player is too close to the
 * quest tracker on the map screen.
 * @default 128
 *
 * @param TrackerFadeSpeed:num
 * @text Tracker Fade Speed
 * @parent Fading
 * @type number
 * @min 1
 * @desc Fade speed of the tracker when toggled on/off.
 * Lower is slower. Higher is faster.
 * @default 16
 *
 * @param Options
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param AddShowOption:eval
 * @text Add Show Tracker?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Tracker' option to the Options menu?
 * @default true
 *
 * @param ShowName:str
 * @text Option Name
 * @parent AddShowOption:eval
 * @desc Command name of the option.
 * @default Show Quest Tracker
 *
 * @param AddPositionOption:eval
 * @text Add Position Tracker?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Position Tracker' option to the Options menu?
 * @default true
 *
 * @param PositionName:str
 * @text Option Name
 * @parent AddPositionOption:eval
 * @desc Command name of the option.
 * @default Quest Tracker Position
 *
 * @param PositionOff:str
 * @text Option OFF
 * @parent AddPositionOption:eval
 * @desc Text displayed when the option is OFF.
 * @default ←
 *
 * @param PositionOn:str
 * @text Option ON
 * @parent AddPositionOption:eval
 * @desc Text displayed when the option is ON.
 * @default →
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Quest' option in the Main Menu.
 * @default Quest
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Quest' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Quest' option to the Main Menu by default?
 * @default true
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
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param ShowFailed:eval
 * @text Show Failed Quests?
 * @parent CommandWindow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show/hide Failed Quests in the command window.
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent CommandWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent CommandWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CommandWindow_BgType:num
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
 * @param CommandWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(Window_QuestCommand.prototype.totalCommands(), true);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param QuestLabel
 * @text Quest Label
 *
 * @param QuestLabel_BgType:num
 * @text Background Type
 * @parent QuestLabel
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
 * @param QuestLabel_Rect:func
 * @text JS: X, Y, W, H
 * @parent QuestLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, false);\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param LogWindow
 * @text Log Window
 *
 * @param LogWindow_ScrollSpeed:num
 * @text PageUp/Down Speed
 * @parent LogWindow
 * @desc Scroll speed for PageUp/Down.
 * @default 0.20
 *
 * @param LogWindow_BgType:num
 * @text Background Type
 * @parent LogWindow
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
 * @param LogWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent LogWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.mainAreaHeight() - this.questLabelWindowRect().height;\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop() + this.questLabelWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param LogWindowExperimental
 * @text EXPERIMENTAL
 * @parent LogWindow
 *
 * @param LogWindow_Auto_WordWrap:eval
 * @text Automatic Word Wrap?
 * @parent LogWindowExperimental
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables automatic word wrap.
 * Requires VisuMZ_1_MessageCore!
 * @default false
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindow_BgType:num
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
 * @param ListWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.mainAreaHeight() - this.commandWindowRect().height;\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nconst wy = this.mainAreaTop() + this.commandWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param TrackerWindow
 * @text Tracker Window
 *
 * @param TrackerWindow_Scale:num
 * @text Window Scale
 * @parent TrackerWindow
 * @desc How much do you want to scale the Tracker Window's size by?
 * @default 0.50
 *
 * @param TrackerWindow_BgType:num
 * @text Background Type
 * @parent TrackerWindow
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
 * @param TrackerWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent TrackerWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = 560;\nconst wh = Graphics.height / Window_QuestTracker.scale;\nconst wx = this.questTrackerOnRight() ? Graphics.width - Math.ceil(ww * Window_QuestTracker.scale) : 0;\nconst wy = this.buttonAreaHeight() + 8;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

var tier = tier || 0x0;
var dependencies = [];
var pluginData = $plugins.filter(function (_0x504797) {
  return _0x504797.status && _0x504797.description.includes("[QuestSystem]");
})[0x0];
VisuMZ.QuestSystem.Settings = VisuMZ.QuestSystem.Settings || {};
VisuMZ.ConvertParams = function (_0x12c958, _0x209e7e) {
  for (const _0x4d57ca in _0x209e7e) {
    if (_0x4d57ca.match(/(.*):(.*)/i)) {
      const _0x3e7f42 = String(RegExp.$1);
      const _0x1776ff = String(RegExp.$2).toUpperCase().trim();
      let _0x5e139a;
      let _0x4910b1;
      let _0x358715;
      switch (_0x1776ff) {
        case "NUM":
          _0x5e139a =
            _0x209e7e[_0x4d57ca] !== "" ? Number(_0x209e7e[_0x4d57ca]) : 0x0;
          break;
        case "ARRAYNUM":
          _0x4910b1 =
            _0x209e7e[_0x4d57ca] !== "" ? JSON.parse(_0x209e7e[_0x4d57ca]) : [];
          _0x5e139a = _0x4910b1.map((_0x55da5c) => Number(_0x55da5c));
          break;
        case "EVAL":
          _0x5e139a =
            _0x209e7e[_0x4d57ca] !== "" ? eval(_0x209e7e[_0x4d57ca]) : null;
          break;
        case "ARRAYEVAL":
          _0x4910b1 =
            _0x209e7e[_0x4d57ca] !== "" ? JSON.parse(_0x209e7e[_0x4d57ca]) : [];
          _0x5e139a = _0x4910b1.map((_0x2c2ace) => eval(_0x2c2ace));
          break;
        case "JSON":
          _0x5e139a =
            _0x209e7e[_0x4d57ca] !== "" ? JSON.parse(_0x209e7e[_0x4d57ca]) : "";
          break;
        case "ARRAYJSON":
          _0x4910b1 =
            _0x209e7e[_0x4d57ca] !== "" ? JSON.parse(_0x209e7e[_0x4d57ca]) : [];
          _0x5e139a = _0x4910b1.map((_0x92047f) => JSON.parse(_0x92047f));
          break;
        case "FUNC":
          _0x5e139a =
            _0x209e7e[_0x4d57ca] !== ""
              ? new Function(JSON.parse(_0x209e7e[_0x4d57ca]))
              : new Function("return 0");
          break;
        case "ARRAYFUNC":
          _0x4910b1 =
            _0x209e7e[_0x4d57ca] !== "" ? JSON.parse(_0x209e7e[_0x4d57ca]) : [];
          _0x5e139a = _0x4910b1.map(
            (_0x445d04) => new Function(JSON.parse(_0x445d04))
          );
          break;
        case "STR":
          _0x5e139a =
            _0x209e7e[_0x4d57ca] !== "" ? String(_0x209e7e[_0x4d57ca]) : "";
          break;
        case "ARRAYSTR":
          _0x4910b1 =
            _0x209e7e[_0x4d57ca] !== "" ? JSON.parse(_0x209e7e[_0x4d57ca]) : [];
          _0x5e139a = _0x4910b1.map((_0x2d1be9) => String(_0x2d1be9));
          break;
        case "STRUCT":
          _0x358715 =
            _0x209e7e[_0x4d57ca] !== "" ? JSON.parse(_0x209e7e[_0x4d57ca]) : {};
          _0x5e139a = VisuMZ.ConvertParams({}, _0x358715);
          break;
        case "ARRAYSTRUCT":
          _0x4910b1 =
            _0x209e7e[_0x4d57ca] !== "" ? JSON.parse(_0x209e7e[_0x4d57ca]) : [];
          _0x5e139a = _0x4910b1.map((_0x5dd0b3) =>
            VisuMZ.ConvertParams({}, JSON.parse(_0x5dd0b3))
          );
          break;
        default:
          continue;
      }
      _0x12c958[_0x3e7f42] = _0x5e139a;
    }
  }
  return _0x12c958;
};
((_0x1d8b38) => {
  const _0x5c7280 = _0x1d8b38.name;
  for (const _0x3b7e8b of dependencies) {
    if (!Imported[_0x3b7e8b]) {
      alert(
        "%1 is missing a required plugin.\nPlease install %2 into the Plugin Manager.".format(
          _0x5c7280,
          _0x3b7e8b
        )
      );
      SceneManager.exit();
      break;
    }
  }
  const _0x5cc005 = _0x1d8b38.description;
  if (_0x5cc005.match(/\[Version[ ](.*?)\]/i)) {
    const _0x29033c = Number(RegExp.$1);
    if (_0x29033c !== VisuMZ.QuestSystem.version) {
      alert(
        "%1's version does not match plugin's. Please update it in the Plugin Manager.".format(
          _0x5c7280,
          _0x29033c
        )
      );
      SceneManager.exit();
    }
  }
  if (_0x5cc005.match(/\[Tier[ ](\d+)\]/i)) {
    const _0x54522d = Number(RegExp.$1);
    if (_0x54522d < tier) {
      alert(
        "%1 is incorrectly placed on the plugin list.\nIt is a Tier %2 plugin placed over other Tier %3 plugins.\nPlease reorder the plugin list from smallest to largest tier numbers.".format(
          _0x5c7280,
          _0x54522d,
          tier
        )
      );
      SceneManager.exit();
    } else {
      tier = Math.max(_0x54522d, tier);
    }
  }
  VisuMZ.ConvertParams(VisuMZ.QuestSystem.Settings, _0x1d8b38.parameters);
})(pluginData);
PluginManager.registerCommand(
  pluginData.name,
  "LabelAddQuestLabel",
  (_0x5bd3a0) => {
    VisuMZ.ConvertParams(_0x5bd3a0, _0x5bd3a0);
    const _0x4dd6d3 = _0x5bd3a0.ItemIDs;
    const _0x31b776 = _0x5bd3a0.WeaponIDs;
    const _0x57ddda = _0x5bd3a0.ArmorIDs;
    for (const _0x16b406 of _0x4dd6d3) {
      const _0x2c7529 = $dataItems[_0x16b406];
      if (_0x2c7529) {
        $gameParty.setQuestLabelItem(_0x2c7529);
      }
    }
    for (const _0x267736 of _0x31b776) {
      const _0x584ab7 = $dataWeapons[_0x267736];
      if (_0x584ab7) {
        $gameParty.setQuestLabelItem(_0x584ab7);
      }
    }
    for (const _0x48c46e of _0x57ddda) {
      const _0x19b72b = $dataArmors[_0x48c46e];
      if (_0x19b72b) {
        $gameParty.setQuestLabelItem(_0x19b72b);
      }
    }
  }
);
PluginManager.registerCommand(
  pluginData.name,
  "LabelClearQuestLabel",
  (_0x562519) => {
    VisuMZ.ConvertParams(_0x562519, _0x562519);
    const _0x576b9a = _0x562519.ItemIDs;
    const _0x400cbb = _0x562519.WeaponIDs;
    const _0xfb19b4 = _0x562519.ArmorIDs;
    for (const _0x2c513d of _0x576b9a) {
      const _0x20e398 = $dataItems[_0x2c513d];
      if (_0x20e398) {
        $gameParty.clearQuestLabelItem(_0x20e398);
      }
    }
    for (const _0x5a019d of _0x400cbb) {
      const _0x531af2 = $dataWeapons[_0x5a019d];
      if (_0x531af2) {
        $gameParty.clearQuestLabelItem(_0x531af2);
      }
    }
    for (const _0xbb8a3e of _0xfb19b4) {
      const _0x2d3c5f = $dataArmors[_0xbb8a3e];
      if (_0x2d3c5f) {
        $gameParty.clearQuestLabelItem(_0x2d3c5f);
      }
    }
  }
);
PluginManager.registerCommand(pluginData.name, "QuestSet", (_0x50647f) => {
  VisuMZ.ConvertParams(_0x50647f, _0x50647f);
  const _0x154c72 = _0x50647f.Keys;
  const _0x3a6156 = _0x50647f.Status;
  for (const _0x47dfb6 of _0x154c72) {
    $gameSystem.setQuestStatus(_0x47dfb6, _0x3a6156);
  }
  if (SceneManager.isSceneMap()) {
    SceneManager._scene.refreshQuestTrackerWindow();
  }
});
PluginManager.registerCommand(
  pluginData.name,
  "QuestDescription",
  (_0x29a38c) => {
    VisuMZ.ConvertParams(_0x29a38c, _0x29a38c);
    const _0x5b10d6 = _0x29a38c.Keys;
    const _0x4c2ddf = _0x29a38c.TargetID;
    for (const _0x440b5a of _0x5b10d6) {
      $gameSystem.setQuestDescription(_0x440b5a, _0x4c2ddf);
    }
    if (SceneManager.isSceneMap()) {
      SceneManager._scene.refreshQuestTrackerWindow();
    }
  }
);
PluginManager.registerCommand(
  pluginData.name,
  "QuestObjectives",
  (_0x139030) => {
    VisuMZ.ConvertParams(_0x139030, _0x139030);
    const _0x1bb595 = _0x139030.Keys;
    const _0x516595 = _0x139030.TargetIDs;
    const _0x5c3537 = _0x139030.Status;
    for (const _0x1e0bd9 of _0x1bb595) {
      $gameSystem.setQuestObjectives(_0x1e0bd9, _0x516595, _0x5c3537);
    }
    if (SceneManager.isSceneMap()) {
      SceneManager._scene.refreshQuestTrackerWindow();
    }
  }
);
PluginManager.registerCommand(pluginData.name, "QuestQuote", (_0x33e9dd) => {
  VisuMZ.ConvertParams(_0x33e9dd, _0x33e9dd);
  const _0x419e25 = _0x33e9dd.Keys;
  const _0x5a7e11 = _0x33e9dd.TargetID;
  for (const _0x2f6505 of _0x419e25) {
    $gameSystem.setQuestQuote(_0x2f6505, _0x5a7e11);
  }
  if (SceneManager.isSceneMap()) {
    SceneManager._scene.refreshQuestTrackerWindow();
  }
});
PluginManager.registerCommand(pluginData.name, "QuestRewards", (_0x5406b6) => {
  VisuMZ.ConvertParams(_0x5406b6, _0x5406b6);
  const _0x634874 = _0x5406b6.Keys;
  const _0x403687 = _0x5406b6.TargetIDs;
  const _0x2dd521 = _0x5406b6.Status;
  for (const _0x3f490a of _0x634874) {
    $gameSystem.setQuestRewards(_0x3f490a, _0x403687, _0x2dd521);
  }
  if (SceneManager.isSceneMap()) {
    SceneManager._scene.refreshQuestTrackerWindow();
  }
});
PluginManager.registerCommand(pluginData.name, "QuestSubtext", (_0x888cc6) => {
  VisuMZ.ConvertParams(_0x888cc6, _0x888cc6);
  const _0x422ffe = _0x888cc6.Keys;
  const _0x5d54fb = _0x888cc6.TargetID;
  for (const _0x3d86c0 of _0x422ffe) {
    $gameSystem.setQuestSubtext(_0x3d86c0, _0x5d54fb);
  }
  if (SceneManager.isSceneMap()) {
    SceneManager._scene.refreshQuestTrackerWindow();
  }
});
PluginManager.registerCommand(
  pluginData.name,
  "TrackerChangeQuest",
  (_0x1fd674) => {
    VisuMZ.ConvertParams(_0x1fd674, _0x1fd674);
    const _0x34c0a1 = _0x1fd674.Key;
    $gameSystem.setTrackedQuest(_0x34c0a1);
    if (SceneManager.isSceneMap()) {
      SceneManager._scene.refreshQuestTrackerWindow();
    }
  }
);
PluginManager.registerCommand(
  pluginData.name,
  "TrackerRefreshWindow",
  (_0x173526) => {
    if (!SceneManager.isSceneMap()) {
      return;
    }
    SceneManager._scene.refreshQuestTrackerWindow();
  }
);
PluginManager.registerCommand(
  pluginData.name,
  "TrackerShowHide",
  (_0x4a446f) => {
    VisuMZ.ConvertParams(_0x4a446f, _0x4a446f);
    $gameSystem.setQuestTrackerVisible(_0x4a446f.Show);
    if (SceneManager.isSceneMap()) {
      SceneManager._scene.refreshQuestTrackerWindow();
    }
  }
);
PluginManager.registerCommand(
  pluginData.name,
  "SystemCallSceneQuest",
  (_0x25c5f4) => {
    if ($gameParty.inBattle()) {
      return;
    }
    SceneManager.push(Scene_Quest);
  }
);
PluginManager.registerCommand(
  pluginData.name,
  "SystemEnableQuestMenu",
  (_0x350e2f) => {
    VisuMZ.ConvertParams(_0x350e2f, _0x350e2f);
    $gameSystem.questData().enabled = _0x350e2f.Enable;
  }
);
PluginManager.registerCommand(
  pluginData.name,
  "SystemShowQuestMenu",
  (_0x1ef4ef) => {
    VisuMZ.ConvertParams(_0x1ef4ef, _0x1ef4ef);
    $gameSystem.questData().shown = _0x1ef4ef.Show;
  }
);
VisuMZ.QuestSystem.Scene_Boot_onDatabaseLoaded =
  Scene_Boot.prototype.onDatabaseLoaded;
Scene_Boot.prototype.onDatabaseLoaded = function () {
  VisuMZ.QuestSystem.Scene_Boot_onDatabaseLoaded.call(this);
  this.process_VisuMZ_QuestSystem_Data();
};
VisuMZ.QuestSystem.QuestOrder = [];
VisuMZ.QuestSystem.QuestData = {};
Scene_Boot.prototype.process_VisuMZ_QuestSystem_Data = function () {
  for (const _0xb844be of VisuMZ.QuestSystem.Settings.Categories) {
    if (!_0xb844be) {
      continue;
    }
    for (const _0x401ee6 of _0xb844be.Quests) {
      if (!_0x401ee6) {
        continue;
      }
      _0x401ee6.category = _0xb844be;
      _0x401ee6.Description.unshift("");
      _0x401ee6.Objectives.unshift("");
      _0x401ee6.Rewards.unshift("");
      _0x401ee6.Subtext.unshift("");
      _0x401ee6.Quotes.unshift("");
      const _0x363f39 = _0x401ee6.Key.toUpperCase().trim();
      VisuMZ.QuestSystem.QuestOrder.push(_0x363f39);
      VisuMZ.QuestSystem.QuestData[_0x363f39] = _0x401ee6;
    }
  }
};
ConfigManager.questTrackerShow = true;
ConfigManager.questTrackerPosition = true;
VisuMZ.QuestSystem.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function () {
  const _0x113d6a = VisuMZ.QuestSystem.ConfigManager_makeData.call(this);
  _0x113d6a.questTrackerShow = this.questTrackerShow;
  _0x113d6a.questTrackerPosition = this.questTrackerPosition;
  return _0x113d6a;
};
VisuMZ.QuestSystem.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function (_0xc9e766) {
  VisuMZ.QuestSystem.ConfigManager_applyData.call(this, _0xc9e766);
  if ("questTrackerShow" in _0xc9e766) {
    this.questTrackerShow = _0xc9e766.questTrackerShow;
  } else {
    this.questTrackerShow = true;
  }
  if ("questTrackerPosition" in _0xc9e766) {
    this.questTrackerPosition = _0xc9e766.questTrackerPosition;
  } else {
    this.questTrackerPosition = true;
  }
};
ImageManager.questKnownIcon =
  VisuMZ.QuestSystem.Settings.General.CommandWindow_Known_Icon;
ImageManager.questCompletedIcon =
  VisuMZ.QuestSystem.Settings.General.CommandWindow_Completed_Icon;
ImageManager.questFailedIcon =
  VisuMZ.QuestSystem.Settings.General.CommandWindow_Failed_Icon;
TextManager.questCommandName = VisuMZ.QuestSystem.Settings.MainMenu.Name;
TextManager.questKnownCmd =
  VisuMZ.QuestSystem.Settings.General.CommandWindow_Known_Text;
TextManager.questCompletedCmd =
  VisuMZ.QuestSystem.Settings.General.CommandWindow_Completed_Text;
TextManager.questFailedCmd =
  VisuMZ.QuestSystem.Settings.General.CommandWindow_Failed_Text;
TextManager.questCategoryOpenedFmt =
  VisuMZ.QuestSystem.Settings.General.ListWindowCategoryOpenFmt;
TextManager.questCategoryClosedFmt =
  VisuMZ.QuestSystem.Settings.General.ListWindowCategoryCloseFmt;
TextManager.noQuestsLabel = VisuMZ.QuestSystem.Settings.General.EmptyTitleLabel;
TextManager.noQuestsListed = VisuMZ.QuestSystem.Settings.General.NoQuestListed;
TextManager.questLogFmt = VisuMZ.QuestSystem.Settings.General.LogFmt;
TextManager.questEmptyText = VisuMZ.QuestSystem.Settings.General.LogEmpty;
TextManager.questObjectiveNormalFmt =
  VisuMZ.QuestSystem.Settings.General.Objective_Normal_Fmt;
TextManager.questObjectiveClearedFmt =
  VisuMZ.QuestSystem.Settings.General.Objective_Completed_Fmt;
TextManager.questObjectiveFailedFmt =
  VisuMZ.QuestSystem.Settings.General.Objective_Failed_Fmt;
TextManager.questRewardsNormalFmt =
  VisuMZ.QuestSystem.Settings.General.Reward_Normal_Fmt;
TextManager.questRewardsClaimedFmt =
  VisuMZ.QuestSystem.Settings.General.Reward_Completed_Fmt;
TextManager.questRewardsDeniedFmt =
  VisuMZ.QuestSystem.Settings.General.Reward_Failed_Fmt;
TextManager.questButtonAssistPageUpDn =
  VisuMZ.QuestSystem.Settings.General.ButtonAssistPageUpDown;
TextManager.questButtonAssistActive =
  VisuMZ.QuestSystem.Settings.General.questButtonAssistActive;
TextManager.questButtonAssistExpand =
  VisuMZ.QuestSystem.Settings.General.ButtonAssistExpand;
TextManager.questButtonAssistCollapse =
  VisuMZ.QuestSystem.Settings.General.ButtonAssistCollapse;
TextManager.defaultQuestTrackerFmt = "\n\\{[[Title]]\\}\n[[Objectives]]\n";
TextManager.questTrackerFmt =
  VisuMZ.QuestSystem.Settings.Tracker.TrackerFmt ||
  TextManager.defaultQuestTrackerFmt;
TextManager.questTrackedQuestFmt =
  VisuMZ.QuestSystem.Settings.General.ListWindowTrackedQuest;
TextManager.questTrackerShow = VisuMZ.QuestSystem.Settings.Tracker.ShowName;
TextManager.questTrackerPosition =
  VisuMZ.QuestSystem.Settings.Tracker.PositionName;
TextManager.questTrackerPosOff =
  VisuMZ.QuestSystem.Settings.Tracker.PositionOff;
TextManager.questTrackerPosOn = VisuMZ.QuestSystem.Settings.Tracker.PositionOn;
SceneManager.isSceneMap = function () {
  return this._scene && this._scene.constructor === Scene_Map;
};
VisuMZ.QuestSystem.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
  VisuMZ.QuestSystem.Game_System_initialize.call(this);
  this.initQuestSystem();
};
Game_System.prototype.initQuestSystem = function () {
  const _0x28cf20 = VisuMZ.QuestSystem.Settings.General;
  const _0x113c32 = VisuMZ.QuestSystem.Settings.MainMenu;
  this._quests = {
    shown: _0x113c32.ShowMainMenu,
    enabled: _0x113c32.EnableMainMenu,
    known: [],
    completed: [],
    failed: [],
    description: {},
    objectives: {},
    objectivesCompleted: {},
    objectivesFailed: {},
    rewards: {},
    rewardsClaimed: {},
    rewardsDenied: {},
    subtext: {},
    quotes: {},
    tracked: _0x28cf20.TrackedQuest.toUpperCase().trim(),
    showTracker: true,
  };
  for (const _0x54097d of _0x28cf20.KnownQuests) {
    this.setQuestStatus(_0x54097d, "known");
  }
  for (const _0x139ef1 of _0x28cf20.CompletedQuests) {
    this.setQuestStatus(_0x139ef1, "completed");
  }
  for (const _0x343af6 of _0x28cf20.FailedQuests) {
    this.setQuestStatus(_0x343af6, "failed");
  }
};
Game_System.prototype.quest = function (_0x59ff50) {
  _0x59ff50 = _0x59ff50.toUpperCase().trim();
  return VisuMZ.QuestSystem.QuestData[_0x59ff50];
};
Game_System.prototype.questData = function () {
  if (this._quests === undefined) {
    this.initQuestSystem();
  }
  return this._quests;
};
Game_System.prototype.isquestMenuShown = function () {
  return this.questData().shown;
};
Game_System.prototype.isquestMenuEnabled = function () {
  return this.questData().enabled;
};
Game_System.prototype.setQuestStatus = function (_0x466d1a, _0x2208f1) {
  _0x466d1a = _0x466d1a.toUpperCase().trim();
  if (!VisuMZ.QuestSystem.QuestData[_0x466d1a]) {
    return;
  }
  const _0x1b9648 = this.questData();
  _0x1b9648.known = _0x1b9648.known || [];
  _0x1b9648.completed = _0x1b9648.completed || [];
  _0x1b9648.failed = _0x1b9648.failed || [];
  _0x1b9648.known.remove(_0x466d1a);
  _0x1b9648.completed.remove(_0x466d1a);
  _0x1b9648.failed.remove(_0x466d1a);
  if (_0x2208f1 !== "remove") {
    _0x1b9648[_0x2208f1].push(_0x466d1a);
  }
  if (_0x466d1a === _0x1b9648.tracked.toUpperCase().trim()) {
    if (_0x2208f1 !== "known") {
      this.setTrackedQuest("");
    }
  }
};
Game_System.prototype.questsKnown = function () {
  const _0x52ecfd = this.questData();
  _0x52ecfd.known = _0x52ecfd.known || [];
  return _0x52ecfd.known.map((_0x209597) => this.quest(_0x209597)).remove(null);
};
Game_System.prototype.isQuestKnown = function (_0x4499f5) {
  const _0x517ff8 = this.questData();
  _0x517ff8.known = _0x517ff8.known || [];
  _0x4499f5 = _0x4499f5.toUpperCase().trim();
  return _0x517ff8.known.includes(_0x4499f5);
};
Game_System.prototype.questsCompleted = function () {
  const _0x588184 = this.questData();
  _0x588184.completed = _0x588184.completed || [];
  return _0x588184.completed
    .map((_0x5d55fe) => this.quest(_0x5d55fe))
    .remove(null);
};
Game_System.prototype.isQuestCompleted = function (_0x169cd3) {
  const _0x2fba3d = this.questData();
  _0x2fba3d.completed = _0x2fba3d.completed || [];
  _0x169cd3 = _0x169cd3.toUpperCase().trim();
  return _0x2fba3d.completed.includes(_0x169cd3);
};
Game_System.prototype.questsFailed = function () {
  const _0x315641 = this.questData();
  _0x315641.failed = _0x315641.failed || [];
  return _0x315641.failed
    .map((_0x16af16) => this.quest(_0x16af16))
    .remove(null);
};
Game_System.prototype.isQuestFailed = function (_0x570554) {
  const _0x5d7b43 = this.questData();
  _0x5d7b43.failed = _0x5d7b43.failed || [];
  _0x570554 = _0x570554.toUpperCase().trim();
  return _0x5d7b43.failed.includes(_0x570554);
};
Game_System.prototype.questDescription = function (_0x51c091) {
  _0x51c091 = _0x51c091.toUpperCase().trim();
  const _0x27cf62 = this.quest(_0x51c091);
  if (!_0x27cf62) {
    return "";
  }
  const _0x1716ba = this.questData().description;
  _0x1716ba[_0x51c091] = _0x1716ba[_0x51c091] || 0x1;
  const _0x43a706 = _0x1716ba[_0x51c091];
  return _0x27cf62.Description[_0x43a706] || "";
};
Game_System.prototype.setQuestDescription = function (_0x3cbe3c, _0xcd0802) {
  _0x3cbe3c = _0x3cbe3c.toUpperCase().trim();
  const _0x181581 = this.quest(_0x3cbe3c);
  if (!_0x181581) {
    return "";
  }
  const _0x14e83f = this.questData().description;
  _0x14e83f[_0x3cbe3c] = _0xcd0802;
};
Game_System.prototype.questObjectives = function (_0x5ca5f2) {
  _0x5ca5f2 = _0x5ca5f2.toUpperCase().trim();
  const _0x2f666d = this.quest(_0x5ca5f2);
  if (!_0x2f666d) {
    return "";
  }
  const _0x3bb187 = this.questData();
  _0x3bb187.objectives = _0x3bb187.objectives || {};
  if (!_0x3bb187.objectives[_0x5ca5f2]) {
    _0x3bb187.objectives[_0x5ca5f2] = JsonEx.makeDeepCopy(
      _0x2f666d.VisibleObjectives
    );
  }
  return _0x3bb187.objectives[_0x5ca5f2].sort(
    (_0x4bb592, _0x2861bd) => _0x4bb592 - _0x2861bd
  );
};
Game_System.prototype.setQuestObjectives = function (
  _0x382b04,
  _0x54b3ad,
  _0x3181f2
) {
  _0x382b04 = _0x382b04.toUpperCase().trim();
  const _0x131681 = this.quest(_0x382b04);
  if (!_0x131681) {
    return "";
  }
  const _0x3fbd8e = this.questData();
  _0x3fbd8e.objectives = _0x3fbd8e.objectives || {};
  if (!_0x3fbd8e.objectives[_0x382b04]) {
    _0x3fbd8e.objectives[_0x382b04] = JsonEx.makeDeepCopy(
      _0x131681.VisibleObjectives
    );
  }
  _0x3fbd8e.objectives[_0x382b04] = _0x3fbd8e.objectives[_0x382b04] || [];
  _0x3fbd8e.objectivesCompleted[_0x382b04] =
    _0x3fbd8e.objectivesCompleted[_0x382b04] || [];
  _0x3fbd8e.objectivesFailed[_0x382b04] =
    _0x3fbd8e.objectivesFailed[_0x382b04] || [];
  for (const _0x1a6ff7 of _0x54b3ad) {
    _0x3fbd8e.objectives[_0x382b04].remove(_0x1a6ff7);
    _0x3fbd8e.objectivesCompleted[_0x382b04].remove(_0x1a6ff7);
    _0x3fbd8e.objectivesFailed[_0x382b04].remove(_0x1a6ff7);
    switch (_0x3181f2) {
      case "show":
      case "known":
        _0x3fbd8e.objectives[_0x382b04].push(_0x1a6ff7);
        break;
      case "complete":
      case "completed":
        _0x3fbd8e.objectivesCompleted[_0x382b04].push(_0x1a6ff7);
        break;
      case "fail":
      case "failed":
        _0x3fbd8e.objectivesFailed[_0x382b04].push(_0x1a6ff7);
        break;
      case "remove":
      case "removed":
        break;
    }
  }
};
Game_System.prototype.questObjectivesCompleted = function (_0x362016) {
  _0x362016 = _0x362016.toUpperCase().trim();
  const _0x56566a = this.quest(_0x362016);
  if (!_0x56566a) {
    return "";
  }
  const _0x3e269a = this.questData();
  _0x3e269a.objectivesCompleted = _0x3e269a.objectivesCompleted || {};
  _0x3e269a.objectivesCompleted[_0x362016] =
    _0x3e269a.objectivesCompleted[_0x362016] || [];
  return _0x3e269a.objectivesCompleted[_0x362016].sort(
    (_0x2968a4, _0x1609d8) => _0x2968a4 - _0x1609d8
  );
};
Game_System.prototype.questObjectivesFailed = function (_0x313bef) {
  _0x313bef = _0x313bef.toUpperCase().trim();
  const _0x272f7b = this.quest(_0x313bef);
  if (!_0x272f7b) {
    return "";
  }
  const _0x50307a = this.questData();
  _0x50307a.objectivesFailed = _0x50307a.objectivesFailed || {};
  _0x50307a.objectivesFailed[_0x313bef] =
    _0x50307a.objectivesFailed[_0x313bef] || [];
  return _0x50307a.objectivesFailed[_0x313bef].sort(
    (_0x5dacb3, _0x52f9ea) => _0x5dacb3 - _0x52f9ea
  );
};
Game_System.prototype.questRewards = function (_0x4cf907) {
  _0x4cf907 = _0x4cf907.toUpperCase().trim();
  const _0x3e22e9 = this.quest(_0x4cf907);
  if (!_0x3e22e9) {
    return "";
  }
  const _0x4913af = this.questData();
  _0x4913af.rewards = _0x4913af.rewards || {};
  if (!_0x4913af.rewards[_0x4cf907]) {
    _0x4913af.rewards[_0x4cf907] = JsonEx.makeDeepCopy(
      _0x3e22e9.VisibleRewards
    );
  }
  return _0x4913af.rewards[_0x4cf907].sort(
    (_0x2d406a, _0x3e569c) => _0x2d406a - _0x3e569c
  );
};
Game_System.prototype.setQuestRewards = function (
  _0x2b5542,
  _0x18232e,
  _0x18eaa8
) {
  _0x2b5542 = _0x2b5542.toUpperCase().trim();
  const _0x6035b0 = this.quest(_0x2b5542);
  if (!_0x6035b0) {
    return "";
  }
  const _0x13720c = this.questData();
  _0x13720c.rewards = _0x13720c.rewards || {};
  if (!_0x13720c.rewards[_0x2b5542]) {
    _0x13720c.rewards[_0x2b5542] = JsonEx.makeDeepCopy(
      _0x6035b0.VisibleRewards
    );
  }
  _0x13720c.rewards[_0x2b5542] = _0x13720c.rewards[_0x2b5542] || [];
  _0x13720c.rewardsClaimed[_0x2b5542] =
    _0x13720c.rewardsClaimed[_0x2b5542] || [];
  _0x13720c.rewardsDenied[_0x2b5542] = _0x13720c.rewardsDenied[_0x2b5542] || [];
  for (const _0x2aa13d of _0x18232e) {
    _0x13720c.rewards[_0x2b5542].remove(_0x2aa13d);
    _0x13720c.rewardsClaimed[_0x2b5542].remove(_0x2aa13d);
    _0x13720c.rewardsDenied[_0x2b5542].remove(_0x2aa13d);
    switch (_0x18eaa8) {
      case "show":
      case "known":
        _0x13720c.rewards[_0x2b5542].push(_0x2aa13d);
        break;
      case "claim":
      case "claimed":
        _0x13720c.rewardsClaimed[_0x2b5542].push(_0x2aa13d);
        break;
      case "deny":
      case "denied":
        _0x13720c.rewardsDenied[_0x2b5542].push(_0x2aa13d);
        break;
      case "remove":
      case "removed":
        break;
    }
  }
};
Game_System.prototype.questRewardsClaimed = function (_0x4ec4fb) {
  _0x4ec4fb = _0x4ec4fb.toUpperCase().trim();
  const _0x5d66bb = this.quest(_0x4ec4fb);
  if (!_0x5d66bb) {
    return "";
  }
  const _0x5638d2 = this.questData();
  _0x5638d2.rewardsClaimed = _0x5638d2.rewardsClaimed || {};
  _0x5638d2.rewardsClaimed[_0x4ec4fb] =
    _0x5638d2.rewardsClaimed[_0x4ec4fb] || [];
  return _0x5638d2.rewardsClaimed[_0x4ec4fb].sort(
    (_0x2dd3e7, _0x4f6580) => _0x2dd3e7 - _0x4f6580
  );
};
Game_System.prototype.questRewardsDenied = function (_0xbf7cfd) {
  _0xbf7cfd = _0xbf7cfd.toUpperCase().trim();
  const _0x91643 = this.quest(_0xbf7cfd);
  if (!_0x91643) {
    return "";
  }
  const _0x122aeb = this.questData();
  _0x122aeb.rewardsDenied = _0x122aeb.rewardsDenied || {};
  _0x122aeb.rewardsDenied[_0xbf7cfd] = _0x122aeb.rewardsDenied[_0xbf7cfd] || [];
  return _0x122aeb.rewardsDenied[_0xbf7cfd].sort(
    (_0x32464e, _0x26c4ae) => _0x32464e - _0x26c4ae
  );
};
Game_System.prototype.questSubtext = function (_0x2e273d) {
  _0x2e273d = _0x2e273d.toUpperCase().trim();
  const _0x2a2f79 = this.quest(_0x2e273d);
  if (!_0x2a2f79) {
    return "";
  }
  const _0x1b28d2 = this.questData().subtext;
  _0x1b28d2[_0x2e273d] = _0x1b28d2[_0x2e273d] || 0x1;
  const _0x4159e4 = _0x1b28d2[_0x2e273d];
  return _0x2a2f79.Subtext[_0x4159e4] || "";
};
Game_System.prototype.setQuestSubtext = function (_0x3e99eb, _0x145c59) {
  _0x3e99eb = _0x3e99eb.toUpperCase().trim();
  const _0x45aa15 = this.quest(_0x3e99eb);
  if (!_0x45aa15) {
    return "";
  }
  const _0x436e13 = this.questData().subtext;
  _0x436e13[_0x3e99eb] = _0x145c59;
};
Game_System.prototype.questQuote = function (_0x47599a) {
  _0x47599a = _0x47599a.toUpperCase().trim();
  const _0x3c0063 = this.quest(_0x47599a);
  if (!_0x3c0063) {
    return "";
  }
  const _0x205720 = this.questData().quotes;
  _0x205720[_0x47599a] = _0x205720[_0x47599a] || 0x1;
  const _0x4008aa = _0x205720[_0x47599a];
  return _0x3c0063.Quotes[_0x4008aa] || "";
};
Game_System.prototype.setQuestQuote = function (_0xeddc58, _0x156a63) {
  _0xeddc58 = _0xeddc58.toUpperCase().trim();
  const _0xa4612c = this.quest(_0xeddc58);
  if (!_0xa4612c) {
    return "";
  }
  const _0x4ea00e = this.questData().quotes;
  _0x4ea00e[_0xeddc58] = _0x156a63;
};
Game_System.prototype.trackedQuest = function () {
  const _0x1149ce = this.questData();
  return this.quest(_0x1149ce.tracked);
};
Game_System.prototype.setTrackedQuest = function (_0x15b757, _0x261f8e) {
  const _0x4f6aaf = this.questData();
  if (_0x261f8e && _0x4f6aaf.tracked === _0x15b757) {
    _0x15b757 = "";
  }
  _0x4f6aaf.tracked = _0x15b757;
  if (SceneManager.isSceneMap()) {
    SceneManager._scene.setQuestForQuestTrackerWindow(_0x15b757);
  }
};
Game_System.prototype.isQuestTrackerVisible = function () {
  const _0x32fe90 = this.questData();
  return _0x32fe90.showTracker;
};
Game_System.prototype.setQuestTrackerVisible = function (_0x51739c) {
  const _0x3a581d = this.questData();
  _0x3a581d.showTracker = _0x51739c;
};
VisuMZ.QuestSystem.Game_BattlerBase_addNewState =
  Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState = function (_0x4bfd8a) {
  const _0x1ed148 = this.isAlive();
  VisuMZ.QuestSystem.Game_BattlerBase_addNewState.call(this, _0x4bfd8a);
  this.questJournalSystemAddDeath(_0x4bfd8a, _0x1ed148);
};
Game_BattlerBase.prototype.questJournalSystemAddDeath = function (
  _0x226c8,
  _0x7fa0c3
) {
  if (_0x226c8 !== this.deathStateId()) {
    return;
  }
  if (!this.isEnemy()) {
    return;
  }
  if (!_0x7fa0c3) {
    return;
  }
  if (!this.isDead()) {
    return;
  }
  if (this._hasDiedBefore) {
    return;
  }
  this._hasDiedBefore = true;
  const _0x3ff463 = this.enemy().note;
  const _0x5e4169 = _0x3ff463.match(/<VARIABLE (\d+) ON DEATH: ([\+\-]\d+)>/gi);
  if (_0x5e4169) {
    for (const _0x51eb42 of _0x5e4169) {
      _0x51eb42.match(/<VARIABLE (\d+) ON DEATH: ([\+\-]\d+)>/i);
      const _0x4d5761 = Number(RegExp.$1);
      const _0x5439a3 = Number(RegExp.$2);
      const _0x54ce6d = $gameVariables.value(_0x4d5761);
      $gameVariables.setValue(_0x4d5761, _0x54ce6d + _0x5439a3);
    }
  }
};
VisuMZ.QuestSystem.Game_Battler_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function (_0x58419b) {
  VisuMZ.QuestSystem.Game_Battler_useItem.call(this, _0x58419b);
  this.questJournalSystemUseItem(_0x58419b);
};
Game_Battler.prototype.questJournalSystemUseItem = function (_0x3d5ec0) {
  if (!_0x3d5ec0) {
    return;
  }
  if (!this.isActor()) {
    return;
  }
  const _0x4f408d = _0x3d5ec0.note;
  const _0x651424 = _0x4f408d.match(/<VARIABLE (\d+) ON USE: ([\+\-]\d+)>/gi);
  if (_0x651424) {
    for (const _0x2c619e of _0x651424) {
      _0x2c619e.match(/<VARIABLE (\d+) ON USE: ([\+\-]\d+)>/i);
      const _0x110455 = Number(RegExp.$1);
      const _0x5e2925 = Number(RegExp.$2);
      const _0x601694 = $gameVariables.value(_0x110455);
      $gameVariables.setValue(_0x110455, _0x601694 + _0x5e2925);
    }
  }
};
VisuMZ.QuestSystem.Game_Actor_tradeItemWithParty =
  Game_Actor.prototype.tradeItemWithParty;
Game_Actor.prototype.tradeItemWithParty = function (_0x414270, _0x3b9803) {
  $gameTemp._tradeItemWithParty = true;
  const _0x3ed023 = VisuMZ.QuestSystem.Game_Actor_tradeItemWithParty.call(
    this,
    _0x414270,
    _0x3b9803
  );
  $gameTemp._tradeItemWithParty = undefined;
  return _0x3ed023;
};
VisuMZ.QuestSystem.Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function (_0x3b882f, _0x59e12f, _0x1a34cf) {
  VisuMZ.QuestSystem.Game_Party_gainItem.call(
    this,
    _0x3b882f,
    _0x59e12f,
    _0x1a34cf
  );
  this.questJournalSystemGainItem(_0x3b882f, _0x59e12f);
};
Game_Party.prototype.questJournalSystemGainItem = function (
  _0x111435,
  _0x3d6bb2
) {
  if (!_0x111435) {
    return;
  }
  if ($gameTemp._tradeItemWithParty) {
    return;
  }
  const _0x7682b2 = _0x111435.note;
  if (_0x3d6bb2 > 0x0) {
    const _0x413a7f = _0x7682b2.match(
      /<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/gi
    );
    if (_0x413a7f) {
      for (const _0x1a89c6 of _0x413a7f) {
        _0x1a89c6.match(/<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/i);
        const _0x10cf44 = Number(RegExp.$1);
        const _0x344160 = Number(RegExp.$2) * _0x3d6bb2;
        const _0x1cdeb7 = $gameVariables.value(_0x10cf44);
        $gameVariables.setValue(_0x10cf44, _0x1cdeb7 + _0x344160);
      }
    }
  } else {
    if (_0x3d6bb2 < 0x0) {
      const _0x5507c6 = _0x7682b2.match(
        /<VARIABLE (\d+) ON LOSE: ([\+\-]\d+)>/gi
      );
      if (_0x5507c6) {
        for (const _0x3aaf81 of _0x5507c6) {
          _0x3aaf81.match(/<VARIABLE (\d+) ON LOSE: ([\+\-]\d+)>/i);
          const _0x1aa255 = Number(RegExp.$1);
          const _0x3302a4 = Number(RegExp.$2) * _0x3d6bb2;
          const _0x30193d = $gameVariables.value(_0x1aa255);
          $gameVariables.setValue(_0x1aa255, _0x30193d + _0x3302a4);
        }
      }
    }
  }
  const _0x155c3f = _0x7682b2.match(/<TRACK WITH VARIABLE (\d+)>/gi);
  if (_0x155c3f) {
    for (const _0x319371 of _0x155c3f) {
      _0x319371.match(/<TRACK WITH VARIABLE (\d+)>/i);
      const _0x2e361c = Number(RegExp.$1);
      const _0x2497a5 = $gameParty.numItems(_0x111435);
      $gameVariables.setValue(_0x2e361c, _0x2497a5);
    }
  }
};
VisuMZ.QuestSystem.Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function () {
  VisuMZ.QuestSystem.Game_Party_initialize.call(this);
  this.initQuestLabelItemsList();
};
Game_Party.prototype.initQuestLabelItemsList = function () {
  this._questLabelItemsList = [];
};
Game_Party.prototype.isQuestItem = function (_0x541c3c) {
  if (this._questLabelItemsList === undefined) {
    this.initQuestLabelItemsList();
  }
  let _0xf5b55e = "";
  if (DataManager.isItem(_0x541c3c)) {
    _0xf5b55e = "item-%1".format(_0x541c3c.id);
  } else {
    if (DataManager.isWeapon(_0x541c3c)) {
      _0xf5b55e = "weapon-%1".format(_0x541c3c.id);
    } else {
      if (DataManager.isArmor(_0x541c3c)) {
        _0xf5b55e = "armor-%1".format(_0x541c3c.id);
      } else {
        return;
      }
    }
  }
  return this._questLabelItemsList.includes(_0xf5b55e);
};
Game_Party.prototype.setQuestLabelItem = function (_0x2f1743) {
  if (this._questLabelItemsList === undefined) {
    this.initQuestLabelItemsList();
  }
  let _0x2b3a27 = "";
  if (DataManager.isItem(_0x2f1743)) {
    _0x2b3a27 = "item-%1".format(_0x2f1743.id);
  } else {
    if (DataManager.isWeapon(_0x2f1743)) {
      _0x2b3a27 = "weapon-%1".format(_0x2f1743.id);
    } else {
      if (DataManager.isArmor(_0x2f1743)) {
        _0x2b3a27 = "armor-%1".format(_0x2f1743.id);
      } else {
        return;
      }
    }
  }
  if (!this._questLabelItemsList.includes(_0x2b3a27)) {
    this._questLabelItemsList.push(_0x2b3a27);
  }
};
Game_Party.prototype.clearQuestLabelItem = function (_0x56ce83) {
  if (!$gameTemp.newLabelEnabled()) {
    return;
  }
  if (this._questLabelItemsList === undefined) {
    this.initQuestLabelItemsList();
  }
  let _0x2bf97f = "";
  if (DataManager.isItem(_0x56ce83)) {
    _0x2bf97f = "item-%1".format(_0x56ce83.id);
  } else {
    if (DataManager.isWeapon(_0x56ce83)) {
      _0x2bf97f = "weapon-%1".format(_0x56ce83.id);
    } else {
      if (DataManager.isArmor(_0x56ce83)) {
        _0x2bf97f = "armor-%1".format(_0x56ce83.id);
      } else {
        return;
      }
    }
  }
  if (this._questLabelItemsList.includes(_0x2bf97f)) {
    this._questLabelItemsList.splice(
      this._questLabelItemsList.indexOf(_0x2bf97f),
      0x1
    );
  }
};
VisuMZ.QuestSystem.Game_Map_requestRefresh = Game_Map.prototype.requestRefresh;
Game_Map.prototype.requestRefresh = function () {
  VisuMZ.QuestSystem.Game_Map_requestRefresh.call(this);
  if (SceneManager.isSceneMap() && !this._isRefreshingQuestTrackerWindow) {
    this._isRefreshingQuestTrackerWindow = true;
  }
};
VisuMZ.QuestSystem.Game_Map_refresh = Game_Map.prototype.refresh;
Game_Map.prototype.refresh = function () {
  VisuMZ.QuestSystem.Game_Map_refresh.call(this);
  if (SceneManager.isSceneMap() && this._isRefreshingQuestTrackerWindow) {
    SceneManager._scene.refreshQuestTrackerWindow();
    this._isRefreshingQuestTrackerWindow = false;
  }
};
VisuMZ.QuestSystem.Scene_Map_createSpriteset =
  Scene_Map.prototype.createSpriteset;
Scene_Map.prototype.createSpriteset = function () {
  VisuMZ.QuestSystem.Scene_Map_createSpriteset.call(this);
  this.createQuestTrackerWindow();
};
Scene_Map.prototype.createQuestTrackerWindow = function () {
  if (!SceneManager.isSceneMap()) {
    return;
  }
  const _0x11e3bc = this.questTrackerWindow();
  const _0x47916e = new Window_QuestTracker(_0x11e3bc);
  this.addChild(_0x47916e);
  this._questTrackerWindow = _0x47916e;
};
Scene_Map.prototype.questTrackerOnRight = function () {
  return ConfigManager.questTrackerPosition;
};
Scene_Map.prototype.questTrackerWindow = function () {
  return VisuMZ.QuestSystem.Settings.Window.TrackerWindow_Rect.call(this);
};
Scene_Map.prototype.refreshQuestTrackerWindow = function () {
  if (!this._questTrackerWindow) {
    return;
  }
  this._questTrackerWindow.refresh();
};
Scene_Map.prototype.setQuestForQuestTrackerWindow = function (_0x29ae18) {
  if (!this._questTrackerWindow) {
    return;
  }
  _0x29ae18 = _0x29ae18.toUpperCase().trim();
  const _0x585724 = $gameSystem.quest(_0x29ae18);
  this._questTrackerWindow.setQuest(_0x585724);
};
VisuMZ.QuestSystem.Scene_Menu_createCommandWindow =
  Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function () {
  VisuMZ.QuestSystem.Scene_Menu_createCommandWindow.call(this);
  this._commandWindow.setHandler("quest", this.commandQuest.bind(this));
};
Scene_Menu.prototype.commandQuest = function () {
  SceneManager.push(Scene_Quest);
};
VisuMZ.QuestSystem.Scene_Options_maxCommands =
  Scene_Options.prototype.maxCommands;
Scene_Options.prototype.maxCommands = function () {
  let _0x1578ae = VisuMZ.QuestSystem.Scene_Options_maxCommands.call(this);
  if (VisuMZ.QuestSystem.Settings.Tracker.AdjustRect) {
    if (VisuMZ.QuestSystem.Settings.Tracker.AddShowOption) {
      _0x1578ae++;
    }
    if (VisuMZ.QuestSystem.Settings.Tracker.AddPositionOption) {
      _0x1578ae++;
    }
  }
  return _0x1578ae;
};
function Scene_Quest() {
  this.initialize(...arguments);
}
Scene_Quest.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Quest.prototype.constructor = Scene_Quest;
Scene_Quest.prototype.initialize = function () {
  Scene_MenuBase.prototype.initialize.call(this);
};
Scene_Quest.prototype.helpAreaHeight = function () {
  return 0x0;
};
Scene_Quest.prototype.isRightInputMode = function () {
  if (
    ConfigManager.uiMenuStyle &&
    ConfigManager.uiInputPosition !== undefined
  ) {
    return ConfigManager.uiInputPosition;
  } else {
    if (ConfigManager.uiMenuStyle === false) {
      return false;
    } else {
      return Scene_MenuBase.prototype.isRightInputMode.call(this);
    }
  }
};
Scene_Quest.prototype.mainCommandWidth = function () {
  return (Graphics.boxWidth - 0x230).clamp(
    0xf0,
    Math.floor(Graphics.boxWidth / 0x2)
  );
};
Scene_Quest.prototype.create = function () {
  Scene_MenuBase.prototype.create.call(this);
  this.createCommandWindow();
  this.createQuestLabelWindow();
  this.createQuestLogWindow();
  this.createQuestListWindow();
};
Scene_Quest.prototype.createCommandWindow = function () {
  const _0x5a7378 = this.commandWindowRect();
  const _0x78ee2d = new Window_QuestCommand(_0x5a7378);
  _0x78ee2d.setHandler("known", this.onCommandOk.bind(this));
  _0x78ee2d.setHandler("completed", this.onCommandOk.bind(this));
  _0x78ee2d.setHandler("failed", this.onCommandOk.bind(this));
  _0x78ee2d.setHandler("cancel", this.popScene.bind(this));
  this.addWindow(_0x78ee2d);
  this._commandWindow = _0x78ee2d;
  _0x78ee2d.setBackgroundType(
    VisuMZ.QuestSystem.Settings.Window.CommandWindow_BgType
  );
};
Scene_Quest.prototype.commandWindowRect = function () {
  return VisuMZ.QuestSystem.Settings.Window.CommandWindow_Rect.call(this);
};
Scene_Quest.prototype.createQuestLabelWindow = function () {
  const _0x459d05 = this.questLabelWindowRect();
  const _0x397ed0 = new Window_Base(_0x459d05);
  this.addWindow(_0x397ed0);
  this._labelWindow = _0x397ed0;
  _0x397ed0.setBackgroundType(
    VisuMZ.QuestSystem.Settings.Window.QuestLabel_BgType
  );
};
Scene_Quest.prototype.questLabelWindowRect = function () {
  return VisuMZ.QuestSystem.Settings.Window.QuestLabel_Rect.call(this);
};
Scene_Quest.prototype.createQuestLogWindow = function () {
  const _0x39b594 = this.questLogWindowRect();
  const _0x301f1a = new Window_QuestLog(_0x39b594);
  this.addWindow(_0x301f1a);
  this._logWindow = _0x301f1a;
  _0x301f1a.setBackgroundType(
    VisuMZ.QuestSystem.Settings.Window.LogWindow_BgType
  );
};
Scene_Quest.prototype.questLogWindowRect = function () {
  return VisuMZ.QuestSystem.Settings.Window.LogWindow_Rect.call(this);
};
Scene_Quest.prototype.createQuestListWindow = function () {
  const _0x1c6d4b = this.questListWindowRect();
  const _0x177700 = new Window_QuestList(_0x1c6d4b);
  _0x177700.setHandler("category", this.onListCategory.bind(this));
  _0x177700.setHandler("quest", this.onListQuest.bind(this));
  _0x177700.setHandler("cancel", this.onListCancel.bind(this));
  this.addWindow(_0x177700);
  this._listWindow = _0x177700;
  _0x177700.setBackgroundType(
    VisuMZ.QuestSystem.Settings.Window.ListWindow_BgType
  );
  this._commandWindow.setListWindow(this._listWindow);
  this._listWindow.setLabelWindow(this._labelWindow);
  this._listWindow.setLogWindow(this._logWindow);
};
Scene_Quest.prototype.questListWindowRect = function () {
  return VisuMZ.QuestSystem.Settings.Window.ListWindow_Rect.call(this);
};
Scene_Quest.prototype.onCommandOk = function () {
  this._listWindow.activate();
  this._listWindow.smoothSelect(0x0);
};
Scene_Quest.prototype.onListCategory = function () {
  this._listWindow.openCloseCurrentCategory();
  this._listWindow.activate();
};
Scene_Quest.prototype.onListQuest = function () {
  const _0x4f2fc5 = this._listWindow.currentQuest();
  const _0x2ea42d = _0x4f2fc5.Key.toUpperCase().trim();
  $gameSystem.setTrackedQuest(_0x2ea42d, true);
  this._listWindow.refresh();
  this._listWindow.activate();
};
Scene_Quest.prototype.onListCancel = function () {
  this._listWindow.deselect();
  this._commandWindow.activate();
};
Scene_Quest.prototype.buttonAssistText1 = function () {
  return TextManager.questButtonAssistPageUpDn;
};
Scene_Quest.prototype.buttonAssistText4 = function () {
  if (this._listWindow && this._listWindow.active) {
    if (this._listWindow.currentQuest()) {
      return this._listWindow.isOkEnabled()
        ? TextManager.questButtonAssistActive
        : "";
    } else {
      return this._listWindow.isCurrentCategoryOpen()
        ? TextManager.questButtonAssistCollapse
        : TextManager.questButtonAssistExpand;
    }
  }
  return Scene_MenuBase.prototype.buttonAssistText4.call(this);
};
Scene_Quest.prototype.createBackground = function () {
  Scene_MenuBase.prototype.createBackground.call(this);
  this.setBackgroundOpacity(this.getBackgroundOpacity());
  this.createCustomBackgroundImages();
};
Scene_Quest.prototype.getBackgroundOpacity = function () {
  return VisuMZ.QuestSystem.Settings.BgSettings.SnapshotOpacity;
};
Scene_Quest.prototype.createCustomBackgroundImages = function () {
  const _0x1e37e2 = {
    BgFilename1: VisuMZ.QuestSystem.Settings.BgSettings.BgFilename1,
    BgFilename2: VisuMZ.QuestSystem.Settings.BgSettings.BgFilename2,
  };
  if (
    _0x1e37e2 &&
    (_0x1e37e2.BgFilename1 !== "" || _0x1e37e2.BgFilename2 !== "")
  ) {
    this._backSprite1 = new Sprite(
      ImageManager.loadTitle1(_0x1e37e2.BgFilename1)
    );
    this._backSprite2 = new Sprite(
      ImageManager.loadTitle2(_0x1e37e2.BgFilename2)
    );
    this.addChild(this._backSprite1);
    this.addChild(this._backSprite2);
    this._backSprite1.bitmap.addLoadListener(
      this.adjustSprite.bind(this, this._backSprite1)
    );
    this._backSprite2.bitmap.addLoadListener(
      this.adjustSprite.bind(this, this._backSprite2)
    );
  }
};
Scene_Quest.prototype.adjustSprite = function (_0x1cf541) {
  this.scaleSprite(_0x1cf541);
  this.centerSprite(_0x1cf541);
};
function Sprite_QuestLabel() {
  this.initialize(...arguments);
}
Sprite_QuestLabel.prototype = Object.create(Sprite.prototype);
Sprite_QuestLabel.prototype.constructor = Sprite_QuestLabel;
Sprite_QuestLabel.prototype.initialize = function () {
  Sprite.prototype.initialize.call(this);
  this.createBitmap();
};
Sprite_QuestLabel.prototype.createBitmap = function () {
  const _0x5c57b7 = ImageManager.iconWidth;
  const _0x30b27a = ImageManager.iconHeight;
  this.bitmap = new Bitmap(_0x5c57b7, _0x30b27a);
  this.drawNewLabelIcon();
  this.drawNewLabelText();
};
Sprite_QuestLabel.prototype.drawNewLabelIcon = function () {
  const _0x22a226 = VisuMZ.QuestSystem.Settings.Label.Icon;
  if (_0x22a226 <= 0x0) {
    return;
  }
  const _0x17bbea = ImageManager.loadSystem("IconSet");
  const _0x18a371 = ImageManager.iconWidth;
  const _0x571527 = ImageManager.iconHeight;
  const _0xf96aa9 = (_0x22a226 % 0x10) * _0x18a371;
  const _0x161cb8 = Math.floor(_0x22a226 / 0x10) * _0x571527;
  this.bitmap.blt(
    _0x17bbea,
    _0xf96aa9,
    _0x161cb8,
    _0x18a371,
    _0x571527,
    0x0,
    0x0
  );
};
Sprite_QuestLabel.prototype.drawNewLabelText = function () {
  const _0x42abe9 = VisuMZ.QuestSystem.Settings.Label;
  const _0x575ebe = _0x42abe9.Text;
  if (_0x575ebe === "") {
    return;
  }
  const _0x2eaa5a = ImageManager.iconWidth;
  const _0x2c9ce7 = ImageManager.iconHeight;
  this.bitmap.fontFace = _0x42abe9.FontFace || $gameSystem.mainFontFace();
  this.bitmap.textColor = this.getTextColor();
  this.bitmap.fontSize = _0x42abe9.FontSize;
  this.bitmap.drawText(
    _0x575ebe,
    0x0,
    _0x2c9ce7 / 0x2,
    _0x2eaa5a,
    _0x2c9ce7 / 0x2,
    "center"
  );
};
Sprite_QuestLabel.prototype.getTextColor = function () {
  const _0x17d135 = VisuMZ.QuestSystem.Settings.Label.FontColor;
  return _0x17d135.match(/#(.*)/i)
    ? "#" + String(RegExp.$1)
    : ColorManager.textColor(_0x17d135);
};
VisuMZ.QuestSystem.Window_Selectable_initialize =
  Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function (_0x182257) {
  this.initiQuestLabelSprites();
  VisuMZ.QuestSystem.Window_Selectable_initialize.call(this, _0x182257);
};
Window_Selectable.prototype.initiQuestLabelSprites = function () {
  this._questLabelSprites = {};
  this._questLabelOpacity = 0xff;
  this._questLabelOpacityChange = VisuMZ.QuestSystem.Settings.Label.FadeSpeed;
  this._questLabelOpacityUpperLimit =
    VisuMZ.QuestSystem.Settings.Label.FadeLimit;
};
Window_Selectable.prototype.isShowQuest = function () {
  return true;
};
VisuMZ.QuestSystem.Window_Selectable_refresh =
  Window_Selectable.prototype.refresh;
Window_Selectable.prototype.refresh = function () {
  this.hideQuestLabelSprites();
  VisuMZ.QuestSystem.Window_Selectable_refresh.call(this);
};
Window_Selectable.prototype.hideQuestLabelSprites = function () {
  for (const _0x5a9a85 of Object.values(this._questLabelSprites)) {
    _0x5a9a85.hide();
  }
};
VisuMZ.QuestSystem.Window_Selectable_update =
  Window_Selectable.prototype.update;
Window_Selectable.prototype.update = function () {
  this.updateQuestLabelOpacity();
  VisuMZ.QuestSystem.Window_Selectable_update.call(this);
};
Window_Selectable.prototype.updateQuestLabelOpacity = function () {
  if (!this.isShowQuest()) {
    return;
  }
  const _0x4f72aa = this._questLabelOpacityUpperLimit;
  this._questLabelOpacity += this._questLabelOpacityChange;
  if (this._questLabelOpacity >= _0x4f72aa || this._questLabelOpacity <= 0x0) {
    this._questLabelOpacityChange *= -0x1;
  }
  this._questLabelOpacity = this._questLabelOpacity.clamp(0x0, _0x4f72aa);
  for (const _0x2e31b3 of Object.values(this._questLabelSprites)) {
    _0x2e31b3.opacity = this._questLabelOpacity;
  }
};
Window_Selectable.prototype.createQuestLabelSprite = function (_0x1c1636) {
  const _0x29d4ec = this._questLabelSprites;
  if (_0x29d4ec[_0x1c1636]) {
    return _0x29d4ec[_0x1c1636];
  } else {
    const _0x402c42 = new Sprite_QuestLabel();
    _0x29d4ec[_0x1c1636] = _0x402c42;
    this.addInnerChild(_0x402c42);
    return _0x402c42;
  }
};
Window_Selectable.prototype.placeQuestLabel = function (
  _0x362d53,
  _0x537062,
  _0x24c7fc
) {
  let _0x13f096 = "";
  if (DataManager.isItem(_0x362d53)) {
    _0x13f096 = "item-%1".format(_0x362d53.id);
  } else {
    if (DataManager.isWeapon(_0x362d53)) {
      _0x13f096 = "weapon-%1".format(_0x362d53.id);
    } else {
      if (DataManager.isArmor(_0x362d53)) {
        _0x13f096 = "armor-%1".format(_0x362d53.id);
      } else {
        return;
      }
    }
  }
  const _0x3434a6 = this.createQuestLabelSprite(_0x13f096);
  _0x3434a6.move(_0x537062, _0x24c7fc);
  _0x3434a6.show();
  _0x3434a6.opacity = this._questLabelOpacity;
};
VisuMZ.QuestSystem.Window_ItemList_drawItem =
  Window_ItemList.prototype.drawItem;
Window_ItemList.prototype.drawItem = function (_0x75b803) {
  VisuMZ.QuestSystem.Window_ItemList_drawItem.call(this, _0x75b803);
  this.placeItemQuestLabel(_0x75b803);
};
Window_ItemList.prototype.placeItemQuestLabel = function (_0x35965b) {
  const _0x1f5df2 = this.itemAt(_0x35965b);
  if (!_0x1f5df2 || !this.isShowQuest()) {
    return;
  }
  if (!$gameParty.isQuestItem(_0x1f5df2)) {
    return;
  }
  const _0x12e1d0 = this.itemLineRect(_0x35965b);
  const _0x3ac3aa = _0x12e1d0.x;
  const _0x58d296 =
    _0x12e1d0.y + (this.lineHeight() - ImageManager.iconHeight) / 0x2;
  const _0xdafb3c = VisuMZ.QuestSystem.Settings.Label.OffsetX;
  const _0x7da674 = VisuMZ.QuestSystem.Settings.Label.OffsetY;
  this.placeQuestLabel(_0x1f5df2, _0x3ac3aa + _0xdafb3c, _0x58d296 + _0x7da674);
};
VisuMZ.QuestSystem.Window_MenuCommand_addOriginalCommands =
  Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function () {
  VisuMZ.QuestSystem.Window_MenuCommand_addOriginalCommands.call(this);
  this.addQuestCommand();
};
Window_MenuCommand.prototype.addQuestCommand = function () {
  if (!this.addQuestCommandAutomatically()) {
    return;
  }
  if (!this.isQuestCommandVisible()) {
    return;
  }
  const _0x41d529 = TextManager.questCommandName;
  const _0x33eef1 = this.isQuestCommandEnabled();
  this.addCommand(_0x41d529, "quest", _0x33eef1);
};
Window_MenuCommand.prototype.addQuestCommandAutomatically = function () {
  return !Imported.VisuMZ_1_MainMenuCore;
};
Window_MenuCommand.prototype.isQuestCommandVisible = function () {
  return $gameSystem.isquestMenuShown();
};
Window_MenuCommand.prototype.isQuestCommandEnabled = function () {
  return $gameSystem.isquestMenuEnabled();
};
VisuMZ.QuestSystem.Window_Options_addGeneralOptions =
  Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function () {
  VisuMZ.QuestSystem.Window_Options_addGeneralOptions.call(this);
  this.addQuestSystemCommands();
};
Window_Options.prototype.addQuestSystemCommands = function () {
  if (VisuMZ.QuestSystem.Settings.Tracker.AddShowOption) {
    this.addQuestSystemquestTrackerShowCommand();
  }
  if (VisuMZ.QuestSystem.Settings.Tracker.AddPositionOption) {
    this.addQuestSystemquestTrackerPositionCommand();
  }
};
Window_Options.prototype.addQuestSystemquestTrackerShowCommand = function () {
  const _0x583ac5 = TextManager.questTrackerShow;
  this.addCommand(_0x583ac5, "questTrackerShow");
};
Window_Options.prototype.addQuestSystemquestTrackerPositionCommand =
  function () {
    const _0xf60721 = TextManager.questTrackerPosition;
    this.addCommand(_0xf60721, "questTrackerPosition");
  };
VisuMZ.QuestSystem.Window_Options_statusText =
  Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function (_0x5c1743) {
  const _0x315187 = this.commandSymbol(_0x5c1743);
  if (_0x315187 === "questTrackerPosition") {
    const _0xc00166 = this.getConfigValue(_0x315187);
    return _0xc00166
      ? TextManager.questTrackerPosOn
      : TextManager.questTrackerPosOff;
  }
  return VisuMZ.QuestSystem.Window_Options_statusText.call(this, _0x5c1743);
};
function Window_QuestCommand() {
  this.initialize(...arguments);
}
Window_QuestCommand.prototype = Object.create(Window_Command.prototype);
Window_QuestCommand.prototype.constructor = Window_QuestCommand;
Window_QuestCommand.prototype.initialize = function (_0x1b736b) {
  Window_Command.prototype.initialize.call(this, _0x1b736b);
  this.createCommandNameWindow(_0x1b736b);
};
Window_QuestCommand.prototype.createCommandNameWindow = function (_0x2aadc9) {
  const _0x432e0d = new Rectangle(0x0, 0x0, _0x2aadc9.width, _0x2aadc9.height);
  this._commandNameWindow = new Window_Base(_0x432e0d);
  this._commandNameWindow.opacity = 0x0;
  this.addChild(this._commandNameWindow);
  this.updateCommandNameWindow();
};
Window_QuestCommand.prototype.callUpdateHelp = function () {
  Window_Command.prototype.callUpdateHelp.call(this);
  if (this._commandNameWindow) {
    this.updateCommandNameWindow();
  }
  if (this._listWindow) {
    this._listWindow.setCategoryFilter(this.currentSymbol());
  }
};
Window_QuestCommand.prototype.updateCommandNameWindow = function () {
  const _0x2190ed = this._commandNameWindow;
  _0x2190ed.contents.clear();
  const _0x21e497 = this.commandStyleCheck(this.index());
  if (_0x21e497 === "icon") {
    const _0x137ea0 = this.itemLineRect(this.index());
    let _0x34d864 = this.commandName(this.index());
    _0x34d864 = _0x34d864.replace(/\\I\[(\d+)\]/gi, "");
    _0x2190ed.resetFontSettings();
    this.commandNameWindowDrawBackground(_0x34d864, _0x137ea0);
    this.commandNameWindowDrawText(_0x34d864, _0x137ea0);
    this.commandNameWindowCenter(_0x34d864, _0x137ea0);
  }
};
Window_QuestCommand.prototype.commandNameWindowDrawBackground = function (
  _0x5e2292,
  _0x56f32b
) {};
Window_QuestCommand.prototype.commandNameWindowDrawText = function (
  _0x171a9b,
  _0x3017f6
) {
  const _0x4d49a5 = this._commandNameWindow;
  _0x4d49a5.drawText(
    _0x171a9b,
    0x0,
    _0x3017f6.y,
    _0x4d49a5.innerWidth,
    "center"
  );
};
Window_QuestCommand.prototype.commandNameWindowCenter = function (
  _0x4d70ed,
  _0x1e5175
) {
  const _0x1b6e15 = this._commandNameWindow;
  const _0x4a81b4 = $gameSystem.windowPadding();
  const _0x4dcbf0 = _0x1e5175.x + Math.floor(_0x1e5175.width / 0x2) + _0x4a81b4;
  _0x1b6e15.x = _0x1b6e15.width / -0x2 + _0x4dcbf0;
  _0x1b6e15.y = Math.floor(_0x1e5175.height / 0x2);
};
Window_QuestCommand.prototype.makeCommandList = function () {
  this.addKnownQuestsCommand();
  this.addCompletedQuestsCommand();
  this.addFailedQuestsCommand();
};
Window_QuestCommand.prototype.addKnownQuestsCommand = function () {
  const _0x564afb = ImageManager.questKnownIcon;
  let _0x4d32aa = TextManager.questKnownCmd;
  if (_0x564afb > 0x0 && this.commandStyle() !== "text") {
    _0x4d32aa = "\\I[%1]%2".format(_0x564afb, _0x4d32aa);
  }
  const _0x296ebd = this.isKnownQuestsEnabled();
  this.addCommand(_0x4d32aa, "known", _0x296ebd);
};
Window_QuestCommand.prototype.isKnownQuestsEnabled = function () {
  return $gameSystem.questsKnown().length > 0x0;
};
Window_QuestCommand.prototype.addCompletedQuestsCommand = function () {
  const _0x200b36 = ImageManager.questCompletedIcon;
  let _0x38a6d9 = TextManager.questCompletedCmd;
  if (_0x200b36 > 0x0 && this.commandStyle() !== "text") {
    _0x38a6d9 = "\\I[%1]%2".format(_0x200b36, _0x38a6d9);
  }
  const _0xe06607 = this.isCompletedQuestsEnabled();
  this.addCommand(_0x38a6d9, "completed", _0xe06607);
};
Window_QuestCommand.prototype.isCompletedQuestsEnabled = function () {
  return $gameSystem.questsCompleted().length > 0x0;
};
Window_QuestCommand.prototype.addFailedQuestsCommand = function () {
  if (!this.isFailedQuestsVisible()) {
    return;
  }
  const _0x4c7882 = ImageManager.questFailedIcon;
  let _0x3746e3 = TextManager.questFailedCmd;
  if (_0x4c7882 > 0x0 && this.commandStyle() !== "text") {
    _0x3746e3 = "\\I[%1]%2".format(_0x4c7882, _0x3746e3);
  }
  const _0x504f5b = this.isFailedQuestsEnabled();
  this.addCommand(_0x3746e3, "failed", _0x504f5b);
};
Window_QuestCommand.prototype.isFailedQuestsVisible = function () {
  return VisuMZ.QuestSystem.Settings.Window.ShowFailed;
};
Window_QuestCommand.prototype.isFailedQuestsEnabled = function () {
  return $gameSystem.questsFailed().length > 0x0;
};
Window_QuestCommand.prototype.totalCommands = function () {
  return this.isFailedQuestsVisible() ? 0x3 : 0x2;
};
Window_QuestCommand.prototype.itemTextAlign = function () {
  return VisuMZ.QuestSystem.Settings.Window.CmdTextAlign;
};
Window_QuestCommand.prototype.drawItem = function (_0x31e982) {
  const _0x4d8018 = this.commandStyleCheck(_0x31e982);
  if (_0x4d8018 === "iconText") {
    this.drawItemStyleIconText(_0x31e982);
  } else if (_0x4d8018 === "icon") {
    this.drawItemStyleIcon(_0x31e982);
  } else {
    Window_HorzCommand.prototype.drawItem.call(this, _0x31e982);
  }
};
Window_QuestCommand.prototype.commandStyle = function () {
  return VisuMZ.QuestSystem.Settings.Window.CmdStyle;
};
Window_QuestCommand.prototype.commandStyleCheck = function (_0x215dbb) {
  if (_0x215dbb < 0x0) {
    return "text";
  }
  const _0x283a62 = this.commandStyle();
  if (_0x283a62 !== "auto") {
    return _0x283a62;
  } else {
    if (this.maxItems() > 0x0) {
      const _0x6a39ab = this.commandName(_0x215dbb);
      if (_0x6a39ab.match(/\\I\[(\d+)\]/i)) {
        const _0x3e7ce5 = this.itemLineRect(_0x215dbb);
        const _0x14c800 = this.textSizeEx(_0x6a39ab).width;
        if (_0x14c800 <= _0x3e7ce5.width) {
          return "iconText";
        } else {
          return "icon";
        }
      }
    }
  }
  return "text";
};
Window_QuestCommand.prototype.drawItemStyleIconText = function (_0x54d6d0) {
  const _0xfe1101 = this.itemLineRect(_0x54d6d0);
  const _0x3085cb = this.commandName(_0x54d6d0);
  const _0xa9fd80 = this.textSizeEx(_0x3085cb).width;
  this.changePaintOpacity(this.isCommandEnabled(_0x54d6d0));
  const _0x717cae = this.itemTextAlign();
  if (_0x717cae === "right") {
    this.drawTextEx(
      _0x3085cb,
      _0xfe1101.x + _0xfe1101.width - _0xa9fd80,
      _0xfe1101.y,
      _0xa9fd80
    );
  } else {
    if (_0x717cae === "center") {
      const _0x889249 =
        _0xfe1101.x + Math.floor((_0xfe1101.width - _0xa9fd80) / 0x2);
      this.drawTextEx(_0x3085cb, _0x889249, _0xfe1101.y, _0xa9fd80);
    } else {
      this.drawTextEx(_0x3085cb, _0xfe1101.x, _0xfe1101.y, _0xa9fd80);
    }
  }
};
Window_QuestCommand.prototype.drawItemStyleIcon = function (_0x6a9cd1) {
  this.commandName(_0x6a9cd1).match(/\\I\[(\d+)\]/i);
  const _0x461a0b = Number(RegExp.$1) || 0x0;
  const _0x2317c4 = this.itemLineRect(_0x6a9cd1);
  const _0x314294 =
    _0x2317c4.x + Math.floor((_0x2317c4.width - ImageManager.iconWidth) / 0x2);
  const _0x2b199b =
    _0x2317c4.y + (_0x2317c4.height - ImageManager.iconHeight) / 0x2;
  this.drawIcon(_0x461a0b, _0x314294, _0x2b199b);
};
Window_QuestCommand.prototype.setListWindow = function (_0x345ca4) {
  this._listWindow = _0x345ca4;
  this.callUpdateHelp();
};
function Window_QuestList() {
  this.initialize(...arguments);
}
Window_QuestList.categoryList = VisuMZ.QuestSystem.Settings.Categories;
Window_QuestList.prototype = Object.create(Window_Command.prototype);
Window_QuestList.prototype.constructor = Window_QuestList;
Window_QuestList.prototype.initialize = function (_0x4f14bf) {
  this.initCategories();
  Window_Command.prototype.initialize.call(this, _0x4f14bf);
  this.createCommandNameWindow(_0x4f14bf);
  this.deactivate();
  this.deselect();
};
Window_QuestList.prototype.initCategories = function () {
  this._categoryStatus = {};
  for (const _0x54a4b1 of VisuMZ.QuestSystem.Settings.Categories) {
    this._categoryStatus[_0x54a4b1.CategoryName] = true;
  }
  this._categoryFilter = "known";
};
Window_QuestList.prototype.setCategoryFilter = function (_0x2b49d5) {
  if (this._categoryFilter === _0x2b49d5) {
    return;
  }
  this._categoryFilter = _0x2b49d5;
  this.refresh();
};
Window_QuestList.prototype.openCloseCurrentCategory = function () {
  const _0x11859d = this.currentCategory();
  this._categoryStatus[_0x11859d.CategoryName] =
    !this._categoryStatus[_0x11859d.CategoryName];
  this.refresh();
  this.callUpdateHelp();
};
Window_QuestList.prototype.isCurrentCategoryOpen = function () {
  const _0x3e68ec = this.currentCategory();
  return _0x3e68ec && this._categoryStatus[_0x3e68ec.CategoryName];
};
Window_QuestList.prototype.createCommandNameWindow = function (_0x1938ca) {
  const _0x5d24c0 = new Rectangle(0x0, 0x0, _0x1938ca.width, _0x1938ca.height);
  this._commandNameWindow = new Window_Base(_0x5d24c0);
  this._commandNameWindow.opacity = 0x0;
  this.addChild(this._commandNameWindow);
  this.updateCommandNameWindow();
};
Window_QuestList.prototype.callUpdateHelp = function () {
  Window_Command.prototype.callUpdateHelp.call(this);
  if (this._commandNameWindow) {
    this.updateCommandNameWindow();
  }
  if (this._labelWindow) {
    this.updateLabelWindow();
  }
  if (this._logWindow) {
    this.updateLogWindow();
  }
};
Window_QuestList.prototype.updateCommandNameWindow = function () {
  const _0x1b7be3 = this._commandNameWindow;
  _0x1b7be3.contents.clear();
  const _0xec53fd = this.commandStyleCheck(this.index());
  if (_0xec53fd === "icon") {
    const _0x3dcba4 = this.itemLineRect(this.index());
    let _0x47a1c8 = this.commandName(this.index());
    _0x47a1c8 = _0x47a1c8.replace(/\\I\[(\d+)\]/gi, "");
    _0x1b7be3.resetFontSettings();
    this.commandNameWindowDrawBackground(_0x47a1c8, _0x3dcba4);
    this.commandNameWindowDrawText(_0x47a1c8, _0x3dcba4);
    this.commandNameWindowCenter(_0x47a1c8, _0x3dcba4);
  }
};
Window_QuestList.prototype.commandNameWindowDrawBackground = function (
  _0xa7f000,
  _0x1ccfb4
) {};
Window_QuestList.prototype.commandNameWindowDrawText = function (
  _0x211647,
  _0x1b145a
) {
  const _0x4632be = this._commandNameWindow;
  _0x4632be.drawText(
    _0x211647,
    0x0,
    _0x1b145a.y,
    _0x4632be.innerWidth,
    "center"
  );
};
Window_QuestList.prototype.commandNameWindowCenter = function (
  _0x1300e9,
  _0x4c4ead
) {
  const _0x10ba0a = this._commandNameWindow;
  const _0x27cc8c = $gameSystem.windowPadding();
  const _0x35bb04 = _0x4c4ead.x + Math.floor(_0x4c4ead.width / 0x2) + _0x27cc8c;
  _0x10ba0a.x = _0x10ba0a.width / -0x2 + _0x35bb04;
  _0x10ba0a.y = Math.floor(_0x4c4ead.height / 0x2);
};
Window_QuestList.prototype.makeCommandList = function () {
  for (const _0x25e438 of Window_QuestList.categoryList) {
    if (!_0x25e438) {
      continue;
    }
    if (!this.doesCategoryHaveQuestsAvailable(_0x25e438)) {
      continue;
    }
    this.addCategoryCommand(_0x25e438);
    this.makeQuestList(_0x25e438);
  }
  if (this._list.length <= 0x0) {
    this.addNoQuestsListedCommand();
  }
};
Window_QuestList.prototype.addNoQuestsListedCommand = function () {
  this.addCommand(TextManager.noQuestsListed, "cancel", false);
};
Window_QuestList.prototype.doesCategoryHaveQuestsAvailable = function (
  _0x333f24
) {
  for (const _0x5b95ad of _0x333f24.Quests) {
    if (!_0x5b95ad) {
      continue;
    }
    switch (this._categoryFilter) {
      case "known":
        if ($gameSystem.isQuestKnown(_0x5b95ad.Key)) {
          return true;
        }
        break;
      case "completed":
        if ($gameSystem.isQuestCompleted(_0x5b95ad.Key)) {
          return true;
        }
        break;
      case "failed":
        if ($gameSystem.isQuestFailed(_0x5b95ad.Key)) {
          return true;
        }
        break;
    }
  }
  return false;
};
Window_QuestList.prototype.addCategoryCommand = function (_0x3346b6) {
  const _0x290f2f = this.isCategoryOpen(_0x3346b6)
    ? TextManager.questCategoryOpenedFmt
    : TextManager.questCategoryClosedFmt;
  const _0x3668b0 = this.getTotalCategoryQuests(_0x3346b6).length;
  const _0x4a2e51 = _0x290f2f.format(_0x3346b6.CategoryName, _0x3668b0);
  this.addCommand(_0x4a2e51, "category", true, _0x3346b6);
};
Window_QuestList.prototype.getTotalCategoryQuests = function (_0x36fd79) {
  switch (this._categoryFilter) {
    case "known":
      return $gameSystem
        .questsKnown()
        .filter((_0x553b60) => _0x553b60.category === _0x36fd79);
      break;
    case "completed":
      return $gameSystem
        .questsCompleted()
        .filter((_0x126cbb) => _0x126cbb.category === _0x36fd79);
      break;
    case "failed":
      return $gameSystem
        .questsFailed()
        .filter((_0x4da6ef) => _0x4da6ef.category === _0x36fd79);
      break;
  }
  return [];
};
Window_QuestList.prototype.makeQuestList = function (_0x48a105) {
  if (!this.isCategoryOpen(_0x48a105)) {
    return;
  }
  for (const _0x1f5207 of _0x48a105.Quests) {
    if (!_0x1f5207) {
      continue;
    }
    switch (this._categoryFilter) {
      case "known":
        if ($gameSystem.isQuestKnown(_0x1f5207.Key)) {
          this.addQuestCommand(_0x1f5207);
        }
        break;
      case "completed":
        if ($gameSystem.isQuestCompleted(_0x1f5207.Key)) {
          this.addQuestCommand(_0x1f5207);
        }
        break;
      case "failed":
        if ($gameSystem.isQuestFailed(_0x1f5207.Key)) {
          this.addQuestCommand(_0x1f5207);
        }
        break;
    }
  }
};
Window_QuestList.prototype.isCategoryOpen = function (_0xc278f2) {
  return this._categoryStatus[_0xc278f2.CategoryName];
};
Window_QuestList.prototype.addQuestCommand = function (_0xdedfab) {
  let _0x3fd704 = _0xdedfab.Title;
  if (_0xdedfab === $gameSystem.trackedQuest()) {
    _0x3fd704 = TextManager.questTrackedQuestFmt.format(_0x3fd704);
  }
  this.addCommand(_0x3fd704, "quest", true, _0xdedfab);
};
Window_QuestList.prototype.itemTextAlign = function () {
  return "left";
};
Window_QuestList.prototype.drawItem = function (_0x190730) {
  const _0x30096b = this.commandStyleCheck(_0x190730);
  if (_0x30096b === "iconText") {
    this.drawItemStyleIconText(_0x190730);
  } else if (_0x30096b === "icon") {
    this.drawItemStyleIcon(_0x190730);
  } else {
    Window_HorzCommand.prototype.drawItem.call(this, _0x190730);
  }
};
Window_QuestList.prototype.commandStyle = function () {
  return "iconText";
};
Window_QuestList.prototype.commandStyleCheck = function (_0x3387d9) {
  if (_0x3387d9 < 0x0) {
    return "text";
  }
  const _0x1defc5 = this.commandStyle();
  if (_0x1defc5 !== "auto") {
    return _0x1defc5;
  } else {
    if (this.maxItems() > 0x0) {
      const _0x843ae9 = this.commandName(_0x3387d9);
      if (_0x843ae9.match(/\\I\[(\d+)\]/i)) {
        const _0x40ec41 = this.itemLineRect(_0x3387d9);
        const _0x5efe67 = this.textSizeEx(_0x843ae9).width;
        return _0x5efe67 <= _0x40ec41.width ? "iconText" : "icon";
      }
    }
  }
  return "text";
};
Window_QuestList.prototype.drawItemStyleIconText = function (_0x5bacdd) {
  const _0x2f7481 = this.itemLineRect(_0x5bacdd);
  const _0xea1a21 = this.commandName(_0x5bacdd);
  const _0x3db496 = this.textSizeEx(_0xea1a21).width;
  this.changePaintOpacity(this.isCommandEnabled(_0x5bacdd));
  const _0x2edaa3 = this.itemTextAlign();
  if (_0x2edaa3 === "right") {
    this.drawTextEx(
      _0xea1a21,
      _0x2f7481.x + _0x2f7481.width - _0x3db496,
      _0x2f7481.y,
      _0x3db496
    );
  } else {
    if (_0x2edaa3 === "center") {
      const _0x1a5d3a =
        _0x2f7481.x + Math.floor((_0x2f7481.width - _0x3db496) / 0x2);
      this.drawTextEx(_0xea1a21, _0x1a5d3a, _0x2f7481.y, _0x3db496);
    } else {
      this.drawTextEx(_0xea1a21, _0x2f7481.x, _0x2f7481.y, _0x3db496);
    }
  }
};
Window_QuestList.prototype.drawItemStyleIcon = function (_0x190807) {
  this.commandName(_0x190807).match(/\\I\[(\d+)\]/i);
  const _0x2a5e44 = Number(RegExp.$1) || 0x0;
  const _0x127d2d = this.itemLineRect(_0x190807);
  const _0x1539a2 =
    _0x127d2d.x + Math.floor((_0x127d2d.width - ImageManager.iconWidth) / 0x2);
  const _0x557dc2 =
    _0x127d2d.y + (_0x127d2d.height - ImageManager.iconHeight) / 0x2;
  this.drawIcon(_0x2a5e44, _0x1539a2, _0x557dc2);
};
Window_QuestList.prototype.currentCategory = function () {
  return this.currentSymbol() === "category" ? this.currentExt() : null;
};
Window_QuestList.prototype.currentQuest = function () {
  return this.currentSymbol() === "quest" ? this.currentExt() : null;
};
Window_QuestList.prototype.setLabelWindow = function (_0x65ba9) {
  this._labelWindow = _0x65ba9;
  this.callUpdateHelp();
};
Window_QuestList.prototype.updateLabelWindow = function () {
  const _0x4a55bc = this.currentQuest();
  const _0x268dbe = this._labelWindow;
  _0x268dbe.contents.clear();
  const _0x2af0c7 = _0x4a55bc ? _0x4a55bc.Title : TextManager.noQuestsLabel;
  const _0x5879e6 = _0x268dbe.textSizeEx(_0x2af0c7).width;
  const _0x5823bf =
    _0x268dbe.itemPadding() +
    Math.round((_0x268dbe.innerWidth - _0x5879e6) / 0x2);
  _0x268dbe.drawTextEx(_0x2af0c7, _0x5823bf, 0x0, _0x268dbe.innerWidth);
};
Window_QuestList.prototype.setLogWindow = function (_0x3ade17) {
  this._logWindow = _0x3ade17;
  this.callUpdateHelp();
};
Window_QuestList.prototype.updateLogWindow = function () {
  const _0x5896d5 = this.currentQuest();
  const _0x41c894 = this._logWindow;
  _0x41c894.setQuest(_0x5896d5);
};
Window_QuestList.prototype.cursorPagedown = function () {};
Window_QuestList.prototype.cursorPageup = function () {};
Window_QuestList.prototype.isOkEnabled = function () {
  if (this.currentQuest()) {
    return this._categoryFilter === "known";
  } else {
    return Window_Command.prototype.isOkEnabled.call(this);
  }
};
function Window_QuestLog() {
  this.initialize(...arguments);
}
Window_QuestLog.wordWrapSupport =
  VisuMZ.QuestSystem.Settings.Window.LogWindow_Auto_WordWrap;
Window_QuestLog.scrollSpeed =
  VisuMZ.QuestSystem.Settings.Window.LogWindow_ScrollSpeed;
Window_QuestLog.prototype = Object.create(Window_Scrollable.prototype);
Window_QuestLog.prototype.constructor = Window_QuestLog;
Window_QuestLog._delayDraw = 0x19;
Window_QuestLog.prototype.initialize = function (_0x4df07f) {
  this._textHeight = 0x0;
  this._delayDraw = 0x0;
  Window_Scrollable.prototype.initialize.call(this, _0x4df07f);
  this._quest = null;
  this.refresh();
};
Window_QuestLog.prototype.contentsHeight = function () {
  return Math.max(this._textHeight, 0x1);
};
Window_QuestLog.prototype.overallHeight = function () {
  return this.contentsHeight();
};
Window_QuestLog.prototype.update = function () {
  Window_Scrollable.prototype.update.call(this);
  this.updateDelayRefresh();
};
Window_QuestLog.prototype.updateDelayRefresh = function () {
  if (this._delayDraw-- === 0x0) {
    this.refresh();
  }
};
Window_QuestLog.prototype.updateOrigin = function () {
  const _0x17ab98 = this.scrollBlockWidth() || 0x1;
  const _0x5c9117 = this.scrollBlockHeight() || 0x1;
  const _0x3f9a7c = this._scrollX - (this._scrollX % _0x17ab98);
  const _0x3bd579 = this._scrollY - (this._scrollY % _0x5c9117);
  if (_0x3f9a7c !== this._scrollBaseX || _0x3bd579 !== this._scrollBaseY) {
    this.updateScrollBase(_0x3f9a7c, _0x3bd579);
    this.paint();
  }
  this.origin.x = this._scrollX;
  this.origin.y = this._scrollY;
};
Window_QuestLog.prototype.processWheelScroll = function () {
  Window_Scrollable.prototype.processWheelScroll.call(this);
  this.updatePageUpDownScroll();
};
Window_QuestLog.prototype.updatePageUpDownScroll = function () {
  if (Input.isPressed("pagedown")) {
    this.smoothScrollDown(Window_QuestLog.scrollSpeed);
  }
  if (Input.isPressed("pageup")) {
    this.smoothScrollUp(Window_QuestLog.scrollSpeed);
  }
};
Window_QuestLog.prototype.setQuest = function (_0x547747) {
  if (this._quest === _0x547747) {
    return;
  }
  this._quest = _0x547747;
  this._delayDraw = Window_QuestLog._delayDraw;
};
Window_QuestLog.prototype.refresh = function () {
  this.contents.clear();
  this.calculateTextHeight();
  this.createContents();
  this.drawAllText();
};
Window_QuestLog.prototype.calculateTextHeight = function () {
  const _0x5ef64c = this._quest
    ? this.createQuestText()
    : this.createEmptyText();
  this._textHeight = this.textSizeEx(_0x5ef64c.trim()).height;
};
Window_QuestLog.prototype.drawAllText = function () {
  const _0x3b588b = this._quest
    ? this.createQuestText()
    : this.createEmptyText();
  this.drawTextEx(_0x3b588b, 0x0, 0x0, this.innerWidth);
  this._scrollY = 0x0;
  this.origin.y = 0x0;
};
Window_QuestLog.prototype.createEmptyText = function () {
  VisuMZ.QuestSystem.Settings.General.OnLoadQuestJS();
  let _0x248859 = this.getEmptyLogFmt();
  _0x248859 = VisuMZ.QuestSystem.applyWordWrap(_0x248859);
  _0x248859 = VisuMZ.QuestSystem.finalizeWordWrapSupport(_0x248859);
  return _0x248859;
};
Window_QuestLog.prototype.getEmptyLogFmt = function () {
  return TextManager.questEmptyText;
};
Window_QuestLog.prototype.createQuestText = function () {
  const _0x586f8e = this._quest;
  const _0x3e1b39 = _0x586f8e.Key.toUpperCase().trim();
  if (_0x586f8e.OnLoadQuestJS) {
    _0x586f8e.OnLoadQuestJS.call(this);
  }
  let _0x49bd41 = this.getQuestLogFmt();
  _0x49bd41 = VisuMZ.QuestSystem.convertLineBreaksForWordWrap(_0x49bd41);
  _0x49bd41 = _0x49bd41.replace(/\[\[RAWTITLE\]\]/gi, _0x586f8e.Title);
  _0x49bd41 = _0x49bd41.replace(
    /\[\[TITLE\]\]/gi,
    _0x586f8e.Title.replace(/\\I\[(\d+)\]/gi, "").trim()
  );
  _0x49bd41 = _0x49bd41.replace(
    /\[\[DIFFICULTY\]\]/gi,
    _0x586f8e.Difficulty.trim()
  );
  _0x49bd41 = _0x49bd41.replace(/\[\[FROM\]\]/gi, _0x586f8e.From.trim());
  _0x49bd41 = _0x49bd41.replace(
    /\[\[LOCATION\]\]/gi,
    _0x586f8e.Location.trim()
  );
  _0x49bd41 = _0x49bd41.replace(
    /\[\[DESCRIPTION\]\]/gi,
    this.createQuestDescription(_0x3e1b39)
  );
  _0x49bd41 = _0x49bd41.replace(
    /\[\[OBJECTIVES\]\]/gi,
    this.createQuestObjectives(_0x586f8e, _0x3e1b39)
  );
  _0x49bd41 = _0x49bd41.replace(
    /\[\[REWARDS\]\]/gi,
    this.createQuestRewards(_0x586f8e, _0x3e1b39)
  );
  _0x49bd41 = _0x49bd41.replace(
    /\[\[SUBTEXT\]\]/gi,
    this.createQuestSubtext(_0x3e1b39)
  );
  _0x49bd41 = _0x49bd41.replace(
    /\[\[QUOTE\]\]/gi,
    this.createQuestQuote(_0x3e1b39)
  );
  _0x49bd41 = VisuMZ.QuestSystem.finalizeWordWrapSupport(_0x49bd41);
  _0x49bd41 = VisuMZ.QuestSystem.noMessageCoreRemoveEscapeCodes(_0x49bd41);
  return _0x49bd41.trim();
};
Window_QuestLog.prototype.getQuestLogFmt = function () {
  return TextManager.questLogFmt;
};
Window_QuestLog.prototype.createQuestDescription = function (_0x523898) {
  let _0x2d78c4 = $gameSystem.questDescription(_0x523898);
  _0x2d78c4 = VisuMZ.QuestSystem.finalizeWordWrapSupport(_0x2d78c4);
  return _0x2d78c4.trim();
};
Window_QuestLog.prototype.createQuestObjectives = function (
  _0x4f9ebe,
  _0x21f445
) {
  const _0x33a68d = [];
  const _0x3fdf96 = $gameSystem.questObjectives(_0x21f445);
  const _0x516fad = $gameSystem.questObjectivesCompleted(_0x21f445);
  const _0x5b7b9c = $gameSystem.questObjectivesFailed(_0x21f445);
  const _0x504fe0 = _0x3fdf96
    .concat(_0x516fad)
    .concat(_0x5b7b9c)
    .sort((_0x3badd1, _0x1bd486) => _0x3badd1 - _0x1bd486);
  for (const _0x17e4a9 of _0x504fe0) {
    if (!_0x4f9ebe.Objectives[_0x17e4a9]) {
      continue;
    }
    const _0x2ba389 = _0x4f9ebe.Objectives[_0x17e4a9];
    let _0x2d5206 = TextManager.questObjectiveNormalFmt;
    if (_0x516fad.includes(_0x17e4a9)) {
      _0x2d5206 = TextManager.questObjectiveClearedFmt;
    }
    if (_0x5b7b9c.includes(_0x17e4a9)) {
      _0x2d5206 = TextManager.questObjectiveFailedFmt;
    }
    _0x33a68d.push(
      VisuMZ.QuestSystem.applyWordWrapEntry(_0x2d5206.format(_0x2ba389).trim())
    );
  }
  let _0x3f7fdc = VisuMZ.QuestSystem.joinQuestEntries(_0x33a68d);
  return _0x3f7fdc;
};
Window_QuestLog.prototype.createQuestRewards = function (_0x570d68, _0x4df834) {
  const _0x4ad361 = [];
  const _0x3d7e2f = $gameSystem.questRewards(_0x4df834);
  const _0xfc3784 = $gameSystem.questRewardsClaimed(_0x4df834);
  const _0x5e86cf = $gameSystem.questRewardsDenied(_0x4df834);
  const _0x1eb78b = _0x3d7e2f
    .concat(_0xfc3784)
    .concat(_0x5e86cf)
    .sort((_0x2f8108, _0x3ff635) => _0x2f8108 - _0x3ff635);
  for (const _0x5f47cc of _0x1eb78b) {
    if (!_0x570d68.Rewards[_0x5f47cc]) {
      continue;
    }
    const _0x1a502d = _0x570d68.Rewards[_0x5f47cc];
    let _0xf7b08c = TextManager.questRewardsNormalFmt;
    if (_0xfc3784.includes(_0x5f47cc)) {
      _0xf7b08c = TextManager.questRewardsClaimedFmt;
    }
    if (_0x5e86cf.includes(_0x5f47cc)) {
      _0xf7b08c = TextManager.questRewardsDeniedFmt;
    }
    _0x4ad361.push(
      VisuMZ.QuestSystem.applyWordWrapEntry(_0xf7b08c.format(_0x1a502d).trim())
    );
  }
  let _0x5ac480 = VisuMZ.QuestSystem.joinQuestEntries(_0x4ad361);
  return _0x5ac480;
};
Window_QuestLog.prototype.createQuestSubtext = function (_0x2398a7) {
  let _0x3f79ec = $gameSystem.questSubtext(_0x2398a7);
  _0x3f79ec = VisuMZ.QuestSystem.finalizeWordWrapSupport(_0x3f79ec);
  return _0x3f79ec.trim();
};
Window_QuestLog.prototype.createQuestQuote = function (_0x264e28) {
  let _0x55e72a = $gameSystem.questQuote(_0x264e28);
  _0x55e72a = VisuMZ.QuestSystem.finalizeWordWrapSupport(_0x55e72a);
  return _0x55e72a.trim();
};
function Window_QuestTracker() {
  this.initialize(...arguments);
}
Window_QuestTracker.prototype = Object.create(Window_QuestLog.prototype);
Window_QuestTracker.prototype.constructor = Window_QuestTracker;
Window_QuestTracker.scale =
  VisuMZ.QuestSystem.Settings.Window.TrackerWindow_Scale;
Window_QuestTracker.activeBgType =
  VisuMZ.QuestSystem.Settings.Window.TrackerWindow_BgType;
Window_QuestTracker.CLOSE_MINIMUM_OPACITY =
  VisuMZ.QuestSystem.Settings.Tracker.MinTrackerOpacity ?? 0x80;
Window_QuestTracker.CLOSE_FADE_SPEED =
  VisuMZ.QuestSystem.Settings.Tracker.CompassFadeSpeed ?? 0x10;
Window_QuestTracker.prototype.initialize = function (_0x5c9fd7) {
  Window_QuestLog.prototype.initialize.call(this, _0x5c9fd7);
  this.setQuest($gameSystem.trackedQuest());
  this.scale.x = this.scale.y = Window_QuestTracker.scale;
  this.updateVisibility();
};
Window_QuestTracker.prototype.contentsHeight = function () {
  return Math.max(this._textHeight, 0x1);
};
Window_QuestTracker.prototype.getEmptyLogFmt = function () {
  return "";
};
Window_QuestTracker.prototype.getQuestLogFmt = function () {
  return TextManager.questTrackerFmt;
};
Window_QuestTracker.prototype.createContents = function () {
  this.height = this.contentsHeight() + $gameSystem.windowPadding() * 0x2;
  Window_QuestLog.prototype.createContents.call(this);
};
Window_QuestTracker.prototype.setQuest = function (_0x3d1ed2) {
  if (this._quest === _0x3d1ed2) {
    return;
  }
  this._quest = _0x3d1ed2;
  this.refresh();
};
Window_QuestTracker.prototype.refresh = function () {
  if ($gameTemp._questTrackerRefresh) {
    return;
  }
  $gameTemp._questTrackerRefresh = true;
  Window_QuestLog.prototype.refresh.call(this);
  this.setBackgroundType(this._quest ? Window_QuestTracker.activeBgType : 0x2);
  $gameTemp._questTrackerRefresh = false;
};
Window_QuestTracker.prototype.update = function () {
  Window_QuestLog.prototype.update.call(this);
  this.updateOpacity();
  this.updateVisibility();
};
Window_QuestTracker.prototype.updateOpacity = function () {
  let _0x3fbc5b = this.contentsOpacity;
  const _0x3a4c47 = Window_QuestTracker.CLOSE_FADE_SPEED;
  if (this.isCloseToQuestTrackerScreenPosition()) {
    const _0xc854b9 = Window_QuestTracker.CLOSE_MINIMUM_OPACITY;
    _0x3fbc5b = (_0x3fbc5b - _0x3a4c47).clamp(_0xc854b9, 0xff);
  } else {
    _0x3fbc5b += _0x3a4c47;
  }
  this.contentsOpacity = _0x3fbc5b;
  this.backOpacity = _0x3fbc5b;
};
Window_QuestTracker.prototype.isCloseToQuestTrackerScreenPosition =
  function () {
    if (!SceneManager.isSceneMap()) {
      return false;
    }
    const _0x36ebd2 = $gameMap.tileHeight();
    const _0x2eb034 = $gameScreen.zoomScale();
    const _0x1398c5 = $gamePlayer.screenX() * _0x2eb034;
    const _0x4475df =
      ($gamePlayer.screenY() - Math.floor((_0x36ebd2 / 0x2) * _0x2eb034)) *
      _0x2eb034;
    const _0x5b802c = new Point(_0x1398c5, _0x4475df);
    const _0x3e54eb = this.worldTransform.applyInverse(_0x5b802c);
    return this.innerRect.contains(_0x3e54eb.x, _0x3e54eb.y);
  };
Window_QuestTracker.prototype.updateVisibility = function () {
  const _0x4e8b2d = this.visibilityLevel();
  this.openness = _0x4e8b2d;
};
Window_QuestTracker.prototype.visibilityLevel = function () {
  if (!ConfigManager.questTrackerShow) {
    return 0x0;
  }
  if ($gameTemp._doodadEditorMode) {
    return 0x0;
  }
  const _0x1026bb = SceneManager._scene;
  if (_0x1026bb && _0x1026bb._messageWindow) {
    if (_0x1026bb._messageWindow.openness > 0x0) {
      return 0x0;
    }
  }
  if (!this._quest) {
    return 0x0;
  }
  if ($gamePlayer.isTransferring()) {
    return 0x0;
  }
  if ($gameParty.inBattle()) {
    return 0x0;
  }
  if (SceneManager.isSceneChanging()) {
    return 0x0;
  }
  return $gameSystem.isQuestTrackerVisible() ? 0xff : 0x0;
};
VisuMZ.QuestSystem.finalizeWordWrapSupport = function (_0x31173c) {
  if (!Window_QuestLog.wordWrapSupport) {
    return _0x31173c;
  }
  if (!Imported.VisuMZ_1_MessageCore) {
    return _0x31173c;
  }
  _0x31173c = "<WORDWRAP>%1".format(_0x31173c);
  return _0x31173c;
};
VisuMZ.QuestSystem.noMessageCoreRemoveEscapeCodes = function (_0x35b9a8) {
  if (Imported.VisuMZ_1_MessageCore) {
    return _0x35b9a8;
  }
  _0x35b9a8 = _0x35b9a8.replace(/<COLORLOCK>/gi, "");
  _0x35b9a8 = _0x35b9a8.replace(/<\/COLORLOCK>/gi, "");
  return _0x35b9a8;
};
VisuMZ.QuestSystem.applyWordWrap = function (_0x4404d1) {
  if (!Window_QuestLog.wordWrapSupport) {
    return _0x4404d1.replace(/<(?:BR|LINEBREAK)>/gi, "");
  }
  if (!Imported.VisuMZ_1_MessageCore) {
    return _0x4404d1.replace(/<(?:BR|LINEBREAK)>/gi, "");
  }
  if (VisuMZ.MessageCore.Settings.WordWrap.LineBreakSpace) {
    _0x4404d1 = _0x4404d1.replace(/[\n\r]+/g, "WrapBreak[0]");
  } else {
    _0x4404d1 = _0x4404d1.replace(/[\n\r]+/g, "");
  }
  return _0x4404d1;
};
VisuMZ.QuestSystem.convertLineBreaksForWordWrap = function (_0x4d6ec6) {
  if (!Window_QuestLog.wordWrapSupport) {
    return _0x4d6ec6;
  }
  if (!Imported.VisuMZ_1_MessageCore) {
    return _0x4d6ec6;
  }
  return _0x4d6ec6.trim().replace(/[\n\r]/g, "<BR>");
};
VisuMZ.QuestSystem.applyWordWrapEntry = function (_0x3d5309) {
  if (!Window_QuestLog.wordWrapSupport) {
    return _0x3d5309;
  }
  if (!Imported.VisuMZ_1_MessageCore) {
    return _0x3d5309;
  }
  return VisuMZ.QuestSystem.applyWordWrap(_0x3d5309.trim());
};
VisuMZ.QuestSystem.joinQuestEntries = function (_0x209f8c) {
  if (!Window_QuestLog.wordWrapSupport) {
    return _0x209f8c.join("\n").trim();
  }
  if (!Imported.VisuMZ_1_MessageCore) {
    return _0x209f8c.join("\n").trim();
  }
  return _0x209f8c.join("<BR>").trim();
};
totalQuestsAvailable = function () {
  return $gameSystem.questData().known.length;
};
totalQuestsCompleted = function () {
  return $gameSystem.questData().completed.length;
};
totalQuestsFailed = function () {
  return $gameSystem.questData().failed.length;
};
totalQuestsRevealed = function () {
  return totalQuestsAvailable() + totalQuestsCompleted() + totalQuestsFailed();
};
totalQuestsInGame = function () {
  return VisuMZ.QuestSystem.QuestOrder.length;
};
getQuestDescriptionIndex = function (_0x36f464) {
  _0x36f464 = _0x36f464.toUpperCase().trim();
  const _0x11aa3b = $gameSystem.quest(_0x36f464);
  if (!_0x11aa3b) {
    return -0x1;
  }
  $gameSystem.questDescription(_0x36f464);
  const _0x57f8e0 = $gameSystem.questData().description;
  return _0x57f8e0[_0x36f464] || 0x0;
};
totalVisibleQuestObjectives = function (_0x439e4a) {
  _0x439e4a = _0x439e4a.toUpperCase().trim();
  const _0x57ed91 = $gameSystem.quest(_0x439e4a);
  if (!_0x57ed91) {
    return -0x1;
  }
  $gameSystem.questObjectives(_0x439e4a);
  const _0x6332c = $gameSystem.questData().objectives || {};
  if (!_0x6332c[_0x439e4a]) {
    return 0x0;
  }
  return _0x6332c[_0x439e4a].length;
};
totalQuestObjectives = function (_0x323925) {
  _0x323925 = _0x323925.toUpperCase().trim();
  const _0x48c053 = $gameSystem.quest(_0x323925);
  return _0x48c053 ? _0x48c053.Objectives.length - 0x1 : 0x0;
};
totalVisibleQuestRewards = function (_0x422ca5) {
  _0x422ca5 = _0x422ca5.toUpperCase().trim();
  const _0x5a138d = $gameSystem.quest(_0x422ca5);
  if (!_0x5a138d) {
    return -0x1;
  }
  $gameSystem.questRewards(_0x422ca5);
  const _0x2046f6 = $gameSystem.questData().rewards || {};
  if (!_0x2046f6[_0x422ca5]) {
    return 0x0;
  }
  return _0x2046f6[_0x422ca5].length;
};
totalQuestRewards = function (_0x198b5d) {
  _0x198b5d = _0x198b5d.toUpperCase().trim();
  const _0x98974f = $gameSystem.quest(_0x198b5d);
  return _0x98974f ? _0x98974f.Rewards.length - 0x1 : 0x0;
};
getQuestSubtextIndex = function (_0x47235b) {
  _0x47235b = _0x47235b.toUpperCase().trim();
  const _0xdf9856 = $gameSystem.quest(_0x47235b);
  if (!_0xdf9856) {
    return -0x1;
  }
  $gameSystem.questSubtext(_0x47235b);
  const _0x4ba74d = $gameSystem.questData().subtext;
  return _0x4ba74d[_0x47235b] || 0x0;
};
getQuestQuoteIndex = function (_0x3e6cbc) {
  _0x3e6cbc = _0x3e6cbc.toUpperCase().trim();
  const _0x13f11a = $gameSystem.quest(_0x3e6cbc);
  if (!_0x13f11a) {
    return -0x1;
  }
  $gameSystem.questQuote(_0x3e6cbc);
  const _0x574cdd = $gameSystem.questData().quotes;
  return _0x574cdd[_0x3e6cbc] || 0x0;
};
isQuestObjectiveCompleted = function (_0x13eab2, _0x43e637) {
  _0x13eab2 = _0x13eab2.toUpperCase().trim();
  const _0x378cb8 = $gameSystem.quest(_0x13eab2);
  if (!_0x378cb8) {
    return false;
  }
  $gameSystem.questObjectives(_0x13eab2);
  const _0x354388 = $gameSystem.questData().objectivesCompleted;
  if (!_0x354388[_0x13eab2]) {
    return false;
  }
  return _0x354388[_0x13eab2].includes(_0x43e637);
};
isQuestObjectiveFailed = function (_0x28780f, _0x18b59e) {
  _0x28780f = _0x28780f.toUpperCase().trim();
  const _0x3a9814 = $gameSystem.quest(_0x28780f);
  if (!_0x3a9814) {
    return false;
  }
  $gameSystem.questObjectives(_0x28780f);
  const _0xa79bc4 = $gameSystem.questData().objectivesFailed;
  if (!_0xa79bc4[_0x28780f]) {
    return false;
  }
  return _0xa79bc4[_0x28780f].includes(_0x18b59e);
};
isQuestObjectiveUncleared = function (_0x1f98da, _0x29f257) {
  _0x1f98da = _0x1f98da.toUpperCase().trim();
  const _0xf734d7 = $gameSystem.quest(_0x1f98da);
  if (!_0xf734d7) {
    return false;
  }
  $gameSystem.questObjectives(_0x1f98da);
  const _0x2959f8 = $gameSystem.questData().objectives;
  if (!_0x2959f8[_0x1f98da]) {
    return false;
  }
  return _0x2959f8[_0x1f98da].includes(_0x29f257);
};
isQuestRewardClaimed = function (_0x5c4c8b, _0x462998) {
  _0x5c4c8b = _0x5c4c8b.toUpperCase().trim();
  const _0x797c9c = $gameSystem.quest(_0x5c4c8b);
  if (!_0x797c9c) {
    return false;
  }
  $gameSystem.questRewards(_0x5c4c8b);
  const _0x1a78a4 = $gameSystem.questData().rewardsClaimed;
  if (!_0x1a78a4[_0x5c4c8b]) {
    return false;
  }
  return _0x1a78a4[_0x5c4c8b].includes(_0x462998);
};
isQuestRewardDenied = function (_0x39a377, _0x28764b) {
  _0x39a377 = _0x39a377.toUpperCase().trim();
  const _0x6748ed = $gameSystem.quest(_0x39a377);
  if (!_0x6748ed) {
    return false;
  }
  $gameSystem.questRewards(_0x39a377);
  const _0x6c9521 = $gameSystem.questData().rewardsDenied;
  if (!_0x6c9521[_0x39a377]) {
    return false;
  }
  return _0x6c9521[_0x39a377].includes(_0x28764b);
};
isQuestRewardUnclaimed = function (_0x2c1da0, _0x8d6d91) {
  _0x2c1da0 = _0x2c1da0.toUpperCase().trim();
  const _0x1d9d04 = $gameSystem.quest(_0x2c1da0);
  if (!_0x1d9d04) {
    return false;
  }
  $gameSystem.questRewards(_0x2c1da0);
  const _0x21c40f = $gameSystem.questData().rewards;
  if (!_0x21c40f[_0x2c1da0]) {
    return false;
  }
  return _0x21c40f[_0x2c1da0].includes(_0x8d6d91);
};
