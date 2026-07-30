# The Librarian's Desk — IB Learning Commons BookTalks

A small, shelf-style website for IB Learning Commons BookTalks. Each post is a one-page "catalog card" covering the inquiry, key themes, complementary videos, a TOK connection, discussion prompts, and read-alikes for one book.

**Live site:** https://allenvincentlucas.github.io/learning-commons-booktalks/

## Structure

```
/index.html                          → homepage ("the shelf"), lists every booktalk
/assets/style.css                    → shared stylesheet for all pages
/assets/favicon.svg, .ico, apple-touch-icon.png  → site-wide favicon (one set, used everywhere)
/assets/og-home-template.svg, og-default.png     → homepage social preview card
/assets/og-card-template.svg         → reusable template for a booktalk's preview card
/assets/generate-preview-card.py     → fills the template and rasterizes a preview.png
/[book-slug]/index.html              → one booktalk per folder
/[book-slug]/preview.png             → that booktalk's social preview card (1200x630)
```

## Homepage layout

The shelf is split into two category sections, in this order: **Fiction**, then **Non-Fiction**. Each section is its own `.shelf-section` block with a heading, a live count, and its own `.shelf-grid` of tiles — plus a dashed "next booktalk coming soon" placeholder tile at the end of *that* category's grid (not one shared placeholder for the whole site). The overall `.shelf-count` line at the top of the page shows the total plus the fiction/non-fiction split, e.g. "3 booktalks · 1 fiction · 2 non-fiction." When a new booktalk is added, its tile goes into the matching category section, and both the section count and the top-level count get updated.

## Fiction series section

Every **fiction** booktalk page that belongs to a series or duology gets an extra numbered section — the next number after "About the author" (currently `08`) — titled **Series**, using the `.series-box` / `.series-list` styles. It lists every book in the series in reading order:
- The current book is marked in place (styled with `.series-current`, not linked).
- Any other book in the series that **already has its own booktalk on this site** is an automatic link to `../[that-book-slug]/`.
- Any book in the series that doesn't have a page yet is plain text.

Standalone fiction (not part of a series) and all non-fiction titles simply omit this section — it isn't shown as "N/A" or left as an empty placeholder.

Because this links in both directions, adding a new booktalk for a book that's a sequel/prequel to an *existing* booktalk means going back and editing that earlier page's `.series-list` to turn its now-published sibling from plain text into a link, in addition to adding the section on the new page.

## Adding a new booktalk

1. Create a new folder named after the book, e.g. `grit/`
2. Add `grit/index.html` inside it, following the structure of `barking-up-the-wrong-tree/index.html`:
   - link to the shared stylesheet with `../assets/style.css`
   - nameplate links back to `../index.html`
   - include the favicon links and Open Graph / Twitter meta tags (copy the block from an existing post and update title, description, and image URL)
   - **if fiction and part of a series**, add the `08 Series` section (see above); check existing folders for any sibling title to auto-link
3. Generate that book's preview card:
   ```
   cd assets
   python3 generate-preview-card.py \
     --call-line1 "158.1" --call-line2 "DUC" \
     --title "The power of" --title2 "passion and perseverance" \
     --author "Angela Duckworth" \
     --hook1 "Why talent isn't the same thing" --hook2 "as grit." \
     --out ../grit/preview.png
   ```
   (Requires `cairosvg` and the Space Grotesk / Inter / JetBrains Mono font files installed locally — see script docstring.)
4. Add a new `.shelf-tile` card to `index.html`, inside the matching Fiction or Non-Fiction `.shelf-section`, linking to `[book-slug]/`; remove or push down that category's "next booktalk coming soon" placeholder tile
5. Update both the top-level `.shelf-count` and the affected `.shelf-section-count`
6. If the new book is a sibling (prequel/sequel) of an existing booktalk, edit that existing page's `.series-list` to link to the new one
7. Commit — GitHub Pages picks up the new folder automatically, no rebuild step needed

## Social sharing

Every page carries its own favicon and a custom-designed Open Graph / Twitter preview card, so links shared on social media or in messages render as a branded catalog-card thumbnail rather than a bare URL. CTA copy on booktalk pages is written for a public audience (library-agnostic — "find it at your library," not "ask us to place a hold"), since these pages are meant to travel outside the school's own community.

## Design system

Paper `#FAF9F6` &middot; Ink `#191B1F` &middot; Index Blue `#2A4B8D` &middot; Stone `#84806F`
Space Grotesk (display) &middot; Inter (body) &middot; JetBrains Mono (labels, call numbers, metadata)

The signature motif is the library catalog card: ruled index-card lines, punch holes, and a call-number stamp in the top corner of every post — carried through into the favicon and every social preview image.
