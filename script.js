// start a new board and log it to the console
const chess = new Board();
console.log(chess);

// Get the container element
const board = document.querySelector("#board");
board.classList.add("border");

// state variables
let [currentRow, currentCol] = [0, 0];
let piece = chess.getPieceAt(currentRow, currentCol);
let moves = [];
let selected = false;
let validMoves = [];
let lastElement = null;

function toggleSelected(element) {
  element.target.classList.toggle("selected");
  selected = !selected;
  return;
}

// Create an 8x8 chessboard
for (let i = 7; i >= 0; i--) {
  const row = document.createElement("tr");
  row.className = "row";
  row.classList.add("border");

  for (let j = 7; j >= 0; j--) {
    // for each square, create a td element clickable that can select 2 pieces to the move array

    const col = document.createElement("td");
    col.setAttribute("id", `${i}${j}`);
    col.className = "col";
    col.classList.add("border");

    col.addEventListener("click", (element) => {
      currentRow = element.target.id[0];
      currentCol = element.target.id[1];

      if (moves.length > 0) {
        moves.push([parseInt(currentRow), parseInt(currentCol)]);
      }

      piece = chess.getPieceAt(currentRow, currentCol);
      console.log(
        `row: ${currentRow}, col: ${currentCol} *** and ${piece?.name}`
      );

      if (selected) {
        const selectedPiece = moves[0];
        const [rowToMove, colToMove] = moves[1];

        if (!piece) {
          if (
            validMoves.some(
              (coords) =>
                coords[0] === rowToMove[0] && coords[1] === colToMove[1]
            )
          ) {
            console.log(
              `*** ${selectedPiece.name} moved to ${currentRow}, ${currentCol}`
            );
            selectedPiece.setPosition(chess, [currentRow, currentCol]);
            moves = [];
            // need to remove the toggle of the last element
            lastElement.classList.toggle("selected");
            selected = !selected;
          }
        }
      }

      // if not a valid Piece
      if (piece === null && !selected) return;

      // if we click on the same piece;
      if (selected && move.length === 1) {
        if (piece === move[0]) {
          toggleSelected(element);
          move = [];
        }
        return;
      }

      // if a piece was selected before
      // if piece is the first to be selected
      if (!selected) {
        toggleSelected(element);
        lastElement = element.target;
        validMoves = piece.validMoves(chess);

        console.log(`*** this are the valid moves for ${piece.name}`);
        console.log(validMoves);
        move.push(piece);
      }
    });

    if ((i + j) % 2 == 0) {
      col.classList.add("white");
    } else {
      col.classList.add("black");
    }
    row.appendChild(col);
  }
  board.appendChild(row);
}

let currentPiece = document.querySelector(`#id${currentRow}${currentCol}`);
