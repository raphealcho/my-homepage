import {getLanguage} from '@/lib/language';
import {translator} from '@/lib/translations';
import type {Metadata,Viewport} from 'next';
import localFont from 'next/font/local';
import {Header} from '@/components/header';
import {Motion} from '@/components/motion';
import {siteUrl} from '@/lib/seo';
import './globals.css';
const inter=localFont({src:[{path:'../public/assets/inter-display.woff2',weight:'400',style:'normal'},{path:'../public/assets/inter-display-medium.woff2',weight:'500',style:'normal'},{path:'../public/assets/inter-display-bold.woff2',weight:'700',style:'normal'}],display:'swap',variable:'--font-inter'});
export async function generateMetadata():Promise<Metadata>{const t=translator(await getLanguage());return {metadataBase:siteUrl,title:{default:t('KIKAE — Tools Become Culture'),template:'%s — KIKAE'},description:t('Quality before brand. Products worth using for years.'),applicationName:'KIKAE',robots:process.env.VERCEL_ENV==='preview'?{index:false,follow:false}:{index:true,follow:true},icons:{icon:[{url:'/favicon.ico',sizes:'32x32'},{url:'/icon.png',type:'image/png',sizes:'192x192'}],apple:'/apple-icon.png'}};}
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#000000'};
export default async function RootLayout({children}:Readonly<{children:React.ReactNode}>){const language=await getLanguage();const t=translator(language);return <html lang={language==='jp'?'ja':'en'} className={inter.variable}><body><a className="skip" href="#main">{t('Skip to content')}</a><Header language={language}/><main id="main">{children}</main><Motion key={language}/></body></html>}
