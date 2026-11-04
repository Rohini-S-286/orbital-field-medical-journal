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
    verification: 'verified',
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
    expectedInFlight: { min: 95, max: 130 },
    personalBaseline: 115,
    sourceId: 'NASA-STD-3001',
    confidence: 'High (ISS Expeditions 1–70 normative telemetry)',
    physiologicNote: 'Initial cephalad fluid shift elevates stroke volume; subsequent hypovolemia (~12% plasma reduction) stabilizes resting pressures.'
  },
  diastolic: {
    id: 'diastolic',
    label: 'Diastolic Arterial Pressure',
    unit: 'mmHg',
    earthNominal: { min: 60, max: 80 },
    expectedInFlight: { min: 65, max: 85 },
    personalBaseline: 75,
    sourceId: 'NASA-STD-3001',
    confidence: 'High (ISS Expeditions 1–70 normative telemetry)',
    physiologicNote: 'Systemic vascular resistance generally maintained or slightly decreased in microgravity.'
  },
  heartRate: {
    id: 'heartRate',
    label: 'Resting Heart Rate',
    unit: 'bpm',
    earthNominal: { min: 60, max: 100 },
    expectedInFlight: { min: 55, max: 90 },
    personalBaseline: 62,
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
    sourceId: 'NASA-STD-3001',
    confidence: 'High (Continuous cabin life support matching)',
    physiologicNote: 'Homogeneous alveolar ventilation in 0g preserves high hemoglobin saturation.'
  },
  opticDisc: {
    id: 'opticDisc',
    label: 'Peripapillary retinal thickness (simulated)',
    unit: 'µm',
    earthNominal: { min: 270, max: 300 },
    expectedInFlight: { min: 280, max: 325 },
    personalBaseline: 298,
    personalSd: 5.0,
    sourceId: 'NASA-HRP-SANS',
    confidence: 'Moderate (Longitudinal OCT fundus scans from 40+ long-duration flyers)',
    physiologicNote: 'Persistent cephalad venous pressure elevates optic nerve sheath diameter (ONSD) and can induce disc edema.'
  },
  visualAcuity: {
    id: 'visualAcuity',
    label: 'Visual Acuity (LogMAR)',
    unit: 'LogMAR',
    earthNominal: { min: -0.10, max: 0.10 },
    expectedInFlight: { min: -0.05, max: 0.15 },
    personalBaseline: 0.00,
    personalSd: 0.04,
    sourceId: 'NASA-HRP-SANS',
    confidence: 'High (Standardized electronic visual acuity tests)',
    physiologicNote: 'Posterior globe flattening causes a hyperopic shift (+0.50 to +1.50 diopters) in long-duration crew.'
  },
  vorGain: {
    id: 'vorGain',
    label: 'Vestibular Ocular Reflex (VOR)',
    unit: 'Gain',
    earthNominal: { min: 0.95, max: 1.05 },
    expectedInFlight: { min: 0.90, max: 1.10 },
    personalBaseline: 1.00,
    personalSd: 0.03,
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
    sourceId: 'NASA-STD-3001',
    confidence: 'High (ISS Environmental Control & Life Support System telemetry)',
    physiologicNote: 'Absence of natural thermal convection causes localized CO2 pooling around astronaut sleeping quarters if ventilation is impaired.'
  },
  spineElongation: {
    id: 'spineElongation',
    label: 'Axial Spine Elongation',
    unit: 'cm',
    earthNominal: { min: 0, max: 0 },
    expectedInFlight: { min: 1.5, max: 4.5 },
    personalBaseline: 0,
    sourceId: 'ESA-HPS',
    confidence: 'High (Ultrasound & ultrasound stadiometry studies)',
    physiologicNote: 'Intervertebral disc imbibition causes 2–5 cm stature lengthening and paraspinal flattening.'
  },
  calfCircumference: {
    id: 'calfCircumference',
    label: 'Calf Muscle Circumference',
    unit: 'cm',
    earthNominal: { min: 37.0, max: 39.5 },
    expectedInFlight: { min: 36.5, max: 38.5 },
    personalBaseline: 38.2,
    sourceId: 'NASA-HRP-CARDIO',
    confidence: 'High (Pre/post-flight MRI & in-flight circumferential tape telemetry)',
    physiologicNote: 'Fluid shift produces immediate "bird-leg" phenomenon (-1 to -2 cm), followed by slow slow-twitch soleus atrophy if unexercised.'
  }
};

/**
 * Tiered Clinical Decision Guidance
 * STRICT RULE: No drug dosing. Operational and non-pharmacologic countermeasures only.
 */
const TIERED_GUIDANCE = {
  routine: {
    level: 'Routine (Nominal / In-range)',
    tag: 'Tier 1 Protocol',
    statusKey: 'in-range',
    summary: 'Physiological parameters within expected orbital adaptation envelope.',
    actions: [
      'Maintain 2.5 hr daily countermeasure schedule: 60 min ARED resistive training + 30 min T2 cycle ergometer interval session.',
      'Maintain standardized hydration protocol: 2.5 L electrolyte-balanced fluids per 24 hr.',
      'Log routine morning vitals and optical Amsler visual acuity grid daily.',
      'Ensure 8-hour sleep mask discipline with sound-dampened cabin acoustic ventilation.'
    ],
    source: 'NASA-STD-3001 Vol 1, Sec 4.2'
  },
  selfCare: {
    level: 'Self-Care (Watch / Attention)',
    tag: 'Tier 2 Countermeasures',
    statusKey: 'attention',
    summary: 'Mild physiological deviation observed beyond personal baseline. Non-pharmacologic mitigation advised.',
    actions: [
      'Report new or worsening vision changes to the flight surgeon and continue your assigned countermeasures.',
      'Recalibrate cabin workstation viewing distance to minimize digital visual fatigue.',
      'Verify cabin local air diffuser velocity (> 0.1 m/s) to ensure zero localized CO2 bubble accumulation near face.',
      'Schedule follow-up optical coherence tomography (OCT) within 48 hours.'
    ],
    source: 'NASA Human Research Program SANS Evidence Report (2020 Rev)'
  },
  flightSurgeon: {
    level: 'Contact Flight Surgeon (Flagged Deviation)',
    tag: 'Tier 3 Surgeon Review',
    statusKey: 'flight-surgeon',
    summary: 'Clinically significant shift requiring ground medical officer evaluation and customized telemetry review.',
    actions: [
      'Transmit high-resolution 12-lead Holter ECG and ocular fundus images on next Ku-band downlink.',
      'Request real-time private telemedicine consultation over TDRS East/West communication window.',
      'Suspend high-impact maximal resistive lifting until baroreceptor and cardiovascular stability confirmed by surgeon.',
      'Review continuous cabin atmospheric logs (pCO2, pO2, total cabin pressure, trace contaminants).'
    ],
    source: 'ISS Medical Operations Protocol MedB-7.1'
  },
  emergency: {
    level: 'Emergency Response (Immediate Action)',
    tag: 'Tier 4 Emergency Protocol',
    statusKey: 'emergency',
    summary: 'Critical anomaly detected. Initiate station emergency medical procedures immediately.',
    actions: [
      'Notify Crew Commander and onboard Medical Officer immediately via intra-cabin voice intercom.',
      'Don Portable Breathing Apparatus (PBA) / Emergency Oxygen Mask if atmospheric toxicity or hypoxia suspected.',
      'Deploy Crew Medical Restraint System (CMRS) and Automated External Defibrillator (AED) to Columbus / Destiny module.',
      'Open direct emergency medical voice loop to MCC-Houston Surgeon (Surgeon-1) or EAC-Cologne.',
      'Begin stabilizing primary airway, breathing, and systemic circulation (ABCs) according to ISS Emergency Medical Checklist.'
    ],
    source: 'ISS Emergency Medical Procedures, Flight Rule B13-102'
  }
};
