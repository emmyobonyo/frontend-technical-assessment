import { DragDrop } from "./dragDrop.js";
import { BlogList } from "./BlogList.js";
import { Navigation } from "./navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Drag & Drop
  const dragDropContainer = document.querySelector(".drag-drop-container");
  if (dragDropContainer) {
    const dragDrop = new DragDrop();
    dragDrop.init();
  }

  //   Initialize Blog List (partial)
  const blogListContainer = document.querySelector(".blog-list-container");
  if (blogListContainer) {
    const blogList = new BlogList(blogListContainer);
    blogList.init();
  }

  // Initialize Navigation
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
});
