
import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { userSchema } from "../validations/userSchema";

import type { UserFormData } from "../validations/userSchema";

import Button from "./Button";

import type {
  User,
  CreateUserInput,
} from "../types/user";

interface UserFormProps {
  user?: User | null;

  onSubmit: (
    data: CreateUserInput
  ) => void;

  onCancel?: () => void;

  isPending: boolean;

  isError: boolean;

  isSuccess: boolean;
}

function UserForm({
  user,
  onSubmit,
  onCancel,
  isPending,
  isError,
  isSuccess,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    reset,

    formState: {
      errors,
    },
  } = useForm<UserFormData>({
    resolver: yupResolver(userSchema),

    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
      });
    } else {
      reset({
        name: "",
        email: "",
      });
    }
  }, [user, reset]);

  return (
    <div
      className="
        mb-6
        rounded-xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <h2
        className="
          text-lg
          font-semibold
          text-slate-900
          dark:text-white
        "
      >
        {user ? "Edit User" : "Add New User"}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-4"
      >
        {/* Name */}

        <div>
          <label
            htmlFor="name"
            className="
              mb-1
              block
              text-sm
              font-medium
              text-slate-700
              dark:text-slate-300
            "
          >
            Name
          </label>

          <input
            id="name"
            type="text"
            {...register("name")}
            className="
              w-full
              rounded-lg
              border
              border-slate-300
              bg-white
              px-4
              py-2
              text-slate-900
              outline-none
              placeholder:text-slate-400
              focus:border-slate-500
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
              dark:placeholder:text-slate-500
              dark:focus:border-slate-500
            "
            placeholder="Enter name"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}

        <div>
          <label
            htmlFor="email"
            className="
              mb-1
              block
              text-sm
              font-medium
              text-slate-700
              dark:text-slate-300
            "
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            {...register("email")}
            className="
              w-full
              rounded-lg
              border
              border-slate-300
              bg-white
              px-4
              py-2
              text-slate-900
              outline-none
              placeholder:text-slate-400
              focus:border-slate-500
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
              dark:placeholder:text-slate-500
              dark:focus:border-slate-500
            "
            placeholder="Enter email"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Buttons */}

        <div className="flex items-center gap-3">
          <Button
            type="submit"
            disabled={isPending}
          >
            {isPending
              ? "Saving..."
              : user
                ? "Update User"
                : "Add User"}
          </Button>

          {user && onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={isPending}
            >
              Cancel
            </Button>
          )}
        </div>

        {/* Error */}

        {isError && (
          <p className="text-sm text-red-600 dark:text-red-400">
            Failed to save user.
          </p>
        )}

        {/* Success */}

        {isSuccess && (
          <p className="text-sm text-green-600 dark:text-green-400">
            User saved successfully.
          </p>
        )}
      </form>
    </div>
  );
}

export default UserForm;
