# Architecture

## High-level model

The repository has two presentation pipelines sharing structured data:

```text
_data/*.yml
   ├── Jekyll/Liquid website pages and includes
   └── CV templates/build scripts under _cv/
```

The website and CV are separate consumers. A change in shared data can affect both even when only one output is visible during development.

## Website pipeline

Source HTML/Liquid pages, includes, CSS, JavaScript, images, documents, and `_data/` are processed by Jekyll into `_site/`.

Important source locations:
- Pages: `index.html`, `Research/`, `Talks/`, `Teaching/`, `About/`, `Miscellany/`
- Shared include: `_includes/navigation.html`
- Styling: `style.css`
- Client behavior: `script.js`
- Data: `_data/`
- Validation: `scripts/check_document_links.rb`

## CV pipeline

The CV source and build material is under `_cv/`. It consumes project information and/or shared data to generate the CV PDF. Inspect `_cv/main.tex`, `_cv/cv-data.tex`, and `_cv/build_cv.rb` before changing CV-related data or templates.

## Data files

The current shared data layer includes:
- `research.yml`: preprints and publications
- `teaching.yml`: teaching years, courses, links, schedules, and materials
- `cv.yml`: personal details, biography, education, research experience, and CV-oriented records
- `photos.yml`: image paths and descriptions
- `trips.yml`: locations, dates, events, descriptions, coordinates, and images
- `talks.yml`: talks, posters, events, dates, titles, and resources
- `miscellany.yml`: miscellaneous content

Do not assume a field is website-only or CV-only. Search for all references before changing it.

## Safe change procedure

1. Search for the data filename and field names across the repository.
2. Read the relevant page/template and CV consumer.
3. Preserve the existing schema where possible.
4. Make the smallest source change.
5. Build the website.
6. Build or validate the CV if the changed data is consumed by it.
7. Run document-link checks when paths or resources changed.
8. Inspect the generated outputs for both purposes.

## Generated output

`_site/` is generated website output. Do not patch it manually. Regenerate it from source.

## Cross-output consistency

Academic titles, publication metadata, dates, affiliations, and links should have one authoritative value in data. Presentation-specific shortening belongs in templates or controlled formatting, not in duplicated contradictory data.
