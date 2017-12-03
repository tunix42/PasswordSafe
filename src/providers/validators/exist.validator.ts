import {AbstractControl, ValidatorFn} from "@angular/forms";

export function existValidator(existingItems): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    if(!existingItems) {
      return null;
    }
    let exists = existingItems.indexOf(control.value) !== -1;
    return exists ? {'valueExists': {value: control.value}} : null;
  };
}
