import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { atLeastOneFieldValidator } from '../../utils/search-validator';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Output() searchResults = new EventEmitter<{}>();

  searchForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.searchForm = new FormGroup(
      {
        professional: new FormControl(''),
        location: new FormControl(''),
        searchField: new FormControl(''),
      },
      { validators: atLeastOneFieldValidator() }
    );
  }

  search() {
    if (this.searchForm.invalid) {
      return;
    }
    const value = this.searchForm.value;
    this.searchResults.emit(value);
  }

  locations: string[] = [
    'Sofia',
    'Varna',
    'Burgas',
    'Ruse',
    'Stara Zagora',
    'Pleven',
    'Lovech',
    'Plovdiv',
    'Troyan',
  ];

  professionals: string[] = [
    'Trainer',
    'Nutritionist',
    'Club',
    'Physiotherapist',
  ];
}

// const activeFilter = Object.fromEntries(
//   Object.entries(value).filter(([_, v]) => v())
// );
