import React,{useMemo,useState} from "react";
import {ArrowRight,Check,Copy,RefreshCw} from "lucide-react";
import {track} from "./Analytics.jsx";
const questions=[
 {key:"goal",label:"What are you trying to improve?",options:[["customers","Get more customers"],["operations","Automate operations"],["product","Build a product"],["modernize","Modernize systems"]]},
 {key:"business",label:"What describes your business?",options:[["local","Local business"],["startup","Startup"],["growing","Growing company"],["enterprise","Enterprise"]]},
 {key:"state",label:"What do you already have?",options:[["idea","An idea"],["website","Existing website"],["legacy","Legacy software"],["tools","Disconnected tools"]]},
];
const maps={
 customers:{services:["Product Design & Experience","Custom Software Development","Data & AI Engineering"],flow:["Customer experience","CRM / lead layer","Automation","Analytics"]},
 operations:{services:["Custom Software Development","Cloud & DevOps Engineering","Data & AI Engineering"],flow:["Operations portal","Workflow engine","Integrations","Reporting"]},
 product:{services:["Product Design & Experience","Custom Software Development","Cloud & DevOps Engineering"],flow:["Product experience","Application services","Cloud platform","Observability"]},
 modernize:{services:["Cloud & DevOps Engineering","Cybersecurity Solutions","Custom Software Development"],flow:["Existing systems","Integration layer","Modern services","Unified experience"]},
};
export default function SystemBuilder(){const [answers,setAnswers]=useState({}),[step,setStep]=useState(0),[copied,setCopied]=useState(false);const done=step>=questions.length;const plan=useMemo(()=>maps[answers.goal]||maps.operations,[answers.goal]);
 const reset=()=>{setAnswers({});setStep(0)};const choose=(key,v)=>{track("system_builder_answer",{step:key,value:v});setAnswers(a=>({...a,[key]:v}));setTimeout(()=>setStep(s=>s+1),160)};
 const share=async()=>{const text=`Xynysys system direction\n${plan.flow.join(" → ")}\nRecommended: ${plan.services.join(", ")}`;await navigator.clipboard?.writeText(text);setCopied(true);setTimeout(()=>setCopied(false),1600)};
 return <div className="system-builder-shell">{!done?<><div className="builder-progress"><span>0{step+1}</span><i><b style={{width:`${((step+1)/questions.length)*100}%`}}/></i><small>0{questions.length}</small></div><div className="builder-question" key={step}><span>SYSTEM BUILDER</span><h2>{questions[step].label}</h2><div className="builder-options">{questions[step].options.map(([v,l])=><button key={v} onClick={()=>choose(questions[step].key,v)}>{l}<ArrowRight size={15}/></button>)}</div></div></>:<div className="builder-result"><div className="builder-result-head"><span>YOUR POTENTIAL XYNYSYS SYSTEM</span><button onClick={reset}><RefreshCw size={13}/>Start again</button></div><div className="builder-flow">{plan.flow.map((x,i)=><React.Fragment key={x}><div><small>0{i+1}</small><strong>{x}</strong></div>{i<plan.flow.length-1&&<ArrowRight size={16}/>}</React.Fragment>)}</div><div className="builder-recommend"><div><small>RECOMMENDED CAPABILITIES</small>{plan.services.map(x=><p key={x}><Check size={13}/>{x}</p>)}</div><div className="builder-result-actions"><button onClick={share}><Copy size={14}/>{copied?"Copied":"Copy system"}</button><a href="/book-call" onClick={()=>track("system_builder_book_call",{goal:answers.goal||""})}>Discuss this system <ArrowRight size={15}/></a></div></div></div>}</div>}
