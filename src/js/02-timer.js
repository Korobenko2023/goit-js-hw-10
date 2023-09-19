import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');

let timerInterval; 
startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];     
        if (selectedDate <= Date.now()) {
            Notiflix.Notify.failure("Please choose a date in the future");
        } else {
            startBtn.disabled = false;
        }
    },
};

const fp = flatpickr("#datetime-picker", options);

// flatpickr("#datetime-picker", options);
// const fp = document.querySelector("#datetime-picker")._flatpickr;

function updateTimer() {
    const selectedDate = new Date(fp.selectedDates[0]);
    const currentDate = new Date();
    const timeDifference = selectedDate - currentDate;

    if (timeDifference <= 0) {
        clearInterval(timerInterval);
        Notiflix.Notify.info('The countdown is complete');
        return;
    }

    const time = convertMs(timeDifference);
    days.textContent = addLeadingZero(time.days);
    hours.textContent = addLeadingZero(time.hours);
    minutes.textContent = addLeadingZero(time.minutes);
    seconds.textContent = addLeadingZero(time.seconds);
}

startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
});

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}