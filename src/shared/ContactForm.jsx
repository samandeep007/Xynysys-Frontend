import{cmsFetch}from"../lib/cmsApi.js";
import React,{useState} from "react";
import {ArrowRight} from "lucide-react";
import FeedbackModal from "../components/FeedbackModal.jsx";
import {track} from "../components/Analytics.jsx";

export default function ContactForm(){
  const [submitting,setSubmitting]=useState(false);
  const [modal,setModal]=useState({open:false,type:"success",title:"",message:""});
  async function submit(e){
    e.preventDefault();
    const form=e.currentTarget;
    const data=Object.fromEntries(new FormData(form));
    setSubmitting(true);
    try{
      const r=await cmsFetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
      if(!r.ok)throw new Error("Unable to send right now. Please email support@xynysys.com.");
      form.reset();track("lead_submitted",{source:"contact"});
      setModal({open:true,type:"success",title:"Project brief received.",message:"Thanks for reaching out. We’ll review what you shared and get back to you with the clearest next step."});
    }catch(err){
      setModal({open:true,type:"error",title:"We couldn’t send that.",message:err.message||"Please try again or email support@xynysys.com."});
    }finally{setSubmitting(false)}
  }
  return <>
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row"><label>Name<input name="name" required/></label><label>Company<input name="company"/></label></div>
      <div className="form-row"><label>Email<input type="email" name="email" required/></label><label>Phone<input name="phone"/></label></div>
      <label>What can we help you build?<select name="service"><option>Custom software</option><option>Website / web application</option><option>Cloud & DevOps</option><option>AI & automation</option><option>Cybersecurity</option><option>Product design</option></select></label>
      <label>Project brief<textarea name="message" rows="5" required placeholder="Tell us about the outcome you want to achieve."/></label>
      <input className="form-honeypot" name="website" tabIndex="-1" autoComplete="off"/><button className="form-submit" disabled={submitting}>{submitting?"Sending…":<>Send project brief <ArrowRight size={16}/></>}</button>
    </form>
    <FeedbackModal {...modal} onClose={()=>setModal(m=>({...m,open:false}))}/>
  </>
}
