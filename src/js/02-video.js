import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME = 'videoplayer-current-time';

const player = new Player('vimeo-player');

const getCurrentTime = ({ seconds }) => {
  // console.log(seconds);
  localStorage.setItem(CURRENT_TIME, seconds);
};

const savedCurrentTime = localStorage.getItem(CURRENT_TIME);

player.setCurrentTime(savedCurrentTime);

player.on('timeupdate', throttle(getCurrentTime, 1000));
// player.off('timeupdate', getCurrentTime);
