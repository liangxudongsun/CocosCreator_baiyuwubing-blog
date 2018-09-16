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
                generateEUI.styles = {"1":{"textColor":"0xffffff","textAlign":"center","size":"22"},"brick_hp":{"textColor":"0x000000","textAlign":"center","size":"40","verticalAlign":"middle","bold":"true"},"coin_btn":{"textColor":"0x000000"}};
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","BaseView":"resource/eui_skins/BaseViewSkin.exml","MainView":"resource/eui_skins/MainViewSkin.exml","GameView":"resource/eui_skins/GameViewSkin.exml","GameOverView":"resource/eui_skins/GameOverViewSkin.exml","BeginView":"resource/eui_skins/BeginViewSkin.exml","GameTopView":"resource/eui_skins/GameTopViewSkin.exml","UseCoinButton":"resource/eui_skins/UseCoinButtonSkin.exml"};generateEUI.paths['resource/eui_skins/BaseViewSkin.exml'] = window.BaseViewSkin = (function (_super) {
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/CommonButtonSkin.exml'] = window.skins.CommonButtonSkin = (function (_super) {
	__extends(CommonButtonSkin, _super);
	function CommonButtonSkin() {
		_super.call(this);
		this.skinParts = ["iconDisplay","labelDisplay"];
		
		this.height = 80;
		this.width = 200;
		this.elementsContent = [this._Image1_i(),this.iconDisplay_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","left",0),
					new eui.SetProperty("_Image1","right",0),
					new eui.SetProperty("_Image1","top",0)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","percentWidth",95),
					new eui.SetProperty("_Image1","percentHeight",95),
					new eui.SetProperty("labelDisplay","scaleX",0.95),
					new eui.SetProperty("labelDisplay","scaleY",0.95)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","left",0),
					new eui.SetProperty("_Image1","right",0),
					new eui.SetProperty("_Image1","top",0)
				])
		];
	}
	var _proto = CommonButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(6,6,38,38);
		t.source = "gameTexture_json.b_normal";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		t.x = 10;
		t.y = 10;
		return t;
	};
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
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 50;
		t.stroke = 2;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return CommonButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/BeginViewSkin.exml'] = window.BeginViewSkin = (function (_super) {
	__extends(BeginViewSkin, _super);
	function BeginViewSkin() {
		_super.call(this);
		this.skinParts = ["btn_share","btn_start"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this._Group1_i()];
	}
	var _proto = BeginViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,8,8);
		t.source = "gameTexture_json.bg_view_back";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image2_i(),this._Label1_i(),this.btn_share_i(),this.btn_start_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 800;
		t.scale9Grid = new egret.Rectangle(23,24,3,3);
		t.source = "gameTexture_json.b_view_kuang";
		t.width = 600;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 105;
		t.text = "welcome!";
		t.y = 95;
		return t;
	};
	_proto.btn_share_i = function () {
		var t = new eui.Button();
		this.btn_share = t;
		t.horizontalCenter = 0;
		t.icon = "gameTexture_json.b_share";
		t.label = "";
		t.skinName = "skins.ButtonSkin";
		t.verticalCenter = 0;
		return t;
	};
	_proto.btn_start_i = function () {
		var t = new eui.Button();
		this.btn_start = t;
		t.horizontalCenter = 0;
		t.label = "start";
		t.skinName = "skins.CommonButtonSkin";
		t.y = 569;
		return t;
	};
	return BeginViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GameOverViewSkin.exml'] = window.GameOverViewSkin = (function (_super) {
	__extends(GameOverViewSkin, _super);
	function GameOverViewSkin() {
		_super.call(this);
		this.skinParts = ["btn_reset","btn_share","coinbtn_relive"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = GameOverViewSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image1_i(),this._Label1_i(),this.btn_reset_i(),this.btn_share_i(),this.coinbtn_relive_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 800;
		t.scale9Grid = new egret.Rectangle(23,24,3,3);
		t.source = "gameTexture_json.b_view_kuang";
		t.width = 600;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 100;
		t.text = "Game Over";
		t.y = 89;
		return t;
	};
	_proto.btn_reset_i = function () {
		var t = new eui.Button();
		this.btn_reset = t;
		t.horizontalCenter = 0;
		t.icon = "gameTexture_json.b_reset";
		t.label = "";
		t.skinName = "skins.ButtonSkin";
		t.verticalCenter = 251;
		return t;
	};
	_proto.btn_share_i = function () {
		var t = new eui.Button();
		this.btn_share = t;
		t.horizontalCenter = 0;
		t.icon = "gameTexture_json.b_share";
		t.label = "";
		t.skinName = "skins.ButtonSkin";
		t.verticalCenter = 80;
		return t;
	};
	_proto.coinbtn_relive_i = function () {
		var t = new UseCoinButton();
		this.coinbtn_relive = t;
		t.horizontalCenter = 0;
		t.label = "复活";
		t.verticalCenter = -88;
		return t;
	};
	return GameOverViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GameTopViewSkin.exml'] = window.GameTopViewSkin = (function (_super) {
	__extends(GameTopViewSkin, _super);
	function GameTopViewSkin() {
		_super.call(this);
		this.skinParts = ["lb_coin_num","lb_best_score"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = GameTopViewSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.top = 0;
		t.touchEnabled = false;
		t.percentWidth = 100;
		t.x = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.lb_coin_num_i(),this.lb_best_score_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 100;
		t.horizontalCenter = 0;
		t.source = "gameTexture_json.bg_bottom_top";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "gameTexture_json.coin";
		t.x = 20;
		t.y = 25;
		return t;
	};
	_proto.lb_coin_num_i = function () {
		var t = new eui.Label();
		this.lb_coin_num = t;
		t.bold = true;
		t.size = 40;
		t.text = "0";
		t.verticalCenter = 0;
		t.x = 73;
		return t;
	};
	_proto.lb_best_score_i = function () {
		var t = new eui.Label();
		this.lb_best_score = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 40;
		t.text = "0";
		t.verticalCenter = 0;
		return t;
	};
	return GameTopViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GameViewSkin.exml'] = window.GameViewSkin = (function (_super) {
	__extends(GameViewSkin, _super);
	function GameViewSkin() {
		_super.call(this);
		this.skinParts = ["gp_bg","gp_touch","gp_map","img_canno","lb_ball_count","img_game_mask_top","img_game_mask_bot","lb_level","lb_score","lb_version","img_add_speed","gp_test","btn_reset"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.gp_bg_i(),this.gp_touch_i(),this.gp_map_i(),this.img_canno_i(),this.lb_ball_count_i(),this.img_game_mask_top_i(),this.img_game_mask_bot_i(),this.lb_level_i(),this.lb_score_i(),this.lb_version_i(),this.img_add_speed_i(),this.gp_test_i(),this.btn_reset_i()];
	}
	var _proto = GameViewSkin.prototype;

	_proto.gp_bg_i = function () {
		var t = new eui.Group();
		this.gp_bg = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		t.elementsContent = [this._Image1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,8,8);
		t.source = "gameTexture_json.bg_view_back";
		t.percentWidth = 100;
		return t;
	};
	_proto.gp_touch_i = function () {
		var t = new eui.Group();
		this.gp_touch = t;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.gp_map_i = function () {
		var t = new eui.Group();
		this.gp_map = t;
		t.percentHeight = 100;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.img_canno_i = function () {
		var t = new eui.Image();
		this.img_canno = t;
		t.anchorOffsetX = 65;
		t.anchorOffsetY = 60;
		t.source = "cannoTexture_json.cannon1";
		t.x = 310;
		t.y = 348;
		return t;
	};
	_proto.lb_ball_count_i = function () {
		var t = new eui.Label();
		this.lb_ball_count = t;
		t.anchorOffsetX = 80;
		t.anchorOffsetY = 30;
		t.bold = true;
		t.size = 30;
		t.text = "0";
		t.textAlign = "center";
		t.verticalAlign = "bottom";
		t.width = 160;
		t.x = 254;
		t.y = 119;
		return t;
	};
	_proto.img_game_mask_top_i = function () {
		var t = new eui.Image();
		this.img_game_mask_top = t;
		t.scale9Grid = new egret.Rectangle(3,3,24,24);
		t.source = "gameTexture_json.bg_bottom_top";
		t.touchEnabled = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.img_game_mask_bot_i = function () {
		var t = new eui.Image();
		this.img_game_mask_bot = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(3,3,24,24);
		t.source = "gameTexture_json.bg_bottom_top";
		t.touchEnabled = false;
		t.percentWidth = 100;
		t.y = 1327;
		return t;
	};
	_proto.lb_level_i = function () {
		var t = new eui.Label();
		this.lb_level = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "0";
		t.touchEnabled = false;
		t.visible = false;
		t.y = 100;
		return t;
	};
	_proto.lb_score_i = function () {
		var t = new eui.Label();
		this.lb_score = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "0";
		t.touchEnabled = false;
		t.y = 100;
		return t;
	};
	_proto.lb_version_i = function () {
		var t = new eui.Label();
		this.lb_version = t;
		t.bottom = 0;
		t.right = 0;
		t.size = 20;
		t.text = "0";
		t.textAlign = "center";
		t.verticalAlign = "top";
		return t;
	};
	_proto.img_add_speed_i = function () {
		var t = new eui.Image();
		this.img_add_speed = t;
		t.alpha = 0;
		t.horizontalCenter = 0;
		t.source = "gameTexture_json.img_add_speed";
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
		t.icon = "gameTexture_json.b_reset";
		t.label = "";
		t.left = 0;
		t.top = 0;
		t.visible = false;
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
		this.elementsContent = [this._Image1_i(),this._Group1_i(),this.lb_version_i()];
	}
	var _proto = LoadingUISkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "preloading_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 1000;
		t.elementsContent = [this._Image2_i(),this.img_progress_i()];
		return t;
	};
	_proto._Image2_i = function () {
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
		this.skinParts = ["layer_base","layer_top","layer_ad","layer_effect","lb_tips","gp_tips"];
		
		this.height = 1336;
		this.width = 750;
		this.elementsContent = [this.layer_base_i(),this.layer_top_i(),this.layer_ad_i(),this.layer_effect_i(),this.gp_tips_i()];
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
	_proto.layer_top_i = function () {
		var t = new eui.Group();
		this.layer_top = t;
		t.percentHeight = 100;
		t.touchEnabled = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.layer_ad_i = function () {
		var t = new eui.Group();
		this.layer_ad = t;
		t.percentHeight = 100;
		t.touchEnabled = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.layer_effect_i = function () {
		var t = new eui.Group();
		this.layer_effect = t;
		t.percentHeight = 100;
		t.touchEnabled = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.gp_tips_i = function () {
		var t = new eui.Group();
		this.gp_tips = t;
		t.horizontalCenter = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.visible = false;
		t.elementsContent = [this._Image1_i(),this.lb_tips_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,8,8);
		t.source = "gameTexture_json.bg_view_back";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.lb_tips_i = function () {
		var t = new eui.Label();
		this.lb_tips = t;
		t.horizontalCenter = 0;
		t.text = "";
		t.verticalCenter = 0;
		return t;
	};
	return MainViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/UseCoinButtonSkin.exml'] = window.UseCoinButtonSkin = (function (_super) {
	__extends(UseCoinButtonSkin, _super);
	function UseCoinButtonSkin() {
		_super.call(this);
		this.skinParts = ["iconDisplay","labelDisplay","lb_cost","gp_main"];
		
		this.elementsContent = [this.gp_main_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("iconDisplay","visible",false),
					new eui.SetProperty("gp_main","scaleX",0.95),
					new eui.SetProperty("gp_main","scaleY",0.95)
				])
			,
			new eui.State ("disabled",
				[
				])
		];
	}
	var _proto = UseCoinButtonSkin.prototype;

	_proto.gp_main_i = function () {
		var t = new eui.Group();
		this.gp_main = t;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this.iconDisplay_i(),this.labelDisplay_i(),this._Group1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 80;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(11,10,27,29);
		t.source = "gameTexture_json.b_normal";
		t.verticalCenter = 0;
		t.width = 240;
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.style = "coin_btn";
		t.size = 40;
		t.text = "复活";
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.x = 15;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.verticalCenter = 0;
		t.x = 131;
		t.elementsContent = [this._Image2_i(),this.lb_cost_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "gameTexture_json.coin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lb_cost_i = function () {
		var t = new eui.Label();
		this.lb_cost = t;
		t.style = "coin_btn";
		t.left = 45;
		t.size = 30;
		t.text = "100";
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return UseCoinButtonSkin;
})(eui.Skin);