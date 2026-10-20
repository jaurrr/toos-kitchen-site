import { Component, HostListener, inject, signal } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { CartService } from '../../services/cart.service';
import { IconComponent } from '../icon/icon.component';
import { PHONES, whatsappLink } from '../../data/site-data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly lang = inject(LangService);
  readonly cart = inject(CartService);
  readonly scrolled = signal(false);
  readonly open = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  orderUrl(): string {
    const msg =
      this.lang.lang() === 'ar'
        ? 'مرحباً مطبخ طوس × زعفران! أرغب بطلب طعام.'
        : 'Hi Toos Kitchen × Zaffran! I would like to place an order.';
    return whatsappLink(msg);
  }

  go(id: string): void {
    this.open.set(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
