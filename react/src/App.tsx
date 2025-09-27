import { useState } from "react"
import Game from "./Game";
import GameLobby from "/Users/mohamed/Documents/fractal-fa25/tic-tac-toe1/react/src/GameLobby.tsx"
import { getCreateClientId } from "/Users/mohamed/Documents/fractal-fa25/tic-tac-toe1/react/src/tictactoe.ts"

export default function App() { 
  const [selectedGame, setSelectedGame] = useState<number|null>(null)   //that way if it's null it renders the list

  async function handleCreateGame() {
  const newGame = await fetch("/api/game", { method: "POST" })
    .then((r) => r.json());
  setSelectedGame(newGame.id);
}


  
return selectedGame=== null ? (
  <GameLobby 
    onPick={setSelectedGame} 
    onCreateClick={handleCreateGame} 
  />
) : (
  <Game 
    gameID={selectedGame} 
    onBack={() => setSelectedGame(null)} 
  />
)

}
