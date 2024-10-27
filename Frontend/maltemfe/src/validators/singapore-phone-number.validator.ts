import { AbstractControl } from '@angular/forms';

export function singaporePhoneNumberValidatorFn(control: AbstractControl) {
  return /\b(8|9)\d{7}\b/g.test(control.value)
    ? null
    : { invalidPhoneNumber: { value: control.value } };
}
