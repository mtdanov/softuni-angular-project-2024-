import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css',
})
export class MessageItemComponent implements OnInit {
  @Input() message!: any;
  @Output() messageSelected = new EventEmitter<any>();

  ngOnInit(): void {
    // console.log(this.message);
  }
 
  onSelectMessage() {
    this.messageSelected.emit(this.message);
  }
}
