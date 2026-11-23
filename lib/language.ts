import 'server-only';
import {cookies} from 'next/headers';
import {translator, type Language} from './translations';

export async function getLanguage(): Promise<Language> {
  const value=(await cookies()).get('kikae-language')?.value;
  return value === 'jp' || value === 'kr' ? value : 'en';
}

export async function getTranslator() {
  return translator(await getLanguage());
}
