let endTime = null;
let remainingTime = 25 * 60000;
let timerInterval = null;

const formatTime = (time) => {
    const date = new Date(time);
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return minutes + ':' + seconds;
}

const start = (target) => {
    if (!target) return;
    if (timerInterval) return;

    endTime = new Date(Date.now() + remainingTime);
    timerInterval = window.setInterval(() => {
        remainingTime = endTime - Date.now();
        target.innerHTML = formatTime(remainingTime);
    }, 500);
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
    remainingTime = 25 * 60000;
    target.innerHTML = formatTime(remainingTime);
}

export { start, stop, reset }
