import express from 'express';
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
 
    if(replay === null){
      const newReplay = new Replay();

      newReplay.videoID = req.params.replay_id;
      newReplay.save((err) => {
        err && res.send(err);

        res.json({ message: 'Replay added! Thanks for contributing!'});
      })
    } else {
      res.json({ message : "appreciate it, but that already exists!"});
    }
  });
});

export default router;

