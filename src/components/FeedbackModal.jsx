import React,{useEffect} from "react";
import {AlertTriangle,CheckCircle2,Info,X} from "lucide-react";

const config={
  success:{Icon:CheckCircle2,label:"Success"},
  error:{Icon:AlertTriangle,label:"Something went wrong"},
  info:{Icon:Info,label:"Update"}
};

export default function FeedbackModal({open,type="success",title,message,onClose,primaryLabel="Done"}){
  useEffect(()=>{
    if(!open)return;
    const onKey=e=>{if(e.key==="Escape")onClose?.()};
    window.addEventListener("keydown",onKey);
    const previous=document.body.style.overflow;
    document.body.style.overflow="hidden";
    return()=>{window.removeEventListener("keydown",onKey);document.body.style.overflow=previous};
  },[open,onClose]);
  if(!open)return null;
  const {Icon,label}=config[type]||config.info;
  return <div className="site-modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose?.()}}>
    <section className={`site-modal site-modal-${type}`} role="dialog" aria-modal="true" aria-labelledby="site-modal-title">
      <button className="site-modal-close" type="button" onClick={onClose} aria-label="Close"><X size={17}/></button>
      <div className="site-modal-icon"><Icon size={25}/></div>
      <span className="site-modal-kicker">{label}</span>
      <h3 id="site-modal-title">{title||label}</h3>
      {message&&<p>{message}</p>}
      <button className="site-modal-primary" type="button" onClick={onClose}>{primaryLabel}</button>
    </section>
  </div>
}
