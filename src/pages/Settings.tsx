import { useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "../components/Button";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import Toast from "../components/Toast";

import {
  getSettings,
  updateSettings,
} from "../services/settingsService";
import type { Settings as SettingsType } from "../types/settings";

const settingsSchema = yup.object({
  companyName: yup
    .string()
    .required("Company name is required"),

  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  notifications: yup.boolean().required(),
  newsletter: yup.boolean().required(),
});

type SettingsFormData =
  yup.InferType<typeof settingsSchema>;

function Settings() {
  const [toastMessage, setToastMessage] =
    useState("");

  const [toastType, setToastType] =
    useState<"success" | "error">("success");

  const queryClient = useQueryClient();

  const {
    data: settings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const updateMutation = useMutation({
    mutationFn: updateSettings,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });

      setToastMessage(
        "Settings saved successfully."
      );
      setToastType("success");
    },

    onError: () => {
      setToastMessage(
        "Failed to save settings."
      );
      setToastType("error");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isDirty,
    },
  } = useForm<SettingsFormData>({
    resolver: yupResolver(settingsSchema),

    defaultValues: {
      companyName: "",
      email: "",
      notifications: false,
      newsletter: false,
    },
  });

  useEffect(() => {
    if (settings) {
      reset(settings);
    }
  }, [settings, reset]);

  function handleSettingsSubmit(
    data: SettingsFormData
  ) {
    const settingsData: SettingsType = {
      companyName: data.companyName,
      email: data.email,
      notifications: data.notifications,
      newsletter: data.newsletter,
    };

    updateMutation.mutate(settingsData);
  }

  if (isLoading) {
    return (
      <LoadingState message="Loading settings..." />
    );
  }

  if (isError) {
    return (
      <ErrorState message="Failed to load settings." />
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Manage your application settings.
        </p>
      </div>

      {/* Settings Form */}
      <form
        onSubmit={handleSubmit(handleSettingsSubmit)}
        className="mt-6 max-w-2xl space-y-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900"
      >
        {/* Company Name */}
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Company Name
          </label>

          <input
            id="companyName"
            type="text"
            {...register("companyName")}
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-700"
          />

          {errors.companyName && (
            <p
              role="alert"
              className="mt-1 text-sm text-red-600 dark:text-red-400"
            >
              {errors.companyName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            {...register("email")}
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-700"
          />

          {errors.email && (
            <p
              role="alert"
              className="mt-1 text-sm text-red-600 dark:text-red-400"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Notifications */}
        <label
          htmlFor="notifications"
          className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-slate-200 p-4 dark:border-slate-700"
        >
          <div className="min-w-0">
            <h2 className="text-sm font-medium text-slate-900 dark:text-white">
              Email Notifications
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Receive notifications about your account.
            </p>
          </div>

          <input
            id="notifications"
            type="checkbox"
            {...register("notifications")}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer"
          />
        </label>

        {/* Newsletter */}
        <label
          htmlFor="newsletter"
          className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-slate-200 p-4 dark:border-slate-700"
        >
          <div className="min-w-0">
            <h2 className="text-sm font-medium text-slate-900 dark:text-white">
              Newsletter
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Receive product updates and news.
            </p>
          </div>

          <input
            id="newsletter"
            type="checkbox"
            {...register("newsletter")}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer"
          />
        </label>

        {/* Submit */}
        <div>
          <Button
            type="submit"
            disabled={
              updateMutation.isPending ||
              !isDirty
            }
            className="w-full sm:w-auto"
          >
            {updateMutation.isPending
              ? "Saving..."
              : "Save Settings"}
          </Button>
        </div>
      </form>

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
}

export default Settings;