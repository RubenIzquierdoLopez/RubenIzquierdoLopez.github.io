# Ruben Izquierdo Lopez

This repository contains a personal academic website and a private, data-driven LaTeX CV. The website is published with Jekyll; the CV is generated locally and is not part of the public site.

## How the website works

Jekyll builds static HTML from the source files in this repository. GitHub Pages runs the build automatically after a push. The source files are the files to edit; `_site/` is generated output and must not be edited.

The public pages are:

- `index.html`: home page and biography.
- `Research/index.html`: publications and preprints.
- `Talks/index.html`: talks, posters, and lecture-series sessions.
- `Teaching/index.html`: course information and resources.
- `Miscellany/index.html`: other academic activity.

The page templates read structured data from `_data/` through Jekyll's `site.data` object. Shared navigation is in `_includes/navigation.html`; shared styles and behavior are in `style.css` and `script.js`.

## One Data Change, Two Outputs

Use `_data/` as the source of truth for academic records. A change to a shared YAML file can update both the public webpage and the local CV:

- Add a paper to `_data/research.yml`: it appears on the Research page and in the CV.
- Add a CV-eligible scientific contribution to `_data/talks.yml`: it appears on the Talks page and in the appropriate CV subsection.
- Add a course to `_data/teaching.yml`: it appears on the Teaching page and in the CV Teaching section.

Do not duplicate shared records in HTML or LaTeX. After editing data, build the website and regenerate the CV when relevant.

## Local Builds

Run commands from the repository root.

### Website preview

Install the dependencies once:

```powershell
bundle install
```

Then start the local Jekyll server:

```powershell
C:\Ruby40-x64\bin\ruby.exe -e "class Object; def tainted?; false; end; end; require 'bundler'; Bundler.setup; spec=Gem.loaded_specs['jekyll']; load File.join(spec.full_gem_path, 'exe', 'jekyll')" serve --livereload
```

Open `http://localhost:4000/`. Jekyll watches source files and rebuilds after changes. Stop the server with `Ctrl+C`.

The long command is required by Ruby 4 because one Jekyll dependency still calls the removed `tainted?` method. With Ruby 3.3 or earlier, use:

```powershell
bundle exec jekyll serve --livereload
bundle exec jekyll build --trace
```

For a one-time Ruby 4 build, replace `serve --livereload` in the long command with `build --trace`.

### CV

The private [_cv/](_cv/) directory contains the LaTeX template and renderer. `_config.yml` excludes it from the Jekyll site.

To generate the CV and start the local website together, double-click `preview_site_and_cv.bat` or run it from PowerShell:

```powershell
.\preview_site_and_cv.bat
```

Generate the data file and compile the PDF:

```powershell
Push-Location _cv; ruby build_cv.rb; lualatex main.tex; Pop-Location
```

The result is [_cv/main.pdf](_cv/main.pdf). The combined launcher also copies it to `Documents/Curriculum_Vitae.pdf`, which is the public file opened by the Curriculum Vitae navigation link. The renderer writes `_cv/cv-data.tex`; do not edit that generated file. Edit the YAML data instead.

LuaLaTeX is required because the data contains accented characters. The first run can take longer while TeX indexes fonts.

## Data Files

Keep one blank line between records to make the YAML easy to scan. YAML indentation is meaningful: use two spaces for nested properties and never use tabs. Quote text containing `:` or characters that YAML could interpret specially.

### `_data/cv.yml`

CV-only information. It appears in the CV and is not rendered on the public website.

```yaml
personal:
  name: Name Surname
  title: PhD Student in Mathematics
  date_of_birth: DD/MM/YYYY
  nationality: Spanish
  location: Madrid, Spain
  email: name@example.org
  website: https://example.org
  orcid: https://orcid.org/0000-0000-0000-0000

bio: A concise research biography for the CV.

education:
  - degree: PhD in Mathematics
    institution: University or institute
    period: 2024--present
    detail: Fellowship, supervisor, thesis, or grade.

research_experience:
  - role: Researcher
    institution: Institution
    period: 2024--present
    detail: Short description.

research_stays:
  - role: Visiting Researcher
    institution: Host institution
    period: March 2026
    detail: Short description.

other_scientific_meetings_attended:
  - event: Name of conference, school, or workshop
    institution: Host institution or organizer
    period: June 2026
    detail: Optional short description.

awards:
  - name: Award name
    organization: Awarding organization
    year: 2026
    detail: Short description.

outreach_and_volunteering:
  - activity: Outreach activity
    period: 2026
    detail: Short description.

academic_activities_organized:
  - activity: Organizer, activity name
    period: 2025--2026
    detail: Short description.

languages:
  - Spanish (native)
  - English (professional working proficiency)
```

`personal`, `bio`, and every list above are used by the CV renderer. Keep `research_experience` for employment or ongoing research roles and `research_stays` for temporary visits. `other_scientific_meetings_attended` is only for conferences, workshops, or schools attended without contributing a talk or poster; contributed events belong in `_data/talks.yml`. Use `detail_tex` instead of `detail` only when a record needs trusted LaTeX, such as `\href{https://example.org}{https://example.org}`; ordinary text must remain in `detail`.

### `_data/research.yml`

Publications and preprints. Both groups appear on the public Research page and in the matching CV sections.

```yaml
publications:
  - citation: 'A. Author, "Paper title", Journal 1, 1--10 (2026).'
    pdf: ../Documents/Papers/paper.pdf
    doi: https://doi.org/10.example/identifier
    doi_label: 10.example/identifier

preprints:
  - citation: 'A. Author, "Preprint title".'
    pdf: ../Documents/Papers/preprint.pdf
    doi: https://arxiv.org/abs/1234.56789
    doi_label: arXiv:1234.56789
```

`citation` is required. `pdf`, `doi`, and `doi_label` provide website links; the CV currently uses the DOI link and label.

### `_data/talks.yml`

All records appear on the public Talks page. The CV includes only records with `category: scientific_contribution`, grouped by `contribution_type`.

```yaml
- year: 2026
  label: Talks and posters of 2026
  talks:
    - event: Conference name
      category: scientific_contribution
      contribution_type: contributed_conference_talk
      event_url: https://example.org/event
      date: 10--12 June, 2026
      title: Title of the contribution
      resources:
        - label: Slides
          url: ../Documents/Slides/2026/talk.pdf
          icon: pdf_icon.webp
      note: Optional additional information.
```

Use one of these `contribution_type` values for a CV scientific contribution:

- `invited_conference_talk`
- `contributed_conference_talk`
- `seminar`
- `poster`

For a lecture series that should remain on the website but not appear in the CV, use:

```yaml
category: lecture_series
```

`event`, `date`, and `title` are required. `event_url`, `resources`, and `note` are optional. Resource URLs are relative to `Talks/index.html`, so local files normally begin with `../Documents/`.

### `_data/teaching.yml`

Courses appear on the public Teaching page and in the CV Teaching section. The CV groups courses under each available academic `year`; for an individual course, only `name` and `degree` are required. `translation` adds an English course title in parentheses in the CV. `degree_url` and all other course fields are optional. The public page also displays the remaining fields and downloadable documents when present.

```yaml
- year: 2026-27
  courses:
    - name: Course name, group 000
      translation: English course title
      online: yes
      course_url: https://example.org/course
      degree: Degree programme
      degree_url: https://example.org/degree
      theory_teacher: teacher(dot)email(at)university(dot)es
      schedule: Wednesday, 10:00 to 12:00
      room: Room 101
      documents:
        - name: Resource title
          url: ../Documents/Teaching/resource.pdf
```

`documents` is optional. Its local URLs are relative to `Teaching/index.html`. `online` controls whether a course appears on the public Teaching page: it defaults to `yes`; set `online: no` to hide that course online. This flag does not remove the course from the private CV.

### `_data/miscellany.yml`

This data appears only on the public Miscellany page.

```yaml
- title: Activity name
  description: A short description of the activity.
  link: https://example.org
  link_label: official website
```

### `_data/trips.yml`

This data appears only as pins and popups on the map in the home page.

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
2. Check Home, Research, Talks, Teaching, and Miscellany.
3. Confirm new local document links open correctly.
4. Regenerate the CV after changing `_data/cv.yml`, `_data/research.yml`, `_data/talks.yml`, or `_data/teaching.yml`.
5. Do not commit generated `_site/`, `.jekyll-cache/`, local Bundler directories, or `_cv/cv-data.tex` unless deliberately required.

See [AGENTS.md](AGENTS.md) for repository-specific maintenance and validation rules.