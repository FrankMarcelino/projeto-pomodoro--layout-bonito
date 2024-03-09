document.addEventListener("DOMContentLoaded", () => {
    const circularProgressBar = document.querySelector("#circularProgressBar");
    const circularProgressBarNumber = document.querySelector("#circularProgressBar .progress-value");
    const buttonTypePomodoro = document.querySelector("#buttonTypePomodoro");
    const buttonTypeShortBreak = document.querySelector("#buttonTypeShortBreak");

    const audio = new Audio('alarm.mp3');
    const formInputs = document.querySelector("#form-inputs");

    const btnStartTimer = document.querySelector("#buttonStart");
    const btnStopTimer = document.querySelector("#buttonStop");
    const btnResetTimer = document.querySelector("#buttonReset");

    const displayPeriods = document.querySelector("#periods");
    const inputPeriod = document.querySelector("#input-period");
    let count = inputPeriod.value




    formInputs.addEventListener("submit", (event) => {
        event.preventDefault();

   
        let pomodoroTimerInSeconds = 0;
        let shortBreakTimerInSeconds = 0;
        const pomodoro = parseFloat(document.getElementById("input-pomodoro").value);
        const shortBreak = parseFloat(document.getElementById("input-short-break").value);
        pomodoroTimerInSeconds = pomodoro * 60;
        shortBreakTimerInSeconds = shortBreak * 60;
      

        const TIMER_TYPE_POMODORO = 'POMODORO';
        const TIMER_TYPE_SHORT_BREAK = 'SHORTBREAK';

        let progressInterval;
        let pomodoroType = TIMER_TYPE_POMODORO;
        let timerValue = pomodoroTimerInSeconds;
        let multiplierFactor = 360 / timerValue;


        function formatNumberInStringMinute(number) {

            const minutes = Math.trunc(number / 60)
                .toString()
                .padStart(2, '0');
            const seconds = Math.trunc(number % 60)
                .toString()
                .padStart(2, '0');
            console.log(`${minutes}:${seconds}`);
            return `${minutes}:${seconds}`;

        }

        function modifyPeriods(periods) {
            displayPeriods.textContent = `${periods}/${count}`
            count--
        }

        modifyPeriods(inputPeriod.value)
        const startTimer = () => {
            progressInterval = setInterval(() => {
                timerValue--;
                setInfoCircularProgressBar();
            }, 1000);
        }
        console.log(timerValue)
        const stopTimer = () => clearInterval(progressInterval);

        const resetTimer = () => {
            clearInterval(progressInterval);

            timerValue = (pomodoroType === TIMER_TYPE_POMODORO)
                ? pomodoroTimerInSeconds
                : shortBreakTimerInSeconds;

            multiplierFactor = 360 / timerValue;

            setInfoCircularProgressBar();
            // audio.stop();
        }

        btnStartTimer.addEventListener("click", startTimer);
        btnStopTimer.addEventListener("click", stopTimer);
        btnResetTimer.addEventListener("click", resetTimer);


        function setInfoCircularProgressBar() {

            if (timerValue === 0) {
                stopTimer();
                audio.play();
            }

            circularProgressBarNumber.textContent = `${formatNumberInStringMinute(timerValue)}`;
            circularProgressBar.style.background = `conic-gradient(var(--blue) ${timerValue * multiplierFactor}deg, var(--purple) 0deg)`;

        }

        const setPomodoroType = (type) => {
            pomodoroType = type;

            if (type === TIMER_TYPE_POMODORO) {
                buttonTypeShortBreak.classList.remove("active");
                buttonTypePomodoro.classList.add("active");
            } else {
                buttonTypePomodoro.classList.remove("active");
                buttonTypeShortBreak.classList.add("active");
            }

            resetTimer();
        }
    })


})


