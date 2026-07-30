#!/usr/bin/env python3
"""
Generate a social-media preview card (1200x630 PNG) for one booktalk,
from assets/og-card-template.svg.

Usage:
    python3 generate-preview-card.py \
        --call-line1 "158.1" --call-line2 "BAR" \
        --title "Are we barking up" --title2 "the wrong tree?" \
        --author "Eric Barker" \
        --hook1 "Why valedictorians rarely" --hook2 "change the world." \
        --out ../barking-up-the-wrong-tree/preview.png

Notes:
- Title and hook are split across two lines manually (--title/--title2,
  --hook1/--hook2) rather than auto-wrapped, so you control the break point.
- Requires cairosvg and the three brand fonts (Space Grotesk, Inter,
  JetBrains Mono) installed and available to the system font renderer.
"""
import argparse
import cairosvg

TEMPLATE = "og-card-template.svg"

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--call-line1", default="")
    p.add_argument("--call-line2", default="")
    p.add_argument("--title", required=True)
    p.add_argument("--title2", default="")
    p.add_argument("--author", required=True)
    p.add_argument("--hook1", default="")
    p.add_argument("--hook2", default="")
    p.add_argument("--out", required=True)
    args = p.parse_args()

    with open(TEMPLATE, "r") as f:
        svg = f.read()

    svg = svg.replace("__CALL_NUMBER_LINE1__", args.call_line1)
    svg = svg.replace("__CALL_NUMBER_LINE2__", args.call_line2)
    svg = svg.replace("__TITLE_LINE1__", args.title)
    svg = svg.replace("__TITLE_LINE2__", args.title2)
    svg = svg.replace("__AUTHOR__", args.author)
    svg = svg.replace("__HOOK_LINE1__", args.hook1)
    svg = svg.replace("__HOOK_LINE2__", args.hook2)

    cairosvg.svg2png(bytestring=svg.encode("utf-8"), write_to=args.out,
                      output_width=1200, output_height=630)
    print(f"Wrote {args.out}")

if __name__ == "__main__":
    main()
