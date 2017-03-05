function Main() {
  this.container = document.querySelector('#container');
  this.stage = new PIXI.Container();
  this.renderer = PIXI.autoDetectRenderer(
    this.container.width, this.container.height, {
      view: this.container
    }
  );

  this.scroller = new Scroller(this.stage);

  requestAnimationFrame(this.update.bind(this));
}

Main.SCROLL_SPEED = 5;

Main.prototype.update = function() {
  this.scroller.moveViewportXBy(Main.SCROLL_SPEED);
  this.renderer.render(this.stage);
  requestAnimationFrame(this.update.bind(this));
};