import { Component, inject } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { IconComponent } from '../icon/icon.component';
import { PHONES, SITE } from '../../data/site-data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly lang = inject(LangService);
  readonly wa = PHONES.bookingIntl;
  readonly mapsUrl = SITE.mapsUrl;
  readonly instagram = SITE.instagram;

  go(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
