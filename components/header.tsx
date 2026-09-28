'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useRef,useState,type MouseEvent} from 'react';
const links=[['/about-me','/About KIKAE','01'],['/projects/tools-power-tools','/Products','02'],['/#services','/Partnership','03'],['/page','/VIEW','04']];
export function Header(){
 const [open,setOpen]=useState(false);const pathname=usePathname();const toggle=useRef<HTMLButtonElement>(null);const panel=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(!open)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';panel.current?.querySelector<HTMLAnchorElement>('a')?.focus();
 const key=(event:KeyboardEvent)=>{if(event.key==='Escape'){setOpen(false);toggle.current?.focus()}if(event.key==='Tab'){const items=[toggle.current,...Array.from(panel.current?.querySelectorAll<HTMLAnchorElement>('a')||[])].filter(Boolean) as HTMLElement[];const first=items[0],last=items.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus()}}};
 const media=matchMedia('(min-width:810px)');const resize=()=>{if(media.matches)setOpen(false)};media.addEventListener('change',resize);document.addEventListener('keydown',key);return()=>{document.body.style.overflow=previous;document.removeEventListener('keydown',key);media.removeEventListener('change',resize)};
 },[open]);
 const goHome=(event:MouseEvent<HTMLAnchorElement>)=>{
  if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  setOpen(false);
  if(pathname==='/'){
   event.preventDefault();
   window.history.replaceState(window.history.state,'','/');
   requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:'instant'}));
  }
 };
 const navLink=(href:string,label:string,num:string)=><Link href={href} key={label} onClick={()=>setOpen(false)} aria-current={pathname===href?'page':undefined}><span className="nav-roll"><span>{label}</span><span aria-hidden="true">{label}</span></span><sup>{num}</sup></Link>;
 return <header className={open?'site-header menu-open':'site-header'}><a className="brand" href="/" aria-label="KIKAE home" onClick={goHome}><img src="/assets/logo.png" width="117" height="48" alt="KIKAE"/></a><nav className="desktop-nav" aria-label="Main navigation">{links.map(l=>navLink(...l as [string,string,string]))}</nav><Link className="button desktop-contact" href="/contact">CONTACT NOW <span aria-hidden="true">↗</span></Link><button ref={toggle} className="menu-toggle" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}><span/><span/></button><div ref={panel} id="mobile-navigation" className="mobile-panel" hidden={!open}><nav aria-label="Mobile navigation">{links.map(([href,label,num])=>navLink(label==='/Products'?'/#works':href,label,num))}</nav><Link className="button" href="/contact" onClick={()=>setOpen(false)}>CONTACT NOW <span aria-hidden="true">↗</span></Link></div></header>
}
