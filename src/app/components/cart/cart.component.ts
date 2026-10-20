import { Component, HostListener, inject } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { CartService } from '../../services/cart.service';
import { IconComponent } from '../icon/icon.component';
import { Dish } from '../../data/menu-data';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  readonly lang = inject(LangService);
  readonly cart = inject(CartService);

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.cart.open()) this.cart.toggle(false);
  }

  name(d: Dish): string {
    return this.lang.isAr() ? d.ar : d.en;
  }

  sub(d: Dish): string {
    return this.lang.isAr() ? d.en : d.ar;
  }

  checkoutUrl(): string {
    return this.cart.checkoutUrl(this.lang.lang());
  }

  browse(): void {
    this.cart.toggle(false);
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  }
}
