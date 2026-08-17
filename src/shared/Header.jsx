import{cmsFetch,useSiteContent}from"../lib/cmsApi.js";
import React,{useEffect,useState} from "react";
import {Menu,X,ArrowUpRight,ChevronDown,Search} from "lucide-react";

export default function Header({dark=true}){
  const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false),[booking,setBooking]=useState(null);
  const site=useSiteContent(),managedLinks=site?.navigation?.links||[];
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>28);fn();window.addEventListener('scroll',fn,{passive:true});cmsFetch('/api/booking/settings').then(r=>r.ok?r.json():null).then(setBooking).catch(()=>{});return()=>window.removeEventListener('scroll',fn)},[]);
  const ctaHref=booking?.enabled?"/book-call":"/#contact",ctaLabel=booking?.enabled?(booking.ctaLabel||"Book a discovery call"):"Let's Build";
  return <header className={`topbar ${dark?"topbar-dark":"topbar-light"} ${scrolled?"is-scrolled":""}`}>
    <a href="/" className="brand-lockup brand-lockup-horizontal" aria-label="Xynysys Corporation home"><img src="/assets/xynysys-navbar-horizontal.png" alt="Xynysys Corporation" width="520" height="100"/></a>
    <nav className="desktop-nav" aria-label="Primary navigation">
      {(managedLinks.length?managedLinks:[
        {label:"Services",href:"/services"},{label:"Work",href:"/work"},{label:"Experience",href:"/#experience"},{label:"Insights",href:"/insights"},{label:"Careers",href:"/careers"}
      ]).map((link,i)=><a href={link.href||"#"} key={`${link.label}-${i}`}>{link.label}{link.label==="Services"&&<ChevronDown size={11}/>}</a>)}
    </nav>
    <div className="nav-actions"><button type="button" className="nav-command-hint nav-search-trigger" onClick={()=>window.dispatchEvent(new CustomEvent("xynysys:command-open"))} aria-label="Search Xynysys"><Search size={13}/><span>Search</span><kbd>⌘K</kbd></button><a className="nav-build" href={ctaHref}>{ctaLabel}<ArrowUpRight size={15}/></a><button className="nav-menu" onClick={()=>setOpen(v=>!v)} aria-label={open?"Close menu":"Open menu"}>{open?<X size={18}/>:<Menu size={18}/>}</button></div>
    {open&&<div className="mobile-nav">{(managedLinks.length?managedLinks:[
      {label:"Services",href:"/services"},{label:"Work",href:"/work"},{label:"Experience",href:"/#experience"},{label:"Insights",href:"/insights"},{label:"Careers",href:"/careers"}
    ]).map((link,i)=><a href={link.href||"#"} key={`${link.label}-${i}`}>{link.label}</a>)}<a href="/system-builder">System Builder</a><a href={ctaHref}>{ctaLabel}</a><a href="/#contact">Contact</a></div>}
  </header>
}
