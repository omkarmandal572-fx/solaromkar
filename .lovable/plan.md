# Earth cycles, lunar phases, and deep-time timeline

## What will change
- Make Earth’s illuminated hemisphere follow its real sidereal rotation relative to the Sun.
- Keep the Moon tidally locked while its 27.32-day orbit produces a changing illuminated phase.
- Add live Earth-card readouts for local Kolkata day/night, solar time, Moon phase name, illumination percentage, and lunar age.
- Expand the deep-time slider with dated cosmic and geological milestones: Solar System formation, Moon-forming impact, crust and oceans, earliest life, oxygenation, complex life, and the present.
- Link the timeline and mission clock bidirectionally so either control updates the same simulated date and current historical event.
- Preserve the real J2000 constellation geometry and re-render it over the supplied night-sky diffuse/bump sphere once those files are uploaded.

## Interaction and layout
- Earth’s card will refresh while open without interrupting camera tracking.
- Returning the history slider to today restores the dated sky and allows the mission clock to resume.
- Historical dates will use readable geological units and show event ages with source-conscious uncertainty wording where scientific estimates vary.
- Controls will remain usable without overlap on narrow screens.

## Technical details
- Derive solar longitude from Earth’s orbital position and Earth rotation from the shared simulation-day value.
- Derive lunar elongation, synodic age, phase name, and illuminated fraction from the Moon–Earth–Sun geometry.
- Store events as ages before present and use interval-aware selection rather than only nearest-event matching.
- Use a textured inward-facing celestial sphere for uploaded equirectangular diffuse and bump maps; constellation lines, catalogue stars, and labels remain separate overlays so coordinates stay accurate.

## Blocked input
- The requested personal night-sky diffuse and bump maps are not attached. The app will keep its current catalogue sky until both files are uploaded; no substitute images will be invented.

## Validation
- Check the Earth card at multiple simulated dates, including new, quarter, and full Moon phases.
- Check the history slider at formation, Moon formation, ocean formation, and present day.
- Verify desktop and mobile rendering, controls, and browser errors.
