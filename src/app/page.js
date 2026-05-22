"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();

  // Form Fields State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Error States
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Toast Notification State
  const [toast, setToast] = useState({
    show: false,
    title: "",
    message: "",
    success: false,
  });

  // Trigger Toast Notification
  const showToast = (title, message, success = false) => {
    setToast({ show: true, title, message, success });
    setTimeout(() => {
      setToast({ show: false, title: "", message: "", success: false });
    }, 3000);
  };

  // Form Submission Handler
  const handleRegister = async (e) => {
    e.preventDefault();

    // Reset fields error validation
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let valid = true;

    // Name validation
    if (!name.trim()) {
      setNameError("Enter Name");
      valid = false;
    }

    // Email validation
    if (!email) {
      setEmailError("Enter Email");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid Email Address");
      valid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError("Enter Password");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Minimum 6 characters required");
      valid = false;
    }

    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    }

    if (!valid) return;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        showToast("Registration Success", "Account Created Successfully", true);
        setTimeout(() => {
          router.push("/login");
        }, 1200);
      } else {
        showToast("Registration Failed", data.message || "Failed to sign up");
      }
    } catch (error) {
      showToast("Server Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen flex bg-gradient-to-br from-[#343255] via-[#4C1D95] to-[#7C3AED] overflow-hidden relative">
      
      {/* TOAST ALERT */}
      {toast.show && (
        <div className="fixed top-8 right-5 bg-[#1F1534] border border-white/10 text-white w-[320px] p-5 rounded-2xl shadow-2xl z-50 transition-all duration-300">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              {toast.success ? (
                <FaCheckCircle className="text-green-400 text-2xl" />
              ) : (
                <FaTimesCircle className="text-red-400 text-2xl" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">{toast.title}</h2>
              <p className="mt-2 text-sm text-gray-300 flex items-center gap-1.5">
                {!toast.success && <FaExclamationTriangle className="text-yellow-300 shrink-0" />}
                {toast.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* LEFT CONTENT PANEL (Visible on large viewports) */}
      <div className="w-1/2 hidden lg:flex flex-col justify-center px-20 text-white">
        <div className="mb-8">
          <Image
            src="/logo2.png"
            alt="logo"
            width={350}
            height={120}
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-5xl font-extrabold leading-tight">
          Reception <br />
          Display System
        </h1>
        <p className="mt-6 text-lg text-gray-200 leading-relaxed max-w-[550px]">
          Professional digital signage and reception display management system for offices, institutions, and smart environments.
        </p>
        <div className="mt-8 space-y-4 text-base text-gray-200">
          <p className="flex items-center gap-2">✓ Image & Video Slide Support</p>
          <p className="flex items-center gap-2">✓ Live Fullscreen Display</p>
          <p className="flex items-center gap-2">✓ Real-Time Slide Management</p>
        </div>
      </div>

      {/* RIGHT REGISTRATION FORM PANEL */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-6 md:p-10">
        <form
          onSubmit={handleRegister}
          className="bg-[#1F1534]/95 border border-white/10 backdrop-blur-xl p-8 rounded-[28px] shadow-2xl w-full max-w-[450px]"
        >
          <h1 className="text-4xl font-bold text-center mb-8 text-white">
            Register
          </h1>

          {/* NAME FIELD */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              className={`w-full bg-[#120D21] border text-white placeholder:text-gray-400 p-4 rounded-2xl outline-none transition-colors ${
                nameError ? "border-red-500 focus:border-red-500" : "border-[#2E2346] focus:border-[#8B5CF6]"
              }`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError("");
              }}
            />
            {nameError && (
              <p className="text-[#FCA5A5] text-sm mt-2 font-semibold flex items-center gap-1 pl-1">
                <span>⚠</span> {nameError}
              </p>
            )}
          </div>

          {/* EMAIL FIELD */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email"
              className={`w-full bg-[#120D21] border text-white placeholder:text-gray-400 p-4 rounded-2xl outline-none transition-colors ${
                emailError ? "border-red-500 focus:border-red-500" : "border-[#2E2346] focus:border-[#8B5CF6]"
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
            />
            {emailError && (
              <p className="text-[#FCA5A5] text-sm mt-2 font-semibold flex items-center gap-1 pl-1">
                <span>⚠</span> {emailError}
              </p>
            )}
          </div>

          {/* PASSWORD FIELD */}
          <div className="mb-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full bg-[#120D21] border text-white placeholder:text-gray-400 p-4 pr-12 rounded-2xl outline-none transition-colors ${
                  passwordError ? "border-red-500 focus:border-red-500" : "border-[#2E2346] focus:border-[#8B5CF6]"
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            {passwordError && (
              <p className="text-[#FCA5A5] text-sm mt-2 font-semibold flex items-center gap-1 pl-1">
                <span>⚠</span> {passwordError}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD FIELD */}
          <div className="mb-6">
            <input
              type="password"
              placeholder="Confirm Password"
              className={`w-full bg-[#120D21] border text-white placeholder:text-gray-400 p-4 rounded-2xl outline-none transition-colors ${
                confirmPasswordError ? "border-red-500 focus:border-red-500" : "border-[#2E2346] focus:border-[#8B5CF6]"
              }`}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmPasswordError) setConfirmPasswordError("");
              }}
            />
            {confirmPasswordError && (
              <p className="text-[#FCA5A5] text-sm mt-2 font-semibold flex items-center gap-1 pl-1">
                <span>⚠</span> {confirmPasswordError}
              </p>
            )}
          </div>

          {/* ACTION BUTTON */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] hover:from-[#7C3AED] hover:to-[#9333EA] text-white p-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all active:scale-[0.99]"
          >
            Register
          </button>

          {/* BACK TO LOGIN */}
          <p className="text-center text-gray-300 mt-6 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-300 font-semibold hover:text-purple-200 underline transition ml-1"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}