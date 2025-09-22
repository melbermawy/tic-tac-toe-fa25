import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import type { GameState, Player } from "./tictactoe";
import { makeMove } from './tictactoe';
const initialGameState: GameState = {
  currentPlayer: "X",
  winner: undefined,
  board:[["X", "O", "X"], ["O", "O", "X"], ["X", "X", "O"]]
}


function App() {
  const [gameState, setGameState] = useState<GameState>(initialGameState)

  interface HandleClickProps {
    row: number;
    col: number;
  }

  function handleClick(row: number, col: number): void {
    const newBoard = structuredClone(gameState.board)
      newBoard[row] = gameState.board[row]
      newBoard[col] = gameState.board[col]
      newBoard[row][col] = gameState.currentPlayer
    const nextPlayer = (gameState.currentPlayer == "X") ? "O" : "X"
    // const winner = computeWinner(newBoard) need to make a winner function
    setGameState({
    board: newBoard,
    currentPlayer: nextPlayer,
    winner: undefined
  })
  }

  interface ComputeWinnerFn {
    (board: GameState["board"]) : Player | undefined
  }


  return(
    <>
    <h1>Tic Tac Toe</h1>
    
    <div className='grid grid-cols-3 gap-2'>
      <button onClick={() => handleClick(0, 0)}>{gameState.board[0][0]}</button>
      <button className='border-l border-r' onClick={() => handleClick(0, 1)}>{gameState.board[0][1]}</button>
      <button onClick={() => handleClick(0, 2)}>{gameState.board[0][2]}</button>
    </div>
    
    <div className='grid grid-cols-3 gap-2'>
      <button className='border-t' onClick={() => handleClick(1, 0)}>{gameState.board[1][0]}</button>
      <button className='border-t border-l border-r' onClick={() => handleClick(1, 1)}>{gameState.board[1][1]}</button>
      <button className='border-t' onClick={() => handleClick(1, 2)}>{gameState.board[1][2]}</button>     
    </div>

    <div className='grid grid-cols-3 gap-2'>
      <button className='border-t' onClick={() => handleClick(2, 0)}>{gameState.board[2][0]}</button>
      <button className='border-t border-l border-r' onClick={() => handleClick(2, 1)}>{gameState.board[2][1]}</button>
      <button className='border-t' onClick={() => handleClick(2, 2)}>{gameState.board[2][2]}</button>     
    </div> 
    </>
  )

}

export default App
