import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { IconComponent } from '../icon/icon.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { GALLERY } from '../../data/site-data';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  readonly lang = inject(LangService);
  readonly photos = GALLERY;
  readonly active = signal<number | null>(null);
  readonly expanded = signal(false);
  readonly previewCount = 10;

  readonly visible = computed(() =>
    this.expanded() ? this.photos : this.photos.slice(0, this.previewCount),
  );
  readonly hiddenCount = computed(() => this.photos.length - this.previewCount);

  alt(i: number): string {
    const p = this.photos[i];
    return this.lang.isAr() ? p.altAr : p.altEn;
  }

  isMoreTile(i: number): boolean {
    return !this.expanded() && i === this.previewCount - 1;
  }

  open(i: number): void {
    if (this.isMoreTile(i)) {
      this.expanded.set(true);
      return;
    }
    this.active.set(i);
    document.body.style.overflow = 'hidden';
  }

  collapse(): void {
    this.expanded.set(false);
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  }

  close(): void {
    this.active.set(null);
    document.body.style.overflow = '';
  }

  step(d: 1 | -1): void {
    const n = this.photos.length;
    this.active.update((a) => (a === null ? null : (a + d + n) % n));
  }

  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (this.active() === null) return;
    if (e.key === 'Escape') this.close();
    if (e.key === 'ArrowRight') this.step(this.lang.dir() === 'rtl' ? -1 : 1);
    if (e.key === 'ArrowLeft') this.step(this.lang.dir() === 'rtl' ? 1 : -1);
  }
}
