import {getTranslator} from '@/lib/language';
import Link from 'next/link';
export default async function NotFound(){const t=await getTranslator();return <section className="page not-found"><p>404</p><h1>{t("Page not found.")}</h1><Link className="button" href="/">{t("Back to KIKAE ↗")}</Link></section>}
