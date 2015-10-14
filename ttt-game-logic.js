'use strict';

var Game = function Player (playerOne, playerTwo, gamesToWin) {
  this.playerOne = playerOne;
  this.playerTwo = playerTwo;
  this.grid = [[null,null,null][null,null,null][null,null,null]];
  this.playerOneScore = 0;
  this.playerTwoScore = 0;
  this.gamesToWin =
};

Game.prototype.checkWin = function checkWin() {
  //condition 1, any row has all the same symbol
  grid.forEach(function(row){
    if (row[0] === row[1] $$ row[1] === row[2]) {
      return row[0];
    }
  });

  //condition 2, any column (same index of each row) has all the same symbol
  for (var i = 0; i < 3; i++) {
    if (grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i]) {
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
};



var Player = function Player (username, symbol) {
  this.username = username;
  this.symbol = symbol;
};

Player.prototype.makeMove = function makeMove (grid, symbol, indexRow, indexCol) {
  if (grid[indexRow][indexCol]) {
    return null;
  }
  var result = grid;
  result[indexRow][indexCol] = symbol;
  return result;
};
