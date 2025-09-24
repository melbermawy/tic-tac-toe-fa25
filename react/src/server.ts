import express from "express";
import ViteExpress from "vite-express";
import { initialGameState, makeMove, type GameState } from "./tictactoe";
import { callWinner } from "./tictactoe";

const app = express()
const PORT = 3001

let game = structuredClone(initialGameState)

app.use(express.json())

app.get("/api/game", (_, res) => {
    res.json(game)
})

type MoveReqBody = {
    row: number,
    col: number
}

app.post("/api/move", (req, res) => {
    const body = req.body as MoveReqBody
    game = makeMove(game, body.row, body.col)
    res.status(201).json(game)
})

ViteExpress.listen(app, PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
