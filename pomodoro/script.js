document.getElementById('start-button').addEventListener('click', startTimer);
document.getElementById('reset-button').addEventListener('click', resetTimer);

let isTimerRunning = false;
let timerDuration = 25 * 60; // 25 minutes
let timerId;

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timerId = setInterval(() => {
            if (timerDuration > 0) {
                timerDuration--;
                updateDisplay();
            } else {
                alert('Time is up!');
                resetTimer();
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerDuration = 25 * 60;
    updateDisplay();
    isTimerRunning = false;
}

function updateDisplay() {
    const minutes = Math.floor(timerDuration / 60);
    const seconds = timerDuration % 60;
    document.getElementById('timer-display').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
