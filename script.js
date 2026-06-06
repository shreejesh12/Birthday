const friendName = "Alina";

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const state = {
  audioContext: null,
  analyser: null,
  masterGain: null,
  audioElement: null,
  mediaSource: null,
  currentTrack: 0,
  isPlaying: false,
  isAmbientOn: false,
  stepTimer: null,
  playbackStep: 0,
  ambientTimer: null,
  customTracks: [],
  particles: [],
  fireworks: [],
  lanterns: [],
  stars: [],
  lastTime: 0,
  cursor: { x: 0, y: 0 },
};

const palette = ["#ff7eb9", "#b49cff", "#ffd98e", "#ffffff", "#ff9bb4"];

const compliments = [
  "You make ordinary conversations feel unexpectedly lovely.",
  "Your humor lands like sunshine on a difficult day.",
  "You have a very rare talent for making people feel seen.",
  "Your energy is comforting without ever feeling small.",
  "You’re the kind of friend who turns chaos into a story worth remembering.",
  "You bring warmth to spaces that didn’t know they needed it.",
  "Your taste is always just a little bit iconic.",
  "You are thoughtful in ways people will remember for a long time.",
  "You make kindness look effortless and cool.",
  "You have a gift for lifting the mood without trying too hard.",
  "You’re genuinely fun to talk to, which is a very underrated superpower.",
  "You make being yourself look easy and elegant.",
  "You care in a way that actually matters.",
  "You make friendship feel softer and brighter.",
  "You have main-character polish, but in a very friend-shaped way.",
  "You are memorable for all the right reasons.",
  "You make the internet feel a little less cold.",
];

const futureMessages = {
  2027: "2027 says you are still receiving loving messages, inside jokes, and at least one birthday dessert that was too pretty to eat at first.",
  2028: "2028 reports that your laugh remains undefeated and your favorite people are still trying to keep up with you.",
  2029: "2029 predicts an even better balance of peace, growth, and unreasonably good moments that arrive right on time.",
  2030: "2030 is convinced your friend group still quotes old messages from you because your timing remains iconic.",
  2031: "2031 brings one of those birthdays where everyone says, ‘How is she even more lovely than last year?’",
  2032: "2032 looks bright, soft, and a little absurd in the best possible way, with more reasons to smile than you expected.",
};

const facts = [
  {
    icon: "💌",
    title: "one thing i love about",
    text: "what are u even reading this about, i love everything about u dumbo",
  },
  {
    icon: "🥺",
    title: "why you should never leave me",
    text: "uhm......mai akela ho jaunga and maybe you'll never find a besttttt freind like me hehe",
  },
  {
    icon: "🎵",
    title: "playlist",
    text: "and the songs u used to suggest, i always used to hear them hahaha, it never showed because i have utube ka prem and i listen waha par mostly hehe, ur choice of songs are good",
  },
];

const reasonCards = [
  "You make people feel comfortable quickly.",
  "You have genuinely good taste.",
  "You listen in a way that feels real.",
  "You remember the little things.",
  "You can be both funny and thoughtful.",
  "You bring calm without being boring.",
  "You turn awkward moments into normal ones.",
  "You make conversations feel alive.",
  "You have a beautifully distinct personality.",
  "You know how to make a friend feel important.",
  "You keep the energy warm.",
  "You’re considerate in a very natural way.",
  "You make kindness look cool.",
  "You’re better company than most people on the internet.",
  "You leave a positive impression that lasts.",
  "You are easy to appreciate and hard to replace.",
  "You have a soft spot that makes you even more special.",
  "You make friendship feel genuine.",
];

const tracks = [
  {
    title: "Golden Hour Wishes",
    subtitle: "Soft synth birthday atmosphere",
    art: artworkSvg("golden-hour", ["#ff7eb9", "#b49cff", "#ffd98e"]),
    kind: "synth",
    bpm: 84,
    pattern: [[220, 277, 330], [196, 247, 294], [174, 220, 261], [196, 247, 330]],
  },
  {
    title: "Starlit Confetti",
    subtitle: "Glittery plucks and cozy pulses",
    art: artworkSvg("starlit-confetti", ["#b49cff", "#ffd98e", "#ff7eb9"]),
    kind: "synth",
    bpm: 96,
    pattern: [[262, 330, 392], [294, 370, 440], [247, 311, 370], [220, 277, 330]],
  },
  {
    title: "Lantern Glow",
    subtitle: "Warm ambient layers for the finale",
    art: artworkSvg("lantern-glow", ["#ffd98e", "#ff7eb9", "#b49cff"]),
    kind: "synth",
    bpm: 72,
    pattern: [[174, 220, 261], [196, 247, 294], [220, 277, 330], [246, 311, 370]],
  },
];

const localUploadedTracks = [
  {
    title: "Unlock It",
    subtitle: "Charli XCX",
    source: "Charli XCX - Unlock It (feat. Kim Petras and Jay Park) [Official Visualizer].mp3",
  },
  {
    title: "Crash and Burn",
    subtitle: "Maggie Lindemann",
    source: "Maggie Lindemann - Crash and Burn (Visualizer).mp3",
  },
  {
    title: "ecstacy",
    subtitle: "SUICIDAL-IDOL",
    source: "SUICIDAL-IDOL - ecstacy (Official Music Video).mp3",
  },
  {
    title: "OMOIDE KAKERA",
    subtitle: "English Version",
    source: "OMOIDE KAKERAFragments of Memories-English Version-.mp3",
  },
  {
    title: "想イ出カケラ",
    subtitle: "Uploaded track",
    source: "想イ出カケラ.mp3",
  },
];

function getTrackLibrary() {
  return tracks.concat(state.customTracks);
}

function hideLoader() {
  document.getElementById("loader")?.classList.add("loader--hidden");
}

window.addEventListener("DOMContentLoaded", () => window.setTimeout(hideLoader, 700));
window.addEventListener("load", hideLoader);
window.setTimeout(hideLoader, 1800);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

function artworkSvg(seed, colors) {
  const [a, b, c] = colors;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${a}" />
          <stop offset="55%" stop-color="${b}" />
          <stop offset="100%" stop-color="${c}" />
        </linearGradient>
        <radialGradient id="g2" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.48" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="600" rx="48" fill="#120c1f" />
      <circle cx="120" cy="110" r="130" fill="url(#g2)" opacity="0.9" />
      <circle cx="475" cy="150" r="150" fill="url(#g2)" opacity="0.5" />
      <circle cx="320" cy="330" r="190" fill="url(#g1)" opacity="0.7" />
      <path d="M0 440 C 120 390, 220 520, 600 420 L 600 600 L 0 600 Z" fill="rgba(255,255,255,0.12)" />
      <circle cx="300" cy="278" r="96" fill="#0f1020" opacity="0.55" />
      <circle cx="300" cy="278" r="58" fill="#ffffff" opacity="0.18" />
      <g fill="none" stroke="#ffffff" stroke-opacity="0.18" stroke-width="8">
        <circle cx="300" cy="278" r="140" />
        <circle cx="300" cy="278" r="190" />
      </g>
      <text x="50%" y="86%" text-anchor="middle" fill="#ffffff" fill-opacity="0.9" font-size="28" font-family="Georgia, serif" letter-spacing="6">${seed.toUpperCase()}</text>
    </svg>
  `)}`;
}

function init() {
  buildFacts();
  buildGallery();
  setupTypewriter();
  setupRevealObserver();
  setupCursor();
  setupScrollButtons();
  setupGiftBox();
  setupCompliments();
  setupCertificate();
  setupLightbox();
  setupMusicPlayer();
  setupFloatingStickers();
  setupHiddenEasterEggs();
  setupCanvas();

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("scroll", onScrollEffects, { passive: true });

  prefillLocalUploadedTracks();

  renderPlaylist();
  updateTrackUI();
  setupIntroSongModal();
  hideLoader();
}

// Flip-card reasons removed per user request.

// Future wishes (tap-a-year) removed per user request.

function buildFacts() {
  const grid = $("#fact-grid");
  grid.innerHTML = facts.map((fact) => `
    <article class="fact-card glass reveal fact-card--casual">
      <div class="fact-card__icon">${fact.icon}</div>
      <h3>${escapeHTML(fact.title)}</h3>
      <p>${escapeHTML(fact.text)}</p>
    </article>
  `).join("");
}

function setupFloatingStickers() {
  const container = $("#floating-stickers");
  if (!container) return;

  const stickers = ["char.jpg", "char2.jpg", "char3.jpg"];
  const nodes = [];
  for (let i = 0; i < 12; i += 1) {
    const img = document.createElement("img");
    img.className = "floating-sticker";
    img.src = stickers[i % stickers.length];
    img.alt = "";
    img.style.left = `${6 + Math.random() * 88}%`;
    img.style.top = `${8 + Math.random() * 84}%`;
    img.style.setProperty("--size", `${64 + Math.random() * 56}px`);
    img.style.setProperty("--dur", `${5.8 + Math.random() * 4.2}s`);
    img.style.setProperty("--delay", `${Math.random() * 4}s`);
    container.appendChild(img);
    nodes.push(img);
  }

  // Keep a few stickers relocating occasionally so placement feels random and alive.
  setInterval(() => {
    const sample = nodes[Math.floor(Math.random() * nodes.length)];
    if (!sample) return;
    sample.style.left = `${6 + Math.random() * 88}%`;
    sample.style.top = `${8 + Math.random() * 84}%`;
  }, 3600);
}

function extractYouTubeId(url) {
  if (!url) return null;
  const ytRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.*v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/i;
  const m = url.match(ytRegex);
  return m ? m[1] : null;
}

function prefillYouTubeTracks(urls) {
  if (!Array.isArray(urls)) return;
  urls.forEach((url, idx) => {
    const id = extractYouTubeId(url);
    if (!id) return;
    state.customTracks.push({
      title: `YouTube ${idx + 1}`,
      subtitle: "User added",
      art: artworkSvg(`yt-${idx + 1}`, ["#ffd98e", "#ff7eb9", "#b49cff"]),
      kind: "youtube",
      videoId: id,
    });
  });
}

function prefillLocalUploadedTracks() {
  localUploadedTracks.forEach((track, idx) => {
    state.customTracks.push({
      title: track.title,
      subtitle: track.subtitle,
      art: artworkSvg(`local-${idx + 1}`, ["#9ee5ff", "#ffd98e", "#ff7eb9"]),
      kind: "audio",
      source: encodeURI(track.source),
      isUploaded: true,
    });
  });
}

function buildGallery() {
  const grid = $("#gallery-grid");
  const items = [
    ["Favorite character", "She is always iconic", "char.jpg"],
    ["Milk box mood", "Cute chaos energy", "char2.jpg"],
    ["Tiny sword mode", "Pocket hero unlocked", "char3.jpg"],
    ["Screenshot worthy", "A moment that looked too good to keep private."],
    ["Meme of the week", "The joke that kept the friendship chat alive."],
    ["Tiny victory", "A little win that deserved a celebratory message."],
    ["Late-night laugh", "The chat that made the day feel softer."],
    ["Birthday sparkle", "A placeholder for a moment that deserves the spotlight."],
  ];

  grid.innerHTML = items.map(([caption, tag, localImage], index) => {
    const image = localImage || artworkSvg(`gallery-${index + 1}`, ["#ff7eb9", "#b49cff", "#ffd98e"]);
    const height = 220 + (index % 3) * 64;
    return `
      <button type="button" class="gallery-item" data-caption="${escapeAttr(`${caption} - ${tag}`)}" data-image="${image}">
        <img src="${image}" alt="${escapeAttr(caption)}" style="height:${height}px; object-fit:cover;" />
        <p><span class="gallery-item__tag">${escapeHTML(tag)}</span><br />${escapeHTML(caption)}</p>
      </button>
    `;
  }).join("");
}

function setupTypewriter() {
  const target = $("#typewriter");
  const lines = [
    `Welcome, ${friendName}. This is a small corner of the internet built to celebrate you.`,
    "Take your time. Tap around. There are memories, compliments, surprises, and a few hidden messages waiting.",
  ];
  let lineIndex = 0;
  let charIndex = 0;

  const tick = () => {
    const line = lines[lineIndex];
    target.textContent = line.slice(0, charIndex);
    charIndex += 1;
    if (charIndex <= line.length) {
      window.setTimeout(tick, lineIndex === 0 ? 28 : 20);
      return;
    }
    if (lineIndex < lines.length - 1) {
      target.textContent += "\n";
      lineIndex += 1;
      charIndex = 0;
      window.setTimeout(tick, 550);
    }
  };

  tick();
}

function setupRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  $$(".reveal").forEach((element) => observer.observe(element));
}

function setupCursor() {
  const dot = $(".custom-cursor");
  const ring = $(".custom-cursor--ring");

  document.addEventListener("pointermove", (event) => {
    state.cursor.x = event.clientX;
    state.cursor.y = event.clientY;
    dot.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    ring.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  }, { passive: true });

  document.addEventListener("pointerdown", () => {
    ring.style.width = "56px";
    ring.style.height = "56px";
    ring.style.borderColor = "rgba(255, 217, 142, 0.85)";
  });

  document.addEventListener("pointerup", () => {
    ring.style.width = "42px";
    ring.style.height = "42px";
    ring.style.borderColor = "rgba(255,255,255,0.5)";
  });
}

function setupScrollButtons() {
  $$('[data-scroll-to]').forEach((button) => {
    button.addEventListener("click", () => {
      $(button.dataset.scrollTo)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setupGiftBox() {
  const box = $("#gift-box");
  const message = $("#gift-message");
  let opened = false;

  box.addEventListener("click", () => {
    opened = !opened;
    box.classList.toggle("is-open", opened);
    message.classList.toggle("is-visible", opened);
    burstConfetti(window.innerWidth * 0.5, window.innerHeight * 0.48, opened ? 72 : 28);
    showToast(opened ? "Surprise unlocked." : "Gift box reset.");
  });
}

function setupCompliments() {
  const button = $("#compliment-btn");
  const text = $("#compliment-text");
  button.addEventListener("click", () => {
    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    text.style.opacity = 0.25;
    window.setTimeout(() => {
      text.textContent = compliment;
      text.style.opacity = 1;
    }, 140);
  });
}

function setupCertificate() {
  $("#download-certificate").addEventListener("click", downloadCertificateAsImage);
}

function setupLightbox() {
  const lightbox = $("#lightbox");
  const image = $("#lightbox-image");
  const caption = $("#lightbox-caption");

  $("#gallery-grid").addEventListener("click", (event) => {
    const item = event.target.closest(".gallery-item");
    if (!item) return;
    image.src = item.dataset.image;
    caption.textContent = item.dataset.caption;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  });

  const close = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  };

  $("#close-lightbox").addEventListener("click", close);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}

function setupHiddenEasterEggs() {
  let secret = "";
  document.addEventListener("keydown", (event) => {
    secret += event.key.toLowerCase();
    secret = secret.slice(-10);
    if (secret.includes("sparkle")) {
      showToast("Hidden message: you are appreciated more than you know.");
      burstConfetti(window.innerWidth * 0.8, window.innerHeight * 0.18, 50);
    }
  });

  $("#friend-name").addEventListener("click", () => showToast("Easter egg: this birthday site was made with care."));
}

function setupMusicPlayer() {
  $("#album-art").src = tracks[0].art;
  $("#song-form").addEventListener("submit", handleSongSubmit);
  $("#playlist").addEventListener("click", handlePlaylistClick);
  $("#play-toggle").addEventListener("click", toggleTrack);
  $("#next-track").addEventListener("click", () => changeTrack(1));
  $("#prev-track").addEventListener("click", () => changeTrack(-1));
  $("#launch-fireworks").addEventListener("click", () => {
    launchFireworks(8);
    spawnLanterns(7);
    showToast("Fireworks launched.");
  });
  $("#toggle-ambient").addEventListener("click", toggleAmbientMusic);

  requestAnimationFrame(drawVisualizer);
}

function setupIntroSongModal() {
  const modal = $("#intro-modal");
  const closeBtn = $("#intro-close");
  const options = $("#intro-song-options");
  if (!modal || !options) return;

  const library = getTrackLibrary();
  const uploaded = library
    .map((track, index) => ({ track, index }))
    .filter((entry) => entry.track.kind === "audio" && entry.track.isUploaded);

  options.innerHTML = uploaded.map((entry) => `
    <button class="intro-song-btn" type="button" data-track-index="${entry.index}">
      <strong>${escapeHTML(entry.track.title)}</strong><br />
      <small>${escapeHTML(entry.track.subtitle)}</small>
    </button>
  `).join("");

  options.insertAdjacentHTML("beforeend", `
    <button class="intro-song-btn" type="button" data-track-index="skip">
      <strong>Maybe later</strong><br />
      <small>Open website quietly first</small>
    </button>
  `);

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  };

  closeBtn?.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  options.addEventListener("click", (event) => {
    const button = event.target.closest(".intro-song-btn");
    if (!button) return;
    if (button.dataset.trackIndex === "skip") {
      showToast("No problem, music can start anytime.");
      closeModal();
      return;
    }

    const index = Number(button.dataset.trackIndex);
    if (!Number.isNaN(index)) {
      setTrack(index, false);
      state.isPlaying = true;
      playCurrentTrack();
      updateTrackUI();
      showToast(`Now playing: ${getTrackLibrary()[index].title}`);
      closeModal();
    }
  });

  window.setTimeout(() => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }, 1000);
}

function renderPlaylist() {
  const playlist = $("#playlist");
  const library = getTrackLibrary();
  playlist.innerHTML = library.map((track, index) => `
    <button class="playlist-chip ${index === state.currentTrack ? "is-active" : ""}" type="button" data-track="${index}">
      ${track.kind === "youtube" ? "🎬 " : "♪ "}${escapeHTML(track.title)}
    </button>
  `).join("");
}

function handlePlaylistClick(event) {
  const chip = event.target.closest(".playlist-chip");
  if (!chip) return;
  setTrack(Number(chip.dataset.track));
}

function handleSongSubmit(event) {
  event.preventDefault();
  const titleInput = $("#song-title");
  const artistInput = $("#song-artist");
  const sourceInput = $("#song-source");
  const fileInput = $("#song-file");
  const title = titleInput.value.trim() || "Custom Song";
  const note = artistInput.value.trim() || "Your song choice";
  const source = sourceInput.value.trim();
  const file = fileInput.files?.[0];

  if (!source && !file) {
    showToast("Add an audio URL or pick a file first.");
    return;
  }

  const youtubeId = source ? extractYouTubeId(source) : null;
  if (youtubeId) {
    state.customTracks.push({
      title,
      subtitle: note,
      art: artworkSvg(title.replace(/[^a-z0-9]+/gi, "-"), ["#ff7eb9", "#b49cff", "#ffd98e"]),
      kind: "youtube",
      videoId: youtubeId,
    });
  } else {
    state.customTracks.push({
      title,
      subtitle: note,
      art: artworkSvg(title.replace(/[^a-z0-9]+/gi, "-"), ["#ff7eb9", "#b49cff", "#ffd98e"]),
      kind: "audio",
      source: file ? URL.createObjectURL(file) : source,
    });
  }

  titleInput.value = "";
  artistInput.value = "";
  sourceInput.value = "";
  fileInput.value = "";
  renderPlaylist();
  showToast(`${title} added to the playlist.`);
}

function updateTrackUI() {
  const track = getTrackLibrary()[state.currentTrack] || tracks[0];
  $("#track-title").textContent = track.title;
  $("#track-subtitle").textContent = track.subtitle;
  $("#album-art").src = track.art;
  $("#play-toggle").textContent = state.isPlaying ? "❚❚" : "▶";
  renderPlaylist();
}

function ensureAudioContext() {
  if (state.audioContext) {
    return state.audioContext;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  state.audioContext = new AudioContextClass();
  state.analyser = state.audioContext.createAnalyser();
  state.analyser.fftSize = 256;
  state.masterGain = state.audioContext.createGain();
  state.masterGain.gain.value = 0.14;
  state.masterGain.connect(state.analyser);
  state.analyser.connect(state.audioContext.destination);

  state.audioElement = new Audio();
  state.audioElement.crossOrigin = "anonymous";
  state.audioElement.preload = "auto";
  state.audioElement.addEventListener("ended", () => {
    if (state.isPlaying) {
      changeTrack(1);
    }
  });
  state.mediaSource = state.audioContext.createMediaElementSource(state.audioElement);
  state.mediaSource.connect(state.masterGain);

  return state.audioContext;
}

function setTrack(index, playAfter = state.isPlaying) {
  const library = getTrackLibrary();
  state.currentTrack = (index + library.length) % library.length;
  state.playbackStep = 0;
  stopCurrentTrack();
  updateTrackUI();
  if (playAfter) {
    state.isPlaying = true;
    playCurrentTrack();
  }
}

function playCurrentTrack() {
  const track = getTrackLibrary()[state.currentTrack] || tracks[0];
  ensureAudioContext();
  if (state.audioContext.state === "suspended") {
    state.audioContext.resume();
  }
  // Handle YouTube embeds first
  if (track.kind === "youtube") {
    stopSequencer();
    if (state.audioElement) state.audioElement.pause();
    const container = $(".music-player__artwrap");
    const existing = $("#youtube-player");
    if (existing) existing.remove();
    const iframe = document.createElement("iframe");
    iframe.id = "youtube-player";
    iframe.width = "320";
    iframe.height = "320";
    iframe.allow = "autoplay; encrypted-media";
    iframe.src = `https://www.youtube.com/embed/${track.videoId}?rel=0&autoplay=1&controls=1`;
    $("#album-art").style.display = "none";
    container.appendChild(iframe);
    return;
  }

  if (track.kind === "audio") {
    state.audioElement.src = track.source;
    state.audioElement.play().catch(() => showToast("Tap again to allow playback."));
    return;
  }

  startSequencer(track);
}

function toggleTrack() {
  ensureAudioContext();
  if (state.audioContext.state === "suspended") {
    state.audioContext.resume();
  }

  state.isPlaying = !state.isPlaying;
  if (state.isPlaying) {
    playCurrentTrack();
    showToast("Music started.");
  } else {
    stopCurrentTrack();
    showToast("Music paused.");
  }
  updateTrackUI();
}

function changeTrack(delta) {
  setTrack(state.currentTrack + delta, state.isPlaying);
  showToast(`Track changed to ${getTrackLibrary()[state.currentTrack].title}.`);
}

function startSequencer(track) {
  if (!track || track.kind === "audio") {
    return;
  }

  stopSequencer();
  const beat = 60000 / track.bpm;

  state.stepTimer = window.setInterval(() => {
    const chord = track.pattern[state.playbackStep % track.pattern.length];
    playChord(chord);
    state.playbackStep += 1;
  }, beat);

  playChord(track.pattern[0]);
}

function stopSequencer() {
  if (state.stepTimer) {
    clearInterval(state.stepTimer);
    state.stepTimer = null;
  }
}

function stopCurrentTrack() {
  stopSequencer();
  if (state.audioElement) {
    state.audioElement.pause();
    state.audioElement.currentTime = 0;
  }
  // remove youtube iframe if present
  const existing = $("#youtube-player");
  if (existing) {
    existing.remove();
    $("#album-art").style.display = "";
  }
  if (state.ambientTimer) {
    clearInterval(state.ambientTimer);
    state.ambientTimer = null;
    state.isAmbientOn = false;
  }
}

function playChord(frequencies) {
  if (!state.audioContext || !state.masterGain) {
    return;
  }

  const now = state.audioContext.currentTime;
  frequencies.forEach((frequency, index) => {
    const oscillator = state.audioContext.createOscillator();
    const gain = state.audioContext.createGain();
    oscillator.type = index === 2 ? "triangle" : "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.08 / (index + 1), now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
    oscillator.connect(gain);
    gain.connect(state.masterGain);
    oscillator.start(now);
    oscillator.stop(now + 1);
  });
}

function toggleAmbientMusic() {
  if (!state.isPlaying) {
    toggleTrack();
    return;
  }

  const track = getTrackLibrary()[state.currentTrack];
  if (!track || track.kind === "audio" || track.kind === "youtube") {
    showToast("Ambient layers only apply to the built-in soundtrack.");
    return;
  }

  state.isAmbientOn = !state.isAmbientOn;
  if (state.isAmbientOn) {
    showToast("Ambient layer deepened.");
    state.ambientTimer = window.setInterval(() => playChord(tracks[2].pattern[state.playbackStep % 4]), 1800);
  } else {
    clearInterval(state.ambientTimer);
    state.ambientTimer = null;
    showToast("Ambient layer muted.");
  }
}

function setupCanvas() {
  state.canvas = $("#fx-canvas");
  state.ctx = state.canvas.getContext("2d");
  resizeCanvas();
  initStars();
  requestAnimationFrame(drawCanvas);
}

function resizeCanvas() {
  if (!state.canvas) return;
  state.canvas.width = window.innerWidth * devicePixelRatio;
  state.canvas.height = window.innerHeight * devicePixelRatio;
  state.canvas.style.width = `${window.innerWidth}px`;
  state.canvas.style.height = `${window.innerHeight}px`;
  state.ctx?.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  initStars();
}

function initStars() {
  state.stars = Array.from({ length: 90 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: 0.5 + Math.random() * 1.6,
    vx: (Math.random() - 0.5) * 0.12,
    vy: 0.02 + Math.random() * 0.08,
    twinkle: Math.random() * Math.PI * 2,
  }));
}

function drawCanvas(timestamp) {
  if (!state.ctx) {
    return;
  }

  const delta = Math.min(0.032, (timestamp - state.lastTime) / 1000 || 0.016);
  state.lastTime = timestamp;
  state.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  drawStars(state.ctx, delta, timestamp);
  updateParticles(delta);
  drawParticles(state.ctx);
  drawFireworks(state.ctx, delta);
  drawLanterns(state.ctx, delta);

  requestAnimationFrame(drawCanvas);
}

function drawStars(ctx, delta, timestamp) {
  state.stars.forEach((star) => {
    star.x += star.vx;
    star.y += star.vy;
    star.twinkle += delta * 3;
    if (star.y > window.innerHeight + 20) star.y = -10;
    if (star.x > window.innerWidth + 20) star.x = -10;
    if (star.x < -20) star.x = window.innerWidth + 10;
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${0.25 + Math.sin(star.twinkle + timestamp / 1200) * 0.18})`;
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

function onPointerMove(event) {
  if (Math.random() > 0.65) {
    state.particles.push({
      x: event.clientX,
      y: event.clientY,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.35 - Math.random() * 0.35,
      life: 1,
      size: 2 + Math.random() * 3,
      color: Math.random() > 0.5 ? "#ff7eb9" : "#ffd98e",
    });
  }
}

function updateParticles(delta) {
  state.particles = state.particles
    .map((particle) => ({
      ...particle,
      x: particle.x + particle.vx * (delta * 60),
      y: particle.y + particle.vy * (delta * 60),
      life: particle.life - delta * 0.7,
    }))
    .filter((particle) => particle.life > 0);
}

function drawParticles(ctx) {
  state.particles.forEach((particle) => {
    ctx.save();
    ctx.globalAlpha = Math.max(0, particle.life);
    ctx.shadowColor = particle.color;
    ctx.shadowBlur = 18;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

function burstConfetti(x, y, amount = 36) {
  for (let index = 0; index < amount; index += 1) {
    state.particles.push({
      x,
      y,
      vx: Math.cos((Math.PI * 2 * index) / amount) * (1.2 + Math.random() * 3),
      vy: Math.sin((Math.PI * 2 * index) / amount) * (1.2 + Math.random() * 3),
      life: 1.8,
      size: 2 + Math.random() * 3.5,
      color: palette[index % palette.length],
    });
  }
}

function launchFireworks(amount = 5) {
  for (let index = 0; index < amount; index += 1) {
    state.fireworks.push({
      x: window.innerWidth * (0.15 + Math.random() * 0.7),
      y: window.innerHeight * (0.18 + Math.random() * 0.28),
      radius: 0,
      maxRadius: 60 + Math.random() * 80,
      life: 1,
      hue: Math.random() > 0.5 ? 320 : 45,
    });
  }
}

function drawFireworks(ctx, delta) {
  if (Math.random() < 0.004) launchFireworks(1);
  state.fireworks = state.fireworks
    .map((burst) => ({
      ...burst,
      radius: burst.radius + delta * 160,
      life: burst.life - delta * 0.48,
    }))
    .filter((burst) => burst.life > 0);

  state.fireworks.forEach((burst) => {
    const alpha = Math.max(0, burst.life);
    ctx.save();
    ctx.globalAlpha = alpha;
    const gradient = ctx.createRadialGradient(burst.x, burst.y, 0, burst.x, burst.y, burst.maxRadius);
    gradient.addColorStop(0, `hsla(${burst.hue}, 100%, 88%, 0.95)`);
    gradient.addColorStop(1, `hsla(${burst.hue}, 100%, 60%, 0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(burst.x, burst.y, burst.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

function spawnLanterns(amount = 6) {
  for (let index = 0; index < amount; index += 1) {
    state.lanterns.push({
      x: window.innerWidth * (0.1 + Math.random() * 0.8),
      y: window.innerHeight + 30 + index * 20,
      size: 18 + Math.random() * 18,
      speed: 14 + Math.random() * 18,
      sway: Math.random() * Math.PI * 2,
      life: 1,
    });
  }
}

function drawLanterns(ctx, delta) {
  state.lanterns = state.lanterns
    .map((lantern) => ({
      ...lantern,
      y: lantern.y - lantern.speed * delta,
      sway: lantern.sway + delta * 1.2,
      life: lantern.life - delta * 0.08,
    }))
    .filter((lantern) => lantern.life > 0 && lantern.y > -80);

  state.lanterns.forEach((lantern) => {
    ctx.save();
    ctx.globalAlpha = Math.max(0, lantern.life * 0.6);
    ctx.translate(lantern.x + Math.sin(lantern.sway) * 24, lantern.y);
    ctx.shadowBlur = 24;
    ctx.shadowColor = "rgba(255, 217, 142, 0.8)";
    ctx.fillStyle = "rgba(255, 217, 142, 0.72)";
    ctx.beginPath();
    ctx.ellipse(0, 0, lantern.size * 0.8, lantern.size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath();
    ctx.ellipse(0, -lantern.size * 0.14, lantern.size * 0.16, lantern.size * 0.24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

function drawVisualizer() {
  const canvas = $("#visualizer");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);

  if (state.analyser) {
    const data = new Uint8Array(state.analyser.frequencyBinCount);
    state.analyser.getByteFrequencyData(data);
    const barWidth = (width / data.length) * 1.8;
    data.forEach((value, index) => {
      const barHeight = (value / 255) * (height * 0.9);
      const x = index * barWidth * 1.15;
      const y = height - barHeight;
      const hue = 290 + (index % 24) * 1.2;
      ctx.fillStyle = `hsla(${hue}, 96%, 68%, 0.88)`;
      ctx.fillRect(x, y, Math.max(1, barWidth), barHeight);
    });
  } else {
    const pulse = (Math.sin(performance.now() / 300) + 1) / 2;
    for (let index = 0; index < 22; index += 1) {
      const barHeight = height * (0.12 + ((index % 5) / 8) + pulse * 0.24);
      const x = index * 24 + 12;
      const y = height - barHeight;
      ctx.fillStyle = `rgba(255, 126, 185, ${0.26 + pulse * 0.5})`;
      ctx.fillRect(x, y, 14, barHeight);
    }
  }

  requestAnimationFrame(drawVisualizer);
}

function onScrollEffects() {
  $("#hero").style.setProperty("transform", `translateY(${window.scrollY * 0.03}px)`);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function downloadCertificateAsImage() {
  const width = 1400;
  const height = 900;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#231233"/>
          <stop offset="100%" stop-color="#0e0918"/>
        </linearGradient>
        <linearGradient id="accent" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#ff7eb9"/>
          <stop offset="50%" stop-color="#b49cff"/>
          <stop offset="100%" stop-color="#ffd98e"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" rx="48" fill="url(#bg)"/>
      <rect x="52" y="52" width="1296" height="796" rx="34" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.24)"/>
      <circle cx="1210" cy="130" r="64" fill="url(#accent)" opacity="0.95"/>
      <text x="700" y="170" text-anchor="middle" fill="#ffd98e" font-size="34" letter-spacing="8" font-family="Georgia, serif">OFFICIAL CERTIFICATE</text>
      <text x="700" y="270" text-anchor="middle" fill="#f6efff" font-size="72" font-family="Georgia, serif">Officially Certified Amazing Human</text>
      <text x="700" y="360" text-anchor="middle" fill="#ff7eb9" font-size="30" letter-spacing="3" font-family="Avenir Next, Segoe UI, sans-serif">This certifies that</text>
      <text x="700" y="450" text-anchor="middle" fill="#ffd98e" font-size="88" font-family="Georgia, serif">${friendName}</text>
      <text x="700" y="540" text-anchor="middle" fill="#f6efff" font-size="32" font-family="Avenir Next, Segoe UI, sans-serif">is an excellent friend, a lovely human, and a bright part of the world.</text>
      <line x1="280" y1="710" x2="560" y2="710" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
      <line x1="840" y1="710" x2="1120" y2="710" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
      <text x="420" y="750" text-anchor="middle" fill="#b49cff" font-size="24" font-family="Avenir Next, Segoe UI, sans-serif">Birthday Committee</text>
      <text x="980" y="750" text-anchor="middle" fill="#b49cff" font-size="24" font-family="Avenir Next, Segoe UI, sans-serif">Digital Best Friend Council</text>
      <text x="700" y="820" text-anchor="middle" fill="#ffd98e" font-size="22" font-family="Avenir Next, Segoe UI, sans-serif">Awarded with appreciation and birthday joy</text>
    </svg>
  `;

  const image = new Image();
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    URL.revokeObjectURL(url);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "friendship-certificate.png";
    link.click();
    showToast("Certificate downloaded as an image.");
  };

  image.src = url;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value) {
  return escapeHTML(value).replaceAll("\n", " ");
}