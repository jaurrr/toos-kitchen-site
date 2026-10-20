import { Component, inject } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { IconComponent } from '../icon/icon.component';
import { whatsappLink } from '../../data/site-data';

@Component({
  selector: 'app-whatsapp-float',
  standalone: true,
  imports: [IconComponent],
  template: `
    <a
      class="wa-float"
      [href]="url()"
      target="_blank"
      rel="noopener"
      [attr.aria-label]="lang.t('common.chatWa')"
    >
      <app-icon name="message-circle"></app-icon>
    </a>
  `,
  styles: [
    `
      .wa-float {
        position: fixed;
        bottom: 1.4rem;
        inset-inline-end: 1.4rem;
        z-index: 55;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #2fe07a, #1da851);
        color: #fff;
        box-shadow: 0 10px 28px rgba(29, 168, 81, 0.45);
        transition: transform 0.25s ease;
      }
      .wa-float:hover { transform: scale(1.08); }
      .wa-float app-icon { width: 1.7em; height: 1.7em; }
    `,
  ],
})
export class WhatsappFloatComponent {
  readonly lang = inject(LangService);

  url(): string {
    const msg =
      this.lang.lang() === 'ar'
        ? 'مرحباً مطبخ طوس × زعفران! أرغب بطلب طعام.'
        : 'Hi Toos Kitchen × Zaffran! I would like to place an order.';
    return whatsappLink(msg);
  }
}
