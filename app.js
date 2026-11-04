/**
 * TOON CINEMA STUDIO PRO (DYNAMIC ON-THE-SPOT CARTOON CHARACTER ENGINE)
 * AI Character Image Generation (e.g., Elephant & Rat), Real-Time Lip-Sync, and Multi-Track NLE Timeline
 */

// =====================================================
// PRELOADED HIGH-RES CLEAN SCENIC BACKDROPS (NO CHARACTERS)
// =====================================================
const storybookImages = [1, 2, 3, 4].map(idx => {
  const img = new Image();
  img.src = `assets/images/clean_scene_${idx}.jpg`;
  return img;
});

const gokulImages = [1, 2, 3, 4].map(idx => {
  const img = new Image();
  img.src = `assets/images/gokul_scene_${idx}.jpg`;
  return img;
});

const cinematicRamayanaImages = [1, 2, 3, 4].map(idx => {
  const img = new Image();
  img.src = `assets/images/cinematic_ramayana_scene_${idx}.jpg`;
  return img;
});

const ramayanaImages = [1, 2, 3, 4].map(idx => {
  const img = new Image();
  img.src = `assets/images/ramayana_scene_${idx}.jpg`;
  return img;
});

function detectStoryCategory(text, charA, charB) {
  const cNameA = ((charA && charA.name) || (state && state.charA && state.charA.name) || "").toLowerCase();
  const cNameB = ((charB && charB.name) || (state && state.charB && state.charB.name) || "").toLowerCase();
  const raw = ((text || "") + " " + ((state && state.storyTheme) || "") + " " + ((state && state.rawScript) || "") + " " + cNameA + " " + cNameB).toLowerCase();

  // 1. Shri Krishna / Gokul / Vrindavan
  if (raw.includes("कृष्ण") || raw.includes("krishna") ||
      raw.includes("कान्हा") || raw.includes("kanha") ||
      raw.includes("गोकुल") || raw.includes("gokul") ||
      raw.includes("वृंदावन") || raw.includes("vrindavan") ||
      raw.includes("माखन") || raw.includes("यशोदा") ||
      raw.includes("राधा") || raw.includes("radha") ||
      raw.includes("मथुरा") || raw.includes("mathura") ||
      raw.includes("यमुना") || raw.includes("yamuna") ||
      raw.includes("फल बेचने वाली") || raw.includes("बांसुरी") ||
      raw.includes("गोपिका") || raw.includes("गोपाल")) {
    return 'krishna';
  }

  // 2. Lord Ram / Hanuman / Ramayana
  if (raw.includes("हनुमान") || raw.includes("hanuman") ||
      raw.includes("बजरंग") || raw.includes("श्री राम") ||
      raw.includes("shri ram") || raw.includes("रामचंद्र") ||
      raw.includes("लक्ष्मण") || raw.includes("lakshman") ||
      raw.includes("सीता") || raw.includes("sita") ||
      raw.includes("रामायण") || raw.includes("किष्किन्धा") ||
      raw.includes("अयोध्या") || raw.includes("सुग्रीव") ||
      raw.includes("ऋष्यमूक") || raw.includes("रावण")) {
    return 'ramayana';
  }

  // 3. Royal Palace / King / Birbal
  if (raw.includes("राजा") || raw.includes("king") ||
      raw.includes("बीरबल") || raw.includes("birbal") ||
      raw.includes("अकबर") || raw.includes("akbar") ||
      raw.includes("महल") || raw.includes("दरबार")) {
    return 'royal';
  }

  // 4. Jungle Animal Fable
  if (raw.includes("शेर") || raw.includes("lion") ||
      raw.includes("हाथी") || raw.includes("elephant") ||
      raw.includes("चूहा") || raw.includes("mouse") ||
      raw.includes("बंदर") || raw.includes("monkey") ||
      raw.includes("मगरमच्छ") || raw.includes("crocodile") ||
      raw.includes("भालू") || raw.includes("bear") ||
      raw.includes("खरगोश") || raw.includes("rabbit")) {
    return 'animal';
  }

  return 'fairytale';
}

function isMythologicalStory(text, charA, charB) {
  const cat = detectStoryCategory(text, charA, charB);
  return cat === 'ramayana';
}

function isKrishnaStory(text, charA, charB) {
  const cat = detectStoryCategory(text, charA, charB);
  return cat === 'krishna';
}

function getThematicSceneImage(index) {
  const cat = detectStoryCategory(state.rawScript || state.storyTheme, state.charA, state.charB);
  const idx = (index || 0);
  if (cat === 'krishna') {
    return gokulImages[idx % gokulImages.length];
  } else if (cat === 'ramayana') {
    return cinematicRamayanaImages[idx % cinematicRamayanaImages.length];
  } else {
    return storybookImages[idx % storybookImages.length];
  }
}

function getThematicSceneUrl(index) {
  const cat = detectStoryCategory(state.rawScript || state.storyTheme, state.charA, state.charB);
  const idx = (index || 0);
  if (cat === 'krishna') {
    return `assets/images/gokul_scene_${(idx % gokulImages.length) + 1}.jpg`;
  } else if (cat === 'ramayana') {
    return `assets/images/cinematic_ramayana_scene_${(idx % cinematicRamayanaImages.length) + 1}.jpg`;
  } else {
    return `assets/images/clean_scene_${(idx % storybookImages.length) + 1}.jpg`;
  }
}

// =====================================================
// INDEPENDENT STORYBOOK ANIMATED CHARACTER SPRITES (TRANSPARENT PNG)
// =====================================================
const charSprites = {
  elephant: {
    img: new Image(),
    isLoaded: false
  },
  mouse: {
    img: new Image(),
    isLoaded: false
  },
  lion: {
    img: new Image(),
    isLoaded: false
  },
  monkey: {
    img: new Image(),
    isLoaded: false
  },
  hanuman: {
    img: new Image(),
    isLoaded: false
  },
  ram: {
    img: new Image(),
    isLoaded: false
  },
  krishna: {
    img: new Image(),
    isLoaded: false
  },
  sathi: {
    img: new Image(),
    isLoaded: false
  }
};

charSprites.elephant.img.src = 'assets/images/elephant_sprite.png';
charSprites.elephant.img.onload = () => {
  charSprites.elephant.isLoaded = true;
};

charSprites.mouse.img.src = 'assets/images/mouse_sprite.png';
charSprites.mouse.img.onload = () => {
  charSprites.mouse.isLoaded = true;
};

charSprites.lion.img.src = 'assets/images/lion_sprite.png';
charSprites.lion.img.onload = () => {
  charSprites.lion.isLoaded = true;
};

charSprites.monkey.img.src = 'assets/images/monkey_sprite.png';
charSprites.monkey.img.onload = () => {
  charSprites.monkey.isLoaded = true;
};

charSprites.hanuman.img.src = 'assets/images/hanuman_sprite.png';
charSprites.hanuman.img.onload = () => {
  charSprites.hanuman.isLoaded = true;
};

charSprites.ram.img.src = 'assets/images/ram_sprite.png';
charSprites.ram.img.onload = () => {
  charSprites.ram.isLoaded = true;
};

charSprites.krishna.img.src = 'assets/images/krishna_sprite.png';
charSprites.krishna.img.onload = () => {
  charSprites.krishna.isLoaded = true;
};

charSprites.sathi.img.src = 'assets/images/sathi_sprite.png';
charSprites.sathi.img.onload = () => {
  charSprites.sathi.isLoaded = true;
};

// Preloaded Style Specific Scenic Environments
const visualStyleImages = {
  children: [1, 2, 3, 4].map(idx => {
    const img = new Image();
    img.src = `assets/images/clean_scene_${idx}.jpg`;
    return img;
  }),
  storybook: [1, 2, 3, 4].map(idx => {
    const img = new Image();
    img.src = `assets/images/clean_scene_${idx}.jpg`;
    return img;
  }),
  '3d_animation': [1, 2, 3, 4].map(idx => {
    const img = new Image();
    img.src = `assets/images/clean_scene_${idx}.jpg`;
    return img;
  }),
  cinematic: [1].map(() => {
    const img = new Image();
    img.src = 'assets/images/cinematic_scene_1.jpg';
    return img;
  }),
  '2d_cartoon': [1].map(() => {
    const img = new Image();
    img.src = 'assets/images/cartoon_2d_scene_1.jpg';
    return img;
  }),
  anime: [1].map(() => {
    const img = new Image();
    img.src = 'assets/images/anime_scene_1.jpg';
    return img;
  })
};

// =====================================================
// GLOBAL STUDIO STATE
// =====================================================
const DEFAULT_ELEVEN_API_KEY = "";

const state = {
  targetDurationMinutes: 2,
  videoMode: 'landscape', // 'landscape' (1280x720 / 1920x1080), 'portrait' (1080x1920), 'square' (1080x1080)
  language: 'hi', // 'hi', 'en', 'hinglish', 'auto'
  genre: '3d_animation', // Default: 3D Animation (Disney / Pixar 3D Cinema Quality like Kling AI)
  targetAudience: 'family', // 'family', 'kids', 'children', 'teens', 'adults'
  voiceStyle: 'storyteller', // 'storyteller', 'animated', 'cinematic', 'friendly', 'conversational'
  camMode: 'dynamic', // 'dynamic', 'twoshot', 'chara', 'charb'
  stageEnv: 'forest',
  stageTime: 'golden_hour',
  voiceEngine: 'elevenlabs',
  elevenApiKey: '',

  // FX & Cinema Toggles (Kling AI / 3D Cinematic Animation Architecture)
  cinematicSceneMode: true, // Complete 3D animated scenes featuring characters in the environment
  show2dVectorRigs: false, // Disables flat 2D canvas puppet overlays so 3D cinema visuals stay pristine!
  cinematic3dMode: true,
  speechBubblesEnabled: false,
  particlesEnabled: true,
  shadowsEnabled: true,
  cameraSwayEnabled: true,

  // Screenplay & Scenes
  storyTheme: "एक शक्तिशाली दयालु शेर और एक नन्हा साहसी चतुर चूहा घने जंगल में मित्रता और साहस की अमर कहानी",
  rawScript: '',
  scenes: [],
  totalDuration: 0,
  currentSceneIndex: 0,

  // DYNAMIC DUAL CHARACTERS (Generated on the spot for ANY characters)
  charA: {
    name: "शेर",
    species: "lion",
    scale: 1.15,
    baseX: 340,
    baseY: 560,
    facing: 1, // facing right
    isSpeaking: false,
    mouthOpen: 0.05,
    targetMouthOpen: 0.05,
    blinkTimer: 0,
    isBlinking: false,
    imageElement: null,
    imageUrl: '',
    imageLoaded: false,
    color: "#f59e0b",
    outfitColor: "#b45309",
    skinColor: "#fef3c7",
    pitch: 0.9,
    rate: 0.95,
    voiceId: "pNInz6obpgDQGcFmaJgB" // Adam (deep resonant voice)
  },

  charB: {
    name: "चूहा",
    species: "rodent",
    scale: 0.85,
    baseX: 940,
    baseY: 560,
    facing: -1, // facing left
    isSpeaking: false,
    mouthOpen: 0.05,
    targetMouthOpen: 0.05,
    blinkTimer: 0,
    isBlinking: false,
    imageElement: null,
    imageUrl: '',
    imageLoaded: false,
    color: "#d97706",
    outfitColor: "#b45309",
    skinColor: "#fbcfe8",
    pitch: 1.25,
    rate: 1.05,
    voiceId: "TxGEqnHWrfWFTfGW9XjX" // Josh (youthful energetic voice)
  },

  narratorVoiceId: "21m00Tcm4TlvDq8ikWAM", // Rachel (calm warm storyteller)
  narratorPitch: 1.0,
  narratorRate: 0.98,
  localStorybookScenes: [
    "assets/images/clean_scene_1.jpg",
    "assets/images/clean_scene_2.jpg",
    "assets/images/clean_scene_3.jpg",
    "assets/images/clean_scene_4.jpg"
  ],

  // Background Scenery Image
  backgroundImg: null,
  backgroundUrl: '',

  // Playback & Web Audio
  isPlaying: false,
  currentTime: 0,
  animationFrameId: null,
  lastFrameTimestamp: 0,
  isMuted: false,
  bgMusicEnabled: true,
  bgMusicVolume: 0.15,

  audioContext: null,
  analyserNode: null,
  audioDataArray: null,
  currentSpeechVolume: 0,
  bgOscillator: null,
  bgGainNode: null,
  bgMusicAudio: null,
  bgSourceNode: null,
  activeAudioElement: null,
  audioCache: {},

  // Atmospheric Particles
  particles: []
};

// =====================================================
// DOM ELEMENT REFERENCES
// =====================================================
const DOM = {
  storyThemeInput: document.getElementById('story-theme-input'),
  btnCreateFromTheme: document.getElementById('btn-create-from-theme'),
  comboChips: document.querySelectorAll('.combo-chip'),

  durPills: document.querySelectorAll('.dur-pill'),
  customDurationBox: document.getElementById('custom-duration-box'),
  customMinutesInput: document.getElementById('custom-minutes-input'),
  estScenesBadge: document.getElementById('est-scenes-badge'),
  autoExpandDurationText: document.getElementById('auto-expand-duration-text'),

  deckTabs: document.querySelectorAll('.deck-tab'),
  camModeButtons: document.querySelectorAll('.btn-mode-pill'),
  camActiveBadge: document.getElementById('cam-active-badge'),

  videoModeSelect: document.getElementById('video-mode-select'),
  storyLangSelect: document.getElementById('story-lang-select'),
  storyGenreSelect: document.getElementById('story-genre-select'),
  stageEnvSelect: document.getElementById('stage-env-select'),
  stageTimeSelect: document.getElementById('stage-time-select'),
  voiceEngineSelect: document.getElementById('voice-engine-select'),
  elevenlabsKey: document.getElementById('elevenlabs-key'),
  elevenlabsVoiceId: document.getElementById('elevenlabs-voice-id'),
  elevenlabsVoiceBId: document.getElementById('elevenlabs-voice-b-id'),
  elevenlabsNarratorId: document.getElementById('elevenlabs-narrator-id'),
  elevenlabsConfigBox: document.getElementById('elevenlabs-config-box'),

  bgMusicToggle: document.getElementById('bg-music-toggle'),
  bgMusicVolume: document.getElementById('bg-music-volume'),
  volumeLabel: document.getElementById('volume-label'),

  toggleSpeechBubbles: document.getElementById('toggle-speech-bubbles'),
  toggleParticles: document.getElementById('toggle-particles'),
  toggleCharacterShadows: document.getElementById('toggle-character-shadows'),
  toggleCameraSway: document.getElementById('toggle-camera-sway'),

  storyInput: document.getElementById('story-input'),
  btnLoadPreset: document.getElementById('btn-load-preset'),
  btnAutoExpand: document.getElementById('btn-auto-expand'),
  characterCount: document.getElementById('character-count'),
  btnAnalyzeScenes: document.getElementById('btn-analyze-scenes'),
  btnClearScript: document.getElementById('btn-clear-script'),

  btnGenerate: document.getElementById('btn-generate'),
  btnReset: document.getElementById('btn-reset'),

  storyboardScenesScroller: document.getElementById('storyboard-scenes-scroller'),
  storyboardFullList: document.getElementById('storyboard-full-list'),
  sbCountBadge: document.getElementById('sb-count-badge'),

  // Character Rig Inputs
  charAName: document.getElementById('char-a-name'),
  charAType: document.getElementById('char-a-type'),
  charAHair: document.getElementById('char-a-hair'),
  charAHairColor: document.getElementById('char-a-hair-color'),
  charAOutfitColor: document.getElementById('char-a-outfit-color'),
  charASkinColor: document.getElementById('char-a-skin-color'),
  charAPreviewCanvas: document.getElementById('char-a-preview-canvas'),
  btnTestTalkA: document.getElementById('btn-test-talk-a'),

  charBName: document.getElementById('char-b-name'),
  charBType: document.getElementById('char-b-type'),
  charBHair: document.getElementById('char-b-hair'),
  charBHairColor: document.getElementById('char-b-hair-color'),
  charBOutfitColor: document.getElementById('char-b-outfit-color'),
  charBSkinColor: document.getElementById('char-b-skin-color'),
  charBPreviewCanvas: document.getElementById('char-b-preview-canvas'),
  btnTestTalkB: document.getElementById('btn-test-talk-b'),

  // Stage & Viewport
  canvasContainer: document.getElementById('canvas-container'),
  canvas: document.getElementById('cinema-canvas'),
  viewportOverlay: document.getElementById('viewport-overlay'),
  overlayPlayBtn: document.getElementById('overlay-play-btn'),
  emptyPlaceholder: document.getElementById('empty-placeholder'),
  cinematicHud: document.getElementById('cinematic-hud'),
  hudSceneIdx: document.getElementById('hud-scene-idx'),
  hudTimer: document.getElementById('hud-timer'),
  viewportAspectIndicator: document.getElementById('viewport-aspect-indicator'),

  speakerAIndicator: document.getElementById('speaker-a-indicator'),
  speakerBIndicator: document.getElementById('speaker-b-indicator'),
  labelSpeakerA: document.getElementById('label-speaker-a'),
  labelSpeakerB: document.getElementById('label-speaker-b'),

  // NLE Timeline
  timelineSlider: document.getElementById('timeline-slider'),
  currentTime: document.getElementById('current-time'),
  durationTime: document.getElementById('duration-time'),
  btnPlayPause: document.getElementById('btn-play-pause'),
  playPauseIcon: document.getElementById('play-pause-icon'),
  btnStop: document.getElementById('btn-stop'),
  btnPrevScene: document.getElementById('btn-prev-scene'),
  btnNextScene: document.getElementById('btn-next-scene'),
  btnMute: document.getElementById('btn-mute'),
  muteIcon: document.getElementById('mute-icon'),
  btnFullscreen: document.getElementById('btn-fullscreen'),

  trackLaneScenes: document.getElementById('track-lane-scenes'),
  trackLaneCharA: document.getElementById('track-lane-chara'),
  trackLaneCharB: document.getElementById('track-lane-charb'),
  trackLabelCharA: document.getElementById('track-label-chara'),
  trackLabelCharB: document.getElementById('track-label-charb'),

  // 5-Step Autonomous Pipeline & Export
  progressContainer: document.getElementById('progress-container'),
  progressStatus: document.getElementById('progress-status'),
  progressPercent: document.getElementById('progress-percent'),
  progressBarFill: document.getElementById('progress-bar-fill'),
  step1Script: document.getElementById('step-1-script'),
  step2Scenes: document.getElementById('step-2-scenes'),
  step3Visuals: document.getElementById('step-3-visuals'),
  step4Audio: document.getElementById('step-4-audio'),
  step5Video: document.getElementById('step-5-video'),

  exportBanner: document.getElementById('export-banner'),
  exportMetaText: document.getElementById('export-meta-text'),
  btnDownloadVideo: document.getElementById('btn-download-video'),
  btnDownloadSubtitles: document.getElementById('btn-download-subtitles'),
  btnDownloadScript: document.getElementById('btn-download-script'),
  sceneReelCards: document.getElementById('scene-reel-cards'),

  btnSaveProject: document.getElementById('btn-save-project'),
  btnLoadProjectTrigger: document.getElementById('btn-load-project-trigger'),
  projectFileInput: document.getElementById('project-file-input'),

  // New Workflow Elements
  storyAudienceSelect: document.getElementById('story-audience-select'),
  voiceStyleSelect: document.getElementById('voice-style-select'),
  durationQuickDropdown: document.getElementById('duration-quick-dropdown'),
  btnDownloadShorts: document.getElementById('btn-download-shorts'),
  btnCopyYoutubeDesc: document.getElementById('btn-copy-youtube-desc'),
  btnAddNewScene: document.getElementById('btn-add-new-scene'),
  btnRebalanceTiming: document.getElementById('btn-rebalance-timing'),
  btnSyncToScript: document.getElementById('btn-sync-to-script')
};

const ctx = DOM.canvas.getContext('2d');
const previewCtxA = DOM.charAPreviewCanvas ? DOM.charAPreviewCanvas.getContext('2d') : null;
const previewCtxB = DOM.charBPreviewCanvas ? DOM.charBPreviewCanvas.getContext('2d') : null;

// =====================================================
// INITIALIZATION
// =====================================================
function initStudio() {
  setupEventListeners();
  updateEstimatedScenes();
  initAtmosphericParticles();

  // Step 1 starts completely clean & blank so the user can enter their own story
  if (DOM.storyInput) {
    DOM.storyInput.value = "";
  }
  updateTextStats();

  // Configure ElevenLabs Voice AI and 3D Pixar Animation Mode by default
  state.genre = '3d_animation';
  state.cinematicSceneMode = true;
  state.show2dVectorRigs = false;

  if (DOM.elevenlabsKey) DOM.elevenlabsKey.value = '';
  if (DOM.voiceEngineSelect) DOM.voiceEngineSelect.value = 'elevenlabs';
  if (DOM.storyGenreSelect) DOM.storyGenreSelect.value = '3d_animation';
  const vBadge = document.getElementById('visual-style-badge');
  if (vBadge) vBadge.textContent = '🌟 3D Pixar Cinema';

  if (DOM.emptyPlaceholder) DOM.emptyPlaceholder.style.display = 'flex';
  if (DOM.cinematicHud) DOM.cinematicHud.style.display = 'none';
  if (DOM.exportBanner) DOM.exportBanner.style.display = 'none';
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStudio);
} else {
  initStudio();
}

function initAtmosphericParticles() {
  state.particles = [];
  for (let i = 0; i < 40; i++) {
    state.particles.push({
      x: Math.random() * 1280,
      y: Math.random() * 720,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.4) * 0.6,
      speedY: -(Math.random() * 0.4 + 0.15),
      alpha: Math.random() * 0.6 + 0.2,
      phase: Math.random() * Math.PI * 2
    });
  }
}

// =====================================================
// EVENT LISTENERS
// =====================================================
function setupEventListeners() {
  // Voice Synthesis Engine Change
  if (DOM.voiceEngineSelect) {
    DOM.voiceEngineSelect.addEventListener('change', (e) => {
      state.voiceEngine = e.target.value;
      if (DOM.elevenlabsConfigBox) {
        DOM.elevenlabsConfigBox.style.display = (e.target.value === 'elevenlabs') ? 'block' : 'none';
      }
    });
  }

  // Pre-warm Speech Synthesis on user pointer interaction
  const unlockAudioGesture = () => {
    warmUpSpeechEngine();
    initAudioContext();
  };
  window.addEventListener('pointerdown', unlockAudioGesture, { once: true });
  window.addEventListener('keydown', unlockAudioGesture, { once: true });

  // Language Selector Change
  if (DOM.storyLangSelect) {
    DOM.storyLangSelect.addEventListener('change', (e) => {
      state.language = e.target.value;
      const scriptText = DOM.storyInput ? DOM.storyInput.value.trim() : "";
      if (scriptText) {
        vidoNovaProcessScript(scriptText, state.targetDurationMinutes);
      }
    });
  }

  // Step 3: Visual Style change
  if (DOM.storyGenreSelect) {
    DOM.storyGenreSelect.addEventListener('change', (e) => {
      state.genre = e.target.value;
      const badge = document.getElementById('visual-style-badge');
      if (badge) {
        const labels = {
          'children': "Storybook Watercolor",
          '3d_animation': "Disney/Pixar 3D",
          'cinematic': "Cinematic Dramatic",
          '2d_cartoon': "2D Cel Cartoon",
          'anime': "Anime Inspired"
        };
        badge.textContent = labels[state.genre] || "Fairytale Art";
      }
      const scriptText = DOM.storyInput ? DOM.storyInput.value.trim() : "";
      if (scriptText) {
        vidoNovaProcessScript(scriptText, state.targetDurationMinutes);
      }
    });
  }

  // Step 4: Aspect Ratio change (YouTube 16:9, Shorts 9:16, Square 1:1)
  if (DOM.videoModeSelect) {
    DOM.videoModeSelect.addEventListener('change', (e) => {
      state.videoMode = e.target.value;
      if (state.videoMode === 'portrait') {
        DOM.canvasContainer.className = 'canvas-container portrait-mode';
        DOM.canvas.width = 720;
        DOM.canvas.height = 1280;
        if (DOM.viewportAspectIndicator) DOM.viewportAspectIndicator.textContent = '9:16 Shorts Stage';
      } else if (state.videoMode === 'square') {
        DOM.canvasContainer.className = 'canvas-container square-mode';
        DOM.canvas.width = 720;
        DOM.canvas.height = 720;
        if (DOM.viewportAspectIndicator) DOM.viewportAspectIndicator.textContent = '1:1 Square Stage';
      } else {
        DOM.canvasContainer.className = 'canvas-container landscape-mode';
        DOM.canvas.width = 1280;
        DOM.canvas.height = 720;
        if (DOM.viewportAspectIndicator) DOM.viewportAspectIndicator.textContent = '16:9 Cinema Stage';
      }
      if (state.scenes.length > 0) renderFrame(state.currentTime);
    });
  }

  // Step 4: Target Audience change
  if (DOM.storyAudienceSelect) {
    DOM.storyAudienceSelect.addEventListener('change', (e) => {
      state.targetAudience = e.target.value;
      const scriptText = DOM.storyInput ? DOM.storyInput.value.trim() : "";
      if (scriptText) {
        vidoNovaProcessScript(scriptText, state.targetDurationMinutes);
      }
    });
  }

  // Step 4: Voice Style change
  if (DOM.voiceStyleSelect) {
    DOM.voiceStyleSelect.addEventListener('change', (e) => {
      state.voiceStyle = e.target.value;
    });
  }

  // Step 4: Duration Quick Dropdown change
  if (DOM.durationQuickDropdown) {
    DOM.durationQuickDropdown.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'custom') {
        DOM.customDurationBox.style.display = 'flex';
        state.targetDurationMinutes = parseFloat(DOM.customMinutesInput.value) || 3;
      } else {
        DOM.customDurationBox.style.display = 'none';
        state.targetDurationMinutes = parseFloat(val);
      }
      DOM.durPills.forEach(p => {
        p.classList.toggle('active', p.dataset.minutes === val);
      });
      updateEstimatedScenes();
      const scriptText = DOM.storyInput ? DOM.storyInput.value.trim() : "";
      if (scriptText) {
        vidoNovaProcessScript(scriptText, state.targetDurationMinutes);
      }
    });
  }

  // Theme & Character Prompt Generate Button (Legacy support)
  if (DOM.btnCreateFromTheme) {
    DOM.btnCreateFromTheme.addEventListener('click', () => {
      const promptText = (DOM.storyThemeInput && DOM.storyThemeInput.value.trim()) || (DOM.storyInput && DOM.storyInput.value.trim());
      if (!promptText) return;
      vidoNovaProcessScript(promptText, state.targetDurationMinutes);
    });
  }

  // Cleaned preset listeners (Step 1 user input driven)

  // Deck Tabs Switching
  DOM.deckTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      DOM.deckTabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.deck-tab-pane').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(`pane-${tab.dataset.tab}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Camera Mode Director Buttons
  DOM.camModeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.camModeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.camMode = btn.dataset.camMode;
      DOM.camActiveBadge.textContent = `Cam: ${btn.textContent.replace('🎥 ', '').replace('👥 ', '').replace('👤 ', '')}`;
      if (state.scenes.length > 0) renderFrame(state.currentTime);
    });
  });

  // Duration Selection Pills (30s, 1m, 2m, 3m, 5m, 10m, Custom)
  DOM.durPills.forEach(pill => {
    pill.addEventListener('click', () => {
      DOM.durPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const val = pill.dataset.minutes;
      if (DOM.durationQuickDropdown) {
        DOM.durationQuickDropdown.value = val;
      }
      if (val === 'custom') {
        DOM.customDurationBox.style.display = 'flex';
        state.targetDurationMinutes = parseFloat(DOM.customMinutesInput.value) || 3;
      } else {
        DOM.customDurationBox.style.display = 'none';
        state.targetDurationMinutes = parseFloat(val);
      }
      updateEstimatedScenes();

      // Automatically re-adapt the current script & dialogues for the new time limit!
      const scriptText = DOM.storyInput ? DOM.storyInput.value.trim() : "";
      if (scriptText) {
        vidoNovaProcessScript(scriptText, state.targetDurationMinutes);
      }
    });
  });

  DOM.customMinutesInput.addEventListener('input', (e) => {
    state.targetDurationMinutes = Math.max(0.5, parseFloat(e.target.value) || 1);
    updateEstimatedScenes();
    const scriptText = DOM.storyInput ? DOM.storyInput.value.trim() : "";
    if (scriptText) {
      vidoNovaProcessScript(scriptText, state.targetDurationMinutes);
    }
  });

  // Stage & Scenery selectors
  DOM.stageEnvSelect.addEventListener('change', (e) => {
    state.stageEnv = e.target.value;
    if (state.scenes.length > 0) renderFrame(state.currentTime);
  });

  DOM.stageTimeSelect.addEventListener('change', (e) => {
    state.stageTime = e.target.value;
    if (state.scenes.length > 0) renderFrame(state.currentTime);
  });

  // FX Toggles
  DOM.toggleSpeechBubbles.addEventListener('change', (e) => { state.speechBubblesEnabled = e.target.checked; });
  DOM.toggleParticles.addEventListener('change', (e) => { state.particlesEnabled = e.target.checked; });
  DOM.toggleCharacterShadows.addEventListener('change', (e) => { state.shadowsEnabled = e.target.checked; });
  DOM.toggleCameraSway.addEventListener('change', (e) => { state.cameraSwayEnabled = e.target.checked; });

  // Music controls
  DOM.bgMusicToggle.addEventListener('change', (e) => {
    state.bgMusicEnabled = e.target.checked;
    if (state.isPlaying) {
      if (state.bgMusicEnabled) startBackgroundSynth();
      else stopBackgroundSynth();
    }
  });

  DOM.bgMusicVolume.addEventListener('input', (e) => {
    state.bgMusicVolume = parseFloat(e.target.value);
    DOM.volumeLabel.textContent = `Vol: ${Math.round(state.bgMusicVolume * 100)}%`;
    if (state.bgGainNode && state.audioContext) {
      state.bgGainNode.gain.setValueAtTime(state.bgMusicVolume, state.audioContext.currentTime);
    }
  });

  // Character customizer input updates
  DOM.charAName.addEventListener('input', (e) => {
    state.charA.name = e.target.value || "Character A";
    state.charA.species = getCharacterArchetype(state.charA.name);
    DOM.charAType.value = state.charA.species;
    DOM.trackLabelCharA.textContent = state.charA.name.toUpperCase();
    DOM.labelSpeakerA.textContent = `${state.charA.name} (Listening)`;
    renderCharacterPreviews();
    renderFrame(state.currentTime);
  });

  DOM.charBName.addEventListener('input', (e) => {
    state.charB.name = e.target.value || "Character B";
    state.charB.species = getCharacterArchetype(state.charB.name);
    DOM.charBType.value = state.charB.species;
    DOM.trackLabelCharB.textContent = state.charB.name.toUpperCase();
    DOM.labelSpeakerB.textContent = `${state.charB.name} (Listening)`;
    renderCharacterPreviews();
    renderFrame(state.currentTime);
  });

  DOM.charAType.addEventListener('change', (e) => {
    state.charA.species = e.target.value;
    state.charA.scale = getArchetypeScale(e.target.value);
    const colors = getArchetypeColors(e.target.value);
    state.charA.color = colors.primary;
    state.charA.outfitColor = colors.outfit;
    state.charA.skinColor = colors.skin;
    DOM.charAOutfitColor.value = colors.outfit;
    DOM.charASkinColor.value = colors.skin;
    renderCharacterPreviews();
    renderFrame(state.currentTime);
  });

  DOM.charBType.addEventListener('change', (e) => {
    state.charB.species = e.target.value;
    state.charB.scale = getArchetypeScale(e.target.value);
    const colors = getArchetypeColors(e.target.value);
    state.charB.color = colors.primary;
    state.charB.outfitColor = colors.outfit;
    state.charB.skinColor = colors.skin;
    DOM.charBOutfitColor.value = colors.outfit;
    DOM.charBSkinColor.value = colors.skin;
    renderCharacterPreviews();
    renderFrame(state.currentTime);
  });

  DOM.charAOutfitColor.addEventListener('input', (e) => {
    state.charA.outfitColor = e.target.value;
    renderCharacterPreviews();
    renderFrame(state.currentTime);
  });

  DOM.charASkinColor.addEventListener('input', (e) => {
    state.charA.skinColor = e.target.value;
    renderCharacterPreviews();
    renderFrame(state.currentTime);
  });

  DOM.charBOutfitColor.addEventListener('input', (e) => {
    state.charB.outfitColor = e.target.value;
    renderCharacterPreviews();
    renderFrame(state.currentTime);
  });

  DOM.charBSkinColor.addEventListener('input', (e) => {
    state.charB.skinColor = e.target.value;
    renderCharacterPreviews();
    renderFrame(state.currentTime);
  });

  DOM.btnTestTalkA.addEventListener('click', () => {
    triggerTestTalk(state.charA, `Hello! I am ${state.charA.name}. I am ready to talk on stage!`);
  });

  DOM.btnTestTalkB.addEventListener('click', () => {
    triggerTestTalk(state.charB, `And I am ${state.charB.name}! My dialogues will synchronize with my voice.`);
  });

  // Script text input
  DOM.storyInput.addEventListener('input', updateTextStats);

  DOM.btnClearScript.addEventListener('click', () => {
    DOM.storyInput.value = "";
    updateTextStats();
  });

  DOM.btnAutoExpand.addEventListener('click', handleAutoExpandScreenplay);

  DOM.btnAnalyzeScenes.addEventListener('click', () => {
    parseScreenplayText(DOM.storyInput.value);
  });

  // Generation & Playback
  DOM.btnGenerate.addEventListener('click', startFullGenerationPipeline);
  DOM.btnReset.addEventListener('click', resetStudio);

  DOM.btnPlayPause.addEventListener('click', togglePlayPause);
  DOM.overlayPlayBtn.addEventListener('click', togglePlayPause);
  DOM.btnStop.addEventListener('click', stopPlayback);
  DOM.btnPrevScene.addEventListener('click', jumpToPrevScene);
  DOM.btnNextScene.addEventListener('click', jumpToNextScene);
  DOM.btnMute.addEventListener('click', toggleMute);

  DOM.timelineSlider.addEventListener('input', (e) => {
    const targetPercent = parseFloat(e.target.value);
    const targetTime = (targetPercent / 100) * state.totalDuration;
    seekTo(targetTime);
  });

  DOM.btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      DOM.canvasContainer.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen();
    }
  });

  // Exports (Step 9)
  if (DOM.btnDownloadVideo) DOM.btnDownloadVideo.addEventListener('click', () => downloadVideo(false));
  if (DOM.btnDownloadShorts) DOM.btnDownloadShorts.addEventListener('click', () => downloadVideo(true));
  if (DOM.btnCopyYoutubeDesc) DOM.btnCopyYoutubeDesc.addEventListener('click', copyYouTubeMetadata);
  if (DOM.btnDownloadSubtitles) DOM.btnDownloadSubtitles.addEventListener('click', downloadSubtitles);
  if (DOM.btnDownloadScript) DOM.btnDownloadScript.addEventListener('click', downloadScreenplayScript);

  // Storyboard Toolbar (Step 8)
  if (DOM.btnAddNewScene) DOM.btnAddNewScene.addEventListener('click', addNewScene);
  if (DOM.btnRebalanceTiming) DOM.btnRebalanceTiming.addEventListener('click', rebalanceSceneTiming);
  if (DOM.btnSyncToScript) DOM.btnSyncToScript.addEventListener('click', syncScreenplayFromStoryboard);

  DOM.btnSaveProject.addEventListener('click', saveProjectToFile);
  DOM.btnLoadProjectTrigger.addEventListener('click', () => DOM.projectFileInput.click());
  DOM.projectFileInput.addEventListener('change', loadProjectFromFile);
}

function updateEstimatedScenes() {
  const targetSeconds = state.targetDurationMinutes * 60;
  const estCount = Math.round(targetSeconds / 6.5);
  DOM.estScenesBadge.textContent = `~${estCount} Scenes (${state.targetDurationMinutes}m)`;
  DOM.autoExpandDurationText.textContent = `${state.targetDurationMinutes} Minutes`;
}

// =====================================================
// DYNAMIC PROMPT EXTRACTION & CHARACTER INITIALIZATION (ON-THE-SPOT)
// =====================================================
function detectLanguage(promptText) {
  const selected = DOM.storyLangSelect ? DOM.storyLangSelect.value : 'auto';
  if (selected && selected !== 'auto') {
    return selected;
  }
  const text = (promptText || "").trim();
  if (!text) return 'en';

  // Check for Devanagari Unicode script range (U+0900 to U+097F)
  if (/[\u0900-\u097F]/.test(text)) {
    return 'hi';
  }

  // Check for romanized conversational Hindi / Hinglish keywords
  const hinglishKeywords = /\b(aur|kya|hai|tha|thi|the|bhi|ka|ki|ke|ko|se|me|mein|par|toh|yaar|sher|hathi|chuha|jungle|dost|dosti|baat|bhai|batao|karo|raha|rahi|rahe|chal|chalo|bol)\b/i;
  if (hinglishKeywords.test(text)) {
    return 'hinglish';
  }

  return 'en';
}

function handleDynamicPromptCreation(promptText) {
  const text = (promptText || DOM.storyThemeInput.value || "").trim();
  if (!text) return;

  const detectedLang = detectLanguage(text);
  state.language = detectedLang;
  if (DOM.storyLangSelect && DOM.storyLangSelect.value === 'auto') {
    // Keep 'auto' selected in dropdown so user knows it's auto-detected
  }

  const { char1, char2, setting } = extractCharactersAndSetting(text);

  if (setting && DOM.stageEnvSelect) {
    DOM.stageEnvSelect.value = setting;
    state.stageEnv = setting;
  }

  initStoryFromPrompt(char1, char2, text, setting);
}

function extractCharactersAndSetting(promptText) {
  let char1 = "हाथी";
  let char2 = "चूहा";
  let setting = "savannah";

  const text = (promptText || "").trim();
  if (!text) return { char1, char2, setting };

  const lower = text.toLowerCase();
  const isHindi = /[\u0900-\u097F]/.test(text);

  // 1. Detect Setting from environment keywords (English & Hindi)
  if (lower.match(/\b(gokul|vrindavan|mathura|yamuna)\b/) || /गोकुल|वृंदावन|मथुरा|यमुना/.test(text)) setting = "gokul";
  else if (lower.match(/\b(village|rural|cottage|market|bazaar)\b/) || /गांव|गाँव|बाज़ार|हाट|कुटीर|बस्ती/.test(text)) setting = "village";
  else if (lower.match(/\b(ayodhya|kishkindha|ashram)\b/) || /अयोध्या|किष्किन्धा|आश्रम|तपोवन/.test(text)) setting = "forest";
  else if (lower.match(/\b(space|mars|starship|spaceship|orbit|galaxy|asteroid|station|planet|cosmos)\b/) || /अंतरिक्ष|ग्रह|तारे|सितारे|उपग्रह/.test(text)) setting = "spaceship";
  else if (lower.match(/\b(cyber|tokyo|neon|hacker|synth|future|blade|city|cyberpunk)\b/) || /साइबर|शहर|नगर|रोबोट/.test(text)) setting = "cybercity";
  else if (lower.match(/\b(forest|woods|tree|grove|jungle|fae|enchanted|nature|wildwood)\b/) || /जंगल|वन|पेड़|झाड़ी/.test(text)) setting = "forest";
  else if (lower.match(/\b(castle|dungeon|tower|kingdom|palace|medieval|fortress|keep)\b/) || /किला|महल|राजमहल|दुर्ग/.test(text)) setting = "castle";
  else if (lower.match(/\b(ocean|sea|underwater|reef|coral|submarine|deep|fish|water)\b/) || /समुद्र|सागर|नदी|झील|जल/.test(text)) setting = "ocean";
  else if (lower.match(/\b(snow|ice|arctic|mountain|himalaya|winter|cliff|cold|glacier)\b/) || /पहाड़|पर्वत|बर्फ|हिमालय/.test(text)) setting = "himalayas";
  else if (lower.match(/\b(cave|cavern|underground|crystal|grotto|mine)\b/) || /गुफा|खदान/.test(text)) setting = "cave";
  else if (lower.match(/\b(desert|sand|dune|sahara|pyramid|oasis)\b/) || /रेगिस्तान|मरुस्थल|रेत/.test(text)) setting = "desert";
  else if (lower.match(/\b(camp|campfire|tent|fire|twilight)\b/) || /कैम्प|आग|तम्बू/.test(text)) setting = "cozycamp";
  else if (lower.match(/\b(savannah|safari|grassland|african|plains)\b/) || /सवाना|मैदान|घास/.test(text)) setting = "savannah";

  // 2. Priority 0: Check explicit screenplay speaker tags if present:
  // e.g. [श्री कृष्ण]: dialogue or [साथी]: dialogue or Hanuman: dialogue
  const speakerTagMatches = [...text.matchAll(/^[\[\(]?([^\]\(\):：\r\n]{1,32})[\]\)]?\s*[:：]\s*(.+)$/gmu)];
  if (speakerTagMatches.length >= 2) {
    const speakers = [];
    for (const m of speakerTagMatches) {
      const spk = cleanCharacterName(m[1]);
      if (spk && !speakers.includes(spk)) {
        speakers.push(spk);
      }
    }
    if (speakers.length >= 2) {
      char1 = speakers[0];
      char2 = speakers[1];
      return { char1, char2, setting };
    } else if (speakers.length === 1) {
      char1 = speakers[0];
    }
  }

  // 3. Extract Character Entities (Hindi or English)
  if (isHindi) {
    const hindiEntities = [
      // Krishna & Gokul Leela
      { word: 'श्री कृष्ण', name: 'श्री कृष्ण' },
      { word: 'कृष्ण', name: 'श्री कृष्ण' },
      { word: 'कान्हा', name: 'श्री कृष्ण' },
      { word: 'गोपाल', name: 'श्री कृष्ण' },
      { word: 'राधा', name: 'राधा' },
      { word: 'फल बेचने वाली', name: 'फल बेचने वाली' },
      { word: 'फल वाली', name: 'फल बेचने वाली' },
      { word: 'साथी', name: 'साथी' },
      { word: 'दोस्त', name: 'साथी' },
      { word: 'मित्र', name: 'साथी' },
      // Mythological & Epic
      { word: 'हनुमान जी', name: 'हनुमान जी' },
      { word: 'हनुमान', name: 'हनुमान जी' },
      { word: 'बजरंगबली', name: 'हनुमान जी' },
      { word: 'मारुति', name: 'हनुमान जी' },
      { word: 'पवनपुत्र', name: 'हनुमान जी' },
      { word: 'श्री राम', name: 'श्री राम' },
      { word: 'प्रभु श्री राम', name: 'श्री राम' },
      { word: 'रामचंद्र', name: 'श्री राम' },
      { word: 'रघुवीर', name: 'श्री राम' },
      { word: 'राम', name: 'श्री राम' },
      { word: 'सीता माता', name: 'सीता' },
      { word: 'माता सीता', name: 'सीता' },
      { word: 'सीता', name: 'सीता' },
      { word: 'लक्ष्मण', name: 'लक्ष्मण' },
      { word: 'अर्जुन', name: 'अर्जुन' },
      { word: 'साधु', name: 'साधु' },
      { word: 'ऋषि', name: 'साधु' },
      { word: 'मुनि', name: 'साधु' },
      { word: 'बाबा', name: 'साधु' },
      { word: 'संन्यासी', name: 'साधु' },
      { word: 'तपस्वी', name: 'साधु' },
      { word: 'बीरबल', name: 'बीरबल' },
      { word: 'अकबर', name: 'अकबर' },
      { word: 'तेनालीराम', name: 'तेनालीराम' },
      { word: 'रघुवीर', name: 'श्री राम' },
      { word: 'राम', name: 'श्री राम' },
      { word: 'सीता माता', name: 'सीता' },
      { word: 'माता सीता', name: 'सीता' },
      { word: 'सीता', name: 'सीता' },
      { word: 'लक्ष्मण', name: 'लक्ष्मण' },
      { word: 'श्री कृष्ण', name: 'श्री कृष्ण' },
      { word: 'कृष्ण', name: 'श्री कृष्ण' },
      { word: 'अर्जुन', name: 'अर्जुन' },
      { word: 'साधु', name: 'साधु' },
      { word: 'ऋषि', name: 'साधु' },
      { word: 'मुनि', name: 'साधु' },
      { word: 'बाबा', name: 'साधु' },
      { word: 'संन्यासी', name: 'साधु' },
      { word: 'तपस्वी', name: 'साधु' },
      { word: 'बीरबल', name: 'बीरबल' },
      { word: 'अकबर', name: 'अकबर' },
      { word: 'तेनालीराम', name: 'तेनालीराम' },
      // Archetypes & Human Roles
      { word: 'राजा', name: 'राजा' },
      { word: 'महाराज', name: 'राजा' },
      { word: 'सम्राट', name: 'राजा' },
      { word: 'रानी', name: 'रानी' },
      { word: 'महारानी', name: 'रानी' },
      { word: 'राजकुमार', name: 'राजकुमार' },
      { word: 'राजकुमारी', name: 'राजकुमारी' },
      { word: 'लड़का', name: 'लड़का' },
      { word: 'बालक', name: 'लड़का' },
      { word: 'बच्चा', name: 'लड़का' },
      { word: 'लड़की', name: 'लड़की' },
      { word: 'बालिका', name: 'लड़की' },
      { word: 'बच्ची', name: 'लड़की' },
      { word: 'रोहन', name: 'रोहन' },
      { word: 'प्रिया', name: 'प्रिया' },
      { word: 'अमन', name: 'अमन' },
      { word: 'राहुल', name: 'राहुल' },
      { word: 'कबीर', name: 'कबीर' },
      { word: 'आरव', name: 'आरव' },
      { word: 'पूजा', name: 'पूजा' },
      { word: 'नेहा', name: 'नेहा' },
      { word: 'अनन्या', name: 'अनन्या' },
      { word: 'डॉक्टर', name: 'डॉक्टर' },
      { word: 'वैद्य', name: 'डॉक्टर' },
      { word: 'शिक्षक', name: 'शिक्षक' },
      { word: 'अध्यापक', name: 'शिक्षक' },
      { word: 'गुरु', name: 'शिक्षक' },
      { word: 'किसान', name: 'किसान' },
      { word: 'सैनिक', name: 'सैनिक' },
      { word: 'योद्धा', name: 'योद्धा' },
      { word: 'जादूगर', name: 'जादूगर' },
      // Animals
      { word: 'हाथी', name: 'हाथी' },
      { word: 'गजराज', name: 'हाथी' },
      { word: 'जंबो', name: 'हाथी' },
      { word: 'चूहा', name: 'चूहा' },
      { word: 'चूहे', name: 'चूहा' },
      { word: 'मूषक', name: 'चूहा' },
      { word: 'शेर', name: 'शेर' },
      { word: 'सिंह', name: 'शेर' },
      { word: 'वनराज', name: 'शेर' },
      { word: 'बाघ', name: 'बाघ' },
      { word: 'चीता', name: 'चीता' },
      { word: 'भालू', name: 'भालू' },
      { word: 'खरगोश', name: 'खरगोश' },
      { word: 'चीकू', name: 'खरगोश' },
      { word: 'बंदर', name: 'बंदर' },
      { word: 'वानर', name: 'बंदर' },
      { word: 'मगरमच्छ', name: 'मगरमच्छ' },
      { word: 'मगर', name: 'मगरमच्छ' },
      { word: 'लोमड़ी', name: 'लोमड़ी' },
      { word: 'भेड़िया', name: 'भेड़िया' },
      { word: 'बिल्ली', name: 'बिल्ली' },
      { word: 'कुत्ता', name: 'कुत्ता' },
      { word: 'ड्रैगन', name: 'ड्रैगन' },
      { word: 'हिरण', name: 'हिरण' },
      { word: 'कछुआ', name: 'कछुआ' },
      { word: 'पक्षी', name: 'पक्षी' },
      { word: 'चिड़िया', name: 'पक्षी' },
      { word: 'उल्लू', name: 'उल्लू' },
      { word: 'तोता', name: 'तोता' },
      { word: 'रोबोट', name: 'रोबोट' },
      { word: 'एलियन', name: 'एलियन' }
    ];

    const detected = [];
    for (const sp of hindiEntities) {
      const idx = text.indexOf(sp.word);
      if (idx !== -1 && !detected.some(d => d.name === sp.name)) {
        detected.push({ name: sp.name, index: idx });
      }
    }
    detected.sort((a, b) => a.index - b.index);

    const hasHanuman = detected.some(d => d.name === 'हनुमान जी');
    const hasRam = detected.some(d => d.name === 'श्री राम');
    if (hasHanuman && hasRam) {
      char1 = 'हनुमान जी';
      char2 = 'श्री राम';
    } else if (detected.length >= 2) {
      char1 = detected[0].name;
      char2 = detected[1].name;
    } else if (detected.length === 1) {
      char1 = detected[0].name;
      // Logical companion pairings
      if (char1 === 'श्री कृष्ण' || char1 === 'कृष्ण' || char1 === 'कान्हा') char2 = 'साथी';
      else if (char1 === 'राधा') char2 = 'श्री कृष्ण';
      else if (char1 === 'फल बेचने वाली') char2 = 'श्री कृष्ण';
      else if (char1 === 'हनुमान जी') char2 = 'श्री राम';
      else if (char1 === 'श्री राम') char2 = 'हनुमान जी';
      else if (char1 === 'अकबर') char2 = 'बीरबल';
      else if (char1 === 'बीरबल') char2 = 'अकबर';
      else if (char1 === 'राजा') char2 = 'साधु';
      else if (char1 === 'साधु') char2 = 'राजा';
      else if (char1 === 'शेर') char2 = 'चूहा';
      else if (char1 === 'हाथी') char2 = 'चूहा';
      else if (char1 === 'रोहन') char2 = 'प्रिया';
      else if (char1 === 'लड़का') char2 = 'लड़की';
      else char2 = 'साथी';
    } else {
      // Fallback: Pattern matching around और, rejecting adjectives
      const hindiAndPattern = /([\u0900-\u097F]+(?:\s+[\u0900-\u097F]+){0,2})\s+(?:और|तथा|व|बनाम|के साथ)\s+([\u0900-\u097F]+(?:\s+[\u0900-\u097F]+){0,2})/u;
      const hMatch = text.match(hindiAndPattern);
      const isAdjective = (w) => /^(मधुर|विनम्र|सुंदर|मीठी|मीठा|प्यारी|प्यारा|तेज़|बड़ी|बड़ा|बड़े|छोटी|छोटा|छोटे|शांत|गंभीर|साहसी|खुश|उदास|सच्ची|सच्चा|अच्छी|अच्छा|बुरी|बुरा|गहरी|गहरा|ऊंची|ऊंचा|नीची|कठिन|सरल|स्वच्छ|पुराना|नया|पहला|दूसरा|एक|दो|सब|कुछ|बहुत|ज़रा|थोड़ा|वाणी|ध्वनि|आवाज़|बात|रूप|वेश|स्वभाव|विचार|ज्ञान|शक्ति|भक्ति|प्रेम|धर्म)$/u.test(w.trim());

      if (hMatch) {
        const cand1 = cleanCharacterName(hMatch[1]);
        const cand2 = cleanCharacterName(hMatch[2]);
        if (cand1 && cand2 && !isAdjective(cand1) && !isAdjective(cand2)) {
          char1 = cand1;
          char2 = cand2;
        } else {
          const fallbackCat = detectStoryCategory(text);
          if (fallbackCat === 'krishna') {
            char1 = "श्री कृष्ण";
            char2 = "साथी";
          } else if (fallbackCat === 'ramayana') {
            char1 = "हनुमान जी";
            char2 = "श्री राम";
          } else if (fallbackCat === 'royal') {
            char1 = "राजा";
            char2 = "बीरबल";
          } else {
            char1 = "शेर";
            char2 = "चूहा";
          }
        }
      } else {
        const fallbackCat = detectStoryCategory(text);
        if (fallbackCat === 'krishna') {
          char1 = "श्री कृष्ण";
          char2 = "साथी";
        } else if (fallbackCat === 'ramayana') {
          char1 = "हनुमान जी";
          char2 = "श्री राम";
        } else if (fallbackCat === 'royal') {
          char1 = "राजा";
          char2 = "बीरबल";
        } else {
          char1 = "शेर";
          char2 = "चूहा";
        }
      }
    }
  } else {
    // English & Romanized extraction
    const romanEntities = [
      { word: 'hanuman', name: 'Hanuman' },
      { word: 'bajrangbali', name: 'Hanuman' },
      { word: 'rama', name: 'Shri Ram' },
      { word: 'ram', name: 'Shri Ram' },
      { word: 'sadhu', name: 'Sadhu' },
      { word: 'sage', name: 'Sage' },
      { word: 'monk', name: 'Monk' },
      { word: 'king', name: 'King' },
      { word: 'queen', name: 'Queen' },
      { word: 'prince', name: 'Prince' },
      { word: 'princess', name: 'Princess' },
      { word: 'boy', name: 'Boy' },
      { word: 'girl', name: 'Girl' },
      { word: 'rohan', name: 'Rohan' },
      { word: 'priya', name: 'Priya' },
      { word: 'leo', name: 'Leo' },
      { word: 'maya', name: 'Maya' },
      { word: 'sparky', name: 'Sparky' },
      { word: 'elephant', name: 'Elephant' },
      { word: 'hathi', name: 'Hathi' },
      { word: 'rat', name: 'Rat' },
      { word: 'mouse', name: 'Rat' },
      { word: 'chuha', name: 'Chuha' },
      { word: 'lion', name: 'Lion' },
      { word: 'sher', name: 'Sher' },
      { word: 'tiger', name: 'Tiger' },
      { word: 'bagh', name: 'Bagh' },
      { word: 'fox', name: 'Fox' },
      { word: 'lomdi', name: 'Fox' },
      { word: 'bear', name: 'Bear' },
      { word: 'bhalu', name: 'Bear' },
      { word: 'monkey', name: 'Monkey' },
      { word: 'bandar', name: 'Monkey' },
      { word: 'crocodile', name: 'Crocodile' },
      { word: 'magarmach', name: 'Crocodile' },
      { word: 'cat', name: 'Cat' },
      { word: 'billi', name: 'Cat' },
      { word: 'dog', name: 'Dog' },
      { word: 'kutta', name: 'Dog' },
      { word: 'rabbit', name: 'Rabbit' },
      { word: 'khargosh', name: 'Rabbit' },
      { word: 'dragon', name: 'Dragon' },
      { word: 'robot', name: 'Robot' },
      { word: 'alien', name: 'Alien' },
      { word: 'knight', name: 'Knight' },
      { word: 'wizard', name: 'Wizard' },
      { word: 'astronaut', name: 'Astronaut' }
    ];

    const detectedR = [];
    for (const sp of romanEntities) {
      const idx = lower.indexOf(sp.word);
      if (idx !== -1 && !detectedR.some(d => d.name === sp.name)) {
        detectedR.push({ name: sp.name, index: idx });
      }
    }
    detectedR.sort((a, b) => a.index - b.index);

    if (detectedR.length >= 2) {
      char1 = detectedR[0].name;
      char2 = detectedR[1].name;
    } else if (detectedR.length === 1) {
      char1 = detectedR[0].name;
      if (char1 === 'Hanuman') char2 = 'Shri Ram';
      else if (char1 === 'Shri Ram') char2 = 'Hanuman';
      else if (char1 === 'King') char2 = 'Sage';
      else if (char1 === 'Boy') char2 = 'Girl';
      else char2 = 'Friend';
    } else {
      const andPattern = /(?:a|an|the)?\s*([A-Za-z0-9_\s'-]+?)\s+(?:and|vs\.?|versus|meets|meeting|with|against|aur)\s+(?:a|an|the)?\s*([A-Za-z0-9_\s'-]+?)(?:\s+(?:in|at|on|discussing|arguing|talking|exploring|trying|having|who|as|to|about|over|around|ki|ke|me|mein)\b|[.,;!?]|$)/i;
      const match = text.match(andPattern);

      if (match) {
        char1 = cleanCharacterName(match[1]) || "Hero";
        char2 = cleanCharacterName(match[2]) || "Friend";
      } else {
        const namedMatches = [...text.matchAll(/named\s+([A-Z][a-z]+)/gi)];
        if (namedMatches.length >= 2) {
          char1 = namedMatches[0][1];
          char2 = namedMatches[1][1];
        } else {
          char1 = "Hero";
          char2 = "Friend";
        }
      }
    }
  }

  return { char1, char2, setting };
}

function cleanCharacterName(raw) {
  let name = (raw || "")
    .replace(/[\[\]\(\):："'“”‘’]/g, '')
    .replace(/\b(a|an|the|wise|brave|little|big|grumpy|curious|fierce|clever|tiny|mighty|friendly|old|young|ancient|hungry|fearless|sly|eccentric)\b/gi, '')
    .replace(/(एक|बुद्धिमान|चालाक|नन्हा|नन्हे|बड़ा|बड़े|विशाल|शक्तिशाली|साहसी|प्यारा|प्यारे|सच्चा|सच्चे|पुराना|घमंडी|बहादुर|महान|तेज़|चतुर)\s*/gu, '')
    .trim();
  name = name.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
  if (name.length > 0 && !/[\u0900-\u097F]/.test(name)) {
    name = name.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  }
  return name || "Character";
}

function getCharacterArchetype(nameOrSpecies) {
  const s = (nameOrSpecies || "").toLowerCase();
  // Shri Krishna
  if (s.includes('कृष्ण') || s.includes('krishna') || s.includes('कान्हा') || s.includes('kanha') || s.includes('गोपाल') || s.includes('श्याम') || s.includes('माधव') || s.includes('केशव') || s.includes('वासुदेव')) return 'krishna';
  // Companion / Sathi / Gopika / Fruit seller
  if (s.includes('साथी') || s.includes('sathi') || s.includes('दोस्त') || s.includes('मित्र') || s.includes('friend') || s.includes('गोपिका') || s.includes('गोप') || s.includes('फल बेचने वाली') || s.includes('फल वाली') || s.includes('महिला')) return 'sathi';
  // Hanuman
  if (s.includes('hanuman') || s.includes('हनुमान') || s.includes('bajrangbali') || s.includes('बजरंगबली') || s.includes('maruti') || s.includes('मारुति') || s.includes('पवनपुत्र')) return 'hanuman';
  // Shri Ram
  if (s.includes('श्री राम') || s.includes('रामचंद्र') || s.includes('shri ram') || s.includes('rama') || s.includes('raghuvir') || s.includes('रघुवीर') || (s.includes('राम') && !s.includes('मगरमच्छ') && !s.includes('तेनालीराम') && !s.includes('विराम') && !s.includes('आराम') && !s.includes('विश्राम'))) return 'ram';
  // Sadhu / Sage / Monk
  if (s.includes('sadhu') || s.includes('साधु') || s.includes('sage') || s.includes('monk') || s.includes('hermit') || s.includes('ऋषि') || s.includes('मुनि') || s.includes('बाबा') || s.includes('संन्यासी') || s.includes('तपस्वी')) return 'sadhu';
  // King / Raja
  if (s.includes('king') || s.includes('राजा') || s.includes('maharaja') || s.includes('महाराज') || s.includes('samrat') || s.includes('सम्राट') || s.includes('बादशाह')) return 'king';
  // Queen / Rani / Sita
  if (s.includes('queen') || s.includes('रानी') || s.includes('maharani') || s.includes('महारानी') || s.includes('sita') || s.includes('सीता') || s.includes('princess') || s.includes('राजकुमारी')) return 'queen';
  // Minister / Birbal
  if (s.includes('birbal') || s.includes('बीरबल') || s.includes('tenali') || s.includes('तेनाली') || s.includes('minister') || s.includes('मंत्री') || s.includes('सलाहकार')) return 'minister';
  // Boy / Kid / Male Child
  if (s.includes('boy') || s.includes('लड़का') || s.includes('बालक') || s.includes('बच्चा') || s.includes('छोटू') || s.includes('rohan') || s.includes('रोहन') || s.includes('aman') || s.includes('अमन') || s.includes('rahul') || s.includes('राहुल') || s.includes('aarav') || s.includes('आरव') || s.includes('kabir') || s.includes('कबीर')) return 'boy';
  // Girl / Female Child
  if (s.includes('girl') || s.includes('लड़की') || s.includes('बालिका') || s.includes('बच्ची') || s.includes('priya') || s.includes('प्रिया') || s.includes('puja') || s.includes('पूजा') || s.includes('neha') || s.includes('नेहा') || s.includes('ananya') || s.includes('अनन्या')) return 'girl';
  // Tiger / Bagh
  if (s.includes('tiger') || s.includes('बाघ') || s.includes('bagh') || s.includes('चीता') || s.includes('cheetah')) return 'tiger';
  // Elephant
  if (s.includes('elephant') || s.includes('mammoth') || s.includes('हाथी') || s.includes('hathi') || s.includes('गजराज') || s.includes('जंबो') || s.includes('jumbo')) return 'elephant';
  // Rabbit / Hare (Chiku)
  if (s.includes('rabbit') || s.includes('bunny') || s.includes('hare') || s.includes('खरगोश') || s.includes('चीकू') || s.includes('chiku') || s.includes('khargosh')) return 'rabbit';
  // Rodent (Rat / Mouse)
  if (s.includes('rat') || s.includes('mouse') || s.includes('rodent') || s.includes('hamster') || s.includes('squirrel') || s.includes('चूहा') || s.includes('चूहे') || s.includes('chuha') || s.includes('मूषक')) return 'rodent';
  // Lion
  if (s.includes('lion') || s.includes('शेर') || s.includes('sher') || s.includes('सिंह') || s.includes('वनराज')) return 'lion';
  // Fox / Wolf
  if (s.includes('fox') || s.includes('wolf') || s.includes('coyote') || s.includes('लोमड़ी') || s.includes('lomdi') || s.includes('भेड़िया')) return 'fox';
  // Cat
  if (s.includes('cat') || s.includes('kitten') || s.includes('kitty') || s.includes('बिल्ली') || s.includes('billi')) return 'cat';
  // Dog
  if (s.includes('dog') || s.includes('puppy') || s.includes('hound') || s.includes('कुत्ता') || s.includes('kutta')) return 'dog';
  // Bear
  if (s.includes('bear') || s.includes('panda') || s.includes('भालू') || s.includes('bhalu')) return 'bear';
  // Dragon
  if (s.includes('dragon') || s.includes('dino') || s.includes('lizard') || s.includes('reptile') || s.includes('ड्रैगन')) return 'dragon';
  // Bird
  if (s.includes('bird') || s.includes('owl') || s.includes('eagle') || s.includes('crow') || s.includes('parrot') || s.includes('पक्षी') || s.includes('चिड़िया') || s.includes('उल्लू') || s.includes('तोता') || s.includes('हंस') || s.includes('मोर')) return 'bird';
  // Robot
  if (s.includes('robot') || s.includes('android') || s.includes('cyborg') || s.includes('bot') || s.includes('mech') || s.includes('रोबोट')) return 'robot';
  // Alien
  if (s.includes('alien') || s.includes('monster') || s.includes('creature') || s.includes('goblin') || s.includes('martian') || s.includes('एलियन') || s.includes('दानव')) return 'alien';
  // Warrior / Soldier / Knight
  if (s.includes('knight') || s.includes('warrior') || s.includes('paladin') || s.includes('samurai') || s.includes('soldier') || s.includes('योद्धा') || s.includes('सैनिक') || s.includes('सिपाही')) return 'knight';
  // Wizard
  if (s.includes('wizard') || s.includes('mage') || s.includes('sorcerer') || s.includes('witch') || s.includes('जादूगर')) return 'wizard';
  // Astronaut
  if (s.includes('astronaut') || s.includes('spaceman') || s.includes('cosmonaut') || s.includes('अंतरिक्षयात्री')) return 'astronaut';
  // Monkey
  if (s.includes('बंदर') || s.includes('monkey') || s.includes('bandar') || s.includes('वानर')) return 'monkey';
  // Woman / Female adult
  if (s.includes('woman') || s.includes('महिला') || s.includes('स्त्री') || s.includes('माता') || s.includes('mother')) return 'female';
  // Man / Male adult
  if (s.includes('man') || s.includes('पुरुष') || s.includes('father') || s.includes('doctor') || s.includes('डॉक्टर') || s.includes('teacher') || s.includes('शिक्षक') || s.includes('गुरु') || s.includes('किसान')) return 'male';
  return 'explorer';
}

function getArchetypeScale(archetype) {
  switch (archetype) {
    case 'krishna': case 'sathi': case 'ram': case 'hanuman': return 1.08;
    case 'elephant': case 'dragon': case 'bear': return 1.35;
    case 'king': case 'knight': case 'male': return 1.25;
    case 'sadhu': case 'minister': return 1.22;
    case 'queen': case 'female': return 1.20;
    case 'lion': case 'tiger': case 'fox': case 'dog': return 1.22;
    case 'monkey': return 1.10;
    case 'boy': return 1.05;
    case 'girl': return 1.02;
    case 'rabbit': return 0.95;
    case 'rodent': case 'bird': case 'cat': return 0.88;
    default: return 1.22;
  }
}

function getArchetypeColors(archetype) {
  switch (archetype) {
    case 'krishna': return { primary: '#2563eb', outfit: '#eab308', skin: '#60a5fa' }; // Divine shyamal blue & pitambar gold
    case 'sathi': return { primary: '#059669', outfit: '#f59e0b', skin: '#fed7aa' };   // Vibrant rural Indian companion attire
    case 'hanuman': return { primary: '#ea580c', outfit: '#ea580c', skin: '#f97316' }; // Divine saffron/orange
    case 'ram': return { primary: '#60a5fa', outfit: '#f59e0b', skin: '#93c5fd' };     // Divine shyamal blue & pitambar gold
    case 'sadhu': return { primary: '#f97316', outfit: '#ea580c', skin: '#fed7aa' };   // Saffron ascetic robes
    case 'king': return { primary: '#b91c1c', outfit: '#f59e0b', skin: '#fed7aa' };    // Royal crimson & gold
    case 'queen': return { primary: '#db2777', outfit: '#fbbf24', skin: '#fed7aa' };   // Royal pink & gold
    case 'minister': return { primary: '#0284c7', outfit: '#0369a1', skin: '#fed7aa' };// Royal blue & sapphire
    case 'boy': return { primary: '#2563eb', outfit: '#1d4ed8', skin: '#fed7aa' };     // Vibrant royal blue
    case 'girl': return { primary: '#ec4899', outfit: '#db2777', skin: '#fed7aa' };    // Bright friendly pink
    case 'tiger': return { primary: '#f97316', outfit: '#c2410c', skin: '#ffedd5' };   // Orange with black stripes
    case 'elephant': return { primary: '#64748b', outfit: '#334155', skin: '#94a3b8' };
    case 'rabbit': return { primary: '#f8fafc', outfit: '#38bdf8', skin: '#fbcfe8' };
    case 'rodent': return { primary: '#d97706', outfit: '#b45309', skin: '#fbcfe8' };
    case 'lion': return { primary: '#f59e0b', outfit: '#b45309', skin: '#fef3c7' };
    case 'monkey': return { primary: '#92400e', outfit: '#d97706', skin: '#fef08a' };
    case 'fox': return { primary: '#ea580c', outfit: '#c2410c', skin: '#ffedd5' };
    case 'cat': return { primary: '#64748b', outfit: '#0ea5e9', skin: '#fed7aa' };
    case 'dog': return { primary: '#b45309', outfit: '#ef4444', skin: '#fde68a' };
    case 'bear': return { primary: '#78350f', outfit: '#047857', skin: '#fcd34d' };
    case 'dragon': return { primary: '#059669', outfit: '#d97706', skin: '#6ee7b7' };
    case 'bird': return { primary: '#7c2d12', outfit: '#0284c7', skin: '#fde047' };
    case 'robot': return { primary: '#334155', outfit: '#38bdf8', skin: '#06b6d4' };
    case 'alien': return { primary: '#9333ea', outfit: '#10b981', skin: '#c084fc' };
    case 'knight': return { primary: '#94a3b8', outfit: '#dc2626', skin: '#fed7aa' };
    case 'wizard': return { primary: '#4338ca', outfit: '#f59e0b', skin: '#f1f5f9' };
    case 'astronaut': return { primary: '#f8fafc', outfit: '#2563eb', skin: '#38bdf8' };
    case 'tracker': return { primary: '#475569', outfit: '#0284c7', skin: '#fed7aa' };
    case 'male': return { primary: '#0d9488', outfit: '#0f766e', skin: '#fed7aa' };
    case 'female': return { primary: '#8b5cf6', outfit: '#7c3aed', skin: '#fed7aa' };
    default: return { primary: '#059669', outfit: '#047857', skin: '#fed7aa' };
  }
}

function setupCharacterRigs(char1Name, char2Name) {
  const archA = getCharacterArchetype(char1Name);
  const colorsA = getArchetypeColors(archA);
  state.charA.name = char1Name;
  state.charA.species = archA;
  state.charA.scale = getArchetypeScale(archA);
  state.charA.color = colorsA.primary;
  state.charA.outfitColor = colorsA.outfit;
  state.charA.skinColor = colorsA.skin;

  if (DOM.charAName) DOM.charAName.value = char1Name;
  if (DOM.charAType) DOM.charAType.value = archA;
  if (DOM.charAOutfitColor) DOM.charAOutfitColor.value = colorsA.outfit;
  if (DOM.charASkinColor) DOM.charASkinColor.value = colorsA.skin;
  if (DOM.trackLabelCharA) DOM.trackLabelCharA.textContent = char1Name.toUpperCase();
  if (DOM.labelSpeakerA) DOM.labelSpeakerA.textContent = `${char1Name} (Listening)`;

  const archB = getCharacterArchetype(char2Name);
  const colorsB = getArchetypeColors(archB);
  state.charB.name = char2Name;
  state.charB.species = archB;
  state.charB.scale = getArchetypeScale(archB);
  state.charB.color = colorsB.primary;
  state.charB.outfitColor = colorsB.outfit;
  state.charB.skinColor = colorsB.skin;

  if (DOM.charBName) DOM.charBName.value = char2Name;
  if (DOM.charBType) DOM.charBType.value = archB;
  if (DOM.charBOutfitColor) DOM.charBOutfitColor.value = colorsB.outfit;
  if (DOM.charBSkinColor) DOM.charBSkinColor.value = colorsB.skin;
  if (DOM.trackLabelCharB) DOM.trackLabelCharB.textContent = char2Name.toUpperCase();
  if (DOM.labelSpeakerB) DOM.labelSpeakerB.textContent = `${char2Name} (Listening)`;
}

function initStoryFromPrompt(char1Name, char2Name, theme, setting) {
  state.storyTheme = theme;
  if (setting && DOM.stageEnvSelect) {
    DOM.stageEnvSelect.value = setting;
    state.stageEnv = setting;
  }
  setupCharacterRigs(char1Name, char2Name);
  vidoNovaProcessScript(theme, state.targetDurationMinutes);
}

// =====================================================
// VIDONOVA AI: ONE-CLICK SCRIPT-TO-SCENES ENGINE
// =====================================================
function vidoNovaProcessScript(rawInput, targetMinutes) {
  const text = (rawInput || (DOM.storyInput ? DOM.storyInput.value : "") || "").trim();
  if (!text) return;

  const targetMins = targetMinutes || state.targetDurationMinutes || 3;
  state.targetDurationMinutes = targetMins;

  // 1. Detect language (Hindi, English, or Hinglish)
  const detectedLang = detectLanguage(text);
  state.language = detectedLang;
  if (DOM.storyLangSelect && DOM.storyLangSelect.value === 'auto') {
    // Keep 'auto' selected in dropdown so user knows it auto-detected
  }

  // 2. Extract characters & setting environment
  const { char1, char2, setting } = extractCharactersAndSetting(text);
  state.storyTheme = text;
  if (setting && DOM.stageEnvSelect) {
    DOM.stageEnvSelect.value = setting;
    state.stageEnv = setting;
  }

  // 3. Setup Character Rigs
  setupCharacterRigs(char1, char2);

  // 4. Calculate target scene count according to duration limit
  const targetSeconds = Math.max(25, targetMins * 60);
  const targetCount = Math.max(4, Math.min(10, Math.round(targetSeconds / 18)));

  // 5. Intelligent Script-to-Scenes & Dialogues conversion
  const screenplay = generateVidoNovaDialogueScript(text, char1, char2, targetCount, detectedLang, targetSeconds);

  if (DOM.storyInput) {
    DOM.storyInput.value = screenplay;
    updateTextStats();
  }

  // 6. Parse into structured timed scenes
  parseScreenplayText(screenplay, targetSeconds);

  // 7. Render Storyboard & Previews
  renderStoryboardCards();

  // Reveal viewport stage immediately
  if (DOM.emptyPlaceholder) DOM.emptyPlaceholder.style.display = 'none';
  if (DOM.cinematicHud) DOM.cinematicHud.style.display = 'flex';

  renderCharacterPreviews();
  renderFrame(0);

  // Trigger AI artwork fetch
  fetchDynamicCharacterImages(state.charA, state.charB, text);
}

function cleanCutoutSprite(img) {
  try {
    const off = document.createElement('canvas');
    const w = img.naturalWidth || img.width || 512;
    const h = img.naturalHeight || img.height || 512;
    off.width = w;
    off.height = h;
    const ctx = off.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);
    const idata = ctx.getImageData(0, 0, w, h);
    const data = idata.data;

    // Sample top corners to find background tint
    const corners = [0, 4, 8, (w - 1) * 4, (w - 2) * 4];
    let sumR = 0, sumG = 0, sumB = 0, count = 0;
    for (const idx of corners) {
      if (idx < data.length - 3) {
        sumR += data[idx]; sumG += data[idx + 1]; sumB += data[idx + 2];
        count++;
      }
    }
    const bgR = count ? (sumR / count) : 255;
    const bgG = count ? (sumG / count) : 255;
    const bgB = count ? (sumB / count) : 255;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const dist = Math.hypot(r - bgR, g - bgG, b - bgB);
      const isBright = (r > 238 && g > 238 && b > 238);
      if (dist < 46 || isBright) {
        data[i + 3] = 0;
      } else if (dist < 62) {
        data[i + 3] = Math.round(((dist - 46) / 16) * data[i + 3]);
      }
    }
    ctx.putImageData(idata, 0, 0);
    return off;
  } catch (e) {
    return null;
  }
}

function getCharacterPromptForStyle(char) {
  const artStyle = state.genre || 'children';
  const name = char.name || "Character";
  const archetype = char.species || getCharacterArchetype(name);
  
  let desc = `${name} (${archetype})`;
  if (archetype === 'krishna') desc = `Lord Shri Krishna, youthful divine handsome Hindu avatar with radiant peacock feather crown, pearl jewelry, yellow silk pitambar dhoti, holding golden flute bansuri, warm cheerful smiling eyes`;
  else if (archetype === 'sathi') desc = `Cheerful friendly rural Indian village companion or friend in traditional colorful kurta and dhoti, expressive warm smile, joyful posture`;
  else if (archetype === 'hanuman') desc = `Lord Hanuman with golden crown mukut, saffron dhoti, divine monkey hero, holding golden mace gada`;
  else if (archetype === 'ram') desc = `Lord Shri Ram, serene divine blue complexion, royal pitambar golden robes, magnificent crown, longbow`;
  else if (archetype === 'sadhu') desc = `Venerable Indian Sadhu sage, long white beard, saffron robes, ascetic rudraksha beads, peaceful face`;
  else if (archetype === 'king') desc = `Majestic Indian King Maharaja, royal crimson robe, ornate golden crown with jewels, regal mustache`;
  else if (archetype === 'queen') desc = `Graceful Queen Rani, royal pink silk saree, sparkling tiara, pearl necklace`;
  else if (archetype === 'minister') desc = `Wise minister Birbal, royal turban with jewel, classic angarkha coat, witty smile`;
  else if (archetype === 'boy') desc = `Cheerful young Indian boy, modern blue casual outfit, bright smiling expressive face`;
  else if (archetype === 'girl') desc = `Cheerful young Indian girl, bright pink dress, hair ribbons, friendly smiling eyes`;
  else if (archetype === 'tiger') desc = `Majestic cartoon tiger with vibrant orange fur and bold black stripes, cute friendly feline face`;

  if (artStyle === '3d_animation') {
    return `3D Disney Pixar cinema character model of ${desc}, expressive friendly face, full body standing pose, pure white background, raytraced 8k render, masterpiece`;
  } else if (artStyle === 'cinematic') {
    return `cinematic hyper-realistic character portrait of ${desc}, dramatic lighting, clean isolated background, movie concept art, 8k masterpiece`;
  } else if (artStyle === '2d_cartoon') {
    return `vibrant 2D vector animation cel character of ${desc}, bold outlines, cel shaded, clean white background, classic cartoon, masterpiece`;
  } else if (artStyle === 'anime') {
    return `Studio Ghibli Makoto Shinkai style anime character of ${desc}, painterly detailed, sparkling expressive eyes, clean white background, masterpiece`;
  } else {
    return `whimsical children's book watercolor illustration of cute adorable ${desc}, soft gouache textures, friendly smiling eyes, clean white background, fairytale storybook art, masterpiece`;
  }
}

/**
 * Generates actual 3D AI images for both characters on the spot!
 */
function fetchDynamicCharacterImages(charA, charB, theme) {
  const promptA = getCharacterPromptForStyle(charA);
  const urlA = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptA)}?width=512&height=512&nologo=true&seed=${Math.abs(stringHashCode(charA.name))}`;

  charA.imageUrl = urlA;
  charA.imageLoaded = false;
  loadImage(urlA).then(img => {
    charA.imageElement = img;
    charA.spriteCanvas = cleanCutoutSprite(img);
    charA.imageLoaded = true;
    renderCharacterPreviews();
    if (state.scenes.length > 0) renderFrame(state.currentTime);
  }).catch(() => {
    charA.imageLoaded = false;
  });

  const promptB = getCharacterPromptForStyle(charB);
  const urlB = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptB)}?width=512&height=512&nologo=true&seed=${Math.abs(stringHashCode(charB.name)) + 50}`;

  charB.imageUrl = urlB;
  charB.imageLoaded = false;
  loadImage(urlB).then(img => {
    charB.imageElement = img;
    charB.spriteCanvas = cleanCutoutSprite(img);
    charB.imageLoaded = true;
    renderCharacterPreviews();
    if (state.scenes.length > 0) renderFrame(state.currentTime);
  }).catch(() => {
    charB.imageLoaded = false;
  });

  const isStorybook = (state.genre === 'storybook' || state.genre === 'children');
  const bgPrompt = isStorybook
    ? `whimsical children's picture book illustration of enchanted fairytale magical forest with ancient mossy trees, glowing fireflies, colorful wildflowers, soft golden sunlight, vibrant storybook fantasy art, masterpiece`
    : `vibrant 3D Pixar animated film background scenery, ${theme}, cinematic lighting, beautiful nature landscape, 8k, wide shot`;
  const bgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(bgPrompt)}?width=1024&height=576&nologo=true&seed=999`;
  loadImage(bgUrl).then(img => {
    state.backgroundImg = img;
    state.backgroundUrl = bgUrl;
    if (state.scenes.length > 0) renderFrame(state.currentTime);
  }).catch(() => {
    state.backgroundImg = null;
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (src.startsWith('http://') || src.startsWith('https://')) {
      img.crossOrigin = "anonymous";
    }
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
    setTimeout(() => { if (!img.complete) reject(new Error("Timeout")); }, 12000);
  });
}

// =====================================================
// INTELLIGENT DIALOGUE & SCENE SYNTHESIS ENGINE
// =====================================================
function generateVidoNovaDialogueScript(inputText, charA, charB, targetCount, lang, targetSeconds) {
  const text = (inputText || "").trim();

  // Check if text already has speaker tagged dialogues
  const taggedLines = text.split("\n")
    .map(l => l.trim())
    .filter(l => l && !l.startsWith("//") && /^\[?([^\]:：\r\n]{1,32})\]?\s*[:：]\s*(.+)$/u.test(l));

  if (taggedLines.length >= 2) {
    // Input is already a screenplay! Adapt it to the target duration count
    return adaptExistingScreenplay(taggedLines, charA, charB, targetCount, lang, text);
  }

  // Input is a story narrative, plot summary, or concept prompt!
  // Parse narrative sentences into story beats
  const cleanSentences = text
    .split(/(?<=[.?!।\n])\s+/)
    .map(s => s.trim().replace(/^[-•*]\s*/, ''))
    .filter(s => s.length > 5 && !s.startsWith("//"));

  const lines = [];
  const durationLabel = targetSeconds >= 60 ? `${(targetSeconds / 60).toFixed(1)} Min` : `${targetSeconds} Sec`;

  lines.push(`// =====================================================`);
  lines.push(`// VIDONOVA AI SCREENPLAY: [${charA}] & [${charB}]`);
  lines.push(`// TARGET RUNTIME: ${durationLabel} • SCENES: ~${targetCount}`);
  lines.push(`// LANGUAGE: ${lang.toUpperCase()}`);
  lines.push(`// =====================================================\n`);

  if (lang === 'hi') {
    const customScenes = extractHindiStoryScenes(text, charA, charB, targetCount);
    if (customScenes && customScenes.length >= 3) {
      customScenes.forEach(s => {
        lines.push(`[${s.speaker}]: ${s.text}`);
      });
      return lines.join("\n");
    }

    const hindiStoryBeats = buildHindiDialogueBeats(charA, charB, cleanSentences, text);
    for (let i = 0; i < targetCount; i++) {
      const beat = hindiStoryBeats[i % hindiStoryBeats.length];
      const isTurnA = (i % 2 === 0);
      const speaker = isTurnA ? charA : charB;
      const dialogue = isTurnA ? beat.a : beat.b;
      lines.push(`[${speaker}]: ${dialogue}`);
    }
    return lines.join("\n");
  }

  if (lang === 'hinglish') {
    const hinglishStoryBeats = buildHinglishDialogueBeats(charA, charB, cleanSentences, text);
    for (let i = 0; i < targetCount; i++) {
      const beat = hinglishStoryBeats[i % hinglishStoryBeats.length];
      const isTurnA = (i % 2 === 0);
      const speaker = isTurnA ? charA : charB;
      const dialogue = isTurnA ? beat.a : beat.b;
      lines.push(`[${speaker}]: ${dialogue}`);
    }
    return lines.join("\n");
  }

  // Default: English Dialogue Beats
  const englishStoryBeats = buildEnglishDialogueBeats(charA, charB, cleanSentences, text);
  for (let i = 0; i < targetCount; i++) {
    const beat = englishStoryBeats[i % englishStoryBeats.length];
    const isTurnA = (i % 2 === 0);
    const speaker = isTurnA ? charA : charB;
    const dialogue = isTurnA ? beat.a : beat.b;
    lines.push(`[${speaker}]: ${dialogue}`);
  }

  return lines.join("\n");
}

function extractHindiStoryScenes(fullStoryText, defaultCharA, defaultCharB, targetCount) {
  const text = (fullStoryText || "").trim();
  if (!text) return [];

  // 1. Check if it's Lion & Mouse story (शेर और चूहा)
  if ((/शेर|सिंह/i.test(text) && /चूहा|मूषक/i.test(text)) || (/lion/i.test(text) && /rat|mouse/i.test(text))) {
    const sherChuhaBeats = [
      { speaker: "शेर", text: "घने जंगल की शांत दोपहर में मैं अपनी शिला पर सो रहा था। कौन है जो जंगल के राजा की नींद में खलल डालने का दुस्साहस कर रहा है?" },
      { speaker: "चूहा", text: "महाराज क्षमा करें! मैं तो यहाँ खेल रहा था, अनजाने में आपके विशाल पंजे के पास आ गया। मुझ नन्हे जीव पर कृपा करके छोड़ दीजिए!" },
      { speaker: "शेर", text: "हा हा हा! तुम इतना सा नन्हा चूहा हो, और कह रहे हो कि कभी मेरे काम आओगे? भला तुम जैसे छोटे जीव से मुझे क्या मदद मिल सकती है?" },
      { speaker: "चूहा", text: "वनराज, किसी की हिम्मत और वफ़ादारी उसके आकार से नहीं आंकी जाती! अगर आप मुझ पर दया करेंगे, तो मैं वचन देता हूँ कि एक दिन आपका यह उपकार ज़रूर चुकाऊँगा!" },
      { speaker: "शेर", text: "तुम्हारी चतुराई और निडरता देखकर मुझे तुम पर दया आ गई। जाओ नन्हे चूहे, आज मैंने तुम्हें जीवनदान दिया!" },
      { speaker: "शेर", text: "अरे नहीं! यह क्या हुआ? शिकारियों ने ज़मीन पर मजबूत रस्सियों का फंदा बिछा रखा था! मैं इस भारी जाल में जकड़ गया हूँ! कोई मेरी सहायता करो!" },
      { speaker: "चूहा", text: "महाराज घबराइए मत! आपकी दहाड़ सुनकर मैं तुरंत दौड़ा आया हूँ! मेरे पैने और नुकीले दाँत अभी इस पूरे फंदे को काटकर आपको आज़ाद करेंगे!" },
      { speaker: "चूहा", text: "लीजिए महाराज! जाल की सारी रस्सियाँ कट चुकी हैं! आप पूरी तरह आज़ाद हैं!" },
      { speaker: "शेर", text: "अद्भुत मेरे नन्हें दोस्त! आज तुमने मेरी जान बचाकर साबित कर दिया कि दयालुता का फल हमेशा मीठा होता है और कोई भी जीव छोटा नहीं होता! आज से हम पक्के मित्र हैं!" }
    ];

    while (sherChuhaBeats.length < targetCount) {
      const idx = sherChuhaBeats.length;
      if (idx % 2 === 0) sherChuhaBeats.push({ speaker: "शेर", text: "सच्चे दोस्त का साथ हो तो जंगल का कोई भी संकट बड़ा नहीं लगता, चूहे भाई!" });
      else sherChuhaBeats.push({ speaker: "चूहा", text: "और आपकी मित्रता मेरे जीवन का सबसे बड़ा गौरव है, महाराज! हमारी यह दोस्ती हमेशा बनी रहेगी!" });
    }
    return sherChuhaBeats.slice(0, targetCount);
  }

  // 2. Check if it's Monkey & Crocodile (बंदर और मगरमच्छ)
  if (/बंदर|वानर/i.test(text) && /मगर|मगरमच्छ/i.test(text)) {
    const bandarMagarBeats = [
      { speaker: "बंदर", text: "नदी के किनारे इस विशाल जामुन के पेड़ पर बहुत मीठे और रसीले जामुन लगे हैं! नमस्ते मगरमच्छ भाई, ये मीठे फल चखो!" },
      { speaker: "मगरमच्छ", text: "वाह बंदर भाई! इतने मीठे और स्वादिष्ट जामुन मैंने पहले कभी नहीं खाए! तुम्हारी मित्रता सचमुच बहुत अनमोल है!" },
      { speaker: "मगरमच्छ", text: "आज मेरी पत्नी ने तुम्हें हमारे घर दावत पर बुलाया है! तुम मेरी पीठ पर बैठ जाओ, मैं तुम्हें नदी पार ले चलता हूँ!" },
      { speaker: "बंदर", text: "अरे भाई! तुम बीच गहरे पानी में मुझे क्यों डुबा रहे हो? क्या बात है, सच-सच बताओ!" },
      { speaker: "मगरमच्छ", text: "माफ़ करना दोस्त, मेरी पत्नी तुम्हारा मीठा दिल खाना चाहती है, इसलिए मैं तुम्हें अपने घर ले जा रहा हूँ!" },
      { speaker: "बंदर", text: "हाहाहा! अरे भोले मगरमच्छ! तुमने यह बात पहले क्यों नहीं बताई? मैं तो अपना दिल जामुन के पेड़ के कोटर में ही सुरक्षित रख आया हूँ!" },
      { speaker: "मगरमच्छ", text: "ओह! तो चलो जल्दी से वापस पेड़ के पास चलते हैं ताकि तुम अपना दिल ला सको!" },
      { speaker: "बंदर", text: "मूर्ख मगरमच्छ! भला कोई अपना दिल भी पेड़ पर छोड़ता है? तुमने विश्वासघात किया, आज से हमारी मित्रता समाप्त!" }
    ];
    while (bandarMagarBeats.length < targetCount) {
      const idx = bandarMagarBeats.length;
      if (idx % 2 === 0) bandarMagarBeats.push({ speaker: "बंदर", text: "बुद्धिमानी से हर विपत्ति को टाला जा सकता है!" });
      else bandarMagarBeats.push({ speaker: "मगरमच्छ", text: "मुझे अपनी मूर्खता और लालच पर बहुत पछतावा हो रहा है!" });
    }
    return bandarMagarBeats.slice(0, targetCount);
  }

  // 3. Check if it's Elephant & Mouse story (हाथी और चूहा)
  if ((/हाथी|गजराज/i.test(text) && /चूहा|मूषक/i.test(text)) || (/elephant/i.test(text) && /rat|mouse/i.test(text))) {
    const hathiChuhaBeats = [
      { speaker: "हाथी", text: "नमस्ते नन्हें चूहे भाई! तुम इतने छोटे से जीव होकर इस विशाल घने जंगल में अकेले क्या कर रहे हो?" },
      { speaker: "चूहा", text: "प्रणाम हाथी दादा! मैं भले ही आकार में छोटा हूँ, लेकिन मेरा दिल बहुत साहसी है और मैं पूरे जंगल में खुशी से घूमता हूँ!" },
      { speaker: "हाथी", text: "हाहाहा! तुम्हारी बातों में बड़ा दम है नन्हें दोस्त! पर क्या सच में तुम मुसीबत के समय किसी बड़े की मदद कर सकते हो?" },
      { speaker: "चूहा", text: "बिल्कुल हाथी दादा! किसी का कद उसकी असली ताक़त नहीं तय करता, असली ताक़त तो हिम्मत और बुद्धिमानी में होती है!" },
      { speaker: "हाथी", text: "अरे बाप रे! ज़रा देखो, सामने घने पत्तों में शिकारियों का मजबूत जाल बिछा हुआ है! कोई भी जानवर इसमें फंस सकता है!" },
      { speaker: "चूहा", text: "घबराइए मत दादा! मेरे पैने और तेज़ दांत किस दिन काम आएँगे? मैं अभी इस पूरे जाल को कुतर कर रास्ता साफ़ कर देता हूँ!" },
      { speaker: "हाथी", text: "अरे वाह चूहे भाई! तुमने तो कमाल कर दिया! पलक झपकते ही तुमने इतना बड़ा ख़तरा टाल दिया!" },
      { speaker: "चूहा", text: "हाहाहा! देखा दादा, जब बड़ा और छोटा एक साथ मिल जाते हैं, तो हर मुश्किल का हल निकल आता है!" },
      { speaker: "हाथी", text: "आज से तुम मेरे सबसे अच्छे और सच्चे दोस्त हो! चलो साथ मिलकर इस सुंदर जंगल की सैर करते हैं!" }
    ];

    while (hathiChuhaBeats.length < targetCount) {
      const idx = hathiChuhaBeats.length;
      if (idx % 2 === 0) hathiChuhaBeats.push({ speaker: "हाथी", text: "तुम्हारे जैसा बुद्धिमान और फुर्तीला साथी पाकर मुझे सचमुच बहुत गर्व हो रहा है, चूहे भाई!" });
      else hathiChuhaBeats.push({ speaker: "चूहा", text: "और मुझे आप जैसे दयालु और शक्तिशाली हाथी दादा का साथ पाकर बेहद खुशी है! हमारी यह दोस्ती हमेशा अमर रहेगी!" });
    }
    return hathiChuhaBeats.slice(0, targetCount);
  }

  // Check if it's the Sundarban animal story (Chiku, Sher Singh, Jumbo)
  if (/सुंदरवन|जंबो|चीकू|शेर सिंह/i.test(text)) {
    const sundarbanBeats = [
      { speaker: "जंबो हाथी", text: "सुंदरवन के घने जंगल में हम सभी जानवर बड़े प्रेम और आनंद से एक साथ रहते हैं!" },
      { speaker: "चीकू खरगोश", text: "लेकिन इस बार जंगल में भयंकर सूखा पड़ा है! नदी और तालाब सूख रहे हैं, हमें पानी ढूंढना होगा!" },
      { speaker: "शेर सिंह", text: "मैं इस सुंदरवन का शक्तिशाली राजा हूँ, पर क्या राजा को भी खुद मेहनत करनी पड़ेगी?" },
      { speaker: "चीकू खरगोश", text: "जंबो भाई! मैंने दूर पहाड़ों के पीछे एक बड़ा मीठे पानी का झरना देखा है! चलो वहां तक का रास्ता बनाते हैं!" },
      { speaker: "जंबो हाथी", text: "चीकू भाई, तुम आगे रास्ता दिखाओ! मैं अपनी पूरी ताक़त से रास्ते के भारी पत्थर और पेड़ हटा दूंगा!" },
      { speaker: "चीकू खरगोश", text: "सावधान जंबो भाई! यह रास्ता पथरीला है, पर तुम्हारी ताक़त और मेरी नज़र से हम ज़रूर पहुँचेंगे!" },
      { speaker: "शेर सिंह", text: "मुझसे भूल हुई थी! जब नन्हा चीकू और जंबो इतनी मेहनत कर रहे हैं, तो मैं भी पूरी शक्ति से साथ दूंगा!" },
      { speaker: "जंबो हाथी", text: "देखो दोस्तों! मीठे पानी का अद्भुत झरना मिल गया! हमारे पूरे जंगल की प्यास बुझ गई!" },
      { speaker: "शेर सिंह", text: "सच्चा राजा वही है जो अपनी प्रजा के काम आए! एकता और बुद्धिमानी में ही सबसे बड़ी ताक़त है!" }
    ];

    while (sundarbanBeats.length < targetCount) {
      const idx = sundarbanBeats.length;
      if (idx % 3 === 0) sundarbanBeats.push({ speaker: "जंबो हाथी", text: "हम सब मिलकर इस सुंदरवन को हमेशा हरा-भरा और खुशहाल रखेंगे!" });
      else if (idx % 3 === 1) sundarbanBeats.push({ speaker: "चीकू खरगोश", text: "हाहाहा! दोस्ती और समझदारी से हर बड़ी मुश्किल आसान हो जाती है!" });
      else sundarbanBeats.push({ speaker: "शेर सिंह", text: "सुंदरवन के सभी भाइयों, आज से हम सब मिलकर एक परिवार की तरह रहेंगे!" });
    }
    return sundarbanBeats.slice(0, targetCount);
  }

  // Check for general quotes in story
  const quoteRegex = /(?:["'“”‘’]([^"'“”‘’]{5,})["'“”‘’])/g;
  let match;
  const quoteItems = [];
  while ((match = quoteRegex.exec(text)) !== null) {
    const quoteText = match[1].trim();
    const prefixContext = text.substring(Math.max(0, match.index - 80), match.index);
    let speaker = defaultCharA;
    if (/चीकू|खरगोश|chiku|rabbit/i.test(prefixContext)) speaker = "चीकू खरगोश";
    else if (/जंबो|हाथी|jumbo|elephant/i.test(prefixContext)) speaker = "जंबो हाथी";
    else if (/शेर|सिंह|lion/i.test(prefixContext)) speaker = "शेर सिंह";
    else if (/चूहा|मूषक|rat/i.test(prefixContext)) speaker = "चूहा";
    else if (/बंदर|monkey/i.test(prefixContext)) speaker = "बंदर";
    quoteItems.push({ speaker, text: quoteText });
  }

  if (quoteItems.length >= 2) {
    const res = [...quoteItems];
    while (res.length < targetCount) {
      const isTurnA = (res.length % 2 === 0);
      const speaker = isTurnA ? defaultCharA : defaultCharB;
      const fillers = [
        "आगे का रास्ता सचमुच बहुत रोमांचक और खूबसूरत लग रहा है!",
        "बिल्कुल सही! हमारी इस जोड़ी के सामने कोई भी रुकावट टिक नहीं सकती!",
        "हम सब मिलकर हर कठिनाई को पार कर लेंगे, चलो आगे बढ़ते हैं!",
        "आज का दिन हमारे इस पूरे सफ़र का सबसे यादगार पल बन गया है!"
      ];
      res.push({ speaker, text: fillers[(res.length - quoteItems.length) % fillers.length] });
    }
    return res.slice(0, targetCount);
  }

  return [];
}

function adaptExistingScreenplay(taggedLines, charA, charB, targetCount, lang, fullText) {
  if (taggedLines.length >= targetCount) {
    return taggedLines.slice(0, targetCount).join("\n");
  }

  // Need more scenes to fill the user's requested duration limit!
  const lines = [...taggedLines];
  let fillerIndex = 0;

  while (lines.length < targetCount) {
    const isTurnA = (lines.length % 2 === 0);
    const speaker = isTurnA ? charA : charB;
    let addLine = "";

    if (lang === 'hi') {
      const fillers = [
        `ज़रा आगे देखो, रास्ता कितना रोमांचक होता जा रहा है!`,
        `बिल्कुल सही कहा आपने, हमारी जोड़ी हर मुश्किल को आसान बना सकती है!`,
        `सावधान रहो मेरे दोस्त, हमें अपनी पूरी हिम्मत से आगे बढ़ना होगा!`,
        `हाहाहा! आपकी मौजूदगी से मुझे कोई डर नहीं लगता, चलो आगे बढ़ते हैं!`,
        `हमने आज साबित कर दिया कि सच्ची दोस्ती से बड़ा कोई बल नहीं होता!`,
        `सचमुच, यह हमारे जीवन का सबसे शानदार और अविस्मरणीय सफ़र है!`
      ];
      addLine = fillers[fillerIndex % fillers.length];
    } else if (lang === 'hinglish') {
      const fillers = [
        `Aage dekh bhai, kya kamaal view khula hai hum dono ke liye!`,
        `Bilkul bro! Apan dono milkar koi bhi challenge rock kar sakte hain!`,
        `Full focus rakhna dost, aage ka path thoda adventurous hai!`,
        `No tension boss! Teri power aur mera dimaag, blockbuster jodi hai!`,
        `Finally humne kar dikhaya! Aaj celebration toh banta hai!`,
        `Super hit ho gaya! Life ka sabse best adventure ban gaya aaj!`
      ];
      addLine = fillers[fillerIndex % fillers.length];
    } else {
      const fillers = [
        `Look across the horizon! The path forward is truly remarkable!`,
        `I agree completely! Together, our strength and wit cannot be defeated!`,
        `Stay alert, my friend! Every great discovery tests our courage!`,
        `Hahaha! With you by my side, I have zero doubts! Onward!`,
        `We have proven that loyalty and companionship conquer every storm!`,
        `Truly, this will go down as the most legendary chapter in our tale!`
      ];
      addLine = fillers[fillerIndex % fillers.length];
    }

    lines.push(`[${speaker}]: ${addLine}`);
    fillerIndex++;
  }

  return lines.join("\n");
}

function buildHindiDialogueBeats(charA, charB, sentences, themeText) {
  const isHanumanRam = (charA.includes('हनुमान') || charB.includes('हनुमान')) && (charA.includes('राम') || charB.includes('राम'));
  if (isHanumanRam) {
    const isAοντας = charA.includes('हनुमान');
    return [
      {
        a: isAοντας ? `हे प्रभु श्री राम! मैं साधु का वेश बनाकर आपका परिचय जानने आया था। आज मेरा जीवन धन्य हो गया!` : `हे सौम्य वानर श्रेष्ठ! मैं दशरथ पुत्र राम हूँ, और अपनी भार्या सीता की खोज में निकला हूँ।`,
        b: isAοντας ? `हे पवनपुत्र हनुमान! तुम्हारे इस भक्ति भाव और निष्ठा से मेरा हृदय अत्यंत प्रसन्न हुआ।` : `हे प्रभु! मैं पवनपुत्र हनुमान, आपकी सेवा में नतमस्तक हूँ!`
      },
      {
        a: isAοντας ? `प्रभु, इस घने वन में मैं आपकी सेवा में सदैव उपस्थित हूँ। आज्ञा दीजिए, मुझे क्या करना है?` : `हे वीर, हमें आगे बढ़कर महाराज सुग्रीव से मिलना है।`,
        b: isAοντας ? `हे वीर, माता सीता की खोज में हमें आगे बढ़ना है। सुग्रीव से मित्रता का मार्ग बताओ।` : `हे नाथ! आप मेरे कंधों पर विराजें, मैं आपको तुरंत ऋष्यमूक पर्वत ले चलता हूँ!`
      },
      {
        a: isAοντας ? `हे नाथ! आप मेरे कंधों पर विराजें, मैं आपको तुरंत ऋष्यमूक पर्वत पर ले चलता हूँ!` : `हनुमान, तुम्हारी यह अटूट निष्ठा और समर्पण युगों-युगों तक अमर रहेगा!`,
        b: isAοντας ? `हनुमान, तुम्हारी यह अटूट निष्ठा और समर्पण युगों-युगों तक संसार में अमर रहेगा!` : `जय श्री राम! आपके आशीर्वाद से हर संकट दूर होगा और अधर्म का नाश होगा!`
      },
      {
        a: isAοντας ? `जय श्री राम! आपके चरणों की सेवा ही मेरे जीवन का परम लक्ष्य है!` : `सत्य और धर्म के मार्ग पर तुम्हारी यह भक्ति और वीरता सदा प्रेरणा देगी, प्रिय हनुमान!`,
        b: isAοντας ? `सत्य और धर्म के मार्ग पर तुम्हारी यह भक्ति और वीरता सदा प्रेरणा देगी, प्रिय हनुमान!` : `हे प्रभु, जब तक मेरे प्राण हैं, मैं आपकी सेवा में समर्पित रहूँगा!`
      }
    ];
  }

  const isSadhuKing = (charA.includes('साधु') || charB.includes('साधु')) && (charA.includes('राजा') || charB.includes('राजा'));
  if (isSadhuKing) {
    const isASadhu = charA.includes('साधु');
    return [
      {
        a: isASadhu ? `हे राजन! राज्य की सच्ची शक्ति उसकी सेना या खजाने में नहीं, बल्कि प्रजा के सुख और न्याय में है।` : `प्रणाम महात्मा जी! इस पावन तपोवन में आपका दर्शन पाकर मैं कृतार्थ हुआ।`,
        b: isASadhu ? `प्रणाम महात्मा जी! आपके इन अनमोल वचनों से मुझे सच्चा ज्ञान प्राप्त हुआ।` : `हे राजन! धर्म और सत्य के मार्ग पर चलने वाला शासक ही अमर होता है।`
      },
      {
        a: isASadhu ? `सदा याद रखना, अहंकार से बड़ा कोई शत्रु नहीं और विनम्रता से बड़ा कोई बल नहीं।` : `मैं वचन देता हूँ कि अपने राज्य में न्याय और दया की कभी कमी नहीं होने दूंगा!`,
        b: isASadhu ? `मैं वचन देता हूँ कि अपने राज्य में न्याय और दया की कभी कमी नहीं होने दूंगा!` : `ईश्वर आपको सदैव सत्य और धर्म के मार्ग पर चलने का संबल प्रदान करे!`
      }
    ];
  }

  // If story has actual sentence beats, incorporate them cleanly as natural dialogue
  const beats = [];
  if (sentences && sentences.length >= 2) {
    for (let i = 0; i < sentences.length; i += 2) {
      const s1 = (sentences[i] || "").replace(/^(सुनो|देखो|अरे)\s+/i, '').trim();
      const s2 = (sentences[i + 1] || "").replace(/^(बिल्कुल|सचमुच|हाँ)\s+/i, '').trim();
      const p1 = s1.endsWith('?') || s1.endsWith('!') || s1.endsWith('।') ? s1 : `${s1}।`;
      const p2 = s2 ? (s2.endsWith('?') || s2.endsWith('!') || s2.endsWith('।') ? s2 : `${s2}।`) : `हम सब मिलकर हर कठिनाई को पार कर लेंगे, चलो आगे बढ़ते हैं!`;
      beats.push({ a: p1, b: p2 });
    }
  }

  // Rich narrative expansion beats for Hindi
  const coreBeats = [
    {
      a: `नमस्ते ${charB}! आज का यह वातावरण कितना अद्भुत लग रहा है, ज़रा चारों ओर देखो!`,
      b: `अरे ${charA}! सच में, आपके साथ इस सफ़र पर निकलना बहुत ही रोमांचक और सुखद है!`
    },
    {
      a: `हमेशा याद रखना, किसी का आकार या कद उसकी असली शक्ति तय नहीं करता। हिम्मत दिल में होती है!`,
      b: `बिल्कुल सच कहा आपने! आपकी शक्ति और मेरी बुद्धिमानी, जब साथ हों तो कोई भी हमें रोक नहीं सकता!`
    },
    {
      a: `ठहरो! ज़रा ध्यान से सुनो! आगे के रास्ते से कुछ अजीब सी आवाज़ें आ रही हैं!`,
      b: `घबराइए मत ${charA}! मेरी नज़र बहुत तेज़ है, मैं अभी आगे जाकर मुआयना करता हूँ!`
    },
    {
      a: `शाबाश मेरे दोस्त! तुम्हारी इस फुर्ती और हिम्मत की मैं दिल से दाद देता हूँ!`,
      b: `हाहाहा! और मुझे गर्व है कि मुझे आप जैसा सच्चा, दयालु और ताक़तवर साथी मिला है!`
    },
    {
      a: `अब समय आ गया है कि हम दोनों मिलकर अपनी पूरी ताक़त से आगे कदम बढ़ाएँ!`,
      b: `मैं तैयार हूँ, ${charA}! एक... दो... तीन, चलो मिलकर इस बाधा को पार करते हैं!`
    },
    {
      a: `हमने कर दिखाया! देखा, जब दोस्ती सच्ची हो, तो बड़ी से बड़ी रुकावट भी रास्ता छोड़ देती है!`,
      b: `हाहाहा! सच में ${charA}, आज का दिन हमारी इस खूबसूरत दोस्ती का सबसे बड़ा प्रमाण बन गया!`
    }
  ];

  return beats.length >= 2 ? [...beats, ...coreBeats] : coreBeats;
}

function buildHinglishDialogueBeats(charA, charB, sentences, themeText) {
  const beats = [];

  if (sentences.length >= 2) {
    for (let i = 0; i < sentences.length; i += 2) {
      const s1 = sentences[i] || "";
      const s2 = sentences[i + 1] || "";
      beats.push({
        a: `Hey ${charB}! ${s1} Dekh aage kya interesting scene hai!`,
        b: s2 ? `Bilkul ${charA}! ${s2} Apan log ready hain boss!` : `Full agree bro! Tere saath adventure karne ka maza hi alag hai!`
      });
    }
  }

  const coreBeats = [
    {
      a: `Hey ${charB}! Finally hum log is spot pe pahunch hi gaye! Kya kamaal view hai!`,
      b: `Bilkul ${charA}! Main toh pehle hi bol raha tha ki hamara plan ekdum solid aur blockbuster hai!`
    },
    {
      a: `Full alert rehna bro! Aage ka rasta kaafi challenging aur exciting lag raha hai!`,
      b: `Arey no tension, ${charA}! Teri power aur mera smart dimaag, apan log har problem solve kar denge!`
    },
    {
      a: `Wait, listen carefully! Aage kuch unexpected twist wait kar raha hai hamara!`,
      b: `Main check karke aata hoon boss! Ek second me gaya aur ek second me wapas!`
    },
    {
      a: `Kamaal kar diya dost! Teri speed aur confidence ka koi tod hi nahi hai!`,
      b: `Haha! Aur tere jaise loyal dost ke saath hone se mera confidence double ho jata hai, ${charA}!`
    },
    {
      a: `Now is the golden moment! Saath milkar aage badhte hain!`,
      b: `Ready when you are, buddy! Let's go and conquer this stage!`
    },
    {
      a: `We did it, ${charB}! Dekha, teamwork aur friendship se sab possible hota hai!`,
      b: `Super hit blockbuster ho gaya bro! Ab grand celebration toh banta hai boss!`
    }
  ];

  return beats.length >= 2 ? [...beats, ...coreBeats] : coreBeats;
}

function buildEnglishDialogueBeats(charA, charB, sentences, themeText) {
  const beats = [];

  if (sentences.length >= 2) {
    for (let i = 0; i < sentences.length; i += 2) {
      const s1 = sentences[i] || "";
      const s2 = sentences[i + 1] || "";
      beats.push({
        a: `Look ${charB}! ${s1} See what is unfolding right before us!`,
        b: s2 ? `Indeed ${charA}! ${s2} I have our back every step of the way!` : `Right beside you, ${charA}! Let's push forward together!`
      });
    }
  }

  const coreBeats = [
    {
      a: `Look across our path, ${charB}! Here begins our magnificent journey together!`,
      b: `I can hardly believe our eyes, ${charA}! The surroundings are absolutely breathtaking!`
    },
    {
      a: `Take a deep breath and listen. Can you feel the adventurous energy calling to us?`,
      b: `Yes! Every instinct tells me that something truly extraordinary is waiting just ahead!`
    },
    {
      a: `We must stay sharp and keep our focus. The greatest discoveries always test our courage!`,
      b: `Don't worry, ${charA}! With your incredible strength and my lightning wit, we can solve any puzzle!`
    },
    {
      a: `Behold! Right in front of us lies the heart of this adventure!`,
      b: `Incredible! The legends did not exaggerate its wonder and beauty one bit!`
    },
    {
      a: `Now is our moment. Step forward with me, and let us combine our powers!`,
      b: `Ready when you are, ${charA}! One... two... three, forward!`
    },
    {
      a: `We did it, ${charB}! Look at how brightly the way forward has opened up!`,
      b: `Hahaha! There is no challenge too difficult when true companions stand side by side!`
    },
    {
      a: `Today showed me that greatness is not about walking alone, but lifting each other up.`,
      b: `And wherever destiny leads our next journey, I know we will triumph together, ${charA}!`
    },
    {
      a: `Here is to our victory and the untold adventures awaiting beyond the horizon!`,
      b: `Lead the way, my friend! The greatest chapter of our story has only just begun!`
    }
  ];

  return beats.length >= 2 ? [...beats, ...coreBeats] : coreBeats;
}

// =====================================================
// SCRIPT PARSING & TIMELINE SYNCHRONIZATION
// =====================================================
function parseScreenplayText(text, targetSeconds) {
  if (!text) {
    state.scenes = [];
    populateNLETimeline([]);
    renderStoryboardCards();
    return [];
  }

  const lines = text.split("\n");
  const parsedScenes = [];
  let cumulativeTime = 0;
  let discoveredSpeakers = [];

  lines.forEach((line) => {
    line = line.trim();
    if (!line || line.startsWith("//")) return;

    let speaker = state.charA.name;
    let dialogue = line;

    // Matches [Speaker]: Dialogue in any script (including Hindi Devanagari with vowels/matras)
    const match = line.match(/^\[?([^\]:：]+)\]?\s*[:：]\s*(.+)$/);
    if (match) {
      speaker = match[1].replace(/[\[\]]/g, '').trim();
      dialogue = match[2].trim();
    }

    if (dialogue.length < 3) return;

    if (!discoveredSpeakers.includes(speaker)) {
      discoveredSpeakers.push(speaker);
    }

    const words = dialogue.split(/\s+/).filter(Boolean).length;
    const baseDuration = Math.max(4.0, (words / 2.2) + 2.0);

    const imgIndex = parsedScenes.length;
    const sceneUrl = getThematicSceneUrl(imgIndex);
    const sceneElem = getThematicSceneImage(imgIndex);

    parsedScenes.push({
      index: parsedScenes.length,
      speaker: speaker,
      text: dialogue,
      duration: baseDuration,
      startTime: cumulativeTime,
      endTime: cumulativeTime + baseDuration,
      visualPrompt: '',
      imageUrl: sceneUrl,
      imageElement: sceneElem,
      imageLoaded: true,
      audioSrc: `assets/audio/scene_${(imgIndex % 4) + 1}.mp3`,
      audioBlobUrl: null
    });

    cumulativeTime += baseDuration;
  });

  // Tightly synchronize each scene duration with its dialogue audio track duration + 0.7s natural reaction!
  // This completely eliminates the 15-second dead freeze / silence where the character stood still.
  const audioDurations = [5.2, 5.8, 5.6, 5.4];
  let runningClock = 0;
  parsedScenes.forEach(s => {
    const sceneAudDur = audioDurations[s.index % audioDurations.length];
    s.duration = sceneAudDur;
    s.startTime = runningClock;
    s.endTime = runningClock + sceneAudDur;
    runningClock += sceneAudDur;
  });
  cumulativeTime = runningClock;
  state.totalDuration = cumulativeTime;

  // Assign discovered speakers dynamically
  if (discoveredSpeakers.length >= 1 && state.charA.name !== discoveredSpeakers[0]) {
    state.charA.name = discoveredSpeakers[0];
    const archA = getCharacterArchetype(discoveredSpeakers[0]);
    state.charA.species = archA;
    state.charA.scale = getArchetypeScale(archA);
    const colA = getArchetypeColors(archA);
    state.charA.color = colA.primary;
    state.charA.outfitColor = colA.outfit;
    state.charA.skinColor = colA.skin;
    if (DOM.charAName) DOM.charAName.value = discoveredSpeakers[0];
    if (DOM.charAType) DOM.charAType.value = archA;
    if (DOM.trackLabelCharA) DOM.trackLabelCharA.textContent = discoveredSpeakers[0].toUpperCase();
    if (DOM.labelSpeakerA) DOM.labelSpeakerA.textContent = `${discoveredSpeakers[0]} (Listening)`;
  }
  if (discoveredSpeakers.length >= 2 && state.charB.name !== discoveredSpeakers[1]) {
    state.charB.name = discoveredSpeakers[1];
    const archB = getCharacterArchetype(discoveredSpeakers[1]);
    state.charB.species = archB;
    state.charB.scale = getArchetypeScale(archB);
    const colB = getArchetypeColors(archB);
    state.charB.color = colB.primary;
    state.charB.outfitColor = colB.outfit;
    state.charB.skinColor = colB.skin;
    if (DOM.charBName) DOM.charBName.value = discoveredSpeakers[1];
    if (DOM.charBType) DOM.charBType.value = archB;
    if (DOM.trackLabelCharB) DOM.trackLabelCharB.textContent = discoveredSpeakers[1].toUpperCase();
    if (DOM.labelSpeakerB) DOM.labelSpeakerB.textContent = `${discoveredSpeakers[1]} (Listening)`;
  }
  renderCharacterPreviews();

  state.scenes = parsedScenes;
  state.totalDuration = cumulativeTime;
  if (DOM.durationTime) DOM.durationTime.textContent = formatHMS(cumulativeTime);

  populateNLETimeline(parsedScenes);
  buildSceneReelCards(parsedScenes);
  renderStoryboardCards();
  return parsedScenes;
}

function renderStoryboardCards() {
  const scroller = DOM.storyboardScenesScroller;
  const fullList = DOM.storyboardFullList;
  if (!scroller && !fullList) return;

  if (DOM.sbCountBadge) {
    DOM.sbCountBadge.textContent = `${state.scenes.length} Scenes (${formatHMS(state.totalDuration)})`;
  }

  if (state.scenes.length === 0) {
    if (scroller) {
      scroller.innerHTML = `
        <div class="sb-empty-state">
          <span>✨</span>
          <p>Click <strong>"Generate VidoNova AI Video"</strong> to automatically generate timed dialogue scenes.</p>
        </div>
      `;
    }
    if (fullList) {
      fullList.innerHTML = `<div class="empty-gallery-state">Generate a video to view and edit detailed scene blocks.</div>`;
    }
    return;
  }

  // Render cards for Quick Scroller
  if (scroller) {
    scroller.innerHTML = '';
    state.scenes.forEach(scene => {
      const isCharA = scene.speaker.toLowerCase().includes(state.charA.name.toLowerCase());
      const item = document.createElement('div');
      item.className = 'sb-scene-item';
      item.dataset.index = scene.index;
      item.innerHTML = `
        <div class="sb-scene-header">
          <span class="sb-speaker-chip ${isCharA ? 'chara' : 'charb'}">
            ${isCharA ? '👤' : '👥'} ${escapeHTML(scene.speaker)}
          </span>
          <span class="sb-time-badge">${formatHMS(scene.startTime)} - ${formatHMS(scene.endTime)} (${scene.duration.toFixed(1)}s)</span>
        </div>
        <div class="sb-scene-body">
          ${scene.imageUrl ? `<img src="${scene.imageUrl}" class="sb-scene-thumb" alt="Scene #${scene.index + 1}">` : `<div class="sb-thumb-placeholder">🎨</div>`}
          <div class="sb-dialogue-text" contenteditable="true" title="Click to edit dialogue">${escapeHTML(scene.text)}</div>
        </div>
        <div class="sb-scene-footer">
          <span class="sb-scene-tag">Scene #${scene.index + 1}</span>
          <button type="button" class="btn-sb-listen" data-index="${scene.index}">🔊 Audition</button>
        </div>
      `;

      // Live dialogue inline edit listener
      const textDiv = item.querySelector('.sb-dialogue-text');
      textDiv.addEventListener('input', () => {
        scene.text = textDiv.innerText.trim();
        // Update raw script text
        syncScriptFromScenes();
        if (state.currentTime >= scene.startTime && state.currentTime <= scene.endTime) {
          renderFrame(state.currentTime);
        }
      });

      // Audition button listener
      const listenBtn = item.querySelector('.btn-sb-listen');
      listenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playSceneDialogueAudio(scene);
      });

      // Click card to jump to scene
      item.addEventListener('click', (e) => {
        if (e.target === textDiv || e.target === listenBtn) return;
        seekTo(scene.startTime);
        renderFrame(scene.startTime);
      });

      scroller.appendChild(item);
    });
  }

  // Render cards for Full Storyboard Tab
  if (fullList) {
    fullList.innerHTML = '';
    state.scenes.forEach(scene => {
      const isCharA = scene.speaker.toLowerCase().includes(state.charA.name.toLowerCase());
      const fullItem = document.createElement('div');
      fullItem.className = 'sb-scene-item';
      fullItem.innerHTML = `
        <div class="sb-scene-header">
          <span class="sb-speaker-chip ${isCharA ? 'chara' : 'charb'}">
            ${isCharA ? '👤' : '👥'} Scene #${scene.index + 1}: ${escapeHTML(scene.speaker)}
          </span>
          <span class="sb-time-badge">${formatHMS(scene.startTime)} - ${formatHMS(scene.endTime)} • ${scene.duration.toFixed(1)}s</span>
        </div>
        <div class="sb-scene-body">
          ${scene.imageUrl ? `<img src="${scene.imageUrl}" class="sb-scene-thumb" alt="Scene #${scene.index + 1}">` : `<div class="sb-thumb-placeholder">🎨</div>`}
          <div class="sb-dialogue-text" contenteditable="true">${escapeHTML(scene.text)}</div>
        </div>
        <div class="sb-scene-footer">
          <span>Speaker: <strong>${escapeHTML(scene.speaker)}</strong></span>
          <button type="button" class="btn-sb-listen" data-index="${scene.index}">🔊 Listen to Voice</button>
        </div>
      `;

      const textDiv = fullItem.querySelector('.sb-dialogue-text');
      textDiv.addEventListener('input', () => {
        scene.text = textDiv.innerText.trim();
        syncScriptFromScenes();
      });

      const listenBtn = fullItem.querySelector('.btn-sb-listen');
      listenBtn.addEventListener('click', () => playSceneDialogueAudio(scene));

      fullList.appendChild(fullItem);
    });
  }
}

function syncScriptFromScenes() {
  if (state.scenes.length === 0) return;
  const lines = state.scenes.map(s => `[${s.speaker}]: ${s.text}`);
  DOM.storyInput.value = lines.join("\n");
  updateTextStats();
}

function handleAutoExpandScreenplay() {
  const val = (DOM.storyInput ? DOM.storyInput.value : "").trim();
  if (!val) {
    alert("कृपया Step 1 में अपनी कहानी का विचार (Story Idea) या स्क्रिप्ट लिखें!");
    if (DOM.storyInput) DOM.storyInput.focus();
    return;
  }

  DOM.btnAutoExpand.disabled = true;
  DOM.btnAutoExpand.innerHTML = `<span>⏳</span> Formatting scenes for ${state.targetDurationMinutes} Minutes...`;

  setTimeout(() => {
    vidoNovaProcessScript(val, state.targetDurationMinutes);
    DOM.btnAutoExpand.disabled = false;
    DOM.btnAutoExpand.innerHTML = `<span class="vidonova-sparkle">✨</span> <span>Auto-Format Scenes for ${state.targetDurationMinutes} Minutes</span>`;
  }, 250);
}

function updateTextStats() {
  const text = (DOM.storyInput ? DOM.storyInput.value : "").trim();
  const rawLines = text.split("\n").filter(l => l.trim() && !l.startsWith("//"));
  if (DOM.characterCount) {
    DOM.characterCount.textContent = `${text.length} characters • ${rawLines.length} scenes`;
  }
}

function populateNLETimeline(scenes) {
  DOM.trackLaneScenes.innerHTML = '';
  DOM.trackLaneCharA.innerHTML = '';
  DOM.trackLaneCharB.innerHTML = '';

  if (scenes.length === 0) {
    DOM.trackLaneScenes.innerHTML = '<div class="track-placeholder-text">Scene breakdown blocks will populate here...</div>';
    DOM.trackLaneCharA.innerHTML = '<div class="track-placeholder-text">Character A dialogue segments...</div>';
    DOM.trackLaneCharB.innerHTML = '<div class="track-placeholder-text">Character B dialogue segments...</div>';
    return;
  }

  scenes.forEach(scene => {
    const isCharA = scene.speaker.toLowerCase().includes(state.charA.name.toLowerCase());
    const widthPercent = Math.max(4, (scene.duration / state.totalDuration) * 100);

    // Scene block
    const sceneBlock = document.createElement('div');
    sceneBlock.className = 'nle-clip-block nle-clip-scene';
    sceneBlock.style.width = `${widthPercent}%`;
    sceneBlock.textContent = `Scene ${scene.index + 1}`;
    sceneBlock.addEventListener('click', () => seekTo(scene.startTime));
    DOM.trackLaneScenes.appendChild(sceneBlock);

    // Char A Track
    if (isCharA) {
      const charABlock = document.createElement('div');
      charABlock.className = 'nle-clip-block nle-clip-chara';
      charABlock.style.width = `${widthPercent}%`;
      charABlock.textContent = `🗣️ ${scene.text}`;
      charABlock.addEventListener('click', () => seekTo(scene.startTime));
      DOM.trackLaneCharA.appendChild(charABlock);
    } else {
      const spacer = document.createElement('div');
      spacer.style.width = `${widthPercent}%`;
      DOM.trackLaneCharA.appendChild(spacer);
    }

    // Char B Track
    if (!isCharA) {
      const charBBlock = document.createElement('div');
      charBBlock.className = 'nle-clip-block nle-clip-charb';
      charBBlock.style.width = `${widthPercent}%`;
      charBBlock.textContent = `🗣️ ${scene.text}`;
      charBBlock.addEventListener('click', () => seekTo(scene.startTime));
      DOM.trackLaneCharB.appendChild(charBBlock);
    } else {
      const spacer = document.createElement('div');
      spacer.style.width = `${widthPercent}%`;
      DOM.trackLaneCharB.appendChild(spacer);
    }
  });
}

function buildSceneReelCards(scenes) {
  DOM.sceneReelCards.innerHTML = '';
  scenes.forEach(scene => {
    const card = document.createElement('div');
    card.className = 'reel-card';
    card.innerHTML = `
      <div class="reel-thumb-wrap">
        ${scene.imageUrl ? `<img src="${scene.imageUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;" alt="Scene #${scene.index + 1}">` : ''}
        <span class="reel-badge">#${scene.index + 1}</span>
        <span class="reel-dur">${scene.duration.toFixed(1)}s</span>
      </div>
      <div class="reel-info">
        <div class="reel-speaker">${escapeHTML(scene.speaker)}</div>
        <div class="reel-text">${escapeHTML(scene.text)}</div>
      </div>
    `;
    card.addEventListener('click', () => {
      seekTo(scene.startTime);
      playVideo();
    });
    DOM.sceneReelCards.appendChild(card);
  });
}

// =====================================================
// 5-STEP AUTONOMOUS AI VIDEO ENGINE (VIDONOVA PIPELINE)
// =====================================================

/**
 * 100% Autonomous Video Generator:
 * User only does Step 1 (Input script & click generate).
 * Steps 2-5 run automatically and produce the final ready-to-watch & download video!
 */
async function startFullGenerationPipeline() {
  let script = (DOM.storyInput ? DOM.storyInput.value : "").trim();
  if (!script) {
    alert("कृपया Step 1 में अपनी कहानी का विचार (Story Idea) या स्क्रिप्ट लिखें!");
    if (DOM.storyInput) DOM.storyInput.focus();
    return;
  }

  DOM.btnGenerate.disabled = true;
  DOM.progressContainer.style.display = 'flex';
  DOM.exportBanner.style.display = 'none';
  DOM.emptyPlaceholder.style.display = 'none';
  DOM.cinematicHud.style.display = 'flex';
  stopPlayback();

  try {
    // -----------------------------------------------------------------
    // STEP 1: SCRIPT & CONFIGURATION INPUT (Completed / Initialized)
    // -----------------------------------------------------------------
    update5StepProgress(1, 15, `Step 1/5: Script received • Setting runtime to ${state.targetDurationMinutes} Minutes...`);
    await delay(350);

    // -----------------------------------------------------------------
    // STEP 2: AUTO SCENE BREAKDOWN & TIMED DIALOGUES
    // -----------------------------------------------------------------
    update5StepProgress(2, 38, `Step 2/5: Breaking script into timed scenes with character dialogues...`);
    await delay(350);
    vidoNovaProcessScript(script, state.targetDurationMinutes);

    // -----------------------------------------------------------------
    // STEP 3: GENERATE CUSTOM AI VISUALS FOR EVERY SCENE
    // -----------------------------------------------------------------
    update5StepProgress(3, 65, `Step 3/5: Generating distinct AI scene visuals for ${state.scenes.length} scenes...`);
    await generateAllSceneVisuals(state.scenes, state.genre);
    renderFrame(0);
    await delay(350);

    // -----------------------------------------------------------------
    // STEP 4: SYNCHRONIZED DIALOGUE VOICEOVER & AUDIO
    // -----------------------------------------------------------------
    update5StepProgress(4, 85, `Step 4/5: Synthesizing character voices and speech audio for ${state.scenes.length} scenes...`);
    await prebufferAudio(state.scenes);
    await delay(350);

    // -----------------------------------------------------------------
    // STEP 5: FINAL VIDEO EDITING, CAMERA MOTION & COMPOSITING
    // -----------------------------------------------------------------
    update5StepProgress(5, 100, `Step 5/5: ✨ Final AI Video Edited & Ready! Auto-playing now.`);
    await delay(300);

    // Unlock timeline and transport controls
    DOM.btnPlayPause.disabled = false;
    DOM.btnStop.disabled = false;
    DOM.btnPrevScene.disabled = false;
    DOM.btnNextScene.disabled = false;
    DOM.timelineSlider.disabled = false;

    // Reveal Export & Download Banner directly under the Master Video Player
    DOM.exportBanner.style.display = 'flex';
    const langLabel = state.language === 'hi' ? 'Hindi' : (state.language === 'en' ? 'English' : 'Hinglish');
    const styleLabel = (state.genre || 'children').replace('_', ' ').toUpperCase();
    DOM.exportMetaText.textContent = `1 Complete Video (${state.videoMode === 'portrait' ? '9:16 Shorts' : '16:9 1080p'}) • ${state.scenes.length} Scenes • ${formatHMS(state.totalDuration)} Runtime • ${styleLabel} • Synced ${langLabel} Audio`;
    const statusBadge = document.getElementById('master-movie-status-badge');
    if (statusBadge) statusBadge.textContent = '🎬 Playing Full Movie';

    updateWorkflowTrackerUI(9);

    // Smoothly focus the Master Cinema Theater
    const viewport = document.getElementById('viewport-stage');
    if (viewport) {
      viewport.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Start auto playback of the finished single continuous video
    seekTo(0);
    playVideo();
  } catch (err) {
    console.error("Pipeline generation error:", err);
    alert("Generation error: " + err.message);
  } finally {
    DOM.btnGenerate.disabled = false;
  }
}

/**
 * Updates the 5-step progress card UI with glowing active indicators & completed checkmarks
 */
function update5StepProgress(currentStepNum, percent, statusText) {
  if (DOM.progressPercent) DOM.progressPercent.textContent = `${percent}%`;
  if (DOM.progressBarFill) DOM.progressBarFill.style.width = `${percent}%`;
  if (DOM.progressStatus) DOM.progressStatus.textContent = statusText;

  const steps = [
    { num: 1, el: DOM.step1Script },
    { num: 2, el: DOM.step2Scenes },
    { num: 3, el: DOM.step3Visuals },
    { num: 4, el: DOM.step4Audio },
    { num: 5, el: DOM.step5Video }
  ];

  steps.forEach(s => {
    if (!s.el) return;
    const icon = s.el.querySelector('.step-icon');
    if (s.num < currentStepNum) {
      s.el.classList.remove('active');
      s.el.classList.add('completed');
      if (icon) icon.textContent = '✓';
    } else if (s.num === currentStepNum) {
      if (currentStepNum === 5 && percent === 100) {
        s.el.classList.remove('active');
        s.el.classList.add('completed');
        if (icon) icon.textContent = '✓';
      } else {
        s.el.classList.add('active');
        s.el.classList.remove('completed');
        if (icon) icon.textContent = '⚡';
      }
    } else {
      s.el.classList.remove('active', 'completed');
      if (icon) icon.textContent = `${s.num}`;
    }
  });
}

/**
 * Updates the 9-Step Interactive Workflow Tracker (Steps 1 to 9)
 */
function updateWorkflowTrackerUI(activeCount = 9) {
  const steps = document.querySelectorAll('.workflow-steps-tracker .wf-step');
  steps.forEach((el, idx) => {
    if (idx < activeCount) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

/**
 * Generates rich, context-aware visual prompt featuring characters in action with cinematic lighting
 */
function buildSceneVisualPrompt(scene, artStyle, charA, charB, index) {
  const charAName = (charA && charA.name) || 'Character A';
  const charBName = (charB && charB.name) || 'Character B';
  const textSnippet = (scene.text || '').replace(/\[.*?\]/g, '').trim().substring(0, 110);
  const speaker = scene.speaker || '';

  // Detect specific iconic character roles for optimal Pixar rendering
  const textAndSpeakers = (charAName + ' ' + charBName + ' ' + speaker + ' ' + textSnippet).toLowerCase();
  const hasKrishna = textAndSpeakers.includes('कृष्ण') || textAndSpeakers.includes('krishna') || textAndSpeakers.includes('कान्हा') || textAndSpeakers.includes('गोकुल') || textAndSpeakers.includes('वृंदावन') || textAndSpeakers.includes('माखन') || textAndSpeakers.includes('gokul');
  const hasHanuman = textAndSpeakers.includes('हनुमान') || textAndSpeakers.includes('hanuman') || textAndSpeakers.includes('बजरंग');
  const hasRam = (textAndSpeakers.includes('श्री राम') || textAndSpeakers.includes('shri ram') || textAndSpeakers.includes('रामचंद्र') || textAndSpeakers.includes('रघुवीर') || textAndSpeakers.includes('rama')) && !hasKrishna;
  const hasLion = textAndSpeakers.includes('शेर') || textAndSpeakers.includes('सिंह') || textAndSpeakers.includes('lion');
  const hasMouse = textAndSpeakers.includes('चूहा') || textAndSpeakers.includes('चूहे') || textAndSpeakers.includes('mouse') || textAndSpeakers.includes('rat');
  const hasElephant = textAndSpeakers.includes('हाथी') || textAndSpeakers.includes('गजराज') || textAndSpeakers.includes('elephant');
  const hasSadhu = textAndSpeakers.includes('साधु') || textAndSpeakers.includes('ऋषि') || textAndSpeakers.includes('sage');

  let characterVisualDesc = '';
  if (hasKrishna) {
    if (textAndSpeakers.includes('फल') || textAndSpeakers.includes('टोकरी') || textAndSpeakers.includes('महिला') || textAndSpeakers.includes('गरीब')) {
      characterVisualDesc = 'youthful divine Lord Shri Krishna with golden peacock feather crown and flute happily smiling while an Indian village woman with a wicker fruit basket offers fresh fruits in scenic rustic Gokul village';
    } else if (textAndSpeakers.includes('साथी') || textAndSpeakers.includes('चलो') || textAndSpeakers.includes('कठिनाई') || textAndSpeakers.includes('आगे')) {
      characterVisualDesc = 'divine young Lord Shri Krishna walking alongside his cheerful loyal rural Indian companion friend through a blooming Gokul village meadow with holy white cows in the background, golden morning sunshine';
    } else if (textAndSpeakers.includes('वातावरण') || textAndSpeakers.includes('अद्भुत') || textAndSpeakers.includes('चारों ओर')) {
      characterVisualDesc = 'joyful young Lord Shri Krishna showing the breathtaking beauty of Vrindavan and Yamuna riverbank to his village friend, Kadamba trees, colorful peacocks and lotus flowers in bloom';
    } else {
      characterVisualDesc = 'radiant young Lord Shri Krishna in yellow pitambar silk with golden flute standing joyfully in idyllic ancient Gokul with his friend, expressive faces, warm heavenly golden hour sunlight';
    }
  } else if (hasHanuman && hasRam) {
    if (index === 0 || textAndSpeakers.includes('साधु') || textAndSpeakers.includes('मिलन')) {
      characterVisualDesc = 'Lord Hanuman in disguised sage attire with glowing divine aura respectfully greeting Lord Shri Ram who is holding divine bow with tranquil smile';
    } else if (textAndSpeakers.includes('चरण') || textAndSpeakers.includes('प्रणाम') || textAndSpeakers.includes('दास')) {
      characterVisualDesc = 'Lord Hanuman bowing in reverence at the lotus feet of divine Lord Shri Ram, deep emotional expression, sacred golden forest lighting';
    } else {
      characterVisualDesc = 'Lord Hanuman in majestic golden jewelry with mace standing faithfully beside radiant divine Prince Lord Shri Ram, cinematic hero shot';
    }
  } else if (hasElephant && hasMouse) {
    if (textAndSpeakers.includes('जाल') || textAndSpeakers.includes('शिकारी') || textAndSpeakers.includes('net') || textAndSpeakers.includes('trap')) {
      characterVisualDesc = 'heroic cute tiny mouse cutting rope net with sharp teeth to rescue friendly giant elephant, expressive eyes, dramatic sunlight';
    } else if (textAndSpeakers.includes('पानी') || textAndSpeakers.includes('नदी') || textAndSpeakers.includes('water')) {
      characterVisualDesc = 'friendly gentle giant elephant and cute tiny mouse sharing water at sparkling forest riverbank, joyful expressions';
    } else {
      characterVisualDesc = 'gentle friendly giant elephant and tiny cute mouse walking together along sunny forest trail, joyful animated friendship';
    }
  } else if (hasLion && hasMouse) {
    if (textAndSpeakers.includes('जाल') || textAndSpeakers.includes('net')) {
      characterVisualDesc = 'brave cute tiny mouse chewing hunter rope net to free powerful regal lion, heartwarming gratitude expression';
    } else {
      characterVisualDesc = 'magnificent royal lion with golden mane talking kindly to cute tiny brown mouse, magical forest clearing, expressive faces';
    }
  } else {
    characterVisualDesc = `animated cinema shot of ${charAName} and ${charBName} engaged in expressive dialogue, ${speaker} speaking with emotion, vivid cinematic composition`;
  }

  if (artStyle === '3d_animation') {
    return `breathtaking 3D Disney Pixar animated cinema film still, ${characterVisualDesc}, vibrant enchanted nature landscape, volumetric god rays, detailed Pixar 3D CGI character models, expressive facial animation, Unreal Engine 5 octane render, raytraced cinematic lighting, warm golden tones, masterpiece, 8k resolution`;
  } else if (artStyle === 'cinematic') {
    return `epic cinematic 3D movie still shot, ${characterVisualDesc}, dramatic golden hour lighting, volumetric atmospheric mist, anamorphic lens flare, photorealistic CGI character render, depth of field, movie cinematography masterpiece, 8k`;
  } else if (artStyle === 'anime') {
    return `breathtaking Studio Ghibli and Makoto Shinkai anime movie scene, ${characterVisualDesc}, radiant sunbeams, painterly clouds, lush green scenery, high quality anime character art, emotional cinematic anime masterpiece, 8k`;
  } else if (artStyle === '2d_cartoon') {
    return `vibrant 2D cartoon animation movie still, ${characterVisualDesc}, dynamic animated character poses, bold clean line art, colorful playful background, classic Disney 2D animation style, masterpiece`;
  } else {
    return `whimsical fairytale children's picture book illustration, ${characterVisualDesc}, magical storybook forest, soft warm watercolor and gouache texture, charming character design, masterpiece`;
  }
}

/**
 * STEP 3: Generates or preloads individual AI visual images for EVERY scene!
 */
async function generateAllSceneVisuals(scenes, artStyle) {
  const isLandscape = state.videoMode === 'landscape';
  const width = isLandscape ? 1024 : 576;
  const height = isLandscape ? 576 : 1024;

  // Also fetch character dynamic models
  fetchDynamicCharacterImages(state.charA, state.charB, state.storyTheme);

  const promises = scenes.map(async (scene, i) => {
    const visualPrompt = buildSceneVisualPrompt(scene, artStyle, state.charA, state.charB, i);
    scene.visualPrompt = visualPrompt;

    const seed = Math.abs(stringHashCode(scene.text + i + artStyle)) % 99999;
    const imgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(visualPrompt)}?width=${width}&height=${height}&nologo=true&seed=${seed}`;
    scene.imageUrl = imgUrl;

    // Pick matching thematic asset based on selected visual style & story theme
    let localAssetUrl = getThematicSceneUrl(i);
    const thematicImg = getThematicSceneImage(i);
    const storyCat = detectStoryCategory(state.storyTheme, state.charA, state.charB);

    if (storyCat !== 'ramayana' && storyCat !== 'krishna') {
      if (artStyle === 'cinematic') {
        localAssetUrl = 'assets/images/cinematic_scene_1.jpg';
      } else if (artStyle === '2d_cartoon') {
        localAssetUrl = 'assets/images/cartoon_2d_scene_1.jpg';
      } else if (artStyle === 'anime') {
        localAssetUrl = 'assets/images/anime_scene_1.jpg';
      }
    }
    
    // Check if background already has characters pre-baked (Ramayana preloaded stills)
    const isPreBaked = localAssetUrl.includes('cinematic_ramayana_scene_') || localAssetUrl.includes('ramayana_scene_');

    // Load local asset first so there is NEVER a blank or broken frame
    loadImage(localAssetUrl).then(localImg => {
      if (!scene.imageLoaded || scene.imageElement !== localImg) {
        scene.imageElement = localImg;
        scene.isFullCinematic = isPreBaked;
        scene.imageLoaded = true;
        if (state.currentTime >= scene.startTime && state.currentTime <= scene.endTime) {
          renderFrame(state.currentTime);
        }
      }
    }).catch(() => {
      scene.imageElement = thematicImg;
      scene.imageLoaded = true;
      scene.isFullCinematic = isPreBaked;
    });

    // In parallel, fetch fresh online AI generation with character integration
    setTimeout(() => {
      loadImage(imgUrl).then(img => {
        scene.imageElement = img;
        scene.imageLoaded = true;
        scene.isFullCinematic = true;
        if (state.currentTime >= scene.startTime && state.currentTime <= scene.endTime) {
          renderFrame(state.currentTime);
        }
      }).catch(e => {
        // Fallback to local asset remains active
      });
    }, i * 200);
  });

  await Promise.all(promises);
  renderStoryboardCards();
  buildSceneReelCards(scenes);
}

/**
 * Synthesizes vocal acoustic dialogue audio buffer for Web Audio & MediaRecorder export
 */
function createSynthesizedDialogueBuffer(text, isCharA, isNarrator, durationSec) {
  if (!state.audioContext) return null;
  const sampleRate = state.audioContext.sampleRate || 44100;
  const numFrames = Math.max(sampleRate * 2, Math.round(sampleRate * durationSec));
  // Clean silent buffer - eliminates all harsh electronic buzzer noise
  const buffer = state.audioContext.createBuffer(2, numFrames, sampleRate);
  return buffer;
}

/**
 * STEP 4: Prepares and buffers speech audio & synthesis voices for each dialogue scene
 */
async function prebufferAudio(scenes) {
  if (!scenes || scenes.length === 0) return;

  // 1. Warm up browser SpeechSynthesis
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.getVoices();
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    } catch (e) {}
  }

  // 2. Initialize Web Audio Context
  try {
    initAudioContext();
  } catch (e) {}

  // 3. Reset audio cache for each scene
  scenes.forEach(scene => {
    scene.audioBlobUrl = null;
    scene.audioBuffer = null;
    scene.cachedAudio = null;
  });

  const apiKey = (DOM.elevenlabsKey && DOM.elevenlabsKey.value.trim()) || '';

  if (apiKey && state.voiceEngine === 'elevenlabs') {
    for (const scene of scenes) {
      const spkLower = (scene.speaker || '').toLowerCase();
      const isNarrator = spkLower.includes("narrator") || spkLower.includes("सूत्रधार") || spkLower.includes("कथावाचक");
      const isCharA = !isNarrator && (
        spkLower.includes(state.charA.name.toLowerCase()) ||
        spkLower.includes("हाथी") ||
        spkLower.includes("हनुमान") ||
        spkLower.includes("राम") ||
        spkLower.includes("शेर") ||
        spkLower.includes("char a")
      );

      let voiceId = isNarrator
        ? ((DOM.elevenlabsNarratorId && DOM.elevenlabsNarratorId.value) || "21m00Tcm4TlvDq8ikWAM")
        : (isCharA
            ? ((DOM.elevenlabsVoiceId && DOM.elevenlabsVoiceId.value) || "pNInz6obpgDQGcFmaJgB")
            : ((DOM.elevenlabsVoiceBId && DOM.elevenlabsVoiceBId.value) || "TxGEqnHWrfWFTfGW9XjX"));

      try {
        const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': apiKey
          },
          body: JSON.stringify({
            text: scene.text.replace(/\[.*?\]/g, '').trim(),
            model_id: "eleven_multilingual_v2",
            voice_settings: { stability: 0.5, similarity_boost: 0.75 }
          })
        });

        if (res.ok) {
          const arrayBuffer = await res.arrayBuffer();
          if (arrayBuffer && arrayBuffer.byteLength > 200 && state.audioContext) {
            try {
              scene.audioBuffer = await state.audioContext.decodeAudioData(arrayBuffer.slice(0));
              scene.duration = Math.max(3.5, scene.audioBuffer.duration + 0.5);
              const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
              scene.audioBlobUrl = URL.createObjectURL(blob);
              scene.cachedAudio = new Audio(scene.audioBlobUrl);
            } catch (decErr) {
              console.warn("Decode audio error:", decErr);
            }
          }
        } else {
          console.warn(`ElevenLabs status ${res.status}. Using studio neural voice.`);
        }
      } catch (err) {
        console.warn("ElevenLabs fetch error:", err);
      }
      await delay(100);
    }
  }

  // Fallback: If scene does not have an audio buffer, generate synthesized dialogue buffer
  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    const spkLower = (scene.speaker || '').toLowerCase();
    const isNarrator = spkLower.includes("narrator") || spkLower.includes("सूत्रधार");
    const isCharA = !isNarrator && (
      spkLower.includes(state.charA.name.toLowerCase()) ||
      spkLower.includes("हाथी") ||
      spkLower.includes("हनुमान") ||
      spkLower.includes("राम") ||
      spkLower.includes("शेर") ||
      spkLower.includes("char a")
    );

    const minDur = Math.max(3.8, Math.ceil((scene.text || '').length * 0.13));
    scene.duration = Math.max(scene.duration || 4.0, minDur);

    if (!scene.audioBuffer && state.audioContext) {
      scene.audioBuffer = createSynthesizedDialogueBuffer(scene.text, isCharA, isNarrator, scene.duration);
    }
  }

  // Recalculate timeline so all scenes, dialogues & subtitles are 100% synchronized
  let timeline = 0;
  scenes.forEach((s, idx) => {
    s.index = idx;
    s.startTime = timeline;
    timeline += s.duration;
    s.endTime = timeline;
  });
  state.totalDuration = timeline;

  await delay(150);
}

/**
 * Creates high-aesthetic procedural scene canvas artwork (Clean environment backdrop without duplicate characters)
 */
function createProceduralSceneCanvas(scene, artStyle, width = 1280, height = 720) {
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  const pctx = c.getContext('2d');
  const scIdx = scene.index || 0;

  // 1. VIBRANT DISNEY ENCHANTED SKY (Luminous Golden Hour / Midday Glow)
  const skyGrad = pctx.createLinearGradient(0, 0, 0, height * 0.72);
  skyGrad.addColorStop(0, '#0284c7');    // Vivid deep azure at zenith
  skyGrad.addColorStop(0.32, '#38bdf8'); // Soft turquoise
  skyGrad.addColorStop(0.68, '#fed7aa'); // Warm peach glow
  skyGrad.addColorStop(1.0, '#fef08a');  // Luminous morning sun horizon
  pctx.fillStyle = skyGrad;
  pctx.fillRect(0, 0, width, height);

  // 2. CELESTIAL SUN & RADIANT VOLUMETRIC GOD RAYS
  const sunX = width * 0.74;
  const sunY = height * 0.22;
  const sunGlow = pctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, width * 0.55);
  sunGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  sunGlow.addColorStop(0.12, 'rgba(254, 240, 138, 0.75)');
  sunGlow.addColorStop(0.35, 'rgba(253, 186, 116, 0.35)');
  sunGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
  pctx.fillStyle = sunGlow;
  pctx.fillRect(0, 0, width, height);

  // Volumetric Sunbeams streaming through the treetops
  pctx.save();
  const rayAngles = [-0.62, -0.42, -0.22, 0.02, 0.25, 0.48];
  for (let r of rayAngles) {
    const rayGrad = pctx.createLinearGradient(sunX, sunY, sunX + Math.cos(r + 1.2) * width, height);
    rayGrad.addColorStop(0, 'rgba(255, 250, 200, 0.22)');
    rayGrad.addColorStop(0.6, 'rgba(255, 245, 180, 0.08)');
    rayGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    pctx.fillStyle = rayGrad;
    pctx.beginPath();
    pctx.moveTo(sunX, sunY);
    pctx.lineTo(sunX + (r - 0.12) * width, height);
    pctx.lineTo(sunX + (r + 0.16) * width, height);
    pctx.closePath();
    pctx.fill();
  }
  pctx.restore();

  // 3. FLUFFY CARTOON CUMULUS CLOUDS WITH GOLDEN RIMS
  pctx.save();
  const clouds = [
    { x: width * 0.18, y: height * 0.15, s: 0.85 },
    { x: width * 0.52, y: height * 0.11, s: 1.15 },
    { x: width * 0.88, y: height * 0.19, s: 0.75 }
  ];
  for (let cl of clouds) {
    pctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
    pctx.beginPath();
    pctx.arc(cl.x, cl.y, 38 * cl.s, 0, Math.PI * 2);
    pctx.arc(cl.x + 32 * cl.s, cl.y - 12 * cl.s, 30 * cl.s, 0, Math.PI * 2);
    pctx.arc(cl.x + 65 * cl.s, cl.y, 35 * cl.s, 0, Math.PI * 2);
    pctx.arc(cl.x + 35 * cl.s, cl.y + 10 * cl.s, 32 * cl.s, 0, Math.PI * 2);
    pctx.fill();
    // Warm golden bottom highlight
    pctx.fillStyle = 'rgba(254, 215, 170, 0.35)';
    pctx.beginPath();
    pctx.ellipse(cl.x + 32 * cl.s, cl.y + 14 * cl.s, 50 * cl.s, 14 * cl.s, 0, 0, Math.PI * 2);
    pctx.fill();
  }
  pctx.restore();

  // 4. DISTANT MISTY MOUNTAIN RIDGES (Purple & Teal Layers)
  pctx.fillStyle = 'rgba(67, 56, 202, 0.35)'; // Far Indigo
  pctx.beginPath();
  pctx.moveTo(0, height);
  pctx.lineTo(0, height * 0.52);
  for (let x = 0; x <= width; x += 100) {
    pctx.lineTo(x, height * 0.49 + Math.sin(x * 0.005 + scIdx * 1.8) * 45);
  }
  pctx.lineTo(width, height);
  pctx.closePath();
  pctx.fill();

  pctx.fillStyle = 'rgba(15, 118, 110, 0.48)'; // Mid Emerald Ridge
  pctx.beginPath();
  pctx.moveTo(0, height);
  pctx.lineTo(0, height * 0.62);
  for (let x = 0; x <= width; x += 75) {
    pctx.lineTo(x, height * 0.58 + Math.cos(x * 0.007 + scIdx * 2.5) * 32);
  }
  pctx.lineTo(width, height);
  pctx.closePath();
  pctx.fill();

  // 5. SPARKLING ENCHANTED FOREST STREAM (Flowing from Midground to Foreground)
  const riverGrad = pctx.createLinearGradient(width * 0.45, height * 0.60, width * 0.62, height);
  riverGrad.addColorStop(0, '#0284c7');
  riverGrad.addColorStop(0.5, '#06b6d4');
  riverGrad.addColorStop(1, '#38bdf8');
  pctx.fillStyle = riverGrad;
  pctx.beginPath();
  pctx.moveTo(width * 0.44, height * 0.62);
  pctx.bezierCurveTo(width * 0.48, height * 0.72, width * 0.52, height * 0.82, width * 0.58, height);
  pctx.lineTo(width * 0.72, height);
  pctx.bezierCurveTo(width * 0.64, height * 0.82, width * 0.56, height * 0.72, width * 0.52, height * 0.62);
  pctx.closePath();
  pctx.fill();

  // Sparkling Water Caustic Highlights & Ripples
  pctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
  pctx.lineWidth = 2.5;
  for (let w = 0; w < 6; w++) {
    const wy = height * (0.66 + w * 0.055);
    const wx = width * (0.47 + w * 0.022);
    pctx.beginPath();
    pctx.arc(wx, wy, 16 + w * 4, -0.4, 0.8);
    pctx.stroke();
  }

  // Smooth Riverbed Stones
  pctx.fillStyle = '#64748b';
  pctx.beginPath();
  pctx.ellipse(width * 0.46, height * 0.72, 14, 8, -0.2, 0, Math.PI * 2);
  pctx.ellipse(width * 0.65, height * 0.84, 18, 10, 0.3, 0, Math.PI * 2);
  pctx.fill();
  pctx.fillStyle = '#10b981'; // Moss on stone
  pctx.beginPath();
  pctx.ellipse(width * 0.46, height * 0.71, 10, 5, -0.2, 0, Math.PI * 2);
  pctx.fill();

  // 6. GRAND ENCHANTED ANCIENT TREES (Framing Stage Left & Right)
  // Left Ancient Banyan / Oak Tree
  const trunkGrad = pctx.createLinearGradient(0, 0, 160, 0);
  trunkGrad.addColorStop(0, '#451a03');
  trunkGrad.addColorStop(0.5, '#78350f');
  trunkGrad.addColorStop(1, '#92400e');
  pctx.fillStyle = trunkGrad;
  pctx.beginPath();
  pctx.moveTo(-30, height);
  pctx.quadraticCurveTo(70, height * 0.65, 50, height * 0.35);
  pctx.lineTo(130, height * 0.35);
  pctx.quadraticCurveTo(150, height * 0.68, 110, height);
  pctx.closePath();
  pctx.fill();

  // Hanging Jungle Vines with Pink Blossoms
  pctx.strokeStyle = '#15803d';
  pctx.lineWidth = 3.5;
  pctx.beginPath();
  pctx.moveTo(70, height * 0.38);
  pctx.quadraticCurveTo(85, height * 0.54, 75, height * 0.68);
  pctx.moveTo(115, height * 0.42);
  pctx.quadraticCurveTo(135, height * 0.58, 125, height * 0.74);
  pctx.stroke();
  pctx.fillStyle = '#f472b6'; // Little blossoms
  pctx.beginPath();
  pctx.arc(77, height * 0.55, 4.5, 0, Math.PI * 2);
  pctx.arc(132, height * 0.62, 5, 0, Math.PI * 2);
  pctx.fill();

  // Right Framing Tree
  pctx.fillStyle = trunkGrad;
  pctx.beginPath();
  pctx.moveTo(width - 40, height);
  pctx.quadraticCurveTo(width - 90, height * 0.65, width - 70, height * 0.35);
  pctx.lineTo(width + 20, height * 0.35);
  pctx.lineTo(width + 30, height);
  pctx.closePath();
  pctx.fill();

  // Voluminous Lush Green Canopies (Layered Fluffy Disney Foliage)
  const canopies = [
    { x: 60, y: height * 0.28, r: 120, col: '#15803d' },
    { x: 140, y: height * 0.22, r: 105, col: '#16a34a' },
    { x: 30, y: height * 0.18, r: 90, col: '#22c55e' },
    { x: width - 80, y: height * 0.26, r: 115, col: '#15803d' },
    { x: width - 15, y: height * 0.18, r: 95, col: '#16a34a' },
    { x: width - 130, y: height * 0.22, r: 85, col: '#22c55e' }
  ];
  for (let cp of canopies) {
    pctx.fillStyle = cp.col;
    pctx.beginPath();
    pctx.arc(cp.x, cp.y, cp.r, 0, Math.PI * 2);
    pctx.fill();
    // Sunlit top highlight
    pctx.fillStyle = 'rgba(254, 240, 138, 0.25)';
    pctx.beginPath();
    pctx.arc(cp.x, cp.y - cp.r * 0.25, cp.r * 0.75, 0, Math.PI * 2);
    pctx.fill();
  }

  // 7. ROLLING EMERALD MEADOW & FOREST FLOOR (Stage Ground)
  const groundGrad = pctx.createLinearGradient(0, height * 0.72, 0, height);
  groundGrad.addColorStop(0, '#16a34a'); // Vibrant spring green
  groundGrad.addColorStop(0.4, '#15803d'); // Deep emerald
  groundGrad.addColorStop(1, '#14532d'); // Rich woodland floor
  pctx.fillStyle = groundGrad;
  pctx.beginPath();
  pctx.moveTo(0, height);
  pctx.lineTo(0, height * 0.76);
  for (let x = 0; x <= width; x += 50) {
    pctx.lineTo(x, height * 0.74 + Math.cos(x * 0.007 + scIdx * 2.8) * 14);
  }
  pctx.lineTo(width, height);
  pctx.closePath();
  pctx.fill();

  // 8. BLOOMING WILDFLOWER MEADOWS (Daisies, Poppies, Buttercups, Bluebells)
  const flowerColors = ['#ef4444', '#f59e0b', '#ffffff', '#a855f7', '#38bdf8', '#ec4899'];
  for (let fx = 35; fx < width - 35; fx += 38) {
    const fy = height * 0.76 + Math.cos(fx * 0.007 + scIdx * 2.8) * 14 + (Math.sin(fx * 0.03) * 18);
    if (fy > height - 15) continue;
    // Green Stem
    pctx.strokeStyle = '#15803d';
    pctx.lineWidth = 1.8;
    pctx.beginPath();
    pctx.moveTo(fx, fy + 8);
    pctx.lineTo(fx, fy);
    pctx.stroke();
    // Colorful Petals
    const col = flowerColors[(Math.floor(fx / 38)) % flowerColors.length];
    pctx.fillStyle = col;
    pctx.beginPath();
    pctx.arc(fx - 3, fy - 2, 3.2, 0, Math.PI * 2);
    pctx.arc(fx + 3, fy - 2, 3.2, 0, Math.PI * 2);
    pctx.arc(fx, fy - 5, 3.2, 0, Math.PI * 2);
    pctx.fill();
    // Golden Center Dot
    pctx.fillStyle = '#fbbf24';
    pctx.beginPath();
    pctx.arc(fx, fy - 2, 2.0, 0, Math.PI * 2);
    pctx.fill();
  }

  // 9. FLOATING GOLDEN LIGHT DUST MOTES
  pctx.fillStyle = 'rgba(255, 255, 200, 0.45)';
  for (let d = 0; d < 18; d++) {
    const dx = (width * 0.25) + ((d * 53 + scIdx * 70) % (width * 0.65));
    const dy = (height * 0.25) + ((d * 37 + scIdx * 45) % (height * 0.50));
    pctx.beginPath();
    pctx.arc(dx, dy, 2.2 + (d % 3), 0, Math.PI * 2);
    pctx.fill();
  }

  return c;
}

// -----------------------------------------------------
// CANVAS RENDERING & CINEMATIC COMPOSITOR (STEP 5)
// -----------------------------------------------------
function renderFrame(time) {
  if (state.scenes.length === 0) return;

  const width = DOM.canvas.width;
  const height = DOM.canvas.height;
  const now = performance.now();

  ctx.clearRect(0, 0, width, height);

  let activeScene = state.scenes.find(s => time >= s.startTime && time < s.endTime);
  if (!activeScene) activeScene = state.scenes[state.scenes.length - 1];

  const localTime = Math.max(0, time - activeScene.startTime);
  const spkLower = (activeScene.speaker || "").toLowerCase();
  const isCharA = spkLower.includes(state.charA.name.toLowerCase()) || spkLower.includes("हाथी") || spkLower.includes("elephant") || spkLower.includes("जंबो");

  // If a 3rd character is speaking, dynamically adapt charB to that speaker
  if (!isCharA) {
    const speakerArch = getCharacterArchetype(activeScene.speaker);
    const cleanSpkName = activeScene.speaker.replace(/\[|\]/g, '').trim();
    if (state.charB.species !== speakerArch || state.charB.name !== cleanSpkName) {
      state.charB.name = cleanSpkName;
      state.charB.species = speakerArch;
      const cColors = getArchetypeColors(speakerArch);
      state.charB.color = cColors.primary;
      state.charB.outfitColor = cColors.outfit;
      state.charB.skinColor = cColors.skin;
      state.charB.scale = getArchetypeScale(speakerArch);
    }
  }

  // Dynamic staging, walking trajectories, and animated choreography across scenes:
  const scIdx = (activeScene.index || 0) % 4;

  if (scIdx === 0) {
    // Scene 0: Walk onto the forest path from both sides, talking while walking, then meet!
    const walkDuration = 3.8;
    const walkProgress = Math.min(1.0, localTime / walkDuration);
    const easeOut = 1 - Math.pow(1 - walkProgress, 2);
    state.charA.baseX = width * (0.04 + easeOut * 0.31);
    state.charB.baseX = width * (0.96 - easeOut * 0.28);
    state.charA.isWalking = state.isPlaying && (localTime < walkDuration);
    state.charB.isWalking = state.isPlaying && (localTime < walkDuration);
    state.charA.facing = 1;
    state.charB.facing = -1;
    state.charA.scale = 1.05;
    state.charB.scale = 0.95;
  } else if (scIdx === 1) {
    // Scene 1: Elephant walks towards crystal stream for first 2.0s, then stands & chats
    const stepDuration = 2.0;
    const stepProg = Math.min(1.0, localTime / stepDuration);
    state.charA.baseX = width * (0.24 + stepProg * 0.06);
    state.charB.baseX = width * 0.68;
    state.charA.isWalking = state.isPlaying && (localTime < stepDuration);
    state.charB.isWalking = false;
    state.charA.facing = 1;
    state.charB.facing = -1;
    state.charA.scale = 1.05;
    state.charB.scale = 0.95;
  } else if (scIdx === 2) {
    // Scene 2: Elephant steps towards fallen log, then lifts with trunk while mouse cheers
    const approachDuration = 1.8;
    const appProg = Math.min(1.0, localTime / approachDuration);
    state.charA.baseX = width * (0.26 + appProg * 0.06);
    state.charB.baseX = width * 0.74;
    state.charA.isWalking = state.isPlaying && (localTime < approachDuration);
    state.charB.isWalking = false;
    state.charA.facing = 1;
    state.charB.facing = -1;
    state.charA.scale = 1.05;
    state.charB.scale = 0.95;
  } else {
    // Scene 3: Sunset meadow celebration stroll - both walk side-by-side!
    const walkSway = state.isPlaying ? Math.sin(time * 0.9) * 18 : 0;
    state.charA.baseX = width * 0.36 + walkSway;
    state.charB.baseX = width * 0.68 + walkSway * 0.85;
    state.charA.isWalking = state.isPlaying;
    state.charB.isWalking = state.isPlaying;
    state.charA.facing = 1;
    state.charB.facing = -1;
    state.charA.scale = 1.05;
    state.charB.scale = 0.95;
  }

  state.charA.baseY = height * 0.81;
  state.charB.baseY = height * 0.82;

  // Update Speaking State for Both Characters
  state.charA.isSpeaking = isCharA;
  state.charB.isSpeaking = !isCharA;

  // Real-time audio analyser reading + speech cadence rhythm for natural mouth visemes
  updateAudioVolume();

  const speechCadence = state.isPlaying ? ((Math.sin(now * 0.024) * 0.5 + 0.5) * (Math.sin(now * 0.009) * 0.35 + 0.65)) : 0;
  const effectiveVolume = Math.max(state.currentSpeechVolume, state.isPlaying ? speechCadence * 0.85 : 0);

  if (state.charA.isSpeaking) {
    state.charA.targetMouthOpen = state.isPlaying ? Math.min(1.0, Math.max(0.20, effectiveVolume * 1.35)) : 0.04;
    state.charB.targetMouthOpen = 0.04;
    DOM.speakerAIndicator.className = "speaker-chip-live speaking";
    DOM.speakerBIndicator.className = "speaker-chip-live";
    DOM.labelSpeakerA.textContent = `${state.charA.name} (Speaking)`;
    DOM.labelSpeakerB.textContent = `${state.charB.name} (Listening)`;
  } else {
    state.charB.targetMouthOpen = state.isPlaying ? Math.min(1.0, Math.max(0.20, effectiveVolume * 1.35)) : 0.04;
    state.charA.targetMouthOpen = 0.04;
    DOM.speakerAIndicator.className = "speaker-chip-live";
    DOM.speakerBIndicator.className = "speaker-chip-live speaking";
    DOM.labelSpeakerA.textContent = `${state.charA.name} (Listening)`;
    DOM.labelSpeakerB.textContent = `${state.charB.name} (Speaking)`;
  }

  // Smooth mouth interpolation
  state.charA.mouthOpen += (state.charA.targetMouthOpen - state.charA.mouthOpen) * 0.38;
  state.charB.mouthOpen += (state.charB.targetMouthOpen - state.charB.mouthOpen) * 0.38;

  // Blinking updates
  updateCharacterBlinks(now, state.charA);
  updateCharacterBlinks(now, state.charB);

  // Apply Director Camera Transform (Smooth zoom/pan towards speaker)
  ctx.save();
  applyCameraDirector(width, height, isCharA, time);

  // 1. DRAW SCENE BACKGROUND SCENERY (WITH SUBTLE KEN BURNS CINEMATIC MOTION)
  drawSceneCinematicVisual(ctx, activeScene, time, localTime, width, height);

  // 2. STAGE CHARACTER OVERLAYS
  // When activeScene is a full cinematic AI visual (featuring characters naturally in the environment),
  // we do NOT draw separate flat puppets on top, preserving the photorealistic movie scene!
  const shouldRenderStagePuppets = !activeScene.isFullCinematic || state.show2dVectorRigs;

  if (shouldRenderStagePuppets) {
    if (state.shadowsEnabled) {
      drawStorybookCharacterShadow(ctx, state.charA.baseX, state.charA.baseY + 22, (state.charA.scale || 1.0) * 190, (state.charA.scale || 1.0) * 48);
      drawStorybookCharacterShadow(ctx, state.charB.baseX, state.charB.baseY + 22, (state.charB.scale || 1.0) * 190, (state.charB.scale || 1.0) * 48);
    }

    // Draw Character A
    drawStorybookAnimatedCharacter(ctx, state.charA, state.charA.species || 'elephant', now, localTime, width, height);

    // Draw Character B
    drawStorybookAnimatedCharacter(ctx, state.charB, state.charB.species || 'mouse', now, localTime, width, height);
  }

  // 3. DRAW ATMOSPHERIC DUST & PARTICLES
  if (state.particlesEnabled) {
    drawAtmosphericParticles(width, height, time);
  }

  ctx.restore();

  // 4. DRAW CINEMATIC SPEAKER SPOTLIGHT OVERLAY (Screen Space - Top Left)
  drawCinematicSpeakerSpotlight(ctx, activeScene, width, height, now);

  // 5. DRAW CINEMATIC SUBTITLES & SPEAKER TAGS AT BOTTOM (Screen Space)
  renderScreenSubtitles(activeScene, width, height);

  // 8. UPDATE HUD ELEMENTS
  DOM.hudSceneIdx.textContent = `SCENE ${activeScene.index + 1} / ${state.scenes.length}`;
  DOM.hudTimer.textContent = `${formatHMS(time)} / ${formatHMS(state.totalDuration)}`;
  DOM.currentTime.textContent = formatHMS(time);

  const percent = state.totalDuration > 0 ? (time / state.totalDuration) * 100 : 0;
  DOM.timelineSlider.value = percent;
}

/**
 * Renders active scene visual with subtle Ken Burns dynamic camera drift & crossfade transitions
 */
function drawSceneCinematicVisual(ctx, scene, time, localTime, width, height) {
  const duration = scene.duration || 4.0;
  const progress = Math.min(1.0, localTime / duration);
  ctx.save();

  // Subtle cinematic Ken Burns drift on full cinematic visuals:
  // Slow gentle push-in (1.0 to 1.06) & slow horizontal pan across the epic landscape!
  let kZoom = 1.0 + 0.05 * progress;
  let kPanX = (progress - 0.5) * 18 * (scene.index % 2 === 0 ? 1 : -1);
  let kPanY = (progress - 0.5) * 6;

  ctx.translate(width / 2 + kPanX, height / 2 + kPanY);
  ctx.scale(kZoom, kZoom);
  ctx.translate(-width / 2, -height / 2);

  // Smooth Crossfade transition from previous scene in the first 0.45s
  const crossfadeDuration = 0.45;
  if (localTime < crossfadeDuration && scene.index > 0) {
    const prevScene = state.scenes[scene.index - 1];
    if (prevScene && prevScene.imageElement) {
      ctx.globalAlpha = 1.0;
      drawImageProp(ctx, prevScene.imageElement, 0, 0, width, height);
      ctx.globalAlpha = localTime / crossfadeDuration;
    }
  }

  if (scene.imageElement && scene.imageElement.complete && scene.imageElement.naturalWidth > 0) {
    drawImageProp(ctx, scene.imageElement, 0, 0, width, height);
  } else {
    const fallbackImg = getThematicSceneImage(scene.index || 0);
    scene.imageElement = fallbackImg;
    scene.imageLoaded = true;
    drawImageProp(ctx, fallbackImg, 0, 0, width, height);
  }

  ctx.restore();
}

/**
 * Realistic Ground Contact Shadow for Storybook Characters
 */
function drawStorybookCharacterShadow(ctx, x, y, width, height) {
  ctx.save();
  ctx.translate(x, y);

  // 1. Deep contact occlusion right under the soles of feet
  const coreAO = ctx.createRadialGradient(0, 0, 2, 0, 0, width * 0.22);
  coreAO.addColorStop(0, 'rgba(15, 23, 42, 0.72)');
  coreAO.addColorStop(0.5, 'rgba(15, 23, 42, 0.42)');
  coreAO.addColorStop(1, 'rgba(15, 23, 42, 0)');
  ctx.fillStyle = coreAO;
  ctx.beginPath();
  ctx.ellipse(0, 0, width * 0.22, height * 0.26, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. Soft dispersed ambient shadow
  const grad = ctx.createRadialGradient(0, 0, 6, 0, 0, width * 0.45);
  grad.addColorStop(0, 'rgba(15, 23, 42, 0.38)');
  grad.addColorStop(0.65, 'rgba(15, 23, 42, 0.14)');
  grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(0, 0, width * 0.45, height * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Universal Animated Storybook Character Renderer
 * Supports Elephant, Mouse, Lion & Monkey animated sprites + procedural fallback for other archetypes
 */
function drawStorybookAnimatedCharacter(c, char, defaultType, now, localTime, width, height) {
  const archetype = char.species || getCharacterArchetype(char.name);

  const isElephant = (archetype === 'elephant');
  const isMouse = (archetype === 'rodent');
  const isLion = (archetype === 'lion');
  const isMonkey = (archetype === 'monkey');
  const isHanuman = (archetype === 'hanuman');
  const isRam = (archetype === 'ram');
  const isKrishna = (archetype === 'krishna');
  const isSathi = (archetype === 'sathi');

  // If user selected non-sprite archetype, fall back to procedural rig
  if (!isElephant && !isMouse && !isLion && !isMonkey && !isHanuman && !isRam && !isKrishna && !isSathi) {
    drawDynamicCartoonCharacter(c, char, now);
    return;
  }

  let spriteObj = charSprites.mouse;
  let spriteW = 220;
  let spriteH = 220;
  let drawOffset = 25;
  let eyeAnchor = { x: 570, y: 325, radius: 12 };
  let mouthAnchor = { x: 670, y: 400 };
  let mouthType = 'mouse';
  let bobFactor = 11;
  let breathFactor = 2.0;

  if (isElephant) {
    spriteObj = charSprites.elephant;
    spriteW = 440;
    spriteH = 440;
    drawOffset = 40;
    eyeAnchor = { x: 595, y: 355, radius: 18 };
    mouthAnchor = { x: 640, y: 490 };
    mouthType = 'elephant';
    bobFactor = 8.5;
    breathFactor = 3.0;
  } else if (isLion) {
    spriteObj = charSprites.lion;
    spriteW = 390;
    spriteH = 390;
    drawOffset = 35;
    eyeAnchor = { x: 535, y: 360, radius: 16 };
    mouthAnchor = { x: 540, y: 485 };
    mouthType = 'lion';
    bobFactor = 9.0;
    breathFactor = 2.8;
  } else if (isMonkey) {
    spriteObj = charSprites.monkey;
    spriteW = 320;
    spriteH = 320;
    drawOffset = 30;
    eyeAnchor = { x: 520, y: 350, radius: 14 };
    mouthAnchor = { x: 525, y: 460 };
    mouthType = 'monkey';
    bobFactor = 10.0;
    breathFactor = 2.2;
  } else if (isHanuman) {
    spriteObj = charSprites.hanuman;
    spriteW = 330;
    spriteH = 440;
    drawOffset = 25;
    eyeAnchor = { x: 512, y: 200, radius: 14 };
    mouthAnchor = { x: 512, y: 247 };
    mouthType = 'human';
    bobFactor = 8.0;
    breathFactor = 2.4;
  } else if (isRam) {
    spriteObj = charSprites.ram;
    spriteW = 330;
    spriteH = 440;
    drawOffset = 25;
    eyeAnchor = { x: 512, y: 200, radius: 14 };
    mouthAnchor = { x: 512, y: 246 };
    mouthType = 'human';
    bobFactor = 7.5;
    breathFactor = 2.0;
  } else if (isKrishna) {
    spriteObj = charSprites.krishna;
    spriteW = 330;
    spriteH = 440;
    drawOffset = 25;
    eyeAnchor = { x: 512, y: 195, radius: 14 };
    mouthAnchor = { x: 512, y: 242 };
    mouthType = 'human';
    bobFactor = 7.5;
    breathFactor = 2.0;
  } else if (isSathi) {
    spriteObj = charSprites.sathi;
    spriteW = 330;
    spriteH = 440;
    drawOffset = 25;
    eyeAnchor = { x: 512, y: 195, radius: 14 };
    mouthAnchor = { x: 512, y: 242 };
    mouthType = 'human';
    bobFactor = 7.5;
    breathFactor = 2.0;
  }

  const isWalking = !!char.isWalking;
  const walkPhase = char.walkPhase || (now * (isElephant ? 0.007 : 0.016));

  // Physics & Animation
  // Walk bobbing (footstep bounce)
  const walkBob = isWalking ? Math.abs(Math.sin(walkPhase * 2)) * bobFactor : 0;
  // Natural idle breathing
  const breath = Math.sin(now * 0.003) * breathFactor;
  // Speaking enthusiasm bounce
  const speechBounce = char.isSpeaking ? Math.sin(now * 0.018) * (isElephant ? 5 : 7.5) * char.mouthOpen : 0;
  // Dynamic forward tilt while walking
  const walkLean = isWalking ? (isElephant ? 0.035 : 0.065) : 0;
  // Conversational head nod / tilt
  const vocalNod = char.isSpeaking ? Math.sin(now * 0.014) * (isElephant ? 0.04 : 0.06) : 0;
  // Subtle squash and stretch during steps
  const squashX = 1 + (isWalking ? Math.sin(walkPhase * 2) * -0.022 : 0);
  const stretchY = 1 + (isWalking ? Math.sin(walkPhase * 2) * 0.03 : 0);

  const x = char.baseX;
  const y = char.baseY + breath + speechBounce - walkBob;

  c.save();
  c.translate(x, y);
  c.scale(char.facing * char.scale * squashX, char.scale * stretchY);
  c.rotate(walkLean + vocalNod);

  const drawX = -spriteW / 2;
  const drawY = -spriteH + drawOffset;

  // Draw the transparent storybook character sprite
  const spriteImg = spriteObj ? spriteObj.img : null;
  if (spriteImg && spriteImg.complete && spriteImg.naturalWidth > 0) {
    c.drawImage(spriteImg, drawX, drawY, spriteW, spriteH);

    // Warm cinematic ambient lighting tint matching the golden sunbeams
    if (isHanuman || isRam || state.genre === '3d_animation') {
      c.save();
      c.globalCompositeOperation = 'source-atop';
      c.fillStyle = 'rgba(251, 191, 36, 0.12)';
      c.fillRect(drawX, drawY, spriteW, spriteH);
      c.restore();
    }
  }

  // --- DYNAMIC LIP-SYNC & FACIAL ARTICULATION OVERLAY ---
  const eyeX = drawX + (eyeAnchor.x / 1024) * spriteW;
  const eyeY = drawY + (eyeAnchor.y / 1024) * spriteH;
  if (char.isBlinking) {
    drawStorybookEyelids(c, eyeX, eyeY, eyeAnchor.radius);
  }

  const mouthX = drawX + (mouthAnchor.x / 1024) * spriteW;
  const mouthY = drawY + (mouthAnchor.y / 1024) * spriteH;
  drawStorybookCharacterMouth(c, mouthX, mouthY, char.mouthOpen, char.isSpeaking, mouthType);

  c.restore();
}

/**
 * Renders Organic Hand-Drawn Animated Lip-Sync Mouth
 */
function drawStorybookCharacterMouth(c, x, y, mouthOpen, isSpeaking, charType) {
  c.save();
  c.translate(x, y);

  if (!isSpeaking || mouthOpen < 0.08) {
    // Natural closed smiling curve matching storybook illustration
    c.strokeStyle = '#2d1b14';
    c.lineWidth = (charType === 'elephant' || charType === 'lion') ? 3.0 : 2.2;
    c.lineCap = 'round';
    c.beginPath();
    if (charType === 'elephant') {
      c.moveTo(-16, -2);
      c.quadraticCurveTo(0, 8, 18, 0);
    } else if (charType === 'lion') {
      c.moveTo(-14, -2);
      c.quadraticCurveTo(0, 9, 14, -2);
    } else if (charType === 'monkey') {
      c.moveTo(-12, -2);
      c.quadraticCurveTo(0, 7, 12, -2);
    } else if (charType === 'human') {
      c.strokeStyle = '#7c2d12';
      c.lineWidth = 2.4;
      c.moveTo(-11, -1);
      c.quadraticCurveTo(0, 5, 11, -1);
    } else {
      c.moveTo(-8, -1);
      c.quadraticCurveTo(0, 5, 8, -1);
    }
    c.stroke();
    c.restore();
    return;
  }

  // Active speech articulation
  const openAmt = Math.min(1.0, Math.max(0.12, mouthOpen));
  const isLarge = (charType === 'elephant' || charType === 'lion');
  const isHuman = (charType === 'human');
  const w = isLarge ? (22 + openAmt * 8) : (isHuman ? (13 + openAmt * 6) : (11 + openAmt * 5));
  const h = isLarge ? (8 + openAmt * 20) : (isHuman ? (5 + openAmt * 12) : (4 + openAmt * 12));

  // 1. Dark Mouth Cavity (warm deep mahogany/crimson)
  const mouthGrad = c.createRadialGradient(0, h * 0.2, 2, 0, h * 0.3, h);
  mouthGrad.addColorStop(0, '#581c1c');
  mouthGrad.addColorStop(0.7, '#2b0c0c');
  mouthGrad.addColorStop(1, '#1a0505');
  c.fillStyle = mouthGrad;
  c.beginPath();
  c.ellipse(0, h * 0.25, w * 0.85, h * 0.75, 0, 0, Math.PI * 2);
  c.fill();

  // 2. Upper Teeth / Tusk Glint
  c.fillStyle = '#ffffff';
  c.beginPath();
  if (charType === 'mouse') {
    c.rect(-3.5, -h * 0.35, 3.2, h * 0.45);
    c.rect(0.3, -h * 0.35, 3.2, h * 0.45);
  } else {
    c.ellipse(0, -h * 0.25, w * 0.65, h * 0.28, 0, 0, Math.PI);
  }
  c.fill();

  // 3. Lively Animated Pink Tongue at Bottom
  const tongueGrad = c.createRadialGradient(0, h * 0.55, 2, 0, h * 0.55, h * 0.6);
  tongueGrad.addColorStop(0, '#fb7185');
  tongueGrad.addColorStop(0.8, '#f43f5e');
  tongueGrad.addColorStop(1, '#e11d48');
  c.fillStyle = tongueGrad;
  c.beginPath();
  c.ellipse(0, h * 0.45, w * 0.62, h * 0.42, 0, 0, Math.PI);
  c.fill();

  // 4. Delicate Ink Storybook Outline
  c.strokeStyle = '#2d1b14';
  c.lineWidth = isLarge ? 3.0 : 2.0;
  c.lineCap = 'round';
  c.lineJoin = 'round';
  c.beginPath();
  c.ellipse(0, h * 0.25, w * 0.85, h * 0.75, 0, 0, Math.PI * 2);
  c.stroke();

  // Soft Rosy Lip corners
  c.fillStyle = 'rgba(244, 63, 94, 0.4)';
  c.beginPath();
  c.arc(-w * 0.82, 0, 2.5, 0, Math.PI * 2);
  c.arc(w * 0.82, 0, 2.5, 0, Math.PI * 2);
  c.fill();

  c.restore();
}

function drawStorybookEyelids(ctx, x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = '#2d1b14';
  ctx.lineWidth = Math.max(2.2, scale * 0.16);
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(0, 0, scale * 0.45, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();
  // Delicate eyelashes
  ctx.beginPath();
  ctx.moveTo(scale * 0.35, scale * 0.2);
  ctx.lineTo(scale * 0.52, scale * 0.05);
  ctx.stroke();
  ctx.restore();
}

/**
 * Renders real-time character lip-sync & talking mouth animations on top of storybook characters
 */
function drawStorybookCharacterLipSync(ctx, scene, width, height, time, localTime) {
  const sceneIdx = (scene.index || 0) % 4;
  const spkLower = (scene.speaker || "").toLowerCase();
  const isNarrator = spkLower.includes("narrator") || spkLower.includes("सूत्रधार") || spkLower.includes("कथावाचक");
  const isCharA = !isNarrator && (spkLower.includes(state.charA.name.toLowerCase()) || spkLower.includes("हाथी") || spkLower.includes("elephant") || spkLower.includes("जंबो") || spkLower.includes("char a"));

  // High-precision pixel-matched mouth anchors for all 4 storybook scenes
  const anchors = [
    // Scene 1: Elephant walking on forest trail, Mouse beside him with backpack
    {
      elephant: { x: 0.523, y: 0.605, scale: 28, angle: 0.08 },
      mouse:    { x: 0.280, y: 0.716, scale: 12, angle: -0.10 },
      eyes: {
        elephant: { x: 0.495, y: 0.525 },
        mouse:    { x: 0.278, y: 0.702 }
      }
    },
    // Scene 2: Elephant resting by stream, Mouse nestled close
    {
      elephant: { x: 0.355, y: 0.545, scale: 25, angle: 0.05 },
      mouse:    { x: 0.435, y: 0.586, scale: 11, angle: 0.15 },
      eyes: {
        elephant: { x: 0.345, y: 0.498 },
        mouse:    { x: 0.428, y: 0.576 }
      }
    },
    // Scene 3: Elephant lifting fallen tree trunk, Mouse cheering on the right
    {
      elephant: { x: 0.383, y: 0.627, scale: 26, angle: 0.12 },
      mouse:    { x: 0.795, y: 0.720, scale: 13, angle: -0.05 },
      eyes: {
        elephant: { x: 0.360, y: 0.595 },
        mouse:    { x: 0.792, y: 0.692 }
      }
    },
    // Scene 4: Elephant sitting in meadow, Mouse perched on trunk
    {
      elephant: { x: 0.608, y: 0.475, scale: 28, angle: -0.08 },
      mouse:    { x: 0.530, y: 0.305, scale: 12, angle: 0.08 },
      eyes: {
        elephant: { x: 0.648, y: 0.382 },
        mouse:    { x: 0.525, y: 0.284 }
      }
    }
  ];

  const anchor = anchors[sceneIdx];
  if (!anchor) return;

  const now = performance.now();

  // 1. Draw Elephant Lip-Sync
  const elephantX = anchor.elephant.x * width;
  const elephantY = anchor.elephant.y * height;
  const elephantSpeaking = state.isPlaying && isCharA;
  const elephantOpen = elephantSpeaking ? state.charA.mouthOpen : 0.04;
  renderToonMouth(ctx, elephantX, elephantY, anchor.elephant.scale, elephantOpen, elephantSpeaking, 'elephant', anchor.elephant.angle, now, width);

  // 2. Draw Mouse Lip-Sync
  const mouseX = anchor.mouse.x * width;
  const mouseY = anchor.mouse.y * height;
  const mouseSpeaking = state.isPlaying && !isCharA && !isNarrator;
  const mouseOpen = mouseSpeaking ? state.charB.mouthOpen : 0.04;
  renderToonMouth(ctx, mouseX, mouseY, anchor.mouse.scale, mouseOpen, mouseSpeaking, 'mouse', anchor.mouse.angle, now, width);

  // 3. Natural Animated Blinking (Blinks naturally every 3.6s for 140ms)
  const isBlinking = (now % 3600) < 140;
  if (isBlinking && anchor.eyes) {
    drawStorybookEyelids(ctx, anchor.eyes.elephant.x * width, anchor.eyes.elephant.y * height, anchor.elephant.scale * 0.9);
    drawStorybookEyelids(ctx, anchor.eyes.mouse.x * width, anchor.eyes.mouse.y * height, anchor.mouse.scale * 0.9);
  }
}

/**
 * Draws an organic, watercolor-styled animated cartoon mouth with teeth, bouncing tongue & syllables
 */
function renderToonMouth(ctx, x, y, baseScale, mouthOpen, isSpeaking, charType, angle, now, screenWidth) {
  const s = baseScale * (screenWidth / 1280);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // When listening or idle, keep the original hand-painted storybook character mouth 100% visible!
  if (!isSpeaking || mouthOpen < 0.12) {
    ctx.restore();
    return;
  }

  // --- ACTIVE SPEAKING MOUTH WITH VISIBLE ANIMATED CAVITY & TONGUE ---
  const op = Math.min(1.0, mouthOpen);
  const w = s * (1.15 + op * 0.45);
  const h = s * (0.45 + op * 0.95);

  // 1. Cheek Glow Puff (Animated breathing glow when talking)
  const cheekPulse = Math.sin(now * 0.018) * 0.15 + 0.35;
  const cheekRadius = s * 0.95;
  const cheekGrad = ctx.createRadialGradient(-s * 0.9, -s * 0.3, 2, -s * 0.9, -s * 0.3, cheekRadius);
  cheekGrad.addColorStop(0, `rgba(251, 113, 133, ${cheekPulse * 0.35})`);
  cheekGrad.addColorStop(1, 'rgba(251, 113, 133, 0)');
  ctx.fillStyle = cheekGrad;
  ctx.beginPath();
  ctx.arc(-s * 0.9, -s * 0.3, cheekRadius, 0, Math.PI * 2);
  ctx.fill();

  // 2. Mouse Whiskers Twitching on speech syllables
  if (charType === 'mouse') {
    const twitch = Math.sin(now * 0.032) * 2.5;
    ctx.strokeStyle = 'rgba(74, 56, 44, 0.75)';
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    // Left side whiskers
    ctx.moveTo(-w * 0.45, -s * 0.05);
    ctx.lineTo(-w * 1.5, -s * 0.3 + twitch);
    ctx.moveTo(-w * 0.45, s * 0.2);
    ctx.lineTo(-w * 1.4, s * 0.4 - twitch);
    // Right side whiskers
    ctx.moveTo(w * 0.45, -s * 0.05);
    ctx.lineTo(w * 1.5, -s * 0.3 - twitch);
    ctx.moveTo(w * 0.45, s * 0.2);
    ctx.lineTo(w * 1.4, s * 0.4 + twitch);
    ctx.stroke();
  }

  // 3. Mouth Cavity Clipping Area
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(-w * 0.5, -s * 0.1);
  ctx.quadraticCurveTo(0, -s * 0.2, w * 0.5, -s * 0.1);
  ctx.bezierCurveTo(w * 0.52, h * 0.92, -w * 0.52, h * 0.92, -w * 0.5, -s * 0.1);
  ctx.closePath();

  // Deep ruby mouth cavity
  const cavityGrad = ctx.createLinearGradient(0, -s * 0.2, 0, h);
  cavityGrad.addColorStop(0, '#2d080e');
  cavityGrad.addColorStop(0.65, '#5c0f1c');
  cavityGrad.addColorStop(1, '#831828');
  ctx.fillStyle = cavityGrad;
  ctx.fill();

  // Clip to inside of mouth
  ctx.clip();

  // 4. Pearly Top Cartoon Teeth
  const toothHeight = Math.min(s * 0.32, h * 0.28);
  ctx.fillStyle = '#fffdfa';
  ctx.beginPath();
  ctx.moveTo(-w * 0.38, -s * 0.18);
  ctx.lineTo(w * 0.38, -s * 0.18);
  ctx.quadraticCurveTo(w * 0.32, toothHeight, 0, toothHeight * 0.95);
  ctx.quadraticCurveTo(-w * 0.32, toothHeight, -w * 0.38, -s * 0.18);
  ctx.closePath();
  ctx.fill();

  // 5. Bouncing Strawberry-Pink Tongue
  const tongueBob = Math.sin(now * 0.02) * s * 0.14;
  const tongueY = h * 0.65 + tongueBob;
  const tongueW = w * 0.42;
  const tongueH = h * 0.54;

  const tongueGrad = ctx.createRadialGradient(0, tongueY + tongueH * 0.2, s * 0.08, 0, tongueY, tongueW);
  tongueGrad.addColorStop(0, '#fda4af');
  tongueGrad.addColorStop(0.5, '#fb7185');
  tongueGrad.addColorStop(1, '#e11d48');
  ctx.fillStyle = tongueGrad;

  ctx.beginPath();
  ctx.ellipse(0, tongueY, tongueW, tongueH, 0, 0, Math.PI * 2);
  ctx.fill();

  // Tongue groove
  ctx.strokeStyle = 'rgba(159, 18, 57, 0.45)';
  ctx.lineWidth = Math.max(1, s * 0.06);
  ctx.beginPath();
  ctx.moveTo(0, tongueY - tongueH * 0.5);
  ctx.lineTo(0, tongueY + tongueH * 0.2);
  ctx.stroke();

  ctx.restore(); // Exit cavity clipping

  // 6. Organic Lip Outline (Matches storybook dark ink lineart)
  ctx.beginPath();
  ctx.moveTo(-w * 0.5, -s * 0.1);
  ctx.quadraticCurveTo(0, -s * 0.2, w * 0.5, -s * 0.1);
  ctx.bezierCurveTo(w * 0.52, h * 0.92, -w * 0.52, h * 0.92, -w * 0.5, -s * 0.1);
  ctx.closePath();
  ctx.strokeStyle = '#382b24';
  ctx.lineWidth = Math.max(2.2, s * 0.14);
  ctx.lineJoin = 'round';
  ctx.stroke();

  // 7. Corner Dimple Ticks
  ctx.beginPath();
  ctx.moveTo(w * 0.48, -s * 0.12);
  ctx.lineTo(w * 0.62, -s * 0.28);
  ctx.moveTo(-w * 0.48, -s * 0.12);
  ctx.lineTo(-w * 0.62, -s * 0.28);
  ctx.stroke();

  // 8. Lower Lip Highlight & Chin Shadow
  ctx.beginPath();
  ctx.arc(0, h * 0.93, w * 0.22, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.strokeStyle = 'rgba(255, 237, 213, 0.45)';
  ctx.lineWidth = Math.max(1.2, s * 0.08);
  ctx.stroke();

  ctx.restore();
}

/**
 * Draws image scaled to cover canvas dimensions without aspect ratio distortion
 */
function drawImageProp(ctx, img, x, y, w, h) {
  const imgW = img.videoWidth || img.naturalWidth || img.width;
  const imgH = img.videoHeight || img.naturalHeight || img.height;
  if (!imgW || !imgH) return;

  const r = Math.min(w / imgW, h / imgH);
  let nw = imgW * r, nh = imgH * r;
  let cx = 0, cy = 0, cw = imgW, ch = imgH;

  if (nw < w) {
    const r2 = w / imgW;
    cw = imgW;
    ch = h / r2;
    cy = (imgH - ch) * 0.5;
  }
  if (nh < h) {
    const r2 = h / imgH;
    ch = imgH;
    cw = w / r2;
    cx = (imgW - cw) * 0.5;
  }

  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
}

function applyCameraDirector(width, height, isCharA, time) {
  let cx = width / 2;
  let cy = height / 2;
  let zoom = 1.0;

  if (state.camMode === 'dynamic') {
    // Focus towards the speaking character smoothly
    const targetX = isCharA ? width * 0.44 : width * 0.56;
    cx = targetX;
    zoom = 1.12;
  } else if (state.camMode === 'chara') {
    cx = width * 0.35;
    zoom = 1.25;
  } else if (state.camMode === 'charb') {
    cx = width * 0.65;
    zoom = 1.25;
  }

  if (state.cameraSwayEnabled) {
    cx += Math.sin(time * 1.2) * 5;
    cy += Math.cos(time * 0.9) * 3;
  }

  ctx.translate(width / 2, height / 2);
  ctx.scale(zoom, zoom);
  ctx.translate(-cx, -cy);
}

// -----------------------------------------------------
// STAGE ENVIRONMENT DRAWING
// -----------------------------------------------------
// -----------------------------------------------------
// DYNAMIC STAGE ENVIRONMENT DRAWING (MULTI-ENVIRONMENT)
// -----------------------------------------------------
function drawStageEnvironment(width, height, time) {
  // If generative AI background image is loaded, draw it!
  if (state.backgroundImg) {
    ctx.drawImage(state.backgroundImg, -100, -50, width + 200, height + 100);
    return;
  }

  const env = (state.stageEnv || 'savannah').toLowerCase();

  if (env === 'spaceship') {
    // Sci-Fi Deep Space Observation Deck
    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.7);
    sky.addColorStop(0, '#020617');
    sky.addColorStop(0.5, '#0f172a');
    sky.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = sky;
    ctx.fillRect(-200, -200, width + 400, height + 400);

    // Glowing Nebula
    const neb = ctx.createRadialGradient(640, 200, 20, 640, 200, 320);
    neb.addColorStop(0, 'rgba(168, 85, 247, 0.45)');
    neb.addColorStop(0.5, 'rgba(6, 182, 212, 0.25)');
    neb.addColorStop(1, 'transparent');
    ctx.fillStyle = neb;
    ctx.fillRect(0, 0, width, height * 0.7);

    // Distant Ringed Planet
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(880, 180, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(254, 215, 170, 0.65)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.ellipse(880, 180, 95, 22, -0.3, 0, Math.PI * 2);
    ctx.stroke();

    // High-Tech Deck Floor
    const floor = ctx.createLinearGradient(0, height * 0.68, 0, height);
    floor.addColorStop(0, '#0f172a');
    floor.addColorStop(0.4, '#1e293b');
    floor.addColorStop(1, '#020617');
    ctx.fillStyle = floor;
    ctx.beginPath();
    ctx.ellipse(width / 2, height * 0.88, width * 0.88, height * 0.36, 0, 0, Math.PI * 2);
    ctx.fill();

    // Neon Floor Grid
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(width / 2, height * 0.88, width * 0.82, height * 0.32, 0, 0, Math.PI * 2);
    ctx.stroke();

  } else if (env === 'forest') {
    // Enchanted Forest
    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.7);
    sky.addColorStop(0, '#064e3b');
    sky.addColorStop(0.5, '#047857');
    sky.addColorStop(1, '#6ee7b7');
    ctx.fillStyle = sky;
    ctx.fillRect(-200, -200, width + 400, height + 400);

    // Ancient Mossy Trees
    ctx.fillStyle = 'rgba(6, 78, 59, 0.7)';
    ctx.beginPath();
    ctx.ellipse(220, height * 0.45, 160, 220, 0, 0, Math.PI * 2);
    ctx.ellipse(1060, height * 0.45, 180, 240, 0, 0, Math.PI * 2);
    ctx.fill();

    // God-rays (Sunbeams)
    const ray = ctx.createLinearGradient(0, 0, width, height);
    ray.addColorStop(0, 'rgba(254, 240, 138, 0.3)');
    ray.addColorStop(1, 'transparent');
    ctx.fillStyle = ray;
    ctx.beginPath();
    ctx.moveTo(400, 0); ctx.lineTo(700, 0); ctx.lineTo(950, height); ctx.lineTo(550, height);
    ctx.fill();

    // Grassy Ground
    const ground = ctx.createLinearGradient(0, height * 0.65, 0, height);
    ground.addColorStop(0, '#047857');
    ground.addColorStop(0.5, '#065f46');
    ground.addColorStop(1, '#064e3b');
    ctx.fillStyle = ground;
    ctx.beginPath();
    ctx.ellipse(width / 2, height * 0.88, width * 0.85, height * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

  } else if (env === 'cybercity') {
    // Neon Cyberpunk City
    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.7);
    sky.addColorStop(0, '#09090b');
    sky.addColorStop(0.6, '#18181b');
    sky.addColorStop(1, '#27272a');
    ctx.fillStyle = sky;
    ctx.fillRect(-200, -200, width + 400, height + 400);

    // Glowing Neon Skyscrapers
    ctx.fillStyle = 'rgba(24, 24, 27, 0.9)';
    ctx.fillRect(120, height * 0.2, 110, height * 0.55);
    ctx.fillRect(280, height * 0.12, 140, height * 0.63);
    ctx.fillRect(860, height * 0.15, 130, height * 0.6);
    ctx.fillRect(1040, height * 0.22, 120, height * 0.53);

    // Neon Windows & Billboards
    ctx.fillStyle = 'rgba(6, 182, 212, 0.55)';
    ctx.fillRect(140, height * 0.25, 70, 8);
    ctx.fillRect(140, height * 0.35, 70, 8);
    ctx.fillStyle = 'rgba(236, 72, 153, 0.65)';
    ctx.fillRect(300, height * 0.18, 100, 20);
    ctx.fillStyle = 'rgba(168, 85, 247, 0.55)';
    ctx.fillRect(880, height * 0.22, 90, 16);

    // Wet Asphalt Street Reflections
    const street = ctx.createLinearGradient(0, height * 0.68, 0, height);
    street.addColorStop(0, '#18181b');
    street.addColorStop(0.5, '#09090b');
    street.addColorStop(1, '#000000');
    ctx.fillStyle = street;
    ctx.beginPath();
    ctx.ellipse(width / 2, height * 0.88, width * 0.85, height * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

  } else if (env === 'castle') {
    // Medieval Castle
    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.7);
    sky.addColorStop(0, '#1e1b4b');
    sky.addColorStop(0.5, '#312e81');
    sky.addColorStop(1, '#f59e0b');
    ctx.fillStyle = sky;
    ctx.fillRect(-200, -200, width + 400, height + 400);

    // Mountain Silhouette
    ctx.fillStyle = 'rgba(30, 27, 75, 0.7)';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.65);
    ctx.lineTo(250, height * 0.35);
    ctx.lineTo(550, height * 0.65);
    ctx.lineTo(850, height * 0.32);
    ctx.lineTo(width, height * 0.65);
    ctx.fill();

    // Stone Castle Battlements
    ctx.fillStyle = '#334155';
    ctx.fillRect(100, height * 0.45, 120, height * 0.3);
    ctx.fillRect(1060, height * 0.45, 120, height * 0.3);

    // Stone Courtyard
    const stone = ctx.createLinearGradient(0, height * 0.65, 0, height);
    stone.addColorStop(0, '#475569');
    stone.addColorStop(0.5, '#334155');
    stone.addColorStop(1, '#1e293b');
    ctx.fillStyle = stone;
    ctx.beginPath();
    ctx.ellipse(width / 2, height * 0.88, width * 0.85, height * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

  } else if (env === 'ocean') {
    // Deep Turquoise Ocean
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#0284c7');
    sky.addColorStop(0.4, '#0891b2');
    sky.addColorStop(1, '#083344');
    ctx.fillStyle = sky;
    ctx.fillRect(-200, -200, width + 400, height + 400);

    // Sun caustics
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 3;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.ellipse(200 + i * 180, height * 0.25, 60, 20, 0.4, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Coral Reef Floor
    const reef = ctx.createLinearGradient(0, height * 0.65, 0, height);
    reef.addColorStop(0, '#0f766e');
    reef.addColorStop(0.5, '#0d9488');
    reef.addColorStop(1, '#115e59');
    ctx.fillStyle = reef;
    ctx.beginPath();
    ctx.ellipse(width / 2, height * 0.88, width * 0.85, height * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

  } else if (env === 'himalayas') {
    // Snowy Mountain Peaks
    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.7);
    sky.addColorStop(0, '#0369a1');
    sky.addColorStop(0.5, '#38bdf8');
    sky.addColorStop(1, '#e0f2fe');
    ctx.fillStyle = sky;
    ctx.fillRect(-200, -200, width + 400, height + 400);

    // Snow Peaks
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(150, height * 0.65); ctx.lineTo(380, height * 0.22); ctx.lineTo(620, height * 0.65);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(650, height * 0.65); ctx.lineTo(920, height * 0.18); ctx.lineTo(1180, height * 0.65);
    ctx.fill();

    // Snowy Ground
    const snow = ctx.createLinearGradient(0, height * 0.65, 0, height);
    snow.addColorStop(0, '#e2e8f0');
    snow.addColorStop(0.5, '#cbd5e1');
    snow.addColorStop(1, '#94a3b8');
    ctx.fillStyle = snow;
    ctx.beginPath();
    ctx.ellipse(width / 2, height * 0.88, width * 0.85, height * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

  } else if (env === 'cave') {
    // Glowing Crystal Cavern
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#0f172a');
    sky.addColorStop(0.5, '#1e1b4b');
    sky.addColorStop(1, '#020617');
    ctx.fillStyle = sky;
    ctx.fillRect(-200, -200, width + 400, height + 400);

    // Stalactites
    ctx.fillStyle = '#1e293b';
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(100 + i * 150, 0);
      ctx.lineTo(130 + i * 150, height * 0.22 + (i % 3) * 30);
      ctx.lineTo(160 + i * 150, 0);
      ctx.fill();
    }

    // Glowing Crystals
    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.moveTo(180, height * 0.7); ctx.lineTo(200, height * 0.58); ctx.lineTo(220, height * 0.7);
    ctx.fill();
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.moveTo(1080, height * 0.7); ctx.lineTo(1100, height * 0.55); ctx.lineTo(1120, height * 0.7);
    ctx.fill();

    // Cavern Floor
    const caveFloor = ctx.createLinearGradient(0, height * 0.65, 0, height);
    caveFloor.addColorStop(0, '#334155');
    caveFloor.addColorStop(0.5, '#1e293b');
    caveFloor.addColorStop(1, '#0f172a');
    ctx.fillStyle = caveFloor;
    ctx.beginPath();
    ctx.ellipse(width / 2, height * 0.88, width * 0.85, height * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

  } else {
    // Default: African Golden Savannah
    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.7);
    sky.addColorStop(0, '#f97316');
    sky.addColorStop(0.4, '#fb923c');
    sky.addColorStop(1, '#fef08a');
    ctx.fillStyle = sky;
    ctx.fillRect(-200, -200, width + 400, height + 400);

    // Distant Acacia trees & hills
    ctx.fillStyle = 'rgba(120, 53, 15, 0.35)';
    ctx.beginPath();
    ctx.ellipse(300, height * 0.6, 350, 80, 0, 0, Math.PI * 2);
    ctx.ellipse(980, height * 0.62, 400, 90, 0, 0, Math.PI * 2);
    ctx.fill();

    // Golden Sun
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.beginPath();
    ctx.arc(640, 180, 55, 0, Math.PI * 2);
    ctx.fill();

    // Ground Plane
    const ground = ctx.createLinearGradient(0, height * 0.65, 0, height);
    ground.addColorStop(0, '#d97706');
    ground.addColorStop(0.5, '#b45309');
    ground.addColorStop(1, '#78350f');
    ctx.fillStyle = ground;
    ctx.beginPath();
    ctx.ellipse(width / 2, height * 0.88, width * 0.85, height * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawCharacterShadow(x, y, scale) {
  ctx.save();
  ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
  ctx.beginPath();
  ctx.ellipse(x, y + 2, 60 * scale, 15 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// -----------------------------------------------------
// DYNAMIC CARTOON CHARACTER RENDERER (LIVE ON STAGE)
// -----------------------------------------------------
function drawElephantLeg(c, hipX, hipY, angle, lift, isBack, legWidth = 26, legHeight = 52) {
  c.save();
  c.translate(hipX, hipY);
  c.rotate(angle);
  const h = legHeight - lift * 0.55;
  const col = isBack ? '#334155' : '#64748b';
  const legGrad = c.createLinearGradient(0, 0, 0, h);
  legGrad.addColorStop(0, col);
  legGrad.addColorStop(1, isBack ? '#1e293b' : '#475569');
  c.fillStyle = legGrad;
  c.beginPath();
  c.roundRect(-legWidth / 2, 0, legWidth, h, [4, 4, 10, 10]);
  c.fill();

  // 3 Curved Ivory Toenails on foot
  c.fillStyle = '#ffffff';
  const footBottom = h;
  const footLeft = -legWidth / 2;
  c.beginPath();
  c.arc(footLeft + 5, footBottom - 1, 3.5, Math.PI, 0);
  c.arc(footLeft + legWidth / 2, footBottom - 2, 4.2, Math.PI, 0);
  c.arc(footLeft + legWidth - 5, footBottom - 1, 3.5, Math.PI, 0);
  c.fill();
  c.restore();
}

// -----------------------------------------------------
// DYNAMIC CARTOON CHARACTER RENDERER (LIVE ON STAGE)
// -----------------------------------------------------
function drawDynamicCartoonCharacter(c, char, now) {
  c.save();

  // Natural idle breathing physics
  const breath = Math.sin(now * 0.0032);

  // Walk cycle physics
  const isWalking = !!char.isWalking;
  const isMouse = (char.species === 'rodent' || char.species === 'rabbit');
  const walkSpeed = isMouse ? 0.016 : 0.007;
  const walkPhase = isWalking ? ((now * walkSpeed) + (char.baseX * 0.02)) : (now * 0.002);
  const walkBob = isWalking ? (Math.abs(Math.sin(walkPhase * 2)) * (isMouse ? 7.5 : 9.0)) : 0;

  // Rhythmic speaking bounce synchronized with lip movement and vocal energy
  const speechBounce = char.isSpeaking ? Math.sin(now * 0.016) : 0;
  const speechVolume = char.isSpeaking ? (0.4 + char.mouthOpen * 0.6) : 0;

  const x = char.baseX;
  const y = char.baseY + breath * 3.5 + (speechBounce * 6.5 * speechVolume) - walkBob;

  // Kinematic volume-preserving squash & stretch:
  // When bouncing up, vertical stretches while horizontal squashes
  const scaleStretchY = 1 + breath * 0.02 + (speechBounce * 0.038 * speechVolume) + (isWalking ? Math.sin(walkPhase * 2) * 0.03 : 0);
  const scaleSquashX = 1 - breath * 0.015 - (speechBounce * 0.028 * speechVolume) - (isWalking ? Math.sin(walkPhase * 2) * 0.02 : 0);

  c.translate(x, y);
  c.scale(char.facing * char.scale * scaleSquashX, char.scale * scaleStretchY);

  // Articulated vocal nodding & dynamic body tilt toward interlocutor or forward lean during walk
  const walkLean = isWalking ? 0.06 : 0;
  const vocalNod = char.isSpeaking ? Math.sin(now * 0.014) * 0.045 : 0;
  const attentionTilt = char.isSpeaking ? 0.038 : 0.012;
  c.rotate(attentionTilt + vocalNod + walkLean);

  // Pass walkPhase to rig
  char.walkPhase = walkPhase;

  // Render transparent AI Cutout sprite if loaded, else use high-aesthetic procedural rig
  if (char.spriteCanvas || (char.imageElement && char.imageLoaded)) {
    const spr = char.spriteCanvas || char.imageElement;
    const sprW = 210;
    const sprH = 270;
    c.drawImage(spr, -sprW / 2, -sprH, sprW, sprH);

    // Dynamic lip-sync speech mouth overlay on AI character
    drawLipSyncMouthOverlay(c, 0, -sprH * 0.44, char.mouthOpen, char.isSpeaking);
  } else {
    // Draw the Universal High-End Procedural Cartoon Character!
    drawProceduralCartoonRig(c, char, now);
  }

  c.restore();
}

/**
 * Universal Procedural 2D Cartoon Character Rigging Engine
 * Renders ANY character category on the spot: Elephant, Rat, Lion, Fox, Cat, Dog, Dragon, Bird, Robot, Alien, Knight, Wizard, Astronaut, Explorer!
 */
function drawProceduralCartoonRig(c, char, now) {
  const archetype = char.species || getCharacterArchetype(char.name);
  const primaryColor = char.color || '#64748b';
  const outfitColor = char.outfitColor || '#059669';
  const skinColor = char.skinColor || '#fed7aa';

  // Gesturing arm animation when talking
  const gesture = char.isSpeaking ? Math.sin(now * 0.012) * 14 : 0;

  if (archetype === 'elephant') {
    // === 3D DISNEY/PIXAR CARTOON ELEPHANT (JUMBO) ===
    const isWalking = !!char.isWalking;
    const walkPhase = char.walkPhase || (now * 0.007);

    // 1. Dynamic Quadruped Walk Gait angles
    const stepA = isWalking ? Math.sin(walkPhase) * 0.38 : (Math.sin(now * 0.002) * 0.04);
    const stepB = isWalking ? -Math.sin(walkPhase) * 0.38 : (-Math.sin(now * 0.002) * 0.04);
    const liftA = isWalking ? Math.max(0, Math.sin(walkPhase)) * 14 : 0;
    const liftB = isWalking ? Math.max(0, -Math.sin(walkPhase)) * 14 : 0;

    // Swaying Back Tail with Fluffy Tuft (energetic swish when walking!)
    const tailSway = isWalking ? Math.sin(walkPhase * 1.5) * 22 : Math.sin(now * 0.004) * 8;
    c.strokeStyle = '#475569';
    c.lineWidth = 5.5;
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(-70, -85);
    c.quadraticCurveTo(-90, -55 + tailSway, -84, -28 + tailSway);
    c.stroke();
    c.fillStyle = '#1e293b';
    c.beginPath();
    c.ellipse(-84, -28 + tailSway, 7, 12, 0.35, 0, Math.PI * 2);
    c.fill();

    // 2. BACK LEGS (Rendered behind body for true 3D depth)
    // Back-Left Leg (hip at -46, -50)
    drawElephantLeg(c, -46, -50, stepA, liftA, true, 26, 52);
    // Front-Left Leg (shoulder at 16, -48)
    drawElephantLeg(c, 16, -48, stepB, liftB, true, 26, 50);

    // 3. Plump 3D Elephant Body (Spherical Radial Shading)
    const bodyGrad = c.createRadialGradient(-15, -115, 20, 0, -90, 85);
    bodyGrad.addColorStop(0, '#94a3b8'); // Top ambient sun highlight
    bodyGrad.addColorStop(0.55, primaryColor);
    bodyGrad.addColorStop(1, '#334155'); // Soft ground shadow
    c.fillStyle = bodyGrad;
    c.beginPath();
    c.ellipse(0, -92, 78, 68, 0, 0, Math.PI * 2);
    c.fill();

    // Soft Light Underbelly Highlight
    c.fillStyle = 'rgba(241, 245, 249, 0.22)';
    c.beginPath();
    c.ellipse(10, -84, 46, 44, 0, 0, Math.PI * 2);
    c.fill();

    // 4. FRONT LEGS (Rendered in front of body, lit with primary color)
    // Back-Right Leg (hip at -20, -48)
    drawElephantLeg(c, -20, -48, stepB, liftB, false, 27, 50);
    // Front-Right Leg (shoulder at 38, -46)
    drawElephantLeg(c, 38, -46, stepA, liftA, false, 28, 48);

    // 5. Stately 3D Elephant Head with Soft Facial Shading
    const headGrad = c.createRadialGradient(16, -156, 12, 14, -144, 52);
    headGrad.addColorStop(0, '#94a3b8');
    headGrad.addColorStop(0.7, primaryColor);
    headGrad.addColorStop(1, '#475569');
    c.fillStyle = headGrad;
    c.beginPath();
    c.arc(14, -144, 50, 0, Math.PI * 2);
    c.fill();

    // Soft Rosy Cheeks
    c.fillStyle = 'rgba(244, 114, 182, 0.38)';
    c.beginPath();
    c.arc(2, -128, 14, 0, Math.PI * 2);
    c.fill();

    // 6. Large Floppy Ears with Dynamic Jiggle / Flapping & Translucent Pink Inner
    const earWalk = isWalking ? Math.sin(walkPhase) * 0.16 : 0;
    const earFlap = (char.isSpeaking ? Math.sin(now * 0.008) * 0.14 : Math.sin(now * 0.003) * 0.04) + earWalk;
    c.save();
    c.translate(-38, -148);
    c.rotate(earFlap);
    // Outer Ear
    c.fillStyle = '#475569';
    c.beginPath();
    c.ellipse(0, 0, 28, 46, -0.22, 0, Math.PI * 2);
    c.fill();
    // Inner Pink Glow
    const earPink = c.createRadialGradient(0, 0, 5, 0, 0, 28);
    earPink.addColorStop(0, '#fbcfe8');
    earPink.addColorStop(0.8, '#f472b6');
    earPink.addColorStop(1, '#db2777');
    c.fillStyle = earPink;
    c.beginPath();
    c.ellipse(0, 2, 20, 34, -0.22, 0, Math.PI * 2);
    c.fill();
    c.restore();

    // 7. Polished Curved Ivory Tusks with Specular Highlight
    c.save();
    c.strokeStyle = '#ffffff';
    c.lineWidth = 8;
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(8, -114);
    c.quadraticCurveTo(26, -92, 48, -100);
    c.stroke();
    // Tusk Specular Glint
    c.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(12, -111);
    c.quadraticCurveTo(24, -95, 38, -98);
    c.stroke();
    c.restore();

    // 8. Expressive Pixar Cartoon Eyes with Pupil Tracking & Blinking
    drawCartoonEyes(c, 26, -155, char.isBlinking, char, now);

    // 9. Dynamic Undulating S-Curved Wrinkled Trunk (Curves UP when speaking or sways when walking)
    const trunkT = now * 0.003;
    const trunkWalkSway = isWalking ? Math.cos(walkPhase) * 14 : 0;
    const trunkRaise = char.isSpeaking ? (32 + char.mouthOpen * 30) : 8;
    const trunkWave1 = (Math.sin(trunkT * 3) * (char.isSpeaking ? 14 : 5)) + trunkWalkSway;
    const trunkWave2 = Math.cos(trunkT * 2.5) * (char.isSpeaking ? 18 : 6);

    c.strokeStyle = primaryColor;
    c.lineWidth = 19;
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(34, -134);
    c.bezierCurveTo(
      54 + trunkWave1 * 0.4, -125 - trunkRaise * 0.4,
      68 + trunkWave2, -108 - trunkRaise * 0.8,
      56 + trunkWave1, -85 - trunkRaise
    );
    c.stroke();

    // Trunk Wrinkle Creases
    c.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    c.lineWidth = 2.2;
    c.beginPath();
    c.arc(42, -130 - trunkRaise * 0.2, 8, -0.5, 0.5);
    c.arc(48, -120 - trunkRaise * 0.4, 7, -0.5, 0.5);
    c.stroke();

    // Trunk Tip Curl
    c.fillStyle = primaryColor;
    c.beginPath();
    c.arc(56 + trunkWave1, -85 - trunkRaise, 9.5, 0, Math.PI * 2);
    c.fill();

    // 10. Lip-Sync Talking Mouth (Prominent with wide smile, teeth and animated tongue)
    drawLipSyncMouthOverlay(c, 24, -106, char.mouthOpen, char.isSpeaking, 'elephant');

  } else if (archetype === 'rabbit') {
    // === CARTOON RABBIT (CHIKU) ===
    c.fillStyle = primaryColor;

    // Fluffy Round Powderpuff Tail
    const tailWiggle = Math.sin(now * 0.008) * 4;
    c.fillStyle = '#ffffff';
    c.beginPath();
    c.arc(-42, -58 + tailWiggle, 14, 0, Math.PI * 2);
    c.fill();

    // Chubby Pear-Shaped Body
    c.fillStyle = primaryColor;
    c.beginPath();
    c.ellipse(0, -78, 44, 52, 0, 0, Math.PI * 2);
    c.fill();

    // Soft White Fluffy Belly
    c.fillStyle = '#ffffff';
    c.beginPath();
    c.ellipse(10, -72, 26, 34, 0, 0, Math.PI * 2);
    c.fill();

    // Bunny Feet / Paws
    c.fillStyle = primaryColor;
    c.beginPath();
    c.ellipse(-18, -25, 14, 22, -0.1, 0, Math.PI * 2);
    c.ellipse(18, -25, 14, 22, 0.1, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = '#fbcfe8';
    c.beginPath();
    c.arc(-18, -14, 6, 0, Math.PI * 2);
    c.arc(18, -14, 6, 0, Math.PI * 2);
    c.fill();

    // Bunny Head
    c.fillStyle = primaryColor;
    c.beginPath();
    c.arc(10, -142, 38, 0, Math.PI * 2);
    c.fill();

    // Tall Expressive Upright Ears with Pink Inner Glow
    const earBounce = char.isSpeaking ? Math.sin(now * 0.01) * 0.08 : Math.sin(now * 0.003) * 0.03;
    c.save();
    c.translate(0, -172);
    c.rotate(earBounce);
    c.fillStyle = primaryColor;
    c.beginPath();
    c.ellipse(-12, -32, 11, 42, -0.12, 0, Math.PI * 2);
    c.ellipse(18, -32, 11, 42, 0.12, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = '#fbcfe8';
    c.beginPath();
    c.ellipse(-12, -32, 6, 32, -0.12, 0, Math.PI * 2);
    c.ellipse(18, -32, 6, 32, 0.12, 0, Math.PI * 2);
    c.fill();
    c.restore();

    // Fluffy White Cheeks
    c.fillStyle = '#ffffff';
    c.beginPath();
    c.arc(0, -132, 16, 0, Math.PI * 2);
    c.arc(22, -132, 16, 0, Math.PI * 2);
    c.fill();

    // Cute Pink Button Nose
    c.fillStyle = '#f43f5e';
    c.beginPath();
    c.arc(11, -138, 4.5, 0, Math.PI * 2);
    c.fill();

    // Whiskers
    c.strokeStyle = '#94a3b8';
    c.lineWidth = 1.5;
    c.beginPath();
    c.moveTo(25, -135); c.lineTo(48, -140);
    c.moveTo(25, -132); c.lineTo(48, -130);
    c.moveTo(-2, -135); c.lineTo(-24, -140);
    c.moveTo(-2, -132); c.lineTo(-24, -130);
    c.stroke();

    // Large Sparkling Eyes
    drawCartoonEyes(c, 18, -154, char.isBlinking, char, now);

    // Lip-Sync Talking Mouth (Prominent with Cute Buck Teeth)
    drawLipSyncMouthOverlay(c, 11, -122, char.mouthOpen, char.isSpeaking, 'rabbit');

  } else if (archetype === 'rodent') {
    // === 3D DISNEY/PIXAR CARTOON MOUSE (CHHOTU) ===
    const isWalking = !!char.isWalking;
    const mousePhase = char.walkPhase || (now * 0.016);

    // 1. Natural Mossy Woodland Rock Pedestal (Only when stationary by the stream)
    if (!isWalking && state.currentSceneIndex === 1) {
      c.save();
      const rockGrad = c.createLinearGradient(0, -35, 0, 10);
      rockGrad.addColorStop(0, '#64748b');
      rockGrad.addColorStop(0.5, '#475569');
      rockGrad.addColorStop(1, '#334155');
      c.fillStyle = rockGrad;
      c.beginPath();
      c.ellipse(10, -10, 48, 22, 0, 0, Math.PI * 2);
      c.fill();
      // Lush Emerald Moss Layer
      c.fillStyle = '#16a34a';
      c.beginPath();
      c.ellipse(10, -16, 42, 12, 0, 0, Math.PI * 2);
      c.fill();
      // Tiny Woodland Daisy on Rock
      c.fillStyle = '#ffffff';
      c.beginPath();
      c.arc(-18, -20, 3, 0, Math.PI * 2);
      c.arc(-14, -23, 3, 0, Math.PI * 2);
      c.arc(-10, -20, 3, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = '#fbbf24';
      c.beginPath();
      c.arc(-14, -20, 2, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }

    // 2. Multi-Harmonic Sinusoidal S-Curved Tail Physics (Whippy & energetic when walking!)
    const tailTime = isWalking ? mousePhase * 1.4 : (now * 0.005);
    const wave1 = Math.sin(tailTime) * (isWalking ? 22 : 14);
    const wave2 = Math.cos(tailTime * 1.6) * (isWalking ? 18 : 12);
    c.strokeStyle = '#fda4af';
    c.lineWidth = 5.5;
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(-28, -48);
    c.bezierCurveTo(-55, -55 + wave1, -78, -80 + wave2, -92, -45 + wave1);
    c.stroke();

    // 3. Hind Legs & Paws (Rapid Alternating Scurrying Steps when walking!)
    const stepL = isWalking ? Math.sin(mousePhase) * 0.45 : 0;
    const stepR = isWalking ? -Math.sin(mousePhase) * 0.45 : 0;
    const liftL = isWalking ? Math.max(0, Math.sin(mousePhase)) * 10 : 0;
    const liftR = isWalking ? Math.max(0, -Math.sin(mousePhase)) * 10 : 0;

    // Back Left Leg & Paw
    c.save();
    c.translate(-14, -30);
    c.rotate(stepL);
    c.fillStyle = '#92400e';
    c.beginPath();
    c.roundRect(-5, 0, 10, 18 - liftL, 4);
    c.fill();
    c.fillStyle = '#fda4af';
    c.beginPath();
    c.ellipse(0, 18 - liftL, 9, 5, 0, 0, Math.PI * 2);
    c.fill();
    c.restore();

    // 4. Cute Pear-Shaped Mouse Body with Warm Chestnut Fur Gradient
    const mouseBodyGrad = c.createRadialGradient(-6, -72, 8, 0, -68, 50);
    mouseBodyGrad.addColorStop(0, '#fbbf24'); // Warm golden fur top
    mouseBodyGrad.addColorStop(0.5, primaryColor);
    mouseBodyGrad.addColorStop(1, '#78350f'); // Shadow
    c.fillStyle = mouseBodyGrad;
    c.beginPath();
    c.ellipse(0, -68, 38, 46, 0, 0, Math.PI * 2);
    c.fill();

    // Fluffy Creamy-Peach Underbelly
    c.fillStyle = '#fef3c7';
    c.beginPath();
    c.ellipse(8, -64, 24, 30, 0, 0, Math.PI * 2);
    c.fill();

    // 5. Back Right Leg & Paw (In front of body)
    c.save();
    c.translate(14, -30);
    c.rotate(stepR);
    c.fillStyle = primaryColor;
    c.beginPath();
    c.roundRect(-5, 0, 10, 18 - liftR, 4);
    c.fill();
    c.fillStyle = '#fda4af';
    c.beginPath();
    c.ellipse(2, 18 - liftR, 10, 5.5, 0, 0, Math.PI * 2);
    c.fill();
    c.restore();

    // 6. Front Gesturing Paws
    // When walking: runner's arm swing!
    // When speaking: enthusiastic gestures, waving high and pointing!
    let pawLX = 4, pawLY = -60;
    let pawRX = 28, pawRY = -72;

    if (isWalking) {
      pawLX = 4 + Math.sin(mousePhase) * 14;
      pawLY = -62 + Math.cos(mousePhase) * 8;
      pawRX = 24 - Math.sin(mousePhase) * 14;
      pawRY = -66 - Math.cos(mousePhase) * 8;
    } else if (char.isSpeaking) {
      pawLY = -60 + Math.sin(now * 0.015) * 16;
      pawRX = 28 + Math.cos(now * 0.015) * 12;
      pawRY = -76 + Math.sin(now * 0.018) * 22; // High expressive gesture
    }

    c.fillStyle = '#fda4af';
    // Left Paw
    c.beginPath();
    c.arc(pawLX, pawLY, 7.5, 0, Math.PI * 2);
    c.fill();
    // Right Paw
    c.beginPath();
    c.arc(pawRX, pawRY, 8.5, 0, Math.PI * 2);
    c.fill();
    // Tiny fingers
    c.fillStyle = '#f472b6';
    c.beginPath();
    c.arc(pawRX + 4, pawRY - 3, 2.5, 0, Math.PI * 2);
    c.arc(pawRX + 5, pawRY + 1, 2.5, 0, Math.PI * 2);
    c.fill();

    // 7. Adorable Round Cartoon Head (Smooth Disney Pixar Muzzle)
    const mouseHeadGrad = c.createRadialGradient(16, -112, 6, 18, -104, 32);
    mouseHeadGrad.addColorStop(0, '#fbbf24');
    mouseHeadGrad.addColorStop(0.65, primaryColor);
    mouseHeadGrad.addColorStop(1, '#92400e');
    c.fillStyle = mouseHeadGrad;
    c.beginPath();
    c.arc(16, -104, 28, 0, Math.PI * 2);
    c.fill();

    // Soft Cheek Puffs
    c.beginPath();
    c.arc(32, -98, 16, 0, Math.PI * 2);
    c.fill();

    // 8. Huge Round Translucent Pink Ears with Warm Inner Glow
    const earBounce = (char.isSpeaking ? Math.sin(now * 0.01) * 0.08 : 0) + (isWalking ? Math.sin(mousePhase) * 0.12 : 0);
    c.save();
    c.translate(4, -128);
    c.rotate(earBounce);
    // Back Ear
    c.fillStyle = '#92400e';
    c.beginPath();
    c.arc(-16, 0, 20, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = '#fda4af';
    c.beginPath();
    c.arc(-16, 0, 14, 0, Math.PI * 2);
    c.fill();
    // Front Ear
    c.fillStyle = primaryColor;
    c.beginPath();
    c.arc(14, -2, 22, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = '#f472b6';
    c.beginPath();
    c.arc(14, -2, 16, 0, Math.PI * 2);
    c.fill();
    c.restore();

    // 9. Fine Arching White Whiskers that Twitch Rhythmically
    const twitch = (isWalking ? Math.sin(mousePhase * 1.5) * 4 : 0) + (char.isSpeaking ? Math.sin(now * 0.032) * 3 : 0);
    c.strokeStyle = '#ffffff';
    c.lineWidth = 1.8;
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(34, -98); c.quadraticCurveTo(46, -106 + twitch, 62, -108 + twitch);
    c.moveTo(34, -94); c.quadraticCurveTo(48, -94, 65, -94);
    c.moveTo(34, -90); c.quadraticCurveTo(46, -82 - twitch, 62, -80 - twitch);
    c.stroke();

    // Rosy Cheeks
    c.fillStyle = 'rgba(244, 114, 182, 0.45)';
    c.beginPath();
    c.arc(22, -92, 9, 0, Math.PI * 2);
    c.fill();

    // 10. Large Sparkling Disney Eyes Glancing at Giant Friend
    drawCartoonEyes(c, 24, -112, char.isBlinking, char, now);

    // 11. Glossy Cute Pink Button Nose with Specular Sparkle
    c.fillStyle = '#f43f5e';
    c.beginPath();
    c.arc(46, -96, 5.5, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = '#ffffff';
    c.beginPath();
    c.arc(44.5, -97.5, 1.8, 0, Math.PI * 2);
    c.fill();

    // 12. Lip-Sync Talking Mouth with Cute Buck Teeth
    drawLipSyncMouthOverlay(c, 32, -86, char.mouthOpen, char.isSpeaking, 'rabbit');

  } else if (archetype === 'lion') {
    // === CARTOON LION (SHER SINGH) ===
    // Magnificent Fluffy Lion Mane
    c.fillStyle = '#b45309';
    c.beginPath();
    c.arc(6, -145, 58, 0, Math.PI * 2);
    c.fill();

    // 3D Fluffy Mane Tufts
    c.fillStyle = '#92400e';
    for (let m = 0; m < 8; m++) {
      const angle = (m / 8) * Math.PI * 2;
      c.beginPath();
      c.arc(6 + Math.cos(angle) * 52, -145 + Math.sin(angle) * 52, 16, 0, Math.PI * 2);
      c.fill();
    }

    // Body
    c.fillStyle = primaryColor;
    c.beginPath();
    c.ellipse(0, -85, 52, 60, 0, 0, Math.PI * 2);
    c.fill();

    // White Chest Bib
    c.fillStyle = '#fef3c7';
    c.beginPath();
    c.ellipse(12, -80, 24, 35, 0, 0, Math.PI * 2);
    c.fill();

    // Legs & Paws
    c.fillRect(-30, -35, 20, 40);
    c.fillRect(10, -35, 20, 40);

    // Lion Head
    c.fillStyle = primaryColor;
    c.beginPath();
    c.arc(10, -145, 38, 0, Math.PI * 2);
    c.fill();

    // Golden Royal Crown
    c.fillStyle = '#fbbf24';
    c.beginPath();
    c.moveTo(-2, -180); c.lineTo(8, -196); c.lineTo(18, -182);
    c.lineTo(28, -196); c.lineTo(36, -180);
    c.closePath();
    c.fill();

    // Ears
    c.fillStyle = '#b45309';
    c.beginPath();
    c.arc(-16, -182, 14, 0, Math.PI * 2);
    c.arc(32, -182, 14, 0, Math.PI * 2);
    c.fill();

    // Muzzle
    c.fillStyle = '#fef3c7';
    c.beginPath();
    c.ellipse(22, -135, 22, 16, 0, 0, Math.PI * 2);
    c.fill();

    // Nose
    c.fillStyle = '#78350f';
    c.beginPath();
    c.arc(32, -142, 7, 0, Math.PI * 2);
    c.fill();

    // Eyes
    drawCartoonEyes(c, 22, -155, char.isBlinking, char, now);

    // Lip-Sync Mouth
    drawLipSyncMouthOverlay(c, 24, -126, char.mouthOpen, char.isSpeaking, 'lion');

  } else if (archetype === 'fox') {
    // === CARTOON FOX ===
    c.fillStyle = primaryColor;

    // Bushy Fox Tail
    c.beginPath();
    c.ellipse(-45, -55, 32, 18, -0.6, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = '#ffffff';
    c.beginPath();
    c.arc(-65, -68, 14, 0, Math.PI * 2);
    c.fill();

    // Body
    c.fillStyle = primaryColor;
    c.beginPath();
    c.ellipse(0, -80, 42, 54, 0, 0, Math.PI * 2);
    c.fill();

    // White Chest Bib
    c.fillStyle = '#ffffff';
    c.beginPath();
    c.ellipse(12, -75, 20, 28, 0, 0, Math.PI * 2);
    c.fill();

    // Fox Head
    c.fillStyle = primaryColor;
    c.beginPath();
    c.moveTo(5, -145);
    c.lineTo(44, -130);
    c.lineTo(5, -115);
    c.closePath();
    c.fill();

    // Perky Ears with Black Tips
    c.fillStyle = '#1e293b';
    c.beginPath();
    c.moveTo(-10, -145); c.lineTo(-2, -185); c.lineTo(15, -145);
    c.moveTo(15, -145); c.lineTo(26, -185); c.lineTo(38, -145);
    c.fill();

    // Eyes
    drawCartoonEyes(c, 20, -140, char.isBlinking, char, now);

    // Black Nose
    c.fillStyle = '#0f172a';
    c.beginPath();
    c.arc(44, -130, 4, 0, Math.PI * 2);
    c.fill();

    // Lip-Sync Mouth
    drawLipSyncMouthOverlay(c, 26, -122, char.mouthOpen, char.isSpeaking);

  } else if (archetype === 'dragon') {
    // === CARTOON DRAGON ===
    c.fillStyle = primaryColor;

    // Dragon Body
    c.beginPath();
    c.ellipse(0, -85, 52, 65, 0, 0, Math.PI * 2);
    c.fill();

    // Back Crest Spines
    c.fillStyle = '#f59e0b';
    for (let i = 0; i < 4; i++) {
      c.beginPath();
      c.moveTo(-35, -60 - i * 22);
      c.lineTo(-50, -70 - i * 22);
      c.lineTo(-35, -80 - i * 22);
      c.fill();
    }

    // Dragon Head
    c.fillStyle = primaryColor;
    c.beginPath();
    c.arc(10, -145, 42, 0, Math.PI * 2);
    c.fill();

    // Golden Curved Horns
    c.strokeStyle = '#fbbf24';
    c.lineWidth = 7;
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(0, -175);
    c.quadraticCurveTo(-18, -210, -32, -215);
    c.stroke();

    // Reptilian Snout
    c.fillStyle = primaryColor;
    c.beginPath();
    c.roundRect(15, -145, 34, 25, 8);
    c.fill();

    // Smoke Puff when talking!
    if (char.isSpeaking) {
      c.fillStyle = 'rgba(255, 255, 255, 0.45)';
      c.beginPath();
      c.arc(55 + Math.sin(now * 0.02) * 5, -148, 6, 0, Math.PI * 2);
      c.arc(66 + Math.sin(now * 0.02) * 8, -155, 9, 0, Math.PI * 2);
      c.fill();
    }

    // Eyes
    drawCartoonEyes(c, 18, -155, char.isBlinking, char, now);

    // Lip-Sync Mouth
    drawLipSyncMouthOverlay(c, 30, -130, char.mouthOpen, char.isSpeaking);

  } else if (archetype === 'bird') {
    // === CARTOON OWL / BIRD ===
    c.fillStyle = primaryColor;

    // Plump Feathery Body
    c.beginPath();
    c.ellipse(0, -80, 48, 60, 0, 0, Math.PI * 2);
    c.fill();

    // Belly Feathers
    c.fillStyle = '#fef08a';
    c.beginPath();
    c.ellipse(12, -75, 28, 38, 0, 0, Math.PI * 2);
    c.fill();

    // Gesturing Wing
    c.fillStyle = primaryColor;
    c.beginPath();
    c.ellipse(-25, -80, 16, 36, 0.3, 0, Math.PI * 2);
    c.fill();

    // Owl Head
    c.beginPath();
    c.arc(6, -145, 42, 0, Math.PI * 2);
    c.fill();

    // Feathery Ear Tufts
    c.beginPath();
    c.moveTo(-20, -175); c.lineTo(-32, -205); c.lineTo(-8, -182);
    c.moveTo(12, -182); c.lineTo(34, -205); c.lineTo(24, -175);
    c.fill();

    // Large Circular Eyes
    drawCartoonEyes(c, 20, -150, char.isBlinking, char, now);

    // Golden Curved Beak that opens with lip sync!
    c.fillStyle = '#f59e0b';
    c.beginPath();
    c.moveTo(32, -146);
    c.lineTo(52, -138);
    c.lineTo(32, -130 - (char.mouthOpen * 10));
    c.closePath();
    c.fill();

    // Lip-Sync Mouth
    drawLipSyncMouthOverlay(c, 36, -134, char.mouthOpen, char.isSpeaking);

  } else if (archetype === 'robot') {
    // === HIGH-TECH CARTOON ROBOT ===
    c.fillStyle = primaryColor;

    // Metallic Torso
    c.beginPath();
    c.roundRect(-35, -135, 70, 85, 12);
    c.fill();

    // Chest Audio Equalizer Bars (Beats with speech!)
    c.fillStyle = '#38bdf8';
    const beatH = char.isSpeaking ? char.mouthOpen * 25 : 4;
    for (let i = 0; i < 4; i++) {
      c.fillRect(-20 + i * 11, -85 - beatH * (0.5 + (i % 2) * 0.5), 7, beatH * (0.5 + (i % 2) * 0.5));
    }

    // Legs
    c.fillStyle = '#1e293b';
    c.fillRect(-25, -50, 18, 50);
    c.fillRect(8, -50, 18, 50);

    // Robot Head
    c.fillStyle = primaryColor;
    c.beginPath();
    c.roundRect(-28, -195, 62, 54, 10);
    c.fill();

    // Antenna with Glowing Orb
    c.strokeStyle = '#94a3b8';
    c.lineWidth = 4;
    c.beginPath();
    c.moveTo(3, -195); c.lineTo(3, -225);
    c.stroke();
    c.fillStyle = char.isSpeaking ? '#ef4444' : '#38bdf8';
    c.beginPath();
    c.arc(3, -228, 8, 0, Math.PI * 2);
    c.fill();

    // Glowing LED Visor Display
    c.fillStyle = '#0f172a';
    c.fillRect(-18, -182, 44, 22);
    c.fillStyle = '#38bdf8';
    c.beginPath();
    c.arc(0, -171, 5, 0, Math.PI * 2);
    c.arc(16, -171, 5, 0, Math.PI * 2);
    c.fill();

    // Lip-Sync Mouth (Digital Frequency Visor)
    drawLipSyncMouthOverlay(c, 8, -152, char.mouthOpen, char.isSpeaking);

  } else if (archetype === 'alien') {
    // === EXTRATERRESTRIAL ALIEN ===
    c.fillStyle = primaryColor;

    // Slender Body
    c.beginPath();
    c.roundRect(-24, -130, 48, 80, 18);
    c.fill();

    // Legs
    c.fillRect(-18, -50, 14, 50);
    c.fillRect(6, -50, 14, 50);

    // Alien Head
    c.beginPath();
    c.arc(3, -175, 38, 0, Math.PI * 2);
    c.fill();

    // Glowing Antennas
    c.strokeStyle = primaryColor;
    c.lineWidth = 4;
    c.beginPath();
    c.moveTo(-12, -205); c.quadraticCurveTo(-26, -235, -34, -240);
    c.moveTo(18, -205); c.quadraticCurveTo(32, -235, 40, -240);
    c.stroke();
    c.fillStyle = '#10b981';
    c.beginPath();
    c.arc(-34, -240, 7, 0, Math.PI * 2);
    c.arc(40, -240, 7, 0, Math.PI * 2);
    c.fill();

    // Large Glossy Alien Eyes
    c.fillStyle = '#0f172a';
    c.beginPath();
    c.ellipse(-6, -180, 10, 16, -0.2, 0, Math.PI * 2);
    c.ellipse(18, -180, 10, 16, 0.2, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = '#ffffff';
    c.beginPath();
    c.arc(-4, -184, 3, 0, Math.PI * 2);
    c.arc(20, -184, 3, 0, Math.PI * 2);
    c.fill();

    // Lip-Sync Mouth
    drawLipSyncMouthOverlay(c, 6, -155, char.mouthOpen, char.isSpeaking);

  } else if (archetype === 'knight') {
    // === ARMORED KNIGHT ===
    c.fillStyle = '#475569';

    // Armor Plate Torso
    c.beginPath();
    c.roundRect(-30, -145, 60, 95, 14);
    c.fill();

    // Heraldic Royal Crest
    c.fillStyle = '#f59e0b';
    c.beginPath();
    c.arc(2, -100, 12, 0, Math.PI * 2);
    c.fill();

    // Armored Legs
    c.fillStyle = '#334155';
    c.fillRect(-22, -50, 16, 50);
    c.fillRect(6, -50, 16, 50);

    // Knight Helmet
    c.fillStyle = '#94a3b8';
    c.beginPath();
    c.arc(2, -185, 36, 0, Math.PI * 2);
    c.fill();

    // Red Feathery Plume
    c.fillStyle = '#ef4444';
    c.beginPath();
    c.moveTo(0, -220);
    c.quadraticCurveTo(-18, -250, -35, -245);
    c.quadraticCurveTo(-15, -230, 8, -220);
    c.fill();

    // Visor Slit
    c.fillStyle = '#0f172a';
    c.fillRect(-10, -188, 30, 8);

    // Eyes
    drawCartoonEyes(c, 8, -185, char.isBlinking, char, now);

    // Lip-Sync Mouth
    drawLipSyncMouthOverlay(c, 8, -165, char.mouthOpen, char.isSpeaking);

  } else if (archetype === 'wizard') {
    // === MYSTIC WIZARD ===
    // Flowing Robe
    c.fillStyle = primaryColor;
    c.beginPath();
    c.moveTo(-35, -140);
    c.lineTo(35, -140);
    c.lineTo(50, 0);
    c.lineTo(-50, 0);
    c.closePath();
    c.fill();

    // Head
    c.fillStyle = skinColor;
    c.beginPath();
    c.arc(0, -180, 32, 0, Math.PI * 2);
    c.fill();

    // Fluffy Wizard Beard (wiggles with speech!)
    const beardWiggle = char.isSpeaking ? Math.sin(now * 0.02) * 4 : 0;
    c.fillStyle = '#f1f5f9';
    c.beginPath();
    c.moveTo(-24, -170);
    c.quadraticCurveTo(0, -110 + beardWiggle, 24, -170);
    c.quadraticCurveTo(0, -135, -24, -170);
    c.fill();

    // Pointed Wizard Hat
    c.fillStyle = primaryColor;
    c.beginPath();
    c.ellipse(0, -195, 46, 12, 0, 0, Math.PI * 2);
    c.fill();
    c.beginPath();
    c.moveTo(-32, -195);
    c.lineTo(0, -270);
    c.lineTo(32, -195);
    c.closePath();
    c.fill();

    // Golden Star on Hat
    c.fillStyle = '#fbbf24';
    c.beginPath();
    c.arc(0, -215, 6, 0, Math.PI * 2);
    c.fill();

    // Eyes
    drawCartoonEyes(c, 8, -182, char.isBlinking, char, now);

    // Lip-Sync Mouth
    drawLipSyncMouthOverlay(c, 8, -164, char.mouthOpen, char.isSpeaking);

  } else if (archetype === 'astronaut') {
    // === SPACE ASTRONAUT ===
    c.fillStyle = '#f8fafc';

    // White Spacesuit Torso
    c.beginPath();
    c.roundRect(-30, -145, 60, 95, 16);
    c.fill();

    // Life-Support Chest Pack
    c.fillStyle = '#0284c7';
    c.fillRect(-18, -120, 36, 40);
    c.fillStyle = '#22c55e';
    c.fillRect(-10, -112, 6, 6);
    c.fillStyle = '#ef4444';
    c.fillRect(4, -112, 6, 6);

    // Legs
    c.fillStyle = '#f8fafc';
    c.fillRect(-22, -50, 16, 50);
    c.fillRect(6, -50, 16, 50);

    // Bubble Helmet with Glossy Curvature Reflection
    c.fillStyle = 'rgba(56, 189, 248, 0.45)';
    c.beginPath();
    c.arc(0, -188, 42, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = '#e2e8f0';
    c.lineWidth = 4;
    c.stroke();

    // Head visible inside helmet
    c.fillStyle = skinColor;
    c.beginPath();
    c.arc(0, -186, 28, 0, Math.PI * 2);
    c.fill();

    // Eyes
    drawCartoonEyes(c, 8, -188, char.isBlinking, char, now);

    // Lip-Sync Mouth
    drawLipSyncMouthOverlay(c, 8, -168, char.mouthOpen, char.isSpeaking);

  } else if (archetype === 'hanuman') {
    // === LORD HANUMAN JI (वीर बजरंगबली - Disney/Pixar 3D Cinematic Animated Rig) ===
    const tailWag = Math.sin(now * 0.005) * 18;
    const isSpeaking = !!(char && char.isSpeaking);
    const armGesture = isSpeaking ? Math.sin(now * 0.014) * 12 : 0;

    // 1. Divine Golden-Amber Radiance Aura (Surya Tej Mandal)
    c.save();
    const hanumanAura = c.createRadialGradient(0, -188, 14, 0, -188, 85);
    hanumanAura.addColorStop(0, 'rgba(251, 191, 36, 0.48)');
    hanumanAura.addColorStop(0.55, 'rgba(249, 115, 22, 0.22)');
    hanumanAura.addColorStop(1, 'rgba(249, 115, 22, 0)');
    c.fillStyle = hanumanAura;
    c.beginPath();
    c.arc(0, -188, 85, 0, Math.PI * 2);
    c.fill();
    // Shimmering aura particles
    for (let p = 0; p < 8; p++) {
      const a = (p * Math.PI) / 4 + now * 0.002;
      const r = 48 + Math.sin(now * 0.004 + p) * 12;
      c.fillStyle = 'rgba(254, 240, 138, 0.7)';
      c.beginPath();
      c.arc(Math.cos(a) * r, -188 + Math.sin(a) * r, 2.2, 0, Math.PI * 2);
      c.fill();
    }
    c.restore();

    // 2. Long Graceful Animated Divine Tail (Swishing behind back)
    c.save();
    c.strokeStyle = '#ea580c';
    c.lineWidth = 10;
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(-20, -68);
    c.bezierCurveTo(-65, -110 + tailWag, -75, -205 + tailWag, -25, -220 + tailWag);
    c.stroke();
    // Golden fur tuft at tail tip
    c.fillStyle = '#f59e0b';
    c.beginPath();
    c.arc(-25, -220 + tailWag, 14, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = '#fbbf24';
    c.beginPath();
    c.arc(-25, -220 + tailWag, 8, 0, Math.PI * 2);
    c.fill();
    c.restore();

    // 3. Heroic Golden Gada (Mace) — Held at left hip with left arm
    c.save();
    // Shaft
    const shaftGrad = c.createLinearGradient(30, -125, 42, -5);
    shaftGrad.addColorStop(0, '#fef08a');
    shaftGrad.addColorStop(0.5, '#fbbf24');
    shaftGrad.addColorStop(1, '#b45309');
    c.fillStyle = shaftGrad;
    c.fillRect(34, -125, 7, 120);
    // Mace head
    const maceGrad = c.createRadialGradient(34, -78, 4, 37, -75, 24);
    maceGrad.addColorStop(0, '#fef08a');
    maceGrad.addColorStop(0.45, '#f59e0b');
    maceGrad.addColorStop(0.85, '#d97706');
    maceGrad.addColorStop(1, '#78350f');
    c.fillStyle = maceGrad;
    c.beginPath();
    c.arc(37, -75, 20, 0, Math.PI * 2);
    c.fill();
    // Flutings
    c.strokeStyle = '#fef08a';
    c.lineWidth = 2.2;
    c.beginPath();
    c.ellipse(37, -75, 11, 20, 0, 0, Math.PI * 2);
    c.stroke();
    // Center ruby
    c.fillStyle = '#dc2626';
    c.beginPath();
    c.arc(37, -75, 5, 0, Math.PI * 2);
    c.fill();
    c.restore();

    // 4. Left Arm (Grip holding Gada)
    c.save();
    c.strokeStyle = '#f97316';
    c.lineWidth = 14;
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(26, -135);
    c.lineTo(36, -100);
    c.lineTo(37, -75);
    c.stroke();
    // Golden Bajuband & Wristlet
    c.fillStyle = '#fbbf24';
    c.fillRect(24, -122, 10, 6);
    c.fillRect(32, -88, 10, 6);
    c.restore();

    // 5. Right Arm (Expressive Mudra / Blessing / Speaking Gesture)
    c.save();
    c.strokeStyle = '#f97316';
    c.lineWidth = 14;
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(-26, -135);
    c.lineTo(-38, -108 + armGesture);
    c.lineTo(-32, -84 + armGesture * 1.3);
    c.stroke();
    // Golden Bajuband & Wristlet
    c.fillStyle = '#fbbf24';
    c.fillRect(-34, -122, 10, 6);
    c.fillRect(-38, -92 + armGesture, 10, 6);
    // Hand
    c.fillStyle = '#f97316';
    c.beginPath();
    c.arc(-32, -80 + armGesture * 1.3, 7, 0, Math.PI * 2);
    c.fill();
    c.restore();

    // 6. Heroic Muscular Torso (Warm 3D Golden Saffron)
    const torsoGrad = c.createRadialGradient(0, -115, 15, 0, -100, 55);
    torsoGrad.addColorStop(0, '#fed7aa');
    torsoGrad.addColorStop(0.45, '#fb923c');
    torsoGrad.addColorStop(1, '#ea580c');
    c.fillStyle = torsoGrad;
    c.beginPath();
    c.roundRect(-30, -148, 60, 95, [18, 18, 12, 12]);
    c.fill();

    // Pectoral contours
    c.strokeStyle = 'rgba(194, 65, 12, 0.45)';
    c.lineWidth = 2.2;
    c.beginPath();
    c.arc(-14, -126, 12, 0.2, Math.PI - 0.2);
    c.arc(14, -126, 12, 0.2, Math.PI - 0.2);
    c.stroke();

    // Sacred Janeu (Yajnopavita thread from left shoulder to right waist)
    c.strokeStyle = '#fef08a';
    c.lineWidth = 2.4;
    c.beginPath();
    c.moveTo(-24, -146);
    c.quadraticCurveTo(0, -112, 26, -76);
    c.stroke();

    // Pearl & Golden Necklace (Mukta-har)
    c.strokeStyle = '#fbbf24';
    c.lineWidth = 3.8;
    c.beginPath();
    c.arc(0, -144, 18, 0.1, Math.PI - 0.1);
    c.stroke();
    c.fillStyle = '#dc2626';
    c.beginPath();
    c.arc(0, -126, 5, 0, Math.PI * 2);
    c.fill();

    // 7. Saffron Silk Dhoti with Royal Gold Zari Borders & Kamarband
    const dhotiGrad = c.createLinearGradient(0, -78, 0, -42);
    dhotiGrad.addColorStop(0, '#f59e0b');
    dhotiGrad.addColorStop(1, '#d97706');
    c.fillStyle = dhotiGrad;
    c.beginPath();
    c.roundRect(-28, -76, 56, 36, [4, 4, 12, 12]);
    c.fill();

    // Front pleats (Patka)
    c.fillStyle = '#dc2626';
    c.fillRect(-9, -76, 18, 38);
    c.fillStyle = '#fbbf24';
    c.fillRect(-6, -76, 12, 36);

    // Royal Waistband (Kamarband)
    c.fillStyle = '#b91c1c';
    c.fillRect(-29, -78, 58, 6.5);
    c.fillStyle = '#fbbf24';
    c.beginPath();
    c.arc(0, -75, 6.5, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = '#dc2626';
    c.beginPath();
    c.arc(0, -75, 2.8, 0, Math.PI * 2);
    c.fill();

    // 8. Sculpted Muscular Legs & Golden Anklets (Nupur)
    const legGrad = c.createLinearGradient(-22, -45, 22, 0);
    legGrad.addColorStop(0, '#fb923c');
    legGrad.addColorStop(1, '#ea580c');
    c.fillStyle = legGrad;
    c.beginPath();
    c.roundRect(-23, -45, 18, 46, [6, 6, 8, 8]);
    c.roundRect(5, -45, 18, 46, [6, 6, 8, 8]);
    c.fill();
    // Golden anklets
    c.fillStyle = '#fbbf24';
    c.fillRect(-24, -5, 20, 5.5);
    c.fillRect(4, -5, 20, 5.5);

    // 9. Sculpted Divine Face & Vanara Features
    // Vanara Ears with Golden Kundal Earrings
    c.fillStyle = '#f97316';
    c.beginPath();
    c.arc(-30, -182, 9, 0, Math.PI * 2);
    c.arc(30, -182, 9, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = '#fdba74';
    c.beginPath();
    c.arc(-30, -182, 5, 0, Math.PI * 2);
    c.arc(30, -182, 5, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = '#fbbf24';
    c.lineWidth = 2.6;
    c.beginPath();
    c.arc(-31, -177, 5, 0, Math.PI * 2);
    c.arc(31, -177, 5, 0, Math.PI * 2);
    c.stroke();

    // Main Head
    const faceGrad = c.createRadialGradient(-6, -192, 10, 0, -186, 35);
    faceGrad.addColorStop(0, '#ffedd5');
    faceGrad.addColorStop(0.55, '#fb923c');
    faceGrad.addColorStop(1, '#ea580c');
    c.fillStyle = faceGrad;
    c.beginPath();
    c.arc(0, -186, 33, 0, Math.PI * 2);
    c.fill();

    // Muzzle & Cheeks (Soft Peach Vanara smile area)
    const muzzleGrad = c.createRadialGradient(0, -172, 4, 0, -172, 24);
    muzzleGrad.addColorStop(0, '#fff7ed');
    muzzleGrad.addColorStop(1, '#fdba74');
    c.fillStyle = muzzleGrad;
    c.beginPath();
    c.ellipse(0, -172, 25, 17, 0, 0, Math.PI * 2);
    c.fill();

    // Rosy Devotional Cheeks
    c.fillStyle = 'rgba(239, 68, 68, 0.28)';
    c.beginPath();
    c.arc(-16, -174, 6, 0, Math.PI * 2);
    c.arc(16, -174, 6, 0, Math.PI * 2);
    c.fill();

    // Cute Vanara Nose
    c.fillStyle = '#ea580c';
    c.beginPath();
    c.ellipse(0, -178, 5, 3.2, 0, 0, Math.PI * 2);
    c.fill();

    // Sacred Sindoor Tilak on Forehead
    c.fillStyle = '#dc2626';
    c.beginPath();
    c.moveTo(0, -208);
    c.quadraticCurveTo(4, -198, 0, -192);
    c.quadraticCurveTo(-4, -198, 0, -208);
    c.fill();
    c.fillStyle = '#fbbf24';
    c.beginPath();
    c.arc(0, -196, 2, 0, Math.PI * 2);
    c.fill();

    // 10. Magnificent Golden Swarna Mukut (Crown)
    c.fillStyle = '#fbbf24';
    c.beginPath();
    c.moveTo(-26, -206);
    c.lineTo(-14, -246);
    c.lineTo(0, -222);
    c.lineTo(14, -246);
    c.lineTo(26, -206);
    c.closePath();
    c.fill();
    c.strokeStyle = '#d97706';
    c.lineWidth = 2.5;
    c.stroke();
    // Crown base band
    c.fillStyle = '#f59e0b';
    c.fillRect(-24, -208, 48, 5.5);
    // Center Ruby in Crown
    c.fillStyle = '#dc2626';
    c.beginPath();
    c.arc(0, -226, 5.5, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = '#fef08a';
    c.beginPath();
    c.arc(-1.5, -227, 1.8, 0, Math.PI * 2);
    c.fill();

    // 11. Large Expressive Pixar 3D Eyes!
    drawExpressiveEyesPair(c, 0, -185, 11, char.isBlinking, char, now, '#d97706', '#f59e0b');

    // 12. Lip-Sync Mouth Overlay (Centered!)
    drawLipSyncMouthOverlay(c, 0, -168, char.mouthOpen, char.isSpeaking);

  } else if (archetype === 'krishna') {
    // === LORD SHRI KRISHNA (भगवान श्री कृष्ण - Disney/Pixar 3D Divine Animated Rig) ===
    const isSpeaking = !!(char && char.isSpeaking);
    const armGesture = isSpeaking ? Math.sin(now * 0.014) * 8 : 0;

    // 1. Divine Tej Mandal (Radiant Golden Aura)
    c.save();
    const krishnaAura = c.createRadialGradient(0, -188, 12, 0, -188, 88);
    krishnaAura.addColorStop(0, 'rgba(254, 240, 138, 0.65)');
    krishnaAura.addColorStop(0.5, 'rgba(250, 204, 21, 0.35)');
    krishnaAura.addColorStop(1, 'rgba(250, 204, 21, 0)');
    c.fillStyle = krishnaAura;
    c.beginPath();
    c.arc(0, -188, 88, 0, Math.PI * 2);
    c.fill();
    c.restore();

    // 2. Yellow Silk Dhoti (Pitambar)
    c.fillStyle = '#facc15';
    c.beginPath();
    c.roundRect(-28, -135, 56, 92, 12);
    c.fill();

    // Ornate Golden Waistband & Pearl Garland (Vaijayanti Mala)
    c.fillStyle = '#eab308';
    c.fillRect(-28, -88, 56, 8);
    c.fillStyle = '#f8fafc';
    for (let p = -22; p <= 22; p += 6) {
      c.beginPath();
      c.arc(p, -112 + Math.abs(p) * 0.35, 2.8, 0, Math.PI * 2);
      c.fill();
    }

    // 3. Hands & Golden Flute (Bansuri)
    c.save();
    c.translate(8 + armGesture, -130);
    c.rotate(-0.25);
    c.fillStyle = '#eab308';
    c.roundRect(-30, -5, 60, 8, 3);
    c.fill();
    c.fillStyle = '#ca8a04';
    c.beginPath();
    c.arc(-22, -1, 1.8, 0, Math.PI * 2);
    c.arc(-14, -1, 1.8, 0, Math.PI * 2);
    c.arc(-6, -1, 1.8, 0, Math.PI * 2);
    c.arc(2, -1, 1.8, 0, Math.PI * 2);
    c.fill();
    c.restore();

    // 4. Divine Shyamal Complexion Head
    c.fillStyle = '#60a5fa';
    c.beginPath();
    c.arc(0, -188, 25, 0, Math.PI * 2);
    c.fill();

    // 5. Curly Glossy Black Hair
    c.fillStyle = '#0f172a';
    c.beginPath();
    c.arc(-18, -195, 10, 0, Math.PI * 2);
    c.arc(18, -195, 10, 0, Math.PI * 2);
    c.arc(0, -212, 16, 0, Math.PI * 2);
    c.fill();

    // 6. Peacock Feather (Mor-Pankh) in Crown
    c.save();
    c.translate(6, -225);
    c.rotate(0.2);
    // Outer emerald green leaf
    c.fillStyle = '#059669';
    c.beginPath();
    c.ellipse(0, -14, 9, 18, 0, 0, Math.PI * 2);
    c.fill();
    // Mid iridescent blue eye
    c.fillStyle = '#2563eb';
    c.beginPath();
    c.ellipse(0, -14, 5.5, 11, 0, 0, Math.PI * 2);
    c.fill();
    // Inner golden heart
    c.fillStyle = '#fbbf24';
    c.beginPath();
    c.ellipse(0, -13, 2.8, 5.5, 0, 0, Math.PI * 2);
    c.fill();
    c.restore();

    // 7. Golden Headband Crown
    c.fillStyle = '#f59e0b';
    c.fillRect(-22, -204, 44, 7);
    c.fillStyle = '#dc2626';
    c.beginPath();
    c.arc(0, -200, 3.5, 0, Math.PI * 2);
    c.fill();

    // 8. Expressive Lotus Eyes & Lip-Sync Mouth
    drawExpressiveEyesPair(c, 0, -186, 11, char.isBlinking, char, now, '#1e3a8a', '#3b82f6');
    drawLipSyncMouthOverlay(c, 0, -169, char.mouthOpen, char.isSpeaking);

  } else if (archetype === 'sathi') {
    // === INDIAN VILLAGE COMPANION (साथी - Disney/Pixar 3D Animated Rig) ===
    const isSpeaking = !!(char && char.isSpeaking);
    const armGesture = isSpeaking ? Math.sin(now * 0.013) * 9 : 0;

    // 1. Traditional Kurta & Colorful Embroidered Vest
    c.fillStyle = '#f8fafc';
    c.beginPath();
    c.roundRect(-26, -140, 52, 95, 10);
    c.fill();
    c.fillStyle = '#059669';
    c.beginPath();
    c.roundRect(-26, -140, 52, 50, 8);
    c.fill();
    c.fillStyle = '#f59e0b';
    c.fillRect(-4, -140, 8, 50);

    // 2. Friendly Indian Head & Turban/Hair
    c.fillStyle = '#fed7aa';
    c.beginPath();
    c.arc(0, -185, 23, 0, Math.PI * 2);
    c.fill();
    // Dark neat hair with village scarf / pagri
    c.fillStyle = '#1e293b';
    c.beginPath();
    c.arc(0, -202, 18, Math.PI, Math.PI * 2);
    c.fill();
    c.fillStyle = '#ea580c';
    c.beginPath();
    c.roundRect(-22, -206, 44, 10, 4);
    c.fill();

    // 3. Welcoming Gesturing Arm
    c.save();
    c.translate(22, -125);
    c.rotate(armGesture * 0.04);
    c.fillStyle = '#fed7aa';
    c.beginPath();
    c.arc(6, 6, 8, 0, Math.PI * 2);
    c.fill();
    c.restore();

    // 4. Cheerful Expressive Eyes & Lip-Sync Mouth
    drawExpressiveEyesPair(c, 0, -184, 10, char.isBlinking, char, now, '#451a03', '#92400e');
    drawLipSyncMouthOverlay(c, 0, -168, char.mouthOpen, char.isSpeaking);

  } else if (archetype === 'ram') {
    // === LORD SHRI RAM (भगवान श्री राम - Disney/Pixar 3D Cinematic Animated Rig) ===
    const isSpeaking = !!(char && char.isSpeaking);
    const armGesture = isSpeaking ? Math.sin(now * 0.013) * 10 : 0;

    // 1. Divine Solar Halo (Surya-vanshi Tej Mandal)
    c.save();
    const ramAura = c.createRadialGradient(0, -188, 14, 0, -188, 85);
    ramAura.addColorStop(0, 'rgba(254, 240, 138, 0.58)');
    ramAura.addColorStop(0.5, 'rgba(251, 191, 36, 0.30)');
    ramAura.addColorStop(1, 'rgba(251, 191, 36, 0)');
    c.fillStyle = ramAura;
    c.beginPath();
    c.arc(0, -188, 85, 0, Math.PI * 2);
    c.fill();
    // Shimmering aura rays
    c.strokeStyle = 'rgba(253, 224, 71, 0.32)';
    c.lineWidth = 1.8;
    for (let i = 0; i < 16; i++) {
      const angle = (i * Math.PI) / 8;
      c.beginPath();
      c.moveTo(Math.cos(angle) * 40, -188 + Math.sin(angle) * 40);
      c.lineTo(Math.cos(angle) * 72, -188 + Math.sin(angle) * 72);
      c.stroke();
    }
    c.restore();

    // 2. Royal Golden Kodanda Bow (Dhanush) on Back
    c.save();
    c.strokeStyle = '#d97706';
    c.lineWidth = 5.5;
    c.beginPath();
    c.arc(-26, -135, 80, -1.15, 1.15);
    c.stroke();
    c.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    c.lineWidth = 1.8;
    c.beginPath();
    c.moveTo(-26 + Math.cos(-1.15) * 80, -135 + Math.sin(-1.15) * 80);
    c.lineTo(-26 + Math.cos(1.15) * 80, -135 + Math.sin(1.15) * 80);
    c.stroke();
    // Gold tips
    c.fillStyle = '#fbbf24';
    c.beginPath();
    c.arc(-26 + Math.cos(-1.15) * 80, -135 + Math.sin(-1.15) * 80, 4.5, 0, Math.PI * 2);
    c.arc(-26 + Math.cos(1.15) * 80, -135 + Math.sin(1.15) * 80, 4.5, 0, Math.PI * 2);
    c.fill();
    c.restore();

    // 3. Arrow Quiver (Tarkash) with Golden Arrows behind right shoulder
    c.save();
    c.fillStyle = '#92400e';
    c.beginPath();
    c.roundRect(18, -165, 13, 52, 4);
    c.fill();
    // Arrow fletchings
    c.fillStyle = '#fbbf24';
    c.beginPath();
    c.moveTo(22, -165); c.lineTo(24, -182); c.lineTo(26, -165);
    c.moveTo(25, -165); c.lineTo(28, -185); c.lineTo(30, -165);
    c.fill();
    c.restore();

    // 4. Silken Midnight Hair falling behind neck and sacred bun
    c.fillStyle = '#0f172a';
    c.beginPath();
    c.arc(0, -225, 17, 0, Math.PI * 2);
    c.ellipse(-26, -165, 8.5, 24, -0.15, 0, Math.PI * 2);
    c.ellipse(26, -165, 8.5, 24, 0.15, 0, Math.PI * 2);
    c.fill();

    // 5. Left Arm (Grip holding divine Bow)
    c.save();
    c.strokeStyle = '#38bdf8';
    c.lineWidth = 13;
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(-24, -135);
    c.lineTo(-34, -100);
    c.lineTo(-30, -78);
    c.stroke();
    // Golden Bajuband & Wristlet
    c.fillStyle = '#fbbf24';
    c.fillRect(-32, -122, 10, 6);
    c.fillRect(-34, -88, 10, 6);
    c.restore();

    // 6. Right Arm (Royal Mudra / Conversational Gesture)
    c.save();
    c.strokeStyle = '#38bdf8';
    c.lineWidth = 13;
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(24, -135);
    c.lineTo(36, -106 + armGesture);
    c.lineTo(30, -82 + armGesture * 1.2);
    c.stroke();
    // Golden Bajuband & Wristlet
    c.fillStyle = '#fbbf24';
    c.fillRect(22, -122, 10, 6);
    c.fillRect(32, -92 + armGesture, 10, 6);
    // Hand
    c.fillStyle = '#38bdf8';
    c.beginPath();
    c.arc(30, -78 + armGesture * 1.2, 6.5, 0, Math.PI * 2);
    c.fill();
    c.restore();

    // 7. Divine Shyamal/Blue Complexion Torso (Soft 3D Shading)
    const ramTorsoGrad = c.createRadialGradient(0, -115, 14, 0, -100, 54);
    ramTorsoGrad.addColorStop(0, '#bae6fd');
    ramTorsoGrad.addColorStop(0.5, '#38bdf8');
    ramTorsoGrad.addColorStop(1, '#0284c7');
    c.fillStyle = ramTorsoGrad;
    c.beginPath();
    c.roundRect(-28, -148, 56, 95, [16, 16, 10, 10]);
    c.fill();

    // Pitambar Angavastra: Royal golden silk robe draped elegantly across chest
    const pitarGrad = c.createLinearGradient(-28, -148, 28, -75);
    pitarGrad.addColorStop(0, '#fef08a');
    pitarGrad.addColorStop(0.5, '#f59e0b');
    pitarGrad.addColorStop(1, '#d97706');
    c.fillStyle = pitarGrad;
    c.beginPath();
    c.moveTo(-28, -148);
    c.lineTo(28, -85);
    c.lineTo(14, -68);
    c.lineTo(-28, -118);
    c.closePath();
    c.fill();
    c.strokeStyle = '#b91c1c';
    c.lineWidth = 2.4;
    c.stroke();

    // Pearl Necklace (Mukta-mala) & Sapphire Pendant
    c.strokeStyle = '#fbbf24';
    c.lineWidth = 3.4;
    c.beginPath();
    c.arc(0, -144, 17, 0, Math.PI);
    c.stroke();
    c.fillStyle = '#ffffff';
    for (let p = -12; p <= 12; p += 6) {
      c.beginPath();
      c.arc(p, -144 + Math.sqrt(Math.max(0, 289 - p * p)) * 0.42, 2.3, 0, Math.PI * 2);
      c.fill();
    }
    c.fillStyle = '#2563eb';
    c.beginPath();
    c.arc(0, -127, 5, 0, Math.PI * 2);
    c.fill();

    // 8. Golden Silk Dhoti with Royal Borders
    const ramDhotiGrad = c.createLinearGradient(0, -78, 0, -42);
    ramDhotiGrad.addColorStop(0, '#f59e0b');
    ramDhotiGrad.addColorStop(1, '#d97706');
    c.fillStyle = ramDhotiGrad;
    c.beginPath();
    c.roundRect(-26, -76, 52, 36, [4, 4, 10, 10]);
    c.fill();
    // Crimson Waistband (Kamarband)
    c.fillStyle = '#b91c1c';
    c.fillRect(-27, -78, 54, 6);
    c.fillStyle = '#fbbf24';
    c.fillRect(-6, -78, 12, 38);

    // 9. Divine Lotus Blue Legs & Golden Paduka (Sandals)
    const ramLegGrad = c.createLinearGradient(-20, -45, 20, 0);
    ramLegGrad.addColorStop(0, '#7dd3fc');
    ramLegGrad.addColorStop(1, '#0284c7');
    c.fillStyle = ramLegGrad;
    c.beginPath();
    c.roundRect(-21, -45, 17, 46, [6, 6, 8, 8]);
    c.roundRect(4, -45, 17, 46, [6, 6, 8, 8]);
    c.fill();
    // Golden Paduka / Sandals
    c.fillStyle = '#fbbf24';
    c.fillRect(-23, -5, 20, 6);
    c.fillRect(3, -5, 20, 6);
    c.fillStyle = '#d97706';
    c.beginPath();
    c.arc(-13, -5, 3.2, 0, Math.PI * 2);
    c.arc(13, -5, 3.2, 0, Math.PI * 2);
    c.fill();

    // 10. Serene Divine Head (Neel-Kamal Shyamal Complexion)
    // Sculpted Ears & Makara Kundal (Golden hoop earrings)
    c.fillStyle = '#38bdf8';
    c.beginPath();
    c.arc(-29, -182, 8, 0, Math.PI * 2);
    c.arc(29, -182, 8, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = '#fbbf24';
    c.lineWidth = 2.5;
    c.beginPath();
    c.arc(-30, -177, 4.8, 0, Math.PI * 2);
    c.arc(30, -177, 4.8, 0, Math.PI * 2);
    c.stroke();
    c.fillStyle = '#ffffff';
    c.beginPath();
    c.arc(-30, -172, 2.2, 0, Math.PI * 2);
    c.arc(30, -172, 2.2, 0, Math.PI * 2);
    c.fill();

    // Main Face
    const ramFaceGrad = c.createRadialGradient(-5, -192, 8, 0, -186, 34);
    ramFaceGrad.addColorStop(0, '#e0f2fe');
    ramFaceGrad.addColorStop(0.55, '#38bdf8');
    ramFaceGrad.addColorStop(1, '#0284c7');
    c.fillStyle = ramFaceGrad;
    c.beginPath();
    c.arc(0, -186, 32, 0, Math.PI * 2);
    c.fill();

    // Soft Pink Lotus Cheek Glow
    c.fillStyle = 'rgba(244, 114, 182, 0.28)';
    c.beginPath();
    c.arc(-15, -176, 6, 0, Math.PI * 2);
    c.arc(15, -176, 6, 0, Math.PI * 2);
    c.fill();

    // Sacred Urdhva Pundra Tilak on Forehead
    c.fillStyle = '#ffffff';
    c.beginPath();
    c.moveTo(-4.5, -208);
    c.lineTo(-2, -194);
    c.lineTo(0, -192);
    c.lineTo(2, -194);
    c.lineTo(4.5, -208);
    c.lineTo(2.5, -208);
    c.lineTo(0, -195);
    c.lineTo(-2.5, -208);
    c.closePath();
    c.fill();
    c.fillStyle = '#dc2626';
    c.fillRect(-1, -206, 2, 12);

    // 11. Magnificent 3-Tiered Golden Swarna Mukut (Crown)
    c.fillStyle = '#fbbf24';
    c.beginPath();
    c.moveTo(-25, -206);
    c.lineTo(-12, -248);
    c.lineTo(0, -224);
    c.lineTo(12, -248);
    c.lineTo(25, -206);
    c.closePath();
    c.fill();
    c.strokeStyle = '#d97706';
    c.lineWidth = 2.5;
    c.stroke();
    // Crown base band with pearls
    c.fillStyle = '#f59e0b';
    c.fillRect(-23, -208, 46, 5.5);
    c.fillStyle = '#ffffff';
    for (let p = -20; p <= 20; p += 5) {
      c.beginPath();
      c.arc(p, -205.5, 1.5, 0, Math.PI * 2);
      c.fill();
    }
    // Crown jewels (Center Ruby & Emeralds)
    c.fillStyle = '#dc2626';
    c.beginPath();
    c.arc(0, -228, 5.5, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = '#059669';
    c.beginPath();
    c.arc(-10, -222, 3.2, 0, Math.PI * 2);
    c.arc(10, -222, 3.2, 0, Math.PI * 2);
    c.fill();

    // 12. Large Expressive Lotus Kamalnayan Pixar Eyes!
    drawExpressiveEyesPair(c, 0, -184, 11, char.isBlinking, char, now, '#451a03', '#92400e');

    // 13. Gentle Divine Lip-Sync Smile Overlay (Centered!)
    drawLipSyncMouthOverlay(c, 0, -166, char.mouthOpen, char.isSpeaking);

  } else if (archetype === 'sadhu') {
    // === VENERABLE SADHU / SAGE / RISHI (ऋषि / साधु) ===
    // 1. Saffron Ascetic Robes (Bhagva Chola)
    c.fillStyle = '#ea580c';
    c.beginPath();
    c.roundRect(-30, -145, 60, 105, 14);
    c.fill();

    // Saffron Shawl / Angavastra draped across shoulder
    c.fillStyle = '#f97316';
    c.beginPath();
    c.moveTo(-28, -145);
    c.lineTo(28, -90);
    c.lineTo(14, -75);
    c.lineTo(-28, -125);
    c.closePath();
    c.fill();

    // Legs & Khadau (wooden sandals)
    c.fillStyle = '#fed7aa';
    c.fillRect(-22, -45, 16, 48);
    c.fillRect(6, -45, 16, 48);
    c.fillStyle = '#78350f';
    c.fillRect(-24, -3, 20, 6);
    c.fillRect(4, -3, 20, 6);

    // 2. Rudraksha Mala around Neck
    c.strokeStyle = '#78350f';
    c.lineWidth = 4;
    c.beginPath();
    c.arc(0, -142, 18, 0, Math.PI);
    c.stroke();

    // 3. Wooden Danda (Walking Staff)
    c.fillStyle = '#78350f';
    c.fillRect(28, -180, 6, 180);

    // 4. Head & Face
    c.fillStyle = '#fed7aa';
    c.beginPath();
    c.arc(0, -185, 33, 0, Math.PI * 2);
    c.fill();

    // 5. Jata (Ascetic Hair Bun on Top)
    c.fillStyle = '#475569';
    c.beginPath();
    c.arc(0, -222, 18, 0, Math.PI * 2);
    c.fill();

    // 6. Sacred Tripund & Tilak on Forehead
    c.fillStyle = '#f8fafc';
    c.fillRect(-12, -202, 24, 2.5);
    c.fillRect(-10, -198, 20, 2.5);
    c.fillStyle = '#dc2626';
    c.beginPath();
    c.arc(0, -200, 2.5, 0, Math.PI * 2);
    c.fill();

    // 7. BOTH Expressive Eyes
    drawExpressiveEyesPair(c, 0, -186, 9.5, char.isBlinking, char, now, '#78350f', '#b45309');

    // 8. Long Flowing White/Silver Beard and Mustache
    c.fillStyle = '#f8fafc';
    c.beginPath();
    c.moveTo(-22, -172);
    c.quadraticCurveTo(0, -125, 22, -172);
    c.quadraticCurveTo(0, -112, -22, -172);
    c.fill();

    // 9. Lip-Sync Mouth
    drawLipSyncMouthOverlay(c, 0, -165, char.mouthOpen, char.isSpeaking);

  } else if (archetype === 'king') {
    // === MAJESTIC KING / RAJA (महाराजा / राजा) ===
    // Royal Crimson Tunic with Gold Trim
    c.fillStyle = '#b91c1c';
    c.beginPath();
    c.roundRect(-32, -148, 64, 98, 14);
    c.fill();
    // Gold sash
    c.fillStyle = '#fbbf24';
    c.fillRect(-32, -88, 64, 10);

    // Legs & Royal Boots
    c.fillStyle = '#1e293b';
    c.fillRect(-22, -50, 16, 50);
    c.fillRect(6, -50, 16, 50);

    // Head
    c.fillStyle = '#fed7aa';
    c.beginPath();
    c.arc(0, -186, 33, 0, Math.PI * 2);
    c.fill();

    // Golden Crown with Ruby Gem
    c.fillStyle = '#fbbf24';
    c.beginPath();
    c.moveTo(-26, -208);
    c.lineTo(-12, -240);
    c.lineTo(0, -220);
    c.lineTo(12, -240);
    c.lineTo(26, -208);
    c.closePath();
    c.fill();
    c.fillStyle = '#dc2626';
    c.beginPath();
    c.arc(0, -222, 5, 0, Math.PI * 2);
    c.fill();

    // Royal Mustache
    c.fillStyle = '#1e293b';
    c.beginPath();
    c.ellipse(-7, -172, 9, 4, 0.2, 0, Math.PI * 2);
    c.ellipse(7, -172, 9, 4, -0.2, 0, Math.PI * 2);
    c.fill();

    // BOTH Expressive Eyes
    drawExpressiveEyesPair(c, 0, -186, 9.5, char.isBlinking, char, now, '#1e293b', '#475569');

    // Lip-Sync Mouth (Centered!)
    drawLipSyncMouthOverlay(c, 0, -165, char.mouthOpen, char.isSpeaking);

  } else if (archetype === 'boy') {
    // === MODERN / STORYBOOK BOY (लड़का / रोहन) ===
    // Blue graphic t-shirt
    c.fillStyle = '#2563eb';
    c.beginPath();
    c.roundRect(-26, -135, 52, 85, 12);
    c.fill();
    // Denim shorts
    c.fillStyle = '#1e3a8a';
    c.fillRect(-22, -55, 44, 25);
    // Legs & sneakers
    c.fillStyle = '#fed7aa';
    c.fillRect(-20, -32, 14, 32);
    c.fillRect(6, -32, 14, 32);
    c.fillStyle = '#ef4444';
    c.fillRect(-22, -4, 18, 6);
    c.fillRect(4, -4, 18, 6);

    // Head
    c.fillStyle = '#fed7aa';
    c.beginPath();
    c.arc(0, -175, 30, 0, Math.PI * 2);
    c.fill();

    // Stylish Boy Hair (Forehead is clean!)
    c.fillStyle = '#1e293b';
    c.beginPath();
    c.ellipse(0, -195, 31, 16, 0, Math.PI, Math.PI * 2);
    c.fill();
    c.beginPath();
    c.moveTo(-28, -192);
    c.quadraticCurveTo(-14, -180, 0, -188);
    c.quadraticCurveTo(14, -180, 28, -192);
    c.lineTo(28, -200);
    c.lineTo(-28, -200);
    c.closePath();
    c.fill();

    // BOTH Expressive Eyes
    drawExpressiveEyesPair(c, 0, -177, 8.5, char.isBlinking, char, now, '#0284c7', '#38bdf8');

    // Lip-Sync Mouth (Centered!)
    drawLipSyncMouthOverlay(c, 0, -158, char.mouthOpen, char.isSpeaking);

  } else if (archetype === 'girl') {
    // === MODERN / STORYBOOK GIRL (लड़की / प्रिया) ===
    // Pink dress
    c.fillStyle = '#ec4899';
    c.beginPath();
    c.moveTo(-18, -135);
    c.lineTo(18, -135);
    c.lineTo(30, -50);
    c.lineTo(-30, -50);
    c.closePath();
    c.fill();

    // Legs & shoes
    c.fillStyle = '#fed7aa';
    c.fillRect(-18, -50, 12, 50);
    c.fillRect(6, -50, 12, 50);
    c.fillStyle = '#db2777';
    c.fillRect(-20, -4, 16, 6);
    c.fillRect(4, -4, 16, 6);

    // Head
    c.fillStyle = '#fed7aa';
    c.beginPath();
    c.arc(0, -175, 30, 0, Math.PI * 2);
    c.fill();

    // Cute Girl Hair & Ponytail (Forehead is clean!)
    c.fillStyle = '#78350f';
    c.beginPath();
    c.ellipse(0, -195, 31, 16, 0, Math.PI, Math.PI * 2);
    c.fill();
    c.beginPath();
    c.moveTo(-28, -192);
    c.quadraticCurveTo(-14, -178, 0, -186);
    c.quadraticCurveTo(14, -178, 28, -192);
    c.lineTo(28, -200);
    c.lineTo(-28, -200);
    c.closePath();
    c.fill();
    // Bouncy high ponytail
    c.beginPath();
    c.ellipse(-26, -188, 10, 16, -0.4, 0, Math.PI * 2);
    c.fill();
    // Pink hair bow ribbon
    c.fillStyle = '#ec4899';
    c.beginPath();
    c.arc(-22, -192, 5.5, 0, Math.PI * 2);
    c.fill();

    // BOTH Expressive Eyes
    drawExpressiveEyesPair(c, 0, -177, 8.5, char.isBlinking, char, now, '#7c3aed', '#c084fc');

    // Lip-Sync Mouth (Centered!)
    drawLipSyncMouthOverlay(c, 0, -158, char.mouthOpen, char.isSpeaking);

  } else if (archetype === 'tiger') {
    // === MAJESTIC CARTOON TIGER (बाघ) ===
    // Orange Body
    c.fillStyle = '#f97316';
    c.beginPath();
    c.roundRect(-30, -145, 60, 95, 16);
    c.fill();
    // White chest belly
    c.fillStyle = '#ffedd5';
    c.beginPath();
    c.ellipse(0, -100, 16, 32, 0, 0, Math.PI * 2);
    c.fill();
    // Black tiger stripes on body
    c.strokeStyle = '#1e293b';
    c.lineWidth = 4;
    c.beginPath();
    c.moveTo(-28, -125); c.lineTo(-14, -125);
    c.moveTo(28, -125); c.lineTo(14, -125);
    c.moveTo(-28, -95); c.lineTo(-14, -95);
    c.moveTo(28, -95); c.lineTo(14, -95);
    c.stroke();

    // Legs
    c.fillStyle = '#f97316';
    c.fillRect(-22, -50, 16, 50);
    c.fillRect(6, -50, 16, 50);

    // Head
    c.fillStyle = '#f97316';
    c.beginPath();
    c.arc(0, -185, 34, 0, Math.PI * 2);
    c.fill();
    // Ears
    c.fillStyle = '#1e293b';
    c.beginPath();
    c.arc(-24, -214, 10, 0, Math.PI * 2);
    c.arc(24, -214, 10, 0, Math.PI * 2);
    c.fill();

    // Muzzle & Whiskers
    c.fillStyle = '#ffedd5';
    c.beginPath();
    c.ellipse(0, -172, 18, 12, 0, 0, Math.PI * 2);
    c.fill();

    // BOTH Expressive Eyes
    drawExpressiveEyesPair(c, 0, -185, 9.5, char.isBlinking, char, now, '#ca8a04', '#facc15');

    // Lip-Sync Mouth
    drawLipSyncMouthOverlay(c, 0, -165, char.mouthOpen, char.isSpeaking, 'lion');

  } else {
    // === CARTOON EXPLORER / HERO / HUMAN ===
    // Torso / Outfit
    c.fillStyle = outfitColor;
    c.beginPath();
    c.roundRect(-30, -145, 60, 95, 14);
    c.fill();

    // Collar / Scarf
    c.fillStyle = '#f59e0b';
    c.beginPath();
    c.moveTo(-16, -145); c.lineTo(0, -128); c.lineTo(16, -145);
    c.fill();

    // Legs & Boots
    c.fillStyle = '#1e293b';
    c.fillRect(-22, -50, 16, 50);
    c.fillRect(6, -50, 16, 50);

    // Head
    c.fillStyle = skinColor;
    c.beginPath();
    c.arc(0, -185, 34, 0, Math.PI * 2);
    c.fill();

    // Explorer Cap / Hair (Forehead is clean!)
    c.fillStyle = '#78350f';
    c.beginPath();
    c.ellipse(0, -202, 34, 18, 0, Math.PI, Math.PI * 2);
    c.fill();
    // Explorer hat brim
    c.fillStyle = '#92400e';
    c.beginPath();
    c.ellipse(0, -202, 42, 8, 0, 0, Math.PI * 2);
    c.fill();

    // BOTH Expressive Eyes
    drawExpressiveEyesPair(c, 0, -185, 9.5, char.isBlinking, char, now, '#0284c7', '#38bdf8');

    // Lip-Sync Mouth (Centered!)
    drawLipSyncMouthOverlay(c, 0, -165, char.mouthOpen, char.isSpeaking);
  }
}

/**
 * High-Aesthetic Expressive Pixar/Disney Cartoon Eye Pair Engine
 * Draws synchronized left and right eyes with sclera depth, dual-tone iris, pupils, specular sparkles, and animated brows
 */
function drawExpressiveEyesPair(c, centerX, y, eyeSpacing, isBlinking, char, now, irisColor = '#0284c7', irisGlow = '#38bdf8') {
  const isSpeaking = !!(char && char.isSpeaking);
  const browRaise = isSpeaking ? -4.0 + Math.sin((now || 0) * 0.012) * 2.0 : -1.5;

  const eyeOffsets = [-eyeSpacing, eyeSpacing];

  eyeOffsets.forEach((offsetX, idx) => {
    const eyeX = centerX + offsetX;
    const isLeft = (idx === 0);

    // 1. Expressive Curved Eyebrow (Nodding/raising with speech)
    c.save();
    c.strokeStyle = '#0f172a';
    c.lineWidth = 2.4;
    c.lineCap = 'round';
    c.beginPath();
    if (isLeft) {
      c.moveTo(eyeX - 7, y - 11 + browRaise);
      c.quadraticCurveTo(eyeX, y - 15 + browRaise, eyeX + 6, y - 10 + browRaise);
    } else {
      c.moveTo(eyeX - 6, y - 10 + browRaise);
      c.quadraticCurveTo(eyeX, y - 15 + browRaise, eyeX + 7, y - 11 + browRaise);
    }
    c.stroke();
    c.restore();

    if (isBlinking) {
      // Smooth closed eyelid with eyelashes
      c.save();
      c.lineWidth = 2.8;
      c.strokeStyle = '#0f172a';
      c.lineCap = 'round';
      c.beginPath();
      c.moveTo(eyeX - 7, y);
      c.quadraticCurveTo(eyeX, y + 2, eyeX + 7, y);
      c.stroke();
      // Outer lash
      c.lineWidth = 1.6;
      c.beginPath();
      const lashTipX = isLeft ? eyeX - 8 : eyeX + 8;
      c.moveTo(isLeft ? eyeX - 5 : eyeX + 5, y);
      c.lineTo(lashTipX, y - 3);
      c.stroke();
      c.restore();
    } else {
      // 2. High-Aesthetic Sclera (White eye background with subtle upper shadow)
      c.save();
      c.fillStyle = '#ffffff';
      c.strokeStyle = 'rgba(15, 23, 42, 0.4)';
      c.lineWidth = 1.1;
      c.beginPath();
      c.ellipse(eyeX, y, 6.5, 9.5, 0, 0, Math.PI * 2);
      c.fill();
      c.stroke();

      // Subtle upper eyelid soft shadow inside eye
      c.fillStyle = 'rgba(100, 116, 139, 0.20)';
      c.beginPath();
      c.ellipse(eyeX, y - 3.5, 5.8, 4.5, 0, Math.PI, Math.PI * 2);
      c.fill();

      // 3. Glancing direction toward partner
      const glanceX = 1.5;
      const glanceY = isSpeaking ? -0.5 : 0.2;

      // 4. Vibrant Dual-Tone Iris
      const irisGrad = c.createRadialGradient(eyeX + glanceX - 0.8, y + glanceY - 0.8, 0.8, eyeX + glanceX, y + glanceY, 4.8);
      irisGrad.addColorStop(0, irisGlow);
      irisGrad.addColorStop(1, irisColor);
      c.fillStyle = irisGrad;
      c.beginPath();
      c.arc(eyeX + glanceX, y + glanceY, 4.2, 0, Math.PI * 2);
      c.fill();

      // 5. Deep Pupil
      c.fillStyle = '#0f172a';
      c.beginPath();
      c.arc(eyeX + glanceX, y + glanceY, 2.5, 0, Math.PI * 2);
      c.fill();

      // 6. Primary Specular Sparkle (Disney/Pixar twinkle)
      c.fillStyle = '#ffffff';
      c.beginPath();
      c.arc(eyeX + glanceX + 1.2, y + glanceY - 1.5, 1.4, 0, Math.PI * 2);
      c.fill();

      // Secondary micro sparkle
      c.beginPath();
      c.arc(eyeX + glanceX - 1.0, y + glanceY + 1.2, 0.7, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }
  });
}

function drawCartoonEyes(c, x, y, isBlinking, char, now) {
  // If called for humanoid character rigs where x is small, draw eye pair
  if (Math.abs(x) < 16) {
    drawExpressiveEyesPair(c, 0, y, 9.5, isBlinking, char, now);
    return;
  }
  // Otherwise draw single side eye for quadruped/profile animals (e.g. elephant, mouse profile)
  const isSpeaking = char && char.isSpeaking;
  const browRaise = isSpeaking ? -4.5 + Math.sin((now || 0) * 0.012) * 2.2 : -2;

  c.save();
  c.strokeStyle = '#1e293b';
  c.lineWidth = 2.8;
  c.lineCap = 'round';
  c.beginPath();
  c.moveTo(x - 9, y - 13 + browRaise);
  c.quadraticCurveTo(x, y - 18 + browRaise, x + 9, y - 12 + browRaise);
  c.stroke();
  c.restore();

  if (isBlinking) {
    c.save();
    c.lineWidth = 3.2;
    c.strokeStyle = '#0f172a';
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(x - 9, y);
    c.quadraticCurveTo(x, y + 2, x + 9, y);
    c.stroke();
    c.restore();
  } else {
    c.save();
    c.fillStyle = '#ffffff';
    c.strokeStyle = '#cbd5e1';
    c.lineWidth = 1.2;
    c.beginPath();
    c.ellipse(x, y, 8.5, 12, 0, 0, Math.PI * 2);
    c.fill();
    c.stroke();

    const glanceX = 2.4;
    const glanceY = isSpeaking ? -0.8 : 0.2;

    const irisGrad = c.createRadialGradient(x + glanceX - 1, y + glanceY - 1, 1, x + glanceX, y + glanceY, 6);
    irisGrad.addColorStop(0, '#38bdf8');
    irisGrad.addColorStop(1, '#0284c7');
    c.fillStyle = irisGrad;
    c.beginPath();
    c.arc(x + glanceX, y + glanceY, 5.5, 0, Math.PI * 2);
    c.fill();

    c.fillStyle = '#0f172a';
    c.beginPath();
    c.arc(x + glanceX, y + glanceY, 3.4, 0, Math.PI * 2);
    c.fill();

    c.fillStyle = '#ffffff';
    c.beginPath();
    c.arc(x + glanceX + 1.8, y + glanceY - 2.2, 2.0, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }
}

/**
 * Animated Talking Mouth (Lip-Sync Phonemes)
 */
function drawLipSyncMouthOverlay(c, x, y, mouthOpen, isSpeaking, charType = 'default') {
  c.save();
  c.translate(x, y);

  const isWide = (charType === 'elephant' || charType === 'lion');
  const baseW = isWide ? 40 : (charType === 'rabbit' ? 28 : 34);
  const baseH = isWide ? 34 : (charType === 'rabbit' ? 26 : 28);

  if (mouthOpen > 0.08 && isSpeaking) {
    const openFactor = Math.min(1.0, Math.max(0.15, mouthOpen));
    const mouthHeight = Math.max(8, openFactor * baseH);
    const mouthWidth = baseW + openFactor * 8;

    // 1. Soft Shadow / Outer Rim
    c.fillStyle = 'rgba(0, 0, 0, 0.45)';
    c.beginPath();
    c.ellipse(0, 2, mouthWidth / 2 + 3, mouthHeight / 2 + 3, 0, 0, Math.PI * 2);
    c.fill();

    // 2. Dark Crimson Velvet Mouth Cavity
    c.fillStyle = '#4c0519';
    c.beginPath();
    c.ellipse(0, 0, mouthWidth / 2, mouthHeight / 2, 0, 0, Math.PI * 2);
    c.fill();

    // 3. Pearly Upper Teeth Row
    c.fillStyle = '#ffffff';
    if (charType === 'rabbit') {
      // Cute Rabbit Buck Teeth (Two prominent front teeth!)
      c.beginPath();
      c.roundRect(-7, -mouthHeight * 0.5 + 1, 6.5, Math.min(9, mouthHeight * 0.55), 2);
      c.roundRect(0.5, -mouthHeight * 0.5 + 1, 6.5, Math.min(9, mouthHeight * 0.55), 2);
      c.fill();
    } else if (charType === 'lion') {
      // Lion Upper Teeth with Corner Canines
      c.beginPath();
      c.roundRect(-mouthWidth * 0.4, -mouthHeight * 0.5 + 1, mouthWidth * 0.8, Math.min(6, mouthHeight * 0.4), 2);
      c.fill();
      // Sharp Canines
      c.beginPath();
      c.moveTo(-mouthWidth * 0.38, -mouthHeight * 0.5 + 1);
      c.lineTo(-mouthWidth * 0.34, -mouthHeight * 0.5 + 9);
      c.lineTo(-mouthWidth * 0.3, -mouthHeight * 0.5 + 1);
      c.moveTo(mouthWidth * 0.3, -mouthHeight * 0.5 + 1);
      c.lineTo(mouthWidth * 0.34, -mouthHeight * 0.5 + 9);
      c.lineTo(mouthWidth * 0.38, -mouthHeight * 0.5 + 1);
      c.fill();
    } else {
      // Broad White Upper Teeth
      c.beginPath();
      c.roundRect(-mouthWidth * 0.4, -mouthHeight * 0.5 + 1, mouthWidth * 0.8, Math.min(6.5, mouthHeight * 0.4), 2);
      c.fill();
    }

    // 4. Lower Teeth (if mouth is wide open)
    if (openFactor > 0.38 && charType !== 'rabbit') {
      c.fillStyle = '#ffffff';
      c.beginPath();
      c.roundRect(-mouthWidth * 0.32, mouthHeight * 0.5 - 5, mouthWidth * 0.64, 4.5, 2);
      c.fill();
    }

    // 5. Glossy Pink Bouncing Animated Tongue
    c.fillStyle = '#f43f5e';
    c.beginPath();
    c.ellipse(0, mouthHeight * 0.22, mouthWidth * 0.3, mouthHeight * 0.32, 0, 0, Math.PI * 2);
    c.fill();

    // 6. Tongue Specular Highlight
    c.fillStyle = 'rgba(255, 255, 255, 0.45)';
    c.beginPath();
    c.ellipse(-3, mouthHeight * 0.16, mouthWidth * 0.14, mouthHeight * 0.12, 0, 0, Math.PI * 2);
    c.fill();

    // 7. Expressive 3D Outer Lip Rim
    c.lineWidth = 3.0;
    c.strokeStyle = '#e11d48';
    c.beginPath();
    c.ellipse(0, 0, mouthWidth / 2, mouthHeight / 2, 0, 0, Math.PI * 2);
    c.stroke();
  } else {
    // Pleasant happy wide smile with dimple accents
    c.lineWidth = 3.2;
    c.strokeStyle = '#881337';
    c.lineCap = 'round';
    c.beginPath();
    c.arc(0, -3, isWide ? 15 : 11, 0.2, Math.PI - 0.2);
    c.stroke();

    // Dimple accents
    c.beginPath();
    c.moveTo(isWide ? 13 : 9, -3);
    c.lineTo(isWide ? 16 : 11, -1);
    c.moveTo(isWide ? -13 : -9, -3);
    c.lineTo(isWide ? -16 : -11, -1);
    c.stroke();
  }

  c.restore();
}

function updateCharacterBlinks(now, char) {
  if (now > char.blinkTimer) {
    char.isBlinking = true;
    setTimeout(() => {
      char.isBlinking = false;
      char.blinkTimer = performance.now() + 3000 + Math.random() * 2500;
    }, 140);
  }
}

// -----------------------------------------------------
// DYNAMIC SPEECH BUBBLE & SUBTITLES
// -----------------------------------------------------
function drawSpeechBubble(speakerChar, text) {
  ctx.save();

  const bubbleX = speakerChar.baseX + (speakerChar.facing === 1 ? 70 : -70);
  const bubbleY = speakerChar.baseY - 265;
  const bubbleWidth = 300;
  const bubbleHeight = 84;

  // Speech bubble box with subtle drop shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;

  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(bubbleX - bubbleWidth / 2, bubbleY - bubbleHeight / 2, bubbleWidth, bubbleHeight, 16);
  ctx.fill();
  ctx.stroke();

  // Reset shadow for tail and text
  ctx.shadowColor = 'transparent';

  // Tail pointing to speaker mouth
  ctx.beginPath();
  ctx.moveTo(bubbleX - 14, bubbleY + bubbleHeight / 2);
  ctx.lineTo(speakerChar.baseX + (speakerChar.facing === 1 ? 25 : -25), speakerChar.baseY - 170);
  ctx.lineTo(bubbleX + 14, bubbleY + bubbleHeight / 2);
  ctx.closePath();
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.stroke();

  // Dialogue inside bubble (Bilingual wrapping font)
  ctx.font = "bold 15px 'Outfit', 'Noto Sans Devanagari', sans-serif";
  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'center';

  // Multi-line wrap
  const words = text.split(/\s+/);
  let line1 = "";
  let line2 = "";
  let mid = Math.ceil(words.length / 2);
  for (let i = 0; i < words.length; i++) {
    if (i < mid) line1 += (line1 ? " " : "") + words[i];
    else line2 += (line2 ? " " : "") + words[i];
  }

  if (line2) {
    if (line1.length > 36) line1 = line1.substring(0, 33) + "...";
    if (line2.length > 36) line2 = line2.substring(0, 33) + "...";
    ctx.fillText(line1, bubbleX, bubbleY - 6);
    ctx.fillText(line2, bubbleX, bubbleY + 16);
  } else {
    if (line1.length > 44) line1 = line1.substring(0, 41) + "...";
    ctx.fillText(line1, bubbleX, bubbleY + 6);
  }

  ctx.restore();
}

/**
 * Draws a sleek Netflix / Disney+ broadcast Speaker Spotlight badge with character icon and live pulsing audio equalizer
 */
function drawCinematicSpeakerSpotlight(c, scene, width, height, now) {
  c.save();
  const spk = (scene.speaker || "").trim();
  const spkLower = spk.toLowerCase();
  const isHathi = spkLower.includes("हाथी") || spkLower.includes("गजराज") || spkLower.includes("जंबो") || spkLower.includes("elephant");
  const isChuha = spkLower.includes("चूहा") || spkLower.includes("मूषक") || spkLower.includes("rat") || spkLower.includes("mouse");
  const isSher = spkLower.includes("शेर") || spkLower.includes("सिंह") || spkLower.includes("lion");
  const isChiku = spkLower.includes("खरगोश") || spkLower.includes("चीकू") || spkLower.includes("rabbit");

  let icon = "🎭";
  if (isHathi) icon = "🐘";
  else if (isChuha) icon = "🐭";
  else if (isSher) icon = "🦁";
  else if (isChiku) icon = "🐇";

  const cleanName = spk.replace(/[\[\]]/g, '').trim();

  // Position: top-left cinematic badge
  const bx = 28;
  const by = 28;
  const bw = Math.max(230, cleanName.length * 15 + 115);
  const bh = 56;

  // Glassmorphic background
  c.fillStyle = "rgba(4, 7, 14, 0.78)";
  c.strokeStyle = "rgba(16, 185, 129, 0.55)";
  c.lineWidth = 1.5;
  c.beginPath();
  c.roundRect(bx, by, bw, bh, 14);
  c.fill();
  c.stroke();

  // Character Emoji Avatar
  c.font = "26px system-ui, sans-serif";
  c.textAlign = "left";
  c.textBaseline = "middle";
  c.fillText(icon, bx + 14, by + bh / 2);

  // Character Name
  c.fillStyle = "#ffffff";
  c.font = "bold 16px 'Outfit', 'Noto Sans Devanagari', sans-serif";
  c.fillText(cleanName, bx + 52, by + 20);

  // Live Sound Waveform Equalizer
  c.fillStyle = "#10b981";
  for (let i = 0; i < 6; i++) {
    const waveH = state.isPlaying ? (4 + Math.abs(Math.sin(now * 0.016 + i * 0.9)) * 14) : 4;
    c.fillRect(bx + 52 + i * 6, by + 32, 3.5, waveH);
  }

  c.fillStyle = "#6ee7b7";
  c.font = "bold 11px 'Outfit', sans-serif";
  c.fillText("VOICEOVER LIVE", bx + 94, by + 39);

  c.restore();
}

function renderScreenSubtitles(scene, width, height) {
  ctx.save();
  const boxWidth = Math.min(width - 120, 1100);
  const boxHeight = 84;
  const boxX = (width - boxWidth) / 2;
  const boxY = height - 104;

  // Frosted Glass Bar
  ctx.fillStyle = 'rgba(7, 10, 19, 0.88)';
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 14);
  ctx.fill();

  ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
  ctx.lineWidth = 1.8;
  ctx.stroke();

  // Speaker Badge
  const cleanSpeaker = (scene.speaker || "").replace(/[\[\]]/g, '').trim();
  const isCharA = cleanSpeaker.toLowerCase().includes(state.charA.name.toLowerCase()) || cleanSpeaker.includes("हाथी") || cleanSpeaker.includes("elephant");
  ctx.font = "bold 18px 'Outfit', 'Noto Sans Devanagari', sans-serif";
  ctx.fillStyle = isCharA ? '#10b981' : '#38bdf8';
  ctx.textAlign = 'left';
  ctx.fillText(cleanSpeaker.toUpperCase(), boxX + 24, boxY + 28);

  // Dialogue Line with adaptive multi-line wrapping for long sentences in Hindi / English
  const text = (scene.text || "").replace(/^\[.*?\]\s*[:：]?\s*/, '').trim();
  const fontSize = text.length > 70 ? 17 : 21;
  ctx.font = `500 ${fontSize}px 'Outfit', 'Noto Sans Devanagari', sans-serif`;
  ctx.fillStyle = '#ffffff';

  if (text.length > 60) {
    // Wrap to two lines
    const words = text.split(/\s+/);
    let l1 = "", l2 = "";
    const mid = Math.ceil(words.length / 2);
    for (let i = 0; i < words.length; i++) {
      if (i < mid) l1 += (l1 ? " " : "") + words[i];
      else l2 += (l2 ? " " : "") + words[i];
    }
    ctx.fillText(l1, boxX + 24, boxY + 52);
    ctx.fillText(l2, boxX + 24, boxY + 74);
  } else {
    ctx.fillText(text, boxX + 24, boxY + 62);
  }

  ctx.restore();
}

function drawAtmosphericParticles(width, height, time) {
  ctx.save();
  for (let p of state.particles) {
    p.y += p.speedY;
    p.x += p.speedX;

    if (p.y < 0) p.y = height;
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;

    ctx.fillStyle = `rgba(254, 240, 138, ${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function renderCharacterPreviews() {
  if (previewCtxA) {
    previewCtxA.clearRect(0, 0, 70, 70);
    const archA = state.charA.species || getCharacterArchetype(state.charA.name);
    const spriteA = charSprites[archA]?.img;
    if (spriteA && spriteA.complete && spriteA.naturalWidth > 0) {
      previewCtxA.drawImage(spriteA, 8, 2, 54, 66);
    } else {
      previewCtxA.save();
      previewCtxA.translate(35, 65);
      previewCtxA.scale(0.38, 0.38);
      drawProceduralCartoonRig(previewCtxA, { ...state.charA, isSpeaking: false, mouthOpen: 0 }, performance.now());
      previewCtxA.restore();
    }
  }
  if (previewCtxB) {
    previewCtxB.clearRect(0, 0, 70, 70);
    const archB = state.charB.species || getCharacterArchetype(state.charB.name);
    const spriteB = charSprites[archB]?.img;
    if (spriteB && spriteB.complete && spriteB.naturalWidth > 0) {
      previewCtxB.drawImage(spriteB, 8, 2, 54, 66);
    } else {
      previewCtxB.save();
      previewCtxB.translate(35, 65);
      previewCtxB.scale(0.38, 0.38);
      drawProceduralCartoonRig(previewCtxB, { ...state.charB, isSpeaking: false, mouthOpen: 0 }, performance.now());
      previewCtxB.restore();
    }
  }
}

function triggerTestTalk(charObj, testLine) {
  charObj.isSpeaking = true;
  charObj.mouthOpen = 0.8;
  setTimeout(() => { charObj.isSpeaking = false; charObj.mouthOpen = 0.05; }, 2200);

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(testLine);
    u.rate = 1.0;
    u.onboundary = () => { charObj.mouthOpen = Math.min(1.0, charObj.mouthOpen + 0.6); };
    u.onend = () => { charObj.isSpeaking = false; charObj.mouthOpen = 0.05; };
    window.speechSynthesis.speak(u);
  }
}

// =====================================================
// AUDIO PLAYBACK & LIP-SYNC SYNC
// =====================================================
function initAudioContext() {
  if (!state.audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      state.audioContext = new AudioCtx();
      state.analyserNode = state.audioContext.createAnalyser();
      state.analyserNode.fftSize = 64;
      state.audioDataArray = new Uint8Array(state.analyserNode.frequencyBinCount);
    }
  }
  if (state.audioContext && state.audioContext.state === 'suspended') {
    state.audioContext.resume();
  }
}

function updateAudioVolume() {
  if (state.analyserNode && state.audioDataArray && state.activeAudioElement && !state.activeAudioElement.paused) {
    state.analyserNode.getByteFrequencyData(state.audioDataArray);
    let sum = 0;
    for (let i = 0; i < 16; i++) sum += state.audioDataArray[i];
    state.currentSpeechVolume = Math.min(1.0, (sum / 16) / 110);
  } else if (state.currentSpeechVolume > 0) {
    state.currentSpeechVolume = Math.max(0, state.currentSpeechVolume - 0.08);
  }
}

if (!window._activeUtterances) window._activeUtterances = [];

function warmUpSpeechEngine() {
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.getVoices();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (e) {}
  }
}

// =====================================================
// DEVANAGARI HINDI TO PHONETIC TRANSLITERATOR
// Guarantees audible pronunciation on ANY device/OS even if Hindi TTS voice pack is not installed!
// =====================================================
function devanagariToPhonetic(str) {
  if (!str) return "";
  if (!/[\u0900-\u097F]/.test(str)) return str;

  const wordMap = {
    "श्री": "Shree",
    "प्रभु": "Prabhu",
    "राम": "Ram",
    "हनुमान": "Hanuman",
    "जी": "Ji",
    "साधु": "Sadhu",
    "राजा": "Raja",
    "रानी": "Rani",
    "हाथी": "Hathi",
    "चूहा": "Chuha",
    "शेर": "Sher",
    "मित्र": "Mitra",
    "दोस्त": "Dost",
    "नमस्ते": "Namaste",
    "प्रणाम": "Pranaam",
    "धन्य": "Dhanya",
    "जंगल": "Jungle",
    "पानी": "Paani",
    "नदी": "Nadi",
    "रास्ता": "Rasta",
    "सीता": "Seeta",
    "माता": "Maata",
    "खोज": "Khoj",
    "सुग्रीव": "Sugreev",
    "मित्रता": "Mitrata",
    "मार्ग": "Marg",
    "वीर": "Veer",
    "शक्ति": "Shakti",
    "बुद्धि": "Buddhi",
    "वाणी": "Vaani",
    "मधुर": "Madhur",
    "विनम्र": "Vinamra",
    "अद्भुत": "Adbhut",
    "वातावरण": "Vatavaran",
    "सचमुच": "Sachmuch",
    "साधारण": "Sadharan",
    "मनुष्य": "Manushya",
    "चरणों": "Charno",
    "पहचान": "Pehchan",
    "वेश": "Vesh",
    "परिचय": "Parichay",
    "जीवन": "Jeevan",
    "आगे": "Aage",
    "बढ़ना": "Badhna",
    "बताओ": "Batao"
  };

  let result = str;
  for (const [hi, ph] of Object.entries(wordMap)) {
    result = result.replace(new RegExp(hi, 'g'), ph);
  }

  const vowels = {
    '\u0905': 'a', '\u0906': 'aa', '\u0907': 'i', '\u0908': 'ee',
    '\u0909': 'u', '\u090A': 'oo', '\u090B': 'ri', '\u090F': 'e',
    '\u0910': 'ai', '\u0913': 'o', '\u0914': 'au', '\u0902': 'n',
    '\u0903': 'h'
  };

  const matras = {
    '\u093E': 'aa', '\u093F': 'i', '\u0940': 'ee', '\u0941': 'u',
    '\u0942': 'oo', '\u0943': 'ri', '\u0947': 'e', '\u0948': 'ai',
    '\u094B': 'o', '\u094C': 'au', '\u0902': 'n', '\u0901': 'n'
  };

  const cons = {
    '\u0915': 'k', '\u0916': 'kh', '\u0917': 'g', '\u0918': 'gh', '\u0919': 'ng',
    '\u091A': 'ch', '\u091B': 'chh', '\u091C': 'j', '\u091D': 'jh', '\u091E': 'ny',
    '\u091F': 't', '\u0920': 'th', '\u0921': 'd', '\u0922': 'dh', '\u0923': 'n',
    '\u0924': 't', '\u0925': 'th', '\u0926': 'd', '\u0927': 'dh', '\u0928': 'n',
    '\u092A': 'p', '\u092B': 'ph', '\u092C': 'b', '\u092D': 'bh', '\u092E': 'm',
    '\u092F': 'y', '\u0930': 'r', '\u0932': 'l', '\u0935': 'v', '\u0936': 'sh',
    '\u0937': 'sh', '\u0938': 's', '\u0939': 'h'
  };

  let out = "";
  for (let i = 0; i < result.length; i++) {
    const ch = result[i];
    const next = result[i + 1] || "";

    if (vowels[ch]) {
      out += vowels[ch];
    } else if (cons[ch]) {
      const base = cons[ch];
      if (next === '\u094D') {
        out += base;
        i++;
      } else if (matras[next]) {
        out += base + matras[next];
        i++;
      } else if (next >= '\u0900' && next <= '\u097F' && !matras[next]) {
        out += base + 'a';
      } else {
        out += base;
      }
    } else if (matras[ch]) {
      out += matras[ch];
    } else {
      out += ch;
    }
  }

  return out.replace(/\s+/g, ' ').trim();
}

// Global Audio Engine Unlocker
function unlockStudioAudioEngine() {
  if (state.audioContext && state.audioContext.state === 'suspended') {
    state.audioContext.resume().catch(() => {});
  }
  if ('speechSynthesis' in window && window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
}
['click', 'touchstart', 'keydown'].forEach(evt => {
  window.addEventListener(evt, unlockStudioAudioEngine, { passive: true });
});

function playSceneDialogueAudio(scene, audioDest = null) {
  if (state.isMuted) return;
  initAudioContext();
  warmUpSpeechEngine();

  // Stop any ongoing buffer source or audio element
  if (state.activeAudioSource) {
    try { state.activeAudioSource.stop(); } catch (e) {}
    state.activeAudioSource = null;
  }
  if (state.activeAudioElement) {
    try {
      state.activeAudioElement.pause();
      state.activeAudioElement.currentTime = 0;
    } catch (e) {}
    state.activeAudioElement = null;
  }

  if (state.activeDialogueTimer) {
    clearInterval(state.activeDialogueTimer);
    state.activeDialogueTimer = null;
  }

  const spkLower = (scene.speaker || "").toLowerCase();
  const isNarrator = spkLower.includes("narrator") || spkLower.includes("सूत्रधार") || spkLower.includes("कथावाचक");
  const isCharA = !isNarrator && (
    (state.charA.name && spkLower.includes(state.charA.name.toLowerCase())) ||
    spkLower.includes("char a") ||
    spkLower.includes("हनुमान") ||
    spkLower.includes("साधु") ||
    spkLower.includes("राजा") ||
    spkLower.includes("हाथी") ||
    spkLower.includes("शेर")
  );
  const activeChar = isCharA ? state.charA : state.charB;

  // Duck background music during dialogue gently (to 0.25 so cinematic ambiance remains alive!)
  if (state.bgMusicAudio) {
    state.bgMusicAudio.volume = state.bgMusicVolume * 0.25;
  }
  if (state.bgGainNode && state.audioContext) {
    state.bgGainNode.gain.setValueAtTime(state.bgMusicVolume * 0.25, state.audioContext.currentTime);
  }

  function restoreMusicVolume() {
    state.currentSpeechVolume = 0;
    activeChar.mouthOpen = 0.04;
    activeChar.targetMouthOpen = 0.04;
    activeChar.isSpeaking = false;
    if (state.activeDialogueTimer) {
      clearInterval(state.activeDialogueTimer);
      state.activeDialogueTimer = null;
    }
    if (state.bgMusicAudio) {
      state.bgMusicAudio.volume = state.bgMusicVolume;
    }
    if (state.bgGainNode && state.audioContext) {
      state.bgGainNode.gain.setValueAtTime(state.bgMusicVolume, state.audioContext.currentTime);
    }
  }

  const cleanText = (scene.text || "").replace(/\[.*?\]/g, '').replace(/[^\w\s\u0900-\u097F.,?!।\u0027\u0022]/g, ' ').trim();
  const isHindi = /[\u0900-\u097F]/.test(cleanText) || state.language === 'hi';

  activeChar.isSpeaking = true;
  state.currentSpeechVolume = 0.90;
  let animTick = 0;
  state.activeDialogueTimer = setInterval(() => {
    if (!state.isPlaying || state.isMuted) {
      clearInterval(state.activeDialogueTimer);
      return;
    }
    animTick++;
    const syll = Math.sin(animTick * 0.55) * 0.35 + Math.sin(animTick * 1.25) * 0.25 + 0.45;
    activeChar.mouthOpen = Math.min(1.0, Math.max(0.20, syll));
    activeChar.targetMouthOpen = activeChar.mouthOpen;
    state.currentSpeechVolume = 0.65 + syll * 0.35;
  }, 45);

  // 1. Play synthesized / decoded audio buffer into Web Audio (Direct to destination AND audioDest for MP4 recording!)
  if (scene.audioBuffer && state.audioContext) {
    try {
      const src = state.audioContext.createBufferSource();
      src.buffer = scene.audioBuffer;
      const speechGain = state.audioContext.createGain();
      speechGain.gain.value = 1.0;
      src.connect(speechGain);
      speechGain.connect(state.audioContext.destination);
      if (audioDest) {
        speechGain.connect(audioDest);
      }
      src.onended = () => {
        restoreMusicVolume();
        if (state.activeAudioSource === src) state.activeAudioSource = null;
      };
      src.start(0);
      state.activeAudioSource = src;
    } catch (e) {
      console.warn("BufferSource audio error:", e);
    }
  }

  // 2. In live studio player, also speak via system SpeechSynthesis so speech words are crystal clear in the room!
  if (!audioDest && ('speechSynthesis' in window)) {
    speakSystemSpeechAloud(cleanText, isHindi, isCharA, isNarrator, restoreMusicVolume);
  }
}

/**
 * Robust System Speech Synthesis: Speaks Hindi / English aloud in the room without browser speech locks
 */
/**
 * Selects the optimal natural human voice for Hindi and English dialogues
 */
function getBestVoiceForSpeaker(isHindi, isCharA, isNarrator) {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices() || [];
  if (!voices || voices.length === 0) return null;

  if (isHindi) {
    // 1. Natural online voices (Edge / Chrome)
    const madhur = voices.find(v => v.name.toLowerCase().includes('madhur'));
    const swara = voices.find(v => v.name.toLowerCase().includes('swara'));
    const googleHi = voices.find(v => v.name.includes('Google हिन्दी') || v.name.includes('Google hi-IN'));

    if (isNarrator) {
      if (swara) return swara;
      if (googleHi) return googleHi;
    } else if (isCharA) {
      if (madhur) return madhur;
      if (googleHi) return googleHi;
    } else {
      // Character B
      if (swara) return swara;
      if (madhur) return madhur;
    }

    // 2. Any Hindi voice (Kalpana, Hemant, etc.)
    const anyHi = voices.find(v => v.lang.startsWith('hi') || v.lang.replace('_', '-').includes('hi-IN') || v.name.toLowerCase().includes('hindi'));
    if (anyHi) return anyHi;

    // 3. Any Indian accent voice (en-IN)
    const inVoice = voices.find(v => v.lang.replace('_', '-').includes('en-IN') || v.name.toLowerCase().includes('india'));
    if (inVoice) return inVoice;
  } else {
    // English Natural Voices
    const naturalEn = voices.find(v => (v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('online')) && v.lang.startsWith('en'));
    if (naturalEn) return naturalEn;
    const anyEn = voices.find(v => v.lang.startsWith('en'));
    if (anyEn) return anyEn;
  }

  return voices[0] || null;
}

/**
 * Robust System Speech Synthesis: Speaks Hindi / English aloud in the room without browser speech locks
 */
function speakSystemSpeechAloud(text, isHindi, isCharA, isNarrator, onDone) {
  if (!text || text.length === 0 || !('speechSynthesis' in window)) {
    if (onDone) onDone();
    return;
  }

  try {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    // Cancel previous stuck utterance so dialogues are crisp and in sync
    window.speechSynthesis.cancel();

    const selectedVoice = getBestVoiceForSpeaker(isHindi, isCharA, isNarrator);

    // Only transliterate if forced onto an incompatible foreign non-Indian voice
    let spokenText = text;
    if (isHindi && selectedVoice && !selectedVoice.lang.startsWith('hi') && !selectedVoice.lang.includes('IN')) {
      spokenText = devanagariToPhonetic(text);
    }

    const u = new SpeechSynthesisUtterance(spokenText);
    window._activeUtterances = window._activeUtterances || [];
    window._activeUtterances.push(u); // Prevent Chrome GC bug!
    u.volume = 1.0;

    if (selectedVoice) {
      u.voice = selectedVoice;
      u.lang = selectedVoice.lang || (isHindi ? 'hi-IN' : 'en-US');
    } else {
      u.lang = isHindi ? 'hi-IN' : 'en-US';
    }

    if (isNarrator) {
      u.rate = 0.96;
      u.pitch = 1.0;
    } else if (isCharA) {
      u.rate = 0.94;
      u.pitch = 0.92; // Heroic deep tone
    } else {
      u.rate = 0.98;
      u.pitch = 1.05; // Clear expressive tone
    }

    u.onend = () => {
      const idx = window._activeUtterances.indexOf(u);
      if (idx !== -1) window._activeUtterances.splice(idx, 1);
      if (onDone) onDone();
    };

    u.onerror = (e) => {
      const idx = window._activeUtterances.indexOf(u);
      if (idx !== -1) window._activeUtterances.splice(idx, 1);
      if (onDone) onDone();
    };

    window.speechSynthesis.speak(u);
  } catch (err) {
    console.warn("speakSystemSpeechAloud exception:", err);
    if (onDone) onDone();
  }
}

function startBackgroundSynth(audioDest = null) {
  if (!state.bgMusicEnabled || state.isMuted) return;
  initAudioContext();

  if (!state.bgMusicAudio) {
    state.bgMusicAudio = document.getElementById('studio-bg-music-player') || new Audio('background.mp3');
    state.bgMusicAudio.loop = true;
  }

  state.bgMusicAudio.volume = state.bgMusicVolume;
  state.bgMusicAudio.play().catch(e => console.warn("Background music autoplay prevented:", e));

  if (state.audioContext && !state.bgSourceNode && state.bgMusicAudio) {
    try {
      state.bgSourceNode = state.audioContext.createMediaElementSource(state.bgMusicAudio);
      state.bgGainNode = state.audioContext.createGain();
      state.bgGainNode.gain.setValueAtTime(state.bgMusicVolume, state.audioContext.currentTime);
      state.bgSourceNode.connect(state.bgGainNode);
      state.bgGainNode.connect(state.audioContext.destination);
      if (audioDest) {
        state.bgGainNode.connect(audioDest);
      }
    } catch (e) {}
  } else if (state.bgGainNode && audioDest) {
    try { state.bgGainNode.connect(audioDest); } catch(e) {}
  }
}

function stopBackgroundSynth() {
  if (state.bgMusicAudio) {
    try { state.bgMusicAudio.pause(); } catch (e) {}
  }
}

// =====================================================
// PLAYBACK TRANSPORT CONTROLS
// =====================================================
function togglePlayPause() {
  if (state.isPlaying) pauseVideo();
  else playVideo();
}

function playVideo() {
  if (state.scenes.length === 0) return;
  if (state.currentTime >= state.totalDuration) state.currentTime = 0;

  state.isPlaying = true;
  DOM.playPauseIcon.textContent = '⏸';
  DOM.overlayPlayBtn.querySelector('.play-icon').textContent = '⏸';

  // 1. Immediately unlock audio in direct user gesture context
  initAudioContext();
  if (state.audioContext && state.audioContext.state === 'suspended') {
    state.audioContext.resume();
  }
  startBackgroundSynth();

  // 2. Play active scene dialogue IMMEDIATELY in user click stack (avoids browser autoplay blocking)
  const activeScene = state.scenes.find(s => state.currentTime >= s.startTime && state.currentTime < s.endTime) || state.scenes[0];
  let lastScene = activeScene;
  if (activeScene) {
    playSceneDialogueAudio(activeScene);
  }

  state.lastFrameTimestamp = performance.now();

  function loop(now) {
    if (!state.isPlaying) return;

    const delta = (now - state.lastFrameTimestamp) / 1000;
    state.lastFrameTimestamp = now;

    state.currentTime += delta;

    if (state.currentTime >= state.totalDuration) {
      state.currentTime = state.totalDuration;
      renderFrame(state.currentTime);
      pauseVideo();
      return;
    }

    const currentScene = state.scenes.find(s => state.currentTime >= s.startTime && state.currentTime < s.endTime);
    if (currentScene && currentScene !== lastScene) {
      lastScene = currentScene;
      playSceneDialogueAudio(currentScene);
    }

    renderFrame(state.currentTime);
    state.animationFrameId = requestAnimationFrame(loop);
  }

  state.animationFrameId = requestAnimationFrame(loop);
}

function pauseVideo() {
  state.isPlaying = false;
  DOM.playPauseIcon.textContent = '▶';
  DOM.overlayPlayBtn.querySelector('.play-icon').textContent = '▶';
  if (state.animationFrameId) {
    cancelAnimationFrame(state.animationFrameId);
    state.animationFrameId = null;
  }
  if (state.activeAudioElement) state.activeAudioElement.pause();
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  stopBackgroundSynth();
}

function stopPlayback() {
  pauseVideo();
  state.currentTime = 0;
  renderFrame(0);
}

function seekTo(targetTime) {
  if (state.activeAudioElement) {
    try { state.activeAudioElement.pause(); } catch (e) {}
  }
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
  if (state.activeDialogueTimer) {
    clearInterval(state.activeDialogueTimer);
    state.activeDialogueTimer = null;
  }
  state.charA.mouthOpen = 0.04;
  state.charB.mouthOpen = 0.04;
  state.charA.isSpeaking = false;
  state.charB.isSpeaking = false;
  state.currentTime = Math.max(0, Math.min(targetTime, state.totalDuration));
  renderFrame(state.currentTime);
}

function jumpToPrevScene() {
  const current = state.scenes.find(s => state.currentTime >= s.startTime && state.currentTime < s.endTime);
  if (current && current.index > 0) seekTo(state.scenes[current.index - 1].startTime);
  else seekTo(0);
}

function jumpToNextScene() {
  const current = state.scenes.find(s => state.currentTime >= s.startTime && state.currentTime < s.endTime);
  if (current && current.index < state.scenes.length - 1) {
    seekTo(state.scenes[current.index + 1].startTime);
  } else {
    // End of story reached smoothly
    pauseVideo();
    seekTo(0);
  }
}

function toggleMute() {
  state.isMuted = !state.isMuted;
  DOM.muteIcon.textContent = state.isMuted ? '🔇' : '🔊';
  if (state.isMuted) {
    if (state.activeAudioElement) state.activeAudioElement.pause();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    stopBackgroundSynth();
  } else if (state.isPlaying) {
    startBackgroundSynth();
  }
}

// =====================================================
// EXPORTS & YOUTUBE PIPELINE (STEP 9)
// =====================================================
async function downloadVideo(isShorts = false) {
  if (state.scenes.length === 0) {
    alert("Please click 'Generate Video' first to generate scenes before exporting!");
    return;
  }

  const btn = isShorts ? DOM.btnDownloadShorts : DOM.btnDownloadVideo;
  const orig = btn ? btn.innerHTML : "";
  if (btn) {
    btn.innerHTML = `<span>⏳</span> Rendering ${isShorts ? 'YouTube Shorts (9:16 MP4)' : 'YouTube Full MP4'}...`;
    btn.disabled = true;
  }

  const previousVideoMode = state.videoMode;
  if (isShorts && state.videoMode !== 'portrait') {
    state.videoMode = 'portrait';
    DOM.canvasContainer.className = 'canvas-container portrait-mode';
    DOM.canvas.width = 720;
    DOM.canvas.height = 1280;
    if (DOM.viewportAspectIndicator) DOM.viewportAspectIndicator.textContent = '9:16 Shorts Stage';
    renderFrame(0);
  }

  try {
    pauseVideo();
    state.currentTime = 0;
    initAudioContext();

    const canvasStream = DOM.canvas.captureStream(30);
    let combinedStream = canvasStream;
    let audioDest = null;

    if (state.audioContext) {
      try {
        audioDest = state.audioContext.createMediaStreamDestination();
        if (state.bgGainNode) state.bgGainNode.connect(audioDest);
        const audioTracks = audioDest.stream.getAudioTracks();
        if (audioTracks.length > 0) {
          combinedStream = new MediaStream([
            ...canvasStream.getVideoTracks(),
            ...audioTracks
          ]);
        }
      } catch (e) {
        console.warn("Audio stream capture error:", e);
      }
    }

    let mimeType = '';
    let ext = 'mp4';
    const formats = [
      { mime: 'video/mp4;codecs=avc1,mp4a.40.2', ext: 'mp4' },
      { mime: 'video/mp4', ext: 'mp4' },
      { mime: 'video/webm;codecs=vp9,opus', ext: 'webm' },
      { mime: 'video/webm;codecs=vp8,opus', ext: 'webm' },
      { mime: 'video/webm', ext: 'webm' }
    ];
    for (const f of formats) {
      if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(f.mime)) {
        mimeType = f.mime;
        ext = f.ext;
        break;
      }
    }

    const recorder = mimeType ? new MediaRecorder(combinedStream, { mimeType }) : new MediaRecorder(combinedStream);
    const chunks = [];

    recorder.ondataavailable = (e) => { if (e.data && e.data.size > 0) chunks.push(e.data); };
    recorder.onstop = () => {
      const finalMime = mimeType || chunks[0]?.type || 'video/mp4';
      const blob = new Blob(chunks, { type: finalMime });
      const prefix = isShorts ? 'VidoNova_YouTube_Shorts' : 'VidoNova_YouTube_Movie';
      const cleanA = (state.charA.name || "CharA").replace(/\s+/g, '_');
      const cleanB = (state.charB.name || "CharB").replace(/\s+/g, '_');
      const filename = `${prefix}_${cleanA}_${cleanB}_${state.targetDurationMinutes}m.${ext}`;
      triggerDownload(blob, filename);

      if (btn) {
        btn.innerHTML = orig;
        btn.disabled = false;
      }
      showYouTubeToast(`🎬 ${isShorts ? 'YouTube Shorts' : 'YouTube MP4'} video exported successfully: ${filename}!`);

      if (isShorts && previousVideoMode !== 'portrait') {
        state.videoMode = previousVideoMode;
        if (DOM.videoModeSelect) DOM.videoModeSelect.value = previousVideoMode;
        if (previousVideoMode === 'landscape') {
          DOM.canvasContainer.className = 'canvas-container landscape-mode';
          DOM.canvas.width = 1280;
          DOM.canvas.height = 720;
          if (DOM.viewportAspectIndicator) DOM.viewportAspectIndicator.textContent = '16:9 Cinema Stage';
        } else if (previousVideoMode === 'square') {
          DOM.canvasContainer.className = 'canvas-container square-mode';
          DOM.canvas.width = 720;
          DOM.canvas.height = 720;
          if (DOM.viewportAspectIndicator) DOM.viewportAspectIndicator.textContent = '1:1 Square Stage';
        }
        renderFrame(state.currentTime);
      }
    };

    recorder.start(100);
    startBackgroundSynth(audioDest);
    if (audioDest && state.bgGainNode) {
      state.bgGainNode.connect(audioDest);
    }

    let lastScene = null;
    const start = performance.now();
    let isRecordingActive = true;

    // Steady interval ticker ensures frame rendering & progress never stalls when tab is backgrounded
    const recordTicker = setInterval(() => {
      if (!isRecordingActive) {
        clearInterval(recordTicker);
        return;
      }
      const elapsed = (performance.now() - start) / 1000;
      state.currentTime = Math.min(elapsed, state.totalDuration);

      const activeScene = state.scenes.find(s => state.currentTime >= s.startTime && state.currentTime < s.endTime);
      if (activeScene && activeScene !== lastScene) {
        lastScene = activeScene;
        playSceneDialogueAudio(activeScene, audioDest);
      }

      renderFrame(state.currentTime);

      const progressPct = Math.min(100, Math.round((state.currentTime / state.totalDuration) * 100));
      if (btn) btn.innerHTML = `<span>⏳</span> Rendering MP4 (${progressPct}%)...`;

      if (state.currentTime >= state.totalDuration) {
        isRecordingActive = false;
        clearInterval(recordTicker);
        try { recorder.stop(); } catch (e) {}
        stopBackgroundSynth();
        seekTo(0);
      }
    }, 33);
  } catch (err) {
    alert("Recording failed: " + err.message);
    if (btn) {
      btn.innerHTML = orig;
      btn.disabled = false;
    }
  }
}

// =====================================================
// YOUTUBE METADATA & SEO GENERATOR (STEP 9)
// =====================================================
function copyYouTubeMetadata() {
  if (state.scenes.length === 0) {
    alert("Please generate a video first before copying YouTube info!");
    return;
  }

  const langTag = state.language === 'hi' ? 'Hindi' : (state.language === 'en' ? 'English' : 'Hinglish');
  const styleLabel = (state.genre || 'children').replace('_', ' ').toUpperCase();
  const title = `🎬 ${state.charA.name} और ${state.charB.name} | Complete Animated Movie in ${langTag} | VidoNova AI`;

  let chapters = "";
  state.scenes.forEach((s, idx) => {
    chapters += `${formatHMS(s.startTime).substring(3)} Scene ${idx + 1}: [${s.speaker}] ${s.text.substring(0, 40)}...\n`;
  });

  const description = `${title}

📖 Story Overview:
${(state.storyTheme || DOM.storyInput.value).substring(0, 250)}...

⏱️ Video Chapters & Timestamps (YouTube Chapters):
${chapters}
✨ Video Details:
• Visual Style: ${styleLabel} Animation
• Audio: Multi-Character Synchronized Speech
• Runtime: ${formatHMS(state.totalDuration)}
• Output: 1080p Full HD MP4 (Ready for YouTube)
• Created with: VidoNova AI Studio Engine

🏷️ Recommended YouTube Tags:
#HindiStories #AnimatedStories #Cartoon #KidsStories #MoralStories #YouTubeShorts #3DAnimation #VidoNovaAI
`;

  navigator.clipboard.writeText(description).then(() => {
    showYouTubeToast("📋 YouTube Title, Description & Chapters copied to clipboard!");
  }).catch(() => {
    alert("YouTube Metadata ready!\n\n" + title);
  });
}

function showYouTubeToast(msg) {
  const existing = document.querySelector('.yt-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'yt-toast';
  toast.innerHTML = `<span>✨</span> <span>${msg}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// =====================================================
// STORYBOARD TOOLBAR ACTIONS (STEP 8)
// =====================================================
function addNewScene() {
  const lastScene = state.scenes[state.scenes.length - 1];
  const lastSpeaker = lastScene ? lastScene.speaker : state.charA.name;
  const nextSpeaker = (lastSpeaker.includes(state.charA.name)) ? state.charB.name : state.charA.name;
  const startTime = lastScene ? lastScene.endTime : 0;
  const duration = 5.0;
  const endTime = startTime + duration;
  const newIndex = state.scenes.length;

  const defaultDialogue = (state.language === 'hi')
    ? "हाँ दोस्त, बिल्कुल सही कहा आपने! चलो मिलकर इस काम को पूरा करते हैं।"
    : "Yes my friend, that is very true! Let us work together to make this happen.";

  const newScene = {
    index: newIndex,
    speaker: nextSpeaker,
    text: defaultDialogue,
    startTime: startTime,
    endTime: endTime,
    duration: duration,
    action: "talking",
    imageLoaded: true,
    imageElement: (visualStyleImages[state.genre] && visualStyleImages[state.genre][0]) || null
  };

  state.scenes.push(newScene);
  state.totalDuration = endTime;
  DOM.durationTime.textContent = formatHMS(state.totalDuration);

  renderStoryboardCards();
  populateNLETimeline(state.scenes);
  buildSceneReelCards(state.scenes);
  syncScriptFromScenes();
  showYouTubeToast(`➕ Added Scene #${newIndex + 1}!`);
}

function rebalanceSceneTiming() {
  if (state.scenes.length === 0) return;
  const totalTargetSec = state.targetDurationMinutes * 60;
  const totalChars = state.scenes.reduce((acc, s) => acc + Math.max(10, (s.text || "").length), 0);

  let currentStart = 0;
  state.scenes.forEach(s => {
    const proportion = Math.max(10, (s.text || "").length) / totalChars;
    const dur = Math.max(3.0, Math.round((proportion * totalTargetSec) * 10) / 10);
    s.startTime = currentStart;
    s.duration = dur;
    s.endTime = currentStart + dur;
    currentStart += dur;
  });

  state.totalDuration = currentStart;
  DOM.durationTime.textContent = formatHMS(state.totalDuration);
  renderStoryboardCards();
  populateNLETimeline(state.scenes);
  syncScriptFromScenes();
  renderFrame(state.currentTime);
  showYouTubeToast(`⏱️ Rebalanced ${state.scenes.length} scenes to match ${state.targetDurationMinutes} Minutes!`);
}

function syncScreenplayFromStoryboard() {
  syncScriptFromScenes();
  showYouTubeToast("📜 Screenplay input updated from Storyboard edits!");
}

function downloadSubtitles() {
  if (state.scenes.length === 0) return;
  let srt = "";
  state.scenes.forEach((s, i) => {
    srt += `${i + 1}\n${formatSRT(s.startTime)} --> ${formatSRT(s.endTime)}\n[${s.speaker}]: ${s.text}\n\n`;
  });
  triggerDownload(new Blob([srt], { type: 'text/plain;charset=utf-8' }), 'cartoon_subtitles.srt');
}

function downloadScreenplayScript() {
  const text = DOM.storyInput.value.trim();
  if (!text) return;
  triggerDownload(new Blob([text], { type: 'text/plain;charset=utf-8' }), 'screenplay_script.txt');
}

function saveProjectToFile() {
  const data = {
    version: "5.0",
    charA: state.charA,
    charB: state.charB,
    script: DOM.storyInput.value,
    scenes: state.scenes
  };
  triggerDownload(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }), 'toon_project.json');
}

function loadProjectFromFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const d = JSON.parse(event.target.result);
      if (d.charA) Object.assign(state.charA, d.charA);
      if (d.charB) Object.assign(state.charB, d.charB);
      if (d.script) DOM.storyInput.value = d.script;

      DOM.charAName.value = state.charA.name;
      DOM.charBName.value = state.charB.name;
      renderCharacterPreviews();
      parseScreenplayText(d.script);
      alert("Project loaded!");
    } catch (err) {
      alert("Invalid project file: " + err.message);
    }
  };
  reader.readAsText(file);
}

function resetStudio() {
  stopPlayback();
  DOM.storyInput.value = "";
  state.scenes = [];
  state.totalDuration = 0;
  populateNLETimeline([]);
  DOM.sceneReelCards.innerHTML = '<div class="empty-gallery-state">Generated visual scenes will appear here.</div>';
  DOM.characterCount.textContent = '0 characters • 0 scenes';
  DOM.progressContainer.style.display = 'none';
  DOM.exportBanner.style.display = 'none';
  DOM.emptyPlaceholder.style.display = 'flex';
  DOM.cinematicHud.style.display = 'none';
  DOM.btnPlayPause.disabled = true;
  DOM.btnStop.disabled = true;
  DOM.btnPrevScene.disabled = true;
  DOM.btnNextScene.disabled = true;
  DOM.timelineSlider.disabled = true;
  DOM.currentTime.textContent = '00:00:00';
  DOM.durationTime.textContent = '00:00:00';
  ctx.clearRect(0, 0, DOM.canvas.width, DOM.canvas.height);
}

function formatHMS(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function formatSRT(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
}

function stringHashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (hash << 5) - hash + str.charCodeAt(i);
  return hash;
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, t => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[t] || t));
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function delay(ms) { return new Promise(res => setTimeout(res, ms)); }
