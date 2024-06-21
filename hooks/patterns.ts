import { ValidationRule } from "react-hook-form";

export const emailPattern: ValidationRule<RegExp> = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const passwordPattern: ValidationRule<RegExp> = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
export const codePattern: ValidationRule<RegExp> = /^[a-zA-Z0-9]+$/;