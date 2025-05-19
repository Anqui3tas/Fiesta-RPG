/*:
 * @target MZ
 * @plugindesc [v1.0] Customizable Beauty Shop with CSV-driven customization, tiered access, and overlays. Compatible with VisuStella.
 * @author You
 * 
 * @param ImageRootFolder
 * @text Image Root Folder
 * @type string
 * @default img/beautyshop/
 * @desc Root folder for all overlay and icon images.
 
 * @param EnableTiers
 * @text Enable Tier Levels
 * @type boolean
 * @default true
 * @desc If true, enables item gating by tier levels.
 
 * @param TierItems
 * @text Tier Level Item IDs
 * @type struct<TierItem>[] 
 * @default []
 * @desc List of required item IDs for each tier level (1–99). Used if tier checking is enabled.
 
 * @param ConsumeItem
 * @text Consume Item on Use
 * @type boolean
 * @default false
 * @desc If true, the required item is consumed when a style is selected.
 *
 * @help
 * == Beauty Shop File Structure ==
 * 
 * CSV File:
 * - Place in: /data/beauty_items.csv
 * - Defines available customization options (hair, face, outfit, skin)
 * 
 * Icon Sheets:
 * - Place in: /img/beautyshop/icons/
 * - Format: IconSheet1.png, IconSheet2.png, etc.
 * - Each sheet contains a 10x10 grid of 32x32 icons (IDs 0–99 per sheet)
 * 
 * Style Overlay Images:
 * - Place in: /img/beautyshop/{FOLDER}/
 * - Each item's image file path is defined in the CSV under FOLDER and NAME
 * - Example: "HairStyles/hair_bob.png"
 * 
 * Overlay Icons:
 * - Place in: /img/system/
 * - Icon_Current.png: Marks currently selected style
 * - Icon_Locked.png: Shows for tier-locked styles
 */
 
/*~struct~TierItem:
 * @param Tier
 * @type number
 * @min 1
 * @max 99
 * @desc The tier level (e.g., 1, 2, 3).
 
 * @param ItemID
 * @type item
 * @desc ID of the required item for this tier.
 */

(() => {
    const pluginName = "BeautyShop_MZ";
    const parameters = PluginManager.parameters(pluginName);
    const IMAGE_ROOT_FOLDER = String(parameters["ImageRootFolder"] || "img/beautyshop/");
    const ENABLE_TIERS = parameters["EnableTiers"] === "true";
    const CONSUME_ITEM = parameters["ConsumeItem"] === "true";
 
    const TIER_ITEMS = (function() {
        const raw = JSON.parse(parameters["TierItems"] || "[]");
        const map = {};
        for (const obj of raw) {
            const data = JSON.parse(obj);
            map[Number(data.Tier)] = Number(data.ItemID);
        }
        return map;
    })();
    
    const BEAUTY_CSV_PATH = "data/beauty_items.csv";

    // Define a column map for easy field access
    const COLUMN_MAP = {
        type: "TYPE",
        folder: "FOLDER",
        name: "NAME",
        icon: "ICON",
        displayName: "DISPLAY_NAME",
        description: "DESCRIPTION",
    tier: "TIER",
    requiredItemId: "REQUIRES_ITEM_ID"
    };

    let $beautyOptions = []; // Holds parsed CSV data

    function loadBeautyCSV() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", BEAUTY_CSV_PATH);
            xhr.overrideMimeType("text/plain");
            xhr.onload = () => {
                if (xhr.status < 400) {
                    $beautyOptions = parseBeautyCSV(xhr.responseText);
                    resolve($beautyOptions);
                } else {
                    reject(new Error("Failed to load CSV: " + xhr.status));
                }
            };
            xhr.onerror = () => reject(new Error("CSV file request failed."));
            xhr.send();
        });
    }

    function parseBeautyCSV(data) {
        const lines = data.split(/\r?\n/).filter(line => line.trim());
        const headers = lines.shift().split(",");
        return lines.map(line => {
            const cols = line.split(",");
            const entry = {};
            headers.forEach((header, i) => {
                entry[header.trim()] = cols[i] ? cols[i].trim() : "";
            });
            return entry;
        });
    }

    PluginManager.registerCommand(pluginName, "OpenBeautyShop", args => {
      const actorId = Number(args.actorId || 1);
      SceneManager.push(Scene_BeautyShop);
      SceneManager.prepareNextScene(actorId);
    });
  
    class Scene_BeautyShop extends Scene_MenuBase {
      prepare(actorId) {
        this._actorId = actorId;
      }
  
      create() {
        super.create();
        this._actor = $gameActors.actor(this._actorId);
        this.createBackground();
        this.createCharacterDisplay();
        this.createMenuWindow();
      }
  
      createBackground() {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
      }
  
      createCharacterDisplay() {
        this._characterSprite = new Sprite_CharacterPreview(this._actor);
        this._characterSprite.x = Graphics.width / 4;
        this._characterSprite.y = Graphics.height / 2;
        this.addChild(this._characterSprite);

        this._rotateLeftButton = new Sprite_Button();
        this._rotateLeftButton.bitmap = ImageManager.loadSystem("ArrowLeft");
        this._rotateLeftButton.x = this._characterSprite.x - 96;
        this._rotateLeftButton.y = this._characterSprite.y;
        this._rotateLeftButton.setClickHandler(() => {
            this._characterSprite.rotateDirection(-1);
        });
        this.addChild(this._rotateLeftButton);

        this._rotateRightButton = new Sprite_Button();
        this._rotateRightButton.bitmap = ImageManager.loadSystem("ArrowRight");
        this._rotateRightButton.x = this._characterSprite.x + 96;
        this._rotateRightButton.y = this._characterSprite.y;
        this._rotateRightButton.setClickHandler(() => {
            this._characterSprite.rotateDirection(1);
        });
        this.addChild(this._rotateRightButton);
      }
  
      createMenuWindow() {
        const rect = new Rectangle(Graphics.width / 2, 0, Graphics.width / 2, Graphics.height);
        this._menuWindow = new Window_BeautyMenu(rect);
        this._menuWindow.setHandler("gender", this.onGenderSelect.bind(this));
        this._menuWindow.setHandler("hair", this.onHairSelect.bind(this));
        this._menuWindow.setHandler("face", this.onFaceSelect.bind(this));
        this._menuWindow.setHandler("outfit", this.onOutfitSelect.bind(this));
        this._menuWindow.setHandler("skin", this.onSkinSelect.bind(this)); // Added skin tone option
        this._menuWindow.setHandler("save", this.onSave.bind(this));
        this._menuWindow.setHandler("cancel", this.popScene.bind(this));
        this.addChild(this._menuWindow);
      }

      onGenderSelect() {
          const choices = ["Male", "Female", "Non-binary", "Cancel"];
          const defaultIndex = this._actor._genderIndex || 0;
          const cancelType = 3;
          const message = "Select a gender:";
 
          $gameMessage.setChoices(choices, defaultIndex, cancelType);
          $gameMessage.setChoiceCallback(choiceIndex => {
              if (choiceIndex < 3) {
                  this._actor._genderIndex = choiceIndex;
                  console.log(`Gender set to: ${choices[choiceIndex]}`);
                  // Optionally update actor visuals or meta tags here
              }
          });
 
          this._menuWindow.deactivate();
          this._menuWindow.close();
          this._characterSprite.visible = false;
 
          this._waitForMessage = true;
      }

      onHairSelect() {
          loadBeautyCSV().then(() => {
              const gender = this._actor._genderIndex ?? 0;
              const items = $beautyOptions
                  .filter(opt => opt[COLUMN_MAP.type] === "hair")
                  .filter(opt => {
                      if (!ENABLE_TIERS) return true;
                      const tier = Number(opt[COLUMN_MAP.tier] || 0);
                      const requiredItemId = TIER_ITEMS[tier] || 0;
                      return requiredItemId === 0 || $gameParty.hasItem($dataItems[requiredItemId]);
                  })
                  .sort((a, b) => {
                      const tierDiff = Number(a[COLUMN_MAP.tier]) - Number(b[COLUMN_MAP.tier]);
                      return tierDiff !== 0 ? tierDiff : 0;
                  });
 
              this._hairWindow = new Window_BeautyOptionGrid(new Rectangle(100, 100, Graphics.width - 200, Graphics.height - 200), items);
              this._hairWindow.setHandler("ok", () => {
                  const selected = this._hairWindow.item();
                  this._actor._selectedHair = selected;
                  console.log("Selected hair:", selected[COLUMN_MAP.name]);
                  this._characterSprite.refreshHairOverlay(selected);
                  this._hairWindow.close();
                  this._hairWindow.deactivate();
                  this._menuWindow.open();
                  this._menuWindow.activate();
              });
              this._hairWindow.setHandler("cancel", () => {
                  this._hairWindow.close();
                  this._hairWindow.deactivate();
                  this._menuWindow.open();
                  this._menuWindow.activate();
              });
              this.addChild(this._hairWindow);
              this._menuWindow.deactivate();
              this._menuWindow.close();
          });
      }

      onFaceSelect() {
          loadBeautyCSV().then(() => {
              const gender = this._actor._genderIndex ?? 0;
              const items = $beautyOptions
                  .filter(opt => opt[COLUMN_MAP.type] === "face")
                  .filter(opt => {
                      if (!ENABLE_TIERS) return true;
                      const tier = Number(opt[COLUMN_MAP.tier] || 0);
                      const requiredItemId = TIER_ITEMS[tier] || 0;
                      return requiredItemId === 0 || $gameParty.hasItem($dataItems[requiredItemId]);
                  })
                  .sort((a, b) => {
                      const tierDiff = Number(a[COLUMN_MAP.tier]) - Number(b[COLUMN_MAP.tier]);
                      return tierDiff !== 0 ? tierDiff : 0;
                  });
 
              this._faceWindow = new Window_BeautyOptionGrid(new Rectangle(100, 100, Graphics.width - 200, Graphics.height - 200), items);
              this._faceWindow.setHandler("ok", () => {
                  const selected = this._faceWindow.item();
                  this._actor._selectedFace = selected;
                  console.log("Selected face:", selected[COLUMN_MAP.name]);
                  this._characterSprite.refreshFaceOverlay(selected);
                  this._faceWindow.close();
                  this._faceWindow.deactivate();
                  this._menuWindow.open();
                  this._menuWindow.activate();
              });
              this._faceWindow.setHandler("cancel", () => {
                  this._faceWindow.close();
                  this._faceWindow.deactivate();
                  this._menuWindow.open();
                  this._menuWindow.activate();
              });
              this.addChild(this._faceWindow);
              this._menuWindow.deactivate();
              this._menuWindow.close();
          });
      }

      onOutfitSelect() {
          loadBeautyCSV().then(() => {
              const gender = this._actor._genderIndex ?? 0;
              const items = $beautyOptions
                  .filter(opt => opt[COLUMN_MAP.type] === "outfit")
                  .filter(opt => {
                      if (!ENABLE_TIERS) return true;
                      const tier = Number(opt[COLUMN_MAP.tier] || 0);
                      const requiredItemId = TIER_ITEMS[tier] || 0;
                      return requiredItemId === 0 || $gameParty.hasItem($dataItems[requiredItemId]);
                  })
                  .sort((a, b) => {
                      const tierDiff = Number(a[COLUMN_MAP.tier]) - Number(b[COLUMN_MAP.tier]);
                      return tierDiff !== 0 ? tierDiff : 0;
                  });

              this._outfitWindow = new Window_BeautyOptionGrid(new Rectangle(100, 100, Graphics.width - 200, Graphics.height - 200), items);
              this._outfitWindow.setHandler("ok", () => {
                  const selected = this._outfitWindow.item();
                  this._actor._selectedOutfit = selected;
                  console.log("Selected outfit:", selected[COLUMN_MAP.name]);
                  this._characterSprite.refreshOutfitOverlay(selected);
                  this._outfitWindow.close();
                  this._outfitWindow.deactivate();
                  this._menuWindow.open();
                  this._menuWindow.activate();
              });
              this._outfitWindow.setHandler("cancel", () => {
                  this._outfitWindow.close();
                  this._outfitWindow.deactivate();
                  this._menuWindow.open();
                  this._menuWindow.activate();
              });
              this.addChild(this._outfitWindow);
              this._menuWindow.deactivate();
              this._menuWindow.close();
          });
      }

      onSkinSelect() { // Added skin tone selection
          loadBeautyCSV().then(() => {
              const gender = this._actor._genderIndex ?? 0;
              const items = $beautyOptions
                  .filter(opt => opt[COLUMN_MAP.type] === "skin")
                  .filter(opt => {
                      if (!ENABLE_TIERS) return true;
                      const tier = Number(opt[COLUMN_MAP.tier] || 0);
                      const requiredItemId = TIER_ITEMS[tier] || 0;
                      return requiredItemId === 0 || $gameParty.hasItem($dataItems[requiredItemId]);
                  })
                  .sort((a, b) => {
                      const tierDiff = Number(a[COLUMN_MAP.tier]) - Number(b[COLUMN_MAP.tier]);
                      return tierDiff !== 0 ? tierDiff : 0;
                  });

              this._skinWindow = new Window_BeautyOptionGrid(new Rectangle(100, 100, Graphics.width - 200, Graphics.height - 200), items);
              this._skinWindow.setHandler("ok", () => {
                  const selected = this._skinWindow.item();
                  this._actor._selectedSkin = selected;
                  console.log("Selected skin tone:", selected[COLUMN_MAP.name]);
                  this._characterSprite.refreshSkinOverlay(selected);
                  this._skinWindow.close();
                  this._skinWindow.deactivate();
                  this._menuWindow.open();
                  this._menuWindow.activate();
              });
              this._skinWindow.setHandler("cancel", () => {
                  this._skinWindow.close();
                  this._skinWindow.deactivate();
                  this._menuWindow.open();
                  this._menuWindow.activate();
              });
              this.addChild(this._skinWindow);
              this._menuWindow.deactivate();
              this._menuWindow.close();
          });
      }
      
      onSave() {
          const actor = this._actor;
  
          if (actor._selectedHair) {
              actor._hair = actor._selectedHair;
          }
          if (actor._selectedFace) {
              actor._face = actor._selectedFace;
          }
          if (actor._selectedOutfit) {
              actor._outfit = actor._selectedOutfit;
          }
          if (actor._selectedSkin) {
              actor._skin = actor._selectedSkin;
          }
  
          if (CONSUME_ITEM && ENABLE_TIERS) {
              for (const key of ["_selectedHair", "_selectedFace", "_selectedOutfit", "_selectedSkin"]) {
                  const selected = actor[key];
                  if (!selected) continue;
                  const tier = Number(selected[COLUMN_MAP.tier] || 0);
                  const itemId = TIER_ITEMS[tier];
                  if (itemId && $gameParty.hasItem($dataItems[itemId])) {
                      $gameParty.loseItem($dataItems[itemId], 1);
                  }
              }
          }
          $gameMessage.add("Appearance updated successfully!");
          this.popScene();
      }

      update() {
          super.update();
          if (this._waitForMessage && !$gameMessage.isBusy()) {
              this._waitForMessage = false;
              this._menuWindow.open();
              this._menuWindow.activate();
              this._characterSprite.visible = true;
          }
      }
    }

    class Window_BeautyOptionGrid extends Window_Selectable {
        constructor(rect, items) {
            super(rect);
            this._items = items;
            this.refresh();
            this.select(0);
            this.activate();
        }

        maxCols() {
            return 10;
        }

        maxItems() {
            return this._items.length;
        }

        drawItem(index) {
            const item = this._items[index];
            const rect = this.itemRect(index);
            const iconId = Number(item[COLUMN_MAP.icon]);
            const sheetIndex = Math.floor(iconId / 100);
            const iconIndex = iconId % 100;
            const iconX = (iconIndex % 10) * 32;
            const iconY = Math.floor(iconIndex / 10) * 32;
            const iconBitmap = ImageManager.loadBitmap("img/beautyshop/icons", `IconSheet${sheetIndex + 1}`);
            this.contents.blt(iconBitmap, iconX, iconY, 32, 32, rect.x + 4, rect.y + 4);

            const currentActor = $gameParty.leader();
            const selectedKeys = ["_selectedHair", "_selectedFace", "_selectedOutfit", "_selectedSkin"];
            const match = selectedKeys.some(k => currentActor[k]?.[COLUMN_MAP.name] === item[COLUMN_MAP.name]);

            if (match) {
                const overlay = ImageManager.loadSystem("Icon_Current");
                this.contents.blt(overlay, 0, 0, 32, 32, rect.x + 4, rect.y + 4);
            }

            if (ENABLE_TIERS) {
                const tier = Number(item[COLUMN_MAP.tier] || 0);
                const requiredItemId = TIER_ITEMS[tier] || 0;
                const hasItem = requiredItemId === 0 || $gameParty.hasItem($dataItems[requiredItemId]);
                if (!hasItem) {
                    const lockOverlay = ImageManager.loadSystem("Icon_Locked");
                    this.contents.blt(lockOverlay, 0, 0, 32, 32, rect.x + 4, rect.y + 4);
                }
            }
        }

        itemHeight() {
            return 36;
        }

        itemWidth() {
            return 36;
        }

        item() {
            return this._items[this.index()];
        }
    }
  
    class Sprite_CharacterPreview extends Sprite {
      constructor(actor) {
        super();
        this._actor = actor;
        this._direction = 2; // Down
        this._pattern = 1;   // Middle frame
        this._frameCounter = 0;
        this.createBitmap();
      }
  
      createBitmap() {
        this.bitmap = ImageManager.loadCharacter(this._actor.characterName());
        this.updateFrame();
      }

      rotateDirection(dir) {
          const directions = [2, 4, 8, 6]; // Down, Left, Up, Right
          let index = directions.indexOf(this._direction);
          index = (index + dir + directions.length) % directions.length;
          this._direction = directions[index];
          this.updateFrame();
      }

      updateFrame() {
        if (!this.bitmap) return;
        const index = this._actor.characterIndex();
        const pw = this.bitmap.width / 12;
        const ph = this.bitmap.height / 8;
        const sx = (index % 4) * 3 * pw + this._pattern * pw;
        const sy = Math.floor(index / 4) * 4 * ph + (this._direction / 2 - 1) * ph;
        this.setFrame(sx, sy, pw, ph);
      }

      update() {
          super.update();
          this._frameCounter++;
          if (this._frameCounter % 30 === 0) {
              this._pattern = (this._pattern + 1) % 3;
              this.updateFrame();
          }
      }

      refreshHairOverlay(selected) {
          if (!selected || !selected[COLUMN_MAP.folder] || !selected[COLUMN_MAP.name]) return;
 
          const folder = selected[COLUMN_MAP.folder];
          const name = selected[COLUMN_MAP.name];
          const path = `${folder}/${name}`;
          const bitmap = ImageManager.loadBitmap("img/beautyshop/", path);
 
          if (this._hairOverlay) {
              this.removeChild(this._hairOverlay);
          }
 
          this._hairOverlay = new Sprite(bitmap);
          this._hairOverlay.x = 0;
          this._hairOverlay.y = 0;
          this._hairOverlay.z = 10;
          this.addChild(this._hairOverlay);
      }
      
      refreshFaceOverlay(selected) {
          if (!selected || !selected[COLUMN_MAP.folder] || !selected[COLUMN_MAP.name]) return;
 
          const folder = selected[COLUMN_MAP.folder];
          const name = selected[COLUMN_MAP.name];
          const path = `${folder}/${name}`;
          const bitmap = ImageManager.loadBitmap("img/beautyshop/", path);
 
          if (this._faceOverlay) {
              this.removeChild(this._faceOverlay);
          }
 
          this._faceOverlay = new Sprite(bitmap);
          this._faceOverlay.x = 0;
          this._faceOverlay.y = 0;
          this._faceOverlay.z = 15;
          this.addChild(this._faceOverlay);
      }

      refreshOutfitOverlay(selected) {
          if (!selected || !selected[COLUMN_MAP.folder] || !selected[COLUMN_MAP.name]) return;

          const folder = selected[COLUMN_MAP.folder];
          const name = selected[COLUMN_MAP.name];
          const path = `${folder}/${name}`;
          const bitmap = ImageManager.loadBitmap("img/beautyshop/", path);

          if (this._outfitOverlay) {
              this.removeChild(this._outfitOverlay);
          }

          this._outfitOverlay = new Sprite(bitmap);
          this._outfitOverlay.x = 0;
          this._outfitOverlay.y = 0;
          this._outfitOverlay.z = 5;
          this.addChild(this._outfitOverlay);
      }

      refreshSkinOverlay(selected) { // Added skin overlay refresh
          if (!selected || !selected[COLUMN_MAP.folder] || !selected[COLUMN_MAP.name]) return;

          const folder = selected[COLUMN_MAP.folder];
          const name = selected[COLUMN_MAP.name];
          const path = `${folder}/${name}`;
          const bitmap = ImageManager.loadBitmap("img/beautyshop/", path);

          if (this._skinOverlay) {
              this.removeChild(this._skinOverlay);
          }

          this._skinOverlay = new Sprite(bitmap);
          this._skinOverlay.x = 0;
          this._skinOverlay.y = 0;
          this._skinOverlay.z = 3;
          this.addChild(this._skinOverlay);
      }
    }
  
    class Window_BeautyMenu extends Window_Command {
      constructor(rect) {
        super(rect);
      }
  
      makeCommandList() {
        this.addCommand("Gender", "gender");
        this.addCommand("Hair", "hair");
        this.addCommand("Face", "face");
        this.addCommand("Outfit", "outfit");
        this.addCommand("Skin", "skin"); // Added skin option
        this.addCommand("Cancel", "cancel");
      }
    }
  })();