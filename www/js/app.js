// import
import '../css/style.css'

// init
const button = document.querySelector('#button');

// function
button.addEventListener('click', async () => {
    const hello = document.querySelector('#hello');

    // open PiP
    const pipWindow = await documentPictureInPicture.requestWindow(); // eslint-disable-line no-undef
    console.log('PiP opened!');

    hello.removeAttribute('style');
    pipWindow.document.body.append(hello);
    button.disabled = true;

    // close PiP
    pipWindow.addEventListener('unload', (event) => {
        const container = document.querySelector('#container');
        console.log('PiP closed!');

        const hello = event.target.querySelector('#hello');
        hello.style.display = 'none';
        container?.append(hello);
        button.disabled = false;
    });
});
