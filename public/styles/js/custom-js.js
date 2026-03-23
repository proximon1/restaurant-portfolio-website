/* Navbar collapse */
function initNavbarCollapse() {
  const mainNav = document.getElementById('mainNav');

  document.querySelectorAll('#mainNav a, .navbar-brand').forEach(link => {
    link.addEventListener('click', () => {
      requestAnimationFrame(() => {
        bootstrap.Collapse
          .getOrCreateInstance(mainNav)
          .hide();
      });
    });
  });
}

/* Gallery drag and move */
function initGalleryDrag() {
  const slider = document.querySelector('.showcase-carousel');
  if (!slider) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  let velocity = 0;
  let lastX;
  let raf;

  function startDrag(e) {
    isDown = true;
    slider.classList.add('dragging');

    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;

    lastX = e.pageX;
    velocity = 0;

    cancelAnimationFrame(raf);
  }

  function stopDrag() {
    if (!isDown) return;
    isDown = false;
    slider.classList.remove('dragging');

    startMomentum();
  }

  function onDrag(e) {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;

    slider.scrollLeft = scrollLeft - walk;

    velocity = e.pageX - lastX;
    lastX = e.pageX;
  }

  function startMomentum() {
    function momentumLoop() {
      slider.scrollLeft -= velocity;
      velocity *= 0.95;

      if (Math.abs(velocity) > 0.5) {
        raf = requestAnimationFrame(momentumLoop);
      }
    }

    raf = requestAnimationFrame(momentumLoop);
  }

  slider.addEventListener('mousedown', startDrag);
  slider.addEventListener('mousemove', onDrag);
  slider.addEventListener('mouseleave', stopDrag);
  slider.addEventListener('mouseup', stopDrag);
}

/* Navbar coloring */
function initNavbarColor() {
  console.log("initNavbarColor elindult");

  const navBar = document.querySelector(".navbar");
  const sections = document.querySelectorAll("section");
  const navCollapse = document.querySelector(".navbar-collapse");

  function updateNavbarColor() {
    if (window.innerWidth < 992) {
      navBar.classList.remove("dark");
      return;
    }

    console.log("updateNavbarColor fut");

    if (!navBar) {
      console.log("NINCS navbar");
      return;
    }

    console.log("sections száma:", sections.length);

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      console.log(section, rect.top, rect.bottom);

      if (rect.top <= 80 && rect.bottom >= 80) {
        console.log("AKTÍV SECTION:", section);
        const mode = section.dataset.nav;
        console.log("mode:", mode);

        navBar.classList.toggle("dark", mode === "dark");
        break;
      }
    }
  }

  window.addEventListener("scroll", updateNavbarColor);
  updateNavbarColor();
}

/* Newsletter modal */
function initNewsletterModal() {
  const overlay = document.querySelector(".newsletter-overlay");
  const closeBtn = document.querySelector(".modal-close");
  const trigger = document.querySelector("#about");

  if (!overlay || !closeBtn || !trigger) return;

  function showModalOnce() {
    if (sessionStorage.getItem("newsletterShown")) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        overlay.classList.add("show");
        sessionStorage.setItem("newsletterShown", "true");
        observer.disconnect();
      }
    }, { threshold: 0.4 });

    observer.observe(trigger);
  }

  function closeModal() {
    overlay.classList.remove("show");
  }

  closeBtn.addEventListener("click", closeModal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  showModalOnce();
}

function initApp() {
  initNavbarCollapse();
  initGalleryDrag();
  initNavbarColor();
  initNewsletterModal();
}

document.addEventListener("DOMContentLoaded", initApp);