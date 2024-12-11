import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetUser, GetUserSearch } from '../types/user';
import { BehaviorSubject, finalize, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfessionalsService {
  constructor(private http: HttpClient) {}
  private Loading$$ = new BehaviorSubject<boolean>(false);
  Loading$ = this.Loading$$.asObservable();

  search(criteria: {
    professional?: string;
    location?: string;
    searchField?: string;
  }): Observable<GetUserSearch[]> {
    this.Loading$$.next(true);
    let params = new HttpParams();
    Object.keys(criteria).forEach((key) => {
      const value = (criteria as any)[key];
      if (value) {
        params = params.append(key, value);
      }
    });
    return this.http
      .get<GetUserSearch[]>('http://localhost:3010/user/search', {
        params,
      })
      .pipe(finalize(() => this.Loading$$.next(false)));
  }
}
