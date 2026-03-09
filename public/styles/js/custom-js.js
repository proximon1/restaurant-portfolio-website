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


/* Showcase görgetés */ 
const container = document.querySelector(".showcase-carousel");

if (window.matchMedia("(pointer: fine)").matches) {

  let targetScroll = container.scrollLeft;
  let currentScroll = container.scrollLeft;

  container.addEventListener("wheel", (e) => {

    const threshold = 2;

    const atStart = currentScroll <= threshold;
    const atEnd =
      currentScroll + container.clientWidth >=
      container.scrollWidth - threshold;

    if ((e.deltaY < 0 && !atStart) || (e.deltaY > 0 && !atEnd)) {

      e.preventDefault();

      targetScroll += e.deltaY * 1.5;

      targetScroll = Math.max(
        0,
        Math.min(targetScroll, container.scrollWidth - container.clientWidth)
      );

    }

  }, { passive: false });

  function animate() {

    currentScroll += (targetScroll - currentScroll) * 0.04;

    container.scrollLeft = currentScroll;

    requestAnimationFrame(animate);

  }

  animate();
}

/* navbar menü színek */
const navBar = document.getElementById("navBar");
const sections = document.querySelectorAll("section");
const navCollapse = document.querySelector(".navbar-collapse");

window.addEventListener("scroll", () => {

  if (navCollapse.classList.contains("show")) {
    navBar.classList.remove("dark");
    return;
  }

  sections.forEach(section => {

    const rect = section.getBoundingClientRect();

    if (rect.top <= 80 && rect.bottom >= 80) {
      const mode = section.dataset.nav;

      navBar.classList.toggle("dark", mode === "dark");
    }

  });
});

navCollapse.addEventListener("show.bs.collapse", () => {
  navBar.classList.remove("dark");
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