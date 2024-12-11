import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GetUserSearch } from '../../types/user';

@Component({
  selector: 'app-professional',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css'],
})
export class ProfessionalComponent {
  // @Input() professional!: GetUserSearch[];
  @Input() professional!: any;
}
