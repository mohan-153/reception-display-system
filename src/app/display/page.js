"use client";

import {
  useEffect,
  useState,
  useRef,
} from "react";

import { useRouter } from "next/navigation";

export default function DisplayPage() {

  const router = useRouter();

  const [slides, setSlides] =
    useState([]);

  const [currentSlide, setCurrentSlide] =
    useState(0);

  const [currentTime, setCurrentTime] =
    useState(new Date());

  const screenRef = useRef(null);

  // FETCH SLIDES
  const fetchSlides = async () => {

    try {

      const res = await fetch(
        "/api/slides/get"
      );

      const data = await res.json();

      // SHOW ONLY VISIBLE SLIDES
      const visibleSlides =
        data.filter(
          (slide) =>
            slide.isVisible
        );

      setSlides(
        visibleSlides
      );

    } catch (error) {

      console.log(error);
    }
  };

  // LOAD SLIDES + FULLSCREEN
  useEffect(() => {

    fetchSlides();

    const enterFullscreen =
      async () => {

        try {

          if (
            screenRef.current &&
            !document.fullscreenElement
          ) {

            await screenRef.current.requestFullscreen();
          }

        } catch (error) {

          console.log(error);
        }
      };

    enterFullscreen();

  }, []);

  // AUTO SLIDE CHANGE
  useEffect(() => {

    if (slides.length === 0)
      return;

    const interval =
      setInterval(() => {

        setCurrentSlide(
          (prev) =>
            prev ===
              slides.length - 1
              ? 0
              : prev + 1
        );

      }, 5000);

    return () =>
      clearInterval(
        interval
      );

  }, [slides]);

  // LIVE CLOCK
  useEffect(() => {

    const timer =
      setInterval(() => {

        setCurrentTime(
          new Date()
        );

      }, 1000);

    return () =>
      clearInterval(timer);

  }, []);

  // TIME FORMAT
  const time =
    currentTime.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }
    );

  // DATE FORMAT
  const date =
    currentTime.toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

  // BACK BUTTON
  const handleBack =
    async () => {

      try {

        if (
          document.fullscreenElement
        ) {

          await document.exitFullscreen();
        }

      } catch (error) {

        console.log(error);
      }

      router.push(
        "/dashboard"
      );
    };

  // NO SLIDES
  if (slides.length === 0) {

    return (
      <div className="w-full h-screen flex justify-center items-center bg-black text-white text-3xl font-bold">
        No Slides Available
      </div>
    );
  }

  return (
    <div
      ref={screenRef}
      className="w-full h-screen overflow-hidden bg-black"
    >

      <div className="w-full h-full relative">

        {/* IMAGE */}
        <img
          src={`/uploads/${slides[currentSlide].image}`}
          alt="slide"
          className="w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/35">

          {/* HOVER BACK BUTTON */}
          <div className="absolute top-0 right-0 w-28 h-20 z-50 group">

            <button
              onClick={handleBack}
              className="
      absolute
      top-4
      right-5
      text-white/0
      group-hover:text-white/80
      hover:text-white
      text-5xl
      font-light
      transition-all
      duration-300
      opacity-0
      group-hover:opacity-100
    "
            >
              ×
            </button>

          </div>

          {/* LOGO */}
          <div className="absolute top-5 left-5">

            <img
              src="/logo2.png"
              alt="logo"
              className="w-52 object-contain opacity-90 drop-shadow-2xl"
            />
          </div>

          {/* TIME & DATE */}
          <div className="absolute top-5 right-8 text-white text-right">

            {/* TIME */}
            <h1 className="text-5xl font-extrabold tracking-wider drop-shadow-2xl">
              {time}
            </h1>

            {/* DATE */}
            <p className="text-lg mt-1 font-medium drop-shadow-xl">
              {date}
            </p>
          </div>

          {/* CONTENT */}
          <div className="absolute bottom-12 left-14 max-w-4xl">

            {/* TITLE */}
            <h1 className="text-white text-6xl font-extrabold mb-4 drop-shadow-2xl">
              {slides[currentSlide].title}
            </h1>

            {/* DESCRIPTION */}
            <p className="text-white text-2xl leading-relaxed drop-shadow-2xl">
              {slides[currentSlide].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
