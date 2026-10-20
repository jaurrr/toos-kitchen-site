import { Component, inject } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { IconComponent } from '../icon/icon.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { whatsappLink } from '../../data/site-data';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly lang = inject(LangService);

  orderUrl(): string {
    const msg =
      this.lang.lang() === 'ar'
        ? 'مرحباً مطبخ طوس × زعفران! أرغب بطلب طعام.'
        : 'Hi Toos Kitchen × Zaffran! I would like to place an order.';
    return whatsappLink(msg);
  }

  goMenu(): void {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  }
}
