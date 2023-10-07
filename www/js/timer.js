let defaultRemainingTime = null;
let endTime = null;
let remainingTime = null;
let requestID = null;

const formatTime = (time) => {
    const date = new Date(time);
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return minutes + ':' + seconds;
}

const setTimer = (target, time) => {
    if (defaultRemainingTime != time) {
        defaultRemainingTime = time;
    }

    remainingTime = time;
    target.innerHTML = formatTime(time);
}

const start = (target, audio, bell) => {
    if (requestID) return;
    if (remainingTime == 0) return;

    endTime = new Date(Date.now() + remainingTime);
    const doStart = () => {
        remainingTime = endTime - Date.now();
        if (remainingTime <= 0) {
            remainingTime = 0;
            target.innerHTML = formatTime(remainingTime);
            stop();
            play(audio, bell);
        } else {
            target.innerHTML = formatTime(remainingTime);
            // setInterval() だとバックグランドタブにて、
            // スロットリングされしまうため requestAnimationFrame() を使用します。
            requestID = requestAnimationFrame(doStart);
        }
    };

    requestAnimationFrame(doStart);
}

const play = (audio, base64) => {
    audio.src = 'data:audio/mp3;base64,' + base64;
    audio.play();
}

const stop = () => {
    if (!requestID) return;

    cancelAnimationFrame(requestID);
    requestID = null;
    endTime = null;
}

const reset = () => {
    stop();
    remainingTime = defaultRemainingTime;
}

const isStarted = () => {
    return remainingTime != defaultRemainingTime;
}

export { start, stop, reset, setTimer, isStarted }
