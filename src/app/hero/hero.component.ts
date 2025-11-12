import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { FormsModule } from '@angular/forms';
import { distinct } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
    distinctFrom: '',
    to: '',
    distinctTo: '',
    vehicle: '',
    noPassengers: '',
    date: '',
    time: '',
    email: '',
    phone: '',
  };
  today = new Date();
  minDate: string = '';

  constructor(private http: HttpClient) {}

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
    this.sendTransfer();
  }

  sendTransfer() {
    const data = {
      access_key: environment.web3FormsKey, // replace with your Web3Forms key
      subject: '🚗 New Transfer Request',
      message: `
        Dear Admin,

        A new private transfer booking request has been received.

        From: ${this.transfer.from} ${this.transfer.distinctFrom ? '(' + this.transfer.distinctFrom + ')' : ''}
        To: ${this.transfer.to} ${this.transfer.distinctTo ? '(' + this.transfer.distinctTo + ')' : ''}
        Vehicle: ${this.transfer.vehicle}
        Number of Passengers: ${this.transfer.noPassengers}
        Date: ${this.transfer.date}
        Time: ${this.transfer.time}

        Contact Details:
        Email: ${this.transfer.email}
        Phone: ${this.transfer.phone}

        Please follow up with the client to confirm the booking.

        Warm regards,
        Your Travel Website ✈️
            `,
    };

    this.http.post('https://api.web3forms.com/submit', data).subscribe({
      next: () => alert('✅ Transfer request sent successfully!'),
      error: (err) => alert('❌ Error sending request: ' + err.message),
    });
  }

}
