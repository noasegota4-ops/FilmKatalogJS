import { ucitajFilmove, dohvatiFavorite, spremiFavorite } from "./data.js";
import { state, filtriraniFilmovi, omiljeniFilmovi, promijeniFavorit } from "./state.js";
import { prikaziFilmove, prikaziFavorite, prikaziStatus } from "./ui.js";

const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const filmGrid = document.getElementById("filmGrid");
const favoritesGrid = document.getElementById("favoritesGrid");
const storageMessage = document.getElementById("storageMessage");

// Prikaz uvijek prati trenutno stanje aplikacije.
function osvjeziPrikaz() {
  if (state.ucitavanje) {
    prikaziStatus("Učitavanje filmova...");
  } else if (state.greska) {
    prikaziStatus(state.greska);
  } else {
    prikaziFilmove(filtriraniFilmovi(), state.favoriti);
    prikaziFavorite(omiljeniFilmovi(), state.favoriti);
  }
}

searchInput.addEventListener("input", function() {
  state.pretraga = searchInput.value;
  osvjeziPrikaz();
});

genreFilter.addEventListener("change", function() {
  state.zanr = genreFilter.value;
  osvjeziPrikaz();
});

function obradiFavorit(event) {
  const button = event.target.closest(".favorite-btn");
  if (!button) return;

  promijeniFavorit(Number(button.dataset.id));
  try {
    spremiFavorite(state.favoriti);
    storageMessage.textContent = "";
  } catch (error) {
    storageMessage.textContent = "Favoriti vrijede za ovu sesiju, ali ih preglednik nije mogao trajno spremiti.";
  }
  osvjeziPrikaz();
}

filmGrid.addEventListener("click", obradiFavorit);
favoritesGrid.addEventListener("click", obradiFavorit);

async function pokreniKatalog() {
  try {
    state.favoriti = dohvatiFavorite();
  } catch (error) {
    storageMessage.textContent = "Spremljeni favoriti nisu dostupni. Možeš odabrati nove.";
  }

  state.pretraga = searchInput.value;
  state.zanr = genreFilter.value;
  state.ucitavanje = true;
  state.greska = "";
  osvjeziPrikaz();

  try {
    state.filmovi = await ucitajFilmove();
  } catch (error) {
    state.greska = "Došlo je do greške pri učitavanju filmova. Osvježi stranicu i pokušaj ponovno.";
    console.error(error);
  } finally {
    state.ucitavanje = false;
    osvjeziPrikaz();
  }
}

pokreniKatalog();
