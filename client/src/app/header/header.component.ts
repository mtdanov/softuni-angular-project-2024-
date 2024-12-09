import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showItems: boolean = false;
  profilePic$!: Observable<{ profilePic: string }>;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.loggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.loadProfilePic();
      }
    });
  }

  loadProfilePic(): void {
    this.profilePic$ = this.userService.getPic();
    console.log(this.profilePic$);
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }
  get userId(): string | undefined {
    return this.userService.currentUserId;
  }

  show() {
    this.showItems = !this.showItems;
  }

  logoutHanlder(): void {
    this.userService.logout().subscribe(() => {});
    this.router.navigate(['/home']);
  }
}