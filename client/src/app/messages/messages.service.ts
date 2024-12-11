import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private Loading$$ = new BehaviorSubject<boolean>(false);
  Loading$ = this.Loading$$.asObservable();

  constructor(private http: HttpClient) {}

  createMessage(
    recipient: string,
    subject: string,
    message: string,
    ownerId: string
  ) {
    return this.http
      .post('http://localhost:3010/message/createMessage', {
        recipient,
        subject,
        message,
        ownerId,
      })
      .subscribe({
        next: () => console.log('ok'),
        error: (err) => console.error('bad', err),
      });
  }

  getMessages(userId: string) {
    this.Loading$$.next(true);
    return this.http
      .get(`http://localhost:3010/message/getMessages/${userId}`)
      .pipe(
        finalize(() => {
          this.Loading$$.next(false);
        })
      );
  }

  getSendMessages(ownerId: string) {
    this.Loading$$.next(true);
    return this.http
      .get(`http://localhost:3010/message/getSendMessages/${ownerId}`)
      .pipe(
        finalize(() => {
          this.Loading$$.next(false);
        })
      );
  }
}
