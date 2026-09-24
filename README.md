# Ruben Izquierdo López

This repository contains a personal academic website built with Jekyll and a separate, private CV pipeline driven by LaTeX and YAML data. The public site and the CV share the same source data and must stay consistent when content is updated.

## Project purpose

The repository serves two linked outputs:

- Public academic website: home, research, talks, teaching, and about pages.
- Local CV: a PDF generated from the research and activity data under `_cv/`.

The source of truth is the structured data in `_data/`. The generated site output under `_site/` is not edited manually.

## Site structure

The public website is organized as a multi-page Jekyll site:

- `index.html`: home page, biography, academic summary, and external profile links.
- `Research/index.html`: research themes, publication list, arXiv/DOI links, and PDF access.
- `Talks/index.html`: talks, posters, lecture series, event links, and downloadable resources.
- `Teaching/index.html`: teaching portfolio grouped by academic year and course metadata.
- `About/index.html`: map of academic trips and a gallery of selected photographs.
- `Miscellany/index.html`: a secondary page that mirrors the same trip/photo pattern and acts as a catch-all section for additional content.

Shared navigation is in `_includes/navigation.html`, styling is in `style.css`, and behavior is in `script.js`.

## Current functionality of the website

The site is more than a static page set. It includes several interactive and data-driven features.

### 1. Data-driven academic content

The pages read YAML content from `_data/` using Jekyll's `site.data` access pattern. This is the central model for the repository:

- `_data/research.yml`: preprints and publications with DOI/arXiv links and PDF download links.
- `_data/talks.yml`: yearly talk records with title, event, category, contribution type, date, links, notes, and resources.
- `_data/teaching.yml`: academic years, courses, online/offline status, degree information, schedules, and documents.
- `_data/trips.yml`: map entries with place, coordinates, event title, dates, and descriptions.
- `_data/photos.yml`: gallery images and captions.
- `_data/cv.yml`: private CV metadata and biography content used by the LaTeX CV generation.

The website and CV both consume these records, so a single data update may affect both outputs.

### 2. Research page with accordion sections and citation links

`Research/index.html` includes:

- A research overview with expandable accordion sections for each main topic.
- Publication and preprint sections ordered by date or relevance.
- `pdf` links for the actual paper files in `Documents/Papers/`.
- DOI and arXiv links for each item.
- A citation system based on `\cite{...}` markup, processed by `script.js` to convert citations into clickable references.
- Highlighting of cited targets when the URL hash points to a reference.

The front-end behavior in `script.js` parses the `citation-data` JSON injected by the include and rewrites citation text into links without hardcoding the bibliography in HTML.

### 3. Talks page with yearly grouping and resource buttons

`Talks/index.html` includes:

- Accordion groups by academic year.
- Event-level metadata such as date, event URL, title, and notes.
- Resource badges for slides, posters, videos, or other downloadable material.
- Support for `lecture_series` entries that remain on the site without being part of the CV contribution list.
- Scientific contribution records that can be surfaced in the CV using the appropriate `contribution_type` values.

### 4. Teaching page with course grouping and documents

`Teaching/index.html` includes:

- Teaching entries grouped by academic year.
- Course cards with links to the course page, degree, and downloadable teaching materials.
- Optional `online` filtering so online courses can be displayed or omitted depending on the intended page behavior.
- Fields for schedule, classroom, theory teacher, and supporting documents.

### 5. About page with map and gallery

`About/index.html` includes:

- An interactive Leaflet map of academic trips and visits.
- Markers with custom popup content generated from `site.data.trips`.
- Photo gallery with selected academic or personal images.
- An image viewer modal that opens full-size images and supports keyboard access and Escape-to-close behavior.

The JavaScript in `script.js` creates the map, loads the JSON trip data from the page, places markers, and handles the modal viewer image interaction.

### 6. Accessibility and interaction behavior

The client-side logic in `script.js` adds several usability features:

- Expand/collapse accordions for long research and teaching content.
- Keyboard-triggered image opening using Enter or Space on images with `enhance-image`.
- Focus restoration after closing the image viewer.
- Modern modal dialog semantics with `role="dialog"`, `aria-modal`, and keyboard support.
- Hash-based citation highlighting for in-page reference navigation.

### 7. Link validation and maintenance tooling

The repository contains a simple validation script:

- `scripts/check_document_links.rb` scans YAML/HTML/Markdown files for local document references and reports missing files.

This helps catch broken document paths, local PDFs, slide links, and similar issues before publishing.

### 8. Documentation and operational notes

The repo also contains project documentation under `docs/`:

- `docs/project.md`: overview of the two-output data model.
- `docs/architecture.md`: repository architecture and cross-output consistency notes.
- `docs/copilot-workflow.md`: operational guidance for working in the repo.

## Data-first workflow

The repository intentionally uses structured YAML rather than hardcoding content in the HTML templates.

A typical content update looks like this:

1. Edit the relevant file in `_data/`.
2. Update the matching page template only if the schema changes or a new field needs rendering.
3. Check that the data still flows into both the website and the CV when relevant.
4. Build the site and validate links.
5. Regenerate the CV if a shared record influences it.

Do not duplicate shared records across HTML and LaTeX. Keep the authoritative values in YAML and render them through the templates.

## Local development and build

Run the commands from the repository root.

### Install dependencies

```powershell
bundle install
```

### Local website preview

Ruby 3.3 and earlier:

```powershell
bundle exec jekyll serve --livereload
```

Ruby 4 compatibility workaround:

```powershell
C:\Ruby40-x64\bin\ruby.exe -e "class Object; def tainted?; false; end; end; require 'bundler'; Bundler.setup; spec=Gem.loaded_specs['jekyll']; load File.join(spec.full_gem_path, 'exe', 'jekyll')" serve --livereload
```

The site is available at:

```text
http://localhost:4000/
```

To do a one-off build instead of serving the site:

```powershell
bundle exec jekyll build --trace
```

or, for the Ruby 4 compatibility runner:

```powershell
C:\Ruby40-x64\bin\ruby.exe -e "class Object; def tainted?; false; end; end; require 'bundler'; Bundler.setup; spec=Gem.loaded_specs['jekyll']; load File.join(spec.full_gem_path, 'exe', 'jekyll')" build --trace
```

### CV generation

The private CV source lives in `_cv/` and is excluded from the public Jekyll site build.

To build the CV and generate the PDF:

```powershell
Push-Location _cv
ruby build_cv.rb
lualatex main.tex
Pop-Location
```

There is also a combined launcher:

```powershell
.\preview_site_and_cv.bat
```

This script starts the site and regenerates the CV as needed. The output PDF is copied into `Documents/Curriculum_Vitae.pdf` for the site’s navigation link.

## Key maintenance rules

- Do not edit `_site/` directly. It is generated output.
- Keep the shared YAML data as the main source of truth.
- Preserve field names and data types when modifying schemas.
- Update all consumers when adding, renaming, or removing a field.
- Prefer relative local document paths in YAML and keep links consistent with the page that renders them.
- Validate document links when paths or resources change.

## Validation commands

After making content or data changes, run the relevant checks:

```powershell
bundle exec jekyll build --trace
ruby scripts/check_document_links.rb
```

If the CV data or templates were modified, regenerate the PDF as well:

```powershell
Push-Location _cv
ruby build_cv.rb
lualatex main.tex
Pop-Location
```

## Summary

This project is a Jekyll-based academic portfolio that combines:

- a public website for research, talks, teaching, and travel history,
- an interactive presentation layer with accordions, maps, and modal image viewing,
- a data-driven architecture powered by YAML,
- and a separate LaTeX CV build driven by the same data model.

That combination is the heart of the repository and the main reason why content and configuration updates should be made carefully and with cross-output validation in mind.
      room: Room 101
      documents:
        - name: Resource title
          url: ../Documents/Teaching/resource.pdf
```

`documents` is optional. Its local URLs are relative to `Teaching/index.html`. `online` controls whether a course appears on the public Teaching page: it defaults to `yes`; set `online: no` to hide that course online. This flag does not remove the course from the private CV.

### `_data/photos.yml`

This data appears in the public About page photo gallery.

```yaml
- image: Images/Selected_pictures/example-photo.webp
  description: An optional caption shown on the photo and in the expanded viewer.
```

### `_data/trips.yml`

This data appears only as pins and popups on the map in the About page.

```yaml
- place: Example City
  country: Spain
  coordinates: [40.4168, -3.7038]
  date: June 2026
  title: Example conference
  description: A short description of the visit.
  image: Images/Trips/example-photo.webp
```

`image` is optional. Store map images in `Images/Trips/`. Coordinates must be `[latitude, longitude]`.

## Files and Assets

- Store papers, slides, posters, and teaching files in `Documents/`.
- Store site images and link icons in `Images/`.
- Edit the relevant `index.html` only to change page structure, not to add repeated data records.
- Edit `_includes/navigation.html` for shared navigation.
- Edit `style.css` and `script.js` for shared visual and interactive behavior.
- Keep public paths stable because existing pages and documents link to them.

## Before Publishing

1. Run a Jekyll build or preview the website.
2. Check Home, Research, Talks, Teaching, and About.
3. Confirm new local document links open correctly.
4. Regenerate the CV after changing `_data/cv.yml`, `_data/research.yml`, `_data/talks.yml`, or `_data/teaching.yml`.
5. Do not commit generated `_site/`, `.jekyll-cache/`, local Bundler directories, or `_cv/cv-data.tex` unless deliberately required.

See [AGENTS.md](AGENTS.md) for repository-specific maintenance and validation rules.