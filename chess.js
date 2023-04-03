// Let's try building a chess-game

// 1. Create a class called Board
// 2. Create a class called ChessGame
// 3. Create a class called Player

function pieceName(column) {
  if (column === "a" || column === "h") {
    return "rook";
  }
  if (column === "b" || column === "g") {
    return "knight";
  }
  if (column === "c" || column === "f") {
    return "bishop";
  }
  if (column === "d") {
    return "queen";
  }
  if (column === "e") {
    return "king";
  }
}

class Board {
  // create a 2D array of 8x8
  constructor() {
    this.board = [];
    this.rows = [0, 1, 2, 3, 4, 5, 6, 7];
    this.columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
    this.rows.forEach((row) => {
      this.board.push([]);
      this.columns.forEach((column) => {
        this.board[row].push(null);
      });
    });
  }

  render() {
    const board = this.board;
    board.forEach((row) => {
      console.log(row);
    });
  }

  addPieces() {}
}

let board = new Board();
board.addPieces();
board.render();

class ChessGame {
  constructor() {
    this.board = new Board();
    this.players = [new Player("white"), new Player("black")];
    this.currentPlayer = this.players[0];
  }
  play() {
    // this.board.render();
    // this.currentPlayer.render();
  }
}

class Player {
  constructor(color) {
    this.team = color;
  }

  move(Piece, place) {
    // TODO: move the piece in the direction
    Piece.setPosition(place);
  }
}

class Piece {
  constructor(color, name, row, column) {
    this.color = color;
    this.name = name;
    this.position = [row, column];
  }

  setPosition(position) {
    this.position = position;
  }

  remove() {
    this.position = null;
  }
}

module.exports = { pieceName, Board, ChessGame, Player, Piece };