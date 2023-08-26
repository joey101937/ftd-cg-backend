import express from 'express';
import 'dotenv/config' // sets environment variables
import bodyParser from 'body-parser';
import { createUserHandler } from './routes/createUser';
import { loginHandler } from './routes/login';
import { getDecksHandler } from './routes/getDecks';
import { getDefaultCardsHandler } from './routes/getDefaultCards';

const app = express();
const port = 8000;

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/createUser', createUserHandler);
app.post('/login', loginHandler);

app.get('/decks', getDecksHandler);
app.get('/customCards', getDecksHandler);
app.get('/defaultCards', getDefaultCardsHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
