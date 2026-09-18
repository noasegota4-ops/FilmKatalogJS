// Ovaj modul mijenja samo prikaz na stranici.
const filmGrid = document.getElementById("filmGrid");
const statusMessage = document.getElementById("statusMessage");
const favoritesGrid = document.getElementById("favoritesGrid");
const favoritesMessage = document.getElementById("favoritesMessage");
const favoritesCount = document.getElementById("favoritesCount");

export function prikaziStatus(poruka) {
  filmGrid.innerHTML = "";
  statusMessage.textContent = poruka;
  favoritesGrid.innerHTML = "";
  favoritesMessage.textContent = poruka;
  favoritesCount.textContent = "—";
}

export function prikaziFilmove(listaFilmova, favoriti) {
  filmGrid.innerHTML = "";

  if (listaFilmova.length === 0) {
    statusMessage.textContent = "Nema pronađenih filmova.";
    return;
  }

  statusMessage.textContent = "";

  prikaziKartice(listaFilmova, favoriti, filmGrid);
}

export function prikaziFavorite(listaFilmova, favoriti) {
  favoritesCount.textContent = listaFilmova.length;
  favoritesMessage.textContent = listaFilmova.length === 0
    ? "Još nemaš favorita. Odaberi film klikom na Dodaj u favorite."
    : "Tvoji spremljeni filmovi. Pretraga i žanr filtriraju samo popis svih filmova.";
  prikaziKartice(listaFilmova, favoriti, favoritesGrid);
}

// Obje sekcije koriste isti izgled kartica.
function prikaziKartice(listaFilmova, favoriti, grid) {
  grid.innerHTML = "";
  listaFilmova.forEach(function(film) {
    const jeFavorit = favoriti.includes(film.id);

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <span class="badge">${film.zanr}</span>
      <img src="${film.slika}" alt="Poster filma ${film.naziv}" width="180" height="270" loading="lazy" decoding="async">
      <h3>${film.naziv}</h3>
      <p>${film.godina}</p>
      <button class="favorite-btn" data-id="${film.id}" aria-pressed="${jeFavorit}">
        ${jeFavorit ? "★ Ukloni iz favorita" : "☆ Dodaj u favorite"}
      </button>
    `;

    card.querySelector("img").addEventListener("error", function() {
      this.src = "slike/poster-nedostupan.svg";
    }, { once: true });

    grid.appendChild(card);
  });
}

