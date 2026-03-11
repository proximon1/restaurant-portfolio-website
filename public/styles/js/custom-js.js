const mainNav = document.getElementById('mainNav');

/* Navbar collapse */

document.querySelectorAll('#mainNav a, .navbar-brand').forEach(a=>{
  a.addEventListener('click', ()=>{
    requestAnimationFrame(()=>{
      bootstrap.Collapse
        .getOrCreateInstance(mainNav)
        .hide();
    });
  });
});

/* Galéria mozgatás kézzel */

document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector(".showcase-carousel");
  if (!container) return;

  let isDown = false;
  let startX;
  let scrollStart;

  container.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX;
    scrollStart = container.scrollLeft;
    container.classList.add("dragging");
  });

  document.addEventListener("mouseup", () => {
    isDown = false;
    container.classList.remove("dragging");
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDown) return;

    const dx = e.pageX - startX;
    container.scrollLeft = scrollStart - dx;
  });

});

/* navbar menü színek */

const navBar = document.getElementById("navBar");
const sections = document.querySelectorAll("section");
const navCollapse = document.querySelector(".navbar-collapse");

window.addEventListener("scroll", () => {

  /* MOBILE / COLLAPSED → fix fehér navbar */
  if (window.innerWidth < 992) {
    navBar.classList.remove("dark");
    return;
  }

  if (navCollapse.classList.contains("show")) {
    navBar.classList.remove("dark");
    return;
  }

  for (const section of sections) {

    const rect = section.getBoundingClientRect();

    if (rect.top <= 80 && rect.bottom >= 80) {

      const mode = section.dataset.nav;

      navBar.classList.toggle("dark", mode === "dark");

      break;
    }
  }
});

/* Modal ablak megjelenítés - bezárás */

const overlay = document.querySelector(".newsletter-overlay");
const closeBtn = document.querySelector(".modal-close");
const trigger = document.querySelector("#about");

if (!sessionStorage.getItem("newsletterShown")) {

  const observer = new IntersectionObserver((entries) => {

    if (entries[0].isIntersecting) {

      overlay.classList.add("show");

      sessionStorage.setItem("newsletterShown", "true");

      observer.disconnect();
    }

  }, {
    threshold: 0.4
  });

  observer.observe(trigger);
}

closeBtn.addEventListener("click", () => {
  overlay.classList.remove("show");
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("show");
  }
});