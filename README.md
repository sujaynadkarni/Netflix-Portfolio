# Netflix-Style Portfolio

A personal portfolio site styled as a Netflix-style "Who's Watching?" experience — pick a profile (Hiring Manager, Recruiter, Social Media Follower) and get a home screen tailored to that audience, complete with hero banner, horizontal content rows, and an in-page viewer for embedded YouTube/Instagram content.

This is a fan-made homage built for personal use — not affiliated with, endorsed by, or sponsored by Netflix, Inc.

## Structure

- **`example/`** — the live site, built from this template with real content.
- **`template/`** — the reusable, content-agnostic version (placeholder data) that `generate.py` builds new sites from.
- **`generate.py`** — a dependency-free Python script that interactively asks for your name, personas, skills, projects, experience, and contact links, then generates your own copy of the site into an output folder. Run it with `python3 generate.py`.

## Running locally

No build step — it's plain HTML/CSS/JS. From either `example/` or `template/`:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Notable implementation details

- **No external image/video assets.** Card "posters" for internal sections are either AI-generated original artwork or gradients computed from the card title; nothing is scraped or hotlinked.
- **Real YouTube thumbnails & titles** are fetched live at runtime via YouTube's public oEmbed endpoint — no API key required.
- **In-page media viewer.** Clicking a YouTube or Instagram card opens an embedded player inside the site's own UI chrome rather than navigating away.
- **Intro sound.** If a file exists at `assets/intro-sound.mp3`, it plays on the "tap to begin" intro screen; otherwise an original sound synthesized live with the Web Audio API is used instead. (The `template/` version intentionally ships with no audio file — see `template/assets/README.md`.)
- **Netflix Sans** is Netflix's proprietary in-house typeface and isn't available for third-party use, so the body font uses the same system-font fallback stack (`Helvetica Neue` / `Segoe UI` / `Roboto`) that Netflix's own site falls back to.

## License

Code in this repo is free to use and adapt. Any Netflix-branded audio you add yourself (e.g. `intro-sound.mp3`) remains Netflix's property and is your own responsibility to source legally.
