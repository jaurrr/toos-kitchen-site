import { Component, inject } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { IconComponent } from '../icon/icon.component';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly lang = inject(LangService);

  readonly features = [
    { icon: 'sun', key: 0 },
    { icon: 'users', key: 1 },
    { icon: 'accessibility', key: 2 },
    { icon: 'car', key: 3 },
    { icon: 'calendar', key: 4 },
    { icon: 'credit-card', key: 5 },
  ];

  featureName(i: number): string {
    return this.lang.ta('about.features')[i] ?? '';
  }
}
