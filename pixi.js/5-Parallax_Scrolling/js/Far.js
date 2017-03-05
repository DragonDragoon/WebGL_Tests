function Far() {
  var texture = PIXI.Texture.fromImage('images/bg-far.png');
  PIXI.extras.TilingSprite.call(this, texture, 512, 256);

  this.position.set(0, 0);
  this.tilePosition.set(0, 0);
}

Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Far.prototype.update = function() {
  this.tilePosition.x -= 0.128;
}