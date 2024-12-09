import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { emailValidator } from '../../utils/email-validator';
import { matchPasswordValidator } from '../../utils/match-password-validator';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userType: string = '';
  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
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
    city: new FormControl('', [Validators.required]),
  });

  get passGroup() {
    return this.form.get('passGroup');
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userType = params['userType'];
    });
  }

  register(): void {
    if (this.form.invalid) {
      console.log(this.form.value);

      return;
    }

    const {
      firstName,
      lastName,
      email,
      passGroup: { password, repeatPassword } = {},
      city,
    } = this.form.value;

    this.userService
      .register(
        firstName!,
        lastName!,
        email!,
        password!,
        repeatPassword!,
        city!,
        this.userType
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
