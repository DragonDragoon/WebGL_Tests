class WallSpritesPool {
  constructor() {
    this.create(SliceType.WINDOW);
    this.create(SliceType.DECORATION);
    this.create(SliceType.FRONT);
    this.create(SliceType.BACK);
    this.create(SliceType.STEP);
  }

  create(type) {
    switch (type) {
      case SliceType.FRONT:
        this.frontEdges = [];

        this.add(SliceType.FRONT, 2, 'edge_01');
        this.add(SliceType.FRONT, 2, 'edge_02');

        this.shuffle(this.frontEdges);
        break;
      case SliceType.BACK:
        this.backEdges = [];

        this.add(SliceType.BACK, 2, 'edge_01');
        this.add(SliceType.BACK, 2, 'edge_02');

        this.shuffle(this.backEdges);
        break;
      case SliceType.STEP:
        this.steps = [];
        this.add(SliceType.STEP, 2, 'step_01');
        break;
      case SliceType.DECORATION:
        this.decorations = [];

        this.add(SliceType.DECORATION, 6, 'decoration_01');
        this.add(SliceType.DECORATION, 6, 'decoration_02');
        this.add(SliceType.DECORATION, 6, 'decoration_03');

        this.shuffle(this.decorations);
        break;
      case SliceType.WINDOW:
        this.windows = [];

        this.add(SliceType.WINDOW, 6, 'window_01');
        this.add(SliceType.WINDOW, 6, 'window_02');

        this.shuffle(this.windows);
        break;
      default:
        console.error("ERROR: WallSpritesPool.create: Invalid SliceType was given");
    }
  }

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