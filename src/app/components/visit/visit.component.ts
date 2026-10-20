import { Component, inject, signal } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { IconComponent } from '../icon/icon.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { LOCATIONS, PHONES, whatsappLink } from '../../data/site-data';

@Component({
  selector: 'app-visit',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  templateUrl: './visit.component.html',
  styleUrl: './visit.component.scss',
})
export class VisitComponent {
  readonly lang = inject(LangService);
  readonly spots = LOCATIONS;
  readonly wa = PHONES.bookingIntl;
  readonly call1 = PHONES.call1;
  readonly call2 = PHONES.call2;

  readonly guestName = signal('');
  readonly date = signal('');
  readonly guests = signal('2');

  directions(q: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  }

  callHref(n: string): string {
    return `tel:+966${n.replace(/\s/g, '').slice(1)}`;
  }

  sendBooking(): void {
    const name = this.guestName().trim() || '—';
    const lang = this.lang.lang();
    const msg =
      lang === 'ar'
        ? `حجز طاولة — الاسم: ${name}، التاريخ: ${this.date() || '—'}، عدد الضيوف: ${this.guests()}`
        : `Table booking — Name: ${name}, Date: ${this.date() || '—'}, Guests: ${this.guests()}`;
    window.open(whatsappLink(msg), '_blank', 'noopener');
  }
}
