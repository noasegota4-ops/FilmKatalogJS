// Učitavanje podataka i spremanje u preglednik.
export async function ucitajFilmove() {
  const response = await fetch("./filmovi.json");
  if (!response.ok) {
    throw new Error("Greška pri učitavanju podataka.");
  }
  const filmovi = await response.json();
  if (!Array.isArray(filmovi)) {
    throw new Error("Podaci moraju biti lista filmova.");
  }
  return filmovi;
}

export function dohvatiFavorite() {
  const spremljeno = localStorage.getItem("favoriti");
  if (spremljeno === null) return [];

  const favoriti = JSON.parse(spremljeno);
  if (!Array.isArray(favoriti) || !favoriti.every(Number.isInteger)) {
    throw new Error("Neispravni spremljeni favoriti.");
  }
  return favoriti;
}

export function spremiFavorite(favoriti) {
  localStorage.setItem("favoriti", JSON.stringify(favoriti));
}
