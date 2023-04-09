const { Board, Player, Piece } = require("./models.js");

function movePawn(piece) {
  const { name, position, color } = piece;
  if (name !== "pawn") return;
  if (piece.position[0] === 1 || piece.position[0] === 6) {
    if ((piece.color = "white")) {
      return [row + 2, column];
    } else {
      return [row - 2, column];
    }
  }
  if ((piece.color = "white")) {
    return [row + 1, column];
  } else {
    return [row - 1, column];
  }
}

// takes a piece and return new possible positions
function isValidMove(piece, newPosition) {
  const pieceName = piece.name;
  [row, column] = piece.position;

  // all pawn moves can make
  if (piece.name === "pawn") {
    // if pawn is in the first row
    if (row === 1 || row === 6) {
      // if pawn is white we add 2 or 1. if black we subtract 2 or 1
      if (piece.name === "white") {
        return row === newPosition[0] + 2 || row === newPosition[0] + 1;
      } else {
        return row === newPosition[0] - 2 || row === newPosition[0] - 1;
      }
    }
    return row === newPosition[0] + 1 || row === newPosition[0] - 1;
  }
}

function movePiece(board, piece, positionToMove) {
  let pieceName = piece.name;
  let piecePosition = piece.position;
  let pieceColor = piece.color;
  let [row, column] = positionToMove;

  // check if move is allowed:

  // iterate through board and check if position is null;
  let openSpaces = [];
  let occupiedSpaces = [];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] === null) {
        openSpaces.push([i, j]);
      } else {
        // mapping won't work because some pieces have the same name.
        // so we need to push all places where there's a piece and then finding which piece is there.
        occupiedSpaces.push([i, j]);
      }
    }
  }
  console.log("****** OPEN SPACES ******");
  console.log(openSpaces);
  console.log("****** PIECES ON BOARD ******");
  console.log(occupiedSpaces);

  //let's try to move

  // first let's check with function isValidMove(piece)
  // board[rowPiece][columnPiece] = [row, column];
}

function ChessGame() {
  const board = new Board();
  const player1 = new Player("white");
  const player2 = new Player("black");
  // check inital board state
  // console.log(board.board.forEach((v) => console.log(v)));
  const boardState = board.board;
  let piece = { color: "white", name: "rook", position: [1, 0] };
  movePiece(boardState, piece, [2, 0]);
}
ChessGame();
