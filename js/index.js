function changerLangue(langue) {
  const anglais = document.querySelectorAll("[data-en]");
  const français = document.querySelectorAll("[data-fr]");
  anglais.forEach((element) => {
    if (langue === "en") {
      element.innerHTML = element.getAttribute("data-en");
    }
  });
  français.forEach((element) => {
    if (langue === "fr") {
      element.innerHTML = element.getAttribute("data-fr");
    }
  });

  localStorage.setItem("preferredLanguage", langue);
}

const savedLanguage = localStorage.getItem("preferredLanguage") || "fr";

changerLangue(savedLanguage);
