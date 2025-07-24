const screens = document.querySelectorAll(".screen");
let currentScreen = 0;

document.addEventListener("DOMContentLoaded", () => {
  showScreen(currentScreen);
});

document.addEventListener("click", nextScreen);
document.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") nextScreen();
});

function nextScreen() {
  currentScreen++;
  if (currentScreen >= screens.length) currentScreen = screens.length - 1;
  showScreen(currentScreen);
}

function showScreen(index) {
  screens.forEach((screen, i) => {
    if (i === index) {
      screen.classList.remove("hidden");
      const text = screen.querySelector(".text");
      if (text) {
        text.style.animation = "none";
        text.offsetHeight; // trigger reflow
        text.style.animation = "slideFade 1.5s ease forwards";
      }
    } else {
      screen.classList.add("hidden");
    }
  });
}
