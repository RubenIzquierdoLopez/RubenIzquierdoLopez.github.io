# Document organization

Keep every attachment in this folder tree and link to it from the nearest Jekyll data file using a path relative to that file.

## Recommended structure

- `Documents/Papers/` — preprints and papers
- `Documents/Slides/YYYY/` — slide decks by year
- `Documents/Posters/` — conference posters
- `Documents/Teaching/` — course material and handouts
- `Documents/Theses/` — bachelor and master thesis PDFs
- `Documents/CV/` — curriculum and supporting documents (optional)

## Naming rules

- Use lowercase or consistent camel-case names, but keep them stable.
- Prefer year folders for time-based material: `Slides/2026/`, `Slides/2025/`.
- Use descriptive names such as `Gamma_Seminar_2026.pdf` or `Hoja0_Ejercicio6.ggb`.
- Keep the final filename meaningful and avoid ad hoc names that depend on the page layout.

## Attachment rules

- Store the file in the most specific category above.
- In `_data/*.yml`, reference it with a relative URL that is correct from the data file location.
- Example paths:
  - `../Documents/Papers/2606.20030v1.pdf`
  - `../Documents/Slides/2026/OAK2.pdf`
  - `../Documents/Teaching/Geometría_Lineal_25/Hoja0_Ejercicio6.ggb`

## Validation

Run the repository validator after adding or renaming a file:

```powershell
ruby scripts/check_document_links.rb
```

This checks every local document reference used by the site and fails if a linked file is missing.
