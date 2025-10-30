import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class QuoteService {
  constructor(private http: HttpClient) {}

  sendQuoteRequest(payload: any): Observable<any> {
    // Replace /api/quotes with your backend endpoint
    return this.http.post('/api/quotes', payload);
  }
}
