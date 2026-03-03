async function loadComponent(targetId, filePath) {
  const el = document.getElementById(targetId);
  if (!el) return;

  const response = await fetch(filePath);
  if (!response.ok) {
    console.error("Failed to load:", filePath);
    return;
  }

  const html = await response.text();
  el.innerHTML = html;
}

/* IMPORTANT: load header first */
async function initLayout() {

  // 1. Inject header
  await loadComponent("header", "/components/header.html");

  // FORCE browser to register new DOM nodes
  await new Promise(requestAnimationFrame);

  // 2. Inject footer
  await loadComponent("footer", "/components/footer.html");

  await new Promise(requestAnimationFrame);

  // 3. NOW load template JS (AFTER DOM exists)
  const script = document.createElement("script");
  script.src = "/assets/js/main.js";

  script.onload = () => {
    // Re-initialize AOS AFTER header exists
    if (window.AOS) {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true
      });
    }
  };

  document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", initLayout);