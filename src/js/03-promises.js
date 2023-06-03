import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector(".form");
const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

formEl.addEventListener("submit", onStart);

function onStart(event) {
  event.preventDefault();
  const delay = Number(delayEl.value);
  const step = Number(stepEl.value);
  const amount = amountEl.value;
  for (let i = 0; i < amount; i++) {
    let interval = delay + step * i;
    let position = i + 1;
    createPromise(position, interval)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  formEl.reset()
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
