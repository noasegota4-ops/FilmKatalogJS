const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const nameInput = contactForm.elements.namedItem("name");
const emailInput = contactForm.elements.namedItem("email");
const messageInput = contactForm.elements.namedItem("message");

function prikaziGresku(polje, poruka) {
  formMessage.textContent = poruka;
  polje.setAttribute("aria-invalid", "true");
  polje.setAttribute("aria-describedby", "formMessage");
  polje.focus();
}

function ocistiPoruku() {
  formMessage.textContent = "";
  for (const polje of [nameInput, emailInput, messageInput]) {
    polje.removeAttribute("aria-invalid");
    polje.removeAttribute("aria-describedby");
  }
}

contactForm.addEventListener("input", ocistiPoruku);

// HTML provjera radi prije submit događaja; prikazujemo i poruku na stranici.
contactForm.addEventListener("invalid", function(event) {
  const prvoNeispravno = contactForm.querySelector(":invalid");
  if (event.target !== prvoNeispravno) return;
  ocistiPoruku();
  if (event.target === nameInput) {
    prikaziGresku(nameInput, "Ime mora imati barem 2 znaka.");
  } else if (event.target === emailInput) {
    prikaziGresku(emailInput, "Unesi ispravnu email adresu.");
  } else {
    prikaziGresku(messageInput, "Poruka mora imati barem 10 znakova.");
  }
}, true);

contactForm.addEventListener("submit", function(event) {
  event.preventDefault();
  ocistiPoruku();

  const name = nameInput.value.trim();
  emailInput.value = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (name.length < 2) {
    prikaziGresku(nameInput, "Ime mora imati barem 2 znaka.");
    return;
  }

  // Koristimo ugrađenu provjeru polja type="email" iz JavaScripta.
  if (!emailInput.validity.valid) {
    prikaziGresku(emailInput, "Unesi ispravnu email adresu.");
    return;
  }

  if (message.length < 10) {
    prikaziGresku(messageInput, "Poruka mora imati barem 10 znakova.");
    return;
  }

  formMessage.textContent = "Podaci su ispravni. Ovo je demonstracija — poruka nije poslana.";
  contactForm.reset();
});
