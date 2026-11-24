const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const cartCount = document.querySelector(".cart-count");
const orderFeedback = document.querySelector(".order-feedback");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navLinks.classList.toggle("is-open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      navLinks.classList.remove("is-open");
    });
  });
}

let orderTotal = 0;
document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    orderTotal += 1;
    if (cartCount) cartCount.textContent = String(orderTotal);
    if (orderFeedback) orderFeedback.textContent = `${button.dataset.item} has been added to your order.`;
    button.classList.add("is-added");
    window.setTimeout(() => button.classList.remove("is-added"), 500);
  });
});

document.querySelectorAll(".menu-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;
    document.querySelectorAll(".menu-tab").forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    document.querySelectorAll(".menu-card").forEach((card) => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !visible);
    });
  });
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const sparkle = document.querySelector(".sparkle-cursor");
if (sparkle && window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener("pointermove", (event) => {
    sparkle.style.transform = `translate(${event.clientX - 3}px, ${event.clientY - 3}px)`;
    sparkle.classList.add("is-visible");
  }, { passive: true });
  document.addEventListener("pointerleave", () => sparkle.classList.remove("is-visible"));
}
