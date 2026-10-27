// === Settings: change the WhatsApp number here (country code + number, no + or spaces) ===
const WHATSAPP_NUMBER = "923254654294";

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("waLink").href = "https://wa.me/" + WHATSAPP_NUMBER;

// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

// Trial form -> opens WhatsApp with the details filled in
const form = document.getElementById("trialForm");
const errorBox = document.getElementById("formError");

form.addEventListener("submit", e => {
  e.preventDefault();
  form.querySelectorAll("input,select").forEach(f => f.classList.add("touched"));
  if (!form.checkValidity()) {
    errorBox.textContent = "Please fill in the student name, age, country and course.";
    errorBox.hidden = false;
    return;
  }
  errorBox.hidden = true;
  const d = Object.fromEntries(new FormData(form));
  const msg =
    "Assalamu alaikum! I would like to book the 3-day free trial.\n" +
    "Student: " + d.name + "\n" +
    "Age: " + d.age + "\n" +
    "Country: " + d.country + "\n" +
    "Course: " + d.course + "\n" +
    "Preferred teacher: " + d.teacher;
  window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
});

// Keep one FAQ item open at a time
const items = document.querySelectorAll(".faq details");
items.forEach(el =>
  el.addEventListener("toggle", () => {
    if (el.open) items.forEach(o => { if (o !== el) o.open = false; });
  })
);

// Courses, Why-us and Steps: scroll reveal (one after another) + soft gold glow that follows the mouse
const cards = document.querySelectorAll(".course, .why > div, .steps li");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", (e.clientX - r.left) + "px");
    card.style.setProperty("--my", (e.clientY - r.top) + "px");
  });
});

if ("IntersectionObserver" in window && !reduceMotion) {
  document.documentElement.classList.add("js");
  cards.forEach(c => c.classList.add("reveal"));
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      const i = [...cards].indexOf(card) % 3;
      card.style.transitionDelay = (i * 120) + "ms";
      card.classList.add("in");
      io.unobserve(card);
      // after the entrance, hand control back to the normal hover styles
      setTimeout(() => {
        card.classList.remove("reveal", "in");
        card.style.transitionDelay = "";
      }, 1200);
    });
  }, { threshold: 0.2 });
  cards.forEach(c => io.observe(c));
}