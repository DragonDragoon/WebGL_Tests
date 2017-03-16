function Walls() {
  PIXI.Container.call(this);

  this.pool = new WallSpritesPool();
  //this.createLookupTables();

  this.slices = [];

  this.viewportX = 0;
  this.viewportSliceX = 0;
}

Walls.prototype = Object.create(PIXI.Container.prototype);

Walls.VIEWPORT_WIDTH = 512;
Walls.VIEWPORT_NUM_SLICES = Math.ceil(Walls.VIEWPORT_WIDTH/WallSlice.WIDTH) + 1;

Walls.prototype.setViewportX = function(viewportX) {
  this.viewportX = this.checkViewportXBounds(viewportX);

  var prevViewportSliceX = this.viewportSliceX;
  this.viewportSliceX = Math.floor(this.viewportX / WallSlice.WIDTH);

  this.removeOldSlices(prevViewportSliceX);
  this.addNewSlices();
};

Walls.prototype.addSlice = function(sliceType, y) {
  var slice = new WallSlice(sliceType, y);
  this.slices.push(slice);
};

Walls.prototype.checkViewportXBounds = function(viewportX) {
  var maxViewportX = (this.slices.length - Walls.VIEWPORT_NUM_SLICES) * WallSlice.WIDTH;

  if (viewportX < 0) {
    viewportX = 0;
  } else if (viewportX > maxViewportX) {
    viewportX = maxViewportX;
  }

  return viewportX;
};

Walls.prototype.removeOldSlices = function(prevViewportSliceX) {
  var numOldSlices = this.viewportSliceX - prevViewportSliceX;
  if (numOldSlices > Walls.VIEWPORT_NUM_SLICES) {
    numOldSlices = Walls.VIEWPORT_NUM_SLICES;
  }

  for (var i = prevViewportSliceX; i < prevViewportSliceX + numOldSlices; i++) {
    var slice = this.slices[i];
    if(slice.sprite != null) {
      this.pool.return(slice.type, slice.sprite);
      this.removeChild(slice.sprite);
      slice.sprite = null;
    }
  }
};

Walls.prototype.addNewSlices = function() {
  var firstX = -(this.viewportX % WallSlice.WIDTH);
  for (var i = this.viewportSliceX, sliceIndex = 0; i < this.viewportSliceX + Walls.VIEWPORT_NUM_SLICES; i++, sliceIndex++) {
    var slice = this.slices[i];
    if (slice.sprite == null && slice.type != SliceType.GAP) {
      slice.sprite = this.pool.borrow(slice.type);

      slice.sprite.position.set(firstX + (sliceIndex * WallSlice.WIDTH), slice.y);

      this.addChild(slice.sprite);
    } else if (slice.sprite != null) {
      slice.sprite.position.set(firstX + (sliceIndex * WallSlice.WIDTH), slice.sprite.position.y);
    }
  }
};