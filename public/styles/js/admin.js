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

function initApp() {
    initDropdownToggle();
    console.log("admin.js loaded");
}

document.addEventListener("DOMContentLoaded", initApp);