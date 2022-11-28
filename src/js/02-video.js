// npm install @vimeo/player
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const PAUSED_TIME = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay({ seconds }) {
  localStorage.setItem(PAUSED_TIME, seconds);
}
setCurrentTime();
function setCurrentTime() {
  if (!localStorage.getItem(PAUSED_TIME)) {
    return;
  }
  player.setCurrentTime(localStorage.getItem(PAUSED_TIME));
}
