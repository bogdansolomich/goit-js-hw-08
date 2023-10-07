import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
    const player = new Player(iframe);


const onPlay = function (data) {
     // data is an object containing properties specific to that event
    localStorage.setItem('videoplayer-current-time', data.seconds);
};
console.log(localStorage)
console.log();

 player.on('timeupdate', throttle(onPlay, 1000));

const currentTime = Number(localStorage.getItem('videoplayer-current-time'));
 
console.log(currentTime)

 player.setCurrentTime(currentTime).then(function (seconds) {
  // seconds = the actual time that the player seeked to
 }).catch(function (error) {
       switch (error.name) {
     case 'RangeError':
        //  the time was less than 0 or greater than the video’s duration
               break;
           default:
          // some other error occurred
             break;
    }
 });