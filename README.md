# FilmKatalog

Fakultetski projekt izrađen u HTML-u, CSS-u i običnom JavaScriptu, bez frameworka.
Katalog sadrži 33 filma s lokalno spremljenim posterima.

## Pokretanje

U mapi projekta pokreni lokalni web poslužitelj:

```sh
python -m http.server 8000
```

Zatim otvori http://localhost:8000 u pregledniku. Možeš koristiti i VS Code Live Server.
Stranicu treba otvoriti preko poslužitelja jer `fetch` i JavaScript moduli ne rade
pravilno pri otvaranju HTML datoteke dvoklikom (`file://`).

## Organizacija JavaScripta

- `data.js`: učitava `filmovi.json` preko `fetch` i čita/sprema favorite u `localStorage`.
- `state.js`: čuva filmove, pretragu, žanr, favorite, stanje učitavanja i grešku;
  sadrži logiku filtriranja i promjene favorita.
- `ui.js`: izrađuje kartice i prikazuje poruke korisniku.
- `main.js`: povezuje module, obrađuje događaje i pokreće katalog.
- `kontakt.js`: obrađuje kontakt formu, validira unos i prikazuje poruke bez reloada.
- `navigacija.js`: otvara mobilni izbornik i zatvara ga tipkom Escape.

Skripte se uključuju s `type="module"`, a moduli koriste `import` i `export`.
Primjer toka: unos u pretragu → promjena stanja → filtriranje podataka → prikaz kartica.

## Funkcionalnosti

- Dinamički prikaz kartica iz JSON podataka na stranici kataloga.
- Pretraga naslova i filtriranje po žanru, uključujući kombinaciju oba filtra.
- Dodavanje i uklanjanje favorita koji ostaju spremljeni nakon osvježavanja stranice.
- Sekcija „Moji favoriti” prikazuje spremljene filmove i njihov broj. Film se može
  ukloniti iz obje sekcije. Pretraga i žanr primjenjuju se samo na popis svih filmova.
- Poruke za učitavanje, grešku i prazan rezultat.
- Kontakt forma provjerava ime, email i poruku te sprječava ponovno učitavanje stranice.
- Kontakt forma je demonstracija: nema poslužiteljskog slanja poruka.

Izdvojeni filmovi na početnoj stranici ostaju statički HTML sadržaj.
`preuzmi_postere.py` je pomoćna skripta za preuzimanje postera i nije potrebna za rad aplikacije.
Izvori postera navedeni su u `slike/README.md`.

## Ručna provjera

1. Otvori katalog i provjeri prikaz 33 kartice.
2. Pretraži `Matrix`, zatim odaberi žanr `Drama`: treba se pojaviti poruka da nema rezultata.
3. Vrati žanr na `Svi`, dodaj film u favorite i osvježi stranicu: favorit treba ostati označen.
4. U kontakt formu unesi prazne/neispravne podatke, a zatim ispravne: poruke se mijenjaju bez reloada.
5. Za loading stanje koristi usporavanje mreže u alatima preglednika;
   za error stanje blokiraj zahtjev za `filmovi.json` i osvježi katalog.

## Pristupačnost i mobilni prikaz

Navigacija koristi gumb dostupan tipkovnicom (Enter/Space), `aria-expanded`
i `aria-current` za aktivnu stranicu. Escape zatvara mobilni izbornik.
Stranice imaju skip link, vidljiv fokus, tekstualne opise slika i oznake polja.
Kontakt forma koristi HTML ograničenja `required`, `minlength` i `type="email"`,
uz dodatne JavaScript provjere i poruke.

## Objava na Netlifyju

Projekt je statička stranica i ne zahtijeva build naredbu ni instalaciju paketa.
Datoteka `netlify.toml` postavlja objavu iz korijena projekta.
Za objavu poveži GitHub repozitorij s Netlifyjem ili učitaj mapu stranice ručno.
Korijen objave treba sadržavati `index.html`, ostale HTML datoteke, CSS,
JavaScript module, `filmovi.json` i mapu `slike`.
Ako je FilmKatalog podmapa repozitorija, postavi tu podmapu kao osnovnu mapu projekta.
Nakon objave provjeri sve četiri stranice, favorite i učitavanje JSON podataka.
Poveznicu na objavljenu stranicu dodaj ovdje nakon uspješne objave.
