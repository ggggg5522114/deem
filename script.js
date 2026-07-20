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



// ===== Modern Experience v4 =====
const pageBody = document.body;
const themeButton = document.querySelector(".theme-toggle");
const storedTheme = localStorage.getItem("deem-theme");

if (storedTheme === "dark") pageBody.classList.add("dark-mode");

const syncThemeButton = () => {
  if (!themeButton) return;
  const dark = pageBody.classList.contains("dark-mode");
  themeButton.textContent = dark ? "☀️" : "🌙";
  themeButton.title = dark ? "الوضع النهاري" : "الوضع الليلي";
};
syncThemeButton();

themeButton?.addEventListener("click", () => {
  pageBody.classList.toggle("dark-mode");
  localStorage.setItem("deem-theme", pageBody.classList.contains("dark-mode") ? "dark" : "light");
  syncThemeButton();
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

const counterElements = document.querySelectorAll("[data-counter]");
if (counterElements.length && "IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.counter || 0);
      const startedAt = performance.now();
      const duration = 1000;
      const animate = now => {
        const progress = Math.min((now - startedAt) / duration, 1);
        el.textContent = Math.round(target * progress).toLocaleString("ar-OM");
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      observer.unobserve(el);
    });
  }, { threshold: .55 });
  counterElements.forEach(el => counterObserver.observe(el));
}

const topButton = document.querySelector(".back-to-top");
if (topButton) {
  const toggleTopButton = () => topButton.classList.toggle("show", window.scrollY > 500);
  window.addEventListener("scroll", toggleTopButton, { passive: true });
  toggleTopButton();
  topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

const galleryFilters = document.querySelectorAll("[data-gallery-filter]");
const galleryCards = document.querySelectorAll("[data-gallery-category]");
galleryFilters.forEach(button => {
  button.addEventListener("click", () => {
    galleryFilters.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.galleryFilter;
    galleryCards.forEach(card => {
      card.hidden = filter !== "all" && card.dataset.galleryCategory !== filter;
    });
  });
});

const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  pageBody.style.overflow = "";
};
galleryCards.forEach(card => {
  card.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = card.dataset.lightboxSrc;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    pageBody.style.overflow = "hidden";
  });
});
document.querySelector("[data-lightbox-close]")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeLightbox();
});

// Pause the hero video when it is off screen to save mobile battery/data.
const heroVideo = document.querySelector(".video-hero video");
if (heroVideo && "IntersectionObserver" in window) {
  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) heroVideo.play().catch(() => {});
      else heroVideo.pause();
    });
  }, { threshold: .05 });
  videoObserver.observe(heroVideo);
}
