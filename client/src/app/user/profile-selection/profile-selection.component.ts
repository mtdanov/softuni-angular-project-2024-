import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileEditFormComponent } from '../profile-edit-form/profile-edit-form.component';

@Component({
  selector: 'app-profile-selection',
  standalone: true,
  imports: [ProfileEditFormComponent],
  templateUrl: './profile-selection.component.html',
  styleUrl: './profile-selection.component.css',
})
export class ProfileSelectionComponent {
  @Input() title!: string;
  @Input() value!: string;
  @Input() field!: string;
  @Input() isEditing: boolean = false;
  @Input() isOwner!: boolean;
  @Output() saveChanges = new EventEmitter<{ text: string; field: string }>();
  @Output() close = new EventEmitter<void>();

  enableEditing() {
    this.isEditing = true;
  }

  saveChangesHandler(data: { text: string; field: string }) {
    this.isEditing = false;
    this.saveChanges.emit(data);
  }

  closed() {
    this.isEditing = false;
    this.close.emit();
  }
}
