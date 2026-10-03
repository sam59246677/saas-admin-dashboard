import * as yup from "yup";

import type { CreateUserInput } from "../types/user";

export const userSchema: yup.ObjectSchema<CreateUserInput> =
  yup.object({
    name: yup
      .string()
      .required("Name is required")
      .defined(),

    email: yup
      .string()
      .email("Invalid email")
      .required("Email is required")
      .defined(),
  });

export type UserFormData = yup.InferType<
  typeof userSchema
>;