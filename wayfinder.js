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
  // North, East, South, West
  var north = findTheWay( gridCopy, gridWidth, gridHeight, x, y - 1, gX, gY, paths.concat( { x, y } ) );
  var east = findTheWay( gridCopy, gridWidth, gridHeight, x + 1, y, gX, gY, paths.concat( { x, y } ) );
  var south = findTheWay( gridCopy, gridWidth, gridHeight, x, y + 1, gX, gY, paths.concat( { x, y } ) );
  var west = findTheWay( gridCopy, gridWidth, gridHeight, x - 1, y, gX, gY, paths.concat( { x, y } ) );
  
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

function findTheWayOptimized( grid, gridWidth, gridHeight, x, y, gX, gY, paths = [], travelDist = 0, discoveredMinDist = 999999 ) {
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

function calcScore( x, y, gX, gY ) {
  return Math.abs( gX - x ) + Math.abs( gY - y );
}

function findTheWayAStar( grid, gridWidth, gridHeight, x, y, gX, gY ) {
  if( x === gX && y === gY ) {
    return [ { x, y } ];
  }
  if( x < 0 || x >= gridWidth ||
      y < 0 || y >= gridHeight ) {
    return null;
  }
  if( grid[ y * gridWidth + x ] > 0 ) {
    return null;
  }

  var next = [ { x, y, score: calcScore( x, y, gX, gY ), path: [] } ];
  var gridCopy = grid.slice();
  while( next.length > 0 ) {
    // Check the top item and evaluate
    var p = next.shift();
    if( p.x === gX && p.y === gY ) {
      return p.path.concat( { x: p.x, y: p.y } );
    }
    if( p.x < 0 || p.x >= gridWidth ||
        p.y < 0 || p.y >= gridHeight ) {
      // Skip!
    }
    else if( gridCopy[ p.y * gridWidth + p.x ] > 0 ) {
      // Wall!
    }
    else {
      gridCopy[ p.y * gridWidth + p.x ] = 2;
      var path = p.path.concat( { x: p.x, y: p.y } );
      next.push( { x: p.x, y: p.y - 1, score: calcScore( p.x, p.y - 1, gX, gY ), path: path } );
      next.push( { x: p.x + 1, y: p.y, score: calcScore( p.x + 1, p.y, gX, gY ), path: path } );
      next.push( { x: p.x, y: p.y + 1, score: calcScore( p.x, p.y + 1, gX, gY ), path: path } );
      next.push( { x: p.x - 1, y: p.y, score: calcScore( p.x - 1, p.y, gX, gY ), path: path } );
      // Sort next paths
      next.sort( (a, b) => calcScore( a.x, a.y, gX, gY ) - calcScore( b.x, b.y, gX, gY ) );
    }
  }
  return null;
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

var hrstart, hrend;
function timerStart() {
  hrstart = process.hrtime();
}
function timerEnd( name = "Timer" ) {
  hrend = process.hrtime( hrstart );
  console.info( name + ' (hr): %ds %dms', hrend[0], hrend[1] / 1000000 );
}

timerStart();
var path = findTheWay( testMaze, 7, 6, startX, startY, goalX, goalY );
timerEnd( "Normal" );
console.log( path );

timerStart();
path = findTheWayOptimized( testMaze, 7, 6, startX, startY, goalX, goalY );
timerEnd( "Optimized" );
console.log( path );

timerStart();
path = findTheWayAStar( testMaze, 7, 6, startX, startY, goalX, goalY );
timerEnd( "A*" );
console.log( path );
