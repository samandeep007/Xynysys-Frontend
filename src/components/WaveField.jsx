import React from "react";
export default function WaveField(){
  const lines=Array.from({length:30},(_,i)=>{
    const y=95+i*4;
    const a=16+Math.sin(i*.55)*18;
    return <path key={i} d={`M0 ${y} C150 ${y-a}, 250 ${y+a}, 410 ${y-a/2} S700 ${y+a}, 900 ${y-8} S1150 ${y+a/2}, 1400 ${y-12}`} />;
  });
  return <svg className="wave-field" viewBox="0 0 1400 260" preserveAspectRatio="none" aria-hidden="true">{lines}</svg>
}
