import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessagesService } from '../messages.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-show-message',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './show-message.component.html',
  styleUrl: './show-message.component.css',
})
export class ShowMessageComponent implements OnInit {
  @Input() message!: any;
  @Input() userId!: any;

  @Output() closed = new EventEmitter<void>();
  replyForm!: FormGroup;
  constructor(private messagesService: MessagesService) {}
  ngOnInit(): void {
    this.replyForm = new FormGroup({
      replyText: new FormControl('', [Validators.required]),
    });
  }

 get isOwner() {
    return this.userId === this.message.ownerId._id;
  }

  onSubmit() {
    if (this.replyForm.invalid) {
      return;
    }
    const { replyText } = this.replyForm.value;

    if (this.message) {
      let recipient = this.message.ownerId._id;
      let subject = this.message.subject;
      let ownerId = this.message.recipient._id;

      this.messagesService.createMessage(
        recipient,
        subject,
        replyText,
        ownerId
      );
    }
    this.replyForm.reset();
    this.closed.emit();
  }

  close(): void {
    this.closed.emit();
  }
}
