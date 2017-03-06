function Main() {
  this.container = document.querySelector('#container');
  this.stage = new PIXI.Container();
  this.renderer = PIXI.autoDetectRenderer(
    this.container.width, this.container.height, {
      view: this.container
    }
  );

  this.loadSpriteSheet();
}

Main.SCROLL_SPEED = 5;

Main.prototype.update = function() {
  this.scroller.moveViewportXBy(Main.SCROLL_SPEED);
  this.renderer.render(this.stage);
  requestAnimationFrame(this.update.bind(this));
};

Main.prototype.loadSpriteSheet = function() {
  var loader = PIXI.loader;
  loader.add('wall', 'res/wall.json');
  loader.add('bg-mid', 'res/bg-mid.png');
  loader.add('bg-far', 'res/bg-far.png');
  loader.once('complete', this.spriteSheetLoaded.bind(this));
  loader.load();
};

Main.prototype.spriteSheetLoaded = function() {
  this.scroller = new Scroller(this.stage);

  requestAnimationFrame(this.update.bind(this));

  var slice1 = PIXI.Sprite.fromFrame('edge_01');
  slice1.position.set(32, 64);
  this.stage.addChild(slice1);

  var slice2 = PIXI.Sprite.fromFrame('decoration_03');
  slice2.position.set(128, 64);
  this.stage.addChild(slice2);
};