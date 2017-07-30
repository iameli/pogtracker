import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/api';
import mongoose from 'mongoose';
import Replay from './models/replay';

mongoose.connect(process.env.DATABASE,{
  useMongoClient : true
});

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', router);

app.listen(port, () => {
  console.log('Running on port: ' + 8080);
});

