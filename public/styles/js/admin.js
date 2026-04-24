function initDropdownToggle() {
    const user = document.querySelector(".admin-user");

    if (user) {
    const trigger = user.querySelector(".admin-user-trigger");

    trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        user.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
        if (!user.contains(e.target)) {
        user.classList.remove("open");
        }
    });
    }
}

function initItemModal() {
  const rows = document.querySelectorAll(".item-row");
  const modal = document.getElementById("itemModal");
  const form = document.getElementById("itemForm");

  if (!modal) return;

  const img = document.getElementById("modalImage");
  const idInput = document.getElementById("modalItemId");
  const main = document.getElementById("modalMain");
  const order = document.getElementById("modalOrder");
  const layout = document.getElementById("modalLayout");
  const desc = document.getElementById("modalDescription");

  const closeBtn = document.querySelector(".admin-modal-close");

  rows.forEach(row => {
    row.addEventListener("click", () => {
      const id = row.dataset.id;

      const isBlank = row.dataset.layout && row.dataset.layout.includes("blank");
      const image = row.dataset.image;

      img.src = isBlank
        ? "/images/blank.png"
        : (image || "/images/blank.png");

      img.onerror = () => {
        img.src = "/images/blank.png";
      };

      idInput.value = id;
      main.checked = row.dataset.main === "true";
      order.value = row.dataset.order || "";
      layout.value = row.dataset.layout || "square";
      desc.value = row.dataset.description || "";

      form.action = `/admin/project-items/${id}`;

      modal.classList.add("open");
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
    }
  });
}

function generateFakeData(days = 30) {
  const labels = [];
  const data = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const label = date.toISOString().slice(5, 10);
    labels.push(label);

    data.push(Math.floor(Math.random() * 180) + 20);
  }

  return { labels, data };
}

function generateFakeTopPages() {
  const pages = [
    "/projects/pasta-and-pickles",
    "/projects/natures-signatures",
    "/projects/rat-experience",
    "/projects/editorial-dinner",
    "/projects/food-installation"
  ];

  return pages.map(page => ({
    page,
    views: Math.floor(Math.random() * 200) + 20
  })).sort((a, b) => b.views - a.views);
}

function generateFakeAvgTime() {
  const seconds = Math.floor(Math.random() * 180) + 30; // 30–210 sec

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return `${min}m ${sec}s`;
}

function renderTopPages() {
  const list = document.getElementById("topPagesList");
  if (!list) return;

  const pages = generateFakeTopPages();

  list.innerHTML = pages.map(p => `
    <li>
      <span>${p.page}</span>
      <strong>${p.views} visitors</strong>
    </li>
  `).join("");
}

function renderAvgTime() {
  const el = document.getElementById("avgTime");
  if (!el) return;

  el.textContent = generateFakeAvgTime();
}

function initVisitorsChart() {
  const ctx = document.getElementById("visitorsChart");
  if (!ctx) return;

  const { labels, data } = generateFakeData(30);

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Visitors",
        data,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true }
      }
    }
  });
}

function initTextareaCounter(selector, max = 800) {
  const textarea = document.querySelector(selector);
  if (!textarea) return;

  let counter = textarea.parentNode.querySelector(".char-counter");

  if (!counter) {
    counter = document.createElement("div");
    counter.className = "char-counter";
    textarea.parentNode.appendChild(counter);
  }

  function update() {
    counter.innerText = `${textarea.value.length} / ${max}`;
  }

  textarea.addEventListener("input", update);

  update();
}

function initFileClearButtons() {
  document.querySelectorAll(".file-input-container").forEach(container => {
    const input = container.querySelector("input[type='file']");
    const btn = container.querySelector(".clear-file");

    const toggle = () => {
      btn.style.display = input.files.length ? "inline-block" : "none";
    };

    input.addEventListener("change", toggle);

    btn.addEventListener("click", () => {
      input.value = null;
      toggle();
    });

    toggle();
  });
}

function initToast() {
  const toast = document.getElementById("adminToast");
  if (!toast) return;

  setTimeout(() => {
    toast.classList.add("show");
  }, 50);

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function initFormValidation(formSelector) {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach(form => {
    const button = form.querySelector("[data-submit]");
    if (!button) return;

    const inputs = form.querySelectorAll("input, textarea, select");

    function isValid() {
      let valid = true;

      inputs.forEach(input => {
        if (!input.hasAttribute("required")) return;

        if (input.type === "file") {
          if (input.files.length === 0) {
            valid = false;
          }
          return;
        }

        if (input.type === "checkbox") {
          if (!input.checked) {
            valid = false;
          }
          return;
        }

        const value = input.value?.trim();

        if (!value) {
          valid = false;
        }
      });

      return valid;
    }

    function updateButton() {
      button.disabled = !isValid();
    }

    inputs.forEach(input => {
      input.addEventListener("input", updateButton);
      input.addEventListener("change", updateButton);
    });

    form.addEventListener("submit", (e) => {
      if (!isValid()) {
        e.preventDefault();
      }
    });

    updateButton();
  });
}

function initDeleteItems() {
  const modal = document.getElementById("deleteModal");
  const confirmBtn = document.getElementById("confirmDelete");
  const cancelBtn = document.getElementById("cancelDelete");

  if (!modal) return;

  let selectedId = null;
  let selectedType = null;

  document.querySelectorAll(".delete-item-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      selectedId = btn.dataset.id;
      selectedType = btn.dataset.type;

      modal.classList.add("open");
    });
  });

  cancelBtn.addEventListener("click", () => {
    modal.classList.remove("open");
    selectedId = null;
    selectedType = null;
  });

  confirmBtn.addEventListener("click", () => {
    if (!selectedId) return;

    if (selectedType === "item") {
      window.location = `/admin/project-items/delete/${selectedId}?slug=${window.projectSlug}`;
    } else {
      window.location = `/admin/projects/delete/${selectedId}`;
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("open");
    }
  });
}

function initAddProjectItem() {
  const addRow = document.querySelector(".add-project-row");
  const modal = document.getElementById("itemModal");
  const form = document.getElementById("itemForm");

  if (!addRow || !modal || !form) return;

  addRow.addEventListener("click", () => {
    form.reset();

    const idInput = document.getElementById("modalItemId");
    if (idInput) idInput.value = "";

    const img = document.getElementById("modalImage");
    if (img) img.src = "/images/blank.png";

    const main = document.getElementById("modalMain");
    if (main) main.checked = false;

    form.action = `/admin/project-items?slug=${window.projectSlug}`;

    modal.classList.add("open");
  });
}

function initImagePreview() {
  const input = document.getElementById("modalImageInput");
  const img = document.getElementById("modalImage");

  if (!input || !img) return;

  input.addEventListener("change", () => {
    const file = input.files[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    img.src = previewUrl;
  });
}

function OpenCreateModal() {
  const modal = document.getElementById("itemModal");
  const form = document.getElementById("itemForm");

  const img = document.getElementById("modalImage");
  const input = document.getElementById("modalImageInput");

  // reset
  form.reset();

  // image reset
  img.src = "/images/blank.png";
  input.value = "";

  // checkbox reset
  document.getElementById("modalMain").checked = false;

  // hidden id törlés
  document.getElementById("modalItemId").value = "";

  // title
  document.querySelector("#itemModal h3").innerText = "Add item";

  // action
  form.action = `/admin/projects/${window.projectSlug}/items`;

  modal.classList.add("open");
}

function initEditProjectItem() {
  const rows = document.querySelectorAll(".item-row");
  const modal = document.getElementById("itemModal");
  const form = document.getElementById("itemForm");

  if (!rows.length) return;

  rows.forEach(row => {
    row.addEventListener("click", () => {
      const id = row.dataset.id;
      const image = row.dataset.image;
      const isMain = row.dataset.main === "true";
      const order = row.dataset.order;
      const layout = row.dataset.layout;
      const description = row.dataset.description;

      // fill form
      document.getElementById("modalItemId").value = id;
      document.getElementById("modalImage").src = image || "/images/blank.png";
      document.getElementById("modalMain").checked = isMain;
      document.getElementById("modalOrder").value = order || "";
      document.getElementById("modalLayout").value = layout || "square";
      document.getElementById("modalDescription").value = description || "";

      // title
      document.querySelector("#itemModal h3").innerText = "Edit item";

      // action (EDIT)
      form.action = `/admin/project-items/${id}?slug=${window.projectSlug}`;

      modal.classList.add("open");
    });
  });
}

function initNewTagInput() {
  const btn = document.getElementById("showTagInput");
  const input = document.getElementById("newTagInput");

  if (!btn || !input) return;

  btn.addEventListener("click", () => {
    input.style.display = "block";
    input.focus();
    btn.style.display = "none";
  });
}

function initApp() {
    initDropdownToggle();
    initItemModal();
    initVisitorsChart();
    renderTopPages();
    renderAvgTime();
    initTextareaCounter("[name='description']", 800);
    initFileClearButtons();
    initToast();
    initFormValidation('.js-validate-form');
    initDeleteItems();
    initAddProjectItem();
    initImagePreview();
    initEditProjectItem();
    initNewTagInput();
}

document.addEventListener("DOMContentLoaded", initApp);