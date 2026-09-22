# Project overview

## Identity

This repository is a personal site with a dual purpose:

- **Academic website:** communicates research, publications, preprints, talks, teaching, trips, photographs, and other academic activity.
- **Personal CV:** presents a concise professional record, including personal information, biography, education, research experience, teaching, publications, talks, and related activity.

The two outputs share data and must remain consistent.

## Technology

The repository uses Jekyll/Liquid for the website. Content is organized in HTML pages, shared includes, CSS, JavaScript, YAML data, documents, and image assets. A separate CV source/build area exists under `_cv/`.

## Main content areas

- `index.html`: home page
- `Research/index.html`: research and publications
- `Talks/index.html`: talks and posters
- `Teaching/index.html`: teaching activity
- `About/index.html`: personal/about information
- `Miscellany/index.html`: additional personal or academic material
- `_includes/navigation.html`: shared navigation
- `_data/`: shared structured content
- `_cv/`: CV source and build files
- `Documents/`: papers, theses, slides, posters, and teaching material
- `Images/`: website images and trip photographs

## Shared-data principle

`_data/` is not merely website content. It is the common data layer for both the academic website and the CV. A data edit is therefore a cross-output change.

Before changing a YAML schema, inspect its consumers and verify:
- the website still renders correctly;
- the CV still builds correctly;
- dates, names, titles, affiliations, and links remain consistent;
- optional fields remain optional or are handled everywhere.

## Generated directories

Do not edit `_site/` directly. Rebuild it from source. Treat generated CV artifacts as outputs unless explicitly working on the build process.

## Definition of done

A content or code change is complete when:
- the intended website behavior/content works;
- the CV behavior/content is preserved or updated when relevant;
- relevant links and document paths are valid;
- formatting and conventions are preserved;
- relevant checks have been run and reported.
