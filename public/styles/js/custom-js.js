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


/* Galéria mozgás */

document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector(".showcase-carousel");
  if (!container) return;

  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  let isDown = false;
  let isTouching = false;
  let autoPaused = false;

  let startX;
  let scrollStart;

  let targetScroll = container.scrollLeft;
  let currentScroll = container.scrollLeft;

  let direction = 1;

  let autoSpeed = 0.35;
  let autoSpeedTarget = 0.35;

  let resumeTimeout = null;
  let edgePause = false;

  /* ===== DESKTOP DRAG ===== */

  if (!isTouchDevice) {

    container.addEventListener("mousedown", (e) => {

      isDown = true;
      autoPaused = true;

      startX = e.pageX;
      scrollStart = targetScroll;

      autoSpeedTarget = 0;

      container.classList.add("dragging");

      if (resumeTimeout) clearTimeout(resumeTimeout);

    });

    document.addEventListener("mouseup", () => {

      if (!isDown) return;

      isDown = false;
      container.classList.remove("dragging");

      resumeTimeout = setTimeout(() => {
        autoPaused = false;
        autoSpeedTarget = 0.35;
      }, 1000);

    });

    document.addEventListener("mousemove", (e) => {

      if (!isDown) return;

      const dx = e.pageX - startX;
      targetScroll = scrollStart - dx;

    });

  }

  /* ===== MOBILE TOUCH ===== */

  container.addEventListener("touchstart", () => {

    isTouching = true;
    autoPaused = true;
    autoSpeedTarget = 0;

    if (resumeTimeout) clearTimeout(resumeTimeout);

  }, { passive: true });

  container.addEventListener("touchend", () => {

    isTouching = false;

    resumeTimeout = setTimeout(() => {
      autoPaused = false;
      autoSpeedTarget = 0.35;
    }, 2000);

  });

  container.addEventListener("scroll", () => {

    if (isTouchDevice) {
      targetScroll = container.scrollLeft;
      currentScroll = container.scrollLeft;
    }

  });

  function animate() {

    const maxScroll = container.scrollWidth - container.clientWidth;

    if (!isTouchDevice) {
      autoSpeed += (autoSpeedTarget - autoSpeed) * 0.05;
    }

    if (!isDown && !isTouching && !edgePause && !autoPaused) {
      targetScroll += autoSpeed * direction;
    }

    if (targetScroll <= 0 && !edgePause) {

      targetScroll = 0;
      edgePause = true;

      setTimeout(() => {
        direction = 1;
        edgePause = false;
      }, 2000);

    }

    if (targetScroll >= maxScroll && !edgePause) {

      targetScroll = maxScroll;
      edgePause = true;

      setTimeout(() => {
        direction = -1;
        edgePause = false;
      }, 2000);

    }

    if (!isTouchDevice) {

      currentScroll += (targetScroll - currentScroll) * 0.12;
      container.scrollLeft = currentScroll;

    } else {

      container.scrollLeft = targetScroll;

    }

    requestAnimationFrame(animate);
  }

  animate();
});

/* navbar menü színek */

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