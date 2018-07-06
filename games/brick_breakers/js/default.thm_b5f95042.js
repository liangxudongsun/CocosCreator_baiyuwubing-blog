window.skins={};
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = {"1":{"textColor":"0xffffff","textAlign":"center","size":"22"}};
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","BaseView":"resource/eui_skins/BaseViewSkin.exml","MainView":"resource/eui_skins/MainViewSkin.exml","GameView":"resource/eui_skins/GameViewSkin.exml","GameOverView":"resource/eui_skins/GameOverViewSkin.exml"};generateEUI.paths['resource/eui_skins/BaseViewSkin.exml'] = window.BaseViewSkin = (function (_super) {
	__extends(BaseViewSkin, _super);
	function BaseViewSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 1334;
		this.width = 750;
	}
	var _proto = BaseViewSkin.prototype;

	return BaseViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["iconDisplay","labelDisplay"];
		
		this.elementsContent = [this.iconDisplay_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("iconDisplay","scaleX",0.95),
					new eui.SetProperty("iconDisplay","scaleY",0.95)
				])
			,
			new eui.State ("disabled",
				[
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GameOverViewSkin.exml'] = window.GameOverViewSkin = (function (_super) {
	__extends(GameOverViewSkin, _super);
	function GameOverViewSkin() {
		_super.call(this);
		this.skinParts = ["btn_reset"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Label1_i(),this.btn_reset_i()];
	}
	var _proto = GameOverViewSkin.prototype;

	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 100;
		t.text = "Game Over";
		t.y = 401;
		return t;
	};
	_proto.btn_reset_i = function () {
		var t = new eui.Button();
		this.btn_reset = t;
		t.horizontalCenter = 0;
		t.icon = "btn_retry_png";
		t.label = "";
		t.verticalCenter = 0;
		return t;
	};
	return GameOverViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GameViewSkin.exml'] = window.GameViewSkin = (function (_super) {
	__extends(GameViewSkin, _super);
	function GameViewSkin() {
		_super.call(this);
		this.skinParts = ["lb_level","lb_ball_count","lb_version","gp_touch","gp_map","img_add_speed","gp_test","btn_reset"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this.lb_level_i(),this.lb_ball_count_i(),this.lb_version_i(),this.gp_touch_i(),this.gp_map_i(),this.img_add_speed_i(),this.gp_test_i(),this.btn_reset_i()];
	}
	var _proto = GameViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.source = "global_img_bg_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.lb_level_i = function () {
		var t = new eui.Label();
		this.lb_level = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 100;
		t.text = "lv.0";
		t.top = 30;
		return t;
	};
	_proto.lb_ball_count_i = function () {
		var t = new eui.Label();
		this.lb_ball_count = t;
		t.anchorOffsetX = 80;
		t.size = 40;
		t.text = "0";
		t.textAlign = "center";
		t.verticalAlign = "top";
		t.width = 160;
		t.x = 356;
		t.y = 1151;
		return t;
	};
	_proto.lb_version_i = function () {
		var t = new eui.Label();
		this.lb_version = t;
		t.bottom = 0;
		t.right = 0;
		t.size = 40;
		t.text = "0";
		t.textAlign = "center";
		t.verticalAlign = "top";
		return t;
	};
	_proto.gp_touch_i = function () {
		var t = new eui.Group();
		this.gp_touch = t;
		t.elementsContent = [this._Image2_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.percentHeight = 120;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(16,14,58,60);
		t.source = "global_img_ninepatch_png";
		t.verticalCenter = 0;
		t.percentWidth = 120;
		return t;
	};
	_proto.gp_map_i = function () {
		var t = new eui.Group();
		this.gp_map = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.img_add_speed_i = function () {
		var t = new eui.Image();
		this.img_add_speed = t;
		t.alpha = 0;
		t.horizontalCenter = 0;
		t.source = "img_add_speed_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto.gp_test_i = function () {
		var t = new eui.Group();
		this.gp_test = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.visible = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.btn_reset_i = function () {
		var t = new eui.Button();
		this.btn_reset = t;
		t.bottom = 35;
		t.horizontalCenter = 0;
		t.icon = "btn_retry_png";
		t.label = "";
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		return t;
	};
	return GameViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/LoadingUISkin.exml'] = window.LoadingUISkin = (function (_super) {
	__extends(LoadingUISkin, _super);
	function LoadingUISkin() {
		_super.call(this);
		this.skinParts = ["img_progress","lb_version"];
		
		this.height = 1336;
		this.width = 750;
		this.elementsContent = [this._Group1_i(),this.lb_version_i()];
	}
	var _proto = LoadingUISkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 1000;
		t.elementsContent = [this._Image1_i(),this.img_progress_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "img_loading_di_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.img_progress_i = function () {
		var t = new eui.Image();
		this.img_progress = t;
		t.bottom = 0;
		t.source = "img_loading_top_png";
		t.x = 0;
		return t;
	};
	_proto.lb_version_i = function () {
		var t = new eui.Label();
		this.lb_version = t;
		t.bottom = 5;
		t.right = 5;
		t.text = "";
		return t;
	};
	return LoadingUISkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/MainViewSkin.exml'] = window.MainViewSkin = (function (_super) {
	__extends(MainViewSkin, _super);
	function MainViewSkin() {
		_super.call(this);
		this.skinParts = ["layer_base"];
		
		this.height = 1336;
		this.width = 750;
		this.elementsContent = [this.layer_base_i()];
	}
	var _proto = MainViewSkin.prototype;

	_proto.layer_base_i = function () {
		var t = new eui.Group();
		this.layer_base = t;
		t.percentHeight = 100;
		t.touchEnabled = false;
		t.percentWidth = 100;
		return t;
	};
	return MainViewSkin;
})(eui.Skin);