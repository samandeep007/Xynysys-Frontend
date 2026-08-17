import React,{useState} from "react";
import {ArrowUpRight,Code2,Cloud,ShieldCheck,BarChart3,PanelsTopLeft} from "lucide-react";

const items=[
 {n:"01",title:"Custom Software",short:"Purpose-built systems",desc:"Secure, scalable software shaped around how your business actually operates — from internal platforms to customer-facing products.",icon:Code2,slug:"custom-software-development",tags:["Platforms","Internal tools","Integrations"]},
 {n:"02",title:"Cloud & DevOps",short:"Infrastructure that moves",desc:"Cloud architecture and delivery systems designed to make releases faster, environments repeatable and operations easier to trust.",icon:Cloud,slug:"cloud-devops-engineering",tags:["Cloud native","CI/CD","Observability"]},
 {n:"03",title:"Cybersecurity",short:"Security by architecture",desc:"Practical security built into applications, identity, infrastructure and delivery workflows from the beginning.",icon:ShieldCheck,slug:"cybersecurity-solutions",tags:["App security","Identity","Hardening"]},
 {n:"04",title:"Data & AI",short:"Turn signals into action",desc:"Data foundations and focused AI workflows that make information useful, decisions faster and repetitive work easier to automate.",icon:BarChart3,slug:"data-ai-engineering",tags:["Data systems","AI workflows","Analytics"]},
 {n:"05",title:"Product Experience",short:"Clarity people can use",desc:"Digital products and interfaces designed around real journeys, clear hierarchy and measurable business outcomes.",icon:PanelsTopLeft,slug:"product-design-experience",tags:["UX strategy","UI systems","Prototyping"]},
];

export default function CapabilityShowcaseV93(){
 const [active,setActive]=useState(0); const a=items[active]; const Icon=a.icon;
 return <div className="x94-capability">
   <div className="x94-capability-tabs" role="tablist" aria-label="Capabilities">
     {items.map((item,i)=>{const I=item.icon; return <button key={item.title} type="button" role="tab" aria-selected={active===i} className={active===i?"is-active":""} onClick={()=>setActive(i)} onFocus={()=>setActive(i)}>
       <span className="x94-tab-icon"><I size={16}/></span><span><small>{item.n}</small><strong>{item.title}</strong></span>
     </button>})}
   </div>

   <article className="x94-capability-panel" key={a.title}>
     <div className="x94-capability-copy">
       <span className="x94-capability-kicker">CAPABILITY {a.n}</span>
       <div className="x94-capability-title"><span className="x94-capability-bigicon"><Icon size={23}/></span><h3>{a.title}</h3></div>
       <p>{a.desc}</p>
       <div className="x94-capability-tags">{a.tags.map(t=><span key={t}>{t}</span>)}</div>
       <a href={`/services/${a.slug}`}>Explore capability <ArrowUpRight size={15}/></a>
     </div>
     <div className="x94-capability-visual" aria-hidden="true">
       <div className="x94-visual-window">
         <div className="x94-window-bar"><i/><i/><i/><span>XYNYSYS / SYSTEM</span></div>
         <div className="x94-window-grid"/>
         <div className="x94-flow-card a"><span>INPUT</span><b>Business context</b></div>
         <div className="x94-flow-line l1"/>
         <div className="x94-flow-core"><Icon size={25}/></div>
         <div className="x94-flow-line l2"/>
         <div className="x94-flow-card b"><span>OUTPUT</span><b>{a.short}</b></div>
       </div>
     </div>
   </article>
 </div>
}
