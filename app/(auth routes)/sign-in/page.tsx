"use client";
import { useRouter } from "next/navigation";
import css from "./SignInPage.module.css";
import { useState } from "react";
import { login } from "@/lib/api/clientApi";
import { LoginRequest } from "@/types/user";

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = async (formData: FormData) => {
    try {
      const emailValues = formData.get("email");
      const passwordValues = formData.get("password");

      if (
        typeof emailValues !== "string" ||
        typeof passwordValues !== "string"
      ) {
        setError("Invalid values");
        return;
      }
      const data: LoginRequest = {
        email: emailValues,
        password: passwordValues,
      };

      const res = await login(data);
      if (res) {
        router.push("/profile");
      } else {
        setError("It's not this email or password");
      }
    } catch (error: unknown) {
      const err = error as {
        message?: string;
        response?: { data?: { error?: string } };
      };
      setError(
        err.response?.data?.error ?? err.message ?? "Oops... some error",
      );
    }
  };
  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignIn;
