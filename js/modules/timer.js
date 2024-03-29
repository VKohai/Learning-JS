function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    }
    return num;
}

function timer(timerSelector, deadline) {
    const timerController = {
        getTimeRemaining: (endtime) => {
            let days, hours, minutes, seconds;
            // Get the difference between deadline and current date
            const t = Date.parse(endtime) - new Date();
            if (t <= 0) {
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
            } else {
                days = Math.floor(t / (1000 * 60 * 60 * 24));
                hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                minutes = Math.floor((t / 1000 / 60) % 60);
                seconds = Math.floor((t / 1000) % 60);
            }

            return {
                total: t,
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds,
            };
        },
        setClock: (selector, endtime) => {
            const timer = document.querySelector(selector),
                days = timer.querySelector("#days"),
                hours = timer.querySelector("#hours"),
                minutes = timer.querySelector("#minutes"),
                seconds = timer.querySelector("#seconds"),
                timerInterval = setInterval(updateClock, 1000);

            // Initializing the timer in order to not wait 1 sec
            updateClock();

            function updateClock() {
                const t = timerController.getTimeRemaining(endtime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if (t.total <= 0) {
                    clearInterval(timerInterval);
                }
            }
        },
    };

    timerController.setClock(timerSelector, deadline);
}

export default timer;
export { getZero };