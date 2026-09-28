import type {MetadataRoute} from 'next';
import {products} from '@/lib/content';
import {siteUrl} from '@/lib/seo';
export default function sitemap():MetadataRoute.Sitemap{return ['/', '/about-me', '/contact', '/page',...products.map(p=>`/projects/${p.slug}`)].map(path=>({url:new URL(path,siteUrl).toString(),changeFrequency:'monthly',priority:path==='/'?1:.7}))}
