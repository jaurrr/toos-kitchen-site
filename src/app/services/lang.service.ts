import { Injectable, computed, signal, effect } from '@angular/core';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

export type Lang = 'en' | 'ar';

const DICTS = { en, ar } as const;
const STORE_KEY = 'tkz-lang';

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORE_KEY);
    return saved === 'ar' ? 'ar' : 'en';
  } catch {
    return 'en';
  }
}

@Injectable({ providedIn: 'root' })
export class LangService {
  readonly lang = signal<Lang>(initialLang());
  readonly dir = computed(() => (this.lang() === 'ar' ? 'rtl' : 'ltr'));
  readonly isAr = computed(() => this.lang() === 'ar');

  constructor() {
    effect(() => {
      const lang = this.lang();
      document.documentElement.lang = lang;
      document.documentElement.dir = this.dir();
      try {
        localStorage.setItem(STORE_KEY, lang);
      } catch {
        /* private mode */
      }
    });
  }

  toggle(): void {
    this.lang.update((l) => (l === 'en' ? 'ar' : 'en'));
  }

  t(path: string): string {
    const value = this.lookup(path);
    return typeof value === 'string' ? value : path;
  }

  ta(path: string): string[] {
    const value = this.lookup(path);
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
  }

  private lookup(path: string): unknown {
    const dict: unknown = DICTS[this.lang()];
    return path.split('.').reduce<unknown>((node, key) => {
      if (node && typeof node === 'object' && key in node) {
        return (node as Record<string, unknown>)[key];
      }
      return undefined;
    }, dict);
  }
}
