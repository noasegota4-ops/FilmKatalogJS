// Stanje aplikacije i logika koja ne ovisi o HTML-u.
export const state = {
  filmovi: [],
  pretraga: "",
  zanr: "Svi",
  favoriti: [],
  ucitavanje: false,
  greska: ""
};

export function filtriraniFilmovi() {
  const pretraga = state.pretraga.trim().toLowerCase();
  return state.filmovi.filter(function(film) {
    const odgovaraNaziv = film.naziv.toLowerCase().includes(pretraga);
    const odgovaraZanr = state.zanr === "Svi" || film.zanr === state.zanr;
    return odgovaraNaziv && odgovaraZanr;
  });
}

export function omiljeniFilmovi() {
  return state.filmovi.filter(function(film) {
    return state.favoriti.includes(film.id);
  });
}

export function promijeniFavorit(id) {
  if (state.favoriti.includes(id)) {
    state.favoriti = state.favoriti.filter(function(favoritId) {
      return favoritId !== id;
    });
  } else {
    state.favoriti.push(id);
  }
}
