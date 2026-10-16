import { services } from "./data.js";

const menuButton = document.querySelector(".menu");
const closeButton = document.querySelector(".close");
const sideBar = document.querySelector(".links-container");
const backdrop = document.querySelector(".menu-backdrop");
const menuLinks = document.querySelectorAll(
  ".links-container a:not(.mobile-cv-button)",
);
const container = document.querySelector(".service-container");

function openMenu() {
  sideBar.classList.add("active");
  backdrop.classList.add("active");
  document.body.classList.add("menu-open");
  menuButton.setAttribute("aria-expanded", "true");
  sideBar.setAttribute("aria-hidden", "false");
  closeButton.focus();
}

function closeMenu() {
  sideBar.classList.remove("active");
  backdrop.classList.remove("active");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  sideBar.setAttribute("aria-hidden", "true");
  menuButton.focus();
}

menuButton.addEventListener("click", openMenu);
closeButton.addEventListener("click", closeMenu);
backdrop.addEventListener("click", closeMenu);

menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && sideBar.classList.contains("active")) {
    closeMenu();
  }
});

window.addEventListener("load", () => {
  const animation = document.getElementById("intro-loader");

  setTimeout(() => {
    animation.classList.add("intro-loader--done");
    document.body.classList.remove("is-loading");
  }, 1800);
});

services.forEach((service) => {
  container.innerHTML += `
<div class="service-card">
  <img src="${service.image}" alt="${service.title}">
  <h3>${service.title}</h3>
  <p>${service.description}</p>
</div>`;
});
