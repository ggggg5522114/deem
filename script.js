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



// ===== Premium v3 interactions =====
const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("deem-theme");

if (savedTheme === "dark") {
  body.classList.add("dark-mode");
}
if (themeToggle) {
  const updateThemeIcon = () => {
    const dark = body.classList.contains("dark-mode");
    themeToggle.textContent = dark ? "☀️" : "🌙";
    themeToggle.title = dark ? "الوضع النهاري" : "الوضع الليلي";
  };
  updateThemeIcon();
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem("deem-theme", body.classList.contains("dark-mode") ? "dark" : "light");
    updateThemeIcon();
  });
}

const welcome = document.querySelector("[data-welcome]");
if (welcome && !sessionStorage.getItem("deem-welcomed")) {
  welcome.classList.add("show");
  welcome.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    welcome.classList.remove("show");
    welcome.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    sessionStorage.setItem("deem-welcomed", "1");
  }, 1900);
}

const dailyMessages = [
  { text: "«وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ»", source: "سورة البقرة، الآية 110" },
  { text: "«مَّن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا فَيُضَاعِفَهُ لَهُ أَضْعَافًا كَثِيرَةً»", source: "سورة البقرة، الآية 245" },
  { text: "اللهم اجعلنا مفاتيح للخير، وسخّرنا لقضاء حوائج الناس وتفريج كربهم.", source: "دعاء اليوم" },
  { text: "ربما تكون مساهمتك اليوم بداية أمل جديد لأسرة كاملة.", source: "رسالة ديم" },
  { text: "«فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ»", source: "سورة الزلزلة، الآية 7" },
  { text: "اللهم بارك في كل يدٍ امتدت بالعطاء، وكل قلبٍ دلّ على الخير.", source: "دعاء اليوم" },
  { text: "الخير لا يُقاس بحجمه، بل بالأثر الذي يتركه في حياة الآخرين.", source: "رسالة ديم" }
];
const dailyText = document.querySelector("[data-daily-text]");
const dailySource = document.querySelector("[data-daily-source]");
if (dailyText && dailySource) {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const dayOfYear = Math.floor((new Date() - start) / 86400000);
  const message = dailyMessages[dayOfYear % dailyMessages.length];
  dailyText.textContent = message.text;
  dailySource.textContent = message.source;
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

const counters = document.querySelectorAll("[data-counter]");
if (counters.length) {
  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.counter || 0);
      const duration = 900;
      const started = performance.now();
      const tick = now => {
        const progress = Math.min((now - started) / duration, 1);
        element.textContent = Math.round(target * progress).toLocaleString("ar-OM");
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(element);
    });
  }, { threshold: .5 });
  counters.forEach(counter => countObserver.observe(counter));
}

const wall = document.querySelector("[data-kindness-wall]");
const addHeart = document.querySelector("[data-add-heart]");
if (wall) {
  let heartCount = Math.max(12, Number(localStorage.getItem("deem-hearts") || 12));
  const drawHearts = () => {
    wall.innerHTML = "";
    for (let i = 0; i < Math.min(heartCount, 80); i++) {
      const heart = document.createElement("span");
      heart.className = "kindness-heart";
      heart.textContent = i % 5 === 0 ? "🤍" : "❤️";
      heart.style.animationDelay = `${Math.min(i * 18, 450)}ms`;
      wall.appendChild(heart);
    }
  };
  drawHearts();
  if (addHeart) {
    addHeart.addEventListener("click", () => {
      heartCount += 1;
      localStorage.setItem("deem-hearts", String(heartCount));
      drawHearts();
      addHeart.textContent = "شكرًا لمساهمتك في نشر الخير ❤️";
      setTimeout(() => addHeart.textContent = "أضف قلبًا للجدار ❤️", 1800);
    });
  }
}

const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  const updateBackToTop = () => backToTop.classList.toggle("show", window.scrollY > 500);
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
