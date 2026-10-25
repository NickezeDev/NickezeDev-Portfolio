import { services, projets } from "./data.js";

const menuButton = document.querySelector(".menu");
const closeButton = document.querySelector(".close");
const sideBar = document.querySelector(".links-container");
const backdrop = document.querySelector(".menu-backdrop");
const menuLinks = document.querySelectorAll(
  ".links-container a:not(.mobile-cv-button)",
);
const container = document.querySelector(".service-container");
const container1 = document.querySelector(".projet-container");
// const button = document.getElementById("lang-toggle");

// function changerLangue(langue) {
//   const anglais = document.querySelectorAll("[data-en]");
//   const français = document.querySelectorAll("[data-fr]");
//   anglais.forEach((element) => {
//     if (langue === "en") {
//       element.textContent = element.getAttribute("data-en");
//     }
//   });
//   français.forEach((element) => {
//     if (langue === "fr") {
//       element.textContent = element.getAttribute("data-fr");
//     }
//   });
// }

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
  <img src="${service.image}" alt="${service.titleFR}">
  <h3 data-fr="${service.titleFR}" data-en="${service.titleEN}">${service.titleFR}</h3>
  <p data-fr="${service.descriptionFR}" data-en="${service.descriptionEN}">${service.descriptionFR}</p>
</div>`;
});

projets.forEach((projet) => {
  container1.innerHTML += `
<div class="projet-card">
  <img src="${projet.image}" alt="${projet.titleFR}">
  <h3 data-fr="${projet.titleFR}" data-en="${projet.titleEN}">${projet.titleFR}</h3>
  <p>${projet.description}</p>
</div>`;
});

// function changerLange() {
//   const langue = document.documentElement.lang === "fr" ? "en" : "fr";

//   document.documentElement.lang === langue;

//   document.querySelectorAll("[data-fr] [data-en]").forEach((element) => {
//     element.textContent = element.getAttribute("data-" + langue);
//   });

//   localStorage.setItem("langue", langue);
// }

// button.addEventListener("click", changerLange);
// const langueSauvee = localStorage.getItem("langue") || "fr";
// document.documentElement.lang = langueSauvee;

// document.querySelectorAll("[data-fr] [data-en]").forEach((element) => {
//   element.textContent = element.getAttribute("data-" + langueSauvee);
// });
