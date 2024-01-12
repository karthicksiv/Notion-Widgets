class PomoTimer extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('pomo-timer-template');
        const node = document.importNode(template.content, true);
        this.appendChild(node);

        this.startBtn = this.querySelector('#start-btn');
        this.pauseBtn = this.querySelector('#pause-btn');
        this.resetBtn = this.querySelector('#reset-btn');
        this.workInput = this.querySelector('#work-time');
        this.breakInput = this.querySelector('#break-time');
        this.timerDisplay = this.querySelector('#timer-display');
        this.completedCyclesDisplay = this.querySelector('#completed-cycles');

        this.intervalId = null;
        this.remainingSeconds = parseInt(this.workInput.value) * 60;
        this.isWorkTime = true;
        this.completedCycles = 0;

        this.startBtn.addEventListener('click', () => this.startTimer());
        this.pauseBtn.addEventListener('click', () => this.pauseTimer());
        this.resetBtn.addEventListener('click', () => this.resetTimer());

        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    switchMode() {
        this.isWorkTime = !this.isWorkTime;
        this.remainingSeconds = this.isWorkTime ? parseInt(this.workInput.value) * 60 : parseInt(this.breakInput.value) * 60;
        this.updateDisplay();
    }

    startTimer() {
        if (this.intervalId) return;
        this.intervalId = setInterval(() => {
            this.remainingSeconds--;
            this.updateDisplay();
            if (this.remainingSeconds === 0) {
                if (this.isWorkTime) {
                    this.completedCycles++;
                    this.completedCyclesDisplay.textContent = `Completed Cycles: ${this.completedCycles}`;
                }
                this.switchMode();
            }
        }, 1000);
    }

    pauseTimer() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    resetTimer() {
        this.pauseTimer();
        this.isWorkTime = true;
        this.remainingSeconds = parseInt(this.workInput.value) * 60;
        this.completedCycles = 0;
        this.completedCyclesDisplay.textContent = 'Completed Cycles: 0';
        this.updateDisplay();
    }
}

window.customElements.define('pomo-timer', PomoTimer);
