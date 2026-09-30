'use client';
import {useState, useTransition} from 'react';
import {setLanguage} from '@/app/language-action';
import type {Language} from '@/lib/translations';

export function LanguageSwitch({language}: {language: Language}) {
  const [pending, startTransition] = useTransition();
  const [failed, setFailed] = useState(false);
  return <div className="language-control">
    <div className="language-switch" role="group" aria-label={language === 'jp' ? '表示言語' : 'Language'} aria-busy={pending}>
      {(['en', 'jp'] as const).map(value => <button
        key={value} type="button" lang={value === 'jp' ? 'ja' : 'en'}
        aria-label={value === 'jp' ? '日本語' : 'English'}
        aria-pressed={language === value} disabled={pending}
        onClick={() => {
          if (language === value) return;
          setFailed(false);
          startTransition(async () => {
            try { await setLanguage(value); } catch { setFailed(true); }
          });
        }}
      >{value.toUpperCase()}</button>)}
    </div>
    {failed && <span role="alert" className="language-error">{language === 'jp' ? '切り替えできませんでした。もう一度お試しください。' : 'Unable to switch. Please try again.'}</span>}
  </div>;
}
