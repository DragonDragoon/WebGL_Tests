/**
 * @name WallSpritesPool.js
 * @author William Woodard
 * @desc Class holds pool data structure for sprite memory allocation
 *        @class {WallSpritesPool}
 *          @constructor()
 *          @method create() => null
 *          @method add({SliceType} type) => null
 *          @method borrow({SliceType} type, {Number} amount, {String} frameID) => {PIXI.Sprite} *
 *          @method return({SliceType} type, {PIXI.Sprite} sprite) => null
 *          @method shuffle({Array} array) => null
 * @required PIXI.js
 */
class WallSpritesPool {
  // Hopefully the ES7 specfication will give us better class implementation
  // Still have to put const/static outside of class, after it it declared (see bottom)

  /**
   * @constructor WallSpritesPool.constructor
   * @desc Create all needed sprites and add them to pool allocation
   * @return null
   */
  constructor() {
    this.create(SliceType.WINDOW);
    this.create(SliceType.DECORATION);
    this.create(SliceType.FRONT);
    this.create(SliceType.BACK);
    this.create(SliceType.STEP);
  }

  /**
   * @method WallSpritesPool.create
   * @param {SliceType} type Enumerator of wall slice type
   * @desc Determine the type of sprite and then
   *         create pool for sprite type
   *         allocate set amount of slice type to pool
   *         shuffle pool
   * @return null
   */
  create(type) {
    switch (type) {
      case SliceType.FRONT:
        this.frontEdges = [];

        this.add(SliceType.FRONT, WallSpritesPool.NUM_FRONT, 'edge_01');
        this.add(SliceType.FRONT, WallSpritesPool.NUM_FRONT, 'edge_02');

        this.shuffle(this.frontEdges);
        break;
      case SliceType.BACK:
        this.backEdges = [];

        this.add(SliceType.BACK, WallSpritesPool.NUM_BACK, 'edge_01');
        this.add(SliceType.BACK, WallSpritesPool.NUM_BACK, 'edge_02');

        this.shuffle(this.backEdges);
        break;
      case SliceType.STEP:
        this.steps = [];
        this.add(SliceType.STEP, WallSpritesPool.NUM_STEP, 'step_01');
        break;
      case SliceType.DECORATION:
        this.decorations = [];

        this.add(SliceType.DECORATION, WallSpritesPool.NUM_DECORATION, 'decoration_01');
        this.add(SliceType.DECORATION, WallSpritesPool.NUM_DECORATION, 'decoration_02');
        this.add(SliceType.DECORATION, WallSpritesPool.NUM_DECORATION, 'decoration_03');

        this.shuffle(this.decorations);
        break;
      case SliceType.WINDOW:
        this.windows = [];

        this.add(SliceType.WINDOW, WallSpritesPool.NUM_WINDOW, 'window_01');
        this.add(SliceType.WINDOW, WallSpritesPool.NUM_WINDOW, 'window_02');

        this.shuffle(this.windows);
        break;
      default:
        console.error("ERROR: WallSpritesPool.create: Invalid SliceType was given");
    }
  }

  /**
   * @method WallSpritesPool.add
   * @param {SliceType} type Enumerator of wall slice type
   * @param {Number} amount Amount of sprites to push
   * @param {String} frameID String ID of sprite (from .json file)
   * @desc Determine the type of sprite and then
   *         for amount of sprites to add,
   *           create sprite from frame ID
   *           push sprite into pool
   * @return null
   */
  add(type, amount, frameID) {
    switch (type) {
      case SliceType.FRONT:
        for (let i = 0; i < amount; i++) {
          let sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(frameID));
          this.frontEdges.push(sprite);
        }
        break;
      case SliceType.BACK:
        for (let i = 0; i < amount; i++) {
          let sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(frameID));
          sprite.anchor.set(1, 0);
          sprite.scale.set(-1, 1);
          this.backEdges.push(sprite);
        }
        break;
      case SliceType.STEP:
        for (let i = 0; i < amount; i++) {
          let sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(frameID));
          sprite.anchor.set(0, 0.25);
          this.steps.push(sprite);
        }
        break;
      case SliceType.DECORATION:
        for (let i = 0; i < amount; i++) {
          let sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(frameID));
          this.decorations.push(sprite);
        }
        break;
      case SliceType.WINDOW:
        for (let i = 0; i < amount; i++) {
          let sprite = PIXI.Sprite.fromFrame(frameID);
          this.windows.push(sprite);
        }
        break;
      default:
        console.error("ERROR: WallSpritesPool.add: Invalid SliceType was given");
    }
  }

  /**
   * @method WallSpritesPool.borrow
   * @param {SliceType} type Enumerator of wall slice type
   * @desc Determine the type of sprite and then
   *         remove sprite from pool and return it
   * @return {PIXI.Sprite} Sprite borrowed from pool
   */
  borrow(type) {
    switch (type) {
      case SliceType.FRONT:
        return this.frontEdges.shift();
        break;
      case SliceType.BACK:
        return this.backEdges.shift();
        break;
      case SliceType.STEP:
        return this.steps.shift();
        break;
      case SliceType.DECORATION:
        return this.decorations.shift();
        break;
      case SliceType.WINDOW:
        return this.windows.shift();
        break;
      default:
        console.error("ERROR: WallSpritesPool.borrow: Invalid SliceType was given");
    }
  }

  /**
   * @method WallSpritesPool.return
   * @param {SliceType} type Enumerator of wall slice type
   * @param {PIXI.Sprite} sprite Sprite to return to pool
   * @desc Determine the type of sprite and then
   *         push sprite into pool
   * @return null
   */
  return(type, sprite) {
    switch (type) {
      case SliceType.FRONT:
        this.frontEdges.push(sprite);
        break;
      case SliceType.BACK:
        this.backEdges.push(sprite);
        break;
      case SliceType.STEP:
        this.steps.push(sprite);
        break;
      case SliceType.DECORATION:
        this.decorations.push(sprite);
        break;
      case SliceType.WINDOW:
        this.windows.push(sprite);
        break;
      default:
        console.error("ERROR: WallSpritesPool.return: Invalid SliceType was given");
    }
  }

  /**
   * @method WallSpritesPool.shuffle
   * @param {Array} array Pool of sprites
   * @desc Shuffle array of sprites for randomness
   *       Destroys array integrity
   * @return null
   */
  shuffle(array) {
    let len = array.length;
    let shuffles = len * 3;
    for (let i = 0; i < shuffles; i++) {
      let wallSlice = array.pop();
      let pos = Math.floor(Math.random() * (len - 1));
      array.splice(pos, 0, wallSlice);
    }
  }
}

// Constants (Why do I still have to do this in ES6? Don't call these classes!)
WallSpritesPool.NUM_FRONT = 2;
WallSpritesPool.NUM_BACK = 2;
WallSpritesPool.NUM_STEP = 2;
WallSpritesPool.NUM_DECORATION = 6;
WallSpritesPool.NUM_WINDOW = 6;