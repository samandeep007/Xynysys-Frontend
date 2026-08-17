import React from "react";

// V75: simplified single-layer architectural mesh.
// Fewer paths + one compositor-friendly parent animation avoids scroll jank.
const rows = Array.from({length: 12}, (_, i) => i);
const columns = Array.from({length: 7}, (_, i) => i);

function makeWavePath(i) {
  const y = 72 + i * 17.2;
  const a1 = 18 + Math.sin(i * .42) * 5;
  const a2 = 11 + Math.cos(i * .31) * 4;
  return `M-90 ${y}
    C 80 ${y-a1}, 190 ${y+a2}, 315 ${y-5}
    S 560 ${y+a1}, 735 ${y-12}
    S 1010 ${y+a2}, 1215 ${y-a1*.45}
    S 1390 ${y+8}, 1580 ${y-3}`;
}

export default function ApproachWave(){
  return (
    <svg className="approach-wave-v30 approach-wave-v75" viewBox="0 0 1500 340" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="approachWaveV75" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6aa9ff" stopOpacity=".14"/>
          <stop offset="32%" stopColor="#6f91ff" stopOpacity=".34"/>
          <stop offset="67%" stopColor="#8580ff" stopOpacity=".52"/>
          <stop offset="100%" stopColor="#bd5cff" stopOpacity=".66"/>
        </linearGradient>
        <linearGradient id="approachWaveFadeV75" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="black"/>
          <stop offset="12%" stopColor="white" stopOpacity=".55"/>
          <stop offset="27%" stopColor="white"/>
          <stop offset="90%" stopColor="white"/>
          <stop offset="100%" stopColor="black"/>
        </linearGradient>
        <mask id="approachWaveMaskV75"><rect width="1500" height="340" fill="url(#approachWaveFadeV75)"/></mask>
      </defs>
      <g className="approach-wave-mesh-v75" mask="url(#approachWaveMaskV75)" fill="none" stroke="url(#approachWaveV75)">
        {rows.map(i=><path key={`r-${i}`} d={makeWavePath(i)} strokeWidth={i%3===0?1.05:.72} opacity={i%2===0?.78:.5}/>) }
        {columns.map(i=>{
          const x=205+i*180, top=72+Math.sin(i*.7)*15, bottom=276+Math.cos(i*.48)*12;
          return <path key={`c-${i}`} d={`M${x} ${top} C ${x+18} ${top+52}, ${x-15} ${bottom-48}, ${x} ${bottom}`} strokeWidth=".65" opacity=".28"/>;
        })}
      </g>
    </svg>
  );
}
