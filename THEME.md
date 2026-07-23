# THEME.md — ASCII Developer Portfolio (aino.agency style)

Design brief for building/extending this site. Reference: aino.agency (Awwwards SOTD, May 20 2026)(https://www.awwwards.com/sites/aino-agency#typography).
 Core concept: **text as the medium** — ASCII, morphing type, and monospace labels carry all the visual weight. Gallery-meets-terminal. Minimal, editorial, high-contrast. Ship lean (reference is ~30kb vanilla JS — no heavy frameworks for the effect).

## Colors — strictly two
| Role | HEX | Usage |
|------|-----|-------|
| Background | `#F5F5F0` | Everywhere. Warm off-white / bone, NOT pure white. |
| Ink | `#181818` | All text, ASCII, lines, borders. Near-black, NOT `#000`. |

Rules: only these two colors. No accents, gradients, or colored shadows. Invert (ink bg / bone text) for hover or dark blocks — never add a third hue. Contrast IS the palette.

## Typography — two typefaces, doing different jobs
**Display / headings — neo-grotesque sans.** Reference look = PP Neue Montreal (alts: Aeonik, Suisse Int'l, Neue Haas Grotesk). Free stand-ins used here: **Space Grotesk** / Inter. UPPERCASE, tight tracking (`-0.02em` to `-0.03em`), weight 600–700, tight line-height (~0.9–1.05).

**Labels / metadata / ASCII — monospace.** The signature move. Fonts: Fragment Mono, Azeret Mono, **JetBrains Mono** (used here), IBM Plex Mono. Small (11–13px), UPPERCASE, wide tracking (`0.05em`–`0.1em`). Used for nav, captions, index numbers, timestamps, scroll hints, and the ASCII art itself.

**Hierarchy:** dramatic jump from huge display type → tiny mono labels. Rarely a "medium" size — the gap is intentional.

## The ASCII centerpiece
This is the hero and the site's identity. Current implementation: an interactive `<pre>` field where characters swap based on distance to the cursor (ripple/morph via `requestAnimationFrame`). Character ramp light→dense: `" .:-=+*#%@"`.

Other valid directions: ASCII name banner (figlet block letters), photo-to-ASCII portrait, rotating 3D ASCII (donut/cube). Notes: render in `<pre>` with monospace so spacing is exact; keep line-height ~1.0 so characters form a solid shape; measure pointer distance per cell for interaction; respect `prefers-reduced-motion` by freezing to a static frame.

## Layout & structure
- Single-page, scroll-driven — one continuous canvas.
- Generous margins, lots of bone-colored negative space; asymmetric grid or comfortable reading column.
- Fixed micro-nav in mono, pinned to corners (name top-left, links top-right). `mix-blend-mode: difference` keeps it legible over both colors.
- Catalog/index numbering for projects: `A001`, `A002`… aligned left like an archive. (The live aino site labels work `a001 nudie jeans`, `A004 samsøe samsøe` — reuse this convention.)
- Snap to a visible or implied grid; baseline-align mono labels with display type.

## Motion & interaction
- Smooth, restrained transitions — flat-color fades/wipes, no bounce.
- Microinteractions subtle: hover inverts colors or reveals a mono caption (see `.project:hover`, `.contact-links a:hover`).
- The ASCII is the one "loud" motion; everything else stays quiet so it stands out.
- Respect `prefers-reduced-motion` — freeze ASCII, disable smooth scroll.

## Tech stack (matches reference)
Vanilla JS for the ASCII engine (no React/Vue needed). Plain HTML5 + CSS Grid/Flexbox. Fonts via Google Fonts. Optional GSAP for scroll polish — keep total JS small. Awwwards tags: Experimental, Animation, Portfolio, Data Visualization, UI Design, Microinteractions, Vanilla JS.

## Do / Don't
**Do:** two colors only · monospace labels · dramatic type-size contrast · ASCII as hero · whitespace · index numbering · tight tracking on display type.
**Don't:** accent colors · drop shadows or rounded card UI · fill space with images · a softening "medium" font size · animate everything.

## What to customize in index.html
- Replace `YOUR_NAME` / "Your Name" (nav, `<title>`, hero, footer).
- Hero sub-line: role + location.
- About text: one sharp sentence.
- Projects: swap names, `A00x` indices, `.meta` (type · year), and `href`s.
- Contact: real email, GitHub, LinkedIn URLs.
- ASCII: tune `COLS`, `ROWS`, `RAMP`, and the `wave` formula in the `<script>`, or swap in a name-banner / portrait renderer.
