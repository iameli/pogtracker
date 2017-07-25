import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const router = express.Router();
const port = 8080;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

router.get('/',(req, res) => {
  res.json({message: 'What can I do for you?'})
});

app.use('/api', router);

app.listen(port);
console.log('Running on port: ' + 8080);

