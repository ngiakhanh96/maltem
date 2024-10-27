import { AbstractControl } from '@angular/forms';

export function fileSizeValidatorFn(control: AbstractControl) {
  return control.value == null || (control.value as File).size <= 2000000
    ? null
    : { exceededMaximumFileSize: (control.value as File).size };
}
