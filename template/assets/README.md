# Intro sound

Drop an audio file here named `intro-sound.mp3` (or point `meta.introSound`
in your `data.js` at a different path) if you want a specific sound to play
when the intro logo animation starts.

This repo does not ship any audio file here on purpose — if you want to use
Netflix's actual "ta-dum" sound, that's their trademarked audio, so you'll
need to supply your own legally-obtained copy rather than one sourced by
this project.

If no file is found (or it fails to load), the site falls back to an
original sound synthesized in the browser with the Web Audio API — no file
needed for that path.
