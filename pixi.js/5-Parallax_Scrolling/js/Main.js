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

  this.pool = new WallSpritesPool();
  this.wallSlices = [];
};

Main.prototype.borrowWallSprites = function(num) {
  for (var i = 0; i < num; i++) {
    var sprite = this.pool.borrowWindow();
    sprite.position.set(-32 + (i * 64), 128);

    this.wallSlices.push(sprite);

    this.stage.addChild(sprite);
  }
};

Main.prototype.returnWallSprites = function() {
  for (var i = 0; i < this.wallSlices.length; i++) {
    var sprite = this.wallSlices[i];
    this.stage.removeChild(sprite);
    this.pool.returnWindow(sprite);
  }

  this.wallSlices = [];
};