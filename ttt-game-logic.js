'use strict';

var Game = function Player (playerOne, playerTwo) {
  this.playerOne = playerOne;
  this.playerTwo = playerTwo;
  grid = [[null,null,null][null,null,null][null,null,null]];
}

//TODO: write game methods

var Player = function Player (username, symbol) {
  this.username = username;
  this.symbol = symbol;
}

var Player.prototype.makeMove = function makeMove (grid, symbol, indexRow, indexCol) {
  if (grid[indexRow][indexCol]) {
    return null;
  }
  var result = grid;
  result[indexRow][indexCol] = symbol;
  return result;
}
