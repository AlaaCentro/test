import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function positiveNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;
      if (Validators.required(control) !== null) {
        // Handle required validation separately
        return null;
      }

      let validationError = {
        "positiveNumbers": {
            'value': value,
            'message': 'Negative Numbers Not Allowed'
        }
      }

      return value >= 0 ? null : validationError;
    };
  }


