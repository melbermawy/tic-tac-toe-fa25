type Player = "O" | "X"
type Cell = Player | undefined
type GameState = {
    currentPlayer: Player;
    winner: Player | undefined;
    board: Cell[][]
}

function makeMove(gameState: GameState, row: number, col: number): GameState {
    const newState = structuredClone(gameState)
    newState.board[row][col] = gameState.currentPlayer
    newState.currentPlayer = (gameState.currentPlayer === "X") ? "O" : "X"
    return newState
}

export type {Player, Cell, GameState}
export { makeMove }