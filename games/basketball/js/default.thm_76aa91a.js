
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
                generateEUI.styles = {"1":{"textColor":"0x6e442a","textAlign":"center","size":"22"}};
                generateEUI.skins = {"BaseView":"resource/eui_skins/BaseViewSkin.exml","MainView":"resource/eui_skins/MainViewSkin.exml","GameView":"resource/eui_skins/GameViewSkin.exml"};generateEUI.paths['resource/eui_skins/BaseViewSkin.exml'] = window.BaseViewSkin = (function (_super) {
	__extends(BaseViewSkin, _super);
	function BaseViewSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 800;
		this.width = 460;
	}
	var _proto = BaseViewSkin.prototype;

	return BaseViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GameViewSkin.exml'] = window.GameViewSkin = (function (_super) {
	__extends(GameViewSkin, _super);
	function GameViewSkin() {
		_super.call(this);
		this.skinParts = ["img_shadow","lb_coin_num","lb_score","lb_perfectNum","img_border","lb_throw_in_num","lb_best_score","img_net","lb_score_add","gp_border_bg","gp_ball","img_net_lineL_0","img_net_lineL_1","img_net_lineL_2","img_net_lineL_3","img_net_lineR_0","img_net_lineR_1","img_net_lineR_2","img_net_lineR_3","img_net_link_0","img_net_link_1","img_net_link_2","img_net_link_3","img_net_link_4","img_net_link_5","img_net_link_6","img_net_link_7","img_net_link_8","img_net_link_9","img_net_link_10","img_net_link_11","img_net_link_12","img_net_link_13","img_net_link_14","img_net_link_15","img_net_link_16","img_net_link_17","img_border_top","img_net_top","gp_coin","gp_play","img_finger"];
		
		this.height = 800;
		this.width = 460;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.img_shadow_i(),this._Group1_i(),this.gp_border_bg_i(),this.gp_play_i(),this.img_finger_i()];
	}
	var _proto = GameViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "bg_jpg";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.source = "stage_bg_png";
		return t;
	};
	_proto.img_shadow_i = function () {
		var t = new eui.Image();
		this.img_shadow = t;
		t.anchorOffsetX = 50;
		t.anchorOffsetY = 9;
		t.bottom = 21;
		t.source = "ball_shadow_png";
		t.x = 230;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.left = 10;
		t.top = 10;
		t.elementsContent = [this._Image3_i(),this.lb_coin_num_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.source = "coin_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.lb_coin_num_i = function () {
		var t = new eui.Label();
		this.lb_coin_num = t;
		t.bold = true;
		t.text = "0";
		t.verticalCenter = 0;
		t.x = 54;
		return t;
	};
	_proto.gp_border_bg_i = function () {
		var t = new eui.Group();
		this.gp_border_bg = t;
		t.height = 232;
		t.width = 328;
		t.x = 66;
		t.y = 200;
		t.elementsContent = [this._Image4_i(),this._Group2_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "shadow_png";
		t.x = 0;
		t.y = 2.5;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 380;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image5_i(),this.lb_score_i(),this.lb_perfectNum_i(),this._Image6_i(),this._Image7_i(),this.img_border_i(),this._Image8_i(),this.lb_throw_in_num_i(),this.lb_best_score_i(),this.img_net_i(),this.lb_score_add_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "kuang_png";
		t.x = 0.5;
		t.y = 0.5;
		return t;
	};
	_proto.lb_score_i = function () {
		var t = new eui.Label();
		this.lb_score = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 80;
		t.text = "0";
		t.y = 19;
		return t;
	};
	_proto.lb_perfectNum_i = function () {
		var t = new eui.Label();
		this.lb_perfectNum = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "X0";
		t.textColor = 0xfccd00;
		t.y = 118;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "right_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "ball_kuang_flag_png";
		t.x = 21;
		t.y = 190.1;
		return t;
	};
	_proto.img_border_i = function () {
		var t = new eui.Image();
		this.img_border = t;
		t.source = "red_kuang_png";
		t.visible = false;
		t.x = 103;
		t.y = 172.5;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "cat_png";
		t.x = 20;
		t.y = 162.5;
		return t;
	};
	_proto.lb_throw_in_num_i = function () {
		var t = new eui.Label();
		this.lb_throw_in_num = t;
		t.text = "0";
		t.x = 49;
		t.y = 185;
		return t;
	};
	_proto.lb_best_score_i = function () {
		var t = new eui.Label();
		this.lb_best_score = t;
		t.size = 30;
		t.text = "0";
		t.x = 49;
		t.y = 157;
		return t;
	};
	_proto.img_net_i = function () {
		var t = new eui.Image();
		this.img_net = t;
		t.scaleX = 1.3;
		t.source = "ball_net_png";
		t.visible = false;
		t.x = 100;
		t.y = 179.5;
		return t;
	};
	_proto.lb_score_add_i = function () {
		var t = new eui.Label();
		this.lb_score_add = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "0";
		t.y = 301;
		return t;
	};
	_proto.gp_play_i = function () {
		var t = new eui.Group();
		this.gp_play = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.elementsContent = [this.gp_ball_i(),this.img_net_lineL_0_i(),this.img_net_lineL_1_i(),this.img_net_lineL_2_i(),this.img_net_lineL_3_i(),this.img_net_lineR_0_i(),this.img_net_lineR_1_i(),this.img_net_lineR_2_i(),this.img_net_lineR_3_i(),this.img_net_link_0_i(),this.img_net_link_1_i(),this.img_net_link_2_i(),this.img_net_link_3_i(),this.img_net_link_4_i(),this.img_net_link_5_i(),this.img_net_link_6_i(),this.img_net_link_7_i(),this.img_net_link_8_i(),this.img_net_link_9_i(),this.img_net_link_10_i(),this.img_net_link_11_i(),this.img_net_link_12_i(),this.img_net_link_13_i(),this.img_net_link_14_i(),this.img_net_link_15_i(),this.img_net_link_16_i(),this.img_net_link_17_i(),this.img_border_top_i(),this.img_net_top_i(),this.gp_coin_i()];
		return t;
	};
	_proto.gp_ball_i = function () {
		var t = new eui.Group();
		this.gp_ball = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.width = 120;
		t.x = 230;
		t.y = 707;
		t.elementsContent = [this._Image9_i(),this._Image10_i()];
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.horizontalCenter = 0;
		t.name = "ball";
		t.source = "ball_png";
		t.verticalCenter = 0;
		t.width = 120;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.horizontalCenter = 0;
		t.source = "light_png";
		t.verticalCenter = 0;
		t.width = 120;
		return t;
	};
	_proto.img_net_lineL_0_i = function () {
		var t = new eui.Image();
		this.img_net_lineL_0 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 18;
		t.x = 496;
		t.y = 13.5;
		return t;
	};
	_proto.img_net_lineL_1_i = function () {
		var t = new eui.Image();
		this.img_net_lineL_1 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 20;
		t.x = 486;
		t.y = 4.5;
		return t;
	};
	_proto.img_net_lineL_2_i = function () {
		var t = new eui.Image();
		this.img_net_lineL_2 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.visible = false;
		t.width = 18;
		t.x = 258;
		t.y = 24.5;
		return t;
	};
	_proto.img_net_lineL_3_i = function () {
		var t = new eui.Image();
		this.img_net_lineL_3 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.visible = false;
		t.width = 18;
		t.x = 268;
		t.y = 34.5;
		return t;
	};
	_proto.img_net_lineR_0_i = function () {
		var t = new eui.Image();
		this.img_net_lineR_0 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 18;
		t.x = 544;
		t.y = 13.5;
		return t;
	};
	_proto.img_net_lineR_1_i = function () {
		var t = new eui.Image();
		this.img_net_lineR_1 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 18;
		t.x = 554;
		t.y = 23.5;
		return t;
	};
	_proto.img_net_lineR_2_i = function () {
		var t = new eui.Image();
		this.img_net_lineR_2 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.visible = false;
		t.width = 18;
		t.x = 286;
		t.y = 3.5;
		return t;
	};
	_proto.img_net_lineR_3_i = function () {
		var t = new eui.Image();
		this.img_net_lineR_3 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.visible = false;
		t.width = 18;
		t.x = 316;
		t.y = 33.5;
		return t;
	};
	_proto.img_net_link_0_i = function () {
		var t = new eui.Image();
		this.img_net_link_0 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 20;
		t.x = 574;
		t.y = 43.5;
		return t;
	};
	_proto.img_net_link_1_i = function () {
		var t = new eui.Image();
		this.img_net_link_1 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 20;
		t.x = 584;
		t.y = 53.5;
		return t;
	};
	_proto.img_net_link_2_i = function () {
		var t = new eui.Image();
		this.img_net_link_2 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 20;
		t.x = 594;
		t.y = 63.5;
		return t;
	};
	_proto.img_net_link_3_i = function () {
		var t = new eui.Image();
		this.img_net_link_3 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 20;
		t.x = 604;
		t.y = 73.5;
		return t;
	};
	_proto.img_net_link_4_i = function () {
		var t = new eui.Image();
		this.img_net_link_4 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 20;
		t.x = 614;
		t.y = 83.5;
		return t;
	};
	_proto.img_net_link_5_i = function () {
		var t = new eui.Image();
		this.img_net_link_5 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 20;
		t.x = 624;
		t.y = 93.5;
		return t;
	};
	_proto.img_net_link_6_i = function () {
		var t = new eui.Image();
		this.img_net_link_6 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 22;
		t.x = 634;
		t.y = 103.5;
		return t;
	};
	_proto.img_net_link_7_i = function () {
		var t = new eui.Image();
		this.img_net_link_7 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 20;
		t.x = 644;
		t.y = 113.5;
		return t;
	};
	_proto.img_net_link_8_i = function () {
		var t = new eui.Image();
		this.img_net_link_8 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 20;
		t.x = 654;
		t.y = 123.5;
		return t;
	};
	_proto.img_net_link_9_i = function () {
		var t = new eui.Image();
		this.img_net_link_9 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 20;
		t.x = 664;
		t.y = 133.5;
		return t;
	};
	_proto.img_net_link_10_i = function () {
		var t = new eui.Image();
		this.img_net_link_10 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 20;
		t.x = 674;
		t.y = 143.5;
		return t;
	};
	_proto.img_net_link_11_i = function () {
		var t = new eui.Image();
		this.img_net_link_11 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 22;
		t.x = 684;
		t.y = 153.5;
		return t;
	};
	_proto.img_net_link_12_i = function () {
		var t = new eui.Image();
		this.img_net_link_12 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 21;
		t.x = 694;
		t.y = 163.5;
		return t;
	};
	_proto.img_net_link_13_i = function () {
		var t = new eui.Image();
		this.img_net_link_13 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 21;
		t.x = 704;
		t.y = 173.5;
		return t;
	};
	_proto.img_net_link_14_i = function () {
		var t = new eui.Image();
		this.img_net_link_14 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 21;
		t.x = 714;
		t.y = 183.5;
		return t;
	};
	_proto.img_net_link_15_i = function () {
		var t = new eui.Image();
		this.img_net_link_15 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 21;
		t.x = 724;
		t.y = 193.5;
		return t;
	};
	_proto.img_net_link_16_i = function () {
		var t = new eui.Image();
		this.img_net_link_16 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 21;
		t.x = 734;
		t.y = 203.5;
		return t;
	};
	_proto.img_net_link_17_i = function () {
		var t = new eui.Image();
		this.img_net_link_17 = t;
		t.anchorOffsetX = 9;
		t.anchorOffsetY = 2.5;
		t.height = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ball_net_line_jpg";
		t.width = 21;
		t.x = 744;
		t.y = 213.5;
		return t;
	};
	_proto.img_border_top_i = function () {
		var t = new eui.Image();
		this.img_border_top = t;
		t.source = "red_kuang_png";
		t.x = 348;
		t.y = -300;
		return t;
	};
	_proto.img_net_top_i = function () {
		var t = new eui.Image();
		this.img_net_top = t;
		t.scaleX = 1.3;
		t.source = "ball_net_png";
		t.visible = false;
		t.x = 63;
		t.y = -152;
		return t;
	};
	_proto.gp_coin_i = function () {
		var t = new eui.Group();
		this.gp_coin = t;
		t.touchEnabled = false;
		t.visible = false;
		t.x = 439;
		t.y = 773;
		return t;
	};
	_proto.img_finger_i = function () {
		var t = new eui.Image();
		this.img_finger = t;
		t.bottom = -120;
		t.right = 0;
		t.source = "finger_png";
		t.touchEnabled = false;
		t.visible = false;
		return t;
	};
	return GameViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/MainViewSkin.exml'] = window.MainViewSkin = (function (_super) {
	__extends(MainViewSkin, _super);
	function MainViewSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 800;
		this.width = 460;
	}
	var _proto = MainViewSkin.prototype;

	return MainViewSkin;
})(eui.Skin);