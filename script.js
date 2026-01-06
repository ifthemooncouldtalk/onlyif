document.addEventListener("DOMContentLoaded", () => {
  // 1. Generate falling petals
  const petalCount = 40;
  const colors = ['#8b0000', '#7b0000', '#a52a2a'];

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("div");
    petal.classList.add("rose-petal-falling");
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.width = 12 + Math.random() * 8 + "px";
    petal.style.height = 15 + Math.random() * 8 + "px";
    petal.style.background = colors[Math.floor(Math.random() * colors.length)];
    petal.style.animationDuration = 5 + Math.random() * 7 + "s";
    petal.style.animationDelay = Math.random() * 10 + "s";
    document.body.appendChild(petal);
  }

  // 2. Navigation Logic
  const screens = document.querySelectorAll(".screen");
  let currentScreen = 0;

  function showScreen(index) {
    screens.forEach((screen, i) => {
      if (i === index) {
        screen.classList.remove("hidden");
        // Reset animation for the text
        const text = screen.querySelector(".text");
        if (text) {
          text.style.animation = 'none';
          text.offsetHeight; /* trigger reflow */
          text.style.animation = null;
        }
      } else {
        screen.classList.add("hidden");
      }
    });
  }

  document.addEventListener("click", (e) => {
    // Prevent skip panel from advancing screens
    if (e.target.closest(".skip-toggle") || e.target.closest(".skip-panel")) return;
    
    currentScreen++;
    if (currentScreen >= screens.length) currentScreen = 0;
    showScreen(currentScreen);
  });

  // 3. Skip Menu Logic
  const toggle = document.getElementById("skipToggle");
  const panel = document.getElementById("skipPanel");

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    panel.classList.toggle("open");
    
    // Build list if empty
    if (panel.innerHTML === "") {
      screens.forEach((scr, idx) => {
        if (idx === 0) return;
        const p = scr.querySelector(".text");
        if (!p) return;
        
        const btn = document.createElement("button");
        btn.className = "skip-item";
        btn.innerText = p.innerText.substring(0, 30) + "...";
        btn.onclick = () => {
          currentScreen = idx;
          showScreen(idx);
          panel.classList.remove("open");
        };
        panel.appendChild(btn);
      });
    }
  });

  showScreen(0);
});
