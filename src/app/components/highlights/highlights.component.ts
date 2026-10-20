import { Component, inject } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { CartService } from '../../services/cart.service';
import { IconComponent } from '../icon/icon.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { HIGHLIGHTS } from '../../data/site-data';
import { DISHES, Dish } from '../../data/menu-data';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  templateUrl: './highlights.component.html',
  styleUrl: './highlights.component.scss',
})
export class HighlightsComponent {
  readonly lang = inject(LangService);
  readonly cart = inject(CartService);
  readonly items = HIGHLIGHTS;

  name(i: number): string {
    const h = this.items[i];
    return this.lang.isAr() ? h.ar : h.en;
  }

  desc(i: number): string {
    return this.lang.t(`highlights.items.${i}.desc`);
  }

  dishFor(i: number): Dish {
    const h = this.items[i];
    const match = DISHES.find((d) => d.en === h.en);
    return match ?? { id: `hl-${i}`, brand: 'toos', cat: '', ar: h.ar, en: h.en, price: null };
  }
}
