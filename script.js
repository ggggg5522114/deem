const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const donateLink = document.getElementById("donateLink");
if (donateLink && donateLink.getAttribute("href") === "#") {
  donateLink.addEventListener("click", (event) => {
    event.preventDefault();
    alert("سيتم إضافة رابط التبرع الرسمي عبر دار العطاء قريبًا.");
  });
}
