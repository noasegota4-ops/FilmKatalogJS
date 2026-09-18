# FilmKatalog

Projekt izrađen u HTML-u, CSS-u i običnom JavaScriptu.
Katalog sadrži 33 filma s lokalno spremljenim posterima.



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
