/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  const rowArray = new Array(9).fill(0).map((a) => new Array(9).fill(false));
  const colArray = new Array(9).fill(0).map((a) => new Array(9).fill(false));
  const boxArray = new Array(9).fill(0).map((a) => new Array(9).fill(false));

  for (let row in board) {
    for (let col in board) {
      if (board[row][col] != ".") {
        rowArray[row][board[row][col]] = true;
        colArray[col][board[row][col]] = true;
        boxArray[Math.floor(row / 3) + Math.floor(col / 3) * 3][
          board[row][col]
        ] = true;
      }
    }
  }
  fill(board, 0, 0, rowArray, colArray, boxArray);
};
function fill(board, row, col, rowArray, colArray, boxArray) {
  if (row === 9) {
    return true;
  }
  const nextRow = col + 1 > 8 ? row + 1 : row;
  const nextCol = col < 8 ? col + 1 : 0;

  if (board[row][col] != ".") {
    return fill(board, nextRow, nextCol, rowArray, colArray, boxArray);
  }
  for (let num = 1; num <= 9; num++) {
    if (
      !rowArray[row][num] &&
      !colArray[col][num] &&
      !boxArray[Math.floor(row / 3) + Math.floor(col / 3) * 3][num]
    ) {
      rowArray[row][num] = true;
      colArray[col][num] = true;
      boxArray[Math.floor(row / 3) + Math.floor(col / 3) * 3][num] = true;
      board[row][col] = `${num}`;

      if (fill(board, nextRow, nextCol, rowArray, colArray, boxArray)) {
        return true;
      }
      board[row][col] = ".";
      rowArray[row][num] = false;
      colArray[col][num] = false;
      boxArray[Math.floor(row / 3) + Math.floor(col / 3) * 3][num] = false;
    }
  }
  return false;
}
