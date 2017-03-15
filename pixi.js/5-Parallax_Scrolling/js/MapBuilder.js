function MapBuilder(walls) {
  this.walls = walls;
  this.createMap();
}

MapBuilder.WALL_HEIGHTS = [
  256,  // Lowest
  224,
  192,
  160,
  128   // Highest
];

MapBuilder.prototype.createMap = function() {
  
};