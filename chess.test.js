const { pieceName } = require("./chess");

test("piece is named correctly", () => {
  let rook = pieceName("a");
  expect(rook).toBe("rook");
  rook = pieceName("h");
  expect(rook).toBe("rook");
});

test("piece is incorrect", () => {
  const rook = pieceName("g");
  expect(rook).toBe("knight");
});
