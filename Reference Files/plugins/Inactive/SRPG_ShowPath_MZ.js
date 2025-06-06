//-----------------------------------------------------------------------------
// SRPG_ShowPath_MZ.js
// Copyright (c) 2020 SRPG Team. All rights reserved.
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc SRPG move path indicator, edited by OhisamaCraft.
 * @author Dr. Q
 * @base SRPG_core_MZ
 * @orderAfter SRPG_core_MZ
 *
 * @param Path Blend Mode
 * @desc Blend mode for the move path
 * @type select
 * @option Normal
 * @value 0
 * @option Add
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @default 0
 *
 * @param Path Opacity
 * @desc Opacity for the move path
 * @type number
 * @min 0
 * @max 255
 * @default 255
 *
 * @param Path Layer
 * @desc Whether the path appears above or below events
 * @type select
 * @option Below All Events
 * @value 0
 * @option Below Player
 * @value 2
 * @option Above Player
 * @value 4
 * @option Above All Events
 * @value 6
 * @default 2
 *
 * @param Max Path Length
 * @desc Maximum length for the move path
 * Unless your move ranges are >99, you can leave it alone
 * @type number
 * @default 99
 *
 *
 * @help
 * copyright 2020 SRPG Team. all rights reserved.
 * Released under the MIT license.
 * ============================================================================
 * Draw an arrow to indicate the movement path in SRPG battles.
 * Images used for the paths go in the img/system/ folder.
 * /!/ caution /!/
 * Since the RPG maker MZ specification does not support 
 * encryption and unused file deletion tools, 
 * srpgPath image file is specified in SRPG core MZ.js.
 *
 * Look at srpgPath_Arrows.png for a clear example of how each piece
 * is used to make the path.
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc SRPG戦闘でアクターの移動経路を表示します。おひさまクラフトによる改変あり。
 * @author Dr. Q
 * @base SRPG_core_MZ
 * @orderAfter SRPG_core_MZ
 *
 * @param Path Blend Mode
 * @desc 移動経路の画像のブレンドモード
 * @type select
 * @option 通常
 * @value 0
 * @option 加算
 * @value 1
 * @option 乗算
 * @value 2
 * @option スクリーン
 * @value 3
 * @default 0
 *
 * @param Path Opacity
 * @desc 移動経路の画像の透明度
 * @type number
 * @min 0
 * @max 255
 * @default 255
 *
 * @param Path Layer
 * @desc 移動経路の画像をイベントに対してどの位置に表示するか
 * @type select
 * @option 全てのイベントの下
 * @value 0
 * @option プレイヤーの下
 * @value 2
 * @option プレイヤーの上
 * @value 4
 * @option 全てのイベントの上
 * @value 6
 * @default 2
 *
 * @param Max Path Length
 * @desc 移動経路の画像の最大表示距離
 * 移動範囲が 99 を超えない限り、変更しなくても大丈夫です。
 * @type number
 * @default 99
 *
 *
 * @help
 * copyright 2020 SRPG Team. all rights reserved.
 * Released under the MIT license.
 * ============================================================================
 * SRPG戦闘で、移動経路を示す矢印を描きます。
 * srpgPathの画像はimg/system/フォルダにあります。
 * /!/ 注意 /!/
 * RPGツクールMZの仕様により暗号化および未使用ファイル削除ツールに対応できないため
 * srpgPathの画像ファイルはSRPG core MZ.jsで指定しています。
 *
 * 自分で画像を作成する場合、パーツの配置はsrpgPath.pngを参考にして下さい。
 * 
 */

//====================================================================
// ●Function Declaration
//====================================================================
function Sprite_SrpgMovePath() {
    this.initialize(...arguments);
}

Sprite_SrpgMovePath.prototype = Object.create(Sprite.prototype);
Sprite_SrpgMovePath.prototype.constructor = Sprite_SrpgMovePath;

//====================================================================
// ●Plugin
//====================================================================
(function(){
	var parameters = PluginManager.parameters('SRPG_ShowPath_MZ');
	var coreParameters = PluginManager.parameters('SRPG_core_MZ');

	var _fileName = coreParameters['Path Image'] || "srpgPath";
	var _blendMode = Number(parameters['Path Blend Mode']) || 0;
	var _opacity = Number(parameters['Path Opacity']) || 0;
	var _layer = Number(parameters['Path Layer']) || 0;
	var _maxLength = Number(parameters['Max Path Length']) || 99;

//====================================================================
// show the move path while choosing a destination
//====================================================================

	// highlight the route to the chosen destination
	Game_Temp.prototype.showRoute = function(destX, destY) {
		this._activeRoute = [];
		if (destX == undefined || destY == undefined) return;
		if (destX < 0 || destX >= $gameMap.width() || destY < 0 || destY >= $gameMap.height()) return;
		var moveTable = $gameTemp.MoveTable(destX, destY);
		var list = $gameTemp.moveList();
		if (!moveTable || !list || !list[0]) return;
		if (!$gameSystem.areTheyNoUnits(destX, destY, 'actor')) return;
		if (!$gameSystem.areTheyNoUnits(destX, destY, 'enemy')) return;
		var directions = moveTable[1];
		var x = list[0][0];
		var y = list[0][1];

		for (var i = 1; i < directions.length; i++) {
			this._activeRoute.push([x, y, directions[i], directions[i-1]]);
			x = $gameMap.roundXWithDirection(x, directions[i]);
			y = $gameMap.roundYWithDirection(y, directions[i]);
		}
		if (directions.length) this._activeRoute.push([x, y, 0, directions[i-1]]);
	};

	// clear out the highlighted route
	Game_Temp.prototype.clearRoute = function() {
		this._activeRoute = null;
	};

	// update route when you move
	var _startMapEvent = Game_Player.prototype.startMapEvent;
	Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
		_startMapEvent.call(this, x, y, triggers, normal);
		if ($gameSystem.isSRPGMode() && $gameSystem.isSubBattlePhase() === 'actor_move') {
			if (triggers.contains(1)) $gameTemp.showRoute(x, y);
		}
		else {
			$gameTemp.clearRoute();
		}
	}

	// clear the route/AoE once you start moving/targeting
	var _triggerAction = Game_Player.prototype.triggerAction;
	Game_Player.prototype.triggerAction = function() {
		_triggerAction.call(this);
		if ($gameSystem.isSRPGMode() && $gameSystem.isSubBattlePhase() === 'actor_command_window') {
			$gameTemp.clearRoute();
		}
	}

	// clear the route/AoE when you cancel movement/targeting
	const _srpg_showPath_srpgCancelActorMove = Scene_Map.prototype.srpgCancelActorMove;
	Scene_Map.prototype.srpgCancelActorMove = function(){
		_srpg_showPath_srpgCancelActorMove.call(this);
		$gameTemp.clearRoute();
    }

	// restore the route when you cancel the actor command
	var _selectPreviousActorCommand = Scene_Map.prototype.selectPreviousActorCommand;
	Scene_Map.prototype.selectPreviousActorCommand = function() {
		var x = $gameTemp.activeEvent().posX();
		var y = $gameTemp.activeEvent().posY();
		$gameTemp.showRoute(x, y);
		_selectPreviousActorCommand.call(this);
	};

//====================================================================
// Sprite_SrpgMovePath
//====================================================================
	Sprite_SrpgMovePath.prototype.initialize = function() {
		Sprite.prototype.initialize.call(this);
		this.anchor.x = 0.5;
		this.anchor.y = 0.5;
		this._frameCount = 0;
		this._posX = -1;
		this._posY = -1;
		this.z = _layer;
		this._dir = 0;
		this._lastDir = 0;
		this.visible = false;
	};

	Sprite_SrpgMovePath.prototype.isPathActive = function() {
		return this._posX >= 0 && this._posY >= 0;
	};

	Sprite_SrpgMovePath.prototype.setPath = function(x, y, d, ld) {
		this._posX = x;
		this._posY = y;
		this._dir = d;
		this._lastDir = ld;
		this.blendMode = _blendMode;
		this.opacity = _opacity;
	};

	Sprite_SrpgMovePath.prototype.clearPath = function() {
		this._posX = -1;
		this._posY = -1;
	};

	Sprite_SrpgMovePath.prototype.update = function() {
		Sprite.prototype.update.call(this);
		if (this.isPathActive()){
			this.updatePosition();
			this.visible = true;
		} else {
			this.visible = false;
		}
	};

	Sprite_SrpgMovePath.prototype.updatePosition = function() {
		var tileWidth = $gameMap.tileWidth();
		var tileHeight = $gameMap.tileHeight();
		this.setDirection(this._dir, this._lastDir);
		this.x = ($gameMap.adjustX(this._posX) + 0.5) * tileWidth;
		this.y = ($gameMap.adjustY(this._posY) + 0.5) * tileHeight;
	};

	Sprite_SrpgMovePath.prototype.setDirection = function(d2, d1) {
		//this.bitmap = Sprite_SrpgMovePath._bitmap;
		this.bitmap = ImageManager.loadSystem(_fileName);
		var w = this.bitmap.width / 5;
		var h = this.bitmap.height / 4;

		var col = -1;
		var row = -1;
		if (!d1) { // start pieces
			col = 0;
			row = d2/2-1;
		}
		if (!d2) { // end pieces
			col = 1
			row = d1/2-1;
		}
		if (d1 == d2) { // straight pieces
			col = 2;
			row = d1/2-1;
		}
		if (row >= 0 && col >= 0) {
			this.setFrame(col*w, row*h, w, h);
			return;
		}

		// corners
		col = 3;
		if (d1 == 4 || d1 == 6) { // standardize the corners
			var d_ = d1;
			d1 = 10-d2;
			d2 = 10-d_;
			col = 4;
		}
		if (d1 == 2 && d2 == 4) row = 0; // down -> left
		if (d1 == 2 && d2 == 6) row = 1; // down -> right
		if (d1 == 8 && d2 == 4) row = 2; // up   -> left
		if (d1 == 8 && d2 == 6) row = 3; // up   -> right
		this.setFrame(col*w, row*h, w, h);
	};

//====================================================================
// Spriteset_Map
//====================================================================

	var _Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;
	Spriteset_Map.prototype.createTilemap = function() {
		_Spriteset_Map_createTilemap.call(this);
		this._srpgPath = [];
		for (var i = 0; i < _maxLength; i++) {
			this._srpgPath[i] = new Sprite_SrpgMovePath();
			this._tilemap.addChild(this._srpgPath[i]);
		}
	};

	var _Spriteset_Map_update = Spriteset_Map.prototype.update;
	Spriteset_Map.prototype.update = function() {
		_Spriteset_Map_update.call(this);
		this.updateSrpgMovePath();
	};

	Spriteset_Map.prototype.updateSrpgMovePath = function() {
		var route = $gameTemp._activeRoute;
		for (var i = 0; i < _maxLength; i++) {
			if (route && i < route.length) {
				this._srpgPath[i].setPath(route[i][0], route[i][1], route[i][2], route[i][3]);
			} else {
				this._srpgPath[i].clearPath();
			}
		}
	};

})();