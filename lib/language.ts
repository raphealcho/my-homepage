import 'server-only';
import {cookies} from 'next/headers';
import {translator, type Language} from './translations';

export async function getLanguage(): Promise<Language> {
  return (await cookies()).get('kikae-language')?.value === 'jp' ? 'jp' : 'en';
}

export async function getTranslator() {
  return translator(await getLanguage());
}
