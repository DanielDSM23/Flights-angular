import { AbstractControl, ValidationErrors } from '@angular/forms';

const COMMON_PASSWORDS = [
  "123456","password","123456789","12345","qwerty","12345678","111111",
  "123123","abc123","password1","1234","qwerty123","1q2w3e4r","admin",
  "letmein","iloveyou","welcome","monkey","dragon","sunshine","princess",
  "football","baseball","charlie","donald","password123","zaq12wsx",
  "qwertyuiop","asdfghjkl","123321","654321","superman","trustno1",
];

export function commonPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.toLowerCase();

  if (!value) return null;

  const isCommon = COMMON_PASSWORDS.includes(value);
  return isCommon ? { commonPassword: true } : null;
}
