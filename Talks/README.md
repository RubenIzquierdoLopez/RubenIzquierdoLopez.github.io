# Maintaining the Talks page

Talk entries live in [`../_data/talks.yml`](../_data/talks.yml). Keep years in reverse chronological order and add new entries at the top of the relevant year.

Each entry supports:

```yaml
- event: Seminar or conference name
  event_url: https://example.org/event
  date: 12 March, 2026
  title: Title of the talk
  resources:
    - label: Slides
      url: ../Documents/Slides/2026/slides.pdf
      icon: pdf_icon.webp
    - label: Video
      url: https://example.org/video
      icon: Youtube_logo.webp
  note: Optional note, such as "Talk given at the blackboard."
```

`event_url`, `resources`, and `note` are optional. Use quotes around values containing a colon, such as `event: 'Gamma: Geometry Seminar'`. Add files to `Documents/` before linking them from the data file. The page is rendered by the Jekyll template in `index.html`; do not hand-edit repeated talk markup there.
