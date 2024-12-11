import { Component } from '@angular/core';
import { ProfessionalsService } from '../professionals.service';
import { GetUser, GetUserSearch, SearchParams } from '../../types/user';
import { Observable } from 'rxjs';
import { SearchComponent } from '../search/search.component';
import { ProfessionalComponent } from '../professional/professional.component';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-professionals',
  standalone: true,
  imports: [
    SearchComponent,
    ProfessionalComponent,
    AsyncPipe,
    RouterOutlet,
    LoaderComponent,
  ],
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.css'],
})
export class ProfessionalsComponent {
  search$!: Observable<GetUserSearch[]>;
  loading$!: Observable<boolean>;

  constructor(private professionalsService: ProfessionalsService) {
    this.loading$ = this.professionalsService.Loading$;
  }

  onSearchResults(results: SearchParams) {
    this.search$ = this.professionalsService.search(results);
  }
}
