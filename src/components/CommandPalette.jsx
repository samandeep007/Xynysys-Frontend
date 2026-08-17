import React,{useEffect,useMemo,useRef,useState} from "react";
import {Search,ArrowUpRight,BriefcaseBusiness,CalendarDays,BookOpen,Boxes,Code2,X} from "lucide-react";

const base=[
  {label:"Explore services",href:"/services",meta:"What we build",icon:Boxes},
  {label:"View case studies",href:"/work",meta:"Selected work",icon:BriefcaseBusiness},
  {label:"Read insights",href:"/insights",meta:"Engineering & product thinking",icon:BookOpen},
  {label:"Build your system",href:"/system-builder",meta:"Interactive recommendation",icon:Code2},
  {label:"Book a discovery call",href:"/book-call",meta:"30-minute consultation",icon:CalendarDays},
  {label:"Careers",href:"/careers",meta:"Join Xynysys",icon:ArrowUpRight},
];

export default function CommandPalette(){
  const [open,setOpen]=useState(false),[q,setQ]=useState("");
  const input=useRef(null);
  useEffect(()=>{const key=e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();setOpen(v=>!v)}if(e.key==="Escape")setOpen(false)};const openPalette=()=>setOpen(true);window.addEventListener("keydown",key);window.addEventListener("xynysys:command-open",openPalette);return()=>{window.removeEventListener("keydown",key);window.removeEventListener("xynysys:command-open",openPalette)}},[]);
  useEffect(()=>{if(open)setTimeout(()=>input.current?.focus(),40)},[open]);
  const items=useMemo(()=>base.filter(x=>`${x.label} ${x.meta}`.toLowerCase().includes(q.toLowerCase())),[q]);
  if(!open)return <button className="command-fab" onClick={()=>setOpen(true)} aria-label="Open site command palette"><Search size={13}/><span>Search</span><kbd>⌘K</kbd></button>;
  return <div className="command-backdrop" onMouseDown={e=>e.target===e.currentTarget&&setOpen(false)}>
    <section className="command-panel" role="dialog" aria-modal="true" aria-label="Xynysys navigation">
      <div className="command-input"><Search size={17}/><input ref={input} value={q} onChange={e=>setQ(e.target.value)} placeholder="Where do you want to go?"/><button onClick={()=>setOpen(false)}><X size={15}/></button></div>
      <div className="command-results">{items.map(({label,href,meta,icon:Icon})=><a href={href} key={href} onClick={()=>setOpen(false)}><span className="command-icon"><Icon size={16}/></span><span><strong>{label}</strong><small>{meta}</small></span><ArrowUpRight size={14}/></a>)}</div>
      <footer><span>Navigate Xynysys</span><span><kbd>ESC</kbd> close</span></footer>
    </section>
  </div>;
}
