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
  let savedTheme = storage.getItem('astro_theme');
  const hasStoredTheme = savedTheme !== null;
  if (!hasStoredTheme) {
    savedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  const state = {
    theme: savedTheme,
    overallReadiness: 87,
    selectedSystem: 'ocular',
    missionDay: 142,
    systems: {
      ocular: {
        id: 'ocular',
        name: 'Ocular & SANS Monitoring',
        subtitle: 'Spaceflight-Associated Neuro-ocular Syndrome',
        status: 'attention',
        yUnit: 'µm',
        baselineMin: 270,
        baselineMax: 300,
        metric1Label: 'Peripapillary retinal thickness (simulated)',
        metric1Val: '312 µm',
        metric1Sub: '+14 µm baseline shift [Simulated]',
        metric2Label: 'Visual Acuity (LogMAR)',
        metric2Val: '0.08',
        metric2Sub: 'In nominal range [Simulated]',
        whyMeasurement: 'Microgravity shifts ~2L of fluid toward the head, increasing pressure behind the eyes. Daily optical tracking detects early optic nerve swelling before it causes permanent visual changes.',
        mechanism: 'Spaceflight-Associated Neuro-ocular Syndrome (SANS) results from loss of hydrostatic pressure gradient in microgravity, generating a persistent ~1.5–2.0 L cephalad fluid shift. Intraocular venous engorgement increases optic nerve sheath diameter (ONSD) and optic disc thickness.',
        trendData: [
          { day: 'MET-6', baseline: 298, observed: 298 },
          { day: 'MET-5', baseline: 298, observed: 301 },
          { day: 'MET-4', baseline: 298, observed: 304 },
          { day: 'MET-3', baseline: 298, observed: 308 },
          { day: 'MET-2', baseline: 298, observed: 310 },
          { day: 'MET-1', baseline: 298, observed: 311 },
          { day: 'Today', baseline: 298, observed: 312 },
        ]
      },
      cardio: {
        id: 'cardio',
        name: 'Cardiovascular & Hemodynamics',
        subtitle: 'Arterial Baroreflex & Central Venous Equilibrium',
        status: 'in-range',
        yUnit: 'mmHg',
        baselineMin: 95,
        baselineMax: 130,
        metric1Label: 'Resting Blood Pressure',
        metric1Val: '118 / 76 mmHg',
        metric1Sub: 'MAP: 90 mmHg (Nominal) [Simulated]',
        metric2Label: 'Resting Heart Rate',
        metric2Val: '62 bpm',
        metric2Sub: 'Sinus rhythm [Simulated]',
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
        yUnit: 'Gain',
        baselineMin: 0.95,
        baselineMax: 1.05,
        metric1Label: 'Vestibular Ocular Reflex (VOR)',
        metric1Val: '0.98 Gain',
        metric1Sub: 'Norm: 1.00 ± 0.05 [Simulated]',
        metric2Label: 'Saccadic Latency',
        metric2Val: '194 ms',
        metric2Sub: 'Nominal rapid tracking [Simulated]',
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
        yUnit: 'cm',
        baselineMin: 1.5,
        baselineMax: 4.5,
        metric1Label: 'Axial Spine Elongation',
        metric1Val: '+3.1 cm',
        metric1Sub: 'Typical microgravity expansion [Simulated]',
        metric2Label: 'Back Discomfort Score',
        metric2Val: '0 / 10',
        metric2Sub: 'Zero lumbar strain reported [Simulated]',
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
        yUnit: 'mmHg',
        baselineMin: 1.5,
        baselineMax: 3.0,
        metric1Label: 'Pulse Oximetry (SpO2)',
        metric1Val: '99%',
        metric1Sub: 'Nominal oxygenation [Simulated]',
        metric2Label: 'Cabin Ambient pCO2',
        metric2Val: '2.4 mmHg',
        metric2Sub: 'Strict threshold < 3.0 mmHg [Simulated]',
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
        yUnit: 'cm',
        baselineMin: 36.5,
        baselineMax: 38.5,
        metric1Label: 'Calf Circumference',
        metric1Val: '37.8 cm',
        metric1Sub: '-0.4 cm change from pre-flight [Simulated]',
        metric2Label: 'Isometric Peak Force',
        metric2Val: '96% Ref',
        metric2Sub: 'ARED countermeasure target [Simulated]',
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
      }
    },
    measurementVitals: {
      sysBP: 118,
      diaBP: 76,
      hr: 62,
      spo2: 99
    },
    countdownSeconds: 38 * 60 + 14
  };

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

  // ================= DYNAMIC SVG TREND CHART GENERATOR (REQUIREMENT 2 & PHASE 2) =================
  function renderTrendChart(trendData, systemStatus, yUnit, baselineMin, baselineMax) {
    const wrapper = document.getElementById('dynamic-chart-wrapper');
    if (!wrapper) return;

    if (!trendData || trendData.length === 0) {
      wrapper.innerHTML = `<div class="text-muted" style="padding: 24px; text-align: center;">No longitudinal telemetry available.</div>`;
      return;
    }

    // Chart Dimensions (12px minimum labels per Phase 2)
    const svgWidth = 360;
    const svgHeight = 160;
    const padLeft = 52;
    const padRight = 16;
    const padTop = 22;
    const padBottom = 32;
    const plotWidth = svgWidth - padLeft - padRight;
    const plotHeight = svgHeight - padTop - padBottom;

    // Determine value range across observed, baseline, and nominal band
    const allVals = [];
    trendData.forEach(d => {
      allVals.push(d.observed);
      if (typeof d.baseline === 'number') allVals.push(d.baseline);
    });
    if (typeof baselineMin === 'number') allVals.push(baselineMin);
    if (typeof baselineMax === 'number') allVals.push(baselineMax);

    const dataMin = Math.min(...allVals);
    const dataMax = Math.max(...allVals);
    const margin = (dataMax - dataMin) * 0.18 || (dataMax * 0.1) || 1;
    const minVal = dataMin - margin;
    const maxVal = dataMax + margin;
    const valRange = maxVal - minVal || 1;

    function scaleX(index) {
      return padLeft + index * (plotWidth / (trendData.length - 1));
    }
    function scaleY(val) {
      const norm = (val - minVal) / valRange;
      return padTop + plotHeight * (1 - norm);
    }

    function formatTick(val) {
      if (Math.abs(val) >= 10) return Math.round(val).toString();
      if (Math.abs(val) >= 1) return val.toFixed(1);
      return val.toFixed(2);
    }

    // Baseline nominal band coordinates
    let bandSvg = '';
    let limitLineSvg = '';
    if (typeof baselineMin === 'number' && typeof baselineMax === 'number') {
      const yTop = Math.max(padTop, scaleY(baselineMax));
      const yBottom = Math.min(padTop + plotHeight, scaleY(baselineMin));
      const bandHeight = Math.max(2, yBottom - yTop);
      bandSvg = `<rect x="${padLeft}" y="${yTop}" width="${plotWidth}" height="${bandHeight}" fill="var(--color-emerald-tint-soft)" opacity="0.8" />
                 <line x1="${padLeft}" y1="${yTop}" x2="${padLeft + plotWidth}" y2="${yTop}" stroke="var(--color-emerald-border)" stroke-dasharray="3 3" stroke-width="1" />
                 <line x1="${padLeft}" y1="${yBottom}" x2="${padLeft + plotWidth}" y2="${yBottom}" stroke="var(--color-emerald-border)" stroke-dasharray="3 3" stroke-width="1" />`;

      limitLineSvg = `
        <line x1="${padLeft}" y1="${yTop}" x2="${padLeft + plotWidth}" y2="${yTop}" stroke="var(--color-ochre-text)" stroke-dasharray="4 2" stroke-width="1.5" />
        <text x="${padLeft + plotWidth}" y="${Math.max(14, yTop - 5)}" fill="var(--color-ochre-text)" font-size="12" font-weight="600" text-anchor="end">Nominal Limit: ${baselineMax} ${yUnit}</text>
      `;
    }

    // Clean Round Grid Lines & 12px Y Axis labels (Requirement 3: no unrounded 315.2 ticks)
    const midVal = (maxVal + minVal) / 2;
    const yTick1 = maxVal - margin * 0.4;
    const yTick2 = midVal;
    const yTick3 = minVal + margin * 0.4;

    const gridY1 = scaleY(yTick1);
    const gridY2 = scaleY(yTick2);
    const gridY3 = scaleY(yTick3);

    const gridSvg = `
      <line x1="${padLeft}" y1="${gridY1}" x2="${padLeft + plotWidth}" y2="${gridY1}" stroke="var(--color-border)" stroke-width="1" />
      <line x1="${padLeft}" y1="${gridY2}" x2="${padLeft + plotWidth}" y2="${gridY2}" stroke="var(--color-border)" stroke-width="1" />
      <line x1="${padLeft}" y1="${gridY3}" x2="${padLeft + plotWidth}" y2="${gridY3}" stroke="var(--color-border)" stroke-width="1" />
      <text x="${padLeft - 8}" y="${gridY1 + 4}" fill="var(--color-ink-muted)" font-size="12" text-anchor="end" class="num-tabular">${formatTick(yTick1)}</text>
      <text x="${padLeft - 8}" y="${gridY2 + 4}" fill="var(--color-ink-muted)" font-size="12" text-anchor="end" class="num-tabular">${formatTick(yTick2)}</text>
      <text x="${padLeft - 8}" y="${gridY3 + 4}" fill="var(--color-ink-muted)" font-size="12" text-anchor="end" class="num-tabular">${formatTick(yTick3)}</text>
    `;

    // Baseline Line: Solid Emerald Line per Requirement 3
    const baselinePoints = trendData.map((d, i) => `${scaleX(i)},${scaleY(d.baseline)}`);
    const baselinePath = `M ${baselinePoints.join(' L ')}`;

    // Observed Line
    const observedPoints = trendData.map((d, i) => `${scaleX(i)},${scaleY(d.observed)}`);
    const observedPath = `M ${observedPoints.join(' L ')}`;

    let observedPathClass = 'chart-path-in-range';
    let markerHtml = '';

    if (systemStatus === 'attention') {
      observedPathClass = 'chart-path-attention';
      markerHtml = trendData.map((d, i) => {
        const cx = scaleX(i);
        const cy = scaleY(d.observed);
        return `<g tabindex="0" role="img" aria-label="${d.day}: ${d.observed} ${yUnit}">
                  <polygon points="${cx},${cy - 5} ${cx + 5},${cy} ${cx},${cy + 5} ${cx - 5},${cy}" class="chart-marker-diamond">
                    <title>${d.day}: ${d.observed} ${yUnit}</title>
                  </polygon>
                </g>`;
      }).join('');
    } else if (systemStatus === 'flight-surgeon' || systemStatus === 'emergency') {
      observedPathClass = 'chart-path-alert';
      markerHtml = trendData.map((d, i) => {
        const cx = scaleX(i);
        const cy = scaleY(d.observed);
        return `<g tabindex="0" role="img" aria-label="${d.day}: ${d.observed} ${yUnit}">
                  <polygon points="${cx},${cy - 6} ${cx + 5},${cy + 4} ${cx - 5},${cy + 4}" class="chart-marker-triangle">
                    <title>${d.day}: ${d.observed} ${yUnit}</title>
                  </polygon>
                </g>`;
      }).join('');
    } else {
      observedPathClass = 'chart-path-in-range';
      markerHtml = trendData.map((d, i) => {
        const cx = scaleX(i);
        const cy = scaleY(d.observed);
        return `<g tabindex="0" role="img" aria-label="${d.day}: ${d.observed} ${yUnit}">
                  <circle cx="${cx}" cy="${cy}" r="4" class="chart-marker-circle">
                    <title>${d.day}: ${d.observed} ${yUnit}</title>
                  </circle>
                </g>`;
      }).join('');
    }

    // X-Axis day labels (12px)
    const xLabelsSvg = trendData.map((d, i) => {
      const cx = scaleX(i);
      return `<text x="${cx}" y="${svgHeight - 10}" fill="var(--color-ink-muted)" font-size="12" text-anchor="middle">${d.day}</text>`;
    }).join('');

    const latestPoint = trendData[trendData.length - 1];
    const sysName = state.systems[state.selectedSystem] ? state.systems[state.selectedSystem].name : 'System';

    wrapper.innerHTML = `
      <svg class="trend-svg" viewBox="0 0 ${svgWidth} ${svgHeight}" role="img" aria-label="7-day telemetry trend graph for ${sysName}">
        ${bandSvg}
        ${gridSvg}
        ${limitLineSvg}
        <!-- Solid Emerald Baseline curve (Requirement 3) -->
        <path d="${baselinePath}" fill="none" stroke="var(--color-emerald)" stroke-width="2" />
        <!-- Observed curve with animated stroke -->
        <path d="${observedPath}" class="${observedPathClass}" />
        <!-- Data Markers with Accessible Tooltips -->
        ${markerHtml}
        <!-- X Axis labels -->
        ${xLabelsSvg}
      </svg>
      <div class="chart-legend">
        <div class="chart-legend-item">
          <span style="display:inline-block; width:14px; height:2.5px; background:var(--color-emerald);"></span>
          <span>Solid Baseline (${yUnit})</span>
        </div>
        <div class="chart-legend-item">
          <span style="display:inline-block; width:14px; height:2.5px; background:${systemStatus === 'attention' ? 'var(--color-ochre-text)' : systemStatus === 'in-range' ? 'var(--color-emerald)' : 'var(--color-vermillion)'};"></span>
          <span>Observed (${systemStatus === 'attention' ? 'Dashed ◆' : systemStatus === 'in-range' ? 'Solid •' : 'Dotted ▲'})</span>
        </div>
        <div class="chart-legend-item">
          <span class="simulated-tag">[Simulated]</span>
        </div>
      </div>
      <!-- Screen reader summary (Requirement 3) -->
      <p class="sr-only" aria-live="polite">Longitudinal telemetry trend for ${sysName}: Baseline is ${baselineMin} to ${baselineMax} ${yUnit}. Current reading is ${latestPoint.observed} ${yUnit} recorded on ${latestPoint.day}. Diagnostic status: ${STATUS_CONFIG[systemStatus].label}.</p>
    `;
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
    if (inspectMetric1Sub) inspectMetric1Sub.textContent = sys.metric1Sub;
    if (inspectMetric2Label) inspectMetric2Label.textContent = sys.metric2Label;
    if (inspectMetric2Sub) inspectMetric2Sub.textContent = sys.metric2Sub;
    if (chartBaselineInfo) chartBaselineInfo.textContent = `Nominal band: ${sys.baselineMin}–${sys.baselineMax} ${sys.yUnit} [Simulated]`;

    // 2. Update Inspection Badge in-place via setBadge
    setBadge(inspectBadge, sys.status);

    // 3. Update Flag in Card Header
    setBadge('#current-overall-flag', sys.status, `${sys.name.split(' ')[0]}: ${STATUS_CONFIG[sys.status].label}`);

    // 4. Update Active Legend Chip
    legendChips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.target === systemId);
    });

    // 5. Update Dynamic SVG Chart
    renderTrendChart(sys.trendData, sys.status, sys.yUnit, sys.baselineMin, sys.baselineMax);

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

    // 8. Update Tiered Guidance Preview for this status
    updateActiveGuidancePreview(sys.status);

    // 9. Update Body Map active hover tag
    updateHoverLabel(systemId);
  }

  const bodyMapActiveLabel = document.getElementById('body-map-active-label');
  function updateHoverLabel(sysId) {
    if (!bodyMapActiveLabel) return;
    const sys = state.systems[sysId];
    if (sys) {
      bodyMapActiveLabel.textContent = `${sys.name} (${STATUS_CONFIG[sys.status].label})`;
      bodyMapActiveLabel.style.borderColor = sys.status === 'attention' ? 'var(--color-ochre)' : sys.status === 'in-range' ? 'var(--color-emerald)' : 'var(--color-vermillion)';
    }
  }

  // SVG Region Click, Hover & Keydown listeners (Requirement 4)
  bodyRegions.forEach(region => {
    const sysId = region.dataset.system;
    region.addEventListener('click', () => {
      selectSystem(sysId);
      updateHoverLabel(sysId);
    });
    region.addEventListener('mouseenter', () => updateHoverLabel(sysId));
    region.addEventListener('focus', () => updateHoverLabel(sysId));
    region.addEventListener('mouseleave', () => updateHoverLabel(state.selectedSystem));
    region.addEventListener('blur', () => updateHoverLabel(state.selectedSystem));
    region.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectSystem(sysId);
      }
    });
  });

  // Legend Chips click
  legendChips.forEach(chip => {
    chip.addEventListener('click', () => {
      selectSystem(chip.dataset.target);
    });
    chip.addEventListener('mouseenter', () => updateHoverLabel(chip.dataset.target));
    chip.addEventListener('mouseleave', () => updateHoverLabel(state.selectedSystem));
  });

  // ================= READINESS SCORE ENGINE & RING GAUGE (REQUIREMENT 3 & 7) =================
  const readinessScoreText = document.getElementById('readiness-score-text');
  const ringProgressIndicator = document.getElementById('ring-progress-indicator');
  const crewReadinessBadge = document.getElementById('crew-readiness-badge');
  const overallStatusSummary = document.getElementById('overall-status-summary');

  function calculateOverallReadiness() {
    const weights = {
      'in-range': 100,
      'attention': 75,
      'flight-surgeon': 45,
      'emergency': 15
    };
    const systems = Object.values(state.systems);
    const total = systems.reduce((acc, sys) => acc + (weights[sys.status] || 100), 0);
    return Math.round(total / systems.length);
  }

  function updateOverallGauge() {
    state.overallReadiness = calculateOverallReadiness();
    readinessScoreText.textContent = `${state.overallReadiness}%`;

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
      activeFlagEl.textContent = `${statusLabel}`;
      activeFlagEl.style.color = overallStatus === 'attention' ? 'var(--color-ochre-text)' : overallStatus === 'in-range' ? 'var(--color-emerald)' : 'var(--color-vermillion-text)';
    }
    document.getElementById('summary-readiness').textContent = `${state.overallReadiness}%`;

    // Keep SVG body map visual classes & aria-labels synchronized (Requirement 9)
    updateBodyMapVisuals();
  }

  function updateBodyMapVisuals() {
    Object.values(state.systems).forEach(sys => {
      const el = document.getElementById(`sys-${sys.id}`);
      if (el) {
        el.className.baseVal = `body-system-region system--${sys.status}`;
        el.setAttribute('aria-label', `${sys.name}. Status: ${STATUS_CONFIG[sys.status].label}.`);
        const pulse = el.querySelector('.pulse-ring-marker');
        if (pulse) {
          if (sys.status === 'emergency' || sys.status === 'flight-surgeon') {
            pulse.setAttribute('stroke', 'var(--color-vermillion)');
          } else if (sys.status === 'attention') {
            pulse.setAttribute('stroke', 'var(--color-ochre)');
          } else {
            pulse.setAttribute('stroke', 'var(--color-emerald)');
          }
        }
      }
    });
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
    // 1. Emergency Criteria
    if (sysBP >= 170 || sysBP <= 85 || diaBP >= 110 || diaBP <= 45 || spo2 < 90 || hr >= 135 || hr <= 40) {
      return {
        status: 'emergency',
        label: 'Emergency',
        reason: 'Critical hemodynamic or oxygenation anomaly outside acute flight tolerance envelope.'
      };
    }
    // 2. Flight Surgeon Consultation Criteria
    if (sysBP >= 145 || sysBP < 95 || diaBP >= 95 || diaBP < 60 || spo2 <= 93 || hr >= 110 || hr <= 48) {
      return {
        status: 'flight-surgeon',
        label: 'Contact flight surgeon',
        reason: 'Significant cardiovascular deviation from in-flight adaptation norms.'
      };
    }
    // 3. Attention / Watch Criteria
    if (sysBP >= 131 || sysBP < 100 || diaBP >= 86 || diaBP < 65 || spo2 <= 95 || hr >= 91 || hr <= 54) {
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
    // Initial simulated seed data if empty
    return [
      {
        timestamp: 'Day 142, 06:40 UTC',
        sysBP: 116,
        diaBP: 74,
        hr: 58,
        spo2: 99,
        status: 'in-range',
        note: 'Post-sleep baseline resting vitals nominal.'
      },
      {
        timestamp: 'Day 141, 18:20 UTC',
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
    const logs = getPersistedLogs();
    tbody.innerHTML = '';
    if (!logs || logs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 24px; color: var(--color-ink-muted);">No entries yet. Complete a measurement to log one.</td></tr>`;
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
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <h4 style="font-size: 1rem; color: var(--color-ink);">${tier.level}</h4>
          <span class="simulated-tag">${tier.tag}</span>
        </div>
        <p class="text-muted" style="font-size: 0.88rem; margin-bottom: 10px;">${tier.summary}</p>
        <ul class="guidance-actions-list">
          ${tier.actions.map(act => `<li>${act}</li>`).join('')}
        </ul>
        <div class="text-faint" style="margin-top: 10px; border-top: 1px solid var(--color-border); padding-top: 8px;">
          <strong>Evidence Source:</strong> ${tier.source}
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
    preview.innerHTML = `
      <div class="guidance-tier-card tier--${tier.statusKey}" style="margin-bottom: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <h4 style="font-size: 0.95rem;">${tier.level}</h4>
          <span class="simulated-tag">${tier.tag}</span>
        </div>
        <p class="text-muted" style="font-size: 0.86rem; margin-bottom: 8px;">${tier.summary}</p>
        <ul class="guidance-actions-list" style="font-size: 0.85rem;">
          ${tier.actions.slice(0, 3).map(a => `<li>${a}</li>`).join('')}
        </ul>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; pt-2; border-top: 1px solid var(--color-border);">
          <span class="text-faint">Ref: ${tier.source}</span>
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

  // Backdrop click closes modal
  [measurementBackdrop, systemDrawerBackdrop, surgeonLedgerBackdrop, evidenceBackdrop, guidanceBackdrop, glossaryBackdrop].forEach(backdrop => {
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
      [measurementBackdrop, systemDrawerBackdrop, surgeonLedgerBackdrop, evidenceBackdrop, guidanceBackdrop, glossaryBackdrop].forEach(b => {
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
    if (cabinTimeDisplay) cabinTimeDisplay.textContent = `${utcHours}:${utcMinutes}:${utcSeconds} UTC`;

    if (state.countdownSeconds > 0) {
      state.countdownSeconds--;
      const mins = Math.floor(state.countdownSeconds / 60);
      const secs = state.countdownSeconds % 60;
      if (countdownDisplay) countdownDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    } else if (countdownDisplay) {
      countdownDisplay.textContent = 'DUE NOW';
    }
  }
  setInterval(updateTimes, 1000);
  updateTimes();

  // ================= INITIALIZATION =================
  populateEvidenceDrawer();
  populateTieredGuidance();
  renderClinicalLogTable();
  updateOverallGauge();
  selectSystem('ocular');

  // Service Worker for real offline use (HTTPS or localhost only, relative scope)
  const isSecureOrLocal = window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if ('serviceWorker' in navigator && isSecureOrLocal) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js', { scope: './' })
        .then(reg => console.log('Orbital Medical Journal SW active:', reg.scope))
        .catch(err => console.log('SW registration note:', err));
    });
  }
});
