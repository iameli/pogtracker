import express from 'express';
import proxy from 'http-proxy-middleware';
require('dotenv').config();

const app = express();

if(process.env.NODE_ENV === 'production'){
  const runServer = require('./server').runServer;

  process.chdir('server');
  runServer(process.env.PORT);

} else {
  app.use(proxy('http://localhost:3000/', {
    logLevel: 'warn',
    ws: true,
    router: {
      'localhost:4000/api': 'http://localhost:8080'
    }
  }));
}