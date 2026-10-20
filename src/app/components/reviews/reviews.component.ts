import { Component, inject } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { IconComponent } from '../icon/icon.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { REVIEWS, SITE, Review } from '../../data/site-data';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent {
  readonly lang = inject(LangService);
  readonly reviews: Review[] = REVIEWS;
  readonly mapsUrl = SITE.mapsUrl;

  stars(n: number): boolean[] {
    return [1, 2, 3, 4, 5].map((i) => i <= n);
  }
}
