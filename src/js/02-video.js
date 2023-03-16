import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME = 'videoplayer-current-time';
const player = new Player('vimeo-player');

player.on('timeupdate', throttle(getCurrentTime, 1000));

function getCurrentTime(data) {
    localStorage.setItem(CURRENT_TIME, data.seconds);
}

player.setCurrentTime(localStorage.getItem(CURRENT_TIME) || 0);