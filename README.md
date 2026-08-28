# Ruben Izquierdo Lopez

Personal academic webpage for Rubén Izquierdo López.

## Organization

- `index.html`: home page.
- `Research/`, `Talks/`, `Teaching/`, `Miscellany/`: public sections, each with its own `index.html`.
- `_data/talks.yml`: structured source for talks, posters, dates, and links.
- `_data/research.yml`, `_data/teaching.yml`, `_data/miscellany.yml`: structured content for the other sections.
- `_data/trips.yml`: places and trip details shown as pins on the About map.
- `_includes/navigation.html`: shared navigation used by every Jekyll page.
- `Talks/index.html`: Jekyll template that renders `_data/talks.yml`.
- `Talks/README.md`: instructions for adding a talk.
- `Documents/`: papers, slides, posters, and teaching resources.
- `Images/`: images and link icons.
- `style.css` and `script.js`: shared presentation and interaction.

The site keeps its existing public paths. GitHub Pages builds the Jekyll template automatically; the `_config.yml` file contains only the small amount of site configuration needed here.

## Local preview

Install Ruby with RubyInstaller for Windows, then open PowerShell in this directory and run:

```powershell
bundle install
C:\Ruby40-x64\bin\ruby.exe -e "class Object; def tainted?; false; end; end; require 'bundler'; Bundler.setup; spec=Gem.loaded_specs['jekyll']; load File.join(spec.full_gem_path, 'exe', 'jekyll')" serve --livereload
```

Open `http://localhost:4000/`. Jekyll rebuilds the site when files change; stop the server with `Ctrl+C`. For a one-time build without a server, use `bundle exec jekyll build` and inspect the generated `_site/` directory.

The longer command is needed with Ruby 4 because this Jekyll dependency still uses the removed Ruby `tainted?` method. With Ruby 3.3 or earlier, the usual commands are sufficient:

```powershell
bundle exec jekyll serve --livereload
bundle exec jekyll build --trace
```

See [`AGENTS.md`](AGENTS.md) for the maintenance rules and validation commands.

## Maintaining content

Edit data files rather than copying HTML blocks into the page templates:

- `_data/talks.yml`: add a year group with `year`, `label`, and `talks`. Each talk has `event`, `date`, and `title`; `event_url`, `resources`, and `note` are optional.
- `_data/research.yml`: add papers under either `preprints` or `publications`. Each record contains `citation`, `pdf`, `doi`, and `doi_label`.
- `_data/teaching.yml`: add an academic year and its `courses`. Courses can include links, schedule details, and downloadable `documents`.
- `_data/miscellany.yml`: add an item with a `title`, `description`, and external link.
- `_data/trips.yml`: add About-map destinations using `place`, `country`, `coordinates`, `date`, `title`, and `description`.

Map records may also include an optional local photograph:

```yaml
- place: Example City
  country: Spain
  coordinates: [40.4168, -3.7038]
  date: June 2026
  title: Example Conference
  description: A short description of the trip.
  image: Images/example-conference-group.jpg
  image_alt: Group photograph at Example Conference
```

Put local images in `Images/`. The map displays the photograph inside the selected pin's popup. Use descriptive `image_alt` text and do not add photographs for which you do not have permission to publish.

### MapTiler Streets style

The map uses MapTiler's `streets-v2` style when an API key is configured. Add a domain-restricted key to `maptiler_api_key` in `_config.yml`:

```yaml
maptiler_api_key: "your-key-here"
```

MapTiler keys are public browser keys, so restrict them to the website domain in the MapTiler dashboard. If the key is blank, the map uses the dark CARTO fallback style. Keep the MapTiler and OpenStreetMap attribution visible.

## Editing templates and styles

- Keep shared navigation in `_includes/navigation.html`.
- Keep page structure in the relevant section's `index.html`.
- Keep shared interaction in `script.js` and shared presentation in `style.css`.
- Keep public paths stable. Existing document links are relative to the page that renders them.
- Do not commit `_site/`, `.jekyll-cache/`, or local Bundler directories; they are ignored by `.gitignore`.

After changing content, run a build and check all five generated pages. Confirm that local document links still point to files in `Documents/` and that new map coordinates are ordered as `[latitude, longitude]`.
