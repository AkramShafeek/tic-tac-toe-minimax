// here implement the entire minimax theorem


// This function returns true if there are moves
// remaining on the board. It returns false if
// there are no moves left to play.
function isMovesLeft(board) {
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (board[i][j] === '_')
        return true;
  return false;
}

function evaluate(board) {
  // Checking for Rows for X or O victory.
  for (let row = 0; row < 3; row++) {
    if (board[row][0] === board[row][1] &&
      board[row][1] === board[row][2]) {
      if (board[row][0] === 'X')
        return +10;
      else if (board[row][0] === 'O') {
        return -10;
      }
    }
  }

  // Checking for Columns for X or O victory.
  for (let col = 0; col < 3; col++) {
    if (board[0][col] === board[1][col] &&
      board[1][col] === board[2][col]) {
      if (board[0][col] === 'X')
        return +10;
      else if (board[0][col] === 'O') {
        return -10;
      }
    }
  }

  // Checking for Diagonals for X or O victory.
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    if (board[0][0] === 'X')
      return +10;
    else if (board[0][0] === 'O') {
      return -10;
    }
  }

  if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    if (board[0][2] === 'X')
      return +10;
    else if (board[0][2] === 'O') {
      return -10;
    }
  }
  // Else if none of them have won then return 0
  return 0;
}


// This is the minimax function. It considers all
// the possible ways the game can go and returns
// the value of the board
function minimax(board, depth, isMax) {
  let score = evaluate(board);

  // If Maximizer has won the game return his/her
  // evaluated score
  if (score === 10)
    return { score: score - depth, isGameOver: true };

  // If Minimizer has won the game return his/her
  // evaluated score
  if (score === -10)
    return { score: score + depth, isGameOver: true };

  // If there are no more moves and no winner then
  // it is a tie
  if (isMovesLeft(board) === false)
    return { score: 0, isGameOver: true };

  // If this maximizer's move
  if (isMax) {
    let best = -1000;

    // Traverse all cells
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check if cell is empty
        if (board[i][j] === '_') {
          // Make the move
          board[i][j] = 'X';

          // Call minimax recursively and choose
          // the maximum value
          best = Math.max(best, minimax(board, depth + 1, false).score);

          // Undo the move
          board[i][j] = '_';
        }
      }
    }
    return { score: best, isGameOver: false };
  }

  // If this minimizer's move
  else {
    let best = 1000;

    // Traverse all cells
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check if cell is empty
        if (board[i][j] === '_') {
          // Make the move
          board[i][j] = 'O';

          // Call minimax recursively and choose
          // the minimum value
          best = Math.min(best, minimax(board, depth + 1, true).score);

          // Undo the move
          board[i][j] = '_';
        }
      }
    }
    return { score: best, isGameOver: false };
  }
}

// This will return the best possible move for the player
async function findBestMove(board) {
  let bestVal = 10000;
  let bestMove = { row: -1, col: -1 };

  // Traverse all cells, evaluate minimax function for
  // all empty cells. And return the cell with optimal
  // value.
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Check if cell is empty
      if (board[i][j] === '_') {
        // Make the move
        board[i][j] = 'O';

        // compute evaluation function for this
        // move.
        let moveVal = minimax(board, 0, true);
        // Undo the move
        board[i][j] = '_';

        // If the value of the current move is
        // more than the best value, then update
        // best
        if (moveVal.score < bestVal) {
          if (moveVal.isGameOver)
            return moveVal;
          bestMove.row = i;
          bestMove.col = j;
          bestVal = moveVal.score;
        }
      }
    }
  }
  return { score: bestVal, bestMove, isGameOver: false };
}

export default findBestMove;

// // testing purpose
// board1 =
//   [
//     ['X', '_', '_'],
//     ['_', '_', '_'],
//     ['_', '_', 'X']
//   ];

// console.log(findBestMove(board1));