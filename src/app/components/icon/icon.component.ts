import { Component, Input, OnChanges, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICONS } from './icons';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" [innerHTML]="safe"></svg>`,
  styles: [
    `:host { display: inline-flex; width: 1.25em; height: 1.25em; flex: none; }`,
    `svg { width: 100%; height: 100%; display: block; }`,
  ],
})
export class IconComponent implements OnChanges {
  @Input() name = 'info';
  safe: SafeHtml = '';
  private sanitizer = inject(DomSanitizer);

  ngOnChanges(): void {
    this.safe = this.sanitizer.bypassSecurityTrustHtml(ICONS[this.name] ?? ICONS['info']);
  }
}
