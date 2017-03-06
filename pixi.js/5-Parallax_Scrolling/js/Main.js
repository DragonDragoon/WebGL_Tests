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
    var sprite;

    if (i % 2 == 0) {
      sprite = this.pool.borrowWindow();
    } else {
      sprite = this.pool.borrowDecoration();
    }

    sprite.position.set(-32 + (i * 64), 128);

    this.wallSlices.push(sprite);

    this.stage.addChild(sprite);
  }
};

Main.prototype.returnWallSprites = function() {
  for (var i = 0; i < this.wallSlices.length; i++) {
    var sprite = this.wallSlices[i];
    this.stage.removeChild(sprite);
    
    if (i % 2 == 0) {
      this.pool.returnWindow(sprite);
    } else {
      this.pool.returnDecoration(sprite);
    }
  }

  this.wallSlices = [];
};

Main.prototype.generateTestWallSpan = function() {
  var lookupTable = [
    this.pool.borrowFrontEdge,  // 1st Slice
    this.pool.borrowWindow,     // 2nd Slice
    this.pool.borrowDecoration, // 3rd Slice
    this.pool.borrowWindow,     // 4th Slice
    this.pool.borrowDecoration, // 5th Slice
    this.pool.borrowWindow,     // 6th Slice
    this.pool.borrowBackEdge    // 7th Slice
  ];

  for (var i = 0; i < lookupTable.length; i++) {
    var func = lookupTable[i];
    
    var sprite = func.call(this.pool);
    sprite.position.set(32 + (i * 64), 128);

    this.wallSlices.push(sprite);

    this.stage.addChild(sprite);
  }
};

Main.prototype.clearTestWallSpan = function() {
  var lookupTable = [
    this.pool.borrowFrontEdge,  // 1st Slice
    this.pool.borrowWindow,     // 2nd Slice
    this.pool.borrowDecoration, // 3rd Slice
    this.pool.borrowWindow,     // 4th Slice
    this.pool.borrowDecoration, // 5th Slice
    this.pool.borrowWindow,     // 6th Slice
    this.pool.borrowBackEdge    // 7th Slice
  ];

  for (var i = 0; i < lookupTable.length; i++) {
    var func = lookupTable[i];
    var sprite = this.wallSlices[i];

    this.stage.removeChild(sprite);

    func.call(this.pool, sprite);
  }

  this.wallSlices = [];
};