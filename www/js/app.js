import '../css/style.css'
import { start, stop, reset } from './timer'

const open = document.getElementById('open');
open.addEventListener('click', async () => {
    const timer = document.getElementById('timer');

    // open PiP
    const pipWindow = await documentPictureInPicture.requestWindow(); // eslint-disable-line no-undef
    console.log('PiP opened!');

    timer.removeAttribute('style');
    pipWindow.document.body.append(timer);
    open.disabled = true;

    const time = pipWindow.document.getElementById('time');
    const startBtn = pipWindow.document.getElementById('start');
    const stopBtn = pipWindow.document.getElementById('stop');
    const resetBtn = pipWindow.document.getElementById('reset');
    startBtn?.addEventListener('click', () => {
        start(time);
    });
    stopBtn?.addEventListener('click', () => {
        stop();
    });
    resetBtn?.addEventListener('click', () => {
        reset(time);
    });

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
