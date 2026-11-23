import Link from 'next/link';
import Image from 'next/image';
import {getLanguage} from '@/lib/language';
import {translator} from '@/lib/translations';
import {localizeProducts} from '@/lib/content';
import {pageMetadata} from '@/lib/seo';
import '@/app/showcase.css';
export async function generateMetadata(){return pageMetadata('Products','Explore tools and industrial products selected and marketed by KIKAE.','/products','industrial.png')}
export default async function Products(){
 const language=await getLanguage();const products=localizeProducts(translator(language));const t=(kr:string,en:string,jp:string)=>language==='kr'?kr:language==='jp'?jp:en;
 return <div className="showcase service-page"><section className="sc-section service-page-hero"><p className="sc-index">KIKAE / {t('서비스 · 제품','SERVICES · PRODUCTS','サービス · 製品')}</p><h1>PRODUCTS<br/><span>WITH PURPOSE.</span></h1><div className="service-lead"><h2>{t('용도와 성능을 기준으로.','Understand the purpose. Communicate the value.','用途を理解し、価値を伝える。')}</h2><p>{t('제조사의 기술과 실제 사용 환경을 검토해 제품을 선정합니다. 제품별 특성에 맞는 콘텐츠와 판매 채널을 운영합니다.','We understand manufacturers’ technology and how customers use it. Clear product communication, marketing and distribution connect the right products with the right customers.','メーカーの技術と使用環境を理解し、製品の強みを明確に伝えます。マーケティングと流通で、必要とするお客様へ届けます。')}</p></div></section>
 <section className="sc-section product-collection" aria-label={t('취급 제품','Product collection','取扱製品')}><div className="product-editorial-grid">{products.map((p,i)=><Link href={`/projects/${p.slug}`} className="product-editorial-card" key={p.slug}><div className="product-editorial-image"><Image src={`/assets/${p.image}`} alt={p.title} fill sizes="(max-width:809px) 100vw, 50vw"/><span>0{i+1}</span></div><div className="product-editorial-title"><h2>{p.title}</h2><span aria-hidden="true">↗</span></div><p>{p.description}</p><span className="product-editorial-more">{t('제품 자세히 보기','Explore product','製品を見る')} →</span></Link>)}</div></section>
 <section className="sc-section service-closing"><p className="sc-index">FROM PRODUCT TO MARKET</p><h2>{t('제품에 맞는','Good products.','優れた製品に、')}<br/>{t('유통 전략을 찾습니다.','The right market.','ふさわしい市場を。')}</h2><p>{t('취급 제품과 국내 판매 계획을 바탕으로 마케팅·유통 방안을 제안합니다.','Let’s discuss the marketing and distribution approach for your products and brand.','製品とブランドに合うマーケティング・流通についてご相談ください。')}</p><div className="service-closing-links"><Link href="/contact">{t('제품·유통 상담','Discuss distribution','製品・流通のご相談')} ↗</Link><Link href="/brands">{t('취급 브랜드','Our brands','取扱ブランド')} ↗</Link></div></section></div>;
}
