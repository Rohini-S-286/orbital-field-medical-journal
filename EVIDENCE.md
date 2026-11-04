# Clinical Evidence Base & Physiological Reference Norms

> **Project:** Orbital Field Medical Journal  
> **Challenge:** NASA Space Apps Challenge 2026 — Astronaut Health Self-Assessment & Field Telemetry  
> **Disclaimer:** Decision-support research prototype. Not a certified medical diagnostic device. All displayed metrics and simulated patient telemetry are for operational interface validation and research training. Strictly zero drug dosing provided.

---

## 1. Physiological Indicators & Adaptation Envelope (14 Indicators)

The following normative indicators govern the status engine (`clinical-ranges.js`, `data/indicators.json`, and `app.js`). Each indicator distinguishes between Earth sea-level norms, expected in-flight microgravity adaptation envelopes, and individual astronaut baselines.

| Indicator | Earth Sea-Level Range | Expected In-Flight Adaptation Envelope | Astronaut Personal Baseline | Primary Citation / Standard | Source ID | Verification Status |
|---|---|---|---|---|---|---|
| **Systolic Arterial Pressure** | 90–120 mmHg | 95–130 mmHg | 115 mmHg (±4.5) | NASA Space Flight Human-System Standard, Vol 1: Crew Health (2022 Rev B) | NASA-STD-3001 | `verified` |
| **Diastolic Arterial Pressure** | 60–80 mmHg | 65–85 mmHg | 75 mmHg (±3.8) | NASA-STD-3001, Vol 1: Crew Health | NASA-STD-3001 | `verified` |
| **Resting Heart Rate** | 60–100 bpm | 55–90 bpm | 62 bpm (±3.2) | NASA HRP Evidence Report: Cardiovascular Deconditioning in Microgravity | NASA-HRP-CARDIO | `needs_verification` |
| **Pulse Oximetry ($SpO_2$)** | 95–100% | 96–100% | 99% (±0.8) | NASA-STD-3001, Vol 2: Habitat Environments & Life Support | NASA-STD-3001 | `verified` |
| **Peripapillary Retinal Thickness** | 270–300 µm | 280–325 µm | 298 µm (±5.0) | NASA HRP Evidence Report: Spaceflight-Associated Neuro-ocular Syndrome (SANS) | NASA-HRP-SANS | `verified` |
| **Visual Acuity (LogMAR)** | -0.10 to 0.10 | -0.05 to 0.15 | 0.00 (±0.04) | NASA HRP SANS Longitudinal Refractive Telemetry | NASA-HRP-SANS | `verified` |
| **Vestibular Ocular Reflex (VOR)** | 0.95–1.05 Gain | 0.90–1.10 Gain | 1.00 Gain (±0.03) | ESA Human Physiology in Space Handbook (Otolith Dissociation) | ESA-HPS | `needs_verification` |
| **Cabin Ambient $pCO_2$** | 0.3–1.0 mmHg | 1.5–3.0 mmHg | 2.4 mmHg (±0.3) | NASA-STD-3001 Vol 2, Table 6.2-1 & ISS Flight Rule B13-102 | NASA-STD-3001 | `verified` |
| **Axial Spine Elongation** | 0.0–0.5 cm | +1.5 to +4.5 cm | +3.0 cm (±0.5) | ESA Human Physiology Handbook & ISS Stadiometry | ESA-HPS | `needs_verification` |
| **Calf Muscle Circumference** | 37.0–39.5 cm | 36.5–38.5 cm | 38.2 cm (±0.4) | NASA HRP Evidence: Impaired Performance Due to Reduced Muscle Mass | NASA-HRP-CARDIO | `needs_verification` |
| **PVT Response Latency** | 180–240 ms | 190–260 ms | 214 ms (±12.0) | NASA-STD-3001 Behavioral Health & Psychomotor Vigilance Standards | NASA-STD-3001 | `verified` |
| **Sleep Duration & Architecture** | 7.0–9.0 hrs | 6.5–8.5 hrs | 7.2 hrs (±0.5) | NASA-STD-3001 Sleep Environment & Circadian Alignment | NASA-STD-3001 | `verified` |
| **Cosmic Radiation Daily Dose** | 5–15 µGy/d | 200–400 µGy/d | 270 µGy/d (±25.0) | NASA-STD-3001 Ionizing Radiation Permissible Exposure Limits | NASA-STD-3001 | `verified` |
| **Core Body Temperature** | 36.5–37.3 °C | 36.8–37.6 °C | 37.0 °C (±0.2) | ESA-HPS Thermoregulation & Spaceflight Microgravity Hyperthermia | ESA-HPS | `needs_verification` |

---

## 2. Evidence Sourcing Audit & Citations

| Source ID | Document Title | Publishing Body | Year | Public Access URL | Verification Status |
|---|---|---|---|---|---|
| **NASA-STD-3001** | NASA Space Flight Human-System Standard, Vol 1: Crew Health (Rev B) | National Aeronautics and Space Administration | 2022 | [https://www.nasa.gov/reference/nasa-std-3001/](https://www.nasa.gov/reference/nasa-std-3001/) | `verified` |
| **NASA-HRP-SANS** | Risk of Spaceflight-Associated Neuro-ocular Syndrome (SANS) Evidence Report | NASA Human Research Program | 2020 | [https://humanresearchroadmap.nasa.gov/evidence/reports/SANS.pdf](https://humanresearchroadmap.nasa.gov/evidence/reports/SANS.pdf) | `verified` |
| **NASA-HRP-CARDIO** | Risk of Orthostatic Intolerance & Cardiovascular Remodeling in Microgravity | NASA Human Research Program | 2021 | *(Public portal under review)* | `needs_verification` |
| **ISS-MEDB-7.1** | ISS Medical Operations Protocol MedB-7.1: Telemedicine Consultation & Action Thresholds | Multilateral Medical Operations Panel (MMOP) | 2023 | *(Operational flight manual; internal flight rule)* | `needs_verification` |
| **ESA-HPS** | Human Physiology in Microgravity & Axial Skeleton Deconditioning Handbook | European Space Agency (ESA / EAC) | 2019 | *(ESA Astronaut Centre publication)* | `needs_verification` |

### Manual Verification Checklist for User / Reviewer
The following 3 sources do not possess permanently verified open-access URLs and must be checked against local agency repositories:
1. `NASA-HRP-CARDIO`: Confirm specific HRP evidence revision year (2021) and cardiovascular envelope tables.
2. `ISS-MEDB-7.1`: Multi-lateral medical operations protocol; verify open-source distribution status prior to publication.
3. `ESA-HPS`: ESA Human Physiology handbook; confirm pagination for axial spinal elongation and microgravity core temperature elevation.

---

## 3. Strict Safety Guarantees & Clinical Scope

1. **Zero Pharmacologic Dosing:** No medication names, dosing calculations, or prescription protocols exist anywhere within the application. All guidance is restricted to operational, postural, ergonomic, and non-pharmacologic countermeasures.
2. **Removed Unsupported Claims:**
   - Former reference to *"LBNP Chibis countermeasure: 20 mmHg for 2 hours"* has been **removed**.
   - Former reference to *"ensure 5 degree torso elevation"* has been **removed**.
   - Replaced with standard non-numeric protocol: *"Report new or worsening vision changes to the flight surgeon and continue your assigned countermeasures."*
3. **Transparent Decision Support:** All telemetry values not generated by live onboard avionics are explicitly marked `[Simulated]` or `Illustrative`. The system functions as operational decision support and human-system interface research, not a certified autonomous medical device.
