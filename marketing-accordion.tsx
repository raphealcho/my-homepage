'use client';
import {useState} from 'react';
type Service={title:string;body:string;tag:string;logo?:string;name?:string};
export function MarketingAccordion({items,contact}:{items:Service[];contact:string}){
 const [active,setActive]=useState<number|null>(0);
 const selected=items[active??0];
 return <div className="mk-editorial"><div className="mk-accordion">{items.map((item,i)=><div className={`mk-row ${active===i?'is-open':''}`} key={item.tag}><h3><button type="button" id={`service-trigger-${i}`} aria-expanded={active===i} aria-controls={`service-body-${i}`} onClick={()=>setActive(active===i?null:i)}><span>{item.title}</span><span className="mk-toggle" aria-hidden="true">{active===i?'−':'+'}</span></button></h3><div id={`service-body-${i}`} role="region" aria-labelledby={`service-trigger-${i}`} hidden={active!==i}><p>{item.body}</p></div></div>)}</div><aside className="mk-feature"><div className="mk-feature-art" key={selected.tag}>{selected.logo?<img src={`/assets/platforms/${selected.logo}.svg`} alt={selected.name}/>:(active===1?<div className="mk-strategy-art" aria-hidden="true"><div className="mk-strategy-top"><span>02 / THE CONNECTED SYSTEM</span><b>↗</b></div><div className="mk-strategy-map"><svg viewBox="0 0 500 240" preserveAspectRatio="none"><path d="M80 55H180L250 120L320 55H420 M80 185H180L250 120L320 185H420" /></svg><span className="mk-node mk-node-a">SEARCH<small>NAVER / GOOGLE</small></span><span className="mk-node mk-node-b">ADS<small>GOOGLE / META</small></span><strong>ONE<br/>STRATEGY</strong><span className="mk-node mk-node-c">WEBSITE<small>BRAND EXPERIENCE</small></span><span className="mk-node mk-node-d">SALES<small>DISTRIBUTION</small></span></div><div className="mk-strategy-bottom"><span>INSIGHT</span><i/><span>EXECUTION</span><i/><span>OPTIMIZATION</span></div></div>:<div className="mk-homepage-demo" role="img" aria-label="Architecture studio website design concept">
<div className="mk-demo-browser"><span><i/><i/><i/></span><small>atelier-studio.com</small><b>↗</b></div>
<div className="mk-demo-page">
<div className="mk-demo-nav"><b>atelier<span>®</span></b><span>Studio &nbsp;&nbsp; Projects &nbsp;&nbsp; Journal</span><em>LET'S TALK ↗</em></div>
<div className="mk-demo-hero">
<div className="mk-demo-copy"><small>ARCHITECTURE & INTERIORS — SEOUL</small><strong>Spaces for<br/>a slower<br/><em>way of living.</em></strong><p>Thoughtful spaces. Natural materials.<br/>Designed around the way you live.</p><span className="mk-demo-cta">Explore our work <b>↗</b></span></div>
<div className="mk-room"><div className="mk-room-window"><i/><i/></div><div className="mk-room-light"/><div className="mk-room-pedestal"/><div className="mk-room-vase"/><div className="mk-room-caption">THE QUIET RESIDENCE <span>2026 ↗</span></div></div>
</div>
<div className="mk-demo-projects"><div><small>01 / SELECTED WORK</small><strong>Considered in every detail.</strong></div><span>VIEW ALL PROJECTS ↗</span></div>
<div className="mk-demo-project-grid"><div><i className="mk-sample-one"/><span>Seongsu Residence <b>2026</b></span></div><div><i className="mk-sample-two"/><span>The Material House <b>2025</b></span></div><div><i className="mk-sample-three"/><span>A Place to Pause <b>2025</b></span></div></div>
</div><div className="mk-demo-label">WEBSITE DESIGN CONCEPT / KIKAE</div>
</div>)}</div><p className="mk-tag">{selected.tag}</p><h4>{selected.title}</h4><a href="/contact" className="sc-text-link">{contact} ↗</a></aside></div>;
}
