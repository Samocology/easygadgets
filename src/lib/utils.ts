import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkPasswordStrength(password: string) {
  let score = 0;
  const regexLower = /[a-z]/;
  const regexUpper = /[A-Z]/;
  const regexNumber = /[0-9]/;
  const regexSpecial = /[!@#$%^&*]/;

  if (password.length >= 8) score++;
  if (regexLower.test(password)) score++;
  if (regexUpper.test(password)) score++;
  if (regexNumber.test(password)) score++;
  if (regexSpecial.test(password)) score++;

  let label = "";
  switch (score) {
    case 0:
    case 1:
      label = "Very Weak";
      break;
    case 2:
      label = "Weak";
      break;
    case 3:
      label = "Fair";
      break;
    case 4:
      label = "Good";
      break;
    case 5:
      label = "Strong";
      break;
  }

  return { score, label };
}
