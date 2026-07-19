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

const shareTitle = "حالة الوالد حمد | فريق ديم الخيري";
const shareText = "بعونكم نفك كربة الوالد حمد ونخفف عنه ثقل الدين.";
const shareUrl = window.location.href;
const shareNote = document.querySelector("[data-share-note]");

const whatsappBtn = document.querySelector("[data-share-whatsapp]");
if (whatsappBtn) {
  whatsappBtn.href = `https://wa.me/?text=${encodeURIComponent(shareText + "\n" + shareUrl)}`;
  whatsappBtn.target = "_blank";
  whatsappBtn.rel = "noopener noreferrer";
}

const instagramBtn = document.querySelector("[data-share-instagram]");
if (instagramBtn) {
  instagramBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      if (shareNote) shareNote.textContent = "تم نسخ النص والرابط. افتح إنستغرام والصقهما في القصة أو الرسائل.";
      window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
    } catch {
      if (shareNote) shareNote.textContent = "انسخ رابط الصفحة وشاركه يدويًا عبر إنستغرام.";
    }
  });
}

const nativeBtn = document.querySelector("[data-native-share]");
if (nativeBtn) {
  nativeBtn.addEventListener("click", async () => {
    if (navigator.share) {
      await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      if (shareNote) shareNote.textContent = "تم نسخ رابط الحالة.";
    }
  });
}
