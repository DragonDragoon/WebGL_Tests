function Mid() {
  var texture = PIXI.Texture.fromImage('images/bg-mid.png');
  PIXI.extras.TilingSprite.call(this, texture, 512, 256);

  this.position.set(0, 128);
  this.tilePosition.set(0, 0);
}

Mid.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Mid.prototype.update = function() {
  this.tilePosition.x -= 0.64;
}