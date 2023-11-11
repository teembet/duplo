import { object, string } from "yup";

export const signInValidation = object({
  email: string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Please enter a valid email address"
    )
    .required("Please enter your email address"),

  password: string().required("Please enter your password"),
});
