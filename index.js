import express from 'express';
import { calculateValue } from './Services/calculationService';
import { binarySearchHandler } from './routes/binarySearch';
import bodyParser from 'body-parser';

const app = express();
const port = 8000;

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send(`Calculated value is ${calculateValue() || '<Error>'}`);
});

app.get('/jsonTest', (req, res) => {
  res.status(207).json({ // res.json default is status 200
    message: 'done',
  });
});

app.post('/binarySearch', binarySearchHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
