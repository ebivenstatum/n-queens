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
  //console.log(solutionBoard);

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

  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other

window.findNQueensSolution = function(n) {

  //console.log('incoming n', n);
  let newCoolBoard;
  newCoolBoard = new Board({n:n});
  //console.log(newCoolBoard, 'newBoard');

  var solution;

    const helperFn = function(row, board) {
     // start with empty Board
     board = board || new Board({n:n});
     console.log(board);

    for( var i = 0; i < n; i++ ) {
      console.log(row, i);
      board.togglePiece(row, i);

      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(row, i);
        //helper(row + 1);
      } else {
        if (board.numPieces === n) {
          return;
        } else {
          helperFn(row + 1, board);

        }

      }

    }

    console.log(board);
       // loop thrpugh row,

         //toggle piece,
         // check conflict,
         //if none call helperFn(1)
         // if conflict toggle piece, move to next loop iteration

    };

    helperFn(0);

  solution = newCoolBoard.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;

};
window.findNQueensSolution(5);

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
