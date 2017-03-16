class Mid extends PIXI.extras.TilingSprite {
  constructor() {
    let texture = PIXI.Texture.fromImage('res/bg-mid.png');
    
    super(texture, 512, 256);

    this.position.set(0, 128);
    this.tilePosition.set(0, 0);

    this.viewportX = 0;
  }

  setViewportX(newViewportX) {
    let distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * Mid.DELTA_X);
  }
}

Mid.DELTA_X = 0.32;