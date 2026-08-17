import React,{useEffect,useState} from "react";
import{cmsFetch,useSiteContent}from"../lib/cmsApi.js";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ArrowRight,Play,Code2,Cloud,ShieldCheck,BarChart3,PanelsTopLeft,Search,PenTool,Boxes,UploadCloud,Target,Sparkles,CalendarDays,HeartPulse,CreditCard,ShoppingCart,Package,Factory,Building2,GraduationCap,Car,BriefcaseBusiness,Store,House,Stethoscope} from "lucide-react";
import Header from "../shared/Header.jsx";
import Footer from "../shared/Footer.jsx";
import ContactForm from "../shared/ContactForm.jsx";
import HeroX from "../components/HeroX.jsx";
import HeroParticles from "../components/HeroParticles.jsx";
import ExperienceStory from "../components/ExperienceStory.jsx";
import CapabilityShowcaseV93 from "../components/CapabilityShowcaseV93.jsx";
import ApproachSystemV96 from "../components/ApproachSystemV96.jsx";
import SystemBuilder from "../components/SystemBuilder.jsx";
import WelcomeModal from "../components/WelcomeModal.jsx";
gsap.registerPlugin(ScrollTrigger);
const solutions=[
["Custom Software Development","Secure, scalable software engineered around the business instead of forcing the business around the software.",Code2],
["Cloud & DevOps Engineering","Cloud-native architecture, delivery pipelines and infrastructure designed for reliability and velocity.",Cloud],
["Cybersecurity Solutions","Security practices embedded into applications, data flows, infrastructure and operational processes.",ShieldCheck],
["Data & AI Engineering","Data systems and practical AI workflows that turn information into faster, clearer decisions.",BarChart3],
["Product Design & Experience","Digital experiences shaped around real users, real journeys and measurable business outcomes.",PanelsTopLeft]
];
const process=[["Discover","Business goals become a precise problem statement.",Search],["Design","The experience and architecture are shaped before expensive engineering.",PenTool],["Build","The system is engineered in disciplined, testable increments.",Boxes],["Deploy","Infrastructure, security and releases are prepared for production.",UploadCloud],["Optimize","Real usage informs the next iteration and the next advantage.",Target]];

const heroIndustries=[
 ["Healthcare",HeartPulse],
 ["Fintech",CreditCard],
 ["E-commerce",ShoppingCart],
 ["SaaS",Cloud],
 ["Logistics",Package],
 ["Manufacturing",Factory],
 ["Real Estate",Building2],
 ["Education",GraduationCap],
 ["Automotive",Car],
 ["Professional Services",BriefcaseBusiness],
 ["Retail",Store],
 ["Local Business",House]
];

export default function HomePage(){
 const [projects,setProjects]=useState([]),[testimonials,setTestimonials]=useState([]),[insights,setInsights]=useState([]);
 const site=useSiteContent(),homeCopy=site?.home||{},globalCopy=site?.global||{};
 const heroCopy=homeCopy.hero||{},growthCopy=homeCopy.growth||{},solutionsCopy=homeCopy.solutions||{},processCopy=homeCopy.process||{},systemsCopy=homeCopy.systems||{},contactCopy=homeCopy.contact||{};
 useEffect(()=>{cmsFetch("/api/featured").then(r=>r.ok?r.json():[]).then(setProjects).catch(()=>{});cmsFetch("/api/testimonials").then(r=>r.ok?r.json():[]).then(setTestimonials).catch(()=>{});cmsFetch("/api/insights?limit=3").then(r=>r.ok?r.json():[]).then(setInsights).catch(()=>{})},[]);
 useEffect(()=>{
  const sections=[...document.querySelectorAll(".solutions-reference-v29,.capabilities-reference-v30")];
  if(!sections.length)return;
  const io=new IntersectionObserver(entries=>{
   entries.forEach(entry=>entry.target.classList.toggle("motion-active",entry.isIntersecting));
  },{rootMargin:"320px 0px",threshold:0});
  sections.forEach(section=>io.observe(section));
  return()=>io.disconnect();
 },[]);
 useEffect(()=>{
  const ctx=gsap.context(()=>{
   const mm=gsap.matchMedia();

   mm.add("(prefers-reduced-motion: no-preference)",()=>{
    const coarse=matchMedia("(pointer:coarse)").matches;
    const d=coarse?20:42;
    const dur=coarse?.40:.62;

    // Hero load-in only. Final CSS/layout is untouched.
    const heroTl=gsap.timeline({defaults:{ease:"power3.out"}});
    heroTl.from(".hero-v71-kicker",{x:-24,autoAlpha:0,duration:.40,clearProps:"transform,opacity,visibility"})
      .from(".hero-v71-copy h1",{y:30,autoAlpha:0,duration:.64,clearProps:"transform,opacity,visibility"},.06)
      .from(".hero-v71-copy>p",{x:-18,autoAlpha:0,duration:.42,clearProps:"transform,opacity,visibility"},.18)
      .from(".hero-v71-actions>*",{y:16,autoAlpha:0,stagger:.07,duration:.38,clearProps:"transform,opacity,visibility"},.24)
      .from(".hero-x-v24",{scale:.96,autoAlpha:0,duration:.72,clearProps:"transform,opacity,visibility"},.10)
      .from(".hero-v71-industries-label",{x:-18,autoAlpha:0,duration:.34,clearProps:"transform,opacity,visibility"},.36)
      .from(".hero-v71-industry",{y:12,autoAlpha:0,stagger:.025,duration:.32,clearProps:"transform,opacity,visibility"},.40);

    const trigger=(selector,startAt="top 87%")=>{
     const el=document.querySelector(selector);
     if(!el)return null;
     return gsap.timeline({
      scrollTrigger:{trigger:el,start:coarse?"top 94%":startAt,once:true,invalidateOnRefresh:true},
      defaults:{ease:"power3.out"}
     });
    };

    // Business Reality — line-by-line editorial reveal.
    {
     const tl=trigger(".story-statement-scroll","top 84%");
     if(tl){
      tl.from(".statement-kicker-scroll",{x:-d,autoAlpha:0,duration:dur*.65,clearProps:"transform,opacity,visibility"})
        .from(".statement-line:first-child",{y:d,autoAlpha:0,duration:dur,clearProps:"transform,opacity,visibility"},.05)
        .from(".statement-line-accent",{x:d,autoAlpha:0,duration:dur*.9,clearProps:"transform,opacity,visibility"},.16)
        .from(".statement-copy-scroll",{y:18,autoAlpha:0,duration:dur*.72,clearProps:"transform,opacity,visibility"},.28)
        .fromTo(".statement-progress i",{scaleX:0},{scaleX:1,transformOrigin:"left",duration:dur*.8,ease:"power2.inOut",clearProps:"transform"},.31);
     }
    }

    // What We Build — heading + each card's INTERNAL content, never card shell.
    {
     const tl=trigger(".solutions-reference-v29","top 85%");
     if(tl){
      tl.from(".solutions-reference-v29 .story-kicker",{x:-d,autoAlpha:0,duration:dur*.6,clearProps:"transform,opacity,visibility"})
        .from(".solutions-reference-v29 .v14-section-head h2",{y:d,autoAlpha:0,duration:dur,clearProps:"transform,opacity,visibility"},.04)
        .from(".solutions-reference-v29 .v14-section-head>p",{x:d*.65,autoAlpha:0,duration:dur*.7,clearProps:"transform,opacity,visibility"},.12);

      gsap.utils.toArray(".solution-v14-card").forEach((card,i)=>{
       const items=card.querySelectorAll(".solution-card-top,h3,p,.solution-card-foot");
       tl.from(items,{
        y:14+(i%2)*5,
        x:i%2?10:-10,
        autoAlpha:0,
        stagger:.045,
        duration:dur*.58,
        clearProps:"transform,opacity,visibility"
       },.20+i*.055);
      });
     }
    }

    // Our Approach — copy and interactive internals reveal separately.
    {
     const tl=trigger(".capabilities-reference-v30","top 84%");
     if(tl){
      tl.from(".capabilities-v14-copy .story-kicker",{x:-d,autoAlpha:0,duration:dur*.55,clearProps:"transform,opacity,visibility"})
        .from(".capabilities-v14-copy h2",{y:d,autoAlpha:0,duration:dur*.9,clearProps:"transform,opacity,visibility"},.04)
        .from(".capabilities-v14-copy p",{y:16,autoAlpha:0,duration:dur*.65,clearProps:"transform,opacity,visibility"},.14)
        .from(".capabilities-v14-copy .v14-btn",{x:-18,autoAlpha:0,duration:dur*.55,clearProps:"transform,opacity,visibility"},.21)
        .from(".approach-step-row button",{y:18,autoAlpha:0,stagger:.06,duration:dur*.48,clearProps:"transform,opacity,visibility"},.12)
        .from(".approach-detail>*",{y:14,autoAlpha:0,stagger:.055,duration:dur*.50,clearProps:"transform,opacity,visibility"},.28);
     }
    }

    // Experience — animate visible content pieces, not the container.
    {
     const el=document.querySelector(".experience-story");
     if(el){
      const tl=gsap.timeline({scrollTrigger:{trigger:el,start:coarse?"top 94%":"top 86%",once:true}});
      const targets=el.querySelectorAll(".experience-story-head>*");
      if(targets.length)tl.from(targets,{y:20,autoAlpha:0,stagger:.07,duration:dur,clearProps:"transform,opacity,visibility"});
      const visualParts=el.querySelectorAll(".experience-story-stage>*");
      if(visualParts.length)tl.from(visualParts,{y:18,autoAlpha:0,stagger:.045,duration:dur*.65,clearProps:"transform,opacity,visibility"},.16);
     }
    }

    // System Builder — header then UI internals.
    {
     const tl=trigger(".system-builder-home","top 86%");
     if(tl){
      tl.from(".system-builder-home-head .story-kicker",{x:-d,autoAlpha:0,duration:dur*.55,clearProps:"transform,opacity,visibility"})
        .from(".system-builder-home-head h2",{y:d,autoAlpha:0,duration:dur*.9,clearProps:"transform,opacity,visibility"},.04)
        .from(".system-builder-home-head>p",{x:d*.65,autoAlpha:0,duration:dur*.68,clearProps:"transform,opacity,visibility"},.12)
        .from(".system-builder-home .system-builder>*",{y:18,autoAlpha:0,stagger:.05,duration:dur*.58,clearProps:"transform,opacity,visibility"},.22);
     }
    }

    // Projects — animate each card's visual + text internally.
    {
     const tl=trigger(".projects-v35","top 85%");
     if(tl){
      tl.from(".projects-v35-head>div>*",{x:-d,autoAlpha:0,stagger:.055,duration:dur*.7,clearProps:"transform,opacity,visibility"})
        .from(".projects-v35-head>p",{x:d,autoAlpha:0,duration:dur*.65,clearProps:"transform,opacity,visibility"},.08);

      gsap.utils.toArray(".project-v35-card").forEach((card,i)=>{
       const top=card.querySelector(".project-v35-top");
       const visual=card.querySelector(".project-v35-visual");
       const body=card.querySelectorAll(".project-v35-body h3,.project-v35-body p,.project-v35-meta>*");
       if(top)tl.from(top,{y:12,autoAlpha:0,duration:dur*.48,clearProps:"transform,opacity,visibility"},.19+i*.06);
       if(visual)tl.from(visual,{scale:.94,autoAlpha:0,duration:dur*.68,ease:"expo.out",clearProps:"transform,opacity,visibility"},.22+i*.06);
       if(body.length)tl.from(body,{y:14,autoAlpha:0,stagger:.04,duration:dur*.5,clearProps:"transform,opacity,visibility"},.27+i*.06);
      });
     }
    }

    // Testimonials — quote, then identity.
    {
     const tl=trigger(".testimonials-v35","top 86%");
     if(tl){
      tl.from(".testimonials-v35-head>*",{y:20,autoAlpha:0,stagger:.06,duration:dur*.7,clearProps:"transform,opacity,visibility"});
      gsap.utils.toArray(".testimonial-v35-card").forEach((card,i)=>{
       const q=card.querySelectorAll(".testimonial-v35-mark,blockquote");
       const f=card.querySelector("footer");
       if(q.length)tl.from(q,{x:i%2?-14:14,autoAlpha:0,stagger:.04,duration:dur*.52,clearProps:"transform,opacity,visibility"},.18+i*.045);
       if(f)tl.from(f,{y:12,autoAlpha:0,duration:dur*.45,clearProps:"transform,opacity,visibility"},.26+i*.045);
      });
     }
    }

    // Insights — category/title/copy/action sequence within each card.
    {
     const tl=trigger(".insights-home","top 86%");
     if(tl){
      tl.from(".insights-home-head>*",{x:(i)=>i?d:-d,autoAlpha:0,stagger:.05,duration:dur*.7,clearProps:"transform,opacity,visibility"});
      gsap.utils.toArray(".insights-home-grid>a").forEach((card,i)=>{
       const parts=card.querySelectorAll("span,h3,p,strong");
       tl.from(parts,{y:14,autoAlpha:0,stagger:.04,duration:dur*.5,clearProps:"transform,opacity,visibility"},.18+i*.055);
      });
     }
    }

    // Hamilton — copy pieces and map HUD, not map shell.
    {
     const tl=trigger(".hamilton-v14","top 85%");
     if(tl){
      tl.from(".hamilton-v14-copy>*",{x:-d,autoAlpha:0,stagger:.055,duration:dur*.62,clearProps:"transform,opacity,visibility"})
        .from(".hamilton-v14-map iframe",{autoAlpha:0,duration:dur*.72,clearProps:"opacity,visibility"},.10)
        .from(".hamilton-v14-map .map-hud>*",{x:d*.55,autoAlpha:0,stagger:.06,duration:dur*.56,clearProps:"transform,opacity,visibility"},.20);
     }
    }

    // Contact — copy, direct links, then form fields individually.
    {
     const tl=trigger(".contact-v14","top 85%");
     if(tl){
      tl.from(".contact-v14-copy>.story-kicker,.contact-v14-copy>h2,.contact-v14-copy>p",{y:22,autoAlpha:0,stagger:.065,duration:dur*.65,clearProps:"transform,opacity,visibility"})
        .from(".direct-v14>a",{x:-18,autoAlpha:0,stagger:.07,duration:dur*.52,clearProps:"transform,opacity,visibility"},.18)
        .from(".contact-v14-form form>*",{x:d*.45,autoAlpha:0,stagger:.045,duration:dur*.5,clearProps:"transform,opacity,visibility"},.14);
     }
    }

    // Discovery bridge — brand, paragraph, metadata, button.
    {
     const tl=trigger(".discovery-bridge-v48","top 91%");
     if(tl){
      tl.from(".discovery-bridge-icon-v48",{scale:.7,autoAlpha:0,duration:dur*.55,ease:"back.out(1.6)",clearProps:"transform,opacity,visibility"})
        .from(".discovery-bridge-brand-v48>div:last-child>*",{x:-18,autoAlpha:0,stagger:.05,duration:dur*.46,clearProps:"transform,opacity,visibility"},.05)
        .from(".discovery-bridge-inner-v48>p",{y:18,autoAlpha:0,duration:dur*.5,clearProps:"transform,opacity,visibility"},.10)
        .from(".discovery-bridge-meta-v48>*",{y:10,autoAlpha:0,stagger:.035,duration:dur*.4,clearProps:"transform,opacity,visibility"},.16)
        .from(".discovery-bridge-btn-v48",{x:20,autoAlpha:0,duration:dur*.55,clearProps:"transform,opacity,visibility"},.20);
     }
    }

    requestAnimationFrame(()=>ScrollTrigger.refresh());
   });

   mm.add("(prefers-reduced-motion: reduce)",()=>{
    gsap.set(".home-v14 *",{clearProps:"opacity,visibility,transform"});
   });

   return()=>mm.revert();
  });
  return()=>ctx.revert();
 },[projects.length,testimonials.length,insights.length]);

 return <div className="home-v14">
 <WelcomeModal/>
 <Header/>
 <section className="hero-v14 hero-v71-reference">
  <div className="hero-v71-backdrop" aria-hidden="true"/>
  <div className="hero-v72-grid" aria-hidden="true"/>
  <div className="hero-v72-cursor-glow" aria-hidden="true"/>
  <HeroParticles/>
  <div className="hero-v71-contained">
   <div className="hero-v71-main">
    <div className="hero-v71-copy">
     <span className="hero-v71-kicker"><i/>{heroCopy.eyebrow||"ENGINEERED FOR AMBITIOUS BUSINESS"}</span>
     <h1 className="cms-managed-headline">{heroCopy.title||<>Technology<br/>built to elevate<br/><em>what’s next.</em></>}</h1>
     <p>{heroCopy.body||"We engineer secure digital systems that help ambitious businesses move faster, scale intelligently and lead with confidence."}</p>
     <div className="hero-v71-actions">
      <a className="v14-btn v14-btn-light hero-v80-primary" href="#solutions">{heroCopy.primaryCta||"Explore capabilities"} <ArrowRight size={15}/></a>
      <a className="hero-watch" href="#experience"><span><Play size={12}/></span>{heroCopy.secondaryCta||"See how we think"}</a>
     </div>
    </div>
    <div className="hero-v71-art">
     <div className="hero-v71-x-haze" aria-hidden="true"/>
     <HeroX/>
     <div className="hero-v71-ground" aria-hidden="true">
      <i className="hero-v71-ground-line hero-v71-ground-line-a"/>
      <i className="hero-v71-ground-line hero-v71-ground-line-b"/>
      <i className="hero-v71-ground-glow"/>
     </div>
    </div>
   </div>

   <div className="hero-v71-industries">
    <span className="hero-v71-industries-label">INDUSTRIES WE BUILD FOR</span>
    <div className="hero-v71-marquee" aria-label="Industries we build for">
     <div className="hero-v71-marquee-track">
      {[...heroIndustries,...heroIndustries].map(([label,Icon],i)=><div className="hero-v71-industry" key={`${label}-${i}`}><span><Icon size={22}/></span><strong>{label}</strong></div>)}
     </div>
    </div>
   </div>

   <div className="hero-v71-scroll" aria-hidden="true"><span><i/></span><b>SCROLL TO EXPLORE</b></div>
  </div>
 </section>
 <section className="story-statement-v14 story-statement-scroll"><div className="statement-glow"/><div className="story-orbit story-orbit-a"/><div className="story-orbit story-orbit-b"/><div className="statement-content story-reveal"><span className="story-kicker statement-kicker-scroll">{growthCopy.eyebrow||"THE BUSINESS REALITY"}</span><h2 className="statement-title-scroll"><span className="statement-line">{growthCopy.title||"Growth creates complexity."}</span><span className="statement-line statement-line-accent"><em>{growthCopy.accent||"Great technology turns it back into clarity."}</em></span></h2><p className="statement-copy-scroll">{growthCopy.body||"More customers, more tools, more data and more operational pressure should not create more friction. The right system creates leverage."}</p><div className="statement-progress" aria-hidden="true"><i/></div></div></section>
 <section className="x94-build-section solutions-reference-v29" id="solutions"><div className="x94-section-orb" aria-hidden="true"/><div className="v14-wrap"><header className="x94-section-head story-reveal"><div><span className="story-kicker dark">{solutionsCopy.eyebrow||"WHAT WE BUILD"}</span><h2>{solutionsCopy.title||<>Systems that make the<br/><em>business more capable.</em></>}</h2></div><p>{solutionsCopy.body||"One engineering partner across product, cloud, security, data and experience — composed around the outcome instead of sold as disconnected services."}</p></header><CapabilityShowcaseV93/></div></section>
 <ApproachSystemV96 copy={processCopy}/>
 <div className="experience-story-link"><div className="section-signal-v63" aria-hidden="true"><i/><b/></div></div><ExperienceStory/>
 <section className="system-builder-home" id="system-builder"><div className="section-signal-v63" aria-hidden="true"><i/><b/></div><div className="v14-wrap"><header className="system-builder-home-head story-reveal"><div><span className="story-kicker dark">BUILD YOUR SYSTEM</span><h2>Start with the problem.<br/><em>See the system take shape.</em></h2></div><p>Three questions turn your business context into a directional capability map—then you can take it into a real discovery conversation.</p></header><SystemBuilder/></div></section>
 {projects.length>0&&<section className="projects-v35" id="projects"><div className="section-signal-v63" aria-hidden="true"><i/><b/></div><div className="v14-wrap"><header className="projects-v35-head story-reveal"><div><span className="story-kicker dark">RECENT PROJECTS</span><h2>Built to move businesses<br/><em>forward.</em></h2></div><p>Selected digital systems, platforms and customer experiences shaped around real operational goals.</p></header><div className="projects-v35-grid">{projects.slice(0,3).map((item,i)=><article className={`project-v35-card project-v35-card-${i+1}`} key={item.id}><div className="project-v35-top"><span>{item.industry||"DIGITAL SYSTEM"}</span><strong>0{i+1}</strong></div><div className="project-v35-visual" aria-hidden="true"><div className="project-v35-orbit"/><div className="project-v35-screen"><i/><i/><i/></div></div><div className="project-v35-body"><div><h3>{item.title}</h3><p>{item.summary||item.description}</p></div><div className="project-v35-meta">{item.metric&&<div><strong>{item.metric}</strong><span>{item.metricLabel}</span></div>}<a href={item.slug?`/work/${item.slug}`:(item.url||"#contact")}>{item.slug?"View case study":item.url?"View project":"Discuss a similar project"}<ArrowRight size={15}/></a></div></div></article>)}</div></div></section>}
 {testimonials.length>0&&<section className="testimonials-v35" id="testimonials"><div className="section-signal-v63" aria-hidden="true"><i/><b/></div><div className="v14-wrap"><header className="testimonials-v35-head story-reveal"><span className="story-kicker">CLIENT PERSPECTIVES</span><h2>Trust is built in<br/><em>the work.</em></h2><p>What clients say about working with Xynysys.</p></header><div className="testimonials-v35-grid">{testimonials.slice(0,6).map((t,i)=><article className="testimonial-v35-card" key={t.id}><div className="testimonial-v35-mark">“</div><blockquote>{t.quote}</blockquote><footer><div className="testimonial-v35-avatar">{(t.name||"X").split(/\s+/).map(x=>x[0]).slice(0,2).join("")}</div><div><strong>{t.name}</strong><span>{[t.role,t.company].filter(Boolean).join(" · ")}</span></div></footer></article>)}</div></div></section>}
 {insights.length>0&&<section className="insights-home"><div className="section-signal-v63" aria-hidden="true"><i/><b/></div><div className="v14-wrap"><header className="insights-home-head story-reveal"><div><span className="story-kicker dark">LATEST INSIGHTS</span><h2>Engineering thinking,<br/><em>made useful.</em></h2></div><a href="/insights">View all insights <ArrowRight size={15}/></a></header><div className="insights-home-grid">{insights.slice(0,3).map(x=><a href={`/insights/${x.slug}`} key={x.id}><span>{x.category||"INSIGHT"}</span><h3>{x.title}</h3><p>{x.excerpt}</p><strong>Read insight <ArrowRight size={14}/></strong></a>)}</div></div></section>}
 <section className="x94-hamilton" id="about"><div className="v14-wrap x94-hamilton-grid"><div className="x94-hamilton-copy story-reveal"><span className="story-kicker dark">BUILT IN HAMILTON</span><h2>Close enough to care.<br/><em>Built to work anywhere.</em></h2><p>Xynysys is rooted in Hamilton, Ontario. We pair local accountability with a delivery model designed for ambitious companies wherever they operate.</p><div className="x94-location-line"><span><i/> Hamilton, Ontario</span><span>43.2557° N</span><span>79.8711° W</span></div><div className="x94-local-values"><div><strong>Direct</strong><span>Work with the people building the system.</span></div><div><strong>Practical</strong><span>Technology choices tied to real outcomes.</span></div><div><strong>Remote-ready</strong><span>A delivery rhythm built for distributed teams.</span></div></div></div><div className="x94-map-card story-reveal"><iframe title="Hamilton Ontario map" loading="lazy" tabIndex="-1" src="https://www.openstreetmap.org/export/embed.html?bbox=-79.98%2C43.17%2C-79.70%2C43.35&layer=mapnik&marker=43.2557%2C-79.8711"/><div className="x94-map-fade" aria-hidden="true"/><div className="x94-map-badge"><span className="x94-map-logo">X</span><div><small>XYNYSYS / CANADA</small><strong>Hamilton, Ontario</strong></div></div><div className="x94-map-pill"><i/> HOME BASE</div></div></div></section>
  <section className="contact-v14 contact-v32" id="contact"><div className="section-signal-v63" aria-hidden="true"><i/><b/></div><div className="contact-v32-bg" aria-hidden="true"><div className="contact-v32-orb contact-v32-orb-a"/><div className="contact-v32-orb contact-v32-orb-b"/><div className="contact-v32-orb contact-v32-orb-c"/><div className="contact-v32-lines contact-v32-lines-a"/><div className="contact-v32-lines contact-v32-lines-b"/></div><div className="contact-v14-gridfx"/><div className="v14-wrap contact-v14-layout"><div className="contact-v14-copy story-reveal"><span className="story-kicker">{contactCopy.eyebrow||"THE NEXT CHAPTER"}</span><h2>{contactCopy.title||<>What should your business<br/><em>be able to do next?</em></>}</h2><p>{contactCopy.body||"Bring the business problem, rough idea or outdated system. We’ll help turn it into a clear digital direction."}</p><div className="direct-v14"><a href="mailto:support@xynysys.com"><span>EMAIL</span><strong>support@xynysys.com</strong></a><a href="tel:+14374731577"><span>PHONE</span><strong>437-473-1577</strong></a></div></div><div className="contact-v14-form story-reveal"><ContactForm/></div></div></section><section className="discovery-bridge-v48" aria-label="Book a discovery call">
  <div className="discovery-bridge-glow-v48"/>
  <div className="v14-wrap discovery-bridge-inner-v48">
    <div className="discovery-bridge-brand-v48">
      <div className="discovery-bridge-icon-v48">X</div>
      <div>
        <span>PREFER A CONVERSATION?</span>
        <strong>Talk it through with us.</strong>
      </div>
    </div>

    <p>Skip the project brief and use 30 minutes to walk us through the idea, problem or opportunity directly.</p>

    <div className="discovery-bridge-action-v48">
      <div className="discovery-bridge-meta-v48">
        <span>30 min</span>
        <i/>
        <span>Free</span>
        <i/>
        <span>No obligation</span>
      </div>
      <a href="/book-call" className="discovery-bridge-btn-v48">
        <CalendarDays size={16}/>
        {globalCopy.primaryCta||"Book a discovery call"}
        <ArrowRight size={15}/>
      </a>
    </div>
  </div>
</section><Footer/>
 </div>
}