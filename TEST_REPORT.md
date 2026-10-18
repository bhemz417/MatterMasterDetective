# Matter Detective 3.3 — Test and Scientific-Accuracy Report

**Updated: 18 October 2026**  
**Scope:** OER with new evaporation question and tighter solid particles; other questions, larger simulation, and replayable missions preserved.

## Verified in this environment

| Check | Result | How verified |
|---|---|---|
| Dependency-free tests | **PASS: 24 of 24** | `npm run smoke` with Node.js; includes 5 structural replay/layout checks |
| Questions | **PASS** | Original specimen, ice, balloon and Final Boss questions preserved; only Vanishing Puddle question replaced (correct answer remains B) |
| Particle count | **PASS** | Exactly 30 particles in each solid, liquid and gas model |
| Particle arrangement | **PASS** | Solid fixed-position cluster; liquid close to bottom; gas distributed through container |
| Particle simulation update | **PASS** | Liquid/gas motion and containment after 180 simulation steps; no lost particles or non-finite positions |
| Scientific descriptions | **PASS** | Vibration / sliding / free movement each presented correctly for|
| Mission briefing | **PASS** | Exact original welcome paragraphs and title retained |
| Scoring and badges | **PASS** | Five badges, duplicate-safe score, boss unlock, final certificate and score maximum 750 |
| Certificate SVG | **PASS** | Student name XML-escaped and score present |
| Node API | **PASS** | Health, briefing, resource attribution, and 404 endpoint checks |
| JS/JSX parsing | **PASS** | TypeScript compiler parser successfully parsed 21 JS/JSX modules |
| Local imports | **PASS** | All 27 checked relative import paths resolved |
| CSS parsing | **PASS** | `styles.css`, `modern.css`, `kids.css`, and `replay-and-space.css` parsed without top-level syntax errors |
| Replay / reset contract checks | **PASS: 5 checks** | Verifies all completed-mission guards, replay actions, reset handling, duplicate scoring, and enlarged simulation CSS. These are source-level checks, not browser interaction tests. |
| ZIP archive integrity | **PASS** | Validated during final archive creation |

## Science-model limitations

The particle graphic is a **conceptual classroom animation**, not a molecular-dynamics research simulation. It depicts the same 30 equal-sized water-molecule dots to teach that matter is conserved when state changes. The simplified model switches between single-state views at water's familiar temperature boundaries for normal atmospheric pressure. Real melting/boiling can involve mixed phases and latent heat. Water vapour itself is invisible. The gas-balloon/puddle/ice games are simplified thought experiments rather than calibrated physical lab apparatus.

## Cannot yet verify in this environment

- npm registry access failed because DNS could not resolve registry.npmjs.org (`EAI_AGAIN`); the Vite production build is therefore not verified here.
- The Vite production build, Vitest suite, and full React browser interactions were not executed here.
- Windows launcher has not been run on Windows (this build machine is Linux).
- Touchscreen, browser audio and certificate printing require on-device acceptance testing.

## v3.3 on-device acceptance checks

1. In the simulation, verify particle area is wide with the notes **underneath**. Test tablet and mobile widths, plus pause, slider and presets.
2. Complete the Particle Lab, return to it, select **Play this mission again**, and verify its first question reappears. Finish practice; your score must not increase. Repeat for melting, puddle, balloon and escape room.
3. Complete the Final Boss, view the certificate, select **Replay Final Boss** and answer the five original questions again. Your score remains unchanged.
4. On the Mission Map choose **Start a brand-new adventure**, confirm, and verify all badges/points reset, the simulation opens first, and activities can be completed again.
5. Refresh the browser to verify earned achievements persist until reset.

## Run on your own Windows computer

1. Extract the ZIP into its **own folder**, separate from the unrelated `react-example` / Vite 8 project.
2. Run `npm.cmd install` and `npm.cmd run dev`, then visit http://localhost:5173.
3. Verify the simulation opens first. Check ice (−12°C), water (25°C) and gas (110°C): all show the same 30 water particles.
4. In Particle Lab, solve the **three original sample questions**. Test pause/play, hints, repeat attempts and completion.
5. Solve melting, puddle, balloon and the 3-digit escape room. Collect five badges.
6. Finish the original five-question Final Boss and create and print/download the certificate.
7. Test phone-width layout and mute/unmute audio.
8. Run `npm.cmd run check` to execute all installed tests and build the frontend; this confirms the parts not verified here.

**Status:** Source, game-scoring and particle-model checks passed. Full end-to-end runtime remains **unverified** until installation and browser checks complete.

## v3.3-specific verification

- New evaporation-versus-freezing-versus-condensation question is present and uses answer B.
- Solid grid centres are separated by 20.5 units, strictly more than particle diameter (19), and stay inside the container.
- The liquid and gas models were not changed.
- Replay, badges and scoring remain unchanged.

- User check: in Vanishing Puddle set warm sunshine and advance time until 60% evaporates. Confirm the new question offers Freezing / Evaporation / Condensation and answer B works. Replay the question without extra points.
