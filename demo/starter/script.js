const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation?.classList.toggle("open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#demo-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const note = document.querySelector("#form-note");
  if (note) {
    note.textContent = "Thanks for trying the demo. On a client website, this enquiry would be delivered to the business.";
    note.classList.add("success");
  }
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
