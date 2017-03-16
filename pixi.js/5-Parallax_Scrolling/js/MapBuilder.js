/**
 * @name MapBuilder.js
 * @author William Woodard
 * @desc Builds the map for the parallax scroller
 *        @class {WallSlice}
 *          @constant WALL_HEIGHTS
 *          @constructor({Walls} walls)
 *          @method createMap() => {null}
 * @required none
 */
class MapBuilder {
  // Hopefully the ES7 specfication will give us better class implementation
  // Still have to put const/static outside of class, after it it declared (see bottom)

  /**
   * @constructor MapBuilder.constructor
   * @desc Create map of wall slices
   * @return {null}
   */
  constructor(walls) {
    this.walls = walls;
    this.createMap();
  }

  /**
   * @constructor MapBuilder.createMap
   * @desc Create map of wall slices
   * @return {null}
   * @TODO Make infinite and random
   *         Currently has a limited span and is the same SliceType ordering every time
   */
  createMap() {
    this.createWallSpan(3, 9, true);
    this.createGap(1);
    this.createWallSpan(1, 30);
    this.createGap(1);
    this.createWallSpan(2, 18);
    this.createGap(1);
    this.createSteppedWallSpan(2, 5, 28);
    this.createGap(1);
    this.createWallSpan(1, 10);
    this.createGap(1);
    this.createWallSpan(2, 6);
    this.createGap(1);
    this.createWallSpan(1, 8);
    this.createGap(1);
    this.createWallSpan(2, 6);
    this.createGap(1);
    this.createWallSpan(1, 8);
    this.createGap(1)
    this.createWallSpan(2, 7);
    this.createGap(1);
    this.createWallSpan(1, 16);
    this.createGap(1);
    this.createWallSpan(2, 6);
    this.createGap(1);
    this.createWallSpan(1, 22);
    this.createGap(2);
    this.createWallSpan(2, 14);
    this.createGap(2);
    this.createWallSpan(3, 8);
    this.createGap(2);
    this.createSteppedWallSpan(3, 5, 12);
    this.createGap(3);
    this.createWallSpan(0, 8);
    this.createGap(3);
    this.createWallSpan(1, 50);
    this.createGap(20);
  };

  /**
   * @constructor MapBuilder.createGap
   * @param {Number} spanLength Length of gap in x-coordinate units
   * @desc Create gap between wall spans
   * @return {null}
   */
  createGap(spanLength) {
    for (let i = 0; i < spanLength; i++) {
      this.walls.addSlice(SliceType.GAP);
    }
  };

  /**
   * @constructor MapBuilder.createWallSpan
   * @param {Number} heightIndex Index of y-coordinates for wall height
   * @param {Number} spanLength Length of wall span in x-coordinate units
   * @param {Boolean} noFront Boolean if wall span has front edge
   * @param {Boolean} noBack Boolean if wall has no back edge
   * @desc Create wall span
   * @return {null}
   */
  createWallSpan(heightIndex, spanLength, noFront = false, noBack = false) {
    if (noFront == false && spanLength > 0) {
      this.addWallFront(heightIndex);
      spanLength--;
    }

    let midSpanLength = spanLength - ((noBack) ? 0 : 1);
    if (midSpanLength > 0) {
      this.addWallMid(heightIndex, midSpanLength);
      spanLength -= midSpanLength;
    }

    if (noBack == false && spanLength > 0) {
      this.addWallBack(heightIndex);
    }
  };

  /**
   * @constructor MapBuilder.createSteppedWallSpan
   * @param {Number} heightIndex Index of y-coordinates for wall height
   * @param {Number} spanALength Length of wall span before step
   * @param {Number} spanBLength Length of wall span after step
   * @desc Create stepped wall span
   * @return {null}
   */
  createSteppedWallSpan(heightIndex, spanALength, spanBLength) {
    if (heightIndex < 2) {
      heightIndex = 2;
    }

    this.createWallSpan(heightIndex, spanALength, false, true);
    this.addWallStep(heightIndex - 2);
    this.createWallSpan(heightIndex - 2, spanBLength - 1, true, false);
  };

  /**
   * @constructor MapBuilder.addWallFront
   * @param {Number} heightIndex Index of y-coordinates for wall height
   * @desc Add front wall to walls at specified y-coordinate
   * @return {null}
   */
  addWallFront(heightIndex) {
    let y = MapBuilder.WALL_HEIGHTS[heightIndex];
    this.walls.addSlice(SliceType.FRONT, y);
  };

  /**
   * @constructor MapBuilder.addWallBack
   * @param {Number} heightIndex Index of y-coordinates for wall height
   * @desc Add back wall to walls at specified y-coordinate
   * @return {null}
   */
  addWallBack(heightIndex) {
    let y = MapBuilder.WALL_HEIGHTS[heightIndex];
    this.walls.addSlice(SliceType.BACK, y);
  };

  /**
   * @constructor MapBuilder.addWallMid
   * @param {Number} heightIndex Index of y-coordinates for wall height
   * @param {Number} spanLength Length of wall span in x-coordinate units
   * @desc Add mid wall span at specified y-coordinate
   *         alternate between window and decoration
   * @return {null}
   */
  addWallMid(heightIndex, spanLength) {
    let y = MapBuilder.WALL_HEIGHTS[heightIndex];
    for (let i = 0; i < spanLength; i++) {
      if (i % 2 == 0) {
        this.walls.addSlice(SliceType.WINDOW, y);
      } else {
        this.walls.addSlice(SliceType.DECORATION, y);
      }
    }
  };

  /**
   * @constructor MapBuilder.addWallStep
   * @param {Number} heightIndex Index of y-coordinates for wall height
   * @desc Add wall step at specified y-coordinate
   * @return {null}
   */
  addWallStep(heightIndex) {
    let y = MapBuilder.WALL_HEIGHTS[heightIndex];
    this.walls.addSlice(SliceType.STEP, y);
  };
}

// Constants (Why do I still have to do this in ES6? Don't call these classes!)
MapBuilder.WALL_HEIGHTS = [
  256,  // Lowest
  224,
  192,
  160,
  128   // Highest
];