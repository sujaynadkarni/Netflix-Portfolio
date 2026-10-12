# Netflix-Style Portfolio

A personal portfolio site styled as a Netflix-style "Who's Watching?" experience — pick a profile (Hiring Manager, Recruiter, Social Media Follower) and get a home screen tailored to that audience, complete with hero banner, horizontal content rows, and an in-page viewer for embedded YouTube/Instagram content.

This is a fan-made homage built for personal use — not affiliated with, endorsed by, or sponsored by Netflix, Inc.

## Build your own

### Option A: with Claude or ChatGPT (recommended)

1. **Clone the repo:**
   ```bash
   git clone https://github.com/sujaynadkarni/Netflix-Portfolio.git
   cd Netflix-Portfolio
   ```
2. **Open the folder in an AI coding assistant.**
   - In **Claude Code**: run `claude` inside the `Netflix-Portfolio` folder.
   - In **ChatGPT** or **Claude.ai** (web chat, no file access): open a new chat and upload/paste the contents of `template/js/data.sample.js` and `template/index.html` so it has the structure to work from.
3. **Paste this prompt** (edit the first line if you're in a plain web chat instead of a coding assistant):
   ```text
   I just cloned the Netflix-Portfolio template (you have access to this
   folder). Act as my portfolio builder: ask me for my name, 2-4 "Who's
   Watching" personas, a short bio per persona, my skills (grouped by
   category), my projects, my work experience, and my contact links
   (email, LinkedIn, GitHub, resume link).

   Once I've answered, copy the `template/` folder to a new folder called
   `output/` and fill in `output/js/data.js` with my answers, following the
   exact structure already in `template/js/data.sample.js`. Don't modify
   `template/` itself. Card "posters" can stay as the default gradients, or
   you can offer to generate original AI artwork for a few of them if you
   have image-generation tools available.
   ```
4. **Answer its questions** about yourself — name, personas, bio, skills, projects, experience, contact links.
5. **Preview it:**
   ```bash
   cd output
   python3 -m http.server 4173
   ```
   Then open `http://localhost:4173` in your browser.

### Option B: no AI, just Python

```bash
git clone https://github.com/sujaynadkarni/Netflix-Portfolio.git
cd Netflix-Portfolio
python3 generate.py
```

Answer the prompts in your terminal; it writes a ready-to-view site into `./output` (see `generate.py --help` for a non-interactive `--data`/`--out` mode).

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
