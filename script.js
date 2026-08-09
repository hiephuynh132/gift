const envelope = document.querySelector(".envelope");
const hint = document.querySelector(".hint");
const birthdayMusic = document.querySelector("#birthdayMusic");
const popperSound = document.querySelector("#popperSound");
const balloonLayer = document.querySelector(".balloon-layer");
const confettiLayer = document.querySelector(".confetti-layer");

const balloonColors = [
  "#ef4444",
  "#f59e0b",
  "#22c55e",
  "#38bdf8",
  "#a855f7",
  "#f472b6",
  "#fde047"
];

const confettiColors = [
  "#facc15",
  "#fb7185",
  "#60a5fa",
  "#34d399",
  "#c084fc",
  "#f97316",
  "#ffffff"
];

birthdayMusic.volume = 0.45;
popperSound.volume = 1;

function createBalloon(index) {
  const balloon = document.createElement("span");
  const size = 42 + Math.random() * 36;
  const left = 5 + Math.random() * 90;
  const drift = Math.random() * 160 - 80;
  const delay = Math.random() * 0.75;
  const duration = 5.6 + Math.random() * 2.2;

  balloon.className = "balloon";
  balloon.style.setProperty("--balloon-color", balloonColors[index % balloonColors.length]);
  balloon.style.setProperty("--balloon-size", `${size}px`);
  balloon.style.setProperty("--balloon-left", `${left}%`);
  balloon.style.setProperty("--balloon-drift", `${drift}px`);
  balloon.style.setProperty("--balloon-drift-mid", `${drift * 0.45}px`);
  balloon.style.setProperty("--balloon-delay", `${delay}s`);
  balloon.style.setProperty("--balloon-duration", `${duration}s`);

  balloonLayer.appendChild(balloon);
}

function launchBalloons() {
  balloonLayer.replaceChildren();

  for (let index = 0; index < 24; index += 1) {
    createBalloon(index);
  }
}

function clearBalloons() {
  balloonLayer.replaceChildren();
}

function createConfetti(index) {
  const confetti = document.createElement("span");
  const left = Math.random() * 100;
  const drift = Math.random() * 260 - 130;
  const delay = Math.random() * 1.1;
  const duration = 3.2 + Math.random() * 2.8;
  const width = 7 + Math.random() * 8;
  const height = 10 + Math.random() * 14;
  const rotation = Math.random() * 720 - 360;

  confetti.className = "confetti";
  confetti.style.setProperty("--confetti-color", confettiColors[index % confettiColors.length]);
  confetti.style.setProperty("--confetti-left", `${left}%`);
  confetti.style.setProperty("--confetti-drift", `${drift}px`);
  confetti.style.setProperty("--confetti-delay", `${delay}s`);
  confetti.style.setProperty("--confetti-duration", `${duration}s`);
  confetti.style.setProperty("--confetti-width", `${width}px`);
  confetti.style.setProperty("--confetti-height", `${height}px`);
  confetti.style.setProperty("--confetti-rotation", `${rotation}deg`);

  confettiLayer.appendChild(confetti);
}

function launchConfetti() {
  confettiLayer.replaceChildren();

  for (let index = 0; index < 90; index += 1) {
    createConfetti(index);
  }
}

function clearConfetti() {
  confettiLayer.replaceChildren();
}

function openEnvelope() {
  envelope.classList.add("is-open");
  envelope.setAttribute("aria-label", "Bao thu da mo");
  hint.textContent = "";
  launchConfetti();
  launchBalloons();

  popperSound.currentTime = 0;
  popperSound.play().catch(() => {});

  birthdayMusic.currentTime = 0;
  birthdayMusic.play().catch(() => {
    hint.textContent = "Bấm lại để phát nhạc";
  });
}

function resetEnvelope() {
  envelope.classList.remove("is-open");
  envelope.setAttribute("aria-label", "Mo bao thu");
  hint.textContent = "Ấn vào bao thư để mở";
  clearConfetti();
  clearBalloons();
  popperSound.pause();
  popperSound.currentTime = 0;
  birthdayMusic.pause();
  birthdayMusic.currentTime = 0;
}

envelope.addEventListener("click", () => {
  if (envelope.classList.contains("is-open")) {
    resetEnvelope();
    return;
  }

  openEnvelope();
});

envelope.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    envelope.click();
  }
});
