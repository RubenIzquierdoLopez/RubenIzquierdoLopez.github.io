# Architectural decisions

## Dual-purpose repository

The repository is intentionally both an academic website and a personal CV. Neither output is secondary.

## Shared data layer

`_data/` is treated as a shared source-data layer. Website templates and CV tooling may consume the same records. Changes to schemas require a consumer review.

## Source over generated output

Source files are edited; `_site/` and other generated artifacts are rebuilt.

## Preserve existing patterns

New pages, data entries, links, and styling should follow existing repository patterns before introducing new abstractions or dependencies.

## Data accuracy

Academic and professional facts must not be invented or silently normalized. Preserve exact titles, dates, affiliations, and resource links unless the user explicitly requests a correction.
