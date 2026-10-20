import { Injectable, computed, signal } from '@angular/core';
import { Dish, DISH_MAP } from '../data/menu-data';
import { whatsappLink } from '../data/site-data';

export interface CartLine {
  dish: Dish;
  qty: number;
}

interface StoredLine {
  id: string;
  ar: string;
  en: string;
  price: string | null;
  qty: number;
}

const STORE_KEY = 'tkz-cart';

function load(): StoredLine[] {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredLine[];
    return Array.isArray(parsed) ? parsed.filter((l) => l && l.id && l.qty > 0) : [];
  } catch {
    return [];
  }
}

function plainPrice(price: string | null): number | null {
  if (!price) return null;
  const n = Number(price.trim());
  return Number.isFinite(n) && price.trim() !== '' ? n : null;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly stored = signal<StoredLine[]>(load());
  readonly open = signal(false);
  readonly locationUrl = signal<string | null>(null);
  readonly locationLoading = signal(false);
  readonly locationError = signal(false);

  readonly lines = computed<CartLine[]>(() =>
    this.stored().map((l) => ({
      dish: DISH_MAP[l.id] ?? { id: l.id, brand: 'toos' as const, cat: '', ar: l.ar, en: l.en, price: l.price },
      qty: l.qty,
    })),
  );

  readonly count = computed(() => this.stored().reduce((n, l) => n + l.qty, 0));

  readonly total = computed<number | null>(() => {
    let sum = 0;
    for (const l of this.stored()) {
      const p = plainPrice(l.price);
      if (p === null) return null;
      sum += p * l.qty;
    }
    return this.stored().length ? sum : null;
  });

  qtyOf(id: string): number {
    return this.stored().find((l) => l.id === id)?.qty ?? 0;
  }

  add(dish: Dish): void {
    this.update((list) => {
      const found = list.find((l) => l.id === dish.id);
      if (found) found.qty += 1;
      else list.push({ id: dish.id, ar: dish.ar, en: dish.en, price: dish.price, qty: 1 });
      return list;
    });
  }

  inc(id: string): void {
    this.update((list) => {
      const found = list.find((l) => l.id === id);
      if (found) found.qty += 1;
      return list;
    });
  }

  dec(id: string): void {
    this.update((list) => {
      const found = list.find((l) => l.id === id);
      if (found) found.qty -= 1;
      return list.filter((l) => l.qty > 0);
    });
  }

  remove(id: string): void {
    this.update((list) => list.filter((l) => l.id !== id));
  }

  clear(): void {
    this.update(() => []);
  }

  toggle(open?: boolean): void {
    this.open.set(open ?? !this.open());
  }

  setLocation(on: boolean): void {
    this.locationError.set(false);
    if (!on) {
      this.locationUrl.set(null);
      this.locationLoading.set(false);
      return;
    }
    if (this.locationUrl()) return;
    if (!('geolocation' in navigator)) {
      this.locationError.set(true);
      return;
    }
    this.locationLoading.set(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        this.locationUrl.set(`https://maps.google.com/?q=${latitude},${longitude}`);
        this.locationLoading.set(false);
      },
      () => {
        this.locationLoading.set(false);
        this.locationError.set(true);
      },
      { enableHighAccuracy: true, timeout: 12000 },
    );
  }

  checkoutUrl(lang: 'en' | 'ar'): string {
    const sar = lang === 'ar' ? 'ر.س' : 'SAR';
    const rows = this.lines().map(({ dish, qty }) => {
      const name = lang === 'ar' ? dish.ar : dish.en;
      const p = dish.price ? ` — ${dish.price} ${sar}` : '';
      return `• ${name} × ${qty}${p}`;
    });
    const total = this.total();
    const head =
      lang === 'ar'
        ? 'مرحباً مطبخ طوس × زعفران! أرغب بطلب:'
        : 'Hi Toos Kitchen × Zaffran! I would like to order:';
    const totalLine =
      total !== null ? (lang === 'ar' ? `المجموع: ${total} ${sar}` : `Total: ${total} ${sar}`) : '';
    const loc = this.locationUrl();
    const locLine = loc ? (lang === 'ar' ? `📍 موقعي: ${loc}` : `📍 My location: ${loc}`) : '';
    return whatsappLink([head, ...rows, totalLine, locLine].filter(Boolean).join('\n'));
  }

  private update(fn: (list: StoredLine[]) => StoredLine[]): void {
    const next = fn(this.stored().map((l) => ({ ...l })));
    this.stored.set(next);
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(next));
    } catch {
      /* private mode */
    }
  }
}
