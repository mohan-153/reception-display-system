"use client";

import { useEffect, useState } from "react";

export default function DisplaySlider({
  slides,
}) {
  const [currentSlide, setCurrentSlide] =
    useState(0);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1
          ? 0
          : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-3xl font-bold">
        No Slides Available
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black">
      {/* IMAGE */}
      <img
        src={`/uploads/${slides[currentSlide].image}`}
        alt="slide"
        className="w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-10">
        <h1 className="text-white text-5xl font-bold mb-4">
          {slides[currentSlide].title}
        </h1>

        <p className="text-white text-2xl max-w-3xl">
          {slides[currentSlide].description}
        </p>
      </div>

      {/* SLIDE COUNT */}
      <div className="absolute top-5 right-5 bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
}