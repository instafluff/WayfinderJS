function findTheWay( grid, gridWidth, gridHeight, x, y, gX, gY, paths = [], travelDist = 0, discoveredMinDist = 999999 ) {
  // console.log( x, y, travelDist );
  if( travelDist > discoveredMinDist ) {
    return null;
  }
  // console.log( x, y, grid );
  if( x === gX && y === gY ) {
    return paths.concat( { x, y } );
  }
  if( x < 0 || x >= gridWidth ||
      y < 0 || y >= gridHeight ) {
    return null;
  }
  if( grid[ y * gridWidth + x ] > 0 ) {
    return null;
  }
  var gridCopy = grid.slice();
  gridCopy[ y * gridWidth + x ] = 2;
  // // North, East, South, West
  // var north = findTheWay( gridCopy, gridWidth, gridHeight, x, y - 1, gX, gY, paths.concat( { x, y } ) );
  // var east = findTheWay( gridCopy, gridWidth, gridHeight, x + 1, y, gX, gY, paths.concat( { x, y } ) );
  // var south = findTheWay( gridCopy, gridWidth, gridHeight, x, y + 1, gX, gY, paths.concat( { x, y } ) );
  // var west = findTheWay( gridCopy, gridWidth, gridHeight, x - 1, y, gX, gY, paths.concat( { x, y } ) );
  //
  // // Figure out minimum valid path length
  // var minPath = north;
  // if( east ) {
  //   if( !minPath ) { minPath = east; }
  //   else if( east.length < minPath.length ) {
  //     minPath = east;
  //   }
  // }
  // if( south ) {
  //   if( !minPath ) { minPath = south; }
  //   else if( south.length < minPath.length ) {
  //     minPath = south;
  //   }
  // }
  // if( west ) {
  //   if( !minPath ) { minPath = west; }
  //   else if( west.length < minPath.length ) {
  //     minPath = west;
  //   }
  // }
  // return minPath;

  // OPTIMIZED VERSION!
  // North, East, South, West
  var north = findTheWay( gridCopy, gridWidth, gridHeight, x, y - 1, gX, gY, paths.concat( { x, y } ), travelDist + 1, discoveredMinDist );
  if( north && north.length < discoveredMinDist ) { discoveredMinDist = north.length; }
  var east = findTheWay( gridCopy, gridWidth, gridHeight, x + 1, y, gX, gY, paths.concat( { x, y } ), travelDist + 1, discoveredMinDist );
  if( east && east.length < discoveredMinDist ) { discoveredMinDist = east.length; }
  var south = findTheWay( gridCopy, gridWidth, gridHeight, x, y + 1, gX, gY, paths.concat( { x, y } ), travelDist + 1, discoveredMinDist );
  if( south && south.length < discoveredMinDist ) { discoveredMinDist = south.length; }
  var west = findTheWay( gridCopy, gridWidth, gridHeight, x - 1, y, gX, gY, paths.concat( { x, y } ), travelDist + 1, discoveredMinDist );

  // Figure out minimum valid path length
  var minPath = north;
  if( east ) {
    if( !minPath ) { minPath = east; }
    else if( east.length < minPath.length ) {
      minPath = east;
    }
  }
  if( south ) {
    if( !minPath ) { minPath = south; }
    else if( south.length < minPath.length ) {
      minPath = south;
    }
  }
  if( west ) {
    if( !minPath ) { minPath = west; }
    else if( west.length < minPath.length ) {
      minPath = west;
    }
  }
  return minPath;
}

var testMaze = [
  1, 1, 1, 1, 1, 1, 1,
  1, 0, 1, 0, 0, 0, 1,
  1, 0, 0, 0, 1, 0, 1,
  1, 0, 1, 1, 1, 0, 1,
  1, 0, 0, 1, 1, 0, 1,
  1, 1, 1, 1, 1, 1, 1,
];

// var testMaze = [
//   1, 1, 1, 1, 1, 1, 1,
//   1, 0, 0, 0, 0, 0, 1,
//   1, 0, 0, 0, 0, 0, 1,
//   1, 0, 0, 0, 0, 0, 1,
//   1, 0, 0, 0, 0, 0, 1,
//   1, 1, 1, 1, 1, 1, 1,
// ];

// var startX = 1, startY = 1;
// var goalX = 5, goalY = 4;

var startX = 3, startY = 2;
var goalX = 2, goalY = 4;

var path = findTheWay( testMaze, 7, 6, startX, startY, goalX, goalY );
console.log( path );
