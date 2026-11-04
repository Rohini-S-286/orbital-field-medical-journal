# Orbital Field Medical Journal — Design System & PWA

A warm, calm, editorial-clinical spaceflight crew health monitoring application and field medical journal for long-duration orbital missions (ISS, Lunar Gateway, and Mars transit).

---

## 1. Visual Identity & Editorial Metaphor

Unlike common sci-fi high-saturation neon dashboards that produce visual fatigue during long-duration spaceflight, the **Orbital Field Medical Journal** uses an archival, editorial-clinical aesthetic reminiscent of a masterfully printed field naturalist or clinical journal:
- **Warm Ivory Background (`#FBF6EA`)**: Soft paper tone, reducing glare and retinal strain in spacecraft habitats.
- **Subtle Paper Grain**: Micro-fractal SVG noise texture overlay simulating warm archival rag paper.
- **Raised Surfaces (`#FFFDF7`) & Subtle Borders (`#E8DFC9`)**: Clear visual hierarchy with soft warm shadows (`rgba(31, 42, 36, 0.06)`).
- **Stroked Emerald Line-Art**: Body map outline is rendered with thin emerald vector strokes (`#0B7A56`), with physiological systems tinted softly according to clinical status.
- **Restrained Vermillion**: Used strictly for genuine clinical alerts, emergency drills, and direct flight surgeon communication (maximum one prominent vermillion element per screen in nominal state).

---

## 2. Fixed Colour Palette & WCAG AA Contrast Compliance

All colours are defined as CSS custom properties (`--color-*`) and never hardcoded in markup or component styles:

| Token | Light Theme (Default Warm Ivory) | Dark Theme (Night Cabin Lighting) | Purpose & WCAG Contrast |
|---|---|---|---|
| `--color-bg` | `#FBF6EA` | `#0F1A15` | Background / Paper tone |
| `--color-surface` | `#FFFDF7` | `#16241D` | Raised surface / journal cards |
| `--color-border` | `#E8DFC9` | `#273A30` | Subtle borders & delimiters |
| `--color-ink` | `#1F2A24` (Deep green-black) | `#F4EEDD` (Ivory text) | Body text (WCAG AAA contrast > 13.7:1) |
| `--color-ink-muted` | `#4B5A51` | `#9BB0A3` | Clinical notes, metadata (WCAG AA > 5.8:1) |
| `--color-ink-faint` | `#44544A` | `#A3B5AA` | Darkened secondary metadata (WCAG AA > 6.5:1) |
| `--color-emerald` | `#0B7A56` (hover `#095F43`) | `#149B6F` (hover `#17B280`) | Primary brand, healthy / in-range |
| `--color-emerald-tint` | `#DDF1E8` | `rgba(20, 155, 111, 0.22)` | In-range status backgrounds |
| `--color-vermillion` | `#E34234` (hover `#C2352A`) | `#F05A4D` (hover `#FF6E62`) | Alerts, flight surgeon, emergency icons/borders |
| `--color-vermillion-text`| `#B42318` | `#FF7D72` | Darkened alert text (WCAG AA > 5.5:1 on light paper) |
| `--color-ochre` | `#C98A1B` (tint `#F7EBCF`) | `#E09F2B` (tint `rgba(224, 159, 43, 0.22)`) | **ONLY for "Attention / Watch"** status |
| `--color-ochre-text` | `#855500` | `#F2B44B` | Darkened attention text (WCAG AA > 5.6:1 on light paper) |

---

## 3. Red-Green Colour Blindness Redundancy (Status System)

Colour is **never** the sole signal. Every status indicator enforces four simultaneous channels of recognition:

1. **In range**:
   - Color: Emerald Green (`#0B7A56`)
   - Icon: Check-Circle (`✓`)
   - Text Label: `"In range"` / `"Within expected range"`
   - Border: Solid thin border
2. **Attention**:
   - Color: Muted Ochre (`#C98A1B`, text `#855500`)
   - Icon: Alert Triangle (`⚠`)
   - Text Label: `"Watch"`
   - Border: Dashed border
3. **Contact Flight Surgeon**:
   - Color: Vermillion (`#E34234`, text `#B42318`)
   - Icon: Telephone receiver (`📞`)
   - Text Label: `"Contact flight surgeon"`
   - Border: Prominent 2px border
4. **Emergency**:
   - Color: Solid Vermillion fill
   - Icon: Siren / Hexagonal Hazard glyph (`🚨`)
   - Text Label: `"Emergency"`
   - Border & Pattern: High-contrast 45° diagonal hatch pattern + rhythmic pulse shadow ring.

### Charts & Telemetry Curves
- **Nominal Baseline**: Solid emerald line with circular points (`●`).
- **Attention / Watch**: Dashed ochre line (`stroke-dasharray: 8 5`) with diamond points (`◆`).
- **Surgeon Alert / Limit**: Dotted vermillion line (`stroke-dasharray: 3 4`) with triangle points (`▲`).

---

## 4. Status Engine & Clinical Knowledge Base

- **Reference Ranges (`clinical-ranges.js`)**:
  - Each indicator stores: Earth nominal range, expected in-flight adaptation range, personal baseline, source ID, and confidence rating.
  - Sourced from NASA-STD-3001, NASA HRP SANS Evidence Reports, NASA HRP Cardiovascular Reports, ISS MedB-7.1, and ESA Human Physiology in Space.
- **Status Classification**:
  - Validates impossible clinical values (systolic 50–260, diastolic 30–160, systolic > diastolic, HR 30–240, SpO2 50–100%).
  - Evaluates systolic BP, diastolic BP, resting HR, and SpO2 into the 4 clinical tiers.
  - Updates overall readiness from the physiological status across all 6 systems (never from merely logging data).
- **Persistent Local Telemetry Log**:
  - Saved safely to `localStorage` with `try / catch` error handling.
  - Displayed in a table on the dashboard showing timestamp, vitals, and evaluated status.
- **Evidence Drawer & Tiered Guidance**:
  - Full evidence drawer detailing all medical literature references.
  - Tiered clinical decision guidance: Routine, Self-care, Contact flight surgeon, Emergency.
  - Strictly **no drug dosing** included.
- **Disclaimers**:
  - Clear notice: "Decision Support System — For Research & Field Demonstration. Not a Certified Medical Diagnostic Device. All values are simulated."
  - Replaced "Fit for Duty" with "Within expected range".
  - Illustrative values labeled as `[Simulated]`.

---

## 5. Space Usability & Accessibility

- **48px Minimum Touch Targets**: All buttons, legend chips, close buttons, and steppers have a minimum size of **48 × 48px** for pressurized space gloves.
- **Modal Focus Management**: Closed modals and drawers use `visibility: hidden;` preventing keyboard/screen reader focus leaks. Focus is saved and restored upon open/close.
- **Keyboard Shortcuts**: `D` toggles Day/Night Cabin mode without interfering with standard browser shortcuts (`Ctrl+D`). `Esc` closes any active modal or drawer.
- **Mathematical Ring Constant**: Single radius $r = 76$ and circumference $C = 477.52$ shared across CSS and JavaScript.
- **Offline PWA**: Full service worker (`sw.js`) pre-caches all code and data, with cache-first font caching.

---

## 6. Quick Start

Run the included local Python server:
```powershell
py serve.py
```
Or open `index.html` directly in any web browser.
Access URL: **`http://localhost:8080/index.html`**
