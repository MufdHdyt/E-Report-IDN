/**
 * E-Report IDN - Main Application Script
 * Scroll Animation Engine using IntersectionObserver & Animate.css
 * Smooth, professional scroll-triggered animations (both on scroll down and scroll up).
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Navbar Active Link Sync based on Current Path
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".navbar .nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && (href === currentPath || (currentPath === "" && href === "index.html"))) {
      navLinks.forEach((l) => {
        l.classList.remove("active");
        l.removeAttribute("aria-current");
      });
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }

    link.addEventListener("click", () => {
      if (link.getAttribute("href")?.startsWith("#")) {
        navLinks.forEach((l) => {
          l.classList.remove("active");
          l.removeAttribute("aria-current");
        });
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  });

  // 2. Scroll Animation Engine (Animate.css on scroll up & down)
  const animElements = document.querySelectorAll("[data-animate]");

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px 120px 0px",
      threshold: 0,
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const animation = el.dataset.animate || "animate__fadeInUp";

        if (entry.isIntersecting) {
          // Trigger when entering viewport (scrolling down or scrolling up)
          el.classList.add("animate__animated", animation);
        } else {
          // Reset when leaving viewport so it re-triggers on reverse scroll
          // Only reset if it is not the hero or navbar
          if (!el.classList.contains("no-reset")) {
            el.classList.remove("animate__animated", animation);
          }
        }
      });
    }, observerOptions);

    animElements.forEach((el) => {
      scrollObserver.observe(el);
    });
  } else {
    // Fallback: make all elements immediately visible
    animElements.forEach((el) => {
      el.style.opacity = "1";
    });
  }
});
