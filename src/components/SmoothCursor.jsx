import React,{useEffect,useRef} from "react";

export default function SmoothCursor(){
 const dot=useRef(null),ring=useRef(null);
 useEffect(()=>{
  if(!window.matchMedia('(pointer:fine)').matches||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const d=dot.current,r=ring.current;if(!d||!r)return;
  let mx=-100,my=-100,rx=-100,ry=-100,raf=0,visible=false;
  const interactive='a,button,input,textarea,select,summary,[role="button"],[data-cursor]';
  const move=e=>{
   mx=e.clientX;my=e.clientY;
   if(!visible){visible=true;d.dataset.show='1';r.dataset.show='1'}
   const hit=e.target.closest?.(interactive);
   r.dataset.active=hit?'1':'0';
  };
  const leave=()=>{visible=false;d.dataset.show='0';r.dataset.show='0'};
  const enter=()=>{visible=true;d.dataset.show='1';r.dataset.show='1'};
  const loop=()=>{
   rx+=(mx-rx)*.16;ry+=(my-ry)*.16;
   d.style.transform=`translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;
   r.style.transform=`translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
   raf=requestAnimationFrame(loop);
  };
  document.documentElement.classList.add('has-smooth-cursor');
  window.addEventListener('pointermove',move,{passive:true});
  document.addEventListener('mouseleave',leave);
  document.addEventListener('mouseenter',enter);
  raf=requestAnimationFrame(loop);
  return()=>{
   cancelAnimationFrame(raf);document.documentElement.classList.remove('has-smooth-cursor');
   window.removeEventListener('pointermove',move);document.removeEventListener('mouseleave',leave);document.removeEventListener('mouseenter',enter);
  };
 },[]);
 return <><span ref={ring} className="xy-cursor-ring" aria-hidden="true"/><span ref={dot} className="xy-cursor-dot" aria-hidden="true"/></>;
}
