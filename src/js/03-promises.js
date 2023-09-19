import Notiflix from 'notiflix';

const inputDelay = document.querySelector('[name="delay"]');
const inputStep = document.querySelector('[name="step"]');
const inputAmount = document.querySelector('[name="amount"]');
const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) { 
  event.preventDefault();
  let delay = Number(inputDelay.value);
  let step = Number(inputStep.value);
  let amount = Number(inputAmount.value);
  
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });  
    delay += step;     
  }
}              

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {    
    setTimeout(() => {     
      const shouldResolve = Math.random() > 0.3; 
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
    }
    }, delay);
  }); 
}