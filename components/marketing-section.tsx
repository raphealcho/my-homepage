import {MarketingAccordion} from '@/components/marketing-accordion';
import type {Language} from '@/lib/translations';
export function MarketingSection({language}:{language:Language}) {
 const t=(kr:string,en:string,jp:string)=>language==='kr'?kr:language==='jp'?jp:en;
 const cards=[
 ['naver','NAVER','SEARCH + ADS',t('검색부터 구매 의도까지','Reach searching customers','検索から購入意向まで'),t('제품과 관련된 검색어를 검토하고 네이버 검색 노출 최적화와 검색광고를 운영합니다.','Connect Naver search visibility optimization and search ads to reach customers looking for your products.','NAVERの検索露出最適化と検索広告を連携し、製品を探すお客様へ価値を届けます。')],
 ['google','Google','SEO + GOOGLE ADS',t('검색을 기회로 전환','Turn searches into opportunities','検索を機会に'),t('웹사이트의 검색 접근성과 콘텐츠를 개선하고, Google Ads로 관심 고객의 방문을 유도합니다.','Combine Google search optimization and Google Ads to expand reach and bring interested customers to your website.','Google検索の最適化とGoogle Adsで接点を広げ、製品への関心を流入につなげます。')],
 ['meta','Meta','FACEBOOK + INSTAGRAM',t('관심을 만드는 광고','Build interest with relevant ads','関心を生み出す広告'),t('페이스북·인스타그램의 광고 대상과 소재를 기획하고, 제품 인지도와 구매 관심을 높이는 캠페인을 운영합니다.','Plan audiences and creative for Facebook and Instagram, connecting brand discovery with purchase consideration.','Facebook・Instagramでターゲットとコンテンツを設計し、認知から購入検討へつなげます。')]
 ];
 return <section className="sc-section sc-marketing" id="marketing"><p className="sc-index">05 / {t('통합 마케팅 전략','INTEGRATED MARKETING','統合マーケティング')}</p><h2 className="sc-statement">ALL IN ONE</h2>
 <div className="mk-intro"><h3>{t('검색·광고·홈페이지,','From visibility to visits.','露出から流入へ。')}<br/><span>{t('하나의 전략으로.','From visits to sales.','流入から販売へ。')}</span></h3><p>{t('검색 노출 최적화, 플랫폼 광고, 맞춤 홈페이지 제작을 함께 제공합니다. 제품과 고객을 분석해 채널별 역할을 정하고, 콘텐츠와 광고가 같은 방향으로 운영되도록 관리합니다.','We do more than run ads. We connect search visibility, platform advertising and custom websites in one marketing strategy. Our product and distribution experience shapes the journey from discovery to purchase.','広告運用だけで終わりません。検索露出最適化、広告、オーダーメイドのウェブサイトを一つの戦略でつなぎます。製品と流通の知識を活かし、発見から購入までの体験を設計します。')}</p></div>
 <MarketingAccordion contact={t('마케팅 프로젝트 상담','Discuss your project','プロジェクトのご相談')} items={[
 {tag:'01 / WEBSITE DESIGN & DEVELOPMENT',title:t('고객 맞춤 홈페이지 제작','Website Design & Development','ウェブサイト制作'),body:t('브랜드에 맞는 반응형 홈페이지와 랜딩페이지를 제작합니다. 제품 정보와 문의·구매 동선을 방문 목적에 맞게 구성합니다.','Responsive websites and landing pages tailored to your brand, connecting visitors from search and advertising with enquiries and purchases.','ブランドに合わせたサイトを制作。検索や広告からの関心を問い合わせ・購入へつなげます。')},
 {tag:'02 / INTEGRATED STRATEGY',title:t('통합 마케팅 전략','Integrated Marketing Strategy','統合マーケティング戦略'),body:t('제품, 고객, 판매 채널을 분석해 검색·광고·홈페이지의 역할과 운영 우선순위를 정합니다.','Connect search, advertising, websites and distribution through one product-led strategy.','製品への理解を基に検索・広告・サイト・流通を一つの戦略でつなぎます。')},
 ...cards.map(([logo,name,tag,title,body])=>({logo,name,tag,title:logo==='naver'?t('네이버 검색 노출 · 광고','Naver Search & Advertising','NAVER検索・広告'):logo==='google'?t('구글 SEO · Google Ads','Google SEO & Ads','Google SEO・広告'):t('메타 광고 · 소셜 마케팅','Meta Ads & Social Marketing','Meta広告・SNSマーケティング'),body}))
 ]}/>
 <div className="mk-flow">{[t('제품 이해','PRODUCT INSIGHT','製品理解'),t('검색·광고','SEARCH & ADS','検索・広告'),t('맞춤 홈페이지','CUSTOM WEBSITE','ウェブサイト'),t('문의·판매','LEADS & SALES','問い合わせ・販売')].map((s,i)=><span key={s}><small>0{i+1}</small>{s}{i<3&&<b aria-hidden="true">→</b>}</span>)}</div></section>;
}
