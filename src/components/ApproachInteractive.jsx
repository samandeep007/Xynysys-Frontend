import React,{useState} from "react";
import {Search,PenTool,Boxes,UploadCloud,Target,ArrowRight} from "lucide-react";
const steps=[
 {title:"Discover",icon:Search,desc:"Clarify the business outcome, users, constraints and what success actually means.",deliverables:["Discovery brief","Current-state map","Success metrics"],time:"1–2 weeks"},
 {title:"Design",icon:PenTool,desc:"Shape the product, architecture and experience before expensive implementation decisions are locked in.",deliverables:["Solution architecture","UX flows","Delivery plan"],time:"1–3 weeks"},
 {title:"Build",icon:Boxes,desc:"Ship in small, testable increments with production engineering standards from the first sprint.",deliverables:["Working increments","Automated tests","Secure integrations"],time:"Iterative"},
 {title:"Deploy",icon:UploadCloud,desc:"Release through a controlled pipeline with observability, rollback paths and operational ownership.",deliverables:["CI/CD pipeline","Monitoring","Runbook"],time:"Continuous"},
 {title:"Optimize",icon:Target,desc:"Use real usage and business signals to decide what should improve next.",deliverables:["Performance review","Product analytics","Improvement backlog"],time:"Ongoing"},
];
export default function ApproachInteractive(){const [active,setActive]=useState(0);const a=steps[active];return <div className="approach-interactive">
 <div className="approach-step-row">{steps.map((s,i)=>{const Icon=s.icon;return <button key={s.title} className={i===active?"active":""} onClick={()=>setActive(i)}><span><Icon size={19}/></span><small>0{i+1}</small><strong>{s.title}</strong><i/></button>})}</div>
 <div className="approach-detail" key={a.title}><div><span className="approach-detail-label">{a.title.toUpperCase()} / DELIVERY STAGE</span><h3>{a.desc}</h3></div><div><small>TYPICAL OUTPUTS</small>{a.deliverables.map(x=><p key={x}><ArrowRight size={12}/>{x}</p>)}</div><div><small>TYPICAL CADENCE</small><strong>{a.time}</strong></div></div>
 </div>}
