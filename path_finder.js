function PathFinder(x, y, n) {
  this.n = n;
  this.table = new Array(n);

  for (var i = this.table.length - 1; i >= 0; i--) {
    this.table[i] = (new Array(n)).fill().map(u => [999, -1, -1]);
  }

  this.generateTable(x, y);
}

PathFinder.prototype.pathTo = function(x, y) {
  let path = [[x, y]];
  let distance;
  [distance, x, y] = this.table[x][y];

  while (distance > 0) {
    path.push([x, y]);
    [distance, x, y] = this.table[x][y];
  }

  return path.reverse();
}

PathFinder.prototype.generateTable = function(x, y) {
  this.table[x][y] = [0, x, y];
  this.branchFrom([], x, y);
}

PathFinder.prototype.outOfBounds = function(x, y) {
  return (x > (this.n - 1) || x < 0) || (y > (this.n - 1) || y < 0);
}

PathFinder.prototype.branchFrom = function(path, x, y) {
  let newPath = path.concat([[x,y]])

  this.findPathsFrom(newPath, x+2, y+1)
  this.findPathsFrom(newPath, x+1, y+2)

  this.findPathsFrom(newPath, x+2, y-1)
  this.findPathsFrom(newPath, x+1, y-2)

  this.findPathsFrom(newPath, x-2, y+1)
  this.findPathsFrom(newPath, x-1, y+2)

  this.findPathsFrom(newPath, x-2, y-1)
  this.findPathsFrom(newPath, x-1, y-2)
}

PathFinder.prototype.findPathsFrom = function(path, x, y) {
  if (this.outOfBounds(x,y)) return;

  let distance = this.table[x][y][0];

  if (path.length >= distance) return;

  let last = path[path.length - 1];
  this.table[x][y] = [path.length, last[0], last[1]];

  this.branchFrom(path, x, y);
}
