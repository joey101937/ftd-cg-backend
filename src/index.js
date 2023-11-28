import express from 'express';
import 'dotenv/config'; // sets environment variables
import bodyParser from 'body-parser';
import { createUserHandler } from './routes/createUser';
import { loginHandler } from './routes/login';
import { getDecksHandler } from './routes/getDecks';
import { getDefaultCardsHandler } from './routes/getDefaultCards';
import { getMyGamesHandler } from './routes/getMyGamesHandler';
import { createGameHandler } from './routes/createGame';
import { gameActionHandler } from './routes/gameAction';
import { stageDbHandler } from './routes/stageDb';
import { getCustomCardsHandler } from './routes/getCards';
import { upsertDeckHandler } from './routes/upsertDeckHandler';
import { deleteDeckHandler } from './routes/deleteDeckHandler';
import { getGameByIdHandler } from './routes/getGameById';

const app = express();
const port = 8000;

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/createUser', createUserHandler);
app.post('/login', loginHandler);

app.get('/deck', getDecksHandler);
app.post('/deck', upsertDeckHandler);
app.delete('/deck/:deckId', deleteDeckHandler);

app.get('/myCards', getCustomCardsHandler);
app.get('/defaultCards', getDefaultCardsHandler);


app.get('/game', getMyGamesHandler);
app.get('/game/:gameId', getGameByIdHandler);
app.post('/game', createGameHandler);

app.post('/gameAction', gameActionHandler);

app.post('/stageDb', stageDbHandler);

app.listen(port, () => {
  console.log(`FTD-CG listening on port ${port}!`);
});
