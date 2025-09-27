import express from "express";
import { WebSocketServer, WebSocket } from "ws";
import ViteExpress from "vite-express";
import { createInitialGameState, makeMove, callWinner, type GameState } from "./tictactoe";
import { db, client } from ".";
import { gamesTable } from "./db/schema";
import type { PgColumn } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm"


type MoveReqBody = {
  row: number;
  col: number;
  clientId: string;
};

type Role = "X" | "O" | "spectator"

const seats: Record<string, { X?: string; O?: string; byClient: Record<string, Role> }> = {}

function clientSeat(gameId: number, clientId: string): Role {
  const seat = seats[gameId] ?? (seats[gameId] = { byClient: {} })

  if (seat.byClient[clientId]) return seat.byClient[clientId]

  let role: Role = "spectator";
  if (!seat.X) { seat.X = clientId; role = "X"; }
  else if (!seat.O) { seat.O = clientId; role = "O"; }

  seat.byClient[clientId] = role
  return role;
}

function getSeat(gameId: number, clientId: string): Role | undefined {
  return seats[gameId]?.byClient?.[clientId];
}

const app = express();
const PORT = 3001;


const wsRooms = new Map<number, Set<WebSocket>>()
const wsRoom = (id: number) => wsRooms.get(id) ?? wsRooms.set(id, new Set()).get(id)!



app.use(express.json());

app.get("/api/game", async (_, res) => {
    const summaries = await db.select({ id: gamesTable.id, winner: gamesTable.winner }).from(gamesTable)
    res.json(summaries)
})

app.post("/api/game", async (_, res) => {
  const initial = { currentPlayer: "X", winner: null, board: createInitialGameState().board }
  const [{ id }] = await db.insert(gamesTable).values(initial).returning({ id: gamesTable.id })
  res.json({id, ...initial})
})


app.get("/api/game/:id", async (req, res) => {
    const paramID = Number(req.params.id)
    const game = await db.query.gamesTable.findFirst({ where: (g, { eq }) => (eq(g.id, paramID))})
    if (!game) return res.status(404).json({ error: "Game not found" })
    res.json(game);
});

app.post("/game/:id/join", async (req, res) => {
  const gameId = Number(req.params.id)
  const { clientId } = req.body as { clientId?: string }
  const game = await db.query.gamesTable.findFirst({ where: (g, { eq }) => (eq(g.id, gameId))})
  if (!clientId) {
    return res.status(400).json({ error: "clientId is required" })
  }
  const role = clientSeat(gameId, clientId)
  return res.json({ role })
});

app.post("/api/move/:id", async (req, res) => {
  const paramId = Number(req.params.id)
  const body = req.body as MoveReqBody;
  const current = await db.query.gamesTable.findFirst({ where: (g, { eq }) => eq(g.id, paramId) })
  if (!current) return res.status(404).json({ error: "Game not found "})
  const seat = getSeat(paramId, body.clientId);
  if (!seat || seat === "spectator") {
  return res.status(403).json({ error: "spectators cannot move" });
  }
  if (seat !== current.currentPlayer) {
  return res.status(403).json({ error: "not your turn" });
  }
  const moved = makeMove(current as GameState, body.row, body.col)
  const next = { ...moved, winner: callWinner(moved.board)}
  await db.update(gamesTable).set({ board: next.board, currentPlayer: next.currentPlayer, winner: next.winner}).where(eq(gamesTable.id, paramId))
  for (const client of wsRoom(paramId)) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "update", game: next }))
    }
  }
  res.status(201).json(next)
});

const server = ViteExpress.listen(app, PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const wss = new WebSocketServer({ port: 4000 })

wss.on("connection", (ws) => {
  ws.on("message", async (msg) => {
    const message = JSON.parse(msg.toString())
    if (message.type === "join") wsRoom(message.gameId).add(ws)
    const wsGame = await db.query.gamesTable.findFirst({ where: (g, { eq }) => eq(g.id, message.gameId)})
    if (wsGame && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "update", game: wsGame }))
    }
  })
  ws.on("close", () => {
    for (const set of wsRooms.values()) set.delete(ws)
  })
})
