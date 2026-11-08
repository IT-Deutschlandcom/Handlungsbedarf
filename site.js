const loader = document.getElementById("page-loader");

if (loader) {
  window.setTimeout(() => {
    loader.classList.add("is-hidden");
    document.body.classList.remove("loading");
    window.setTimeout(() => loader.remove(), 450);
  }, 1500);
}

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navigation.classList.toggle("is-open", !expanded);
  });
}

const root = document.documentElement;
let pointerFrame;

window.addEventListener("pointermove", (event) => {
  if (pointerFrame) return;
  pointerFrame = window.requestAnimationFrame(() => {
    root.style.setProperty("--spot-x", `${event.clientX}px`);
    root.style.setProperty("--spot-y", `${event.clientY}px`);
    pointerFrame = undefined;
  });
}, { passive: true });

const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const subject = encodeURIComponent(`Kontaktanfrage von ${formData.get("name")}`);
    const body = encodeURIComponent([
      `Name: ${formData.get("name")}`,
      `E-Mail: ${formData.get("email")}`,
      `Telefon: ${formData.get("phone") || "Keine Angabe"}`,
      `Website: ${formData.get("website") || "Keine Angabe"}`,
      "",
      "Nachricht:",
      formData.get("message"),
    ].join("\n"));

    const status = contactForm.querySelector(".form-status");
    status.textContent = "Ihr E-Mail-Programm wird mit der vorbereiteten Nachricht geöffnet.";
    window.location.href = `mailto:info@it-deutschland.com?subject=${subject}&body=${body}`;
  });
}
