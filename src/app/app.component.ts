import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { HighlightsComponent } from './components/highlights/highlights.component';
import { MenuSectionComponent } from './components/menu-section/menu-section.component';
import { AboutComponent } from './components/about/about.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { VisitComponent } from './components/visit/visit.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhatsappFloatComponent } from './components/whatsapp-float/whatsapp-float.component';
import { CartComponent } from './components/cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    HighlightsComponent,
    MenuSectionComponent,
    AboutComponent,
    GalleryComponent,
    ReviewsComponent,
    VisitComponent,
    FooterComponent,
    WhatsappFloatComponent,
    CartComponent,
  ],
  template: `
    <app-navbar></app-navbar>
    <main>
      <app-hero></app-hero>
      <app-highlights></app-highlights>
      <app-menu-section></app-menu-section>
      <app-about></app-about>
      <app-gallery></app-gallery>
      <app-reviews></app-reviews>
      <app-visit></app-visit>
    </main>
    <app-footer></app-footer>
    <app-whatsapp-float></app-whatsapp-float>
    <app-cart></app-cart>
  `,
})
export class AppComponent {}
