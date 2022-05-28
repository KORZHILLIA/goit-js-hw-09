const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

changeBodyColor = event => {
  event.currentTarget.disabled;
  timerId = setInterval(() => {
    const currentColor = getRandomHexColor();
    document.body.style.backgroundColor = currentColor;
  }, 1000);
};

stopChangeBodyColor = () => {
  clearInterval(timerId);
  !startBtn.disabled;
};

getRandomHexColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

startBtn.addEventListener('click', changeBodyColor);
stopBtn.addEventListener('click', stopChangeBodyColor);
