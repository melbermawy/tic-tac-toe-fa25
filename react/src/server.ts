import express from "express";
import ViteExpress from "vite-express";
import { createInitialGameState, makeMove, callWinner, type GameState } from "./tictactoe";


type MoveReqBody = {
  row: number;
  col: number;
};

const app = express();
const PORT = 3001;

const games = new Map<number, GameState>()
let nextID = 1

const seedId = nextID++
const newGame = createInitialGameState(seedId)
games.set(seedId, newGame)

app.use(express.json());

app.get("/api/game", (_, res) => {
    const summaries = Array.from(games.values()).map(g => ({id: g.id, winner: g.winner,}))
    res.json(summaries)
})

app.post("/api/game", (_, res) => {
    const id = nextID++
    const newGame = createInitialGameState(id)
    games.set(id, newGame)
    res.json(newGame)
})

app.get("/api/game/:id", (req, res) => {
    const paramID = Number(req.params.id)
    const game = games.get(paramID)
    if (!game) return res.status(404).json({ error: "Game not found" })
    res.json(game);
});

app.post("/api/move/:id", (req, res) => {
  const paramId = Number(req.params.id)
  const g = games.get(paramId)
  const body = req.body as MoveReqBody;
// to solve the type error with g
  if (!g) return res.status(404).json({ error: "Game not found" })

  const next = makeMove(g, body.row, body.col);
  next.winner = callWinner(next.board)
  games.set(paramId, next)
  res.status(201).json(next);
});

ViteExpress.listen(app, PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
