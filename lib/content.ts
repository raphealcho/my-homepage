import details from './product-details.json';
export type Product = {slug:string;title:string;image:string;description:string;tags:string[];overview:string;year:string;gallery:string[];lastImage:string;scope:string;channels:string;timeline:string};
const base = [
 {slug:'tools-power-tools',title:'TOOLS & POWER TOOLS',image:'tools.png',description:'Professional tools selected for durability, precision, and real-world performance.',tags:['HAND TOOLS','POWER TOOLS','ACCESSORIES'],overview:'We select professional tools that deliver reliable performance in real working environments. Our focus is not on brand recognition alone, but on durability, usability, build quality, and long-term value.'},
 {slug:'industrial-products',title:'INDUSTRIAL PRODUCTS',image:'industrial.png'},
 {slug:'safety-products',title:'SAFETY PRODUCTS',image:'safety.png'},
 {slug:'measuring-instruments',title:'MEASURING INSTRUMENTS',image:'measuring.png'},
];
export const products:Product[] = base.map(p=>({...p,...details[p.slug as keyof typeof details]} as Product));
export const services = [
 ['Korean Market Entry','We help quality products enter the Korean market with practical market research, positioning, and launch strategies.'],
 ['Distribution & Sales','We connect products with Korean customers through established B2B and B2C sales channels.'],
 ['Localization & Marketing','We create localized product pages, content, and marketing tailored to Korean customers and buying behavior.'],
 ['Logistics & Customer Support','We manage local inventory, fulfillment, customer service, and market feedback to support long-term growth in Korea.'],
];
export const experience = [
 ['KIKAE','2023 — PRESENT','Korean Tool Distribution','Since 2023, we have built a specialized distribution business focused on tools, industrial products, safety equipment, and measuring instruments.'],
 ['$700K+','ANNUAL SALES','Proven Sales Performance','Approximately USD 700K in annual sales, driven by tool and industrial product distribution in the Korean market.'],
 ['B2B + B2C','KOREA','Multi-Channel Distribution','We serve both individual and business customers through online commerce and professional distribution channels across Korea.'],
 ['PRODUCT → MARKET','END-TO-END','From Selection to Sales','From sourcing and localization to content, sales, logistics, and customer support, we manage the full journey to the Korean market.'],
];

export function localizeProducts(t:(text:string)=>string):Product[]{return products.map(p=>({...p,title:t(p.title),description:t(p.description),tags:p.tags.map(t),overview:t(p.overview),scope:t(p.scope),channels:t(p.channels),timeline:t(p.timeline)}));}
