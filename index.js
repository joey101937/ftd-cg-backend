import express from 'express';
import 'dotenv/config' // sets environment variables
import { calculateValue } from './Services/calculationService';
import { binarySearchHandler } from './routes/binarySearch';
import bodyParser from 'body-parser';
import {getSequelize} from './sequelize/models';
import { createUserHandler } from './routes/createUser';

const app = express();
const port = 8000;

const verifyDb = async () => {
  console.log('checking db connection...');
  try {
    const {sequelize} = getSequelize();
    await sequelize.authenticate();
    console.log('Connection established');
  } catch(e) {
    console.log('DB CONNECTION FAILED');
    console.log(e.message, e);
  }
}

verifyDb();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/binarySearch', binarySearchHandler);

app.post('/createUser', createUserHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
