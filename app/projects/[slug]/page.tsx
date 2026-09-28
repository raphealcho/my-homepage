import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {products} from '@/lib/content';
import {pageMetadata} from '@/lib/seo';
import {ProductCard,Tags} from '@/components/product-card';
export const dynamicParams=false;
export function generateStaticParams(){return products.map(p=>({slug:p.slug}))}
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props){const {slug}=await params;const p=products.find(p=>p.slug===slug);if(!p)notFound();return pageMetadata(p.title,p.description,`/projects/${p.slug}`,p.image)}
export default async function Project({params}:Props){const {slug}=await params;const p=products.find(p=>p.slug===slug);if(!p)notFound();return <article className="page detail"><Link className="back" href="/#works">← Back</Link><h1>{p.title}</h1><div className="detail-intro"><div><p>{p.description}</p><Tags product={p}/></div><div className="detail-meta">Year : {p.year}<br/><br/>{p.title}</div></div><Image className="detail-hero" src={`/assets/${p.image}`} alt={p.title} width={1448} height={1086} priority sizes="100vw"/><section className="overview" data-reveal><h2>Overview</h2><p>{p.overview}</p></section><div className="detail-gallery" data-reveal>{p.gallery.map((image,i)=><div key={image}><Image src={`/assets/${image}`} alt={`${p.title} — detail ${i+1}`} fill sizes="(max-width:809px) 100vw, 50vw"/></div>)}</div><dl className="project-facts" data-reveal>{[['Scope',p.scope],['Tools used',p.channels],['Timeline',p.timeline]].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><Image className="detail-hero" src={`/assets/${p.lastImage}`} alt={`${p.title} — in use`} width={1440} height={1000} sizes="100vw"/><section className="more"><h2>More projects</h2><div className="more-grid">{products.filter(x=>x.slug!==slug).map(x=><ProductCard product={x} compact key={x.slug}/>)}</div></section></article>}
