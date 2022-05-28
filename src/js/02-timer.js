import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
const timeInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

startBtn.disabled = true;

let selectedTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      setTimeout(() => alert('no'), 500);
    } else {
      startBtn.disabled = false;
    }
    selectedTime = selectedDates[0];
  },
};
const coolDateChoose = flatpickr(timeInput, options);

showRestTime = () => {
  const endTime = selectedTime.getTime();
  setInterval(() => {
    const requiredInfo = convertMs(endTime - Date.now());
    const arr = document.querySelectorAll('.value');
    arr.forEach(field => {
      const name = field.dataset;
    });
    // const { days, hours, minutes, seconds } = convertMs(endTime - Date.now());
    // const hdays = document.querySelector('[data-days]');
    // const hhours = document.querySelector('[data-hours]');
    // const hminutes = document.querySelector('[data-minutes]');
    // const hseconds = document.querySelector('[data-seconds]');
    // hdays.textContent = days;
    // hhours.textContent = hours;
    // hminutes.textContent = minutes;
    // hseconds.textContent = seconds;
  }, 1000);
};

startBtn.addEventListener('click', showRestTime);

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
