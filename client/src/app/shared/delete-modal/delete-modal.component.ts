import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent implements OnChanges {
  @Input() showModal!: boolean;
  @Output() closed = new EventEmitter<void>();
  @Output() delTrue = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showModal']) {
    }
  }
  close(): void {
    this.closed.emit();
  }
  del() {
    this.delTrue.emit();
  }
}
