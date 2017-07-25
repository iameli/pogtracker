import express from 'express';
import { parseChat } from '../lib/tools';

const router = express.Router();

import mongoose from 'mongoose';
import Replay from '../models/replay';

router.use((req, res, next) => {
  console.log('Server pinged. What you want?');
  next();
});

router.get('/replay/:replay_id',(req, res) => {
  Replay.findOne({ videoID: req.params.replay_id }, (err, replay) => {
    err && res.send(err) 
    console.log("database success");

    if(replay === null){
      parseChat(req.params.replay_id)
      .then(({mostUsed, emotes}) => {

        let newReplay = new Replay({
          videoID : req.params.replay_id,
          mostUsed,
          emotes
        });

        newReplay.save((err, replay) => {
          err && res.send(err);
          res.send(replay);
        });
        
      });
    } else {
      res.send(replay);
    }
  });
});

export default router;

