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

  // ================= STATE MANAGEMENT =================
  let savedTheme = 'light';
  try {
    savedTheme = localStorage.getItem('astro_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (e) {
    savedTheme = 'light';
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
        metric1Label: 'Optic Disc RNFL Thickness',
        metric1Val: '312 µm',
        metric1Sub: '+14 µm baseline shift [Simulated]',
        metric2Label: 'Visual Acuity (LogMAR)',
        metric2Val: '0.08',
        metric2Sub: 'In nominal range [Simulated]',
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

  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('astro_theme', theme);
    } catch (e) {
      // Ignore in private storage
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
  applyTheme(state.theme);

  themeToggleBtn.addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  });

  // ================= DYNAMIC SVG TREND CHART GENERATOR (REQUIREMENT 2) =================
  function renderTrendChart(trendData, systemStatus, yUnit, baselineMin, baselineMax) {
    const wrapper = document.getElementById('dynamic-chart-wrapper');
    if (!wrapper) return;

    if (!trendData || trendData.length === 0) {
      wrapper.innerHTML = `<div class="text-muted" style="padding: 24px; text-align: center;">No longitudinal telemetry available.</div>`;
      return;
    }

    // Chart Dimensions
    const svgWidth = 340;
    const svgHeight = 140;
    const padLeft = 44;
    const padRight = 16;
    const padTop = 18;
    const padBottom = 28;
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
    const margin = (dataMax - dataMin) * 0.15 || (dataMax * 0.1) || 1;
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

    // Baseline nominal band coordinates
    let bandSvg = '';
    if (typeof baselineMin === 'number' && typeof baselineMax === 'number') {
      const yTop = Math.max(padTop, scaleY(baselineMax));
      const yBottom = Math.min(padTop + plotHeight, scaleY(baselineMin));
      const bandHeight = Math.max(2, yBottom - yTop);
      bandSvg = `<rect x="${padLeft}" y="${yTop}" width="${plotWidth}" height="${bandHeight}" fill="var(--color-emerald-tint-soft)" opacity="0.75" />
                 <line x1="${padLeft}" y1="${yTop}" x2="${padLeft + plotWidth}" y2="${yTop}" stroke="var(--color-emerald-border)" stroke-dasharray="3 3" stroke-width="1" />
                 <line x1="${padLeft}" y1="${yBottom}" x2="${padLeft + plotWidth}" y2="${yBottom}" stroke="var(--color-emerald-border)" stroke-dasharray="3 3" stroke-width="1" />`;
    }

    // Grid lines & Y Axis labels
    const midVal = (maxVal + minVal) / 2;
    const gridY1 = scaleY(maxVal - margin * 0.5);
    const gridY2 = scaleY(midVal);
    const gridY3 = scaleY(minVal + margin * 0.5);

    const gridSvg = `
      <line x1="${padLeft}" y1="${gridY1}" x2="${padLeft + plotWidth}" y2="${gridY1}" stroke="var(--color-border)" stroke-width="1" />
      <line x1="${padLeft}" y1="${gridY2}" x2="${padLeft + plotWidth}" y2="${gridY2}" stroke="var(--color-border)" stroke-width="1" />
      <line x1="${padLeft}" y1="${gridY3}" x2="${padLeft + plotWidth}" y2="${gridY3}" stroke="var(--color-border)" stroke-width="1" />
      <text x="${padLeft - 6}" y="${gridY1 + 3}" fill="var(--color-ink-muted)" font-size="9" text-anchor="end" class="num-tabular">${(maxVal - margin * 0.5).toFixed(1)}</text>
      <text x="${padLeft - 6}" y="${gridY2 + 3}" fill="var(--color-ink-muted)" font-size="9" text-anchor="end" class="num-tabular">${midVal.toFixed(1)}</text>
      <text x="${padLeft - 6}" y="${gridY3 + 3}" fill="var(--color-ink-muted)" font-size="9" text-anchor="end" class="num-tabular">${(minVal + margin * 0.5).toFixed(1)}</text>
    `;

    // Baseline Line
    const baselinePoints = trendData.map((d, i) => `${scaleX(i)},${scaleY(d.baseline)}`);
    const baselinePath = `M ${baselinePoints.join(' L ')}`;

    // Observed Line
    const observedPoints = trendData.map((d, i) => `${scaleX(i)},${scaleY(d.observed)}`);
    const observedPath = `M ${observedPoints.join(' L ')}`;

    // Observed line class and markers depending on status
    let observedPathClass = 'chart-path-in-range';
    let markerHtml = '';

    if (systemStatus === 'attention') {
      observedPathClass = 'chart-path-attention';
      markerHtml = trendData.map((d, i) => {
        const cx = scaleX(i);
        const cy = scaleY(d.observed);
        return `<polygon points="${cx},${cy - 4} ${cx + 4},${cy} ${cx},${cy + 4} ${cx - 4},${cy}" class="chart-marker-diamond"><title>${d.day}: ${d.observed} ${yUnit}</title></polygon>`;
      }).join('');
    } else if (systemStatus === 'flight-surgeon' || systemStatus === 'emergency') {
      observedPathClass = 'chart-path-alert';
      markerHtml = trendData.map((d, i) => {
        const cx = scaleX(i);
        const cy = scaleY(d.observed);
        return `<polygon points="${cx},${cy - 5} ${cx + 4},${cy + 3} ${cx - 4},${cy + 3}" class="chart-marker-triangle"><title>${d.day}: ${d.observed} ${yUnit}</title></polygon>`;
      }).join('');
    } else {
      observedPathClass = 'chart-path-in-range';
      markerHtml = trendData.map((d, i) => {
        const cx = scaleX(i);
        const cy = scaleY(d.observed);
        return `<circle cx="${cx}" cy="${cy}" r="3.5" class="chart-marker-circle"><title>${d.day}: ${d.observed} ${yUnit}</title></circle>`;
      }).join('');
    }

    // X-Axis day labels
    const xLabelsSvg = trendData.map((d, i) => {
      const cx = scaleX(i);
      return `<text x="${cx}" y="${svgHeight - 10}" fill="var(--color-ink-muted)" font-size="9" text-anchor="middle">${d.day}</text>`;
    }).join('');

    wrapper.innerHTML = `
      <svg class="trend-svg" viewBox="0 0 ${svgWidth} ${svgHeight}" role="img" aria-label="7-day telemetry trend graph">
        ${bandSvg}
        ${gridSvg}
        <!-- Baseline curve -->
        <path d="${baselinePath}" fill="none" stroke="var(--color-border-strong)" stroke-width="1.5" stroke-dasharray="2 3" />
        <!-- Observed curve with animated stroke -->
        <path d="${observedPath}" class="${observedPathClass}" />
        <!-- Data Markers -->
        ${markerHtml}
        <!-- X Axis labels -->
        ${xLabelsSvg}
      </svg>
      <div class="chart-legend">
        <div class="chart-legend-item">
          <span style="display:inline-block; width:12px; height:2px; background:var(--color-border-strong); border-top:1px dashed var(--color-border-strong);"></span>
          <span>Baseline (${yUnit})</span>
        </div>
        <div class="chart-legend-item">
          <span style="display:inline-block; width:12px; height:3px; background:${systemStatus === 'attention' ? 'var(--color-ochre)' : systemStatus === 'in-range' ? 'var(--color-emerald)' : 'var(--color-vermillion)'};"></span>
          <span>Observed (${systemStatus === 'attention' ? 'Dashed ◆' : systemStatus === 'in-range' ? 'Solid •' : 'Dotted ▲'})</span>
        </div>
        <div class="chart-legend-item">
          <span class="simulated-tag">Simulated Telemetry</span>
        </div>
      </div>
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

    // 7. Update Tiered Guidance Preview for this status
    updateActiveGuidancePreview(sys.status);
  }

  // SVG Region Click & Keydown listeners
  bodyRegions.forEach(region => {
    const sysId = region.dataset.system;
    region.addEventListener('click', () => selectSystem(sysId));
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

    // Evaluate overall readiness category
    const anyEmergency = Object.values(state.systems).some(s => s.status === 'emergency');
    const anySurgeon = Object.values(state.systems).some(s => s.status === 'flight-surgeon');
    const anyAttention = Object.values(state.systems).some(s => s.status === 'attention');

    let overallStatus = 'in-range';
    let statusLabel = 'Within expected range';

    if (anyEmergency) {
      overallStatus = 'emergency';
      statusLabel = 'Emergency Protocol';
      ringProgressIndicator.style.stroke = 'var(--color-vermillion)';
      overallStatusSummary.textContent = 'Critical anomaly flagged. Immediate intra-cabin consultation and crew emergency procedures active.';
    } else if (anySurgeon) {
      overallStatus = 'flight-surgeon';
      statusLabel = 'Surgeon Consult Flagged';
      ringProgressIndicator.style.stroke = 'var(--color-vermillion)';
      overallStatusSummary.textContent = 'Clinical threshold exceeded. Priority telemedicine consult scheduled on next TDRS ground pass.';
    } else if (anyAttention) {
      overallStatus = 'attention';
      statusLabel = 'Watch Protocol';
      ringProgressIndicator.style.stroke = 'var(--color-ochre)';
      overallStatusSummary.textContent = 'Vitals stable across 5/6 core systems. Ocular SANS shows mild bilateral disc hyper-reflectivity under routine tracking.';
    } else {
      overallStatus = 'in-range';
      statusLabel = 'Within expected range';
      ringProgressIndicator.style.stroke = 'var(--color-emerald)';
      overallStatusSummary.textContent = 'All physiological telemetry within expected microgravity adaptation limits. Countermeasure schedule on track.';
    }

    // REQUIREMENT 4: Replaced 'Fit for Duty' with 'Within expected range'
    setBadge(crewReadinessBadge, overallStatus, statusLabel);
    const activeFlagEl = document.getElementById('summary-active-flag');
    if (activeFlagEl) {
      activeFlagEl.textContent = `${statusLabel}`;
      activeFlagEl.style.color = overallStatus === 'attention' ? 'var(--color-ochre-text)' : overallStatus === 'in-range' ? 'var(--color-emerald)' : 'var(--color-vermillion-text)';
    }
    document.getElementById('summary-readiness').textContent = `${state.overallReadiness}%`;
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
    try {
      const data = localStorage.getItem('astro_clinical_log');
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('LocalStorage unavailable:', e);
    }
    // Initial simulated seed data if empty
    return [
      {
        timestamp: '142-06:40 UTC',
        sysBP: 116,
        diaBP: 74,
        hr: 58,
        spo2: 99,
        status: 'in-range',
        note: 'Post-sleep baseline resting vitals nominal.'
      },
      {
        timestamp: '141-18:20 UTC',
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
    try {
      localStorage.setItem('astro_clinical_log', JSON.stringify(logs.slice(0, 30)));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
    renderClinicalLogTable();
  }

  function renderClinicalLogTable() {
    const tbody = document.getElementById('clinical-log-tbody');
    if (!tbody) return;
    const logs = getPersistedLogs();
    tbody.innerHTML = '';
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
        item.innerHTML = `
          <div style="font-weight: 600; color: var(--color-ink); font-size: 0.92rem;">${src.title}</div>
          <div class="text-faint" style="margin: 4px 0;">${src.institution} • ${src.year}</div>
          <p class="text-muted" style="font-size: 0.85rem;">${src.scope}</p>
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

  skipToRecordBtn.addEventListener('click', () => {
    stopBreathingGuide();
    stageBreathing.style.display = 'none';
    stageInput.style.display = 'block';
  });

  backToBreathingBtn.addEventListener('click', () => {
    stageInput.style.display = 'none';
    stageBreathing.style.display = 'flex';
    validationErrorBox.style.display = 'none';
    startBreathingGuide();
  });

  // Gloved Hand Stepper Controls for Vitals
  const bpSysVal = document.getElementById('bp-sys-val');
  const bpDiaVal = document.getElementById('bp-dia-val');
  const hrVal = document.getElementById('hr-val');
  const spo2Val = document.getElementById('spo2-val');

  document.getElementById('bp-sys-up').addEventListener('click', () => {
    state.measurementVitals.sysBP += 1;
    bpSysVal.textContent = state.measurementVitals.sysBP;
  });
  document.getElementById('bp-sys-down').addEventListener('click', () => {
    state.measurementVitals.sysBP = Math.max(50, state.measurementVitals.sysBP - 1);
    bpSysVal.textContent = state.measurementVitals.sysBP;
  });

  document.getElementById('bp-dia-up').addEventListener('click', () => {
    state.measurementVitals.diaBP += 1;
    bpDiaVal.textContent = state.measurementVitals.diaBP;
  });
  document.getElementById('bp-dia-down').addEventListener('click', () => {
    state.measurementVitals.diaBP = Math.max(30, state.measurementVitals.diaBP - 1);
    bpDiaVal.textContent = state.measurementVitals.diaBP;
  });

  document.getElementById('hr-up').addEventListener('click', () => {
    state.measurementVitals.hr += 1;
    hrVal.textContent = state.measurementVitals.hr;
  });
  document.getElementById('hr-down').addEventListener('click', () => {
    state.measurementVitals.hr = Math.max(30, state.measurementVitals.hr - 1);
    hrVal.textContent = state.measurementVitals.hr;
  });

  document.getElementById('spo2-up').addEventListener('click', () => {
    state.measurementVitals.spo2 = Math.min(100, state.measurementVitals.spo2 + 1);
    spo2Val.textContent = `${state.measurementVitals.spo2}%`;
  });
  document.getElementById('spo2-down').addEventListener('click', () => {
    state.measurementVitals.spo2 = Math.max(50, state.measurementVitals.spo2 - 1);
    spo2Val.textContent = `${state.measurementVitals.spo2}%`;
  });

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
    const utcTime = `${state.missionDay}-${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')} UTC`;
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

    showToast(`Vitals recorded & classified: "${classification.label}". Readiness: ${state.overallReadiness}%.`, classification.status === 'emergency' ? 'alert' : classification.status === 'attention' ? 'warning' : 'success');
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
      showToast('Observation successfully appended to simulated clinical telemetry log.', 'success');
      clinicalFieldNote.value = '';
      closeModal(systemDrawerBackdrop);
    }
  });

  // ================= EVIDENCE & GUIDANCE DRAWERS =================
  const evidenceBackdrop = document.getElementById('evidence-drawer-backdrop');
  const guidanceBackdrop = document.getElementById('guidance-drawer-backdrop');

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
    showToast('SIMULATED: Priority Telemetry Bundle bundled for simulated ground pass transmission.', 'success');
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
  [measurementBackdrop, systemDrawerBackdrop, surgeonLedgerBackdrop, evidenceBackdrop, guidanceBackdrop].forEach(backdrop => {
    if (!backdrop) return;
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
        stopBreathingGuide();
      }
    });
  });

  // Keyboard accessibility: ESC key to close, and D for theme WITHOUT Ctrl/Cmd/Alt hijack! (Requirement 6)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [measurementBackdrop, systemDrawerBackdrop, surgeonLedgerBackdrop, evidenceBackdrop, guidanceBackdrop].forEach(b => {
        if (b && b.classList.contains('open')) closeModal(b);
      });
      stopBreathingGuide();
    } else if ((e.key === 'd' || e.key === 'D') && !e.ctrlKey && !e.metaKey && !e.altKey) {
      if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        applyTheme(state.theme === 'dark' ? 'light' : 'dark');
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

  // Service Worker for real offline use (Requirement 7)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Orbital Medical Journal SW active:', reg.scope))
        .catch(err => console.log('SW registration note:', err));
    });
  }
});
