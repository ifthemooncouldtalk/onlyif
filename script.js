const screens = document.querySelectorAll(".screen");
let currentScreen = 0;

document.addEventListener("DOMContentLoaded", () => {
  showScreen(currentScreen);
  initSkip(); // initialize skip panel
});

// click anywhere → next screen
document.addEventListener("click", (e) => {
  if (!e.target.closest(".skip-toggle") && !e.target.closest(".skip-panel")) {
    nextScreen();
  }
});

// space/enter → next screen
document.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
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
        text.offsetHeight; // trigger reflow
        text.style.animation = "slideFade 1.5s ease forwards";
      }
    } else {
      screen.classList.add("hidden");
    }
  });
}

/* -----------------------
   Skip-to Panel Logic
------------------------ */
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
    item.type = "button";
    item.className = "skip-item";
    item.innerText = p.innerText.trim();
    item.addEventListener("click", () => {
      panel.classList.remove("open");
      panel.setAttribute("aria-hidden", "true");
      document.getElementById("skipToggle").setAttribute("aria-expanded", "false");
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
    e.stopPropagation(); // don’t trigger nextScreen
    const willOpen = !panel.classList.contains("open");
    if (willOpen && panel.childElementCount === 0) buildSkipList();
    panel.classList.toggle("open");
    panel.setAttribute("aria-hidden", String(!willOpen));
    toggle.setAttribute("aria-expanded", String(willOpen));
  });

  toggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle.click();
    }
  });
}
