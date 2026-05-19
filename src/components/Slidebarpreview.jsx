export default function SidebarPreview({ slides }) {
  return (
    <div className="col-span-3 bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-bold mb-4">
        Slide Preview
      </h2>

      <div className="space-y-4 max-h-[80vh] overflow-y-auto dashboard-scroll">        {slides.map((slide) => (
        <div
          key={slide._id}
          className="border rounded-lg overflow-hidden"
        >
          <img
            src={`/uploads/${slide.image}`}
            alt="slide"
            className="w-full h-40 object-cover"
          />

          <div className="p-3">
            <p className="font-bold">
              Order: {slide.order}
            </p>

            <p className="text-gray-700 text-sm">
              {slide.title}
            </p>

            <p
              className={`text-xs mt-2 ${slide.isVisible
                  ? "text-green-600"
                  : "text-red-600"
                }`}
            >
              {slide.isVisible
                ? "Visible"
                : "Hidden"}
            </p>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}