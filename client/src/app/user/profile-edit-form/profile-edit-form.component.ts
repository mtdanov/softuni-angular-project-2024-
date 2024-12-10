import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-profile-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-edit-form.component.html',
  styleUrls: ['./profile-edit-form.component.css'],
})
export class ProfileEditFormComponent implements OnInit {
  @Input() field!: string;
  @Input() initialValue!: string;
  @Output() closed = new EventEmitter<void>();
  @Output()
  handleSubmit = new EventEmitter<{ text: string; field: string }>();
  editForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      text: new FormControl(this.initialValue),
    });
  }

  close(): void {
    this.closed.emit();
  }

  onSubmit() {
    this.handleSubmit.emit({
      text: this.editForm.value.text,
      field: this.field,
    });
    this.editForm.reset();
    this.closed.emit();
  }
}
