'use client';
import Link from 'next/link';
import type {Language} from '@/lib/translations';
export function ServicesMenu({language,onNavigate,mobile=false}:{language:Language;onNavigate:()=>void;mobile?:boolean}){
 const t=(kr:string,en:string,jp:string)=>language==='kr'?kr:language==='jp'?jp:en;
 return <details className="services-menu" onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))e.currentTarget.open=false}} onKeyDown={e=>{if(e.key==='Escape'){e.currentTarget.open=false;e.currentTarget.querySelector('summary')?.focus()}}}>
 <summary>{t('서비스','Services','サービス')} <span aria-hidden="true">⌄</span><sup>02</sup></summary>
 <div className="services-submenu">{[
 ['/products',t('제품','Products','製品'),t('취급 제품 살펴보기','Explore our products','取扱製品を見る')],
 ['/marketing',t('마케팅','Marketing','マーケティング'),t('All-in-One 마케팅','All-in-One marketing','All-in-Oneマーケティング')],
 ['/brands',t('브랜드','Brands','ブランド'),t('함께하는 브랜드','Our brand portfolio','取扱ブランド')]
 ].map(([href,label,description])=><Link href={href} key={href} onClick={e=>{e.currentTarget.closest('details')?.removeAttribute('open');onNavigate()}}><span>{label}<b aria-hidden="true">↗</b></span><small>{description}</small></Link>)}</div></details>;
}
