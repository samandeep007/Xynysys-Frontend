import React,{useEffect,useRef} from "react";

export default function HeroParticles(){
 const ref=useRef(null);
 useEffect(()=>{
  const c=ref.current,hst=c?.parentElement;
  if(!c||!hst)return;

  const x=c.getContext("2d",{alpha:true});
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse=matchMedia("(pointer:coarse)").matches;

  let raf=0,w=1,h=1,dpr=1,last=0,pts=[],visible=true;
  const m={x:0,y:0,tx:0,ty:0,on:false};

  const resize=()=>{
   const r=hst.getBoundingClientRect();
   w=Math.max(1,r.width);h=Math.max(1,r.height);
   dpr=coarse?1:Math.min(devicePixelRatio||1,1.5);
   c.width=Math.round(w*dpr);c.height=Math.round(h*dpr);
   c.style.width=w+"px";c.style.height=h+"px";
   x.setTransform(dpr,0,0,dpr,0,0);

   const divisor=coarse?42000:21000;
   const min=coarse?18:32,max=coarse?38:72;
   const n=Math.max(min,Math.min(max,Math.round(w*h/divisor)));
   pts=Array.from({length:n},()=>({
    x:Math.random()*w,y:Math.random()*h,
    vx:(Math.random()-.5)*(coarse?.028:.055),
    vy:(Math.random()-.5)*(coarse?.024:.045),
    r:.55+Math.random()*(coarse?.85:1.25),
    a:.15+Math.random()*(coarse?.26:.42),
    p:Math.random()*6.283,d:.25+Math.random()*.75
   }));
   m.x=m.tx=w*.72;m.y=m.ty=h*.46;
  };

  const move=e=>{
   if(coarse)return;
   const r=hst.getBoundingClientRect();
   m.tx=e.clientX-r.left;m.ty=e.clientY-r.top;m.on=true;
   hst.style.setProperty("--hero-mx",`${(m.tx/w)*100}%`);
   hst.style.setProperty("--hero-my",`${(m.ty/h)*100}%`);
  };
  const leave=()=>{
   m.on=false;m.tx=w*.72;m.ty=h*.46;
   hst.style.setProperty("--hero-mx","72%");
   hst.style.setProperty("--hero-my","46%");
  };

  const draw=(t=0)=>{
   raf=requestAnimationFrame(draw);
   if(!visible||document.hidden)return;
   const frameBudget=coarse?42:0; // ~24fps on touch, full refresh on desktop
   if(frameBudget && t-last<frameBudget)return;

   const dt=Math.min(42,t-last||16);last=t;
   x.clearRect(0,0,w,h);
   m.x+=(m.tx-m.x)*.055;m.y+=(m.ty-m.y)*.055;

   for(const p of pts){
    if(!reduce){
     p.x+=p.vx*dt*p.d;p.y+=p.vy*dt*p.d;
    }
    if(p.x<-12)p.x=w+12;if(p.x>w+12)p.x=-12;
    if(p.y<-12)p.y=h+12;if(p.y>h+12)p.y=-12;

    let px=p.x,py=p.y;
    if(!coarse&&m.on){
     const dx=p.x-m.x,dy=p.y-m.y,dist=Math.hypot(dx,dy)||1;
     if(dist<160){
      const f=1-dist/160;
      px+=dx/dist*f*15*p.d;py+=dy/dist*f*15*p.d;
     }
     if(dist<112&&p.d>.52){
      x.beginPath();x.moveTo(px,py);x.lineTo(m.x,m.y);
      x.strokeStyle=`rgba(105,126,184,${(1-dist/112)*.05})`;
      x.lineWidth=.5;x.stroke();
     }
    }

    const tw=.76+.24*Math.sin(t*.00075+p.p);
    if(p.d>.48){
     x.beginPath();x.arc(px,py,p.r*(coarse?2.6:3.4),0,6.283);
     x.fillStyle=`rgba(100,116,255,${p.a*tw*(coarse?.12:.16)})`;x.fill();
    }
    x.beginPath();x.arc(px,py,p.r,0,6.283);
    x.fillStyle=`rgba(${p.d>.68?"151,132,255":"151,179,235"},${Math.min(.78,p.a*tw*1.35)})`;x.fill();
   }

   // The radial cursor field is intentionally desktop-only; creating this
   // gradient every frame is disproportionately expensive on mobile Safari.
   if(!coarse&&m.on){
    const g=x.createRadialGradient(m.x,m.y,0,m.x,m.y,180);
    g.addColorStop(0,"rgba(76,103,190,.052)");
    g.addColorStop(.5,"rgba(82,71,177,.022)");
    g.addColorStop(1,"rgba(0,0,0,0)");
    x.fillStyle=g;x.fillRect(m.x-180,m.y-180,360,360);
   }
  };

  resize();
  const ro=new ResizeObserver(resize);ro.observe(hst);
  const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting},{rootMargin:"80px"});
  io.observe(hst);
  if(!coarse){
   hst.addEventListener("pointermove",move,{passive:true});
   hst.addEventListener("pointerleave",leave,{passive:true});
  }
  raf=requestAnimationFrame(draw);

  return()=>{
   cancelAnimationFrame(raf);ro.disconnect();io.disconnect();
   if(!coarse){
    hst.removeEventListener("pointermove",move);
    hst.removeEventListener("pointerleave",leave);
   }
  };
 },[]);

 return <canvas ref={ref} className="hero-particles-v40" aria-hidden="true"/>;
}
