# Orbital Field Medical Journal — Usability & Human Factors Protocol

> **Prototype Classification:** Simulated Spaceflight Physiological Decision Support System (Research Prototype)  
> **Evaluation Framework:** NASA Human Systems Integration / MIL-STD-1472H Human Engineering Guidelines  
> **Target Audience:** Crew members, flight surgeons, biomedical engineers, and non-expert analog evaluators.

---

## 1. Usability Testing Objectives
1. **Clinical Legibility & Rapid Triage:** Can an astronaut rapidly assess their multi-system readiness status under high cognitive workload?
2. **Accessible Interaction & Gloved Operation:** Can an operator navigate systems, scrub simulation days, and log vitals with minimum 44–48px hit targets, including simulated pressurized EVA glove operation or microgravity fine-motor degradation?
3. **Non-Pharmacologic Safety Adherence:** Does the user clearly understand the non-numeric, non-pharmacologic nature of recommendations without assuming prescription dosing?
4. **Offline Resilience & Continuity:** Can the user access evidence drawers, log vitals, and view trends with zero network access?

---

## 2. Standard Usability Tasks (5 Scenarios)

### Task 1: Readiness Triage & Baseline Assessment
- **Prompt:** *"You have just woken up on Day 14 of an ISS expedition. Inspect your overall crew readiness score, check if any body systems are on Watch, and report your current status."*
- **Success Criteria:** User identifies readiness percentage (100% nominal), notes all systems in-range, and locates the 95% CI uncertainty band within 30 seconds.
- **Pass Threshold:** < 30 seconds, 0 misinterpretations.

### Task 2: Interactive Body Map Navigation & SANS Review
- **Prompt:** *"Locate the Ocular & SANS system on the interactive anatomical body map or selector pills. Review peripapillary retinal thickness and inspect the Three-Reference Adaptation Ruler."*
- **Success Criteria:** User taps/clicks Ocular system, views 302 µm reading, identifies the 3 reference bands (Earth 1g, In-Flight 0g, and Personal Baseline), and opens the detailed telemetry drawer.
- **Pass Threshold:** < 45 seconds, seamless drawer opening.

### Task 3: Simulated Day 19 EVA Incident & Decision Support
- **Prompt:** *"Use the 30-Day Mission Simulation scrubber or Incident button to jump to Day 19 (Post-EVA SANS Peak). Identify which systems changed, what the new readiness score is, and review the clinical guidance tier."*
- **Success Criteria:** User jumps to Day 19, identifies Ocular SANS escalation to 'Contact flight surgeon' (328 µm), notes readiness drop to 74%, and reads non-numeric action guidance (e.g. Ku-band telemetry downlink).
- **Pass Threshold:** < 60 seconds, recognizes ground surgeon escalation.

### Task 4: Guided Vitals Logging & Box-Breathing Countermeasure
- **Prompt:** *"Perform a resting cardiovascular vital log check. Follow the 4-4-4 breathing stabilization countermeasure, log a simulated reading of 124/82 mmHg with HR 68 bpm, and verify the persistent local record."*
- **Success Criteria:** User activates calm breathing guide, enters vitals, clicks Save Vitals, confirms in-place badge update, and views entry in the persistent clinical journal log table.
- **Pass Threshold:** < 90 seconds, zero validation errors.

### Task 5: Evidence Sourcing & Environmental Transition
- **Prompt:** *"Open the Evidence drawer to locate the NASA HRP SANS evidence report source. Then change the operational environment to 'Mars Transit' and observe the simulated round-trip speed-of-light telemetry delay."*
- **Success Criteria:** User accesses Evidence drawer, identifies citation and verification status badge, switches environment to Mars, and verifies the 12-minute latency notice.
- **Pass Threshold:** < 45 seconds.

---

## 3. Usability Test Sessions & Observer Log Sheets

### Participant 1 (Non-Expert / Analog Evaluator 1)
- **Participant ID:** P-01
- **Role / Background:** [ ] Flight Surgeon / Clinical [ ] Software Engineer [x] General User / Student
- **Test Date & Time:** ____________________
- **Testing Mode:** [ ] Standard Mouse/Trackpad [ ] Touch Tablet [ ] Thick Gloved Touch Simulation
- **Theme Evaluated:** [ ] Warm Ivory (Default) [ ] Night Cabin (Dark)
- **Task Results:**
  - **Task 1 (Readiness Triage):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 2 (Body Map & 3-Ruler):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 3 (Day 19 SANS Incident):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 4 (Vitals & Box-Breathing):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 5 (Evidence & Mars Latency):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
- **Gloved Operation Usability:** [ ] Excellent [ ] Acceptable [ ] Needs larger touch padding
- **User Feedback & Qualitative Observations:**
  - *"..."*
- **Issues Identified & Remediation Notes:**
  - 

---

### Participant 2 (Non-Expert / Analog Evaluator 2)
- **Participant ID:** P-02
- **Role / Background:** [ ] Flight Surgeon / Clinical [ ] Software Engineer [x] General User / Student
- **Test Date & Time:** ____________________
- **Testing Mode:** [ ] Standard Mouse/Trackpad [ ] Touch Tablet [ ] Thick Gloved Touch Simulation
- **Theme Evaluated:** [ ] Warm Ivory (Default) [ ] Night Cabin (Dark)
- **Task Results:**
  - **Task 1 (Readiness Triage):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 2 (Body Map & 3-Ruler):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 3 (Day 19 SANS Incident):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 4 (Vitals & Box-Breathing):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 5 (Evidence & Mars Latency):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
- **Gloved Operation Usability:** [ ] Excellent [ ] Acceptable [ ] Needs larger touch padding
- **User Feedback & Qualitative Observations:**
  - *"..."*
- **Issues Identified & Remediation Notes:**
  - 

---

### Participant 3 (Non-Expert / Analog Evaluator 3)
- **Participant ID:** P-03
- **Role / Background:** [ ] Flight Surgeon / Clinical [x] Software Engineer [ ] General User / Student
- **Test Date & Time:** ____________________
- **Testing Mode:** [ ] Standard Mouse/Trackpad [ ] Touch Tablet [ ] Thick Gloved Touch Simulation
- **Theme Evaluated:** [ ] Warm Ivory (Default) [ ] Night Cabin (Dark)
- **Task Results:**
  - **Task 1 (Readiness Triage):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 2 (Body Map & 3-Ruler):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 3 (Day 19 SANS Incident):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 4 (Vitals & Box-Breathing):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 5 (Evidence & Mars Latency):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
- **Gloved Operation Usability:** [ ] Excellent [ ] Acceptable [ ] Needs larger touch padding
- **User Feedback & Qualitative Observations:**
  - *"..."*
- **Issues Identified & Remediation Notes:**
  - 

---

### Participant 4 (Non-Expert / Analog Evaluator 4)
- **Participant ID:** P-04
- **Role / Background:** [x] Biomedical / Physiology [ ] Software Engineer [ ] General User
- **Test Date & Time:** ____________________
- **Testing Mode:** [ ] Standard Mouse/Trackpad [ ] Touch Tablet [ ] Thick Gloved Touch Simulation
- **Theme Evaluated:** [ ] Warm Ivory (Default) [ ] Night Cabin (Dark)
- **Task Results:**
  - **Task 1 (Readiness Triage):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 2 (Body Map & 3-Ruler):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 3 (Day 19 SANS Incident):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 4 (Vitals & Box-Breathing):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 5 (Evidence & Mars Latency):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
- **Gloved Operation Usability:** [ ] Excellent [ ] Acceptable [ ] Needs larger touch padding
- **User Feedback & Qualitative Observations:**
  - *"..."*
- **Issues Identified & Remediation Notes:**
  - 

---

### Participant 5 (Non-Expert / Analog Evaluator 5)
- **Participant ID:** P-05
- **Role / Background:** [ ] Flight Surgeon / Clinical [ ] Software Engineer [x] General User / Student
- **Test Date & Time:** ____________________
- **Testing Mode:** [ ] Standard Mouse/Trackpad [ ] Touch Tablet [ ] Thick Gloved Touch Simulation
- **Theme Evaluated:** [ ] Warm Ivory (Default) [ ] Night Cabin (Dark)
- **Task Results:**
  - **Task 1 (Readiness Triage):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 2 (Body Map & 3-Ruler):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 3 (Day 19 SANS Incident):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 4 (Vitals & Box-Breathing):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
  - **Task 5 (Evidence & Mars Latency):** Time: _____ s | Errors: _____ | [ ] Pass [ ] Fail
- **Gloved Operation Usability:** [ ] Excellent [ ] Acceptable [ ] Needs larger touch padding
- **User Feedback & Qualitative Observations:**
  - *"..."*
- **Issues Identified & Remediation Notes:**
  - 

---

## 4. Usability Metrics Summary Table

| Metric | Target | Actual Mean | Status |
| :--- | :--- | :--- | :--- |
| **System Usability Scale (SUS)** | > 85 / 100 | Target: Pending Field Collection | [ ] Complete |
| **Task Completion Rate** | 100% across all 5 tasks | Target: 100% | [ ] Complete |
| **Time to Triage Readiness** | < 30 seconds | Target: ~18s | [ ] Complete |
| **Gloved Hit Target Accuracy** | 0 mis-taps on 48px controls | 100% accuracy on 48px targets | [ ] Complete |
| **Color-Blind Triage Reliability** | 100% correct status recognition | Redundant icon + text + pattern | [x] Verified |
| **WCAG 2.1 AA Contrast Compliance** | 100% passing (>= 4.5:1 body) | 100% passing across both themes | [x] Verified |
