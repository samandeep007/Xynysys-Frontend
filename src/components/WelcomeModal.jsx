import{cmsFetch}from"../lib/cmsApi.js";
import React,{useEffect,useState} from "react";
import {ArrowRight,X} from "lucide-react";

export default function WelcomeModal(){
  const [open,setOpen]=useState(false),[config,setConfig]=useState(null);
  useEffect(()=>{if(sessionStorage.getItem("xynysys_welcome_seen"))return;let t;cmsFetch("/api/site-settings").then(r=>r.json()).then(s=>{setConfig(s.welcome||{});if(s.welcome?.enabled===false)return;t=setTimeout(()=>setOpen(true),900)}).catch(()=>{});return()=>clearTimeout(t)},[]);
  const close=()=>{sessionStorage.setItem("xynysys_welcome_seen","1");setOpen(false)};
  useEffect(()=>{if(!open)return;const key=e=>e.key==="Escape"&&close();window.addEventListener("keydown",key);return()=>window.removeEventListener("keydown",key)},[open]);
  if(!open)return null;

  const lead=config?.title||"Welcome to Xynysys.";
  const accent=config?.accentTitle||"Built for what’s next.";
  const message=config?.message||"Strategy, design and engineering come together as one system — so ambitious businesses can move with clarity.";

  return <div className="welcome-v47-backdrop welcome-v67-backdrop" onMouseDown={e=>e.currentTarget===e.target&&close()}>
    <section className="welcome-v47 welcome-v67" role="dialog" aria-modal="true" aria-labelledby="welcome-v47-title">
      <button className="welcome-v47-close" onClick={close} aria-label="Close"><X size={16}/></button>
      <div className="welcome-v47-brandline"><img src="/assets/xynysys-navbar-horizontal.png" alt="Xynysys Corporation"/><span>HAMILTON · ONTARIO</span></div>
      <div className="welcome-v47-rule"/>
      <span className="welcome-v47-kicker">{config?.kicker||"WELCOME TO XYNYSYS"}</span>
      <h2 id="welcome-v47-title" className="welcome-v67-title">
        <span>{lead}</span>
        <em>{accent}</em>
      </h2>
      <p>{message}</p>
      <div className="welcome-v47-actions">
        <button type="button" onClick={close}>{config?.primaryLabel||"Enter Xynysys"} <ArrowRight size={15}/></button>
        <a href="/book-call" onClick={close}>{config?.secondaryLabel||"Book a discovery call"}</a>
      </div>
      <div className="welcome-v47-foot"><span>Strategy</span><i/><span>Software</span><i/><span>AI</span><i/><span>Cloud</span></div>
    </section>
  </div>
}
