import '../css/style.css'
import { start, stop, reset, setTimer, isStarted } from './timer'
import { bell } from './bell'

const minutes = document.getElementById('minutes');
const clock = document.getElementById('clock');
const progress = document.getElementById('progress');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

minutes?.addEventListener('click', () => {
    if (isStarted()) {
        return
    }

    setTimer(clock, progress, minutes.value * 60 * 1000);
});
startBtn?.addEventListener('click', () => {
    start(clock, progress, bell);
    minutes.disabled = true;
});
stopBtn?.addEventListener('click', () => {
    stop();
    minutes.disabled = false;
});
resetBtn?.addEventListener('click', () => {
    reset(clock);
    setTimer(clock, progress, minutes.value * 60 * 1000);
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
    const clock = pipWindow.document.getElementById('clock');

    if (!isStarted()) {
        setTimer(clock, progress, minutes.value * 60 * 1000);
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
