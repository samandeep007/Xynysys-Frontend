import {useEffect} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SiteMotion(){
 useEffect(()=>{
  const path=window.location.pathname;
  if(path.startsWith("/admin")||path==="/")return;

  const ctx=gsap.context(()=>{
   const mm=gsap.matchMedia();

   mm.add("(prefers-reduced-motion: no-preference)",()=>{
    const coarse=matchMedia("(pointer:coarse)").matches;
    const d=coarse?18:36;
    const dur=coarse?.38:.58;

    const bind=()=>{
     const sections=gsap.utils.toArray("main section,.corporate-page main>section,.detail-page>section,.case-page>section,.article-page>section,.booking-page section");

     sections.forEach((section,index)=>{
      if(section.dataset.v90Motion==="1")return;
      section.dataset.v90Motion="1";

      const tl=gsap.timeline({
       scrollTrigger:{trigger:section,start:coarse?"top 94%":"top 89%",once:true,invalidateOnRefresh:true}
      });

      const headings=[...section.querySelectorAll("h1,h2,.eyebrow,.story-kicker,header>p")].filter(el=>!el.closest("article,.service-index-grid>a,.work-grid>a,.insight-grid>a"));
      const cards=[...section.querySelectorAll(".service-index-grid>a,.related-work a,.insight-grid>a,.work-grid>a,.career-card,article")];
      const media=[...section.querySelectorAll("figure,img,.detail-visual,.case-visual,.article-visual,.booking-panel")].filter(el=>!el.closest("article,.service-index-grid>a,.work-grid>a,.insight-grid>a"));

      if(headings.length){
       tl.from(headings,{
        x:index%2?d:-d,
        y:12,
        autoAlpha:0,
        stagger:.055,
        duration:dur,
        ease:"power3.out",
        clearProps:"transform,opacity,visibility"
       });
      }

      cards.forEach((card,i)=>{
       const parts=card.querySelectorAll("span,h3,h4,p,strong,small,svg,img,figure");
       if(parts.length)tl.from(parts,{
        y:12+(i%2)*3,
        x:i%2?8:-8,
        autoAlpha:0,
        stagger:.03,
        duration:dur*.52,
        ease:"power2.out",
        clearProps:"transform,opacity,visibility"
       },.08+i*.035);
      });

      if(media.length)tl.from(media,{
       autoAlpha:0,
       y:16,
       duration:dur*.72,
       stagger:.05,
       clearProps:"transform,opacity,visibility"
      },.12);
     });

     ScrollTrigger.refresh();
    };

    bind();
    let raf=0;
    const observer=new MutationObserver(()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(bind)});
    observer.observe(document.getElementById("root")||document.body,{subtree:true,childList:true});
    return()=>{cancelAnimationFrame(raf);observer.disconnect()};
   });

   return()=>mm.revert();
  });

  return()=>ctx.revert();
 },[]);

 return null;
}
