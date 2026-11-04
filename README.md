# Orbital Field Medical Journal

> **A warm, calm, editorial-clinical self-assessment and physiological telemetry journal designed for long-duration astronaut spaceflight missions.**

[![NASA Space Apps 2026](https://img.shields.io/badge/NASA%20Space%20Apps-2026%20Submission-0B7A56.svg)](https://www.spaceappschallenge.org/)
[![Automated Test Suite](https://img.shields.io/badge/Automated%20Tests-69%2F69%20Passing-0B7A56.svg)](./tests.html)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline--First-0B7A56.svg)](#offline-pwa--service-worker)
[![WCAG AA](https://img.shields.io/badge/WCAG%202.1-AA%20Compliant-0B7A56.svg)](#accessibility--space-ergonomics)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

*Note: Research prototype developed for the NASA Space Apps Challenge 2026. Not affiliated with or endorsed by NASA.*

---

## 🛰️ NASA Space Apps Challenge 2026

**Challenge Statement:** *"A visual tool that helps astronauts assess their own health during space missions and provides guidance on treatments and health improvements."*

During long-duration human space exploration (Artemis lunar surface missions, Lunar Gateway stays, and Mars transit), speed-of-light communication latency with Earth ranges from 1.3 seconds to upwards of 24 minutes round-trip. When acute physiological shifts occur—such as cephalad fluid shifts, neuro-ocular changes, or circadian fatigue—astronauts cannot depend on real-time ground telemetry reviews from Houston or Bengaluru.

**The Orbital Field Medical Journal** is a zero-dependency, offline-first Progressive Web App (PWA) tailored specifically for autonomous astronaut health assessment, multi-system telemetry logging, and clinical decision support under microgravity constraints.

- **Live Public URL (GitHub Pages):** [https://rohini-s-286.github.io/orbital-field-medical-journal/](https://rohini-s-286.github.io/orbital-field-medical-journal/)
- **Automated Verification Test Suite:** [https://rohini-s-286.github.io/orbital-field-medical-journal/tests.html](https://rohini-s-286.github.io/orbital-field-medical-journal/tests.html)
- **Repository:** [https://github.com/Rohini-S-286/orbital-field-medical-journal](https://github.com/Rohini-S-286/orbital-field-medical-journal)
- **Presentation Script & Usability Protocol:** [DEMO_SCRIPT.md](DEMO_SCRIPT.md) • [USABILITY_TEST.md](USABILITY_TEST.md)
- **Clinical Evidence & Sourcing Audit:** [EVIDENCE.md](EVIDENCE.md)

---

## 🏆 Scoring Criteria Alignment

| Space Apps Dimension | How the Project Delivers |
|---|---|
| **Impact** | Solves the primary biomedical threat to deep space crews: autonomous health assessment during high-latency Mars transit and Lunar missions where Earth telemedicine is delayed by up to 24 minutes. |
| **Creativity** | Replaces cold, high-glare sci-fi HUDs with a warm, editorial-clinical "field journal" visual identity inspired by classic medical journals, reducing visual fatigue on 6+ month deployments. |
| **Validity** | Implements the **Three-Reference Adaptation Model** comparing 1g Earth norms, expected in-flight 0g adaptation envelopes, and individual baselines using NASA-STD-3001 and NASA HRP evidence books. |
| **Relevance** | Directly answers the challenge with 10 anatomical systems, the Spaceflight 5 Hazards lens, standard Psychomotor Vigilance Task (PVT), and non-pharmacologic tiered guidance with **zero drug dosing**. |
| **Presentation** | Includes an interactive 30-Day Mission Simulation (featuring a simulated MET Day 19 SANS deviation scenario), a standalone 68-assertion in-browser test suite (`tests.html`), and Night Cabin dark mode. |

---

## ✨ Key Capabilities & Innovations

### 1. Three-Reference Status Engine & Visual Ruler
Terrestrial 1g reference ranges are clinically invalid in weightlessness. Our interactive visual ruler displays:
1. **Earth 1g Sea-Level Range:** Baseline terrestrial reference.
2. **In-Flight 0g Adaptation Envelope:** Expected healthy physiological shifts in microgravity (e.g. cephalad venous engorgement, spinal expansion).
3. **Astronaut Personal Baseline:** Rolling personal telemetry mean with standard deviation confidence interval.
4. **Plain-Language Synthesis:** Generates human-readable clinical explanations without alarmism (e.g., *"Shifted relative to Earth 1g normal, but within expected in-flight adaptation range. Status: Within expected range."*).

### 2. Multi-Signal Red-Green Colorblind Proof Status Scale
Color is **never** the sole clinical indicator:
- **In range:** Emerald `#0B7A56` + Check-Circle icon + `"In range"` + solid border.
- **Attention (Watch):** Ochre `#C98A1B` + Alert-Triangle icon + `"Watch"` + dashed border.
- **Contact flight surgeon:** Vermillion `#E34234` + Phone icon + `"Contact flight surgeon"` + 2px border.
- **Emergency:** Vermillion Fill + Siren/Hazard icon + `"Emergency"` + diagonal pattern.

### 3. Mission Operations & Latency Engine
- **Environment Selector:** Toggle between **ISS (LEO)**, **Lunar Gateway**, **Mars Transit**, and **Surface Rover Hab**.
- **Speed-of-Light Latency Tracking:** Realistic comm delays (ISS: 0.5s, Lunar: 1.3s, Mars: 12 min delay with autonomous triage protocol).
- **14-Day Adherence Streak:** Rewards consistent check-in adherence habits, never physiological values.

### 4. NASA 5 Hazards Lens (RIDGE)
Filter systems instantly by the fundamental human spaceflight hazards:
- **Radiation (R):** Highlights immune biomarkers and cosmic radiation dose.
- **Isolation (I):** Highlights neuro-behavioral health and circadian sleep architecture.
- **Distance (D):** Highlights autonomous triage systems and telemedicine ledger.
- **Gravity (G):** Highlights SANS ocular shifts, cardiovascular baroreflex, and musculoskeletal systems.
- **Environment (E):** Highlights cabin ambient $pCO_2$ and spaceflight thermoregulation.

### 5. 30-Day Simulated Mission Playback (Judge Presentation Mode)
- Scrubber slider and automated playback across a 30-day expedition.
- **MET Day 19 Incident Drill:** Jump straight to Day 19 simulating an acute SANS optic disc thickening deviation [Simulated Scenario] (328 µm) triggering Contact Flight Surgeon status and dropping mission readiness to 74%.
- Reset button restores nominal mid-mission Day 14 baseline.

### 6. Interactive Psychomotor Vigilance Task (PVT)
- Real 3-trial behavioral alertness test measuring reaction latency in milliseconds with `performance.now()`.
- Random stimulus delays (1.8s–3.5s), attention lapse tracking (>500 ms), and false start penalties (<150 ms).

### 7. Statistical Quality Control: EWMA & CUSUM Drift Detection
- Real-time Exponentially Weighted Moving Average (EWMA, $\alpha = 0.3$) and Cumulative Sum (CUSUM, $k=0.5\sigma$, $h=3.5\sigma$) detect subtle progressive physiological drifts before acute threshold violations occur.
- Readiness score displays transparent 95% Confidence Intervals (e.g. `87% (95% CI: 82%–92%)`).

### 8. Strict Safety: Non-Pharmacologic Guidance Mandate
- **Zero drug dosing anywhere:** No pharmaceutical names, dosages, or drug protocols.
- Tiered decision protocols (Routine, Self-care, Contact Flight Surgeon, Emergency) provide operational, environmental, and physical countermeasures only.

---

## 🏛️ System Architecture

```mermaid
flowchart TD
  subgraph Intake ["1. Telemetry Intake & Inputs"]
    Sensors["Vitals & Biometrics<br/>(BP, HR, SpO2, Temp)"]
    PVT["Cognitive PVT Test<br/>(Millisecond Reaction Time)"]
    Timeline["30-Day Mission Timeline<br/>(MET Simulation Data)"]
  end

  subgraph Engine ["2. Clinical Status & Analytics Engine"]
    Validator{"Telemetry Validation<br/>(Filter Outliers & Impossible Values)"}
    ThreeRef["Three-Reference Model<br/>1. Earth 1g Range<br/>2. Expected In-Flight Envelope<br/>3. Personal Rolling Baseline"]
    SPC["Statistical Process Control<br/>EWMA (α=0.3) & CUSUM Drift"]
    Readiness["Readiness Assessment<br/>Weighted Score + Crisis Floor Cap"]
  end

  subgraph Presentation ["3. Human-System Interface (Editorial-Clinical)"]
    BodyMap["Interactive Body Map<br/>(10 Systems + 5 Hazards)"]
    StatusBadges["Multi-Signal Badges<br/>(Icon + Geometry + Text Label)"]
    GuidancePanel["Tiered Non-Pharmacologic Guidance<br/>(Zero Drug Dosing Mandate)"]
    OfflineStore["Resilient Storage<br/>(LocalStorage + Memory Fallback)"]
  end

  Sensors --> Validator
  PVT --> Validator
  Timeline --> Validator
  Validator --> ThreeRef
  ThreeRef --> SPC
  SPC --> Readiness
  Readiness --> BodyMap
  Readiness --> StatusBadges
  ThreeRef --> GuidancePanel
  GuidancePanel --> OfflineStore
```

---

## 🧪 Automated Verification Test Suite

The project includes an embedded, standalone test runner accessible at **[`tests.html`](https://rohini-s-286.github.io/orbital-field-medical-journal/tests.html)**:
- **68 automated assertions across 11 test groups** running natively in the browser with zero external dependencies.
- Tests status classification, readiness formula safety caps, impossible vital rejection, EWMA drift detection, and non-pharmacologic safety guarantees.
- One-click export of structured JSON test reports (`test-results.json`) for judging evaluation.

### What the Tests Prove
The 68 automated verification assertions in `tests.html` provide definitive architectural proofs:
1. **Mathematical Consistency:** Proves that all 14 clinical indicators correctly map values to the 4 status tiers (`in-range`, `attention`, `flight-surgeon`, `emergency`) based on their designated threshold basis (absolute vs. relative to baseline).
2. **Safety Bounds & Triage Caps:** Proves that catastrophic sensor inputs (e.g. 190/120 mmHg or 150 bpm) strictly force readiness scores to $\le 35\%$, preventing hazardous "fit-for-duty" false negatives.
3. **Clinical Safety Guarantee:** Proves through regex and string scans that zero numeric drug dosing, pharmaceutical names, or unverified treatment protocols exist in the codebase or data dictionaries.
4. **Source Traceability:** Proves that 100% of indicators and guidance tiers resolve to authenticated sources in `data/sources.json`.
5. **PWA & Offline Resilience:** Proves graceful degradation to in-memory caching when `localStorage` is blocked or quota-exceeded.

> **Operational Distinction:** While these tests verify algorithmic correctness and safety boundaries, actual clinical envelopes for flight certification require formal review by NASA MMOP and flight surgeons.

---

## ♿ Accessibility & Space Ergonomics (WCAG 2.1 AA)

- **Gloved Operation:** Minimum **48 × 48px** touch targets on all buttons, steppers, and dialog controls for pressurized spacesuit gloves.
- **Contrast Ratios:**
  - Body text on Warm Ivory (`#1F2A24` on `#FBF6EA`): **13.7:1** (AAA)
  - Muted text (`#566860` on `#FFFDF7`): **6.2:1** (AA)
  - Attention text token (`#7A4E00` on `#FFFDF7`): **6.8:1** (AA)
  - Vermillion text token (`#A8281D` on `#FFFDF7`): **6.4:1** (AA)
  - Night Cabin dark mode body text (`#F4EEDD` on `#0F1A15`): **14.2:1** (AAA)
- **Modal Focus Management:** Modal dialogs employ focus trapping, Esc key dismissal, and `visibility: hidden` when inactive.

---

## 📦 Offline PWA & Service Worker

Operates 100% offline via versioned cache-first Service Worker (`ofmj-v2`):
- Precaches HTML, CSS, JavaScript, self-hosted WOFF2 fonts (`Fraunces`, `Inter`), icons, and data files (`indicators.json`, `systems.json`, `sources.json`).
- Strict relative paths (`./`) ensure flawless operation on root domains or sub-paths (`/orbital-field-medical-journal/`).

---

## 💻 How to Run Locally

```bash
# Clone repository
git clone https://github.com/Rohini-S-286/orbital-field-medical-journal.git
cd orbital-field-medical-journal

# Option A: Python Standard Library (Zero dependencies)
python -m http.server 8080

# Option B: Node.js
npx serve .
```

Open **`http://localhost:8080/`** for the main journal or **`http://localhost:8080/tests.html`** for the automated test suite.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE) © 2026 Rohini S.
