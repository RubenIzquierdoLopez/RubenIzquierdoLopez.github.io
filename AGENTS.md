# Maintenance instructions

This repository is a Jekyll-powered academic webpage. Keep public paths and the existing visual identity stable unless the owner requests a redesign.

## Where to edit content

- Talks: `_data/talks.yml`
- Research papers: `_data/research.yml`
- Teaching courses: `_data/teaching.yml`
- Organizations and other miscellany: `_data/miscellany.yml`
- About map destinations: `_data/trips.yml`
- Home biography and links: `index.html`
- Shared navigation: `_includes/navigation.html`
- Page structure: the relevant section `index.html`
- Shared behavior and appearance: `script.js` and `style.css`

Do not duplicate entries in HTML. Add a data record and let the existing Liquid loop render it. Use quotes around YAML values containing a colon, and use paths relative to the page that renders them for local documents.

Trip records may include optional `image` and `image_alt` fields. Use a path such as `Images/conference-group.jpg`; the map will show it inside that trip's popup. Keep image files in `Images/` and use descriptive alt text.

## Checks

From the repository root:

```powershell
C:\Ruby40-x64\bin\bundle.bat install
C:\Ruby40-x64\bin\ruby.exe -e "class Object; def tainted?; false; end; end; require 'bundler'; Bundler.setup; spec=Gem.loaded_specs['jekyll']; load File.join(spec.full_gem_path, 'exe', 'jekyll')" build --trace
```

For Ruby 3.3 or earlier, use `bundle exec jekyll build --trace` and `bundle exec jekyll serve --livereload`.

Before reporting completion, check the build output for errors and verify the generated pages for Home, Research, Talks, Teaching, and Miscellany.
