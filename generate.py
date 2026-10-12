#!/usr/bin/env python3
"""
Netflix-style portfolio generator.

Run this after cloning the repo to build your own "Who's Watching?"-style
portfolio site. Works two ways:

  1. Interactive (no args): asks you questions in the terminal.
       python3 generate.py

  2. Scripted (for an AI assistant or CI): pass a JSON file with the same
     shape as the prompted answers, and it skips the Q&A.
       python3 generate.py --data answers.json --out my-site

Either way it copies template/ into --out (default: ./output) and writes a
js/data.js populated from the answers, ready to open directly or deploy to
GitHub Pages / Netlify / Vercel as a static site. No build step, no
dependencies beyond the Python standard library.
"""

import argparse
import json
import os
import shutil
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_DIR = os.path.join(SCRIPT_DIR, "template")

EMOJI_CHOICES = ["🙂", "🧑‍💼", "📋", "📱", "🎯", "🔥", "🚀", "🎨", "🧠", "🛠️"]
COLOR_CHOICES = ["#E50914", "#2196d9", "#e8a33d", "#6a3093", "#1f8a70", "#c31432"]


def ask(prompt, default=None, required=False):
    suffix = f" [{default}]" if default else ""
    while True:
        val = input(f"{prompt}{suffix}: ").strip()
        if not val and default is not None:
            return default
        if not val and required:
            print("  (required — please enter a value)")
            continue
        return val


def ask_list(prompt, example=""):
    print(f"{prompt} (comma-separated{', e.g. ' + example if example else ''})")
    raw = input("> ").strip()
    return [x.strip() for x in raw.split(",") if x.strip()]


def collect_interactive():
    print("\n=== Netflix-Style Portfolio Generator ===\n")
    name = ask("Your full name", required=True)
    title = ask("Your title / tagline (e.g. 'Product & Automation Analyst')", default="")
    linkedin = ask("LinkedIn URL", default="")
    github = ask("GitHub URL", default="")
    email = ask("Email", default="")
    resume = ask("Resume link (can add later)", default="#")

    print("\n--- Who's Watching? personas ---")
    print("Netflix shows profile tiles for different viewers. Here, each persona")
    print("gets its own tailored bio on your home page (e.g. Recruiter, Hiring")
    print("Manager, Friend, Fellow Developer...).")
    personas = []
    n = ask("How many personas do you want?", default="3")
    try:
        n = max(1, int(n))
    except ValueError:
        n = 3
    for i in range(n):
        label = ask(f"  Persona {i + 1} name", required=True)
        bio = ask(f"  Short bio for '{label}' (2-3 sentences)", default="")
        personas.append(
            {
                "id": label.lower().replace(" ", "-"),
                "label": label,
                "emoji": EMOJI_CHOICES[i % len(EMOJI_CHOICES)],
                "color": COLOR_CHOICES[i % len(COLOR_CHOICES)],
                "heroBio": bio or f"{name} — {title}.",
            }
        )

    print("\n--- Skills ---")
    skill_names = ask_list("List your skills", example="Python, Figma, SQL")
    skills = [{"category": "Skills", "items": [{"name": s, "icon": "⚙️", "blurb": ""} for s in skill_names]}]

    print("\n--- Projects ---")
    projects = []
    while True:
        pname = ask("  Project name (leave blank to stop adding projects)", default="")
        if not pname:
            break
        pdesc = ask("    One-line description", default="")
        plink = ask("    Link (optional)", default="#")
        projects.append({"name": pname, "blurb": pdesc, "link": plink, "icon": "🎬", "tags": []})

    print("\n--- Experience ---")
    experience = []
    while True:
        role = ask("  Role title (leave blank to stop adding experience)", default="")
        if not role:
            break
        company = ask("    Company", default="")
        dates = ask("    Dates (e.g. '2022 — Present')", default="")
        highlight = ask("    One-line highlight", default="")
        experience.append({"role": role, "company": company, "dates": dates, "highlight": highlight})

    contacts = []
    if email:
        contacts.append({"label": "Email", "sub": email, "href": f"mailto:{email}", "icon": "📧"})
    if linkedin:
        contacts.append({"label": "LinkedIn", "sub": linkedin.replace("https://", ""), "href": linkedin, "icon": "💼"})
    if github:
        contacts.append({"label": "GitHub", "sub": github.replace("https://", ""), "href": github, "icon": "💻"})
    contacts.append({"label": "Resume", "sub": "Download / view", "href": resume, "icon": "📄"})

    return {
        "meta": {
            "name": name,
            "logoText": name.upper(),
            "resume": resume,
            "linkedin": linkedin or "#",
            "badge": "ORIGINAL",
            "skillRepo": "",
        },
        "nav": [
            {"label": "Home", "route": "home"},
            {"label": "Professional", "route": "professional"},
            {"label": "Skills", "route": "skills"},
            {"label": "Projects", "route": "projects"},
            {"label": "Hire Me", "route": "hire-me"},
        ],
        "personas": personas,
        "topPicksRow": [
            {"title": "Experience", "route": "professional", "icon": "💼"},
            {"title": "Skills", "route": "skills", "icon": "🛠️"},
            {"title": "Projects", "route": "projects", "icon": "🎬"},
            {"title": "Contact Me", "route": "hire-me", "icon": "📨"},
        ],
        "continueWatchingRow": [
            {"title": "Resume", "route": "professional", "icon": "📄"},
            {"title": "Get In Touch", "route": "hire-me", "icon": "✉️"},
        ],
        "skills": skills,
        "projects": projects,
        "experience": experience,
        "contacts": contacts,
    }


def render_data_js(data):
    return "window.SITE_DATA = " + json.dumps(data, indent=2) + ";\n"


def build_site(data, out_dir):
    if os.path.exists(out_dir):
        print(f"Output directory '{out_dir}' already exists — files will be overwritten.")
    else:
        os.makedirs(out_dir)

    for name in ("index.html", "css", "js"):
        src = os.path.join(TEMPLATE_DIR, name)
        dst = os.path.join(out_dir, name)
        if os.path.isdir(src):
            shutil.copytree(src, dst, dirs_exist_ok=True)
        else:
            shutil.copy2(src, dst)

    data_js_path = os.path.join(out_dir, "js", "data.js")
    with open(data_js_path, "w") as f:
        f.write(render_data_js(data))

    sample_path = os.path.join(out_dir, "js", "data.sample.js")
    if os.path.exists(sample_path):
        os.remove(sample_path)

    index_path = os.path.join(out_dir, "index.html")
    with open(index_path) as f:
        html = f.read()
    html = html.replace("js/data.sample.js", "js/data.js")
    html = html.replace("<title>Portfolio</title>", f"<title>{data['meta']['name']} — Portfolio</title>")
    with open(index_path, "w") as f:
        f.write(html)

    print(f"\nDone! Your site is ready in: {out_dir}")
    print(f"Open it directly: file://{os.path.abspath(index_path)}")
    print("Or serve it locally: python3 -m http.server --directory " + out_dir)


def main():
    parser = argparse.ArgumentParser(description="Generate a Netflix-style portfolio site.")
    parser.add_argument("--data", help="Path to a JSON file of answers (skips interactive prompts).")
    parser.add_argument("--out", default="output", help="Output directory (default: ./output)")
    args = parser.parse_args()

    if not os.path.isdir(TEMPLATE_DIR):
        print(f"Error: template directory not found at {TEMPLATE_DIR}", file=sys.stderr)
        sys.exit(1)

    if args.data:
        with open(args.data) as f:
            data = json.load(f)
    else:
        data = collect_interactive()

    build_site(data, args.out)


if __name__ == "__main__":
    main()
