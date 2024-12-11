let countdown;
let totalSeconds;
let timeRemaining;
let hours, minutes, seconds;
const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');
const progressBar = document.getElementById('progressBar');

startBtn.addEventListener('click', () => {
  hours = parseInt(document.getElementById('hours').value) || 0;
  minutes = parseInt(document.getElementById('minutes').value) || 0;
  seconds = parseInt(document.getElementById('seconds').value) || 0;

  totalSeconds = hours * 3600 + minutes * 60 + seconds;
  timeRemaining = totalSeconds;

  if (timeRemaining <= 0) {
    message.textContent = "Please set a valid time.";
    return;
  }

  updateDisplay();
  updateProgressBar();

  startBtn.disabled = true;
  resetBtn.disabled = false;
  stopBtn.disabled = false;

  countdown = setInterval(() => {
    if (timeRemaining <= 0) {
      clearInterval(countdown);
      message.textContent = "Complete!";
      resetTimer();
      return;
    }

    timeRemaining--;
    updateDisplay();
    updateProgressBar();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(countdown);
  startBtn.disabled = false;
  stopBtn.disabled = true;
  message.textContent = "Stopped.";
});

resetBtn.addEventListener('click', () => {
  clearInterval(countdown);
  resetTimer();
  message.textContent = "Timer Reset.";
});

function updateDisplay() {
  let h = Math.floor(timeRemaining / 3600);
  let m = Math.floor((timeRemaining % 3600) / 60);
  let s = timeRemaining % 60;

  timerDisplay.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function pad(num) {
  return num < 10 ? `0${num}` : num;
}

function updateProgressBar() {
  const percentage = (timeRemaining / totalSeconds) * 100;
  progressBar.style.width = `${percentage}%`;
}

function resetTimer() {
  timerDisplay.textContent = "00:00";
  progressBar.style.width = "0%";
  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = true;
}

