class Walls extends PIXI.Container {
  constructor() {
    super();

    this.pool = new WallSpritesPool();

    this.slices = [];

    this.viewportX = 0;
    this.viewportSliceX = 0;
  }

  setViewportX(viewportX) {
    this.viewportX = this.checkViewportXBounds(viewportX);

    let prevViewportSliceX = this.viewportSliceX;
    this.viewportSliceX = Math.floor(this.viewportX / WallSlice.WIDTH);

    this.removeOldSlices(prevViewportSliceX);
    this.addNewSlices();
  }

  addSlice(sliceType, y) {
    let slice = new WallSlice(sliceType, y);
    this.slices.push(slice);
  }

  checkViewportXBounds(viewportX) {
    let maxViewportX = (this.slices.length - Walls.VIEWPORT_NUM_SLICES) * WallSlice.WIDTH;

    if (viewportX < 0) {
      viewportX = 0;
    } else if (viewportX > maxViewportX) {
      viewportX = maxViewportX;
    }

    return viewportX;
  }

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

Walls.VIEWPORT_WIDTH = 512;
Walls.VIEWPORT_NUM_SLICES = Math.ceil(Walls.VIEWPORT_WIDTH / WallSlice.WIDTH) + 1;