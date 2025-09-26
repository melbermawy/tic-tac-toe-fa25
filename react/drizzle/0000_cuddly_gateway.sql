CREATE TABLE "tic tac toe games" (
	"id" serial PRIMARY KEY NOT NULL,
	"currentPlayer" varchar(255) NOT NULL,
	"winner" varchar(255),
	"board" jsonb NOT NULL
);
