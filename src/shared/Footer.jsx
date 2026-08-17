import React,{useEffect,useState} from "react";
import{cmsFetch,useSiteContent}from"../lib/cmsApi.js";
import {Linkedin,Github,ArrowRight,Instagram} from "lucide-react";
function XIcon({size=17}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M5 4l14 16M19 4L5 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}
const fallbackGroups=[
 {title:"Services",links:[{label:"Custom Software",href:"/services/custom-software-development"},{label:"Cloud & DevOps",href:"/services/cloud-devops-engineering"},{label:"Cybersecurity",href:"/services/cybersecurity-solutions"},{label:"Data & AI",href:"/services/data-ai-engineering"},{label:"Product Design",href:"/services/product-design-experience"}]},
 {title:"Explore",links:[{label:"Case Studies",href:"/work"},{label:"Insights",href:"/insights"},{label:"System Builder",href:"/system-builder"},{label:"Careers",href:"/careers"},{label:"Book a Call",href:"/book-call"}]},
 {title:"Company",links:[{label:"About Us",href:"/#about"},{label:"Contact",href:"/#contact"},{label:"Privacy",href:"/privacy"},{label:"Terms",href:"/terms"},{label:"Accessibility",href:"/accessibility"}]}
];
export default function Footer(){
 const[settings,setSettings]=useState(null),[news,setNews]=useState("");
 const site=useSiteContent(),footer=site?.footer||{},groups=footer.groups?.length?footer.groups:fallbackGroups;
 useEffect(()=>{cmsFetch("/api/site-settings").then(r=>r.ok?r.json():null).then(setSettings).catch(()=>{})},[]);
 const social=settings?.social||{},links=[["linkedin",social.linkedin,Linkedin],["github",social.github,Github],["instagram",social.instagram,Instagram],["x",social.x,XIcon]].filter(([,u])=>u);
 async function subscribe(e){e.preventDefault();const form=e.currentTarget,email=new FormData(form).get("email");const r=await cmsFetch("/api/newsletter",{method:"POST",body:JSON.stringify({email})});if(r.ok){form.reset();setNews("Subscribed.")}else setNews("Please check your email.")}
 return <footer className="site-footer"><div className="footer-grid">
  <div className="footer-brand"><img src="/assets/xynysys-navbar-horizontal.png" alt="Xynysys Corporation"/><p>{footer.tagline||"We build intelligent, secure and scalable digital solutions that empower businesses to innovate and grow."}</p>{links.length>0&&<div className="social-row">{links.map(([n,u,I])=><a key={n} href={u} target="_blank" rel="noreferrer noopener" aria-label={n}><I size={17}/></a>)}</div>}</div>
  {groups.map((group,i)=><div key={`${group.title}-${i}`}><h4>{group.title}</h4>{(group.links||[]).map((link,j)=><a href={link.href||"#"} key={`${link.label}-${j}`}>{link.label}</a>)}</div>)}
  <div className="footer-news"><h4>Newsletter</h4><p>Occasional insights on building better digital systems.</p><form onSubmit={subscribe}><input name="email" type="email" required placeholder="Enter your email"/><button aria-label="Subscribe"><ArrowRight size={16}/></button></form>{news&&<small>{news}</small>}</div>
 </div><div className="footer-bottom"><span>{footer.copyright||"© 2026 Xynysys Corporation. All rights reserved."}</span><div><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a><a href="/cookies">Cookie Policy</a></div></div></footer>
}