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

  let isDragging = false;
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

    setTimeout(() => {
      isDragging = false;
    }, 0);
  }

  function onDrag(e) {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;

    if (Math.abs(walk) > 5) {
    isDragging = true;
  }

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
  slider.addEventListener('click', (e) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
  };

/* Navbar coloring */
function initNavbarColor() {

  const navBar = document.querySelector(".navbar");
  const sections = document.querySelectorAll("section");
  const navCollapse = document.querySelector(".navbar-collapse");

  function updateNavbarColor() {
    if (window.innerWidth < 992) {
      navBar.classList.remove("dark");
      return;
    }

    if (!navBar) {
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

function initRandomGalleryItem() {
  const items = document.querySelectorAll('.gallery-item');

  const pattern = ['size-b', 'size-c', 'size-d', 'size-e', 'size-f', 'size-g'];

  if (items[0]) {
    items[0].classList.add('size-a');
  }

  const shuffled = [...pattern].sort(() => Math.random() - 0.5);

  items.forEach((item, i) => {
    if (i === 0) return;
    item.classList.add(shuffled[(i - 1) % shuffled.length]);
  });
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');

  if (!lightbox) return;
  
  const lightboxImg = lightbox.querySelector('img');

  document.querySelectorAll('.project-gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      lightbox.classList.add('active');
      lightboxImg.src = img.src;
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
}

function initScrollHint(options = {}) {
  const {
    selector = ".scroll-hint",
    hideAfterScroll = 100
  } = options;

  const hint = document.querySelector(selector);
  if (!hint) return;

  function hasScrollableContent() {
    return document.documentElement.scrollHeight > window.innerHeight;
  }

  function updateVisibility() {
    if (!hasScrollableContent()) {
      hint.style.opacity = "0";
      hint.style.pointerEvents = "none";
    } else {
      hint.style.opacity = "1";
      hint.style.pointerEvents = "auto";
    }
  }

  function handleScroll() {
    if (window.scrollY > hideAfterScroll) {
      hint.style.opacity = "0";
      hint.style.pointerEvents = "none";
    } else {
      hint.style.opacity = "1";
      hint.style.pointerEvents = "auto";
    }
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("load", updateVisibility);
  window.addEventListener("resize", updateVisibility);

  updateVisibility();

  hint.addEventListener("click", () => {
    window.scrollTo({
      top: window.innerHeight*0.96,
      behavior: "smooth"
    });
  });
}

function initApp() {
  initNavbarCollapse();
  initGalleryDrag();
  initNavbarColor();
  initRandomGalleryItem();
  initLightbox();
  initScrollHint({
    hideAfterScroll: 50,
    showDelay: 1000,
    selector: ".scroll-hint"
  });
  /* initNewsletterModal(); */
}

document.addEventListener("DOMContentLoaded", initApp);