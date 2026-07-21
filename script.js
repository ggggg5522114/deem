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


// ===== تحسينات واجهة Deem Signature V5 =====
const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".main-nav a").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

document.addEventListener("click", (event) => {
  if (!nav || !menuButton || window.innerWidth > 768) return;
  if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});


// ===== نبض ديم: عارض القصص التفاعلي =====
(() => {
  const viewer = document.querySelector('[data-story-viewer]');
  const triggers = [...document.querySelectorAll('[data-story]')];
  if (!viewer || !triggers.length) return;

  const donationUrl = 'https://api.daralatta.org/projects/wtx20zhuc61g7k7p7w4qev3d/share';
  const stories = {
    hamad: [
      {
        kicker: 'الحالة رقم 2',
        title: 'الوالد حمد يطرق باب العون',
        text: 'تجاوز الستين عامًا، وما زال ثقل الدين يرهق كاهله بعد تقاعده المرضي.',
        image: 'images/hamad-case.jpeg',
        action: 'اعرف تفاصيل الحالة', href: 'cases.html'
      },
      {
        kicker: 'تحديث الحالة',
        title: 'تم جمع 19% من المبلغ',
        text: 'بلغت المساهمات 1,237.6 ر.ع، وبعونكم نقترب أكثر من تفريج كربته.',
        gradient: 'linear-gradient(145deg,#203B62,#111D34)',
        action: 'ساهم الآن', href: donationUrl
      },
      {
        kicker: 'المتبقي',
        title: '5,362.4 ر.ع فقط',
        text: 'حتى المساهمة الصغيرة تصنع فرقًا كبيرًا عندما نجتمع على الخير.',
        gradient: 'linear-gradient(145deg,#718F84,#243D38)',
        action: 'تبرع للحالة', href: donationUrl
      }
    ],
    workshop: [
      {
        kicker: 'ورش فريق ديم',
        title: 'صناعة الفيديو الإبداعي بالجوال',
        text: 'تعلّم التصوير والمونتاج العملي باستخدام تطبيق CapCut.',
        gradient: 'linear-gradient(145deg,#D96C5F,#682D37)',
        action: 'تفاصيل الورشة', href: 'workshops.html'
      },
      {
        kicker: 'تعلّم وساهم',
        title: 'رسوم الورشة 6 ر.ع',
        text: 'تجربة تعليمية جميلة، ويساهم ريعها في دعم الحالة الخيرية.',
        gradient: 'linear-gradient(145deg,#C98263,#253554)',
        action: 'عرض الموعد والمكان', href: 'workshops.html'
      }
    ],
    impact: [
      {
        kicker: 'أثر مستدام',
        title: 'كل عطاء يبدأ بخطوة',
        text: 'نجمع بين المبادرات المبتكرة والعمل التطوعي لدعم الأسر المتعففة.',
        gradient: 'linear-gradient(145deg,#708F82,#183A35)',
        action: 'تعرّف على ديم', href: 'about.html'
      },
      {
        kicker: 'معًا نصنع الفرق',
        title: 'أنت جزء من هذا الأثر',
        text: 'شارك الحالة مع عائلتك وأصدقائك، فقد تصل إلى من يكون سببًا في إغلاقها.',
        gradient: 'linear-gradient(145deg,#2C456E,#111D34)',
        action: 'مشاركة الحالة', href: 'cases.html#share'
      }
    ],
    volunteer: [
      {
        kicker: 'ثقافة التطوع',
        title: 'كن جزءًا من فريق يصنع الأمل',
        text: 'المهارة والوقت والكلمة الطيبة كلها أشكال من العطاء.',
        gradient: 'linear-gradient(145deg,#5E789F,#1D2C48)',
        action: 'تواصل معنا', href: 'contact.html'
      }
    ]
  };

  const media = viewer.querySelector('[data-story-media]');
  const progress = viewer.querySelector('[data-story-progress]');
  const title = viewer.querySelector('[data-story-title]');
  const text = viewer.querySelector('[data-story-text]');
  const kicker = viewer.querySelector('[data-story-kicker]');
  const action = viewer.querySelector('[data-story-action]');
  const pauseBtn = viewer.querySelector('[data-story-pause]');
  const shareBtn = viewer.querySelector('[data-story-share]');

  let groupKey = '';
  let current = 0;
  let timer = null;
  let startedAt = 0;
  let remaining = 6000;
  let paused = false;
  let touchStartX = 0;

  const viewed = new Set(JSON.parse(localStorage.getItem('deemViewedStories') || '[]'));
  triggers.forEach(btn => { if (viewed.has(btn.dataset.story)) btn.classList.add('viewed'); });

  function buildProgress() {
    progress.innerHTML = stories[groupKey].map(() => '<span><i></i></span>').join('');
  }

  function animateProgress(duration) {
    const bars = [...progress.querySelectorAll('i')];
    bars.forEach((bar, index) => {
      bar.style.transition = 'none';
      bar.style.width = index < current ? '100%' : '0%';
    });
    requestAnimationFrame(() => {
      const bar = bars[current];
      if (!bar) return;
      bar.style.transition = `width ${duration}ms linear`;
      bar.style.width = '100%';
    });
  }

  function render() {
    const item = stories[groupKey][current];
    media.classList.add('is-changing');
    setTimeout(() => {
      media.style.backgroundImage = item.image ? `url("${item.image}")` : (item.gradient || 'linear-gradient(145deg,#1E2F4F,#101827)');
      media.style.backgroundColor = item.image ? '#111827' : 'transparent';
      media.classList.remove('is-changing');
    }, 110);
    kicker.textContent = item.kicker;
    title.textContent = item.title;
    text.textContent = item.text;
    action.textContent = item.action;
    action.href = item.href;
    if (item.href.startsWith('http')) {
      action.target = '_blank'; action.rel = 'noopener noreferrer';
    } else {
      action.removeAttribute('target'); action.removeAttribute('rel');
    }
    remaining = 6000;
    paused = false;
    pauseBtn.textContent = 'Ⅱ';
    startTimer();
  }

  function startTimer() {
    clearTimeout(timer);
    startedAt = Date.now();
    animateProgress(remaining);
    timer = setTimeout(next, remaining);
  }

  function pause() {
    if (paused) {
      paused = false; pauseBtn.textContent = 'Ⅱ'; startTimer(); return;
    }
    paused = true;
    clearTimeout(timer);
    remaining -= Date.now() - startedAt;
    const bar = progress.querySelectorAll('i')[current];
    if (bar) {
      const width = getComputedStyle(bar).width;
      bar.style.transition = 'none';
      bar.style.width = width;
    }
    pauseBtn.textContent = '▶';
  }

  function next() {
    if (current < stories[groupKey].length - 1) {
      current++; render();
    } else {
      closeViewer();
    }
  }

  function prev() {
    if (current > 0) { current--; render(); }
    else { current = 0; render(); }
  }

  function openViewer(key) {
    groupKey = key; current = 0;
    viewed.add(key);
    localStorage.setItem('deemViewedStories', JSON.stringify([...viewed]));
    triggers.find(b => b.dataset.story === key)?.classList.add('viewed');
    buildProgress();
    viewer.hidden = false;
    viewer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('story-open');
    render();
    viewer.querySelector('[data-story-close]')?.focus();
  }

  function closeViewer() {
    clearTimeout(timer);
    viewer.hidden = true;
    viewer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('story-open');
  }

  triggers.forEach(btn => btn.addEventListener('click', () => openViewer(btn.dataset.story)));
  viewer.querySelectorAll('[data-story-close]').forEach(btn => btn.addEventListener('click', closeViewer));
  viewer.querySelector('[data-story-next]')?.addEventListener('click', next);
  viewer.querySelector('[data-story-prev]')?.addEventListener('click', prev);
  pauseBtn?.addEventListener('click', pause);

  shareBtn?.addEventListener('click', async () => {
    const item = stories[groupKey][current];
    const payload = { title: item.title, text: item.text, url: action.href };
    try {
      if (navigator.share) await navigator.share(payload);
      else {
        await navigator.clipboard.writeText(`${item.title}\n${item.text}\n${action.href}`);
        shareBtn.textContent = 'تم نسخ الرابط ✓';
        setTimeout(() => shareBtn.textContent = 'مشاركة القصة', 1800);
      }
    } catch (_) {}
  });

  viewer.querySelector('[data-story-stage]')?.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, {passive:true});
  viewer.querySelector('[data-story-stage]')?.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) < 45) return;
    delta > 0 ? prev() : next();
  }, {passive:true});

  document.addEventListener('keydown', e => {
    if (viewer.hidden) return;
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'ArrowLeft') next();
    if (e.key === 'ArrowRight') prev();
    if (e.key === ' ') { e.preventDefault(); pause(); }
  });
})();


// ===== DEEM V8: تجربة متغيرة حسب الوقت + 300 آية + إشعارات + أصوات =====
(() => {
  const hour = new Date().getHours();
  const body = document.body;
  let greeting = "مرحبًا بك";
  let period = "afternoon";

  if (hour >= 5 && hour < 12) {
    greeting = "صباح الخير، جعل الله يومك أثرًا جميلًا";
    period = "morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "طاب يومك، معًا نصنع أثرًا لا يزول";
    period = "afternoon";
  } else if (hour >= 17 && hour < 21) {
    greeting = "مساء الخير، عطاؤك يصنع الأمل";
    period = "evening";
  } else {
    greeting = "ليلة هادئة مليئة بالخير والعطاء";
    period = "night";
  }
  body.classList.add(`time-${period}`);

  const greetingEl = document.querySelector("[data-daily-greeting]");
  if (greetingEl) greetingEl.textContent = greeting;

  // نظام صوت خفيف باستخدام Web Audio، دون ملفات صوتية خارجية.
  let soundsEnabled = localStorage.getItem("deemSounds") !== "off";
  const soundToggle = document.querySelector("[data-sound-toggle]");
  let audioContext = null;

  function softTone(frequency = 560, duration = 0.08, volume = 0.025) {
    if (!soundsEnabled) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      gain.gain.setValueAtTime(0, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
    } catch (_) {}
  }

  function updateSoundButton() {
    if (!soundToggle) return;
    soundToggle.textContent = soundsEnabled ? "🔊" : "🔇";
    soundToggle.classList.toggle("is-muted", !soundsEnabled);
    soundToggle.setAttribute("aria-label", soundsEnabled ? "إيقاف أصوات الموقع" : "تشغيل أصوات الموقع");
  }
  updateSoundButton();

  soundToggle?.addEventListener("click", () => {
    soundsEnabled = !soundsEnabled;
    localStorage.setItem("deemSounds", soundsEnabled ? "on" : "off");
    updateSoundButton();
    if (soundsEnabled) softTone(650, .1, .03);
  });

  // تشغيل صوت خفيف عند فتح أي قصة.
  document.querySelectorAll("[data-story]").forEach(button => {
    button.addEventListener("click", () => {
      softTone(520, .075, .022);
      setTimeout(() => softTone(690, .09, .018), 65);
    });
  });

  // إشعارات مباشرة داخل الموقع.
  const notifications = document.querySelector("[data-notifications]");
  const notificationTemplate = document.querySelector("#notification-template");

  function showNotification(title, message, timeout = 6500) {
    if (!notifications || !notificationTemplate) return;
    const toast = notificationTemplate.content.firstElementChild.cloneNode(true);
    toast.querySelector("[data-toast-title]").textContent = title;
    toast.querySelector("[data-toast-text]").textContent = message;

    const close = () => {
      toast.classList.add("is-leaving");
      setTimeout(() => toast.remove(), 280);
    };
    toast.querySelector("[data-toast-close]").addEventListener("click", close);
    notifications.appendChild(toast);
    softTone(440, .07, .015);
    setTimeout(close, timeout);
  }

  const lastWelcome = Number(localStorage.getItem("deemWelcomeShown") || 0);
  if (Date.now() - lastWelcome > 12 * 60 * 60 * 1000) {
    setTimeout(() => {
      showNotification("أهلًا بك في فريق ديم", greeting);
      localStorage.setItem("deemWelcomeShown", String(Date.now()));
    }, 1100);
  }

  setTimeout(() => {
    showNotification("تحديث الحالة", "تم جمع 19% من حالة الوالد حمد، وكل مساهمة تقرّبنا من إغلاقها.");
  }, 8500);

  // آية يومية من دورة ثابتة تضم 300 آية.
  // نستخدم الأرقام العالمية للآيات 1 إلى 300، ويتغير الاختيار بحسب رقم اليوم.
  const dailyText = document.querySelector("[data-daily-text]");
  const dailySource = document.querySelector("[data-daily-source]");
  const dailyShare = document.querySelector("[data-daily-share]");
  const startOfYear = new Date(new Date().getFullYear(), 0, 0);
  const dayOfYear = Math.floor((new Date() - startOfYear) / 86400000);
  const ayahGlobalNumber = ((dayOfYear - 1) % 300) + 1;

  const fallbackAyat = [
    {text:"إِنَّ مَعَ الْعُسْرِ يُسْرًا", source:"سورة الشرح — الآية 6"},
    {text:"وَمَا تَفْعَلُوا مِنْ خَيْرٍ فَإِنَّ اللَّهَ بِهِ عَلِيمٌ", source:"سورة البقرة — الآية 215"},
    {text:"إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", source:"سورة البقرة — الآية 153"},
    {text:"وَقُلْ رَبِّ زِدْنِي عِلْمًا", source:"سورة طه — الآية 114"},
    {text:"فَاذْكُرُونِي أَذْكُرْكُمْ", source:"سورة البقرة — الآية 152"},
    {text:"إِنَّ رَبِّي قَرِيبٌ مُجِيبٌ", source:"سورة هود — الآية 61"},
    {text:"وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ", source:"سورة آل عمران — الآية 134"}
  ];

  let currentDaily = fallbackAyat[dayOfYear % fallbackAyat.length];

  function renderDaily(item) {
    currentDaily = item;
    if (dailyText) dailyText.textContent = `﴿ ${item.text} ﴾`;
    if (dailySource) dailySource.textContent = item.source;
  }
  renderDaily(currentDaily);

  fetch(`https://api.alquran.cloud/v1/ayah/${ayahGlobalNumber}/quran-uthmani`)
    .then(response => {
      if (!response.ok) throw new Error("Unable to load daily verse");
      return response.json();
    })
    .then(({data}) => {
      renderDaily({
        text: data.text,
        source: `سورة ${data.surah.name} — الآية ${data.numberInSurah} • الآية ${ayahGlobalNumber} من دورة 300`
      });
      localStorage.setItem("deemDailyAyah", JSON.stringify({
        date: new Date().toDateString(),
        number: ayahGlobalNumber,
        text: data.text,
        source: `سورة ${data.surah.name} — الآية ${data.numberInSurah} • الآية ${ayahGlobalNumber} من دورة 300`
      }));
    })
    .catch(() => {
      try {
        const cached = JSON.parse(localStorage.getItem("deemDailyAyah") || "null");
        if (cached?.number === ayahGlobalNumber) renderDaily(cached);
      } catch (_) {}
    });

  dailyShare?.addEventListener("click", async () => {
    const content = `﴿ ${currentDaily.text} ﴾\n${currentDaily.source}\nفريق ديم الخيري`;
    try {
      if (navigator.share) {
        await navigator.share({title:"آية اليوم — فريق ديم", text:content});
      } else {
        await navigator.clipboard.writeText(content);
        dailyShare.textContent = "تم النسخ ✓";
        softTone(720, .1, .025);
        setTimeout(() => dailyShare.textContent = "مشاركة الآية", 1800);
      }
    } catch (_) {}
  });
})();
