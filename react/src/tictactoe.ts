type Player = "O" | "X"
type Cell = Player | undefined
type GameState = {
    currentPlayer: Player;
    winner: Player | undefined;
    board: Cell[][]
}

export const initialGameState: GameState = {
  currentPlayer: "X",
  winner: undefined,
  board:[[undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]]
}

function makeMove(gameState: GameState, row: number, col: number): GameState {
    const newState = structuredClone(gameState)
    newState.board[row][col] = gameState.currentPlayer
    newState.currentPlayer = (gameState.currentPlayer === "X") ? "O" : "X"
    return newState
}

function callWinner(board: Cell[][]) : Player | undefined {
    // rows
if (board[0][0] && board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
    return board[0][0];
  }
if (board[1][0] && board[1][0] === board[1][1] && board[1][1] === board[1][2]) {
    return board[1][0];
  }
if (board[2][0] && board[2][0] === board[2][1] && board[2][1] === board[2][2]) {
    return board[2][0];
  }

  // columns
if (board[0][0] && board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
    return board[0][0];
  }

if (board[0][1] && board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
    return board[0][1];
  }
if (board[0][2] && board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
    return board[0][2];
  }

  // diagonals

  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0];
  }
  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return board[0][2];
  }

  //
  return undefined
}

export type {Player, Cell, GameState}
export { makeMove, callWinner }