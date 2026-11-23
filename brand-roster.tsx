'use client';
import {useState} from 'react';
import {brands} from '@/lib/showcase';
import type {Language} from '@/lib/translations';
export function BrandRoster({language}:{language:Language}){
 const [slots,setSlots]=useState([0,1,2,10,11,12]);
 const change=(slot:number)=>setSlots(old=>{const next=[...old];let candidate=(old[slot]+1)%brands.length;while(old.includes(candidate))candidate=(candidate+1)%brands.length;next[slot]=candidate;return next;});
 const label=language==='kr'?'다른 브랜드 보기':language==='jp'?'別のブランドを見る':'Show another brand';
 return <div className="brand-roster">{slots.map((index,slot)=>{const b=brands[index];return <button type="button" className="roster-slot" key={slot} onPointerEnter={e=>{if(e.pointerType==='mouse')change(slot)}} onPointerUp={e=>{if(e.pointerType!=="mouse")change(slot)}} onClick={e=>{if(e.detail===0)change(slot)}} aria-label={`${b.name} — ${label}`}><span className="roster-art" key={index}>{'image' in b?<img src={`/assets/brands/${b.image}`} alt={b.name}/>:<span role="img" aria-label={b.name} className="sc-sheet-logo" style={{backgroundPosition:`-${b.x}px -${b.y}px`}}/>}</span><span className="roster-name">{b.name}</span></button>})}</div>;
}
