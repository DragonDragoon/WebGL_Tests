/**
 * @name Walls.js
 * @author William Woodard
 * @desc Class manages wall slices in front parallax scroller
 *        @class {Walls}
 *        @extends {PIXI.Container}
 *          @constant VIEWPORT_WIDTH, VIEWPORT_NUM_SLICES
 *          @constructor()
 *          @method setViewportX({Number} viewportX) => {null}
 *          @method addSlice({SliceType} sliceType, {Number} y) => {null}
 *          @method checkViewportXBounds({Number} viewportX) => {Number} viewportX
 *          @method removeOldSlices({Number} prevViewportSliceX) => {null}
 *          @method addNewSlices() => {null}
 * @required PIXI.js
 */
class Walls extends PIXI.Container {
  // Hopefully the ES7 specfication will give us better class implementation
  // Still have to put const/static outside of class, after it it declared (see bottom)

  /**
   * @constructor Walls.constructor
   * @desc Create wall pool sprites and 
   *         initialize wall slices array
   *         initialize viewport and slice viewport x-coordinates to zero
   * @return {null}
   */
  constructor() {
    super();

    this.pool = new WallSpritesPool();

    this.slices = [];

    this.viewportX = 0;
    this.viewportSliceX = 0;
  }

  /**
   * @method Walls.setViewportX
   * @param {Number} viewportX x-coordinate of new viewport
   * @desc Set current viewport for far, mid, and front to new viewport x-coordinate
   *         remove old slices from viewport
   *         add new slices to viewport
   * @return {null}
   */
  setViewportX(viewportX) {
    this.viewportX = this.checkViewportXBounds(viewportX);

    let prevViewportSliceX = this.viewportSliceX;
    this.viewportSliceX = Math.floor(this.viewportX / WallSlice.WIDTH);

    this.removeOldSlices(prevViewportSliceX);
    this.addNewSlices();
  }

  /**
   * @method Walls.addSlice
   * @param {SliceType} sliceType Enumerator of wall slice type
   * @param {Number} y-coordinate of slice
   * @desc Create new wall slice with y coordinate and push to slices array
   * @return {null}
   */
  addSlice(sliceType, y) {
    let slice = new WallSlice(sliceType, y);
    this.slices.push(slice);
  }

  /**
   * @method Walls.checkViewportXBounds
   * @param {Number} viewportX x-coordinate of new viewport
   * @desc Check viewport length and bounds
   *         make sure it is not out of bounds (less than zero)
   * @return {Number} viewportX
   */
  checkViewportXBounds(viewportX) {
    let maxViewportX = (this.slices.length - Walls.VIEWPORT_NUM_SLICES) * WallSlice.WIDTH;

    if (viewportX < 0) {
      viewportX = 0;
    } else if (viewportX > maxViewportX) {
      viewportX = maxViewportX;
    }

    return viewportX;
  }

  /**
   * @method Walls.checkViewportXBounds
   * @param {Number} prevViewportSliceX x-coordinate of previous viewport slice
   * @desc Set number of old slices bound to number of slices set and
   *         return old slice to pool and
   *         remove old slices not needed anymore for parallax
   * @return {null}
   */
  removeOldSlices(prevViewportSliceX) {
    let numOldSlices = this.viewportSliceX - prevViewportSliceX;
    if (numOldSlices > Walls.VIEWPORT_NUM_SLICES) {
      numOldSlices = Walls.VIEWPORT_NUM_SLICES;
    }

    for (let i = prevViewportSliceX; i < prevViewportSliceX + numOldSlices; i++) {
      let slice = this.slices[i];
      if (slice.sprite != null) {
        this.pool.return(slice.type, slice.sprite);
        this.removeChild(slice.sprite);
        slice.sprite = null;
      }
    }
  }

  /**
   * @method Walls.addNewSlices
   * @desc Add new slices when needed to pool for parallax as old ones are removed
   * @return {null}
   */
  addNewSlices() {
    let firstX = -(this.viewportX % WallSlice.WIDTH);
    for (let i = this.viewportSliceX, sliceIndex = 0; i < this.viewportSliceX + Walls.VIEWPORT_NUM_SLICES; i++ , sliceIndex++) {
      let slice = this.slices[i];
      if (slice.sprite == null && slice.type != SliceType.GAP) {
        slice.sprite = this.pool.borrow(slice.type);

        slice.sprite.position.set(firstX + (sliceIndex * WallSlice.WIDTH), slice.y);

        this.addChild(slice.sprite);
      } else if (slice.sprite != null) {
        slice.sprite.position.set(firstX + (sliceIndex * WallSlice.WIDTH), slice.sprite.position.y);
      }
    }
  }
}

// Constants (Why do I still have to do this in ES6? Don't call these classes!)
Walls.VIEWPORT_WIDTH = 512;
Walls.VIEWPORT_NUM_SLICES = Math.ceil(Walls.VIEWPORT_WIDTH / WallSlice.WIDTH) + 1;