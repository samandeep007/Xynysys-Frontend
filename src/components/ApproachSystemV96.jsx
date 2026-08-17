import React from "react";
import { Search, PenTool, Boxes, UploadCloud, Target, ArrowUpRight } from "lucide-react";

const stages = [
  {n:"01",title:"Discover",label:"FRAME THE PROBLEM",icon:Search,desc:"We align on the business outcome, users, constraints and success signals before choosing technology.",outputs:["Problem definition","Current-state map","Success measures"]},
  {n:"02",title:"Design",label:"REMOVE EXPENSIVE GUESSWORK",icon:PenTool,desc:"We shape the experience, architecture and delivery boundaries while change is still fast and inexpensive.",outputs:["System architecture","Experience flows","Delivery roadmap"]},
  {n:"03",title:"Build",label:"SHIP PROOF, NOT PROMISES",icon:Boxes,desc:"We engineer in small, testable increments with security, quality and observability built into the loop.",outputs:["Working increments","Automated tests","Secure integrations"]},
  {n:"04",title:"Deploy",label:"MAKE RELEASES BORING",icon:UploadCloud,desc:"We move software through controlled pipelines with monitoring, rollback paths and clear operational ownership.",outputs:["CI/CD pipeline","Observability","Runbooks"]},
  {n:"05",title:"Optimize",label:"LET REAL USAGE LEAD",icon:Target,desc:"We use product, performance and business signals to decide what earns the next engineering cycle.",outputs:["Performance signals","Product insight","Prioritized backlog"]},
];

export default function ApproachSystemV96({copy={}}){
  return <section className="v96-approach" id="capabilities">
    <div className="v96-shell">
      <header className="v96-approach-head">
        <div>
          <span className="v96-eyebrow">{copy.eyebrow||"OUR APPROACH"}</span>
          <h2>{copy.title||<>A clear path from<br/><em>problem to production.</em></>}</h2>
        </div>
        <p>{copy.body||"Five disciplined stages keep scope, decisions, risk and progress visible from the first conversation through production."}</p>
      </header>

      <div className="v96-process">
        <aside className="v96-process-intro">
          <span>DELIVERY SYSTEM / 05 STAGES</span>
          <strong>Strategy should stay connected to the code.</strong>
          <p>Every stage has a job, an output and a reason to exist. No mystery process. No hand-off theatre.</p>
          <div className="v96-process-stat"><b>01 → 05</b><span>one continuous engineering rhythm</span></div>
        </aside>

        <div className="v96-stage-list">
          {stages.map(({n,title,label,icon:Icon,desc,outputs})=><article className="v96-stage" key={n}>
            <div className="v96-stage-id"><span>{n}</span><div><Icon size={18} strokeWidth={1.7}/></div></div>
            <div className="v96-stage-main"><small>{label}</small><h3>{title}</h3><p>{desc}</p></div>
            <div className="v96-stage-output"><small>OUTPUT</small>{outputs.map(x=><span key={x}>{x}</span>)}</div>
            <ArrowUpRight className="v96-stage-arrow" size={17}/>
          </article>)}
        </div>
      </div>
    </div>
  </section>
}
