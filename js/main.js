document.addEventListener('DOMContentLoaded', () => {
    const circularProgressBar = document.querySelector("#circularProgressBar");
    const circularProgressBarNumber = document.querySelector("#circularProgressBar .progress-value");
    const buttonTypePomodoro = document.querySelector("#buttonTypePomodoro");
    const buttonTypeShortBreak = document.querySelector("#buttonTypeShortBreak");

    const audio = new Audio('alarm.mp3');


    const formInputs = document.querySelector("#form-inputs");
    const inputPomodoro = parseFloat(document.getElementById("input-pomodoro").value);
    const inputShortBreak = document.querySelector("#input-short-break");

    formInputs.addEventListener("submit", (event) => {
        event.preventDefault();

        const pomodoro = parseFloat(document.getElementById("input-pomodoro").value);
        console.log(pomodoro)
    })










    const pomodoroTimerInSeconds = 1500;
    const shortBreakTimerInSeconds = 300;



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
        return `${minutes}:${seconds}`;
    }

    const startTimer = () => {
        progressInterval = setInterval(() => {
            timerValue--;
            setInfoCircularProgressBar();
        }, 1000);
    }

    const stopTimer = () =>  clearInterval(progressInterval);
    
    const resetTimer = () => {
        clearInterval(progressInterval);

        timerValue = (pomodoroType === TIMER_TYPE_POMODORO)
            ? pomodoroTimerInSeconds
            : shortBreakTimerInSeconds;

        multiplierFactor = 360 / timerValue;

        setInfoCircularProgressBar();
        // audio.stop();
    }

    const btnStartTimer = document.querySelector("#buttonStart");
    const btnStopTimer = document.querySelector("#buttonStop");
    const btnResetTimer = document.querySelector("#buttonReset");

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
