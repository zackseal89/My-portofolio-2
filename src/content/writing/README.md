# Adding a piece to the Writing page

There is no upload button, no admin panel, and no database. That is
deliberate: this whole site is static. To publish a new essay, article,
or book, add a `.md` file to this folder and redeploy.

This file (`README.md`) is ignored by the loader. Every other `.md` file
here becomes a card on `/writing` automatically.

## Format

Create a new file, e.g. `src/content/writing/nairobi-in-november.md`:

```
---
title: Nairobi in November
type: Essay
venue: Minor Testimonies
date: 2026-11-03
url: https://example.com/nairobi-in-november
---
One or two sentences on what the piece is actually about. This becomes
the blurb shown on the card. Keep it short.
```

## Field reference

- `title` (required): the piece's title. Files without a `title` are skipped.
- `type`: `Essay`, `Article`, or `Book`. Defaults to `Essay` if omitted or invalid.
- `venue`: where it was published (e.g. `Minor Testimonies`, a publisher name).
- `date`: `YYYY-MM-DD`. Pieces are sorted newest first.
- `url`: link to the piece. Leave it out if it isn't published anywhere yet;
  the card will render without a link.

The body of the file (everything after the second `---`) is the blurb.
No markdown rendering happens beyond plain text, keep it to a sentence or two.
