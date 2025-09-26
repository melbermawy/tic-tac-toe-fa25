import { varchar, jsonb, pgTable, serial } from "drizzle-orm/pg-core"
import type { Board } from "../tictactoe"

export const gamesTable = pgTable("tic tac toe games", {
    id: serial('id').primaryKey(),
    currentPlayer: varchar({ length: 255 }).notNull(),
    winner: varchar({ length: 255 }),
    board: jsonb().$type<Board>().notNull()
})