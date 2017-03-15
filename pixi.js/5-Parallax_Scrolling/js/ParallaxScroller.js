/**
 * @class ParallaxScroller
 * @author William Woodard
 * @desc Main class object for scroller
 *        @class ParallaxScroller
 *          @constant MIN_SCROLL_SPEED, MAX_SCROLL_SPEED, SCROLL_ACCELERATION
 *          @constructor
 *          @method update() => null
 *          @method loadSpriteSheet() => null
 *          @method spriteSheetLoaded() => null
 *          @method borrowWallSprites(num) => null
 *          @method returnWallSprites() => null
 * @required PIXI.js
 */
class ParallaxScroller {
  // Hopefully the ES7 specfication will give us better class implementation
  // Still have to put const/static outside of class, after it it declared (see bottom)

  /**
   * @constructor ParallaxScroller.constructor
   * @desc Initialize 
   *         PIXI stage, renderer, scrollspeed, and load sprites
   * @return null
   */
  constructor() {
    this.container = document.querySelector('#container');
    this.stage = new PIXI.Container();
    // PIXI.autoDetectRenderer(<Canvas Width>, <Canvas Height>, {<Options>})
    this.renderer = PIXI.autoDetectRenderer(
      this.container.width, this.container.height, {
        view: this.container
      }
    );
    
    this.scrollSpeed = ParallaxScroller.MIN_SCROLL_SPEED;

    this.loadSpriteSheet();
  }

  // Methods

  /**
   * @method ParallaxScroller.update
   * @desc Recursively 
   *         move viewport by current scrolling speed
   *         incremement scrolling speed by acceleration
   *         update PIXI Renderer on requestAnimationFrame
   * @return null
   */
  update() {
    this.scroller.moveViewportXBy(this.scrollSpeed);

    this.scrollSpeed += ParallaxScroller.SCROLL_ACCELERATION;
    if (this.scrollSpeed > ParallaxScroller.MAX_SCROLL_SPEED) {
      this.scrollSpeed = ParallaxScroller.MAX_SCROLL_SPEED;
    }

    this.renderer.render(this.stage);
    requestAnimationFrame(() => this.update());
  };

  /**
   * @method ParallaxScroller.loadSpriteSheet
   * @desc Add sprites to PIXI loader
   *       Run ParallaxScroller.spriteSheetLoaded when loading completes
   * @return null
   */
  loadSpriteSheet() {
    let loader = PIXI.loader;
    loader.add('wall', 'res/wall.json');
    loader.add('bg-mid', 'res/bg-mid.png');
    loader.add('bg-far', 'res/bg-far.png');
    loader.once('complete', () => this.spriteSheetLoaded());
    loader.load();
  };

  /**
   * @method ParallaxScroller.loadSpriteSheet
   * @desc Now that loading has completed,
   *         initialize scroller
   *         update first frame
   * @return null
   */
  spriteSheetLoaded() {
    this.scroller = new Scroller(this.stage);

    requestAnimationFrame(() => this.update());
  };

  /**
   * @method ParallaxScroller.loadSpriteSheet
   * @param {Number} num Number of wall sprites to borrow from pool
   * @desc Borrow window and decoration sprites from sprite pool, and
   *         set their position
   *         push them to the active wall slices
   *         add them to stage
   * @return null
   */
  borrowWallSprites(num) {
    for (let i = 0; i < num; i++) {
      let sprite; 

      if (i % 2 == 0) {
        sprite = this.pool.borrowWindow();
      } else {
        sprite = this.pool.borrowDecoration();
      }

      // Sprite.position.set(<x coordinate>, <y coordinate>)
      sprite.position.set(-32 + (i * 64), 128);

      this.wallSlices.push(sprite);

      this.stage.addChild(sprite);
    }
  };

  /**
   * @method ParallaxScroller.returnWallSprites
   * @desc Return window and decoration sprites from pool, and
   *         remove sprites from stage
   *         clear active wall slices
   * @return null
   */
  returnWallSprites() {
    for (let i = 0; i < this.wallSlices.length; i++) {
      let sprite = this.wallSlices[i];
      this.stage.removeChild(sprite);

      if (i % 2 == 0) {
        this.pool.returnWindow(sprite);
      } else {
        this.pool.returnDecoration(sprite);
      }
    }

    this.wallSlices = [];
  };
}

// Constants (Why do I still have to do this in ES6? Don't call these classes!)
ParallaxScroller.MIN_SCROLL_SPEED = 5;
ParallaxScroller.MAX_SCROLL_SPEED = 15;
ParallaxScroller.SCROLL_ACCELERATION = 0.005;