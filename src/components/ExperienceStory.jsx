import React,{useEffect,useRef,useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import {ArrowUpRight,Building2,Workflow,BarChart3,Users,CalendarCheck,Activity} from "lucide-react";
const scenarios=[
{key:"commerce",label:"LOCAL COMMERCE",title:"Turn a local business into a digital operating system.",eyebrow:"01 / CUSTOMER GROWTH",description:"Lead capture, booking, quoting, follow-up and reporting become one connected customer journey instead of five disconnected tools.",metrics:[["38%","More qualified leads"],["2.4×","Faster response time"],["24/7","Customer access"]],activity:["New lead captured","Quote automatically generated","Customer follow-up sent","Dashboard synchronized"],icon:Building2},
{key:"operations",label:"SERVICE OPERATIONS",title:"Give customers visibility without creating more admin work.",eyebrow:"02 / OPERATIONAL CLARITY",description:"A secure client portal connects requests, appointments, documents and live status updates around the actual service journey.",metrics:[["31%","Fewer status calls"],["1 view","Customer timeline"],["4 hrs","Admin time saved"]],activity:["Appointment confirmed","Document securely uploaded","Status automatically updated","Customer notified"],icon:Workflow},
{key:"intelligence",label:"INTELLIGENCE",title:"Make scattered business data useful in one screen.",eyebrow:"03 / DECISION SYSTEMS",description:"Sales, website, CRM and operational data are shaped into an executive layer that makes priorities and performance visible.",metrics:[["Live","Business KPIs"],["6×","Faster reporting"],["100%","Shared visibility"]],activity:["CRM data synchronized","Revenue model refreshed","Anomaly detected","Executive report published"],icon:BarChart3}
];
function MiniChart({scenarioKey}){
  const wrapRef=useRef(null);

  useEffect(()=>{
    const root=wrapRef.current;
    if(!root)return;
    const line=root.querySelector(".chart-line");
    const reveal=root.querySelector(".chart-reveal");
    const glow=root.querySelector(".chart-end-dot");
    const length=line.getTotalLength();

    const ctx=gsap.context(()=>{
      gsap.set(line,{strokeDasharray:length,strokeDashoffset:length});
      gsap.set(reveal,{attr:{width:0}});
      gsap.set(glow,{autoAlpha:0,scale:.35,transformOrigin:"center"});

      const play=()=>{
        gsap.killTweensOf([line,reveal,glow]);
        const tl=gsap.timeline();
        tl.to(line,{strokeDashoffset:0,ease:"power1.out",duration:1.05},0)
          .to(reveal,{attr:{width:540},ease:"power1.out",duration:1.05},0)
          .to(glow,{autoAlpha:1,scale:1,ease:"back.out(2)",duration:.24},.88);
      };

      const rect=root.getBoundingClientRect();
      if(rect.top < window.innerHeight*1.12){
        play();
      }else{
        ScrollTrigger.create({
          trigger:root.closest(".chart-card"),
          start:"top 112%",
          once:true,
          onEnter:play
        });
      }
    },root);

    return()=>ctx.revert();
  },[scenarioKey]);

  return <div className="experience-chart-wrap" ref={wrapRef}>
    <svg className="experience-chart" viewBox="0 0 520 150" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`fill-${scenarioKey}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5277ff" stopOpacity=".34"/>
          <stop offset="1" stopColor="#5277ff" stopOpacity="0"/>
        </linearGradient>
        <clipPath id={`chart-clip-${scenarioKey}`}>
          <rect className="chart-reveal" x="0" y="0" width="0" height="150"/>
        </clipPath>
        <filter id={`chart-dot-glow-${scenarioKey}`} x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <g clipPath={`url(#chart-clip-${scenarioKey})`}>
        <path className="chart-area" fill={`url(#fill-${scenarioKey})`} d="M0 124 C40 108,54 112,84 88 S136 98,168 69 S220 79,250 50 S302 70,336 42 S395 58,430 29 S480 40,514 13 L514 150 L0 150Z"/>
      </g>

      <path className="chart-line" d="M0 124 C40 108,54 112,84 88 S136 98,168 69 S220 79,250 50 S302 70,336 42 S395 58,430 29 S480 40,514 13"/>
      <circle className="chart-end-dot" cx="514" cy="13" r="3.2" filter={`url(#chart-dot-glow-${scenarioKey})`}/>
    </svg>
  </div>;
}
export default function ExperienceStory(){
  const [active,setActive]=useState(0);
  const [visible,setVisible]=useState(false);
  const [cycleKey,setCycleKey]=useState(0);
  const sectionRef=useRef(null);
  const item=scenarios[active];
  const Icon=item.icon;

  useEffect(()=>{
    const node=sectionRef.current;
    if(!node)return;
    const observer=new IntersectionObserver(
      entries=>setVisible(entries[0]?.isIntersecting||false),
      {threshold:.18,rootMargin:"80px 0px 80px 0px"}
    );
    observer.observe(node);
    return()=>observer.disconnect();
  },[]);

  useEffect(()=>{
    if(!visible)return;
    const timer=setInterval(()=>{
      setActive(current=>(current+1)%scenarios.length);
    },4000);
    return()=>clearInterval(timer);
  },[visible,cycleKey]);

  const chooseScenario=i=>{
    setActive(i);
    setCycleKey(k=>k+1);
  };

  return <section ref={sectionRef} className="experience-story" id="experience">
    <div className="experience-story-shell">
      <header className="experience-story-head story-reveal">
        <div>
          <span className="story-kicker">THE EXPERIENCE LAYER</span>
          <h2>Technology should feel like<br/><em>one coherent system.</em></h2>
        </div>
        <p>As a business grows, its digital experience often fragments. Xynysys connects the customer-facing experience to the systems operating behind it.</p>
      </header>

      <div className="experience-composer story-reveal">
        <nav className="experience-tabs">
          {scenarios.map((s,i)=>
            <button key={s.key} onClick={()=>chooseScenario(i)} className={i===active?"active":""}>
              <span>0{i+1}</span>
              <div><small>{s.label}</small><strong>{s.title}</strong></div>
              <ArrowUpRight size={15}/>
              {i===active&&visible&&<i className="experience-tab-progress" key={`${active}-${cycleKey}`}/>}
            </button>
          )}
        </nav>

        <div className="experience-product">
          <div className="product-window">
            <div className="product-topbar">
              <div className="traffic"><i/><i/><i/></div>
              <div className="product-url">workspace.xynysys.system</div>
              <span className="live-pill"><i/> Live system</span>
            </div>

            <div className="product-body">
              <aside className="product-rail">
                <div className="rail-logo">X</div>
                <button className="on"><Activity size={16}/></button>
                <button><Users size={16}/></button>
                <button><CalendarCheck size={16}/></button>
                <button><BarChart3 size={16}/></button>
              </aside>

              <main className="product-main" key={item.key}>
                <div className="product-heading">
                  <div><span>{item.eyebrow}</span><h3>{item.title}</h3></div>
                  <div className="product-icon"><Icon size={23}/></div>
                </div>

                <div className="metric-grid">
                  {item.metrics.map(([v,l])=><article key={l}><span>{l}</span><strong>{v}</strong><small>↗ improving</small></article>)}
                </div>

                <div className="product-lower">
                  <section className="chart-card">
                    <div className="card-label">BUSINESS SIGNAL</div>
                    <MiniChart scenarioKey={item.key}/>
                    <div className="chart-axis"><span>JAN</span><span>MAR</span><span>MAY</span><span>JUL</span><span>SEP</span><span>NOV</span></div>
                  </section>
                  <section className="activity-card">
                    <div className="card-label">WORKFLOW ACTIVITY</div>
                    {item.activity.map((x,i)=><div className="activity-item" key={x}><i/><span>{x}</span><small>{i===0?"now":`${i*4+3}m`}</small></div>)}
                  </section>
                </div>
              </main>
            </div>
          </div>

          <div className="experience-caption">
            <span>{item.label}</span>
            <p>{item.description}</p>
            <a href="#contact">Build this capability <ArrowUpRight size={14}/></a>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
