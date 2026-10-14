const menuIcon = document.querySelector(".menu");
const closeIcon = document.querySelector(".close");
const sideBar = document.querySelector(".links-container");

menuIcon.addEventListener("click", () => {
  sideBar.style.display = "flex";
  sideBar.classList.add("active");
});

closeIcon.addEventListener("click", () => {
  sideBar.style.display = "none";
  sideBar.classList.remove("active");
});

window.addEventListener("load", () => {
  const animation = document.getElementById("intro-loader");

  setTimeout(() => {
    animation.classList.add("intro-loader--done");
    document.body.classList.remove("is-loading");
  }, 1800);
});
