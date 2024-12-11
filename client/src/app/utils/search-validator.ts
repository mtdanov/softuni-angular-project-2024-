import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function atLeastOneFieldValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const formGroup = control as FormGroup;
    const { professional, location, searchField } = formGroup.value;
    if (professional || location || searchField) {
      return null;
    }
    return { atLeastOneFieldRequired: true };
  };
}
