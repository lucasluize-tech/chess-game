function pieceName(col) {
  if (col == 0 || col == 7) {
    return "rook";
  } else if (col == 1 || col == 6) {
    return "knight";
  } else if (col == 2 || col == 5) {
    return "bishop";
  } else if (col == 4) {
    return "queen";
  } else if (col == 3) {
    return "king";
  }
}

class Piece {
  constructor(color, name, row, column) {
    this.color = color;
    this.name = name;
    this.position = [row, column];
    this.hasMoved = false;
  }

  // takes an arrary [row, column]
  setPosition(boardClass, position) {
    const board = boardClass.board;
    const [lastRow, lastCol] = [...this.position];
    const [row, column] = [...position];
    board[row][column] = this;
    board[lastRow][lastCol] = null;
    this.position = position;
    this.hasMoved = true;
  }

  remove(boardClass) {
    const board = boardClass.board;
    const [lastRow, lastCol] = [...this.position];
    this.position = null;
    board[lastRow][lastCol] = null;
  }
}

class Pawn extends Piece {
  constructor(color, row, column) {
    super(color, "pawn", row, column);
  }

  validMoves(boardClass) {
    const [row, column] = this.position;
    const board = boardClass.board;
    const direction = this.color === "white" ? 1 : -1;
    // list of possible moves
    const moves = [];
    // Check if the pawn can move one or two squares forward
    if (board[row + direction][column] === null) {
      moves.push([row + direction, column]);
      if (
        (row === 6 && this.color === "black") ||
        (row === 1 && this.color === "white")
      ) {
        if (board[row + 2 * direction][column] === null) {
          moves.push([row + 2 * direction, column]);
        }
      }
    }

    // Check if the pawn can capture diagonally
    if (
      column > 0 &&
      board[row + direction][column - 1]?.color !== this.color &&
      board[row + direction][column + 1] !== null
    ) {
      moves.push([row + direction, column - 1]);
    }
    if (
      column < 7 &&
      board[row + direction][column + 1]?.color !== this.color &&
      board[row + direction][column + 1] !== null
    ) {
      moves.push([row + direction, column + 1]);
    }

    return moves;
  }

  promote(board) {
    const _board = board.board;
    if (this.color === "white") {
      for (let i = 0; i < 8; i++) {
        if (_board[7][i] === this) {
          this.remove();
          _board[7][i] = new Queen("white", 7, i);
        }
      }
    } else {
      for (let i = 0; i < 8; i++) {
        if (_board[0][i] === this) {
          this.remove();
          _board[0][i] = new Queen("black", 0, i);
        }
      }
    }
  }
}

class Rook extends Piece {
  constructor(color, row, column) {
    super(color, "rook", row, column);
  }

  validMoves(boardClass) {
    const [row, column] = this.position;
    // list of possible moves
    const board = boardClass.board;
    const moves = [];

    // Check horizontal moves

    //from left to right
    for (let i = column - 1; i >= 0; i--) {
      // if the square is empty
      if (board[row][i] === null) {
        moves.push([row, i]);
        // if the square is occupied by an enemy piece
      } else if (board[row][i]?.color !== this.color) {
        moves.push([row, i]);
        break;
      } else {
        break;
      }
    }
    // from right to left
    for (let i = column + 1; i <= 7; i++) {
      // if the square is empty
      if (board[row][i] === null) {
        moves.push([row, i]);
        // if the square is occupied by an enemy piece
      } else if (board[row][i]?.color !== this.color) {
        moves.push([row, i]);
        break;
      } else {
        break;
      }
    }

    // check vertical moves

    //from top to bottom
    for (let i = row - 1; i >= 0; i--) {
      // if the square is empty
      if (board[i][column] === null) {
        moves.push([i, column]);
        // if the square is occupied by an enemy piece
      } else if (board[i][column]?.color !== this.color) {
        moves.push([i, column]);
        break;
      } else {
        break;
      }
    }

    //from bottom to top
    for (let i = row + 1; i <= 7; i++) {
      // if the square is empty
      if (board[i][column] === null) {
        moves.push([i, column]);
        // if the square is occupied by an enemy piece
      } else if (board[i][column]?.color !== this.color) {
        moves.push([i, column]);
        break;
      } else {
        break;
      }
    }
    return moves;
  }
}

class Knight extends Piece {
  constructor(color, row, column) {
    super(color, "knight", row, column);
  }

  validMoves(boardClass) {
    const [row, column] = this.position;
    const board = boardClass.board;
    let moves = [];

    //     Knight:
    // Moves in an L-shape pattern: two squares in one direction (horizontally or vertically) and one square in the other direction.
    // Can jump over other pieces.

    // Check all possible L-shaped moves
    const possibleMoves = [
      [row - 2, column - 1],
      [row - 2, column + 1],
      [row - 1, column - 2],
      [row - 1, column + 2],
      [row + 1, column - 2],
      [row + 1, column + 2],
      [row + 2, column - 1],
      [row + 2, column + 1],
    ];

    for (let [r, c] of possibleMoves) {
      if (r >= 0 && r <= 7 && c >= 0 && c <= 7) {
        if (board[r][c] === null || board[r][c]?.color !== this.color) {
          moves.push([r, c]);
        }
      }
    }
    return moves;
  }
}

class Bishop extends Piece {
  constructor(color, row, column) {
    super(color, "bishop", row, column);
  }

  validMoves(boardClass) {
    const [row, column] = this.position;
    const board = boardClass.board;
    const moves = [];

    // Check diagonal moves
    for (let i = 1; i <= 7; i++) {
      if (row - i >= 0 && column - i >= 0) {
        if (board[row - i][column - i] === null) {
          moves.push([row - i, column - i]);
        } else if (board[row - i][column - i]?.color !== this.color) {
          moves.push([row - i, column - i]);
          break;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    for (let i = 1; i <= 7; i++) {
      if (row - i >= 0 && column + i <= 7) {
        if (board[row - i][column + i] === null) {
          moves.push([row - i, column + i]);
        } else if (board[row - i][column + i]?.color !== this.color) {
          moves.push([row - i, column + i]);
          break;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    for (let i = 1; i <= 7; i++) {
      if (row + i <= 7 && column - i >= 0) {
        if (board[row + i][column - i] === null) {
          moves.push([row + i, column - i]);
        } else if (board[row + i][column - i]?.color !== this.color) {
          moves.push([row + i, column - i]);
          break;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    for (let i = 1; i <= 7; i++) {
      if (row + i <= 7 && column + i <= 7) {
        if (board[row + i][column + i] === null) {
          moves.push([row + i, column + i]);
        } else if (board[row + i][column + i]?.color !== this.color) {
          moves.push([row + i, column + i]);
          break;
        } else {
          break;
        }
      } else {
        break;
      }
    }

    return moves;
  }
}

class Queen extends Piece {
  constructor(color, row, column) {
    super(color, "queen", row, column);
  }

  validMoves(board) {
    const [row, column] = this.position;
    let moves = [];

    // Queen can move like a Bishop or a Rook
    const bishopMoves = new Bishop(this.color, ...this.position).validMoves(
      board
    );
    const rookMoves = new Rook(this.color, ...this.position).validMoves(board);

    return moves.concat(bishopMoves, rookMoves);
  }
}

class King extends Piece {
  constructor(color, row, column) {
    super(color, "king", row, column);
  }

  validMoves(board) {
    const [row, column] = this.position;
    let moves = [];
    // Kings can only move one space at a time.
    const possibleMoves = [
      [row + 1, column],
      [row, column + 1],
      [row - 1, column],
      [row, column - 1],
      [row + 1, column + 1],
      [row - 1, column - 1],
      [row + 1, column - 1],
      [row - 1, column + 1],
    ];

    for (let [r, c] of possibleMoves) {
      if (r >= 0 && r <= 7 && c >= 0 && c <= 7) {
        const piece = board.getPieceAt(r, c);
        if (!piece || piece.color !== this.color) {
          // Check if moving to this square puts the King in check
          const oldPosition = this.position;
          this.setPosition([r, c]);
          const isInCheck = board.isKingInCheck(this.color);
          this.setPosition(oldPosition);

          // Add the move to the list if it doesn't put the King in check
          if (!isInCheck) {
            moves.push([r, c]);
          }
        }
      }
    }
    return moves;
  }
}

class Player {
  constructor(color, name) {
    this.team = color;
    this.name = name; // this is just for fun
  }

  move(piece, place) {
    piece.setPosition(place);
  }
}

class Board {
  // create a 2D array of 8x8
  constructor() {
    this.board = [];
    this.rows = [0, 1, 2, 3, 4, 5, 6, 7];
    this.columns = [0, 1, 2, 3, 4, 5, 6, 7];
    this.rows.forEach((row) => {
      this.board.push([]);
      this.columns.forEach((column) => {
        let color = "white";
        if (row === 6 || row === 7) {
          color = "black";
        }
        if (row === 2 || row === 3 || row === 4 || row === 5) {
          this.board[row].push(null);
        } else if (row === 1 || row === 6) {
          this.board[row].push(new Pawn(color, row, column));
        } else {
          if (pieceName(column) === "king") {
            this.board[row].push(new King(color, row, column));
          }
          if (pieceName(column) === "queen") {
            this.board[row].push(new Queen(color, row, column));
          }
          if (pieceName(column) === "rook") {
            this.board[row].push(new Rook(color, row, column));
          }
          if (pieceName(column) === "bishop") {
            this.board[row].push(new Bishop(color, row, column));
          }
          if (pieceName(column) === "knight") {
            this.board[row].push(new Knight(color, row, column));
          }
        }
      });
    });
  }

  findPiece(name, color) {
    const board = this.board.board;
    const piece = board.filter((row) =>
      row.filter((piece) => piece.name === name && piece.color === color)
    );

    return piece[0];
  }

  getPieceAt(row, column) {
    if (row < 0 || row > 7 || column < 0 || column > 7) {
      return null;
    }
    return this.board[row][column];
  }

  isKingInCheck(color) {
    const king = this.findPiece("king", color);
    if (!king) {
      return false;
    }

    // Check if any of the opponent's pieces are attacking the King's position
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        const piece = this.board[row][column];
        if (
          piece &&
          piece.color !== color &&
          piece
            .validMoves(this)
            .some(([r, c]) => r === king.position[0] && c === king.position[1])
        ) {
          return true;
        }
      }
    }

    return false;
  }

  canCastle(color) {
    const king = this.findPiece("king", color);
    if (!king || !king.hasMoved) {
      return false;
    }
    // Check if there are any pieces between the King and the Rook
    const kingsideRook = this.getPieceAt(king.position[0], 7);
    if (
      kingsideRook &&
      kingsideRook.name === "rook" &&
      !kingsideRook.hasMoved
    ) {
      for (let column = king.position[1] + 1; column < 7; column++) {
        if (this.getPieceAt(king.position[0], column)) {
          return false;
        }
      }

      // Check if the King will be in a "check position"
      const oldPosition = king.position;
      king.setPosition([king.position[0], king.position[1] + 2]);
      const kingsideInCheck = this.isKingInCheck(color);
      king.setPosition(oldPosition);
      if (kingsideInCheck) {
        return false;
      }
      return true;
    }

    const queensideRook = this.getPieceAt(king.position[0], 0);
    if (
      queensideRook &&
      queensideRook.name === "rook" &&
      !queensideRook.hasMoved
    ) {
      for (let column = king.position[1] - 1; column > 0; column--) {
        if (this.getPieceAt(king.position[0], column)) {
          return false;
        }
      }

      // Check if the King will be in a "check position"
      const oldPosition = king.position;
      king.setPosition([king.position[0], king.position[1] - 2]);
      const queensideInCheck = this.isKingInCheck(color);
      king.setPosition(oldPosition);
      if (queensideInCheck) {
        return false;
      }
      return true;
    }

    return false;
  }

  checkMate(color) {
    const king = this.findPiece("king", color);
    if (!king.isKingInCheck(color)) {
      return false;
    }
    const kingMoves = king.validMoves();
    for (let move of kingMoves) {
      const oldPosition = king.position;
      king.setPosition(move);
      const inCheck = king.isKingInCheck(color);
      king.setPosition(oldPosition);
      if (!inCheck) {
        return false;
      }
    }
    return true;
  }
}
