/**
 * @name Mid.js
 * @author William Woodard
 * @desc Class manages mid range parallax sprite
 *        @class {Mid}
 *        @extends {PIXI.extras.TilingSprite}
 *          @constructor()
 *          @method setViewportX({Number} newViewportX) => null
 * @required PIXI.js
 */
class Mid extends PIXI.extras.TilingSprite {
  // Hopefully the ES7 specfication will give us better class implementation
  // Still have to put const/static outside of class, after it it declared (see bottom)

  /**
   * @constructor Mid.constructor
   * @desc Create sprite from texture image and 
   *         set default position and tile position
   *         initialize viewportX position to 0
   * @return null
   */
  constructor() {
    let texture = PIXI.Texture.fromImage('res/bg-mid.png');
    
    super(texture, 512, 256);

    this.position.set(0, 128);
    this.tilePosition.set(0, 0);

    this.viewportX = 0;
  }

  /**
   * @method Mid.setViewportX
   * @param {Number} newViewportX X-Coordinate of new viewport
   * @desc Set current viewport to new viewport x-coordinate
   * @return null
   */
  setViewportX(newViewportX) {
    let distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * Mid.DELTA_X);
  }
}

// Constants (Why do I still have to do this in ES6? Don't call these classes!)
Mid.DELTA_X = 0.32;