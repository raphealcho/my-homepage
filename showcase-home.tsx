import Image from 'next/image';
import {BrandRoster} from '@/components/brand-roster';
import {HomeServicesSummary} from '@/components/home-services-summary';
import {Reel} from '@/components/motion';
import Link from 'next/link';
import {getLanguage} from '@/lib/language';
import {translator} from '@/lib/translations';
import {localizeProducts} from '@/lib/content';
import {InteractiveGrid} from '@/components/interactive-grid';
import {salesCases} from '@/lib/showcase';
import '@/app/showcase.css';

export default async function ShowcaseHome(){
 const language=await getLanguage();const ja=language==='jp';
 const t=translator(language);
 const c=(en:string,jp:string)=>ja?jp:t(en);
 const products=localizeProducts(translator(language)).filter(p=>p.slug!=='tools-power-tools');
 const number=(v:number|null)=>v===null?'—':new Intl.NumberFormat(ja?'ja-JP':language==='kr'?'ko-KR':'en-US').format(v);
 return <div className="showcase">
 <section className="sc-hero sc-logo-hero"><InteractiveGrid/><h1 className="sr-only">{language==='kr'?'KIKAE — 마케팅 전문 유통회사':ja?'KIKAE — マーケティングと流通':'KIKAE — Marketing & Distribution'}</h1><Image className="sc-hero-logo" src="/assets/banner.png" alt="KIKAE — Tools Become Culture" width={1260} height={588} priority sizes="(max-width:809px) 100vw, 925px"/><div className="sc-logo-copy"><p>{language==='kr'?'제조사의 기술과 제품을 이해합니다.':ja?'メーカーの技術と製品を理解する。':'We understand manufacturers’ technology and products.'}</p><p><strong>{language==='kr'?'제품에 맞는 마케팅과 유통을 운영합니다.':ja?'マーケティングで価値を伝え、流通で市場をつなぐ。':'We market their value. We connect them to the market.'}</strong></p></div><p className="sc-logo-tagline">{language==='kr'?'공구·산업용품에 특화된 마케팅 전문 유통회사, KIKAE.':ja?'工具・産業用品に特化したマーケティングと流通。KIKAE。':'KIKAE. Marketing-led distribution for tools and industrial products.'}</p></section>

 <div className="sc-original-reel" id="brand-film"><Reel label={t("Animated typography reel")}/></div>

 <section className="sc-section sc-position" id="approach"><p className="sc-index">01 / {c('OUR PERSPECTIVE','私たちの視点')}</p><div><h2>{c('Great products deserve','優れた製品に、')}<br/><span>{c('a market that understands them.','その価値が伝わる市場を。')}</span></h2><p className="sc-body">{c('We connect technical product knowledge with marketing, content and distribution. From the first product explanation to the final customer experience, we help manufacturers reach the Korean market.','技術的な製品知識と、マーケティング・コンテンツ・流通をつなぎます。製品の説明から購入後の体験まで、メーカーと韓国市場を結びます。')}</p><div className="sc-pillars">{[[c('Understand','理解する'),c('Technology, applications and customer needs.','技術・用途・お客様のニーズ。')],[c('Communicate','伝える'),c('Content that makes product value visible.','製品価値が伝わるコンテンツ。')],[c('Distribute','届ける'),c('Sales channels, fulfillment and support.','販売チャネル・物流・サポート。')]].map(([title,body],i)=><div key={title}><small>0{i+1}</small><h3>{title}</h3><p>{body}</p></div>)}</div></div></section>

 <section className="sc-section sc-brands" id="brands"><div className="sc-heading"><div><p className="sc-index">02 / {c('BRAND PORTFOLIO','取扱ブランド')}</p><h2 className="sc-statement">WHAT WE HAVE</h2></div><p>{c('Products we market and distribute. Each brand has a story. Our job is to make its value understood.','私たちがマーケティング・販売を行うブランド。各ブランドの製品価値を、わかりやすくお客様へ届けます。')}</p></div><BrandRoster language={language}/></section>

 <section className="sc-section sc-performance" id="performance"><div className="sc-heading"><div><p className="sc-index">03 / {c('MEASURABLE IMPACT','数字で見る実績')}</p><h2 className="sc-statement">WHAT WE ACHIEVE</h2></div></div>
 <div className="sc-case-grid sc-case-grid-simple">{salesCases.map(item=><article className="sc-case" key={item.id}><div className="sc-case-image"><Image src={`/assets/${item.image}`} alt={item.name[language]} fill sizes="(max-width:809px) 50vw, 25vw"/></div><div className="sc-case-copy"><p className="sc-index">{item.brand}</p><h3>{item.name[language]}</h3><div className="sc-case-sales"><span>{language==='kr'?'KIKAE 마케팅·유통 누적 판매량':c('Cumulative sales through KIKAE marketing','KIKAEのマーケティングによる累計販売数')}</span><strong>{item.approximate&&<small>{language==='kr'?'약':ja?'約':'Approx.'}</small>}{number(item.units)}<small>{language==='kr'?(item.atLeast?'개 이상':'개'):ja?(item.atLeast?'点以上':'点'):(item.atLeast?'+ units':'units')}</small></strong></div></div></article>)}</div></section>

 <HomeServicesSummary language={language} products={products}/>
 <section className="sc-section sc-why"><h2 className="sc-statement sc-statement-wide">{t("WHY KIKAE")}</h2><div className="sc-manifesto"><p>{t("We choose quality over recognition.")}</p><p>{t("Every product is selected for its")} {t("quality, durability, usability, and reliability.")}</p><p>{t("Only products worth using make it to KIKAE.")}</p></div></section>
 <section className="sc-cta"><p className="sc-index">{c('LET’S BUILD YOUR NEXT MARKET','次の市場を、一緒に。')}</p><h2>{c('Make your product','製品の価値を、')}<br/>{c('the next success story.','次の実績へ。')}</h2><Link className="sc-primary" href="/contact">{c('Talk to KIKAE','KIKAEに相談する')} ↗</Link><div className="sc-footer"><span>KIKAE / TOOLS BECOME CULTURE.</span><a href="#brands">{c('Back to brands','ブランド一覧へ')} ↑</a></div></section>
 </div>;
}
