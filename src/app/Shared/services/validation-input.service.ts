import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidationInputService {

    noSpecialCharacters(event: KeyboardEvent): void {
        const input = event.key;
        const isAlphanumericArabicSpace = /^[a-zA-Z0-9\u0600-\u06FF\s]+$/.test(input);
        if (input === ' ' && (event.target as HTMLInputElement).value.trim() === '') {
            event.preventDefault();
        } else if (!isAlphanumericArabicSpace) {
            event.preventDefault();
        }
    }

    spaceValidator(control: AbstractControl) {
        const value = control.value;
        if (value && typeof value === 'string' && !/^\s*$/.test(value)) {
            return null;
        } else {
            return { required: true };
        }
    }

    noSpecialCharactersOnPaste(event: ClipboardEvent): void {
        const clipboardData = event.clipboardData;
        const pastedText = clipboardData.getData('text');
        if (pastedText.trim() === '' || pastedText[0] === ' ') {
            event.preventDefault();
        } else {
            const isAlphanumericArabicSpace = /^[a-zA-Z0-9\u0600-\u06FF\s]+$/.test(pastedText);
            if (!isAlphanumericArabicSpace) {
                event.preventDefault();
            }
        }
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (
            (charCode >= 48 && charCode <= 57) ||
            charCode === 46 ||
            event.type === 'paste'
        ) {
            if (event.type === 'paste') {
                const pastedData = event.clipboardData.getData('text');
                if (isNaN(Number(pastedData))) {
                    event.preventDefault();
                    return false;
                }
            } else if (charCode === 46 && event.target.value && event.target.value.includes('.')) {
                return false;
            }
            return true;
        }
        return false;
    }

    // noLeadingSpaceValidator(control: FormControl): ValidationErrors | null {
    //     const value = control.value;

    //     if (value && typeof value === 'string') {
    //         if (value.startsWith(' ')) {
    //             return { leadingSpace: true };
    //         }

    //         const normalizedValue = value.replace(/\s{2,}/g, ' ');

    //         if (value !== normalizedValue) {
    //             control.setValue(normalizedValue);
    //         }

    //         if (!normalizedValue.length) {
    //             return { required: true };
    //         }

    //         const words = value.replace(/\s{1,}/g, '').split('');

    //         if (words.length < 3) {
    //             return { minlength: true };
    //         }

    //         return null;
    //     }

    //     return null;
    // }

    noLeadingSpaceValidator(control: FormControl): ValidationErrors | null {
        const value = control.value;
        if (value && typeof value === 'string') {
            if (value.startsWith(' ')) {
                return { leadingSpace: true };
            }

            const normalizedValue = value.replace(/\s{2,}/g, ' ');

            if (value !== normalizedValue) {
                control.setValue(normalizedValue, { emitEvent: false });
            }

            return null;
        }

        return null;
    }

    trimTrailingSpaces(control: AbstractControl): ValidationErrors | null {
        const value = control.value;

        if (value && typeof value === 'string') {
          let normalizedValue = value.replace(/^\s+/, '');

          normalizedValue = normalizedValue.replace(/\s{2,}/g, ' ');

          if (normalizedValue.endsWith('  ')) {
            normalizedValue = normalizedValue.replace(/\s+$/, ' ');
          }

          if (value !== normalizedValue) {
            control.setValue(normalizedValue, { emitEvent: false });
          }

        }

        return null;
    }

}
