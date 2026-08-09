const envelope = document.querySelector(".envelope");
const hint = document.querySelector(".hint");
const birthdayMusic = document.querySelector("#birthdayMusic");

birthdayMusic.volume = 0.55;

function openEnvelope() {
  envelope.classList.add("is-open");
  envelope.setAttribute("aria-label", "Bao thu da mo");
  hint.textContent = "";

  birthdayMusic.currentTime = 0;
  birthdayMusic.play().catch(() => {
    hint.textContent = "Bấm lại để phát nhạc";
  });
}

function resetEnvelope() {
  envelope.classList.remove("is-open");
  envelope.setAttribute("aria-label", "Mo bao thu");
  hint.textContent = "Ấn vào bao thư để mở";
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
