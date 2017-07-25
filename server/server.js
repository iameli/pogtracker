import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/api';

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/api', router);

app.listen(port, () => {
  console.log('Running on port: ' + 8080);
});

