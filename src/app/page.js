"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Image from "next/image";

import {
  FaEye,
  FaEyeSlash,
  FaExclamationTriangle,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";

export default function HomePage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [emailError, setEmailError] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  const [toast, setToast] =
    useState({
      show: false,
      title: "",
      message: "",
    });

  // TOAST
  const showToast = (
    title,
    message
  ) => {

    setToast({
      show: true,
      title,
      message,
    });

    setTimeout(() => {

      setToast({
        show: false,
        title: "",
        message: "",
      });

    }, 3000);
  };

  // LOGIN
  const handleLogin = async (e) => {

    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let valid = true;

    // EMAIL VALIDATION
    if (!email) {

      setEmailError(
        "Enter Email"
      );

      valid = false;

    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {

      setEmailError(
        "Invalid Email"
      );

      valid = false;
    }

    // PASSWORD VALIDATION
    if (!password) {

      setPasswordError(
        "Enter Password"
      );

      valid = false;

    } else if (
      password.length < 5
    ) {

      setPasswordError(
        "Password must be minimum 5 characters"
      );

      valid = false;
    }

    if (!valid) return;

    try {

      const res = await fetch(
        "/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await res.json();

      // SUCCESS
      if (data.success) {

        localStorage.setItem(
          "admin",
          "true"
        );

        document.cookie =
          "admin=true; path=/;";

        showToast(
          "Login Success",
          "Welcome Admin"
        );

        setTimeout(() => {

          router.replace(
            "/dashboard"
          );

        }, 1200);
      }

      // FAILED
      else {

        showToast(
          "Login Failed",
          data.message
        );
      }

    } catch (error) {

      showToast(
        "Server Error",
        "Something went wrong"
      );
    }
  };

  return (

    <div className="w-full min-h-screen flex bg-gradient-to-br from-[#343255] via-[#4C1D95] to-[#7C3AED] overflow-hidden relative">

      {/* BACKGROUND BLUR */}
      <div className="absolute w-[500px] h-[500px] bg-violet-400/20 rounded-full blur-3xl top-[-100px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-purple-300/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      {/* TOAST */}
      {toast.show && (

        <div className="fixed top-8 right-5 bg-[#1F1534] border border-white/10 text-white w-[320px] p-5 rounded-2xl shadow-2xl z-50">

          <div className="flex items-start gap-3">

            {/* ICON */}
            <div className="mt-1">

              {toast.title ===
              "Login Success" ? (

                <FaCheckCircle className="text-green-400 text-2xl" />

              ) : (

                <FaTimesCircle className="text-red-400 text-2xl" />
              )}
            </div>

            {/* CONTENT */}
            <div>

              <h2 className="text-xl font-bold">
                {toast.title}
              </h2>

              <p className="mt-2 flex items-center gap-2 text-sm text-gray-300">

                {toast.title ===
                "Login Success" ? (

                  <FaCheckCircle className="text-green-400" />

                ) : (

                  <FaExclamationTriangle className="text-yellow-300" />
                )}

                {toast.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* LEFT SIDE */}
      <div className="w-1/2 hidden lg:flex flex-col justify-center px-20 text-white relative z-10">

        {/* LOGO */}
        <div className="mb-10">

          <Image
            src="/logo2.png"
            alt="logo"
            width={380}
            height={150}
            className="object-contain"
            priority
          />
        </div>

        {/* TITLE */}
        <h1 className="text-6xl font-extrabold leading-tight">

          Reception <br />

          Display System
        </h1>

        {/* SUBTITLE */}
        <p className="mt-8 text-xl text-gray-200 leading-9 max-w-[600px]">

          Professional digital signage
          and reception display
          management system for
          offices, institutions,
          companies, and smart
          environments.

        </p>

        {/* FEATURES */}
        <div className="mt-10 space-y-4 text-lg text-gray-300">

          <div>
            ✓ Image & Video Slide Support
          </div>

          <div>
            ✓ Live Fullscreen Display
          </div>

          <div>
            ✓ Real-Time Slide Management
          </div>

        </div>
      </div>

      {/* RIGHT SIDE LOGIN */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-10 relative z-10">

        <form
          onSubmit={handleLogin}
          className="bg-[#1F1534]/95 border border-white/10 backdrop-blur-xl p-8 rounded-[28px] shadow-2xl w-full max-w-[430px]"
        >

          {/* MOBILE LOGO */}
          <div className="flex justify-center mb-6 lg:hidden">

            <Image
              src="/logo2.png"
              alt="logo"
              width={220}
              height={80}
              className="object-contain"
            />
          </div>

          {/* TITLE */}
          <h1 className="text-4xl font-bold text-center mb-8 text-white">
            Admin Login
          </h1>

          {/* EMAIL */}
          <div className="mb-5">

            <input
              type="email"
              placeholder="Email"
              className="w-full bg-[#120D21] border border-[#2E2346] text-white placeholder:text-gray-400 p-4 rounded-2xl outline-none focus:border-[#8B5CF6] transition"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

            {emailError && (

              <p className="text-[#FCA5A5] text-sm mt-2 text-center font-semibold">
                ⚠ {emailError}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="mb-6">

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                className="w-full bg-[#120D21] border border-[#2E2346] text-white placeholder:text-gray-400 p-4 rounded-2xl outline-none focus:border-[#8B5CF6] transition"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

              {/* EYE ICON */}
              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >

                {showPassword ? (

                  <FaEyeSlash size={18} />

                ) : (

                  <FaEye size={18} />
                )}
              </button>
            </div>

            {passwordError && (

              <p className="text-[#FCA5A5] text-sm mt-2 text-center font-semibold">
                ⚠ {passwordError}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] hover:opacity-90 text-white p-4 rounded-2xl text-lg font-semibold shadow-lg transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}