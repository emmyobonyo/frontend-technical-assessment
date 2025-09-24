export class Navigation {
  constructor() {
    this.sections = document.querySelectorAll("section");
    this.links = document.querySelectorAll("a[href^='#']");

    this.currentSection = null;
    this.isScrolling = false;
    this.scrollHandler = this.onScroll.bind(this);

    this.observer = new IntersectionObserver(this.onIntersect.bind(this), {
      threshold: 0.3,
    });

    this.init();
  }

  init() {
    // Observe sections for intersection effects
    this.sections.forEach((section) => {
      this.observer.observe(section);
    });

    // Smooth scroll for links
    this.links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href")?.slice(1);
        const target = document.getElementById(targetId);

        if (target) {
          this.isScrolling = true;
          target.scrollIntoView({ behavior: "smooth" });

          // Reset after animation finishes
          setTimeout(() => (this.isScrolling = false), 800);
        }
      });
    });

    // Scroll listener (with rAF throttling)
    window.addEventListener("scroll", this.scrollHandler, { passive: true });
  }

  onScroll() {
    if (this.isTicking) return;
    this.isTicking = true;

    requestAnimationFrame(() => {
      this.sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          this.currentSection = section.id;
          section.classList.add("active");
        } else {
          section.classList.remove("active");
        }
      });
      this.isTicking = false;
    });
  }

  onIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  }

  destroy() {
    // Cleanup event listeners + observers
    window.removeEventListener("scroll", this.scrollHandler);
    this.observer.disconnect();
  }
}
