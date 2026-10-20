import { Component, computed, inject, signal } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { CartService } from '../../services/cart.service';
import { IconComponent } from '../icon/icon.component';
import { RevealDirective } from '../../directives/reveal.directive';
import {
  Brand,
  CATEGORIES,
  Dish,
  MenuCategory,
  categoriesFor,
  dishesFor,
  searchDishes,
} from '../../data/menu-data';

type BrandTab = Brand | 'all';

interface CatGroup {
  cat: MenuCategory;
  dishes: Dish[];
}

@Component({
  selector: 'app-menu-section',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  templateUrl: './menu-section.component.html',
  styleUrl: './menu-section.component.scss',
})
export class MenuSectionComponent {
  readonly lang = inject(LangService);
  readonly cart = inject(CartService);
  readonly brand = signal<BrandTab>('all');
  readonly catId = signal<string | null>(null);
  readonly query = signal('');

  readonly tabs: { id: BrandTab; ar: string; en: string }[] = [
    { id: 'all', ar: 'الكل', en: 'Combined' },
    { id: 'toos', ar: 'مطبخ طوس', en: 'Toos Kitchen' },
    { id: 'zaffran', ar: 'زعفران', en: 'Zaffran' },
  ];

  readonly cats = computed<MenuCategory[]>(() => categoriesFor(this.brand()));

  readonly groups = computed<CatGroup[]>(() => {
    const q = this.query().trim();
    const brand = this.brand();
    if (q) {
      const found = searchDishes(brand, q);
      const byCat = new Map<string, Dish[]>();
      for (const d of found) {
        const list = byCat.get(d.cat) ?? [];
        list.push(d);
        byCat.set(d.cat, list);
      }
      return CATEGORIES.filter((c) => byCat.has(c.id)).map((c) => ({
        cat: c,
        dishes: byCat.get(c.id) ?? [],
      }));
    }
    const active = this.catId();
    const list = active ? this.cats().filter((c) => c.id === active) : this.cats();
    return list.map((c) => ({ cat: c, dishes: dishesFor(brand, c.id) }));
  });

  readonly total = computed(() => dishesFor(this.brand()).length);

  setBrand(b: BrandTab): void {
    this.brand.set(b);
    this.catId.set(null);
  }

  setCat(id: string | null): void {
    this.catId.set(this.catId() === id ? null : id);
  }

  onSearch(value: string): void {
    this.query.set(value);
  }

  dishName(d: Dish): string {
    return this.lang.isAr() ? d.ar : d.en;
  }

  dishSub(d: Dish): string {
    return this.lang.isAr() ? d.en : d.ar;
  }

  catName(c: MenuCategory): string {
    return this.lang.isAr() ? c.ar : c.en;
  }
}
