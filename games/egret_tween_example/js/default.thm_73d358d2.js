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
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.TextInput":"resource/eui_skins/TextInput.exml","BaseView":"resource/eui_skins/BaseViewSkin.exml","MainView":"resource/eui_skins/MainViewSkin.exml","GameView":"resource/eui_skins/GameViewSkin.exml","TweenExportItem":"resource/eui_skins/TweenExportItemSkin.exml","TweenEaseSelectView":"resource/eui_skins/TweenEaseSelectViewSkin.exml"};generateEUI.paths['resource/eui_skins/BaseViewSkin.exml'] = window.BaseViewSkin = (function (_super) {
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
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GameViewSkin.exml'] = window.GameViewSkin = (function (_super) {
	__extends(GameViewSkin, _super);
	function GameViewSkin() {
		_super.call(this);
		this.skinParts = ["lb_version","lb_info","img_gameover","btn_add","btn_export","btn_reset","btn_clear","btn_play","gp_item"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Group2_i()];
	}
	var _proto = GameViewSkin.prototype;

	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		t.elementsContent = [this._Rect1_i(),this.lb_version_i(),this.lb_info_i(),this.img_gameover_i(),this._Group1_i(),this._Scroller1_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.lb_version_i = function () {
		var t = new eui.Label();
		this.lb_version = t;
		t.bottom = 0;
		t.right = 0;
		t.text = "0";
		return t;
	};
	_proto.lb_info_i = function () {
		var t = new eui.Label();
		this.lb_info = t;
		t.lineSpacing = 10;
		t.text = "Label";
		t.width = 750;
		return t;
	};
	_proto.img_gameover_i = function () {
		var t = new eui.Image();
		this.img_gameover = t;
		t.anchorOffsetX = 317;
		t.anchorOffsetY = 50;
		t.height = 100;
		t.source = "text_tip_game_Over_png";
		t.width = 634;
		t.x = 375;
		t.y = 400;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 360;
		t.height = 150;
		t.horizontalCenter = 0;
		t.width = 660;
		t.elementsContent = [this.btn_add_i(),this.btn_export_i(),this.btn_reset_i(),this.btn_clear_i(),this.btn_play_i()];
		return t;
	};
	_proto.btn_add_i = function () {
		var t = new eui.Button();
		this.btn_add = t;
		t.horizontalCenter = 0;
		t.icon = "btn_on_png";
		t.label = "add";
		t.y = 81;
		return t;
	};
	_proto.btn_export_i = function () {
		var t = new eui.Button();
		this.btn_export = t;
		t.horizontalCenter = 0;
		t.icon = "btn_on_png";
		t.label = "export";
		t.y = 0;
		return t;
	};
	_proto.btn_reset_i = function () {
		var t = new eui.Button();
		this.btn_reset = t;
		t.icon = "btn_on_png";
		t.label = "reset";
		t.y = 0;
		return t;
	};
	_proto.btn_clear_i = function () {
		var t = new eui.Button();
		this.btn_clear = t;
		t.icon = "btn_on_png";
		t.label = "clear";
		t.left = 0;
		t.y = 81;
		return t;
	};
	_proto.btn_play_i = function () {
		var t = new eui.Button();
		this.btn_play = t;
		t.icon = "btn_on_png";
		t.label = "play";
		t.right = 0;
		t.y = 81;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.bottom = 40;
		t.height = 300;
		t.width = 750;
		t.x = 0;
		t.viewport = this.gp_item_i();
		return t;
	};
	_proto.gp_item_i = function () {
		var t = new eui.Group();
		this.gp_item = t;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TweenEaseSelectViewSkin.exml'] = window.TweenEaseSelectViewSkin = (function (_super) {
	__extends(TweenEaseSelectViewSkin, _super);
	function TweenEaseSelectViewSkin() {
		_super.call(this);
		this.skinParts = ["gp_item","btn_close","btn_clear"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = TweenEaseSelectViewSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		t.elementsContent = [this._Rect1_i(),this._Scroller1_i(),this.btn_close_i(),this.btn_clear_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.bounces = false;
		t.height = 1000;
		t.horizontalCenter = 0;
		t.width = 600;
		t.y = 235;
		t.viewport = this.gp_item_i();
		return t;
	};
	_proto.gp_item_i = function () {
		var t = new eui.Group();
		this.gp_item = t;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalAlign = "center";
		t.horizontalGap = 0;
		t.orientation = "rows";
		t.requestedColumnCount = 3;
		t.verticalGap = 0;
		return t;
	};
	_proto.btn_close_i = function () {
		var t = new eui.Button();
		this.btn_close = t;
		t.icon = "btn_on_png";
		t.label = "close";
		t.right = 80;
		t.y = 70;
		return t;
	};
	_proto.btn_clear_i = function () {
		var t = new eui.Button();
		this.btn_clear = t;
		t.icon = "btn_on_png";
		t.label = "clear";
		t.left = 80;
		t.y = 70;
		return t;
	};
	return TweenEaseSelectViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TweenExportItemSkin.exml'] = window.TweenExportItemSkin = (function (_super) {
	__extends(TweenExportItemSkin, _super);
	function TweenExportItemSkin() {
		_super.call(this);
		this.skinParts = ["textInput_time","textInput_x","textInput_y","textInput_alpha","textInput_rotation","textInput_scaleX","textInput_scaleY","textInput_skewX","textInput_skewY","btn_delete","textInput_ease","gp_ease"];
		
		this.height = 150;
		this.width = 700;
		this.elementsContent = [this._Group11_i()];
	}
	var _proto = TweenExportItemSkin.prototype;

	_proto._Group11_i = function () {
		var t = new eui.Group();
		t.height = 150;
		t.verticalCenter = 0;
		t.width = 700;
		t.x = 0;
		t.elementsContent = [this._Group10_i(),this.btn_delete_i(),this.gp_ease_i()];
		return t;
	};
	_proto._Group10_i = function () {
		var t = new eui.Group();
		t.height = 150;
		t.right = 0;
		t.verticalCenter = 0;
		t.width = 560;
		t.layout = this._TileLayout1_i();
		t.elementsContent = [this._Group1_i(),this._Group2_i(),this._Group3_i(),this._Group4_i(),this._Group5_i(),this._Group6_i(),this._Group7_i(),this._Group8_i(),this._Group9_i()];
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalAlign = "left";
		t.horizontalGap = 5;
		t.orientation = "rows";
		t.requestedColumnCount = 5;
		t.verticalGap = 10;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 460;
		t.y = 0;
		t.elementsContent = [this._Label1_i(),this.textInput_time_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.text = "duration";
		t.y = 0;
		return t;
	};
	_proto.textInput_time_i = function () {
		var t = new eui.TextInput();
		this.textInput_time = t;
		t.height = 40;
		t.prompt = "500";
		t.skinName = "skins.TextInputSkin";
		t.text = "500";
		t.width = 100;
		t.x = 0;
		t.y = 30;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 1;
		t.y = 0;
		t.elementsContent = [this._Label2_i(),this.textInput_x_i()];
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.text = "x";
		t.y = 0;
		return t;
	};
	_proto.textInput_x_i = function () {
		var t = new eui.TextInput();
		this.textInput_x = t;
		t.height = 40;
		t.prompt = "x";
		t.skinName = "skins.TextInputSkin";
		t.width = 100;
		t.x = 0;
		t.y = 30;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.x = 116;
		t.y = 0;
		t.elementsContent = [this._Label3_i(),this.textInput_y_i()];
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.text = "y";
		t.y = 0;
		return t;
	};
	_proto.textInput_y_i = function () {
		var t = new eui.TextInput();
		this.textInput_y = t;
		t.height = 40;
		t.prompt = "y";
		t.skinName = "skins.TextInputSkin";
		t.width = 100;
		t.x = 0;
		t.y = 30;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.x = 231;
		t.y = 0;
		t.elementsContent = [this._Label4_i(),this.textInput_alpha_i()];
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.text = "alpha";
		t.y = 0;
		return t;
	};
	_proto.textInput_alpha_i = function () {
		var t = new eui.TextInput();
		this.textInput_alpha = t;
		t.height = 40;
		t.prompt = "alpha";
		t.skinName = "skins.TextInputSkin";
		t.width = 100;
		t.x = 0;
		t.y = 30;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.x = 241;
		t.y = 10;
		t.elementsContent = [this._Label5_i(),this.textInput_rotation_i()];
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.text = "rotation";
		t.y = 0;
		return t;
	};
	_proto.textInput_rotation_i = function () {
		var t = new eui.TextInput();
		this.textInput_rotation = t;
		t.height = 40;
		t.prompt = "rotation";
		t.skinName = "skins.TextInputSkin";
		t.width = 100;
		t.x = 0;
		t.y = 30;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 76;
		t.elementsContent = [this._Label6_i(),this.textInput_scaleX_i()];
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.text = "scaleX";
		t.y = 0;
		return t;
	};
	_proto.textInput_scaleX_i = function () {
		var t = new eui.TextInput();
		this.textInput_scaleX = t;
		t.height = 40;
		t.prompt = "scaleX";
		t.skinName = "skins.TextInputSkin";
		t.width = 100;
		t.x = 0;
		t.y = 30;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.x = 10;
		t.y = 86;
		t.elementsContent = [this._Label7_i(),this.textInput_scaleY_i()];
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.text = "scaleY";
		t.y = 0;
		return t;
	};
	_proto.textInput_scaleY_i = function () {
		var t = new eui.TextInput();
		this.textInput_scaleY = t;
		t.height = 40;
		t.prompt = "scaleY";
		t.skinName = "skins.TextInputSkin";
		t.width = 100;
		t.x = 0;
		t.y = 30;
		return t;
	};
	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.x = 20;
		t.y = 96;
		t.elementsContent = [this._Label8_i(),this.textInput_skewX_i()];
		return t;
	};
	_proto._Label8_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.text = "skewX";
		t.y = 0;
		return t;
	};
	_proto.textInput_skewX_i = function () {
		var t = new eui.TextInput();
		this.textInput_skewX = t;
		t.height = 40;
		t.prompt = "skewX";
		t.skinName = "skins.TextInputSkin";
		t.width = 100;
		t.x = 0;
		t.y = 30;
		return t;
	};
	_proto._Group9_i = function () {
		var t = new eui.Group();
		t.x = 30;
		t.y = 106;
		t.elementsContent = [this._Label9_i(),this.textInput_skewY_i()];
		return t;
	};
	_proto._Label9_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.text = "skewY";
		t.y = 0;
		return t;
	};
	_proto.textInput_skewY_i = function () {
		var t = new eui.TextInput();
		this.textInput_skewY = t;
		t.height = 40;
		t.prompt = "skewY";
		t.skinName = "skins.TextInputSkin";
		t.width = 100;
		t.x = 0;
		t.y = 30;
		return t;
	};
	_proto.btn_delete_i = function () {
		var t = new eui.Button();
		this.btn_delete = t;
		t.icon = "btn_on_png";
		t.label = "delete";
		t.scaleX = 0.8;
		t.x = 0;
		t.y = 7;
		return t;
	};
	_proto.gp_ease_i = function () {
		var t = new eui.Group();
		this.gp_ease = t;
		t.y = 79;
		t.elementsContent = [this._Label10_i(),this.textInput_ease_i()];
		return t;
	};
	_proto._Label10_i = function () {
		var t = new eui.Label();
		t.anchorOffsetY = 0;
		t.height = 29;
		t.horizontalCenter = 0;
		t.text = "ease";
		t.y = 0;
		return t;
	};
	_proto.textInput_ease_i = function () {
		var t = new eui.TextInput();
		this.textInput_ease = t;
		t.enabled = false;
		t.height = 40;
		t.prompt = "-";
		t.skinName = "skins.TextInputSkin";
		t.width = 133;
		t.x = 0;
		t.y = 30;
		return t;
	};
	return TweenExportItemSkin;
})(eui.Skin);