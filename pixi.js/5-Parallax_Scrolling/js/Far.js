class Far extends PIXI.extras.TilingSprite {
  constructor() {
    let texture = PIXI.Texture.fromImage('res/bg-far.png');
    
    super(texture, 512, 256);

    this.position.set(0, 0);
    this.tilePosition.set(0, 0);

    this.viewportX = 0;
  }

  setViewportX(newViewportX) {
    let distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * Far.DELTA_X);
  }
}

Far.DELTA_X = 0.064;