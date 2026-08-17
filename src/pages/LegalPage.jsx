import React from "react";
import Header from "../shared/Header.jsx";
import Footer from "../shared/Footer.jsx";

const pages={
privacy:{title:"Privacy Policy",updated:"August 4, 2026",sections:[
["Information We Collect","We may collect information you provide directly, including your name, email address, telephone number, company information, project details, employment application information and files you choose to submit."],
["How We Use Information","We use information to respond to inquiries, provide and improve services, manage recruiting, operate our website and administrative systems, maintain security, comply with legal obligations and communicate about relevant business matters."],
["Service Providers","We may use service providers for hosting, cloud storage, analytics, email, security and related technology operations. These providers process information on our behalf under their applicable terms and safeguards."],
["Retention and Security","We retain information for as long as reasonably necessary for the purposes for which it was collected and apply technical and organizational measures intended to protect it from unauthorized access, loss or misuse."],
["Your Choices","You may contact us to request access to, correction of, or deletion of personal information where applicable. Contact support@xynysys.com."],
["Contact","Privacy inquiries can be sent to support@xynysys.com or by phone at 437-473-1577."]
]},
terms:{title:"Terms & Conditions",updated:"August 4, 2026",sections:[
["Use of This Website","You may use this website for lawful informational and business purposes. You must not attempt to disrupt the website, access restricted systems without authorization, or misuse website content or services."],
["Services and Proposals","Website content is general information and does not itself create a client engagement. Specific services, deliverables, fees, timelines, intellectual-property terms and responsibilities are governed by the applicable written proposal, statement of work or agreement."],
["Intellectual Property","Unless otherwise indicated, Xynysys Corporation owns or licenses the website design, text, graphics, software and brand materials. No ownership rights are transferred through access to this website."],
["Third-Party Services","The website may use or link to third-party platforms. Xynysys Corporation is not responsible for third-party sites, products or services outside its control."],
["Limitation","To the extent permitted by applicable law, Xynysys Corporation is not liable for indirect, incidental or consequential losses arising solely from use of this public website."],
["Contact","Questions about these terms can be sent to support@xynysys.com."]
]},
cookies:{title:"Cookie Policy",updated:"August 4, 2026",sections:[
["Cookies and Similar Technologies","Our website may use cookies and similar technologies required for security, functionality, preferences and measurement."],
["Essential Technologies","Essential technologies support core functionality such as secure sessions, administration and protection against misuse."],
["Analytics","Where analytics tools are enabled, they may collect technical and usage information to help us understand website performance and improve user experience."],
["Managing Cookies","You can control cookies through your browser settings. Blocking certain technologies may affect website functionality."],
["Contact","Questions about cookies or website data practices can be sent to support@xynysys.com."]
]},
accessibility:{title:"Accessibility",updated:"August 4, 2026",sections:[
["Our Commitment","Xynysys Corporation aims to provide a website and digital experience that can be used by people with diverse abilities and technologies."],
["Design and Development","We consider semantic structure, keyboard access, responsive layouts, readable contrast, alternative text, reduced-motion preferences and clear interaction states as part of our design and engineering process."],
["Feedback","If you encounter an accessibility barrier on this website, contact support@xynysys.com or 437-473-1577. Please include the page and a description of the issue so we can investigate."]
]}
};

export default function LegalPage({type}){
  const p=pages[type]||pages.privacy;
  return <div className="corporate-page"><div className="page-dark"><Header/><div className="legal-hero"><div className="micro blue">XYNYSYS CORPORATION</div><h1>{p.title}</h1><p>Last updated {p.updated}</p></div></div><main className="legal-content">{p.sections.map(([h,b])=><section key={h}><h2>{h}</h2><p>{b}</p></section>)}</main><Footer/></div>
}
