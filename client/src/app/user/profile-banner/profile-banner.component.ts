import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile-banner',
  standalone: true,
  imports: [LoaderComponent, AsyncPipe],
  templateUrl: './profile-banner.component.html',
  styleUrl: './profile-banner.component.css',
})
export class ProfileBannerComponent {
  @Output() imageSelected = new EventEmitter<{ file: File; type: string }>();
  @Input() profileBanner: any;
  @Input() loading$!: Observable<boolean>;
  @Input() isOwner!: boolean;
  onImageSelected(event: Event, type: string): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageSelected.emit({ file, type });
    }
  }
}
