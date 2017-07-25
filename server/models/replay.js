import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ReplaySchema = new Schema({
  videoID : {
    type : Number,
    required : true
  }
});

const Replay = mongoose.model('Replay', ReplaySchema);

export default Replay;

