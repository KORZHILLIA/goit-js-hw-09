import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
      Notify.failure('Please choose a date in the future', {
        timeout: 1000,
        width: '390px',
        distance: '60px',
        fontSize: '20px',
      });
    } else {
      startBtn.disabled = false;
    }
    selectedTime = selectedDates[0];
  },
};
const coolDateChoose = flatpickr(timeInput, options);

const addLeadingZero = value => String(value).padStart(2, '0');
const addLeadingZeros = value => String(value).padStart(3, '0');

const showRestTime = () => {
  const endTime = selectedTime.getTime();
  const timerId = setInterval(() => {
    const currentTime = endTime - Date.now();
    if (currentTime <= 0) {
      clearInterval(timerId);
      return;
    }
    const labelsArr = document.querySelectorAll('.label');
    labelsArr.forEach(label => {
      const span = label.previousElementSibling;
      span.textContent =
        label.textContent === 'Days'
          ? addLeadingZeros(
              convertMs(currentTime)[label.textContent.toLowerCase()]
            )
          : addLeadingZero(
              convertMs(currentTime)[label.textContent.toLowerCase()]
            );
    });
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
