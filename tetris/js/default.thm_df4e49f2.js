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
                generateEUI.styles = {"1":{"textColor":"0x6e442a","textAlign":"center","size":"22"},"white":{"textColor":"0xffffff"},"red":{"textColor":"0xFF0B0B"},"green":{"textColor":"0x53ffe6"},"yellow":{"textColor":"0xffe045"}};
                generateEUI.skins = {"LoadingUI":"resource/eui_skins/LoadingUISkin.exml","BaseView":"resource/eui_skins/BaseViewSkin.exml","MainView":"resource/eui_skins/MainViewSkin.exml","GameView":"resource/eui_skins/GameViewSkin.exml","GameOverView":"resource/eui_skins/GameOverViewSkin.exml","GMItem":"resource/eui_skins/GMItemSkin.exml","PauseView":"resource/eui_skins/PauseViewSkin.exml","GuideView":"resource/eui_skins/GuideViewSkin.exml"};generateEUI.paths['resource/eui_skins/BaseViewSkin.exml'] = window.BaseViewSkin = (function (_super) {
	__extends(BaseViewSkin, _super);
	function BaseViewSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 1334;
		this.width = 750;
	}
	var _proto = BaseViewSkin.prototype;

	return BaseViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/BoxItemSkin.exml'] = window.BoxItemSkin = (function (_super) {
	__extends(BoxItemSkin, _super);
	function BoxItemSkin() {
		_super.call(this);
		this.skinParts = ["img_color","img_bian_top","img_bian_bot","img_bian_left","img_bian_right"];
		
		this.height = 39;
		this.width = 39;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = BoxItemSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 39;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 39;
		t.elementsContent = [this.img_color_i(),this.img_bian_top_i(),this.img_bian_bot_i(),this.img_bian_left_i(),this.img_bian_right_i()];
		return t;
	};
	_proto.img_color_i = function () {
		var t = new eui.Image();
		this.img_color = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto.img_bian_top_i = function () {
		var t = new eui.Image();
		this.img_bian_top = t;
		t.height = 4;
		t.name = "img_bian_top";
		t.source = "boxTexture_json.box_baix";
		t.width = 39;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.img_bian_bot_i = function () {
		var t = new eui.Image();
		this.img_bian_bot = t;
		t.height = 4;
		t.name = "img_bian_bot";
		t.source = "boxTexture_json.box_baix";
		t.width = 39;
		t.x = 0;
		t.y = 34;
		return t;
	};
	_proto.img_bian_left_i = function () {
		var t = new eui.Image();
		this.img_bian_left = t;
		t.height = 39;
		t.name = "img_bian_left";
		t.source = "boxTexture_json.box_baix";
		t.width = 4;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.img_bian_right_i = function () {
		var t = new eui.Image();
		this.img_bian_right = t;
		t.height = 39;
		t.name = "img_bian_right";
		t.source = "boxTexture_json.box_baix";
		t.width = 4;
		t.x = 34;
		t.y = 0;
		return t;
	};
	return BoxItemSkin;
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/GMItemSkin.exml'] = window.GMItemSkin = (function (_super) {
	__extends(GMItemSkin, _super);
	function GMItemSkin() {
		_super.call(this);
		this.skinParts = ["lb_name","lb_value","lb_reduce","lb_add"];
		
		this.height = 120;
		this.width = 520;
		this.elementsContent = [this.lb_name_i(),this.lb_value_i(),this.lb_reduce_i(),this.lb_add_i()];
	}
	var _proto = GMItemSkin.prototype;

	_proto.lb_name_i = function () {
		var t = new eui.Label();
		this.lb_name = t;
		t.left = 0;
		t.lineSpacing = 5;
		t.size = 22;
		t.text = "Label";
		t.verticalCenter = 0;
		t.width = 191;
		return t;
	};
	_proto.lb_value_i = function () {
		var t = new eui.Label();
		this.lb_value = t;
		t.horizontalCenter = 97;
		t.text = "0000";
		t.verticalCenter = 0;
		return t;
	};
	_proto.lb_reduce_i = function () {
		var t = new eui.Label();
		this.lb_reduce = t;
		t.left = 194;
		t.size = 60;
		t.text = "减少";
		t.verticalCenter = 0;
		return t;
	};
	_proto.lb_add_i = function () {
		var t = new eui.Label();
		this.lb_add = t;
		t.right = 0;
		t.size = 60;
		t.text = "增加";
		t.verticalCenter = 0;
		return t;
	};
	return GMItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GMViewSkin.exml'] = window.GMViewSkin = (function (_super) {
	__extends(GMViewSkin, _super);
	function GMViewSkin() {
		_super.call(this);
		this.skinParts = ["lb_reset","lb_close","gp_list"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.lb_reset_i(),this.lb_close_i(),this._Scroller1_i()];
	}
	var _proto = GMViewSkin.prototype;

	_proto.lb_reset_i = function () {
		var t = new eui.Label();
		this.lb_reset = t;
		t.horizontalCenter = 0;
		t.size = 131;
		t.text = "重置游戏";
		t.top = 34;
		return t;
	};
	_proto.lb_close_i = function () {
		var t = new eui.Label();
		this.lb_close = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.size = 131;
		t.text = "关闭";
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.height = 1003;
		t.horizontalCenter = 0;
		t.width = 520;
		t.y = 200;
		t.viewport = this.gp_list_i();
		return t;
	};
	_proto.gp_list_i = function () {
		var t = new eui.Group();
		this.gp_list = t;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 20;
		return t;
	};
	return GMViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GameOverViewSkin.exml'] = window.GameOverViewSkin = (function (_super) {
	__extends(GameOverViewSkin, _super);
	function GameOverViewSkin() {
		_super.call(this);
		this.skinParts = ["lb_sore","lb_best_today","lb_best_all_time","lb_best_today_num","lb_today_new","lb_best_all_time_num","lb_all_time_new","btn_submit"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Group3_i()];
	}
	var _proto = GameOverViewSkin.prototype;

	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.lb_sore_i(),this.lb_best_today_i(),this.lb_best_all_time_i(),this._Group1_i(),this._Group2_i(),this._Label1_i(),this._Image3_i(),this.btn_submit_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg_setting_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "gameTexture_json.img_line_blue";
		t.x = 74;
		t.y = 300;
		return t;
	};
	_proto.lb_sore_i = function () {
		var t = new eui.Label();
		this.lb_sore = t;
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "0";
		t.y = 152;
		return t;
	};
	_proto.lb_best_today_i = function () {
		var t = new eui.Label();
		this.lb_best_today = t;
		t.style = "white";
		t.size = 30;
		t.text = "Best today";
		t.x = 152;
		t.y = 335;
		return t;
	};
	_proto.lb_best_all_time_i = function () {
		var t = new eui.Label();
		this.lb_best_all_time = t;
		t.style = "white";
		t.size = 30;
		t.text = "Best all-time";
		t.x = 128;
		t.y = 384;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 338;
		t.y = 335;
		t.elementsContent = [this.lb_best_today_num_i(),this.lb_today_new_i()];
		return t;
	};
	_proto.lb_best_today_num_i = function () {
		var t = new eui.Label();
		this.lb_best_today_num = t;
		t.style = "white";
		t.left = 0;
		t.size = 30;
		t.text = "0";
		t.y = 0;
		return t;
	};
	_proto.lb_today_new_i = function () {
		var t = new eui.Label();
		this.lb_today_new = t;
		t.style = "red";
		t.right = -55;
		t.size = 20;
		t.text = "NEW";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 338;
		t.y = 383;
		t.elementsContent = [this.lb_best_all_time_num_i(),this.lb_all_time_new_i()];
		return t;
	};
	_proto.lb_best_all_time_num_i = function () {
		var t = new eui.Label();
		this.lb_best_all_time_num = t;
		t.style = "white";
		t.left = 0;
		t.size = 30;
		t.text = "0";
		t.y = 0;
		return t;
	};
	_proto.lb_all_time_new_i = function () {
		var t = new eui.Label();
		this.lb_all_time_new = t;
		t.style = "red";
		t.right = -55;
		t.size = 20;
		t.text = "NEW";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 30;
		t.text = "Final score";
		t.textColor = 0x728ffb;
		t.y = 232;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "gameTexture_json.text_Game_Over";
		t.x = 171;
		t.y = 63;
		return t;
	};
	_proto.btn_submit_i = function () {
		var t = new eui.Button();
		this.btn_submit = t;
		t.horizontalCenter = 0;
		t.icon = "gameTexture_json.btn_SUBMIT_SCORE";
		t.label = "";
		t.skinName = "skins.ButtonSkin";
		t.y = 470;
		return t;
	};
	return GameOverViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "gameTexture_json.bg_miss";
		t.percentWidth = 100;
		t.y = 0;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "gameTexture_json.bg_miss_top";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GameViewSkin.exml'] = window.GameViewSkin = (function (_super) {
	__extends(GameViewSkin, _super);
	function GameViewSkin() {
		_super.call(this);
		this.skinParts = ["tweenGroup","img_next_di","gp_next","gp_next0","gp_next1","gp_all_next","lb_score","lb_time","lb_verison","lb_lianxiao","lb_4qing","lb_total_count","pb_level","lb_level","pb_mess","lb_miss","lb_mess","gp_map","gp_map_bg","img_game_light","img_time_left","gp_tips_level_up","lb_combo","gp_tips_combo","gp_tips_teris","gp_touch","img_hold_di","gp_hold","gp_hold_all","img_hold_light","gp_hold_btn","img_daojishi","gp_daojishi","img_gm","btn_pause","btn_direclydown"];
		
		this.height = 1334;
		this.width = 750;
		this.tweenGroup_i();
		this.elementsContent = [this._Image1_i(),this._Group2_i(),this._Group3_i(),this.lb_verison_i(),this.lb_lianxiao_i(),this.lb_4qing_i(),this.lb_total_count_i(),this._Group4_i(),this._Group5_i(),this.gp_map_bg_i(),this.img_game_light_i(),this.img_time_left_i(),this.gp_tips_level_up_i(),this.gp_tips_combo_i(),this.gp_tips_teris_i(),this.gp_touch_i(),this.gp_hold_btn_i(),this.gp_daojishi_i(),this.img_gm_i(),this.btn_pause_i(),this.btn_direclydown_i()];
		
		eui.Binding.$bindProperties(this, ["img_game_light"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [true],[],this._Object1,"loop");
		eui.Binding.$bindProperties(this, [0],[],this._Object2,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object3,"alpha");
	}
	var _proto = GameViewSkin.prototype;

	_proto.tweenGroup_i = function () {
		var t = new egret.tween.TweenGroup();
		this.tweenGroup = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.props = this._Object1_i();
		t.paths = [this._Set1_i(),this._To1_i(),this._To2_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto._To2_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object3_i();
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		this._Object3 = t;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg_di_jpg";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.right = 5;
		t.y = 275;
		t.elementsContent = [this._Label1_i(),this.gp_all_next_i(),this._Image2_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 35;
		t.text = "NEXT";
		t.top = 0;
		return t;
	};
	_proto.gp_all_next_i = function () {
		var t = new eui.Group();
		this.gp_all_next = t;
		t.horizontalCenter = 0;
		t.y = 40;
		t.elementsContent = [this.img_next_di_i(),this._Group1_i()];
		return t;
	};
	_proto.img_next_di_i = function () {
		var t = new eui.Image();
		this.img_next_di = t;
		t.source = "boxTexture_json.box_di0";
		t.y = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 610;
		t.horizontalCenter = 0;
		t.scaleX = 0.6;
		t.scaleY = 0.6;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this.gp_next_i(),this.gp_next0_i(),this.gp_next1_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 95;
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto.gp_next_i = function () {
		var t = new eui.Group();
		this.gp_next = t;
		t.height = 100;
		t.width = 100;
		t.x = 19;
		t.y = 44;
		return t;
	};
	_proto.gp_next0_i = function () {
		var t = new eui.Group();
		this.gp_next0 = t;
		t.height = 100;
		t.width = 100;
		t.x = 29;
		t.y = 54;
		return t;
	};
	_proto.gp_next1_i = function () {
		var t = new eui.Group();
		this.gp_next1 = t;
		t.height = 100;
		t.width = 100;
		t.x = 39;
		t.y = 64;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "gameTexture_json.bg_NEXT";
		t.y = 36;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 112;
		t.horizontalCenter = 0;
		t.y = 49;
		t.elementsContent = [this._Image3_i(),this.lb_score_i(),this.lb_time_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "gameTexture_json.bg_time_socre";
		t.verticalCenter = 0;
		return t;
	};
	_proto.lb_score_i = function () {
		var t = new eui.Label();
		this.lb_score = t;
		t.horizontalCenter = 124.5;
		t.size = 35;
		t.text = "0";
		t.y = 62;
		return t;
	};
	_proto.lb_time_i = function () {
		var t = new eui.Label();
		this.lb_time = t;
		t.style = "white";
		t.horizontalCenter = -126.5;
		t.size = 35;
		t.text = "0";
		t.verticalCenter = 23.5;
		return t;
	};
	_proto.lb_verison_i = function () {
		var t = new eui.Label();
		this.lb_verison = t;
		t.bottom = 0;
		t.right = 0;
		t.text = "0";
		return t;
	};
	_proto.lb_lianxiao_i = function () {
		var t = new eui.Label();
		this.lb_lianxiao = t;
		t.bottom = 32;
		t.right = 0;
		t.text = "0";
		return t;
	};
	_proto.lb_4qing_i = function () {
		var t = new eui.Label();
		this.lb_4qing = t;
		t.bottom = 68;
		t.right = 0;
		t.text = "4清buff!!";
		return t;
	};
	_proto.lb_total_count_i = function () {
		var t = new eui.Label();
		this.lb_total_count = t;
		t.bottom = 9;
		t.left = 0;
		t.text = "0";
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.height = 148;
		t.width = 120;
		t.x = 10;
		t.y = 590;
		t.elementsContent = [this.pb_level_i(),this._Label2_i(),this.lb_level_i()];
		return t;
	};
	_proto.pb_level_i = function () {
		var t = new eui.ProgressBar();
		this.pb_level = t;
		t.height = 70;
		t.horizontalCenter = 0;
		t.maximum = 8;
		t.skinName = "skins.ProgressBarSkin";
		t.slideDuration = 0;
		t.value = 8;
		t.width = 120;
		t.x = 0;
		t.y = 45;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 35;
		t.text = "LEVEL";
		t.y = 0;
		return t;
	};
	_proto.lb_level_i = function () {
		var t = new eui.Label();
		this.lb_level = t;
		t.horizontalCenter = 0;
		t.size = 70;
		t.stroke = 3;
		t.strokeColor = 0xdd8323;
		t.text = "0";
		t.y = 45;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.height = 117;
		t.width = 120;
		t.x = 10;
		t.y = 880;
		t.elementsContent = [this._Image4_i(),this._Label3_i(),this.pb_mess_i(),this.lb_miss_i(),this.lb_mess_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "gameTexture_json.bg_left";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 35;
		t.text = "LEFT";
		t.y = 0;
		return t;
	};
	_proto.pb_mess_i = function () {
		var t = new eui.ProgressBar();
		this.pb_mess = t;
		t.bottom = 0;
		t.direction = "btt";
		t.height = 120;
		t.horizontalCenter = 0;
		t.maximum = 8;
		t.skinName = "skins.ProgressBarSkin";
		t.slideDuration = 0;
		t.value = 8;
		t.visible = false;
		t.width = 120;
		return t;
	};
	_proto.lb_miss_i = function () {
		var t = new eui.Label();
		this.lb_miss = t;
		t.horizontalCenter = 0;
		t.size = 50;
		t.text = "0";
		t.visible = false;
		t.y = 51.33;
		return t;
	};
	_proto.lb_mess_i = function () {
		var t = new eui.Label();
		this.lb_mess = t;
		t.horizontalCenter = 0;
		t.size = 70;
		t.text = "0";
		t.y = 45;
		return t;
	};
	_proto.gp_map_bg_i = function () {
		var t = new eui.Group();
		this.gp_map_bg = t;
		t.height = 819;
		t.horizontalCenter = 0;
		t.scaleX = 1.2;
		t.scaleY = 1.2;
		t.width = 390;
		t.y = 246;
		t.elementsContent = [this._Image5_i(),this.gp_map_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(142,502,1,2);
		t.source = "bg_landi_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.gp_map_i = function () {
		var t = new eui.Group();
		this.gp_map = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.img_game_light_i = function () {
		var t = new eui.Image();
		this.img_game_light = t;
		t.height = 995;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(29,55,176,337);
		t.source = "bg_game_light_png";
		t.width = 515;
		t.y = 257;
		return t;
	};
	_proto.img_time_left_i = function () {
		var t = new eui.Image();
		this.img_time_left = t;
		t.horizontalCenter = -700;
		t.source = "gameTexture_json.text_time_tip_180";
		t.verticalCenter = 0;
		return t;
	};
	_proto.gp_tips_level_up_i = function () {
		var t = new eui.Group();
		this.gp_tips_level_up = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.visible = false;
		t.percentWidth = 100;
		t.x = 10;
		t.y = 10;
		t.elementsContent = [this._Image6_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		t.source = "gameTexture_json.text_level_up";
		t.verticalCenter = -200;
		t.x = 274;
		t.y = 527;
		return t;
	};
	_proto.gp_tips_combo_i = function () {
		var t = new eui.Group();
		this.gp_tips_combo = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.visible = false;
		t.percentWidth = 100;
		t.x = 20;
		t.y = 20;
		t.elementsContent = [this._Group6_i()];
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		t.verticalCenter = -200;
		t.elementsContent = [this._Image7_i(),this.lb_combo_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "gameTexture_json.text_COMBO";
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	_proto.lb_combo_i = function () {
		var t = new eui.Label();
		this.lb_combo = t;
		t.size = 80;
		t.text = "+1";
		t.x = 307;
		t.y = 0;
		return t;
	};
	_proto.gp_tips_teris_i = function () {
		var t = new eui.Group();
		this.gp_tips_teris = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.visible = false;
		t.percentWidth = 100;
		t.x = 30;
		t.y = 30;
		t.elementsContent = [this._Image8_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		t.source = "gameTexture_json.text_TETRIS";
		t.verticalCenter = -200;
		return t;
	};
	_proto.gp_touch_i = function () {
		var t = new eui.Group();
		this.gp_touch = t;
		t.percentHeight = 100;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.gp_hold_btn_i = function () {
		var t = new eui.Group();
		this.gp_hold_btn = t;
		t.x = 5;
		t.y = 275;
		t.elementsContent = [this._Image9_i(),this._Image10_i(),this._Label4_i(),this.gp_hold_all_i(),this.img_hold_light_i()];
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "gameTexture_json.bg_HOLD";
		t.y = 36;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.height = 122;
		t.scale9Grid = new egret.Rectangle(31,16,81,97);
		t.scaleY = -1;
		t.source = "boxTexture_json.box_di0";
		t.width = 120;
		t.x = 6;
		t.y = 163;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 35;
		t.text = "HOLD";
		t.top = 0;
		return t;
	};
	_proto.gp_hold_all_i = function () {
		var t = new eui.Group();
		this.gp_hold_all = t;
		t.x = 5;
		t.y = 40;
		t.elementsContent = [this.img_hold_di_i(),this.gp_hold_i()];
		return t;
	};
	_proto.img_hold_di_i = function () {
		var t = new eui.Image();
		this.img_hold_di = t;
		t.height = 122;
		t.scale9Grid = new egret.Rectangle(31,16,81,97);
		t.scaleY = -1;
		t.source = "boxTexture_json.box_di0";
		t.width = 120;
		t.y = 123;
		return t;
	};
	_proto.gp_hold_i = function () {
		var t = new eui.Group();
		this.gp_hold = t;
		t.height = 100;
		t.horizontalCenter = 0;
		t.scaleX = 0.6;
		t.scaleY = 0.6;
		t.verticalCenter = 0;
		t.width = 100;
		return t;
	};
	_proto.img_hold_light_i = function () {
		var t = new eui.Image();
		this.img_hold_light = t;
		t.alpha = 0;
		t.source = "gameTexture_json.bg_hold_light";
		t.touchEnabled = false;
		t.x = -3;
		t.y = 32;
		return t;
	};
	_proto.gp_daojishi_i = function () {
		var t = new eui.Group();
		this.gp_daojishi = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.visible = false;
		t.percentWidth = 100;
		t.elementsContent = [this.img_daojishi_i()];
		return t;
	};
	_proto.img_daojishi_i = function () {
		var t = new eui.Image();
		this.img_daojishi = t;
		t.horizontalCenter = 0;
		t.source = "gameTexture_json.text_daojishi_3";
		t.verticalCenter = 0;
		t.x = 274;
		t.y = 527;
		return t;
	};
	_proto.img_gm_i = function () {
		var t = new eui.Image();
		this.img_gm = t;
		t.height = 94;
		t.left = 0;
		t.source = "boxTexture_json.box_baix";
		t.top = 0;
		t.touchEnabled = true;
		t.width = 95;
		return t;
	};
	_proto.btn_pause_i = function () {
		var t = new eui.Button();
		this.btn_pause = t;
		t.icon = "gameTexture_json.img_pause";
		t.label = "";
		t.scaleX = 1.2;
		t.scaleY = 1.2;
		t.skinName = "skins.ButtonSkin";
		t.x = 649;
		t.y = 158;
		return t;
	};
	_proto.btn_direclydown_i = function () {
		var t = new eui.Button();
		this.btn_direclydown = t;
		t.bottom = 55;
		t.height = 125;
		t.horizontalCenter = -300;
		t.icon = "gameTexture_json.btn_directly_down";
		t.label = "";
		t.scaleX = 1.5;
		t.scaleY = 1.5;
		t.skinName = "skins.ButtonSkin";
		t.width = 125;
		return t;
	};
	return GameViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GuideViewSkin.exml'] = window.GuideViewSkin = (function (_super) {
	__extends(GuideViewSkin, _super);
	function GuideViewSkin() {
		_super.call(this);
		this.skinParts = ["tweenGroup","btn_start","img_finger_move","img_box_move","gp_rote_finger","img_box_rotate","img_finger_drop","gp_show_drop","btn_next","img_arrow_down","gp_box_tip","img_finger_up","img_arrow_down0","gp_box_tip0","gp_click_hold","img_finger_up0","img_arrow_down1","gp_box_tip1","gp_box_tip2","btn_play","gp_congratulation","viewStack_guideStep","btn_skip"];
		
		this.height = 1334;
		this.width = 750;
		this.tweenGroup_i();
		this.elementsContent = [this._Image1_i(),this.viewStack_guideStep_i(),this.btn_skip_i()];
		
		eui.Binding.$bindProperties(this, ["img_finger_move"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [true],[],this._Object1,"loop");
		eui.Binding.$bindProperties(this, [125],[],this._Object2,"x");
		eui.Binding.$bindProperties(this, [20],[],this._Object3,"x");
		eui.Binding.$bindProperties(this, [125],[],this._Object4,"x");
		eui.Binding.$bindProperties(this, [0],[],this._Object5,"alpha");
		eui.Binding.$bindProperties(this, ["img_finger_drop"],[0],this._TweenItem2,"target");
		eui.Binding.$bindProperties(this, [true],[],this._Object6,"loop");
		eui.Binding.$bindProperties(this, [115],[],this._Object7,"x");
		eui.Binding.$bindProperties(this, [0],[],this._Object8,"alpha");
		eui.Binding.$bindProperties(this, ["img_box_move"],[0],this._TweenItem3,"target");
		eui.Binding.$bindProperties(this, [true],[],this._Object9,"loop");
		eui.Binding.$bindProperties(this, [200],[],this._Object10,"x");
		eui.Binding.$bindProperties(this, [20],[],this._Object11,"x");
		eui.Binding.$bindProperties(this, [200],[],this._Object12,"x");
		eui.Binding.$bindProperties(this, [0],[],this._Object13,"alpha");
		eui.Binding.$bindProperties(this, ["img_box_rotate"],[0],this._TweenItem4,"target");
		eui.Binding.$bindProperties(this, [true],[],this._Object14,"loop");
		eui.Binding.$bindProperties(this, [90],[],this._Object15,"rotation");
		eui.Binding.$bindProperties(this, [180],[],this._Object16,"rotation");
		eui.Binding.$bindProperties(this, [270],[],this._Object17,"rotation");
		eui.Binding.$bindProperties(this, [360],[],this._Object18,"rotation");
		eui.Binding.$bindProperties(this, ["img_arrow_down"],[0],this._TweenItem5,"target");
		eui.Binding.$bindProperties(this, [true],[],this._Object19,"loop");
		eui.Binding.$bindProperties(this, [92],[],this._Object20,"y");
		eui.Binding.$bindProperties(this, ["img_arrow_down0"],[0],this._TweenItem6,"target");
		eui.Binding.$bindProperties(this, [true],[],this._Object21,"loop");
		eui.Binding.$bindProperties(this, [92],[],this._Object22,"y");
		eui.Binding.$bindProperties(this, ["img_arrow_down1"],[0],this._TweenItem7,"target");
		eui.Binding.$bindProperties(this, [true],[],this._Object23,"loop");
		eui.Binding.$bindProperties(this, [92],[],this._Object24,"y");
		eui.Binding.$bindProperties(this, ["img_finger_up"],[0],this._TweenItem8,"target");
		eui.Binding.$bindProperties(this, [true],[],this._Object25,"loop");
		eui.Binding.$bindProperties(this, [80],[],this._Object26,"x");
		eui.Binding.$bindProperties(this, [0],[],this._Object27,"alpha");
		eui.Binding.$bindProperties(this, ["img_finger_up0"],[0],this._TweenItem9,"target");
		eui.Binding.$bindProperties(this, [true],[],this._Object28,"loop");
		eui.Binding.$bindProperties(this, [80],[],this._Object29,"x");
		eui.Binding.$bindProperties(this, [0],[],this._Object30,"alpha");
		eui.Binding.$bindProperties(this, ["gp_box_tip"],[0],this._TweenItem10,"target");
		eui.Binding.$bindProperties(this, [true],[],this._Object31,"loop");
		eui.Binding.$bindProperties(this, [0],[],this._Object32,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object33,"alpha");
		eui.Binding.$bindProperties(this, ["gp_box_tip0"],[0],this._TweenItem11,"target");
		eui.Binding.$bindProperties(this, [true],[],this._Object34,"loop");
		eui.Binding.$bindProperties(this, [0],[],this._Object35,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object36,"alpha");
		eui.Binding.$bindProperties(this, ["gp_box_tip1"],[0],this._TweenItem12,"target");
		eui.Binding.$bindProperties(this, [true],[],this._Object37,"loop");
		eui.Binding.$bindProperties(this, [0],[],this._Object38,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object39,"alpha");
		eui.Binding.$bindProperties(this, ["gp_box_tip2"],[0],this._TweenItem13,"target");
		eui.Binding.$bindProperties(this, [true],[],this._Object40,"loop");
		eui.Binding.$bindProperties(this, [0],[],this._Object41,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object42,"alpha");
	}
	var _proto = GuideViewSkin.prototype;

	_proto.tweenGroup_i = function () {
		var t = new egret.tween.TweenGroup();
		this.tweenGroup = t;
		t.items = [this._TweenItem1_i(),this._TweenItem2_i(),this._TweenItem3_i(),this._TweenItem4_i(),this._TweenItem5_i(),this._TweenItem6_i(),this._TweenItem7_i(),this._TweenItem8_i(),this._TweenItem9_i(),this._TweenItem10_i(),this._TweenItem11_i(),this._TweenItem12_i(),this._TweenItem13_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.props = this._Object1_i();
		t.paths = [this._Set1_i(),this._To1_i(),this._To2_i(),this._To3_i(),this._To4_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto._To2_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object3_i();
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		this._Object3 = t;
		return t;
	};
	_proto._To3_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object4_i();
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		this._Object4 = t;
		return t;
	};
	_proto._To4_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.props = this._Object5_i();
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		this._Object5 = t;
		return t;
	};
	_proto._TweenItem2_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem2 = t;
		t.props = this._Object6_i();
		t.paths = [this._Set2_i(),this._To5_i(),this._To6_i()];
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		this._Object6 = t;
		return t;
	};
	_proto._Set2_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To5_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.ease = "circIn";
		t.props = this._Object7_i();
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		this._Object7 = t;
		return t;
	};
	_proto._To6_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.props = this._Object8_i();
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		this._Object8 = t;
		return t;
	};
	_proto._TweenItem3_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem3 = t;
		t.props = this._Object9_i();
		t.paths = [this._Set3_i(),this._To7_i(),this._To8_i(),this._To9_i(),this._To10_i()];
		return t;
	};
	_proto._Object9_i = function () {
		var t = {};
		this._Object9 = t;
		return t;
	};
	_proto._Set3_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To7_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object10_i();
		return t;
	};
	_proto._Object10_i = function () {
		var t = {};
		this._Object10 = t;
		return t;
	};
	_proto._To8_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object11_i();
		return t;
	};
	_proto._Object11_i = function () {
		var t = {};
		this._Object11 = t;
		return t;
	};
	_proto._To9_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object12_i();
		return t;
	};
	_proto._Object12_i = function () {
		var t = {};
		this._Object12 = t;
		return t;
	};
	_proto._To10_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.props = this._Object13_i();
		return t;
	};
	_proto._Object13_i = function () {
		var t = {};
		this._Object13 = t;
		return t;
	};
	_proto._TweenItem4_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem4 = t;
		t.props = this._Object14_i();
		t.paths = [this._Set4_i(),this._Wait1_i(),this._Set5_i(),this._Wait2_i(),this._Set6_i(),this._Wait3_i(),this._Set7_i(),this._Wait4_i(),this._Set8_i()];
		return t;
	};
	_proto._Object14_i = function () {
		var t = {};
		this._Object14 = t;
		return t;
	};
	_proto._Set4_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._Wait1_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 500;
		return t;
	};
	_proto._Set5_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object15_i();
		return t;
	};
	_proto._Object15_i = function () {
		var t = {};
		this._Object15 = t;
		return t;
	};
	_proto._Wait2_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 500;
		return t;
	};
	_proto._Set6_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object16_i();
		return t;
	};
	_proto._Object16_i = function () {
		var t = {};
		this._Object16 = t;
		return t;
	};
	_proto._Wait3_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 500;
		return t;
	};
	_proto._Set7_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object17_i();
		return t;
	};
	_proto._Object17_i = function () {
		var t = {};
		this._Object17 = t;
		return t;
	};
	_proto._Wait4_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 500;
		return t;
	};
	_proto._Set8_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object18_i();
		return t;
	};
	_proto._Object18_i = function () {
		var t = {};
		this._Object18 = t;
		return t;
	};
	_proto._TweenItem5_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem5 = t;
		t.props = this._Object19_i();
		t.paths = [this._Set9_i(),this._To11_i()];
		return t;
	};
	_proto._Object19_i = function () {
		var t = {};
		this._Object19 = t;
		return t;
	};
	_proto._Set9_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To11_i = function () {
		var t = new egret.tween.To();
		t.duration = 1400;
		t.props = this._Object20_i();
		return t;
	};
	_proto._Object20_i = function () {
		var t = {};
		this._Object20 = t;
		return t;
	};
	_proto._TweenItem6_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem6 = t;
		t.props = this._Object21_i();
		t.paths = [this._Set10_i(),this._To12_i()];
		return t;
	};
	_proto._Object21_i = function () {
		var t = {};
		this._Object21 = t;
		return t;
	};
	_proto._Set10_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To12_i = function () {
		var t = new egret.tween.To();
		t.duration = 1400;
		t.props = this._Object22_i();
		return t;
	};
	_proto._Object22_i = function () {
		var t = {};
		this._Object22 = t;
		return t;
	};
	_proto._TweenItem7_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem7 = t;
		t.props = this._Object23_i();
		t.paths = [this._Set11_i(),this._To13_i()];
		return t;
	};
	_proto._Object23_i = function () {
		var t = {};
		this._Object23 = t;
		return t;
	};
	_proto._Set11_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To13_i = function () {
		var t = new egret.tween.To();
		t.duration = 1400;
		t.props = this._Object24_i();
		return t;
	};
	_proto._Object24_i = function () {
		var t = {};
		this._Object24 = t;
		return t;
	};
	_proto._TweenItem8_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem8 = t;
		t.props = this._Object25_i();
		t.paths = [this._Set12_i(),this._To14_i(),this._To15_i()];
		return t;
	};
	_proto._Object25_i = function () {
		var t = {};
		this._Object25 = t;
		return t;
	};
	_proto._Set12_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To14_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.ease = "circIn";
		t.props = this._Object26_i();
		return t;
	};
	_proto._Object26_i = function () {
		var t = {};
		this._Object26 = t;
		return t;
	};
	_proto._To15_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.props = this._Object27_i();
		return t;
	};
	_proto._Object27_i = function () {
		var t = {};
		this._Object27 = t;
		return t;
	};
	_proto._TweenItem9_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem9 = t;
		t.props = this._Object28_i();
		t.paths = [this._Set13_i(),this._To16_i(),this._To17_i()];
		return t;
	};
	_proto._Object28_i = function () {
		var t = {};
		this._Object28 = t;
		t.ease = "circIn";
		return t;
	};
	_proto._Set13_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To16_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.props = this._Object29_i();
		return t;
	};
	_proto._Object29_i = function () {
		var t = {};
		this._Object29 = t;
		return t;
	};
	_proto._To17_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.props = this._Object30_i();
		return t;
	};
	_proto._Object30_i = function () {
		var t = {};
		this._Object30 = t;
		return t;
	};
	_proto._TweenItem10_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem10 = t;
		t.props = this._Object31_i();
		t.paths = [this._Set14_i(),this._To18_i(),this._To19_i()];
		return t;
	};
	_proto._Object31_i = function () {
		var t = {};
		this._Object31 = t;
		return t;
	};
	_proto._Set14_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To18_i = function () {
		var t = new egret.tween.To();
		t.duration = 700;
		t.props = this._Object32_i();
		return t;
	};
	_proto._Object32_i = function () {
		var t = {};
		this._Object32 = t;
		return t;
	};
	_proto._To19_i = function () {
		var t = new egret.tween.To();
		t.duration = 700;
		t.props = this._Object33_i();
		return t;
	};
	_proto._Object33_i = function () {
		var t = {};
		this._Object33 = t;
		return t;
	};
	_proto._TweenItem11_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem11 = t;
		t.props = this._Object34_i();
		t.paths = [this._Set15_i(),this._To20_i(),this._To21_i()];
		return t;
	};
	_proto._Object34_i = function () {
		var t = {};
		this._Object34 = t;
		return t;
	};
	_proto._Set15_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To20_i = function () {
		var t = new egret.tween.To();
		t.duration = 700;
		t.props = this._Object35_i();
		return t;
	};
	_proto._Object35_i = function () {
		var t = {};
		this._Object35 = t;
		return t;
	};
	_proto._To21_i = function () {
		var t = new egret.tween.To();
		t.duration = 700;
		t.props = this._Object36_i();
		return t;
	};
	_proto._Object36_i = function () {
		var t = {};
		this._Object36 = t;
		return t;
	};
	_proto._TweenItem12_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem12 = t;
		t.props = this._Object37_i();
		t.paths = [this._Set16_i(),this._To22_i(),this._To23_i()];
		return t;
	};
	_proto._Object37_i = function () {
		var t = {};
		this._Object37 = t;
		return t;
	};
	_proto._Set16_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To22_i = function () {
		var t = new egret.tween.To();
		t.duration = 700;
		t.props = this._Object38_i();
		return t;
	};
	_proto._Object38_i = function () {
		var t = {};
		this._Object38 = t;
		return t;
	};
	_proto._To23_i = function () {
		var t = new egret.tween.To();
		t.duration = 700;
		t.props = this._Object39_i();
		return t;
	};
	_proto._Object39_i = function () {
		var t = {};
		this._Object39 = t;
		return t;
	};
	_proto._TweenItem13_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem13 = t;
		t.props = this._Object40_i();
		t.paths = [this._Set17_i(),this._To24_i(),this._To25_i()];
		return t;
	};
	_proto._Object40_i = function () {
		var t = {};
		this._Object40 = t;
		return t;
	};
	_proto._Set17_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To24_i = function () {
		var t = new egret.tween.To();
		t.duration = 700;
		t.props = this._Object41_i();
		return t;
	};
	_proto._Object41_i = function () {
		var t = {};
		this._Object41 = t;
		return t;
	};
	_proto._To25_i = function () {
		var t = new egret.tween.To();
		t.duration = 700;
		t.props = this._Object42_i();
		return t;
	};
	_proto._Object42_i = function () {
		var t = {};
		this._Object42 = t;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "guideTexture_json.guide_tip_di";
		t.width = 510;
		t.y = 175;
		return t;
	};
	_proto.viewStack_guideStep_i = function () {
		var t = new eui.ViewStack();
		this.viewStack_guideStep = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.selectedIndex = 7;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		t.elementsContent = [this._Group2_i(),this._Group11_i(),this._Group14_i(),this._Group17_i(),this._Group20_i(),this._Group23_i(),this._Group26_i(),this._Group28_i(),this._Group30_i()];
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.name = "Group0";
		t.visible = false;
		t.percentWidth = 100;
		t.elementsContent = [this._Group1_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 600;
		t.elementsContent = [this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Label1_i(),this._Label2_i(),this.btn_start_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 480;
		t.source = "bg_setting_png";
		t.width = 600;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "guideTexture_json.guide_text_Tutorial";
		t.y = 48;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "guideTexture_json.guide_text_Welcome";
		t.visible = false;
		t.y = 134;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.lineSpacing = 10;
		t.size = 43;
		t.text = "Before having a match,\nlet's learn some controls.";
		t.textAlign = "center";
		t.verticalCenter = 20;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.lineSpacing = 10;
		t.size = 50;
		t.text = "Welcome!";
		t.textAlign = "center";
		t.verticalCenter = -80;
		return t;
	};
	_proto.btn_start_i = function () {
		var t = new eui.Button();
		this.btn_start = t;
		t.bottom = 34;
		t.horizontalCenter = 0;
		t.icon = "guideTexture_json.guide_btn_START";
		t.skinName = "skins.ButtonSkin";
		return t;
	};
	_proto._Group11_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.name = "Group1";
		t.verticalCenter = 0;
		t.visible = false;
		t.percentWidth = 100;
		t.elementsContent = [this._Group10_i()];
		return t;
	};
	_proto._Group10_i = function () {
		var t = new eui.Group();
		t.height = 1336;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 750;
		t.elementsContent = [this._Image5_i(),this._Image6_i(),this._Group5_i(),this._Group7_i(),this._Group9_i(),this.btn_next_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 1290;
		t.horizontalCenter = 0;
		t.source = "guideTexture_json.guide_bg_blue";
		t.verticalCenter = 0;
		t.width = 700;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "guideTexture_json.guide_text_basic_gesture";
		t.y = 50;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 125;
		t.elementsContent = [this._Group3_i(),this._Group4_i(),this._Label3_i()];
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 140;
		t.width = 186;
		t.x = 0;
		t.y = 20;
		t.elementsContent = [this._Image7_i(),this._Image8_i(),this._Image9_i(),this.img_finger_move_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.source = "guideTexture_json.guide_frame_white";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "guideTexture_json.guide_arrow";
		t.x = 41;
		t.y = 20;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.scaleX = -1;
		t.source = "guideTexture_json.guide_arrow";
		t.x = 145;
		t.y = 20;
		return t;
	};
	_proto.img_finger_move_i = function () {
		var t = new eui.Image();
		this.img_finger_move = t;
		t.source = "guideTexture_json.guide_finger";
		t.x = 20;
		t.y = 27;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.x = 244;
		t.y = 0;
		t.elementsContent = [this._Image10_i(),this.img_box_move_i()];
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 204;
		t.source = "guideTexture_json.guide_bg_gray";
		t.width = 294;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.img_box_move_i = function () {
		var t = new eui.Image();
		this.img_box_move = t;
		t.source = "guideTexture_json.guide_box";
		t.verticalCenter = 0;
		t.x = 20;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.size = 40;
		t.text = "Drag to move";
		t.x = 265;
		t.y = 220;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 430;
		t.elementsContent = [this.gp_rote_finger_i(),this._Group6_i(),this._Label4_i()];
		return t;
	};
	_proto.gp_rote_finger_i = function () {
		var t = new eui.Group();
		this.gp_rote_finger = t;
		t.height = 140;
		t.width = 170;
		t.x = 0;
		t.y = 20;
		t.elementsContent = [this._Image11_i()];
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.source = "guideTexture_json.guide_frame_white";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.x = 244;
		t.y = 0;
		t.elementsContent = [this._Image12_i(),this.img_box_rotate_i()];
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 204;
		t.source = "guideTexture_json.guide_bg_gray";
		t.width = 294;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.img_box_rotate_i = function () {
		var t = new eui.Image();
		this.img_box_rotate = t;
		t.anchorOffsetX = 41;
		t.anchorOffsetY = 62;
		t.horizontalCenter = 0;
		t.source = "guideTexture_json.guide_box";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.size = 40;
		t.text = "Tap to rotate";
		t.x = 281;
		t.y = 217;
		return t;
	};
	_proto._Group9_i = function () {
		var t = new eui.Group();
		t.height = 371;
		t.horizontalCenter = 0;
		t.width = 540;
		t.y = 751;
		t.elementsContent = [this._Group8_i(),this.gp_show_drop_i(),this._Label5_i()];
		return t;
	};
	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.height = 140;
		t.rotation = 90;
		t.width = 170;
		t.x = 161;
		t.y = 60;
		t.elementsContent = [this._Image13_i(),this._Image14_i(),this.img_finger_drop_i()];
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.source = "guideTexture_json.guide_frame_white";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto._Image14_i = function () {
		var t = new eui.Image();
		t.source = "guideTexture_json.guide_arrow";
		t.x = 19;
		t.y = 84;
		return t;
	};
	_proto.img_finger_drop_i = function () {
		var t = new eui.Image();
		this.img_finger_drop = t;
		t.scaleX = -1;
		t.scaleY = -1;
		t.source = "guideTexture_json.guide_finger";
		t.x = 52;
		t.y = 115;
		return t;
	};
	_proto.gp_show_drop_i = function () {
		var t = new eui.Group();
		this.gp_show_drop = t;
		t.height = 300;
		t.width = 300;
		t.x = 244;
		t.y = 0;
		t.elementsContent = [this._Image15_i()];
		return t;
	};
	_proto._Image15_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.source = "guideTexture_json.guide_bg_gray";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.size = 40;
		t.text = "Flip to drop";
		t.x = 281;
		t.y = 311;
		return t;
	};
	_proto.btn_next_i = function () {
		var t = new eui.Button();
		this.btn_next = t;
		t.bottom = 103;
		t.horizontalCenter = 0;
		t.icon = "guideTexture_json.guide_btn_NEXT";
		t.label = "";
		t.skinName = "skins.ButtonSkin";
		return t;
	};
	_proto._Group14_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.name = "Group2";
		t.touchChildren = false;
		t.touchEnabled = false;
		t.visible = false;
		t.percentWidth = 100;
		t.elementsContent = [this._Group13_i()];
		return t;
	};
	_proto._Group13_i = function () {
		var t = new eui.Group();
		t.height = 1336;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 750;
		t.elementsContent = [this._Label6_i(),this._Group12_i()];
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		t.style = "yellow";
		t.horizontalCenter = 0;
		t.lineSpacing = 5;
		t.size = 35;
		t.text = "Drag to move，tap to \nrotate and flick to drop.";
		t.textAlign = "center";
		t.y = 180;
		return t;
	};
	_proto._Group12_i = function () {
		var t = new eui.Group();
		t.height = 270;
		t.width = 321;
		t.x = 145;
		t.y = 725;
		t.elementsContent = [this._Label7_i(),this.img_arrow_down_i(),this.gp_box_tip_i()];
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.lineSpacing = 5;
		t.size = 35;
		t.text = "Make the block here";
		t.textAlign = "center";
		t.y = 0;
		return t;
	};
	_proto.img_arrow_down_i = function () {
		var t = new eui.Image();
		this.img_arrow_down = t;
		t.horizontalCenter = 0;
		t.source = "guideTexture_json.guide_arrow_small";
		t.y = 38;
		return t;
	};
	_proto.gp_box_tip_i = function () {
		var t = new eui.Group();
		this.gp_box_tip = t;
		t.horizontalCenter = 0;
		t.scaleX = 1.2;
		t.scaleY = 1.2;
		t.y = 176;
		t.elementsContent = [this._Image16_i(),this._Image17_i(),this._Image18_i(),this._Image19_i()];
		return t;
	};
	_proto._Image16_i = function () {
		var t = new eui.Image();
		t.source = "boxTexture_json.box0";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image17_i = function () {
		var t = new eui.Image();
		t.source = "boxTexture_json.box0";
		t.x = 76;
		t.y = 0;
		return t;
	};
	_proto._Image18_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "boxTexture_json.box0";
		t.y = 0;
		return t;
	};
	_proto._Image19_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "boxTexture_json.box0";
		t.y = 37;
		return t;
	};
	_proto._Group17_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.name = "Group3";
		t.touchChildren = false;
		t.touchEnabled = false;
		t.visible = false;
		t.percentWidth = 100;
		t.elementsContent = [this._Group16_i()];
		return t;
	};
	_proto._Group16_i = function () {
		var t = new eui.Group();
		t.height = 1336;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 750;
		t.elementsContent = [this._Label8_i(),this._Group15_i()];
		return t;
	};
	_proto._Label8_i = function () {
		var t = new eui.Label();
		t.style = "yellow";
		t.horizontalCenter = 0;
		t.lineSpacing = 5;
		t.size = 35;
		t.text = "FLICK UPWARD  to HOLD a \nblock to use it later.";
		t.textAlign = "center";
		t.y = 180;
		return t;
	};
	_proto._Group15_i = function () {
		var t = new eui.Group();
		t.height = 104;
		t.rotation = 270;
		t.width = 155;
		t.x = 450;
		t.y = 570;
		t.elementsContent = [this._Image20_i(),this.img_finger_up_i()];
		return t;
	};
	_proto._Image20_i = function () {
		var t = new eui.Image();
		t.source = "guideTexture_json.guide_arrow";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.img_finger_up_i = function () {
		var t = new eui.Image();
		this.img_finger_up = t;
		t.source = "guideTexture_json.guide_finger";
		t.x = 0;
		t.y = 15;
		return t;
	};
	_proto._Group20_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.name = "Group4";
		t.touchChildren = false;
		t.touchEnabled = false;
		t.visible = false;
		t.percentWidth = 100;
		t.elementsContent = [this._Group19_i()];
		return t;
	};
	_proto._Group19_i = function () {
		var t = new eui.Group();
		t.height = 1336;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 750;
		t.elementsContent = [this._Label9_i(),this._Group18_i()];
		return t;
	};
	_proto._Label9_i = function () {
		var t = new eui.Label();
		t.style = "yellow";
		t.horizontalCenter = 0;
		t.lineSpacing = 5;
		t.size = 35;
		t.text = "Drag to move，tap to \nrotate and flick to drop.";
		t.textAlign = "center";
		t.y = 180;
		return t;
	};
	_proto._Group18_i = function () {
		var t = new eui.Group();
		t.height = 273;
		t.width = 320;
		t.x = 310;
		t.y = 822;
		t.elementsContent = [this._Label10_i(),this.img_arrow_down0_i(),this.gp_box_tip0_i()];
		return t;
	};
	_proto._Label10_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.lineSpacing = 5;
		t.size = 35;
		t.text = "";
		t.textAlign = "center";
		t.y = 0;
		return t;
	};
	_proto.img_arrow_down0_i = function () {
		var t = new eui.Image();
		this.img_arrow_down0 = t;
		t.horizontalCenter = 0;
		t.source = "guideTexture_json.guide_arrow_small";
		t.y = 38;
		return t;
	};
	_proto.gp_box_tip0_i = function () {
		var t = new eui.Group();
		this.gp_box_tip0 = t;
		t.horizontalCenter = 0;
		t.scaleX = 1.2;
		t.scaleY = 1.2;
		t.y = 175;
		t.elementsContent = [this._Image21_i(),this._Image22_i(),this._Image23_i(),this._Image24_i()];
		return t;
	};
	_proto._Image21_i = function () {
		var t = new eui.Image();
		t.source = "boxTexture_json.box0";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image22_i = function () {
		var t = new eui.Image();
		t.source = "boxTexture_json.box0";
		t.x = 38;
		t.y = 0;
		return t;
	};
	_proto._Image23_i = function () {
		var t = new eui.Image();
		t.source = "boxTexture_json.box0";
		t.x = 0;
		t.y = 38;
		return t;
	};
	_proto._Image24_i = function () {
		var t = new eui.Image();
		t.source = "boxTexture_json.box0";
		t.x = 38;
		t.y = 38;
		return t;
	};
	_proto._Group23_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.name = "Group5";
		t.touchChildren = false;
		t.touchEnabled = false;
		t.visible = false;
		t.percentWidth = 100;
		t.elementsContent = [this._Group22_i()];
		return t;
	};
	_proto._Group22_i = function () {
		var t = new eui.Group();
		t.height = 1336;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 750;
		t.elementsContent = [this._Label11_i(),this.gp_click_hold_i(),this._Group21_i()];
		return t;
	};
	_proto._Label11_i = function () {
		var t = new eui.Label();
		t.style = "yellow";
		t.horizontalCenter = 0;
		t.lineSpacing = 5;
		t.size = 35;
		t.text = "Use the holded block.  FLICK \nUPWARD or tap HOLD to swap";
		t.textAlign = "center";
		t.y = 180;
		return t;
	};
	_proto.gp_click_hold_i = function () {
		var t = new eui.Group();
		this.gp_click_hold = t;
		t.height = 0;
		t.width = 0;
		t.x = 72;
		t.y = 450;
		return t;
	};
	_proto._Group21_i = function () {
		var t = new eui.Group();
		t.height = 104;
		t.rotation = 270;
		t.width = 155;
		t.x = 460;
		t.y = 580;
		t.elementsContent = [this._Image25_i(),this.img_finger_up0_i()];
		return t;
	};
	_proto._Image25_i = function () {
		var t = new eui.Image();
		t.source = "guideTexture_json.guide_arrow";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.img_finger_up0_i = function () {
		var t = new eui.Image();
		this.img_finger_up0 = t;
		t.source = "guideTexture_json.guide_finger";
		t.x = 0;
		t.y = 15;
		return t;
	};
	_proto._Group26_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.name = "Group6";
		t.touchChildren = false;
		t.touchEnabled = false;
		t.visible = false;
		t.percentWidth = 100;
		t.elementsContent = [this._Group25_i()];
		return t;
	};
	_proto._Group25_i = function () {
		var t = new eui.Group();
		t.height = 1336;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 750;
		t.elementsContent = [this._Label12_i(),this._Group24_i()];
		return t;
	};
	_proto._Label12_i = function () {
		var t = new eui.Label();
		t.style = "yellow";
		t.horizontalCenter = 0;
		t.lineSpacing = 5;
		t.size = 35;
		t.text = "Drag to move，tap to \nrotate and flick to drop.";
		t.textAlign = "center";
		t.y = 180;
		return t;
	};
	_proto._Group24_i = function () {
		var t = new eui.Group();
		t.height = 271;
		t.width = 321;
		t.x = 237;
		t.y = 912;
		t.elementsContent = [this._Label13_i(),this.img_arrow_down1_i(),this.gp_box_tip1_i()];
		return t;
	};
	_proto._Label13_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.lineSpacing = 5;
		t.size = 35;
		t.text = "";
		t.textAlign = "center";
		t.y = 0;
		return t;
	};
	_proto.img_arrow_down1_i = function () {
		var t = new eui.Image();
		this.img_arrow_down1 = t;
		t.horizontalCenter = 0;
		t.source = "guideTexture_json.guide_arrow_small";
		t.y = 38;
		return t;
	};
	_proto.gp_box_tip1_i = function () {
		var t = new eui.Group();
		this.gp_box_tip1 = t;
		t.horizontalCenter = 0;
		t.scaleX = 1.2;
		t.scaleY = 1.2;
		t.x = 307;
		t.y = 176;
		t.elementsContent = [this._Image26_i(),this._Image27_i(),this._Image28_i(),this._Image29_i()];
		return t;
	};
	_proto._Image26_i = function () {
		var t = new eui.Image();
		t.source = "boxTexture_json.box0";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image27_i = function () {
		var t = new eui.Image();
		t.source = "boxTexture_json.box0";
		t.x = 76;
		t.y = 0;
		return t;
	};
	_proto._Image28_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "boxTexture_json.box0";
		t.y = 0;
		return t;
	};
	_proto._Image29_i = function () {
		var t = new eui.Image();
		t.source = "boxTexture_json.box0";
		t.y = 37;
		return t;
	};
	_proto._Group28_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.name = "Group7";
		t.touchChildren = false;
		t.touchEnabled = false;
		t.percentWidth = 100;
		t.elementsContent = [this._Group27_i()];
		return t;
	};
	_proto._Group27_i = function () {
		var t = new eui.Group();
		t.height = 1336;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 750;
		t.elementsContent = [this._Label14_i(),this._Label15_i(),this._Image30_i(),this.gp_box_tip2_i()];
		return t;
	};
	_proto._Label14_i = function () {
		var t = new eui.Label();
		t.style = "yellow";
		t.horizontalCenter = 0;
		t.lineSpacing = 5;
		t.size = 35;
		t.text = "Clear all GREY BLCOKS to \nget bonus.";
		t.textAlign = "center";
		t.y = 180;
		return t;
	};
	_proto._Label15_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.lineSpacing = 5;
		t.size = 35;
		t.text = "Grey blocks need to be \ncleaned";
		t.textAlign = "center";
		t.y = 760;
		return t;
	};
	_proto._Image30_i = function () {
		var t = new eui.Image();
		t.rotation = 56.09;
		t.source = "guideTexture_json.guide_arrow_small";
		t.x = 187;
		t.y = 816;
		return t;
	};
	_proto.gp_box_tip2_i = function () {
		var t = new eui.Group();
		this.gp_box_tip2 = t;
		t.scaleX = 1.2;
		t.scaleY = 1.2;
		t.x = 235;
		t.y = 1092;
		t.elementsContent = [this._Image31_i(),this._Image32_i(),this._Image33_i(),this._Image34_i()];
		return t;
	};
	_proto._Image31_i = function () {
		var t = new eui.Image();
		t.source = "boxTexture_json.box0";
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	_proto._Image32_i = function () {
		var t = new eui.Image();
		t.source = "boxTexture_json.box0";
		t.x = 38;
		t.y = 0;
		return t;
	};
	_proto._Image33_i = function () {
		var t = new eui.Image();
		t.source = "boxTexture_json.box0";
		t.verticalCenter = 0;
		t.x = 38;
		return t;
	};
	_proto._Image34_i = function () {
		var t = new eui.Image();
		t.source = "boxTexture_json.box0";
		t.x = 0;
		t.y = 76;
		return t;
	};
	_proto._Group30_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.name = "Group8";
		t.visible = false;
		t.percentWidth = 100;
		t.elementsContent = [this._Group29_i()];
		return t;
	};
	_proto._Group29_i = function () {
		var t = new eui.Group();
		t.height = 1336;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 750;
		t.elementsContent = [this.gp_congratulation_i()];
		return t;
	};
	_proto.gp_congratulation_i = function () {
		var t = new eui.Group();
		this.gp_congratulation = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 600;
		t.elementsContent = [this._Image35_i(),this._Image36_i(),this._Label16_i(),this.btn_play_i()];
		return t;
	};
	_proto._Image35_i = function () {
		var t = new eui.Image();
		t.height = 400;
		t.source = "bg_setting_png";
		t.width = 600;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image36_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "guideTexture_json.guide_text_congratulations";
		t.y = 48;
		return t;
	};
	_proto._Label16_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.lineSpacing = 10;
		t.size = 43;
		t.text = "You are ready for your first \nmatch!";
		t.textAlign = "center";
		t.verticalCenter = 0;
		return t;
	};
	_proto.btn_play_i = function () {
		var t = new eui.Button();
		this.btn_play = t;
		t.bottom = 34;
		t.horizontalCenter = 0;
		t.icon = "guideTexture_json.guide_btn_PLAY_NOW";
		t.skinName = "skins.ButtonSkin";
		return t;
	};
	_proto.btn_skip_i = function () {
		var t = new eui.Button();
		this.btn_skip = t;
		t.icon = "guideTexture_json.guide_btn_skip";
		t.label = "";
		t.right = 10;
		t.skinName = "skins.ButtonSkin";
		t.top = 10;
		return t;
	};
	return GuideViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","trackHighlight","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.trackHighlight_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 40;
		t.source = "gameTexture_json.img_jindutiao_di";
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	_proto.trackHighlight_i = function () {
		var t = new eui.Image();
		this.trackHighlight = t;
		t.fillMode = "clip";
		t.horizontalCenter = 0;
		t.source = "gameTexture_json.img_jindutiao_liang";
		t.verticalCenter = 0;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "gameTexture_json.img_jindutiaodian";
		t.y = 0;
		return t;
	};
	return HSliderSkin;
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
		this.skinParts = ["gameView","gameOverView","gmView","pauseView","guideView"];
		
		this.height = 1336;
		this.width = 750;
		this.elementsContent = [this.gameView_i(),this.gameOverView_i(),this.gmView_i(),this.pauseView_i(),this.guideView_i()];
	}
	var _proto = MainViewSkin.prototype;

	_proto.gameView_i = function () {
		var t = new GameView();
		this.gameView = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto.gameOverView_i = function () {
		var t = new GameOverView();
		this.gameOverView = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.gmView_i = function () {
		var t = new GMView();
		this.gmView = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.pauseView_i = function () {
		var t = new PauseView();
		this.pauseView = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.guideView_i = function () {
		var t = new GuideView();
		this.guideView = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	return MainViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PauseViewSkin.exml'] = window.PauseViewSkin = (function (_super) {
	__extends(PauseViewSkin, _super);
	var PauseViewSkin$Skin1 = 	(function (_super) {
		__extends(PauseViewSkin$Skin1, _super);
		function PauseViewSkin$Skin1() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","gameTexture_json.img_toggle_on")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = PauseViewSkin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "gameTexture_json.img_toggle_off";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return PauseViewSkin$Skin1;
	})(eui.Skin);

	var PauseViewSkin$Skin2 = 	(function (_super) {
		__extends(PauseViewSkin$Skin2, _super);
		function PauseViewSkin$Skin2() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","gameTexture_json.img_toggle_on")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = PauseViewSkin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "gameTexture_json.img_toggle_off";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return PauseViewSkin$Skin2;
	})(eui.Skin);

	function PauseViewSkin() {
		_super.call(this);
		this.skinParts = ["lb_verison","slider_sound","slider_music","btn_setting_resume","btn_end","checkBox_shadow","checkBox_directlydownBtn","gp_setting","btn_resume","gp_pause"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Group5_i()];
	}
	var _proto = PauseViewSkin.prototype;

	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image1_i(),this.lb_verison_i(),this.gp_setting_i(),this.gp_pause_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg_setting_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.lb_verison_i = function () {
		var t = new eui.Label();
		this.lb_verison = t;
		t.bottom = 5;
		t.right = 5;
		t.text = "0";
		return t;
	};
	_proto.gp_setting_i = function () {
		var t = new eui.Group();
		this.gp_setting = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.visible = false;
		t.percentWidth = 100;
		t.elementsContent = [this._Group1_i(),this._Group2_i(),this.btn_setting_resume_i(),this.btn_end_i(),this._Group3_i(),this._Group4_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 180;
		t.elementsContent = [this._Image2_i(),this.slider_sound_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "gameTexture_json.img_sound";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.slider_sound_i = function () {
		var t = new eui.HSlider();
		this.slider_sound = t;
		t.maximum = 100;
		t.skinName = "skins.HSliderSkin";
		t.x = 103;
		t.y = 7.5;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 270;
		t.elementsContent = [this._Image3_i(),this.slider_music_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "gameTexture_json.img_music";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.slider_music_i = function () {
		var t = new eui.HSlider();
		this.slider_music = t;
		t.maximum = 100;
		t.skinName = "skins.HSliderSkin";
		t.x = 103;
		t.y = 6;
		return t;
	};
	_proto.btn_setting_resume_i = function () {
		var t = new eui.Button();
		this.btn_setting_resume = t;
		t.horizontalCenter = 0;
		t.icon = "gameTexture_json.btn_Resume";
		t.label = "";
		t.skinName = "skins.ButtonSkin";
		t.y = 366;
		return t;
	};
	_proto.btn_end_i = function () {
		var t = new eui.Button();
		this.btn_end = t;
		t.horizontalCenter = 0;
		t.icon = "gameTexture_json.btn_End_Game";
		t.label = "";
		t.skinName = "skins.ButtonSkin";
		t.y = 486;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.x = 355;
		t.y = 40;
		t.elementsContent = [this.checkBox_shadow_i(),this._Label1_i()];
		return t;
	};
	_proto.checkBox_shadow_i = function () {
		var t = new eui.CheckBox();
		this.checkBox_shadow = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.y = 0;
		t.skinName = PauseViewSkin$Skin1;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.text = "ghost pieces";
		t.y = 78;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.width = 144;
		t.x = 106;
		t.y = 40;
		t.elementsContent = [this.checkBox_directlydownBtn_i(),this._Label2_i()];
		return t;
	};
	_proto.checkBox_directlydownBtn_i = function () {
		var t = new eui.CheckBox();
		this.checkBox_directlydownBtn = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.y = 0;
		t.skinName = PauseViewSkin$Skin2;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.text = "right hand";
		t.y = 78;
		return t;
	};
	_proto.gp_pause_i = function () {
		var t = new eui.Group();
		this.gp_pause = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.visible = false;
		t.percentWidth = 100;
		t.elementsContent = [this._Image4_i(),this.btn_resume_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "gameTexture_json.text_GAME_pause";
		t.y = 96;
		return t;
	};
	_proto.btn_resume_i = function () {
		var t = new eui.Button();
		this.btn_resume = t;
		t.horizontalCenter = 0;
		t.icon = "gameTexture_json.btn_red_RESUME";
		t.skinName = "skins.ButtonSkin";
		t.y = 446;
		return t;
	};
	return PauseViewSkin;
})(eui.Skin);