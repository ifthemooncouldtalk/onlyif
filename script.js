document.addEventListener("DOMContentLoaded", () => {
  const roseColors = ['#8b0000', '#a52a2a', '#b22222', '#7b0000', '#5e0000'];
  
  // Generate falling rose petals
  for (let i = 0; i < 60; i++) {
    const petal = document.createElement("div");
    petal.classList.add("rose-petal-falling");
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.background = roseColors[Math.floor(Math.random() * roseColors.length)];
    
    const size = 15 + Math.random() * 10 + "px";
    petal.style.width = size;
    petal.style.height = (parseFloat(size) * 1.2) + "px";
    
    petal.style.animationDuration = 6 + Math.random() * 10 + "s";
    petal.style.animationDelay = Math.random() * 15 + "s";
    
    document.body.appendChild(petal);
  }
});

const screens = document.querySelectorAll(".screen");
let currentScreen = 0;

document.addEventListener("DOMContentLoaded", () => {
  showScreen(currentScreen);
  initSkip(); 
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".skip-toggle") && !e.target.closest(".skip-panel")) {
    nextScreen();
  }
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
        text.offsetHeight; 
        text.style.animation = "slideFade 1.5s ease forwards";
      }
    } else {
      screen.classList.add("hidden");
    }
  });
}

function buildSkipList() {
  const panel = document.getElementById("skipPanel");
  panel.innerHTML = "";
  const screensArr = Array.from(document.querySelectorAll(".screen"))
    .filter((s) => s.id !== "screen0");

  screensArr.forEach((scr) => {
    const id = scr.id.replace("screen", "");
    const p = scr.querySelector(".text");
    if (!p) return;
    const item = document.createElement("button");
    item.className = "skip-item";
    item.innerText = p.innerText.trim();
    item.addEventListener("click", () => {
      panel.classList.remove("open");
      showScreen(Number(id));
      currentScreen = Number(id);
    });
    panel.appendChild(item);
  });
}

function initSkip() {
  const toggle = document.getElementById("skipToggle");
  const panel = document.getElementById("skipPanel");

  toggle.addEventListener("click", (e) => {
    e.stopPropagation(); 
    const willOpen = !panel.classList.contains("open");
    if (willOpen && panel.childElementCount === 0) buildSkipList();
    panel.classList.toggle("open");
  });
}
