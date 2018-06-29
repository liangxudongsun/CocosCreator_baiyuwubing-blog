var __reflect=this&&this.__reflect||function(t,e,o){t.__class__=e,o?o.push(e):o=[e],t.__types__=t.__types__?o.concat(t.__types__):o},__extends=this&&this.__extends||function(t,e){function o(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);o.prototype=e.prototype,t.prototype=new o},__awaiter=this&&this.__awaiter||function(t,e,o,i){return new(o||(o=Promise))(function(n,r){function a(t){try{l(i.next(t))}catch(e){r(e)}}function s(t){try{l(i["throw"](t))}catch(e){r(e)}}function l(t){t.done?n(t.value):new o(function(e){e(t.value)}).then(a,s)}l((i=i.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function o(t){return function(e){return i([t,e])}}function i(o){if(n)throw new TypeError("Generator is already executing.");for(;l;)try{if(n=1,r&&(a=r[2&o[0]?"return":o[0]?"throw":"next"])&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[0,a.value]),o[0]){case 0:case 1:a=o;break;case 4:return l.label++,{value:o[1],done:!1};case 5:l.label++,r=o[1],o=[0];continue;case 7:o=l.ops.pop(),l.trys.pop();continue;default:if(a=l.trys,!(a=a.length>0&&a[a.length-1])&&(6===o[0]||2===o[0])){l=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){l.label=o[1];break}if(6===o[0]&&l.label<a[1]){l.label=a[1],a=o;break}if(a&&l.label<a[2]){l.label=a[2],l.ops.push(o);break}a[2]&&l.ops.pop(),l.trys.pop();continue}o=e.call(t,l)}catch(i){o=[6,i],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}var n,r,a,s,l={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:o(0),"throw":o(1),"return":o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},BaseView=function(t){function e(){var e=t.call(this)||this;return e._needBlackBg=!0,e}return __extends(e,t),e.prototype.partAdded=function(e,o){t.prototype.partAdded.call(this,e,o)},e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),this.percentWidth=this.percentHeight=100,this.drawBlackBg()},e.prototype.drawBlackBg=function(){if(this._needBlackBg){var t=2*this.stage.stageWidth,e=2*this.stage.stageHeight;this._bgShape||(this._bgShape=new egret.Shape,this._bgShape.graphics.beginFill(0,.5),this._bgShape.graphics.drawRect(0,0,t,e),this._bgShape.graphics.endFill()),this._bgShape.x=(this.width-t)/2,this._bgShape.y=(this.height-e)/2,this.addChildAt(this._bgShape,0)}else func.removeFromParent(this._bgShape)},e.prototype.isShow=function(){return this.visible},e.prototype.show=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.visible=!0,this.parent&&this.parent.addChild(this),this.alpha=.2,this.scaleX=this.scaleY=.9,egret.Tween.get(this).to({alpha:1}),egret.Tween.get(this).to({scaleX:1,scaleY:1},500,egret.Ease.backInOut)},e.prototype.hide=function(){for(var t=this,e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];egret.Tween.removeTweens(this),egret.Tween.get(this).to({alpha:0,scaleX:.8,scaleY:.8},500).call(function(){t.visible=!1})},e.prototype.addTouchTapEvent=function(t,e,o,i){t.addEventListener(egret.TouchEvent.TOUCH_TAP,e,this,o,i)},e}(eui.Component);__reflect(BaseView.prototype,"BaseView",["eui.UIComponent","egret.DisplayObject"]);var SingletonClass=function(){function t(){}return t.ins=function(){return this._ins||(this._ins=new this),this._ins},t}();__reflect(SingletonClass.prototype,"SingletonClass");var MainView=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.prototype.partAdded=function(e,o){t.prototype.partAdded.call(this,e,o)},e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),this.gameView=new GameView,this.addChild(this.gameView)},e}(BaseView);__reflect(MainView.prototype,"MainView");var DebugPlatform=function(){function t(){}return t.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,{nickName:"username"}]})})},t.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var ThemeAdapter=function(){function t(){}return t.prototype.getTheme=function(t,e,o,i){function n(t){e.call(i,t)}function r(e){e.resItem.url==t&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,r,null),o.call(i))}"undefined"!=typeof generateEUI?egret.callLater(function(){e.call(i,generateEUI)},this):(RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,r,null),RES.getResByUrl(t,n,this,RES.ResourceItem.TYPE_TEXT))},t}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);var AssetAdapter=function(){function t(){}return t.prototype.getAsset=function(t,e,o){function i(i){e.call(o,i,t)}if(RES.hasRes(t)){var n=RES.getRes(t);n?i(n):RES.getResAsync(t,i,this)}else RES.getResByUrl(t,i,this,RES.ResourceItem.TYPE_IMAGE)},t}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var func;!function(t){function e(t){t&&t.parent&&t.parent.removeChild(t)}function o(t,e,o,i,n){void 0===n&&(n=egret.HttpMethod.GET);var r=new egret.HttpRequest;r.responseType=egret.HttpResponseType.TEXT;var a="",s=!0;for(var l in e)s?s=!1:a+="&",a+=l+"="+e[l];r.open(n==egret.HttpMethod.GET?t+"?"+a:t,n),r.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n==egret.HttpMethod.GET?r.send():r.send(a),egret.log("sendUrl:"+t+"  \nsendParams:"+a),r.addEventListener(egret.Event.COMPLETE,function(t){var e=t.currentTarget;if(e&&e.response){var n=JSON.parse(e.response);egret.log("request.response:"+e.response);var r=n.error_code,a=n.error||"ERROR";n&&0==r?o(n):i(r,a)}else i(-2,"NO_REQUEST")},this),r.addEventListener(egret.IOErrorEvent.IO_ERROR,function(){i(-1,"IO_ERROR")},this)}function i(t,e,o){void 0===e&&(e=function(){}),t.anchorOffsetX=t.width/2,t.anchorOffsetY=t.height/2,t.x+=t.width/2,t.y+=t.height/2,t.anchorOffsetY=t.height/2;var i=o?o:t;t.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){egret.Tween.get(t).to({scaleX:.85,scaleY:.85},100)},i),t.addEventListener(egret.TouchEvent.TOUCH_CANCEL,function(){egret.Tween.get(t).to({scaleX:1,scaleY:1},100)},i),t.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,function(){egret.Tween.get(t).to({scaleX:1,scaleY:1},100)},i),t.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){egret.Tween.get(t).to({scaleX:1,scaleY:1},100),e&&e.call(i)},i)}function n(t){var e=t,o=window.screen.width/window.screen.height,i=egret.StageScaleMode.SHOW_ALL;egret.Capabilities.isMobile&&(i=egret.StageScaleMode.FIXED_WIDTH,(.56>o||o>.6)&&(i=egret.StageScaleMode.SHOW_ALL)),e.stage.scaleMode=i}function r(t,e){return(e.y-t.y)/(e.x-t.x)}function a(t,e){e.position=[t.x/GameConst.p2_factor,t.y/GameConst.p2_factor]}function s(t,e){e.x=t[0]*GameConst.p2_factor,e.y=t[1]*GameConst.p2_factor}t.removeFromParent=e,t.sendHttpRequest=o,t.addButtonClickByEff=i,t.screenAdaptation=n,t.getPonitSlope=r,t.displayObjectP2Pos=a,t.p2BodyDisplayObjPos=s}(func||(func={}));var Main=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.createChildren=function(){t.prototype.createChildren.call(this),null==e.ins&&(e.ins=this),egret.lifecycle.addLifecycleListener(function(t){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var o=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",o),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(t){egret.error(t)})},e.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.loadResource()];case 1:return t.sent(),[4,platform.getUserInfo()];case 2:return t.sent(),this.createGameScene(),[4,RES.getResAsync("description_json")];case 3:return t.sent(),[2]}})})},e.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(o){switch(o.label){case 0:return o.trys.push([0,4,,5]),t=new LoadingUI,this.stage.addChild(t),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return o.sent(),[4,this.loadTheme()];case 2:return o.sent(),[4,RES.loadGroup("preload",0,t)];case 3:return o.sent(),this.stage.removeChild(t),[3,5];case 4:return e=o.sent(),console.error(e),[3,5];case 5:return[2]}})})},e.prototype.loadTheme=function(){var t=this;return new Promise(function(e,o){var i=new eui.Theme("resource/default.thm.json",t.stage);i.addEventListener(eui.UIEvent.COMPLETE,function(){e()},t)})},e.prototype.createGameScene=function(){SoundMgr.ins().init(),this.mainView=new MainView,this.addChild(this.mainView),GameMgr.ins().init(),GameModel.ins().init()},e.createBitmapByName=function(t){var e=new egret.Bitmap,o=RES.getRes(t);return e.texture=o,e},e}(eui.UILayer);__reflect(Main.prototype,"Main");var GameConst=function(){function t(){}return t.isDebug=!1,t.appVersion="0.180050601",t.p2_factor=1,t.p2_ball_init_x=230/t.p2_factor,t.p2_ball_init_y=1e3/t.p2_factor,t.border_init_h=600,t}();__reflect(GameConst.prototype,"GameConst");var LoadingUI=function(t){function e(){var e=t.call(this)||this;return e.createView(),e}return __extends(e,t),e.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center",this.textField.textColor=13421772},e.prototype.onProgress=function(t,e){this.textField.text="Loading..."+t+"/"+e},e}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var EffectMgr=function(t){function e(){var e=t.call(this)||this;return e._effectReses={},e._effectFactory={},e}return __extends(e,t),e.ins=function(){return t.ins.call(this)},e.prototype.init=function(){this._effectReses={};for(var t=0,o=[e.RES_EFFECT_COINT];t<o.length;t++){var i=o[t];this._effectReses[i]=this.newMovieClip(i)}},e.prototype.getMovieClip=function(t){return this._effectReses[t]||(this._effectReses[t]=this.newMovieClip(t)),this._effectReses[t]},e.prototype.newMovieClip=function(t){if(!this._effectFactory[t]){var e=RES.getRes(t+"_json"),o=RES.getRes(t+"_png");this._effectFactory[t]=new egret.MovieClipDataFactory(e,o)}var i=this._effectFactory[t],n=new egret.MovieClip(i.generateMovieClipData(t));return n.addEventListener(egret.Event.COMPLETE,function(t){func.removeFromParent(n)},this),n.touchEnabled=!1,n},e.RES_EFFECT_COINT="effect_coin",e}(SingletonClass);__reflect(EffectMgr.prototype,"EffectMgr");var GameMgr=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.ins=function(){return t.ins.call(this)},e.prototype.init=function(){var t=this;this._gameView=Main.ins.mainView.gameView,this._world=this._gameView._world,this._ballBoday=this._gameView._ballBoday,this._borderLeftBody=this._gameView._borderLeftBody,this._borderRightBody=this._gameView._borderRightBody,this._ballNetGroup=this._gameView._ballNetGroup,this._world.on("beginContact",function(e){e.bodyA.collisionResponse&&e.bodyB.collisionResponse&&(e.bodyA!=t._ballBoday||e.bodyB!=t._borderLeftBody&&e.bodyB!=t._borderRightBody||GameModel.ins().borderHitCount++,e.bodyB!=t._ballBoday||e.bodyA!=t._borderLeftBody&&e.bodyA!=t._borderRightBody||GameModel.ins().borderHitCount++)}),this.resetGame(),egret.startTick(this.enterFrame,this)},e.prototype.resetGame=function(){GameModel.ins().resetData(),this._gameView.resetView()},e.prototype.gameOver=function(){this.resetGame()},e.prototype.enterFrame=function(t){var e=this._ballBoday.velocity[1];this._world.step(.06);for(var o=this._world.bodies.length,i=0;o>i;i++){var n=this._world.bodies[i];if(n.displays)for(var r=0,a=n.displays;r<a.length;r++){var s=a[r];func.p2BodyDisplayObjPos(n.position,s),s.rotation=180*n.angle/Math.PI}}var l=this._ballBoday.velocity[1];switch(this._ballBoday.status){case BallStatus.IDLE:this._gameView.img_shadow.visible=!0,this._borderRightBody.collisionResponse=this._borderLeftBody.collisionResponse=!1;break;case BallStatus.THROW:break;case BallStatus.THROWED_UP:this._gameView.img_shadow.visible=!1;var d=Main.ins.mainView.height-800,c=.75+(this._ballBoday.position[1]-d)/(this._ballBoday._initPos[1]-d)*1/4;1>c&&this._ballBoday.setDisplayAttr({scaleX:c,scaleY:c}),0>=e&&l>=0&&(this._ballBoday.status=BallStatus.THROWED_DOWN);break;case BallStatus.THROWED_DOWN:this._borderRightBody.collisionResponse=this._borderLeftBody.collisionResponse=!0,this._ballBoday.position[1]>this._borderLeftBody.position[1]+50&&(this._ballBoday.position[0]>this._borderLeftBody.position[0]&&this._ballBoday.position[0]<this._borderRightBody.position[0]?this._ballBoday.status=BallStatus.THROWED_IN:this._ballBoday.status=BallStatus.THROWED_OUT);break;case BallStatus.THROWED_IN:this._ballBoday.dealThrowInOrOut();break;case BallStatus.THROWED_OUT:this._ballBoday.dealThrowInOrOut()}Main.ins.mainView.gameView.update()},e.prototype.resetAllData=function(){},e.prototype.throwBall=function(t){this._ballBoday.status==BallStatus.IDLE&&(this._ballBoday.force=[t*this._ballBoday.mass*20,-8e3*this._ballBoday.mass],this._ballBoday.status=BallStatus.THROW)},e.prototype.throwBallNet=function(){this._ballNetGroup.netP_L.forEach(function(t){t.force=[500*-t.mass,800*t.mass]}),this._ballNetGroup.netP_R.forEach(function(t){t.force=[500*t.mass,800*t.mass]});for(var t=this._ballNetGroup.netLink,e=0;e<t.length;e++){var o=3>e?1:-1;t[e].force=[o*t[e].mass*300,800*t[e].mass]}this._ballNetGroup.netLink2.forEach(function(t){t.force=[0,1e3*t.mass]}),this._ballNetGroup.netLink3.forEach(function(t){t.force=[0,1e3*t.mass]})},e}(SingletonClass);__reflect(GameMgr.prototype,"GameMgr");var LocalStorageMgr=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.ins=function(){return t.ins.call(this)},e.prototype.setLocal=function(t,e){egret.localStorage.setItem(t,e)},e.prototype.getLocal=function(t,e){var o=egret.localStorage.getItem(t);if(null==o)return e;switch(typeof e){case"boolean":return"true"==o;case"number":return Number(o)}return o},e.KEY_BEST_SCORE="KEY_BEST_SCORE",e.KEY_HAS_GUIDED="KEY_HAS_GUIDED",e.KEY_COIN_NUM="KEY_COIN_NUM",e}(SingletonClass);__reflect(LocalStorageMgr.prototype,"LocalStorageMgr");var p2DebugDraw=function(){function t(t){this.COLOR_D_SLEEP=10066329,this.COLOR_D_WAKE=15053490,this.COLOR_K=8355813,this.COLOR_S=8381823,this.world=t}return t.prototype.setSprite=function(t){this.sprite=t},t.prototype.drawDebug=function(){this.sprite.graphics.clear();for(var t=this.world.bodies.length,e=0;t>e;e++)for(var o=this.world.bodies[e],i=0;i<o.shapes.length;i++){var n=o.shapes[i];n instanceof p2.Convex?this.drawConvex(n,o):n instanceof p2.Circle?this.drawCircle(n,o):n instanceof p2.Line?this.drawLine(n,o):n instanceof p2.Particle?this.drawParticle(n,o):n instanceof p2.Plane?this.drawPlane(n,o):n instanceof p2.Capsule&&this.drawCapsule(n,o)}},t.prototype.drawCircle=function(t,e){var o=this.getColor(e),i=this.sprite.graphics;i.lineStyle(1,o),i.beginFill(o,.5),i.drawCircle(e.position[0]*GameConst.p2_factor,e.position[1]*GameConst.p2_factor,t.radius*GameConst.p2_factor);var n=new Array;e.toWorldFrame(n,[t.radius,0]),i.moveTo(e.position[0]*GameConst.p2_factor,e.position[1]*GameConst.p2_factor),i.lineTo(n[0]*GameConst.p2_factor,n[1]*GameConst.p2_factor),i.endFill()},t.prototype.drawCapsule=function(t,e){var o=this.getColor(e),i=t.length,n=t.radius,r=new Array,a=new Array,s=new Array,l=new Array,d=new Array,c=new Array;e.toWorldFrame(r,[-i/2,-n]),e.toWorldFrame(a,[i/2,-n]),e.toWorldFrame(s,[i/2,n]),e.toWorldFrame(l,[-i/2,n]),e.toWorldFrame(d,[i/2,0]),e.toWorldFrame(c,[-i/2,0]);var h=this.sprite.graphics;h.lineStyle(1,o),h.beginFill(o,.5),h.drawCircle(d[0],d[1],n),h.endFill(),h.lineStyle(1,o),h.beginFill(o,.5),h.drawCircle(c[0],c[1],n),h.endFill(),h.lineStyle(1,o),h.beginFill(o,.5),h.moveTo(r[0],r[1]),h.lineTo(a[0],a[1]),h.lineTo(s[0],s[1]),h.lineTo(l[0],l[1]),h.endFill()},t.prototype.drawLine=function(t,e){var o=this.getColor(e),i=t.length,n=new Array,r=new Array;e.toWorldFrame(n,[-i/2,0]),e.toWorldFrame(r,[i/2,0]);var a=this.sprite.graphics;a.lineStyle(1,o),a.moveTo(n[0],n[1]),a.lineTo(r[0],r[1]),a.endFill()},t.prototype.drawParticle=function(t,e){var o=this.getColor(e),i=this.sprite.graphics;i.lineStyle(1,o),i.beginFill(o,.5),i.drawCircle(e.position[0],e.position[1],1),i.endFill(),i.lineStyle(1,o),i.drawCircle(e.position[0],e.position[1],5),i.endFill()},t.prototype.drawConvex=function(t,e){var o=this.getColor(e),i=t.vertices.length,n=this.sprite.graphics;n.lineStyle(1,o),n.beginFill(o,.5);var r=new Array;e.toWorldFrame(r,t.vertices[0]),n.moveTo(e.position[0]*GameConst.p2_factor,e.position[1]*GameConst.p2_factor),n.lineTo(r[0]*GameConst.p2_factor,r[1]*GameConst.p2_factor);for(var a=1;i>=a;a++)e.toWorldFrame(r,t.vertices[a%i]),n.lineTo(r[0]*GameConst.p2_factor,r[1]*GameConst.p2_factor);n.endFill()},t.prototype.drawPlane=function(t,e){var o=this.COLOR_D_SLEEP,i=this.sprite.graphics;i.lineStyle(1,o),i.beginFill(o,1);var n=new Array,r=new Array;e.toWorldFrame(n,[-1e3,0]),i.moveTo(n[0],n[1]),e.toWorldFrame(r,[1e3,0]),i.lineTo(r[0],r[1]),e.toWorldFrame(r,[1e3,-1e3]),i.lineTo(r[0],r[1]),e.toWorldFrame(r,[-1e3,-1e3]),i.lineTo(r[0],r[1]),e.toWorldFrame(r,[-1e3,-0]),i.lineTo(r[0],r[1]),i.endFill()},t.prototype.getColor=function(t){var e=this.COLOR_D_SLEEP;return t.type==p2.Body.KINEMATIC?e=this.COLOR_K:t.type==p2.Body.STATIC?e=this.COLOR_S:t.sleepState==p2.Body.AWAKE&&(e=this.COLOR_D_WAKE),e},t}();__reflect(p2DebugDraw.prototype,"p2DebugDraw");var SoundMgr=function(t){function e(){var e=t.call(this)||this;return e._soundReses={},e}return __extends(e,t),e.ins=function(){return t.ins.call(this)},e.prototype.init=function(){this._soundReses={};for(var t=0,o=["hit01_mp3"];t<o.length;t++){var i=o[t];this._soundReses[i]=RES.getRes(i)}var n=this,r=RES.getRes(e.NULL_Audio);RES.getRes(e.RES_BG);window.playsound?(setTimeout(function(){window.playsound(r,!0)},900),setTimeout(function(){window.playsound(r,!1),n.playBg()},1e3)):n.playBg()},e.prototype.playSoundEffect=function(t){this._soundReses[t]||(this._soundReses[t]=RES.getRes(t));var e=this._soundReses[t];if(e&&e.play){e.play(0,1)}},e.prototype.playBg=function(t){void 0===t&&(t=!0),this._bgChannel=RES.getRes(e.RES_BG).play(),this._bgChannel.volume=.5},e.prototype.playHitSound=function(t){0>=t&&(t=1),t>7&&(t=7),this.playSoundEffect("hit0"+t+"_mp3")},e.prototype.playClapSound=function(t){0>=t&&(t=1),t>5&&(t=5),this.playSoundEffect("clap"+t+"_mp3")},e.RES_BG="music_mp3",e.NULL_Audio="net_mp3",e}(SingletonClass);__reflect(SoundMgr.prototype,"SoundMgr");var GameModel=function(t){function e(){var e=t.call(this)||this;return e._bestScore=0,e._totalScore=0,e._throwInNum=0,e._perfectNum=0,e._borderHitCount=0,e._coinNum=0,e}return __extends(e,t),e.ins=function(){return t.ins.call(this)},Object.defineProperty(e.prototype,"bestScore",{get:function(){return this._bestScore},set:function(t){this._bestScore=t,Main.ins.mainView.gameView.updateBestScoreView(),LocalStorageMgr.ins().setLocal(LocalStorageMgr.KEY_BEST_SCORE,t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"totalScore",{get:function(){return this._totalScore},set:function(t){var e=this._totalScore;this._totalScore=t,t>this._bestScore&&(this.bestScore=t),t>=15&&Main.ins.mainView.gameView.backboardRandomPos(),Main.ins.mainView.gameView.updateScoreView(e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"throwInNum",{get:function(){return this._throwInNum},set:function(t){this._throwInNum;this._throwInNum=t,Main.ins.mainView.gameView.updateThrowInNumView()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"perfectNum",{get:function(){return this._perfectNum},set:function(t){this._perfectNum;this._perfectNum=t,t>0&&SoundMgr.ins().playClapSound(t),Main.ins.mainView.gameView.updatePerfectNumView()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"borderHitCount",{get:function(){return this._borderHitCount},set:function(t){this._borderHitCount=t,t>0&&SoundMgr.ins().playHitSound(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"coinNum",{get:function(){return this._coinNum},set:function(t){this._coinNum;this._coinNum=t,LocalStorageMgr.ins().setLocal(LocalStorageMgr.KEY_COIN_NUM,t)},enumerable:!0,configurable:!0}),e.prototype.init=function(){this.bestScore=LocalStorageMgr.ins().getLocal(LocalStorageMgr.KEY_BEST_SCORE,0),this.coinNum=LocalStorageMgr.ins().getLocal(LocalStorageMgr.KEY_COIN_NUM,0),this.resetData()},e.prototype.resetData=function(){this.totalScore=0,this.borderHitCount=0,this.throwInNum=0,this.perfectNum=0},e}(SingletonClass);__reflect(GameModel.prototype,"GameModel");var GameView=function(t){function e(){var e=t.call(this)||this;return e._touchBeginPos=new egret.Point,e._touchMovePos=new egret.Point,e._lastTouchMovePos=new egret.Point,e._touchBeginTime=egret.getTimer(),e._world=new p2.World,e._ballBoday=new BallItem({mass:1,type:p2.Body.DYNAMIC}),e._borderLeftBody=new p2.Body({mass:1,fixedRotation:!0,type:p2.Body.STATIC}),e._borderRightBody=new p2.Body({mass:1,fixedRotation:!0,type:p2.Body.STATIC}),e._borderLeft1Body=new p2.Body({mass:1,fixedRotation:!0,type:p2.Body.STATIC}),e._borderRight1Body=new p2.Body({mass:1,fixedRotation:!0,type:p2.Body.STATIC}),e._randomBorderHeight=GameConst.border_init_h,e._ballNetGroup={netP_L:[],netP_R:[],netLink:[],netLink2:[],netLink3:[]},e.skinName="GameViewSkin",GameConst.isDebug&&e.createDebug(),e}return __extends(e,t),e.prototype.childrenCreated=function(){var e=this;t.prototype.childrenCreated.call(this);var o=EffectMgr.ins().getMovieClip(EffectMgr.RES_EFFECT_COINT);o.play(-1),this.gp_coin.addChild(o);var i=LocalStorageMgr.ins().getLocal(LocalStorageMgr.KEY_HAS_GUIDED,!1);i?this.img_finger.visible=!1:(this.img_finger.visible=!0,this.img_finger.alpha=1,egret.Tween.get(this.img_finger,{loop:!0}).to({bottom:80,alpha:.4},1e3).wait(300).call(function(){e.img_finger.bottom=-120,e.img_finger.alpha=1}),LocalStorageMgr.ins().setLocal(LocalStorageMgr.KEY_HAS_GUIDED,!0)),this._coinMc=EffectMgr.ins().getMovieClip(EffectMgr.RES_EFFECT_COINT),this._coinMc.gotoAndPlay(0,-1),this.gp_ball.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this),this.gp_ball.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onTouchEnd,this),this.gp_ball.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onTouchEnd,this),this.gp_ball.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this),this.addEventListener(egret.Event.ENTER_FRAME,this.update,this),this._world.gravity=[0,200];var n=new p2.Circle({radius:45,material:new p2.Material(100)});this._ballBoday.addShape(n),this._ballBoday.displays=[this.gp_ball],this._world.addBody(this._ballBoday);var r=new p2.Circle({radius:5,material:new p2.Material(100)});this._borderLeftBody.addShape(r),this._world.addBody(this._borderLeftBody),this._borderLeftBody.gravityScale=0;var a=new p2.Circle({radius:5,material:new p2.Material(100)});this._borderRightBody.addShape(a),this._world.addBody(this._borderRightBody),this._borderRightBody.gravityScale=0;var s=new p2.Circle({radius:5,material:new p2.Material(100)});this._borderLeft1Body.addShape(s),this._world.addBody(this._borderLeft1Body),this._borderLeft1Body.collisionResponse=!1;var l=new p2.Circle({radius:5,material:new p2.Material(100)});this._borderRight1Body.addShape(l),this._world.addBody(this._borderRight1Body),this._borderRight1Body.collisionResponse=!1;var d={restitution:.7,stiffness:Number.MAX_VALUE,friction:.8};this._world.addContactMaterial(new p2.ContactMaterial(n.material,r.material,d)),this._world.addContactMaterial(new p2.ContactMaterial(n.material,a.material,d)),this.init(),this.addEventListener(egret.Event.RESIZE,function(){e._ballBoday.status=e._ballBoday.status,e.updateP2backboardPos(!0)},this),egret.setTimeout(function(){e.createBallNet()},this,1200)},e.prototype.createBallNet=function(){for(var t,e,o=2,i=[],n=[],r=[],a=this.img_border.localToGlobal(),s=o-1;s>=0;s--){var l=a.x+this.img_border.width+20,d=a.y+10+20*(o-1)-20*(o-1-s),c=new p2.Body({mass:1,position:[l,d]});if(c.collisionResponse=!1,c.addShape(new p2.Box({width:18,height:5}),[-.4,.6],Math.PI/2),c.displays=[this["img_net_lineR_"+s]],this._world.addBody(c),t){var h=new p2.RevoluteConstraint(c,t,{localPivotA:[-9,0],localPivotB:[9,0],maxForce:1e4,collideConnected:!1}),p=new p2.DistanceConstraint(c,t,{distance:18});this._world.addConstraint(h),this._world.addConstraint(p)}t=c,i.push(c)}for(var s=o-1;s>=0;s--){var l=a.x+20,d=a.y+10+20*(o-1)-20*(o-1-s),c=new p2.Body({mass:1,position:[l,d]});if(c.collisionResponse=!1,c.addShape(new p2.Box({width:18,height:5}),[-.4,.6],Math.PI/2),c.displays=[this["img_net_lineL_"+s]],this._world.addBody(c),e){var u=new p2.RevoluteConstraint(c,e,{localPivotA:[-9,0],localPivotB:[9,0],maxForce:1e4,collideConnected:!1}),_=new p2.DistanceConstraint(c,e,{distance:18});this._world.addConstraint(u),this._world.addConstraint(_)}e=c,n.push(c)}this._world.addConstraint(new p2.RevoluteConstraint(this._borderRightBody,i[o-1],{localPivotA:[-5,0],localPivotB:[9,-2],maxForce:1e4,collideConnected:!1})),this._world.addConstraint(new p2.RevoluteConstraint(this._borderLeftBody,n[o-1],{localPivotA:[5,0],localPivotB:[9,2],collideConnected:!1})),this._world.addConstraint(new p2.DistanceConstraint(this._borderLeftBody,n[o-1],{distance:9})),this._world.addConstraint(new p2.DistanceConstraint(this._borderRightBody,i[o-1],{distance:9}));for(var g,s=0;3>s;s++){var l=a.x+20+30,d=a.y+20+20*(s-1),c=new p2.Body({mass:1,position:[l,d]});if(0==s&&(c.angle=-Math.PI/2),c.collisionResponse=!1,c.addShape(new p2.Box({width:18,height:5}),[-.4,.6],Math.PI/2),c.displays=[this["img_net_link_"+s]],this._world.addBody(c),g){var u=new p2.RevoluteConstraint(g,c,{localPivotA:[-9,0],localPivotB:[9,0],maxForce:600,collideConnected:!1}),_=new p2.DistanceConstraint(g,c,{distance:18});this._world.addConstraint(_),this._world.addConstraint(u)}g=c,r.push(c)}for(var f,s=3;6>s;s++){var l=a.x+20+60,d=a.y+20+20*(s-1),c=new p2.Body({mass:1,position:[l,d]});if(c.collisionResponse=!1,c.addShape(new p2.Box({width:18,height:5}),[-.4,.6],Math.PI/2),c.displays=[this["img_net_link_"+s]],this._world.addBody(c),f){var u=new p2.RevoluteConstraint(f,c,{localPivotA:[-9,0],localPivotB:[9,0],maxForce:600,collideConnected:!1}),_=new p2.DistanceConstraint(f,c,{distance:18,maxForce:600});this._world.addConstraint(u),this._world.addConstraint(_)}f=c,r.push(c)}this._world.addConstraint(new p2.RevoluteConstraint(this._borderRight1Body,r[3],{localPivotA:[-5,0],localPivotB:[9,-2],maxForce:600,collideConnected:!1})),this._world.addConstraint(new p2.RevoluteConstraint(this._borderLeft1Body,r[0],{localPivotA:[5,0],localPivotB:[9,2],maxForce:600,collideConnected:!1})),this._world.addConstraint(new p2.DistanceConstraint(this._borderLeft1Body,r[0],{distance:9,maxForce:600})),this._world.addConstraint(new p2.DistanceConstraint(this._borderRight1Body,r[3],{distance:9,maxForce:600}));for(var y,m=[],s=0;6>s;s++){var l=a.x+10+20*(s-1),d=a.y-20,c=new p2.Body({mass:1,position:[l,d]});if(c.collisionResponse=!1,c.addShape(new p2.Box({width:20,height:5})),c.displays=[this["img_net_link_"+(6+s)]],this._world.addBody(c),y){var u=new p2.RevoluteConstraint(y,c,{localPivotA:[9,0],localPivotB:[-9,0],collideConnected:!1});this._world.addConstraint(u),this._world.addConstraint(_)}y=c,m.push(c)}this._world.addConstraint(new p2.RevoluteConstraint(n[o-1],m[0],{localPivotA:[-9,0],localPivotB:[-9,0],collideConnected:!1})),this._world.addConstraint(new p2.RevoluteConstraint(i[o-1],m[5],{localPivotA:[-9,0],localPivotB:[9,0],collideConnected:!1}));for(var w,b=[],s=0;6>s;s++){var l=a.x+10+20*(s-1),d=a.y-20,c=new p2.Body({mass:1,position:[l,d]});if(c.collisionResponse=!1,c.addShape(new p2.Box({width:20,height:5})),c.displays=[this["img_net_link_"+(12+s)]],this._world.addBody(c),w){var u=new p2.RevoluteConstraint(w,c,{localPivotA:[9,0],localPivotB:[-9,0],collideConnected:!1});this._world.addConstraint(u),this._world.addConstraint(_)}w=c,b.push(c)}this._world.addConstraint(new p2.RevoluteConstraint(n[o-1],b[0],{localPivotA:[9,0],localPivotB:[-9,0],collideConnected:!1})),this._world.addConstraint(new p2.RevoluteConstraint(i[o-1],b[5],{localPivotA:[9,0],localPivotB:[9,0],collideConnected:!1})),this._ballNetGroup.netLink=r,this._ballNetGroup.netLink2=m,this._ballNetGroup.netLink3=b,this._ballNetGroup.netP_L=n,this._ballNetGroup.netP_R=i},e.prototype.createDebug=function(){this.debugDraw=new p2DebugDraw(this._world);var t=new egret.Sprite;this.addChild(t),this.debugDraw.setSprite(t)},e.prototype.init=function(){this.initWorld()},e.prototype.initWorld=function(){this._ballBoday.status=BallStatus.IDLE},e.prototype.resetView=function(){this.backboardRandomPos(!0)},e.prototype.backboardRandomPos=function(t){var e=this;void 0===t&&(t=!1);var o=this.width/2-this.gp_border_bg.width/2,i=GameModel.ins().totalScore,n=-50,r=this.width-this.gp_border_bg.width+50;if(t)this._randomBorderHeight=GameConst.border_init_h;else{o=n+Math.random()*r;var a=o-this.gp_border_bg.x;Math.abs(a)<50&&(o=a>0?this.gp_border_bg.x+50:this.gp_border_bg.x-50),n>o&&(o=n),o>r&&(o=r),i>=30&&(this._randomBorderHeight=GameConst.border_init_h-50+100*Math.random())}var s=this.height-this._randomBorderHeight;if(egret.Tween.removeTweens(this.gp_border_bg),45>i)egret.Tween.get(this.gp_border_bg,{onChange:function(){e.updateP2backboardPos()}}).to({x:o,y:s},800,egret.Ease.sineOut).call(function(){e.updateP2backboardPos(!0)});else{var l=4e3;egret.Tween.get(this.gp_border_bg,{onChange:function(){e.updateP2backboardPos(!1,!0)}}).to({x:n,y:s},(this.gp_border_bg.x-n)/r*l).call(function(){egret.Tween.get(e.gp_border_bg,{onChange:function(){e.updateP2backboardPos(!1,!0)},loop:!0}).to({x:r},l).call(function(){}).to({x:n},l).call(function(){e.updateP2backboardPos(!0)})})}},e.prototype.updateP2backboardPos=function(t,e){void 0===t&&(t=!1),void 0===e&&(e=!1),t&&(this.gp_border_bg.y=this.height-this._randomBorderHeight);var o=this.img_border.localToGlobal();this.img_border_top.x=o.x,this.img_border_top.y=o.y;var i=this.img_net.localToGlobal();if(this.img_net_top.x=i.x,this.img_net_top.y=i.y,this.gp_coin.visible&&1==this.gp_coin.alpha){egret.Tween.removeTweens(this.gp_coin);var n=o.x+this.img_border.width/2,r=o.y+80;this.gp_coin.x==n&&this.gp_coin.y==r||egret.Tween.get(this.gp_coin).to({x:n,y:r},100)}if(func.displayObjectP2Pos({x:o.x,y:o.y+5},this._borderLeftBody),func.displayObjectP2Pos({x:o.x+this.img_border.width,y:o.y+5},this._borderRightBody),func.displayObjectP2Pos({x:o.x+this.img_border.width/3,y:o.y+5},this._borderLeft1Body),func.displayObjectP2Pos({x:o.x+2*this.img_border.width/3,y:o.y+5},this._borderRight1Body),!e){this._world.step(.06);for(var a=this._world.bodies.length,s=0;a>s;s++){var l=this._world.bodies[s];if(l.displays)for(var d=0,c=l.displays;d<c.length;d++){var h=c[d];func.p2BodyDisplayObjPos(l.position,h),h.rotation=180*l.angle/Math.PI}}}},e.prototype.changeBallDisplayLevel=function(t){void 0===t&&(t=0),this.gp_play.addChildAt(this.gp_ball,t)},e.prototype.onTouchTap=function(t){},e.prototype.onTouchMove=function(t){this._lastTouchMovePos.x=this._touchMovePos.x,this._lastTouchMovePos.y=this._touchMovePos.y,this._touchMovePos.x=t.stageX,this._touchMovePos.y=t.stageY;var e=t.stageY-this._touchBeginPos.y,o=t.stageX-this._touchBeginPos.x,i=egret.getTimer();i-this._touchBeginTime;-60>e?(GameMgr.ins().throwBall(o),this.cleanTouchPos(),this.img_finger.visible=!1,this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this)):func.displayObjectP2Pos({x:this.gp_ball.x,y:t.stageY},this._ballBoday)},e.prototype.onTouchEnd=function(t){this.gp_ball.touchEnabled&&(this._ballBoday.status=BallStatus.IDLE),this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this)},e.prototype.onTouchCancel=function(t){},e.prototype.onTouchBegin=function(t){this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this),this._touchMovePos.x=this._touchBeginPos.x=t.stageX,this._touchMovePos.y=this._touchBeginPos.y=t.stageY,this.touchBeginInit()
},e.prototype.touchBeginInit=function(){this._touchBeginTime=egret.getTimer(),this.cleanTouchPos()},e.prototype.cleanTouchPos=function(){this._lastTouchMovePos.x=this._touchBeginPos.x=this._touchMovePos.x,this._lastTouchMovePos.y=this._touchBeginPos.y=this._touchMovePos.y},e.prototype.update=function(){GameConst.isDebug&&this.debugDraw.drawDebug()},e.prototype.updateCoinNumView=function(){this.lb_coin_num.text=""+GameModel.ins().coinNum},e.prototype.updateThrowInNumView=function(){this.lb_throw_in_num.text=""+GameModel.ins().throwInNum},e.prototype.updateScoreView=function(t){var e=GameModel.ins().totalScore;this.lb_score.text=""+e,e>t?(this.lb_score_add.text="+"+(e-t),egret.Tween.removeTweens(this.lb_score_add),this.lb_score_add.alpha=1,this.lb_score_add.y=250,egret.Tween.get(this.lb_score_add).wait(300).to({y:200,alpha:0},1e3)):this.lb_score_add.text=""},e.prototype.updateBestScoreView=function(){this.lb_best_score.text=""+GameModel.ins().bestScore},e.prototype.updatePerfectNumView=function(){var t=GameModel.ins().perfectNum;t=t>3?3:t,this.lb_perfectNum.text=t>1?"X"+t:""},e.prototype.showCoin=function(){var t=this;if(0==this.gp_coin.visible){this.gp_coin.scaleX=1,this.gp_coin.scaleY=1,this.gp_coin.alpha=0,egret.Tween.removeTweens(this.gp_coin),this.gp_coin.visible=!0,this.gp_coin.x=this.width,this.gp_coin.y=this.height;var e=this.img_border.localToGlobal(),o=e.x+this.img_border.width/2,i=e.y+80;SoundMgr.ins().playSoundEffect("coinpickup_mp3"),egret.Tween.get(this.gp_coin).to({alpha:.99},200).to({scaleX:1.3,scaleY:1.3,x:o,y:i},1e3,egret.Ease.sineOut).call(function(){var e=t.img_border.localToGlobal(),o=e.x+t.img_border.width/2,i=e.y+80;egret.Tween.get(t.gp_coin).to({alpha:1,scaleX:1,scaleY:1,x:o,y:i},400)})}},e.prototype.moveCoin=function(){var t=this,e=EffectMgr.ins().newMovieClip(EffectMgr.RES_EFFECT_COINT);e.play(-1);var o=this.img_border.localToGlobal(),i=o.x+this.img_border.width/2,n=o.y+80;e.x=i,e.y=n,this.addChild(e),egret.Tween.get(e).to({scaleX:1.3,scaleY:1.3,x:(i+40)/2,y:(n+35)/2},600,egret.Ease.sineIn).to({scaleX:1,scaleY:1,x:40,y:35},600,egret.Ease.sineOut).call(function(){t.removeChild(e),Main.ins.mainView.gameView.updateCoinNumView()}),this.hideCoin()},e.prototype.hideCoin=function(){this.gp_coin.visible=!1},e}(BaseView);__reflect(GameView.prototype,"GameView");var BallStatus;!function(t){t[t.IDLE=1]="IDLE",t[t.THROW=2]="THROW",t[t.THROWED_UP=3]="THROWED_UP",t[t.THROWED_DOWN=4]="THROWED_DOWN",t[t.THROWED_IN=5]="THROWED_IN",t[t.THROWED_OUT=6]="THROWED_OUT"}(BallStatus||(BallStatus={}));var BallItem=function(t){function e(e){var o=t.call(this,e)||this;return o._initPos=[0,0],o._status=BallStatus.IDLE,o}return __extends(e,t),Object.defineProperty(e.prototype,"status",{get:function(){return this._status},set:function(t){switch(this._status=t,t){case BallStatus.IDLE:GameModel.ins().borderHitCount=0,this.gravityScale=0,func.displayObjectP2Pos({x:Main.ins.mainView.gameView.width/2,y:Main.ins.mainView.gameView.height-90},this),this.velocity=[0,0],this.angularForce=0,this.angle=0,this.angularVelocity=0,this.setDisplayAttr({scaleX:1,scaleY:1,alpha:1,touchEnabled:!0}),this._initPos[0]=this.position[0],this._initPos[1]=this.position[1],Main.ins.mainView.gameView.changeBallDisplayLevel(31);var e=GameModel.ins().perfectNum;e>1&&e%3==0&&Main.ins.mainView.gameView.showCoin();break;case BallStatus.THROW:SoundMgr.ins().playSoundEffect("throw01_mp3"),this.gravityScale=1,this.status=BallStatus.THROWED_UP,this.setDisplayAttr({touchEnabled:!1});break;case BallStatus.THROWED_UP:break;case BallStatus.THROWED_DOWN:Main.ins.mainView.gameView.changeBallDisplayLevel(0);break;case BallStatus.THROWED_IN:GameModel.ins().throwInNum++;var e=GameModel.ins().perfectNum;if(e>1&&e%3==0&&(GameModel.ins().coinNum++,SoundMgr.ins().playSoundEffect("coinpickup_mp3"),Main.ins.mainView.gameView.moveCoin()),GameModel.ins().borderHitCount>0)SoundMgr.ins().playSoundEffect("net_mp3"),GameModel.ins().totalScore+=2,GameModel.ins().perfectNum=0;else{SoundMgr.ins().playSoundEffect("netdirect_mp3"),GameModel.ins().perfectNum++;var o=GameModel.ins().perfectNum;GameModel.ins().totalScore+=3*(o>3?3:o)}GameMgr.ins().throwBallNet(),this.dealThrowInOrOut();break;case BallStatus.THROWED_OUT:var e=GameModel.ins().perfectNum;e>1&&e%3==0&&Main.ins.mainView.gameView.hideCoin(),SoundMgr.ins().playSoundEffect("awww1_mp3"),this.dealThrowInOrOut(),GameMgr.ins().gameOver()}},enumerable:!0,configurable:!0}),e.prototype.setDisplayAttr=function(t){void 0===t&&(t={});for(var e=0,o=this.displays;e<o.length;e++){var i=o[e];for(var n in t){var r=t[n];null!=i[n]&&(i[n]=r)}}},e.prototype.dealThrowInOrOut=function(){var t=Main.ins.mainView.gameView.height-200-this.position[1];if(-500>=t)this.status=BallStatus.IDLE;else if(100>t){var e=t/100;e>=0&&this.setDisplayAttr({alpha:e})}},e}(p2.Body);__reflect(BallItem.prototype,"BallItem");