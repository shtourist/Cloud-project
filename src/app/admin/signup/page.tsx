"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { AlertCircle, Lock, UserPlus } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

export default function AdminSignupPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !password) {
      setError("Enter a username and password.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          pass: password,
          admin: isAdmin,
        }),
      });
      const payload: unknown = await response.json();
      const message =
        typeof payload === "object" &&
        payload !== null &&
        "message" in payload &&
        typeof payload.message === "string"
          ? payload.message
          : "Could not create the account.";

      if (!response.ok) {
        throw new Error(message);
      }

      setSuccess(
        isAdmin
          ? "Administrator account created. You can now sign in."
          : "Account created. You can now sign in.",
      );
      setName("");
      setPassword("");
      setIsAdmin(false);
    } catch (signupError) {
      setError(
        signupError instanceof Error
          ? signupError.message
          : "Could not create the account.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#163964] font-serif">
            Create an Account
          </h1>
          <p className="text-sm text-slate-600">
            Create an account for this local prototype.
          </p>
        </div>

        <div className="bg-white border border-slate-300 shadow-xs">
          <div className="bg-[#163964] text-white px-5 py-3 border-b border-[#0f2847]">
            <h2 className="text-sm font-bold font-serif flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div
                role="alert"
                className="flex items-center gap-2 p-3 bg-red-50 border border-red-300 text-red-800 text-xs"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <p
                role="status"
                className="p-3 bg-green-50 border border-green-300 text-green-800 text-xs"
              >
                {success}
              </p>
            )}

            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-slate-700"
              >
                Username or institutional email
              </label>
              <input
                id="name"
                type="text"
                autoComplete="username"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163964]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163964]"
                  required
                />
              </div>
            </div>

            <label className="flex items-start gap-2 text-xs text-slate-700">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(event) => setIsAdmin(event.target.checked)}
                className="mt-0.5 accent-[#163964]"
              />
              <span>Make this account an administrator</span>
            </label>
            <p className="text-xs text-slate-500">
              Administrator self-signup is enabled only while the backend runs
              outside production and listens on this computer.
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#163964] hover:bg-[#0f2847] disabled:opacity-60 text-white py-2 px-4 text-sm font-medium border border-[#0f2847]"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
            <p className="text-center text-xs text-slate-600">
              Already have an account?{" "}
              <Link
                href="/admin/login"
                className="text-[#163964] hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
