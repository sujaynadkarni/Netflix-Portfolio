/*
 * Netflix-style portfolio app shell.
 * Renders entirely from the SITE_DATA object defined in data.js / data.sample.js.
 * Card "posters" are generated gradients — no external image assets needed.
 *
 * Intro sound: if an audio file exists at the path in data.meta.introSound
 * (default "assets/intro-sound.mp3"), that file is played. That file is NOT
 * included here — Netflix's actual sting is copyrighted/trademarked, so it
 * is never bundled or downloaded by this project. Drop your own licensed
 * audio file at that path if you want one. Otherwise this falls back to an
 * original sound synthesized live with the Web Audio API.
 */

(function () {
  const data = window.SITE_DATA;
  let currentPersona = null;
  let currentRoute = 'home';

  // ---------- Original synthesized cinematic sting (Web Audio API) ----------
  // Browsers block audio until a real user gesture, so this is only called
  // from a click handler (selecting a profile) — never on page load.
  let audioCtx = null;

  function getAudioCtx() {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      audioCtx = new Ctx();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  function playIntroSting() {
    const soundPath = (data.meta && data.meta.introSound) || 'assets/intro-sound.mp3';
    const audio = new Audio(soundPath);
    audio.volume = 0.9;
    let usedFile = false;
    audio
      .play()
      .then(() => {
        usedFile = true;
      })
      .catch(() => {
        if (!usedFile) playSynthesizedSting();
      });
    // Some browsers resolve play() even for a missing file until playback
    // actually starts; bail out to the synthesized sting if nothing is
    // audibly progressing shortly after.
    setTimeout(() => {
      if (!usedFile && (audio.error || audio.readyState === 0)) {
        playSynthesizedSting();
      }
    }, 150);
  }

  function playSynthesizedSting() {
    try {
      const ctx = getAudioCtx();
      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.gain.value = 0.9;
      master.connect(ctx.destination);

      // A short percussive "thud" transient (filtered noise burst) under each note,
      // for a brassy, cinematic feel rather than a plain sine beep.
      function thump(start, dur) {
        const bufferSize = ctx.sampleRate * dur;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const out = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          out[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.35, now + start);
        gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);
        noise.connect(filter).connect(gain).connect(master);
        noise.start(now + start);
      }

      // A layered tone (fundamental + fifth + octave) run through a lowpass
      // filter that opens up over time, like a swelling brass/orchestral hit.
      function chordHit(freqs, start, dur, peakGain) {
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300, now + start);
        filter.frequency.exponentialRampToValueAtTime(2200, now + start + dur * 0.35);
        filter.frequency.exponentialRampToValueAtTime(500, now + start + dur);
        filter.connect(master);

        freqs.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          osc.type = i === 0 ? 'sawtooth' : 'triangle';
          osc.frequency.setValueAtTime(freq, now + start);
          const amp = ctx.createGain();
          const g = peakGain / (i + 1.6);
          amp.gain.setValueAtTime(0, now + start);
          amp.gain.linearRampToValueAtTime(g, now + start + 0.04);
          amp.gain.exponentialRampToValueAtTime(0.0008, now + start + dur);
          osc.connect(amp).connect(filter);
          osc.start(now + start);
          osc.stop(now + start + dur + 0.05);
        });
      }

      // "bum" — low, short, grounded
      thump(0, 0.25);
      chordHit([82.4, 123.5, 164.8], 0, 0.45, 0.5);

      // "...BUM" — brighter, fuller, longer swell
      thump(0.5, 0.35);
      chordHit([110, 164.8, 220, 277.2], 0.5, 1.3, 0.6);
    } catch (e) {
      // Audio API unavailable — fail silently, visuals still work.
    }
  }

  // ---------- Deterministic poster gradient from a string ----------
  const PALETTES = [
    ['#8E0E00', '#1F1C18'],
    ['#1F4287', '#121212'],
    ['#2C3E50', '#0f0f0f'],
    ['#6a3093', '#1a1a1a'],
    ['#b21f1f', '#1a2a6c'],
    ['#434343', '#000000'],
    ['#c31432', '#240b36'],
    ['#0f2027', '#203a43'],
  ];

  function hashStr(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h);
  }

  function posterStyle(seed) {
    const [a, b] = PALETTES[hashStr(seed) % PALETTES.length];
    return `background: linear-gradient(135deg, ${a}, ${b});`;
  }

  // ---------- Animated "screen of code" hero backdrop ----------
  // Rendered live from this markup — not a video file — so there's nothing
  // sourced from elsewhere to worry about licensing.
  const HERO_CODE_LINES = [
    '<span class="kw">def</span> <span class="fn">automate_weekly_report</span>(accounts):',
    '    <span class="kw">for</span> acct <span class="kw">in</span> accounts:',
    '        risk = score_churn(acct.usage_30d)',
    '        <span class="kw">if</span> risk &gt; <span class="num">0.7</span>:',
    '            notify_cs_team(acct, risk)',
    '',
    '<span class="com">-- weekly KPI pull, scheduled Monday 6am</span>',
    '<span class="kw">SELECT</span> region, <span class="fn">SUM</span>(revenue) <span class="kw">AS</span> total',
    '<span class="kw">FROM</span> pipeline_events',
    '<span class="kw">WHERE</span> created_at &gt;= <span class="str">\'2026-01-01\'</span>',
    '<span class="kw">GROUP BY</span> region <span class="kw">ORDER BY</span> total <span class="kw">DESC</span>;',
    '',
    '<span class="com"># Salesforce flow: route high-priority case</span>',
    '<span class="kw">trigger</span> <span class="fn">onCaseCreated</span>(case):',
    '    <span class="kw">if</span> case.priority == <span class="str">"High"</span>:',
    '        assign_to(queue=<span class="str">"escalations"</span>)',
    '        slack.<span class="fn">notify</span>(<span class="str">"#cs-escalations"</span>, case.id)',
    ''
  ].join('\n');

  function buildHeroCodeBg() {
    const tripled = `${HERO_CODE_LINES}\n${HERO_CODE_LINES}\n${HERO_CODE_LINES}`;
    return `<div class="hero-code-bg"><pre class="hero-code-track">${tripled}</pre></div>`;
  }

  // ---------- Boot sequence: tap to begin -> intro -> profiles -> app ----------
  // Browsers only allow audio to play after a real user gesture, so the
  // intro screen waits for a click/key/tap before the logo animation and
  // sound fire together — same moment, on purpose.
  function boot() {
    document.title = data.meta.name + ' — Portfolio';
    const introScreen = document.getElementById('intro-screen');
    const introLogo = document.getElementById('intro-logo');
    introLogo.textContent = data.meta.logoText || data.meta.name;

    const hint = document.createElement('div');
    hint.className = 'intro-hint';
    hint.textContent = 'tap to begin';
    introScreen.appendChild(hint);

    let started = false;
    function startIntro() {
      if (started) return;
      started = true;
      introScreen.removeEventListener('click', startIntro);
      introScreen.removeEventListener('keydown', startIntro);
      hint.classList.add('hidden');
      introLogo.classList.add('playing');
      playIntroSting();

      setTimeout(() => {
        introScreen.classList.add('hidden');
        showProfiles();
      }, 4100);
    }

    introScreen.addEventListener('click', startIntro);
    introScreen.addEventListener('keydown', startIntro);
    introScreen.tabIndex = 0;
    introScreen.focus();
  }

  function showProfiles() {
    const screen = document.getElementById('profiles-screen');
    screen.classList.remove('hidden');
    const grid = document.getElementById('profiles-grid');
    grid.innerHTML = '';
    data.personas.forEach((p) => {
      const btn = document.createElement('button');
      btn.className = 'profile-tile';
      btn.innerHTML = `
        <span class="profile-avatar" style="background:${p.color}"><span class="avatar-emoji">${p.emoji || '🙂'}</span></span>
        <span class="profile-name">${p.label}</span>
      `;
      btn.addEventListener('click', () => selectPersona(p.id));
      grid.appendChild(btn);
    });
  }

  function selectPersona(id) {
    currentPersona = data.personas.find((p) => p.id === id) || data.personas[0];
    playIntroSting();
    document.getElementById('profiles-screen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    buildShell();
    navigate(window.location.hash.replace('#', '') || 'home');
  }

  function buildShell() {
    document.getElementById('brand-logo').textContent = data.meta.logoText || data.meta.name;
    document.getElementById('brand-logo').onclick = () => navigate('home');

    const chip = document.getElementById('profile-chip');
    chip.style.background = currentPersona.color;
    chip.textContent = currentPersona.emoji || '🙂';
    chip.onclick = () => {
      document.getElementById('app').classList.add('hidden');
      window.location.hash = '';
      showProfiles();
    };

    const navLinks = document.getElementById('nav-links');
    navLinks.innerHTML = '';
    (data.nav || []).forEach((item) => {
      const a = document.createElement('button');
      a.className = 'nav-link';
      a.textContent = item.label;
      a.dataset.route = item.route;
      a.addEventListener('click', () => navigate(item.route));
      navLinks.appendChild(a);
    });

    const repoLink = document.getElementById('footer-repo-link');
    if (data.meta.skillRepo) repoLink.href = data.meta.skillRepo;
  }

  function setActiveNav(route) {
    document.querySelectorAll('.nav-link').forEach((el) => {
      el.classList.toggle('active', el.dataset.route === route);
    });
  }

  function navigate(route) {
    currentRoute = route || 'home';
    window.location.hash = currentRoute;
    setActiveNav(currentRoute);
    const root = document.getElementById('view-root');
    root.innerHTML = '';
    root.scrollTop = 0;
    window.scrollTo(0, 0);

    switch (currentRoute) {
      case 'skills':
        root.appendChild(renderSkillsPage());
        break;
      case 'projects':
        root.appendChild(renderProjectsPage());
        break;
      case 'professional':
        root.appendChild(renderProfessionalPage());
        break;
      case 'hire-me':
        root.appendChild(renderHireMePage());
        break;
      default:
        root.appendChild(renderHome());
    }
  }

  // ---------- Views ----------
  function renderHome() {
    const frag = document.createDocumentFragment();

    const defaultActions = [
      { label: 'Resume', href: data.meta.resume, icon: '▶', style: 'primary' },
      { label: 'LinkedIn', href: data.meta.linkedin, icon: 'ⓘ', style: 'secondary' }
    ];
    const actions = currentPersona.heroActions || defaultActions;
    const actionsHtml = actions
      .map(
        (a) =>
          `<a class="btn btn-${a.style || 'secondary'}" href="${a.href}" target="_blank" rel="noopener">${a.icon ? a.icon + ' ' : ''}${a.label}</a>`
      )
      .join('');

    const hero = document.createElement('section');
    hero.className = 'hero';
    hero.innerHTML = `
      ${buildHeroCodeBg()}
      <div class="hero-content">
        <h1 class="hero-name">${data.meta.name}</h1>
        <p class="hero-bio">${currentPersona.heroBio}</p>
        <div class="hero-actions">${actionsHtml}</div>
      </div>
      <div class="hero-badge">${data.meta.badge || 'ORIGINAL'}</div>
    `;
    frag.appendChild(hero);

    const topPicks = currentPersona.topPicksRow || data.topPicksRow;
    const continueWatching = currentPersona.continueWatchingRow || data.continueWatchingRow;
    frag.appendChild(renderRow(`Today's Top Picks for ${currentPersona.label}`, topPicks));

    if (currentPersona.extraRow) {
      frag.appendChild(renderRow(currentPersona.extraRow.title, currentPersona.extraRow.items));
    }

    frag.appendChild(renderRow(`Continue Watching for ${currentPersona.label}`, continueWatching));

    return frag;
  }

  function renderRow(title, items) {
    const section = document.createElement('section');
    section.className = 'row';
    const track = (items || [])
      .map((item) => {
        const bg = item.image
          ? `background-image: url('${item.image}'); background-size: cover; background-position: center;`
          : posterStyle(item.title);
        return `
        <div class="card" style="${bg}" data-route="${item.route || ''}">
          <div class="card-label">${item.icon ? item.icon + ' ' : ''}${item.title}</div>
        </div>`;
      })
      .join('');
    section.innerHTML = `<h2 class="row-title">${title}</h2><div class="row-track">${track}</div>`;
    section.querySelectorAll('.card').forEach((card, i) => {
      const item = items[i];
      card.addEventListener('click', () => handleCardClick(item));
      if (item.type === 'youtube' && (item.videoId || item.playlistId)) {
        fetchYoutubeThumb(item).then((url) => {
          if (!url) return;
          card.style.backgroundImage = `url('${url}')`;
          card.style.backgroundSize = 'cover';
          card.style.backgroundPosition = 'center';
        });
      }
    });
    return section;
  }

  // ---------- Real YouTube thumbnails via the public oEmbed endpoint ----------
  // No API key needed; this is the same endpoint YouTube's own embed widgets
  // use client-side. Cached in memory so switching personas doesn't refetch.
  const youtubeThumbCache = {};

  async function fetchYoutubeThumb(item) {
    const key = item.playlistId ? `list:${item.playlistId}` : `video:${item.videoId}`;
    if (youtubeThumbCache[key] !== undefined) return youtubeThumbCache[key];
    const targetUrl = item.playlistId
      ? `https://www.youtube.com/playlist?list=${item.playlistId}`
      : `https://www.youtube.com/watch?v=${item.videoId}`;
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(targetUrl)}&format=json`;
    try {
      const res = await fetch(oembedUrl);
      if (!res.ok) throw new Error('oEmbed request failed');
      const json = await res.json();
      youtubeThumbCache[key] = json.thumbnail_url || null;
    } catch (e) {
      youtubeThumbCache[key] = null;
    }
    return youtubeThumbCache[key];
  }

  function renderSkillsPage() {
    const wrap = document.createElement('div');
    wrap.className = 'page';
    wrap.innerHTML = `<h1 class="page-title">Skills</h1>`;
    (data.skills || []).forEach((group) => {
      const block = document.createElement('div');
      block.className = 'section-block';
      block.innerHTML = `<h2 class="section-heading">${group.category}</h2>`;
      const grid = document.createElement('div');
      grid.className = 'tile-grid';
      group.items.forEach((item) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        const bullets = (item.bullets || []).map((b) => `<li>${b}</li>`).join('');
        tile.innerHTML = `
          <div class="tile-icon">${item.icon || '◆'}</div>
          <p class="tile-name">${item.name}</p>
          ${item.blurb ? `<p class="tile-desc">${item.blurb}</p>` : ''}
          ${bullets ? `<ul class="tile-bullets">${bullets}</ul>` : ''}
        `;
        grid.appendChild(tile);
      });
      block.appendChild(grid);
      wrap.appendChild(block);
    });
    return wrap;
  }

  function renderProjectsPage() {
    const wrap = document.createElement('div');
    wrap.className = 'page';
    wrap.innerHTML = `<h1 class="page-title">Projects</h1>`;
    const grid = document.createElement('div');
    grid.className = 'tile-grid';
    (data.projects || []).forEach((p) => {
      const card = document.createElement('a');
      card.className = 'project-card';
      card.href = p.link || '#';
      card.target = p.link ? '_blank' : '_self';
      card.rel = 'noopener';
      const bullets = (p.bullets || []).map((b) => `<li>${b}</li>`).join('');
      card.innerHTML = `
        <div class="project-poster" style="${posterStyle(p.name)}">${p.icon || '🎬'}</div>
        <div class="project-body">
          <p class="project-name">${p.name}</p>
          <p class="project-desc">${p.blurb}</p>
          ${bullets ? `<ul class="project-bullets">${bullets}</ul>` : ''}
          <div class="project-tags">${(p.tags || []).map((t) => `<span class="tag">${t}</span>`).join('')}</div>
        </div>
      `;
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  function renderProfessionalPage() {
    const wrap = document.createElement('div');
    wrap.className = 'page';
    wrap.innerHTML = `<h1 class="page-title">Professional Experience</h1>`;
    (data.experience || []).forEach((e) => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      const bullets = e.bullets && e.bullets.length ? e.bullets : e.highlight ? [e.highlight] : [];
      item.innerHTML = `
        <p class="timeline-role">${e.role} · ${e.company}</p>
        <p class="timeline-meta">${e.dates}</p>
        <ul class="timeline-bullets">${bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
      `;
      wrap.appendChild(item);
    });
    return wrap;
  }

  function renderHireMePage() {
    const wrap = document.createElement('div');
    wrap.className = 'page';
    wrap.innerHTML = `<h1 class="page-title">Hire Me</h1>`;
    const grid = document.createElement('div');
    grid.className = 'contact-grid';
    (data.contacts || []).forEach((c) => {
      const a = document.createElement('a');
      a.className = 'contact-card';
      a.href = c.href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.innerHTML = `
        <span class="contact-icon">${c.icon || '🔗'}</span>
        <span>
          <div class="contact-label">${c.label}</div>
          <div class="contact-sub">${c.sub || ''}</div>
        </span>
      `;
      grid.appendChild(a);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  // ---------- In-page "watch" modal ----------
  // Keeps YouTube/Instagram content inside the Netflix-style chrome instead
  // of bouncing the visitor away to another site.
  function handleCardClick(item) {
    if (!item) return;
    if (item.type === 'youtube' || item.type === 'instagram') {
      openMediaModal(item);
      return;
    }
    if (item.type === 'external') {
      if (item.href && item.href !== '#') window.open(item.href, '_blank', 'noopener');
      return;
    }
    if (item.route) navigate(item.route);
  }

  function openMediaModal(item) {
    const overlay = document.getElementById('media-modal');
    const frame = document.getElementById('media-modal-frame');
    const placeholder = document.getElementById('media-modal-placeholder');
    const titleEl = document.getElementById('media-modal-title');
    titleEl.textContent = item.title || '';

    let src = '';
    if (item.type === 'youtube' && item.playlistId) {
      src = `https://www.youtube.com/embed/videoseries?list=${item.playlistId}&autoplay=1`;
    } else if (item.type === 'youtube' && item.videoId) {
      const start = item.startSeconds ? `&start=${item.startSeconds}` : '';
      src = `https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0${start}`;
    } else if (item.type === 'instagram' && item.postUrl) {
      src = `${item.postUrl.replace(/\/$/, '')}/embed`;
    }

    if (src) {
      frame.src = src;
      frame.classList.remove('hidden');
      placeholder.classList.add('hidden');
    } else {
      frame.src = '';
      frame.classList.add('hidden');
      placeholder.classList.remove('hidden');
      placeholder.textContent = `Add a ${item.type === 'youtube' ? 'videoId/playlistId' : 'postUrl'} for "${item.title}" in data.js to play it here.`;
    }

    overlay.classList.remove('hidden');
    overlay.classList.add(item.type === 'instagram' ? 'media-modal-portrait' : 'media-modal-landscape');
    document.addEventListener('keydown', onModalKeydown);
  }

  function closeMediaModal() {
    const overlay = document.getElementById('media-modal');
    const frame = document.getElementById('media-modal-frame');
    frame.src = ''; // stop playback
    overlay.classList.add('hidden');
    overlay.classList.remove('media-modal-portrait', 'media-modal-landscape');
    document.removeEventListener('keydown', onModalKeydown);
  }

  function onModalKeydown(e) {
    if (e.key === 'Escape') closeMediaModal();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('media-modal');
    const closeBtn = document.getElementById('media-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeMediaModal);
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeMediaModal();
      });
    }
  });

  window.addEventListener('hashchange', () => {
    if (!document.getElementById('app').classList.contains('hidden')) {
      navigate(window.location.hash.replace('#', '') || 'home');
    }
  });

  document.addEventListener('DOMContentLoaded', boot);
})();
