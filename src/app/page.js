"use client";

import { useState, useEffect } from "react";

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

  // CHECK LOGIN
  useEffect(() => {

    const hasCookie =
      document.cookie
        .split("; ")
        .find((row) =>
          row.startsWith(
            "admin="
          )
        );

    if (hasCookie) {

      router.replace(
        "/dashboard"
      );
    }

  }, []);

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
      // SUCCESS
if (data.success) {

  showToast(
    "Login Success",
    "Welcome Admin"
  );

  setTimeout(() => {

    router.replace(
      "/dashboard"
    );

  }, 1000);
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

      {/* TOAST */}
      {toast.show && (

        <div className="fixed top-8 right-5 bg-[#1F1534] border border-white/10 text-white w-[320px] p-5 rounded-2xl shadow-2xl z-50">

          <div className="flex items-start gap-3">

            <div className="mt-1">

              {toast.title ===
              "Login Success" ? (

                <FaCheckCircle className="text-green-400 text-2xl" />

              ) : (

                <FaTimesCircle className="text-red-400 text-2xl" />
              )}
            </div>

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

      {/* LEFT */}
      <div className="w-1/2 hidden lg:flex flex-col justify-center px-20 text-white">

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

        <h1 className="text-6xl font-extrabold leading-tight">
          Reception <br />
          Display System
        </h1>

        <p className="mt-8 text-xl text-gray-200 leading-9 max-w-[600px]">
          Professional digital signage
          and reception display
          management system.
        </p>
      </div>

      {/* LOGIN */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-10">

        <form
          onSubmit={handleLogin}
          className="bg-[#1F1534]/95 border border-white/10 backdrop-blur-xl p-8 rounded-[28px] shadow-2xl w-full max-w-[430px]"
        >

          <h1 className="text-4xl font-bold text-center mb-8 text-white">
            Admin Login
          </h1>

          {/* EMAIL */}
          <div className="mb-5">

            <input
              type="email"
              placeholder="Email"
              className="w-full bg-[#120D21] border border-[#2E2346] text-white placeholder:text-gray-400 p-4 rounded-2xl outline-none"
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
                className="w-full bg-[#120D21] border border-[#2E2346] text-white placeholder:text-gray-400 p-4 rounded-2xl outline-none"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >

                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>

            {passwordError && (
              <p className="text-[#FCA5A5] text-sm mt-2 text-center font-semibold">
                ⚠ {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white p-4 rounded-2xl text-lg font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}