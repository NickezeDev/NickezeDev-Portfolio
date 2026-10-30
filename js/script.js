import { services, projets } from "./data.js";

// ========================================
// 1. MENU DE NAVIGATION
// ========================================
const menuButton = document.querySelector(".menu");
const closeButton = document.querySelector(".close");
const sideBar = document.querySelector(".links-container");
const backdrop = document.querySelector(".menu-backdrop");

const menuLinks = document.querySelectorAll(
  ".links-container a:not(.mobile-cv-button)",
);

if (menuButton && closeButton && sideBar && backdrop) {
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
}

// ========================================
// 2. BOUTONS DE LANGUE
// ========================================
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// ========================================
// 3. ÉCRAN DE CHARGEMENT
// ========================================
window.addEventListener("load", () => {
  const animation = document.getElementById("intro-loader");

  if (animation) {
    setTimeout(() => {
      animation.classList.add("intro-loader--done");
      document.body.classList.remove("is-loading");
    }, 1800);
  }
});

// ========================================
// 4. AFFICHER LES SERVICES
// ========================================
const container = document.querySelector(".service-container");

if (container) {
  services.forEach((service) => {
    container.innerHTML += `
      <article class="service-card">
        <img src="${service.image}" alt="${service.titleFR}">
        <h3 data-fr="${service.titleFR}" data-en="${service.titleEN}">
          ${service.titleFR}
        </h3>
        <p data-fr="${service.descriptionFR}" data-en="${service.descriptionEN}">
          ${service.descriptionFR}
        </p>
      </article>`;
  });
}

// ========================================
// 5. AFFICHER LES PROJETS
// ========================================
const container1 = document.querySelector(".projet-container");

if (container1) {
  projets.forEach((projet) => {
    container1.innerHTML += `
      <article class="projet-card">
        <img src="${projet.image}" alt="${projet.titleFR}">
        <h3 data-fr="${projet.titleFR}" data-en="${projet.titleEN}">
          ${projet.titleFR}
        </h3>
        <p>${projet.description}</p>
      </article>`;
  });
}

// ========================================
// 6. FORMULAIRE DE CONTACT AVEC EMAILJS
// ========================================
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  const submitButton = contactForm.querySelector('button[type="submit"]');

  // Créer une zone pour afficher le résultat
  const statusMessage = document.createElement("p");
  statusMessage.id = "form-status";
  statusMessage.setAttribute("role", "status");
  statusMessage.setAttribute("aria-live", "polite");
  contactForm.appendChild(statusMessage);

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Vérifier que les quatre champs sont remplis
    const name = contactForm.querySelector('[name="name"]');
    const email = contactForm.querySelector('[name="email"]');
    const subject = contactForm.querySelector('[name="subject"]');
    const message = contactForm.querySelector('[name="message"]');

    if (
      !name?.value.trim() ||
      !email?.value.trim() ||
      !subject?.value.trim() ||
      !message?.value.trim()
    ) {
      statusMessage.textContent =
        "Veuillez remplir tous les champs avant d'envoyer le message.";
      statusMessage.style.color = "red";
      return;
    }

    if (!email.checkValidity()) {
      statusMessage.textContent = "Veuillez saisir une adresse e-mail valide.";
      statusMessage.style.color = "red";
      email.focus();
      return;
    }

    // Vérifier que le SDK EmailJS est chargé
    if (!window.emailjs) {
      statusMessage.textContent =
        "Le service d'envoi n'est pas chargé. Vérifiez la configuration EmailJS dans home.html.";
      statusMessage.style.color = "red";
      return;
    }

    // Identifiants de ton compte EmailJS
    const SERVICE_ID = "service_xts1h9a";
    const TEMPLATE_ID = "template_266pxgz";
    const PUBLIC_KEY = "VRc_GbOHFYCbxyeJw";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Envoi en cours...";
    }

    statusMessage.textContent = "Envoi de votre message...";
    statusMessage.style.color = "inherit";

    try {
      // Initialiser EmailJS et envoyer le formulaire
      window.emailjs.init({
        publicKey: PUBLIC_KEY,
      });

      await window.emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm);

      statusMessage.textContent =
        "Votre message a été envoyé avec succès ! Merci de m'avoir contacté.";
      statusMessage.style.color = "green";

      contactForm.reset();

      // Masquer le message après 4 secondes
      setTimeout(() => {
        statusMessage.textContent = "";
      }, 4000);
    } catch (error) {
      console.error("Erreur EmailJS :", error);

      const details = error?.text || error?.message || "Erreur inconnue";

      statusMessage.textContent = "Erreur EmailJS : " + details;
      statusMessage.style.color = "red";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Envoyer le message";
      }
    }
  });
}
