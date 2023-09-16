const INTERVAL_MILLI_SECOND = 1000;

let defaultRemainingTime = null;
let endTime = null;
let remainingTime = null;
let timerInterval = null;

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

    if (remainingTime == null) {
        remainingTime = defaultRemainingTime;
    }

    target.innerHTML = formatTime(remainingTime);
}

const start = (target) => {
    if (!target) return;
    if (timerInterval) return;
    if (remainingTime == 0) return;

    endTime = new Date(Date.now() + remainingTime);
    timerInterval = window.setInterval(() => {
        remainingTime = endTime - Date.now();
        if (remainingTime <= 0) {
            remainingTime = 0;
            target.innerHTML = formatTime(remainingTime);
            stop();
            // TODO: beep
        } else {
            target.innerHTML = formatTime(remainingTime);
        }
    }, INTERVAL_MILLI_SECOND);
}

const stop = () => {
    if (!timerInterval) return;

    window.clearInterval(timerInterval);
    timerInterval = null;
}

const reset = (target) => {
    if (!target) return;

    stop();
    endTime = null;
    remainingTime = defaultRemainingTime;
    target.innerHTML = formatTime(remainingTime);
}

export { start, stop, reset, setTimer }
