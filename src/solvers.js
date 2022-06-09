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

var generateBoards = function(n) {

  var rows = new Board({n:n});

  for ( var i = 0; i < n; i++ ) {
    for ( var j = 0; j < n; j++ ) {
      rows.togglePiece(i,j);
      if ( rows.hasAnyRooksConflicts() ) {
        rows.togglePiece(i,j);
      }
    }
  }

  var solutions = rows.rows();
  //console.log(solution);


  /*var boards = [];

  var doRow = function(currentBoard) {
    var currentBoard = currentBoard || ;
    console.log(currentBoard);

    if (currentBoard.length === n) {
      boards.push(currentBoard);
      return;
    }

    solutions.forEach(solution => doRow(currentBoard.concat(solution)));
  }

  doRow();

  console.log(boards);*/
  //return boards

}


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

  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //console.log(n);
  var newBoard = new Board ({n:n})
  var solution;
  var helperFn = function(currentBoard, x) {

    var board = currentBoard;
    // toggle piece at 0, x
    //console.log(board);
    board.togglePiece(0, x);
    var queenCt = 1;
      // loop through entire board toggling and checking for conflictss, if no conflict add 1 to ct
      for ( var i = 0; i < n; i++ ) {
        for ( var j = 0; j < n; j++ ) {
          if (board.rows()[i][j] === 0) {
            board.togglePiece(i, j);
            queenCt++;
          }

          if (board.hasAnyQueensConflicts()) {
            board.togglePiece(i, j);
            queenCt--;
          }
        }
      }

      // if at the end of the loop ct is < n; call helper(current board but x + 1)then return nothing
      if ( queenCt < n ) {
        board = new Board({n:n});
        helperFn(board, x + 1);
      }
      if (queenCt === n) {
        solution =board.rows()
      }
      return board;

      // i f at the end ct === n; retiurn current board
  }
  helperFn(newBoard, 0);

  var count = 0;
  for ( var i = 0; i < solution.length;i ++ ) {
    for ( var j = 0; j < solution[i].length; j ++) {
      count += solution[i][j];
    }
  }
  if (count < n) {
    var emptyBoard = new Board({n:n});
    solution = emptyBoard.rows();
  }
 // console.log(solution);
  //console.log(solution);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};
window.findNQueensSolution(8);

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
