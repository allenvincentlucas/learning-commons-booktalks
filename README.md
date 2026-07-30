# The Librarian's Desk — IB Learning Commons BookTalks

A small, shelf-style website for IB Learning Commons BookTalks. Each post is a one-page "catalog card" covering the inquiry, key themes, complementary videos, a TOK connection, discussion prompts, and read-alikes for one book.

**Live site:** https://allenvincentlucas.github.io/learning-commons-booktalks/

## Structure

```
/index.html                          → homepage ("the shelf"), lists every booktalk
/assets/style.css                    → shared stylesheet for all pages
/[book-slug]/index.html              → one booktalk per folder
```

## Adding a new booktalk

1. Create a new folder named after the book, e.g. `grit/`
2. Add `grit/index.html` inside it, following the structure of `barking-up-the-wrong-tree/index.html`:
   - link to the shared stylesheet with `../assets/style.css`
   - nameplate links back to `../index.html`
3. Link the shared stylesheet, not a copy — that way, updating `assets/style.css` once restyles every post
4. Add a new `.shelf-tile` card to `index.html` linking to `[book-slug]/`, and remove or push down the "next booktalk coming soon" placeholder tile
5. Commit — GitHub Pages picks up the new folder automatically, no rebuild step needed

## Design system

Paper `#FAF9F6` &middot; Ink `#191B1F` &middot; Index Blue `#2A4B8D` &middot; Stone `#84806F`
Space Grotesk (display) &middot; Inter (body) &middot; JetBrains Mono (labels, call numbers, metadata)

The signature motif is the library catalog card: ruled index-card lines, punch holes, and a call-number stamp in the top corner of every post.
