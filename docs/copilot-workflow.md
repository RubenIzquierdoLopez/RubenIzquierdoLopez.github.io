# Copilot workflow

## 1. Start with the correct scope

Every task should identify whether it affects:
- website presentation;
- CV presentation;
- shared data;
- both outputs;
- build or validation tooling.

If `_data/` is involved, assume both outputs may be affected until proven otherwise.

## 2. Use a task contract

```md
## Goal
[What should change?]

## Outputs affected
- [ ] Academic website
- [ ] Personal CV
- [ ] Shared data
- [ ] Build/validation

## Requirements
- ...

## Constraints
- Preserve existing schemas and patterns.
- Do not edit generated output.

## Acceptance criteria
- [ ] Website works
- [ ] CV works or remains unchanged
- [ ] Relevant links/checks pass
```

## 3. Plan before implementation

Ask Copilot to inspect:
- `README.md` and `AGENTS.md`;
- relevant pages/templates;
- all consumers of changed `_data` files;
- relevant `_cv` files;
- existing examples.

Request a concise plan and a list of files to change before coding.

## 4. Implement in small steps

Prefer one logical change at a time:
1. data/schema change;
2. website consumer update;
3. CV consumer update;
4. tests/build/link checks;
5. documentation update.

Do not ask Copilot to redesign the entire repository for a small content change.

## 5. Verify both purposes

For shared-data changes, explicitly ask:

> Verify the academic website and the personal CV. Search for every consumer of the changed data and run the relevant build/check commands.

## 6. Useful prompts

### Inspect a feature
```text
Read README.md, AGENTS.md, docs/project.md, and docs/architecture.md.
Inspect the requested feature and identify all relevant website and CV consumers.
Do not code yet. Return a concise plan and risks.
```

### Change shared data
```text
I need to change `_data/[file].yml`.

First find every consumer of this file and the fields I will change.
Explain how the change affects the academic website and the personal CV.
Implement the smallest coordinated change, preserving existing schemas where possible.
Verify both outputs.
```

### Add academic content
```text
Add this record following the exact schema and style of nearby entries.
Check document paths and external links.
Determine whether the record is also consumed by the CV.
Do not invent missing metadata.
```

### Review
```text
Review the current changes for correctness, schema compatibility, website/CV consistency,
broken links, generated-output edits, accessibility, and unnecessary changes.
Order findings by severity.
```

## 7. Documentation maintenance

Update the documentation when:
- a shared data schema changes;
- a new consumer is introduced;
- a build command changes;
- an architectural decision changes.

Keep documentation concise and factual.
