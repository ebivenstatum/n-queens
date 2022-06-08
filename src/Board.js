// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //create a var called current row and store the current row
      var currentRow = this.rows()[rowIndex];
      //create a ct var to 0
      var count = 0;
      //loop through current row
      for ( var i = 0; i < currentRow.length; i++ ) {
        // if current square is 1 add 1 to ct
        count += currentRow[i];
      }
      // if count is > 1 then there are conflicts
      if ( count > 1) {
        return true;
      }

      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // find number of rows
      // loop through all rows
      // call hasRowConflictAt
      var numRows = this.rows().length;

      for ( var i = 0; i < numRows; i++ ) {
        if( this.hasRowConflictAt(i) ) {
          return true
        }
      }

      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //store this.rows()
      var numRows = this.rows().length;
      //count var = 0
      var count = 0;
      // loop through rows()
      for ( var i = 0; i < numRows; i++ ) {
        //if rows[i][col index] = 1
          //add 1 to count
        count += this.rows()[i][colIndex];
      }


      // if coutn > 1 return true
      if ( count > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // get num cols
      var numCols = this.rows().length;

      //for each column
      for ( var i = 0; i < numCols; i++ ) {
        //if this.conflictColumn(i)
        if ( this.hasColConflictAt(i) ) {
          //return true
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //store parameter into nicer var
      var firstRowIndex = majorDiagonalColumnIndexAtFirstRow;
      //set up count = 0
      var count = 0;

      // loop through this.rows() (j set to 0, i originally set to majorDIagonalColumnIn.... j++)
      for ( var i = 0; i < this.rows().length; i++ ) {

        if( firstRowIndex >= 0 && firstRowIndex < this.rows().length)  {
          count += this.rows()[i][firstRowIndex];
        }

        firstRowIndex++;
      }

      if ( count > 1 ) {
        return true;
      }

      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //set length var
      var numRows = this.rows().length;
      var neg = 1 - numRows;
    //loop through this.rows starting at 1-length to i < length
      for ( var i = neg; i < numRows; i++ ) {
        //check result of hasMajorConflictsAt(i)
        if ( this.hasMajorDiagonalConflictAt(i) ) {
          return true;
        }

      }

      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {

      //store parameter into nicer var
      var firstRowIndex = minorDiagonalColumnIndexAtFirstRow;
      //set up count = 0
      var count = 0;
      // loop through this.rows() (j set to 0, i originally set to majorDIagonalColumnIn.... j++)
      for ( var i = 0; i < this.rows().length; i++ ) {

        if( firstRowIndex < this.rows().length && firstRowIndex >= 0)  {
          count += this.rows()[i][firstRowIndex];
        }

        firstRowIndex--;
      }

      if ( count > 1 ) {
        return true;
      }

      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {

      //set length var
      var numRows = this.rows().length;
      var pos = 2*numRows - 2;
    //loop through this.rows starting at 1-length to i < length
      for ( var i = pos; i > 0; i-- ) {
        //check result of hasMajorConflictsAt(i)
        if ( this.hasMinorDiagonalConflictAt(i) ) {
          return true;
        }

      }


      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
