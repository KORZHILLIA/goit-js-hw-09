import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const { delay, step, amount } = form.elements;

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const normalisedDelay = Number(delay.value);
  const normalisedStep = Number(step.value);
  const normalisedAmount = Number(amount.value);
  for (let i = 0; i < normalisedAmount; i += 1) {
    const totalDelay = normalisedDelay + i * normalisedStep;
    createPromise(i + 1, totalDelay)
      .then(({ position, delay }) =>
        Notify.success(`Fullfilled promise ${position} in ${delay} ms`)
      )
      .catch(({ position, delay }) =>
        Notify.failure(`Fullfilled promise ${position} in ${delay} ms`)
      );
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
