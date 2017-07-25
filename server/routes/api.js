import express from 'express';
import { getStartTime } from '../lib/tools';

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
      //if replay does exist
    if(replay === null){
      //query twitch async
      //return data
      //add to database and return data to frontend

      getStartTime(req.params.replay_id)
      .then(data => {
        console.log(data);
        res.status(200).send({startTime: data});
      });
      // Tools.getStartTime(req.params.replay_id);
      // const newReplay = new Replay();
      // newReplay.videoID = req.params.replay_id;
      // newReplay.emotes = [
      //   {
      //     name : "Krappa",
      //     timings : [100, 200, 300]
      //   },
      //   {
      //     name : "PogCramp",
      //     timings : [44, 55, 66]
      //   }
      // ];  
      // newReplay.save((err) => {
      //   err && res.send(err);

      //   res.json({ message: 'Replay added! Thanks for contributing!'});
      // })
    } else {
      res.send(replay);
    }
  });
});

export default router;

