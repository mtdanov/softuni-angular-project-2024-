import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile-pic',
  standalone: true,
  imports: [LoaderComponent, AsyncPipe],
  templateUrl: './profile-pic.component.html',
  styleUrl: './profile-pic.component.css',
})
export class ProfilePicComponent {
  @Output() imageSelected = new EventEmitter<{ file: File; type: string }>();
  @Input() profilePic: any;
  @Input() isOwner!: boolean;
  @Input() loading$!: Observable<boolean>;

  onImageSelected(event: Event, type: string): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageSelected.emit({ file, type });
    }
  }
}
