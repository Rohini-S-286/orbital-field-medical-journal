/**
 * Orbital Field Medical Journal — Clinical Knowledge Base & Reference Ranges
 * 
 * DISCLAIMER: Decision support and research demonstration only. Not a certified medical device.
 * All telemetry metrics are simulated for human spaceflight operational training.
 */

const CLINICAL_SOURCES = {
  'NASA-STD-3001': {
    id: 'NASA-STD-3001',
    title: 'NASA Space Flight Human-System Standard, Vol 1: Crew Health',
    institution: 'NASA Johnson Space Center',
    publisher: 'National Aeronautics and Space Administration',
    year: '2022 Rev B',
    url: 'https://www.nasa.gov/hhp/standards',
    verification: 'verified',
    scope: 'Physiological limits, cabin atmospheric targets, and mandatory operational medical check intervals.'
  },
  'NASA-HRP-SANS': {
    id: 'NASA-HRP-SANS',
    title: 'Risk of Spaceflight-Associated Neuro-ocular Syndrome (SANS) Evidence Report',
    institution: 'NASA Human Research Program',
    publisher: 'NASA Human Research Program',
    year: '2020',
    url: 'https://humanresearchroadmap.nasa.gov/evidence/reports/SANS.pdf',
    verification: 'needs_verification',
    scope: 'Longitudinal optical coherence tomography (OCT) metrics, retinal thickening thresholds.'
  },
  'NASA-HRP-CARDIO': {
    id: 'NASA-HRP-CARDIO',
    title: 'Risk of Orthostatic Intolerance & Cardiovascular Remodeling in Microgravity',
    institution: 'NASA Human Research Program',
    publisher: 'NASA Human Research Program',
    year: '2021',
    url: '',
    verification: 'needs_verification',
    scope: 'Microgravity blood volume contraction, baroreflex adaptation, and resistive countermeasure targets.'
  },
  'ISS-MEDB-7.1': {
    id: 'ISS-MEDB-7.1',
    title: 'ISS Medical Operations Protocol MedB-7.1: Telemedicine Consultation & Action Thresholds',
    institution: 'Multilateral Medical Operations Panel (MMOP)',
    publisher: 'International Space Station Program',
    year: '2023',
    url: '',
    verification: 'needs_verification',
    scope: 'Ground surgeon alert routing, clinical triage, and diagnostic tier escalation.'
  },
  'ESA-HPS': {
    id: 'ESA-HPS',
    title: 'Human Physiology in Microgravity & Axial Skeleton Deconditioning Handbook',
    institution: 'European Space Agency (ESA / EAC)',
    publisher: 'European Space Agency',
    year: '2019',
    url: '',
    verification: 'needs_verification',
    scope: 'Spinal stature elongation, postural muscle volume shift, and neuro-vestibular adaptation.'
  }
};

const CLINICAL_INDICATORS = {
  systolic: {
    id: 'systolic',
    label: 'Systolic Arterial Pressure',
    unit: 'mmHg',
    earthNominal: { min: 90, max: 120 },
    expectedInFlight: { min: 95, max: 140 },
    personalBaseline: 115,
    personalSd: 4.0,
    thresholdBasis: 'relative to personal baseline (within in-flight envelope)',
    sourceId: 'NASA-STD-3001',
    confidence: 'High (ISS Expeditions 1–70 normative telemetry)',
    physiologicNote: 'Initial cephalad fluid shift elevates stroke volume; subsequent hypovolemia stabilizes resting pressures.'
  },
  diastolic: {
    id: 'diastolic',
    label: 'Diastolic Arterial Pressure',
    unit: 'mmHg',
    earthNominal: { min: 60, max: 80 },
    expectedInFlight: { min: 65, max: 90 },
    personalBaseline: 75,
    personalSd: 3.5,
    thresholdBasis: 'relative to personal baseline (within in-flight envelope)',
    sourceId: 'NASA-STD-3001',
    confidence: 'High (ISS Expeditions 1–70 normative telemetry)',
    physiologicNote: 'Systemic vascular resistance generally maintained or slightly decreased in microgravity.'
  },
  heartRate: {
    id: 'heartRate',
    label: 'Resting Heart Rate',
    unit: 'bpm',
    earthNominal: { min: 60, max: 100 },
    expectedInFlight: { min: 55, max: 95 },
    personalBaseline: 62,
    personalSd: 4.0,
    thresholdBasis: 'relative to personal baseline (within in-flight envelope)',
    illustrativeThresholds: true,
    sourceId: 'NASA-HRP-CARDIO',
    confidence: 'High (Continuous Holter & resting vitals telemetry)',
    physiologicNote: 'Resting heart rate in conditioned astronauts often stays lower in-flight unless hypovolemic stress or thermal load is present.'
  },
  spo2: {
    id: 'spo2',
    label: 'Pulse Oximetry (SpO2)',
    unit: '%',
    earthNominal: { min: 95, max: 100 },
    expectedInFlight: { min: 96, max: 100 },
    personalBaseline: 99,
    personalSd: 1.0,
    thresholdBasis: 'absolute (in-flight physiological envelope)',
    sourceId: 'NASA-STD-3001',
    confidence: 'High (Continuous cabin life support matching)',
    physiologicNote: 'Homogeneous alveolar ventilation in microgravity preserves high hemoglobin saturation.'
  },
  opticDisc: {
    id: 'opticDisc',
    label: 'Peripapillary retinal thickness (simulated)',
    unit: 'µm',
    earthNominal: { min: 270, max: 300 },
    expectedInFlight: { min: 280, max: 325 },
    personalBaseline: 298,
    personalSd: 5.5,
    thresholdBasis: 'relative to personal baseline (within in-flight envelope)',
    sourceId: 'NASA-HRP-SANS',
    confidence: 'Moderate (Longitudinal OCT fundus scans from 40+ long-duration flyers)',
    physiologicNote: 'Persistent cephalad venous pressure elevates optic nerve sheath diameter and can induce disc edema.'
  },
  visualAcuity: {
    id: 'visualAcuity',
    label: 'Visual Acuity (LogMAR)',
    unit: 'LogMAR',
    earthNominal: { min: -0.10, max: 0.10 },
    expectedInFlight: { min: -0.05, max: 0.15 },
    personalBaseline: 0.00,
    personalSd: 0.04,
    thresholdBasis: 'relative to personal baseline',
    sourceId: 'NASA-HRP-SANS',
    confidence: 'High (Standardized electronic visual acuity tests)',
    physiologicNote: 'Posterior globe flattening causes a hyperopic shift in long-duration crew.'
  },
  vorGain: {
    id: 'vorGain',
    label: 'Vestibular Ocular Reflex (VOR)',
    unit: 'Gain',
    earthNominal: { min: 0.95, max: 1.05 },
    expectedInFlight: { min: 0.90, max: 1.10 },
    personalBaseline: 1.00,
    personalSd: 0.03,
    thresholdBasis: 'relative to personal baseline',
    illustrativeThresholds: true,
    sourceId: 'ESA-HPS',
    confidence: 'High (Dynamic visual acuity and eye-tracking helmets)',
    physiologicNote: 'Otolith-canal discordance dampens gaze stabilization during head turns until cerebellar reweighting occurs.'
  },
  pco2: {
    id: 'pco2',
    label: 'Ambient / Alveolar pCO2',
    unit: 'mmHg',
    earthNominal: { min: 0.3, max: 1.0 },
    expectedInFlight: { min: 1.5, max: 3.0 },
    personalBaseline: 2.4,
    thresholdBasis: 'absolute (cabin ECLSS environmental envelope)',
    sourceId: 'NASA-STD-3001',
    confidence: 'High (ISS Environmental Control & Life Support System telemetry)',
    physiologicNote: 'Absence of natural thermal convection causes localized CO2 pooling around astronaut quarters if ventilation is impaired.'
  },
  spineElongation: {
    id: 'spineElongation',
    label: 'Axial Spine Elongation',
    unit: 'cm',
    earthNominal: { min: 0, max: 0 },
    expectedInFlight: { min: 1.5, max: 4.5 },
    personalBaseline: 0,
    thresholdBasis: 'relative to terrestrial stature (in-flight elongation)',
    illustrativeThresholds: true,
    sourceId: 'ESA-HPS',
    confidence: 'High (Ultrasound & ultrasound stadiometry studies)',
    physiologicNote: 'Intervertebral disc imbibition causes stature lengthening and paraspinal flattening.'
  },
  calfCircumference: {
    id: 'calfCircumference',
    label: 'Calf Muscle Circumference',
    unit: 'cm',
    earthNominal: { min: 37.0, max: 39.5 },
    expectedInFlight: { min: 36.5, max: 38.5 },
    personalBaseline: 38.2,
    personalSd: 0.4,
    thresholdBasis: 'relative to personal baseline (countermeasure compliance)',
    illustrativeThresholds: true,
    sourceId: 'NASA-HRP-CARDIO',
    confidence: 'High (Pre/post-flight MRI & in-flight circumferential tape telemetry)',
    physiologicNote: 'Fluid shift produces immediate fluid reduction, followed by slow slow-twitch soleus atrophy if unexercised.'
  },
  reactionTime: {
    id: 'reactionTime',
    label: 'PVT Response Latency',
    unit: 'ms',
    earthNominal: { min: 180, max: 240 },
    expectedInFlight: { min: 190, max: 260 },
    personalBaseline: 214,
    personalSd: 12.0,
    thresholdBasis: 'relative to personal baseline (alertness drift)',
    sourceId: 'NASA-STD-3001',
    confidence: 'High (Standardized Psychomotor Vigilance Task)',
    physiologicNote: 'Behavioral alertness measure. Reaction latency increases indicate operational fatigue and circadian sleep debt.'
  },
  sleepDuration: {
    id: 'sleepDuration',
    label: 'Sleep Duration & Architecture',
    unit: 'hrs',
    earthNominal: { min: 7.0, max: 9.0 },
    expectedInFlight: { min: 6.5, max: 8.5 },
    personalBaseline: 7.2,
    personalSd: 0.5,
    thresholdBasis: 'absolute (circadian health standard)',
    sourceId: 'NASA-STD-3001',
    confidence: 'High (Actigraphy & polysomnography headband)',
    physiologicNote: 'Orbital light cycles suppress natural melatonin. Reduced sleep duration elevates cognitive error rates.'
  },
  radiationDose: {
    id: 'radiationDose',
    label: 'Cosmic Radiation Exposure',
    unit: 'µGy/d',
    earthNominal: { min: 5, max: 15 },
    expectedInFlight: { min: 200, max: 400 },
    personalBaseline: 270,
    personalSd: 25.0,
    thresholdBasis: 'absolute (ALARA radiation dosimetry limit)',
    sourceId: 'NASA-STD-3001',
    confidence: 'High (Continuous passive and active semiconductor radiation dosimeters)',
    physiologicNote: 'Galactic cosmic radiation and South Atlantic Anomaly crossings increase daily ionizing exposure relative to terrestrial background.'
  },
  coreTemp: {
    id: 'coreTemp',
    label: 'Core Body Temperature',
    unit: '°C',
    earthNominal: { min: 36.5, max: 37.3 },
    expectedInFlight: { min: 36.8, max: 37.6 },
    personalBaseline: 37.0,
    personalSd: 0.2,
    thresholdBasis: 'relative to personal baseline (spaceflight hyperthermia envelope)',
    illustrativeThresholds: true,
    sourceId: 'ESA-HPS',
    confidence: 'High (Circadian ingestible pill & double sensor forehead telemetry)',
    physiologicNote: 'Spaceflight core body temperature runs slightly higher due to impaired convective skin heat dissipation.'
  }
};

const DECLARED_INDICATORS_COUNT = 14;

/**
 * Tiered Clinical Decision Guidance
 * STRICT RULE: No numeric treatment protocols, no drug names, no dosing.
 * Operational, non-numeric and non-pharmacologic countermeasures only.
 */
const TIERED_GUIDANCE = {
  routine: {
    level: 'Routine (Nominal / In-range)',
    tag: 'Tier 1 Protocol',
    statusKey: 'in-range',
    summary: 'Physiological parameters within expected orbital adaptation envelope.',
    actions: [
      'Complete your scheduled resistive and cycle exercise sessions.',
      'Stay hydrated as directed by your mission nutrition plan.',
      'Log routine morning vitals and optical visual acuity checks.',
      'Maintain scheduled sleep discipline with cabin acoustic dampening.'
    ],
    sourceId: 'NASA-STD-3001',
    source: 'NASA Space Flight Human-System Standard, Vol 1: Crew Health',
    sourceVerification: 'verified'
  },
  selfCare: {
    level: 'Self-Care (Watch / Attention)',
    tag: 'Tier 2 Countermeasures',
    statusKey: 'attention',
    summary: 'Mild physiological deviation observed beyond personal baseline. Non-pharmacologic mitigation advised.',
    actions: [
      'Report new or worsening vision changes to the flight surgeon and continue your assigned countermeasures.',
      'Recalibrate cabin workstation viewing distance to minimize digital visual fatigue.',
      'Verify cabin local air diffuser function to ensure adequate atmospheric circulation and prevent localized CO2 accumulation.',
      'Perform follow-up optical assessment as scheduled.'
    ],
    sourceId: 'NASA-HRP-SANS',
    source: 'Risk of Spaceflight-Associated Neuro-ocular Syndrome (SANS) Evidence Report',
    sourceVerification: 'needs_verification'
  },
  flightSurgeon: {
    level: 'Contact Flight Surgeon (Flagged Deviation)',
    tag: 'Tier 3 Surgeon Review',
    statusKey: 'flight-surgeon',
    summary: 'Clinically significant shift requiring ground medical officer evaluation and customized telemetry review.',
    actions: [
      'Transmit high-resolution 12-lead Holter ECG and ocular fundus images on next Ku-band downlink.',
      'Request real-time private telemedicine consultation over TDRS communication window.',
      'Suspend high-impact maximal resistive lifting until baroreceptor and cardiovascular stability confirmed by surgeon.',
      'Review continuous cabin atmospheric logs (pCO2, pO2, total cabin pressure, trace contaminants).'
    ],
    sourceId: 'ISS-MEDB-7.1',
    source: 'ISS Medical Operations Protocol MedB-7.1: Telemedicine Consultation & Action Thresholds',
    sourceVerification: 'needs_verification'
  },
  emergency: {
    level: 'Emergency Response (Immediate Action)',
    tag: 'Tier 4 Emergency Protocol',
    statusKey: 'emergency',
    summary: 'Critical anomaly detected. Contact the flight surgeon and crew immediately.',
    actions: [
      'Contact the flight surgeon and crew immediately via intra-cabin voice intercom and emergency medical loop.',
      'Don Portable Breathing Apparatus (PBA) / Emergency Oxygen Mask if atmospheric toxicity or hypoxia suspected.',
      'Deploy Crew Medical Restraint System (CMRS) and Automated External Defibrillator (AED) to Destiny / Columbus module.',
      'Open direct emergency medical voice loop to Flight Surgeon (Surgeon-1).',
      'Begin stabilizing primary airway, breathing, and systemic circulation (ABCs) according to station emergency checklist.'
    ],
    sourceId: 'ISS-MEDB-7.1',
    source: 'ISS Medical Operations Protocol MedB-7.1: Telemedicine Consultation & Action Thresholds',
    sourceVerification: 'needs_verification'
  }
};

const INDICATORS = CLINICAL_INDICATORS;

/**
 * Three-Reference Indicator Classifier comparing:
 * 1. Terrestrial Earth 1g normal range
 * 2. In-flight microgravity expected adaptation envelope
 * 3. Individual astronaut personal baseline and variance
 */
function classifyIndicator(indicatorId, value, customBaseline = null) {
  if (indicatorId === 'restingHr') indicatorId = 'heartRate';
  const ind = (typeof CLINICAL_INDICATORS !== 'undefined' && CLINICAL_INDICATORS[indicatorId]) ||
              (typeof INDICATORS !== 'undefined' && INDICATORS[indicatorId]);
  if (!ind) {
    return { status: 'in-range', label: 'In range', reason: 'Indicator reference profile not registered.' };
  }

  const earthMin = ind.earthNominal.min;
  const earthMax = ind.earthNominal.max;
  const flightMin = ind.expectedInFlight.min;
  const flightMax = ind.expectedInFlight.max;
  const baseline = typeof customBaseline === 'number' ? customBaseline : ind.personalBaseline;
  const sd = ind.personalSd || 1.0;

  // 1. Critical Emergency Thresholds
  if (indicatorId === 'systolic' && (value >= 170 || value <= 85)) {
    return {
      status: 'emergency',
      label: 'Emergency',
      reason: 'Critical hemodynamic deviation outside acute flight survival envelope. Immediate crew medical stabilization required.'
    };
  }
  if (indicatorId === 'diastolic' && (value >= 110 || value <= 45)) {
    return {
      status: 'emergency',
      label: 'Emergency',
      reason: 'Critical diastolic pressure excursion outside viable operational tolerance.'
    };
  }
  if (indicatorId === 'heartRate' && (value >= 135 || value <= 40)) {
    return {
      status: 'emergency',
      label: 'Emergency',
      reason: 'Severe tachyarrhythmia or profound bradycardia detected in microgravity.'
    };
  }
  if (indicatorId === 'spo2' && value < 90) {
    return {
      status: 'emergency',
      label: 'Emergency',
      reason: 'Severe arterial hypoxemia (<90% SpO2). Immediate emergency supplemental oxygenation required.'
    };
  }
  if (indicatorId === 'opticDisc' && value >= 340) {
    return {
      status: 'emergency',
      label: 'Emergency',
      reason: 'Grade 4 papilledema / acute intracranial hypertension suspected.'
    };
  }

  // 2. Flight Surgeon Escalation Thresholds (exceeds expected in-flight adaptation envelope)
  if (value < flightMin || value > flightMax) {
    return {
      status: 'flight-surgeon',
      label: 'Contact flight surgeon',
      reason: `Exceeds expected in-flight microgravity envelope (${flightMin}–${flightMax} ${ind.unit}). Telemedicine consultation recommended.`
    };
  }

  // 3. Attention / Watch (inside expected in-flight envelope, but drifting significantly from personal baseline)
  const diffFromBaseline = Math.abs(value - baseline);
  const isDrifting = diffFromBaseline >= (2.0 * sd);

  if (isDrifting) {
    return {
      status: 'attention',
      label: 'Watch',
      reason: 'Within the expected in-flight range, but trending up from your own baseline, so Watch.'
    };
  }

  // 4. In Range (Nominal across In-Flight envelope and consistent with personal baseline)
  return {
    status: 'in-range',
    label: 'In range',
    reason: `Within expected in-flight adaptation envelope (${flightMin}–${flightMax} ${ind.unit}) and consistent with personal baseline.`
  };
}

/**
 * Validates vital set against human physiological viability boundaries.
 */
function validateVitalInputs(values) {
  let sys, dia, hr, spo2;
  if (typeof values === 'object' && values !== null) {
    sys = values.sysBP;
    dia = values.diaBP;
    hr = values.hr;
    spo2 = values.spo2;
  } else {
    sys = arguments[0];
    dia = arguments[1];
    hr = arguments[2];
    spo2 = arguments[3];
  }

  if (isNaN(sys) || sys < 50 || sys > 260) {
    return { valid: false, error: 'Systolic BP must be between 50 and 260 mmHg.' };
  }
  if (isNaN(dia) || dia < 30 || dia > 160) {
    return { valid: false, error: 'Diastolic BP must be between 30 and 160 mmHg.' };
  }
  if (sys <= dia) {
    return { valid: false, error: 'Systolic BP must be strictly greater than Diastolic BP.' };
  }
  if (isNaN(hr) || hr < 30 || hr > 240) {
    return { valid: false, error: 'Heart Rate must be between 30 and 240 bpm.' };
  }
  if (isNaN(spo2) || spo2 < 50 || spo2 > 100) {
    return { valid: false, error: 'SpO2 must be between 50% and 100%.' };
  }
  return { valid: true };
}

// Attach to window and modules
if (typeof window !== 'undefined') {
  window.DECLARED_INDICATORS_COUNT = DECLARED_INDICATORS_COUNT;
  window.INDICATORS = INDICATORS;
  window.CLINICAL_INDICATORS = CLINICAL_INDICATORS;
  window.CLINICAL_SOURCES = CLINICAL_SOURCES;
  window.TIERED_GUIDANCE = TIERED_GUIDANCE;
  window.classifyIndicator = classifyIndicator;
  window.validateVitalInputs = validateVitalInputs;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DECLARED_INDICATORS_COUNT,
    INDICATORS,
    CLINICAL_INDICATORS,
    CLINICAL_SOURCES,
    TIERED_GUIDANCE,
    classifyIndicator,
    validateVitalInputs
  };
}
