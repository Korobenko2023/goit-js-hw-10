function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyElement = document.body;
let timerId;

startBtn.addEventListener('click', startChangeColor);
stopBtn.addEventListener('click', stopChangeColor);

function startChangeColor() {
    timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    bodyElement.style.backgroundColor = randomColor;
    }, 1000);
    startBtn.disabled = true;
}

function stopChangeColor() {
    clearInterval(timerId);
    startBtn.disabled = false;
}