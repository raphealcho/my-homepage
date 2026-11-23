import Image from 'next/image';
import Link from 'next/link';
import type {Product} from '@/lib/content';
export function Tags({product}:{product:Product}){return <ul className="tags">{product.tags.map(t=><li key={t}>{t}</li>)}</ul>}
export function ProductCard({product,compact=false}:{product:Product;compact?:boolean}){return <Link className="product-link" href={`/projects/${product.slug}`}><div className="product-image"><Image src={`/assets/${product.image}`} alt={product.title} fill sizes={compact?'(max-width: 809px) 100vw, 33vw':'(max-width: 809px) 100vw, 50vw'}/><span className="circle-arrow" aria-hidden="true">↗</span></div><p className="caption">{product.title}</p></Link>}
