import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME = 'videoplayer-current-time';

const player = new Player('vimeo-player');

const getCurrentTime = ({ seconds }) => {
  // console.log(seconds);
  localStorage.setItem(CURRENT_TIME, seconds);
};

const savedCurrentTime = localStorage.getItem(CURRENT_TIME);

player
  .setCurrentTime(savedCurrentTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

player.on('timeupdate', throttle(getCurrentTime, 1000));
// player.off('timeupdate', getCurrentTime);
