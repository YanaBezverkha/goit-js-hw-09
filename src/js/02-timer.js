import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const dateSelector = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const min = document.querySelector('[data-minutes]');
const sec = document.querySelector('[data-seconds]');
startBtn.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startWork(selectedDates);
  },
};

flatpickr(dateSelector, options);

function startWork(endDate) {
  const nowDate = new Date().getTime();
  const selectedDate = endDate[0].getTime();
  if (selectedDate - nowDate < 0) {
    Notify.failure('Please choose a date in the future');
  } else {
    startBtn.removeAttribute('disabled');
    startBtn.addEventListener('click', onStart);

    function onStart() {
      const inId = setInterval(showTimer, 1000);

      function showTimer() {
        const nowDate = new Date().getTime();

        if (selectedDate - nowDate <= 0) {
          clearInterval(inId);
          return;
        }

        const timer = convertMs(selectedDate - nowDate);
        days.textContent = timer.days;
        hours.textContent = timer.hours;
        min.textContent = timer.minutes;
        sec.textContent = timer.seconds;
      }
    }
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
