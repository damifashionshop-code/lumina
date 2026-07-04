// User comfort settings: sounds / music / animations.
// Music is OFF by default and only starts after explicit consent.
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { startMusic, stopMusic } from './audio';

interface Settings {
  sound: boolean; music: boolean; anim: boolean;
  setSound: (v: boolean) => void; setMusic: (v: boolean) => void; setAnim: (v: boolean) => void;
}

const Ctx = createContext<Settings>(null as unknown as Settings);

const load = (k: string, def: boolean) => {
  const v = localStorage.getItem('lumina.' + k);
  return v === null ? def : v === '1';
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [sound, setSound] = useState(() => load('sound', true));
  const [music, setMusic] = useState(false); // always starts off
  const [anim, setAnim] = useState(() => load('anim', true));

  useEffect(() => { localStorage.setItem('lumina.sound', sound ? '1' : '0'); }, [sound]);
  useEffect(() => { localStorage.setItem('lumina.anim', anim ? '1' : '0'); }, [anim]);
  useEffect(() => {
    document.documentElement.classList.toggle('no-anim', !anim);
  }, [anim]);
  useEffect(() => {
    if (music) startMusic(); else stopMusic();
    return () => stopMusic();
  }, [music]);

  return <Ctx.Provider value={{ sound, music, anim, setSound, setMusic, setAnim }}>{children}</Ctx.Provider>;
}

export const useSettings = () => useContext(Ctx);
