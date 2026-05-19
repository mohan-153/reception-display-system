export function sortSlides(slides) {
  return slides.sort(
    (a, b) => a.order - b.order
  );
}

export function visibleSlides(slides) {
  return slides.filter(
    (slide) => slide.isVisible
  );
}