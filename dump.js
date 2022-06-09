let bb = board || new Board({n:n});
//bb.togglePiece(0, row);
let queenCt = 0;
if (row === n) {
  return;
}

//do something
for (var i = 0; i < n; i++) {
  for (var j = row; j < n; j++) {
    if (bb.rows()[i][j] === 0) {
      bb.togglePiece(i,j);
      queenCt++;

      if (bb.hasAnyQueensConflicts()) {
        bb.togglePiece(i,j);
        queenCt--;
      }
    }
  }
}


if ( queenCt < n ) {
  helperFn(row + 1);
}
return bb;

var obj = {}
  var emptyMatrix =  new Board({n:n})

  obj[`${n}`] = new Board({n:n});
  //newBoard.initialize({n:n});

  //newBoard.attributes = emptyMatrix.rows();
  console.log(obj[`${n}`], n);
  var solution;

  var helperFn = function(board, x) {
    board.initialize({n:n});

    // toggle piece at 0, x
    board.togglePiece(0, x);
    var queenCt = 1;

      // loop through entire board toggling and checking for conflictss, if no conflict add 1 to ct
      for ( var i = 0; i < n; i++ ) {
        for ( var j = 0; j < n; j++ ) {

          if (board.rows()[i][j] === 0) {
            board.togglePiece(i,j)
            queenCt++;
          }

          if (board.hasAnyQueensConflicts()) {
            board.togglePiece(i, j);
            queenCt--;
          }

        }
      }

      // if at the end of the loop ct is < n; call helper(current board but x + 1)then return nothing
      if ( queenCt < n  ) {
        //var freshBoard = new Board({n:n});
        //freshBoard.rows() = emptyMatrix.rows();
        //console.log(freshBoard);

        helperFn(board, x + 1);
      }

      if (queenCt === n) {
        solution = board.rows()
        return;
      }

      //console.log(board, n)

      // i f at the end ct === n; retiurn current board
      //console.log(newBoard);
  }

  helperFn(obj[`${n}`], 0);

  if (n === 2 || n === 3) {
    var empty = new Board({n:n});
    solution = empty.rows();
  }





{
  var functionImTesting = function(n) {
    var somethingBoard = new Board ({'n':n})
    var solution;
    var inner = function(row) {
      row = row || 0

      if (n === row) {
        var toCheck = somethingBoard.rows()
        var count = 0
        for (var i = 0; i < toCheck.length; i ++)  {
          for ( var j = 0; j < toCheck[i].length; j ++) {
            count += toCheck[i][j]
          }
        }
        if(count === n || n === 0) {
          solution =  somethingBoard.rows()
          return
        } else {

        }
      }
    }
    }
  }