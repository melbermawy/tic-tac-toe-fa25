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

  return(
    <>
    <h1>Tic Tac Toe</h1>
    
    <div className='grid grid-cols-3 gap-2'>
      <button>{gameState.board[0][0]}</button>
      <button className='border-l border-r'>{gameState.board[0][1]}</button>
      <button>{gameState.board[0][2]}</button>
    </div>
    
    <div className='grid grid-cols-3 gap-2'>
      <button className='border-t'>{gameState.board[1][0]}</button>
      <button className='border-t border-l border-r'>{gameState.board[1][1]}</button>
      <button className='border-t'>{gameState.board[1][2]}</button>     
    </div>

    <div className='grid grid-cols-3 gap-2'>
      <button className='border-t'>{gameState.board[2][0]}</button>
      <button className='border-t border-l border-r'>{gameState.board[2][1]}</button>
      <button className='border-t'>{gameState.board[2][2]}</button>     
    </div> 
    </>
  )

}

export default App
