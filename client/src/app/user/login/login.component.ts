import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../utils/email-validator';
import { matchPasswordValidator } from '../../utils/match-password-validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, emailValidator()]),
    passGroup: new FormGroup(
      {
        password: new FormControl('', [Validators.required]),
        repeatPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [matchPasswordValidator('password', 'repeatPassword')],
      }
    ),
  });

  get passGroup() {
    return this.form.get('passGroup');
  }

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    if (this.form.invalid) {
      return;
    }

    const { email, passGroup: { password, repeatPassword } = {} } =
      this.form.value;

    this.userService.login(email!, password!).subscribe((res) => {
      this.router.navigate(['/']);
    });
  }
}
