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
        if (input.name === "note_order") {
          const num = parseInt(input.value, 10);

          if (isNaN(num) || num < 1) {
            valid = false;
          }

          const max = parseInt(input.max, 10);
          if (max && num > max) {
            valid = false;
          }
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

  document.querySelectorAll("[data-delete]").forEach(btn => {
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
    if (!modal.classList.contains("open")) return;
    if (!selectedId) return;

    if (selectedType === "item") {
      window.location = `/admin/project-items/delete/${selectedId}?slug=${window.projectSlug}`;
    }

    else if (selectedType === "project") {
      window.location = `/admin/projects/delete/${selectedId}`;
    }

    else if (selectedType === "tag") {
      window.location = `/admin/tags/delete/${selectedId}?slug=${window.projectSlug}`;
    }
  });

  modal.addEventListener("click", (e) => {
  if (e.target === modal) {
      modal.classList.remove("open");

      selectedId = null;
      selectedType = null;
    }
  });

  document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
      modal.classList.remove("open");

      selectedId = null;
      selectedType = null;
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

    form.action = `/admin/project-items/${window.projectSlug}`;

    const orderInput = document.getElementById("modalOrder");

    const existingOrders = Array.from(document.querySelectorAll(".item-row"))
      .map(row => parseInt(row.dataset.order))
      .filter(n => !isNaN(n));

    const maxOrder = existingOrders.length ? Math.max(...existingOrders) : 0;

    orderInput.value = maxOrder + 1;

    orderInput.min = 1;
    orderInput.max = maxOrder + 1;

    modal.classList.add("open");
    initMainCheckboxBehavior();
  });
}

function initImagePreview() {
  const input = document.getElementById("modalImageInput");
  const img = document.getElementById("modalImage");

  if (!input || !img) return;

  input.addEventListener("change", async () => {
    let file = input.files[0];
    if (!file) return;

    if (
      (file.type === "image/heic" ||
      file.name.toLowerCase().endsWith(".heic")) &&
      typeof heic2any !== "undefined"
    ) {
      try {
        const blob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.9
        });

        file = new File(
          [blob],
          file.name.replace(/\.heic$/i, ".jpg"),
          { type: "image/jpeg" }
        );

        const dt = new DataTransfer();
        dt.items.add(file);
        input.files = dt.files;

      } catch (err) {
        console.error("HEIC convert error:", err);
      }
    }

    const previewUrl = URL.createObjectURL(file);
    img.src = previewUrl;
  });
}

function initHeicConversionForAllInputs() {
  const inputs = document.querySelectorAll("input[type='file'][accept*='image']");

  inputs.forEach(input => {
    input.addEventListener("change", async () => {
      let file = input.files[0];
      if (!file) return;

      if (
        (file.type === "image/heic" ||
        file.name.toLowerCase().endsWith(".heic")) &&
        typeof heic2any !== "undefined"
      ) {
        try {
          const blob = await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.9
          });

          const newFile = new File(
            [blob],
            file.name.replace(/\.heic$/i, ".jpg"),
            { type: "image/jpeg" }
          );

          const dt = new DataTransfer();
          dt.items.add(newFile);
          input.files = dt.files;

          console.log("HEIC → JPG converted:", newFile.name);

        } catch (err) {
          console.error("HEIC convert error:", err);
        }
      }
    });
  });
}

function OpenCreateModal() {
  const modal = document.getElementById("itemModal");
  const form = document.getElementById("itemForm");

  const img = document.getElementById("modalImage");
  const input = document.getElementById("modalImageInput");

  form.reset();

  img.src = "/images/blank.png";
  input.value = "";

  document.getElementById("modalMain").checked = false;
  document.getElementById("modalItemId").value = "";
  document.querySelector("#itemModal h3").innerText = "Add item";

  form.action = `/admin/project-items/${window.projectSlug}`;

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

      const orderInput = document.getElementById("modalOrder");
      const existingOrders = Array.from(document.querySelectorAll(".item-row"))
        .map(r => parseInt(r.dataset.order))
        .filter(n => !isNaN(n));

      const maxOrder = existingOrders.length ? Math.max(...existingOrders) : 0;

      orderInput.min = 1;
      orderInput.max = maxOrder;

      document.getElementById("modalItemId").value = id;
      document.getElementById("modalImage").src = image || "/images/blank.png";
      document.getElementById("modalMain").checked = isMain;
      document.getElementById("modalOrder").value = order || "";
      document.getElementById("modalLayout").value = layout || "square";
      document.getElementById("modalDescription").value = description || "";
      document.querySelector("#itemModal h3").innerText = "Edit item";

      form.action = `/admin/project-items/${window.projectSlug}/${id}`;

      modal.classList.add("open");
      initMainCheckboxBehavior();
    });
  });
}

function initNewTagInput() {
  const showBtn = document.getElementById("showTagInput");
  const wrapper = document.getElementById("newTagWrapper");
  const input = document.getElementById("newTagInput");
  const addBtn = document.getElementById("addTagBtn");
  const hiddenInput = document.getElementById("hiddenNewTag");

  if (!showBtn || !wrapper || !input || !addBtn || !hiddenInput) return;

  showBtn.addEventListener("click", () => {
    wrapper.style.display = "flex";
    input.focus();
    showBtn.style.display = "none";
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      return false;
    }
  });

  addBtn.addEventListener("click", () => {
    const value = input.value.trim();

    if (!value) return;

    hiddenInput.value = value;

    input.closest("form").submit();
  });
}

function initMainCheckboxBehavior() {
  const mainCheckbox = document.getElementById("modalMain");
  const orderInput = document.getElementById("modalOrder");
  const layoutInput = document.getElementById("modalLayout");
  const descInput = document.getElementById("modalDescription");

  if (!mainCheckbox || !orderInput || !layoutInput || !descInput) return;

  function updateState() {
    if (mainCheckbox.checked) {
      orderInput.value = 0;
      orderInput.disabled = true;

      layoutInput.disabled = true;
      descInput.disabled = true;

      layoutInput.value = "square";

    } else {
      orderInput.disabled = false;
      layoutInput.disabled = false;
      descInput.disabled = false;

      if (orderInput.value === "0") {
        orderInput.value = "";
      }
    }
  }

  mainCheckbox.addEventListener("change", updateState);

  updateState();
}

function initApp() {
    initDropdownToggle();
    initItemModal();
    initVisitorsChart();
    renderTopPages();
    initTextareaCounter("[name='description']", 1200);
    initFileClearButtons();
    initToast();
    initFormValidation('.js-validate-form');
    initDeleteItems();
    initAddProjectItem();
    initImagePreview();
    initEditProjectItem();
    initNewTagInput();
    initMainCheckboxBehavior();
    initHeicConversionForAllInputs();
}

document.addEventListener("DOMContentLoaded", initApp);