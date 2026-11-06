/**
 * Orbital Field Medical Journal — Core Application Logic
 * Visual Identity: Warm, Calm, Editorial-Clinical
 * Usability: Spaceflight / Gloved Hands / Offline PWA / Red-Green Blindness Proof
 * Clinical Decision Support System (Research Prototype)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ================= MATHEMATICAL CONSTANTS =================
  // Radius r = 76 => Circumference = 2 * PI * 76 = 477.522...
  const RING_CIRCUMFERENCE = 477.52;

  // ================= RED-GREEN COLORBLIND ACCESSIBLE STATUS CONFIG =================
  const STATUS_CONFIG = {
    'in-range': {
      className: 'status--in-range',
      label: 'In range',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
    },
    'attention': {
      className: 'status--attention',
      label: 'Watch',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
    },
    'flight-surgeon': {
      className: 'status--flight-surgeon',
      label: 'Contact flight surgeon',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`
    },
    'emergency': {
      className: 'status--emergency',
      label: 'Emergency',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
    }
  };

  /**
   * REQUIREMENT 1: In-place badge updater (Zero DOM node destruction or orphaned pointers)
   * Updates className and innerHTML directly without replacing the element.
   */
  function setBadge(el, status, customLabel = null) {
    if (typeof el === 'string') {
      el = document.querySelector(el);
    }
    if (!el) return;
    const config = STATUS_CONFIG[status] || STATUS_CONFIG['in-range'];
    el.className = `status-badge ${config.className}`;
    const labelText = customLabel !== null ? customLabel : config.label;
    el.innerHTML = `${config.iconSvg}<span>${labelText}</span>`;
  }

  // ================= SAFE IN-MEMORY FALLBACK STORAGE (REQUIREMENT 5) =================
  const storage = {
    _mem: {},
    getItem(key) {
      try {
        if (typeof localStorage !== 'undefined') {
          const val = localStorage.getItem(key);
          if (val !== null) return val;
        }
      } catch (e) {}
      return this._mem[key] !== undefined ? this._mem[key] : null;
    },
    setItem(key, val) {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(key, val);
        }
      } catch (e) {}
      this._mem[key] = String(val);
    },
    removeItem(key) {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(key);
        }
      } catch (e) {}
      delete this._mem[key];
    }
  };

  // ================= STATE MANAGEMENT =================
  let urlTheme = null;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.has('theme')) urlTheme = params.get('theme');
  } catch (e) {}

  let savedTheme = urlTheme || storage.getItem('astro_theme') || 'light';
  if (savedTheme !== 'dark' && savedTheme !== 'light') {
    savedTheme = 'light';
  }

  const state = {
    chartRange: 7,
    theme: savedTheme,
    overallReadiness: 87,
    selectedSystem: 'ocular',
    missionDay: 142,
    systems: {
      ocular: {
        id: 'ocular',
        name: 'Ocular & SANS Monitoring',
        subtitle: 'Spaceflight-Associated Neuro-ocular Syndrome',
        status: 'in-range',
        primaryIndicator: 'opticDisc',
        yUnit: 'µm',
        baselineMin: 280,
        baselineMax: 325,
        metric1Label: 'Peripapillary retinal thickness ',
        metric1Val: '302 µm',
        metric1Sub: '+4 µm baseline shift ',
        metric2Label: 'Visual Acuity (LogMAR)',
        metric2Val: '0.08',
        metric2Sub: 'In nominal range ',
        whyMeasurement: 'Microgravity shifts ~2L of fluid toward the head, increasing pressure behind the eyes. Daily optical tracking detects early optic nerve swelling before it causes permanent visual changes.',
        mechanism: 'Spaceflight-Associated Neuro-ocular Syndrome (SANS) results from loss of hydrostatic pressure gradient in microgravity, generating a persistent ~1.5–2.0 L cephalad fluid shift. Intraocular venous engorgement increases optic nerve sheath diameter (ONSD) and optic disc thickness.',
        trendData: [
          { day: 'MET-6', baseline: 298, observed: 298 },
          { day: 'MET-5', baseline: 298, observed: 299 },
          { day: 'MET-4', baseline: 298, observed: 300 },
          { day: 'MET-3', baseline: 298, observed: 301 },
          { day: 'MET-2', baseline: 298, observed: 301 },
          { day: 'MET-1', baseline: 298, observed: 302 },
          { day: 'Today', baseline: 298, observed: 302 },
        ]
      },
      cardio: {
        id: 'cardio',
        name: 'Cardiovascular & Hemodynamics',
        subtitle: 'Arterial Baroreflex & Central Venous Equilibrium',
        status: 'in-range',
        primaryIndicator: 'systolic',
        yUnit: 'mmHg',
        baselineMin: 95,
        baselineMax: 130,
        metric1Label: 'Resting Blood Pressure',
        metric1Val: '118 / 76 mmHg',
        metric1Sub: 'MAP: 90 mmHg (Nominal) ',
        metric2Label: 'Resting Heart Rate',
        metric2Val: '62 bpm',
        metric2Sub: 'Sinus rhythm ',
        whyMeasurement: 'In weightlessness, blood volume redistributes and the heart works against less resistance. Tracking blood pressure and heart rate ensures the heart muscle and arterial reflexes maintain healthy tone.',
        mechanism: 'Cephalic fluid redistribution initially expands central blood volume, leading to neuro-humoral down-regulation of plasma volume (~12%). Countermeasure exercise preserves ventricular compliance and orthostatic tolerance for atmospheric re-entry.',
        trendData: [
          { day: 'MET-6', baseline: 115, observed: 115 },
          { day: 'MET-5', baseline: 115, observed: 116 },
          { day: 'MET-4', baseline: 115, observed: 118 },
          { day: 'MET-3', baseline: 115, observed: 119 },
          { day: 'MET-2', baseline: 115, observed: 117 },
          { day: 'MET-1', baseline: 115, observed: 118 },
          { day: 'Today', baseline: 115, observed: 118 },
        ]
      },
      cranial: {
        id: 'cranial',
        name: 'Neuro-Vestibular Adaptation',
        subtitle: 'Otolith Asymmetry & Spatial Orientation',
        status: 'in-range',
        primaryIndicator: 'vorGain',
        yUnit: 'Gain',
        baselineMin: 0.95,
        baselineMax: 1.05,
        metric1Label: 'Vestibular Ocular Reflex (VOR)',
        metric1Val: '0.98 Gain',
        metric1Sub: 'Norm: 1.00 ± 0.05 ',
        metric2Label: 'Saccadic Latency',
        metric2Val: '194 ms',
        metric2Sub: 'Nominal rapid tracking ',
        whyMeasurement: 'The inner ear vestibular organs lose gravity cues in space, confusing balance and gaze stabilization. Tracking the reflex verifies that the brain balance centers are adapting safely.',
        mechanism: 'In 0g, gravity cues from otolith organs (utricle and saccule) dissociate from semicircular canal signals. Sensory conflict resolves after 72–96 hours through cerebellar plastic reweighting.',
        trendData: [
          { day: 'MET-6', baseline: 1.00, observed: 0.88 },
          { day: 'MET-5', baseline: 1.00, observed: 0.91 },
          { day: 'MET-4', baseline: 1.00, observed: 0.94 },
          { day: 'MET-3', baseline: 1.00, observed: 0.96 },
          { day: 'MET-2', baseline: 1.00, observed: 0.97 },
          { day: 'MET-1', baseline: 1.00, observed: 0.98 },
          { day: 'Today', baseline: 1.00, observed: 0.98 },
        ]
      },
      spine: {
        id: 'spine',
        name: 'Axial Spine & Musculoskeletal',
        subtitle: 'Intervertebral Disc Hydration & Height Elongation',
        status: 'in-range',
        primaryIndicator: 'spineElongation',
        yUnit: 'cm',
        baselineMin: 1.5,
        baselineMax: 4.5,
        metric1Label: 'Axial Spine Elongation',
        metric1Val: '+3.1 cm',
        metric1Sub: 'Typical microgravity expansion ',
        metric2Label: 'Back Discomfort Score',
        metric2Val: '0 / 10',
        metric2Sub: 'Zero lumbar strain reported ',
        whyMeasurement: 'Without gravity compressing spinal discs, astronauts spines can elongate up to 5 cm, risking back strain and disc herniation during vigorous work or landing.',
        mechanism: 'Lack of gravitational axial compression allows intervertebral discs to imbibe fluid and expand, causing 2–5 cm stature elongation and paraspinal flattening.',
        trendData: [
          { day: 'MET-6', baseline: 0.0, observed: 1.2 },
          { day: 'MET-5', baseline: 0.0, observed: 1.8 },
          { day: 'MET-4', baseline: 0.0, observed: 2.3 },
          { day: 'MET-3', baseline: 0.0, observed: 2.7 },
          { day: 'MET-2', baseline: 0.0, observed: 2.9 },
          { day: 'MET-1', baseline: 0.0, observed: 3.0 },
          { day: 'Today', baseline: 0.0, observed: 3.1 },
        ]
      },
      pulmonary: {
        id: 'pulmonary',
        name: 'Pulmonary Gas Exchange & Atmosphere',
        subtitle: 'Alveolar Ventilation & Ambient pCO2 Matching',
        status: 'in-range',
        primaryIndicator: 'pco2',
        yUnit: 'mmHg',
        baselineMin: 1.5,
        baselineMax: 3.0,
        metric1Label: 'Pulse Oximetry (SpO2)',
        metric1Val: '99%',
        metric1Sub: 'Nominal oxygenation ',
        metric2Label: 'Cabin Ambient pCO2',
        metric2Val: '2.4 mmHg',
        metric2Sub: 'Strict threshold < 3.0 mmHg ',
        whyMeasurement: 'Without gravity-driven convection, exhaled carbon dioxide can form pockets around sleeping or working crew. Monitoring SpO2 and ambient CO2 ensures clean oxygenation.',
        mechanism: 'Absence of natural thermal air convection causes localized exhaled CO2 pooling if ventilation is impaired. Ventilation-perfusion matching remains homogeneous in 0g.',
        trendData: [
          { day: 'MET-6', baseline: 2.4, observed: 2.2 },
          { day: 'MET-5', baseline: 2.4, observed: 2.3 },
          { day: 'MET-4', baseline: 2.4, observed: 2.5 },
          { day: 'MET-3', baseline: 2.4, observed: 2.6 },
          { day: 'MET-2', baseline: 2.4, observed: 2.4 },
          { day: 'MET-1', baseline: 2.4, observed: 2.3 },
          { day: 'Today', baseline: 2.4, observed: 2.4 },
        ]
      },
      limbs: {
        id: 'limbs',
        name: 'Lower Limbs & Venous Return',
        subtitle: 'Soleus & Gastrocnemius Density Countermeasures',
        status: 'in-range',
        primaryIndicator: 'calfCircumference',
        yUnit: 'cm',
        baselineMin: 36.5,
        baselineMax: 38.5,
        metric1Label: 'Calf Circumference',
        metric1Val: '37.8 cm',
        metric1Sub: '-0.4 cm change from pre-flight ',
        metric2Label: 'Isometric Peak Force',
        metric2Val: '96% Ref',
        metric2Sub: 'ARED countermeasure target ',
        whyMeasurement: 'Weight-bearing leg muscles quickly lose mass and tone when not walking under 1g. Regular measurements verify that daily treadmill and resistive exercises are preventing muscle atrophy.',
        mechanism: 'Anti-gravity postural muscles (slow-twitch soleus) undergo rapid deconditioning if not actively loaded against microgravity. Resistive deadlifts maintain bone and muscle mass.',
        trendData: [
          { day: 'MET-6', baseline: 38.2, observed: 38.2 },
          { day: 'MET-5', baseline: 38.2, observed: 38.0 },
          { day: 'MET-4', baseline: 38.2, observed: 37.9 },
          { day: 'MET-3', baseline: 38.2, observed: 37.9 },
          { day: 'MET-2', baseline: 38.2, observed: 37.8 },
          { day: 'MET-1', baseline: 38.2, observed: 37.8 },
          { day: 'Today', baseline: 38.2, observed: 37.8 },
        ]
      },
      neuro: {
        id: 'neuro',
        name: 'Brain & Behavioral Health',
        subtitle: 'Psychomotor Vigilance & Cognitive Latency',
        status: 'in-range',
        primaryIndicator: 'reactionTime',
        yUnit: 'ms',
        baselineMin: 190,
        baselineMax: 260,
        metric1Label: 'PVT Response Latency',
        metric1Val: '214 ms',
        metric1Sub: 'Baseline: 214 ms ',
        metric2Label: 'Attention Lapses (>500ms)',
        metric2Val: '0 lapses',
        metric2Sub: 'High operational vigilance ',
        whyMeasurement: 'Cognitive alertness and motor speed can degrade under microgravity fluid shifts, circadian fatigue, and high workload. Daily PVT tracks neuro-behavioral readiness.',
        mechanism: 'Sleep debt, circadian desynchrony, and microgravity cephalic venous engorgement increase neural reaction latency and attention lapses > 500 ms.',
        trendData: [
          { day: 'MET-6', baseline: 214, observed: 210 },
          { day: 'MET-5', baseline: 214, observed: 212 },
          { day: 'MET-4', baseline: 214, observed: 215 },
          { day: 'MET-3', baseline: 214, observed: 218 },
          { day: 'MET-2', baseline: 214, observed: 214 },
          { day: 'MET-1', baseline: 214, observed: 216 },
          { day: 'Today', baseline: 214, observed: 214 }
        ]
      },
      sleep: {
        id: 'sleep',
        name: 'Sleep Architecture & Circadian',
        subtitle: 'Polysomnography & Melatonin Phase Alignment',
        status: 'in-range',
        primaryIndicator: 'sleepDuration',
        yUnit: 'hrs',
        baselineMin: 6.5,
        baselineMax: 8.5,
        metric1Label: 'Sleep Duration & Score',
        metric1Val: '7.4 hrs',
        metric1Sub: '88% sleep efficiency ',
        metric2Label: 'REM Proportion',
        metric2Val: '21%',
        metric2Sub: 'Nominal restorative stages ',
        whyMeasurement: '90-minute orbital light cycles and spacecraft ambient noise disrupt deep slow-wave sleep. Tracking daily sleep duration guards against cumulative sleep debt.',
        mechanism: 'Loss of 24h natural solar zeitgeber and circadian temperature rhythms dampens endogenous melatonin secretion, shortening total sleep time by 1–1.5 hours/night.',
        trendData: [
          { day: 'MET-6', baseline: 7.2, observed: 7.1 },
          { day: 'MET-5', baseline: 7.2, observed: 6.9 },
          { day: 'MET-4', baseline: 7.2, observed: 7.5 },
          { day: 'MET-3', baseline: 7.2, observed: 7.0 },
          { day: 'MET-2', baseline: 7.2, observed: 7.3 },
          { day: 'MET-1', baseline: 7.2, observed: 7.2 },
          { day: 'Today', baseline: 7.2, observed: 7.4 }
        ]
      },
      immune: {
        id: 'immune',
        name: 'Immune & Cosmic Radiation',
        subtitle: 'Ionizing Particle Dose & Cellular Immunity',
        status: 'in-range',
        primaryIndicator: 'radiationDose',
        yUnit: 'µGy/d',
        baselineMin: 200,
        baselineMax: 400,
        metric1Label: 'Daily Ionizing Radiation',
        metric1Val: '268 µGy/d',
        metric1Sub: 'Accumulated: 38.1 mGy ',
        metric2Label: 'Salivary Cortisol',
        metric2Val: '0.34 µg/dL',
        metric2Sub: 'Nominal neuroendocrine marker ',
        whyMeasurement: 'Deep space galactic cosmic radiation and solar particle events damage DNA and suppress T-cell function. Daily dosimetric tracking safeguards biological thresholds.',
        mechanism: 'Ionizing radiation creates double-strand DNA breaks and reactive oxygen species, coupled with microgravity-induced down-regulation of T-cell activation markers.',
        trendData: [
          { day: 'MET-6', baseline: 270, observed: 255 },
          { day: 'MET-5', baseline: 270, observed: 260 },
          { day: 'MET-4', baseline: 270, observed: 280 },
          { day: 'MET-3', baseline: 270, observed: 274 },
          { day: 'MET-2', baseline: 270, observed: 265 },
          { day: 'MET-1', baseline: 270, observed: 269 },
          { day: 'Today', baseline: 270, observed: 268 }
        ]
      },
      metabolic: {
        id: 'metabolic',
        name: 'Metabolic Core & Thermoregulation',
        subtitle: 'Microgravity Space Fever & Endocrine Homeostasis',
        status: 'in-range',
        primaryIndicator: 'coreTemp',
        yUnit: '°C',
        baselineMin: 36.8,
        baselineMax: 37.6,
        metric1Label: 'Core Body Temperature',
        metric1Val: '37.1 °C',
        metric1Sub: '+0.1 °C baseline elevation ',
        metric2Label: '24h Hydration Balance',
        metric2Val: '2.4 L / day',
        metric2Sub: 'Urine specific gravity 1.012 ',
        whyMeasurement: 'Without thermal air convection, sweat does not evaporate efficiently, causing core body temperatures to elevate by ~1°C (spaceflight hyperthermia).',
        mechanism: 'Lack of gravitational air convection impairs radiant and evaporative heat loss from the skin, raising resting setpoint core temperature during flight.',
        trendData: [
          { day: 'MET-6', baseline: 37.0, observed: 37.0 },
          { day: 'MET-5', baseline: 37.0, observed: 37.2 },
          { day: 'MET-4', baseline: 37.0, observed: 37.1 },
          { day: 'MET-3', baseline: 37.0, observed: 36.9 },
          { day: 'MET-2', baseline: 37.0, observed: 37.0 },
          { day: 'MET-1', baseline: 37.0, observed: 37.1 },
          { day: 'Today', baseline: 37.0, observed: 37.1 }
        ]
      }
    },
    environment: 'iss',
    activeHazard: 'all',
    demoDay: 14,
    demoPlaying: false,
    measurementVitals: {
      sysBP: 118,
      diaBP: 76,
      hr: 62,
      spo2: 99
    },
    countdownSeconds: 38 * 60 + 14
  };
  window.state = state;

  // ================= ACCESSIBLE TOAST NOTIFICATION (NO ALERT POPUPS) =================
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.setAttribute('role', 'status');
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('toast--show'), 10);
    setTimeout(() => {
      toast.classList.remove('toast--show');
      setTimeout(() => toast.remove(), 350);
    }, 4000);
  }

  // ================= ACCESSIBLE MODAL FOCUS MANAGEMENT =================
  let lastFocusedElement = null;

  function openModal(backdropEl, focusSelector = null) {
    if (!backdropEl) return;
    lastFocusedElement = document.activeElement;
    backdropEl.classList.add('open');
    backdropEl.setAttribute('aria-hidden', 'false');
    const target = focusSelector ? backdropEl.querySelector(focusSelector) : backdropEl.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (target && typeof target.focus === 'function') {
      setTimeout(() => target.focus(), 60);
    }
  }

  function closeModal(backdropEl) {
    if (!backdropEl) return;
    backdropEl.classList.remove('open');
    backdropEl.setAttribute('aria-hidden', 'true');
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  // ================= THEME SYSTEM (WARM IVORY <-> NIGHT CABIN) =================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeLabelText = document.getElementById('theme-label-text');
  const themeIconMoon = document.getElementById('theme-icon-moon');

  function applyTheme(theme, persist = false) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) {
      storage.setItem('astro_theme', theme);
    }

    if (theme === 'dark') {
      themeLabelText.textContent = 'Day Cabin';
      themeIconMoon.innerHTML = `
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      `;
    } else {
      themeLabelText.textContent = 'Night Cabin';
      themeIconMoon.innerHTML = `
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      `;
    }
  }

  // Initialize theme without forcing storage overwrite
  applyTheme(state.theme, false);

  themeToggleBtn.addEventListener('click', () => {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true);
  });

  // Listen to OS color scheme changes if not explicitly overridden by user in storage
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!storage.getItem('astro_theme')) {
      applyTheme(e.matches ? 'dark' : 'light', false);
    }
  });

  // ================= THREE-REFERENCE STATUS MODEL & RULER ENGINE (PHASE 4) =================
  function generateSynthesisSentence(indicator, currentVal, status) {
    const earthMin = indicator.earthNominal.min;
    const earthMax = indicator.earthNominal.max;
    const flightMin = indicator.expectedInFlight.min;
    const flightMax = indicator.expectedInFlight.max;
    const baseline = indicator.personalBaseline;
    const sd = indicator.personalSd || 1.0;
    const unit = indicator.unit;
    const label = indicator.label;

    const inEarth = currentVal >= earthMin && currentVal <= earthMax;
    const inFlight = currentVal >= flightMin && currentVal <= flightMax;
    const diffFromBaseline = currentVal - baseline;
    const pctDiff = baseline !== 0 ? ((diffFromBaseline / baseline) * 100).toFixed(1) : diffFromBaseline.toFixed(1);
    const diffSign = diffFromBaseline > 0 ? '+' : '';
    const diffText = `${diffSign}${diffFromBaseline.toFixed(1)} ${unit} (${diffSign}${pctDiff}%)`;

    // For attention status or when within in-flight range but drifting from personal baseline
    if (status === 'attention' || (inFlight && Math.abs(diffFromBaseline) >= 2.0 * sd)) {
      return `<strong>${label} is ${currentVal} ${unit}:</strong> Within the expected in-flight range, but trending up from your own baseline, so Watch.`;
    }

    let sentence = `<strong>${label} is ${currentVal} ${unit}:</strong> `;
    if (inEarth && inFlight) {
      sentence += `within standard Earth clinical range (${earthMin}–${earthMax} ${unit}) and expected in-flight adaptation range (${flightMin}–${flightMax} ${unit}). Aligns with personal baseline (${baseline} ${unit}, ${diffText}). Status: <strong>In range</strong>.`;
    } else if (inFlight) {
      sentence += `shifted relative to 1g Earth normal (${earthMin}–${earthMax} ${unit}), but within expected in-flight adaptation range (${flightMin}–${flightMax} ${unit}). Baseline variance is ${diffText} from personal baseline (${baseline} ${unit}). Status: <strong>Within expected range</strong>.`;
    } else {
      sentence += `exceeds expected in-flight envelope (${flightMin}–${flightMax} ${unit}) and Earth reference (${earthMin}–${earthMax} ${unit}). Observed variance of ${diffText} from personal baseline (${baseline} ${unit}). Status: <strong>${STATUS_CONFIG[status]?.label || 'Attention'}</strong>.`;
    }
    return sentence;
  }

  function renderThreeRuler(containerId, indicatorKey, currentVal, status) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const ind = (window.CLINICAL_INDICATORS && window.CLINICAL_INDICATORS[indicatorKey]) || (typeof CLINICAL_INDICATORS !== 'undefined' && CLINICAL_INDICATORS[indicatorKey]);
    if (!ind) {
      container.innerHTML = '';
      return;
    }

    const earthMin = ind.earthNominal.min;
    const earthMax = ind.earthNominal.max;
    const flightMin = ind.expectedInFlight.min;
    const flightMax = ind.expectedInFlight.max;
    const baseline = ind.personalBaseline;
    const sd = ind.personalSd || 1.0;
    const unit = ind.unit;

    // Common axis scale
    const allPoints = [earthMin, earthMax, flightMin, flightMax, baseline - sd, baseline + sd, currentVal];
    const dataMin = Math.min(...allPoints);
    const dataMax = Math.max(...allPoints);
    const pad = (dataMax - dataMin) * 0.15 || 2;
    const axisMin = dataMin - pad;
    const axisMax = dataMax + pad;
    const axisRange = axisMax - axisMin || 1;

    function toPct(val) {
      const p = ((val - axisMin) / axisRange) * 100;
      return Math.max(0, Math.min(100, p));
    }

    const earthLeft = toPct(earthMin);
    const earthWidth = Math.max(2, toPct(earthMax) - earthLeft);

    const flightLeft = toPct(flightMin);
    const flightWidth = Math.max(2, toPct(flightMax) - flightLeft);

    const baseBandLeft = toPct(baseline - sd);
    const baseBandWidth = Math.max(2, toPct(baseline + sd) - baseBandLeft);
    const basePipLeft = toPct(baseline);
    const curPipLeft = toPct(currentVal);

    const statusColor = status === 'emergency' ? 'var(--color-vermillion)'
      : status === 'flight-surgeon' ? 'var(--color-vermillion)'
      : status === 'attention' ? 'var(--color-ochre)'
      : 'var(--color-emerald)';

    const synthesisHtml = generateSynthesisSentence(ind, currentVal, status);

    container.innerHTML = `
      <div class="ruler-header">
        <span class="ruler-title">Three-Reference Adaptation Model</span>
        <span class="text-faint" style="font-size: 0.78rem;">Source: ${ind.sourceId}</span>
      </div>

      <!-- 1. Earth 1g Normal Range -->
      <div class="ruler-row">
        <span class="ruler-label">Earth 1g</span>
        <div class="ruler-track-container" title="Earth Normal: ${earthMin}–${earthMax} ${unit}">
          <div class="ruler-range-bar ruler-range-bar--earth" style="left: ${earthLeft.toFixed(1)}%; width: ${earthWidth.toFixed(1)}%;"></div>
          <span class="text-faint num-tabular" style="position: absolute; right: 8px; font-size: 0.72rem;">${earthMin}–${earthMax} ${unit}</span>
        </div>
      </div>

      <!-- 2. In-Flight Microgravity Expected Envelope -->
      <div class="ruler-row">
        <span class="ruler-label">In-Flight 0g</span>
        <div class="ruler-track-container" title="Expected In-Flight: ${flightMin}–${flightMax} ${unit}">
          <div class="ruler-range-bar ruler-range-bar--flight" style="left: ${flightLeft.toFixed(1)}%; width: ${flightWidth.toFixed(1)}%;"></div>
          <span class="text-faint num-tabular" style="position: absolute; right: 8px; font-size: 0.72rem;">${flightMin}–${flightMax} ${unit}</span>
        </div>
      </div>

      <!-- 3. Personal Baseline & Current Value -->
      <div class="ruler-row">
        <span class="ruler-label" title="Personal Baseline and Current Telemetry">Baseline / Current</span>
        <div class="ruler-track-container" title="Baseline: ${baseline} ${unit} (±${sd}). Current: ${currentVal} ${unit}">
          <!-- Baseline confidence band -->
          <div class="ruler-baseline-band" style="left: ${baseBandLeft.toFixed(1)}%; width: ${baseBandWidth.toFixed(1)}%;" title="Personal rolling band: ${(baseline - sd).toFixed(1)}–${(baseline + sd).toFixed(1)}"></div>
          <!-- Baseline marker line -->
          <div class="ruler-baseline-pip" style="left: ${basePipLeft.toFixed(1)}%;" title="Personal baseline: ${baseline} ${unit}"></div>
          <!-- Current reading marker -->
          <div class="ruler-val-dot" style="left: ${curPipLeft.toFixed(1)}%; background-color: ${statusColor};" title="Current Reading: ${currentVal} ${unit}"></div>
          <span class="text-faint num-tabular" style="position: absolute; right: 8px; font-size: 0.72rem;">Cur: ${currentVal} ${unit}</span>
        </div>
      </div>

      <!-- Synthesis Sentence -->
      <div class="ruler-synthesis-box status--${status}">
        ${synthesisHtml}
      </div>
    `;
  }

  // ================= EWMA & CUSUM LONGITUDINAL DRIFT DETECTION (PHASE 6) =================
  /**
   * Exponentially Weighted Moving Average (EWMA) and Cumulative Sum (CUSUM)
   * Detects persistent sub-clinical physiological shifts before acute threshold crossing.
   */
  function detectDrift(trendData, baseline, sd = 1.0) {
    if (!trendData || trendData.length < 3) {
      return { hasDrift: false, method: 'None', direction: 'none', delta: 0, description: 'Insufficient historical points' };
    }

    const obs = trendData.map(d => d.observed);
    const alpha = 0.3; // EWMA smoothing weight
    let ewma = obs[0];
    for (let i = 1; i < obs.length; i++) {
      ewma = alpha * obs[i] + (1 - alpha) * ewma;
    }

    const ewmaShift = ewma - baseline;
    const zScore = Math.abs(ewmaShift) / (sd || 1.0);

    // CUSUM parameters (k = 0.5 sigma slack allowance, h = 3.5 sigma decision threshold)
    const k = 0.5 * (sd || 1.0);
    const h = 3.5 * (sd || 1.0);
    let sPos = 0;
    let sNeg = 0;
    for (let i = 0; i < obs.length; i++) {
      sPos = Math.max(0, sPos + (obs[i] - baseline) - k);
      sNeg = Math.max(0, sNeg - (obs[i] - baseline) - k);
    }

    const cusumPositive = sPos > h;
    const cusumNegative = sNeg > h;
    const hasDrift = zScore >= 2.0 || cusumPositive || cusumNegative;
    const direction = (ewmaShift > 0 || cusumPositive) ? 'up' : (ewmaShift < 0 || cusumNegative) ? 'down' : 'none';

    return {
      hasDrift,
      direction,
      method: zScore >= 2.0 ? 'EWMA + CUSUM' : cusumPositive || cusumNegative ? 'CUSUM' : 'Nominal',
      delta: Math.round(ewmaShift * 10) / 10,
      zScore: Math.round(zScore * 10) / 10,
      description: hasDrift 
        ? `Statistical trajectory drift: ${direction}ward shift of ${Math.abs(Math.round(ewmaShift * 10) / 10)} (Z=${zScore.toFixed(1)}, p<0.05).`
        : 'Telemetry trajectory stable within 95% physiological variance band.'
    };
  }

  // ================= DYNAMIC SVG TREND CHART GENERATOR (REQUIREMENT 2 & PHASE 2) =================
  
  // ================= ELEVATED TREND CHART (ITEM 2: >=280px Tall, Shaded Band, Limit Line, Tooltip) =================
  function renderTrendChart(trendData, systemStatus, yUnit, baselineMin, baselineMax, indKey = null) {
    const wrapper = document.getElementById('dynamic-chart-wrapper');
    if (!wrapper) return;

    if (!trendData || trendData.length === 0) {
      wrapper.innerHTML = `<div class="text-muted" style="padding: 24px; text-align: center; font-size:13px;">No longitudinal telemetry available.</div>`;
      return;
    }

    const currentDay = state.demoDay || 14;
    const rangeLimit = state.chartRange || 7;

    // Use drifting demo trajectory for ocular
    let activeData = trendData;
    if (indKey === 'opticDisc' || (state.selectedSystem === 'ocular')) {
      if (rangeLimit === 30) {
        activeData = OCULAR_30D_TRAJECTORY;
      } else {
        const startDay = Math.max(1, currentDay - rangeLimit + 1);
        activeData = OCULAR_30D_TRAJECTORY.filter(d => d.day >= startDay && d.day <= currentDay);
        if (activeData.length < 3) {
          activeData = OCULAR_30D_TRAJECTORY.slice(0, rangeLimit);
        }
      }
    } else if (trendData.length > rangeLimit) {
      activeData = trendData.slice(-rangeLimit);
    }

    // Chart Dimensions: Height >= 280px per Item 2
    const svgWidth = 440;
    const svgHeight = 285;
    const padLeft = 60;
    const padRight = 24;
    const padTop = 38;
    const padBottom = 42;
    const plotWidth = svgWidth - padLeft - padRight;
    const plotHeight = svgHeight - padTop - padBottom;

    // Value scaling
    const allVals = [];
    activeData.forEach(d => {
      allVals.push(d.observed);
      if (typeof d.baseline === 'number') allVals.push(d.baseline);
    });
    allVals.push(280, 325, 302);
    if (typeof baselineMin === 'number') allVals.push(baselineMin);
    if (typeof baselineMax === 'number') allVals.push(baselineMax);

    let minVal = 260;
    let maxVal = 345;
    let ticks = [260, 280, 300, 320, 340];

    if (indKey !== 'opticDisc' && state.selectedSystem !== 'ocular') {
      const dMin = Math.min(...allVals);
      const dMax = Math.max(...allVals);
      const span = dMax - dMin || 10;
      minVal = Math.floor(dMin - span * 0.15);
      maxVal = Math.ceil(dMax + span * 0.2);
      ticks = [minVal, minVal + (maxVal - minVal) * 0.33, minVal + (maxVal - minVal) * 0.66, maxVal].map(Math.round);
    }
    const valRange = maxVal - minVal || 1;

    function scaleX(index) {
      return padLeft + index * (plotWidth / Math.max(1, activeData.length - 1));
    }
    function scaleY(val) {
      const norm = (val - minVal) / valRange;
      return padTop + plotHeight * (1 - norm);
    }

    // 1. Shaded in-flight nominal band (280-325 µm)
    const bandYTop = Math.max(padTop, scaleY(325));
    const bandYBottom = Math.min(padTop + plotHeight, scaleY(280));
    const bandH = Math.max(2, bandYBottom - bandYTop);

    const flightBandSvg = `
      <rect class="chart-nominal-band" x="${padLeft}" y="${bandYTop}" width="${plotWidth}" height="${bandH}" fill="var(--color-emerald-tint-soft)" opacity="0.65" />
      <text x="${padLeft + 10}" y="${bandYTop + 16}" fill="var(--color-emerald)" font-size="13" font-weight="600">Nominal In-Flight Band (280–325 µm)</text>
    `;

    // 2. 325 µm Upper Limit Dashed Line
    const limitLineSvg = `
      <line x1="${padLeft}" y1="${bandYTop}" x2="${padLeft + plotWidth}" y2="${bandYTop}" stroke="var(--color-ochre)" stroke-dasharray="6 3" stroke-width="2" />
      <text x="${padLeft + plotWidth - 6}" y="${bandYTop - 7}" fill="var(--color-ochre-text)" font-size="13" font-weight="700" text-anchor="end">In-Flight Limit: 325 µm</text>
    `;

    // 3. Personal Baseline Thin Reference Line (302 µm)
    const baseY = scaleY(302);
    const baselineLineSvg = `
      <line x1="${padLeft}" y1="${baseY}" x2="${padLeft + plotWidth}" y2="${baseY}" stroke="var(--color-emerald)" stroke-dasharray="3 3" stroke-width="1.4" opacity="0.85" />
      <text x="${padLeft + plotWidth - 6}" y="${baseY - 6}" fill="var(--color-emerald)" font-size="13" font-weight="600" text-anchor="end">Personal Baseline: 302 µm</text>
    `;

    // 4. Grid Lines & 13px+ Y-Axis Labels
    let gridSvg = '';
    ticks.forEach(tVal => {
      const gy = scaleY(tVal);
      gridSvg += `
        <line x1="${padLeft}" y1="${gy}" x2="${padLeft + plotWidth}" y2="${gy}" stroke="var(--color-border)" stroke-width="1" />
        <text class="chart-axis-label num-tabular" x="${padLeft - 10}" y="${gy + 4}" fill="var(--color-ink-muted)" font-size="13" font-weight="600" text-anchor="end">${tVal}</text>
      `;
    });

    // 5. Observed Trajectory Line & Markers
    const pts = activeData.map((d, i) => `${scaleX(i)},${scaleY(d.observed)}`);
    const pathD = `M ${pts.join(' L ')}`;

    let markersSvg = '';
    let hitColsSvg = '';

    activeData.forEach((d, i) => {
      const cx = scaleX(i);
      const cy = scaleY(d.observed);
      const isBreached = d.observed > 325;
      const isWatch = d.observed >= 320 && d.observed <= 325;
      const ptColor = isBreached ? 'var(--color-vermillion)' : isWatch ? 'var(--color-ochre)' : 'var(--color-emerald)';
      const statusShape = isBreached ? '◆' : isWatch ? '▲' : '●';
      const statusText = isBreached ? 'Flight Surgeon Consult' : isWatch ? 'Watch' : 'Nominal';

      markersSvg += `
        <circle class="chart-point-marker" id="chart-pt-${i}" cx="${cx}" cy="${cy}" r="4.5" fill="${ptColor}" stroke="var(--color-surface)" stroke-width="2" />
      `;

      // Invisible Hit Column for Tooltip Interaction
      const colW = plotWidth / Math.max(1, activeData.length);
      hitColsSvg += `
        <rect class="chart-col-hit" x="${cx - colW/2}" y="${padTop}" width="${colW}" height="${plotHeight}"
              data-day="${d.day}" data-val="${d.observed}" data-cx="${cx}" data-cy="${cy}"
              data-diff="${d.observed - 302}" data-status="${statusText}" data-shape="${statusShape}" />
      `;
    });

    // 6. X-Axis 13px+ Labels
    let xLabelsSvg = '';
    const stepX = Math.ceil(activeData.length / 7);
    activeData.forEach((d, i) => {
      if (i % stepX === 0 || i === activeData.length - 1) {
        const cx = scaleX(i);
        xLabelsSvg += `
          <text class="chart-axis-label num-tabular" x="${cx}" y="${padTop + plotHeight + 20}" fill="var(--color-ink-muted)" font-size="13" font-weight="600" text-anchor="middle">D${d.day}</text>
        `;
      }
    });

    // 7. Axis Titles (13px+ font size per Item 5)
    const titlesSvg = `
      <text class="chart-axis-title" transform="rotate(-90)" x="${-(padTop + plotHeight/2)}" y="18" fill="var(--color-ink)" font-size="13" font-weight="700" text-anchor="middle">Retinal Thickness (${yUnit})</text>
      <text class="chart-axis-title" x="${padLeft + plotWidth/2}" y="${svgHeight - 6}" fill="var(--color-ink)" font-size="13" font-weight="700" text-anchor="middle">Mission Elapsed Day</text>
    `;

    // Assemble SVG
    const svgContent = `
      <svg class="chart-svg-main" viewBox="0 0 ${svgWidth} ${svgHeight}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="SANS Peripapillary Retinal Thickness Longitudinal Trajectory">
        ${flightBandSvg}
        ${limitLineSvg}
        ${baselineLineSvg}
        ${gridSvg}
        <path d="${pathD}" fill="none" stroke="var(--color-sys-ocular)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
        ${markersSvg}
        <!-- Crosshair guideline -->
        <line id="chart-crosshair" x1="0" y1="${padTop}" x2="0" y2="${padTop + plotHeight}" stroke="var(--color-ink-muted)" stroke-dasharray="3 3" stroke-width="1.2" style="display:none;" />
        <!-- Interactive Hit Area -->
        <g class="chart-interactive-overlay">${hitColsSvg}</g>
        ${xLabelsSvg}
        ${titlesSvg}
      </svg>
    `;

    wrapper.innerHTML = svgContent;

    // Attach Hover/Tap Tooltip Event Handlers
    const tooltip = document.getElementById('chart-live-tooltip');
    const crosshair = document.getElementById('chart-crosshair');
    const hitCols = wrapper.querySelectorAll('.chart-col-hit');

    hitCols.forEach(col => {
      const showTip = (e) => {
        const day = col.dataset.day;
        const val = col.dataset.val;
        const diff = parseInt(col.dataset.diff, 10);
        const status = col.dataset.status;
        const shape = col.dataset.shape;
        const cx = parseFloat(col.dataset.cx);
        const cy = parseFloat(col.dataset.cy);

        if (crosshair) {
          crosshair.setAttribute('x1', cx);
          crosshair.setAttribute('x2', cx);
          crosshair.style.display = 'block';
        }

        if (tooltip) {
          tooltip.innerHTML = `
            <div style="font-weight:700; color:var(--color-ink); margin-bottom:2px;">Mission Day ${day}</div>
            <div style="font-size:13px; color:var(--color-ink);">Thickness: <strong class="num-tabular">${val} µm</strong></div>
            <div style="font-size:13px; color:var(--color-ink-muted); margin-bottom:2px;">Baseline delta: <strong class="num-tabular">${diff >= 0 ? '+' : ''}${diff} µm</strong></div>
            <div style="font-size:13px; font-weight:600; color:${val > 325 ? 'var(--color-vermillion)' : val >= 320 ? 'var(--color-ochre)' : 'var(--color-emerald)'};">
              ${shape} ${status}
            </div>
          `;
          tooltip.style.display = 'block';
          // Convert SVG cx, cy to pixel percentages
          const pctX = (cx / svgWidth) * 100;
          const pctY = (cy / svgHeight) * 100;
          tooltip.style.left = `${pctX}%`;
          tooltip.style.top = `${pctY - 12}%`;
        }
      };

      col.addEventListener('pointerenter', showTip);
      col.addEventListener('pointerdown', showTip);
    });

    wrapper.addEventListener('pointerleave', () => {
      if (tooltip) tooltip.style.display = 'none';
      if (crosshair) crosshair.style.display = 'none';
    });
  }


  // ================= SYSTEM SELECTION & BODY MAP INTERACTION (REQUIREMENT 2) =================
  const inspectTitle = document.getElementById('inspect-title');
  const inspectSub = document.getElementById('inspect-sub');
  const inspectBadge = document.getElementById('inspect-badge');
  const inspectMetric1 = document.getElementById('inspect-metric-1');
  const inspectMetric2 = document.getElementById('inspect-metric-2');
  const inspectMetric1Label = document.getElementById('inspect-metric1-label');
  const inspectMetric1Sub = document.getElementById('inspect-metric1-sub');
  const inspectMetric2Label = document.getElementById('inspect-metric2-label');
  const inspectMetric2Sub = document.getElementById('inspect-metric2-sub');
  const chartBaselineInfo = document.getElementById('chart-baseline-info');

  const legendChips = document.querySelectorAll('.legend-chip');
  const bodyRegions = document.querySelectorAll('.body-system-region');

  function selectSystem(systemId) {
    if (!state.systems[systemId]) return;
    state.selectedSystem = systemId;
    const sys = state.systems[systemId];

    // 1. Update Card Labels & Sub-lines (Data-driven!)
    inspectTitle.textContent = sys.name;
    inspectSub.textContent = sys.subtitle;
    inspectMetric1.textContent = sys.metric1Val;
    inspectMetric2.textContent = sys.metric2Val;
    if (inspectMetric1Label) inspectMetric1Label.textContent = sys.metric1Label;
    if (inspectMetric1Sub) {
      inspectMetric1Sub.textContent = sys.metric1Sub;
      inspectMetric1Sub.style.color = (sys.status === 'attention') ? 'var(--color-ochre-text)' :
                                      (sys.status === 'flight-surgeon' || sys.status === 'emergency') ? 'var(--color-vermillion-text)' :
                                      'var(--color-ink-muted)';
    }
    if (inspectMetric2Label) inspectMetric2Label.textContent = sys.metric2Label;
    if (inspectMetric2Sub) {
      inspectMetric2Sub.textContent = sys.metric2Sub;
      inspectMetric2Sub.style.color = 'var(--color-ink-muted)';
    }

    // Longitudinal drift detection (EWMA/CUSUM - Phase 6)
    const indObj = (window.CLINICAL_INDICATORS && window.CLINICAL_INDICATORS[sys.primaryIndicator]) || (typeof CLINICAL_INDICATORS !== 'undefined' && CLINICAL_INDICATORS[sys.primaryIndicator]);
    const baseline = indObj ? indObj.personalBaseline : sys.baselineMin;
    const sd = indObj ? indObj.personalSd : 1.0;
    const drift = detectDrift(sys.trendData, baseline, sd);
    if (chartBaselineInfo) {
      if (drift.hasDrift) {
        chartBaselineInfo.innerHTML = `Nominal: ${sys.baselineMin}–${sys.baselineMax} ${sys.yUnit} <strong style="color:var(--color-ochre-text); margin-left:6px;" title="${drift.description}">[Drift: ${drift.direction} ${drift.delta}]</strong>`;
      } else {
        chartBaselineInfo.textContent = `Nominal band: ${sys.baselineMin}–${sys.baselineMax} ${sys.yUnit} `;
      }
    }

    // 2. Update Inspection Badge in-place via setBadge
    setBadge(inspectBadge, sys.status);

    // 3. Update Flag in Body Map Card Header
    setBadge('#current-overall-flag', sys.status, `${sys.name.split(' ')[0]}: ${STATUS_CONFIG[sys.status].label}`);

    // 4. Update Flag and Live Data in Overview Selected System Telemetry Card
    setBadge('#overview-selected-status-badge', sys.status, STATUS_CONFIG[sys.status].label);
    const selTitle = document.getElementById('overview-selected-system-title');
    if (selTitle) selTitle.textContent = sys.name;
    const selM1Lab = document.getElementById('overview-selected-m1-label');
    if (selM1Lab) selM1Lab.textContent = sys.metric1Label;
    const selM1Val = document.getElementById('overview-selected-m1-val');
    if (selM1Val) selM1Val.textContent = sys.metric1Val;
    const selM1Sub = document.getElementById('overview-selected-m1-sub');
    if (selM1Sub) {
      selM1Sub.textContent = sys.metric1Sub;
      selM1Sub.style.color = (sys.status === 'attention') ? 'var(--color-ochre-text)' :
                             (sys.status === 'flight-surgeon' || sys.status === 'emergency') ? 'var(--color-vermillion-text)' :
                             'var(--color-ink-muted)';
    }
    const selM2Lab = document.getElementById('overview-selected-m2-label');
    if (selM2Lab) selM2Lab.textContent = sys.metric2Label;
    const selM2Val = document.getElementById('overview-selected-m2-val');
    if (selM2Val) selM2Val.textContent = sys.metric2Val;
    const selM2Sub = document.getElementById('overview-selected-m2-sub');
    if (selM2Sub) {
      selM2Sub.textContent = sys.metric2Sub;
      selM2Sub.style.color = 'var(--color-ink-muted)';
    }
    const selWhy = document.getElementById('overview-selected-why');
    if (selWhy && sys.whyMeasurement) selWhy.textContent = sys.whyMeasurement;

    // System Accent Map for decorative identity and top borders
    const SYSTEM_ACCENT_MAP = {
      cardio: 'var(--color-sys-cardio)',
      ocular: 'var(--color-sys-ocular)',
      cranial: 'var(--color-sys-cranial)',
      spine: 'var(--color-sys-spine)',
      pulmonary: 'var(--color-sys-pulmonary)',
      neuro: 'var(--color-sys-neuro)',
      sleep: 'var(--color-sys-sleep)',
      immune: 'var(--color-sys-immune)',
      metabolic: 'var(--color-sys-metabolic)',
      limbs: 'var(--color-sys-limbs)'
    };

    // Apply 3.5px colored accent border to focus system card
    const focusCard = document.getElementById('card-status-index');
    if (focusCard) {
      focusCard.style.borderTop = `3.5px solid ${SYSTEM_ACCENT_MAP[systemId] || 'var(--color-sys-ocular)'}`;
    }

    // 4. Update Active Legend Chip with system accent
    legendChips.forEach(chip => {
      const isTarget = chip.dataset.target === systemId;
      chip.classList.toggle('active', isTarget);
      if (isTarget) {
        chip.style.borderColor = SYSTEM_ACCENT_MAP[systemId] || 'var(--color-emerald)';
        chip.style.backgroundColor = `var(--color-sys-${systemId}-tint, var(--color-emerald-tint))`;
        chip.style.color = SYSTEM_ACCENT_MAP[systemId] || 'var(--color-emerald)';
      } else {
        chip.style.borderColor = '';
        chip.style.backgroundColor = '';
        chip.style.color = '';
      }
    });

    // Highlight selected organ on SVG Body Map
    bodyRegions.forEach(reg => {
      reg.classList.toggle('selected-system', reg.dataset.system === systemId);
    });

    // 5. Update Dynamic SVG Chart
    renderTrendChart(sys.trendData, sys.status, sys.yUnit, sys.baselineMin, sys.baselineMax, sys.primaryIndicator);

    // 6. Update Drawer Elements
    document.getElementById('drawer-system-title').textContent = sys.name;
    document.getElementById('drawer-mechanism-desc').textContent = sys.mechanism;
    document.getElementById('drawer-metric-val').textContent = sys.metric1Val;
    document.getElementById('drawer-metric1-label').textContent = sys.metric1Label;
    document.getElementById('drawer-metric1-sub').textContent = sys.metric1Sub;
    document.getElementById('drawer-metric2-val').textContent = sys.metric2Val;
    document.getElementById('drawer-metric2-label').textContent = sys.metric2Label;
    document.getElementById('drawer-metric2-sub').textContent = sys.metric2Sub;
    setBadge('#drawer-status-badge', sys.status);

    // 7. Update Why This Measurement Rationale
    const inspectWhy = document.getElementById('inspect-why-measurement');
    if (inspectWhy && sys.whyMeasurement) inspectWhy.textContent = sys.whyMeasurement;
    const drawerWhy = document.getElementById('drawer-why-measurement');
    if (drawerWhy && sys.whyMeasurement) drawerWhy.textContent = sys.whyMeasurement;

    // 8. Update Three-Reference Status Model & Rulers (Phase 4)
    const indKey = sys.primaryIndicator || (systemId === 'ocular' ? 'opticDisc' : systemId === 'cardio' ? 'systolic' : systemId === 'cranial' ? 'vorGain' : systemId === 'spine' ? 'spineElongation' : systemId === 'pulmonary' ? 'pco2' : 'calfCircumference');
    const currentValNum = (sys.trendData && sys.trendData[sys.trendData.length - 1].observed) || parseFloat(sys.metric1Val) || 100;
    renderThreeRuler('inspect-three-ruler', indKey, currentValNum, sys.status);
    renderThreeRuler('drawer-three-ruler', indKey, currentValNum, sys.status);

    // 9. Update Tiered Guidance Preview for this status
    updateActiveGuidancePreview(sys.status);

    // 10. Update Body Map active hover tag
    updateHoverLabel(systemId);
  }
  window.selectSystem = selectSystem;
  window.setBadge = setBadge;
  window.detectDrift = detectDrift;
  window.calculateReadinessWithUncertainty = calculateReadinessWithUncertainty;

  const bodyMapActiveLabel = document.getElementById('body-map-active-label');
  function updateHoverLabel(sysId) {
    if (!bodyMapActiveLabel) return;
    const sys = state.systems[sysId];
    if (sys) {
      bodyMapActiveLabel.textContent = `${sys.name} (${STATUS_CONFIG[sys.status].label})`;
      bodyMapActiveLabel.style.borderColor = sys.status === 'attention' ? 'var(--color-ochre)' : sys.status === 'in-range' ? 'var(--color-emerald)' : 'var(--color-vermillion)';
    }
  }

  // SVG Region Click, Hover, Focus & Synchronization with Chips (Item 1)
  bodyRegions.forEach(region => {
    const sysId = region.dataset.system;
    const matchingChip = document.querySelector(`.legend-chip[data-target="${sysId}"]`);

    const onEnter = () => {
      region.classList.add('synced-hover');
      if (matchingChip) matchingChip.classList.add('synced-hover');
      updateHoverLabel(sysId);
    };
    const onLeave = () => {
      region.classList.remove('synced-hover');
      if (matchingChip) matchingChip.classList.remove('synced-hover');
      updateHoverLabel(state.selectedSystem);
    };

    region.addEventListener('click', () => {
      selectSystem(sysId);
      updateHoverLabel(sysId);
    });
    region.addEventListener('mouseenter', onEnter);
    region.addEventListener('focus', onEnter);
    region.addEventListener('mouseleave', onLeave);
    region.addEventListener('blur', onLeave);
    region.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectSystem(sysId);
      }
    });
  });

  // Legend Chips Click & Synchronized Hover with SVG Body Map (Item 1)
  legendChips.forEach(chip => {
    const sysId = chip.dataset.target;
    const matchingRegion = document.getElementById(`sys-${sysId}`);

    const onEnter = () => {
      chip.classList.add('synced-hover');
      if (matchingRegion) matchingRegion.classList.add('synced-hover');
      updateHoverLabel(sysId);
    };
    const onLeave = () => {
      chip.classList.remove('synced-hover');
      if (matchingRegion) matchingRegion.classList.remove('synced-hover');
      updateHoverLabel(state.selectedSystem);
    };

    chip.addEventListener('click', () => {
      selectSystem(sysId);
    });
    chip.addEventListener('mouseenter', onEnter);
    chip.addEventListener('focus', onEnter);
    chip.addEventListener('mouseleave', onLeave);
    chip.addEventListener('blur', onLeave);
  });

  // ================= READINESS SCORE ENGINE & RING GAUGE (REQUIREMENT 3 & 7) =================
  const readinessScoreText = document.getElementById('readiness-score-text');
  const ringProgressIndicator = document.getElementById('ring-progress-indicator');
  const crewReadinessBadge = document.getElementById('crew-readiness-badge');
  const overallStatusSummary = document.getElementById('overall-status-summary');

  function calculateOverallReadiness() {
    const weights = {
      'in-range': 100,
      'attention': 70,
      'flight-surgeon': 35,
      'emergency': 10
    };
    const systems = Object.values(state.systems);
    const anyEmergency = systems.some(s => s.status === 'emergency');
    const anySurgeon = systems.some(s => s.status === 'flight-surgeon');
    const total = systems.reduce((acc, sys) => acc + (weights[sys.status] || 100), 0);
    let score = Math.round(total / systems.length);

    // Clinical safety limits: flight surgeon flag caps readiness to 74% (Operational alert threshold)
    if (anyEmergency) {
      score = Math.min(score, 35);
    } else if (anySurgeon) {
      score = Math.min(score, 74);
    }
    return score;
  }

  function calculateReadinessWithUncertainty() {
    const score = calculateOverallReadiness();
    const se = 2.4;
    const margin = Math.round(1.96 * se);
    const ciMin = Math.max(0, score - margin);
    const ciMax = Math.min(100, score + margin);
    return {
      score,
      ciMin,
      ciMax,
      margin,
      ciLabel: `95% CI: ${ciMin}%–${ciMax}%`
    };
  }

  function updateOverallGauge() {
    const uncert = calculateReadinessWithUncertainty();
    state.overallReadiness = uncert.score;
    readinessScoreText.textContent = `${state.overallReadiness}%`;
    const ciText = document.getElementById('readiness-ci-text');
    if (ciText) ciText.textContent = uncert.ciLabel;

    // Mathematical stroke-dashoffset calculation with RING_CIRCUMFERENCE = 477.52
    const offset = RING_CIRCUMFERENCE * (1 - state.overallReadiness / 100);
    ringProgressIndicator.style.strokeDashoffset = offset;

    // Ring colour agrees strictly with readiness score (high score = emerald ring)
    if (state.overallReadiness >= 80) {
      ringProgressIndicator.style.stroke = 'var(--color-emerald)';
    } else if (state.overallReadiness >= 60) {
      ringProgressIndicator.style.stroke = 'var(--color-ochre)';
    } else {
      ringProgressIndicator.style.stroke = 'var(--color-vermillion)';
    }

    // Evaluate overall clinical triage status category across all systems
    const anyEmergency = Object.values(state.systems).some(s => s.status === 'emergency');
    const anySurgeon = Object.values(state.systems).some(s => s.status === 'flight-surgeon');
    const anyAttention = Object.values(state.systems).some(s => s.status === 'attention');

    let overallStatus = 'in-range';
    let statusLabel = 'Within expected range';

    if (anyEmergency) {
      overallStatus = 'emergency';
      statusLabel = 'Emergency Protocol';
      overallStatusSummary.textContent = 'Critical anomaly flagged. Immediate intra-cabin consultation and crew emergency procedures active.';
    } else if (anySurgeon) {
      overallStatus = 'flight-surgeon';
      statusLabel = 'Surgeon Consult Flagged';
      overallStatusSummary.textContent = 'Clinical threshold exceeded. Priority telemedicine consult scheduled on next simulated ground pass.';
    } else if (anyAttention) {
      overallStatus = 'attention';
      statusLabel = 'Watch Protocol';
      overallStatusSummary.textContent = 'Vitals stable across 5/6 core systems. Ocular SANS shows mild bilateral disc hyper-reflectivity under routine tracking.';
    } else {
      overallStatus = 'in-range';
      statusLabel = 'Within expected range';
      overallStatusSummary.textContent = 'All physiological telemetry within expected microgravity adaptation limits. Countermeasure schedule on track.';
    }

    // Update crew readiness badge and status summaries
    setBadge(crewReadinessBadge, overallStatus, statusLabel);
    const activeFlagEl = document.getElementById('summary-active-flag');
    if (activeFlagEl) {
      activeFlagEl.textContent = overallStatus === 'in-range' ? 'Station: All systems in range' : statusLabel;
      activeFlagEl.style.color = overallStatus === 'attention' ? 'var(--color-ochre-text)' : overallStatus === 'in-range' ? 'var(--color-emerald)' : 'var(--color-vermillion-text)';
    }
    document.getElementById('summary-readiness').textContent = `${state.overallReadiness}%`;

    // Keep SVG body map visual classes & aria-labels synchronized (Requirement 9)
    updateBodyMapVisuals();

    // Keep top summary KPI strip synchronized
    updateKpis();
  }

  function updateKpis() {
    const readinessVal = document.getElementById('kpi-readiness-val');
    const readinessSub = document.getElementById('kpi-readiness-sub');
    const systemsVal = document.getElementById('kpi-systems-val');
    const systemsSub = document.getElementById('kpi-systems-sub');
    const streakVal = document.getElementById('kpi-streak-val');
    const countdownVal = document.getElementById('kpi-countdown-val');

    if (readinessVal) readinessVal.textContent = `${state.overallReadiness}%`;
    if (readinessSub) {
      const uncert = calculateReadinessWithUncertainty();
      readinessSub.textContent = uncert.ciLabel;
    }

    const allSys = Object.values(state.systems || {});
    const inRangeCount = allSys.filter(s => s.status === 'in-range').length;
    if (systemsVal) systemsVal.textContent = `${inRangeCount} / ${allSys.length}`;
    if (systemsSub) {
      systemsSub.textContent = inRangeCount === allSys.length ? 'All systems nominal' : `${allSys.length - inRangeCount} flagged for review`;
    }

    const streakDays = state.demoDay || 14;
    if (streakVal) streakVal.textContent = `${streakDays} Days`;
    if (countdownVal) {
      const mins = Math.floor(state.countdownSeconds / 60);
      const secs = state.countdownSeconds % 60;
      countdownVal.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
  }
  window.updateKpis = updateKpis;

  const STATUS_SHAPES = {
    'in-range': { shape: '●', label: 'Nominal', color: 'var(--color-emerald)', path: 'M 0 -4 A 4 4 0 1 1 0 4 A 4 4 0 1 1 0 -4 Z' },
    'attention': { shape: '▲', label: 'Watch', color: 'var(--color-ochre)', path: 'M 0 -5 L 4.5 4 L -4.5 4 Z' },
    'flight-surgeon': { shape: '◆', label: 'Surgeon Consult', color: 'var(--color-vermillion)', path: 'M 0 -5.5 L 5.5 0 L 0 5.5 L -5.5 0 Z' },
    'emergency': { shape: '⬡', label: 'Emergency', color: 'var(--color-vermillion)', path: 'M -2.5 -5 L 2.5 -5 L 5 -2.5 L 5 2.5 L 2.5 5 L -2.5 5 L -5 2.5 L -5 -2.5 Z' }
  };

  function updateBodyMapVisuals() {
    Object.values(state.systems).forEach(sys => {
      const cfg = STATUS_SHAPES[sys.status] || STATUS_SHAPES['in-range'];
      const el = document.getElementById(`sys-${sys.id}`);
      if (el) {
        el.className.baseVal = `body-system-region system--${sys.status}${state.selectedSystem === sys.id ? ' selected-system' : ''}`;
        el.setAttribute('aria-label', `${sys.name}. Status: ${STATUS_CONFIG[sys.status].label}. Glyph: ${cfg.shape}.`);
        
        // Update SVG status shape glyph path and color
        const shapeGlyph = el.querySelector('.sys-shape-glyph');
        if (shapeGlyph) {
          if (cfg.path) shapeGlyph.setAttribute('d', cfg.path);
          shapeGlyph.setAttribute('fill', cfg.color);
        }

        // Focus ring color
        const focusRing = el.querySelector('.system-focus-ring');
        if (focusRing) {
          const ringColor = (sys.status === 'emergency' || sys.status === 'flight-surgeon') ? 'var(--color-vermillion)' :
                            (sys.status === 'attention') ? 'var(--color-ochre)' : 'var(--color-emerald)';
          focusRing.setAttribute('stroke', ringColor);
        }
      }

      // Update matching legend chip shape glyph and color
      const chip = document.querySelector(`.legend-chip[data-target="${sys.id}"]`);
      if (chip) {
        if (state.selectedSystem === sys.id) {
          chip.classList.add('active');
        } else {
          chip.classList.remove('active');
        }
        const shapeSpan = chip.querySelector('.chip-shape-indicator');
        if (shapeSpan) {
          shapeSpan.textContent = cfg.shape;
          shapeSpan.style.color = (sys.status === 'attention') ? 'var(--color-ochre-text)' : cfg.color;
        }
      }
    });

    const activeLabel = document.getElementById('body-map-active-label');
    if (activeLabel && state.selectedSystem && state.systems[state.selectedSystem]) {
      const curSys = state.systems[state.selectedSystem];
      const curCfg = STATUS_SHAPES[curSys.status] || STATUS_SHAPES['in-range'];
      activeLabel.textContent = `${curSys.name} (${curCfg.label})`;
    }
  }

  // Readiness Calculation Info Popover Handler
  const readinessPopoverTrigger = document.getElementById('readiness-popover-trigger');
  const readinessPopover = document.getElementById('readiness-popover');
  const closeReadinessPopover = document.getElementById('close-readiness-popover');
  if (readinessPopoverTrigger && readinessPopover) {
    readinessPopoverTrigger.addEventListener('click', () => {
      const isVisible = readinessPopover.style.display === 'block';
      readinessPopover.style.display = isVisible ? 'none' : 'block';
      readinessPopoverTrigger.setAttribute('aria-expanded', isVisible ? 'false' : 'true');
    });
    if (closeReadinessPopover) {
      closeReadinessPopover.addEventListener('click', () => {
        readinessPopover.style.display = 'none';
        readinessPopoverTrigger.setAttribute('aria-expanded', 'false');
        readinessPopoverTrigger.focus();
      });
    }
  }

  // ================= STATUS DRILL (CYCLE STATUS SCALE) =================
  const triggerEmergencyDrillBtn = document.getElementById('trigger-emergency-drill-btn');
  const statusCycle = ['in-range', 'attention', 'flight-surgeon', 'emergency'];
  let currentStatusIndex = 1; // starts at 'attention'

  triggerEmergencyDrillBtn.addEventListener('click', () => {
    currentStatusIndex = (currentStatusIndex + 1) % statusCycle.length;
    const newStatus = statusCycle[currentStatusIndex];
    state.systems.ocular.status = newStatus;

    // Update body SVG region class
    const ocularSvg = document.getElementById('sys-ocular');
    ocularSvg.className.baseVal = `body-system-region system--${newStatus}`;

    // Update pulse ring color if present
    const pulseRing = ocularSvg.querySelector('.pulse-ring-marker');
    if (pulseRing) {
      if (newStatus === 'emergency' || newStatus === 'flight-surgeon') {
        pulseRing.setAttribute('stroke', 'var(--color-vermillion)');
      } else if (newStatus === 'attention') {
        pulseRing.setAttribute('stroke', 'var(--color-ochre)');
      } else {
        pulseRing.setAttribute('stroke', 'var(--color-emerald)');
      }
    }

    updateOverallGauge();
    selectSystem(state.selectedSystem);
    showToast(`Status Drill: Ocular system evaluated as "${STATUS_CONFIG[newStatus].label}"`, newStatus === 'emergency' ? 'alert' : newStatus === 'attention' ? 'warning' : 'success');
  });

  // ================= CLINICAL STATUS ENGINE (REQUIREMENT 3) =================
  function validateVitals(sysBP, diaBP, hr, spo2) {
    const valFn = (typeof validateVitalInputs === 'function') ? validateVitalInputs : (window.validateVitalInputs || null);
    if (valFn) {
      const res = valFn({ sysBP, diaBP, hr, spo2 });
      return res.valid ? null : res.error;
    }
    if (isNaN(sysBP) || sysBP < 50 || sysBP > 260) {
      return 'Systolic BP must be between 50 and 260 mmHg.';
    }
    if (isNaN(diaBP) || diaBP < 30 || diaBP > 160) {
      return 'Diastolic BP must be between 30 and 160 mmHg.';
    }
    if (sysBP <= diaBP) {
      return 'Systolic BP must be strictly greater than Diastolic BP.';
    }
    if (isNaN(hr) || hr < 30 || hr > 240) {
      return 'Heart Rate must be between 30 and 240 bpm.';
    }
    if (isNaN(spo2) || spo2 < 50 || spo2 > 100) {
      return 'SpO2 must be between 50% and 100%.';
    }
    return null; // Valid
  }

  function classifyVitals(sysBP, diaBP, hr, spo2) {
    const classFn = (typeof classifyIndicator === 'function') ? classifyIndicator : (window.classifyIndicator || null);
    if (classFn) {
      const cSys = classFn('systolic', sysBP);
      const cDia = classFn('diastolic', diaBP);
      const cHr = classFn('heartRate', hr);
      const cSpo2 = classFn('spo2', spo2);

      const all = [cSys, cDia, cHr, cSpo2];
      const emerg = all.find(c => c.status === 'emergency');
      if (emerg) return emerg;
      const surgeon = all.find(c => c.status === 'flight-surgeon');
      if (surgeon) return surgeon;
      const att = all.find(c => c.status === 'attention');
      if (att) return att;
      return {
        status: 'in-range',
        label: 'In range',
        reason: 'Parameters within expected in-flight adaptation envelope.'
      };
    }

    // 1. Emergency Criteria
    if (sysBP >= 170 || sysBP <= 85 || diaBP >= 110 || diaBP <= 45 || spo2 < 90 || hr >= 135 || hr <= 40) {
      return {
        status: 'emergency',
        label: 'Emergency',
        reason: 'Critical hemodynamic or oxygenation anomaly outside acute flight tolerance envelope.'
      };
    }
    // 2. Flight Surgeon Consultation Criteria
    if (sysBP >= 140 || sysBP < 95 || diaBP >= 90 || diaBP < 60 || spo2 <= 93 || hr >= 95 || hr <= 48) {
      return {
        status: 'flight-surgeon',
        label: 'Contact flight surgeon',
        reason: 'Significant cardiovascular deviation from in-flight adaptation norms.'
      };
    }
    // 3. Attention / Watch Criteria
    if (sysBP >= 125 || sysBP < 100 || diaBP >= 82 || diaBP < 65 || spo2 <= 95 || hr >= 74 || hr <= 54) {
      return {
        status: 'attention',
        label: 'Watch',
        reason: 'Mild physiological deviation from expected in-flight envelope.'
      };
    }
    // 4. In Range
    return {
      status: 'in-range',
      label: 'In range',
      reason: 'Parameters within expected in-flight adaptation envelope.'
    };
  }

  // ================= LOCAL STORAGE PERSISTENCE (REQUIREMENT 3) =================
  function getPersistedLogs() {
    const data = storage.getItem('astro_clinical_log');
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {}
    }
    const day = (state && (state.demoDay || state.missionDay)) || 14;
    // Initial simulated seed data if empty
    return [
      {
        timestamp: `Day ${day}, 06:40 UTC`,
        sysBP: 116,
        diaBP: 74,
        hr: 58,
        spo2: 99,
        status: 'in-range',
        note: 'Post-sleep baseline resting vitals nominal.'
      },
      {
        timestamp: `Day ${Math.max(1, day - 1)}, 18:20 UTC`,
        sysBP: 122,
        diaBP: 78,
        hr: 66,
        spo2: 99,
        status: 'in-range',
        note: 'Post-workout cooldown vitals stabilized.'
      }
    ];
  }

  function savePersistedLog(entry) {
    const logs = getPersistedLogs();
    logs.unshift(entry);
    storage.setItem('astro_clinical_log', JSON.stringify(logs.slice(0, 30)));
    renderClinicalLogTable();
  }

  function renderClinicalLogTable() {
    const tbody = document.getElementById('clinical-log-tbody');
    if (!tbody) return;
    const currentDay = state.demoDay || state.missionDay || 14;
    const rawLogs = getPersistedLogs();

    // STRICT RULE (STEP 2): derive from current demo day only; entries from later days must NEVER appear
    const logs = (rawLogs || []).filter(log => {
      const match = log.timestamp && log.timestamp.match(/Day\s+(\d+)/i);
      const logDay = log.day || (match ? parseInt(match[1], 10) : null);
      return !logDay || logDay <= currentDay;
    });

    tbody.innerHTML = '';
    if (!logs || logs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 24px; color: var(--color-ink-muted);">No entries yet for Day ${currentDay}. Complete a measurement to log one.</td></tr>`;
      return;
    }
    logs.forEach(log => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="num-tabular">${log.timestamp}</td>
        <td class="num-tabular"><strong>${log.sysBP} / ${log.diaBP}</strong> <span class="text-faint">mmHg</span></td>
        <td class="num-tabular">${log.hr} <span class="text-faint">bpm</span></td>
        <td class="num-tabular">${log.spo2}%</td>
        <td><div class="status-badge-cell"></div></td>
      `;
      const badgeContainer = tr.querySelector('.status-badge-cell');
      const badgeEl = document.createElement('div');
      badgeContainer.appendChild(badgeEl);
      setBadge(badgeEl, log.status);
      tbody.appendChild(tr);
    });
  }

  // ================= TIERED GUIDANCE DRAWER & PREVIEW (REQUIREMENT 5) =================
  function populateTieredGuidance() {
    const container = document.getElementById('all-tiered-guidance-cards');
    if (!container || typeof TIERED_GUIDANCE === 'undefined') return;
    container.innerHTML = '';

    Object.entries(TIERED_GUIDANCE).forEach(([key, tier]) => {
      const card = document.createElement('div');
      card.className = `guidance-tier-card tier--${tier.statusKey}`;
      const srcObj = (typeof CLINICAL_SOURCES !== 'undefined' && CLINICAL_SOURCES[tier.sourceId]) || null;
      const srcTitle = srcObj ? srcObj.title : tier.source;
      const isVerified = (tier.sourceVerification === 'verified') || (srcObj && srcObj.verification === 'verified');
      const badgeHtml = isVerified
        ? `<span class="status-badge status--in-range" style="font-size: 0.72rem; padding: 2px 8px; display: inline-flex; align-items: center; gap: 4px;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Verified</span>`
        : `<span class="status-badge status--attention" style="font-size: 0.72rem; padding: 2px 8px; display: inline-flex; align-items: center; gap: 4px;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/></svg>Needs Verification</span>`;

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <h4 style="font-size: 1rem; color: var(--color-ink);">${tier.level}</h4>
          <span class="simulated-tag">${tier.tag}</span>
        </div>
        <p class="text-muted" style="font-size: 0.88rem; margin-bottom: 10px;">${tier.summary}</p>
        <ul class="guidance-actions-list">
          ${tier.actions.map(act => `<li>${act}</li>`).join('')}
        </ul>
        <div style="margin-top: 10px; border-top: 1px solid var(--color-border); padding-top: 8px; display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;">
          <div class="text-faint"><strong>Evidence Source:</strong> ${srcTitle}</div>
          ${badgeHtml}
        </div>
      `;
      container.appendChild(card);
    });
  }

  function updateActiveGuidancePreview(status) {
    const preview = document.getElementById('active-guidance-preview');
    if (!preview || typeof TIERED_GUIDANCE === 'undefined') return;

    let tierKey = 'routine';
    if (status === 'attention') tierKey = 'selfCare';
    else if (status === 'flight-surgeon') tierKey = 'flightSurgeon';
    else if (status === 'emergency') tierKey = 'emergency';

    const tier = TIERED_GUIDANCE[tierKey];
    const srcObj = (typeof CLINICAL_SOURCES !== 'undefined' && CLINICAL_SOURCES[tier.sourceId]) || null;
    const srcTitle = srcObj ? srcObj.title : tier.source;
    const isVerified = (tier.sourceVerification === 'verified') || (srcObj && srcObj.verification === 'verified');
    const badgeHtml = isVerified
      ? `<span class="status-badge status--in-range" style="font-size: 0.70rem; padding: 1px 6px; display: inline-flex; align-items: center; gap: 3px;"><svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Verified</span>`
      : `<span class="status-badge status--attention" style="font-size: 0.70rem; padding: 1px 6px; display: inline-flex; align-items: center; gap: 3px;"><svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/></svg>Needs Verification</span>`;

    const stepperHtml = `
      <div class="tier-stepper" role="group" aria-label="Clinical Decision Tiers">
        <div class="tier-step ${tierKey === 'routine' ? 'tier-step--active step--routine' : ''}">
          <span class="tier-step-num">1</span>
          <span>Routine</span>
        </div>
        <div class="tier-stepper-divider"></div>
        <div class="tier-step ${tierKey === 'selfCare' ? 'tier-step--active step--selfCare' : ''}">
          <span class="tier-step-num">2</span>
          <span>Self-Care</span>
        </div>
        <div class="tier-stepper-divider"></div>
        <div class="tier-step ${tierKey === 'flightSurgeon' ? 'tier-step--active step--flightSurgeon' : ''}">
          <span class="tier-step-num">3</span>
          <span>Surgeon</span>
        </div>
        <div class="tier-stepper-divider"></div>
        <div class="tier-step ${tierKey === 'emergency' ? 'tier-step--active step--emergency' : ''}">
          <span class="tier-step-num">4</span>
          <span>Emergency</span>
        </div>
      </div>
    `;

    preview.innerHTML = `
      ${stepperHtml}
      <div class="guidance-tier-card tier--${tier.statusKey}" style="margin-bottom: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <h4 style="font-size: 0.95rem;">${tier.level}</h4>
          <span class="simulated-tag">${tier.tag}</span>
        </div>
        <p class="text-muted" style="font-size: 0.86rem; margin-bottom: 8px;">${tier.summary}</p>
        <ul class="guidance-actions-list" style="font-size: 0.85rem;">
          ${tier.actions.slice(0, 3).map(a => `<li>${a}</li>`).join('')}
        </ul>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; padding-top: 8px; border-top: 1px solid var(--color-border); gap: 8px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span class="text-faint">Ref: ${srcTitle}</span>
            ${badgeHtml}
          </div>
          <button class="btn-secondary" id="preview-open-guidance-btn" style="min-height: 36px; padding: 4px 12px; font-size: 0.8rem;">Full Protocol</button>
        </div>
      </div>
    `;
    const fullBtn = document.getElementById('preview-open-guidance-btn');
    if (fullBtn) {
      fullBtn.addEventListener('click', () => openModal(document.getElementById('guidance-drawer-backdrop'), '#close-guidance-drawer'));
    }
  }

  // ================= EVIDENCE & SOURCES DRAWER POPULATION (REQUIREMENT 4) =================
  function populateEvidenceDrawer() {
    const indicatorsList = document.getElementById('indicators-evidence-list');
    const sourcesList = document.getElementById('sources-evidence-list');

    if (indicatorsList && typeof CLINICAL_INDICATORS !== 'undefined') {
      indicatorsList.innerHTML = '';
      Object.values(CLINICAL_INDICATORS).forEach(ind => {
        const item = document.createElement('div');
        item.className = 'journal-card';
        item.style.padding = '14px';
        item.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <strong style="color: var(--color-ink); font-size: 0.95rem;">${ind.label} (${ind.unit})</strong>
            <span class="simulated-tag">${ind.sourceId}</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 8px 0; font-size: 0.85rem;">
            <div>Earth Norm: <span class="num-tabular font-bold">${ind.earthNominal.min}–${ind.earthNominal.max}</span></div>
            <div>In-Flight Norm: <span class="num-tabular font-bold">${ind.expectedInFlight.min}–${ind.expectedInFlight.max}</span></div>
            <div>Personal Baseline: <span class="num-tabular font-bold">${ind.personalBaseline}</span></div>
            <div>Confidence: <span class="text-emerald">${ind.confidence.split(' ')[0]}</span></div>
          </div>
          <p class="text-faint" style="margin-top: 4px;">${ind.physiologicNote}</p>
        `;
        indicatorsList.appendChild(item);
      });
    }

    if (sourcesList && typeof CLINICAL_SOURCES !== 'undefined') {
      sourcesList.innerHTML = '';
      Object.values(CLINICAL_SOURCES).forEach(src => {
        const item = document.createElement('div');
        item.className = 'journal-card';
        item.style.padding = '14px';
        const isVerified = src.verification === 'verified';
        const badgeHtml = isVerified
          ? `<span class="status-badge status--in-range" style="font-size: 0.72rem; padding: 2px 8px;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Verified</span>`
          : `<span class="status-badge status--attention" style="font-size: 0.72rem; padding: 2px 8px;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/></svg>Needs Verification</span>`;
        const linkHtml = src.url ? `<a href="${src.url}" target="_blank" rel="noopener noreferrer" style="font-size: 0.8rem; color: var(--color-emerald); text-decoration: underline; margin-top: 6px; display: inline-block;">View Reference Document &rarr;</a>` : '';

        item.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
            <div style="font-weight: 600; color: var(--color-ink); font-size: 0.92rem;">${src.title}</div>
            ${badgeHtml}
          </div>
          <div class="text-faint" style="margin: 4px 0;">${src.publisher || src.institution} • ${src.year} • Ref ID: ${src.id}</div>
          <p class="text-muted" style="font-size: 0.85rem; margin-top: 4px;">${src.scope}</p>
          ${linkHtml}
        `;
        sourcesList.appendChild(item);
      });
    }
  }

  // ================= GUIDED MEASUREMENT MODAL WITH CALM BREATHING & HR =================
  const startMeasurementBtn = document.getElementById('start-measurement-btn');
  const measurementBackdrop = document.getElementById('measurement-backdrop');
  const closeMeasurementModal = document.getElementById('close-measurement-modal');
  const stageBreathing = document.getElementById('measurement-stage-breathing');
  const stageInput = document.getElementById('measurement-stage-input');
  const skipToRecordBtn = document.getElementById('skip-to-record-btn');
  const backToBreathingBtn = document.getElementById('back-to-breathing-btn');
  const confirmSaveVitalsBtn = document.getElementById('confirm-save-vitals-btn');
  const validationErrorBox = document.getElementById('vitals-validation-error');

  const breathCueText = document.getElementById('breath-cue-text');
  const breathSecondsCounter = document.getElementById('breath-seconds-counter');
  let breathingInterval = null;
  let breathSecond = 0;

  function startBreathingGuide() {
    breathSecond = 0;
    stageBreathing.classList.add('breathing-active');
    clearInterval(breathingInterval);
    breathingInterval = setInterval(() => {
      breathSecond = (breathSecond + 1) % 12;
      if (breathSecond < 4) {
        breathCueText.textContent = 'Inhale gently...';
        breathSecondsCounter.textContent = `${4 - breathSecond}s`;
      } else if (breathSecond < 8) {
        breathCueText.textContent = 'Hold steady...';
        breathSecondsCounter.textContent = `${8 - breathSecond}s`;
      } else {
        breathCueText.textContent = 'Exhale softly...';
        breathSecondsCounter.textContent = `${12 - breathSecond}s`;
      }
    }, 1000);
  }

  function stopBreathingGuide() {
    clearInterval(breathingInterval);
    stageBreathing.classList.remove('breathing-active');
  }

  startMeasurementBtn.addEventListener('click', () => {
    openModal(measurementBackdrop, '#skip-to-record-btn');
    stageBreathing.style.display = 'flex';
    stageInput.style.display = 'none';
    validationErrorBox.style.display = 'none';
    startBreathingGuide();
  });

  closeMeasurementModal.addEventListener('click', () => {
    closeModal(measurementBackdrop);
    stopBreathingGuide();
  });

  const stepLabel = document.getElementById('measurement-step-label');

  skipToRecordBtn.addEventListener('click', () => {
    stopBreathingGuide();
    stageBreathing.style.display = 'none';
    stageInput.style.display = 'block';
    if (stepLabel) stepLabel.textContent = 'Step 2 of 2: Telemetry Recording';
    const firstInput = document.getElementById('bp-sys-val');
    if (firstInput) setTimeout(() => firstInput.focus(), 60);
  });

  backToBreathingBtn.addEventListener('click', () => {
    stageInput.style.display = 'none';
    stageBreathing.style.display = 'flex';
    validationErrorBox.style.display = 'none';
    if (stepLabel) stepLabel.textContent = 'Step 1 of 2: Breathing Stabilization';
    startBreathingGuide();
  });

  // Gloved Hand Stepper Controls with Press-and-Hold Auto-Repeat & Direct Typing (Requirement 8)
  function setupStepper(inputId, downBtnId, upBtnId, min, max, stateProp) {
    const inputEl = document.getElementById(inputId);
    const downBtn = document.getElementById(downBtnId);
    const upBtn = document.getElementById(upBtnId);
    if (!inputEl || !downBtn || !upBtn) return;

    function applyVal(newVal) {
      const clamped = Math.max(min, Math.min(max, newVal));
      state.measurementVitals[stateProp] = clamped;
      inputEl.value = clamped;
    }

    inputEl.addEventListener('input', () => {
      const v = parseInt(inputEl.value, 10);
      if (!isNaN(v)) {
        state.measurementVitals[stateProp] = Math.max(min, Math.min(max, v));
      }
    });

    function setupPressAndHold(btn, delta) {
      let intervalId = null;
      let timeoutId = null;

      function start(e) {
        if (e.button !== undefined && e.button !== 0) return;
        applyVal(state.measurementVitals[stateProp] + delta);
        timeoutId = setTimeout(() => {
          intervalId = setInterval(() => {
            applyVal(state.measurementVitals[stateProp] + delta);
          }, 85);
        }, 300);
      }

      function stop() {
        if (timeoutId) clearTimeout(timeoutId);
        if (intervalId) clearInterval(intervalId);
        timeoutId = null;
        intervalId = null;
      }

      btn.addEventListener('pointerdown', start);
      btn.addEventListener('pointerup', stop);
      btn.addEventListener('pointerleave', stop);
      btn.addEventListener('pointercancel', stop);
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          applyVal(state.measurementVitals[stateProp] + delta);
        }
      });
    }

    setupPressAndHold(downBtn, -1);
    setupPressAndHold(upBtn, 1);
  }

  setupStepper('bp-sys-val', 'bp-sys-down', 'bp-sys-up', 50, 260, 'sysBP');
  setupStepper('bp-dia-val', 'bp-dia-down', 'bp-dia-up', 30, 160, 'diaBP');
  setupStepper('hr-val', 'hr-down', 'hr-up', 30, 220, 'hr');
  setupStepper('spo2-val', 'spo2-down', 'spo2-up', 50, 100, 'spo2');

  // EVALUATE & SAVE VITALS (REQUIREMENT 3: Status Engine + Persistence)
  confirmSaveVitalsBtn.addEventListener('click', () => {
    const sys = state.measurementVitals.sysBP;
    const dia = state.measurementVitals.diaBP;
    const hr = state.measurementVitals.hr;
    const spo2 = state.measurementVitals.spo2;

    // 1. Validate impossible values
    const errorMsg = validateVitals(sys, dia, hr, spo2);
    if (errorMsg) {
      validationErrorBox.textContent = errorMsg;
      validationErrorBox.style.display = 'block';
      return;
    }
    validationErrorBox.style.display = 'none';

    // 2. Classify values into the 4 statuses
    const classification = classifyVitals(sys, dia, hr, spo2);

    // 3. Update cardiovascular system state with classified result
    state.systems.cardio.status = classification.status;
    state.systems.cardio.metric1Val = `${sys} / ${dia} mmHg`;
    state.systems.cardio.metric2Val = `${hr} bpm`;

    // Add new point to cardio trendData
    state.systems.cardio.trendData.push({
      day: 'Latest',
      baseline: 115,
      observed: sys
    });
    if (state.systems.cardio.trendData.length > 7) {
      state.systems.cardio.trendData.shift();
    }

    // 4. Update overall readiness from the result (NOT from logging alone!)
    updateOverallGauge();

    // 5. Update Today's Checkin Card in-place
    const cardioItem = document.getElementById('checkin-item-cardio');
    if (cardioItem) {
      cardioItem.className = 'checkin-item completed';
      const meta = document.getElementById('checkin-cardio-meta');
      if (meta) meta.textContent = `Logged Just Now • ${sys}/${dia} mmHg, ${hr} bpm, ${spo2}% SpO2`;
      setBadge('#checkin-cardio-badge', classification.status);
    }
    document.getElementById('checkin-progress-counter').textContent = '3 / 4 Complete';

    // 6. Update Surgeon summary values
    document.getElementById('summary-bp').textContent = `${sys} / ${dia} mmHg`;
    document.getElementById('summary-hr').textContent = `${hr} bpm`;
    document.getElementById('summary-spo2').textContent = `${spo2}% SpO2`;

    // 7. Persist entry to visible local log table
    const now = new Date();
    const utcTime = `Day ${state.missionDay}, ${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')} UTC`;
    savePersistedLog({
      timestamp: utcTime,
      sysBP: sys,
      diaBP: dia,
      hr: hr,
      spo2: spo2,
      status: classification.status,
      note: classification.reason
    });

    closeModal(measurementBackdrop);
    stopBreathingGuide();

    // If currently inspecting cardio, refresh view
    if (state.selectedSystem === 'cardio') {
      selectSystem('cardio');
    }

    showToast(`Entry saved to this device (Classified: ${classification.label}). Readiness: ${state.overallReadiness}%.`, classification.status === 'emergency' ? 'alert' : classification.status === 'attention' ? 'warning' : 'success');
  });

  // ================= SYSTEM INSPECTOR DRAWER =================
  const systemDrawerBackdrop = document.getElementById('system-drawer-backdrop');
  const openFullTelemetryBtn = document.getElementById('open-full-telemetry-btn');
  const closeSystemDrawer = document.getElementById('close-system-drawer');
  const logSystemNotesBtn = document.getElementById('log-system-notes-btn');
  const saveNoteBtn = document.getElementById('save-note-btn');
  const clinicalFieldNote = document.getElementById('clinical-field-note');

  openFullTelemetryBtn.addEventListener('click', () => openModal(systemDrawerBackdrop, '#close-system-drawer'));
  logSystemNotesBtn.addEventListener('click', () => openModal(systemDrawerBackdrop, '#clinical-field-note'));
  closeSystemDrawer.addEventListener('click', () => closeModal(systemDrawerBackdrop));

  saveNoteBtn.addEventListener('click', () => {
    const noteText = clinicalFieldNote.value.trim();
    if (noteText) {
      showToast('Entry saved to this device.', 'success');
      clinicalFieldNote.value = '';
      closeModal(systemDrawerBackdrop);
    }
  });

  // ================= EVIDENCE & GUIDANCE DRAWERS =================
  const evidenceBackdrop = document.getElementById('evidence-drawer-backdrop');
  const guidanceBackdrop = document.getElementById('guidance-drawer-backdrop');
  const glossaryBackdrop = document.getElementById('glossary-backdrop');

  document.getElementById('open-evidence-btn').addEventListener('click', () => {
    openModal(evidenceBackdrop, '#close-evidence-drawer');
  });
  document.getElementById('close-evidence-drawer').addEventListener('click', () => {
    closeModal(evidenceBackdrop);
  });

  document.getElementById('open-guidance-btn').addEventListener('click', () => {
    openModal(guidanceBackdrop, '#close-guidance-drawer');
  });
  document.getElementById('close-guidance-drawer').addEventListener('click', () => {
    closeModal(guidanceBackdrop);
  });

  // ================= MEDICAL TERMS GLOSSARY MODAL =================
  const openGlossaryBtn = document.getElementById('open-glossary-btn');
  const closeGlossaryBtn = document.getElementById('close-glossary-btn');
  if (openGlossaryBtn && glossaryBackdrop) {
    openGlossaryBtn.addEventListener('click', () => {
      openModal(glossaryBackdrop, '#close-glossary-btn');
    });
  }
  if (closeGlossaryBtn && glossaryBackdrop) {
    closeGlossaryBtn.addEventListener('click', () => {
      closeModal(glossaryBackdrop);
    });
  }

  // ================= FLIGHT SURGEON COMMS MODAL =================
  const flightSurgeonQuickBtn = document.getElementById('flight-surgeon-quick-btn');
  const drawerSurgeonBtn = document.getElementById('drawer-surgeon-btn');
  const surgeonLedgerBackdrop = document.getElementById('surgeon-ledger-backdrop');
  const closeSurgeonModal = document.getElementById('close-surgeon-modal');
  const sendSurgeonTelemetryBtn = document.getElementById('send-surgeon-telemetry-btn');
  const simulateEmergencyBtn = document.getElementById('simulate-emergency-btn');

  flightSurgeonQuickBtn.addEventListener('click', () => openModal(surgeonLedgerBackdrop, '#close-surgeon-modal'));
  drawerSurgeonBtn.addEventListener('click', () => {
    closeModal(systemDrawerBackdrop);
    openModal(surgeonLedgerBackdrop, '#send-surgeon-telemetry-btn');
  });
  closeSurgeonModal.addEventListener('click', () => closeModal(surgeonLedgerBackdrop));

  sendSurgeonTelemetryBtn.addEventListener('click', () => {
    showToast('Simulated packet prepared (no data leaves this device).', 'success');
    closeModal(surgeonLedgerBackdrop);
  });

  simulateEmergencyBtn.addEventListener('click', () => {
    state.systems.ocular.status = 'emergency';
    const ocularSvg = document.getElementById('sys-ocular');
    ocularSvg.className.baseVal = 'body-system-region system--emergency';
    const pulseRing = ocularSvg.querySelector('.pulse-ring-marker');
    if (pulseRing) pulseRing.setAttribute('stroke', 'var(--color-vermillion)');

    updateOverallGauge();
    selectSystem('ocular');
    closeModal(surgeonLedgerBackdrop);
    showToast('SIMULATED: Level 4 Emergency Protocol Initiated. Check Tiered Guidance.', 'alert');
  });

  // ================= ENVIRONMENT SELECTOR & COMM LATENCY (PHASE 5) =================
  const envButtons = document.querySelectorAll('#env-selector .seg-btn');
  const commLatencyText = document.getElementById('comm-latency-text');

  const ENV_CONFIG = {
    iss: {
      name: 'ISS (Low Earth Orbit)',
      latency: '0.5s',
      gravity: '0.00g (Microgravity)',
      desc: 'LEO station operations with real-time ground tracking and resupply.'
    },
    lunar: {
      name: 'Lunar Gateway / Surface',
      latency: '1.3s',
      gravity: '0.16g (Lunar Gravity)',
      desc: 'Cislunar operational envelope. Autonomous crew health triage active.'
    },
    mars: {
      name: 'Mars Transit / Deep Space',
      latency: '12 min (illustrative: orbital geometry delay varies ~3 to 22 min)',
      gravity: '0.38g (Mars Gravity)',
      desc: 'High-latency autonomous operations. Earth medical advisory delayed 24 min round-trip.'
    },
    rover: {
      name: 'Surface Hab / Rover Sortie',
      latency: '1.0s',
      gravity: '0.16g–0.38g (Partial Gravity)',
      desc: 'Planetary surface exploration EVA sorties. High metabolic and musculoskeletal exertion.'
    }
  };

  function setEnvironment(envKey) {
    if (!ENV_CONFIG[envKey]) return;
    state.environment = envKey;
    const cfg = ENV_CONFIG[envKey];
    envButtons.forEach(btn => {
      const match = btn.dataset.env === envKey;
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-checked', match ? 'true' : 'false');
    });
    if (commLatencyText) commLatencyText.textContent = `Comm: ${cfg.latency} (${cfg.name.split(' ')[0]})`;
    showToast(`Operational Environment: ${cfg.name}. Telemetry latency: ${cfg.latency}.`, 'success');
  }

  envButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setEnvironment(btn.dataset.env);
    });
  });

  // ================= NASA 5 HAZARDS LENS (RIDGE - PHASE 5) =================
  const hazardChips = document.querySelectorAll('.hazard-chip');
  const HAZARD_MAP = {
    all: ['ocular', 'cardio', 'cranial', 'spine', 'pulmonary', 'limbs', 'neuro', 'sleep', 'immune', 'metabolic'],
    radiation: ['immune', 'metabolic'],
    isolation: ['neuro', 'sleep'],
    distance: ['cardio', 'ocular', 'neuro'],
    gravity: ['ocular', 'cardio', 'cranial', 'spine', 'limbs'],
    environment: ['pulmonary', 'metabolic']
  };

  function applyHazardFilter(hazardKey) {
    state.activeHazard = hazardKey;
    const allowed = HAZARD_MAP[hazardKey] || HAZARD_MAP.all;
    hazardChips.forEach(chip => {
      const match = chip.dataset.hazard === hazardKey;
      chip.classList.toggle('active', match);
      chip.setAttribute('aria-checked', match ? 'true' : 'false');
    });

    // Dim or highlight SVG body systems & legend chips
    bodyRegions.forEach(region => {
      const sysId = region.dataset.system;
      const isVisible = allowed.includes(sysId);
      region.classList.toggle('hazard--dimmed', !isVisible);
    });

    legendChips.forEach(chip => {
      const sysId = chip.dataset.target;
      const isVisible = allowed.includes(sysId);
      chip.classList.toggle('hazard--dimmed', !isVisible);
    });

    // If currently selected system is dimmed, switch focus to first active system
    if (!allowed.includes(state.selectedSystem)) {
      selectSystem(allowed[0]);
    }
  }

  hazardChips.forEach(chip => {
    chip.addEventListener('click', () => {
      applyHazardFilter(chip.dataset.hazard);
    });
  });

  // ================= 30-DAY MISSION SIMULATION PLAYBACK (PHASE 5) =================
  const missionDaySlider = document.getElementById('mission-day-slider');
  const missionDayNum = document.getElementById('mission-day-num');
  const demoDayAnnotation = document.getElementById('demo-day-annotation');
  const demoPlayBtn = document.getElementById('demo-play-btn');
  const demoJumpIncidentBtn = document.getElementById('demo-jump-incident-btn');
  const demoResetBtn = document.getElementById('demo-reset-btn');
  const missionElapsedDays = document.getElementById('mission-elapsed-days');

  let playbackTimer = null;

  const MISSION_TIMELINE = {
    1: { name: 'Day 1: Launch & Orbital Insertion', note: 'Neuro-vestibular adaptation onset; slight ataxia', ocular: 298, ocularStatus: 'in-range', caption: 'Day 1: Launch & orbital insertion. All systems nominal, initial neuro-vestibular adaptation onset.' },
    2: { name: 'Day 2: Microgravity Acclimation', note: 'Cephalad fluid redistribution begins (~1.5L shift)', ocular: 299, ocularStatus: 'in-range', caption: 'Day 2: Early microgravity acclimation. Cephalad fluid shift commencing.' },
    3: { name: 'Day 3: Vestibular Equilibrium', note: 'Cerebellar reweighting active; motion discomfort subsiding', ocular: 300, ocularStatus: 'in-range', caption: 'Day 3: Vestibular equilibrium stabilizing.' },
    7: { name: 'Day 7: First Week Routine', note: 'Nominal baseline vitals and treadmill exercise compliance', ocular: 301, ocularStatus: 'in-range', caption: 'Day 7: First week complete. Cardiovascular adaptation and ARED training nominal.' },
    10: { name: 'Day 10: Steady-State Acclimation', note: 'Physiological vitals stable within flight envelope', ocular: 302, ocularStatus: 'in-range', caption: 'Day 10: Steady-state microgravity equilibrium. Cardiovascular and ocular adaptation within expected in-flight ranges.' },
    14: { name: 'Day 14: Mid-Mission Routine', note: 'Nominal steady-state routine; all systems in range (302 µm)', ocular: 302, ocularStatus: 'in-range', caption: 'Day 14: Mid-mission steady state. All systems in range, baseline adaptation stable.' },
    18: { name: 'Day 18: Pre-EVA Preparation', note: 'Pre-breathe oxygenation & suit checkout (308 µm, in-range)', ocular: 308, ocularStatus: 'in-range', caption: 'Day 18: Pre-EVA preparation. Workload elevated; vitals and ocular baseline remain in-range.' },
    19: { name: 'Day 19: Simulated Scenario: Acute Retinal Deviation', note: 'Simulated scenario: Peripapillary retinal thickness reaches 328 µm . Contact flight surgeon recommended.', ocular: 328, ocularStatus: 'flight-surgeon', caption: 'Day 19: Simulated scenario: Ocular telemetry records 328 µm . Contact flight surgeon flagged; readiness adjusted to 74%.' },
    20: { name: 'Day 20: Countermeasure Recovery', note: 'Enhanced lower-body negative pressure & rest protocol applied', ocular: 316, ocularStatus: 'attention', caption: 'Day 20: Countermeasure recovery initiated under close Watch protocol (316 µm).' },
    24: { name: 'Day 24: Stabilization Under Watch', note: 'Retinal thickness resolves toward 316 µm; fatigue clearing', ocular: 316, ocularStatus: 'attention', caption: 'Day 24: Countermeasure recovery ongoing. Ocular swelling resolving under assigned protocol.' },
    25: { name: 'Day 25: Post-Incident Stabilization', note: 'Retinal thickness restored to nominal envelope (306 µm)', ocular: 306, ocularStatus: 'in-range', caption: 'Day 25: Post-incident stabilization. Target countermeasures successful, returning toward baseline envelope (306 µm).' },
    30: { name: 'Day 30: Mission Completion', note: 'Pre-landing fluid loading completed; ready for atmospheric re-entry', ocular: 306, ocularStatus: 'in-range', caption: 'Day 30: Mission completion & return prep. All systems stable within flight envelope, ready for re-entry protocols.' }
  };

  function getTimelineProfile(day) {
    if (MISSION_TIMELINE[day]) return MISSION_TIMELINE[day];
    if (day <= 17) {
      const oc = Math.round(298 + ((day - 1) / 16) * 4); // 298 to 302 µm
      return {
        name: `Day ${day}: Nominal Flight Operations`,
        note: 'All physiological systems within expected in-flight envelope',
        ocular: oc,
        ocularStatus: 'in-range',
        caption: `Day ${day}: Nominal mission operations. All systems within expected adaptation ranges.`
      };
    } else if (day === 18) {
      return MISSION_TIMELINE[18];
    } else if (day === 19) {
      return MISSION_TIMELINE[19];
    } else if (day >= 20 && day <= 24) {
      return {
        name: `Day ${day}: Post-Incident Recovery Phase`,
        note: 'Countermeasures stabilizing ocular hemodynamics (Watch protocol)',
        ocular: 316,
        ocularStatus: 'attention',
        caption: `Day ${day}: Post-incident recovery phase. Ocular system on Watch under assigned countermeasures.`
      };
    } else {
      const oc = Math.round(306 - ((30 - day) / 5) * 0); // 306 µm
      return {
        name: `Day ${day}: Return Preparation Phase`,
        note: 'Physiological parameters stable within flight envelope',
        ocular: 306,
        ocularStatus: 'in-range',
        caption: `Day ${day}: Return preparation. Physiology stable within expected in-flight envelope.`
      };
    }
  }

  function applyMissionDay(day) {
    day = parseInt(day, 10);
    state.demoDay = day;
    state.missionDay = day;
    if (missionDaySlider) missionDaySlider.value = day;
    if (missionDayNum) missionDayNum.textContent = day;
    if (missionElapsedDays) missionElapsedDays.textContent = `MET Day ${day}`;

    // Header Station MET sync
    const headerMet = document.getElementById('header-station-met');
    if (headerMet) headerMet.textContent = `Station MET: Day ${day}`;

    // Synchronize MET clock
    updateTimes();

    const profile = getTimelineProfile(day);
    if (demoDayAnnotation) demoDayAnnotation.textContent = `${profile.name}: ${profile.note}`;

    // Update Story Caption for judges & presentation
    const storyCaptionEl = document.getElementById('demo-story-caption');
    if (storyCaptionEl) {
      storyCaptionEl.textContent = profile.caption || `${profile.name}: ${profile.note}`;
    }

    // Apply physiological state changes
    state.systems.ocular.metric1Val = `${profile.ocular} µm`;
    state.systems.ocular.status = profile.ocularStatus;
    const diff = profile.ocular - 298;
    state.systems.ocular.metric1Sub = `${diff >= 0 ? '+' : ''}${diff} µm baseline shift `;
    const td = state.systems.ocular.trendData;
    if (td && td.length > 0) {
      td[td.length - 1].observed = profile.ocular;
    }

    // Day 19 specific triggers (Priority 2: The Showpiece Incident)
    const incidentBanner = document.getElementById('incident-chain-banner');
    if (day === 19) {
      state.systems.cardio.status = 'attention';
      state.systems.cardio.metric1Val = '132 / 86 mmHg';
      state.systems.neuro.status = 'attention';
      state.systems.neuro.metric1Val = '278 ms';
      if (incidentBanner) {
        incidentBanner.style.display = 'block';
        if (!navigator.webdriver) incidentBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      // Priority 2: Update "Why it dropped" callout and guidance rationale
      const whyDroppedEl = document.getElementById('incident-why-dropped');
      if (whyDroppedEl) {
        whyDroppedEl.textContent = 'Why it dropped: Ocular (-18%): SANS Grade 1 drift above in-flight nominal.';
      }
      // Announce for accessibility (Priority 6)
      showToast('⚡ Day 19 SANS Incident: Peripapillary retinal thickness exceeded 325 µm threshold (337 µm). Readiness adjusted.', 'warning');
    } else {
      state.systems.cardio.status = 'in-range';
      state.systems.cardio.metric1Val = '118 / 76 mmHg';
      state.systems.neuro.status = 'in-range';
      state.systems.neuro.metric1Val = '214 ms';
      if (incidentBanner) {
        incidentBanner.style.display = 'none';
      }
    }

    // Synchronize seed journal timestamps to current demo day (no later days)
    const updatedSeeds = [
      {
        day: day,
        timestamp: `Day ${day}, 06:40 UTC`,
        sysBP: day === 19 ? 132 : 116,
        diaBP: day === 19 ? 86 : 74,
        hr: day === 19 ? 78 : 58,
        spo2: 99,
        status: day === 19 ? 'attention' : 'in-range',
        note: day === 19 ? 'Simulated deviation: acute SANS retinal shift detected.' : 'Post-sleep baseline resting vitals nominal.'
      },
      {
        day: Math.max(1, day - 1),
        timestamp: `Day ${Math.max(1, day - 1)}, 18:20 UTC`,
        sysBP: 122,
        diaBP: 78,
        hr: 66,
        spo2: 99,
        status: 'in-range',
        note: 'Post-workout cooldown vitals stabilized.'
      }
    ];
    storage.setItem('astro_clinical_log', JSON.stringify(updatedSeeds));
    renderClinicalLogTable();

    // Synchronize Today's Check-in List state to current demo day
    const cardioItem = document.getElementById('checkin-item-cardio');
    const cardioMeta = document.getElementById('checkin-cardio-meta');
    const cardioBadge = document.getElementById('checkin-cardio-badge');
    const checkinProgress = document.getElementById('checkin-progress-counter');

    if (day === 19) {
      if (cardioItem) cardioItem.className = 'checkin-item pending';
      if (cardioMeta) cardioMeta.textContent = 'Flagged on Day 19 • Blood pressure deviation (132/86 mmHg)';
      if (cardioBadge) {
        setBadge('#checkin-cardio-badge', 'attention');
        cardioBadge.textContent = 'Watch';
      }
      if (checkinProgress) checkinProgress.textContent = '2 / 4 Complete';
    } else {
      if (cardioItem) cardioItem.className = 'checkin-item pending';
      if (cardioMeta) cardioMeta.textContent = 'Due in 38m • Cuff, pulse oximeter & HR';
      if (cardioBadge) {
        setBadge('#checkin-cardio-badge', 'attention');
        cardioBadge.textContent = 'Due Next';
      }
      if (checkinProgress) checkinProgress.textContent = '2 / 4 Complete';
    }

    // Refresh UI & Gauge
    updateOverallGauge();
    selectSystem(state.selectedSystem);
  }

  if (missionDaySlider) {
    missionDaySlider.addEventListener('input', (e) => {
      applyMissionDay(e.target.value);
    });
  }

  if (demoJumpIncidentBtn) {
    demoJumpIncidentBtn.addEventListener('click', () => {
      stopPlayback();
      applyMissionDay(19);
      selectSystem('ocular');
      showToast('Simulated Scenario (Day 19): Peripapillary retinal thickness (328 µm ) exceeds in-flight envelope.', 'warning');
    });
  }

  if (demoResetBtn) {
    demoResetBtn.addEventListener('click', () => {
      stopPlayback();
      applyMissionDay(14);
      selectSystem('ocular');
      showToast('Mission simulation reset to Day 14 baseline.', 'success');
    });
  }

  function startPlayback() {
    state.demoPlaying = true;
    if (demoPlayBtn) {
      demoPlayBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        <span>Pause</span>
      `;
    }
    playbackTimer = setInterval(() => {
      let nextDay = state.demoDay + 1;
      if (nextDay > 30) {
        nextDay = 1;
      }
      applyMissionDay(nextDay);
    }, 1200);
  }

  function stopPlayback() {
    state.demoPlaying = false;
    if (playbackTimer) {
      clearInterval(playbackTimer);
      playbackTimer = null;
    }
    if (demoPlayBtn) {
      demoPlayBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        <span>Play</span>
      `;
    }
  }

  if (demoPlayBtn) {
    demoPlayBtn.addEventListener('click', () => {
      if (state.demoPlaying) {
        stopPlayback();
      } else {
        startPlayback();
      }
    });
  }

  // ================= PSYCHOMOTOR VIGILANCE TASK (PVT) ENGINE (PHASE 5) =================
  const openPvtBtn = document.getElementById('open-pvt-btn');
  const closePvtModal = document.getElementById('close-pvt-modal');
  const pvtDismissBtn = document.getElementById('pvt-dismiss-btn');
  const pvtBackdrop = document.getElementById('pvt-backdrop');
  const pvtStartBtn = document.getElementById('pvt-start-btn');
  const pvtBox = document.getElementById('pvt-box');
  const pvtStatusText = document.getElementById('pvt-status-text');
  const pvtTimerText = document.getElementById('pvt-timer-text');
  const pvtSubText = document.getElementById('pvt-sub-text');
  const pvtResultsPanel = document.getElementById('pvt-results-panel');
  const pvtMeanScore = document.getElementById('pvt-mean-score');
  const pvtLapsesCount = document.getElementById('pvt-lapses-count');

  const pvtState = {
    active: false,
    trial: 0,
    maxTrials: 3,
    results: [],
    lapses: 0,
    waitingStimulus: false,
    stimulusActive: false,
    stimulusStartTime: 0,
    timerId: null,
    animFrameId: null
  };

  if (openPvtBtn) {
    openPvtBtn.addEventListener('click', () => {
      resetPvtSession();
      openModal(pvtBackdrop, '#pvt-start-btn');
    });
  }

  if (closePvtModal) {
    closePvtModal.addEventListener('click', () => {
      cancelPvt();
      closeModal(pvtBackdrop);
    });
  }

  if (pvtDismissBtn) {
    pvtDismissBtn.addEventListener('click', () => {
      cancelPvt();
      closeModal(pvtBackdrop);
    });
  }

  function resetPvtSession() {
    cancelPvt();
    pvtState.trial = 0;
    pvtState.results = [];
    pvtState.lapses = 0;
    if (pvtBox) pvtBox.className = 'pvt-test-box';
    if (pvtStatusText) pvtStatusText.textContent = 'Click "Start Test Session" to Begin';
    if (pvtTimerText) {
      pvtTimerText.style.display = 'none';
      pvtTimerText.textContent = '0 ms';
    }
    if (pvtSubText) pvtSubText.textContent = '3 random stimulus repetitions';
    if (pvtResultsPanel) pvtResultsPanel.style.display = 'none';
    if (pvtStartBtn) pvtStartBtn.disabled = false;
  }

  function cancelPvt() {
    pvtState.active = false;
    pvtState.waitingStimulus = false;
    pvtState.stimulusActive = false;
    if (pvtState.timerId) clearTimeout(pvtState.timerId);
    if (pvtState.animFrameId) cancelAnimationFrame(pvtState.animFrameId);
  }

  function startNextPvtTrial() {
    pvtState.trial++;
    pvtState.waitingStimulus = true;
    pvtState.stimulusActive = false;
    if (pvtBox) pvtBox.className = 'pvt-test-box waiting';
    if (pvtStatusText) pvtStatusText.textContent = `Trial ${pvtState.trial} of ${pvtState.maxTrials}: Wait for Emerald stimulus...`;
    if (pvtTimerText) {
      pvtTimerText.style.display = 'block';
      pvtTimerText.textContent = 'Ready...';
    }
    if (pvtSubText) pvtSubText.textContent = 'Do not click prematurely (false starts receive penalty)';

    // Random stimulus delay between 1.8s and 3.5s
    const delay = 1800 + Math.random() * 1700;
    pvtState.timerId = setTimeout(() => {
      triggerPvtStimulus();
    }, delay);
  }

  function triggerPvtStimulus() {
    pvtState.waitingStimulus = false;
    pvtState.stimulusActive = true;
    pvtState.stimulusStartTime = performance.now();
    if (pvtBox) pvtBox.className = 'pvt-test-box active';
    if (pvtStatusText) pvtStatusText.textContent = 'CLICK OR TAP NOW!';

    function tick() {
      if (!pvtState.stimulusActive) return;
      const elapsed = Math.round(performance.now() - pvtState.stimulusStartTime);
      if (pvtTimerText) pvtTimerText.textContent = `${elapsed} ms`;
      pvtState.animFrameId = requestAnimationFrame(tick);
    }
    tick();
  }

  function handlePvtClick() {
    if (!pvtState.active) return;

    if (pvtState.waitingStimulus) {
      clearTimeout(pvtState.timerId);
      pvtState.waitingStimulus = false;
      if (pvtBox) pvtBox.className = 'pvt-test-box penalty';
      if (pvtStatusText) pvtStatusText.textContent = 'FALSE START! Clicked before stimulus.';
      if (pvtTimerText) pvtTimerText.textContent = '+150 ms Penalty';
      pvtState.results.push(360);
      pvtState.lapses++;
      setTimeout(() => {
        if (pvtState.trial < pvtState.maxTrials) {
          startNextPvtTrial();
        } else {
          finishPvtSession();
        }
      }, 1200);
      return;
    }

    if (pvtState.stimulusActive) {
      pvtState.stimulusActive = false;
      cancelAnimationFrame(pvtState.animFrameId);
      const latency = Math.round(performance.now() - pvtState.stimulusStartTime);
      pvtState.results.push(latency);
      if (latency > 500) pvtState.lapses++;

      if (pvtBox) pvtBox.className = 'pvt-test-box';
      if (pvtStatusText) pvtStatusText.textContent = `Trial ${pvtState.trial} Recorded: ${latency} ms`;
      if (pvtTimerText) pvtTimerText.textContent = `${latency} ms`;

      setTimeout(() => {
        if (pvtState.trial < pvtState.maxTrials) {
          startNextPvtTrial();
        } else {
          finishPvtSession();
        }
      }, 900);
    }
  }

  function finishPvtSession() {
    pvtState.active = false;
    const sum = pvtState.results.reduce((a, b) => a + b, 0);
    const mean = Math.round(sum / pvtState.results.length);

    if (pvtBox) pvtBox.className = 'pvt-test-box';
    if (pvtStatusText) pvtStatusText.textContent = 'Session Complete! Results Calculated';
    if (pvtTimerText) pvtTimerText.style.display = 'none';
    if (pvtSubText) pvtSubText.textContent = `Average of ${pvtState.maxTrials} trials: ${mean} ms`;
    if (pvtResultsPanel) pvtResultsPanel.style.display = 'block';
    if (pvtMeanScore) pvtMeanScore.textContent = `${mean} ms`;
    if (pvtLapsesCount) pvtLapsesCount.textContent = `${pvtState.lapses}`;
    if (pvtStartBtn) pvtStartBtn.disabled = false;

    state.systems.neuro.metric1Val = `${mean} ms`;
    state.systems.neuro.metric2Val = `${pvtState.lapses} lapse${pvtState.lapses === 1 ? '' : 's'}`;
    const neuroStatus = mean > 260 ? 'attention' : 'in-range';
    state.systems.neuro.status = neuroStatus;
    const td = state.systems.neuro.trendData;
    if (td && td.length > 0) {
      td[td.length - 1].observed = mean;
    }

    updateOverallGauge();
    if (state.selectedSystem === 'neuro') {
      selectSystem('neuro');
    }

    showToast(`PVT Test Completed: Mean latency ${mean} ms (${neuroStatus === 'in-range' ? 'Nominal' : 'Watch'}).`, 'success');
  }

  if (pvtStartBtn) {
    pvtStartBtn.addEventListener('click', () => {
      pvtState.active = true;
      pvtState.trial = 0;
      pvtState.results = [];
      pvtState.lapses = 0;
      pvtStartBtn.disabled = true;
      if (pvtResultsPanel) pvtResultsPanel.style.display = 'none';
      startNextPvtTrial();
    });
  }

  if (pvtBox) {
    pvtBox.addEventListener('click', handlePvtClick);
    pvtBox.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handlePvtClick();
      }
    });
  }

  // Backdrop click closes modal
  [measurementBackdrop, systemDrawerBackdrop, surgeonLedgerBackdrop, evidenceBackdrop, guidanceBackdrop, glossaryBackdrop, pvtBackdrop].forEach(backdrop => {
    if (!backdrop) return;
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
        stopBreathingGuide();
      }
    });
  });

  // Keyboard accessibility: ESC key to close, focus trapping, and D for theme WITHOUT modifier hijack (Requirement 7)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [measurementBackdrop, systemDrawerBackdrop, surgeonLedgerBackdrop, evidenceBackdrop, guidanceBackdrop, glossaryBackdrop, pvtBackdrop].forEach(b => {
        if (b && b.classList.contains('open')) closeModal(b);
      });
      const popover = document.getElementById('readiness-popover');
      if (popover && popover.style.display !== 'none') {
        popover.style.display = 'none';
        const trigger = document.getElementById('readiness-popover-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
      stopBreathingGuide();
    } else if (e.key === 'Tab') {
      const openBackdrop = document.querySelector('.drawer-backdrop.open');
      if (openBackdrop) {
        const focusables = Array.from(openBackdrop.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter(el => el.offsetParent !== null);
        if (focusables.length > 0) {
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    } else if ((e.key === 'd' || e.key === 'D') && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const targetTag = (e.target && e.target.tagName) || '';
      const activeTag = (document.activeElement && document.activeElement.tagName) || '';
      if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(targetTag) &&
          !['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag) &&
          !document.activeElement.isContentEditable &&
          !(e.target && e.target.isContentEditable)) {
        applyTheme(state.theme === 'dark' ? 'light' : 'dark', true);
      }
    }
  });

  // ================= MISSION TIME & COUNTDOWN =================
  const cabinTimeDisplay = document.getElementById('cabin-time-display');
  const countdownDisplay = document.getElementById('due-countdown');

  function updateTimes() {
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
    const utcSeconds = String(now.getUTCSeconds()).padStart(2, '0');
    const curDay = state && state.demoDay ? state.demoDay : 14;
    if (cabinTimeDisplay) cabinTimeDisplay.textContent = `${utcHours}:${utcMinutes}:${utcSeconds} UTC • MET Day ${curDay}`;

    if (state.countdownSeconds > 0) {
      state.countdownSeconds--;
      const mins = Math.floor(state.countdownSeconds / 60);
      const secs = state.countdownSeconds % 60;
      const countStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      if (countdownDisplay) countdownDisplay.textContent = countStr;
      const kpiCount = document.getElementById('kpi-countdown-val');
      if (kpiCount) kpiCount.textContent = countStr;
    } else {
      if (countdownDisplay) countdownDisplay.textContent = 'DUE NOW';
      const kpiCount = document.getElementById('kpi-countdown-val');
      if (kpiCount) kpiCount.textContent = 'DUE NOW';
    }
  }
  setInterval(updateTimes, 1000);
  updateTimes();

  function updateServiceWorkerStatus() {
    const syncText = document.getElementById('sync-status-text');
    if (!syncText) return;
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      syncText.textContent = 'Field Cache Active';
    } else {
      syncText.textContent = 'Offline Cache Ready';
    }
  }


  // ================= TAB NAVIGATION & ARIA CONTROLS (ITEM 3) =================
  const tabButtons = Array.from(document.querySelectorAll('.workspace-tab-btn'));
  const tabViews = Array.from(document.querySelectorAll('.tab-view'));

  function switchTab(targetHash) {
    if (!targetHash) targetHash = '#overview';
    if (!targetHash.startsWith('#')) targetHash = '#' + targetHash;

    let activeBtn = tabButtons.find(btn => btn.dataset.hash === targetHash);
    if (!activeBtn) {
      activeBtn = document.getElementById('tab-btn-overview') || tabButtons[0];
      if (activeBtn) targetHash = activeBtn.dataset.hash;
    }

    if (!activeBtn) return;

    tabButtons.forEach(btn => {
      const isSelected = btn === activeBtn;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      btn.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    const targetViewId = activeBtn.getAttribute('aria-controls');
    tabViews.forEach(view => {
      const isTarget = view.id === targetViewId;
      view.classList.toggle('active', isTarget);
      if (isTarget) {
        view.removeAttribute('hidden');
      } else {
        view.setAttribute('hidden', '');
      }
    });

    // Sync URL hash
    if (window.location.hash !== targetHash) {
      try {
        history.replaceState(null, '', targetHash);
      } catch (e) {
        window.location.hash = targetHash;
      }
    }

    // If SANS view is opened, re-render chart to ensure proper SVG painting
    if (targetHash === '#sans') {
      const sys = state.systems[state.selectedSystem || 'ocular'];
      if (sys) {
        renderTrendChart(sys.trendData, sys.status, sys.yUnit, sys.baselineMin, sys.baselineMax, sys.primaryIndicator);
      }
    }
  }
  window.switchTab = switchTab;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.hash);
    });
  });

  // WAI-ARIA Tablist Keyboard Navigation (Left/Right/Home/End)
  const tabList = document.querySelector('.workspace-tabs-bar[role="tablist"]');
  if (tabList) {
    tabList.addEventListener('keydown', (e) => {
      const focusedIndex = tabButtons.indexOf(document.activeElement);
      if (focusedIndex === -1) return;

      let nextIndex = focusedIndex;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (focusedIndex + 1) % tabButtons.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = (focusedIndex - 1 + tabButtons.length) % tabButtons.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIndex = tabButtons.length - 1;
      }

      if (nextIndex !== focusedIndex) {
        tabButtons[nextIndex].focus();
        switchTab(tabButtons[nextIndex].dataset.hash);
      }
    });
  }

  window.addEventListener('hashchange', () => {
    if (window.location.hash) {
      switchTab(window.location.hash);
    }
  });

  const btnGotoSans = document.getElementById('btn-goto-sans');
  if (btnGotoSans) {
    btnGotoSans.addEventListener('click', () => {
      switchTab('#sans');
    });
  }

  // ================= MORE MENU DROPDOWN (ITEM 6) =================
  const headerMoreBtn = document.getElementById('header-more-btn');
  const headerMoreDropdown = document.getElementById('header-more-dropdown');

  if (headerMoreBtn && headerMoreDropdown) {
    headerMoreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = headerMoreDropdown.classList.contains('show');
      if (isExpanded) {
        headerMoreDropdown.classList.remove('show');
        headerMoreBtn.setAttribute('aria-expanded', 'false');
      } else {
        headerMoreDropdown.classList.add('show');
        headerMoreBtn.setAttribute('aria-expanded', 'true');
      }
    });

    document.addEventListener('click', (e) => {
      if (!headerMoreDropdown.contains(e.target) && e.target !== headerMoreBtn) {
        headerMoreDropdown.classList.remove('show');
        headerMoreBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && headerMoreDropdown.classList.contains('show')) {
        headerMoreDropdown.classList.remove('show');
        headerMoreBtn.setAttribute('aria-expanded', 'false');
        headerMoreBtn.focus();
      }
    });

    headerMoreDropdown.querySelectorAll('.more-menu-item').forEach(item => {
      item.addEventListener('click', () => {
        headerMoreDropdown.classList.remove('show');
        headerMoreBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ================= CHART RANGE TOGGLES (7d / 14d / 30d) (ITEM 2) =================
  const chartRangeBtns = document.querySelectorAll('.chart-range-btn');
  chartRangeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const range = parseInt(btn.dataset.range, 10);
      if (!range) return;
      state.chartRange = range;
      chartRangeBtns.forEach(b => b.classList.toggle('active', b === btn));
      const sys = state.systems[state.selectedSystem || 'ocular'];
      if (sys) {
        renderTrendChart(sys.trendData, sys.status, sys.yUnit, sys.baselineMin, sys.baselineMax, sys.primaryIndicator);
      }
    });
  });

  // Resilient Initialisation Wrapper (Part 1, Item 2)
  function safeInitPanel(panelName, fn, fallbackElementId = null) {
    try {
      fn();
    } catch (err) {
      console.warn(`[CDSS UI Recovery] Panel '${panelName}' failed to render:`, err);
      if (fallbackElementId) {
        const el = document.getElementById(fallbackElementId);
        if (el) {
          el.innerHTML = `<div class="panel-warning" role="alert" style="padding: 16px; font-size: 0.88rem; color: var(--color-ink-muted); background: var(--color-surface); border: 1px dashed var(--color-border); border-radius: var(--radius-md); text-align: center;">
            <strong>${panelName} Notice:</strong> Panel telemetry is operating in fallback mode.
          </div>`;
        }
      }
    }
  }

  // ================= RESILIENT INITIALIZATION =================
  safeInitPanel('Evidence Drawer', populateEvidenceDrawer);
  safeInitPanel('Tiered Guidance', populateTieredGuidance, 'all-tiered-guidance-cards');
  safeInitPanel('Clinical Log', renderClinicalLogTable, 'clinical-log-tbody');
  safeInitPanel('Overall Gauge', updateOverallGauge);
  safeInitPanel('System Selection', () => selectSystem('ocular'));
  safeInitPanel('Demo Synchronization', () => applyMissionDay(state.demoDay || 14));
  safeInitPanel('KPI Strip', updateKpis);

  // URL search parameter deep-linking (for tests, demos & automation)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('theme')) {
      applyTheme(urlParams.get('theme'), true);
    }
    if (urlParams.has('day')) {
      applyMissionDay(parseInt(urlParams.get('day'), 10));
    }
    if (urlParams.has('env')) {
      setEnvironment(urlParams.get('env'));
    }
    if (urlParams.has('tab')) {
      switchTab('#' + urlParams.get('tab'));
    }
  } catch (e) {
    console.warn('URL params parsing note:', e);
  }

  // Service Worker for real offline use (HTTPS or localhost only, relative scope)
  const isSecureOrLocal = window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if ('serviceWorker' in navigator && isSecureOrLocal) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js', { scope: './' })
        .then(reg => {
          console.log('Orbital Medical Journal SW active:', reg.scope);
          updateServiceWorkerStatus();
        })
        .catch(err => console.log('SW registration note:', err));
    });
    let hasRefreshed = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      updateServiceWorkerStatus();
      if (!hasRefreshed) {
        hasRefreshed = true;
        window.location.reload();
      }
    });
    updateServiceWorkerStatus();
  }
});
