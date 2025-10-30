// src/app/app.component.ts
import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { QuoteModalComponent } from './quote-modal/quote-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroComponent, QuoteModalComponent], // ✅ Import the child component here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  quoteOpen = false;

  constructor(){
    document.addEventListener('open-quote', () => {
      this.quoteOpen = true;
    });
  }

  openQuote(){
    this.quoteOpen = true;
  }

  onQuoteSubmitted(data: any){
    console.log('Quote submitted', data);
    this.quoteOpen = false;
    // show a toast or confirmation as next step
    alert('Your quote request has been submitted. We will contact you shortly.');
  }
}
