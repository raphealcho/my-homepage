import type {Metadata,Viewport} from 'next';
import localFont from 'next/font/local';
import {Header} from '@/components/header';
import {Motion} from '@/components/motion';
import {siteUrl} from '@/lib/seo';
import './globals.css';
const inter=localFont({src:[{path:'../public/assets/inter-display.woff2',weight:'400',style:'normal'},{path:'../public/assets/inter-display-medium.woff2',weight:'500',style:'normal'},{path:'../public/assets/inter-display-bold.woff2',weight:'700',style:'normal'}],display:'swap',variable:'--font-inter'});
export const metadata:Metadata={metadataBase:siteUrl,title:{default:'KIKAE — Tools Become Culture',template:'%s — KIKAE'},description:'Quality before brand. Products worth using for years. KIKAE selects quality tools and connects manufacturers with the Korean market.',applicationName:'KIKAE',robots:process.env.VERCEL_ENV==='preview'?{index:false,follow:false}:{index:true,follow:true},icons:{icon:[{url:'/favicon.ico',sizes:'32x32'},{url:'/icon.png',type:'image/png',sizes:'192x192'}],apple:'/apple-icon.png'}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#000000'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" className={inter.variable}><body><a className="skip" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Motion/></body></html>}
