import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class HeroComponent implements AfterViewInit {
  transfer = {
    from: '',
    to: '',
    vehicle: '',
    date: '',
    time: '',
  };
  today = new Date();
  minDate: string = '';


  ngOnInit() {
    const yyyy = this.today.getFullYear();
    const mm = String(this.today.getMonth() + 1).padStart(2, '0');
    const dd = String(this.today.getDate()).padStart(2, '0');
    this.minDate = `${yyyy}-${mm}-${dd}`;
  }
  ngAfterViewInit(): void {
    // simple GSAP entrance animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tl = gsap.timeline();
    tl.from('.headline', {
      y: 28,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
      .from('.subhead', { y: 18, opacity: 0, duration: 0.6 }, '-=0.4')
      .from(
        '.hero__actions button',
        { y: 12, opacity: 0, stagger: 0.12, duration: 0.5 },
        '-=0.3'
      );
  }

  openQuickQuote() {
    document.dispatchEvent(new CustomEvent('open-quote'));
  }

  scrollToFleet() {
    document.querySelector('#fleet')?.scrollIntoView({ behavior: 'smooth' });
  }

  bookTransfer() {
    console.log('Luxury transfer booking:', this.transfer);
    alert(
      `Thank you! We’ll confirm your ${this.transfer.vehicle} transfer shortly.`
    );
  }
}
