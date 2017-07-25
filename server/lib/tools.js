import emoteNames from './data';

function Tools(){}

Tools.prototype.getStartTime = function(videoID){
  console.log(emoteNames, videoID);
};

export default new Tools();