import {getLanguage} from './language';
import {translator} from './translations';
import type {Metadata} from 'next';
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'));
export async function pageMetadata(title:string, description:string, path:string, image?:string):Promise<Metadata> {
 const language=await getLanguage();const t=translator(language);title=t(title);description=t(description);
 const url = new URL(path, siteUrl).toString();
 return {title:{absolute:`${title} — KIKAE`},description,alternates:{canonical:url},openGraph:{title:`${title} — KIKAE`,description,url,type:'website',siteName:'KIKAE',locale:language==='jp'?'ja_JP':'en_US',...(image?{images:[{url:new URL(`/assets/${image}`,siteUrl).toString(),alt:title}]}:{})},twitter:{card:image?'summary_large_image':'summary',title:`${title} — KIKAE`,description,...(image?{images:[new URL(`/assets/${image}`,siteUrl).toString()]}:{})}};
}
