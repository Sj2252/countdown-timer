let countdown;
let totalSeconds;
let initialTotalSeconds;
let isPaused = false;

function startTimer() {
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;

  totalSeconds = hours * 3600 + minutes * 60 + seconds;
  initialTotalSeconds = totalSeconds;

  if (totalSeconds <= 0) {
    alert('Please enter a valid time');
    return;
  }

  isPaused = false;

  document.getElementById('timer-input').classList.add('hidden');
  document.getElementById('button-group').classList.add('visible');
  document.getElementById('resume-button').style.display = 'none';
  document.getElementById('reset-button').style.display = 'none';
  document.getElementById('stop-button').style.display = 'inline-block';

  clearInterval(countdown);
  updateDisplay();
  updateProgressBar();

  countdown = setInterval(() => {
    totalSeconds--;
    updateDisplay();
    updateProgressBar();

    if (totalSeconds <= 0) {
      resetTimer();
      playAlarm();
      alert('Time is up!');
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(countdown);
  isPaused = true;

  document.getElementById('stop-button').style.display = 'none';
  document.getElementById('resume-button').style.display = 'inline-block';
  document.getElementById('reset-button').style.display = 'inline-block';
}

function resumeTimer() {
  if (!isPaused) return;

  document.getElementById('resume-button').style.display = 'none';
  document.getElementById('reset-button').style.display = 'none';
  document.getElementById('stop-button').style.display = 'inline-block';

  countdown = setInterval(() => {
    totalSeconds--;
    updateDisplay();
    updateProgressBar();

    if (totalSeconds <= 0) {
      resetTimer();
      playAlarm();
      alert('Time is up!');
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(countdown);
  isPaused = false;

  document.getElementById('timer-input').classList.remove('hidden');
  document.getElementById('button-group').classList.remove('visible');

  document.getElementById('hours-display').textContent = '0';
  document.getElementById('minutes-display').textContent = '00';
  document.getElementById('seconds-display').textContent = '00';
  document.getElementById('progress-bar').style.width = '100%';

  document.getElementById('hours').value = '';
  document.getElementById('minutes').value = '';
  document.getElementById('seconds').value = '';
}

function updateDisplay() {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById('hours-display').textContent = hours;
  document.getElementById('minutes-display').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds-display').textContent = seconds.toString().padStart(2, '0');
}

function updateProgressBar() {
  const progress = (totalSeconds / initialTotalSeconds) * 100;
  document.getElementById('progress-bar').style.width = `${progress}%`;
}

function playAlarm() {
  const sound = document.getElementById('alarm-sound');
  sound.play();
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      alert(`Error attempting fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    startTimer();
  }
});
