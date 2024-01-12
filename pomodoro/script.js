let isTimerRunning = false;
let timerDuration = 25 * 60; // 25 minutes in seconds
let interval;

const timerDisplay = document.getElementById('timer');
const startStopBtn = document.getElementById('start-stop-btn');

startStopBtn.addEventListener('click', function() {
    if (isTimerRunning) {
        clearInterval(interval);
        startStopBtn.textContent = 'Start';
    } else {
        startStopBtn.textContent = 'Stop';
        interval = setInterval(function() {
            if (timerDuration <= 0) {
                clearInterval(interval);
                alert('Pomodoro complete!');
                resetTimer();
                return;
            }
            timerDuration--;
            updateTimerDisplay();
        }, 1000);
    }
    isTimerRunning = !isTimerRunning;
});

function updateTimerDisplay() {
    const minutes = Math.floor(timerDuration / 60);
    const seconds = timerDuration % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function resetTimer() {
    timerDuration = 25 * 60;
    updateTimerDisplay();
    startStopBtn.textContent = 'Start';
}

updateTimerDisplay();
