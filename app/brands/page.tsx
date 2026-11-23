import Link from 'next/link';
import {getLanguage} from '@/lib/language';
import {brands} from '@/lib/showcase';
import {pageMetadata} from '@/lib/seo';
import '@/app/showcase.css';
export async function generateMetadata(){return pageMetadata('Brands','Discover the brands KIKAE markets and distributes.','/brands','banner.png')}
export default async function Brands(){
 const language=await getLanguage();const t=(kr:string,en:string,jp:string)=>language==='kr'?kr:language==='jp'?jp:en;
 return <div className="showcase brands-page"><section className="sc-section"><p className="sc-index">KIKAE / {t('서비스 · 브랜드','SERVICES · BRANDS','サービス · ブランド')}</p><h1>OUR BRANDS</h1><div className="brands-page-intro"><h2>{t('제품에 맞는 전략,','Product value,','製品の価値を、')}<br/>{t('브랜드에 맞는 유통.','closer to the market.','市場の近くへ。')}</h2><p>{t('KIKAE가 마케팅·유통하는 브랜드를 소개합니다. 제조사의 제품 특성을 바탕으로 콘텐츠, 광고, 판매 채널을 운영합니다.','Explore the brands we market and distribute. We understand manufacturers’ technology and connect each brand’s strengths with content, advertising and sales.','KIKAEがマーケティング・流通を行うブランドです。メーカーの技術と製品を理解し、各ブランドの強みをコンテンツ・広告・販売へつなげます。')}</p></div><div className="brand-directory">{brands.map(b=><article key={b.name}><div className="directory-logo">{'image' in b?<img src={`/assets/brands/${b.image}`} alt={b.name}/>:<span role="img" aria-label={b.name} className="sc-sheet-logo" style={{backgroundPosition:`-${b.x}px -${b.y}px`}}/>}</div><h3>{b.name}</h3></article>)}</div><div className="brands-page-links"><Link href="/products">{t('제품 살펴보기','Explore products','製品を見る')} ↗</Link><Link href="/marketing">{t('마케팅 서비스','Marketing services','マーケティングサービス')} ↗</Link><Link href="/contact">{t('브랜드·유통 문의','Brand & distribution enquiries','ブランド・流通のご相談')} ↗</Link></div></section></div>;
}
