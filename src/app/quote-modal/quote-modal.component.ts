import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quote-modal',
  standalone: true,
  templateUrl: './quote-modal.component.html',
  styleUrls: ['./quote-modal.component.scss'],
  imports: [CommonModule]
})
export class QuoteModalComponent implements OnInit {
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<any>();

  step = 1;
  quickForm!: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.quickForm = this.fb.group({
    origin: ['', Validators.required],
    destination: ['Mauritius', Validators.required],
    date: ['', Validators.required],
    passengers: [1, Validators.required],
    contact: ['', [Validators.required]],
    specialRequests: ['']
    });

    // listen global open event
    document.addEventListener('open-quote', () => {
      this.visible = true;
    });
  }

  closeModal(){
    this.visible = false;
    this.close.emit();
  }

  next(){
    if(this.step === 1){
      if(this.quickForm.invalid){
        this.quickForm.markAllAsTouched();
        return;
      }
      this.step = 2;
    } else if(this.step === 2){
      // mock submit
      const payload = this.quickForm.value;
      // here you would call your backend service to forward to partner
      this.submitted.emit(payload);
      this.closeModal();
    }
  }

  back(){
    this.step = Math.max(1, this.step - 1);
  }
}
