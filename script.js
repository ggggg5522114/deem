const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();


const countdownEl = document.querySelector("[data-countdown]");

if (countdownEl) {
  const targetDate = new Date(countdownEl.dataset.countdown).getTime();
  const daysEl = countdownEl.querySelector("[data-days]");
  const hoursEl = countdownEl.querySelector("[data-hours]");
  const minutesEl = countdownEl.querySelector("[data-minutes]");
  const secondsEl = countdownEl.querySelector("[data-seconds]");
  const statusEl = document.querySelector("[data-countdown-status]");

  const updateCountdown = () => {
    const remaining = targetDate - Date.now();

    if (remaining <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      if (statusEl) statusEl.textContent = "بدأت الورشة أو انتهى موعدها";
      return;
    }

    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
}
