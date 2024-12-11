import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-working-time',
  standalone: true,
  imports: [ReactiveFormsModule, WorkingTimeComponent],
  templateUrl: './working-time.component.html',
  styleUrls: ['./working-time.component.css'],
})
export class WorkingTimeComponent {
  @Input() dayOfWeek!: string;
  @Input() isOwner!: boolean;
  @Input() time!: any;
  @Output()
  handleSubmit = new EventEmitter<{ day: string; time: string }>();
  @Output() closed = new EventEmitter<void>();

  workTimeForm = new FormGroup({
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
  });
  constructor(private fb: FormBuilder) {}

  close(): void {
    this.closed.emit();
  }
  onSubmit() {
    if (this.workTimeForm.valid) {
      const time = `${this.workTimeForm.value.startTime}-${this.workTimeForm.value.endTime}`;
      this.handleSubmit.emit({ day: this.dayOfWeek, time });
    }
    this.closed.emit();
  }

  // napravi poveche opcii !!!!
}
