import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import ru from './ru';
import en from './en';

export type Lang = 'ru' | 'en';
export type Dict = typeof ru;

const dicts: Record<Lang, Dict> = { ru, en };

const LangContext = createContext<{ lang: Lang; t: Dict; setLang: (l: Lang) => void }>({
  lang: 'ru',
  t: ru,
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lumina.lang') as Lang) || 'ru');
  useEffect(() => {
    localStorage.setItem('lumina.lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);
  return <LangContext.Provider value={{ lang, t: dicts[lang], setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
