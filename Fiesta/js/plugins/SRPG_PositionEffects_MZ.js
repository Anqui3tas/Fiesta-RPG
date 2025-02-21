//-----------------------------------------------------------------------------
// SRPG_PositionEffects_MZ.js
// Copyright (c) 2020 SRPG Team. All rights reserved.
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc SRPG extension for movement and positioning skills, edited by OhisamaCraft.
 * @author Dr. Q
 * @base SRPG_core_MZ
 * @orderAfter SRPG_core_MZ
 * 
 * @param cellTargetUnavailableRegion
 * @desc set regions that cannot be selected by cell target. If set to 0, no regions will be specified.
 * @type number
 * @min 0
 * @default 255
 *
 * @help
 * copyright 2020 SRPG Team. all rights reserved.
 * Released under the MIT license.
 * ============================================================================
 * Script calls that can be put in damage formulas or lunatic notetags
 * to make skills that push, pull, move, and teleport.
 *
 * In addition, skills with the <cellTarget> tag can target unoccupied passable
 * cells for teleportation, or, with some creative events and other plugins,
 * things like summoning skills, terrain modifications, etc.
 * 
 * Note: In RPG Maker, ceiling tiles can be traversed even if they are set 
 * as impassable. As a result, they can be targeted with <cellTarget> skills. 
 * To prevent this, set ceiling tiles as non-passable tiles (terrain tag 7) or 
 * specify them in the cellTargetUnavailableRegion.
 *
 * By default, these skills can target any cell the user can move through,
 * based on their srpgThroughTag settings and the terrain tag, but you can
 * use the <srpgTargetTag:X> on a skill or item to specify your own limitation,
 * such as if the skill summons or moves an entity other than the user.
 *
 * New actor, class, enemy, weapon, armor, and state notetag:
 * <srpgImmovable> prevents the unit from being pushed, pulled, or swapped with
 * It does not prevent self movement, such as forward, back, or teleport
 * (immovable applies for unit b, but is ignored for unit a)
 *
 * New skill/item notetag:
 * <cellTarget> allows a skill to target an unoccupied cell on the map,
 * even if it normally wouldn't
 *
 * <anyTarget> allows a skill to target players and enemies alike
 * Useful for positioning skills or AoEs, but may confuse AI units
 *
 *
 * Information script calls:
 * a.event() returns the event associated with the battler in SRPG mode
 * a.srpgImmovable() returns true if the battler is immovable
 *
 * Utility script calls:
 * a.focus() centers the cursor (and camera) on a
 * a.face(b) turns a to face b
 * a.faceCursor() turns a to face the current cursor position
 * a.faceAoE() turns a to face the center of the current AoE
 *
 * Movement script calls:
 * a.push(b, distance, type) pushes b away from a
 * a.pull(b, distance, type) pulls b toward a
 * a.pushRight(b, distance, type) moves b right (clockwise) around a
 * a.pushLeft(b, distance, type) moves b left (counter-clockwise) around a
 * a.forward(distance, type) moves a in the direction they're facing
 * a.back(distance, type) moves a in the opposite direction they're facing
 * a.pushAoE(b, distance, type) pushes b away from the center of the AoE (requires SRPG_AoE.js)
 * a.pullAoE(b, distance, type) pulls b toward the center of the AoE (requires SRPG_AoE.js)
 * a.pushRightAoE(b, distance, type) moves b clockwise around the center of the AoE
 * a.pushLeftAoE(b, distance, type) moves b counter-clockwise around the center of the AoE
 * a.approach(b, type) moves a to the open space nearest to b (best for linear-only effects)
 *
 * Type can be set to "normal", "jump", or "instant" and defaults to "normal" if not specified
 * The functions return the remaining distance if movement is blocked by walls or other events
 *
 * Direct positioning script calls:
 * a.swap(b) switches the positions of a and b
 * a.teleport(type) moves a to the cursor position, provided the cell is empty (best used with <cellTarget>)
 * a.teleportAoE(type) moves a to the center of the AoE, provided the cell is empty (requires SRPG_AoE.js)
 
 * Type can be "jump" or "instant" and defaults to "instant" if not specified
 * The functions return false if the swap or teleport can't complete (immobile target, invalid destination)
 *
 *
 * Example damage formulas:
 * a.push(b, 1); a.atk - b.def
 * This will push the target 1 space and deal damage
 *
 * a.forward(5) + a.atk - b.def
 * This will move the user up to 5 spaces forward. If they hit an obstacle (proably the target) before moving all
 * five spaces, they deal an additional 1 damage per remaining space.
 * 
 * 
 * Unit Event Activation
 * Default Behavior:
 * Unit events are typically executed when the acting unit steps on the event.
 * New Feature (Ver.1.23Q):
 * Unit events can now trigger for events moved using specific movement scripts. 
 * If a target event is moved onto a unit event (e.g., traps), the unit event will also execute.
 * This feature enables scenarios such as pushing an opponent into a trap to trigger its effects.
 * How to Set Up:
 * Check the "For Trap" event example in the sample game's 'for Summon' map for a detailed implementation.
 * 
 * Movement Scripts That Trigger Unit Events:
 * a.push, a.pull, a.pushRight, a.pushLeft
 * a.pushAoE, a.pullAoE, a.pushRightAoE, a.pushLeftAoE, a.swap
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc SRPGで使用できる移動や位置替えスキルを使用可能にします（おひさまクラフトによる改変）
 * @author Dr. Q
 * @base SRPG_core_MZ
 * @orderAfter SRPG_core_MZ
 * 
 * @param cellTargetUnavailableRegion
 * @desc cellTargetで選択できないRegionを設定します。天井タイル部分などに利用できます。0 の場合は設定しません。
 * @type number
 * @min 0
 * @default 255
 *
 * @help
 * copyright 2020 SRPG Team. all rights reserved.
 * Released under the MIT license.
 * ============================================================================
 * ダメージ計算式やメモタグを使用することでプッシュ、プル、移動、テレポート効果を持つスキルを
 * 作成することができます。
 *
 * 加えて、<cellTarget>タグを持つスキルは通行可能で占有されていないマスをテレポート先に
 * することができます。イベントの工夫や他のプラグインとの組み合わせにより、召喚スキルや
 * 地形変更スキルも作成することができるでしょう。
 *
 * デフォルトでは、これらのスキルはsrpgThroughTag設定および地形タグに基づき使用者が移動可能な
 * マスを対象にすることができますが、<srpgTargetTag:X>をスキルやアイテムに設定することで使用者
 * 以外のキャラクターを召喚する、あるいは移動させるスキルのような、独自の設定にすることができます。
 * 
 * 注意：RPGツクールの仕様として、天井タイルは通行不可設定になっていても実際には通行できます。
 * そのため、そのままでは<cellTarget>スキルで選択できてしまいます。
 * これを防ぐためには、天井部分を射程が通らないタイル（地形タグ7）にするか、
 * cellTargetUnavailableRegionで指定したregionにしておく必要があります。
 * 
 * アクター、職業、敵キャラ、武器、防具およびステート用新メモタグ：
 * <srpgImmovable>を設定したユニットはプッシュ、プル、位置交換されなくなります。
 * 前進、後退、テレポートといった自発的な移動は妨げません（移動不可能性はユニットbには適用されますが、
 * ユニットaには無視されます）。
 *
 * スキル/アイテム用新メモタグ:
 * <cellTarget>を設定したスキルは、マップ上の占有されていないマスを対象にすることができます
 * （通常は不可）。
 *
 * <anyTarget>を設定したスキルは敵味方両方を対象にすることができます。
 * 位置変更スキルやAoEに便利ですが、AIユニットを混乱させるかもしれません。
 *
 *
 * 情報スクリプト呼び出し:
 * a.event()はSRPG戦闘中のバトラーに関連付けられたイベントを返します。
 * a.srpgImmovable()はバトラーが移動不可の場合にtrueを返します。
 *
 * 便利なスクリプト呼び出し:
 * a.focus()はaを中心にカーソル（およびカメラ）の焦点を合わせます。
 * a.face(b)はaをbの方に向かせます。
 * a.faceCursor()はaを現在のカーソル位置の方に向かせます。
 * a.faceAoE()はaを現在のAoEの中心に向かせます。
 *
 * 移動スクリプト呼び出し:
 * a.push(b, distance, type)はbをaから離すようにプッシュします。
 * a.pull(b, distance, type)はbをaに向かって引き寄せるようにプルします。
 * a.pushRight(b, distance, type)はaの右を通って（時計回り）bを動かします。
 * a.pushLeft(b, distance, type)はaの左を通って（反時計回り）bを動かします。
 * a.forward(distance, type)はaを向いている方向に向かって動かします。
 * a.back(distance, type)はaを向いている方向とは反対に動かします。
 * a.pushAoE(b, distance, type)はbをAoEの中心から離れるようにプッシュします（SRPG_AoE.jsが必要）。
 * a.pullAoE(b, distance, type)はbをAoEの中心に向かって引き寄せるようにプルします（SRPG_AoE.jsが必要）。
 * a.pushRightAoE(b, distance, type)はbをAoEの中心の時計回りに動かします。
 * a.pushLeftAoE(b, distance, type)はbをAoEの中心の反時計回りに動かします。
 * a.approach(b, type)aをbに最も近い開けた空間に動かします（直線状効果に最適）。
 *
 * typeには「normal」、「jump」あるいは「instant」が設定でき、指定しなかった場合は「normal」がデフォルトです。
 * 壁や他のイベントによって移動が妨げられた場合、これらの関数は残りの距離を返します。
 *
 * 直接位置設定スクリプト呼び出し:
 * a.swap(b)aとbの位置を入れ替えます。
 * a.teleport(type)そのマスが空いていれば、aをカーソル位置に移動させます（<cellTarget>と合わせて使うのに最適）。
 * a.teleportAoE(type)そのマスが空いていれば、aをAoEの中心に移動させます（SRPG_AoE.jsが必要）。
 
 * typeには「jump」あるいは「instant」が設定でき、指定しなかった場合は「instant」がデフォルトです。
 * 位置交換やテレポートが失敗した（対象が移動不可、無効な移動先）場合、これらの関数はfalseを返します。
 *
 *
 * ダメージ計算式例:
 * a.push(b, 1); a.atk - b.def
 * これは対象を1マス動かしてダメージを与えます。
 *
 * a.forward(5) + a.atk - b.def
 * これは使用者を5マス前進させます。5マスすべて移動する前に障害物（恐らく対象）にぶつかった場合、
 * 残りマスごとに1ダメージを与えます。
 * 
 * 
 * ユニットイベントの起動
 * 通常、ユニットイベントは行動中のユニットがその上に乗った時に実行されます。
 * Ver.1.23Qから追加された機能では、対象を移動させるスクリプトを利用した場合、
 * 対象のイベントが移動した先にイベントユニットがある場合にもイベントユニットが実行されるようになりました。
 * これにより、相手を吹き飛ばしてイベントユニット（罠など）を踏ませる、といった演出が可能になります。
 * 具体的な作り方はサンプルゲームの召喚用マップにある『ユニットイベント（トラップ）』を参照してください。
 * 
 * 対象のイベントに対してユニットイベントが実行されるコマンド
 * a.push, a.pull, a.pushRight, a.pushLeft, 
 * a.pushAoE, a.pullAoE, a.pushRightAoE, a.pushLeftAoE, a.swap
 * 
 */

(function(){
	var coreParameters = PluginManager.parameters('SRPG_core_MZ');
	var _srpgPredictionWindowMode = Number(coreParameters['srpgPredictionWindowMode'] || 1);

	var parameters = PluginManager.parameters('SRPG_PositionEffects_MZ');
	var _srpgCellTargetUnavailableRegion = Number(parameters['cellTargetUnavailableRegion'] || 255);

//====================================================================
// Stop position effects from happening during prediction
//====================================================================

	// initialize the prediction flag
	var _Game_Temp_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function() {
		_Game_Temp_initialize.call(this);
		this._isPrediction = false;
	}

	// set the prediction flag
	Game_Temp.prototype.setPrediction = function(value) {
		this._isPrediction = !!value;
	};

	// check prediction flag
	Game_Temp.prototype.isPrediction = function() {
		return !!this._isPrediction;
	};

	// set the prediction flag before going into prediction
	var _srpgPredictionDamage = Game_Action.prototype.srpgPredictionDamage;
	Game_Action.prototype.srpgPredictionDamage = function(target) {
		$gameTemp.setPrediction(true);
		var damage = _srpgPredictionDamage.call(this, target);
		$gameTemp.setPrediction(false);
		return damage;
	};

//====================================================================
// Utility effects for getting information
//====================================================================

	// get the event for a general battler
	Game_BattlerBase.prototype.event = function() {
		var currentBattler = this;
		var eventId = 0;
		$gameSystem._EventToUnit.forEach(function (battleArray, index) {
			if (battleArray && battleArray[1] === currentBattler) eventId = index;
		});
		return $gameMap.event(eventId);
	};

	// get the event for an actor specifically
	Game_Actor.prototype.event = function() {
		var currentActor = this.actorId();
		var eventId = 0;
		$gameSystem._EventToUnit.forEach(function (battleArray, index) {
			if (battleArray && battleArray[1] === currentActor) eventId = index;
		});
		return $gameMap.event(eventId);
	};

	// (utility) check if a position is open
	Game_Map.prototype.positionIsOpen = function(x, y) {
		return this.events().every(function(event) {
			if (event.isErased() || !event.pos(x, y) || !event.isType()) return true;
			if (event.isType() === 'actor') return false;
			if (event.isType() === 'enemy') return false;
			if (event.isType() === 'object' && event.characterName() !== '') return false;
			if (event.isType() === 'playerEvent') return false;
			return true;
		});
	};

	// (utility function) checks if a position is within the current skill's range
	// SRPG_AoEの定義に統合
	/*
	Game_System.prototype.positionInRange = function(x, y) {
		var area = $gameTemp.moveList();
		for (var i = 0; i < area.length; i++) {
			if (area[i][0] == x && area[i][1] == y) return true;
		}
		return false;
	};
	*/

	// (utility) find the direction to a fixed point, discounting obstacles
	Game_Character.prototype.dirTo = function(x, y) {
		var dir = 5;
		var dx = this.posX() - x;
		var dy = this.posY() - y;

		// account for looping maps
		if ($gameMap.isLoopHorizontal()) {
			if (dx > $gameMap.width() / 2) dx -= $gameMap.width();
			if (dx < -$gameMap.width() / 2) dx += $gameMap.width();
		}
		if ($gameMap.isLoopVertical()) {
			if (dy > $gameMap.height() / 2) dy -= $gameMap.height();
			if (dy < -$gameMap.height() / 2) dy += $gameMap.height();
		}

		if (Math.abs(dx) > Math.abs(dy)) {
			dir = dx > 0 ? 4 : 6;
		} else if (dy !== 0) {
			dir = dy > 0 ? 8 : 2;
		}
		return dir;
	};

//====================================================================
// select empty cells
//====================================================================

	// check if a position is within range and unoccupied
	// modified by OhisamaCraft
	Game_System.prototype.positionIsValidTarget = function(x, y) {
		const activeEvent = $gameTemp.activeEvent();
		if (!activeEvent) return false;
		const user = this.EventToUnit(activeEvent.eventId())[1];
		if (!user) return false;
		const action = user.currentAction();
		if (!action) return false;
		if (!action.item().meta.cellTarget) return false;
		const region = $gameMap.regionId(x, y);
		if (_srpgCellTargetUnavailableRegion > 0 &&
			region === _srpgCellTargetUnavailableRegion) return false;
		let tag = Number(action.item().meta.srpgTargetTag);
		if (!(tag && tag > 0)) tag = user.srpgThroughTag();
		if (!activeEvent.chackCellTargetMoveValid(x, y, tag)) return false;
		return ($gameSystem.positionInRange(x, y) && $gameMap.positionIsOpen(x, y));
	}

	Game_CharacterBase.prototype.chackCellTargetMoveValid = function(x, y, tag) {
		let flag = false;
		if ($gameMap.isCellTargetLandOk(x, y)) flag = true;
		for (let d = 2; d < 10; d += 2) {
			if (this.srpgMoveCanPass(x, y, d, tag)) flag = true;
		}
		return flag;
	}

	Game_Map.prototype.isCellTargetLandOk = function(x, y) {
		return this.checkPassage(x, y, 0x0f);
	};

	// allow selection of empty spaces
	const _selection_triggerAction = Game_Player.prototype.triggerAction;
	Game_Player.prototype.triggerAction = function() {
		if ($gameSystem.isSRPGMode() &&(Input.isTriggered('ok') || TouchInput.isTriggered())) {
			if ($gameSystem.isSubBattlePhase() === 'actor_target') {
				var x = $gamePlayer.posX();
				var y = $gamePlayer.posY();
				if ($gameSystem.positionIsValidTarget(x, y)) {
					$gameTemp.selectCell();
					return;
				}
			}
		}
		_selection_triggerAction.call(this);
	}

	// when selecting an empty cell, it technically targets the user for technical reasons
	Game_Temp.prototype.selectCell = function() {
		var event = $gameTemp.activeEvent();
		var target = $gamePlayer;
		var battlerArray = $gameSystem.EventToUnit(event.eventId());
		var item = battlerArray[1].currentAction().item();

		SoundManager.playOk();
		$gameSystem.clearSrpgActorCommandStatusWindowNeedRefresh();
		if (_srpgPredictionWindowMode != 3) $gameSystem.setSrpgStatusWindowNeedRefresh(battlerArray);
		$gameSystem.setSrpgBattleWindowNeedRefresh(battlerArray, battlerArray);
		$gameTemp.setSrpgDistance($gameSystem.unitDistance(event, target));
		$gameTemp.setTargetEvent(event);
		$gameSystem.setSubBattlePhase('battle_window');
	};

//====================================================================
// SRPG-map-aware movement functions
//====================================================================

	const _SRPG_PositionEffects_Game_Character_initMembers = Game_Character.prototype.initMembers;
	Game_Character.prototype.initMembers = function() {
	    _SRPG_PositionEffects_Game_Character_initMembers.call(this);
	    this._ForcedMovement = false;
	};

	Game_Character.prototype.isForcedMovement = function() {
	    return this._ForcedMovement;
	};

	Game_Character.prototype.setForcedMovement = function(flag) {
	    this._ForcedMovement = flag;
	};

	// try to move a character, stopping if it hits an obstacle, and returns the remaining distance
	Game_Character.prototype.srpgTryMove = function(dir, distance, type) {
		if (dir < 1 || dir == 5 || dir > 9) return 0;
		type = type || 'normal';

		// set the starting position
		var x = this.posX();
		var y = this.posY();
		var tag = $gameSystem.EventToUnit(this.eventId())[1].srpgThroughTag();

		// check the clear path
		for (var i = 0; i < distance; i++) {
			if (!this.srpgMoveCanPass(x, y, dir, tag)) break;
			var newX = $gameMap.roundXWithDirection(x, dir);
			var newY = $gameMap.roundYWithDirection(y, dir);
			if (!$gameMap.positionIsOpen(newX, newY)) break;
			x = newX;
			y = newY;
		}

		// move to the new position
		if (!$gameTemp.isPrediction()) {
			this._x = x;
			this._y = y;
			if (type.toLowerCase() == 'instant') {
				this._realX = x;
				this._realY = y;
			} else if (type.toLowerCase() == 'jump') {
				var dx = this._x - this._realX;
				var dy = this._y - this._realY;
				var distance = Math.round(Math.sqrt(dx * dx + dy * dy));
				this._jumpPeak = 10 + distance - this._moveSpeed;
				this._jumpCount = this._jumpPeak * 2;
			}
			this.resetStopCount();
		}
		return distance - i;
	};

	// move to the nearest positiong to another character, and returns the resulting distance
	Game_Character.prototype.srpgApproach = function(x, y, type) {
		type = type || 'normal';
		// get the starting properties
		var tag = $gameSystem.EventToUnit(this.eventId())[1].srpgThroughTag();
		var dir = 10-this.dirTo(x, y);
		var distance = Math.max(Math.abs(this.posX()-x), Math.abs(this.posY()-y));

		// check the clear path
		for (var i = 0; i < distance; i++) {
			var pass = this.srpgMoveCanPass(x, y, dir, tag);
			x = $gameMap.roundXWithDirection(x, dir);
			y = $gameMap.roundYWithDirection(y, dir);
			if (pass && $gameMap.positionIsOpen(x, y)) break;
		}

		// move to the new position
		if (!$gameTemp.isPrediction()) {
			this._x = x;
			this._y = y;
			if (type.toLowerCase() == 'instant') {
				this._realX = x;
				this._realY = y;
			} else if (type.toLowerCase() == 'jump') {
				var dx = this._x - this._realX;
				var dy = this._y - this._realY;
				var distance = Math.round(Math.sqrt(dx * dx + dy * dy));
				this._jumpPeak = 10 + distance - this._moveSpeed;
				this._jumpCount = this._jumpPeak * 2;
			}
			this.resetStopCount();
		}
		return i;
	};

	// move the character directly to the target position
	Game_Character.prototype.srpgTeleport = function(x, y, type) {
		type = type || 'normal';
		if (!$gameMap.positionIsOpen(x, y)) return false;

		// move to the new position
		if (!$gameTemp.isPrediction()) {
			this._x = x;
			this._y = y;
			if (type.toLowerCase() == 'jump') {
				var dx = this._x - this._realX;
				var dy = this._y - this._realY;
				var distance = Math.round(Math.sqrt(dx * dx + dy * dy));
				this._jumpPeak = 10 + distance - this._moveSpeed;
				this._jumpCount = this._jumpPeak * 2;
			} else {
				this._realX = x;
				this._realY = y;
			}
		}
		return true;
	};

//====================================================================
// Movement resistance
//====================================================================

	// check if a battler is immune to movement from states
	Game_BattlerBase.prototype.srpgImmovable = function() {
		var immovable = false;
		this.states().forEach(function(state) {
			if (state.meta.srpgImmovable) {
				immovable = true;
			}
		});
		return immovable;
	};

	// check if an actor is immune to movement from class or equipment
	Game_Actor.prototype.srpgImmovable = function() {
		if (this.actor().meta.srpgImmovable) return true;
		if (this.currentClass().meta.srpgImmovable) return true;

		var immovable = false;
		this.equips().forEach(function(item) {
			if (item && item.meta.srpgImmovable) {
				immovable = true;
			}
		});

		return immovable || Game_BattlerBase.prototype.srpgImmovable.call(this);
	};

	// check if an enemy is immune to movement innately or from weapon
	Game_Enemy.prototype.srpgImmovable = function() {
		if (this.enemy().meta.srpgImmovable) return true;

		if (!this.hasNoWeapons()) {
			var weapon = $dataWeapons[this.enemy().meta.srpgWeapon];
			if (weapon && weapon.meta.srpgImmovable) return true;
		}

		return Game_BattlerBase.prototype.srpgImmovable.call(this);
	};

//====================================================================
// Common movement effects
//====================================================================

	// center the camera
	Game_BattlerBase.prototype.focus = function() {
		var event = this.event();
		if (!event || $gameTemp.isPrediction()) return;
		$gameTemp.setAutoMoveDestinationValid(true);
		$gameTemp.setAutoMoveDestination(event.posX(), event.posY());
	};
	// face a specified unit
	Game_BattlerBase.prototype.face = function(target) {
		var userEvent = this.event();
		var targetEvent = target.event();
		if (!userEvent || !targetEvent || userEvent === targetEvent) return 5;
		var dir = userEvent.dirTo(targetEvent.posX(), targetEvent.posY());
		if (!$gameTemp.isPrediction()) userEvent.setDirection(dir);
		return dir;
	};
	// face the cursor
	Game_BattlerBase.prototype.faceCursor = function() {
		var userEvent = this.event();
		if (!userEvent || userEvent.pos($gamePlayer.posX(), $gamePlayer.posY())) return 5;
		var dir = userEvent.dirTo($gamePlayer.posX(), $gamePlayer.posY());
		if (!$gameTemp.isPrediction()) userEvent.setDirection(dir);
		return dir;
	};
	// face the center of the AoE
	Game_BattlerBase.prototype.faceAoE = function() {
		var userEvent = this.event();
		if (!userEvent || userEvent.pos($gameTemp.areaX(), $gameTemp.areaY())) return 5;
		var dir = userEvent.dirTo($gameTemp.areaX(), $gameTemp.areaY());
		if (!$gameTemp.isPrediction()) userEvent.setDirection(dir);
		return dir;
	};

	// move forward
	Game_BattlerBase.prototype.forward = function(distance, type) {
		var userEvent = this.event();
		if (!userEvent) return 0;
		return userEvent.srpgTryMove(userEvent.direction(), distance, type);
	};
	// move backward
	Game_BattlerBase.prototype.back = function(distance, type) {
		var userEvent = this.event();
		if (!userEvent) return 0;
		return userEvent.srpgTryMove(10-userEvent.direction(), distance, type);
	};
	// push target away
	Game_BattlerBase.prototype.push = function(target, distance, type) {
		if (target.srpgImmovable()) return 0;
		var userEvent = this.event();
		var targetEvent = target.event();
		if (!userEvent || !targetEvent) return 0;
		if (userEvent === targetEvent) return this.back(distance, type);
		targetEvent.setForcedMovement(true);
		return targetEvent.srpgTryMove(10-targetEvent.dirTo(userEvent.posX(), userEvent.posY()), distance, type);
	};
	// pull target in
	Game_BattlerBase.prototype.pull = function(target, distance, type) {
		if (target.srpgImmovable()) return 0;
		var userEvent = this.event();
		var targetEvent = target.event();
		if (!userEvent || !targetEvent) return 0;
		if (userEvent === targetEvent) return this.forward(distance, type);
		targetEvent.setForcedMovement(true);
		return targetEvent.srpgTryMove(targetEvent.dirTo(userEvent.posX(), userEvent.posY()), distance, type);
	};
	// move target clockwise
	Game_BattlerBase.prototype.pushRight = function(target, distance, type) {
		if (target.srpgImmovable()) return 0;
		var userEvent = this.event();
		var targetEvent = target.event();
		if (!userEvent || !targetEvent || userEvent === targetEvent) return 0;

		var dir = targetEvent.dirTo(userEvent.posX(), userEvent.posY());
		var clockwise = [0, 3, 6, 9, 2, 5, 8, 1, 4, 7];
		targetEvent.setForcedMovement(true);
		return targetEvent.srpgTryMove(clockwise[dir], distance, type);
	};
	// move target counter-clockwise
	Game_BattlerBase.prototype.pushLeft = function(target, distance, type) {
		if (target.srpgImmovable()) return 0;
		var userEvent = this.event();
		var targetEvent = target.event();
		if (!userEvent || !targetEvent || userEvent === targetEvent) return 0;

		var dir = targetEvent.dirTo(userEvent.posX(), userEvent.posY());
		var counterClockwise = [0, 7, 4, 1, 8, 5, 2, 9, 6, 3];
		targetEvent.setForcedMovement(true);
		return targetEvent.srpgTryMove(counterClockwise[dir], distance, type);
	};

	// teleport next to the target
	Game_BattlerBase.prototype.approach = function(target, type) {
		var userEvent = this.event();
		var targetEvent = target.event();
		if (!userEvent || !targetEvent) return;
		userEvent.srpgApproach(targetEvent.posX(), targetEvent.posY(), type);
	};

	// swap positions
	Game_BattlerBase.prototype.swap = function(target) {
		if (target.srpgImmovable()) return false;
		var userEvent = this.event();
		var targetEvent = target.event();
		if (!userEvent || !targetEvent) return false;
		if (!$gameTemp.isPrediction()) {
			userEvent.swap(targetEvent);
			targetEvent.setForcedMovement(true);
		}
		return true;
	};
	// teleport to an empty cell
	Game_BattlerBase.prototype.teleport = function(type) {
		var userEvent = this.event();
		if (!userEvent) return false;
		return userEvent.srpgTeleport($gamePlayer.posX(), $gamePlayer.posY(), type);
	};

	// push target away (from an AoE)
	Game_BattlerBase.prototype.pushAoE = function(target, distance, type) {
		if (target.srpgImmovable()) return 0;
		var targetEvent = target.event();
		if (!targetEvent) return 0;
		if (!$gameTemp.areaX || !$gameTemp.areaY) return 0;
		targetEvent.setForcedMovement(true);
		return targetEvent.srpgTryMove(10-targetEvent.dirTo($gameTemp.areaX(), $gameTemp.areaY()), distance, type);
	};
	// pull target in (to an AoE)
	Game_BattlerBase.prototype.pullAoE = function(target, distance, type) {
		if (target.srpgImmovable()) return 0;
		var targetEvent = target.event();
		if (!targetEvent) return 0;
		if (!$gameTemp.areaX || !$gameTemp.areaY ||
		targetEvent.pos($gameTemp.areaX(), $gameTemp.areaY())) return 0;
		targetEvent.setForcedMovement(true);
		return targetEvent.srpgTryMove(targetEvent.dirTo($gameTemp.areaX(), $gameTemp.areaY()), distance, type);
	};
	// move target clockwise (around an AoE)
	Game_BattlerBase.prototype.pushRightAoE = function(target, distance, type) {
		if (target.srpgImmovable()) return 0;
		var targetEvent = target.event();
		if (!targetEvent) return 0;
		if (!$gameTemp.areaX || !$gameTemp.areaY ||
		targetEvent.pos($gameTemp.areaX(), $gameTemp.areaY())) return 0;

		var dir = targetEvent.dirTo($gameTemp.areaX(), $gameTemp.areaY());
		var clockwise = [0, 3, 6, 9, 2, 5, 8, 1, 4, 7];
		targetEvent.setForcedMovement(true);
		return targetEvent.srpgTryMove(clockwise[dir], distance, type);
	};
	// move target counter-clockwise (around an AoE)
	Game_BattlerBase.prototype.pushLeftAoE = function(target, distance, type) {
		if (target.srpgImmovable()) return 0;
		var targetEvent = target.event();
		if (!targetEvent) return 0;
		if (!$gameTemp.areaX || !$gameTemp.areaY ||
		targetEvent.pos($gameTemp.areaX(), $gameTemp.areaY())) return 0;

		var dir = targetEvent.dirTo($gameTemp.areaX(), $gameTemp.areaY());
		var counterClockwise = [0, 7, 4, 1, 8, 5, 2, 9, 6, 3];
		targetEvent.setForcedMovement(true);
		return targetEvent.srpgTryMove(counterClockwise[dir], distance, type);
	};
	// teleport to an empty cell (at the center of an AoE)
	Game_BattlerBase.prototype.teleportAoE = function(type) {
		var userEvent = this.event();
		if (!userEvent) return false;
		if (!$gameTemp.areaX || !$gameTemp.areaY) return false;
		return userEvent.srpgTeleport($gameTemp.areaX(), $gameTemp.areaY(), type);
	};

//====================================================================
// forAny range
//====================================================================

	var _isForOpponent = Game_Action.prototype.isForOpponent;
	Game_Action.prototype.isForOpponent = function() {
		if (this.item() && this.item().meta.anyTarget) return true;
		return _isForOpponent.call(this);
	};

	var _isForFriend = Game_Action.prototype.isForFriend;
	Game_Action.prototype.isForFriend = function() {
		if (this.item() && this.item().meta.anyTarget) return true;
		return _isForFriend.call(this);
	};

	var _makeTargets = Game_Action.prototype.makeTargets;
	Game_Action.prototype.makeTargets = function() {
		var targets = _makeTargets.call(this);
		// make sure it finds friendlies if it couldn't find an enemy
		if ($gameSystem.isSRPGMode() && this.isForFriend() && targets[0] == null) {
			return this.repeatTargets(this.targetsForFriends());
		}
		return targets;
	};

})();