"use client";

import {
  useEffect,
  useState,
  useRef,
} from "react";

export default function DisplayPage() {

  const [slides, setSlides] =
    useState([]);

  const [currentSlide, setCurrentSlide] =
    useState(0);

  const [currentTime, setCurrentTime] =
    useState(new Date());

  const screenRef =
    useRef(null);

  // FETCH SLIDES
  const fetchSlides =
    async () => {

      try {

        const res =
          await fetch(
            "/api/slides/get"
          );

        const data =
          await res.json();

        // ONLY VISIBLE
        const visibleSlides =
          data.filter(
            (slide) =>
              slide.isVisible
          );

        // SORT ORDER
        visibleSlides.sort(
          (a, b) =>
            Number(a.order) -
            Number(b.order)
        );

        setSlides(
          visibleSlides
        );

      } catch (error) {

        console.log(error);
      }
    };

  // LOAD PAGE
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

  // NEXT SLIDE
  const goToNextSlide =
    () => {

      setCurrentSlide(
        (prev) =>
          prev ===
          slides.length - 1
            ? 0
            : prev + 1
      );
    };

  // AUTO IMAGE CHANGE
  useEffect(() => {

    if (
      slides.length === 0
    )
      return;

    const currentFile =
      slides[currentSlide]
        .image;

    // CHECK VIDEO
    const isVideo =
      currentFile.match(
        /\.(mp4|webm|ogg)$/i
      );

    // IMAGE TIMER
    if (!isVideo) {

      const interval =
        setTimeout(() => {

          goToNextSlide();

        }, 5000);

      return () =>
        clearTimeout(
          interval
        );
    }

  }, [
    currentSlide,
    slides,
  ]);

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

  // TIME
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

  // DATE
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
    () => {

      if (
        document.fullscreenElement
      ) {

        document
          .exitFullscreen()
          .then(() => {

            window.close();

          });
      } else {

        window.close();
      }
    };

  // NO SLIDES
  if (
    slides.length === 0
  ) {

    return (
      <div className="w-full h-screen flex justify-center items-center bg-black text-white text-3xl font-bold">
        No Slides Available
      </div>
    );
  }

  return (
    <div
      ref={screenRef}
      className="w-full h-screen overflow-hidden bg-black cursor-none"
    >

      <div className="w-full h-full relative">

        {/* IMAGE / VIDEO */}
        {slides[
          currentSlide
        ].image.match(
          /\.(mp4|webm|ogg)$/i
        ) ? (

          <video
            src={`/uploads/${slides[currentSlide].image}`}
            autoPlay
            muted
            playsInline
            onEnded={
              goToNextSlide
            }
            className="w-full h-full object-cover"
          />

        ) : (

          <img
            src={`/uploads/${slides[currentSlide].image}`}
            alt="slide"
            className="w-full h-full object-cover"
          />
        )}

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/35">

          {/* HOVER CLOSE BUTTON */}
          <div className="absolute top-0 right-0 w-28 h-20 z-50 group">

            <button
              onClick={
                handleBack
              }
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

              {
                slides[
                  currentSlide
                ].title
              }
            </h1>

            {/* DESCRIPTION */}
            <p className="text-white text-2xl leading-relaxed drop-shadow-2xl">

              {
                slides[
                  currentSlide
                ]
                  .description
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}