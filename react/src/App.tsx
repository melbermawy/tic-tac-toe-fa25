import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import type { GameState, Player } from "./tictactoe";
import { makeMove, callWinner } from './tictactoe';
const initialGameState: GameState = {
  currentPlayer: "X",
  winner: undefined,
  board:[    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]]
}


function App() {
  const [gameState, setGameState] = useState<GameState>(initialGameState)



function handleClick(row: number, col: number) {
  const newState = makeMove(gameState, row, col);
  newState.winner = callWinner(newState.board)
  setGameState(newState);
  if (gameState.winner) return gameState
}


  return(
    <div className='min-h-screen w-full bg-neutral-600 text-neutral-900 flex flex-col items-center py-10'>
    <h1 className='text-5xl text-white font-semibold'>Tic Tac Toe</h1>
    
    <div className='grid grid-cols-3'>
      <button className='w-24 h-24 bg-gray-900 rounded-lg text-white text-3xl flex items-center justify-center' onClick={() => handleClick(0, 0)} >{gameState.board[0][0]}</button>
      <button className='w-24 h-24 bg-gray-900 rounded-lg text-white text-3xl flex items-center justify-center' onClick={() => handleClick(0, 1)}>{gameState.board[0][1]}</button>
      <button className='w-24 h-24 bg-gray-900 rounded-lg text-white text-3xl flex items-center justify-center' onClick={() => handleClick(0, 2)} >{gameState.board[0][2]}</button>
    </div>
    
    <div className='grid grid-cols-3'>
      <button className='w-24 h-24 bg-gray-900 rounded-lg text-white text-3xl flex items-center justify-center' onClick={() => handleClick(1, 0)}>{gameState.board[1][0]}</button>
      <button className='w-24 h-24 bg-gray-900 rounded-lg text-white text-3xl flex items-center justify-center' onClick={() => handleClick(1, 1)}>{gameState.board[1][1]}</button>
      <button className='w-24 h-24 bg-gray-900 rounded-lg text-white text-3xl flex items-center justify-center' onClick={() => handleClick(1, 2)}>{gameState.board[1][2]}</button>     
    </div>

    <div className='grid grid-cols-3'>
      <button className='w-24 h-24 bg-gray-900 rounded-lg text-white text-3xl flex items-center justify-center' onClick={() => handleClick(2, 0)}>{gameState.board[2][0]}</button>
      <button className='w-24 h-24 bg-gray-900 rounded-lg text-white text-3xl flex items-center justify-center' onClick={() => handleClick(2, 1)}>{gameState.board[2][1]}</button>
      <button className='w-24 h-24 bg-gray-900 rounded-lg text-white text-3xl flex items-center justify-center' onClick={() => handleClick(2, 2)}>{gameState.board[2][2]}</button>     
    </div> 
    <div className='text-white text-3xl'>{gameState.winner ? `Winner: ${gameState.winner}` : `Next player: ${gameState.currentPlayer}`}</div>
    </div>
  )

}

export default App
