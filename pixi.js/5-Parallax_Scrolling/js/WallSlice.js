/**
 * @name WallSlice.js
 * @author William Woodard
 * @desc Data structure class to hold wall slice information
 *        @class {WallSlice}
 *          @constant WIDTH
 *          @constructor()
 * @required none
 */
class WallSlice {
  // Hopefully the ES7 specfication will give us better class implementation
  // Still have to put const/static outside of class, after it it declared (see bottom)

  /**
   * @constructor WallSlice.constructor
   * @desc Create wall slice data structure for type, y-coordinate, and sprite
   * @return {null}
   */
  constructor(type, y) {
    this.type = type;
    this.y = y;
    this.sprite = null;
  }
}

// Constants (Why do I still have to do this in ES6? Don't call these classes!)
WallSlice.WIDTH = 64;