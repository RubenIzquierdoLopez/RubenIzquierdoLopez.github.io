# Copilot instructions

## Project identity
This repository has two equally important purposes:
1. An academic website presenting research, publications, talks, teaching, and academic activity.
2. A personal CV presenting biographical information, education, research experience, skills, and professional activity.

Treat both purposes as first-class requirements. Do not optimize one presentation at the expense of the other.

## Source of truth
- `_data/` is shared source data consumed by both the Jekyll website and the CV generation workflow.
- Before changing a `_data/*.yml` file, inspect every consumer of that file, including website pages, includes, scripts, and `_cv/`.
- Preserve existing field names and data types unless a coordinated migration is explicitly requested.
- When adding or renaming a field, update all consumers and document the change.
- Keep academic wording accurate and CV wording concise; do not duplicate conflicting facts in templates.

## Generated output
- Never edit `_site/` directly. It is generated output.
- Treat `_cv/main.pdf`, `_cv/main.aux`, and other generated build artifacts as outputs unless the task explicitly concerns the CV build.
- Prefer editing source templates, data, and scripts.

## Workflow
- Read `README.md`, `AGENTS.md`, and the relevant documentation before coding.
- Inspect the page/template and all data consumers relevant to the task.
- State a short plan before making multi-file changes.
- Keep changes focused and avoid unrelated formatting changes.
- Reuse existing Liquid, YAML, CSS, JavaScript, and Ruby patterns.
- Do not invent academic facts, dates, publications, affiliations, or links.
- Run the relevant build, validation, or link-checking commands after changes.
- Report any checks that could not be run.

## Data changes
For changes to `_data/`:
1. Identify the website pages that consume the file.
2. Identify CV templates/scripts that consume the file.
3. Check required and optional fields.
4. Add or update representative entries consistently.
5. Verify both website and CV outputs.

## Style
- Preserve the existing visual language and responsive behavior.
- Prefer accessible semantic HTML and descriptive link text.
- Keep URLs, document paths, and asset paths consistent with the repository's conventions.
