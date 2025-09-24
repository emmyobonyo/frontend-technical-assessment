import { DragDrop } from "./dragDrop.js";
import { BlogList } from "./BlogList.js";
import { Navigation } from "./navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  const dragDropContainer = document.querySelector(".drag-drop-container");
  if (dragDropContainer) {
    const dragDrop = new DragDrop();
    dragDrop.init();
  }

  const blogListContainer = document.querySelector(".blog-list-container");
  if (blogListContainer) {
    const blogList = new BlogList(blogListContainer);
    blogList.init();
  }

  new Navigation();

  const toggleButton = document.querySelector(".nav-toggle");
  const navList = document.getElementById("nav-list");

  if (toggleButton && navList) {
    toggleButton.addEventListener("click", () => {
      const expanded = toggleButton.getAttribute("aria-expanded") === "true";

      toggleButton.setAttribute("aria-expanded", String(!expanded));
      navList.classList.toggle("open");
    });

    navList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggleButton.setAttribute("aria-expanded", "false");
        navList.classList.remove("open");
      });
    });
  }

  navList.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });

        toggleButton.setAttribute("aria-expanded", "false");
        navList.classList.remove("open");
      }
    });
  });

  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  const linkMap = {};
  navLinks.forEach((link) => {
    const id = link.getAttribute("href").substring(1);
    linkMap[id] = link;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("active"));
          const id = entry.target.getAttribute("id");
          if (linkMap[id]) {
            linkMap[id].classList.add("active");
          }
        }
      });
    },
    {
      root: null,
      threshold: 0.3,
    }
  );

  const sections = document.querySelectorAll("section");
  sections.forEach((section) => observer.observe(section));
});
