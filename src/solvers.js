/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  //fixme
  var solutionBoard = new Board({n:n});

  // toggle each Rook
  // check for conflicts
  // if none, keep rook and toggle next one
  // else if conflict, untoggle rook
  for ( var i = 0; i < n; i++ ) {
    for ( var j = 0; j < n; j++ ) {
      solutionBoard.togglePiece(i,j);
      if ( solutionBoard.hasAnyRooksConflicts() ) {
        solutionBoard.togglePiece(i,j);
      }
    }
  }

  var solution = solutionBoard.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;

  //var solutionBoard = new Board({n:n});

  // toggle each Rook
  // check for conflicts
  // if none, keep rook and toggle next one
  // else if conflict, untoggle rook


    var array = [];

    var inner = function(m, p, board, c) {
      var solutionBoard = board || new Board({n:n});
      var count = c || 0;

      for ( var i = m; i < n; i++ ) {
        for ( var j = p; j < n; j++ ) {

          solutionBoard.togglePiece(i,j);
          count ++;

          if ( solutionBoard.hasAnyQueensConflicts() ) {
            solutionBoard.togglePiece(i,j);
            count--;
          }

          /*if (count === 3) {
            var newC = 0;
            for ( var i = m; i < n; i++ ) {
              for ( var j = p; j < n; j++ ) {
                count += solutionBoard.rows()[i][j];
                if (newC === 3) {
                  solutionBoard.togglePiece(i,j);
                  inner(i+1, j, solutionBoard, count);
                }
              }}

          }*/
          console.log(count);
          if (count === 4) {
            console.log(solutionBoard.rows());
            array.push(solutionBoard.rows());
          }

        }
      }
      //console.log(solutionBoard.rows());


    }

    var x = 0
    var y = 0;
    /*while (x < n ) {
      while (y < n)
      inner(x);

    }*/

    for ( var i = 0; i < n; i++ ) {
      for ( var j = 0; j < n; j++ ) {
        inner(i, j);
      }
    }


    console.log(array);



  //var solution = solutionBoard.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
