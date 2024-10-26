import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [MatFormFieldModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  _errors: any = {};
  get errors(): any {
    return this._errors;
  }
  @Input() set errors(value: any) {
    this._errors = value;
    this.getErrorMessage();
  }
  errorMessages: string[] = [];
  static errorKeyToErrorMessageMapping: Record<string, string> = {
    required: 'Required',
    invalidPhoneNumber: 'Invalid SG phone number',
    exceededMaximumFileSize: 'Exceeded maximum file size',
    maxlength: 'Exceeded max length',
    minlength: 'Below min length',
  };

  getErrorMessage() {
    const errorKeys: string[] = this.errors ? Object.keys(this.errors) : [];
    this.errorMessages = errorKeys.map(
      (p) => ErrorComponent.errorKeyToErrorMessageMapping[p]
    );
  }
}
