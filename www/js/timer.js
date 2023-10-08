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

const setTimer = (clock, progress, time) => {
    if (defaultRemainingTime != time) {
        defaultRemainingTime = time;
    }

    remainingTime = time;
    clock.innerHTML = formatTime(time);
    loadProgress(progress);
}

const start = (clock, progress, bell) => {
    if (requestID) return;
    if (remainingTime == 0) return;

    endTime = new Date(Date.now() + remainingTime);
    const doStart = () => {
        remainingTime = endTime - Date.now();
        if (remainingTime <= 0) {
            remainingTime = 0;
            clock.innerHTML = formatTime(remainingTime);
            loadProgress(progress);
            stop();
            play(bell);
        } else {
            clock.innerHTML = formatTime(remainingTime);
            // setInterval() だとバックグランドタブにて、
            // スロットリングされしまうため requestAnimationFrame() を使用します。
            loadProgress(progress);
            requestID = requestAnimationFrame(doStart);
        }
    };

    requestAnimationFrame(doStart);
}

const play = (base64) => {
    let audio = new Audio('data:audio/mp3;base64,' + base64);
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

const loadProgress = (progress) => {
    progress.value = remainingTime / defaultRemainingTime * 100;
}

export { start, stop, reset, setTimer, isStarted }
