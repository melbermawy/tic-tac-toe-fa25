import { useState, useEffect } from "react";
import "./App.css";
  type Player = "X" | "O"
  type GameSummary = { id: number; winner: Player | undefined }
  type LobbyProps = {
    onPick: (id: number) => void,
    onCreateClick: () => void
  }

export default function GameLobby({onPick, onCreateClick}: LobbyProps) {
  const [gameList, setGameList] = useState<GameSummary[]>([]);

  useEffect(() => {
    fetch(`/api/game`)
      .then((res) => res.json())
      .then((data: GameSummary[]) => setGameList(data))
      .catch((err) => console.error("error", err));
  }, []);

      const parentDiv =
    "min-h-screen w-full bg-neutral-600 text-neutral-900 flex flex-col items-center py-10"

      return (
    <div className={parentDiv}>
      <h1 className="text-3xl text-white font-bold mb-2">Tic-Tac-Toe Lobby</h1>
      <p className="mb-6 text-white text-sm">
        By Mohamad Abdou
      </p>
      <p className="mb-6 text-white">
        Join an existing game or start a new one.
      </p>


      <button
        className="bg-[#2e2e2e] hover:bg-black px-4 py-2 rounded mb-6 mt-1 text-white"
        onClick={onCreateClick}
      >
        Create New Game
      </button>

      <ul className="w-full max-w-md divide-y divide-gray-700">
        {gameList.map((g) => (
          <li
            key={g.id}
            className="flex justify-between items-center py-3 px-4 hover:bg-gray-800 cursor-pointer"
          >
            <span className="font-medium text-white">Game #{g.id}</span>
            <span className="text-[#dedede]">
              {g.winner ? `${g.winner} won` : "In progress"}
            </span>
            <button className="bg-[#2e2e2e] hover:bg-black px-4 py-2 rounded mb-6 text-white" onClick={() => onPick(g.id)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  )
}