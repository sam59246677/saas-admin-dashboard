import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting, },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "", },
  });

  function handleLogin(data: LoginFormData) {
    const email = data.email.trim().toLowerCase();
    const password = data.password.trim();

    if (email !== "admin@example.com" || password !== "123456") {
      setLoginError("Invalid email or password.",);
      return;
    }
    setLoginError("");
    login();
    navigate("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <div className=" w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">SaaS Dashboard </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300 ">
              Email
            </label>
            <input id="email" type="email" {...register("email")} placeholder="Enter your email" className=" w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500" />

            {errors.email && (<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>)}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <input id="password" type="password"{...register("password")} placeholder="Enter your password" className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500" />
            {errors.password && (
              <p className=" mt-1 text-sm text-red-600 dark:text-red-400" >{errors.password.message}</p>
            )}
          </div>

          {/* Login Error */}
          {loginError && (
            <p className=" rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
              {loginError}
            </p>
          )}

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isSubmitting} >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 rounded-lg bg-slate-100 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <p className="font-medium"> Demo account</p>
          <p className="mt-1"> Email: admin@example.com</p>
          <p> Password: 123456</p>
        </div>
      </div>
    </div>


  );
}
export default Login;
