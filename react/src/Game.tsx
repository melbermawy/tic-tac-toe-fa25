import { useState, useEffect } from 'react'
import './App.css'
import type { GameState, Player } from "./tictactoe";
import { initialGameState } from './tictactoe';

function Game() {
  const [gameState, setGameState] = useState<GameState>(initialGameState)


  useEffect(() => {
  fetch("/api/game")
  .then(res => res.json())
  .then((data: GameState) => setGameState(data))
  .catch(err => console.error("error", err))
   }, [])


    async function handleClick(row: number, col: number) {
      if (gameState.winner || gameState.board[row][col]) return
      const updated = await fetch("/api/move", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ row, col })
      })
      .then(r => r.json())
      setGameState(updated);
    }

    const parentDiv = "min-h-screen w-full bg-neutral-600 text-neutral-900 flex flex-col items-center py-10"
    const divGrid = "grid grid-cols-3"
    const buttonDesign = "w-24 h-24 bg-gray-900 rounded-lg text-white text-3xl flex items-center justify-center"

      return(
    <div className={parentDiv}>
    <h1 className='text-5xl text-white font-semibold'>Tic Tac Toe</h1>
    
    <div className={divGrid}>
      <button className={buttonDesign} onClick={() => handleClick(0, 0)} >{gameState.board[0][0]}</button>
      <button className={buttonDesign} onClick={() => handleClick(0, 1)}>{gameState.board[0][1]}</button>
      <button className={buttonDesign} onClick={() => handleClick(0, 2)} >{gameState.board[0][2]}</button>
    </div>
    
    <div className={divGrid}>
      <button className={buttonDesign} onClick={() => handleClick(1, 0)}>{gameState.board[1][0]}</button>
      <button className={buttonDesign} onClick={() => handleClick(1, 1)}>{gameState.board[1][1]}</button>
      <button className={buttonDesign} onClick={() => handleClick(1, 2)}>{gameState.board[1][2]}</button>     
    </div>

    <div className={divGrid}>
      <button className={buttonDesign} onClick={() => handleClick(2, 0)}>{gameState.board[2][0]}</button>
      <button className={buttonDesign} onClick={() => handleClick(2, 1)}>{gameState.board[2][1]}</button>
      <button className={buttonDesign} onClick={() => handleClick(2, 2)}>{gameState.board[2][2]}</button>     
    </div> 

    <div className='text-white text-3xl'>
        {gameState.winner ? `Winner: ${gameState.winner}` : `Next player: ${gameState.currentPlayer}`}
    </div>
    </div>
  )
}

export default Game