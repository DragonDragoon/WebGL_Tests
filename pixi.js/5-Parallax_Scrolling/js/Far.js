function Far(texture, width, height) {
  PIXI.extras.TilingSprite.call(this, texture, width, height);

  this.position.set(0, 0);
  this.tilePosition.set(0, 0);
}

Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);