'use client';
import {useEffect,useRef} from 'react';
import {usePathname} from 'next/navigation';
export function Motion(){const path=usePathname();const cursor=useRef<HTMLDivElement>(null);
 useEffect(()=>{const reduced=matchMedia('(prefers-reduced-motion: reduce)');if(reduced.matches)return;
 const elements=document.querySelectorAll<HTMLElement>('[data-reveal]');const observer=new IntersectionObserver(entries=>{entries.forEach(({target,isIntersecting})=>{if(isIntersecting){target.classList.add('is-visible');observer.unobserve(target)}})},{threshold:.08});elements.forEach(el=>{if(el.getBoundingClientRect().top>innerHeight*.95){el.classList.add('will-reveal');observer.observe(el)}});
 const videos=document.querySelectorAll<HTMLVideoElement>('video');const videoObserver=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{const video=target as HTMLVideoElement;if(isIntersecting&&!reduced.matches)video.play().catch(()=>{});else video.pause()}));videos.forEach(v=>videoObserver.observe(v));
 return()=>{observer.disconnect();videoObserver.disconnect();elements.forEach(el=>el.classList.remove('will-reveal'))};},[path]);
 useEffect(()=>{if(!matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches)return;const el=cursor.current!;const move=(e:PointerEvent)=>{el.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`;el.classList.add('active');el.classList.toggle('over-link',!!(e.target as HTMLElement).closest('a,button'))};const leave=()=>el.classList.remove('active');window.addEventListener('pointermove',move);document.addEventListener('pointerleave',leave);return()=>{window.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',leave)}},[]);
 return <div ref={cursor} className="cursor" aria-hidden="true"><span/></div>
}
export function Reel({label}:{label:string}){const ref=useRef<HTMLVideoElement>(null);useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>{if(media.matches)ref.current?.pause();else ref.current?.play().catch(()=>{})};sync();media.addEventListener('change',sync);return()=>media.removeEventListener('change',sync)},[]);return <video ref={ref} muted loop playsInline preload="none" poster="/assets/hero.png" aria-label={label}><source src="/assets/hero.mp4" type="video/mp4"/></video>}
