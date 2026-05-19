"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#0026ff]">
      <div className="bg-[#f7f7f7] w-[500px] rounded-3xl shadow-2xl p-10 text-center">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo2.png"
            alt="logo"
            width={320}
            height={120}
            className="object-contain"
            priority
          />
        </div>

       

        {/* SUBTITLE */}
        <p className="text-gray-600 mt-5 text-lg">
          Manage and display reception
          slides easily.
        </p>

        {/* LOGIN BUTTON */}
        <button
          onClick={() =>
            router.push("/login")
          }
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-2xl text-2xl font-bold"
        >
          Admin Login
        </button>
      </div>
    </div>
  );
}