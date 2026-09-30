'use server';
import {cookies} from 'next/headers';
import {revalidatePath} from 'next/cache';
import type {Language} from '@/lib/translations';

export async function setLanguage(language: Language) {
  if (language !== 'en' && language !== 'jp') throw new Error('Unsupported language');
  (await cookies()).set('kikae-language', language, {
    path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax', httpOnly: true,
    secure: process.env.VERCEL === '1',
  });
  revalidatePath('/', 'layout');
}
