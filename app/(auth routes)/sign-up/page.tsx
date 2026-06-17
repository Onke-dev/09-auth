"use client";
import { useState } from "react";
import css from "./SignUpPage.module.css";
import { useRouter } from "next/navigation";
import { RegisterRequest } from "@/types/user";
import { register } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

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
      const data: RegisterRequest = {
        email: emailValues,
        password: passwordValues,
      };

      const res = await register(data);
      if (res) {
        setUser(res);
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
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
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
            Register
          </button>
        </div>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};
export default SignUp;
