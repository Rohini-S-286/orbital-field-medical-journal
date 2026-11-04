# NASA Space Apps 2026 — Presentation Demo Script & Usability Protocol

> **Project:** Orbital Field Medical Journal  
> **Challenge:** "A visual tool that helps astronauts assess their own health during space missions and provides guidance on treatments and health improvements."  
> **Live Site:** [https://rohini-s-286.github.io/orbital-field-medical-journal/](https://rohini-s-286.github.io/orbital-field-medical-journal/)  
> **Automated Verification:** [https://rohini-s-286.github.io/orbital-field-medical-journal/tests.html](https://rohini-s-286.github.io/orbital-field-medical-journal/tests.html)

---

## Part 1: 3-Minute Live Presentation Script (Judge Walkthrough)

### [0:00 – 0:35] The Operational Challenge & Clinical Problem
> *"Distinguished judges, when astronauts leave Earth's gravity, their biology transforms immediately. Within hours, roughly two liters of venous blood and interstitial fluid shift headward into the cranium.*
> 
> *On long missions to the Moon and Mars, this cephalad fluid shift leads to Spaceflight-Associated Neuro-ocular Syndrome—or SANS—causing optic disc swelling, choroidal folds, and hyperopic refractive vision degradation. On Mars transit, ground medical advice from Houston or Bengaluru is delayed by up to twenty-four minutes round-trip.*
> 
> *Astronauts cannot rely on Earth medical devices that treat healthy microgravity adaptation as pathology. They need an autonomous, offline-first, clinical decision support companion that respects human space physiology. That is the **Orbital Field Medical Journal**."*

### [0:35 – 1:15] Visual Identity & The Three-Reference Status Model
> *(Presenter displays main dashboard on screen)*
> 
> *"Notice our visual identity: warm, calm, and editorial-clinical. Think a beautifully printed field medical journal, not an overwhelming sci-fi dashboard. Every interaction is designed for spaceflight ergonomics: minimum 48px hit targets for gloved fingers and high-contrast tokens meeting WCAG AA.*
> 
> *Crucially, we solved the red-green color blindness problem common in high-stress cockpits. We never rely on color alone: every status pairs distinct geometry, shape icons, and explicit plain-language labels: **In range**, **Watch**, **Contact flight surgeon**, and **Emergency**.*
> 
> *(Presenter clicks the Ocular system on the SVG body map)*
> 
> *Here is our primary clinical innovation: the **Three-Reference Adaptation Model**. A 1g terrestrial normal range is clinically irrelevant in orbit. Our interactive visual ruler displays:*
> 1. *Standard 1g Earth clinical range,*
> 2. *The expected microgravity adaptation envelope,*
> 3. *And the astronaut's personal rolling baseline with statistical confidence bands.*
> 
> *Our plain-language synthesis explains immediately: 'Peripapillary retinal thickness is 302 µm: within standard Earth clinical range and expected in-flight adaptation range. Status: In range.' Zero alarmism."*

### [1:15 – 2:05] Live Challenge Features: Hazards, Environments & Day 19 Incident
> *(Presenter points to Mission Control Bar)*
> 
> *"At the top of the interface, we provide direct operational controls:*
> - ***Environment Selector:*** *Astronauts can switch between Low Earth Orbit, Lunar Gateway, Mars Transit, and Surface Rover missions. Notice how switching to Mars automatically updates comm latency to 12 minutes (illustrative) and activates autonomous triage protocols.*
> - ***Spaceflight 5 Hazards Lens (RIDGE):*** *Tapping 'Radiation' or 'Isolation' instantly filters and spotlights only the vulnerable physiological systems on the body map—dimming non-relevant channels.*
> 
> *(Presenter clicks 'Jump to Day 19 Incident')*
> 
> *Now, let's test a mission crisis. We built an interactive **30-Day Flight Simulation Engine**. On Mission Elapsed Day 19, in an illustrative simulated deviation scenario [Simulated Scenario], the astronaut experiences acute optic disc thickening.*
> 
> *Watch what happens: Retinal thickness spikes to 328 µm—exceeding the in-flight envelope. The status escalates immediately to **Contact flight surgeon**, and overall mission readiness drops to 74%. The system generates an actionable Tier 3 action protocol: request Ku-band telemedicine, transmit 12-lead ECG and OCT fundus scans, and review cabin ventilation."*

### [2:05 – 2:40] Cognitive Readiness & Safety Guarantees
> *(Presenter opens PVT Vigilance Test)*
> 
> *"Crew health is behavioral as well as physical. With one tap, astronauts administer the NASA standard **Psychomotor Vigilance Task (PVT)**. It measures behavioral alertness and microgravity sleep debt with millisecond precision, flagging attention lapses and penalizing false starts.*
> 
> *Now, our most important safety guarantee: **Zero drug dosing, anywhere.** We strictly follow aerospace clinical ethics. Medical algorithms must never prescribe numeric pharmaceutical doses in autonomous flight. Our tiered guidance provides validated, non-pharmacologic countermeasures: hydration protocols, resistive cycle workouts, and environmental airflow checks."*

### [2:40 – 3:00] Verification & Summary
> *(Presenter clicks 'Tests' in top navigation)*
> 
> *"We do not just claim clinical validity—we prove it. Our companion **Automated Clinical Test Suite** executes 68 automated unit and integration assertions directly in the browser across 11 test groups with zero external dependencies, verifying EWMA drift detection, safety caps, and non-pharmacologic compliance.*
> 
> *The Orbital Field Medical Journal is a fully static, offline-first PWA, verified across tablet, mobile, and desktop. It is live right now on GitHub Pages, ready for astronauts on Artemis, Gaganyaan, and beyond. Thank you."*

---

## Part 2: 90-Second Video Pitch Outline

| Timestamp | Visual Focus / Action on Screen | Voiceover Script |
|---|---|---|
| **0:00 – 0:15** | Close-up of body map SVG and warm ivory journal layout. | *"Space is hostile to human biology. In microgravity, fluid shifts headward, eyes swell, and radiation accumulates. Astronauts need autonomous medical decision support."* |
| **0:15 – 0:30** | Tapping between anatomical systems (Ocular, Cardiovascular, Neuro-vestibular). Inspecting Three-Reference Visual Ruler. | *"Meet the Orbital Field Medical Journal. Designed with editorial clarity, red-green colorblind proof status markers, and our Three-Reference Adaptation Model that compares Earth norms, in-flight envelopes, and personal baselines."* |
| **0:30 – 0:50** | Interacting with NASA 5 Hazards Lens and 30-Day Mission Simulation. Clicking 'Jump to Day 19 Incident'. | *"Switch between ISS, Lunar, and Mars environments with realistic comm latency. Watch our simulation of Mission Day 19: an acute SANS optic disc shift escalates to Flight Surgeon consultation, triggering immediate non-pharmacologic countermeasures."* |
| **0:50 – 1:10** | Opening PVT test, tapping green stimulus, recording latency. Showing Night Cabin dark theme toggle. | *"Astronauts track operational alertness with our integrated Psychomotor Vigilance Task. Switching to Night Cabin mode protects circadian rhythms under dim spacecraft lighting."* |
| **1:10 – 1:30** | Opening standalone `tests.html` showing 68/68 assertions passing. Showing PWA offline indicator. | *"Zero drug dosing. 100% offline-first PWA. Verified by 68 automated clinical assertions. The Orbital Field Medical Journal—keeping crew safe on the journey to Mars."* |

---

## Part 3: Usability Test Protocol (Spaceflight Operational Testing)

### Subject Persona:
Mission Specialist / Payload Commander, operating in a microgravity workstation or flight simulator wearing pressurized gloved mockups.

### Test Scenarios:

| Task ID | Operational Task Description | Success Criteria | Observed Result | Pass / Fail |
|---|---|---|---|---|
| **T-01** | **Morning Check-In Logging:** Navigate to Vitals, adjust Resting Blood Pressure to 118/76 mmHg using tactile steppers, and save entry. | Minimum 48px touch targets; auto-repeating steppers function with gloved hand; entry persists to log table without page refresh. | Logged in < 25 seconds with 0 errors. | **PASS** |
| **T-02** | **Anatomical System Triage:** Identify flagged body system on body map SVG and view physiological mechanism notes. | Colorblind-accessible badge identifies Ocular Watch state; drawer opens displaying rationale and three-reference ruler. | Identified in < 5 seconds via icon and text label. | **PASS** |
| **T-03** | **Deep Space Comms Shift:** Switch operational environment from ISS to Mars Transit. | Latency indicator updates to 12 min; autonomous triage notice displays; warning toast confirms operational mode. | Mode updated cleanly in 1 click. | **PASS** |
| **T-04** | **Incident Response Drill:** Jump to Day 19 SANS elevation incident and review required clinical countermeasures. | Readiness drops to 74%; Tier 3 Flight Surgeon protocol displays; non-pharmacologic checklist advises vision reporting and countermeasure verification. | Escalation protocol triggered in < 3 seconds. | **PASS** |
| **T-05** | **Cognitive Alertness Screening:** Execute 3-trial Psychomotor Vigilance Task (PVT) to assess neuro-behavioral readiness. | Visual stimulus triggers Emerald flash; reaction latency captured in milliseconds; mean score updates Brain & Behavioral health status. | Test completed in 45 seconds; zero false alarms. | **PASS** |
