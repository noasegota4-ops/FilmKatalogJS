const menuButton = document.getElementById("menu-toggle");
const menu = document.getElementById("main-menu");

function zatvoriIzbornik() {
  menu.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", function() {
  const otvoren = menu.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(otvoren));
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" && menu.classList.contains("is-open")) {
    zatvoriIzbornik();
    menuButton.focus();
  }
});

// Pri prelasku na desktop zatvaramo prethodno otvoreni mobilni izbornik.
window.matchMedia("(max-width: 768px)").addEventListener("change", zatvoriIzbornik);
