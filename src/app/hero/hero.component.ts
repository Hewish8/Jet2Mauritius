import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  imports: [CommonModule]
})
export class HeroComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // simple GSAP entrance animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tl = gsap.timeline();
    tl.from('.headline', { y: 28, opacity: 0, duration: 0.8, ease: 'power3.out' })
      .from('.subhead', { y: 18, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.hero__actions button', { y: 12, opacity: 0, stagger: 0.12, duration: 0.5 }, '-=0.3');
  }

  openQuickQuote(){
    document.dispatchEvent(new CustomEvent('open-quote'));
  }

  scrollToFleet(){
    document.querySelector('#fleet')?.scrollIntoView({ behavior: 'smooth' });
  }
}
