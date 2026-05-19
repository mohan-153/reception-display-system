export default function SlideTable({
  slides,
  handleToggle,
  handleDelete,
  setShowModal,
}) {
  return (
    <div className="col-span-9 bg-white rounded-xl shadow p-5">
      {/* TOP */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">
          Manage Slides
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Slide
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Order</th>

              <th className="p-3 border">Image</th>

              <th className="p-3 border">Title</th>

              <th className="p-3 border">
                Description
              </th>

              <th className="p-3 border">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {slides.map((slide) => (
              <tr key={slide._id}>
                <td className="p-3 border text-center">
                  {slide.order}
                </td>

                <td className="p-3 border">
                  <img
                    src={`/uploads/${slide.image}`}
                    alt="slide"
                    className="w-28 h-20 object-cover rounded"
                  />
                </td>

                <td className="p-3 border font-bold">
                  {slide.title}
                </td>

                <td className="p-3 border">
                  {slide.description}
                </td>

                <td className="p-3 border">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleToggle(slide._id)
                      }
                      className={`px-4 py-2 rounded text-white ${
                        slide.isVisible
                          ? "bg-yellow-500"
                          : "bg-green-600"
                      }`}
                    >
                      {slide.isVisible
                        ? "Hide"
                        : "Show"}
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(slide._id)
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}