import express from 'express';
import 'dotenv/config' // sets environment variables
import { binarySearchHandler } from './routes/binarySearch';
import bodyParser from 'body-parser';
import { createUserHandler } from './routes/createUser';

const app = express();
const port = 8000;

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/binarySearch', binarySearchHandler);

app.post('/createUser', createUserHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
