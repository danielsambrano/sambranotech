const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");
const demoBar = document.querySelector(".demo-bar");
if (demoBar && !demoBar.querySelector(".demo-switch")) {
  const switchLink = document.createElement("a");
  switchLink.className = "demo-switch";
  switchLink.href = "../../website-development.html#packages";
  switchLink.textContent = "Compare All Website Demos";
  demoBar.insertBefore(switchLink, demoBar.lastElementChild);
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));
}

document.querySelectorAll("[data-year]").forEach((item) => {
  item.textContent = new Date().getFullYear();
});

const demoForm = document.querySelector("#quote-form");
if (demoForm) {
  demoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = document.querySelector("#form-note");
    note.textContent = "Thank you. This demonstration form works visually but does not send your information.";
    note.classList.add("success");
    demoForm.reset();
  });
}
