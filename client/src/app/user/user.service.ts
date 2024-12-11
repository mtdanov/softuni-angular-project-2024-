import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, signal } from '@angular/core';
import { profileDetails, UserForAuth } from './user.types';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  private userPic$$ = new BehaviorSubject<string | null>(null);
  public userPic$ = this.userPic$$.asObservable();

  private userBanner$$ = new BehaviorSubject<string | null>(null);
  public userBanner$ = this.userBanner$$.asObservable();

  // opravi tipizaciqta !!!
  private userWorktime$$ = new BehaviorSubject<any | undefined>(undefined);
  public userWorktime$ = this.userWorktime$$.asObservable();

  private userInformation$$ = new BehaviorSubject<profileDetails | undefined>(
    undefined
  );
  public userInformation$ = this.userInformation$$.asObservable();

  private bannerLoading$$ = new BehaviorSubject<boolean>(false);
  bannerLoading$ = this.bannerLoading$$.asObservable();

  private profilePicLoading$$ = new BehaviorSubject<boolean>(false);
  profilePicLoading$ = this.profilePicLoading$$.asObservable();

  private isLogged$$ = new BehaviorSubject<boolean>(false);
  isLogged$ = this.isLogged$$.asObservable();

  selectedId = signal<string | undefined>(undefined);

  USER_KEY = 'token';
  userSubscription: Subscription;
  user: UserForAuth | undefined;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem(this.USER_KEY);
    if (storedUser) {
      this.user$$.next(JSON.parse(storedUser));
      this.isLogged$$.next(true);
    }
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    repeatPassword: string,
    city: string,
    userType: string
  ) {
    return this.http.post('http://localhost:3010/user/register', {
      firstName,
      lastName,
      email,
      password,
      repeatPassword,
      city,
      userType,
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>('http://localhost:3010/user/login', {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          this.user$$.next(res);
          this.saveUser(res as UserForAuth);
          this.isLogged$$.next(true);
        })
      );
  }

  logout() {
    return this.http.post('http://localhost:3010/user/logout', '').pipe(
      tap((res) => {
        this.user$$.next(undefined);
        this.cleanUser();
        this.isLogged$$.next(false);
      })
    );
  }

  saveUser(user: UserForAuth) {
    localStorage.removeItem(this.USER_KEY);
    return localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  cleanUser(): void {
    return localStorage.clear();
  }

  setId(id: string) {
    this.selectedId.set(id);
  }

  get userType() {
    return this.user?.userType;
  }

  get isLogged(): boolean {
    return !!localStorage.getItem('token');
  }
  get currentUserId(): string | undefined {
    return this.user ? this.user.id : undefined;
  }

  get currentUsername(): string | undefined {
    return this.user ? this.user.name : undefined;
  }

  getInformation() {
    this.http
      .get<profileDetails>(
        `http://localhost:3010/user/profile/${this.selectedId()}/about`
      )
      .pipe(tap((response) => this.userInformation$$.next(response)))
      .subscribe({
        next: () => console.log('ok'),
        error: (err) => console.error('bad', err),
      });
  }

  updateProfile(info: string, field: string) {
    this.http
      .put<{ field: string }>(
        `http://localhost:3010/user/profile/${this.currentUserId}/update-about`,
        {
          field,
          info,
        }
      )
      .pipe(
        tap(() => {
          const currentUserInfo = this.userInformation$$.value;
          const updatedUserInfo = { ...currentUserInfo, [field]: info };
          this.userInformation$$.next(updatedUserInfo as profileDetails);
        })
      )
      .subscribe({
        next: () => console.log('ok'),
        error: (err) => console.error('bad', err),
      });
  }

  updateWorkingTime({ day, time }: { day: string; time: string }) {
    this.http
      .patch<object>(
        `http://localhost:3010/user/${this.currentUserId}/working-time`,
        {
          day,
          time,
        }
      )
      .pipe(
        tap((data) => {
          const currentUserInfo = this.userWorktime$$.value;
          const updatedUserInfo = { ...currentUserInfo, ...data };
          this.userWorktime$$.next(updatedUserInfo as {});
        })
      )
      .subscribe({
        next: () => console.log('ok'),
        error: (err) => console.error('bad', err),
      });
  }

  getWorkingTime() {
    this.http
      .get(`http://localhost:3010/user/${this.selectedId()}/get-working-time`)
      .pipe(tap((response) => this.userWorktime$$.next(response)))
      .subscribe({
        next: () => console.log('ok'),
        error: (err) => console.error('bad', err),
      });
  }

  uploadProfilePic(file: File, type: string) {
    this.profilePicLoading$$.next(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    this.http
      .patch<string>(
        `http://localhost:3010/user/profile/${this.currentUserId}/profilePic`,
        formData
      )
      .pipe(tap((pic) => this.userPic$$.next(pic)))
      .subscribe({
        next: () => {
          console.log('ok');
          this.profilePicLoading$$.next(false);
        },
        error: (err) => {
          console.error('bad', err);
          this.profilePicLoading$$.next(false);
        },
      });
  }

  uploadBanner(file: File, type: string) {
    this.bannerLoading$$.next(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    this.http
      .patch<string>(
        `http://localhost:3010/user/profile/${this.currentUserId}/banner`,
        formData
      )
      .pipe(tap((pic) => this.userBanner$$.next(pic)))
      .subscribe({
        next: () => {
          console.log('ok');
          this.bannerLoading$$.next(false);
        },
        error: (err) => {
          console.error('bad', err);
          this.bannerLoading$$.next(false);
        },
      });
  }

  getBanner() {
    this.http
      .get<string>(
        `http://localhost:3010/user/profile/${this.selectedId()}/banner`
      )
      .pipe(tap((response) => this.userBanner$$.next(response)))
      .subscribe({
        next: () => {
          console.log('ok');
        },
        error: (err) => {
          console.error('bad', err);
        },
      });
  }

  getUserPic() {
    this.http
      .get<string>(
        `http://localhost:3010/user/profile/${this.selectedId()}/pic`
      )
      .pipe(tap((response) => this.userPic$$.next(response)))
      .subscribe({
        next: () => console.log('ok'),
        error: (err) => console.error('bad', err),
      });
  }

  getPic() {
    return this.http.get<{ profilePic: string }>(
      `http://localhost:3010/user/profile/${this.currentUserId}/profilePic`
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
