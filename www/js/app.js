import '../css/style.css'
import { start, stop, reset, setTimer, isStarted } from './timer'
import { bell } from './bell'

const minutes = document.getElementById('minutes');
const time = document.getElementById('time');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

// PiP の場合バックグラウンドタブ で new Audio しても音を鳴らせない。
// document 側で audio Element を作成して、PiP に渡せば鳴らせます。
let audio = document.createElement('audio');

minutes?.addEventListener('click', () => {
    if (isStarted()) {
        return
    }

    setTimer(time, minutes.value * 60 * 1000);
});
startBtn?.addEventListener('click', () => {
    start(time, audio, bell);
    minutes.disabled = true;
});
stopBtn?.addEventListener('click', () => {
    stop();
    minutes.disabled = false;
});
resetBtn?.addEventListener('click', () => {
    reset(time);
    setTimer(time, minutes.value * 60 * 1000);
    minutes.disabled = false;
});

const open = document.getElementById('open');
open.addEventListener('click', async () => {
    const timer = document.getElementById('timer');

    // open PiP
    const pipWindow = await documentPictureInPicture.requestWindow(); // eslint-disable-line no-undef
    console.log('PiP opened!');

    timer.removeAttribute('style');
    pipWindow.document.body.append(timer);
    open.disabled = true;

    const minutes = pipWindow.document.getElementById('minutes');
    const time = pipWindow.document.getElementById('time');

    if (!isStarted()) {
        setTimer(time, minutes.value * 60 * 1000);
    }

    // close PiP
    pipWindow.addEventListener('unload', (event) => {
        const container = document.getElementById('container');
        console.log('PiP closed!');

        const timer = event.target.getElementById('timer');
        timer.style.display = 'none';
        container?.append(timer);
        open.disabled = false;
    });
});
