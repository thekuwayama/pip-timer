// import
import '../css/style.css'

// init
const open = document.getElementById('open');

// function
open.addEventListener('click', async () => {
    const timer = document.getElementById('timer');

    // open PiP
    const pipWindow = await documentPictureInPicture.requestWindow(); // eslint-disable-line no-undef
    console.log('PiP opened!');

    timer.removeAttribute('style');
    pipWindow.document.body.append(timer);
    open.disabled = true;

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
