/**
 * @name Scroller.js
 * @author William Woodard
 * @desc Class manages viewport scrolling
 *        @class {Scroller}
 *          @constructor({PIXI.Container} stage)
 *          @method setViewportX({Number} viewportX) => {null}
 *          @method getViewportX() => {Number} viewportX
 *          @method moveViewportXBy({Number} units) => {null}
 * @required PIXI.js
 */
class Scroller {
  // No Constants

  /**
   * @constructor Scroller.constructor
   * @param {PIXI.Container} stage Stage container
   * @desc Create Far, Mid, Walls, and MapBuilder objects and
   *         initialize viewport x-coorindate to zero
   * @return {null}
   */
  constructor(stage) {
    this.far = new Far();
    stage.addChild(this.far);

    this.mid = new Mid();
    stage.addChild(this.mid);

    this.front = new Walls();
    stage.addChild(this.front);

    this.mapBuilder = new MapBuilder(this.front);

    this.viewportX = 0;
  }

  /**
   * @method Scroller.setViewportX
   * @param {Number} viewportX X-Coordinate of new viewport
   * @desc Set current viewport for far, mid, and front to new viewport x-coordinate
   * @return {null}
   */
  setViewportX(viewportX) {
    this.viewportX = viewportX;
    this.far.setViewportX(viewportX);
    this.mid.setViewportX(viewportX);
    this.front.setViewportX(viewportX);
  }

  /**
   * @method Scroller.getViewportX
   * @desc Get the current viewport x-coordinate
   * @return {Number} viewportX x-coordinate of current viewport
   */
  getViewportX() {
    return this.viewportX;
  }

  /**
   * @method Scroller.moveViewportXBy
   * @param {Number} units Number of coordinate units to move viewport x-coordinate by
   * @desc Move current viewport x-coordinate by number of units
   * @return {null}
   */
  moveViewportXBy(units) {
    let newViewportX = this.viewportX + units;
    this.setViewportX(newViewportX);
  }
}