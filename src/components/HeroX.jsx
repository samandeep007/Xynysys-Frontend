import React, { useEffect, useRef } from "react";

/**
 * V24 — reference-faithful continuous-ribbon construction.
 *
 * The approved reference visually reads as two glass ribbons crossing through
 * one another, not four disconnected polygons joined by a large center tile.
 * Keeping both diagonals continuous removes the visible center seams.
 */
export default function HeroX() {
  const host = useRef(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let raf = 0;

    const move = (event) => {
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--px", `${x * 100}%`);
        el.style.setProperty("--py", `${y * 100}%`);
        el.style.setProperty("--tilt-y", `${(x - .5) * .42}deg`);
        el.style.setProperty("--tilt-x", `${(.5 - y) * .30}deg`);
      });
    };

    const reset = () => {
      el.style.setProperty("--px", "56%");
      el.style.setProperty("--py", "47%");
      el.style.setProperty("--tilt-y", "0deg");
      el.style.setProperty("--tilt-x", "0deg");
    };

    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", reset);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <div ref={host} className="hero-x-v14 hero-x-v24" aria-hidden="true">
      <svg className="hero-x-v24-art" viewBox="0 0 390 340" role="presentation" focusable="false">
        <defs>
          {/* Ribbon A: upper-left dark glass -> lower-right violet */}
          <linearGradient id="v24RibbonA" x1=".08" y1=".06" x2=".92" y2=".94">
            <stop offset="0%" stopColor="#010408"/>
            <stop offset="24%" stopColor="#050a10"/>
            <stop offset="40%" stopColor="#08131f"/>
            <stop offset="49%" stopColor="#17154a"/>
            <stop offset="62%" stopColor="#301066"/>
            <stop offset="82%" stopColor="#5917a0"/>
            <stop offset="100%" stopColor="#5a308d"/>
          </linearGradient>

          {/* Ribbon B: upper-right deep blue -> lower-left cyan/blue */}
          <linearGradient id="v24RibbonB" x1=".91" y1=".03" x2=".09" y2=".97">
            <stop offset="0%" stopColor="#050d21"/>
            <stop offset="20%" stopColor="#0b1f4c"/>
            <stop offset="39%" stopColor="#123578"/>
            <stop offset="51%" stopColor="#1c49a7"/>
            <stop offset="69%" stopColor="#17459e"/>
            <stop offset="86%" stopColor="#1a54b8"/>
            <stop offset="100%" stopColor="#123479"/>
          </linearGradient>

          {/* Subtle center glass, much smaller than earlier versions */}
          <linearGradient id="v24Center" x1=".05" y1=".05" x2=".95" y2=".95">
            <stop offset="0%" stopColor="#3152c8"/>
            <stop offset="34%" stopColor="#4476ef"/>
            <stop offset="68%" stopColor="#4b5ed2"/>
            <stop offset="100%" stopColor="#382273"/>
          </linearGradient>

          {/* Localized reference lighting */}
          <radialGradient id="v24URGlow" cx="66%" cy="33%" r="43%">
            <stop offset="0%" stopColor="#bde8ff" stopOpacity=".86"/>
            <stop offset="10%" stopColor="#81caff" stopOpacity=".84"/>
            <stop offset="25%" stopColor="#4b9dff" stopOpacity=".70"/>
            <stop offset="49%" stopColor="#2c67df" stopOpacity=".40"/>
            <stop offset="77%" stopColor="#17397f" stopOpacity=".10"/>
            <stop offset="100%" stopColor="#17397f" stopOpacity="0"/>
          </radialGradient>

          <radialGradient id="v24LLGlow" cx="26%" cy="82%" r="35%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity=".98"/>
            <stop offset="7%" stopColor="#e8fbff" stopOpacity=".98"/>
            <stop offset="16%" stopColor="#8ce8ff" stopOpacity=".92"/>
            <stop offset="32%" stopColor="#4eacff" stopOpacity=".76"/>
            <stop offset="57%" stopColor="#286de9" stopOpacity=".39"/>
            <stop offset="82%" stopColor="#173d99" stopOpacity=".08"/>
            <stop offset="100%" stopColor="#173d99" stopOpacity="0"/>
          </radialGradient>

          <radialGradient id="v24LRGlow" cx="82%" cy="86%" r="37%">
            <stop offset="0%" stopColor="#fff5ff" stopOpacity=".95"/>
            <stop offset="8%" stopColor="#ffc7ff" stopOpacity=".93"/>
            <stop offset="18%" stopColor="#b879d6" stopOpacity=".87"/>
            <stop offset="37%" stopColor="#8a4fd0" stopOpacity=".66"/>
            <stop offset="63%" stopColor="#6d3da9" stopOpacity=".31"/>
            <stop offset="86%" stopColor="#5616a4" stopOpacity=".06"/>
            <stop offset="100%" stopColor="#5616a4" stopOpacity="0"/>
          </radialGradient>

          <radialGradient id="v24CenterGlow" cx="54%" cy="33%" r="66%">
            <stop offset="0%" stopColor="#f4fbff" stopOpacity=".40"/>
            <stop offset="14%" stopColor="#badfff" stopOpacity=".31"/>
            <stop offset="34%" stopColor="#78a7ff" stopOpacity=".18"/>
            <stop offset="74%" stopColor="#566aff" stopOpacity=".05"/>
            <stop offset="100%" stopColor="#566aff" stopOpacity="0"/>
          </radialGradient>

          <radialGradient id="v24Hover" cx="var(--px)" cy="var(--py)" r="42%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity=".055"/>
            <stop offset="18%" stopColor="#dcefff" stopOpacity=".026"/>
            <stop offset="48%" stopColor="#9abbff" stopOpacity=".008"/>
            <stop offset="100%" stopColor="#9abbff" stopOpacity="0"/>
          </radialGradient>

          {/* Slow internal shine */}
          <linearGradient id="v24Shine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0"/>
            <stop offset="41%" stopColor="#ffffff" stopOpacity="0"/>
            <stop offset="50%" stopColor="#f4fcff" stopOpacity=".20"/>
            <stop offset="60%" stopColor="#b1ddff" stopOpacity=".065"/>
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
          </linearGradient>

          <linearGradient id="v24EdgeBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a7eeff"/>
            <stop offset="48%" stopColor="#7baaff"/>
            <stop offset="100%" stopColor="#5865ff"/>
          </linearGradient>

          <linearGradient id="v24EdgePurple" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7a82ff"/>
            <stop offset="54%" stopColor="#9c62c8"/>
            <stop offset="100%" stopColor="#ffb0ff"/>
          </linearGradient>

          <linearGradient id="v25SideBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9bdcff" stopOpacity=".72"/>
            <stop offset="100%" stopColor="#2b4f91" stopOpacity=".12"/>
          </linearGradient>

          <linearGradient id="v25SidePurple" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9562be" stopOpacity=".58"/>
            <stop offset="100%" stopColor="#381066" stopOpacity=".10"/>
          </linearGradient>

          {/* Exact outer diagonal bands from the supplied reference crop */}
          <clipPath id="v24RibbonAClip">
            <polygon points="70,46 144,42 368,315 274,307"/>
          </clipPath>
          <clipPath id="v24RibbonBClip">
            <polygon points="253,33 355,29 135,299 58,297"/>
          </clipPath>

          <linearGradient id="v24FloorUnified" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#286fff" stopOpacity="0"/>
            <stop offset="22%" stopColor="#286fff" stopOpacity=".65"/>
            <stop offset="50%" stopColor="#5a55ff" stopOpacity=".28"/>
            <stop offset="78%" stopColor="#9a35ff" stopOpacity=".65"/>
            <stop offset="100%" stopColor="#9a35ff" stopOpacity="0"/>
          </linearGradient>

          <filter id="v24Soft" x="-90%" y="-90%" width="280%" height="280%">
            <feGaussianBlur stdDeviation="8"/>
          </filter>

          <filter id="v24EdgeGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation=".72" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="v24Shadow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="7" stdDeviation="8" floodColor="#243dff" floodOpacity=".075"/>
          </filter>

          <filter id="v90ParticleGlow" x="-400%" y="-400%" width="800%" height="800%">
            <feGaussianBlur stdDeviation="2.4" result="b"/>
            <feMerge>
              <feMergeNode in="b"/>
              <feMergeNode in="b"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>


        <g className="v90-particle-orbit" transform="rotate(-7 207 170)">
          <ellipse className="v90-orbit-guide" cx="207" cy="170" rx="150" ry="94"/>
          <circle className="v90-orbit-particle" cx="356.79" cy="174.92" r="0.72"/>
          <circle className="v90-orbit-particle v90-orbit-purple" cx="286.49" cy="249.72" r="0.68"/>
          <circle className="v90-orbit-particle" cx="134.28" cy="252.21" r="0.7"/>
          <circle className="v90-orbit-particle v90-orbit-purple" cx="57.02" cy="168.36" r="0.65"/>
          <circle className="v90-orbit-particle" cx="129.74" cy="89.43" r="0.7"/>
          <circle className="v90-orbit-particle v90-orbit-purple" cx="272.76" cy="85.51" r="0.68"/>
          <circle className="v90-orbit-particle" cx="350.45" cy="142.52" r="0.66"/>
          <circle className="v90-orbit-particle" cx="356.63" cy="163.44" r="0.76"/>
        </g>

        {/* Unified floor light: centered under the full X so it remains aligned
            at every responsive scale instead of drifting as two separate ellipses. */}
        <ellipse className="v24-floor v24-floor-unified" cx="212" cy="316" rx="158" ry="13"/>
        <ellipse className="v24-floor v24-floor-contact v24-floor-contact-blue" cx="103" cy="307" rx="48" ry="5"/>
        <ellipse className="v24-floor v24-floor-contact v24-floor-contact-purple" cx="317" cy="316" rx="52" ry="5"/>

        <g className="v24-x" filter="url(#v24Shadow)">
          {/* BOTTOM RIBBON: upper-left -> lower-right */}
          <polygon
            className="v24-ribbon v24-ribbon-a"
            points="70,46 144,42 368,315 274,307"
            fill="url(#v24RibbonA)"
          />

          {/* Ribbon-A facets */}
          <polygon className="v24-facet v24-a-facet-1" points="76,49 140,47 196,113 158,158"/>
          <polygon className="v24-facet v24-a-facet-2" points="211,220 278,300 359,309 245,174"/>

          {/* TOP RIBBON: upper-right -> lower-left */}
          <polygon
            className="v24-ribbon v24-ribbon-b"
            points="253,33 355,29 135,299 58,297"
            fill="url(#v24RibbonB)"
          />

          {/* Ribbon-B facets */}
          <polygon className="v24-facet v24-b-facet-1" points="257,38 346,35 241,166 204,111"/>
          <polygon className="v24-facet v24-b-facet-2" points="194,216 132,292 67,293 158,169"/>

          {/* Local light inside the continuous ribbons */}
          <rect width="390" height="340" fill="url(#v24URGlow)" clipPath="url(#v24RibbonBClip)"/>
          <rect width="390" height="340" fill="url(#v24LLGlow)" clipPath="url(#v24RibbonBClip)"/>
          <rect width="390" height="340" fill="url(#v24LRGlow)" clipPath="url(#v24RibbonAClip)"/>

          {/* Subtle pointer response, clipped to each ribbon */}
          <g className="v24-hover-light">
            <rect width="390" height="340" fill="url(#v24Hover)" clipPath="url(#v24RibbonAClip)"/>
            <rect width="390" height="340" fill="url(#v24Hover)" clipPath="url(#v24RibbonBClip)"/>
          </g>

          {/* Slow shine passes through both continuous ribbons */}
          <g className="v24-shine v24-shine-a" clipPath="url(#v24RibbonAClip)">
            <rect className="v24-shine-strip" x="-155" y="-75" width="82" height="510" fill="url(#v24Shine)"/>
          </g>
          <g className="v24-shine v24-shine-b" clipPath="url(#v24RibbonBClip)">
            <rect className="v24-shine-strip" x="-155" y="-75" width="82" height="510" fill="url(#v24Shine)"/>
          </g>

          {/* Thickness cues exactly where the reference has them */}
          <polygon className="v24-bevel v24-bevel-ul" points="144,42 151,47 368,315 360,309"/>
          <polygon className="v24-bevel v24-bevel-ur" points="355,29 348,35 135,299 130,303"/>

          {/* Subtle 3D thickness faces — geometry stays identical from the front. */}
          <polygon className="v25-depth v25-depth-ul" points="70,46 144,42 151,47 76,51" fill="url(#v25SideBlue)"/>
          <polygon className="v25-depth v25-depth-ur" points="253,33 355,29 348,35 257,39" fill="url(#v25SideBlue)"/>
          <polygon className="v25-depth v25-depth-ll" points="58,297 135,299 130,303 52,301" fill="url(#v25SideBlue)"/>
          <polygon className="v25-depth v25-depth-lr" points="274,307 368,315 362,320 279,313" fill="url(#v25SidePurple)"/>

          {/* Compact center face overlays the crossing, without cutting the ribbons. */}
          <polygon
            className="v24-center"
            points="198,108 241,166 199,216 158,162"
            fill="url(#v24Center)"
          />
          <polygon
            className="v24-center-inner"
            points="199,116 233,166 199,207 166,162"
          />
          <polygon
            className="v24-center-light"
            points="198,108 241,166 199,216 158,162"
            fill="url(#v24CenterGlow)"
          />

          {/* Precision outer edges */}
          <polyline className="v24-edge v24-edge-ul" points="70,46 144,42 198,108"/>
          <polyline className="v24-edge v24-edge-ur" points="253,33 355,29 241,166"/>
          <polyline className="v24-edge v24-edge-ll" points="58,297 135,299 199,216"/>
          <polyline className="v24-edge v24-edge-lr" points="199,216 274,307 368,315"/>

          {/* Small static glass streaks from the reference */}
          <path className="v24-streak v24-streak-ur" d="M330 48 L246 157"/>
          <path className="v24-streak v24-streak-ll" d="M182 211 L126 286"/>
          <path className="v24-streak v24-streak-lr" d="M219 224 L286 298"/>
        </g>
      </svg>
    </div>
  );
}
