document.addEventListener("DOMContentLoaded", () => {
  initStars();
  initPetals();
  initNavigation();
});

// 1. Generate Twinkling Stars
function initStars() {
  const container = document.getElementById("stars-container");
  const starCount = 150;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.className = "star";
    
    const size = Math.random() * 3 + "px";
    star.style.width = size;
    star.style.height = size;
    
    star.style.top = Math.random() * 100 + "vh";
    star.style.left = Math.random() * 100 + "vw";
    
    // Random twinkle duration
    star.style.setProperty("--duration", (Math.random() * 3 + 2) + "s");
    star.style.animationDelay = Math.random() * 5 + "s";
    
    container.appendChild(star);
  }
}

// 2. Falling Rose Petals
function initPetals() {
  const roseColors = ['#8b0000', '#a52a2a', '#b22222'];
  for (let i = 0; i < 40; i++) {
    const petal = document.createElement("div");
    petal.className = "rose-petal-falling";
    
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.background = roseColors[Math.floor(Math.random() * roseColors.length)];
    
    const size = (Math.random() * 10 + 10) + "px";
    petal.style.width = size;
    petal.style.height = (parseFloat(size) * 1.3) + "px";
    
    petal.style.animationDuration = (Math.random() * 5 + 7) + "s";
    petal.style.animationDelay = (Math.random() * 10) + "s";
    
    document.body.appendChild(petal);
  }
}

// 3. Screen Navigation
let currentIdx = 0;
const screens = document.querySelectorAll(".screen");

function initNavigation() {
  document.addEventListener("click", (e) => {
    // Don't advance if clicking the skip menu
    if (e.target.closest("#skipToggle") || e.target.closest("#skipPanel")) return;
    
    if (currentIdx < screens.length - 1) {
      currentIdx++;
      updateScreens();
    }
  });

  const toggle = document.getElementById("skipToggle");
  const panel = document.getElementById("skipPanel");

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isVisible = panel.style.display === "block";
    panel.style.display = isVisible ? "none" : "block";
    if (!isVisible) buildSkipItems();
  });
}

function updateScreens() {
  screens.forEach((s, i) => {
    s.classList.toggle("active", i === currentIdx);
  });
}

function buildSkipItems() {
  const panel = document.getElementById("skipPanel");
  panel.innerHTML = "";
  
  screens.forEach((s, i) => {
    if (i === 0) return; // Skip landing
    const p = s.querySelector(".text");
    if (!p) return;

    const btn = document.createElement("button");
    btn.className = "skip-item";
    btn.innerText = p.innerText;
    btn.onclick = () => {
      currentIdx = i;
      updateScreens();
      panel.style.display = "none";
    };
    panel.appendChild(btn);
  });
}
