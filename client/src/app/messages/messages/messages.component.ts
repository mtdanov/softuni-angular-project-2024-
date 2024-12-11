import { Component, OnInit } from '@angular/core';
import { MessageItemComponent } from '../message-item/message-item.component';
import { UserService } from '../../user/user.service';
import { MessagesService } from '../messages.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ShowMessageComponent } from '../show-message/show-message.component';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    MessageItemComponent,
    AsyncPipe,
    ShowMessageComponent,
    LoaderComponent,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  messages$!: Observable<any>;
  loader$!: Observable<boolean>;
  sendMessages$!: Observable<any>;
  activeTab: 'myMessages' | 'sendMessages' = 'myMessages';
  constructor(
    private userService: UserService,
    private messagesService: MessagesService
  ) {
    this.loader$ = this.messagesService.Loading$;
  }

  get userId() {
    return this.userService.currentUserId;
  }
 

  selectedMessage: any = null;

  showMessage(message: any) {
    this.selectedMessage = message;
  }
  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messages$ = this.messagesService.getMessages(this.userId!);
  }

  refresh() {
    this.activeTab = 'myMessages';

    this.loadMessages();
  }
  myMessages() {
    this.activeTab = 'myMessages';
    this.loadMessages();
  }

  sendMessages() {
    this.activeTab = 'sendMessages';
    this.sendMessages$ = this.messagesService.getSendMessages(this.userId!);
  }

  onClose() {
    this.selectedMessage = null;
  }
}
