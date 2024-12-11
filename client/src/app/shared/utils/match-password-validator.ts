import { ValidatorFn } from '@angular/forms';

export function matchPasswordValidator(
  passwordControlName: string,
  repeatPasswordControlName: string
): ValidatorFn {
  return (control) => {
    const passwordFormControl = control.get(passwordControlName);
    const repeatPasswordFormControl = control.get(repeatPasswordControlName);

    const areMatching =
      passwordFormControl?.value === repeatPasswordFormControl?.value;
    return areMatching ? null : { matchPasswordValidator: true };
  };
}
