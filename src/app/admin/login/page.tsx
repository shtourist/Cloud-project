"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Lock, Mail, ArrowRight, Shield, AlertCircle } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your administrator username/email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: email.trim(), pass: password }),
      });
      const payload: unknown = await response.json();
      const message =
        typeof payload === "object" &&
        payload !== null &&
        "message" in payload &&
        typeof payload.message === "string"
          ? payload.message
          : "Could not sign in.";

      if (!response.ok) {
        throw new Error(message);
      }

      const isAdmin =
        typeof payload === "object" &&
        payload !== null &&
        "admin" in payload &&
        payload.admin === true;
      if (!isAdmin) {
        setError("This account does not have administrator access.");
        return;
      }

      router.push("/admin/announcements");
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : "Could not sign in.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="relative h-20 w-20 mx-auto bg-white border border-slate-300 p-1.5 shadow-2xs">
            <Image
              src="/logo.png"
              alt="University of Boumerdes Emblem"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-serif leading-tight">
            جامعة أمحمد بوقرة بومرداس
          </h1>
          <p className="text-sm font-serif text-[#163964] font-medium">
            Université M&apos;Hamed Bougara de Boumerdès
          </p>
          <p className="text-xs text-slate-500">
            Administrative Portal • Service des Publications Officielles
          </p>
        </div>

        <div className="bg-white border border-slate-300 shadow-xs">
          <div className="bg-[#163964] text-white px-5 py-3 border-b border-[#0f2847] flex items-center justify-between">
            <h2 className="text-sm font-bold font-serif flex items-center gap-2">
              <Shield className="h-4 w-4 text-amber-300" />
              <span>Administrative Sign In</span>
            </h2>
            <span className="text-[11px] text-slate-300 font-mono">UMBB-AUTH</span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-300 text-red-800 text-xs">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700">
                Institutional Email or Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="email"
                  type="text"
                  placeholder="admin@univ-boumerdes.dz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163964]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <span className="text-[11px] text-slate-400">Institutional Access</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163964]"
                  required
                />
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#163964] hover:bg-[#0f2847] text-white py-2 px-4 text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-[#0f2847]"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Enter Administration Console</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="text-center">
                <Link
                  href="/admin/signup"
                  className="text-xs text-[#163964] hover:underline"
                >
                  Create an account
                </Link>
              </div>
              <div className="text-center">
                <Link
                  href="/"
                  className="text-xs text-slate-500 hover:text-[#163964] hover:underline"
                >
                  ← Return to University Public Portal
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
