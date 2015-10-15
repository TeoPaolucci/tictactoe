'use strict';

var checkWin = function checkWin(grid) {
  //condition 1, any row has all the same symbol
  for (var i = 0; i < 3; i++) {
    if (grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2] && grid[i][0] !== '') {
      return grid[i][0];
    }
  }

  //condition 2, any column (same index of each row) has all the same symbol
  for (var i = 0; i < 3; i++) {
    if (grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i] && grid[0][i] !== '') {
      return grid[0][i];
    }
  }

  //condition 3, diagonal top left to bottom right
  if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
    return grid[0][0];
  }

  //condition 4, diagonal top right to bottom left
  if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
    return grid[0][2];
  }

  //check for empty cells
  var isEmptyCell = false;
  grid.forEach(function(row){
    row.forEach(function(cell){
      if (!cell) {
        isEmptyCell = true;
      }
    });
  });

  //if there are no empty cells left and noone has won
  if (!isEmptyCell) {
    return 'tie';
  }
  return null;
}

var gridToArray = function gridToArray() {
  return [
    [$('#c1').html(), $('#c2').html(), $('#c3').html()],
    [$('#c4').html(), $('#c5').html(), $('#c6').html()],
    [$('#c7').html(), $('#c8').html(), $('#c9').html()]
  ];
}

var clearBoard = function clearBoard() {
  for (var i = 1; i <= 9; i++) {
    $('#c' + i).html('');
  }
}

var updateScores = function updateScores(outght, naught) {
  $('#Owins').html('' + outght);
  $('#Xwins').html('' + naught);
}

$(document).ready(function(){
  // $('.cell').on('click', function(){
  //   $(this).html('X');
  // });

  // X goes first traditionally
  var turnSymbol = 'X';

  //each player needs a baseline score of 0
  var oughtsWins = 0;   //'O's
  var naughtsWins = 0;  //'X's
  updateScores(oughtsWins, naughtsWins);

  //When someone clicks a cell
  $('.cell').on('click', function(){
    if (!$(this).html()) {
      $(this).html(turnSymbol)
      var gameState = checkWin(gridToArray());
      switch (gameState) {
        case 'X' :
          naughtsWins++;
          clearBoard();
          updateScores(oughtsWins, naughtsWins);
          turnSymbol = 'O';
          break;
        case 'O' :
          oughtsWins++;
          clearBoard();
          updateScores(oughtsWins, naughtsWins);
          turnSymbol = 'X';
          break;
        case 'tie' :
          clearBoard();
          break;
        default :
          if (turnSymbol === 'X') {turnSymbol = 'O'}
            else {turnSymbol = 'X'}
          break;
      }
    }
  });
    //if the cell is empty
      //fill the cell with the player's letter
    //check for a victory

});
