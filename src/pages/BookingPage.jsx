import React from "react";
import {ArrowLeft,CalendarDays,Clock,ShieldCheck} from "lucide-react";
import Header from "../shared/Header.jsx";
import Footer from "../shared/Footer.jsx";
import BookingSection from "../components/BookingSection.jsx";

export default function BookingPage(){
  return <div className="booking-page-v38">
    <Header/>
    <main>
      <section className="booking-page-intro">
        <div className="booking-page-grid"/>
        <div className="booking-page-glow booking-page-glow-a"/>
        <div className="booking-page-glow booking-page-glow-b"/>
        <div className="v14-wrap booking-page-intro-inner">
          <a className="booking-back" href="/"><ArrowLeft size={15}/>Back to Xynysys</a>
          <span className="story-kicker">FREE 30-MINUTE CONSULTATION</span>
          <h1>Choose a time.<br/><em>Bring the idea.</em></h1>
          <p>Pick an available 30-minute window and tell us what you want to build. Availability is checked against business hours, website bookings, admin blocks and your connected calendar.</p>
          <div className="booking-page-facts">
            <span><Clock size={15}/>30 minutes</span>
            <span><CalendarDays size={15}/>9 AM–6 PM daily</span>
            <span><ShieldCheck size={15}/>Live conflict checking</span>
          </div>
        </div>
      </section>
      <BookingSection/>
    </main>
    <Footer/>
  </div>
}
