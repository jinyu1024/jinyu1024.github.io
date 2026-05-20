const yearEl = document.querySelector("#year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const sectionLinks = [...document.querySelectorAll(".nav-links a[href^='#']")];
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const setActiveLink = (id) => {
  sectionLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
};

if (sections.length) {
  const activeObserver = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      }, {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      })
    : null;

  if (activeObserver) {
    sections.forEach((section) => activeObserver.observe(section));
  } else {
    const updateActiveLink = () => {
      const current = sections.reduce((active, section) => {
        const distance = Math.abs(section.getBoundingClientRect().top - 120);
        return distance < active.distance ? { id: section.id, distance } : active;
      }, { id: sections[0].id, distance: Infinity });

      setActiveLink(current.id);
    };

    window.addEventListener("scroll", updateActiveLink, { passive: true });
    updateActiveLink();
  }

  const initialSection = document.querySelector(window.location.hash) || sections[0];
  setActiveLink(initialSection.id);
}

document.querySelectorAll("[data-news-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".news-track");
  const prev = carousel.querySelector(".carousel-button.prev");
  const next = carousel.querySelector(".carousel-button.next");

  if (!track || !prev || !next) return;

  const cardStep = () => {
    const card = track.querySelector(".news-card");
    if (!card) return 0;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    return card.getBoundingClientRect().width + gap;
  };

  const updateButtons = () => {
    const maxScroll = track.scrollWidth - track.clientWidth - 2;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= maxScroll;
  };

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -cardStep(), behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    track.scrollBy({ left: cardStep(), behavior: "smooth" });
  });

  track.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons);
  updateButtons();
});

const fadeObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 })
  : null;

document.querySelectorAll(".fade-in").forEach((element) => {
  if (fadeObserver) {
    fadeObserver.observe(element);
  } else {
    element.classList.add("is-visible");
  }
});
