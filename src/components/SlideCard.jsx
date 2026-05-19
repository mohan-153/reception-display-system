export default function SlideCard({ slide }) {
  return (
    <div className="border rounded-xl overflow-hidden shadow bg-white">
      {/* IMAGE */}
      <img
        src={`/uploads/${slide.image}`}
        alt={slide.title}
        className="w-full h-48 object-cover"
      />

      {/* CONTENT */}
      <div className="p-4">
        {/* ORDER */}
        <p className="text-sm text-gray-500 mb-1">
          Order: {slide.order}
        </p>

        {/* TITLE */}
        <h2 className="text-xl font-bold mb-2">
          {slide.title}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-700 text-sm">
          {slide.description}
        </p>

        {/* STATUS */}
        <div className="mt-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              slide.isVisible
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {slide.isVisible
              ? "Visible"
              : "Hidden"}
          </span>
        </div>
      </div>
    </div>
  );
}