import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessagesService } from '../../messages/messages.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './message-form.component.html',
  styleUrl: './message-form.component.css',
})
export class MessageFormComponent implements OnInit {
  @Output() closed = new EventEmitter<void>();
  // na usera do kogoto se izprashta
  @Input() id!: string;

  messageForm!: FormGroup;
  constructor(
    private messageService: MessagesService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.messageForm = new FormGroup({
      // recipient: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });
  }
  get ownerId(): string | undefined {
    return this.userService.currentUserId;
  }

  onSubmit() {
    if (this.messageForm.invalid) {
      return;
    }

    const { subject, message } = this.messageForm.value;

    this.messageService.createMessage(this.id, subject, message, this.ownerId!);
    this.messageForm.reset();
    this.closed.emit();
  }

  close(): void {
    this.closed.emit();
  }
}
