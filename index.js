import express from 'express';
import 'dotenv/config' // sets environment variables
import bodyParser from 'body-parser';
import { createUserHandler } from './routes/createUser';
import { loginHandler } from './routes/login';
import { getDecksHandler } from './routes/getDecks';
import { getDefaultCardsHandler } from './routes/getDefaultCards';
import { getGamesOfUserHandler } from './routes/getGamesOfUser';

const app = express();
const port = 8000;

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/createUser', createUserHandler);
app.post('/login', loginHandler);

app.get('/mydecks', getDecksHandler);
app.get('/myCards', getDecksHandler);
app.get('/myGames', getGamesOfUserHandler);
app.get('/defaultCards', getDefaultCardsHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
